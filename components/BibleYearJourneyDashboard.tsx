"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardJourneyExperience from "./DashboardJourneyExperience";
import { reconcileInstallPromptState } from "./HomeInstallBanner";
import AppLoadingScreen from "./AppLoadingScreen";
import { fetchLouisDailyChecklistData, type ChecklistData, type TaskState } from "./LouisDailyTasksModal";
import { normalizeStudyMode } from "../lib/studyMode";
import { supabase } from "../lib/supabaseClient";

type DashboardProfile = {
  is_paid: boolean | null;
  daily_credits: number | null;
  last_active_date: string | null;
  verse_of_the_day_shown?: string | null;
  current_streak?: number | null;
  selected_streak_flame?: string | null;
  selected_buddy_avatar?: string | null;
  diamonds_count?: number | null;
  profile_image_url?: string | null;
  display_name?: string | null;
  username?: string | null;
  created_at?: string | null;
  bible_year_started_at?: string | null;
  bible_year_plan_reset_at?: string | null;
  preferred_study_mode?: string | null;
};

/** The profile_stats columns this dashboard actually reads. */
type ProfileStatsRow = DashboardProfile & {
  install_prompt_state?: string | null;
};

const bibleYearChecklistData: ChecklistData = {
  title: "Bible in One Year",
  streakLine: "",
  contextLine: "",
  timeLeftLabel: "",
  progressLabel: "Bible in One Year",
  summaryLine: "Continue your Bible in One Year journey.",
  bonusLine: "",
  nextTaskTitle: null,
  tasks: [],
  completedCount: 0,
  allDone: false,
  bonusAwarded: false,
  journeyKey: "bible-in-one-year",
  nextJourneyTarget: null,
};

function waitForSessionRefresh(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function DashboardLoadingShell() {
  return <AppLoadingScreen />;
}

async function getStableDashboardUser() {
  const { data: sessionData } = await supabase.auth.getSession();
  if (sessionData.session?.user) {
    return sessionData.session.user;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return user;
  }

  await waitForSessionRefresh(400);
  const { data: retrySessionData } = await supabase.auth.getSession();
  return retrySessionData.session?.user ?? null;
}

export default function BibleYearJourneyDashboard() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState("Bible Buddy");
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [loading, setLoading] = useState(true);
  // The real devotional checklist - the same data the devotional detail page
  // shows. Bible in One Year builds its own tasks from the year plan, so it
  // keeps using the empty placeholder below and is untouched by this.
  const [devotionalChecklist, setDevotionalChecklist] = useState<ChecklistData | null>(null);
  const [isLoadingDevotionalChecklist, setIsLoadingDevotionalChecklist] = useState(false);
  // Bumped whenever the current day changes, to force the checklist to refetch.
  const [devotionalRefreshNonce, setDevotionalRefreshNonce] = useState(0);
  // Stable per-day key for the daily task cycle. Shared by the checklist fetch
  // and the dashboard, which needs it to remember the next chapter when you
  // press Continue.
  const dashboardCycleStartedAt = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [isOwnerDashboard, setIsOwnerDashboard] = useState(false);

  const loadDashboardUser = useCallback(async () => {
    const user = await getStableDashboardUser();

    if (!user) {
      router.replace("/");
      return;
    }

    setIsOwnerDashboard((user.email || "").toLowerCase() === "moorelouis3@gmail.com");
    const metadata = user.user_metadata || {};
    const fallbackName =
      metadata.firstName ||
      metadata.first_name ||
      metadata.full_name ||
      metadata.name ||
      (user.email ? user.email.split("@")[0] : "Bible Buddy");

    setUserId(user.id);
    setUserName(String(fallbackName || "Bible Buddy"));
    setProfile((current) => current || {
      is_paid: false,
      daily_credits: null,
      last_active_date: null,
      verse_of_the_day_shown: null,
      current_streak: 0,
      selected_streak_flame: null,
      selected_buddy_avatar: null,
      diamonds_count: null,
      profile_image_url: null,
      display_name: null,
      username: null,
      created_at: null,
      bible_year_started_at: null,
      bible_year_plan_reset_at: null,
      // Deliberately unknown until the real row loads. Claiming "bible_year"
      // here made the dashboard stamp ?view=bible-year into the URL before the
      // real mode arrived, which then locked the reader into the wrong middle.
      preferred_study_mode: null,
    });

    void (async () => {
      let data: ProfileStatsRow | null = null;
      try {
        const result = await supabase
          .from("profile_stats")
          .select(
            "is_paid,daily_credits,last_active_date,verse_of_the_day_shown,current_streak,selected_streak_flame,selected_buddy_avatar,profile_image_url,display_name,username,created_at,bible_year_started_at,bible_year_plan_reset_at,preferred_study_mode,install_prompt_state,install_prompt_last_shown",
          )
          .eq("user_id", user.id)
          .maybeSingle();
        data = (result.data as ProfileStatsRow | null) ?? null;
      } catch (error) {
        // Never strand someone on the loading screen because their profile row
        // could not be read. They fall back to Bible in One Year below.
        console.error("[DASHBOARD] Could not load profile stats:", error);
      }

      const displayName = data?.display_name || data?.username || fallbackName || "Bible Buddy";
      setUserName(String(displayName));
      setProfile({
        is_paid: data?.is_paid ?? false,
        daily_credits: data?.daily_credits ?? null,
        last_active_date: data?.last_active_date ?? null,
        verse_of_the_day_shown: data?.verse_of_the_day_shown ?? null,
        current_streak: data?.current_streak ?? 0,
        selected_streak_flame: data?.selected_streak_flame ?? null,
        selected_buddy_avatar: data?.selected_buddy_avatar ?? null,
        diamonds_count: null,
        profile_image_url: data?.profile_image_url ?? null,
        display_name: data?.display_name ?? null,
        username: data?.username ?? null,
        created_at: data?.created_at ?? null,
        bible_year_started_at: data?.bible_year_started_at ?? null,
        bible_year_plan_reset_at: data?.bible_year_plan_reset_at ?? null,
        // Was hardcoded to "bible_year" here, and the column was not even in
        // the select above - so every reader looked like a Bible in One Year
        // reader to the dashboard, whatever they picked at /start.
        preferred_study_mode: data?.preferred_study_mode ?? "bible_year",
      });
      reconcileInstallPromptState(
        (data as { install_prompt_state?: string | null } | null)?.install_prompt_state ?? null,
      );
      // Only now. The dashboard decides which of the three middles to show from
      // preferred_study_mode, so mounting it before this row lands made it
      // guess "Bible in One Year" and write that guess into the URL.
      setLoading(false);
    })();
  }, [router]);

  useEffect(() => {
    void loadDashboardUser();
  }, [loadDashboardUser]);

  // Load the devotional the reader actually picked, so the dashboard shows
  // their real day and its tasks instead of an empty "Choose Your Bible Study".
  useEffect(() => {
    const mode = normalizeStudyMode(profile?.preferred_study_mode);
    if (!userId || !profile?.preferred_study_mode || mode === "bible_year") {
      setDevotionalChecklist(null);
      return;
    }

    let cancelled = false;
    setIsLoadingDevotionalChecklist(true);

    void (async () => {
      try {
        const data = await fetchLouisDailyChecklistData(
          userId,
          profile.current_streak ?? 0,
          dashboardCycleStartedAt,
        );
        if (!cancelled) setDevotionalChecklist(data);
      } catch (error) {
        console.error("[DASHBOARD] Could not load the devotional checklist:", error);
        if (!cancelled) setDevotionalChecklist(null);
      } finally {
        if (!cancelled) setIsLoadingDevotionalChecklist(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId, profile?.preferred_study_mode, profile?.current_streak, devotionalRefreshNonce]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("bb:dashboard-loader-state", {
        detail: { loading },
      }),
    );
  }, [loading]);

  if (loading || !userId) {
    return <DashboardLoadingShell />;
  }

  return (
    <main className="min-h-screen pb-10 text-[#111827]">
      <div className="mx-auto w-full max-w-3xl px-3 py-4 sm:px-4">
        <DashboardJourneyExperience
          key="bible-year-journey-dashboard"
          userId={userId}
          userName={userName}
          profile={profile}
          levelInfo={null}
          primaryRecommendation={null}
          checklistData={devotionalChecklist ?? bibleYearChecklistData}
          isLoadingChecklist={isLoadingDevotionalChecklist}
          dailyTaskTimeLeftLabel={null}
          membershipStatus={profile?.is_paid ? "pro" : "free"}
          daysRemaining={null}
          exploreLinks={[]}
          onOpenLevelInfo={() => {}}
          onOpenStreakInfo={() => {}}
          onOpenDailyTasks={() => {}}
          onTaskClick={() => {}}
          activeTask={null as TaskState | null}
          onActiveTaskClose={() => {}}
          onActiveTaskProgressUpdated={() => {}}
          // Was null, which silently disabled the Continue button on the
          // "You completed <chapter>" panel - both branches of
          // handleCompletedStudyAction require it - so finishing a chapter
          // trapped you on that panel with no way forward.
          cycleStartedAt={dashboardCycleStartedAt}
          suppressCompletedTasksPanel
          onHomeReset={() => {}}
          onOpenStore={() => {}}
          onDashboardPageChange={() => {}}
          onDevotionalChanged={() => {
            void loadDashboardUser();
            // Reloading the profile is not enough: the checklist effect keys off
            // the study mode and streak, which do not change when you move to
            // the next day, so it never refetched and the dashboard stayed on
            // the old day. This forces it.
            setDevotionalRefreshNonce((value) => value + 1);
          }}
          isOwnerDashboard={isOwnerDashboard}
          bibleYearReport={null}
          bibleYearProgressReady
        />
      </div>
    </main>
  );
}
