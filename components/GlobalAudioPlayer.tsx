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
  playbackRate: number;
  playTrack: (input: PlayTrackInput) => Promise<void>;
  pause: () => void;
  resume: () => Promise<void>;
  stop: () => void;
  seek: (seconds: number) => void;
  seekBy: (seconds: number) => void;
  setPlaybackRate: (rate: number) => void;
};

const GlobalAudioContext = createContext<GlobalAudioContextValue | null>(null);

export function useGlobalAudioPlayer() {
  return useContext(GlobalAudioContext);
}

function getStorageKey(src: string, progressKey?: string) {
  return progressKey || `bb:tts-progress:${src}`;
}

export function GlobalAudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressCallbackRef = useRef<((state: AudioProgressState) => void) | null>(null);
  const lastSavedAudioSecondRef = useRef(-1);
  const lastProgressNotifyMsRef = useRef(0);
  const progressKeyRef = useRef<string | null>(null);
  const savedPositionAppliedRef = useRef(false);
  const pendingResumePositionRef = useRef<number | null>(null);
  const playRequestIdRef = useRef(0);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [currentLabel, setCurrentLabel] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState(false);
  const [playbackRate, setPlaybackRateState] = useState(1);

  function notify(audio: HTMLAudioElement | null, isPlaying: boolean, options: { force?: boolean } = {}) {
    if (!audio) return;
    const now = Date.now();
    if (!options.force && now - lastProgressNotifyMsRef.current < 650) return;
    lastProgressNotifyMsRef.current = now;
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
      if (Math.abs((audio.currentTime || 0) - savedPosition) < 1) {
        savedPositionAppliedRef.current = true;
        pendingResumePositionRef.current = null;
        setCurrentTime(savedPosition);
        return;
      }
      try {
        audio.currentTime = savedPosition;
        savedPositionAppliedRef.current = true;
        pendingResumePositionRef.current = null;
        setCurrentTime(savedPosition);
      } catch {
        pendingResumePositionRef.current = savedPosition;
        // Some mobile browsers only allow seeking after canplay; that event retries this.
      }
      return;
    }
    savedPositionAppliedRef.current = true;
    pendingResumePositionRef.current = null;
  }

  function applyPendingResumePosition(audio: HTMLAudioElement) {
    const position = pendingResumePositionRef.current;
    if (!position || position <= 2) return;
    const audioDuration = Number.isFinite(audio.duration) ? audio.duration : 0;
    if (audioDuration && position >= audioDuration - 4) {
      pendingResumePositionRef.current = null;
      return;
    }
    if (Math.abs((audio.currentTime || 0) - position) < 1) {
      pendingResumePositionRef.current = null;
      savedPositionAppliedRef.current = true;
      return;
    }
    try {
      audio.currentTime = position;
      pendingResumePositionRef.current = null;
      savedPositionAppliedRef.current = true;
      setCurrentTime(position);
    } catch {
      // Keep it queued for the next playable event.
    }
  }

  async function playTrack(input: PlayTrackInput) {
    if (typeof window === "undefined") return;

    const requestId = playRequestIdRef.current + 1;
    playRequestIdRef.current = requestId;
    const key = getStorageKey(input.src, input.progressKey);
    progressCallbackRef.current = input.onProgress || null;
    progressKeyRef.current = key;
    setError(false);

    if (audioRef.current && currentSrc === input.src) {
      if (playing && !paused) {
        pause();
        return;
      }
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
    savedPositionAppliedRef.current = false;
    pendingResumePositionRef.current = readProgress(key) || null;
    lastSavedAudioSecondRef.current = -1;

    const audio = new Audio(input.src);
    audio.preload = "auto";
    audio.playbackRate = playbackRate;
    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      applySavedProgress(audio, key);
      notify(audio, true, { force: true });
    };

    audio.oncanplay = () => {
      applyPendingResumePosition(audio);
      notify(audio, true, { force: true });
    };

    audio.oncanplaythrough = () => {
      applyPendingResumePosition(audio);
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
      notify(audio, false, { force: true });
    };

    audio.onended = () => {
      clearProgress();
      notify(audio, false, { force: true });
      setPlaying(false);
      setPaused(false);
      setCurrentTime(0);
      audioRef.current = null;
    };

    audio.onerror = () => {
      if (playRequestIdRef.current !== requestId) return;
      setError(true);
      setLoading(false);
      setPlaying(false);
      setPaused(false);
      audioRef.current = null;
    };

    try {
      applySavedProgress(audio, key);
      await audio.play();
      if (playRequestIdRef.current !== requestId || audioRef.current !== audio) return;
      setLoading(false);
      setPlaying(true);
      setPaused(false);
    } catch {
      if (playRequestIdRef.current !== requestId || audioRef.current !== audio) return;
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
    notify(audioRef.current, false, { force: true });
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
      notify(audioRef.current, true, { force: true });
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
    notify(audioRef.current, playing && !paused, { force: true });
  }

  function seekBy(seconds: number) {
    if (!audioRef.current) return;
    seek((audioRef.current.currentTime || 0) + seconds);
  }

  function setPlaybackRate(rate: number) {
    const safeRate = [1, 1.25, 1.5, 2].includes(rate) ? rate : 1;
    setPlaybackRateState(safeRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = safeRate;
    }
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
      playbackRate,
      playTrack,
      pause,
      resume,
      stop,
      seek,
      seekBy,
      setPlaybackRate,
    }),
    [currentSrc, currentLabel, currentTime, duration, loading, playing, paused, error, playbackRate],
  );

  return <GlobalAudioContext.Provider value={value}>{children}</GlobalAudioContext.Provider>;
}
