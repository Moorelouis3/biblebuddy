import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.log("Missing Supabase env vars after loading env files");
    process.exit(1);
  }

  const s = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  const now = new Date();
  const iso = (d: number) => new Date(now.getTime() - d * 86400000).toISOString();

  const [
    profilesAll,
    profilesPaid,
    ma24,
    ma30,
    upgrades30,
    trials30,
    dayView30,
    dayComplete30,
    landing30,
    activeRows7d,
  ] = await Promise.all([
    s.from("profile_stats").select("*", { count: "exact", head: true }),
    s.from("profile_stats").select("*", { count: "exact", head: true }).or("is_paid.eq.true,membership_status.eq.pro"),
    s.from("master_actions").select("*", { count: "exact", head: true }).gte("created_at", iso(1)),
    s.from("master_actions").select("*", { count: "exact", head: true }).gte("created_at", iso(30)),
    s.from("master_actions").select("*", { count: "exact", head: true }).eq("action_type", "user_upgraded").gte("created_at", iso(30)),
    s.from("master_actions").select("*", { count: "exact", head: true }).in("action_type", ["trial_started", "trial_canceled", "trial_converted"]).gte("created_at", iso(30)),
    s.from("master_actions").select("*", { count: "exact", head: true }).eq("action_type", "bible_in_one_year_day_viewed").gte("created_at", iso(30)),
    s.from("master_actions").select("*", { count: "exact", head: true }).in("action_type", ["bible_in_one_year_day_completed", "bible_in_one_year_reading_completed"]).gte("created_at", iso(30)),
    s.from("landing_page_events").select("*", { count: "exact", head: true }).gte("created_at", iso(30)),
    s.from("master_actions").select("user_id").gte("created_at", iso(7)).limit(250000),
  ]);

  const unique7d = new Set((activeRows7d.data || []).map((r: any) => r.user_id).filter(Boolean)).size;
  const totalProfiles = profilesAll.count || 0;
  const paidProfiles = profilesPaid.count || 0;

  console.log(
    JSON.stringify(
      {
        profiles_total: totalProfiles,
        profiles_paid_or_pro: paidProfiles,
        pay_rate_pct: totalProfiles ? Number(((paidProfiles / totalProfiles) * 100).toFixed(2)) : 0,
        master_actions_24h: ma24.count || 0,
        master_actions_30d: ma30.count || 0,
        unique_user_ids_7d: unique7d,
        upgrades_30d: upgrades30.count || 0,
        trial_events_30d: trials30.count || 0,
        bible_year_day_viewed_30d: dayView30.count || 0,
        bible_year_day_completed_30d: dayComplete30.count || 0,
        landing_events_30d: landing30.count || 0,
      },
      null,
      2,
    ),
  );
}

main();
