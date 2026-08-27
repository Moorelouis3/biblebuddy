export const BIBLE_YEAR_TTS_MODEL = "gpt-4o-mini-tts";
export const BIBLE_YEAR_SAMPLE_RATE = 24000;
export const BIBLE_YEAR_MP3_KBPS = 96;
export const BIBLE_YEAR_MAX_TTS_CHUNK_LENGTH = 3400;

/**
 * A speaker id: "narrator", "god", "moses", "pilate".
 *
 * Open on purpose. The Bible has hundreds of speaking characters and only
 * eleven voices exist, so the curated list below covers the ones that recur
 * and everyone else is assigned a voice deterministically from their name
 * (see castFor). That way a named speaker always has their own voice and is
 * never silently folded back into the narrator, and the voice they get is
 * the same in every episode they appear in.
 */
export type BibleYearAudioRole = string;

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

/** Hand-written voices for the characters who recur. */
export const BIBLE_YEAR_CAST: Record<string, BibleYearCastEntry> = {
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
  // ── Exodus through Joshua ──
  moses: {
    voice: "fable",
    instructions:
      "Speak as Moses: reluctant, weighty and honest. He argues with God like someone who genuinely does not want the job, and he speaks to Pharaoh like a man carrying words that are not his own. Plain and forceful, never grand.",
  },
  aaron: {
    voice: "echo",
    instructions:
      "Speak as Aaron: the brother who does the talking. Fluent, warmer and more public than Moses, comfortable in front of people, and a little too easily swayed by them.",
  },
  joshua: {
    voice: "alloy",
    instructions:
      "Speak as Joshua: a soldier. Direct, disciplined, certain, used to giving and taking orders. Courage without swagger.",
  },
  miriam: {
    voice: "nova",
    instructions:
      "Speak as Miriam: older sister, quick and bold, a leader of women in her own right. Confident and celebratory, sharp when she is jealous.",
  },

  // ── Samuel through Kings ──
  samuel: {
    voice: "ash",
    instructions:
      "Speak as Samuel: a prophet from childhood, grave and unbending. He delivers hard words without softening them and without enjoying them.",
  },
  saul: {
    voice: "verse",
    instructions:
      "Speak as Saul: a tall man who never felt like a king. Commanding on the surface with fear and jealousy leaking through underneath. Sounds increasingly unsteady as his story goes on.",
  },
  david: {
    voice: "echo",
    instructions:
      "Speak as David: young, warm, quick-hearted and fearless. A shepherd and a poet who says exactly what he feels, whether that is worship, grief or defiance.",
  },
  jonathan: {
    voice: "alloy",
    instructions:
      "Speak as Jonathan: generous, loyal and steady, a prince with no jealousy in him. Warm and open, especially toward David.",
  },
  solomon: {
    voice: "fable",
    instructions:
      "Speak as Solomon: measured, articulate and unhurried, a man used to being listened to. Wisdom delivered calmly, never showing off.",
  },
  elijah: {
    voice: "ash",
    instructions:
      "Speak as Elijah: fierce, solitary and blunt on the mountain, then hollow and exhausted in the cave. Full conviction in public, real despair in private.",
  },
  elisha: {
    voice: "echo",
    instructions:
      "Speak as Elisha: steady, practical and quietly certain, a prophet who spends his life among ordinary people and their ordinary troubles.",
  },

  // ── The Gospels and Acts ──
  jesus: {
    voice: "fable",
    instructions:
      "Speak as Jesus: warm, unhurried and completely secure. He speaks to people, not at them - gentle with the broken, direct with the proud, never performing. Authority carried lightly. Do not sound pious, breathy, ethereal or theatrical.",
  },
  peter: {
    voice: "echo",
    instructions:
      "Speak as Peter: impulsive and wholehearted, saying the thing before he has thought it through. Big-hearted, easily embarrassed, quick to swear he will never fail.",
  },
  paul: {
    voice: "alloy",
    instructions:
      "Speak as Paul: intense, quick-minded and argumentative in the best sense, building a case as he speaks. Passionate rather than loud.",
  },
  pilate: {
    voice: "ash",
    instructions:
      "Speak as Pilate: a bored administrator who slowly realises he is out of his depth. Dry, procedural and faintly contemptuous, with unease underneath.",
  },
  mary: {
    voice: "nova",
    instructions:
      "Speak as Mary: young, thoughtful and steady beyond her years. Astonished but not hysterical, holding more than she says.",
  },
};

/**
 * Voices anyone not in the curated list can be given.
 *
 * onyx is deliberately absent: it is the narrator and God, and a minor
 * character sounding like either of them is worse than a repeat.
 */
const MALE_POOL = ["ash", "echo", "fable", "alloy", "verse", "ballad"] as const;
const FEMALE_POOL = ["coral", "nova", "sage", "shimmer"] as const;

/**
 * Women who speak in Scripture. Anyone not listed is treated as male, which
 * is right far more often than not for a named biblical speaker, and a
 * pronoun in the verse itself overrides this when one is present.
 */
const FEMALE_SPEAKERS = new Set([
  "eve", "sarah", "hagar", "rebekah", "rachel", "leah", "dinah", "tamar",
  "miriam", "zipporah", "rahab", "deborah", "jael", "delilah", "naomi",
  "ruth", "hannah", "peninnah", "michal", "abigail", "bathsheba", "jezebel",
  "athaliah", "huldah", "esther", "vashti", "elizabeth", "mary", "martha",
  "priscilla", "lydia", "rhoda", "sapphira", "eunice", "lois", "orpah",
  "zeresh", "gomer", "anna", "salome", "herodias", "drusilla", "bernice",
]);

export function genderForRole(role: BibleYearAudioRole): "male" | "female" | "none" {
  if (role === "narrator") return "none";
  if (FEMALE_SPEAKERS.has(role)) return "female";
  return "male";
}

/** Stable across runs, so a character keeps one voice for the whole year. */
function hashRole(role: string) {
  let hash = 2166136261;
  for (let i = 0; i < role.length; i += 1) {
    hash ^= role.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

/**
 * The cast entry for a speaker, curated where one exists and derived from
 * the name otherwise. Never returns null, so the renderer always has a voice.
 */
export function castFor(role: BibleYearAudioRole): BibleYearCastEntry {
  const curated = BIBLE_YEAR_CAST[role];
  if (curated) return curated;

  const gender = genderForRole(role);
  const pool = gender === "female" ? FEMALE_POOL : MALE_POOL;
  const voice = pool[hashRole(role) % pool.length];
  const name = role.charAt(0).toUpperCase() + role.slice(1);

  return {
    voice,
    instructions:
      `Speak as ${name}, a person in this account, in a natural, grounded human voice. ` +
      "Match the feeling of what is actually being said - urgency, grief, joy, fear, plain speech - " +
      "without theatrical delivery or an accent. Sound like a real person talking to another person. " +
      "Do not read markdown, headings, emojis, bullets, sound effect cues, or formatting labels.",
  };
}

/**
 * Pick a voice for every speaker in one episode.
 *
 * castFor on its own is stable but blind: hashing names independently put
 * Moses, Aaron and Pharaoh all on the same voice in Exodus 5, which makes
 * the scene unreadable. Deciding for the whole episode at once lets each
 * character take a voice nobody else in that episode is using.
 *
 * Curated characters always keep their own voice - Abraham sounds like
 * Abraham in every episode. Only the long tail shifts, and those speakers
 * appear too rarely for the shift to be noticeable.
 */
export function assignEpisodeVoices(roles: Iterable<BibleYearAudioRole>): Map<string, string> {
  const unique = [...new Set(roles)];
  const chosen = new Map<string, string>();
  const taken = new Set<string>();

  // Curated first, so they get first claim on their own voice. Two curated
  // characters can share a voice across the year as long as they never meet;
  // if they do meet, the second one falls through to the pass below.
  for (const role of unique) {
    const curated = BIBLE_YEAR_CAST[role];
    if (!curated) continue;
    // The narrator and God share onyx on purpose - God is set apart by the
    // pitch and filter, not by a different voice - so neither is ever bumped.
    // Without this, the narrator claimed onyx first and God was reassigned to
    // a stranger's voice halfway through the year.
    const fixed = role === "narrator" || role === "god";
    if (!fixed && taken.has(curated.voice)) continue;
    chosen.set(role, curated.voice);
    taken.add(curated.voice);
  }

  // Sorted so the result does not depend on the order lines happen to appear.
  for (const role of unique.filter((r) => !chosen.has(r)).sort()) {
    const entry = castFor(role);
    const pool = genderForRole(role) === "female" ? FEMALE_POOL : MALE_POOL;
    const free = pool.find((voice) => !taken.has(voice));
    // Every voice already spoken for: reuse the hashed one rather than
    // silently dropping the character back to the narrator.
    const voice = free || entry.voice;
    chosen.set(role, voice);
    taken.add(voice);
  }

  return chosen;
}

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
