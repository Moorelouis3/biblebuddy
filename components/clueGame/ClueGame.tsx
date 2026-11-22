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
import { ALL_CLUE_CARDS, CLUE_DECKS, deckById, deckLabel, poolFor } from "@/lib/clueGame/catalog";

/** The menu's card: Joseph, mystery then revealed (Louis's mockup). */
const HERO_CARD = ALL_CLUE_CARDS.get("joseph");

/** A gold laurel branch for the title. */
function Laurel({ flip }: { flip?: boolean }) {
  const leaves = [0, 1, 2, 3, 4, 5];
  return (
    <svg className="bb-clue-laurel" viewBox="0 0 40 80" aria-hidden="true" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M30 76 C 10 60, 8 32, 22 6" fill="none" stroke="#d9a843" strokeWidth="2.6" strokeLinecap="round" />
      {leaves.map((i) => {
        const y = 66 - i * 11;
        const x = 22 - Math.sin((i / 5) * Math.PI) * 9 + (i === 5 ? 2 : 0);
        return (
          <g key={i}>
            <ellipse cx={x - 7} cy={y} rx="7.5" ry="3.4" fill="#e8bb55" transform={`rotate(-35 ${x - 7} ${y})`} />
            <ellipse cx={x + 6} cy={y - 4} rx="7" ry="3.2" fill="#c8952f" transform={`rotate(-70 ${x + 6} ${y - 4})`} />
          </g>
        );
      })}
    </svg>
  );
}
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
    ["🃏", "A game is 10 rounds. Each round, one card is dealt face down: you see only whether it is a Person, Place or Keyword, and its silhouette."],
    ["5️⃣", "Clues come one at a time, from 5 points down to 1. Each clue stays up for 15 seconds."],
    ["✅", "The fastest right answer wins that clue’s points and the card."],
    ["❌", "Guess wrong and you lose that many points. One guess per clue, two per round."],
    ["⏳", "Not sure? Tap Skip for the next clue. Skipping costs nothing."],
    ["🔁", "The next round deals itself. Most points after 10 rounds wins."],
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

function DeckPicker({ onStart, startLabel, busy, error }: { onStart: (deckIds: string[]) => void; startLabel: string; busy?: boolean; error?: string | null }) {
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
                {d.tile ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={d.tile} alt="" className="h-full w-full object-cover" />
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
        {selected.length ? `${deckLabel(selected)} selected · 10 rounds a game` : "Pick a deck"}
      </p>
      <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big mt-3" disabled={!selected.length || busy} onClick={() => onStart(selected)}>
        {startLabel}
      </button>
      {error ? (
        <p className="mt-3 rounded-xl px-3 py-2 text-center text-[14px] font-bold" style={{ background: "#fde2dc", color: "#8a1f12" }} role="alert">
          {error}
        </p>
      ) : null}
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
      <ClueTable
        view={view}
        players={[me]}
        youId="me"
        now={now}
        cardBack={deckById(deckIds[0])?.cardBack}
        deckIds={deckIds}
        roundLabel={deckLabel(deckIds)}
        onGuess={(text) => act({ type: "guess", playerId: "me", text })}
        onWait={() => act({ type: "wait", playerId: "me" })}
        // Solo can pause (Louis, 2026-11-22). Challenges cannot: they are ranked.
        isHost
        onPause={() => act({ type: "pause" })}
        onResume={() => act({ type: "resume" })}
        onStudy={openStudy}
        overlay={view.phase !== "over" ? undefined : review ? (
        <div className="bb-clue-panel bb-clue-parchment">
          <h2 className="bb-clue-serif bb-clue-title" style={{ color: "#2a1a0c" }}>Your 10 Rounds</h2>
          <div className="mt-4">
            <ReviewList cards={view.history} onStudy={openStudy} onOpenRef={setScripture} />
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
              <button type="button" className="bb-clue-btn flex-1 whitespace-nowrap !px-3" onClick={playAgain}>▶ Play Again</button>
              <button type="button" className="bb-clue-btn flex-1" onClick={onExit}>Menu</button>
            </div>
          }
        />
        )}
      />
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

  /**
   * Create the room. A failure used to leave the button looking dead (the
   * error was never shown on this screen; Louis, 2026-11-22). Now: an expired
   * sign-in is refreshed and tried once more, the reason is shown under the
   * button, and every failure is logged so it can be seen from the admin side.
   */
  const host = async (deckIds: string[]) => {
    if (busy) return;
    setBusy(true);
    setError(null);
    const create = () => clueApi<{ code?: string; error?: string }>("/api/clue-game/rooms", { method: "POST", body: { deckIds } });
    let res = await create();
    if (res.status === 401) {
      await supabase.auth.refreshSession().catch(() => null);
      res = await create();
    }
    if (res.ok && res.data.code) {
      trackClue("clue_game_room_created", { decks: deckIds });
      router.push(`/bible-study-games/clue/room/${res.data.code}`);
      return;
    }
    const message =
      res.status === 401
        ? "You are signed out. Sign in again, then tap Create Room."
        : res.status === 0
          ? "No connection. Check your internet and tap Create Room again."
          : res.data.error || "Could not create a room. Tap Create Room to try again.";
    trackClue("clue_game_room_failed", { status: res.status, error: String(res.data.error || "").slice(0, 160) });
    setError(message);
    setBusy(false);
  };

  if (step === "host") return <DeckPicker startLabel={busy ? "Creating room…" : "Create Room"} onStart={host} busy={busy} error={error} />;
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
    // Where they came from, for the Bible Clue analytics tab: the Games page
    // link says so in the URL; anything else is "direct".
    const from = new URLSearchParams(window.location.search).get("from") || "direct";
    trackClue("clue_game_opened", { deck: "genesis", from });
  }, []);

  const back = screen === "menu" ? undefined : () => setScreen(screen === "play" ? "decks" : "menu");
  const subtitle = screen === "play" ? deckLabel(deckIds) : undefined;
  return (
    <ClueRoomFrame>
      <div className="pb-28">
        <ClueHeader backHref={screen === "menu" ? "/bible-study-games" : undefined} onBack={back} subtitle={screen === "play" ? undefined : subtitle} badge={screen === "decks" ? "Beta" : undefined} hideLogo={screen === "menu" || screen === "play"} />
        {screen === "menu" ? (
          <div className="px-4">
            {/* The menu, built to Louis's mockup (2026-11-22): gold title between
                laurels, the tagline, Joseph's mystery card turning into his
                revealed card on the edge of the table, the three buttons on the felt. */}
            <div className="bb-clue-hero">
              <div className="bb-clue-herotitle">
                <Laurel />
                <h1 className="bb-clue-serif">Bible Clue</h1>
                <Laurel flip />
              </div>
              <div className="bb-clue-herorule" />
              <p className="bb-clue-herotag">Follow the clues. Guess the answer.</p>
              <div className="bb-clue-herotable">
                <div className="bb-clue-herofelt" />
                <div className="bb-clue-herocards">
                  <div className="bb-clue-herocard is-left">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={HERO_CARD?.art.mystery} alt="A mystery card" />
                  </div>
                  <svg className="bb-clue-heroarrow" viewBox="0 0 120 80" aria-hidden="true">
                    <defs>
                      <linearGradient id="bbHeroGold" x1="0" x2="1">
                        <stop offset="0" stopColor="#b8862e" />
                        <stop offset="1" stopColor="#ffe08a" />
                      </linearGradient>
                    </defs>
                    <path d="M8 58 C 34 22, 70 18, 96 34" fill="none" stroke="url(#bbHeroGold)" strokeWidth="9" strokeLinecap="round" />
                    <path d="M90 18 L112 40 L84 48 Z" fill="#ffe08a" />
                    <path d="M58 6 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z M20 20 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z M100 62 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="#fff1b8" />
                  </svg>
                  <div className="bb-clue-herocard is-right">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={HERO_CARD?.art.reveal} alt={HERO_CARD?.answer || ""} />
                  </div>
                </div>
                <div className="bb-clue-panel bb-clue-parchment bb-clue-heropanel flex flex-col gap-3">
                  <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big" onClick={() => setScreen("decks")}>▶ Play Solo</button>
                  <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big" onClick={() => setScreen("multi")}><img src="/games/clue/ui/icon-players.webp" alt="" className="bb-clue-btnicon" /> Multiplayer</button>
                  <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big" onClick={() => setScreen("how")}>📖 How to Play</button>
                </div>
              </div>
            </div>
          </div>
        ) : screen === "how" ? (
          <div className="px-0"><HowToPlay onBack={() => setScreen("menu")} /></div>
        ) : screen === "decks" ? (
          <>
            <div className="bb-clue-banner"><h1 className="bb-clue-serif">Choose Your Deck</h1></div>
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
            <div className="bb-clue-banner"><h1 className="bb-clue-serif">Multiplayer</h1></div>
            <Multiplayer onBack={() => setScreen("menu")} />
          </>
        ) : (
          <SoloRound key={playKey} deckIds={deckIds} onExit={() => setScreen("menu")} />
        )}
      </div>
    </ClueRoomFrame>
  );
}
