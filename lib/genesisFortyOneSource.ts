export type GenesisFortyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFortyOneRawNotes(rawText: string): GenesisFortyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFortyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+41:(\d+)(?:[-–—](\d+))?\s*$/i);

    if (!verseMatch) {
      index += 1;
      continue;
    }

    const startVerse = Number(verseMatch[1]);
    const endVerse = Number(verseMatch[2] || verseMatch[1]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const titleMatch = lines[index]?.trim().match(/^#\s*(.+)$/);
    if (!titleMatch) {
      throw new Error("Missing Genesis 41 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+41:/i.test(lines[index].trim())) {
      const trimmed = lines[index].trim();
      const phraseMatch = trimmed.match(/^##\s+(.+)$/);

      if (!phraseMatch) {
        index += 1;
        continue;
      }

      const phraseHeading = phraseMatch[1].trim();
      index += 1;
      const bodyLines: string[] = [];

      while (
        index < lines.length &&
        !/^##\s+/.test(lines[index].trim()) &&
        !/^#\s+Genesis\s+41:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 41 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 41,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 41:${startVerse}` : `Genesis 41:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Genesis 41 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_ONE_RAW_NOTES = `# Genesis 41:1-7

# 🐄 Pharaoh Dreams Of Cows And Corn

---

## 🌊 He Stood By The River

Pharaoh's dream starts at the Nile.

The Nile was Egypt's whole food supply.

Every crop, every animal, every meal in Egypt depended on that one river flooding on time each year.

A dream that begins at the river is a dream about whether Egypt eats or starves.

🌊 The river is the Nile

🍞 Egypt's entire food supply depended on it

🔮 The setting of the dream already points to what it's about

---

## 🐄 Seven Well Favoured Kine

Kine is an old word for cows.

The dream starts with cows, not sheep or goats.

Cows mattered to Egypt in a special way, tied to the Nile and to a good year of food.

A dream about cows was really a dream about food.

Well favoured means healthy, fat, and good to look at.

🐄 Kine means cows

🌊 The cows come up out of the Nile, Egypt's food source

🍖 Healthy cows picture a year with plenty to eat

---

## 💀 Ill Favoured And Leanfleshed

Ill favoured means ugly or sickly-looking.

Leanfleshed means starved-thin, with almost nothing on the bones.

These cows are the opposite of the first seven in every way.

Then something impossible happens.

The thin cows eat the fat cows.

And afterward, the thin cows still look thin.

Nothing about them changes.

💀 Ill favoured means sickly-looking

🦴 Leanfleshed means starved-thin

😱 Eating the fat cows and staying thin is not normal — that's the point

Real hungry cows would look bigger after a meal.

These don't.

That's what makes the dream a warning and not just a picture.

---

## 🌾 Seven Ears Of Corn, Rank And Good

Pharaoh falls back asleep and has a second dream.

This time it's not cows, it's grain.

Rank is a word that used to mean strong and healthy growth.

It did not mean smelly, the way we use it today.

So "rank and good" just means the grain was thick, tall, and full.

🌾 Corn here means grain in general, not modern corn

💪 Rank meant vigorous and healthy, not smelly

🌱 The grain pictures the same good years as the healthy cows

---

## 🌬️ Blasted With The East Wind

Egypt sits next to a desert.

A hot wind blows in from that desert sometimes.

It's dry, and it can wither a crop in a single day.

That wind is what "the east wind" means here.

Blasted does not mean exploded.

It means scorched and ruined by heat.

🌬️ The east wind was a real desert wind Egyptians knew well

🌾 Blasted means scorched or withered, not blown up

☀️ This wasn't a made-up danger — it was a danger Egypt already feared

---

## 😳 And, Behold, It Was A Dream

Both dreams end the same way.

The thin, ruined grain eats the healthy grain, just like the thin cows ate the fat cows.

Pharaoh wakes up both times realizing it was only a dream.

But two dreams telling him the exact same thing is not something Pharaoh can shake off.

😳 Both dreams end in destruction, not resolution

🔁 The same warning came twice, in two different pictures

🚨 A repeated dream is why Pharaoh wakes up shaken, not relieved

# Genesis 41:8-13

# 😰 No One Can Interpret

---

## 😰 His Spirit Was Troubled

Pharaoh wakes up shaken, not just confused.

The Bible calls it his spirit being troubled.

That's more than curiosity.

Egyptians believed dreams could carry real messages from the gods.

So a repeated dream, in Pharaoh's mind, wasn't random.

It was a message he had to understand or risk missing something serious.

😰 Pharaoh is genuinely disturbed, not just puzzled

🛕 Egyptians took dreams seriously as messages from the divine

⚠️ Missing the message felt dangerous to him, not just embarrassing

---

## 🔮 All The Magicians ... And All The Wise Men

Egypt had a whole class of trained dream readers and priests.

They studied omens, symbols, and magic for a living.

This was their job.

Pharaoh calls in every one of them, and not a single one can explain the dream.

That's a big deal.

The best minds in the most powerful nation on earth come up empty.

🔮 Magicians and wise men were Egypt's professional dream-readers

🏛️ This was Egypt's whole religious and intellectual system, not just a few guessers

🚫 All of them together still can't explain it

---

## 🍷 I Do Remember My Faults This Day

The butler finally speaks up.

He's talking about Joseph, but he starts by admitting his own failure.

"My faults" means his own wrongdoing — in this case, forgetting the man who helped him.

It takes two years and a national crisis before he says anything.

🍷 The butler is the same man Joseph helped back in chapter 40

😳 "My faults" is him admitting he should have spoken up sooner

⏳ It takes Pharaoh's emergency to shake loose a memory the butler should have acted on already

---

## 😠 Pharaoh Was Wroth ... Put Me In Ward

Wroth means angry.

Ward means a guarded place people were held, like a holding cell.

The butler explains how he first met Joseph — both of them were prisoners after Pharaoh got angry at them.

That's where Joseph correctly interpreted both of their dreams.

😠 Wroth means angry

🔒 Ward means a guarded holding place

🎯 Joseph's earlier interpretations turned out exactly right, which is why the butler trusts him now

# Genesis 41:14-16

# 🏃 Joseph Is Brought Hastily Out Of The Dungeon

---

## 🏃 Brought Him Hastily Out Of The Dungeon

Hastily means quickly, without any delay.

The moment Pharaoh hears Joseph's name, he sends for him right away.

A king's urgency can undo years of being forgotten in a single order.

Joseph has no idea any of this is happening until guards suddenly show up for him.

🏃 Hastily means quickly, without delay

⛓️ Joseph goes from prisoner to summoned advisor in a moment

😲 He has no warning any of this is coming

---

## 👗 He Shaved Himself, And Changed His Raiment

Raiment means clothing.

Egyptians shaved their faces and often their heads.

A beard, which Hebrews normally wore, would have looked foreign and unfit for Pharaoh's court.

So before Joseph can even speak to Pharaoh, he has to look the part, Egyptian style.

👗 Raiment means clothing

🧔 Egyptians were clean-shaven; a beard would have looked out of place at court

⏱️ Joseph goes from prisoner to presentable in a matter of hours

---

## 🙏 God Shall Give Pharaoh An Answer Of Peace

Pharaoh tells Joseph he's heard Joseph can interpret dreams.

Joseph's first words are not about himself at all.

"It is not in me" means Joseph is saying, plainly, that he doesn't have this power on his own.

He tells Pharaoh, straight to his face, that any answer will come from God.

Joseph gives God the credit before he's even said a word about the dream.

🙏 Joseph refuses credit before doing anything

😌 "An answer of peace" means a clear, settling answer, not a confusing one

📖 He puts God's name in front of the most powerful man alive, with nothing to gain yet

# Genesis 41:17-24

# 🔁 Pharaoh Repeats The Dream To Joseph

---

## 😱 Such As I Never Saw In All The Land For Badness

Pharaoh tells the dream again, in his own words this time.

His description of the lean cows gets even worse than before.

"For badness" means for how bad, how terrible-looking, they were.

Retelling a disturbing dream often makes the memory feel sharper, not softer.

😱 Pharaoh's own retelling is more intense than the original dream

🧠 A disturbing dream can grow more vivid the more someone talks about it

---

## 🕳️ It Could Not Be Known That They Had Eaten Them

Pharaoh adds a detail here that makes the dream worse.

After the lean cows ate the fat ones, no one could tell they'd eaten anything.

They still looked just as thin and sickly.

That detail is the whole warning of the dream, in one line.

The good years will disappear completely into the bad ones, leaving no sign they ever happened.

🕳️ The lean cows show no change after eating the fat ones

🌾 This pictures a famine bad enough to erase all memory of the good years

---

## 🌾 Withered, Thin, And Blasted With The East Wind

Pharaoh repeats the grain dream too.

Withered means dried up and shriveled.

Blasted with the east wind means scorched by that hot desert wind Egyptians already knew and feared.

Same warning, second picture, no new outcome.

🌾 Withered means dried up and shriveled

🌬️ The east wind detail repeats exactly, driving the warning home twice

---

## 🚫 There Was None That Could Declare It To Me

Declare here means explain or interpret.

Pharaoh says again that his magicians came up empty.

This is the second time that failure gets stated, once by the narrator, now by Pharaoh himself.

Egypt's entire religious system has nothing to offer him.

🚫 Declare means explain or interpret

🔁 This is the second time Egypt's wise men are named as failing

# Genesis 41:25-32

# 📖 Joseph Explains The Dream Is One

---

## 🔗 The Dream Of Pharaoh Is One

Joseph's first move is simple.

He tells Pharaoh both dreams mean the exact same thing.

One message, told twice, in two different pictures.

Joseph doesn't treat this like a puzzle to crack.

He treats it like something God has already made plain.

🔗 Both dreams carry one single message

🙏 Joseph again points to God, not his own skill, as the source of the answer

---

## 📢 God Hath Shewed Pharaoh What He Is About To Do

Shewed is an old spelling of "showed."

Joseph tells Pharaoh that God has already decided what's coming, and simply revealed it ahead of time.

This isn't Joseph reading tea leaves.

It's God telling the ruler of the nation exactly what will happen to that nation.

📢 Shewed means showed

🔮 This is God revealing His own plan, not Joseph guessing at symbols

---

## 🌾 Seven Years Of Plenty ... Seven Years Of Famine

Joseph gives Pharaoh the numbers plainly.

The seven fat cows and seven full ears mean seven years of very good harvests.

The seven lean cows and thin ears mean seven years of famine right after.

Joseph doesn't soften it.

He tells Pharaoh the famine will be "very grievous," meaning extremely severe.

🌾 Seven years of great harvests are coming first

🌵 Seven years of severe famine follow right behind them

😨 Joseph doesn't downplay how bad the famine will be

---

## 🔁 The Dream Was Doubled Unto Pharaoh Twice

Joseph explains why the dream came twice instead of once.

It means the matter is "established by God" — settled, certain, not a maybe.

And it will happen "shortly," meaning soon, not far off.

In the Bible, when something important gets repeated right away, it usually means it's locked in, not up for debate.

🔁 Two dreams with one meaning means the outcome is certain

⏳ Shortly means soon, not far in the future

# Genesis 41:33-36

# 🧠 Joseph Proposes A Plan

---

## 🧠 A Man Discreet And Wise

Discreet here means able to judge situations well, not just "quiet."

Joseph tells Pharaoh, without being asked, exactly what to do next.

Find someone with that kind of judgment and put him in charge of preparing Egypt.

Joseph has gone from interpreting a dream to advising a king in the same breath.

🧠 Discreet means having sound, careful judgment

📋 Joseph moves from interpreter to advisor without being asked to

---

## 🌾 Take Up The Fifth Part

Joseph proposes a plan: collect one-fifth of Egypt's grain during the seven good years.

That's a twenty percent tax, stored city by city, under Pharaoh's authority.

It's not a vague warning.

It's a real, workable plan a government could actually run.

🌾 "The fifth part" means one-fifth, or twenty percent

🏙️ Grain would be stored city by city across Egypt

📖 Joseph turns a frightening prophecy into something Egypt can actually do something about

# Genesis 41:37-40

# 👑 Pharaoh Sets Joseph Over Egypt

---

## ✅ The Thing Was Good In The Eyes Of Pharaoh

Pharaoh and his officials approve the plan right away.

No arguing, no long debate recorded.

The wisdom of it is obvious to everyone listening.

✅ Pharaoh and his officials accept the plan without recorded resistance

---

## 🕊️ A Man In Whom The Spirit Of God Is

Pharaoh is not a worshiper of the God of Israel.

He worships Egyptian gods.

But even he can see something different about Joseph.

He says it plainly: this man has God's Spirit in him.

Sometimes people outside the faith can still recognize when someone is walking with God, just from how they live.

🕊️ Even a pagan king recognizes God's presence in Joseph

🌍 Joseph's character has been consistent enough for outsiders to notice it

---

## 👑 Only In The Throne Will I Be Greater Than Thou

Pharaoh puts Joseph in charge of everything except the throne itself.

The household, the officials, the whole nation's food plan — all of it now answers to Joseph.

This happens in a single conversation.

Joseph goes from prisoner to second-in-command over the most powerful country on earth without any transition period at all.

👑 Joseph receives total authority except the throne itself

⚡ The change happens in one conversation, with no gradual rise

# Genesis 41:41-45

# 💍 Joseph Receives Pharaoh's Ring And A New Name

---

## 💍 Pharaoh Took Off His Ring

Pharaoh's signet ring was used to stamp wax or clay on official orders.

It functioned like a royal signature.

Giving it to Joseph means Joseph can now issue commands with Pharaoh's own legal authority behind them.

Along with the ring, Joseph gets vestures — fine linen garments — and a gold chain, both signs of high Egyptian office.

💍 The signet ring let Joseph issue orders backed by Pharaoh's authority

👘 Vestures means garments; fine linen marked high status in Egypt

⛓️ The gold chain was a public sign of rank

---

## 🚗 The Second Chariot ... Bow The Knee

Joseph rides in Pharaoh's second chariot, the vehicle reserved for the nation's second-highest official.

Runners go ahead of him shouting "Bow the knee," a command telling everyone watching to recognize his new authority on sight.

Joseph goes from a forgotten prisoner to a public procession in the same day.

🚗 The second chariot marked Joseph as second-in-command

📣 "Bow the knee" publicly announced his new authority to the whole country

---

## 🏺 Zaphnath-paaneah ... Priest Of On

Pharaoh gives Joseph an Egyptian name, Zaphnath-paaneah, tied to his gift for revealing hidden things.

Joseph also marries Asenath, whose father is a priest of On.

On is the city the Greeks later called Heliopolis, meaning "city of the sun" — a major center of Egyptian sun worship.

Joseph is now fully woven into Egyptian life: a new name, an Egyptian wife, and family ties to Egypt's priestly class.

🏺 Zaphnath-paaneah honors Joseph's gift for revealing hidden things

⛪ On (Heliopolis) was a center of Egyptian sun worship

💍 Joseph's marriage ties him directly into Egypt's priesthood

# Genesis 41:46-49

# 🌾 The Seven Years Of Plenty

---

## 🎂 Joseph Was Thirty Years Old

Joseph is thirty when he stands before Pharaoh.

He was seventeen when his brothers sold him, back in Genesis 37.

That means thirteen years passed between the pit and the palace.

Most of those years were spent enslaved or in prison, with no way to know how the story would end.

🎂 Joseph is thirty when he becomes ruler of Egypt

⏳ Thirteen years passed between being sold and being exalted

---

## 🌾 The Earth Brought Forth By Handfuls

"By handfuls" is an old way of saying the harvest was overflowing.

Grain came in so fast it felt like it could be scooped up by the fistful.

Joseph gathers so much grain that he eventually "left numbering" — he stops counting because there's simply too much to track.

🌾 "By handfuls" pictures a harvest that's overflowing

📊 Joseph stops counting because the surplus goes beyond what can be measured

# Genesis 41:50-52

# 👶 Manasseh And Ephraim Are Born

---

## 👶 Manasseh: For God Hath Made Me Forget

Joseph names his first son Manasseh, a name that sounds like the Hebrew word for "causing to forget."

Joseph says God made him forget his hardship and his father's house.

That doesn't mean the pain never happened.

It means God's goodness has covered it enough that it no longer controls him.

👶 Manasseh sounds like the Hebrew for "causing to forget"

💛 Joseph credits God with healing him, not erasing what happened

---

## 🌱 Ephraim: For God Hath Caused Me To Be Fruitful

Joseph's second son is Ephraim, a name tied to being fruitful.

Joseph names him for what God has done "in the land of my affliction" — the very place of his slavery and prison.

The place that hurt Joseph the most is the same place he becomes fruitful.

He doesn't separate the pain from the blessing.

Both are true at once.

🌱 Ephraim points to being fruitful

🌍 Egypt is both the place of Joseph's suffering and his blessing

# Genesis 41:53-57

# 🌍 The Famine Reaches All The Earth

---

## 🍞 In All The Land Of Egypt There Was Bread

The seven good years end, and the famine begins exactly as Joseph said.

It's not local.

It reaches "all lands."

But in Egypt, because of Joseph's plan, there is bread.

Egypt goes from a nation about to be blindsided to the one nation ready for it.

🍞 The famine is worldwide, but Egypt alone has stored bread

📋 Joseph's plan turns a coming disaster into an advantage

---

## 📢 Go Unto Joseph; What He Saith To You, Do

When the Egyptian people cry out for bread, Pharaoh doesn't handle it himself.

He sends them straight to Joseph.

"What he saith to you, do" means Pharaoh has handed over his own authority in this crisis completely.

📢 Pharaoh redirects the whole crisis to Joseph's judgment

🙏 Egypt's survival now runs entirely through Joseph's decisions

---

## 🏚️ Joseph Opened All The Storehouses

Joseph opens the storehouses and sells grain as the famine grows "sore," meaning severe.

The quiet, unglamorous work of storing grain during the good years is what saves the nation now.

Nobody claps for years of careful storage.

But it's exactly what carries Egypt through the crisis.

🏚️ The storehouses built during the good years now save the nation

📈 The famine is described as growing more and more severe

---

## 🌍 All Countries Came Into Egypt To Joseph

The famine is so widespread that people from every surrounding nation travel to Egypt just to buy grain from Joseph.

This detail sets up what happens next.

The same crisis that's crushing every nearby country is about to send Joseph's own brothers walking straight back into his life.

🌍 The famine draws people from every surrounding nation

🔮 This sets up Joseph's brothers arriving in the very next chapter`;

export const GENESIS_FORTY_ONE_PERSONAL_SECTIONS = parseGenesisFortyOneRawNotes(GENESIS_FORTY_ONE_RAW_NOTES);
