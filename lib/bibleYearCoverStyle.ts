// lib/bibleYearCoverStyle.ts
// Shared style definition for Bible in One Year day covers.
//
// The target is days 1-30, which were made by hand (see public/day26cover.png
// and public/day27cover.png). Everything here exists to reproduce that look.
//
// Covers are built in two passes:
//   1. The scene art is generated WITHOUT any lettering.
//   2. The title block is composited on top from real text.
//
// Pass 2 exists because image models misspell rendered words often enough that
// at 365 covers it is a guarantee, not a risk. Compositing keeps every day
// number, title, and reference exactly right and identical in placement.
//
// The title is drawn as VECTOR OUTLINES read from public/fonts/Cinzel.ttf via
// opentype.js, not as SVG <text>. That means no dependency on a font being
// installed on whatever machine or CI box runs this, and it lets us measure
// real glyph widths instead of guessing an average character ratio.

import { readFileSync } from "fs";
import { join } from "path";
import opentype from "opentype.js";

/** Final cover size. Matches the hand-made days 1-30 (1254x1254). */
export const BIBLE_YEAR_COVER_SIZE = 1254;

/** What we ask the image API for. gpt-image-1 only accepts 1024x1024,
 *  1024x1536 or 1536x1024 — so generate square at 1024 and upscale to the
 *  final size before the title goes on. */
export const BIBLE_YEAR_COVER_API_SIZE = 1024;

const FONT_PATH = join(process.cwd(), "public", "fonts", "Cinzel.ttf");

/** Cinzel ships as a variable font (wght 400-900). Days 1-30 use very heavy
 *  engraved caps, so pin the axis near the top of its range. */
const TITLE_WEIGHT = 800;
const LABEL_WEIGHT = 700;

/** @types/opentype.js predates the variable-font API that the shipped runtime
 *  has, so declare just the part we use rather than casting the whole font. */
type VariableFont = opentype.Font & {
  variation: { set: (axes: Record<string, number>) => void };
};

type LoadedFont = VariableFont;
const fontCache = new Map<number, LoadedFont>();

function loadFont(weight: number): LoadedFont {
  const cached = fontCache.get(weight);
  if (cached) return cached;

  const buffer = readFileSync(FONT_PATH);
  const font = opentype.parse(
    buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
  ) as VariableFont;
  font.variation.set({ wght: weight });
  fontCache.set(weight, font);
  return font;
}

/**
 * Lay out a run of text as SVG path data, applying tracking by advancing each
 * glyph manually (opentype has no letter-spacing of its own).
 *
 * Returns ONE PATH PER GLYPH, not one concatenated path for the whole run.
 * That matters: librsvg silently truncates a `d` attribute past a size limit
 * somewhere above ~13.5k characters, which rendered "Samuel Hears God and the
 * Ark Is Taken" as "SAMU / AND TH" — the glyphs beyond the cut simply vanished,
 * with no error from sharp. Per-glyph paths keep every attribute near 800
 * characters, so the cliff cannot be reached no matter how long the title.
 */
/** Format one coordinate. Never emits NaN/Infinity — see serializePath. */
function coord(value: number) {
  if (!Number.isFinite(value)) return "0";
  // One decimal is sub-pixel on a 1254px canvas; trim the trailing ".0".
  return String(Number(value.toFixed(1)));
}

/**
 * Serialize an opentype path ourselves rather than calling `toPathData()`.
 *
 * opentype.js's serializer returns the literal string "NaN" for coordinates
 * carrying floating-point noise — a real command of {x: 546.0000000000001}
 * came out as "LNaN-72.2". librsvg then discards that whole path without an
 * error, so a single letter silently disappeared from the middle of a title
 * ("DAVID'S LATER REIGN" rendered as "DAVID'S L TER REIGN"). Formatting the
 * numbers here keeps that class of bug out of the pipeline entirely.
 */
function serializePath(path: { commands: Array<Record<string, unknown>> }) {
  const out: string[] = [];
  for (const command of path.commands) {
    const type = command.type as string;
    const n = (key: string) => coord(command[key] as number);
    if (type === "M") out.push(`M${n("x")} ${n("y")}`);
    else if (type === "L") out.push(`L${n("x")} ${n("y")}`);
    else if (type === "C")
      out.push(`C${n("x1")} ${n("y1")} ${n("x2")} ${n("y2")} ${n("x")} ${n("y")}`);
    else if (type === "Q") out.push(`Q${n("x1")} ${n("y1")} ${n("x")} ${n("y")}`);
    else if (type === "Z") out.push("Z");
  }
  return out.join("");
}

function trackedPath(
  font: LoadedFont,
  text: string,
  fontSize: number,
  tracking: number,
) {
  const parts: string[] = [];
  let x = 0;
  for (const char of Array.from(text)) {
    const glyph = font.charToGlyph(char);
    const d = serializePath(glyph.getPath(x, 0, fontSize));
    if (d) parts.push(d); // spaces render to nothing
    x += ((glyph.advanceWidth ?? 0) / font.unitsPerEm) * fontSize + tracking;
  }
  return { parts, width: Math.max(0, x - tracking) };
}

/** Width of a run at 1px, for solving the font size that fills a given width. */
function unitWidth(font: LoadedFont, text: string, trackingRatio: number) {
  return trackedPath(font, text, 1, trackingRatio).width;
}

/** The look, held constant across every day so 365 covers read as one set.
 *  LAYER 1 of the prompt: permanent Bible Buddy art direction. */
const COVER_STYLE_DIRECTION = [
  // Louis picked the darker, high-contrast look (day 31 candidate-3) as the
  // house style over a brighter variant. Keep the deep blacks — softening them
  // produced a uniformly amber, painterly frame, which is worse.
  "Poster key art for a prestige biblical historical epic.",
  "Photorealistic cinematic still — not illustration, not painting, not watercolour.",
  "High dynamic range: genuine deep blacks and crushed shadow in the frame corners,",
  "set against blazing specular highlights. Strong chiaroscuro, never a uniform colour wash.",
  "Palette anchored in rich black and dark brown, with bronze and antique gold midtones,",
  "amber and fire-orange key light, and cool slate-blue or steel-grey storm cloud for contrast.",
  "Never tint the whole frame a single colour.",
  "Volumetric god-rays, airborne dust, smoke and embers,",
  "atmospheric haze separating foreground, midground and background.",
  "Real human anatomy and faces with visible skin texture and expression.",
  "Historically plausible ancient Near Eastern garments — undyed linen, ochre,",
  "madder red, indigo — with authentic weave and wear.",
  "Monumental scale, extreme detail, reverent and awe-filled.",
  "Never cartoonish, never modern, never fantasy art, never devotional clip art.",
].join(" ");

/** Composition rules. The subject must DOMINATE — a distant landscape with
 *  small figures is the single most common failure. */
const COMPOSITION_DIRECTION = [
  "Square 1:1 composition, filled edge to edge with detail and no empty dead space.",
  "One clear focal subject dominates the frame, occupying roughly 25-40% of it,",
  "with a strong readable silhouette so the cover still works as a small thumbnail.",
  "Secondary figures or crowd fill the lower third; environment carries the rest.",
  "Reserve the top 30% for sky, cloud, smoke or darkness carrying no critical detail,",
  "and keep that band tonally DARKER than the midground so gold lettering placed",
  "over it stays legible.",
].join(" ");

/** Non-negotiable. Any lettering the model draws will fight the real title. */
const NO_TEXT_DIRECTION = [
  "Absolutely no text, no letters, no words, no numerals, no captions,",
  "no titles, no watermarks, no signatures, and no logos anywhere in the image.",
].join(" ");

export type BibleYearCoverSubject = {
  dayNumber: number;
  title: string;
  reference: string;
};

/**
 * Build the image prompt for one day.
 *
 * LAYER 1 is the fixed art direction above. LAYER 2 is the day-specific
 * creative brief — the primary event, focal subject, figures, environment and
 * light for that day's actual reading. Without Layer 2 the model has nothing
 * but a title to work from and reliably returns generic biblical scenery, so
 * the brief is where the picture actually comes from.
 */
export function buildBibleYearCoverPrompt(
  subject: BibleYearCoverSubject,
  brief?: string | null,
) {
  const scene = brief?.trim()
    ? brief.trim()
    : `A dramatic scene depicting "${subject.title}" from ${subject.reference}.`;

  return [
    scene,
    COVER_STYLE_DIRECTION,
    COMPOSITION_DIRECTION,
    NO_TEXT_DIRECTION,
  ].join(" ");
}

/** Exported so the brief-writing script can prepend the same art direction
 *  when it explains the house style to the text model. */
export const BIBLE_YEAR_COVER_ART_DIRECTION = COVER_STYLE_DIRECTION;

/** En-dash reads better than a hyphen in a chapter range on a title card. */
function formatReference(reference: string) {
  return reference.replace(/(\d)\s*-\s*(\d)/g, "$1–$2").toUpperCase();
}

/**
 * Choose the line break that lets the title be set BIGGEST.
 *
 * The look on days 1-30 comes from few words per line at a huge point size.
 * Day 27 breaks "The Covenant Law" as THE / COVENANT LAW — the article gets a
 * line to itself so the real words can fill the frame. Rather than encode that
 * as a special case, try every contiguous split into 1-3 lines and keep the one
 * whose longest line is shortest. Ties go to the arrangement whose lines grow
 * toward the bottom, which is what both day 26 and day 27 do.
 */
function chooseTitleLines(
  font: LoadedFont,
  title: string,
  trackingRatio: number,
  lineBudget: number,
) {
  const words = title.toUpperCase().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return words;

  const candidates: string[][] = [];
  const maxLines = Math.min(lineBudget, words.length);

  // Every way to cut the word list into 1..maxLines contiguous runs.
  const cut = (start: number, remaining: number, acc: string[][]) => {
    if (remaining === 1) {
      candidates.push([...acc, words.slice(start)].map((w) => w.join(" ")));
      return;
    }
    for (let end = start + 1; end <= words.length - (remaining - 1); end += 1) {
      cut(end, remaining - 1, [...acc, words.slice(start, end)]);
    }
  };
  for (let lines = 1; lines <= maxLines; lines += 1) cut(0, lines, []);

  let best = candidates[0];
  let bestWidth = Infinity;
  let bestGrowth = -Infinity;

  for (const candidate of candidates) {
    const widths = candidate.map((line) => unitWidth(font, line, trackingRatio));
    const widest = Math.max(...widths);
    // Bottom-heavy = each line at least as wide as the one above it.
    const growth = widths.every((w, i) => i === 0 || w >= widths[i - 1] - 0.01) ? 1 : 0;

    if (widest < bestWidth - 0.001 || (Math.abs(widest - bestWidth) <= 0.001 && growth > bestGrowth)) {
      best = candidate;
      bestWidth = widest;
      bestGrowth = growth;
    }
  }

  return best;
}

/**
 * The title block as a standalone SVG, sized to the cover. Composite this over
 * the generated art with sharp. Returns a UTF-8 SVG string.
 *
 * Each run is drawn as three stacked passes to get the days 1-30 look:
 *   1. a thick dark outline underneath, so it reads as a cut edge
 *   2. the gold gradient fill
 *   3. bright "bulb" dots tracing the strokes, via a dashed stroke
 */
export function buildBibleYearCoverTitleSvg(subject: BibleYearCoverSubject) {
  const size = BIBLE_YEAR_COVER_SIZE;
  const centerX = size / 2;
  // Day 26's longest line covers ~0.91 of the frame. Match it.
  const safeWidth = size * 0.91;

  const titleFont = loadFont(TITLE_WEIGHT);
  const labelFont = loadFont(LABEL_WEIGHT);

  const titleTracking = 0.02;

  // Two lines is the house pattern (day 26: THE TEN / COMMANDMENTS,
  // day 27: THE / COVENANT LAW). Only spend a third line when two would force
  // the type below the floor where it stops reading as a movie-poster title.
  const TITLE_SIZE_FLOOR = size * 0.072;
  const layout = (budget: number) => {
    const lines = chooseTitleLines(titleFont, subject.title, titleTracking, budget);
    const widest = Math.max(...lines.map((l) => unitWidth(titleFont, l, titleTracking)));
    return { lines, size: Math.min(size * 0.135, safeWidth / widest) };
  };

  let chosen = layout(2);
  if (chosen.size < TITLE_SIZE_FLOOR) {
    const three = layout(3);
    if (three.size > chosen.size) chosen = three;
  }

  const titleLines = chosen.lines;
  const titleSize = chosen.size;
  const lineHeight = titleSize * 1.02;

  const dayLabel = `DAY ${subject.dayNumber}`;
  const daySize = size * 0.028;
  const dayTracking = 0.3;
  const referenceLabel = formatReference(subject.reference);
  const referenceSize = size * 0.038;
  const referenceTracking = 0.1;

  const dayRun = trackedPath(labelFont, dayLabel, daySize, daySize * dayTracking);
  const referenceRun = trackedPath(
    labelFont,
    referenceLabel,
    referenceSize,
    referenceSize * referenceTracking,
  );

  const dayY = size * 0.062;
  const titleTop = size * 0.082 + titleSize * 0.72;
  const lastTitleY = titleTop + (titleLines.length - 1) * lineHeight;
  const referenceY = lastTitleY + size * 0.052;
  const flourishY = referenceY + size * 0.028;

  const ruleHalf = size * 0.21;
  const ruleGap = dayRun.width / 2 + size * 0.022;

  /** One run, drawn as outline + fill + bulbs at the same coordinates.
   *  Stroke and fill are set on the group and inherit to each glyph path. */
  const run = (parts: string[], width: number, y: number, cls: string) => {
    const x = centerX - width / 2;
    const glyphs = parts.map((d) => `<path d="${d}"/>`).join("");
    return [`outline ${cls}`, `fill ${cls}`, `bulbs ${cls}`]
      .map(
        (layer) =>
          `<g class="${layer}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">${glyphs}</g>`,
      )
      .join("\n    ");
  };

  const titleRuns = titleLines
    .map((line, index) => {
      const laid = trackedPath(titleFont, line, titleSize, titleSize * titleTracking);
      return run(laid.parts, laid.width, titleTop + index * lineHeight, "titleRun");
    })
    .join("\n    ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFF6CC"/>
      <stop offset="20%" stop-color="#F7DA79"/>
      <stop offset="48%" stop-color="#E2A62E"/>
      <stop offset="76%" stop-color="#C87A14"/>
      <stop offset="100%" stop-color="#8A4A09"/>
    </linearGradient>
    <filter id="emberGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="0" stdDeviation="${(size * 0.016).toFixed(1)}" flood-color="#FF9A22" flood-opacity="0.75"/>
      <feDropShadow dx="0" dy="${(size * 0.002).toFixed(1)}" stdDeviation="${(size * 0.004).toFixed(1)}" flood-color="#1A0B02" flood-opacity="0.9"/>
    </filter>
    <!-- Matches the approved day 31 candidate-3. Do not lighten without
         re-checking a generated cover: the title sits directly on this band. -->
    <linearGradient id="topScrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#12080F" stop-opacity="0.42"/>
      <stop offset="55%" stop-color="#12080F" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#12080F" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <style>
    .outline {
      fill: none;
      stroke: #1E0D06;
      stroke-linejoin: round;
      opacity: 0.94;
    }
    .fill { fill: url(#gold); stroke: url(#gold); }
    .bulbs {
      fill: none;
      stroke: #FFF9E0;
      stroke-linecap: round;
    }
    .titleRun.outline { stroke-width: ${(titleSize * 0.13).toFixed(1)}; }
    .titleRun.fill { stroke-width: ${(titleSize * 0.012).toFixed(2)}; }
    .titleRun.bulbs {
      stroke-width: ${(titleSize * 0.03).toFixed(2)};
      stroke-dasharray: 0.1 ${(titleSize * 0.145).toFixed(2)};
    }
    .labelRun.outline { stroke-width: ${(size * 0.006).toFixed(2)}; }
    .labelRun.fill { stroke-width: 0; }
    .labelRun.bulbs { stroke-width: 0; stroke-dasharray: none; }
    .rule { stroke: #D89A2B; stroke-width: ${(size * 0.0015).toFixed(2)}; opacity: 0.9; }
    .filigree { fill: none; stroke: #D89A2B; stroke-width: ${(size * 0.0017).toFixed(2)}; opacity: 0.88; }
  </style>

  <rect x="0" y="0" width="${size}" height="${size * 0.34}" fill="url(#topScrim)"/>

  <g filter="url(#emberGlow)">
    <line class="rule" x1="${centerX - ruleHalf}" y1="${(dayY - size * 0.009).toFixed(1)}" x2="${(centerX - ruleGap).toFixed(1)}" y2="${(dayY - size * 0.009).toFixed(1)}"/>
    <line class="rule" x1="${(centerX + ruleGap).toFixed(1)}" y1="${(dayY - size * 0.009).toFixed(1)}" x2="${centerX + ruleHalf}" y2="${(dayY - size * 0.009).toFixed(1)}"/>
    ${run(dayRun.parts, dayRun.width, dayY, "labelRun")}

    ${titleRuns}

    ${run(referenceRun.parts, referenceRun.width, referenceY, "labelRun")}

    <g class="filigree">
      <path d="M ${centerX - size * 0.017} ${flourishY}
        c ${-size * 0.012} ${-size * 0.011} ${-size * 0.03} ${-size * 0.011} ${-size * 0.038} ${-size * 0.002}
        c ${-size * 0.007} ${size * 0.008} ${size * 0.004} ${size * 0.015} ${size * 0.014} ${size * 0.009}
        c ${size * 0.009} ${-size * 0.005} ${size * 0.012} ${-size * 0.012} ${size * 0.024} ${-size * 0.007}"/>
      <path transform="translate(${centerX * 2} 0) scale(-1 1)" d="M ${centerX - size * 0.017} ${flourishY}
        c ${-size * 0.012} ${-size * 0.011} ${-size * 0.03} ${-size * 0.011} ${-size * 0.038} ${-size * 0.002}
        c ${-size * 0.007} ${size * 0.008} ${size * 0.004} ${size * 0.015} ${size * 0.014} ${size * 0.009}
        c ${size * 0.009} ${-size * 0.005} ${size * 0.012} ${-size * 0.012} ${size * 0.024} ${-size * 0.007}"/>
    </g>
    <circle cx="${centerX}" cy="${(flourishY - size * 0.004).toFixed(1)}" r="${(size * 0.0038).toFixed(2)}" fill="#E8B347"/>
  </g>
</svg>`;
}
