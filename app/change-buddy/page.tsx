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
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [savingBuddy, setSavingBuddy] = useState<BuddyAvatarId | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const selectedBuddyConfig = useMemo(
    () => BUDDY_AVATARS.find((buddy) => buddy.id === selectedBuddy) ?? BUDDY_AVATARS[0],
    [selectedBuddy],
  );

  const activeBuddy = BUDDY_AVATARS[activeIndex] ?? selectedBuddyConfig;
  const activeUnlocked = isBuddyUnlocked(activeBuddy, currentLevel);
  const activeSelected = selectedBuddy === activeBuddy.id;

  useEffect(() => {
    const index = BUDDY_AVATARS.findIndex((buddy) => buddy.id === selectedBuddy);
    if (index >= 0) setActiveIndex(index);
  }, [selectedBuddy]);

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
      <div className="mx-auto max-w-4xl">
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
              <LouisAvatar buddyId={selectedBuddy} mood={selectedBuddy === "louis" ? "wave" : "peace"} size={72} />
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

        <div className="mt-5 rounded-[30px] border border-[#dceee2] bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setActiveIndex((index) => (index - 1 + BUDDY_AVATARS.length) % BUDDY_AVATARS.length)}
              className="grid h-11 w-11 place-items-center rounded-full border border-[#dceee2] bg-[#f8fcf9] text-xl font-black text-[#2f7a52] transition hover:bg-[#eaf7ee]"
              aria-label="Previous Buddy"
            >
              {"<"}
            </button>
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#4a9b6f]">Buddy Profile</p>
              <p className="mt-1 text-sm font-bold text-gray-500">Swipe or tap through mentors</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveIndex((index) => (index + 1) % BUDDY_AVATARS.length)}
              className="grid h-11 w-11 place-items-center rounded-full border border-[#dceee2] bg-[#f8fcf9] text-xl font-black text-[#2f7a52] transition hover:bg-[#eaf7ee]"
              aria-label="Next Buddy"
            >
              {">"}
            </button>
          </div>

          <div className="mt-5 flex snap-x gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {BUDDY_AVATARS.map((buddy, index) => {
              const unlocked = isBuddyUnlocked(buddy, currentLevel);
              const selected = selectedBuddy === buddy.id;
              const active = activeIndex === index;

              return (
                <button
                  key={buddy.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`min-w-[86%] snap-center rounded-[28px] border p-5 text-left shadow-sm transition sm:min-w-[520px] ${
                    active
                      ? "border-[#4a9b6f] bg-[#f0faf3] ring-2 ring-[#4a9b6f]/15"
                      : "border-[#e1e9e4] bg-[#fbfefc]"
                  } ${!unlocked ? "opacity-80" : ""}`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={!unlocked ? "opacity-55 grayscale" : ""}>
                      <LouisAvatar buddyId={buddy.id} mood={selected ? "stareyes" : buddy.id === "louis" ? "wave" : "peace"} size={150} />
                    </div>
                    <div className={`mt-4 rounded-full px-3 py-1 text-xs font-black ${selected ? "bg-[#4a9b6f] text-white" : "bg-white text-gray-700 shadow-sm"}`}>
                      {selected ? "Current Buddy" : `Unlock Level ${buddy.unlockLevel}`}
                    </div>
                    <h2 className="mt-3 text-4xl font-black tracking-normal text-gray-950">{buddy.name}</h2>
                    <p className="mt-1 text-sm font-black uppercase tracking-[0.16em] text-[#4a9b6f]">{buddy.title}</p>
                    <p className="mt-3 max-w-md text-sm font-semibold leading-6 text-gray-600">{buddy.description}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {buddy.traits.map((trait) => (
                      <span key={trait} className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#2f7a52] shadow-sm">
                        {trait}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-[26px] border border-[#dceee2] bg-[#f8fcf9] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#4a9b6f]">Meet {activeBuddy.name}</p>
                <h2 className="mt-2 text-2xl font-black text-gray-950">{activeBuddy.title}</h2>
                <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-gray-600">{activeBuddy.bio}</p>
              </div>
              <button
                type="button"
                onClick={() => void chooseBuddy(activeBuddy)}
                className={`shrink-0 rounded-full px-5 py-3 text-sm font-black shadow-sm transition ${
                  activeUnlocked
                    ? activeSelected
                      ? "bg-[#4a9b6f] text-white"
                      : "bg-gray-950 text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {savingBuddy === activeBuddy.id
                  ? "Saving..."
                  : activeSelected
                    ? "Current Buddy"
                    : activeUnlocked
                      ? "Choose Buddy"
                      : `Locked Until Level ${activeBuddy.unlockLevel}`}
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-gray-400">Speaking Style</p>
                <p className="mt-2 text-sm font-bold leading-6 text-gray-700">{activeBuddy.speakingStyle}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-gray-400">Favorite Themes</p>
                <p className="mt-2 text-sm font-bold leading-6 text-gray-700">{activeBuddy.favoriteBibleThemes.join(", ")}</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-gray-400">Mentor Style</p>
                <p className="mt-2 text-sm font-bold leading-6 text-gray-700">{activeBuddy.mentorStyle}</p>
              </div>
            </div>

            {!activeUnlocked ? (
              <div className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-gray-600 shadow-sm">
                {levelCopy(activeBuddy, currentLevel)}
              </div>
            ) : null}
          </div>
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
