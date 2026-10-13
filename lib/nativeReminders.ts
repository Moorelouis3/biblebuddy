import { isNativeApp } from "@/lib/nativeApp";

/**
 * The daily reading reminder, inside the iOS/Android app (Louis, 2026-10-11).
 *
 * On the website the reminder arrives as web push: a cron writes a
 * notifications row, a trigger enqueues a push job, /api/push/process
 * delivers it. None of that reaches the store app, where web push is off
 * because remote notifications there go through APNs - so an App Store
 * install currently has no daily reminder at all, which is worse than the
 * website it wraps.
 *
 * This fills the gap without Apple: a local notification is scheduled by the
 * phone itself, repeating daily. No APNs key, no certificates, no paid
 * developer account - it works on a free one. Remote push comes later and
 * covers the things only the server knows about (group replies, streaks at
 * risk); this covers the one that matters most and needs nothing.
 *
 * Everything here no-ops on the web, so it is safe to call from shared code.
 */

/** Stable id so rescheduling replaces rather than stacks up. */
const DAILY_REMINDER_ID = 1;

/** Local time the reminder fires, until there is a setting for it. */
export const DEFAULT_REMINDER_HOUR = 8;

const PERMISSION_KEY = "bb:native-reminder-asked";

type Plugin = typeof import("@capacitor/local-notifications").LocalNotifications;

/**
 * Loaded on demand, never at module scope.
 *
 * Importing a Capacitor plugin at the top of a file drags it into the server
 * bundle, where `window` does not exist and Next renders this during SSR.
 */
async function plugin(): Promise<Plugin | null> {
  if (!isNativeApp()) return null;
  try {
    const mod = await import("@capacitor/local-notifications");
    return mod.LocalNotifications;
  } catch {
    return null;
  }
}

/** Whether the reminder is currently scheduled on this device. */
export async function isDailyReminderOn(): Promise<boolean> {
  const notifications = await plugin();
  if (!notifications) return false;
  try {
    const pending = await notifications.getPending();
    return pending.notifications.some((n) => n.id === DAILY_REMINDER_ID);
  } catch {
    return false;
  }
}

/**
 * Schedule (or re-schedule) the daily reminder.
 *
 * Returns false when it could not be set, including when the reader has said
 * no to notifications - which is a refusal to respect, not an error to retry.
 */
export async function scheduleDailyReminder(hour = DEFAULT_REMINDER_HOUR): Promise<boolean> {
  const notifications = await plugin();
  if (!notifications) return false;

  try {
    let permission = await notifications.checkPermissions();
    if (permission.display === "prompt" || permission.display === "prompt-with-rationale") {
      permission = await notifications.requestPermissions();
    }
    if (permission.display !== "granted") return false;

    // Replacing the same id rather than cancelling first: schedule() with an
    // existing id overwrites it, so a time change cannot leave two reminders
    // firing on the same device.
    await notifications.schedule({
      notifications: [
        {
          id: DAILY_REMINDER_ID,
          title: "Time with God",
          body: "Today's reading is ready in Bible Buddy.",
          // `on` with no date fields repeats: every day at this hour.
          schedule: { on: { hour, minute: 0 }, allowWhileIdle: true },
          // Tapping it opens the dashboard rather than wherever the app was
          // left, which is where the day's reading is.
          extra: { url: "/dashboard" },
        },
      ],
    });
    return true;
  } catch (error) {
    console.warn("[REMINDER] could not schedule:", error);
    return false;
  }
}

export async function cancelDailyReminder(): Promise<void> {
  const notifications = await plugin();
  if (!notifications) return;
  try {
    await notifications.cancel({ notifications: [{ id: DAILY_REMINDER_ID }] });
  } catch {
    // Nothing scheduled is the same outcome as cancelling one.
  }
}

/**
 * Set it up once, the first time someone opens the app.
 *
 * Asked once and only once: if they decline, the flag stays set and they are
 * never prompted again. A second notification prompt is how an app gets
 * deleted. A settings toggle can call scheduleDailyReminder directly later.
 */
export async function ensureDailyReminder(): Promise<void> {
  if (!isNativeApp()) return;
  if (typeof window === "undefined") return;

  try {
    if (window.localStorage.getItem(PERMISSION_KEY)) {
      // Already asked. Re-schedule only if they had said yes and something
      // cleared it - an OS update, a reinstall, a restore from backup.
      const notifications = await plugin();
      if (!notifications) return;
      const permission = await notifications.checkPermissions();
      if (permission.display === "granted" && !(await isDailyReminderOn())) {
        await scheduleDailyReminder();
      }
      return;
    }
    window.localStorage.setItem(PERMISSION_KEY, "1");
  } catch {
    // Private mode or blocked storage: fall through and just try to schedule.
  }

  await scheduleDailyReminder();
}
