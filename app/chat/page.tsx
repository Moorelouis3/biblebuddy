"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useRef, useState } from "react";
import { ChatLouis } from "../../components/ChatLouis";

/**
 * Lil Louis (BB Chat) as its own page: the Lil Louis tab.
 *
 * Laid out like a chat, since 2026-11-26: the chat fills exactly the space
 * between the app's top bar and the bottom tabs, so the page itself never
 * scrolls and the only thing that moves is the conversation. The first
 * restyle that day put the chat in a fixed-height box inside a page that
 * also scrolled, and Louis could "barely read one message".
 *
 * The height is measured, not guessed: the top bar grows with the phone's
 * safe area and the tab bar with its home indicator, so no fixed number is
 * right on every phone.
 */
export default function ChatPage() {
  const frame = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    function fit() {
      const el = frame.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const tabs = document.querySelector(".bb-bottom-pill");
      const tabsHeight = tabs ? tabs.getBoundingClientRect().height : 0;
      const viewport = window.visualViewport?.height ?? window.innerHeight;
      setHeight(Math.max(320, Math.round(viewport - top - tabsHeight - 6)));
    }
    fit();
    // The tab bar and the top bar can settle a moment after the page does.
    const later = [window.setTimeout(fit, 150), window.setTimeout(fit, 800)];
    window.addEventListener("resize", fit);
    window.visualViewport?.addEventListener("resize", fit);
    return () => {
      later.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("resize", fit);
      window.visualViewport?.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <div
      ref={frame}
      className="mx-auto flex w-full max-w-3xl flex-col px-3 pt-2 sm:px-4"
      style={{ height: height ?? "calc(100dvh - 140px)" }}
    >
      {/* The "Report a problem" strip under every page would make this one
          scroll, and so would the space the app leaves under every page for
          the tab bar. Both are switched off here, and only while this page is
          on screen: the style tag leaves with it. */}
      <style>{".bb-report-problem{display:none}html{overflow:hidden!important;overscroll-behavior:none}"}</style>
      <Suspense fallback={null}>
        <ChatLouis displayMode="embedded" fill />
      </Suspense>
    </div>
  );
}
