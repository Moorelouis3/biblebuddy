import { isNativeApp, nativePlatform } from "@/lib/nativeApp";
import { supabase } from "@/lib/supabaseClient";

/**
 * Remote push inside the store apps (Louis, 2026-10-11).
 *
 * The website uses Web Push: a browser push service, an endpoint URL and a
 * pair of keys, stored in push_subscriptions. None of that exists on iOS. The
 * app asks the OS for a device token and hands it to Apple's APNs, so the
 * token goes in its own table, native_push_tokens.
 *
 * SWITCHED OFF until Stage 2. Registering needs the Push Notifications
 * capability, which needs a paid Developer Program membership and an APNs
 * key - none of which exist in October. Asking for notification permission
 * before anything can be delivered would spend the one prompt iOS gives you
 * and deliver nothing, so it waits for NEXT_PUBLIC_NATIVE_PUSH_ENABLED.
 *
 * Written now so that switching it on is an environment variable plus
 * certificates, rather than a feature to build the week before submission.
 *
 * The daily reading reminder does NOT depend on this - it is a local
 * notification scheduled by the phone (lib/nativeReminders.ts) and already
 * works. This covers what only the server knows: a reply in your group, a
 * streak about to break.
 */

/**
 * On in the app unless it is explicitly switched off.
 *
 * It used to require NEXT_PUBLIC_NATIVE_PUSH_ENABLED === "true", which was
 * right while nothing could be delivered: spending the one notification prompt
 * iOS gives you, to deliver nothing, is how an app loses it for good. APNs is
 * configured now, so that reason is gone - and the flag was costing more than
 * it bought. NEXT_PUBLIC_ values are baked in when Vercel builds, so a
 * redeploy that reuses its build cache can leave the old value in the bundle,
 * and the symptom is exactly what Louis saw: open the app, no prompt, no
 * error, nothing to look at (2026-10-17).
 *
 * Set it to "off" to stop registering.
 */
export function nativePushEnabled(): boolean {
  return isNativeApp() && process.env.NEXT_PUBLIC_NATIVE_PUSH_ENABLED !== "off";
}

/** Loaded on demand: a top-level Capacitor import lands in the server bundle. */
async function pushPlugin() {
  if (!nativePushEnabled()) return null;
  try {
    const mod = await import("@capacitor/push-notifications");
    return mod.PushNotifications;
  } catch {
    return null;
  }
}

async function storeToken(token: string): Promise<void> {
  const platform = nativePlatform();
  if (platform === "web") return;
  try {
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;
    if (!accessToken) return;
    await fetch("/api/push/register-device", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ token, platform }),
    });
  } catch (error) {
    console.warn("[PUSH] could not store device token:", error);
  }
}

/**
 * Ask for permission, register with APNs, and remember the token.
 *
 * Call it once per session for a signed-in reader. Safe to call repeatedly:
 * the token is the primary key, so re-registering updates last_seen_at
 * rather than piling up rows.
 */
export async function registerForNativePush(
  onOpenUrl?: (url: string) => void,
): Promise<boolean> {
  const push = await pushPlugin();
  if (!push) return false;

  try {
    let permission = await push.checkPermissions();
    if (permission.receive === "prompt" || permission.receive === "prompt-with-rationale") {
      permission = await push.requestPermissions();
    }
    if (permission.receive !== "granted") return false;

    // Listeners before register(), or the first token can arrive with
    // nothing attached to catch it.
    await push.removeAllListeners();
    await push.addListener("registration", (token) => {
      void storeToken(token.value);
    });
    await push.addListener("registrationError", (error) => {
      console.warn("[PUSH] registration failed:", error);
    });
    await push.addListener("pushNotificationActionPerformed", (action) => {
      const url = action.notification?.data?.url;
      if (typeof url === "string" && url.startsWith("/")) onOpenUrl?.(url);
    });

    await push.register();
    return true;
  } catch (error) {
    console.warn("[PUSH] could not register:", error);
    return false;
  }
}
