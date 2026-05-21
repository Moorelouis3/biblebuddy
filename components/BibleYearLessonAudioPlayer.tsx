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
}: BibleYearLessonAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSavedSecondRef = useRef(-1);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [error, setError] = useState(false);
  const pendingSeekRef = useRef(0);
  const isScrubbingRef = useRef(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubTime, setScrubTime] = useState(0);

  const progressKey = useMemo(() => `bb:bible-year-audio-progress:${audioSrc}`, [audioSrc]);
  const estimatedDurationSeconds = useMemo(() => {
    const match = durationLabel.match(/(\d+(?:\.\d+)?)/);
    if (!match) return 0;
    return Math.round(Number(match[1]) * 60);
  }, [durationLabel]);
  const effectiveDuration = duration > 0 ? duration : estimatedDurationSeconds;
  const displayTime = isScrubbing ? scrubTime : currentTime;
  const remainingTime = effectiveDuration > 0 ? Math.max(0, effectiveDuration - displayTime) : 0;

  useEffect(() => {
    const saveCurrentProgress = () => saveProgress(audioRef.current);
    document.addEventListener("visibilitychange", saveCurrentProgress);
    window.addEventListener("pagehide", saveCurrentProgress);
    window.addEventListener("beforeunload", saveCurrentProgress);

    return () => {
      document.removeEventListener("visibilitychange", saveCurrentProgress);
      window.removeEventListener("pagehide", saveCurrentProgress);
      window.removeEventListener("beforeunload", saveCurrentProgress);
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
    const savedPosition = pendingSeekRef.current || getSavedPosition();
    const audioDuration = Number.isFinite(audio.duration) ? audio.duration : 0;
    if (savedPosition > 2 && (!audioDuration || savedPosition < audioDuration - 4)) {
      try {
        audio.currentTime = savedPosition;
        setCurrentTime(savedPosition);
        pendingSeekRef.current = 0;
      } catch {
        pendingSeekRef.current = savedPosition;
        // Mobile browsers may delay seeking until metadata/canplay fires.
      }
    }
  }

  function wireAudioEvents(audio: HTMLAudioElement) {
    audio.onloadedmetadata = () => {
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
      applySavedPosition(audio);
    };
    audio.oncanplay = () => {
      applySavedPosition(audio);
      setLoading(false);
    };
    audio.onseeked = () => {
      pendingSeekRef.current = 0;
      saveProgress(audio);
      setCurrentTime(audio.currentTime || 0);
    };
    audio.ontimeupdate = () => {
      if (!isScrubbingRef.current) setCurrentTime(audio.currentTime || 0);
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
      const second = Math.floor(audio.currentTime || 0);
      if (!isScrubbingRef.current && second > 0 && second !== lastSavedSecondRef.current) {
        lastSavedSecondRef.current = second;
        saveProgress(audio);
      }
    };
    audio.onstalled = () => {
      saveProgress(audio);
    };
    audio.onwaiting = () => {
      saveProgress(audio);
      setLoading(true);
    };
    audio.onplaying = () => {
      setLoading(false);
      setPlaying(true);
    };
    audio.onpause = () => {
      saveProgress(audio);
      setPlaying(false);
      setLoading(false);
    };
    audio.onended = () => {
      window.localStorage.removeItem(progressKey);
      setCurrentTime(0);
      setScrubTime(0);
      setPlaying(false);
      setLoading(false);
    };
    audio.onerror = () => {
      setError(true);
      setPlaying(false);
      setLoading(false);
    };
  }

  function getOrCreateAudio() {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio(audioSrc);
    audio.preload = "metadata";
    audio.playbackRate = playbackRate;
    audioRef.current = audio;
    wireAudioEvents(audio);
    return audio;
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
      } catch {
        setError(true);
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      const audio = getOrCreateAudio();
      applySavedPosition(audio);
      await audio.play();
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  function commitSeek(seconds: number) {
    const audio = getOrCreateAudio();
    const cap = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : effectiveDuration || seconds;
    const nextTime = Math.max(0, Math.min(seconds, cap));
    pendingSeekRef.current = nextTime;
    setCurrentTime(nextTime);
    setScrubTime(nextTime);
    try {
      if ("fastSeek" in audio && typeof audio.fastSeek === "function") {
        audio.fastSeek(nextTime);
      } else {
        audio.currentTime = nextTime;
      }
    } catch {
      pendingSeekRef.current = nextTime;
    }
    saveProgress(audio);
  }

  function seekBy(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const cap = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : effectiveDuration || Number.MAX_SAFE_INTEGER;
    commitSeek(Math.max(0, Math.min((audio.currentTime || 0) + seconds, cap)));
  }

  function finishScrubbing(value = scrubTime) {
    isScrubbingRef.current = false;
    setIsScrubbing(false);
    commitSeek(value);
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
      className="mb-6 overflow-hidden rounded-[22px] border border-[color-mix(in_srgb,var(--bb-card-border,#dbe7f4)_80%,transparent)] p-3 shadow-[0_14px_34px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_16%,transparent)] backdrop-blur-md"
      style={{ background: "color-mix(in srgb, var(--bb-card, #ffffff) 78%, transparent)" }}
    >
      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleAudio}
            disabled={loading}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] text-[var(--bb-button-text,#ffffff)] shadow-[0_10px_22px_color-mix(in_srgb,var(--bb-accent,#2f7fe8)_26%,transparent)] transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70"
            aria-label={playing ? "Pause Day 1 audio lesson" : "Play Day 1 audio lesson"}
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
            ) : playing ? (
              <span className="text-base font-black leading-none" aria-hidden="true">II</span>
            ) : (
              <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-current" aria-hidden="true" />
            )}
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black text-[var(--bb-text-primary,#111827)]">{title}</p>
            <p className="mt-0.5 text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
              {playing ? "Playing" : currentTime > 2 ? "Ready to resume" : "Audio lesson"}
              {" • "}
              {duration ? formatTime(duration) : durationLabel}
            </p>
          </div>
          <span className="rounded-full bg-[color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_72%,transparent)] px-2.5 py-1 text-xs font-black text-[var(--bb-accent,#2f7fe8)]">
            {playbackRate}x
          </span>
        </div>

        <div className="grid gap-3">
            <div className="grid gap-1.5 rounded-2xl bg-[color-mix(in_srgb,var(--bb-text-primary,#111827)_8%,transparent)] px-2.5 py-2">
              <input
                type="range"
                min={0}
                max={effectiveDuration || 0}
                step={1}
                value={Math.min(displayTime, effectiveDuration || displayTime)}
                onPointerDown={() => {
                  isScrubbingRef.current = true;
                  setIsScrubbing(true);
                  setScrubTime(currentTime);
                }}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  isScrubbingRef.current = true;
                  setIsScrubbing(true);
                  setScrubTime(value);
                }}
                onPointerUp={(event) => finishScrubbing(Number((event.currentTarget as HTMLInputElement).value))}
                onKeyUp={(event) => finishScrubbing(Number((event.currentTarget as HTMLInputElement).value))}
                onBlur={(event) => {
                  if (isScrubbing) finishScrubbing(Number(event.currentTarget.value));
                }}
                disabled={!effectiveDuration}
                aria-label="Audio progress"
                className="h-2 w-full cursor-pointer accent-[var(--bb-button,var(--bb-accent,#2f7fe8))] disabled:cursor-not-allowed disabled:opacity-50"
              />
              <div className="flex items-center justify-between gap-3 text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">
                <span>{formatTime(displayTime)}</span>
                <span>
                  {duration
                    ? `${formatTime(remainingTime)} left`
                    : effectiveDuration
                      ? `about ${formatTime(remainingTime)} left`
                      : durationLabel || "Audio time"}
                </span>
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
        {error ? <p className="px-1 text-xs font-black text-red-500">Audio unavailable. Try again in a moment.</p> : null}
      </div>
    </section>
  );
}
