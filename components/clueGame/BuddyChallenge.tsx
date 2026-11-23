"use client";

/**
 * Challenge your Bible Buddies (Louis, 2026-11-22): after a solo game, pick
 * buddies; each gets a notification ("Louis challenged you to Bible Clue!
 * Beat 7 points.") that opens the same ten questions with a "vs" intro, and
 * everyone lands on one leaderboard. The open challenge on the Feed stays as
 * the other choice. The server is lib/clueGame/server.ts createChallenge.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { clueApi, trackClue } from "@/lib/clueGame/track";
import { Avatar } from "./ClueParts";

type Buddy = { id: string; name: string; avatar: string | null };
type Body = { roundId: string; selection: unknown; cardIds: string[]; score: number; won: number; speed?: boolean };

/**
 * `passId`: pass an existing challenge on (the chain letter, 2026-11-23)
 * instead of making a new one. Only the Buddy picker shows; your Feed post
 * already went up when you finished.
 */
export default function ChallengeChoices({ body, passId, exclude = [] }: { body?: Body; passId?: string; exclude?: string[] }) {
  const [mode, setMode] = useState<"choose" | "buddies">(passId ? "buddies" : "choose");
  const [buddies, setBuddies] = useState<Buddy[] | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ id: string; text: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode !== "buddies" || buddies) return;
    void (async () => {
      const res = await clueApi<{ buddies?: Buddy[]; error?: string }>("/api/clue-game/buddies");
      if (res.ok) setBuddies((res.data.buddies || []).filter((b) => !exclude.includes(b.id)));
      else setError(res.data.error || "Could not load your Buddies.");
    })();
  }, [mode, buddies]);

  const send = async (buddyIds?: string[]) => {
    setBusy(true);
    setError(null);
    const res = passId
      ? await clueApi<{ id?: string; alreadyPosted?: boolean; sentTo?: string[]; error?: string }>(`/api/clue-game/challenges/${passId}`, {
          method: "POST",
          body: { op: "pass", buddyIds: buddyIds || [] },
        })
      : await clueApi<{ id?: string; alreadyPosted?: boolean; sentTo?: string[]; error?: string }>("/api/clue-game/challenges", {
          method: "POST",
          body: { ...body, ...(buddyIds ? { buddyIds } : {}) },
        });
    setBusy(false);
    if (!res.ok || !res.data.id) {
      setError(res.data.error || "Could not send the challenge.");
      return;
    }
    if (buddyIds) {
      const names = res.data.sentTo || [];
      setDone({ id: res.data.id, text: `${passId ? "Passed on" : "Challenge sent"} to ${names.length > 2 ? `${names.slice(0, 2).join(", ")} and ${names.length - 2} more` : names.join(" and ")}!` });
      trackClue("clue_game_challenge_shared", { challenge: res.data.id, score: body?.score ?? null, buddies: names.length, passed: !!passId });
    } else {
      setDone({ id: res.data.id, text: res.data.alreadyPosted ? "Already on your Feed." : "Posted to your Bible Buddy Feed!" });
      if (!res.data.alreadyPosted) trackClue("clue_game_challenge_shared", { challenge: res.data.id, score: body?.score ?? null });
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl p-3 text-[15px] font-bold" style={{ background: "#e9f1dc", color: "#1d5a34" }}>
        {done.text}{" "}
        <Link className="bb-clue-link" href={`/bible-study-games/clue/challenge/${done.id}`}>
          See the leaderboard
        </Link>
        {mode === "choose" ? null : (
          <button type="button" className="bb-clue-link ml-2" onClick={() => { setDone(null); setPicked([]); }}>
            Challenge more
          </button>
        )}
      </div>
    );
  }

  if (mode === "buddies") {
    const toggle = (id: string) => setPicked((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
    return (
      <div className="rounded-2xl p-3 text-left" style={{ background: "rgba(255,255,255,.55)", boxShadow: "inset 0 0 0 1.5px #d7b26b" }}>
        <p className="bb-clue-serif text-center text-[18px] font-bold">{passId ? "Pass it on: who's next in the chain?" : "Who do you want to challenge?"}</p>
        {!buddies ? (
          <p className="mt-3 text-center text-[14px] font-bold opacity-70">{error || "Loading your Buddies…"}</p>
        ) : buddies.length === 0 ? (
          <p className="mt-3 text-center text-[14px]">{passId ? "Every one of your Buddies is already in this chain!" : "You have no Bible Buddies yet. Add Buddies on the Feed, or post an open challenge instead."}</p>
        ) : (
          <ul className="mt-3 max-h-[38vh] space-y-1.5 overflow-y-auto">
            {buddies.map((b) => {
              const on = picked.includes(b.id);
              return (
                <li key={b.id}>
                  <button
                    type="button"
                    onClick={() => toggle(b.id)}
                    aria-pressed={on}
                    className="flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left"
                    style={{ background: on ? "#e4f2df" : "rgba(255,255,255,.6)", boxShadow: on ? "inset 0 0 0 2px #2f8a4f" : "inset 0 0 0 1px #e0c58e" }}
                  >
                    <Avatar name={b.name} src={b.avatar} size={36} />
                    <span className="min-w-0 flex-1 truncate font-bold">{b.name}</span>
                    <span className="grid h-6 w-6 place-items-center rounded-full text-[14px] font-black" style={{ background: on ? "#2f8a4f" : "#fff", color: on ? "#fff" : "#c9a45a", boxShadow: "inset 0 0 0 1.5px #c99a46" }}>
                      {on ? "✓" : ""}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big mt-3 w-full" disabled={busy || !picked.length} onClick={() => void send(picked)}>
          {busy ? "Sending…" : picked.length ? `⚔️ Challenge ${picked.length} Buddy${picked.length > 1 ? "s" : ""}` : "Pick your Buddies"}
        </button>
        {error && buddies ? <p className="mt-2 text-center text-[13px] font-bold text-[#8a2418]">{error}</p> : null}
        {passId ? null : (
          <button type="button" className="bb-clue-link mx-auto mt-2 block text-[14px]" onClick={() => setMode("choose")}>
            Back
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big" disabled={busy} onClick={() => setMode("buddies")}>
        ⚔️ Challenge Buddies
      </button>
      <button type="button" className="bb-clue-btn" disabled={busy} onClick={() => void send()}>
        📣 {busy ? "Posting…" : "Open challenge on the Feed"}
      </button>
      {error ? <p className="text-[13px] font-bold text-[#8a2418]">{error}</p> : null}
    </>
  );
}
