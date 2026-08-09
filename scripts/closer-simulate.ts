/**
 * The Closer - local simulation.
 *
 *   npx tsx scripts/closer-simulate.ts
 *
 * Fires fake webhook payloads through the real code path: the real signature
 * free entry point (extractComments), the real trigger matching, the real
 * claim and dedupe logic, the real DM then fallback decision tree. Only two
 * things are faked, and both are faked at the edges: Supabase is an in memory
 * table, and the Meta senders are stubs. Nothing here touches the network.
 *
 * Cases covered:
 *   1. A normal comment with no trigger word         -> skipped_no_trigger
 *   2. A comment containing a trigger word           -> dm_sent
 *   3. A comment from a "private" account            -> dm_failed_fallback_posted
 *   4. The same comment delivered twice (retry)      -> skipped_duplicate
 *   5. A Threads reply, where no DM API exists       -> public_reply_sent
 *   6. Every case again with dry_run on              -> skipped_dry_run
 */

import { CLOSER_DEFAULT_CONFIG } from "../lib/closer/config";
import { extractComments } from "../app/api/closer/webhook/route";
import { processCommentsSequentially, type CloserSenders } from "../lib/closer/process";
import type { CloserComment, CloserConfig, CloserSendResult } from "../lib/closer/types";

type Row = Record<string, any>;

// Minimal stand in for the Supabase client, implementing only the calls the
// processor makes. The unique index is modelled explicitly, because that
// constraint is the thing keeping anyone from being messaged twice.
function makeFakeSupabase(config: CloserConfig) {
  const rows: Row[] = [];

  const client = {
    from(table: string) {
      if (table === "closer_config") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({
                data: {
                  dry_run: config.dryRun,
                  hourly_cap: config.hourlyCap,
                  trigger_words: config.triggerWords,
                  signup_link: config.signupLink,
                  dm_template: config.dmTemplate,
                  fallback_comment_template: config.fallbackCommentTemplate,
                  public_reply_template: config.publicReplyTemplate,
                },
                error: null,
              }),
            }),
          }),
        } as any;
      }

      return {
        insert: async (row: Row) => {
          const clash = rows.some((r) => r.platform === row.platform && r.comment_id === row.comment_id);
          if (clash) return { error: { code: "23505", message: "duplicate key value violates unique constraint" } };
          rows.push({ ...row, id: `evt_${rows.length + 1}`, created_at: new Date().toISOString() });
          return { error: null };
        },
        update: (patch: Row) => ({
          eq: (_c1: string, platform: string) => ({
            eq: async (_c2: string, commentId: string) => {
              const row = rows.find((r) => r.platform === platform && r.comment_id === commentId);
              if (row) Object.assign(row, patch);
              return { error: null };
            },
          }),
        }),
        select: (_cols?: string, _opts?: Record<string, unknown>) => ({
          in: (_col: string, statuses: string[]) => ({
            gte: async () => ({ count: rows.filter((r) => statuses.includes(r.status)).length }),
          }),
        }),
      } as any;
    },
    _rows: rows,
  };

  return client as any;
}

const ok = (detail: string): CloserSendResult => ({ ok: true, detail });

function makeSenders(privateAccounts: Set<string>): CloserSenders {
  return {
    instagramPrivateReply: async (commentId) =>
      privateAccounts.has(commentId)
        ? { ok: false, permanent: true, detail: "HTTP 400 code 2534037: This person cannot be messaged" }
        : ok(`{"message_id":"stub_for_${commentId}"}`),
    facebookPrivateReply: async (commentId) =>
      privateAccounts.has(commentId)
        ? { ok: false, permanent: true, detail: "HTTP 400 code 10: no permission to message this user" }
        : ok(`{"id":"stub_for_${commentId}"}`),
    publicCommentReply: async (commentId) => ok(`{"id":"reply_to_${commentId}"}`),
    threadsReply: async (commentId) => ok(`{"id":"threads_reply_to_${commentId}"}`),
  };
}

function instagramWebhook(commentId: string, text: string, username: string) {
  return {
    object: "instagram",
    entry: [
      {
        id: "17841400000000000",
        changes: [
          {
            field: "comments",
            value: {
              from: { id: "998877", username },
              media: { id: "media_123", media_product_type: "FEED" },
              id: commentId,
              text,
            },
          },
        ],
      },
    ],
  };
}

function facebookWebhook(commentId: string, text: string, name: string) {
  return {
    object: "page",
    entry: [
      {
        id: "page_555",
        changes: [
          {
            field: "feed",
            value: {
              item: "comment",
              verb: "add",
              comment_id: commentId,
              post_id: "post_999",
              from: { id: "444333", name },
              message: text,
            },
          },
        ],
      },
    ],
  };
}

function print(title: string, outcomes: Array<{ commentId: string; platform: string; status: string; detail: string }>) {
  console.log(`\n=== ${title} ===`);
  for (const o of outcomes) {
    console.log(`  [${o.status.padEnd(26)}] ${o.platform.padEnd(10)} ${o.commentId}`);
    console.log(`      ${o.detail}`);
  }
}

async function run(label: string, config: CloserConfig) {
  const supabase = makeFakeSupabase(config);
  const privateAccounts = new Set(["ig_comment_private"]);
  const senders = makeSenders(privateAccounts);

  const fromWebhooks: CloserComment[] = [
    ...extractComments(instagramWebhook("ig_comment_plain", "This is so encouraging, thank you", "quiet_reader")),
    ...extractComments(instagramWebhook("ig_comment_trigger", "BIBLE please!", "keen_reader")),
    ...extractComments(instagramWebhook("ig_comment_private", "send me the app link", "locked_account")),
    ...extractComments(facebookWebhook("fb_comment_trigger", "Can I get the app?", "Facebook Friend")),
  ];

  const threadsReply: CloserComment = {
    platform: "threads",
    commentId: "threads_reply_1",
    postId: "threads_post_1",
    commenterHandle: "threads_reader",
    commenterId: null,
    text: "link please",
  };

  const first = await processCommentsSequentially(supabase, [...fromWebhooks, threadsReply], senders);
  print(`${label}: first delivery`, first);

  // Meta retries webhooks. The same payload again must change nothing.
  const retry = await processCommentsSequentially(
    supabase,
    [...extractComments(instagramWebhook("ig_comment_trigger", "BIBLE please!", "keen_reader"))],
    senders,
  );
  print(`${label}: duplicate delivery (webhook retry)`, retry);

  console.log(`\n  ${label} final event table:`);
  for (const row of supabase._rows as Row[]) {
    console.log(
      `    ${String(row.platform).padEnd(10)} ${String(row.comment_id).padEnd(20)} ${String(row.status).padEnd(26)} trigger=${row.matched_trigger ?? "-"} dry_run=${row.dry_run}`,
    );
  }
}

async function main() {
  console.log("The Closer - simulation. No network calls are made.");

  await run("LIVE MODE", { ...CLOSER_DEFAULT_CONFIG, dryRun: false });
  await run("DRY RUN", { ...CLOSER_DEFAULT_CONFIG, dryRun: true });

  console.log("\nTrigger matching spot checks:");
  const { findTrigger } = await import("../lib/closer/config");
  const checks: Array<[string, string]> = [
    ["BIBLE please", "expect match"],
    ["bible please", "expect match, case insensitive"],
    ["I am so happy today", "expect NO match, happy contains app"],
    ["blinking lights", "expect NO match, blinking contains link"],
    ["Send the LINK!", "expect match with punctuation"],
    ["studying tonight", "expect NO match, studying is not study"],
  ];
  for (const [text, note] of checks) {
    console.log(`  ${String(findTrigger(text, CLOSER_DEFAULT_CONFIG.triggerWords) ?? "none").padEnd(8)} <- "${text}"  (${note})`);
  }
}

void main();
