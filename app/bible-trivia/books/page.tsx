"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";

const BOOK_CARDS = [
  {
    key: "genesis",
    title: "Genesis",
    href: "/bible-trivia/genesis",
    icon: "📚",
    cardClass:
      "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200",
  },
  {
    key: "exodus",
    title: "Exodus",
    href: "/bible-trivia/exodus",
    icon: "🔥",
    cardClass:
      "bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200",
  },
  {
    key: "leviticus",
    title: "Leviticus",
    href: "/bible-trivia/leviticus",
    icon: "🌿",
    cardClass:
      "bg-gradient-to-br from-lime-50 to-green-50 border-2 border-lime-200",
  },
  {
    key: "numbers",
    title: "Numbers",
    href: "/bible-trivia/numbers",
    icon: "🔢",
    cardClass:
      "bg-gradient-to-br from-yellow-50 to-amber-100 border-2 border-yellow-200",
  },
  {
    key: "deuteronomy",
    title: "Deuteronomy",
    href: "/bible-trivia/deuteronomy",
    icon: "📜",
    cardClass:
      "bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200",
  },
  {
    key: "joshua",
    title: "Joshua",
    href: "/bible-trivia/joshua",
    icon: "⚔️",
    cardClass:
      "bg-gradient-to-br from-cyan-50 to-blue-100 border-2 border-cyan-200",
  },
  {
    key: "judges",
    title: "Judges",
    href: "/bible-trivia/judges",
    icon: "⚖️",
    cardClass:
      "bg-gradient-to-br from-purple-50 to-violet-100 border-2 border-purple-200",
  },
  {
    key: "ruth",
    title: "Ruth",
    href: "/bible-trivia/ruth",
    icon: "🌾",
    cardClass:
      "bg-gradient-to-br from-pink-50 to-yellow-100 border-2 border-pink-200",
  },
  {
    key: "1samuel",
    title: "1 Samuel",
    href: "/bible-trivia/1-samuel",
    icon: "🪖",
    cardClass:
      "bg-gradient-to-br from-slate-50 to-gray-100 border-2 border-slate-200",
  },
  {
    key: "2samuel",
    title: "2 Samuel",
    href: "/bible-trivia/2-samuel",
    icon: "🛡️",
    cardClass:
      "bg-gradient-to-br from-gray-50 to-zinc-100 border-2 border-gray-200",
  },
  {
    key: "1kings",
    title: "1 Kings",
    href: "/bible-trivia/1-kings",
    icon: "👑",
    cardClass:
      "bg-gradient-to-br from-yellow-50 to-amber-100 border-2 border-yellow-200",
  },
  {
    key: "2kings",
    title: "2 Kings",
    href: "/bible-trivia/2-kings",
    icon: "🏰",
    cardClass:
      "bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-200",
  },
  {
    key: "1chronicles",
    title: "1 Chronicles",
    href: "/bible-trivia/1-chronicles",
    icon: "📖",
    cardClass:
      "bg-gradient-to-br from-emerald-50 to-teal-100 border-2 border-emerald-200",
  },
  {
    key: "2chronicles",
    title: "2 Chronicles",
    href: "/bible-trivia/2-chronicles",
    icon: "📜",
    cardClass:
      "bg-gradient-to-br from-teal-50 to-cyan-100 border-2 border-teal-200",
  },
  {
    key: "ezra",
    title: "Ezra",
    href: "/bible-trivia/ezra",
    icon: "🕍",
    cardClass:
      "bg-gradient-to-br from-indigo-50 to-sky-100 border-2 border-indigo-200",
  },
  {
    key: "nehemiah",
    title: "Nehemiah",
    href: "/bible-trivia/nehemiah",
    icon: "🧱",
    cardClass:
      "bg-gradient-to-br from-rose-50 to-orange-100 border-2 border-rose-200",
  },
  {
    key: "esther",
    title: "Esther",
    href: "/bible-trivia/esther",
    icon: "👑",
    cardClass:
      "bg-gradient-to-br from-yellow-50 to-amber-100 border-2 border-yellow-200",
  },
  {
    key: "job",
    title: "Job",
    href: "/bible-trivia/job",
    icon: "🧠",
    cardClass:
      "bg-gradient-to-br from-slate-50 to-blue-100 border-2 border-slate-200",
  },
  {
    key: "psalms",
    title: "Psalms",
    href: "/bible-trivia/psalms",
    icon: "🎵",
    cardClass:
      "bg-gradient-to-br from-emerald-50 to-green-100 border-2 border-emerald-200",
  },
  {
    key: "proverbs",
    title: "Proverbs",
    href: "/bible-trivia/proverbs",
    icon: "💡",
    cardClass:
      "bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-200",
  },
  {
    key: "ecclesiastes",
    title: "Ecclesiastes",
    href: "/bible-trivia/ecclesiastes",
    icon: "⏳",
    cardClass:
      "bg-gradient-to-br from-stone-50 to-amber-100 border-2 border-stone-200",
  },
  {
    key: "songofsongs",
    title: "Song of Songs",
    href: "/bible-trivia/song-of-songs",
    icon: "🌹",
    cardClass:
      "bg-gradient-to-br from-rose-50 to-pink-100 border-2 border-rose-200",
  },
  {
    key: "isaiah",
    title: "Isaiah",
    href: "/bible-trivia/isaiah",
    icon: "🕊️",
    cardClass:
      "bg-gradient-to-br from-sky-50 to-blue-100 border-2 border-sky-200",
  },
  {
    key: "jeremiah",
    title: "Jeremiah",
    href: "/bible-trivia/jeremiah",
    icon: "🪶",
    cardClass:
      "bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-200",
  },
  {
    key: "lamentations",
    title: "Lamentations",
    href: "/bible-trivia/lamentations",
    icon: "🕯️",
    cardClass:
      "bg-gradient-to-br from-zinc-50 to-stone-100 border-2 border-zinc-200",
  },
  {
    key: "ezekiel",
    title: "Ezekiel",
    href: "/bible-trivia/ezekiel",
    icon: "🛞",
    cardClass:
      "bg-gradient-to-br from-cyan-50 to-slate-100 border-2 border-cyan-200",
  },
  {
    key: "daniel",
    title: "Daniel",
    href: "/bible-trivia/daniel",
    icon: "🦁",
    cardClass:
      "bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-200",
  },
  {
    key: "hosea",
    title: "Hosea",
    href: "/bible-trivia/hosea",
    icon: "🌧️",
    cardClass:
      "bg-gradient-to-br from-sky-50 to-blue-100 border-2 border-sky-200",
  },
  {
    key: "joel",
    title: "Joel",
    href: "/bible-trivia/joel",
    icon: "🌿",
    cardClass:
      "bg-gradient-to-br from-emerald-50 to-lime-100 border-2 border-emerald-200",
  },
  {
    key: "amos",
    title: "Amos",
    href: "/bible-trivia/amos",
    icon: "🐑",
    cardClass:
      "bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-200",
  },
  {
    key: "obadiah",
    title: "Obadiah",
    href: "/bible-trivia/obadiah",
    icon: "🪨",
    cardClass:
      "bg-gradient-to-br from-slate-50 to-stone-100 border-2 border-slate-200",
  },
  {
    key: "jonah",
    title: "Jonah",
    href: "/bible-trivia/jonah",
    icon: "🐟",
    cardClass:
      "bg-gradient-to-br from-cyan-50 to-blue-100 border-2 border-cyan-200",
  },
  {
    key: "micah",
    title: "Micah",
    href: "/bible-trivia/micah",
    icon: "🏔️",
    cardClass:
      "bg-gradient-to-br from-slate-50 to-blue-100 border-2 border-slate-200",
  },
  {
    key: "nahum",
    title: "Nahum",
    href: "/bible-trivia/nahum",
    icon: "🗡️",
    cardClass:
      "bg-gradient-to-br from-red-50 to-orange-100 border-2 border-red-200",
  },
  {
    key: "habakkuk",
    title: "Habakkuk",
    href: "/bible-trivia/habakkuk",
    icon: "⚡",
    cardClass:
      "bg-gradient-to-br from-yellow-50 to-amber-100 border-2 border-yellow-200",
  },
  {
    key: "zephaniah",
    title: "Zephaniah",
    href: "/bible-trivia/zephaniah",
    icon: "🌪️",
    cardClass:
      "bg-gradient-to-br from-slate-50 to-sky-100 border-2 border-slate-200",
  },
  {
    key: "haggai",
    title: "Haggai",
    href: "/bible-trivia/haggai",
    icon: "🛠️",
    cardClass:
      "bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-200",
  },
  {
    key: "zechariah",
    title: "Zechariah",
    href: "/bible-trivia/zechariah",
    icon: "🗺️",
    cardClass:
      "bg-gradient-to-br from-sky-50 to-cyan-100 border-2 border-sky-200",
  },
  {
    key: "malachi",
    title: "Malachi",
    href: "/bible-trivia/malachi",
    icon: "📨",
    cardClass:
      "bg-gradient-to-br from-rose-50 to-red-100 border-2 border-rose-200",
  },
  {
    key: "matthew",
    title: "Matthew",
    href: "/bible-trivia/matthew",
    icon: "✝️",
    cardClass:
      "bg-gradient-to-br from-sky-50 to-indigo-100 border-2 border-sky-200",
  },
  {
    key: "mark",
    title: "Mark",
    href: "/bible-trivia/mark",
    icon: "🦁",
    cardClass:
      "bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-200",
  },
  {
    key: "luke",
    title: "Luke",
    href: "/bible-trivia/luke",
    icon: "🕊️",
    cardClass:
      "bg-gradient-to-br from-cyan-50 to-sky-100 border-2 border-cyan-200",
  },
  {
    key: "john",
    title: "John",
    href: "/bible-trivia/john",
    icon: "🦅",
    cardClass:
      "bg-gradient-to-br from-indigo-50 to-blue-100 border-2 border-indigo-200",
  },
  {
    key: "acts",
    title: "Acts",
    href: "/bible-trivia/acts",
    icon: "🧭",
    cardClass:
      "bg-gradient-to-br from-emerald-50 to-teal-100 border-2 border-emerald-200",
  },
  {
    key: "romans",
    title: "Romans",
    href: "/bible-trivia/romans",
    icon: "🏛️",
    cardClass:
      "bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-200",
  },
  {
    key: "1corinthians",
    title: "1 Corinthians",
    href: "/bible-trivia/1-corinthians",
    icon: "💌",
    cardClass:
      "bg-gradient-to-br from-rose-50 to-pink-100 border-2 border-rose-200",
  },
  {
    key: "2corinthians",
    title: "2 Corinthians",
    href: "/bible-trivia/2-corinthians",
    icon: "📬",
    cardClass:
      "bg-gradient-to-br from-orange-50 to-amber-100 border-2 border-orange-200",
  },
  {
    key: "galatians",
    title: "Galatians",
    href: "/bible-trivia/galatians",
    icon: "🕊️",
    cardClass:
      "bg-gradient-to-br from-sky-50 to-cyan-100 border-2 border-sky-200",
  },
  {
    key: "ephesians",
    title: "Ephesians",
    href: "/bible-trivia/ephesians",
    icon: "🛡️",
    cardClass:
      "bg-gradient-to-br from-indigo-50 to-violet-100 border-2 border-indigo-200",
  },
  {
    key: "philippians",
    title: "Philippians",
    href: "/bible-trivia/philippians",
    icon: "🎉",
    cardClass:
      "bg-gradient-to-br from-pink-50 to-rose-100 border-2 border-pink-200",
  },
  {
    key: "colossians",
    title: "Colossians",
    href: "/bible-trivia/colossians",
    icon: "🧵",
    cardClass:
      "bg-gradient-to-br from-emerald-50 to-teal-100 border-2 border-emerald-200",
  },
  {
    key: "1thessalonians",
    title: "1 Thessalonians",
    href: "/bible-trivia/1-thessalonians",
    icon: "🌊",
    cardClass:
      "bg-gradient-to-br from-sky-50 to-blue-100 border-2 border-sky-200",
  },
  {
    key: "2thessalonians",
    title: "2 Thessalonians",
    href: "/bible-trivia/2-thessalonians",
    icon: "⛵",
    cardClass:
      "bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200",
  },
  {
    key: "1timothy",
    title: "1 Timothy",
    href: "/bible-trivia/1-timothy",
    icon: "🧭",
    cardClass:
      "bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-200",
  },
  {
    key: "2timothy",
    title: "2 Timothy",
    href: "/bible-trivia/2-timothy",
    icon: "🛡️",
    cardClass:
      "bg-gradient-to-br from-slate-50 to-zinc-100 border-2 border-slate-200",
  },
  {
    key: "titus",
    title: "Titus",
    href: "/bible-trivia/titus",
    icon: "🧩",
    cardClass:
      "bg-gradient-to-br from-orange-50 to-amber-100 border-2 border-orange-200",
  },
  {
    key: "philemon",
    title: "Philemon",
    href: "/bible-trivia/philemon",
    icon: "✉️",
    cardClass:
      "bg-gradient-to-br from-emerald-50 to-teal-100 border-2 border-emerald-200",
  },
  {
    key: "hebrews",
    title: "Hebrews",
    href: "/bible-trivia/hebrews",
    icon: "📘",
    cardClass:
      "bg-gradient-to-br from-blue-50 to-sky-100 border-2 border-blue-200",
  },
  {
    key: "james",
    title: "James",
    href: "/bible-trivia/james",
    icon: "🧭",
    cardClass:
      "bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-200",
  },
  {
    key: "1peter",
    title: "1 Peter",
    href: "/bible-trivia/1-peter",
    icon: "🐟",
    cardClass:
      "bg-gradient-to-br from-cyan-50 to-sky-100 border-2 border-cyan-200",
  },
  {
    key: "2peter",
    title: "2 Peter",
    href: "/bible-trivia/2-peter",
    icon: "🪨",
    cardClass:
      "bg-gradient-to-br from-teal-50 to-cyan-100 border-2 border-teal-200",
  },
  {
    key: "1john",
    title: "1 John",
    href: "/bible-trivia/1-john",
    icon: "✨",
    cardClass:
      "bg-gradient-to-br from-indigo-50 to-slate-100 border-2 border-indigo-200",
  },
  {
    key: "2john",
    title: "2 John",
    href: "/bible-trivia/2-john",
    icon: "🕊️",
    cardClass:
      "bg-gradient-to-br from-sky-50 to-indigo-100 border-2 border-sky-200",
  },
  {
    key: "3john",
    title: "3 John",
    href: "/bible-trivia/3-john",
    icon: "📜",
    cardClass:
      "bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-200",
  },
  {
    key: "jude",
    title: "Jude",
    href: "/bible-trivia/jude",
    icon: "🛡️",
    cardClass:
      "bg-gradient-to-br from-rose-50 to-amber-100 border-2 border-rose-200",
  },
  {
    key: "revelation",
    title: "Revelation",
    href: "/bible-trivia/revelation",
    icon: "🌟",
    cardClass:
      "bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200",
  },
];

interface BookProgress {
  genesis: number;
  exodus: number;
  leviticus: number;
  numbers: number;
  deuteronomy: number;
  joshua: number;
  judges: number;
  ruth: number;
  "1samuel": number;
  "2samuel": number;
  "1kings": number;
  "2kings": number;
  "1chronicles": number;
  "2chronicles": number;
  ezra: number;
  nehemiah: number;
  esther: number;
  job: number;
  psalms: number;
  proverbs: number;
  ecclesiastes: number;
  songofsongs: number;
  isaiah: number;
  jeremiah: number;
  lamentations: number;
  ezekiel: number;
  daniel: number;
  hosea: number;
  joel: number;
  amos: number;
  obadiah: number;
  jonah: number;
  micah: number;
  nahum: number;
  habakkuk: number;
  zephaniah: number;
  haggai: number;
  zechariah: number;
  malachi: number;
  matthew: number;
  mark: number;
  luke: number;
  john: number;
  acts: number;
  romans: number;
  "1corinthians": number;
  "2corinthians": number;
  galatians: number;
  ephesians: number;
  philippians: number;
  colossians: number;
  "1thessalonians": number;
  "2thessalonians": number;
  "1timothy": number;
  "2timothy": number;
  titus: number;
  philemon: number;
  hebrews: number;
  james: number;
  "1peter": number;
  "2peter": number;
  "1john": number;
  "2john": number;
  "3john": number;
  jude: number;
  revelation: number;
}

export default function BooksOfTheBiblePage() {
  const [progress, setProgress] = useState<BookProgress>({
    genesis: 100,
    exodus: 100,
    leviticus: 100,
    numbers: 100,
    deuteronomy: 100,
    joshua: 100,
    judges: 100,
    ruth: 50,
    "1samuel": 100,
    "2samuel": 100,
    "1kings": 100,
    "2kings": 100,
    "1chronicles": 100,
    "2chronicles": 100,
    ezra: 100,
    nehemiah: 100,
    esther: 100,
    job: 100,
    psalms: 100,
    proverbs: 100,
    ecclesiastes: 100,
    songofsongs: 100,
    isaiah: 100,
    jeremiah: 100,
    lamentations: 100,
    ezekiel: 100,
    daniel: 100,
    hosea: 100,
    joel: 100,
    amos: 100,
    obadiah: 100,
    jonah: 100,
    micah: 100,
    nahum: 100,
    habakkuk: 100,
    zephaniah: 100,
    haggai: 100,
    zechariah: 100,
    malachi: 100,
    matthew: 100,
    mark: 100,
    luke: 100,
    john: 100,
    acts: 100,
    romans: 100,
    "1corinthians": 100,
    "2corinthians": 100,
    galatians: 100,
    ephesians: 100,
    philippians: 100,
    colossians: 100,
    "1thessalonians": 100,
    "2thessalonians": 100,
    "1timothy": 100,
    "2timothy": 100,
    titus: 100,
    philemon: 100,
    hebrews: 100,
    james: 100,
    "1peter": 100,
    "2peter": 100,
    "1john": 100,
    "2john": 100,
    "3john": 100,
    jude: 100,
    revelation: 100,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = useMemo(() => {
    let filtered = BOOK_CARDS;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.key.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery]);

  useEffect(() => {
    async function fetchProgress() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
// Fetch progress for all books
        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("book, is_correct")
          .eq("user_id", user.id)
          .in("book", [
            "genesis",
            "exodus",
            "leviticus",
            "numbers",
            "deuteronomy",
            "joshua",
            "judges",
            "ruth",
            "1samuel",
            "2samuel",
            "1kings",
            "2kings",
            "1chronicles",
            "2chronicles",
            "ezra",
            "nehemiah",
            "esther",
            "job",
            "psalms",
            "proverbs",
            "ecclesiastes",
            "songofsongs",
            "isaiah",
            "jeremiah",
            "lamentations",
            "ezekiel",
            "daniel",
            "hosea",
            "joel",
            "amos",
            "obadiah",
            "jonah",
            "micah",
            "nahum",
            "habakkuk",
            "zephaniah",
            "haggai",
            "zechariah",
            "malachi",
            "matthew",
            "mark",
            "luke",
            "john",
            "acts",
            "romans",
            "1corinthians",
            "2corinthians",
            "galatians",
            "ephesians",
            "philippians",
            "colossians",
            "1thessalonians",
            "2thessalonians",
            "1timothy",
            "2timothy",
            "titus",
            "philemon",
            "hebrews",
            "james",
            "1peter",
            "2peter",
            "1john",
            "2john",
            "3john",
            "jude",
            "revelation",
          ]);

        if (error) {
          console.error("Error fetching trivia progress:", error);
        } else {
          // Calculate remaining questions for each book
          const bookTotals = {
            genesis: 100,
            exodus: 100,
            leviticus: 100,
            numbers: 100,
            deuteronomy: 100,
            joshua: 100,
            judges: 100,
            ruth: 50,
            "1samuel": 100,
            "2samuel": 100,
            "1kings": 100,
            "2kings": 100,
            "1chronicles": 100,
            "2chronicles": 100,
            ezra: 100,
            nehemiah: 100,
            esther: 100,
            job: 100,
            psalms: 100,
            proverbs: 100,
            ecclesiastes: 100,
            songofsongs: 100,
            isaiah: 100,
            jeremiah: 100,
            lamentations: 100,
            ezekiel: 100,
            daniel: 100,
            hosea: 100,
            joel: 100,
            amos: 100,
            obadiah: 100,
            jonah: 100,
            micah: 100,
            nahum: 100,
            habakkuk: 100,
            zephaniah: 100,
            haggai: 100,
            zechariah: 100,
            malachi: 100,
            matthew: 100,
            mark: 100,
            luke: 100,
            john: 100,
            acts: 100,
            romans: 100,
            "1corinthians": 100,
            "2corinthians": 100,
            galatians: 100,
            ephesians: 100,
            philippians: 100,
            colossians: 100,
            "1thessalonians": 100,
            "2thessalonians": 100,
            "1timothy": 100,
            "2timothy": 100,
            titus: 100,
            philemon: 100,
            hebrews: 100,
            james: 100,
            "1peter": 100,
            "2peter": 100,
            "1john": 100,
            "2john": 100,
            "3john": 100,
            jude: 100,
            revelation: 100,
          };
          // Removed duplicate bookTotals definition to fix build error
          const correctCounts: Record<string, number> = {};

          progressData?.forEach((p) => {
            if (p.is_correct) {
              correctCounts[p.book] = (correctCounts[p.book] || 0) + 1;
            }
          });

          setProgress({
            genesis: Math.max(0, bookTotals.genesis - (correctCounts.genesis || 0)),
            exodus: Math.max(0, bookTotals.exodus - (correctCounts.exodus || 0)),
            leviticus: Math.max(0, bookTotals.leviticus - (correctCounts.leviticus || 0)),
            numbers: Math.max(0, bookTotals.numbers - (correctCounts.numbers || 0)),
            deuteronomy: Math.max(0, bookTotals.deuteronomy - (correctCounts.deuteronomy || 0)),
            joshua: Math.max(0, bookTotals.joshua - (correctCounts.joshua || 0)),
            judges: Math.max(0, bookTotals.judges - (correctCounts.judges || 0)),
            ruth: Math.max(0, bookTotals.ruth - (correctCounts.ruth || 0)),
            "1samuel": Math.max(0, bookTotals["1samuel"] - (correctCounts["1samuel"] || 0)),
            "2samuel": Math.max(0, bookTotals["2samuel"] - (correctCounts["2samuel"] || 0)),
            "1kings": Math.max(0, bookTotals["1kings"] - (correctCounts["1kings"] || 0)),
            "2kings": Math.max(0, bookTotals["2kings"] - (correctCounts["2kings"] || 0)),
            "1chronicles": Math.max(0, bookTotals["1chronicles"] - (correctCounts["1chronicles"] || 0)),
            "2chronicles": Math.max(0, bookTotals["2chronicles"] - (correctCounts["2chronicles"] || 0)),
            ezra: Math.max(0, bookTotals.ezra - (correctCounts.ezra || 0)),
            nehemiah: Math.max(0, bookTotals.nehemiah - (correctCounts.nehemiah || 0)),
            esther: Math.max(0, bookTotals.esther - (correctCounts.esther || 0)),
            job: Math.max(0, bookTotals.job - (correctCounts.job || 0)),
            psalms: Math.max(0, bookTotals.psalms - (correctCounts.psalms || 0)),
            proverbs: Math.max(0, bookTotals.proverbs - (correctCounts.proverbs || 0)),
            ecclesiastes: Math.max(0, bookTotals.ecclesiastes - (correctCounts.ecclesiastes || 0)),
            songofsongs: Math.max(0, bookTotals.songofsongs - (correctCounts.songofsongs || 0)),
            isaiah: Math.max(0, bookTotals.isaiah - (correctCounts.isaiah || 0)),
            jeremiah: Math.max(0, bookTotals.jeremiah - (correctCounts.jeremiah || 0)),
            lamentations: Math.max(0, bookTotals.lamentations - (correctCounts.lamentations || 0)),
            ezekiel: Math.max(0, bookTotals.ezekiel - (correctCounts.ezekiel || 0)),
            daniel: Math.max(0, bookTotals.daniel - (correctCounts.daniel || 0)),
            hosea: Math.max(0, bookTotals.hosea - (correctCounts.hosea || 0)),
            joel: Math.max(0, bookTotals.joel - (correctCounts.joel || 0)),
            amos: Math.max(0, bookTotals.amos - (correctCounts.amos || 0)),
            obadiah: Math.max(0, bookTotals.obadiah - (correctCounts.obadiah || 0)),
            jonah: Math.max(0, bookTotals.jonah - (correctCounts.jonah || 0)),
            micah: Math.max(0, bookTotals.micah - (correctCounts.micah || 0)),
            nahum: Math.max(0, bookTotals.nahum - (correctCounts.nahum || 0)),
            habakkuk: Math.max(0, bookTotals.habakkuk - (correctCounts.habakkuk || 0)),
            zephaniah: Math.max(0, bookTotals.zephaniah - (correctCounts.zephaniah || 0)),
            haggai: Math.max(0, bookTotals.haggai - (correctCounts.haggai || 0)),
            zechariah: Math.max(0, bookTotals.zechariah - (correctCounts.zechariah || 0)),
            malachi: Math.max(0, bookTotals.malachi - (correctCounts.malachi || 0)),
            matthew: Math.max(0, bookTotals.matthew - (correctCounts.matthew || 0)),
            mark: Math.max(0, bookTotals.mark - (correctCounts.mark || 0)),
            luke: Math.max(0, bookTotals.luke - (correctCounts.luke || 0)),
            john: Math.max(0, bookTotals.john - (correctCounts.john || 0)),
            acts: Math.max(0, bookTotals.acts - (correctCounts.acts || 0)),
            romans: Math.max(0, bookTotals.romans - (correctCounts.romans || 0)),
            "1corinthians": Math.max(
              0,
              bookTotals["1corinthians"] - (correctCounts["1corinthians"] || 0)
            ),
            "2corinthians": Math.max(
              0,
              bookTotals["2corinthians"] - (correctCounts["2corinthians"] || 0)
            ),
            galatians: Math.max(
              0,
              bookTotals.galatians - (correctCounts.galatians || 0)
            ),
            ephesians: Math.max(
              0,
              bookTotals.ephesians - (correctCounts.ephesians || 0)
            ),
            philippians: Math.max(
              0,
              bookTotals.philippians - (correctCounts.philippians || 0)
            ),
            colossians: Math.max(
              0,
              bookTotals.colossians - (correctCounts.colossians || 0)
            ),
            "1thessalonians": Math.max(
              0,
              bookTotals["1thessalonians"] - (correctCounts["1thessalonians"] || 0)
            ),
            "2thessalonians": Math.max(
              0,
              bookTotals["2thessalonians"] - (correctCounts["2thessalonians"] || 0)
            ),
            "1timothy": Math.max(
              0,
              bookTotals["1timothy"] - (correctCounts["1timothy"] || 0)
            ),
            "2timothy": Math.max(
              0,
              bookTotals["2timothy"] - (correctCounts["2timothy"] || 0)
            ),
            titus: Math.max(
              0,
              bookTotals.titus - (correctCounts.titus || 0)
            ),
            philemon: Math.max(
              0,
              bookTotals.philemon - (correctCounts.philemon || 0)
            ),
            hebrews: Math.max(
              0,
              bookTotals.hebrews - (correctCounts.hebrews || 0)
            ),
            james: Math.max(
              0,
              bookTotals.james - (correctCounts.james || 0)
            ),
            "1peter": Math.max(
              0,
              bookTotals["1peter"] - (correctCounts["1peter"] || 0)
            ),
            "2peter": Math.max(
              0,
              bookTotals["2peter"] - (correctCounts["2peter"] || 0)
            ),
            "1john": Math.max(
              0,
              bookTotals["1john"] - (correctCounts["1john"] || 0)
            ),
            "2john": Math.max(
              0,
              bookTotals["2john"] - (correctCounts["2john"] || 0)
            ),
            "3john": Math.max(
              0,
              bookTotals["3john"] - (correctCounts["3john"] || 0)
            ),
            jude: Math.max(0, bookTotals.jude - (correctCounts.jude || 0)),
            revelation: Math.max(
              0,
              bookTotals.revelation - (correctCounts.revelation || 0)
            ),
          });
        }
      }
      setLoading(false);
    }
    fetchProgress();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold mb-2">📚 Books of the Bible</h1>
          <p className="text-gray-600">Test your knowledge of biblical books</p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {filteredBooks.map((card) => (
            <Link key={card.key} href={card.href}>
              <div
                className={`${card.cardClass} rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer h-full`}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{card.icon}</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{card.title}</h2>
                  <p className="text-gray-600 text-sm">
                    {loading
                      ? "Loading..."
                      : `${progress[card.key as keyof BookProgress]} Questions Remaining`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back to Categories */}
        <div className="mt-8 text-center">
          <Link href="/bible-trivia" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Categories
          </Link>
        </div>
      </div>
    </div>
  );
}



