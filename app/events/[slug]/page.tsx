"use client";

export const dynamic = "force-dynamic";

/**
 * The community event page - sign-up and information for The Wisdom of
 * Proverbs, and any community devotional after it. Driven by
 * lib/communityEvents.ts so the next event is a config entry.
 *
 * The community grid reuses the devotional's own participant system:
 * profile_stats for photo + name, the same initials fallback, the same
 * /profile links. Only real enrollees appear and only real counts show -
 * nothing is invented while loading or on failure.
 */

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useSupabaseUser } from "../../../lib/useSupabaseUser";
import { recordNewUser } from "../../../lib/guestSession";
import { getCommunityEvent, getCommunityEventState } from "../../../lib/communityEvents";

const GRID_PAGE_SIZE = 24;

type Participant = {
  user_id: string;
  display_name: string;
  profile_image_url: string | null;
};

function track(eventName: string, metadata: Record<string, unknown> = {}) {
  try {
    void fetch("/api/landing-analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: eventName,
        page_path: `${window.location.pathname}${window.location.search}`,
        referrer: document.referrer || null,
        metadata,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* analytics never blocks the page */
  }
}

function firstName(name: string) {
  return (name || "Buddy").trim().split(/\s+/)[0];
}

export default function CommunityEventPage() {
  const params = useParams();
  const router = useRouter();
  const slug = String(params.slug || "");
  const event = getCommunityEvent(slug);
  const { userId, loading: authLoading } = useSupabaseUser();

  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);
  const [justJoined, setJustJoined] = useState(false);
  const [reminders, setReminders] = useState(false);
  const [howOpen, setHowOpen] = useState(false);

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [totalMembers, setTotalMembers] = useState<number | null>(null);
  const [membersLoading, setMembersLoading] = useState(true);
  const [membersFailed, setMembersFailed] = useState(false);


  const state = useMemo(() => (event ? getCommunityEventState(event) : null), [event]);

  useEffect(() => {
    if (event) track("community_event_page_view", { event: event.slug });
  }, [event]);

  const loadMembers = useCallback(
    async (offset: number) => {
      if (!event) return;
      setMembersLoading(true);
      setMembersFailed(false);
      try {
        const { count } = await supabase
          .from("community_event_members")
          .select("*", { count: "exact", head: true })
          .eq("event_slug", event.slug);
        if (typeof count === "number") setTotalMembers(count);

        const { data: memberRows, error } = await supabase
          .from("community_event_members")
          .select("user_id")
          .eq("event_slug", event.slug)
          .order("joined_at", { ascending: true })
          .range(offset, offset + GRID_PAGE_SIZE - 1);
        if (error) throw error;

        const ids = (memberRows || []).map((row: { user_id: string }) => row.user_id);
        if (!ids.length) {
          setMembersLoading(false);
          return;
        }

        // Same profile source, fallback and privacy surface as the devotional
        // "Buddies who started this devotional" section.
        const { data: profiles } = await supabase
          .from("profile_stats")
          .select("user_id, display_name, username, profile_image_url")
          .in("user_id", ids);

        const byId = new Map(
          (profiles || []).map((row: any) => [
            row.user_id,
            {
              user_id: row.user_id,
              display_name: row.display_name || row.username || "Bible Buddy",
              profile_image_url: row.profile_image_url || null,
            },
          ]),
        );
        const page = ids.map(
          (id) => byId.get(id) || { user_id: id, display_name: "Bible Buddy", profile_image_url: null },
        );
        setParticipants((current) => {
          const seen = new Set(current.map((p) => p.user_id));
          return [...current, ...page.filter((p) => !seen.has(p.user_id))];
        });
      } catch {
        setMembersFailed(true);
      } finally {
        setMembersLoading(false);
      }
    },
    [event],
  );

  useEffect(() => {
    void loadMembers(0);
  }, [loadMembers]);

  useEffect(() => {
    if (!event || !userId) return;
    void (async () => {
      try {
        const memberResult = await supabase
          .from("community_event_members")
          .select("reminders")
          .eq("event_slug", event.slug)
          .eq("user_id", userId)
          .maybeSingle();

        if (memberResult.data) {
          setJoined(true);
          setReminders(Boolean((memberResult.data as { reminders?: boolean }).reminders));
        }
      } catch {
        /* each section degrades on its own */
      }
    })();
  }, [event, userId]);

  if (!event) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-sm font-black text-[var(--bb-text-secondary,#4b5563)]">
        This event does not exist.
      </div>
    );
  }


  // One enrollment action for both buttons, as specified.
  async function join() {
    if (!event || joining || joined) return;
    track("community_event_join_click", { event: event.slug });
    if (!userId) {
      router.push(`/login?next=${encodeURIComponent(`/events/${event.slug}`)}`);
      return;
    }
    setJoining(true);
    try {
      const { error } = await supabase
        .from("community_event_members")
        .upsert(
          { event_slug: event.slug, user_id: userId, reminders },
          { onConflict: "event_slug,user_id", ignoreDuplicates: true },
        );
      if (!error) {
        setJoined(true);
        setJustJoined(true);
        setTotalMembers((count) => (count === null ? 1 : count + 1));
        track("community_event_joined", { event: event.slug });
        if (reminders) track("community_event_reminder_optin", { event: event.slug });
        recordNewUser(userId, `community_event_${event.slug}`);
        // Straight into the grid with their own photo and first name.
        try {
          const { data: me } = await supabase
            .from("profile_stats")
            .select("user_id, display_name, username, profile_image_url")
            .eq("user_id", userId)
            .maybeSingle();
          setParticipants((current) =>
            current.some((p) => p.user_id === userId)
              ? current
              : [
                  ...current,
                  {
                    user_id: userId,
                    display_name: (me as any)?.display_name || (me as any)?.username || "Bible Buddy",
                    profile_image_url: (me as any)?.profile_image_url || null,
                  },
                ],
          );
        } catch {
          /* the grid refreshes on next load either way */
        }
      }
    } finally {
      setJoining(false);
    }
  }

  async function toggleReminders(on: boolean) {
    setReminders(on);
    if (!event || !userId || !joined) return;
    await supabase
      .from("community_event_members")
      .update({ reminders: on })
      .eq("event_slug", event.slug)
      .eq("user_id", userId);
    if (on) track("community_event_reminder_optin", { event: event.slug });
  }


  const joinLabel = joining ? "JOINING…" : "JOIN THE 31-DAY STUDY";

  const remaining = totalMembers !== null ? Math.max(0, totalMembers - participants.length) : 0;

  // Once someone is in, the buttons disappear - this is a sign-up page for a
  // study that is still being built, so there is nothing to view yet.
  const joinButton = joined ? null : (
    <button
      type="button"
      onClick={() => void join()}
      disabled={joining || authLoading}
      className="min-h-12 w-full rounded-xl px-5 text-sm font-black tracking-wide text-[#221503] transition hover:brightness-95 disabled:opacity-70"
      style={{ background: "linear-gradient(180deg, #f0d489 0%, #cfa147 100%)" }}
    >
      {joinLabel}
    </button>
  );

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 pb-28 pt-4">
      <header
        className="overflow-hidden rounded-[28px] border border-[#3a2c14] p-6 text-center"
        style={{
          background: `linear-gradient(100deg, #0c0804 0%, #17100a 55%, rgba(23,16,10,0.65) 100%), url(${event.bannerArt}) right top / auto 100% no-repeat`,
        }}
      >
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#bfa877]">October 1–31</p>
        <h1 className="mt-2 text-3xl font-black leading-tight" style={{ color: "#e8c877" }}>
          {event.title}
        </h1>
        <p className="mt-1 text-sm font-bold text-[#f4ecdd]">{event.subtitle}</p>
        {state?.phase === "countdown" ? (
          <p className="mt-3 inline-block rounded-full border border-[#8a6b2f] px-4 py-1.5 text-xs font-black tracking-widest text-[#e8c877]">
            {state.daysToGo} DAY{state.daysToGo === 1 ? "" : "S"} TO GO
          </p>
        ) : state?.phase === "live" ? (
          <p className="mt-3 inline-block rounded-full border border-[#8a6b2f] px-4 py-1.5 text-xs font-black tracking-widest text-[#e8c877]">
            DAY {state.communityDay} OF {event.totalDays}
          </p>
        ) : null}
      </header>

      <p className="text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
        Study all 31 chapters of Proverbs alongside Bible Buddies around the world. A new day becomes available
        every day throughout October. You do not have to join at a particular time. Complete each day whenever it
        fits your schedule, then meet the community in the daily discussion.
      </p>

      {joined ? (
        <div className="rounded-2xl border border-[#cfe5cf] bg-[#eefaf0] p-4 text-center">
          <p className="text-base font-black text-[#14532d]">Welcome — you&apos;re signed up! 🎉</p>
          <p className="mt-1 text-sm font-semibold text-[#3f6212]">
            The journey begins October 1. We&apos;ll let you know when Day 1 is ready.
          </p>
        </div>
      ) : null}

      {joinButton}

      {/* How it works, folded into one compact accordion. */}
      <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)]">
        <button
          type="button"
          onClick={() => setHowOpen((open) => !open)}
          aria-expanded={howOpen}
          className="flex min-h-12 w-full items-center justify-between gap-3 px-5 py-3.5 text-left"
        >
          <span className="text-sm font-black tracking-wide text-[var(--bb-text-primary,#111827)]">
            HOW DOES THE COMMUNITY STUDY WORK?
          </span>
          <span
            aria-hidden="true"
            className={`text-[var(--bb-text-muted,#6b7280)] transition-transform ${howOpen ? "rotate-180" : ""}`}
          >
            ⌄
          </span>
        </button>
        {howOpen ? (
          <div className="border-t border-[var(--bb-card-border,#dbe7f4)] px-5 py-4">
            <p className="text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#4b5563)]">
              A new devotional unlocks each day. Read or listen, read the matching chapter of Proverbs, take the
              trivia, and answer the daily discussion question—whenever you have time.
            </p>
            <p className="mt-3 text-sm font-black leading-6 text-[var(--bb-text-primary,#111827)]">
              We study the same chapter each day and meet in the discussion afterward.
            </p>
          </div>
        ) : null}
      </div>

      {/* The community: the real people who joined this event. */}
      <section className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Community</p>
        <h2 className="mt-1 text-lg font-black text-[var(--bb-text-primary,#111827)]">JOIN THESE BIBLE BUDDIES</h2>
        {totalMembers !== null && totalMembers > 0 ? (
          <p className="mt-1 text-sm font-semibold text-[var(--bb-text-secondary,#4b5563)]">
            {totalMembers} Bible {totalMembers === 1 ? "Buddy has" : "Buddies have"} already signed up to study Proverbs together.
          </p>
        ) : null}

        {membersFailed ? (
          <div className="mt-4 text-center">
            <p className="text-sm font-bold text-[var(--bb-text-secondary,#4b5563)]">
              The community list could not load.
            </p>
            <button
              type="button"
              onClick={() => void loadMembers(participants.length)}
              className="mt-2 rounded-xl border border-[var(--bb-card-border,#dbe7f4)] px-4 py-2 text-sm font-black text-[var(--bb-text-primary,#111827)]"
            >
              Try again
            </button>
          </div>
        ) : membersLoading && participants.length === 0 ? (
          <div className="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
            {Array.from({ length: 16 }, (_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="h-14 w-14 animate-pulse rounded-full bg-[var(--bb-surface-soft,#eef2f7)]" />
                <div className="h-3 w-10 animate-pulse rounded bg-[var(--bb-surface-soft,#eef2f7)]" />
              </div>
            ))}
          </div>
        ) : participants.length === 0 ? (
          <p className="mt-4 text-center text-sm font-bold text-[var(--bb-text-secondary,#4b5563)]">
            Be the first Bible Buddy to join the journey.
          </p>
        ) : (
          <>
            <div className="mt-4 grid grid-cols-4 gap-x-2 gap-y-4 sm:grid-cols-6 md:grid-cols-8">
              {participants.map((buddy) => (
                <Link
                  key={buddy.user_id}
                  href={`/profile/${buddy.user_id}`}
                  className="flex min-w-0 flex-col items-center gap-1.5"
                  title={buddy.display_name}
                >
                  <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#eef4f8)] text-sm font-black text-[var(--bb-text-primary,#111827)]">
                    {buddy.profile_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={buddy.profile_image_url}
                        alt={buddy.display_name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      buddy.display_name.slice(0, 1).toUpperCase()
                    )}
                  </span>
                  <span className="w-full truncate text-center text-xs font-bold text-[var(--bb-text-primary,#111827)]">
                    {firstName(buddy.display_name)}
                  </span>
                </Link>
              ))}
            </div>
            {remaining > 0 ? (
              <button
                type="button"
                onClick={() => void loadMembers(participants.length)}
                disabled={membersLoading}
                className="mt-4 w-full text-center text-sm font-black text-[var(--bb-accent,#2f7fe8)] disabled:opacity-60"
              >
                {membersLoading ? "Loading…" : `+${remaining} more Bible Buddies`}
              </button>
            ) : null}
          </>
        )}

        {joinButton ? <div className="mt-5">{joinButton}</div> : null}
        <label className="mt-3 flex items-center justify-center gap-2">
          <input
            type="checkbox"
            checked={reminders}
            onChange={(e) => void toggleReminders(e.target.checked)}
            className="h-4 w-4 accent-[#cfa147]"
          />
          <span className="text-sm font-bold text-[var(--bb-text-primary,#111827)]">
            Remind me when each new day unlocks
          </span>
        </label>
        <p className="mt-2 text-center text-xs font-semibold text-[var(--bb-text-muted,#6b7280)]">
          Free inside Bible Buddy · October 1–31
        </p>
      </section>

      {/* Book and journal promo: built, hidden until a real link exists. */}
      {event.bookUrl ? (
        <section className="rounded-2xl border border-[#3a2c14] p-5" style={{ background: "#17100a" }}>
          <h2 className="text-lg font-black" style={{ color: "#e8c877" }}>
            Continue Your Journey Beyond the App
          </h2>
          <p className="mt-1 text-sm font-semibold text-[#f4ecdd]">
            Bring The Wisdom of Proverbs into your personal study time with the hardcover devotional and companion
            journal.
          </p>
          <a
            href={event.bookUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("community_event_book_click", { event: event.slug })}
            className="mt-3 inline-block rounded-xl px-5 py-2.5 text-sm font-black text-[#221503]"
            style={{ background: "linear-gradient(180deg, #f0d489 0%, #cfa147 100%)" }}
          >
            GET THE HARDCOVER
          </a>
        </section>
      ) : null}
    </div>
  );
}
