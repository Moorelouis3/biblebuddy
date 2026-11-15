export type CustomMemberBadge = "teacher" | "moderator" | "top_buddy" | "founder_buddy" | "buddy_partner" | "pro_trial" | "pro_buddy";

export type ResolvedUserBadge = {
  key: "teacher" | "moderator" | "top_buddy" | "founder_buddy" | "pro_buddy" | "buddy_partner" | "pro_trial" | "new_buddy";
  label: string;
  emoji: string;
  className: string;
  title: string;
  description: string;
  louisMood: "wave" | "stareyes" | "think" | "pray" | "sheesh" | "bible";
};

/**
 * There is no Pro label any more (Louis, 2026-11-15: "remove pro label and
 * those people to the founder level"). The app has been free since August
 * 2026, so "Pro" described something that no longer exists. Everybody who
 * showed it - the people who paid, and the two given it by hand - shows
 * Founder Buddy instead: they are the ones who backed Bible Buddy early.
 *
 * Nothing in anybody's account was changed to do this. `pro_buddy`,
 * `pro_trial` and `is_paid` are still stored exactly as they were, and are
 * still read by the reports that count them; only what the label says is
 * decided here.
 */
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
];

export function normalizeCustomMemberBadge(value: string | null | undefined): CustomMemberBadge | null {
  if (
    value === "teacher" ||
    value === "moderator" ||
    value === "top_buddy" ||
    value === "founder_buddy" ||
    value === "buddy_partner" ||
    value === "pro_buddy" ||
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

/** How long the automatic New Buddy label lasts. */
export const NEW_BUDDY_DAYS = 14;

export function isNewBuddy(joinedAt?: string | null, now = Date.now()): boolean {
  if (!joinedAt) return false;
  const joined = Date.parse(joinedAt);
  if (Number.isNaN(joined)) return false;
  const age = now - joined;
  return age >= 0 && age < NEW_BUDDY_DAYS * 24 * 3_600_000;
}

const FOUNDER_DESCRIPTION =
  "This member has been with Bible Buddy from the early days and helped it grow. Founder Buddies are the people who backed Bible Buddy before it was free for everyone.";

export function resolveUserBadge(input: {
  customBadge?: string | null;
  isPaid?: boolean | null;
  groupRole?: string | null;
  proExpiresAt?: string | null;
  /** When the account was made. Only needed for the New Buddy label. */
  joinedAt?: string | null;
  /** 1-10 while this person is in this week's top ten, otherwise nothing. */
  topTenRank?: number | null;
}): ResolvedUserBadge | null {
  const customBadge = normalizeCustomMemberBadge(input.customBadge);

  // In this week's top ten: Top Buddy, ahead of ANY other label, for as long
  // as they are there (Louis, 2026-11-15: "it takes precedence over any other
  // label they have as long as they are in top 10; if they leave top 10 then
  // it goes to their default label if they have one"). Nothing is stored, so
  // dropping out needs nothing undone: the checks below simply decide again.
  // The rank comes from components/feed/useTopTenRank.ts, which reads the
  // same board the Top Buddies card shows.
  if (input.topTenRank && input.topTenRank >= 1 && input.topTenRank <= 10) {
    return {
      key: "top_buddy",
      label: "Top Buddy",
      emoji: "🔥",
      className: "bg-orange-100 text-orange-700",
      title: `Top Buddy · #${input.topTenRank} this week`,
      description:
        "One of the ten most active Bible Buddies this week. The board is at the top of the feed and changes as people study, so this label moves with it.",
      louisMood: "stareyes",
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

  if (customBadge === "founder_buddy" || customBadge === "pro_buddy" || customBadge === "pro_trial") {
    return {
      key: "founder_buddy",
      label: "Founder Buddy",
      emoji: "⭐",
      className: "bg-amber-100 text-amber-700",
      title: "Founder Buddy",
      description: FOUNDER_DESCRIPTION,
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

  // New Buddy (Louis, 2026-11-15): automatic for somebody's first two weeks,
  // so the regulars can see who to welcome. It is never stored and nobody
  // hands it out: it is worked out from the day the account was made, and it
  // is gone on day 15 without anything having to remove it. After that there
  // is deliberately no label at all - a "Buddy" label on seven thousand
  // people would say nothing and make the real ones mean less; the level chip
  // beside the name already shows how far somebody has come. Any label above
  // wins over it. A surface that does not pass joinedAt simply never shows it.
  if (!input.isPaid && isNewBuddy(input.joinedAt)) {
    return {
      key: "new_buddy",
      label: "New Buddy",
      emoji: "🌱",
      className: "bg-emerald-100 text-emerald-700",
      title: "New Buddy",
      description: `This buddy joined Bible Buddy in the last ${NEW_BUDDY_DAYS} days. Say hello and make them feel welcome.`,
      louisMood: "wave",
    };
  }

  // Paid when Bible Buddy was a paid app: a founder.
  if (input.isPaid) {
    return {
      key: "founder_buddy",
      label: "Founder Buddy",
      emoji: "⭐",
      className: "bg-amber-100 text-amber-700",
      title: "Founder Buddy",
      description: FOUNDER_DESCRIPTION,
      louisMood: "bible",
    };
  }

  return null;
}
