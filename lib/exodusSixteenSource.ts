export type ExodusSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusSixteenRawNotes(rawText: string): ExodusSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 16:${startVerse}` : `Exodus 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Exodus 16 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_SIXTEEN_RAW_NOTES = `# Exodus 16:1-3

# 😠 Israel Murmurs Against Moses And Aaron

---

## 🏜️ The Wilderness Of Sin

The word Sin here is a place name.

It has nothing to do with wrongdoing.

Elim was the resting spot Israel had just left.

Sinai still lay ahead.

That mountain is where God would soon give the law.

This moment marks one full month since Israel left Egypt.

🏜️ Sin is only a place name

🌴 Elim was their last stop

⛰️ Sinai still lay ahead

📖 One month since leaving Egypt

---

## 😤 Murmured Against Moses And Aaron

Murmured means more than a single quiet complaint.

It describes a whole community complaining out loud.

This was not one person's frustration.

Every family in the camp joined in.

Moses and Aaron were blamed for the lack of food.

Neither of them controlled where food came from.

😤 Murmured means loud group complaint

👪 The whole camp joined in

🎯 Moses and Aaron took the blame

📖 Neither man controlled the food supply

---

## 💀 We Had Died By The Hand Of The Lord

This is a wish for a fast death instead of a slow one.

Israel would rather have God strike them down back in Egypt.

That sounds shocking, but hunger in the desert felt like a death sentence to them.

Fear can turn people toward wishing for the very thing they used to fear.

💀 They wished for a quick death

🇪🇬 Death in Egypt sounded better

😱 Hunger felt like a death sentence

📖 Fear can twist people's wishes

---

## 🍲 When We Sat By The Flesh Pots

Flesh pots means pots used for cooking meat.

Israel remembers eating meat freely back in Egypt.

They forget the beatings and the forced labor.

Memory often keeps the comfort and drops the cost.

Slavery gets repainted here as a full table and an easy life.

🍲 Flesh pots means pots of meat

🍽️ They remember only the food

⛓️ They forget the forced labor

📖 Memory can hide the real cost

---

## 😡 To Kill This Whole Assembly With Hunger

Israel accuses Moses of leading them out to starve on purpose.

That accusation is not really about food.

It is a growing distrust of Moses and of God's whole plan.

Fear had already erased the memory of the Red Sea crossing just weeks earlier.

😡 Israel accuses Moses of a plot

🍞 The real issue was trust, not food

🌊 They forgot the Red Sea already

📖 Fear can erase recent miracles

---

# Exodus 16:4-8

# 🍞 The Lord Promises Bread And A Test

---

## 🍞 I Will Rain Bread From Heaven

God promises food that will fall like rain.

This is not a one time gift.

It will arrive fresh every single morning.

Israel had just watched the sea split apart.

Now they would watch food fall from the sky, day after day.

🍞 Bread would fall like rain

🌅 It arrives fresh each morning

🌊 They just saw the sea split

📖 God provides in different ways

---

## 📏 A Certain Rate Every Day

Rate here means a fixed daily amount.

Each family could gather only enough for that one day.

Nothing about tomorrow was guaranteed in advance.

Trusting God for one day at a time was the whole point.

📏 A certain rate means a fixed amount

🗓️ Enough was given for one day

🚫 Tomorrow was never guaranteed early

📖 The test was daily trust

---

## 🧪 That I May Prove Them

Prove here means to test, not to demonstrate.

God already knows how Israel will respond.

The test exists to shape Israel, not to inform God.

Obedience is being tested before any full explanation is given.

🧪 Prove means test, not demonstrate

🎯 The test shapes Israel, not God

❓ No full explanation comes first

📖 Trust is tested before it is proven

---

## ✌️ Twice As Much As They Gather Daily

The sixth day breaks the daily only rule on purpose.

Families would gather two full days worth of food at once.

This detail quietly points ahead to a day of rest still uncommanded at this point.

God was already planning for the Sabbath before He formally announced it.

✌️ Double food came on day six

🗓️ It covered two full days

🛌 A day of rest was coming

📖 God planned ahead of the command

---

## 🌥️ Then Ye Shall See The Glory Of The Lord

Glory here means a visible sign of God's own presence.

Israel is not just getting food.

They are about to see proof that God himself sent it.

This turns a meal into a face to face moment with God.

🌥️ Glory means visible presence of God

🍞 The food came directly from Him

👀 Israel would see proof, not just eat

📖 A meal became an encounter with God

---

## 🗣️ Your Murmurings Are Not Against Us, But Against The Lord

Moses corrects a common mistake in the complaint.

Israel thinks they are only arguing with two men.

Moses and Aaron were never the ones controlling the food or the journey.

Every complaint against them was really aimed at God.

🗣️ Moses corrects who the target is

👥 Moses and Aaron did not control events

🎯 The real target was always God

📖 Leader complaints can hide a complaint against God

---

# Exodus 16:9-12

# ☁️ The Glory Appears In The Cloud

---

## 🙏 Come Near Before The Lord

Aaron tells the people to gather in one place, together.

This was not a punishment lineup.

It was an invitation to stand in front of God himself.

God was about to answer their complaint in person.

🙏 Come near means gather before God

👥 The whole camp is called together

🎁 This was an invitation, not a punishment

📖 God chose to answer them in person

---

## 👀 They Looked Toward The Wilderness

The people turn to look at open, empty desert.

There was nothing there to explain their hunger.

Then, suddenly, something did appear.

God chose an empty place to reveal himself.

👀 They looked at empty desert

🚫 Nothing was there to explain hunger

✨ Then something suddenly appeared

📖 God can fill total emptiness

---

## ☁️ The Glory Of The Lord Appeared In The Cloud

This is the same cloud that had already led Israel out of Egypt.

It was not ordinary weather.

It was a visible marker of God's own presence traveling with them.

The whole camp could see it at the same moment.

☁️ The same cloud led them from Egypt

✨ It marked God's presence, not weather

👀 The whole camp saw it together

📖 God's presence traveled with them

---

## 🍗 At Even Ye Shall Eat Flesh

Flesh here means meat, specifically the quail that arrive that evening.

God answers the exact complaint from verse three.

He does not ignore their complaint.

Their complaint began as a bitter accusation.

God answers it anyway.

🍗 Flesh means meat, the quail to come

🎯 God answers their exact complaint

😡 Their complaint began as an accusation

📖 God answers even bitter prayers

---

## 🌟 Ye Shall Know That I Am The Lord Your God

This phrase repeats often throughout Exodus.

Every miracle in this book is meant to prove something specific.

God is not a distant idea.

He is Israel's own personal God, active and present.

🌟 This phrase repeats through Exodus

🍞 The miracle proves who God is

🤝 God is personal, not distant

📖 Knowing God, not just obeying Him

---

# Exodus 16:13-15

# 🍞 Manna Appears

---

## 🐦 The Quails Came Up And Covered The Camp

Quails are small game birds that migrate in huge flocks.

They can fly low and land exhausted after a long journey.

That made a whole flock easy to gather by hand.

God used a real, natural bird migration to deliver meat.

🐦 Quails are small migrating birds

🛬 They landed low and exhausted

✋ Easy for the camp to gather

📖 God used a natural event for provision

---

## ❄️ Small As The Hoar Frost On The Ground

Hoar frost means the thin white frost that forms overnight.

Manna looked like tiny frozen beads scattered across the ground.

It was easy to miss at first glance.

Something this small would end up feeding over a million people daily.

❄️ Hoar frost means thin white frost

⚪ Manna looked like tiny frozen beads

👀 Easy to overlook at first

📖 A small thing fed a whole nation

---

## ❓ It Is Manna, For They Wist Not What It Was

Wist is an old word meaning knew.

The Hebrew phrase behind manna literally means what is it.

Israel named the food after their own confused question.

They ate something they could not even identify at first.

❓ Wist means knew

🗣️ Manna literally means what is it

🍞 They named it after their confusion

📖 They trusted food they could not explain

---

## 🍞 The Bread Which The Lord Hath Given You To Eat

Moses answers their confusion directly.

This mysterious food is not a trick or an accident.

It is a direct gift, sent by God, meant to be eaten.

Confusion did not need to stop them from receiving it.

🍞 Moses names it as God's gift

🎁 It was sent on purpose

🍽️ It was meant to be eaten

📖 Confusion does not cancel a gift

---

# Exodus 16:16-18

# 📏 An Omer For Every Man

---

## 📏 An Omer For Every Man

An omer is a small dry measure, close to two quarts.

That was set as one person's daily food ration.

Large families were allowed to gather according to how many people they had.

The system was fair without being exactly equal for every single household.

📏 An omer held about two quarts

👪 Rations matched family size

⚖️ The system was fair, not identical

📖 God provided according to real need

---

## ➕ Some More, Some Less

Not everyone gathered the exact same amount.

Some people worked faster or had more hands to help.

The amount gathered still did not matter in the end.

What mattered was what happened after it was measured.

➕ Gathering amounts varied naturally

🏃 Some families gathered faster

⚖️ The measuring still evened it out

📖 Effort was not the final factor

---

## ⚖️ He That Gathered Much Had Nothing Over

Mete means to measure something out carefully.

Families who gathered extra found they had no leftover once it was measured.

Families who gathered less found they had exactly enough.

The amount always came out even at an omer per person.

⚖️ Mete means to measure carefully

➕ Extra gathering brought no extra food

➖ Small gathering was still enough

📖 God's provision leveled every household

---

## 🍽️ According To His Eating

The measure was based on what a person actually needed to eat.

It was not based on status, effort, or how much someone wanted.

Nobody in the camp went hungry that day.

Nobody had extra to hoard or sell either.

🍽️ The measure matched real need

🚫 Status did not change the ration

🙅 No one went hungry

📖 No one had extra to hoard

---

# Exodus 16:19-21

# 🐛 Manna Left Overnight

---

## 🌙 Let No Man Leave Of It Till The Morning

Moses gives a clear, simple instruction.

Manna was meant to be gathered fresh, not stored ahead.

This tested whether Israel would trust God again the very next day.

Saving food secretly would have meant not trusting tomorrow's provision.

🌙 Manna was not to be stored

🆕 Each day required fresh trust

🔁 Tomorrow's food was not guaranteed early

📖 Obedience here was daily, not stockpiled

---

## 🐛 It Bred Worms, And Stank

Some people ignored the instruction and saved manna overnight anyway.

By morning it had rotted, filled with worms and a foul smell.

Disobedience here produced an obvious, physical consequence.

The lesson could be seen and smelled, not just heard.

🐛 Worms means the manna had rotted

👃 It also smelled foul by morning

⚠️ Disobedience had a visible result

📖 Some lessons are meant to be felt

---

## 😠 Moses Was Wroth With Them

Wroth is an old word for deep, burning anger.

Moses is not simply annoyed at wasted food.

He is frustrated that trust in God broke down so quickly.

This is the same word used later for Jacob's own anger in Genesis.

😠 Wroth means deep, burning anger

🍞 Wasted food was not the real issue

🙅 Broken trust frustrated Moses most

📖 Anger here defended obedience to God

---

## ☀️ When The Sun Waxed Hot, It Melted

Waxed hot is an old way of saying grew hot.

Manna could not survive the full heat of midday.

This forced the whole camp to gather early, every single morning.

The routine itself became a daily reminder to depend on God.

☀️ Waxed hot means grew hot

⏰ Manna melted by midday

🌅 Everyone had to gather early

📖 A daily routine of daily trust

---

# Exodus 16:22-26

# 🛌 The Sixth Day And The Sabbath

---

## 📦 On The Sixth Day They Gathered Twice As Much

This doubling happened without any new command being given that morning.

Israel simply noticed the pattern and followed it.

The rulers reported it straight to Moses.

A rhythm from verse five was already quietly shaping their habits.

📦 Double gathering needed no new order

👀 Israel noticed the pattern themselves

🗣️ The rulers reported it to Moses

📖 A rhythm was shaping their habits

---

## 🛌 The Rest Of The Holy Sabbath Unto The Lord

Sabbath means a set day of rest.

This is the very first time the word sabbath appears in the Bible.

It arrives here, before the Ten Commandments are even given at Sinai.

Rest was built into life before it became a formal law.

🛌 Sabbath means a set day of rest

🥇 God introduces rest by name here

⛰️ It comes before the Ten Commandments

📖 Rest came before it became a rule

---

## 🔥 Bake That Which Ye Will Bake, And Seethe That Ye Will Seethe

Seethe is an old word meaning to boil.

Moses tells the people to finish all their cooking one day early.

No cooking fires needed to be lit on the sabbath itself.

Even meal preparation was included in the day of rest.

🔥 Seethe means to boil

🍞 All cooking happened one day early

🚫 No fires needed on the sabbath

📖 Rest included the kitchen too

---

## 🐛 It Did Not Stink, Neither Was There Any Worm Therein

This is the same leftover manna that rotted just days earlier in verse twenty.

This time it stayed completely clean overnight.

Nothing about the manna itself had changed.

The difference was that God specifically blessed this one exception.

🐛 The same food behaved differently

🧼 It stayed clean overnight this time

✨ God specifically blessed this exception

📖 Obedience unlocked a special provision

---

## 🔍 To Day Ye Shall Not Find It In The Field

Moses tells them plainly not to bother searching that morning.

There would be no fresh manna on the ground on the sabbath.

Trusting yesterday's provision replaced the daily habit of gathering.

Rest required believing enough had already been given.

🔍 No new manna would appear that day

🚫 Searching would be pointless

🙏 Trust replaced the daily habit

📖 Rest requires believing enough was given

---

## 🗓️ Six Days Ye Shall Gather It

This sets a clear, repeating weekly pattern.

Six days of gathering, one day of rest, on repeat.

The rhythm was not a suggestion.

It was built directly into how the food itself worked.

🗓️ Six days on, one day off

🔁 The pattern repeated every week

🍞 The food itself enforced the rhythm

📖 Rest was built into daily life

---

# Exodus 16:27-30

# 🚫 Some Go Out To Gather Anyway

---

## 🚶 Some Of The People On The Seventh Day

Not everyone trusted the instructions from the day before.

A few people went out anyway, hoping to find manna on the ground.

This is the second failed test involving manna in this same chapter.

Trust broke down the same way it had with the leftovers earlier.

🚶 Some searched despite the warning

🍞 They hoped to find manna anyway

🔁 This is the second failed test here

📖 Old habits of doubt returned quickly

---

## ❓ How Long Refuse Ye To Keep My Commandments

God's question is not really asking for information.

It expresses real frustration at repeated disobedience.

This happens before the sabbath has even been formally commanded at Sinai.

Israel is already being held to a standard beyond what has been written down yet.

❓ God's question shows frustration

🔁 This is repeated disobedience

⛰️ Sinai's law has not arrived yet

📖 Some things are expected before they are written

---

## 🎁 He Giveth You On The Sixth Day The Bread Of Two Days

God restates the whole plan plainly, one more time.

Provision for the sabbath was never missing.

It had already been given a full day early.

The failure was not a lack of food.

The failure was a lack of trusting what had already been provided.

🎁 Provision came a full day early

🍞 Food was never actually missing

🙏 The real failure was trust

📖 God had already provided for rest

---

## 🏕️ Abide Ye Every Man In His Place

Abide means to stay put, not to wander off.

Israel is told to remain in the camp that day.

Rest here meant stillness, not travel or errands.

Even necessary sounding tasks like gathering food were paused completely.

🏕️ Abide means stay in place

🚷 No wandering off that day

🛌 Rest meant real stillness

📖 Even useful tasks paused for rest

---

## 😌 So The People Rested On The Seventh Day

After two failed tests, the pattern finally holds.

The whole camp stops together, at the same time.

This is the Bible's first working example of a full sabbath rest.

It sets the pattern that will later be carved into the Ten Commandments.

😌 The pattern finally succeeded

👥 The whole camp rested together

🥇 This is the first full sabbath kept

📖 It becomes the pattern for the law later

---

# Exodus 16:31-36

# 🏺 Manna Kept For Future Generations

---

## 🌿 Like Coriander Seed, White

Coriander seed is small and round, similar to a peppercorn in size.

Manna shared that small, round shape.

Its color was pale white, unlike most bread anyone in camp had seen before.

The description helps a reader actually picture what this food looked like.

🌿 Coriander seed is small and round

⚪ Manna was pale white

🍞 It looked nothing like normal bread

📖 A clear picture helps the story stick

---

## 🍯 The Taste Of It Was Like Wafers Made With Honey

A wafer here means a thin, flat piece of baked bread.

Manna tasted sweet, close to a honey glazed cracker.

God did not just meet Israel's need for calories.

He gave them something that was genuinely pleasant to eat.

🍯 Wafers means thin, flat baked bread

🍞 Manna tasted sweet like honey

❤️ God met more than the minimum

📖 Provision here included real pleasure

---

## 🏺 Fill An Omer Of It To Be Kept For Your Generations

Moses orders a permanent, physical sample of manna to be saved.

This was not for that generation's use.

It was meant for children and grandchildren who would never see the wilderness themselves.

A future generation would need proof, not just a story passed down.

🏺 One omer would be kept forever

👶 It was meant for later generations

🤲 They needed proof, not just a story

📖 Evidence outlasts memory

---

## 🍯 Take A Pot, And Put An Omer Full Of Manna Therein

Aaron is given a specific physical task, not just a spoken order.

A pot preserved the sample so it could be inspected later.

This turns a miracle into an object people could keep, not just remember.

Physical reminders in scripture often outlast spoken warnings.

🍯 Aaron receives a physical task

🏺 The pot preserved a real sample

👀 It could be inspected later

📖 Objects can outlast spoken memory

---

## 📜 Laid It Up Before The Testimony

The Testimony refers to the Ark of the Covenant.

Inside it were the stone tablets carrying God's law.

This pot of manna would later sit right beside that ark.

Food and law were kept together as two connected reminders of God's care.

📜 Testimony refers to the Ark

🪨 It held the stone tablets

🏺 Manna sat right beside it

📖 Provision and law were kept together

---

## 📆 Did Eat Manna Forty Years

This single sentence quietly spans the entire wilderness wandering.

Manna did not stop after a few weeks.

It continued daily until Israel finally reached Canaan.

Forty years of provision started with one difficult, doubting morning in this chapter.

📆 Manna lasted forty full years

🔁 It never stopped along the way

🗺️ It ended once Canaan was reached

📖 One hard morning began forty years of care

---

## ⚖️ An Omer Is The Tenth Part Of An Ephah

An ephah was a larger, standard dry measure used across the ancient Near East.

An omer equaled exactly one tenth of that larger measure.

This closing detail gives modern readers a real way to picture the amount.

Precise measurements throughout this chapter show a real, physical provision, not a vague legend.

⚖️ An ephah was the larger measure

🔟 An omer equaled one tenth of it

📏 The detail helps readers picture the amount

📖 Precise numbers show a real event
`.trim();

export const EXODUS_SIXTEEN_PERSONAL_SECTIONS = parseExodusSixteenRawNotes(EXODUS_SIXTEEN_RAW_NOTES);
