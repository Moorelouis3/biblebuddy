"use client";

import { useEffect, useState } from "react";
import InstallBanner from "./InstallBanner";
import InstallIOSSheet from "./InstallIOSSheet";
import { supabase } from "../lib/supabaseClient";
import { getInstallEnvironment, getInstallPlatform, isStandalone } from "../lib/installEnvironment";
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

const INSTALL_EVENT_LOGGED_KEY = "bb-install-event-logged";

/** Analytics event for the admin App Installs dashboard. Fire-and-forget. */
async function logInstallBannerEvent(
  actionType:
    | "install_banner_add_clicked"
    | "install_banner_installed"
    | "install_banner_never_clicked"
    | "install_banner_ios_sheet_closed",
  actionLabel: string,
  metadata: Record<string, unknown> = {},
) {
  try {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return;
    await supabase.from("master_actions").insert({
      user_id: user.id,
      action_type: actionType,
      action_label: actionLabel,
      event_metadata: { surface: "install_banner", platform: getInstallPlatform(), ...metadata },
      created_at: new Date().toISOString(),
    });
  } catch {
    // Analytics only — never let logging break the banner.
  }
}

/** The install event should count once per device, whichever signal fires first. */
function claimInstallEventLog(): boolean {
  try {
    if (window.localStorage.getItem(INSTALL_EVENT_LOGGED_KEY) === "1") return false;
    window.localStorage.setItem(INSTALL_EVENT_LOGGED_KEY, "1");
    return true;
  } catch {
    return false;
  }
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
      if (claimInstallEventLog()) {
        void logInstallBannerEvent("install_banner_installed", "App detected as installed", { source: "standalone_launch" });
      }
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
    if (claimInstallEventLog()) {
      void logInstallBannerEvent("install_banner_installed", "App installed", { source: "appinstalled_event" });
    }
  }, [justInstalled]);

  if (!visible) return null;

  const markInstalled = () => {
    writeLocalInstallState("installed");
    setVisible(false);
    void writeInstallPromptColumns({ install_prompt_state: "installed" });
    if (claimInstallEventLog()) {
      void logInstallBannerEvent("install_banner_installed", "App installed", { source: "prompt_accepted" });
    }
  };

  const handleAdd = async () => {
    const env = getInstallEnvironment();
    void logInstallBannerEvent("install_banner_add_clicked", "Install banner Add tapped", {
      context: env.isInAppBrowser ? "in_app_blocked" : env.isIOS ? "ios_sheet" : promptEvent ? "native_prompt" : "no_prompt_available",
    });

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
    void logInstallBannerEvent("install_banner_never_clicked", "Install banner dismissed forever");
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
    void logInstallBannerEvent("install_banner_ios_sheet_closed", "iPhone install sheet closed");
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
