import { logActionToMasterActions } from "./actionRecorder";
import type { ActionType } from "./actionTypes";

const inFlight = new Set<string>();

type NavigationActionOptions = {
  userId: string;
  username?: string | null;
  actionType: ActionType;
  actionLabel?: string | null;
  dedupeKey: string;
};

function buildStorageKey(userId: string, dedupeKey: string) {
  return `bb_nav_action:${userId}:${dedupeKey}`;
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

  const storageKey = buildStorageKey(userId, dedupeKey);

  if (window.sessionStorage.getItem(storageKey) === "1") {
    return false;
  }

  if (inFlight.has(storageKey)) {
    return false;
  }

  inFlight.add(storageKey);
  window.sessionStorage.setItem(storageKey, "1");

  try {
    await logActionToMasterActions(userId, actionType, actionLabel, username ?? null);
    return true;
  } catch (error) {
    window.sessionStorage.removeItem(storageKey);
    throw error;
  } finally {
    inFlight.delete(storageKey);
  }
}
