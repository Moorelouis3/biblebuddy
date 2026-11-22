"use client";

import { BIBLE_READING_BACKGROUND_TRACKS, bibleReadingBackgroundVolumeFor } from "@/lib/bibleReadingBackgroundMusic";

/**
 * Bible Buddy Match sounds, synthesised with Web Audio (no files to load):
 * a soft swap, a "nope" for a swap that does nothing, rising chimes for each
 * clear in a cascade, a shimmer for a new power-up, a sweep for a Light Burst,
 * a big chord for an All Match orb, and win / out-of-moves cues. Muted with
 * the same device setting as the rest of the games' sound (bb:clue-sound).
 */

let ctx: AudioContext | null = null;

function on(): boolean {
  try {
    return window.localStorage.getItem("bb:clue-sound") !== "off";
  } catch {
    return true;
  }
}

function audio(): AudioContext | null {
  if (typeof window === "undefined" || !on()) return null;
  try {
    if (!ctx) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, at: number, dur: number, type: OscillatorType = "sine", gain = 0.12) {
  const a = audio();
  if (!a) return;
  const t = a.currentTime + at;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.05);
}

function sweep(from: number, to: number, dur: number, gain = 0.08) {
  const a = audio();
  if (!a) return;
  const t = a.currentTime;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(from, t);
  o.frequency.exponentialRampToValueAtTime(to, t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.05);
}

const SCALE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66];

export const matchSound = {
  /** Browsers only allow sound after a tap. */
  unlock: () => void audio(),
  swap: () => tone(420, 0, 0.08, "triangle", 0.06),
  nope: () => {
    tone(220, 0, 0.09, "square", 0.04);
    tone(196, 0.09, 0.12, "square", 0.04);
  },
  /** Each clear in a cascade climbs a note. */
  /** The tiles breaking apart: a short bright crackle. */
  crack: () => {
    const a = audio();
    if (!a) return;
    const len = Math.floor(a.sampleRate * 0.18);
    const buf = a.createBuffer(1, len, a.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i += 1) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    const src = a.createBufferSource();
    src.buffer = buf;
    const hp = a.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1800;
    const g = a.createGain();
    g.gain.value = 0.18;
    src.connect(hp).connect(g).connect(a.destination);
    src.start();
  },
  match: (step: number) => {
    const n = SCALE[Math.min(step, SCALE.length - 1)];
    tone(n, 0, 0.18, "sine", 0.1);
    tone(n * 1.5, 0.04, 0.16, "sine", 0.05);
  },
  power: () => {
    for (let i = 0; i < 4; i += 1) tone(1046.5 + i * 220, i * 0.05, 0.14, "sine", 0.05);
  },
  beam: () => sweep(300, 1800, 0.35, 0.09),
  orb: () => {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.04, 0.6, "sine", 0.07));
    sweep(200, 2400, 0.5, 0.05);
  },
  win: () => [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => tone(f, i * 0.12, 0.45, "triangle", 0.09)),
  lose: () => [392, 349.23, 311.13].forEach((f, i) => tone(f, i * 0.18, 0.35, "sine", 0.07)),
  step: () => tone(880, 0, 0.05, "sine", 0.03),
  /** Each tile added to a line plays the next note up. */
  link: (n: number) => tone(SCALE[Math.min(n, SCALE.length - 1)] * (n >= SCALE.length ? 1.5 : 1), 0, 0.09, "sine", 0.06),
};

/* ---------- music: a different song per board ---------- */

/**
 * Louis, 2026-11-22: "we need music on this game also, different songs for
 * different boards". The same five calm tracks the Bible in One Year
 * narration uses, one per place: the trail (home and map), Creation, Eden.
 * Each at its own measured gain (lib/bibleReadingBackgroundMusic.ts), lifted
 * a little because there is no narrator. Music has its own switch
 * (bb:clue-music, shared with Bible Clue) and starts on the first tap.
 */
const SCENE_TRACK: Record<string, string> = {
  trail: BIBLE_READING_BACKGROUND_TRACKS[1],
  creation: BIBLE_READING_BACKGROUND_TRACKS[0],
  eden: BIBLE_READING_BACKGROUND_TRACKS[2],
};
let musicEl: HTMLAudioElement | null = null;
let musicScene = "";

export function matchMusicOn(): boolean {
  try {
    return window.localStorage.getItem("bb:clue-music") !== "off";
  } catch {
    return true;
  }
}

function startScene() {
  if (typeof window === "undefined" || !musicScene || !matchMusicOn()) return;
  const src = SCENE_TRACK[musicScene] || SCENE_TRACK.trail;
  if (!musicEl || !musicEl.src.endsWith(src)) {
    musicEl?.pause();
    musicEl = new Audio(src);
    musicEl.loop = true;
    musicEl.volume = Math.min(0.3, bibleReadingBackgroundVolumeFor(src) * 2.5);
  }
  void musicEl.play().catch(() => {
    // Waiting for the first tap.
  });
}

/** Play the song for a place ("trail", "creation", "eden"); returns a stop function. */
export function playMatchMusic(scene: string) {
  if (typeof window === "undefined") return () => {};
  musicScene = scene;
  startScene();
  const onTap = () => startScene();
  window.addEventListener("pointerdown", onTap);
  return () => {
    window.removeEventListener("pointerdown", onTap);
    if (musicScene === scene) musicScene = "";
    // Leave it to the next scene to switch tracks; stop only when leaving the game.
  };
}

export function stopMatchMusic() {
  musicScene = "";
  musicEl?.pause();
  musicEl = null;
}

export function setMatchMusicOn(on: boolean) {
  try {
    window.localStorage.setItem("bb:clue-music", on ? "on" : "off");
  } catch {}
  if (on) startScene();
  else musicEl?.pause();
}
