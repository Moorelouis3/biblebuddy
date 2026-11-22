# Bible Clue question bank: writing brief

Louis, 2026-11-22. Bible Clue is now a multiple-choice game: one short question, four choices, 10 seconds to answer, +1 right, −1 wrong, 0 for no answer. Players pick a book, all chapters or chosen chapters, and Beginner or Medium. Jessica, who tested it, quit after getting several wrong in a row, so these must be fair and readable for everyday Christians.

## What to write

For each Genesis chapter you are given: **24 questions, 12 `beginner` and 12 `medium`** (never fewer than 11 per level; if a very short chapter truly cannot support 12 distinct fair questions at a level, write as many good ones as it supports, at least 11, and say so in your report).

- **Beginner:** the main people, actions and events of that chapter. Plain English, short choices, recognisable details ("God made the light on the first day...").
- **Medium:** details someone would remember from reading the chapter closely: a family relationship, a place, the order of events, who said what. Example (Genesis 29, medium): "I was Leah’s second son. Who am I?" — Reuben / Simeon / Levi / Judah — Simeon — Genesis 29:33 — "Leah named her second son Simeon after saying the LORD had heard that she was unloved."
- Every question must come from THAT chapter (its `ref` is in that chapter).
- Short enough to read with its choices on a phone in 10 seconds: question under ~90 characters, each choice under ~24 characters.
- Exactly four choices, exactly one right. Choice design (Louis): **one right, two close** (same family / same story / easy to mix up), **one way off** (clearly from a different story). The wrong ones must really be wrong per the KJV text.
- Vary the question shapes: "Who am I?" (first person, for a person), "Who...", "Where...", "What did...", "What happened when...", "How many..." only for famous numbers (7 days, 40 days). No genealogy lists, ages, measurements or rare words.
- Do not repeat the same fact twice in a chapter. Do not let one question give away another's answer in an obvious way.
- `explanation`: one plain sentence saying why, drawn from the verse(s).
- `ref`: the exact verse(s): `ref("Genesis 29:33")` or `ref("Genesis 29:32–33")` (en dash).
- **Every fact must be in the KJV text.** Read `public/kjv/genesis/<chapter>.json` (an array of `{number, text}`) for each chapter before writing. Do not invent anything.
- Curly apostrophes (’) and quotes (“ ”).
- `category`: what the RIGHT ANSWER is: `"person"`, `"place"`, or `"keyword"` (a thing, object, event, number or idea).
- `cardId`: if the right answer is one of the deck's cards, set its id so the game can show that card's art. The cards (id=answer(category)) are listed in `docs/clue-question-bank-cards.txt`. Only when the answer really IS that card (e.g. answer "Joseph" → `cardId: "joseph"`; answer "the ark" → `cardId: "noahs-ark"`).
- `id`: `"gen<chapter>-<b|m>-<two digits>"`, e.g. `"gen29-m-03"`, unique.

## File format

One file per writer: `lib/clueGame/bank/genesis-<first>-<last>.ts` (two-digit chapter numbers, e.g. `genesis-01-05.ts`):

```ts
import type { ClueQuestion } from "../types";
import { ref } from "../ref";

/** Genesis 1–5: the Bible Clue question bank (docs/clue-question-bank-brief.md). */
export const GENESIS_01_05: ClueQuestion[] = [
  {
    id: "gen1-b-01",
    book: "genesis",
    chapter: 1,
    level: "beginner",
    category: "keyword",
    question: "What did God make on the first day?",
    choices: ["Light", "The sun", "Dry land", "Fish"],
    answer: 0,
    explanation: "God said, Let there be light, and there was light, on the first day.",
    ref: ref("Genesis 1:3–5"),
  },
  // ...
];
```

Touch no other file. Do not commit, push or switch branches (the folder is on branch `clue-quiz`; other writers are working in the same folder on other chapter files).

## Check before you finish

Run from the repo root (replace the file and export names):

```
npx tsx -e "import {GENESIS_01_05 as Q} from './lib/clueGame/bank/genesis-01-05'; import {existsSync,readFileSync} from 'fs'; const bad=[]; const ids=new Set(); for(const q of Q){ if(ids.has(q.id)) bad.push(q.id+' dup'); ids.add(q.id); if(q.choices.length!==4||new Set(q.choices).size!==4) bad.push(q.id+' choices'); if(q.ref.book!=='Genesis'||q.ref.chapter!==q.chapter) bad.push(q.id+' ref'); const v=JSON.parse(readFileSync('public/kjv/genesis/'+q.ref.chapter+'.json','utf8')); if(v.filter(x=>x.number>=q.ref.verseStart&&x.number<=q.ref.verseEnd).length!==q.ref.verseEnd-q.ref.verseStart+1) bad.push(q.id+' verses'); } const by={}; for(const q of Q){by[q.chapter+q.level]=(by[q.chapter+q.level]||0)+1} console.log(Q.length,'questions',JSON.stringify(by),'bad:',bad)"
```

Report: the counts per chapter and level, the check output (bad must be empty), and 4 example questions (2 beginner, 2 medium).
