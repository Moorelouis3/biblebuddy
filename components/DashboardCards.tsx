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

  function getSpotlightClasses(target: DashboardCardsProps["dashboardTourSpotlight"]) {
    if (!dashboardTourSpotlight) return "";
    if (dashboardTourSpotlight === "overview" && target !== "overview") return "";
    if ((dashboardTourSpotlight === "level" || dashboardTourSpotlight === "recommendation") && target === "overview") {
      return "";
    }
    return dashboardTourSpotlight === target
      ? "relative z-10 opacity-100 ring-[6px] ring-[var(--bb-surface)] ring-offset-4 ring-offset-[var(--bb-accent)] shadow-[0_24px_70px_rgba(32,81,154,0.32)] scale-[1.03] brightness-[1.04] saturate-110"
      : "opacity-50 saturate-90";
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        data-dashboard-tour="overview"
        className={`bb-card overflow-hidden rounded-[26px] border shadow-sm transition duration-300 ${getSpotlightClasses("overview")}`}
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
                <h2 className="bb-text-primary text-xl font-semibold">Daily Task</h2>
                <div className="flex h-6 items-center gap-1">
                  <span className="bb-text-muted animate-[bounce_1.4s_ease-in-out_infinite] text-2xl">.</span>
                  <span className="bb-text-muted animate-[bounce_1.4s_ease-in-out_0.2s_infinite] text-2xl">.</span>
                  <span className="bb-text-muted animate-[bounce_1.4s_ease-in-out_0.4s_infinite] text-2xl">.</span>
                </div>
              </div>
              <div className="bb-progress-track mb-3 h-3 overflow-hidden rounded-full">
                <div className="bb-progress-fill h-full w-1/3 animate-pulse rounded-full" />
              </div>
              <div className="bb-surface-soft h-4 w-48 rounded" />
            </>
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                {allDailyTasksDone ? (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="bb-surface rounded-full border p-1.5 shadow-sm">
                        <LouisAvatar mood="stareyes" size={48} />
                      </div>
                      <div className="min-w-0">
                        <p className="bb-accent text-xs font-semibold uppercase tracking-[0.18em]">
                          Daily Bible Tasks
                        </p>
                        <h2 className="bb-text-primary mt-1 text-base font-bold leading-tight sm:text-lg">
                          You have finished all of today&apos;s Bible tasks
                        </h2>
                      </div>
                    </div>
                    <div className="bb-progress-track mt-4 h-2.5 overflow-hidden rounded-full">
                      <div className="bb-progress-fill h-full w-full animate-[pulse_2s_ease-in-out_infinite] rounded-full" />
                    </div>
                    <p className="bb-text-secondary mt-3 text-sm font-medium">
                      Your next daily tasks start in {dailyTaskTimeLeftLabel || "24h 0m"}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="bb-text-primary pr-2 text-[0.95rem] font-semibold leading-tight sm:text-[1.1rem]">
                          Daily Task
                        </h2>
                        <p className="bb-text-secondary mt-1 text-sm">
                          {dailyTaskNextTitle ? `Next: ${dailyTaskNextTitle}` : "Tap to view your daily Bible checklist."}
                        </p>
                      </div>
                      <div className="bb-surface shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] shadow-sm">
                        {dailyTaskCompletedCount}/{safeDailyTaskTotal}
                      </div>
                    </div>
                    <div className="bb-progress-track mt-3 overflow-hidden rounded-full">
                      <div
                        className="bb-progress-fill h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${dailyTaskProgressPercent}%` }}
                      />
                    </div>
                    <div className="mt-2.5 text-[13px] sm:text-sm">
                      <p className="bb-text-secondary min-w-0 font-medium">
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
          <div className="bb-card relative cursor-pointer rounded-2xl border px-4 py-3 shadow-sm transition hover:scale-[1.01] hover:shadow-md">
            <span className="bb-accent absolute right-4 top-1/2 -translate-y-1/2 text-base" aria-hidden="true">
              ↑
            </span>
            <div className="flex items-center gap-3 pr-7">
              <div className="text-xl leading-none">👑</div>
              <div className="min-w-0">
                <p className="bb-text-primary text-sm font-semibold">Go Deeper With Pro</p>
                <p className="bb-text-secondary text-xs leading-relaxed">
                  Unlock the full devotional library and remove the daily credit wall.
                </p>
              </div>
            </div>
          </div>
        </Link>
      ) : null}

      {membershipStatus === "pro" && daysRemaining !== null && daysRemaining > 0 ? (
        <div className="bb-accent-soft rounded-xl border px-4 py-3 shadow-sm">
          <p className="bb-text-secondary text-sm font-medium">
            Pro expires in {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
          </p>
        </div>
      ) : null}

      <Link href="/reading" onClick={(event) => handleCardClick(event, "bible", "/reading")}>
        <div
          data-dashboard-tour="bible"
          className={`bb-card cursor-pointer rounded-xl border p-5 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md ${getSpotlightClasses("bible")}`}
        >
          <h2 className="bb-text-primary text-xl font-semibold">📖 The Bible</h2>
          <p className="bb-text-secondary mt-1">Read the complete Bible here</p>
        </div>
      </Link>

      <Link href="/devotionals" onClick={(event) => handleCardClick(event, "bible_studies", "/devotionals")}>
        <div className="bb-card cursor-pointer rounded-xl border p-5 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md">
          <h2 className="bb-text-primary text-xl font-semibold">ðŸŒ… Bible Studies</h2>
          <p className="bb-text-secondary mt-1">Guided chapter studies with reading, notes, games, and reflection</p>
        </div>
      </Link>

      <Link href="/study-groups" onClick={(event) => handleCardClick(event, "bible_study_hub", "/study-groups")}>
        <div
          data-dashboard-tour="group"
          className={`bb-card cursor-pointer rounded-xl border p-5 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md ${getSpotlightClasses("group")}`}
        >
          <h2 className="bb-text-primary text-xl font-semibold">👥 Bible Study Group</h2>
          <p className="bb-text-secondary mt-1">Study the Bible with us</p>
        </div>
      </Link>

      <Link href="/guided-studies" onClick={(event) => handleCardClick(event, "guided_studies", "/guided-studies")}>
        <div
          data-dashboard-tour="tools"
          className={`bb-card cursor-pointer rounded-xl border p-5 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md ${getSpotlightClasses("tools")}`}
        >
          <h2 className="bb-text-primary text-xl font-semibold">🛠 Bible Study Tools</h2>
          <p className="bb-text-secondary mt-1">A collection of Bible study tools</p>
        </div>
      </Link>

      <Link href="/biblebuddy-tv" onClick={(event) => handleCardClick(event, "bible_buddy_tv", "/biblebuddy-tv")}>
        <div className="bb-card cursor-pointer rounded-xl border p-5 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md">
          <h2 className="bb-text-primary text-xl font-semibold">📺 Bible Buddy TV</h2>
          <p className="bb-text-secondary mt-1">Stream Bible shows, movies, sermons, and more</p>
        </div>
      </Link>

      <Link href="/bible-study-games" onClick={(event) => handleCardClick(event, "bible_trivia", "/bible-study-games")}>
        <div
          data-dashboard-tour="games"
          className={`bb-card cursor-pointer rounded-xl border p-5 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md ${getSpotlightClasses("games")}`}
        >
          <h2 className="bb-text-primary text-xl font-semibold">🎮 Bible Study Games</h2>
          <p className="bb-text-secondary mt-1">Play our Bible-based games</p>
        </div>
      </Link>

      <button
        type="button"
        onClick={onInviteBuddy}
        data-dashboard-tour="invite"
        className={`bb-card relative w-full cursor-pointer rounded-xl border p-5 text-left shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md ${getSpotlightClasses("invite")}`}
      >
        <span className="bb-text-muted absolute right-4 top-4 text-base" aria-hidden="true">
          ↗
        </span>
        <h2 className="bb-text-primary text-xl font-semibold">↗ Share Bible Buddy</h2>
        <p className="bb-text-secondary mt-1">Share by text, WhatsApp, or copy link.</p>
      </button>
    </div>
  );
};

export default DashboardCards;
