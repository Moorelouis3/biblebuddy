"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cleanTextForTts } from "@/lib/ttsSpeechText";

type BrowserTtsButtonProps = {
  text: string | null | undefined;
  label?: string;
  className?: string;
  audioSrc?: string | null;
  progressKey?: string;
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
  progressKey,
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
  const lastSavedAudioSecondRef = useRef(-1);
  const audioStorageKey = useMemo(() => {
    if (!audioSrc) return null;
    return progressKey || `bb:tts-progress:${audioSrc}`;
  }, [audioSrc, progressKey]);
  const [savedPosition, setSavedPosition] = useState(0);
  const canUseAudioSrc = Boolean(audioSrc);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
  }, []);

  useEffect(() => {
    if (!audioStorageKey || typeof window === "undefined") {
      setSavedPosition(0);
      return;
    }

    try {
      const stored = window.localStorage.getItem(audioStorageKey);
      const parsed = stored ? JSON.parse(stored) : null;
      const position = Number(parsed?.position || 0);
      setSavedPosition(Number.isFinite(position) && position > 2 ? position : 0);
    } catch {
      setSavedPosition(0);
    }
  }, [audioStorageKey]);

  useEffect(() => {
    chunksRef.current = chunks;
    return () => {
      if (ownsSpeechRef.current && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (audioRef.current) {
        saveAudioProgress(audioRef.current, { updateState: false });
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [chunks]);

  function formatTime(totalSeconds: number) {
    const seconds = Math.max(0, Math.floor(totalSeconds));
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes}:${String(remainder).padStart(2, "0")}`;
  }

  function saveAudioProgress(audio: HTMLAudioElement | null, options: { updateState?: boolean } = {}) {
    const updateState = options.updateState !== false;
    if (!audioStorageKey || typeof window === "undefined" || !audio) return;
    const position = audio.currentTime || 0;
    const duration = audio.duration || 0;
    if (position > 2 && (!duration || duration - position > 4)) {
      window.localStorage.setItem(audioStorageKey, JSON.stringify({ position, savedAt: Date.now() }));
      if (updateState) setSavedPosition(position);
      return;
    }

    window.localStorage.removeItem(audioStorageKey);
    if (updateState) setSavedPosition(0);
  }

  function clearAudioProgress() {
    if (audioStorageKey && typeof window !== "undefined") {
      window.localStorage.removeItem(audioStorageKey);
    }
    setSavedPosition(0);
  }

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
    clearAudioProgress();
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
      saveAudioProgress(audioRef.current);
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
      const audio = new Audio(audioSrc);
      audio.preload = "auto";
      audioRef.current = audio;
      audio.onloadedmetadata = () => {
        if (savedPosition > 2 && savedPosition < (audio.duration || Number.POSITIVE_INFINITY) - 4) {
          audio.currentTime = savedPosition;
        }
      };
      audio.ontimeupdate = () => {
        const currentSecond = Math.floor(audio.currentTime);
        if (currentSecond > 0 && currentSecond % 5 === 0 && currentSecond !== lastSavedAudioSecondRef.current) {
          lastSavedAudioSecondRef.current = currentSecond;
          saveAudioProgress(audio);
        }
      };
      audio.onpause = () => {
        saveAudioProgress(audio);
      };
      audio.onended = () => {
        clearAudioProgress();
        setSpeaking(false);
        setPaused(false);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setSpeaking(false);
        setPaused(false);
        setLoading(false);
        setAudioError(true);
        audioRef.current = null;
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
          <span>{loading ? "Loading" : speaking && !paused ? "Pause" : paused || savedPosition > 2 ? "Resume" : "Play"}</span>
        </button>
        {!speaking && savedPosition > 2 ? (
          <p className="px-1 text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">Saved at {formatTime(savedPosition)}</p>
        ) : null}
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
