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
  variant?: "default" | "coachmark" | "speech-bubble" | "prompt";
  anchorRect?: { top: number; left: number; width: number; height: number } | null;
  canAdvance?: boolean;
  closeOnBackdrop?: boolean;
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
  canAdvance = true,
  closeOnBackdrop = true,
  onClose,
  onUnderstand,
}: FeatureTourModalProps) {
  const isCoachmark = variant === "coachmark";
  const isSpeechBubble = variant === "speech-bubble";
  const isPrompt = variant === "prompt";

  const bubbleStyle = useMemo(() => {
    if (typeof window === "undefined") return undefined;

    if (isSpeechBubble) return undefined;

    if (!anchorRect) return undefined;

    const bubbleWidth = Math.min(320, window.innerWidth - 24);
    const centeredLeft = anchorRect.left + anchorRect.width / 2 - bubbleWidth / 2;
    const left = Math.max(12, Math.min(centeredLeft, window.innerWidth - bubbleWidth - 12));
    const bubbleHeight = isSpeechBubble ? 150 : 180;
    const preferredTop = anchorRect.top + anchorRect.height + 14;
    const maxTop = window.innerHeight - bubbleHeight - 16;
    const top = Math.max(12, Math.min(preferredTop, maxTop));

    return {
      position: "fixed" as const,
      top,
      left,
      width: bubbleWidth,
    };
  }, [anchorRect, isSpeechBubble]);

  function handlePrimaryClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    onUnderstand();
  }

  function handleSecondaryClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    (onSecondary ?? onClose)?.();
  }

  function handleButtonPressStart(
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.PointerEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={closeOnBackdrop ? onClose : undefined}
      backdropColor={isCoachmark || isSpeechBubble || isPrompt ? "bg-black/10" : "bg-blue-50/90"}
      scrollable={!isCoachmark && !isSpeechBubble && !isPrompt}
      placement={isCoachmark || isSpeechBubble ? "bottom" : "center"}
      zIndex={isCoachmark || isSpeechBubble || isPrompt ? "z-[120]" : "z-50"}
    >
      <div
        style={bubbleStyle}
        className={[
          "relative flex w-full flex-col rounded-[28px] border shadow-2xl",
          isPrompt
            ? "max-w-[22rem] border-[#cadcf9] bg-white/95 px-4 py-4 sm:px-5"
            :
          isSpeechBubble
            ? "mx-auto w-[min(100%,48rem)] border-[#cadcf9] bg-white/97 px-3 py-3 backdrop-blur-sm sm:px-4"
            :
          isCoachmark
            ? "max-w-[28rem] border-[#c9d9f5] bg-gradient-to-br from-[#eef6ff] via-[#f4f8ff] to-[#eefaf6] px-4 py-4 sm:px-5 sm:py-5"
            : "my-6 max-w-[32rem] items-center border-blue-200 bg-gradient-to-br from-[#eef6ff] via-[#f4f9ff] to-[#eef8f8] px-5 py-5 sm:px-6 sm:py-6",
        ].join(" ")}
      >
        {!isSpeechBubble && !isPrompt ? (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 text-xl text-blue-400 hover:text-blue-700"
            aria-label="Close"
          >
            X
          </button>
        ) : null}
        <div className={`flex w-full flex-col ${isCoachmark || isSpeechBubble || isPrompt ? "items-start" : "items-center"}`}>
          <div className={isCoachmark || isSpeechBubble || isPrompt ? "flex items-center gap-3 w-full" : "contents"}>
            <LouisAvatar mood="bible" size={isSpeechBubble ? 44 : isPrompt ? 48 : isCoachmark ? 54 : 64} />
            {isCoachmark || isSpeechBubble || isPrompt ? (
              <div className="min-w-0 flex-1">
                {isSpeechBubble ? (
                  <p className="text-sm leading-5 text-gray-700 sm:text-[15px]">
                    <span className="font-semibold text-blue-900">{title}. </span>
                    {body}
                  </p>
                ) : (
                  <div className={`${isPrompt ? "text-[1.02rem]" : "text-[1.15rem] sm:text-[1.35rem]"} font-bold leading-tight text-blue-900`}>{title}</div>
                )}
              </div>
            ) : null}
            {isSpeechBubble ? (
              <button
                type="button"
                onMouseDown={handleButtonPressStart}
                onPointerDown={handleButtonPressStart}
                onTouchStart={handleButtonPressStart}
                onClick={handlePrimaryClick}
                disabled={!canAdvance || isSaving}
                className="shrink-0 rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {isSaving ? "Saving..." : primaryButtonText}
              </button>
            ) : null}
          </div>
          {!isCoachmark && !isSpeechBubble && !isPrompt ? (
            <div className="mb-3 mt-3 text-center text-[1.45rem] font-bold leading-tight text-blue-900 sm:text-3xl">{title}</div>
          ) : null}
          <div className="w-full">
            <div className={`${isCoachmark || isSpeechBubble || isPrompt ? "mt-2" : "mx-auto max-h-[62vh] max-w-2xl overflow-y-auto px-1"} w-full`}>
              {content ? (
                content
              ) : (
                <div className="space-y-4">
                  {!isSpeechBubble ? (
                    <p className={`${isCoachmark || isSpeechBubble || isPrompt ? "text-left" : "max-w-xl text-center"} ${isPrompt ? "text-[14px] leading-6" : "text-sm leading-7 md:text-[15px]"} text-gray-600`}>{body}</p>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
        {!isSpeechBubble ? (
        <div className={`mx-auto mt-5 flex w-full max-w-2xl items-center ${secondaryButtonText ? "justify-between" : "justify-end"} gap-3`}>
          {secondaryButtonText ? (
            <button
              type="button"
              onMouseDown={handleButtonPressStart}
              onPointerDown={handleButtonPressStart}
              onTouchStart={handleButtonPressStart}
              onClick={handleSecondaryClick}
              disabled={isSaving}
              className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
            >
              {secondaryButtonText}
            </button>
          ) : null}
          <button
            type="button"
            onMouseDown={handleButtonPressStart}
            onPointerDown={handleButtonPressStart}
            onTouchStart={handleButtonPressStart}
            onClick={handlePrimaryClick}
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
