import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Keeps email_campaign_stats fresh (2026-09-11). Runs every 6 hours.
//
// Two jobs: copy real delivery, open and click numbers out of SES into
// email_campaign_stats, and credit each send with the people who came back
// to the site in the week after it. Arrivals are spotted by a utm_source
// email tag or a Gmail / Outlook / Yahoo referrer. The ?sc= check below is
// Systeme's old click parameter, kept only so historical sends keep the
// visit numbers they already have - see docs/EMAIL_FUNNEL_RETIRED.md.

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

  // Systeme.io newsletter discovery lived here until 2026-11-10. Louis:
  // "we dont use sysmte.io anymore... we only use AWS". It polled
  // /api/mailing/newsletters every six hours and inserted a systeme-<id>
  // row for anything it found, with opens 0 because that endpoint never
  // returned them. Nothing new will ever appear there, so the poll is gone.
  //
  // The 13 systeme-* rows already in email_campaign_stats stay - they are
  // the record of those sends. So do the 27 systeme-* rows in
  // email_campaigns: that prefix is only an id left from the import, and
  // those campaigns send through OUR SES (systeme-5302997 went to 5,208
  // people with 8,162 SES events against it). See
  // docs/EMAIL_FUNNEL_RETIRED.md.
  /**
   * Campaigns we send ourselves, through SES (2026-10-11).
   *
   * The block above discovers sends from Systeme's API, so anything sent
   * through our own pipeline was invisible to the analytics page - the Moses
   * email went to 5,207 people and left no row at all. Worse, Systeme never
   * returns opens, so those rows are filled in by hand; SES gives us real
   * delivery, open and click events for free in email_events.
   *
   * Unique PEOPLE, not events: SES fires an Open every time a client loads the
   * pixel, so one reader who opens an email three times is one open, not three.
   */
  const sesSynced: string[] = [];
  try {
    const { data: own } = await supabase
      .from("email_campaigns")
      .select("campaign_id, subject, started_at, completed_at")
      .not("started_at", "is", null)
      .order("started_at", { ascending: false })
      .limit(25);

    for (const campaign of own || []) {
      const seen: Record<string, Set<string>> = {};
      for (let page = 0; page < 60; page += 1) {
        const { data: events, error: eventsError } = await supabase
          .from("email_events")
          .select("event_type, email")
          .eq("campaign_id", campaign.campaign_id)
          .range(page * 1000, page * 1000 + 999);
        if (eventsError) throw new Error(eventsError.message);
        if (!events?.length) break;
        for (const event of events) {
          const kind = String(event.event_type || "").toLowerCase();
          (seen[kind] ||= new Set()).add(event.email);
        }
        if (events.length < 1000) break;
      }

      const { count: sentCount } = await supabase
        .from("email_campaign_sends")
        .select("*", { count: "exact", head: true })
        .eq("campaign_id", campaign.campaign_id)
        .eq("status", "sent");

      const { error: upsertError } = await supabase.from("email_campaign_stats").upsert(
        {
          id: campaign.campaign_id,
          name: campaign.subject,
          kind: "ses",
          sent_at: campaign.started_at,
          recipients: sentCount ?? 0,
          opens: seen.open?.size ?? 0,
          clicks: seen.click?.size ?? 0,
          checked_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );
      // site_visits is deliberately left alone - the block below computes it
      // from arrivals, and overwriting it with 0 here would wipe that work.
      if (upsertError) console.error("[EMAIL_SYNC] ses upsert failed:", upsertError.message);
      else sesSynced.push(campaign.campaign_id);
    }
  } catch (error) {
    console.error("[EMAIL_SYNC] ses campaign sync failed:", error instanceof Error ? error.message : error);
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
      return NextResponse.json({ ok: true, updated: 0, sesSynced, note: "No campaigns recorded yet." });
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

    return NextResponse.json({ ok: true, updated: updated.length, campaigns: updated, sesSynced });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sync failed." },
      { status: 500 },
    );
  }
}
