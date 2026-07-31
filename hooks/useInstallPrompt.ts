"use client";

import { useEffect, useState } from "react";

// Chrome fires beforeinstallprompt once, very early — often before React
// hydrates — so the listeners live at module scope and run the moment this
// file is loaded. The hook just subscribes to what was captured.

export const INSTALL_PROMPT_STORAGE_KEY = "bb-install-prompt-state";

export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

let capturedPrompt: BeforeInstallPromptEvent | null = null;
let installedFired = false;
const subscribers = new Set<() => void>();

function notify() {
  subscribers.forEach((fn) => fn());
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    capturedPrompt = event as BeforeInstallPromptEvent;
    notify();
  });

  window.addEventListener("appinstalled", () => {
    installedFired = true;
    capturedPrompt = null;
    try {
      window.localStorage.setItem(INSTALL_PROMPT_STORAGE_KEY, "installed");
    } catch {
      // Storage can be unavailable (private mode); the standalone check still hides the banner.
    }
    notify();
  });
}

export function clearCapturedInstallPrompt() {
  capturedPrompt = null;
  notify();
}

export function useInstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [justInstalled, setJustInstalled] = useState(false);

  useEffect(() => {
    const sync = () => {
      setPromptEvent(capturedPrompt);
      setJustInstalled(installedFired);
    };
    sync();
    subscribers.add(sync);
    return () => {
      subscribers.delete(sync);
    };
  }, []);

  return { promptEvent, justInstalled };
}
