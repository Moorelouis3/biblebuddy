#!/usr/bin/env node
/**
 * The Obedience of Abraham: back to 21 days (Louis, 2026-10-02).
 *
 * The study was written as a 21-day devotional, then restructured in
 * "Add Abraham chapter study" into 15 one-chapter-a-day entries ending at
 * Genesis 25. The last six days - where Hebrews, Romans, James, Galatians and
 * John look back at Abraham - were dropped with it, and the community study
 * starting 1 November runs 21 days.
 *
 * Days 1-15 are untouched: they are the newer chapter-journey text and they
 * are correct. This adds days 16-21 and sets total_days back to 21.
 *
 * Day 20 (John 8) is new - the original had Genesis 22 split over two days
 * instead, which would have renumbered every day after it. The rest is the
 * original text, recovered from commit 3ba83217b.
 *
 * Every chapter used here already has study notes, so the six-task daily flow
 * works on all of them: hebrews 11, romans 4, james 2, galatians 3, john 8,
 * genesis 12.
 *
 *   node scripts/extend-abraham-to-21-days.mjs --check   # show, write nothing
 *   node scripts/extend-abraham-to-21-days.mjs
 *
 * Safe to re-run: every write is an upsert on (devotional_id, day_number).
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const DEVOTIONAL_ID = "2c7641c1-0280-4847-b36e-e89004a58534";
const TOTAL_DAYS = 21;

const NEW_DAYS = [
  {
    day_number: 16,
    day_title: "By Faith He Went",
    reference: "Hebrews 11",
    reflection_question: "What would change if you really lived like your deepest home is still ahead with God?",
    devotional_text: `Hebrews 11 steps back and shows how heaven reads Abraham's life.

By faith he went when called. By faith he lived in tents. By faith Sarah conceived. By faith he offered Isaac. The chapter gathers the whole story and tells you what defined it.

Trust defined it.

Abraham lived like a stranger because he was looking for a city whose builder and maker is God. That means his obedience was always tied to something bigger than land, family growth, or earthly security. His life was being pulled by a future only God could fully see.

This chapter helps explain why Abraham still matters so much. His life was not random religious effort. It was faith moving on God's word again and again.

Hebrews 11 pulls the camera back and shows the invisible backbone of the story. Abraham walked, lived in tents, waited, and offered because he trusted.

The chapter gives language to what was happening underneath all the Genesis scenes: faith was carrying the whole journey.`,
  },
  {
    day_number: 17,
    day_title: "Believing the God Who Gives Life",
    reference: "Romans 4",
    reflection_question: "Where are you still tempted to earn what God only gives through faith?",
    devotional_text: `Romans 4 brings Abraham's story right into the center of the gospel.

Paul points to Abraham as the picture of righteousness through faith. He believed in the God who gives life to the dead and calls into being things that were not.

That sentence sounds like Abraham's whole life. Barren places. Delayed promises. Impossible timing. And still God speaking life.

This chapter matters because it keeps the focus clear. Abraham's obedience mattered, but underneath it all was trust. He did not stand righteous before God by achievement. He stood by believing God's word.

Romans 4 makes Abraham feel close to every believer now. His story becomes a living picture of trusting the God who creates life where none seems possible.

That is why the chapter feels so strong. Abraham's impossible story becomes a doorway for our own faith.`,
  },
  {
    day_number: 18,
    day_title: "Faith That Moves",
    reference: "James 2",
    reflection_question: "Would someone looking at your life see faith that actually moves, or mostly words that sound spiritual?",
    devotional_text: `James 2 shows the other side of Abraham's story. His faith was not invisible. It moved. It obeyed. It acted.

The chapter points back to Isaac on the altar and says Abraham's faith was shown through obedience. Then comes one of the most beautiful lines about him: he was called God's friend.

That title says so much. Abraham was not simply performing religious duty. He was walking with God in a real relationship that carried trust, reverence, honesty, and movement.

This chapter gives needed balance. Real faith is not empty language. It gets up. It leaves. It trusts. It surrenders. Abraham's life shows that clearly.

James 2 tightens the picture. Abraham did not merely say he believed. He moved like he believed.

And then the title lands: friend of God. That makes his obedience feel warm, relational, and alive rather than mechanical.`,
  },
  {
    day_number: 19,
    day_title: "Blessing Beyond His Lifetime",
    reference: "Galatians 3",
    reflection_question: "What if your obedience to God is reaching farther than you can currently measure?",
    devotional_text: `Galatians 3 widens Abraham's story all the way out.

The promise to Abraham was never meant to stop with Abraham. Through him blessing would move outward to the nations, and the larger redemptive story would keep unfolding.

That means Abraham's personal obedience had a reach far beyond what he could measure when he first stepped away from home. His yes mattered more than he knew.

That should encourage anyone who feels like quiet faithfulness is too small to matter. God can attach a much larger future to one sincere act of obedience than we can see at the time.

Galatians 3 opens Abraham's story outward until you can see nations inside it. His life was never only about his own future. God attached global blessing to one man's obedience.

That is the kind of scale only God can hide inside a single yes.`,
  },
  {
    day_number: 20,
    day_title: "Before Abraham Was",
    reference: "John 8",
    reflection_question: "Are you resting on being connected to faith, or on actually trusting God the way Abraham did?",
    devotional_text: `John 8 puts Abraham in the middle of an argument about Jesus.

The crowd keeps falling back on descent. Abraham is our father. We have the bloodline, so we must be right with God.

Jesus will not let that stand. He tells them that if they were really Abraham's children they would do what Abraham did, and what Abraham did was believe God and act on his word.

Then he says something that stops the conversation. Your father Abraham rejoiced to see my day, and he saw it, and was glad. Before Abraham was, I am.

That is the deepest claim anyone makes about Abraham's story in the whole Bible. The promise Abraham was living toward was not only land and family. It was Christ.

It is worth sitting with how offensive that sentence was in the temple courts. Abraham had been dead for roughly two thousand years, and Jesus speaks of him as someone who saw and was glad - and then uses the name God gave Moses at the bush. The argument stops being about ancestry and becomes about who Jesus is.`,
  },
  {
    day_number: 21,
    day_title: "A Life Marked by Obedience",
    reference: "Genesis 12",
    reflection_question: "What would it look like for your life to be marked by long obedience instead of only short emotional moments?",
    devotional_text: `When you look back across Abraham's life, one thing stands out: he kept walking.

He left home. He built altars. He stumbled in fear. He waited through silence. He believed under the stars. He laughed at impossible promises. He held Isaac. He climbed the mountain. He buried Sarah. He died still trusting.

That is why the title fits so well. The obedience of Abraham was not one dramatic moment. It was a life shaped by saying yes to God again and again through change, delay, grief, blessing, covenant, and surrender.

Abraham was not perfect, but he was faithful in the deeper direction of his life. He kept returning to trust. He kept moving when God spoke. That is the invitation his story leaves with us now.

Coming back to Genesis 12 at the end makes the whole devotional feel complete. The man who first walked away from home on a word became the man whose obedience still teaches the world.

That is the final image Abraham leaves behind: not flawless strength, but faithful movement with God.`,
  },
];

/** "Hebrews 11" -> { book: "Hebrews", chapter: 11 } */
function parseReference(reference) {
  const match = String(reference).match(/^(.+)\s+(\d+)$/);
  if (!match) throw new Error(`Cannot parse reading reference: ${reference}`);
  return { book: match[1].trim(), chapter: Number(match[2]) };
}

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing from .env.local");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function main() {
  const check = process.argv.includes("--check");
  const supabase = admin();

  const { data: existing, error: readError } = await supabase
    .from("devotional_days")
    .select("day_number, day_title, bible_reading_book, bible_reading_chapter")
    .eq("devotional_id", DEVOTIONAL_ID)
    .order("day_number");
  if (readError) throw new Error(`read devotional_days: ${readError.message}`);

  console.log(`Currently ${existing.length} days:`);
  for (const day of existing) {
    console.log(`  ${String(day.day_number).padStart(2)} ${day.bible_reading_book} ${day.bible_reading_chapter} - ${day.day_title}`);
  }

  console.log("\nAdding:");
  for (const day of NEW_DAYS) {
    const { book, chapter } = parseReference(day.reference);
    console.log(`  ${day.day_number} ${book} ${chapter} - ${day.day_title}`);
  }

  if (check) {
    console.log("\n--check: nothing written.");
    return;
  }

  for (const day of NEW_DAYS) {
    const { book, chapter } = parseReference(day.reference);
    const { error } = await supabase.from("devotional_days").upsert(
      {
        devotional_id: DEVOTIONAL_ID,
        day_number: day.day_number,
        day_title: day.day_title,
        devotional_text: day.devotional_text,
        reflection_question: day.reflection_question,
        bible_reading_book: book,
        bible_reading_chapter: chapter,
      },
      { onConflict: "devotional_id,day_number" },
    );
    if (error) throw new Error(`day ${day.day_number}: ${error.message}`);
    console.log(`saved day ${day.day_number}`);
  }

  const { error: totalError } = await supabase
    .from("devotionals")
    .update({ total_days: TOTAL_DAYS })
    .eq("id", DEVOTIONAL_ID);
  if (totalError) throw new Error(`total_days: ${totalError.message}`);

  const { count } = await supabase
    .from("devotional_days")
    .select("id", { count: "exact", head: true })
    .eq("devotional_id", DEVOTIONAL_ID);
  console.log(`\nDone. total_days = ${TOTAL_DAYS}, day rows = ${count}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
