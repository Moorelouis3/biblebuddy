"use client";

/**
 * A private Bible Clue Game room: lobby, the shared table, final standings.
 *
 * The server owns the game (lib/clueGame/server.ts). This screen only shows
 * what the server sends (never an answer before its reveal) and sends what
 * the player does. It refreshes when the server pings the room's Realtime
 * channel, when a local timer reaches a clue or deal boundary, and every few
 * seconds as a fallback, so a dropped ping or a reconnect recovers the table.
 * The share link is /bible-study-games/clue/room/<CODE>: signed-out players
 * are sent through sign-up and back (proxy.ts keeps ?next=).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { PublicCard, PublicMatch } from "@/lib/clueGame/engine";
import type { ClueRef } from "@/lib/clueGame/types";
import { clueApi, trackClue } from "@/lib/clueGame/track";
import { shareContent } from "@/lib/nativeShare";
import { supabase } from "@/lib/supabaseClient";
import ClueTable from "./ClueTable";
import ClueResults, { ReviewList } from "./ClueResults";
import { Avatar, ClueHeader, ClueRoomFrame, ScriptureSheet, StudyCard } from "./ClueParts";

type RoomView = {
  code: string;
  hostId: string;
  status: "lobby" | "playing" | "over" | "closed";
  deckIds: string[];
  deckName: string;
  you: string;
  players: Array<{ id: string; name: string; avatar: string | null }>;
  match: PublicMatch | null;
  error?: string;
};

export default function ClueRoom({ code }: { code: string }) {
  const [room, setRoom] = useState<RoomView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [study, setStudy] = useState<PublicCard | null>(null);
  const [scripture, setScripture] = useState<ClueRef | null>(null);
  const [review, setReview] = useState(false);
  const [flash, setFlash] = useState<{ text: string; key: number } | null>(null);
  const [shared, setShared] = useState(false);
  const inflight = useRef(false);

  const apply = useCallback((data: RoomView, sentAt: number) => {
    if (data.match?.serverNow) setOffset(data.match.serverNow - (sentAt + Date.now()) / 2);
    setRoom(data);
  }, []);

  const refresh = useCallback(async () => {
    if (inflight.current) return;
    inflight.current = true;
    const sentAt = Date.now();
    const res = await clueApi<RoomView>(`/api/clue-game/rooms/${code}`);
    inflight.current = false;
    if (res.ok) apply(res.data, sentAt);
    else if (res.status === 403) {
      const joined = await clueApi<RoomView>(`/api/clue-game/rooms/${code}`, { method: "POST", body: { op: "join" } });
      if (joined.ok) apply(joined.data, sentAt);
      else setError(joined.data.error || "Could not join this room.");
    } else setError(res.data.error || "This room has closed or the code is wrong.");
  }, [code, apply]);

  const send = useCallback(
    async (op: string, text?: string) => {
      const sentAt = Date.now();
      const res = await clueApi<RoomView>(`/api/clue-game/rooms/${code}`, { method: "POST", body: { op, text } });
      if (res.ok) apply(res.data, sentAt);
      else setFlash({ text: res.data.error || "That didn’t go through.", key: Date.now() });
    },
    [code, apply],
  );

  // Join on arrival (a link or a typed code both land here), then load.
  useEffect(() => {
    void (async () => {
      const sentAt = Date.now();
      const res = await clueApi<RoomView>(`/api/clue-game/rooms/${code}`, { method: "POST", body: { op: "join" } });
      if (res.ok) {
        apply(res.data, sentAt);
        trackClue("clue_game_room_joined", { room: code });
      } else setError(res.data.error || "Could not join this room.");
    })();
  }, [code, apply]);

  // Realtime pings, plus a slow fallback poll while the room is open.
  useEffect(() => {
    const channel = supabase
      .channel(`clue-room-${code}`)
      .on("broadcast", { event: "changed" }, () => void refresh())
      .subscribe();
    const poll = window.setInterval(() => void refresh(), 4000);
    return () => {
      window.clearInterval(poll);
      void supabase.removeChannel(channel);
    };
  }, [code, refresh]);

  // The local clock, corrected to the server's. At a clue or deal boundary,
  // ask the server (it moves the game on; nobody's device decides).
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now() + offset), 150);
    return () => window.clearInterval(id);
  }, [offset]);
  const m = room?.match;
  const boundary =
    m && m.round && m.pausedAt === null
      ? m.phase === "clue"
        ? m.round.clueStartedAt + m.settings.clueSeconds * 1000
        : m.phase === "reveal" && m.round.revealedAt
          ? m.round.revealedAt + m.settings.revealSeconds * 1000
          : null
      : null;
  const due = boundary !== null && now >= boundary + 150;
  useEffect(() => {
    if (!due) return;
    const id = window.setTimeout(() => void refresh(), 0);
    return () => window.clearTimeout(id);
  }, [due, refresh]);

  // "Not it" feedback for my own wrong guesses.
  const seenWrong = useRef(0);
  useEffect(() => {
    const mine = (m?.recentWrong || []).filter((w) => w.playerId === room?.you && w.at > seenWrong.current);
    const last = mine[mine.length - 1];
    if (last) {
      seenWrong.current = last.at;
      setFlash({ text: `“${last.guess}” isn’t it. −${last.points}`, key: last.at });
    }
  }, [m?.recentWrong, room?.you]);
  useEffect(() => {
    if (!flash) return;
    const id = window.setTimeout(() => setFlash(null), 2200);
    return () => window.clearTimeout(id);
  }, [flash]);

  const shareUrl = `https://www.mybiblebuddy.net/bible-study-games/clue/room/${code}`;
  const share = async () => {
    await shareContent({ title: "Bible Clue Game", text: `Play the Bible Clue Game with me! Room code ${code}`, url: shareUrl });
    setShared(true);
  };
  const openStudy = (card: PublicCard) => {
    setStudy(card);
    trackClue("clue_game_study_opened", { mode: "room", card: card.id });
  };

  const isHost = room ? room.hostId === room.you : false;
  return (
    <ClueRoomFrame>
      <div className="pb-28">
        <ClueHeader backHref="/bible-study-games/clue" subtitle={room?.deckName || "Genesis"} badge={room?.status === "lobby" ? "Room" : undefined} />
        {error ? (
          <div className="bb-clue-panel bb-clue-parchment text-center">
            <p className="bb-clue-serif text-xl font-bold">{error}</p>
            <Link href="/bible-study-games/clue" className="bb-clue-btn bb-clue-btn-green mt-4 w-full">Back to the game</Link>
          </div>
        ) : !room ? (
          <p className="mt-10 text-center font-bold" style={{ color: "#fff1c9" }}>Opening the room…</p>
        ) : room.status === "lobby" || !m ? (
          <div className="bb-clue-panel bb-clue-parchment text-center">
            <p className="text-[13px] font-black uppercase tracking-[0.14em] opacity-70">Room code</p>
            <p className="bb-clue-code">{code}</p>
            <div className="mt-3 flex gap-2">
              <button type="button" className="bb-clue-btn bb-clue-btn-green flex-1" onClick={share}>🔗 Share Link</button>
              <button
                type="button"
                className="bb-clue-btn flex-1"
                onClick={() => {
                  void navigator.clipboard?.writeText(shareUrl).catch(() => {});
                  setFlash({ text: "Link copied", key: Date.now() });
                }}
              >
                Copy
              </button>
            </div>
            {shared ? <p className="mt-2 text-[13px] font-bold">Send it by DM, text, or read the code aloud.</p> : null}
            <h3 className="bb-clue-serif mt-5 text-lg font-bold">Players ({room.players.length})</h3>
            <ul className="mt-2 flex flex-wrap justify-center gap-4">
              {room.players.map((p) => (
                <li key={p.id} className="flex w-20 flex-col items-center gap-1">
                  <Avatar name={p.name} src={p.avatar} size={52} />
                  <span className="w-full truncate text-[13px] font-bold">{p.id === room.you ? "You" : p.name}</span>
                  {p.id === room.hostId ? <span className="text-[10px] font-black uppercase opacity-60">Host</span> : null}
                </li>
              ))}
            </ul>
            {isHost ? (
              <button type="button" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big mt-5" onClick={() => void send("start")}>
                ▶ Start Game{room.players.length < 2 ? " (or wait for friends)" : ""}
              </button>
            ) : (
              <p className="bb-clue-serif mt-5 text-lg italic">Waiting for the host to start…</p>
            )}
          </div>
        ) : m.phase !== "over" ? (
          <ClueTable
            view={m}
            players={room.players}
            youId={room.you}
            now={now}
            cardBack="/games/clue/genesis/art/card-back.webp"
            onGuess={(text) => void send("guess", text)}
            onWait={() => void send("wait")}
            onStudy={openStudy}
            isHost={isHost}
            onPause={() => void send("pause")}
            onResume={() => void send("resume")}
          />
        ) : review ? (
          <div className="bb-clue-panel bb-clue-parchment">
            <h2 className="bb-clue-serif bb-clue-title" style={{ color: "#2a1a0c" }}>Review Cards</h2>
            <div className="mt-4"><ReviewList cards={m.history} onStudy={openStudy} /></div>
            <button type="button" className="bb-clue-btn mt-5 w-full" onClick={() => setReview(false)}>Back to results</button>
          </div>
        ) : (
          <ClueResults
            mode="room"
            heading={m.winnerSideIds.includes(room.you) ? (m.winnerSideIds.length > 1 ? "A Tie!" : "You Win!") : "Game Over"}
            deckName={room.deckName}
            score={m.scores[room.you] ?? 0}
            won={(m.piles[room.you] || []).length}
            total={m.deckSize}
            wonCards={m.history.filter((c) => c.outcome === "won" && c.sideId === room.you)}
            onReview={() => setReview(true)}
            standings={
              <ol className="space-y-2 text-left">
                {[...room.players]
                  .sort((a, b) => (m.scores[b.id] ?? 0) - (m.scores[a.id] ?? 0))
                  .map((p, i) => (
                    <li key={p.id} className="flex items-center gap-3 rounded-2xl px-3 py-2" style={{ background: m.winnerSideIds.includes(p.id) ? "#f6e7c1" : "rgba(255,255,255,.4)" }}>
                      <span className="w-5 text-center font-black">{i + 1}</span>
                      <Avatar name={p.name} src={p.avatar} size={36} />
                      <span className="min-w-0 flex-1 truncate font-bold">{p.id === room.you ? "You" : p.name}</span>
                      <span className="font-black">⭐ {m.scores[p.id] ?? 0}</span>
                      <span className="bb-clue-pilecount">{m.piles[p.id]?.length ?? 0}</span>
                    </li>
                  ))}
              </ol>
            }
            secondary={<Link href="/bible-study-games/clue" className="bb-clue-btn bb-clue-btn-green bb-clue-btn-big">Back to the game</Link>}
          />
        )}
      </div>
      {flash ? <div key={flash.key} className="bb-clue-flash is-wrong" role="status">{flash.text}</div> : null}
      {study ? <StudyCard card={study} onClose={() => setStudy(null)} onOpenRef={setScripture} /> : null}
      {scripture ? <ScriptureSheet target={scripture} onClose={() => setScripture(null)} /> : null}
    </ClueRoomFrame>
  );
}
