import { isNativeApp } from "@/lib/nativeApp";

/**
 * Sharing and haptics, one helper each (Louis, 2026-10-11).
 *
 * The share buttons all call navigator.share and fall back to the clipboard.
 * That is right on the web, and unreliable inside a WKWebView: the Web Share
 * API needs a user gesture the webview does not always pass through, and when
 * it fails the reader silently gets "copied to clipboard" instead of the
 * share sheet they tapped for. The Capacitor plugin calls the real iOS sheet.
 *
 * Both helpers no-op safely on the web, so call sites do not need to know
 * which they are running in.
 */

/** Loaded on demand: a top-level Capacitor import lands in the server bundle. */
async function sharePlugin() {
  if (!isNativeApp()) return null;
  try {
    const mod = await import("@capacitor/share");
    return mod.Share;
  } catch {
    return null;
  }
}

export type SharePayload = {
  title?: string;
  text: string;
  url?: string;
};

export type ShareOutcome = "shared" | "copied" | "dismissed" | "failed";

/**
 * Share, by whatever means this device actually has.
 *
 * Order: the native sheet, then the Web Share API, then the clipboard. The
 * caller gets back which one happened so it can show "copied" only when
 * something really was copied.
 */
export async function shareContent(payload: SharePayload): Promise<ShareOutcome> {
  const { title, text, url } = payload;

  const native = await sharePlugin();
  if (native) {
    try {
      await native.share({ title, text, url, dialogTitle: title });
      return "shared";
    } catch {
      // Tapping outside the sheet rejects. That is a decision, not a fault,
      // so it must not fall through to quietly copying instead.
      return "dismissed";
    }
  }

  try {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ title, text, url });
      return "shared";
    }
  } catch {
    return "dismissed";
  }

  try {
    await navigator.clipboard.writeText(url ? `${text}\n${url}` : text);
    return "copied";
  } catch {
    return "failed";
  }
}

/**
 * A short tap of feedback, for moments worth feeling: a chapter finished, a
 * streak extended, a day of the plan completed.
 *
 * Silent on the web and on any device with haptics switched off. Never
 * awaited for correctness - nothing should wait on a buzz.
 */
export async function tapHaptic(style: "light" | "medium" | "success" = "light"): Promise<void> {
  if (!isNativeApp()) return;
  try {
    const { Haptics, ImpactStyle, NotificationType } = await import("@capacitor/haptics");
    if (style === "success") {
      await Haptics.notification({ type: NotificationType.Success });
      return;
    }
    await Haptics.impact({ style: style === "medium" ? ImpactStyle.Medium : ImpactStyle.Light });
  } catch {
    // No haptics engine, or the reader has them off. Not worth a log line.
  }
}
