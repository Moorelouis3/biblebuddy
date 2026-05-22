"use client";

import { useEffect, useMemo, useState } from "react";
import { ACTION_TYPE } from "../lib/actionTypes";
import { BIBLE_TOPICS } from "../lib/bibleTopics";
import { logActionToMasterActions } from "../lib/actionRecorder";
import { awardDiamonds } from "../lib/diamondWallet";
import { supabase } from "../lib/supabaseClient";
import ChapterNotesMarkdown from "./ChapterNotesMarkdown";
import { triggerPoints } from "./PointsPop";

const TOPIC_LESSON_XP = 20;
const TOPIC_LESSON_DIAMONDS = 10;

type BibleTopicsPanelProps = {
  userId?: string | null;
};

function getLessonCompletionId(topicSlug: string, lessonSlug: string) {
  return `${topicSlug}:${lessonSlug}`;
}

function getLessonActionLabel(topicSlug: string, lessonSlug: string) {
  return `bible_topic_lesson:${topicSlug}:${lessonSlug}`;
}

function getCompletionStorageKey(userId?: string | null) {
  return `bb:bible-topics-completed:${userId || "guest"}`;
}

export default function BibleTopicsPanel({ userId }: BibleTopicsPanelProps) {
  const [selectedTopicSlug, setSelectedTopicSlug] = useState(BIBLE_TOPICS[0]?.slug || "anxiety");
  const [openLessonSlug, setOpenLessonSlug] = useState("");
  const [mountedVideoByLesson, setMountedVideoByLesson] = useState<Record<string, boolean>>({});
  const [completedLessonIds, setCompletedLessonIds] = useState<Record<string, boolean>>({});
  const [isCompletingLesson, setIsCompletingLesson] = useState(false);
  const [studyNotesOpen, setStudyNotesOpen] = useState(false);
  const sortedTopics = useMemo(
    () => [...BIBLE_TOPICS].sort((a, b) => a.title.localeCompare(b.title)),
    [],
  );
  const selectedTopic = BIBLE_TOPICS.find((topic) => topic.slug === selectedTopicSlug) || BIBLE_TOPICS[0];
  const selectedLesson = selectedTopic?.lessons[0] || null;
  const totalLessons = useMemo(() => BIBLE_TOPICS.reduce((total, topic) => total + topic.lessons.length, 0), []);
  const completedLessons = useMemo(() => Object.values(completedLessonIds).filter(Boolean).length, [completedLessonIds]);
  const selectedLessonOpen = Boolean(selectedLesson && openLessonSlug === selectedLesson.slug);
  const selectedLessonVideoMounted = Boolean(selectedLesson && mountedVideoByLesson[selectedLesson.slug]);
  const selectedLessonCompletionId = selectedLesson && selectedTopic ? getLessonCompletionId(selectedTopic.slug, selectedLesson.slug) : "";
  const selectedLessonComplete = Boolean(selectedLessonCompletionId && completedLessonIds[selectedLessonCompletionId]);
  const selectedLessonVideoSrc = selectedLesson?.videoSrc
    ? `${selectedLesson.videoSrc}${selectedLesson.videoSrc.includes("?") ? "&" : "?"}autoplay=true&muted=false&preload=true&responsive=true`
    : null;
  const cleanedTranscript = selectedLesson
    ? selectedLesson.transcript
        .replace(/^# 7 Bible Verses for Peace of Mind\s*/m, "")
        .replace(/^# 🕊️ Bible Topics: Anxiety\s*/m, "")
        .replace(/^## 📖 The Verse\s*/gm, "")
        .trim()
    : "";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storageKey = getCompletionStorageKey(userId);
    try {
      const saved = window.localStorage.getItem(storageKey);
      setCompletedLessonIds(saved ? JSON.parse(saved) : {});
    } catch {
      setCompletedLessonIds({});
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;
    async function loadCompletedLessons() {
      const labels = BIBLE_TOPICS.flatMap((topic) =>
        topic.lessons.map((lesson) => getLessonActionLabel(topic.slug, lesson.slug)),
      );
      if (!labels.length) return;

      const { data, error } = await supabase
        .from("master_actions")
        .select("action_label")
        .eq("user_id", userId)
        .eq("action_type", ACTION_TYPE.bible_topic_lesson_completed)
        .in("action_label", labels);

      if (cancelled || error) return;

      const completedFromServer: Record<string, boolean> = {};
      data?.forEach((row) => {
        const label = typeof row?.action_label === "string" ? row.action_label : "";
        const match = label.match(/^bible_topic_lesson:([^:]+):(.+)$/);
        if (!match) return;
        completedFromServer[getLessonCompletionId(match[1], match[2])] = true;
      });

      if (Object.keys(completedFromServer).length === 0) return;

      setCompletedLessonIds((current) => {
        const next = { ...current, ...completedFromServer };
        if (typeof window !== "undefined") {
          window.localStorage.setItem(getCompletionStorageKey(userId), JSON.stringify(next));
        }
        return next;
      });
    }

    void loadCompletedLessons();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  function toggleLessonCard(lessonSlug: string) {
    setOpenLessonSlug((current) => {
      const next = current === lessonSlug ? "" : lessonSlug;
      setStudyNotesOpen(false);
      return next;
    });
    setMountedVideoByLesson((current) => ({ ...current, [lessonSlug]: true }));
  }

  function selectTopic(topicSlug: string) {
    setSelectedTopicSlug(topicSlug);
    setOpenLessonSlug("");
    setStudyNotesOpen(false);
  }

  async function markSelectedLessonComplete() {
    if (!selectedTopic || !selectedLesson || !selectedLessonCompletionId || selectedLessonComplete || isCompletingLesson) return;

    setIsCompletingLesson(true);
    const completionId = selectedLessonCompletionId;
    const nextCompleted = { ...completedLessonIds, [completionId]: true };

    try {
      if (userId) {
        const actionLabel = getLessonActionLabel(selectedTopic.slug, selectedLesson.slug);
        const { data: existing, error: existingError } = await supabase
          .from("master_actions")
          .select("id")
          .eq("user_id", userId)
          .eq("action_type", ACTION_TYPE.bible_topic_lesson_completed)
          .eq("action_label", actionLabel)
          .limit(1);

        const alreadyRewarded = !existingError && Boolean(existing?.length);
        if (!alreadyRewarded) {
          await logActionToMasterActions(userId, ACTION_TYPE.bible_topic_lesson_completed, actionLabel);
          await awardDiamonds(userId, TOPIC_LESSON_DIAMONDS);
          triggerPoints(TOPIC_LESSON_XP, "Bible Topics lesson");
        }
      } else {
        triggerPoints(TOPIC_LESSON_XP, "Bible Topics lesson");
      }

      setCompletedLessonIds(nextCompleted);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(getCompletionStorageKey(userId), JSON.stringify(nextCompleted));
      }
      setOpenLessonSlug("");
      setStudyNotesOpen(false);
    } catch (error) {
      console.warn("[BIBLE_TOPICS] Could not persist lesson completion:", error);
      setCompletedLessonIds(nextCompleted);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(getCompletionStorageKey(userId), JSON.stringify(nextCompleted));
      }
      setOpenLessonSlug("");
      setStudyNotesOpen(false);
    } finally {
      setIsCompletingLesson(false);
    }
  }

  return (
    <section className="w-full px-1">
      <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
        <div className="bb-skin-glow-card overflow-hidden rounded-[28px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] text-left shadow-[0_14px_36px_rgba(38,63,99,0.10)]">
          <div className="bg-[radial-gradient(circle_at_18%_0%,color-mix(in_srgb,var(--bb-accent,#2f7fe8)_22%,transparent),transparent_42%),linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_88%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_68%,transparent))] px-4 pb-5 pt-5 sm:px-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Bible Topics</p>
            <h1 className="mt-1 text-3xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">Guided Biblical Wisdom</h1>
            <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
              Searchable teachings for real life struggles, emotions, church terms, practical faith, and common questions people bring to Scripture.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-[var(--bb-surface-soft,#f8fbff)] p-3 text-center">
                <p className="text-lg font-black text-[var(--bb-text-primary,#111827)]">{BIBLE_TOPICS.length}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--bb-text-muted,#6b7280)]">topics</p>
              </div>
              <div className="rounded-2xl bg-[var(--bb-surface-soft,#f8fbff)] p-3 text-center">
                <p className="text-lg font-black text-[var(--bb-text-primary,#111827)]">{totalLessons}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--bb-text-muted,#6b7280)]">lessons</p>
              </div>
              <div className="rounded-2xl bg-[var(--bb-surface-soft,#f8fbff)] p-3 text-center">
                <p className="text-lg font-black text-[var(--bb-text-primary,#111827)]">{completedLessons}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--bb-text-muted,#6b7280)]">completed</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-3 sm:p-4">
            {selectedTopic ? (
              <div className="rounded-[24px] border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_34%,var(--bb-card-border,#dbe7f4))] bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--bb-accent,#2f7fe8)_24%,transparent),transparent_48%),linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_88%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_72%,transparent))] p-4 text-center shadow-[0_16px_34px_rgba(0,0,0,0.12)]">
                <select
                  id="bible-topic-subject"
                  value={selectedTopicSlug}
                  onChange={(event) => selectTopic(event.target.value)}
                  aria-label="Choose Bible topic"
                  className="mx-auto block w-full max-w-sm appearance-none rounded-[22px] border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_34%,var(--bb-card-border,#dbe7f4))] bg-[linear-gradient(135deg,var(--bb-card,#ffffff),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_82%,transparent))] px-5 py-4 text-center text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_12px_26px_rgba(0,0,0,0.12)] outline-none transition focus:border-[var(--bb-accent,#2f7fe8)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_18%,transparent)]"
                >
                  {sortedTopics.map((topic) => (
                    <option key={topic.slug} value={topic.slug}>
                      {topic.title}
                    </option>
                  ))}
                </select>
                <p className="mx-auto mt-3 max-w-sm text-center text-sm font-black leading-6 text-[var(--bb-text-primary,#111827)]">
                  {selectedTopic.description}
                </p>
              </div>
            ) : null}

            {selectedLesson ? (
              <>
                <div
                  className={`overflow-hidden rounded-[26px] border shadow-[0_16px_38px_rgba(0,0,0,0.14)] transition ${
                    selectedLessonComplete
                      ? "border-emerald-400/70 bg-[linear-gradient(135deg,rgba(6,95,70,0.18),var(--bb-card,#ffffff))] shadow-[0_18px_42px_rgba(16,185,129,0.18)]"
                      : "border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_34%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleLessonCard(selectedLesson.slug)}
                    className={`w-full p-3 text-left transition hover:brightness-[1.02] ${
                      selectedLessonComplete
                        ? "bg-[radial-gradient(circle_at_22%_0%,rgba(16,185,129,0.30),transparent_46%),linear-gradient(135deg,rgba(6,95,70,0.22),color-mix(in_srgb,var(--bb-card,#ffffff)_82%,transparent))]"
                        : "bg-[radial-gradient(circle_at_22%_0%,color-mix(in_srgb,var(--bb-accent,#2f7fe8)_20%,transparent),transparent_46%),linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_88%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_76%,transparent))]"
                    }`}
                    aria-expanded={selectedLessonOpen}
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_18%,var(--bb-card,#ffffff))] text-xl shadow-sm" aria-hidden="true">
                        📖
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">{selectedTopic.title} Lesson</p>
                            <h2 className="mt-1 text-xl font-black leading-tight text-[var(--bb-text-primary,#111827)]">{selectedLesson.title}</h2>
                          </div>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-black ${
                              selectedLessonComplete
                                ? "bg-emerald-500 text-white"
                                : "bg-[var(--bb-surface-soft,#f8fbff)] text-[var(--bb-accent,#2f7fe8)]"
                            }`}
                          >
                            {selectedLessonComplete ? "Complete" : selectedLesson.estimatedTime}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-semibold leading-5 text-[var(--bb-text-secondary,#4b5563)]">{selectedLesson.subtitle}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-1 text-[11px] font-black text-[var(--bb-text-primary,#111827)]">
                            +{TOPIC_LESSON_XP} XP
                          </span>
                          <span className="rounded-full bg-[var(--bb-surface-soft,#f8fbff)] px-3 py-1 text-[11px] font-black text-[var(--bb-text-primary,#111827)]">
                            +{TOPIC_LESSON_DIAMONDS} diamonds
                          </span>
                          <span className="text-[11px] font-bold text-[var(--bb-text-muted,#6b7280)]">Earn rewards when you finish the lesson.</span>
                        </div>
                      </div>
                    </div>
                  </button>

                  <div
                    className={`hidden transition-[grid-template-rows,opacity] duration-500 ${
                      selectedLessonOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="space-y-3 p-4">
                        <div className="overflow-hidden rounded-[24px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_42%,transparent)] bg-[#070503] shadow-[0_24px_58px_rgba(0,0,0,0.42),0_0_34px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_20%,transparent)]">
                          <div className="relative aspect-video overflow-hidden bg-black">
                            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(0,0,0,0.36)),linear-gradient(180deg,rgba(0,0,0,0.18),transparent_35%,rgba(0,0,0,0.22))]" aria-hidden="true" />
                            {false && selectedLessonVideoMounted && selectedLessonVideoSrc ? (
                              <iframe
                                src={selectedLessonVideoSrc || undefined}
                                title={selectedLesson.title}
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                allowFullScreen
                                className="absolute inset-0 h-full w-full border-0"
                              />
                            ) : (
                              <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_35%,color-mix(in_srgb,var(--bb-accent,#f6b44b)_22%,transparent),transparent_44%),linear-gradient(135deg,#111827,#050505)] text-center text-white">
                                <div className="grid gap-3">
                                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--bb-accent,#f6b44b)] pl-1 text-3xl text-black shadow-[0_0_34px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_70%,transparent)]" aria-hidden="true">▶</span>
                                  <p className="text-sm font-black">Tap the lesson card to start the video</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {selectedLessonOpen ? (
                  <>
                  <div className="overflow-hidden rounded-[26px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_36%,var(--bb-card-border,#dbe7f4))] bg-[var(--bb-card,#ffffff)] shadow-[0_18px_42px_rgba(0,0,0,0.16)]">
                    <div className="border-b border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_22%,var(--bb-card-border,#dbe7f4))] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_88%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_76%,transparent))] px-4 py-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Video Lesson</p>
                      <h3 className="mt-1 text-lg font-black leading-tight text-[var(--bb-text-primary,#111827)]">{selectedLesson.title}</h3>
                    </div>
                    <div className="p-3">
                      <div className="overflow-hidden rounded-[22px] border border-[color-mix(in_srgb,var(--bb-accent,#f6b44b)_42%,transparent)] bg-[#070503] shadow-[0_24px_58px_rgba(0,0,0,0.42),0_0_34px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_20%,transparent)]">
                        <div className="relative aspect-video overflow-hidden bg-black">
                          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(0,0,0,0.36)),linear-gradient(180deg,rgba(0,0,0,0.18),transparent_35%,rgba(0,0,0,0.22))]" aria-hidden="true" />
                          {selectedLessonVideoMounted && selectedLessonVideoSrc ? (
                            <iframe
                              src={selectedLessonVideoSrc}
                              title={selectedLesson.title}
                              loading="lazy"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                              allowFullScreen
                              className="absolute inset-0 h-full w-full border-0"
                            />
                          ) : (
                            <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_35%,color-mix(in_srgb,var(--bb-accent,#f6b44b)_22%,transparent),transparent_44%),linear-gradient(135deg,#111827,#050505)] text-center text-white">
                              <div className="grid gap-3">
                                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--bb-accent,#f6b44b)] text-xl font-black text-black shadow-[0_0_34px_color-mix(in_srgb,var(--bb-accent,#f6b44b)_70%,transparent)]" aria-hidden="true">Play</span>
                                <p className="text-sm font-black">Tap the lesson card to start the video</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[26px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] shadow-sm">
                    <button
                      type="button"
                      onClick={() => setStudyNotesOpen((current) => !current)}
                      className="flex w-full items-center justify-between gap-3 bg-[linear-gradient(135deg,color-mix(in_srgb,var(--bb-card,#ffffff)_90%,transparent),color-mix(in_srgb,var(--bb-surface-soft,#f8fbff)_74%,transparent))] px-4 py-4 text-left transition hover:brightness-[1.02]"
                      aria-expanded={studyNotesOpen}
                    >
                      <span className="min-w-0">
                        <span className="block text-lg font-black leading-tight text-[var(--bb-text-primary,#111827)]">Study Notes</span>
                        <span className="mt-1 block text-xs font-bold text-[var(--bb-text-muted,#6b7280)]">
                          {studyNotesOpen ? "Click to close" : "Click to read"}
                        </span>
                      </span>
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_28%,transparent)] bg-[var(--bb-surface-soft,#f8fbff)] text-lg font-black text-[var(--bb-accent,#2f7fe8)] transition ${
                          studyNotesOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        ↓
                      </span>
                    </button>
                    {studyNotesOpen ? (
                      <div className="border-t border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_18%,var(--bb-card-border,#dbe7f4))] p-4">
                        <ChapterNotesMarkdown>{cleanedTranscript}</ChapterNotesMarkdown>
                        <div className="mt-5 border-t border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_22%,var(--bb-card-border,#dbe7f4))] pt-4">
                          <button
                            type="button"
                            onClick={markSelectedLessonComplete}
                            disabled={selectedLessonComplete || isCompletingLesson}
                            className={`w-full rounded-2xl px-4 py-3 text-sm font-black shadow-[0_14px_30px_rgba(0,0,0,0.18)] transition ${
                              selectedLessonComplete
                                ? "bg-emerald-600 text-white"
                                : "bg-[linear-gradient(135deg,var(--bb-accent,#2f7fe8),color-mix(in_srgb,var(--bb-accent,#2f7fe8)_72%,#16a34a))] text-[var(--bb-button-text,#ffffff)] hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
                            }`}
                          >
                            {selectedLessonComplete
                              ? "Completed"
                              : isCompletingLesson
                                ? "Saving..."
                                : `Mark Complete +${TOPIC_LESSON_XP} XP +${TOPIC_LESSON_DIAMONDS} diamonds`}
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  </>
                ) : null}
              </>
            ) : (
              <div className="rounded-[24px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Coming Soon</p>
                <h2 className="mt-1 text-2xl font-black text-[var(--bb-text-primary,#111827)]">{selectedTopic?.title} lessons are planned</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
                  This topic category is ready for narrated lessons, MP3 audio, video playback, bookmarks, and future discussion.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
