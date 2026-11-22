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
import MatchBoard, { readSavedBoard } from "./MatchBoard";
import { trackMatch } from "@/lib/match/track";
import { matchMusicOn, playMatchMusic, setMatchMusicOn, stopMatchMusic } from "@/lib/match/sound";
import { MATCH_CSS } from "./matchCss";
import { MAP_PREVIEWS } from "@/lib/match/mapPreviews";
import { clueApi } from "@/lib/clueGame/track";

type Progress = { unlocked: number; done: string[]; best: Record<string, number>; travel: boolean };
const KEY = "bb:match:progress";
const START: Progress = { unlocked: 1, done: [], best: {}, travel: false };

/**
 * The board after your furthest finished one is always open. The two-board
 * version never unlocked a third board when Eden was won (there was none),
 * so players who finished both were left with board 3 locked (Louis,
 * 2026-11-22: "I did 1 and 2, so only 3 should have the play me badge").
 */
function normalize(p: Progress): Progress {
  const furthest = Math.max(0, ...p.done.map((id) => MATCH_LEVELS.find((l) => l.id === id)?.number || 0));
  return { ...p, unlocked: Math.max(1, Math.min(MATCH_LEVELS.length, Math.max(p.unlocked, furthest + 1))) };
}

function load(): Progress {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return START;
    const p = JSON.parse(raw) as Partial<Progress>;
    return normalize({ ...START, ...p, done: Array.isArray(p.done) ? p.done : [], best: p.best || {} });
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
  return normalize({ ...p, unlocked: Math.max(p.unlocked, s.unlocked || 1), done: [...new Set([...p.done, ...(s.done || [])])], best });
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
      // A board left halfway when the app closed opens again where it was.
      const saved = readSavedBoard();
      const level = saved ? MATCH_LEVELS.find((l) => l.id === saved.levelId) : undefined;
      if (level) setScreen({ name: "board", level });
      trackMatch("match_opened", { from: new URLSearchParams(window.location.search).get("from") || "direct", resumedBoard: level?.id ?? null });
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
        <Home label={allDone ? `All ${MATCH_LEVELS.length} boards ✓` : `${latest.book} · ${latest.title}`.length <= 22 ? `${latest.book} · ${latest.title}` : latest.title} onPlay={() => setScreen({ name: "map" })} ready={ready} />
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
  // The map pictures start downloading while the home screen is up, so the map opens ready.
  useEffect(() => {
    for (const src of ["/games/match/ui/map-phone.webp", "/games/match/ui/map-exodus-phone.webp"]) {
      const img = new Image();
      img.src = src;
    }
  }, []);
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
      <div className="bbm-home2-top">
        <Link href="/bible-study-games" className="bbm-roundbtn" aria-label="Back to Bible Buddy">
          ←
        </Link>
        <button type="button" className="bbm-roundbtn" aria-label="Settings" onClick={() => setSettings(true)}>
          ⚙
        </button>
      </div>
      {/* Phone art (1080x2340) on tall screens, desktop art (1920x1080) on wide
          ones. The tap spots and the label sit on each picture's own buttons. */}
      {(
        [
          {
            kind: "phone",
            // The same picture with its painted Back and Settings removed: on a phone
            // it runs right up under the clock, and real buttons sit below it
            // (Louis, 2026-11-22: no bar at the top).
            src: "/games/match/ui/home-phone-clean.webp",
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
          <span className={`bbm-home2-label ${label.length > 20 ? "is-long" : ""}`} style={art.label}>
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
/** The Genesis map's painted path (map-phone.webp), bottom to top, in percent of the picture. */
const GENESIS_PATH: Array<[number, number]> = [
  [38, 99], [37, 95], [30, 91], [21, 87], [14, 82], [12, 78], [14, 74], [25, 71], [26, 68], [21, 65], [24, 62],
  [30, 59], [40, 57], [47, 55], [44, 52.5], [38, 50], [30, 48.5], [36, 46], [44, 44], [50, 42], [60, 40], [66, 37.5],
  [64, 35], [67, 32.5], [66, 30], [61, 27.5], [55, 25], [53, 22.5], [48, 20], [33, 17.5], [36, 15], [31, 12.5],
  [35, 10], [41, 7.5], [47, 5], [50, 2],
];
/**
 * The Exodus map's painted path (Drive 00-Exodus-Map, map-exodus-phone.webp):
 * the Nile and Egypt at the bottom, the parted Red Sea, the camp and the
 * oasis, Mount Sinai in the storm, the Tabernacle at the top.
 */
const EXODUS_PATH: Array<[number, number]> = [
  [38, 99.5], [42, 95], [47, 90], [52, 87], [50, 84], [40, 80], [39, 77], [50, 74.5], [62, 72], [65, 70], [60, 67],
  [55, 65], [47, 62], [42, 60], [40, 57], [42, 55], [47, 52], [55, 49], [55, 47], [52, 45], [50, 42], [47, 40],
  [40, 38], [35, 36], [33, 34], [37, 32], [45, 30], [55, 28], [65, 26], [70, 24.5], [66, 22], [55, 18.5], [45, 15.5],
  [33, 12.5], [27, 9.5], [33, 6.5], [45, 4], [52, 1],
];

type Section = { src: string; fx: "genesis" | "exodus"; path: Array<[number, number]>; levels: MatchLevel[] };

/** The painted maps, by book; a book without its own map yet uses the last one. */
const BOOK_MAPS: Record<string, { src: string; path: Array<[number, number]>; fx: Section["fx"] }> = {
  Genesis: { src: "/games/match/ui/map-phone.webp", path: GENESIS_PATH, fx: "genesis" },
  Exodus: { src: "/games/match/ui/map-exodus-phone.webp", path: EXODUS_PATH, fx: "exodus" },
};

/**
 * The map, bottom to top. Ten boards to a painted map (Louis, 2026-11-22:
 * "spread the levels out a little... give us a little travel room"), in
 * board order: the Genesis map holds boards 1-10, and the Exodus map
 * Twelve Tribes of Israel (Jacob's family going down into Egypt, at the
 * Nile) and the Exodus boards. Each map is drawn in the art of the book of
 * its last board.
 */
const PER_MAP = 10;
const SECTIONS: Section[] = (() => {
  const out: Section[] = [];
  let lastMap = BOOK_MAPS.Genesis;
  for (let i = 0; i < MATCH_LEVELS.length; i += PER_MAP) {
    const levels = MATCH_LEVELS.slice(i, i + PER_MAP);
    const m = BOOK_MAPS[levels[levels.length - 1].book] || lastMap;
    lastMap = m;
    out.push({ src: m.src, fx: m.fx, path: m.path, levels });
  }
  return out;
})();
const SEGMENTS = SECTIONS.length;
/** Every section but the bottom is drawn 6% taller, its bottom fading over the one below (see the img). */
const BLEND = 1.06;
const toWorld = (seg: number, x: number, y: number) => ({ x, y: ((SEGMENTS - 1 - seg) * 100 + y * (seg > 0 ? BLEND : 1)) / SEGMENTS });

/**
 * The trail as one line through the whole world (percent of its width and
 * height), with distances along it measured the way it looks on screen. The
 * coins sit on this line and the walking photo follows the same line, so it
 * stops exactly on the next coin (Louis: "it goes past the next point then
 * comes back").
 */
const ASPECT = (4680 * SEGMENTS) / 1080;
const WORLD: Array<{ x: number; y: number; at: number }> = (() => {
  const pts: Array<{ x: number; y: number }> = [];
  SECTIONS.forEach((s, seg) => s.path.forEach(([x, y]) => pts.push(toWorld(seg, x, y))));
  let at = 0;
  return pts.map((p, i) => {
    if (i > 0) at += Math.hypot(p.x - pts[i - 1].x, (p.y - pts[i - 1].y) * ASPECT);
    return { ...p, at };
  });
})();
function pointAt(at: number) {
  const i = Math.max(1, WORLD.findIndex((p) => p.at >= at));
  const a = WORLD[i - 1];
  const b = WORLD[Math.min(i, WORLD.length - 1)];
  const t = b.at === a.at ? 0 : Math.min(1, Math.max(0, (at - a.at) / (b.at - a.at)));
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}
/** Each board's distance along the trail: evenly through its own map. */
const LEVEL_AT: number[] = (() => {
  const out: number[] = [];
  let start = 0;
  SECTIONS.forEach((s) => {
    const first = WORLD[start].at;
    const last = WORLD[start + s.path.length - 1].at;
    s.levels.forEach((_, k) => out.push(first + ((k + 0.5) / PER_MAP) * (last - first)));
    start += s.path.length;
  });
  return out;
})();
/** Each board's spot, in percent of the whole world, in board order. */
const SPOTS = LEVEL_AT.map(pointAt);

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
  const [marker, setMarker] = useState<{ x: number; y: number } | null>(null);
  const [walking, setWalking] = useState(false);
  const [arrived, setArrived] = useState<MatchLevel | null>(null);
  const skip = useRef(false);
  const current = Math.min(progress.unlocked, MATCH_LEVELS.length);
  const travel = progress.travel && current >= 2;
  const allDone = MATCH_LEVELS.every((l) => progress.done.includes(l.id));
  // The banner names the map in view as you scroll (Louis: "it should change to Exodus when we get there").
  const [book, setBook] = useState(MATCH_LEVELS[current - 1]?.book || "Genesis");
  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const mid = ((el.scrollTop + el.clientHeight / 2) / el.scrollHeight) * 100;
    const seg = Math.min(SEGMENTS - 1, Math.max(0, SEGMENTS - 1 - Math.floor((mid / 100) * SEGMENTS)));
    const s = SECTIONS[seg];
    const name = s.fx === "exodus" ? "Exodus" : "Genesis";
    setBook((b) => (b === name ? b : name));
  };

  const scrollToY = (yUnits: number, smooth: boolean) => {
    const el = scroller.current;
    if (!el) return;
    const content = el.scrollHeight;
    const top = (yUnits / 100) * content - el.clientHeight / 2;
    el.scrollTo({ top: Math.max(0, top), behavior: smooth ? "smooth" : "auto" });
  };

  // Place the marker and the camera; after a first win, walk to the next board.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const here = SPOTS[current - 1];
    if (!travel) {
      const id = window.setTimeout(() => {
        setMarker(here);
        scrollToY(here.y, false);
      }, 0);
      return () => window.clearTimeout(id);
    }
    const from = LEVEL_AT[current - 2];
    const to = LEVEL_AT[current - 1];
    let raf = 0;
    const startAt = performance.now() + 700; // a beat on the finished board first
    const dur = reduced ? 0 : 2800;
    const first = window.setTimeout(() => {
      setMarker(SPOTS[current - 2]);
      scrollToY(SPOTS[current - 2].y, false);
      setWalking(true);
    }, 0);
    const tick = (now: number) => {
      const t = dur === 0 || skip.current ? 1 : Math.min(1, Math.max(0, (now - startAt) / dur));
      // Ease in and out, never past the end: it arrives on the coin and stops.
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      const pt = pointAt(from + (to - from) * eased);
      setMarker(pt);
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
      <div ref={scroller} className="bbm-map-scroll" onScroll={onScroll}>
        <div className="bbm-map-world" style={{ aspectRatio: `1080 / ${4680 * SEGMENTS}` }}>
          {/* Each section's own picture. Every one but the bottom reaches a
              little below its place and fades out there over the one beneath,
              so the joins blend instead of cutting (Louis: "it cuts rough"). */}
          {SECTIONS.map((s, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              className={`bbm-map-art bbm-map-section ${i > 0 ? "is-blended" : ""}`}
              style={{
                top: `${((SEGMENTS - 1 - i) * 100) / SEGMENTS}%`,
                height: `${(100 / SEGMENTS) * (i > 0 ? BLEND : 1)}%`,
                zIndex: i + 1,
                // A tiny blurred preview shows at once while the full picture loads.
                backgroundImage: `url(${MAP_PREVIEWS[s.fx]})`,
              }}
              src={s.src}
              alt={i === 0 ? "The Bible Buddy trail through Genesis and Exodus" : ""}
              draggable={false}
            />
          ))}
          {/* Living map (Louis, 2026-11-22): water runs, the sea moves, and the
              weather changes up the trail. */}
          {SECTIONS.map((s, i) => (
            <MapFx key={`fx${i}`} seg={i} kind={s.fx} />
          ))}
          {MATCH_LEVELS.map((level, i) => {
            const spot = SPOTS[i];
            const unlocked = level.number <= progress.unlocked;
            const done = progress.done.includes(level.id);
            // The board to play next pulses and says so; finished boards stay tappable for replays.
            const next = level.number === current && !done && !walking;
            return (
              <button
                key={level.id}
                type="button"
                className={`bbm-medal ${unlocked ? "" : "is-locked"} ${done ? "is-done" : ""} ${next ? "is-next" : ""} ${arrived?.id === level.id ? "is-arrived" : ""}`}
                style={{ left: `${spot.x}%`, top: `${spot.y}%`, zIndex: next ? 60 : unlocked ? 50 : 45 }}
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
                  ) : !unlocked ? (
                    <>
                      {level.number}
                      <span className="bbm-medal-lock" aria-hidden="true">🔒</span>
                    </>
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
                {/* The coin stays on the trail; a name near the edge slides inward so it is never cut off. */}
                <span className="bbm-medal-name" style={{ transform: `translateX(calc(${Math.max(0, 24 - spot.x) - Math.max(0, spot.x - 76)} * min(1vw, 5.6px)))` }}>{level.title}</span>
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
function MapFx({ seg, kind }: { seg: number; kind: "genesis" | "exodus" }) {
  const box = { top: `${((SEGMENTS - 1 - seg) * 100) / SEGMENTS}%`, height: `${(100 / SEGMENTS) * (seg > 0 ? BLEND : 1)}%` };
  if (kind === "exodus") {
    // The Exodus map: the Nile, the walls of the Red Sea, the oasis waterfall, and Sinai's storm.
    return (
      <div className="bbm-fx" style={box} aria-hidden="true">
        <span className="bbm-fx-sea" style={{ left: "0%", top: "88%", width: "100%", height: "12%" }} />
        <span className="bbm-fx-sea" style={{ left: "0%", top: "44%", width: "40%", height: "16%", animationDelay: "-2s" }} />
        <span className="bbm-fx-sea" style={{ left: "62%", top: "44%", width: "38%", height: "16%", animationDelay: "-4s" }} />
        <span className="bbm-fx-fall" style={{ left: "74%", top: "34.5%", width: "7%", height: "4%" }} />
        <span className="bbm-fx-shimmer" style={{ left: "68%", top: "37.5%", width: "22%", height: "3%" }} />
        <span className="bbm-fx-rain" style={{ left: "28%", top: "11%", width: "72%", height: "12%" }} />
        <span className="bbm-fx-bolt" style={{ left: "40%", top: "10%", width: "60%", height: "12%", animationDelay: `${seg * 1.3}s` }} />
      </div>
    );
  }
  const weather = (["storm", "snow", "fireflies"] as const)[seg % 3];
  return (
    <div className="bbm-fx" style={box} aria-hidden="true">
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
