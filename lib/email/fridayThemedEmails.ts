import type { FridayLesson } from "./fridayTeachingSeriesContent";

/**
 * The four dated Friday emails (Louis, 2026-10-25).
 *
 * WHY THESE ARE NOT LESSONS 13-16.
 *
 * The twelve-lesson series is a per-person drip: your next lesson is the
 * first one email_campaign_sends has no row for. Two people who joined a
 * month apart are on different lessons on the same Friday, and somebody who
 * signs up on 24 December is on lesson 1 the next morning. So a Christmas
 * lesson at a fixed POSITION would reach most of the list in February and
 * nobody at all on Christmas Day. Position and date are different things,
 * and these four are date things.
 *
 * So they are ordinary scheduled campaigns instead: one row each, armed,
 * with a real scheduled_for, posted by /api/cron/email-campaign-send - the
 * same sender that has always handled dated broadcasts. That gives pacing,
 * duplicate protection, open and click stats, a real date in the dashboard
 * schedule and the /admin/campaigns editor, with no new sending code.
 *
 * The only thing the drip has to know is to STAND DOWN on these four
 * Fridays, so nobody gets two emails on Christmas morning. That is
 * THEMED_FRIDAY_DATES, read by /api/cron/friday-teaching. A stood-down
 * Friday costs nobody a lesson: they simply receive it the following week,
 * because position is derived from what somebody has received rather than
 * from a date.
 *
 * Each is written against a blog post published on 2026-10-25, and the CTA
 * is that post.
 */

/**
 * Same shape as a lesson, so renderFridayLessonHtml/Text render these too and
 * every Friday email looks identical in an inbox. `position` is required by
 * the type and means nothing here, so these are numbered from 101 to keep
 * them visibly out of the twelve.
 */
export type ThemedFriday = FridayLesson & {
  /** The Friday it goes out, Eastern. */
  sendDate: string;
  /** 8am Eastern on that date, as UTC. All four fall inside EST (UTC-5). */
  sendAtUtc: string;
};

export const THEMED_FRIDAYS: ThemedFriday[] = [
  {
    id: "friday-themed-thanksgiving-2026",
    position: 101,
    sendDate: "2026-11-20",
    sendAtUtc: "2026-11-20T13:00:00Z",
    subject: "In every thing. Not for every thing.",
    preheader: "Somebody is going to ask you what you are thankful for this week.",
    bullet: "\u{1F64F}",
    blocks: [
      { type: "h1", text: "In Every Thing. Not For Every Thing." },
      { type: "p", html: "Hey {{first_name}}" },
      { type: "p", html: "Next Thursday somebody is going to go round the table and ask what you are thankful for." },
      { type: "p", html: "If this year has been heavy, that question is harder than it sounds. You either say something you do not mean, or you say nothing and everybody notices." },
      { type: "h3", text: "The verse is more careful than we are" },
      { type: "p", html: "1 Thessalonians 5:18 is the one people quote at you. <strong>&ldquo;In every thing give thanks.&rdquo;</strong>" },
      { type: "p", html: "Read it again. It says <strong>in</strong> every thing. Not <strong>for</strong> every thing." },
      { type: "p", html: "Nobody in Scripture is ever asked to be grateful for the bad thing itself. They are asked to keep speaking to God from inside it. Those are not the same instruction, and the difference is the whole weight of the verse." },
      { type: "h3", text: "Look at who actually did it" },
      { type: "ul", items: [
        "Paul wrote his most joyful letter from a prison cell",
        "Psalm 13 accuses God of forgetting, then sings six verses later",
        "Habakkuk lists an empty farm and a failed harvest, then says one word: <strong>yet</strong>",
      ] },
      { type: "p", html: "Not one of them counted their blessings. Every one of them complained first and thanked second, in the same prayer, without pretending the first part had not happened." },
      { type: "p", html: "That pattern is permission. You are allowed to bring God the hard year and the thanks together." },
      { type: "h3", text: "Something to carry to the table" },
      { type: "p", html: "You do not need a list. You need one true thing - one that would still be true if the year had gone worse." },
      { type: "p", html: "I wrote the long version of this out: what the Psalms actually do, what to say when somebody asks, and whether it is a sin not to feel thankful." },
      { type: "cta", label: "Read: gratitude when the year has been hard", url: "https://www.mybiblebuddy.net/blog/thanksgiving-when-the-year-has-been-hard" },
      { type: "p", html: "Whatever next week looks like for you, I hope there is one true thing in it." },
    ],
  },
  {
    id: "friday-themed-first-christmas-2026",
    position: 102,
    sendDate: "2026-12-18",
    sendAtUtc: "2026-12-18T13:00:00Z",
    subject: "The card on your shelf is lying to you",
    preheader: "Luke never says stable. He says manger, and no room.",
    bullet: "\u{1F4D6}",
    blocks: [
      { type: "h1", text: "The Card On Your Shelf Is Lying To You" },
      { type: "p", html: "Hey {{first_name}}" },
      { type: "p", html: "Not on purpose. But it is." },
      { type: "p", html: "Most of what we picture at Christmas came from carols and paintings rather than from the text. The real account is better than the tidy one, precisely because it is so much less tidy." },
      { type: "h3", text: "Three things the Bible does not say" },
      { type: "ul", items: [
        "It never says <strong>stable</strong>. Luke says a manger, and no room",
        "It never says the wise men were at the birth, or that there were three of them",
        "It never says anybody was ready",
      ] },
      { type: "p", html: "What it does say is that Joseph had already decided how to end the engagement quietly, and that a census nobody asked for moved a heavily pregnant girl eighty miles at the worst possible moment." },
      { type: "h3", text: "Who got told first" },
      { type: "p", html: "The announcement did not go to the temple or the palace. It went to men working the night shift in a field." },
      { type: "p", html: "People with no standing, no preparation and nothing to offer, who happened to be awake. Then the glory ended and they went back to work." },
      { type: "p", html: "<strong>God arrived before the room was ready.</strong> That is the whole story, and it is the part the card leaves out." },
      { type: "h3", text: "Read it as it is written" },
      { type: "p", html: "This is a good week to open Luke 2 and Matthew 1 and read them side by side - two gospels telling two halves of one night." },
      { type: "p", html: "If a name or a place stops you, tap it in the Bible Buddy reader and the explanation is right there underneath the verse." },
      { type: "cta", label: "Read: what the first Christmas actually looked like", url: "https://www.mybiblebuddy.net/blog/what-the-first-christmas-actually-looked-like" },
    ],
  },
  {
    id: "friday-themed-christmas-day-2026",
    position: 103,
    sendDate: "2026-12-25",
    sendAtUtc: "2026-12-25T13:00:00Z",
    subject: "Born unto you, this day",
    preheader: "Short one. There are people in the house.",
    bullet: "\u{1F64F}",
    blocks: [
      { type: "h1", text: "Born Unto You, This Day" },
      { type: "p", html: "Hey {{first_name}}" },
      { type: "p", html: "You are reading this on a phone and there are people in the house. So this is short." },
      { type: "p", html: "The first Christmas sermon was four sentences long, preached to shepherds in a field. Three phrases in it are worth carrying into today." },
      { type: "h3", text: "&ldquo;Fear not&rdquo;" },
      { type: "p", html: "It came <strong>before</strong> the good news, not after it. Whatever you are walking into today, that is the order: the fear gets addressed first." },
      { type: "h3", text: "&ldquo;This day&rdquo;" },
      { type: "p", html: "A promise centuries old turned into a date on a calendar. Not someday. That day." },
      { type: "h3", text: "&ldquo;Unto you&rdquo;" },
      { type: "p", html: "Not unto the qualified, or the festive, or the people who feel it. Unto you - said first to men who were working outside in the dark with nothing to bring." },
      { type: "p", html: "You do not have to feel anything in particular today for it to be true." },
      { type: "cta", label: "Read the Christmas Day reading", url: "https://www.mybiblebuddy.net/blog/christmas-day-one-thing-to-carry" },
      { type: "p", html: "Merry Christmas, {{first_name}}. Go and be with your people." },
    ],
  },
  {
    id: "friday-themed-new-year-2027",
    position: 104,
    sendDate: "2027-01-01",
    sendAtUtc: "2027-01-01T13:00:00Z",
    subject: "Most reading plans die in February",
    preheader: "Not from a lack of discipline. Here is what actually kills them.",
    bullet: "\u{1F4D6}",
    blocks: [
      { type: "h1", text: "Most Reading Plans Die In February" },
      { type: "p", html: "Hey {{first_name}}" },
      { type: "p", html: "Today a lot of people will start reading the Bible in a year. Genesis is great. Exodus holds up. Then February arrives and the bookmark stops moving." },
      { type: "p", html: "It is almost never a discipline problem. It is two other things, and both can be settled today, before they happen." },
      { type: "h3", text: "1. Decide now what a missed day means" },
      { type: "p", html: "It means nothing. <strong>A missed day is not a debt.</strong> Nobody is counting, and there is no catching up to do." },
      { type: "p", html: "What kills a year is trying to read four days at once, hating it, and stopping. The move that actually works is to open today and read today. Starting again on day nine is not failure - it is the only thing that has ever worked." },
      { type: "h3", text: "2. Have something to do with the hard chapters" },
      { type: "p", html: "Leviticus is where plans go to die. Not because it is boring, but because people cannot see what it is doing. Once you can, you get through it." },
      { type: "p", html: "That is the whole reason the explanations exist in our reader. When a chapter stops making sense you do not have to push past it and hope." },
      { type: "h3", text: "If you would rather the plan was already built" },
      { type: "p", html: "Bible in One Year inside Bible Buddy gives you each day's reading with the explanation beside it, and the day's audio if you would rather listen on the way to work." },
      { type: "ul", items: [
        "Attach it to a time you already own",
        "Read for the story, not for the streak",
        "Carry one question through all 66 books",
      ] },
      { type: "cta", label: "Read: how to read the Bible in a year without quitting", url: "https://www.mybiblebuddy.net/blog/how-to-read-the-bible-in-a-year-without-quitting" },
      { type: "p", html: "Happy new year, {{first_name}}. See you in Genesis 1." },
    ],
  },
];

/** The Fridays the twelve-lesson drip stands down on. */
export const THEMED_FRIDAY_DATES = new Set(THEMED_FRIDAYS.map((t) => t.sendDate));

export function themedFridayOn(date: string): ThemedFriday | undefined {
  return THEMED_FRIDAYS.find((t) => t.sendDate === date);
}
