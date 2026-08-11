// lib/bibleYearCoverStyle.ts
// Shared style definition for Bible in One Year day covers.
//
// Covers are built in two passes:
//   1. The scene art is generated WITHOUT any lettering.
//   2. The title block is composited on top from real text.
//
// Pass 2 exists because image models misspell rendered words often enough that
// at 365 covers it is a guarantee, not a risk. Compositing keeps every day
// number, title, and reference exactly right and identical in placement.

export const BIBLE_YEAR_COVER_SIZE = 1024;

/** Ornate engraved-caps stack. Cinzel is the closest free match to the look of
 *  days 1-30; the rest are fallbacks so a missing font degrades instead of
 *  breaking. Drop a .ttf in public/fonts and add it here to pin it. */
export const BIBLE_YEAR_COVER_FONT_STACK =
  "Cinzel, 'Trajan Pro', 'Optimus Princeps', Georgia, 'Times New Roman', serif";

/** The look, held constant across every day so 365 covers read as one set. */
const COVER_STYLE_DIRECTION = [
  "Cinematic biblical scene, painterly digital realism, highly detailed.",
  "Dramatic chiaroscuro lighting on a dark background.",
  "Warm golden and amber firelight with glowing embers in the air.",
  "Epic scale and depth, moody storm atmosphere, volumetric light shafts.",
  "Muted earth tones with strong gold highlights; deep shadow in the lower third.",
  "Reverent and awe-filled in mood, never cartoonish, never modern.",
].join(" ");

/** Kept clear so the composited title block always lands on quiet pixels. */
const COMPOSITION_DIRECTION = [
  "Square 1:1 composition.",
  "Keep the upper third of the frame visually calm and uncluttered —",
  "sky, smoke, or shadow — with the main subject in the middle and lower thirds.",
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
 * Build the image prompt for one day. The title and reference describe the
 * scene to the model but are never drawn — they are composited afterwards.
 */
export function buildBibleYearCoverPrompt(subject: BibleYearCoverSubject) {
  return [
    `A dramatic scene depicting "${subject.title}" from ${subject.reference}.`,
    COVER_STYLE_DIRECTION,
    COMPOSITION_DIRECTION,
    NO_TEXT_DIRECTION,
  ].join(" ");
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** En-dash reads better than a hyphen in a chapter range on a title card. */
function formatReference(reference: string) {
  return reference.replace(/(\d)\s*-\s*(\d)/g, "$1–$2").toUpperCase();
}

/**
 * Wrap so each line stays short enough to be set LARGE — the look on days 1-30
 * comes from few words per line at a big point size, not from fitting the whole
 * title across one line. "The Ten Commandments" becomes THE TEN / COMMANDMENTS.
 */
const MAX_LINE_CHARS = 14;

function wrapTitle(title: string, maxLines: number) {
  const words = title.toUpperCase().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return words;

  const pack = (limit: number) => {
    const out: string[] = [];
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (current && candidate.length > limit) {
        out.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) out.push(current);
    return out;
  };

  // Widen the line budget until the title fits in the allowed number of lines.
  for (let limit = MAX_LINE_CHARS; limit <= title.length; limit += 2) {
    const packed = pack(limit);
    if (packed.length <= maxLines) return packed;
  }
  return pack(title.length);
}

/** Measured against the rendered output rather than assumed — engraved caps in
 *  this stack come out near 0.75em per glyph including letter-spacing. */
const CHAR_WIDTH_RATIO = 0.75;

function fitFontSize(text: string, maxWidth: number, maxSize: number) {
  if (!text.length) return maxSize;
  return Math.min(maxSize, maxWidth / (text.length * CHAR_WIDTH_RATIO));
}

/**
 * The title block as a standalone SVG, sized to the cover. Composite this over
 * the generated art with sharp. Returns a UTF-8 SVG string.
 */
export function buildBibleYearCoverTitleSvg(subject: BibleYearCoverSubject) {
  const size = BIBLE_YEAR_COVER_SIZE;
  const safeWidth = size * 0.84;
  const centerX = size / 2;

  const dayLabel = `DAY ${subject.dayNumber}`;
  const titleLines = wrapTitle(subject.title, 3);
  const referenceLabel = formatReference(subject.reference);

  const longestLine = titleLines.reduce((a, b) => (a.length >= b.length ? a : b), "");
  const titleSize = fitFontSize(longestLine, safeWidth, titleLines.length > 2 ? 96 : 116);
  const lineHeight = titleSize * 1.02;

  const dayY = size * 0.075;
  const titleTop = size * 0.135 + titleSize;
  const referenceY = titleTop + (titleLines.length - 1) * lineHeight + titleSize * 0.72;

  const ruleHalf = safeWidth * 0.5;
  const dayTextWidth = dayLabel.length * 26 * 0.72;
  const ruleGap = dayTextWidth / 2 + 26;

  const titleTspans = titleLines
    .map((line, index) => {
      const y = titleTop + index * lineHeight;
      return `<text x="${centerX}" y="${y}" class="title">${escapeXml(line)}</text>`;
    })
    .join("\n    ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FBEBB5"/>
      <stop offset="38%" stop-color="#EFC24E"/>
      <stop offset="72%" stop-color="#D2871F"/>
      <stop offset="100%" stop-color="#A85C12"/>
    </linearGradient>
    <filter id="emberGlow" x="-35%" y="-35%" width="170%" height="170%">
      <feDropShadow dx="0" dy="0" stdDeviation="16" flood-color="#FF8A1E" flood-opacity="0.55"/>
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#2A1402" flood-opacity="0.85"/>
    </filter>
    <linearGradient id="topScrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.62"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="${size}" height="${size * 0.42}" fill="url(#topScrim)"/>

  <style>
    text { font-family: ${BIBLE_YEAR_COVER_FONT_STACK}; text-anchor: middle; fill: url(#gold); }
    .title { font-size: ${titleSize.toFixed(1)}px; font-weight: 700; letter-spacing: ${(titleSize * 0.035).toFixed(2)}px; filter: url(#emberGlow); }
    .day { font-size: 26px; font-weight: 600; letter-spacing: 7px; }
    .reference { font-size: 30px; font-weight: 600; letter-spacing: 4.5px; }
    .rule { stroke: #D2871F; stroke-width: 1.6; opacity: 0.85; }
  </style>

  <line class="rule" x1="${centerX - ruleHalf * 0.55}" y1="${dayY - 8}" x2="${centerX - ruleGap}" y2="${dayY - 8}"/>
  <line class="rule" x1="${centerX + ruleGap}" y1="${dayY - 8}" x2="${centerX + ruleHalf * 0.55}" y2="${dayY - 8}"/>
  <text x="${centerX}" y="${dayY}" class="day">${escapeXml(dayLabel)}</text>

  ${titleTspans}

  <text x="${centerX}" y="${referenceY}" class="reference">${escapeXml(referenceLabel)}</text>
</svg>`;
}
