"use client";

/**
 * The invite link for a Bible Clue room: https://www.mybiblebuddy.net/play/<CODE>
 * (Louis, 2026-11-22: "when people get it it should open the room if they
 * have the app or log in if not, they gotta sign up first - it's a free way
 * to get new people to join").
 *
 * - The phone apps claim every mybiblebuddy.net path (app/api/well-known), so
 *   on a phone with Bible Buddy installed this opens inside the app.
 * - Signed in: straight on to the room, which seats them.
 * - Not signed in: who invited them and to what, then sign up (or log in).
 *   Sign-up carries utm_source=clue_invite, so profile_stats records the new
 *   account as coming from an invite, and ?next= brings them back to the room.
 *
 * Public (lib/publicRoutes.ts): the person opening it usually has no account.
 * What it shows comes from roomInvite() in lib/clueGame/server.ts.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ClueRoomFrame } from "@/components/clueGame/ClueParts";
import { ALL_CLUE_CARDS } from "@/lib/clueGame/catalog";

type Invite = {
  code: string;
  found: boolean;
  hostName?: string;
  hostAvatar?: string | null;
  deckName?: string;
  players?: number;
  maxPlayers?: number;
  joinable?: boolean;
  reason?: "closed" | "started" | "full" | null;
};

const JOSEPH = ALL_CLUE_CARDS.get("joseph");

function logOpen(code: string, ch: string, userId: string | null) {
  try {
    void fetch(`${window.location.origin}/api/landing-analytics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "clue_game_invite_opened",
        user_id: userId,
        source: "clue_invite",
        page_path: window.location.pathname,
        referrer: document.referrer || null,
        metadata: { room: code, ch, signed_in: !!userId },
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // never block the page on analytics
  }
}

export default function PlayInvitePage() {
  const params = useParams<{ code: string }>();
  const router = useRouter();
  const code = String(params?.code || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
  const [invite, setInvite] = useState<Invite | null>(null);
  const [signedOut, setSignedOut] = useState(false);
  const roomPath = `/bible-study-games/clue/room/${code}`;

  useEffect(() => {
    const ch = new URLSearchParams(window.location.search).get("ch") || "unknown";
    void (async () => {
      const { data } = await supabase.auth.getSession();
      const userId = data.session?.user?.id ?? null;
      logOpen(code, ch, userId);
      if (userId) {
        router.replace(roomPath);
        return;
      }
      setSignedOut(true);
      const res = await fetch(`${window.location.origin}/api/clue-game/invite/${code}`, { cache: "no-store" }).catch(() => null);
      setInvite(res && res.ok ? ((await res.json()) as Invite) : { code, found: false });
    })();
  }, [code, roomPath, router]);

  const ch = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("ch") || "unknown" : "unknown";
  const signupHref = `/signup?utm_source=clue_invite&utm_medium=${encodeURIComponent(ch)}&utm_campaign=room&next=${encodeURIComponent(roomPath)}`;
  const loginHref = `/login?next=${encodeURIComponent(roomPath)}`;
  // A closed or started room still gets them in: the game itself is there to play.
  const fallbackNext = "/bible-study-games/clue";
  const signupFallback = `/signup?utm_source=clue_invite&utm_medium=${encodeURIComponent(ch)}&utm_campaign=room_closed&next=${encodeURIComponent(fallbackNext)}`;

  return (
    <ClueRoomFrame>
      <div className="bb-invite">
        <div className="bb-cb-scene" style={{ ["--scene-phone" as string]: "url(/games/clue/scenes/genesis-beersheba-phone.webp)", ["--scene-desktop" as string]: "url(/games/clue/scenes/genesis-beersheba-desktop.webp)" } as React.CSSProperties} aria-hidden="true" />
        {!signedOut || !invite ? (
          <p className="bb-invite-wait">Opening the invite…</p>
        ) : (
          <>
            <div className="bb-invite-title">
              <h1>Bible Clue</h1>
              <p>Follow the clues. Guess the answer.</p>
            </div>

            <div className="bb-invite-cards" aria-hidden="true">
              <span className="bb-invite-card is-left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={JOSEPH?.art.mystery} alt="" />
              </span>
              <span className="bb-invite-card is-right">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={JOSEPH?.art.reveal} alt="" />
              </span>
            </div>

            <div className="bb-invite-panel">
              {invite.found && invite.joinable ? (
                <>
                  <div className="bb-invite-host">
                    <span className="bb-cb-ring" style={{ width: 58, height: 58 }}>
                      <span className="bb-cb-ring-photo" style={{ fontSize: 20 }}>
                        {invite.hostAvatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={invite.hostAvatar} alt="" />
                        ) : (
                          (invite.hostName || "?")[0]
                        )}
                      </span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="bb-cb-ring-frame" src="/games/clue/ui/player-ring.webp" alt="" />
                    </span>
                    <p>
                      <b>{invite.hostName}</b> invited you to play
                    </p>
                  </div>
                  <p className="bb-invite-meta">
                    {invite.deckName} deck · {invite.players} of {invite.maxPlayers} seats taken · room {invite.code}
                  </p>
                  <Link href={signupHref} className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big">
                    Sign up free to play
                  </Link>
                  <Link href={loginHref} className="bb-invite-login">
                    I already have an account · Log in
                  </Link>
                </>
              ) : (
                <>
                  <p className="bb-invite-closed">
                    {invite.reason === "started"
                      ? "That game has already started."
                      : invite.reason === "full"
                        ? "That room is full."
                        : "That room has closed."}{" "}
                    You can still play Bible Clue on your own or start your own room.
                  </p>
                  <Link href={signupFallback} className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big">
                    Sign up free to play
                  </Link>
                  <Link href={`/login?next=${encodeURIComponent(fallbackNext)}`} className="bb-invite-login">
                    I already have an account · Log in
                  </Link>
                </>
              )}
              <p className="bb-invite-free">Bible Buddy is free. Bible study, made easier.</p>
            </div>
          </>
        )}
      </div>
      <style>{`
        .bb-invite { position:relative; min-height:100dvh; display:flex; flex-direction:column; align-items:center; padding: calc(28px + env(safe-area-inset-top)) 16px 32px; text-align:center; }
        .bb-invite-wait { margin-top: 30vh; font-weight:800; color:#3b2412; background: rgba(255,248,232,.9); padding: 8px 16px; border-radius:999px; }
        .bb-invite-title h1 { margin:0; font-family: Georgia, serif; font-weight:800; font-size: clamp(44px, 13vw, 72px); line-height:1; color:#f8de96 !important;
          text-shadow: 0 1px 0 #fff4cf, 0 3px 0 #8a5518, 0 5px 0 #4e2c0c, 0 10px 18px rgba(0,0,0,.55); }
        .bb-invite-title p { margin: 8px 0 0; font-family: Georgia, serif; font-style: italic; font-weight:700; font-size: clamp(16px, 4.6vw, 22px); color:#fff3d2 !important; text-shadow: 0 2px 6px rgba(0,0,0,.8); }
        .bb-invite-cards { display:flex; justify-content:center; gap: 6%; width: min(100%, 420px); margin-top: 18px; }
        .bb-invite-card { width: 38%; aspect-ratio: 5/7; padding: 8%; display:flex; align-items:center; justify-content:center; background: url(/games/clue/ui/mystery-card.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 12px 18px rgba(0,0,0,.4)); }
        .bb-invite-card img { width:100%; height:100%; object-fit:contain; transform: scale(1.3); }
        .bb-invite-card.is-left { transform: rotate(-6deg); }
        .bb-invite-card.is-right { transform: rotate(5deg); }
        .bb-invite-panel { width: min(100%, 440px); margin-top: 22px; padding: 22px 20px 18px; display:flex; flex-direction:column; gap: 12px; align-items:stretch; color:#2a1a0c;
          background: url(/games/clue/ui/clue-panel.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 10px 18px rgba(0,0,0,.35)); }
        .bb-invite-panel :is(p, b) { color:#2a1a0c !important; }
        .bb-invite-host { display:flex; align-items:center; justify-content:center; gap: 12px; font-family: Georgia, serif; font-size: 20px; }
        .bb-invite-meta { font-size: 13px; font-weight:700; opacity:.75; }
        .bb-invite-closed { font-family: Georgia, serif; font-weight:700; font-size: 17px; line-height:1.35; }
        .bb-invite-login { font-weight:800; color:#1d5a34 !important; text-decoration: underline; text-underline-offset: 3px; }
        .bb-invite-free { font-size: 12px; font-weight:700; opacity:.65; }
      `}</style>
    </ClueRoomFrame>
  );
}
