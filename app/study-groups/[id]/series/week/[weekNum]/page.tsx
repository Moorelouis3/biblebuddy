"use client";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { triggerSmokeDelete } from "@/components/SmokeDeleteEffect";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/lib/supabaseClient";
import { getSeriesWeekLesson, SeriesWeekLesson, SeriesTriviaQuestion } from "@/lib/seriesContent";
import { hasLazySeriesNotes, loadSeriesNotesContent, type SeriesNotesContent } from "@/lib/seriesNotes";
import { enrichPlainText } from "@/lib/bibleHighlighting";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { resolveBibleReference } from "@/lib/bibleTermResolver";
import { consumeCreditAction } from "@/lib/creditClient";
import CreditLimitModal from "@/components/CreditLimitModal";
import { LouisAvatar } from "@/components/LouisAvatar";
import UserBadge from "@/components/UserBadge";

interface WeekLessonPageProps {
  embeddedGroupId?: string;
  embeddedWeekNum?: number;
  embeddedSeriesId?: string;
  embeddedSeriesTitle?: string;
  embedded?: boolean;
  onBack?: () => void;
}

interface WeekFinisher {
  user_id: string;
  display_name: string;
  profile_image_url: string | null;
  member_badge: string | null;
  is_paid: boolean;
  group_role: string | null;
}

function getWeekUnlockDate(startDate: string, weekNum: number): string {
  const d = new Date(startDate);
  d.setDate(d.getDate() + (weekNum - 1) * 7);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function resolveSeriesStart(schedule: { start_at?: string | null; start_date?: string | null } | null | undefined): string | null {
  if (!schedule) return null;
  if (schedule.start_at) return schedule.start_at;
  if (schedule.start_date) return `${schedule.start_date}T00:00:00`;
  return null;
}

function getWeekAccessState(
  startDate: string | null,
  weekNum: number,
  isLeader: boolean,
  previousWeekComplete: boolean
): { allowed: boolean; message: string | null } {
  if (isLeader) return { allowed: true, message: null };
  if (!startDate) return { allowed: false, message: "This series has not started yet." };

  const unlockAt = new Date(startDate);
  unlockAt.setDate(unlockAt.getDate() + (weekNum - 1) * 7);
  if (new Date() < unlockAt) {
    return { allowed: false, message: `Week ${weekNum} unlocks ${getWeekUnlockDate(startDate, weekNum)}.` };
  }

  if (weekNum > 1 && !previousWeekComplete) {
    return { allowed: false, message: `Finish Week ${weekNum - 1} before starting Week ${weekNum}.` };
  }

  return { allowed: true, message: null };
}

// â”€â”€ 36 fixed confetti pieces (avoids hydration mismatch) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CONFETTI = [
  { left: 5,  color: "#f59e0b", w: 8,  h: 6,  delay: 0.0 },
  { left: 12, color: "#10b981", w: 6,  h: 8,  delay: 0.15 },
  { left: 20, color: "#3b82f6", w: 9,  h: 5,  delay: 0.3 },
  { left: 28, color: "#ef4444", w: 7,  h: 7,  delay: 0.05 },
  { left: 35, color: "#8b5cf6", w: 5,  h: 9,  delay: 0.2 },
  { left: 42, color: "#f59e0b", w: 8,  h: 6,  delay: 0.35 },
  { left: 50, color: "#10b981", w: 6,  h: 8,  delay: 0.1 },
  { left: 58, color: "#3b82f6", w: 9,  h: 5,  delay: 0.25 },
  { left: 65, color: "#ef4444", w: 7,  h: 7,  delay: 0.4 },
  { left: 72, color: "#8b5cf6", w: 5,  h: 9,  delay: 0.0 },
  { left: 80, color: "#f59e0b", w: 8,  h: 6,  delay: 0.15 },
  { left: 88, color: "#10b981", w: 6,  h: 8,  delay: 0.3 },
  { left: 94, color: "#3b82f6", w: 9,  h: 5,  delay: 0.05 },
  { left: 8,  color: "#ef4444", w: 7,  h: 7,  delay: 0.2 },
  { left: 18, color: "#8b5cf6", w: 5,  h: 9,  delay: 0.35 },
  { left: 25, color: "#f59e0b", w: 8,  h: 6,  delay: 0.1 },
  { left: 33, color: "#10b981", w: 6,  h: 8,  delay: 0.25 },
  { left: 40, color: "#3b82f6", w: 9,  h: 5,  delay: 0.4 },
  { left: 48, color: "#ef4444", w: 7,  h: 7,  delay: 0.0 },
  { left: 55, color: "#8b5cf6", w: 5,  h: 9,  delay: 0.15 },
  { left: 62, color: "#f59e0b", w: 8,  h: 6,  delay: 0.3 },
  { left: 70, color: "#10b981", w: 6,  h: 8,  delay: 0.05 },
  { left: 78, color: "#3b82f6", w: 9,  h: 5,  delay: 0.2 },
  { left: 85, color: "#ef4444", w: 7,  h: 7,  delay: 0.35 },
  { left: 92, color: "#8b5cf6", w: 5,  h: 9,  delay: 0.1 },
  { left: 3,  color: "#f59e0b", w: 8,  h: 6,  delay: 0.25 },
  { left: 10, color: "#10b981", w: 6,  h: 8,  delay: 0.4 },
  { left: 17, color: "#3b82f6", w: 9,  h: 5,  delay: 0.0 },
  { left: 30, color: "#ef4444", w: 7,  h: 7,  delay: 0.15 },
  { left: 45, color: "#8b5cf6", w: 5,  h: 9,  delay: 0.3 },
  { left: 60, color: "#f59e0b", w: 8,  h: 6,  delay: 0.05 },
  { left: 75, color: "#10b981", w: 6,  h: 8,  delay: 0.2 },
  { left: 82, color: "#3b82f6", w: 9,  h: 5,  delay: 0.35 },
  { left: 90, color: "#ef4444", w: 7,  h: 7,  delay: 0.1 },
  { left: 50, color: "#8b5cf6", w: 5,  h: 9,  delay: 0.25 },
  { left: 68, color: "#f59e0b", w: 8,  h: 6,  delay: 0.4 },
];

// â”€â”€ Intro rich renderer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/** Apply bible term highlights + bold/italic to a single line of plain text. */
function applyInlineHtml(line: string): string {
  if (!line.trim()) return "";
  // enrichPlainText handles HTML escaping + people/places/keywords spans
  const html = enrichPlainText(line);
  // Strip the <p ...>...</p> wrapper(s) that enrichPlainText adds
  let inner = html.replace(/<p[^>]*>([\s\S]*?)<\/p>/g, "$1 ").trimEnd();
  // Apply **bold** and *italic* (after HTML escaping is done, * chars are preserved)
  inner = inner.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  inner = inner.replace(/\*([^*<\n]+?)\*/g, "<em>$1</em>");
  return inner;
}

function parseIntroToHTML(intro: string): string {
  const blocks = intro.split("\n\n");
  const parts: string[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const lines = trimmed.split("\n").map((l) => l.trim());

    const imageMatch = lines.length === 1 ? lines[0].match(/^!\[(.*?)\]\((\/[^)]+)\)$/) : null;
    if (imageMatch) {
      const alt = applyInlineHtml(imageMatch[1] || "Study image");
      const src = imageMatch[2].replace(/"/g, "&quot;");
      parts.push(
        `<div style="margin:0.85rem 0 1rem 0">` +
          `<img src="${src}" alt="${alt}" loading="eager" decoding="sync" style="display:block;width:100%;max-width:680px;margin:0 auto;border-radius:1rem;box-shadow:none;border:none;outline:none;object-fit:cover;background:none" />` +
        `</div>`
      );
      continue;
    }

    // ## Section header
    if (lines.length === 1 && lines[0].startsWith("## ")) {
      const text = applyInlineHtml(lines[0].slice(3));
      parts.push(
        `<h2 style="font-size:1.05rem;font-weight:800;color:#111827;margin-top:1.5rem;margin-bottom:0.4rem;padding-bottom:0.3rem;border-bottom:2px solid #f3f4f6">${text}</h2>`
      );
      continue;
    }

    // > Blockquote (all lines start with "> ")
    if (lines.every((l) => l.startsWith("> "))) {
      const quoteLines = lines.map((l) => applyInlineHtml(l.slice(2))).join("<br>");
      parts.push(
        `<div style="border-left:4px solid #f97316;padding:0.6rem 0.8rem;margin:0.5rem 0;background:#fff7ed;border-radius:0 0.5rem 0.5rem 0">` +
          `<p style="font-size:0.875rem;font-style:italic;color:#374151;line-height:1.6;margin:0">${quoteLines}</p>` +
        `</div>`
      );
      continue;
    }

    // - List items (all lines start with "- ")
    if (lines.every((l) => l.startsWith("- "))) {
      const items = lines.map((l) => {
        const content = l.slice(2); // remove "- "
        const html = applyInlineHtml(content);
        return `<li style="display:flex;gap:0.5rem;align-items:flex-start;padding:0.15rem 0;font-size:0.875rem;color:#374151;line-height:1.6">` +
          `<span style="flex-shrink:0;line-height:1.6">&bull;</span><span>${html}</span></li>`;
      }).join("");
      parts.push(`<ul style="list-style:none;margin:0.5rem 0;padding:0;display:flex;flex-direction:column;gap:0.1rem">${items}</ul>`);
      continue;
    }

    // Single line starting with emoji (callout / 👉 / 📌)
    const firstCode = trimmed.codePointAt(0) ?? 0;
    if (lines.length === 1 && firstCode > 0x00FF) {
      const html = applyInlineHtml(lines[0]);
      parts.push(
        `<p style="font-size:0.875rem;font-weight:600;color:#1f2937;padding:0.25rem 0">${html}</p>`
      );
      continue;
    }

    // Regular paragraph (may have \n line breaks within)
    const paraHtml = lines.map((l) => applyInlineHtml(l)).join("<br>");
    parts.push(
      `<p style="font-size:0.875rem;color:#374151;line-height:1.7;margin:0">${paraHtml}</p>`
    );
  }

  return parts.join("\n");
}

function IntroSection({ lesson }: { lesson: SeriesWeekLesson }) {
  const [expanded, setExpanded] = useState(false);
  const introHTML = useMemo(() => parseIntroToHTML(lesson.intro), [lesson.intro]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
      >
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Study Notes</p>
          <p className="text-base font-bold text-gray-900">{lesson.title}</p>
        </div>
        <span className="text-gray-400 text-lg">{expanded ? "â–²" : "â–¼"}</span>
      </button>

      {expanded && (
        <div className="border-t border-gray-100">
          <div
            className="px-5 pt-4 pb-5 flex flex-col gap-3"
            dangerouslySetInnerHTML={{ __html: introHTML }}
          />
        </div>
      )}
    </div>
  );
}

// â”€â”€ Section Card wrapper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FreeIntroSection({ lesson }: { lesson: SeriesWeekLesson }) {
  const introHTML = useMemo(() => parseIntroToHTML(lesson.intro), [lesson.intro]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Week Intro</p>
        <p className="text-base font-bold text-gray-900">{lesson.title}</p>
      </div>
      <div
        className="px-5 pt-4 pb-5 flex flex-col gap-3"
        dangerouslySetInnerHTML={{ __html: introHTML }}
      />
    </div>
  );
}

const MemoFreeIntroSection = memo(FreeIntroSection);

function NotesSection({
  lesson,
  seriesTitle,
  isPaid,
  onUnlock,
}: {
  lesson: SeriesWeekLesson;
  seriesTitle?: string | null;
  isPaid: boolean;
  onUnlock: () => void;
}) {
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notesLoading, setNotesLoading] = useState(false);
  const [notesSource, setNotesSource] = useState<SeriesNotesContent>(null);
  const [notesHTML, setNotesHTML] = useState<string | null>(null);
  const [notesError, setNotesError] = useState<string | null>(null);
  const hasNotesAvailable = hasLazySeriesNotes(seriesTitle, lesson.weekNumber) || Boolean(lesson.notes?.trim());

  useEffect(() => {
    if (!isPaid || !hasNotesAvailable || notesHTML || notesError) return;

    let cancelled = false;

    void (async () => {
      try {
        const loaded = await loadSeriesNotesContent(seriesTitle, lesson.weekNumber, lesson.notes ?? null);
        if (cancelled) return;

        if (!loaded.content && !loaded.html) {
          setNotesError("These notes are not ready yet.");
          return;
        }

        const nextHtml = loaded.html
          ? loaded.html
          : (() => {
              const combinedNotes = Array.isArray(loaded.content) ? loaded.content.join("\n\n") : loaded.content ?? "";
              return combinedNotes ? parseIntroToHTML(combinedNotes) : null;
            })();

        setNotesSource(loaded.content ?? null);
        setNotesHTML(nextHtml);
      } catch (error) {
        if (cancelled) return;
        console.error("[SERIES_NOTES] Failed to preload notes", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [hasNotesAvailable, isPaid, lesson.notes, lesson.weekNumber, notesError, notesHTML, seriesTitle]);

  async function handleOpenNotes() {
    if (!isPaid || !hasNotesAvailable) return;

    setNotesError(null);

    if (notesHTML || notesError) {
      setShowNotesModal(true);
      return;
    }

    setNotesLoading(true);
    try {
      const loaded = await loadSeriesNotesContent(seriesTitle, lesson.weekNumber, lesson.notes ?? null);
      if (!loaded.content && !loaded.html) {
        setNotesError("These notes are not ready yet.");
        setShowNotesModal(true);
        return;
      }

      const nextHtml = loaded.html
        ? loaded.html
        : (() => {
            const combinedNotes = Array.isArray(loaded.content) ? loaded.content.join("\n\n") : loaded.content ?? "";
            return combinedNotes ? parseIntroToHTML(combinedNotes) : null;
          })();

      setNotesSource(loaded.content ?? null);
      setNotesHTML(nextHtml);
      setShowNotesModal(true);
    } catch (error) {
      console.error("[SERIES_NOTES] Failed to load notes", error);
      setNotesError("Study notes could not be loaded right now. Please try again.");
      setShowNotesModal(true);
    } finally {
      setNotesLoading(false);
    }
  }

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 text-left">
          <p className="text-base font-bold text-gray-900">Study Notes</p>
        </div>

        {isPaid && (
          <div className="border-b border-gray-100 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Chapter Notes</p>
            <h3 className="mt-2 text-lg font-bold text-gray-900">
              Want to understand {lesson.readingReference} better?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              Check out the Chapter Notes.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              They include Hebrew and Greek word meanings, cultural and historical context, and verse-by-verse breakdowns.
            </p>
            <button
              type="button"
              onClick={handleOpenNotes}
              disabled={!hasNotesAvailable}
              className="mt-4 inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-white transition hover:opacity-90"
              style={!hasNotesAvailable ? { backgroundColor: "#94a3b8", cursor: "not-allowed" } : { backgroundColor: "#4a9b6f" }}
            >
              {hasNotesAvailable ? "Click Here to Open" : "Notes Coming Soon"}
            </button>
          </div>
        )}

        {!isPaid && (
          <div className="px-5 py-5">
            <p className="text-base font-semibold text-gray-900 mb-3">Read The Study Notes</p>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-3">Upgrade for full access</p>
            <p className="text-sm text-gray-600 mb-4">The Notes for this week go deeper into:</p>
            <div className="space-y-2 text-sm text-gray-700 mb-5">
              <p>&bull; what&apos;s really happening in each verse</p>
              <p>&bull; historical and cultural context</p>
              <p>&bull; Greek word meanings and insights</p>
              <p>&bull; connections across the Bible</p>
              <p>&bull; deeper explanations of people, places, and events</p>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">
              If you want to go beyond just reading and actually understand Scripture on a deeper level, unlock the full Notes.
            </p>
            <button
              type="button"
              onClick={onUnlock}
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#4a9b6f" }}
            >
              Unlock Notes
            </button>
          </div>
        )}
      </div>

      {notesLoading && (
        <SmallLouisLoadingModal
          title="Loading Study Notes"
          subtitle={`Getting your Week ${lesson.weekNumber} notes ready...`}
        />
      )}

      {showNotesModal && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto"
          onClick={() => setShowNotesModal(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setShowNotesModal(false)}
                className="absolute right-4 top-4 text-xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Chapter Notes</p>
              <h3 className="mt-1 pr-8 text-xl font-bold text-gray-900">
                {lesson.readingReference} Study Notes
              </h3>
            </div>

              <div className="px-5 py-5 sm:px-6">
                {notesError ? (
                  <p className="text-sm text-red-600">{notesError}</p>
                ) : (
                  <div
                    className="flex flex-col gap-3"
                    dangerouslySetInnerHTML={{ __html: notesHTML ?? "" }}
                  />
                )}
              </div>
            </div>
          </div>
      )}
    </>
  );
}

const MemoNotesSection = memo(NotesSection);

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
        <span className="text-sm font-bold text-gray-800">{title}</span>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

// â”€â”€ Reading Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface BibleVerse {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

function ReadingModal({
  lesson,
  userId,
  onComplete,
  onClose,
}: {
  lesson: SeriesWeekLesson;
  userId: string;
  onComplete: () => void;
  onClose: () => void;
}) {
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loadingVerses, setLoadingVerses] = useState(true);
  const [highlighted, setHighlighted] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`https://bible-api.com/${lesson.readingApiQuery}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.verses) setVerses(data.verses);
        setLoadingVerses(false);
      })
      .catch(() => setLoadingVerses(false));
  }, [lesson.readingApiQuery]);

  async function toggleHighlight(verseNum: number, bookName: string, chapter: number) {
    const next = new Set(highlighted);
    if (next.has(verseNum)) {
      next.delete(verseNum);
      await supabase
        .from("highlights")
        .delete()
        .eq("user_id", userId)
        .eq("book", bookName.toLowerCase())
        .eq("chapter", chapter)
        .eq("verse", verseNum);
    } else {
      next.add(verseNum);
      await supabase
        .from("highlights")
        .upsert(
          { user_id: userId, book: bookName.toLowerCase(), chapter, verse: verseNum, color: "yellow" },
          { onConflict: "user_id,book,chapter,verse" }
        );
    }
    setHighlighted(next);
  }

  function handleShare() {
    const text = `${lesson.readingReference}\n\n${verses.map((v) => `[${v.verse}] ${v.text.trim()}`).join("\n")}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-xs text-orange-600 font-semibold uppercase tracking-wide">Selected Reading</p>
            <p className="text-base font-bold text-gray-900 mt-0.5">{lesson.readingReference}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition text-xl leading-none">âœ•</button>
        </div>

        {/* Verses */}
        <div className="overflow-y-auto flex-1 px-5 py-4">
          {loadingVerses ? (
            <p className="text-sm text-gray-400 text-center py-8">Loading verses...</p>
          ) : verses.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">Could not load verses. Check your connection.</p>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-gray-400 mb-4">Tap a verse to highlight it</p>
              {verses.map((v) => (
                <button
                  key={v.verse}
                  onClick={() => toggleHighlight(v.verse, v.book_name, v.chapter)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    highlighted.has(v.verse) ? "bg-yellow-100 border border-yellow-300" : "bg-gray-50 border border-transparent hover:bg-yellow-50"
                  }`}
                >
                  <span className="text-xs font-bold text-gray-400 mr-2">{v.verse}</span>
                  <span className="text-sm text-gray-800 leading-relaxed">{v.text.trim()}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex flex-col gap-2 flex-shrink-0">
          <button
            onClick={handleShare}
            className="w-full py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
          >
            {copied ? "Copied!" : "Share Passage"}
          </button>
          <button
            onClick={() => { onComplete(); onClose(); }}
            className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#4a9b6f" }}
          >
            Finish Reading
          </button>
        </div>
      </div>
    </div>
  );
}

// â”€â”€ Trivia Quiz â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TriviaQuiz({
  lesson,
  userId,
  seriesId,
  weekNumber,
  alreadyDone,
  savedScore,
  onComplete,
}: {
  lesson: SeriesWeekLesson;
  userId: string;
  seriesId: string;
  weekNumber: number;
  alreadyDone: boolean;
  savedScore: number | null;
  onComplete: (score: number) => void;
}) {
  const questions = lesson.triviaQuestions;
  const [phase, setPhase] = useState<"start" | "quiz" | "done">(alreadyDone ? "done" : "start");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(alreadyDone && savedScore !== null ? savedScore : 0);
  const [saving, setSaving] = useState(false);

  async function saveScore(finalScore: number) {
    setSaving(true);
    await supabase.from("series_trivia_scores").upsert(
      { user_id: userId, series_id: seriesId, week_number: weekNumber, score: finalScore, total_questions: questions.length },
      { onConflict: "user_id,series_id,week_number" }
    );
    setSaving(false);
    onComplete(finalScore);
  }

  function handleSelect(label: string) {
    if (revealed) return;
    setSelected(label);
    setRevealed(true);
    if (label === questions[current].correctAnswer) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      const finalScore = score + (selected === questions[current].correctAnswer ? 0 : 0); // already counted
      setPhase("done");
      saveScore(score);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  const q = questions[current];

  if (phase === "done") {
    return (
      <div className="text-center py-4">
        <p className="text-4xl mb-3">🏆</p>
        <p className="text-xl font-bold text-gray-900">{score} / {questions.length}</p>
        <p className="text-sm text-gray-500 mt-1">
          {score === questions.length ? "Perfect score!" : score >= questions.length * 0.7 ? "Great job!" : "Keep studying!"}
        </p>
        {alreadyDone && savedScore !== null && score === savedScore && (
          <p className="text-xs text-gray-400 mt-2">Your saved score</p>
        )}
      </div>
    );
  }

  if (phase === "start") {
    return (
      <div className="text-center py-2">
        <p className="text-sm text-gray-600 mb-4">{questions.length} questions based on this week's reading</p>
        <button
          onClick={() => setPhase("quiz")}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#4a9b6f" }}
        >
          Start Trivia
        </button>
      </div>
    );
  }

  const optionStyle = (label: string) => {
    if (!revealed) return "border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-300 cursor-pointer";
    if (label === q.correctAnswer) return "border-green-400 bg-green-50";
    if (label === selected && label !== q.correctAnswer) return "border-red-400 bg-red-50";
    return "border-gray-200 bg-gray-50 opacity-50";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-400 font-medium">Question {current + 1} of {questions.length}</p>
        <p className="text-xs font-semibold text-gray-600">{score} correct</p>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-blue-400 rounded-full transition-all"
          style={{ width: `${((current) / questions.length) * 100}%` }}
        />
      </div>

      <p className="text-sm font-semibold text-gray-900 mb-4 leading-snug">{q.question}</p>

      <div className="flex flex-col gap-2">
        {q.options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => handleSelect(opt.label)}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${optionStyle(opt.label)}`}
          >
            <span className="font-semibold mr-2">{opt.label}.</span>
            {opt.text}
            {revealed && opt.label === q.correctAnswer && <span className="ml-2 text-green-600">âœ“</span>}
            {revealed && opt.label === selected && opt.label !== q.correctAnswer && <span className="ml-2 text-red-500">âœ—</span>}
          </button>
        ))}
      </div>

      {revealed && (
        <div className="mt-4">
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-800 leading-relaxed">
            <span className="font-semibold">Explanation: </span>{q.explanation}
          </div>
          <button
            onClick={handleNext}
            disabled={saving}
            className="w-full mt-3 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#4a9b6f" }}
          >
            {saving ? "Saving..." : current + 1 >= questions.length ? "Finish & See Score" : "Next Question â†’"}
          </button>
        </div>
      )}
    </div>
  );
}

// â”€â”€ Leaderboard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface LeaderboardEntry {
  user_id: string;
  score: number;
  total_questions: number;
  taken_at: string;
  display_name: string;
}

function LeaderboardView({ seriesId, weekNumber, userId }: { seriesId: string; weekNumber: number; userId: string }) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: scores } = await supabase
        .from("series_trivia_scores")
        .select("user_id, score, total_questions, taken_at")
        .eq("series_id", seriesId)
        .eq("week_number", weekNumber)
        .order("score", { ascending: false })
        .order("taken_at", { ascending: true });

      if (!scores || scores.length === 0) { setLoading(false); return; }

      const userIds = scores.map((s) => s.user_id);
      const { data: profiles } = await supabase
        .from("profile_stats")
        .select("user_id, username, display_name")
        .in("user_id", userIds);

      const nameMap: Record<string, string> = {};
      (profiles || []).forEach((p) => {
        nameMap[p.user_id] = p.display_name || p.username || "Anonymous";
      });

      setEntries(
        scores.map((s) => ({
          ...s,
          display_name: nameMap[s.user_id] || "Anonymous",
        }))
      );
      setLoading(false);
    }
    load();
  }, [seriesId, weekNumber]);

  if (loading) return <p className="text-sm text-gray-400 text-center py-4">Loading leaderboard...</p>;
  if (entries.length === 0) return <p className="text-sm text-gray-400 text-center py-4">No scores yet. Be the first!</p>;

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="flex flex-col gap-2">
      {entries.map((e, i) => (
        <div
          key={e.user_id}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${
            e.user_id === userId ? "border-blue-200 bg-blue-50" : "border-gray-100 bg-gray-50"
          }`}
        >
          <span className="text-lg w-6 text-center flex-shrink-0">{medals[i] || `${i + 1}.`}</span>
          <div className="flex-1 min-w-0">
            <Link href={`/profile/${e.user_id}`} className="text-sm font-semibold text-gray-900 truncate hover:underline block">
              {e.display_name}{e.user_id === userId ? " (You)" : ""}
            </Link>
          </div>
          <p className="text-sm font-bold text-gray-800 flex-shrink-0">
            {e.score}/{e.total_questions}
          </p>
        </div>
      ))}
    </div>
  );
}

// â”€â”€ Reflection Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface ReflectionEntry {
  id: string;
  user_id: string;
  content: string;
  display_name: string | null;
  profile_image_url: string | null;
  member_badge?: string | null;
  is_paid?: boolean | null;
  group_role?: string | null;
  created_at: string;
  parent_reflection_id: string | null;
  like_count: number;
  liked?: boolean;
}

// ── Utility helpers (outside component so references are stable) ─────────────

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function getInitial(name: string | null) { return (name || "?")[0].toUpperCase(); }
const AVATAR_COLORS = ["#4a9b6f", "#5b8dd9", "#c97b3e", "#9b6bb5", "#d45f7a", "#3ea8a8"];
function avatarBg(uid: string) {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) hash = uid.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ── ReflectionRow — defined OUTSIDE ReflectionSection so its identity is
//    stable across re-renders. Defining it inside would cause React to unmount
//    and remount it on every state change, breaking paste and focus. ──────────

type ReflectionRowProps = {
  reflection: ReflectionEntry;
  depth?: number;
  reflections: ReflectionEntry[];
  userId: string;
  currentUserBadge: string | null;
  currentUserGroupRole: string | null;
  deletingId: string | null;
  editingId: string | null;
  editingText: string;
  setEditingId: (id: string | null) => void;
  setEditingText: (text: string) => void;
  savingId: string | null;
  likeLoading: Set<string>;
  likeAnimatingIds: Set<string>;
  replyingToId: string | null;
  setReplyingToId: (id: string | null) => void;
  replyText: string;
  setReplyText: (text: string) => void;
  submitting: boolean;
  onDeleteReflection: (reflection: ReflectionEntry) => Promise<void>;
  onSaveEdit: (reflection: ReflectionEntry) => Promise<void>;
  onToggleLike: (reflection: ReflectionEntry) => Promise<void>;
  onSubmit: (parentId: string) => Promise<void>;
};

function ReflectionRow({
  reflection,
  depth = 0,
  reflections,
  userId,
  currentUserBadge,
  currentUserGroupRole,
  deletingId,
  editingId,
  editingText,
  setEditingId,
  setEditingText,
  savingId,
  likeLoading,
  likeAnimatingIds,
  replyingToId,
  setReplyingToId,
  replyText,
  setReplyText,
  submitting,
  onDeleteReflection,
  onSaveEdit,
  onToggleLike,
  onSubmit,
}: ReflectionRowProps) {
  const name = reflection.display_name || "Anonymous";
  const replies = reflections.filter((r) => r.parent_reflection_id === reflection.id);
  const canDeleteReflection =
    reflection.user_id === userId ||
    currentUserBadge === "moderator" ||
    currentUserGroupRole === "leader" ||
    currentUserGroupRole === "moderator";
  const canEditReflection = reflection.user_id === userId;

  const sharedProps: Omit<ReflectionRowProps, "reflection" | "depth"> = {
    reflections,
    userId,
    currentUserBadge,
    currentUserGroupRole,
    deletingId,
    editingId,
    editingText,
    setEditingId,
    setEditingText,
    savingId,
    likeLoading,
    likeAnimatingIds,
    replyingToId,
    setReplyingToId,
    replyText,
    setReplyText,
    submitting,
    onDeleteReflection,
    onSaveEdit,
    onToggleLike,
    onSubmit,
  };

  const indentClass = depth === 0 ? "mt-4" : "ml-6 mt-3 pl-3 border-l border-[#e8ddd0]";

  function handleReplyKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void onSubmit(reflection.id);
    }
  }

  return (
    <div className={`${indentClass} flex gap-3`}>
      {reflection.profile_image_url ? (
        <img src={reflection.profile_image_url} alt={name} className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5" />
      ) : (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5"
          style={{ backgroundColor: avatarBg(reflection.user_id) }}
        >
          {getInitial(name)}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl bg-[#faf7f2] border border-[#efe5d9] px-3 py-2.5">
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Link href={`/profile/${reflection.user_id}`} className="text-xs font-semibold text-gray-800 hover:underline">
                  {name}
                </Link>
                <UserBadge
                  customBadge={reflection.member_badge}
                  isPaid={reflection.is_paid === true}
                  groupRole={reflection.group_role}
                />
                <span className="text-xs text-gray-400">{timeAgo(reflection.created_at)}</span>
              </div>
              {editingId === reflection.id ? (
                <div className="mt-2 space-y-2">
                  <textarea
                    value={editingText}
                    onChange={(event) => setEditingText(event.target.value)}
                    rows={3}
                    className="w-full rounded-2xl border border-[#ead8c4] bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#d6b18b] resize-none"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void onSaveEdit(reflection)}
                      disabled={savingId === reflection.id || !editingText.trim()}
                      className="rounded-xl px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                      style={{ backgroundColor: "#5a9a5a" }}
                    >
                      {savingId === reflection.id ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setEditingText("");
                      }}
                      className="rounded-xl border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-700 mt-1 leading-relaxed whitespace-pre-wrap">{reflection.content}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-1 px-1">
          <button
            type="button"
            onClick={() => void onToggleLike(reflection)}
            disabled={likeLoading.has(reflection.id)}
            className="flex items-center gap-1 text-xs transition"
            style={{ color: reflection.liked ? "#e53e3e" : "#9ca3af" }}
          >
            <svg className={`w-3.5 h-3.5 ${likeAnimatingIds.has(reflection.id) ? "animate-heart-pop" : ""}`} fill={reflection.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{reflection.like_count > 0 ? reflection.like_count : "Like"}</span>
          </button>
          <button
              type="button"
              onClick={() => {
                setReplyingToId(replyingToId === reflection.id ? null : reflection.id);
                setReplyText("");
              }}
              className="text-xs text-gray-400 hover:text-[#b7794d] font-semibold transition"
            >
              Reply
            </button>
          {canEditReflection && editingId !== reflection.id && (
            <button
              type="button"
              onClick={() => {
                setEditingId(reflection.id);
                setEditingText(reflection.content);
                setReplyingToId(null);
                setReplyText("");
              }}
              className="text-xs text-gray-400 hover:text-[#4a9b6f] font-semibold transition"
            >
              Edit
            </button>
          )}
          {canDeleteReflection && (
            <button
              type="button"
              onClick={() => void onDeleteReflection(reflection)}
              disabled={deletingId === reflection.id}
              className="text-xs text-gray-400 hover:text-red-500 font-semibold transition disabled:opacity-50"
            >
              {deletingId === reflection.id ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
        {replyingToId === reflection.id && (
          <div className="mt-2 flex gap-2 items-end">
            <textarea
              value={replyText}
              onChange={(event) => setReplyText(event.target.value)}
              onKeyDown={handleReplyKeyDown}
              placeholder={`Reply to ${name}...`}
              rows={1}
              autoFocus
              className="w-full text-sm px-3 py-2 border border-[#eadfce] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#d6b18b] bg-white"
            />
            <button
              type="button"
              onClick={() => void onSubmit(reflection.id)}
              disabled={!replyText.trim() || submitting}
              className="text-sm font-semibold text-white px-3 py-2 rounded-xl transition disabled:opacity-40 flex-shrink-0"
              style={{ backgroundColor: "#4a9b6f" }}
            >
              Reply
            </button>
          </div>
        )}
        {replies.map((reply) => (
          <ReflectionRow key={reply.id} reflection={reply} depth={Math.min(depth + 1, 1)} {...sharedProps} />
        ))}
      </div>
    </div>
  );
}

function ReflectionSection({
  lesson,
  userId,
  groupId,
  seriesId,
  weekNumber,
  done,
  onCompletionChange,
  displayName,
  profileImageUrl,
  currentUserBadge,
  currentUserIsPaid,
  currentUserGroupRole,
}: {
  lesson: SeriesWeekLesson;
  userId: string;
  groupId: string;
  seriesId: string;
  weekNumber: number;
  done: boolean;
  onCompletionChange: (completed: boolean) => void;
  displayName: string;
  profileImageUrl: string | null;
  currentUserBadge: string | null;
  currentUserIsPaid: boolean;
  currentUserGroupRole: string | null;
}) {
  const [text, setText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hasCompletedReflection, setHasCompletedReflection] = useState(done);
  const [reflections, setReflections] = useState<ReflectionEntry[]>([]);
  const [loadingReflections, setLoadingReflections] = useState(true);
  const [reflectionError, setReflectionError] = useState<string | null>(null);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [savingEditId, setSavingEditId] = useState<string | null>(null);
  const [likeLoading, setLikeLoading] = useState<Set<string>>(new Set());
  const [likeAnimatingIds, setLikeAnimatingIds] = useState<Set<string>>(new Set());
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setHasCompletedReflection(done);
  }, [done]);

  useEffect(() => {
    async function loadReflections() {
      setLoadingReflections(true);
      const { data, error } = await supabase
        .from("series_reflections")
        .select("id, user_id, content, display_name, profile_image_url, created_at, parent_reflection_id, like_count")
        .eq("series_id", seriesId)
        .eq("week_number", weekNumber)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Failed to load reflections:", error);
        setReflectionError("Reflections could not load. Check the series reflections table and policies in Supabase.");
        setReflections([]);
        setLoadingReflections(false);
        return;
      }

      const rows = (data || []) as ReflectionEntry[];
      let likedSet = new Set<string>();
      if (rows.length > 0) {
        const { data: likes, error: likesError } = await supabase
          .from("series_reflection_likes")
          .select("reflection_id")
          .eq("user_id", userId)
          .in("reflection_id", rows.map((row) => row.id));
        if (!likesError) {
          likedSet = new Set((likes || []).map((like) => like.reflection_id));
        }
      }

      const reflectionUserIds = [...new Set(rows.map((row) => row.user_id))];
      let profileMap: Record<string, { member_badge: string | null; is_paid: boolean }> = {};
      let roleMap: Record<string, string | null> = {};

      if (reflectionUserIds.length > 0) {
        const [{ data: profileRows }, { data: memberRows }] = await Promise.all([
          supabase
            .from("profile_stats")
            .select("user_id, member_badge, is_paid")
            .in("user_id", reflectionUserIds),
          supabase
            .from("group_members")
            .select("user_id, role")
            .eq("group_id", groupId)
            .in("user_id", reflectionUserIds),
        ]);

        profileMap = Object.fromEntries(
          (profileRows || []).map((row) => [
            row.user_id,
            { member_badge: row.member_badge ?? null, is_paid: row.is_paid === true },
          ]),
        );
        roleMap = Object.fromEntries((memberRows || []).map((row) => [row.user_id, row.role ?? null]));
      }

      setReflectionError(null);
      setReflections(
        rows.map((row) => ({
          ...row,
          liked: likedSet.has(row.id),
          member_badge: profileMap[row.user_id]?.member_badge ?? null,
          is_paid: profileMap[row.user_id]?.is_paid ?? false,
          group_role: roleMap[row.user_id] ?? null,
        })),
      );
      setLoadingReflections(false);
    }

    void loadReflections();
  }, [groupId, seriesId, userId, weekNumber]);

  async function handleSubmit(parentId: string | null = null) {
    const content = (parentId ? replyText : text).trim();
    if (!content || submitting) return;
    setSubmitting(true);
    setReflectionError(null);
    const { error } = await supabase.from("series_reflections").insert({
      user_id: userId,
      series_id: seriesId,
      week_number: weekNumber,
      content,
      display_name: displayName || null,
      profile_image_url: profileImageUrl || null,
      parent_reflection_id: parentId,
    });
    if (!error) {
      const newEntry: ReflectionEntry = {
        id: crypto.randomUUID(),
        user_id: userId,
        content,
        display_name: displayName,
        profile_image_url: profileImageUrl,
        member_badge: currentUserBadge,
        is_paid: currentUserIsPaid,
        group_role: currentUserGroupRole,
        created_at: new Date().toISOString(),
        parent_reflection_id: parentId,
        like_count: 0,
        liked: false,
      };
      setReflections((prev) => [newEntry, ...prev]);
      if (parentId) {
        setReplyText("");
        setReplyingToId(null);
      } else {
        setText("");
      }
      if (!parentId && !hasCompletedReflection) {
        setHasCompletedReflection(true);
        onCompletionChange(true);
      }
    } else {
      console.error("Failed to save reflection:", error);
      setReflectionError(error.message || "Your reflection could not be posted.");
    }
    setSubmitting(false);
  }

  async function handleToggleLike(reflection: ReflectionEntry) {
    if (likeLoading.has(reflection.id)) return;
    setLikeLoading((prev) => new Set(prev).add(reflection.id));

    if (reflection.liked) {
      await supabase.from("series_reflection_likes").delete().eq("reflection_id", reflection.id).eq("user_id", userId);
      await supabase.from("series_reflections").update({ like_count: Math.max(0, reflection.like_count - 1) }).eq("id", reflection.id);
      setReflections((prev) => prev.map((item) => item.id === reflection.id ? { ...item, like_count: Math.max(0, item.like_count - 1), liked: false } : item));
    } else {
      setLikeAnimatingIds((prev) => new Set(prev).add(reflection.id));
      window.setTimeout(() => {
        setLikeAnimatingIds((prev) => {
          const next = new Set(prev);
          next.delete(reflection.id);
          return next;
        });
      }, 420);
      await supabase.from("series_reflection_likes").insert({ reflection_id: reflection.id, user_id: userId });
      await supabase.from("series_reflections").update({ like_count: reflection.like_count + 1 }).eq("id", reflection.id);
      setReflections((prev) => prev.map((item) => item.id === reflection.id ? { ...item, like_count: item.like_count + 1, liked: true } : item));
    }

    setLikeLoading((prev) => {
      const next = new Set(prev);
      next.delete(reflection.id);
      return next;
    });
  }

  async function handleSaveReflectionEdit(reflection: ReflectionEntry) {
    const nextContent = editingText.trim();
    if (!nextContent || savingEditId) return;

    setSavingEditId(reflection.id);
    setReflectionError(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("Could not verify your session.");
      }

      const response = await fetch("/api/comments/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          kind: "series_reflection",
          commentId: reflection.id,
          content: nextContent,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Could not save reflection.");
      }

      setReflections((prev) =>
        prev.map((item) =>
          item.id === reflection.id
            ? { ...item, content: payload.comment?.content ?? nextContent }
            : item
        )
      );
      setEditingId(null);
      setEditingText("");
    } catch (error) {
      setReflectionError(error instanceof Error ? error.message : "Could not save reflection.");
    }
    setSavingEditId(null);
  }

  async function handleDeleteReflection(reflection: ReflectionEntry) {
    triggerSmokeDelete();
    if (deletingId) return;
    setDeletingId(reflection.id);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("Could not verify your session.");
      }

      const response = await fetch("/api/comments/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          kind: "series_reflection",
          commentId: reflection.id,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Your reflection could not be deleted.");
      }

      const deletedIds = new Set<string>((payload.deletedIds || []) as string[]);
      if (deletedIds.size === 0) deletedIds.add(reflection.id);

      const nextReflections = reflections.filter((item) => !deletedIds.has(item.id));
      setReflections(nextReflections);
      if (!reflection.parent_reflection_id) {
        const remainingOwnTopLevel = nextReflections.some((item) => item.user_id === userId && !item.parent_reflection_id);
        if (!remainingOwnTopLevel) {
          setHasCompletedReflection(false);
          onCompletionChange(false);
        }
      }
    } catch (error) {
      console.error("Failed to delete reflection:", error);
      setReflectionError(error instanceof Error ? error.message : "Your reflection could not be deleted.");
      setDeletingId(null);
      return;
    }
    setDeletingId(null);
  }

  const topLevelReflections = reflections.filter((r) => !r.parent_reflection_id);

  const sharedRowProps: Omit<ReflectionRowProps, "reflection" | "depth"> = {
    reflections,
    userId,
    currentUserBadge,
    currentUserGroupRole,
    deletingId,
    editingId,
    editingText,
    setEditingId,
    setEditingText,
    savingId: savingEditId,
    likeLoading,
    likeAnimatingIds,
    replyingToId,
    setReplyingToId,
    replyText,
    setReplyText,
    submitting,
    onDeleteReflection: handleDeleteReflection,
    onSaveEdit: handleSaveReflectionEdit,
    onToggleLike: handleToggleLike,
    onSubmit: (parentId) => handleSubmit(parentId),
  };

  return (
    <div>
      <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-4">
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">This Week's Reflection</p>
        <p className="text-sm text-amber-900 leading-relaxed">{lesson.reflectionQuestion}</p>
      </div>
      {reflectionError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-sm text-red-700">
          {reflectionError}
        </div>
      )}

      <div className="flex gap-3 items-end">
        {profileImageUrl ? (
          <img src={profileImageUrl} alt={displayName} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: avatarBg(userId) }}
          >
            {getInitial(displayName)}
          </div>
        )}
        <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 flex items-end gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Post your reflection..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 resize-none outline-none max-h-28"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void handleSubmit(null);
              }
            }}
          />
          <button
            onClick={() => void handleSubmit(null)}
            disabled={!text.trim() || submitting}
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition disabled:opacity-40"
            style={{ backgroundColor: "#4a9b6f" }}
            aria-label="Post reflection"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
      {hasCompletedReflection && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mt-4 text-sm text-green-700 font-semibold">
          Reflection completed.
        </div>
      )}

      {/* Others' reflections */}
      {!loadingReflections && reflections.length > 0 && (
        <div className="mt-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Group Reflections</p>
          {topLevelReflections.map((reflection) => (
            <ReflectionRow key={reflection.id} reflection={reflection} {...sharedRowProps} />
          ))}
        </div>
      )}
    </div>
  );
}

// â”€â”€ Completion Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CompletionModal({ weekNumber, groupId, onClose }: { weekNumber: number; groupId: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full px-8 py-10 text-center relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confetti */}
        {CONFETTI.map((c, i) => (
          <div
            key={i}
            className="absolute top-0 animate-bounce"
            style={{
              left: `${c.left}%`,
              width: c.w,
              height: c.h,
              backgroundColor: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: "1s",
              borderRadius: 2,
            }}
          />
        ))}

        <div className="text-6xl mb-4 animate-bounce">🙏</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Week {weekNumber} Complete!</h2>
        <p className="text-sm text-gray-500 mb-6">
          You've finished the reading, trivia, and reflection for this week. Keep it up!
        </p>

        <Link
          href={`/study-groups/${groupId}/series`}
          className="block w-full py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
          style={{ backgroundColor: "#4a9b6f" }}
          onClick={onClose}
        >
          Back to Series Overview
        </Link>
      </div>
    </div>
  );
}

// â”€â”€ Louis loading skeleton for database word overlays â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function LouisLoadingCard({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center py-10 gap-5">
      <div style={{ animation: "bounce 1s infinite" }}>
        <LouisAvatar mood="think" size={72} />
      </div>
      <div className="w-full space-y-3 px-2">
        <div className="h-3.5 bg-gray-100 rounded-full animate-pulse" />
        <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-5/6" />
        <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-3/4" />
        <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-4/5" />
        <div className="h-3.5 bg-gray-100 rounded-full animate-pulse w-2/3" />
      </div>
      <p className="text-sm text-gray-400 italic animate-pulse">{name} is loading…</p>
    </div>
  );
}

function SmallLouisLoadingModal({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-xs rounded-3xl border border-gray-200 bg-white px-5 py-5 shadow-2xl">
        <div className="flex items-center gap-3">
          <div style={{ animation: "bounce 1s infinite" }}>
            <LouisAvatar mood="think" size={44} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900">{title}</p>
            <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{subtitle}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2.5 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-2.5 bg-gray-100 rounded-full animate-pulse w-5/6" />
          <div className="h-2.5 bg-gray-100 rounded-full animate-pulse w-2/3" />
        </div>
      </div>
    </div>
  );
}

// â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function WeekLessonPage({
  embeddedGroupId,
  embeddedWeekNum,
  embeddedSeriesId,
  embeddedSeriesTitle,
  embedded = false,
  onBack,
}: WeekLessonPageProps = {}) {
  const params = useParams();
  const router = useRouter();
  const groupId = embeddedGroupId ?? (params.id as string);
  const weekNum = embeddedWeekNum ?? parseInt(params.weekNum as string, 10);
  const isEmbeddedPreviewSeries = Boolean(embeddedSeriesId && embeddedSeriesId.startsWith("preview-"));

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [memberBadge, setMemberBadge] = useState<string | null>(null);
  const [currentGroupRole, setCurrentGroupRole] = useState<string | null>(null);
  const [seriesId, setSeriesId] = useState<string | null>(null);
  const [groupName, setGroupName] = useState("Group");
  const [seriesTitle, setSeriesTitle] = useState("The Temptation of Jesus");
  const [accessDeniedMessage, setAccessDeniedMessage] = useState<string | null>(null);

  const [readingDone, setReadingDone] = useState(false);
  const [triviaDone, setTriviaDone] = useState(false);
  const [reflectionDone, setReflectionDone] = useState(false);
  const [savedTriviaScore, setSavedTriviaScore] = useState<number | null>(null);

  const [showReadingModal, setShowReadingModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [weekFinishers, setWeekFinishers] = useState<WeekFinisher[]>([]);
  const [loadingWeekFinishers, setLoadingWeekFinishers] = useState(false);
  const [showWeekFinishersModal, setShowWeekFinishersModal] = useState(false);
  const completionShownRef = useRef(false);

  // â”€â”€ Bible term overlay state (same as Bible chapter page) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [selectedPerson, setSelectedPerson] = useState<{ name: string } | null>(null);
  const [selectedPlace, setSelectedPlace]   = useState<{ name: string } | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<{ name: string } | null>(null);
  const [personNotes, setPersonNotes]   = useState<string | null>(null);
  const [placeNotes, setPlaceNotes]     = useState<string | null>(null);
  const [keywordNotes, setKeywordNotes] = useState<string | null>(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [personCreditBlocked, setPersonCreditBlocked]   = useState(false);
  const [placeCreditBlocked, setPlaceCreditBlocked]     = useState(false);
  const [keywordCreditBlocked, setKeywordCreditBlocked] = useState(false);
  const [viewedPeople, setViewedPeople]     = useState<Set<string>>(new Set());
  const [viewedPlaces, setViewedPlaces]     = useState<Set<string>>(new Set());
  const [viewedKeywords, setViewedKeywords] = useState<Set<string>>(new Set());
  const [completedPeople, setCompletedPeople]     = useState<Set<string>>(new Set());
  const [completedPlaces, setCompletedPlaces]     = useState<Set<string>>(new Set());
  const [completedKeywords, setCompletedKeywords] = useState<Set<string>>(new Set());
  const [showCreditLimitModal, setShowCreditLimitModal] = useState(false);
  const [isAnimatingPerson, setIsAnimatingPerson]   = useState(false);
  const [isAnimatingPlace, setIsAnimatingPlace]     = useState(false);
  const [isAnimatingKeyword, setIsAnimatingKeyword] = useState(false);
  const [learnedToast, setLearnedToast] = useState<string | null>(null);

  const lesson = useMemo(() => getSeriesWeekLesson(weekNum, seriesTitle), [weekNum, seriesTitle]);
  const handleUnlockNotes = useCallback(() => {
    router.push("/upgrade");
  }, [router]);

  async function loadWeekFinishers(currentSeriesId: string) {
    setLoadingWeekFinishers(true);
    try {
      const { data: progressRows, error: progressError } = await supabase
        .from("series_week_progress")
        .select("user_id")
        .eq("series_id", currentSeriesId)
        .eq("week_number", weekNum)
        .eq("reading_completed", true)
        .eq("trivia_completed", true)
        .eq("reflection_posted", true);

      if (progressError) {
        console.error("[WEEK_FINISHERS] Error loading progress:", progressError);
        setWeekFinishers([]);
        return;
      }

      const finisherIds = [...new Set((progressRows || []).map((row) => row.user_id).filter(Boolean))];
      if (finisherIds.length === 0) {
        setWeekFinishers([]);
        return;
      }

      const [profilesRes, rolesRes] = await Promise.all([
        supabase
          .from("profile_stats")
          .select("user_id, display_name, username, profile_image_url, is_paid, member_badge")
          .in("user_id", finisherIds),
        supabase
          .from("group_members")
          .select("user_id, role")
          .eq("group_id", groupId)
          .in("user_id", finisherIds),
      ]);

      const roleMap = new Map<string, string | null>();
      (rolesRes.data || []).forEach((row) => {
        roleMap.set(row.user_id, row.role || null);
      });

      const profileMap = new Map<string, WeekFinisher>();
      (profilesRes.data || []).forEach((row) => {
        profileMap.set(row.user_id, {
          user_id: row.user_id,
          display_name: row.display_name || row.username || "Bible Buddy",
          profile_image_url: row.profile_image_url || null,
          member_badge: row.member_badge || null,
          is_paid: row.is_paid === true,
          group_role: roleMap.get(row.user_id) ?? null,
        });
      });

      const orderedFinishers = finisherIds.map((id) => {
        return (
          profileMap.get(id) || {
            user_id: id,
            display_name: "Bible Buddy",
            profile_image_url: null,
            member_badge: null,
            is_paid: false,
            group_role: roleMap.get(id) ?? null,
          }
        );
      });

      setWeekFinishers(orderedFinishers);
    } catch (error) {
      console.error("[WEEK_FINISHERS] Unexpected error:", error);
      setWeekFinishers([]);
    } finally {
      setLoadingWeekFinishers(false);
    }
  }

  // â”€â”€ Resolve alias â†’ primary person name â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function resolvePersonName(clicked: string): string {
    return resolveBibleReference("people", clicked);
  }
  function normalizeMd(md: string): string {
    return md.replace(/^\s*[-&bull;*]\s+/gm, "").replace(/\n{3,}/g, "\n\n").trim();
  }

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);

      const [memberRes, groupRes, seriesRes, profileRes] = await Promise.all([
        supabase.from("group_members").select("role").eq("group_id", groupId).eq("user_id", user.id).maybeSingle(),
        supabase.from("study_groups").select("name").eq("id", groupId).maybeSingle(),
        embeddedSeriesId
          ? Promise.resolve({ data: { id: embeddedSeriesId, title: embeddedSeriesTitle ?? "Bible Series" }, error: null })
          : supabase.from("group_series").select("id, title").eq("group_id", groupId).eq("is_current", true).maybeSingle(),
        supabase.from("profile_stats").select("display_name, username, profile_image_url, is_paid, member_badge").eq("user_id", user.id).maybeSingle(),
      ]);

      if (groupRes.data?.name) setGroupName(groupRes.data.name);
      const isLeader = memberRes.data?.role === "leader";
      setCurrentGroupRole(memberRes.data?.role || null);

      if (seriesRes.data?.id) {
        setSeriesId(seriesRes.data.id);
        if (seriesRes.data.title) setSeriesTitle(seriesRes.data.title);
      }

      if (profileRes.data) {
        setDisplayName(profileRes.data.display_name || profileRes.data.username || "");
        setProfileImageUrl(profileRes.data.profile_image_url || null);
        setIsPaid(profileRes.data.is_paid === true);
        setMemberBadge(profileRes.data.member_badge || null);
      }

      setLoading(false);

      if (seriesRes.data?.id && !isEmbeddedPreviewSeries) {
        const sid = seriesRes.data.id;
        void loadWeekFinishers(sid);
        const [scheduleRes, progressRowsRes, scoreRes] = await Promise.all([
          supabase.from("series_schedules").select("start_date, start_at").eq("series_id", sid).maybeSingle(),
          supabase
            .from("series_week_progress")
            .select("week_number, reading_completed, trivia_completed, reflection_posted")
            .eq("user_id", user.id)
            .eq("series_id", sid),
          supabase
            .from("series_trivia_scores")
            .select("score")
            .eq("user_id", user.id)
            .eq("series_id", sid)
            .eq("week_number", weekNum)
            .maybeSingle(),
        ]);

        const progressMap: Record<number, { reading: boolean; trivia: boolean; reflection: boolean }> = {};
        (progressRowsRes.data || []).forEach((row) => {
          progressMap[row.week_number] = {
            reading: row.reading_completed ?? false,
            trivia: row.trivia_completed ?? false,
            reflection: row.reflection_posted ?? false,
          };
        });

        const currentWeek = progressMap[weekNum];
        if (currentWeek) {
          setReadingDone(currentWeek.reading);
          setTriviaDone(currentWeek.trivia);
          setReflectionDone(currentWeek.reflection);
        } else {
          // First time this user opens this week — log to master_actions
          const seriesTitle2 = seriesRes.data?.title ?? "Bible Series";
          const username2 = profileRes.data?.username ?? profileRes.data?.display_name ?? "";
          void supabase.from("master_actions").insert({
            user_id: user.id,
            username: username2,
            action_type: ACTION_TYPE.series_week_started,
            action_label: `${username2} started Week ${weekNum} of ${seriesTitle2}`,
          });
        }
        if (scoreRes.data) {
          setSavedTriviaScore(scoreRes.data.score);
        }

        const previousWeek = progressMap[weekNum - 1] ?? { reading: false, trivia: false, reflection: false };
        const previousWeekComplete = weekNum === 1 ? true : (previousWeek.reading && previousWeek.trivia && previousWeek.reflection);
        const accessState = getWeekAccessState(
          resolveSeriesStart(scheduleRes.data),
          weekNum,
          isLeader,
          previousWeekComplete
        );
        if (!accessState.allowed) {
          setAccessDeniedMessage(accessState.message);
        }
      }
    }
    init();
  }, [embeddedSeriesId, embeddedSeriesTitle, groupId, isEmbeddedPreviewSeries, weekNum, router]);

  // â”€â”€ Load completed people/places/keywords for this user â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    if (!userId) return;
    Promise.all([
      supabase.from("people_progress").select("person_name").eq("user_id", userId),
      supabase.from("places_progress").select("place_name").eq("user_id", userId),
      supabase.from("keywords_progress").select("keyword_name").eq("user_id", userId),
    ]).then(([pp, pl, kw]) => {
      setCompletedPeople(new Set((pp.data || []).map((r) => r.person_name.toLowerCase().trim())));
      setCompletedPlaces(new Set((pl.data || []).map((r) => r.place_name.toLowerCase().trim())));
      setCompletedKeywords(new Set((kw.data || []).map((r) => r.keyword_name.toLowerCase().trim())));
    });
  }, [userId]);

  // â”€â”€ Document-level click delegation for bible-highlight spans â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el.classList.contains("bible-highlight")) return;
      const type = el.dataset.type;
      const term = el.dataset.term;
      if (!type || !term) return;
      if (type === "people") {
        setSelectedPerson({ name: resolvePersonName(term) });
        setSelectedPlace(null); setSelectedKeyword(null);
      } else if (type === "places") {
        setSelectedPlace({ name: resolveBibleReference("places", term) });
        setSelectedPerson(null); setSelectedKeyword(null);
      } else if (type === "keywords") {
        setSelectedKeyword({ name: resolveBibleReference("keywords", term) });
        setSelectedPerson(null); setSelectedPlace(null);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // â”€â”€ Person notes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    if (!selectedPerson) { setPersonNotes(null); setPersonCreditBlocked(false); return; }
    async function load() {
      setLoadingNotes(true); setPersonNotes(null); setPersonCreditBlocked(false);
      try {
        const key = selectedPerson!.name.toLowerCase().trim();
        if (userId && !completedPeople.has(key) && !viewedPeople.has(key)) {
          const creditResult = await consumeCreditAction(ACTION_TYPE.person_viewed, {
            userId,
            actionLabel: selectedPerson!.name,
          });
          if (!creditResult.ok) { setPersonCreditBlocked(true); setShowCreditLimitModal(true); setLoadingNotes(false); return; }
          setViewedPeople((p) => { const n = new Set(p); n.add(key); return n; });
        }
        const { data: cached } = await supabase.from("bible_people_notes").select("notes_text").eq("person_name", key).maybeSingle();
        if (cached?.notes_text) { setPersonNotes(cached.notes_text); setLoadingNotes(false); return; }
        const isFemale = /^(Mary|Martha|Sarah|Ruth|Esther|Deborah|Hannah|Leah|Rachel|Rebekah|Eve|Delilah|Bathsheba|Jezebel|Lydia|Phoebe|Priscilla|Anna|Elizabeth|Joanna|Susanna|Judith|Vashti)/i.test(selectedPerson!.name);
        const pr = isFemale ? "Her" : "Him"; const wp = isFemale ? "She" : "He";
        const prompt = `You are Little Louis. Generate Bible study notes for ${selectedPerson!.name}.\n\nTemplate:\n# 👤 Who ${wp} Is\n\n(two short paragraphs)\n\n\n\n# 📖 Their Role in the Story\n\n(two to three short paragraphs)\n\n\n\n# 🔥 Key Moments\n\n🔥 sentence\n🔥 sentence\n🔥 sentence\n\n\n\n# 📍 Where You Find ${pr}\n\n📖 Book Chapter\n📖 Book Chapter\n\n\n\n# 🌱 Why This Person Matters\n\n(two short paragraphs)\n\nRules: # headers only, double blank lines between sections, emoji bullets only, no hyphens, ~200-250 words, do NOT put their name as a header.`;
        const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }) });
        const json = await res.json();
        const generated = json?.reply ?? "";
        const { data: check } = await supabase.from("bible_people_notes").select("notes_text").eq("person_name", key).maybeSingle();
        if (check?.notes_text) { setPersonNotes(check.notes_text); } else {
          await supabase.from("bible_people_notes").upsert({ person_name: key, notes_text: generated }, { onConflict: "person_name" });
          setPersonNotes(generated);
        }
      } catch { /* silent */ } finally { setLoadingNotes(false); }
    }
    load();
  }, [selectedPerson, userId, completedPeople, viewedPeople]);

  // â”€â”€ Place notes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    if (!selectedPlace) { setPlaceNotes(null); setPlaceCreditBlocked(false); return; }
    async function load() {
      setLoadingNotes(true); setPlaceNotes(null); setPlaceCreditBlocked(false);
      try {
        const key = selectedPlace!.name.toLowerCase().trim().replace(/\s+/g, "_");
        if (userId && !completedPlaces.has(key) && !viewedPlaces.has(key)) {
          const creditResult = await consumeCreditAction(ACTION_TYPE.place_viewed, {
            userId,
            actionLabel: selectedPlace!.name,
          });
          if (!creditResult.ok) { setPlaceCreditBlocked(true); setShowCreditLimitModal(true); setLoadingNotes(false); return; }
          setViewedPlaces((p) => { const n = new Set(p); n.add(key); return n; });
        }
        const { data: cached } = await supabase.from("places_in_the_bible_notes").select("notes_text").eq("normalized_place", key).maybeSingle();
        if (cached?.notes_text) { setPlaceNotes(cached.notes_text); setLoadingNotes(false); return; }
        const prompt = `You are Little Louis. Generate beginner friendly Bible notes about the PLACE: ${selectedPlace!.name}.\n\nTemplate:\n# ðŸ§­ What This Place Is\n\n(two short paragraphs)\n\n\n\n# ðŸ—ºï¸ Where It Appears in the Story\n\n(two short paragraphs)\n\n\n\n# ðŸ”‘ Key Moments Connected to This Place\n\n🔥 sentence\n🔥 sentence\n🔥 sentence\n\n\n\n# 📖 Where You Find It in Scripture\n\n📖 Book Chapter\n📖 Book Chapter\n\n\n\n# 🌱 Why This Place Matters\n\n(two short paragraphs)\n\nRules: # headers, double blank lines, emoji bullets, no hyphens, ~200 words, no place name as header.`;
        const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }) });
        const json = await res.json();
        const generated = json?.reply ?? "";
        const { data: check } = await supabase.from("places_in_the_bible_notes").select("notes_text").eq("normalized_place", key).maybeSingle();
        if (check?.notes_text) { setPlaceNotes(check.notes_text); } else {
          await supabase.from("places_in_the_bible_notes").upsert({ place: selectedPlace!.name, normalized_place: key, notes_text: generated }, { onConflict: "normalized_place" });
          setPlaceNotes(generated);
        }
      } catch { /* silent */ } finally { setLoadingNotes(false); }
    }
    load();
  }, [selectedPlace, userId, completedPlaces, viewedPlaces]);

  // â”€â”€ Keyword notes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    if (!selectedKeyword) { setKeywordNotes(null); setKeywordCreditBlocked(false); return; }
    async function load() {
      setLoadingNotes(true); setKeywordNotes(null); setKeywordCreditBlocked(false);
      try {
        const key = selectedKeyword!.name.toLowerCase().trim();
        if (userId && !completedKeywords.has(key) && !viewedKeywords.has(key)) {
          const creditResult = await consumeCreditAction(ACTION_TYPE.keyword_viewed, {
            userId,
            actionLabel: selectedKeyword!.name,
          });
          if (!creditResult.ok) { setKeywordCreditBlocked(true); setShowCreditLimitModal(true); setLoadingNotes(false); return; }
          setViewedKeywords((p) => { const n = new Set(p); n.add(key); return n; });
        }
        const { data: cached } = await supabase.from("keywords_in_the_bible").select("notes_text").eq("keyword", key).maybeSingle();
        if (cached?.notes_text) { setKeywordNotes(cached.notes_text); setLoadingNotes(false); return; }
        const prompt = `You are Little Louis. Generate beginner friendly Bible notes about the KEYWORD: ${selectedKeyword!.name}.\n\nTemplate:\n# 📖 What This Keyword Means\n\n(two short paragraphs)\n\n\n\n# ðŸ” Where It Appears in Scripture\n\n(two short paragraphs)\n\n\n\n# ðŸ”‘ Key Verses Using This Keyword\n\n🔥 sentence\n🔥 sentence\n🔥 sentence\n\n\n\n# ðŸ“š Where You Find It in the Bible\n\n📖 Book Chapter\n📖 Book Chapter\n\n\n\n# 🌱 Why This Keyword Matters\n\n(two short paragraphs)\n\nRules: # headers, double blank lines, emoji bullets, no hyphens, ~200 words, no keyword as header.`;
        const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }) });
        const json = await res.json();
        const generated = json?.reply ?? "";
        const { data: check } = await supabase.from("keywords_in_the_bible").select("notes_text").eq("keyword", key).maybeSingle();
        if (check?.notes_text) { setKeywordNotes(check.notes_text); } else {
          await supabase.from("keywords_in_the_bible").upsert({ keyword: selectedKeyword!.name, notes_text: generated }, { onConflict: "keyword" });
          setKeywordNotes(generated);
        }
      } catch { /* silent */ } finally { setLoadingNotes(false); }
    }
    load();
  }, [selectedKeyword, userId, completedKeywords, viewedKeywords]);

  async function updateProgressValue(field: "reading_completed" | "trivia_completed" | "reflection_posted", value: boolean) {
    if (!userId || !seriesId) return;

    const patch: Record<string, boolean | string | number> = {
      user_id: userId,
      series_id: seriesId,
      week_number: weekNum,
      [field]: value,
    };

    await supabase
      .from("series_week_progress")
      .upsert(patch, { onConflict: "user_id,series_id,week_number" });

    void loadWeekFinishers(seriesId);

    const newReading = field === "reading_completed" ? value : readingDone;
    const newTrivia = field === "trivia_completed" ? value : triviaDone;
    const newReflection = field === "reflection_posted" ? value : reflectionDone;

    if (newReading && newTrivia && newReflection && !completionShownRef.current) {
      completionShownRef.current = true;
      setShowCompletionModal(true);
    }
  }

  async function updateProgress(field: "reading_completed" | "trivia_completed" | "reflection_posted") {
    await updateProgressValue(field, true);
  }

  function handleReadingComplete() {
    setReadingDone(true);
    updateProgress("reading_completed");
  }

  function handleTriviaComplete(score: number) {
    setSavedTriviaScore(score);
    setTriviaDone(true);
    updateProgress("trivia_completed");
  }

  function handleReflectionCompletionChange(completed: boolean) {
    setReflectionDone(completed);
    void updateProgressValue("reflection_posted", completed);
  }

  if (loading) {
    return <div className="max-w-2xl mx-auto px-4 py-16 text-center text-gray-400">Loading...</div>;
  }

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">This week's lesson isn't available yet.</p>
        {embedded ? (
          <button type="button" onClick={onBack} className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Series
          </button>
        ) : (
          <Link href={`/study-groups/${groupId}/series`} className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Series
          </Link>
        )}
      </div>
    );
  }

  if (accessDeniedMessage) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-700 font-semibold">{accessDeniedMessage}</p>
        {embedded ? (
          <button type="button" onClick={onBack} className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Series
          </button>
        ) : (
          <Link href={`/study-groups/${groupId}/series`} className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Series
          </Link>
        )}
      </div>
    );
  }

  const totalDone = [readingDone, triviaDone, reflectionDone].filter(Boolean).length;
  const visibleFinishers = weekFinishers.slice(0, 6);

  return (
    <div className={embedded ? "" : "min-h-screen bg-gray-50 pb-20"}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {embedded && (
          <div className="mb-6">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8d5d38] hover:text-[#6f4526] transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {seriesTitle}
            </button>
          </div>
        )}
        {!embedded && <nav className="text-sm text-gray-500 mb-6">
          <Link href="/dashboard" className="hover:text-gray-700 transition">Dashboard</Link>
          <span className="mx-2">/</span>
          <Link href={`/study-groups/${groupId}/chat`} className="hover:text-gray-700 transition">{groupName}</Link>
          <span className="mx-2">/</span>
          <Link href={`/study-groups/${groupId}/series`} className="hover:text-gray-700 transition">{seriesTitle}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">Week {weekNum}</span>
        </nav>}

        {/* Week header */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-1">Week {weekNum}</p>
          <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{lesson.subtitle}</p>
        </div>

        {/* Progress bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-gray-500">This Week's Progress</p>
            <p className="text-xs font-bold text-gray-700">{totalDone}/3 complete</p>
          </div>
          <div className="flex gap-1.5">
            {[
              { label: "Reading", done: readingDone },
              { label: "Trivia", done: triviaDone },
              { label: "Reflection", done: reflectionDone },
            ].map((s) => (
              <div key={s.label} className="flex-1">
                <div className={`h-2 rounded-full ${s.done ? "bg-green-500" : "bg-gray-200"}`} />
                <p className={`text-xs mt-1 text-center ${s.done ? "text-green-600 font-semibold" : "text-gray-400"}`}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-gray-500">Week Finishers</p>
              <p className="text-sm font-bold text-gray-900 mt-1">
                {weekFinishers.length} {weekFinishers.length === 1 ? "buddy has" : "buddies have"} finished all 3 parts of Week {weekNum}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Reading, trivia, and reflection all completed.
              </p>
            </div>
            {weekFinishers.length > 0 && (
              <button
                type="button"
                onClick={() => setShowWeekFinishersModal(true)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap"
              >
                View all
              </button>
            )}
          </div>

          <div className="mt-4">
            {loadingWeekFinishers ? (
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
                <span className="ml-2">Loading finishers...</span>
              </div>
            ) : visibleFinishers.length > 0 ? (
              <div className="flex items-center flex-wrap gap-2">
                {visibleFinishers.map((finisher) => (
                  <button
                    key={finisher.user_id}
                    type="button"
                    onClick={() => setShowWeekFinishersModal(true)}
                    className="group flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 pr-3 hover:bg-gray-100 transition"
                  >
                    {finisher.profile_image_url ? (
                      <img
                        src={finisher.profile_image_url}
                        alt={finisher.display_name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#4a9b6f] text-white text-xs font-bold flex items-center justify-center">
                        {finisher.display_name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="text-xs font-semibold text-gray-700 max-w-[110px] truncate group-hover:text-gray-900">
                      {finisher.display_name}
                    </span>
                  </button>
                ))}
                {weekFinishers.length > visibleFinishers.length && (
                  <button
                    type="button"
                    onClick={() => setShowWeekFinishersModal(true)}
                    className="h-9 px-3 rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    +{weekFinishers.length - visibleFinishers.length} more
                  </button>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No full finishers yet. Once buddies complete reading, trivia, and reflection, they’ll show up here.
              </p>
            )}
          </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-4">
          {/* Intro */}
          <MemoFreeIntroSection lesson={lesson} />

          {/* Section 1: Reading */}
          <SectionCard title="Assigned Reading">
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">This Week&apos;s Reading</p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold text-gray-900">{lesson.readingReference}</span>
              </p>
              <p className="text-sm text-gray-500 mb-4">Take a moment to read the passage before continuing.</p>
              <button
                onClick={() => setShowReadingModal(true)}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
                style={{ backgroundColor: "#4a9b6f" }}
              >
                {readingDone ? "Re-read Reading" : "Read Reading"}
              </button>
            </div>
          </SectionCard>

          <MemoNotesSection
            lesson={lesson}
            seriesTitle={seriesTitle}
            isPaid={isPaid}
            onUnlock={handleUnlockNotes}
          />

          {/* Section 2: Trivia */}
          <SectionCard title="Trivia">
            <TriviaQuiz
              lesson={lesson}
              userId={userId!}
              seriesId={seriesId!}
              weekNumber={weekNum}
              alreadyDone={triviaDone}
              savedScore={savedTriviaScore}
              onComplete={handleTriviaComplete}
            />
          </SectionCard>

          {/* Leaderboard (shown once trivia is done) */}
          {(triviaDone || savedTriviaScore !== null) && seriesId && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-800">🏆 Trivia Leaderboard — Week {weekNum}</p>
              </div>
              <div className="px-5 py-4">
                <LeaderboardView seriesId={seriesId} weekNumber={weekNum} userId={userId!} />
              </div>
            </div>
          )}

          {/* Section 3: Reflection */}
          <SectionCard title="Reflection">
            <ReflectionSection
              lesson={lesson}
              userId={userId!}
              groupId={groupId}
              seriesId={seriesId!}
              weekNumber={weekNum}
              done={reflectionDone}
              onCompletionChange={handleReflectionCompletionChange}
              displayName={displayName}
              profileImageUrl={profileImageUrl}
              currentUserBadge={memberBadge}
              currentUserIsPaid={isPaid}
              currentUserGroupRole={currentGroupRole}
            />
          </SectionCard>
        </div>
      </div>

      {/* Reading Modal */}
      {showReadingModal && userId && (
        <ReadingModal
          lesson={lesson}
          userId={userId}
          onComplete={handleReadingComplete}
          onClose={() => setShowReadingModal(false)}
        />
      )}

      {/* Completion Modal */}
      {showCompletionModal && (
        <CompletionModal
          weekNumber={weekNum}
          groupId={groupId}
          onClose={() => setShowCompletionModal(false)}
        />
      )}

      {showWeekFinishersModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setShowWeekFinishersModal(false)}
        >
          <div
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-gray-200 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowWeekFinishersModal(false)}
              className="absolute right-4 top-4 text-xl text-gray-400 hover:text-gray-700"
            >
              ×
            </button>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Week Finishers</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Week {weekNum}</h2>
            <p className="text-sm text-gray-500 mb-5">
              {weekFinishers.length} {weekFinishers.length === 1 ? "buddy has" : "buddies have"} completed reading, trivia, and reflection.
            </p>

            {weekFinishers.length === 0 ? (
              <p className="text-sm text-gray-500">No one has fully finished this week yet.</p>
            ) : (
              <div className="space-y-3">
                {weekFinishers.map((finisher) => (
                  <div
                    key={finisher.user_id}
                    className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3"
                  >
                    {finisher.profile_image_url ? (
                      <img
                        src={finisher.profile_image_url}
                        alt={finisher.display_name}
                        className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#4a9b6f] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                        {finisher.display_name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-900 truncate">{finisher.display_name}</p>
                        <UserBadge
                          customBadge={finisher.member_badge}
                          isPaid={finisher.is_paid}
                          groupRole={finisher.group_role}
                        />
                      </div>
                      <p className="text-xs text-gray-500">Finished all 3 parts</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Credit limit modal */}
      <CreditLimitModal
        open={showCreditLimitModal}
        userId={userId}
        onClose={() => {
          setShowCreditLimitModal(false);
          setSelectedPerson(null); setSelectedPlace(null); setSelectedKeyword(null);
        }}
      />

      {/* â”€â”€ PERSON OVERLAY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {selectedPerson && (
        !personCreditBlocked && !personNotes ? (
          <SmallLouisLoadingModal
            title={`Loading ${selectedPerson.name}`}
            subtitle="Pulling this study note from the database..."
          />
        ) : (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
            <div className="relative w-full max-w-xl max-h-[82vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-5 sm:p-6 my-8">
              <button type="button" onClick={() => { setSelectedPerson(null); setPersonNotes(null); }} className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl">âœ•</button>
              <h2 className="text-2xl font-bold mb-4">{selectedPerson.name}</h2>
              {personCreditBlocked || !personNotes ? null : (
              <div>
                <ReactMarkdown components={{
                  h1: ({ ...p }) => <h1 className="text-xl font-bold mt-6 mb-3 text-gray-900" {...p} />,
                  p:  ({ ...p }) => <p className="mb-4 leading-relaxed text-gray-700" {...p} />,
                  strong: ({ ...p }) => <strong className="font-bold" {...p} />,
                }}>{normalizeMd(personNotes)}</ReactMarkdown>
                {userId && (() => {
                  const key = selectedPerson.name.toLowerCase().trim();
                  const done = completedPeople.has(key);
                  const displayName = selectedPerson.name.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                  return (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <button type="button" onClick={() => {
                        if (done || !userId) return;
                        setIsAnimatingPerson(true);
                        setTimeout(() => {
                          setSelectedPerson(null); setPersonNotes(null); setIsAnimatingPerson(false);
                          setLearnedToast(`${displayName} has been learned! 🙌`);
                          setTimeout(() => setLearnedToast(null), 3500);
                        }, 250);
                        supabase.from("people_progress").upsert({ user_id: userId, person_name: key }, { onConflict: "user_id,person_name" })
                          .then(() => setCompletedPeople((p) => { const n = new Set(p); n.add(key); return n; }));
                      }} className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${done ? "bg-green-100 text-green-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"}`}
                        style={isAnimatingPerson ? { transform: "scale(0.92)", opacity: 0.7 } : undefined}>
                        {done ? `âœ“ ${selectedPerson.name} learned` : `Mark ${selectedPerson.name} as Learned`}
                      </button>
                    </div>
                  );
                })()}
              </div>
              )}
            </div>
          </div>
        )
      )}

      {/* â”€â”€ PLACE OVERLAY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {selectedPlace && (
        !placeCreditBlocked && !placeNotes ? (
          <SmallLouisLoadingModal
            title={`Loading ${selectedPlace.name}`}
            subtitle="Pulling this study note from the database..."
          />
        ) : (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
            <div className="relative w-full max-w-xl max-h-[82vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-5 sm:p-6 my-8">
              <button type="button" onClick={() => { setSelectedPlace(null); setPlaceNotes(null); }} className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl">âœ•</button>
              <h2 className="text-2xl font-bold mb-4">{selectedPlace.name}</h2>
              {placeCreditBlocked || !placeNotes ? null : (
              <div>
                <ReactMarkdown components={{
                  h1: ({ ...p }) => <h1 className="text-xl font-bold mt-6 mb-3 text-gray-900" {...p} />,
                  p:  ({ ...p }) => <p className="mb-4 leading-relaxed text-gray-700" {...p} />,
                  strong: ({ ...p }) => <strong className="font-bold" {...p} />,
                }}>{normalizeMd(placeNotes)}</ReactMarkdown>
                {userId && (() => {
                  const key = selectedPlace.name.toLowerCase().trim().replace(/\s+/g, "_");
                  const done = completedPlaces.has(key);
                  const displayName = selectedPlace.name.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                  return (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <button type="button" onClick={() => {
                        if (done || !userId) return;
                        setIsAnimatingPlace(true);
                        setTimeout(() => {
                          setSelectedPlace(null); setPlaceNotes(null); setIsAnimatingPlace(false);
                          setLearnedToast(`${displayName} has been learned! 🙌`);
                          setTimeout(() => setLearnedToast(null), 3500);
                        }, 250);
                        supabase.from("places_progress").upsert({ user_id: userId, place_name: key }, { onConflict: "user_id,place_name" })
                          .then(() => setCompletedPlaces((p) => { const n = new Set(p); n.add(key); return n; }));
                      }} className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${done ? "bg-green-100 text-green-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"}`}
                        style={isAnimatingPlace ? { transform: "scale(0.92)", opacity: 0.7 } : undefined}>
                        {done ? `âœ“ ${selectedPlace.name} learned` : `Mark ${selectedPlace.name} as Learned`}
                      </button>
                    </div>
                  );
                })()}
              </div>
              )}
            </div>
          </div>
        )
      )}

      {/* â”€â”€ KEYWORD OVERLAY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {selectedKeyword && (
        !keywordCreditBlocked && !keywordNotes ? (
          <SmallLouisLoadingModal
            title={`Loading ${selectedKeyword.name}`}
            subtitle="Pulling this study note from the database..."
          />
        ) : (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
            <div className="relative w-full max-w-xl max-h-[82vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-5 sm:p-6 my-8">
              <button type="button" onClick={() => { setSelectedKeyword(null); setKeywordNotes(null); }} className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl">âœ•</button>
              <h2 className="text-2xl font-bold mb-4">{selectedKeyword.name}</h2>
              {keywordCreditBlocked || !keywordNotes ? null : (
              <div>
                <ReactMarkdown components={{
                  h1: ({ ...p }) => <h1 className="text-xl font-bold mt-6 mb-3 text-gray-900" {...p} />,
                  p:  ({ ...p }) => <p className="mb-4 leading-relaxed text-gray-700" {...p} />,
                  strong: ({ ...p }) => <strong className="font-bold" {...p} />,
                }}>{normalizeMd(keywordNotes)}</ReactMarkdown>
                {userId && (() => {
                  const key = selectedKeyword.name.toLowerCase().trim();
                  const done = completedKeywords.has(key);
                  const displayName = selectedKeyword.name.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                  return (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <button type="button" onClick={() => {
                        if (done || !userId) return;
                        setIsAnimatingKeyword(true);
                        setTimeout(() => {
                          setSelectedKeyword(null); setKeywordNotes(null); setIsAnimatingKeyword(false);
                          setLearnedToast(`${displayName} has been learned! 🙌`);
                          setTimeout(() => setLearnedToast(null), 3500);
                        }, 250);
                        supabase.from("keywords_progress").upsert({ user_id: userId, keyword_name: key }, { onConflict: "user_id,keyword_name" })
                          .then(() => setCompletedKeywords((p) => { const n = new Set(p); n.add(key); return n; }));
                      }} className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${done ? "bg-green-100 text-green-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"}`}
                        style={isAnimatingKeyword ? { transform: "scale(0.92)", opacity: 0.7 } : undefined}>
                        {done ? `âœ“ ${selectedKeyword.name} learned` : `Mark ${selectedKeyword.name} as Learned`}
                      </button>
                    </div>
                  );
                })()}
              </div>
              )}
            </div>
          </div>
        )
      )}

      {/* â”€â”€ Louis "learned" toast â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {learnedToast && (
        <div
          className="fixed bottom-24 left-1/2 z-50 flex items-center gap-3 bg-white border border-green-200 rounded-2xl shadow-2xl px-4 py-3"
          style={{ transform: "translateX(-50%)", animation: "slideUp 0.3s ease-out" }}
        >
          <LouisAvatar mood="stareyes" size={44} />
          <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">{learnedToast}</p>
        </div>
      )}
    </div>
  );
}
