import { supabase } from "./supabaseClient";

export async function awardDiamonds(userId: string, amount: number): Promise<number> {
  const diamondAmount = Math.max(0, Math.floor(amount));
  if (!userId || diamondAmount <= 0) return 0;

  const { data, error } = await supabase
    .from("profile_stats")
    .select("user_id, diamonds_count, total_diamonds_earned")
    .eq("user_id", userId)
    .maybeSingle();

  if (error && /diamonds_count|total_diamonds_earned/i.test(error.message || "")) {
    console.warn("[DIAMONDS] Columns are not available yet. Run the diamonds migration.");
    return 0;
  }

  if (error) {
    console.warn("[DIAMONDS] Could not read diamond wallet:", error);
    return 0;
  }

  const nextDiamonds = Math.max(0, Number(data?.diamonds_count ?? 0)) + diamondAmount;
  const nextTotalEarned = Math.max(0, Number(data?.total_diamonds_earned ?? 0)) + diamondAmount;
  const payload = {
    user_id: userId,
    diamonds_count: nextDiamonds,
    total_diamonds_earned: nextTotalEarned,
    updated_at: new Date().toISOString(),
  };

  const { error: updateError } = data
    ? await supabase.from("profile_stats").update(payload).eq("user_id", userId)
    : await supabase.from("profile_stats").upsert(payload, { onConflict: "user_id" });

  if (updateError && /diamonds_count|total_diamonds_earned/i.test(updateError.message || "")) {
    console.warn("[DIAMONDS] Columns are not available yet. Run the diamonds migration.");
    return 0;
  }

  if (updateError) {
    console.warn("[DIAMONDS] Could not award diamonds:", updateError);
    return 0;
  }

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("bb:diamonds-awarded", {
        detail: { amount: diamondAmount, diamonds: nextDiamonds },
      }),
    );
  }

  return diamondAmount;
}
