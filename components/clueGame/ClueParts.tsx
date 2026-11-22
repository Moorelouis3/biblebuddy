"use client";

/**
 * Bible Clue Game: the pieces every screen shares (card faces, silhouettes,
 * Study This Card, the Scripture sheet, the room frame) and the game's CSS.
 *
 * The game has its own warm library room and green felt, so it uses its own
 * bb-clue-* classes and inline colours, never the bg-white / text-slate
 * utilities the Bible Covers repaint.
 */

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import type { PublicCard } from "@/lib/clueGame/engine";
import type { ClueCategory, ClueRef } from "@/lib/clueGame/types";
import { kjvStaticUrl } from "@/lib/chapterStaticData";
import { ref as parseRef } from "@/lib/clueGame/ref";
import { clueSound, primeClueSound, setSoundOn, soundOn } from "@/lib/clueGame/sound";

export const CATEGORY_LABEL: Record<ClueCategory, string> = { person: "Person", place: "Place", keyword: "Keyword" };

export function initials(name: string) {
  const parts = String(name || "?").trim().split(/\s+/);
  return ((parts[0]?.[0] || "?") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

/** A seat's face: the Bible Buddy profile photo, or initials. */
export function Avatar({ name, src, size = 52 }: { name: string; src?: string | null; size?: number }) {
  const [broken, setBroken] = useState(false);
  return (
    <span className="bb-clue-avatar" style={{ width: size, height: size, fontSize: size * 0.36 }}>
      {src && !broken ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" onError={() => setBroken(true)} />
      ) : (
        initials(name)
      )}
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
        <div className="bb-clue-study-art">
          <SubjectArt card={card} mode="reveal" />
        </div>
        {card.teaching ? (
          <div className="bb-clue-note">
            <span className="bb-clue-note-tag">Teaching Note</span>
            <p>{card.teaching}</p>
          </div>
        ) : null}
        <ol className="mt-3 space-y-1.5 text-left">
          {(card.clues || []).map((c, i) => (
            <li key={i} className="bb-clue-studyclue">
              <span className="bb-clue-pts">{5 - i}</span>
              <span className="min-w-0">
                {c.text}{" "}
                <button type="button" className="bb-clue-ref" onClick={() => onOpenRef(c.ref)}>
                  {c.ref.label}
                </button>
              </span>
            </li>
          ))}
        </ol>
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
export function SoundToggle() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    // Read the saved choice after mount (localStorage is not there on the server).
    const id = window.setTimeout(() => setOn(soundOn()), 0);
    return () => window.clearTimeout(id);
  }, []);
  return (
    <button
      type="button"
      className="bb-clue-round"
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      aria-pressed={on}
      onClick={() => {
        setSoundOn(!on);
        setOn(!on);
        if (!on) clueSound.tap();
      }}
    >
      {on ? "🔊" : "🔇"}
    </button>
  );
}

export function ClueRoomFrame({ children }: { children: ReactNode }) {
  useEffect(() => primeClueSound(), []);
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
}: {
  onBack?: () => void;
  backHref?: string;
  subtitle?: string;
  badge?: string;
  right?: ReactNode;
}) {
  return (
    <header className="bb-clue-header">
      <div className="bb-clue-header-side">
        {onBack ? (
          <button type="button" onClick={onBack} className="bb-clue-round" aria-label="Back">←</button>
        ) : backHref ? (
          <Link href={backHref} className="bb-clue-round" aria-label="Back">←</Link>
        ) : null}
      </div>
      <div className="bb-clue-logo">
        <span className="bb-clue-logo-book" aria-hidden="true">📖</span>
        <span className="bb-clue-serif bb-clue-logo-text">Bible Buddy</span>
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
.bb-clue-room { position:relative; min-height:100dvh; color:#3b2412; overflow-x:hidden;
  background:
    radial-gradient(60% 40% at 85% 30%, rgba(255,170,70,.35), transparent 70%),
    radial-gradient(50% 35% at 12% 18%, rgba(255,214,150,.28), transparent 70%),
    linear-gradient(180deg, #4a2c17 0%, #2e1a0d 55%, #1f1209 100%); }
.bb-clue-room :is(h1,h2,h3,p,li,label) { color: inherit; }
.bb-clue-serif { font-family: Georgia, "Times New Roman", serif; }
.bb-clue-header { display:flex; align-items:center; justify-content:space-between; gap:8px; padding: calc(10px + env(safe-area-inset-top)) 14px 6px; color:#fff3dc; }
.bb-clue-header-side { width:96px; display:flex; gap:8px; }
.bb-clue-header-side.is-right { justify-content:flex-end; }
.bb-clue-round { display:grid; place-items:center; width:42px; height:42px; border-radius:999px; font-size:20px; font-weight:900; color:#fff3dc;
  background: radial-gradient(circle at 50% 35%, #2f6b3f, #163b22); box-shadow: 0 0 0 2px #d8a84a, 0 4px 10px rgba(0,0,0,.4); }
.bb-clue-logo { display:flex; flex-direction:column; align-items:center; line-height:1; }
.bb-clue-logo-book { display:none; }
.bb-clue-logo-text { font-size:22px; font-weight:700; color:#fff1c9; text-shadow: 0 2px 0 #7a4a12, 0 3px 8px rgba(0,0,0,.5); }
.bb-clue-logo-pill { margin-top:4px; padding:3px 14px; border-radius:999px; background:#1f5a34; color:#fff1c9; font-size:12px; font-weight:800; box-shadow: 0 0 0 2px #d8a84a; }
.bb-clue-logo-badge { margin-top:4px; padding:2px 12px; border-radius:999px; background:#f3e2b8; color:#4a2c12; font-size:11px; font-weight:900; box-shadow: 0 0 0 1px #b8863a; }
.bb-clue-banner { margin: 8px auto 0; padding: 12px 26px; border-radius:16px; text-align:center; color:#fff3c8;
  background: linear-gradient(180deg,#2c7a45,#175131); box-shadow: 0 0 0 3px #d8a84a, 0 8px 20px rgba(0,0,0,.45); }
.bb-clue-banner h1 { font-size: clamp(24px, 7vw, 34px); font-weight:700; line-height:1.05; text-shadow: 0 2px 0 rgba(0,0,0,.35); }
.bb-clue-ribbon { display:inline-block; margin-top:8px; padding:5px 16px; border-radius:999px; background:#f6e7c1; color:#3b2412; font-size:13px; font-weight:700; box-shadow: 0 0 0 2px #c99a46; }
.bb-clue-parchment { position:relative; border-radius:22px; padding:18px; color:#3b2412;
  background: linear-gradient(180deg,#fbf2dc,#f1e1bb); box-shadow: 0 0 0 3px #d7b26b, inset 0 0 0 6px rgba(255,255,255,.35), 0 16px 34px rgba(0,0,0,.45); }
.bb-clue-btn { display:inline-flex; align-items:center; justify-content:center; gap:10px; min-height:52px; padding:0 22px; border-radius:16px;
  font-weight:900; font-size:17px; color:#3b2412; background: linear-gradient(180deg,#fff4d6,#efd9a6); box-shadow: 0 0 0 2px #c99a46, 0 4px 0 #a87a2c; }
.bb-clue-btn-green { color:#fff3c8 !important; background: linear-gradient(180deg,#2f8a4f,#1a5a33); box-shadow: 0 0 0 3px #e2b85a, 0 4px 0 #0f3a20; font-family: Georgia, serif; }
.bb-clue-btn:disabled { opacity:.5; }
.bb-clue-btn-big { min-height:60px; font-size:22px; width:100%; }
.bb-clue-felt { position:relative; margin: 34px auto 0; width:min(100% - 16px, 520px); aspect-ratio: 1.6/1; border-radius: 50% / 42%;
  background: radial-gradient(70% 60% at 50% 45%, #2f7a47 0%, #1e5a34 60%, #154327 100%);
  box-shadow: inset 0 0 0 10px #6b3f1c, inset 0 0 0 13px #4a2a12, inset 0 14px 40px rgba(0,0,0,.45), 0 18px 40px rgba(0,0,0,.5); }
.bb-clue-seat { position:absolute; display:flex; flex-direction:column; align-items:center; gap:2px; transform: translate(-50%,-50%); z-index:3; }
.bb-clue-avatar { display:grid; place-items:center; flex:none; border-radius:999px; overflow:hidden; background:#7a4a20; color:#fff3dc; font-weight:900;
  box-shadow: 0 0 0 3px #d8a84a, 0 4px 10px rgba(0,0,0,.45); }
.bb-clue-avatar img { width:100%; height:100%; object-fit:cover; }
.bb-clue-seatplate { display:flex; align-items:center; gap:6px; padding:2px 10px; border-radius:999px; background: rgba(40,22,10,.85); color:#fff3dc;
  font-size:12px; font-weight:800; box-shadow: 0 0 0 1.5px #d8a84a; white-space:nowrap; }
.bb-clue-seat.is-you .bb-clue-avatar { box-shadow: 0 0 0 3px #f6d36b, 0 0 18px rgba(246,211,107,.6); }
.bb-clue-pilecount { display:inline-grid; place-items:center; min-width:20px; height:22px; padding:0 4px; border-radius:5px; background:#fff3dc; color:#3b2412; font-size:11px; font-weight:900; box-shadow: 2px -2px 0 #e2cfa2, 4px -4px 0 #cdb680; }
.bb-clue-center { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); display:flex; align-items:center; gap: 6%; width:70%; justify-content:center; z-index:2; }
.bb-clue-card { position:relative; width: min(22vw, 120px); aspect-ratio: 5/7; perspective: 1000px; flex:none; }
.bb-clue-card-inner { position:absolute; inset:0; transform-style:preserve-3d; transition: transform .7s cubic-bezier(.3,.7,.2,1); }
.bb-clue-card.is-revealed .bb-clue-card-inner { transform: rotateY(180deg); }
.bb-clue-card-face { position:absolute; inset:0; border-radius:10px; overflow:hidden; backface-visibility:hidden; -webkit-backface-visibility:hidden;
  background: linear-gradient(180deg,#fbf2dc,#efdcae); box-shadow: 0 0 0 2px #c99a46, 0 10px 22px rgba(0,0,0,.45); display:flex; flex-direction:column; }
.bb-clue-card-reveal { transform: rotateY(180deg); }
.bb-clue-card-art { flex:1; display:grid; place-items:center; overflow:hidden; padding:8%; }
.bb-clue-card-art.is-color { padding:0; }
.bb-clue-art { width:100%; height:100%; object-fit:contain; }
.bb-clue-card-art.is-color .bb-clue-art { object-fit:cover; }
.bb-clue-art.is-mystery { filter: drop-shadow(0 2px 0 rgba(255,255,255,.35)); }
.bb-clue-sil { width:78%; color:#3a2815; }
.bb-clue-card-cat, .bb-clue-card-name { padding:5px 2px 6px; text-align:center; font-family: Georgia, serif; font-weight:700; color:#3b2412; font-size: clamp(10px, 2.6vw, 13px); letter-spacing:.08em; }
.bb-clue-card-name { letter-spacing:0; font-size: clamp(11px, 3vw, 15px); font-style:italic; }
.bb-clue-back-img { width:100%; height:100%; object-fit:cover; }
.bb-clue-back-plain { width:100%; height:100%; background: radial-gradient(circle,#2f7a47,#123a22); }
.bb-clue-drawpile { position:relative; width: min(17vw, 92px); aspect-ratio:5/7; flex:none; }
.bb-clue-drawpile > div { position:absolute; inset:0; border-radius:9px; overflow:hidden; box-shadow: 0 0 0 1.5px #c99a46, 0 6px 14px rgba(0,0,0,.4); }
.bb-clue-fallback { width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; padding:10px; text-align:center;
  background: radial-gradient(circle at 50% 35%, #fff8e6, #ead6a6); }
.bb-clue-fallback-icon { font-size: 2.2em; }
.bb-clue-fallback-name { font-family: Georgia, serif; font-weight:700; font-size:1.05em; color:#3b2412; }
.bb-clue-thumb .bb-clue-fallback-note { display:none; }
.bb-clue-thumb .bb-clue-fallback { font-size:11px; }
.bb-clue-fallback-note { font-size:.7em; font-weight:800; color:#8a6a3a; text-transform:uppercase; letter-spacing:.08em; }
.bb-clue-panel { margin: 10px auto 0; width:min(100% - 24px, 520px); }
.bb-clue-pointsbadge { display:inline-flex; align-items:center; gap:6px; padding:6px 16px; border-radius:999px; background: linear-gradient(180deg,#2f8a4f,#1a5a33); color:#fff3c8; font-family:Georgia,serif; font-weight:700; font-size:19px; box-shadow: 0 0 0 2px #e2b85a; }
.bb-clue-timerpill { display:inline-flex; align-items:center; gap:6px; padding:5px 16px; border-radius:999px; background:#fff8e6; color:#3b2412; font-weight:900; font-size:19px; box-shadow: 0 0 0 2px #c99a46; font-variant-numeric: tabular-nums; }
.bb-clue-timerpill.is-final { color:#b4321e !important; animation: bb-clue-pulse .5s ease-in-out infinite alternate; }
@keyframes bb-clue-pulse { to { transform: scale(1.08); } }
.bb-clue-thumb { flex:none; width:78px; aspect-ratio:5/7; border-radius:10px; overflow:hidden; background: linear-gradient(180deg,#fff8e6,#ecd9ab); box-shadow: 0 0 0 2px #c99a46; display:grid; place-items:center; }
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
.bb-clue-refpill { display:inline-block; padding:4px 16px; border-radius:999px; background:#f6e7c1; color:#3b2412; font-weight:800; box-shadow: 0 0 0 1.5px #c99a46; }
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
@keyframes bb-clue-deal { from { transform: translate(90%, 0) rotate(8deg) scale(.9); opacity:.6; } to { transform:none; opacity:1; } }
.bb-clue-award { animation: bb-clue-award .75s cubic-bezier(.5,0,.75,0) forwards; }
@keyframes bb-clue-award { 0% { transform:none; } 100% { transform: translate(var(--dx,0px), var(--dy,-120px)) scale(.25) rotate(-12deg); opacity:.15; } }
.bb-clue-tile { position:relative; border-radius:16px; padding:6px; text-align:center; color:#fff3c8; box-shadow: 0 0 0 2px #d8a84a, 0 6px 14px rgba(0,0,0,.3); }
.bb-clue-tile.is-off { filter: grayscale(1) brightness(.92); opacity:.85; }
.bb-clue-tile.is-on { box-shadow: 0 0 0 3px #f6d36b, 0 0 24px rgba(246,211,107,.55); }
.bb-clue-tile-name { font-family: Georgia, serif; font-weight:700; font-size:clamp(15px,4.2vw,19px); padding:4px 0 6px; }
.bb-clue-tile-body { display:grid; place-items:center; aspect-ratio: 4/3; border-radius:12px; background: rgba(255,255,255,.12); font-size:34px; overflow:hidden; }
.bb-clue-tile-foot { margin:6px auto 0; padding:3px 12px; border-radius:999px; background:#f6e7c1; color:#3b2412 !important; font-size:13px; font-weight:800; font-style:italic; display:inline-block; }
.bb-clue-tabs { display:flex; padding:4px; border-radius:999px; background:#f2e0b4; box-shadow: 0 0 0 2px #c99a46; }
.bb-clue-tabs button { flex:1; padding:8px 6px; border-radius:999px; font-family: Georgia, serif; font-weight:700; font-size:15px; color:#3b2412; }
.bb-clue-tabs button.is-on { background: linear-gradient(180deg,#2f8a4f,#1a5a33); color:#fff3c8; }
.bb-clue-code { font-family: ui-monospace, Menlo, monospace; font-size: clamp(34px, 11vw, 52px); font-weight:900; letter-spacing:.18em; color:#173b23; }
@media (prefers-reduced-motion: reduce) {
  .bb-clue-card-inner, .bb-clue-deal, .bb-clue-fadein, .bb-clue-award, .bb-clue-flash, .bb-clue-timerpill { animation:none !important; transition:none !important; }
}
`;
