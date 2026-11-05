/**
 * Proves the OpenAI budget gate lets the two approved features through and
 * nothing else, and that it stops at $10 a month.
 *
 *   npx tsx scripts/verify-openai-budget.ts
 *
 * Spends nothing. The ledger is a fake Supabase client held in memory, so
 * every branch can be walked - including "the month is already spent" - with
 * no network, no database and no OpenAI request. A regression that lets a
 * third feature bill us, or that quietly raises the ceiling, fails here
 * rather than on the invoice.
 */
import {
  assertOpenAiSpendAllowed,
  ESTIMATED_COST_USD,
  isBillableFeature,
  monthlySpendUsd,
  OPENAI_MONTHLY_BUDGET_USD,
  OpenAiBudgetExceeded,
  OpenAiFeatureNotAllowed,
  OPENAI_SPEND_EVENT,
  recordOpenAiSpend,
} from "../lib/openAiBudget";
import { TTS_CLIENT_DAILY_CAP, TTS_GLOBAL_DAILY_CAP } from "../lib/ttsGenerationGuard";

let failures = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures += 1;
};

/** The smallest thing that behaves like the bits of Supabase we call. */
function fakeAdmin(rows: Array<{ event_name: string; metadata: Record<string, unknown> }> = []) {
  const store = [...rows];
  const client = {
    rows: store,
    from(_table: string) {
      return {
        select(_cols: string) {
          const state = { event: "" as string };
          const api = {
            eq(_col: string, value: string) {
              state.event = value;
              return api;
            },
            gte(_col: string, _value: string) {
              return api;
            },
            limit(_n: number) {
              return Promise.resolve({
                data: store.filter((r) => r.event_name === state.event),
                error: null,
              });
            },
          };
          return api;
        },
        insert(row: { event_name: string; metadata: Record<string, unknown> }) {
          store.push(row);
          return Promise.resolve({ error: null }).then(
            (v) => v,
            (v) => v,
          );
        },
      };
    },
  };
  return client as unknown as Parameters<typeof monthlySpendUsd>[0] & { rows: typeof store };
}

async function main() {
  console.log("\nOpenAI budget gate\n");

  // --- which features may spend at all -------------------------------------
  check("little_louis_reply is billable", isBillableFeature("little_louis_reply"));
  check("bible_text_to_speech is billable", isBillableFeature("bible_text_to_speech"));
  for (const rejected of [
    "moderator_engagement",
    "auto_reply",
    "group_auto_reply",
    "tts_devotional_overview",
    "anything_else",
  ]) {
    check(`${rejected} is not billable`, !isBillableFeature(rejected));
  }

  // --- an empty month lets the approved features through --------------------
  {
    const admin = fakeAdmin();
    let allowed = true;
    await assertOpenAiSpendAllowed(admin, "little_louis_reply").catch(() => (allowed = false));
    check("empty month allows a Lil Louis reply", allowed);

    allowed = true;
    await assertOpenAiSpendAllowed(admin, "bible_text_to_speech").catch(() => (allowed = false));
    check("empty month allows a chapter of audio", allowed);
  }

  // --- an unapproved feature is refused by name -----------------------------
  {
    const admin = fakeAdmin();
    let error: unknown = null;
    await assertOpenAiSpendAllowed(admin, "tts_devotional_overview").catch((e) => (error = e));
    check("an unapproved feature is refused", error instanceof OpenAiFeatureNotAllowed);
    check(
      "the refusal is written to the ledger",
      admin.rows.some((r) => r.event_name === "openai_spend_blocked"),
    );
  }

  // --- a spent month refuses both approved features -------------------------
  {
    const spent = Array.from({ length: 72 }, () => ({
      event_name: OPENAI_SPEND_EVENT,
      metadata: { cost_usd: ESTIMATED_COST_USD.bible_text_to_speech },
    }));
    const admin = fakeAdmin(spent);
    const total = await monthlySpendUsd(admin);
    check(
      "ledger adds the month up",
      total !== null && Math.abs(total - 72 * ESTIMATED_COST_USD.bible_text_to_speech) < 0.001,
      `$${total?.toFixed(2)}`,
    );
    check("that is over budget", (total ?? 0) > OPENAI_MONTHLY_BUDGET_USD);

    let error: unknown = null;
    await assertOpenAiSpendAllowed(admin, "bible_text_to_speech").catch((e) => (error = e));
    check("audio is refused once the budget is gone", error instanceof OpenAiBudgetExceeded);

    error = null;
    await assertOpenAiSpendAllowed(admin, "little_louis_reply").catch((e) => (error = e));
    check("chat is refused once the budget is gone", error instanceof OpenAiBudgetExceeded);
  }

  // --- the last few cents still work ----------------------------------------
  {
    // $9.90 spent: a 14c chapter would cross $10, a 0.2c reply would not.
    const spent = Array.from({ length: 4950 }, () => ({
      event_name: OPENAI_SPEND_EVENT,
      metadata: { cost_usd: 0.002 },
    }));
    const admin = fakeAdmin(spent);
    let audioError: unknown = null;
    await assertOpenAiSpendAllowed(admin, "bible_text_to_speech").catch((e) => (audioError = e));
    check("a chapter that would cross $10 is refused", audioError instanceof OpenAiBudgetExceeded);

    let chatAllowed = true;
    await assertOpenAiSpendAllowed(admin, "little_louis_reply").catch(() => (chatAllowed = false));
    check("a reply that still fits is allowed", chatAllowed);
  }

  // --- recording spend moves the total --------------------------------------
  {
    const admin = fakeAdmin();
    await recordOpenAiSpend(admin, "bible_text_to_speech", { kind: "bible-chapter" });
    const total = await monthlySpendUsd(admin);
    check(
      "a recorded generation shows up as money",
      total === ESTIMATED_COST_USD.bible_text_to_speech,
      `$${total}`,
    );
  }

  // --- an unreadable ledger must not block the app --------------------------
  {
    const broken = {
      from: () => ({
        select: () => ({
          eq: () => ({ gte: () => ({ limit: () => Promise.resolve({ data: null, error: new Error("down") }) }) }),
        }),
        insert: () => Promise.resolve({ error: null }),
      }),
    } as unknown as Parameters<typeof monthlySpendUsd>[0];
    check("an unreadable ledger reads as null", (await monthlySpendUsd(broken)) === null);
    let allowed = true;
    await assertOpenAiSpendAllowed(broken, "little_louis_reply").catch(() => (allowed = false));
    check("an unreadable ledger does not block the app", allowed);
  }

  // --- the daily caps still agree with a $10 month --------------------------
  {
    const worstDay = TTS_GLOBAL_DAILY_CAP * ESTIMATED_COST_USD.bible_text_to_speech;
    check(
      "a full day of audio cannot spend the month in one go",
      worstDay < OPENAI_MONTHLY_BUDGET_USD,
      `$${worstDay.toFixed(2)} worst case`,
    );
    check("one client cannot take the whole day", TTS_CLIENT_DAILY_CAP < TTS_GLOBAL_DAILY_CAP);
  }

  console.log(`\n${failures === 0 ? "All checks passed." : `${failures} check(s) FAILED.`}\n`);
  process.exit(failures === 0 ? 0 : 1);
}

void main();
