export const BIBLE_YEAR_TTS_MODEL = "gpt-4o-mini-tts";
export const BIBLE_YEAR_SAMPLE_RATE = 24000;
export const BIBLE_YEAR_MP3_KBPS = 96;
export const BIBLE_YEAR_MAX_TTS_CHUNK_LENGTH = 3400;

export type BibleYearAudioRole =
  | "narrator"
  | "god"
  | "adam"
  | "eve"
  | "serpent"
  // Genesis 12-50. Without these every patriarch spoke in the narrator's
  // voice, which is why the character voices vanished after Day 4.
  | "abraham"
  | "sarah"
  | "isaac"
  | "rebekah"
  | "jacob"
  | "esau"
  | "laban"
  | "rachel"
  | "leah"
  | "hagar"
  | "angel"
  | "pharaoh";

export type BibleYearSceneTone =
  | "void" | "light" | "water" | "life" | "humanity"
  | "rest" | "dust" | "eden" | "relationship";

export type BibleYearAudioSegment = {
  role: BibleYearAudioRole;
  scene: BibleYearSceneTone;
  text: string;
  pauseAfterMs?: number;
};

export type BibleYearCastEntry = {
  voice: string;
  instructions: string;
  /** ffmpeg filter chain applied after TTS, before assembly. */
  filter?: string;
};

const NARRATOR_INSTRUCTIONS =
  "Speak in a warm, cinematic, personal, emotionally grounded masculine voice. Sound like a trusted guide walking one listener through Scripture, not like a sermon, lecture, podcast, or generic audiobook. Use intimate pacing, soft dramatic pauses, and reflective emotional weight. Let Scripture readings feel reverent and spacious. Announce each Scripture range naturally, for example: Genesis 1 verses 1 through 5. Do not announce every individual verse number. Do not read markdown, headings, emojis, bullets, sound effect cues, or formatting labels. Speak directly to one person with calm hope, wonder, and presence. Do not sound robotic, theatrical, rushed, salesy, or overly polished.";

const GOD_INSTRUCTIONS =
  "Speak as the voice of God. Deep, calm, and completely certain, with quiet authority rather than volume. Close and personal, as if speaking directly to one person standing nearby. Unhurried, with real weight behind every word, but never shouting, booming, or theatrical. Do not sound like thunder, a movie trailer, or a stadium announcer. Do not sound timid, breathy, or conversational either. Steady, grounded, and near.";

/**
 * God rides on the same base voice as the narrator, so the separation has to
 * come from processing. Pitch drops ~2.2 semitones by resampling, then atempo
 * pulls the duration back to roughly 1.08x so it reads as deliberate rather
 * than slow motion. A modest bass shelf adds chest and a light two-tap echo
 * suggests the room.
 *
 * Softened 2026-08-27: this used to drop 4.3 semitones with a +9dB shelf, a
 * hard compressor and a three-tap hall, which read as booming rather than
 * present. Everything below is deliberately gentler - the authority is meant
 * to come from the delivery, not the volume.
 */
const GOD_PITCH = 0.88;
const GOD_FILTER = [
  `asetrate=${Math.round(BIBLE_YEAR_SAMPLE_RATE * GOD_PITCH)}`,
  `aresample=${BIBLE_YEAR_SAMPLE_RATE}`,
  `atempo=${((1 / GOD_PITCH) / 1.08).toFixed(4)}`,
  "bass=g=4:f=95:w=0.7",
  "acompressor=threshold=0.24:ratio=2:attack=16:release=280:makeup=1.15",
  "aecho=0.9:0.55:65|140:0.14|0.07",
  "alimiter=limit=0.95",
].join(",");

export const BIBLE_YEAR_CAST: Record<BibleYearAudioRole, BibleYearCastEntry> = {
  narrator: {
    voice: "onyx",
    instructions: NARRATOR_INSTRUCTIONS,
  },
  god: {
    voice: "onyx",
    instructions: GOD_INSTRUCTIONS,
    filter: GOD_FILTER,
  },
  adam: {
    voice: "verse",
    instructions:
      "Speak as Adam, the first man, seeing another human being for the very first time. Warm, human, awake, amazed, a little overwhelmed. Sincere and grounded wonder, not theatrical delivery. Let genuine joy break through.",
  },
  eve: {
    voice: "coral",
    instructions:
      "Speak as Eve in the garden: young, open, unguarded, thoughtful. She is answering honestly and carefully, not suspicious yet. Natural and warm, gentle pace, no drama.",
  },
  serpent: {
    voice: "ballad",
    instructions:
      "Speak as the serpent in Eden: an adult male voice, smooth, quiet, unhurried and disarmingly reasonable. The menace is in how calm and friendly he sounds, never in hissing or growling. Sound like a trusted older friend planting a doubt. Understated, intimate, almost kind. Do not sound like a cartoon villain, a monster, or a woman.",
  },

  // Genesis 12-50. A few voices are shared by characters who never appear in
  // the same day (Adam and Laban, Eve and Leah), so no episode ever hears the
  // same voice twice.
  abraham: {
    voice: "ash",
    instructions:
      "Speak as Abraham: an old man, weathered, steady and plain-spoken. He has walked with God a long time and has nothing to prove. Warm but unhurried, sometimes tired, sometimes quietly certain. Never grand or theatrical.",
  },
  sarah: {
    voice: "shimmer",
    instructions:
      "Speak as Sarah: an older woman, dry, direct and quick, with a guarded humour that covers real hurt. She has waited a very long time. Natural and grounded, never sweet or girlish.",
  },
  isaac: {
    voice: "fable",
    instructions:
      "Speak as Isaac: a gentle, thoughtful man who grew up in his father's long shadow. Measured and mild, a little hesitant, warm when he trusts someone. In old age let the voice thin and slow without becoming frail theatre.",
  },
  rebekah: {
    voice: "nova",
    instructions:
      "Speak as Rebekah: bright, decisive and capable, someone who acts while others are still thinking. Warm on the surface with real determination underneath. Natural pace, never shrill.",
  },
  jacob: {
    voice: "alloy",
    instructions:
      "Speak as Jacob: a younger man, clever, watchful and quick, used to negotiating his way through. Earnest when he is genuinely moved. Let awe break through the cleverness when he meets God. Grounded, not slick.",
  },
  esau: {
    voice: "echo",
    instructions:
      "Speak as Esau: a physical, blunt, open-hearted outdoorsman. He says exactly what he feels the moment he feels it, whether that is hunger, fury or forgiveness. Rougher and louder than his brother, but never a brute.",
  },
  laban: {
    voice: "verse",
    instructions:
      "Speak as Laban: genial, talkative and entirely self-interested. He sounds like a generous host while arranging things to suit himself. Smooth and friendly, with the calculation just under the surface.",
  },
  rachel: {
    voice: "sage",
    instructions:
      "Speak as Rachel: young, direct and passionate, quick to feeling and quick to speak. Loved and aware of it. Warm and unguarded, with an edge when she is desperate.",
  },
  leah: {
    voice: "coral",
    instructions:
      "Speak as Leah: quieter than her sister, carrying the ache of being the one who was not chosen. Gentle and restrained, with hope surfacing each time she names a son. Never self-pitying or bitter.",
  },
  hagar: {
    voice: "coral",
    instructions:
      "Speak as Hagar: a foreign servant far from home, frightened and exhausted, speaking honestly because she has nothing left to protect. Quiet, raw and human, then astonished when God sees her.",
  },
  angel: {
    voice: "echo",
    instructions:
      "Speak as the angel of the LORD: clear, calm and utterly without doubt, delivering words that are not his own. Bright and steady rather than deep. Urgent when he calls a name, never frightening.",
  },
  pharaoh: {
    voice: "ash",
    instructions:
      "Speak as Pharaoh: a ruler who has never been contradicted, courteous and absolutely used to being obeyed. Controlled and even, with the authority sitting underneath rather than on top. Never a shouting tyrant.",
  },
};

export function segment(
  role: BibleYearAudioRole,
  scene: BibleYearSceneTone,
  text: string,
  pauseAfterMs = role === "god" ? 620 : 380,
): BibleYearAudioSegment {
  return { role, scene, text, pauseAfterMs };
}

export const narrator = (scene: BibleYearSceneTone, text: string, pauseAfterMs?: number) =>
  segment("narrator", scene, text, pauseAfterMs);
export const god = (scene: BibleYearSceneTone, text: string, pauseAfterMs = 620) =>
  segment("god", scene, text, pauseAfterMs);
export const adam = (scene: BibleYearSceneTone, text: string, pauseAfterMs = 520) =>
  segment("adam", scene, text, pauseAfterMs);
export const eve = (scene: BibleYearSceneTone, text: string, pauseAfterMs = 520) =>
  segment("eve", scene, text, pauseAfterMs);
export const serpent = (scene: BibleYearSceneTone, text: string, pauseAfterMs = 560) =>
  segment("serpent", scene, text, pauseAfterMs);
