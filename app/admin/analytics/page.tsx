"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";

type TimeFilter = "24h" | "7d" | "30d" | "1y" | "all";

type OverviewMetrics = {
  signups: number;
  activeUsers: number;
  upgrades: number;
  totalActions: number;
  navigationViews: number;
  navigationClicks: number;
  videosWatched: number;
  chaptersRead: number;
  notesCreated: number;
  peopleLearned: number;
  placesDiscovered: number;
  keywordsUnderstood: number;
  devotionalDaysCompleted: number;
  dailyBibleTasksCompleted: number;
  readingPlanChaptersCompleted: number;
  scrambledWordsAnswered: number;
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

type WeeklyReportCenterRow = {
  userId: string;
  username: string;
  displayName: string;
  totalActions: number;
  lastActionAt: string;
  sentAt: string | null;
  isPaid: boolean;
  currentLevel: number | null;
};

type WeeklyReportCenterSummary = {
  activeUsers7d: number;
  sentThisWeek: number;
  unsentThisWeek: number;
  totalActions7d: number;
};

type VideoAnalyticsTopVideo = {
  videoId: string;
  episodeTitle: string;
  seriesTitle: string;
  category: string;
  viewers: number;
  started: number;
  completed: number;
  minutesPlayed: number;
  averageWatchPercent: number;
  lastWatchedAt: string | null;
};

type VideoAnalyticsSummary = {
  totalMinutesPlayed: number;
  uniqueViewers: number;
  videosStarted: number;
  videosCompleted: number;
  averageWatchPercent: number;
  topVideos: VideoAnalyticsTopVideo[];
};

type LouisReportLogRow = {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  createdAt: string;
  consumedAt: string | null;
  isPaid: boolean;
  currentLevel: number | null;
  title: string | null;
};

const INITIAL_METRICS: OverviewMetrics = {
  signups: 0,
  activeUsers: 0,
  upgrades: 0,
  totalActions: 0,
  navigationViews: 0,
  navigationClicks: 0,
  videosWatched: 0,
  chaptersRead: 0,
  notesCreated: 0,
  peopleLearned: 0,
  placesDiscovered: 0,
  keywordsUnderstood: 0,
  devotionalDaysCompleted: 0,
  dailyBibleTasksCompleted: 0,
  readingPlanChaptersCompleted: 0,
  scrambledWordsAnswered: 0,
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

const INITIAL_VIDEO_ANALYTICS: VideoAnalyticsSummary = {
  totalMinutesPlayed: 0,
  uniqueViewers: 0,
  videosStarted: 0,
  videosCompleted: 0,
  averageWatchPercent: 0,
  topVideos: [],
};

const NAVIGATION_VIEW_ACTION_TYPES = [
  "guided_studies_viewed",
  "devotionals_viewed",
  "reading_plans_viewed",
  "bible_study_games_viewed",
  "trivia_hub_viewed",
  "scrambled_hub_viewed",
  "scrambled_books_viewed",
  "dashboard_viewed",
  "bible_buddy_tv_viewed",
  "bible_reader_viewed",
  "bible_book_viewed",
  "scrambled_book_viewed",
  "bible_chapter_viewed",
] as const;

const NAVIGATION_CLICK_ACTION_TYPES = [
  "guided_study_tool_opened",
  "devotional_opened",
  "devotional_day_opened",
  "devotional_bible_reading_opened",
  "devotional_reflection_saved",
  "reading_plan_opened",
  "reading_plan_day_opened",
  "reading_plan_chapter_opened",
  "bible_game_opened",
  "trivia_category_opened",
  "trivia_pack_opened",
  "scrambled_category_opened",
  "scrambled_book_opened",
  "scrambled_chapter_opened",
  "scrambled_chapter_completed",
  "dashboard_card_opened",
  "invite_buddy_opened",
  "bible_buddy_tv_title_opened",
  "bible_book_opened",
  "bible_chapter_opened",
] as const;

const VIDEO_WATCH_ACTION_TYPES = [
  "bible_buddy_tv_video_started",
] as const;

const DAILY_BIBLE_TASK_ACTION_TYPES = [
  "devotional_day_completed",
  "chapter_completed",
  "chapter_notes_reviewed",
  "trivia_chapter_completed",
  "scrambled_chapter_completed",
] as const;

const DASHBOARD_CARD_BREAKDOWN_LABELS = [
  "The Bible",
  "Bible Study Group",
  "Bible Study Tools",
  "Bible Buddy TV",
  "Bible Study Games",
  "Share Bible Buddy",
] as const;

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
  const [dashboardCardBreakdown, setDashboardCardBreakdown] = useState<
    Array<{ label: string; value: number }>
  >(DASHBOARD_CARD_BREAKDOWN_LABELS.map((label) => ({ label, value: 0 })));
  const [loadingOverview, setLoadingOverview] = useState(true);
  const [overviewError, setOverviewError] = useState<string | null>(null);
  const [videoAnalytics, setVideoAnalytics] =
    useState<VideoAnalyticsSummary>(INITIAL_VIDEO_ANALYTICS);
  const [loadingVideoAnalytics, setLoadingVideoAnalytics] = useState(true);
  const [videoAnalyticsError, setVideoAnalyticsError] = useState<string | null>(null);

  // Action type filter for Action Log
  const [selectedActionType, setSelectedActionType] = useState<string | null>(null);
  const [selectedActionLabel, setSelectedActionLabel] = useState<string | null>(null);

  // Stats Log
  const [statsLogData, setStatsLogData] = useState<
    Array<{
      period: string;
      signups: number;
      logins: number;
      activeUsers: number;
      totalActions: number;
      videosWatched: number;
      chaptersRead: number;
      notesCreated: number;
      peopleLearned: number;
      placesDiscovered: number;
      keywordsUnderstood: number;
      devotionalDaysCompleted: number;
      dailyBibleTasksCompleted: number;
      readingPlanChaptersCompleted: number;
      scrambledWordsAnswered: number;
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
  const [activeSection, setActiveSection] = useState<"actions" | "stats" | "inbox" | "messages">("actions");

  // Admin Action Log
  const [actionLog, setActionLog] = useState<
    Array<{ date: string; text: string; sortKey: number; actionType: string; userId: string | null; username: string; url?: string; dmCount?: number; actionLabel?: string | null }>
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

  // Weekly Bible report center
  const [weeklyReportRows, setWeeklyReportRows] = useState<WeeklyReportCenterRow[]>([]);
  const [weeklyReportSummary, setWeeklyReportSummary] = useState<WeeklyReportCenterSummary>({
    activeUsers7d: 0,
    sentThisWeek: 0,
    unsentThisWeek: 0,
    totalActions7d: 0,
  });
  const [loadingWeeklyReportCenter, setLoadingWeeklyReportCenter] = useState(true);
  const [sendingWeeklyReports, setSendingWeeklyReports] = useState(false);
  const [weeklyReportStatus, setWeeklyReportStatus] = useState<string | null>(null);
  const [louisReportLogRows, setLouisReportLogRows] = useState<LouisReportLogRow[]>([]);
  const [loadingLouisReportLog, setLoadingLouisReportLog] = useState(true);

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
    loadTotalUsers();
    loadFeedbackInbox();
    loadUserRequestsInbox();
    loadWeeklyReportCenter();
    loadLouisReportLog();
  }, []);

  useEffect(() => {
    loadOverviewMetrics(timeFilter);
    loadVideoAnalytics(timeFilter);
    buildAdminActionLog(timeFilter, selectedActionType, selectedActionLabel);
    loadStatsLog(timeFilter);
    loadDevotionalStats();
    loadReadingPlanStats();
    loadAmbassadors();
  }, [timeFilter, selectedActionType, selectedActionLabel]);

  useEffect(() => {
    if (
      selectedActionType !== "dashboard_card_opened" &&
      selectedActionType !== "invite_buddy_opened" &&
      selectedActionLabel !== null
    ) {
      setSelectedActionLabel(null);
    }
  }, [selectedActionType, selectedActionLabel]);

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

  async function loadVideoAnalytics(filter: TimeFilter) {
    setLoadingVideoAnalytics(true);
    setVideoAnalyticsError(null);

    try {
      const response = await fetch(`/api/admin/video-analytics?filter=${filter}`);
      if (!response.ok) {
        setVideoAnalytics(INITIAL_VIDEO_ANALYTICS);
        setVideoAnalyticsError("Failed to load video analytics.");
        setLoadingVideoAnalytics(false);
        return;
      }

      const data = await response.json();
      setVideoAnalytics(data.summary || INITIAL_VIDEO_ANALYTICS);
      setLoadingVideoAnalytics(false);
    } catch (error) {
      console.error("[VIDEO_ANALYTICS] Error loading video analytics:", error);
      setVideoAnalytics(INITIAL_VIDEO_ANALYTICS);
      setVideoAnalyticsError("Failed to load video analytics.");
      setLoadingVideoAnalytics(false);
    }
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

        const { count: dailyBibleTasksCompleted } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .in("action_type", [...DAILY_BIBLE_TASK_ACTION_TYPES])
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        // Reading Plan Chapters Completed
        const { count: readingPlanChaptersCompleted } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "reading_plan_chapter_completed")
          .gte("created_at", bucketStart)
          .lte("created_at", bucketEnd);

        // Scrambled words answered
        const { count: scrambledWordsAnswered } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "scrambled_word_answered")
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

        const { count: videosWatched } = await supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .in("action_type", [...VIDEO_WATCH_ACTION_TYPES])
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
          videosWatched: videosWatched || 0,
          chaptersRead: chaptersRead || 0,
          notesCreated: notesCreated || 0,
          peopleLearned: peopleLearned || 0,
          placesDiscovered: placesDiscovered || 0,
          keywordsUnderstood: keywordsUnderstood || 0,
          devotionalDaysCompleted: devotionalDaysCompleted || 0,
          dailyBibleTasksCompleted: dailyBibleTasksCompleted || 0,
          readingPlanChaptersCompleted: readingPlanChaptersCompleted || 0,
          scrambledWordsAnswered: scrambledWordsAnswered || 0,
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

      const navigationViewsPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .in("action_type", [...NAVIGATION_VIEW_ACTION_TYPES])
      );

      const navigationClicksPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .in("action_type", [...NAVIGATION_CLICK_ACTION_TYPES])
      );

      const videosWatchedPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .in("action_type", [...VIDEO_WATCH_ACTION_TYPES])
      );

      const dashboardCardBreakdownPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("action_type, action_label")
          .in("action_type", ["dashboard_card_opened", "invite_buddy_opened"])
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

      const dailyBibleTasksPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .in("action_type", [...DAILY_BIBLE_TASK_ACTION_TYPES])
      );

      // Reading Plan chapters completed
      const readingPlanChaptersPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "reading_plan_chapter_completed")
      );

      // Scrambled words answered
      const scrambledWordsPromise = applyDateFilter(
        supabase
          .from("master_actions")
          .select("id", { count: "exact", head: true })
          .eq("action_type", "scrambled_word_answered")
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
        navigationViewsResult,
        navigationClicksResult,
        videosWatchedResult,
        dashboardCardBreakdownResult,
        chaptersResult,
        notesResult,
        peopleResult,
        placesResult,
        keywordsResult,
        devotionalDaysResult,
        dailyBibleTasksResult,
        readingPlanChaptersResult,
        scrambledWordsResult,
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
        navigationViewsPromise,
        navigationClicksPromise,
        videosWatchedPromise,
        dashboardCardBreakdownPromise,
        chaptersPromise,
        notesPromise,
        peoplePromise,
        placesPromise,
        keywordsPromise,
        devotionalDaysPromise,
        dailyBibleTasksPromise,
        readingPlanChaptersPromise,
        scrambledWordsPromise,
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
          .map((row: { user_id: string | null }) => row.user_id)
          .filter((userId: string | null): userId is string => typeof userId === "string" && userId.length > 0)
      ).size;
      const totalActionsCount = totalActionsResult.count ?? 0;
      const totalActionsError = totalActionsResult.error;
      const navigationViewsCount = navigationViewsResult.count ?? 0;
      const navigationViewsError = navigationViewsResult.error;
      const navigationClicksCount = navigationClicksResult.count ?? 0;
      const navigationClicksError = navigationClicksResult.error;
      const videosWatchedCount = videosWatchedResult.count ?? 0;
      const videosWatchedError = videosWatchedResult.error;
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
      const dailyBibleTasksCount = dailyBibleTasksResult.count ?? 0;
      const dailyBibleTasksError = dailyBibleTasksResult.error;
      const readingPlanChaptersCount = readingPlanChaptersResult.count ?? 0;
      const readingPlanChaptersError = readingPlanChaptersResult.error;
      const scrambledWordsCount = scrambledWordsResult.count ?? 0;
      const scrambledWordsError = scrambledWordsResult.error;
      const triviaQuestionsCount = triviaQuestionsResult.count ?? 0;
      const triviaQuestionsError = triviaQuestionsResult.error;
      const understandVerseOfTheDayCount = understandVerseOfTheDayResult.count ?? 0;
      const understandVerseOfTheDayError = understandVerseOfTheDayResult.error;

      if (
        signupsError ||
        upgradesError ||
        activeUsersError ||
        totalActionsError ||
        navigationViewsError ||
        navigationClicksError ||
        videosWatchedError ||
        chaptersError ||
        notesError ||
        peopleError ||
        placesError ||
        keywordsError ||
        devotionalDaysError ||
        dailyBibleTasksError ||
        readingPlanChaptersError ||
        scrambledWordsError ||
        triviaQuestionsError ||
        understandVerseOfTheDayError
      ) {
        console.error("[ANALYTICS_OVERVIEW] Error loading metrics:", {
          signupsError,
          upgradesError,
          activeUsersError,
          totalActionsError,
          navigationViewsError,
          navigationClicksError,
          videosWatchedError,
          chaptersError,
          notesError,
          peopleError,
          placesError,
          keywordsError,
          devotionalDaysError,
          dailyBibleTasksError,
          readingPlanChaptersError,
          scrambledWordsError,
          triviaQuestionsError,
          understandVerseOfTheDayError,
        });
        setOverviewError("Failed to load overview metrics.");
        setOverviewMetrics(INITIAL_METRICS);
        setDashboardCardBreakdown(DASHBOARD_CARD_BREAKDOWN_LABELS.map((label) => ({ label, value: 0 })));
        setLoadingOverview(false);
        return;
      }

      const dashboardCardCounts = new Map<string, number>();
      for (const row of dashboardCardBreakdownResult.data || []) {
        const label =
          row.action_type === "invite_buddy_opened"
            ? "Share Bible Buddy"
            : row.action_label || "Unknown";
        dashboardCardCounts.set(label, (dashboardCardCounts.get(label) ?? 0) + 1);
      }

      setDashboardCardBreakdown(
        DASHBOARD_CARD_BREAKDOWN_LABELS.map((label) => ({
          label,
          value: dashboardCardCounts.get(label) ?? 0,
        }))
      );

      setOverviewMetrics({
        signups: signupsCount ?? 0,
        activeUsers: activeUsersCount,
        upgrades: upgradesCount,
        totalActions: totalActionsCount ?? 0,
        navigationViews: navigationViewsCount,
        navigationClicks: navigationClicksCount,
        videosWatched: videosWatchedCount,
        chaptersRead: chaptersCount ?? 0,
        notesCreated: notesCount ?? 0,
        peopleLearned: peopleCount ?? 0,
        placesDiscovered: placesCount ?? 0,
        keywordsUnderstood: keywordsCount ?? 0,
        devotionalDaysCompleted: devotionalDaysCount ?? 0,
        dailyBibleTasksCompleted: dailyBibleTasksCount ?? 0,
        readingPlanChaptersCompleted: readingPlanChaptersCount ?? 0,
        scrambledWordsAnswered: scrambledWordsCount ?? 0,
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
      setDashboardCardBreakdown(DASHBOARD_CARD_BREAKDOWN_LABELS.map((label) => ({ label, value: 0 })));
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
  async function buildAdminActionLog(filter?: TimeFilter, actionTypeFilter?: string | null, actionLabelFilter?: string | null) {
    setLoadingActionLog(true);
    const actions: Array<{ date: string; text: string; sortKey: number; actionType: string; userId: string | null; username: string; url?: string; dmCount?: number; actionLabel?: string | null }> = [];

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
      if (actionTypeFilter === "navigation_views") {
        query = query.in("action_type", [...NAVIGATION_VIEW_ACTION_TYPES]);
      } else if (actionTypeFilter === "navigation_clicks") {
        query = query.in("action_type", [...NAVIGATION_CLICK_ACTION_TYPES]);
      } else if (actionTypeFilter === "videos_watched") {
        query = query.in("action_type", [...VIDEO_WATCH_ACTION_TYPES]);
      } else if (actionTypeFilter === "daily_bible_tasks_completed") {
        query = query.in("action_type", [...DAILY_BIBLE_TASK_ACTION_TYPES]);
      } else if (actionTypeFilter) {
        query = query.eq("action_type", actionTypeFilter);
      }

      if (actionLabelFilter) {
        query = query.eq("action_label", actionLabelFilter);
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
        if (action.action_type === "guided_studies_viewed") {
          const text = `On ${formattedDate} at ${formattedTime}, ${username} viewed Bible Study Tools.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "guided_studies_viewed", url: "/guided-studies" });
        } else if (action.action_type === "guided_study_tool_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened the Bible Study Tool "${action.action_label}".${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a Bible Study Tool.${counterText}`;
          let toolUrl: string | undefined;
          if (action.action_label === "Devotionals") toolUrl = "/devotionals";
          else if (action.action_label === "Bible Reading Plans") toolUrl = "/reading-plans";
          else if (action.action_label === "Bible References") toolUrl = "/bible-references";
          else if (action.action_label === "Bible Study Notes") toolUrl = "/notes";
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "guided_study_tool_opened", url: toolUrl });
        } else if (action.action_type === "devotionals_viewed") {
          const text = `On ${formattedDate} at ${formattedTime}, ${username} viewed the devotionals page.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "devotionals_viewed", url: "/devotionals" });
        } else if (action.action_type === "devotional_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened the devotional "${action.action_label}".${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a devotional.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "devotional_opened" });
        } else if (action.action_type === "devotional_day_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a devotional day.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "devotional_day_opened" });
        } else if (action.action_type === "devotional_bible_reading_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened the Bible reading for ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a devotional Bible reading.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "devotional_bible_reading_opened" });
        } else if (action.action_type === "devotional_reflection_saved") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} saved a reflection for ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} saved a devotional reflection.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "devotional_reflection_saved" });
        } else if (action.action_type === "reading_plans_viewed") {
          const text = `On ${formattedDate} at ${formattedTime}, ${username} viewed Bible Reading Plans.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "reading_plans_viewed", url: "/reading-plans" });
        } else if (action.action_type === "reading_plan_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened the reading plan "${action.action_label}".${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a reading plan.${counterText}`;
          let planUrl: string | undefined;
          if (action.action_label === "Bible in One Year") planUrl = "/reading-plans/bible-in-one-year";
          else if (action.action_label === "The Bible Buddy Reading Plan") planUrl = "/reading-plans/bible-buddy";
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "reading_plan_opened", url: planUrl });
        } else if (action.action_type === "reading_plan_day_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a reading plan day.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "reading_plan_day_opened" });
        } else if (action.action_type === "reading_plan_chapter_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened a reading plan chapter (${action.action_label}).${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a reading plan chapter.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "reading_plan_chapter_opened" });
        } else if (action.action_type === "bible_study_games_viewed") {
          const text = `On ${formattedDate} at ${formattedTime}, ${username} viewed Bible Study Games.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "bible_study_games_viewed", url: "/bible-study-games" });
        } else if (action.action_type === "bible_game_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a Bible game.${counterText}`;
          let gameUrl: string | undefined;
          if (action.action_label === "Bible Study Trivia") gameUrl = "/bible-trivia";
          else if (action.action_label === "Scrambled") gameUrl = "/bible-study-games/scrambled";
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "bible_game_opened", url: gameUrl });
        } else if (action.action_type === "trivia_hub_viewed") {
          const text = `On ${formattedDate} at ${formattedTime}, ${username} viewed Bible Study Trivia.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "trivia_hub_viewed", url: "/bible-trivia" });
        } else if (action.action_type === "trivia_category_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened Trivia ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a trivia category.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "trivia_category_opened" });
        } else if (action.action_type === "trivia_pack_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened the trivia pack "${action.action_label}".${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a trivia pack.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "trivia_pack_opened" });
        } else if (action.action_type === "scrambled_hub_viewed") {
          const text = `On ${formattedDate} at ${formattedTime}, ${username} viewed Scrambled.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "scrambled_hub_viewed", url: "/bible-study-games/scrambled" });
        } else if (action.action_type === "scrambled_category_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened Scrambled ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a Scrambled category.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "scrambled_category_opened" });
        } else if (action.action_type === "scrambled_books_viewed") {
          const text = `On ${formattedDate} at ${formattedTime}, ${username} viewed Scrambled Books of the Bible.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "scrambled_books_viewed", url: "/bible-study-games/scrambled/books" });
        } else if (action.action_type === "scrambled_book_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened the Scrambled book "${action.action_label}".${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a Scrambled book.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "scrambled_book_opened" });
        } else if (action.action_type === "scrambled_book_viewed") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} viewed the Scrambled book "${action.action_label}".${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} viewed a Scrambled book.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "scrambled_book_viewed" });
        } else if (action.action_type === "scrambled_chapter_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened the Scrambled chapter ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a Scrambled chapter.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "scrambled_chapter_opened" });
        } else if (action.action_type === "scrambled_chapter_completed") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} finished a Scrambled chapter (${action.action_label}).${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} finished a Scrambled chapter.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "scrambled_chapter_completed" });
        } else if (action.action_type === "dashboard_viewed") {
          const text = `On ${formattedDate} at ${formattedTime}, ${username} viewed the dashboard.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "dashboard_viewed",
            url: "/dashboard",
          });
        } else if (action.action_type === "bible_buddy_tv_viewed") {
          const text = `On ${formattedDate} at ${formattedTime}, ${username} viewed Bible Buddy TV.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "bible_buddy_tv_viewed",
            url: "/biblebuddy-tv",
          });
        } else if (action.action_type === "bible_buddy_tv_title_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened the Bible Buddy TV title "${action.action_label}".${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a Bible Buddy TV title.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "bible_buddy_tv_title_opened",
          });
        } else if (action.action_type === "bible_buddy_tv_video_started") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} pressed play on ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} started a Bible Buddy TV video.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "bible_buddy_tv_video_started",
          });
        } else if (action.action_type === "dashboard_card_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} opened the dashboard card "${action.action_label}".${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} opened a dashboard card.${counterText}`;
          let cardUrl: string | undefined;
          if (action.action_label === "The Bible") cardUrl = "/reading";
          else if (action.action_label === "Bible Study Group") cardUrl = "/study-groups";
          else if (action.action_label === "Bible Study Tools") cardUrl = "/guided-studies";
          else if (action.action_label === "Bible Buddy TV") cardUrl = "/biblebuddy-tv";
          else if (action.action_label === "Bible Study Games") cardUrl = "/bible-study-games";
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "dashboard_card_opened",
            url: cardUrl,
            actionLabel: action.action_label,
          });
        } else if (action.action_type === "invite_buddy_opened") {
          const text = `On ${formattedDate} at ${formattedTime}, ${username} clicked Invite a Bible Buddy.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "invite_buddy_opened",
            actionLabel: "Invite a Bible Buddy",
          });
        } else if (action.action_type === "bible_reader_viewed") {
          const text = `On ${formattedDate} at ${formattedTime}, ${username} viewed the Bible reader.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "bible_reader_viewed",
            url: "/reading",
          });
        } else if (action.action_type === "bible_book_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} clicked into ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} clicked into a Bible book.${counterText}`;
          const bookUrl = action.action_label
            ? `/reading/books/${encodeURIComponent(action.action_label.toLowerCase())}`
            : undefined;
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "bible_book_opened",
            url: bookUrl,
          });
        } else if (action.action_type === "bible_book_viewed") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} viewed ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} viewed a Bible book.${counterText}`;
          const bookUrl = action.action_label
            ? `/reading/books/${encodeURIComponent(action.action_label.toLowerCase())}`
            : undefined;
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "bible_book_viewed",
            url: bookUrl,
          });
        } else if (action.action_type === "bible_chapter_opened") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} clicked into ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} clicked into a chapter.${counterText}`;
          let chapterUrl: string | undefined;
          if (action.action_label) {
            const match = action.action_label.match(/^(.+?)\s+(\d+)$/);
            if (match) chapterUrl = `/Bible/${encodeURIComponent(match[1].toLowerCase())}/${match[2]}`;
          }
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "bible_chapter_opened",
            url: chapterUrl,
          });
        } else if (action.action_type === "bible_chapter_viewed") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} viewed ${action.action_label}.${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} viewed a Bible chapter.${counterText}`;
          let chapterUrl: string | undefined;
          if (action.action_label) {
            const match = action.action_label.match(/^(.+?)\s+(\d+)$/);
            if (match) chapterUrl = `/Bible/${encodeURIComponent(match[1].toLowerCase())}/${match[2]}`;
          }
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "bible_chapter_viewed",
            url: chapterUrl,
          });
        } else if (action.action_type === "chapter_completed") {
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
        } else if (action.action_type === "scrambled_word_answered") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} solved a scrambled word (${action.action_label}).${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} solved a scrambled word.${counterText}`;
          actions.push({
            date: formattedDate,
            text,
            userId,
            username,
            sortKey: actionDate.getTime(),
            actionType: "scrambled_word_answered",
          });
        } else if (action.action_type === "feed_post_thought") {
          const text = action.action_label
            ? `On ${formattedDate} at ${formattedTime}, ${username} posted in the group feed: "${action.action_label}".${counterText}`
            : `On ${formattedDate} at ${formattedTime}, ${username} posted in the group feed.${counterText}`;
          actions.push({ date: formattedDate, text, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_thought" });
        } else if (action.action_type === "feed_post_prayer") {
          actions.push({ date: formattedDate, text: `On ${formattedDate} at ${formattedTime}, ${username} posted a prayer in the group feed.${counterText}`, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_prayer" });
        } else if (action.action_type === "feed_post_prayer_request") {
          actions.push({ date: formattedDate, text: `On ${formattedDate} at ${formattedTime}, ${username} posted a prayer request in the group feed.${counterText}`, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_prayer_request" });
        } else if (action.action_type === "feed_post_photo") {
          actions.push({ date: formattedDate, text: `On ${formattedDate} at ${formattedTime}, ${username} posted a photo in the group feed.${counterText}`, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_photo" });
        } else if (action.action_type === "feed_post_video") {
          actions.push({ date: formattedDate, text: `On ${formattedDate} at ${formattedTime}, ${username} posted a video in the group feed.${counterText}`, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_video" });
        } else if (action.action_type === "feed_post_liked") {
          actions.push({ date: formattedDate, text: `On ${formattedDate} at ${formattedTime}, ${username} liked a group feed post.${counterText}`, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_liked" });
        } else if (action.action_type === "feed_post_commented") {
          actions.push({ date: formattedDate, text: `On ${formattedDate} at ${formattedTime}, ${username} commented on a group feed post.${counterText}`, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_commented" });
        } else if (action.action_type === "feed_post_replied") {
          actions.push({ date: formattedDate, text: `On ${formattedDate} at ${formattedTime}, ${username} replied in the group feed.${counterText}`, userId, username, sortKey: actionDate.getTime(), actionType: "feed_post_replied" });
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

  function getCurrentWeekKey(date = new Date()) {
    const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    const day = utc.getUTCDay();
    const diffToMonday = (day + 6) % 7;
    utc.setUTCDate(utc.getUTCDate() - diffToMonday);
    return utc.toISOString().slice(0, 10);
  }

  async function loadWeeklyReportCenter() {
    setLoadingWeeklyReportCenter(true);
    try {
      const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const weekKey = getCurrentWeekKey();
      const actionRows: Array<{ user_id: string; created_at: string }> = [];
      const pageSize = 1000;

      for (let from = 0; ; from += pageSize) {
        const to = from + pageSize - 1;
        const { data: recentActions, error: recentActionsError } = await supabase
          .from("master_actions")
          .select("user_id, created_at")
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .range(from, to);

        if (recentActionsError) {
          console.error("[WEEKLY_REPORT_CENTER] Error loading recent actions:", recentActionsError);
          setWeeklyReportRows([]);
          setWeeklyReportSummary({
            activeUsers7d: 0,
            sentThisWeek: 0,
            unsentThisWeek: 0,
            totalActions7d: 0,
          });
          setLoadingWeeklyReportCenter(false);
          return;
        }

        const batch = (recentActions || []).filter((row: any) => !!row.user_id) as Array<{ user_id: string; created_at: string }>;
        actionRows.push(...batch);

        if (batch.length < pageSize) {
          break;
        }
      }

      const activityByUser = new Map<string, { totalActions: number; lastActionAt: string }>();

      for (const row of actionRows) {
        const existing = activityByUser.get(row.user_id);
        if (!existing) {
          activityByUser.set(row.user_id, { totalActions: 1, lastActionAt: row.created_at });
          continue;
        }
        existing.totalActions += 1;
        if (row.created_at > existing.lastActionAt) {
          existing.lastActionAt = row.created_at;
        }
      }

      const activeUserIds = [...activityByUser.keys()];

      const { data: sentRows, error: sentRowsError } = await supabase
        .from("weekly_bible_report_sent")
        .select("user_id, sent_at")
        .eq("week_key", weekKey)
        .order("sent_at", { ascending: false });

      if (sentRowsError) {
        console.error("[WEEKLY_REPORT_CENTER] Error loading sent rows:", sentRowsError);
      }

      const sentAtByUser = new Map<string, string>();
      for (const row of (sentRows || []) as Array<{ user_id: string; sent_at: string }>) {
        sentAtByUser.set(row.user_id, row.sent_at);
      }

      const profilesMap = new Map<string, {
        user_id: string;
        username: string | null;
        display_name: string | null;
        is_paid: boolean | null;
        current_level: number | null;
      }>();

      for (let i = 0; i < activeUserIds.length; i += 250) {
        const chunk = activeUserIds.slice(i, i + 250);
        const { data: profiles, error: profilesError } = await supabase
          .from("profile_stats")
          .select("user_id, username, display_name, is_paid, current_level")
          .in("user_id", chunk);

        if (profilesError) {
          console.error("[WEEKLY_REPORT_CENTER] Error loading profiles:", profilesError);
          continue;
        }

        for (const profile of profiles || []) {
          profilesMap.set(profile.user_id, profile);
        }
      }

      const rows: WeeklyReportCenterRow[] = activeUserIds
        .map((userId) => {
          const profile = profilesMap.get(userId);
          const activity = activityByUser.get(userId)!;
          return {
            userId,
            username: profile?.username || "Unknown User",
            displayName: profile?.display_name || profile?.username || "Unknown User",
            totalActions: activity.totalActions,
            lastActionAt: activity.lastActionAt,
            sentAt: sentAtByUser.get(userId) || null,
            isPaid: profile?.is_paid === true,
            currentLevel: profile?.current_level ?? null,
          };
        })
        .sort((a, b) => {
          if (a.sentAt && !b.sentAt) return -1;
          if (!a.sentAt && b.sentAt) return 1;
          return new Date(b.lastActionAt).getTime() - new Date(a.lastActionAt).getTime();
        });

      setWeeklyReportRows(rows);
      setWeeklyReportSummary({
        activeUsers7d: activeUserIds.length,
        sentThisWeek: rows.filter((row) => !!row.sentAt).length,
        unsentThisWeek: rows.filter((row) => !row.sentAt).length,
        totalActions7d: actionRows.length,
      });
    } catch (err) {
      console.error("[WEEKLY_REPORT_CENTER] Unexpected error:", err);
      setWeeklyReportRows([]);
      setWeeklyReportSummary({
        activeUsers7d: 0,
        sentThisWeek: 0,
        unsentThisWeek: 0,
        totalActions7d: 0,
      });
    }
    setLoadingWeeklyReportCenter(false);
  }

  async function loadLouisReportLog() {
    setLoadingLouisReportLog(true);
    try {
      const { data: messageRows, error: messageError } = await supabase
        .from("louis_inbox_messages")
        .select("id, user_id, title, created_at, consumed_at")
        .eq("kind", "weekly_bible_report")
        .order("created_at", { ascending: false })
        .limit(250);

      if (messageError) {
        console.error("[LOUIS_REPORT_LOG] Error loading Louis inbox messages:", messageError);
        setLouisReportLogRows([]);
        setLoadingLouisReportLog(false);
        return;
      }

      const userIds = Array.from(
        new Set(((messageRows || []) as Array<{ user_id: string }>).map((row) => row.user_id).filter(Boolean)),
      );

      const profileMap = new Map<string, {
        user_id: string;
        username: string | null;
        display_name: string | null;
        is_paid: boolean | null;
        current_level: number | null;
      }>();

      for (let i = 0; i < userIds.length; i += 250) {
        const chunk = userIds.slice(i, i + 250);
        const { data: profiles, error: profilesError } = await supabase
          .from("profile_stats")
          .select("user_id, username, display_name, is_paid, current_level")
          .in("user_id", chunk);

        if (profilesError) {
          console.error("[LOUIS_REPORT_LOG] Error loading profiles:", profilesError);
          continue;
        }

        for (const profile of profiles || []) {
          profileMap.set(profile.user_id, profile);
        }
      }

      const rows: LouisReportLogRow[] = ((messageRows || []) as Array<{
        id: string;
        user_id: string;
        title: string | null;
        created_at: string;
        consumed_at: string | null;
      }>).map((row) => {
        const profile = profileMap.get(row.user_id);
        return {
          id: row.id,
          userId: row.user_id,
          username: profile?.username || "Unknown User",
          displayName: profile?.display_name || profile?.username || "Unknown User",
          createdAt: row.created_at,
          consumedAt: row.consumed_at,
          isPaid: profile?.is_paid === true,
          currentLevel: profile?.current_level ?? null,
          title: row.title ?? null,
        };
      });

      setLouisReportLogRows(rows);
    } catch (error) {
      console.error("[LOUIS_REPORT_LOG] Unexpected error:", error);
      setLouisReportLogRows([]);
    }
    setLoadingLouisReportLog(false);
  }

  async function sendWeeklyReportsNow() {
    setSendingWeeklyReports(true);
    setWeeklyReportStatus(null);
    try {
      const response = await fetch("/api/admin/weekly-bible-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "send_now" }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || "Failed to send weekly reports.");
      }

      setWeeklyReportStatus(
        `Sent ${result.sent ?? 0} Louis weekly reports and skipped ${result.skipped ?? 0}.`,
      );
      await loadWeeklyReportCenter();
      await loadLouisReportLog();
    } catch (error) {
      console.error("[WEEKLY_REPORT_CENTER] Failed to send weekly reports:", error);
      setWeeklyReportStatus(error instanceof Error ? error.message : "Failed to send weekly reports.");
    } finally {
      setSendingWeeklyReports(false);
    }
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
      "guided_studies_viewed": "Bible Study Tools Views",
      "guided_study_tool_opened": "Bible Study Tool Opens",
      "devotionals_viewed": "Devotional Page Views",
      "devotional_opened": "Devotional Opens",
      "devotional_day_opened": "Devotional Day Opens",
      "devotional_bible_reading_opened": "Devotional Reading Opens",
      "devotional_reflection_saved": "Devotional Reflections",
      "reading_plans_viewed": "Reading Plan Views",
      "reading_plan_opened": "Reading Plan Opens",
      "reading_plan_day_opened": "Reading Plan Day Opens",
      "reading_plan_chapter_opened": "Reading Plan Chapter Opens",
      "bible_study_games_viewed": "Bible Study Games Views",
      "bible_game_opened": "Bible Game Opens",
      "trivia_hub_viewed": "Trivia Views",
      "trivia_category_opened": "Trivia Category Opens",
      "trivia_pack_opened": "Trivia Pack Opens",
      "scrambled_hub_viewed": "Scrambled Views",
      "scrambled_category_opened": "Scrambled Category Opens",
      "scrambled_books_viewed": "Scrambled Books Views",
      "scrambled_book_opened": "Scrambled Book Opens",
      "scrambled_book_viewed": "Scrambled Book Views",
      "scrambled_chapter_opened": "Scrambled Chapter Opens",
      "scrambled_chapter_completed": "Scrambled Chapter Finishes",
      "user_signup": "Signups",
      "user_upgraded": "Upgrades",
      "user_login": "Logins",
      "navigation_views": "Navigation Views",
      "navigation_clicks": "Navigation Clicks",
      "videos_watched": "Videos Watched",
      "daily_bible_tasks_completed": "Daily Bible Tasks Completed",
      "dashboard_viewed": "Dashboard Views",
      "dashboard_card_opened": "Dashboard Card Clicks",
      "invite_buddy_opened": "Invite a Bible Buddy Clicks",
      "bible_buddy_tv_viewed": "Bible Buddy TV Views",
      "bible_buddy_tv_title_opened": "Bible Buddy TV Title Opens",
      "bible_buddy_tv_video_started": "Bible Buddy TV Plays",
      "bible_reader_viewed": "Bible Reader Views",
      "bible_book_opened": "Bible Book Clicks",
      "bible_book_viewed": "Bible Book Views",
      "bible_chapter_opened": "Bible Chapter Clicks",
      "bible_chapter_viewed": "Bible Chapter Views",
      "chapter_completed": "Chapters Read",
      "book_completed": "Books Completed",
      "note_created": "Notes Created",
      "person_learned": "People Learned",
      "place_discovered": "Places Discovered",
      "keyword_mastered": "Keywords Understood",
      "devotional_day_completed": "Devotional Days Completed",
      "chapter_notes_reviewed": "Chapter Notes Reviewed",
      "trivia_chapter_completed": "Trivia Chapters Completed",
      "reading_plan_chapter_completed": "Reading Plan Chapters Completed",
      "scrambled_word_answered": "Scrambled Words Answered",
      "trivia_question_answered": "Trivia Questions Answered",
    };
    return nameMap[actionType] || actionType.replace(/_/g, " ");
  }

  function getFeatureFamily(actionType: string, actionLabel?: string | null): "bible" | "groups" | "tools" | "games" | "tv" | "invite" | "signup" | "login" | "default" {
    if (actionType === "dashboard_card_opened") {
      if (actionLabel === "The Bible") return "bible";
      if (actionLabel === "Bible Study Group") return "groups";
      if (actionLabel === "Bible Study Tools") return "tools";
      if (actionLabel === "Bible Buddy TV") return "tv";
      if (actionLabel === "Bible Study Games") return "games";
      if (actionLabel === "Invite a Bible Buddy") return "invite";
    }

    if (
      [
        "bible_reader_viewed",
        "bible_book_opened",
        "bible_book_viewed",
        "bible_chapter_opened",
        "bible_chapter_viewed",
        "chapter_completed",
        "book_completed",
        "verse_highlighted",
        "chapter_notes_viewed",
      ].includes(actionType)
    ) {
      return "bible";
    }

    if (
      [
        "bible_buddy_tv_viewed",
        "bible_buddy_tv_title_opened",
        "bible_buddy_tv_video_started",
      ].includes(actionType)
    ) {
      return "tv";
    }

    if (
      [
        "study_group_feed_viewed",
        "study_group_article_opened",
        "study_group_bible_study_card_opened",
        "feed_post_thought",
        "feed_post_prayer",
        "feed_post_prayer_request",
        "feed_post_photo",
        "feed_post_video",
        "feed_post_liked",
        "feed_post_commented",
        "feed_post_replied",
        "group_message_sent",
        "buddy_added",
        "series_week_started",
      ].includes(actionType)
    ) {
      return "groups";
    }

    if (
      [
        "guided_studies_viewed",
        "guided_study_tool_opened",
        "devotionals_viewed",
        "devotional_opened",
        "devotional_day_opened",
        "devotional_bible_reading_opened",
        "devotional_reflection_saved",
        "devotional_day_completed",
        "devotional_day_started",
        "devotional_day_viewed",
        "reading_plans_viewed",
        "reading_plan_opened",
        "reading_plan_day_opened",
        "reading_plan_chapter_opened",
        "reading_plan_chapter_completed",
        "keyword_viewed",
        "keyword_mastered",
        "person_viewed",
        "person_learned",
        "place_viewed",
        "place_discovered",
        "note_started",
        "note_created",
        "understand_verse_of_the_day",
      ].includes(actionType)
    ) {
      return "tools";
    }

    if (
      [
        "bible_study_games_viewed",
        "bible_game_opened",
        "trivia_hub_viewed",
        "trivia_category_opened",
        "trivia_pack_opened",
        "trivia_question_answered",
        "trivia_started",
        "scrambled_hub_viewed",
        "scrambled_category_opened",
        "scrambled_books_viewed",
        "scrambled_book_opened",
        "scrambled_book_viewed",
        "scrambled_chapter_opened",
        "scrambled_chapter_completed",
        "scrambled_word_answered",
      ].includes(actionType)
    ) {
      return "games";
    }

    if (actionType === "invite_buddy_opened") {
      return "invite";
    }

    if (actionType === "user_signup") {
      return "signup";
    }

    if (actionType === "user_login") {
      return "login";
    }

    return "default";
  }

  function getActionColorClass(actionType: string, actionLabel?: string | null): string {
    switch (getFeatureFamily(actionType, actionLabel)) {
      case "bible":
        return "bg-[#dbeafe] border-l-4 border-[#93c5fd]";
      case "groups":
        return "bg-[#d4ecd4] border-l-4 border-[#9ecf9e]";
      case "tools":
        return "bg-[#f6d6d9] border-l-4 border-[#e8aeb5]";
      case "games":
        return "bg-[#d1fae5] border-l-4 border-[#86efac]";
      case "tv":
        return "bg-[#eaf5fc] border-l-4 border-[#4B9CD3]";
      case "invite":
        return "bg-[#efe7ff] border-l-4 border-[#c4b5fd]";
      case "signup":
        return "bg-[#f3f4f6] border-l-4 border-[#9ca3af]";
      case "login":
        return "bg-white border-l-4 border-[#d1d5db]";
      default:
        return "bg-gray-50 border-l-4 border-gray-300";
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
        case "Videos Watched": return row.videosWatched;
        case "Chapters Read": return row.chaptersRead;
        case "Notes Created": return row.notesCreated;
        case "People Learned": return row.peopleLearned;
        case "Places Discovered": return row.placesDiscovered;
        case "Keywords Understood": return row.keywordsUnderstood;
        case "Devotional Days Completed": return row.devotionalDaysCompleted;
        case "Reading Plan Chapters Completed": return row.readingPlanChaptersCompleted;
        case "Scrambled Words Answered": return row.scrambledWordsAnswered;
        case "Trivia Questions Answered": return row.triviaQuestionsAnswered;
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
                onClick={() => {
                  setSelectedActionType(null);
                  setSelectedActionLabel(null);
                }}
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
                onClick={() => {
                  setSelectedActionType(null);
                  setSelectedActionLabel(null);
                }}
                isSelected={selectedActionType === null && selectedActionLabel === null}
              />
            </div>

            <div className="mb-6">
              <div className="mb-3">
                <h3 className="text-lg font-bold text-gray-900">Dashboard Card Clicks</h3>
                <p className="text-sm text-gray-500">How many times each dashboard card was opened in this time frame.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {dashboardCardBreakdown.map((card) => {
                  const actionType = card.label === "Share Bible Buddy" ? "invite_buddy_opened" : "dashboard_card_opened";
                  const actionLabel = card.label === "Share Bible Buddy" ? null : card.label;
                  const isSelected = selectedActionType === actionType && selectedActionLabel === actionLabel;

                  return (
                    <OverviewCard
                      key={card.label}
                      label={card.label}
                      value={card.value}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedActionType(null);
                          setSelectedActionLabel(null);
                          return;
                        }
                        setSelectedActionType(actionType);
                        setSelectedActionLabel(actionLabel);
                      }}
                      isSelected={isSelected}
                    />
                  );
                })}
              </div>
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
                label="Daily Bible Tasks Completed"
                value={overviewMetrics.dailyBibleTasksCompleted}
                onClick={() => setSelectedActionType(selectedActionType === "daily_bible_tasks_completed" ? null : "daily_bible_tasks_completed")}
                isSelected={selectedActionType === "daily_bible_tasks_completed"}
              />
              <OverviewCard
                label="Reading Plan Chapters Completed"
                value={overviewMetrics.readingPlanChaptersCompleted}
                onClick={() => setSelectedActionType(selectedActionType === "reading_plan_chapter_completed" ? null : "reading_plan_chapter_completed")}
                isSelected={selectedActionType === "reading_plan_chapter_completed"}
              />
              <OverviewCard
                label="Scrambled Words Answered"
                value={overviewMetrics.scrambledWordsAnswered}
                onClick={() => setSelectedActionType(selectedActionType === "scrambled_word_answered" ? null : "scrambled_word_answered")}
                isSelected={selectedActionType === "scrambled_word_answered"}
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
              <OverviewCard
                label="Videos Watched"
                value={overviewMetrics.videosWatched}
                onClick={() => setSelectedActionType(selectedActionType === "videos_watched" ? null : "videos_watched")}
                isSelected={selectedActionType === "videos_watched"}
              />
            </div>

          </>
        )}
      </div>

      {/* ── RETENTION & ENGAGEMENT ─────────────────────────────────────────── */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Bible Buddy TV Analytics</h2>
          <p className="text-sm text-gray-500">
            Track who watched videos in this time frame, how many minutes were played, and which titles are getting the most traction.
          </p>
        </div>

        {videoAnalyticsError && (
          <p className="mb-3 text-sm text-red-600">{videoAnalyticsError}</p>
        )}

        {loadingVideoAnalytics ? (
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-500">Loading video analytics...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 mb-6">
              <OverviewCard label="Minutes Played" value={videoAnalytics.totalMinutesPlayed} />
              <OverviewCard label="Unique Viewers" value={videoAnalytics.uniqueViewers} />
              <OverviewCard label="Videos Started" value={videoAnalytics.videosStarted} />
              <OverviewCard label="Videos Completed" value={videoAnalytics.videosCompleted} />
              <OverviewCard label="Avg Watch %" value={videoAnalytics.averageWatchPercent} />
            </div>

            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Top Videos</h3>
                  <p className="text-sm text-gray-500">
                    Which videos were watched, how many users watched them, and how far people got.
                  </p>
                </div>
              </div>

              {videoAnalytics.topVideos.length === 0 ? (
                <div className="p-5 text-sm text-gray-500">No video activity in this time frame yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-white text-left text-xs uppercase tracking-wide text-gray-500">
                      <tr>
                        <th className="px-4 py-3">Video</th>
                        <th className="px-4 py-3">Series</th>
                        <th className="px-4 py-3">Users</th>
                        <th className="px-4 py-3">Starts</th>
                        <th className="px-4 py-3">Completed</th>
                        <th className="px-4 py-3">Minutes</th>
                        <th className="px-4 py-3">Avg Watched</th>
                        <th className="px-4 py-3">Last Seen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {videoAnalytics.topVideos.map((video) => (
                        <tr key={video.videoId} className="border-t border-gray-100">
                          <td className="px-4 py-3 font-medium text-gray-900">{video.episodeTitle}</td>
                          <td className="px-4 py-3 text-gray-600">{video.seriesTitle}</td>
                          <td className="px-4 py-3 text-gray-700">{video.viewers}</td>
                          <td className="px-4 py-3 text-gray-700">{video.started}</td>
                          <td className="px-4 py-3 text-gray-700">{video.completed}</td>
                          <td className="px-4 py-3 text-gray-700">{video.minutesPlayed}</td>
                          <td className="px-4 py-3 text-gray-700">{video.averageWatchPercent}%</td>
                          <td className="px-4 py-3 text-gray-500">
                            {video.lastWatchedAt
                              ? `${formatAdminActionDate(new Date(video.lastWatchedAt))} ${formatAdminActionTime(new Date(video.lastWatchedAt))}`
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* MAIN SECTION SELECTOR (Dropdown/Tabs) */}
      <div className="mt-12 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            {activeSection === "actions" && "Action Log (All Users)"}
            {activeSection === "stats" && "Stats Log"}
            {activeSection === "inbox" && "Inbox"}
            {activeSection === "messages" && "Message Center"}
          </h2>
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 text-sm">
            {[
              { key: "actions", label: "Actions" },
              { key: "stats", label: "Stats Log" },
              { key: "inbox", label: "Inbox" },
              { key: "messages", label: "Messages" },
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setActiveSection(option.key as "actions" | "stats" | "inbox" | "messages")}
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
            {(selectedActionType || selectedActionLabel) && (
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Showing only: <span className="font-semibold">{selectedActionLabel || formatActionTypeName(selectedActionType!)}</span>
                </p>
                <button
                  onClick={() => {
                    setSelectedActionType(null);
                    setSelectedActionLabel(null);
                  }}
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
                        className={`flex items-start justify-between mb-2 p-3 rounded ${getActionColorClass(action.actionType, action.actionLabel)}`}
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
                    "Videos Watched",
                    "Chapters Read",
                    "Notes Created",
                    "People Learned",
                    "Places Discovered",
                    "Keywords Understood",
                    "Devotional Days Completed",
                    "Reading Plan Chapters Completed",
                    "Scrambled Words Answered",
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
                            case "Videos Watched":
                              return row.videosWatched;
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
                            case "Scrambled Words Answered":
                              return row.scrambledWordsAnswered;
                            case "Trivia Questions Answered":
                              return row.triviaQuestionsAnswered;
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

        {activeSection === "messages" && (
          <>
            {loadingWeeklyReportCenter ? (
              <div className="bg-white p-4 rounded-xl shadow">
                <p className="text-gray-500 text-sm">Loading weekly message center...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <OverviewCard label="Active Users 7d" value={weeklyReportSummary.activeUsers7d} />
                  <OverviewCard label="Reports Sent" value={weeklyReportSummary.sentThisWeek} />
                  <OverviewCard label="Not Sent Yet" value={weeklyReportSummary.unsentThisWeek} />
                  <OverviewCard label="Actions 7d" value={weeklyReportSummary.totalActions7d} />
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Weekly Bible Report</h3>
                      <p className="text-sm text-gray-500">
                        Every Thursday around 6:30 PM, active users from the last 7 days get their weekly Bible report inside Little Louis chat.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => sendWeeklyReportsNow()}
                        disabled={sendingWeeklyReports}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {sendingWeeklyReports ? "Sending..." : "Send Thursday Report Now"}
                      </button>
                      <button
                        onClick={() => loadWeeklyReportCenter()}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Refresh
                      </button>
                    </div>
                  </div>

                  {weeklyReportStatus && (
                    <div className="border-b border-gray-100 bg-blue-50 px-5 py-3 text-sm text-blue-800">
                      {weeklyReportStatus}
                    </div>
                  )}

                  {weeklyReportRows.length === 0 ? (
                    <div className="p-5 text-sm text-gray-500">No weekly report data found.</div>
                  ) : (
                    <div className="max-h-[34rem] overflow-auto">
                      <table className="min-w-full text-sm">
                        <thead className="sticky top-0 bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                          <tr>
                            <th className="px-4 py-3">User</th>
                            <th className="px-4 py-3">Actions 7d</th>
                            <th className="px-4 py-3">Last Action</th>
                            <th className="px-4 py-3">Level</th>
                            <th className="px-4 py-3">Plan</th>
                            <th className="px-4 py-3">Louis Report</th>
                          </tr>
                        </thead>
                        <tbody>
                          {weeklyReportRows.map((row) => (
                            <tr key={row.userId} className="border-t border-gray-100 hover:bg-gray-50">
                              <td className="px-4 py-3 align-top">
                                <div className="font-semibold text-gray-900">{row.displayName}</div>
                                <div className="text-xs text-gray-500">@{row.username}</div>
                                <a href={`/profile/${row.userId}`} className="text-xs font-semibold text-blue-600 hover:underline">
                                  View profile →
                                </a>
                              </td>
                              <td className="px-4 py-3 align-top font-semibold text-gray-900">{row.totalActions}</td>
                              <td className="px-4 py-3 align-top text-gray-700">
                                {formatAdminActionDate(new Date(row.lastActionAt))} at {formatAdminActionTime(new Date(row.lastActionAt))}
                              </td>
                              <td className="px-4 py-3 align-top text-gray-700">{row.currentLevel ?? "—"}</td>
                              <td className="px-4 py-3 align-top">
                                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                  row.isPaid ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-700"
                                }`}>
                                  {row.isPaid ? "Pro Buddy" : "Free"}
                                </span>
                              </td>
                              <td className="px-4 py-3 align-top">
                                {row.sentAt ? (
                                  <div>
                                    <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
                                      Sent in Louis
                                    </span>
                                    <div className="mt-1 text-xs text-gray-500">
                                      {formatAdminActionDate(new Date(row.sentAt))} at {formatAdminActionTime(new Date(row.sentAt))}
                                    </div>
                                  </div>
                                ) : (
                                  <span className="inline-flex rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-semibold text-yellow-800">
                                    Waiting for Thursday
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
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

      {/* LITTLE LOUIS WEEKLY REPORT LOG */}
      <div className="mt-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-blue-50">
            <div>
              <span className="text-xl font-bold text-blue-900">Little Louis Weekly Report Log</span>
              <p className="text-xs text-blue-700 mt-1">
                Shows who got the weekly Louis report and whether they opened Louis and consumed it.
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                Louis replies are not fully tracked server-side yet, so this shows sent and opened status for now.
              </p>
            </div>
            <button
              type="button"
              onClick={() => loadLouisReportLog()}
              className="text-xs text-blue-700 hover:text-blue-900 font-semibold transition"
            >
              Refresh
            </button>
          </div>

          {loadingLouisReportLog ? (
            <p className="text-sm text-gray-400 px-5 py-4">Loading...</p>
          ) : louisReportLogRows.length === 0 ? (
            <p className="text-sm text-gray-400 px-5 py-4">No Louis weekly report messages found yet.</p>
          ) : (
            <div className="max-h-[32rem] overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Report</th>
                    <th className="px-4 py-3">Sent</th>
                    <th className="px-4 py-3">Opened</th>
                    <th className="px-4 py-3">Level</th>
                    <th className="px-4 py-3">Plan</th>
                  </tr>
                </thead>
                <tbody>
                  {louisReportLogRows.map((row) => (
                    <tr key={row.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 align-top">
                        <div className="font-semibold text-gray-900">{row.displayName}</div>
                        <div className="text-xs text-gray-500">@{row.username}</div>
                        <a href={`/profile/${row.userId}`} className="text-xs font-semibold text-blue-600 hover:underline">
                          View profile →
                        </a>
                      </td>
                      <td className="px-4 py-3 align-top text-gray-700">{row.title || "Weekly Bible Report"}</td>
                      <td className="px-4 py-3 align-top text-gray-700">
                        {formatAdminActionDate(new Date(row.createdAt))} at {formatAdminActionTime(new Date(row.createdAt))}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {row.consumedAt ? (
                          <div>
                            <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
                              Opened in Louis
                            </span>
                            <div className="mt-1 text-xs text-gray-500">
                              {formatAdminActionDate(new Date(row.consumedAt))} at {formatAdminActionTime(new Date(row.consumedAt))}
                            </div>
                          </div>
                        ) : (
                          <span className="inline-flex rounded-full bg-yellow-100 px-2.5 py-1 text-xs font-semibold text-yellow-800">
                            Not opened yet
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top text-gray-700">{row.currentLevel ?? "—"}</td>
                      <td className="px-4 py-3 align-top">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          row.isPaid ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-700"
                        }`}>
                          {row.isPaid ? "Pro Buddy" : "Free"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  <div className="bg-lime-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Daily Bible Tasks Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.dailyBibleTasksCompleted.toLocaleString()}</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Reading Plan Chapters Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.readingPlanChaptersCompleted.toLocaleString()}</p>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Trivia Questions Answered</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.triviaQuestionsAnswered.toLocaleString()}</p>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Scrambled Words Answered</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedStatsRow.scrambledWordsAnswered.toLocaleString()}</p>
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
      case "Devotional Days Completed":
        return "bg-violet-100 border border-violet-200";
      case "Daily Bible Tasks Completed":
        return "bg-lime-100 border border-lime-200";
      case "Reading Plan Chapters Completed":
        return "bg-orange-100 border border-orange-200";
      case "Scrambled Words Answered":
        return "bg-emerald-100 border border-emerald-200";
      case "Trivia Questions Answered":
        return "bg-rose-100 border border-rose-200";
      case "Understand This Verse Clicks":
        return "bg-teal-100 border border-teal-200";
      case "Videos Watched":
        return "bg-blue-100 border border-blue-200";
      case "Minutes Played":
        return "bg-sky-100 border border-sky-200";
      case "Unique Viewers":
        return "bg-indigo-100 border border-indigo-200";
      case "Videos Started":
        return "bg-violet-100 border border-violet-200";
      case "Videos Completed":
        return "bg-emerald-100 border border-emerald-200";
      case "Avg Watch %":
        return "bg-amber-100 border border-amber-200";
      case "The Bible":
        return "bg-blue-100 border border-blue-200";
      case "Bible Study Group":
        return "bg-green-100 border border-green-200";
      case "Bible Study Tools":
        return "bg-rose-100 border border-rose-200";
      case "Bible Buddy TV":
        return "bg-violet-100 border border-violet-200";
      case "Bible Study Games":
        return "bg-cyan-100 border border-cyan-200";
      case "Share Bible Buddy":
        return "bg-gray-100 border border-gray-200";
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

