/**
 * READ-ONLY lifetime audit of the Lil Louis chat.
 *
 * Answers: how many people ever used it, how often, whether they came back,
 * what share of the userbase that is, and how often it answered with an
 * error instead of an answer. Written 2026-11-03 for the question "is this
 * a good feature"; re-run it any time.
 *
 *   npx tsx scripts/tmp-audit-lil-louis.ts
 *
 * Only .select() and auth.admin.listUsers(). Nothing is written anywhere.
 */
import fs from "fs";
import path from "path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !(match[1] in process.env)) process.env[match[1]] = match[2];
  }
}
loadEnvFile(path.join(process.cwd(), ".env.local"));
loadEnvFile(path.join(process.cwd(), ".env"));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
const db: SupabaseClient = createClient(SUPABASE_URL, KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const ACTIONS = ["louis_user_message_sent", "louis_ai_message_sent", "louis_opened"];

type Row = {
  user_id: string | null;
  action_type: string;
  action_label: string | null;
  created_at: string;
};

async function fetchAll(actionTypes: string[]): Promise<Row[]> {
  const out: Row[] = [];
  const PAGE = 1000;
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("master_actions")
      .select("user_id, action_type, action_label, created_at")
      .in("action_type", actionTypes)
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) break;
    out.push(...(data as Row[]));
    if (data.length < PAGE) break;
  }
  return out;
}

function day(ts: string) {
  return ts.slice(0, 10);
}
function month(ts: string) {
  return ts.slice(0, 7);
}

(async () => {
  console.log("Fetching master_actions…");
  const rows = await fetchAll(ACTIONS);
  console.log(`  ${rows.length} rows across ${ACTIONS.join(", ")}\n`);

  const byType = new Map<string, Row[]>();
  for (const r of rows) {
    if (!byType.has(r.action_type)) byType.set(r.action_type, []);
    byType.get(r.action_type)!.push(r);
  }

  console.log("=== LIFETIME TOTALS ===");
  for (const t of ACTIONS) {
    const rs = byType.get(t) || [];
    const users = new Set(rs.map((r) => r.user_id).filter(Boolean));
    console.log(
      `${t.padEnd(26)} ${String(rs.length).padStart(7)} events  ${String(users.size).padStart(5)} users  ` +
        (rs.length ? `${day(rs[0].created_at)} → ${day(rs[rs.length - 1].created_at)}` : "never"),
    );
  }

  const msgs = byType.get("louis_user_message_sent") || [];
  if (!msgs.length) {
    console.log("\nNo user messages recorded at all.");
    return;
  }

  // ---------------------------------------------------------------- per user
  const perUser = new Map<string, Row[]>();
  for (const r of msgs) {
    const k = r.user_id || "(null)";
    if (!perUser.has(k)) perUser.set(k, []);
    perUser.get(k)!.push(r);
  }
  const ranked = [...perUser.entries()].sort((a, b) => b[1].length - a[1].length);

  console.log(`\n=== WHO SENT THEM (${perUser.size} people, ${msgs.length} messages) ===`);
  const counts = ranked.map(([, rs]) => rs.length);
  const total = msgs.length;
  console.log(`median messages per person: ${counts[Math.floor(counts.length / 2)]}`);
  console.log(`mean:                       ${(total / perUser.size).toFixed(1)}`);
  const top1 = counts[0];
  const top3 = counts.slice(0, 3).reduce((a, b) => a + b, 0);
  const top10 = counts.slice(0, 10).reduce((a, b) => a + b, 0);
  console.log(
    `top 1 person:  ${top1} msgs (${((top1 / total) * 100).toFixed(0)}% of all traffic)`,
  );
  console.log(`top 3 people:  ${top3} msgs (${((top3 / total) * 100).toFixed(0)}%)`);
  console.log(`top 10 people: ${top10} msgs (${((top10 / total) * 100).toFixed(0)}%)`);

  const buckets = { "1": 0, "2-5": 0, "6-20": 0, "21-50": 0, "51+": 0 };
  for (const c of counts) {
    if (c === 1) buckets["1"]++;
    else if (c <= 5) buckets["2-5"]++;
    else if (c <= 20) buckets["6-20"]++;
    else if (c <= 50) buckets["21-50"]++;
    else buckets["51+"]++;
  }
  console.log("\nhow many messages each person ever sent:");
  for (const [label, n] of Object.entries(buckets)) {
    console.log(
      `  ${label.padEnd(6)} ${String(n).padStart(4)} people  (${((n / perUser.size) * 100).toFixed(0)}%)`,
    );
  }

  // days used: did anyone come back?
  const daysUsed = ranked.map(([, rs]) => new Set(rs.map((r) => day(r.created_at))).size);
  const oneDayOnly = daysUsed.filter((d) => d === 1).length;
  const threePlusDays = daysUsed.filter((d) => d >= 3).length;
  console.log(
    `\ncame back on a second day: ${perUser.size - oneDayOnly} of ${perUser.size} people (${(((perUser.size - oneDayOnly) / perUser.size) * 100).toFixed(0)}%)`,
  );
  console.log(
    `used it on 3+ separate days: ${threePlusDays} people (${((threePlusDays / perUser.size) * 100).toFixed(0)}%)`,
  );

  console.log("\ntop 10 users (messages, distinct days, first → last):");
  for (const [uid, rs] of ranked.slice(0, 10)) {
    const d = new Set(rs.map((r) => day(r.created_at))).size;
    console.log(
      `  ${uid.slice(0, 8)}  ${String(rs.length).padStart(4)} msgs  ${String(d).padStart(3)} days  ${day(rs[0].created_at)} → ${day(rs[rs.length - 1].created_at)}`,
    );
  }

  // ---------------------------------------------------------------- by month
  console.log("\n=== BY MONTH ===");
  const months = new Map<string, { msgs: number; users: Set<string>; opens: number }>();
  const ensure = (m: string) => {
    if (!months.has(m)) months.set(m, { msgs: 0, users: new Set(), opens: 0 });
    return months.get(m)!;
  };
  for (const r of msgs) {
    const m = ensure(month(r.created_at));
    m.msgs++;
    if (r.user_id) m.users.add(r.user_id);
  }
  for (const r of byType.get("louis_opened") || []) ensure(month(r.created_at)).opens++;
  console.log("month     messages  people  opens   msgs/person");
  for (const [m, v] of [...months.entries()].sort()) {
    console.log(
      `${m}   ${String(v.msgs).padStart(7)}  ${String(v.users.size).padStart(6)}  ${String(v.opens).padStart(6)}   ${v.users.size ? (v.msgs / v.users.size).toFixed(1) : "-"}`,
    );
  }

  // ---------------------------------------------------- share of the userbase
  console.log("\n=== SHARE OF THE USERBASE ===");
  let totalAccounts = 0;
  let page = 1;
  for (;;) {
    const { data, error } = await db.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) {
      console.log(`  (could not count accounts: ${error.message})`);
      break;
    }
    if (!data.users.length) break;
    totalAccounts += data.users.length;
    if (data.users.length < 1000) break;
    page++;
  }
  if (totalAccounts) {
    console.log(`accounts ever:            ${totalAccounts}`);
    console.log(
      `ever sent Louis a message: ${perUser.size} (${((perUser.size / totalAccounts) * 100).toFixed(1)}%)`,
    );
  }

  // how many ever opened it vs sent something
  const openUsers = new Set((byType.get("louis_opened") || []).map((r) => r.user_id).filter(Boolean));
  if (openUsers.size) {
    console.log(`opened the chat:          ${openUsers.size} people`);
    console.log(
      `…and actually typed:      ${perUser.size} (${((perUser.size / openUsers.size) * 100).toFixed(0)}% of openers)`,
    );
  }


  // --------------------------------------------------------- did it answer?
  // The route returns a generic apology on any failure, and the client logs
  // that apology as an AI message like any other. Counting them is the only
  // record we have of the chat being broken - an empty OpenAI balance looks
  // exactly like this from the user's side.
  console.log("\n=== HOW OFTEN IT FAILED INSTEAD OF ANSWERING ===");
  const BROKEN = /sorry, something went wrong|went wrong while i tried|api key is not configured|internal server error/i;
  const errors = (byType.get("louis_ai_message_sent") || []).filter((r) =>
    BROKEN.test(r.action_label || ""),
  );
  const msgsByMonth = new Map<string, number>();
  for (const r of msgs) msgsByMonth.set(month(r.created_at), (msgsByMonth.get(month(r.created_at)) || 0) + 1);
  const errByMonth = new Map<string, number>();
  for (const r of errors) errByMonth.set(month(r.created_at), (errByMonth.get(month(r.created_at)) || 0) + 1);
  console.log(
    `${errors.length} error replies against ${msgs.length} user messages — ` +
      `${((errors.length / msgs.length) * 100).toFixed(0)}% of everything anyone ever asked`,
  );
  console.log("month     asked   errored  failure rate");
  for (const [m, asked] of [...msgsByMonth.entries()].sort()) {
    const e = errByMonth.get(m) || 0;
    console.log(
      `${m}   ${String(asked).padStart(5)}   ${String(e).padStart(7)}  ${((e / asked) * 100).toFixed(0)}%`,
    );
  }

  // ------------------------------------------------------------ last 90 days
  const now = Date.now();
  const since = (d: number) => new Date(now - d * 86400000).toISOString();
  for (const d of [7, 30, 90]) {
    const cut = since(d);
    const rs = msgs.filter((r) => r.created_at >= cut);
    const us = new Set(rs.map((r) => r.user_id).filter(Boolean));
    console.log(`last ${String(d).padStart(2)} days: ${String(rs.length).padStart(5)} messages from ${us.size} people`);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
