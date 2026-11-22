/**
 * Bring Bible Clue Game card art into the app.
 *
 *   npx tsx scripts/clue-game-art.ts <folder with the Drive exports>
 *
 * Reads files named like the Drive manifest ("22-joseph-mystery.png",
 * "22-joseph-reveal.png", "genesis-card-back.png"). The NUMBER picks the card
 * (lib/clueGame/decks/genesis.ts roster order), so a name spelled differently
 * in Drive ("pharaoh-of-josephs-day" for the card "pharaoh") still lands on
 * the right card. Each is resized to 600px WebP and written as
 * public/games/clue/genesis/art/<artKey(id)>-m.webp / -r.webp: an opaque
 * name, so a silhouette's URL never gives the answer away.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { GENESIS_CARDS } from "../lib/clueGame/decks/genesis";
import { artKey } from "../lib/clueGame/ref";

const src = process.argv[2];
if (!src) throw new Error("usage: npx tsx scripts/clue-game-art.ts <folder>");
const out = "public/games/clue/genesis/art";
fs.mkdirSync(out, { recursive: true });
const byNumber = new Map(GENESIS_CARDS.map((c) => [c.number, c]));

(async () => {
  let done = 0;
  for (const file of fs.readdirSync(src).sort()) {
    const back = /^genesis-card-back\.png$/i.test(file);
    const m = file.match(/^(\d+)-.+-(mystery|reveal)\.png$/i);
    if (!m && !back) continue;
    let target = "card-back.webp";
    if (m) {
      const card = byNumber.get(Number(m[1]));
      if (!card) {
        console.log("no card numbered", m[1], "for", file);
        continue;
      }
      target = `${artKey(card.id)}-${m[2].toLowerCase() === "mystery" ? "m" : "r"}.webp`;
    }
    await sharp(path.join(src, file)).resize({ width: 600 }).webp({ quality: 82, alphaQuality: 90 }).toFile(path.join(out, target));
    done += 1;
  }
  console.log(`${done} files written to ${out}`);
})();
