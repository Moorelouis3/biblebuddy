"use client";

/**
 * "Invite friends" for a Bible Clue room (Louis, 2026-11-22: "the multiplayer
 * share the link should pop up with share link to SMS, WhatsApp, whatever we
 * can"). It pops up on its own when a host opens a room, and from the lobby
 * button after that.
 *
 * Every option sends the same invite link, https://www.mybiblebuddy.net/play/<CODE>,
 * tagged with how it was sent (?ch=sms ...). That page opens the room for
 * anyone signed in (inside the app when it is installed) and takes everyone
 * else through sign-up first (app/play/[code]/page.tsx). Each tap is counted
 * as clue_game_invite_shared for the Bible Clue analytics tab.
 */

import { useState } from "react";
import { shareContent } from "@/lib/nativeShare";
import { isNativeApp } from "@/lib/nativeApp";
import { trackClue } from "@/lib/clueGame/track";

type Channel = "sms" | "whatsapp" | "messenger" | "email" | "copy" | "more";

export const inviteLink = (code: string, ch: Channel) => `https://www.mybiblebuddy.net/play/${code}?ch=${ch}`;

const message = (code: string, ch: Channel) => `Play Bible Trivia with me! Ten questions, ten seconds each, fastest right answer wins. Join my room: ${inviteLink(code, ch)}`;

/** Leave the page for another app (text, WhatsApp, mail) without losing the room. */
function openOutside(url: string) {
  if (isNativeApp() || /^(sms|mailto|whatsapp|fb-messenger):/.test(url)) window.location.href = url;
  else window.open(url, "_blank", "noopener");
}

export default function InviteSheet({ code, onClose }: { code: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const isPhone = typeof navigator !== "undefined" && /iphone|ipad|android/i.test(navigator.userAgent);

  const go = async (ch: Channel) => {
    trackClue("clue_game_invite_shared", { room: code, channel: ch });
    const text = message(code, ch);
    if (ch === "sms") openOutside(`sms:?&body=${encodeURIComponent(text)}`);
    else if (ch === "whatsapp") openOutside(`https://wa.me/?text=${encodeURIComponent(text)}`);
    else if (ch === "messenger") openOutside(`fb-messenger://share/?link=${encodeURIComponent(inviteLink(code, ch))}`);
    else if (ch === "email") openOutside(`mailto:?subject=${encodeURIComponent("Play Bible Trivia with me")}&body=${encodeURIComponent(text)}`);
    else if (ch === "copy") {
      try {
        await navigator.clipboard.writeText(inviteLink(code, ch));
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        // Some webviews refuse the clipboard: the phone's own share menu always works.
        await shareContent({ title: "Bible Trivia", text: message(code, "more"), url: inviteLink(code, "more") });
      }
    } else await shareContent({ title: "Bible Trivia", text: message(code, ch), url: inviteLink(code, ch) });
  };

  const options: Array<{ ch: Channel; icon: string; label: string; show: boolean }> = [
    { ch: "sms", icon: "💬", label: "Text message", show: true },
    { ch: "whatsapp", icon: "🟢", label: "WhatsApp", show: true },
    { ch: "messenger", icon: "🔵", label: "Messenger", show: isPhone },
    { ch: "email", icon: "✉️", label: "Email", show: true },
    { ch: "more", icon: "📤", label: "More apps…", show: true },
    { ch: "copy", icon: "🔗", label: copied ? "Link copied!" : "Copy link", show: true },
  ];

  return (
    <div className="bb-invsheet-backdrop" role="dialog" aria-modal="true" aria-label="Invite friends" onClick={onClose}>
      <div className="bb-invsheet" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="bb-invsheet-x" aria-label="Close" onClick={onClose}>
          ✕
        </button>
        <h2>Invite friends</h2>
        <p className="bb-invsheet-sub">
          Room <b>{code}</b> · up to 4 players. They tap the link, sign up free if they are new, and land in your room.
        </p>
        <div className="bb-invsheet-grid">
          {options
            .filter((o) => o.show)
            .map((o) => (
              <button key={o.ch} type="button" className="bb-invsheet-opt" onClick={() => void go(o.ch)}>
                <span aria-hidden="true">{o.icon}</span>
                {o.label}
              </button>
            ))}
        </div>
        <p className="bb-invsheet-link">{inviteLink(code, "copy").replace("https://", "").replace("?ch=copy", "")}</p>
      </div>
      <style>{`
        .bb-invsheet-backdrop { position:fixed; inset:0; z-index:80; background: rgba(20,10,4,.55); display:flex; align-items:flex-end; justify-content:center; padding: 12px; }
        @media (min-width: 640px) { .bb-invsheet-backdrop { align-items:center; } }
        .bb-invsheet { position:relative; width: min(100%, 440px); padding: 24px 20px calc(18px + env(safe-area-inset-bottom)); text-align:center; color:#2a1a0c;
          background: url(/games/clue/ui/clue-panel.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 12px 24px rgba(0,0,0,.45)); animation: bb-invsheet-up .25s ease-out both; }
        @keyframes bb-invsheet-up { from { transform: translateY(30px); opacity:0; } to { transform:none; opacity:1; } }
        .bb-invsheet :is(h2, p, b, span) { color:#2a1a0c !important; }
        .bb-invsheet h2 { margin:0; font-family: Georgia, serif; font-weight:800; font-size: 26px; }
        .bb-invsheet-sub { margin: 6px 0 14px; font-size: 14px; font-weight:600; line-height:1.4; }
        .bb-invsheet-x { position:absolute; top:12px; right:16px; width:34px; height:34px; border-radius:999px; font-weight:900; color:#5a3a16; background: rgba(255,255,255,.6); }
        .bb-invsheet-grid { display:grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .bb-invsheet-opt { display:flex; align-items:center; justify-content:center; gap:6px; height: 52px; padding: 0 8px; white-space:nowrap; font-family: Georgia, serif; font-weight:800; font-size: clamp(13px, 3.8vw, 16px); color:#fff3cf !important;
          background: url(/games/clue/ui/green-pill.webp) center / 100% 100% no-repeat; text-shadow: 0 1px 2px rgba(0,0,0,.5); }
        .bb-invsheet-opt span { color: inherit !important; }
        .bb-invsheet-link { margin-top: 12px; font-size: 12px; font-weight:700; opacity:.6; word-break: break-all; }
      `}</style>
    </div>
  );
}
