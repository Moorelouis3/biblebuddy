"use client";

import Link from "next/link";
import React from "react";
import type { DailyRecommendation } from "../lib/dailyRecommendation";

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

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative">
        {isLoadingLevel ? (
          <>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold">Loading</h2>
              <div className="flex gap-1 items-center h-6">
                <span className="text-gray-500 text-2xl animate-[bounce_1.4s_ease-in-out_infinite]">.</span>
                <span className="text-gray-500 text-2xl animate-[bounce_1.4s_ease-in-out_0.2s_infinite]">.</span>
                <span className="text-gray-500 text-2xl animate-[bounce_1.4s_ease-in-out_0.4s_infinite]">.</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm mb-4">Loading your level...</p>
            <div className="mb-3">
              <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full bg-blue-300 rounded-full w-1/3 animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </>
        ) : levelInfo ? (
          <>
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-xl font-semibold">
                Level {levelInfo.level} &quot;{levelInfo.levelName}&quot;
              </h2>
              <button
                onClick={() => setShowLevelInfoModal(true)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                title="Learn about levels"
              >
                ?
              </button>
            </div>
            <p className="text-gray-700 text-sm mb-4">{levelInfo.identityText}</p>
            <div className="mb-3">
              <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              {levelInfo.pointsToNextLevel > 0
                ? `You have ${levelInfo.pointsToNextLevel} points until Level ${levelInfo.level + 1}`
                : "You've reached the top level"}
            </p>
            {profile && profile.is_paid === false && (
              <p className="text-sm text-gray-600 font-medium mt-2">
                Daily credits left: {profile.daily_credits ?? 0}
              </p>
            )}
          </>
        ) : null}
      </div>

      {showFreeUpgradeCard && (
        <Link href="/upgrade">
          <div className="bg-[#fff7ec] border border-[#f0d7b3] rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition relative">
            <span className="absolute right-4 top-4 text-[#b7791f] text-base" aria-hidden="true">↑</span>
            <div className="flex items-start gap-3">
              <div className="text-2xl leading-none">👑</div>
              <div className="min-w-0">
                <h2 className="text-xl font-semibold text-[#8a4b14]">Go Deeper With Pro</h2>
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                  Unlock deeper Bible study, open the full devotional library, and keep your momentum going without daily credit limits.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-[#f6e4ca] text-[#9a5b1f]">Unlimited study access</span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-[#f6e4ca] text-[#9a5b1f]">Full devotionals</span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-[#f6e4ca] text-[#9a5b1f]">No daily credit wall</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {isLoadingRecommendation ? (
        <div className="bg-red-100 border border-red-200 rounded-xl p-5 shadow-sm relative">
          <h2 className="text-xl font-semibold">✨ Today&apos;s Recommendation</h2>
          <div className="flex items-center gap-1 mt-3">
            <span className="text-gray-500 text-sm">Loading</span>
            <span className="text-gray-500 text-xl animate-[bounce_1.4s_ease-in-out_infinite]">.</span>
            <span className="text-gray-500 text-xl animate-[bounce_1.4s_ease-in-out_0.2s_infinite]">.</span>
            <span className="text-gray-500 text-xl animate-[bounce_1.4s_ease-in-out_0.4s_infinite]">.</span>
          </div>
        </div>
      ) : dailyRecommendation && dailyRecommendationCardTitle && dailyRecommendationCardSubtitle ? (
        <Link href={dailyRecommendation.primaryButtonHref}>
          <div className="bg-red-100 border border-red-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition relative">
            <span className="absolute right-4 top-4 text-red-400 text-base" aria-hidden="true">→</span>
            <h2 className="text-xl font-semibold">✨ {dailyRecommendationCardTitle}</h2>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed">{dailyRecommendationCardSubtitle}</p>
          </div>
        </Link>
      ) : null}

      {membershipStatus === "pro" && daysRemaining !== null && daysRemaining > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
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

