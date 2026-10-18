"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

/**
 * "Share to feed", at the moment somebody has just done the thing.
 *
 * Louis asked how people start posting - whether it needs a popup after
 * trivia and so on. Not a popup: a prompt after every action is how people
 * learn to dismiss things, and finishing a chapter or a plan day already
 * posts itself. What an automatic post cannot do is say anything, so this
 * exists for the half somebody writes - a sentence about what they just read,
 * why that verse landed, how the trivia went.
 *
 * Collapsed it is one button, so a screen that somebody wants to leave is
 * still one tap from leaving. Open it is a prefilled line they can change and
 * post, because an empty box after a quiz is a small essay request, and a
 * filled one is a yes.
 *
 * It writes straight to feed_posts as the signed-in reader, the same way the
 * feed's own composer does, so the post lands on their wall and goes into the
 * ranking like anything else.
 */

type Props = {
  /** What the box starts with, e.g. "Got 5 out of 6 on Genesis trivia." */
  defaultText: string;
  /** The verse this is about, when there is one. */
  verseRef?: string | null;
  verseText?: string | null;
  /** Button wording, when "Share to feed" is not the right phrase. */
  label?: string;
  className?: string;
};

export default function ShareToFeed({ defaultText, verseRef, verseText, label, className }: Props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(defaultText);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (done) {
    return (
      <p className={`text-sm font-bold text-[#2f8f5b] ${className ?? ""}`}>
        Shared to your feed ✓
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`rounded-full border border-[#ddd6f3] bg-white px-4 py-2 text-sm font-black text-[#2b2150] shadow-sm transition hover:-translate-y-0.5 hover:shadow ${className ?? ""}`}
      >
        {label ?? "Share to feed"}
      </button>
    );
  }

  return (
    <div className={`rounded-2xl border border-[#ddd6f3] bg-[#faf8ff] p-3 ${className ?? ""}`}>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={3}
        autoFocus
        maxLength={1000}
        className="w-full resize-none rounded-xl border border-[#ddd6f3] bg-white px-3 py-2 text-sm text-[#111827] outline-none focus:border-[var(--bb-accent,#2f7fe8)]"
        placeholder="Say something about it…"
      />

      {verseRef ? (
        <p className="mt-1 text-xs font-bold text-[#6a5aa8]">{verseRef}</p>
      ) : null}

      {error ? (
        <p className="mt-2 text-xs font-semibold text-red-600">{error}</p>
      ) : null}

      <div className="mt-2 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => { setOpen(false); setText(defaultText); setError(null); }}
          className="rounded-full px-3 py-2 text-sm font-bold text-[#6a5aa8]"
        >
          Not now
        </button>
        <button
          type="button"
          disabled={busy || !text.trim()}
          onClick={async () => {
            setBusy(true);
            setError(null);
            try {
              const { data: auth } = await supabase.auth.getUser();
              if (!auth.user) {
                setError("Sign in to share.");
                setBusy(false);
                return;
              }
              const { error: insertError } = await supabase.from("feed_posts").insert({
                user_id: auth.user.id,
                post_type: verseRef ? "verse" : "thought",
                content: text.trim().slice(0, 1000),
                verse_ref: verseRef ?? null,
                verse_text: verseText ?? null,
                visibility: "community",
                reaction_counts: {},
                comment_count: 0,
              });
              if (insertError) {
                setError(insertError.message);
                setBusy(false);
                return;
              }
              setDone(true);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Could not share.");
            }
            setBusy(false);
          }}
          className="rounded-full bg-[#2b2150] px-4 py-2 text-sm font-black shadow-sm transition disabled:opacity-50"
          // Inline, because globals.css carries unlayered button colour rules
          // that outrank a utility class - see components/home/BibleLockBanner.
          style={{ color: "#ffffff" }}
        >
          {busy ? "Sharing…" : "Share"}
        </button>
      </div>
    </div>
  );
}
