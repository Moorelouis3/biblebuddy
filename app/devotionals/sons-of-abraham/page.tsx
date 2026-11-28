import type { Metadata } from "next";
import StudyShareLandingPage, { type StudyShareLandingConfig } from "@/components/library/StudyShareLandingPage";

/**
 * The shareable link for The Sons of Abraham (2026-11-28), opening 1 January.
 * Same job and same shape as app/devotionals/obedience-of-abraham/page.tsx;
 * read that file's header for why canonical and og:image:secure_url are set.
 *
 * Everything here describes the BOOK: 21 days, Genesis 25 to 36. Day titles
 * and ranges are its own contents page.
 */

const url = "https://www.mybiblebuddy.net/devotionals/sons-of-abraham";
const image = "https://www.mybiblebuddy.net/og/sons-of-abraham.png";
const title = "The Sons of Abraham | A Free 21-Day Study of Genesis 25-36";
const description =
  "Twenty one days through Genesis 25 to 36. Abraham had eight sons, not two. Follow his family as it grows: Keturah's sons, Ishmael's princes, Isaac, Jacob and Esau. Free and written for beginners. Opens 1 January.";
const alt = "The Sons of Abraham — a free 21-day study of Genesis 25 to 36, from Bible Buddy";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: "Bible Buddy",
    type: "website",
    images: [{ url: image, width: 1200, height: 630, type: "image/png", alt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
  other: {
    "og:image:secure_url": image,
    "twitter:image:alt": alt,
    "fb:app_id": "1293695119276480",
  },
};

const DEVOTIONAL_ID = "17f72207-8693-4577-ac3f-80ddd806c0da";

const config: StudyShareLandingConfig = {
  study: "sons-of-abraham",
  pagePath: "/devotionals/sons-of-abraham",
  studyPath: `/devotionals/${DEVOTIONAL_ID}`,
  beforeOpenPath: "/events/sons-of-abraham",
  // Matches devotionals.available_from and the event's startDate.
  opensOn: "2027-01-01",
  title: "The Sons of Abraham",
  totalDays: 21,
  passageLabel: "Genesis 25–36",
  art: {
    // devotionals.cover_image: the front of the printed book.
    src: "/sons-of-abraham-cover.webp",
    width: 1024,
    height: 1536,
    alt: "The Sons of Abraham, a Bible Buddy study by Louis Moore III",
  },
  headline: ["Abraham had", "eight sons.", "Not two."],
  lead:
    "Ask most people how many sons Abraham had, and they will say two. The Bible names eight. Twenty one days through Genesis 25 to 36, following one family and the God who was faithful to every branch of it.",
  howItWorks: [
    {
      emoji: "📱",
      text: "It all happens inside Bible Buddy, on your phone or your computer. Nothing to print, nothing to post, nobody to meet.",
    },
    {
      emoji: "📅",
      text: "Twenty one days, one passage a day, from Genesis 25 to Genesis 36. Each day says how long its reading takes.",
    },
    {
      emoji: "🔓",
      text: "A new day opens each day from 1 to 21 January. Once a day is open it stays open.",
    },
    {
      emoji: "🔁",
      text: "Miss a few days and you pick up where you left off. There is no streak to break.",
    },
    {
      emoji: "📖",
      text: "You need no background. If you have never read Genesis, this is written for you first.",
    },
  ],
  dailySteps: [
    { emoji: "🎧", title: "Read or listen to the day", text: "What is happening in the passage, in plain language, with the older words explained." },
    { emoji: "📖", title: "Read the passage", text: "A short piece of Genesis, with what to watch for before you start." },
    { emoji: "🧠", title: "Take the trivia", text: "Five questions on what you just read." },
    { emoji: "💬", title: "Answer the question", text: "A reflection question, one thing to do that day, and a written prayer to close it." },
  ],
  coverage: {
    title: "What the 21 days cover",
    subtitle: "Genesis 25 to 36, in order",
    items: [
      {
        label: "Days 1–2 · The sons nobody remembers.",
        text: "Eight Sons and Twelve Princes: Keturah's six sons and the nation that came from Ishmael.",
      },
      {
        label: "Days 3–5 · Isaac's house.",
        text: "Two Nations, One Womb, Promise and Fear, and Room for Us: the twins, the birthright and the wells.",
      },
      {
        label: "Days 6–9 · The blessing.",
        text: "The Scheme, A Stolen Blessing, Esau Comes Home, and Jacob Leaves Home.",
      },
      {
        label: "Days 10–15 · Twenty years with Laban.",
        text: "The Ladder, At the Well, Seven Years, Leah Is Seen, The Mandrakes, and Speckled and Spotted.",
      },
      {
        label: "Days 16–19 · The road home.",
        text: "Time to Go Home, Laban Catches Up, Four Hundred Men, and A New Name.",
      },
      {
        label: "Days 20–21 · The whole family.",
        text: "Esau Becomes Edom, and Father of Many Nations: stepping back to count what God promised.",
      },
    ],
  },
  questions: [
    {
      question: "Do I need to have done The Obedience of Abraham first?",
      answer: "No. It picks up where that study ends, and Day 1 tells you what you need to know.",
    },
    {
      question: "Which Bible does it use?",
      answer: "Scripture is read in the King James Version, and the notes explain the older words as they come up.",
    },
    {
      question: "Do I have to keep up with everybody else?",
      answer: "No. A new day opens each day, and you can do it whenever suits you. Days you have missed stay open.",
    },
    {
      question: "Is it really free?",
      answer: "Yes. The whole study is free inside Bible Buddy.",
    },
  ],
  closing: {
    heading: "One family. A God who keeps His promises.",
    text: "God told Abraham he would be a father of many nations. These twenty one days are what that promise actually looked like.",
  },
};

export default function Page() {
  return <StudyShareLandingPage config={config} />;
}
