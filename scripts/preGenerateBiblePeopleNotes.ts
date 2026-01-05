/**
 * Pre-generate Bible People Notes Script
 * 
 * This script pre-generates notes for all people in the Bible who don't already have notes.
 * It matches the exact logic used in app/people-in-the-bible/page.tsx
 * 
 * Usage:
 *   npx tsx scripts/preGenerateBiblePeopleNotes.ts
 * 
 * Requirements:
 *   - SUPABASE_SERVICE_ROLE_KEY environment variable
 *   - NEXT_PUBLIC_SUPABASE_URL environment variable
 *   - OPENAI_API_KEY environment variable
 */

import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { BIBLE_PEOPLE_LIST } from "../lib/biblePeopleList";

// Static list of Bible people names - matches app/people-in-the-bible/page.tsx
// Now using comprehensive list with aliases
const STATIC_PEOPLE_NAMES = BIBLE_PEOPLE_LIST.map(entry => entry.name);

// Normalize person name - matches app/people-in-the-bible/page.tsx
function normalizePersonName(name: string): string {
  return name.toLowerCase().trim();
}

// Determine gender for pronoun usage - matches app/people-in-the-bible/page.tsx
function getPronouns(name: string): { pronoun: string; whoPronoun: string } {
  const isFemale = /^(Mary|Martha|Sarah|Ruth|Esther|Deborah|Hannah|Leah|Rachel|Rebekah|Eve|Delilah|Bathsheba|Jezebel|Lydia|Phoebe|Priscilla|Anna|Elizabeth|Joanna|Susanna|Judith|Vashti|Bernice|Drusilla|Euodia|Syntyche|Chloe|Nympha|Tryphaena|Tryphosa|Julia|Claudia|Persis)/i.test(name);
  return {
    pronoun: isFemale ? "Her" : "Him",
    whoPronoun: isFemale ? "She" : "He",
  };
}

// Format reply - matches app/api/chat/route.ts
function formatReply(text: string): string {
  if (!text) return text;

  // Normalize newlines
  let t = text.replace(/\r\n/g, "\n").trim();

  // If the model already used blank lines, keep them
  if (t.includes("\n\n")) {
    return t;
  }

  // Insert a blank line after sentence endings
  t = t.replace(/([.!?])\s+/g, "$1\n\n");

  return t.trim();
}

// Generate notes prompt - matches app/people-in-the-bible/page.tsx
function buildPrompt(personName: string): string {
  const { pronoun, whoPronoun } = getPronouns(personName);
  
  return `You are Little Louis. Generate Bible study style notes for ${personName} from Scripture using the EXACT markdown structure below.

CRITICAL RENDERING RULES (MANDATORY):
- Use ONLY markdown
- Use SINGLE # for all section headers
- INSERT TWO FULL LINE BREAKS AFTER EVERY SECTION
- INSERT TWO FULL LINE BREAKS AFTER EVERY PARAGRAPH GROUP
- DO NOT use markdown bullet characters (*, -, •)
- Use EMOJIS as bullets instead
- Emojis must start each bullet line
- No hyphens anywhere
- No compact spacing
- Spacing matters more than word count

The person's name is already shown in the UI. DO NOT include their name as a header.

---

TEMPLATE (FOLLOW EXACTLY):

# 👤 Who ${whoPronoun} Is

Write two short paragraphs explaining who this person is.





# 📖 Their Role in the Story

Write two to three short paragraphs explaining what role this person plays in the biblical narrative.





# 🔥 Key Moments

🔥 Short sentence describing a key moment.

🔥 Short sentence describing a key moment.

🔥 Short sentence describing a key moment.

🔥 Short sentence describing a key moment.





# 📍 Where You Find ${pronoun}

📖 Book Chapter range

📖 Book Chapter range

📖 Book Chapter range





# 🌱 Why This Person Matters

Write two to three short paragraphs explaining why this person is important and what we learn from them.





FINAL RULES:
- Every section must be separated by TWO blank lines
- Every paragraph block must be separated by TWO blank lines
- Do not compress content
- No lists without emojis
- Keep it cinematic, Bible study focused, and clear`;
}

// System content - matches app/api/chat/route.ts (abbreviated for script)
const SYSTEM_CONTENT = `You are Little Louis, the friendly Bible study companion inside the Bible Buddy app.

You are the AI version of Louis Moore.
You are kind, calm, patient, encouraging, honest, simple and clear.
You are not a pastor, not a scholar, not a judge.
You are a friend sitting next to the user, helping them read and understand Scripture.

You must NEVER say you are an AI, a bot, or a model.
You are always "Little Louis".

FORMATTING RULES

• Every paragraph MUST be separated by a blank line.
• Always put TWO newline characters between paragraphs.
• Never send one giant block of text.
• Each paragraph should be one or two short sentences.
• Break long ideas into small chunks so it is easy to read on a phone.
• Use simple everyday words.
• Do not use bullet lists unless the user clearly asks for a list.`;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  // Validate environment variables
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!serviceKey) {
    console.error("❌ ERROR: SUPABASE_SERVICE_ROLE_KEY environment variable is not set");
    process.exit(1);
  }

  if (!supabaseUrl) {
    console.error("❌ ERROR: NEXT_PUBLIC_SUPABASE_URL environment variable is not set");
    process.exit(1);
  }

  if (!openaiKey) {
    console.error("❌ ERROR: OPENAI_API_KEY environment variable is not set");
    process.exit(1);
  }

  // Initialize clients
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const openai = new OpenAI({
    apiKey: openaiKey,
  });

  console.log("🚀 Starting Bible People Notes Pre-Generation");
  console.log(`📋 Total people to process: ${STATIC_PEOPLE_NAMES.length}`);
  console.log("");

  // Fetch existing notes to determine which people already have notes
  const { data: existingNotes, error: fetchError } = await supabase
    .from("bible_people_notes")
    .select("person_name");

  if (fetchError) {
    console.error("❌ ERROR: Failed to fetch existing notes:", fetchError);
    process.exit(1);
  }

  const existingPersonNames = new Set<string>();
  existingNotes?.forEach((note) => {
    const normalized = normalizePersonName(note.person_name);
    existingPersonNames.add(normalized);
  });

  console.log(`✅ Found ${existingPersonNames.size} existing notes in database`);
  console.log("");

  // Filter to only people who don't have notes
  const peopleToGenerate = STATIC_PEOPLE_NAMES.filter((name) => {
    const normalized = normalizePersonName(name);
    return !existingPersonNames.has(normalized);
  });

  console.log(`📝 Need to generate notes for ${peopleToGenerate.length} people`);
  console.log("");

  if (peopleToGenerate.length === 0) {
    console.log("✨ All people already have notes! Nothing to do.");
    return;
  }

  // Track results
  let generated = 0;
  let skipped = 0;
  const errors: Array<{ name: string; error: string }> = [];

  // Process each person
  for (let i = 0; i < peopleToGenerate.length; i++) {
    const personName = peopleToGenerate[i];
    const normalizedName = normalizePersonName(personName);

    console.log(`[${i + 1}/${peopleToGenerate.length}] Processing: ${personName}`);

    try {
      // Double-check it doesn't exist (race condition protection)
      const { data: existingCheck } = await supabase
        .from("bible_people_notes")
        .select("notes_text")
        .eq("person_name", normalizedName)
        .maybeSingle();

      if (existingCheck?.notes_text && existingCheck.notes_text.trim().length > 0) {
        console.log(`  ⏭️  Skipped: ${personName} (notes already exist)`);
        skipped++;
        continue;
      }

      // Generate notes using OpenAI
      const prompt = buildPrompt(personName);
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: SYSTEM_CONTENT,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.6,
        max_tokens: 2000,
      });

      const rawReply = completion.choices[0]?.message?.content ?? "";
      if (!rawReply || rawReply.trim().length === 0) {
        throw new Error("Generated notes are empty");
      }

      const formattedReply = formatReply(rawReply);

      // Insert into database
      const { error: insertError } = await supabase
        .from("bible_people_notes")
        .upsert(
          {
            person_name: normalizedName,
            notes_text: formattedReply,
          },
          {
            onConflict: "person_name",
          }
        );

      if (insertError) {
        throw new Error(`Database insert failed: ${insertError.message}`);
      }

      console.log(`  ✅ Generated and saved notes for: ${personName}`);
      generated++;

      // Delay between requests (300-500ms)
      if (i < peopleToGenerate.length - 1) {
        const delay = Math.floor(Math.random() * 200) + 300; // 300-500ms
        await sleep(delay);
      }
    } catch (error: any) {
      const errorMessage = error?.message || error?.toString() || "Unknown error";
      console.error(`  ❌ ERROR for ${personName}:`, errorMessage);
      errors.push({ name: personName, error: errorMessage });
    }
  }

  // Print summary
  console.log("");
  console.log("=".repeat(60));
  console.log("📊 SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total people: ${STATIC_PEOPLE_NAMES.length}`);
  console.log(`Already had notes: ${existingPersonNames.size}`);
  console.log(`Generated: ${generated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Errors: ${errors.length}`);

  if (errors.length > 0) {
    console.log("");
    console.log("❌ ERRORS:");
    errors.forEach(({ name, error }) => {
      console.log(`  - ${name}: ${error}`);
    });
  }

  console.log("");
  console.log("✨ Done!");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
