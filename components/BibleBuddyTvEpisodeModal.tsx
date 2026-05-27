"use client";

import { useEffect, useRef, useState } from "react";
import { ModalShell } from "./ModalShell";
import type { BibleBuddyTvEpisode, BibleBuddyTvTitle } from "../lib/bibleBuddyTvContent";
import CommentSection from "./comments/CommentSection";
import { supabase } from "../lib/supabaseClient";
import { enrichPlainText } from "../lib/bibleHighlighting";
import { resolveBibleReference } from "../lib/bibleTermResolver";
import { ACTION_TYPE } from "../lib/actionTypes";
import { ensureBibleEntityLearned } from "../lib/bibleEntityProgress";
import { consumeCreditAction } from "../lib/creditClient";
import { getKeywordPopupNotes, getPersonPopupNotes, getPlacePopupNotes } from "../lib/bibleNotes";
import CreditLimitModal from "./CreditLimitModal";
import ReactMarkdown from "react-markdown";
import { LouisAvatar } from "./LouisAvatar";
import YouTubeTrackedPlayer from "./YouTubeTrackedPlayer";

const CAROLINA_BLUE = "#4B9CD3";
const CAROLINA_BLUE_SOFT = "#EAF5FC";

interface BibleBuddyTvEpisodeModalProps {
  title: BibleBuddyTvTitle;
  episode: BibleBuddyTvEpisode | null;
  isOpen: boolean;
  onClose: () => void;
  onShare?: (episode: BibleBuddyTvEpisode) => Promise<void> | void;
  onShareRequestOpen?: (episode: BibleBuddyTvEpisode) => void;
  sharingEpisodeId?: string | null;
}

type HighlightTarget =
  | { type: "people"; name: string }
  | { type: "places"; name: string }
  | { type: "keywords"; name: string };

function renderStudyNotesDocumentHtml(markdown: string): string {
  const sections = markdown.trim().split(/\n\s*\n/).filter(Boolean);
  return sections.map((section) => {
    const lines = section.split("\n").map((line) => line.trim()).filter(Boolean);
    if (!lines.length) return "";
    if (lines.length === 1 && /^#{1,3}\s+/.test(lines[0])) {
      const heading = enrichPlainText(lines[0].replace(/^#{1,3}\s+/, ""));
      return `<h1 class="mt-8 border-b border-gray-100 pb-3 text-2xl font-bold text-gray-900 first:mt-0">${heading}</h1>`;
    }
    if (lines.every((line) => line.startsWith("> "))) {
      const quote = lines.map((line) => enrichPlainText(line.slice(2))).join("<br />");
      return `<blockquote class="mt-4 border-l-4 border-orange-500 bg-orange-50 px-5 py-4 text-[15px] italic leading-7 text-gray-700">${quote}</blockquote>`;
    }
    if (lines.every((line) => line.startsWith("- "))) {
      const items = lines.map((line) => `<li class="pl-1">${enrichPlainText(line.slice(2))}</li>`).join("");
      return `<ul class="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-8 text-gray-700">${items}</ul>`;
    }
    return `<p class="mt-4 text-[15px] leading-8 text-gray-700">${lines.map((line) => enrichPlainText(line)).join("<br />")}</p>`;
  }).join("");
}

function normalizeMarkdownForModal(markdown: string): string {
  return markdown.replace(/^\s*[-\u2022*]\s+/gm, "").replace(/\n{3,}/g, "\n\n").trim();
}

const notesUnlockLabel = (title: BibleBuddyTvTitle, episode: BibleBuddyTvEpisode) => `Bible Buddy TV Notes:${title.slug}:${episode.id}`;
const notesCacheKey = (episodeId: string) => `bbtv-deep-notes:v1:${episodeId}`;

function buildDeepStudyPrompt(title: BibleBuddyTvTitle, episode: BibleBuddyTvEpisode) {
  const isMovie = title.contentType === "movie";
  const contentTypeLabel = isMovie ? "movie" : "episode";
  const summaryText = episode.louisIntro || episode.summary;
  const seedNotes = episode.studyNotesDocument?.trim() || "No starter notes yet.";
  return `You are writing premium Bible Buddy study notes for a ${contentTypeLabel}.
Write 1000 to 1500 words in markdown.
Style requirements:
- Sound like Bible Buddy: warm, sharp, clear, thoughtful, spiritually rich, and easy to follow
- Slightly less personal than a first-person teacher voice, but still with strong rhythm and conviction
- Use emoji section headings often
- Use short paragraphs, bullet lists, and a few callout quotes
- Make it feel like a real deep-dive note set, not a generic summary
- Connect characters, places, motives, tensions, and Scripture threads
- If a city, place, or region matters, explain why it matters
- If a person matters, explain who they are and why they matter
- Include at least one Hebrew or Greek word if helpful
- Include at least two direct Scripture callouts with verse references
- End with a strong takeaway section
- Do not mention Louis, AI, prompts, or that these notes were generated
Formatting rules:
- Use markdown headings like "# Heading"
- Use bullet lists with "-"
- Use blockquotes with ">"
- Avoid tables
Content requirements:
- Bible Buddy TV title: ${title.title}
- This ${contentTypeLabel}: ${episode.title}
- Label shown in app: ${episode.contentLabel || (isMovie ? "Movie" : `Episode ${episode.episodeNumber}`)}
- Duration: ${episode.duration}
- Title overview: ${title.overview}
- Title vibe: ${title.vibe}
- Search tags: ${(title.searchTags || []).join(", ")}
- On-screen summary: ${summaryText}
Direction:
${isMovie ? "Because this is a movie, do not force a chapter-by-chapter outline of every possible biblical scene. Cover the main arc the movie actually focuses on, explain the people and places that matter, and help the viewer understand the bigger biblical storyline underneath what they watched." : "Because this is an episode, explain what is happening in this part of the story, what pressures or themes are surfacing, and how it connects to the wider biblical arc."}
Use these existing notes as a seed to expand and deepen:
${seedNotes}`;
}

export default function BibleBuddyTvEpisodeModal({
  title,
  episode,
  isOpen,
  onClose,
  onShare,
  onShareRequestOpen,
  sharingEpisodeId = null,
}: BibleBuddyTvEpisodeModalProps) {
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [notesUnlocked, setNotesUnlocked] = useState(false);
  const [notesLoading, setNotesLoading] = useState(false);
  const [playerLoading, setPlayerLoading] = useState(true);
  const [generatedNotes, setGeneratedNotes] = useState<string | null>(null);
  const notesRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<HighlightTarget | null>(null);
  const [selectedNotes, setSelectedNotes] = useState<string | null>(null);
  const [loadingSelectedNotes, setLoadingSelectedNotes] = useState(false);
  const [notesCreditBlocked, setNotesCreditBlocked] = useState(false);
  const [isPaidUser, setIsPaidUser] = useState(false);
  const [personCreditBlocked, setPersonCreditBlocked] = useState(false);
  const [placeCreditBlocked, setPlaceCreditBlocked] = useState(false);
  const [keywordCreditBlocked, setKeywordCreditBlocked] = useState(false);
  const [completedPeople, setCompletedPeople] = useState<Set<string>>(new Set());
  const [completedPlaces, setCompletedPlaces] = useState<Set<string>>(new Set());
  const [completedKeywords, setCompletedKeywords] = useState<Set<string>>(new Set());
  const [viewedPeople, setViewedPeople] = useState<Set<string>>(new Set());
  const [viewedPlaces, setViewedPlaces] = useState<Set<string>>(new Set());
  const [viewedKeywords, setViewedKeywords] = useState<Set<string>>(new Set());
  const [ratingRows, setRatingRows] = useState<Array<{ user_id: string; rating: number }>>([]);
  const [currentUserRating, setCurrentUserRating] = useState<number>(0);
  const [ratingLoading, setRatingLoading] = useState(false);

  useEffect(() => {
    if (!episode || !isOpen) return;
    async function loadUserContext() {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);
      if (!user?.id) {
        setIsPaidUser(false);
        setCompletedPeople(new Set());
        setCompletedPlaces(new Set());
        setCompletedKeywords(new Set());
        return;
      }
      const [profileRes, peopleRes, placesRes, keywordsRes] = await Promise.all([
        supabase.from("profile_stats").select("is_paid").eq("user_id", user.id).maybeSingle(),
        supabase.from("people_progress").select("person_name").eq("user_id", user.id),
        supabase.from("places_progress").select("place_name").eq("user_id", user.id),
        supabase.from("keywords_progress").select("keyword").eq("user_id", user.id),
      ]);
      setIsPaidUser(Boolean(profileRes.data?.is_paid));
      setCompletedPeople(new Set((peopleRes.data || []).map((row: any) => String(row.person_name || "").toLowerCase().trim()).filter(Boolean)));
      setCompletedPlaces(new Set((placesRes.data || []).map((row: any) => String(row.place_name || "").toLowerCase().trim()).filter(Boolean)));
      setCompletedKeywords(new Set((keywordsRes.data || []).map((row: any) => String(row.keyword || "").toLowerCase().trim()).filter(Boolean)));
    }
    void loadUserContext();
  }, [episode, isOpen]);

  useEffect(() => {
    if (!episode || !isOpen) return;
    const currentEpisode = episode;
    async function loadRatings() {
      setRatingLoading(true);
      const { data, error } = await supabase.from("tv_episode_ratings").select("user_id, rating").eq("episode_id", currentEpisode.id);
      if (error) {
        console.error("[BibleBuddyTvEpisodeModal] Could not load episode ratings:", error);
        setRatingRows([]);
        setCurrentUserRating(0);
        setRatingLoading(false);
        return;
      }
      const rows = (data || []) as Array<{ user_id: string; rating: number }>;
      setRatingRows(rows);
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserRating(rows.find((row) => row.user_id === user?.id)?.rating ?? 0);
      setRatingLoading(false);
    }
    void loadRatings();
  }, [episode, isOpen]);

  useEffect(() => {
    setNotesExpanded(false);
    setSummaryExpanded(false);
    setNotesUnlocked(false);
    setNotesLoading(false);
    setPlayerLoading(true);
    setGeneratedNotes(null);
    setSelectedTarget(null);
    setSelectedNotes(null);
    setLoadingSelectedNotes(false);
    setNotesCreditBlocked(false);
  }, [episode?.id]);

  useEffect(() => {
    if (!isOpen) return;
    setPlayerLoading(Boolean(episode?.youtubeUrl));
  }, [episode?.youtubeUrl, isOpen]);

  useEffect(() => {
    if (!episode || !isOpen || !userId) return;
    const currentEpisode = episode;
    async function loadUnlockState() {
      const { data } = await supabase
        .from("master_actions")
        .select("id")
        .eq("user_id", userId)
        .eq("action_type", ACTION_TYPE.chapter_notes_viewed)
        .eq("action_label", notesUnlockLabel(title, currentEpisode))
        .limit(1)
        .maybeSingle();
      if (data) setNotesUnlocked(true);
    }
    void loadUnlockState();
  }, [episode, isOpen, title, userId]);

  useEffect(() => {
    if (!episode || !notesUnlocked || typeof window === "undefined") return;
    const cached = window.localStorage.getItem(notesCacheKey(episode.id));
    if (cached) setGeneratedNotes(cached);
  }, [episode, notesUnlocked]);

  useEffect(() => {
    const container = notesRef.current;
    if (!container) return;
    const handler = (event: MouseEvent) => {
      const targetEl = event.target as HTMLElement;
      const highlightEl = targetEl.closest(".bible-highlight") as HTMLElement | null;
      if (!highlightEl) return;
      event.preventDefault();
      event.stopPropagation();
      const type = highlightEl.dataset.type;
      const term = highlightEl.dataset.term;
      if (!type || !term) return;
      if (type === "people") setSelectedTarget({ type: "people", name: resolveBibleReference("people", term) });
      else if (type === "places") setSelectedTarget({ type: "places", name: resolveBibleReference("places", term) });
      else if (type === "keywords") setSelectedTarget({ type: "keywords", name: resolveBibleReference("keywords", term) });
    };
    container.addEventListener("click", handler);
    return () => container.removeEventListener("click", handler);
  }, [notesExpanded, episode?.id, generatedNotes]);

  useEffect(() => {
    if (!selectedTarget) {
      setSelectedNotes(null);
      setLoadingSelectedNotes(false);
      return;
    }
    const currentTarget = selectedTarget;
    async function loadSelectedNotes() {
      setLoadingSelectedNotes(true);
      setSelectedNotes(null);
      setPersonCreditBlocked(false);
      setPlaceCreditBlocked(false);
      setKeywordCreditBlocked(false);
        try {
          if (currentTarget.type === "people") {
            const primaryName = resolveBibleReference("people", currentTarget.name);
            const key = primaryName.toLowerCase().trim();
            if (userId) {
            const creditResult = await consumeCreditAction(ACTION_TYPE.person_viewed, {
              userId,
              actionLabel: primaryName,
            });
            if (!creditResult.ok) {
              setPersonCreditBlocked(true);
              setLoadingSelectedNotes(false);
              return;
            }
            setViewedPeople((prev) => new Set(prev).add(key));
          }
          if (userId && !completedPeople.has(key)) {
            const result = await ensureBibleEntityLearned({ kind: "people", name: primaryName, userId });
            if (result.inserted) {
              setCompletedPeople((prev) => new Set(prev).add(result.normalizedKey));
            }
          }
          setSelectedNotes(await getPersonPopupNotes(primaryName));
        }
        if (currentTarget.type === "places") {
          const normalizedPlace = currentTarget.name.toLowerCase().trim().replace(/\s+/g, "_");
          setSelectedNotes(await getPlacePopupNotes(currentTarget.name));
          if (userId) {
            void (async () => {
              const creditResult = await consumeCreditAction(ACTION_TYPE.place_viewed, { userId });
              if (!creditResult.ok) {
                setPlaceCreditBlocked(true);
                setLoadingSelectedNotes(false);
                return;
              }
              if (!completedPlaces.has(normalizedPlace)) {
                const result = await ensureBibleEntityLearned({ kind: "places", name: currentTarget.name, userId });
                if (result.inserted) {
                  setCompletedPlaces((prev) => new Set(prev).add(result.normalizedKey));
                }
              }
            })();
          }
        }
        if (currentTarget.type === "keywords") {
          const key = currentTarget.name.toLowerCase().trim();
          if (userId && !completedKeywords.has(key) && !viewedKeywords.has(key)) {
            const creditResult = await consumeCreditAction(ACTION_TYPE.keyword_viewed, { userId });
            if (!creditResult.ok) {
              setKeywordCreditBlocked(true);
              setLoadingSelectedNotes(false);
              return;
            }
            setViewedKeywords((prev) => new Set(prev).add(key));
          }
          if (userId && !completedKeywords.has(key)) {
            const result = await ensureBibleEntityLearned({ kind: "keywords", name: currentTarget.name, userId });
            if (result.inserted) {
              setCompletedKeywords((prev) => new Set(prev).add(result.normalizedKey));
            }
          }
          setSelectedNotes(await getKeywordPopupNotes(currentTarget.name));
        }
      } catch (error) {
        console.error("[BibleBuddyTvEpisodeModal] Error loading highlighted term notes:", error);
      } finally {
        setLoadingSelectedNotes(false);
      }
    }
    void loadSelectedNotes();
  }, [selectedTarget, userId, completedPeople, completedPlaces, completedKeywords]);

  if (!episode) return null;

  const contentLabel = episode.contentLabel || (title.contentType === "movie" ? "Movie" : `Episode ${episode.episodeNumber}`);
  const contentTypeLabel = title.contentType === "movie" ? "movie" : "episode";
  const studyHeading = title.contentType === "movie" ? "Study this movie" : "Study this episode";
  const notesSubjectLabel =
    title.category === "documentaries"
      ? "documentary"
      : title.category === "bible-stories"
        ? "animation"
        : title.category === "sermons"
          ? "sermon"
          : title.contentType === "movie"
            ? "movie"
            : "episode";
  const notesSubtitle = `Check out the Bible study notes for this ${notesSubjectLabel}.`;
  const reflectionHeading = title.contentType === "movie" ? "Movie Reflection" : "Episode Reflection";
  const averageRating = ratingRows.length ? ratingRows.reduce((sum, row) => sum + row.rating, 0) / ratingRows.length : 0;
  const averageRatingLabel = ratingRows.length ? `${averageRating.toFixed(1)}/5` : "Not rated";
  const summaryText = episode.louisIntro || episode.summary;
  const notesMarkdown = episode.studyNotesDocument || generatedNotes || "";
  const notesHtml = notesMarkdown ? renderStudyNotesDocumentHtml(notesMarkdown) : "";

  async function handleToggleNotes() {
    const currentEpisode = episode;
    if (!currentEpisode) return;
    if (notesExpanded) {
      setNotesExpanded(false);
      return;
    }
    if (!notesUnlocked && !isPaidUser) {
      const creditResult = await consumeCreditAction(ACTION_TYPE.chapter_notes_viewed, {
        userId,
        actionLabel: notesUnlockLabel(title, currentEpisode),
      });
      if (!creditResult.ok) {
        setNotesCreditBlocked(true);
        return;
      }
      setNotesUnlocked(true);
    }
    setNotesExpanded(true);
  }

  async function handleRate(nextRating: number) {
    const currentEpisode = episode;
    if (!userId || !currentEpisode) return;
    setCurrentUserRating(nextRating);
    setRatingRows((prev) => {
      const existing = prev.find((row) => row.user_id === userId);
      if (existing) return prev.map((row) => (row.user_id === userId ? { ...row, rating: nextRating } : row));
      return [...prev, { user_id: userId, rating: nextRating }];
    });
    const { error } = await supabase.from("tv_episode_ratings").upsert(
      { episode_id: currentEpisode.id, user_id: userId, rating: nextRating, updated_at: new Date().toISOString() },
      { onConflict: "episode_id,user_id" }
    );
    if (error) console.error("[BibleBuddyTvEpisodeModal] Could not save episode rating:", error);
  }

  function closeSelectedTargetModal() {
    setSelectedTarget(null);
    setSelectedNotes(null);
    setLoadingSelectedNotes(false);
  }

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} zIndex="z-[80]" scrollable>
      <div className="w-[min(92vw,980px)] rounded-[28px] border border-gray-200 bg-white text-gray-900 shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: CAROLINA_BLUE }}>
              Bible Buddy TV Player
            </p>
            <h2 className="mt-1 text-xl font-semibold sm:text-2xl">{contentLabel}: {episode.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            {onShare ? (
              <button
                type="button"
                onClick={() => {
                  if (onShareRequestOpen) {
                    onShareRequestOpen(episode);
                    return;
                  }
                  void onShare(episode);
                }}
                disabled={sharingEpisodeId === episode.id}
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sharingEpisodeId === episode.id ? "Sharing..." : "Share"}
              </button>
            ) : null}
            <button type="button" onClick={onClose} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
              Close
            </button>
          </div>
        </div>

        <div className="px-4 pb-4 pt-4 sm:px-6 sm:pb-6">
          <div className="overflow-hidden rounded-[22px] border border-gray-200 bg-black">
            {episode.youtubeUrl ? (
              <div className="relative aspect-video w-full bg-gray-950">
                {playerLoading ? (
                  <div className="absolute inset-0 z-[1] flex flex-col justify-between bg-gradient-to-br from-slate-950 via-gray-950 to-black p-5 sm:p-7">
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-3">
                        <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
                        <div className="h-5 w-48 animate-pulse rounded-full bg-white/15" />
                      </div>
                      <div className="h-8 w-20 animate-pulse rounded-full bg-white/10" />
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(255,255,255,0.08)]">
                        <div className="ml-1 h-0 w-0 border-y-[14px] border-y-transparent border-l-[22px] border-l-white/70" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-2 flex-1 animate-pulse rounded-full bg-white/10" />
                        <div className="h-2 w-24 animate-pulse rounded-full bg-white/10" />
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 animate-pulse rounded-full bg-white/10" />
                          <div className="h-8 w-8 animate-pulse rounded-full bg-white/10" />
                          <div className="h-8 w-8 animate-pulse rounded-full bg-white/10" />
                        </div>
                        <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/60">
                          Loading player...
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
                <YouTubeTrackedPlayer
                  key={episode.id}
                  userId={userId}
                  videoId={episode.id}
                  youtubeUrl={episode.youtubeUrl}
                  title={episode.title}
                  autoplay={true}
                  onLoadingChange={setPlayerLoading}
                />
              </div>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-gray-950 px-6 text-center">
                <div>
                  <p className="text-lg font-semibold text-white">Video link coming soon</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">The study notes and reflection for this title are ready. Add the movie link next and the player will show up here.</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-[22px] border border-gray-200 bg-gray-50 p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span
                className="rounded-full px-3 py-1 font-medium"
                style={{ backgroundColor: CAROLINA_BLUE_SOFT, color: CAROLINA_BLUE }}
              >
                {contentLabel}
              </span>
              <span>{episode.duration}</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => void handleRate(value)}
                    className={`text-xl leading-none transition ${value <= currentUserRating ? "text-amber-400" : "text-gray-300 hover:text-amber-300"}`}
                    aria-label={`Rate this ${contentTypeLabel} ${value} star${value === 1 ? "" : "s"}`}
                  >
                    {"\u2605"}
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {ratingLoading ? "Loading rating..." : averageRatingLabel}
                {!ratingLoading && ratingRows.length > 0 ? ` (${ratingRows.length})` : ""}
              </span>
            </div>

            <div className="mt-3">
              <p className={`text-sm leading-7 text-gray-700 sm:text-[15px] ${!summaryExpanded ? "line-clamp-2" : ""}`}>{summaryText}</p>
              {summaryText.length > 180 ? (
                <button
                  type="button"
                  onClick={() => setSummaryExpanded((prev) => !prev)}
                  className="mt-2 text-sm font-semibold"
                  style={{ color: CAROLINA_BLUE }}
                >
                  {summaryExpanded ? "Read less" : "Read more"}
                </button>
              ) : null}
            </div>
          </div>

          {episode.studyNotesDocument ? (
            <div className="mt-6 rounded-[22px] border border-gray-200 bg-white">
              <button type="button" onClick={() => void handleToggleNotes()} className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5" aria-expanded={notesExpanded}>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">{studyHeading}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {notesUnlocked
                      ? notesSubtitle
                      : isPaidUser
                        ? notesSubtitle
                        : `${notesSubtitle} Free users can unlock it with 1 credit.`}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  {!notesUnlocked && !isPaidUser ? (
                    <div className="text-2xl text-gray-400">{"\u{1F512}"}</div>
                  ) : (
                    <div className="text-lg text-gray-400">{notesExpanded ? "▲" : "▼"}</div>
                  )}
                </div>
              </button>

              {notesExpanded ? (
                <div className="border-t border-gray-100 px-4 pb-5 pt-4 sm:px-5" ref={notesRef}>
                  {notesLoading ? (
                    <div className="flex flex-col items-center gap-5 py-8">
                      <div style={{ animation: "bounce 1s infinite" }}>
                        <LouisAvatar mood="think" size={72} />
                      </div>
                      <div className="max-w-2xl text-center">
                        <p className="text-base font-semibold text-gray-900">Building deeper Bible Buddy notes...</p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">Pulling together the bigger Scripture arc, the people, the places, and the details underneath what you just watched.</p>
                      </div>
                      <div className="w-full max-w-2xl space-y-3">
                        <div className="h-4 animate-pulse rounded-full bg-gray-100" />
                        <div className="h-4 w-11/12 animate-pulse rounded-full bg-gray-100" />
                        <div className="h-4 w-4/5 animate-pulse rounded-full bg-gray-100" />
                        <div className="h-24 animate-pulse rounded-2xl bg-gray-100" />
                        <div className="h-4 w-10/12 animate-pulse rounded-full bg-gray-100" />
                        <div className="h-4 w-3/4 animate-pulse rounded-full bg-gray-100" />
                      </div>
                    </div>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: notesHtml }} />
                  )}
                </div>
              ) : null}
            </div>
          ) : null}

          {episode.reflectionQuestion && episode.discussionSlug ? (
            <div className="mt-6 rounded-[22px] border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{reflectionHeading}</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">{episode.reflectionQuestion}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">Share your thoughts below and join the conversation for {title.contentType === "movie" ? title.title : `${contentLabel} of ${title.title}`}. </p>
              <div className="mt-5">
                <CommentSection articleSlug={episode.discussionSlug} headingText="" placeholderText={`Share what stood out to you in this ${contentTypeLabel}...`} submitButtonText="Post Comment" />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {selectedTarget ? (
        <ModalShell isOpen={selectedTarget !== null} onClose={closeSelectedTargetModal} zIndex="z-[90]" scrollable>
          <div className="relative w-[min(92vw,760px)] rounded-[28px] border border-gray-200 bg-white p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] sm:p-8">
            <button type="button" onClick={closeSelectedTargetModal} className="absolute right-4 top-4 text-xl text-gray-400 hover:text-gray-700">&times;</button>
            <h2 className="mb-2 text-3xl font-bold text-gray-900">{selectedTarget.name}</h2>
            {loadingSelectedNotes ? (
              <div className="flex flex-col items-center gap-5 py-10">
                <div style={{ animation: "bounce 1s infinite" }}><LouisAvatar mood="think" size={72} /></div>
                <div className="w-full space-y-3 px-2">
                  <div className="h-3.5 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3.5 w-5/6 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-3.5 w-3/4 animate-pulse rounded-full bg-gray-100" />
                </div>
              </div>
            ) : selectedNotes ? (
              <ReactMarkdown
                components={{
                  h1: ({ ...props }) => <h1 className="first:mt-0 mt-6 mb-3 text-xl font-bold text-gray-900" {...props} />,
                  p: ({ ...props }) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
                  strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                  ul: ({ ...props }) => <ul className="mb-4 list-disc pl-5 leading-relaxed text-gray-700" {...props} />,
                  li: ({ ...props }) => <li className="mb-1" {...props} />,
                }}
              >
                {normalizeMarkdownForModal(selectedNotes)}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-600">No note is available for this term yet.</p>
            )}
          </div>
        </ModalShell>
      ) : null}

      <CreditLimitModal open={notesCreditBlocked} userId={userId} zIndexClassName="z-[95]" onClose={() => setNotesCreditBlocked(false)} />
      <CreditLimitModal
        open={personCreditBlocked}
        userId={userId}
        zIndexClassName="z-[95]"
        onClose={() => {
          setPersonCreditBlocked(false);
          closeSelectedTargetModal();
        }}
      />
      <CreditLimitModal
        open={placeCreditBlocked}
        userId={userId}
        zIndexClassName="z-[95]"
        onClose={() => {
          setPlaceCreditBlocked(false);
          closeSelectedTargetModal();
        }}
      />
      <CreditLimitModal
        open={keywordCreditBlocked}
        userId={userId}
        zIndexClassName="z-[95]"
        onClose={() => {
          setKeywordCreditBlocked(false);
          closeSelectedTargetModal();
        }}
      />
    </ModalShell>
  );
}

