import { NextResponse } from "next/server";
import { copyFileSync, existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";
import { isAdminUser } from "@/lib/readingProgress";

// Approving a cover writes into public/ and rewrites a source file, so this
// route only works where the filesystem is writable — i.e. running the app
// locally. On Vercel the filesystem is read-only by design. That is fine:
// covers ship in the bundle, so an approval has to be committed anyway.
export const dynamic = "force-dynamic";

const ROOT = process.cwd();
const MANIFEST_PATH = join(ROOT, "data", "bible-year-cover-candidates.json");
const APPROVED_PATH = join(ROOT, "lib", "bibleYearApprovedCovers.ts");
const PUBLIC_DIR = join(ROOT, "public");

type Candidate = {
  file: string;
  createdAt: string;
  prompt: string;
  quality: string;
  status: "pending" | "approved" | "rejected";
};
type CandidateRecord = {
  dayNumber: number;
  title: string;
  reference: string;
  candidates: Candidate[];
};
type Manifest = { generatedAt: string; days: Record<string, CandidateRecord> };

function readManifest(): Manifest {
  if (!existsSync(MANIFEST_PATH)) return { generatedAt: "", days: {} };
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, "utf8")) as Manifest;
  } catch {
    return { generatedAt: "", days: {} };
  }
}

function writeManifest(manifest: Manifest) {
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
}

function readApprovedDays(): number[] {
  if (!existsSync(APPROVED_PATH)) return [];
  const source = readFileSync(APPROVED_PATH, "utf8");
  const match = source.match(/BIBLE_YEAR_APPROVED_COVER_DAYS:\s*number\[\]\s*=\s*\[([\s\S]*?)\]/);
  if (!match) return [];
  return match[1]
    .split(",")
    .map((piece) => Number(piece.trim()))
    .filter((value) => Number.isInteger(value) && value > 0);
}

function writeApprovedDays(days: number[]) {
  const unique = Array.from(new Set(days)).sort((a, b) => a - b);
  const header = readFileSync(APPROVED_PATH, "utf8").split("export const")[0];
  const body =
    unique.length === 0
      ? "export const BIBLE_YEAR_APPROVED_COVER_DAYS: number[] = [];\n"
      : `export const BIBLE_YEAR_APPROVED_COVER_DAYS: number[] = [\n${unique
          .map((day) => `  ${day},`)
          .join("\n")}\n];\n`;
  writeFileSync(APPROVED_PATH, `${header}${body}`);
}

/** The page is client-rendered, so verify the caller's token server-side. */
async function requireAdmin(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const supabase = createClient(url, anonKey);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user?.email || !isAdminUser(data.user.email)) return null;
  return data.user.email;
}

export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }

  const manifest = readManifest();
  const approved = readApprovedDays();
  const days = Object.values(manifest.days).sort((a, b) => a.dayNumber - b.dayNumber);

  return NextResponse.json({
    generatedAt: manifest.generatedAt,
    approvedDays: approved,
    days,
    counts: {
      pending: days.filter((d) => d.candidates.some((c) => c.status === "pending")).length,
      approved: approved.length,
    },
  });
}

export async function POST(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as {
    action?: "approve" | "reject";
    dayNumber?: number;
    file?: string;
  } | null;

  const action = body?.action;
  const dayNumber = Number(body?.dayNumber);
  const file = body?.file;

  if (!action || !Number.isInteger(dayNumber) || !file) {
    return NextResponse.json({ error: "action, dayNumber and file are required." }, { status: 400 });
  }

  const manifest = readManifest();
  const record = manifest.days[String(dayNumber)];
  const candidate = record?.candidates.find((c) => c.file === file);
  if (!record || !candidate) {
    return NextResponse.json({ error: "Candidate not found." }, { status: 404 });
  }

  if (action === "reject") {
    candidate.status = "rejected";
    writeManifest(manifest);
    return NextResponse.json({ ok: true, dayNumber, status: "rejected" });
  }

  // Approve: copy the candidate into place, then verify the copy landed before
  // reporting success. A missing source here would otherwise silently "approve"
  // a cover that does not exist.
  const source = join(PUBLIC_DIR, candidate.file.replace(/^\//, ""));
  if (!existsSync(source)) {
    return NextResponse.json({ error: `Candidate file missing: ${candidate.file}` }, { status: 409 });
  }

  const destination = join(PUBLIC_DIR, `day${dayNumber}cover.png`);
  copyFileSync(source, destination);
  if (!existsSync(destination)) {
    return NextResponse.json({ error: "Copy failed." }, { status: 500 });
  }

  for (const other of record.candidates) {
    if (other !== candidate && other.status === "approved") other.status = "rejected";
  }
  candidate.status = "approved";
  writeManifest(manifest);
  writeApprovedDays([...readApprovedDays(), dayNumber]);

  return NextResponse.json({
    ok: true,
    dayNumber,
    status: "approved",
    livePath: `/day${dayNumber}cover.png`,
  });
}
