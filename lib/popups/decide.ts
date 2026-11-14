/**
 * Which popup, if any, a person should see right now (Louis, 2026-11-13).
 *
 * PROPOSAL / PREVIEW. Nothing calls this for real users yet - only
 * scripts/verify-popups.ts and the "why / why not" view planned for the admin
 * page. See docs/POPUP_SYSTEM_PROPOSAL.md.
 *
 * It is a plain function on purpose: everything it needs is handed in, it
 * touches no network, no storage and no clock of its own, and it returns its
 * reasoning along with its answer. So the same call that decides what a
 * person sees can also explain, for any test account, why a popup would or
 * would not appear - and it can be tested without a browser.
 *
 * The rules, in the order they are applied:
 *
 *  1. If anything mandatory is on screen, or the person is in the middle of
 *     something (reading, typing, a game, a prayer), nobody gets a popup.
 *  2. One automatic popup per visit. A visit ends after 30 minutes of
 *     nothing; moving between pages, refreshing and opening a second tab are
 *     all the same visit.
 *  3. At least 20 hours between automatic popups, and never more than three
 *     in seven days, however many visits there are.
 *  4. Each popup is then checked on its own: switched on, not expired, right
 *     device, right section, account old enough, the person does not already
 *     use the feature (or, for a study sign-up, is not already signed up),
 *     and their own history with this popup allows it.
 *  5. Of what is left, timed things beat tutorials, tutorials beat
 *     announcements, announcements beat asks (get the app), and within a
 *     kind the higher priority wins.
 *
 * If nothing is left, nothing is shown. That is the common case and it is
 * the intended one.
 */

import { inSection, type PopupDefinition, type PopupDevice } from "./catalog";

export const VISIT_IDLE_MINUTES = 30;
export const HOURS_BETWEEN_POPUPS = 20;
export const MAX_POPUPS_PER_WEEK = 3;
/** Closed without acting: it may come back once, after this long. */
export const SNOOZE_DAYS_AFTER_CLOSE = 14;
/** Shown this many times without a click and it stops for good. */
export const MAX_AUTOMATIC_DISPLAYS = 2;

/** What we remember about one person and one popup. One row per pair. */
export type PopupHistory = {
  /** The content version they last saw. */
  version: number;
  displayCount: number;
  lastShownAt: string | null;
  dismissedAt: string | null;
  ctaClickedAt: string | null;
  /** They did the thing the popup was about. */
  completedAt: string | null;
  /** "Don't show this again". */
  neverAgain: boolean;
  nextEligibleAt: string | null;
};

/** Per-popup switches an admin can change without a deploy. */
export type PopupSettings = {
  enabled: boolean;
  priority?: number;
  expiresAt?: string | null;
};

export type DecideInput = {
  now: Date;
  pathname: string | null;
  catalog: PopupDefinition[];
  settings: Record<string, PopupSettings>;
  history: Record<string, PopupHistory>;
  /** The kinds of device this is. Empty on a laptop or inside the app. */
  devices: ReadonlySet<PopupDevice>;
  /** Action types this person has ever recorded. */
  usedActions: ReadonlySet<string>;
  /** Community studies this person is already signed up for, by slug. */
  joinedEvents?: ReadonlySet<string>;
  accountCreatedAt: string;
  /** Why now is a bad moment, or null. "typing", "a mandatory dialog"... */
  busy: string | null;
  /** An automatic popup was already shown in this visit. */
  shownThisVisit: boolean;
  /** When this person last saw ANY automatic popup, on any device. */
  lastAutomaticAt: string | null;
  automaticInLast7Days: number;
};

export type Verdict = { id: string; eligible: boolean; reason: string };

export type Decision = {
  chosen: PopupDefinition | null;
  /** The first rule that stopped everything, or null. */
  blockedBy: string | null;
  verdicts: Verdict[];
};

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

const after = (iso: string | null | undefined, now: Date) => Boolean(iso) && Date.parse(iso as string) > now.getTime();

/** Why this one popup cannot be shown to this person, or null if it can. */
export function whyNot(popup: PopupDefinition, input: DecideInput): string | null {
  const settings = input.settings[popup.id];
  if (!settings?.enabled) return "switched off";

  const expiresAt = settings.expiresAt ?? popup.expiresAt;
  if (expiresAt && Date.parse(expiresAt) <= input.now.getTime()) return "expired";

  if (popup.device && !input.devices.has(popup.device)) return "not on this device";

  const here = inSection(popup, input.pathname);
  if (popup.kind === "tutorial" && !here) return "not in its section";
  if (popup.kind === "announcement" && here) return "already in that section";

  const ageDays = (input.now.getTime() - Date.parse(input.accountCreatedAt)) / DAY;
  if (ageDays < popup.minAccountAgeDays) return `account is under ${popup.minAccountAgeDays} days old`;

  if (popup.usedWhen.some((action) => input.usedActions.has(action))) return "already uses the feature";
  if (popup.event && input.joinedEvents?.has(popup.event.slug)) return "already signed up";

  const past = input.history[popup.id];
  if (!past) return null;

  if (past.neverAgain) return "asked not to see it again";
  if (past.completedAt) return "already did it";
  // A new content version is the only thing that reopens a finished popup.
  const sameVersion = past.version >= popup.version;
  if (sameVersion && past.ctaClickedAt) return "already tapped the button";
  if (sameVersion && past.displayCount >= MAX_AUTOMATIC_DISPLAYS) return `already shown ${past.displayCount} times`;
  if (sameVersion && after(past.nextEligibleAt, input.now)) return "closed recently, waiting";
  return null;
}

/** The rules that stop every popup at once. */
export function globalBlock(input: DecideInput): string | null {
  if (input.busy) return `busy: ${input.busy}`;
  if (input.shownThisVisit) return "one already shown this visit";
  if (input.lastAutomaticAt && input.now.getTime() - Date.parse(input.lastAutomaticAt) < HOURS_BETWEEN_POPUPS * HOUR) {
    return `one shown in the last ${HOURS_BETWEEN_POPUPS} hours`;
  }
  if (input.automaticInLast7Days >= MAX_POPUPS_PER_WEEK) return `${MAX_POPUPS_PER_WEEK} already shown this week`;
  return null;
}

const KIND_RANK: Record<PopupDefinition["kind"], number> = { tutorial: 2, announcement: 1, ask: 0 };

export function decide(input: DecideInput): Decision {
  const verdicts: Verdict[] = input.catalog.map((popup) => {
    const reason = whyNot(popup, input);
    return { id: popup.id, eligible: reason === null, reason: reason ?? "eligible" };
  });

  const blockedBy = globalBlock(input);
  if (blockedBy) return { chosen: null, blockedBy, verdicts };

  const priorityOf = (popup: PopupDefinition) => input.settings[popup.id]?.priority ?? popup.priority;
  // Something with an end date is shown before something that can wait.
  const timed = (popup: PopupDefinition) => ((input.settings[popup.id]?.expiresAt ?? popup.expiresAt) ? 1 : 0);

  const eligible = input.catalog
    .filter((popup) => verdicts.find((verdict) => verdict.id === popup.id)?.eligible)
    .sort(
      (a, b) =>
        timed(b) - timed(a) ||
        KIND_RANK[b.kind] - KIND_RANK[a.kind] ||
        priorityOf(b) - priorityOf(a) ||
        a.id.localeCompare(b.id),
    );

  return { chosen: eligible[0] ?? null, blockedBy: null, verdicts };
}

/**
 * What a dismissal does to the history row. Close, Escape, a tap outside and
 * "Maybe later" are all the same answer - "not now" - so they are treated the
 * same: it may come back once, two weeks later, and then never.
 */
export function nextEligibleAfterClose(now: Date): string {
  return new Date(now.getTime() + SNOOZE_DAYS_AFTER_CLOSE * DAY).toISOString();
}

/**
 * Is this still the same visit? `lastActiveAt` is kept in localStorage, which
 * every tab shares, so a second tab or a refresh continues the visit rather
 * than starting a new one.
 */
export function sameVisit(lastActiveAt: string | null, now: Date): boolean {
  if (!lastActiveAt) return false;
  return now.getTime() - Date.parse(lastActiveAt) < VISIT_IDLE_MINUTES * 60_000;
}
