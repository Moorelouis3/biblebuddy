"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface ContactUsModalProps {
  userId: string;
  username: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactUsModal({
  userId,
  username,
  isOpen,
  onClose,
}: ContactUsModalProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subjectOptions = [
    { value: "bug", label: "🐞 Report a bug", emoji: "🐞" },
    { value: "feature", label: "✨ Request a feature", emoji: "✨" },
    { value: "question", label: "❓ Ask a question", emoji: "❓" },
    { value: "improvement", label: "💡 Suggest an improvement", emoji: "💡" },
    { value: "other", label: "🧠 Other", emoji: "🧠" },
  ];

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setScreenshot(file);
    } else if (file) {
      alert("Please select an image file.");
      e.target.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!subject) {
      setError("Please select a subject.");
      return;
    }

    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }

    setSubmitting(true);
    setError(null);

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

      // Upload screenshot if provided (optional for now - skip if not trivial)
      let screenshotUrl: string | null = null;
      if (screenshot) {
        // For now, we'll skip screenshot upload as it requires storage bucket setup
        // This can be added later if needed
        console.log("[CONTACT_US] Screenshot upload skipped (not implemented yet)");
      }

      // Get subject label for display
      const subjectLabel = subjectOptions.find((opt) => opt.value === subject)?.label || subject;

      // Insert into user_requests table
      const { error: insertError } = await supabase
        .from("user_requests")
        .insert({
          user_id: userId,
          username: finalUsername,
          subject: subjectLabel,
          message: message.trim(),
          screenshot_url: screenshotUrl,
        });

      if (insertError) {
        console.error("[CONTACT_US] Error submitting request:", insertError);
        setError("Failed to send message. Please try again.");
        setSubmitting(false);
        return;
      }

      // Success - close modal and reset form
      setSubject("");
      setMessage("");
      setScreenshot(null);
      setError(null);
      onClose();
      
      // Show success message
      alert("Thank you! Your message has been sent. We'll get back to you soon.");
    } catch (err) {
      console.error("[CONTACT_US] Error in submit:", err);
      setError("Failed to send message. Please try again.");
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">📬 Contact Us</h2>
            <p className="text-gray-600">
              Have a question, idea, or found an issue? Send it directly to the developer.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Username (Read-only) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <input
              type="text"
              value={username}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Subject (Dropdown) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What is this about?
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an option...</option>
              {subjectOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message Body */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
              placeholder="Describe your message here…"
            />
          </div>

          {/* Optional Screenshot Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Screenshot (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleScreenshotChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {screenshot && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {screenshot.name}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send message"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

