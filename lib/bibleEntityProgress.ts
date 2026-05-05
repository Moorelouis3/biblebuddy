import { ACTION_TYPE } from "./actionTypes";
import { supabase } from "./supabaseClient";

export type BibleEntityKind = "people" | "places" | "keywords";

type BibleEntityProgressOptions = {
  kind: BibleEntityKind;
  name: string;
  userId: string;
  username?: string | null;
};

type BibleEntityProgressResult = {
  inserted: boolean;
  normalizedKey: string;
};

function dispatchEntityPointAward(actionType: string, label: string) {
  if (typeof document !== "undefined") {
    document.dispatchEvent(
      new CustomEvent("bb:points", {
        detail: { delta: 1, label },
      })
    );

    document.dispatchEvent(
      new CustomEvent("bb:study-progress-changed", {
        detail: { actionType, label, at: String(Date.now()) },
      })
    );
  }

  if (typeof window !== "undefined") {
    const stamp = String(Date.now());
    window.dispatchEvent(
      new CustomEvent("bb:study-progress-changed", {
        detail: { actionType, label, at: stamp },
      })
    );
    window.localStorage.setItem("bb:last-study-progress-change", stamp);
  }
}

function normalizeEntityKey(kind: BibleEntityKind, name: string) {
  const trimmed = name.trim();

  if (kind === "places") {
    return trimmed.toLowerCase().replace(/\s+/g, "_");
  }

  return trimmed.toLowerCase().replace(/\s+/g, " ");
}

function formatEntityLabel(name: string) {
  return name
    .split(" ")
    .map((word) => {
      if (/^\d+$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function getEntityConfig(kind: BibleEntityKind) {
  if (kind === "people") {
    return {
      table: "people_progress",
      column: "person_name",
      actionType: ACTION_TYPE.person_learned,
      statsColumn: "people_learned_count",
    } as const;
  }

  if (kind === "places") {
    return {
      table: "places_progress",
      column: "place_name",
      actionType: ACTION_TYPE.place_discovered,
      statsColumn: "places_discovered_count",
    } as const;
  }

  return {
    table: "keywords_progress",
    column: "keyword_name",
    actionType: ACTION_TYPE.keyword_mastered,
    statsColumn: "keywords_mastered_count",
  } as const;
}

export async function ensureBibleEntityLearned({
  kind,
  name,
  userId,
  username,
}: BibleEntityProgressOptions): Promise<BibleEntityProgressResult> {
  const normalizedKey = normalizeEntityKey(kind, name);
  if (!normalizedKey) {
    return { inserted: false, normalizedKey };
  }

  const config = getEntityConfig(kind);
  const label = formatEntityLabel(name);

  const { data: existing, error: existingError } = await supabase
    .from(config.table)
    .select(config.column)
    .eq("user_id", userId)
    .eq(config.column, normalizedKey)
    .limit(1)
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existing) {
    return { inserted: false, normalizedKey };
  }

  const { error: upsertError } = await supabase
    .from(config.table)
    .upsert({ user_id: userId, [config.column]: normalizedKey }, { onConflict: `user_id,${config.column}` });

  if (upsertError) {
    throw upsertError;
  }

  const { count, error: countError } = await supabase
    .from(config.table)
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  if (countError) {
    throw countError;
  }

  let actionUsername = username?.trim() || "";
  if (!actionUsername) {
    const { data: existingStats } = await supabase
      .from("profile_stats")
      .select("username")
      .eq("user_id", userId)
      .maybeSingle();
    actionUsername = existingStats?.username?.trim() || "";
  }

  if (!actionUsername) {
    const { data: authData } = await supabase.auth.getUser();
    const authUser = authData.user;
    const meta: any = authUser?.user_metadata || {};
    actionUsername =
      meta.firstName ||
      meta.first_name ||
      (authUser?.email ? authUser.email.split("@")[0] : "") ||
      "User";
  }

  await supabase.from("master_actions").insert({
    user_id: userId,
    username: actionUsername,
    action_type: config.actionType,
    action_label: label,
  });

  const { data: currentStats } = await supabase
    .from("profile_stats")
    .select("total_actions, username")
    .eq("user_id", userId)
    .maybeSingle();

  await supabase.from("profile_stats").upsert(
    {
      user_id: userId,
      username: currentStats?.username || actionUsername,
      [config.statsColumn]: count || 0,
      total_actions: Math.max(currentStats?.total_actions || 0, 0) + 1,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  dispatchEntityPointAward(config.actionType, label);

  return { inserted: true, normalizedKey };
}
