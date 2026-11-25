"use client";

/**
 * The Games tab menu, built from Louis's example (2026-11-25: "can u make the
 * game menu better", with a ChatGPT mock-up): a centred header with a gold
 * controller badge, then one dark glass row per game with a glossy icon, a
 * divider, the name and line, and a round button. The first game is the
 * featured one: gold edge, soft glow and a gold play button.
 *
 * Icons: until the painted icons arrive (docs/games-menu-icons-prompt.md,
 * saved as /games/menu/<key>.png), each tile is an emoji on the game's colour.
 * Set `icon` on a game once its file is in public/games/menu.
 */

import Link from "next/link";

type Game = { key: string; href: string; title: string; line: string; emoji: string; tile: string; icon?: string; badge?: string };

const GAMES: Game[] = [
  {
    key: "match",
    href: "/bible-study-games/match?from=games",
    title: "Bible Buddy Match",
    line: "Connect the tiles and walk through the Bible, board by board.",
    emoji: "💎",
    tile: "linear-gradient(145deg,#2f7bff 0%,#0b3db8 100%)",
    badge: "New",
  },
  {
    key: "trivia",
    href: "/bible-study-games/clue?from=games",
    title: "Bible Trivia",
    line: "Any book, any chapter. Play solo, with friends, or take a challenge.",
    emoji: "📜",
    tile: "linear-gradient(145deg,#2f8a55 0%,#0f4a2a 100%)",
  },
  {
    key: "memory",
    href: "/bible-study-games/memory",
    title: "Bible Memory",
    line: "Save a verse and learn it by heart, a few minutes at a time.",
    emoji: "🧠",
    tile: "linear-gradient(145deg,#8b4fd1 0%,#4a1f86 100%)",
  },
  {
    key: "word-search",
    href: "/bible-study-games/word-search",
    title: "Bible Word Search",
    line: "Find the people, places and themes of every book.",
    emoji: "🔎",
    tile: "linear-gradient(145deg,#2f5fa8 0%,#132d5c 100%)",
  },
];

const GOLD = "#e9b45a";

function ControllerBadge() {
  return (
    <span
      className="grid h-14 w-14 place-items-center rounded-2xl"
      style={{ background: "linear-gradient(160deg,#3a2614,#1c120a)", boxShadow: `inset 0 0 0 2px ${GOLD}, 0 0 18px rgba(233,180,90,.35)` }}
      aria-hidden="true"
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9h12a4 4 0 0 1 3.9 4.9l-.9 3.6a2.2 2.2 0 0 1-3.8.9L15 16H9l-2.2 2.4a2.2 2.2 0 0 1-3.8-.9l-.9-3.6A4 4 0 0 1 6 9z" />
        <path d="M8 11.5v3M6.5 13h3" />
        <circle cx="15.5" cy="12.3" r=".7" fill={GOLD} />
        <circle cx="17.3" cy="14" r=".7" fill={GOLD} />
      </svg>
    </span>
  );
}

function Row({ game, featured }: { game: Game; featured: boolean }) {
  return (
    <Link
      href={game.href}
      className="group flex items-center gap-3 rounded-2xl p-3 transition hover:-translate-y-0.5 sm:gap-4 sm:p-4"
      style={{
        background: featured ? "linear-gradient(180deg,rgba(64,40,20,.82),rgba(34,22,14,.86))" : "rgba(28,20,16,.72)",
        boxShadow: featured
          ? `inset 0 0 0 1.5px ${GOLD}, 0 0 24px rgba(233,180,90,.28), 0 10px 24px rgba(0,0,0,.35)`
          : "inset 0 0 0 1px rgba(233,180,90,.28), 0 8px 20px rgba(0,0,0,.3)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <span
        className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl text-[34px] sm:h-[72px] sm:w-[72px]"
        style={{ background: game.icon ? "transparent" : game.tile, boxShadow: "inset 0 1px 0 rgba(255,255,255,.35), 0 4px 12px rgba(0,0,0,.4)" }}
        aria-hidden="true"
      >
        {game.icon ? <img src={game.icon} alt="" className="h-full w-full object-cover" /> : game.emoji}
      </span>
      <span className="hidden h-12 w-px shrink-0 sm:block" style={{ background: "rgba(233,180,90,.35)" }} aria-hidden="true" />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-[19px] font-black leading-tight text-[#fbf3e4] sm:text-[22px]">{game.title}</span>
          {game.badge ? (
            <span className="rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide" style={{ background: "#f4c64e", color: "#2a1d05" }}>
              {game.badge}
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 block text-[13px] leading-snug text-[#e9dcc6] sm:text-[15px]">{game.line}</span>
      </span>
      {featured ? (
        <span
          className="grid h-11 w-14 shrink-0 place-items-center rounded-full"
          style={{ background: "linear-gradient(180deg,#f1c06a,#c9852e)", boxShadow: "0 0 14px rgba(233,180,90,.55), inset 0 1px 0 rgba(255,255,255,.5)" }}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
        </span>
      ) : (
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full transition group-hover:translate-x-0.5"
          style={{ background: "rgba(0,0,0,.35)", boxShadow: "inset 0 0 0 1px rgba(233,220,198,.45)" }}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbf3e4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </span>
      )}
    </Link>
  );
}

export default function GamesMenu() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-4 pb-28 pt-5 sm:gap-4">
      <header className="mb-1 flex flex-col items-center text-center">
        <span className="flex w-full items-center justify-center gap-4">
          <span className="h-px max-w-[220px] flex-1" style={{ background: `linear-gradient(90deg,transparent,${GOLD})` }} aria-hidden="true" />
          <ControllerBadge />
          <span className="h-px max-w-[220px] flex-1" style={{ background: `linear-gradient(90deg,${GOLD},transparent)` }} aria-hidden="true" />
        </span>
        <h1
          className="mt-2 text-[40px] font-black leading-none sm:text-[52px]"
          style={{ background: "linear-gradient(180deg,#fff6e3 0%,#f0c98a 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", textShadow: "0 2px 18px rgba(240,201,138,.25)" }}
        >
          Games
        </h1>
        <p className="mt-2 text-[14px] font-semibold text-[#e9dcc6] sm:text-[16px]" style={{ textShadow: "0 1px 6px rgba(0,0,0,.6)" }}>
          Test what you remember after reading and studying Scripture.
        </p>
      </header>
      {GAMES.map((g, i) => (
        <Row key={g.key} game={g} featured={i === 0} />
      ))}
    </div>
  );
}
