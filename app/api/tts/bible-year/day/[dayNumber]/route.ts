import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { BIBLE_YEAR_AUDIO_BUCKET, getBibleYearAudioStoragePath } from "@/lib/bibleYearAudio";

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function parseRangeHeader(rangeHeader: string | null, size: number) {
  if (!rangeHeader) return null;
  const match = rangeHeader.match(/^bytes=(\d*)-(\d*)$/);
  if (!match) return null;

  const startText = match[1];
  const endText = match[2];
  if (!startText && !endText) return null;

  if (!startText) {
    const suffixLength = Number(endText);
    if (!Number.isFinite(suffixLength) || suffixLength <= 0) return null;
    const start = Math.max(0, size - suffixLength);
    return { start, end: size - 1 };
  }

  const start = Number(startText);
  const end = endText ? Number(endText) : size - 1;
  if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end < start || start >= size) return null;
  return { start, end: Math.min(end, size - 1) };
}

export async function GET(request: Request, { params }: { params: Promise<{ dayNumber: string }> }) {
  const { dayNumber } = await params;
  const day = Number(dayNumber);

  if (!Number.isInteger(day) || day < 1 || day > 365) {
    return NextResponse.json({ error: "Invalid Bible In One Year day." }, { status: 400 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Audio storage is not configured." }, { status: 500 });
  }

  const path = getBibleYearAudioStoragePath(day);
  const { data, error } = await supabase.storage.from(BIBLE_YEAR_AUDIO_BUCKET).download(path);

  if (error || !data) {
    return NextResponse.json({ error: "Audio lesson is not available yet.", path }, { status: 404 });
  }

  const audioBuffer = await data.arrayBuffer();
  const size = audioBuffer.byteLength;
  const range = parseRangeHeader(request.headers.get("range"), size);

  if (range) {
    const chunk = audioBuffer.slice(range.start, range.end + 1);
    return new Response(chunk, {
      status: 206,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Accept-Ranges": "bytes",
        "Content-Length": String(chunk.byteLength),
        "Content-Range": `bytes ${range.start}-${range.end}/${size}`,
        "X-Bible-Year-Audio-Path": path,
      },
    });
  }

  return new Response(audioBuffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Accept-Ranges": "bytes",
      "Content-Length": String(size),
      "X-Bible-Year-Audio-Path": path,
    },
  });
}
