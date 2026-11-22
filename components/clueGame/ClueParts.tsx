"use client";

/**
 * Bible Clue Game: the pieces every screen shares (card faces, silhouettes,
 * Study This Card, the Scripture sheet, the room frame) and the game's CSS.
 *
 * The game has its own warm library room and green felt, so it uses its own
 * bb-clue-* classes and inline colours, never the bg-white / text-slate
 * utilities the Bible Covers repaint.
 */

import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import type { PublicCard } from "@/lib/clueGame/engine";
import type { ClueCategory, ClueRef } from "@/lib/clueGame/types";
import { kjvStaticUrl } from "@/lib/chapterStaticData";
import { ref as parseRef } from "@/lib/clueGame/ref";
import { CLUE_MUSIC_TRACKS, clueSound, musicOn, musicTrack, musicVolume, primeClueSound, setMusicOn, setMusicTrack, setMusicVolume, setSoundOn, soundOn } from "@/lib/clueGame/sound";

export const CATEGORY_LABEL: Record<ClueCategory, string> = { person: "Person", place: "Place", keyword: "Thing" }; // on a card a keyword reads "Thing" (Louis, 2026-11-22)

export function initials(name: string) {
  const parts = String(name || "?").trim().split(/\s+/);
  return ((parts[0]?.[0] || "?") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/** A seat's face: the Bible Buddy profile photo, or initials. */
export function Avatar({ name, src, size = 52 }: { name: string; src?: string | null; size?: number }) {
  const [broken, setBroken] = useState(false);
  return (
    <span className="bb-clue-avatarwrap" style={{ width: size, height: size }}>
      <span className="bb-clue-avatar" style={{ fontSize: size * 0.36 }}>
        {src && !broken ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" onError={() => setBroken(true)} />
        ) : (
          initials(name)
        )}
      </span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="bb-clue-avatarring" src="/games/clue/ui/seat-ring.webp" alt="" aria-hidden="true" />
    </span>
  );
}

/** The anonymous category shape, used when a card's own silhouette is not made yet. */
export function CategorySilhouette({ category }: { category: ClueCategory }) {
  if (category === "place") {
    return (
      <svg viewBox="0 0 120 120" className="bb-clue-sil" aria-hidden="true">
        <path d="M10 96 L44 46 L60 68 L78 38 L110 96 Z" fill="currentColor" />
        <circle cx="88" cy="26" r="9" fill="currentColor" opacity=".6" />
      </svg>
    );
  }
  if (category === "keyword") {
    return (
      <svg viewBox="0 0 120 120" className="bb-clue-sil" aria-hidden="true">
        <path d="M60 14 L70 46 L104 46 L77 66 L87 100 L60 80 L33 100 L43 66 L16 46 L50 46 Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 120" className="bb-clue-sil" aria-hidden="true">
      <circle cx="60" cy="34" r="17" fill="currentColor" />
      <path d="M30 112 L34 72 C36 58 46 54 60 54 C74 54 84 58 86 72 L90 112 Z" fill="currentColor" />
    </svg>
  );
}

/** The card's subject art: its own file, or a neutral fallback while art is produced. */
export function SubjectArt({ card, mode }: { card: PublicCard; mode: "mystery" | "reveal" }) {
  const src = mode === "mystery" ? card.mystery : card.reveal;
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={`bb-clue-art ${mode === "mystery" ? "is-mystery" : ""}`} src={src} alt={mode === "reveal" ? card.answer || "" : ""} draggable={false} />;
  }
  if (mode === "mystery") return <CategorySilhouette category={card.category} />;
  return (
    <div className="bb-clue-fallback">
      <span className="bb-clue-fallback-icon" aria-hidden="true">{card.category === "person" ? "👤" : card.category === "place" ? "🏞️" : "✨"}</span>
      <span className="bb-clue-fallback-name">{card.answer}</span>
      <span className="bb-clue-fallback-note">Art coming soon</span>
    </div>
  );
}

/** One playing card (5:7), face down (deck back), mystery, or revealed. */
export function PlayingCard({
  card,
  face,
  back,
  className = "",
}: {
  card: PublicCard | null;
  face: "back" | "mystery" | "reveal";
  back?: string;
  className?: string;
}) {
  return (
    <div className={`bb-clue-card ${face === "reveal" ? "is-revealed" : ""} ${className}`}>
      <div className="bb-clue-card-inner">
        <div className="bb-clue-card-face bb-clue-card-front">
          {card && face !== "back" ? (
            <>
              <div className="bb-clue-card-art">
                <SubjectArt card={card} mode="mystery" />
              </div>
              <div className="bb-clue-card-cat">{CATEGORY_LABEL[card.category].toUpperCase()}</div>
            </>
          ) : (
            <CardBack src={back} />
          )}
        </div>
        <div className="bb-clue-card-face bb-clue-card-reveal">
          {card ? (
            <>
              <div className="bb-clue-card-art is-color">
                <SubjectArt card={card} mode="reveal" />
              </div>
              <div className="bb-clue-card-name">{card.answer}</div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function CardBack({ src }: { src?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return src ? <img className="bb-clue-back-img" src={src} alt="" draggable={false} /> : <div className="bb-clue-back-plain" />;
}

/* ---------- Scripture ---------- */

export function ScriptureSheet({ target, onClose }: { target: ClueRef; onClose: () => void }) {
  const [verses, setVerses] = useState<Array<{ number: number; text: string }> | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let live = true;
    fetch(`${window.location.origin}${kjvStaticUrl(target.book, target.chapter)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((all: Array<{ number: number; text: string }>) => {
        if (live) setVerses(all.filter((v) => v.number >= target.verseStart && v.number <= target.verseEnd));
      })
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [target]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="bb-clue-sheetwrap" role="dialog" aria-modal="true" aria-label={target.label} onClick={onClose}>
      <div className="bb-clue-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="bb-clue-serif text-xl font-bold">
            {target.label} <span className="text-xs font-bold opacity-60">KJV</span>
          </h3>
          <button type="button" onClick={onClose} className="bb-clue-x" aria-label="Close">✕</button>
        </div>
        <div className="mt-3 max-h-[45vh] space-y-2 overflow-y-auto text-[15px] leading-relaxed">
          {verses
            ? verses.map((v) => (
                <p key={v.number}>
                  <sup className="mr-1 font-black opacity-60">{v.number}</sup>
                  {v.text.replace(/\s*\n\s*/g, " ")}
                </p>
              ))
            : failed
              ? <p className="opacity-70">This passage could not load. Open the chapter instead.</p>
              : <p className="opacity-60">Loading…</p>}
        </div>
        <Link href={`/bible/${encodeURIComponent(target.book.toLowerCase())}/${target.chapter}`} className="bb-clue-btn mt-4 w-full">
          Read {target.book} {target.chapter} in the Bible
        </Link>
      </div>
    </div>
  );
}

/** The verse references a clue list carries (clue text has no refs before the reveal). */
export function refOf(label: string): ClueRef | null {
  try {
    return parseRef(label);
  } catch {
    return null;
  }
}

/* ---------- Study This Card ---------- */

export function StudyCard({ card, onClose, onOpenRef }: { card: PublicCard; onClose: () => void; onOpenRef: (r: ClueRef) => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="bb-clue-sheetwrap is-center" role="dialog" aria-modal="true" aria-label={`Study ${card.answer}`} onClick={onClose}>
      <div className="bb-clue-parchment bb-clue-study" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="bb-clue-x bb-clue-study-x" aria-label="Close">✕</button>
        <h2 className="bb-clue-serif bb-clue-title">{card.answer}</h2>
        {card.reveal ? (
          <div className="bb-clue-study-art">
            <SubjectArt card={card} mode="reveal" />
          </div>
        ) : null}
        {card.teaching ? (
          <div className="bb-clue-note">
            <span className="bb-clue-note-tag">Teaching Note</span>
            <p>{card.teaching}</p>
          </div>
        ) : null}
        {card.quiz ? (
          <div className="mt-3 text-left">
            <p className="bb-clue-serif text-[17px] font-bold leading-snug">{card.quiz.question}</p>
            {card.quiz.correct !== undefined ? <p className="mt-1 text-[15px] font-black" style={{ color: "#1d5a34" }}>✓ {card.quiz.choices[card.quiz.correct]}</p> : null}
            {card.quiz.explanation ? <p className="mt-1 text-[15px] leading-snug">{card.quiz.explanation}</p> : null}
            {card.quiz.ref ? (
              <button type="button" className="bb-clue-ref mt-2" onClick={() => onOpenRef(card.quiz!.ref!)}>
                Read {card.quiz.ref.label}
              </button>
            ) : null}
          </div>
        ) : null}
        {card.study ? (
          <Link href={card.study.href} className="bb-clue-btn bb-clue-btn-green mt-4 w-full">
            {card.study.label}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

/* ---------- the room ---------- */

/** The speaker button: sound on or off, kept on this device. */
/**
 * The sound button opens a small menu (Louis, 2026-11-22): music on/off with
 * a volume slider and a choice of track, and the sound effects on/off on
 * their own. Every choice is kept on the device.
 */
export function SoundToggle() {
  const [open, setOpen] = useState(false);
  const [fx, setFx] = useState(true);
  const [mOn, setMOn] = useState(true);
  const [vol, setVol] = useState(0.5);
  const [track, setTrack] = useState(0);
  useEffect(() => {
    // Read the saved choices after mount (localStorage is not there on the server).
    const id = window.setTimeout(() => {
      setFx(soundOn());
      setMOn(musicOn());
      setVol(musicVolume());
      setTrack(musicTrack());
    }, 0);
    return () => window.clearTimeout(id);
  }, []);
  const silent = !fx && !mOn;
  return (
    <div className="bb-sound">
      <button type="button" className="bb-clue-round" aria-label="Sound and music" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/games/clue/ui/icon-sound.webp" alt="" className={silent ? "is-off" : ""} />
        {silent ? <span className="bb-clue-mute-slash" aria-hidden="true" /> : null}
      </button>
      {open ? (
        <>
          <div className="bb-sound-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="bb-sound-menu" role="dialog" aria-label="Sound and music">
            <div className="bb-sound-row">
              <span className="bb-sound-title">🎵 Music</span>
              <button
                type="button"
                className={`bb-sound-switch ${mOn ? "is-on" : ""}`}
                aria-pressed={mOn}
                onClick={() => {
                  setMusicOn(!mOn);
                  setMOn(!mOn);
                }}
              >
                {mOn ? "On" : "Off"}
              </button>
            </div>
            <label className="bb-sound-slider">
              <span>Volume</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={vol}
                disabled={!mOn}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setVol(v);
                  setMusicVolume(v);
                }}
                aria-label="Music volume"
              />
            </label>
            <div className="bb-sound-tracks" role="radiogroup" aria-label="Music track">
              {CLUE_MUSIC_TRACKS.map((t, i) => (
                <button
                  key={t.src}
                  type="button"
                  role="radio"
                  aria-checked={track === i}
                  className={track === i ? "is-on" : ""}
                  disabled={!mOn}
                  onClick={() => {
                    setTrack(i);
                    setMusicTrack(i);
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="bb-sound-row is-split">
              <span className="bb-sound-title">🔔 Sound effects</span>
              <button
                type="button"
                className={`bb-sound-switch ${fx ? "is-on" : ""}`}
                aria-pressed={fx}
                onClick={() => {
                  setSoundOn(!fx);
                  setFx(!fx);
                  if (!fx) clueSound.tap();
                }}
              >
                {fx ? "On" : "Off"}
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function ClueRoomFrame({ children }: { children: ReactNode }) {
  useEffect(() => primeClueSound(), []);
  // Every Bible Clue screen is the game: the app menu, top bar, Bible Lock
  // strip and Report a Problem step aside (Louis, 2026-11-22). The board adds
  // its own class too (bb-in-game), so each can leave without undoing the other.
  useLayoutEffect(() => {
    document.documentElement.classList.add("bb-game-screen");
    return () => document.documentElement.classList.remove("bb-game-screen");
  }, []);
  return (
    <div className="bb-clue-room">
      <style>{CLUE_CSS}</style>
      {children}
    </div>
  );
}

export function ClueHeader({
  onBack,
  backHref,
  subtitle,
  badge,
  right,
  hideLogo,
}: {
  onBack?: () => void;
  backHref?: string;
  subtitle?: string;
  badge?: string;
  right?: ReactNode;
  /** The menu has its own title banner, so no logo there. */
  hideLogo?: boolean;
}) {
  return (
    <header className="bb-clue-header">
      <div className="bb-clue-header-side">
        {onBack ? (
          <button type="button" onClick={onBack} className="bb-clue-round" aria-label="Back">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/games/clue/ui/icon-back.webp" alt="" />
          </button>
        ) : backHref ? (
          <Link href={backHref} className="bb-clue-round" aria-label="Back">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/games/clue/ui/icon-back.webp" alt="" />
          </Link>
        ) : null}
      </div>
      <div className="bb-clue-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {hideLogo ? null : <img className="bb-clue-logo-img" src="/games/clue/ui/logo.webp" alt="Bible Buddy" />}
        {subtitle ? <span className="bb-clue-logo-pill">{subtitle}</span> : null}
        {badge ? <span className="bb-clue-logo-badge">{badge}</span> : null}
      </div>
      <div className="bb-clue-header-side is-right">{right ?? <SoundToggle />}</div>
    </header>
  );
}

export const CLUE_CSS = `
/* The game keeps its own colours under every Bible Cover. */
html[data-bb-cover] .bb-clue-parchment, html[data-bb-cover] .bb-clue-parchment :is(p,li,h2,h3,span:not(.bb-clue-pts):not(.bb-clue-note-tag):not(.bb-clue-pointsbadge):not(.bb-clue-logo-pill)) { color:#2a1a0c; }
html[data-bb-cover] .bb-clue-sheet, html[data-bb-cover] .bb-clue-sheet :is(p,h3) { color:#2a1a0c; }
.bb-clue-room { position:relative; min-height:100dvh; color:#3b2412; overflow-x:hidden; background:#2a170b; isolation:isolate; }
.bb-clue-room::before { content:""; position:fixed; inset:0; z-index:-1; pointer-events:none;
  background: linear-gradient(180deg, rgba(20,10,4,.25), rgba(20,10,4,.1) 40%, rgba(20,10,4,.45)), url(/games/clue/ui/room-phone.webp) center top / cover no-repeat; }
@media (min-aspect-ratio: 3/4) { .bb-clue-room::before { background: linear-gradient(180deg, rgba(20,10,4,.25), rgba(20,10,4,.1) 40%, rgba(20,10,4,.45)), url(/games/clue/ui/room-wide.webp) center / cover no-repeat; } }
.bb-clue-logo-img { height: clamp(64px, 19vw, 104px); width:auto; filter: drop-shadow(0 4px 8px rgba(0,0,0,.45)); }
.bb-clue-btnicon { display:inline-block; width:34px; height:34px; margin-right:4px; vertical-align:middle; }
.bb-clue-avatarwrap { position:relative; display:inline-block; flex:none; }
.bb-clue-avatarring { position:absolute; inset:-9%; width:118%; height:118%; pointer-events:none; filter: drop-shadow(0 3px 6px rgba(0,0,0,.45)); }
.bb-clue-mute-slash { position:absolute; left:22%; right:22%; top:50%; height:4px; border-radius:2px; background:#f6e7c1; transform: rotate(-40deg); box-shadow: 0 0 0 2px #1d4a2a; }
.bb-clue-round img { width:100%; height:100%; }
.bb-clue-round img.is-off { filter: grayscale(.6) brightness(.85); }
.bb-clue-sparkle { position:absolute; z-index:4; width:120%; left:-10%; top:-30%; pointer-events:none; opacity:0; animation: bb-clue-sparkle 1.2s ease-out forwards; }
@keyframes bb-clue-sparkle { 0% { opacity:0; transform: scale(.6) rotate(-10deg); } 25% { opacity:1; } 100% { opacity:0; transform: scale(1.15) rotate(6deg); } }
.bb-clue-room :is(h1,h2,h3,p,li,label) { color: inherit; }
.bb-clue-serif { font-family: Georgia, "Times New Roman", serif; }
.bb-clue-header { display:flex; align-items:center; justify-content:space-between; gap:8px; padding: calc(10px + env(safe-area-inset-top)) 14px 6px; color:#fff3dc; }
.bb-clue-header-side { width:96px; display:flex; gap:8px; }
.bb-clue-header-side.is-right { justify-content:flex-end; }
.bb-clue-round { position:relative; display:grid; place-items:center; width:46px; height:46px; border-radius:999px; padding:0; background:none; filter: drop-shadow(0 4px 8px rgba(0,0,0,.45)); }
.bb-clue-round:active { transform: scale(.94); }
.bb-clue-logo { display:flex; flex-direction:column; align-items:center; line-height:1; }
.bb-clue-logo-book { display:none; }
.bb-clue-logo-text { font-size:22px; font-weight:700; color:#fff1c9; text-shadow: 0 2px 0 #7a4a12, 0 3px 8px rgba(0,0,0,.5); }
.bb-clue-logo-pill { margin-top:4px; padding:3px 14px; border-radius:999px; background:#1f5a34; color:#fff1c9; font-size:12px; font-weight:800; box-shadow: 0 0 0 2px #d8a84a; }
.bb-clue-logo-badge { margin-top:4px; padding:2px 12px; border-radius:999px; background:#f3e2b8; color:#4a2c12; font-size:11px; font-weight:900; box-shadow: 0 0 0 1px #b8863a; }
.bb-clue-banner { margin: 4px auto 0; width: min(94vw, 520px); aspect-ratio: 1600/400; display:flex; align-items:center; justify-content:center; padding: 0 15% 1.5%; text-align:center; color:#fff3c8;
  background: url(/games/clue/ui/banner.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 6px 12px rgba(0,0,0,.45)); }
.bb-clue-banner h1 { font-size: clamp(18px, 5.4vw, 29px); flex:none; font-weight:700; line-height:1.05; white-space:nowrap; text-shadow: 0 2px 0 rgba(0,0,0,.35); }
.bb-clue-ribbon { display:inline-block; margin-top:2px; padding:7px 26px; white-space:nowrap; color:#3b2412; font-size:13px; font-weight:700; font-family: Georgia, serif;
  background: url(/games/clue/ui/name-shield.webp) center / 100% 100% no-repeat; }
.bb-clue-parchment { position:relative; padding:6px; color:#3b2412;
  border: 20px solid transparent; border-image: url(/games/clue/ui/parchment.webp) 70 fill / 20px stretch;
  filter: drop-shadow(0 14px 24px rgba(0,0,0,.45)); }
.bb-clue-btn { display:inline-flex; align-items:center; justify-content:center; gap:10px; min-height:52px; padding:0 22px;
  font-weight:900; font-size:17px; color:#3b2412; font-family: Georgia, serif;
  border: 0 solid transparent; border-width: 0 28px; border-image: url(/games/clue/ui/button-cream.webp) 0 80 fill / 0 28px stretch;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,.35)); transition: transform .08s; }
.bb-clue-btn:active { transform: scale(.97); }
.bb-clue-btn-green { color:#fff3c8 !important; border-image: url(/games/clue/ui/button-green.webp) 0 80 fill / 0 28px stretch; text-shadow: 0 2px 0 rgba(0,0,0,.35); }
.bb-clue-btn:disabled { opacity:.5; }
.bb-clue-btn-big { min-height:60px; font-size: clamp(18px, 5.4vw, 22px); width:100%; white-space:nowrap; }
.bb-clue-felt { position:relative; margin: 28px auto 0; width:min(100% - 8px, 560px); aspect-ratio: 2000/1200;
  background: url(/games/clue/ui/table.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 18px 26px rgba(0,0,0,.5)); }
.bb-clue-seat { position:absolute; display:flex; flex-direction:column; align-items:center; gap:2px; transform: translate(-50%,-50%); z-index:3; }
.bb-clue-avatar { position:absolute; inset:0; display:grid; place-items:center; border-radius:999px; overflow:hidden; background:#7a4a20; color:#fff3dc; font-weight:900; }
.bb-clue-avatar img { width:100%; height:100%; object-fit:cover; }
.bb-clue-seatplate { display:flex; align-items:center; gap:6px; padding:4px 16px 5px; color:#fff3dc; font-family: Georgia, serif;
  font-size:12px; font-weight:800; white-space:nowrap; background: url(/games/clue/ui/score-plate.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 3px 5px rgba(0,0,0,.4)); }
.bb-clue-seat.is-you .bb-clue-avatarwrap { filter: drop-shadow(0 0 12px rgba(246,211,107,.75)); }
.bb-clue-pilecount { display:inline-grid; place-items:center; min-width:20px; height:22px; padding:0 4px; border-radius:5px; background:#fff3dc; color:#3b2412; font-size:11px; font-weight:900; box-shadow: 2px -2px 0 #e2cfa2, 4px -4px 0 #cdb680; }
.bb-clue-center { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); display:flex; align-items:center; gap: 6%; width:70%; justify-content:center; z-index:2; }
.bb-clue-card { position:relative; width: min(22vw, 120px); aspect-ratio: 5/7; perspective: 1000px; flex:none; }
.bb-clue-card-inner { position:absolute; inset:0; transform-style:preserve-3d; transition: transform .7s cubic-bezier(.3,.7,.2,1); }
.bb-clue-card.is-revealed .bb-clue-card-inner { transform: rotateY(180deg); }
.bb-clue-card-face { position:absolute; inset:0; border-radius:10px; overflow:hidden; backface-visibility:hidden; -webkit-backface-visibility:hidden;
  background: url(/games/clue/ui/card-face.webp) center / 100% 100% no-repeat; box-shadow: 0 10px 22px rgba(0,0,0,.45); display:flex; flex-direction:column; }
.bb-clue-card-reveal { transform: rotateY(180deg); }
.bb-clue-card-art { flex:1 1 0; min-height:0; display:flex; align-items:center; justify-content:center; overflow:hidden; padding:10% 9% 2%; }
.bb-clue-card-art.is-color { padding:0; }
.bb-clue-art { display:block; width:100%; height:100%; max-width:100%; max-height:100%; object-fit:contain; }
.bb-clue-card-art.is-color .bb-clue-art { object-fit:cover; }
.bb-clue-art.is-mystery { filter: drop-shadow(0 2px 0 rgba(255,255,255,.35)); }
.bb-clue-sil { width:78%; color:#3a2815; }
.bb-clue-card-cat, .bb-clue-card-name { flex:none; padding:3px 4px 8%; text-align:center; font-family: Georgia, serif; font-weight:700; color:#3b2412; font-size: clamp(8px, 2.3vw, 12px); letter-spacing:.04em; white-space:nowrap; overflow:hidden; text-overflow:clip; }
.bb-clue-card-name { letter-spacing:0; font-size: clamp(11px, 3vw, 15px); font-style:italic; }
.bb-clue-back-img { width:100%; height:100%; object-fit:cover; }
.bb-clue-back-plain { width:100%; height:100%; background: radial-gradient(circle,#2f7a47,#123a22); }
.bb-clue-drawpile { position:relative; width: min(17vw, 92px); aspect-ratio:5/7; flex:none; }
.bb-clue-drawpile > div { position:absolute; inset:0; border-radius:9px; overflow:hidden; box-shadow: 0 0 0 1.5px #c99a46, 0 6px 14px rgba(0,0,0,.4); }
.bb-clue-drawpile.is-empty { visibility:hidden; }
.bb-clue-pilebadge { position:absolute; right:-8px; bottom:-8px; z-index:5; min-width:24px; height:24px; padding:0 6px; border-radius:999px; display:grid; place-items:center; background:#f6d36b; color:#3b2412; font-size:12px; font-weight:900; box-shadow: 0 0 0 2px #7a4a12; }
.bb-clue-shuffle { position:relative; width: min(22vw, 120px); aspect-ratio:5/7; }
.bb-clue-shuffle-card { position:absolute; inset:0; border-radius:9px; overflow:hidden; box-shadow: 0 0 0 1.5px #c99a46, 0 6px 14px rgba(0,0,0,.4); }
.bb-clue-shuffle-card.is-left { animation: bb-clue-riffle-l .72s ease-in-out 2 both; }
.bb-clue-shuffle-card.is-right { animation: bb-clue-riffle-r .72s ease-in-out 2 both; }
@keyframes bb-clue-riffle-l { 0%,100% { transform: translate(0,0) rotate(0); } 35% { transform: translate(-62%, -4%) rotate(-10deg); } 60% { transform: translate(-30%, -10%) rotate(-4deg); } }
@keyframes bb-clue-riffle-r { 0%,100% { transform: translate(0,0) rotate(0); } 35% { transform: translate(62%, -4%) rotate(10deg); } 60% { transform: translate(30%, -10%) rotate(4deg); } }
.bb-clue-intro-fly { position:absolute; inset:0; border-radius:9px; overflow:hidden; box-shadow: 0 0 0 1.5px #c99a46, 0 6px 14px rgba(0,0,0,.4); animation: bb-clue-fly-to-pile .2s ease-in forwards; }
@keyframes bb-clue-fly-to-pile { from { transform: translate(0,0) rotate(-6deg); opacity:1; } to { transform: translate(135%, -4%) rotate(4deg) scale(.82); opacity:.9; } }
.bb-clue-flipin { position:relative; animation: bb-clue-flipin .5s ease-in-out .5s both; }
@keyframes bb-clue-flipin { 0% { transform: scaleX(1); } 50% { transform: scaleX(0.02); } 100% { transform: scaleX(1); } }
.bb-clue-flipcover { position:absolute; inset:0; border-radius:10px; overflow:hidden; z-index:2; box-shadow: 0 0 0 2px #c99a46; animation: bb-clue-uncover .5s steps(1, end) .5s both; }
@keyframes bb-clue-uncover { 0% { opacity:1; } 50% { opacity:0; } 100% { opacity:0; } }
.bb-clue-pop { position:absolute; left:50%; top:46%; z-index:8; pointer-events:none; font-family: Georgia, serif; font-weight:900; font-size: clamp(34px, 11vw, 56px);
  transform: translate(-50%,-50%); animation: bb-clue-pop 1.8s cubic-bezier(.2,.8,.25,1) forwards; }
.bb-clue-pop.is-win { color:#ffe27a; -webkit-text-stroke: 2px #7a4a12; text-shadow: 0 0 18px rgba(255,214,90,.9), 0 4px 0 #7a4a12; }
.bb-clue-pop.is-lose { color:#ff8a78; -webkit-text-stroke: 2px #5a140c; text-shadow: 0 0 14px rgba(255,90,70,.7), 0 4px 0 #5a140c; font-size: clamp(28px, 9vw, 44px); }
@keyframes bb-clue-pop {
  0% { transform: translate(-50%,-50%) scale(.2); opacity:0; }
  18% { transform: translate(-50%,-60%) scale(1.35); opacity:1; }
  40% { transform: translate(-50%,-62%) scale(1); opacity:1; }
  100% { transform: translate(calc(-50% + var(--dx,0px)), calc(-50% + var(--dy,0px))) scale(.45); opacity:0; }
}
.bb-clue-pop.is-lose { animation-name: bb-clue-pop-lose; }
@keyframes bb-clue-pop-lose {
  0% { transform: translate(calc(-50% + var(--dx,0px)), calc(-50% + var(--dy,0px) - 10px)) scale(.4); opacity:0; }
  20% { transform: translate(calc(-50% + var(--dx,0px)), calc(-50% + var(--dy,0px) - 46px)) scale(1.2); opacity:1; }
  70% { transform: translate(calc(-50% + var(--dx,0px)), calc(-50% + var(--dy,0px) - 60px)) scale(1); opacity:1; }
  100% { transform: translate(calc(-50% + var(--dx,0px)), calc(-50% + var(--dy,0px) - 80px)) scale(.9); opacity:0; }
}
.bb-clue-seat.is-scored .bb-clue-seatplate { animation: bb-clue-bump .6s ease-out .9s both; }
.bb-clue-seat.is-scored .bb-clue-avatarwrap { animation: bb-clue-glow 1.4s ease-out .8s both; }
.bb-clue-seat.is-docked .bb-clue-seatplate { animation: bb-clue-shake .5s ease-in-out both; }
@keyframes bb-clue-bump { 0% { transform: scale(1); } 40% { transform: scale(1.3); } 100% { transform: scale(1); } }
@keyframes bb-clue-glow { 0% { filter: drop-shadow(0 0 0 rgba(255,214,90,0)); } 30% { filter: drop-shadow(0 0 22px rgba(255,214,90,1)); } 100% { filter: drop-shadow(0 0 0 rgba(255,214,90,0)); } }
@keyframes bb-clue-shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
.bb-clue-answers { border-top: 1.5px dashed #c99a46; padding-top: 8px; }
.bb-clue-answers-title { font-size:11px; font-weight:900; text-transform:uppercase; letter-spacing:.12em; opacity:.65; margin-bottom:4px; }
.bb-clue-answers ol { display:flex; flex-direction:column; gap:4px; max-height: 132px; overflow-y:auto; }
.bb-clue-answers li { display:flex; align-items:center; gap:8px; padding:4px 8px; border-radius:10px; font-size:14px; animation: bb-clue-fadein .3s ease-out both; }
.bb-clue-answers li.is-right { background: rgba(47,138,79,.16); }
.bb-clue-answers li.is-wrong { background: rgba(160,40,24,.1); }
.bb-clue-answers-name { font-weight:800; max-width: 84px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.bb-clue-answers-time { font-variant-numeric: tabular-nums; font-weight:900; font-size:12px; padding:1px 6px; border-radius:6px; background: rgba(59,36,18,.1); }
.bb-clue-answers-guess { flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-style:italic; font-family: Georgia, serif; }
.bb-clue-answers-result { font-weight:900; white-space:nowrap; }
.bb-clue-answers li.is-right .bb-clue-answers-result { color:#1d6a34 !important; }
.bb-clue-answers li.is-wrong .bb-clue-answers-result { color:#a3291b !important; }
/* ---------- the one-screen table (ClueTable) ---------- */
.bb-ct { display:flex; flex-direction:column; align-items:center; }
.bb-ct-stage { position:relative; width: min(100% - 8px, 620px); height: clamp(400px, calc(100dvh - 318px), 820px); container-type: size; }
.bb-ct { padding-bottom: 90px; }
.bb-ct-felt { position:absolute; left:50%; top:50%; width: 112cqh; height: 112cqw; transform: translate(-50%,-50%) rotate(90deg);
  background: url(/games/clue/ui/table.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 18px 26px rgba(0,0,0,.5)); }
@container (min-aspect-ratio: 1/1) { .bb-ct-felt { width: 112cqw; height: 112cqh; transform: translate(-50%,-50%); } }
.bb-ct-topbar { position:absolute; left:50%; top: 13%; transform: translateX(-50%); z-index:6; display:flex; gap:6px; align-items:center; white-space:nowrap; }
.bb-ct-roundpill { padding:4px 14px; font-family: Georgia, serif; font-weight:800; font-size:13px; color:#3b2412;
  background: url(/games/clue/ui/name-shield.webp) center / 100% 100% no-repeat; }
.bb-ct-roundpill.is-button { cursor:pointer; }
.bb-ct-decklabel { font-size:11px; font-weight:900; letter-spacing:.12em; text-transform:uppercase; color:#e9d9a6; text-shadow: 0 1px 2px rgba(0,0,0,.6); }
.bb-ct-middle { position:absolute; left:50%; top: 20%; bottom: 19%; width: 70%; transform: translateX(-50%); z-index:5; display:flex; flex-direction:column; align-items:center; gap: 2.2cqh; }
.bb-ct-middle .bb-clue-card { width: min(25cqw, 19cqh, 124px); }
.bb-ct-middle .bb-clue-drawpile { width: min(18cqw, 14cqh, 88px); }
.bb-ct-middle .bb-clue-shuffle { width: min(28cqw, 23cqh, 128px); }
.bb-ct-cards { display:flex; align-items:center; justify-content:center; gap: 6cqw; }
.bb-ct-slip { width:100%; max-height: 100%; overflow-y:auto; color:#2a1a0c; padding: 4px 8px;
  border: 14px solid transparent; border-image: url(/games/clue/ui/parchment.webp) 70 fill / 14px stretch; filter: drop-shadow(0 8px 14px rgba(0,0,0,.4)); }
.bb-ct-slip .bb-clue-cluetext { font-size: clamp(15px, 4.3vw, 20px); line-height:1.25; margin-top:6px; }
.bb-ct-slip-big { font-family: Georgia, serif; font-weight:700; font-size: clamp(17px, 4.8vw, 22px); text-align:center; padding: 6px 0; }
.bb-ct-slip-row { display:flex; align-items:center; justify-content:center; gap:6px; flex-wrap:nowrap; }
.bb-ct-slip .bb-clue-pointsbadge, .bb-ct-slip .bb-clue-timerpill { font-size:14px; padding:3px 14px; }
.bb-ct-cat { font-size:11px; font-weight:900; letter-spacing:.14em; text-transform:uppercase; opacity:.7; }
.bb-ct-timebar { height:6px; margin-top:6px; border-radius:999px; background: rgba(59,36,18,.15); overflow:hidden; }
.bb-ct-timebar span { display:block; height:100%; transform-origin:left; background: linear-gradient(90deg,#2f8a4f,#56b36f); transition: transform .15s linear; }
.bb-ct-timebar span.is-final { background: linear-gradient(90deg,#d8572e,#f0a43a); }
.bb-ct-earlier { margin-top:6px; font-size:12px; line-height:1.35; opacity:.62; }
.bb-ct-earlier b { display:inline-grid; place-items:center; width:16px; height:16px; margin-right:2px; border-radius:5px; background:#1f5a34; color:#fff3c8; font-size:10px; }
.bb-ct-answer { font-family: Georgia, serif; font-weight:700; font-size: clamp(22px, 6.4vw, 30px); text-align:center; color:#173b23; line-height:1.1; margin-bottom:4px; }
.bb-ct-slip .bb-clue-answers { margin-top:6px; }
.bb-ct-slip .bb-clue-answers li { font-size:12.5px; padding:3px 6px; }
/* Wide screens (tablet, laptop): the table lies flat, so the card and the
   slip sit side by side instead of stacked. */
@container (min-aspect-ratio: 1/1) {
  .bb-ct-topbar { top: 11%; }
  .bb-ct-middle { top: 20%; bottom: 20%; width: 74%; flex-direction: row; align-items: center; justify-content: center; gap: 3cqw; }
  .bb-ct-middle .bb-clue-card { width: min(15cqw, 36cqh, 150px); }
  .bb-ct-middle .bb-clue-drawpile { width: min(11cqw, 27cqh, 110px); }
  .bb-ct-middle .bb-clue-shuffle { width: min(15cqw, 36cqh, 150px); }
  .bb-ct-cards { flex: none; gap: 2.4cqw; }
  .bb-ct-slip { flex: 1 1 0; min-width: 0; max-height: 100%; }
  .bb-ct-overlay { flex: 1 1 auto; }
}
.bb-ct-slip { scrollbar-width: thin; }
.bb-ct-overlay { width: 100%; max-height: 100%; overflow-y:auto; border-radius:18px; }
.bb-ct-overlay .bb-clue-panel { margin:0; width:100%; }
.bb-ct-overlay .bb-clue-title { font-size: clamp(24px, 7vw, 32px); }
.bb-ct-hand { position: fixed; left: 50%; transform: translateX(-50%); bottom: calc(90px + env(safe-area-inset-bottom)); z-index: 40; width: min(100% - 16px, 560px); margin: 0;
  display:flex; gap:6px; align-items:center; padding: 4px;
  border: 12px solid transparent; border-image: url(/games/clue/ui/parchment.webp) 70 fill / 12px stretch; filter: drop-shadow(0 8px 16px rgba(0,0,0,.5)); }
.bb-ct-hand .bb-clue-input { height:46px; }
.bb-ct-hand .bb-clue-btn { min-height:46px; padding: 0 14px; font-size:16px; }
.bb-ct-wait { flex:none; height:46px; padding:0 10px; border-radius:12px; font-weight:800; font-size:13px; color:#6a4a22; background: rgba(255,255,255,.4); box-shadow: inset 0 0 0 1.5px #c99a46; }
.bb-ct-wait:disabled { opacity:.45; }
.bb-ct-crown { position:absolute; top:-22px; left:50%; transform: translateX(-50%); font-size:22px; z-index:2; filter: drop-shadow(0 2px 3px rgba(0,0,0,.5)); }
.bb-clue-seat.is-winner .bb-clue-avatarwrap { filter: drop-shadow(0 0 16px rgba(255,214,90,.95)); }
.bb-clue-review { padding-bottom: 14px; border-bottom: 1.5px dashed #c99a46; }
.bb-clue-review:last-child { border-bottom: 0; }
.bb-clue-fancard { position:relative; flex:none; width: min(19vw, 108px); aspect-ratio:5/7; margin: 0 -9px; border-radius:10px; overflow:hidden; display:flex; flex-direction:column;
  background: url(/games/clue/ui/card-face.webp) center / 100% 100% no-repeat; box-shadow: 0 10px 22px rgba(0,0,0,.45); transform-origin: 50% 120%; }
.bb-clue-fancard .bb-clue-card-art { flex:1; padding:6% 6% 0; }
.bb-clue-fancard .bb-clue-art { border-radius:6px; }
.bb-clue-fancard .bb-clue-card-name { font-size: clamp(9px, 2.4vw, 12px); padding: 3px 2px 5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.bb-sound { position:relative; }
.bb-sound-backdrop { position:fixed; inset:0; z-index:60; }
.bb-sound-menu { position:absolute; right:0; top: calc(100% + 8px); z-index:61; width: 250px; padding: 14px; border-radius:16px; color:#2a1a0c; text-align:left;
  background: linear-gradient(180deg,#fff8e6,#f1ddb0); box-shadow: 0 0 0 2px #c99a46, 0 12px 26px rgba(0,0,0,.45); animation: bb-clue-fadein .15s ease-out both; }
.bb-sound-menu :is(span,label) { color:#2a1a0c !important; }
.bb-sound-row { display:flex; align-items:center; justify-content:space-between; gap:10px; }
.bb-sound-row.is-split { margin-top: 12px; padding-top: 12px; border-top: 1.5px dashed #c99a46; }
.bb-sound-title { font-family: Georgia, serif; font-weight:800; font-size:16px; }
.bb-sound-switch { min-width: 58px; height: 32px; border-radius: 999px; font-weight:900; font-size:14px; color:#6a4a22 !important; background:#e8d6ad; box-shadow: inset 0 0 0 1.5px #c99a46; }
.bb-sound-switch.is-on { color:#fff6d8 !important; background: linear-gradient(180deg,#2f8a4f,#1d6a34); box-shadow:none; }
.bb-sound-slider { display:flex; align-items:center; gap:10px; margin-top:10px; font-size:13px; font-weight:800; }
.bb-sound-slider input { flex:1; accent-color:#1d6a34; }
.bb-sound-slider input:disabled { opacity:.4; }
.bb-sound-tracks { display:flex; gap:6px; margin-top:10px; }
.bb-sound-tracks button { flex:1; height:32px; border-radius:10px; font-weight:900; font-size:14px; color:#6a4a22 !important; background:#f8ecd0; box-shadow: inset 0 0 0 1.5px #c99a46; }
.bb-sound-tracks button.is-on { color:#fff6d8 !important; background: linear-gradient(180deg,#2f8a4f,#1d6a34); box-shadow:none; }
.bb-sound-tracks button:disabled { opacity:.45; }
/* ---------- the board (ClueTable): the Genesis four-player layout ---------- */
.bb-cb { position:relative; width: min(100%, 760px); margin: 0 auto; padding: 0 12px 6px; display:flex; flex-direction:column;
  height: calc(var(--vvh, 100dvh) - var(--cb-top, 60px) - env(safe-area-inset-bottom)); }
html:is(.bb-in-game, .bb-game-screen) :is(.bb-bottom-pill, .bb-safe-top-header, .bb-report-problem, section[aria-labelledby="home-bible-lock-heading"]) { display:none !important; }
.bb-cb > * { flex-shrink: 0; }
.bb-cb-scene { position:fixed; inset:0; z-index:-1; pointer-events:none; background: var(--scene-phone) center bottom / cover no-repeat #d9a55e; }
@media (min-aspect-ratio: 1/1) { .bb-cb-scene { background-image: var(--scene-desktop); background-position: center; } }
.bb-cb-titles { position:relative; z-index:6; margin: -58px auto 0; width: max-content; max-width: calc(100% - 120px); display:flex; flex-direction:column; align-items:center; gap:3px; pointer-events:none; }
.bb-cb-titles button { pointer-events:auto; }
.bb-cb-deckpill { min-width: 170px; padding: 5px 26px 6px; text-align:center; font-family: Georgia, serif; font-weight:800; letter-spacing:.2em; text-transform:uppercase; font-size: clamp(16px, 4.6vw, 22px); color:#f8e4a6 !important;
  background: url(/games/clue/ui/green-pill.webp) center / 100% 100% no-repeat; text-shadow: 0 1px 2px rgba(0,0,0,.6); }
.bb-cb-roundpill { padding: 3px 18px 4px; font-family: Georgia, serif; font-weight:800; font-size: 14px; color:#3b2412 !important; white-space:nowrap; background: url(/games/clue/ui/cream-pill.webp) center / 100% 100% no-repeat; }
.bb-cb-roundpill.is-button { cursor:pointer; margin-top:2px; }
.bb-cb-others { display:grid; gap: 6px; margin-top: 12px; position:relative; z-index:3; }
.bb-cb-other { position:relative; min-width:0; display:flex; flex-direction:column; align-items:center; }
.bb-cb-ring { position:relative; display:inline-block; flex:none; }
.bb-cb-ring-photo { position:absolute; inset:9%; border-radius:999px; overflow:hidden; display:grid; place-items:center; background: linear-gradient(160deg,#f6e3b4,#d8b16a); color:#3b2412; font-weight:900; font-family: Georgia, serif; }
.bb-cb-ring-photo img { width:100%; height:100%; object-fit:cover; }
.bb-cb-ring-frame { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; filter: drop-shadow(0 3px 6px rgba(0,0,0,.4)); }
.bb-cb-greenpill { display:inline-flex; align-items:center; justify-content:center; gap:4px; color:#fff3cf !important; font-family: Georgia, serif; font-weight:800; white-space:nowrap;
  background: url(/games/clue/ui/green-pill.webp) center / 100% 100% no-repeat; text-shadow: 0 1px 2px rgba(0,0,0,.5); }
.bb-cb-greenpill * { color:inherit !important; }
.bb-cb-namepill { margin-top:-8px; position:relative; z-index:2; max-width:100%; padding: 4px 12px 5px; font-size: clamp(11px, 3.3vw, 15px); }
.bb-cb-name { min-width:0; overflow:hidden; text-overflow:ellipsis; }
.bb-cb-pts { flex:none; }
.bb-cb-fan { position:relative; display:flex; justify-content:center; align-items:flex-end; min-height: 40px; margin-top: 6px; max-width:100%; }
.bb-cb-fancard { position:relative; width: min(12.5vw, 9vh, 70px); aspect-ratio: 5/6.4; margin: 0 -5px; border-radius:6px; overflow:hidden; background:#fbf1d8; box-shadow: 0 0 0 1.5px #d9a843, 0 4px 8px rgba(0,0,0,.35); transform-origin: 50% 110%; }
.bb-cb-fancard .bb-clue-art { width:100%; height:100%; object-fit:cover; object-position: 50% 8%; }
.bb-cb-fanmore { position:absolute; right: 2px; bottom:-6px; z-index:5; min-width:22px; height:22px; padding:0 5px; border-radius:999px; display:grid; place-items:center; background:#f6d36b; color:#3b2412; font-weight:900; font-size:11px; box-shadow: 0 0 0 1.5px #8a5a1a; }
.bb-cb-crown { position:absolute; top:-18px; left:50%; transform:translateX(-50%); font-size:20px; z-index:3; }
.bb-cb-other.is-scored .bb-cb-ring, .bb-cb-mechip.is-scored .bb-cb-ring { animation: bb-clue-glow 1.4s ease-out .8s both; border-radius:999px; }
.bb-cb-other.is-scored .bb-cb-namepill, .bb-cb-mechip.is-scored .bb-cb-mepill { animation: bb-clue-bump .6s ease-out .9s both; }
.bb-cb-other.is-docked .bb-cb-namepill, .bb-cb-mechip.is-docked .bb-cb-mepill { animation: bb-clue-shake .5s ease-in-out both; }
.bb-cb-gap { flex: 1 1 0; min-height: 0; display:flex; flex-direction:column; justify-content:flex-end; padding-bottom: 8px; }
.bb-cb-answers { margin: 0 auto; width: min(100%, 460px); padding: 6px 8px !important; border-top:0 !important; border-radius:14px; background: rgba(255,248,232,.92); box-shadow: 0 0 0 1.5px #d9a843, 0 8px 18px rgba(0,0,0,.25); color:#2a1a0c; }
.bb-cb-answers.is-floating { position:absolute; left:50%; top: 22%; transform: translateX(-50%); z-index:9; width: min(92%, 440px); pointer-events:none; background: none !important; box-shadow:none !important; padding:0 !important; }
.bb-cb-answers.is-floating ol { gap:6px; max-height:none; overflow:visible; }
.bb-cb-answers.is-floating li { border-radius:999px; background:#fff8e8 !important; box-shadow: 0 0 0 1.5px #d9a843, 0 8px 16px rgba(0,0,0,.25); padding: 5px 12px !important; }
.bb-cb-answers.is-floating li { animation: bb-ans-float 3.2s ease-out forwards; }
@keyframes bb-ans-float { 0% { opacity:0; transform: translateY(14px) scale(.96); } 10% { opacity:1; transform:none; } 75% { opacity:1; transform: translateY(-4px); } 100% { opacity:0; transform: translateY(-16px); } }
.bb-cb-answers li { font-size: 13px !important; padding: 3px 6px !important; }
.bb-cb-play { display:grid; grid-template-columns: minmax(0, 21fr) minmax(0, 60fr) minmax(0, 19fr); align-items:center; gap: clamp(6px, 2vw, 14px); position:relative; z-index:4; }
/* The card in play on the left, the deck on the right (Louis, 2026-11-22). */
.bb-cb-pileslot { display:flex; justify-content:center; order: 3; }
.bb-cb-panel { order: 2; }
.bb-cb-pile { position:relative; width: 100%; max-width: min(120px, 15vh); aspect-ratio: 5/7; }
.bb-cb-pile.is-empty .bb-cb-pilecard.is-ghost { opacity:.4; filter: grayscale(.5); }
.bb-cb-pilecard { position:absolute; inset:0; border-radius:9px; overflow:hidden; box-shadow: 0 0 0 1.5px #c99a46, 0 6px 12px rgba(0,0,0,.35); }
.bb-cb-pilebadge { position:absolute; right:-6px; bottom:-8px; z-index:8; min-width:28px; height:28px; padding:0 6px; border-radius:999px; display:grid; place-items:center; background: radial-gradient(circle at 40% 35%, #fff2b8, #f2c95a); color:#3b2412; font-weight:900; font-size:14px; box-shadow: 0 0 0 2px #a8741f, 0 3px 6px rgba(0,0,0,.35); }
.bb-cb-shuffle { width: 100% !important; max-width: min(120px, 15vh); }
.bb-cb-panel { position:relative; min-height: clamp(96px, min(30vw, 17vh), 200px); display:flex; flex-direction:column; justify-content:center; padding: clamp(12px, 3vw, 22px) clamp(12px, 3.4vw, 24px); color:#2a1a0c;
  background: url(/games/clue/ui/clue-panel.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 8px 14px rgba(0,0,0,.35)); }
.bb-cb-panel :is(p, span) { color: inherit; }
.bb-cb-panel-head { display:flex; align-items:center; justify-content:center; gap: 10px; font-family: Georgia, serif; font-weight:800; font-size: clamp(12px, 3.4vw, 16px); white-space:nowrap; }
.bb-cb-worth { font-weight:700; opacity:.6; }
.bb-cb-sep { width:1.5px; align-self:stretch; background:#d9a843; }
.bb-cb-timer { display:inline-flex; align-items:center; gap:4px; color:#b3261e !important; font-variant-numeric: tabular-nums; }
.bb-cb-timer img { width: 1.25em; height:1.25em; }
.bb-cb-timer.is-final { animation: bb-cb-pulse .5s ease-in-out infinite alternate; }
@keyframes bb-cb-pulse { to { transform: scale(1.12); } }
.bb-cb-timebar { height:3px; margin: 7px 0 2px; border-radius:999px; background: rgba(184,134,46,.35); overflow:hidden; }
.bb-cb-timebar span { display:block; height:100%; transform-origin:left; background:#b8862e; transition: transform .15s linear; }
.bb-cb-timebar span.is-final { background:#c8452d; }
.bb-cb-clue { margin-top:6px; text-align:center; font-family: Georgia, serif; font-weight:700; font-size: clamp(15px, min(5vw, 3.4vh), 30px); line-height:1.22; color:#2a1a0c !important; overflow-wrap:anywhere; }
.bb-cb-panel-big { text-align:center; font-family: Georgia, serif; font-weight:700; font-size: clamp(16px, 4.6vw, 24px); }
.bb-cb-answer { text-align:center; font-family: Georgia, serif; font-weight:800; font-size: clamp(22px, 6.4vw, 34px); line-height:1.1; color:#173b23 !important; }
.bb-cb-panel-row { display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap: 4px 10px; margin-top:6px; }
.bb-cb-ref { padding: 2px 12px 3px; font-family: Georgia, serif; font-weight:800; font-size: 13px; background: url(/games/clue/ui/cream-pill.webp) center / 100% 100% no-repeat; }
.bb-cb-outcome { margin-top:6px; text-align:center; font-weight:900; font-size: clamp(12px, 3.3vw, 14px); }
.bb-cb-slot { display:flex; justify-content:center; order: 1; }
.bb-cb-cardwrap { position:relative; z-index:6; width:100%; max-width: min(140px, 17vh); }
/* Dealt from the deck on the right, across to the card spot on the left. */
.bb-cb-cardwrap.bb-clue-deal { animation: bb-cb-deal .6s cubic-bezier(.2,.8,.2,1) both; }
@keyframes bb-cb-deal { from { transform: translate(min(78vw, 560px), 0) rotate(-10deg) scale(.9); } to { transform:none; } }
.bb-cb-cardwrap.bb-clue-deal.bb-clue-award { animation: bb-clue-award .75s cubic-bezier(.5,0,.75,0) forwards; }
/* The opening: each card drops onto the deck. */
.bb-cb-pile .bb-clue-intro-fly { animation: bb-cb-onto-pile .2s ease-out both; }
@keyframes bb-cb-onto-pile { from { transform: translate(-60%, -30%) rotate(-12deg); } to { transform:none; } }
.bb-cb-card { position:relative; width:100%; max-width: min(140px, 17vh); aspect-ratio: 5/7; border-radius:10px; overflow:hidden; display:flex; align-items:center; justify-content:center; padding: 10%;
  background: url(/games/clue/ui/mystery-card.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 8px 12px rgba(0,0,0,.35)); color:#123d24; }
.bb-cb-card { flex-direction:column; gap: 4%; }
.bb-cb-card-art { flex: 1 1 0; min-height:0; width:100%; display:flex; align-items:center; justify-content:center; }
.bb-cb-card .bb-clue-art { width:100%; height:100%; object-fit:contain; }
.bb-cb-card-cat { flex:none; font-family: Georgia, serif; font-weight:800; font-size: clamp(9px, 2.6vw, 13px); letter-spacing:.14em; text-transform:uppercase; color:#5a3a16 !important; }
.bb-cb-card.is-revealed { padding: 6%; }
.bb-cb-card.is-revealed .bb-clue-art { object-fit:cover; object-position: 50% 8%; border-radius:6px; }
.bb-cb-card.is-empty { opacity:.55; }
.bb-cb-cardcover { position:absolute; inset:0; z-index:2; animation: bb-clue-uncover .5s steps(1, end) .5s both; }
.bb-cb-me { display:flex; align-items:center; justify-content:center; gap: 10px; margin-top: clamp(6px, 1.6vh, 14px); position:relative; z-index:3; }
.bb-cb-mechip { display:inline-flex; align-items:center; }
.bb-cb-mepill { margin-left:-14px; padding: 7px 18px 8px 22px; font-size: clamp(15px, 4.4vw, 20px); }
.bb-cb-divider { width:1.5px; height:34px; background: rgba(217,168,67,.8); }
.bb-cb-creampill { display:inline-flex; align-items:center; gap:6px; padding: 6px 16px 7px; font-family: Georgia, serif; font-weight:800; font-size: clamp(14px, 4vw, 18px); color:#3b2412 !important; white-space:nowrap;
  background: url(/games/clue/ui/cream-pill.webp) center / 100% 100% no-repeat; }
.bb-cb-creampill img { width: 1.4em; height: 1.4em; }
.bb-cb-stripwrap { position:relative; margin-top: clamp(4px, 1vh, 10px); display:flex; align-items:center; gap:4px; flex: 0 1 clamp(110px, 22vh, 210px) !important; min-height: 64px; overflow:hidden; }
.bb-cb-strip { flex:1; min-width:0; height:100%; min-height:0; display:flex; align-items:stretch; gap: 10px; overflow-x:auto; overflow-y:hidden; scroll-snap-type: x mandatory; padding: 2px 2px 6px; scrollbar-width:none; }
.bb-cb-strip::-webkit-scrollbar { display:none; }
.bb-cb-strip-empty { align-self:center; margin: 0 auto; padding: 4px 14px; border-radius:999px; background: rgba(255,248,232,.85); color:#6a4a22 !important; font-weight:800; font-size:13px; }
.bb-cb-won { position:relative; isolation:isolate; flex: 0 0 auto; height:100%; aspect-ratio: 6/7; scroll-snap-align:start; background: url(/games/clue/ui/won-card-frame.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 6px 10px rgba(0,0,0,.3)); }
.bb-cb-won-art { position:absolute; left:4.5%; right:4.5%; top:4%; height:64%; border-radius:9px; overflow:hidden; z-index:-1; background:#f3e3bd; }
.bb-cb-won-art .bb-clue-art { width:100%; height:100%; object-fit:cover; object-position: 50% 8%; }
.bb-cb-won-name { position:absolute; left:5%; right:5%; top:63%; line-height:1.15; letter-spacing:-.01em; text-align:center; font-family: Georgia, serif; font-weight:800; font-size: clamp(11px, 2.1vh, 17px); color:#2a1a0c !important; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; padding-top:2px; background: rgba(251,241,216,.96); border-radius: 8px 8px 0 0; }
.bb-cb-won-pts { position:absolute; left:50%; bottom:3%; transform:translateX(-50%); min-width: 52%; padding: 0 10px 1px; line-height:1.3; text-align:center; font-weight:900; font-size: clamp(11px, 3.2vw, 16px); color:#fff3cf !important; background: url(/games/clue/ui/win-ribbon.webp) center / 100% 100% no-repeat; text-shadow: 0 1px 2px rgba(0,0,0,.5); }
.bb-cb-arrow { flex:none; width: 34px; height:34px; padding:0; background:none; filter: drop-shadow(0 3px 5px rgba(0,0,0,.35)); }
.bb-cb-arrow img { width:100%; height:100%; }
.bb-cb-arrow.is-left img { transform: scaleX(-1); }
.bb-cb-overlay { position:relative; z-index:5; flex: 1 1 0 !important; min-height:0; overflow-y:auto; overscroll-behavior: contain; border-radius:18px; }
.bb-cb-overlay .bb-clue-panel { margin:0 auto; width:100%; }
.bb-cb-hand { position: relative; z-index: 30; width: min(100%, 620px); margin: 6px auto 4px;
  display:flex; gap:8px; align-items:center; padding: 12px 14px; background: url(/games/clue/ui/guess-bar.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 8px 16px rgba(0,0,0,.4)); }
.bb-cb-input { flex:1; min-width:0; height:48px; padding: 0 14px; border-radius:14px; background:#fffdf6 !important; color:#2a1a0c !important; font-family: Georgia, serif; font-size:17px; font-weight:600; box-shadow: inset 0 0 0 1.5px #d9a843; outline:none; }
.bb-cb-input::placeholder { color:#9a8466 !important; }
.bb-cb-input:focus { box-shadow: inset 0 0 0 2px #1d6a34; }
.bb-cb-input:disabled { opacity:.6; }
.bb-cb-guess { flex:none; height:50px; padding: 0 22px; font-family: Georgia, serif; font-weight:800; font-size:19px; color:#fff3cf !important; background: url(/games/clue/ui/guess-button.webp) center / 100% 100% no-repeat; text-shadow: 0 1px 2px rgba(0,0,0,.5); }
.bb-cb-wait { flex:none; height:50px; padding: 0 16px; font-family: Georgia, serif; font-weight:800; font-size:17px; color:#3b2412 !important; background: url(/games/clue/ui/wait-button.webp) center / 100% 100% no-repeat; }
.bb-cb-guess:disabled, .bb-cb-wait:disabled { opacity:.55; }
/* ---------- setup: book, chapters, level ---------- */
.bb-clue-setup-step { margin: 14px 0 6px; font-family: Georgia, serif; font-weight:800; font-size:15px; color:#173b23 !important; }
.bb-clue-setup-step:first-child { margin-top:0; }
.bb-clue-chapters { margin-top:8px; display:grid; grid-template-columns: repeat(auto-fill, minmax(38px, 1fr)); gap:5px; max-height: 30vh; overflow-y:auto; padding:2px; }
.bb-clue-chapters button { height:36px; border-radius:10px; font-weight:900; font-size:14px; color:#3b2412 !important; background:#f8ecd0; box-shadow: inset 0 0 0 1.5px #c99a46; }
.bb-clue-chapters button.is-on { color:#fff6d8 !important; background: linear-gradient(180deg,#2f8a4f,#1d6a34); box-shadow:none; }
.bb-clue-setup-summary { margin-top:14px; padding: 10px 12px; border-radius:14px; text-align:center; background: rgba(255,255,255,.5); box-shadow: inset 0 0 0 1.5px #d7b26b; font-size:15px; }
/* ---------- multiple choice (2026-11-22) ---------- */
.bb-cb-status { margin-top:3px; padding: 1px 9px; border-radius:999px; background: rgba(255,248,232,.9); color:#6a4a22 !important; font-weight:800; font-size: 11.5px; white-space:nowrap; box-shadow: 0 0 0 1px #d9a843; }
.bb-cb-status.is-locked { background:#e4f2df; color:#1d5a34 !important; box-shadow: 0 0 0 1px #5fa36f; }
.bb-cb-status.is-right { background:#1d6a34; color:#fff3cf !important; box-shadow:none; }
.bb-cb-status.is-wrong { background:#a3261b; color:#ffe7df !important; box-shadow:none; }
.bb-cb-question { font-size: clamp(15px, min(4.4vw, 3vh), 24px) !important; }
.bb-cb-tb { color:#a3261b !important; font-size: clamp(11px, 3.1vw, 14px); white-space:normal; text-align:center; }
.bb-cb.is-quiz .bb-cb-panel-head { white-space:normal; }
.bb-cb-howto { text-align:center; }
.bb-cb-howto-title { font-family: Georgia, serif; font-weight:800; font-size: clamp(15px, 4.2vw, 20px); color:#173b23 !important; }
.bb-cb-howto-text { margin-top:4px; font-family: Georgia, serif; font-weight:700; font-size: clamp(13px, 3.7vw, 17px); line-height:1.3; }
.bb-cb-howto-deal { margin-top:6px; font-weight:800; font-size: 12px; opacity:.65; }
.bb-cb-reveal { text-align:center; }
.bb-cb.is-quiz .bb-cb-answer { font-size: clamp(18px, 5.2vw, 28px); }
.bb-cb-explain { margin-top:4px; font-family: Georgia, serif; font-size: clamp(12px, 3.4vw, 15px); line-height:1.3; font-weight:600; }
.bb-cb-choices { position:relative; z-index:20; width: min(100%, 620px); margin: 10px auto 0; display:grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.bb-cb-choice { display:flex; align-items:center; gap:8px; min-height: 54px; padding: 6px 10px 6px 7px; border-radius:16px; text-align:left; cursor:pointer;
  background: linear-gradient(180deg,#fffaf0,#f3e1b8); color:#2a1a0c !important; box-shadow: inset 0 0 0 2px #d9a843, 0 5px 10px rgba(0,0,0,.28); transition: transform .12s, opacity .25s, filter .25s; }
.bb-cb-choice:not(:disabled):active { transform: scale(.97); }
.bb-cb-choice:disabled { cursor: default; }
.bb-cb-letter { flex:none; display:grid; place-items:center; width:32px; height:32px; border-radius:10px; background: linear-gradient(180deg,#2f8a4f,#1d6a34); color:#fff3cf !important; font-family: Georgia, serif; font-weight:900; font-size:17px; }
.bb-cb-choice-text { flex:1; min-width:0; font-family: Georgia, serif; font-weight:700; font-size: clamp(13.5px, 3.8vw, 17px); line-height:1.15; overflow-wrap:anywhere; }
.bb-cb-mark { flex:none; font-weight:900; font-size:20px; }
.bb-cb-choice.is-mine { background: linear-gradient(180deg,#fff1b8,#f2cf63); box-shadow: inset 0 0 0 3px #a8741f, 0 5px 10px rgba(0,0,0,.28); }
.bb-cb-choice.is-faded { opacity:.45; filter: grayscale(.4); }
.bb-cb-choice.is-right { opacity:1; filter:none; background: linear-gradient(180deg,#3c9c5c,#1d6a34); color:#fff8de !important; box-shadow: inset 0 0 0 3px #f6d36b, 0 0 18px rgba(246,211,107,.55); animation: bb-clue-bump .5s ease-out both; }
.bb-cb-choice.is-right .bb-cb-letter { background:#f6d36b; color:#2a1a0c !important; }
.bb-cb-choice.is-wrong { opacity:1; filter:none; background: linear-gradient(180deg,#c2473a,#8a2418); color:#ffe7df !important; box-shadow: inset 0 0 0 3px #f2a596; animation: bb-clue-shake .45s ease-in-out both; }
.bb-cb-choice.is-wrong .bb-cb-letter { background:#ffe7df; color:#8a2418 !important; }
.bb-cb-hint { grid-column: 1 / -1; text-align:center; margin-top:2px; font-weight:800; font-size: 12.5px; color:#fff3d2 !important; text-shadow: 0 1px 3px rgba(0,0,0,.85); }
.bb-cb-card .bb-clue-fallback-note { display:none; }
/* Trivia only (no cards): one big question panel in the middle of the table. */
.bb-cb.is-trivia .bb-cb-gap { flex: 1 1 0; min-height: 8px; }
.bb-cb.is-trivia .bb-cb-bottomgap { flex: .6 1 0; min-height: 6px; }
.bb-cb-bigpanel { order:0 !important; position:relative; z-index:4; width: min(100%, 620px); margin: 0 auto; box-sizing:border-box; min-height: clamp(170px, 30vh, 300px); padding: clamp(18px, 5vw, 30px) clamp(18px, 6vw, 36px); }
.bb-cb-bigpanel .bb-cb-question { font-size: clamp(20px, min(6.2vw, 3.6vh), 32px) !important; line-height:1.25; margin-top:10px; }
.bb-cb-bigpanel .bb-cb-panel-head { font-size: clamp(13px, 3.8vw, 17px); }
.bb-cb-bigpanel .bb-cb-answer { font-size: clamp(24px, 7vw, 36px) !important; }
.bb-cb-bigpanel .bb-cb-explain { font-size: clamp(14px, 4vw, 18px); margin-top:8px; }
.bb-cb-bigpanel .bb-cb-howto-text { font-size: clamp(16px, 4.6vw, 21px); }
.bb-cb-bigpanel .bb-cb-howto-deal { font-size: 14px; }
.bb-cb.is-trivia .bb-cb-choices { margin-top: 12px; }
.bb-cb.is-trivia .bb-cb-choice { min-height: 60px; }
.bb-cb.is-trivia .bb-cb-choice-text { font-size: clamp(15px, 4.2vw, 19px); }
.bb-cb.is-trivia .bb-cb-me { margin-top: 10px; }
.bb-cb.is-trivia .bb-cb-others .bb-cb-status { margin-top:4px; }
@media (max-height: 700px) { .bb-cb-bigpanel { min-height: 150px; } .bb-cb.is-trivia .bb-cb-choice { min-height: 50px; } }
.bb-cb-card .bb-clue-fallback { font-size: clamp(10px, 2.8vw, 14px); padding:4px; }
.bb-cb.is-quiz .bb-cb-stripwrap { flex-basis: clamp(70px, 14vh, 150px) !important; min-height: 56px; }
@media (max-height: 760px) {
  .bb-cb-choice { min-height: 46px; padding-top:4px; padding-bottom:4px; }
  .bb-cb-letter { width:28px; height:28px; font-size:15px; }
  .bb-cb.is-quiz .bb-cb-fan { display:none; }
}
@media (max-height: 760px) {
  .bb-cb-others .bb-cb-ring { width:46px !important; height:46px !important; }
  .bb-cb-me .bb-cb-ring { width:50px !important; height:50px !important; }
  .bb-cb-titles { margin-top:-54px; }
  .bb-cb-deckpill { font-size:15px; padding:3px 22px 4px; }
  .bb-cb-roundpill { font-size:12.5px; }
  .bb-cb-others { margin-top:8px; }
  .bb-cb-namepill { margin-top:-6px; }
  .bb-cb-hand { padding: 9px 12px; }
  .bb-cb-input, .bb-cb-guess, .bb-cb-wait { height:44px; }
}
@media (max-height: 600px) {
  .bb-cb-fan { display:none; }
  .bb-cb-others .bb-cb-ring { width:38px !important; height:38px !important; }
  .bb-cb-panel { min-height: 100px; }
  .bb-cb-clue { font-size: 16px; }
  .bb-cb-me .bb-cb-ring { width:42px !important; height:42px !important; }
  .bb-cb-mepill, .bb-cb-creampill { font-size:14px; }
}
@media (max-width: 380px) {
  .bb-cb-guess { padding: 0 14px; font-size:17px; }
  .bb-cb-wait { padding: 0 11px; font-size:15px; }
  .bb-cb-hand { padding: 10px 11px; gap:6px; }
}
/* ---------- the menu hero (Louis's mockup) ---------- */
.bb-clue-hero { position:relative; width: min(100%, 640px); margin: 8px auto 0; text-align:center; }
.bb-clue-herotitle { display:flex; align-items:center; justify-content:center; gap: 6px; }
.bb-clue-herotitle h1 { margin:0; font-size: clamp(44px, 13vw, 78px); line-height:1; font-weight:800; letter-spacing:.01em;
  color:#f8de96 !important; text-shadow: 0 1px 0 #fff4cf, 0 3px 0 #8a5518, 0 5px 0 #4e2c0c, 0 10px 18px rgba(0,0,0,.65) !important; }
.bb-clue-laurel { width: clamp(26px, 8vw, 46px); height:auto; flex:none; filter: drop-shadow(0 2px 3px rgba(0,0,0,.6)); }
.bb-clue-herorule { width: min(62%, 380px); height:3px; margin: 4px auto 0; border-radius:3px; background: linear-gradient(90deg, transparent, #f0c766, transparent); }
.bb-clue-herotag { margin: 8px 0 0; font-family: Georgia, serif; font-style: italic; font-weight:700; font-size: clamp(16px, 4.6vw, 24px); color:#fff3d2 !important; text-shadow: 0 2px 6px rgba(0,0,0,.85); }
.bb-clue-herotable { position:relative; margin-top: 14px; padding-bottom: 18px; }
.bb-clue-herofelt { position:absolute; left:50%; top: 22%; bottom:-24px; width: 150%; transform: translateX(-50%); border-radius: 50% 50% 0 0 / 120px 120px 0 0;
  background: radial-gradient(ellipse at 50% 0%, #2d6a3c 0%, #1c4a29 55%, #12331c 100%);
  box-shadow: 0 -10px 0 #6b3b17, 0 -14px 0 #3e200b, inset 0 18px 30px rgba(0,0,0,.45); }
.bb-clue-hero { overflow-x: clip; }
.bb-clue-herocards { position:relative; display:flex; align-items:center; justify-content:center; gap: 2%; }
.bb-clue-herocard { position:relative; width: min(34%, 26vh, 190px); aspect-ratio: 5/7; padding: 7%; border-radius: 14px;
  background: url(/games/clue/ui/card-face.webp) center / 100% 100% no-repeat; box-shadow: 0 16px 28px rgba(0,0,0,.55); display:flex; align-items:center; justify-content:center; }
.bb-clue-herocard { overflow:hidden; }
.bb-clue-herocard img { width:100%; height:100%; object-fit: contain; transform: scale(1.55); transform-origin: 50% 55%; }
.bb-clue-herocard.is-left { transform: rotate(-6deg); }
.bb-clue-herocard.is-right { transform: rotate(5deg); }
.bb-clue-heroarrow { width: min(16%, 96px); flex:none; margin: 0 -3%; position:relative; z-index:2; align-self: flex-start; margin-top: 18%; filter: drop-shadow(0 0 8px rgba(255,210,100,.7)); }
.bb-clue-heropanel { position:relative; margin: 16px auto 0 !important; width: min(100% - 16px, 470px); }
.bb-clue-titlegroup { position:relative; margin-top: 10px; }
.bb-clue-titlegroup .bb-clue-banner { margin-top:0; }
.bb-clue-titlegroup .bb-clue-ribbon { position:relative; z-index:2; margin-top: -3.2%; }
.bb-clue-menutable { position:relative; margin: 14px auto 0; width: min(100% - 8px, 560px); aspect-ratio: 2000/1200;
  background: url(/games/clue/ui/table.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 18px 26px rgba(0,0,0,.5)); }
.bb-clue-menutable .bb-clue-menufan { position:absolute; left:50%; top:50%; transform: translate(-50%,-46%); display:flex; justify-content:center; align-items:flex-end; }
.bb-clue-menutable .bb-clue-fancard { width: min(15.5vw, 86px); margin: 0 -7px; }
.bb-clue-fallback { width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:10px; text-align:center;
  background: radial-gradient(circle at 50% 35%, #fff8e6, #ead6a6); }
.bb-clue-fallback-icon { font-size: 2.2em; }
.bb-clue-fallback-name { font-family: Georgia, serif; font-weight:700; font-size:1.05em; color:#3b2412; }
.bb-clue-thumb .bb-clue-fallback-note { display:none; }
.bb-clue-thumb .bb-clue-fallback { font-size:11px; }
.bb-clue-fallback-note { font-size:.7em; font-weight:800; color:#8a6a3a; text-transform:uppercase; letter-spacing:.08em; }
.bb-clue-panel { margin: 10px auto 0; width:min(100% - 24px, 520px); }
.bb-clue-pointsbadge { display:inline-flex; align-items:center; gap:6px; padding:7px 26px; color:#fff3c8; font-family:Georgia,serif; font-weight:700; font-size:17px;
  background: url(/games/clue/ui/button-green.webp) center / 100% 100% no-repeat; text-shadow: 0 2px 0 rgba(0,0,0,.35); }
.bb-clue-timerpill { display:inline-flex; align-items:center; gap:6px; padding:6px 24px; color:#3b2412; font-weight:900; font-size:17px; font-variant-numeric: tabular-nums;
  background: url(/games/clue/ui/button-cream.webp) center / 100% 100% no-repeat; }
.bb-clue-timerpill.is-final { color:#b4321e !important; animation: bb-clue-pulse .5s ease-in-out infinite alternate; }
@keyframes bb-clue-pulse { to { transform: scale(1.08); } }
.bb-clue-thumb { flex:none; width:78px; aspect-ratio:5/7; border-radius:10px; overflow:hidden; background: url(/games/clue/ui/card-face.webp) center / 100% 100% no-repeat; box-shadow: 0 4px 10px rgba(0,0,0,.25); display:grid; place-items:center; }
.bb-clue-thumb .bb-clue-art { object-fit:contain; padding:6px; }
.bb-clue-thumb.is-color .bb-clue-art { object-fit:cover; padding:0; }
.bb-clue-cluetext { font-family: Georgia, serif; font-size: clamp(17px, 4.6vw, 21px); line-height:1.3; text-align:center; color:#2a1a0c !important; }
.bb-clue-input { flex:1; min-width:0; height:52px; padding:0 16px; border-radius:16px; background:#fffaf0 !important; color:#2a1a0c !important; font-size:17px; font-weight:600;
  border:none; outline:none; box-shadow: inset 0 0 0 2px #c99a46; }
.bb-clue-input::placeholder { color:#9a8466 !important; }
.bb-clue-input:focus { box-shadow: inset 0 0 0 2px #2f8a4f; }
.bb-clue-input:disabled { opacity:.55; }
.bb-clue-wait { width:100%; margin-top:8px; padding:8px; border-radius:12px; font-size:14px; font-weight:800; color:#6a4a22; background: rgba(255,255,255,.35); }
.bb-clue-wait:disabled { opacity:.5; }
.bb-clue-progress { height:10px; border-radius:999px; background:#e6d3a8; overflow:hidden; box-shadow: inset 0 0 0 1px #c99a46; }
.bb-clue-progress > span { display:block; height:100%; background: linear-gradient(90deg,#2f8a4f,#56b36f); transform-origin:left; }
.bb-clue-refpill { display:inline-block; padding:6px 26px; color:#3b2412; font-weight:800; font-family: Georgia, serif; background: url(/games/clue/ui/name-shield.webp) center / 100% 100% no-repeat; }
.bb-clue-link { display:inline-flex; align-items:center; gap:6px; color:#1d5a34; font-weight:800; text-decoration: underline; text-underline-offset:3px; }
.bb-clue-title { font-size: clamp(30px, 8vw, 40px); font-weight:700; color:#173b23; text-align:center; line-height:1.05; }
.bb-clue-note { position:relative; margin-top:14px; padding:18px 14px 12px; border-radius:14px; border:1.5px solid #c99a46; background: rgba(255,255,255,.45); text-align:left; }
.bb-clue-note p { font-family: Georgia, serif; font-size:16px; line-height:1.45; }
.bb-clue-note-tag { position:absolute; top:-12px; left:12px; padding:3px 12px; border-radius:999px; background:#1f5a34; color:#fff3c8 !important; font-size:13px; font-weight:800; font-family: Georgia, serif; }
.bb-clue-study { width:min(100%, 460px); max-height: calc(100dvh - 40px); overflow-y:auto; }
.bb-clue-study-x { position:absolute; right:12px; top:12px; }
.bb-clue-study-art { margin: 10px auto 0; width: min(62%, 240px); aspect-ratio: 5/7; border-radius:14px; overflow:hidden; box-shadow: 0 0 0 2px #c99a46; background:#fff8e6; }
.bb-clue-study-art .bb-clue-art { object-fit:cover; }
.bb-clue-studyclue { display:flex; gap:8px; align-items:flex-start; font-size:14px; line-height:1.35; }
.bb-clue-pts { flex:none; display:grid; place-items:center; width:22px; height:22px; border-radius:7px; background:#1f5a34; color:#fff3c8 !important; font-size:12px; font-weight:900; }
.bb-clue-ref { margin-left:4px; padding:0 8px; border-radius:999px; background:#e9f1dc; color:#1d5a34; font-size:12px; font-weight:800; text-decoration:underline; text-underline-offset:2px; }
.bb-clue-sheetwrap { position:fixed; inset:0; z-index:9999; display:flex; align-items:flex-end; justify-content:center; background: rgba(20,10,4,.6); padding:0; }
.bb-clue-sheetwrap.is-center { align-items:center; padding:16px; }
.bb-clue-sheet { width:100%; max-width:560px; padding:18px 18px calc(18px + env(safe-area-inset-bottom)); border-radius:22px 22px 0 0; background:#fbf2dc; color:#2a1a0c; }
.bb-clue-x { display:grid; place-items:center; width:34px; height:34px; border-radius:999px; background: rgba(59,36,18,.12); font-weight:900; color:#3b2412; }
.bb-clue-flash { position:fixed; left:50%; top: calc(76px + env(safe-area-inset-top)); transform:translateX(-50%); z-index:50; padding:8px 16px; border-radius:999px;
  font-weight:900; font-size:15px; white-space:nowrap; animation: bb-clue-flash 2.2s ease both; box-shadow: 0 8px 20px rgba(0,0,0,.35); }
.bb-clue-flash.is-wrong { background:#8a2418; color:#ffe7df !important; }
.bb-clue-flash.is-right { background:#f6d36b; color:#3b2412 !important; font-size:20px; }
@keyframes bb-clue-flash { 0% { opacity:0; transform:translate(-50%,6px); } 12% { opacity:1; transform:translate(-50%,0); } 80% { opacity:1; } 100% { opacity:0; } }
.bb-clue-deal { animation: bb-clue-deal .55s cubic-bezier(.2,.8,.2,1) both; }
@keyframes bb-clue-fadein { from { opacity:.45; transform: translateY(4px); } to { opacity:1; transform:none; } }
.bb-clue-fadein { animation: bb-clue-fadein .35s ease-out both; }
@keyframes bb-clue-deal { from { transform: translate(90%, 0) rotate(8deg) scale(.9); opacity:1; } to { transform:none; opacity:1; } }
.bb-clue-award { animation: bb-clue-award .75s cubic-bezier(.5,0,.75,0) forwards; }
@keyframes bb-clue-award { 0% { transform:none; } 100% { transform: translate(var(--dx,0px), var(--dy,-120px)) scale(.25) rotate(-12deg); opacity:.15; } }
.bb-clue-tile { position:relative; border-radius:16px; padding:6px; text-align:center; color:#fff3c8; box-shadow: 0 0 0 2px #d8a84a, 0 6px 14px rgba(0,0,0,.3); }
.bb-clue-tile.is-off { filter: grayscale(1) brightness(.92); opacity:.85; }
.bb-clue-tile.is-on { box-shadow: 0 0 0 3px #f6d36b, 0 0 24px rgba(246,211,107,.55); }
.bb-clue-tile-name { font-family: Georgia, serif; font-weight:700; font-size:clamp(15px,4.2vw,19px); padding:4px 0 6px; }
.bb-clue-tile-body { display:grid; place-items:center; aspect-ratio: 4/3; border-radius:12px; background: rgba(255,255,255,.12); font-size:34px; overflow:hidden; }
.bb-clue-tile-foot { margin:6px auto 0; padding:5px 14px; white-space:nowrap; color:#3b2412 !important; font-size:12px; font-weight:800; font-style:italic; display:inline-block; font-family: Georgia, serif;
  background: url(/games/clue/ui/name-shield.webp) center / 100% 100% no-repeat; }
.bb-clue-tabs { display:flex; padding:4px; border-radius:999px; background:#f2e0b4; box-shadow: 0 0 0 2px #c99a46; }
.bb-clue-tabs button { flex:1; padding:8px 6px; border-radius:999px; font-family: Georgia, serif; font-weight:700; font-size:15px; color:#3b2412; }
.bb-clue-tabs button.is-on { background: linear-gradient(180deg,#2f8a4f,#1a5a33); color:#fff3c8; }
.bb-clue-code { font-family: ui-monospace, Menlo, monospace; font-size: clamp(34px, 11vw, 52px); font-weight:900; letter-spacing:.18em; color:#173b23; }
@media (prefers-reduced-motion: reduce) {
  .bb-clue-card-inner, .bb-clue-deal, .bb-clue-fadein, .bb-clue-pop, .bb-clue-seatplate, .bb-clue-avatarwrap, .bb-clue-shuffle-card, .bb-clue-intro-fly, .bb-clue-flipin, .bb-clue-flipcover, .bb-clue-award, .bb-clue-flash, .bb-clue-timerpill { animation:none !important; transition:none !important; }
}
`;
