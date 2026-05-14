import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { ActionType } from "./actionTypes";

export interface ConsumeCreditResult {
  ok: boolean;
  reason?: "no_credits" | "missing_profile" | "config" | "error";
  dailyCredits?: number;
}

function getSupabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceKey || !url) {
    return null;
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function consumeCredit(
  userId: string,
  actionType: ActionType,
  actionLabel?: string | null
): Promise<ConsumeCreditResult> {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    console.error("[CONSUME_CREDIT] Supabase service role key or URL not configured");
    return { ok: false, reason: "config" };
  }

  const insertData: {
    user_id: string;
    action_type: ActionType;
    action_label?: string | null;
  } = {
    user_id: userId,
    action_type: actionType,
  };

  if (actionLabel !== undefined && actionLabel !== null) {
    insertData.action_label = actionLabel;
  }

  const { error: actionError } = await supabaseAdmin
    .from("master_actions")
    .insert(insertData);

  if (actionError) {
    console.error("[CONSUME_CREDIT] Error logging master_actions:", actionError);
    return { ok: false, reason: "error" };
  }

  return { ok: true };
}
