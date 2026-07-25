import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const LOG_PATH = path.join(process.cwd(), "data", "bible-notes-progress-log.json");

export async function GET() {
  try {
    const raw = await fs.readFile(LOG_PATH, "utf8");
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Could not read progress log", detail: String(error) },
      { status: 500 },
    );
  }
}
