"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LouisAvatar } from "./LouisAvatar";
import { ModalShell } from "./ModalShell";
import type { ChecklistData, TaskState } from "./LouisDailyTasksModal";
import type { DailyRecommendation } from "../lib/dailyRecommendation";
import { supabase } from "../lib/supabaseClient";
import { rememberLouisDailyTaskTarget } from "../lib/louisDailyFlow";

type LevelInfo = {
  level: number;
  levelName: string;
  identityText: string;
  encouragementText: string;
  totalPoints: number;
  levelStart: number;
  levelEnd: number;
  pointsToNextLevel: number;
  progressPercent: number;
};

type ProfileShape = {
  is_paid?: boolean | null;
  daily_credits?: number | null;
  last_active_date?: string | null;
  verse_of_the_day_shown?: string | null;
  current_streak?: number | null;
  profile_image_url?: string | null;
  display_name?: string | null;
  username?: string | null;
} | null;

type ExploreLink = {
  key: string;
  title: string;
  subtitle: string;
  href: string;
  accent: string;
  eyebrow: string;
  emoji: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type Props = {
  userId: string | null;
  userName: string;
  profile: ProfileShape;
  levelInfo: LevelInfo | null;
  primaryRecommendation: DailyRecommendation | null;
  checklistData: ChecklistData | null;
  isLoadingChecklist: boolean;
  dailyTaskTimeLeftLabel: string | null;
  membershipStatus: string | null;
  daysRemaining: number | null;
  exploreLinks: ExploreLink[];
  onOpenLevelInfo: () => void;
  onOpenStreakInfo: () => void;
  onOpenDailyTasks: () => void;
  onTaskClick: (task: TaskState) => void;
  cycleStartedAt: string | null;
  onDevotionalChanged: () => void;
};

type DevotionalOption = {
  id: string;
  title: string;
  total_days: number | null;
};

function getTaskStatusCopy(task: TaskState) {
  if (task.done) return task.completedAtLabel || "Completed";
  if (task.disabled) return "Finish the earlier task first.";
  return "Tap to continue";
}

function getTaskPillClasses(task: TaskState) {
  if (task.done) return "bg-green-100 text-green-700";
  if (task.disabled) return "bg-gray-200 text-gray-500";
  return "bg-[#dde8fb] text-[#5570a3]";
}

function getTaskCardCopy(task: TaskState, index: number) {
  const number = index + 1;

  if (task.kind === "devotional") {
    return {
      title: `${number}. Read Chapter Intro`,
      subtitle: "Understand what you are about to read before you begin the chapter.",
      emoji: "📕",
      doneAccent: "from-[#4fc877] to-[#34b866]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "reading") {
    return {
      title: `${number}. ${task.title}`,
      subtitle: "Read today's Bible chapter and reflect on it.",
      emoji: "✝️",
      doneAccent: "from-[#4fc877] to-[#34b866]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "notes") {
    return {
      title: `${number}. ${task.title}`,
      subtitle: "Read and study the notes to understand more deeply.",
      emoji: "📝",
      doneAccent: "from-[#4fc877] to-[#34b866]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "trivia") {
    return {
      title: `${number}. ${task.title}`,
      subtitle: "Test your understanding with 5 quick questions.",
      emoji: "🧠",
      doneAccent: "from-[#4fc877] to-[#34b866]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  if (task.kind === "reflection") {
    return {
      title: `${number}. Answer The Reflection Question`,
      subtitle: "Share what this chapter is stirring in you.",
      emoji: "âœï¸",
      doneAccent: "from-[#4fc877] to-[#34b866]",
      idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
    };
  }

  return {
    title: `${number}. ${task.title}`,
    subtitle: "Unscramble words from today's chapter.",
    emoji: "🔤",
    doneAccent: "from-[#4fc877] to-[#34b866]",
    idleAccent: "from-[#dbeafe] to-[#bfdbfe]",
  };
}

function getTaskStatusLine(task: TaskState) {
  if (task.done) return task.completedAtLabel || "Completed today";
  if (task.disabled) return "Locked";
  return "Not started";
}

function getTaskEmoji(task: TaskState) {
  if (task.kind === "devotional") return "\uD83D\uDCD5";
  if (task.kind === "reading") return "\u271D\uFE0F";
  if (task.kind === "notes") return "\uD83D\uDCDD";
  if (task.kind === "trivia") return "\uD83E\uDDE0";
  if (task.kind === "reflection") return "\u270D\uFE0F";
  return "\uD83D\uDD24";
}

function getDailyStudyCardClasses(allDone: boolean) {
  if (allDone) {
    return "border-green-200 bg-gradient-to-br from-[#ecfff2] via-[#f8fffb] to-[#e7f8ee]";
  }

  return "border-[#ecd8b2] bg-gradient-to-br from-[#fff6e8] via-[#fffaf2] to-[#fff2db]";
}

const louisProgressOpeners: Record<number, string[]> = {
  0: [
    "Let's start today with a steady first step.",
    "This is a good place to begin today's Bible rhythm.",
    "Start here and let the rest of the Bible study build from this.",
    "Let's open the day by slowing down with the Bible study intro.",
    "First step for today: get your heart settled in the story.",
    "Let's begin clean and simple with today's Bible study intro.",
    "This first task sets the tone for the whole Bible study flow.",
    "Start with the Bible study intro and let the chapter come into focus.",
    "Let's ease into the Word with the first part of today's Bible study.",
    "A good day of study starts with one honest beginning.",
    "Let's get today's Bible study moving with the intro.",
    "Start here, take your time, and let the story breathe a little.",
    "The first task is ready, and this is where momentum starts.",
    "Let's begin with the Bible study intro before we move into the chapter.",
    "Today's Bible study starts with preparing your heart.",
    "Open with the Bible study intro and let it frame the rest of the tasks.",
    "Let's make the first move and start today's Bible study well.",
    "Begin here, then we will keep walking through the chapter together.",
    "This is the doorway into today's Bible study flow.",
    "Let's start with the Bible study intro and build from there.",
  ],
  1: [
    "Great job getting started.",
    "Nice work finishing the first step.",
    "You're moving now, and the next step is clear.",
    "Good start. Let's keep the rhythm going.",
    "That first task is done, so let's build on it.",
    "You showed up and started well.",
    "Good momentum. Now let's take the chapter itself.",
    "That's the opening step finished.",
    "You're not just thinking about studying today, you're doing it.",
    "The Bible study intro is behind you, and the chapter is ready.",
    "Strong start. Let's stay with the story.",
    "You have the setup now, so let's read the text.",
    "Good work. The next step brings you straight into Scripture.",
    "You started with the Bible study intro, and now we keep going.",
    "Nice first move. Let's continue while the story is fresh.",
    "You have one task down and the day is taking shape.",
    "Good pace. Now let's move from the intro into the chapter.",
    "That's one completed step. Let's keep it simple and steady.",
    "You opened the door. Now let's walk into the chapter.",
    "Great start. The next task keeps today's focus grounded in Scripture.",
  ],
  2: [
    "Wow, you're on a roll.",
    "Nice work. The foundation is set now.",
    "You have the intro and reading done, so let's go deeper.",
    "Good rhythm today. Now we slow down and understand more.",
    "You're halfway through the main study flow.",
    "Strong progress. The notes will help the chapter settle in.",
    "You're building real understanding now.",
    "That reading matters. Now let's unpack what you read.",
    "Good work staying with it.",
    "You have the text in front of you now, so let's study it closer.",
    "You're moving from reading into understanding.",
    "This is where the chapter starts to click.",
    "Nice pace. Let's make sure the meaning lands.",
    "You're doing more than checking boxes today.",
    "Great job. The next task helps connect the details.",
    "The story is open now, so let's look under the hood.",
    "You're doing well. Let's turn the reading into insight.",
    "Good progress. The notes are the next smart step.",
    "You have the chapter read. Now let's make it stick.",
    "You're building the kind of study habit that actually grows.",
  ],
  3: [
    "Okay, you're almost done for today.",
    "You're close now, so let's check your understanding.",
    "Great work. Now let's see what you remember.",
    "You have studied the chapter, so let's test it gently.",
    "This is the fun review step.",
    "You're three tasks in, and now it is time to lock it in.",
    "Nice work. A few questions will help the chapter stick.",
    "You're close to finishing today's Bible study.",
    "The reading and notes are done. Now let's practice recall.",
    "Good job staying with the flow.",
    "You're almost there. Let's turn study into memory.",
    "This next step helps you see what landed.",
    "Great pace. Let's check the chapter with a quick round.",
    "You have done the careful part. Now let's review it.",
    "Strong day so far. Let's keep the energy up.",
    "You're in the final stretch now.",
    "Good work. Let's see how much of the chapter is sticking.",
    "The chapter is fresh, so trivia is the right next move.",
    "You're nearly finished. Let's make the understanding active.",
    "Nice progress. Time to test what you just studied.",
  ],
  4: [
    "One more task to go.",
    "Final step for today.",
    "You're right at the finish line.",
    "Almost done. Let's finish strong.",
    "Last task, and today's Bible study is complete.",
    "You're one step away from the final reflection.",
    "Great work. Let's close the loop.",
    "This is the final piece for today's chapter.",
    "You have done the study work. Now let's finish with the word game.",
    "One more round and the day is complete.",
    "You're close enough to see the finish.",
    "Let's land the plane with the final task.",
    "Last move. Keep the momentum for a few more minutes.",
    "You have one task left, and this is the fun one.",
    "Almost there. Let's wrap today's chapter study.",
    "The hard part is behind you. One final step remains.",
    "You're nearly done. Let's finish with Scrambled.",
    "One more task, then the full daily flow is complete.",
    "This is the closing step for today's study.",
    "Finish strong with the final round.",
  ],
  5: [
    "One more task to go.",
    "Final step for this chapter study.",
    "You're right at the finish line.",
    "Almost done. Let's finish with reflection.",
    "Last task, and this chapter study is complete.",
    "You're one step away from finishing all six.",
    "Great work. Let's close the loop with your reflection.",
    "This is the final piece for today's chapter.",
    "One reflection and the chapter study is complete.",
    "You're close enough to see the finish.",
    "Let's land this chapter with an honest thought.",
    "Last move. Take a minute and write what stood out.",
    "You have one task left, and this is where the study becomes personal.",
    "Almost there. Let's wrap today's chapter study.",
    "The hard part is behind you. One thoughtful response remains.",
    "You're nearly done. Let's finish with reflection.",
    "One more task, then the full chapter flow is complete.",
    "This is the closing step for the study.",
    "Finish strong with your reflection.",
  ],
};

function stableHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function pickLouisProgressOpener(completedCount: number, seed: string) {
  const bucket = louisProgressOpeners[Math.max(0, Math.min(5, completedCount))] ?? louisProgressOpeners[0];
  return bucket[stableHash(seed) % bucket.length];
}

function getTaskNumberLabel(task: TaskState | null) {
  if (!task) return "the next task";
  if (task.kind === "devotional") return "task 1";
  if (task.kind === "reading") return "task 2";
  if (task.kind === "notes") return "task 3";
  if (task.kind === "trivia") return "task 4";
  if (task.kind === "scrambled") return "task 5";
  return "task 6";
}

function getChapterFocusSummary(task: TaskState | null) {
  const book = (task?.book || "").toLowerCase().trim();
  const chapter = task?.chapter ?? null;
  const chapterLabel = task?.chapterLabel || (task?.book && task?.chapter ? `${task.book} ${task.chapter}` : "today's chapter");

  if (book === "genesis") {
    if (chapter === 37) return "Joseph's dreams, his brothers' jealousy, and the betrayal that sends him toward Egypt.";
    if (chapter === 38) return "Judah's family story, broken choices, and God's mercy in the middle of the mess.";
    if (chapter === 39) return "Joseph in Potiphar's house, where faithfulness is tested by temptation and injustice.";
    if (chapter === 40) return "Joseph in prison with the cupbearer and baker while he is still waiting on God.";
    if (chapter === 41) return "Joseph going from prison to Pharaoh as God turns hidden preparation into public purpose.";
    if (chapter === 42) return "Joseph's brothers coming to Egypt as guilt, famine, and God's long plan begin to surface.";
    if (chapter === 43) return "the brothers returning with Benjamin and facing mercy they do not yet understand.";
    if (chapter === 44) return "Judah being tested and offering himself in Benjamin's place.";
    if (chapter === 45) return "Joseph revealing who he is and forgiveness breaking into a painful family story.";
    if (chapter === 46) return "Jacob moving to Egypt and hearing God promise to stay with him.";
    if (chapter === 47) return "Joseph leading through famine and Israel settling in Egypt under God's provision.";
    if (chapter === 48) return "Jacob blessing Joseph's sons and trusting God's promise for the next generation.";
    if (chapter === 49) return "Jacob's final words over his sons and the future God is shaping for Israel.";
    if (chapter === 50) return "grief, forgiveness, and Joseph's confidence that God meant it for good.";
  }

  if (book === "proverbs") {
    if (chapter === 1) return "the start of wisdom and why the fear of the Lord comes first.";
    if (chapter === 2) return "searching for wisdom like treasure and letting God guard your path.";
    if (chapter === 3) return "trusting the Lord, walking humbly, and valuing wisdom more than riches.";
    if (chapter === 4) return "getting wisdom, staying on the right path, and guarding your heart.";
    if (chapter === 5) return "staying faithful and seeing where destructive desire really leads.";
    if (chapter === 6) return "diligence, pride, reckless choices, and the habits that can quietly hurt a life.";
    if (chapter === 7) return "how temptation pulls people in when they drift too close to danger.";
    if (chapter === 8) return "Wisdom calling out in the open and showing why she is worth seeking.";
    if (chapter === 9) return "the two invitations of Wisdom and Folly and which table you choose.";
    if (chapter === 10) return "the daily patterns that separate wisdom from foolishness.";
    if (chapter === 11) return "integrity, humility, generosity, and living honestly before God.";
    if (chapter === 12) return "correction, steady work, truth-telling, and words that heal.";
    if (chapter === 13) return "discipline, teachability, careful speech, and long-term wisdom.";
    if (chapter === 14) return "the way that seems right and why wisdom looks deeper than first impressions.";
    if (chapter === 15) return "gentle answers, teachable hearts, prayer, and wise speech.";
    if (chapter === 16) return "making plans while trusting that the Lord weighs motives and directs steps.";
    if (chapter === 17) return "family, friendship, conflict, restraint, and the wisdom relationships need.";
    if (chapter === 18) return "listening well, choosing humility, and using words that give life.";
    if (chapter === 19) return "patience, generosity, discipline, and God's purpose over human plans.";
    if (chapter === 20) return "work, conflict, counsel, honesty, and self-control in everyday life.";
    if (chapter === 21) return "the heart God weighs and the justice He values more than appearances.";
    if (chapter === 22) return "a good name, humility, training, generosity, and wise boundaries.";
    if (chapter === 23) return "appetite, envy, drunkenness, and desires that need wisdom's guardrails.";
    if (chapter === 24) return "refusing to envy evil and choosing counsel, courage, and faithful work.";
    if (chapter === 25) return "humility, patience, restraint, and words spoken at the right time.";
    if (chapter === 26) return "folly, laziness, meddling, gossip, and the discernment to know what to avoid.";
    if (chapter === 27) return "tomorrow, faithful friendship, correction, and careful stewardship.";
    if (chapter === 28) return "confession, justice, generosity, courage, and the difference between wickedness and righteousness.";
    if (chapter === 29) return "receiving correction and escaping the trap of fearing people more than God.";
    if (chapter === 30) return "Agur's humility, daily bread, and the wisdom God teaches through creation.";
    if (chapter === 31) return "wisdom that serves, speaks for the vulnerable, works faithfully, and fears the Lord.";
  }

  return `what God is showing you in ${chapterLabel}.`;
}

function buildTaskFocusLine(task: TaskState | null, remainingTasks: number) {
  if (!task) {
    return "Your next Bible step is ready whenever you are.";
  }

  const chapterLabel = task.chapterLabel || "today's chapter";
  const chapterSummary = getChapterFocusSummary(task);

  if (task.kind === "devotional") {
    return `Continue ${chapterLabel}. This chapter is about ${chapterSummary}`;
  }

  if (task.kind === "reading") {
    return `You've read the ${chapterLabel} intro. Now continue with ${chapterLabel} and stay with ${chapterSummary}`;
  }

  if (task.kind === "notes") {
    return `Good work getting the chapter read. Now review the notes so ${chapterSummary} starts to click.`;
  }

  if (task.kind === "trivia") {
    return `You have the reading and notes down. Play trivia for ${chapterLabel} and see what you remember.`;
  }

  if (task.kind === "scrambled") {
    return `You are almost done. Play Scrambled for ${chapterLabel} and let the chapter words stick.`;
  }

  return `One more task to go. Share your reflection for ${chapterLabel} and complete this chapter study.`;
}

const bibleStudyThemeMaps: Record<string, string[]> = {
  "the obedience of abraham": [
    "Abraham's family before the call",
    "God calling Abraham to leave what was familiar",
    "trusting God enough to let go",
    "courage for family",
    "God's promise under the stars",
    "waiting when impatience gets dangerous",
    "covenant, new names, and belonging to God",
    "the God who draws near",
    "mercy, judgment, and intercession",
    "old fears returning after real faith",
    "Isaac arriving after years of waiting",
    "Abraham's deepest test",
    "the Lord providing",
    "grief in the land of promise",
    "preparing for the next generation",
    "a life full of years",
    "faith that obeys without seeing the whole map",
    "believing the God who gives life",
    "faith that moves into action",
    "blessing beyond Abraham's lifetime",
    "a life marked by obedience",
  ],
  "the calling of moses": [
    "Moses' birth under threat",
    "Moses between Egypt and Israel",
    "Moses in the wilderness after failure",
    "God at the burning bush",
    "fear meeting God's call",
    "Moses returning to Egypt",
    "Pharaoh resisting God",
    "the plagues exposing false power",
    "Passover and rescue",
    "Israel leaving Egypt",
    "the Red Sea deliverance",
    "trust growing in the wilderness",
    "daily provision through manna",
    "water from the rock",
    "Sinai and covenant",
    "the golden calf and intercession",
    "God's presence going with His people",
    "leadership and shared burden",
    "obedience under pressure",
    "seeing the promised land",
    "Moses' life as a servant shaped by God's call",
  ],
  "the disciples of jesus": [
    "Jesus calling ordinary people",
    "Peter leaving the nets",
    "Andrew bringing others to Jesus",
    "James and John learning kingdom ambition",
    "Matthew leaving the tax booth",
    "Thomas bringing honest questions",
    "Philip learning to trust Jesus",
    "Nathanael being seen",
    "Simon laying down old loyalties",
    "Judas and the divided heart",
    "disciples in the storm",
    "Jesus feeding the crowds",
    "Peter confessing Christ",
    "a glimpse of glory",
    "the Last Supper and servant leadership",
    "Gethsemane and weakness",
    "Peter's denial",
    "restoration after failure",
    "the Great Commission",
    "the Spirit empowering witnesses",
    "following Jesus for a lifetime",
  ],
  "the faith of job": [
    "Job's faith before suffering",
    "loss without explanation",
    "honest grief before God",
    "friends who misunderstand pain",
    "wrestling with righteous suffering",
    "refusing shallow answers",
    "feeling unseen by God",
    "wisdom that cannot be bought",
    "remembering former days",
    "defending integrity",
    "Elihu entering the conversation",
    "God speaking from the whirlwind",
    "creation humbling certainty",
    "reverence beyond answers",
    "God confronting false comfort",
    "restoration after suffering",
    "faith through unanswered questions",
    "lament as real trust",
    "the limits of human wisdom",
    "God's greatness in suffering",
    "endurance that still worships",
  ],
  "the heart of david": [
    "David being chosen while overlooked",
    "the shepherd learning trust",
    "Goliath and courage rooted in God",
    "jealousy after victory",
    "David hunted but not abandoned",
    "Jonathan's friendship",
    "David in the wilderness",
    "strengthening himself in the Lord",
    "refusing revenge",
    "Abigail and wisdom in conflict",
    "trusting God's timing again",
    "David becoming king over Judah",
    "uniting the kingdom",
    "worship with abandon",
    "God's covenant promise",
    "David's fall",
    "repentance after sin",
    "mercy and consequences",
    "David fleeing Absalom",
    "praise after deliverance",
    "David's final charge and legacy",
  ],
  "the courage of daniel": [
    "Jerusalem falling and exile beginning",
    "faithfulness in a new world",
    "God revealing secrets",
    "faith inside the fire",
    "a proud king humbled",
    "the writing on the wall",
    "prayer above survival",
    "beasts and God's throne",
    "history under God's rule",
    "Daniel's prayer reaching heaven",
    "the unseen battle",
    "wars under God's sovereignty",
    "resurrection hope",
    "why exile came",
    "living faithfully in Babylon",
    "Daniel remembered as righteous",
    "the spirit behind proud thrones",
    "staying rooted by water",
    "refusing to conform",
    "testing that produces endurance",
    "windows open toward heaven",
  ],
  "the rise of esther": [
    "exile before Esther",
    "God's people away from home",
    "return and rebuilding",
    "a royal feast and a queen removed",
    "Esther entering the palace",
    "Mordecai and hidden faithfulness",
    "Haman's pride rising",
    "a decree against God's people",
    "Esther facing her moment",
    "fasting before courage",
    "Esther entering the court",
    "Haman's plot turning",
    "the sleepless night",
    "honor coming to Mordecai",
    "Esther exposing Haman",
    "deliverance taking shape",
    "God's reversal of evil plans",
    "Purim and remembered rescue",
    "courage for such a time as this",
    "hidden providence",
    "Esther's rise and God's unseen hand",
  ],
  "the transforming of paul": [
    "Saul at Stephen's death",
    "Saul breathing threats",
    "Jesus meeting Saul on the road",
    "three days in the dark",
    "a changed man received by the church",
    "Paul set apart for the work",
    "driven out but still moving",
    "the fight for grace",
    "singing in prison",
    "reasoning in Athens",
    "the Lord saying do not be afraid",
    "revival and resistance in Ephesus",
    "Paul's farewell",
    "bound for Jerusalem",
    "Paul telling his story",
    "taking courage in custody",
    "two years waiting",
    "almost persuaded",
    "storm and shipwreck",
    "preaching in chains",
    "finishing the race",
  ],
  "women of the bible": [
    "women shaping God's story",
    "women before Jesus",
    "Jesus honoring and restoring women",
    "Eve and the first promise",
    "Sarah laughing at the impossible",
    "Hagar and the God who sees",
    "Rebekah choosing into God's story",
    "Rachel and Leah's pain",
    "Miriam leading worship",
    "Rahab's unlikely faith",
    "Deborah leading with courage",
    "Ruth's loyalty beyond loss",
    "Hannah praying through pain",
    "Bathsheba and grace beyond tragedy",
    "Esther stepping into courage",
    "Mary saying yes",
    "Mary Magdalene as first witness",
    "the woman at the well",
    "the woman who touched Jesus' robe",
    "Priscilla teaching with clarity",
    "what these women's lives mean",
  ],
  "the tempting of jesus": [
    "the enemy's tricks and Jesus' victory",
    "Jesus entering the wilderness",
    "why fighting temptation is hard",
    "the steps temptation takes",
    "Jesus at twelve",
    "hidden preparation",
    "John preparing the way",
    "Jesus' baptism",
    "the Trinity revealed",
    "the Spirit leading Jesus into wilderness",
    "stones into bread",
    "living by God's Word",
    "Israel's wilderness story",
    "how Jesus answers temptation",
    "all the kingdoms",
    "worshiping God only",
    "the pride of life",
    "refusing to test God",
    "power surrendered to purpose",
    "the armor of God",
    "never being alone in temptation",
  ],
  "the testing of joseph": [
    "Joseph's dreams and family jealousy",
    "Judah, Tamar, and the family line",
    "Joseph's faithfulness under temptation",
    "Joseph waiting in prison",
    "Joseph interpreting Pharaoh's dreams",
    "the brothers facing famine and guilt",
    "Benjamin and family pressure",
    "Judah offering himself",
    "Joseph revealing himself",
    "Jacob moving to Egypt",
    "Joseph leading through famine",
    "Jacob blessing Joseph's sons",
    "Jacob's final words",
    "Joseph forgiving what was meant for evil",
  ],
  "the wisdom of proverbs": [],
  "the gospel of luke": [
    "Luke's careful account of Jesus",
    "announcements of hope",
    "Jesus' birth and good news for the lowly",
    "Jesus growing in wisdom",
    "John preparing the way",
    "Jesus beginning His mission",
    "calling disciples and healing the broken",
    "the kingdom reversing expectations",
    "faith, forgiveness, and following Jesus",
    "Jesus sending His followers",
    "mercy like the Good Samaritan",
    "prayer, trust, and hearing Jesus",
    "repentance and readiness",
    "the lost being found",
    "costly discipleship",
    "the rich, the poor, and the kingdom",
    "Jesus on the road to Jerusalem",
    "Zacchaeus and salvation coming home",
    "Jesus entering Jerusalem",
    "the cross drawing near",
    "the risen Jesus opening eyes and Scripture",
  ],
  "ruth": [
    "loss in Bethlehem and Moab",
    "Ruth's loyal choice",
    "returning empty but not abandoned",
    "gleaning under God's providence",
    "Boaz noticing Ruth with kindness",
    "refuge under God's wings",
    "Naomi beginning to hope",
    "the threshing floor and courageous trust",
    "Boaz acting as redeemer",
    "a family line restored",
    "Ruth in David's story",
    "ordinary faithfulness becoming redemption",
  ],
};

function normalizeStudyTitle(value: string | null | undefined) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function getStudyTheme(task: TaskState | null, offset = 0) {
  const studyKey = normalizeStudyTitle(task?.devotionalTitle || task?.devotionalId);
  const exactKey = Object.keys(bibleStudyThemeMaps).find((key) => studyKey === key || studyKey.includes(key) || key.includes(studyKey));
  if (!exactKey) return null;
  const themes = bibleStudyThemeMaps[exactKey];
  if (!themes.length) return null;
  const rawNumber = task?.devotionalDayNumber || task?.chapter || 1;
  const index = Math.max(0, Math.min(themes.length - 1, rawNumber - 1 + offset));
  return themes[index] || null;
}

function getChapterStudyTheme(task: TaskState | null) {
  const studyTheme = getStudyTheme(task);
  if (studyTheme) return studyTheme;

  const book = (task?.book || "").toLowerCase().trim();
  const chapter = task?.chapter ?? null;

  if (book === "proverbs") {
    if (chapter === 1) return "where wisdom begins and why reverence for the Lord comes first";
    if (chapter === 2) return "searching for wisdom like treasure";
    if (chapter === 3) return "trusting the Lord with your whole path";
    if (chapter === 4) return "guarding your heart and staying on wisdom's road";
    if (chapter === 5) return "faithfulness and the danger of destructive desire";
    if (chapter === 6) return "habits, warnings, and the small choices that shape a life";
    if (chapter === 7) return "recognizing temptation before it pulls you in";
    if (chapter === 8) return "Wisdom calling out in the open";
    if (chapter === 9) return "the two invitations every heart has to choose between";
    if (chapter === 10) return "the everyday difference between wisdom and foolishness";
    if (chapter === 11) return "integrity, humility, and generous living";
    if (chapter === 12) return "truthful words, teachability, and steady work";
    if (chapter === 13) return "discipline, patience, and long-term wisdom";
    if (chapter === 14) return "seeing beneath what only looks right";
    if (chapter === 15) return "gentle answers and a teachable heart";
    if (chapter === 16) return "planning with humility before the Lord";
    if (chapter === 17) return "wisdom inside family, friendship, and conflict";
    if (chapter === 18) return "the weight of words and the power of listening";
    if (chapter === 19) return "patience, generosity, and God's purpose";
    if (chapter === 20) return "self-control, counsel, and honest work";
    if (chapter === 21) return "the heart God weighs and the justice He loves";
    if (chapter === 22) return "a good name, humility, and wise boundaries";
    if (chapter === 23) return "desire, appetite, and the guardrails wisdom gives";
    if (chapter === 24) return "courage, counsel, and refusing to envy evil";
    if (chapter === 25) return "humility, restraint, and words spoken at the right time";
    if (chapter === 26) return "spotting folly before it spreads";
    if (chapter === 27) return "faithful friendship, correction, and careful stewardship";
    if (chapter === 28) return "confession, justice, courage, and righteousness";
    if (chapter === 29) return "receiving correction and fearing God more than people";
    if (chapter === 30) return "humility, daily bread, and wisdom in creation";
    if (chapter === 31) return "wisdom lived with strength, service, and fear of the Lord";
    return "wisdom for real life";
  }

  if (book === "genesis") {
    if (chapter === 37) return "Joseph's dreams and the family wound that begins his testing";
    if (chapter === 38) return "Judah, Tamar, and God's work inside a broken family line";
    if (chapter === 39) return "Joseph's faithfulness under temptation and injustice";
    if (chapter === 40) return "Joseph waiting faithfully in prison";
    if (chapter === 41) return "God lifting Joseph from prison into purpose";
    if (chapter === 42) return "the brothers facing famine, guilt, and Joseph without knowing it";
    if (chapter === 43) return "Benjamin, mercy, and the pressure building in Joseph's family";
    if (chapter === 44) return "Judah stepping forward when Benjamin is tested";
    if (chapter === 45) return "Joseph revealing himself and forgiveness breaking through";
    if (chapter === 46) return "Jacob moving toward Egypt with God's promise over him";
    if (chapter === 47) return "Joseph leading through famine while Israel settles in Egypt";
    if (chapter === 48) return "Jacob blessing the next generation";
    if (chapter === 49) return "Jacob's final words and the future of Israel";
    if (chapter === 50) return "forgiveness, grief, and God meaning it for good";
    return "God's faithful work through the Joseph story";
  }

  return task?.chapterLabel ? `what ${task.chapterLabel} is teaching` : "the next part of this Bible study";
}

function buildCompletedChapterMessage({
  completedChapterLabel,
  nextChapterLabel,
  chapterTask,
}: {
  completedChapterLabel: string;
  nextChapterLabel: string;
  chapterTask: TaskState | null;
}) {
  const currentTheme = getChapterStudyTheme(chapterTask);
  const nextTask =
    chapterTask
      ? ({
          ...chapterTask,
          chapter: chapterTask.chapter ? chapterTask.chapter + 1 : chapterTask.chapter,
          devotionalDayNumber: chapterTask.devotionalDayNumber ? chapterTask.devotionalDayNumber + 1 : chapterTask.devotionalDayNumber,
          chapterLabel: nextChapterLabel,
        } as TaskState)
      : null;
  const nextTheme = getChapterStudyTheme(nextTask);
  const variants = [
    `Congrats on finishing ${completedChapterLabel}. Are you ready to step into ${nextChapterLabel} and keep following ${nextTheme}?`,
    `You finished ${completedChapterLabel}, and that is real progress. When you are ready, ${nextChapterLabel} will keep building on ${nextTheme}.`,
    `Great work finishing ${completedChapterLabel}. The next chapter opens the door to ${nextTheme}, so start ${nextChapterLabel} when you are ready.`,
    `${completedChapterLabel} is complete. Nice work staying with ${currentTheme}; now ${nextChapterLabel} is ready to take you into ${nextTheme}.`,
    `That chapter study is finished. You walked through ${completedChapterLabel}, and ${nextChapterLabel} is ready when you want to keep going with ${nextTheme}.`,
    `Well done. ${completedChapterLabel} is behind you now, and ${nextChapterLabel} is waiting with more of ${nextTheme}.`,
  ];

  return variants[stableHash(`${completedChapterLabel}:${nextChapterLabel}`) % variants.length];
}

function getShortTaskName(task: TaskState | null) {
  if (!task) return "today's last Bible study task";
  if (task.kind === "devotional") return "today's chapter intro";
  if (task.kind === "reading") return task.chapterLabel ? `reading ${task.chapterLabel}` : "today's chapter";
  if (task.kind === "notes") return task.chapterLabel ? `${task.chapterLabel} notes` : "today's notes";
  if (task.kind === "trivia") return "trivia";
  if (task.kind === "scrambled") return "Scrambled";
  if (task.kind === "reflection") return task.chapterLabel ? `the ${task.chapterLabel} reflection` : "the reflection";
  return task.title;
}

function buildDailyStudySummaryLine({
  allDone,
  completedTasks,
  remainingTasks,
  totalTasks,
  nextTask,
}: {
  allDone: boolean;
  completedTasks: number;
  remainingTasks: number;
  totalTasks: number;
  nextTask: TaskState | null;
}) {
  if (allDone) {
    return `Click the button below to start the next Chapter study.`;
  }

  if (remainingTasks <= 1) {
    return `${completedTasks} done. One step remains: ${getShortTaskName(nextTask)}.`;
  }

  if (completedTasks === 0) {
    return `Start this chapter study when you are ready.`;
  }

  return `${completedTasks} done. ${remainingTasks} steps left in this chapter study.`;
}

export default function DashboardJourneyExperience({
  userId,
  userName,
  profile,
  levelInfo,
  primaryRecommendation,
  checklistData,
  isLoadingChecklist,
  membershipStatus,
  daysRemaining,
  exploreLinks,
  onOpenLevelInfo,
  onOpenStreakInfo,
  onOpenDailyTasks,
  onTaskClick,
  cycleStartedAt,
  onDevotionalChanged,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previousDoneByKindRef = useRef<Record<string, boolean> | null>(null);
  const previousCompletedCountRef = useRef<number | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [celebratingTasks, setCelebratingTasks] = useState<Record<string, number>>({});
  const [progressCelebrationKey, setProgressCelebrationKey] = useState(0);
  const [showDevotionalSettings, setShowDevotionalSettings] = useState(false);
  const [showJourneyHelp, setShowJourneyHelp] = useState(false);
  const [devotionalOptions, setDevotionalOptions] = useState<DevotionalOption[]>([]);
  const [selectedDevotionalId, setSelectedDevotionalId] = useState("");
  const [isLoadingDevotionalOptions, setIsLoadingDevotionalOptions] = useState(false);
  const [isSavingDevotional, setIsSavingDevotional] = useState(false);
  const [isResettingDevotional, setIsResettingDevotional] = useState(false);
  const [devotionalSettingsMessage, setDevotionalSettingsMessage] = useState<string | null>(null);

  const totalTasks = checklistData?.tasks.length ?? 5;
  const completedTasks = checklistData?.completedCount ?? 0;
  const allDone = checklistData?.allDone ?? false;
  const nextTask = checklistData?.tasks.find((task) => !task.done) ?? null;
  const nextActionTaskKind = checklistData?.tasks.find((task) => !task.done && !task.disabled)?.kind ?? null;
  const currentDevotionalTask = checklistData?.tasks.find((task) => task.kind === "devotional") ?? null;
  const currentDevotionalId = currentDevotionalTask?.devotionalId || "";
  const isPaidUser = profile?.is_paid === true;
  const remainingTasks = Math.max(totalTasks - completedTasks, 0);
  const completedChapterLabel =
    checklistData?.tasks.find((task) => task.kind === "reading")?.chapterLabel ||
    checklistData?.tasks.find((task) => task.chapterLabel)?.chapterLabel ||
    "this chapter";
  const nextChapterLabel = (() => {
    const chapterTask = checklistData?.tasks.find((task) => task.book && task.chapter);
    if (!chapterTask?.book || !chapterTask.chapter || !checklistData?.nextJourneyTarget) return "the next chapter";
    return `${chapterTask.book} ${chapterTask.chapter + 1}`;
  })();
  const completedStudyActionLabel = checklistData?.nextJourneyTarget
    ? "Start next chapter"
    : "Pick a new Bible Study";
  const dailyStudySummaryLine = buildDailyStudySummaryLine({
    allDone,
    completedTasks,
    remainingTasks,
    totalTasks,
    nextTask,
  });
  const streak = profile?.current_streak ?? 0;
  const skeletonTasks = [
    { emoji: "📕", title: "Read Chapter Intro", subtitleWidth: "w-52" },
    { emoji: "✝️", title: "Read Chapter", subtitleWidth: "w-44" },
    { emoji: "📝", title: "Review Notes", subtitleWidth: "w-56" },
    { emoji: "🧠", title: "Play Trivia", subtitleWidth: "w-48" },
    { emoji: "🔤", title: "Play Scrambled", subtitleWidth: "w-52" },
    { emoji: "✍️", title: "Answer Reflection", subtitleWidth: "w-40" },
  ];
  const devotionalTask = checklistData?.tasks.find((task) => task.kind === "devotional") ?? null;
  const readingTask = checklistData?.tasks.find((task) => task.kind === "reading") ?? null;
  const chapterTask = readingTask || checklistData?.tasks.find((task) => task.book && task.chapter) || null;
  const greetingName = userName && userName !== "buddy" ? userName : "buddy";
  function buildLouisMessage() {
    const streakLine = `Hey ${greetingName}, you are on a ${streak} day streak.`;

    if (allDone) {
      return {
        streakLine,
        nextLine: "You finished every chapter task. Great job showing up.",
      };
    }

    if (!nextTask) {
      return {
        streakLine,
        nextLine: "Your next Bible step is ready whenever you are.",
      };
    }

    if (nextTask.kind === "devotional") {
      return {
        streakLine,
        nextLine: `Let's begin with the chapter intro so ${nextTask.chapterLabel || "today's chapter"} has context before you read.`,
      };
    }

    if (nextTask.kind === "reading") {
      return {
        streakLine,
        nextLine: devotionalTask?.done
          ? `You've read the ${readingTask?.chapterLabel || nextTask.chapterLabel || "chapter"} intro. Now keep going and read ${readingTask?.chapterLabel || nextTask.title}.`
          : `Keep going and read ${readingTask?.chapterLabel || nextTask.title}.`,
      };
    }

    if (nextTask.kind === "notes") {
      return {
        streakLine,
        nextLine: `Great job reading ${readingTask?.chapterLabel || "today’s chapter"}. Keep going and review the notes next.`,
      };
    }

    if (nextTask.kind === "trivia") {
      return {
        streakLine,
        nextLine: `Nice work on the reading and notes. Keep going and finish the trivia for ${readingTask?.chapterLabel || "today’s chapter"}.`,
      };
    }

    return {
      streakLine,
      nextLine: `You are almost done. Finish ${nextTask.title} to complete today’s Bible study.`,
    };
  }

  function buildLouisNextStepMessage() {
    if (allDone) {
      return {
        focusLine: buildCompletedChapterMessage({
          completedChapterLabel,
          nextChapterLabel,
          chapterTask,
        }),
      };
    }

    if (!nextTask) {
      return {
        focusLine: "Your next Bible step is ready whenever you are.",
      };
    }

    return {
      focusLine: buildTaskFocusLine(nextTask, remainingTasks),
    };
  }

  const louisMessage = buildLouisNextStepMessage();

  useEffect(() => {
    if (!showDevotionalSettings || !isPaidUser) return;

    let cancelled = false;

    async function loadDevotionalOptions() {
      setIsLoadingDevotionalOptions(true);
      setDevotionalSettingsMessage(null);

      const { data, error } = await supabase
        .from("devotionals")
        .select("id, title, total_days")
        .order("title", { ascending: true })
        .limit(100);

      if (cancelled) return;

      if (error) {
        console.error("[DASHBOARD] Could not load devotionals:", error);
        setDevotionalSettingsMessage("Louis could not load the Bible study list. Try again in a moment.");
        setDevotionalOptions([]);
      } else {
        const options = (data || []) as DevotionalOption[];
        setDevotionalOptions(options);
        setSelectedDevotionalId(currentDevotionalId || options[0]?.id || "");
      }

      setIsLoadingDevotionalOptions(false);
    }

    void loadDevotionalOptions();

    return () => {
      cancelled = true;
    };
  }, [showDevotionalSettings, isPaidUser, currentDevotionalId]);

  async function handleSaveDevotionalSetting() {
    if (!userId || !cycleStartedAt || !selectedDevotionalId || !isPaidUser) return;

    const selected = devotionalOptions.find((devotional) => devotional.id === selectedDevotionalId);
    setIsSavingDevotional(true);
    setDevotionalSettingsMessage(null);

    try {
      const { data: progressRows, error: progressError } = await supabase
        .from("devotional_progress")
        .select("day_number, is_completed")
        .eq("user_id", userId)
        .eq("devotional_id", selectedDevotionalId);

      if (progressError) throw progressError;

      const completedDays = (progressRows || [])
        .filter((row: { is_completed: boolean | null }) => row.is_completed === true)
        .map((row: { day_number: number }) => row.day_number);
      const maxCompletedDay = completedDays.length ? Math.max(...completedDays) : 0;
      const totalDays = Math.max(1, selected?.total_days || 1);
      const nextDay = Math.min(maxCompletedDay + 1, totalDays);

      const { error: targetError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            free_devotional_id: selectedDevotionalId,
            louis_primary_devotional_id: selectedDevotionalId,
            louis_primary_devotional_day: nextDay,
          },
          { onConflict: "user_id" },
        );

      if (targetError) throw targetError;

      rememberLouisDailyTaskTarget(userId, cycleStartedAt, {
        devotionalId: selectedDevotionalId,
        dayNumber: nextDay,
      });

      setDevotionalSettingsMessage(`${selected?.title || "Your Bible study"} is set for your daily tasks.`);
      onDevotionalChanged();
      window.setTimeout(() => setShowDevotionalSettings(false), 650);
    } catch (error) {
      console.error("[DASHBOARD] Could not save devotional setting:", error);
      setDevotionalSettingsMessage("Louis could not save that Bible study. Try again in a moment.");
    } finally {
      setIsSavingDevotional(false);
    }
  }

  async function handleResetCurrentDevotional() {
    const resetDevotionalId = selectedDevotionalId || currentDevotionalId;
    if (!userId || !resetDevotionalId || isResettingDevotional) return;

    setIsResettingDevotional(true);
    setDevotionalSettingsMessage(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      if (!accessToken) {
        throw new Error("You need to be signed in to reset a Bible Study.");
      }

      const response = await fetch("/api/devotionals/reset-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ devotionalId: resetDevotionalId }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Could not reset this Bible Study.");
      }

      if (cycleStartedAt) {
        rememberLouisDailyTaskTarget(userId, cycleStartedAt, {
          devotionalId: resetDevotionalId,
          dayNumber: 1,
        });
      }

      const { error: targetError } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            free_devotional_id: resetDevotionalId,
            louis_primary_devotional_id: resetDevotionalId,
            louis_primary_devotional_day: 1,
          },
          { onConflict: "user_id" },
        );

      if (targetError) throw targetError;

      setSelectedDevotionalId(resetDevotionalId);
      setDevotionalSettingsMessage(`${result?.title || "This Bible Study"} was reset back to the beginning.`);
      onDevotionalChanged();
    } catch (error) {
      console.error("[DASHBOARD] Could not reset devotional:", error);
      setDevotionalSettingsMessage("Louis could not reset this Bible study. Try again in a moment.");
    } finally {
      setIsResettingDevotional(false);
    }
  }

  async function handleCompletedStudyAction() {
    if (!allDone) return;

    if (userId && cycleStartedAt && checklistData?.nextJourneyTarget) {
      const { error } = await supabase
        .from("profile_stats")
        .upsert(
          {
            user_id: userId,
            free_devotional_id: checklistData.nextJourneyTarget.devotionalId,
            louis_primary_devotional_id: checklistData.nextJourneyTarget.devotionalId,
            louis_primary_devotional_day: checklistData.nextJourneyTarget.dayNumber,
          },
          { onConflict: "user_id" },
        );

      if (error) {
        console.error("[DASHBOARD] Could not sync next Bible Study chapter:", error);
        return;
      }

      rememberLouisDailyTaskTarget(userId, cycleStartedAt, checklistData.nextJourneyTarget);
      setShowDevotionalSettings(false);
      onDevotionalChanged();
      return;
    }

    setShowJourneyHelp(false);
    setShowDevotionalSettings(true);
  }

  useEffect(() => {
    if (!checklistData?.tasks.length || isLoadingChecklist) return;

    const currentDoneByKind = checklistData.tasks.reduce<Record<string, boolean>>((acc, task) => {
      acc[task.kind] = task.done;
      return acc;
    }, {});
    const previousDoneByKind = previousDoneByKindRef.current;
    const previousCompletedCount = previousCompletedCountRef.current;

    if (previousDoneByKind) {
      const newlyDoneKinds = checklistData.tasks
        .filter((task) => task.done && !previousDoneByKind[task.kind])
        .map((task) => task.kind);

      if (newlyDoneKinds.length > 0) {
        const celebrationId = Date.now();
        setCelebratingTasks((prev) => {
          const next = { ...prev };
          newlyDoneKinds.forEach((kind) => {
            next[kind] = celebrationId;
          });
          return next;
        });

        window.setTimeout(() => {
          setCelebratingTasks((prev) => {
            const next = { ...prev };
            newlyDoneKinds.forEach((kind) => {
              if (next[kind] === celebrationId) {
                delete next[kind];
              }
            });
            return next;
          });
        }, 1800);
      }
    }

    if (previousCompletedCount !== null && checklistData.completedCount > previousCompletedCount) {
      setProgressCelebrationKey((prev) => prev + 1);
    }

    previousDoneByKindRef.current = currentDoneByKind;
    previousCompletedCountRef.current = checklistData.completedCount;
  }, [checklistData, isLoadingChecklist]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleScroll() {
      const current = containerRef.current;
      if (!current) return;
      const width = current.clientWidth || 1;
      setActivePage(Math.round(current.scrollLeft / width));
    }

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleOpenExplorePage() {
      snapToPage(1);
    }

    window.addEventListener("bb:dashboard-open-explore-page", handleOpenExplorePage);
    return () => window.removeEventListener("bb:dashboard-open-explore-page", handleOpenExplorePage);
  }, []);

  function snapToPage(index: number) {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      left: container.clientWidth * index,
      behavior: "smooth",
    });
    setActivePage(index);
  }

  return (
    <div className="space-y-4">
      <style>{`
        @keyframes task-complete-pop {
          0% { transform: scale(1); box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08); }
          28% { transform: scale(1.025); box-shadow: 0 16px 34px rgba(34, 185, 95, 0.22); }
          100% { transform: scale(1); box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08); }
        }

        @keyframes task-firework {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.25); }
          18% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--spark-x), var(--spark-y)) scale(1); }
        }

        @keyframes done-sparkle {
          0%, 100% { opacity: 0.35; transform: translateY(0) scale(0.85); }
          50% { opacity: 1; transform: translateY(-1px) scale(1.08); }
        }

        @keyframes progress-glow {
          0% { box-shadow: 0 0 0 rgba(159, 206, 133, 0); }
          35% { box-shadow: 0 0 18px rgba(159, 206, 133, 0.9); }
          100% { box-shadow: 0 0 0 rgba(159, 206, 133, 0); }
        }

        @keyframes chapter-complete-fill {
          0% { width: 0%; filter: brightness(1); }
          72% { width: 100%; filter: brightness(1.12); }
          100% { width: 100%; filter: brightness(1); }
        }

        @keyframes next-task-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08), 0 0 0 0 rgba(123, 175, 212, 0.42);
            border-color: #b8d9ef;
          }
          50% {
            transform: scale(1.012);
            box-shadow: 0 12px 28px rgba(75, 156, 211, 0.2), 0 0 0 6px rgba(123, 175, 212, 0.16);
            border-color: #7BAFD4;
          }
        }

        .task-complete-pop { animation: task-complete-pop 850ms ease-out; }
        .task-firework span { animation: task-firework 900ms ease-out forwards; }
        .done-sparkle span { animation: done-sparkle 1.8s ease-in-out infinite; }
        .done-sparkle span:nth-child(2) { animation-delay: 0.45s; }
        .done-sparkle span:nth-child(3) { animation-delay: 0.9s; }
        .progress-glow { animation: progress-glow 950ms ease-out; }
        .chapter-complete-fill { animation: chapter-complete-fill 900ms ease-out; }
        .next-task-pulse { animation: next-task-pulse 2.2s ease-in-out infinite; }
        .spark-a { --spark-x: -42px; --spark-y: -42px; }
        .spark-b { --spark-x: 18px; --spark-y: -56px; }
        .spark-c { --spark-x: 68px; --spark-y: -20px; }
        .spark-d { --spark-x: 42px; --spark-y: 34px; }
        .spark-e { --spark-x: -28px; --spark-y: 30px; }
      `}</style>
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <section className={`w-full shrink-0 snap-start px-1 ${activePage === 0 ? "" : "h-0 overflow-hidden"}`}>
          <div className="mx-auto flex max-w-xl flex-col gap-4 pb-7">
            <div
              className={`relative w-full overflow-visible rounded-[26px] border text-left shadow-sm transition hover:shadow-md ${getDailyStudyCardClasses(allDone)}`}
            >
              {!isLoadingChecklist ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowDevotionalSettings((current) => !current);
                  }}
                  className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-transparent text-[0px] text-gray-950 transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-[#7BAFD4]/35"
                  aria-label="Daily Bible Study settings"
                  title="Daily Bible Study settings"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
                    <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.05.05a2 2 0 1 1-2.83 2.83l-.05-.05a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V21a2 2 0 1 1-4 0v-.08a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.87.34l-.05.05a2 2 0 1 1-2.83-2.83l.05-.05A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1.04H3a2 2 0 1 1 0-4h.08A1.7 1.7 0 0 0 4.6 8a1.7 1.7 0 0 0-.34-1.87l-.05-.05a2 2 0 1 1 2.83-2.83l.05.05A1.7 1.7 0 0 0 8.96 3.6 1.7 1.7 0 0 0 10 2.04V2a2 2 0 1 1 4 0v.08a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.87-.34l.05-.05a2 2 0 1 1 2.83 2.83l-.05.05A1.7 1.7 0 0 0 19.4 8c.17.6.78 1.04 1.56 1.04H21a2 2 0 1 1 0 4h-.08A1.7 1.7 0 0 0 19.4 15Z" />
                  </svg>
                  ⚙
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  if (isLoadingChecklist) return;
                  setShowDevotionalSettings(false);
                  setShowJourneyHelp(true);
                }}
                className={`w-full rounded-[26px] px-4 pt-4 text-left ${allDone ? "pb-16" : "pb-4"}`}
              >
              {isLoadingChecklist ? (
                <div className="animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/80 shadow-sm">
                      <div className="h-11 w-11 rounded-full bg-[#d7eaf7]" />
                    </div>
                    <div className="min-w-0 flex-1 pr-8">
                      <div className="mt-1 h-4 w-4/5 rounded-full bg-[#e7dcc8]" />
                      <div className="mt-3 h-4 w-3/5 rounded-full bg-[#e7dcc8]" />
                    </div>
                    <div className="h-5 w-5 rounded-full bg-[#eadfce]" />
                  </div>

                  <div className="mt-3 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-2.5 w-1/4 rounded-full bg-[#d8aa57]" />
                  </div>

                  <div className="mt-3 flex justify-center">
                    <div className="h-4 w-64 max-w-full rounded-full bg-[#e7dcc8]" />
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full border border-white/90 bg-white/80 p-1.5 shadow-sm">
                        <LouisAvatar mood={allDone ? "stareyes" : "wave"} size={46} />
                      </div>
                      <div className="min-w-0 flex-1 pr-8">
                        <p className="text-sm font-normal leading-6 text-gray-800">{louisMessage.focusLine}</p>
                      </div>
                    </div>

                    <div className="mt-3 overflow-hidden rounded-full bg-gray-200">
                      <div
                        key={progressCelebrationKey}
                        className={`h-2.5 rounded-full transition-all duration-700 ${progressCelebrationKey > 0 ? "progress-glow" : ""} ${allDone ? "chapter-complete-fill bg-[#9fce85]" : "bg-[#d8aa57]"}`}
                        style={{
                          width: `${Math.max(
                            0,
                            Math.min(100, Math.round((completedTasks / Math.max(totalTasks, 1)) * 100))
                          )}%`,
                        }}
                      />
                    </div>

                    <div className="mt-2.5 text-[13px] sm:text-sm">
                      <p className="min-w-0 text-center font-bold text-gray-800">
                        {dailyStudySummaryLine}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              </button>
              {allDone && !isLoadingChecklist ? (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleCompletedStudyAction();
                  }}
                  className="absolute bottom-3 left-4 right-12 z-20 rounded-full bg-[#7BAFD4] px-4 py-2 text-center text-sm font-bold text-slate-950 shadow-sm transition hover:bg-[#6aa3cc] focus:outline-none focus:ring-2 focus:ring-[#7BAFD4]/35"
                >
                  {completedStudyActionLabel}
                </button>
              ) : null}

              {showDevotionalSettings ? (
                <div
                  className="absolute right-3 top-14 z-30 w-[min(22rem,calc(100vw-3rem))] rounded-2xl border border-[#cfe4f3] bg-white p-4 text-left shadow-xl"
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-gray-950">Daily Bible Study</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Choose which Bible study Louis uses for your daily task flow.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDevotionalSettings(false)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-500 transition hover:bg-gray-200"
                      aria-label="Close devotional settings"
                    >
                      ×
                    </button>
                  </div>

                  {isPaidUser ? (
                    <div className="mt-4 space-y-3">
                      <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                        Bible Study
                      </label>
                      <select
                        value={selectedDevotionalId}
                        onChange={(event) => setSelectedDevotionalId(event.target.value)}
                        disabled={isLoadingDevotionalOptions || isSavingDevotional}
                        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 outline-none transition focus:border-[#7BAFD4] focus:ring-2 focus:ring-[#7BAFD4]/25 disabled:opacity-60"
                      >
                        {isLoadingDevotionalOptions ? (
                          <option>Loading Bible studies...</option>
                        ) : (
                          devotionalOptions.map((devotional) => (
                            <option key={devotional.id} value={devotional.id}>
                              {devotional.title}
                            </option>
                          ))
                        )}
                      </select>
                      <p className="text-xs leading-5 text-gray-500">
                        Louis will continue from your next unfinished chapter in the Bible study you choose.
                      </p>
                      {devotionalSettingsMessage ? (
                        <p className="rounded-xl bg-[#f4f9fd] px-3 py-2 text-xs font-medium text-[#315f7d]">
                          {devotionalSettingsMessage}
                        </p>
                      ) : null}
                      <button
                        type="button"
                        onClick={handleSaveDevotionalSetting}
                        disabled={!selectedDevotionalId || isSavingDevotional || isLoadingDevotionalOptions || isResettingDevotional}
                        className="w-full rounded-full bg-[#7BAFD4] px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-[#6aa3cc] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSavingDevotional ? "Saving..." : "Set Bible Study"}
                      </button>
                      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3">
                        <p className="text-xs font-bold text-gray-900">Reset selected Bible Study</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          Restart this Bible Study from the beginning. This only clears this study's progress.
                        </p>
                        <button
                          type="button"
                          onClick={handleResetCurrentDevotional}
                          disabled={!(selectedDevotionalId || currentDevotionalId) || isSavingDevotional || isResettingDevotional}
                          className="mt-3 w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isResettingDevotional ? "Resetting..." : "Reset selected Bible Study"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-2xl border border-[#f0d7b3] bg-[#fff8ef] p-4">
                      <p className="text-sm font-bold text-gray-950">Free Bible Study access</p>
                      <p className="mt-2 text-sm leading-6 text-gray-700">
                        As a free user, you can use one Bible study at a time. Upgrade to Pro to switch between every Bible Buddy Bible study and keep exploring different studies.
                      </p>
                      <Link
                        href="/upgrade"
                        className="mt-4 inline-flex w-full justify-center rounded-full bg-[#7BAFD4] px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-[#6aa3cc]"
                      >
                        Upgrade for full access
                      </Link>
                      <div className="mt-4 rounded-2xl border border-[#ead7bd] bg-white/70 p-3">
                        <p className="text-xs font-bold text-gray-900">Reset current Bible Study</p>
                        <p className="mt-1 text-xs leading-5 text-gray-600">
                          Restart this Bible Study from the beginning. This only clears this study's progress.
                        </p>
                        {devotionalSettingsMessage ? (
                          <p className="mt-3 rounded-xl bg-[#f4f9fd] px-3 py-2 text-xs font-medium text-[#315f7d]">
                            {devotionalSettingsMessage}
                          </p>
                        ) : null}
                        <button
                          type="button"
                          onClick={handleResetCurrentDevotional}
                          disabled={!currentDevotionalId || isResettingDevotional}
                          className="mt-3 w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-gray-800 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isResettingDevotional ? "Resetting..." : "Reset current Bible Study"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {isLoadingChecklist ? (
              skeletonTasks.map((task, index) => (
                <div
                  key={task.title}
                  className="rounded-xl border border-[#d8e4f6] bg-gradient-to-r from-white via-white to-[#f7fbff] px-3.5 py-3.5 shadow-sm sm:px-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#d7eaff] to-[#eef6ff] text-2xl opacity-80 shadow-sm">
                      <span aria-hidden="true">{task.emoji}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="h-4 w-48 max-w-full rounded-full bg-[#d9e7f6]" />
                      <div className={`mt-2 h-3 max-w-full rounded-full bg-[#e8eef7] ${task.subtitleWidth}`} />
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <div className="flex flex-col items-end gap-2">
                        <div className="h-7 w-16 rounded-full bg-[#dfeafe]" />
                        <div className="h-3 w-16 rounded-full bg-[#edf1f7]" />
                      </div>
                      <span className="text-xl leading-none text-gray-300" aria-hidden="true">›</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              checklistData?.tasks.map((task, index) => {
                const taskCopy = getTaskCardCopy(task, index);
                const isCelebrating = Boolean(celebratingTasks[task.kind]);
                const isNextActionTask = task.kind === nextActionTaskKind;

                return (
                <button
                  key={task.kind}
                  type="button"
                  onClick={() => onTaskClick(task)}
                  disabled={task.disabled}
                  className={`relative w-full overflow-hidden rounded-xl border px-3.5 py-3.5 text-left shadow-sm transition sm:px-4 ${
                    isCelebrating ? "task-complete-pop" : ""
                  } ${
                    isNextActionTask ? "next-task-pulse" : ""
                  } ${
                    task.done
                      ? "border-green-200 bg-gradient-to-r from-green-50 via-white to-green-50 hover:bg-green-50"
                      : task.disabled
                        ? "border-gray-200 bg-gray-100 text-gray-400"
                        : "border-[#d8e4f6] bg-gradient-to-r from-white via-white to-[#f7fbff] hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-2xl shadow-sm ${
                        task.done ? taskCopy.doneAccent : taskCopy.idleAccent
                      }`}
                    >
                      <span className="drop-shadow-sm" aria-hidden="true">{getTaskEmoji(task)}</span>
                      {task.done ? (
                        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#22b95f] text-xs font-black text-white ring-2 ring-white">
                          ✓
                        </span>
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-bold leading-tight text-gray-950 sm:text-base">{taskCopy.title}</p>
                      <p className="mt-1 max-w-[18rem] text-xs leading-5 text-gray-700 sm:text-sm">{taskCopy.subtitle}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <div className="flex flex-col items-end gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${getTaskPillClasses(task)}`}>
                          {task.pointsLabel}
                        </span>
                        <span className={`relative flex items-center gap-1 text-[11px] font-medium ${task.done ? "text-green-700" : "text-gray-500"}`}>
                          <span aria-hidden="true">{task.done ? "▣" : "○"}</span>
                          {task.done ? (
                            <span className="done-sparkle pointer-events-none absolute -inset-x-2 -top-3 flex justify-between text-[10px] text-amber-400" aria-hidden="true">
                              <span>✦</span>
                              <span>✧</span>
                              <span>✦</span>
                            </span>
                          ) : null}
                          {getTaskStatusLine(task)}
                        </span>
                      </div>
                      <span className="text-xl leading-none text-gray-400" aria-hidden="true">›</span>
                    </div>
                  </div>
                  {isCelebrating ? (
                    <div className="task-firework pointer-events-none absolute left-[52px] top-[48px]" aria-hidden="true">
                      <span className="spark-a absolute text-sm text-amber-400">✦</span>
                      <span className="spark-b absolute text-xs text-green-400">✧</span>
                      <span className="spark-c absolute text-sm text-sky-400">✦</span>
                      <span className="spark-d absolute text-xs text-amber-400">✧</span>
                      <span className="spark-e absolute text-sm text-green-400">✦</span>
                    </div>
                  ) : null}
                </button>
                );
              })
            )}

          </div>
        </section>

        <section className={`w-full shrink-0 snap-start px-1 ${activePage === 1 ? "" : "h-0 overflow-hidden"}`}>
              <div className="mx-auto flex max-w-xl flex-col gap-5">
            {membershipStatus === "pro" && daysRemaining !== null && daysRemaining > 0 ? (
              <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 shadow-sm">
                <p className="text-sm font-medium text-blue-800">
                  Pro expires in {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
                </p>
              </div>
            ) : null}

            {exploreLinks.map((link) => (
              <Link key={link.key} href={link.href} onClick={link.onClick}>
                <div className={`cursor-pointer rounded-xl border p-5 shadow-sm transition hover:scale-[1.01] hover:shadow-md ${link.accent}`}>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {link.emoji} {link.title}
                  </h2>
                  <p className="mt-2 text-base leading-6 text-gray-700">{link.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          {[0, 1].map((index) => (
            <button
              key={index}
              type="button"
              onClick={() => snapToPage(index)}
              className={`h-2.5 rounded-full transition-all ${
                activePage === index ? "w-10 bg-[#7BAFD4]" : "w-2.5 bg-[#cfe4f3]"
              }`}
              aria-label={index === 0 ? "Open Daily Bible Study" : "Open Explore"}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => snapToPage(0)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activePage === 0 ? "bg-[#7BAFD4] text-slate-950 shadow-sm" : "bg-white text-gray-700 shadow-sm"
            }`}
          >
            Daily Bible Study
          </button>
          <button
            type="button"
            onClick={() => snapToPage(1)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activePage === 1 ? "bg-[#7BAFD4] text-slate-950 shadow-sm" : "bg-white text-gray-700 shadow-sm"
            }`}
          >
            Explore
          </button>
        </div>
      </div>

      <ModalShell
        isOpen={showJourneyHelp}
        onClose={() => setShowJourneyHelp(false)}
        backdropColor="bg-black/55"
        scrollable={true}
        zIndex="z-[70]"
      >
        <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
          <div className="p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-950">How Bible Study Works</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Bible Buddy is built for steady Bible study, not rushing through a timer.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowJourneyHelp(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-2xl font-bold text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                aria-label="Close Bible study help"
              >
                ×
              </button>
            </div>

            <div className="space-y-6 text-gray-800">
              <div className="rounded-2xl border border-[#b8d9ef] bg-gradient-to-br from-[#f6fbff] via-white to-[#edf7ff] p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="rounded-full border border-white bg-white p-1 shadow-sm">
                    <LouisAvatar mood="wave" size={44} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4d88ad]">
                      The Big Idea
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-gray-950">
                      Your streak and your Bible study progress are connected, but they are not the same thing.
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-700">
                      Show up each day to keep your streak alive. Finish the chapter study when you are ready to move forward.
                    </p>
                  </div>
                </div>
              </div>

              <section>
                <h3 className="text-lg font-bold text-gray-950">🔥 Your Daily Streak</h3>
                <p className="mt-2 leading-7">
                  To keep your streak going, log in to Bible Buddy each day. The streak is about showing up consistently.
                </p>
                <p className="mt-2 leading-7">
                  You do not have to finish every chapter task in one day. The chapter study is where your Bible actions, task progress, points, and level growth happen.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-950">📖 Your Chapter Study</h3>
                <p className="mt-2 leading-7">
                  Your current chapter stays active until the chapter tasks are complete. If Proverbs 1 takes one day, great. If it takes a few days, or even a week, that is okay too.
                </p>
                <p className="mt-2 leading-7">
                  When you come back, Bible Buddy helps you continue where you left off instead of making you feel behind.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-gray-950">The 6 Chapter Tasks</h3>
                <div className="mt-3 space-y-3">
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">1. 📕 Bible Study Intro</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      This sets the scene for the chapter so you understand what you are about to read.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">2. ✝️ Read The Chapter</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      This is the Scripture itself. Read slowly and let the chapter be the center of the study.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">3. 📝 Chapter Notes</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      Notes help you understand the chapter more deeply, verse by verse and section by section.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">4. 🧠 Trivia</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      Trivia checks what is sticking from the chapter and helps you remember the story and details.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">5. 🔤 Scrambled</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      Scrambled reviews important words from the chapter in a quick, playful way.
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="font-bold text-gray-950">6. Reflection</p>
                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      Reflection gives you a place to answer the question and share what the chapter is doing in you.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-green-200 bg-green-50 p-4">
                <h3 className="text-lg font-bold text-gray-950">✅ When A Chapter Is Complete</h3>
                <p className="mt-2 leading-7">
                  Once the chapter study is finished, Bible Buddy celebrates the completion and moves you to the next chapter. The goal is simple: keep showing up, keep learning, and keep moving forward at a healthy pace.
                </p>
              </section>
            </div>
          </div>
        </div>
      </ModalShell>
    </div>
  );
}

