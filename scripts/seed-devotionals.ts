// Script to seed the first devotional: "The Tempting of Jesus"
// Run with: npx tsx scripts/seed-devotionals.ts

// Load environment variables from .env or .env.local file
// dotenv/config loads .env by default, but we also check .env.local
import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env') });
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import { createClient } from "@supabase/supabase-js";

// Use server-only env vars (not NEXT_PUBLIC_ prefix)
// Fallback to NEXT_PUBLIC_SUPABASE_URL for compatibility
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Missing environment variables!");
  console.error("");
  console.error("Required variables:");
  console.error("  SUPABASE_URL=https://your-project-id.supabase.co");
  console.error("  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key");
  console.error("");
  console.error("Create a .env file in the project root (or add to .env.local)");
  console.error("Get these values from: Supabase Dashboard → Project Settings → API");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function seedDevotionals() {
  console.log("Seeding devotionals...");

  // Check if devotional already exists
  const { data: existing } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Tempting of Jesus")
    .maybeSingle();

  if (existing) {
    console.log("Devotional already exists, skipping seed.");
    return;
  }

  // Insert main devotional
  const { data: devotional, error: devotionalError } = await supabase
    .from("devotionals")
    .insert({
      title: "The Tempting of Jesus",
      subtitle: "21 Day Devotional",
      description: `This devotional takes you through the story of Jesus' temptation in the wilderness. Over 21 days, you'll explore how Jesus faced three specific temptations and learn how to apply His responses to your own life. Each day includes a short reflection, Bible reading, and an optional question to help you grow in your faith.

This journey will help you understand the power of Scripture in times of testing, the importance of relying on God's provision, and the value of worshiping God alone.`,
      total_days: 21,
    })
    .select()
    .single();

  if (devotionalError || !devotional) {
    console.error("Error creating devotional:", devotionalError);
    return;
  }

  console.log("Created devotional:", devotional.id);

  // Insert days (sample days 1-5, can be expanded)
  const days = [
    {
      day_number: 1,
      day_title: "The Beginning of Temptation",
      devotional_text: `After Jesus was baptized, the Holy Spirit led Him into the wilderness. This was not a mistake or an accident—it was part of God's plan. Jesus spent 40 days fasting and praying, preparing for His public ministry.

But at the end of those 40 days, when Jesus was physically weak and hungry, the tempter came. This teaches us that temptation often comes when we are at our weakest. But Jesus shows us that being led by the Spirit means we are never alone, even in the hardest moments.`,
      bible_reading_book: "Matthew",
      bible_reading_chapter: 4,
      reflection_question: "When have you felt weak and vulnerable? How did you handle it?",
    },
    {
      day_number: 2,
      day_title: "The First Temptation: Turn Stones to Bread",
      devotional_text: `The tempter said to Jesus, "If you are the Son of God, tell these stones to become bread." Jesus had been fasting for 40 days. He was hungry. The temptation was real and practical: use your power to meet your own needs.

But Jesus refused. He said, "It is written: 'Man shall not live on bread alone, but on every word that comes from the mouth of God.'" Jesus knew that God's Word is more important than physical comfort. Our relationship with God should matter more than our immediate desires.`,
      bible_reading_book: "Matthew",
      bible_reading_chapter: 4,
      reflection_question: "What immediate desires sometimes distract you from God?",
    },
    {
      day_number: 3,
      day_title: "The Second Temptation: Throw Yourself Down",
      devotional_text: `The tempter then took Jesus to the highest point of the temple and said, "If you are the Son of God, throw yourself down. For it is written: 'He will command his angels concerning you.'"

This was a test of trust. The tempter was asking Jesus to force God's hand, to make God prove Himself. But Jesus responded with Scripture: "It is also written: 'Do not put the Lord your God to the test.'" We should never test God or demand that He prove Himself to us.`,
      bible_reading_book: "Matthew",
      bible_reading_chapter: 4,
      reflection_question: "Have you ever tried to make God prove Himself? What happened?",
    },
    {
      day_number: 4,
      day_title: "The Third Temptation: Worship Me",
      devotional_text: `Finally, the tempter showed Jesus all the kingdoms of the world and said, "All this I will give you if you will bow down and worship me." This was the ultimate temptation: to gain the whole world by compromising on what matters most.

Jesus responded immediately and firmly: "Away from me, Satan! For it is written: 'Worship the Lord your God and serve him only.'" Jesus chose to worship God alone, even if it meant suffering and the cross. Nothing is worth compromising our devotion to God.`,
      bible_reading_book: "Matthew",
      bible_reading_chapter: 4,
      reflection_question: "What might you be tempted to put before God?",
    },
    {
      day_number: 5,
      day_title: "The Victory and the Angels",
      devotional_text: `After Jesus resisted all three temptations, the tempter left Him. Immediately, angels came and attended to Jesus. This is a beautiful picture: when we resist temptation and stay faithful to God, God will strengthen us.

Jesus' victory over temptation shows us that it is possible to resist. Through Scripture, through prayer, and through the power of the Holy Spirit, we can overcome the temptations we face. Jesus has been where we are, and He understands.`,
      bible_reading_book: "Matthew",
      bible_reading_chapter: 4,
      reflection_question: "How can you use Scripture to resist temptation in your life?",
    },
    // Add more days here as needed (days 6-21)
  ];

  // For now, we'll insert sample days. In production, you would add all 21 days
  for (const day of days) {
    const { error: dayError } = await supabase.from("devotional_days").insert({
      devotional_id: devotional.id,
      ...day,
    });

    if (dayError) {
      console.error(`Error inserting day ${day.day_number}:`, dayError);
    } else {
      console.log(`Inserted day ${day.day_number}`);
    }
  }

  console.log("Devotional seeding complete!");
  console.log("Note: Only 5 sample days were inserted. Complete all 21 days for full devotional.");
}

seedDevotionals().catch(console.error);

