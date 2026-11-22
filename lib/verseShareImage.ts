import { BIBLE_COVERS, readBibleCover } from "./bibleCovers";
import { shareImage } from "./nativeShare";

/**
 * The picture a shared verse becomes (Louis, 2026-11-22: "black bg with the
 * verse and the book and chapter: verse at the bottom of it... and anywhere
 * the share button is").
 *
 * One drawing for every verse share button in the app, so a verse looks the
 * same whether it came from the Bible reader or the Verse of the Day:
 *
 * - The background is the sharer's Bible Cover art, cover-fitted, under a dark
 *   wash so white text always reads. No cover (Light or Dark): plain black.
 *   Art that will not load falls back to the cover's base colour, then black.
 * - The verse, white, large, centred and wrapped; long verses shrink to fit.
 * - The reference ("John 3:16") at the bottom, with a quiet Bible Buddy mark.
 *
 * Sharing the result is lib/nativeShare.ts (shareImage), not this file.
 */

export type VerseShareInput = {
  /** The verse text, without quotation marks. */
  text: string;
  /** "John 3:16". */
  reference: string;
  /** Optional, shown small after the reference: "KJV". */
  translation?: string | null;
  /** Square by default. */
  size?: number;
};

const FONT_STACK = 'Georgia, "Times New Roman", serif';
const SANS_STACK = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

/** Turns "1 john" or "song-of-solomon" into "1 John" / "Song Of Solomon". */
export function formatVerseReference(book: string, chapter: number | string, verse: number | string): string {
  const name = String(book)
    .replace(/[-_]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return `${name} ${chapter}:${verse}`;
}

const imageCache = new Map<string, Promise<HTMLImageElement | null>>();

/**
 * The load itself is cached and never cut short, so art that arrives late
 * (a slow connection) is ready for the next share. Only the wait for it is
 * capped, so a share never hangs on a picture.
 */
function loadImage(src: string, timeoutMs = 2500): Promise<HTMLImageElement | null> {
  let pending = imageCache.get(src);
  if (!pending) {
    pending = loadImageUncached(src).then((img) => {
      // A failure is not remembered, so the next share tries again.
      if (!img) imageCache.delete(src);
      return img;
    });
    imageCache.set(src, pending);
  }
  return Promise.race([
    pending,
    new Promise<null>((resolve) => window.setTimeout(() => resolve(null), timeoutMs)),
  ]);
}

function coverArtSrc(): string | null {
  const coverId = readBibleCover();
  const cover = coverId ? BIBLE_COVERS[coverId] : null;
  if (!cover?.art) return null;
  const wide = typeof window !== "undefined" && window.matchMedia?.("(min-width: 900px)").matches;
  return wide ? cover.art.desktop : cover.art.mobile;
}

/**
 * Loads the cover art ahead of the tap. Safari only lets a share sheet open
 * shortly after the tap, so the picture has to be quick to draw by then.
 */
export function warmVerseShareImage() {
  if (typeof window === "undefined") return;
  const src = coverArtSrc();
  if (src) void loadImage(src);
}

function loadImageUncached(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    // Same-origin art, so the canvas stays exportable.
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/** What sits behind the verse: the sharer's cover art, its base colour, or black. */
async function drawBackground(ctx: CanvasRenderingContext2D, size: number) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, size, size);

  const coverId = readBibleCover();
  const cover = coverId ? BIBLE_COVERS[coverId] : null;
  if (!cover || !cover.art) return;

  ctx.fillStyle = cover.base || "#000000";
  ctx.fillRect(0, 0, size, size);

  // The art the page is already showing, so it is usually in the cache.
  const src = coverArtSrc();
  const img = (src ? await loadImage(src) : null) ?? (await loadImage(cover.art.thumb, 1200));
  if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
    const scale = Math.max(size / img.naturalWidth, size / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
  }

  // A dark wash strong enough that white text reads on any cover, a touch
  // heavier at the bottom where the reference sits.
  ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
  ctx.fillRect(0, 0, size, size);
  const fade = ctx.createLinearGradient(0, size * 0.55, 0, size);
  fade.addColorStop(0, "rgba(0,0,0,0)");
  fade.addColorStop(1, "rgba(0,0,0,0.45)");
  ctx.fillStyle = fade;
  ctx.fillRect(0, size * 0.55, size, size * 0.45);
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth || !line) {
      line = next;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Draws the verse and returns it as a canvas. */
export async function drawVerseShareCanvas(input: VerseShareInput): Promise<HTMLCanvasElement> {
  const size = input.size ?? 1080;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not available.");

  await drawBackground(ctx, size);

  const padding = size * 0.1;
  const maxWidth = size - padding * 2;
  // The verse gets the space above the reference block.
  const verseTop = padding;
  const verseBottom = size - padding - size * 0.14;
  const available = verseBottom - verseTop;

  const verse = `“${input.text.replace(/\s+/g, " ").trim().replace(/^["“]|["”]$/g, "")}”`;

  // Largest size that fits, from 76px down to 26px.
  let fontSize = Math.round(size * 0.07);
  let lines: string[] = [];
  let lineHeight = 0;
  while (fontSize >= Math.round(size * 0.024)) {
    ctx.font = `600 ${fontSize}px ${FONT_STACK}`;
    lines = wrapLines(ctx, verse, maxWidth);
    lineHeight = fontSize * 1.32;
    if (lines.length * lineHeight <= available) break;
    fontSize -= 2;
  }

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.35)";
  ctx.shadowBlur = size * 0.01;
  const blockHeight = lines.length * lineHeight;
  const startY = verseTop + Math.max(0, (available - blockHeight) / 2) + lineHeight / 2;
  lines.forEach((line, index) => {
    ctx.fillText(line, size / 2, startY + index * lineHeight, maxWidth);
  });
  ctx.shadowBlur = 0;

  // The reference, at the bottom.
  const refY = size - padding - size * 0.04;
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.fillRect(size / 2 - size * 0.04, refY - size * 0.06, size * 0.08, Math.max(2, size * 0.0025));
  ctx.fillStyle = "#ffffff";
  ctx.font = `800 ${Math.round(size * 0.042)}px ${SANS_STACK}`;
  const reference = input.translation ? `${input.reference}  ·  ${input.translation}` : input.reference;
  ctx.fillText(reference, size / 2, refY, maxWidth);

  // A subtle mark.
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = `700 ${Math.round(size * 0.022)}px ${SANS_STACK}`;
  ctx.fillText("Bible Buddy", size / 2, size - padding * 0.45);

  return canvas;
}

/**
 * Every verse share button calls this: the picture where the device can
 * share one, the verse as text (with the link) where it cannot.
 */
export async function shareVerseImage(input: VerseShareInput & { url?: string; title?: string }) {
  const words = `“${input.text.trim()}” - ${input.reference}${input.translation ? ` (${input.translation})` : ""}`;
  return shareImage({
    title: input.title ?? `${input.reference} - Bible Buddy`,
    text: words,
    url: input.url,
    file: () => createVerseShareFile(input),
  });
}

/** The verse as a PNG file, ready for lib/nativeShare.ts shareImage. */
export async function createVerseShareFile(input: VerseShareInput): Promise<File> {
  const canvas = await drawVerseShareCanvas(input);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Could not make the verse image.");
  const slug = input.reference.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return new File([blob], `${slug || "verse"}-bible-buddy.png`, { type: "image/png" });
}
