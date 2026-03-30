// Script to seed "The Rise of Esther" devotional with all 21 days
// Run with: npx tsx scripts/seed-rise-of-esther.ts
console.log("Executing: scripts/seed-rise-of-esther.ts");

import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config({ path: resolve(process.cwd(), ".env") });
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing environment variables!");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function parseBibleReading(reference: string): { book: string; chapter: number } {
  const match = reference.match(/^(\d+\s+)?([A-Za-z]+)\s+(\d+)/);
  if (match) {
    const book = match[1] ? `${match[1].trim()} ${match[2]}` : match[2];
    const chapter = parseInt(match[3], 10);
    return { book: book.trim(), chapter };
  }
  return { book: "Esther", chapter: 1 };
}

interface DevotionalDay {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_reference: string;
  reflection_question: string | null;
}

const devotionalDays: DevotionalDay[] = [
  {
    day_number: 1,
    day_title: "Exile Before Esther",
    bible_reading_reference: "Jeremiah 25",
    devotional_text: `Esther's story begins before Esther is born.

Jeremiah 25 explains why the Jewish people ended up scattered under foreign power in the first place. Judah had been warned again and again, but the people would not listen. So exile came.

That matters because Esther does not grow up in the land her ancestors loved. She is born into the long shadow of exile, into a world where God's people are living under the power of another empire and trying to survive far from Jerusalem.

This is the deep opening of Esther's life. Before she is a queen, before she is brave, before anyone knows her name, she belongs to a people carrying the consequences of generations before her.

And yet even there, God is not gone. The exile is real, but heaven is still writing history inside it.`,
    reflection_question: "How do you live faithfully when your life is shaped by broken things that started before you?",
  },
  {
    day_number: 2,
    day_title: "How to Live Far from Home",
    bible_reading_reference: "Jeremiah 29",
    devotional_text: `Jeremiah 29 gives the exile instructions, and they matter deeply for Esther's world.

Build houses. Plant gardens. Seek the peace of the city. Do not give yourself to false hope. Wait for the Lord.

That is the atmosphere Esther grows up in. God's people are not home, but they are still called to live, work, endure, and stay anchored to Him in a foreign place.

This chapter helps you understand the emotional background of Esther's life. She is not stepping into a palace from a simple, normal world. She is coming out of a Jewish community learning how to breathe under Persian rule.

That means Esther's rise is not just about beauty or chance. It happens inside the long tension of living in a place that is not truly home while still trying to honor God there.`,
    reflection_question: "What does it look like for you to stay rooted in God while living in a world that does not feel like home?",
  },
  {
    day_number: 3,
    day_title: "Persia Takes the Stage",
    bible_reading_reference: "Ezra 1",
    devotional_text: `Ezra 1 gives the political backdrop for Esther's whole story.

Babylon has fallen. Persia is now the ruling power. Cyrus speaks, decrees move, and the shape of the world changes again.

This matters because Esther's life unfolds under Persian power, not Babylonian power. The empire has changed, but God's people are still scattered, still dependent on the decisions of foreign kings, and still learning what faithfulness looks like under another throne.

Ezra 1 also reminds you that God can move the heart of kings. That theme will matter a lot in Esther. A ruler may look absolute, but the real story is never finally in the ruler's hands.

This is why the rise of Esther works as a devotional title. Her story is not random palace drama. It happens in a world already being moved by God's unseen hand through empires and decrees far above her own control.`,
    reflection_question: "Where do you need to remember that God can move leaders, systems, and doors you cannot control yourself?",
  },
  {
    day_number: 4,
    day_title: "A Throne Left Open",
    bible_reading_reference: "Esther 1",
    devotional_text: `Esther 1 opens like a royal spectacle.

King Ahasuerus displays his power, wealth, and glory with endless feasting. The palace is loud with luxury, pride, and control. Then Queen Vashti refuses the king's command, and the whole atmosphere shifts.

What began as celebration turns into anger, humiliation, and political panic. Advisors rush to make the queen's refusal into a national crisis. By the end of the chapter, the throne beside the king is empty.

That matters because Esther has still not appeared, but the stage is being set for her. An empty place in the palace is being prepared before anyone in the empire knows the name of the orphan girl who will eventually sit there.

This is how God's providence often works. The visible story looks like ego, politics, and rash decisions. But underneath it, God is making room for what He already sees coming.`,
    reflection_question: "Have you ever seen God make room for your future in ways that did not look spiritual at first?",
  },
  {
    day_number: 5,
    day_title: "An Orphan in the Palace",
    bible_reading_reference: "Esther 2",
    devotional_text: `Esther 2 is where Esther steps into the light, but she does not step in as someone powerful.

She is an orphan. Mordecai has raised her. She is young, vulnerable, and living in exile. Then the king's search for a new queen pulls her into the palace system.

This chapter matters because Esther's rise begins in weakness, not strength. She is taken into a world she did not design and cannot control. Yet favor follows her. The keeper of the women notices her. Doors open around her. And eventually the king sets the crown on her head.

But the chapter also keeps a deeper tension alive. Esther does not reveal that she is Jewish. Her beauty is visible, but part of her identity remains hidden.

That tension is central to her life. Esther is lifted high while still carrying a secret that will one day collide with the whole future of her people.`,
    reflection_question: "Where in your life do you feel both favored by God and still deeply vulnerable at the same time?",
  },
  {
    day_number: 6,
    day_title: "A Hatred Begins to Grow",
    bible_reading_reference: "Esther 3",
    devotional_text: `Esther 3 is the chapter where the threat becomes clear.

Haman rises in power, but Mordecai refuses to bow before him. That refusal sets off a fury far bigger than one personal insult. Haman does not only want Mordecai punished. He wants the whole Jewish people destroyed.

That is what makes this chapter so dark. Personal pride becomes a national death sentence. A decree is written. Dates are chosen. Money is offered. The empire becomes a weapon against a people already living as a minority under foreign power.

And where is Esther in this chapter? She is in the palace, but the decree is moving toward her life too whether she sees it yet or not.

This is one of the strongest turns in the whole story. Esther's rise is no longer only about favor. It is about whether favor will be used for courage when the cost becomes real.`,
    reflection_question: "What do you do when a problem stops being uncomfortable and starts becoming truly urgent?",
  },
  {
    day_number: 7,
    day_title: "For Such a Time as This",
    bible_reading_reference: "Esther 4",
    devotional_text: `Esther 4 is the heart of the whole story.

Mordecai mourns in sackcloth. The city is shaken. Esther hears about the grief, but at first she is still separated from the full weight of what is happening. Then the message reaches her clearly: the decree includes her people.

When Mordecai tells her not to imagine she will escape just because she is in the palace, the chapter turns sharp. Then comes the line everyone remembers: who knows whether you have come to the kingdom for such a time as this?

That line matters because Esther now has to choose. She can stay in the safety of silence, or she can risk her life by stepping toward the king unsummoned.

Her answer is one of the strongest moments in Scripture. Fast for me. I will go. And if I perish, I perish.

This is not loud shallow bravery. This is courage born from fear, fasting, and a decision to place obedience above self-preservation.`,
    reflection_question: "What step of obedience feels risky enough that part of you wants to stay silent instead?",
  },
  {
    day_number: 8,
    day_title: "The First Banquet",
    bible_reading_reference: "Esther 5",
    devotional_text: `Esther 5 is full of suspense.

She puts on her royal robes and stands in the inner court. That image matters. She is still the same woman from chapter 4, but now courage has put clothes on and walked into danger.

The king extends the scepter. She is received. But Esther does not blurt everything out at once. She moves with wisdom. She invites the king and Haman to a banquet, then to another banquet.

That is such an important part of Esther's rise. Courage is not always noisy. Sometimes courage is patient, strategic, and calm under pressure.

Meanwhile Haman leaves full of pride and anger, and the gallows begin to enter the story.

This chapter feels like a room holding its breath. Esther has stepped into the danger, but the reversal has not happened yet. The tension is still rising.`,
    reflection_question: "Do you only think courage looks instant and loud, or can you also trust God in quiet, wise strategy?",
  },
  {
    day_number: 9,
    day_title: "The Night Everything Turned",
    bible_reading_reference: "Esther 6",
    devotional_text: `Esther 6 is one of the great reversal chapters in the Bible.

The king cannot sleep. That tiny detail changes everything. Records are read. Mordecai's old act of loyalty is remembered. Haman walks in already planning how to honor himself, only to discover he will have to honor Mordecai instead.

This chapter is almost cinematic in how perfectly it turns the story. The proud man who thinks he is about to rise higher is suddenly forced to parade the man he hates through the city.

That matters because Esther's story keeps showing the hidden hand of God without ever naming Him directly in the text. A sleepless king, an old record, a mistimed entrance, a public reversal. None of it feels accidental.

This is the episode where you realize the battle is not only happening through Esther's bravery. God is already bending the story from angles no human character could fully manage.`,
    reflection_question: "Where have you seen God begin to turn something before you could even explain how it was happening?",
  },
  {
    day_number: 10,
    day_title: "The Fall of Haman",
    bible_reading_reference: "Esther 7",
    devotional_text: `Esther 7 is the payoff of all the tension.

At the second banquet, Esther finally speaks plainly. She names the threat, names the enemy, and reveals that she herself belongs to the people marked for destruction.

That is one of the most dramatic reveals in Scripture. The king suddenly sees that the queen he favors and the people she belongs to are under a death sentence driven by the man sitting at the table.

The room erupts. The king steps out in wrath. Haman collapses in terror. And then the gallows he built for Mordecai become the place of his own death.

This chapter matters because Esther's courage does not stay hidden forever. There is a moment when the truth has to be spoken fully, even when the stakes are enormous.

The rise of Esther is not just about getting a crown. It is about using the place God gave her at the exact moment truth needed a voice.`,
    reflection_question: "When the right moment comes, are you willing to speak clearly instead of only hoping things fix themselves?",
  },
  {
    day_number: 11,
    day_title: "A New Decree Goes Out",
    bible_reading_reference: "Esther 8",
    devotional_text: `Esther 8 shows that one victory does not erase every danger.

Haman is gone, but the old decree still stands. Esther has to go back before the king and plead again. Tears appear. Words are used again. Courage is not over just because one enemy has fallen.

Then a new decree is written. The Jewish people are given the legal right to defend themselves. Mordecai rises in authority, but the chapter still holds urgency because the empire is now waiting for the day both decrees will meet.

This chapter is powerful because it shows Esther using influence again, not as a one-time brave person but as someone who keeps stepping in until the path of rescue is actually opened.

Her rise is becoming a steady pattern of courageous action, not just one dramatic speech.`,
    reflection_question: "Are you willing to keep showing up until the work is truly done, not just until the first big moment passes?",
  },
  {
    day_number: 12,
    day_title: "The Day of Deliverance",
    bible_reading_reference: "Esther 9",
    devotional_text: `Esther 9 carries the long-awaited reversal all the way through.

The day that was meant to destroy the Jewish people becomes the day their enemies fall instead. Mourning turns to relief. Fear turns to victory. The plan of Haman collapses under the providence of God.

And then Purim is established. That matters so much. Esther's story does not end only with private rescue. It ends with remembrance. A whole people are given a way to remember what God did for them in a time when death had almost become law.

This chapter shows the rise of Esther becoming part of the shared memory of her people. Her courage did not only save her own life or Mordecai's life. It helped preserve a nation.

That is why this story still lands so hard. God used one woman's willingness to risk everything to protect many lives and leave a permanent testimony behind.`,
    reflection_question: "What has God done in your life that deserves to be remembered instead of quickly moved past?",
  },
  {
    day_number: 13,
    day_title: "The Legacy That Remained",
    bible_reading_reference: "Esther 10",
    devotional_text: `Esther 10 is brief, but it matters because it shows where the story settled.

Mordecai rises high in the kingdom and uses his place for the good of his people. Esther's book closes without giving us a neat long epilogue about the rest of her life, but that does not weaken her story. It sharpens it.

Her life was not recorded because she lived quietly after the crisis. It was recorded because when the moment came, she stood where she needed to stand.

This chapter teaches something beautiful about legacy. Sometimes the strongest legacies are not built by endless public attention. Sometimes they are built by one season of decisive faithfulness that changes the future for others.

Esther rises, speaks, risks, and then the people she helped protect keep living under the mercy that followed.`,
    reflection_question: "What kind of legacy do you want your courage to leave behind for the people around you?",
  },
  {
    day_number: 14,
    day_title: "The King's Heart in God's Hand",
    bible_reading_reference: "Proverbs 21",
    devotional_text: `Proverbs 21 gives language to something moving through Esther's whole story.

The king's heart is in the hand of the Lord. That line explains so much. Scepters, sleepless nights, favor, decrees, reversals, and timings are not random pieces in Esther. They are all happening under a God who can turn what even rulers think and decide.

That matters because Esther's courage was real, but it was never working alone. She risked, spoke, fasted, and acted, but above and underneath all of it God was still steering outcomes no human being could fully force.

This chapter helps bring the story into clearer focus. Esther does not teach us to trust palace access more than God. She teaches us that God can rule even through palace access.

The real power in Esther's world was never finally in Persia's throne room. It was in God's unseen government over every throne room.`,
    reflection_question: "Where do you need to trust God's hand over a person's heart instead of only fearing their power over you?",
  },
  {
    day_number: 15,
    day_title: "God in the Chaos",
    bible_reading_reference: "Psalm 46",
    devotional_text: `Psalm 46 feels like the soundtrack under Esther's whole life.

God is our refuge and strength, a very present help in trouble. The earth can change, mountains can move, waters can roar, and still God remains.

That is Esther's world. Kingdoms are shifting. Decrees are flying. The future of a whole people is hanging on decisions made in rooms she cannot fully control. And yet underneath the chaos, God is still present.

One of the strongest parts of Esther's book is that the name of God is never spoken directly, but His presence is everywhere in the turning of events. Psalm 46 helps put words to that hidden reality.

This matters for readers now too. Sometimes God feels quiet, but quiet is not absent. Hidden is not gone. Esther's story is one long reminder that God can be powerfully at work even when He is not loudly named in the moment.`,
    reflection_question: "Can you trust God as present help even in seasons where He feels quieter than you expected?",
  },
  {
    day_number: 16,
    day_title: "Strength and Dignity",
    bible_reading_reference: "Proverbs 31",
    devotional_text: `Proverbs 31 is often read in soft domestic ways, but there is royal strength in it too, and that fits Esther well.

Strength and dignity are her clothing. She opens her mouth with wisdom. She is not ruled by fear of the future.

That sounds like Esther at her best. She enters danger dressed in courage, not because she is fearless by personality, but because she has become steady enough to carry responsibility when the time demands it.

Esther's story shows that beauty without courage is not enough. Position without wisdom is not enough. Influence without sacrifice is not enough. What made Esther unforgettable was the moment those things came under the purpose of God.

This chapter helps frame Esther not just as a queen in a crisis, but as a woman whose strength became visible at the moment her people most needed it.`,
    reflection_question: "Where do you need strength and dignity to rise in you instead of fear and hesitation?",
  },
  {
    day_number: 17,
    day_title: "Wait for the Lord",
    bible_reading_reference: "Psalm 27",
    devotional_text: `Psalm 27 fits Esther's story because it carries both fear and courage in the same breath.

The Lord is my light and my salvation; whom shall I fear? That is not denial. It is a declaration made in the middle of threat.

Esther had to wait. She had to fast. She had to move carefully. She had to approach the king with real danger hanging over her life. Psalm 27 sounds like the kind of inner life a person needs in that kind of hour.

One of its strongest notes is this: wait for the Lord; be strong, and let your heart take courage.

That line matters because courage is not always a fast feeling. Sometimes it grows in the waiting. Sometimes it forms while you are still trembling, still praying, still preparing to step into the room.`,
    reflection_question: "Can you let your heart take courage while you wait, or do you only feel strong when everything moves fast?",
  },
  {
    day_number: 18,
    day_title: "God Works All Things",
    bible_reading_reference: "Romans 8",
    devotional_text: `Romans 8 gives New Testament language to the hidden providence running all through Esther.

God works all things together for good for those who love Him and are called according to His purpose.

Esther's story is one of the clearest Old Testament pictures of that truth. Exile, orphanhood, beauty, palace politics, pride, hatred, insomnia, timing, decrees, and danger all get pulled into a larger purpose God is weaving.

That does not mean every piece was good in itself. Haman's hatred was not good. Exile was not pleasant. Fear was real. But God was strong enough to work through all of it without losing the thread of His purpose.

This chapter helps the reader feel what Esther's book quietly proves: God's providence can hold together things we would never know how to arrange and still bring out a future that protects His people.`,
    reflection_question: "Where do you need to trust that God is still weaving purpose through pieces you would never have chosen?",
  },
  {
    day_number: 19,
    day_title: "Trials Make You Steady",
    bible_reading_reference: "James 1",
    devotional_text: `James 1 sounds like a commentary on Esther's whole rise.

Count it all joy when you meet trials of various kinds, because the testing of your faith produces steadfastness.

Esther's life was full of tests: exile, loss, hidden identity, palace pressure, fear, timing, and the possibility of death. Her courage did not appear from nowhere on the day she walked toward the king. It had been forming under trial.

That matters because courage is not a personality type. It is often the fruit of tested faith. A life that keeps trusting God through pressure becomes steadier over time.

James also says to ask God for wisdom. Esther needed wisdom as much as bravery. Her story is not only about being willing to die. It is also about knowing when to speak, how to move, and when to wait.`,
    reflection_question: "What trial might God be using right now to make your faith steadier instead of weaker?",
  },
  {
    day_number: 20,
    day_title: "Do Not Fear People",
    bible_reading_reference: "Matthew 10",
    devotional_text: `Matthew 10 ties Esther's courage into a direct word for believers.

Do not fear those who can kill the body but cannot kill the soul. Fear God above all.

That is the kind of courage Esther had to find. The king could destroy her. The court could reject her. Haman's decree could swallow her people. But at some point she chose loyalty over self-protection.

This chapter matters because it makes courage very clear. Fear of people is powerful, but fear of God is stronger when it becomes real in a person's heart.

Esther did not become brave because the room became safer. She became brave because something higher than safety took hold of her.

That is still the path of courage now.`,
    reflection_question: "Where is fear of people still trying to make your decisions for you instead of fear of God?",
  },
  {
    day_number: 21,
    day_title: "The Rise That Was Really Providence",
    bible_reading_reference: "Esther 4",
    devotional_text: `When you look back across Esther's life, one thing becomes clear: her rise was never only about status.

She was an orphan in exile. She was brought into the palace. She carried hidden identity, real fear, and a moment of decision that could have cost her everything. Then she stood up, spoke, and became part of the rescue of her people.

What makes Esther's story unforgettable is not just that she became queen. It is that she used the place she was given when the right moment came. She let providence become courage.

Most people remember the line about "for such a time as this," and they should. But the whole book shows what made that moment possible: years of hidden formation, pressure, timing, and God's unseen hand arranging what no one else could see.

The rise of Esther was really the rise of courage inside providence. God positioned her, and she answered with faithfulness.`,
    reflection_question: "If God has placed you where you are for a reason, what courage is He asking from you now?",
  },
];

const cinematicExpansions: Record<number, string> = {
  1: `Jeremiah 25 gives Esther's world its backstory. Her life rises out of a people already living under the consequences of national unfaithfulness and exile.`,
  2: `Jeremiah 29 makes exile feel lived-in. Houses, gardens, waiting, and hope in a foreign place. That is the emotional world Esther grows up inside.`,
  3: `Ezra 1 shifts the empire map. Persia now rules the stage, and that is the stage where Esther's life will unfold.`,
  4: `Esther 1 is all glitter and fragility. A feast looks strong until one refusal exposes how shaky human power really is.`,
  5: `Esther 2 feels like quiet providence. An orphan girl is moved through systems she did not choose and finds favor she could not have manufactured.`,
  6: `Esther 3 is where the story darkens hard. One proud man turns personal offense into a national death sentence.`,
  7: `Esther 4 is the turning chapter. Sackcloth, fasting, fear, and then the kind of courage that only comes when self-protection loses the argument.`,
  8: `Esther 5 holds tension beautifully. Esther steps forward, but the answer still waits. Courage enters the room before the breakthrough does.`,
  9: `Esther 6 turns on a sleepless night, an old record, and a perfect reversal. Providence feels almost visible in this chapter.`,
  10: `Esther 7 is the table-flip chapter. What was hidden gets named, and the enemy's rise collapses into his fall.`,
  11: `Esther 8 shows that one victory is not the end of courage. Esther has to keep stepping in until deliverance is actually opened.`,
  12: `Esther 9 makes the reversal public. The day meant for destruction becomes a day of survival and memory.`,
  13: `Esther 10 is short, but it proves the story settled into legacy. Esther's courage outlived the crisis that revealed it.`,
  14: `Proverbs 21 gives language to Esther's hidden miracle: the king's heart itself is still in God's hand.`,
  15: `Psalm 46 reads like the unseen soundtrack of Esther. God stays present while kingdoms roar and rooms of power tremble.`,
  16: `Proverbs 31 helps frame Esther as more than beautiful. Strength, wisdom, and dignity are part of what made her rise matter.`,
  17: `Psalm 27 feels like the inner courage Esther needed: not panic-free, but God-focused enough to keep moving.`,
  18: `Romans 8 lets the reader say what Esther's book quietly demonstrates: God can weave even frightening pieces into a larger good.`,
  19: `James 1 explains how Esther became steady. Trial did not only hurt her story. It formed her for it.`,
  20: `Matthew 10 puts Esther's courage in plain words: the fear of God must become stronger than the fear of people.`,
  21: `Coming back to Esther 4 at the end fits because the whole story keeps pointing toward that one great question: what do you do with the place God gave you when the moment comes?`,
};

const finalDevotionalDays: DevotionalDay[] = devotionalDays.map((day) => ({
  ...day,
  devotional_text: [day.devotional_text, cinematicExpansions[day.day_number] ?? null]
    .filter(Boolean)
    .join("\n\n"),
}));

async function main() {
  console.log("Starting to seed 'The Rise of Esther' devotional...");

  let devotionalId: string | null = null;
  const devotionalPayload = {
    title: "The Rise of Esther",
    subtitle: "A 21-Day Bible Buddy Study",
    description:
      "A cinematic 21-day journey through Esther's life, from exile and hidden identity to palace courage, providence, reversal, and the legacy of a woman who rose for such a time as this.",
    total_days: 21,
  };

  try {
    const { data: existingDevotional, error: existingError } = await supabase
      .from("devotionals")
      .select("id")
      .eq("title", devotionalPayload.title)
      .maybeSingle();

    if (existingError) {
      console.error("Failed to check for existing devotional:", existingError);
      process.exit(1);
    }

    if (existingDevotional?.id) {
      devotionalId = existingDevotional.id;
      const { error: updateError } = await supabase
        .from("devotionals")
        .update(devotionalPayload)
        .eq("id", devotionalId);

      if (updateError) {
        console.error("Failed to update existing devotional:", updateError);
        process.exit(1);
      }

      const { error: deleteDaysError } = await supabase
        .from("devotional_days")
        .delete()
        .eq("devotional_id", devotionalId);

      if (deleteDaysError) {
        console.error("Failed to clear existing devotional days:", deleteDaysError);
        process.exit(1);
      }

      console.log(`Refreshing existing devotional with ID: ${devotionalId}`);
    } else {
      const { data, error } = await supabase
        .from("devotionals")
        .insert(devotionalPayload)
        .select("id")
        .single();

      if (error || !data?.id) {
        console.error("Failed to insert devotional:", error);
        process.exit(1);
      }

      devotionalId = data.id;
      console.log(`Devotional created with ID: ${devotionalId}`);
    }
  } catch (err) {
    console.error("Unexpected error inserting devotional:", err);
    process.exit(1);
  }

  for (const day of finalDevotionalDays) {
    const parsed = parseBibleReading(day.bible_reading_reference);
    const { error } = await supabase.from("devotional_days").insert({
      devotional_id: devotionalId,
      day_number: day.day_number,
      day_title: day.day_title,
      devotional_text: day.devotional_text,
      bible_reading_book: parsed.book,
      bible_reading_chapter: parsed.chapter,
      reflection_question: day.reflection_question,
    });

    if (error) {
      console.error(`Failed to insert Day ${day.day_number} (${day.day_title}):`, error);
      process.exit(1);
    }
  }

  console.log("\nDone! 'The Rise of Esther' devotional is ready.");
}

main().catch(console.error);
