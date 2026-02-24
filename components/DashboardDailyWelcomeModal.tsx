"use client";
import React from "react";
import { useRouter } from "next/navigation";

// Use the same Louis avatar as CreditEducationModal
const LOUIS_AVATAR_SRC = "/louis/louis-bible.png";

import { logActionToMasterActions } from "../lib/actionRecorder";

export type DashboardDailyWelcomeModalProps = {
  open: boolean;
  onClose: () => void;
  isReturningUser: boolean;
  lastAction?: { action_type: string; action_label: string } | null;
  recommendation?: string | null;
  userId?: string | null;
};

// No longer needed: actionTypeDisplay

// Daily rotating intros and verses
const LOUIS_INTROS = [
  "Hey — it’s Louis. Here’s something for you today.",
  "I’m glad you’re back. Let’s start with this.",
  "Before you dive in, read this with me.",
  "I picked this verse for today.",
  "Let’s begin with something grounding.",
  "Take a breath. Start here.",
  "Here’s today’s reminder.",
  "This stood out for today.",
  "Let’s open with truth.",
  "Start your study here.",
  "A quick word before you begin.",
  "I think this will speak to you today.",
  "Let this guide your reading.",
  "Here’s something steady for today.",
  "Begin here.",
  "This is worth sitting with.",
  "Let’s focus your heart first.",
  "Before anything else, read this.",
  "Something simple, but powerful.",
  "Keep this in mind today.",
  "Read this slowly.",
  "Let this shape your study today.",
  "A strong place to begin.",
  "This verse matters.",
  "Let this anchor you.",
  "Start here, then build.",
  "A reminder for your journey.",
  "Pause and read this.",
  "Let this settle in.",
  "Here’s your verse for today."
];

const VERSE_OF_THE_DAY = [
  { text: "Your word is a lamp to my feet and a light to my path.", reference: "Psalm 119:105", subtitle: "God’s Word guides one step at a time." },
  { text: "The unfolding of Your words gives light; it gives understanding to the simple.", reference: "Psalm 119:130", subtitle: "Understanding begins when Scripture opens." },
  { text: "Blessed is the one whose delight is in the law of the Lord.", reference: "Psalm 1:1–2", subtitle: "Joy grows where Scripture is loved." },
  { text: "All Scripture is breathed out by God and profitable for teaching.", reference: "2 Timothy 3:16", subtitle: "Every page has purpose." },
  { text: "Be doers of the word, and not hearers only.", reference: "James 1:22", subtitle: "Study transforms when it becomes action." },
  { text: "Let the word of Christ dwell in you richly.", reference: "Colossians 3:16", subtitle: "Scripture was meant to live in you." },
  { text: "I have stored up Your word in my heart.", reference: "Psalm 119:11", subtitle: "What you store shapes who you become." },
  { text: "The words that I have spoken to you are spirit and life.", reference: "John 6:63", subtitle: "God’s Word carries life itself." },
  { text: "Faith comes from hearing, and hearing through the word of Christ.", reference: "Romans 10:17", subtitle: "Faith grows through exposure to truth." },
  { text: "Open my eyes, that I may behold wondrous things out of Your law.", reference: "Psalm 119:18", subtitle: "Ask God to help you see more." },
  { text: "The law of the Lord is perfect, reviving the soul.", reference: "Psalm 19:7", subtitle: "Scripture refreshes the weary heart." },
  { text: "Man shall not live by bread alone, but by every word that comes from the mouth of God.", reference: "Matthew 4:4", subtitle: "Spiritual hunger needs spiritual food." },
  { text: "Sanctify them in the truth; Your word is truth.", reference: "John 17:17", subtitle: "Truth shapes identity." },
  { text: "Teach me, O Lord, the way of Your statutes.", reference: "Psalm 119:33", subtitle: "Study begins with humility." },
  { text: "These words that I command you today shall be on your heart.", reference: "Deuteronomy 6:6", subtitle: "Scripture belongs in everyday life." },
  { text: "Ezra had set his heart to study the Law of the Lord.", reference: "Ezra 7:10", subtitle: "Intentional study changes generations." },
  { text: "Your testimonies are my delight; they are my counselors.", reference: "Psalm 119:24", subtitle: "The Bible gives wisdom for decisions." },
  { text: "The entrance of Your words gives light.", reference: "Psalm 119:130", subtitle: "Darkness fades where Scripture enters." },
  { text: "Incline my heart to Your testimonies.", reference: "Psalm 119:36", subtitle: "Ask God to shape your desires." },
  { text: "Continue in what you have learned.", reference: "2 Timothy 3:14", subtitle: "Growth comes from consistency." },
  { text: "Let us know; let us press on to know the Lord.", reference: "Hosea 6:3", subtitle: "Keep pressing forward." },
  { text: "The fear of the Lord is the beginning of wisdom.", reference: "Proverbs 9:10", subtitle: "Wisdom begins with reverence." },
  { text: "Search the Scriptures.", reference: "John 5:39", subtitle: "Seek, don’t skim." },
  { text: "Great peace have those who love Your law.", reference: "Psalm 119:165", subtitle: "Scripture brings stability." },
  { text: "The testimony of the Lord is sure, making wise the simple.", reference: "Psalm 19:7", subtitle: "Wisdom is available to everyone." },
  { text: "Blessed rather are those who hear the word of God and keep it.", reference: "Luke 11:28", subtitle: "Hearing is the beginning, not the end." },
  { text: "Your word is very pure.", reference: "Psalm 119:140", subtitle: "God’s Word stands uncorrupted." },
  { text: "Meditate on it day and night.", reference: "Joshua 1:8", subtitle: "Depth comes from reflection." },
  { text: "The unfolding of Your words gives understanding.", reference: "Psalm 119:130", subtitle: "Understanding unfolds over time." },
  { text: "Teach me Your way, O Lord.", reference: "Psalm 27:11", subtitle: "Learning is a lifelong journey." }
];

function getDayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export default function DashboardDailyWelcomeModal({ open, onClose, userId }: DashboardDailyWelcomeModalProps) {
  const router = useRouter();

  // Helper to handle both actions
  const handleAcknowledge = async (navigateToVerse?: boolean) => {
    if (navigateToVerse && userId) {
      await logActionToMasterActions(userId, "understand_verse_of_the_day");
    }
    await onClose();
    if (navigateToVerse) {
      router.push("/verse-of-the-day");
    }
  };

  if (!open) return null;

  // Developer override: force Psalm 119:105 as the verse of the day if localStorage.BB_FORCE_VERSE is set
  let verse = null;
  let intro = null;
  if (typeof window !== "undefined" && window.localStorage && window.localStorage.getItem("BB_FORCE_VERSE") === "1") {
    verse = VERSE_OF_THE_DAY.find(v => v.reference === "Psalm 119:105");
    intro = "[DEV MODE] Forced verse for testing.";
  } else {
    const today = new Date();
    const dayOfYear = getDayOfYear(today);
    const introIdx = dayOfYear % LOUIS_INTROS.length;
    const verseIdx = dayOfYear % VERSE_OF_THE_DAY.length;
    intro = LOUIS_INTROS[introIdx];
    verse = VERSE_OF_THE_DAY[verseIdx];
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-50 bg-opacity-90 px-3 py-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl bg-blue-100 border border-blue-200 shadow-2xl p-6 sm:p-8 my-8 flex flex-col items-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-blue-400 hover:text-blue-700 text-xl"
        >
          ✕
        </button>
        <img src={LOUIS_AVATAR_SRC} alt="Louis avatar" width={72} height={72} className="rounded-full select-none mx-auto mb-4 shadow-lg border border-blue-200 bg-white" />
        <div className="mb-4 text-base text-blue-900 text-center font-medium">{intro}</div>
        {verse ? (
          <>
            <div className="mb-2 text-lg font-bold italic text-center text-blue-900">“{verse.text}”</div>
            <div className="mb-1 text-sm text-center text-blue-700">{verse.reference}</div>
            <div className="mb-6 text-xs text-blue-400 text-center">{verse.subtitle}</div>
          </>
        ) : null}
        <div className="w-full mt-2 flex flex-col items-center">
          <button
            onClick={() => handleAcknowledge(true)}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition w-full text-center"
          >
            Understand This Verse
          </button>
          <button
            onClick={() => handleAcknowledge(false)}
            className="mt-3 text-sm text-blue-600 hover:underline bg-transparent border-none p-0"
            style={{ background: "none", border: "none" }}
          >
            Skip Today’s Verse
          </button>
        </div>
      </div>
    </div>
  );
}
