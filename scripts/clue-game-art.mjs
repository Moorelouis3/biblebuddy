/**
 * Bring Bible Clue Game card art into the app.
 *
 *   node scripts/clue-game-art.mjs <folder with Drive exports>
 *
 * Reads files named like the Drive manifest ("22-joseph-mystery.png",
 * "22-joseph-reveal.png", "genesis-card-back.png"), resizes them to 600px
 * WebP and writes public/games/clue/genesis/art/<key>-m.webp / -r.webp, where
 * <key> is lib/clueGame/ref.ts artKey(id): an opaque name, so a silhouette's
 * URL does not give the answer away. The id is the card id in
 * lib/clueGame/decks (the slug after the number, e.g. "josephs-silver-cup").
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

function artKey(id) {
  let h = 0x811c9dc5;
  for (const ch of `bbclue:${id}`) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36).padStart(7, "0");
}

const src = process.argv[2];
if (!src) throw new Error("usage: node scripts/clue-game-art.mjs <folder>");
const out = "public/games/clue/genesis/art";
fs.mkdirSync(out, { recursive: true });
for (const file of fs.readdirSync(src)) {
  const m = file.match(/^\d+-(.+)-(mystery|reveal)\.png$/i);
  const back = /^genesis-card-back\.png$/i.test(file);
  if (!m && !back) continue;
  const target = back ? "card-back.webp" : `${artKey(m[1])}-${m[2] === "mystery" ? "m" : "r"}.webp`;
  await sharp(path.join(src, file)).resize({ width: 600 }).webp({ quality: 82, alphaQuality: 90 }).toFile(path.join(out, target));
  console.log(file, "→", target);
}
