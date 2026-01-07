"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AnalyticsPage() {
  // Active Users Right Now
  const [activeUsers, setActiveUsers] = useState(0);
  const [loadingActiveUsers, setLoadingActiveUsers] = useState(true);

  // Admin Action Log
  const [actionLog, setActionLog] = useState<Array<{ date: string; text: string; sortKey: number; actionType: string }>>([]);
  const [loadingActionLog, setLoadingActionLog] = useState(true);

  useEffect(() => {
    loadActiveUsers();
    buildAdminActionLog();
  }, []);

  // Load active users (within last 10 minutes)
  async function loadActiveUsers() {
    setLoadingActiveUsers(true);
    try {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      
      const { data, error } = await supabase
        .from("master_actions")
        .select("user_id")
        .gte("created_at", tenMinutesAgo);

      if (error) {
        console.error("[ACTIVE_USERS] Error fetching active users:", error);
        setActiveUsers(0);
        setLoadingActiveUsers(false);
        return;
      }

      // Count distinct user_ids
      const uniqueUserIds = new Set(data?.map(action => action.user_id).filter(Boolean) || []);
      setActiveUsers(uniqueUserIds.size);
      setLoadingActiveUsers(false);
    } catch (err) {
      console.error("[ACTIVE_USERS] Error loading active users:", err);
      setActiveUsers(0);
      setLoadingActiveUsers(false);
    }
  }

  // Build Admin Action Log from master_actions table (all users)
  async function buildAdminActionLog() {
    setLoadingActionLog(true);
    const actions: Array<{ date: string; text: string; sortKey: number; actionType: string }> = [];

    try {
      // Get all actions from master_actions table (no user_id filter)
      const { data: masterActions, error: actionsError } = await supabase
        .from("master_actions")
        .select("action_type, action_label, created_at, username")
        .order("created_at", { ascending: false })
        .limit(200); // Limit to 200 most recent actions

      if (actionsError) {
        console.error("[ADMIN_ACTION_LOG] Error fetching master_actions:", actionsError);
        setActionLog([]);
        setLoadingActionLog(false);
        return;
      }

      if (!masterActions || masterActions.length === 0) {
        setActionLog([]);
        setLoadingActionLog(false);
        return;
      }

      // Track unique login dates per user (one per day)
      const userLoginDates = new Map<string, Set<string>>();

      for (const action of masterActions) {
        const actionDate = new Date(action.created_at);
        const dateKey = actionDate.toISOString().split('T')[0]; // YYYY-MM-DD
        const formattedDate = formatAdminActionDate(actionDate);
        const formattedTime = formatAdminActionTime(actionDate);
        const username = action.username || "Unknown User";

        // Only process allowed action types
        if (action.action_type === "chapter_completed") {
          const text = action.action_label 
            ? `On ${formattedDate} at ${formattedTime}, ${username} completed ${action.action_label}.`
            : `On ${formattedDate} at ${formattedTime}, ${username} completed a chapter.`;
          actions.push({
            date: formattedDate,
            text,
            sortKey: actionDate.getTime(),
            actionType: "chapter_completed",
          });
        } else if (action.action_type === "book_completed") {
          const text = action.action_label 
            ? `On ${formattedDate} at ${formattedTime}, ${username} finished ${action.action_label}.`
            : `On ${formattedDate} at ${formattedTime}, ${username} finished a book.`;
          actions.push({
            date: formattedDate,
            text,
            sortKey: actionDate.getTime(),
            actionType: "book_completed",
          });
        } else if (action.action_type === "person_learned") {
          const text = action.action_label 
            ? `On ${formattedDate} at ${formattedTime}, ${username} learned about ${action.action_label}.`
            : `On ${formattedDate} at ${formattedTime}, ${username} learned about a new person.`;
          actions.push({
            date: formattedDate,
            text,
            sortKey: actionDate.getTime(),
            actionType: "person_learned",
          });
        } else if (action.action_type === "place_discovered") {
          const text = action.action_label 
            ? `On ${formattedDate} at ${formattedTime}, ${username} discovered ${action.action_label}.`
            : `On ${formattedDate} at ${formattedTime}, ${username} discovered a new place.`;
          actions.push({
            date: formattedDate,
            text,
            sortKey: actionDate.getTime(),
            actionType: "place_discovered",
          });
        } else if (action.action_type === "keyword_mastered") {
          const text = action.action_label 
            ? `On ${formattedDate} at ${formattedTime}, ${username} mastered ${action.action_label}.`
            : `On ${formattedDate} at ${formattedTime}, ${username} mastered a new keyword.`;
          actions.push({
            date: formattedDate,
            text,
            sortKey: actionDate.getTime(),
            actionType: "keyword_mastered",
          });
        } else if (action.action_type === "note_created") {
          actions.push({
            date: formattedDate,
            text: `On ${formattedDate} at ${formattedTime}, ${username} created a note.`,
            sortKey: actionDate.getTime(),
            actionType: "note_created",
          });
        } else if (action.action_type === "user_login") {
          // Only show one login per day per user (backend already handles this, but filter for safety)
          if (!userLoginDates.has(username)) {
            userLoginDates.set(username, new Set());
          }
          const userLogins = userLoginDates.get(username)!;
          
          if (!userLogins.has(dateKey)) {
            userLogins.add(dateKey);
            actions.push({
              date: formattedDate,
              text: `On ${formattedDate} at ${formattedTime}, ${username} logged in.`,
              sortKey: actionDate.getTime(),
              actionType: "user_login",
            });
          }
        }
        // Ignore all other action types
      }

      // Actions are already sorted by created_at DESC from the query, but sort again to be safe
      actions.sort((a, b) => b.sortKey - a.sortKey);
      setActionLog(actions);
      setLoadingActionLog(false);
    } catch (err) {
      console.error("[ADMIN_ACTION_LOG] Error building admin action log:", err);
      setActionLog([]);
      setLoadingActionLog(false);
    }
  }

  // Format date for admin action log (includes month and day)
  function formatAdminActionDate(date: Date): string {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  }

  // Format time for admin action log (12-hour format with AM/PM)
  function formatAdminActionTime(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  }

  // Get color class for action type (reusing profile page colors)
  function getActionColorClass(actionType: string): string {
    switch (actionType) {
      case "chapter_completed":
        return "bg-green-50 border-l-4 border-green-500";
      case "book_completed":
        return "bg-green-100 border-l-4 border-green-600";
      case "note_created":
        return "bg-yellow-50 border-l-4 border-yellow-500";
      case "person_learned":
        return "bg-pink-50 border-l-4 border-pink-500";
      case "place_discovered":
        return "bg-cyan-50 border-l-4 border-cyan-500";
      case "keyword_mastered":
        return "bg-purple-50 border-l-4 border-purple-500";
      case "user_login":
        return "bg-blue-50 border-l-4 border-blue-500";
      default:
        return "bg-gray-50 border-l-4 border-gray-400";
    }
  }


  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      {/* ACTIVE USERS RIGHT NOW */}
      <div className="mb-12 text-center">
        {loadingActiveUsers ? (
          <div className="py-8">
            <p className="text-gray-500 text-sm">Loading...</p>
          </div>
        ) : (
          <>
            <div className="text-7xl font-bold text-gray-900 mb-2">
              {activeUsers}
            </div>
            <p className="text-lg text-gray-600">
              users are studying the Bible right now
            </p>
          </>
        )}
      </div>

      {/* ADMIN ACTION LOG SECTION */}
      <div className="mt-12 mb-6">
        <h2 className="text-2xl font-bold mb-4">Action Log (All Users)</h2>
        
        {loadingActionLog ? (
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Loading actions...</p>
          </div>
        ) : actionLog.length === 0 ? (
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">No actions yet.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className={`max-h-96 overflow-y-auto ${actionLog.length > 10 ? 'p-4' : 'p-4'}`}>
              {actionLog.map((action, idx) => (
                <div
                  key={idx}
                  className={`mb-2 p-3 rounded ${getActionColorClass(action.actionType)}`}
                >
                  <p className="text-sm text-gray-900">{action.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-6">
        Admin view only (moorelouis3@gmail.com)
      </p>
    </div>
  );
}
