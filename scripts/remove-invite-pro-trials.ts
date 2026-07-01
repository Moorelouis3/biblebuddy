import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

function loadLocalEnv() {
  for (const file of [".env.local", ".env"]) {
    const fullPath = path.join(process.cwd(), file);
    if (!fs.existsSync(fullPath)) continue;
    for (const line of fs.readFileSync(fullPath, "utf8").split(/\r?\n/)) {
      const separator = line.indexOf("=");
      if (separator <= 0) continue;
      const key = line.slice(0, separator).trim();
      if (!key || process.env[key]) continue;
      let value = line.slice(separator + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
}

async function loadAllPaidCustomerEmails(stripe: Stripe) {
  const emails = new Set<string>();
  let startingAfter: string | undefined;

  for (;;) {
    const page = await stripe.charges.list({
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
      expand: ["data.customer"],
    });
    for (const charge of page.data) {
      if (!charge.paid || charge.refunded || (charge.amount_captured || charge.amount) <= 0) continue;
      const customer = typeof charge.customer === "object" && charge.customer && !("deleted" in charge.customer)
        ? charge.customer
        : null;
      const email = (charge.billing_details.email || charge.receipt_email || customer?.email || "").trim().toLowerCase();
      if (email) emails.add(email);
    }
    if (!page.has_more || page.data.length === 0) break;
    startingAfter = page.data[page.data.length - 1]?.id;
  }

  return emails;
}

async function main() {
  loadLocalEnv();
  const apply = process.argv.includes("--apply");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!url || !serviceKey || !stripeKey) throw new Error("Supabase or Stripe environment variables are missing.");

  const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const stripe = new Stripe(stripeKey, { apiVersion: "2025-12-15.clover" });
  const { data: trialActions, error: actionError } = await supabase
    .from("master_actions")
    .select("user_id")
    .eq("action_type", "user_upgraded")
    .eq("action_label", "Bible Buddy invite 30-day Pro trial started");
  if (actionError) throw actionError;

  const candidateIds = Array.from(new Set((trialActions || []).map((row) => row.user_id).filter(Boolean))) as string[];
  const { data: profiles, error: profileError } = candidateIds.length
    ? await supabase
        .from("profile_stats")
        .select("user_id, is_paid, membership_status, pro_expires_at, member_badge")
        .in("user_id", candidateIds)
        .not("pro_expires_at", "is", null)
    : { data: [], error: null };
  if (profileError) throw profileError;

  const paidEmails = await loadAllPaidCustomerEmails(stripe);
  const protectedPaidIds = new Set<string>();
  const candidateIdSet = new Set(candidateIds);
  for (let page = 1; ; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    for (const user of data.users) {
      if (candidateIdSet.has(user.id) && user.email && paidEmails.has(user.email.toLowerCase())) {
        protectedPaidIds.add(user.id);
      }
    }
    if (data.users.length < 1000) break;
  }

  const targets = (profiles || []).filter((profile) => !protectedPaidIds.has(profile.user_id));
  console.log(JSON.stringify({ mode: apply ? "apply" : "dry-run", candidates: candidateIds.length, protectedPaid: protectedPaidIds.size, revoke: targets.length }, null, 2));
  if (!apply || targets.length === 0) return;

  for (const profile of targets) {
    const update: Record<string, string | boolean | null> = {
      is_paid: false,
      membership_status: "free",
      pro_expires_at: null,
    };
    if (profile.member_badge === "pro_trial") update.member_badge = null;
    const { error } = await supabase.from("profile_stats").update(update).eq("user_id", profile.user_id);
    if (error) throw error;
  }

  const auditRows = targets.map((profile) => ({
    user_id: profile.user_id,
    action_type: "trial_canceled",
    action_label: "Removed unintended invite-link Pro trial",
    account_status: "free",
    event_metadata: { source: "invite_trial_cleanup" },
    created_at: new Date().toISOString(),
  }));
  for (let index = 0; index < auditRows.length; index += 100) {
    const { error } = await supabase.from("master_actions").insert(auditRows.slice(index, index + 100));
    if (error) throw error;
  }

  console.log(`Revoked unintended invite Pro access for ${targets.length} users.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
