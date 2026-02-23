import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

interface CreditEducationModalProps {
  open: boolean;
  onClose: () => void;
  userId?: string | null;
  ignoreCreditPhase1?: boolean;
  onSetIgnore?: () => void;
}
export default function CreditEducationModal({ open, onClose, userId, ignoreCreditPhase1, onSetIgnore }: CreditEducationModalProps) {
  const router = useRouter();
  const [dontShow, setDontShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1200);
    }
  }, [open]);

  if (!open) return null;

  const handleContinue = async () => {
    if (dontShow && userId) {
      setSaving(true);
      await supabase
        .from("profile_stats")
        .update({ ignore_credit_phase1: true })
        .eq("user_id", userId);
      setSaving(false);
      onSetIgnore?.();
    }
    onClose();
  };

  const handleUpgrade = () => {
    router.push("/upgrade");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-start justify-center overflow-y-auto p-1 py-4">
      {/* Fireworks/confetti animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {/* Use confetti from DevotionalDayCompletionModal logic, or canvas-confetti */}
        </div>
      )}
      <div className="relative w-full max-w-md md:max-w-lg rounded-[24px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-1 md:p-2 mb-4 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <div className="rounded-2xl bg-blue-50 px-3 md:px-4 py-3 md:py-4">
          {/* Header with Louis avatar */}
          <div className="flex flex-col items-center mb-4">
            <img src="/louis/louis-sideeye.png" alt="Louis avatar" width={64} height={64} className="rounded-full select-none mx-auto" />
            <h1 className="text-2xl md:text-3xl font-bold mt-3 text-center text-gray-900">
              Hey! You’re about to unlock a Bible Insight 👀
            </h1>
          </div>
          {/* Short explanation text with explicit line breaks and paragraph spacing */}
          <div className="max-w-md mx-auto text-center text-gray-700 mb-2 text-sm md:text-base leading-snug">
            <p className="mb-2">
              As a <span className="font-bold">FREE user</span>, you get <span className="font-bold">5 credits</span> each day.
            </p>
            <p className="mb-2">
              Each time you explore a Person, Place, Keyword, devotional, or chapter review, one credit is used.<br />
              Your credits reset daily.
            </p>
            <p className="mb-1">
              Upgrade to Bible Buddy Pro for unlimited access to everything.
            </p>
          </div>
          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3 mt-2">
            <button
              type="button"
              onClick={handleContinue}
              className="px-4 py-3 rounded-2xl text-sm md:text-base font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition text-center w-full"
              disabled={saving}
            >
              I understand
            </button>
            <button
              type="button"
              onClick={handleUpgrade}
              className="px-4 py-3 rounded-2xl text-sm md:text-base font-semibold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition text-center w-full"
              disabled={saving}
            >
              I wanna upgrade
            </button>
          </div>
          {/* Checkbox below buttons */}
          <div className="flex items-center justify-center mt-2 mb-1">
            <input
              id="dont-remind-me"
              type="checkbox"
              className="mr-2 accent-blue-600 w-3 h-3"
              checked={dontShow}
              onChange={e => setDontShow(e.target.checked)}
              disabled={saving}
            />
            <label htmlFor="dont-remind-me" className="text-xs text-gray-700 select-none">Don’t remind me anymore</label>
          </div>
        </div>
      </div>
    </div>
  );
}
