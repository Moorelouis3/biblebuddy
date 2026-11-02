"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// The zero-AI study-comment replier, from Louis's side.
//
// Four things he asked to be able to do: see the library, approve or disable a
// reply, read what the system refused to answer, and see how many comments got
// answered without AI. The AI number is on the page as a flat zero rather than
// a metric, because it is a guarantee, not a measurement.

type Category = { slug: string; label: string; strategy: string; maxWords: number };
type Rule = { id: string; categorySlug: string; kind: string; pattern: string; weight: number; blocks: boolean };
type Template = { id: string; category_slug?: string; categorySlug?: string; body: string; approved: boolean; enabled: boolean; times_used?: number; source?: string };
type LogRow = {
  id: string;
  comment_id: string;
  action: string;
  category_slug: string | null;
  confidence: number;
  reason: string;
  created_at: string;
  comment: { article_slug: string; user_name: string | null; content: string; created_at: string } | null;
};
type Pattern = { fingerprint: string; sample_text: string; seen_count: number; word_count: number };

type Payload = {
  librarySource: string;
  categories: Category[];
  rules: Rule[];
  templates: Template[];
  stats: { last30Total: number; replied: number; review: number; skipped: number; shadow: number; aiCalls: number };
  review: LogRow[];
  patterns: Pattern[];
};

export default function CommentRepliesAdminPage() {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState<{ category: string; body: string }>({ category: "amen", body: "" });

  const call = useCallback(async (method: "GET" | "POST", body?: Record<string, unknown>) => {
    const { data: session } = await supabase.auth.getSession();
    const token = session.session?.access_token;
    if (!token) throw new Error("Sign in as Louis first.");
    const res = await fetch("/api/admin/comment-replies", {
      method,
      headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
    return json;
  }, []);

  const load = useCallback(async () => {
    try {
      setData(await call("GET"));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    }
  }, [call]);

  useEffect(() => {
    void load();
  }, [load]);

  const act = async (body: Record<string, unknown>) => {
    setBusy(true);
    try {
      await call("POST", body);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  };

  if (error) return <main style={{ padding: 24, fontFamily: "system-ui" }}>⚠️ {error}</main>;
  if (!data) return <main style={{ padding: 24, fontFamily: "system-ui" }}>Loading…</main>;

  const box: React.CSSProperties = { border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 20 };
  const cat = (t: Template) => t.category_slug || t.categorySlug || "";

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 4 }}>Comment replies</h1>
      <p style={{ color: "#666", marginTop: 0 }}>
        Study-comment replies, with no AI. Library loaded from <strong>{data.librarySource}</strong>.
      </p>

      <section style={box}>
        <h2 style={{ marginTop: 0, fontSize: 16 }}>Last 30 days</h2>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <Stat label="Answered" value={data.stats.replied} />
          <Stat label="For you to answer" value={data.stats.review} />
          <Stat label="Skipped" value={data.stats.skipped} />
          <Stat label="Shadow only" value={data.stats.shadow} />
          <Stat label="Paid AI calls" value={data.stats.aiCalls} highlight />
        </div>
      </section>

      <section style={box}>
        <h2 style={{ marginTop: 0, fontSize: 16 }}>Waiting for you ({data.review.length})</h2>
        <p style={{ color: "#666", marginTop: 0, fontSize: 13 }}>
          Prayer, testimony, questions, grief and criticism are never answered automatically.
        </p>
        {data.review.length === 0 && <p style={{ color: "#999" }}>Nothing waiting.</p>}
        {data.review.map((r) => (
          <div key={r.id} style={{ borderTop: "1px solid #eee", padding: "10px 0" }}>
            <div style={{ fontSize: 12, color: "#888" }}>
              {r.category_slug || "—"} · {r.reason} · {r.comment?.article_slug || ""}
            </div>
            <div style={{ marginTop: 4 }}>
              <strong>{r.comment?.user_name || "Someone"}:</strong> {r.comment?.content || "(comment not found)"}
            </div>
          </div>
        ))}
      </section>

      <section style={box}>
        <h2 style={{ marginTop: 0, fontSize: 16 }}>Reply library</h2>
        {data.categories.map((c) => {
          const mine = data.templates.filter((t) => cat(t) === c.slug);
          return (
            <div key={c.slug} style={{ borderTop: "1px solid #eee", padding: "10px 0" }}>
              <div style={{ fontSize: 13, color: "#555" }}>
                <strong>{c.label}</strong> · {c.strategy}
                {c.strategy === "reply" ? ` · up to ${c.maxWords} words` : " · human only"}
              </div>
              {mine.map((t) => (
                <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
                  <span style={{ flex: 1, opacity: t.enabled && t.approved ? 1 : 0.45 }}>
                    {t.body} {t.times_used ? <em style={{ color: "#999" }}>· used {t.times_used}×</em> : null}
                  </span>
                  {!t.approved && (
                    <button disabled={busy} onClick={() => act({ action: "approveTemplate", id: t.id })}>
                      Approve
                    </button>
                  )}
                  {t.enabled && (
                    <button disabled={busy} onClick={() => act({ action: "disableTemplate", id: t.id })}>
                      Disable
                    </button>
                  )}
                </div>
              ))}
              {c.strategy === "reply" && mine.length === 0 && (
                <p style={{ color: "#c00", fontSize: 13 }}>No approved reply — this category will be skipped.</p>
              )}
            </div>
          );
        })}

        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
          <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })}>
            {data.categories.filter((c) => c.strategy === "reply").map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
          <input
            style={{ flex: 1 }}
            placeholder="A new reply, in your voice"
            value={draft.body}
            onChange={(e) => setDraft({ ...draft, body: e.target.value })}
          />
          <button
            disabled={busy || !draft.body.trim()}
            onClick={async () => {
              await act({ action: "addTemplate", categorySlug: draft.category, body: draft.body.trim() });
              setDraft({ ...draft, body: "" });
            }}
          >
            Add
          </button>
        </div>
      </section>

      <section style={box}>
        <h2 style={{ marginTop: 0, fontSize: 16 }}>Keeps coming up, nothing matches it ({data.patterns.length})</h2>
        <p style={{ color: "#666", marginTop: 0, fontSize: 13 }}>
          Short comments seen more than once with no rule. Worth a template if one keeps climbing.
        </p>
        {data.patterns.map((p) => (
          <div key={p.fingerprint} style={{ display: "flex", gap: 8, alignItems: "center", borderTop: "1px solid #eee", padding: "6px 0" }}>
            <span style={{ width: 40, color: "#888" }}>{p.seen_count}×</span>
            <span style={{ flex: 1 }}>{p.sample_text}</span>
            <button disabled={busy} onClick={() => act({ action: "dismissPattern", fingerprint: p.fingerprint })}>
              Dismiss
            </button>
          </div>
        ))}
      </section>

      <section style={box}>
        <h2 style={{ marginTop: 0, fontSize: 16 }}>Matching rules</h2>
        {data.rules.map((r) => (
          <div key={r.id} style={{ display: "flex", gap: 8, alignItems: "center", borderTop: "1px solid #eee", padding: "5px 0", fontSize: 13 }}>
            <span style={{ width: 110, color: "#555" }}>{r.categorySlug}</span>
            <span style={{ width: 54, color: "#999" }}>{r.kind}</span>
            <code style={{ flex: 1, fontSize: 12 }}>{r.pattern}</code>
            {r.blocks && <span style={{ color: "#c60" }}>blocks</span>}
            <button disabled={busy} onClick={() => act({ action: "disableRule", id: r.id })}>
              Disable
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

function Stat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 26, fontWeight: 700, color: highlight ? "#0a7" : undefined }}>{value}</div>
      <div style={{ fontSize: 12, color: "#777" }}>{label}</div>
    </div>
  );
}
