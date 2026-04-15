"use client";

import Link from "next/link";
import React, { useState } from "react";
import type { DailyRecommendation } from "../lib/dailyRecommendation";
import { LouisAvatar } from "./LouisAvatar";

interface DashboardCardsProps {
  profile: { is_paid?: boolean | null; daily_credits?: number | null } | null;
  membershipStatus: string;
  daysRemaining: number | null;
  isLoadingLevel: boolean;
  levelInfo: {
    level: number;
    levelName: string;
    identityText: string;
    progressPercent: number;
    pointsToNextLevel: number;
  } | null;
  userName: string;
  handleCardClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, card: string, href: string) => void;
  setShowLevelInfoModal: (show: boolean) => void;
  isLoadingRecommendation: boolean;
  dailyRecommendation: DailyRecommendation | null;
  dailyRecommendationCardTitle: string | null;
  dailyRecommendationCardSubtitle: string | null;
  onInviteBuddy: () => void;
  dashboardTourSpotlight?: "overview" | "level" | "recommendation" | "bible" | "group" | "tools" | "games" | "invite" | null;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({
  profile,
  membershipStatus,
  daysRemaining,
  isLoadingLevel,
  levelInfo,
  handleCardClick,
  setShowLevelInfoModal,
  isLoadingRecommendation,
  dailyRecommendation,
  dailyRecommendationCardTitle,
  dailyRecommendationCardSubtitle,
  onInviteBuddy,
  dashboardTourSpotlight = null,
}) => {
  const [showLevelDetails, setShowLevelDetails] = useState(false);
  const showFreeUpgradeCard = membershipStatus !== "pro" && profile?.is_paid !== true;

  const cardShellTheme = {
    outer: "border-[#e7d3a5] bg-gradient-to-br from-[#fbf1d7] via-[#f9edcf] to-[#f4e3ba]",
    shell: "",
    inset: "",
  };

  const recommendationMood =
    dailyRecommendation?.cardTheme === "green"
      ? "hands"
      : dailyRecommendation?.cardTheme === "blue"
        ? "bible"
        : dailyRecommendation?.cardTheme === "purple"
          ? "think"
          : dailyRecommendation?.cardTheme === "gold"
            ? "cool"
            : "smile";

  function getSpotlightClasses(target: DashboardCardsProps["dashboardTourSpotlight"]) {
    if (!dashboardTourSpotlight) return "";
    if (dashboardTourSpotlight === "overview" && target !== "overview") {
      return "";
    }
    if (
      (dashboardTourSpotlight === "level" || dashboardTourSpotlight === "recommendation") &&
      target === "overview"
    ) {
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
        <div data-dashboard-tour="level" className={`px-4 py-3.5 transition duration-300 md:px-5 md:py-4 ${getSpotlightClasses("level")}`}>
          {isLoadingLevel ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold text-gray-900">Loading your dashboard</h2>
                <div className="flex gap-1 items-center h-6">
                  <span className="text-gray-500 text-2xl animate-[bounce_1.4s_ease-in-out_infinite]">.</span>
                  <span className="text-gray-500 text-2xl animate-[bounce_1.4s_ease-in-out_0.2s_infinite]">.</span>
                  <span className="text-gray-500 text-2xl animate-[bounce_1.4s_ease-in-out_0.4s_infinite]">.</span>
                </div>
              </div>
              <div className="mb-3 h-3 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full w-1/3 rounded-full bg-blue-300 animate-pulse"></div>
              </div>
              <div className="h-4 w-40 rounded bg-gray-200"></div>
            </>
          ) : levelInfo ? (
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="pr-2 text-[0.95rem] font-semibold leading-tight text-gray-950 sm:text-[1.1rem]">
                      Level {levelInfo.level} "{levelInfo.levelName}"
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowLevelDetails((current) => !current)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-base text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                      title={showLevelDetails ? "Hide level details" : "Show level details"}
                      aria-label={showLevelDetails ? "Hide level details" : "Show level details"}
                    >
                      {showLevelDetails ? "⌃" : "⌄"}
                    </button>
                    <button
                      onClick={() => setShowLevelInfoModal(true)}
                      className="text-gray-400 hover:text-gray-600 text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition shrink-0"
                      title="Learn about levels"
                    >
                      ?
                    </button>
                  </div>
                </div>
                <div className="mt-2.5 h-2.5 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>
                <div className="mt-2.5 space-y-0.5 text-[13px] sm:text-sm">
                  <p className="font-medium text-gray-600">
                    {levelInfo.pointsToNextLevel > 0
                      ? `${levelInfo.pointsToNextLevel} points until Level ${levelInfo.level + 1}`
                      : "You've reached the top level"}
                  </p>
                  {profile && profile.is_paid === false && (
                    <p className="font-medium text-gray-600">
                      Daily credits left: {profile.daily_credits ?? 0}
                    </p>
                  )}
                </div>
                {showLevelDetails ? (
                  <p className="mt-2.5 text-sm text-gray-600">{levelInfo.identityText}</p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <div data-dashboard-tour="recommendation" className={`mx-3 mb-3 px-4 py-2.5 transition duration-300 md:mx-4 md:px-5 ${getSpotlightClasses("recommendation")}`}>
          {isLoadingRecommendation ? (
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/80 p-1 shadow-sm">
                <LouisAvatar mood="wave" size={38} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Louis is picking your next step</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-gray-500 text-sm">Loading</span>
                  <span className="text-gray-500 text-xl animate-[bounce_1.4s_ease-in-out_infinite]">.</span>
                  <span className="text-gray-500 text-xl animate-[bounce_1.4s_ease-in-out_0.2s_infinite]">.</span>
                  <span className="text-gray-500 text-xl animate-[bounce_1.4s_ease-in-out_0.4s_infinite]">.</span>
                </div>
              </div>
            </div>
          ) : dailyRecommendation && dailyRecommendationCardTitle && dailyRecommendationCardSubtitle ? (
            <Link href={dailyRecommendation.primaryButtonHref} className="block">
              <div className="flex items-start gap-3">
                <div className="rounded-full border border-white/80 bg-white/85 p-1 shadow-sm shrink-0">
                  <LouisAvatar mood={recommendationMood} size={38} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-semibold leading-tight text-gray-950 sm:text-base">
                    {dailyRecommendationCardTitle}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-gray-700 sm:text-sm">{dailyRecommendationCardSubtitle}</p>
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/80 p-1 shadow-sm">
                <LouisAvatar mood="wave" size={38} />
              </div>
              <p className="text-sm text-gray-600">Louis will have a new next step for you soon.</p>
            </div>
          )}
        </div>
      </div>

      {showFreeUpgradeCard && (
        <Link href="/upgrade">
          <div className="rounded-2xl border border-[#f0d7b3] bg-[#fff8ef] px-4 py-3 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition relative">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b7791f] text-base" aria-hidden="true">↑</span>
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
      )}

      {membershipStatus === "pro" && daysRemaining !== null && daysRemaining > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 shadow-sm">
          <p className="text-sm text-blue-800 font-medium">
            Pro expires in {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
          </p>
        </div>
      )}

      <Link href="/reading" onClick={(event) => handleCardClick(event, "bible", "/reading")}>
        <div data-dashboard-tour="bible" className={`bg-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition duration-300 ${getSpotlightClasses("bible")}`}>
          <h2 className="text-xl font-semibold">📖 The Bible</h2>
          <p className="text-gray-700 mt-1">Read the complete Bible here</p>
        </div>
      </Link>

      <Link href="/study-groups" onClick={(event) => handleCardClick(event, "bible_study_hub", "/study-groups")}>
        <div
          data-dashboard-tour="group"
          className={`rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition duration-300 ${getSpotlightClasses("group")}`}
          style={{ backgroundColor: "#d4ecd4", borderWidth: 1, borderColor: "#b8ddb8" }}
        >
          <h2 className="text-xl font-semibold">👥 Bible Study Group</h2>
          <p className="text-gray-700 mt-1">Study the Bible with us</p>
        </div>
      </Link>

      <Link href="/guided-studies" onClick={(event) => handleCardClick(event, "guided_studies", "/guided-studies")}>
        <div data-dashboard-tour="tools" className={`bg-[#f6d6d9] border border-[#e8aeb5] rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition duration-300 ${getSpotlightClasses("tools")}`}>
          <h2 className="text-xl font-semibold text-gray-900">🔨 Bible Study Tools</h2>
          <p className="text-gray-700 mt-1">A collection of Bible study tools</p>
        </div>
      </Link>

      <Link href="/biblebuddy-tv">
        <div className="rounded-xl border border-violet-200 bg-[#efe7ff] p-5 shadow-sm cursor-pointer transition duration-300 hover:scale-[1.01] hover:shadow-md">
          <h2 className="text-xl font-semibold text-gray-900">📺 Bible Buddy TV</h2>
          <p className="mt-1 text-gray-700">Stream Bible shows, movies, sermons, and more</p>
        </div>
      </Link>

      <Link href="/bible-study-games" onClick={(event) => handleCardClick(event, "bible_trivia", "/bible-study-games")}>
        <div data-dashboard-tour="games" className={`bg-emerald-100 border border-emerald-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition duration-300 ${getSpotlightClasses("games")}`}>
          <h2 className="text-xl font-semibold">🎮 Bible Study Games</h2>
          <p className="text-gray-700 mt-1">Play our Bible-based games</p>
        </div>
      </Link>

      <button
        type="button"
        onClick={onInviteBuddy}
        data-dashboard-tour="invite"
        className={`relative w-full rounded-xl border border-gray-300 bg-gray-100 p-5 text-left shadow-sm cursor-pointer transition duration-300 hover:scale-[1.01] hover:shadow-md ${getSpotlightClasses("invite")}`}
      >
        <span className="absolute right-4 top-4 text-gray-500 text-base" aria-hidden="true">↗</span>
        <h2 className="text-xl font-semibold text-gray-900">↗ Share Bible Buddy</h2>
        <p className="text-gray-700 mt-1">Share by text, WhatsApp, or copy link.</p>
      </button>
    </div>
  );
};

export default DashboardCards;





