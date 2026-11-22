"use client";

/**
 * Bible Buddy Match: an original match-three game inside Bible Buddy, built
 * from the starter kit (Louis, 2026-11-22). Creation and Eden first, then the
 * Genesis and Exodus boards from Drive: 20 boards (lib/match/engine.ts).
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
import { clueApi } from "@/lib/clueGame/track";

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

/** A Bible Buddy on the map: where they are on the trail. */
export type MapBuddy = { id: string; name: string; avatar: string | null; unlocked: number };
type Saved = { unlocked: number; done: string[]; best: Record<string, number> };

/** Two saves of the same player, merged so neither goes backwards. */
function merge(p: Progress, s: Saved | null): Progress {
  if (!s) return p;
  const best = { ...p.best };
  for (const [k, v] of Object.entries(s.best || {})) best[k] = Math.max(best[k] || 0, Number(v) || 0);
  return { ...p, unlocked: Math.max(p.unlocked, s.unlocked || 1), done: [...new Set([...p.done, ...(s.done || [])])], best };
}

/** Send progress up (match_progress), so buddies can see where you are. */
function upload(p: Progress) {
  void clueApi("/api/match/progress", { method: "POST", body: { unlocked: p.unlocked, done: p.done, best: p.best } });
}

export default function MatchGame() {
  const [progress, setProgress] = useState<Progress>(START);
  const [ready, setReady] = useState(false);
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [avatar, setAvatar] = useState<string | null>(null);
  const [buddies, setBuddies] = useState<MapBuddy[]>([]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setProgress(load());
      setReady(true);
    }, 0);
    // The server copy (another phone may be further on), then your buddies'
    // boards. This phone's own progress goes up too, so an older player who
    // only ever played on this phone appears to their buddies.
    void (async () => {
      const res = await clueApi<{ me: Saved | null; buddies: MapBuddy[] }>("/api/match/progress");
      if (!res.ok) return;
      setBuddies(res.data.buddies || []);
      const merged = merge(load(), res.data.me);
      save(merged);
      setProgress((p) => merge(merge(p, res.data.me), { unlocked: merged.unlocked, done: merged.done, best: merged.best }));
      upload(merged);
    })();
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

  const update = useCallback((fn: (p: Progress) => Progress, sync = false) => {
    setProgress((p) => {
      const next = fn(p);
      save(next);
      if (sync) upload(next);
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
        <Home label={allDone ? `All ${MATCH_LEVELS.length} boards ✓` : `${latest.book} · ${latest.title}`} onPlay={() => setScreen({ name: "map" })} ready={ready} />
      ) : screen.name === "map" ? (
        <GenesisMap
          progress={progress}
          avatar={avatar}
          buddies={buddies}
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
            }, true)
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
/** Where the two boards of one map picture sit, in that picture's percent. */
const SEGMENT_SPOTS = [
  { x: 21, y: 87 },
  { x: 61, y: 27.5 },
];

/**
 * 20 boards (Louis, 2026-11-22): the painted map holds two, so the picture
 * repeats up the screen, one copy per two boards, with the first two at the
 * bottom. Everything below is in percent of the whole world: x of its width,
 * y of its height.
 */
const SEGMENTS = Math.max(1, Math.ceil(MATCH_LEVELS.length / 2));
const toWorld = (seg: number, x: number, y: number) => ({ x, y: ((SEGMENTS - 1 - seg) * 100 + y) / SEGMENTS });
const SPOTS = MATCH_LEVELS.map((_, i) => {
  const s = SEGMENT_SPOTS[i % 2];
  return toWorld(Math.floor(i / 2), s.x, s.y);
});
/** A smooth curve through the points (Catmull-Rom, as cubic Beziers), every picture's path joined bottom to top. */
const TRAIL = (() => {
  const p: Array<[number, number]> = [];
  for (let seg = 0; seg < SEGMENTS; seg += 1) for (const [x, y] of PATH_POINTS) {
    const w = toWorld(seg, x, y);
    p.push([w.x, w.y]);
  }
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

function GenesisMap({
  progress,
  avatar,
  buddies,
  onBack,
  onOpen,
  onTravelled,
}: {
  progress: Progress;
  avatar: string | null;
  buddies: MapBuddy[];
  onBack: () => void;
  onOpen: (level: MatchLevel) => void;
  onTravelled: () => void;
}) {
  const scroller = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [marker, setMarker] = useState<{ x: number; y: number } | null>(null);
  const [walking, setWalking] = useState(false);
  const [arrived, setArrived] = useState<MatchLevel | null>(null);
  const skip = useRef(false);
  const current = Math.min(progress.unlocked, MATCH_LEVELS.length);
  const travel = progress.travel && current >= 2;
  const allDone = MATCH_LEVELS.every((l) => progress.done.includes(l.id));
  const book = MATCH_LEVELS[current - 1]?.book || "Genesis";

  /** Where along the trail a spot is (the closest point, searched coarse then fine). */
  const lengthAt = useCallback((spot: { x: number; y: number }) => {
    const p = pathRef.current;
    if (!p) return 0;
    const total = p.getTotalLength();
    const near = (from: number, to: number, step: number) => {
      let best = from;
      let bestD = Infinity;
      for (let l = from; l <= to; l += step) {
        const pt = p.getPointAtLength(l);
        const d = (pt.x - spot.x) ** 2 + (pt.y - spot.y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = l;
        }
      }
      return best;
    };
    const rough = near(0, total, 2);
    return near(Math.max(0, rough - 2), Math.min(total, rough + 2), 0.1);
  }, []);

  const scrollToY = (yUnits: number, smooth: boolean) => {
    const el = scroller.current;
    if (!el) return;
    const content = el.scrollHeight;
    const top = (yUnits / 100) * content - el.clientHeight / 2;
    el.scrollTo({ top: Math.max(0, top), behavior: smooth ? "smooth" : "auto" });
  };

  // Place the marker and the camera; after a first win, walk to the next board.
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const here = SPOTS[current - 1];
    if (!travel) {
      const id = window.setTimeout(() => {
        setMarker(here);
        scrollToY(here.y, false);
      }, 0);
      return () => window.clearTimeout(id);
    }
    const fromSpot = SPOTS[current - 2];
    const from = lengthAt(fromSpot);
    const to = lengthAt(here);
    let raf = 0;
    const startAt = performance.now() + 700; // a beat on the finished board first
    const dur = reduced ? 0 : 2800;
    const first = window.setTimeout(() => {
      setMarker(fromSpot);
      scrollToY(fromSpot.y, false);
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
        setArrived(MATCH_LEVELS[current - 1]);
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
        <div className="bbm-ribbon">{book}</div>
        <span className="bbm-roundbtn is-spacer" />
      </div>
      <div ref={scroller} className="bbm-map-scroll">
        <div className="bbm-map-world" style={{ aspectRatio: `1080 / ${4680 * SEGMENTS}` }}>
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              className="bbm-map-art"
              style={{ height: `${100 / SEGMENTS}%` }}
              src="/games/match/ui/map-phone.webp"
              alt={i === SEGMENTS - 1 ? "The Bible Buddy trail, from Creation upward" : ""}
              draggable={false}
            />
          ))}
          {/* Living map (Louis, 2026-11-22): water runs, the sea moves, and the
              weather changes up the trail: storm, snow, fireflies in turn. */}
          {Array.from({ length: SEGMENTS }).map((_, i) => (
            <MapFx key={`fx${i}`} seg={i} />
          ))}
          {/* The painted path, traced: invisible, the marker walks along it. */}
          <svg className="bbm-map-trail" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path ref={pathRef} d={TRAIL} fill="none" stroke="none" />
          </svg>
          {MATCH_LEVELS.map((level, i) => {
            const spot = SPOTS[i];
            const unlocked = level.number <= progress.unlocked;
            const done = progress.done.includes(level.id);
            // The board to play next pulses and says so; finished boards stay tappable for replays.
            const next = unlocked && !done && !walking;
            return (
              <button
                key={level.id}
                type="button"
                className={`bbm-medal ${unlocked ? "" : "is-locked"} ${done ? "is-done" : ""} ${next ? "is-next" : ""} ${arrived?.id === level.id ? "is-arrived" : ""}`}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                disabled={!unlocked || walking}
                onClick={() => onOpen(level)}
                aria-label={`${level.number}: ${level.title}${done ? ", complete" : unlocked ? "" : ", locked"}`}
              >
                <span className={`bbm-medal-coin ${done ? "is-done" : unlocked ? "" : "is-locked"}`}>
                  {/* You are here: your photo sits right inside the coin's circle. */}
                  {!walking && level.number === current ? (
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
                {/* Your Bible Buddies on the board they have reached (Louis: "Jessica finished day 2, we are buddies, I should see her"). */}
                {(() => {
                  const here = buddies.filter((b) => Math.min(b.unlocked, MATCH_LEVELS.length) === level.number);
                  if (!here.length) return null;
                  return (
                    <span className="bbm-buddies" aria-label={`${here.map((b) => b.name).join(", ")} ${here.length === 1 ? "is" : "are"} here`}>
                      {here.slice(0, 3).map((b) => (
                        <span key={b.id} className="bbm-buddy" title={b.name}>
                          {b.avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={b.avatar} alt="" />
                          ) : (
                            <span>{b.name.charAt(0).toUpperCase()}</span>
                          )}
                        </span>
                      ))}
                      {here.length > 3 ? <span className="bbm-buddy is-more">+{here.length - 3}</span> : null}
                      <span className="bbm-buddy-name">{here.length === 1 ? here[0].name : `${here[0].name} +${here.length - 1}`}</span>
                    </span>
                  );
                })()}
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
      {arrived ? <div className="bbm-arrive">{arrived.title} is open. Tap it to play!</div> : null}
      {allDone && !walking ? (
        <div className="bbm-finished">
          <b>All {MATCH_LEVELS.length} boards complete!</b>
          <span>Replay any board any time. More boards are coming.</span>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Motion over one copy of the painted map (positions in percent of that
 * copy, read off map-phone.webp): the waterfall and the cascade under the
 * bridge fall, the stream and the sea shimmer, and each stretch of trail has
 * its own weather in turn (seg 0 is the bottom copy): a storm with rain and
 * lightning over the clouds, then snow, then fireflies in the garden.
 * Decoration only: no taps, and nothing moves with reduced motion.
 */
function MapFx({ seg }: { seg: number }) {
  const weather = (["storm", "snow", "fireflies"] as const)[seg % 3];
  return (
    <div className="bbm-fx" style={{ top: `${((SEGMENTS - 1 - seg) * 100) / SEGMENTS}%`, height: `${100 / SEGMENTS}%` }} aria-hidden="true">
      <span className="bbm-fx-fall" style={{ left: "75%", top: "4.2%", width: "11%", height: "8%" }} />
      <span className="bbm-fx-fall is-small" style={{ left: "58%", top: "42.5%", width: "18%", height: "4.5%" }} />
      <span className="bbm-fx-shimmer" style={{ left: "55%", top: "48%", width: "40%", height: "11%" }} />
      <span className="bbm-fx-sea" style={{ left: "18%", top: "81%", width: "82%", height: "13%" }} />
      {weather === "storm" ? (
        <>
          <span className="bbm-fx-rain" style={{ left: "45%", top: "62%", width: "55%", height: "22%" }} />
          <span className="bbm-fx-bolt" style={{ left: "55%", top: "62%", width: "45%", height: "16%", animationDelay: `${seg * 1.7}s` }} />
        </>
      ) : weather === "snow" ? (
        <span className="bbm-fx-snow" />
      ) : (
        <span className="bbm-fx-flies" />
      )}
    </div>
  );
}
