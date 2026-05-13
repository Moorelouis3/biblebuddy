export type CustomMemberBadge = "teacher" | "moderator" | "top_buddy" | "founder_buddy" | "buddy_partner" | "pro_trial";

export type ResolvedUserBadge = {
  key: "teacher" | "moderator" | "top_buddy" | "founder_buddy" | "pro_buddy" | "buddy_partner" | "pro_trial";
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
  { value: "teacher", label: "Teacher" },
  { value: "moderator", label: "Moderator" },
  { value: "top_buddy", label: "Top Buddy" },
  { value: "founder_buddy", label: "Founder Buddy" },
  { value: "buddy_partner", label: "Buddy Partner" },
  { value: "pro_trial", label: "Pro Trial" },
];

export function normalizeCustomMemberBadge(value: string | null | undefined): CustomMemberBadge | null {
  if (
    value === "teacher" ||
    value === "moderator" ||
    value === "top_buddy" ||
    value === "founder_buddy" ||
    value === "buddy_partner" ||
    value === "pro_trial"
  ) {
    return value;
  }
  return null;
}

export function isProTrialActive(expiresAt?: string | null): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt).getTime() > Date.now();
}

export function resolveUserBadge(input: {
  customBadge?: string | null;
  isPaid?: boolean | null;
  groupRole?: string | null;
  proExpiresAt?: string | null;
}): ResolvedUserBadge | null {
  const customBadge = normalizeCustomMemberBadge(input.customBadge);

  if (customBadge === "pro_trial" && (!input.proExpiresAt || isProTrialActive(input.proExpiresAt))) {
    return {
      key: "pro_trial",
      label: "Pro Trial",
      emoji: "ðŸ™",
      className: "bg-violet-100 text-violet-700",
      title: "Pro Trial",
      description: "This buddy has a 30-day Bible Buddy Pro trial. They get the Pro badge while their trial is active.",
      louisMood: "pray",
    };
  }

  if (customBadge === "buddy_partner") {
    return {
      key: "buddy_partner",
      label: "Buddy Partner",
      emoji: "🤝",
      className: "bg-teal-100 text-teal-700",
      title: "Buddy Partner",
      description: "This member is an official Bible Buddy Ambassador. They help grow the Bible Buddy community by sharing the app and inviting others to study God's Word.",
      louisMood: "stareyes",
    };
  }

  if (customBadge === "teacher") {
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
