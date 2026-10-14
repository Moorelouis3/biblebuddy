"use client";

import { registerPlugin } from "@capacitor/core";
import { isNativeApp } from "./nativeApp";
import { nativePluginAvailable } from "./nativeAuth";

/**
 * The Bible lock (Louis, 2026-10-14).
 *
 * The reader picks the apps that usually win their attention, and Bible Buddy
 * shields them until that day's reading is done.
 *
 * iOS only, and genuinely native - Apple's Screen Time frameworks have no web
 * surface, which is exactly why this is the first thing in Bible Buddy a
 * website could not do. The Swift lives in native/plugins/bible-lock.
 *
 * Nothing here ever learns which apps were chosen. Apple's picker returns
 * opaque tokens, the count is all that comes back across this bridge, and no
 * Screen Time data is read, stored or sent anywhere. That is also why this
 * adds nothing to the App Store privacy label.
 *
 * Needs the Family Controls (Distribution) entitlement, granted 2026-10-14,
 * and the capability on the App ID. Android blocks apps through a completely
 * different mechanism and is a separate piece of work.
 */

export type BibleLockStatus = {
  supported: boolean;
  authorized: boolean;
  /** How many apps and categories are selected. Never which. */
  chosen: number;
  locked: boolean;
};

type BibleLockPlugin = {
  isSupported(): Promise<{ supported: boolean }>;
  status(): Promise<BibleLockStatus>;
  requestAuthorization(): Promise<{ authorized: boolean }>;
  chooseApps(): Promise<{ chosen?: number; cancelled?: boolean }>;
  lock(): Promise<{ locked: boolean }>;
  clear(): Promise<{ locked: boolean }>;
};

const BibleLock = registerPlugin<BibleLockPlugin>("BibleLock");

const OFF: BibleLockStatus = { supported: false, authorized: false, chosen: 0, locked: false };

/**
 * Is the lock usable on this device right now?
 *
 * False on the web, on Android, on iOS 15, and in any installed build older
 * than the one that first carried the plugin - the JavaScript half of a
 * Capacitor plugin ships with the website and updates the moment Vercel
 * deploys, while the native half only changes when someone installs a new
 * build. Checking rather than assuming is what stops this throwing at people
 * who have simply not updated yet.
 */
export async function bibleLockAvailable(): Promise<boolean> {
  if (!isNativeApp() || !nativePluginAvailable("BibleLock")) return false;
  try {
    const { supported } = await BibleLock.isSupported();
    return supported;
  } catch {
    return false;
  }
}

export async function bibleLockStatus(): Promise<BibleLockStatus> {
  if (!(await bibleLockAvailable())) return OFF;
  try {
    return await BibleLock.status();
  } catch {
    return OFF;
  }
}

/**
 * Ask for permission. iOS shows its own Face ID prompt.
 *
 * Returns false when they decline, which is an ordinary answer and not an
 * error: the rest of the app must behave exactly as it did before.
 */
export async function requestBibleLockPermission(): Promise<boolean> {
  if (!(await bibleLockAvailable())) return false;
  try {
    const { authorized } = await BibleLock.requestAuthorization();
    return authorized;
  } catch {
    return false;
  }
}

/** Opens Apple's picker. Resolves with how many were chosen, or null if cancelled. */
export async function chooseAppsToLock(): Promise<number | null> {
  if (!(await bibleLockAvailable())) return null;
  const result = await BibleLock.chooseApps();
  if (result?.cancelled) return null;
  return result?.chosen ?? 0;
}

export async function lockChosenApps(): Promise<boolean> {
  if (!(await bibleLockAvailable())) return false;
  const { locked } = await BibleLock.lock();
  return locked;
}

/**
 * Give the phone back.
 *
 * Call this the moment the day's reading is marked complete, from the same
 * place that marks it, so the two can never disagree. It is also what the
 * "turn it off" control calls, and it asks no questions before doing it.
 */
export async function clearBibleLock(): Promise<void> {
  if (!isNativeApp() || !nativePluginAvailable("BibleLock")) return;
  try {
    await BibleLock.clear();
  } catch {
    // Nothing to clear, or an older build. Either way the phone is not locked.
  }
}
