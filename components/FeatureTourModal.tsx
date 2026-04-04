"use client";

import { type ReactNode, useMemo } from "react";
import { LouisAvatar } from "./LouisAvatar";
import { ModalShell } from "./ModalShell";

type FeatureTourModalProps = {
  isOpen: boolean;
  title: string;
  body: string;
  content?: ReactNode;
  isSaving?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onSecondary?: () => void;
  variant?: "default" | "coachmark" | "speech-bubble";
  anchorRect?: { top: number; left: number; width: number; height: number } | null;
  onClose: () => void;
  onUnderstand: () => void;
};

export function FeatureTourModal({
  isOpen,
  title,
  body,
  content,
  isSaving = false,
  primaryButtonText = "Got it",
  secondaryButtonText,
  onSecondary,
  variant = "default",
  anchorRect = null,
  onClose,
  onUnderstand,
}: FeatureTourModalProps) {
  const isCoachmark = variant === "coachmark";
  const isSpeechBubble = variant === "speech-bubble";

  const bubbleStyle = useMemo(() => {
    if (!anchorRect || typeof window === "undefined") return undefined;

    const bubbleWidth = Math.min(320, window.innerWidth - 24);
    const centeredLeft = anchorRect.left + anchorRect.width / 2 - bubbleWidth / 2;
    const left = Math.max(12, Math.min(centeredLeft, window.innerWidth - bubbleWidth - 12));
    const spaceAbove = anchorRect.top;
    const top = spaceAbove > 180
      ? Math.max(12, anchorRect.top - 138)
      : Math.min(window.innerHeight - 148, anchorRect.top + anchorRect.height + 12);

    return {
      position: "fixed" as const,
      top,
      left,
      width: bubbleWidth,
    };
  }, [anchorRect]);

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      backdropColor={isCoachmark || isSpeechBubble ? "bg-black/20" : "bg-blue-50/90"}
      scrollable={!isCoachmark && !isSpeechBubble}
      placement={isCoachmark ? "bottom" : "center"}
      zIndex={isCoachmark || isSpeechBubble ? "z-[120]" : "z-50"}
    >
      <div
        style={bubbleStyle}
        className={[
          "relative flex w-full flex-col rounded-[28px] border shadow-2xl",
          isSpeechBubble
            ? "border-[#cadcf9] bg-white/95 px-4 py-3 backdrop-blur-sm"
            :
          isCoachmark
            ? "max-w-[28rem] border-[#c9d9f5] bg-gradient-to-br from-[#eef6ff] via-[#f4f8ff] to-[#eefaf6] px-4 py-4 sm:px-5 sm:py-5"
            : "my-6 max-w-[32rem] items-center border-blue-200 bg-gradient-to-br from-[#eef6ff] via-[#f4f9ff] to-[#eef8f8] px-5 py-5 sm:px-6 sm:py-6",
        ].join(" ")}
      >
        {!isSpeechBubble ? (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-xl text-blue-400 hover:text-blue-700"
            aria-label="Close"
          >
            X
          </button>
        ) : null}
        <div className={`flex w-full flex-col ${isCoachmark || isSpeechBubble ? "items-start" : "items-center"}`}>
          <div className={isCoachmark || isSpeechBubble ? "flex items-center gap-3" : "contents"}>
            <LouisAvatar mood="bible" size={isSpeechBubble ? 44 : isCoachmark ? 54 : 64} />
            {isCoachmark || isSpeechBubble ? (
              <div className="min-w-0">
                <div className={`${isSpeechBubble ? "text-[1rem]" : "text-[1.15rem] sm:text-[1.35rem]"} font-bold leading-tight text-blue-900`}>{title}</div>
              </div>
            ) : null}
          </div>
          {!isCoachmark && !isSpeechBubble ? (
            <div className="mb-3 mt-3 text-center text-[1.45rem] font-bold leading-tight text-blue-900 sm:text-3xl">{title}</div>
          ) : null}
          <div className="w-full">
            <div className={`${isCoachmark || isSpeechBubble ? "mt-2" : "mx-auto max-h-[62vh] max-w-2xl overflow-y-auto px-1"} w-full`}>
              {content ? (
                content
              ) : (
                <div className="space-y-4">
                  <p className={`${isCoachmark || isSpeechBubble ? "text-left" : "max-w-xl text-center"} ${isSpeechBubble ? "text-[13px] leading-6" : "text-sm leading-7 md:text-[15px]"} text-gray-600`}>{body}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {isSpeechBubble ? (
          <button
            type="button"
            onClick={onUnderstand}
            className="absolute inset-0 rounded-[28px]"
            aria-label="Continue dashboard tour"
          />
        ) : null}
        {!isSpeechBubble ? (
        <div className={`mx-auto mt-5 flex w-full max-w-2xl items-center ${secondaryButtonText ? "justify-between" : "justify-end"} gap-3`}>
          {secondaryButtonText ? (
            <button
              type="button"
              onClick={onSecondary ?? onClose}
              disabled={isSaving}
              className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
            >
              {secondaryButtonText}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onUnderstand}
            disabled={isSaving}
            className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 md:text-base"
          >
            {isSaving ? "Saving..." : primaryButtonText}
          </button>
        </div>
        ) : null}
      </div>
    </ModalShell>
  );
}
