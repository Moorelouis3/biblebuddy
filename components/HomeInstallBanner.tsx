"use client";

import { useEffect, useState } from "react";
import InstallBanner from "./InstallBanner";
import InstallIOSSheet from "./InstallIOSSheet";
import { supabase } from "../lib/supabaseClient";
import { getInstallEnvironment, isStandalone } from "../lib/installEnvironment";
import {
  INSTALL_PROMPT_STORAGE_KEY,
  clearCapturedInstallPrompt,
  useInstallPrompt,
} from "../hooks/useInstallPrompt";

// Owns the Add to Home Screen banner's behavior: environment detection, what
// tapping the links does, and persistence. localStorage decides what renders
// (instant, no network); Supabase is the background backup copy, written only
// when the user acts — never on page load.

export const INSTALL_PROMPT_LAST_SHOWN_KEY = "bb-install-prompt-last-shown";
const SESSION_HIDE_KEY = "bb-install-prompt-session-hide";
const SYNC_EVENT = "bb:install-prompt-sync";
const IOS_SNOOZE_DAYS = 7;

function readLocalInstallState(): string {
  try {
    return window.localStorage.getItem(INSTALL_PROMPT_STORAGE_KEY) || "pending";
  } catch {
    return "pending";
  }
}

function writeLocalInstallState(state: "never" | "installed") {
  try {
    window.localStorage.setItem(INSTALL_PROMPT_STORAGE_KEY, state);
  } catch {
    // ignore
  }
}

function iosSnoozeActive(): boolean {
  try {
    const raw = window.localStorage.getItem(INSTALL_PROMPT_LAST_SHOWN_KEY);
    if (!raw) return false;
    const shownAt = new Date(raw).getTime();
    if (Number.isNaN(shownAt)) return false;
    return Date.now() - shownAt < IOS_SNOOZE_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

/** Synchronous, localStorage-only visibility decision — safe to run before paint. */
export function shouldShowInstallBanner(): boolean {
  if (typeof window === "undefined") return false;
  const env = getInstallEnvironment();
  if (env.isStandalone) return false;
  const state = readLocalInstallState();
  if (state === "never" || state === "installed") return false;
  try {
    if (window.sessionStorage.getItem(SESSION_HIDE_KEY) === "1") return false;
  } catch {
    // ignore
  }
  if (env.isIOS && iosSnoozeActive()) return false;
  return true;
}

/** Background Supabase write. Fire-and-forget from user actions only. */
async function writeInstallPromptColumns(columns: Record<string, string>) {
  try {
    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user?.id;
    if (!userId) return;
    await supabase.from("profile_stats").upsert({ user_id: userId, ...columns });
  } catch {
    // Banner persistence is best-effort; localStorage already has the answer.
  }
}

/**
 * Called after the home screen's existing profile query returns (post-paint).
 * Copies the account's saved state into localStorage so "never"/"installed"
 * follows the user across devices, and hides an already-visible banner.
 * The single exception to tap-only writes: iOS never fires appinstalled, so a
 * standalone launch where the DB still says pending does the one "installed"
 * write — guarded by the already-loaded DB value, so it happens once per
 * account, ever.
 */
export function reconcileInstallPromptState(
  dbState: string | null,
  dbLastShown: string | null,
) {
  if (typeof window === "undefined") return;
  let changed = false;

  if (isStandalone()) {
    if (readLocalInstallState() !== "installed") {
      writeLocalInstallState("installed");
      changed = true;
    }
    if (dbState !== "installed") {
      void writeInstallPromptColumns({ install_prompt_state: "installed" });
    }
  } else if ((dbState === "never" || dbState === "installed") && readLocalInstallState() !== dbState) {
    writeLocalInstallState(dbState);
    changed = true;
  }

  if (dbLastShown) {
    try {
      const local = window.localStorage.getItem(INSTALL_PROMPT_LAST_SHOWN_KEY);
      const dbMs = new Date(dbLastShown).getTime();
      const localMs = local ? new Date(local).getTime() : 0;
      if (!Number.isNaN(dbMs) && dbMs > localMs) {
        window.localStorage.setItem(INSTALL_PROMPT_LAST_SHOWN_KEY, dbLastShown);
        changed = true;
      }
    } catch {
      // ignore
    }
  }

  if (changed) {
    window.dispatchEvent(new CustomEvent(SYNC_EVENT));
  }
}

export default function HomeInstallBanner() {
  const [visible, setVisible] = useState<boolean>(() => shouldShowInstallBanner());
  const [sheetOpen, setSheetOpen] = useState(false);
  const [blockedMessage, setBlockedMessage] = useState<{ headline: string; subline: string } | null>(null);
  const { promptEvent, justInstalled } = useInstallPrompt();

  // Background sync (or another tab) may have learned the banner should hide.
  useEffect(() => {
    const revisit = () => setVisible(shouldShowInstallBanner());
    window.addEventListener(SYNC_EVENT, revisit);
    return () => window.removeEventListener(SYNC_EVENT, revisit);
  }, []);

  // appinstalled can fire while the banner is up (e.g. install accepted).
  useEffect(() => {
    if (!justInstalled) return;
    setVisible(false);
    void writeInstallPromptColumns({ install_prompt_state: "installed" });
  }, [justInstalled]);

  if (!visible) return null;

  const markInstalled = () => {
    writeLocalInstallState("installed");
    setVisible(false);
    void writeInstallPromptColumns({ install_prompt_state: "installed" });
  };

  const handleAdd = async () => {
    const env = getInstallEnvironment();

    if (env.isInAppBrowser) {
      setBlockedMessage({
        headline: "Open in Safari or Chrome first",
        subline: "This in-app browser can't install apps. Open biblebuddy in your regular browser, then tap Add.",
      });
      return;
    }

    if (env.isIOS) {
      setSheetOpen(true);
      return;
    }

    if (promptEvent) {
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        clearCapturedInstallPrompt();
        if (choice.outcome === "accepted") {
          markInstalled();
        } else {
          // Dismissed: hide for this session only; it returns next visit.
          try {
            window.sessionStorage.setItem(SESSION_HIDE_KEY, "1");
          } catch {
            // ignore
          }
          setVisible(false);
        }
      } catch {
        clearCapturedInstallPrompt();
      }
      return;
    }

    // No captured prompt (browser without install support, or criteria not met).
    setBlockedMessage({
      headline: "Install isn't available in this browser",
      subline: "Open Bible Buddy in Chrome to add it to your home screen.",
    });
  };

  const handleDontShowAgain = () => {
    writeLocalInstallState("never");
    setVisible(false);
    void writeInstallPromptColumns({ install_prompt_state: "never" });
  };

  const handleSheetClose = () => {
    setSheetOpen(false);
    // iOS can't confirm the install, so hide and snooze for 7 days.
    const closedAtIso = new Date().toISOString();
    try {
      window.localStorage.setItem(INSTALL_PROMPT_LAST_SHOWN_KEY, closedAtIso);
    } catch {
      // ignore
    }
    setVisible(false);
    void writeInstallPromptColumns({ install_prompt_last_shown: closedAtIso });
  };

  return (
    <>
      <InstallBanner
        onAdd={blockedMessage ? undefined : handleAdd}
        onDontShowAgain={handleDontShowAgain}
        headline={blockedMessage?.headline}
        subline={blockedMessage?.subline}
        showAddLink={!blockedMessage}
      />
      <InstallIOSSheet isOpen={sheetOpen} onClose={handleSheetClose} />
    </>
  );
}
