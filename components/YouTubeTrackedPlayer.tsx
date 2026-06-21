"use client";

import { useEffect, useMemo, useRef } from "react";
import { getVideoProgress, saveVideoProgress } from "@/lib/videoProgress";

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

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        config: {
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: () => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => {
        destroy: () => void;
        getCurrentTime: () => number;
        getDuration: () => number;
      };
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
    __bbYouTubeIframeApiPromise?: Promise<void>;
  }
}

function loadYouTubeIframeApi() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.YT?.Player) {
    return Promise.resolve();
  }

  if (window.__bbYouTubeIframeApiPromise) {
    return window.__bbYouTubeIframeApiPromise;
  }

  window.__bbYouTubeIframeApiPromise = new Promise<void>((resolve) => {
    const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.appendChild(script);
    }

    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
  });

  return window.__bbYouTubeIframeApiPromise;
}

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
  const playerRef = useRef<{
    destroy: () => void;
    getCurrentTime: () => number;
    getDuration: () => number;
  } | null>(null);
  const intervalRef = useRef<number | null>(null);
  const lastSavedSecondRef = useRef(0);
  const youtubeVideoId = useMemo(
    () => extractYouTubeVideoId(youtubeUrl) || videoId,
    [youtubeUrl, videoId]
  );

  useEffect(() => {
    onLoadingChange?.(Boolean(youtubeVideoId));
  }, [youtubeVideoId, onLoadingChange]);

  useEffect(() => {
    if (!youtubeVideoId || !containerRef.current) {
      return;
    }

    let mounted = true;

    const clearProgressInterval = () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const persistProgress = async (lastEvent: "play" | "pause" | "progress" | "completed") => {
      if (!userId || !playerRef.current) return;

      const currentTime = Number(playerRef.current.getCurrentTime?.() || 0);
      const duration = Number(playerRef.current.getDuration?.() || 0);
      if (!Number.isFinite(currentTime) || currentTime < 0) return;
      if (lastEvent !== "completed" && currentTime <= lastSavedSecondRef.current) return;
      if (lastEvent === "progress" && Math.abs(currentTime - lastSavedSecondRef.current) < 5) return;

      lastSavedSecondRef.current = currentTime;
      await saveVideoProgress({
        userId,
        videoId,
        currentTime,
        duration,
        lastEvent,
        completed: lastEvent === "completed" ? true : undefined,
      }).catch(() => undefined);
    };

    const startProgressInterval = () => {
      clearProgressInterval();
      intervalRef.current = window.setInterval(() => {
        void persistProgress("progress");
      }, 10000);
    };

    void loadYouTubeIframeApi().then(() => {
      if (!mounted || !containerRef.current || !window.YT?.Player) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: youtubeVideoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            if (!mounted) return;
            onLoadingChange?.(false);
          },
          onStateChange: (event) => {
            if (!window.YT?.PlayerState) return;

            if (event.data === window.YT.PlayerState.PLAYING) {
              startProgressInterval();
              return;
            }

            if (event.data === window.YT.PlayerState.PAUSED) {
              clearProgressInterval();
              void persistProgress("pause");
              return;
            }

            if (event.data === window.YT.PlayerState.ENDED) {
              clearProgressInterval();
              void persistProgress("completed");
              onCompleted?.();
            }
          },
        },
      });
    });

    if (userId) {
      void getVideoProgress(userId, videoId)
        .then((existing) => {
          if (!mounted || !existing) return;
          lastSavedSecondRef.current = Number(existing.current_time ?? 0);
        })
        .catch(() => undefined);
    }

    return () => {
      mounted = false;
      clearProgressInterval();
      void persistProgress("pause");
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [autoplay, onCompleted, onLoadingChange, userId, videoId, youtubeVideoId]);

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
      <div ref={containerRef} title={title} className="h-full w-full" />
    </div>
  );
}
