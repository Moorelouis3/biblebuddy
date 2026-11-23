"use client";

import Link from "next/link";

/**
 * A Bible Trivia challenge on the Feed (the game was called Bible Clue until
 * 2026-11-23), drawn as a game card instead of a line of text (Louis,
 * 2026-11-22: "on the feed the challenge needs to look better, stand out...
 * like the study guides show"). The post itself stays the plain text
 * lib/clueGame/server.ts writes, so nothing about storing or editing it
 * changes; this only reads it. Two shapes:
 *
 * The challenge (challengePostText):
 *   🃏 {name} scored {score} in {selection} on Bible Trivia. Can you beat it?
 *      ("on the Bible Clue Game" before 2026-11-23)
 *   {n} Buddies have played it. {leader} leads with {score}.      (once others play)
 *   [Play the challenge](…/bible-study-games/clue/challenge/{id})
 *
 * The chain letter (chainPostText, 2026-11-23), one per person who took it:
 *   🔗 {name} took {from}’s Bible Trivia challenge on {selection} and got {won}/{total} right ({score} points). …
 *   The chain: A → B → C
 *   [Take the challenge](…/bible-study-games/clue/challenge/{id}?from={userId})
 */

export type ClueChallengeInfo = {
  id: string;
  name: string;
  score: number;
  selection: string;
  played: number;
  leader: string | null;
  leaderScore: number | null;
  /** Chain posts only. */
  chain?: { from: string; won: number; total: number; names: string[]; fromId: string | null };
};

export function readClueChallenge(content: string | null | undefined): ClueChallengeInfo | null {
  if (!content) return null;
  const link = /\/bible-study-games\/clue\/challenge\/([A-Za-z0-9]{4,12})/.exec(content);
  if (!link) return null;
  const took = /(?:🔗\s*)?(.+?) took (.+?)’s Bible Trivia challenge on (.+?) and got (\d+)\/(\d+) right \((-?\d+) points?\)/.exec(content);
  if (took) {
    const chain = /The chain: (.+)/.exec(content);
    const fromId = /\?from=([0-9a-fA-F-]{36})/.exec(content);
    return {
      id: link[1],
      name: took[1].trim(),
      score: Number(took[6]),
      selection: took[3].trim(),
      played: 1,
      leader: null,
      leaderScore: null,
      chain: {
        from: took[2].trim(),
        won: Number(took[4]),
        total: Number(took[5]),
        names: chain ? chain[1].split("→").map((n) => n.trim()).filter(Boolean) : [],
        fromId: fromId ? fromId[1] : null,
      },
    };
  }
  const head = /(?:🃏\s*)?(.+?) scored (-?\d+) in (.+?) on (?:the )?Bible (?:Clue Game|Trivia)/.exec(content);
  if (!head) return null;
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
  const ch = info.chain;
  const perfect = !!ch && ch.won >= ch.total;
  // Playing from someone's chain post takes THEIR challenge (?from=).
  const href = `/bible-study-games/clue/challenge/${info.id}${ch?.fromId ? `?from=${ch.fromId}` : ""}`;
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
          <span aria-hidden>{ch ? "🔗" : "⚔️"}</span> {ch ? "Bible Trivia Chain" : "Bible Trivia Challenge"}
        </p>
        <div className="mt-3 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/games/clue/ui/icon-trophy.webp" alt="" className="h-14 w-14 flex-shrink-0 drop-shadow-lg" />
          <div className="min-w-0">
            <p className="font-serif text-[22px] font-black leading-tight text-white drop-shadow">
              {ch ? (perfect ? `${first} got a perfect ${ch.won}/${ch.total}!` : `${first} got ${ch.won}/${ch.total} right`) : `${first} scored ${info.score.toLocaleString()}`}
            </p>
            {ch ? <p className="text-[13px] font-bold text-[#f3e6cc] drop-shadow">took {ch.from}’s challenge</p> : null}
            <p className="text-[15px] font-black text-[#f6d36b] drop-shadow">{perfect ? "Can you get a perfect one too?" : "Can you beat it?"}</p>
          </div>
        </div>
        <p className="mt-2 text-[13px] font-semibold text-[#f3e6cc]">
          {info.selection} · the same {ch?.total ?? 10} questions · 10 seconds each
        </p>
        {ch && ch.names.length > 1 ? <p className="mt-1 text-[13px] font-bold text-[#f3e6cc]">🔗 {ch.names.join(" → ")}</p> : null}
        {info.leader && info.played > 1 ? (
          <p className="mt-1 text-[13px] font-bold text-[#f3e6cc]">
            👑 {info.leader.split(/\s+/)[0]} leads with {info.leaderScore?.toLocaleString()} · {info.played} Buddies have played
          </p>
        ) : null}
        <Link
          href={href}
          className="mt-3 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full text-[16px] font-black text-[#fff7dd] shadow-[0_6px_14px_-6px_rgba(0,0,0,0.6)] transition active:scale-[0.98]"
          style={{ background: "linear-gradient(180deg, #34a35a, #1d6a34)", boxShadow: "inset 0 0 0 2px #f6d36b" }}
        >
          ▶ {ch ? "Take the challenge" : "Play the challenge"}
        </Link>
      </div>
    </div>
  );
}
