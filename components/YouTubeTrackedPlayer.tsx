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
          /** Left out when attaching to an iframe that already has one. */
          videoId?: string;
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

/**
 * Warm YouTube up before anyone presses play. The player used to start cold:
 * click an episode, THEN download the iframe API, THEN build the iframe, THEN
 * fetch the video - a several-second chain on a phone. Calling this when the
 * TV surface mounts moves the first two steps to page load.
 */
export function warmUpYouTube() {
  if (typeof window === "undefined") return;
  for (const origin of ["https://www.youtube.com", "https://i.ytimg.com", "https://www.google.com"]) {
    if (document.querySelector(`link[rel=preconnect][href="${origin}"]`)) continue;
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    document.head.appendChild(link);
  }
  void loadYouTubeIframeApi();
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
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
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

  /**
   * The embed URL, built once and put straight in the markup.
   *
   * enablejsapi is what lets the effect below attach to this iframe for
   * progress tracking. No origin parameter: it would have to come from
   * window, which the server does not have, and a src that differs between
   * the server's HTML and the first client render is a hydration error - for
   * a parameter YouTube treats as optional.
   */
  const embedSrc = useMemo(() => {
    if (!youtubeVideoId) return undefined;
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
      enablejsapi: "1",
    });
    return `https://www.youtube.com/embed/${youtubeVideoId}?${params.toString()}`;
  }, [youtubeVideoId, autoplay]);

  useEffect(() => {
    onLoadingChange?.(Boolean(youtubeVideoId));
  }, [youtubeVideoId, onLoadingChange]);

  useEffect(() => {
    if (!youtubeVideoId) {
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

    /**
     * Adopt the iframe that is already loading, rather than building one.
     *
     * This used to be the whole startup path: download the iframe API, wait
     * for onYouTubeIframeAPIReady, let YT construct an iframe, and only then
     * does the browser start fetching the player and the video. Four steps in
     * series before a single frame, which on a phone is the "videos loaded
     * way too slow" Louis pulled Bible Buddy TV off the menu for.
     *
     * The iframe is now in the markup with enablejsapi=1, so it starts
     * loading the moment the player mounts - in parallel with the API script
     * instead of behind it. YT.Player takes an existing iframe and attaches
     * to it, which is what keeps the progress tracking below working: the
     * video is already playing by the time the API arrives, and nothing about
     * the picture depends on it.
     */
    void loadYouTubeIframeApi().then(() => {
      if (!mounted || !iframeRef.current || !window.YT?.Player) return;

      playerRef.current = new window.YT.Player(iframeRef.current, {
        // No videoId and no playerVars: an adopted iframe carries its own,
        // and passing them here makes the API rebuild the thing we are
        // attaching to.
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
      // No destroy(). On an adopted iframe the API swaps the element out for
      // the placeholder it was given, and React still thinks it owns that
      // node - so unmounting the modal afterwards throws trying to remove a
      // child that is no longer there. React removes the iframe itself, which
      // is what actually stops the video.
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
      <iframe
        ref={iframeRef}
        title={title}
        src={embedSrc}
        className="h-full w-full"
        // autoplay has to be in here as well as in the URL, or a phone
        // refuses the play the src asked for.
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => onLoadingChange?.(false)}
      />
    </div>
  );
}
