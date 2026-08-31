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
 */
export default function ChatPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-28 pt-4">
      <Suspense fallback={null}>
        <ChatLouis displayMode="embedded" />
      </Suspense>
    </div>
  );
}
