"use client";
import React from "react";

// Use the same Louis avatar as CreditEducationModal
const LOUIS_AVATAR_SRC = "/louis/louis-sideeye.png";

export type DashboardDailyWelcomeModalProps = {
  open: boolean;
  onClose: () => void;
  isReturningUser: boolean;
  lastAction?: { action_type: string; action_label: string } | null;
  recommendation?: string | null;
};

// No longer needed: actionTypeDisplay

export default function DashboardDailyWelcomeModal({
  open,
  onClose,
  isReturningUser,
  lastAction,
  recommendation,
}: DashboardDailyWelcomeModalProps) {
  if (!open) return null;

  // Helper: Render Louis avatar
  const LouisAvatar = (
    <img src={LOUIS_AVATAR_SRC} alt="Little Louis avatar" width={64} height={64} className="rounded-full select-none mx-auto mb-3" />
  );

  // Conversational copy for returning user with robust conditional rendering
  function getReturningUserContent() {
    // Extract safe values
    const dailyCredits = 5; // Always 5 for welcome overlay
    const actionType = lastAction?.action_type;
    const actionLabel = lastAction?.action_label?.trim();
    const hasActionLabel = !!(actionLabel && actionLabel.length > 0);

    // Headline (do not change styling)
    const headline = (
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">👋 Welcome back!</h2>
    );

    // Body copy logic
    let body;
    if (hasActionLabel) {
      body = (
        <>
          <p className="mb-2">Last time you were learning about <span className="font-bold">{actionLabel}</span>.</p>
          <p className="mb-2">Want to keep going today?</p>
          <p className="mb-2">You have <span className="font-bold">{dailyCredits} study actions</span> ready.</p>
        </>
      );
    } else if (actionType) {
      if (actionType === "person" || actionType === "person_viewed") {
        body = (
          <>
            <p className="mb-2">I saw you were exploring Bible people recently.</p>
            <p className="mb-2">Want to discover someone new today?</p>
            <p className="mb-2">You have <span className="font-bold">{dailyCredits} study actions</span> ready.</p>
          </>
        );
      } else if (actionType === "chapter" || actionType === "chapter_completed") {
        body = (
          <>
            <p className="mb-2">You were reading through Scripture recently.</p>
            <p className="mb-2">Ready to continue where you left off?</p>
            <p className="mb-2">You have <span className="font-bold">{dailyCredits} study actions</span> ready.</p>
          </>
        );
      } else if (actionType === "trivia" || actionType === "trivia_played") {
        body = (
          <>
            <p className="mb-2">You were testing your knowledge in Bible Trivia.</p>
            <p className="mb-2">Want another round?</p>
            <p className="mb-2">You have <span className="font-bold">{dailyCredits} study actions</span> ready.</p>
          </>
        );
      } else if (actionType === "devotional" || actionType === "devotional_day_completed") {
        body = (
          <>
            <p className="mb-2">You were spending time in a devotional.</p>
            <p className="mb-2">Ready for another day?</p>
            <p className="mb-2">You have <span className="font-bold">{dailyCredits} study actions</span> ready.</p>
          </>
        );
      } else {
        body = (
          <>
            <p className="mb-2">You’ve got <span className="font-bold">{dailyCredits} study actions</span> ready today.</p>
            <p className="mb-2">Let’s keep building your Bible knowledge.</p>
          </>
        );
      }
    } else {
      body = (
        <>
          <p className="mb-2">You’ve got <span className="font-bold">{dailyCredits} study actions</span> ready today.</p>
          <p className="mb-2">Let’s keep building your Bible knowledge.</p>
        </>
      );
    }

    // CTA button logic
    let primaryBtn = "Start Your Day";
    if (hasActionLabel) {
      if (actionType === "person" || actionType === "person_viewed") {
        primaryBtn = "Explore Bible People";
      } else if (actionType === "chapter" || actionType === "chapter_completed") {
        primaryBtn = "Continue Reading";
      } else if (actionType === "trivia" || actionType === "trivia_played") {
        primaryBtn = "Play Trivia";
      } else if (actionType === "devotional" || actionType === "devotional_day_completed") {
        primaryBtn = "Open Devotional";
      } else {
        primaryBtn = "Start Your Day";
      }
    } else if (actionType) {
      if (actionType === "person" || actionType === "person_viewed") {
        primaryBtn = "Explore Bible People";
      } else if (actionType === "chapter" || actionType === "chapter_completed") {
        primaryBtn = "Continue Reading";
      } else if (actionType === "trivia" || actionType === "trivia_played") {
        primaryBtn = "Play Trivia";
      } else if (actionType === "devotional" || actionType === "devotional_day_completed") {
        primaryBtn = "Open Devotional";
      } else {
        primaryBtn = "Start Your Day";
      }
    }

    // Secondary text link
    const secondary = "Try something different";

    return (
      <>
        {headline}
        <div className="max-w-md mx-auto text-center text-gray-700 mb-4 text-base leading-snug">
          {LouisAvatar}
          {body}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full px-6 py-3 rounded-2xl font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition text-center"
        >
          {primaryBtn}
        </button>
        <div className="mt-2 text-xs text-gray-500 text-center">{secondary}</div>
      </>
    );
  }

  // Conversational copy for new user
  function getNewUserContent() {
    return (
      <>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">👋 Welcome to Bible Buddy</h2>
        <div className="max-w-md mx-auto text-center text-gray-700 mb-4 text-base leading-snug">
          {LouisAvatar}
          <p className="mb-2">I’m Little Louis.</p>
          <p className="mb-2">You get <span className="font-bold">5 free study actions</span> every day.</p>
          <p className="mb-2">Let’s start by reading a chapter,<br />or try a round of trivia.</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full px-6 py-3 rounded-2xl font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition text-center"
        >
          Start Studying
        </button>
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>
        {isReturningUser ? getReturningUserContent() : getNewUserContent()}
      </div>
    </div>
  );
}
