import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Scrambled has been retired. Use Bible Trivia for review." },
    { status: 410 },
  );
}
