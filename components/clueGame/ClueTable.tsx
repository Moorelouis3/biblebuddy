"use client";

/**
 * The Bible Clue Game board. One component for solo, private rooms and
 * challenges: it draws a PublicMatch (lib/clueGame/engine.ts publicView),
 * which never holds the current card's answer before the reveal, and calls
 * back with what the player did. Solo makes the PublicMatch on the device;
 * a room gets it from the server.
 *
 * Layout: Louis's Genesis four-player board (Drive "Genesis Beersheba",
 * 2026-11-22), the same on phones and desktop. The book's scene fills the
 * screen and the UI floats over it:
 *   - the deck and round in the header;
 *   - the other players in equal columns across the top, each with a small
 *     fan of the cards they have won (none in solo);
 *   - one stable play row: the draw pile, the clue panel, the card in play
 *     (its mystery picture, swapped for the reveal in the same slot);
 *   - you: photo, round points, cards collected, then your won cards in a
 *     swipeable strip, each with the points that win actually earned;
 *   - the guess bar docked at the bottom.
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { INTRO_DEAL_EACH_MS, INTRO_SHUFFLE_MS, ROUND_INTRO_MS, type PublicCard, type PublicMatch } from "@/lib/clueGame/engine";
import { sceneFor } from "@/lib/clueGame/catalog";
import { CardBack, SubjectArt } from "./ClueParts";
import { clueSound, startClueMusic } from "@/lib/clueGame/sound";

export type TablePlayer = { id: string; name: string; avatar?: string | null };

const UI = "/games/clue/ui";

function initials(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "?"
  );
}

/** A real profile photo (or initials) inside the gold player ring. */
function RingPhoto({ name, src, size, seat }: { name: string; src?: string | null; size: number; seat: string }) {
  const [broken, setBroken] = useState(false);
  return (
    <span className="bb-cb-ring" style={{ width: size, height: size }} data-seat={seat}>
      <span className="bb-cb-ring-photo" style={{ fontSize: size * 0.34 }}>
        {src && !broken ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" onError={() => setBroken(true)} />
        ) : (
          initials(name)
        )}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="bb-cb-ring-frame" src={`${UI}/player-ring.webp`} alt="" aria-hidden="true" />
    </span>
  );
}

type Won = PublicMatch["history"][number];

export default function ClueTable({
  view,
  players,
  youId,
  now,
  cardBack,
  deckIds,
  onGuess,
  onWait,
  onStudy,
  isHost,
  onPause,
  onResume,
  overlay,
  roundLabel,
}: {
  view: PublicMatch;
  players: TablePlayer[];
  youId: string;
  /** Server-adjusted clock. */
  now: number;
  cardBack?: string;
  /** The decks in play: they choose the scene. */
  deckIds?: string[];
  onGuess: (text: string) => void;
  onWait: () => void;
  onStudy: (card: PublicCard) => void;
  isHost?: boolean;
  onPause?: () => void;
  onResume?: () => void;
  /** Shown in place of the play row (the final results); the players stay in view. */
  overlay?: ReactNode;
  /** The deck name in the header pill. */
  roundLabel?: string;
}) {
  const [guess, setGuess] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const slotRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const round = view.round;
  const card = round?.card ?? null;
  const revealed = (view.phase === "reveal" || view.phase === "over") && !!round?.outcome;
  const paused = view.pausedAt !== null;
  const scene = sceneFor(deckIds);

  const me = players.find((p) => p.id === youId) || { id: youId, name: "You" };
  const others = useMemo(() => players.filter((p) => p.id !== youId).slice(0, 3), [players, youId]);

  // Wins, newest last, from resolved public history only.
  const winsBy = useMemo(() => {
    const map = new Map<string, Won[]>();
    for (const c of view.history) {
      if (c.outcome !== "won" || !c.sideId) continue;
      map.set(c.sideId, [...(map.get(c.sideId) || []), c]);
    }
    return map;
  }, [view.history]);
  const myWins = winsBy.get(youId) || [];

  const at = paused && view.pausedAt ? view.pausedAt : now;
  const clueMsLeft = round && view.phase === "clue" ? Math.max(0, round.clueStartedAt + view.settings.clueSeconds * 1000 - at) : 0;
  const dealMsLeft = round?.revealedAt && view.phase === "reveal" ? Math.max(0, round.revealedAt + view.settings.revealSeconds * 1000 - at) : 0;
  const seconds = Math.min(view.settings.clueSeconds, Math.ceil(clueMsLeft / 1000));
  // The game's opening: shuffle, then the game's cards dealt onto the pile.
  const introLeft = view.dealt === 1 && round && view.phase === "clue" && !paused ? round.clueStartedAt - at : 0;
  const inIntro = introLeft > 0;
  const introElapsed = ROUND_INTRO_MS - introLeft;
  const shuffling = inIntro && introElapsed < INTRO_SHUFFLE_MS;
  const introPile = inIntro && !shuffling ? Math.min(view.deckSize, Math.floor((introElapsed - INTRO_SHUFFLE_MS) / INTRO_DEAL_EACH_MS) + 1) : 0;
  const dealingDone = inIntro && introPile >= view.deckSize;
  const myGuesses = round?.guesses?.[youId] || 0;
  const maxRoundGuesses = view.settings.guessesPerRound ?? 2;
  const roundLeft = Math.max(0, maxRoundGuesses - (round?.roundGuesses?.[youId] || 0));
  const canGuess = view.phase === "clue" && !paused && !inIntro && myGuesses < view.settings.guessesPerClue && roundLeft > 0 && clueMsLeft > 0;
  const waiting = !!round?.waiting?.includes(youId);
  const points = round ? 5 - round.clueIndex : 0;

  // The game screen is locked (Louis: "ain't no scrolling on a game"): the
  // page cannot scroll while the board is up, the app menu is hidden, and the
  // board fills exactly the screen below where it starts.
  const [top, setTop] = useState(0);
  useLayoutEffect(() => {
    const html = document.documentElement;
    const before = { html: html.style.overflow, body: document.body.style.overflow, overscroll: html.style.overscrollBehavior };
    window.scrollTo(0, 0);
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    // The app menu and top bar step aside while a game is on (Louis, 2026-11-22).
    html.classList.add("bb-in-game");
    const measure = () => {
      const el = boardRef.current;
      if (el) setTop(Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      html.style.overflow = before.html;
      document.body.style.overflow = before.body;
      html.style.overscrollBehavior = before.overscroll;
      html.classList.remove("bb-in-game");
    };
  }, []);

  // Quiet music while you are at the table (stops when you leave it).
  useEffect(() => startClueMusic(), []);

  // The keyboard only opens when you tap the box (Louis, 2026-11-22: it
  // popping up on every clue and round "throws off the game"). When a round
  // ends it closes.
  const clueKey = round ? `${view.dealt}:${round.clueIndex}` : "";
  useEffect(() => {
    if (view.phase !== "clue") inputRef.current?.blur();
  }, [view.phase]);

  // The face-down cover on a newly dealt card is taken away after its flip,
  // even if a device never runs the animation, so the silhouette always shows.
  const [uncovered, setUncovered] = useState(0);
  const hasRound = !!round;
  useEffect(() => {
    if (inIntro || !hasRound) return;
    const id = window.setTimeout(() => setUncovered(view.dealt), 1100);
    return () => window.clearTimeout(id);
  }, [view.dealt, inIntro, hasRound]);

  // New wins slide into your strip: keep the newest in view.
  useEffect(() => {
    const el = stripRef.current;
    if (el) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
  }, [myWins.length]);

  /** From the card in play to a player's photo, in px. */
  const vectorTo = (playerId: string) => {
    const board = boardRef.current;
    const slot = slotRef.current?.getBoundingClientRect();
    const seat = board?.querySelector(`[data-seat="${CSS.escape(playerId)}"]`)?.getBoundingClientRect();
    const b = board?.getBoundingClientRect();
    if (!slot || !seat || !b) return null;
    const x = slot.left + slot.width / 2 - b.left;
    const y = slot.top + slot.height / 2 - b.top;
    return { x, y, dx: seat.left + seat.width / 2 - (slot.left + slot.width / 2), dy: seat.top + seat.height / 2 - (slot.top + slot.height / 2) };
  };

  // Send the won card flying to the winner, just before the next deal.
  const [award, setAward] = useState<{ dx: number; dy: number } | null>(null);
  const winnerId = round?.outcome?.kind === "won" ? round.outcome.sideId : null;
  const flyNow = view.phase === "reveal" && !!winnerId && dealMsLeft > 0 && dealMsLeft < 900;
  useLayoutEffect(() => {
    if (!flyNow || !winnerId) {
      setAward(null);
      return;
    }
    const v = vectorTo(winnerId);
    if (v) setAward({ dx: v.dx, dy: v.dy });
  }, [flyNow, winnerId]);

  // Points popping out of the card and flying to a player.
  const [pops, setPops] = useState<Array<{ id: number; text: string; kind: "win" | "lose"; x: number; y: number; dx: number; dy: number; seat: string }>>([]);
  const popId = useRef(0);
  const pop = (text: string, kind: "win" | "lose", playerId: string) => {
    const v = vectorTo(playerId);
    if (!v) return;
    const id = (popId.current += 1);
    setPops((list) => [...list, { id, text, kind, seat: playerId, ...v }]);
    window.setTimeout(() => setPops((list) => list.filter((p) => p.id !== id)), 1900);
  };

  // Sounds, from what changed on the board (the same for solo and rooms).
  // Wrong guesses already on the board when it first draws are old news.
  const heard = useRef({ dealt: view.dealt, clue: round?.clueIndex ?? -1, phase: view.phase, tick: 0, wrongAt: view.recentWrong.length ? view.recentWrong[view.recentWrong.length - 1].at : 0 });
  useEffect(() => {
    const h = heard.current;
    if (view.dealt !== h.dealt && view.phase === "clue" && !(view.dealt === 1 && inIntro)) clueSound.deal();
    else if (view.phase === "clue" && round && round.clueIndex > h.clue && view.dealt === h.dealt) clueSound.clue();
    if (view.phase === "reveal" && h.phase !== "reveal" && round?.outcome) {
      clueSound.flip();
      if (round.outcome.kind === "won") {
        if (round.outcome.sideId === youId) {
          clueSound.correct();
          window.setTimeout(() => clueSound.cheer(), 250);
        } else clueSound.otherWon();
        pop(`+${round.outcome.points}`, "win", round.outcome.sideId);
      } else {
        clueSound.missed();
        window.setTimeout(() => clueSound.aww(), 150);
      }
    }
    const fresh = view.recentWrong.filter((w) => w.at > h.wrongAt);
    if (fresh.length) {
      for (const w of fresh) pop(`−${w.points}`, "lose", w.playerId);
      if (fresh.some((w) => w.playerId === youId)) {
        clueSound.wrong();
        window.setTimeout(() => clueSound.aww(), 180);
      }
      h.wrongAt = fresh[fresh.length - 1].at;
    }
    h.dealt = view.dealt;
    h.clue = round?.clueIndex ?? -1;
    h.phase = view.phase;
    // The first card's deal sound waits for the opening to finish.
    if (view.dealt === 1 && inIntro) h.dealt = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view.dealt, view.phase, round, view.recentWrong, youId, inIntro]);
  // Opening sounds: one riffle, then a flick per card onto the pile.
  const introHeard = useRef({ shuffled: false, pile: 0 });
  useEffect(() => {
    if (!inIntro) return;
    const h = introHeard.current;
    if (shuffling && !h.shuffled) {
      h.shuffled = true;
      clueSound.shuffle();
    }
    if (introPile > h.pile) {
      h.pile = introPile;
      clueSound.dealCard();
    }
  }, [inIntro, shuffling, introPile]);
  useEffect(() => {
    if (view.phase !== "clue" || paused || inIntro || seconds > 3 || seconds < 1) return;
    if (heard.current.tick === seconds + (round?.clueIndex ?? 0) * 100 + view.dealt * 1000) return;
    heard.current.tick = seconds + (round?.clueIndex ?? 0) * 100 + view.dealt * 1000;
    clueSound.tick(seconds === 1);
  }, [seconds, view.phase, paused, inIntro, round?.clueIndex, view.dealt]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!guess.trim() || !canGuess) return;
    onGuess(guess.trim());
    setGuess("");
    // Close the keyboard after a guess; tap the box to guess again.
    inputRef.current?.blur();
  };

  /**
   * Nothing scrolls (Louis: "when I tap on your guess I don't need the whole
   * thing to scroll away"). Phones scroll the page to show a focused box; the
   * board instead takes the height that is left above the keyboard and the
   * page is put straight back at the top.
   */
  useLayoutEffect(() => {
    const vv = window.visualViewport;
    const el = boardRef.current;
    if (!vv || !el) return;
    const fit = () => {
      el.style.setProperty("--vvh", `${Math.round(vv.height)}px`);
      if (window.scrollY !== 0 || document.documentElement.scrollTop !== 0) window.scrollTo(0, 0);
    };
    fit();
    vv.addEventListener("resize", fit);
    vv.addEventListener("scroll", fit);
    return () => {
      vv.removeEventListener("resize", fit);
      vv.removeEventListener("scroll", fit);
    };
  }, []);

  const currentClue = round && view.phase === "clue" ? round.shownClues[round.clueIndex] : "";
  const keyRef = card?.clues?.[4]?.ref ?? card?.clues?.[0]?.ref;
  const winnerName = winnerId ? players.find((p) => p.id === winnerId)?.name : null;
  const pileLeft = inIntro ? (shuffling ? 0 : introPile) : Math.max(0, view.deckSize - view.dealt);
  const over = view.phase === "over";
  const scrollStrip = (dir: 1 | -1) => stripRef.current?.scrollBy({ left: dir * (stripRef.current.clientWidth * 0.7), behavior: "smooth" });
  const nameOf = (id: string) => (id === youId ? "You" : players.find((p) => p.id === id)?.name || "Buddy");

  return (
    <div ref={boardRef} className="bb-cb" style={{ ["--cb-top" as string]: `${top}px`, ["--scene-phone" as string]: `url(${scene.phone})`, ["--scene-desktop" as string]: `url(${scene.desktop})` } as React.CSSProperties}>
      <div className="bb-cb-scene" aria-hidden="true" />

      {/* Deck and round, in the header between Back and Sound */}
      <div className="bb-cb-titles">
        <span className="bb-cb-deckpill">{roundLabel || "Genesis"}</span>
        <span className="bb-cb-roundpill">{over ? "Game over" : `Round ${Math.max(1, view.dealt)} of ${view.deckSize}`}</span>
        {isHost && !over ? (
          <button type="button" className="bb-cb-roundpill is-button" onClick={paused ? onResume : onPause}>
            {paused ? "▶ Resume" : "⏸ Pause"}
          </button>
        ) : null}
      </div>

      {/* The other players across the top, each with their won cards */}
      {others.length ? (
        <div className="bb-cb-others" style={{ gridTemplateColumns: `repeat(${others.length}, minmax(0, 1fr))` }}>
          {others.map((p) => {
            const wins = winsBy.get(p.id) || [];
            const fan = wins.slice(-3);
            const total = view.piles[p.id]?.length ?? wins.length;
            const leading = over && view.winnerSideIds.includes(p.id);
            return (
              <div
                key={p.id}
                className={`bb-cb-other ${pops.some((x) => x.seat === p.id && x.kind === "win") ? "is-scored" : ""} ${pops.some((x) => x.seat === p.id && x.kind === "lose") ? "is-docked" : ""} ${leading ? "is-winner" : ""}`}
              >
                {leading ? <span className="bb-cb-crown" aria-label="Winner">👑</span> : null}
                <RingPhoto name={p.name} src={p.avatar} size={56} seat={p.id} />
                <span className="bb-cb-greenpill bb-cb-namepill">
                  <span className="bb-cb-name">{p.name}</span>
                  <span className="bb-cb-dot">·</span>
                  <span className="bb-cb-pts">{view.scores[p.id] ?? 0} pts</span>
                </span>
                <div className="bb-cb-fan" aria-label={`${total} cards won`}>
                  {fan.map((c, i) => (
                    <span key={`${c.id}-${i}`} className="bb-cb-fancard" style={{ transform: `rotate(${(i - (fan.length - 1) / 2) * 8}deg)`, zIndex: i }}>
                      <SubjectArt card={c} mode="reveal" />
                    </span>
                  ))}
                  {total > fan.length ? <span className="bb-cb-fanmore">+{total - fan.length}</span> : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {pops.map((p) => (
        <span
          key={p.id}
          className={`bb-clue-pop ${p.kind === "win" ? "is-win" : "is-lose"}`}
          style={{ left: p.x, top: p.y, ["--dx" as string]: `${p.dx}px`, ["--dy" as string]: `${p.dy}px` } as React.CSSProperties}
          aria-hidden="true"
        >
          {p.text}
        </span>
      ))}

      {/* The scenery stays visible here; the answers float over it */}
      {overlay ? null : <div className="bb-cb-gap">
        {/* Everyone's answers, with times: only with other players (Louis:
            on your own "it don't need to show each try"). */}
        {view.roundAnswers.length && !inIntro && !overlay && players.length > 1 ? (
          <div className="bb-cb-answers bb-clue-answers">
            <ol>
              {view.roundAnswers.slice(-3).map((a, i) => (
                <li key={`${a.playerId}-${a.clueIndex}-${i}`} className={a.right ? "is-right" : "is-wrong"}>
                  <span className="bb-clue-answers-name">{nameOf(a.playerId)}</span>
                  <span className="bb-clue-answers-time">{a.seconds.toFixed(1)}s</span>
                  <span className="bb-clue-answers-guess">{a.skipped ? "Skipped" : `“${a.guess}”`}</span>
                  <span className="bb-clue-answers-result">{a.skipped ? "0" : a.right ? `✓ +${a.points}` : `✗ −${a.points}`}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>}

      {overlay ? (
        <div className="bb-cb-overlay">{overlay}</div>
      ) : (
        <>
          {/* Draw pile · clue · the card in play */}
          <div className="bb-cb-play">
            <div className="bb-cb-pileslot">
              {shuffling ? (
                <div className="bb-clue-shuffle bb-cb-shuffle" aria-label="Shuffling the deck">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`bb-clue-shuffle-card ${i % 2 ? "is-right" : "is-left"}`} style={{ animationDelay: `${i * 40}ms` }}>
                      <CardBack src={cardBack} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`bb-cb-pile ${pileLeft === 0 ? "is-empty" : ""}`} aria-label={`${pileLeft} cards left`}>
                  {/* The last round: the deck is used up, but its place stays on the table (faded, 0). */}
                  {pileLeft === 0 && !inIntro ? (
                    <div className="bb-cb-pilecard is-ghost">
                      <CardBack src={cardBack} />
                    </div>
                  ) : null}
                  {Array.from({ length: Math.min(pileLeft, 4) }).map((_, i) => (
                    <div key={i} className="bb-cb-pilecard" style={{ transform: `translate(${-i * 2.5}px, ${i * 2.5}px)`, zIndex: 4 - i }}>
                      <CardBack src={cardBack} />
                    </div>
                  ))}
                  {inIntro && !dealingDone && introPile > 0 ? (
                    <div key={introPile} className="bb-cb-pilecard bb-clue-intro-fly" style={{ zIndex: 6 }}>
                      <CardBack src={cardBack} />
                    </div>
                  ) : null}
                  {pileLeft > 0 || !inIntro ? <span className="bb-cb-pilebadge">{pileLeft}</span> : null}
                </div>
              )}
            </div>

            <div className="bb-cb-panel">
              {inIntro ? (
                <p className="bb-cb-panel-big">{shuffling ? "Shuffling the deck…" : dealingDone ? "Round 1. Here we go!" : `Dealing ${view.deckSize} cards…`}</p>
              ) : paused ? (
                <p className="bb-cb-panel-big">{players.length > 1 ? "Paused by the host. Talk it over!" : "Paused. Tap Resume when you are ready."}</p>
              ) : view.phase === "clue" && card ? (
                <>
                  <div className="bb-cb-panel-head">
                    <span>
                      Clue {(round?.clueIndex ?? 0) + 1} of 5 <span className="bb-cb-worth">· {points} pts</span>
                    </span>
                    <span className="bb-cb-sep" />
                    <span className={`bb-cb-timer ${seconds <= 3 ? "is-final" : ""}`} aria-live="polite">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`${UI}/icon-stopwatch.webp`} alt="" />
                      0:{String(seconds).padStart(2, "0")}
                    </span>
                  </div>
                  <p key={clueKey} className="bb-cb-clue bb-clue-fadein">{currentClue}</p>
                </>
              ) : revealed && card ? (
                <>
                  <p className="bb-cb-answer">{card.answer}</p>
                  <div className="bb-cb-panel-row">
                    {keyRef ? <span className="bb-cb-ref">{keyRef.label}</span> : null}
                    <button type="button" className="bb-clue-link text-[14px]" onClick={() => onStudy(card)}>
                      📖 Study
                    </button>
                  </div>
                  <p className="bb-cb-outcome" style={{ color: round?.outcome?.kind === "won" ? "#1d5a34" : "#8a5a1a" }}>
                    {round?.outcome?.kind === "won" ? `${winnerId === youId ? "You" : winnerName || "A player"} won it · +${round.outcome.points}` : "Nobody got this one."}
                    {view.phase === "reveal" ? (view.dealt >= view.deckSize ? " · Last round!" : ` · Round ${view.dealt + 1} in ${Math.max(1, Math.ceil(dealMsLeft / 1000))}…`) : ""}
                  </p>
                </>
              ) : null}
            </div>

            <div ref={slotRef} className="bb-cb-slot">
              {card && !inIntro ? (
                <div
                  key={view.dealt}
                  className={`bb-cb-cardwrap bb-clue-deal ${award ? "bb-clue-award" : ""}`}
                  style={award ? ({ ["--dx" as string]: `${award.dx}px`, ["--dy" as string]: `${award.dy}px` } as React.CSSProperties) : undefined}
                >
                  {revealed && round?.outcome?.kind === "won" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="bb-clue-sparkle" src={`${UI}/sparkle.webp`} alt="" aria-hidden="true" />
                  ) : null}
                  <div className={`bb-cb-card ${revealed ? "is-revealed" : "bb-clue-flipin"}`}>
                    <span className="bb-cb-card-art">
                      <SubjectArt card={card} mode={revealed ? "reveal" : "mystery"} />
                    </span>
                    {/* Person, place or thing (Louis, 2026-11-22: keywords say "Thing"). */}
                    {!revealed ? <span className="bb-cb-card-cat">{card.category === "person" ? "Person" : card.category === "place" ? "Place" : "Thing"}</span> : null}
                    {!revealed && uncovered !== view.dealt ? (
                      <div className="bb-cb-cardcover" aria-hidden="true">
                        <CardBack src={cardBack} />
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="bb-cb-card is-empty" aria-hidden="true" />
              )}
            </div>
          </div>

          {/* You */}
          <div className="bb-cb-me">
            <span className={`bb-cb-mechip ${pops.some((x) => x.seat === youId && x.kind === "win") ? "is-scored" : ""} ${pops.some((x) => x.seat === youId && x.kind === "lose") ? "is-docked" : ""}`}>
              <RingPhoto name={me.name} src={me.avatar} size={60} seat={youId} />
              <span className="bb-cb-greenpill bb-cb-mepill">You · {view.scores[youId] ?? 0} pts</span>
            </span>
            <span className="bb-cb-divider" />
            <span className="bb-cb-creampill bb-cb-collected">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${UI}/icon-trophy.webp`} alt="" />
              {view.piles[youId]?.length ?? myWins.length} collected
            </span>
          </div>

          {/* Your won cards */}
          <div className="bb-cb-stripwrap">
            {myWins.length > 2 ? (
              <button type="button" className="bb-cb-arrow is-left" aria-label="Earlier cards" onClick={() => scrollStrip(-1)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${UI}/icon-arrow.webp`} alt="" />
              </button>
            ) : null}
            <div ref={stripRef} className="bb-cb-strip">
              {myWins.length ? (
                myWins.map((c, i) => (
                  <button key={`${c.id}-${i}`} type="button" className="bb-cb-won" onClick={() => onStudy(c)} aria-label={`Review ${c.answer}`}>
                    <span className="bb-cb-won-art">
                      <SubjectArt card={c} mode="reveal" />
                    </span>
                    <span className="bb-cb-won-name">{c.answer}</span>
                    <span className="bb-cb-won-pts">+{c.points ?? 0}</span>
                  </button>
                ))
              ) : (
                <p className="bb-cb-strip-empty">Cards you win land here.</p>
              )}
            </div>
            {myWins.length > 2 ? (
              <button type="button" className="bb-cb-arrow is-right" aria-label="Later cards" onClick={() => scrollStrip(1)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${UI}/icon-arrow.webp`} alt="" />
              </button>
            ) : null}
          </div>
        </>
      )}

      {/* The guess bar, docked at the bottom */}
      {!over && !overlay ? (
        <form onSubmit={submit} className="bb-cb-hand">
          <input
            ref={inputRef}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={!canGuess}
            placeholder={inIntro ? "Get ready…" : canGuess ? (roundLeft === 1 ? "Last guess this round…" : `Your guess… (${roundLeft} left)`) : view.phase === "clue" && roundLeft <= 0 ? "No guesses left this round" : view.phase === "reveal" ? "Next round coming…" : waiting ? "Skipped. Waiting for the others…" : "Next clue coming…"}
            className="bb-cb-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="words"
            spellCheck={false}
            enterKeyHint="go"
            aria-label="Your guess"
          />
          {/* One button (Louis, 2026-11-22: the Wait button goes away): with
              something typed it guesses; with the box empty it skips this clue
              for 0 points, counted as the clue's full time. */}
          {guess.trim() ? (
            <button type="submit" className="bb-cb-guess" disabled={!canGuess}>
              Guess
            </button>
          ) : (
            <button type="button" onClick={onWait} className="bb-cb-guess is-skip" disabled={waiting || !canGuess} title="Skip this clue (0 points)">
              Skip
            </button>
          )}
        </form>
      ) : null}
    </div>
  );
}
