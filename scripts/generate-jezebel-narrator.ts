import { config } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createContext, runInContext } from "vm";
import { GENESIS_ONE_TTS_VOICE } from "../lib/genesisOneTtsAudio";
import { cleanTextForTts } from "../lib/ttsSpeechText";

const SAMPLE_RATE = 24000;
const MP3_KBPS = 96;
const MAX_TTS_CHUNK_LENGTH = 2600;
const OUTPUT_PATH = join(process.cwd(), "public", "audio", "bible-topics", "jezebel", "story-of-jezebel-narrator.mp3");

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const rawScript = String.raw`
# The Story of Jezebel Explained

## A Guided Bible Study Through First Kings

What is a Jezebel?

I'm sure you've heard that word plenty of times before.

And if you're like most people, when you hear the word Jezebel, you probably think of:
a loose woman...
a seductive woman...
a woman with no morals...
or a woman who manipulates men.

That's usually how the word gets used today.

But before "Jezebel" became some cultural label...

Jezebel was a real woman.

A queen.

A worshipper of false gods.

A manipulator.

A woman whose influence slowly pulled an entire nation away from God.

She corrupted kings.

Promoted idol worship.

Killed prophets.

And became so feared that even the prophet Elijah once ran into the wilderness terrified after hearing her name.

Jezebel was not just some seductive woman from a Bible story.

She became one of the darkest figures in all of Scripture.

And the reason her story still matters today...
is because Jezebel's story was really about influence.

Influence that slowly pulls people away from truth.

Influence that normalizes compromise.

Influence that makes evil feel acceptable little by little over time.

So today...

we're going to walk through the real story of Jezebel together.

Not the internet version.

Not the exaggerated version.

The actual story found in Scripture.

And we're going to break it down piece by piece like we do inside Bible Buddy.

So if you have your Bible nearby, you can follow along with me.

And if not...

just listen.

Picture the story.

Step into the world.

And let's go back to the beginning.

[Pause]

Before Jezebel ever appears...

Israel is already struggling spiritually.

The kingdom has split into two.

Israel in the north.

Judah in the south.

And little by little, the nation begins drifting away from God.

Kings rise.

Kings fall.

False worship spreads.

Idolatry spreads.

And eventually...

a man named Ahab becomes king.

And this is where everything begins to change.

[Pause]

First Kings, chapter sixteen, verses twenty nine through thirty one.

"In the thirty eighth year of Asa king of Judah, Ahab the son of Omri began to reign over Israel...

And Ahab the son of Omri did evil in the sight of the Lord more than all who were before him.

And as if it had been a light thing for him to walk in the sins of Jeroboam... he took for his wife Jezebel the daughter of Ethbaal king of the Sidonians, and went and served Baal and worshipped him."

[Pause]

That verse tells us a lot immediately.

The Bible says Ahab did more evil than every king before him.

Israel already had wicked kings before Ahab.

But now things are becoming even darker.

And then the Bible points directly to a major turning point.

Ahab marries Jezebel.

[Pause]

Now Jezebel was not from Israel.

She came from Phoenicia, north of Israel, near the coastal cities.

Her father was a king named Ethbaal.

And even his name tells you something.

Ethbaal literally means:
"with Baal."

Because her family was deeply connected to the worship of Baal.

And when Jezebel marries Ahab...

she does not leave those beliefs behind.

She brings them into Israel with her.

And slowly...

Israel begins changing.

[Pause]

Now modern people hear the words "false god" and sometimes move on quickly.

But Baal worship was a huge deal in the ancient world.

People believed Baal controlled:
rain...
storms...
fertility...
crops...
prosperity.

And remember...

this was an agricultural society.

If rain stopped...

people starved.

If crops failed...

families died.

So worshipping Baal felt practical to many people.

It felt useful.

But Baal worship also came with darkness.

Temple prostitution.

Sex rituals.

False prophets.

And eventually even child sacrifice.

This was not harmless spirituality.

This was corruption wrapped inside religion.

And Jezebel aggressively promoted it.

[Pause]

First Kings, chapter sixteen, verse thirty two.

"Ahab erected an altar for Baal in the house of Baal, which he built in Samaria."

[Pause]

The king of Israel...

God's chosen people...

builds a temple for a false god inside Israel itself.

That's how far things had fallen.

And little by little, the people begin drifting further from God.

Not all at once.

Slowly.

Over time.

One compromise at a time.

One excuse at a time.

One drifting decision at a time.

And honestly...

that's still how compromise usually works today.

Most people do not wake up one morning and completely walk away from God.

It happens little by little.

Slowly normalizing things they once knew were wrong.

That's exactly what was happening in Israel.

[Pause]

And eventually...

the prophets of God begin disappearing.

First Kings, chapter eighteen, verse four says:

"When Jezebel cut off the prophets of the Lord..."

[Pause]

That means she was hunting them down.

Killing them.

Trying to silence the voices speaking for God.

And at the same time...

she supported hundreds of false prophets connected to Baal worship.

Israel was becoming spiritually upside down.

Truth was being silenced.

Falsehood was being celebrated.

And eventually...

one man steps forward to confront all of it.

Elijah.

[Pause]

First Kings, chapter seventeen, verse one.

"Now Elijah the Tishbite... said to Ahab,
'As the Lord God of Israel lives... there shall be neither dew nor rain these years, except by my word.'"

[Pause]

That verse is deeper than most people realize.

Remember what Baal supposedly controlled?

Rain.

Storms.

Crops.

So God stops the rain completely.

Almost like God is directly challenging Baal himself.

Like He's saying:

"If Baal is really god...
let him fix this."

But Baal cannot do anything.

Because Baal is not real.

[Pause]

And eventually...

everything leads to one of the most dramatic moments in the Old Testament.

Mount Carmel.

One prophet of God...

standing against hundreds of false prophets.

[Pause]

First Kings, chapter eighteen, verse twenty one.

"Elijah came near to all the people and said,
'How long will you go limping between two different opinions?
If the Lord is God, follow Him.
But if Baal, then follow him.'"

[Pause]

That verse still hits hard today.

Because many people still try living divided lives.

A little bit of God.

A little bit of the world.

A little bit of truth.

A little bit of compromise.

And Elijah says:
choose.

[Pause]

Then comes the challenge.

Two altars.

Two sacrifices.

And the god who answers with fire is the true God.

The prophets of Baal scream for hours.

Dance.

Cut themselves.

Cry out desperately.

And nothing happens.

Because Baal is not real.

Then Elijah prays.

[Pause]

First Kings, chapter eighteen, verse thirty eight.

"Then the fire of the Lord fell and consumed the burnt offering..."

[Pause]

The sacrifice burns.

The wood burns.

The stones burn.

Even the water burns.

And suddenly the people fall to the ground crying out:

"The Lord, He is God."

[Pause]

You would think this would finally end Jezebel's influence.

But it doesn't.

Because Jezebel still has power.

And then she sends Elijah a message.

[Pause]

First Kings, chapter nineteen, verses one through three.

"Ahab told Jezebel all that Elijah had done...

Then Jezebel sent a messenger to Elijah saying,
'So may the gods do to me and more also, if I do not make your life as the life of one of them by this time tomorrow.'

Then he was afraid, and he arose and ran for his life."

[Pause]

Think about that.

This is Elijah.

The man who just stood against hundreds of false prophets.

The man who called down fire from heaven.

And now...

one message from Jezebel...

and he runs into the wilderness terrified.

That shows you how intense this whole situation had become.

Jezebel created fear.

Pressure.

Spiritual exhaustion.

And honestly...

many people know what that feels like.

Sometimes spiritual battles attack your peace.

Your emotions.

Your mind.

Even strong people can become exhausted spiritually.

And Elijah reaches that point.

[Pause]

Then eventually we come to one of the darkest moments in Jezebel's story.

The story of Naboth's vineyard.

First Kings, chapter twenty one.

A man named Naboth owns a vineyard.

Ahab wants it.

But Naboth refuses to sell it because the land belonged to his family inheritance.

And according to God's law...

Naboth was right.

But Ahab goes home angry and pouting like a child.

And then Jezebel steps in.

[Pause]

First Kings, chapter twenty one, verse seven.

"Jezebel his wife said to him,
'Do you now govern Israel?
Arise and eat bread and let your heart be cheerful.
I will give you the vineyard of Naboth.'"

[Pause]

That verse tells you everything about Jezebel.

Instead of correcting evil...

she feeds it.

Encourages it.

Empowers it.

Then she creates a plan using lies and false witnesses.

And eventually...

Naboth is killed.

Just so Ahab can take his land.

[Pause]

This is who Jezebel really was.

Not just seductive.

Not just immoral.

Manipulative.

Corrupt.

Power hungry.

And willing to destroy people to get what she wanted.

[Pause]

And this is why people still use the name "Jezebel" today.

Because over time, her name became symbolic.

Not just of seduction.

But of corrupt influence.

Manipulation.

Control.

Compromise.

And the slow pulling away from truth.

And honestly...

that influence still exists today.

Not always through one person.

Sometimes through culture.

Media.

Relationships.

Friend groups.

Social pressure.

Or people slowly pulling you away from God over time.

That's why this story still matters.

[Pause]

The warning of Jezebel is not:
"be scared of women."

That completely misses the point.

The real warning is:
be careful what influences your heart.

Because influence shapes direction.

And direction shapes destiny.

Some people pull you closer to God.

And some slowly pull you farther away from Him.

And often...

it happens so slowly you barely notice it at first.

That's what happened to Israel.

[Pause]

Jezebel was real.

A real queen.

A real story.

And a real warning.

But the bigger message of Scripture is this:

Even in the middle of corruption...

God still raises up truth.

God still raises up people willing to stand firm.

And God is still calling people back to Him.

[Pause]

And if you want more guided Bible studies that help you actually understand Scripture deeply...

check out Bible Buddy at my Bible Buddy dot net.
`;

type RenderItem = { kind: "text"; text: string } | { kind: "silence"; seconds: number };

function ensureDir(path: string) {
  mkdirSync(dirname(path), { recursive: true });
}

function clamp(value: number) {
  return Math.max(-1, Math.min(1, value));
}

function pcmBufferToFloat32(buffer: Buffer) {
  const samples = new Float32Array(Math.floor(buffer.length / 2));
  for (let i = 0; i < samples.length; i += 1) samples[i] = buffer.readInt16LE(i * 2) / 32768;
  return samples;
}

function silence(seconds: number) {
  return new Float32Array(Math.round(SAMPLE_RATE * seconds));
}

function concatSamples(chunks: Float32Array[]) {
  const totalLength = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const output = new Float32Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.length;
  }
  return output;
}

function splitText(text: string) {
  const clean = cleanTextForTts(text)
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return [];
  if (clean.length <= MAX_TTS_CHUNK_LENGTH) return [clean];

  const sentences = clean.match(/[^.!?]+[.!?]*/g) || [clean];
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
    const next = `${current} ${trimmed}`.trim();
    if (next.length > MAX_TTS_CHUNK_LENGTH && current) {
      chunks.push(current);
      current = trimmed;
    } else {
      current = next;
    }
  }

  if (current) chunks.push(current);
  return chunks;
}

function scriptToRenderItems(script: string): RenderItem[] {
  const items: RenderItem[] = [];
  let textBuffer: string[] = [];

  function flushText() {
    const text = textBuffer
      .join("\n")
      .replace(/^#{1,6}\s*/gm, "")
      .trim();
    textBuffer = [];
    for (const chunk of splitText(text)) {
      items.push({ kind: "text", text: chunk });
      items.push({ kind: "silence", seconds: 0.22 });
    }
  }

  for (const rawLine of script.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) {
      textBuffer.push("");
      continue;
    }
    if (/^---+$/.test(line)) {
      flushText();
      items.push({ kind: "silence", seconds: 1.4 });
      continue;
    }
    if (/^\[Long pause\]$/i.test(line)) {
      flushText();
      items.push({ kind: "silence", seconds: 2.25 });
      continue;
    }
    if (/^\[Pause\]$/i.test(line)) {
      flushText();
      items.push({ kind: "silence", seconds: 1.05 });
      continue;
    }
    textBuffer.push(line);
  }

  flushText();
  return items.filter((item, index, all) => item.kind === "text" || index === 0 || all[index - 1].kind !== "silence");
}

function normalizeVoiceOnlyEpisode(voiceTrack: Float32Array) {
  const output = new Float32Array(voiceTrack.length);
  let peak = 0;
  for (let i = 0; i < voiceTrack.length; i += 1) {
    output[i] = voiceTrack[i] * 0.98;
    peak = Math.max(peak, Math.abs(output[i]));
  }

  if (peak > 0.98) {
    const gain = 0.98 / peak;
    for (let i = 0; i < output.length; i += 1) output[i] *= gain;
  }
  return output;
}

function getMp3EncoderClass() {
  const bundlePath = join(process.cwd(), "node_modules", "lamejs", "lame.all.js");
  const context = {} as { lamejs?: { Mp3Encoder?: new (channels: number, sampleRate: number, kbps: number) => any } };
  createContext(context);
  runInContext(readFileSync(bundlePath, "utf8"), context);
  const Mp3Encoder = context.lamejs?.Mp3Encoder;
  if (!Mp3Encoder) throw new Error("Could not initialize lamejs MP3 encoder.");
  return Mp3Encoder;
}

function encodeMp3(samples: Float32Array) {
  const Mp3Encoder = getMp3EncoderClass();
  const encoder = new Mp3Encoder(1, SAMPLE_RATE, MP3_KBPS);
  const mp3Chunks: Buffer[] = [];
  const sampleBlockSize = 1152;

  for (let i = 0; i < samples.length; i += sampleBlockSize) {
    const block = samples.subarray(i, i + sampleBlockSize);
    const pcm = new Int16Array(block.length);
    for (let j = 0; j < block.length; j += 1) pcm[j] = Math.round(clamp(block[j]) * 32767);
    const encoded = encoder.encodeBuffer(pcm);
    if (encoded.length > 0) mp3Chunks.push(Buffer.from(encoded));
  }

  const flushed = encoder.flush();
  if (flushed.length > 0) mp3Chunks.push(Buffer.from(flushed));
  return Buffer.concat(mp3Chunks);
}

async function generateOpenAiSpeechPcm(text: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured.");

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: GENESIS_ONE_TTS_VOICE,
      input: text,
      instructions:
        "Speak as a deep, warm, calm male Bible study narrator for a lofi devotional video. Keep the pace smooth, steady, reflective, and easy to listen to while working or resting. Use natural pauses and serious but gentle emphasis. Scripture readings should feel reverent and clear. Do not sound theatrical, salesy, rushed, robotic, hype, or like a loud preacher. Never read markdown symbols or bracket labels.",
      response_format: "pcm",
    }),
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "OpenAI TTS failed.");
    throw new Error(message || "OpenAI TTS failed.");
  }

  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  const items = scriptToRenderItems(rawScript);
  const textItems = items.filter((item) => item.kind === "text") as Extract<RenderItem, { kind: "text" }>[];
  const chunks: Float32Array[] = [];

  console.log(`[JEZEBEL_NARRATOR] Text chunks: ${textItems.length}, total render items: ${items.length}`);
  let textIndex = 0;
  for (const item of items) {
    if (item.kind === "silence") {
      chunks.push(silence(item.seconds));
      continue;
    }

    textIndex += 1;
    console.log(`[JEZEBEL_NARRATOR] Generating narrator chunk ${textIndex}/${textItems.length}`);
    chunks.push(pcmBufferToFloat32(await generateOpenAiSpeechPcm(item.text)));
  }

  const normalized = normalizeVoiceOnlyEpisode(concatSamples(chunks));
  const mp3 = encodeMp3(normalized);
  ensureDir(OUTPUT_PATH);
  writeFileSync(OUTPUT_PATH, mp3);
  console.log(`[JEZEBEL_NARRATOR] Local narrator MP3: ${OUTPUT_PATH}`);
  console.log("[JEZEBEL_NARRATOR] Done");
}

main().catch((error) => {
  console.error("[JEZEBEL_NARRATOR] Failed:", error);
  process.exit(1);
});
