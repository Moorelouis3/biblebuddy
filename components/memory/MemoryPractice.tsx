"use client";

/**
 * One Bible Memory practice session: five questions across five games, then
 * the results.
 *
 * The rules (what is asked, what counts as right, the points) are all in
 * lib/bibleMemoryGames.ts. This file is only the screens.
 *
 * Game look since 2026-11-24 (Louis: "on the same level as the trivia and the
 * Bible matching game"): the verse's own painted scene, three hearts, speed
 * points and a streak like Bible Trivia, each question dealt in on a
 * parchment card, sounds, and the Trivia ending. Two games were added: First
 * letters and The fading verse. A verse earns a medal as it climbs (Bronze,
 * Silver, Gold), shown on the results.
 *
 * Progress is written after every answer, not at the end, so leaving half way
 * through keeps what was done. Running out of hearts ends the run early, but
 * every answer given still counts toward the verse's practice.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { FloatPoints, GameHud, GameResults, GameStage, GameTopBar } from "@/components/games/GameStage";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { logActionToMasterActions } from "@/lib/actionRecorder";
import { saveMemoryProgress } from "@/lib/bibleMemory";
import {
  answerPoints,
  buildSession,
  cleanVerseText,
  firstLetter,
  formatReference,
  HEARTS,
  isFadePickCorrect,
  isFillChoiceCorrect,
  isOrderCorrect,
  LETTERS_SLIPS,
  medalFor,
  sessionStars,
  summariseSession,
  type AnswerResult,
  type FadeQuestion,
  type FillQuestion,
  type LettersQuestion,
  type MemoryQuestion,
  type MemoryVerse,
  type OrderQuestion,
  type OrderTile,
  type ReferenceQuestion,
} from "@/lib/bibleMemoryGames";
import { bookScene } from "@/lib/games/bookScene";
import { matchSound } from "@/lib/match/sound";

type Props = {
  userId: string;
  verses: MemoryVerse[];
  onFinished: () => void;
  onExit: () => void;
  onAgain: () => void;
};

const GAME_TITLES: Record<MemoryQuestion["type"], string> = {
  fill: "Fill in the blank",
  order: "Put the words in order",
  reference: "Where is it found?",
  letters: "First letters",
  fade: "The fading verse",
};

const GAME_HINTS: Record<MemoryQuestion["type"], string> = {
  fill: "Tap the missing word.",
  order: "Tap the words in order. Tap a placed word to take it back.",
  reference: "Pick the reference for this verse.",
  letters: "Say the verse to yourself and tap the first letter of each word.",
  fade: "Tap the missing words back into the verse, in order.",
};

const MEDAL_ICON: Record<string, string> = { Bronze: "🥉", Silver: "🥈", Gold: "🥇" };
const CALLOUTS: Record<number, string> = { 3: "Amen!", 5: "Hallelujah!" };

export default function MemoryPractice({ userId, verses, onFinished, onExit, onAgain }: Props) {
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
  const [hearts, setHearts] = useState(HEARTS);
  const [score, setScore] = useState(0);
  const [bump, setBump] = useState(0);
  const [streak, setStreak] = useState(0);
  const [float, setFloat] = useState<{ id: number; text: string } | null>(null);
  const [callout, setCallout] = useState<{ id: number; text: string } | null>(null);
  const [shake, setShake] = useState(0);
  const askedAt = useRef(0);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  // Running totals per verse, so each write is the true count and not a
  // stale one from when the session opened.
  const tallies = useRef(new Map<string, { correct: number; mistakes: number }>());

  const question = questions[index] ?? null;
  const verseById = useMemo(() => new Map(startVerses.map((verse) => [verse.id, verse])), [startVerses]);
  const firstVerse = verseById.get(questions[0]?.verseId ?? "");
  const [scene] = useState(() => bookScene(firstVerse?.book ?? "Psalms", firstVerse?.chapter ?? 1));

  useEffect(() => {
    askedAt.current = performance.now();
  }, [index]);

  useEffect(() => {
    if (answered === null) return;
    // On a phone the result panel lands below the fold. Bring Next into view.
    const timer = window.setTimeout(() => nextRef.current?.scrollIntoView({ block: "end", behavior: "smooth" }), 120);
    return () => window.clearTimeout(timer);
  }, [answered]);

  useEffect(() => {
    if (!shake) return;
    const el = cardRef.current;
    if (!el) return;
    el.classList.remove("bbg-shake");
    void el.offsetWidth;
    el.classList.add("bbg-shake");
  }, [shake]);

  function recordAnswer(correct: boolean) {
    if (!question || answered !== null) return;
    setAnswered(correct);
    setResults((current) => [...current, { verseId: question.verseId, correct }]);

    if (correct) {
      const seconds = (performance.now() - askedAt.current) / 1000;
      const nextStreak = streak + 1;
      const points = answerPoints(question.type, seconds, nextStreak);
      setStreak(nextStreak);
      setScore((value) => value + points);
      setBump((n) => n + 1);
      setFloat({ id: Date.now(), text: `+${points}` });
      if (CALLOUTS[nextStreak]) setCallout({ id: Date.now(), text: CALLOUTS[nextStreak] });
      matchSound.match(Math.min(nextStreak, 6));
      if (nextStreak >= 3) window.setTimeout(() => matchSound.power(), 120);
    } else {
      setStreak(0);
      setHearts((value) => Math.max(0, value - 1));
      setShake((n) => n + 1);
      matchSound.lose();
    }

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
      await logActionToMasterActions(userId, ACTION_TYPE.bible_memory_session_completed, `Bible Memory - ${right}/${allResults.length}`);
    } catch {
      // Logged by the recorder. Practice progress is already saved above.
    }
    setFinishing(false);
    setDone(true);
    onFinished();
  }

  function next() {
    if (hearts > 0 && index < questions.length - 1) {
      setIndex(index + 1);
      setAnswered(null);
      cardRef.current?.scrollIntoView({ block: "start" });
      return;
    }
    void finish(results);
  }

  const outOfHearts = hearts <= 0;
  const lastQuestion = index >= questions.length - 1;

  if (!question && !done) {
    return (
      <GameStage scene={scene}>
        <GameTopBar title="Bible Memory" onBack={onExit} />
        <div className="bbg-col">
          <div className="bbg-parch text-center">
            <p className="bbg-serif text-lg font-bold">Add a verse first, then come back to practise.</p>
            <button type="button" onClick={onExit} className="bbg-btn bbg-btn-green mt-4">
              Back to my verses
            </button>
          </div>
        </div>
      </GameStage>
    );
  }

  if (done) {
    const right = results.filter((result) => result.correct).length;
    const outcomes = summariseSession(startVerses, results);
    const stars = sessionStars(right, results.length);
    return (
      <GameStage scene={scene}>
        <style>{MEM_CSS}</style>
        <GameTopBar title="Bible Memory" onBack={onExit} />
        <div className="bbg-col">
          <GameResults
            heading={outOfHearts ? "Out of hearts" : stars === 3 ? "Perfect!" : "Practice finished"}
            name="Bible Memory"
            stars={stars}
            score={score}
            lines={<p>{right} of {results.length} right</p>}
          >
            <ul className="flex flex-col gap-2 text-left">
              {outcomes.map((outcome) => {
                const verse = verseById.get(outcome.verseId);
                if (!verse) return null;
                const before = medalFor(verse.level);
                const after = medalFor(outcome.level);
                const up = outcome.level > verse.level;
                return (
                  <li key={outcome.verseId} className={`bbmem-row${up ? " is-up" : ""}`}>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-black">{formatReference(verse)}</span>
                      <span className="block text-[12px] font-bold opacity-80">
                        {outcome.mistakes === 0 ? "All right" : `${outcome.correct} right, ${outcome.mistakes} to review`}
                      </span>
                    </span>
                    <span className="bbmem-medal-change">
                      {up && after ? (
                        <>
                          <span className="bbmem-medal is-new">{MEDAL_ICON[after]}</span>
                          <span className="text-[12px] font-black">{after}!</span>
                        </>
                      ) : after ? (
                        <span className="bbmem-medal">{MEDAL_ICON[after]}</span>
                      ) : before && !after ? (
                        <span className="text-[12px] font-black">Review soon</span>
                      ) : (
                        <span className="text-[12px] font-black">Keep going</span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="text-[13px] font-bold">
              {saveFailed ? "Some of this session did not save. Check your connection before you practise again." : "Your progress was saved."}
            </p>
            <button type="button" onClick={onAgain} className="bbg-btn bbg-btn-green">
              ▶ Practise again
            </button>
            <button type="button" onClick={onExit} className="bbg-btn bbg-btn-cream">
              Back to my verses
            </button>
          </GameResults>
        </div>
      </GameStage>
    );
  }

  if (!question) return null;
  const verse = verseById.get(question.verseId);
  const fullText = verse ? cleanVerseText(verse.verse_text) : "";
  const reference = verse ? formatReference(verse) : "";

  return (
    <GameStage scene={scene}>
      <style>{MEM_CSS}</style>
      <GameTopBar title="Bible Memory" sub={`Question ${index + 1} of ${questions.length}`} onBack={onExit} />
      <div className="bbg-col">
        <div className="relative">
          <GameHud
            items={[
              {
                label: "Hearts",
                value: (
                  <span className="bbmem-hearts" aria-label={`${hearts} of ${HEARTS} hearts`}>
                    {Array.from({ length: HEARTS }, (_, i) => (
                      <span key={i} className={i < hearts ? "" : "is-gone"}>
                        ❤
                      </span>
                    ))}
                  </span>
                ),
              },
              { label: "Streak", value: streak ? `🔥${streak}` : "0" },
              { label: "Score", value: score.toLocaleString(), bump },
            ]}
          />
          {float ? <FloatPoints key={float.id} id={float.id} text={float.text} /> : null}
        </div>

        <div className="bbmem-dots" aria-hidden="true">
          {questions.map((_, i) => {
            const result = results[i];
            return <span key={i} className={result ? (result.correct ? "is-right" : "is-wrong") : i === index ? "is-now" : ""} />;
          })}
        </div>

        <div ref={cardRef} key={index} className="bbg-parch bbmem-card">
          <p className="bbmem-chip">{GAME_TITLES[question.type]}</p>
          <p className="mt-1 text-center text-[13px] font-bold opacity-80">{GAME_HINTS[question.type]}</p>
          <div className="mt-4">
            {question.type === "fill" ? (
              <FillGame question={question} locked={answered !== null} onDone={recordAnswer} />
            ) : question.type === "order" ? (
              <OrderGame question={question} locked={answered !== null} onDone={recordAnswer} />
            ) : question.type === "letters" ? (
              <LettersGame question={question} locked={answered !== null} onDone={recordAnswer} />
            ) : question.type === "fade" ? (
              <FadeGame question={question} locked={answered !== null} onDone={recordAnswer} />
            ) : (
              <ReferenceGame question={question} locked={answered !== null} onDone={recordAnswer} />
            )}
          </div>

          {answered !== null ? (
            <div className={`bbmem-answer ${answered ? "is-right" : "is-wrong"}`}>
              <p className="bbg-serif text-[20px] font-black">{answered ? "✓ Correct!" : outOfHearts ? "Out of hearts. Here it is:" : "Not quite. Here it is:"}</p>
              <p className="bbg-serif mt-2 text-[18px] font-bold leading-7">{fullText}</p>
              <p className="mt-1 text-[13px] font-black opacity-80">
                {reference} · {question.translation}
              </p>
              <button type="button" ref={nextRef} onClick={next} disabled={finishing} className="bbg-btn bbg-btn-green mt-4">
                {finishing ? "Saving..." : outOfHearts || lastQuestion ? "See results" : "Next ›"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {callout ? (
        <span key={callout.id} className="bbg-callout" aria-hidden="true">
          {callout.text}
        </span>
      ) : null}
    </GameStage>
  );
}

const MEM_CSS = `
.bbmem-card { animation: bbmem-deal .45s cubic-bezier(.2,.9,.3,1.15) both; }
.bbmem-chip { display:table; margin: 0 auto; padding: 4px 18px; border-radius:999px; font-family: Georgia, serif; font-weight:900; font-size:13px; letter-spacing:.08em; text-transform:uppercase;
  color:#fff8dc !important; background: linear-gradient(180deg,#3d9a5c,#1f6b3a); box-shadow: 0 2px 0 #0e3a1e; }
.bbmem-hearts { display:inline-flex; gap:2px; color:#d6283b; font-size: clamp(15px, 4.6vw, 20px); }
.bbmem-hearts .is-gone { color: rgba(120,84,40,.3); animation: bbmem-break .5s ease-out; }
.bbmem-dots { display:flex; justify-content:center; gap:8px; }
.bbmem-dots span { width:12px; height:12px; border-radius:999px; background: rgba(255,243,220,.45); border:2px solid rgba(59,36,18,.5); }
.bbmem-dots span.is-now { background:#f6c445; transform: scale(1.25); }
.bbmem-dots span.is-right { background:#34a35a; }
.bbmem-dots span.is-wrong { background:#d6283b; }
.bbmem-verse { font-family: Georgia, serif; font-weight:700; font-size:19px; line-height:1.75; color:#2a1a0c; }
.bbmem-gap { display:inline-block; min-width:3.6rem; margin: 0 2px; padding: 0 6px; border-bottom: 3px solid rgba(138,90,18,.6); border-radius:4px; text-align:center; background: rgba(138,90,18,.08); }
.bbmem-gap.is-now { background: rgba(246,196,69,.35); border-bottom-color:#8a5a12; animation: bbg-pulse 1.1s ease-in-out infinite; }
.bbmem-word-in { display:inline-block; padding: 0 4px; border-radius:6px; background: rgba(52,163,90,.18); animation: bbg-pop-in .3s cubic-bezier(.2,.9,.3,1.5); }
.bbmem-word-miss { display:inline-block; padding: 0 4px; border-radius:6px; background: rgba(214,40,59,.16); }
.bbmem-choice { display:flex; align-items:center; justify-content:center; min-height:56px; padding: 6px 12px; border-radius:14px; cursor:pointer;
  font-family: Georgia, serif; font-weight:900; font-size:17px; color:#3b2412; background: linear-gradient(180deg,#fff9e8,#f1dfb2); border:2px solid #b8893c; box-shadow: 0 3px 0 #7a5320;
  animation: bbmem-slide .4s cubic-bezier(.2,.9,.3,1.2) both; transition: transform .08s; }
.bbmem-choice:active { transform: translateY(2px); box-shadow: 0 1px 0 #7a5320; }
.bbmem-choice.is-right { color:#fff8dc; background: linear-gradient(180deg,#3d9a5c,#1f6b3a); border-color:#14502a; box-shadow: 0 3px 0 #0e3a1e; }
.bbmem-choice.is-wrong { color:#fff8dc; background: linear-gradient(180deg,#e0505f,#b41d2e); border-color:#7c111e; box-shadow: 0 3px 0 #5a0b15; animation: bbg-shake .35s; }
.bbmem-choice:disabled { cursor:default; }
.bbmem-tile { padding: 8px 12px; border-radius:12px; cursor:pointer; font-family: Georgia, serif; font-weight:900; font-size:16px; color:#3b2412;
  background: linear-gradient(180deg,#fff9e8,#f1dfb2); border:2px solid #b8893c; box-shadow: 0 3px 0 #7a5320; animation: bbg-pop-in .3s both; }
.bbmem-tile:active { transform: translateY(2px); }
.bbmem-tile.is-wrong { animation: bbg-shake .35s; background: linear-gradient(180deg,#ffd6d9,#f3a3aa); }
.bbmem-tray { display:flex; flex-wrap:wrap; align-items:center; gap:8px; min-height:3.6rem; padding:8px; border-radius:14px; border: 2px dashed #b8893c; background: rgba(255,249,232,.55); }
.bbmem-tray.is-right { border-style:solid; border-color:#1f6b3a; background: rgba(52,163,90,.15); }
.bbmem-tray.is-wrong { border-style:solid; border-color:#b41d2e; background: rgba(214,40,59,.12); }
.bbmem-keys { display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap:8px; }
.bbmem-key { min-height:54px; border-radius:14px; cursor:pointer; font-family: Georgia, serif; font-weight:900; font-size:24px; color:#3b2412;
  background: linear-gradient(180deg,#fff9e8,#f1dfb2); border:2px solid #b8893c; box-shadow: 0 3px 0 #7a5320; }
.bbmem-key:active { transform: translateY(2px); box-shadow: 0 1px 0 #7a5320; }
.bbmem-key.is-wrong { animation: bbg-shake .35s; background: linear-gradient(180deg,#ffd6d9,#f3a3aa); }
.bbmem-small { padding: 6px 14px; border-radius:999px; font-weight:900; font-size:13px; color:#3b2412; border:2px solid #b8893c; background: rgba(255,249,232,.8); }
.bbmem-small:disabled { opacity:.4; }
.bbmem-answer { margin-top:18px; padding:14px; border-radius:16px; text-align:center; animation: bbg-rise .35s both; }
.bbmem-answer.is-right { background: rgba(52,163,90,.16); border:2px solid #1f6b3a; }
.bbmem-answer.is-wrong { background: rgba(214,40,59,.1); border:2px solid #b41d2e; }
.bbmem-answer.is-right p:first-child { color:#1f6b3a !important; }
.bbmem-answer.is-wrong p:first-child { color:#b41d2e !important; }
.bbmem-row { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 12px; border-radius:12px; background: rgba(138,90,18,.1); }
.bbmem-row.is-up { background: rgba(246,196,69,.3); border:2px solid #d9a521; }
.bbmem-medal-change { display:flex; align-items:center; gap:4px; flex:none; }
.bbmem-medal { font-size:26px; line-height:1; }
.bbmem-medal.is-new { animation: bbg-star .6s 1s cubic-bezier(.2,.9,.3,1.4) both; }
@keyframes bbmem-deal { from { opacity:0; transform: perspective(800px) rotateY(-35deg) translateX(40px) scale(.94); } to { opacity:1; transform:none; } }
@keyframes bbmem-slide { from { opacity:0; transform: translateY(16px) scale(.96); } }
@keyframes bbmem-break { 0% { transform: scale(1.6); color:#d6283b; } 100% { transform: scale(1); } }
`;

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
    if (isFillChoiceCorrect(current, choice)) matchSound.swap();
    if (nextPicks.length === question.blanks.length) {
      onDone(nextPicks.every((pick, order) => isFillChoiceCorrect(question.blanks[order], pick)));
    }
  }

  return (
    <div>
      <p className="text-center text-[13px] font-black opacity-80">
        {question.reference} · {question.translation}
      </p>
      <p className="bbmem-verse mt-2">
        {question.tokens.map((token, tokenIndex) => {
          const order = blankAt.get(tokenIndex);
          if (order === undefined) return <span key={tokenIndex}>{token} </span>;
          const blank = question.blanks[order];
          const pick = picks[order];
          if (pick === undefined) {
            return (
              <span key={tokenIndex}>
                <span className={`bbmem-gap${order === picks.length ? " is-now" : ""}`}>&nbsp;</span>{" "}
              </span>
            );
          }
          const right = isFillChoiceCorrect(blank, pick);
          return (
            <span key={tokenIndex}>
              <span className={right ? "bbmem-word-in" : "bbmem-word-miss"}>{token}</span>{" "}
            </span>
          );
        })}
      </p>

      {current && !locked ? (
        <div key={picks.length} className="mt-5 grid grid-cols-2 gap-3">
          {current.choices.map((choice, i) => (
            <button key={choice} type="button" onClick={() => choose(choice)} className="bbmem-choice" style={{ animationDelay: `${i * 70}ms` }}>
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
    matchSound.link(nextPlaced.length - 1);
    if (nextPlaced.length === question.words.length) {
      onDone(isOrderCorrect(nextPlaced.map((item) => item.word), question.words));
    }
  }

  function takeBack(tile: OrderTile) {
    if (locked) return;
    setPlaced(placed.filter((item) => item.id !== tile.id));
    matchSound.swap();
  }

  return (
    <div>
      <p className="text-center text-[13px] font-black opacity-80">
        {question.reference} · {question.translation}
      </p>

      <div className="bbmem-verse mt-2" style={{ fontSize: 17 }}>
        {question.before ? <span className="opacity-70">{question.before} </span> : null}
        <span className={`bbmem-tray my-1${locked ? (correct ? " is-right" : " is-wrong") : ""}`}>
          {placed.length === 0 ? <span className="px-2 text-[13px] font-bold opacity-70">Your answer goes here</span> : null}
          {placed.map((tile) => (
            <button key={tile.id} type="button" onClick={() => takeBack(tile)} disabled={locked} aria-label={`Take back ${tile.word}`} className="bbmem-tile">
              {tile.word}
            </button>
          ))}
        </span>
        {question.after ? <span className="opacity-70"> {question.after}</span> : null}
      </div>

      {!locked ? (
        <>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {remaining.map((tile) => (
              <button key={tile.id} type="button" onClick={() => place(tile)} className="bbmem-tile">
                {tile.word}
              </button>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <button type="button" onClick={() => setPlaced(placed.slice(0, -1))} disabled={!placed.length} className="bbmem-small">
              ↩ Undo
            </button>
            <button type="button" onClick={() => setPlaced([])} disabled={!placed.length} className="bbmem-small">
              Clear
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

// ───────────────────────── where is it found ─────────────────────────

function ReferenceGame({ question, locked, onDone }: { question: ReferenceQuestion; locked: boolean; onDone: (correct: boolean) => void }) {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div>
      <p className="bbmem-verse text-center">&ldquo;{question.text}&rdquo;</p>
      <div className="mt-5 flex flex-col gap-3">
        {question.options.map((option, i) => {
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
              className={`bbmem-choice${isRight ? " is-right" : isWrongPick ? " is-wrong" : ""}`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ───────────────────────── first letters ─────────────────────────

function slipsText(slips: number) {
  const left = LETTERS_SLIPS - slips;
  return left > 0 ? `${left} mistake${left === 1 ? "" : "s"} allowed` : "Next mistake ends it";
}

function LettersGame({ question, locked, onDone }: { question: LettersQuestion; locked: boolean; onDone: (correct: boolean) => void }) {
  const [at, setAt] = useState(0);
  const [slips, setSlips] = useState(0);
  const [wrongKey, setWrongKey] = useState<{ key: string; n: number } | null>(null);
  const [failed, setFailed] = useState(false);
  const total = question.tokens.length;
  const showAll = locked || failed;

  function press(key: string) {
    if (locked || failed || at >= total) return;
    if (firstLetter(question.tokens[at]) === key) {
      const next = at + 1;
      setAt(next);
      matchSound.link(Math.min(next, 12));
      if (next === total) onDone(true);
      return;
    }
    const nextSlips = slips + 1;
    setSlips(nextSlips);
    setWrongKey({ key, n: Date.now() });
    matchSound.nope();
    if (nextSlips > LETTERS_SLIPS) {
      setFailed(true);
      onDone(false);
    }
  }

  return (
    <div>
      <p className="text-center text-[13px] font-black opacity-80">
        {question.reference} · {question.translation}
      </p>
      <p className="bbmem-verse mt-2">
        {question.before ? <span className="opacity-60">{question.before} </span> : null}
        {question.tokens.map((token, i) => {
          if (i < at) return <span key={i}><span className="bbmem-word-in">{token}</span> </span>;
          if (showAll) return <span key={i}><span className={failed ? "bbmem-word-miss" : ""}>{token}</span> </span>;
          return (
            <span key={i}>
              <span className={`bbmem-gap${i === at ? " is-now" : ""}`} style={{ minWidth: `${Math.min(6, Math.max(1.6, token.length * 0.55))}rem` }}>
                &nbsp;
              </span>{" "}
            </span>
          );
        })}
        {question.after ? <span className="opacity-60">{question.after}</span> : null}
      </p>
      {!showAll ? (
        <>
          <p className="mt-3 text-center text-[12px] font-black opacity-75">
            {at} of {total} words · {slipsText(slips)}
          </p>
          <div className="bbmem-keys mt-3">
            {question.keys.map((key) => (
              <button
                key={wrongKey?.key === key ? `${key}-${wrongKey.n}` : key}
                type="button"
                onClick={() => press(key)}
                className={`bbmem-key${wrongKey?.key === key ? " is-wrong" : ""}`}
              >
                {key}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

// ───────────────────────── the fading verse ─────────────────────────

function FadeGame({ question, locked, onDone }: { question: FadeQuestion; locked: boolean; onDone: (correct: boolean) => void }) {
  const [filled, setFilled] = useState<OrderTile[]>([]);
  const [slips, setSlips] = useState(0);
  const [wrong, setWrong] = useState<{ id: number; n: number } | null>(null);
  const [failed, setFailed] = useState(false);
  const usedIds = new Set(filled.map((tile) => tile.id));
  const gapOf = useMemo(() => new Map(question.hidden.map((index, gap) => [index, gap])), [question]);
  const showAll = locked || failed;

  function pick(tile: OrderTile) {
    if (locked || failed) return;
    const gap = filled.length;
    if (isFadePickCorrect(question, gap, tile.word)) {
      const next = [...filled, tile];
      setFilled(next);
      matchSound.link(Math.min(next.length, 12));
      if (next.length === question.hidden.length) onDone(true);
      return;
    }
    const nextSlips = slips + 1;
    setSlips(nextSlips);
    setWrong({ id: tile.id, n: Date.now() });
    matchSound.nope();
    if (nextSlips > LETTERS_SLIPS) {
      setFailed(true);
      onDone(false);
    }
  }

  return (
    <div>
      <p className="text-center text-[13px] font-black opacity-80">
        {question.reference} · {question.translation}
      </p>
      <p className="bbmem-verse mt-2">
        {question.before ? <span className="opacity-60">{question.before} </span> : null}
        {question.tokens.map((token, i) => {
          const gap = gapOf.get(i);
          if (gap === undefined) return <span key={i}>{token} </span>;
          if (gap < filled.length) return <span key={i}><span className="bbmem-word-in">{token}</span> </span>;
          if (showAll) return <span key={i}><span className={failed ? "bbmem-word-miss" : "bbmem-word-in"}>{token}</span> </span>;
          return (
            <span key={i}>
              <span className={`bbmem-gap${gap === filled.length ? " is-now" : ""}`}>&nbsp;</span>{" "}
            </span>
          );
        })}
        {question.after ? <span className="opacity-60">{question.after}</span> : null}
      </p>
      {!showAll ? (
        <>
          <p className="mt-3 text-center text-[12px] font-black opacity-75">
            {slipsText(slips)}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {question.bank
              .filter((tile) => !usedIds.has(tile.id))
              .map((tile) => (
                <button
                  key={wrong?.id === tile.id ? `${tile.id}-${wrong.n}` : tile.id}
                  type="button"
                  onClick={() => pick(tile)}
                  className={`bbmem-tile${wrong?.id === tile.id ? " is-wrong" : ""}`}
                >
                  {tile.word}
                </button>
              ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
