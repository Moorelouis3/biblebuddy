"use client";

import { useEffect, useState } from "react";

// App Store 5.1.2: tell people plainly that replies come from an AI and that
// what they type is sent to OpenAI, and get consent once before the first
// message. One consent covers every AI feature (Little Louis chat, GROW notes).

const AI_CONSENT_KEY = "bb:ai-consent-v1";

export function useAiConsent(): [boolean, () => void] {
  // Start as "consented" so server render and first paint match; the effect
  // flips it to false for people who have not agreed yet.
  const [consented, setConsented] = useState(true);
  useEffect(() => {
    let stored = false;
    try {
      stored = window.localStorage.getItem(AI_CONSENT_KEY) === "1";
    } catch {
      stored = false;
    }
    // Reading localStorage has to wait until after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsented(stored);
  }, []);
  const accept = () => {
    setConsented(true);
    try {
      window.localStorage.setItem(AI_CONSENT_KEY, "1");
    } catch {
      // consent still applies for this visit
    }
  };
  return [consented, accept];
}

export function AiConsentCard({ onAccept, featureName = "Little Louis" }: { onAccept: () => void; featureName?: string }) {
  return (
    <div className="rounded-2xl border border-[var(--bb-card-border,#dbe7f4)] bg-[var(--bb-card,#ffffff)] p-3 text-xs leading-relaxed text-[var(--bb-text-primary,#111827)]">
      <p className="font-bold">{featureName} uses AI</p>
      <p className="mt-1 text-[var(--bb-text-secondary,#4b5563)]">
        Replies come from an AI helper, not a real person, and can make mistakes. To reply, what you type is sent to
        OpenAI and saved to your Bible Buddy account. Please don&apos;t share private details like addresses or health
        information.{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
      </p>
      <button
        type="button"
        onClick={onAccept}
        className="mt-2 rounded-full bg-[var(--bb-button,var(--bb-accent,#2f7fe8))] px-4 py-2 text-xs font-black text-[var(--bb-button-text,#ffffff)] transition hover:brightness-95"
      >
        I understand, continue
      </button>
    </div>
  );
}
