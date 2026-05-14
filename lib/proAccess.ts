import { isProTrialActive, normalizeCustomMemberBadge } from "./userBadges";

export type ProAccessProfile = {
  is_paid?: boolean | null;
  member_badge?: string | null;
  pro_expires_at?: string | null;
};

export type ProAccessReason = "paid" | "moderator" | "teacher" | "founder_buddy" | "pro_trial";

export type ProAccessResult = {
  hasAccess: boolean;
  reason: ProAccessReason | null;
};

export function getProAccess(profile: ProAccessProfile | null | undefined): ProAccessResult {
  if (profile?.is_paid === true) {
    return { hasAccess: true, reason: "paid" };
  }

  const badge = normalizeCustomMemberBadge(profile?.member_badge);

  if (badge === "moderator") {
    return { hasAccess: true, reason: "moderator" };
  }

  if (badge === "teacher") {
    return { hasAccess: true, reason: "teacher" };
  }

  if (badge === "founder_buddy") {
    return { hasAccess: true, reason: "founder_buddy" };
  }

  if (badge === "pro_trial" && isProTrialActive(profile?.pro_expires_at)) {
    return { hasAccess: true, reason: "pro_trial" };
  }

  return { hasAccess: false, reason: null };
}

export function hasProAccess(profile: ProAccessProfile | null | undefined): boolean {
  return getProAccess(profile).hasAccess;
}
