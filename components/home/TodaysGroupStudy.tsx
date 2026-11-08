"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { useSupabaseUser } from "../../lib/useSupabaseUser";
import { BIBLE_BUDDY_USER_ID } from "../../lib/bibleBuddyAccount";
import { getActiveCommunityEvent, getCommunityEventState } from "../../lib/communityEvents";

/**
 * Today's Group Study.
 *
 * Its own component since 2026-10-18, because it has now been asked to sit in
 * three different places on the dashboard - under the shelf, above it, and
 * finally down by the games (Louis: "I want the group post to be at the
 * bottom above the trivia card"). Living inside the bookshelf meant it could
 * only ever be next to the bookshelf.
 *
 * It shows the group's reading for today, who has answered the discussion
 * question, and opens today's day of the study itself.
 *
 * THE BUTTON USED TO OPEN THE FEED (Louis, 2026-11-08: "join the discussion
 * button is totally wrong. It's sending people to the feed ... the main thing
 * should be leading to the day of the actual study guide plan, not some feed
 * with the second thing. It should go to the actual, the beginning of
 * everything, day one study guide page, so people can actually do it there.
 * And if they haven't started it yet, then they have to start it.")
 *
 * So it opens the study day. The discussion is not lost by doing that: the
 * day page carries the same thread the feed post does (GroupPostThread, via
 * lib/eventDiscussion), so the reader lands on the reading, the notes, the
 * question AND the answers instead of on the answers alone.
 */
export default function TodaysGroupStudy() {
  const { userId } = useSupabaseUser();
  const event = useMemo(() => getActiveCommunityEvent(), []);
  const eventState = useMemo(() => (event ? getCommunityEventState(event) : null), [event]);
  const communityDay = eventState?.phase === "live" ? eventState.communityDay : null;

  const [todayStrip, setTodayStrip] = useState<{
    studyTitle: string;
    reading: string;
    dayTitle: string;
  } | null>(null);

  const [discussion, setDiscussion] = useState<{
    postId: string;
    count: number;
    people: Array<{ user_id: string; display_name: string | null; username: string | null; profile_image_url: string | null }>;
  } | null>(null);

  /**
   * Where this reader is in the study, so the button says the true thing.
   *
   * "Start" when they have never opened a day of it, "Continue" once they
   * have, "Review" when today is already done. One small read of their own
   * rows; it is allowed to fail, and the button falls back to "Start", which
   * is the right word for somebody we know nothing about.
   */
  const [studyState, setStudyState] = useState<"start" | "continue" | "review">("start");

  // The group's reading for today.
  useEffect(() => {
    let cancelled = false;
    if (!event || !communityDay) {
      setTodayStrip(null);
      return;
    }
    void (async () => {
      const { data } = await supabase
        .from("devotional_days")
        .select("day_title,bible_reading_book,bible_reading_chapter")
        .eq("devotional_id", event.devotionalId)
        .eq("day_number", communityDay)
        .maybeSingle();
      if (cancelled || !data) return;
      const row = data as { day_title?: string | null; bible_reading_book?: string | null; bible_reading_chapter?: number | null };
      setTodayStrip({
        studyTitle: event.title,
        reading: `${row.bible_reading_book} ${row.bible_reading_chapter}`,
        dayTitle: row.day_title || "",
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [event, communityDay]);

  useEffect(() => {
    let cancelled = false;
    if (!userId || !event || !communityDay) {
      setStudyState("start");
      return;
    }
    void (async () => {
      const { data } = await supabase
        .from("devotional_progress")
        .select("day_number, is_completed")
        .eq("user_id", userId)
        .eq("devotional_id", event.devotionalId);
      if (cancelled) return;
      const rows = data || [];
      if (rows.length === 0) {
        setStudyState("start");
        return;
      }
      const today = rows.find((row) => Number(row.day_number) === communityDay);
      setStudyState(today?.is_completed ? "review" : "continue");
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, event, communityDay]);

  /**
   * Today's pinned post and the people who have answered it.
   *
   * Found the way the feed pins it - the Bible Buddy account, a "Day 18: ..."
   * headline, most recent first - so this card and that pin cannot disagree.
   */
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data: pinned } = await supabase
        .from("feed_posts")
        .select("id, content")
        .eq("user_id", BIBLE_BUDDY_USER_ID)
        .order("created_at", { ascending: false })
        .limit(12);

      const todaysPost = (pinned || []).find((post) =>
        /(?:^|·\s)Day \d+:\s/.test(String(post.content).split("\n", 1)[0] ?? ""),
      );
      if (cancelled || !todaysPost) return;

      const { data: answers } = await supabase
        .from("feed_post_comments")
        .select("user_id")
        .eq("post_id", todaysPost.id)
        .order("created_at", { ascending: false })
        .limit(200);

      const answerers = [...new Set((answers || []).map((row) => row.user_id))];
      const { data: faces } = answerers.length
        ? await supabase
            .from("profile_stats")
            .select("user_id, display_name, username, profile_image_url")
            .in("user_id", answerers.slice(0, 5))
        : { data: [] };

      if (!cancelled) {
        setDiscussion({ postId: todaysPost.id, count: answerers.length, people: faces || [] });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!todayStrip) return null;

  return (
        <section aria-labelledby="home-today-together-heading">
          {/* The lavender community look, the same family as From Your Groups
              further down the dashboard (Louis, 2026-10-17: the plain blue
              container "doesn't match the more polished components").
              bg-journey is the one illustrated background the dashboard was
              not using - a path over soft hills - so the two community cards
              are related without being the same picture twice.

              The text colours are fixed rather than themed, as on From Your
              Groups: the background is a fixed light illustration, so themed
              text would turn white on it in dark mode. */}
          <div
            className="relative overflow-hidden rounded-3xl border border-[#ddd6f3] p-4 shadow-sm sm:p-5"
            style={{
              backgroundColor: "#f5f2ff",
              backgroundImage: "url(/home-cards/bg-journey.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "left bottom",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* On a phone the button goes underneath, full width. Beside the
                text it left the heading about 150px to live in, which broke it
                across two lines (Louis, 2026-10-17). */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="min-w-0 flex-1">
                <h2
                  id="home-today-together-heading"
                  className="flex items-center gap-2 whitespace-nowrap text-base font-black text-[#2b2150] sm:text-xl"
                >
                  <span aria-hidden>👥</span>
                  Today&rsquo;s Group Study
                </h2>
                <p className="mt-1 text-sm font-black text-[#2b2150] sm:text-[15px]">
                  {todayStrip.reading}
                  {todayStrip.dayTitle ? <> &middot; {todayStrip.dayTitle}</> : null}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#6a5aa8] sm:text-sm">
                  Read, reflect, and join the discussion with others in the Bible Buddy community.
                </p>

                {/* Who has answered today, as faces.

                    Louis, 2026-10-18: "add the circle avatar option to Today's
                    Group Study to show what buddies have answered the
                    discussion question, and make sure the comments on this
                    match the comments on the feed's pinned daily devotional
                    post, like we had in the group."

                    They match by being the same thread: these are the people
                    who commented on today's pinned post, and the day page the
                    button opens shows that same thread. There is no second
                    discussion to keep in step, because there is no second
                    discussion. */}
                {discussion && discussion.people.length > 0 ? (
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="flex -space-x-2">
                      {discussion.people.slice(0, 5).map((person) => (
                        <span key={person.user_id} className="rounded-full ring-2 ring-[#f5f2ff]">
                          {person.profile_image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={person.profile_image_url}
                              alt=""
                              className="h-7 w-7 rounded-full object-cover"
                            />
                          ) : (
                            <span
                              aria-hidden
                              className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black text-white"
                              style={{ backgroundColor: "#6a5aa8" }}
                            >
                              {(person.display_name || person.username || "B")
                                .split(/\s+/)
                                .map((word) => word[0] || "")
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </span>
                          )}
                        </span>
                      ))}
                    </span>
                    <span className="text-xs font-black text-[#2b2150]">
                      {discussion.count === 1 ? "1 answer so far" : `${discussion.count} answers so far`}
                    </span>
                  </div>
                ) : null}
              </div>
              <Link
                /* The study itself, not the feed.
                   This is the URL the bookshelf uses to open a study
                   (components/home/YourBookshelf.tsx): the Devotionals tab
                   with this study open, its day list showing, today's day
                   marked CURRENT, and "Set as my reading plan" there for
                   somebody who has not started it.
                   NOT the two routes that look more direct:
                   /devotionals/<id>/day/<n> only serves the chapter-journey
                   studies and bounces everything else, The Beginning of
                   Everything included; /bible-studies/<id> and /devotionals/<id>
                   both redirect here anyway, so linking straight here saves a
                   hop.

                   &day=N opens today's day itself, not the day list. The
                   dashboard deletes that param from the URL on the way in -
                   in three separate places - so it reads it once from its own
                   snapshot and hands it to the study as a prop. Nothing here
                   depends on the param surviving. */
                href={`/plan?view=bible_studies&study=${encodeURIComponent(event?.devotionalId ?? "")}${
                  communityDay ? `&day=${communityDay}` : ""
                }`}
                /* Dark ink rather than the accent blue (Louis's mock-up,
                   2026-10-17). #2b2150 is not a new colour: it is the same
                   deep purple this card's own heading uses, and the one From
                   Your Groups uses, so the button sits inside the lavender
                   family instead of being the one loud thing on a pastel
                   card. Fixed, like the text above it, because the
                   illustrated background stays light in dark mode. */
                className="block shrink-0 rounded-full bg-[#2b2150] px-5 py-2.5 text-center text-sm font-black shadow-sm transition hover:bg-[#3a2d6b] sm:py-3"
                /* The colour is inline, not a utility class, because
                   globals.css carries an unlayered `a { color: inherit }`.
                   Tailwind v4 puts utilities in @layer utilities, and
                   unlayered CSS outranks any layer - so a colour class on an
                   anchor silently loses and the label inherits the card's
                   dark text. On this button that was black on near-black. */
                style={{ color: "#ffffff" }}
              >
                {studyState === "review"
                  ? `Review Day ${communityDay} →`
                  : studyState === "continue"
                    ? `Continue Day ${communityDay} →`
                    : `Start Day ${communityDay} →`}
              </Link>
            </div>
          </div>
        </section>
  );
}
