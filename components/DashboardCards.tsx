"use client";

import Link from "next/link";
import React from "react";
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
}) => {
  const showFreeUpgradeCard = membershipStatus !== "pro" && profile?.is_paid !== true;

  const recommendationThemeClasses = {
    rose: {
      shell: "border-[#f3d6d6] bg-gradient-to-br from-[#fff6f4] via-[#fffaf8] to-[#fffdfb]",
      accent: "text-[#c97979]",
      chip: "border-[#efd3d3] bg-white text-[#a86060]",
      stripe: "from-[#f6caca] to-[#f8e0c8]",
    },
    blue: {
      shell: "border-[#cfe0ff] bg-gradient-to-br from-[#f3f7ff] via-[#f8fbff] to-[#fcfdff]",
      accent: "text-[#5f84cc]",
      chip: "border-[#dbe8ff] bg-white text-[#4768af]",
      stripe: "from-[#bfd4ff] to-[#d7e7ff]",
    },
    green: {
      shell: "border-[#cfe7d1] bg-gradient-to-br from-[#f4fbf4] via-[#f8fdf8] to-[#fcfffc]",
      accent: "text-[#5d9263]",
      chip: "border-[#dbecdc] bg-white text-[#4b7c51]",
      stripe: "from-[#c8e6cb] to-[#e3f3d7]",
    },
    purple: {
      shell: "border-[#dfd1f7] bg-gradient-to-br from-[#f8f4ff] via-[#fbf9ff] to-[#fefcff]",
      accent: "text-[#876ec2]",
      chip: "border-[#e8dffb] bg-white text-[#7057ac]",
      stripe: "from-[#d8caf7] to-[#ebe2ff]",
    },
    gold: {
      shell: "border-[#efdfb8] bg-gradient-to-br from-[#fff9ef] via-[#fffdf5] to-[#fffefb]",
      accent: "text-[#af8430]",
      chip: "border-[#f2e5c3] bg-white text-[#936915]",
      stripe: "from-[#f0d58f] to-[#f7ebbe]",
    },
  } as const;

  const recommendationTheme =
    recommendationThemeClasses[dailyRecommendation?.cardTheme || "rose"] || recommendationThemeClasses.rose;

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

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-[#f8fbff] via-white to-[#fffaf3] px-5 py-5 md:px-6">
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
                    <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-gray-400">Your Progress</p>
                    <h2 className="mt-1 text-[1.45rem] font-semibold text-gray-950">
                      Level {levelInfo.level} "{levelInfo.levelName}"
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowLevelInfoModal(true)}
                    className="text-gray-400 hover:text-gray-600 text-lg font-bold w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition shrink-0"
                    title="Learn about levels"
                  >
                    ?
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-700">{levelInfo.identityText}</p>
                <div className="mt-4 h-3 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${levelInfo.progressPercent}%` }}
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
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
              </div>
            </div>
          ) : null}
        </div>

        <div className={`border-t px-5 py-4 md:px-6 ${recommendationTheme.shell}`}>
          {isLoadingRecommendation ? (
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/80 p-1.5 shadow-sm">
                <LouisAvatar mood="wave" size={42} />
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
                <div className="rounded-full border border-white/80 bg-white/85 p-1.5 shadow-sm shrink-0">
                  <LouisAvatar mood={recommendationMood} size={44} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className={`text-[11px] uppercase tracking-[0.22em] font-semibold ${recommendationTheme.accent}`}>
                        {dailyRecommendation.cardEyebrow || "Today's Recommendation"}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold leading-tight text-gray-950">
                        {dailyRecommendationCardTitle}
                      </h3>
                    </div>
                    <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${recommendationTheme.chip}`}>
                      {dailyRecommendation.primaryButtonText} →
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{dailyRecommendationCardSubtitle}</p>
                  {dailyRecommendation.contextLine ? (
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">{dailyRecommendation.contextLine}</p>
                  ) : null}
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/80 p-1.5 shadow-sm">
                <LouisAvatar mood="wave" size={42} />
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
        <div className="bg-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
          <h2 className="text-xl font-semibold">📖 The Bible</h2>
          <p className="text-gray-700 mt-1">Read the complete Bible here</p>
        </div>
      </Link>

      <Link href="/study-groups">
        <div
          className="rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition"
          style={{ backgroundColor: "#d4ecd4", borderWidth: 1, borderColor: "#b8ddb8" }}
        >
          <h2 className="text-xl font-semibold">👥 Bible Study Group</h2>
          <p className="text-gray-700 mt-1">Study the Bible with us</p>
        </div>
      </Link>

      <Link href="/bible-trivia" onClick={(event) => handleCardClick(event, "bible_trivia", "/bible-trivia")}>
        <div className="bg-emerald-100 border border-emerald-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
          <h2 className="text-xl font-semibold">🎯 Bible Trivia</h2>
          <p className="text-gray-700 mt-1">Test your Bible knowledge</p>
        </div>
      </Link>

      <Link href="/guided-studies" onClick={(event) => handleCardClick(event, "guided_studies", "/guided-studies")}>
        <div className="bg-orange-100 border border-orange-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition">
          <h2 className="text-xl font-semibold text-orange-800">🔨 Bible Study Tools</h2>
          <p className="text-gray-700 mt-1">A collection of Bible study tools</p>
        </div>
      </Link>

      <button
        type="button"
        onClick={onInviteBuddy}
        className="w-full text-left bg-[#efe7ff] border border-[#ddd0ff] rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition relative"
      >
        <span className="absolute right-4 top-4 text-[#8a63d2] text-base" aria-hidden="true">↗</span>
        <h2 className="text-xl font-semibold text-gray-900">↗ Invite a Bible Buddy</h2>
        <p className="text-gray-700 mt-1">Share by text, WhatsApp, or copy link.</p>
      </button>
    </div>
  );
};

export default DashboardCards;
