export type PopupQueueType =
  | "account_blocker"
  | "streak_rescue"
  | "reward"
  | "daily_guidance"
  | "tip"
  | "store_promo";

export type PopupQueueItem<TPayload = Record<string, unknown>> = {
  popup_id: string;
  type: PopupQueueType;
  priority: number;
  user_id: string | null;
  show_after?: string | number | Date | null;
  expires_at?: string | number | Date | null;
  cooldown?: number | null;
  seen_at?: string | null;
  dismissed_at?: string | null;
  payload?: TPayload;
};

const POPUP_QUEUE_SESSION_SHOWN_KEY = "bb:popup-queue:session-shown";
const POPUP_QUEUE_LAST_NON_CRITICAL_KEY = "bb:popup-queue:last-non-critical";
const DEFAULT_NON_CRITICAL_COOLDOWN_MS = 60 * 60 * 1000;

export function isCriticalPopupType(type: PopupQueueType) {
  return type === "account_blocker" || type === "streak_rescue";
}

export function isRewardPopupType(type: PopupQueueType) {
  return type === "reward";
}

function toTime(value: PopupQueueItem["show_after"] | PopupQueueItem["expires_at"]) {
  if (!value) return null;
  const time = value instanceof Date ? value.getTime() : typeof value === "number" ? value : new Date(value).getTime();
  return Number.isFinite(time) ? time : null;
}

function getStorageKey(baseKey: string, userId: string | null) {
  return `${baseKey}:${userId || "anonymous"}`;
}

function getSessionStorageValue(key: string) {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function getLocalStorageNumber(key: string) {
  if (typeof window === "undefined") return 0;
  try {
    return Number(window.localStorage.getItem(key) || 0);
  } catch {
    return 0;
  }
}

export function getActivePopupFromQueue(items: PopupQueueItem[], nowMs = Date.now()) {
  const eligible = items.filter((item) => {
    if (!item.popup_id || item.seen_at || item.dismissed_at) return false;

    const showAfter = toTime(item.show_after);
    if (showAfter && showAfter > nowMs) return false;

    const expiresAt = toTime(item.expires_at);
    if (expiresAt && expiresAt <= nowMs) return false;

    const canBreakCooldown = isCriticalPopupType(item.type) || isRewardPopupType(item.type);
    if (canBreakCooldown || typeof window === "undefined") return true;

    const userScopedSessionKey = getStorageKey(POPUP_QUEUE_SESSION_SHOWN_KEY, item.user_id);
    if (getSessionStorageValue(userScopedSessionKey) === "1") return false;

    const cooldownMs = Math.max(0, item.cooldown ?? DEFAULT_NON_CRITICAL_COOLDOWN_MS);
    const lastShownAt = getLocalStorageNumber(getStorageKey(POPUP_QUEUE_LAST_NON_CRITICAL_KEY, item.user_id));
    return !lastShownAt || nowMs - lastShownAt >= cooldownMs;
  });

  return eligible.sort((a, b) => b.priority - a.priority || a.popup_id.localeCompare(b.popup_id))[0] ?? null;
}

export function markPopupShown(item: PopupQueueItem, shownAtMs = Date.now()) {
  if (typeof window === "undefined") return;
  if (isCriticalPopupType(item.type) || isRewardPopupType(item.type)) return;

  try {
    window.sessionStorage.setItem(getStorageKey(POPUP_QUEUE_SESSION_SHOWN_KEY, item.user_id), "1");
    window.localStorage.setItem(getStorageKey(POPUP_QUEUE_LAST_NON_CRITICAL_KEY, item.user_id), String(shownAtMs));
  } catch {
    // Popup state is best-effort; the UI should still work if storage is unavailable.
  }
}

export const POPUP_QUEUE_PRIORITIES = {
  accountBlocker: 1000,
  streakRescue: 900,
  reward: 700,
  dailyGuidance: 400,
  tip: 250,
  storePromo: 200,
} as const;

