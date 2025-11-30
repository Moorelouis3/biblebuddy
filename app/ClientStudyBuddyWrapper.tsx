"use client";

import { useState } from "react";
import { StudyBuddyWidget } from "../components/StudyBuddyWidget";

export default function ClientStudyBuddyWrapper() {
  const [showBuddy, setShowBuddy] = useState(false);

  return (
    <>
      {/* The widget itself */}
      {showBuddy && (
        <StudyBuddyWidget
          onClose={() => {
            setShowBuddy(false);
          }}
        />
      )}

      {/* Floating button */}
      <button
        onClick={() => setShowBuddy(true)}
        className="
          fixed bottom-5 right-5
          bg-blue-600 text-white 
          shadow-lg rounded-full 
          px-5 py-3 text-sm font-semibold
          hover:bg-blue-700 transition
          z-[99999]
        "
      >
        Study Buddy
      </button>
    </>
  );
}
