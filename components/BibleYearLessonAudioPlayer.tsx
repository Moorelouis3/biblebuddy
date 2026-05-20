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
}: BibleYearLessonAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSavedSecondRef = useRef(-1);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [error, setError] = useState(false);

  const progressKey = useMemo(() => `bb:bible-year-audio-progress:${audioSrc}`, [audioSrc]);
  const remainingTime = duration > 0 ? Math.max(0, duration - currentTime) : 0;

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
      audio.playbackRate = playbackRate;
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

  function seekTo(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const nextTime = Math.max(0, Math.min(seconds, audio.duration || seconds));
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
    saveProgress(audio);
  }

  function changePlaybackRate(rate: number) {
    const safeRate = [1, 1.25, 1.5, 2].includes(rate) ? rate : 1;
    setPlaybackRate(safeRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = safeRate;
    }
  }

  return (
    <section
      className="mb-6 rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] p-2.5 shadow-sm backdrop-blur-md"
      style={{ background: "color-mix(in srgb, var(--bb-card, #ffffff) 74%, transparent)" }}
    >
      <div className="flex min-w-0 flex-col gap-2">
        <button
          type="button"
          onClick={toggleAudio}
          disabled={loading}
          className="flex min-h-14 w-full items-center justify-center gap-2 rounded-[18px] bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] px-4 py-3 text-base font-black text-[var(--bb-button-text,#ffffff)] shadow-sm transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70"
          aria-label={playing ? "Pause Day 1 audio lesson" : "Play Day 1 audio lesson"}
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
              <span>Loading</span>
            </>
          ) : playing ? (
            <>
              <span className="text-sm font-black leading-none" aria-hidden="true">
                II
              </span>
              <span>Pause</span>
            </>
          ) : (
            <>
              <span className="h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-current" aria-hidden="true" />
              <span>{currentTime > 2 ? "Resume" : "Play"}</span>
            </>
          )}
        </button>

        {playing || currentTime > 2 ? (
          <div className="grid gap-3 px-1 pb-1">
            <div className="grid gap-1.5">
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={1}
                value={Math.min(currentTime, duration || currentTime)}
                onChange={(event) => seekTo(Number(event.target.value))}
                disabled={!audioRef.current || !duration}
                aria-label="Audio progress"
                className="h-2 w-full cursor-pointer accent-[var(--bb-button,var(--bb-accent,#2f7fe8))] disabled:cursor-not-allowed disabled:opacity-50"
              />
              <div className="flex items-center justify-between gap-3 text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                <span>{formatTime(currentTime)}</span>
                <span>{duration ? `${formatTime(remainingTime)} left` : "Loading time"}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
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
              {[1, 1.25, 1.5, 2].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => changePlaybackRate(rate)}
                  className={`rounded-xl border px-3 py-2 text-xs font-black transition hover:brightness-95 ${
                    playbackRate === rate
                      ? "border-[var(--bb-button,var(--bb-accent,#2f7fe8))] bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] text-[var(--bb-button-text,#ffffff)]"
                      : "border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f3f4f6)] text-[var(--bb-text-primary,#111827)]"
                  }`}
                  aria-pressed={playbackRate === rate}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {error ? <p className="px-1 text-xs font-black text-red-500">Audio unavailable. Try again in a moment.</p> : null}
      </div>
    </section>
  );
}
