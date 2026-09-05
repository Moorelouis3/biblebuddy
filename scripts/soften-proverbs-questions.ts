/**
 * Replace the Wisdom of Proverbs reflection questions with simpler,
 * verse-anchored ones (2026-09-05). Louis found the book's questions too
 * heavy for the devotional; these follow his requested shape:
 * quote the day's key verse, then ask what it means to you.
 *
 *   npx tsx scripts/soften-proverbs-questions.ts [--dry]
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const DEVOTIONAL_ID = "c0ca300a-c0e9-47b8-84c5-99aca743a203";
const DRY = process.argv.includes("--dry");

const QUESTIONS: Record<number, string> = {
  1: 'Proverbs 1:7 says "The fear of Yahweh is the beginning of knowledge." What does the fear of God mean to you?',
  2: "Proverbs 2 says to search for wisdom like hidden treasure. What is one area of your life where you could use God's wisdom right now?",
  3: 'Proverbs 3:5 says "Trust in Yahweh with all your heart." What does trusting God with all your heart mean to you?',
  4: 'Proverbs 4:23 says "Keep your heart with all diligence." What does guarding your heart mean to you?',
  5: "Proverbs 5 says to stay far from temptation instead of testing it. Why do you think God gives us boundaries like that?",
  6: "Of the seven things God hates in Proverbs 6, which one stood out to you the most? Why that one?",
  7: 'Proverbs 6:27 asks, "Can a man take fire to his bosom, and his clothes not be burned?" What does that picture mean to you?',
  8: "Proverbs 8 says wisdom was with God before the world was made. What does it mean to you that God's wisdom is older than everything?",
  9: "Proverbs 9 shows two invitations - Wisdom's and Folly's. Which one do you hear the loudest in your life right now?",
  10: "Proverbs 10:5 praises the one who gathers in summer before winter comes. What is one thing you could start preparing for now?",
  11: "Proverbs 11:1 says honest scales delight God. Why do you think honesty matters so much to Him?",
  12: 'Proverbs 12:15 says "The way of a fool is right in his own eyes, but he who is wise listens to counsel." What does that verse mean to you?',
  13: 'Proverbs 13:3 says "He who guards his mouth guards his soul." What does that verse mean to you?',
  14: 'Proverbs 14:12 says "There is a way which seems right to a man, but in the end it leads to death." What does that verse mean to you?',
  15: 'Proverbs 15:1 says "A gentle answer turns away wrath." What does giving a gentle answer mean to you?',
  16: 'Proverbs 16:18 says "Pride goes before destruction." What does staying humble mean to you?',
  17: 'Proverbs 17:17 says "A friend loves at all times." What does being that kind of friend mean to you?',
  18: 'Proverbs 18:10 says the name of Yahweh is a strong tower. What does running to God for safety mean to you?',
  19: "Proverbs 19:3 describes a man who ruins his own way, then rages against God. What does that verse mean to you?",
  20: 'Proverbs 20:22 says "Don\'t say, \'I will pay back evil.\' Wait for Yahweh." What does waiting on God mean to you?',
  21: 'Proverbs 21:31 says "The horse is prepared for the day of battle; but victory is with Yahweh." What does that verse mean to you?',
  22: 'Proverbs 22:1 says "A good name is more desirable than great riches." What does that verse mean to you?',
  23: "Proverbs 23 warns about wanting too much - of money, food, or drink. What does having 'enough' mean to you?",
  24: 'Proverbs 24:16 says "A righteous man falls seven times and rises up again." What does getting back up mean to you?',
  25: "Proverbs 25:28 compares a person without self-control to a city with broken-down walls. What does self-control mean to you?",
  26: "Proverbs 26:20 says without gossip, a quarrel dies down. Why do you think gossip is so easy to pass along?",
  27: 'Proverbs 27:17 says "Iron sharpens iron; so a man sharpens his friend\'s countenance." What does that verse mean to you?',
  28: "Proverbs 28:13 says whoever confesses and renounces his sins finds mercy. What does God's mercy mean to you?",
  29: 'Proverbs 29:25 says "The fear of man proves to be a snare, but whoever puts his trust in Yahweh is kept safe." What does that verse mean to you?',
  30: 'In Proverbs 30, Agur prays, "Give me neither poverty nor riches." What do you think of that prayer?',
  31: "Proverbs 31:30 says a person who fears Yahweh will be praised. Which part of this chapter's picture of wisdom do you want your life to look like?",
};

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  for (let day = 1; day <= 31; day++) {
    const question = QUESTIONS[day];
    if (!question || !question.includes("?")) throw new Error(`Day ${day}: bad question`);
    if (DRY) {
      console.log(`[dry] Day ${day}: ${question}`);
      continue;
    }
    const { error, count } = await supabase
      .from("devotional_days")
      .update({ reflection_question: question }, { count: "exact" })
      .eq("devotional_id", DEVOTIONAL_ID)
      .eq("day_number", day);
    if (error) throw new Error(`Day ${day}: ${error.message}`);
    if (count !== 1) throw new Error(`Day ${day}: updated ${count} rows`);
    console.log(`updated Day ${day}`);
  }
  console.log(DRY ? "Dry run complete." : "All 31 questions softened.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
