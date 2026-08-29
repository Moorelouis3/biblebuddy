"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cleanTextForTts } from "@/lib/ttsSpeechText";
import { useGlobalAudioPlayer } from "./GlobalAudioPlayer";

type BrowserTtsButtonProps = {
  text: string | null | undefined;
  label?: string;
  className?: string;
  audioSrc?: string | null;
  progressKey?: string;
  onAudioProgress?: (state: { currentTime: number; duration: number; playing: boolean }) => void;
  backgroundMusicSrcs?: string[];
  backgroundMusicVolume?: number;
  aiDisclosure?: boolean;
  /**
   * "transport" renders a compact player row (back 10, play/pause, stop,
   * forward 10, speed) instead of the large Play block. Opt in only, so
   * every existing caller keeps the layout it already had.
   */
  variant?: "default" | "transport";
  /** Transport variant only: jump to the previous / next chapter. */
  onPrevious?: () => void;
  onNext?: () => void;
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
  onAudioProgress,
  backgroundMusicSrcs,
  backgroundMusicVolume,
  aiDisclosure = false,
  variant = "default",
  onPrevious,
  onNext,
}: BrowserTtsButtonProps) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const globalAudio = useGlobalAudioPlayer();
  const chunks = useMemo(() => chunkSpeechText(text || ""), [text]);
  const chunksRef = useRef<string[]>([]);
  const indexRef = useRef(0);
  const ownsSpeechRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechBackgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastSavedAudioSecondRef = useRef(-1);
  const lastAudioProgressNotifyMsRef = useRef(0);
  const audioStorageKey = useMemo(() => {
    if (!audioSrc) return null;
    return progressKey || `bb:tts-progress:${audioSrc}`;
  }, [audioSrc, progressKey]);
  const [savedPosition, setSavedPosition] = useState(0);
  const canUseAudioSrc = Boolean(audioSrc);
  const isGlobalTrack = Boolean(audioSrc && globalAudio?.currentSrc === audioSrc);
  const audioIsLoading = isGlobalTrack ? globalAudio?.loading === true : loading;
  const audioIsSpeaking = isGlobalTrack ? globalAudio?.playing === true : speaking;
  const audioIsPaused = isGlobalTrack ? globalAudio?.paused === true : paused;
  const audioHasError = isGlobalTrack ? globalAudio?.error === true : audioError;

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
      stopSpeechBackgroundMusic();
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

  function notifyAudioProgress(audio: HTMLAudioElement | null, playing: boolean, options: { force?: boolean } = {}) {
    if (!audio || !onAudioProgress) return;
    const now = Date.now();
    if (!options.force && now - lastAudioProgressNotifyMsRef.current < 650) return;
    lastAudioProgressNotifyMsRef.current = now;
    onAudioProgress({
      currentTime: audio.currentTime || 0,
      duration: Number.isFinite(audio.duration) ? audio.duration : 0,
      playing,
    });
  }

  function clearAudioProgress() {
    if (audioStorageKey && typeof window !== "undefined") {
      window.localStorage.removeItem(audioStorageKey);
    }
    setSavedPosition(0);
  }

  function applySavedAudioProgress(audio: HTMLAudioElement) {
    const audioDuration = Number.isFinite(audio.duration) ? audio.duration : 0;
    if (savedPosition > 2 && (!audioDuration || savedPosition < audioDuration - 4)) {
      try {
        audio.currentTime = savedPosition;
      } catch {
        // Mobile browsers can delay seeking until the file can play; later events retry this.
      }
    }
  }

  function stopSpeech() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    stopSpeechBackgroundMusic();
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

  function stopSpeechBackgroundMusic() {
    if (!speechBackgroundAudioRef.current) return;
    speechBackgroundAudioRef.current.pause();
    speechBackgroundAudioRef.current.currentTime = 0;
    speechBackgroundAudioRef.current = null;
  }

  async function startSpeechBackgroundMusic() {
    stopSpeechBackgroundMusic();
    const tracks = (backgroundMusicSrcs || []).filter(Boolean);
    if (!tracks.length) return;

    const background = new Audio(tracks[0]);
    background.loop = true;
    background.preload = "auto";
    background.volume = Math.max(0, Math.min(backgroundMusicVolume ?? 0.1, 0.25));
    speechBackgroundAudioRef.current = background;

    try {
      await background.play();
    } catch {
      stopSpeechBackgroundMusic();
    }
  }

  function seekAudioBy(seconds: number) {
    if (!canUseAudioSrc) return;
    if (isGlobalTrack && globalAudio) {
      globalAudio.seekBy(seconds);
      return;
    }
    if (!audioRef.current) return;
    const duration = Number.isFinite(audioRef.current.duration) ? audioRef.current.duration : 0;
    const nextTime = Math.max(0, Math.min((audioRef.current.currentTime || 0) + seconds, duration || Number.MAX_SAFE_INTEGER));
    audioRef.current.currentTime = nextTime;
    saveAudioProgress(audioRef.current);
    notifyAudioProgress(audioRef.current, speaking && !paused, { force: true });
  }

  function speakChunk(startIndex = 0) {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;
    const nextText = chunksRef.current[startIndex];
    if (!nextText) {
      stopSpeechBackgroundMusic();
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
      stopSpeechBackgroundMusic();
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
      speechBackgroundAudioRef.current?.pause();
      setPaused(true);
      return;
    }

    if (speaking && paused) {
      window.speechSynthesis.resume();
      void speechBackgroundAudioRef.current?.play().catch(() => undefined);
      setPaused(false);
      return;
    }

    window.speechSynthesis.cancel();
    ownsSpeechRef.current = true;
    setSpeaking(true);
    setPaused(false);
    void startSpeechBackgroundMusic();
    speakChunk(0);
  }

  async function toggleAudio() {
    if (!audioSrc || typeof window === "undefined" || loading) return;
    setAudioError(false);

    if (globalAudio) {
      await globalAudio.playTrack({
        src: audioSrc,
        label,
        progressKey,
        onProgress: onAudioProgress,
        backgroundMusicSrcs,
        backgroundMusicVolume,
      });
      return;
    }

    if (speaking && !paused) {
      saveAudioProgress(audioRef.current);
      notifyAudioProgress(audioRef.current, false);
      audioRef.current?.pause();
      setPaused(true);
      return;
    }

    if (speaking && paused) {
      if (audioRef.current) {
        applySavedAudioProgress(audioRef.current);
      }
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
        applySavedAudioProgress(audio);
        notifyAudioProgress(audio, true, { force: true });
      };
      audio.oncanplay = () => {
        applySavedAudioProgress(audio);
        notifyAudioProgress(audio, true, { force: true });
      };
      audio.ontimeupdate = () => {
        notifyAudioProgress(audio, true);
        const currentSecond = Math.floor(audio.currentTime);
        if (currentSecond > 0 && currentSecond % 5 === 0 && currentSecond !== lastSavedAudioSecondRef.current) {
          lastSavedAudioSecondRef.current = currentSecond;
          saveAudioProgress(audio);
        }
      };
      audio.onpause = () => {
        saveAudioProgress(audio);
        notifyAudioProgress(audio, false, { force: true });
      };
      audio.onended = () => {
        notifyAudioProgress(audio, false, { force: true });
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
      applySavedAudioProgress(audio);
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

  const showAudioControls = canUseAudioSrc && audioIsSpeaking;

  if (variant === "transport") {
    const playing = audioIsSpeaking && !audioIsPaused;
    const canSeek = canUseAudioSrc;
    const roundButton =
      "grid h-12 w-12 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:h-[52px] sm:w-[52px]";
    const skipIcon = (direction: "back" | "forward") => (
      <span className="relative grid h-7 w-7 place-items-center" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          className={`absolute inset-0 h-7 w-7 ${direction === "back" ? "" : "-scale-x-100"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
          <polyline points="4 3.5 4 8.5 9 8.5" />
        </svg>
        <span className="relative text-[9px] font-black leading-none">15</span>
      </span>
    );

    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => seekAudioBy(-15)}
            disabled={!canSeek}
            className={roundButton}
            aria-label="Go back 15 seconds"
            title="Back 15 seconds"
          >
            {skipIcon("back")}
          </button>

          <button
            type="button"
            onClick={onPrevious}
            disabled={!onPrevious}
            className={roundButton}
            aria-label="Previous chapter"
            title="Previous chapter"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <rect x="5" y="5" width="2.5" height="14" rx="1" />
              <polygon points="19 5 9 12 19 19" />
            </svg>
          </button>

          <button
            type="button"
            onClick={canUseAudioSrc ? toggleAudio : toggleSpeech}
            disabled={audioIsLoading}
            className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-full bg-[#0056fd] text-white shadow-[0_8px_20px_rgba(0,86,253,0.35)] transition hover:bg-[#003bb0] disabled:opacity-60 sm:h-[76px] sm:w-[76px]"
            aria-label={playing ? `Pause ${label}` : `Play ${label}`}
            title={playing ? "Pause" : "Play"}
          >
            {audioIsLoading ? (
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
            ) : playing ? (
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true">
                <polygon points="7 4 20 12 7 20" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!onNext}
            className={roundButton}
            aria-label="Next chapter"
            title="Next chapter"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <polygon points="5 5 15 12 5 19" />
              <rect x="16.5" y="5" width="2.5" height="14" rx="1" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => seekAudioBy(15)}
            disabled={!canSeek}
            className={roundButton}
            aria-label="Go forward 15 seconds"
            title="Forward 15 seconds"
          >
            {skipIcon("forward")}
          </button>

        </div>

        {audioHasError ? (
          <p className="mt-2 text-center text-xs font-black text-red-600">Audio unavailable</p>
        ) : !audioIsSpeaking && savedPosition > 2 ? (
          <p className="mt-2 text-center text-xs font-bold text-slate-500">Saved at {formatTime(savedPosition)}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`mb-4 flex items-center gap-2 rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-2 shadow-sm ${className}`}>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <button
          type="button"
          onClick={canUseAudioSrc ? toggleAudio : toggleSpeech}
          disabled={audioIsLoading}
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--bb-button,#2563eb)] px-4 py-2 text-sm font-black text-[var(--bb-button-text,#ffffff)] transition hover:brightness-95"
          aria-label={audioIsSpeaking && !audioIsPaused ? `Pause ${label}` : `Play ${label}`}
        >
          {audioIsLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
          ) : audioIsSpeaking && !audioIsPaused ? (
            <span className="text-sm leading-none" aria-hidden="true">
              II
            </span>
          ) : (
            <span
              className="h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-current"
              aria-hidden="true"
            />
          )}
          <span>{audioIsLoading ? "Loading" : audioIsSpeaking && !audioIsPaused ? "Pause" : audioIsPaused || savedPosition > 2 ? "Resume" : "Play"}</span>
        </button>
        {!audioIsSpeaking && savedPosition > 2 ? (
          <p className="px-1 text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">Saved at {formatTime(savedPosition)}</p>
        ) : null}
        {showAudioControls ? (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => seekAudioBy(-10)}
              className="min-h-9 rounded-lg border border-[var(--bb-card-border,#d1d5db)] bg-[var(--bb-surface-soft,#f3f4f6)] px-3 text-xs font-black text-[var(--bb-text-primary,#1f2937)] transition hover:brightness-95"
              aria-label="Go back 10 seconds"
            >
              -10s
            </button>
            <button
              type="button"
              onClick={() => seekAudioBy(10)}
              className="min-h-9 rounded-lg border border-[var(--bb-card-border,#d1d5db)] bg-[var(--bb-surface-soft,#f3f4f6)] px-3 text-xs font-black text-[var(--bb-text-primary,#1f2937)] transition hover:brightness-95"
              aria-label="Go forward 10 seconds"
            >
              +10s
            </button>
          </div>
        ) : null}
        {audioHasError ? <p className="px-1 text-xs font-bold text-red-600">Audio unavailable. Try again.</p> : null}
        {aiDisclosure && audioSrc ? (
          <p className="px-1 text-[11px] font-bold leading-4 text-[var(--bb-text-muted,#6b7280)]">
            AI-generated narration with optional background music.
          </p>
        ) : null}
      </div>
      {audioIsSpeaking && !globalAudio ? (
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
