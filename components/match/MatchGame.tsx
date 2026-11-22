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
import { matchMusicOn, playMatchMusic, setMatchMusicOn, stopMatchMusic } from "@/lib/match/sound";
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
    const html = document.documentElement;
    html.classList.add("bb-game-screen");
    // iPhone/iPad: the status bar gets a fixed minimum gap too (matchCss).
    const ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    if (ios) html.classList.add("bb-ios");
    return () => {
      html.classList.remove("bb-game-screen");
      html.classList.remove("bb-ios");
    };
  }, []);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    setProgress((p) => {
      const next = fn(p);
      save(next);
      return next;
    });
  }, []);

  // A different song for each place: the trail (home and map), Creation, Eden.
  const scene = screen.name === "board" ? screen.level.id : "trail";
  useEffect(() => playMatchMusic(scene), [scene]);
  useEffect(() => () => stopMatchMusic(), []);

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
 * The home screen is Louis's own art (Drive "Production Art": home-phone and
 * home-desktop, with the level plaque left blank). Back, Play and settings
 * are tappable spots on the picture; the level label is live text on the
 * blank plaque so it can say Eden.
 */
function Home({ label, onPlay, ready }: { label: string; onPlay: () => void; ready: boolean }) {
  const [settings, setSettings] = useState(false);
  const [sound, setSound] = useState(true);
  const [music, setMusic] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        setSound(window.localStorage.getItem("bb:clue-sound") !== "off");
        setMusic(matchMusicOn());
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
      {/* Phone art (1080x2340) on tall screens, desktop art (1920x1080) on wide
          ones. The tap spots and the label sit on each picture's own buttons. */}
      {(
        [
          {
            kind: "phone",
            src: "/games/match/ui/home-phone.webp",
            back: { left: "4%", top: "2%", width: "11%", height: "5%" },
            gear: { left: "85%", top: "2%", width: "11%", height: "5%" },
            play: { left: "18%", top: "61%", width: "62%", height: "10.5%" },
            label: { left: "23%", top: "72.8%", width: "54%", height: "4%" },
          },
          {
            kind: "desktop",
            src: "/games/match/ui/home-desktop.webp",
            back: { left: "2.5%", top: "2%", width: "5.5%", height: "10%" },
            gear: { left: "92.5%", top: "2%", width: "5.5%", height: "10%" },
            play: { left: "32.5%", top: "66%", width: "34.5%", height: "17.5%" },
            label: { left: "35%", top: "86.5%", width: "30%", height: "6.5%" },
          },
        ] as const
      ).map((art) => (
        <div key={art.kind} className={`bbm-home2-art is-${art.kind}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={art.src} alt="Bible Buddy Match: Buddy on the path through Eden with sun, moon, star and tree tiles" />
          <Link href="/bible-study-games" className="bbm-hot" style={art.back} aria-label="Back to Bible Buddy" />
          <button type="button" className="bbm-hot" style={art.gear} aria-label="Settings" onClick={() => setSettings(true)} />
          <button type="button" className="bbm-hot is-play" style={art.play} aria-label="Play" onClick={onPlay} disabled={!ready} />
          <span className="bbm-home2-label" style={art.label}>
            {label}
          </span>
        </div>
      ))}
      {settings ? (
        <div className="bbm-panelwrap" role="dialog" aria-modal="true" onClick={() => setSettings(false)}>
          <div className="bbm-panel" onClick={(e) => e.stopPropagation()}>
            <h2>Settings</h2>
            <button
              type="button"
              className="bbm-btn-cream"
              onClick={() => {
                setMatchMusicOn(!music);
                setMusic(!music);
              }}
            >
              Music: {music ? "On" : "Off"}
            </button>
            <button type="button" className="bbm-btn-cream" onClick={toggleSound}>
              Sound effects: {sound ? "On" : "Off"}
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

/**
 * The map is Louis's painted art (Drive "Production Art": map-phone,
 * 1080x4680, two phone screens tall): the coast at the bottom, the garden at
 * the top, the sand path already painted. These points trace that path in
 * percent of the picture (x of its width, y of its height), bottom to top;
 * the marker walks along them. Creation sits at the coast, Eden one screen up
 * past the stone bridge.
 */
const PATH_POINTS: Array<[number, number]> = [
  [38, 99], [37, 95], [30, 91], [21, 87], [14, 82], [12, 78], [14, 74], [25, 71], [26, 68], [21, 65], [24, 62],
  [30, 59], [40, 57], [47, 55], [44, 52.5], [38, 50], [30, 48.5], [36, 46], [44, 44], [50, 42], [60, 40], [66, 37.5],
  [64, 35], [67, 32.5], [66, 30], [61, 27.5], [55, 25], [53, 22.5], [48, 20], [33, 17.5], [36, 15], [31, 12.5],
  [35, 10], [41, 7.5], [47, 5], [50, 2],
];
/** A smooth curve through the points (Catmull-Rom, as cubic Beziers). */
const TRAIL = (() => {
  const p = PATH_POINTS;
  let d = `M ${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i += 1) {
    const [x0, y0] = p[Math.max(0, i - 1)];
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const [x3, y3] = p[Math.min(p.length - 1, i + 2)];
    d += ` C ${x1 + (x2 - x0) / 6} ${y1 + (y2 - y0) / 6}, ${x2 - (x3 - x1) / 6} ${y2 - (y3 - y1) / 6}, ${x2} ${y2}`;
  }
  return d;
})();
const SPOTS = [
  { x: 21, y: 87 },
  { x: 61, y: 27.5 },
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
    const top = (yUnits / 100) * content - el.clientHeight / 2;
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
      <div className="bbm-map-blur" aria-hidden="true" />
      <div className="bbm-topbar">
        <button type="button" className="bbm-roundbtn" onClick={onBack} aria-label="Back">
          ←
        </button>
        <div className="bbm-ribbon">Genesis</div>
        <span className="bbm-roundbtn is-spacer" />
      </div>
      <div ref={scroller} className="bbm-map-scroll">
        <div className="bbm-map-world">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="bbm-map-art" src="/games/match/ui/map-phone.webp" alt="The Genesis trail from the coast of Creation up to the Garden of Eden" draggable={false} />
          {/* The painted path, traced: invisible, the marker walks along it. */}
          <svg className="bbm-map-trail" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path ref={pathRef} d={TRAIL} fill="none" stroke="none" />
          </svg>
          {MATCH_LEVELS.map((level, i) => {
            const spot = SPOTS[i];
            const unlocked = level.number <= progress.unlocked;
            const done = progress.done.includes(level.id);
            // The board to play next pulses and says so (Louis, 2026-11-22);
            // finished boards stay tappable for replays.
            const next = unlocked && !done && !walking;
            return (
              <button
                key={level.id}
                type="button"
                className={`bbm-medal ${unlocked ? "" : "is-locked"} ${done ? "is-done" : ""} ${next ? "is-next" : ""} ${arrived === level.id ? "is-arrived" : ""}`}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                disabled={!unlocked || walking}
                onClick={() => onOpen(level)}
                aria-label={`${level.number}: ${level.title}${done ? ", complete" : unlocked ? "" : ", locked"}`}
              >
                <span className={`bbm-medal-coin ${done ? "is-done" : unlocked ? "" : "is-locked"}`}>
                  {/* You are here: your photo sits right inside the coin's circle. */}
                  {!walking && level.number === Math.min(progress.unlocked, MATCH_LEVELS.length) ? (
                    <span className="bbm-medal-photo">
                      {avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={avatar} alt="" />
                      ) : (
                        <span>🙂</span>
                      )}
                    </span>
                  ) : unlocked && !done ? (
                    level.number
                  ) : null}
                </span>
                {next ? <span className="bbm-playme">Play me!</span> : null}
                <span className="bbm-medal-name">{level.title}</span>
                {progress.best[level.id] ? <span className="bbm-medal-best">Best {progress.best[level.id]}</span> : null}
              </button>
            );
          })}
          {/* While walking to the next board, the photo travels on its own. */}
          {marker && walking ? (
            <span className={`bbm-marker ${walking ? "is-walking" : ""}`} style={{ left: `${marker.x}%`, top: `${marker.y}%` }} aria-hidden="true">
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
