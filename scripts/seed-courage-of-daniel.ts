// Script to seed "The Courage of Daniel" devotional with all 21 days
// Run with: npx tsx scripts/seed-courage-of-daniel.ts
console.log("Executing: scripts/seed-courage-of-daniel.ts");

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
  return { book: "Daniel", chapter: 1 };
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
    day_title: "When Babylon Took Jerusalem",
    bible_reading_reference: "2 Kings 24",
    devotional_text: `Daniel's story starts before Daniel ever speaks.

2 Kings 24 is the dark opening scene. Jerusalem is under judgment. Kings rise and fall. Babylon tightens its grip. The holy city is no longer secure, and the people of Judah are being pulled into exile.

This matters because Daniel was not born into calm. He was born into a collapsing world. The temple city his parents would have loved was already shaking under sin, compromise, and the discipline of God. By the time Daniel's life comes into focus, the world around him is already being rearranged by empire.

That is how the story begins: not with lions, not with visions, not with miracles, but with loss. Home is taken. Stability is broken. A foreign power now decides the future.

And yet even here, God is not absent. Babylon looks strong, but heaven has not lost control. Daniel's whole life will prove that the God of Israel is still God even when His people are far from Jerusalem.`,
    reflection_question: "How do you respond when life stops feeling stable and familiar the way you thought it would?",
  },
  {
    day_number: 2,
    day_title: "A New Name in a New World",
    bible_reading_reference: "Daniel 1",
    devotional_text: `Daniel 1 feels like the first real episode of Daniel's life.

Young men from Judah are selected, trained, renamed, and brought into Babylon's system. That detail matters. Babylon does not just want Daniel's body in its city. Babylon wants Daniel's mind, loyalty, and identity too.

So Daniel is given a new language, new education, new food, and even a new name. That is pressure at the deepest level. It is not only external suffering. It is a total cultural remaking project.

Then Daniel draws a line. He resolves not to defile himself. The food may seem small, but the decision is not small. It is his first clear act of courage in Babylon. Daniel refuses to let a foreign system decide the deepest thing about who he is before God.

This is why Daniel matters so much. His courage is not loud at first. It begins in a private decision to stay loyal when compromise would have been easier, safer, and probably smarter in the eyes of the empire.

That is the opening truth of his life: courage often begins as quiet faithfulness before it ever becomes public drama.`,
    reflection_question: "Where is God asking you to stay clean and loyal in a place where compromise would be easier?",
  },
  {
    day_number: 3,
    day_title: "The God Who Reveals Secrets",
    bible_reading_reference: "Daniel 2",
    devotional_text: `Daniel 2 turns the pressure up fast.

Nebuchadnezzar has a dream that terrifies him, but he refuses to tell the dream to his wise men. He demands that they tell him both the dream and the interpretation. It is impossible. The order goes out, and death is suddenly hanging over everyone in that world, including Daniel.

This is such an important chapter because Daniel does not panic into human cleverness. He asks for time, gathers his friends, and seeks mercy from the God of heaven. That line matters. Daniel's first move under deadly pressure is prayer.

Then in the night, the mystery is revealed. Daniel blesses God because wisdom and power belong to Him. Not Babylon. Not kings. Not sorcerers. God.

When Daniel stands before the king, he is clear about where the answer came from. He does not build himself up. He points straight to the God who reveals mysteries.

This chapter pushes Daniel's story forward beautifully. The young exile begins to rise in influence, not because he became Babylonian enough to survive, but because he stayed close enough to God to hear from heaven in a crisis.`,
    reflection_question: "When pressure hits, is your first instinct to control the situation or to seek God with other believers?",
  },
  {
    day_number: 4,
    day_title: "Faith Inside the Fire",
    bible_reading_reference: "Daniel 3",
    devotional_text: `Daniel 3 is not centered on Daniel's voice, but it is deeply part of Daniel's world and the courage his life stands inside.

Nebuchadnezzar builds an image and demands worship. Music fills the air, officials gather, and the whole chapter feels like a giant public loyalty test. Bow, or burn.

Shadrach, Meshach, and Abednego refuse. These are Daniel's companions, men who came through Babylon's training with him and chose the same deeper loyalty. Their courage shows what kind of life was being formed in that little circle of faith.

Their answer to the king is unforgettable. God is able to deliver us. But even if He does not, we will not bow.

That is courage at its purest. Not courage because the outcome is guaranteed, but courage because God is worthy no matter the outcome.

Then the furnace burns, and God meets them in it.`,
    reflection_question: "Would your loyalty to God still stand if obedience became costly right in front of everyone?",
  },
  {
    day_number: 5,
    day_title: "The King Who Became Like a Beast",
    bible_reading_reference: "Daniel 4",
    devotional_text: `Daniel 4 is a chapter about pride, and it lands right in the middle of Daniel's Babylon story for a reason.

Nebuchadnezzar dreams again, and once again Daniel is the one who can tell the truth. The dream points toward judgment. The great king will be humbled until he learns that the Most High rules the kingdom of men.

What makes this chapter so strong is that Daniel does not enjoy delivering hard truth. He is troubled by it. He actually cares about the man he has served under, even though that king once ruled over his captivity.

Then the word comes true. Nebuchadnezzar is brought low. Pride drives him down until he is living like an animal in the field.

This chapter teaches something Daniel never forgets: kings may look untouchable, but God can humble any throne in one breath.`,
    reflection_question: "Where do you need to remember that God can humble what looks too strong to ever be touched?",
  },
  {
    day_number: 6,
    day_title: "The Writing on the Wall",
    bible_reading_reference: "Daniel 5",
    devotional_text: `Daniel 5 feels like a night of glitter, arrogance, and sudden terror.

Belshazzar throws a feast while Babylon acts like its glory will never end. Sacred vessels from the temple are brought out and used in mockery. It is a scene full of pride and disrespect.

Then the hand appears. Fingers write on the wall, and the whole room collapses into fear. The king turns pale. The party dies. The kingdom suddenly feels fragile.

Daniel is called in again, and now he is an older man, steady in a room full of panic. He does not flatter the king. He tells the truth.

This chapter is part of the story arc because it shows Daniel staying the same while kingdoms crumble around him. He remains loyal, clear, and unmoved by the sparkle of a dying empire.`,
    reflection_question: "Do you still tell the truth clearly when the room is full of pride and pressure?",
  },
  {
    day_number: 7,
    day_title: "Prayer Above Survival",
    bible_reading_reference: "Daniel 6",
    devotional_text: `Daniel 6 is the chapter everyone knows, but it only hits fully when you remember everything that came before it.

Daniel is now older, tested, proven, and set high in the kingdom again. That makes jealous men search for a weakness in him. They cannot find corruption, so they decide the only way to trap him is through his faith.

The decree is signed. No one can pray to anyone except the king. And Daniel does what Daniel has trained his life to do. He goes home, opens the windows toward Jerusalem, and prays as he had done before.

That line matters so much. He had done this before. Daniel is not becoming faithful in the crisis. The crisis is exposing the faithful life he had already built.

Then comes the lions' den, the sealed stone, the sleepless king, the dawn, the cry, and Daniel alive because God shut the lions' mouths.`,
    reflection_question: "What rhythms of loyalty are you building now that would still hold if pressure suddenly came tomorrow?",
  },
  {
    day_number: 8,
    day_title: "Beasts from the Sea",
    bible_reading_reference: "Daniel 7",
    devotional_text: `Most people stop Daniel's story at chapter 6. Daniel 7 is where the devotional opens wider.

Now the book shifts from public court stories into visions. Daniel sees four beasts rising from the sea, kingdoms moving like monsters across history, power looking wild, frightening, and unstable.

Then the vision turns. Thrones are set. The Ancient of Days takes His seat. The chaos of earth meets the authority of heaven.

And then the Son of Man appears, receiving dominion and glory and a kingdom that will not pass away.

Daniel's courage is now connected to something even deeper. He is not only surviving exile. He is being shown that the future belongs to God's kingdom, not the beasts of this world.`,
    reflection_question: "What earthly power looks huge to you right now, and how would your fear change if you really remembered God's throne above it?",
  },
  {
    day_number: 9,
    day_title: "The Ram and the Goat",
    bible_reading_reference: "Daniel 8",
    devotional_text: `Daniel 8 keeps the visions going, but now the detail gets sharper and stranger.

Daniel sees a ram, a goat, broken horns, and rising power. The imagery is intense because history itself is being shown to him like a war unfolding before it happens.

This chapter matters because it shows Daniel carrying a burden larger than his own lifetime. He is seeing what is coming for nations, temples, and the people of God. Some of it is so heavy that it leaves him exhausted and overwhelmed.

There is also a clear undertone of spiritual warfare here. Earthly events are not merely political. They are tangled into larger spiritual conflict and larger divine purpose.

So Daniel's courage is not only about standing firm in visible pressure. It is also about receiving hard truth from God without turning away when it is heavy to carry.`,
    reflection_question: "Can you stay open to what God wants to show you even when the truth feels heavy instead of easy?",
  },
  {
    day_number: 10,
    day_title: "The Prayer That Reached Heaven",
    bible_reading_reference: "Daniel 9",
    devotional_text: `Daniel 9 is one of the most beautiful prayer chapters in Scripture.

Daniel reads Jeremiah and realizes the years of exile are connected to the word of God. So he fasts, mourns, confesses, and turns his face to the Lord.

That matters because Daniel does not respond to prophecy with passive curiosity. He responds with repentance and prayer. He confesses the sin of his people, even though his own life is one of the most righteous we see in the whole Old Testament.

Then comes the prophecy of the seventy weeks, one of the most important passages for understanding the larger redemptive story. Messiah is in view. The future is in view.

This chapter is a turning point because it shows Daniel at his deepest strength: a man shaped by the word of God, broken in prayer, and trusted with truth about the coming Messiah.`,
    reflection_question: "When Scripture opens your eyes, does it mostly make you curious, or does it move you toward deeper prayer and repentance?",
  },
  {
    day_number: 11,
    day_title: "The Battle You Cannot See",
    bible_reading_reference: "Daniel 10",
    devotional_text: `Daniel 10 is one of the most powerful chapters in the whole devotional because it pulls the curtain back on unseen warfare.

Daniel is mourning and fasting again when a heavenly messenger appears. The scene is overwhelming. His strength leaves him. Fear hits him. The glory of what he sees is too much for a normal body to carry lightly.

Then comes one of the most startling explanations in Scripture: from the first day Daniel set his heart to understand and humbled himself, his words were heard. But there was resistance in the spiritual realm.

That means Daniel's prayer life was touching a real unseen battle.

Daniel's courage here is not loud. It is the courage to keep seeking God long enough for unseen realities to break into view.`,
    reflection_question: "How would your prayer life change if you really believed heaven hears you from the first day, even when the answer feels delayed?",
  },
  {
    day_number: 12,
    day_title: "The Wars Still Ahead",
    bible_reading_reference: "Daniel 11",
    devotional_text: `Daniel 11 is dense, detailed, and heavy on purpose.

The chapter lays out wave after wave of conflict, kings, betrayals, invasions, and power struggles. It can feel exhausting to read, and that is part of the point. Human history under broken kingdoms is exhausting.

Daniel is being shown that the future will not become simple just because God is real. Nations will still rage. Pride will still rise. Violence will still spread. The people of God will still need endurance.

Daniel does not get a softer view of reality. He gets a clearer and harder view of reality, but he also gets a deeper reason not to lose heart.

This chapter is part of the overall story because it teaches that courage is not built on pretending the future will be easy.`,
    reflection_question: "Are you trying to be brave by denying reality, or by seeing reality clearly while still trusting God over it?",
  },
  {
    day_number: 13,
    day_title: "The End and the Resurrection",
    bible_reading_reference: "Daniel 12",
    devotional_text: `Daniel 12 closes the vision section with language that reaches all the way to the end.

Trouble is described. Deliverance is promised. Resurrection is named. Those who sleep in the dust will awake. This is one of the clearest Old Testament windows into the final future.

That matters because Daniel's life is not only about surviving Babylon. His life is being lifted into a vision of the final victory of God.

Then Daniel is told to go his way till the end. After all the visions, all the service, all the pressure, and all the faithfulness, the instruction is simple: keep going, Daniel.

He gets enough to know God wins, resurrection is real, and his own story is held in a future larger than exile.`,
    reflection_question: "What changes in your daily courage when you remember that resurrection, judgment, and eternal life are real?",
  },
  {
    day_number: 14,
    day_title: "Why the Exile Came",
    bible_reading_reference: "Jeremiah 25",
    devotional_text: `Jeremiah 25 zooms out and tells you why Daniel's world was falling apart in the first place.

The exile did not happen randomly. Judah had been warned. The people resisted. The word of the Lord was ignored. So Babylon became an instrument of judgment in God's hand.

This chapter matters because Daniel's courage makes more sense when you understand the world he inherited. He was not living in exile because God was weak. He was living in exile because God's people had been unfaithful.

That makes Daniel's loyalty stand out even more. He becomes one of the clearest examples of how to live faithfully in a generation carrying the consequences of earlier compromise.`,
    reflection_question: "How do you stay faithful when you are living inside the consequences of a world that has been unfaithful to God?",
  },
  {
    day_number: 15,
    day_title: "How to Live in Babylon",
    bible_reading_reference: "Jeremiah 29",
    devotional_text: `Jeremiah 29 gives the exile instructions people often overlook.

Build houses. Plant gardens. Seek the peace of the city. Multiply there. Do not believe lies. Wait for the Lord.

That matters because Daniel's courage was not the courage of a man living outside Babylon. He lived inside it. He studied there, served there, rose there, prayed there, and stayed faithful there.

Daniel did not withdraw into bitterness. He lived in the foreign city without letting the foreign city live inside his soul.

Daniel becomes one of the best pictures in Scripture of what Jeremiah 29 can look like in real life.`,
    reflection_question: "What does it look like for you to live usefully in the world around you without becoming shaped by it?",
  },
  {
    day_number: 16,
    day_title: "Daniel the Righteous",
    bible_reading_reference: "Ezekiel 14",
    devotional_text: `Ezekiel 14 does something striking. Daniel is named alongside Noah and Job as a righteous man.

That is a remarkable thing because it means Daniel's faithfulness was already visible and weighty enough to be named while he was still alive in exile.

This chapter matters because it confirms what the narrative has been showing us. Daniel was not just politically useful. He was spiritually marked. His life carried real integrity before God.

And yet Ezekiel's point is also sobering. Even the righteousness of men like Noah, Daniel, and Job could not simply cancel the full consequences of a rebellious people.

Daniel's courage was never about becoming a human savior. It was about staying clean in a generation that was not clean.`,
    reflection_question: "Do you want a reputation for being useful, or a reputation for actually being righteous before God?",
  },
  {
    day_number: 17,
    day_title: "The Spirit Behind Proud Thrones",
    bible_reading_reference: "Ezekiel 28",
    devotional_text: `Ezekiel 28 is not about Daniel directly, but it helps explain the kind of spiritual atmosphere Daniel lived under.

The chapter speaks to the king of Tyre, but the language reaches deeper into pride, rebellion, beauty turned corrupt, and power lifted against God. That is exactly the kind of spirit Daniel kept facing in the empires around him.

Babylon's kings did not only have political arrogance. They carried a deeper spiritual pride that set itself against heaven.

Daniel's courage was not just about surviving difficult personalities. It was about staying loyal in the middle of systems shaped by pride against God.

And still, Daniel stayed humble, prayerful, and loyal.`,
    reflection_question: "Where do you see pride shaping the systems around you, and how can you stay humble under God inside them?",
  },
  {
    day_number: 18,
    day_title: "Like a Tree by Water",
    bible_reading_reference: "Psalm 1",
    devotional_text: `Psalm 1 reads like a description of Daniel's life even though it was written long before him.

Blessed is the man who does not walk in the counsel of the wicked, stand in the way of sinners, or sit in the seat of scoffers. Instead, he delights in the law of the Lord.

That is Daniel. In Babylon. In courts. In visions. In prayer. In public pressure.

He was like a tree planted by streams of water. That is why he could stay steady while whole kingdoms rose and fell around him. His roots were not in Babylon's approval. His roots were in God.

If you want courage under pressure, you need roots deeper than the pressure.`,
    reflection_question: "What are your roots actually in right now, and would they hold if the pressure got heavier?",
  },
  {
    day_number: 19,
    day_title: "Do Not Conform",
    bible_reading_reference: "Romans 12",
    devotional_text: `Romans 12 feels like Daniel translated into New Testament language.

Do not be conformed to this world, but be transformed by the renewing of your mind.

That line could sit right over Daniel 1. New names, new training, new empire, new pressure, and Daniel refusing to let Babylon write over the deepest truth of who he belonged to.

Daniel was not rebellious just to be rebellious. He was transformed enough not to conform.

Courage is not just being different to make a point. Courage is being so shaped by God that the world around you cannot fully squeeze you into its mold.`,
    reflection_question: "Where are you feeling the pull to conform right now instead of being renewed in the way you think and live?",
  },
  {
    day_number: 20,
    day_title: "Testing Produces Endurance",
    bible_reading_reference: "James 1",
    devotional_text: `James 1 gives language for what Daniel's whole life really was: a long testing that produced endurance.

Daniel was tested in identity, food, pressure, dreams, politics, lions, visions, and delay. And the tests did not end after one victory. They kept coming over years and years.

That matters because some people think courage is one big scene. Daniel shows it is something deeper. Courage is built by enduring with God over a lifetime of pressure.

Daniel sought wisdom from God. He stayed steady under trial. He refused to become split between the God of Israel and the gods of Babylon.

Endurance does not appear magically. It is formed in repeated loyalty under real tests.`,
    reflection_question: "What test in your life right now could actually be building the endurance you will need later?",
  },
  {
    day_number: 21,
    day_title: "Windows Open Toward Heaven",
    bible_reading_reference: "Matthew 6",
    devotional_text: `Matthew 6 ties the whole devotional together beautifully.

Jesus teaches about prayer, secret devotion, loyalty, treasure, and the eye of the heart. Daniel's life matches that world. His courage in Daniel 6 did not come from public performance. It came from a private life with God.

When Daniel opened his windows and prayed, he was not doing something new for the crisis. He was living out the kind of hidden devotion Jesus later describes so clearly.

This is the perfect ending because it brings Daniel's courage back to its real source. Not lions. Not visions. Not influence. Prayer. Loyalty. A heart fixed toward God while living in a world that pulls the other way.

Most people only know Daniel for the lions' den, but that was just one moment in a lifetime of faith.`,
    reflection_question: "What hidden prayer habits do you need to build now so your public faith is strong later?",
  },
];

const cinematicExpansions: Record<number, string> = {
  1: `Babylon does not arrive politely in 2 Kings 24. It arrives like a shadow swallowing the city. That is the air Daniel's early life is born into: fear, collapse, exile, and the discipline of God hanging over Judah.`,
  2: `Daniel 1 is all about identity warfare. New names, new food, new language, new pressure. Babylon is trying to rewrite the boys from Jerusalem before they are even old enough to hold office.`,
  3: `Daniel 2 feels like a throne room thriller. A king cannot sleep, wise men are about to die, and Daniel steps into the impossible with prayer instead of panic.`,
  4: `The furnace in Daniel 3 matters because it proves the pressure of Babylon was never only on Daniel. His whole world was designed to bow, and his circle had to learn the same courage he did.`,
  5: `Daniel 4 is a king's pride cracking in slow motion until a ruler becomes like a beast. Daniel watches power get humbled by heaven.`,
  6: `The feast of Daniel 5 turns to terror in seconds. Wine, blasphemy, laughter, and then a hand writing judgment on a palace wall.`,
  7: `Daniel 6 works because the trap is aimed at Daniel's strongest habit: prayer. The den only becomes possible because a faithful life was already in place.`,
  8: `Daniel 7 takes you out of court politics and into heaven's imagery. Beasts rise, but God's throne does not shake.`,
  9: `Daniel 8 feels heavier because revelation itself starts wearing Daniel down. Seeing the future is not exciting here. It is costly.`,
  10: `Daniel 9 is powerful because prophecy and prayer collide. Daniel reads the word, then falls to his knees, and heaven answers into the future of the Messiah.`,
  11: `Daniel 10 opens the unseen world. Delayed answers, angelic conflict, trembling bodies, and the reminder that faithful prayer touches more than the visible realm.`,
  12: `Daniel 11 moves like a history storm. War after war, king after king, proving that earthly power stays restless and violent without God.`,
  13: `Daniel 12 gives the book its long horizon. Daniel's story is no longer only about exile. It is about resurrection, final things, and a future that outlasts kingdoms.`,
  14: `Jeremiah 25 explains the backstory Daniel inherited. Exile was not bad luck. It was the fruit of a people refusing to listen.`,
  15: `Jeremiah 29 shows that Babylon was not merely a prison. It was also the place where faithfulness had to learn how to live daily life without surrendering identity.`,
  16: `Ezekiel 14 confirms Daniel's weight in his own lifetime. His name already stands for righteousness while he is still living in exile.`,
  17: `Ezekiel 28 helps you feel the spirit under the empires. Pride keeps taking thrones, but Daniel keeps bowing only to God.`,
  18: `Psalm 1 gives you the image for Daniel's whole life: planted, rooted, fruitful, and not blown away by the counsel of the wicked.`,
  19: `Romans 12 turns Daniel into direct instruction for us. Babylon had a mold, but Daniel refused to fit inside it.`,
  20: `James 1 sounds like the interpretation of Daniel's whole life. Trial after trial was quietly forging endurance over time.`,
  21: `Matthew 6 brings the story home. Daniel's public courage came from private prayer. The windows opened in chapter 6 because the hidden life was already real.`,
};

const finalDevotionalDays: DevotionalDay[] = devotionalDays.map((day) => ({
  ...day,
  devotional_text: [day.devotional_text, cinematicExpansions[day.day_number] ?? null]
    .filter(Boolean)
    .join("\n\n"),
}));

async function main() {
  console.log("Starting to seed 'The Courage of Daniel' devotional...");

  let devotionalId: string | null = null;
  const devotionalPayload = {
    title: "The Courage of Daniel",
    subtitle: "A 21-Day Bible Buddy Study",
    description:
      "A cinematic 21-day journey through Daniel's life, from exile and identity pressure to the lions' den, visions of the future, and the hidden prayer life that made him strong in Babylon.",
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

  console.log("\nDone! 'The Courage of Daniel' devotional is ready.");
}

main().catch(console.error);
