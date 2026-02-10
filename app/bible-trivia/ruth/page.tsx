"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";

interface Question {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  verse: string;
  verseText?: string;
  explanation: string;
}

// Helper function to fetch verse text from Bible API
async function fetchVerseText(reference: string): Promise<string> {
  try {
        const primaryRef = reference.split(/[;,]/)[0]?.trim() ?? reference.trim();
    const normalizedRef = encodeURIComponent(primaryRef);
    const response = await fetch(`https://bible-api.com/${normalizedRef}`);
    if (!response.ok) throw new Error("Failed to fetch verse");
    const data = await response.json();
    return data.text || "";
  } catch (error) {
    console.error("Error fetching verse:", error);
    return "";
  }
}

const ALL_QUESTIONS: Question[] = [
  {
    id: "ruth1",
    question: "In what time period does the book of Ruth take place?",
    options: [
      { label: "A", text: "During the kings of Israel" },
      { label: "B", text: "During the exile" },
      { label: "C", text: "During the time of the judges" },
      { label: "D", text: "During the prophets" },
    ],
    correctAnswer: "C",
    verse: "Ruth 1:1",
    explanation: "The book of Ruth begins by stating it took place in the days when the judges ruled Israel.",
  },
  {
    id: "ruth2",
    question: "Why did Elimelech move his family to Moab?",
    options: [
      { label: "A", text: "War" },
      { label: "B", text: "Famine" },
      { label: "C", text: "Trade" },
      { label: "D", text: "Exile" },
    ],
    correctAnswer: "B",
    verse: "Ruth 1:1",
    explanation: "A famine in Bethlehem caused Elimelech to take his family to Moab to survive.",
  },
  {
    id: "ruth3",
    question: "Who was Elimelech's wife?",
    options: [
      { label: "A", text: "Orpah" },
      { label: "B", text: "Ruth" },
      { label: "C", text: "Naomi" },
      { label: "D", text: "Deborah" },
    ],
    correctAnswer: "C",
    verse: "Ruth 1:2",
    explanation: "Naomi was the wife of Elimelech and the mother of Mahlon and Chilion.",
  },
  {
    id: "ruth4",
    question: "What were the names of Naomi's sons?",
    options: [
      { label: "A", text: "Perez and Zerah" },
      { label: "B", text: "Mahlon and Chilion" },
      { label: "C", text: "Boaz and Obed" },
      { label: "D", text: "Jesse and David" },
    ],
    correctAnswer: "B",
    verse: "Ruth 1:2",
    explanation: "Naomi's sons were named Mahlon and Chilion.",
  },
  {
    id: "ruth5",
    question: "What happened to Elimelech in Moab?",
    options: [
      { label: "A", text: "He returned home" },
      { label: "B", text: "He became wealthy" },
      { label: "C", text: "He died" },
      { label: "D", text: "He became a leader" },
    ],
    correctAnswer: "C",
    verse: "Ruth 1:3",
    explanation: "Elimelech died in Moab, leaving Naomi a widow.",
  },
  {
    id: "ruth6",
    question: "Who did Naomi's sons marry?",
    options: [
      { label: "A", text: "Israelite women" },
      { label: "B", text: "Philistine women" },
      { label: "C", text: "Moabite women" },
      { label: "D", text: "Egyptian women" },
    ],
    correctAnswer: "C",
    verse: "Ruth 1:4",
    explanation: "Mahlon and Chilion married Moabite women named Ruth and Orpah.",
  },
  {
    id: "ruth7",
    question: "What eventually happened to Naomi's sons?",
    options: [
      { label: "A", text: "They returned to Israel" },
      { label: "B", text: "They became judges" },
      { label: "C", text: "They died" },
      { label: "D", text: "They moved to Egypt" },
    ],
    correctAnswer: "C",
    verse: "Ruth 1:5",
    explanation: "Both Mahlon and Chilion died, leaving Naomi without her husband or sons.",
  },
  {
    id: "ruth8",
    question: "Why did Naomi decide to return to Bethlehem?",
    options: [
      { label: "A", text: "She was invited back" },
      { label: "B", text: "She heard the famine was over" },
      { label: "C", text: "She was forced out" },
      { label: "D", text: "She found work there" },
    ],
    correctAnswer: "B",
    verse: "Ruth 1:6",
    explanation: "Naomi heard that the Lord had provided food for His people in Bethlehem.",
  },
  {
    id: "ruth9",
    question: "Which daughter-in-law returned to Moab?",
    options: [
      { label: "A", text: "Ruth" },
      { label: "B", text: "Naomi" },
      { label: "C", text: "Orpah" },
      { label: "D", text: "Deborah" },
    ],
    correctAnswer: "C",
    verse: "Ruth 1:14",
    explanation: "Orpah kissed Naomi goodbye and returned to her people.",
  },
  {
    id: "ruth10",
    question: "What famous promise did Ruth make to Naomi?",
    options: [
      { label: "A", text: "I will return later" },
      { label: "B", text: "Your people will be my people" },
      { label: "C", text: "I will send help" },
      { label: "D", text: "I will remember you" },
    ],
    correctAnswer: "B",
    verse: "Ruth 1:16",
    explanation: "Ruth pledged loyalty to Naomi and committed to follow her God and people.",
  },
  {
    id: "ruth11",
    question: "Where did Naomi and Ruth return to?",
    options: [
      { label: "A", text: "Jericho" },
      { label: "B", text: "Hebron" },
      { label: "C", text: "Bethlehem" },
      { label: "D", text: "Jerusalem" },
    ],
    correctAnswer: "C",
    verse: "Ruth 1:19",
    explanation: "They returned to Bethlehem at the beginning of the barley harvest.",
  },
  {
    id: "ruth12",
    question: "What name did Naomi ask to be called instead of Naomi?",
    options: [
      { label: "A", text: "Bitter" },
      { label: "B", text: "Mara" },
      { label: "C", text: "Rachel" },
      { label: "D", text: "Leah" },
    ],
    correctAnswer: "B",
    verse: "Ruth 1:20",
    explanation: "Naomi asked to be called Mara, meaning bitter, because of her suffering.",
  },
  {
    id: "ruth13",
    question: "What was Ruth's method of providing food?",
    options: [
      { label: "A", text: "Fishing" },
      { label: "B", text: "Trading" },
      { label: "C", text: "Gleaning" },
      { label: "D", text: "Farming" },
    ],
    correctAnswer: "C",
    verse: "Ruth 2:2",
    explanation: "Ruth gathered leftover grain by gleaning in the fields.",
  },
  {
    id: "ruth14",
    question: "In whose field did Ruth happen to glean?",
    options: [
      { label: "A", text: "Elimelech" },
      { label: "B", text: "Boaz" },
      { label: "C", text: "Obed" },
      { label: "D", text: "Jesse" },
    ],
    correctAnswer: "B",
    verse: "Ruth 2:3",
    explanation: "Ruth gleaned in the field of Boaz, a relative of Elimelech.",
  },
  {
    id: "ruth15",
    question: "How is Boaz described in Scripture?",
    options: [
      { label: "A", text: "A king" },
      { label: "B", text: "A judge" },
      { label: "C", text: "A man of standing" },
      { label: "D", text: "A prophet" },
    ],
    correctAnswer: "C",
    verse: "Ruth 2:1",
    explanation: "Boaz is described as a man of standing, meaning he was respected and wealthy.",
  },
  {
    id: "ruth16",
    question: "How did Boaz treat Ruth?",
    options: [
      { label: "A", text: "With suspicion" },
      { label: "B", text: "With kindness" },
      { label: "C", text: "With anger" },
      { label: "D", text: "With indifference" },
    ],
    correctAnswer: "B",
    verse: "Ruth 2:8",
    explanation: "Boaz showed kindness and protection toward Ruth.",
  },
  {
    id: "ruth17",
    question: "Why did Boaz show favor to Ruth?",
    options: [
      { label: "A", text: "She was wealthy" },
      { label: "B", text: "She worked hard" },
      { label: "C", text: "She was famous" },
      { label: "D", text: "She helped Naomi" },
    ],
    correctAnswer: "D",
    verse: "Ruth 2:11",
    explanation: "Boaz honored Ruth for her loyalty and care for Naomi.",
  },
  {
    id: "ruth18",
    question: "What did Ruth do at the threshing floor?",
    options: [
      { label: "A", text: "She harvested grain" },
      { label: "B", text: "She slept at Boaz's feet" },
      { label: "C", text: "She confronted Boaz" },
      { label: "D", text: "She fled the city" },
    ],
    correctAnswer: "B",
    verse: "Ruth 3:7",
    explanation: "Ruth lay at Boaz's feet as a sign of humility and request for protection.",
  },
  {
    id: "ruth19",
    question: "What did Ruth ask Boaz to do?",
    options: [
      { label: "A", text: "Give her land" },
      { label: "B", text: "Marry her" },
      { label: "C", text: "Protect her" },
      { label: "D", text: "Redeem her family" },
    ],
    correctAnswer: "D",
    verse: "Ruth 3:9",
    explanation: "Ruth asked Boaz to act as her kinsman redeemer.",
  },
  {
    id: "ruth20",
    question: "What is a kinsman redeemer?",
    options: [
      { label: "A", text: "A judge" },
      { label: "B", text: "A priest" },
      { label: "C", text: "A family protector" },
      { label: "D", text: "A prophet" },
    ],
    correctAnswer: "C",
    verse: "Ruth 3:9",
    explanation: "A kinsman redeemer was a close relative responsible for protecting family inheritance.",
  },
  {
    id: "ruth21",
    question: "Was Boaz the closest redeemer?",
    options: [
      { label: "A", text: "Yes" },
      { label: "B", text: "No" },
      { label: "C", text: "Unknown" },
      { label: "D", text: "Later revealed" },
    ],
    correctAnswer: "B",
    verse: "Ruth 3:12",
    explanation: "Boaz explained there was a closer redeemer who had first rights.",
  },
  {
    id: "ruth22",
    question: "What symbol was used to finalize redemption?",
    options: [
      { label: "A", text: "Ring" },
      { label: "B", text: "Staff" },
      { label: "C", text: "Sandal" },
      { label: "D", text: "Cloak" },
    ],
    correctAnswer: "C",
    verse: "Ruth 4:7",
    explanation: "Removing a sandal symbolized the transfer of redemption rights.",
  },
  {
    id: "ruth23",
    question: "Who became Ruth's husband?",
    options: [
      { label: "A", text: "Elimelech" },
      { label: "B", text: "Obed" },
      { label: "C", text: "Boaz" },
      { label: "D", text: "Jesse" },
    ],
    correctAnswer: "C",
    verse: "Ruth 4:13",
    explanation: "Boaz married Ruth after redeeming her family line.",
  },
  {
    id: "ruth24",
    question: "What son was born to Ruth and Boaz?",
    options: [
      { label: "A", text: "Jesse" },
      { label: "B", text: "David" },
      { label: "C", text: "Obed" },
      { label: "D", text: "Perez" },
    ],
    correctAnswer: "C",
    verse: "Ruth 4:17",
    explanation: "Ruth and Boaz had a son named Obed.",
  },
  {
    id: "ruth25",
    question: "Who did Obed become the father of?",
    options: [
      { label: "A", text: "Saul" },
      { label: "B", text: "David" },
      { label: "C", text: "Jesse" },
      { label: "D", text: "Solomon" },
    ],
    correctAnswer: "C",
    verse: "Ruth 4:17",
    explanation: "Obed became the father of Jesse.",
  },
  {
    id: "ruth26",
    question: "Who was Jesse's famous son?",
    options: [
      { label: "A", text: "Solomon" },
      { label: "B", text: "Saul" },
      { label: "C", text: "David" },
      { label: "D", text: "Samuel" },
    ],
    correctAnswer: "C",
    verse: "Ruth 4:22",
    explanation: "Jesse was the father of King David.",
  },
  {
    id: "ruth27",
    question: "What major theme does Ruth emphasize?",
    options: [
      { label: "A", text: "Power" },
      { label: "B", text: "Loyalty" },
      { label: "C", text: "War" },
      { label: "D", text: "Judgment" },
    ],
    correctAnswer: "B",
    verse: "Ruth 1:16",
    explanation: "Ruth highlights loyalty and faithful love.",
  },
  {
    id: "ruth28",
    question: "What does Ruth show about God's care?",
    options: [
      { label: "A", text: "Selective" },
      { label: "B", text: "Limited" },
      { label: "C", text: "Faithful" },
      { label: "D", text: "Distant" },
    ],
    correctAnswer: "C",
    verse: "Ruth 2:12",
    explanation: "God shows faithful care to those who trust Him.",
  },
  {
    id: "ruth29",
    question: "Why is Ruth significant in Israel's history?",
    options: [
      { label: "A", text: "She was a queen" },
      { label: "B", text: "She was a judge" },
      { label: "C", text: "She became part of David's lineage" },
      { label: "D", text: "She led Israel" },
    ],
    correctAnswer: "C",
    verse: "Ruth 4:22",
    explanation: "Ruth became an ancestor of King David.",
  },
  {
    id: "ruth30",
    question: "What does Ruth show about redemption?",
    options: [
      { label: "A", text: "Rare" },
      { label: "B", text: "Costly and loving" },
      { label: "C", text: "Impossible" },
      { label: "D", text: "Unnecessary" },
    ],
    correctAnswer: "B",
    verse: "Ruth 4:9",
    explanation: "Redemption required sacrifice and commitment.",
  },
  {
    id: "ruth31",
    question: "Who benefited most from Ruth's faithfulness?",
    options: [
      { label: "A", text: "Boaz" },
      { label: "B", text: "Naomi" },
      { label: "C", text: "Israel" },
      { label: "D", text: "All of them" },
    ],
    correctAnswer: "D",
    verse: "Ruth 4:14",
    explanation: "Ruth's faithfulness brought blessing to many.",
  },
  {
    id: "ruth32",
    question: "What harvest was taking place when Ruth returned?",
    options: [
      { label: "A", text: "Wheat" },
      { label: "B", text: "Grape" },
      { label: "C", text: "Barley" },
      { label: "D", text: "Olive" },
    ],
    correctAnswer: "C",
    verse: "Ruth 1:22",
    explanation: "They returned during the barley harvest.",
  },
  {
    id: "ruth33",
    question: "What does Naomi's story show?",
    options: [
      { label: "A", text: "God abandons" },
      { label: "B", text: "Bitterness lasts forever" },
      { label: "C", text: "Restoration is possible" },
      { label: "D", text: "Faith is easy" },
    ],
    correctAnswer: "C",
    verse: "Ruth 4:15",
    explanation: "Naomi's joy was restored through God's provision.",
  },
  {
    id: "ruth34",
    question: "How did the people respond to Boaz's redemption?",
    options: [
      { label: "A", text: "Silence" },
      { label: "B", text: "Celebration and blessing" },
      { label: "C", text: "Anger" },
      { label: "D", text: "Fear" },
    ],
    correctAnswer: "B",
    verse: "Ruth 4:11",
    explanation: "The elders blessed Boaz and Ruth.",
  },
  {
    id: "ruth35",
    question: "What does Ruth teach about outsiders?",
    options: [
      { label: "A", text: "They are rejected" },
      { label: "B", text: "They are ignored" },
      { label: "C", text: "They can be welcomed by faith" },
      { label: "D", text: "They cannot belong" },
    ],
    correctAnswer: "C",
    verse: "Ruth 2:12",
    explanation: "Ruth, a foreigner, was welcomed through faith and loyalty.",
  },
  {
    id: "ruth36",
    question: "What does Boaz represent symbolically?",
    options: [
      { label: "A", text: "Judge" },
      { label: "B", text: "King" },
      { label: "C", text: "Redeemer" },
      { label: "D", text: "Prophet" },
    ],
    correctAnswer: "C",
    verse: "Ruth 4:9",
    explanation: "Boaz acts as a redeemer, reflecting God's redemptive nature.",
  },
  {
    id: "ruth37",
    question: "What does Ruth's decision show about faith?",
    options: [
      { label: "A", text: "Fearful" },
      { label: "B", text: "Selfish" },
      { label: "C", text: "Sacrificial" },
      { label: "D", text: "Temporary" },
    ],
    correctAnswer: "C",
    verse: "Ruth 1:16",
    explanation: "Ruth's faith involved sacrifice and trust.",
  },
  {
    id: "ruth38",
    question: "What role does kindness play in Ruth?",
    options: [
      { label: "A", text: "Minor" },
      { label: "B", text: "Central" },
      { label: "C", text: "Ignored" },
      { label: "D", text: "Negative" },
    ],
    correctAnswer: "B",
    verse: "Ruth 2:20",
    explanation: "Kindness is a major theme shown by Boaz and Ruth.",
  },
  {
    id: "ruth39",
    question: "What does Ruth show about God's timing?",
    options: [
      { label: "A", text: "Random" },
      { label: "B", text: "Slow" },
      { label: "C", text: "Purposeful" },
      { label: "D", text: "Unclear" },
    ],
    correctAnswer: "C",
    verse: "Ruth 1:22",
    explanation: "Events unfold at the right time according to God's plan.",
  },
  {
    id: "ruth40",
    question: "What does Ruth show about obedience?",
    options: [
      { label: "A", text: "Optional" },
      { label: "B", text: "Rewarded" },
      { label: "C", text: "Dangerous" },
      { label: "D", text: "Useless" },
    ],
    correctAnswer: "B",
    verse: "Ruth 2:12",
    explanation: "Ruth's obedience led to blessing and provision.",
  },
  {
    id: "ruth41",
    question: "What role does Naomi play at the end?",
    options: [
      { label: "A", text: "Leader" },
      { label: "B", text: "Caregiver to Obed" },
      { label: "C", text: "Judge" },
      { label: "D", text: "Prophet" },
    ],
    correctAnswer: "B",
    verse: "Ruth 4:16",
    explanation: "Naomi cared for Obed and experienced restored joy.",
  },
  {
    id: "ruth42",
    question: "What does Ruth reveal about God's grace?",
    options: [
      { label: "A", text: "Limited" },
      { label: "B", text: "Earned" },
      { label: "C", text: "Inclusive" },
      { label: "D", text: "Hidden" },
    ],
    correctAnswer: "C",
    verse: "Ruth 2:12",
    explanation: "God's grace extends to all who trust Him.",
  },
  {
    id: "ruth43",
    question: "Why is Ruth important to Christians?",
    options: [
      { label: "A", text: "She was a judge" },
      { label: "B", text: "She was wealthy" },
      { label: "C", text: "She is in the lineage of Jesus" },
      { label: "D", text: "She built the temple" },
    ],
    correctAnswer: "C",
    verse: "Ruth 4:22",
    explanation: "Ruth is part of the family line leading to Jesus.",
  },
  {
    id: "ruth44",
    question: "What does Ruth teach about perseverance?",
    options: [
      { label: "A", text: "Give up early" },
      { label: "B", text: "Trust through hardship" },
      { label: "C", text: "Avoid struggle" },
      { label: "D", text: "Rely on wealth" },
    ],
    correctAnswer: "B",
    verse: "Ruth 1:16",
    explanation: "Ruth remained faithful despite hardship.",
  },
  {
    id: "ruth45",
    question: "What does the ending of Ruth emphasize?",
    options: [
      { label: "A", text: "Loss" },
      { label: "B", text: "Judgment" },
      { label: "C", text: "Restoration" },
      { label: "D", text: "Exile" },
    ],
    correctAnswer: "C",
    verse: "Ruth 4:14",
    explanation: "The book ends with restoration and hope.",
  },
  {
    id: "ruth46",
    question: "What does Ruth show about loyalty?",
    options: [
      { label: "A", text: "Conditional" },
      { label: "B", text: "Costly" },
      { label: "C", text: "Rare" },
      { label: "D", text: "Unimportant" },
    ],
    correctAnswer: "B",
    verse: "Ruth 1:16",
    explanation: "Ruth's loyalty required sacrifice and commitment.",
  },
  {
    id: "ruth47",
    question: "How does Ruth connect to David?",
    options: [
      { label: "A", text: "She was his sister" },
      { label: "B", text: "She raised him" },
      { label: "C", text: "She was his great grandmother" },
      { label: "D", text: "She ruled with him" },
    ],
    correctAnswer: "C",
    verse: "Ruth 4:22",
    explanation: "Ruth became the great grandmother of King David.",
  },
  {
    id: "ruth48",
    question: "What does Ruth teach about God's plans?",
    options: [
      { label: "A", text: "Uncertain" },
      { label: "B", text: "Limited" },
      { label: "C", text: "Redemptive" },
      { label: "D", text: "Harsh" },
    ],
    correctAnswer: "C",
    verse: "Ruth 4:14",
    explanation: "God's plans bring redemption and hope.",
  },
  {
    id: "ruth49",
    question: "What quality best describes Boaz?",
    options: [
      { label: "A", text: "Pride" },
      { label: "B", text: "Kindness" },
      { label: "C", text: "Fear" },
      { label: "D", text: "Ambition" },
    ],
    correctAnswer: "B",
    verse: "Ruth 2:8",
    explanation: "Boaz consistently showed kindness and integrity.",
  },
  {
    id: "ruth50",
    question: "What is the main message of Ruth?",
    options: [
      { label: "A", text: "Strength wins" },
      { label: "B", text: "God rewards faithfulness" },
      { label: "C", text: "Kings rule" },
      { label: "D", text: "War is necessary" },
    ],
    correctAnswer: "B",
    verse: "Ruth 4:15",
    explanation: "The book of Ruth shows that God honors faithfulness and loyalty.",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function RuthTriviaPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingVerseText, setLoadingVerseText] = useState(false);

  useEffect(() => {
    async function loadUserAndQuestions() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const creditResponse = await fetch("/api/consume-credit", {           method: "POST",           headers: {             "Content-Type": "application/json",           },           body: JSON.stringify({             actionType: ACTION_TYPE.trivia_started,           }),         });                  if (!creditResponse.ok) {           return;         } const creditResult = (await creditResponse.json()) as {           ok: boolean;           reason?: string;         };                  if (!creditResult.ok) {           return;         } setUserId(user.id);

        // Fetch user's progress for ruth questions
        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("question_id, is_correct")
          .eq("user_id", user.id)
          .eq("book", "ruth");

        if (error) {
          console.error("Error fetching trivia progress:", error);
        }

        // Filter out correctly answered questions
        const answeredCorrectly = new Set(
          (progressData || [])
            .filter((p) => p.is_correct)
            .map((p) => p.question_id)
        );

        const availableQuestions = ALL_QUESTIONS.filter(
          (q) => !answeredCorrectly.has(q.id)
        );

        // If no questions left, show all questions (allow review)
        const questionsToUse =
          availableQuestions.length > 0 ? availableQuestions : ALL_QUESTIONS;

        const shuffled = shuffleArray(questionsToUse);
        setQuestions(shuffled.slice(0, 10));
      } else {
        // No user logged in, show random questions
        const shuffled = shuffleArray(ALL_QUESTIONS);
        setQuestions(shuffled.slice(0, 10));
      }
    }
    loadUserAndQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleAnswerSelect = async (answer: string) => {
    if (selectedAnswer) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    if (userId) {
      try {
        // Get username
        const { data: { user } } = await supabase.auth.getUser();
        let username = "User";
        if (user) {
const meta: any = user.user_metadata || {};
          username =
            meta.firstName ||
            meta.first_name ||
            (user.email ? user.email.split("@")[0] : null) ||
            "User";
        }

        // Insert into master_actions via server-side API (uses service role)
        console.log("Making API call to record trivia answer:", {
          userId,
          questionId: currentQuestion.id,
          username,
          isCorrect,
          book: "ruth",
        });
        const response = await fetch("/api/trivia-answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            questionId: currentQuestion.id,
            username,
            isCorrect,
            book: "ruth",
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to record trivia answer:", response.status, errorText);
        } else {
          console.log("Successfully recorded trivia answer");
        }

        // Increment profile_stats.trivia_questions_answered
        const { data: currentStats } = await supabase
          .from("profile_stats")
          .select("trivia_questions_answered")
          .eq("user_id", userId)
          .single();

        if (currentStats) {
          await supabase
            .from("profile_stats")
            .update({
              trivia_questions_answered:
                (currentStats.trivia_questions_answered || 0) + 1,
            })
            .eq("user_id", userId);
        }
      } catch (error) {
        console.error("Error tracking trivia question:", error);
      }
    }

    if (!currentQuestion.verseText) {
      setLoadingVerseText(true);
      try {
        const verseText = await fetchVerseText(currentQuestion.verse);
        setQuestions((prev) => {
          const updated = [...prev];
          updated[currentQuestionIndex] = { ...updated[currentQuestionIndex], verseText };
          return updated;
        });
      } catch (error) {
        console.error("Error fetching verse text:", error);
      } finally {
        setLoadingVerseText(false);
      }
    }

    setIsFlipped(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsFlipped(false);
    } else {
      setShowResults(true);
    }
  };

  const getEncouragementMessage = (score: number) => {
    if (score === 10) return "Perfect! You're a Ruth expert!";
    if (score >= 8) return "Excellent! You know Ruth well!";
    if (score >= 6) return "Good job! Keep studying Ruth!";
    if (score >= 4) return "Nice try! Ruth has much to explore!";
    return "Keep learning! Every question helps you grow!";
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <div className="mb-6">
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {correctCount} / 10
            </p>
            <p className="text-gray-600">Correct Answers</p>
          </div>
          <p className="text-lg text-gray-700 mb-8">
            {getEncouragementMessage(correctCount)}
          </p>
          <div className="space-y-3">
            <Link
              href="/bible-trivia/ruth"
              className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Play Again
            </Link>
            <Link
              href="/bible-trivia"
              className="block w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Back to Decks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/bible-trivia"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            ← Back
          </Link>
          <div className="text-sm text-gray-600 flex gap-8">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="font-semibold">Score: {correctCount}</span>
          </div>
        </div>

        <div className="relative mb-8" style={{ perspective: "1000px" }}>
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
              }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {currentQuestion.question}
              </h2>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleAnswerSelect(option.label)}
                    disabled={!!selectedAnswer}
                    className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="font-semibold text-gray-700">
                      {option.label}. {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8 absolute top-0 left-0"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="mb-6">
                <div
                  className={`inline-block px-4 py-2 rounded-lg font-semibold mb-4 ${
                    isCorrect
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  {currentQuestion.question}
                </h2>
                <div className="space-y-2 mb-4">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.label}
                      className={`p-3 rounded-lg ${
                        option.label === currentQuestion.correctAnswer
                          ? "bg-green-100 border-2 border-green-400"
                          : option.label === selectedAnswer && !isCorrect
                          ? "bg-red-100 border-2 border-red-400"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <span className="font-semibold text-gray-700">
                        {option.label}. {option.text}
                        {option.label === currentQuestion.correctAnswer && (
                          <span className="ml-2 text-green-700">✓</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-blue-900 mb-2">
                    {currentQuestion.verse}
                  </p>
                  {loadingVerseText ? (
                    <p className="text-gray-500 text-sm italic mb-3">Loading verse...</p>
                  ) : currentQuestion.verseText ? (
                    <p className="text-gray-800 text-sm leading-relaxed mb-3 italic">
                      "{currentQuestion.verseText}"
                    </p>
                  ) : null}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                {currentQuestionIndex < questions.length - 1
                  ? "Next Question"
                  : "See Results"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






