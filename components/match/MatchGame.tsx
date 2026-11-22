"use client";

/**
 * Bible Buddy Match: an original match-three game inside Bible Buddy, built
 * from the starter kit (Louis, 2026-11-22). This pass: two boards, Creation
 * (Genesis 1) and the Garden of Eden (Genesis 2-3).
 *
 *   Home  -> Play opens the Genesis map at the latest unlocked board; the
 *            label says which board that is. Back returns to the Games page.
 *   Map   -> one winding trail drawn in code over the two backdrops: Creation
 *            at the bottom, Eden one screen above. Your photo is the marker.
 *            The first Creation win unlocks Eden and walks you there.
 *   Board -> components/match/MatchBoard.tsx (rules in lib/match/engine.ts).
 *
 * Progress lives on the device (localStorage, bb:match:progress), like the
 * other games' local progress, so it survives a refresh.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { MATCH_LEVELS, type MatchLevel } from "@/lib/match/engine";
import { supabase } from "@/lib/supabaseClient";
import MatchBoard from "./MatchBoard";
import { MATCH_CSS } from "./matchCss";

type Progress = { unlocked: number; done: string[]; best: Record<string, number>; travel: boolean };
const KEY = "bb:match:progress";
const START: Progress = { unlocked: 1, done: [], best: {}, travel: false };

function load(): Progress {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return START;
    const p = JSON.parse(raw) as Partial<Progress>;
    return { ...START, ...p, done: Array.isArray(p.done) ? p.done : [], best: p.best || {} };
  } catch {
    return START;
  }
}
function save(p: Progress) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // private mode: progress lasts this visit only
  }
}

type Screen = { name: "home" } | { name: "map" } | { name: "board"; level: MatchLevel };

export default function MatchGame() {
  const [progress, setProgress] = useState<Progress>(START);
  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setProgress(load());
      setReady(true);
    }, 0);
    void (async () => {
      const { data } = await supabase.auth.getUser();
      const uid = data.user?.id;
      if (!uid) return;
      const { data: row } = await supabase.from("profile_stats").select("profile_image_url").eq("user_id", uid).maybeSingle();
      if (row?.profile_image_url) setAvatar(row.profile_image_url as string);
    })();
    return () => window.clearTimeout(id);
  }, []);

  // The game owns the screen: the app's menu and top bar step aside.
  useLayoutEffect(() => {
    document.documentElement.classList.add("bb-game-screen");
    return () => document.documentElement.classList.remove("bb-game-screen");
  }, []);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    setProgress((p) => {
      const next = fn(p);
      save(next);
      return next;
    });
  }, []);

  const latest = MATCH_LEVELS[Math.min(progress.unlocked, MATCH_LEVELS.length) - 1];
  const allDone = MATCH_LEVELS.every((l) => progress.done.includes(l.id));

  return (
    <div className="bbm-root">
      <style>{MATCH_CSS}</style>
      {screen.name === "home" ? (
        <Home label={allDone ? "Genesis · Creation to Eden ✓" : `Genesis · ${latest.title}`} onPlay={() => setScreen({ name: "map" })} ready={ready} />
      ) : screen.name === "map" ? (
        <GenesisMap
          progress={progress}
          avatar={avatar}
          onBack={() => setScreen({ name: "home" })}
          onOpen={(level) => setScreen({ name: "board", level })}
          onTravelled={() => update((p) => ({ ...p, travel: false }))}
        />
      ) : (
        <MatchBoard
          key={screen.level.id}
          level={screen.level}
          isLastLevel={screen.level.number === MATCH_LEVELS.length}
          onWin={(score) =>
            update((p) => {
              const first = !p.done.includes(screen.level.id);
              const unlockNext = screen.level.number >= p.unlocked && screen.level.number < MATCH_LEVELS.length;
              return {
                ...p,
                done: first ? [...p.done, screen.level.id] : p.done,
                best: { ...p.best, [screen.level.id]: Math.max(p.best[screen.level.id] || 0, score) },
                unlocked: unlockNext ? screen.level.number + 1 : p.unlocked,
                travel: unlockNext ? true : p.travel,
              };
            })
          }
          onExit={() => setScreen({ name: "map" })}
        />
      )}
    </div>
  );
}

/* ---------------- home ---------------- */

/**
 * The home screen is Louis's own art (Drive: Bible-Buddy-Match-Main-Screen,
 * 1024x1536). Back, Play and settings are tappable spots on the picture; the
 * level label is live text laid over the art's plaque so it can say Eden.
 * On a wide screen the picture stands in the middle over a blurred copy.
 */
function Home({ label, onPlay, ready }: { label: string; onPlay: () => void; ready: boolean }) {
  const [settings, setSettings] = useState(false);
  const [sound, setSound] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        setSound(window.localStorage.getItem("bb:clue-sound") !== "off");
      } catch {}
    }, 0);
    return () => window.clearTimeout(id);
  }, []);
  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    try {
      window.localStorage.setItem("bb:clue-sound", next ? "on" : "off");
    } catch {}
  };
  return (
    <div className="bbm-home2">
      <div className="bbm-home2-blur" aria-hidden="true" />
      <div className="bbm-home2-art">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/games/match/home-phone.webp" alt="Bible Buddy Match: Buddy on the path through Eden with sun, moon, star and tree tiles" />
        <Link href="/bible-study-games" className="bbm-hot" style={{ left: "4.5%", top: "2.5%", width: "10%", height: "7%" }} aria-label="Back to Bible Buddy" />
        <button type="button" className="bbm-hot" style={{ left: "85%", top: "2.5%", width: "10%", height: "7%" }} aria-label="Settings" onClick={() => setSettings(true)} />
        <button type="button" className="bbm-hot is-play" style={{ left: "17%", top: "74%", width: "66%", height: "15%" }} aria-label="Play" onClick={onPlay} disabled={!ready} />
        <span className="bbm-home2-label" style={{ left: "25%", top: "90.6%", width: "50%", height: "5.8%" }}>
          {label}
        </span>
      </div>
      {settings ? (
        <div className="bbm-panelwrap" role="dialog" aria-modal="true" onClick={() => setSettings(false)}>
          <div className="bbm-panel" onClick={(e) => e.stopPropagation()}>
            <h2>Settings</h2>
            <button type="button" className="bbm-btn-cream" onClick={toggleSound}>
              Sound: {sound ? "On" : "Off"}
            </button>
            <button type="button" className="bbm-btn-green" onClick={() => setSettings(false)}>
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ---------------- the Genesis map ---------------- */

// The trail in a 100 x 200 box: the bottom half is Creation's coast, the top
// half the garden. Creation's medallion sits low, Eden's one screen above.
const TRAIL = "M 52 200 C 30 192, 70 178, 50 166 C 30 156, 26 140, 52 130 C 78 120, 80 104, 56 96 C 30 88, 28 74, 50 64 C 72 54, 76 36, 56 24 C 40 14, 48 4, 50 0";
const SPOTS = [
  { x: 50, y: 166 },
  { x: 50, y: 64 },
];

function GenesisMap({
  progress,
  avatar,
  onBack,
  onOpen,
  onTravelled,
}: {
  progress: Progress;
  avatar: string | null;
  onBack: () => void;
  onOpen: (level: MatchLevel) => void;
  onTravelled: () => void;
}) {
  const scroller = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [marker, setMarker] = useState<{ x: number; y: number } | null>(null);
  const [walking, setWalking] = useState(false);
  const [arrived, setArrived] = useState<string | null>(null);
  const skip = useRef(false);
  const travel = progress.travel && progress.unlocked >= 2;
  const allDone = MATCH_LEVELS.every((l) => progress.done.includes(l.id));

  /** Where along the trail each medallion is. */
  const lengthAt = useCallback((spot: { x: number; y: number }) => {
    const p = pathRef.current;
    if (!p) return 0;
    const total = p.getTotalLength();
    let best = 0;
    let bestD = Infinity;
    for (let l = 0; l <= total; l += 0.5) {
      const pt = p.getPointAtLength(l);
      const d = (pt.x - spot.x) ** 2 + (pt.y - spot.y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = l;
      }
    }
    return best;
  }, []);

  const scrollToY = (yUnits: number, smooth: boolean) => {
    const el = scroller.current;
    if (!el) return;
    const content = el.scrollHeight;
    const top = (yUnits / 200) * content - el.clientHeight / 2;
    el.scrollTo({ top: Math.max(0, top), behavior: smooth ? "smooth" : "auto" });
  };

  // Place the marker and the camera; walk to Eden after the first Creation win.
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const here = SPOTS[Math.min(progress.unlocked, SPOTS.length) - 1];
    if (!travel) {
      const id = window.setTimeout(() => {
        setMarker(here);
        scrollToY(here.y, false);
      }, 0);
      return () => window.clearTimeout(id);
    }
    const from = lengthAt(SPOTS[0]);
    const to = lengthAt(SPOTS[1]);
    let raf = 0;
    const startAt = performance.now() + 700; // a beat on Creation's completed medallion first
    const dur = reduced ? 0 : 2800;
    const first = window.setTimeout(() => {
      setMarker(SPOTS[0]);
      scrollToY(SPOTS[0].y, false);
      setWalking(true);
    }, 0);
    const tick = (now: number) => {
      const t = dur === 0 || skip.current ? 1 : Math.min(1, Math.max(0, (now - startAt) / dur));
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      const pt = p.getPointAtLength(from + (to - from) * eased);
      setMarker({ x: pt.x, y: pt.y });
      scrollToY(pt.y, false);
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setWalking(false);
        setArrived("eden");
        onTravelled();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.clearTimeout(first);
      cancelAnimationFrame(raf);
    };
    // Runs when the map opens (and once per unlock).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travel]);

  return (
    <div className="bbm-map">
      <div className="bbm-topbar">
        <button type="button" className="bbm-roundbtn" onClick={onBack} aria-label="Back">
          ←
        </button>
        <div className="bbm-ribbon">Genesis</div>
        <span className="bbm-roundbtn is-spacer" />
      </div>
      <div ref={scroller} className="bbm-map-scroll">
        <div className="bbm-map-world">
          <div className="bbm-map-eden" aria-hidden="true" />
          <div className="bbm-map-creation" aria-hidden="true" />
          <svg className="bbm-map-trail" viewBox="0 0 100 200" preserveAspectRatio="none" aria-hidden="true">
            <path d={TRAIL} className="bbm-trail-edge" vectorEffect="non-scaling-stroke" />
            <path ref={pathRef} d={TRAIL} className="bbm-trail" vectorEffect="non-scaling-stroke" />
            <path d={TRAIL} className="bbm-trail-dash" vectorEffect="non-scaling-stroke" />
          </svg>
          {MATCH_LEVELS.map((level, i) => {
            const spot = SPOTS[i];
            const unlocked = level.number <= progress.unlocked;
            const done = progress.done.includes(level.id);
            return (
              <button
                key={level.id}
                type="button"
                className={`bbm-medal ${unlocked ? "" : "is-locked"} ${done ? "is-done" : ""} ${arrived === level.id ? "is-arrived" : ""}`}
                style={{ left: `${spot.x}%`, top: `${spot.y / 2}%` }}
                disabled={!unlocked || walking}
                onClick={() => onOpen(level)}
                aria-label={`${level.number}: ${level.title}${done ? ", complete" : unlocked ? "" : ", locked"}`}
              >
                <span className="bbm-medal-coin">
                  {unlocked ? level.number : "🔒"}
                  {done ? <span className="bbm-medal-check">✓</span> : null}
                </span>
                <span className="bbm-medal-name">{level.title}</span>
                {progress.best[level.id] ? <span className="bbm-medal-best">Best {progress.best[level.id]}</span> : null}
              </button>
            );
          })}
          {marker ? (
            <span className={`bbm-marker ${walking ? "is-walking" : ""}`} style={{ left: `${marker.x}%`, top: `${marker.y / 2}%` }} aria-hidden="true">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="" />
              ) : (
                <span>🙂</span>
              )}
            </span>
          ) : null}
        </div>
      </div>
      {walking ? (
        <button type="button" className="bbm-skip" onClick={() => (skip.current = true)}>
          Skip ›
        </button>
      ) : null}
      {arrived === "eden" ? <div className="bbm-arrive">The Garden of Eden is open. Tap it to play!</div> : null}
      {allDone && !walking ? (
        <div className="bbm-finished">
          <b>Creation to Eden: complete!</b>
          <span>Replay either board any time. More of Genesis is coming.</span>
        </div>
      ) : null}
    </div>
  );
}
