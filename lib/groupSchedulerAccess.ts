import type { SupabaseClient } from "@supabase/supabase-js";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

export async function canManageGroupScheduler(
  supabaseAdmin: SupabaseClient,
  groupId: string,
  userId: string,
  userEmail?: string | null,
) {
  if (userEmail?.toLowerCase() === ADMIN_EMAIL) {
    return true;
  }

  const [{ data: group, error: groupError }, { data: membership, error: membershipError }] = await Promise.all([
    supabaseAdmin
      .from("study_groups")
      .select("leader_user_id")
      .eq("id", groupId)
      .maybeSingle(),
    supabaseAdmin
      .from("group_members")
      .select("user_id")
      .eq("group_id", groupId)
      .eq("user_id", userId)
      .eq("status", "approved")
      .maybeSingle(),
  ]);

  if (groupError) {
    throw new Error(groupError.message || "Could not verify study group access.");
  }

  if (membershipError) {
    throw new Error(membershipError.message || "Could not verify group membership.");
  }

  if (group?.leader_user_id && group.leader_user_id === userId) {
    return true;
  }

  return Boolean(membership?.user_id);
}
