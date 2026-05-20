"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cleanTextForTts } from "@/lib/ttsSpeechText";

type BrowserTtsButtonProps = {
  text: string | null | undefined;
  label?: string;
  className?: string;
  audioSrc?: string | null;
};

function chunkSpeechText(text: string) {
  const cleaned = cleanTextForTts(text);
  if (!cleaned) return [];

  const sentences = cleaned.match(/[^.!?]+[.!?]*/g) || [cleaned];
  const chunks: string[] = [];
  let current = "";

  sentences.forEach((sentence) => {
    const next = `${current} ${sentence}`.trim();
    if (next.length > 1400 && current) {
      chunks.push(current);
      current = sentence.trim();
    } else {
      current = next;
    }
  });

  if (current) chunks.push(current);
  return chunks;
}

export default function BrowserTtsButton({
  text,
  label = "Listen",
  className = "",
  audioSrc,
}: BrowserTtsButtonProps) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const chunks = useMemo(() => chunkSpeechText(text || ""), [text]);
  const chunksRef = useRef<string[]>([]);
  const indexRef = useRef(0);
  const ownsSpeechRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioObjectUrlRef = useRef<string | null>(null);
  const canUseAudioSrc = Boolean(audioSrc);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
  }, []);

  useEffect(() => {
    chunksRef.current = chunks;
    return () => {
      if (ownsSpeechRef.current && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (audioObjectUrlRef.current) {
        URL.revokeObjectURL(audioObjectUrlRef.current);
        audioObjectUrlRef.current = null;
      }
    };
  }, [chunks]);

  function stopSpeech() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    ownsSpeechRef.current = false;
    indexRef.current = 0;
    setSpeaking(false);
    setPaused(false);
  }

  function stopAudio() {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current = null;
    if (audioObjectUrlRef.current) {
      URL.revokeObjectURL(audioObjectUrlRef.current);
      audioObjectUrlRef.current = null;
    }
    setSpeaking(false);
    setPaused(false);
    setLoading(false);
  }

  function speakChunk(startIndex = 0) {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;
    const nextText = chunksRef.current[startIndex];
    if (!nextText) {
      ownsSpeechRef.current = false;
      indexRef.current = 0;
      setSpeaking(false);
      setPaused(false);
      return;
    }

    indexRef.current = startIndex;
    const utterance = new SpeechSynthesisUtterance(nextText);
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.onend = () => {
      if (!ownsSpeechRef.current) return;
      speakChunk(startIndex + 1);
    };
    utterance.onerror = () => {
      ownsSpeechRef.current = false;
      setSpeaking(false);
      setPaused(false);
    };
    window.speechSynthesis.speak(utterance);
  }

  function toggleSpeech() {
    if (!supported || chunks.length === 0 || typeof window === "undefined") return;

    if (speaking && !paused) {
      window.speechSynthesis.pause();
      setPaused(true);
      return;
    }

    if (speaking && paused) {
      window.speechSynthesis.resume();
      setPaused(false);
      return;
    }

    window.speechSynthesis.cancel();
    ownsSpeechRef.current = true;
    setSpeaking(true);
    setPaused(false);
    speakChunk(0);
  }

  async function toggleAudio() {
    if (!audioSrc || typeof window === "undefined" || loading) return;
    setAudioError(false);

    if (speaking && !paused) {
      audioRef.current?.pause();
      setPaused(true);
      return;
    }

    if (speaking && paused) {
      await audioRef.current?.play();
      setPaused(false);
      return;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setLoading(true);

    try {
      if (audioObjectUrlRef.current) {
        URL.revokeObjectURL(audioObjectUrlRef.current);
        audioObjectUrlRef.current = null;
      }

      const response = await fetch(audioSrc, { cache: "no-store" });
      if (!response.ok) throw new Error("Audio request failed.");
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      audioObjectUrlRef.current = objectUrl;

      const audio = new Audio(objectUrl);
    audioRef.current = audio;
    audio.onended = () => {
      setSpeaking(false);
      setPaused(false);
      audioRef.current = null;
      if (audioObjectUrlRef.current) {
        URL.revokeObjectURL(audioObjectUrlRef.current);
        audioObjectUrlRef.current = null;
      }
    };
    audio.onerror = () => {
      setSpeaking(false);
      setPaused(false);
      setLoading(false);
      setAudioError(true);
      audioRef.current = null;
      if (audioObjectUrlRef.current) {
        URL.revokeObjectURL(audioObjectUrlRef.current);
        audioObjectUrlRef.current = null;
      }
    };

    setSpeaking(true);
    setPaused(false);

      await audio.play();
      setLoading(false);
    } catch {
      setSpeaking(false);
      setPaused(false);
      setLoading(false);
      setAudioError(true);
      audioRef.current = null;
      if (audioObjectUrlRef.current) {
        URL.revokeObjectURL(audioObjectUrlRef.current);
        audioObjectUrlRef.current = null;
      }
    }
  }

  if (!canUseAudioSrc && (!supported || chunks.length === 0)) return null;

  return (
    <div className={`mb-4 flex items-center gap-2 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-2 shadow-sm ${className}`}>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <button
          type="button"
          onClick={canUseAudioSrc ? toggleAudio : toggleSpeech}
          disabled={loading}
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--bb-button,#2563eb)] px-4 py-2 text-sm font-black text-[var(--bb-button-text,#ffffff)] transition hover:brightness-95"
          aria-label={speaking && !paused ? `Pause ${label}` : `Play ${label}`}
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
          ) : speaking && !paused ? (
            <span className="text-sm leading-none" aria-hidden="true">
              II
            </span>
          ) : (
            <span
              className="h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-current"
              aria-hidden="true"
            />
          )}
          <span>{loading ? "Loading" : speaking && !paused ? "Pause" : paused ? "Resume" : "Play"}</span>
        </button>
        {audioError ? <p className="px-1 text-xs font-bold text-red-600">Audio unavailable. Try again.</p> : null}
      </div>
      {speaking ? (
        <button
          type="button"
          onClick={canUseAudioSrc ? stopAudio : stopSpeech}
          className="min-h-11 rounded-xl border border-[var(--bb-card-border,#d1d5db)] bg-[var(--bb-surface-soft,#f3f4f6)] px-4 py-2 text-sm font-black text-[var(--bb-text-primary,#1f2937)] transition hover:brightness-95"
          aria-label="Stop audio"
        >
          Stop
        </button>
      ) : null}
    </div>
  );
}
