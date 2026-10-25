import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sesSendingEnabled } from "@/lib/email/sesSender";
import { unsubscribeUrl } from "@/lib/email/unsubscribeLink";
import {
  SITE,
  alreadySent,
  button,
  claimAndSend,
  escapeHtml,
  isArmed,
  shell,
  usableFirstName,
} from "@/lib/email/triggerEmails";

/**
 * "You finished it" - trigger 3 (Louis, 2026-10-25).
 *
 * The rarest of the three and the most earned. Somebody who has just
 * completed a whole devotional has proved they will finish something, which
 * makes it the one moment where suggesting the next one is a service rather
 * than a pitch.
 *
 * HOW RARE, measured rather than assumed: 37 people have ever finished one,
 * and none in the last thirty days. 185 of 306 attempts stop before the
 * quarter mark. So this will fire a handful of times a month at best - which
 * is a reason to keep it cheap, not a reason to skip it, because the people
 * it reaches are the best readers on the list.
 *
 * WHAT IT SUGGESTS. The next published devotional they have not started,
 * shortest first - somebody coming off 60 days of Higher Hope is better
 * served by a 21 day study than by another 60.
 *
 * ONCE PER DEVOTIONAL FINISHED, not once ever: the send id carries the
 * devotional, so finishing a second one earns a second email.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

const CAMPAIGN_ID = "finished-devotional";
/** Catch the finish within a few days of it happening, not months later. */
const LOOKBACK_DAYS = 7;
const MAX_PER_RUN = 50;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const dryRun = new URL(request.url).searchParams.get("dry") === "1";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }
  const db = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  if (!dryRun && !sesSendingEnabled()) {
    return NextResponse.json({ ok: true, idle: true, reason: "SES is not configured" });
  }

  const armed = await isArmed(db, CAMPAIGN_ID);

  const { data: devotionals } = await db
    .from("devotionals")
    .select("id, title, total_days, is_published, available_from");
  const studies = (devotionals || []) as Array<{
    id: string; title: string; total_days: number | null; is_published: boolean | null; available_from: string | null;
  }>;
  const byId = new Map(studies.map((d) => [d.id, d]));

  const since = new Date(Date.now() - LOOKBACK_DAYS * 86_400_000).toISOString();
  const { data: recent, error } = await db
    .from("devotional_progress")
    .select("user_id, devotional_id, day_number, completed_at")
    .eq("is_completed", true)
    .gte("completed_at", since)
    .order("completed_at", { ascending: false })
    .limit(5000);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  /**
   * A finish is the LAST day of a study being completed inside the window.
   * Checking "their highest day >= total_days" instead would re-find the same
   * finish every run for anyone who keeps using the app.
   */
  const finishes = (recent || []).filter((r) => {
    const study = byId.get(r.devotional_id);
    return Boolean(study?.total_days) && r.day_number >= (study!.total_days as number);
  });

  if (finishes.length === 0) {
    return NextResponse.json({ ok: true, armed, finishes: 0, sent: 0 });
  }

  const { data: people } = await db
    .from("email_engagement")
    .select("user_id, email, first_name, suppressed")
    .in("user_id", finishes.map((f) => f.user_id));
  const reachable = new Map(
    (people || [])
      .filter((p) => p.email && !p.suppressed)
      .map((p) => [p.user_id as string, p as { email: string; first_name: string | null }]),
  );

  // What each of them has already touched, so the suggestion is not something
  // they are midway through.
  const { data: touched } = await db
    .from("devotional_progress")
    .select("user_id, devotional_id")
    .in("user_id", finishes.map((f) => f.user_id));
  const started = new Map<string, Set<string>>();
  for (const row of touched || []) {
    if (!started.has(row.user_id)) started.set(row.user_id, new Set());
    started.get(row.user_id)!.add(row.devotional_id);
  }

  const now = new Date().toISOString();
  const available = studies
    .filter((d) => d.is_published && (!d.available_from || d.available_from <= now))
    .sort((a, b) => (a.total_days ?? 999) - (b.total_days ?? 999));

  const queue: Array<{ userId: string; finished: string; next: typeof available[number] }> = [];
  for (const f of finishes) {
    if (!reachable.has(f.user_id)) continue;
    const mine = started.get(f.user_id) ?? new Set<string>();
    const next = available.find((d) => !mine.has(d.id));
    if (!next) continue;
    queue.push({ userId: f.user_id, finished: f.devotional_id, next });
    if (queue.length >= MAX_PER_RUN) break;
  }

  if (dryRun || !armed) {
    return NextResponse.json({
      ok: true,
      dryRun: true,
      armed,
      reason: armed ? undefined : `no armed '${CAMPAIGN_ID}' campaign row - reporting only, nothing sent`,
      finishes: finishes.length,
      reachable: queue.length,
      sample: queue.slice(0, 5).map((q) => ({
        finished: byId.get(q.finished)?.title,
        suggesting: `${q.next.title} (${q.next.total_days}d)`,
        greeting: usableFirstName(reachable.get(q.userId)?.first_name, reachable.get(q.userId)!.email),
      })),
    });
  }

  let sent = 0;
  for (const q of queue) {
    const person = reachable.get(q.userId)!;
    const name = usableFirstName(person.first_name, person.email);
    const done = byId.get(q.finished)?.title ?? "your study";
    const link = `${SITE}/devotionals/${q.next.id}`;
    // Per devotional finished, so a second finish earns a second email.
    const sendCampaignId = `${CAMPAIGN_ID}-${q.finished}`;
    const sentFor = await alreadySent(db, sendCampaignId);
    if (sentFor.has(person.email.toLowerCase())) continue;

    const subject = `You finished ${done}`;
    const text = [
      `Hey ${name}`,
      "",
      `You finished ${done}. All the way through.`,
      "",
      "Most people do not. You did.",
      "",
      `When you are ready for the next one, ${q.next.title} is ${q.next.total_days} days.`,
      "",
      `Start it: ${link}`,
      "",
      "Louis",
      "",
      `Unsubscribe: ${unsubscribeUrl(person.email)}`,
      "",
    ].join("\n");

    const html = shell(
      `<p style="margin:0 0 16px;font-size:17px;">Hey ${escapeHtml(name)}</p>
<p style="margin:0 0 16px;font-size:17px;">You finished <strong>${escapeHtml(done)}</strong>. All the way through.</p>
<p style="margin:0 0 16px;font-size:17px;">Most people do not. You did.</p>
<p style="margin:0 0 24px;font-size:17px;">When you are ready for the next one, ${escapeHtml(q.next.title)} is ${q.next.total_days} days.</p>
${button(link, `Start ${q.next.title}`)}
<p style="margin:0;font-size:17px;">Louis</p>`,
      unsubscribeUrl(person.email),
    );

    if (await claimAndSend(db, sendCampaignId, person, { subject, html, text })) sent += 1;
  }

  return NextResponse.json({ ok: true, armed, finishes: finishes.length, sent });
}
