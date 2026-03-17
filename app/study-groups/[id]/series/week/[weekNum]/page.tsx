"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/lib/supabaseClient";
import { getSeriesWeekLesson, SeriesWeekLesson, SeriesTriviaQuestion } from "@/lib/seriesContent";
import { enrichPlainText } from "@/lib/bibleHighlighting";
import { BIBLE_PEOPLE_LIST } from "@/lib/biblePeopleList";
import { ACTION_TYPE } from "@/lib/actionTypes";
import CreditLimitModal from "@/components/CreditLimitModal";
import { LouisAvatar } from "@/components/LouisAvatar";

interface WeekLessonPageProps {
  embeddedGroupId?: string;
  embeddedWeekNum?: number;
  embedded?: boolean;
  onBack?: () => void;
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

// ── 36 fixed confetti pieces (avoids hydration mismatch) ─────────────────────
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

// ── Intro rich renderer ────────────────────────────────────────────────────────

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
  const [expanded, setExpanded] = useState(true);
  const introHTML = parseIntroToHTML(lesson.intro);

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
        <span className="text-gray-400 text-lg">{expanded ? "▲" : "▼"}</span>
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

// ── Section Card wrapper ──────────────────────────────────────────────────────
function SectionCard({
  number,
  title,
  done,
  children,
}: {
  number: number;
  title: string;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`bg-white border rounded-xl shadow-sm overflow-hidden ${done ? "border-green-200" : "border-gray-200"}`}>
      <div className={`px-5 py-3 flex items-center gap-3 ${done ? "bg-green-50" : "bg-gray-50"} border-b ${done ? "border-green-100" : "border-gray-100"}`}>
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
            done ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          {done ? "✓" : number}
        </span>
        <span className={`text-sm font-bold ${done ? "text-green-700" : "text-gray-800"}`}>{title}</span>
        {done && <span className="ml-auto text-xs text-green-600 font-semibold">Complete</span>}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

// ── Reading Modal ─────────────────────────────────────────────────────────────
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
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition text-xl leading-none">✕</button>
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
            {copied ? "Copied!" : "📋 Share Passage"}
          </button>
          <button
            onClick={() => { onComplete(); onClose(); }}
            className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#4a9b6f" }}
          >
            ✓ Complete Reading
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Trivia Quiz ───────────────────────────────────────────────────────────────
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
            {revealed && opt.label === q.correctAnswer && <span className="ml-2 text-green-600">✓</span>}
            {revealed && opt.label === selected && opt.label !== q.correctAnswer && <span className="ml-2 text-red-500">✗</span>}
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
            {saving ? "Saving..." : current + 1 >= questions.length ? "Finish & See Score" : "Next Question →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Leaderboard ───────────────────────────────────────────────────────────────
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
            <p className="text-sm font-semibold text-gray-900 truncate">{e.display_name}{e.user_id === userId ? " (You)" : ""}</p>
          </div>
          <p className="text-sm font-bold text-gray-800 flex-shrink-0">
            {e.score}/{e.total_questions}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── Reflection Section ────────────────────────────────────────────────────────
interface ReflectionEntry {
  id: string;
  user_id: string;
  content: string;
  display_name: string | null;
  profile_image_url: string | null;
  created_at: string;
}

function ReflectionSection({
  lesson,
  userId,
  seriesId,
  weekNumber,
  done,
  onComplete,
  displayName,
  profileImageUrl,
}: {
  lesson: SeriesWeekLesson;
  userId: string;
  seriesId: string;
  weekNumber: number;
  done: boolean;
  onComplete: () => void;
  displayName: string;
  profileImageUrl: string | null;
}) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [posted, setPosted] = useState(done);
  const [reflections, setReflections] = useState<ReflectionEntry[]>([]);
  const [loadingReflections, setLoadingReflections] = useState(true);

  useEffect(() => {
    supabase
      .from("series_reflections")
      .select("id, user_id, content, display_name, profile_image_url, created_at")
      .eq("series_id", seriesId)
      .eq("week_number", weekNumber)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setReflections(data || []);
        setLoadingReflections(false);
      });
  }, [seriesId, weekNumber]);

  async function handleSubmit() {
    if (!text.trim() || submitting) return;
    setSubmitting(true);
    const { error } = await supabase.from("series_reflections").insert({
      user_id: userId,
      series_id: seriesId,
      week_number: weekNumber,
      content: text.trim(),
      display_name: displayName || null,
      profile_image_url: profileImageUrl || null,
    });
    if (!error) {
      const newEntry: ReflectionEntry = {
        id: crypto.randomUUID(),
        user_id: userId,
        content: text.trim(),
        display_name: displayName,
        profile_image_url: profileImageUrl,
        created_at: new Date().toISOString(),
      };
      setReflections((prev) => [newEntry, ...prev]);
      setText("");
      setPosted(true);
      onComplete();
    }
    setSubmitting(false);
  }

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

  return (
    <div>
      <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-4">
        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">This Week's Reflection</p>
        <p className="text-sm text-amber-900 leading-relaxed">{lesson.reflectionQuestion}</p>
      </div>

      {!posted ? (
        <div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full text-sm px-3 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
          />
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || submitting}
            className="w-full mt-2 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#4a9b6f" }}
          >
            {submitting ? "Posting..." : "Post Reflection"}
          </button>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4 text-sm text-green-700 font-semibold">
          ✓ You've posted your reflection for this week
        </div>
      )}

      {/* Others' reflections */}
      {!loadingReflections && reflections.length > 0 && (
        <div className="mt-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Group Reflections</p>
          {reflections.map((r) => (
            <div key={r.id} className="flex gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5"
                style={{ backgroundColor: avatarBg(r.user_id) }}
              >
                {r.profile_image_url ? (
                  <img src={r.profile_image_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  getInitial(r.display_name)
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-semibold text-gray-800">{r.display_name || "Anonymous"}</span>
                  <span className="text-xs text-gray-400">{timeAgo(r.created_at)}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{r.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Completion Modal ──────────────────────────────────────────────────────────
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

// ── Louis loading skeleton for database word overlays ─────────────────────────
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

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function WeekLessonPage({
  embeddedGroupId,
  embeddedWeekNum,
  embedded = false,
  onBack,
}: WeekLessonPageProps = {}) {
  const params = useParams();
  const router = useRouter();
  const groupId = embeddedGroupId ?? (params.id as string);
  const weekNum = embeddedWeekNum ?? parseInt(params.weekNum as string, 10);

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
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
  const completionShownRef = useRef(false);

  // ── Bible term overlay state (same as Bible chapter page) ──────────────────
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

  const lesson = getSeriesWeekLesson(weekNum);

  // ── Resolve alias → primary person name ────────────────────────────────────
  function resolvePersonName(clicked: string): string {
    const lower = clicked.toLowerCase().trim();
    for (const p of BIBLE_PEOPLE_LIST) {
      if (p.name.toLowerCase().trim() === lower) return p.name;
      if (p.aliases?.some((a) => a.toLowerCase().trim() === lower)) return p.name;
    }
    return clicked;
  }
  function normalizeMd(md: string): string {
    return md.replace(/^\s*[-•*]\s+/gm, "").replace(/\n{3,}/g, "\n\n").trim();
  }

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);

      const [memberRes, groupRes, seriesRes, profileRes] = await Promise.all([
        supabase.from("group_members").select("role").eq("group_id", groupId).eq("user_id", user.id).maybeSingle(),
        supabase.from("study_groups").select("name").eq("id", groupId).maybeSingle(),
        supabase.from("group_series").select("id, title").eq("group_id", groupId).eq("is_current", true).maybeSingle(),
        supabase.from("profile_stats").select("display_name, username, profile_image_url").eq("user_id", user.id).maybeSingle(),
      ]);

      if (groupRes.data?.name) setGroupName(groupRes.data.name);
      if (seriesRes.data?.id) {
        setSeriesId(seriesRes.data.id);
        if (seriesRes.data.title) setSeriesTitle(seriesRes.data.title);

        const sid = seriesRes.data.id;
        const [scheduleRes, progressRowsRes, scoreRes] = await Promise.all([
          supabase.from("series_schedules").select("start_date, start_at").eq("series_id", sid).maybeSingle(),
          supabase
            .from("series_week_progress")
            .select("week_number, reading_completed, trivia_completed, reflection_posted")
            .eq("user_id", user.id)
            .eq("series_id", sid)
            ,
          supabase
            .from("series_trivia_scores")
            .select("score")
            .eq("user_id", user.id)
            .eq("series_id", sid)
            .eq("week_number", weekNum)
            .maybeSingle(),
        ]);

        const isLeader = memberRes.data?.role === "leader";
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

      if (profileRes.data) {
        setDisplayName(profileRes.data.display_name || profileRes.data.username || "");
        setProfileImageUrl(profileRes.data.profile_image_url || null);
      }

      setLoading(false);
    }
    init();
  }, [groupId, weekNum, router]);

  // ── Load completed people/places/keywords for this user ────────────────────
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

  // ── Document-level click delegation for bible-highlight spans ───────────────
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
        setSelectedPlace({ name: term });
        setSelectedPerson(null); setSelectedKeyword(null);
      } else if (type === "keywords") {
        setSelectedKeyword({ name: term });
        setSelectedPerson(null); setSelectedPlace(null);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // ── Person notes ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedPerson) { setPersonNotes(null); setPersonCreditBlocked(false); return; }
    async function load() {
      setLoadingNotes(true); setPersonNotes(null); setPersonCreditBlocked(false);
      try {
        const key = selectedPerson!.name.toLowerCase().trim();
        if (userId && !completedPeople.has(key) && !viewedPeople.has(key)) {
          const r = await fetch("/api/consume-credit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ actionType: ACTION_TYPE.person_viewed }) });
          const j = await r.json();
          if (!r.ok || !j.ok) { setPersonCreditBlocked(true); setShowCreditLimitModal(true); setLoadingNotes(false); return; }
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

  // ── Place notes ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedPlace) { setPlaceNotes(null); setPlaceCreditBlocked(false); return; }
    async function load() {
      setLoadingNotes(true); setPlaceNotes(null); setPlaceCreditBlocked(false);
      try {
        const key = selectedPlace!.name.toLowerCase().trim().replace(/\s+/g, "_");
        if (userId && !completedPlaces.has(key) && !viewedPlaces.has(key)) {
          const r = await fetch("/api/consume-credit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ actionType: ACTION_TYPE.place_viewed }) });
          const j = await r.json();
          if (!r.ok || !j.ok) { setPlaceCreditBlocked(true); setShowCreditLimitModal(true); setLoadingNotes(false); return; }
          setViewedPlaces((p) => { const n = new Set(p); n.add(key); return n; });
        }
        const { data: cached } = await supabase.from("places_in_the_bible_notes").select("notes_text").eq("normalized_place", key).maybeSingle();
        if (cached?.notes_text) { setPlaceNotes(cached.notes_text); setLoadingNotes(false); return; }
        const prompt = `You are Little Louis. Generate beginner friendly Bible notes about the PLACE: ${selectedPlace!.name}.\n\nTemplate:\n# 🧭 What This Place Is\n\n(two short paragraphs)\n\n\n\n# 🗺️ Where It Appears in the Story\n\n(two short paragraphs)\n\n\n\n# 🔑 Key Moments Connected to This Place\n\n🔥 sentence\n🔥 sentence\n🔥 sentence\n\n\n\n# 📖 Where You Find It in Scripture\n\n📖 Book Chapter\n📖 Book Chapter\n\n\n\n# 🌱 Why This Place Matters\n\n(two short paragraphs)\n\nRules: # headers, double blank lines, emoji bullets, no hyphens, ~200 words, no place name as header.`;
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

  // ── Keyword notes ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedKeyword) { setKeywordNotes(null); setKeywordCreditBlocked(false); return; }
    async function load() {
      setLoadingNotes(true); setKeywordNotes(null); setKeywordCreditBlocked(false);
      try {
        const key = selectedKeyword!.name.toLowerCase().trim();
        if (userId && !completedKeywords.has(key) && !viewedKeywords.has(key)) {
          const r = await fetch("/api/consume-credit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ actionType: ACTION_TYPE.keyword_viewed }) });
          const j = await r.json();
          if (!r.ok || !j.ok) { setKeywordCreditBlocked(true); setShowCreditLimitModal(true); setLoadingNotes(false); return; }
          setViewedKeywords((p) => { const n = new Set(p); n.add(key); return n; });
        }
        const { data: cached } = await supabase.from("keywords_in_the_bible").select("notes_text").eq("keyword", key).maybeSingle();
        if (cached?.notes_text) { setKeywordNotes(cached.notes_text); setLoadingNotes(false); return; }
        const prompt = `You are Little Louis. Generate beginner friendly Bible notes about the KEYWORD: ${selectedKeyword!.name}.\n\nTemplate:\n# 📖 What This Keyword Means\n\n(two short paragraphs)\n\n\n\n# 🔍 Where It Appears in Scripture\n\n(two short paragraphs)\n\n\n\n# 🔑 Key Verses Using This Keyword\n\n🔥 sentence\n🔥 sentence\n🔥 sentence\n\n\n\n# 📚 Where You Find It in the Bible\n\n📖 Book Chapter\n📖 Book Chapter\n\n\n\n# 🌱 Why This Keyword Matters\n\n(two short paragraphs)\n\nRules: # headers, double blank lines, emoji bullets, no hyphens, ~200 words, no keyword as header.`;
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

  async function updateProgress(field: "reading_completed" | "trivia_completed" | "reflection_posted") {
    if (!userId || !seriesId) return;

    const patch: Record<string, boolean | string | number> = {
      user_id: userId,
      series_id: seriesId,
      week_number: weekNum,
      [field]: true,
    };

    await supabase
      .from("series_week_progress")
      .upsert(patch, { onConflict: "user_id,series_id,week_number" });

    const newReading = field === "reading_completed" ? true : readingDone;
    const newTrivia = field === "trivia_completed" ? true : triviaDone;
    const newReflection = field === "reflection_posted" ? true : reflectionDone;

    if (newReading && newTrivia && newReflection && !completionShownRef.current) {
      completionShownRef.current = true;
      setShowCompletionModal(true);
    }
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

  function handleReflectionComplete() {
    setReflectionDone(true);
    updateProgress("reflection_posted");
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
            ← Back to Series
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
            ← Back to Series
          </Link>
        )}
      </div>
    );
  }

  const totalDone = [readingDone, triviaDone, reflectionDone].filter(Boolean).length;

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
          <span className="mx-2">›</span>
          <Link href={`/study-groups/${groupId}/chat`} className="hover:text-gray-700 transition">{groupName}</Link>
          <span className="mx-2">›</span>
          <Link href={`/study-groups/${groupId}/series`} className="hover:text-gray-700 transition">{seriesTitle}</Link>
          <span className="mx-2">›</span>
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

        {/* Sections */}
        <div className="flex flex-col gap-4">
          {/* Intro */}
          <IntroSection lesson={lesson} />

          {/* Section 1: Reading */}
          <SectionCard number={1} title="Selected Reading" done={readingDone}>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold text-gray-900">{lesson.readingReference}</span>
              </p>
              <p className="text-xs text-gray-400 mb-4">{lesson.subtitle}</p>
              {readingDone ? (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-sm text-green-600 font-semibold">✓ Reading completed</p>
                  <button
                    onClick={() => setShowReadingModal(true)}
                    className="px-5 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
                  >
                    Re-read Passage
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowReadingModal(true)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
                  style={{ backgroundColor: "#4a9b6f" }}
                >
                  Open Reading
                </button>
              )}
            </div>
          </SectionCard>

          {/* Section 2: Trivia */}
          <SectionCard number={2} title="Bible Trivia" done={triviaDone}>
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
          <SectionCard number={3} title="Reflection" done={reflectionDone}>
            <ReflectionSection
              lesson={lesson}
              userId={userId!}
              seriesId={seriesId!}
              weekNumber={weekNum}
              done={reflectionDone}
              onComplete={handleReflectionComplete}
              displayName={displayName}
              profileImageUrl={profileImageUrl}
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

      {/* Credit limit modal */}
      <CreditLimitModal
        open={showCreditLimitModal}
        userId={userId}
        onClose={() => {
          setShowCreditLimitModal(false);
          setSelectedPerson(null); setSelectedPlace(null); setSelectedKeyword(null);
        }}
      />

      {/* ── PERSON OVERLAY ─────────────────────────────────────────────────── */}
      {selectedPerson && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8">
            <button type="button" onClick={() => { setSelectedPerson(null); setPersonNotes(null); }} className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl">✕</button>
            <h2 className="text-3xl font-bold mb-4">{selectedPerson.name}</h2>
            {personCreditBlocked ? null : !personNotes ? (
              <LouisLoadingCard name={selectedPerson.name} />
            ) : (
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
                        {done ? `✓ ${selectedPerson.name} learned` : `Mark ${selectedPerson.name} as Learned`}
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PLACE OVERLAY ──────────────────────────────────────────────────── */}
      {selectedPlace && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8">
            <button type="button" onClick={() => { setSelectedPlace(null); setPlaceNotes(null); }} className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl">✕</button>
            <h2 className="text-3xl font-bold mb-4">{selectedPlace.name}</h2>
            {placeCreditBlocked ? null : !placeNotes ? (
              <LouisLoadingCard name={selectedPlace.name} />
            ) : (
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
                        {done ? `✓ ${selectedPlace.name} learned` : `Mark ${selectedPlace.name} as Learned`}
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── KEYWORD OVERLAY ────────────────────────────────────────────────── */}
      {selectedKeyword && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8">
            <button type="button" onClick={() => { setSelectedKeyword(null); setKeywordNotes(null); }} className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl">✕</button>
            <h2 className="text-3xl font-bold mb-4">{selectedKeyword.name}</h2>
            {keywordCreditBlocked ? null : !keywordNotes ? (
              <LouisLoadingCard name={selectedKeyword.name} />
            ) : (
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
                        {done ? `✓ ${selectedKeyword.name} learned` : `Mark ${selectedKeyword.name} as Learned`}
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Louis "learned" toast ────────────────────────────────────────────── */}
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
