"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

type TimeFilter = "24h" | "7d" | "30d" | "1y" | "all";

type OverviewMetrics = {
  signups: number;
  activeUsers: number;
  upgrades: number;
  totalActions: number;
  chaptersRead: number;
  notesCreated: number;
  peopleLearned: number;
  placesDiscovered: number;
  keywordsUnderstood: number;
  devotionalDaysCompleted: number;
  readingPlanChaptersCompleted: number;
  triviaQuestionsAnswered: number;
  understandVerseOfTheDay: number;
  feedThoughtsPosted: number;
  feedPrayersPosted: number;
  feedPhotosPosted: number;
  feedVideosPosted: number;
  feedPostLikes: number;
  feedComments: number;
  feedReplies: number;
  buddiesAdded: number;
  groupMessagesSent: number;
};

const INITIAL_METRICS: OverviewMetrics = {
  signups: 0,
  activeUsers: 0,
  upgrades: 0,
  totalActions: 0,
  chaptersRead: 0,
  notesCreated: 0,
  peopleLearned: 0,
  placesDiscovered: 0,
  keywordsUnderstood: 0,
  devotionalDaysCompleted: 0,
  readingPlanChaptersCompleted: 0,
  triviaQuestionsAnswered: 0,
  understandVerseOfTheDay: 0,
  feedThoughtsPosted: 0,
  feedPrayersPosted: 0,
  feedPhotosPosted: 0,
  feedVideosPosted: 0,
  feedPostLikes: 0,
  feedComments: 0,
  feedReplies: 0,
  buddiesAdded: 0,
  groupMessagesSent: 0,
};

export default function AnalyticsPage() {
  // Active Users By Window (filtered)
  const [activeUsersByWindow, setActiveUsersByWindow] = useState({
    '24h': 0,
    '7d': 0,
    '30d': 0,
    '1y': 0,
  });
  const [loadingActiveUsers, setLoadingActiveUsers] = useState(true);
  // Active Users (last 60 min, for card)
  const [filteredActiveUsers, setFilteredActiveUsers] = useState(0);
  const [loadingFilteredActiveUsers, setLoadingFilteredActiveUsers] = useState(true);

  // Total Users
  const [totalUsers, setTotalUsers] = useState(0);
  const [loadingTotalUsers, setLoadingTotalUsers] = useState(true);

  // Global overview metrics
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("24h");
  const [overviewMetrics, setOverviewMetrics] =
    useState<OverviewMetrics>(INITIAL_METRICS);
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [overviewError, setOverviewError] = useState<string | null>(null);

  // Action type filter for Action Log
  const [selectedActionType, setSelectedActionType] = useState<string | null>(null);

  // Stats Log
  const [statsLogData, setStatsLogData] = useState<
    Array<{
      period: string;
      signups: number;
      logins: number;
      activeUsers: number;
      totalActions: number;
      chaptersRead: number;
      notesCreated: number;
      peopleLearned: number;
      placesDiscovered: number;
      keywordsUnderstood: number;
      devotionalDaysCompleted: number;
      readingPlanChaptersCompleted: number;
      triviaQuestionsAnswered: number;
      understandVerseOfTheDay: number;
      feedThoughtsPosted: number;
      feedPrayersPosted: number;
      feedPhotosPosted: number;
      feedVideosPosted: number;
      feedPostLikes: number;
      feedComments: number;
      feedReplies: number;
      buddiesAdded: number;
      groupMessagesSent: number;
      upgrades: number;
      startDate: Date;
      endDate: Date;
    }>
  >([]);
  const [loadingStatsLog, setLoadingStatsLog] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<string>("Total Actions");
  const [selectedStatsRow, setSelectedStatsRow] = useState<typeof statsLogData[0] | null>(null);
  const [statsLogView, setStatsLogView] = useState<"list" | "graph">("list");

  // Main section selector (Action Log, Stats Log, Inbox)
  const [activeSection, setActiveSection] = useState<"actions" | "stats" | "inbox">("actions");

  // Admin Action Log
  const [actionLog, setActionLog] = useState<
    Array<{ date: string; text: string; sortKey: number; actionType: string; userId: string | null; username: string; url?: string; dmCount?: number }>
  >([]);
  const [loadingActionLog, setLoadingActionLog] = useState(true);

  // Raw master_actions cache (no longer used for popup, kept for reference)
  const rawMasterActionsRef = useRef<Array<{ user_id: string; action_type: string; action_label: string | null; created_at: string }>>([]);

  // Devotional stats
  const [devotionalStats, setDevotionalStats] = useState<Array<{
    id: string;
    title: string;
    total_days: number;
    usersStarted: number;
    usersCompleted: number;
    users: Array<{
      user_id: string;
      username: string;
      highestDay: number;
      daysCompleted: number;
      finished: boolean;
      lastActivity: string;
    }>;
  }>>([]);
  const [loadingDevotionalStats, setLoadingDevotionalStats] = useState(true);
  const [expandedDevotionals, setExpandedDevotionals] = useState<Set<string>>(new Set());

  // Reading plan stats
  const [readingPlanStats, setReadingPlanStats] = useState<Array<{ title: string; usersStarted: number }>>([]);
  const [loadingReadingPlanStats, setLoadingReadingPlanStats] = useState(true);
  const [expandedReadingPlans, setExpandedReadingPlans] = useState(false);

  // Feedback Inbox
  const [feedbackInbox, setFeedbackInbox] = useState<
    Array<{ id: string; username: string; created_at: string; date: string; time: string; fullData?: any }>
  >([]);
  const [loadingInbox, setLoadingInbox] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null);
  const [dismissedInboxItems, setDismissedInboxItems] = useState<Set<string>>(new Set());
  
  // User Requests Inbox
  const [userRequestsInbox, setUserRequestsInbox] = useState<
    Array<{ id: string; username: string; subject: string; created_at: string; date: string; time: string; fullData?: any }>
  >([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);

  // Retention metrics
  const [retentionData, setRetentionData] = useState<{
    dauMauPct: number;
    wauMauPct: number;
    sevenDayReturnPct: number;
    avgGapDays: number;
    medianGapDays: number;
    activeUserCount: number;
    freqBuckets: Array<{ label: string; sublabel: string; count: number; pct: number; color: string }>;
  } | null>(null);
  const [loadingRetention, setLoadingRetention] = useState(true);

  // Ambassador / Buddy Partners
  type AmbassadorReferral = { referred_user_id: string; username: string; profile_image_url: string | null; trial_started_at: string; trial_ends_at: string };
  type AmbassadorEntry = { user_id: string; username: string; display_name: string; profile_image_url: string | null; referral_code: string; is_active: boolean; total_referrals: number; referrals: AmbassadorReferral[] };
  const [ambassadors, setAmbassadors] = useState<AmbassadorEntry[]>([]);
  const [loadingAmbassadors, setLoadingAmbassadors] = useState(true);
  const [expandedAmbassador, setExpandedAmbassador] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActiveUsers() {
      setLoadingActiveUsers(true);
      try {
        const now = new Date();
        const windows = {
          '24h': new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
          '7d':  new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          '30d': new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          '1y':  new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        };

        const countDistinct = (rows: { user_id: string }[]) =>
          new Set(rows.map((r) => r.user_id).filter(Boolean)).size;

        const [r24h, r7d, r30d, r1y] = await Promise.all(
          Object.values(windows).map((since) =>
            supabase
              .from("master_actions")
              .select("user_id")
              .gte("created_at", since)
          )
        );

        setActiveUsersByWindow({
          '24h': countDistinct(r24h.data || []),
          '7d':  countDistinct(r7d.data || []),
          '30d': countDistinct(r30d.data || []),
          '1y':  countDistinct(r1y.data || []),
        });
      } catch (e) {
        setActiveUsersByWindow({ '24h': 0, '7d': 0, '30d': 0, '1y': 0 });
      }
      setLoadingActiveUsers(false);
    }
    fetchActiveUsers();
    loadRetentionData();
    loadTotalUsers();
    loadFeedbackInbox();
    loadUserRequestsInbox();
  }, []);

  useEffect(() => {
    loadOverviewMetrics(timeFilter);
    buildAdminActionLog(timeFilter, selectedActionType);
    loadStatsLog(timeFilter);
    loadDevotionalStats();
    loadReadingPlanStats();
    loadAmbassadors();
  }, [timeFilter, selectedActionType]);

  // Load active users (within last 60 minutes)
  async function loadActiveUsers() {
    setLoadingFilteredActiveUsers(true);
    try {
      const sixtyMinutesAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      const { data, error } = await supabase
        .from("master_actions")
        .select("user_id")
        .gte("created_at", sixtyMinutesAgo);
      if (error) {
        console.error("[ACTIVE_USERS] Error fetching active users:", error);
        setFilteredActiveUsers(0);
        setLoadingFilteredActiveUsers(false);
        return;
      }
      // Count distinct user_ids
      const uniqueUserIds = new Set(data?.map((action: { user_id: string }) => action.user_id).filter(Boolean) || []);
      setFilteredActiveUsers(uniqueUserIds.size);
      setLoadingFilteredActiveUsers(false);
    } catch (err) {
      console.error("[ACTIVE_USERS] Error loading active users:", err);
      setFilteredActiveUsers(0);
      setLoadingFilteredActiveUsers(false);
    }
  }

  // ── Retention & Engagement ────────────────────────────────────────────────
  async function loadRetentionData() {
    setLoadingRetention(true);
    try {
      const res = await fetch("/api/admin/retention");
      if (!res.ok) throw new Error(`Retention API error: ${res.status}`);
      const data = await res.json();
      console.log("[RETENTION] API response:", data.debug);
      setRetentionData(data);
    } catch (e) {
      console.error("[RETENTION] Error:", e);
    }
    setLoadingRetention(false);
  }

  // Load total users from auth.users
  async function loadTotalUsers() {
    setLoadingTotalUsers(true);
    try {
      const response = await fetch("/api/admin/total-users");
      if (!response.ok) {
        console.error("[TOTAL_USERS] Error fetching total users:", response.statusText);
        setTotalUsers(0);
        setLoadingTotalUsers(false);
        return;
      }

      const data = await response.json();
      setTotalUsers(data.totalUsers || 0);
      setLoadingTotalUsers(false);
    } catch (err) {
      console.error("[TOTAL_USERS] Error loading total users:", err);
      setTotalUsers(0);
      setLoadingTotalUsers(false);
    }
  }

  async function loadDevotionalStats() {
    setLoadingDevotionalStats(true);
    try {
      const res = await fetch("/api/admin/devotional-stats");
      const data = await res.json();
      if (data.stats) {
        setDevotionalStats(data.stats);
      }
    } catch (err) {
      console.error("[DEVOTIONAL_STATS] Error loading devotional stats:", err);
    }
    setLoadingDevotionalStats(false);
  }

  async function loadAmbassadors() {
    setLoadingAmbassadors(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token ?? "";
      const res = await fetch("/api/admin/ambassadors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.ambassadors) setAmbassadors(data.ambassadors);
    } catch (err) {
      console.error("[AMBASSADORS] Error loading ambassadors:", err);
    }
    setLoadingAmbassadors(false);
  }

  async function loadReadingPlanStats() {
    setLoadingReadingPlanStats(true);
    try {
      const res = await fetch("/api/admin/reading-plan-stats");
      const data = await res.json();
      if (data.stats) {
        setReadingPlanStats(data.stats);
      }
    } catch (err) {
      console.error("[READING_PLAN_STATS] Error loading reading plan stats:", err);
    }
    setLoadingReadingPlanStats(false);
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

  // Load Stats Log - aggregated stats by time buckets
  async function loadStatsLog(filter: TimeFilter) {
    setLoadingStatsLog(true);
    try {
      const fromDate = getFromDate(filter);
      const now = new Date();
      
      let buckets: Array<{ start: Date; end: Date; label: string }> = [];
      
      // Create time buckets based on filter
      // Filter controls the bucket SIZE (granularity), not the date range.
      if (filter === "24h") {
        // Bucket = 1 day — show last 30 days, one row per day
        for (let i = 29; i >= 0; i--) {
          const dayStart = new Date(now);
          dayStart.setDate(dayStart.getDate() - i);
          dayStart.setHours(0, 0, 0, 0);
          const dayEnd = new Date(dayStart);
          dayEnd.setHours(23, 59, 59, 999);
          const label = dayStart.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          buckets.push({ start: dayStart, end: dayEnd, label });
        }
      } else if (filter === "7d") {
        // Bucket = 1 week — show last 12 weeks, one row per week
        for (let i = 11; i >= 0; i--) {
          const weekEnd = new Date(now);
          weekEnd.setDate(weekEnd.getDate() - i * 7);
          weekEnd.setHours(23, 59, 59, 999);
          const weekStart = new Date(weekEnd);
          weekStart.setDate(weekStart.getDate() - 6);
          weekStart.setHours(0, 0, 0, 0);
          const label = weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })
            + " – " + weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          buckets.push({ start: weekStart, end: weekEnd, label });
        }
      } else if (filter === "30d") {
        // Bucket = 1 month — show last 12 months, one row per month
        for (let i = 11; i >= 0; i--) {
          const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0, 23, 59, 59, 999);
          const label = monthStart.toLocaleDateString("en-US", { month: "short", year: "numeric" });
          buckets.push({ start: monthStart, end: monthEnd, label });
        }
      } else if (filter === "1y") {
        // Bucket = 1 year — show last 5 years, one row per year
        for (let i = 4; i >= 0; i--) {
          const year = now.getFullYear() - i;
          buckets.push({
            start: new Date(year, 0, 1),
            end: new Date(year, 11, 31, 23, 59, 59, 999),
            label: year.toString(),
          });
        }
      } else {
        // All time - one bucket
        buckets.push({
          start: new Date(0),
          end: now,
          label: "All Time",
        });
      }

      // Aggregate data for each bucket
      const statsPromises = buckets.map(async (bucket) => {
        const bucketStart = bucket.start.toISOString();
        const bucketEnd = bucket.end.toISOString();

        // Signups (from master_actions, same source as Action Log)
        const { count: signups } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "user_signup")
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        // Logins (count of user_login actions)
        const { count: logins } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "user_login")
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        // Active Users (distinct users who did any action)
        const { data: activeUserRows, error: activeUserRowsError } = await supabase
          .from("master_actions")
          .select("user_id")
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);
        const activeUsers = new Set((activeUserRows || []).map(row => row.user_id).filter(id => !!id && id !== "")).size;

        // Total Actions
        const { count: totalActions } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        // Chapters Read
        const { count: chaptersRead } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "chapter_completed")
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        // Notes Created
        const { count: notesCreated } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "note_created")
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        // People Learned
        const { count: peopleLearned } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "person_learned")
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        // Places Discovered
        const { count: placesDiscovered } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "place_discovered")
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        // Keywords Understood
        const { count: keywordsUnderstood } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "keyword_mastered")
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        // Devotional Days Completed
        const { count: devotionalDaysCompleted } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "devotional_day_completed")
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        // Reading Plan Chapters Completed
        const { count: readingPlanChaptersCompleted } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "reading_plan_chapter_completed")
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        // Trivia Questions Answered
        const { count: triviaQuestionsAnswered } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "trivia_question_answered")
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        // Understand This Verse clicks
        const { count: understandVerseOfTheDay } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "understand_verse_of_the_day")
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        // Feed social actions — query source tables directly for accurate counts
        const { count: feedThoughtsPosted } = await supabase
          .from("feed_posts").select("id", { count: "exact", head: true })
          .eq("post_type", "thought").gte("created_at", bucketStart).lte("created_at", bucketEnd);

        const { count: feedPrayersPosted } = await supabase
          .from("feed_posts").select("id", { count: "exact", head: true })
          .in("post_type", ["prayer", "prayer_request"]).gte("created_at", bucketStart).lte("created_at", bucketEnd);

        const { count: feedPhotosPosted } = await supabase
          .from("feed_posts").select("id", { count: "exact", head: true })
          .eq("post_type", "photo").gte("created_at", bucketStart).lte("created_at", bucketEnd);

        const { count: feedVideosPosted } = await supabase
          .from("feed_posts").select("id", { count: "exact", head: true })
          .eq("post_type", "video").gte("created_at", bucketStart).lte("created_at", bucketEnd);

        const { count: feedPostLikes } = await supabase
          .from("feed_post_reactions").select("post_id", { count: "exact", head: true })
          .gte("created_at", bucketStart).lte("created_at", bucketEnd);

        const { count: feedComments } = await supabase
          .from("feed_post_comments").select("id", { count: "exact", head: true })
          .is("parent_comment_id", null).gte("created_at", bucketStart).lte("created_at", bucketEnd);

        const { count: feedReplies } = await supabase
          .from("feed_post_comments").select("id", { count: "exact", head: true })
          .not("parent_comment_id", "is", null).gte("created_at", bucketStart).lte("created_at", bucketEnd);

        const { count: buddiesAdded } = await supabase
          .from("buddy_requests").select("id", { count: "exact", head: true })
          .eq("status", "accepted").gte("created_at", bucketStart).lte("created_at", bucketEnd);

        const { count: groupMessagesSent } = await supabase
          .from("group_posts").select("id", { count: "exact", head: true })
          .gte("created_at", bucketStart).lte("created_at", bucketEnd);

        const { count: upgrades } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "user_upgraded")
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        return {
          period: bucket.label,
          signups: signups || 0,
          logins: logins || 0,
          activeUsers: activeUsers || 0,
          totalActions: totalActions || 0,
          chaptersRead: chaptersRead || 0,
          notesCreated: notesCreated || 0,
          peopleLearned: peopleLearned || 0,
          placesDiscovered: placesDiscovered || 0,
          keywordsUnderstood: keywordsUnderstood || 0,
          devotionalDaysCompleted: devotionalDaysCompleted || 0,
          readingPlanChaptersCompleted: readingPlanChaptersCompleted || 0,
          triviaQuestionsAnswered: triviaQuestionsAnswered || 0,
          understandVerseOfTheDay: understandVerseOfTheDay || 0,
          feedThoughtsPosted: feedThoughtsPosted || 0,
          feedPrayersPosted: feedPrayersPosted || 0,
          feedPhotosPosted: feedPhotosPosted || 0,
          feedVideosPosted: feedVideosPosted || 0,
          feedPostLikes: feedPostLikes || 0,
          feedComments: feedComments || 0,
          feedReplies: feedReplies || 0,
          buddiesAdded: buddiesAdded || 0,
          groupMessagesSent: groupMessagesSent || 0,
          upgrades: upgrades || 0,
          startDate: bucket.start,
          endDate: bucket.end,
        };
      });

      const stats = await Promise.all(statsPromises);
      setStatsLogData(stats);
      setLoadingStatsLog(false);
    } catch (err) {
      console.error("[STATS_LOG] Error loading stats log:", err);
      setStatsLogData([]);
      setLoadingStatsLog(false);
    }
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

      const upgradesPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "user_upgraded")
      );

      // Active Users: count of unique users who did any action within the range
      const activeUsersPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("user_id")
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

      // Devotional days completed
      const devotionalDaysPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "devotional_day_completed")
      );

      // Reading Plan chapters completed
      const readingPlanChaptersPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "reading_plan_chapter_completed")
      );

      // Trivia questions answered
      const triviaQuestionsPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "trivia_question_answered")
      );

      // Understand This Verse clicks
      const understandVerseOfTheDayPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "understand_verse_of_the_day")
      );

      // Social feed metrics — query source tables directly for accurate counts
      const feedThoughtsPromise = applyDateFilter(supabase.from("feed_posts").select("id", { count: "exact", head: true }).eq("post_type", "thought"));
      const feedPrayersPromise = applyDateFilter(supabase.from("feed_posts").select("id", { count: "exact", head: true }).in("post_type", ["prayer", "prayer_request"]));
      const feedPhotosPromise = applyDateFilter(supabase.from("feed_posts").select("id", { count: "exact", head: true }).eq("post_type", "photo"));
      const feedVideosPromise = applyDateFilter(supabase.from("feed_posts").select("id", { count: "exact", head: true }).eq("post_type", "video"));
      const feedLikesPromise = applyDateFilter(supabase.from("feed_post_reactions").select("post_id", { count: "exact", head: true }));
      const feedCommentsPromise = applyDateFilter(supabase.from("feed_post_comments").select("id", { count: "exact", head: true }).is("parent_comment_id", null));
      const feedRepliesPromise = applyDateFilter(supabase.from("feed_post_comments").select("id", { count: "exact", head: true }).not("parent_comment_id", "is", null));
      const buddiesAddedPromise = applyDateFilter(supabase.from("buddy_requests").select("id", { count: "exact", head: true }).eq("status", "accepted"));
      const groupMessagesPromise = applyDateFilter(supabase.from("group_posts").select("id", { count: "exact", head: true }));

      const [
        signupsResult,
        upgradesResult,
        activeUsersRowsResult,
        totalActionsResult,
        chaptersResult,
        notesResult,
        peopleResult,
        placesResult,
        keywordsResult,
        devotionalDaysResult,
        readingPlanChaptersResult,
        triviaQuestionsResult,
        understandVerseOfTheDayResult,
        feedThoughtsResult,
        feedPrayersResult,
        feedPhotosResult,
        feedVideosResult,
        feedLikesResult,
        feedCommentsResult,
        feedRepliesResult,
        buddiesAddedResult,
        groupMessagesResult,
      ] = await Promise.all([
        signupsPromise,
        upgradesPromise,
        activeUsersPromise,
        totalActionsPromise,
        chaptersPromise,
        notesPromise,
        peoplePromise,
        placesPromise,
        keywordsPromise,
        devotionalDaysPromise,
        readingPlanChaptersPromise,
        triviaQuestionsPromise,
        understandVerseOfTheDayPromise,
        feedThoughtsPromise,
        feedPrayersPromise,
        feedPhotosPromise,
        feedVideosPromise,
        feedLikesPromise,
        feedCommentsPromise,
        feedRepliesPromise,
        buddiesAddedPromise,
        groupMessagesPromise,
      ]);

      const signupsCount = signupsResult.count ?? 0;
      const signupsError = signupsResult.error;
      const upgradesCount = upgradesResult.count ?? 0;
      const upgradesError = upgradesResult.error;
      const activeUsersError = activeUsersRowsResult.error;
      const activeUsersCount = new Set(
        (activeUsersRowsResult.data || [])
          .map((row) => row.user_id)
          .filter((userId): userId is string => typeof userId === "string" && userId.length > 0)
      ).size;
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
      const devotionalDaysCount = devotionalDaysResult.count ?? 0;
      const devotionalDaysError = devotionalDaysResult.error;
      const readingPlanChaptersCount = readingPlanChaptersResult.count ?? 0;
      const readingPlanChaptersError = readingPlanChaptersResult.error;
      const triviaQuestionsCount = triviaQuestionsResult.count ?? 0;
      const triviaQuestionsError = triviaQuestionsResult.error;
      const understandVerseOfTheDayCount = understandVerseOfTheDayResult.count ?? 0;
      const understandVerseOfTheDayError = understandVerseOfTheDayResult.error;

      if (
        signupsError ||
        upgradesError ||
        activeUsersError ||
        totalActionsError ||
        chaptersError ||
        notesError ||
        peopleError ||
        placesError ||
        keywordsError ||
        devotionalDaysError ||
        readingPlanChaptersError ||
        triviaQuestionsError ||
        understandVerseOfTheDayError
      ) {
        console.error("[ANALYTICS_OVERVIEW] Error loading metrics:", {
          signupsError,
          upgradesError,
          activeUsersError,
          totalActionsError,
          chaptersError,
          notesError,
          peopleError,
          placesError,
          keywordsError,
          devotionalDaysError,
          readingPlanChaptersError,
          triviaQuestionsError,
          understandVerseOfTheDayError,
        });
        setOverviewError("Failed to load overview metrics.");
        setOverviewMetrics(INITIAL_METRICS);
        setLoadingOverview(false);
        return;
      }

      // Distinct login users
      // Distinct active users
      // Active Users: count of unique users who did any master action

      setOverviewMetrics({
        signups: signupsCount ?? 0,
        activeUsers: activeUsersCount,
        upgrades: upgradesCount,
        totalActions: totalActionsCount ?? 0,
        chaptersRead: chaptersCount ?? 0,
        notesCreated: notesCount ?? 0,
        peopleLearned: peopleCount ?? 0,
        placesDiscovered: placesCount ?? 0,
        keywordsUnderstood: keywordsCount ?? 0,
        devotionalDaysCompleted: devotionalDaysCount ?? 0,
        readingPlanChaptersCompleted: readingPlanChaptersCount ?? 0,
        triviaQuestionsAnswered: triviaQuestionsCount ?? 0,
        understandVerseOfTheDay: understandVerseOfTheDayCount ?? 0,
        feedThoughtsPosted: feedThoughtsResult.count ?? 0,
        feedPrayersPosted: feedPrayersResult.count ?? 0,
        feedPhotosPosted: feedPhotosResult.count ?? 0,
        feedVideosPosted: feedVideosResult.count ?? 0,
        feedPostLikes: feedLikesResult.count ?? 0,
        feedComments: feedCommentsResult.count ?? 0,
        feedReplies: feedRepliesResult.count ?? 0,
        buddiesAdded: buddiesAddedResult.count ?? 0,
        groupMessagesSent: groupMessagesResult.count ?? 0,
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
      // Fetch total_actions and login days from profile_stats (all-time totals)
      const { data: profileRows, error: profileError } = await supabase
        .from("profile_stats")
        .select("user_id, total_actions")
        .in("user_id", userIds);

      if (!profileError && profileRows) {
        for (const row of profileRows) {
          if (row.user_id) {
            totalActionsMap.set(row.user_id, row.total_actions ?? 0);
          }
        }
      }

      // Fetch login days (distinct login dates per user) from master_actions
      const { data: loginActions, error: loginError } = await supabase
        .from("master_actions")
        .select("user_id, created_at")
        .in("user_id", userIds)
        .eq("action_type", "user_login");

      if (!loginError && loginActions) {
        const userLoginDates = new Map<string, Set<string>>();
        for (const action of loginActions) {
          const uid = action.user_id;
          if (!uid) continue;
          const dateKey = new Date(action.created_at).toISOString().split('T')[0];
          if (!userLoginDates.has(uid)) userLoginDates.set(uid, new Set());
          userLoginDates.get(uid)!.add(dateKey);
        }
        for (const [uid, dates] of userLoginDates.entries()) {
          loginDaysMap.set(uid, dates.size);
        }
      }
    } catch (err) {
      console.error("[USER_COUNTS] Error processing user counts:", err);
    }

    return { loginDays: loginDaysMap, totalActions: totalActionsMap };
  }

  // Build Admin Action Log from master_actions table (all users)
  async function buildAdminActionLog(filter?: TimeFilter, actionTypeFilter?: string | null) {
    setLoadingActionLog(true);
    const actions: Array<{ date: string; text: string; sortKey: number; actionType: string; userId: string | null; username: string; url?: string; dmCount?: number }> = [];

    // Pre-fetch devotional title→ID map for URL derivation
    const devotionalIdMap = new Map<string, string>();
    try {
      const { data: devs } = await supabase.from("devotionals").select("id, title");
      if (devs) devs.forEach((d) => devotionalIdMap.set(d.title.toLowerCase(), d.id));
    } catch (_) {}


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

      // Cache raw actions for the user profile popup
      if (masterActions) {
        rawMasterActionsRef.current = masterActions as any;
      }

      // Also query user_signups for old signups that don't have master_actions entries
      // Only if no action type filter OR filter is "user_signup"
      let oldSignups: Array<{ user_id: string; email: string; created_at: string }> = [];
      if (!actionTypeFilter || actionTypeFilter === "user_signup") {
        try {
          // Get all user_ids that already have user_signup in master_actions
          const existingSignupUserIds = new Set<string>();
          if (masterActions) {
            for (const action of masterActions) {
              if (action.action_type === "user_signup" && action.user_id) {
                existingSignupUserIds.add(action.user_id);
              }
            }
          }

          // Query user_signups with time filter
          let signupsQuery = supabase
            .from("user_signups")
            .select("user_id, email, created_at")
            .order("created_at", { ascending: false });

          // Apply time filter
          if (fromDate) {
            signupsQuery = signupsQuery.gte("created_at", fromDate);
          }

          const { data: signupsData, error: signupsError } = await signupsQuery;

          if (!signupsError && signupsData) {
            // Filter out signups that already have master_actions entries
            oldSignups = signupsData.filter(
              (signup) => !existingSignupUserIds.has(signup.user_id)
            );
          }
        } catch (err) {
          console.error("[ADMIN_ACTION_LOG] Error fetching old signups:", err);
          // Continue without old signups if there's an error
        }
      }

      // Collect unique user IDs for batch counting (from both master_actions and old signups)
      const uniqueUserIds = new Set<string>();
      if (masterActions && masterActions.length > 0) {
        for (const action of masterActions) {
          if (action.user_id) {
            uniqueUserIds.add(action.user_id);
          }
        }
      }
      for (const signup of oldSignups) {
        if (signup.user_id) {
          uniqueUserIds.add(signup.user_id);
        }
      }

      // Batch load user counts (only if we have user IDs)
      const { loginDays, totalActions } = uniqueUserIds.size > 0 
        ? await loadUserCounts(Array.from(uniqueUserIds))
        : { loginDays: new Map(), totalActions: new Map() };

      // Batch-fetch real profile names (display_name > username) for ALL users in the log.
      // This fixes "Unknown User" when action.username was null at log time.
      const profileNameMap = new Map<string, string>();
      const allUserIdsForProfiles = Array.from(uniqueUserIds);
      if (allUserIdsForProfiles.length > 0) {
        try {
          const { data: profileStats } = await supabase
            .from("profile_stats")
            .select("user_id, display_name, username")
            .in("user_id", allUserIdsForProfiles);
          if (profileStats) {
            for (const stat of profileStats) {
              const name = stat.display_name?.trim() || stat.username?.trim() || null;
              if (name) profileNameMap.set(stat.user_id, name);
            }
          }
        } catch (err) {
          console.error("[ADMIN_ACTION_LOG] Error fetching profile names:", err);
        }
      }
      // signupUsernames just maps to the same profileNameMap for old-signup entries
      const signupUsernames = profileNameMap;

      // Track unique login dates per user (one per day) for display deduplication
      const userLoginDates = new Map<string, Set<string>>();

      // Process master_actions if they exist
      if (masterActions && masterActions.length > 0) {
        for (const action of masterActions) {
        const actionDate = new Date(action.created_at);
        const dateKey = actionDate.toISOString().split('T')[0]; // YYYY-MM-DD
        const formattedDate = formatAdminActionDate(actionDate);
        const formattedTime = formatAdminActionTime(actionDate);
        const userId = action.user_id;
        const username = (userId && profileNameMap.get(userId)) || action.username?.trim() || "New User";

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
          // Derive URL: action_label is like "Matthew 5"
          let chapterUrl: string | undefined;
          if (action.action_label) {
            const match = action.action_label.match(/^(.+?)\s+(\d+)$/);
            if (match) chapterUrl = `/Bible/${encodeURIComponent(match[1])}/${match[2]}`;
          }
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "chapter_completed",
            url: chapterUrl,
          });
        } else if (action.action_type === "book_completed") {
          const text = action.action_label 
            ? `On ${formattedDate} at ${formattedTime}, ${username} finished ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} finished a book.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
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
            userId,
            username,
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
            userId,
            username,
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
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "keyword_mastered",
          });
        } else if (action.action_type === "devotional_day_completed") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} completed ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} completed a devotional day.${counterText}`;
          // Derive URL: action_label is like "The Faith of Job - Day 3"
          let devUrl: string | undefined;
          if (action.action_label) {
            const titleMatch = action.action_label.match(/^(.+?)\s*-\s*Day\s*\d+/i);
            if (titleMatch) {
              const devId = devotionalIdMap.get(titleMatch[1].trim().toLowerCase());
              if (devId) devUrl = `/devotionals/${devId}`;
            }
          }
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "devotional_day_completed",
            url: devUrl,
          });
        } else if (action.action_type === "reading_plan_chapter_completed") {
          const text = action.action_label 
            ? `On ${formattedDate} at ${formattedTime}, ${username} completed ${action.action_label} from a reading plan.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} completed a reading plan chapter.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "reading_plan_chapter_completed",
          });
        } else if (action.action_type === "note_created") {
          actions.push({
            date: formattedDate,
            text: `On ${formattedDate} at ${formattedTime}, ${username} created a note.${counterText}`,
            userId,
            username,
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
              userId,
            username,
            sortKey: actionDate.getTime(),
              actionType: "user_login",
            });
          }
        } else if (action.action_type === "user_signup") {
          actions.push({
            date: formattedDate,
            text: `On ${formattedDate} at ${formattedTime}, ${username} just signed up.${counterText}`,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "user_signup",
          });
        } else if (action.action_type === "user_upgraded") {
          const detail = action.action_label ? ` via ${action.action_label}` : "";
          actions.push({
            date: formattedDate,
            text: `On ${formattedDate} at ${formattedTime}, ${username} upgraded to Pro${detail}.${counterText}`,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "user_upgraded",
          });
        } else if (action.action_type === "trivia_question_answered") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} answered a trivia question (${action.action_label}).${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} answered a trivia question.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "trivia_question_answered",
          });
        } else if (action.action_type === "feed_post_thought") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} posted a thought: "${action.action_label}".${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} posted a thought.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_thought" });
        } else if (action.action_type === "feed_post_prayer") {
          actions.push({ date: formattedDate, text: `On ${formattedDate} at ${formattedTime}, ${username} posted a prayer.${counterText}`, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_prayer" });
        } else if (action.action_type === "feed_post_prayer_request") {
          actions.push({ date: formattedDate, text: `On ${formattedDate} at ${formattedTime}, ${username} posted a prayer request.${counterText}`, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_prayer_request" });
        } else if (action.action_type === "feed_post_photo") {
          actions.push({ date: formattedDate, text: `On ${formattedDate} at ${formattedTime}, ${username} posted a photo.${counterText}`, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_photo" });
        } else if (action.action_type === "feed_post_video") {
          actions.push({ date: formattedDate, text: `On ${formattedDate} at ${formattedTime}, ${username} posted a video.${counterText}`, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_video" });
        } else if (action.action_type === "feed_post_liked") {
          actions.push({ date: formattedDate, text: `On ${formattedDate} at ${formattedTime}, ${username} liked a post.${counterText}`, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_liked" });
        } else if (action.action_type === "feed_post_commented") {
          actions.push({ date: formattedDate, text: `On ${formattedDate} at ${formattedTime}, ${username} commented on a post.${counterText}`, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_commented" });
        } else if (action.action_type === "feed_post_replied") {
          actions.push({ date: formattedDate, text: `On ${formattedDate} at ${formattedTime}, ${username} replied to a comment.${counterText}`, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_replied" });
        } else if (action.action_type === "buddy_added") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} added ${action.action_label} as a Bible Buddy.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} added a new Bible Buddy.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "buddy_added" });
        } else if (action.action_type === "group_message_sent") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} sent a message in ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} sent a group message.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "group_message_sent" });
        } else if (action.action_type === "verse_highlighted") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} highlighted ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} highlighted a verse.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "verse_highlighted" });
        } else if (action.action_type === "understand_verse_of_the_day") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} explored the verse of the day (${action.action_label}).${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} explored the verse of the day.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "understand_verse_of_the_day" });
        } else if (action.action_type === "keyword_viewed") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} viewed the keyword "${action.action_label}".${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} viewed a keyword.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "keyword_viewed" });
        } else if (action.action_type === "person_viewed") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} viewed "${action.action_label}".${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} viewed a person.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "person_viewed" });
        } else if (action.action_type === "place_viewed") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} viewed the place "${action.action_label}".${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} viewed a place.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "place_viewed" });
        } else if (action.action_type === "series_week_started") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} started ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} started a Bible series week.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "series_week_started", url: "/groups" });
        }
        // Ignore all other action types
      }
      }

      // Add old signups from user_signups table
      for (const signup of oldSignups) {
        const signupDate = new Date(signup.created_at);
        const formattedDate = formatAdminActionDate(signupDate);
        const formattedTime = formatAdminActionTime(signupDate);
        
        // Get username from profile_stats or use email as fallback
        const username = signupUsernames.get(signup.user_id) || 
                        signup.email?.split("@")[0] || 
                        "New User";
        
        // Get contextual counter
        let counterText = "";
        if (signup.user_id) {
          const totalActionsCount = totalActions.get(signup.user_id) || 0;
          counterText = ` (${totalActionsCount})`;
        }

        actions.push({
          date: formattedDate,
          text: `On ${formattedDate} at ${formattedTime}, ${username} just signed up.${counterText}`,
          userId: signup.user_id,
          username,
          sortKey: signupDate.getTime(),
          actionType: "user_signup",
        });
      }

      // Actions are already sorted by created_at DESC from the query, but sort again to be safe
      actions.sort((a, b) => b.sortKey - a.sortKey);

      // Fetch welcome DM counts for all users in the log (to show under signup entries)
      const allUserIds = [...new Set(actions.map((a) => a.userId).filter(Boolean) as string[])];
      if (allUserIds.length > 0) {
        try {
          const { data: dmRows } = await supabase
            .from("onboarding_dm_sent")
            .select("user_id")
            .in("user_id", allUserIds);
          if (dmRows) {
            const dmCountMap = new Map<string, number>();
            for (const row of dmRows) {
              dmCountMap.set(row.user_id, (dmCountMap.get(row.user_id) ?? 0) + 1);
            }
            for (const action of actions) {
              if (action.userId && action.actionType === "user_signup") {
                action.dmCount = dmCountMap.get(action.userId) ?? 0;
              }
            }
          }
        } catch (_) {}
      }

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
      // Select all columns including dismissed_from_inbox (will be null if column doesn't exist yet)
      const { data: feedbackData, error } = await supabase
        .from("user_feedback")
        .select("id, username, created_at, discovery_source, happiness_rating, usefulness_rating, usage_frequency, recommendation_likelihood, improvement_feedback, review_text, dismissed_from_inbox")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        console.error("[FEEDBACK_INBOX] Error fetching feedback:", error);
        // If column doesn't exist, retry without it
        if (error.message?.includes("column") || error.code === "42703" || error.message?.includes("dismissed_from_inbox")) {
          console.log("[FEEDBACK_INBOX] Column dismissed_from_inbox doesn't exist, retrying without it");
          const { data: retryData, error: retryError } = await supabase
            .from("user_feedback")
            .select("id, username, created_at, discovery_source, happiness_rating, usefulness_rating, usage_frequency, recommendation_likelihood, improvement_feedback, review_text")
            .order("created_at", { ascending: false })
            .limit(100);
          
          if (retryError) {
            console.error("[FEEDBACK_INBOX] Error on retry:", retryError);
            setFeedbackInbox([]);
            setLoadingInbox(false);
            return;
          }
          
          // Format items (no dismissed_from_inbox column, so show all)
          const inboxItems = (retryData || []).map((feedback: any) => {
            const feedbackDate = new Date(feedback.created_at);
            const formattedDate = formatAdminActionDate(feedbackDate);
            const formattedTime = formatAdminActionTime(feedbackDate);
            const username = feedback.username || "Unknown User";
            const displayText = feedback.happiness_rating === "Declined survey" 
              ? `${username} clicked "No" on the feedback survey`
              : `${username} completed the feedback survey`;

            return {
              id: feedback.id,
              username: displayText,
              created_at: feedback.created_at,
              date: formattedDate,
              time: formattedTime,
              fullData: feedback,
            };
          });

          setFeedbackInbox(inboxItems);
          setLoadingInbox(false);
          return;
        }
        
        setFeedbackInbox([]);
        setLoadingInbox(false);
        return;
      }

      if (!feedbackData || feedbackData.length === 0) {
        setFeedbackInbox([]);
        setLoadingInbox(false);
        return;
      }

      // Filter out dismissed items - only hide if explicitly set to true
      const visibleData = feedbackData.filter((item: any) => 
        item.dismissed_from_inbox !== true
      );

      if (!visibleData || visibleData.length === 0) {
        setFeedbackInbox([]);
        setLoadingInbox(false);
        return;
      }

      // Format feedback items for inbox display
      const inboxItems = visibleData.map((feedback: any) => {
        const feedbackDate = new Date(feedback.created_at);
        const formattedDate = formatAdminActionDate(feedbackDate);
        const formattedTime = formatAdminActionTime(feedbackDate);
        // Show username, or indicate they clicked "No" if happiness_rating is "Declined survey"
        const username = feedback.username || "Unknown User";
        const displayText = feedback.happiness_rating === "Declined survey" 
          ? `${username} clicked "No" on the feedback survey`
          : `${username} completed the feedback survey`;

        return {
          id: feedback.id,
          username: displayText,
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

  // Dismiss inbox item (marks as dismissed in database, removes from display)
  async function dismissInboxItem(itemId: string, itemType: "feedback" | "request") {
    // Immediately update local state to remove from display (optimistic update)
    setDismissedInboxItems((prev) => new Set(prev).add(itemId));

    try {
      const tableName = itemType === "feedback" ? "user_feedback" : "user_requests";
      
      // Update the database to mark as dismissed
      const { error } = await supabase
        .from(tableName)
        .update({ dismissed_from_inbox: true })
        .eq("id", itemId);

      if (error) {
        console.error(`[INBOX] Error dismissing ${itemType} item:`, error);
        console.error(`[INBOX] Error details:`, JSON.stringify(error, null, 2));
        
        // If column doesn't exist or RLS policy issue, show helpful message
        if (error.message?.includes("column") || error.code === "42703" || error.message?.includes("dismissed_from_inbox")) {
          alert("Please run the SQL migration ADD_DISMISSED_FROM_INBOX_WITH_POLICIES.sql to enable persistent dismissals.");
        } else if (error.code === "42501" || error.message?.includes("permission") || error.message?.includes("policy")) {
          alert("Permission denied. Please ensure UPDATE policies are set for admin on this table.");
        } else {
          alert(`Failed to dismiss item: ${error.message || "Unknown error"}`);
        }
        
        // Remove from dismissed set so it reappears (since DB update failed)
        setDismissedInboxItems((prev) => {
          const next = new Set(prev);
          next.delete(itemId);
          return next;
        });
        return;
      }

      // Successfully updated database - reload inbox to ensure consistency
      console.log(`[INBOX] Successfully dismissed ${itemType} item ${itemId}`);
      if (itemType === "feedback") {
        await loadFeedbackInbox();
      } else {
        await loadUserRequestsInbox();
      }
    } catch (err: any) {
      console.error(`[INBOX] Error dismissing ${itemType} item:`, err);
      alert(`Failed to dismiss item: ${err.message || "Unknown error"}`);
      
      // Remove from dismissed set so it reappears (since DB update failed)
      setDismissedInboxItems((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  }

  // Close feedback detail modal
  function closeFeedbackDetail() {
    setSelectedFeedback(null);
  }

  // Load user requests inbox from user_requests table
  async function loadUserRequestsInbox() {
    setLoadingRequests(true);
    try {
      // Select all columns including dismissed_from_inbox (will be null if column doesn't exist yet)
      const { data: requestsData, error } = await supabase
        .from("user_requests")
        .select("id, username, subject, message, screenshot_url, created_at, dismissed_from_inbox")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        console.error("[USER_REQUESTS_INBOX] Error fetching requests:", error);
        // If column doesn't exist, retry without it
        if (error.message?.includes("column") || error.code === "42703" || error.message?.includes("dismissed_from_inbox")) {
          console.log("[USER_REQUESTS_INBOX] Column dismissed_from_inbox doesn't exist, retrying without it");
          const { data: retryData, error: retryError } = await supabase
            .from("user_requests")
            .select("id, username, subject, message, screenshot_url, created_at")
            .order("created_at", { ascending: false })
            .limit(100);
          
          if (retryError) {
            console.error("[USER_REQUESTS_INBOX] Error on retry:", retryError);
            setUserRequestsInbox([]);
            setLoadingRequests(false);
            return;
          }
          
          // Format items (no dismissed_from_inbox column, so show all)
          const inboxItems = (retryData || []).map((request: any) => {
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
              fullData: request,
            };
          });

          setUserRequestsInbox(inboxItems);
          setLoadingRequests(false);
          return;
        }
        
        setUserRequestsInbox([]);
        setLoadingRequests(false);
        return;
      }

      if (!requestsData || requestsData.length === 0) {
        setUserRequestsInbox([]);
        setLoadingRequests(false);
        return;
      }

      // Filter out dismissed items - only hide if explicitly set to true
      const visibleData = requestsData.filter((item: any) => 
        item.dismissed_from_inbox !== true
      );

      if (!visibleData || visibleData.length === 0) {
        setUserRequestsInbox([]);
        setLoadingRequests(false);
        return;
      }

      // Format request items for inbox display
      const inboxItems = visibleData.map((request: any) => {
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
      "user_upgraded": "Upgrades",
      "user_login": "Logins",
      "chapter_completed": "Chapters Read",
      "book_completed": "Books Completed",
      "note_created": "Notes Created",
      "person_learned": "People Learned",
      "place_discovered": "Places Discovered",
      "keyword_mastered": "Keywords Understood",
      "devotional_day_completed": "Devotional Days Completed",
      "reading_plan_chapter_completed": "Reading Plan Chapters Completed",
      "trivia_question_answered": "Trivia Questions Answered",
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
      case "devotional_day_completed":
        return "bg-orange-50 border-l-4 border-orange-500";
      case "reading_plan_chapter_completed":
        return "bg-yellow-50 border-l-4 border-yellow-500";
      case "trivia_question_answered":
        return "bg-emerald-50 border-l-4 border-emerald-500";
      case "user_login":
        return "bg-blue-50 border-l-4 border-blue-500";
      case "user_upgraded":
        return "bg-amber-50 border-l-4 border-amber-500";
      case "user_signup":
        return "bg-gray-50 border-l-4 border-gray-500";
      case "series_week_started":
        return "bg-indigo-50 border-l-4 border-indigo-500";
      default:
        return "bg-gray-50 border-l-4 border-gray-400";
    }
  }

  // Stats Graph Component
  function StatsGraph({
    data,
    metric,
    timeFilter,
  }: {
    data: typeof statsLogData;
    metric: string;
    timeFilter: TimeFilter;
  }) {
    const getValue = (row: typeof data[0]) => {
      switch (metric) {
        case "Signups": return row.signups;
        case "Logins": return row.logins;
        case "Active Users": return row.activeUsers;
        case "Total Actions": return row.totalActions;
        case "Chapters Read": return row.chaptersRead;
        case "Notes Created": return row.notesCreated;
        case "People Learned": return row.peopleLearned;
        case "Places Discovered": return row.placesDiscovered;
        case "Keywords Understood": return row.keywordsUnderstood;
        case "Devotional Days Completed": return row.devotionalDaysCompleted;
        case "Reading Plan Chapters Completed": return row.readingPlanChaptersCompleted;
        case "Trivia Questions Answered": return row.triviaQuestionsAnswered;
        case "Thoughts Posted": return row.feedThoughtsPosted;
        case "Prayers Posted": return row.feedPrayersPosted;
        case "Photos Posted": return row.feedPhotosPosted;
        case "Videos Posted": return row.feedVideosPosted;
        case "Post Likes": return row.feedPostLikes;
        case "Comments": return row.feedComments;
        case "Replies": return row.feedReplies;
        case "Buddies Added": return row.buddiesAdded;
        case "Group Messages": return row.groupMessagesSent;
        default: return 0;
      }
    };

    const maxValue = useMemo(() => {
      const values = data.map(getValue);
      return Math.max(...values, 1);
    }, [data, metric]);

    if (data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          No data to display
        </div>
      );
    }

    const barWidth = Math.max(20, (100 / data.length) - 2);
    const graphHeight = 200;
    const graphWidth = Math.max(400, data.length * 50);

    return (
      <div className="w-full h-full overflow-x-auto">
        <svg viewBox={`0 0 ${graphWidth} ${graphHeight + 40}`} className="w-full h-full min-w-full">
          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const value = Math.round(maxValue * ratio);
            const y = graphHeight - graphHeight * ratio + 20;
            return (
              <g key={ratio}>
                <line
                  x1="40"
                  y1={y}
                  x2={graphWidth}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <text
                  x="35"
                  y={y + 4}
                  textAnchor="end"
                  className="text-xs fill-gray-600"
                  fontSize="10"
                >
                  {value.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((row, idx) => {
            const value = getValue(row);
            const height = (value / maxValue) * graphHeight;
            const x = 50 + idx * 50;
            const y = graphHeight + 20 - height;
            const barHeight = Math.max(2, height);

            return (
              <g key={idx}>
                <rect
                  x={x - barWidth / 2}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="#3b82f6"
                  className="hover:fill-blue-700 transition-colors"
                  rx="2"
                />
                <text
                  x={x}
                  y={graphHeight + 35}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                  fontSize="9"
                  transform={`rotate(-45 ${x} ${graphHeight + 35})`}
                >
                  {row.period.length > 8 ? row.period.substring(0, 8) + "..." : row.period}
                </text>
                <title>{`${row.period}: ${value.toLocaleString()}`}</title>
              </g>
            );
          })}

          {/* X-axis line */}
          <line
            x1="40"
            y1={graphHeight + 20}
            x2={graphWidth}
            y2={graphHeight + 20}
            stroke="#374151"
            strokeWidth="2"
          />

          {/* Y-axis line */}
          <line
            x1="40"
            y1="20"
            x2="40"
            y2={graphHeight + 20}
            stroke="#374151"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      {/* ACTIVE USERS RIGHT NOW + TOTAL USERS */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          {/* Active Users */}
          <div>
            {loadingActiveUsers ? (
              <div className="py-8">
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            ) : (
              <>
                <div className="text-7xl font-bold text-gray-900 mb-2">
                  {overviewMetrics.activeUsers}
                </div>
                <p className="text-lg text-gray-600">
                  Active Users
                </p>
              </>
            )}
          </div>

          {/* Total Users */}
          <div>
            {loadingTotalUsers ? (
              <div className="py-8">
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            ) : (
              <>
                <div className="text-7xl font-bold text-gray-900 mb-2">
                  {totalUsers}
                </div>
                <p className="text-lg text-gray-600">
                  Total users
                </p>
              </>
            )}
          </div>
        </div>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <OverviewCard
                label="Signups"
                value={overviewMetrics.signups}
                onClick={() => setSelectedActionType(selectedActionType === "user_signup" ? null : "user_signup")}
                isSelected={selectedActionType === "user_signup"}
              />
              <OverviewCard
                label="Active Users"
                value={overviewMetrics.activeUsers}
                onClick={() => setSelectedActionType(null)}
                isSelected={false}
              />
              <OverviewCard
                label="Upgrades"
                value={overviewMetrics.upgrades}
                onClick={() => setSelectedActionType(selectedActionType === "user_upgraded" ? null : "user_upgraded")}
                isSelected={selectedActionType === "user_upgraded"}
              />
              <OverviewCard
                label="Total Actions"
                value={overviewMetrics.totalActions}
                onClick={() => setSelectedActionType(null)}
                isSelected={selectedActionType === null}
              />
            </div>

            {/* ROW 2: BIBLE ENGAGEMENT */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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
              <OverviewCard
                label="Devotional Days Completed"
                value={overviewMetrics.devotionalDaysCompleted}
                onClick={() => setSelectedActionType(selectedActionType === "devotional_day_completed" ? null : "devotional_day_completed")}
                isSelected={selectedActionType === "devotional_day_completed"}
              />
              <OverviewCard
                label="Reading Plan Chapters Completed"
                value={overviewMetrics.readingPlanChaptersCompleted}
                onClick={() => setSelectedActionType(selectedActionType === "reading_plan_chapter_completed" ? null : "reading_plan_chapter_completed")}
                isSelected={selectedActionType === "reading_plan_chapter_completed"}
              />
              <OverviewCard
                label="Trivia Questions Answered"
                value={overviewMetrics.triviaQuestionsAnswered}
                onClick={() => setSelectedActionType(selectedActionType === "trivia_question_answered" ? null : "trivia_question_answered")}
                isSelected={selectedActionType === "trivia_question_answered"}
              />
              {/* New Card: Understand This Verse Clicks */}
              <OverviewCard
                label="Understand This Verse Clicks"
                value={overviewMetrics.understandVerseOfTheDay}
                onClick={() => setSelectedActionType(selectedActionType === "understand_verse_of_the_day" ? null : "understand_verse_of_the_day")}
                isSelected={selectedActionType === "understand_verse_of_the_day"}
              />
            </div>

            {/* ROW 3: SOCIAL FEED */}
            <h3 className="text-lg font-bold mt-6 mb-3">📱 Social Feed</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <OverviewCard
                label="💭 Thoughts Posted"
                value={overviewMetrics.feedThoughtsPosted}
                onClick={() => setSelectedActionType(selectedActionType === "feed_post_thought" ? null : "feed_post_thought")}
                isSelected={selectedActionType === "feed_post_thought"}
              />
              <OverviewCard
                label="🙏 Prayers Posted"
                value={overviewMetrics.feedPrayersPosted}
                onClick={() => setSelectedActionType(selectedActionType === "feed_post_prayer" ? null : "feed_post_prayer")}
                isSelected={selectedActionType === "feed_post_prayer"}
              />
              <OverviewCard
                label="📷 Photos Posted"
                value={overviewMetrics.feedPhotosPosted}
                onClick={() => setSelectedActionType(selectedActionType === "feed_post_photo" ? null : "feed_post_photo")}
                isSelected={selectedActionType === "feed_post_photo"}
              />
              <OverviewCard
                label="🎬 Videos Posted"
                value={overviewMetrics.feedVideosPosted}
                onClick={() => setSelectedActionType(selectedActionType === "feed_post_video" ? null : "feed_post_video")}
                isSelected={selectedActionType === "feed_post_video"}
              />
              <OverviewCard
                label="❤️ Post Likes"
                value={overviewMetrics.feedPostLikes}
                onClick={() => setSelectedActionType(selectedActionType === "feed_post_liked" ? null : "feed_post_liked")}
                isSelected={selectedActionType === "feed_post_liked"}
              />
              <OverviewCard
                label="💬 Comments"
                value={overviewMetrics.feedComments}
                onClick={() => setSelectedActionType(selectedActionType === "feed_post_commented" ? null : "feed_post_commented")}
                isSelected={selectedActionType === "feed_post_commented"}
              />
              <OverviewCard
                label="↩️ Replies"
                value={overviewMetrics.feedReplies}
                onClick={() => setSelectedActionType(selectedActionType === "feed_post_replied" ? null : "feed_post_replied")}
                isSelected={selectedActionType === "feed_post_replied"}
              />
              <OverviewCard
                label="🤝 Buddies Added"
                value={overviewMetrics.buddiesAdded}
                onClick={() => setSelectedActionType(selectedActionType === "buddy_added" ? null : "buddy_added")}
                isSelected={selectedActionType === "buddy_added"}
              />
              <OverviewCard
                label="📨 Group Messages"
                value={overviewMetrics.groupMessagesSent}
                onClick={() => setSelectedActionType(selectedActionType === "group_message_sent" ? null : "group_message_sent")}
                isSelected={selectedActionType === "group_message_sent"}
              />
            </div>
          </>
        )}
      </div>

      {/* ── RETENTION & ENGAGEMENT ─────────────────────────────────────────── */}
      <div className="mt-10 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Retention & Engagement</h2>
          <button
            onClick={() => loadRetentionData()}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Refresh
          </button>
        </div>

        {loadingRetention ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500 text-sm">Computing retention metrics…</p>
          </div>
        ) : retentionData ? (
          <div className="space-y-4">
            {/* Top KPI row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* DAU/MAU */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
                <p className="text-xs text-gray-500 mb-1">DAU / MAU</p>
                <p className={`text-3xl font-bold ${retentionData.dauMauPct >= 20 ? "text-green-600" : retentionData.dauMauPct >= 10 ? "text-yellow-600" : "text-red-500"}`}>
                  {retentionData.dauMauPct}%
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {retentionData.dauMauPct >= 20 ? "Excellent 🔥" : retentionData.dauMauPct >= 10 ? "Good 👍" : "Needs work"}
                </p>
              </div>

              {/* WAU/MAU */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
                <p className="text-xs text-gray-500 mb-1">WAU / MAU</p>
                <p className={`text-3xl font-bold ${retentionData.wauMauPct >= 50 ? "text-green-600" : retentionData.wauMauPct >= 30 ? "text-yellow-600" : "text-red-500"}`}>
                  {retentionData.wauMauPct}%
                </p>
                <p className="text-xs text-gray-400 mt-1">Weekly stickiness</p>
              </div>

              {/* 7-day return */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
                <p className="text-xs text-gray-500 mb-1">7-Day Return Rate</p>
                <p className={`text-3xl font-bold ${retentionData.sevenDayReturnPct >= 40 ? "text-green-600" : retentionData.sevenDayReturnPct >= 20 ? "text-yellow-600" : "text-red-500"}`}>
                  {retentionData.sevenDayReturnPct}%
                </p>
                <p className="text-xs text-gray-400 mt-1">Came back this week</p>
              </div>

              {/* Avg gap */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
                <p className="text-xs text-gray-500 mb-1">Avg Session Gap</p>
                <p className="text-3xl font-bold text-gray-800">
                  {retentionData.avgGapDays === 0 ? "—" : `${retentionData.avgGapDays}d`}
                </p>
                <p className="text-xs text-gray-400 mt-1">Median: {retentionData.medianGapDays === 0 ? "—" : `${retentionData.medianGapDays}d`}</p>
              </div>
            </div>

            {/* Frequency distribution */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Login Frequency Distribution</h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {retentionData.activeUserCount} active users · all time · inactive (30+ days) excluded
                  </p>
                </div>
              </div>
              <div className="space-y-2.5">
                {retentionData.freqBuckets.map((b) => (
                  <div key={b.label} className="flex items-center gap-3">
                    <div className="w-28 text-xs text-gray-700 font-medium flex-shrink-0">{b.label}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-4 rounded-full transition-all"
                        style={{ width: `${b.pct}%`, backgroundColor: b.color, minWidth: b.count > 0 ? "4px" : "0" }}
                      />
                    </div>
                    <div className="w-16 text-right text-xs text-gray-600 flex-shrink-0">
                      <span className="font-semibold">{b.pct}%</span>
                      <span className="text-gray-400"> ({b.count})</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Based on average days between logins over the past 90 days.
                Users with only one login session are counted as "one-time / rare."
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500 text-sm">No retention data available.</p>
          </div>
        )}
      </div>

      {/* MAIN SECTION SELECTOR (Dropdown/Tabs) */}
      <div className="mt-12 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            {activeSection === "actions" && "Action Log (All Users)"}
            {activeSection === "stats" && "Stats Log"}
            {activeSection === "inbox" && "Inbox"}
          </h2>
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 text-sm">
            {[
              { key: "actions", label: "Actions" },
              { key: "stats", label: "Stats Log" },
              { key: "inbox", label: "Inbox" },
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setActiveSection(option.key as "actions" | "stats" | "inbox")}
                className={`px-4 py-2 rounded-md transition text-sm font-medium ${
                  activeSection === option.key
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* ACTION LOG SECTION */}
        {activeSection === "actions" && (
          <>
            {selectedActionType && (
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Showing only: <span className="font-semibold">{formatActionTypeName(selectedActionType)}</span>
                </p>
                <button
                  onClick={() => setSelectedActionType(null)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear Filter
                </button>
              </div>
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
                <div className="max-h-96 overflow-y-auto p-4">
                  {actionLog.map((action, idx) => {
                    // Split text around the username so we can make it a link
                    const nameParts = action.username && action.text.includes(action.username)
                      ? action.text.split(action.username)
                      : null;
                    return (
                      <div
                        key={idx}
                        className={`flex items-start justify-between mb-2 p-3 rounded ${getActionColorClass(action.actionType)}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 leading-snug">
                            {nameParts ? (
                              <>
                                {nameParts[0]}
                                {action.userId ? (
                                  <a
                                    href={`/profile/${action.userId}`}
                                    className="font-semibold text-blue-700 hover:underline"
                                  >
                                    {action.username}
                                  </a>
                                ) : (
                                  <span className="font-semibold">{action.username}</span>
                                )}
                                {nameParts.slice(1).join(action.username)}
                              </>
                            ) : (
                              action.text
                            )}
                          </p>
                          {action.actionType === "user_signup" && action.dmCount !== undefined && (
                            <p className="text-xs mt-0.5 text-gray-500">
                              💬 {action.dmCount} of 4 welcome messages sent
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                          {action.url && (
                            <a
                              href={action.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline"
                              title="View content"
                            >
                              View →
                            </a>
                          )}
                          {action.userId && (
                            <a
                              href={`/profile/${action.userId}`}
                              className="text-xs font-semibold text-gray-500 hover:text-gray-800 hover:underline"
                              title="View profile"
                            >
                              Profile →
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* STATS LOG SECTION */}
        {activeSection === "stats" && (
          <>
            {loadingStatsLog ? (
              <div className="bg-white p-4 rounded-xl shadow">
                <p className="text-gray-500 text-sm">Loading stats...</p>
              </div>
            ) : statsLogData.length === 0 ? (
              <div className="bg-white p-4 rounded-xl shadow">
                <p className="text-gray-500 text-sm">No stats data available.</p>
              </div>
            ) : (
              <>
                {/* Stats Log Tabs (List / Graph) */}
                <div className="mb-4 inline-flex rounded-lg border border-gray-200 bg-white p-1 text-sm">
                  <button
                    onClick={() => setStatsLogView("list")}
                    className={`px-4 py-2 rounded-md transition font-medium ${
                      statsLogView === "list"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setStatsLogView("graph")}
                    className={`px-4 py-2 rounded-md transition font-medium ${
                      statsLogView === "graph"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Graph
                  </button>
                </div>

                {/* Metric Toggle Bar (shown for both views) */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {[
                    "Signups",
                    "Logins",
                    "Total Actions",
                    "Chapters Read",
                    "Notes Created",
                    "People Learned",
                    "Places Discovered",
                    "Keywords Understood",
                    "Devotional Days Completed",
                    "Reading Plan Chapters Completed",
                    "Thoughts Posted",
                    "Prayers Posted",
                    "Photos Posted",
                    "Videos Posted",
                    "Post Likes",
                    "Comments",
                    "Replies",
                    "Buddies Added",
                    "Group Messages",
                  ].map((metric) => (
                    <button
                      key={metric}
                      onClick={() => setSelectedMetric(metric)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedMetric === metric
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {metric}
                    </button>
                  ))}
                </div>

                {/* Stats Log List View */}
                {statsLogView === "list" && (
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className={`max-h-96 overflow-y-auto ${statsLogData.length > 10 ? 'p-4' : 'p-4'}`}>
                      {statsLogData.map((row, idx) => {
                        // Get the value for the selected metric
                        const getMetricValue = () => {
                          switch (selectedMetric) {
                            case "Signups":
                              return row.signups;
                            case "Logins":
                              return row.logins;
                            case "Active Users":
                              return row.activeUsers;
                            case "Total Actions":
                              return row.totalActions;
                            case "Chapters Read":
                              return row.chaptersRead;
                            case "Notes Created":
                              return row.notesCreated;
                            case "People Learned":
                              return row.peopleLearned;
                            case "Places Discovered":
                              return row.placesDiscovered;
                            case "Keywords Understood":
                              return row.keywordsUnderstood;
                            case "Devotional Days Completed":
                              return row.devotionalDaysCompleted;
                            case "Reading Plan Chapters Completed":
                              return row.readingPlanChaptersCompleted;
                            case "Trivia Questions Answered":
                              return row.triviaQuestionsAnswered;
                            case "Thoughts Posted":
                              return row.feedThoughtsPosted;
                            case "Prayers Posted":
                              return row.feedPrayersPosted;
                            case "Photos Posted":
                              return row.feedPhotosPosted;
                            case "Videos Posted":
                              return row.feedVideosPosted;
                            case "Post Likes":
                              return row.feedPostLikes;
                            case "Comments":
                              return row.feedComments;
                            case "Replies":
                              return row.feedReplies;
                            case "Buddies Added":
                              return row.buddiesAdded;
                            case "Group Messages":
                              return row.groupMessagesSent;
                            default:
                              return row.totalActions;
                          }
                        };

                        // Alternate background colors
                        const bgColorClass = idx % 2 === 0 ? "bg-blue-50" : "bg-green-50";
                        const borderColorClass = idx % 2 === 0 ? "border-blue-500" : "border-green-500";

                        return (
                          <div
                            key={idx}
                            onClick={() => setSelectedStatsRow(row)}
                            className={`mb-2 p-3 rounded cursor-pointer hover:opacity-90 transition-opacity border-l-4 ${bgColorClass} ${borderColorClass}`}
                          >
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">{row.period}:</span> {selectedMetric} - {getMetricValue().toLocaleString()}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Stats Log Graph View */}
                {statsLogView === "graph" && (
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <div className="h-64 relative">
                      <StatsGraph
                        data={statsLogData}
                        metric={selectedMetric}
                        timeFilter={timeFilter}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* INBOX SECTION */}
        {activeSection === "inbox" && (
          <div data-inbox-section>
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

                    // Filter out dismissed items
                    const visibleItems = allItems.filter((item) => !dismissedInboxItems.has(item.id));

                    return visibleItems.map((item) => {
                      if (item.type === "request") {
                        return (
                          <div
                            key={`request-${item.id}`}
                            className="group mb-2 p-3 rounded bg-blue-50 border-l-4 border-blue-500 hover:bg-blue-100 transition-colors flex items-center justify-between gap-3"
                          >
                            <p 
                              className="text-sm text-gray-900 flex-1 cursor-pointer"
                              onClick={() => setSelectedRequest(item.fullData)}
                            >
                              📨 {item.date} at {item.time} — {item.username} sent a message ({item.subject})
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                dismissInboxItem(item.id, "request");
                              }}
                              className="opacity-0 group-hover:opacity-100 px-3 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded border border-red-200 transition-all"
                              title="Remove from inbox"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={`feedback-${item.id}`}
                            className="group mb-2 p-3 rounded bg-green-50 border-l-4 border-green-500 hover:bg-green-100 transition-colors flex items-center justify-between gap-3"
                          >
                            <p 
                              className="text-sm text-gray-900 flex-1 cursor-pointer"
                              onClick={() => setSelectedFeedback(item.fullData)}
                            >
                              On {item.date} at {item.time}, {item.username}.
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                dismissInboxItem(item.id, "feedback");
                              }}
                              className="opacity-0 group-hover:opacity-100 px-3 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded border border-red-200 transition-all"
                              title="Remove from inbox"
                            >
                              Delete
                            </button>
                          </div>
                        );
                      }
                    });
                  })()}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* DEVOTIONALS SECTION */}
      <div className="mt-8 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <button
            type="button"
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
            onClick={() => setExpandedDevotionals((prev) => prev.has("__all__") ? new Set() : new Set(["__all__"]))}
          >
            <span className="text-2xl font-bold">Devotionals</span>
            <span className="text-gray-400 text-lg">{expandedDevotionals.has("__all__") ? "▲" : "▼"}</span>
          </button>
          {expandedDevotionals.has("__all__") && (
            <div className="border-t border-gray-100">
              {loadingDevotionalStats ? (
                <p className="text-sm text-gray-400 px-5 py-4">Loading...</p>
              ) : devotionalStats.length === 0 ? (
                <p className="text-sm text-gray-400 px-5 py-4">No devotionals found.</p>
              ) : (
                devotionalStats.map((dev, i) => (
                  <div key={dev.id} className={i > 0 ? "border-t border-gray-100" : ""}>
                    {/* Devotional row — click to expand user list */}
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition text-left"
                      onClick={() =>
                        setExpandedDevotionals((prev) => {
                          const next = new Set(prev);
                          next.has(dev.id) ? next.delete(dev.id) : next.add(dev.id);
                          return next;
                        })
                      }
                    >
                      <div>
                        <span className="text-gray-800 font-semibold">{dev.title}</span>
                        <span className="ml-3 text-xs text-gray-400">{dev.total_days} days</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-blue-600 font-bold">{dev.usersStarted} started</span>
                        {dev.usersCompleted > 0 && (
                          <span className="text-sm text-green-600 font-bold">{dev.usersCompleted} finished</span>
                        )}
                        <span className="text-gray-400 text-sm">{expandedDevotionals.has(dev.id) ? "▲" : "▼"}</span>
                      </div>
                    </button>

                    {/* Per-user progress detail */}
                    {expandedDevotionals.has(dev.id) && (
                      <div className="border-t border-gray-100 bg-gray-50 px-5 py-3">
                        {dev.users.length === 0 ? (
                          <p className="text-sm text-gray-400">No users have started this devotional yet.</p>
                        ) : (
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-left text-xs text-gray-500 border-b border-gray-200 pb-1">
                                <th className="pb-2 font-semibold">User</th>
                                <th className="pb-2 font-semibold">Days Done</th>
                                <th className="pb-2 font-semibold">Current Day</th>
                                <th className="pb-2 font-semibold">Status</th>
                                <th className="pb-2 font-semibold">Last Activity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dev.users.map((u) => (
                                <tr key={u.user_id} className="border-b border-gray-100 last:border-0">
                                  <td className="py-2 font-medium text-gray-800">{u.username}</td>
                                  <td className="py-2 text-gray-600">{u.daysCompleted} / {dev.total_days}</td>
                                  <td className="py-2 text-gray-600">Day {u.highestDay}</td>
                                  <td className="py-2">
                                    {u.finished ? (
                                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Finished ✓</span>
                                    ) : u.daysCompleted > 0 ? (
                                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">In Progress</span>
                                    ) : (
                                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs font-semibold">Started</span>
                                    )}
                                  </td>
                                  <td className="py-2 text-gray-400 text-xs">
                                    {u.lastActivity ? new Date(u.lastActivity).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* BUDDY PARTNERS / AMBASSADORS SECTION */}
      <div className="mt-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-teal-50">
            <div>
              <span className="text-xl font-bold text-teal-800">🤝 Buddy Partners</span>
              <p className="text-xs text-teal-600 mt-0.5">{ambassadors.length} active partner{ambassadors.length !== 1 ? "s" : ""}</p>
            </div>
            <button
              type="button"
              onClick={() => loadAmbassadors()}
              className="text-xs text-teal-600 hover:text-teal-800 font-semibold transition"
            >
              ↻ Refresh
            </button>
          </div>
          {loadingAmbassadors ? (
            <p className="text-sm text-gray-400 px-5 py-4">Loading...</p>
          ) : ambassadors.length === 0 ? (
            <p className="text-sm text-gray-400 px-5 py-4">No Buddy Partners yet. Assign the Buddy Partner badge to a user to create one.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {ambassadors.map((amb) => (
                <div key={amb.user_id}>
                  {/* Ambassador row */}
                  <button
                    type="button"
                    onClick={() => setExpandedAmbassador((prev) => prev === amb.user_id ? null : amb.user_id)}
                    className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-gray-50 transition"
                  >
                    {amb.profile_image_url ? (
                      <img src={amb.profile_image_url} alt={amb.username} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-sm font-bold text-teal-700 flex-shrink-0">
                        {amb.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{amb.display_name || amb.username}</p>
                      <p className="text-xs text-gray-400 font-mono">Code: <span className="font-bold text-teal-700">{amb.referral_code}</span> · {amb.is_active ? "Active" : "Inactive"}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xl font-black text-teal-700">{amb.total_referrals}</p>
                      <p className="text-xs text-gray-400">referrals</p>
                    </div>
                    <span className="text-gray-400 text-sm ml-2">{expandedAmbassador === amb.user_id ? "▲" : "▼"}</span>
                  </button>
                  {/* Expanded referral list */}
                  {expandedAmbassador === amb.user_id && (
                    <div className="bg-gray-50 border-t border-gray-100 px-5 py-3">
                      {amb.referrals.length === 0 ? (
                        <p className="text-xs text-gray-400 py-2">No referrals yet.</p>
                      ) : (
                        <div className="space-y-2">
                          {amb.referrals.map((r) => (
                            <div key={r.referred_user_id} className="flex items-center gap-2 text-xs">
                              {r.profile_image_url ? (
                                <img src={r.profile_image_url} alt={r.username} className="w-6 h-6 rounded-full object-cover" />
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-600">
                                  {r.username.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <span className="font-semibold text-gray-800">{r.username}</span>
                              <span className="text-gray-400">joined {new Date(r.trial_started_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                              <span className={`ml-auto px-2 py-0.5 rounded-full font-semibold ${new Date(r.trial_ends_at) > new Date() ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"}`}>
                                {new Date(r.trial_ends_at) > new Date() ? "Trial active" : "Trial ended"}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* READING PLANS SECTION */}
      <div className="mt-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <button
            type="button"
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition"
            onClick={() => setExpandedReadingPlans((prev) => !prev)}
          >
            <span className="text-2xl font-bold">Reading Plans</span>
            <span className="text-gray-400 text-lg">{expandedReadingPlans ? "▲" : "▼"}</span>
          </button>
          {expandedReadingPlans && (
            <div className="border-t border-gray-100">
              {loadingReadingPlanStats ? (
                <p className="text-sm text-gray-400 px-5 py-4">Loading...</p>
              ) : readingPlanStats.length === 0 ? (
                <p className="text-sm text-gray-400 px-5 py-4">No reading plan data found.</p>
              ) : (
                readingPlanStats.map((plan, i) => (
                  <div key={plan.title} className={`flex items-center justify-between px-5 py-3 ${i > 0 ? "border-t border-gray-100" : ""}`}>
                    <span className="text-gray-800 font-medium">{plan.title}</span>
                    <span className="text-blue-600 font-bold">{plan.usersStarted} started</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* STATS LOG DETAIL MODAL */}
      {selectedStatsRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Stats for {selectedStatsRow.period}</h2>
                <button
                  onClick={() => setSelectedStatsRow(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Signups</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.signups.toLocaleString()}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.activeUsers.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Total Actions</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.totalActions.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Chapters Read</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.chaptersRead.toLocaleString()}</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Notes Created</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.notesCreated.toLocaleString()}</p>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">People Learned</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.peopleLearned.toLocaleString()}</p>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Places Discovered</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.placesDiscovered.toLocaleString()}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Keywords Understood</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.keywordsUnderstood.toLocaleString()}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Devotional Days Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.devotionalDaysCompleted.toLocaleString()}</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Reading Plan Chapters Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.readingPlanChaptersCompleted.toLocaleString()}</p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Trivia Questions Answered</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.triviaQuestionsAnswered.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t mt-6">
                <button
                  onClick={() => setSelectedStatsRow(null)}
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
      case "Upgrades":
        return "bg-amber-100 border border-amber-200";
      case "Active Users":
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
