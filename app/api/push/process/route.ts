import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";
import { apnsConfigured, sendApnsPush } from "@/lib/apnsSender";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PushJobRow = {
  id: string;
  user_id: string;
  payload: {
    title?: string;
    body?: string;
    url?: string;
    type?: string;
    notificationId?: string;
  } | null;
  attempts: number;
};

type PushSubscriptionRow = {
  id: string;
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
};

function cleanNotificationBody(actorName: string | null, message: string | null | undefined) {
  let body = (message || "").trim() || "sent you a new alert";

  for (let i = 0; i < 4; i += 1) {
    body = body.replace(/^\s*from bible buddy[:\s-]*/i, "").trim();

    if (actorName) {
      const actorPrefix = `${actorName} `.toLowerCase();
      if (body.toLowerCase().startsWith(actorPrefix)) {
        body = body.slice(actorName.length + 1).trim();
      }
    }
  }

  return body || "sent you a new alert";
}

function normalizePushPayload(payload: PushJobRow["payload"]) {
  const rawTitle = (payload?.title || "").trim();
  const actorName =
    rawTitle.replace(/\s+from Bible Buddy\s*$/i, "").trim() ||
    null;
  const body = cleanNotificationBody(actorName, payload?.body);
  const title = actorName || rawTitle || "Bible Buddy";

  return {
    title,
    body,
    url: payload?.url || "/dashboard",
    type: payload?.type || "notification",
    notificationId: payload?.notificationId || null,
  };
}

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
  const vapidSubject = process.env.VAPID_SUBJECT || "mailto:support@mybiblebuddy.net";

  if (!supabaseUrl || !serviceKey || !vapidPublicKey || !vapidPrivateKey) {
    return NextResponse.json({ error: "Push notifications are not configured on the server." }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);

  const { data: jobs, error: jobsError } = await supabase
    .from("push_notification_jobs")
    .select("id, user_id, payload, attempts")
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(50);

  if (jobsError) {
    return NextResponse.json({ error: jobsError.message }, { status: 500 });
  }

  const pendingJobs = (jobs || []) as PushJobRow[];
  if (pendingJobs.length === 0) {
    return NextResponse.json({ ok: true, processed: 0 });
  }

  const userIds = [...new Set(pendingJobs.map((job) => job.user_id))];
  const { data: subscriptions, error: subscriptionsError } = await supabase
    .from("push_subscriptions")
    .select("id, user_id, endpoint, p256dh, auth")
    .in("user_id", userIds);

  if (subscriptionsError) {
    return NextResponse.json({ error: subscriptionsError.message }, { status: 500 });
  }

  // Phones, as well as browsers (Louis, 2026-10-17: no notification on a new
  // DM). iOS delivers through APNs, not the Push API, so an app install has a
  // device token here and no push_subscriptions row at all.
  const tokensByUser = new Map<string, string[]>();
  if (apnsConfigured()) {
    const { data: deviceRows } = await supabase
      .from("native_push_tokens")
      .select("token, user_id")
      .in("user_id", userIds);
    for (const row of deviceRows || []) {
      const current = tokensByUser.get(row.user_id) || [];
      current.push(row.token);
      tokensByUser.set(row.user_id, current);
    }
  }

  const subsByUser = new Map<string, PushSubscriptionRow[]>();
  ((subscriptions || []) as PushSubscriptionRow[]).forEach((subscription) => {
    const current = subsByUser.get(subscription.user_id) || [];
    current.push(subscription);
    subsByUser.set(subscription.user_id, current);
  });

  let processed = 0;

  for (const job of pendingJobs) {
    const userSubscriptions = subsByUser.get(job.user_id) || [];
    const normalizedPayload = normalizePushPayload(job.payload);

    const deviceTokens = tokensByUser.get(job.user_id) || [];

    if (userSubscriptions.length === 0 && deviceTokens.length === 0) {
      await supabase
        .from("push_notification_jobs")
        .update({
          status: "no_subscription",
          attempts: job.attempts + 1,
          last_error: "No active push subscriptions for this user.",
          updated_at: new Date().toISOString(),
        })
        .eq("id", job.id);
      processed += 1;
      continue;
    }

    let sentAny = false;
    let lastError: string | null = null;
    /**
     * Kept separate, and never erased (Louis, 2026-10-24).
     *
     * This is the bug that hid the real one for a fortnight. sentAny was set
     * by EITHER channel, and last_error was written as `sentAny ? null :
     * lastError` - so whenever the web subscription succeeded, the job was
     * marked "sent" and the APNs failure was thrown away. Three notifications
     * read "sent" with no error while Louis's phone showed nothing, and I
     * twice told him that proved his phone had received them. It proved only
     * that a stale Safari web-push subscription from 7 October was still
     * accepting them.
     *
     * Louis said it was the web notifications from the first hour. It was.
     */
    let apnsError: string | null = null;

    if (deviceTokens.length > 0) {
      const apns = await sendApnsPush(deviceTokens, normalizedPayload);
      if (apns.sent > 0) sentAny = true;
      if (apns.lastError) {
        lastError = apns.lastError;
        apnsError = apns.lastError;
      }
      if (apns.sent === 0 && !apns.lastError) {
        apnsError = "APNs accepted nothing and reported no error";
      }
      // A token Apple has disowned will never work again; keeping it only
      // guarantees an error on every future notification.
      for (const dead of apns.dead) {
        await supabase.from("native_push_tokens").delete().eq("token", dead);
      }
    }

    /**
     * A phone wins outright over a browser subscription.
     *
     * Louis has an app install AND a Safari web-push subscription from
     * before it existed. Sending to both means a doubled notification at
     * best, and at worst exactly what happened here: the browser one quietly
     * succeeds and nothing ever investigates the phone. Web push is for
     * people without the app.
     */
    const webTargets = deviceTokens.length > 0 ? [] : userSubscriptions;

    for (const subscription of webTargets) {
      try {
        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dh,
              auth: subscription.auth,
            },
          },
          JSON.stringify(normalizedPayload)
        );
        sentAny = true;
      } catch (error: any) {
        lastError = error?.body || error?.message || "Unknown push error";
        const statusCode = error?.statusCode;
        if (statusCode === 404 || statusCode === 410) {
          await supabase.from("push_subscriptions").delete().eq("id", subscription.id);
        }
      }
    }

    await supabase
      .from("push_notification_jobs")
      .update({
        payload: normalizedPayload,
        status: sentAny ? "sent" : "failed",
        attempts: job.attempts + 1,
        sent_at: sentAny ? new Date().toISOString() : null,
        // An APNs failure is recorded even when something else succeeded.
        // Erasing it is what made this invisible.
        last_error: apnsError ?? (sentAny ? null : lastError),
        updated_at: new Date().toISOString(),
      })
      .eq("id", job.id);

    processed += 1;
  }

  return NextResponse.json({ ok: true, processed });
}
