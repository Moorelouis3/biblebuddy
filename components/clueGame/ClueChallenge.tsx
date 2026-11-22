"use client";

/**
 * A Feed challenge: the exact solo round someone finished (same 10
 * questions, same order, same timing), its leaderboard, and Play Challenge. The first
 * finished attempt per person is ranked; later ones are practice. An
 * unfinished attempt survives a reload (useLocalMatch persistKey).
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { BANK_ITEMS } from "@/lib/clueGame/bank";
import { createMatch, ROUND_INTRO_MS, soloSetup, type ClueSelection, type PublicCard } from "@/lib/clueGame/engine";
import type { ClueRef } from "@/lib/clueGame/types";
import { clueApi, trackClue } from "@/lib/clueGame/track";
import ClueTable from "./ClueTable";
import { ClueHeader, ClueRoomFrame, ScriptureSheet, StudyCard } from "./ClueParts";
import { useLocalMatch } from "./useLocalMatch";

type Challenge = {
  id: string;
  creatorName: string;
  creatorScore: number;
  deckIds: string[];
  deckName: string;
  selection: ClueSelection;
  cardIds: string[];
  /** Made before the question bank: it cannot be replayed. */
  outdated?: boolean;
  attempts: number;
  leaderboard: Array<{ rank: number; userId: string; name: string; score: number; won: number }>;
  yourRanked: { score: number; won: number } | null;
  error?: string;
};

function Board({ c }: { c: Challenge }) {
  return (
    <ol className="space-y-1.5 text-left">
      {c.leaderboard.map((row) => (
        <li key={row.userId} className="flex items-center gap-3 rounded-xl px-3 py-1.5" style={{ background: row.rank === 1 ? "#f6e7c1" : "rgba(255,255,255,.4)" }}>
          <span className="w-6 text-center font-black">{row.rank === 1 ? "👑" : row.rank}</span>
          <span className="min-w-0 flex-1 truncate font-bold">{row.name}</span>
          <span className="font-black">⭐ {row.score}</span>
        </li>
      ))}
    </ol>
  );
}

function ChallengeRound({ c, onDone }: { c: Challenge; onDone: (c: Challenge, ranked: boolean) => void }) {
  const { match, view, now, act } = useLocalMatch(
    () => createMatch({ items: BANK_ITEMS, selection: c.selection, ...soloSetup("me", "You"), seed: 1, cardIds: c.cardIds }),
    { persistKey: `bb:clue-challenge:${c.id}`, mode: "challenge", deckIds: c.deckIds },
  );
  const [study, setStudy] = useState<PublicCard | null>(null);
  const [scripture, setScripture] = useState<ClueRef | null>(null);
  useEffect(() => {
    if (match.phase === "ready") {
      act({ type: "deal", now: Date.now() + ROUND_INTRO_MS });
      trackClue("clue_game_challenge_started", { challenge: c.id });
    }
  }, [match.phase, act, c.id]);
  useEffect(() => {
    if (match.phase !== "over") return;
    void (async () => {
      const res = await clueApi<{ ranked: boolean; challenge: Challenge }>(`/api/clue-game/challenges/${c.id}`, {
        method: "POST",
        body: { score: match.scores.me ?? 0, won: match.done.filter((d) => !d.tiebreak && (d.points.me ?? 0) > 0).length },
      });
      trackClue("clue_game_challenge_finished", { challenge: c.id, score: match.scores.me ?? 0, ranked: res.data.ranked });
      onDone(res.ok ? res.data.challenge : c, !!res.data.ranked);
    })();
    // Submit once, when the round ends.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.phase]);
  return (
    <>
      <ClueTable
        view={view}
        players={[{ id: "me", name: "You" }]}
        youId="me"
        now={now}
        cardBack="/games/clue/genesis/art/card-back.webp"
        deckIds={c.deckIds}
        roundLabel="Genesis"
        onAnswer={(choice) => act({ type: "answer", playerId: "me", choice })}
        onStudy={(card) => {
          setStudy(card);
          trackClue("clue_game_study_opened", { mode: "challenge", card: card.id });
        }}
      />
      {study ? <StudyCard card={study} onClose={() => setStudy(null)} onOpenRef={setScripture} /> : null}
      {scripture ? <ScriptureSheet target={scripture} onClose={() => setScripture(null)} /> : null}
      {match.phase === "over" ? <p className="mt-6 text-center font-bold" style={{ color: "#fff1c9" }}>Saving your score…</p> : null}
    </>
  );
}

export default function ClueChallenge({ id }: { id: string }) {
  const [c, setC] = useState<Challenge | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState<null | { ranked: boolean }>(null);
  const [review, setReview] = useState<PublicCard | null>(null);
  const [scripture, setScripture] = useState<ClueRef | null>(null);

  useEffect(() => {
    void (async () => {
      const res = await clueApi<Challenge>(`/api/clue-game/challenges/${id}`);
      if (res.ok) {
        setC(res.data);
        trackClue("clue_game_challenge_opened", { challenge: id });
        // An unfinished attempt goes straight back to the table.
        try {
          if (!res.data.outdated && window.localStorage.getItem(`bb:clue-challenge:${id}`)) setPlaying(true);
        } catch {}
      } else setError(res.data.error || "This challenge was not found.");
    })();
  }, [id]);

  return (
    <ClueRoomFrame>
      <div className="pb-28">
        <ClueHeader backHref="/bible-study-games/clue" subtitle={playing ? undefined : c?.deckName || "Genesis"} badge={playing ? undefined : "Challenge"} hideLogo={playing} />
        {error ? (
          <div className="bb-clue-panel bb-clue-parchment text-center">
            <p className="bb-clue-serif text-xl font-bold">{error}</p>
            <Link href="/bible-study-games/clue" className="bb-clue-btn bb-clue-btn-green mt-4 w-full">Play the Bible Clue Game</Link>
          </div>
        ) : !c ? (
          <p className="mt-10 text-center font-bold" style={{ color: "#fff1c9" }}>Loading the challenge…</p>
        ) : playing ? (
          <ChallengeRound
            c={c}
            onDone={(next, ranked) => {
              setC(next);
              setFinished({ ranked });
              setPlaying(false);
            }}
          />
        ) : (
          <div className="bb-clue-panel bb-clue-parchment text-center">
            <h2 className="bb-clue-serif bb-clue-title" style={{ color: "#2a1a0c", fontSize: 30 }}>
              {finished ? (finished.ranked ? "Your score is in!" : "Practice round done") : `${c.creatorName} scored ${c.creatorScore}`}
            </h2>
            <p className="mt-1 text-[15px] font-bold">
              {finished
                ? finished.ranked
                  ? "Your first try is the one on the leaderboard."
                  : "Only your first try counts on the leaderboard."
                : `in ${c.deckName}. Same 10 questions. Can you beat it?`}
            </p>
            {c.yourRanked && !finished ? <p className="mt-2 text-[14px] font-bold">Your score: ⭐ {c.yourRanked.score}. You can play again for practice.</p> : null}
            <div className="mt-4"><Board c={c} /></div>
            <p className="mt-2 text-[12px] font-bold opacity-70">{c.attempts} {c.attempts === 1 ? "Buddy has" : "Buddies have"} played</p>
            {c.outdated ? (
              <p className="mt-4 text-[14px] font-bold">This challenge was made in the old version of the game, so it can’t be replayed.</p>
            ) : (
              <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big mt-4" onClick={() => setPlaying(true)}>
                ▶ {c.yourRanked || finished ? "Play again (practice)" : "Play Challenge"}
              </button>
            )}
            <Link href="/bible-study-games/clue" className="bb-clue-link mt-3 inline-flex">Play your own round</Link>
          </div>
        )}
      </div>
      {review ? <StudyCard card={review} onClose={() => setReview(null)} onOpenRef={setScripture} /> : null}
      {scripture ? <ScriptureSheet target={scripture} onClose={() => setScripture(null)} /> : null}
    </ClueRoomFrame>
  );
}
