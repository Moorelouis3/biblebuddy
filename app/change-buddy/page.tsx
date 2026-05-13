"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LouisAvatar } from "../../components/LouisAvatar";
import {
  BUDDY_AVATARS,
  DEFAULT_BUDDY_AVATAR,
  SELECTED_BUDDY_STORAGE_KEY,
  isBuddyUnlocked,
  normalizeBuddyAvatarId,
  type BuddyAvatar,
  type BuddyAvatarId,
} from "../../lib/buddyAvatars";
import { supabase } from "../../lib/supabaseClient";

function levelCopy(buddy: BuddyAvatar, currentLevel: number) {
  const levelsAway = Math.max(0, buddy.unlockLevel - currentLevel);
  if (levelsAway === 0) return `Unlocked at Level ${buddy.unlockLevel}`;
  return `Keep going. You're only ${levelsAway} level${levelsAway === 1 ? "" : "s"} away from ${buddy.name}.`;
}

export default function ChangeBuddyPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedBuddy, setSelectedBuddy] = useState<BuddyAvatarId>(DEFAULT_BUDDY_AVATAR);
  const [loading, setLoading] = useState(true);
  const [savingBuddy, setSavingBuddy] = useState<BuddyAvatarId | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const selectedBuddyConfig = useMemo(
    () => BUDDY_AVATARS.find((buddy) => buddy.id === selectedBuddy) ?? BUDDY_AVATARS[0],
    [selectedBuddy],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadBuddyState() {
      try {
        const { data: authData } = await supabase.auth.getUser();
        const user = authData.user;
        if (!user) {
          if (!cancelled) setLoading(false);
          return;
        }

        if (!cancelled) setUserId(user.id);

        const { data, error } = await supabase
          .from("profile_stats")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) throw error;

        const level = typeof data?.current_level === "number" && data.current_level > 0 ? data.current_level : 1;
        const profileBuddy = normalizeBuddyAvatarId(data?.selected_buddy_avatar);
        const localBuddy =
          typeof window !== "undefined"
            ? normalizeBuddyAvatarId(window.localStorage.getItem(SELECTED_BUDDY_STORAGE_KEY))
            : DEFAULT_BUDDY_AVATAR;
        const initialBuddy = data?.selected_buddy_avatar ? profileBuddy : localBuddy;
        const unlockedInitial = BUDDY_AVATARS.find((buddy) => buddy.id === initialBuddy && isBuddyUnlocked(buddy, level));

        if (!cancelled) {
          setCurrentLevel(level);
          setSelectedBuddy(unlockedInitial?.id ?? DEFAULT_BUDDY_AVATAR);
          if (typeof window !== "undefined") {
            window.localStorage.setItem(SELECTED_BUDDY_STORAGE_KEY, unlockedInitial?.id ?? DEFAULT_BUDDY_AVATAR);
            window.dispatchEvent(new CustomEvent("bb:selected-buddy-avatar-changed"));
          }
        }
      } catch (error) {
        console.error("[CHANGE_BUDDY] Could not load buddy selection:", error);
        if (!cancelled) setMessage("Could not load your saved Buddy yet. You can still choose on this device.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadBuddyState();

    return () => {
      cancelled = true;
    };
  }, []);

  async function chooseBuddy(buddy: BuddyAvatar) {
    const unlocked = isBuddyUnlocked(buddy, currentLevel);

    if (!unlocked) {
      setMessage(`Reach Level ${buddy.unlockLevel} to unlock ${buddy.name}. Keep completing your daily Bible tasks to level up.`);
      return;
    }

    setSavingBuddy(buddy.id);
    setMessage(null);
    setSelectedBuddy(buddy.id);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(SELECTED_BUDDY_STORAGE_KEY, buddy.id);
      window.dispatchEvent(new CustomEvent("bb:selected-buddy-avatar-changed"));
    }

    try {
      if (!userId) throw new Error("No user session found.");
      const { error } = await supabase
        .from("profile_stats")
        .update({ selected_buddy_avatar: buddy.id })
        .eq("user_id", userId);

      if (error) throw error;
      setMessage(`${buddy.name} is now your Bible Buddy.`);
    } catch (error) {
      console.error("[CHANGE_BUDDY] Could not save selected buddy:", error);
      setMessage(`${buddy.name} is selected on this device. Add the selected_buddy_avatar profile field to save it across devices.`);
    } finally {
      setSavingBuddy(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6faf7] px-4 py-6 text-gray-950">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[28px] border border-[#dceee2] bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4a9b6f]">Change Buddy</p>
              <h1 className="mt-2 text-3xl font-black tracking-normal text-gray-950 sm:text-4xl">Choose Your Bible Buddy</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                Your Buddy will encourage, guide, and help you grow in your Bible journey.
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-3xl border border-[#dceee2] bg-[#f8fcf9] px-4 py-3">
              <LouisAvatar buddyId={selectedBuddy} mood="wave" size={72} />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500">Current</p>
                <p className="text-lg font-black text-gray-950">{selectedBuddyConfig.name}</p>
                <p className="text-sm font-semibold text-[#4a9b6f]">{selectedBuddyConfig.title}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#eaf7ee] px-4 py-2 text-sm font-black text-[#2f7a52]">Your Level: {currentLevel}</span>
            {loading ? <span className="text-sm font-semibold text-gray-500">Loading Buddies...</span> : null}
          </div>
        </div>

        {message ? (
          <div className="mt-4 rounded-2xl border border-[#d8e8dc] bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm">
            {message}
          </div>
        ) : null}

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BUDDY_AVATARS.map((buddy) => {
            const unlocked = isBuddyUnlocked(buddy, currentLevel);
            const selected = selectedBuddy === buddy.id;

            return (
              <button
                key={buddy.id}
                type="button"
                onClick={() => void chooseBuddy(buddy)}
                className={`relative overflow-hidden rounded-[24px] border p-5 text-left shadow-sm transition ${
                  selected
                    ? "border-[#4a9b6f] bg-[#f0faf3] ring-2 ring-[#4a9b6f]/20"
                    : "border-[#e1e9e4] bg-white hover:-translate-y-0.5 hover:border-[#b8dac4] hover:shadow-md"
                } ${!unlocked ? "opacity-85" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="rounded-3xl bg-white p-2 shadow-sm">
                    <div className={!unlocked ? "opacity-55 grayscale" : ""}>
                      <LouisAvatar buddyId={buddy.id} mood={selected ? "stareyes" : "wave"} size={86} />
                    </div>
                  </div>
                  <div className={`rounded-full px-3 py-1 text-xs font-black ${selected ? "bg-[#4a9b6f] text-white" : "bg-gray-100 text-gray-700"}`}>
                    {selected ? "✓ Current Buddy" : `Level ${buddy.unlockLevel}`}
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-2xl font-black tracking-normal text-gray-950">{buddy.name}</h2>
                  <p className="mt-1 text-sm font-black text-[#4a9b6f]">{buddy.title}</p>
                  <p className="mt-3 min-h-[48px] text-sm leading-6 text-gray-600">{buddy.description}</p>
                </div>

                <div className="mt-4">
                  {unlocked ? (
                    <span className={`inline-flex rounded-full px-4 py-2 text-sm font-black ${selected ? "bg-[#4a9b6f] text-white" : "bg-[#eaf7ee] text-[#2f7a52]"}`}>
                      {savingBuddy === buddy.id ? "Saving..." : selected ? "Current Buddy" : "Choose Buddy"}
                    </span>
                  ) : (
                    <div className="rounded-2xl bg-gray-50 px-4 py-3">
                      <p className="text-sm font-black text-gray-800">🔒 Unlocks at Level {buddy.unlockLevel}</p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-gray-500">{levelCopy(buddy, currentLevel)}</p>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-[24px] border border-[#dceee2] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-black text-gray-950">How to Unlock More Buddies</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
            Level up by completing daily tasks, studying God's Word, answering trivia, playing word puzzles, and keeping your streak strong.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex rounded-full bg-[#4a9b6f] px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#3f8a60]"
          >
            View Daily Tasks
          </Link>
        </div>
      </div>
    </div>
  );
}
