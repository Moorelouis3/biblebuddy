"use client";

import type { CSSProperties } from "react";
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

const walterMoodToFile: Partial<Record<LouisMood, string>> = {
  wave: "/Walterwaving.png",
  salute: "/Walterwaving.png",
  stareyes: "/WalterHappy.png",
  hands: "/WalterHappy.png",
  smile: "/WalterHappy.png",
  cool: "/WalterHappy.png",
  peace: "/WalterHappy.png",
  reading: "/Walterreading.png",
  bible: "/Walterreading.png",
  idea: "/Walterreading.png",
  thinking: "/Walterreading.png",
  think: "/Walterreading.png",
  praying: "/Walterreading.png",
  pray: "/Walterreading.png",
  sheesh: "/Walterreading.png",
  sideeye: "/Walterreading.png",
};

const lindseyMoodToFile: Partial<Record<LouisMood, string>> = {
  wave: "/Lindseywaving.png",
  salute: "/Lindseywaving.png",
  stareyes: "/Lindseyhappy.png",
  hands: "/Lindseyhappy.png",
  smile: "/Lindseyhappy.png",
  cool: "/Lindseyhappy.png",
  peace: "/Lindseyhappy.png",
  reading: "/Lindseyreading.png",
  bible: "/Lindseyreading.png",
  idea: "/Lindseyreading.png",
  thinking: "/Lindseyreading.png",
  think: "/Lindseyreading.png",
  praying: "/Lindseyreading.png",
  pray: "/Lindseyreading.png",
  sheesh: "/Lindseyreading.png",
  sideeye: "/Lindseyreading.png",
};

const steveMoodToFile: Partial<Record<LouisMood, string>> = {
  wave: "/Stevewaving.png",
  salute: "/Stevewaving.png",
  stareyes: "/Stevehappy.png",
  hands: "/Stevehappy.png",
  smile: "/Stevehappy.png",
  cool: "/Stevehappy.png",
  peace: "/Stevehappy.png",
  reading: "/Stevereading.png",
  bible: "/Stevereading.png",
  idea: "/Stevereading.png",
  thinking: "/Stevereading.png",
  think: "/Stevereading.png",
  praying: "/Stevereading.png",
  pray: "/Stevereading.png",
  sheesh: "/Stevereading.png",
  sideeye: "/Stevereading.png",
};

function BuddyIllustration({ buddyId, mood, size }: { buddyId: BuddyAvatarId; mood: LouisMood; size: number }) {
  const buddy = getBuddyAvatar(buddyId);
  const isPrayer = mood === "pray";
  const isExcited = mood === "stareyes" || mood === "hands";
  const isThinking = mood === "think";
  const eye = isExcited ? "★" : isThinking ? "•" : "●";

  return (
    <div
      data-buddy-avatar-root
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
      {buddyId === "walter" ? (
        <div
          className="absolute rounded-full bg-white/90"
          style={{ left: size * 0.24, top: size * 0.15, width: size * 0.52, height: size * 0.13 }}
        />
      ) : null}
      {buddyId === "steve" ? (
        <div
          className="absolute"
          style={{
            left: size * 0.32,
            top: size * 0.02,
            width: size * 0.36,
            height: size * 0.2,
            backgroundColor: buddy.colors.accent,
            clipPath: "polygon(0 30%, 100% 0, 88% 100%, 12% 100%)",
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

    function loadSelectedBuddy(event?: Event) {
      if (typeof window === "undefined") return;
      const detailBuddyId = (event as CustomEvent<{ buddyId?: string }> | undefined)?.detail?.buddyId;
      setSelectedBuddy(normalizeBuddyAvatarId(detailBuddyId || window.localStorage.getItem(SELECTED_BUDDY_STORAGE_KEY)));
    }

    loadSelectedBuddy();
    window.addEventListener("bb:selected-buddy-avatar-changed", loadSelectedBuddy);
    window.addEventListener("storage", loadSelectedBuddy);
    return () => {
      window.removeEventListener("bb:selected-buddy-avatar-changed", loadSelectedBuddy);
      window.removeEventListener("storage", loadSelectedBuddy);
    };
  }, [buddyId]);

  if (selectedBuddy === "walter") {
    const src = walterMoodToFile[mood] ?? "/Walterwaving.png";
    return (
      <span
        data-louis-avatar
        className="inline-flex shrink-0 items-center justify-center"
        style={{ "--bb-louis-avatar-size": `${size}px`, width: size, height: size } as CSSProperties}
      >
        <img
          src={src}
          alt="Walter avatar"
          className="h-full w-full rounded-full object-cover select-none"
        />
      </span>
    );
  }

  if (selectedBuddy === "lindsey") {
    const src = lindseyMoodToFile[mood] ?? "/Lindseywaving.png";
    return (
      <span
        data-louis-avatar
        className="inline-flex shrink-0 items-center justify-center"
        style={{ "--bb-louis-avatar-size": `${size}px`, width: size, height: size } as CSSProperties}
      >
        <img
          src={src}
          alt="Lindsey avatar"
          className="h-full w-full rounded-full object-cover select-none"
        />
      </span>
    );
  }

  if (selectedBuddy === "steve") {
    const src = steveMoodToFile[mood] ?? "/Stevewaving.png";
    return (
      <span
        data-louis-avatar
        className="inline-flex shrink-0 items-center justify-center"
        style={{ "--bb-louis-avatar-size": `${size}px`, width: size, height: size } as CSSProperties}
      >
        <img
          src={src}
          alt="Steve avatar"
          className="h-full w-full rounded-full object-cover select-none"
        />
      </span>
    );
  }

  if (selectedBuddy !== "louis") {
    return (
      <span
        data-louis-avatar
        className="inline-flex shrink-0 items-center justify-center"
        style={{ "--bb-louis-avatar-size": `${size}px`, width: size, height: size } as CSSProperties}
      >
        <BuddyIllustration buddyId={selectedBuddy} mood={mood} size={size} />
      </span>
    );
  }

  // fall back to wave if something weird ever gets passed in
  const src = moodToFile[mood] ?? moodToFile.wave;

  return (
    <span
      data-louis-avatar
      className="inline-flex shrink-0 items-center justify-center"
      style={{ "--bb-louis-avatar-size": `${size}px`, width: size, height: size } as CSSProperties}
    >
      <img
        src={src}
        alt="Louis avatar"
        className="h-full w-full rounded-full object-cover select-none"
      />
    </span>
  );
}
