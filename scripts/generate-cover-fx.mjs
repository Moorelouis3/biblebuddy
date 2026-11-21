#!/usr/bin/env node
/**
 * Draws the small repeating tiles the Bible Cover effects slide across the
 * screen (public/covers/fx/*.png). Each tile is 512x512 and seamless: the
 * effect layer moves exactly one tile and loops, so nothing is ever redrawn -
 * the same method as Winter Cabin's snow (components/BibleCoverBackdrop.tsx).
 * Seeded, so re-running gives the same pictures.
 *   node scripts/generate-cover-fx.mjs
 */
import sharp from "sharp";
import { mkdirSync, statSync } from "fs";

const SIZE = 512;
mkdirSync("public/covers/fx", { recursive: true });

function rng(seed) {
  let x = seed;
  return () => ((x = (x * 16807) % 2147483647) / 2147483647);
}

/** Draws each shape at x and at its wrapped copies so the tile is seamless. */
function wrapped(x, y, r, draw) {
  let out = "";
  for (const dx of [-SIZE, 0, SIZE]) for (const dy of [-SIZE, 0, SIZE]) {
    const cx = x + dx, cy = y + dy;
    if (cx + r < 0 || cx - r > SIZE || cy + r < 0 || cy - r > SIZE) continue;
    out += draw(cx, cy);
  }
  return out;
}

const svg = (defs, body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}"><defs>${defs}</defs>${body}</svg>`);
const glow = (id, color) => `<radialGradient id="${id}"><stop offset="0" stop-color="${color}" stop-opacity="1"/><stop offset="0.35" stop-color="${color}" stop-opacity="0.55"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;

const tiles = {
  // Candle-coloured fireflies: few, soft, glowing.
  fireflies: () => {
    const r = rng(11); let b = "";
    for (let i = 0; i < 14; i++) {
      const x = r() * SIZE, y = r() * SIZE, s = 5 + r() * 6, o = (0.55 + r() * 0.45).toFixed(2);
      b += wrapped(x, y, s, (cx, cy) => `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${s.toFixed(1)}" fill="url(#g)" opacity="${o}"/>`);
    }
    return svg(glow("g", "#ffd88a"), b);
  },
  // Tiny white stars for a night sky.
  stars: () => {
    const r = rng(23); let b = "";
    for (let i = 0; i < 70; i++) {
      const x = r() * SIZE, y = r() * SIZE, s = 0.5 + r() * 0.9, o = (0.4 + r() * 0.6).toFixed(2);
      b += wrapped(x, y, s, (cx, cy) => `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${s.toFixed(2)}" fill="#f4f0ff" opacity="${o}"/>`);
    }
    return svg("", b);
  },
  // Embers: small orange-gold sparks with a hot core.
  embers: () => {
    const r = rng(37); let b = "";
    for (let i = 0; i < 28; i++) {
      const x = r() * SIZE, y = r() * SIZE, s = 2.5 + r() * 3.5, o = (0.5 + r() * 0.5).toFixed(2);
      const id = r() > 0.5 ? "a" : "b";
      b += wrapped(x, y, s, (cx, cy) => `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${s.toFixed(1)}" fill="url(#${id})" opacity="${o}"/>`);
    }
    return svg(glow("a", "#ff9b45") + glow("b", "#ffc977"), b);
  },
  // Four-point sparkles for the heavenly light.
  sparkles: () => {
    const r = rng(41); let b = "";
    for (let i = 0; i < 18; i++) {
      const x = r() * SIZE, y = r() * SIZE, s = 3 + r() * 4, o = (0.45 + r() * 0.55).toFixed(2);
      b += wrapped(x, y, s, (cx, cy) => `<path d="M${cx} ${cy - s} Q${cx} ${cy} ${cx + s} ${cy} Q${cx} ${cy} ${cx} ${cy + s} Q${cx} ${cy} ${cx - s} ${cy} Q${cx} ${cy} ${cx} ${cy - s}Z" fill="#fff6d8" opacity="${o}"/>`);
    }
    return svg("", b);
  },
  // Fine sand on the wind.
  sand: () => {
    const r = rng(53); let b = "";
    for (let i = 0; i < 130; i++) {
      const x = r() * SIZE, y = r() * SIZE, s = 0.7 + r() * 1.1, o = (0.4 + r() * 0.5).toFixed(2);
      b += wrapped(x, y, s, (cx, cy) => `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${s.toFixed(2)}" fill="#f0d6a6" opacity="${o}"/>`);
    }
    return svg("", b);
  },
  // Rain streaks.
  rain: () => {
    const r = rng(67); let b = "";
    for (let i = 0; i < 46; i++) {
      const x = r() * SIZE, y = r() * SIZE, len = 18 + r() * 26, o = (0.3 + r() * 0.4).toFixed(2);
      b += wrapped(x, y, len, (cx, cy) => `<line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(cx - 2).toFixed(1)}" y2="${(cy + len).toFixed(1)}" stroke="#e2ecff" stroke-width="1.4" stroke-linecap="round" opacity="${o}"/>`);
    }
    return svg("", b);
  },
  // Blossom petals.
  petals: () => {
    const r = rng(79); let b = "";
    for (let i = 0; i < 13; i++) {
      const x = r() * SIZE, y = r() * SIZE, rot = Math.round(r() * 180), o = (0.6 + r() * 0.4).toFixed(2);
      const fill = r() > 0.35 ? "#f6b9c9" : "#fde4ea";
      b += wrapped(x, y, 8, (cx, cy) => `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="6" ry="3.4" fill="${fill}" opacity="${o}" transform="rotate(${rot} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`);
    }
    return svg("", b);
  },
};

for (const [name, draw] of Object.entries(tiles)) {
  const file = `public/covers/fx/${name}.png`;
  await sharp(draw()).png({ compressionLevel: 9 }).toFile(file);
  console.log(name, statSync(file).size, "bytes");
}
