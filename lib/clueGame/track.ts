import { trackFeatureEvent, type FeatureEventName } from "@/lib/featureEvents";
import { supabase } from "@/lib/supabaseClient";

/**
 * Bible Clue Game Beta measurement (Louis, 2026-11-22: starts, completions,
 * repeat play, drop-off, mode use, challenges, study opens, and whether
 * players enjoyed it). Read by the Features tab, lib/newFeaturesReport.ts.
 */
let cachedUserId: string | null | undefined;

export async function clueUserId(): Promise<string | null> {
  if (cachedUserId !== undefined) return cachedUserId;
  const { data } = await supabase.auth.getUser();
  cachedUserId = data.user?.id ?? null;
  return cachedUserId;
}

export function trackClue(event: FeatureEventName, metadata: Record<string, unknown> = {}) {
  void clueUserId().then((id) => trackFeatureEvent(event, id, metadata));
}

/** The signed-in user's access token, for /api/clue-game calls. */
export async function clueAuthHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
}

export async function clueApi<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<{ ok: boolean; status: number; data: T }> {
  const res = await fetch(`${window.location.origin}${path}`, {
    method: init.method || "GET",
    headers: await clueAuthHeaders(),
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as T;
  return { ok: res.ok, status: res.status, data };
}
