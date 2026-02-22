import { supabase } from "../lib/supabaseClient";

export async function updateLastSeenUpdateVersion(userId: string, version: string) {
  await supabase
    .from("profile_stats")
    .update({ last_seen_update_version: version })
    .eq("user_id", userId);
}
