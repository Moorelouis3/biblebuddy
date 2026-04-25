"use client";

import Link from "next/link";
import React from "react";
import { LouisAvatar } from "./LouisAvatar";

interface DashboardCardsProps {
  profile: {
    is_paid?: boolean | null;
    daily_credits?: number | null;
    profile_image_url?: string | null;
    display_name?: string | null;
    username?: string | null;
  } | null;
  membershipStatus: string;
  daysRemaining: number | null;
  isLoadingDailyTasks: boolean;
  dailyTaskCompletedCount: number;
  dailyTaskTotalCount: number;
  dailyTaskNextTitle: string | null;
  dailyTaskSummaryLine: string | null;
  dailyTaskTimeLeftLabel?: string | null;
  handleCardClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, card: string, href: string) => void;
  onOpenDailyTasks: () => void;
  onInviteBuddy: () => void;
  dashboardTourSpotlight?: "overview" | "level" | "recommendation" | "bible" | "group" | "tools" | "games" | "invite" | null;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({
  profile,
  membershipStatus,
  daysRemaining,
  isLoadingDailyTasks,
  dailyTaskCompletedCount,
  dailyTaskTotalCount,
  dailyTaskNextTitle,
  dailyTaskSummaryLine,
  dailyTaskTimeLeftLabel,
  handleCardClick,
  onOpenDailyTasks,
  onInviteBuddy,
  dashboardTourSpotlight = null,
}) => {
  const showFreeUpgradeCard = membershipStatus !== "pro" && profile?.is_paid !== true;
  const safeDailyTaskTotal = Math.max(5, dailyTaskTotalCount || 5);
  const dailyTaskProgressPercent = Math.max(
    0,
    Math.min(100, Math.round((dailyTaskCompletedCount / safeDailyTaskTotal) * 100)),
  );
  const allDailyTasksDone = dailyTaskCompletedCount >= safeDailyTaskTotal;

  const cardShellTheme = {
    outer: "border-[#ecd8b2] bg-gradient-to-br from-[#fff6e8] via-[#fffaf2] to-[#fff2db]",
  };

  function getSpotlightClasses(target: DashboardCardsProps["dashboardTourSpotlight"]) {
    if (!dashboardTourSpotlight) return "";
    if (dashboardTourSpotlight === "overview" && target !== "overview") return "";
    if ((dashboardTourSpotlight === "level" || dashboardTourSpotlight === "recommendation") && target === "overview") {
      return "";
    }
    return dashboardTourSpotlight === target
      ? "relative z-10 opacity-100 ring-[6px] ring-white ring-offset-4 ring-offset-[#9ebcee] shadow-[0_24px_70px_rgba(32,81,154,0.32)] scale-[1.03] brightness-[1.04] saturate-110"
      : "opacity-50 saturate-90";
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        data-dashboard-tour="overview"
        className={`overflow-hidden rounded-[26px] border shadow-sm transition duration-300 ${cardShellTheme.outer} ${getSpotlightClasses("overview")}`}
      >
        <button
          type="button"
          onClick={onOpenDailyTasks}
          data-dashboard-tour="level"
          className={`block w-full px-4 py-3.5 text-left transition duration-300 md:px-5 md:py-4 ${getSpotlightClasses("level")}`}
        >
          {isLoadingDailyTasks ? (
            <>
              <div className="mb-2 flex items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-900">Daily Task</h2>
                <div className="flex h-6 items-center gap-1">
                  <span className="animate-[bounce_1.4s_ease-in-out_infinite] text-2xl text-gray-500">.</span>
                  <span className="animate-[bounce_1.4s_ease-in-out_0.2s_infinite] text-2xl text-gray-500">.</span>
                  <span className="animate-[bounce_1.4s_ease-in-out_0.4s_infinite] text-2xl text-gray-500">.</span>
                </div>
              </div>
              <div className="mb-3 h-3 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-1/3 animate-pulse rounded-full bg-[#9dc1ee]" />
              </div>
              <div className="h-4 w-48 rounded bg-gray-200" />
            </>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                {allDailyTasksDone ? (
                  <div className="rounded-[22px] border border-[#f0d58a] bg-[linear-gradient(135deg,#fff7df_0%,#fffaf0_55%,#fff1c9_100%)] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full border border-white/90 bg-white/85 p-1.5 shadow-sm">
                        <LouisAvatar mood="stareyes" size={48} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b37a12]">
                          Daily Bible Tasks
                        </p>
                        <h2 className="mt-1 text-base font-bold leading-tight text-gray-950 sm:text-lg">
                          You have finished all of today&apos;s Bible tasks
                        </h2>
                      </div>
                    </div>
                    <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/70">
                      <div className="h-full w-full animate-[pulse_2s_ease-in-out_infinite] rounded-full bg-[#9fce85]" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-[#7a5a1b]">
                      Your next daily tasks start in {dailyTaskTimeLeftLabel || "24h 0m"}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="pr-2 text-[0.95rem] font-semibold leading-tight text-gray-950 sm:text-[1.1rem]">
                          Daily Task
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                          {dailyTaskNextTitle ? `Next: ${dailyTaskNextTitle}` : "Tap to view your daily Bible checklist."}
                        </p>
                      </div>
                      <div className="shrink-0 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#9b6a21] shadow-sm">
                        {dailyTaskCompletedCount}/{safeDailyTaskTotal}
                      </div>
                    </div>
                    <div className="mt-3 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-2.5 rounded-full bg-[#d8aa57] transition-all duration-300"
                        style={{ width: `${dailyTaskProgressPercent}%` }}
                      />
                    </div>
                    <div className="mt-2.5 text-[13px] sm:text-sm">
                      <p className="min-w-0 font-medium text-gray-600">
                        {dailyTaskSummaryLine || `${dailyTaskCompletedCount} out of ${safeDailyTaskTotal} daily tasks done`}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </button>
      </div>

      {showFreeUpgradeCard ? (
        <Link href="/upgrade">
          <div className="relative cursor-pointer rounded-2xl border border-[#f0d7b3] bg-[#fff8ef] px-4 py-3 shadow-sm transition hover:scale-[1.01] hover:shadow-md">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#b7791f]" aria-hidden="true">
              ↑
            </span>
            <div className="flex items-center gap-3 pr-7">
              <div className="text-xl leading-none">👑</div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#8a4b14]">Go Deeper With Pro</p>
                <p className="text-xs leading-relaxed text-gray-600">
                  Unlock the full devotional library and remove the daily credit wall.
                </p>
              </div>
            </div>
          </div>
        </Link>
      ) : null}

      {membershipStatus === "pro" && daysRemaining !== null && daysRemaining > 0 ? (
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 shadow-sm">
          <p className="text-sm font-medium text-blue-800">
            Pro expires in {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
          </p>
        </div>
      ) : null}

      <Link href="/reading" onClick={(event) => handleCardClick(event, "bible", "/reading")}>
        <div
          data-dashboard-tour="bible"
          className={`cursor-pointer rounded-xl border border-blue-200 bg-blue-100 p-5 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md ${getSpotlightClasses("bible")}`}
        >
          <h2 className="text-xl font-semibold">📖 The Bible</h2>
          <p className="mt-1 text-gray-700">Read the complete Bible here</p>
        </div>
      </Link>

      <Link href="/study-groups" onClick={(event) => handleCardClick(event, "bible_study_hub", "/study-groups")}>
        <div
          data-dashboard-tour="group"
          className={`cursor-pointer rounded-xl p-5 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md ${getSpotlightClasses("group")}`}
          style={{ backgroundColor: "#d4ecd4", borderWidth: 1, borderColor: "#b8ddb8" }}
        >
          <h2 className="text-xl font-semibold">👥 Bible Study Group</h2>
          <p className="mt-1 text-gray-700">Study the Bible with us</p>
        </div>
      </Link>

      <Link href="/guided-studies" onClick={(event) => handleCardClick(event, "guided_studies", "/guided-studies")}>
        <div
          data-dashboard-tour="tools"
          className={`cursor-pointer rounded-xl border border-[#e8aeb5] bg-[#f6d6d9] p-5 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md ${getSpotlightClasses("tools")}`}
        >
          <h2 className="text-xl font-semibold text-gray-900">🛠 Bible Study Tools</h2>
          <p className="mt-1 text-gray-700">A collection of Bible study tools</p>
        </div>
      </Link>

      <Link href="/biblebuddy-tv" onClick={(event) => handleCardClick(event, "bible_buddy_tv", "/biblebuddy-tv")}>
        <div className="cursor-pointer rounded-xl border border-violet-200 bg-[#efe7ff] p-5 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md">
          <h2 className="text-xl font-semibold text-gray-900">📺 Bible Buddy TV</h2>
          <p className="mt-1 text-gray-700">Stream Bible shows, movies, sermons, and more</p>
        </div>
      </Link>

      <Link href="/bible-study-games" onClick={(event) => handleCardClick(event, "bible_trivia", "/bible-study-games")}>
        <div
          data-dashboard-tour="games"
          className={`cursor-pointer rounded-xl border border-emerald-200 bg-emerald-100 p-5 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md ${getSpotlightClasses("games")}`}
        >
          <h2 className="text-xl font-semibold">🎮 Bible Study Games</h2>
          <p className="mt-1 text-gray-700">Play our Bible-based games</p>
        </div>
      </Link>

      <button
        type="button"
        onClick={onInviteBuddy}
        data-dashboard-tour="invite"
        className={`relative w-full cursor-pointer rounded-xl border border-gray-300 bg-gray-100 p-5 text-left shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md ${getSpotlightClasses("invite")}`}
      >
        <span className="absolute right-4 top-4 text-base text-gray-500" aria-hidden="true">
          ↗
        </span>
        <h2 className="text-xl font-semibold text-gray-900">↗ Share Bible Buddy</h2>
        <p className="mt-1 text-gray-700">Share by text, WhatsApp, or copy link.</p>
      </button>
    </div>
  );
};

export default DashboardCards;
