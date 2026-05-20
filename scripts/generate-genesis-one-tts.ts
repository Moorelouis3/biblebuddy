import { config } from "dotenv";
import { existsSync } from "fs";
import {
  createGenesisOneTtsAdminClient,
  ensureGenesisOneTtsAudio,
  GENESIS_ONE_TTS_KINDS,
} from "../lib/genesisOneTtsAudio";
import type { GenesisOneTtsKind } from "../lib/genesisOneTts";

const requestedKinds = process.argv
  .slice(2)
  .filter((arg) => !arg.startsWith("--")) as GenesisOneTtsKind[];
const force = process.argv.includes("--force");
const kinds = requestedKinds.length > 0 ? requestedKinds : GENESIS_ONE_TTS_KINDS;

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

async function main() {
  const supabase = createGenesisOneTtsAdminClient();
  if (!supabase) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  }

  for (const kind of kinds) {
    if (!GENESIS_ONE_TTS_KINDS.includes(kind)) {
      throw new Error(`Invalid Genesis 1 TTS kind: ${kind}`);
    }

    console.log(`[GENESIS_ONE_TTS] ${force ? "Regenerating" : "Ensuring"} ${kind}...`);
    const result = await ensureGenesisOneTtsAudio(kind, supabase, force);
    console.log(
      `[GENESIS_ONE_TTS] ${kind}: ${result.source}, ${result.audio.length} bytes, ${result.textLength} text chars, ${result.path}`,
    );
  }
}

main().catch((error) => {
  console.error("[GENESIS_ONE_TTS] Failed:", error);
  process.exit(1);
});
