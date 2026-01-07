"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface FeedbackModalProps {
  userId: string;
  username: string;
  isOpen: boolean;
  onClose: () => void;
  onDoLater: () => void;
  onNo: () => void;
}

export function FeedbackModal({
  userId,
  username,
  isOpen,
  onClose,
  onDoLater,
  onNo,
}: FeedbackModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Survey questions (EXACT text as specified)
  const questions = [
    {
      id: "happiness_rating",
      question: "How happy are you with Bible Buddy?",
      options: ["Very happy", "Somewhat happy", "Neutral", "Not happy"],
    },
    {
      id: "usefulness_rating",
      question: "How useful do you find Bible Buddy for understanding the Bible?",
      options: ["Extremely useful", "Very useful", "Somewhat useful", "Not very useful"],
    },
    {
      id: "usage_frequency",
      question: "How often would you use Bible Buddy?",
      options: ["Daily", "4–5 days a week", "2–3 days a week", "Once in a while"],
    },
    {
      id: "recommendation_likelihood",
      question: "How likely are you to recommend Bible Buddy to someone else?",
      options: ["Very likely", "Likely", "Neutral", "Unlikely"],
    },
    {
      id: "improvement_feedback",
      question: "If you could change, remove, or add anything to Bible Buddy, what would it be?",
      type: "textarea",
      optional: true,
    },
    {
      id: "review_text",
      question: "Could you write us a 2–3 sentence review for Bible Buddy please?",
      type: "textarea",
      optional: true,
    },
  ];

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Get username from auth if not provided
      let finalUsername = username;
      if (!finalUsername) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const meta: any = user.user_metadata || {};
          finalUsername =
            meta.firstName ||
            meta.first_name ||
            (user.email ? user.email.split("@")[0] : null) ||
            "User";
        }
      }

      // Insert feedback with exact column names
      const { error: insertError } = await supabase
        .from("user_feedback")
        .upsert({
          user_id: userId,
          username: finalUsername,
          happiness_rating: answers.happiness_rating || null,
          usefulness_rating: answers.usefulness_rating || null,
          usage_frequency: answers.usage_frequency || null,
          recommendation_likelihood: answers.recommendation_likelihood || null,
          improvement_feedback: answers.improvement_feedback || null,
          review_text: answers.review_text || null,
        }, {
          onConflict: "user_id",
        });

      if (insertError) {
        console.error("[FEEDBACK] Error submitting feedback:", insertError);
        console.error("[FEEDBACK] Insert error details:", JSON.stringify(insertError, null, 2));
        alert("Failed to submit feedback. Please try again.");
        setSubmitting(false);
        return;
      }

      // Send to analytics inbox
      await sendToAnalyticsInbox(userId, finalUsername, answers);

      // Close modal and hide banner permanently
      onClose();
      // Reload page to hide banner
      window.location.reload();
    } catch (err) {
      console.error("[FEEDBACK] Error in submit:", err);
      alert("Failed to submit feedback. Please try again.");
      setSubmitting(false);
    }
  };

  const handleDoLater = async () => {
    try {
      // Save dismissal timestamp (banner stays visible)
      const { error: updateError } = await supabase
        .from("user_feedback")
        .upsert({
          user_id: userId,
          last_dismissed_at: new Date().toISOString(),
        }, {
          onConflict: "user_id",
        });

      if (updateError) {
        console.error("[FEEDBACK] Error saving dismissal:", updateError);
      }

      // Close modal but keep banner visible
      onDoLater();
      setShowSurvey(false);
      setAnswers({});
    } catch (err) {
      console.error("[FEEDBACK] Error in do later:", err);
      onDoLater();
    }
  };

  const handleNo = async () => {
    try {
      // Save dismissal timestamp and mark as permanently dismissed
      const { error: updateError } = await supabase
        .from("user_feedback")
        .upsert({
          user_id: userId,
          last_dismissed_at: new Date().toISOString(),
        }, {
          onConflict: "user_id",
        });

      if (updateError) {
        console.error("[FEEDBACK] Error saving no response:", updateError);
      }

      // Permanently hide banner and modal
      onNo();
      setShowSurvey(false);
      setAnswers({});
    } catch (err) {
      console.error("[FEEDBACK] Error in no:", err);
      onNo();
    }
  };

  const sendToAnalyticsInbox = async (
    userId: string,
    username: string,
    feedbackData: Record<string, string>
  ) => {
    try {
      // Create a message in admin_logs
      const feedbackText = Object.entries(feedbackData)
        .filter(([_, value]) => value && value.trim())
        .map(([key, value]) => {
          const question = questions.find((q) => q.id === key);
          return `${question?.question || key}: ${value}`;
        })
        .join("\n\n");

      const message = `New Feedback from ${username} (${userId}):\n\n${feedbackText}`;

      // Insert into admin_logs as an inbox message
      const { error: logError } = await supabase
        .from("admin_logs")
        .insert({
          message,
          admin_email: "moorelouis3@gmail.com",
        });

      if (logError) {
        console.error("[FEEDBACK] Error sending to analytics inbox:", logError);
      }
    } catch (err) {
      console.error("[FEEDBACK] Error in sendToAnalyticsInbox:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {!showSurvey ? (
            <>
              {/* Personal Message (EXACT text) */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Hey {username},</h2>
                <p className="text-gray-700 text-lg">
                  Thank you for being a user of Bible Buddy. I truly hope it's helping you understand the Bible better.
                </p>
                <p className="text-gray-700 text-lg mt-2">
                  Would you take 3 minutes to answer a short questionnaire? Your feedback helps make Bible Buddy better for everyone.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleNo}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  No
                </button>
                <button
                  onClick={handleDoLater}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Do later
                </button>
                <button
                  onClick={() => setShowSurvey(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Take survey
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Survey Questions */}
              <div className="space-y-6 mb-6">
                {questions.map((q) => (
                  <div key={q.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {q.question}
                      {q.optional && <span className="text-gray-500 text-xs ml-2">(Optional)</span>}
                    </label>
                    {q.type === "textarea" ? (
                      <textarea
                        value={answers[q.id] || ""}
                        onChange={(e) =>
                          setAnswers({ ...answers, [q.id]: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder={q.optional ? "Your answer (optional)..." : "Your answer..."}
                      />
                    ) : (
                      <div className="space-y-2">
                        {q.options?.map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={q.id}
                              value={option}
                              checked={answers[q.id] === option}
                              onChange={(e) =>
                                setAnswers({ ...answers, [q.id]: e.target.value })
                              }
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowSurvey(false);
                    setAnswers({});
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={submitting}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send feedback"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
