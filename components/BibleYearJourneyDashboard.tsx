"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import DashboardJourneyExperience from "./DashboardJourneyExperience";
import type { ChecklistData, TaskState } from "./LouisDailyTasksModal";
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
  preferred_study_mode?: string | null;
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

function DashboardLoadingShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen px-4 py-8 text-[#111827]">
      <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center">
        <div className="rounded-[24px] border border-[#e5dfd2] bg-white px-6 py-5 text-center shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
          {children}
        </div>
      </div>
    </main>
  );
}

export default function BibleYearJourneyDashboard() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState("Bible Buddy");
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadDashboardUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/");
      return;
    }

    const metadata = user.user_metadata || {};
    const fallbackName =
      metadata.firstName ||
      metadata.first_name ||
      metadata.full_name ||
      metadata.name ||
      (user.email ? user.email.split("@")[0] : "Bible Buddy");

    setUserId(user.id);
    setUserName(String(fallbackName || "Bible Buddy"));

    const { data } = await supabase
      .from("profile_stats")
      .select(
        "is_paid,daily_credits,last_active_date,verse_of_the_day_shown,current_streak,selected_streak_flame,selected_buddy_avatar,profile_image_url,display_name,username,created_at",
      )
      .eq("user_id", user.id)
      .maybeSingle();

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
      preferred_study_mode: "bible_year",
    });
    setLoading(false);
  }, [router]);

  useEffect(() => {
    void loadDashboardUser();
  }, [loadDashboardUser]);

  if (loading) {
    return (
      <DashboardLoadingShell>
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2f7fe8]">Bible in One Year</p>
        <p className="mt-2 text-lg font-black">Preparing your Journey Dashboard...</p>
      </DashboardLoadingShell>
    );
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
          checklistData={bibleYearChecklistData}
          isLoadingChecklist={false}
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
          cycleStartedAt={null}
          suppressCompletedTasksPanel
          onHomeReset={() => {}}
          onOpenStore={() => {}}
          onDashboardPageChange={() => {}}
          onDevotionalChanged={() => {
            void loadDashboardUser();
          }}
          isOwnerDashboard
          bibleYearReport={null}
          bibleYearProgressReady
        />
      </div>
    </main>
  );
}
