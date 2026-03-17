export type CustomMemberBadge = "moderator" | "top_buddy" | "founder_buddy";

export type ResolvedUserBadge = {
  key: "teacher" | "moderator" | "top_buddy" | "founder_buddy" | "pro_buddy";
  label: string;
  emoji: string;
  className: string;
  title: string;
  description: string;
  louisMood: "wave" | "stareyes" | "think" | "pray" | "sheesh" | "bible";
};

export const CUSTOM_MEMBER_BADGE_OPTIONS: Array<{
  value: "" | CustomMemberBadge;
  label: string;
}> = [
  { value: "", label: "No custom badge" },
  { value: "moderator", label: "Moderator" },
  { value: "top_buddy", label: "Top Buddy" },
  { value: "founder_buddy", label: "Founder Buddy" },
];

export function normalizeCustomMemberBadge(value: string | null | undefined): CustomMemberBadge | null {
  if (value === "moderator" || value === "top_buddy" || value === "founder_buddy") {
    return value;
  }
  return null;
}

export function resolveUserBadge(input: {
  customBadge?: string | null;
  isPaid?: boolean | null;
  groupRole?: string | null;
}): ResolvedUserBadge | null {
  const customBadge = normalizeCustomMemberBadge(input.customBadge);

  if (customBadge === "moderator") {
    return {
      key: "moderator",
      label: "Moderator",
      emoji: "🛡️",
      className: "bg-sky-100 text-sky-700",
      title: "Moderator",
      description: "This buddy helps keep Bible Buddy healthy, welcoming, and on track. Moderators are trusted to guide the community and support the flow of the group.",
      louisMood: "think",
    };
  }

  if (customBadge === "top_buddy") {
    return {
      key: "top_buddy",
      label: "Top Buddy",
      emoji: "🔥",
      className: "bg-orange-100 text-orange-700",
      title: "Top Buddy",
      description: "This buddy has stood out in Bible Buddy through strong activity, encouragement, and presence. Top Buddy highlights someone who is making a real impact here.",
      louisMood: "stareyes",
    };
  }

  if (customBadge === "founder_buddy") {
    return {
      key: "founder_buddy",
      label: "Founder Buddy",
      emoji: "⭐",
      className: "bg-amber-100 text-amber-700",
      title: "Founder Buddy",
      description: "This member has been with Bible Buddy from the beginning and has been instrumental in the growth and direction of Bible Buddy.",
      louisMood: "bible",
    };
  }

  if (input.groupRole === "leader") {
    return {
      key: "teacher",
      label: "Teacher",
      emoji: "👨‍🏫",
      className: "bg-green-100 text-green-700",
      title: "Teacher",
      description: "Louis is the owner and head teacher on Bible Buddy. This badge marks the person leading, guiding, and teaching inside the study group.",
      louisMood: "wave",
    };
  }

  if (input.groupRole === "moderator") {
    return {
      key: "moderator",
      label: "Moderator",
      emoji: "🛡️",
      className: "bg-sky-100 text-sky-700",
      title: "Moderator",
      description: "This buddy helps keep Bible Buddy healthy, welcoming, and on track. Moderators are trusted to guide the community and support the flow of the group.",
      louisMood: "think",
    };
  }

  if (input.isPaid) {
    return {
      key: "pro_buddy",
      label: "Pro Buddy",
      emoji: "🙏",
      className: "bg-violet-100 text-violet-700",
      title: "Pro Buddy",
      description: "This buddy is a paid Bible Buddy supporter. Pro Buddy members help support the app and unlock deeper Bible study features at the same time.",
      louisMood: "pray",
    };
  }

  return null;
}
