"use client";

/**
 * One Bible Memory practice session: five questions across the three games,
 * then a short summary.
 *
 * The rules (what is asked, what counts as right) are all in
 * lib/bibleMemoryGames.ts. This file is only the screens. Its look follows
 * the Trivia player: the same green and red answer states, the same
 * "Correct / Not quite" panel with the verse under it, the same results card.
 *
 * Progress is written after every answer, not at the end, so leaving half way
 * through keeps what was done. A mistake is never punished beyond being
 * counted: the right answer is shown and the session moves on.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { LouisAvatar } from "@/components/LouisAvatar";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { logActionToMasterActions } from "@/lib/actionRecorder";
import { saveMemoryProgress } from "@/lib/bibleMemory";
import {
  buildSession,
  cleanVerseText,
  formatReference,
  isFillChoiceCorrect,
  isOrderCorrect,
  memoryLabel,
  summariseSession,
  type AnswerResult,
  type FillQuestion,
  type MemoryQuestion,
  type MemoryVerse,
  type OrderQuestion,
  type OrderTile,
  type ReferenceQuestion,
} from "@/lib/bibleMemoryGames";

type Props = {
  userId: string;
  verses: MemoryVerse[];
  onFinished: () => void;
  onExit: () => void;
};

const GAME_TITLES: Record<MemoryQuestion["type"], string> = {
  fill: "Fill in the blank",
  order: "Put the words in order",
  reference: "Match the reference",
};

const GAME_HINTS: Record<MemoryQuestion["type"], string> = {
  fill: "Tap the missing word.",
  order: "Tap the words in order. Tap a placed word to take it back.",
  reference: "Where is this verse found?",
};

const cardClass = "rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-5 shadow-sm";
const primaryButton =
  "rounded-xl bg-[var(--bb-button,#2563eb)] px-5 py-3 text-base font-black text-[var(--bb-button-text,#ffffff)] transition hover:brightness-95";

function answerStyle(state: "right" | "wrong" | "idle") {
  if (state === "right") return { backgroundColor: "#BBF7D0", borderColor: "#16A34A", color: "#111827" };
  if (state === "wrong") return { backgroundColor: "#FECACA", borderColor: "#DC2626", color: "#111827" };
  return undefined;
}

export default function MemoryPractice({ userId, verses, onFinished, onExit }: Props) {
  // Built once per session: the verse list must not reshuffle the questions
  // when progress saves and the parent hands down fresh rows.
  const [questions] = useState<MemoryQuestion[]>(() => buildSession(verses, new Date()));
  const [startVerses] = useState<MemoryVerse[]>(() => verses);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<AnswerResult[]>([]);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  // Running totals per verse, so each write is the true count and not a
  // stale one from when the session opened.
  const tallies = useRef(new Map<string, { correct: number; mistakes: number }>());

  const question = questions[index] ?? null;
  const verseById = useMemo(() => new Map(startVerses.map((verse) => [verse.id, verse])), [startVerses]);

  useEffect(() => {
    if (answered === null) return;
    // On a phone the result panel lands below the fold. Bring Next into view.
    const timer = window.setTimeout(() => nextRef.current?.scrollIntoView({ block: "end" }), 80);
    return () => window.clearTimeout(timer);
  }, [answered]);

  function recordAnswer(correct: boolean) {
    if (!question || answered !== null) return;
    setAnswered(correct);
    setResults((current) => [...current, { verseId: question.verseId, correct }]);

    const verse = verseById.get(question.verseId);
    if (!verse) return;
    const tally = tallies.current.get(verse.id) ?? { correct: 0, mistakes: 0 };
    if (correct) tally.correct += 1;
    else tally.mistakes += 1;
    tallies.current.set(verse.id, tally);
    void saveMemoryProgress(userId, verse.id, {
      correct_count: verse.correct_count + tally.correct,
      mistake_count: verse.mistake_count + tally.mistakes,
      last_practised_at: new Date().toISOString(),
    }).then((ok) => {
      if (!ok) setSaveFailed(true);
    });
  }

  async function finish(allResults: AnswerResult[]) {
    setFinishing(true);
    const outcomes = summariseSession(startVerses, allResults);
    const now = new Date().toISOString();
    const saved = await Promise.all(
      outcomes.map((outcome) => {
        const verse = verseById.get(outcome.verseId);
        if (!verse) return Promise.resolve(true);
        return saveMemoryProgress(userId, verse.id, {
          level: outcome.level,
          correct_count: verse.correct_count + outcome.correct,
          mistake_count: verse.mistake_count + outcome.mistakes,
          last_practised_at: now,
        });
      }),
    );
    if (saved.some((ok) => !ok)) setSaveFailed(true);

    // One logged action per finished session. It keeps the streak alive like
    // any other action, and lib/pointsEngine.ts only scores two of them a day.
    // A failure here must not cost the person their results screen.
    const right = allResults.filter((result) => result.correct).length;
    try {
      await logActionToMasterActions(
        userId,
        ACTION_TYPE.bible_memory_session_completed,
        `Bible Memory - ${right}/${allResults.length}`,
      );
    } catch {
      // Logged by the recorder. Practice progress is already saved above.
    }
    setFinishing(false);
    setDone(true);
    onFinished();
  }

  function next() {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setAnswered(null);
      window.scrollTo({ top: 0 });
      return;
    }
    void finish(results);
  }

  if (!question && !done) {
    return (
      <div className={cardClass}>
        <p className="text-sm font-bold text-[var(--bb-text-primary,#111827)]">Add a verse first, then come back to practise.</p>
        <button type="button" onClick={onExit} className={`${primaryButton} mt-4`}>
          Back to my verses
        </button>
      </div>
    );
  }

  if (done) {
    const right = results.filter((result) => result.correct).length;
    const outcomes = summariseSession(startVerses, results);
    const encouragement =
      right === results.length
        ? "Every one right. These words are settling in."
        : right >= Math.ceil(results.length / 2)
          ? "Good work. The ones you missed will come back sooner."
          : "You showed up and practised, and that is how it sticks. The hard ones will come back first.";
    const laterTime = new Date();
    return (
      <div className={`${cardClass} text-center`}>
        <div className="mx-auto grid h-20 w-20 place-items-center overflow-hidden rounded-full border border-[var(--bb-card-border,#dbe7f4)] bg-white">
          <LouisAvatar mood="stareyes" size={92} />
        </div>
        <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[var(--bb-text-muted,#6b7280)]">Bible Memory</p>
        <h2 className="mt-2 text-2xl font-black text-[var(--bb-text-primary,#111827)]">Practice finished</h2>
        <p className="mt-4 text-5xl font-black leading-none text-[var(--bb-text-primary,#111827)]">
          {right}/{results.length}
        </p>
        <p className="mx-auto mt-4 max-w-md text-base font-bold leading-7 text-[var(--bb-text-primary,#111827)]">{encouragement}</p>

        <ul className="mt-6 flex flex-col gap-2 text-left">
          {outcomes.map((outcome) => {
            const verse = verseById.get(outcome.verseId);
            if (!verse) return null;
            const label = memoryLabel({ level: outcome.level, last_practised_at: laterTime.toISOString() }, laterTime);
            return (
              <li
                key={outcome.verseId}
                className="flex items-center justify-between gap-3 rounded-xl bg-[var(--bb-surface-soft,#f3f4f6)] px-4 py-3"
              >
                <span className="text-sm font-black text-[var(--bb-text-primary,#111827)]">{formatReference(verse)}</span>
                <span className="text-xs font-black text-[var(--bb-text-secondary,#374151)]">
                  {outcome.mistakes === 0 ? "All right" : `${outcome.correct} right, ${outcome.mistakes} to review`} · {label}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-5 text-sm font-bold text-[var(--bb-text-secondary,#374151)]">
          {saveFailed
            ? "Some of this session did not save. Check your connection before you practise again."
            : "Your progress was saved."}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button type="button" onClick={onExit} className={primaryButton}>
            Back to my verses
          </button>
        </div>
      </div>
    );
  }

  if (!question) return null;
  const verse = verseById.get(question.verseId);
  const fullText = verse ? cleanVerseText(verse.verse_text) : "";
  const reference = verse ? formatReference(verse) : "";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={onExit} className="text-sm font-bold text-[var(--bb-text-muted,#6b7280)]">
          ← Stop
        </button>
        <p className="text-sm font-black text-[var(--bb-text-secondary,#374151)]">
          Question {index + 1} of {questions.length}
        </p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--bb-surface-soft,#e5e7eb)]" aria-hidden="true">
        <div
          className="h-full rounded-full bg-[var(--bb-accent,#2563eb)] transition-all"
          style={{ width: `${((index + (answered !== null ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <div className={cardClass}>
        <p className="text-xs font-black uppercase tracking-wide text-[var(--bb-accent,#2563eb)]">{GAME_TITLES[question.type]}</p>
        <p className="mt-1 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">{GAME_HINTS[question.type]}</p>

        <div className="mt-5">
          {question.type === "fill" ? (
            <FillGame key={index} question={question} locked={answered !== null} onDone={recordAnswer} />
          ) : question.type === "order" ? (
            <OrderGame key={index} question={question} locked={answered !== null} onDone={recordAnswer} />
          ) : (
            <ReferenceGame key={index} question={question} locked={answered !== null} onDone={recordAnswer} />
          )}
        </div>

        {answered !== null ? (
          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <p className={`text-sm font-black ${answered ? "text-green-700" : "text-red-700"}`}>
              {answered ? "Correct" : "Not quite. Here it is:"}
            </p>
            <p className="mt-3 font-serif text-lg font-bold leading-7 text-gray-900">{fullText}</p>
            <p className="mt-2 text-sm font-black text-gray-700">
              {reference} · {question.translation}
            </p>
            <button type="button" ref={nextRef} onClick={next} disabled={finishing} className={`${primaryButton} mt-5 w-full`}>
              {finishing ? "Saving..." : index < questions.length - 1 ? "Next" : "See results"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ───────────────────────── fill in the blank ─────────────────────────

function FillGame({ question, locked, onDone }: { question: FillQuestion; locked: boolean; onDone: (correct: boolean) => void }) {
  // One entry per blank answered so far: the word that was tapped.
  const [picks, setPicks] = useState<string[]>([]);
  const current = question.blanks[picks.length] ?? null;
  const blankAt = useMemo(() => new Map(question.blanks.map((blank, order) => [blank.index, order])), [question]);

  function choose(choice: string) {
    if (locked || !current) return;
    const nextPicks = [...picks, choice];
    setPicks(nextPicks);
    if (nextPicks.length === question.blanks.length) {
      onDone(nextPicks.every((pick, order) => isFillChoiceCorrect(question.blanks[order], pick)));
    }
  }

  return (
    <div>
      <p className="text-sm font-black text-[var(--bb-text-secondary,#374151)]">
        {question.reference} · {question.translation}
      </p>
      <p className="mt-3 font-serif text-xl font-bold leading-9 text-[var(--bb-text-primary,#111827)]">
        {question.tokens.map((token, tokenIndex) => {
          const order = blankAt.get(tokenIndex);
          if (order === undefined) return <span key={tokenIndex}>{token} </span>;
          const blank = question.blanks[order];
          const pick = picks[order];
          if (pick === undefined) {
            const isCurrent = order === picks.length;
            return (
              <span key={tokenIndex}>
                <span
                  className={`inline-block min-w-[4.5rem] rounded-lg border-2 border-dashed px-2 text-center align-baseline ${
                    isCurrent ? "border-[var(--bb-accent,#2563eb)] bg-[var(--bb-accent-soft,#eaf2ff)]" : "border-gray-300"
                  }`}
                >
                  &nbsp;
                </span>{" "}
              </span>
            );
          }
          const right = isFillChoiceCorrect(blank, pick);
          return (
            <span key={tokenIndex}>
              <span className="rounded-lg border-2 px-2" style={answerStyle(right ? "right" : "wrong")}>
                {token}
              </span>{" "}
            </span>
          );
        })}
      </p>

      {current && !locked ? (
        <div className="mt-6 grid grid-cols-2 gap-3">
          {current.choices.map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => choose(choice)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-4 text-base font-black text-gray-900 transition hover:border-blue-300 hover:bg-blue-50 active:scale-[0.98]"
            >
              {choice}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// ───────────────────────── put the words in order ─────────────────────────

function OrderGame({ question, locked, onDone }: { question: OrderQuestion; locked: boolean; onDone: (correct: boolean) => void }) {
  const [placed, setPlaced] = useState<OrderTile[]>([]);
  const placedIds = new Set(placed.map((tile) => tile.id));
  const remaining = question.bank.filter((tile) => !placedIds.has(tile.id));
  const complete = placed.length === question.words.length;
  const correct = complete && isOrderCorrect(placed.map((tile) => tile.word), question.words);

  function place(tile: OrderTile) {
    if (locked) return;
    const nextPlaced = [...placed, tile];
    setPlaced(nextPlaced);
    if (nextPlaced.length === question.words.length) {
      onDone(isOrderCorrect(nextPlaced.map((item) => item.word), question.words));
    }
  }

  function takeBack(tile: OrderTile) {
    if (locked) return;
    setPlaced(placed.filter((item) => item.id !== tile.id));
  }

  const tileClass =
    "rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-base font-black text-gray-900 shadow-sm transition active:scale-[0.97]";

  return (
    <div>
      <p className="text-sm font-black text-[var(--bb-text-secondary,#374151)]">
        {question.reference} · {question.translation}
      </p>

      <div className="mt-3 font-serif text-lg font-bold leading-8 text-[var(--bb-text-muted,#6b7280)]">
        {question.before ? <span>{question.before} </span> : null}
        <span
          className="my-1 flex min-h-[3.5rem] flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed p-2 font-sans"
          style={locked ? answerStyle(correct ? "right" : "wrong") : { borderColor: "var(--bb-accent,#2563eb)" }}
        >
          {placed.length === 0 ? (
            <span className="px-2 text-sm font-semibold text-[var(--bb-text-muted,#6b7280)]">Your answer goes here</span>
          ) : null}
          {placed.map((tile) => (
            <button
              key={tile.id}
              type="button"
              onClick={() => takeBack(tile)}
              disabled={locked}
              aria-label={`Take back ${tile.word}`}
              className={tileClass}
            >
              {tile.word}
            </button>
          ))}
        </span>
        {question.after ? <span> {question.after}</span> : null}
      </div>

      {!locked ? (
        <>
          <div className="mt-5 flex flex-wrap gap-2">
            {remaining.map((tile) => (
              <button key={tile.id} type="button" onClick={() => place(tile)} className={tileClass}>
                {tile.word}
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setPlaced(placed.slice(0, -1))}
              disabled={!placed.length}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-black text-gray-700 disabled:opacity-40"
            >
              ↩ Undo
            </button>
            <button
              type="button"
              onClick={() => setPlaced([])}
              disabled={!placed.length}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-black text-gray-700 disabled:opacity-40"
            >
              Clear
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

// ───────────────────────── match the reference ─────────────────────────

function ReferenceGame({
  question,
  locked,
  onDone,
}: {
  question: ReferenceQuestion;
  locked: boolean;
  onDone: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div>
      <p className="font-serif text-xl font-bold leading-8 text-[var(--bb-text-primary,#111827)]">{question.text}</p>
      <div className="mt-6 space-y-3">
        {question.options.map((option) => {
          const isRight = picked !== null && option === question.answer;
          const isWrongPick = picked === option && option !== question.answer;
          return (
            <button
              key={option}
              type="button"
              disabled={locked || picked !== null}
              onClick={() => {
                setPicked(option);
                onDone(option === question.answer);
              }}
              style={answerStyle(isRight ? "right" : isWrongPick ? "wrong" : "idle")}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-left text-base font-black text-gray-900 transition hover:border-blue-300 hover:bg-blue-50 disabled:opacity-100"
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
