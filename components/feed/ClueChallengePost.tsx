"use client";

import Link from "next/link";

/**
 * A Bible Clue challenge on the Feed, drawn as a game card instead of a line
 * of text (Louis, 2026-11-22: "on the feed the challenge needs to look better,
 * stand out... like the study guides show"). The post itself stays the plain
 * text lib/clueGame/server.ts writes (challengePostText), so nothing about
 * storing or editing it changes; this only reads it:
 *
 *   🃏 {name} scored {score} in {selection} on the Bible Clue Game. Can you beat it?
 *   {n} Buddies have played it. {leader} leads with {score}.      (once others play)
 *   [Play the challenge](…/bible-study-games/clue/challenge/{id})
 */

export type ClueChallengeInfo = {
  id: string;
  name: string;
  score: number;
  selection: string;
  played: number;
  leader: string | null;
  leaderScore: number | null;
};

export function readClueChallenge(content: string | null | undefined): ClueChallengeInfo | null {
  if (!content) return null;
  const link = /\/bible-study-games\/clue\/challenge\/([A-Za-z0-9]{4,12})/.exec(content);
  const head = /(?:🃏\s*)?(.+?) scored (-?\d+) in (.+?) on the Bible Clue Game/.exec(content);
  if (!link || !head) return null;
  const board = /(\d+) Buddies have played it\. (.+?) leads with (-?\d+)\./.exec(content);
  return {
    id: link[1],
    name: head[1].trim(),
    score: Number(head[2]),
    selection: head[3].trim(),
    played: board ? Number(board[1]) : 1,
    leader: board ? board[2].trim() : null,
    leaderScore: board ? Number(board[3]) : null,
  };
}

export default function ClueChallengePost({ info }: { info: ClueChallengeInfo }) {
  const first = info.name.split(/\s+/)[0];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#d9a843] shadow-[0_10px_24px_-12px_rgba(60,30,5,0.55)]">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundImage: "url(/games/clue/scenes/genesis-beersheba-desktop.webp)", backgroundSize: "cover", backgroundPosition: "center 60%" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#1b0f05]/25 via-[#1b0f05]/35 to-[#1b0f05]/75" />
      <div className="relative p-4">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-[#1d5a37] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#fff3cf] shadow">
          <span aria-hidden>⚔️</span> Bible Clue Challenge
        </p>
        <div className="mt-3 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/games/clue/ui/icon-trophy.webp" alt="" className="h-14 w-14 flex-shrink-0 drop-shadow-lg" />
          <div className="min-w-0">
            <p className="font-serif text-[22px] font-black leading-tight text-white drop-shadow">
              {first} scored {info.score}
            </p>
            <p className="text-[15px] font-black text-[#f6d36b] drop-shadow">Can you beat it?</p>
          </div>
        </div>
        <p className="mt-2 text-[13px] font-semibold text-[#f3e6cc]">
          {info.selection} · the same 10 questions · 10 seconds each
        </p>
        {info.leader && info.played > 1 ? (
          <p className="mt-1 text-[13px] font-bold text-[#f3e6cc]">
            👑 {info.leader.split(/\s+/)[0]} leads with {info.leaderScore} · {info.played} Buddies have played
          </p>
        ) : null}
        <Link
          href={`/bible-study-games/clue/challenge/${info.id}`}
          className="mt-3 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full text-[16px] font-black text-[#fff7dd] shadow-[0_6px_14px_-6px_rgba(0,0,0,0.6)] transition active:scale-[0.98]"
          style={{ background: "linear-gradient(180deg, #34a35a, #1d6a34)", boxShadow: "inset 0 0 0 2px #f6d36b" }}
        >
          ▶ Play the challenge
        </Link>
      </div>
    </div>
  );
}
