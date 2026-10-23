import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Bug tracker plumbing (2026-09-13). Louis wanted bug reports to stop living
 * only in his DMs: every report and every crash is saved to bug_reports,
 * the Bug Fixer routine works through the open ones, and Louis gets a bell
 * notification whenever one is fixed or needs him. See docs/BUG_FIXER_AGENT.md.
 */

/**
 * The statuses a report moves through (widened 2026-10-23).
 *
 * The first six are the originals and keep their exact spelling, because 135
 * reports are already stored with them and a rename would orphan every one.
 * The rest are the steps that used to happen invisibly inside a single
 * "fixing": triage, investigation, tests, and the wait for Louis when the fix
 * touches something that must not go out unseen.
 */
export const BUG_STATUSES = [
  "new",
  "triaging",
  "investigating",
  "fixing",
  "testing",
  "awaiting_approval",
  "fixed",
  "cannot_reproduce",
  "needs_info",
  "needs_louis",
  "not_a_bug",
  "duplicate",
  "closed",
] as const;
export type BugStatus = (typeof BUG_STATUSES)[number];

/** What each one is called on the page, in Louis's words rather than ours. */
export const BUG_STATUS_LABEL: Record<BugStatus, string> = {
  new: "New",
  triaging: "Triaging",
  investigating: "Investigating",
  fixing: "Fix in progress",
  testing: "Testing",
  awaiting_approval: "Awaiting approval",
  fixed: "Fixed",
  cannot_reproduce: "Unable to reproduce",
  needs_info: "Needs more information",
  needs_louis: "Needs you",
  not_a_bug: "Not a bug",
  duplicate: "Duplicate",
  closed: "Closed",
};

/** Still being worked. The agent asks for these. */
export const OPEN_BUG_STATUSES: BugStatus[] = [
  "new",
  "triaging",
  "investigating",
  "fixing",
  "testing",
  "needs_info",
];

/** Done, one way or another. Setting one of these stamps resolved_at. */
export const FINISHED_BUG_STATUSES: BugStatus[] = [
  "fixed",
  "cannot_reproduce",
  "not_a_bug",
  "duplicate",
  "closed",
];

/** Waiting on Louis, and the only thing the page shows first. */
export const ATTENTION_BUG_STATUSES: BugStatus[] = ["awaiting_approval", "needs_louis"];

export type NewBugReport = {
  source: "problem_card" | "crash" | "dm";
  message: string;
  category?: string | null;
  area?: string | null;
  page?: string | null;
  errorDetails?: Record<string, unknown> | null;
  fingerprint?: string | null;
  reporterUserId?: string | null;
  reporterName?: string | null;
  conversationId?: string | null;
  /** ios | android | web, worked out from the user agent. */
  platform?: string | null;
  appVersion?: string | null;
};

/**
 * Which app this came from, from the user agent alone.
 *
 * The iOS shell appends "BibleBuddyApp" to its user agent, which is the only
 * reason a crash in the native app can be told apart from the same crash in
 * Safari - and they are not the same bug, because one of them needs an App
 * Store release to fix.
 */
export function platformFromUserAgent(userAgent: string | null | undefined): string | null {
  if (!userAgent) return null;
  const native = /BibleBuddyApp/i.test(userAgent);
  if (/iPhone|iPad|iPod/i.test(userAgent)) return native ? "ios-app" : "ios-web";
  if (/Android/i.test(userAgent)) return native ? "android-app" : "android-web";
  return native ? "app" : "web";
}

const clip = (value: string | null | undefined, max: number) => (value ? value.slice(0, max) : null);

/**
 * Areas where a wrong fix costs more than a slow one.
 *
 * This is the approval gate, and it is deliberately a list of words rather
 * than a judgement call left to the agent: an agent that decides for itself
 * whether something is risky will eventually decide wrong, at 3am, on the
 * login screen. Anything matching here cannot be marked fixed without Louis
 * saying so - the endpoint refuses it, not the prompt.
 */
const RISK_PATTERNS: Array<[string, RegExp]> = [
  ["auth", /\b(login|log in|sign ?in|sign ?up|signup|password|auth|session|token|account access|locked out)\b/i],
  ["permissions", /\b(admin|permission|role|rls|policy|access control)\b/i],
  ["payments", /\b(payment|billing|subscription|stripe|refund|charge|price|purchase|checkout)\b/i],
  ["privacy", /\b(privacy|gdpr|personal data|delete (my )?account|export my data)\b/i],
  ["secrets", /\b(secret|api key|service[_ ]role|env var|credential)\b/i],
  ["database", /\b(migration|schema|drop (table|column)|alter table|truncate|delete from)\b/i],
  ["native_ios", /\b(screen ?time|family ?controls|entitlement|testflight|app store|capacitor|native app|bible lock)\b/i],
  ["security", /\b(security|xss|csrf|injection|vulnerab|exploit)\b/i],
];

export type RiskyBugInput = {
  area?: string | null;
  category?: string | null;
  page?: string | null;
  message?: string | null;
  diagnosis?: string | null;
  fix_summary?: string | null;
  severity?: string | null;
};

/** Which risky areas this report touches. Empty means a routine fix. */
export function classifyBugRisk(bug: RiskyBugInput): string[] {
  const haystack = [bug.area, bug.category, bug.page, bug.message, bug.diagnosis, bug.fix_summary]
    .filter(Boolean)
    .join("\n");
  const hits = RISK_PATTERNS.filter(([, pattern]) => pattern.test(haystack)).map(([name]) => name);
  return [...new Set(hits)];
}

/**
 * May a fix for this report go out without Louis?
 *
 * No if it touches a risky area, and no if whoever worked it said they were
 * not sure. "Low confidence but the tests passed" is exactly the case that
 * should wait for a human.
 */
export function bugNeedsApproval(bug: RiskyBugInput & { confidence?: string | null; tests_result?: string | null }): {
  needed: boolean;
  risks: string[];
  reason: string | null;
} {
  const risks = classifyBugRisk(bug);
  if (risks.length) return { needed: true, risks, reason: `touches ${risks.join(", ")}` };
  if ((bug.severity || "").toLowerCase() === "critical") {
    return { needed: true, risks, reason: "marked critical" };
  }
  if ((bug.confidence || "").toLowerCase() === "low") {
    return { needed: true, risks, reason: "the fix is a guess, not a diagnosis" };
  }
  if (bug.tests_result && /fail|error/i.test(bug.tests_result)) {
    return { needed: true, risks, reason: "the tests did not pass" };
  }
  return { needed: false, risks, reason: null };
}

/** How many times the agent may pick up one report before it has to stop. */
export const MAX_FIX_ATTEMPTS = 3;

export type BugEventActor = "system" | "agent" | "louis" | "reporter";

/**
 * One line in a report's history.
 *
 * Never throws: a timeline that cannot be written must not take an
 * acknowledgment or a fix down with it.
 */
export async function logBugEvent(
  admin: SupabaseClient,
  bugId: string,
  actor: BugEventActor,
  kind: string,
  detail?: string | null,
  meta?: Record<string, unknown> | null,
) {
  try {
    await admin.from("bug_report_events").insert({
      bug_id: bugId,
      actor,
      kind,
      detail: clip(detail, 2000),
      meta: meta ?? null,
    });
  } catch {
    // History is worth having, never worth failing for.
  }
}

/**
 * Saves a report. Crashes with a fingerprint already seen in the last 14
 * days bump the existing row instead of piling up duplicates, so one broken
 * deploy shows as "happened 40 times", not 40 rows.
 */
export async function recordBugReport(admin: SupabaseClient, report: NewBugReport) {
  const now = new Date().toISOString();

  if (report.fingerprint) {
    const since = new Date(Date.now() - 14 * 86_400_000).toISOString();
    const { data: existing } = await admin
      .from("bug_reports")
      .select("id, occurrences, status")
      .eq("fingerprint", report.fingerprint)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (existing?.id) {
      const reopened = existing.status === "fixed" ? { status: "new" } : {};
      await admin
        .from("bug_reports")
        .update({ occurrences: (existing.occurrences || 1) + 1, last_seen_at: now, updated_at: now, ...reopened })
        .eq("id", existing.id);
      // Keep this person too. Folding a repeat into one row is right, but the
      // second reporter used to disappear with it - name, thread and all - so
      // there was nobody to tell when it was fixed.
      await attachReporter(admin, existing.id as string, report);
      await logBugEvent(
        admin,
        existing.id as string,
        "system",
        "reported_again",
        `Reported again${report.reporterName ? ` by ${report.reporterName}` : ""}${reopened.status ? " - reopened" : ""}`,
      );
      return { id: existing.id as string, isNew: false };
    }
  }

  const { data, error } = await admin
    .from("bug_reports")
    .insert({
      source: report.source,
      message: clip(report.message, 4000) || "(no message)",
      category: clip(report.category, 80),
      area: clip(report.area, 80),
      page: clip(report.page, 500),
      error_details: report.errorDetails ?? null,
      fingerprint: clip(report.fingerprint, 200),
      reporter_user_id: report.reporterUserId ?? null,
      reporter_name: clip(report.reporterName, 120),
      conversation_id: report.conversationId ?? null,
      platform: clip(report.platform, 40),
      app_version: clip(report.appVersion, 40),
      last_seen_at: now,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  const id = data.id as string;
  await attachReporter(admin, id, report);
  await logBugEvent(
    admin,
    id,
    "system",
    "reported",
    `${report.area || "App"} - reported via ${report.source}${report.reporterName ? ` by ${report.reporterName}` : ""}`,
    { page: report.page ?? null, category: report.category ?? null },
  );
  return { id, isNew: true };
}

/** Remember everyone who has hit this, so everyone can be answered. */
async function attachReporter(admin: SupabaseClient, bugId: string, report: NewBugReport) {
  if (!report.reporterUserId) return;
  try {
    // Look first, then insert. The unique index on this table is partial
    // (only where reporter_user_id is not null), and PostgREST cannot infer
    // a conflict target from a partial index - an upsert here silently wrote
    // nothing, which is how the same person got acknowledged twice in
    // testing on 2026-10-23.
    const { data: already } = await admin
      .from("bug_report_reporters")
      .select("id")
      .eq("bug_id", bugId)
      .eq("reporter_user_id", report.reporterUserId)
      .maybeSingle();
    if (already?.id) return;

    await admin.from("bug_report_reporters").insert({
      bug_id: bugId,
      reporter_user_id: report.reporterUserId,
      reporter_name: clip(report.reporterName, 120),
      conversation_id: report.conversationId ?? null,
    });
  } catch {
    // The report itself is already saved; this is only who else to tell.
  }
}

/** Is the whole repair automation switched off right now? */
export async function bugAutomationPaused(admin: SupabaseClient): Promise<boolean> {
  try {
    const { data } = await admin.from("bug_automation").select("paused").eq("id", true).maybeSingle();
    return Boolean(data?.paused);
  } catch {
    // Unknown is not paused: a missing settings row must not stop the loop.
    return false;
  }
}

/**
 * "Thanks, we have it, we are looking."
 *
 * Sent once per reporter per report, the moment it arrives, through the DM
 * thread the report already opened - no new channel, no new inbox. It
 * promises nothing: the only other message anybody gets is after a fix is
 * actually live (see /api/cron/bug-replies).
 */
export const BUG_ACK_TEXT =
  "Thanks for reporting this! I've got it and I'm looking into it. I'll message you here as soon as there's news.";

export async function acknowledgeBugReport(
  admin: SupabaseClient,
  bugId: string,
  reporterUserId: string,
  conversationId: string | null,
) {
  const { data: bug } = await admin
    .from("bug_reports")
    .select("id, ack_sent_at")
    .eq("id", bugId)
    .maybeSingle();
  if (!bug) return false;

  // One acknowledgment per person per report, whatever happens upstream.
  const { data: mine } = await admin
    .from("bug_report_reporters")
    .select("id, ack_sent_at")
    .eq("bug_id", bugId)
    .eq("reporter_user_id", reporterUserId)
    .maybeSingle();
  if (mine?.ack_sent_at) return false;
  // No row for this person yet (an older report, or the insert lost a race)
  // and the report has already been acknowledged: that was them. Saying it
  // twice is worse than not saying it again.
  if (!mine && bug.ack_sent_at) return false;

  const louisUserId = await resolveLouisUserId(admin);
  if (!louisUserId || louisUserId === reporterUserId) return false;

  const now = new Date().toISOString();
  try {
    const thread = await sendBugReply(admin, {
      louisUserId,
      reporterUserId,
      conversationId,
      content: BUG_ACK_TEXT,
    });
    if (mine?.id) {
      await admin.from("bug_report_reporters").update({ ack_sent_at: now, conversation_id: thread }).eq("id", mine.id);
    }
    if (!bug.ack_sent_at) {
      await admin.from("bug_reports").update({ ack_sent_at: now }).eq("id", bugId);
    }
    await logBugEvent(admin, bugId, "system", "acknowledged", "Told the reporter we have it and are looking.");
    return true;
  } catch {
    // A failed acknowledgment is a missed hello, not a lost report.
    return false;
  }
}

/** A bell notification for Louis that opens the tracker when tapped. */
export async function notifyLouisAboutBug(admin: SupabaseClient, louisUserId: string, message: string) {
  await admin.from("notifications").insert({
    user_id: louisUserId,
    type: "bug_update",
    from_user_name: "Bug Tracker",
    article_slug: "/admin/bugs",
    message: message.length > 160 ? `${message.slice(0, 157)}...` : message,
    is_read: false,
  });
}

/**
 * Sends a DM from Louis into the reporter's conversation, the same way a
 * reply typed in Messages would land: message row, conversation preview,
 * and a notification for the reporter.
 */
export async function sendBugReply(
  admin: SupabaseClient,
  params: { louisUserId: string; reporterUserId: string; conversationId?: string | null; content: string },
) {
  const { louisUserId, reporterUserId, content } = params;
  let conversationId = params.conversationId ?? null;

  if (!conversationId) {
    const [uid1, uid2] = louisUserId < reporterUserId ? [louisUserId, reporterUserId] : [reporterUserId, louisUserId];
    const { data: existing } = await admin
      .from("conversations")
      .select("id")
      .eq("user_id_1", uid1)
      .eq("user_id_2", uid2)
      .maybeSingle();
    conversationId = existing?.id ?? null;
    if (!conversationId) {
      const { data: created, error } = await admin
        .from("conversations")
        .insert({ user_id_1: uid1, user_id_2: uid2 })
        .select("id")
        .single();
      if (error || !created) throw new Error(error?.message || "Could not open a conversation.");
      conversationId = created.id;
    }
  }

  const now = new Date().toISOString();
  const { error: messageError } = await admin
    .from("messages")
    .insert({ conversation_id: conversationId, sender_id: louisUserId, content, created_at: now, is_automated: true });
  if (messageError) throw new Error(messageError.message);

  const preview = content.length > 120 ? `${content.slice(0, 117)}...` : content;
  await admin.from("conversations").update({ last_message_at: now, last_message_preview: preview }).eq("id", conversationId);
  await admin.from("notifications").insert({
    user_id: reporterUserId,
    type: "direct_message",
    from_user_id: louisUserId,
    from_user_name: "Louis Moore",
    article_slug: `/messages/${conversationId}`,
    message: preview,
    is_read: false,
    created_at: now,
  });

  return conversationId as string;
}

export async function resolveLouisUserId(admin: SupabaseClient): Promise<string | null> {
  if (process.env.LOUIS_USER_ID) return process.env.LOUIS_USER_ID;
  try {
    const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    return data?.users?.find((user) => user.email === "moorelouis3@gmail.com")?.id ?? null;
  } catch {
    return null;
  }
}
