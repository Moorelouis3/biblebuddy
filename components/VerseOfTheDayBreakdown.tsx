"use client";

/**
 * The Verse of the Day breakdown - the saved study content for one entry.
 *
 * Shared by the homepage popup and the /verse-of-the-day/[date] page so a
 * shared link shows exactly what the popup shows. All content comes from the
 * database row; nothing is generated at read time.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAccountGate } from "./AccountRequiredModal";
import {
  fetchVotdEngagement,
  getVotdBackground,
  getVotdShareUrl,
  formatVotdDateLabel,
  trackVotdEvent,
  upsertVotdEngagement,
  type VerseOfTheDayEntry,
} from "../lib/verseOfTheDayContent";

type VotdComment = {
  id: string;
  user_id: string;
  display_name: string | null;
  content: string;
  created_at: string;
  profile_image_url?: string | null;
};

/**
 * The day's reflection discussion - the SAME rows as the real group post for
 * this verse (2026-09-06). Answers written here appear in the group thread
 * and answers written in the group appear here.
 */
function VotdDiscussion({ entry, userId }: { entry: VerseOfTheDayEntry; userId: string | null | undefined }) {
  const [postId, setPostId] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [comments, setComments] = useState<VotdComment[]>([]);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { ensureFullAccount, accountGateModal } = useAccountGate("share your reflection");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch(`/api/verse-of-the-day/discussion?date=${entry.scheduled_date}`);
        if (!response.ok) return;
        const payload = (await response.json()) as { postId?: string; groupId?: string };
        if (cancelled || !payload.postId) return;
        setPostId(payload.postId);
        setGroupId(payload.groupId ?? null);

        const { data: rows, error } = await supabase
          .from("group_posts")
          .select("id, user_id, display_name, content, created_at")
          .eq("parent_post_id", payload.postId)
          .order("created_at", { ascending: true })
          .limit(200);
        if (error || cancelled) return;
        const list = (rows as VotdComment[]) || [];

        const userIds = Array.from(new Set(list.map((row) => row.user_id).filter(Boolean)));
        if (userIds.length > 0) {
          const { data: profiles } = await supabase
            .from("profile_stats")
            .select("user_id, profile_image_url")
            .in("user_id", userIds);
          const imageByUser = new Map((profiles || []).map((row: any) => [row.user_id, row.profile_image_url]));
          list.forEach((row) => {
            row.profile_image_url = imageByUser.get(row.user_id) ?? null;
          });
        }
        if (!cancelled) setComments(list);
      } catch (error) {
        console.error("[VOTD] Could not load the discussion:", error);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [entry.scheduled_date]);

  async function submitReflection() {
    const text = draft.trim();
    if (!text || submitting || !postId || !groupId) return;
    if (!userId) {
      setSubmitError("Sign in to share your reflection.");
      return;
    }
    // Answering requires a real account - same rule as posting in the group.
    if (!(await ensureFullAccount())) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const { data: profile } = await supabase
        .from("profile_stats")
        .select("display_name, username, profile_image_url")
        .eq("user_id", userId)
        .maybeSingle();
      const displayName = profile?.display_name || profile?.username || "Bible Buddy Member";

      const { data: inserted, error } = await supabase
        .from("group_posts")
        .insert({
          group_id: groupId,
          user_id: userId,
          display_name: displayName,
          category: "general",
          content: text,
          parent_post_id: postId,
        })
        .select("id")
        .single();
      if (error) throw new Error(error.message);

      trackVotdEvent("votd_reflection_posted", { date: entry.scheduled_date, reference: entry.reference });
      setComments((prev) => [
        ...prev,
        {
          id: inserted?.id ?? crypto.randomUUID(),
          user_id: userId,
          display_name: displayName,
          content: text,
          created_at: new Date().toISOString(),
          profile_image_url: profile?.profile_image_url ?? null,
        },
      ]);
      setDraft("");
    } catch (error: any) {
      setSubmitError(error?.message || "Could not post your reflection.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!postId) return null;

  return (
    <section>
      <SectionHeading>💬 Share Your Reflection</SectionHeading>
      {comments.length > 0 ? (
        <div className="mb-4 space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-2.5">
              {comment.profile_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={comment.profile_image_url} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover" />
              ) : (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--bb-accent-soft,#eaf2ff)] text-xs font-black text-[var(--bb-accent,#2563eb)]">
                  {(comment.display_name || "B").slice(0, 1).toUpperCase()}
                </span>
              )}
              <div className="min-w-0 rounded-2xl bg-[var(--bb-surface-soft,#f4f8ff)] px-3.5 py-2.5">
                <p className="text-xs font-black text-[var(--bb-text-primary,#111827)]">{comment.display_name || "Bible Buddy Member"}</p>
                <p className="mt-0.5 whitespace-pre-wrap text-sm font-semibold leading-relaxed text-[var(--bb-text-secondary,#374151)]">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mb-3 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">Be the first to answer today&apos;s question.</p>
      )}
      <textarea
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        rows={2}
        placeholder="Write your answer..."
        className="w-full rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-3 text-sm font-semibold text-[var(--bb-text-primary,#111827)] outline-none transition focus:border-[var(--bb-accent,#2563eb)]"
      />
      {submitError ? <p className="mt-1 text-xs font-bold text-red-500">{submitError}</p> : null}
      <div className="mt-2 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => void submitReflection()}
          disabled={submitting || !draft.trim()}
          className="rounded-full bg-[var(--bb-button,#2563eb)] px-5 py-2.5 text-sm font-black text-[var(--bb-button-text,#ffffff)] transition hover:brightness-95 disabled:opacity-50"
        >
          {submitting ? "Posting..." : "Post Reflection"}
        </button>
        {groupId ? (
          <Link
            href={`/study-groups/${groupId}/chat?post=${postId}`}
            className="text-xs font-black text-[var(--bb-accent,#2563eb)] hover:underline"
          >
            View in the Group →
          </Link>
        ) : null}
      </div>
      {accountGateModal}
    </section>
  );
}

function SectionBody({ text }: { text: string }) {
  return (
    <div className="space-y-3">
      {text
        .split(/\n\s*\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line, index) => (
          <p key={index} className="text-[15px] font-semibold leading-relaxed text-[var(--bb-text-secondary,#374151)]">
            {line}
          </p>
        ))}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[var(--bb-accent,#2563eb)]">{children}</h3>
  );
}

export default function VerseOfTheDayBreakdown({
  entry,
  userId,
  onClose,
  surface,
}: {
  entry: VerseOfTheDayEntry;
  userId: string | null | undefined;
  /** Present in the popup; absent on the standalone page. */
  onClose?: () => void;
  surface: "popup" | "page";
}) {
  const background = getVotdBackground(entry);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");
  const completedRef = useRef(false);
  const endMarkerRef = useRef<HTMLDivElement | null>(null);

  const meta = { date: entry.scheduled_date, reference: entry.reference, background: background.theme };

  // Opening the breakdown counts as reading it starting - saved per user so
  // the card can show "read", plus the analytics event per surface.
  useEffect(() => {
    trackVotdEvent(surface === "popup" ? "votd_breakdown_open" : "votd_page_view", meta);
    if (userId) {
      void upsertVotdEngagement(userId, entry.id, { opened_at: new Date().toISOString() });
      void fetchVotdEngagement(userId, entry.id).then((row) => {
        if (row?.bookmarked) setBookmarked(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.id, userId, surface]);

  // Completion = the reader actually reached the end of the breakdown.
  useEffect(() => {
    const marker = endMarkerRef.current;
    if (!marker || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((item) => item.isIntersecting) || completedRef.current) return;
      completedRef.current = true;
      trackVotdEvent("votd_breakdown_complete", meta);
      if (userId) void upsertVotdEngagement(userId, entry.id, { completed_at: new Date().toISOString() });
      observer.disconnect();
    });
    observer.observe(marker);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.id, userId]);

  async function handleBookmark() {
    if (!userId) {
      setShareState("idle");
      window.location.href = "/";
      return;
    }
    const next = !bookmarked;
    setBookmarked(next);
    trackVotdEvent("votd_bookmark", { ...meta, bookmarked: next });
    await upsertVotdEngagement(userId, entry.id, {
      bookmarked: next,
      bookmarked_at: new Date().toISOString(),
    });
  }

  async function handleShare() {
    const url = getVotdShareUrl(entry.scheduled_date);
    const text = `"${entry.verse_text}" - ${entry.reference} (${entry.translation})`;
    trackVotdEvent("votd_share", meta);
    if (userId) void upsertVotdEngagement(userId, entry.id, { shared_at: new Date().toISOString() });
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "Verse of the Day - Bible Buddy", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2000);
    } catch {
      // Share sheet dismissed or clipboard blocked - not an error worth showing.
    }
  }

  const bibleHref = `/Bible/${encodeURIComponent(entry.book)}/${entry.chapter}`;

  return (
    <div className="overflow-hidden rounded-[28px] bg-[var(--bb-card,#ffffff)] shadow-xl">
      {/* Hero - same pastel art as the homepage card so the popup feels
          connected; light wash and dark text, never a dark overlay. */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${background.src})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.22) 55%, rgba(255,255,255,0) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 px-5 py-6 sm:px-7 sm:py-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#1f2937]">Verse of the Day</p>
              <p className="mt-1 text-[11px] font-bold tracking-wide text-[#334155]">
                {formatVotdDateLabel(entry.scheduled_date)}
              </p>
            </div>
            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[rgba(15,23,42,0.12)] bg-white/65 text-lg font-black text-[#1f2937] backdrop-blur-sm transition hover:bg-white"
              >
                ✕
              </button>
            ) : null}
          </div>
          <p className="mt-4 font-serif text-xl font-bold leading-snug text-[#111827] sm:text-2xl">
            {entry.verse_text}
          </p>
          <p className="mt-3 text-sm font-black text-[#334155]">
            {entry.reference} · {entry.translation}
          </p>
        </div>
      </div>

      <div className="px-5 py-6 sm:px-7">
        <div className="space-y-7">
          <section>
            <SectionHeading>📜 Who Wrote This?</SectionHeading>
            <SectionBody text={entry.author_section} />
          </section>
          <section>
            <SectionHeading>🗺️ Where Are We In The Story?</SectionHeading>
            <SectionBody text={entry.context_section} />
          </section>
          <section>
            <SectionHeading>💡 What Does It Actually Mean?</SectionHeading>
            <SectionBody text={entry.meaning_section} />
          </section>
          <section>
            <SectionHeading>❤️ Why This Matters Today</SectionHeading>
            <SectionBody text={entry.application_section} />
          </section>

          <section className="rounded-2xl bg-[var(--bb-accent-soft,#eaf2ff)] p-4">
            <SectionHeading>Take This With You</SectionHeading>
            <p className="text-[15px] font-black leading-relaxed text-[var(--bb-text-primary,#111827)]">
              ✨ {entry.takeaway}
            </p>
          </section>

          <section>
            <SectionHeading>Think About It</SectionHeading>
            <p className="text-[15px] font-bold leading-relaxed text-[var(--bb-text-primary,#111827)]">
              💭 {entry.reflection_question}
            </p>
          </section>

          {/* The reflection discussion - the same thread as the group post. */}
          <VotdDiscussion entry={entry} userId={userId} />

          {entry.prayer ? (
            <section>
              <SectionHeading>🙏 A Short Prayer</SectionHeading>
              <SectionBody text={entry.prayer} />
            </section>
          ) : null}
        </div>

        <div ref={endMarkerRef} aria-hidden="true" />

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <Link
            href={bibleHref}
            onClick={() => trackVotdEvent("votd_open_in_bible", meta)}
            className="rounded-full bg-[var(--bb-button,#2563eb)] px-5 py-2.5 text-sm font-black text-[var(--bb-button-text,#ffffff)] transition hover:brightness-95"
          >
            Open in Bible
          </Link>
          <button
            type="button"
            onClick={() => void handleBookmark()}
            aria-pressed={bookmarked}
            className={`rounded-full border px-4 py-2.5 text-sm font-black transition ${
              bookmarked
                ? "border-[var(--bb-accent,#2563eb)] bg-[var(--bb-accent-soft,#eaf2ff)] text-[var(--bb-accent,#2563eb)]"
                : "border-[var(--bb-card-border,#dbe7f4)] text-[var(--bb-text-secondary,#374151)] hover:brightness-95"
            }`}
          >
            {bookmarked ? "🔖 Bookmarked" : "🔖 Bookmark"}
          </button>
          <button
            type="button"
            onClick={() => void handleShare()}
            className="rounded-full border border-[var(--bb-card-border,#dbe7f4)] px-4 py-2.5 text-sm font-black text-[var(--bb-text-secondary,#374151)] transition hover:brightness-95"
          >
            {shareState === "copied" ? "✓ Link copied" : "↗ Share"}
          </button>
        </div>
      </div>
    </div>
  );
}
