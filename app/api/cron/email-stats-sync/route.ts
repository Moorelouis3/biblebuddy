import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Keeps email_campaign_stats fresh (2026-09-11). Runs every 6 hours.
//
// Systeme.io has no stats API - I probed /newsletters, /campaigns, /emails,
// /statistics and every one 404s - so opens can only come from their
// dashboard and are filled in by hand. CLICKS we can measure better than
// they can: a click on a Systeme link lands on our site carrying their
// ?sc= tracking parameter, and taps from mail apps arrive with a Gmail /
// Outlook / Yahoo referrer. Counting those arrivals after a send gives a
// real "people who came back because of this email" number, which is the
// one that actually matters.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAIL_REFERRER = /android-app:\/\/com\.google\.android\.gm|mail\.google\.com|outlook\.(live|office)\.com|mail\.yahoo\.com|com\.google\.android\.gm/i;

function isEmailArrival(row: { page_path?: string | null; referrer?: string | null; source?: string | null }) {
  const path = row.page_path || "";
  const ref = row.referrer || "";
  const src = row.source || "";
  if (/[?&]sc=/.test(path)) return true;                       // Systeme click-tracking link
  if (/utm_source=email|utm_medium=(email|broadcast)/i.test(path)) return true;
  if (MAIL_REFERRER.test(ref)) return true;
  return /email/i.test(src);
}

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

  try {
    const { data: campaigns, error } = await supabase
      .from("email_campaign_stats")
      .select("id, name, sent_at, recipients")
      .not("sent_at", "is", null)
      .order("sent_at", { ascending: false })
      .limit(40);
    if (error) throw new Error(error.message);
    if (!campaigns?.length) {
      return NextResponse.json({ ok: true, updated: 0, note: "No campaigns recorded yet." });
    }

    // One pull of recent landing traffic covers every campaign window.
    const oldest = campaigns[campaigns.length - 1].sent_at as string;
    const since = new Date(Math.max(Date.parse(oldest), Date.now() - 90 * 24 * 60 * 60 * 1000)).toISOString();
    let landing: any[] = [];
    for (let page = 0; page < 12; page += 1) {
      const { data } = await supabase
        .from("landing_page_events")
        .select("session_id, user_id, page_path, referrer, source, created_at")
        .gte("created_at", since)
        .range(page * 1000, page * 1000 + 999);
      if (!data?.length) break;
      landing = landing.concat(data);
      if (data.length < 1000) break;
    }
    const emailArrivals = landing.filter(isEmailArrival);

    const updated: Array<{ name: string; siteVisits: number }> = [];
    for (const campaign of campaigns) {
      // Credit a campaign with email arrivals in the 7 days after it went
      // out - long enough for slow readers, short enough not to bleed into
      // the next send.
      const start = Date.parse(campaign.sent_at as string);
      const end = start + 7 * 24 * 60 * 60 * 1000;
      const people = new Set(
        emailArrivals
          .filter((row) => {
            const at = Date.parse(row.created_at);
            return at >= start && at < end;
          })
          .map((row) => row.user_id || row.session_id)
          .filter(Boolean),
      );
      await supabase
        .from("email_campaign_stats")
        .update({ site_visits: people.size, checked_at: new Date().toISOString() })
        .eq("id", campaign.id);
      updated.push({ name: campaign.name, siteVisits: people.size });
    }

    return NextResponse.json({ ok: true, updated: updated.length, campaigns: updated });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sync failed." },
      { status: 500 },
    );
  }
}
