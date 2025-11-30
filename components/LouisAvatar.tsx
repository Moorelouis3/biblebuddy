"use client";

type LouisMood =
  | "wave"
  | "stareyes"
  | "think"
  | "pray"
  | "sheesh"
  | "bible";

type LouisAvatarProps = {
  mood?: LouisMood;
  size?: number;
};

const moodToFile: Record<LouisMood, string> = {
  wave: "/louis/louis-wave.png",
  stareyes: "/louis/louis-stareyes.png",
  think: "/louis/louis-think.png",
  pray: "/louis/louis-pray.png",
  sheesh: "/louis/louis-sheesh.png",
  bible: "/louis/louis-bible.png",
};

export function LouisAvatar({ mood = "wave", size = 72 }: LouisAvatarProps) {
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
