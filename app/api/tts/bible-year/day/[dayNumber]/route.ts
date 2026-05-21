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

export async function GET(_request: Request, { params }: { params: Promise<{ dayNumber: string }> }) {
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
  const { data, error } = await supabase.storage.from(BIBLE_YEAR_AUDIO_BUCKET).createSignedUrl(path, 60 * 60);

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: "Audio lesson is not available yet.", path }, { status: 404 });
  }

  return NextResponse.redirect(data.signedUrl, {
    status: 307,
    headers: {
      "Cache-Control": "private, max-age=300",
      "X-Bible-Year-Audio-Path": path,
    },
  });
}
