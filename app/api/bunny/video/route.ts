import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST() {
  const LIBRARY_ID = process.env.BUNNY_STREAM_LIBRARY_ID!;
  const API_KEY = process.env.BUNNY_STREAM_API_KEY!;

  // Step 1: Create a video entry in Bunny Stream
  const createRes = await fetch(
    `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos`,
    {
      method: "POST",
      headers: {
        AccessKey: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: `bb-${Date.now()}` }),
    }
  );

  if (!createRes.ok) {
    const err = await createRes.text();
    return NextResponse.json({ error: `Bunny create failed: ${err}` }, { status: 500 });
  }

  const { guid: videoId } = await createRes.json();

  // Step 2: Generate TUS upload signature (1-hour expiry)
  const expiration = Math.floor(Date.now() / 1000) + 3600;
  const signature = crypto
    .createHash("sha256")
    .update(`${LIBRARY_ID}${API_KEY}${expiration}${videoId}`)
    .digest("hex");

  return NextResponse.json({
    videoId,
    libraryId: LIBRARY_ID,
    expiration,
    signature,
  });
}
