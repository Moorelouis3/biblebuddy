"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Question {
  id: number;
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
    // Parse reference (e.g., "Genesis 1:3" -> "genesis+1:3")
    const normalizedRef = reference.toLowerCase().replace(/\s+/g, '+');
    const response = await fetch(`https://bible-api.com/${normalizedRef}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch verse');
    }
    
    const data = await response.json();
    return data.text || '';
  } catch (error) {
    console.error('Error fetching verse:', error);
    return '';
  }
}

const ALL_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What did God create on the first day?",
    options: [
      { label: "A", text: "The heavens and the earth" },
      { label: "B", text: "Light" },
      { label: "C", text: "The sun and moon" },
      { label: "D", text: "Man" }
    ],
    correctAnswer: "B",
    verse: "Genesis 1:3",
    explanation: "Light is the first thing God speaks into existence. This happens before the sun moon and stars are created later. It shows that God Himself is the source of light and order. Creation begins with God bringing clarity out of darkness."
  },
  {
    id: 2,
    question: "On which day did God create humanity?",
    options: [
      { label: "A", text: "Day four" },
      { label: "B", text: "Day five" },
      { label: "C", text: "Day six" },
      { label: "D", text: "Day seven" }
    ],
    correctAnswer: "C",
    verse: "Genesis 1:27",
    explanation: "Humanity is created on the sixth day after everything else is prepared. Being made in God's image gives humans unique value and responsibility. This verse emphasizes identity purpose and relationship. Humans are not accidental but intentional."
  },
  {
    id: 3,
    question: "What was unique about how humans were created?",
    options: [
      { label: "A", text: "They were created first" },
      { label: "B", text: "They were created from light" },
      { label: "C", text: "They were made in the image of God" },
      { label: "D", text: "They were made immortal" }
    ],
    correctAnswer: "C",
    verse: "Genesis 1:26",
    explanation: "No other part of creation is described this way. Being made in God's image points to moral responsibility creativity and relationship. This truth forms the foundation for human dignity. It shapes how Scripture views humanity."
  },
  {
    id: 4,
    question: "What tree were Adam and Eve forbidden to eat from?",
    options: [
      { label: "A", text: "The tree of life" },
      { label: "B", text: "The tree of wisdom" },
      { label: "C", text: "The tree of the knowledge of good and evil" },
      { label: "D", text: "The tree of blessing" }
    ],
    correctAnswer: "C",
    verse: "Genesis 2:17",
    explanation: "God gave Adam and Eve freedom with one boundary. The command tested trust and obedience not deprivation. Disobedience brought death and separation. The issue was authority not fruit."
  },
  {
    id: 5,
    question: "Who tempted Eve in the garden?",
    options: [
      { label: "A", text: "Adam" },
      { label: "B", text: "An angel" },
      { label: "C", text: "A serpent" },
      { label: "D", text: "A demon" }
    ],
    correctAnswer: "C",
    verse: "Genesis 3:1",
    explanation: "The serpent approaches by questioning God's word. Temptation begins with doubt rather than open rebellion. Scripture later connects the serpent to Satan. Genesis focuses on deception and choice."
  },
  {
    id: 6,
    question: "What was the first sin committed by Adam and Eve?",
    options: [
      { label: "A", text: "Murder" },
      { label: "B", text: "Disobedience" },
      { label: "C", text: "Lying" },
      { label: "D", text: "Pride" }
    ],
    correctAnswer: "B",
    verse: "Genesis 3:6",
    explanation: "The first sin was disobedience to God's command. Adam and Eve chose their own judgment over God's word. This act brought sin into human experience. Everything broken afterward flows from this moment."
  },
  {
    id: 7,
    question: "Who was the first person born according to Genesis?",
    options: [
      { label: "A", text: "Abel" },
      { label: "B", text: "Cain" },
      { label: "C", text: "Seth" },
      { label: "D", text: "Noah" }
    ],
    correctAnswer: "B",
    verse: "Genesis 4:1",
    explanation: "Cain is the first human born after creation. His story quickly reveals how sin spreads through relationships. Genesis does not hide human failure. Being first does not mean faithful."
  },
  {
    id: 8,
    question: "Why was Abel's offering accepted and Cain's rejected?",
    options: [
      { label: "A", text: "Abel offered more" },
      { label: "B", text: "Cain offered too late" },
      { label: "C", text: "Abel's heart was right before God" },
      { label: "D", text: "Cain broke a ritual law" }
    ],
    correctAnswer: "C",
    verse: "Genesis 4:4 to 5",
    explanation: "God looks at the heart not just the offering. Abel's offering was given in faith. Cain's anger reveals his heart posture. Worship is about trust not ritual."
  },
  {
    id: 9,
    question: "What sin did Cain commit after God warned him?",
    options: [
      { label: "A", text: "Theft" },
      { label: "B", text: "Adultery" },
      { label: "C", text: "Murder" },
      { label: "D", text: "Blasphemy" }
    ],
    correctAnswer: "C",
    verse: "Genesis 4:8",
    explanation: "God warned Cain that sin was crouching at the door. Cain ignored the warning and acted in anger. This is the first recorded murder. Sin grows when unchecked."
  },
  {
    id: 10,
    question: "What punishment did Cain receive?",
    options: [
      { label: "A", text: "Immediate death" },
      { label: "B", text: "Exile and wandering" },
      { label: "C", text: "Loss of all possessions" },
      { label: "D", text: "Flood judgment" }
    ],
    correctAnswer: "B",
    verse: "Genesis 4:12",
    explanation: "God did not kill Cain but removed stability from his life. The punishment carried both justice and mercy. Cain was marked for protection. God restrains evil while judging it."
  },
  {
    id: 11,
    question: "Who walked with God and did not experience death?",
    options: [
      { label: "A", text: "Noah" },
      { label: "B", text: "Seth" },
      { label: "C", text: "Enoch" },
      { label: "D", text: "Methuselah" }
    ],
    correctAnswer: "C",
    verse: "Genesis 5:24",
    explanation: "Enoch stands out in a chapter filled with death. Walking with God describes ongoing faithfulness. God took Enoch directly. Faith breaks the pattern of death."
  },
  {
    id: 12,
    question: "How old was Noah when the flood began?",
    options: [
      { label: "A", text: "500" },
      { label: "B", text: "600" },
      { label: "C", text: "700" },
      { label: "D", text: "950" }
    ],
    correctAnswer: "B",
    verse: "Genesis 7:6",
    explanation: "This verse places the flood in a real timeline. Noah obeyed God for many years before judgment came. Faith often requires patience. God's promises are not rushed."
  },
  {
    id: 13,
    question: "How long did it rain during the flood?",
    options: [
      { label: "A", text: "7 days" },
      { label: "B", text: "30 days" },
      { label: "C", text: "40 days" },
      { label: "D", text: "150 days" }
    ],
    correctAnswer: "C",
    verse: "Genesis 7:12",
    explanation: "Forty days represents testing and judgment throughout Scripture. The flood was a complete cleansing of the earth. God was restarting creation. Judgment and mercy work together."
  },
  {
    id: 14,
    question: "What animal did Noah send out first to find dry land?",
    options: [
      { label: "A", text: "Dove" },
      { label: "B", text: "Eagle" },
      { label: "C", text: "Raven" },
      { label: "D", text: "Sparrow" }
    ],
    correctAnswer: "C",
    verse: "Genesis 8:7",
    explanation: "The raven was sent before the dove. Noah carefully observed the changing conditions. Patience guided his decisions. Obedience includes waiting."
  },
  {
    id: 15,
    question: "What sign did God give as a covenant after the flood?",
    options: [
      { label: "A", text: "A flame" },
      { label: "B", text: "A rainbow" },
      { label: "C", text: "A mountain" },
      { label: "D", text: "A star" }
    ],
    correctAnswer: "B",
    verse: "Genesis 9:13",
    explanation: "The rainbow is a visible reminder of God's promise. God commits Himself never to destroy the earth by flood again. This covenant is unconditional. Mercy follows judgment."
  },
  {
    id: 16,
    question: "Who became drunk after planting a vineyard?",
    options: [
      { label: "A", text: "Noah" },
      { label: "B", text: "Lot" },
      { label: "C", text: "Abraham" },
      { label: "D", text: "Isaac" }
    ],
    correctAnswer: "A",
    verse: "Genesis 9:21",
    explanation: "This moment shows Noah's humanity and weakness. Scripture does not hide flaws of faithful people. Righteousness does not mean perfection. God's grace remains."
  },
  {
    id: 17,
    question: "What was the sin behind the Tower of Babel?",
    options: [
      { label: "A", text: "Idolatry" },
      { label: "B", text: "Violence" },
      { label: "C", text: "Pride and self exaltation" },
      { label: "D", text: "False sacrifice" }
    ],
    correctAnswer: "C",
    verse: "Genesis 11:4",
    explanation: "The people sought independence from God. Their goal was self glory not obedience. God confused their language to stop them. Pride leads to division."
  },
  {
    id: 18,
    question: "Where was Abram originally from?",
    options: [
      { label: "A", text: "Canaan" },
      { label: "B", text: "Egypt" },
      { label: "C", text: "Ur of the Chaldeans" },
      { label: "D", text: "Babylon" }
    ],
    correctAnswer: "C",
    verse: "Genesis 11:31",
    explanation: "Abram was called to leave familiarity and security. Faith often begins with leaving what is known. God initiates the journey. Obedience starts with trust."
  },
  {
    id: 19,
    question: "What promise did God make to Abram?",
    options: [
      { label: "A", text: "Wealth only" },
      { label: "B", text: "Political power" },
      { label: "C", text: "Land descendants and blessing" },
      { label: "D", text: "Immediate kingship" }
    ],
    correctAnswer: "C",
    verse: "Genesis 12:2",
    explanation: "God promised land descendants and global blessing. This covenant shapes the entire Bible. Israel and Jesus flow from this promise. God's plan is long term."
  },
  {
    id: 20,
    question: "What was Abram's wife's original name?",
    options: [
      { label: "A", text: "Rebecca" },
      { label: "B", text: "Sarai" },
      { label: "C", text: "Rachel" },
      { label: "D", text: "Leah" }
    ],
    correctAnswer: "B",
    verse: "Genesis 11:29",
    explanation: "God later changes her name to Sarah. Name changes mark new identity and purpose. God redefines people. Promise transforms identity."
  },
  {
    id: 21,
    question: "Why did Abram go to Egypt?",
    options: [
      { label: "A", text: "To conquer land" },
      { label: "B", text: "To escape famine" },
      { label: "C", text: "To find family" },
      { label: "D", text: "To trade livestock" }
    ],
    correctAnswer: "B",
    verse: "Genesis 12:10",
    explanation: "Famine forced Abram into a difficult decision. Pressure reveals fear and faith. Abram struggled but God remained faithful. God's promise did not fail."
  },
  {
    id: 22,
    question: "What lie did Abram tell Pharaoh?",
    options: [
      { label: "A", text: "Sarai was his servant" },
      { label: "B", text: "Sarai was his cousin" },
      { label: "C", text: "Sarai was his sister" },
      { label: "D", text: "Sarai was his widow" }
    ],
    correctAnswer: "C",
    verse: "Genesis 12:13",
    explanation: "Abram feared for his life and lied. God protected Sarai anyway. Human failure does not cancel God's plan. Grace covers weakness."
  },
  {
    id: 23,
    question: "Who chose the fertile land near Sodom?",
    options: [
      { label: "A", text: "Abram" },
      { label: "B", text: "Lot" },
      { label: "C", text: "Isaac" },
      { label: "D", text: "Nahor" }
    ],
    correctAnswer: "B",
    verse: "Genesis 13:10",
    explanation: "Lot chose based on appearance not wisdom. His decision brought later trouble. Sight based choices often carry hidden cost. Wisdom looks beyond surface."
  },
  {
    id: 24,
    question: "Who rescued Lot after he was captured?",
    options: [
      { label: "A", text: "Pharaoh" },
      { label: "B", text: "Abram" },
      { label: "C", text: "Melchizedek" },
      { label: "D", text: "The king of Sodom" }
    ],
    correctAnswer: "B",
    verse: "Genesis 14:14",
    explanation: "Abram acted courageously and sacrificially. Faith produces action. Abram becomes a protector. Righteousness involves responsibility."
  },
  {
    id: 25,
    question: "Who blessed Abram after the battle?",
    options: [
      { label: "A", text: "Pharaoh" },
      { label: "B", text: "Melchizedek" },
      { label: "C", text: "An angel" },
      { label: "D", text: "The king of Sodom" }
    ],
    correctAnswer: "B",
    verse: "Genesis 14:19",
    explanation: "Melchizedek was a priest of God Most High. He blesses Abram and receives a tithe. Hebrews later connects him to Christ. Genesis points forward to Jesus."
  }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function GenesisTriviaPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingVerseText, setLoadingVerseText] = useState(false);

  useEffect(() => {
    // Load user
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    }
    loadUser();

    // Randomize and select 10 questions
    const shuffled = shuffleArray(ALL_QUESTIONS);
    setQuestions(shuffled.slice(0, 10));
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleAnswerSelect = async (answer: string) => {
    if (selectedAnswer) return; // Prevent changing answer
    
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setCorrectCount(prev => prev + 1);
    }

    // Track trivia question attempt
    if (userId) {
      try {
        // Get username
        const { data: { user } } = await supabase.auth.getUser();
        let username = "User";
        if (user) {
          const meta: any = user.user_metadata || {};
          username = meta.firstName || meta.first_name || (user.email ? user.email.split("@")[0] : null) || "User";
        }

        // Insert into master_actions
        await supabase.from("master_actions").insert({
          user_id: userId,
          action_type: "trivia_question_attempted",
          action_label: `Genesis Q${currentQuestion.id}`,
          username: username
        });
      } catch (error) {
        console.error("Error tracking trivia question:", error);
      }
    }

    // Fetch verse text if not already loaded
    if (!currentQuestion.verseText) {
      setLoadingVerseText(true);
      try {
        const verseText = await fetchVerseText(currentQuestion.verse);
        setQuestions(prev => {
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
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsFlipped(false);
    } else {
      setShowResults(true);
    }
  };

  const getEncouragementMessage = (score: number) => {
    if (score === 10) return "Perfect! You're a Genesis expert!";
    if (score >= 8) return "Excellent! You know Genesis well!";
    if (score >= 6) return "Good job! Keep studying Genesis!";
    if (score >= 4) return "Nice try! Genesis has much to explore!";
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
              href="/bible-trivia/genesis"
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
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/bible-trivia"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            ← Back
          </Link>
          <div className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>

        {/* Card Container */}
        <div className="relative mb-8" style={{ perspective: "1000px" }}>
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
            }}
          >
            {/* Front of Card */}
            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)"
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

            {/* Back of Card */}
            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8 absolute top-0 left-0"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)"
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

