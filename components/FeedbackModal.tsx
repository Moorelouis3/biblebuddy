"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface FeedbackModalProps {
  userId: string;
  username: string;
  isOpen: boolean;
  onClose: () => void;
  onDismiss: () => void;
}

export function FeedbackModal({
  userId,
  username,
  isOpen,
  onClose,
  onDismiss,
}: FeedbackModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Survey questions (using standard feedback questions)
  const questions = [
    {
      id: "satisfaction",
      question: "How satisfied are you with Bible Buddy?",
      options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
    },
    {
      id: "helpful",
      question: "How helpful has Bible Buddy been for understanding the Bible?",
      options: ["Extremely helpful", "Very helpful", "Somewhat helpful", "Not very helpful", "Not helpful at all"],
    },
    {
      id: "recommend",
      question: "How likely are you to recommend Bible Buddy to a friend?",
      options: ["Extremely likely", "Very likely", "Somewhat likely", "Not very likely", "Not likely at all"],
    },
    {
      id: "improvements",
      question: "What improvements would you like to see?",
      type: "textarea",
    },
    {
      id: "additional",
      question: "Any additional comments?",
      type: "textarea",
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

      // Insert feedback
      const { error: insertError } = await supabase
        .from("user_feedback")
        .upsert({
          user_id: userId,
          username: finalUsername,
          submitted_at: new Date().toISOString(),
          feedback_data: answers,
        }, {
          onConflict: "user_id",
        });

      if (insertError) {
        console.error("[FEEDBACK] Error submitting feedback:", insertError);
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

  const handleDismiss = async () => {
    try {
      // Save dismissal timestamp
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

      onDismiss();
    } catch (err) {
      console.error("[FEEDBACK] Error in dismiss:", err);
      onDismiss();
    }
  };

  const sendToAnalyticsInbox = async (
    userId: string,
    username: string,
    feedbackData: Record<string, string>
  ) => {
    try {
      // Create a message in admin_logs or a dedicated inbox table
      const feedbackText = Object.entries(feedbackData)
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
          {/* Personal Message */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="text-gray-700 text-lg">
              {username}, thank you for being a user of Bible Buddy.
            </p>
            <p className="text-gray-700 text-lg mt-2">
              I truly hope it's helping you understand the Bible better.
            </p>
            <p className="text-gray-700 text-lg mt-2">
              Would you take 3 minutes to answer a short questionnaire?
            </p>
          </div>

          {/* Survey Questions */}
          <div className="space-y-6 mb-6">
            {questions.map((q) => (
              <div key={q.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {q.question}
                </label>
                {q.type === "textarea" ? (
                  <textarea
                    value={answers[q.id] || ""}
                    onChange={(e) =>
                      setAnswers({ ...answers, [q.id]: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Your answer..."
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

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleDismiss}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={submitting}
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send feedback"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

