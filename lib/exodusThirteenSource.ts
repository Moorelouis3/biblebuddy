export type ExodusThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirteenRawNotes(rawText: string): ExodusThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 13:${startVerse}` : `Exodus 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 13 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTEEN_RAW_NOTES = `# Exodus 13:1-2

# 👑 Every Firstborn Belongs To God

---

## ✨ Sanctify Unto Me All The Firstborn

Sanctify means to set apart as holy for a special use.

God claims every firstborn male in Israel, both human and animal.

That claim is not random.

It connects directly to the tenth plague, when God spared Israel's firstborn while striking Egypt's.

Because God spared them, He now claims them as His own.

✨ Sanctify means set apart as holy

👶 God claims every firstborn male

🩸 This connects to the tenth plague

📖 God spared them, so He claims them

---

## 👶 Whatsoever Openeth The Womb

This phrase means the very first baby or animal born to a mother.

It does not mean the oldest child in a household overall.

A mother's first child counts, even if older stepchildren already live in that home.

Openeth the womb tracks birth order for one mother, not the whole family.

👶 Openeth the womb means the first birth

🚫 Not the oldest child in the house

👪 It tracks one mother, not the family

📖 Firstborn status is counted this way

# Exodus 13:3-7

# 🍞 Remember This Day

---

## 🕰️ Remember This Day, In Which Ye Came Out From Egypt

Moses commands Israel to actively remember, not just to recall passively.

This day marks the exact moment Israel became a free nation instead of a slave nation.

The instruction to remember becomes the seed of Israel's entire calendar of feasts.

Every future generation will treat this day as the anchor point of their whole story.

🕰️ Remember means an active choice

🕊️ This day marks freedom, not slavery

📅 It becomes the start of Israel's calendar

📖 Every future generation anchors here

---

## 🏠 Out Of The House Of Bondage

Bondage means slavery.

This exact phrase becomes the standard way the rest of the Old Testament describes Egypt.

Israel's national identity is now permanently shaped by having once been slaves there.

Every law about kindness to strangers and servants will later point back to this memory.

🏠 Bondage means slavery

📜 This phrase becomes Egypt's standard label

🪢 Israel's identity is now shaped by slavery

📖 Later laws point back to this memory

---

## 💪 By Strength Of Hand The LORD Brought You Out

Strength of hand is a Hebrew way of describing raw, unstoppable power.

It is not describing Moses' arm or Israel's own effort.

The ten plagues and the exodus itself were entirely God's doing, not a human escape.

Israel did not fight or negotiate its way free.

God simply overpowered Egypt.

💪 Strength of hand means overwhelming power

🙅 It is not human effort

⚡ God alone caused the exodus

📖 Israel did not fight its way free

---

## 📅 This Day Came Ye Out In The Month Abib

Abib was the original Hebrew name for the first month of the year.

It was later called Nisan, the name still used in the Jewish calendar today.

This month falls in the early spring, around March or April.

From this point forward, Israel's entire calendar is reset around the exodus.

📅 Abib was the first month's original name

🌱 It falls in early spring

🔄 It was later renamed Nisan

📖 Israel's calendar restarts around this event

---

## 🍯 A Land Flowing With Milk And Honey

This is a figure of speech describing a rich, fertile land.

Milk pictures healthy herds and flocks with plenty to eat.

Honey pictures a land so fertile that sweetness comes easily, without struggle.

The phrase is not a literal description.

It is a promise that this land can fully support the people God is bringing into it.

🐐 Milk pictures healthy, well fed flocks

🍯 Honey pictures easy, natural abundance

🌾 It describes a fertile, generous land

📖 It is a promise, not a literal claim

---

## 🍞 Seven Days Thou Shalt Eat Unleavened Bread

This repeats the command already given in chapter twelve.

Leaven is yeast, the ingredient that makes bread rise.

Removing it for seven straight days turns a single meal into a whole week of remembering.

The seventh day closes the week with its own feast to the LORD.

🍞 Leaven means yeast

📆 The command lasts a full week

🔁 It repeats the order from chapter twelve

📖 The week ends with its own feast

---

## 🚫 No Leavened Bread Be Seen ... In All Thy Quarters

Quarters means territory, the full area where someone lives.

This command is stricter than just avoiding leavened bread at meals.

Leaven had to be removed from every home in the entire region for the whole week.

Leaven often pictures sin or corruption spreading quietly through something.

A totally leaven free camp pictures a people made completely clean before God.

🗺️ Quarters means the whole territory

🧹 Leaven had to be removed everywhere

🦠 Leaven often pictures sin spreading

📖 A clean camp pictures a clean people

# Exodus 13:8-10

# 👨‍👦 Teach Your Son

---

## 👨‍👦 Thou Shalt Shew Thy Son In That Day

Shew is an old spelling of show.

Parents are commanded to actively explain these events to their children.

They are not told to simply hope their children absorb the story over time.

Faith in this culture was meant to be taught on purpose, not caught by accident.

👨‍👦 Shew means show

🗣️ Parents must explain, not assume

🚫 Faith was not meant to be accidental

📖 Teaching was a direct command

---

## ✋ A Sign Unto Thee Upon Thine Hand, And For A Memorial Between Thine Eyes

This is poetic language, not a command to literally attach an object yet.

It pictures keeping God's actions constantly visible in everyday life and thought.

Centuries later, some Jewish traditions took this literally.

They wore small boxes containing Scripture, called phylacteries, on the hand and forehead during prayer.

✋ This pictures constant awareness of God

🧠 Hand and eyes picture action and thought

📦 Phylacteries later took this literally

📖 The point is remembering, not decoration

---

## 🗣️ That The LORD's Law May Be In Thy Mouth

This means God's instruction should be spoken often, not just written down and stored away.

Ancient teaching relied heavily on speaking and repeating, since most people could not read.

A law kept in the mouth gets passed on out loud, generation after generation.

That is why parents were commanded to keep repeating it near their children.

🗣️ In thy mouth means spoken often

📚 Most people could not read back then

🔁 Speaking it kept it alive across generations

📖 God's law was meant to be repeated

---

## 📆 Keep This Ordinance In His Season From Year To Year

An ordinance is a fixed rule that must be kept exactly as given.

His season means its own proper, appointed time each year.

This turns Passover and Unleavened Bread into a permanent, yearly fixture on Israel's calendar.

It is not a one time event.

📜 Ordinance means a fixed rule

📅 His season means its proper yearly time

🔁 This becomes a permanent yearly feast

📖 History gets a fixed date on the calendar

# Exodus 13:11-13

# 🐑 Redeeming What Belongs To God

---

## 🐑 Set Apart Unto The LORD All That Openeth The Matrix

Matrix is another old word for womb.

This is the same command already given at the start of the chapter.

Now it is repeated again for the new land Israel is entering.

God's claim on the firstborn does not expire once the exodus itself is over.

🐑 Matrix means womb

🔁 This repeats the earlier command

🗺️ It applies once Israel reaches Canaan

📖 God's claim does not expire

---

## 🐴 Every Firstling That Cometh Of A Beast ... The Males Shall Be The LORD'S

Firstling means the first offspring born to an animal.

Male firstborn animals specifically belong to God, not just human sons.

This connects directly to the claim over human firstborn stated earlier in this chapter.

The same pattern now covers every living thing Israel owns.

🐴 Firstling means an animal's first offspring

🚹 Male animals, not just sons, are claimed

🔗 This echoes the claim on human firstborn

📖 The same pattern now covers every living thing

---

## 🔄 Every Firstling Of An Ass Thou Shalt Redeem With A Lamb

Redeem means to buy back, or to substitute one thing for another in its place.

A donkey was not considered an acceptable sacrifice.

So a lamb takes the donkey's place instead, protecting the donkey's life and value.

Most other unclean animals were not given this option.

🔄 Redeem means substitute one thing for another

🐴 Donkeys were not acceptable sacrifices

🐑 A lamb stands in the donkey's place

📖 Substitution protects what cannot be sacrificed

---

## 💀 If Thou Wilt Not Redeem It, Then Thou Shalt Break His Neck

This is not cruelty for its own sake.

It shows that the firstborn animal could never simply stay ordinary and unclaimed.

Either it gets redeemed with a substitute, or its life is given up entirely.

There was no third option that let an owner just keep it as normal property.

⚖️ There was no neutral option here

🔄 Redemption was the intended way out

💀 Refusing redemption still cost something

📖 The firstborn could never stay unclaimed

---

## 👶 All The Firstborn Of Man Among Thy Children Shalt Thou Redeem

Human firstborn sons are never sacrificed.

Instead, they are symbolically redeemed, bought back through a substitute price or offering.

Later in Israel's history, the whole tribe of Levi serves in the temple.

They stand in as a substitute for every family's firstborn son.

👶 Human sons are always redeemed

🚫 They are never sacrificed

🕎 Levi later substitutes for every firstborn son

📖 A whole tribe carries this responsibility

# Exodus 13:14-16

# ❓ When Your Son Asks

---

## ❓ When Thy Son Asketh Thee In Time To Come, Saying, What Is This?

This repeats the same built in teaching moment already given in chapter twelve.

The instructions expect this question to come up naturally, year after year.

A child noticing an unusual family custom raises a natural question.

That question becomes a teaching opportunity, not an interruption.

❓ This repeats chapter twelve's pattern

🔁 The question is expected every year

👂 A child's curiosity becomes a lesson

📖 Customs were meant to spark questions

---

## 🚪 When Pharaoh Would Hardly Let Us Go

Hardly here means with great difficulty and only after a long, stubborn resistance.

Pharaoh did not simply agree to release Israel.

He refused across nine plagues and only broke after the tenth one struck his own household.

Every earlier refusal is now summarized in this one short word.

🚪 Hardly means only with great difficulty

👑 Pharaoh resisted through nine plagues

💔 The tenth plague finally broke him

📖 Freedom came after real resistance, not ease

---

## 💀 The LORD Slew All The Firstborn In The Land Of Egypt

Parents are told to explain the tenth plague to their children honestly.

They are not instructed to soften it or leave out how severe it actually was.

The same event that freed Israel also brought real death across Egypt.

Both truths are meant to be told together, not separated.

💀 Parents must explain this honestly

🚫 The story is not softened for children

⚖️ Israel's freedom came at a heavy cost

📖 The two truths are told together

---

## 🐑 Therefore I Sacrifice To The LORD ... But All The Firstborn Of My Children I Redeem

This is written as a personal confession, spoken by a father to his child.

Animals that open the womb get sacrificed.

Human sons get redeemed instead, never sacrificed.

Saying this out loud kept the distinction alive in every household.

It was not just a rule handed down by priests.

🗣️ This is a personal, spoken confession

🐑 Animals are sacrificed

👶 Sons are redeemed, never sacrificed

📖 Every household repeats this distinction

---

## ✋ A Token Upon Thine Hand, And For Frontlets Between Thine Eyes

Frontlets means ornaments or bands worn across the forehead.

This repeats the same symbolic picture used earlier in the chapter.

Hands picture action.

The space between the eyes pictures thought.

Together they mean these events should shape everything Israel does and thinks.

✋ Frontlets means forehead ornaments

🔁 This repeats the earlier picture

🧠 Hand and eyes mean action and thought

📖 God's deliverance should shape daily life

# Exodus 13:17-18

# 🗺️ The Longer Road

---

## 🛣️ God Led Them Not Through The Way Of The Land Of The Philistines, Although That Was Near

The shortest route from Egypt to Canaan ran directly along the coast through Philistine territory.

God deliberately avoids that quicker path.

He chooses a longer, less direct route through the wilderness instead.

That choice was intentional, not accidental.

🛣️ The coastal route was the shortest path

🚫 God avoids it on purpose

🧭 A longer wilderness route is chosen instead

📖 God's timing does not chase the fastest option

---

## ⚔️ Lest Peradventure The People Repent When They See War

Peradventure means perhaps.

Repent here means to change their mind and turn back, not to feel sorry for sin.

God knows this newly freed people is not ready to face an army so soon after leaving slavery.

Facing war this early might have sent them running back to Egypt.

⚔️ Peradventure means perhaps

🔄 Repent here means turn back, not confess sin

😨 Israel was not ready for war yet

📖 God protects them from a test too soon

---

## 🌊 God Led The People About, Through The Way Of The Wilderness Of The Red Sea

About means a longer, roundabout path instead of a straight line.

This route sets up the dramatic sea crossing that happens just two chapters later.

God is already steering events toward what comes next.

The wilderness road was not a detour.

It was the plan.

🌊 About means a roundabout path

🧭 This route heads toward the Red Sea

🎬 It sets up the coming crossing

📖 God is steering events ahead of time

---

## ⚔️ The Children Of Israel Went Up Harnessed Out Of The Land Of Egypt

Harnessed here does not mean tied up like an animal.

It means organized and equipped for travel, possibly arranged in ranks like an army.

Israel leaves Egypt as an organized nation, not a scattered, panicked crowd.

This was not a fearful, disorganized escape.

⚔️ Harnessed means organized, equipped for travel

🚫 It does not mean tied up

🪖 It pictures orderly, army like ranks

📖 Israel leaves as a nation, not a mob

# Exodus 13:19

# ⚰️ Carrying Joseph's Bones

---

## ⚰️ Moses Took The Bones Of Joseph With Him

This fulfills a promise made centuries earlier, at the very end of the book of Genesis.

Joseph never asked to be buried in Egypt.

He asked that when God brought Israel out, his bones would go with them to the promised land.

That request finally comes true here, generations later.

⚰️ This fulfills a promise from Genesis

🚫 Joseph never asked to stay buried in Egypt

🗺️ His bones were meant for the promised land

📖 A promise made generations earlier is finally kept

---

## 🤝 He Had Straitly Sworn The Children Of Israel

Straitly means strictly or solemnly.

It left no room for the promise to be forgotten or ignored.

Joseph made Israel swear this oath while he was still alive.

That was long before slavery in Egypt even began.

🤝 Straitly means strictly, with no room to forget

📜 Joseph secured this oath before slavery began

⏳ The promise waited over three hundred years

📖 A solemn oath outlives its maker

---

## 👁️ God Will Surely Visit You

Visit here does not mean a casual, friendly stop by.

It means God will actively step in and act on Israel's behalf.

These are the same words Joseph himself used generations earlier when he predicted the exodus.

A promise spoken long ago is now being kept.

👁️ Visit here means God will actively act

🚫 It is not a casual visit

🔁 Joseph used these same words long before

📖 A prophecy spoken in Genesis is now happening

# Exodus 13:20-22

# 🔥 Cloud By Day, Fire By Night

---

## 🏕️ They Took Their Journey From Succoth, And Encamped In Etham

Succoth and Etham were both real stops along Israel's escape route out of Egypt.

Succoth means booths or temporary shelters.

Etham sat right at the edge of the wilderness, the last point before open desert travel began.

These were real, traceable places, not vague scenery.

🏕️ Succoth and Etham were real travel stops

🛖 Succoth means temporary shelters

🏜️ Etham marked the edge of the wilderness

📖 The exodus route can be traced precisely

---

## ☁️ The LORD Went Before Them By Day In A Pillar Of A Cloud

God gives Israel a visible, physical sign of His presence and guidance.

A cloud shaped like a pillar leads the way ahead of the people during daylight hours.

Nobody has to guess which direction to walk.

The sign was constant, not occasional.

☁️ God provides a visible cloud by day

🧭 It leads the people, not just accompanies them

👀 Nobody has to guess the direction

📖 God's guidance was visible, not hidden

---

## 🔥 By Night In A Pillar Of Fire, To Give Them Light

At night, the same guiding presence appears as fire instead of cloud.

Fire provides both direction and light through the darkness at the same time.

God meets the people's need at every single hour, day and night alike.

No hour of the journey is left without guidance.

🔥 Fire replaces cloud at night

💡 Fire gives both light and direction

🌙 God's guidance never stops after dark

📖 God meets every hour, day and night

---

## 🚫 He Took Not Away The Pillar ... From Before The People

This guiding presence never disappears, not even once, throughout the entire journey.

Its constant presence becomes a daily, visible reminder that God has not abandoned this people.

The wilderness could feel empty and uncertain.

But Israel always had something to look up and see.

🔁 The pillar remains constant, never missing

🏜️ The wilderness never leaves Israel unguided

🤝 Constant presence proves God has not left

📖 God's guidance outlasts the whole journey`.trim();

export const EXODUS_THIRTEEN_PERSONAL_SECTIONS = parseExodusThirteenRawNotes(EXODUS_THIRTEEN_RAW_NOTES);
