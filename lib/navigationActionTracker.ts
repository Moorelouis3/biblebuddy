import { logActionToMasterActions } from "./actionRecorder";
import type { ActionType } from "./actionTypes";
import { bibleLockActivityCompleted } from "./bibleLockActivities";

const inFlight = new Set<string>();

type NavigationActionOptions = {
  userId: string;
  username?: string | null;
  actionType: ActionType;
  actionLabel?: string | null;
  dedupeKey: string;
};

function buildStorageKey(userId: string, dedupeKey: string) {
  const now = new Date();
  const localDayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return `bb_nav_action:${userId}:${dedupeKey}:${localDayKey}`;
}

export async function trackNavigationActionOnce({
  userId,
  username,
  actionType,
  actionLabel,
  dedupeKey,
}: NavigationActionOptions): Promise<boolean> {
  if (typeof window === "undefined" || !userId) {
    return false;
  }

  // Before the once-a-day check below, not after it. That check stops the
  // same round being RECORDED twice in a day; it must not stop it counting
  // for Bible Lock. Somebody who plays a chapter's trivia in the morning,
  // locks their apps at lunch and plays it again has finished a round.
  bibleLockActivityCompleted(actionType);

  const storageKey = buildStorageKey(userId, dedupeKey);
  const storage = (() => {
    try {
      return window.localStorage;
    } catch {
      return window.sessionStorage;
    }
  })();

  if (storage.getItem(storageKey) === "1") {
    return false;
  }

  if (inFlight.has(storageKey)) {
    return false;
  }

  inFlight.add(storageKey);
  storage.setItem(storageKey, "1");

  try {
    await logActionToMasterActions(userId, actionType, actionLabel, username ?? null);
    return true;
  } catch (error) {
    storage.removeItem(storageKey);
    throw error;
  } finally {
    inFlight.delete(storageKey);
  }
}
