import fs from "fs";
import path from "path";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { markUserAsPaidAndTrackUpgrade } from "../lib/server/upgradeTracking";

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  const envText = fs.readFileSync(filePath, "utf8");
  for (const line of envText.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    if (!(match[1] in process.env)) {
      process.env[match[1]] = match[2];
    }
  }
}

loadEnvFile(path.join(process.cwd(), ".env.local"));
loadEnvFile(path.join(process.cwd(), ".env"));

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const lifetimePriceId = "price_1TS1kMGDyj3itMVLMBLvYfK8";
const shouldApply = process.argv.includes("--apply");

if (!stripeSecretKey || !supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Stripe or Supabase environment variables.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-12-15.clover",
});

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

type RepairCandidate = {
  userId: string;
  sessionId: string;
  customerId: string | null;
  paymentIntentId: string | null;
  customerEmail: string | null;
  amountTotal: number | null;
  currency: string | null;
  createdAt: string;
  currentIsPaid: boolean;
  currentMembershipStatus: string | null;
};

async function collectLifetimeCheckoutSessions() {
  const sessions: Stripe.Checkout.Session[] = [];
  let startingAfter: string | undefined;

  while (true) {
    const page = await stripe.checkout.sessions.list({
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
      expand: ["data.line_items"],
    });
    sessions.push(...page.data);
    if (!page.has_more || page.data.length === 0) break;
    startingAfter = page.data[page.data.length - 1]?.id;
  }

  return sessions;
}

function isLifetimeSession(session: Stripe.Checkout.Session) {
  const metadataPlan = (session.metadata?.plan || "").toLowerCase();
  const lineItems = session.line_items?.data || [];
  return (
    metadataPlan === "lifetime" ||
    lineItems.some((item) => item.price?.id === lifetimePriceId)
  );
}

function isSuccessfulSession(session: Stripe.Checkout.Session) {
  return session.status === "complete" && session.payment_status === "paid";
}

async function main() {
  const sessions = await collectLifetimeCheckoutSessions();
  const qualifyingSessions = sessions.filter((session) => {
    const userId = session.metadata?.user_id;
    return Boolean(userId) && isLifetimeSession(session) && isSuccessfulSession(session);
  });

  const dedupedByUser = new Map<string, Stripe.Checkout.Session>();
  for (const session of qualifyingSessions) {
    const userId = session.metadata?.user_id;
    if (!userId) continue;
    const existing = dedupedByUser.get(userId);
    if (!existing || session.created > existing.created) {
      dedupedByUser.set(userId, session);
    }
  }

  const userIds = Array.from(dedupedByUser.keys());
  const profileRows =
    userIds.length > 0
      ? await supabase
          .from("profile_stats")
          .select("user_id, is_paid, membership_status")
          .in("user_id", userIds)
      : { data: [], error: null };

  if (profileRows.error) throw profileRows.error;

  const profileByUser = new Map(
    (profileRows.data || []).map((row) => [row.user_id as string, row]),
  );

  const candidates: RepairCandidate[] = [];

  for (const [userId, session] of dedupedByUser) {
    const profile = profileByUser.get(userId);
    const currentIsPaid = profile?.is_paid === true;
    const currentMembershipStatus =
      typeof profile?.membership_status === "string" ? profile.membership_status : null;

    if (currentIsPaid && currentMembershipStatus === "pro") continue;

    candidates.push({
      userId,
      sessionId: session.id,
      customerId: typeof session.customer === "string" ? session.customer : null,
      paymentIntentId:
        typeof session.payment_intent === "string" ? session.payment_intent : null,
      customerEmail: session.customer_details?.email || session.customer_email || null,
      amountTotal: typeof session.amount_total === "number" ? session.amount_total : null,
      currency: session.currency || null,
      createdAt: new Date(session.created * 1000).toISOString(),
      currentIsPaid,
      currentMembershipStatus,
    });
  }

  if (!shouldApply) {
    console.log(
      JSON.stringify(
        {
          mode: "dry-run",
          totalLifetimeSessions: qualifyingSessions.length,
          uniqueLifetimeUsers: userIds.length,
          repairCandidates: candidates.length,
          candidates: candidates.slice(0, 50),
          nextStep: "Run `npm run repair:lifetime-customers -- --apply` to apply these repairs.",
        },
        null,
        2,
      ),
    );
    return;
  }

  const repaired: string[] = [];
  for (const candidate of candidates) {
    await markUserAsPaidAndTrackUpgrade({
      supabase,
      userId: candidate.userId,
      source: "stripe_lifetime_repair",
      membershipStatus: "pro",
      proExpiresAt: null,
      accountStatus: "pro",
      sessionId: candidate.sessionId,
      eventMetadata: {
        repair: true,
        repairKind: "lifetime_checkout_backfill",
        checkoutSessionId: candidate.sessionId,
        stripeCustomerId: candidate.customerId,
        stripePaymentIntentId: candidate.paymentIntentId,
        customerEmail: candidate.customerEmail,
        amountTotal: candidate.amountTotal,
        currency: candidate.currency,
        plan: "lifetime",
        createdAt: candidate.createdAt,
      },
      actionLabel: "Lifetime upgrade repaired from Stripe history",
    });
    repaired.push(candidate.userId);
  }

  console.log(
    JSON.stringify(
      {
        mode: "apply",
        repairedUsers: repaired.length,
        repairedUserIds: repaired,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error("[repair-lifetime-customers] Failed:", error);
  process.exit(1);
});
