"use client";

/**
 * Bible Clue Game, presented by Bible Buddy: the menu, How to Play, Choose
 * Your Deck, solo play and the doors into a private room.
 *
 * Flow (Louis, 2026-11-22, Notion "Bible Clue Game — Presented by Bible
 * Buddy"): Play Solo → Choose Your Deck → a 10-card round → Round Complete
 * (Challenge, Play Again, Review Cards). Multiplayer → Host Room (Choose Your
 * Deck → a room code and link) or Join Room (enter the code).
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CLUE_DECKS, deckById, deckLabel, poolFor } from "@/lib/clueGame/catalog";
import { createMatch, ROUND_INTRO_MS, soloSetup, type PublicCard } from "@/lib/clueGame/engine";
import type { ClueRef } from "@/lib/clueGame/types";
import { clueApi, clueUserId, trackClue } from "@/lib/clueGame/track";
import { supabase } from "@/lib/supabaseClient";
import ClueTable from "./ClueTable";
import ClueResults, { ReviewList } from "./ClueResults";
import { ClueHeader, ClueRoomFrame, ScriptureSheet, StudyCard } from "./ClueParts";
import { useLocalMatch } from "./useLocalMatch";

type Screen = "menu" | "how" | "decks" | "play" | "multi";

const newSeed = () => Math.floor(Math.random() * 2147483647);
const newRoundId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

/* ---------- How to Play ---------- */

function HowToPlay({ onBack }: { onBack: () => void }) {
  const steps: Array<[string, string]> = [
    ["🃏", "A card is dealt face down. You see only whether it is a Person, Place or Keyword, and its silhouette."],
    ["5️⃣", "Clues come one at a time, from 5 points down to 1. Each clue stays up for 12 seconds."],
    ["✅", "Guess right and you win that clue’s points and the card."],
    ["❌", "Guess wrong and you lose that many points. One guess per clue."],
    ["⏳", "Not sure? Wait for the next clue. Waiting is free."],
    ["🔁", "The next card deals itself. A round is 10 cards. Most points wins."],
    ["📖", "After each card, tap Study This Card for its Scripture and a short teaching note."],
  ];
  return (
    <div className="bb-clue-panel bb-clue-parchment">
      <h2 className="bb-clue-serif bb-clue-title" style={{ color: "#2a1a0c" }}>How to Play</h2>
      <ul className="mt-4 space-y-3">
        {steps.map(([icon, text]) => (
          <li key={text} className="flex gap-3 text-left text-[16px] leading-snug">
            <span className="text-2xl" aria-hidden="true">{icon}</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
      <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big mt-5" onClick={onBack}>
        Got it
      </button>
    </div>
  );
}

/* ---------- Choose Your Deck ---------- */

function DeckPicker({ onStart, startLabel }: { onStart: (deckIds: string[]) => void; startLabel: string }) {
  const [tab, setTab] = useState<"old" | "new">("old");
  const [selected, setSelected] = useState<string[]>(["genesis"]);
  const decks = CLUE_DECKS.filter((d) => d.testament === tab);
  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  return (
    <div className="bb-clue-panel bb-clue-parchment">
      <div className="bb-clue-tabs">
        <button type="button" className={tab === "old" ? "is-on" : ""} onClick={() => setTab("old")}>Old Testament</button>
        <button type="button" className={tab === "new" ? "is-on" : ""} onClick={() => setTab("new")}>New Testament</button>
      </div>
      <div className="mt-4 grid max-h-[40vh] grid-cols-2 gap-3 overflow-y-auto p-1">
        {decks.map((d) => {
          const on = selected.includes(d.id);
          return (
            <button
              key={d.id}
              type="button"
              disabled={!d.available}
              onClick={() => toggle(d.id)}
              className={`bb-clue-tile ${d.available ? (on ? "is-on" : "") : "is-off"}`}
              style={{ background: `linear-gradient(180deg, ${d.color}, ${d.color}dd)` }}
              aria-pressed={on}
            >
              <div className="bb-clue-tile-name">{d.name}</div>
              <div className="bb-clue-tile-body">
                {d.cardBack ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={d.cardBack} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span aria-hidden="true">📖</span>
                )}
              </div>
              <span className="bb-clue-tile-foot">{d.available ? `${d.cards.length} cards${on ? " ✓" : ""}` : "Coming Soon"}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-center text-[13px] font-bold opacity-75">
        {selected.length ? `${deckLabel(selected)} selected · 10 cards a round` : "Pick a deck"}
      </p>
      <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big mt-3" disabled={!selected.length} onClick={() => onStart(selected)}>
        {startLabel}
      </button>
    </div>
  );
}

/* ---------- a solo round ---------- */

function SoloRound({ deckIds, onExit }: { deckIds: string[]; onExit: () => void }) {
  const [me, setMe] = useState<{ id: string; name: string; avatar: string | null }>({ id: "me", name: "You", avatar: null });
  const [roundId, setRoundId] = useState(newRoundId);
  const pool = useMemo(() => poolFor(deckIds), [deckIds]);
  const { match, view, now, act, reset } = useLocalMatch(() => createMatch({ cards: pool, ...soloSetup("me", "You"), seed: newSeed() }), {
    mode: "solo",
    deckIds,
  });
  const [study, setStudy] = useState<PublicCard | null>(null);
  const [scripture, setScripture] = useState<ClueRef | null>(null);
  const [review, setReview] = useState(false);
  const [challenge, setChallenge] = useState<null | "posting" | { id: string; again: boolean } | { error: string }>(null);

  // Your seat: your Bible Buddy photo and name.
  useEffect(() => {
    void (async () => {
      const id = await clueUserId();
      if (!id) return;
      const { data } = await supabase.from("profile_stats").select("display_name, profile_image_url").eq("user_id", id).maybeSingle();
      setMe({ id: "me", name: (data?.display_name as string) || "You", avatar: (data?.profile_image_url as string) || null });
    })();
  }, []);

  // Deal the first card as soon as the table is up.
  useEffect(() => {
    if (match.phase === "ready") act({ type: "deal", now: Date.now() + ROUND_INTRO_MS });
  }, [match.phase, act]);

  const playAgain = () => {
    reset(createMatch({ cards: pool, ...soloSetup("me", "You"), seed: newSeed() }));
    setRoundId(newRoundId());
    setChallenge(null);
    setReview(false);
  };

  const postChallenge = async () => {
    setChallenge("posting");
    const res = await clueApi<{ id?: string; alreadyPosted?: boolean; error?: string }>("/api/clue-game/challenges", {
      method: "POST",
      body: { roundId, deckIds, cardIds: match.deck, topClue: match.topClue, score: match.scores.me ?? 0, won: (match.piles.me || []).length },
    });
    if (res.ok && res.data.id) {
      setChallenge({ id: res.data.id, again: !!res.data.alreadyPosted });
      if (!res.data.alreadyPosted) trackClue("clue_game_challenge_shared", { challenge: res.data.id, score: match.scores.me ?? 0 });
    } else setChallenge({ error: res.data.error || "Could not post the challenge." });
  };

  const openStudy = (card: PublicCard) => {
    setStudy(card);
    trackClue("clue_game_study_opened", { mode: "solo", card: card.id });
  };

  return (
    <>
      {view.phase !== "over" ? (
        <ClueTable view={view} players={[me]} youId="me" now={now} cardBack={deckById(deckIds[0])?.cardBack} onGuess={(text) => act({ type: "guess", playerId: "me", text })} onWait={() => act({ type: "wait", playerId: "me" })} onStudy={openStudy} />
      ) : review ? (
        <div className="bb-clue-panel bb-clue-parchment">
          <h2 className="bb-clue-serif bb-clue-title" style={{ color: "#2a1a0c" }}>Review Cards</h2>
          <div className="mt-4">
            <ReviewList cards={view.history} onStudy={openStudy} />
          </div>
          <button type="button" className="bb-clue-btn mt-5 w-full" onClick={() => setReview(false)}>Back to results</button>
        </div>
      ) : (
        <ClueResults
          mode="solo"
          deckName={deckLabel(deckIds)}
          score={match.scores.me ?? 0}
          won={(match.piles.me || []).length}
          total={match.deck.length}
          wonCards={view.history.filter((c) => c.outcome === "won")}
          onReview={() => {
            setReview(true);
            trackClue("clue_game_review_opened", { mode: "solo" });
          }}
          primary={
            challenge && typeof challenge === "object" && "id" in challenge ? (
              <div className="rounded-2xl p-3 text-[15px] font-bold" style={{ background: "#e9f1dc", color: "#1d5a34" }}>
                {challenge.again ? "Already on your Feed." : "Posted to your Bible Buddy Feed!"}{" "}
                <Link className="bb-clue-link" href={`/bible-study-games/clue/challenge/${challenge.id}`}>See the leaderboard</Link>
              </div>
            ) : (
              <>
                <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big" disabled={challenge === "posting"} onClick={postChallenge}>
                  👥 {challenge === "posting" ? "Posting…" : "Challenge"}
                </button>
                <p className="-mt-1 text-[14px] italic">Share this round to your Bible Buddy Feed</p>
                {challenge && typeof challenge === "object" && "error" in challenge ? <p className="text-[13px] font-bold text-[#8a2418]">{challenge.error}</p> : null}
              </>
            )
          }
          secondary={
            <div className="flex gap-3">
              <button type="button" className="bb-clue-btn flex-1" onClick={playAgain}>▶ Play Again</button>
              <button type="button" className="bb-clue-btn flex-1" onClick={onExit}>Menu</button>
            </div>
          }
        />
      )}
      {study ? <StudyCard card={study} onClose={() => setStudy(null)} onOpenRef={setScripture} /> : null}
      {scripture ? <ScriptureSheet target={scripture} onClose={() => setScripture(null)} /> : null}
    </>
  );
}

/* ---------- Multiplayer: Host Room or Join Room ---------- */

function Multiplayer({ onBack }: { onBack: () => void }) {
  const router = useRouter();
  const [step, setStep] = useState<"choose" | "host" | "join">("choose");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const host = async (deckIds: string[]) => {
    setBusy(true);
    setError(null);
    const res = await clueApi<{ code?: string; error?: string }>("/api/clue-game/rooms", { method: "POST", body: { deckIds } });
    if (res.ok && res.data.code) {
      trackClue("clue_game_room_created", { decks: deckIds });
      router.push(`/bible-study-games/clue/room/${res.data.code}`);
    } else {
      setError(res.data.error || "Could not create a room.");
      setBusy(false);
    }
  };

  if (step === "host") return <DeckPicker startLabel={busy ? "Creating room…" : "Create Room"} onStart={host} />;
  return (
    <div className="bb-clue-panel bb-clue-parchment">
      {step === "choose" ? (
        <div className="flex flex-col gap-3">
          <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big" onClick={() => setStep("host")}>🏠 Host Room</button>
          <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big" onClick={() => setStep("join")}>🔑 Join Room</button>
          <p className="mt-1 text-center text-[14px]">Play with friends: in the same room, or wherever they are.</p>
          <button type="button" className="bb-clue-link mx-auto" onClick={onBack}>Back</button>
        </div>
      ) : (
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const c = code.toUpperCase().replace(/[^A-Z0-9]/g, "");
            if (c.length >= 4) router.push(`/bible-study-games/clue/room/${c}`);
          }}
        >
          <h2 className="bb-clue-serif text-center text-2xl font-bold">Enter the room code</h2>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="bb-clue-input bb-clue-code text-center"
            style={{ height: 72, fontSize: 34 }}
            maxLength={8}
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            placeholder="ABCDE"
            aria-label="Room code"
          />
          <button type="submit" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big" disabled={code.replace(/[^A-Z0-9]/gi, "").length < 4}>Join</button>
          <button type="button" className="bb-clue-link mx-auto" onClick={() => setStep("choose")}>Back</button>
        </form>
      )}
      {error ? <p className="mt-3 text-center text-[14px] font-bold text-[#8a2418]">{error}</p> : null}
    </div>
  );
}

/* ---------- the app ---------- */

export default function ClueGame() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [deckIds, setDeckIds] = useState<string[]>(["genesis"]);
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
    trackClue("clue_game_opened", { deck: "genesis" });
  }, []);

  const back = screen === "menu" ? undefined : () => setScreen(screen === "play" ? "decks" : "menu");
  const subtitle = screen === "play" ? deckLabel(deckIds) : undefined;
  return (
    <ClueRoomFrame>
      <div className="pb-28">
        <ClueHeader backHref={screen === "menu" ? "/bible-study-games" : undefined} onBack={back} subtitle={subtitle} badge={screen === "play" ? "Solo" : screen === "decks" ? "Beta" : undefined} />
        {screen === "menu" ? (
          <div className="px-4">
            <div className="bb-clue-banner w-fit">
              <h1 className="bb-clue-serif">Bible Clue Game</h1>
              <span className="bb-clue-ribbon">A fun way to test your Bible knowledge</span>
            </div>
            <div className="bb-clue-felt mt-6" style={{ aspectRatio: "2/1" }}>
              <div className="bb-clue-center" style={{ gap: 0 }}>
                {[-16, -8, 0, 8, 16].map((r, i) => (
                  <div key={r} className="bb-clue-drawpile" style={{ transform: `rotate(${r}deg) translateY(${Math.abs(r) / 2}px)`, margin: "0 -14px", zIndex: i === 2 ? 2 : 1 }}>
                    <div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/games/clue/genesis/art/card-back.webp" alt="" className="bb-clue-back-img" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bb-clue-panel bb-clue-parchment flex flex-col gap-3">
              <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big" onClick={() => setScreen("decks")}>▶ Play Solo</button>
              <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big" onClick={() => setScreen("multi")}>👥 Multiplayer</button>
              <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big" onClick={() => setScreen("how")}>📖 How to Play</button>
            </div>
          </div>
        ) : screen === "how" ? (
          <div className="px-0"><HowToPlay onBack={() => setScreen("menu")} /></div>
        ) : screen === "decks" ? (
          <>
            <div className="bb-clue-banner w-fit"><h1 className="bb-clue-serif" style={{ fontSize: 26 }}>Choose Your Deck</h1></div>
            <DeckPicker
              startLabel="Start Game"
              onStart={(ids) => {
                setDeckIds(ids);
                setPlayKey((k) => k + 1);
                setScreen("play");
              }}
            />
          </>
        ) : screen === "multi" ? (
          <>
            <div className="bb-clue-banner w-fit"><h1 className="bb-clue-serif" style={{ fontSize: 26 }}>Multiplayer</h1></div>
            <Multiplayer onBack={() => setScreen("menu")} />
          </>
        ) : (
          <SoloRound key={playKey} deckIds={deckIds} onExit={() => setScreen("menu")} />
        )}
      </div>
    </ClueRoomFrame>
  );
}
