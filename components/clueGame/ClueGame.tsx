"use client";

/**
 * Bible Clue Game, presented by Bible Buddy: the menu, How to Play, the
 * game setup (book, chapters, level), solo play and the doors into a room.
 *
 * Flow (Louis, 2026-11-22, Notion "Bible Clue Game — Presented by Bible
 * Buddy"): Play Solo → setup → 10 multiple-choice questions → Round Complete
 * (Challenge, Play Again, Review). Multiplayer → Host Room (the host picks the
 * setup → a room code and link) or Join Room (enter the code).
 */

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ALL_CLUE_CARDS, deckById } from "@/lib/clueGame/catalog";
import { BANK_ITEMS, DEFAULT_SELECTION, chaptersWithQuestions, cleanSelection, selectionLabel, selectionStatus, selectionToKeys } from "@/lib/clueGame/bank";

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
import { createMatch, ROUND_INTRO_MS, soloSetup, type ClueMatch, type ClueSelection, type PublicCard } from "@/lib/clueGame/engine";
import type { ClueRef } from "@/lib/clueGame/types";
import { clueApi, clueUserId, trackClue } from "@/lib/clueGame/track";
import { supabase } from "@/lib/supabaseClient";
import ClueTable from "./ClueTable";
import ClueResults, { ReviewList } from "./ClueResults";
import ChallengeChoices from "./BuddyChallenge";
import { ClueHeader, ClueRoomFrame, ScriptureSheet, StudyCard } from "./ClueParts";
import { useLocalMatch } from "./useLocalMatch";

type Screen = "menu" | "how" | "decks" | "play" | "multi";

const SETUP_KEY = "bb:clue-setup";
const SEEN_KEY = "bb:clue-seen";
const GENESIS_BACK = deckById("genesis")?.cardBack;

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeJson(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
/** Every question a match used, so the next one can rotate in fresh ones. */
const usedIn = (m: ClueMatch) => [...new Set([...m.deck, ...m.done.map((d) => d.cardId)])];

const newSeed = () => Math.floor(Math.random() * 2147483647);
const newRoundId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

/* ---------- How to Play ---------- */

function HowToPlay({ onBack }: { onBack: () => void }) {
  const steps: Array<[string, string]> = [
    ["📚", "Pick a book, all chapters or just the ones you want, and Beginner or Medium."],
    ["❓", "A game is 10 questions. Each one has four choices, A to D."],
    ["⏱️", "You have 10 seconds to pick an answer. The clock always runs the full 10 seconds."],
    ["✅", "The fastest right answer earns the point. Only one player scores each question. Wrong costs 1 point. No answer is 0."],
    ["📖", "Then the answer shows, with a short explanation and the verse."],
    ["🏆", "Most points after 10 questions wins. A tie is settled by a tiebreaker: first right answer wins."],
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

/* ---------- Game setup: book, chapters, level ---------- */

function SetupPicker({ onStart, startLabel, busy, error }: { onStart: (sel: ClueSelection) => void; startLabel: string; busy?: boolean; error?: string | null }) {
  const [sel, setSel] = useState<ClueSelection>(DEFAULT_SELECTION);
  const [picking, setPicking] = useState(false);
  const [picked, setPicked] = useState<number[]>([]);
  // The last setup comes back (it lives on this device only).
  useEffect(() => {
    const saved = cleanSelection(readJson(SETUP_KEY, DEFAULT_SELECTION));
    const id = window.setTimeout(() => {
      setSel(saved);
      if (saved.chapters !== "all") {
        setPicking(true);
        setPicked(saved.chapters);
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);
  const chapters = chaptersWithQuestions(sel.book);
  const current: ClueSelection = { ...sel, chapters: picking ? picked : "all" };
  const status = picking && !picked.length ? null : selectionStatus(current);
  const toggle = (n: number) => setPicked((list) => (list.includes(n) ? list.filter((x) => x !== n) : [...list, n].sort((a, b) => a - b)));
  const start = () => {
    if (!status?.enough) return;
    writeJson(SETUP_KEY, current);
    onStart(current);
  };
  return (
    <div className="bb-clue-panel bb-clue-parchment bb-clue-setup">
      <p className="bb-clue-setup-step">1 · Book</p>
      <div className="bb-clue-tabs">
        <button type="button" className="is-on" aria-pressed="true">Genesis</button>
        <button type="button" disabled className="opacity-50">More soon</button>
      </div>

      <p className="bb-clue-setup-step">2 · Chapters</p>
      <div className="bb-clue-tabs">
        <button type="button" className={!picking ? "is-on" : ""} onClick={() => setPicking(false)}>All Chapters</button>
        <button type="button" className={picking ? "is-on" : ""} onClick={() => setPicking(true)}>Select Chapters</button>
      </div>
      {picking ? (
        <div className="bb-clue-chapters" role="group" aria-label="Chapters">
          {chapters.map((n) => (
            <button key={n} type="button" className={picked.includes(n) ? "is-on" : ""} aria-pressed={picked.includes(n)} onClick={() => toggle(n)}>
              {n}
            </button>
          ))}
        </div>
      ) : null}

      <p className="bb-clue-setup-step">3 · Level</p>
      <div className="bb-clue-tabs">
        <button type="button" className={sel.level === "beginner" ? "is-on" : ""} onClick={() => setSel((s) => ({ ...s, level: "beginner" }))}>Beginner</button>
        <button type="button" className={sel.level === "medium" ? "is-on" : ""} onClick={() => setSel((s) => ({ ...s, level: "medium" }))}>Medium</button>
      </div>
      <p className="mt-1 text-center text-[12.5px] font-bold opacity-75">
        {sel.level === "beginner" ? "The main people and events of each chapter." : "Details you remember from reading closely."}
      </p>

      <div className="bb-clue-setup-summary" aria-live="polite">
        {!status ? (
          <p>Tap the chapters you want to play.</p>
        ) : status.enough ? (
          <>
            <p className="font-black">{selectionLabel(current)}</p>
            <p className="text-[13px]">10 questions from {status.count} · 10 seconds each</p>
          </>
        ) : (
          <p className="font-bold" style={{ color: "#8a1f12" }}>
            {selectionLabel(current)} has only {status.count} questions. A game needs {status.needed} (10 plus one for a tiebreaker). Add chapters or pick the other level.
          </p>
        )}
      </div>
      <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big mt-3" disabled={!status?.enough || busy} onClick={start}>
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

function SoloRound({ selection, onExit }: { selection: ClueSelection; onExit: () => void }) {
  const [me, setMe] = useState<{ id: string; name: string; avatar: string | null }>({ id: "me", name: "You", avatar: null });
  const [roundId, setRoundId] = useState(newRoundId);
  const deckIds = selectionToKeys(selection);
  // Questions from your last game come back only when the selection runs out of fresh ones.
  const { match, view, now, act, reset } = useLocalMatch(
    () => createMatch({ items: BANK_ITEMS, selection, ...soloSetup("me", "You"), seed: newSeed(), avoid: typeof window === "undefined" ? [] : readJson<string[]>(SEEN_KEY, []) }),
    { mode: "solo", deckIds },
  );
  const saved = useRef(false);
  useEffect(() => {
    if (match.phase !== "over" || saved.current) return;
    saved.current = true;
    writeJson(SEEN_KEY, usedIn(match));
  }, [match]);
  const right = match.done.filter((d) => !d.tiebreak && (d.points.me ?? 0) > 0).length;
  const [study, setStudy] = useState<PublicCard | null>(null);
  const [scripture, setScripture] = useState<ClueRef | null>(null);
  const [review, setReview] = useState(false);

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
    reset(createMatch({ items: BANK_ITEMS, selection, ...soloSetup("me", "You"), seed: newSeed(), avoid: usedIn(match) }));
    saved.current = false;
    setRoundId(newRoundId());
    setReview(false);
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
        cardBack={GENESIS_BACK}
        deckIds={deckIds}
        roundLabel="Genesis"
        onAnswer={(choice) => act({ type: "answer", playerId: "me", choice })}
        // Solo can pause (Louis, 2026-11-22). Challenges cannot: they are ranked.
        isHost
        onPause={() => act({ type: "pause" })}
        onResume={() => act({ type: "resume" })}
        onStudy={openStudy}
        overlay={view.phase !== "over" ? undefined : review ? (
        <div className="bb-clue-panel bb-clue-parchment">
          <h2 className="bb-clue-serif bb-clue-title" style={{ color: "#2a1a0c" }}>Your 10 Questions</h2>
          <div className="mt-4">
            <ReviewList cards={view.history} youId="me" onStudy={openStudy} onOpenRef={setScripture} />
          </div>
          <button type="button" className="bb-clue-btn mt-5 w-full" onClick={() => setReview(false)}>Back to results</button>
        </div>
        ) : (
        <ClueResults
          mode="solo"
          deckName={selectionLabel(selection)}
          score={match.scores.me ?? 0}
          won={right}
          total={match.deck.length}
          wonCards={view.history.filter((c) => (c.points.me ?? 0) > 0)}
          onReview={() => {
            setReview(true);
            trackClue("clue_game_review_opened", { mode: "solo" });
          }}
          primary={<ChallengeChoices key={roundId} body={{ roundId, selection, cardIds: match.deck, score: match.scores.me ?? 0, won: right }} />}
          secondary={
            <div className="flex gap-3">
              <button type="button" className="bb-clue-btn min-w-0 flex-[3] whitespace-nowrap !px-2" onClick={playAgain}>▶ Play Again</button>
              <button type="button" className="bb-clue-btn min-w-0 flex-[2] whitespace-nowrap !px-2" onClick={onExit}>Menu</button>
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
  const host = async (selection: ClueSelection) => {
    if (busy) return;
    setBusy(true);
    setError(null);
    const create = () => clueApi<{ code?: string; error?: string }>("/api/clue-game/rooms", { method: "POST", body: { selection } });
    let res = await create();
    if (res.status === 401) {
      await supabase.auth.refreshSession().catch(() => null);
      res = await create();
    }
    if (res.ok && res.data.code) {
      trackClue("clue_game_room_created", { decks: selectionToKeys(selection) });
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

  if (step === "host") return <SetupPicker startLabel={busy ? "Creating room…" : "Create Room"} onStart={host} busy={busy} error={error} />;
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
  const [selection, setSelection] = useState<ClueSelection>(DEFAULT_SELECTION);
  const [playKey, setPlayKey] = useState(0);

  useEffect(() => {
    // Where they came from, for the Bible Clue analytics tab: the Games page
    // link says so in the URL; anything else is "direct".
    const from = new URLSearchParams(window.location.search).get("from") || "direct";
    trackClue("clue_game_opened", { deck: "genesis", from });
  }, []);

  const back = screen === "menu" ? undefined : () => setScreen(screen === "play" ? "decks" : "menu");
  const subtitle = undefined;
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
              <p className="bb-clue-herotag">Ten questions. Ten seconds each.</p>
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
            <div className="bb-clue-banner"><h1 className="bb-clue-serif">Set Up Your Game</h1></div>
            <SetupPicker
              startLabel="Start Game"
              onStart={(sel) => {
                setSelection(sel);
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
          <SoloRound key={playKey} selection={selection} onExit={() => setScreen("menu")} />
        )}
      </div>
    </ClueRoomFrame>
  );
}
