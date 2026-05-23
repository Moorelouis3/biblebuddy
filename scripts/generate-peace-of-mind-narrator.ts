import { config } from "dotenv";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { createContext, runInContext } from "vm";
import { GENESIS_ONE_TTS_VOICE } from "../lib/genesisOneTtsAudio";
import { cleanTextForTts } from "../lib/ttsSpeechText";

const SAMPLE_RATE = 24000;
const MP3_KBPS = 96;
const MAX_TTS_CHUNK_LENGTH = 2600;
const OUTPUT_PATH = join(process.cwd(), "public", "audio", "bible-topics", "peace-of-mind", "5-bible-verses-peace-of-mind-narrator.mp3");

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const rawScript = String.raw`
# 5 Bible Verses for Peace of Mind

## A Calm Bible Reading for Anxiety and Overthinking

[Soft ambient music begins]

Tonight... or wherever you are listening from...

I want you to slow down for a moment.

Take a deep breath.

Relax your shoulders.

And let your mind rest for a little while.

[Pause]

These are five Bible verses God gives us for anxiety... fear... stress... and overthinking.

And over the next few minutes... we are not going to rush through them.

We are going to sit with them slowly.

Honestly.

Calmly.

[Pause]

Because sometimes anxiety makes your thoughts feel loud.

Your chest feels tight.

Your mind keeps replaying conversations...

mistakes...

fears...

worst case scenarios...

and questions about tomorrow.

[Pause]

But Scripture reminds us that peace is not found in controlling everything.

Peace is found in bringing everything to God.

[Pause]

You do not need to pretend you are okay tonight.

You do not need perfect faith.

You do not need perfect emotions.

Just come as you are.

Tired mind and all.

[Pause]

Let's walk through these verses together.

Slowly.

And let the Word of God calm your heart.

---

# Verse One

## Philippians Chapter 4, Verses 6 through 7

[Read slower]

"In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God.

And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus."

[Pause]

Paul does not say...

"Pretend nothing is wrong."

He says:

"In nothing be anxious."

[Pause]

That does not mean anxious thoughts never appear.

It means anxiety is not supposed to become the home your mind permanently lives in.

Fear may visit.

Stress may rise.

Difficult seasons may come.

But anxiety was never meant to rule your life.

[Pause]

Then Paul gives us the replacement.

Prayer.

Petition.

And thanksgiving.

Prayer means turning toward God instead of only turning inward.

Petition means honestly asking God for help.

And thanksgiving means remembering that God has already been faithful before.

[Pause]

Even in difficult seasons.

Even in confusion.

Even when life did not make sense.

[Soft tone]

Then Paul says something powerful.

"The peace of God... will guard your hearts and your thoughts."

That word guard matters.

It is the image of a soldier standing watch outside a city.

Protecting it.

Watching over it.

[Pause]

God's peace is not weak.

It is not fake positivity.

It is protection over the very places anxiety attacks first...

your thoughts...

your emotions...

your heart.

[Pause]

And remember something important.

Paul wrote these words while sitting in prison.

He was not relaxing on a beach somewhere.

He was facing uncertainty.

Pressure.

Discomfort.

Limitations.

And yet he still talks about peace.

Because biblical peace is not based on peaceful circumstances.

It is peace that survives difficult circumstances.

[Pause]

Anxiety says:

"Keep replaying this."

"Think about it again."

"You need to solve this right now."

But Scripture says:

Bring it to God.

Pray honestly.

Ask for help.

Remember His faithfulness.

Then let His peace stand guard over your mind.

[Long pause]

You are allowed to turn anxious thoughts into honest prayers.

---

# Verse Two

## Isaiah Chapter 26, Verse 3

"You will keep whoever's mind is steadfast in perfect peace, because he trusts in You."

[Pause]

This verse connects peace... to trust.

The word steadfast means stable.

Held up.

Supported.

Fixed on something secure.

[Pause]

A steadfast mind is not a mind that never struggles.

It is a mind that keeps returning to God... again and again.

[Pause]

Anxiety pulls your thoughts in every direction.

"What if this goes wrong?"

"What if I fail?"

"What if things never get better?"

"What if I cannot handle what is coming?"

[Pause]

But Isaiah paints a different picture.

A person whose mind keeps leaning back toward God.

[Gentle emphasis]

Perfect peace does not mean every problem disappears overnight.

It means your soul is anchored to Someone stronger than the storm.

[Pause]

Isaiah was speaking during unstable times.

Nations were fighting.

People were afraid.

Many trusted politics... power... money... human plans...

But Isaiah keeps pointing people back to the Lord.

[Pause]

Because anxiety attaches your mind to fear.

But trust attaches your mind to God.

[Soft tone]

Sometimes trusting God looks very simple.

You stop scrolling for a moment.

You breathe deeply.

And you quietly pray:

"Lord... my thoughts are racing again."

"Please calm my mind."

"Help me trust You."

[Pause]

And maybe you need to do that ten times a day.

That is not weakness.

That is learning to return your mind to God.

Over and over again.

[Pause]

Peace grows when your mind keeps returning to the One who holds you together.

---

# Verse Three

## Matthew Chapter 6, Verse 34

"Do not be anxious for tomorrow, for tomorrow will be anxious for itself. Each day's own trouble is sufficient."

[Pause]

Jesus is not saying tomorrow does not matter.

He is saying tomorrow is not supposed to control today.

[Pause]

Each day already carries enough weight of its own.

You were not designed to carry today's problems...

tomorrow's fears...

next month's stress...

and every possible future disaster...

all at the same time.

[Pause]

But anxiety tries to make you live in the future.

It makes your mind rehearse pain before pain even arrives.

[Pause]

And eventually your body feels exhausted...

even though nothing has happened yet.

[Pause]

Jesus pulls us back into the present moment.

Back into today.

Back into now.

[Soft tone]

Right now...

you are breathing.

Right now...

God is still with you.

Right now...

His grace is still enough for this moment.

[Pause]

When Jesus spoke these words, He had just been teaching about food... clothing... daily needs... survival...

The people listening understood stress.

Some did not know how they would survive.

Some were oppressed.

Some were exhausted.

Yet Jesus reminds them that the Father sees them.

[Pause]

Worry feels productive sometimes.

It feels like you are preparing yourself.

But most worry simply drains your strength before the battle even arrives.

[Gentle emphasis]

There is wisdom in planning.

But there is a difference between preparation... and obsession.

[Pause]

Sometimes anxiety is our attempt to control things only God can truly control.

And that pressure becomes unbearable because you were never meant to carry it.

[Pause]

God is already in tomorrow.

You do not need to arrive there early in fear.

---

# Verse Four

## Psalm Chapter 94, Verse 19

"When anxiety was great within me, Your consolation brought me joy."

[Pause]

This verse is honest.

Very honest.

The writer says:

"When anxiety was great within me."

[Pause]

Not small anxiety.

Not mild stress.

Great anxiety.

Heavy anxiety.

Overwhelming anxiety.

[Pause]

The Bible never hides human emotion.

Throughout Scripture we see people crying out to God from fear... grief... exhaustion... loneliness... confusion...

David did.

Jeremiah did.

Elijah did.

[Pause]

Even Jesus experienced deep sorrow before the cross.

[Soft tone]

Faith does not mean you never struggle emotionally.

Faith means you keep bringing your struggles to God.

[Pause]

The word consolation means comfort.

Relief.

Encouragement.

It is the picture of God coming close to someone carrying emotional pain.

[Pause]

Notice something important.

The anxiety did not disappear first.

God met him in the middle of it.

[Pause]

Sometimes healing begins when you stop pretending to be okay.

When you stop trying to look strong all the time.

And instead pray honestly:

"God... I feel overwhelmed."

"My thoughts feel heavy."

"I need Your help."

[Pause]

God is not intimidated by your anxiety.

He is not frustrated by your weakness.

He is near to the brokenhearted.

[Pause]

Sometimes His comfort comes through Scripture.

Sometimes through worship.

Sometimes through rest.

Sometimes through another person encouraging you.

Sometimes through simply slowing down long enough to remember...

you are not alone.

---

# Verse Five

## First Peter Chapter 5, Verse 7

"Cast all your anxiety on Him because He cares for you."

[Pause]

This verse is simple.

But deeply personal.

God cares for you.

[Pause]

Not tolerates you.

Not barely puts up with you.

He cares for you.

[Pause]

The word cast means to throw something onto another thing.

To place the weight somewhere else.

[Pause]

Many people silently carry anxiety every single day.

Pressure.

Fear.

Stress.

Overthinking.

Sleepless nights.

Mental exhaustion.

And nobody around them fully sees it.

[Pause]

But Peter says:

Cast all of it onto God.

Not part of it.

All of it.

[Pause]

Peter understood fear personally.

This was the same man who panicked while walking on water.

The same Peter who denied Jesus three times.

The same Peter who struggled deeply at moments in his life.

And yet later he confidently says:

Cast your anxiety onto God.

Because He cares for you.

[Pause]

Not because you are perfect.

Not because your faith is perfect.

But because His love is real.

[Long pause]

God sees every anxious thought you have been carrying.

Every fear.

Every sleepless night.

Every silent battle.

And He does not want you carrying it alone.

---

# Closing Reflection

[Music softer]

If anxiety has been overwhelming you lately...

slow down for a moment.

Breathe deeply.

And remember this.

You do not need to solve your whole life tonight.

[Pause]

A lot of anxiety comes from trying to control everything at once.

Every outcome.

Every possibility.

Every future problem.

[Pause]

But healing often begins smaller than that.

One prayer at a time.

One day at a time.

One step at a time.

[Pause]

Talk to God honestly.

Spend less time feeding fear online.

Rest properly.

Get outside sometimes.

Speak to someone you trust.

And continue returning your mind back to God whenever anxiety tries to pull it away again.

[Pause]

Peace usually grows slowly.

Like learning to breathe again after carrying stress for too long.

[Pause]

God is not asking you to become emotionless.

He is inviting you to trust Him daily.

Even while you are still healing.

Even while your thoughts still feel messy.

Even while you are tired.

[Long pause]

If you enjoyed this video about Bible verses for anxiety, I think you would really enjoy our free Bible study app called Bible Buddy.

Bible Buddy was built to help believers connect to God and make Bible study easier and more understandable.

Inside the app, you can listen to guided Bible studies, read Scripture with simple explanations, study chapter by chapter, build a daily habit of spending time with God, and grow deeper in your faith one step at a time.

If that sounds helpful to you, you can download Bible Buddy for free at my Bible Buddy dot net.

[Pause]

And wherever you are tonight...

I pray God gives you peace...

rest...

clarity...

and comfort.

Goodnight.
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
      .replace(/\[Read slower\]|\[Soft tone\]|\[Gentle emphasis\]|\[Music softer\]|\[Soft ambient music begins\]/gi, "")
      .trim();
    textBuffer = [];
    for (const chunk of splitText(text)) {
      items.push({ kind: "text", text: chunk });
      items.push({ kind: "silence", seconds: 0.25 });
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
      items.push({ kind: "silence", seconds: 1.6 });
      continue;
    }
    if (/^\[Long pause\]$/i.test(line)) {
      flushText();
      items.push({ kind: "silence", seconds: 2.35 });
      continue;
    }
    if (/^\[Pause\]$/i.test(line)) {
      flushText();
      items.push({ kind: "silence", seconds: 1.15 });
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
        "Speak as a deep, warm, calm male Bible narrator for a lofi devotional video. The listener may be working, studying, walking, or lying down, so keep the voice smooth, peaceful, slow, intimate, and grounded. Use gentle pauses, soft emphasis, and a comforting pace. Scripture readings should feel reverent and spacious. Do not sound theatrical, salesy, rushed, robotic, hype, or like a loud preacher. Never read markdown, bracket notes, headings symbols, or formatting labels awkwardly.",
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

  console.log(`[PEACE_OF_MIND] Text chunks: ${textItems.length}, total render items: ${items.length}`);
  let textIndex = 0;
  for (const item of items) {
    if (item.kind === "silence") {
      chunks.push(silence(item.seconds));
      continue;
    }

    textIndex += 1;
    console.log(`[PEACE_OF_MIND] Generating narrator chunk ${textIndex}/${textItems.length}`);
    chunks.push(pcmBufferToFloat32(await generateOpenAiSpeechPcm(item.text)));
  }

  const normalized = normalizeVoiceOnlyEpisode(concatSamples(chunks));
  const mp3 = encodeMp3(normalized);
  ensureDir(OUTPUT_PATH);
  writeFileSync(OUTPUT_PATH, mp3);
  console.log(`[PEACE_OF_MIND] Local narrator MP3: ${OUTPUT_PATH}`);
  console.log("[PEACE_OF_MIND] Done");
}

main().catch((error) => {
  console.error("[PEACE_OF_MIND] Failed:", error);
  process.exit(1);
});
