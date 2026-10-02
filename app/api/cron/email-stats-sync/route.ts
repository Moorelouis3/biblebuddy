import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Keeps email_campaign_stats fresh (2026-09-11). Runs every 6 hours.
//
// Systeme DOES list newsletters, at /api/mailing/newsletters - the earlier
// note here said otherwise because it probed /newsletters and friends, which
// all 404. That list carries no send date, recipients, opens or clicks, so
// opens still come from their dashboard and are filled in by hand. CLICKS we can measure better than
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

  // Discover newsletters we have never recorded (2026-10-02). Louis sent four
  // and none appeared on the analytics page, because nothing ever created a
  // row - the cron only refreshed rows that already existed. The old note here
  // said Systeme has no newsletter endpoint; it does, the path is just
  // /api/mailing/newsletters rather than /api/newsletters. It still does NOT
  // return send date, recipients, opens or clicks, so a discovered send is
  // stamped with the time we first saw it and its opens stay 0 until Louis
  // fills them in. An email showing up with no opens beats it not showing up.
  const discovered: string[] = [];
  const systemeKey = process.env.SYSTEME_API_KEY;
  if (systemeKey) {
    try {
      const res = await fetch("https://api.systeme.io/api/mailing/newsletters", {
        headers: { "X-API-Key": systemeKey },
        cache: "no-store",
      });
      if (res.ok) {
        const payload = (await res.json()) as { items?: Array<{ id: number; content?: { subject?: string }; state?: { isSent?: boolean } }> };
        const sent = (payload.items || []).filter((item) => item?.state?.isSent && item?.content?.subject);
        const { data: known } = await supabase.from("email_campaign_stats").select("id, name");
        const knownIds = new Set((known || []).map((row) => String(row.id)));
        const knownNames = new Set((known || []).map((row) => String(row.name).trim().toLowerCase()));
        for (const item of sent) {
          const id = `systeme-${item.id}`;
          const subject = String(item.content?.subject || "").trim();
          if (knownIds.has(id) || knownNames.has(subject.toLowerCase())) continue;
          const { error: insertError } = await supabase.from("email_campaign_stats").insert({
            id,
            name: subject,
            kind: "newsletter",
            systeme_id: String(item.id),
            sent_at: new Date().toISOString(),
            recipients: 0,
            opens: 0,
            clicks: 0,
            site_visits: 0,
            checked_at: new Date().toISOString(),
          });
          if (insertError) console.error("[EMAIL_SYNC] could not add", subject, insertError.message);
          else discovered.push(subject);
        }
      } else {
        console.error("[EMAIL_SYNC] newsletter list failed:", res.status);
      }
    } catch (error) {
      console.error("[EMAIL_SYNC] newsletter discovery failed:", error instanceof Error ? error.message : error);
    }
  }

  try {
    const { data: campaigns, error } = await supabase
      .from("email_campaign_stats")
      .select("id, name, sent_at, recipients")
      .not("sent_at", "is", null)
      .order("sent_at", { ascending: false })
      .limit(40);
    if (error) throw new Error(error.message);
    if (!campaigns?.length) {
      return NextResponse.json({ ok: true, updated: 0, discovered, note: "No campaigns recorded yet." });
    }

    // Paged in created_at order inside each campaign's own window. The old
    // version pulled up to 12k unordered rows for 90 days at once; with more
    // traffic than that it never saw the days after a send, so every
    // campaign showed 0 site visits (found 2026-09-15). Blog arrivals from a
    // mail app count too.
    async function pageAll(table: string, columns: string, startIso: string, endIso: string) {
      const rows: any[] = [];
      for (let page = 0; page < 50; page += 1) {
        const { data, error: pageError } = await supabase
          .from(table)
          .select(columns)
          .gte("created_at", startIso)
          .lt("created_at", endIso)
          .order("created_at", { ascending: true })
          .range(page * 1000, page * 1000 + 999);
        if (pageError) throw new Error(pageError.message);
        if (!data?.length) break;
        rows.push(...data);
        if (data.length < 1000) break;
      }
      return rows;
    }

    const updated: Array<{ name: string; siteVisits: number }> = [];
    for (const campaign of campaigns) {
      // Credit a campaign with email arrivals in the 7 days after it went
      // out - long enough for slow readers, short enough not to bleed into
      // the next send.
      const start = Date.parse(campaign.sent_at as string);
      const startIso = new Date(start).toISOString();
      const endIso = new Date(Math.min(start + 7 * 24 * 60 * 60 * 1000, Date.now())).toISOString();
      if (startIso >= endIso) continue;
      const [landing, blog] = await Promise.all([
        pageAll("landing_page_events", "session_id, user_id, page_path, referrer, source, created_at", startIso, endIso),
        pageAll("blog_page_views", "session_id, user_id, referrer, created_at", startIso, endIso),
      ]);
      const people = new Set(
        [...landing.filter(isEmailArrival), ...blog.filter((row) => MAIL_REFERRER.test(row.referrer || ""))]
          .map((row) => row.user_id || row.session_id)
          .filter(Boolean),
      );
      await supabase
        .from("email_campaign_stats")
        .update({ site_visits: people.size, checked_at: new Date().toISOString() })
        .eq("id", campaign.id);
      updated.push({ name: campaign.name, siteVisits: people.size });
    }

    return NextResponse.json({ ok: true, updated: updated.length, campaigns: updated, discovered });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sync failed." },
      { status: 500 },
    );
  }
}
