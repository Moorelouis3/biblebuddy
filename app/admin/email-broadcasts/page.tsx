"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Review screen for the twice-weekly studies email. A cron writes the
// draft; nothing leaves until Louis reads it here and presses send.

type Broadcast = {
  id: string;
  subject: string;
  intro: string | null;
  post_slugs: string[];
  body_html: string | null;
  body_text: string | null;
  status: string;
  recipient_count: number | null;
  send_error: string | null;
  sent_at: string | null;
  created_at: string;
};

type Payload = {
  broadcasts: Broadcast[];
  recipientCount: number;
  senderReady: boolean;
  from: string;
};

export default function EmailBroadcastsPage() {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, { subject?: string; intro?: string }>>({});

  const getToken = useCallback(
    async () => (await supabase.auth.getSession()).data.session?.access_token || "",
    [],
  );

  const load = useCallback(async () => {
    setError(null);
    const response = await fetch("/api/admin/email-broadcasts", {
      headers: { Authorization: `Bearer ${await getToken()}` },
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload?.error || "Could not load.");
      return;
    }
    setData(payload);
  }, [getToken]);

  useEffect(() => {
    void load();
  }, [load]);

  async function copy(text: string, message: string) {
    try {
      await navigator.clipboard.writeText(text);
      setNotice(message);
      setError(null);
    } catch {
      setError("Could not reach the clipboard. Select the preview text and copy it by hand.");
    }
  }

  async function act(op: string, id: string, extra: Record<string, unknown> = {}) {
    setBusy(id + op);
    setNotice(null);
    setError(null);
    try {
      const response = await fetch("/api/admin/email-broadcasts", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${await getToken()}` },
        body: JSON.stringify({ op, id, ...extra }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error || "Failed.");
      if (op === "send") {
        setNotice(`Sent to ${payload.sent} people${payload.failed ? `, ${payload.failed} failed` : ""}.`);
      } else if (op === "test") {
        setNotice(`Test sent to ${payload.testedTo}. Check your inbox.`);
      } else {
        setNotice("Saved.");
      }
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed.");
    } finally {
      setBusy(null);
    }
  }

  const drafts = (data?.broadcasts || []).filter((item) => item.status === "draft");
  const past = (data?.broadcasts || []).filter((item) => item.status !== "draft");

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-8 text-slate-950">
      <h1 className="text-2xl font-black">New Studies Email</h1>
      <p className="mt-1 text-sm font-semibold text-gray-500">
        Drafted automatically every Tuesday and Friday from what went up on the blog. Read it, edit it, then copy it
        into Systeme.io and send. Nothing goes out from here.
      </p>
      <ol className="mt-3 rounded-xl bg-blue-50 p-3 text-sm font-semibold text-blue-900">
        <li>1. Check the subject and opening line below, edit if you want, hit Save.</li>
        <li>2. Press Copy for Systeme (HTML) - or Copy plain text if you prefer their normal editor.</li>
        <li>3. In Systeme.io: Emails &rarr; Newsletters &rarr; new campaign, paste, send.</li>
        <li>4. Come back and press Mark as sent so it moves out of your queue.</li>
      </ol>

      {data ? (
        <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm font-bold text-slate-700">
          Systeme.io holds your list and handles unsubscribes. For reference, {data.recipientCount.toLocaleString()}{" "}
          people have signed up through the app.
        </p>
      ) : null}

      {error ? <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
      {notice ? <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700">{notice}</p> : null}

      <section className="mt-6">
        <h2 className="text-lg font-black">Waiting for you ({drafts.length})</h2>
        {drafts.length === 0 ? (
          <p className="mt-2 text-sm font-semibold text-gray-500">
            No draft right now. The next one lands Tuesday or Friday.
          </p>
        ) : (
          drafts.map((draft) => (
            <div key={draft.id} className="mt-3 rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
              <label className="block text-xs font-black uppercase tracking-wide text-gray-500">Subject</label>
              <input
                className="mt-1 w-full rounded-xl border border-gray-300 p-2.5 text-sm font-bold"
                defaultValue={draft.subject}
                onChange={(event) =>
                  setEdits((prev) => ({ ...prev, [draft.id]: { ...prev[draft.id], subject: event.target.value } }))
                }
              />
              <label className="mt-3 block text-xs font-black uppercase tracking-wide text-gray-500">
                Opening line
              </label>
              <textarea
                className="mt-1 w-full rounded-xl border border-gray-300 p-2.5 text-sm font-medium"
                rows={2}
                defaultValue={draft.intro || ""}
                onChange={(event) =>
                  setEdits((prev) => ({ ...prev, [draft.id]: { ...prev[draft.id], intro: event.target.value } }))
                }
              />
              <p className="mt-2 text-xs font-bold text-gray-500">
                Posts included: {(draft.post_slugs || []).join(", ") || "none"}
              </p>

              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-black text-blue-700">Preview the email</summary>
                <iframe
                  title="Email preview"
                  className="mt-2 h-[520px] w-full rounded-xl border border-gray-300 bg-white"
                  srcDoc={(draft.body_html || "").replace(/\{\{UNSUBSCRIBE\}\}/g, "#")}
                />
              </details>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={busy === draft.id + "save"}
                  onClick={() =>
                    act("save", draft.id, {
                      subject: edits[draft.id]?.subject ?? draft.subject,
                      intro: edits[draft.id]?.intro ?? draft.intro ?? "",
                      postSlugs: draft.post_slugs,
                    })
                  }
                  className="rounded-xl bg-slate-800 px-4 py-2 text-sm font-black text-white"
                >
                  Save changes
                </button>
                <button
                  type="button"
                  onClick={() => copy(draft.body_html || "", "HTML copied. Paste it into a Systeme.io newsletter.")}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-black text-white"
                >
                  Copy for Systeme (HTML)
                </button>
                <button
                  type="button"
                  onClick={() => copy(draft.body_text || "", "Plain text copied.")}
                  className="rounded-xl bg-slate-600 px-4 py-2 text-sm font-black text-white"
                >
                  Copy plain text
                </button>
                <button
                  type="button"
                  onClick={() => copy(edits[draft.id]?.subject ?? draft.subject, "Subject copied.")}
                  className="rounded-xl bg-slate-500 px-4 py-2 text-sm font-black text-white"
                >
                  Copy subject
                </button>
                <button
                  type="button"
                  disabled={busy === draft.id + "sent"}
                  onClick={() => {
                    if (window.confirm("Mark this as sent? Do this after you have sent it from Systeme.io.")) {
                      void act("sent", draft.id);
                    }
                  }}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-black text-white"
                >
                  Mark as sent
                </button>
                <button
                  type="button"
                  disabled={busy === draft.id + "discard"}
                  onClick={() => act("discard", draft.id)}
                  className="rounded-xl bg-gray-200 px-4 py-2 text-sm font-black text-gray-700"
                >
                  Discard
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-black">Already sent</h2>
        {past.length === 0 ? (
          <p className="mt-2 text-sm font-semibold text-gray-500">Nothing sent yet.</p>
        ) : (
          past.map((item) => (
            <div key={item.id} className="mt-2 rounded-xl border border-gray-200 bg-white p-3 text-sm">
              <p className="font-black">{item.subject}</p>
              <p className="mt-0.5 text-xs font-bold text-gray-500">
                {item.status}
                {item.sent_at ? ` · ${new Date(item.sent_at).toLocaleString()}` : ""}
                {item.recipient_count != null ? ` · ${item.recipient_count} recipients` : ""}
              </p>
              {item.send_error ? <p className="mt-1 text-xs font-bold text-red-600">{item.send_error}</p> : null}
            </div>
          ))
        )}
      </section>
    </main>
  );
}
