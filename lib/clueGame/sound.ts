/**
 * Bible Clue Game sounds (Louis, 2026-11-22: "yes i want sounds of course
 * this is a real game"). Synthesised with Web Audio, so there are no files
 * to load and nothing to license: deal, flip, a new clue, the last-seconds
 * tick, correct, wrong, and the end-of-round fanfare. In the apps a short
 * haptic tap goes with correct and wrong.
 *
 * The speaker button switches them off; the choice is kept on the device.
 * Browsers (iPhone above all) only allow sound after a tap, so the audio
 * context is created and resumed on the first pointer press.
 */

import { tapHaptic } from "@/lib/nativeShare";

const KEY = "bb:clue-sound";
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noise: AudioBuffer | null = null;

export function soundOn(): boolean {
  try {
    return window.localStorage.getItem(KEY) !== "off";
  } catch {
    return true;
  }
}

export function setSoundOn(on: boolean) {
  try {
    window.localStorage.setItem(KEY, on ? "on" : "off");
  } catch {}
  if (master) master.gain.value = on ? 0.55 : 0;
}

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = soundOn() ? 0.55 : 0;
    master.connect(ctx.destination);
    noise = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Call once from a component: unlocks audio on the first tap. */
export function primeClueSound() {
  if (typeof window === "undefined") return () => {};
  const unlock = () => {
    audio();
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
  window.addEventListener("pointerdown", unlock);
  window.addEventListener("keydown", unlock);
  return () => {
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
}

function tone(freq: number, start: number, dur: number, opts: { type?: OscillatorType; vol?: number; to?: number } = {}) {
  const a = audio();
  if (!a || !master || !soundOn()) return;
  const t = a.currentTime + start;
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = opts.type || "sine";
  osc.frequency.setValueAtTime(freq, t);
  if (opts.to) osc.frequency.exponentialRampToValueAtTime(opts.to, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(opts.vol ?? 0.3, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

function swish(start: number, dur: number, from: number, to: number, vol = 0.25) {
  const a = audio();
  if (!a || !master || !noise || !soundOn()) return;
  const t = a.currentTime + start;
  const src = a.createBufferSource();
  src.buffer = noise;
  const filter = a.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 1.2;
  filter.frequency.setValueAtTime(from, t);
  filter.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = a.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.25);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(filter).connect(g).connect(master);
  src.start(t);
  src.stop(t + dur + 0.02);
}

export const clueSound = {
  /** A riffle shuffle: two halves of the deck flicking together, twice. */
  shuffle() {
    for (let pass = 0; pass < 2; pass += 1) {
      const base = pass * 0.72;
      for (let i = 0; i < 16; i += 1) swish(base + i * 0.028 + Math.random() * 0.01, 0.035, 2600, 4200, 0.16);
      swish(base + 0.5, 0.16, 700, 1800, 0.3); // the bridge: cards settling
    }
  },
  /** One card dealt onto the draw pile at the start of the round. */
  dealCard() {
    swish(0, 0.09, 1800, 3400, 0.16);
    tone(150, 0.07, 0.04, { type: "triangle", vol: 0.1 });
  },
  /** A card sliding off the pile onto the felt, then turning face up. */
  deal() {
    swish(0, 0.22, 900, 3200, 0.28);
    tone(180, 0.18, 0.08, { type: "triangle", vol: 0.18 });
    swish(0.55, 0.12, 2400, 1200, 0.18);
  },
  /** The card turning over at the reveal. */
  flip() {
    swish(0, 0.12, 2400, 1200, 0.2);
    tone(520, 0.08, 0.06, { type: "triangle", vol: 0.12 });
  },
  /** The next clue appearing. */
  clue() {
    tone(660, 0, 0.12, { type: "sine", vol: 0.12 });
    tone(880, 0.06, 0.14, { type: "sine", vol: 0.08 });
  },
  /** One tick per second in the last three seconds. */
  tick(final = false) {
    tone(final ? 1400 : 1100, 0, 0.05, { type: "square", vol: 0.07 });
  },
  /** Your right answer: a bright rising chime. */
  correct() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.07, 0.35, { type: "triangle", vol: 0.22 }));
    void tapHaptic("success");
  },
  /** Someone else got it. */
  otherWon() {
    [392, 523].forEach((f, i) => tone(f, i * 0.08, 0.25, { type: "triangle", vol: 0.15 }));
  },
  /** A wrong guess: a short low buzz. */
  wrong() {
    tone(180, 0, 0.28, { type: "sawtooth", vol: 0.12, to: 110 });
    tone(186, 0, 0.28, { type: "sawtooth", vol: 0.08, to: 116 });
    void tapHaptic("medium");
  },
  /** Nobody got the card. */
  missed() {
    tone(392, 0, 0.22, { type: "sine", vol: 0.14, to: 330 });
    tone(294, 0.18, 0.3, { type: "sine", vol: 0.12, to: 262 });
  },
  /** End of the round. */
  fanfare(won = true) {
    const notes = won ? [523, 659, 784, 1047, 784, 1047] : [392, 494, 587, 784];
    notes.forEach((f, i) => tone(f, i * 0.12, i === notes.length - 1 ? 0.7 : 0.18, { type: "triangle", vol: 0.22 }));
  },
  /** A button press. */
  tap() {
    tone(740, 0, 0.05, { type: "triangle", vol: 0.08 });
  },
};
