"use client";

import type { ActionType } from "./actionTypes";
import { supabase } from "./supabaseClient";

/**
 * Ask the server to announce a completion on the buddy feed.
 *
 * Separate from lib/feedMilestones.ts so that the server half - the allowlist,
 * the cap, the "not twice" rule - is never bundled into the browser alongside a
 * service-role client. This half knows only how to ask.
 *
 * The label is what master_actions stores, e.g. "Genesis 3" or
 * "Walking With Jesus - Day 5", and is split into something the feed can render
 * as a sentence. Nothing here decides whether the announcement happens.
 */

/** Turn an action label into the handful of fields the feed renders. */
function describe(actionType: ActionType, actionLabel?: string | null): Record<string, string | number> {
  const label = (actionLabel || "").trim();
  if (!label) return {};

  // "Something - Day 5" or "Something Day 5": the day is worth having as a
  // number so the feed can say "Day 5" without re-parsing the label.
  const dayMatch = label.match(/^(.*?)[\s-]*\bday\s*(\d+)\b/i);
  if (dayMatch && dayMatch[2]) {
    const title = dayMatch[1].replace(/[-–—:]+\s*$/, "").trim();
    return title ? { title, day_number: Number(dayMatch[2]) } : { day_number: Number(dayMatch[2]) };
  }

  if (actionType === "book_completed") return { book: label };
  return { title: label };
}

export async function announceFeedMilestone(
  actionType: ActionType,
  actionLabel?: string | null,
): Promise<void> {
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return;

    await fetch("/api/feed/activity", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ actionType, data: describe(actionType, actionLabel) }),
      keepalive: true,
    });
  } catch {
    // Offline, signed out, route missing: the completion still counts. This is
    // the least important thing in the chain and it fails silently on purpose.
  }
}
