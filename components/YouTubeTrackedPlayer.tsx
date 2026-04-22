"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getVideoProgress, saveVideoProgress } from "../lib/videoProgress";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
    __bbYoutubeApiPromise?: Promise<any>;
  }
}

type YouTubeTrackedPlayerProps = {
  userId: string | null;
  videoId: string;
  youtubeUrl: string;
  title: string;
  autoplay?: boolean;
  className?: string;
  onLoadingChange?: (loading: boolean) => void;
  onCompleted?: () => void;
};

function extractYouTubeVideoId(url: string) {
  try {
    const parsed = new URL(url);
    const queryVideo = parsed.searchParams.get("v");
    if (queryVideo) return queryVideo;
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace(/^\/+/, "").split("/")[0] || null;
    }
    if (parsed.pathname.includes("/shorts/")) {
      return parsed.pathname.split("/shorts/")[1]?.split("/")[0] || null;
    }
    if (parsed.pathname.includes("/embed/")) {
      return parsed.pathname.split("/embed/")[1]?.split("/")[0] || null;
    }
    return null;
  } catch {
    return null;
  }
}

function loadYouTubeIframeApi() {
  if (typeof window === "undefined") return Promise.reject(new Error("Window unavailable"));
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (window.__bbYoutubeApiPromise) return window.__bbYoutubeApiPromise;

  window.__bbYoutubeApiPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => reject(new Error("Could not load YouTube IFrame API."));
      document.head.appendChild(script);
    }

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve(window.YT);
    };
  });

  return window.__bbYoutubeApiPromise;
}

export default function YouTubeTrackedPlayer({
  userId,
  videoId,
  youtubeUrl,
  title,
  autoplay = true,
  className,
  onLoadingChange,
  onCompleted,
}: YouTubeTrackedPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completionNotifiedRef = useRef(false);
  const resumeAppliedRef = useRef(false);
  const destroyedRef = useRef(false);
  const [resumeTime, setResumeTime] = useState(0);
  const [resumeLoaded, setResumeLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  const youtubeVideoId = useMemo(() => extractYouTubeVideoId(youtubeUrl), [youtubeUrl]);

  function setPlayerLoading(next: boolean) {
    setLoading(next);
    onLoadingChange?.(next);
  }

  async function persistProgress(lastEvent: "play" | "pause" | "progress" | "completed") {
    if (!userId || !playerRef.current?.getCurrentTime || !playerRef.current?.getDuration) return;
    const currentTime =
      lastEvent === "completed" ? Number(playerRef.current.getDuration?.() || 0) : Number(playerRef.current.getCurrentTime?.() || 0);
    const duration = Number(playerRef.current.getDuration?.() || 0);
    const completed = lastEvent === "completed" || (duration > 0 && currentTime >= duration * 0.9);

    try {
      await saveVideoProgress({
        userId,
        videoId,
        currentTime,
        duration,
        lastEvent,
        completed,
      });
      if (completed && !completionNotifiedRef.current) {
        completionNotifiedRef.current = true;
        onCompleted?.();
      }
    } catch (error) {
      console.error("[YouTubeTrackedPlayer] Could not save video progress:", error);
    }
  }

  function clearProgressTimer() {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }

  function startProgressTimer() {
    clearProgressTimer();
    progressIntervalRef.current = setInterval(() => {
      void persistProgress("progress");
    }, 5000);
  }

  useEffect(() => {
    completionNotifiedRef.current = false;
    resumeAppliedRef.current = false;
    setResumeTime(0);
    setResumeLoaded(false);
  }, [videoId]);

  useEffect(() => {
    let cancelled = false;

    async function loadResumePoint() {
      if (!userId) {
        setResumeLoaded(true);
        return;
      }

      try {
        const row = await getVideoProgress(userId, videoId);
        if (cancelled) return;
        const nextResume =
          row?.completed || !row?.current_time || !row?.duration || row.current_time >= row.duration * 0.9
            ? 0
            : row.current_time;
        setResumeTime(nextResume || 0);
        completionNotifiedRef.current = Boolean(row?.completed);
      } catch (error) {
        if (!cancelled) {
          console.error("[YouTubeTrackedPlayer] Could not load resume point:", error);
        }
      } finally {
        if (!cancelled) setResumeLoaded(true);
      }
    }

    void loadResumePoint();
    return () => {
      cancelled = true;
    };
  }, [userId, videoId]);

  useEffect(() => {
    if (!youtubeVideoId || !containerRef.current || destroyedRef.current) return;
    let cancelled = false;

    async function mountPlayer() {
      setPlayerLoading(true);

      try {
        const YT = await loadYouTubeIframeApi();
        if (cancelled || !containerRef.current) return;

        if (playerRef.current?.destroy) {
          playerRef.current.destroy();
          playerRef.current = null;
        }

        playerRef.current = new YT.Player(containerRef.current, {
          videoId: youtubeVideoId,
          playerVars: {
            autoplay: autoplay ? 1 : 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
          },
          events: {
            onReady: (event: any) => {
              setPlayerLoading(false);
              if (resumeLoaded && resumeTime > 0 && !resumeAppliedRef.current) {
                event.target.seekTo(resumeTime, true);
                resumeAppliedRef.current = true;
              }
            },
            onStateChange: (event: any) => {
              const state = event.data;
              const playerState = window.YT?.PlayerState;
              if (!playerState) return;

              if (state === playerState.PLAYING) {
                void persistProgress("play");
                startProgressTimer();
              } else if (state === playerState.PAUSED) {
                clearProgressTimer();
                void persistProgress("pause");
              } else if (state === playerState.ENDED) {
                clearProgressTimer();
                void persistProgress("completed");
              }
            },
            onError: () => {
              setPlayerLoading(false);
            },
          },
        });
      } catch (error) {
        console.error("[YouTubeTrackedPlayer] Could not initialize player:", error);
        setPlayerLoading(false);
      }
    }

    void mountPlayer();

    return () => {
      cancelled = true;
      clearProgressTimer();
      void persistProgress("pause");
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [youtubeVideoId, autoplay, title, resumeLoaded]);

  useEffect(() => {
    if (!resumeLoaded || !resumeTime || !playerRef.current || resumeAppliedRef.current) return;
    try {
      playerRef.current.seekTo(resumeTime, true);
      resumeAppliedRef.current = true;
    } catch {}
  }, [resumeLoaded, resumeTime]);

  useEffect(() => {
    return () => {
      destroyedRef.current = true;
      clearProgressTimer();
      void persistProgress("pause");
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  if (!youtubeVideoId) {
    return (
      <div className={`flex aspect-video w-full items-center justify-center bg-gray-950 text-center ${className || ""}`}>
        <div>
          <p className="text-lg font-semibold text-white">Video unavailable</p>
          <p className="mt-2 text-sm text-gray-300">This YouTube link could not be loaded into the player.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-video w-full bg-gray-950 ${className || ""}`}>
      <div ref={containerRef} className={`h-full w-full transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`} />
    </div>
  );
}
