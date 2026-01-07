"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type TimeFilter = "24h" | "7d" | "30d" | "1y" | "all";

type OverviewMetrics = {
  signups: number;
  logins: number;
  totalActions: number;
  chaptersRead: number;
  notesCreated: number;
  peopleLearned: number;
  placesDiscovered: number;
  keywordsUnderstood: number;
};

const INITIAL_METRICS: OverviewMetrics = {
  signups: 0,
  logins: 0,
  totalActions: 0,
  chaptersRead: 0,
  notesCreated: 0,
  peopleLearned: 0,
  placesDiscovered: 0,
  keywordsUnderstood: 0,
};

export default function AnalyticsPage() {
  // Active Users Right Now
  const [activeUsers, setActiveUsers] = useState(0);
  const [loadingActiveUsers, setLoadingActiveUsers] = useState(true);

  // Global overview metrics
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("24h");
  const [overviewMetrics, setOverviewMetrics] =
    useState<OverviewMetrics>(INITIAL_METRICS);
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [overviewError, setOverviewError] = useState<string | null>(null);

  // Action type filter for Action Log
  const [selectedActionType, setSelectedActionType] = useState<string | null>(null);

  // Admin Action Log
  const [actionLog, setActionLog] = useState<
    Array<{ date: string; text: string; sortKey: number; actionType: string }>
  >([]);
  const [loadingActionLog, setLoadingActionLog] = useState(true);

  // Feedback Inbox
  const [feedbackInbox, setFeedbackInbox] = useState<
    Array<{ id: string; username: string; created_at: string; date: string; time: string }>
  >([]);
  const [loadingInbox, setLoadingInbox] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null);
  
  // User Requests Inbox
  const [userRequestsInbox, setUserRequestsInbox] = useState<
    Array<{ id: string; username: string; subject: string; created_at: string; date: string; time: string }>
  >([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  useEffect(() => {
    loadActiveUsers();
    loadFeedbackInbox();
    loadUserRequestsInbox();
  }, []);

  useEffect(() => {
    loadOverviewMetrics(timeFilter);
    buildAdminActionLog(timeFilter, selectedActionType);
  }, [timeFilter, selectedActionType]);

  // Load active users (within last 60 minutes)
  async function loadActiveUsers() {
    setLoadingActiveUsers(true);
    try {
      const sixtyMinutesAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      
      const { data, error } = await supabase
        .from("master_actions")
        .select("user_id")
        .gte("created_at", sixtyMinutesAgo);

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

  function getFromDate(filter: TimeFilter): string | null {
    if (filter === "all") return null;

    const now = new Date();
    if (filter === "24h") {
      return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    }
    if (filter === "7d") {
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    }
    if (filter === "30d") {
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    }
    // 1 year
    if (filter === "1y") {
      return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString();
    }
    return null;
  }

  // Load global overview metrics (all users)
  async function loadOverviewMetrics(filter: TimeFilter) {
    setLoadingOverview(true);
    setOverviewError(null);

    try {
      const fromDate = getFromDate(filter);

      // Helper to apply created_at filter if needed
      const applyDateFilter = (
        query: any,
        column: string = "created_at"
      ): any => {
        if (!fromDate) return query;
        return query.gte(column, fromDate);
      };

      // Signups: query user_signups table
      const signupsPromise = applyDateFilter(
        supabase
          .from("user_signups")
          .select("id", { count: "exact", head: true }),
        "created_at"
      );

      // Logins: distinct users with user_login within range
      const loginsPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("user_id, created_at, action_type")
          .eq("action_type", "user_login")
      );

      // Total actions: all master_actions rows
      const totalActionsPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
      );

      // Chapters read
      const chaptersPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "chapter_completed")
      );

      // Notes created (from actions)
      const notesPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "note_created")
      );

      // People learned
      const peoplePromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "person_learned")
      );

      // Places discovered
      const placesPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "place_discovered")
      );

      // Keywords understood (keyword_mastered)
      const keywordsPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "keyword_mastered")
      );

      const [
        signupsResult,
        loginRowsResult,
        totalActionsResult,
        chaptersResult,
        notesResult,
        peopleResult,
        placesResult,
        keywordsResult,
      ] = await Promise.all([
        signupsPromise,
        loginsPromise,
        totalActionsPromise,
        chaptersPromise,
        notesPromise,
        peoplePromise,
        placesPromise,
        keywordsPromise,
      ]);

      const signupsCount = signupsResult.count ?? 0;
      const signupsError = signupsResult.error;
      const loginRows = loginRowsResult.data;
      const loginsError = loginRowsResult.error;
      const totalActionsCount = totalActionsResult.count ?? 0;
      const totalActionsError = totalActionsResult.error;
      const chaptersCount = chaptersResult.count ?? 0;
      const chaptersError = chaptersResult.error;
      const notesCount = notesResult.count ?? 0;
      const notesError = notesResult.error;
      const peopleCount = peopleResult.count ?? 0;
      const peopleError = peopleResult.error;
      const placesCount = placesResult.count ?? 0;
      const placesError = placesResult.error;
      const keywordsCount = keywordsResult.count ?? 0;
      const keywordsError = keywordsResult.error;

      if (
        signupsError ||
        loginsError ||
        totalActionsError ||
        chaptersError ||
        notesError ||
        peopleError ||
        placesError ||
        keywordsError
      ) {
        console.error("[ANALYTICS_OVERVIEW] Error loading metrics:", {
          signupsError,
          loginsError,
          totalActionsError,
          chaptersError,
          notesError,
          peopleError,
          placesError,
          keywordsError,
        });
        setOverviewError("Failed to load overview metrics.");
        setOverviewMetrics(INITIAL_METRICS);
        setLoadingOverview(false);
        return;
      }

      // Distinct login users
      const distinctLoginUsers = new Set(
        (loginRows || [])
          .map((row: any) => row.user_id)
          .filter((id: string | null) => !!id)
      );

      setOverviewMetrics({
        signups: signupsCount ?? 0,
        logins: distinctLoginUsers.size,
        totalActions: totalActionsCount ?? 0,
        chaptersRead: chaptersCount ?? 0,
        notesCreated: notesCount ?? 0,
        peopleLearned: peopleCount ?? 0,
        placesDiscovered: placesCount ?? 0,
        keywordsUnderstood: keywordsCount ?? 0,
      });
      setLoadingOverview(false);
    } catch (err) {
      console.error("[ANALYTICS_OVERVIEW] Unexpected error:", err);
      setOverviewError("Failed to load overview metrics.");
      setOverviewMetrics(INITIAL_METRICS);
      setLoadingOverview(false);
    }
  }

  // Load user counts for contextual counters
  async function loadUserCounts(userIds: string[]): Promise<{
    loginDays: Map<string, number>;
    totalActions: Map<string, number>;
  }> {
    const loginDaysMap = new Map<string, number>();
    const totalActionsMap = new Map<string, number>();

    if (userIds.length === 0) {
      return { loginDays: loginDaysMap, totalActions: totalActionsMap };
    }

    try {
      // Batch fetch all actions for these users
      const { data: allUserActions, error } = await supabase
        .from("master_actions")
        .select("user_id, action_type, created_at")
        .in("user_id", userIds);

      if (error) {
        console.error("[USER_COUNTS] Error fetching user actions:", error);
        return { loginDays: loginDaysMap, totalActions: totalActionsMap };
      }

      if (!allUserActions) {
        return { loginDays: loginDaysMap, totalActions: totalActionsMap };
      }

      // Process counts per user
      const userLoginDates = new Map<string, Set<string>>();
      const userActionCounts = new Map<string, number>();

      for (const action of allUserActions) {
        const userId = action.user_id;
        if (!userId) continue;

        // Count total actions per user
        userActionCounts.set(userId, (userActionCounts.get(userId) || 0) + 1);

        // Track distinct login days per user
        if (action.action_type === "user_login") {
          const dateKey = new Date(action.created_at).toISOString().split('T')[0]; // YYYY-MM-DD
          if (!userLoginDates.has(userId)) {
            userLoginDates.set(userId, new Set());
          }
          userLoginDates.get(userId)!.add(dateKey);
        }
      }

      // Convert login dates to counts
      for (const [userId, dates] of userLoginDates.entries()) {
        loginDaysMap.set(userId, dates.size);
      }

      // Set total action counts
      for (const [userId, count] of userActionCounts.entries()) {
        totalActionsMap.set(userId, count);
      }
    } catch (err) {
      console.error("[USER_COUNTS] Error processing user counts:", err);
    }

    return { loginDays: loginDaysMap, totalActions: totalActionsMap };
  }

  // Build Admin Action Log from master_actions table (all users)
  async function buildAdminActionLog(filter?: TimeFilter, actionTypeFilter?: string | null) {
    setLoadingActionLog(true);
    const actions: Array<{ date: string; text: string; sortKey: number; actionType: string }> = [];

    try {
      const fromDate = filter ? getFromDate(filter) : null;
      
      // Build query with time filter
      let query = supabase
        .from("master_actions")
        .select("action_type, action_label, created_at, username, user_id")
        .order("created_at", { ascending: false });

      // Apply time filter
      if (fromDate) {
        query = query.gte("created_at", fromDate);
      }

      // Apply action type filter if selected
      if (actionTypeFilter) {
        query = query.eq("action_type", actionTypeFilter);
      }

      query = query.limit(200); // Limit to 200 most recent actions

      const { data: masterActions, error: actionsError } = await query;

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

      // Collect unique user IDs for batch counting
      const uniqueUserIds = new Set<string>();
      for (const action of masterActions) {
        if (action.user_id) {
          uniqueUserIds.add(action.user_id);
        }
      }

      // Batch load user counts
      const { loginDays, totalActions } = await loadUserCounts(Array.from(uniqueUserIds));

      // Track unique login dates per user (one per day) for display deduplication
      const userLoginDates = new Map<string, Set<string>>();

      for (const action of masterActions) {
        const actionDate = new Date(action.created_at);
        const dateKey = actionDate.toISOString().split('T')[0]; // YYYY-MM-DD
        const formattedDate = formatAdminActionDate(actionDate);
        const formattedTime = formatAdminActionTime(actionDate);
        const username = action.username || "Unknown User";
        const userId = action.user_id;

        // Get contextual counter
        let counterText = "";
        if (userId) {
          if (action.action_type === "user_login") {
            const loginDaysCount = loginDays.get(userId) || 0;
            counterText = ` (${loginDaysCount})`;
          } else {
            const totalActionsCount = totalActions.get(userId) || 0;
            counterText = ` (${totalActionsCount})`;
          }
        }

        // Only process allowed action types
        if (action.action_type === "chapter_completed") {
          const text = action.action_label 
            ? `On ${formattedDate} at ${formattedTime}, ${username} completed ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} completed a chapter.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            sortKey: actionDate.getTime(),
            actionType: "chapter_completed",
          });
        } else if (action.action_type === "book_completed") {
          const text = action.action_label 
            ? `On ${formattedDate} at ${formattedTime}, ${username} finished ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} finished a book.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            sortKey: actionDate.getTime(),
            actionType: "book_completed",
          });
        } else if (action.action_type === "person_learned") {
          const text = action.action_label 
            ? `On ${formattedDate} at ${formattedTime}, ${username} learned about ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} learned about a new person.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            sortKey: actionDate.getTime(),
            actionType: "person_learned",
          });
        } else if (action.action_type === "place_discovered") {
          const text = action.action_label 
            ? `On ${formattedDate} at ${formattedTime}, ${username} discovered ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} discovered a new place.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            sortKey: actionDate.getTime(),
            actionType: "place_discovered",
          });
        } else if (action.action_type === "keyword_mastered") {
          const text = action.action_label 
            ? `On ${formattedDate} at ${formattedTime}, ${username} mastered ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} mastered a new keyword.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            sortKey: actionDate.getTime(),
            actionType: "keyword_mastered",
          });
        } else if (action.action_type === "note_created") {
          actions.push({
            date: formattedDate,
            text: `On ${formattedDate} at ${formattedTime}, ${username} created a note.${counterText}`,
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
              text: `On ${formattedDate} at ${formattedTime}, ${username} logged in.${counterText}`,
              sortKey: actionDate.getTime(),
              actionType: "user_login",
            });
          }
        } else if (action.action_type === "user_signup") {
          actions.push({
            date: formattedDate,
            text: `On ${formattedDate} at ${formattedTime}, ${username} just signed up.${counterText}`,
            sortKey: actionDate.getTime(),
            actionType: "user_signup",
          });
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

  // Load feedback inbox from user_feedback table
  async function loadFeedbackInbox() {
    setLoadingInbox(true);
    try {
      const { data: feedbackData, error } = await supabase
        .from("user_feedback")
        .select("id, username, created_at, discovery_source, happiness_rating, usefulness_rating, usage_frequency, recommendation_likelihood, improvement_feedback, review_text")
        .order("created_at", { ascending: false })
        .limit(100); // Limit to 100 most recent feedback items

      if (error) {
        console.error("[FEEDBACK_INBOX] Error fetching feedback:", error);
        setFeedbackInbox([]);
        setLoadingInbox(false);
        return;
      }

      if (!feedbackData || feedbackData.length === 0) {
        setFeedbackInbox([]);
        setLoadingInbox(false);
        return;
      }

      // Format feedback items for inbox display
      const inboxItems = feedbackData.map((feedback) => {
        const feedbackDate = new Date(feedback.created_at);
        const formattedDate = formatAdminActionDate(feedbackDate);
        const formattedTime = formatAdminActionTime(feedbackDate);
        const username = feedback.username || "Unknown User";

        return {
          id: feedback.id,
          username,
          created_at: feedback.created_at,
          date: formattedDate,
          time: formattedTime,
          fullData: feedback, // Store full data for modal
        };
      });

      setFeedbackInbox(inboxItems);
      setLoadingInbox(false);
    } catch (err) {
      console.error("[FEEDBACK_INBOX] Error loading feedback inbox:", err);
      setFeedbackInbox([]);
      setLoadingInbox(false);
    }
  }

  // Open feedback detail modal
  function openFeedbackDetail(feedback: any) {
    setSelectedFeedback(feedback.fullData);
  }

  // Close feedback detail modal
  function closeFeedbackDetail() {
    setSelectedFeedback(null);
  }

  // Load user requests inbox from user_requests table
  async function loadUserRequestsInbox() {
    setLoadingRequests(true);
    try {
      const { data: requestsData, error } = await supabase
        .from("user_requests")
        .select("id, username, subject, message, screenshot_url, created_at")
        .order("created_at", { ascending: false })
        .limit(100); // Limit to 100 most recent requests

      if (error) {
        console.error("[USER_REQUESTS_INBOX] Error fetching requests:", error);
        setUserRequestsInbox([]);
        setLoadingRequests(false);
        return;
      }

      if (!requestsData || requestsData.length === 0) {
        setUserRequestsInbox([]);
        setLoadingRequests(false);
        return;
      }

      // Format request items for inbox display
      const inboxItems = requestsData.map((request) => {
        const requestDate = new Date(request.created_at);
        const formattedDate = formatAdminActionDate(requestDate);
        const formattedTime = formatAdminActionTime(requestDate);
        const username = request.username || "Unknown User";

        return {
          id: request.id,
          username,
          subject: request.subject,
          created_at: request.created_at,
          date: formattedDate,
          time: formattedTime,
          fullData: request, // Store full data for modal
        };
      });

      setUserRequestsInbox(inboxItems);
      setLoadingRequests(false);
    } catch (err) {
      console.error("[USER_REQUESTS_INBOX] Error loading requests inbox:", err);
      setUserRequestsInbox([]);
      setLoadingRequests(false);
    }
  }

  // Open request detail modal
  function openRequestDetail(request: any) {
    setSelectedRequest(request.fullData);
  }

  // Close request detail modal
  function closeRequestDetail() {
    setSelectedRequest(null);
  }

  // Format action type name for display
  function formatActionTypeName(actionType: string): string {
    const nameMap: Record<string, string> = {
      "user_signup": "Signups",
      "user_login": "Logins",
      "chapter_completed": "Chapters Read",
      "book_completed": "Books Completed",
      "note_created": "Notes Created",
      "person_learned": "People Learned",
      "place_discovered": "Places Discovered",
      "keyword_mastered": "Keywords Understood",
    };
    return nameMap[actionType] || actionType.replace(/_/g, " ");
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
      case "user_signup":
        return "bg-gray-50 border-l-4 border-gray-500";
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

      {/* GLOBAL OVERVIEW METRICS */}
      <div className="mt-4 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h2 className="text-2xl font-bold">BibleBuddy Activity Overview</h2>
          <div className="inline-flex rounded-full border border-gray-200 bg-white p-1 text-xs sm:text-sm">
            {[
              { key: "24h", label: "Last 24 Hours" },
              { key: "7d", label: "Last 7 Days" },
              { key: "30d", label: "Last 30 Days" },
              { key: "1y", label: "Last 1 Year" },
              { key: "all", label: "All Time" },
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setTimeFilter(option.key as TimeFilter)}
                className={`px-3 py-1 rounded-full transition text-xs sm:text-sm ${
                  timeFilter === option.key
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {overviewError && (
          <p className="mb-3 text-sm text-red-600">{overviewError}</p>
        )}

        {loadingOverview ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500 text-sm">Loading overview metrics...</p>
          </div>
        ) : (
          <>
            {/* ROW 1: USER ACTIVITY */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <OverviewCard
                label="Signups"
                value={overviewMetrics.signups}
                onClick={() => setSelectedActionType(selectedActionType === "user_signup" ? null : "user_signup")}
                isSelected={selectedActionType === "user_signup"}
              />
              <OverviewCard
                label="Logins"
                value={overviewMetrics.logins}
                onClick={() => setSelectedActionType(selectedActionType === "user_login" ? null : "user_login")}
                isSelected={selectedActionType === "user_login"}
              />
              <OverviewCard
                label="Total Actions"
                value={overviewMetrics.totalActions}
                onClick={() => setSelectedActionType(null)}
                isSelected={selectedActionType === null}
              />
            </div>

            {/* ROW 2: BIBLE ENGAGEMENT */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <OverviewCard
                label="Chapters Read"
                value={overviewMetrics.chaptersRead}
                onClick={() => setSelectedActionType(selectedActionType === "chapter_completed" ? null : "chapter_completed")}
                isSelected={selectedActionType === "chapter_completed"}
              />
              <OverviewCard
                label="Notes Created"
                value={overviewMetrics.notesCreated}
                onClick={() => setSelectedActionType(selectedActionType === "note_created" ? null : "note_created")}
                isSelected={selectedActionType === "note_created"}
              />
              <OverviewCard
                label="People Learned"
                value={overviewMetrics.peopleLearned}
                onClick={() => setSelectedActionType(selectedActionType === "person_learned" ? null : "person_learned")}
                isSelected={selectedActionType === "person_learned"}
              />
              <OverviewCard
                label="Places Discovered"
                value={overviewMetrics.placesDiscovered}
                onClick={() => setSelectedActionType(selectedActionType === "place_discovered" ? null : "place_discovered")}
                isSelected={selectedActionType === "place_discovered"}
              />
              <OverviewCard
                label="Keywords Understood"
                value={overviewMetrics.keywordsUnderstood}
                onClick={() => setSelectedActionType(selectedActionType === "keyword_mastered" ? null : "keyword_mastered")}
                isSelected={selectedActionType === "keyword_mastered"}
              />
            </div>
          </>
        )}
      </div>

      {/* ADMIN ACTION LOG SECTION */}
      <div className="mt-12 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Action Log (All Users)</h2>
          {selectedActionType && (
            <button
              onClick={() => setSelectedActionType(null)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear Filter
            </button>
          )}
        </div>
        {selectedActionType && (
          <p className="text-sm text-gray-600 mb-4">
            Showing only: <span className="font-semibold">{formatActionTypeName(selectedActionType)}</span>
          </p>
        )}
        
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

      {/* INBOX SECTION (Feedback + User Requests) */}
      <div className="mt-12 mb-6">
        <h2 className="text-2xl font-bold mb-4">Inbox</h2>
        
        {/* Combined loading state */}
        {(loadingInbox || loadingRequests) ? (
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">Loading inbox...</p>
          </div>
        ) : feedbackInbox.length === 0 && userRequestsInbox.length === 0 ? (
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">No messages yet.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="max-h-96 overflow-y-auto p-4">
              {(() => {
                // Combine and sort by date (most recent first)
                const allItems = [
                  ...userRequestsInbox.map((item) => ({
                    ...item,
                    type: "request" as const,
                    sortKey: new Date(item.created_at).getTime(),
                  })),
                  ...feedbackInbox.map((item) => ({
                    ...item,
                    type: "feedback" as const,
                    sortKey: new Date(item.created_at).getTime(),
                  })),
                ].sort((a, b) => b.sortKey - a.sortKey);

                return allItems.map((item) => {
                  if (item.type === "request") {
                    return (
                      <div
                        key={`request-${item.id}`}
                        className="mb-2 p-3 rounded bg-blue-50 border-l-4 border-blue-500 cursor-pointer hover:bg-blue-100 transition-colors"
                        onClick={() => openRequestDetail(item)}
                      >
                        <p className="text-sm text-gray-900">
                          📨 {item.date} at {item.time} — {item.username} sent a message ({item.subject})
                        </p>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={`feedback-${item.id}`}
                        className="mb-2 p-3 rounded bg-green-50 border-l-4 border-green-500 cursor-pointer hover:bg-green-100 transition-colors"
                        onClick={() => openFeedbackDetail(item)}
                      >
                        <p className="text-sm text-gray-900">
                          On {item.date} at {item.time}, {item.username} completed the feedback survey.
                        </p>
                      </div>
                    );
                  }
                });
              })()}
            </div>
          </div>
        )}
      </div>

      {/* FEEDBACK DETAIL MODAL */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Feedback Details</h2>
                <button
                  onClick={closeFeedbackDetail}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                  <p className="text-gray-900">{selectedFeedback.username || "Unknown User"}</p>
                </div>

                {selectedFeedback.discovery_source && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">How did you find out about Bible Buddy?</label>
                    <p className="text-gray-900">{selectedFeedback.discovery_source}</p>
                  </div>
                )}

                {selectedFeedback.happiness_rating && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">How happy are you with Bible Buddy?</label>
                    <p className="text-gray-900">{selectedFeedback.happiness_rating}</p>
                  </div>
                )}

                {selectedFeedback.usefulness_rating && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">How useful do you find Bible Buddy for understanding the Bible?</label>
                    <p className="text-gray-900">{selectedFeedback.usefulness_rating}</p>
                  </div>
                )}

                {selectedFeedback.usage_frequency && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">How often would you use Bible Buddy?</label>
                    <p className="text-gray-900">{selectedFeedback.usage_frequency}</p>
                  </div>
                )}

                {selectedFeedback.recommendation_likelihood && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">How likely are you to recommend Bible Buddy to someone else?</label>
                    <p className="text-gray-900">{selectedFeedback.recommendation_likelihood}</p>
                  </div>
                )}

                {selectedFeedback.improvement_feedback && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">If you could change, remove, or add anything to Bible Buddy, what would it be?</label>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedFeedback.improvement_feedback}</p>
                  </div>
                )}

                {selectedFeedback.review_text && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Review</label>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedFeedback.review_text}</p>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <button
                    onClick={closeFeedbackDetail}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* USER REQUEST DETAIL MODAL */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Request Details</h2>
                <button
                  onClick={closeRequestDetail}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                  <p className="text-gray-900">{selectedRequest.username || "Unknown User"}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                  <p className="text-gray-900">{selectedRequest.subject}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedRequest.message}</p>
                </div>

                {selectedRequest.screenshot_url && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Screenshot</label>
                    <img
                      src={selectedRequest.screenshot_url}
                      alt="Screenshot"
                      className="max-w-full h-auto rounded-lg border border-gray-200"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Submitted</label>
                  <p className="text-gray-600 text-sm">
                    {formatAdminActionDate(new Date(selectedRequest.created_at))} at{" "}
                    {formatAdminActionTime(new Date(selectedRequest.created_at))}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <button
                    onClick={closeRequestDetail}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-6">
        Admin view only (moorelouis3@gmail.com)
      </p>
    </div>
  );
}

function OverviewCard({ 
  label, 
  value, 
  onClick, 
  isSelected 
}: { 
  label: string; 
  value: number;
  onClick?: () => void;
  isSelected?: boolean;
}) {
  // Map labels to colors matching Profile page
  const getCardColors = (label: string) => {
    switch (label) {
      case "Total Actions":
        return "bg-blue-100 border border-blue-200";
      case "Books Completed":
        return "bg-purple-100 border border-purple-200";
      case "Chapters Read":
        return "bg-green-100 border border-green-200";
      case "Bible Completion":
        return "bg-orange-100 border border-orange-200";
      case "Notes Created":
        return "bg-yellow-100 border border-yellow-200";
      case "People Learned":
      case "People Learned About":
        return "bg-pink-100 border border-pink-200";
      case "Places Discovered":
        return "bg-cyan-100 border border-cyan-200";
      case "Keywords Understood":
        return "bg-indigo-100 border border-indigo-200";
      case "Signups":
        return "bg-gray-100 border border-gray-200";
      case "Logins":
        return "bg-blue-100 border border-blue-200";
      default:
        return "bg-white border border-gray-200";
    }
  };

  const baseClasses = `p-4 rounded-xl shadow text-center ${getCardColors(label)}`;
  const interactiveClasses = onClick ? "cursor-pointer transition-all hover:scale-105 hover:shadow-lg" : "";
  const selectedClasses = isSelected ? "ring-2 ring-blue-500 ring-offset-2" : "";

  return (
    <div 
      className={`${baseClasses} ${interactiveClasses} ${selectedClasses}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-700">{label}</p>
    </div>
  );
}
