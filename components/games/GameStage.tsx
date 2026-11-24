"use client";

/**
 * The game look shared by Bible Word Search and Bible Memory (2026-11-24).
 *
 * Louis, 2026-11-24: "I want to make those better so that they all on the same
 * level as the trivia and the Bible matching game." So these two now play the
 * way those two do: full screen over a painted scene from the book being
 * played (lib/games/bookScene.ts), a gold plaque for the title, a parchment
 * panel, green and cream buttons, a 3-2-1 start, sounds, and the same ending
 * (stars, the score counting up, confetti).
 *
 * The art is the Bible Buddy Match and Bible Trivia art already in public/,
 * so nothing new had to be painted. The sounds are the Match ones
 * (lib/match/sound.ts), muted by the same device switch as every game.
 */

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { fireConfettiBurst, prefersReducedMotion } from "@/lib/celebration";
import type { BookScene } from "@/lib/games/bookScene";
import { matchSound } from "@/lib/match/sound";

const SOUND_KEY = "bb:clue-sound";

export function soundIsOn(): boolean {
  try {
    return window.localStorage.getItem(SOUND_KEY) !== "off";
  } catch {
    return true;
  }
}

/**
 * The whole screen is the game: the app's bottom menu, top bar and Report a
 * Problem step aside, as they do for Trivia and Match.
 */
export function GameStage({ scene, children, dim = 0.38 }: { scene: BookScene; children: ReactNode; dim?: number }) {
  useLayoutEffect(() => {
    const html = document.documentElement;
    html.classList.add("bb-game-screen");
    return () => html.classList.remove("bb-game-screen");
  }, []);
  return (
    <div className="bbg-stage" style={{ "--bbg-dim": String(dim) } as CSSProperties}>
      <style>{GAME_CSS}</style>
      <picture className="bbg-scene" aria-hidden="true">
        <source media="(min-aspect-ratio: 4/5)" srcSet={scene.desktop} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={scene.phone} alt="" />
      </picture>
      <div className="bbg-scroll">{children}</div>
    </div>
  );
}

/** Round back button, the gold title plaque, and the sound switch. */
export function GameTopBar({ title, sub, back, onBack }: { title: string; sub?: string; back?: string; onBack?: () => void }) {
  const backIcon = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/games/clue/ui/icon-back.webp" alt="" />
  );
  return (
    <header className="bbg-top">
      {onBack ? (
        <button type="button" className="bbg-round" aria-label="Back" onClick={onBack}>
          {backIcon}
        </button>
      ) : (
        <Link href={back || "/bible-study-games"} className="bbg-round" aria-label="Back">
          {backIcon}
        </Link>
      )}
      <div className="bbg-plaque">
        <span className="bbg-plaque-title">{title}</span>
        {sub ? <span className="bbg-plaque-sub">{sub}</span> : null}
      </div>
      <SoundButton />
    </header>
  );
}

export function SoundButton() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => setOn(soundIsOn()), 0);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <button
      type="button"
      className="bbg-round"
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      aria-pressed={on}
      onClick={() => {
        const next = !on;
        setOn(next);
        try {
          window.localStorage.setItem(SOUND_KEY, next ? "on" : "off");
        } catch {
          // The switch still works for this visit.
        }
        if (next) matchSound.step();
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/games/clue/ui/icon-sound.webp" alt="" className={on ? "" : "is-off"} />
    </button>
  );
}

/** The score bar: three readings on the Match goal bar. */
export function GameHud({ items }: { items: Array<{ label: string; value: ReactNode; bump?: number }> }) {
  return (
    <div className="bbg-hud" role="status">
      {items.map((item) => (
        <div key={item.label} className="bbg-hud-item">
          <span className="bbg-hud-label">{item.label}</span>
          <span key={item.bump ?? 0} className={`bbg-hud-value${item.bump ? " is-bump" : ""}`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/** "3, 2, 1, Go!" before a timed game, like Bible Trivia. */
export function Countdown({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(3);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  }, [onDone]);
  useEffect(() => {
    if (prefersReducedMotion()) {
      done.current();
      return;
    }
    matchSound.step();
    const id = window.setInterval(() => {
      setN((value) => {
        const next = value - 1;
        if (next > 0) matchSound.step();
        else if (next === 0) matchSound.power();
        else {
          window.clearInterval(id);
          window.setTimeout(() => done.current(), 0);
        }
        return next;
      });
    }, 700);
    return () => window.clearInterval(id);
  }, []);
  if (n < 0) return null;
  return (
    <div className="bbg-countdown" aria-live="assertive">
      <span key={n}>{n > 0 ? n : "Go!"}</span>
    </div>
  );
}

/** A "+150" that floats up from where the points were won. */
export function FloatPoints({ text, id }: { text: string; id: number }) {
  return (
    <span key={id} className="bbg-float" aria-hidden="true">
      {text}
    </span>
  );
}

/**
 * The ending, the same as Bible Trivia's: 1 to 3 stars, the score counting
 * up, confetti for a good game. `children` are the buttons and anything else.
 */
export function GameResults({
  heading,
  name,
  stars,
  score,
  lines,
  children,
}: {
  heading: string;
  name: string;
  stars: number;
  score: number;
  lines?: ReactNode;
  children?: ReactNode;
}) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (stars > 0) matchSound.win();
    else matchSound.lose();
    const stop =
      stars >= 2
        ? fireConfettiBurst({ durationMs: 1800, origins: 2, peakParticleCount: stars === 3 ? 90 : 55, colors: ["#f6d36b", "#fff3cf", "#34a35a", "#0056FD", "#e8743b"] })
        : () => {};
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1100);
      setShown(Math.round(score * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      stop();
      cancelAnimationFrame(raf);
    };
    // Once, when the results appear.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bbg-parch bbg-results">
      <h2 className="bbg-serif bbg-results-heading">{heading}</h2>
      <span className="bbg-name-pill">{name}</span>
      <div className="bbg-stars" aria-label={`${stars} of 3 stars`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={i < stars ? "is-on" : ""} style={{ animationDelay: `${0.25 + i * 0.28}s` }}>
            ★
          </span>
        ))}
      </div>
      <div className="mt-3 flex justify-center">
        <span className="bbg-points">⭐ {shown.toLocaleString()} points</span>
      </div>
      {lines ? <div className="bbg-serif mt-3 text-[18px] font-bold">{lines}</div> : null}
      {children ? <div className="mt-5 flex flex-col gap-3">{children}</div> : null}
    </div>
  );
}

export const GAME_CSS = `
html.bb-game-screen :is(.bb-bottom-pill, .bb-safe-top-header, .bb-report-problem, section[aria-labelledby="home-bible-lock-heading"]) { display:none !important; }
html.bb-native.bb-game-screen body { padding-top: 0 !important; }
html.bb-native.bb-game-screen body::before { display:none !important; }
.bbg-stage { position:fixed; inset:0; z-index:60; background:#1d1209; color:#3b2412; isolation:isolate; }
.bbg-scene { position:absolute; inset:0; z-index:-2; }
.bbg-scene img { width:100%; height:100%; object-fit:cover; }
.bbg-stage::before { content:""; position:absolute; inset:0; z-index:-1; pointer-events:none;
  background: linear-gradient(180deg, rgba(20,12,4,calc(var(--bbg-dim) + .15)) 0%, rgba(20,12,4,var(--bbg-dim)) 30%, rgba(20,12,4,calc(var(--bbg-dim) + .1)) 100%); }
.bbg-scroll { position:absolute; inset:0; overflow-y:auto; overflow-x:hidden; -webkit-overflow-scrolling:touch;
  padding: calc(8px + env(safe-area-inset-top)) 12px calc(28px + env(safe-area-inset-bottom)); }
.bbg-col { width:100%; max-width:34rem; margin:0 auto; display:flex; flex-direction:column; gap:12px; }
.bbg-serif { font-family: Georgia, "Times New Roman", serif; }

.bbg-top { display:flex; align-items:center; gap:8px; width:100%; max-width:34rem; margin:0 auto 4px; }
.bbg-round { flex:none; width:46px; height:46px; display:grid; place-items:center; border-radius:999px; cursor:pointer;
  background: radial-gradient(circle at 35% 30%, #fff7df, #e9cf94 70%, #b98a3c); border:2px solid #8a5a12; box-shadow: 0 3px 0 #5c3a0c, 0 6px 14px rgba(0,0,0,.35); }
.bbg-round img { width:26px; height:26px; object-fit:contain; }
.bbg-round img.is-off { opacity:.35; filter:grayscale(1); }
.bbg-round:active { transform: translateY(2px); box-shadow: 0 1px 0 #5c3a0c; }
.bbg-plaque { flex:1; min-width:0; min-height:60px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding: 6px 16% 8px;
  background: url(/games/match/ui/board-title-plaque.webp) center / 100% 100% no-repeat; text-align:center; filter: drop-shadow(0 6px 10px rgba(0,0,0,.4)); }
.bbg-plaque-title { font-family: Georgia, serif; font-weight:900; color:#3b2412; font-size: clamp(15px, 4.6vw, 21px); line-height:1.05; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:100%;
  text-shadow: 0 1px 0 rgba(255,240,200,.7); }
.bbg-plaque-sub { font-family: Georgia, serif; font-weight:700; color:#5b3a16; font-size:11px; letter-spacing:.08em; text-transform:uppercase; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%; }

.bbg-hud { display:flex; align-items:center; justify-content:space-around; aspect-ratio: 900 / 165; padding: 0 9%;
  background: url(/games/match/ui/goal-bar.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 6px 10px rgba(0,0,0,.35)); }
.bbg-hud-item { display:flex; flex-direction:column; align-items:center; line-height:1; min-width:0; }
.bbg-hud-label { font-size: clamp(9px, 2.6vw, 11px); font-weight:900; letter-spacing:.1em; text-transform:uppercase; color:#7a5320; }
.bbg-hud-value { margin-top:3px; font-family: Georgia, serif; font-weight:900; font-size: clamp(16px, 5vw, 22px); color:#2a1a0c; font-variant-numeric: tabular-nums; white-space:nowrap; }
.bbg-hud-value.is-bump { animation: bbg-bump .45s ease-out; }

.bbg-parch { position:relative; padding:8px; color:#3b2412;
  border: 20px solid transparent; border-image: url(/games/clue/ui/parchment.webp) 70 fill / 20px stretch;
  filter: drop-shadow(0 14px 24px rgba(0,0,0,.45)); }
html[data-bb-cover] .bbg-parch, html[data-bb-cover] .bbg-parch :is(p,li,h2,h3,span:not(.bbg-points):not(.bbg-name-pill):not(.bbg-btn-label)) { color:#2a1a0c; }
.bbg-frame { position:relative; padding: 5.4%; background: url(/games/match/ui/gold-board-frame.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 12px 22px rgba(0,0,0,.5)); }
.bbg-frame-inner { position:relative; border-radius:6px; background: linear-gradient(160deg, #fbf1d6, #f1dfb2); box-shadow: inset 0 0 0 2px rgba(138,90,18,.35), inset 0 0 24px rgba(138,90,18,.18); }

.bbg-btn { display:flex; align-items:center; justify-content:center; gap:8px; width:100%; min-height:56px; padding: 0 26px; cursor:pointer;
  font-family: Georgia, serif; font-weight:900; font-size:19px; text-decoration:none; border:0; background-color:transparent; transition: transform .08s; }
.bbg-btn:active { transform: translateY(2px) scale(.99); }
.bbg-btn:disabled { opacity:.5; }
.bbg-btn-green { background: url(/games/match/ui/button-green.webp) center / 100% 100% no-repeat; color:#fff8dc !important; text-shadow: 0 2px 0 rgba(0,0,0,.4); }
.bbg-btn-cream { background: url(/games/match/ui/button-cream.webp) center / 100% 100% no-repeat; color:#3b2412 !important; }
.bbg-btn-small { min-height:44px; font-size:15px; padding: 0 18px; width:auto; }

.bbg-name-pill { display:inline-block; margin-top:6px; padding:5px 24px; font-family: Georgia, serif; font-weight:700; font-size:16px; color:#3b2412;
  background: url(/games/clue/ui/cream-pill.webp) center / 100% 100% no-repeat; }
.bbg-points { display:inline-flex; align-items:center; gap:6px; padding:8px 28px; color:#fff3c8; font-family:Georgia,serif; font-weight:700; font-size:28px;
  background: url(/games/clue/ui/button-green.webp) center / 100% 100% no-repeat; text-shadow: 0 2px 0 rgba(0,0,0,.35); font-variant-numeric: tabular-nums; }
.bbg-results { text-align:center; animation: bbg-rise .45s cubic-bezier(.2,.9,.3,1.2) both; }
.bbg-results-heading { font-size: clamp(26px, 8vw, 34px); font-weight:900; color:#2a1a0c; }
.bbg-stars { display:flex; justify-content:center; gap:6px; margin-top:8px; font-size: 46px; line-height:1; }
.bbg-stars span { color: rgba(120,84,40,.25); }
.bbg-stars span.is-on { color:#f2b51d !important; text-shadow: 0 0 14px rgba(246,211,107,.9), 0 3px 0 #8a5a12; animation: bbg-star .55s cubic-bezier(.2,.9,.3,1.4) both; }

.bbg-countdown { position:fixed; inset:0; z-index:80; display:grid; place-items:center; pointer-events:none; background: rgba(20,12,4,.35); }
.bbg-countdown span { font-family: Georgia, serif; font-weight:900; font-size: clamp(90px, 30vw, 160px); color:#fff3c8;
  text-shadow: 0 6px 0 #8a5a12, 0 0 40px rgba(246,211,107,.9); animation: bbg-count .7s ease-out both; }
.bbg-float { position:absolute; left:50%; top:-6px; z-index:5; pointer-events:none; transform: translateX(-50%); white-space:nowrap;
  font-family: Georgia, serif; font-weight:900; font-size:22px; color:#fff3c8; text-shadow: 0 2px 0 #8a5a12, 0 0 14px rgba(246,211,107,.9);
  animation: bbg-float 1.1s ease-out forwards; }
.bbg-callout { position:fixed; left:50%; top:38%; z-index:70; pointer-events:none; font-family: Georgia, serif; font-weight:900; font-size: clamp(34px, 11vw, 54px);
  color:#fff3c8; text-shadow: 0 4px 0 #8a5a12, 0 0 30px rgba(246,211,107,.95); animation: bbg-callout 1.2s ease-out forwards; white-space:nowrap; }
.bbg-shake { animation: bbg-shake .35s; }

@keyframes bbg-bump { 0% { transform: scale(1); } 40% { transform: scale(1.35); color:#1f7a3d; } 100% { transform: scale(1); } }
@keyframes bbg-star { from { opacity:0; transform: scale(2.4) rotate(-30deg); } to { opacity:1; transform:none; } }
@keyframes bbg-count { from { opacity:0; transform: scale(1.9); } 30% { opacity:1; } to { transform: scale(1); } }
@keyframes bbg-rise { from { opacity:0; transform: translateY(24px) scale(.96); } }
@keyframes bbg-float { 0% { opacity:0; transform: translate(-50%, 8px) scale(.8); } 15% { opacity:1; transform: translate(-50%, 0) scale(1.1); } 100% { opacity:0; transform: translate(-50%, -46px) scale(1); } }
@keyframes bbg-callout { 0% { opacity:0; transform: translate(-50%,-50%) scale(.5) rotate(-8deg); } 18% { opacity:1; transform: translate(-50%,-50%) scale(1.12) rotate(2deg); } 70% { opacity:1; transform: translate(-50%,-50%) scale(1); } 100% { opacity:0; transform: translate(-50%,-70%) scale(.95); } }
@keyframes bbg-shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-7px); } 40% { transform: translateX(7px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
@keyframes bbg-pop-in { from { opacity:0; transform: scale(.6); } }
@keyframes bbg-pulse { 0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(246,180,30,.0); } 50% { transform: scale(1.18); box-shadow: 0 0 0 6px rgba(246,180,30,.45); } }
@media (prefers-reduced-motion: reduce) { .bbg-stage * { animation-duration: .01ms !important; animation-iteration-count: 1 !important; } }
`;
