"use client";

import Link from "next/link";
import React from "react";
import type { DailyRecommendation } from "../lib/dailyRecommendation";

interface DashboardCardsProps {
  profile: { is_paid?: boolean | null; daily_credits?: number | null; profile_image_url?: string | null; display_name?: string | null; username?: string | null } | null;
  primaryRecommendation: DailyRecommendation | null;
  membershipStatus: string;
  daysRemaining: number | null;
  isLoadingLevel: boolean;
  levelInfo: {
    level: number;
    progressPercent: number;
    pointsToNextLevel: number;
  } | null;
  currentStreak: number;
  handleCardClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, card: string, href: string) => void;
  setShowLevelInfoModal: (show: boolean) => void;
  setShowStreakBadgeModal: (show: boolean) => void;
  onInviteBuddy: () => void;
  dashboardTourSpotlight?: "overview" | "level" | "recommendation" | "bible" | "group" | "tools" | "games" | "invite" | null;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({
  profile,
  primaryRecommendation,
  membershipStatus,
  daysRemaining,
  isLoadingLevel,
  levelInfo,
  currentStreak,
  handleCardClick,
  setShowLevelInfoModal,
  setShowStreakBadgeModal,
  onInviteBuddy,
  dashboardTourSpotlight = null,
}) => {
  const showFreeUpgradeCard = membershipStatus !== "pro" && profile?.is_paid !== true;

  const cardShellTheme = {
    outer: "border-[#e7d3a5] bg-gradient-to-br from-[#fbf1d7] via-[#f9edcf] to-[#f4e3ba]",
  };
  const hasFireBadge = currentStreak >= 30;
  const streakLabel = `${currentStreak} Day Streak`;

  function getRecommendationVisual(recommendation: DailyRecommendation) {
    const title = `${recommendation.cardTitle || ""} ${recommendation.cardSubtitle || ""}`.toLowerCase();
    const href = recommendation.primaryButtonHref.toLowerCase();

    if (href.includes("/biblebuddy-tv")) {
      return { type: "emoji" as const, emoji: "📺" };
    }
    if (href.includes("/bible-trivia") || href.includes("/bible-study-games")) {
      return { type: "emoji" as const, emoji: "🎮" };
    }
    if (href.includes("/study-groups")) {
      return { type: "emoji" as const, emoji: "👥" };
    }
    if (href.includes("/keywords") || href.includes("/people") || href.includes("/places")) {
      return { type: "emoji" as const, emoji: "🧠" };
    }
    if (href.includes("/bible") || href.includes("/reading")) {
      return { type: "emoji" as const, emoji: "📖" };
    }

    if (title.includes("profile") || title.includes("photo") || title.includes("bio")) {
      return { type: "emoji" as const, emoji: "👤" };
    }

    if (title.includes("devotional") || title.includes("day ")) {
      return { type: "emoji" as const, emoji: "🌅" };
    }

    return { type: "emoji" as const, emoji: "✨" };
  }

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
      {primaryRecommendation ? (
        <Link href={primaryRecommendation.primaryButtonHref} onClick={(event) => handleCardClick(event, "recommendation", primaryRecommendation.primaryButtonHref)}>
          <div className="cursor-pointer overflow-hidden rounded-[26px] border border-gray-200 bg-white p-4 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                {(() => {
                  const visual = getRecommendationVisual(primaryRecommendation);
                  return <span className="text-3xl">{visual.emoji}</span>;
                })()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                  {primaryRecommendation.cardEyebrow || "Recommended For You"}
                </p>
                <h2 className="mt-1 text-xl font-semibold leading-tight text-gray-900">
                  {primaryRecommendation.cardTitle || primaryRecommendation.primaryButtonText}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {primaryRecommendation.cardSubtitle || primaryRecommendation.recommendationLine}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ) : null}

      <div
        data-dashboard-tour="overview"
        className={`overflow-hidden rounded-[26px] border shadow-sm transition duration-300 ${cardShellTheme.outer} ${getSpotlightClasses("overview")}`}
      >
        <div
          data-dashboard-tour="level"
          className={`px-4 py-3.5 transition duration-300 md:px-5 md:py-4 ${getSpotlightClasses("level")}`}
        >
          {isLoadingLevel ? (
            <>
              <div className="mb-2 flex items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-900">Loading your dashboard</h2>
                <div className="flex h-6 items-center gap-1">
                  <span className="animate-[bounce_1.4s_ease-in-out_infinite] text-2xl text-gray-500">.</span>
                  <span className="animate-[bounce_1.4s_ease-in-out_0.2s_infinite] text-2xl text-gray-500">.</span>
                  <span className="animate-[bounce_1.4s_ease-in-out_0.4s_infinite] text-2xl text-gray-500">.</span>
                </div>
              </div>
              <div className="mb-3 h-3 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-1/3 animate-pulse rounded-full bg-blue-300" />
              </div>
              <div className="h-4 w-40 rounded bg-gray-200" />
            </>
          ) : levelInfo ? (
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="pr-2 text-[0.95rem] font-semibold leading-tight text-gray-950 sm:text-[1.1rem]">
                      You are a Level {levelInfo.level} Bible Buddy
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setShowLevelInfoModal(true)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                      title="Learn about levels"
                    >
                      ?
                    </button>
                  </div>
                </div>
                <div className="mt-2.5 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-2.5 rounded-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>
                <div className="mt-2.5 flex items-center justify-between gap-3 text-[13px] sm:text-sm">
                  <p className="min-w-0 font-medium text-gray-600">
                    {levelInfo.pointsToNextLevel > 0
                      ? `${levelInfo.pointsToNextLevel} points until Level ${levelInfo.level + 1}`
                      : "You've reached the top level"}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowStreakBadgeModal(true)}
                    className={`inline-flex shrink-0 items-center gap-1.5 text-gray-900 transition hover:opacity-75 ${hasFireBadge ? "font-semibold" : "font-medium"}`}
                    title="Learn about the streak badge"
                  >
                    <span
                      className={`text-base leading-none transition ${hasFireBadge ? "" : "grayscale opacity-60"}`}
                      aria-hidden="true"
                    >
                      🔥
                    </span>
                    <span>{streakLabel}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
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
