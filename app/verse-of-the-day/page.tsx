"use client";
import React from "react";
import Link from "next/link";
import VerseDetail from "../../components/VerseDetail";
import { LouisAvatar } from "../../components/LouisAvatar";

// These must match the arrays in DashboardDailyWelcomeModal
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

export default function VerseOfTheDayPage() {
  const today = new Date();
  const dayOfYear = getDayOfYear(today);
  const verseIdx = dayOfYear % VERSE_OF_THE_DAY.length;
  const verse = VERSE_OF_THE_DAY[verseIdx];
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-8 px-2">
      <div className="flex flex-col items-center mb-2">
        <LouisAvatar mood="bible" size={72} />
      </div>
      <VerseDetail text={verse.text} reference={verse.reference} subtitle={verse.subtitle} />
      <Link
        href="/dashboard"
        className="mt-8 px-6 py-3 rounded-2xl text-base font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
