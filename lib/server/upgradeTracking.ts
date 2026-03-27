import type { SupabaseClient } from "@supabase/supabase-js";

type TrackUpgradeParams = {
  supabase: SupabaseClient;
  userId: string;
  source: string;
  membershipStatus?: string | null;
  proExpiresAt?: string | null;
  actionLabel?: string | null;
};

type ProfileStatsRow = {
  user_id: string;
  is_paid: boolean | null;
  display_name?: string | null;
  username?: string | null;
};

export async function markUserAsPaidAndTrackUpgrade({
  supabase,
  userId,
  source,
  membershipStatus,
  proExpiresAt,
  actionLabel,
}: TrackUpgradeParams): Promise<{ upgradedNow: boolean }> {
  const { data: existingProfile, error: fetchError } = await supabase
    .from("profile_stats")
    .select("user_id, is_paid, display_name, username")
    .eq("user_id", userId)
    .maybeSingle();

  if (fetchError) {
    throw fetchError;
  }

  const profile = (existingProfile as ProfileStatsRow | null) ?? null;
  const wasPaid = profile?.is_paid === true;
  const updatePayload: Record<string, string | boolean | null> = {
    user_id: userId,
    is_paid: true,
  };

  if (membershipStatus !== undefined) {
    updatePayload.membership_status = membershipStatus;
  }

  if (proExpiresAt !== undefined) {
    updatePayload.pro_expires_at = proExpiresAt;
  }

  const { error: upsertError } = await supabase
    .from("profile_stats")
    .upsert(updatePayload, { onConflict: "user_id" });

  if (upsertError) {
    throw upsertError;
  }

  if (!wasPaid) {
    const username =
      profile?.display_name ||
      profile?.username ||
      "User";

    const { error: actionError } = await supabase.from("master_actions").insert({
      user_id: userId,
      username,
      action_type: "user_upgraded",
      action_label: actionLabel ?? source,
      created_at: new Date().toISOString(),
    });

    if (actionError) {
      throw actionError;
    }
  }

  return { upgradedNow: !wasPaid };
}
