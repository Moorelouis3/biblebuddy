"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Louis's moderator engagement dashboard: review queue for drafted
// moderator comments, the action log with outcomes, and per-moderator
// controls (pause, caps, delays, personality tweaks, prohibited topics).

type ModeratorAction = {
  id: string;
  moderator_key: string;
  action_type: string;
  target_post_id: string | null;
  target_preview: string | null;
  generated_text: string | null;
  final_text: string | null;
  status: string;
  reason: string | null;
  priority: number | null;
  rating: number | null;
  result_post_id: string | null;
  posted_at: string | null;
  created_at: string;
};

type ModeratorSettings = {
  moderator_key: string;
  enabled: boolean;
  auto_comments: boolean;
  max_likes_per_day: number;
  max_comments_per_day: number;
  min_delay_minutes: number;
  personality: string | null;
  prohibited_topics: string | null;
};

type DashboardPayload = {
  moderators: Array<{ key: string; displayName: string }>;
  settings: Record<string, ModeratorSettings>;
  queue: ModeratorAction[];
  log: ModeratorAction[];
  outcomes: Record<string, { authorReplied: boolean; newParticipants: number }>;
};

const MOD_COLORS: Record<string, string> = {
  christina: "#d9467a",
  marcus: "#2f6fb8",
  mateo: "#3f9a5f",
  harold: "#8a6d3b",
};

export default function ModeratorAdminPage() {
  const [payload, setPayload] = useState<DashboardPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<string | null>(null);

  const getToken = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  }, []);

  const load = useCallback(async () => {
    setError(null);
    const token = await getToken();
    if (!token) {
      setError("Sign in as Louis to use this page.");
      return;
    }
    const response = await fetch("/api/admin/moderators", { headers: { Authorization: `Bearer ${token}` } });
    const data = await response.json();
    if (!response.ok) {
      setError(data?.error || "Could not load.");
      return;
    }
    setPayload(data);
  }, [getToken]);

  useEffect(() => {
    void load();
  }, [load]);

  async function post(body: Record<string, unknown>, busyKey: string) {
    setBusy(busyKey);
    setNotice(null);
    try {
      const token = await getToken();
      const response = await fetch("/api/admin/moderators", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Action failed.");
      setNotice("Done.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed.");
    } finally {
      setBusy(null);
    }
  }

  function updateSetting(key: string, patch: Record<string, unknown>) {
    void post({ op: "settings", moderatorKey: key, ...patch }, `settings-${key}`);
  }

  const global = payload?.settings?.global;
  const paused = global ? global.enabled === false : false;

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-8 text-gray-950">
      <h1 className="text-2xl font-black">Moderator Engagement</h1>
      <p className="mt-1 text-sm font-semibold text-gray-500">
        Review drafted comments, watch outcomes, and control each moderator. Likes run automatically under the caps;
        comments wait here for your approval unless auto-post is on.
      </p>
      {error ? <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
      {notice ? <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700">{notice}</p> : null}

      {payload ? (
        <>
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-black">Global</h2>
              <button
                type="button"
                disabled={busy === "settings-global"}
                onClick={() => updateSetting("global", { enabled: paused })}
                className={`rounded-xl px-4 py-2 text-sm font-black text-white ${paused ? "bg-emerald-600" : "bg-red-600"}`}
              >
                {paused ? "Resume all automation" : "Pause all automation"}
              </button>
            </div>
            {paused ? <p className="mt-2 text-sm font-bold text-red-600">All moderator automation is paused.</p> : null}
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-black">Review queue ({payload.queue.length})</h2>
            {payload.queue.length === 0 ? (
              <p className="mt-2 text-sm font-semibold text-gray-500">Nothing waiting for review.</p>
            ) : (
              payload.queue.map((action) => (
                <div key={action.id} className="mt-3 rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wide">
                    <span style={{ color: MOD_COLORS[action.moderator_key] || "#333" }}>{action.moderator_key}</span>
                    <span className="text-gray-400">P{action.priority}</span>
                    <span className="text-gray-400">{new Date(action.created_at).toLocaleString()}</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-gray-600">On: {action.target_preview}</p>
                  <p className="mt-1 text-xs font-semibold text-gray-500">Why: {action.reason}</p>
                  <textarea
                    className="mt-2 w-full rounded-xl border border-gray-300 p-3 text-sm font-medium"
                    rows={3}
                    defaultValue={action.generated_text || ""}
                    onChange={(event) => setEdits((prev) => ({ ...prev, [action.id]: event.target.value }))}
                    placeholder="Comment text (empty draft - write it here)"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      disabled={busy === action.id}
                      onClick={() => post({ op: "approve", actionId: action.id, text: edits[action.id] ?? action.generated_text ?? "" }, action.id)}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white"
                    >
                      Approve &amp; post
                    </button>
                    <button
                      type="button"
                      disabled={busy === action.id}
                      onClick={() => post({ op: "reject", actionId: action.id }, action.id)}
                      className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-black text-gray-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-black">Moderators</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {payload.moderators.map((mod) => {
                const settings = payload.settings[mod.key];
                if (!settings) return null;
                return (
                  <div key={mod.key} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-black" style={{ color: MOD_COLORS[mod.key] }}>
                        🛡️ {mod.displayName}
                      </p>
                      <button
                        type="button"
                        onClick={() => updateSetting(mod.key, { enabled: !settings.enabled })}
                        className={`rounded-lg px-3 py-1 text-xs font-black text-white ${settings.enabled ? "bg-emerald-600" : "bg-gray-400"}`}
                      >
                        {settings.enabled ? "Enabled" : "Disabled"}
                      </button>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-bold text-gray-600">
                      <label className="flex flex-col gap-1">
                        Likes/day
                        <input
                          type="number"
                          defaultValue={settings.max_likes_per_day}
                          onBlur={(event) => updateSetting(mod.key, { maxLikesPerDay: Number(event.target.value) })}
                          className="rounded-lg border border-gray-300 p-1.5"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        Comments/day
                        <input
                          type="number"
                          defaultValue={settings.max_comments_per_day}
                          onBlur={(event) => updateSetting(mod.key, { maxCommentsPerDay: Number(event.target.value) })}
                          className="rounded-lg border border-gray-300 p-1.5"
                        />
                      </label>
                      <label className="flex flex-col gap-1">
                        Delay (min)
                        <input
                          type="number"
                          defaultValue={settings.min_delay_minutes}
                          onBlur={(event) => updateSetting(mod.key, { minDelayMinutes: Number(event.target.value) })}
                          className="rounded-lg border border-gray-300 p-1.5"
                        />
                      </label>
                    </div>
                    <label className="mt-2 flex items-center gap-2 text-xs font-bold text-gray-600">
                      <input
                        type="checkbox"
                        defaultChecked={settings.auto_comments}
                        onChange={(event) => updateSetting(mod.key, { autoComments: event.target.checked })}
                      />
                      Auto-post comments (vulnerable posts still wait for review)
                    </label>
                    <textarea
                      className="mt-2 w-full rounded-lg border border-gray-300 p-2 text-xs font-medium"
                      rows={2}
                      placeholder="Extra personality instructions"
                      defaultValue={settings.personality || ""}
                      onBlur={(event) => updateSetting(mod.key, { personality: event.target.value })}
                    />
                    <textarea
                      className="mt-2 w-full rounded-lg border border-gray-300 p-2 text-xs font-medium"
                      rows={1}
                      placeholder="Prohibited topics (comma separated)"
                      defaultValue={settings.prohibited_topics || ""}
                      onBlur={(event) => updateSetting(mod.key, { prohibitedTopics: event.target.value })}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-black">Action log</h2>
            {payload.log.slice(0, 60).map((action) => {
              const outcome = payload.outcomes[action.id];
              return (
                <div key={action.id} className="mt-2 rounded-xl border border-gray-200 bg-white p-3 text-sm">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wide">
                    <span style={{ color: MOD_COLORS[action.moderator_key] || "#333" }}>{action.moderator_key}</span>
                    <span className="text-gray-500">{action.action_type}</span>
                    <span
                      className={
                        action.status === "posted" ? "text-emerald-600" : action.status === "rejected" ? "text-red-500" : "text-gray-400"
                      }
                    >
                      {action.status}
                    </span>
                    <span className="text-gray-400">P{action.priority}</span>
                    <span className="text-gray-400">{new Date(action.created_at).toLocaleString()}</span>
                  </div>
                  <p className="mt-1 font-semibold text-gray-600">On: {action.target_preview}</p>
                  {action.final_text ? <p className="mt-1 font-medium text-gray-800">&ldquo;{action.final_text}&rdquo;</p> : null}
                  <p className="mt-1 text-xs font-semibold text-gray-500">Why: {action.reason}</p>
                  {outcome ? (
                    <p className="mt-1 text-xs font-black text-indigo-600">
                      {outcome.authorReplied ? "✅ Author replied" : "— Author hasn't replied yet"} · {outcome.newParticipants} other member
                      {outcome.newParticipants === 1 ? "" : "s"} joined after
                    </p>
                  ) : null}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => post({ op: "rate", actionId: action.id, rating: star }, `rate-${action.id}`)}
                        className={`text-base ${action.rating && star <= action.rating ? "opacity-100" : "opacity-30"}`}
                        aria-label={`Rate ${star} stars`}
                      >
                        ⭐
                      </button>
                    ))}
                    {action.status === "posted" && action.result_post_id && action.action_type === "comment" ? (
                      <button
                        type="button"
                        disabled={busy === `del-${action.id}`}
                        onClick={() => post({ op: "delete_comment", actionId: action.id }, `del-${action.id}`)}
                        className="rounded-lg bg-red-50 px-3 py-1 text-xs font-black text-red-600"
                      >
                        Delete comment
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </section>
        </>
      ) : !error ? (
        <p className="mt-6 text-sm font-semibold text-gray-500">Loading…</p>
      ) : null}
    </main>
  );
}
