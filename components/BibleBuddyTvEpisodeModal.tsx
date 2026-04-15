"use client";

import { useEffect, useRef, useState } from "react";
import { ModalShell } from "./ModalShell";
import type { BibleBuddyTvEpisode, BibleBuddyTvTitle } from "../lib/bibleBuddyTvContent";
import { getYouTubeEmbedUrl } from "../lib/bibleBuddyTvContent";
import CommentSection from "./comments/CommentSection";
import { supabase } from "../lib/supabaseClient";
import { enrichPlainText } from "../lib/bibleHighlighting";
import { resolveBibleReference } from "../lib/bibleTermResolver";
import { ACTION_TYPE } from "../lib/actionTypes";
import { consumeCreditAction } from "../lib/creditClient";
import {
  findKeywordNotes,
  findPersonNotes,
  findPlaceNotes,
  saveKeywordNotes,
  savePersonNotes,
  savePlaceNotes,
} from "../lib/bibleNotes";
import CreditLimitModal from "./CreditLimitModal";
import ReactMarkdown from "react-markdown";
import { LouisAvatar } from "./LouisAvatar";

interface BibleBuddyTvEpisodeModalProps {
  title: BibleBuddyTvTitle;
  episode: BibleBuddyTvEpisode | null;
  isOpen: boolean;
  onClose: () => void;
}

type HighlightTarget =
  | { type: "people"; name: string }
  | { type: "places"; name: string }
  | { type: "keywords"; name: string };

function renderStudyNotesDocumentHtml(markdown: string): string {
  const sections = markdown.trim().split(/\n\s*\n/).filter(Boolean);

  return sections
    .map((section) => {
      const lines = section.split("\n").map((line) => line.trim()).filter(Boolean);
      if (!lines.length) return "";

      if (lines.length === 1 && lines[0].startsWith("# ")) {
        const heading = enrichPlainText(lines[0].slice(2));
        return `<h1 class="mt-8 border-b border-gray-100 pb-3 text-2xl font-bold text-gray-900 first:mt-0">${heading}</h1>`;
      }

      if (lines.every((line) => line.startsWith("> "))) {
        const quote = lines.map((line) => enrichPlainText(line.slice(2))).join(" ");
        return `<blockquote class="mt-4 border-l-4 border-orange-500 bg-orange-50 px-5 py-4 text-[15px] italic leading-7 text-gray-700">${quote}</blockquote>`;
      }

      if (lines.every((line) => line.startsWith("- "))) {
        const items = lines
          .map((line) => `<li class="pl-1">${enrichPlainText(line.slice(2))}</li>`)
          .join("");
        return `<ul class="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-8 text-gray-700">${items}</ul>`;
      }

      const paragraph = enrichPlainText(lines.join(" "));
      return `<p class="mt-4 text-[15px] leading-8 text-gray-700">${paragraph}</p>`;
    })
    .join("");
}

function normalizeMarkdownForModal(markdown: string): string {
  return markdown.replace(/^\s*[-•*]\s+/gm, "").replace(/\n{3,}/g, "\n\n").trim();
}

export default function BibleBuddyTvEpisodeModal({
  title,
  episode,
  isOpen,
  onClose,
}: BibleBuddyTvEpisodeModalProps) {
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const notesRef = useRef<HTMLDivElement>(null);

  const [userId, setUserId] = useState<string | null>(null);

  const [selectedTarget, setSelectedTarget] = useState<HighlightTarget | null>(null);
  const [selectedNotes, setSelectedNotes] = useState<string | null>(null);
  const [loadingSelectedNotes, setLoadingSelectedNotes] = useState(false);

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
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);

      if (!user?.id) {
        setCompletedPeople(new Set());
        setCompletedPlaces(new Set());
        setCompletedKeywords(new Set());
        return;
      }

      const [peopleRes, placesRes, keywordsRes] = await Promise.all([
        supabase.from("people_progress").select("person_name").eq("user_id", user.id),
        supabase.from("places_progress").select("place_name").eq("user_id", user.id),
        supabase.from("keywords_progress").select("keyword").eq("user_id", user.id),
      ]);

      setCompletedPeople(
        new Set(
          (peopleRes.data || [])
            .map((row: any) => String(row.person_name || "").toLowerCase().trim())
            .filter(Boolean)
        )
      );
      setCompletedPlaces(
        new Set(
          (placesRes.data || [])
            .map((row: any) => String(row.place_name || "").toLowerCase().trim())
            .filter(Boolean)
        )
      );
      setCompletedKeywords(
        new Set(
          (keywordsRes.data || [])
            .map((row: any) => String(row.keyword || "").toLowerCase().trim())
            .filter(Boolean)
        )
      );
    }

    void loadUserContext();
  }, [episode, isOpen]);

  useEffect(() => {
    if (!episode || !isOpen) return;
    const currentEpisode = episode;

    async function loadRatings() {
      setRatingLoading(true);
      const { data, error } = await supabase
        .from("tv_episode_ratings")
        .select("user_id, rating")
        .eq("episode_id", currentEpisode.id);

      if (error) {
        console.error("[BibleBuddyTvEpisodeModal] Could not load episode ratings:", error);
        setRatingRows([]);
        setCurrentUserRating(0);
        setRatingLoading(false);
        return;
      }

      const rows = (data || []) as Array<{ user_id: string; rating: number }>;
      setRatingRows(rows);

      const {
        data: { user },
      } = await supabase.auth.getUser();
      const ownRating = rows.find((row) => row.user_id === user?.id)?.rating ?? 0;
      setCurrentUserRating(ownRating);
      setRatingLoading(false);
    }

    void loadRatings();
  }, [episode, isOpen]);

  useEffect(() => {
    setNotesExpanded(false);
    setSummaryExpanded(false);
    setSelectedTarget(null);
    setSelectedNotes(null);
    setLoadingSelectedNotes(false);
  }, [episode?.id]);

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

      if (type === "people") {
        setSelectedTarget({ type: "people", name: resolveBibleReference("people", term) });
      } else if (type === "places") {
        setSelectedTarget({ type: "places", name: resolveBibleReference("places", term) });
      } else if (type === "keywords") {
        setSelectedTarget({ type: "keywords", name: resolveBibleReference("keywords", term) });
      }
    };

    container.addEventListener("click", handler);
    return () => container.removeEventListener("click", handler);
  }, [notesExpanded, episode?.id]);

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

          if (userId && !completedPeople.has(key) && !viewedPeople.has(key)) {
            const creditResult = await consumeCreditAction(ACTION_TYPE.person_viewed, { userId });
            if (!creditResult.ok) {
              setPersonCreditBlocked(true);
              setLoadingSelectedNotes(false);
              return;
            }
            setViewedPeople((prev) => new Set(prev).add(key));
          }

          const existing = await findPersonNotes(key);
          if (existing) {
            setSelectedNotes(existing);
            setLoadingSelectedNotes(false);
            return;
          }

          const isFemale =
            /^(Mary|Martha|Sarah|Ruth|Esther|Deborah|Hannah|Leah|Rachel|Rebekah|Eve|Zipporah|Miriam)/i.test(
              primaryName
            );
          const pronoun = isFemale ? "Her" : "Him";
          const whoPronoun = isFemale ? "She" : "He";
          const prompt = `You are Little Louis. Generate Bible study style notes for ${primaryName} from Scripture using markdown.

Use this exact structure:

# Who ${whoPronoun} Is
Write two short paragraphs.

# Their Role in the Story
Write two to three short paragraphs.

# Key Moments
- Short sentence
- Short sentence
- Short sentence

# Where You Find ${pronoun}
- Book and chapter range
- Book and chapter range

# Why This Person Matters
Write two short paragraphs.

Keep it clear, warm, biblical, and beginner friendly.`;

          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: prompt, growMode: false }),
          });
          if (!response.ok) throw new Error("Failed to generate person notes");
          const json = await response.json();
          const generated = (json?.reply as string) ?? "";
          const saved = await savePersonNotes(key, generated);
          setSelectedNotes(saved);
        }

        if (currentTarget.type === "places") {
          const normalizedPlace = currentTarget.name.toLowerCase().trim().replace(/\s+/g, "_");

          if (userId && !completedPlaces.has(normalizedPlace) && !viewedPlaces.has(normalizedPlace)) {
            const creditResult = await consumeCreditAction(ACTION_TYPE.place_viewed, { userId });
            if (!creditResult.ok) {
              setPlaceCreditBlocked(true);
              setLoadingSelectedNotes(false);
              return;
            }
            setViewedPlaces((prev) => new Set(prev).add(normalizedPlace));
          }

          const existing = await findPlaceNotes(normalizedPlace);
          if (existing) {
            setSelectedNotes(existing);
            setLoadingSelectedNotes(false);
            return;
          }

          const prompt = `You are Little Louis. Generate beginner friendly Bible notes about the PLACE: ${currentTarget.name}.

Use this structure:

# Where is this place?
One short paragraph.

# What happens here?
Include two or three specific Bible references and one sentence each.

# Why is this place significant?
- One sentence
- One sentence

# How does this connect to the larger Bible story?
One short paragraph.

Keep it clear, warm, and Scripture-focused.`;

          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: prompt, growMode: false }),
          });
          if (!response.ok) throw new Error("Failed to generate place notes");
          const json = await response.json();
          const generated = (json?.reply || json?.response || "") as string;
          const saved = await savePlaceNotes(normalizedPlace, generated);
          setSelectedNotes(saved);
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

          const existing = await findKeywordNotes(currentTarget.name);
          if (existing) {
            setSelectedNotes(existing);
            setLoadingSelectedNotes(false);
            return;
          }

          const prompt = `You are Little Louis. Generate beginner friendly Bible notes about the KEYWORD: ${currentTarget.name}.

Use this structure:

# What is this concept?
One short paragraph.

# Where do we see it in Scripture?
Include two or three specific Bible references and one sentence each.

# Why does it matter?
- One sentence
- One sentence

# How does it connect to Jesus and the bigger story?
One short paragraph.

Keep it simple, biblical, and clear.`;

          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: prompt, growMode: false }),
          });
          if (!response.ok) throw new Error("Failed to generate keyword notes");
          const json = await response.json();
          const generated = (json?.reply || json?.response || "") as string;
          const saved = await saveKeywordNotes(key, generated);
          setSelectedNotes(saved);
        }
      } catch (error) {
        console.error("[BibleBuddyTvEpisodeModal] Error loading highlighted term notes:", error);
      } finally {
        setLoadingSelectedNotes(false);
      }
    }

    void loadSelectedNotes();
  }, [
    selectedTarget,
    userId,
    completedPeople,
    completedPlaces,
    completedKeywords,
    viewedPeople,
    viewedPlaces,
    viewedKeywords,
  ]);

  if (!episode) return null;

  const contentLabel = episode.contentLabel || (title.contentType === "movie" ? "Movie" : `Episode ${episode.episodeNumber}`);
  const contentTypeLabel = title.contentType === "movie" ? "movie" : "episode";
  const studyHeading = title.contentType === "movie" ? "Study this movie" : "Study this episode";
  const reflectionHeading = title.contentType === "movie" ? "Movie Reflection" : "Episode Reflection";
  const averageRating = ratingRows.length
    ? ratingRows.reduce((sum, row) => sum + row.rating, 0) / ratingRows.length
    : 0;
  const averageRatingLabel = ratingRows.length ? `${averageRating.toFixed(1)}/5` : "Not rated";
  const summaryText = episode.louisIntro || episode.summary;
  const truncatedSummary = !summaryExpanded;
  const notesHtml = episode.studyNotesDocument ? renderStudyNotesDocumentHtml(episode.studyNotesDocument) : "";
  const currentEpisodeId = episode.id;

  async function handleRate(nextRating: number) {
    if (!userId) return;

    setCurrentUserRating(nextRating);
    setRatingRows((prev) => {
      const existing = prev.find((row) => row.user_id === userId);
      if (existing) {
        return prev.map((row) => (row.user_id === userId ? { ...row, rating: nextRating } : row));
      }
      return [...prev, { user_id: userId, rating: nextRating }];
    });

    const { error } = await supabase.from("tv_episode_ratings").upsert(
      {
        episode_id: currentEpisodeId,
        user_id: userId,
        rating: nextRating,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "episode_id,user_id" }
    );

    if (error) {
      console.error("[BibleBuddyTvEpisodeModal] Could not save episode rating:", error);
    }
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
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-600">Bible Buddy TV Player</p>
            <h2 className="mt-1 text-xl font-semibold sm:text-2xl">
              {contentLabel}: {episode.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <div className="px-4 pb-4 pt-4 sm:px-6 sm:pb-6">
          <div className="overflow-hidden rounded-[22px] border border-gray-200 bg-black">
            {episode.youtubeUrl ? (
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={getYouTubeEmbedUrl(episode.youtubeUrl)}
                  title={`${episode.title} video player`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-gray-950 px-6 text-center">
                <div>
                  <p className="text-lg font-semibold text-white">Video link coming soon</p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-300">
                    The study notes and reflection for this title are ready. Add the movie link next and the player will show up here.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-[22px] border border-gray-200 bg-gray-50 p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="rounded-full bg-violet-100 px-3 py-1 font-medium text-violet-700">
                {contentLabel}
              </span>
              <span>{episode.duration}</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => void handleRate(value)}
                    className={`text-xl leading-none transition ${
                      value <= currentUserRating ? "text-amber-400" : "text-gray-300 hover:text-amber-300"
                    }`}
                    aria-label={`Rate this ${contentTypeLabel} ${value} star${value === 1 ? "" : "s"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {ratingLoading ? "Loading rating..." : averageRatingLabel}
                {!ratingLoading && ratingRows.length > 0 ? ` (${ratingRows.length})` : ""}
              </span>
            </div>

            <div className="mt-3">
              <p className={`text-sm leading-7 text-gray-700 sm:text-[15px] ${truncatedSummary ? "line-clamp-2" : ""}`}>
                {summaryText}
              </p>
              {summaryText.length > 180 ? (
                <button
                  type="button"
                  onClick={() => setSummaryExpanded((prev) => !prev)}
                  className="mt-2 text-sm font-semibold text-violet-700 hover:text-violet-800"
                >
                  {summaryExpanded ? "Read less" : "Read more"}
                </button>
              ) : null}
            </div>
          </div>

          {episode.studyNotesDocument ? (
            <div className="mt-6 rounded-[22px] border border-gray-200 bg-white">
              <button
                type="button"
                onClick={() => setNotesExpanded((prev) => !prev)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                aria-expanded={notesExpanded}
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{studyHeading}</h3>
                </div>
                <span className="text-lg text-gray-400">{notesExpanded ? "▲" : "▼"}</span>
              </button>

              {notesExpanded ? (
                <div className="border-t border-gray-100 px-4 pb-5 pt-4 sm:px-5" ref={notesRef}>
                  <div dangerouslySetInnerHTML={{ __html: notesHtml }} />
                </div>
              ) : null}
            </div>
          ) : null}

          {episode.reflectionQuestion && episode.discussionSlug ? (
            <div className="mt-6 rounded-[22px] border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">{reflectionHeading}</p>
              <h3 className="mt-2 text-2xl font-bold text-gray-900">{episode.reflectionQuestion}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                Share your thoughts below and join the conversation for{" "}
                {title.contentType === "movie" ? title.title : `${contentLabel} of ${title.title}`}.
              </p>

              <div className="mt-5">
                <CommentSection
                  articleSlug={episode.discussionSlug}
                  headingText=""
                  placeholderText={`Share what stood out to you in this ${contentTypeLabel}...`}
                  submitButtonText="Post Comment"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {selectedTarget ? (
        <ModalShell isOpen={selectedTarget !== null} onClose={closeSelectedTargetModal} zIndex="z-[90]" scrollable>
          <div className="relative w-[min(92vw,760px)] rounded-[28px] border border-gray-200 bg-white p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] sm:p-8">
            <button
              type="button"
              onClick={closeSelectedTargetModal}
              className="absolute right-4 top-4 text-xl text-gray-400 hover:text-gray-700"
            >
              ×
            </button>
            <h2 className="mb-2 text-3xl font-bold text-gray-900">{selectedTarget.name}</h2>
            {loadingSelectedNotes ? (
              <div className="flex flex-col items-center gap-5 py-10">
                <div style={{ animation: "bounce 1s infinite" }}>
                  <LouisAvatar mood="think" size={72} />
                </div>
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
