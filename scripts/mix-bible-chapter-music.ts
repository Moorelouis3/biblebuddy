/**
 * Lay a music bed under the already-generated Bible chapter narration.
 *
 * This NEVER calls OpenAI. It reads the plain narration mp3s that are already
 * cached in Supabase storage, mixes a bed under each one, and writes the result
 * back as a "-music.mp3" sibling. The app prefers that sibling when it exists
 * and falls back to the plain file when it does not, so a half-finished run is
 * harmless and the job can be stopped and resumed freely.
 *
 *   npx tsx scripts/mix-bible-chapter-music.ts                  # everything missing a mix
 *   npx tsx scripts/mix-bible-chapter-music.ts --limit 5        # try a handful first
 *   npx tsx scripts/mix-bible-chapter-music.ts --book genesis
 *   npx tsx scripts/mix-bible-chapter-music.ts --music 2 --gain 0.06
 *   npx tsx scripts/mix-bible-chapter-music.ts --force          # redo existing mixes
 */
import { execFileSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import ffmpegPath from "ffmpeg-static";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import {
  BIBLE_CHAPTER_MUSIC_SUFFIX,
  BIBLE_CHAPTER_TTS_BUCKET,
  getBibleChapterTtsMusicPath,
} from "../lib/bibleChapterTtsAudio";

config({ path: ".env.local" });

const FFMPEG = ffmpegPath as unknown as string;
const SR = 24000;

function arg(name: string, fallback: string) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (hit) return hit.split("=").slice(1).join("=");
  const idx = process.argv.indexOf(`--${name}`);
  if (idx !== -1 && process.argv[idx + 1] && !process.argv[idx + 1].startsWith("--")) {
    return process.argv[idx + 1];
  }
  return fallback;
}

const MUSIC_TRACK = arg("music", "1");
const MUSIC_GAIN = Number(arg("gain", "0.08"));
const LIMIT = Number(arg("limit", "0"));
const ONLY_BOOK = arg("book", "").toLowerCase();
const FORCE = process.argv.includes("--force");

const MUSIC_FILE = path.join(process.cwd(), "public", "audio", "background", `bible-reading-${MUSIC_TRACK}.mp3`);

function decodeToMono(file: string) {
  const raw = execFileSync(
    FFMPEG,
    ["-hide_banner", "-loglevel", "error", "-i", file, "-ac", "1", "-ar", String(SR), "-f", "f32le", "-"],
    { maxBuffer: 1 << 28 },
  );
  return new Float32Array(raw.buffer, raw.byteOffset, Math.floor(raw.length / 4));
}

/**
 * The beds are 3-4 minutes and a chapter can run much longer, so butt-joining
 * loops would click at every seam. Fold the tail back over the head once and
 * tile that crossfaded unit instead. Same approach as the Bible-in-One-Year
 * renderer, so the two features sound like the same app.
 */
function buildLoopedBed(music: Float32Array, needed: number, crossfadeSeconds = 4) {
  const cf = Math.min(Math.round(crossfadeSeconds * SR), Math.floor(music.length / 3));
  const unitLength = music.length - cf;
  const unit = new Float32Array(unitLength);

  for (let i = 0; i < unitLength; i += 1) {
    if (i < cf) {
      const t = i / cf;
      unit[i] = music[i] * t + music[unitLength + i] * (1 - t);
    } else {
      unit[i] = music[i];
    }
  }

  const out = new Float32Array(needed);
  for (let i = 0; i < needed; i += 1) out[i] = unit[i % unitLength];
  return out;
}

function mixWithBed(voice: Float32Array, bed: Float32Array, gain: number) {
  const tail = SR * 3;
  const length = voice.length + tail;
  const out = new Float32Array(length);
  let peak = 0;

  for (let i = 0; i < length; i += 1) {
    const fadeIn = Math.min(1, i / (SR * 2));
    const fadeOut = Math.min(1, (length - i) / (SR * 3));
    const ambience = (bed[i] || 0) * gain * fadeIn * fadeOut;
    const voiced = i < voice.length ? voice[i] : 0;
    const mixed = voiced + ambience;
    out[i] = mixed;
    peak = Math.max(peak, Math.abs(mixed));
  }

  if (peak > 0.98) {
    const scale = 0.98 / peak;
    for (let i = 0; i < length; i += 1) out[i] *= scale;
  }
  return out;
}

function encodeMp3(samples: Float32Array, outFile: string) {
  execFileSync(
    FFMPEG,
    [
      "-hide_banner", "-loglevel", "error", "-y",
      "-f", "f32le", "-ar", String(SR), "-ac", "1", "-i", "pipe:0",
      "-codec:a", "libmp3lame", "-b:a", "96k", outFile,
    ],
    { input: Buffer.from(samples.buffer, samples.byteOffset, samples.byteLength), maxBuffer: 1 << 28 },
  );
}

type ChapterFile = { book: string; chapter: string; path: string };

async function listPlainNarrations(supabase: any): Promise<ChapterFile[]> {
  const found: ChapterFile[] = [];
  const { data: books, error } = await supabase.storage.from(BIBLE_CHAPTER_TTS_BUCKET).list("bible", { limit: 1000 });
  if (error) throw new Error(`Could not list books: ${error.message}`);

  for (const book of books || []) {
    if (ONLY_BOOK && book.name.toLowerCase() !== ONLY_BOOK) continue;
    const { data: chapters } = await supabase.storage
      .from(BIBLE_CHAPTER_TTS_BUCKET)
      .list(`bible/${book.name}`, { limit: 1000 });

    for (const chapter of chapters || []) {
      const dir = `bible/${book.name}/${chapter.name}`;
      const { data: files } = await supabase.storage.from(BIBLE_CHAPTER_TTS_BUCKET).list(dir, { limit: 100 });
      const names = new Set((files || []).map((f: any) => f.name));

      for (const file of files || []) {
        if (!file.name.endsWith(".mp3")) continue;
        if (file.name.endsWith(`-${BIBLE_CHAPTER_MUSIC_SUFFIX}.mp3`)) continue;
        const musicName = file.name.replace(/\.mp3$/, `-${BIBLE_CHAPTER_MUSIC_SUFFIX}.mp3`);
        if (!FORCE && names.has(musicName)) continue;
        found.push({ book: book.name, chapter: chapter.name, path: `${dir}/${file.name}` });
      }
    }
  }

  return found;
}

async function main() {
  if (!fs.existsSync(MUSIC_FILE)) {
    throw new Error(`Music bed not found: ${MUSIC_FILE}`);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  console.log(`Music bed: bible-reading-${MUSIC_TRACK}.mp3 @ gain ${MUSIC_GAIN}`);
  const music = decodeToMono(MUSIC_FILE);

  let pending = await listPlainNarrations(supabase);
  if (LIMIT > 0) pending = pending.slice(0, LIMIT);
  console.log(`${pending.length} chapter${pending.length === 1 ? "" : "s"} to mix\n`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "bb-chapter-music-"));
  let done = 0;
  let failed = 0;

  for (const item of pending) {
    const label = `${item.book} ${item.chapter}`;
    try {
      const { data, error } = await supabase.storage.from(BIBLE_CHAPTER_TTS_BUCKET).download(item.path);
      if (error || !data) throw new Error(error?.message || "download returned nothing");

      const inFile = path.join(tmpDir, "in.mp3");
      const outFile = path.join(tmpDir, "out.mp3");
      fs.writeFileSync(inFile, Buffer.from(await data.arrayBuffer()));

      const voice = decodeToMono(inFile);
      const bed = buildLoopedBed(music, voice.length + SR * 4);
      encodeMp3(mixWithBed(voice, bed, MUSIC_GAIN), outFile);

      const mixed = fs.readFileSync(outFile);
      const musicPath = getBibleChapterTtsMusicPath(item.path);
      const upload = await supabase.storage
        .from(BIBLE_CHAPTER_TTS_BUCKET)
        .upload(musicPath, mixed, { contentType: "audio/mpeg", upsert: true });
      if (upload.error) throw new Error(upload.error.message);

      done += 1;
      const minutes = (voice.length / SR / 60).toFixed(1);
      console.log(`  ok   ${label.padEnd(22)} ${minutes}min  ${(mixed.length / 1048576).toFixed(1)}MB`);
    } catch (err) {
      failed += 1;
      console.log(`  FAIL ${label.padEnd(22)} ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log(`\nmixed ${done}, failed ${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
