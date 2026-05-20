"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type BibleYearLessonAudioPlayerProps = {
  audioSrc: string;
  title: string;
  durationLabel: string;
  storagePath?: string;
};

function formatTime(totalSeconds: number) {
  const seconds = Math.max(0, Math.floor(totalSeconds || 0));
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

export default function BibleYearLessonAudioPlayer({
  audioSrc,
  title,
  durationLabel,
  storagePath,
}: BibleYearLessonAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSavedSecondRef = useRef(-1);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);

  const progressKey = useMemo(() => `bb:bible-year-audio-progress:${audioSrc}`, [audioSrc]);
  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        saveProgress(audio);
        audio.pause();
      }
    };
  }, []);

  function getSavedPosition() {
    if (typeof window === "undefined") return 0;
    try {
      const saved = window.localStorage.getItem(progressKey);
      const parsed = saved ? JSON.parse(saved) : null;
      const position = Number(parsed?.position || 0);
      return Number.isFinite(position) && position > 2 ? position : 0;
    } catch {
      return 0;
    }
  }

  function saveProgress(audio: HTMLAudioElement | null) {
    if (!audio || typeof window === "undefined") return;
    const position = audio.currentTime || 0;
    const audioDuration = Number.isFinite(audio.duration) ? audio.duration : 0;
    if (position > 2 && (!audioDuration || audioDuration - position > 4)) {
      window.localStorage.setItem(progressKey, JSON.stringify({ position, savedAt: Date.now() }));
      return;
    }
    window.localStorage.removeItem(progressKey);
  }

  function applySavedPosition(audio: HTMLAudioElement) {
    const savedPosition = getSavedPosition();
    const audioDuration = Number.isFinite(audio.duration) ? audio.duration : 0;
    if (savedPosition > 2 && (!audioDuration || savedPosition < audioDuration - 4)) {
      try {
        audio.currentTime = savedPosition;
        setCurrentTime(savedPosition);
      } catch {
        // Mobile browsers may delay seeking until metadata/canplay fires.
      }
    }
  }

  async function toggleAudio() {
    if (loading) return;
    setError(false);

    if (audioRef.current && playing) {
      saveProgress(audioRef.current);
      audioRef.current.pause();
      setPlaying(false);
      return;
    }

    if (audioRef.current && !playing) {
      setLoading(true);
      try {
        applySavedPosition(audioRef.current);
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      const audio = new Audio(audioSrc);
      audio.preload = "metadata";
      audioRef.current = audio;

      audio.onloadedmetadata = () => {
        if (Number.isFinite(audio.duration)) setDuration(audio.duration);
        applySavedPosition(audio);
      };
      audio.oncanplay = () => {
        applySavedPosition(audio);
      };
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime || 0);
        if (Number.isFinite(audio.duration)) setDuration(audio.duration);
        const second = Math.floor(audio.currentTime || 0);
        if (second > 0 && second % 5 === 0 && second !== lastSavedSecondRef.current) {
          lastSavedSecondRef.current = second;
          saveProgress(audio);
        }
      };
      audio.onpause = () => {
        saveProgress(audio);
        setPlaying(false);
      };
      audio.onended = () => {
        window.localStorage.removeItem(progressKey);
        setCurrentTime(0);
        setPlaying(false);
      };
      audio.onerror = () => {
        setError(true);
        setPlaying(false);
        setLoading(false);
      };

      applySavedPosition(audio);
      await audio.play();
      setPlaying(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function seekBy(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const nextTime = Math.max(0, Math.min((audio.currentTime || 0) + seconds, audio.duration || Number.MAX_SAFE_INTEGER));
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
    saveProgress(audio);
  }

  return (
    <section
      className="mb-6 rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-md"
      style={{ background: "color-mix(in srgb, var(--bb-card, #ffffff) 82%, transparent)" }}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={toggleAudio}
          disabled={loading}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] text-[var(--bb-button-text,#ffffff)] shadow-[0_0_24px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_45%,transparent)] transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70"
          aria-label={playing ? "Pause Day 1 audio lesson" : "Play Day 1 audio lesson"}
        >
          {loading ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
          ) : playing ? (
            <span className="text-lg font-black leading-none" aria-hidden="true">
              II
            </span>
          ) : (
            <span className="ml-1 h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-current" aria-hidden="true" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Listen While Reading</p>
          <h3 className="mt-1 text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">{title}</h3>
          <p className="mt-1 text-sm font-bold text-[var(--bb-text-secondary,#4b5563)]">{duration ? formatTime(duration) : durationLabel}</p>

          <div
            className="mt-4 h-2 overflow-hidden rounded-full"
            style={{ background: "color-mix(in srgb, var(--bb-text-primary, #111827) 14%, transparent)" }}
          >
            <div
              className="h-full rounded-full bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] transition-[width] duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => seekBy(-10)}
              disabled={!audioRef.current}
              className="rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f3f4f6)] px-3 py-2 text-xs font-black text-[var(--bb-text-primary,#111827)] transition hover:brightness-95 disabled:opacity-50"
            >
              -10s
            </button>
            <button
              type="button"
              onClick={() => seekBy(10)}
              disabled={!audioRef.current}
              className="rounded-xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f3f4f6)] px-3 py-2 text-xs font-black text-[var(--bb-text-primary,#111827)] transition hover:brightness-95 disabled:opacity-50"
            >
              +10s
            </button>
            <span className="text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
              {formatTime(currentTime)} {duration ? `/ ${formatTime(duration)}` : ""}
            </span>
          </div>

          {storagePath ? (
            <p className="mt-3 text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">Streaming from Bible In One Year audio.</p>
          ) : null}
          {error ? <p className="mt-2 text-xs font-black text-red-500">Audio unavailable. Try again in a moment.</p> : null}
        </div>
      </div>
    </section>
  );
}
