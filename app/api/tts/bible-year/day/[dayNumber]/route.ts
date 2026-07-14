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

function getBibleYearAudioCandidatePaths(day: number) {
  const paddedDay = String(day).padStart(3, "0");
  return [
    getBibleYearAudioStoragePath(day),
    `bible-in-one-year/day-${paddedDay}/day-${paddedDay}-narrator-only.mp3`,
  ];
}

async function getBibleYearAudioStoragePathFromFolder(
  supabase: NonNullable<ReturnType<typeof createAdminClient>>,
  day: number,
) {
  const paddedDay = String(day).padStart(3, "0");
  const folder = `bible-in-one-year/day-${paddedDay}`;
  const { data, error } = await supabase.storage
    .from(BIBLE_YEAR_AUDIO_BUCKET)
    .list(folder, { limit: 20 });

  if (error || !data?.length) return null;

  const names = data
    .map((item) => item.name)
    .filter((name): name is string => typeof name === "string" && name.endsWith(".mp3"));

  if (!names.length) return null;

  const preferredNames = [
    `day-${paddedDay}-audio.mp3`,
    `day-${paddedDay}-narrator-only.mp3`,
  ];

  for (const preferredName of preferredNames) {
    if (names.includes(preferredName)) {
      return `${folder}/${preferredName}`;
    }
  }

  return `${folder}/${names[0]}`;
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

  const candidatePaths = getBibleYearAudioCandidatePaths(day);
  const folderResolvedPath = await getBibleYearAudioStoragePathFromFolder(supabase, day);
  const allCandidatePaths = folderResolvedPath
    ? Array.from(new Set([...candidatePaths, folderResolvedPath]))
    : candidatePaths;
  for (const path of allCandidatePaths) {
    const { data, error } = await supabase.storage
      .from(BIBLE_YEAR_AUDIO_BUCKET)
      .createSignedUrl(path, 60 * 60);

    if (!error && data?.signedUrl) {
      return NextResponse.redirect(data.signedUrl, {
        status: 307,
        headers: {
          "Cache-Control": "private, max-age=300",
          "X-Bible-Year-Audio-Path": path,
        },
      });
    }
  }

  return NextResponse.json(
    { error: "Audio lesson is not available yet.", paths: allCandidatePaths },
    { status: 404 },
  );
}
