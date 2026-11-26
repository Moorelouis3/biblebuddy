"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { ChatLouis } from "../../components/ChatLouis";

/**
 * BB Chat as its own page, so the More menu has somewhere to send people.
 * It was only ever reachable embedded inside the old dashboard.
 *
 * Uses the same "embedded" mode that dashboard renders, which lays the chat
 * out inline rather than as the floating bubble.
 *
 * Wide since 2026-11-26, when the embedded chat got the look of the Games and
 * Bible menus from Louis's mock-up ("do lil louis screen better now").
 */
export default function ChatPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-3 pb-28 pt-3 sm:px-4">
      <Suspense fallback={null}>
        <ChatLouis displayMode="embedded" />
      </Suspense>
    </div>
  );
}
