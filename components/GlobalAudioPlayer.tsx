"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type AudioProgressState = {
  currentTime: number;
  duration: number;
  playing: boolean;
};

type PlayTrackInput = {
  src: string;
  label: string;
  progressKey?: string;
  onProgress?: (state: AudioProgressState) => void;
};

type GlobalAudioContextValue = {
  currentSrc: string | null;
  currentLabel: string | null;
  currentTime: number;
  duration: number;
  loading: boolean;
  playing: boolean;
  paused: boolean;
  error: boolean;
  playTrack: (input: PlayTrackInput) => Promise<void>;
  pause: () => void;
  resume: () => Promise<void>;
  stop: () => void;
  seek: (seconds: number) => void;
};

const GlobalAudioContext = createContext<GlobalAudioContextValue | null>(null);

export function useGlobalAudioPlayer() {
  return useContext(GlobalAudioContext);
}

function formatTime(totalSeconds: number) {
  const seconds = Math.max(0, Math.floor(totalSeconds || 0));
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function getStorageKey(src: string, progressKey?: string) {
  return progressKey || `bb:tts-progress:${src}`;
}

export function GlobalAudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressCallbackRef = useRef<((state: AudioProgressState) => void) | null>(null);
  const lastSavedAudioSecondRef = useRef(-1);
  const progressKeyRef = useRef<string | null>(null);
  const savedPositionAppliedRef = useRef(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [currentLabel, setCurrentLabel] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(false);

  function notify(audio: HTMLAudioElement | null, isPlaying: boolean) {
    if (!audio) return;
    const state = {
      currentTime: audio.currentTime || 0,
      duration: Number.isFinite(audio.duration) ? audio.duration : 0,
      playing: isPlaying,
    };
    setCurrentTime(state.currentTime);
    setDuration(state.duration);
    progressCallbackRef.current?.(state);
  }

  function saveProgress(audio: HTMLAudioElement | null) {
    if (!audio || !progressKeyRef.current || typeof window === "undefined") return;
    const position = audio.currentTime || 0;
    const audioDuration = audio.duration || 0;
    if (position > 2 && (!audioDuration || audioDuration - position > 4)) {
      window.localStorage.setItem(progressKeyRef.current, JSON.stringify({ position, savedAt: Date.now() }));
      return;
    }
    window.localStorage.removeItem(progressKeyRef.current);
  }

  function clearProgress() {
    if (progressKeyRef.current && typeof window !== "undefined") {
      window.localStorage.removeItem(progressKeyRef.current);
    }
  }

  function readProgress(key: string) {
    if (typeof window === "undefined") return 0;
    try {
      const stored = window.localStorage.getItem(key);
      const parsed = stored ? JSON.parse(stored) : null;
      const position = Number(parsed?.position || 0);
      return Number.isFinite(position) && position > 2 ? position : 0;
    } catch {
      return 0;
    }
  }

  function applySavedProgress(audio: HTMLAudioElement, key: string) {
    if (savedPositionAppliedRef.current) return;
    const savedPosition = readProgress(key);
    const audioDuration = Number.isFinite(audio.duration) ? audio.duration : 0;
    if (savedPosition > 2 && (!audioDuration || savedPosition < audioDuration - 4)) {
      try {
        audio.currentTime = savedPosition;
        savedPositionAppliedRef.current = true;
        setCurrentTime(savedPosition);
      } catch {
        // Some mobile browsers only allow seeking after canplay; that event retries this.
      }
    }
  }

  async function playTrack(input: PlayTrackInput) {
    if (typeof window === "undefined") return;

    const key = getStorageKey(input.src, input.progressKey);
    progressCallbackRef.current = input.onProgress || null;
    progressKeyRef.current = key;
    savedPositionAppliedRef.current = false;
    setError(false);

    if (audioRef.current && currentSrc === input.src) {
      if (playing && !paused) {
        pause();
        return;
      }
      applySavedProgress(audioRef.current, key);
      await resume();
      return;
    }

    if (audioRef.current) {
      saveProgress(audioRef.current);
      audioRef.current.pause();
      audioRef.current = null;
    }

    setLoading(true);
    setCurrentSrc(input.src);
    setCurrentLabel(input.label);
    setCurrentTime(0);
    setDuration(0);

    const audio = new Audio(input.src);
    audio.preload = "auto";
    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      applySavedProgress(audio, key);
      notify(audio, true);
    };

    audio.oncanplay = () => {
      applySavedProgress(audio, key);
      notify(audio, true);
    };

    audio.ontimeupdate = () => {
      notify(audio, true);
      const currentSecond = Math.floor(audio.currentTime);
      if (currentSecond > 0 && currentSecond % 5 === 0 && currentSecond !== lastSavedAudioSecondRef.current) {
        lastSavedAudioSecondRef.current = currentSecond;
        saveProgress(audio);
      }
    };

    audio.onpause = () => {
      saveProgress(audio);
      notify(audio, false);
    };

    audio.onended = () => {
      clearProgress();
      notify(audio, false);
      setPlaying(false);
      setPaused(false);
      setCurrentTime(0);
      audioRef.current = null;
    };

    audio.onerror = () => {
      setError(true);
      setLoading(false);
      setPlaying(false);
      setPaused(false);
      audioRef.current = null;
    };

    try {
      applySavedProgress(audio, key);
      await audio.play();
      setLoading(false);
      setPlaying(true);
      setPaused(false);
    } catch {
      setError(true);
      setLoading(false);
      setPlaying(false);
      setPaused(false);
      audioRef.current = null;
    }
  }

  function pause() {
    if (!audioRef.current) return;
    saveProgress(audioRef.current);
    audioRef.current.pause();
    setPlaying(true);
    setPaused(true);
    notify(audioRef.current, false);
  }

  async function resume() {
    if (!audioRef.current) return;
    try {
      if (progressKeyRef.current) {
        applySavedProgress(audioRef.current, progressKeyRef.current);
      }
      await audioRef.current.play();
      setPlaying(true);
      setPaused(false);
      notify(audioRef.current, true);
    } catch {
      setError(true);
    }
  }

  function stop() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    clearProgress();
    setCurrentSrc(null);
    setCurrentLabel(null);
    setCurrentTime(0);
    setDuration(0);
    setLoading(false);
    setPlaying(false);
    setPaused(false);
    setError(false);
    progressCallbackRef.current = null;
  }

  function seek(seconds: number) {
    if (!audioRef.current) return;
    const next = Math.max(0, Math.min(seconds, audioRef.current.duration || seconds));
    audioRef.current.currentTime = next;
    saveProgress(audioRef.current);
    notify(audioRef.current, playing && !paused);
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        saveProgress(audioRef.current);
        audioRef.current.pause();
      }
    };
  }, []);

  const value = useMemo<GlobalAudioContextValue>(
    () => ({
      currentSrc,
      currentLabel,
      currentTime,
      duration,
      loading,
      playing,
      paused,
      error,
      playTrack,
      pause,
      resume,
      stop,
      seek,
    }),
    [currentSrc, currentLabel, currentTime, duration, loading, playing, paused, error],
  );

  return (
    <GlobalAudioContext.Provider value={value}>
      {children}
      {currentSrc ? (
        <div className="fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+92px)] z-[95] mx-auto max-w-md rounded-[22px] border border-[var(--bb-card-border,#dbe7f4)] bg-[color-mix(in_srgb,var(--bb-card,#ffffff)_94%,transparent)] p-3 text-[var(--bb-text-primary,#111827)] shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={playing && !paused ? pause : () => void resume()}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--bb-button,#2563eb)] text-[var(--bb-button-text,#ffffff)] shadow-sm"
              aria-label={playing && !paused ? "Pause audio" : "Resume audio"}
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
              ) : playing && !paused ? (
                <span className="text-sm font-black leading-none" aria-hidden="true">II</span>
              ) : (
                <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-current" aria-hidden="true" />
              )}
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black">{currentLabel || "Bible Buddy Audio"}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="w-9 text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min={0}
                  max={Math.max(duration || 0, currentTime || 1)}
                  value={Math.min(currentTime, duration || currentTime || 1)}
                  onChange={(event) => seek(Number(event.target.value))}
                  className="h-1 flex-1 accent-[var(--bb-accent,#2563eb)]"
                  aria-label="Audio position"
                />
                <span className="w-9 text-right text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">{duration ? formatTime(duration) : "--:--"}</span>
              </div>
              {error ? <p className="mt-1 text-xs font-bold text-red-600">Audio unavailable. Try again.</p> : null}
            </div>
            <button
              type="button"
              onClick={stop}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--bb-card-border,#d1d5db)] bg-[var(--bb-surface-soft,#f3f4f6)] text-sm font-black"
              aria-label="Stop audio"
            >
              x
            </button>
          </div>
        </div>
      ) : null}
    </GlobalAudioContext.Provider>
  );
}
