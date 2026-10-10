/**
 * Engagement groups, the TypeScript side (Louis, 2026-10-10).
 *
 * The RULES are not here. Who is active, quiet or inactive is decided by the
 * email_engagement view in supabase/migrations/20261010_engagement_groups.sql,
 * and both the dashboard and the sender read that same view through the same
 * marketing_recipients() function. Re-deciding it in TypeScript is how a
 * dashboard ends up confidently showing a number that is not what goes out.
 *
 * What lives here is only the naming: the order the groups appear in, and the
 * words used on screen for each one's cadence.
 */

export const ENGAGEMENT_GROUPS = ["active", "quiet", "inactive"] as const;

export type EngagementGroup = (typeof ENGAGEMENT_GROUPS)[number];

export const GROUP_LABEL: Record<EngagementGroup, string> = {
  active: "Active",
  quiet: "Quiet",
  inactive: "Inactive",
};

/** The sending frequency shown under each count. Mirrors weekly_cap in SQL. */
export const GROUP_CADENCE: Record<EngagementGroup, string> = {
  active: "Every campaign",
  quiet: "Max 2 per 7 days",
  inactive: "Max 1 per 7 days",
};

/** Why someone is in the group, in one line, for the card itself. */
export const GROUP_RULE: Record<EngagementGroup, string> = {
  active: "Joined, read or clicked in the last 30 days",
  quiet: "Last activity 31-90 days ago",
  inactive: "Nothing for more than 90 days",
};

export const GROUP_STYLE: Record<EngagementGroup, string> = {
  active: "border-emerald-200 bg-emerald-50",
  quiet: "border-amber-200 bg-amber-50",
  inactive: "border-slate-200 bg-slate-50",
};

export type EngagementSummary = {
  active: number;
  quiet: number;
  inactive: number;
  eligible_total: number;
  suppressed_total: number;
  subscribers_total: number;
  /** Eligible people with no recorded activity, grouped on registration date. */
  eligible_without_history: number;
};

export type EngagementSubscriber = {
  email: string;
  first_name: string | null;
  engagement_group: EngagementGroup;
  registered_at: string;
  last_qualifying_activity_at: string | null;
  last_app_activity_at: string | null;
  last_app_action: string | null;
  last_human_click_at: string | null;
  last_open_at: string | null;
  opens_total: number;
  opens_that_look_human: number;
  activity_basis: "app_activity" | "email_click" | "registration";
  group_reason: string;
  marketing_sends_7d: number;
  weekly_cap: number | null;
  has_recorded_activity: boolean;
};

export function isEngagementGroup(value: unknown): value is EngagementGroup {
  return typeof value === "string" && (ENGAGEMENT_GROUPS as readonly string[]).includes(value);
}
