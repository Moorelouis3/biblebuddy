"use client";

import { useEffect, useMemo } from "react";

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

export default function YouTubeTrackedPlayer({
  videoId,
  youtubeUrl,
  title,
  autoplay = true,
  className,
  onLoadingChange,
}: YouTubeTrackedPlayerProps) {
  const youtubeVideoId = useMemo(
    () => extractYouTubeVideoId(youtubeUrl) || videoId,
    [youtubeUrl, videoId]
  );

  const embedSrc = useMemo(() => {
    if (!youtubeVideoId) return null;
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    });
    return `https://www.youtube.com/embed/${youtubeVideoId}?${params.toString()}`;
  }, [youtubeVideoId, autoplay]);

  useEffect(() => {
    onLoadingChange?.(Boolean(embedSrc));
  }, [embedSrc, onLoadingChange]);

  if (!embedSrc) {
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
        src={embedSrc}
        title={title}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => onLoadingChange?.(false)}
      />
    </div>
  );
}
