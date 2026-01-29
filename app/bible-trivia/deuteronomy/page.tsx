"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { logActionToMasterActions } from "@/lib/actionRecorder";

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
    const normalizedRef = reference.toLowerCase().replace(/\s+/g, '+');
    const response = await fetch(`https://bible-api.com/${normalizedRef}`);
    if (!response.ok) throw new Error('Failed to fetch verse');
    const data = await response.json();
    return data.text || '';
  } catch (error) {
    console.error('Error fetching verse:', error);
    return '';
  }
}

const ALL_QUESTIONS: Question[] = [
  { id: "deuteronomy01", question: "What is the main theme of the book of Deuteronomy?", options: [{ label: "A", text: "Creation and origins" }, { label: "B", text: "God's covenant and laws" }, { label: "C", text: "Prophecies about the Messiah" }, { label: "D", text: "Historical narratives" }], correctAnswer: "B", verse: "Deuteronomy 4:1", explanation: "Deuteronomy focuses on God's covenant relationship with Israel and the laws that govern that relationship." },
  { id: "deuteronomy02", question: "Where did Moses deliver his final speeches to Israel?", options: [{ label: "A", text: "Mount Sinai" }, { label: "B", text: "The plains of Moab" }, { label: "C", text: "Jericho" }, { label: "D", text: "The Jordan River" }], correctAnswer: "B", verse: "Deuteronomy 1:5", explanation: "Moses spoke to Israel on the plains of Moab before they entered the Promised Land." },
  { id: "deuteronomy03", question: "What does Deuteronomy mean?", options: [{ label: "A", text: "Second law" }, { label: "B", text: "Book of blessings" }, { label: "C", text: "Words of Moses" }, { label: "D", text: "Covenant renewal" }], correctAnswer: "A", verse: "Deuteronomy 17:18", explanation: "Deuteronomy means 'second law' - Moses restating God's laws before Israel enters Canaan." },
  { id: "deuteronomy04", question: "What is the greatest commandment according to Deuteronomy?", options: [{ label: "A", text: "Love your neighbor" }, { label: "B", text: "Love the Lord your God" }, { label: "C", text: "Honor your parents" }, { label: "D", text: "Keep the Sabbath" }], correctAnswer: "B", verse: "Deuteronomy 6:5", explanation: "The greatest commandment is to love God with all your heart, soul, and strength." },
  { id: "deuteronomy05", question: "What warning does Moses give about false prophets?", options: [{ label: "A", text: "They will perform miracles" }, { label: "B", text: "They will lead you to other gods" }, { label: "C", text: "They will promise wealth" }, { label: "D", text: "They will speak in foreign languages" }], correctAnswer: "B", verse: "Deuteronomy 13:1-5", explanation: "False prophets will try to lead Israel away from worshiping the one true God." },
  { id: "deuteronomy06", question: "What cities were designated as cities of refuge?", options: [{ label: "A", text: "Jerusalem, Bethlehem, Nazareth" }, { label: "B", text: "Six cities on both sides of the Jordan" }, { label: "C", text: "Three cities in Judah" }, { label: "D", text: "Twelve cities for the tribes" }], correctAnswer: "B", verse: "Deuteronomy 4:41-43", explanation: "Six cities were set aside as places of refuge for those who accidentally killed someone." },
  { id: "deuteronomy07", question: "What does Moses command Israel to do with God's laws?", options: [{ label: "A", text: "Memorize them" }, { label: "B", text: "Write them on doorposts and gates" }, { label: "C", text: "Teach them to children" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Deuteronomy 6:6-9", explanation: "Israel was to keep God's laws constantly in mind and teach them diligently." },
  { id: "deuteronomy08", question: "What does Moses say will happen if Israel forgets God?", options: [{ label: "A", text: "They will become wealthy" }, { label: "B", text: "They will be destroyed" }, { label: "C", text: "They will rule other nations" }, { label: "D", text: "They will live in peace" }], correctAnswer: "B", verse: "Deuteronomy 8:19-20", explanation: "Moses warns that forgetting God will lead to Israel's destruction." },
  { id: "deuteronomy09", question: "What is the purpose of the blessings and curses in Deuteronomy?", options: [{ label: "A", text: "To show God's favoritism" }, { label: "B", text: "To motivate obedience" }, { label: "C", text: "To predict the future" }, { label: "D", text: "To establish rituals" }], correctAnswer: "B", verse: "Deuteronomy 11:26-28", explanation: "The blessings and curses were meant to motivate Israel to choose obedience." },
  { id: "deuteronomy10", question: "What does Moses say about God's choice of Israel?", options: [{ label: "A", text: "Because they were the largest nation" }, { label: "B", text: "Because they were the most righteous" }, { label: "C", text: "Because of God's love and faithfulness" }, { label: "D", text: "Because they deserved it" }], correctAnswer: "C", verse: "Deuteronomy 7:7-8", explanation: "God chose Israel not because of their merit, but because of His love and covenant promises." },
  { id: "deuteronomy11", question: "What does Moses command about caring for the poor?", options: [{ label: "A", text: "Give generously and without grudging" }, { label: "B", text: "Only help family members" }, { label: "C", text: "Lend money at interest" }, { label: "D", text: "Ignore the poor" }], correctAnswer: "A", verse: "Deuteronomy 15:7-11", explanation: "Israel was commanded to be generous to the poor and not to harden their hearts." },
  { id: "deuteronomy12", question: "What does Moses say about justice in the courts?", options: [{ label: "A", text: "Accept bribes" }, { label: "B", text: "Show partiality to the rich" }, { label: "C", text: "Do not pervert justice" }, { label: "D", text: "Judge quickly without evidence" }], correctAnswer: "C", verse: "Deuteronomy 16:19", explanation: "Judges were commanded to judge fairly and not show partiality." },
  { id: "deuteronomy13", question: "What does Moses say about kings in Israel?", options: [{ label: "A", text: "Kings should be chosen by lot" }, { label: "B", text: "Kings should not multiply horses or wives" }, { label: "C", text: "Kings should rule forever" }, { label: "D", text: "Kings should be foreigners" }], correctAnswer: "B", verse: "Deuteronomy 17:16-17", explanation: "Kings were warned not to trust in military power or foreign alliances." },
  { id: "deuteronomy14", question: "What does Moses command about false witnesses?", options: [{ label: "A", text: "They should be rewarded" }, { label: "B", text: "They should receive the same punishment they sought" }, { label: "C", text: "They should be exiled" }, { label: "D", text: "They should pay a fine" }], correctAnswer: "B", verse: "Deuteronomy 19:16-21", explanation: "False witnesses were to receive the punishment they tried to inflict on others." },
  { id: "deuteronomy15", question: "What does Moses say about warfare?", options: [{ label: "A", text: "Kill all enemies" }, { label: "B", text: "Offer peace first, then fight if necessary" }, { label: "C", text: "Never go to war" }, { label: "D", text: "Use any means necessary" }], correctAnswer: "B", verse: "Deuteronomy 20:10-15", explanation: "Israel was to offer peace to cities before attacking them." },
  { id: "deuteronomy16", question: "What does Moses say about unsolved murders?", options: [{ label: "A", text: "Ignore them" }, { label: "B", text: "The elders must break a heifer's neck" }, { label: "C", text: "Execute the nearest relative" }, { label: "D", text: "Offer a sacrifice" }], correctAnswer: "B", verse: "Deuteronomy 21:1-9", explanation: "In cases of unsolved murder, the elders performed a ritual to symbolically remove guilt." },
  { id: "deuteronomy17", question: "What does Moses say about rebellious children?", options: [{ label: "A", text: "Discipline them severely" }, { label: "B", text: "Stone them to death" }, { label: "C", text: "Send them away" }, { label: "D", text: "Forgive them always" }], correctAnswer: "B", verse: "Deuteronomy 21:18-21", explanation: "Rebellious children who refused discipline were to be executed as a severe warning." },
  { id: "deuteronomy18", question: "What does Moses say about compassion for animals?", options: [{ label: "A", text: "Do not muzzle an ox while threshing" }, { label: "B", text: "Kill animals for food only" }, { label: "C", text: "Treat animals like people" }, { label: "D", text: "Never work animals" }], correctAnswer: "A", verse: "Deuteronomy 25:4", explanation: "Workers should allow animals to eat while working, showing kindness to creatures." },
  { id: "deuteronomy19", question: "What is Moses' final blessing to Israel?", options: [{ label: "A", text: "Wealth and prosperity" }, { label: "B", text: "Military victory" }, { label: "C", text: "God's presence and favor" }, { label: "D", text: "Long life" }], correctAnswer: "C", verse: "Deuteronomy 33:29", explanation: "Moses' final blessing emphasizes Israel's unique relationship with God." },
  { id: "deuteronomy20", question: "What does Moses say about God's uniqueness?", options: [{ label: "A", text: "He is the greatest among many gods" }, { label: "B", text: "He is the only God" }, { label: "C", text: "He is like other gods" }, { label: "D", text: "He changes like other gods" }], correctAnswer: "B", verse: "Deuteronomy 4:35", explanation: "Deuteronomy repeatedly emphasizes that Yahweh is the one true God." },
];

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function DeuteronomyTriviaPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingVerseText, setLoadingVerseText] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    }
    loadUser();

    const shuffled = shuffleArray(ALL_QUESTIONS);
    setQuestions(shuffled.slice(0, 10));
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleAnswerSelect = async (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setCorrectCount(prev => prev + 1);
    }

    if (userId) {
      try {
        // Get username
        const { data: { user } } = await supabase.auth.getUser();
        let username = "User";
        if (user) {
          const meta: any = user.user_metadata || {};
          username = meta.firstName || meta.first_name || (user.email ? user.email.split("@")[0] : null) || "User";
        }

        // Insert into master_actions via server-side API (uses service role)
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username });
        const response = await fetch('/api/trivia-answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            questionId: currentQuestion.id,
            username
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to record trivia answer:', response.status, errorText);
        } else {
          console.log('Successfully recorded trivia answer');
        }

        // Increment profile_stats.trivia_questions_answered
        const { data: currentStats } = await supabase
          .from('profile_stats')
          .select('trivia_questions_answered')
          .eq('user_id', userId)
          .single();
        
        if (currentStats) {
          await supabase
            .from('profile_stats')
            .update({
              trivia_questions_answered: (currentStats.trivia_questions_answered || 0) + 1
            })
            .eq('user_id', userId);
        }
      } catch (error) {
        console.error("Error tracking trivia question:", error);
      }
    }

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

  if (!questions.length) return null;

  if (showResults) {
    const percentage = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <div className="text-4xl font-bold text-blue-600 mb-2">{correctCount}/{questions.length}</div>
          <div className="text-lg text-gray-600 mb-6">{percentage}% Correct</div>
          
          <div className="space-y-3">
            <Link href="/bible-trivia/deuteronomy">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                Try Again
              </button>
            </Link>
            <Link href="/bible-trivia">
              <button className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                Choose Another Book
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <Link href="/bible-trivia" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            ← Back to Trivia
          </Link>
          <h1 className="text-3xl font-semibold mb-2">📜 Deuteronomy Trivia</h1>
          <p className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            {correctCount} correct answers
          </div>
        </div>

        {/* Question Card */}
        <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ${isFlipped ? 'transform rotate-y-180' : ''}`}>
          {/* Front of card - Question */}
          <div className={`p-8 ${isFlipped ? 'hidden' : 'block'}`}>
            <h2 className="text-xl font-semibold mb-6 text-center">{currentQuestion.question}</h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleAnswerSelect(option.label)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedAnswer === null
                      ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      : selectedAnswer === option.label
                        ? option.label === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-red-500 bg-red-50 text-red-800'
                        : option.label === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-gray-200 opacity-50'
                  }`}
                >
                  <span className="font-semibold mr-3">{option.label}.</span>
                  {option.text}
                </button>
              ))}
            </div>
          </div>

          {/* Back of card - Answer */}
          <div className={`p-8 ${isFlipped ? 'block' : 'hidden'}`}>
            <div className="text-center mb-6">
              <div className={`text-4xl mb-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                {isCorrect ? '✅' : '❌'}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                The correct answer was: <span className="font-semibold">
                  {currentQuestion.options.find(opt => opt.label === currentQuestion.correctAnswer)?.text}
                </span>
              </p>
            </div>

            {/* Verse */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="text-sm text-gray-600 mb-2">{currentQuestion.verse}</div>
              {loadingVerseText ? (
                <div className="text-gray-500 text-sm">Loading verse...</div>
              ) : currentQuestion.verseText ? (
                <div className="text-gray-800 italic text-sm">"{currentQuestion.verseText}"</div>
              ) : null}
            </div>

            {/* Explanation */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Explanation:</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{currentQuestion.explanation}</p>
            </div>

            {/* Next Button */}
            <div className="text-center">
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white py-3 px-8 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}