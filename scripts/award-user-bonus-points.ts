import dotenv from "dotenv";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const userId = process.argv[2];
const points = Number(process.argv[3] || "1000");
const campaignSlug = process.argv[4] || "jessica-april-2026";

if (!userId) {
  console.error("Usage: npx tsx scripts/award-user-bonus-points.ts <userId> [points] [campaignSlug]");
  process.exit(1);
}

if (!Number.isFinite(points) || points <= 0 || !Number.isInteger(points)) {
  console.error("Points must be a positive whole number.");
  process.exit(1);
}

const actionLabel = `admin_bonus_points:${points}:${campaignSlug}`;
const actionType = "trivia_question_answered";

async function main() {
  const { data: profile, error: profileError } = await supabase
    .from("profile_stats")
    .select("user_id, display_name, username")
    .eq("user_id", userId)
    .maybeSingle();

  if (profileError) {
    throw profileError;
  }

  const username =
    profile?.username ||
    profile?.display_name ||
    "Admin Bonus";

  const { data: existing, error: existingError } = await supabase
    .from("master_actions")
    .select("id")
    .eq("user_id", userId)
    .eq("action_type", actionType)
    .eq("action_label", actionLabel)
    .limit(1)
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existing?.id) {
    console.log(`Bonus already exists for ${userId} with label ${actionLabel}.`);
    return;
  }

  const { error: insertError } = await supabase.from("master_actions").insert({
    user_id: userId,
    action_type: actionType,
    action_label: actionLabel,
    username,
  });

  if (insertError) {
    throw insertError;
  }

  console.log(`Awarded ${points} bonus points to ${userId} with label ${actionLabel}.`);
}

main().catch((error) => {
  console.error("Failed to award bonus points:", error);
  process.exit(1);
});
