/**
 * Replay the Auto Comment router over real feed posts, and optionally ask the
 * model for a handful of real drafts.
 *
 *   npx tsx scripts/auto-comment-replay.ts <posts.json>            routing only, no network
 *   npx tsx scripts/auto-comment-replay.ts <posts.json> --drafts 4 also makes that many model calls
 *
 * <posts.json> is an array of { post_type, content, verse_ref, verse_text }.
 * Nothing is written anywhere and nothing is posted. With --drafts it spends
 * about $0.0001 per draft on the OPENAI_API_KEY in .env.local, and those
 * calls are NOT recorded in the app's budget ledger - this is a bench tool,
 * not the feature.
 */

import fs from "node:fs";
import path from "node:path";
import { routeFeedPost, type FeedPostForRouting } from "../lib/autoComment/router";
import { pickPrepared } from "../lib/autoComment/prepared";
import {
  AUTO_COMMENT_MAX_OUTPUT_TOKENS,
  AUTO_COMMENT_MODEL,
  autoCommentSystemPrompt,
  autoCommentUserPrompt,
  tidyDraft,
} from "../lib/autoComment/prompt";

type Row = { post_type: string | null; content: string | null; verse_ref: string | null; verse_text: string | null };

async function main() {
  const file = process.argv[2];
  if (!file) throw new Error("Pass the path to a posts JSON file.");
  const draftsAt = process.argv.indexOf("--drafts");
  const wantDrafts = draftsAt > 0 ? Number(process.argv[draftsAt + 1]) || 0 : 0;

  const rows = JSON.parse(fs.readFileSync(file, "utf8")) as Row[];
  const counts: Record<string, number> = {};
  const aiPosts: Array<{ careful: boolean; decision: Extract<ReturnType<typeof routeFeedPost>, { route: "ai" }> }> = [];
  const said: string[] = [];
  const preparedSamples: Record<string, string[]> = {};

  rows.forEach((row, index) => {
    const post: FeedPostForRouting = { user_id: "member", post_type: row.post_type, content: row.content, verse_ref: row.verse_ref, verse_text: row.verse_text };
    const decision = routeFeedPost(post, ["owner", "brand"]);
    const key =
      decision.route === "prepared" ? `prepared / ${decision.kind}` : decision.route === "ai" ? `ai / ${decision.careful ? "careful" : "normal"}` : "none";
    counts[key] = (counts[key] || 0) + 1;
    if (decision.route === "ai") aiPosts.push({ careful: decision.careful, decision });
    if (decision.route === "prepared") {
      const line = pickPrepared(decision.kind, decision.fields, { seed: `post-${index}`, avoid: said.slice(-15) });
      said.push(line);
      const samples = (preparedSamples[decision.kind] ||= []);
      if (samples.length < 4) samples.push(`${String(row.content).slice(0, 52)}  ->  ${line}`);
    }
  });

  console.log(`posts: ${rows.length}`);
  for (const [key, value] of Object.entries(counts).sort((a, b) => b[1] - a[1])) console.log(`  ${key}: ${value}`);
  const distinct = new Set(said).size;
  let closeRepeats = 0;
  for (let i = 1; i < said.length; i += 1) if (said.slice(Math.max(0, i - 15), i).includes(said[i])) closeRepeats += 1;
  console.log(`prepared lines given: ${said.length}, distinct wordings: ${distinct}, repeats within the last 15: ${closeRepeats}`);
  console.log("\nPREPARED SAMPLES");
  for (const [kind, lines] of Object.entries(preparedSamples)) for (const line of lines) console.log(`  [${kind}] ${line}`);

  console.log("\nPOSTS ROUTED TO THE MODEL");
  for (const { careful, decision } of aiPosts) console.log(`  [${careful ? "careful" : "normal"}] ${decision.text.slice(0, 110)}`);

  if (!wantDrafts) return;

  const envFile = path.resolve(__dirname, "..", ".env.local");
  const key = fs
    .readFileSync(envFile, "utf8")
    .split(/\r?\n/)
    .find((line) => line.startsWith("OPENAI_API_KEY="))
    ?.slice("OPENAI_API_KEY=".length)
    .replace(/^["']|["']$/g, "");
  if (!key) throw new Error("No OPENAI_API_KEY in .env.local");

  // Half careful, half normal, so both prompts are seen.
  const careful = aiPosts.filter((entry) => entry.careful);
  const normal = aiPosts.filter((entry) => !entry.careful);
  // --match narrows to posts containing a word, to look at one kind closely.
  const matchAt = process.argv.indexOf("--match");
  const needle = matchAt > 0 ? String(process.argv[matchAt + 1] || "").toLowerCase() : "";
  const chosen = needle
    ? aiPosts.filter((entry) => entry.decision.text.toLowerCase().includes(needle)).slice(0, wantDrafts)
    : [...normal.slice(0, Math.ceil(wantDrafts / 2)), ...careful.slice(0, Math.floor(wantDrafts / 2))];

  console.log("\nREAL DRAFTS");
  let input = 0;
  let output = 0;
  for (const entry of chosen) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: AUTO_COMMENT_MODEL,
        temperature: 0.7,
        max_tokens: AUTO_COMMENT_MAX_OUTPUT_TOKENS,
        messages: [
          { role: "system", content: autoCommentSystemPrompt(entry.careful) },
          { role: "user", content: autoCommentUserPrompt(entry.decision) },
        ],
      }),
    });
    const json = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      usage?: { prompt_tokens?: number; completion_tokens?: number };
      error?: { message?: string };
    };
    if (!response.ok) {
      console.log(`  request failed: ${response.status} ${json.error?.message || ""}`);
      continue;
    }
    input += json.usage?.prompt_tokens || 0;
    output += json.usage?.completion_tokens || 0;
    console.log(`  [${entry.careful ? "careful" : "normal"}] POST: ${entry.decision.text.slice(0, 150)}`);
    console.log(`            DRAFT: ${tidyDraft(json.choices?.[0]?.message?.content || "", entry.careful, entry.decision.text)}`);
    console.log(`            tokens: ${json.usage?.prompt_tokens} in, ${json.usage?.completion_tokens} out`);
  }
  const cost = (input * 0.15 + output * 0.6) / 1_000_000;
  console.log(`\n${chosen.length} drafts: ${input} tokens in, ${output} out, about $${cost.toFixed(6)} in total at gpt-4o-mini list prices.`);
}

void main();
