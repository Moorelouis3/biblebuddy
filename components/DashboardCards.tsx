
"use client";
import Link from "next/link";
import React from "react";

interface DashboardCardsProps {
  profile: any;
  membershipStatus: string;
  daysRemaining: number | null;
  isLoadingLevel: boolean;
  levelInfo: any;
  userName: string;
  handleCardClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, card: string, href: string) => void;
  setShowLevelInfoModal: (show: boolean) => void;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({
  profile,
  membershipStatus,
  daysRemaining,
  isLoadingLevel,
  levelInfo,
  userName,
  handleCardClick,
  setShowLevelInfoModal,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* BIBLE READING PROGRESS CARD */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm relative">
        {isLoadingLevel ? (
          <>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold">📘 Loading</h2>
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
                📘 Level {levelInfo.level} "{levelInfo.levelName}"
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
              You have {Math.max(0, levelInfo.levelEnd - levelInfo.totalActions + 1)} actions until Level {levelInfo.level + 1}
            </p>
            {profile && profile.is_paid === false && (
              <p className="text-sm text-gray-600 font-medium mt-2">
                Daily credits left: {profile.daily_credits ?? 0}
              </p>
            )}
          </>
        ) : null}
      </div>

      {profile?.is_paid === false && (
        <Link href="/upgrade">
          <div className="bg-red-100 border border-red-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition relative animate-pulse-slow">
            <span className="absolute right-4 top-4 text-red-400 text-base" aria-hidden="true">🔒</span>
            <h2 className="text-xl font-semibold">🔓 Unlock Full Access</h2>
            <p className="text-gray-700 mt-1">Remove limits and study without restriction.</p>
          </div>
        </Link>
      )}

      {membershipStatus === "pro" && daysRemaining !== null && daysRemaining > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
          <p className="text-sm text-blue-800 font-medium">
            ⏰ Pro expires in {daysRemaining} {daysRemaining === 1 ? "day" : "days"}
          </p>
        </div>
      )}

      <Link href="/reading" onClick={(event) => handleCardClick(event, "bible", "/reading")}> 
        <div className="bg-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition"> 
          <h2 className="text-xl font-semibold">📖 The Bible</h2> 
          <p className="text-gray-700 mt-1">Read the complete Bible here</p> 
        </div> 
      </Link>

      <Link href="/bible-study-hub" onClick={(event) => handleCardClick(event, "bible_study_hub", "/bible-study-hub")}> 
        <div className="bg-orange-100 border border-orange-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition"> 
          <h2 className="text-xl font-semibold text-orange-800">🧭 Bible Study Hub</h2> 
          <p className="text-gray-700 mt-1">Discuss and explore Bible topics</p> 
        </div> 
      </Link>

      <Link href="/guided-studies" onClick={(event) => handleCardClick(event, "guided_studies", "/guided-studies")}> 
        <div className="bg-yellow-100 border border-yellow-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition"> 
          <h2 className="text-xl font-semibold">📚 Bible Studies</h2> 
          <p className="text-gray-700 mt-1">Structured ways to study Scripture</p> 
        </div> 
      </Link>

      <Link href="/bible-references" onClick={(event) => handleCardClick(event, "bible_references", "/bible-references")}> 
        <div className="bg-purple-100 border border-purple-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition"> 
          <h2 className="text-xl font-semibold">🔎 Bible References</h2> 
          <p className="text-gray-700 mt-1">Explanations of Bible keywords</p> 
        </div> 
      </Link>

      <Link href="/bible-trivia" onClick={(event) => handleCardClick(event, "bible_trivia", "/bible-trivia")}> 
        <div className="bg-emerald-100 border border-emerald-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition"> 
          <h2 className="text-xl font-semibold">🎯 Bible Trivia</h2> 
          <p className="text-gray-700 mt-1">Test your Bible knowledge</p> 
        </div> 
      </Link>

      <Link href="/notes" onClick={(event) => handleCardClick(event, "notes", "/notes")}> 
        <div className="bg-indigo-100 border border-indigo-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition"> 
          <h2 className="text-xl font-semibold">📝 Bible Study Notes</h2> 
          <p className="text-gray-700 mt-1">Create and save study notes</p> 
        </div> 
      </Link>
    </div>
  );
};

export default DashboardCards;
