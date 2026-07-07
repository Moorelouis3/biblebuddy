"use client";

function getCoverImage(title: string): string | null {
  if (title === "The Tempting of Jesus") return "/newtempting.png";
  if (title === "The Testing of Joseph") return "/TheTestingofJospehnewcover.png";
  if (title === "The Disciples of Jesus") return "/disciplesofjesusdevotional.png";
  if (title === "Women of the Bible") return "/womenofthebible.png";
  if (title === "The Wisdom of Proverbs") return "/Wisdomofproverbsnewcover.png";
  if (title === "The Faith of Job") return "/faithofjob.png";
  if (title === "The Calling of Moses") return "/callingofmosesdevotional.png";
  if (title === "The Heart of David") return "/heartofdaviddevotional.png";
  if (title === "The Obedience of Abraham") return "/TheobedienceofAbraham.png";
  if (title === "The Transforming of Paul") return "/transformingofpauldevotional.png";
  if (title === "The Courage of Daniel") return "/thecourageofdaniel.png";
  if (title === "The Rise of Esther") return "/theriseofester.png";
  if (title === "The Creation of the World") return "/Day1cover.png";
  if (title === "The Fall of Man") return "/thefallofman.png";
  if (title === "The Flood of Noah") return "/Floodofnoah.png";
  if (title === "The Promise Through Isaac") return "/ThePromiseThroughIsaac.png";
  if (title === "The Wrestling of Jacob") return "/TheWrestlingofJacob.png";
  if (title === "The Deliverance of Moses") return "/TheDeliveranceofMoses.png";
  if (title === "The Covenant at Sinai") return "/TheCovenantatSinai.png";
  if (title === "The Presence of God") return "/ThePresenceofGod.png";
  if (title === "Holiness Before God") return "/ThegolinessbeforeGod.png";
  if (title === "The Wilderness Journey") return "/Wildernessjourneycover.png";
  if (title === "The Rebellion in the Wilderness") return "/RebellionintheWilderness.png";
  if (title === "The Promised Land Ahead") return "/promieslandcover.png";
  return null;
}

function getPreviewDescription(title: string, fallback: string): string {
  const descriptions: Record<string, string> = {
    "The Tempting of Jesus":
      "Jesus walks into the wilderness alone, hungry, and led by the Spirit. What follows is not a small private struggle, but a direct showdown between the Son of God and the voice of temptation. This Bible study follows that tension closely, showing how Jesus answered pressure with truth instead of impulse. You will see the enemy's strategy, the power of Scripture, and the strength of obedience when no one else is watching. If you have ever felt tired, tempted, or spiritually stretched, this story will hit close to home.",
    "The Testing of Joseph":
      "Joseph's life turns fast.\n\nHe moves from favored son to betrayed brother, from slave to prisoner, and from forgotten man to ruler in Egypt.\n\nThis 14-chapter journey walks through:\n\n🧥 the coat and family tension\n🌙 the dreams that made everything louder\n🕳️ the pit, betrayal, and Egypt\n🔒 prison, waiting, and hidden faithfulness\n🌾 famine, wisdom, and promotion\n🤝 forgiveness, reunion, and God's providence\n\nEvery chapter keeps the same Bible Buddy flow: intro, Bible reading, notes, trivia, and reflection.\n\nIf you have ever wondered what God is doing in a long painful season, Joseph's story speaks right into that question.",
    "The Disciples of Jesus":
      "These men were not polished heroes when Jesus called them. They were ordinary, rough, unsure, and often slower to understand than they should have been. This Bible study follows their lives as Jesus teaches, corrects, stretches, and changes them from the inside out. You will watch fear turn into faith, confusion turn into conviction, and ordinary people become the foundation of a movement that changed the world. It is a story about calling, failure, growth, and what happens when people stay close to Jesus long enough to be transformed.",
    "Women of the Bible":
      "This Bible study follows the lives of women who stood in pain, pressure, courage, grief, wisdom, and faith across the whole Bible story. Some were queens, some were mothers, some were outsiders, and some were nearly forgotten by the people around them. But every one of them reveals something important about how God works through real lives, not perfect ones. Their stories hold heartbreak, bravery, loss, loyalty, and redemption. As you move through each day, you begin to see that these women were never side notes in Scripture. They carried moments that shaped the story of God's people in lasting ways.",
    "The Wisdom of Proverbs":
      "Proverbs is not just random one-liners.\n\nIt is a 31-chapter guide for real life when emotions, pressure, money, pride, relationships, and temptation all pull at once.\n\nEach chapter keeps everything centered on one passage:\n\n📖 Bible reading\n📝 Study notes\n🎯 Trivia\n🧩 Scrambled\n💬 Reflection\n\nThis journey helps you see the difference between what looks smart for a moment and what is actually wise before God.\n\nIf you want clearer thinking, steadier decisions, and a stronger grip on everyday faithfulness, Proverbs gives you that path.",
    "The Faith of Job":
      "Job's story begins with blessing and stability, then everything breaks almost at once. Family, health, security, and peace are ripped away, and what remains is a man trying to understand God in the middle of pain that feels far beyond explanation. This Bible study walks you through the grief, questions, arguments, silence, and eventual awe that shape Job's life. It is not a shallow lesson about staying positive. It is a serious story about suffering, faith, and what it means to keep bringing your pain back to God when answers feel far away. If you have ever wrestled with why hard things happen, Job's story goes straight there.",
    "The Calling of Moses":
      "Moses' life begins under a death order and unfolds through exile, failure, fire, confrontation, wilderness, and the presence of God. He is raised in Pharaoh's world, broken in the desert, and then called back to the very place he once ran from. This Bible study follows the full arc of his life so you can feel the fear, the pressure, the miracles, and the long cost of carrying a calling. It is a story about hearing God when you feel unqualified, obeying while things still look impossible, and staying faithful through years that feel heavy. By the end, Moses does not look like a perfect hero. He looks like a man who kept walking with God anyway.",
    "The Heart of David":
      "David's story moves from hidden fields to public battles, from worship to warfare, from caves to kingship, and from failure to repentance. He is brave, gifted, loved, hunted, crowned, broken, and restored across a life that never feels flat or simple. This Bible study follows the rise and fall of David with all the emotion that makes his life unforgettable. It shows why his heart mattered, where it drifted, and how it kept getting pulled back toward God. If you want a story full of courage, weakness, worship, and return, David's life carries all of it.",
    "The Obedience of Abraham":
      "Abraham's story starts before the call, in a family already moving toward an unfinished road. This Bible study now follows Genesis 11-25 one full chapter at a time, so the intro, Bible reading, notes, trivia, and reflection all stay centered on the same passage. You will walk through the call to leave, the altars, the waiting, the covenant, the failures, Isaac's birth, the mountain of testing, Sarah's grief, and Abraham's final legacy. Abraham is not a flawless man, but he keeps moving when God speaks. His story is about trusting before you understand, waiting when the promise feels delayed, and placing even your deepest gifts back into God's hands.",
    "The Transforming of Paul":
      "Paul's story begins with violence, certainty, and religious zeal aimed in the wrong direction. Then Jesus meets him, blinds him, remakes him, and sends him into a life of preaching, suffering, prison, endurance, and deep spiritual fire. This Bible study follows the whole arc, from Saul the persecutor to Paul the apostle who finished his race still holding to Christ. You will walk through the road to Damascus, the missionary journeys, the beatings, the prison songs, the shipwrecks, and the final steady faith that marked his end. It is a story about how radically Jesus can change a life and keep changing it through every next season.",
    "The Courage of Daniel":
      "Most people know Daniel for the lions' den, but that was only one scene in a lifetime of faith under pressure. This 6-chapter Bible study walks through Daniel 1-6 as one focused narrative journey: exile, identity testing, palace pressure, impossible dreams, the fiery furnace, proud kings, the writing on the wall, and prayer that stays steady when it becomes dangerous. Daniel 7-12 will be handled later as a separate vision study, so this journey stays centered on courage, obedience, wisdom, public faith, and consistency in Babylon.",
    "The Rise of Esther":
      "Esther's story begins in exile, in loss, and in a world where powerful men make decisions that can crush whole peoples at once. She rises from hiddenness into the palace, but her real story begins when favor turns into responsibility and silence becomes dangerous. This Bible study follows the tension, timing, fear, strategy, and courage that shaped her rise from orphan girl to the woman who stood for her people. It is full of reversals, sleepless nights, political danger, and providence moving in ways no one in the room can fully see. Esther's life proves that sometimes the place God gives you becomes holy the moment you finally use it with courage.",
    "The Creation of the World":
      "Genesis begins before nations, kings, cities, temples, or human history as we know it. This 2-chapter Bible study walks slowly through Genesis 1-2 as the foundation of the Bible: God creating, ordering, blessing, resting, forming Adam from dust, planting Eden, giving a command, and creating the first human relationship. You will see why creation is good, what it means to be made in God's image, why work and rest matter, and how Eden shows humanity's original life with God before sin enters the story.",
    "The Fall of Man":
      "Genesis 3-4 shows the collapse after Eden. This 2-chapter Bible study walks slowly through temptation, shame, hiding, blame, judgment, exile, Cain and Abel, anger, murder, violence spreading through generations, and the first signs of hope after humanity breaks trust with God.",
    "The Flood of Noah":
      "Genesis 5-10 shows humanity moving from death spreading through the generations to corruption filling the earth, Noah obeying God, the flood covering the world, covenant mercy appearing through the rainbow, and the nations spreading after judgment.",
    "The Promise Through Isaac":
      "Genesis 26-27 shows Abraham's covenant promise moving through Isaac while famine, fear, wells, favoritism, Jacob, Esau, deception, blessing, grief, and family consequences make the next generation feel deeply human.",
    "The Wrestling of Jacob":
      "Genesis 28-36 follows Jacob from fleeing Esau to Bethel, Rachel and Leah, Laban's deception, family rivalry, wrestling with God, reconciliation, Dinah's tragedy, return to Bethel, and Esau's line becoming Edom.",
    "The Deliverance of Moses":
      "Exodus 1-18 follows Israel from slavery in Egypt through Moses' birth, calling, confrontation with Pharaoh, the plagues, Passover, the Red Sea, and the first wilderness lessons. This Bible Study keeps every chapter tied to the same five-task rhythm: intro, Bible reading, notes, trivia, and reflection.",
    "The Covenant at Sinai":
      "Exodus 19-24 brings the rescued people to Mount Sinai. God descends in holiness, gives His commandments, forms the covenant, and teaches Israel how to live as His people. This Bible Study walks through Sinai chapter by chapter with the full five-task Bible Buddy flow.",
    "The Presence of God":
      "Exodus 25-40 moves from tabernacle instructions to the golden calf, Moses' intercession, covenant mercy, obedient construction, and the glory of the Lord filling the tabernacle. This Bible Study keeps every chapter tied to the full Bible Buddy rhythm: intro, reading, notes, trivia, and reflection.",
    "Holiness Before God":
      "Leviticus 1-27 teaches how a holy God dwells with His people. This Bible Study walks chapter by chapter through sacrifice, priesthood, atonement, clean and unclean, holy living, feasts, Jubilee, covenant blessing, and devotion to the Lord with the full Bible Buddy rhythm: intro, reading, notes, trivia, and reflection.",
    "The Wilderness Journey":
      "Numbers 1-14 takes Israel from ordered camp life at Sinai into the pressure of the wilderness. This Bible Study walks chapter by chapter through census, camp order, Levites, purity, offerings, priestly blessing, cloud and fire, complaint, leadership pressure, Miriam and Aaron, the spies, fear, faith, and the hard lesson of trusting God between deliverance and promise.",
    "The Rebellion in the Wilderness":
      "Numbers 15-25 follows the wilderness story as rebellion, complaint, and compromise keep testing Israel's faith. This Bible Study walks chapter by chapter through holiness after failure, Korah's rebellion, Aaron's rod, priestly service, purification, Meribah, the bronze serpent, Balaam's blessings, and the danger of worshiping God with divided loyalty.",
    "The Promised Land Ahead":
      "Numbers 26-36 turns toward the promised land as a new generation is counted and prepared. This Bible Study walks chapter by chapter through inheritance, Joshua's commissioning, offerings, vows, justice, refuge cities, boundaries, and the final lessons Israel needs before crossing into the land God promised.",
  };

  return descriptions[title] ?? fallback;
}
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ChapterNotesMarkdown from "../../../components/ChapterNotesMarkdown";
import CommentSection from "../../../components/comments/CommentSection";
import { supabase } from "../../../lib/supabaseClient";
import DevotionalDayModal from "../../../components/DevotionalDayModal";
import DevotionalDayCompletionModal from "../../../components/DevotionalDayCompletionModal";
import BibleReadingModal from "../../../components/BibleReadingModal";
import TriviaGamePlayer from "../../../components/TriviaGamePlayer";
import BrowserTtsButton from "../../../components/BrowserTtsButton";
import { ACTION_TYPE } from "../../../lib/actionTypes";
import { consumeCreditAction } from "../../../lib/creditClient";
import { trackNavigationActionOnce } from "../../../lib/navigationActionTracker";
import { CHAPTER_BASED_TRIVIA_BOOK_CONFIG } from "../../../lib/triviaCatalog";
import { getTriviaChapter } from "../../../lib/triviaGameData";
import { getScrambledChapter } from "../../../lib/scrambledGameData";
import { getCompletedChaptersByBooks, markChapterDone } from "../../../lib/readingProgress";
import {
  BIBLE_READING_BACKGROUND_TRACKS,
  BIBLE_READING_BACKGROUND_VOLUME,
} from "../../../lib/bibleReadingBackgroundMusic";
import { triggerPoints } from "../../../components/PointsPop";
import { TASK_XP } from "../../../lib/progressionRewards";
import {
  buildPersistedFeatureTours,
  DEFAULT_FEATURE_TOURS,
  normalizeFeatureTours,
  type FeatureToursState,
} from "../../../lib/featureTours";

interface Devotional {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  total_days: number;
}

interface DevotionalDay {
  id: string;
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_book: string;
  bible_reading_chapter: number;
  reflection_question: string | null;
}

interface DayProgress {
  day_number: number;
  is_completed: boolean;
  reading_completed: boolean;
  reflection_text: string | null;
}

type ChapterTaskProgress = {
  completed: number;
  total: number;
};

const WISDOM_TASK_TOTAL = 4;
const CHAPTER_JOURNEY_TASK_TOTAL = 6;
type WisdomTaskKey = "overview" | "reading" | "trivia" | "discussion";

function normalizeStudyTitle(title: string | null | undefined) {
  return String(title || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function isWisdomOfProverbsTitle(title: string | null | undefined) {
  const normalized = normalizeStudyTitle(title);
  return normalized === "wisdom of proverbs" || normalized === "the wisdom of proverbs";
}

function isChapterJourneyStudyTitle(title: string | null | undefined) {
  if (isWisdomOfProverbsTitle(title)) return true;

  return (
    title === "The Testing of Joseph" ||
    title === "The Obedience of Abraham" ||
    title === "The Rise of Esther" ||
    title === "The Courage of Daniel" ||
    title === "The Creation of the World" ||
    title === "The Fall of Man" ||
    title === "The Flood of Noah" ||
    title === "The Promise Through Isaac" ||
    title === "The Wrestling of Jacob" ||
    title === "The Deliverance of Moses" ||
    title === "The Covenant at Sinai" ||
    title === "The Presence of God" ||
    title === "Holiness Before God" ||
    title === "The Wilderness Journey" ||
    title === "The Rebellion in the Wilderness" ||
    title === "The Promised Land Ahead"
  );
}

function getStudyScriptureRange(title: string | null | undefined) {
  if (isWisdomOfProverbsTitle(title)) return "Day 1-31";

  const ranges: Record<string, string> = {
    "The Creation of the World": "Genesis 1 & 2",
    "The Fall of Man": "Genesis 3 & 4",
    "The Flood of Noah": "Genesis 5-10",
    "The Obedience of Abraham": "Genesis 11-25",
    "The Promise Through Isaac": "Genesis 26 & 27",
    "The Wrestling of Jacob": "Genesis 28-36",
    "The Testing of Joseph": "Genesis 37-50",
    "The Deliverance of Moses": "Exodus 1-18",
    "The Covenant at Sinai": "Exodus 19-24",
    "The Presence of God": "Exodus 25-40",
    "Holiness Before God": "Leviticus 1-27",
    "The Wilderness Journey": "Numbers 1-14",
    "The Rebellion in the Wilderness": "Numbers 15-25",
    "The Promised Land Ahead": "Numbers 26-36",
    "The Rise of Esther": "Esther 1-10",
    "The Courage of Daniel": "Daniel 1-6",
  };

  return ranges[title || ""] ?? null;
}

function getChapterJourneyProgressLabel(title: string | null | undefined, currentDay: number, totalDays: number) {
  if (isWisdomOfProverbsTitle(title)) return `Day ${currentDay} of ${totalDays}`;
  if (title === "The Testing of Joseph") return `Genesis ${currentDay + 36} of 50`;
  if (title === "The Obedience of Abraham") return `Genesis ${currentDay + 10} of 25`;
  if (title === "The Rise of Esther") return `Esther ${currentDay} of ${totalDays}`;
  if (title === "The Courage of Daniel") return `Daniel ${currentDay} of ${totalDays}`;
  if (title === "The Creation of the World") return `Genesis ${currentDay} of 2`;
  if (title === "The Fall of Man") return `Genesis ${currentDay + 2} of 4`;
  if (title === "The Flood of Noah") return `Genesis ${currentDay + 4} of 10`;
  if (title === "The Promise Through Isaac") return `Genesis ${currentDay + 25} of 27`;
  if (title === "The Wrestling of Jacob") return `Genesis ${currentDay + 27} of 36`;
  if (title === "The Deliverance of Moses") return `Exodus ${currentDay} of 18`;
  if (title === "The Covenant at Sinai") return `Exodus ${currentDay + 18} of 24`;
  if (title === "The Presence of God") return `Exodus ${currentDay + 24} of 40`;
  if (title === "Holiness Before God") return `Leviticus ${currentDay} of 27`;
  if (title === "The Wilderness Journey") return `Numbers ${currentDay} of 14`;
  if (title === "The Rebellion in the Wilderness") return `Numbers ${currentDay + 14} of 25`;
  if (title === "The Promised Land Ahead") return `Numbers ${currentDay + 25} of 36`;
  return `Day ${currentDay} of ${totalDays}`;
}

function chapterSlug(book: string, chapter: number) {
  return `bible-chapter-${book.toLowerCase().replace(/\s+/g, "-")}-${chapter}`;
}

function stripWisdomOverviewHeading(text: string) {
  const cleaned = String(text || "")
    .replace(/^Proverbs\s+1:\s*Wisdom Starts With Reverence\s*/i, "")
    .replace(/^📖\s*Day\s+1\s+of\s+The\s+Wisdom\s+of\s+Proverbs\s*/i, "")
    .replace(/^💎\s*What Kind of Book Is Proverbs\?\s*/i, "")
    .replace(/^#{1,6}\s*What Kind of Book Is Proverbs\?\s*/im, "")
    .trim();

  return cleaned
    .replace(/^(#{1,6})\s*Meet the Author$/gim, "$1 👑 Meet the Author")
    .replace(/^(#{1,6})\s*Why Proverbs Was Written$/gim, "$1 🎯 Why Proverbs Was Written")
    .replace(/^(#{1,6})\s*Two Voices Compete for Your Heart$/gim, "$1 🚶 Two Voices Compete for Your Heart")
    .replace(/^(#{1,6})\s*What To Watch For In Proverbs 1$/gim, "$1 👀 What To Watch For In Proverbs 1")
    .replace(/^(#{1,6})\s*The Bigger Takeaway$/gim, "$1 🌟 The Bigger Takeaway")
    .replace(/^(#{1,6})\s*What Proverbs Really Is$/gim, "$1 💎 What Proverbs Really Is")
    .replace(/^(#{1,6})\s*The Point of Proverbs 1 Is This$/gim, "$1 🎯 The Point of Proverbs 1 Is This")
    .trim();
}

function completedReaderChapterKey(book: string, chapter: number) {
  return `${book.trim().toLowerCase()}:${chapter}`;
}

function notesActionLabel(book: string, chapter: number) {
  return `${book} ${chapter} Review Opened`;
}

function getLouisDayTopic(day: DevotionalDay) {
  const title = day.day_title?.trim();
  if (title) return title;
  return `day ${day.day_number}`;
}

function getLouisDaySnippet(day: DevotionalDay) {
  const raw = (day.devotional_text || "")
    .replace(/\s+/g, " ")
    .trim();

  if (!raw) return "Stay present with what God is teaching you in this section.";

  const sentenceMatch = raw.match(/(.+?[.!?])\s+/);
  const firstSentence = sentenceMatch?.[1] || raw;
  return firstSentence.length > 180 ? `${firstSentence.slice(0, 177).trim()}...` : firstSentence;
}

function buildLouisDayStartMessage(devotional: Devotional, day: DevotionalDay) {
  const topic = getLouisDayTopic(day);
  const snippet = getLouisDaySnippet(day);
  const isChapterJourney = isChapterJourneyStudyTitle(devotional.title);
  const chapterLabel = `${day.bible_reading_book} ${day.bible_reading_chapter}`;

  return [
    isChapterJourney ? "this is your next Bible study chapter" : "this is your next Bible study section",
    isChapterJourney ? `${chapterLabel} in ${devotional.title} is about ${topic}.` : `Part ${day.day_number} of ${devotional.title} is about ${topic}.`,
    snippet,
    "take your time reading through it and really think about what it means",
    "this isn’t about rushing, it’s about building consistency and understanding",
  ].join("\n\n");
}

function getDevotionalReadingGameConfig(day: DevotionalDay) {
  const rawBookKey = day.bible_reading_book.toLowerCase().trim().replace(/[^a-z0-9]+/g, "");
  const resolvedBookKey = rawBookKey === "songofsolomon" ? "songofsongs" : rawBookKey;
  const triviaRouteSlug =
    CHAPTER_BASED_TRIVIA_BOOK_CONFIG.find((entry) => entry.key === resolvedBookKey)?.routeSlug ?? resolvedBookKey;

  return {
    chapterLabelBase: `${day.bible_reading_book} ${day.bible_reading_chapter}`,
    resolvedBookKey,
    triviaRouteSlug,
    triviaPack: getTriviaChapter(resolvedBookKey, day.bible_reading_chapter),
    scrambledPack: getScrambledChapter(resolvedBookKey, day.bible_reading_chapter),
  };
}

type DevotionalDetailPageProps = {
  devotionalIdOverride?: string;
  embedded?: boolean;
  onBack?: () => void;
  onChapterSelect?: (payload: {
    devotionalId: string;
    devotionalTitle: string;
    dayNumber: number;
    book: string;
    chapter: number;
  }) => void;
};

export default function DevotionalDetailPage({ devotionalIdOverride, embedded = false, onBack, onChapterSelect }: DevotionalDetailPageProps = {}) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const devotionalId = devotionalIdOverride ?? (params.id as string);

  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [days, setDays] = useState<DevotionalDay[]>([]);
  const [progress, setProgress] = useState<Map<number, DayProgress>>(new Map());
  const [chapterTaskProgress, setChapterTaskProgress] = useState<Map<number, ChapterTaskProgress>>(new Map());
  const [completedReaderChapterKeys, setCompletedReaderChapterKeys] = useState<Set<string>>(new Set());
  const [readerFrameHeight, setReaderFrameHeight] = useState(1800);
  const [markingReaderChapter, setMarkingReaderChapter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profileStats, setProfileStats] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState<DevotionalDay | null>(null);
  const [selectedBibleReading, setSelectedBibleReading] = useState<{ book: string; chapter: number } | null>(null);
  const [expandedDayNumber, setExpandedDayNumber] = useState<number | null>(null);
  const [expandedWisdomTask, setExpandedWisdomTask] = useState<string | null>(null);
  const [completedTriviaDayNumbers, setCompletedTriviaDayNumbers] = useState<Set<number>>(new Set());
  const [completedDiscussionDayNumbers, setCompletedDiscussionDayNumbers] = useState<Set<number>>(new Set());
  const [showCreditBlocked, setShowCreditBlocked] = useState(false);
  const [showReadingRequiredModal, setShowReadingRequiredModal] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [freeDevotionalId, setFreeDevotionalId] = useState<string | null | undefined>(undefined);
  const [showChooseFreeModal, setShowChooseFreeModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [pendingDayClick, setPendingDayClick] = useState<DevotionalDay | null>(null);
  const handledLouisDayRef = useRef<string | null>(null);
  const [featureTours, setFeatureTours] = useState<FeatureToursState>({ ...DEFAULT_FEATURE_TOURS });
  const [featureToursLoaded, setFeatureToursLoaded] = useState(false);
  const expandedDayStorageKey = userId ? `bb:devotional-expanded-day:${userId}:${devotionalId}` : null;

  useEffect(() => {
    async function loadUserAndProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
      setUserEmail(user?.email || null);
      if (user?.id) {
        const { data: stats } = await supabase
          .from("profile_stats")
          .select("is_paid, free_devotional_id, feature_tours")
          .eq("user_id", user.id)
          .maybeSingle();
        setProfileStats(stats);
        setFreeDevotionalId((stats as any)?.free_devotional_id ?? null);
        setFeatureTours(normalizeFeatureTours((stats as any)?.feature_tours));
        setFeatureToursLoaded(true);
      } else {
        setFreeDevotionalId(null);
        setFeatureToursLoaded(true);
      }
    }
    loadUserAndProfile();
  }, []);

  async function markFeatureTourSeen(featureKey: keyof FeatureToursState) {
    if (!userId || featureTours[featureKey] === true) return;

    const nextTours = {
      ...featureTours,
      [featureKey]: true,
    };

    const { error: updateError } = await supabase
      .from("profile_stats")
      .update({
        feature_tours: buildPersistedFeatureTours(nextTours),
      })
      .eq("user_id", userId);

    if (updateError) {
      const { error: upsertError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            feature_tours: buildPersistedFeatureTours(nextTours),
          },
          { onConflict: "user_id" },
        );

      if (upsertError) {
        console.error("[FEATURE_TOURS] Could not save devotional day tour:", upsertError);
        return;
      }
    }

    setFeatureTours(nextTours);
  }

  useEffect(() => {
    async function loadDevotional() {
      try {
        // Load devotional
        const { data: devotionalData, error: devotionalError } = await supabase
          .from("devotionals")
          .select("*")
          .eq("id", devotionalId)
          .single();

        if (devotionalError || !devotionalData) {
          console.error("Error loading devotional:", devotionalError);
          if (embedded) {
            onBack?.();
          } else {
            router.push("/plans");
          }
          return;
        }

        setDevotional(devotionalData);

        if (userId) {
          const { data: authData } = await supabase.auth.getUser();
          const meta: any = authData.user?.user_metadata || {};
          const username =
            meta.firstName ||
            meta.first_name ||
            (authData.user?.email ? authData.user.email.split("@")[0] : null) ||
            null;

          void trackNavigationActionOnce({
            userId,
            username,
            actionType: ACTION_TYPE.devotional_opened,
            actionLabel: devotionalData.title,
            dedupeKey: `devotional-viewed:${devotionalId}`,
          }).catch((error) => console.error("[NAV] Failed to track devotional detail view:", error));
        }

        // Load days
        const { data: daysData, error: daysError } = await supabase
          .from("devotional_days")
          .select("*")
          .eq("devotional_id", devotionalId)
          .order("day_number", { ascending: true });

        if (daysError) {
          console.error("Error loading days:", daysError);
          return;
        }

        setDays(daysData || []);

        // Load progress if user is logged in
        if (userId) {
          const progressMap = new Map<number, DayProgress>();
          const { data: progressData, error: progressError } = await supabase
            .from("devotional_progress")
            .select("*")
            .eq("user_id", userId)
            .eq("devotional_id", devotionalId);

          if (!progressError && progressData) {
            progressData.forEach((p) => {
              progressMap.set(p.day_number, {
                day_number: p.day_number,
                is_completed: p.is_completed,
                reading_completed: p.reading_completed,
                reflection_text: p.reflection_text,
              });
            });
            setProgress(progressMap);
          }

          if (isChapterJourneyStudyTitle(devotionalData.title)) {
            const loadedDays = daysData || [];
            const reflectionSlugs = loadedDays.map((day) => chapterSlug(day.bible_reading_book, day.bible_reading_chapter));
            const [actionsRes, reflectionsRes] = await Promise.all([
              supabase
                .from("master_actions")
                .select("action_type, action_label")
                .eq("user_id", userId)
                .in("action_type", [
                  ACTION_TYPE.chapter_notes_reviewed,
                  ACTION_TYPE.chapter_notes_viewed,
                  ACTION_TYPE.trivia_chapter_completed,
                  ACTION_TYPE.scrambled_chapter_completed,
                ]),
              reflectionSlugs.length > 0
                ? supabase
                    .from("article_comments")
                    .select("article_slug")
                    .eq("user_id", userId)
                    .eq("is_deleted", false)
                    .in("article_slug", reflectionSlugs)
                : Promise.resolve({ data: [], error: null } as any),
            ]);

            const actions = actionsRes.data || [];
            const reflectionSet = new Set((reflectionsRes.data || []).map((row: any) => row.article_slug));
            const taskProgressMap = new Map<number, ChapterTaskProgress>();
            const triviaDaySet = new Set<number>();
            const discussionDaySet = new Set<number>();

            loadedDays.forEach((day) => {
              const dayProgress = progressMap.get(day.day_number);
              const chapterLabel = `${day.bible_reading_book} ${day.bible_reading_chapter}`;
              const chapterLabelLower = chapterLabel.toLowerCase();
              const noteLabel = notesActionLabel(day.bible_reading_book, day.bible_reading_chapter);
              const hasNotes = actions.some((row: any) =>
                (row.action_type === ACTION_TYPE.chapter_notes_reviewed || row.action_type === ACTION_TYPE.chapter_notes_viewed) &&
                row.action_label === noteLabel
              );
              const hasTrivia = actions.some((row: any) =>
                row.action_type === ACTION_TYPE.trivia_chapter_completed &&
                String(row.action_label || "").toLowerCase().startsWith(chapterLabelLower)
              );
              const hasScrambled = actions.some((row: any) =>
                row.action_type === ACTION_TYPE.scrambled_chapter_completed &&
                String(row.action_label || "").toLowerCase().startsWith(chapterLabelLower)
              );
              const hasReflection = reflectionSet.has(chapterSlug(day.bible_reading_book, day.bible_reading_chapter));
              if (hasTrivia) triviaDaySet.add(day.day_number);
              if (hasReflection) discussionDaySet.add(day.day_number);
              const completed = isWisdomOfProverbsTitle(devotionalData.title)
                ? [
                    dayProgress?.is_completed === true,
                    dayProgress?.reading_completed === true,
                    hasTrivia,
                    hasReflection,
                  ].filter(Boolean).length
                : [
                    dayProgress?.is_completed === true,
                    dayProgress?.reading_completed === true,
                    hasNotes,
                    hasTrivia,
                    hasScrambled,
                    hasReflection,
                  ].filter(Boolean).length;

              taskProgressMap.set(day.day_number, {
                completed,
                total: isWisdomOfProverbsTitle(devotionalData.title) ? WISDOM_TASK_TOTAL : CHAPTER_JOURNEY_TASK_TOTAL,
              });
            });

            setChapterTaskProgress(taskProgressMap);
            setCompletedTriviaDayNumbers(triviaDaySet);
            setCompletedDiscussionDayNumbers(discussionDaySet);
          } else {
            setChapterTaskProgress(new Map());
            setCompletedTriviaDayNumbers(new Set());
            setCompletedDiscussionDayNumbers(new Set());
          }
        }
      } catch (err) {
        console.error("Error loading devotional:", err);
      } finally {
        setLoading(false);
      }
    }

    if (devotionalId) {
      loadDevotional();
    }
  }, [devotionalId, userId, router]);

  useEffect(() => {
    function handleBibleReaderHeight(event: MessageEvent) {
      const payload = event.data;
      if (!payload || payload.type !== "bb-dashboard-bible-reader-height") return;

      const nextHeight = Number(payload.height);
      if (Number.isFinite(nextHeight) && nextHeight > 0) {
        setReaderFrameHeight(Math.max(900, Math.ceil(nextHeight)));
      }
    }

    window.addEventListener("message", handleBibleReaderHeight);
    return () => window.removeEventListener("message", handleBibleReaderHeight);
  }, []);

  useEffect(() => {
    if (!userId || days.length === 0) {
      setCompletedReaderChapterKeys(new Set());
      return;
    }

    let active = true;

    async function loadCompletedReaderChapters() {
      const uniqueBooks = Array.from(new Set(days.map((day) => day.bible_reading_book).filter(Boolean)));
      const completedByBook = await getCompletedChaptersByBooks(userId!, uniqueBooks);
      if (!active) return;

      const nextKeys = new Set<string>();
      Object.entries(completedByBook).forEach(([bookName, chapters]) => {
        chapters.forEach((chapterNumber) => {
          nextKeys.add(completedReaderChapterKey(bookName, chapterNumber));
        });
      });
      setCompletedReaderChapterKeys(nextKeys);
    }

    void loadCompletedReaderChapters();

    return () => {
      active = false;
    };
  }, [days, userId]);

  // Calculate current day and progress
  const getCurrentDay = () => {
    if (isChapterJourneyStudyTitle(devotional?.title)) {
      for (let i = 1; i <= (devotional?.total_days || 31); i++) {
        const chapterProgress = chapterTaskProgress.get(i);
        if (!chapterProgress || chapterProgress.completed < chapterProgress.total) {
          return i;
        }
      }

      return devotional?.total_days || 31;
    }

    if (!userId || progress.size === 0) {
      return 1; // Start with day 1
    }

    // Find the first incomplete day
    for (let i = 1; i <= (devotional?.total_days || 21); i++) {
      const dayProgress = progress.get(i);
      if (!dayProgress || !dayProgress.is_completed) {
        return i;
      }
    }

    // All days completed
    return devotional?.total_days || 21;
  };

  const currentDay = getCurrentDay();
  const isChapterJourneyStudy = isChapterJourneyStudyTitle(devotional?.title);
  const completedDays = isChapterJourneyStudy
    ? Array.from(chapterTaskProgress.values()).filter((p) => p.completed >= p.total).length
    : Array.from(progress.values()).filter((p) => p.is_completed).length;
  const progressPercent = devotional
    ? isChapterJourneyStudy
      ? (completedDays / Math.max(devotional.total_days, 1)) * 100
      : (completedDays / devotional.total_days) * 100
    : 0;
  const previewDescription = devotional
    ? getPreviewDescription(devotional.title, devotional.description)
    : "";
  const scriptureRange = getStudyScriptureRange(devotional?.title);
  const orderedDays = [...days].sort((a, b) => a.day_number - b.day_number);
  const currentDayData = orderedDays.find((day) => day.day_number === currentDay) || orderedDays[0] || null;
  const totalUnits = Math.max(devotional?.total_days || orderedDays.length || 1, 1);
  const remainingUnits = Math.max(totalUnits - completedDays, 0);
  const isWisdomOfProverbs = isWisdomOfProverbsTitle(devotional?.title);

  useEffect(() => {
    if (!expandedDayStorageKey || typeof window === "undefined") return;

    const storedValue = window.localStorage.getItem(expandedDayStorageKey);
    if (!storedValue) return;

    const parsedValue = Number.parseInt(storedValue, 10);
    if (Number.isNaN(parsedValue)) return;

    const matchingDay = orderedDays.find((day) => day.day_number === parsedValue);
    if (matchingDay && isDayUnlocked(matchingDay.day_number)) {
      setExpandedDayNumber(parsedValue);
    }
  }, [expandedDayStorageKey, orderedDays, userId]);

  useEffect(() => {
    if (!expandedDayStorageKey || typeof window === "undefined") return;

    if (expandedDayNumber === null) {
      window.localStorage.removeItem(expandedDayStorageKey);
      return;
    }

    window.localStorage.setItem(expandedDayStorageKey, String(expandedDayNumber));
  }, [expandedDayNumber, expandedDayStorageKey]);

  const isDayUnlocked = (dayNumber: number) => {
    if (userEmail === "moorelouis3@gmail.com") return true;
    if (dayNumber === 1) return true;
    if (isChapterJourneyStudy) {
      const prevChapterProgress = chapterTaskProgress.get(dayNumber - 1);
      return prevChapterProgress?.completed === prevChapterProgress?.total;
    }
    const prevDayProgress = progress.get(dayNumber - 1);
    return prevDayProgress?.is_completed === true;
  };

  const updateWisdomTaskProgress = (
    dayNumber: number,
    overrides: Partial<Record<WisdomTaskKey, boolean>> = {},
  ) => {
    if (!isWisdomOfProverbsTitle(devotional?.title)) return;

    setChapterTaskProgress((prevTaskProgress) => {
      const dayProgress = progress.get(dayNumber);
      const overviewDone = overrides.overview ?? dayProgress?.is_completed === true;
      const readingDone = overrides.reading ?? dayProgress?.reading_completed === true;
      const triviaDone = overrides.trivia ?? completedTriviaDayNumbers.has(dayNumber);
      const discussionDone = overrides.discussion ?? completedDiscussionDayNumbers.has(dayNumber);
      const completed = [overviewDone, readingDone, triviaDone, discussionDone].filter(Boolean).length;
      const next = new Map(prevTaskProgress);
      next.set(dayNumber, { completed, total: WISDOM_TASK_TOTAL });
      return next;
    });
  };

  const setChapterOnStudyDashboard = async (day: DevotionalDay) => {
    if (!userId || !devotional || !day.bible_reading_book || !day.bible_reading_chapter) return;

    const chapterLabel = `${day.bible_reading_book} ${day.bible_reading_chapter}`;
    const journeyKey = `${devotionalId}:${day.day_number}`;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        `bb:study-dashboard-handoff:${userId}`,
        JSON.stringify({ journeyKey, chapterLabel, createdAt: Date.now() }),
      );
    }

    const [{ error: profileError }, { error: progressError }] = await Promise.all([
      supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            free_devotional_id: devotionalId,
            louis_primary_devotional_id: devotionalId,
            louis_primary_devotional_day: day.day_number,
          },
          { onConflict: "user_id" },
        ),
      supabase.from("devotional_progress").upsert(
        {
          user_id: userId,
          devotional_id: devotionalId,
          day_number: day.day_number,
          is_completed: false,
          reading_completed: false,
        },
        { onConflict: "user_id,devotional_id,day_number" },
      ),
    ]);

    if (profileError || progressError) {
      console.error("[BIBLE_STUDY] Could not set dashboard chapter:", profileError || progressError);
      return;
    }

    router.push("/dashboard");
  };

  const isFreeStudyFinished = async (studyId: string) => {
    if (!userId) return false;

    const { data: studyRow, error: studyError } = await supabase
      .from("devotionals")
      .select("total_days")
      .eq("id", studyId)
      .maybeSingle();

    if (studyError) {
      console.error("[FREE_STUDY] Could not load selected free study:", studyError);
      return false;
    }

    const totalDays = Math.max(1, Number(studyRow?.total_days || 1));
    const { data: progressRows, error: progressError } = await supabase
      .from("devotional_progress")
      .select("day_number, is_completed")
      .eq("user_id", userId)
      .eq("devotional_id", studyId);

    if (progressError) {
      console.error("[FREE_STUDY] Could not load selected free study progress:", progressError);
      return false;
    }

    const completedDays = new Set(
      (progressRows || [])
        .filter((row: { is_completed: boolean | null }) => row.is_completed === true)
        .map((row: { day_number: number }) => row.day_number),
    );

    for (let dayNumber = 1; dayNumber <= totalDays; dayNumber += 1) {
      if (!completedDays.has(dayNumber)) return false;
    }

    return true;
  };

  const handleDayClick = async (day: DevotionalDay) => {
    if (!isDayUnlocked(day.day_number)) {
      return;
    }

    if (userId && devotional) {
      const { data: authData } = await supabase.auth.getUser();
      const meta: any = authData.user?.user_metadata || {};
      const username =
        meta.firstName ||
        meta.first_name ||
        (authData.user?.email ? authData.user.email.split("@")[0] : null) ||
        null;

      void trackNavigationActionOnce({
        userId,
        username,
        actionType: ACTION_TYPE.devotional_day_opened,
        actionLabel: `${devotional.title} - Day ${day.day_number}`,
        dedupeKey: `devotional-day-opened:${devotionalId}:${day.day_number}`,
      }).catch((error) => console.error("[NAV] Failed to track devotional day click:", error));
    }

    const isFreeUser = profileStats?.is_paid !== true && userEmail !== "moorelouis3@gmail.com";
    const shouldSetStudyDashboard = isChapterJourneyStudyTitle(devotional?.title);
    const openDay = async () => {
      if (
        embedded &&
        devotional &&
        shouldSetStudyDashboard &&
        day.bible_reading_book &&
        day.bible_reading_chapter &&
        onChapterSelect
      ) {
        onChapterSelect({
          devotionalId,
          devotionalTitle: devotional.title,
          dayNumber: day.day_number,
          book: day.bible_reading_book,
          chapter: day.bible_reading_chapter,
        });
        return;
      }

      if (
        !embedded &&
        userId &&
        devotional &&
        shouldSetStudyDashboard &&
        day.bible_reading_book &&
        day.bible_reading_chapter
      ) {
        await setChapterOnStudyDashboard(day);
        return;
      }

      setSelectedDay(day);
    };

    // Free user logic — wait until freeDevotionalId is loaded
    if (isFreeUser && freeDevotionalId !== undefined) {
      if (freeDevotionalId === devotionalId) {
        // This IS their free devotional — open freely
        setShowCreditBlocked(false);
        await openDay();
      } else if (freeDevotionalId === null) {
        // No free devotional chosen yet — ask them
        setPendingDayClick(day);
        setShowChooseFreeModal(true);
      } else {
        // They already chose a different devotional — upgrade wall
        const finishedFreeStudy = await isFreeStudyFinished(freeDevotionalId);
        if (finishedFreeStudy) {
          setPendingDayClick(day);
          setShowChooseFreeModal(true);
        } else {
          setShowUpgradeModal(true);
        }
      }
      return;
    }

    // Paid user (or owner) — existing consume-credit logic
    const dayProgress = progress.get(day.day_number);
    const dayTaskProgress = chapterTaskProgress.get(day.day_number);
    const isCompleted = shouldSetStudyDashboard
      ? dayTaskProgress?.completed === dayTaskProgress?.total
      : dayProgress?.is_completed === true;

    if (isCompleted) {
      setShowCreditBlocked(false);
      await openDay();
      return;
    }

    const creditResult = await consumeCreditAction(ACTION_TYPE.devotional_day_viewed, { userId });
    if (creditResult.ok === false) {
      setShowCreditBlocked(true);
      await openDay();
      return;
    }

    setShowCreditBlocked(false);
    await openDay();
  };

  useEffect(() => {
    if (!devotional || days.length === 0) return;

    const requestedDay = Number.parseInt(searchParams.get("day") || "", 10);
    const fromLouis = searchParams.get("from");
    const shouldHandleLouisDay =
      fromLouis === "louis-daily" ||
      fromLouis === "louis-recommendation" ||
      fromLouis === "louis-daily-task" ||
      fromLouis === "louis-daily-task-reflection";

    if (!requestedDay || Number.isNaN(requestedDay) || !shouldHandleLouisDay) {
      return;
    }

    const requestKey = `${devotionalId}:${requestedDay}`;
    if (handledLouisDayRef.current === requestKey) {
      return;
    }

    const day = days.find((entry) => entry.day_number === requestedDay);
    if (!day) {
      handledLouisDayRef.current = requestKey;
      router.replace(`/plans/${devotionalId}`);
      return;
    }

    handledLouisDayRef.current = requestKey;

    void (async () => {
      await handleDayClick(day);
      if (!isChapterJourneyStudyTitle(devotional.title) || embedded) {
        router.replace(`/plans/${devotionalId}`);
      }
    })();
  }, [days, devotional, devotionalId, embedded, router, searchParams]);

  useEffect(() => {
    if (!selectedDay || !featureToursLoaded) return;
    if (featureTours.devotional_day === true) return;
    void markFeatureTourSeen("devotional_day");
  }, [selectedDay, devotional, featureTours.devotional_day, featureToursLoaded]);

  const handleConfirmFreeChoice = async () => {
    if (!userId) return;
    // Save the free devotional choice to profile_stats
    await supabase
      .from("profile_stats")
      .upsert(
        { user_id: userId, free_devotional_id: devotionalId },
        { onConflict: "user_id" }
      );
    setFreeDevotionalId(devotionalId);
    setShowChooseFreeModal(false);
    if (pendingDayClick) {
      setShowCreditBlocked(false);
      if (isChapterJourneyStudyTitle(devotional?.title) && !embedded) {
        await setChapterOnStudyDashboard(pendingDayClick);
      } else {
        setSelectedDay(pendingDayClick);
      }
      setPendingDayClick(null);
    }
  };

  const handleBibleReadingClick = (book: string, chapter: number) => {
    if (userId && devotional && selectedDay) {
      void supabase.auth.getUser().then(({ data }) => {
        const meta: any = data.user?.user_metadata || {};
        const username =
          meta.firstName ||
          meta.first_name ||
          (data.user?.email ? data.user.email.split("@")[0] : null) ||
          null;

        void trackNavigationActionOnce({
          userId,
          username,
          actionType: ACTION_TYPE.devotional_bible_reading_opened,
          actionLabel: `${devotional.title} - Day ${selectedDay.day_number} - ${book} ${chapter}`,
          dedupeKey: `devotional-reading:${devotionalId}:${selectedDay.day_number}:${book.toLowerCase()}:${chapter}`,
        }).catch((error) => console.error("[NAV] Failed to track devotional Bible reading click:", error));
      });
    }

    setSelectedBibleReading({ book, chapter });
  };

  const handleDayComplete = async (dayNumber: number, reflectionText: string, readingCompleted: boolean) => {
    if (!userId) return;

    // ENFORCE: Bible reading must be completed before day can be marked complete
    if (!readingCompleted) {
      setShowReadingRequiredModal(true);
      return; // Do not proceed with completion
    }

    try {

      // Check if day was already completed in database to prevent duplicate logging
      const { data: existingProgressData } = await supabase
        .from("devotional_progress")
        .select("is_completed")
        .eq("user_id", userId)
        .eq("devotional_id", devotionalId)
        .eq("day_number", dayNumber)
        .maybeSingle();
      
      const wasAlreadyCompleted = existingProgressData?.is_completed === true;

      // Save everything in one transaction: reflection, reading status, and completion
      const { error } = await supabase
        .from("devotional_progress")
        .upsert(
          {
            user_id: userId,
            devotional_id: devotionalId,
            day_number: dayNumber,
            is_completed: true,
            reading_completed: readingCompleted,
            reflection_text: reflectionText || null,
            completed_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id,devotional_id,day_number",
          }
        );

      if (error) {
        console.error("Error completing day:", error);
        alert("Failed to mark day as complete. Please try again.");
        return;
      }

      // Update local state with all values
      setProgress((prev) => {
        const next = new Map(prev);
        next.set(dayNumber, { 
          day_number: dayNumber, 
          is_completed: true, 
          reading_completed: readingCompleted,
          reflection_text: reflectionText || null,
        });
        return next;
      });

      if (isChapterJourneyStudyTitle(devotional?.title)) {
        setChapterTaskProgress((prev) => {
          const next = new Map(prev);
          next.set(dayNumber, {
            completed: isWisdomOfProverbsTitle(devotional?.title) ? WISDOM_TASK_TOTAL : CHAPTER_JOURNEY_TASK_TOTAL,
            total: isWisdomOfProverbsTitle(devotional?.title) ? WISDOM_TASK_TOTAL : CHAPTER_JOURNEY_TASK_TOTAL,
          });
          return next;
        });
      }

      // Close day modal
      setSelectedDay(null);

      // Log feed activity for new completions only
      if (!wasAlreadyCompleted && devotional) {
        void supabase.rpc("log_feed_activity", {
          p_activity_type: "devotional_day_completed",
          p_activity_data: {
            devotional_id: devotionalId,
            title: devotional.title,
            day_number: dayNumber,
            total_days: devotional.total_days,
          },
          p_is_public: true,
        });
      }

      // ACTION TRACKING: Only log if this is a NEW completion (not already completed)
      // Do this asynchronously after UI updates (fire-and-forget)
      // This matches the pattern used in chapter completion
      if (!wasAlreadyCompleted) {
        (async () => {
          try {
            console.log(`[DEVOTIONAL_DAY_COMPLETE] Starting tracking for day ${dayNumber}, devotional ${devotionalId}, user ${userId}`);
            
            // Get username for master_actions
            const { data: { user: authUser } } = await supabase.auth.getUser();
            let actionUsername = "User";
            
            if (authUser) {
              const meta: any = authUser.user_metadata || {};
              actionUsername =
                meta.firstName ||
                meta.first_name ||
                (authUser.email ? authUser.email.split("@")[0] : null) ||
                "User";
            }

            // Format action_label: "Devotional Title - Day X"
            const actionLabel = devotional ? `${devotional.title} - Day ${dayNumber}` : `Day ${dayNumber}`;

            // STEP 1: Insert into master_actions
            console.log("[MASTER_ACTIONS] inserting:", { 
              action_type: ACTION_TYPE.devotional_day_completed, 
              action_label: actionLabel,
              user_id: userId,
              username: actionUsername 
            });
            
            const { error: actionError, data: actionData } = await supabase
              .from("master_actions")
              .insert({
                user_id: userId,
                username: actionUsername ?? null,
                action_type: ACTION_TYPE.devotional_day_completed,
                action_label: actionLabel,
              })
              .select();

            if (actionError) {
              console.error("[MASTER_ACTIONS] Error logging devotional_day_completed action:", actionError);
              console.error("[MASTER_ACTIONS] Full error details:", JSON.stringify(actionError, null, 2));
            } else {
              console.log("[MASTER_ACTIONS] Successfully inserted devotional_day_completed action:", actionData);
              triggerPoints(TASK_XP.intro);
            }

            // STEP 2: UPDATE profile_stats: Count from devotional_progress table
            let statsUsername = actionUsername;
            if (!statsUsername && userId) {
              const { data: { user } } = await supabase.auth.getUser();
              if (user) {
                const meta: any = user.user_metadata || {};
                statsUsername =
                  meta.firstName ||
                  meta.first_name ||
                  (user.email ? user.email.split("@")[0] : null) ||
                  "User";
              }
            }

            // Count all completed devotional days for this user
            console.log("[PROFILE_STATS] Counting completed devotional days for user:", userId);
            const { count, error: countError } = await supabase
              .from("devotional_progress")
              .select("*", { count: "exact", head: true })
              .eq("user_id", userId)
              .eq("is_completed", true);

            if (countError) {
              console.error("[PROFILE_STATS] Error counting devotional days:", countError);
              console.error("[PROFILE_STATS] Full error details:", JSON.stringify(countError, null, 2));
            } else {
              console.log("[PROFILE_STATS] Found", count, "completed devotional days");

              // Fetch other counts from profile_stats
              // Note: If column doesn't exist, this select will still work (returns null for missing column)
              const { data: currentStats, error: fetchStatsError } = await supabase
                .from("profile_stats")
                .select("username, chapters_completed_count, notes_created_count, people_learned_count, places_discovered_count, keywords_mastered_count, devotional_days_completed_count")
                .eq("user_id", userId)
                .maybeSingle();

              if (fetchStatsError) {
                console.error("[PROFILE_STATS] Error fetching current stats:", fetchStatsError);
                console.error("[PROFILE_STATS] Full error details:", JSON.stringify(fetchStatsError, null, 2));
                
                // If column doesn't exist, the select might fail - but we'll try the upsert anyway
                if (fetchStatsError.message?.includes("devotional_days_completed_count") || 
                    fetchStatsError.code === "42703") {
                  console.error("[PROFILE_STATS] ⚠️ CRITICAL: Column 'devotional_days_completed_count' does not exist!");
                  console.error("[PROFILE_STATS] ⚠️ Please run ADD_DEVOTIONAL_DAYS_COMPLETED_COLUMN.sql in Supabase SQL Editor");
                }
                return; // Don't proceed with update if fetch failed
              }

              console.log("[PROFILE_STATS] Current stats:", currentStats);

              const finalUsername = currentStats?.username || statsUsername || "User";
              
              // Calculate total_actions as sum of all counts including devotional_days_completed_count
              const totalActions = 
                (currentStats?.chapters_completed_count || 0) +
                (currentStats?.notes_created_count || 0) +
                (currentStats?.people_learned_count || 0) +
                (currentStats?.places_discovered_count || 0) +
                (currentStats?.keywords_mastered_count || 0) +
                (count || 0); // devotional_days_completed_count

              console.log("[PROFILE_STATS] Updating profile_stats with:", {
                user_id: userId,
                devotional_days_completed_count: count || 0,
                total_actions: totalActions,
                username: finalUsername
              });

              const { error: updateError, data: updateData } = await supabase
                .from("profile_stats")
                .upsert(
                  {
                    user_id: userId,
                    devotional_days_completed_count: count || 0,
                    total_actions: totalActions,
                    username: finalUsername,
                    updated_at: new Date().toISOString(),
                  },
                  {
                    onConflict: "user_id",
                  }
                )
                .select();

              if (updateError) {
                console.error("[PROFILE_STATS] Error updating profile_stats:", updateError);
                console.error("[PROFILE_STATS] Error code:", updateError.code);
                console.error("[PROFILE_STATS] Error message:", updateError.message);
                console.error("[PROFILE_STATS] Full error details:", JSON.stringify(updateError, null, 2));
                
                // Check if error is due to missing column
                if (updateError.message?.includes("devotional_days_completed_count") || 
                    updateError.code === "42703" ||
                    updateError.hint?.includes("devotional_days_completed_count")) {
                  console.error("[PROFILE_STATS] ⚠️ CRITICAL: Column 'devotional_days_completed_count' does not exist in database!");
                  console.error("[PROFILE_STATS] ⚠️ ACTION REQUIRED: Run ADD_DEVOTIONAL_DAYS_COMPLETED_COLUMN.sql in Supabase SQL Editor");
                  console.error("[PROFILE_STATS] ⚠️ This is preventing profile stats from updating!");
                }
              } else {
                console.log("[PROFILE_STATS] ✅ Successfully updated profile_stats:", updateData);
              }
            }
          } catch (err) {
            console.error("[DEVOTIONAL_DAY_TRACKING] Unexpected error in devotional day tracking:", err);
            console.error("[DEVOTIONAL_DAY_TRACKING] Full error details:", JSON.stringify(err, null, 2));
          }
        })();
      } else {
        console.log(`[DEVOTIONAL_DAY_COMPLETE] Day ${dayNumber} was already completed, skipping duplicate tracking`);
      }
    } catch (err) {
      console.error("Error completing day:", err);
      alert("Failed to mark day as complete. Please try again.");
    }
  };

  const handleIntroComplete = async (dayNumber: number) => {
    if (!userId || !devotional) return;

    try {
      const { data: existingProgressData } = await supabase
        .from("devotional_progress")
        .select("is_completed")
        .eq("user_id", userId)
        .eq("devotional_id", devotionalId)
        .eq("day_number", dayNumber)
        .maybeSingle();

      const wasAlreadyCompleted = existingProgressData?.is_completed === true;

      const { error } = await supabase
        .from("devotional_progress")
        .upsert(
          {
            user_id: userId,
            devotional_id: devotionalId,
            day_number: dayNumber,
            is_completed: true,
            completed_at: new Date().toISOString(),
          },
          { onConflict: "user_id,devotional_id,day_number" }
        );

      if (error) {
        console.error("Error completing intro:", error);
        return;
      }

      setProgress((prev) => {
        const next = new Map(prev);
        const existing = next.get(dayNumber) || {
          day_number: dayNumber,
          is_completed: false,
          reading_completed: false,
          reflection_text: null,
        };
        next.set(dayNumber, { ...existing, is_completed: true });
        return next;
      });
      updateWisdomTaskProgress(dayNumber, { overview: true });

      if (!wasAlreadyCompleted) {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        const meta: any = authUser?.user_metadata || {};
        const actionUsername =
          meta.firstName ||
          meta.first_name ||
          (authUser?.email ? authUser.email.split("@")[0] : null) ||
          "User";

        await supabase.from("master_actions").insert({
          user_id: userId,
          username: actionUsername ?? null,
          action_type: ACTION_TYPE.devotional_day_completed,
          action_label: `${devotional.title} - Day ${dayNumber}`,
        });
      }
    } catch (error) {
      console.error("Error marking intro complete:", error);
    }
  };

  const handleReadingComplete = async (dayNumber: number) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from("devotional_progress")
        .upsert(
          {
            user_id: userId,
            devotional_id: devotionalId,
            day_number: dayNumber,
            reading_completed: true,
          },
          {
            onConflict: "user_id,devotional_id,day_number",
          }
        );

      if (!error) {
        setProgress((prev) => {
          const next = new Map(prev);
          const existing = next.get(dayNumber) || { day_number: dayNumber, is_completed: false, reading_completed: false, reflection_text: null };
          next.set(dayNumber, { ...existing, reading_completed: true });
          return next;
        });
        updateWisdomTaskProgress(dayNumber, { reading: true });
      }
    } catch (err) {
      console.error("Error updating reading status:", err);
    }
  };

  const handlePlanReaderChapterComplete = async (day: DevotionalDay) => {
    if (!userId || !day?.bible_reading_book || !day?.bible_reading_chapter) return;

    const key = completedReaderChapterKey(day.bible_reading_book, day.bible_reading_chapter);
    if (completedReaderChapterKeys.has(key) || markingReaderChapter === key) return;

    try {
      setMarkingReaderChapter(key);
      await markChapterDone(userId, day.bible_reading_book, day.bible_reading_chapter);
      await handleReadingComplete(day.day_number);
      setCompletedReaderChapterKeys((previous) => {
        const next = new Set(previous);
        next.add(key);
        return next;
      });
    } catch (error) {
      console.error("[DEVOTIONAL_READER] Could not mark chapter complete:", error);
      alert("Could not mark this chapter complete. Please try again.");
    } finally {
      setMarkingReaderChapter(null);
    }
  };

  const handleReflectionSave = async (dayNumber: number, reflectionText: string) => {
    if (!userId || !reflectionText.trim()) return;

    if (devotional) {
      const { data: authData } = await supabase.auth.getUser();
      const meta: any = authData.user?.user_metadata || {};
      const username =
        meta.firstName ||
        meta.first_name ||
        (authData.user?.email ? authData.user.email.split("@")[0] : null) ||
        null;

      void trackNavigationActionOnce({
        userId,
        username,
        actionType: ACTION_TYPE.devotional_reflection_saved,
        actionLabel: `${devotional.title} - Day ${dayNumber}`,
        dedupeKey: `devotional-reflection:${devotionalId}:${dayNumber}`,
      })
        .then((logged) => {
          if (logged) triggerPoints(TASK_XP.reflection);
        })
        .catch((error) => console.error("[NAV] Failed to track devotional reflection save:", error));
    }

    try {
      const { error } = await supabase
        .from("devotional_progress")
        .upsert(
          {
            user_id: userId,
            devotional_id: devotionalId,
            day_number: dayNumber,
            reflection_text: reflectionText.trim(),
          },
          {
            onConflict: "user_id,devotional_id,day_number",
          }
        );

      if (!error) {
        setProgress((prev) => {
          const next = new Map(prev);
          const existing = next.get(dayNumber) || { day_number: dayNumber, is_completed: false, reading_completed: false, reflection_text: null };
          next.set(dayNumber, { ...existing, reflection_text: reflectionText.trim() });
          return next;
        });
      }
    } catch (err) {
      console.error("Error saving reflection:", err);
    }
  };


  // Pro lock for specific devotional
  const PRO_DEVOTIONAL_UUID = "20b36b11-73df-4863-a4c3-8371a5ff511a";
  const isProLocked = devotional?.id === PRO_DEVOTIONAL_UUID && profileStats?.is_paid === false;

  useEffect(() => {
    if (isProLocked) setShowProModal(true);
    else setShowProModal(false);
  }, [isProLocked]);

  if (loading) {
    return (
      <div className={embedded ? "bg-transparent" : "min-h-screen bg-gray-50"}>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-gray-500">Loading plan...</div>
        </div>
      </div>
    );
  }

  if (isProLocked && showProModal) {
    return (
      <DevotionalDayCompletionModal
        dayNumber={null}
        devotionalTitle={null}
        customTitle="You Need Bible Buddy Pro"
        customBody={"This plan is part of the Bible Buddy Pro library. Upgrade to unlock full access to all plans, deeper studies, and future releases."}
        primaryButtonText="Upgrade to Pro"
        secondaryButtonText="Maybe Later"
        onPrimary={() => router.push('/upgrade')}
        onClose={() => {
          setShowProModal(false);
          if (embedded) {
            onBack?.();
          } else {
            router.push('/plans');
          }
        }}
      />
    );
  }

  if (!devotional) {
    return (
      <div className={embedded ? "bg-transparent" : "min-h-screen bg-gray-50"}>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-gray-500">Plan not found.</div>
          {embedded ? (
            <button type="button" onClick={onBack} className="text-blue-600 hover:underline mt-4 inline-block">
              Back to Plans
            </button>
          ) : (
          <Link href="/plans" className="text-blue-600 hover:underline mt-4 inline-block">
            ← Back to Plans
          </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={embedded ? "bg-transparent pb-8" : "min-h-screen bg-gray-50 pb-12"}>
      <div className={`${embedded ? "px-0 py-0" : "px-4 py-8"} max-w-5xl mx-auto`}>
        {/* HEADER */}
        {embedded ? (
          <button type="button" onClick={onBack} className="mb-4 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 transition hover:bg-blue-100">
            Back to Plans
          </button>
        ) : (
        <Link href="/plans" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Plans
        </Link>
        )}

        <section className="overflow-hidden rounded-[30px] border border-[color-mix(in_srgb,var(--bb-accent,#2f7fe8)_24%,var(--bb-card-border,#dbe7f4))] bg-[linear-gradient(180deg,var(--bb-card,#ffffff),color-mix(in_srgb,var(--bb-accent-soft,#eaf5ff)_58%,var(--bb-card,#ffffff)))] p-4 shadow-[0_18px_48px_rgba(38,63,99,0.14)] sm:p-5">
          <div className="grid gap-5 md:grid-cols-[190px_1fr] md:items-center">
            <div className="mx-auto w-full max-w-[190px]">
              {getCoverImage(devotional.title) ? (
                <img
                  src={getCoverImage(devotional.title)!}
                  alt={`${devotional.title} cover`}
                  className="aspect-[3/4] w-full object-contain drop-shadow-xl"
                />
              ) : (
                <div className="grid aspect-[3/4] w-full place-items-center rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] text-5xl">
                  📖
                </div>
              )}
            </div>

            <div className="min-w-0 text-center md:text-left">
              <h1 className="mt-1 text-3xl font-black leading-tight text-[var(--bb-text-primary,#111827)] sm:text-4xl">{devotional.title}</h1>
              <p className="mt-2 text-sm font-bold text-[var(--bb-text-secondary,#5f6368)]">{scriptureRange ?? devotional.subtitle}</p>

              <div className="mx-auto mt-6 w-full max-w-3xl md:mx-0">
                <div className="h-3 overflow-hidden rounded-full bg-[var(--bb-surface-soft,#f8fbff)] shadow-inner">
                  <div
                    className="h-full rounded-full bg-[var(--bb-accent,#2f7fe8)] transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs font-black text-[var(--bb-text-secondary,#5f6368)]">
                  <span>{Math.round(progressPercent)}% complete</span>
                  <span>{completedDays}/{totalUnits} {isChapterJourneyStudy ? (isWisdomOfProverbs ? "days" : "chapters") : "sections"}</span>
                </div>
              </div>
            </div>
          </div>

          {!isWisdomOfProverbs ? (
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-3 py-4 text-center shadow-sm">
                <p className="text-2xl font-black text-[var(--bb-text-primary,#111827)]">{completedDays}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">Complete</p>
              </div>
              <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-3 py-4 text-center shadow-sm">
                <p className="text-2xl font-black text-[var(--bb-text-primary,#111827)]">{currentDay}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">Current</p>
              </div>
              <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-3 py-4 text-center shadow-sm">
                <p className="text-2xl font-black text-[var(--bb-text-primary,#111827)]">{remainingUnits}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-wide text-[var(--bb-text-muted,#6b7280)]">Left</p>
              </div>
            </div>
          ) : null}
        </section>

        <details className="mt-5 overflow-hidden rounded-[26px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)] transition hover:bg-[var(--bb-surface-soft,#f8fbff)]">
            Study Overview
            <span className="text-lg leading-none text-[var(--bb-text-muted,#6b7280)]">+</span>
          </summary>
          <div className="border-t border-[var(--bb-card-border,#dbe7f4)] px-5 py-4">
            <p className="text-sm font-semibold leading-6 text-[var(--bb-text-secondary,#5f6368)] whitespace-pre-line">
              {previewDescription}
            </p>
          </div>
        </details>

        <section className="mt-5 rounded-[26px] border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Progress Map</p>
              <h2 className="mt-1 text-xl font-black text-[var(--bb-text-primary,#111827)]">{isWisdomOfProverbs ? "Days" : isChapterJourneyStudy ? "Chapters" : "Sections"}</h2>
            </div>
            <p className="text-xs font-black text-[var(--bb-text-muted,#6b7280)]">{completedDays}/{totalUnits} done</p>
          </div>
          <div className="grid gap-3">
            {orderedDays.map((day) => {
              const dayProgress = progress.get(day.day_number);
              const taskProgress = chapterTaskProgress.get(day.day_number) || {
                completed: 0,
                total: isWisdomOfProverbs ? WISDOM_TASK_TOTAL : CHAPTER_JOURNEY_TASK_TOTAL,
              };
              const isUnlocked = isDayUnlocked(day.day_number);
              const chapterLabel = `${day.bible_reading_book} ${day.bible_reading_chapter}`;
              const isExpanded = expandedDayNumber === day.day_number;
              const wisdomTriviaConfig = getDevotionalReadingGameConfig(day);
              const readerChapterKey = completedReaderChapterKey(day.bible_reading_book, day.bible_reading_chapter);
              const readerChapterDone = completedReaderChapterKeys.has(readerChapterKey);
              const readerChapterMarking = markingReaderChapter === readerChapterKey;
              const planReaderSrc = `/Bible/${encodeURIComponent(day.bible_reading_book.toLowerCase().trim())}/${day.bible_reading_chapter}?dashboardEmbed=1&hideReaderChrome=1&hideEmbedControls=1&hideDiscussion=1`;
              const wisdomBigPictureDone = dayProgress?.is_completed === true;
              const wisdomReadingDone = dayProgress?.reading_completed === true || readerChapterDone;
              const wisdomTriviaDone = completedTriviaDayNumbers.has(day.day_number);
              const wisdomDiscussionDone = completedDiscussionDayNumbers.has(day.day_number);
              const wisdomCompletedCount = [
                wisdomBigPictureDone,
                wisdomReadingDone,
                wisdomTriviaDone,
                wisdomDiscussionDone,
              ].filter(Boolean).length;
              const displayedTaskProgress = isWisdomOfProverbs
                ? { completed: wisdomCompletedCount, total: WISDOM_TASK_TOTAL }
                : taskProgress;
              const remainingTasks = Math.max(displayedTaskProgress.total - displayedTaskProgress.completed, 0);
              const isCompleted = isWisdomOfProverbs
                ? wisdomCompletedCount >= WISDOM_TASK_TOTAL
                : isChapterJourneyStudy
                  ? taskProgress.completed >= taskProgress.total
                  : dayProgress?.is_completed === true;
              const wisdomOverviewText = stripWisdomOverviewHeading(day.devotional_text);
              const wisdomTaskKey = (task: WisdomTaskKey) => `${day.day_number}:${task}`;
              const wisdomStatusPill = (done: boolean) => (
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] ${
                    done
                      ? "bg-emerald-500 text-white"
                      : "bg-[var(--bb-surface-soft,#eef4f8)] text-[var(--bb-text-muted,#637083)]"
                  }`}
                >
                  {done ? "Done" : "Not Done"}
                </span>
              );
              const wisdomTaskSummaryClass =
                "flex w-full cursor-pointer list-none items-center gap-3 px-4 py-4 text-left transition hover:bg-[var(--bb-surface-soft,#f8fbff)]";
              const wisdomTaskCardClass = (done: boolean) =>
                `overflow-hidden rounded-[24px] border shadow-[0_10px_24px_rgba(15,23,42,0.05)] transition ${
                  done
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-[var(--bb-card-border,#dbe7f4)] bg-white"
                }`;

              return (
                <div
                  key={day.id}
                  className={`overflow-hidden rounded-lg border transition ${
                    isCompleted
                      ? isWisdomOfProverbs
                        ? "border-emerald-300 bg-emerald-50"
                        : "bg-[#eaf5ff] border-[#b9dcf4]"
                      : isUnlocked
                      ? "bg-white border-gray-200"
                      : "bg-gray-50 border-gray-200 opacity-60"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setExpandedDayNumber((current) => {
                        const next = current === day.day_number ? null : day.day_number;
                        if (next === null) {
                          setExpandedWisdomTask(null);
                        } else if (isWisdomOfProverbs) {
                          setExpandedWisdomTask(`${day.day_number}:overview`);
                        }
                        return next;
                      });
                    }}
                    disabled={!isUnlocked}
                    className={`w-full text-left px-4 py-3 transition ${
                      isUnlocked ? "hover:bg-blue-50 hover:border-blue-300 cursor-pointer" : "cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="font-semibold text-gray-700">
                          {isWisdomOfProverbs ? `Day ${day.day_number}` : isChapterJourneyStudy ? chapterLabel : `Day ${day.day_number}`}
                        </span>
                        <span className="truncate text-gray-700">{day.day_title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {!isUnlocked && (
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        )}
                        {isWisdomOfProverbs ? (
                          <span className="flex shrink-0 items-center gap-2">
                            <span
                              className={`text-sm font-black ${
                                isCompleted ? "text-emerald-700" : "text-[var(--bb-text-secondary,#5f6368)]"
                              }`}
                            >
                              {displayedTaskProgress.completed}/{displayedTaskProgress.total} completed
                            </span>
                            <span className="flex items-center gap-1" aria-hidden="true">
                              {Array.from({ length: WISDOM_TASK_TOTAL }).map((_, taskIndex) => (
                                <span
                                  key={taskIndex}
                                  className={`h-2.5 w-2.5 rounded-full ${
                                    taskIndex < wisdomCompletedCount
                                      ? "bg-emerald-500"
                                      : "bg-[var(--bb-surface-soft,#eaf1f7)]"
                                  }`}
                                />
                              ))}
                            </span>
                          </span>
                        ) : isChapterJourneyStudy && isCompleted ? (
                          <span className="font-semibold text-[#2f6685]">Complete</span>
                        ) : isChapterJourneyStudy && isUnlocked ? (
                          <span className="text-sm font-semibold text-gray-600">
                            {displayedTaskProgress.completed}/{displayedTaskProgress.total} completed
                            {remainingTasks > 0 ? `, ${remainingTasks} task${remainingTasks === 1 ? "" : "s"} left` : ""}
                          </span>
                        ) : null}
                        {isCompleted && !isChapterJourneyStudy && (
                          <span className="font-semibold text-[#2f6685]">Complete</span>
                        )}
                      </div>
                    </div>
                  </button>

                  {isUnlocked && isExpanded && (
                    <div className="border-t border-[var(--bb-card-border,#dbe7f4)] bg-white px-4 py-4">
                      {isWisdomOfProverbs ? (
                        <div className="space-y-3">
                          <details
                            open={expandedWisdomTask === wisdomTaskKey("overview")}
                            className={wisdomTaskCardClass(wisdomBigPictureDone)}
                          >
                            <summary
                              className={wisdomTaskSummaryClass}
                              onClick={(event) => {
                                event.preventDefault();
                                setExpandedWisdomTask((current) =>
                                  current === wisdomTaskKey("overview") ? null : wisdomTaskKey("overview"),
                                );
                              }}
                            >
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--bb-surface-soft,#eef4f8)] text-[var(--bb-accent,#0b63f6)]">
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                  <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
                                </svg>
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-lg font-black leading-tight text-[var(--bb-text-primary,#111827)]">Overview</span>
                                <span className="mt-1 block text-sm leading-5 text-[var(--bb-text-secondary,#5f6368)]">Start with the cinematic overview.</span>
                              </span>
                              {wisdomStatusPill(wisdomBigPictureDone)}
                            </summary>
                            <div className="border-t border-[var(--bb-card-border,#dbe7f4)] px-4 py-4 text-sm leading-7 text-[var(--bb-text-secondary,#5f6368)]">
                              {day.day_number === 1 ? (
                                <BrowserTtsButton
                                  text={wisdomOverviewText}
                                  label="Listen to Overview"
                                  backgroundMusicSrcs={BIBLE_READING_BACKGROUND_TRACKS}
                                  backgroundMusicVolume={BIBLE_READING_BACKGROUND_VOLUME}
                                  className="mb-5"
                                  aiDisclosure
                                />
                              ) : null}
                              <ChapterNotesMarkdown compactMobile databaseTermMode="light">
                                {wisdomOverviewText}
                              </ChapterNotesMarkdown>
                              <button
                                type="button"
                                onClick={() => handleIntroComplete(day.day_number)}
                                className={`mt-5 w-full rounded-2xl px-4 py-3 text-sm font-black transition ${
                                  wisdomBigPictureDone
                                    ? "border border-emerald-300 bg-emerald-50 text-emerald-700"
                                    : "bg-[var(--bb-accent,#0b63f6)] text-white shadow-[0_10px_22px_rgba(11,99,246,0.18)]"
                                }`}
                              >
                                {wisdomBigPictureDone ? "Overview Done" : "Mark Overview Done"}
                              </button>
                            </div>
                          </details>

                          <details
                            open={expandedWisdomTask === wisdomTaskKey("reading")}
                            className={wisdomTaskCardClass(wisdomReadingDone)}
                          >
                            <summary
                              className={wisdomTaskSummaryClass}
                              onClick={(event) => {
                                event.preventDefault();
                                setExpandedWisdomTask((current) =>
                                  current === wisdomTaskKey("reading") ? null : wisdomTaskKey("reading"),
                                );
                              }}
                            >
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--bb-surface-soft,#eef4f8)] text-[var(--bb-accent,#0b63f6)]">
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                </svg>
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-lg font-black leading-tight text-[var(--bb-text-primary,#111827)]">Today's Reading</span>
                                <span className="mt-1 block text-sm leading-5 text-[var(--bb-text-secondary,#5f6368)]">{day.bible_reading_book} {day.bible_reading_chapter}</span>
                              </span>
                              {wisdomStatusPill(wisdomReadingDone)}
                            </summary>
                            <div className="border-t border-[var(--bb-card-border,#dbe7f4)] px-0 py-0">
                              <div className="overflow-hidden bg-[var(--bb-background,#f8fbff)]">
                                <iframe
                                  key={planReaderSrc}
                                  title={`${day.bible_reading_book} ${day.bible_reading_chapter}`}
                                  src={planReaderSrc}
                                  loading="eager"
                                  style={{ height: `${readerFrameHeight}px` }}
                                  className="w-full border-0 bg-[var(--bb-background,#f8fbff)]"
                                />
                              </div>
                              <div className="border-t border-[var(--bb-card-border,#dbe7f4)] bg-transparent px-4 py-4">
                                <button
                                  type="button"
                                  disabled={wisdomReadingDone || readerChapterMarking}
                                  onClick={() => handlePlanReaderChapterComplete(day)}
                                  className={`w-full rounded-2xl px-4 py-4 text-sm font-black transition ${
                                    wisdomReadingDone
                                      ? "cursor-not-allowed border border-emerald-300 bg-emerald-50 text-emerald-700"
                                      : readerChapterMarking
                                        ? "cursor-wait bg-[color-mix(in_srgb,var(--bb-accent,#0b63f6)_55%,white)] text-white"
                                        : "bg-[var(--bb-accent,#0b63f6)] text-white shadow-[0_12px_26px_rgba(11,99,246,0.20)] hover:brightness-95"
                                  }`}
                                >
                                  {wisdomReadingDone
                                    ? `${day.bible_reading_book} ${day.bible_reading_chapter} Completed`
                                    : readerChapterMarking
                                      ? "Marking Chapter..."
                                      : `Mark ${day.bible_reading_book} ${day.bible_reading_chapter} Done`}
                                </button>
                              </div>
                            </div>
                          </details>

                          <details
                            open={expandedWisdomTask === wisdomTaskKey("trivia")}
                            className={wisdomTaskCardClass(wisdomTriviaDone)}
                          >
                            <summary
                              className={wisdomTaskSummaryClass}
                              onClick={(event) => {
                                event.preventDefault();
                                setExpandedWisdomTask((current) =>
                                  current === wisdomTaskKey("trivia") ? null : wisdomTaskKey("trivia"),
                                );
                              }}
                            >
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--bb-surface-soft,#eef4f8)] text-[var(--bb-accent,#0b63f6)]">
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="9" />
                                  <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2.1-2.5 4" />
                                  <path d="M12 17h.01" />
                                </svg>
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-lg font-black leading-tight text-[var(--bb-text-primary,#111827)]">Today's Trivia</span>
                                <span className="mt-1 block text-sm leading-5 text-[var(--bb-text-secondary,#5f6368)]">Test your understanding.</span>
                              </span>
                              {wisdomStatusPill(wisdomTriviaDone)}
                            </summary>
                            <div className="border-t border-[var(--bb-card-border,#dbe7f4)] px-4 py-4">
                              <TriviaGamePlayer
                                bookName={day.bible_reading_book}
                                bookSlug={wisdomTriviaConfig.triviaRouteSlug}
                                chapter={wisdomTriviaConfig.triviaPack!}
                                compact
                                skipUpgradeGate
                                hideSkipButton
                                onComplete={() => {
                                  setCompletedTriviaDayNumbers((previous) => {
                                    const next = new Set(previous);
                                    next.add(day.day_number);
                                    return next;
                                  });
                                  updateWisdomTaskProgress(day.day_number, { trivia: true });
                                }}
                              />
                            </div>
                          </details>

                          <details
                            open={expandedWisdomTask === wisdomTaskKey("discussion")}
                            className={wisdomTaskCardClass(wisdomDiscussionDone)}
                          >
                            <summary
                              className={wisdomTaskSummaryClass}
                              onClick={(event) => {
                                event.preventDefault();
                                setExpandedWisdomTask((current) =>
                                  current === wisdomTaskKey("discussion") ? null : wisdomTaskKey("discussion"),
                                );
                              }}
                            >
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--bb-surface-soft,#eef4f8)] text-[var(--bb-accent,#0b63f6)]">
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                                </svg>
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-lg font-black leading-tight text-[var(--bb-text-primary,#111827)]">Discussion</span>
                                <span className="mt-1 block text-sm leading-5 text-[var(--bb-text-secondary,#5f6368)]">Share what stood out.</span>
                              </span>
                              {wisdomStatusPill(wisdomDiscussionDone)}
                            </summary>
                            <div className="border-t border-[var(--bb-card-border,#dbe7f4)] px-4 py-4">
                              <p className="text-sm font-bold text-[var(--bb-text-primary,#111827)]">
                                {day.reflection_question || `What stood out to you most in Day ${day.day_number}?`}
                              </p>
                              <div className="mt-4">
                                <CommentSection
                                  articleSlug={chapterSlug(day.bible_reading_book, day.bible_reading_chapter)}
                                  headingText=""
                                  placeholderText="Start typing your thoughts..."
                                  submitButtonText="Post Comment"
                                  variant="plain"
                                  onPosted={() => {
                                    setCompletedDiscussionDayNumbers((previous) => {
                                      const next = new Set(previous);
                                      next.add(day.day_number);
                                      return next;
                                    });
                                    updateWisdomTaskProgress(day.day_number, { discussion: true });
                                  }}
                                  onUserHasPosted={() => {
                                    setCompletedDiscussionDayNumbers((previous) => {
                                      if (previous.has(day.day_number)) return previous;
                                      const next = new Set(previous);
                                      next.add(day.day_number);
                                      return next;
                                    });
                                    updateWisdomTaskProgress(day.day_number, { discussion: true });
                                  }}
                                />
                              </div>
                            </div>
                          </details>

                          <div className="flex justify-end pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                setExpandedDayNumber(null);
                                setExpandedWisdomTask(null);
                              }}
                              className="rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-white px-4 py-2 text-sm font-semibold text-[var(--bb-text-primary,#111827)] transition hover:bg-gray-50"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm font-semibold text-[var(--bb-text-primary,#111827)]">
                            {isChapterJourneyStudy ? chapterLabel : `Day ${day.day_number}`}: {day.day_title}
                          </p>
                          <div className="mt-2 text-sm leading-6 text-[var(--bb-text-secondary,#5f6368)]">
                            {day.devotional_text ? (
                              <ChapterNotesMarkdown compactMobile databaseTermMode="light">
                                {day.devotional_text}
                              </ChapterNotesMarkdown>
                            ) : (
                              <p>Tap open to read this day.</p>
                            )}
                          </div>
                          <div className="mt-4 space-y-4">
                            <div className="rounded-3xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-surface-soft,#f8fbff)] px-4 py-5 shadow-[0_10px_24px_rgba(47,127,232,0.06)]">
                              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Attached Reading</p>
                              <p className="mt-2 text-lg font-black text-[var(--bb-text-primary,#111827)]">
                                {day.bible_reading_book} {day.bible_reading_chapter}
                              </p>
                              <p className="mt-1 text-sm leading-6 text-[var(--bb-text-secondary,#5f6368)]">
                                Open the actual chapter in the Bible Reader tab, then come back here and keep this day open.
                              </p>
                              <div className="mt-4 rounded-2xl bg-white px-3 py-3">
                                <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-text-muted,#6b7280)]">Actual Reading</p>
                                <p className="mt-1 text-sm font-semibold text-[var(--bb-text-primary,#111827)]">
                                  {day.bible_reading_book} {day.bible_reading_chapter}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleDayClick(day)}
                                className="mt-4 rounded-full bg-[var(--bb-accent,#2f7fe8)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95"
                              >
                                Open Reading
                              </button>
                            </div>

                            <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] px-4 py-4">
                              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--bb-accent,#2f7fe8)]">Discussion</p>
                              <p className="mt-2 text-sm font-bold text-[var(--bb-text-primary,#111827)]">
                                {day.reflection_question || `What stood out to you most in ${day.day_title}?`}
                              </p>
                              <div className="mt-4">
                                <CommentSection
                                  articleSlug={chapterSlug(day.bible_reading_book, day.bible_reading_chapter)}
                                  headingText=""
                                  placeholderText="Start typing your thoughts..."
                                  submitButtonText="Post Comment"
                                  variant="plain"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => setExpandedDayNumber(null)}
                                className="rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-white px-4 py-2 text-sm font-semibold text-[var(--bb-text-primary,#111827)] transition hover:bg-gray-50"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* LEGACY SECTION MODAL */}
      {selectedDay && (
        <DevotionalDayModal
          devotionalId={devotional.id}
          devotionalTitle={devotional.title}
          day={selectedDay}
          dayProgress={progress.get(selectedDay.day_number)}
          showCreditBlocked={showCreditBlocked}
          onClose={() => setSelectedDay(null)}
          onBibleReadingClick={handleBibleReadingClick}
          onReadingComplete={() => handleReadingComplete(selectedDay.day_number)}
          onReflectionSave={(text) => handleReflectionSave(selectedDay.day_number, text)}
          onIntroComplete={() => handleIntroComplete(selectedDay.day_number)}
          onDayComplete={(reflectionText, readingCompleted) => handleDayComplete(selectedDay.day_number, reflectionText, readingCompleted)}
        />
      )}

      {selectedBibleReading && (
        <BibleReadingModal
          book={selectedBibleReading.book}
          chapter={selectedBibleReading.chapter}
          onClose={() => setSelectedBibleReading(null)}
          onMarkComplete={() => {
            if (selectedDay) {
              handleReadingComplete(selectedDay.day_number);
            }
          }}
        />
      )}

      {/* READING REQUIRED MODAL */}
      {showReadingRequiredModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4"
          onClick={() => setShowReadingRequiredModal(false)}
        >
          <div 
            className="relative w-full max-w-md rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowReadingRequiredModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl font-semibold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Bible Reading First</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              You must complete the assigned Bible reading before marking this {isChapterJourneyStudy ? "chapter" : "section"} as complete.
            </p>
            
            <button
              type="button"
              onClick={() => setShowReadingRequiredModal(false)}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* FREE DEVOTIONAL CHOICE MODAL */}
      {showChooseFreeModal && devotional && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => { setShowChooseFreeModal(false); setPendingDayClick(null); }}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
          <h2 className="text-xl font-bold text-gray-900 mb-3">🎁 You have one free plan</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              As a free user, you're gifted <strong>one complete plan</strong> — all {devotional.total_days} {isChapterJourneyStudy ? "chapters" : "sections"}, fully unlocked.
              <br /><br />
              Once you choose, this will be your free plan. Is <strong>{devotional.title}</strong> the one you want to start?
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleConfirmFreeChoice}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
              >
                Yes, start {devotional.title}
              </button>
              <button
                type="button"
                onClick={() => { setShowChooseFreeModal(false); setPendingDayClick(null); }}
                className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
              >
                Not yet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPGRADE MODAL - free user on a non-free Bible Study */}
      {showUpgradeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setShowUpgradeModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowUpgradeModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Unlock All Plans</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              You've already started your free plan. Upgrade to Bible Buddy Pro to unlock every plan — including this one — plus all future releases.
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => router.push('/upgrade')}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
              >
                Upgrade to Pro
              </button>
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
