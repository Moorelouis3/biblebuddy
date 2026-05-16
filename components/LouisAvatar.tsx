"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_BUDDY_AVATAR,
  SELECTED_BUDDY_STORAGE_KEY,
  getBuddyAvatar,
  normalizeBuddyAvatarId,
  type BuddyAvatarId,
} from "../lib/buddyAvatars";

type LouisMood =
  | "wave"
  | "stareyes"
  | "reading"
  | "praying"
  | "idea"
  | "thinking"
  | "peace"
  | "think"
  | "pray"
  | "sheesh"
  | "bible"
  | "smile"
  | "cool"
  | "hands"
  | "salute"
  | "sideeye";

type LouisAvatarProps = {
  mood?: LouisMood;
  size?: number;
  buddyId?: BuddyAvatarId;
};

const moodToFile: Record<LouisMood, string> = {
  wave: "/Newlouiswave.png",
  stareyes: "/Newlouisstareyes.png",
  reading: "/Newlouisreading.png",
  praying: "/Newlouispraying.png",
  idea: "/Newlouisidea.png",
  thinking: "/Newlouisthinking.png",
  peace: "/Newlouispeace.png",
  think: "/Newlouisthinking.png",
  pray: "/Newlouispraying.png",
  sheesh: "/Newlouisthinking.png",
  bible: "/Newlouisreading.png",
  smile: "/Newlouispeace.png",
  cool: "/Newlouispeace.png",
  hands: "/Newlouisstareyes.png",
  salute: "/Newlouiswave.png",
  sideeye: "/Newlouisthinking.png",
};

function BuddyIllustration({ buddyId, mood, size }: { buddyId: BuddyAvatarId; mood: LouisMood; size: number }) {
  const buddy = getBuddyAvatar(buddyId);
  const isPrayer = mood === "pray";
  const isExcited = mood === "stareyes" || mood === "hands";
  const isThinking = mood === "think";
  const eye = isExcited ? "★" : isThinking ? "•" : "●";

  return (
    <div
      aria-label={`${buddy.name} avatar`}
      className="relative select-none overflow-hidden rounded-full"
      style={{ width: size, height: size, backgroundColor: buddy.colors.bg }}
    >
      <div
        className="absolute rounded-full"
        style={{
          left: size * 0.19,
          top: size * 0.18,
          width: size * 0.62,
          height: size * 0.62,
          backgroundColor: buddy.colors.face,
          boxShadow: "inset 0 -5px 0 rgba(0,0,0,0.08)",
        }}
      />
      <div
        className="absolute"
        style={{
          left: size * 0.2,
          top: size * 0.1,
          width: size * 0.6,
          height: size * 0.28,
          borderRadius: "999px 999px 55% 55%",
          backgroundColor: buddy.colors.hair,
        }}
      />
      {buddyId === "ezra" ? (
        <div
          className="absolute rounded-full bg-white/90"
          style={{ left: size * 0.24, top: size * 0.15, width: size * 0.52, height: size * 0.13 }}
        />
      ) : null}
      {buddyId === "josiah" ? (
        <div
          className="absolute"
          style={{
            left: size * 0.32,
            top: size * 0.02,
            width: size * 0.36,
            height: size * 0.2,
            backgroundColor: buddy.colors.accent,
            clipPath: "polygon(0 80%, 18% 30%, 38% 72%, 50% 15%, 62% 72%, 82% 30%, 100% 80%)",
          }}
        />
      ) : null}
      <div className="absolute flex items-center justify-center font-black text-white" style={{ left: size * 0.32, top: size * 0.39, width: size * 0.12, height: size * 0.12, fontSize: size * 0.11 }}>
        {eye}
      </div>
      <div className="absolute flex items-center justify-center font-black text-white" style={{ right: size * 0.32, top: size * 0.39, width: size * 0.12, height: size * 0.12, fontSize: size * 0.11 }}>
        {eye}
      </div>
      <div
        className="absolute rounded-full"
        style={{
          left: size * 0.4,
          top: size * 0.56,
          width: size * 0.2,
          height: isPrayer ? size * 0.04 : size * 0.09,
          borderBottom: `${Math.max(2, size * 0.035)}px solid #fff`,
        }}
      />
      <div
        className="absolute"
        style={{
          left: size * 0.18,
          bottom: -size * 0.08,
          width: size * 0.64,
          height: size * 0.32,
          borderRadius: "45% 45% 0 0",
          backgroundColor: buddy.colors.robe,
          borderTop: `${Math.max(3, size * 0.06)}px solid ${buddy.colors.accent}`,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          right: size * 0.13,
          bottom: size * 0.16,
          width: size * 0.17,
          height: size * 0.17,
          backgroundColor: buddy.colors.accent,
          opacity: mood === "wave" || mood === "hands" || mood === "salute" ? 1 : 0,
        }}
      />
      <div className="absolute inset-0 rounded-full ring-1 ring-black/5" />
    </div>
  );
}

export function LouisAvatar({ mood = "wave", size = 72, buddyId }: LouisAvatarProps) {
  const [selectedBuddy, setSelectedBuddy] = useState<BuddyAvatarId>(buddyId ?? DEFAULT_BUDDY_AVATAR);

  useEffect(() => {
    if (buddyId) {
      setSelectedBuddy(buddyId);
      return;
    }

    function loadSelectedBuddy() {
      if (typeof window === "undefined") return;
      setSelectedBuddy(normalizeBuddyAvatarId(window.localStorage.getItem(SELECTED_BUDDY_STORAGE_KEY)));
    }

    loadSelectedBuddy();
    window.addEventListener("bb:selected-buddy-avatar-changed", loadSelectedBuddy);
    window.addEventListener("storage", loadSelectedBuddy);
    return () => {
      window.removeEventListener("bb:selected-buddy-avatar-changed", loadSelectedBuddy);
      window.removeEventListener("storage", loadSelectedBuddy);
    };
  }, [buddyId]);

  if (selectedBuddy !== "louis") {
    return <BuddyIllustration buddyId={selectedBuddy} mood={mood} size={size} />;
  }

  // fall back to wave if something weird ever gets passed in
  const src = moodToFile[mood] ?? moodToFile.wave;

  return (
    <img
      src={src}
      alt="Louis avatar"
      width={size}
      height={size}
      className="rounded-full select-none"
    />
  );
}
