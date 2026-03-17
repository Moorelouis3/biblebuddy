import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

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

  const subsByUser = new Map<string, PushSubscriptionRow[]>();
  ((subscriptions || []) as PushSubscriptionRow[]).forEach((subscription) => {
    const current = subsByUser.get(subscription.user_id) || [];
    current.push(subscription);
    subsByUser.set(subscription.user_id, current);
  });

  let processed = 0;

  for (const job of pendingJobs) {
    const userSubscriptions = subsByUser.get(job.user_id) || [];

    if (userSubscriptions.length === 0) {
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

    for (const subscription of userSubscriptions) {
      try {
        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.p256dh,
              auth: subscription.auth,
            },
          },
          JSON.stringify(job.payload || {})
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
        status: sentAny ? "sent" : "failed",
        attempts: job.attempts + 1,
        sent_at: sentAny ? new Date().toISOString() : null,
        last_error: sentAny ? null : lastError,
        updated_at: new Date().toISOString(),
      })
      .eq("id", job.id);

    processed += 1;
  }

  return NextResponse.json({ ok: true, processed });
}
