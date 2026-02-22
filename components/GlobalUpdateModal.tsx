"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import { CURRENT_UPDATE_VERSION } from "../lib/globalUpdateConfig";

interface GlobalUpdateModalProps {
  userId: string;
  lastSeenUpdateVersion: string | null;
  onboardingCompleted: boolean;
  onClose: () => void;
}

export default function GlobalUpdateModal({
  userId,
  lastSeenUpdateVersion,
  onboardingCompleted,
  onClose,
}: GlobalUpdateModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!onboardingCompleted) return null;
  if (lastSeenUpdateVersion === CURRENT_UPDATE_VERSION) return null;

  const handleAcknowledge = async () => {
    setLoading(true);
    await supabase
      .from("profile_stats")
      .update({ last_seen_update_version: CURRENT_UPDATE_VERSION })
      .eq("user_id", userId);
    setLoading(false);
    onClose();
    router.push("/bible-study-hub");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 flex flex-col items-center">
        <div className="text-3xl mb-2">📖</div>
        <h2 className="text-xl font-bold mb-3 text-center">The Bible Study Hub Is Live</h2>
        <div className="text-gray-700 mb-5 text-center">
          <p>You don’t have to study the Bible alone anymore.</p>
          <p className="mt-2">The new Bible Study Hub is where Bible Buddy users come together to think deeper, ask questions, and share insight.</p>
          <p className="mt-2">Inside, you’ll find six focused subjects:</p>
          <ul className="text-left mt-2 mb-2 ml-4 list-disc">
            <li>Bible Insights</li>
            <li>Bible Study Tips</li>
            <li>Christian Foundations</li>
            <li>Verse Breakdowns</li>
            <li>Character Studies</li>
            <li>Christian History</li>
          </ul>
          <p>Every article now includes reflection questions so you can join the discussion and hear from other Bible buddies.</p>
          <p className="mt-2">Ask questions.<br/>Share what you’re learning.<br/>Grow together.</p>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition disabled:opacity-60"
          onClick={handleAcknowledge}
          disabled={loading}
        >
          Explore the Bible Study Hub
        </button>
      </div>
    </div>
  );
}
