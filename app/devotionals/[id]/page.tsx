"use client";

function getCoverImage(title: string): string | null {
  if (title === "The Tempting of Jesus") return "/newtempting.png";
  if (title === "The Testing of Joseph") return "/newtesting.png";
  if (title === "The Disciples of Jesus") return "/disciplesofjesusdevotional.png";
  if (title === "Women of the Bible") return "/womenofthebible.png";
  if (title === "The Wisdom of Proverbs") return "/WisdomofProverbs.png";
  if (title === "The Faith of Job") return "/faithofjob.png";
  if (title === "The Calling of Moses") return "/callingofmosesdevotional.png";
  if (title === "The Heart of David") return "/heartofdaviddevotional.png";
  if (title === "The Obedience of Abraham") return "/obedienceofabraham.png";
  if (title === "The Transforming of Paul") return "/transformingofpauldevotional.png";
  if (title === "The Courage of Daniel") return "/courageofdaniel.png";
  if (title === "The Rise of Esther") return "/RiseofEsther.png";
  return null;
}

function getPreviewDescription(title: string, fallback: string): string {
  const descriptions: Record<string, string> = {
    "The Tempting of Jesus":
      "Jesus walks into the wilderness alone, hungry, and led by the Spirit. What follows is not a small private struggle, but a direct showdown between the Son of God and the voice of temptation. This devotional follows that tension closely, showing how Jesus answered pressure with truth instead of impulse. You will see the enemy's strategy, the power of Scripture, and the strength of obedience when no one else is watching. If you have ever felt tired, tempted, or spiritually stretched, this story will hit close to home.",
    "The Testing of Joseph":
      "Joseph's life turns from favored son to betrayed brother, from slave to prisoner, and from forgotten man to ruler in Egypt. Every chapter feels like another sharp turn in a story that should have broken him. This devotional lets you walk through the loneliness, injustice, waiting, and unexpected mercy that shaped Joseph's life. It is about dreams that seem delayed, suffering that makes no sense, and the quiet faithfulness that God still uses. If you have ever wondered what God is doing in a long painful season, Joseph's story speaks right into that question.",
    "The Disciples of Jesus":
      "These men were not polished heroes when Jesus called them. They were ordinary, rough, unsure, and often slower to understand than they should have been. This devotional follows their lives as Jesus teaches, corrects, stretches, and changes them from the inside out. You will watch fear turn into faith, confusion turn into conviction, and ordinary people become the foundation of a movement that changed the world. It is a story about calling, failure, growth, and what happens when people stay close to Jesus long enough to be transformed.",
    "Women of the Bible":
      "This devotional follows the lives of women who stood in pain, pressure, courage, grief, wisdom, and faith across the whole Bible story. Some were queens, some were mothers, some were outsiders, and some were nearly forgotten by the people around them. But every one of them reveals something important about how God works through real lives, not perfect ones. Their stories hold heartbreak, bravery, loss, loyalty, and redemption. As you move through each day, you begin to see that these women were never side notes in Scripture. They carried moments that shaped the story of God's people in lasting ways.",
    "The Wisdom of Proverbs":
      "Proverbs is not just a book of random one-liners. It is a guide for how to walk through real life with wisdom when emotions, pressure, money, pride, relationships, and temptation all pull at once. This devotional slows the book down so you can feel how wisdom speaks into everyday choices and the deeper direction of your life. It shows the difference between what looks smart for a moment and what is actually wise before God. If you want clearer thinking, steadier decisions, and a stronger grip on everyday faithfulness, this devotional will give you that kind of path.",
    "The Faith of Job":
      "Job's story begins with blessing and stability, then everything breaks almost at once. Family, health, security, and peace are ripped away, and what remains is a man trying to understand God in the middle of pain that feels far beyond explanation. This devotional walks you through the grief, questions, arguments, silence, and eventual awe that shape Job's life. It is not a shallow lesson about staying positive. It is a serious story about suffering, faith, and what it means to keep bringing your pain back to God when answers feel far away. If you have ever wrestled with why hard things happen, Job's story goes straight there.",
    "The Calling of Moses":
      "Moses' life begins under a death order and unfolds through exile, failure, fire, confrontation, wilderness, and the presence of God. He is raised in Pharaoh's world, broken in the desert, and then called back to the very place he once ran from. This devotional follows the full arc of his life so you can feel the fear, the pressure, the miracles, and the long cost of carrying a calling. It is a story about hearing God when you feel unqualified, obeying while things still look impossible, and staying faithful through years that feel heavy. By the end, Moses does not look like a perfect hero. He looks like a man who kept walking with God anyway.",
    "The Heart of David":
      "David's story moves from hidden fields to public battles, from worship to warfare, from caves to kingship, and from failure to repentance. He is brave, gifted, loved, hunted, crowned, broken, and restored across a life that never feels flat or simple. This devotional follows the rise and fall of David with all the emotion that makes his life unforgettable. It shows why his heart mattered, where it drifted, and how it kept getting pulled back toward God. If you want a story full of courage, weakness, worship, and return, David's life carries all of it.",
    "The Obedience of Abraham":
      "Abraham's story starts with a voice telling him to leave everything familiar and walk toward a future he cannot see yet. From there his life becomes a journey of altars, promises, failures, waiting, covenant, and costly surrender. This devotional follows that road closely so you can feel both the wonder and the strain of obeying God over a long stretch of life. Abraham is not a flawless man, but he is a man who keeps moving when God speaks. His story is about trusting before you understand, waiting when the promise feels delayed, and placing even your deepest gifts back into God's hands.",
    "The Transforming of Paul":
      "Paul's story begins with violence, certainty, and religious zeal aimed in the wrong direction. Then Jesus meets him, blinds him, remakes him, and sends him into a life of preaching, suffering, prison, endurance, and deep spiritual fire. This devotional follows the whole arc, from Saul the persecutor to Paul the apostle who finished his race still holding to Christ. You will walk through the road to Damascus, the missionary journeys, the beatings, the prison songs, the shipwrecks, and the final steady faith that marked his end. It is a story about how radically Jesus can change a life and keep changing it through every next season.",
    "The Courage of Daniel":
      "Most people know Daniel for the lions' den, but that was only one scene in a lifetime of faith under pressure. This devotional follows him from exile and identity testing to royal courts, impossible dreams, jealous enemies, and visions that reach all the way into the future. Daniel's life shows what it looks like to stay loyal to God inside a foreign system that keeps trying to reshape you. His courage is not built in one dramatic moment. It is built over years of prayer, wisdom, pressure, and unwavering devotion. If you want to see what steady faith looks like in a hostile world, Daniel's life gives that picture in full.",
    "The Rise of Esther":
      "Esther's story begins in exile, in loss, and in a world where powerful men make decisions that can crush whole peoples at once. She rises from hiddenness into the palace, but her real story begins when favor turns into responsibility and silence becomes dangerous. This devotional follows the tension, timing, fear, strategy, and courage that shaped her rise from orphan girl to the woman who stood for her people. It is full of reversals, sleepless nights, political danger, and providence moving in ways no one in the room can fully see. Esther's life proves that sometimes the place God gives you becomes holy the moment you finally use it with courage.",
  };

  return descriptions[title] ?? fallback;
}
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import DevotionalDayModal from "../../../components/DevotionalDayModal";
import DevotionalDayCompletionModal from "../../../components/DevotionalDayCompletionModal";
import BibleReadingModal from "../../../components/BibleReadingModal";
import { ACTION_TYPE } from "../../../lib/actionTypes";
import { consumeCreditAction } from "../../../lib/creditClient";
import { trackNavigationActionOnce } from "../../../lib/navigationActionTracker";
import { dispatchLouisMoment } from "../../../lib/louisMoments";

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

  return [
    `You are stepping into day ${day.day_number} of ${devotional.title}.`,
    `Today is about ${topic}.`,
    snippet,
    "Read the devotional, then do the Bible reading, and answer the reflection question.",
    "Start reading and I am always here if you have a question.",
  ].join("\n\n");
}

export default function DevotionalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const devotionalId = params.id as string;

  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [days, setDays] = useState<DevotionalDay[]>([]);
  const [progress, setProgress] = useState<Map<number, DayProgress>>(new Map());
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profileStats, setProfileStats] = useState<any>(null);
  const [selectedDay, setSelectedDay] = useState<DevotionalDay | null>(null);
  const [selectedBibleReading, setSelectedBibleReading] = useState<{ book: string; chapter: number } | null>(null);
  const [showCreditBlocked, setShowCreditBlocked] = useState(false);
  const [showReadingRequiredModal, setShowReadingRequiredModal] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [freeDevotionalId, setFreeDevotionalId] = useState<string | null | undefined>(undefined);
  const [showChooseFreeModal, setShowChooseFreeModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [pendingDayClick, setPendingDayClick] = useState<DevotionalDay | null>(null);
  const handledLouisDayRef = useRef<string | null>(null);

  useEffect(() => {
    async function loadUserAndProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
      setUserEmail(user?.email || null);
      if (user?.id) {
        const { data: stats } = await supabase
          .from("profile_stats")
          .select("is_paid, free_devotional_id")
          .eq("user_id", user.id)
          .maybeSingle();
        setProfileStats(stats);
        setFreeDevotionalId((stats as any)?.free_devotional_id ?? null);
      } else {
        setFreeDevotionalId(null);
      }
    }
    loadUserAndProfile();
  }, []);

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
          router.push("/devotionals");
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
          const { data: progressData, error: progressError } = await supabase
            .from("devotional_progress")
            .select("*")
            .eq("user_id", userId)
            .eq("devotional_id", devotionalId);

          if (!progressError && progressData) {
            const progressMap = new Map<number, DayProgress>();
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

  // Calculate current day and progress
  const getCurrentDay = () => {
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
  const completedDays = Array.from(progress.values()).filter((p) => p.is_completed).length;
  const progressPercent = devotional ? (completedDays / devotional.total_days) * 100 : 0;
  const previewDescription = devotional
    ? getPreviewDescription(devotional.title, devotional.description)
    : "";

  const isDayUnlocked = (dayNumber: number) => {
    if (userEmail === "moorelouis3@gmail.com") return true;
    if (dayNumber === 1) return true;
    const prevDayProgress = progress.get(dayNumber - 1);
    return prevDayProgress?.is_completed === true;
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

    // Free user logic — wait until freeDevotionalId is loaded
    if (isFreeUser && freeDevotionalId !== undefined) {
      if (freeDevotionalId === devotionalId) {
        // This IS their free devotional — open freely
        setShowCreditBlocked(false);
        setSelectedDay(day);
      } else if (freeDevotionalId === null) {
        // No free devotional chosen yet — ask them
        setPendingDayClick(day);
        setShowChooseFreeModal(true);
      } else {
        // They already chose a different devotional — upgrade wall
        setShowUpgradeModal(true);
      }
      return;
    }

    // Paid user (or owner) — existing consume-credit logic
    const dayProgress = progress.get(day.day_number);
    const isCompleted = dayProgress?.is_completed === true;

    if (isCompleted) {
      setShowCreditBlocked(false);
      setSelectedDay(day);
      return;
    }

    const creditResult = await consumeCreditAction(ACTION_TYPE.devotional_day_viewed, { userId });
    if (creditResult.ok === false) {
      setShowCreditBlocked(true);
      setSelectedDay(day);
      return;
    }

    setShowCreditBlocked(false);
    setSelectedDay(day);
  };

  useEffect(() => {
    if (!devotional || days.length === 0) return;

    const requestedDay = Number.parseInt(searchParams.get("day") || "", 10);
    const fromLouisDaily = searchParams.get("from") === "louis-daily";

    if (!requestedDay || Number.isNaN(requestedDay) || !fromLouisDaily) {
      return;
    }

    const requestKey = `${devotionalId}:${requestedDay}`;
    if (handledLouisDayRef.current === requestKey) {
      return;
    }

    const day = days.find((entry) => entry.day_number === requestedDay);
    if (!day) {
      handledLouisDayRef.current = requestKey;
      router.replace(`/devotionals/${devotionalId}`);
      return;
    }

    handledLouisDayRef.current = requestKey;

    void (async () => {
      await handleDayClick(day);
      dispatchLouisMoment({
        message: buildLouisDayStartMessage(devotional, day),
        replies: [
          {
            id: `devotional-close-${devotional.id}-${day.day_number}`,
            label: "Close",
            close: true,
          },
        ],
      });
      router.replace(`/devotionals/${devotionalId}`);
    })();
  }, [days, devotional, devotionalId, router, searchParams]);

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
      setSelectedDay(pendingDayClick);
      setPendingDayClick(null);
    }
  };

  const sendDevotionalLouisMoment = (dayNumber: number) => {
    if (!devotional) return;

    const nextDay = dayNumber + 1;
    const hasNextDay = devotional.total_days >= nextDay;
    const isTestingOfJoseph = devotional.title === "The Testing of Joseph";

    dispatchLouisMoment({
      message: hasNextDay
        ? `Great job. You just completed day ${dayNumber} of ${devotional.title}.\n\nThat's how real Bible habits get built.\n\nTomorrow, come back and I'll walk you into day ${nextDay}.\n\nAnd before you leave, you could reinforce this by jumping into something interactive.`
        : `Great job. You just finished ${devotional.title}.\n\nThat's a real win.\n\nNow would be a good time to lock some of it in with something interactive or go start your next devotional.`,
      replies: [
        hasNextDay
          ? {
              id: `devotional-next-${devotional.id}-${nextDay}`,
              label: `Come back for day ${nextDay}`,
              message: `When you come back, I'll point you straight into day ${nextDay} of ${devotional.title}. Just keep showing up one day at a time.`,
            }
          : {
              id: `devotional-back-${devotional.id}`,
              label: "Pick another devotional",
              href: "/devotionals",
            },
        isTestingOfJoseph
          ? {
              id: `devotional-trivia-${devotional.id}-${dayNumber}`,
              label: "Try Joseph trivia",
              href: "/bible-trivia/joseph",
            }
          : {
              id: `devotional-games-${devotional.id}-${dayNumber}`,
              label: "Try a Bible game",
              href: "/bible-study-games",
            },
        {
          id: `devotional-talk-${devotional.id}-${dayNumber}`,
          label: "What should I take from this?",
          message: `Sit with what stood out to you most from day ${dayNumber}. If one part keeps sticking, that's probably the part God wants you to carry with you today.`,
        },
      ],
    });
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

      // Route new devotional completion into Louis instead of a separate celebration modal
      if (!wasAlreadyCompleted && devotional) {
        sendDevotionalLouisMoment(dayNumber);
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
      }
    } catch (err) {
      console.error("Error updating reading status:", err);
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
      }).catch((error) => console.error("[NAV] Failed to track devotional reflection save:", error));
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-gray-500">Loading devotional...</div>
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
        customBody={"This devotional is part of the Bible Buddy Pro library. Upgrade to unlock full access to all devotionals, deeper studies, and future releases."}
        primaryButtonText="Upgrade to Pro"
        secondaryButtonText="Maybe Later"
        onPrimary={() => router.push('/upgrade')}
        onClose={() => {
          setShowProModal(false);
          router.push('/devotionals');
        }}
      />
    );
  }

  if (!devotional) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-gray-500">Devotional not found.</div>
          <Link href="/devotionals" className="text-blue-600 hover:underline mt-4 inline-block">
            ← Back to Devotionals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* HEADER */}
        <Link href="/devotionals" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Devotionals
        </Link>

        <h1 className="text-3xl font-bold mb-2">{devotional.title}</h1>
        <p className="text-gray-600 mb-4">{devotional.subtitle}</p>

        {/* DEVOTIONAL COVER */}
        {getCoverImage(devotional.title) && (
          <div className="flex justify-center my-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <img
                src={getCoverImage(devotional.title)!}
                alt={`${devotional.title} cover`}
                className="rounded-lg w-[240px] h-auto object-contain"
              />
            </div>
          </div>
        )}

        {/* PROGRESS */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Day {currentDay} of {devotional.total_days}
            </span>
            <span className="text-sm text-gray-500">{completedDays} completed</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {previewDescription}
          </p>
        </div>

        {/* DAYS LIST */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Days</h2>
          <div className="space-y-2">
            {days.map((day) => {
              const dayProgress = progress.get(day.day_number);
              const isUnlocked = isDayUnlocked(day.day_number);
              const isCompleted = dayProgress?.is_completed === true;

              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => handleDayClick(day)}
                  disabled={!isUnlocked}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                    isCompleted
                      ? "bg-green-50 border-green-300 hover:bg-green-100"
                      : isUnlocked
                      ? "bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer"
                      : "bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-700">Day {day.day_number}</span>
                      <span className="text-gray-700">{day.day_title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isUnlocked && (
                        <svg
                          className="w-5 h-5 text-gray-400"
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
                      {isCompleted && (
                        <span className="text-green-600 font-semibold">✓ Complete</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DAY MODAL */}
      {selectedDay && (
        <DevotionalDayModal
          day={selectedDay}
          dayProgress={progress.get(selectedDay.day_number)}
          showCreditBlocked={showCreditBlocked}
          onClose={() => setSelectedDay(null)}
          onBibleReadingClick={handleBibleReadingClick}
          onReadingComplete={() => handleReadingComplete(selectedDay.day_number)}
          onReflectionSave={(text) => handleReflectionSave(selectedDay.day_number, text)}
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
              You must complete the assigned Bible reading before marking this day as complete.
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
            <h2 className="text-xl font-bold text-gray-900 mb-3">🎁 You have one free devotional</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              As a free user, you're gifted <strong>one complete devotional</strong> — all {devotional.total_days} days, fully unlocked.
              <br /><br />
              Once you choose, this will be your free devotional. Is <strong>{devotional.title}</strong> the one you want to start?
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

      {/* UPGRADE MODAL — free user on a non-free devotional */}
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
            <h2 className="text-xl font-bold text-gray-900 mb-3">Unlock All Devotionals</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              You've already started your free devotional. Upgrade to Bible Buddy Pro to unlock every devotional — including this one — plus all future releases.
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
