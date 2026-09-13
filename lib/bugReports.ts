import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Bug tracker plumbing (2026-09-13). Louis wanted bug reports to stop living
 * only in his DMs: every report and every crash is saved to bug_reports,
 * the Bug Fixer routine works through the open ones, and Louis gets a bell
 * notification whenever one is fixed or needs him. See docs/BUG_FIXER_AGENT.md.
 */

export const BUG_STATUSES = ["new", "fixing", "fixed", "needs_louis", "not_a_bug", "duplicate"] as const;
export type BugStatus = (typeof BUG_STATUSES)[number];

export const OPEN_BUG_STATUSES: BugStatus[] = ["new", "fixing"];

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
};

const clip = (value: string | null | undefined, max: number) => (value ? value.slice(0, max) : null);

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
      return existing.id as string;
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
      last_seen_at: now,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return data.id as string;
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
    .insert({ conversation_id: conversationId, sender_id: louisUserId, content, created_at: now });
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
