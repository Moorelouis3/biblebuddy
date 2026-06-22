"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import VideoHelpfulPoll from "./VideoHelpfulPoll";
import { getBibleYearVideoEmbedSrc } from "../lib/bibleYearAudio";
import { supabase } from "../lib/supabaseClient";

type BibleYearLessonAudioPlayerProps = {
  audioSrc: string;
  title: string;
  durationLabel: string;
  storagePath?: string;
  videoSrc?: string;
  userId?: string | null;
  videoId?: string;
  videoContext?: "bible_year" | "bible_topics";
  backgroundMusicSrcs?: string[];
  backgroundMusicVolume?: number;
  onEnded?: () => void;
  compactMediaControls?: boolean;
  previousLessonLabel?: string;
  nextLessonLabel?: string;
  onPreviousLesson?: () => void;
  onNextLesson?: () => void;
  controlsLocked?: boolean;
  showHeader?: boolean;
  audiobookMode?: boolean;
  showHelpfulPoll?: boolean;
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
  videoSrc,
  userId,
  videoId,
  videoContext = "bible_year",
  backgroundMusicSrcs,
  backgroundMusicVolume = 0.1,
  onEnded,
  compactMediaControls = false,
  previousLessonLabel = "Previous day",
  nextLessonLabel = "Next day",
  onPreviousLesson,
  onNextLesson,
  controlsLocked = false,
  showHeader = true,
  audiobookMode = false,
  showHelpfulPoll = true,
}: BibleYearLessonAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastSavedSecondRef = useRef(-1);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [error, setError] = useState(false);
  const pendingSeekRef = useRef(0);
  const playTrackedRef = useRef(false);
  const lastTrackedProgressSecondRef = useRef(0);
  const savedPositionAppliedRef = useRef(false);
  const isScrubbingRef = useRef(false);
  const manualSeekInProgressRef = useRef(false);
  const resumeAfterSeekRef = useRef(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubTime, setScrubTime] = useState(0);

  const progressKey = useMemo(() => `bb:bible-year-audio-progress:${audioSrc}`, [audioSrc]);
  const durationCacheKey = useMemo(() => `bb:bible-year-audio-duration:${audioSrc}`, [audioSrc]);
  const estimatedDurationSeconds = useMemo(() => {
    const match = durationLabel.match(/(\d+(?:\.\d+)?)/);
    if (!match) return 0;
    return Math.round(Number(match[1]) * 60);
  }, [durationLabel]);
  const effectiveDuration = duration > 0 ? duration : estimatedDurationSeconds;
  const displayTime = isScrubbing ? scrubTime : currentTime;
  const remainingTime = effectiveDuration > 0 ? Math.max(0, effectiveDuration - displayTime) : 0;
  const videoPlayerSrc = getBibleYearVideoEmbedSrc(videoSrc);
  const speedControlId = `audio-speed-${(videoId || title).toLowerCase().replace(/[^a-z0-9_-]+/g, "-")}`;
  const journeyDay = useMemo(() => {
    const match = (videoId || title).match(/day[-_\s]*(\d+)/i);
    return match ? Number(match[1]) : null;
  }, [title, videoId]);

  async function trackAudioEvent(actionType: "bible_year_audio_played" | "bible_year_audio_progress" | "bible_year_audio_completed", audio: HTMLAudioElement | null) {
    if (!userId || videoContext !== "bible_year") return;
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const meta = user?.user_metadata || {};
      const username =
        meta.firstName ||
        meta.first_name ||
        (user?.email ? user.email.split("@")[0] : null) ||
        "User";
      const current = Math.floor(audio?.currentTime || 0);
      const audioDuration = Number.isFinite(audio?.duration || 0) ? Math.floor(audio?.duration || 0) : effectiveDuration;
      await supabase.from("master_actions").insert({
        user_id: userId,
        username,
        action_type: actionType,
        action_label: `${title} ${actionType.replace("bible_year_audio_", "audio ")}`,
        journey_day: journeyDay,
        account_status: user?.is_anonymous ? "guest" : "registered",
        event_metadata: {
          plan: "bible_in_one_year",
          mediaType: "audio",
          lessonTitle: title,
          videoId: videoId || null,
          audioSrc,
          dayNumber: journeyDay,
          secondsPlayed: current,
          currentTime: current,
          durationSeconds: audioDuration,
          playbackRate,
        },
      });
    } catch (trackError) {
      console.warn("[BIBLE_YEAR_AUDIO_ANALYTICS] Could not track audio event:", trackError);
    }
  }

  function saveDurationToCache(seconds: number) {
    if (typeof window === "undefined") return;
    if (!Number.isFinite(seconds) || seconds <= 0) return;
    try {
      window.localStorage.setItem(durationCacheKey, JSON.stringify({ duration: Math.round(seconds), savedAt: Date.now() }));
    } catch {
      // Duration cache is only a convenience.
    }
  }

  function getSavedDurationFromCache() {
    if (typeof window === "undefined") return 0;
    try {
      const saved = window.localStorage.getItem(durationCacheKey);
      const parsed = saved ? JSON.parse(saved) : null;
      const cachedDuration = Number(parsed?.duration || 0);
      return Number.isFinite(cachedDuration) && cachedDuration > 0 ? cachedDuration : 0;
    } catch {
      return 0;
    }
  }

  function saveProgress(audio: HTMLAudioElement | null) {
    if (!audio || typeof window === "undefined") return;
    const position = audio.currentTime || 0;
    const audioDuration = Number.isFinite(audio.duration) ? audio.duration : 0;
    if (position <= 2) return;
    if (position > 2 && (!audioDuration || audioDuration - position > 4)) {
      window.localStorage.setItem(progressKey, JSON.stringify({ position, savedAt: Date.now() }));
      return;
    }
    window.localStorage.removeItem(progressKey);
  }

  function stopBackgroundMusic() {
    const background = backgroundAudioRef.current;
    if (!background) return;
    background.pause();
    background.currentTime = 0;
  }

  useEffect(() => {
    let resetTimer: number | null = null;
    const previousAudio = audioRef.current;
    if (previousAudio) {
      saveProgress(previousAudio);
      previousAudio.pause();
      previousAudio.src = "";
      previousAudio.load();
      audioRef.current = null;
    }
    stopBackgroundMusic();
    resetTimer = window.setTimeout(() => {
      setPlaying(false);
      setLoading(false);
      setCurrentTime(0);
      setDuration(getSavedDurationFromCache());
      setError(false);
      setIsScrubbing(false);
      setScrubTime(0);
    }, 0);
    savedPositionAppliedRef.current = false;
    pendingSeekRef.current = 0;
    lastSavedSecondRef.current = -1;
    playTrackedRef.current = false;
    lastTrackedProgressSecondRef.current = 0;

    return () => {
      if (resetTimer !== null) window.clearTimeout(resetTimer);
    };
  }, [audioSrc]);

  useEffect(() => {
    const audio = getOrCreateAudio();
    audio.preload = "metadata";

    const applyCachedDuration = () => {
      const cachedDuration = getSavedDurationFromCache();
      if (cachedDuration > 0) setDuration(cachedDuration);
    };

    applyCachedDuration();

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration);
      saveDurationToCache(audio.duration);
      return;
    }

    audio.load();

    return () => {
      saveProgress(audioRef.current);
    };
  }, [audioSrc]);

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
      stopBackgroundMusic();
    };
  }, []);

  function getBackgroundMusicSrc() {
    return backgroundMusicSrcs?.find((src) => src && src.trim().length > 0) || null;
  }

  function getOrCreateBackgroundAudio() {
    const src = getBackgroundMusicSrc();
    if (!src) return null;
    if (backgroundAudioRef.current?.src.includes(src)) return backgroundAudioRef.current;
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
      backgroundAudioRef.current = null;
    }
    const background = new Audio(src);
    background.preload = "auto";
    background.loop = true;
    background.volume = Math.max(0, Math.min(1, backgroundMusicVolume));
    backgroundAudioRef.current = background;
    return background;
  }

  function syncBackgroundToAudio(audio: HTMLAudioElement | null) {
    const background = backgroundAudioRef.current;
    if (!audio || !background || !Number.isFinite(background.duration) || background.duration <= 0) return;
    try {
      background.currentTime = (audio.currentTime || 0) % background.duration;
    } catch {
      // Best effort only; the narrator should never be blocked by background sync.
    }
  }

  async function startBackgroundMusic(audio: HTMLAudioElement | null) {
    const background = getOrCreateBackgroundAudio();
    if (!background) return;
    background.volume = Math.max(0, Math.min(1, backgroundMusicVolume));
    syncBackgroundToAudio(audio);
    try {
      await background.play();
    } catch {
      // Some browsers block secondary audio; keep the narrator playing.
    }
  }

  function pauseBackgroundMusic() {
    backgroundAudioRef.current?.pause();
  }

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

  function applySavedPosition(audio: HTMLAudioElement) {
    if (manualSeekInProgressRef.current) return;
    if (savedPositionAppliedRef.current && !pendingSeekRef.current) return;
    const savedPosition = pendingSeekRef.current || getSavedPosition();
    const audioDuration = Number.isFinite(audio.duration) ? audio.duration : 0;
    if (savedPosition > 2 && (!audioDuration || savedPosition < audioDuration - 4)) {
      try {
        audio.currentTime = savedPosition;
        setCurrentTime(savedPosition);
        pendingSeekRef.current = 0;
        savedPositionAppliedRef.current = true;
      } catch {
        pendingSeekRef.current = savedPosition;
        savedPositionAppliedRef.current = false;
        // Mobile browsers may delay seeking until metadata/canplay fires.
      }
      return;
    }
    savedPositionAppliedRef.current = true;
  }

  function wireAudioEvents(audio: HTMLAudioElement) {
    audio.onloadedmetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
        saveDurationToCache(audio.duration);
      }
      applySavedPosition(audio);
    };
    audio.ondurationchange = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
        saveDurationToCache(audio.duration);
      }
    };
    audio.oncanplay = () => {
      if (!manualSeekInProgressRef.current && pendingSeekRef.current) applySavedPosition(audio);
      setLoading(false);
    };
    audio.onseeked = () => {
      pendingSeekRef.current = 0;
      manualSeekInProgressRef.current = false;
      saveProgress(audio);
      setCurrentTime(audio.currentTime || 0);
      if (resumeAfterSeekRef.current) {
        resumeAfterSeekRef.current = false;
        syncBackgroundToAudio(audio);
        audio.play().catch(() => {
          setError(true);
          setLoading(false);
          setPlaying(false);
        });
      }
    };
    audio.ontimeupdate = () => {
      if (!isScrubbingRef.current) setCurrentTime(audio.currentTime || 0);
      if (Number.isFinite(audio.duration)) setDuration(audio.duration);
      const second = Math.floor(audio.currentTime || 0);
      if (!isScrubbingRef.current && second > 0 && second !== lastSavedSecondRef.current) {
        lastSavedSecondRef.current = second;
        saveProgress(audio);
      }
      if (second >= 30 && second - lastTrackedProgressSecondRef.current >= 60) {
        lastTrackedProgressSecondRef.current = second;
        void trackAudioEvent("bible_year_audio_progress", audio);
      }
    };
    audio.onstalled = () => {
      saveProgress(audio);
    };
    audio.onwaiting = () => {
      saveProgress(audio);
      if (!manualSeekInProgressRef.current) setLoading(true);
    };
    audio.onplaying = () => {
      setLoading(false);
      setPlaying(true);
      void startBackgroundMusic(audio);
      if (!playTrackedRef.current) {
        playTrackedRef.current = true;
        void trackAudioEvent("bible_year_audio_played", audio);
      }
    };
    audio.onpause = () => {
      saveProgress(audio);
      setPlaying(false);
      setLoading(false);
      pauseBackgroundMusic();
    };
    audio.onended = () => {
      window.localStorage.removeItem(progressKey);
      setCurrentTime(0);
      setScrubTime(0);
      setPlaying(false);
      setLoading(false);
      stopBackgroundMusic();
      void trackAudioEvent("bible_year_audio_completed", audio);
      onEnded?.();
    };
    audio.onerror = () => {
      setError(true);
      setPlaying(false);
      setLoading(false);
      pauseBackgroundMusic();
    };
  }

  function getOrCreateAudio() {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio(audioSrc);
    audio.preload = "auto";
    audio.playbackRate = playbackRate;
    audioRef.current = audio;
    wireAudioEvents(audio);
    return audio;
  }

  async function toggleAudio() {
    if (controlsLocked || loading) return;
    setError(false);

    if (audioRef.current && playing) {
      saveProgress(audioRef.current);
      audioRef.current.pause();
      pauseBackgroundMusic();
      setPlaying(false);
      return;
    }

    if (audioRef.current && !playing) {
      setLoading(true);
      try {
        applySavedPosition(audioRef.current);
        await audioRef.current.play();
        await startBackgroundMusic(audioRef.current);
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
      await startBackgroundMusic(audio);
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  function commitSeek(seconds: number) {
    if (controlsLocked) return;
    const audio = getOrCreateAudio();
    const cap = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : effectiveDuration || seconds;
    const nextTime = Math.max(0, Math.min(seconds, cap));
    const shouldResume = playing && !audio.paused;
    manualSeekInProgressRef.current = true;
    resumeAfterSeekRef.current = shouldResume;
    pendingSeekRef.current = nextTime;
    setCurrentTime(nextTime);
    setScrubTime(nextTime);
    if (shouldResume) {
      audio.pause();
      pauseBackgroundMusic();
    }
    try {
      if ("fastSeek" in audio && typeof audio.fastSeek === "function") {
        audio.fastSeek(nextTime);
      } else {
        audio.currentTime = nextTime;
      }
    } catch {
      pendingSeekRef.current = nextTime;
      manualSeekInProgressRef.current = false;
      resumeAfterSeekRef.current = false;
    }
    window.setTimeout(() => {
      if (!manualSeekInProgressRef.current) return;
      manualSeekInProgressRef.current = false;
      saveProgress(audio);
      setCurrentTime(audio.currentTime || nextTime);
      if (resumeAfterSeekRef.current) {
        resumeAfterSeekRef.current = false;
        syncBackgroundToAudio(audio);
        audio.play().catch(() => {
          setError(true);
          setPlaying(false);
        });
      }
    }, 900);
  }

  function seekBy(seconds: number) {
    if (controlsLocked) return;
    const audio = audioRef.current;
    if (!audio) return;
    const cap = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : effectiveDuration || Number.MAX_SAFE_INTEGER;
    commitSeek(Math.max(0, Math.min((audio.currentTime || 0) + seconds, cap)));
  }

  function finishScrubbing(value = scrubTime) {
    if (controlsLocked) return;
    isScrubbingRef.current = false;
    setIsScrubbing(false);
    commitSeek(value);
  }

  function changePlaybackRate(rate: number) {
    if (controlsLocked) return;
    const safeRate = [0.75, 1, 1.25, 1.5, 2].includes(rate) ? rate : 1;
    setPlaybackRate(safeRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = safeRate;
    }
  }

  function renderControlIcon(kind: "rewind" | "forward" | "previous" | "next") {
    if (kind === "rewind") {
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path d="M9 7 4 12l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 7 15 12l5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (kind === "forward") {
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path d="m4 7 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m15 7 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (kind === "previous") {
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path d="M18 6 9 12l9 6V6Z" fill="currentColor" />
          <path d="M6 6v12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="m6 6 9 6-9 6V6Z" fill="currentColor" />
        <path d="M18 6v12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (videoPlayerSrc) {
    const displayTitle = title
      .replace(/^Day\s+\d+\s*[-–]\s*/i, "")
      .replace(/^The\s+/i, "");

    return (
      <section className="mb-3">
        <h3 className="mb-2 text-2xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">{displayTitle}</h3>
        <div className="overflow-hidden rounded-[22px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_42%,transparent)] bg-[#070503] shadow-[0_18px_42px_rgba(0,0,0,0.34),0_0_26px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_16%,transparent)]">
          <div className="relative aspect-video overflow-hidden bg-black">
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(0,0,0,0.28)),linear-gradient(180deg,rgba(0,0,0,0.12),transparent_35%,rgba(0,0,0,0.18))]" aria-hidden="true" />
            <iframe
              src={videoPlayerSrc}
              title={title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
        <VideoHelpfulPoll
          userId={userId}
          videoId={videoId || `bible-year:${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
          videoTitle={displayTitle}
          videoUrl={videoSrc || ""}
          videoContext={videoContext}
        />
      </section>
    );
  }

  const totalDurationLabel = formatTime(effectiveDuration || 0);
  const positionSummaryLabel = effectiveDuration ? `${formatTime(displayTime)} / ${totalDurationLabel}` : durationLabel;

  if (audiobookMode) {
    return (
      <section className="mb-1 w-full overflow-hidden rounded-[18px] text-center text-[var(--bb-text-primary,#111827)]">
        <div
          className={`flex min-w-0 flex-col items-center gap-2 ${controlsLocked ? "pointer-events-none select-none opacity-85" : ""}`}
          aria-disabled={controlsLocked}
        >
          {showHeader ? (
            <div className="w-full text-center">
              <p className="text-[15px] font-bold text-[var(--bb-text-primary,#111827)]">{title}</p>
            </div>
          ) : null}

          <div className="w-full grid gap-1.5">
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
              onPointerCancel={(event) => finishScrubbing(Number((event.currentTarget as HTMLInputElement).value))}
              onTouchEnd={(event) => finishScrubbing(Number((event.currentTarget as HTMLInputElement).value))}
              onKeyUp={(event) => finishScrubbing(Number((event.currentTarget as HTMLInputElement).value))}
              onBlur={(event) => {
                if (isScrubbing) finishScrubbing(Number(event.currentTarget.value));
              }}
              disabled={controlsLocked || !effectiveDuration}
              aria-label="Audio progress"
              className="h-1.5 w-full cursor-pointer accent-[var(--bb-accent,#2f7fe8)] disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div className="flex items-center justify-between gap-2 text-[11px] font-semibold text-[var(--bb-text-muted,#6b7280)] sm:text-[12px]">
              <span className="text-left">{formatTime(displayTime)}</span>
              <span className="text-right">{duration ? `${formatTime(remainingTime)} left` : effectiveDuration ? `${formatTime(remainingTime)} left` : durationLabel || "Audio time"}</span>
            </div>
          </div>

          <div className="flex w-full min-w-0 flex-nowrap items-center justify-between gap-1.5 sm:gap-2">
            <div className="shrink-0">
              <label className="sr-only" htmlFor={speedControlId}>Playback speed</label>
              <select
                id={speedControlId}
                value={playbackRate}
                onChange={(event) => changePlaybackRate(Number(event.target.value))}
                disabled={controlsLocked}
                className="h-10 min-w-[60px] rounded-[12px] border border-[var(--bb-card-border,#dbe7f4)] bg-white px-2 text-center text-[14px] font-black text-[var(--bb-text-primary,#111827)] outline-none shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition hover:border-[var(--bb-accent,#2f7fe8)] focus:border-[var(--bb-accent,#2f7fe8)] sm:h-11 sm:min-w-[68px]"
                aria-label="Playback speed"
              >
                {[1, 1.25, 1.5, 2].map((rate) => (
                  <option key={rate} value={rate}>
                    {rate.toFixed(rate === 1 ? 0 : rate % 1 === 0 ? 0 : 2)}x
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => seekBy(-15)}
              disabled={controlsLocked}
              className="grid h-10 w-[52px] shrink-0 place-items-center rounded-[12px] border border-[var(--bb-card-border,#dbe7f4)] bg-white text-[var(--bb-text-primary,#111827)] shadow-[0_8px_18px_rgba(15,23,42,0.08)] transition hover:border-[var(--bb-accent,#2f7fe8)] disabled:opacity-50 sm:h-11 sm:w-[56px]"
              aria-label="Rewind 15 seconds"
            >
              <span className="flex items-center gap-1 text-[14px] font-black">
                <span className="text-base" aria-hidden="true">‹</span>
                <span>15</span>
              </span>
            </button>

            <button
              type="button"
              onClick={toggleAudio}
              disabled={controlsLocked || loading}
              className="grid h-[62px] w-[62px] shrink-0 place-items-center rounded-full bg-[var(--bb-accent,#2f7fe8)] text-white shadow-[0_16px_30px_rgba(47,127,232,0.30)] disabled:opacity-60 sm:h-[70px] sm:w-[70px]"
              aria-label={playing ? "Pause audio lesson" : "Play audio lesson"}
            >
              {loading ? (
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
              ) : playing ? (
                <span className="text-[22px] font-black leading-none sm:text-[26px]" aria-hidden="true">II</span>
              ) : (
                <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-current sm:border-y-[10px] sm:border-l-[15px]" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => seekBy(15)}
              disabled={controlsLocked}
              className="grid h-10 w-[52px] shrink-0 place-items-center rounded-[12px] border border-[var(--bb-card-border,#dbe7f4)] bg-white text-[var(--bb-text-primary,#111827)] shadow-[0_8px_18px_rgba(15,23,42,0.08)] transition hover:border-[var(--bb-accent,#2f7fe8)] disabled:opacity-50 sm:h-11 sm:w-[56px]"
              aria-label="Forward 15 seconds"
            >
              <span className="flex items-center gap-1 text-[14px] font-black">
                <span>15</span>
                <span className="text-base" aria-hidden="true">›</span>
              </span>
            </button>

            <button
              type="button"
              onClick={onNextLesson}
              disabled={controlsLocked || !onNextLesson}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] border border-[var(--bb-card-border,#dbe7f4)] bg-white text-[var(--bb-text-primary,#111827)] shadow-[0_8px_18px_rgba(15,23,42,0.08)] transition hover:border-[var(--bb-accent,#2f7fe8)] disabled:opacity-40 sm:h-11 sm:w-11"
              aria-label={nextLessonLabel}
              title={nextLessonLabel}
            >
              <span className="text-[18px] font-black leading-none" aria-hidden="true">›</span>
            </button>
          </div>
        </div>
        {!controlsLocked && showHelpfulPoll ? (
          <VideoHelpfulPoll
            userId={userId}
            videoId={`audio:${videoId || audioSrc || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
            videoTitle={title}
            videoUrl={audioSrc}
            videoContext={videoContext}
            mediaType="audio"
          />
        ) : null}
      </section>
    );
  }

  return (
    <section className="mb-2 overflow-hidden rounded-[16px] text-center text-[#f8fafc]">
      <div
        className={`flex min-w-0 flex-col items-center gap-2 ${controlsLocked ? "pointer-events-none select-none opacity-85" : ""}`}
        aria-disabled={controlsLocked}
      >
        {!compactMediaControls ? (
        <div className="flex w-full flex-col items-center gap-3">
          <button
            type="button"
            onClick={toggleAudio}
            disabled={controlsLocked || loading}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f8fafc] text-[#08111d] shadow-[0_8px_18px_rgba(255,255,255,0.10)] transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70"
            aria-label={playing ? "Pause Day 1 audio lesson" : "Play Day 1 audio lesson"}
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
            ) : playing ? (
              <span className="text-sm font-black leading-none" aria-hidden="true">II</span>
            ) : (
              <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-current" aria-hidden="true" />
            )}
          </button>
          <div className="min-w-0 max-w-full">
            <p className="text-[15px] font-bold text-white">{title}</p>
            <p className="mt-0.5 text-[11px] font-semibold text-[#8e9baf]">
              {playing ? "Playing" : currentTime > 2 ? "Ready to resume" : "Audio lesson"}
              {" • "}
              {duration ? formatTime(duration) : durationLabel}
            </p>
          </div>
          <span className="rounded-full border border-[#2a394d] bg-[#121e2d] px-2.5 py-1 text-[11px] font-bold text-[#d8e0eb]">
            {playbackRate}x
          </span>
        </div>
        ) : null}

        <div className="grid w-full gap-2">
            <div className="grid gap-1.5 rounded-2xl bg-transparent px-0 py-1.5">
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
                onPointerCancel={(event) => finishScrubbing(Number((event.currentTarget as HTMLInputElement).value))}
                onTouchEnd={(event) => finishScrubbing(Number((event.currentTarget as HTMLInputElement).value))}
                onKeyUp={(event) => finishScrubbing(Number((event.currentTarget as HTMLInputElement).value))}
                onBlur={(event) => {
                  if (isScrubbing) finishScrubbing(Number(event.currentTarget.value));
                }}
                disabled={controlsLocked || !effectiveDuration}
                aria-label="Audio progress"
                className="h-1.5 w-full cursor-pointer accent-[#7BAFD4] disabled:cursor-not-allowed disabled:opacity-50"
              />
              <div className="flex items-center justify-between gap-3 text-[11px] font-semibold text-[#8e9baf]">
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

            {compactMediaControls ? (
              <>
                <div className="flex w-full min-w-0 flex-nowrap items-center justify-center gap-1 sm:gap-1.5">
                  <label className="sr-only" htmlFor={speedControlId}>Playback speed</label>
                  <select
                    id={speedControlId}
                    value={playbackRate}
                    onChange={(event) => changePlaybackRate(Number(event.target.value))}
                    disabled={controlsLocked}
                    className="h-9 w-[46px] shrink-0 rounded-xl border border-[#2a394d] bg-[#121e2d] px-1 text-center text-[10px] font-black text-[#d8e0eb] outline-none shadow-[0_6px_14px_rgba(0,0,0,0.14)] transition hover:bg-[#18283b] focus:border-[#7BAFD4] sm:h-10 sm:w-[52px] sm:text-[11px]"
                    aria-label="Playback speed"
                  >
                    {[1, 1.25, 1.5, 2].map((rate) => (
                      <option key={rate} value={rate} className="bg-[#121e2d] text-[#f8fafc]">
                        {rate}x
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={onPreviousLesson}
                    disabled={controlsLocked || !onPreviousLesson}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#2a394d] bg-[#121e2d] text-sm font-black text-[#d8e0eb] shadow-[0_6px_14px_rgba(0,0,0,0.14)] transition hover:bg-[#18283b] disabled:cursor-not-allowed disabled:opacity-35 sm:h-10 sm:w-10 sm:text-base"
                    aria-label={previousLessonLabel}
                    title={previousLessonLabel}
                  >
                    <span aria-hidden="true">‹</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => seekBy(-15)}
                    disabled={controlsLocked}
                    className="grid h-9 w-10 shrink-0 place-items-center rounded-xl border border-[#2a394d] bg-[#121e2d] text-[10px] font-black text-[#d8e0eb] shadow-[0_6px_14px_rgba(0,0,0,0.14)] transition hover:bg-[#18283b] disabled:opacity-50 sm:h-10 sm:w-11 sm:text-[11px]"
                    aria-label="Rewind 15 seconds"
                  >
                    -15
                  </button>
                  <button
                    type="button"
                    onClick={toggleAudio}
                    disabled={controlsLocked || loading}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#f8fafc] text-[#08111d] shadow-[0_8px_20px_rgba(255,255,255,0.12)] transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70 sm:h-11 sm:w-11"
                    aria-label={playing ? "Pause audio lesson" : "Play audio lesson"}
                  >
                    {loading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
                    ) : playing ? (
                      <span className="text-base font-black leading-none" aria-hidden="true">II</span>
                    ) : (
                      <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-current sm:border-y-[7px] sm:border-l-[12px]" aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => seekBy(15)}
                    disabled={controlsLocked}
                    className="grid h-9 w-10 shrink-0 place-items-center rounded-xl border border-[#2a394d] bg-[#121e2d] text-[10px] font-black text-[#d8e0eb] shadow-[0_6px_14px_rgba(0,0,0,0.14)] transition hover:bg-[#18283b] disabled:opacity-50 sm:h-10 sm:w-11 sm:text-[11px]"
                    aria-label="Skip forward 15 seconds"
                  >
                    +15
                  </button>
                  <button
                    type="button"
                    onClick={onNextLesson}
                    disabled={controlsLocked || !onNextLesson}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#2a394d] bg-[#121e2d] text-sm font-black text-[#d8e0eb] shadow-[0_6px_14px_rgba(0,0,0,0.14)] transition hover:bg-[#18283b] disabled:cursor-not-allowed disabled:opacity-35 sm:h-10 sm:w-10 sm:text-base"
                    aria-label={nextLessonLabel}
                    title={nextLessonLabel}
                  >
                    <span aria-hidden="true">›</span>
                  </button>
                </div>
              </>
            ) : null}

            {!compactMediaControls ? (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center justify-center">
                {compactMediaControls && onPreviousLesson ? (
                  <button
                    type="button"
                    onClick={onPreviousLesson}
                    className="rounded-full border border-[#2a394d] bg-[#121e2d] px-3 py-2 text-[11px] font-bold text-[#d8e0eb] transition hover:bg-[#18283b]"
                    aria-label={previousLessonLabel}
                    title={previousLessonLabel}
                  >
                    <span aria-hidden="true">‹</span>
                    <span className="ml-1 hidden sm:inline">Prev</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => seekBy(-15)}
                    disabled={controlsLocked}
                    className="rounded-full border border-[#2a394d] bg-[#121e2d] px-3 py-1.5 text-[11px] font-bold text-[#d8e0eb] transition hover:bg-[#18283b] disabled:opacity-50"
                  >
                    -15s
                  </button>
                )}
              </div>
              {compactMediaControls ? (
                <button
                  type="button"
                  onClick={toggleAudio}
                  disabled={controlsLocked || loading}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f8fafc] text-[#08111d] shadow-[0_8px_18px_rgba(255,255,255,0.10)] transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70"
                  aria-label={playing ? "Pause audio lesson" : "Play audio lesson"}
                >
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
                  ) : playing ? (
                    <span className="text-sm font-black leading-none" aria-hidden="true">II</span>
                  ) : (
                    <span className="ml-0.5 h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-current" aria-hidden="true" />
                  )}
                </button>
              ) : null}
              <div className="flex items-center justify-center gap-2">
                {compactMediaControls && onNextLesson ? (
                  <button
                    type="button"
                    onClick={onNextLesson}
                    disabled={controlsLocked}
                    className="rounded-full border border-[#2a394d] bg-[#121e2d] px-3 py-2 text-[11px] font-bold text-[#d8e0eb] transition hover:bg-[#18283b]"
                    aria-label={nextLessonLabel}
                    title={nextLessonLabel}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span className="ml-1" aria-hidden="true">›</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => seekBy(15)}
                    disabled={controlsLocked}
                    className="rounded-full border border-[#2a394d] bg-[#121e2d] px-3 py-1.5 text-[11px] font-bold text-[#d8e0eb] transition hover:bg-[#18283b] disabled:opacity-50"
                  >
                    +15s
                  </button>
                )}
                <label className="sr-only" htmlFor={speedControlId}>Playback speed</label>
                <select
                  id={speedControlId}
                  value={playbackRate}
                  onChange={(event) => changePlaybackRate(Number(event.target.value))}
                  disabled={controlsLocked}
                  className="h-8 rounded-full border border-[#2a394d] bg-[#121e2d] px-3 text-[11px] font-bold text-[#d8e0eb] outline-none transition hover:bg-[#18283b] focus:border-[#7BAFD4]"
                  aria-label="Playback speed"
                >
                  {[1, 1.25, 1.5, 2].map((rate) => (
                    <option key={rate} value={rate} className="bg-[#121e2d] text-[#f8fafc]">
                      {rate}x
                    </option>
                  ))}
                </select>
              </div>
            </div>
            ) : null}
          </div>
      </div>
      {!controlsLocked ? (
        <VideoHelpfulPoll
          userId={userId}
          videoId={`audio:${videoId || audioSrc || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
          videoTitle={title}
          videoUrl={audioSrc}
          videoContext={videoContext}
          mediaType="audio"
        />
      ) : null}
    </section>
  );
}
