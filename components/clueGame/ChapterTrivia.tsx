"use client";

/**
 * Bible Trivia for one chapter, full screen (Louis, 2026-11-23: the new game
 * replaces the old Bible Trivia "after every chapter, in the study guides
 * after every day"). components/TriviaGamePlayer.tsx opens this over the
 * page it sits in; it is the same table, timer, reveal and results as the
 * game on the Games tab, on that chapter's questions only.
 *
 * It is portalled to <body>: some of the places it opens from sit inside a
 * transformed pager, where position:fixed would land off screen.
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { bookItems, loadBook, selectionToKeys } from "@/lib/clueGame/bank";
import { createMatch, SOLO_SETTINGS, soloSetup, type ClueSelection, type PublicCard } from "@/lib/clueGame/engine";
import { LEVEL_LABEL, LEVEL_PICKER, type ClueLevel, type ClueRef } from "@/lib/clueGame/types";
import { trackClue } from "@/lib/clueGame/track";
import ClueTable from "./ClueTable";
import ClueResults, { ReviewList } from "./ClueResults";
import ChallengeChoices from "./BuddyChallenge";
import { ClueHeader, ClueRoomFrame, ScriptureSheet, StudyCard } from "./ClueParts";
import { introMs, useLocalMatch } from "./useLocalMatch";

export type ChapterTriviaResult = {
  right: number;
  total: number;
  score: number;
  /** Each question and whether it was answered right, for the old progress table. */
  answers: Array<{ id: string; correct: boolean }>;
};

const newSeed = () => Math.floor(Math.random() * 2147483647);
const newRoundId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

function Round({
  selection,
  label,
  onFinish,
  onExit,
}: {
  selection: ClueSelection;
  label: string;
  onFinish: (r: ChapterTriviaResult) => void;
  onExit: () => void;
}) {
  const deckIds = selectionToKeys(selection);
  const [roundId, setRoundId] = useState(newRoundId);
  const { match, view, now, act, reset } = useLocalMatch(
    () => createMatch({ items: bookItems(selection.book), selection, ...soloSetup("me", "You"), settings: SOLO_SETTINGS, seed: newSeed() }),
    { mode: "solo", deckIds },
  );
  const [study, setStudy] = useState<PublicCard | null>(null);
  const [scripture, setScripture] = useState<ClueRef | null>(null);
  const [review, setReview] = useState(false);
  const reported = useRef(false);

  useEffect(() => {
    if (match.phase === "ready") act({ type: "deal", now: Date.now() + introMs() });
  }, [match.phase, act]);

  const regular = match.done.filter((d) => !d.tiebreak);
  const right = regular.filter((d) => (d.points.me ?? 0) > 0).length;
  useEffect(() => {
    if (match.phase !== "over" || reported.current) return;
    reported.current = true;
    onFinish({
      right,
      total: match.deck.length,
      score: match.scores.me ?? 0,
      answers: regular.map((d) => ({ id: d.cardId, correct: (d.points.me ?? 0) > 0 })),
    });
    // Once per game, when it ends.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.phase]);

  const playAgain = () => {
    reset(createMatch({ items: bookItems(selection.book), selection, ...soloSetup("me", "You"), settings: SOLO_SETTINGS, seed: newSeed(), avoid: match.deck }));
    reported.current = false;
    setRoundId(newRoundId());
    setReview(false);
  };
  const openStudy = (card: PublicCard) => {
    setStudy(card);
    trackClue("clue_game_study_opened", { mode: "chapter", card: card.id });
  };

  return (
    <>
      <ClueTable
        view={view}
        players={[{ id: "me", name: "You" }]}
        youId="me"
        now={now}
        cardBack="/games/clue/genesis/art/card-back.webp"
        deckIds={deckIds}
        roundLabel={label}
        onAnswer={(choice) => act({ type: "answer", playerId: "me", choice })}
        onNext={() => act({ type: "next" })}
        onLifeline={(kind) => act({ type: kind, playerId: "me" })}
        isHost
        onPause={() => act({ type: "pause" })}
        onResume={() => act({ type: "resume" })}
        onStudy={openStudy}
        overlay={
          view.phase !== "over" ? undefined : review ? (
            <div className="bb-clue-panel bb-clue-parchment">
              <h2 className="bb-clue-serif bb-clue-title" style={{ color: "#2a1a0c" }}>Your {match.deck.length} Questions</h2>
              <div className="mt-4">
                <ReviewList cards={view.history} youId="me" onStudy={openStudy} onOpenRef={setScripture} />
              </div>
              <button type="button" className="bb-clue-btn mt-5 w-full" onClick={() => setReview(false)}>Back to results</button>
            </div>
          ) : (
            <ClueResults
              mode="solo"
              heading={right === match.deck.length ? "Perfect!" : "Chapter Complete"}
              deckName={LEVEL_PICKER ? `${label} · ${LEVEL_LABEL[selection.level]}` : label}
              score={match.scores.me ?? 0}
              won={right}
              total={match.deck.length}
              onReview={() => setReview(true)}
              primary={
                <>
                  <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big" onClick={onExit}>
                    ✓ Done
                  </button>
                  <ChallengeChoices key={roundId} body={{ roundId, selection, cardIds: match.deck, score: match.scores.me ?? 0, won: right, speed: true }} />
                </>
              }
              secondary={
                <button type="button" className="bb-clue-btn" onClick={playAgain}>
                  ▶ Play again
                </button>
              }
            />
          )
        }
      />
      {study ? <StudyCard card={study} onClose={() => setStudy(null)} onOpenRef={setScripture} /> : null}
      {scripture ? <ScriptureSheet target={scripture} onClose={() => setScripture(null)} /> : null}
    </>
  );
}

export default function ChapterTrivia({
  book,
  bookName,
  chapter,
  level,
  onFinish,
  onExit,
}: {
  /** The game's book id, e.g. "1-samuel". */
  book: string;
  bookName: string;
  chapter: number;
  level: ClueLevel;
  onFinish: (r: ChapterTriviaResult) => void;
  onExit: () => void;
}) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let live = true;
    loadBook(book)
      .then(() => live && setReady(true))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [book]);
  useEffect(() => {
    trackClue("clue_game_started", { mode: "chapter", deck: book, chapter, level });
  }, [book, chapter, level]);

  if (typeof document === "undefined") return null;
  const label = `${bookName} ${chapter}`;
  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 2147483000, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
      <ClueRoomFrame>
        <div className="pb-28">
          <ClueHeader onBack={onExit} subtitle={label} hideLogo />
          {failed ? (
            <div className="bb-clue-panel bb-clue-parchment text-center">
              <p className="bb-clue-serif text-xl font-bold">The questions did not load. Check your connection and try again.</p>
              <button type="button" className="bb-clue-btn mt-4 w-full" onClick={onExit}>Close</button>
            </div>
          ) : !ready ? (
            <p className="mt-10 text-center font-bold" style={{ color: "#fff1c9" }}>Loading the questions…</p>
          ) : (
            <Round selection={{ book, chapters: [chapter], level }} label={label} onFinish={onFinish} onExit={onExit} />
          )}
        </div>
      </ClueRoomFrame>
    </div>,
    document.body,
  );
}
