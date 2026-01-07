"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export function NewMessageAlert() {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);

  useEffect(() => {
    async function checkAdminAndNewMessages() {
      try {
        // Check if user is admin
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || user.email !== "moorelouis3@gmail.com") {
          return;
        }

        setIsAdmin(true);

        // Get last viewed timestamp from sessionStorage
        const lastViewedKey = "lastInboxView";
        const lastViewed = sessionStorage.getItem(lastViewedKey);
        const lastViewedDate = lastViewed ? new Date(lastViewed) : null;

        // Check for new feedback
        let feedbackQuery = supabase
          .from("user_feedback")
          .select("created_at")
          .order("created_at", { ascending: false })
          .limit(1);

        // Check for new requests
        let requestsQuery = supabase
          .from("user_requests")
          .select("created_at")
          .order("created_at", { ascending: false })
          .limit(1);

        const [feedbackResult, requestsResult] = await Promise.all([
          feedbackQuery,
          requestsQuery,
        ]);

        let hasNew = false;

        // Check feedback
        if (feedbackResult.data && feedbackResult.data.length > 0) {
          const latestFeedback = new Date(feedbackResult.data[0].created_at);
          if (!lastViewedDate || latestFeedback > lastViewedDate) {
            hasNew = true;
          }
        }

        // Check requests
        if (!hasNew && requestsResult.data && requestsResult.data.length > 0) {
          const latestRequest = new Date(requestsResult.data[0].created_at);
          if (!lastViewedDate || latestRequest > lastViewedDate) {
            hasNew = true;
          }
        }

        if (hasNew) {
          setHasNewMessages(true);
          setShowAlert(true);
          // Reset dismissed flag since there are new messages
          sessionStorage.removeItem("newMessageAlertDismissed");
        } else {
          // Check if alert was already dismissed this session (only if no new messages)
          const dismissed = sessionStorage.getItem("newMessageAlertDismissed");
          if (dismissed === "true") {
            return;
          }
        }
      } catch (err) {
        console.error("[NEW_MESSAGE_ALERT] Error checking messages:", err);
      }
    }

    checkAdminAndNewMessages();
  }, []);

  const handleDismiss = () => {
    setShowAlert(false);
    sessionStorage.setItem("newMessageAlertDismissed", "true");
  };

  const handleViewMessage = () => {
    setShowAlert(false);
    sessionStorage.setItem("newMessageAlertDismissed", "true");
    // Update last viewed timestamp to now (user is going to view inbox)
    sessionStorage.setItem("lastInboxView", new Date().toISOString());
    // Navigate to analytics page - the inbox section will be visible
    router.push("/admin/analytics");
    // Scroll to inbox section after navigation
    setTimeout(() => {
      const inboxSection = document.querySelector('[data-inbox-section]');
      if (inboxSection) {
        inboxSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 500);
  };

  if (!showAlert || !isAdmin || !hasNewMessages) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">
            New message received
          </h3>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 text-xl font-bold ml-4"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
        <p className="text-gray-700 mb-4">
          You have a new message in your inbox.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleViewMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View message
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

