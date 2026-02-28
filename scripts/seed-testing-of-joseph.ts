// Script to seed "The Testing of Joseph" devotional with Day 1 placeholder
// Run with: npx tsx scripts/seed-testing-of-joseph.ts
import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env') });
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Missing environment variables!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface DevotionalDay {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_reference: string;
  reflection_question: string | null;
}

const devotionalDays: DevotionalDay[] = [
  {
    day_number: 1,
    day_title: "Joseph's Test Begins",
    devotional_text: `This is a placeholder for Day 1 of The Testing of Joseph. Content will be added soon.`,
    bible_reading_reference: "Genesis 37:1-11",
    reflection_question: "What can you learn from Joseph's response to adversity?",
  },
];

function parseBibleReading(reference: string): { book: string; chapter: number } {
  const match = reference.match(/^([A-Za-z0-9 ]+)\s+(\d+):/);
  if (match) {
    const book = match[1];
    const chapter = parseInt(match[2], 10);
    return { book: book.trim(), chapter };
  }
  return { book: "Genesis", chapter: 37 };
}

async function seedDevotional() {
  // Insert main devotional
  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .insert({
      title: "The Testing of Joseph",
      subtitle: "A 40 Day Devotional",
      description: "A journey through Joseph's trials and God's faithfulness.",
      total_days: 40,
    })
    .select()
    .single();

  if (devotionalError || !devotional) {
    console.error("Error creating devotional:", devotionalError);
    return;
  }

  const devotionalId = devotional.id;

  // Insert Day 1
  for (const dayData of devotionalDays) {
    const { book, chapter } = parseBibleReading(dayData.bible_reading_reference);
    const { error: dayError } = await supabase.from("devotional_days").insert({
      devotional_id: devotionalId,
      day_number: dayData.day_number,
      day_title: dayData.day_title,
      devotional_text: dayData.devotional_text,
      bible_reading_book: book,
      bible_reading_chapter: chapter,
      reflection_question: dayData.reflection_question,
    });
    if (dayError) {
      console.error(`❌ Error inserting day ${dayData.day_number}:`, dayError.message);
    } else {
      console.log(`✅ Inserted day ${dayData.day_number}: ${dayData.day_title}`);
    }
  }

  console.log("✅ Joseph devotional seeded.");
}

seedDevotional().catch(console.error);
