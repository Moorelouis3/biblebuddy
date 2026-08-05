export type NumbersThirtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersThirtyThreeRawNotes(rawText: string): NumbersThirtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersThirtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+33:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 33 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+33:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+33:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 33 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 33,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 33:${startVerse}` : `Numbers 33:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Numbers 33 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_THIRTY_THREE_RAW_NOTES = `# Numbers 33:1-2
# 📜 Why This Record Exists
---
## 📜 These Are The Journeys Of The Children Of Israel

"Journeys" here means every single stop, not just the final destination.

This chapter names each campsite from Egypt all the way to Moab.

Most of these places never appear anywhere else in the Bible.

God still wanted every one of them written down.

Nothing about this walk went unnoticed, not even the forgettable parts.

📜 Journeys means every campsite, not the destination
🗺️ Most stops appear only here in scripture
✍️ God wanted every step recorded
📖 Nothing about the walk went unnoticed

## 🖋️ Moses Wrote Their Goings Out According To Their Journeys By The Commandment Of The LORD

This was not Moses keeping a private travel diary.

God specifically commanded this list to be written.

A record ordered by God carries more weight than a memory.

Memories fade and get reshaped over time.

A written command does not.

🖋️ Moses wrote this under direct order
👑 God commanded the record himself
🧠 Memory fades, but writing does not
📖 This list carries God's own weight

# Numbers 33:3-4
# 🕊️ Leaving Egypt Behind
---
## 🏛️ They Departed From Rameses In The First Month, On The Fifteenth Day Of The First Month

"Rameses" was a store city the Israelites had built for Pharaoh as slaves.

Leaving from that very city marked the start of their freedom.

The fifteenth day of the first month was the day after Passover night.

Timing mattered as much as the place itself.

Their first step away from slavery began on the very next morning.

🏛️ Rameses was built by slave labor
🕊️ Leaving it marked the start of freedom
🌙 They left the morning after Passover
📖 Timing and place both carried meaning

## ✋ Went Out With An High Hand In The Sight Of All The Egyptians

"An high hand" means openly and boldly, not sneaking away in secret.

Israel did not slip out of Egypt under cover of darkness.

Every Egyptian in the region watched them leave in plain sight.

A defeated nation usually flees quietly.

Israel left looking like the winning side.

✋ High hand means bold and open
👀 All of Egypt watched them go
🚶 They did not sneak away
📖 They left looking like the winning side

## ⚡ Upon Their Gods Also The LORD Executed Judgments

The plagues were never only about freeing slaves.

Egypt worshiped false gods tied to the Nile, the sun, and sacred animals.

Each plague struck directly at one of those false gods.

The death of the firstborn included Pharaoh's own household.

God was proving those gods were powerless, not just punishing people.

🐂 Egypt worshiped gods tied to nature
⚡ Each plague targeted a specific false god
👑 Even Pharaoh's own household was not spared
📖 God proved those gods were powerless

# Numbers 33:5-10
# 🌊 From The Sea To Elim
---
## 🏕️ Removed From Rameses, And Pitched In Succoth

"Succoth" means booths or temporary shelters.

It was the very first camp Israel made as a free people.

A temporary shelter fit a people who did not yet know where home would be.

Their whole first generation would live this same way, camp by camp.

🏕️ Succoth means temporary shelters or booths
🚶 It was Israel's first camp as free people
❓ They did not yet know where home was
📖 A whole generation would live camp by camp

## 🚧 Pitched In Etham, Which Is In The Edge Of The Wilderness

Etham sat right at the edge where Egypt's farmland ended.

True desert began on the other side of that line.

Crossing it meant there was no easy turning back.

The wilderness offered no crops or cities, only what God provided.

🚧 Etham marked the edge of the desert
🔙 There was no easy way back
🙏 The only way forward was trust
📖 The wilderness offered only what God gave

## 🌊 Passed Through The Midst Of The Sea Into The Wilderness

This single line compresses one of the most famous miracles in the Bible.

Pihahiroth was their last camp on the Egyptian side of the water.

Exodus fourteen already told the full story of the sea splitting apart.

Pharaoh's army was chasing them from behind at this exact moment.

The itinerary records it as calmly as any other campsite change.

Calm wording does not shrink the size of a miracle.

🏜️ Pihahiroth was their last Egyptian camp
🌊 This line is the sea crossing from Exodus
⚔️ Pharaoh's army was chasing them here
📖 Calm wording does not shrink a miracle

## 💧 In Elim Were Twelve Fountains Of Water, And Threescore And Ten Palm Trees

"Threescore and ten" simply means seventy.

Twelve fountains gave every family fresh water.

Seventy palm trees gave shade across the whole camp.

Twelve also matched the exact number of Israel's tribes.

Elim came right after the bitter water of Marah in the verse before.

Relief followed hardship almost immediately.

🌴 Threescore and ten means seventy
💧 Twelve fountains matched Israel's twelve tribes
😌 Elim followed right after bitter Marah
📖 Relief came quickly after hardship

## 📍 Encamped By The Red Sea

Israel camped a second time near the very sea God had just parted for them.

This was not the crossing point itself.

It was a different spot further along the shore.

Camping beside it again let the memory of that day settle in.

Some lessons need distance and stillness to really sink in.

🌊 This was a second camp near the sea
📍 It was a different spot along the shore
🧘 Distance let the memory settle in
📖 Some lessons need stillness to sink in

# Numbers 33:11-15
# 🪨 From Sin To Sinai
---
## 🍞 Encamped In The Wilderness Of Sin

The wilderness of Sin is where the manna first appeared.

Exodus sixteen already told that whole story in detail.

Israel had run out of the food they carried out of Egypt by this point.

God's provision started here, one day at a time, long before Sinai.

🍞 Manna first appeared in this wilderness
📜 Exodus sixteen tells the full story
🥖 Their carried food had run out
📖 Daily provision started before Sinai

## 🚏 Encamped In Dophkah

Dophkah and Alush get named, but no story is attached to either one.

The Bible does not record a single event at either camp.

That silence does not mean nothing happened there.

It means not every day needed its own story.

Some places are only remembered because someone wrote the name down.

🚏 Dophkah and Alush have no story
🤫 Scripture stays silent about what happened
📝 Not every day needed its own story
📖 Some places are remembered just by name

## 💧 Encamped At Rephidim, Where Was No Water For The People To Drink

Rephidim is where two very different events happened back to back.

Moses struck a rock there and water poured out for the whole camp.

The nation of Amalek attacked Israel at this same location.

Exodus seventeen tells both stories in full.

One camp held both a miracle and a battle.

💧 Water came from a rock here
⚔️ Amalek attacked Israel at this camp
📜 Exodus seventeen tells both stories
📖 One place held a miracle and a battle

## 🏔️ Pitched In The Wilderness Of Sinai

Every camp before this one was just travel.

Sinai is where Israel stopped being a fleeing crowd.

It became a nation with a law instead.

The Ten Commandments and the whole covenant were given at this exact stop.

Nearly all of Exodus, all of Leviticus, and the first part of Numbers happen at this one campsite.

The itinerary names it in one plain line.

🏔️ Sinai is where the law was given
📚 Exodus through early Numbers happens right here
⛺ Israel stayed here far longer than other stops
➡️ A whole nation formed at this one camp

# Numbers 33:16-17
# 🪦 Two Camps With A Past
---
## 🪦 Pitched At Kibrothhattaavah

"Kibrothhattaavah" means the graves of craving.

The people had complained about missing Egypt's meat instead of trusting God's manna.

God sent quail, then struck the camp with a plague.

They were still eating the meat when judgment fell.

Numbers eleven already told this whole story.

The camp kept the name of what happened there long after everyone moved on.

🪦 Kibrothhattaavah means graves of craving
🍗 The people craved meat over manna
⚡ Judgment fell before they finished eating
📖 The name outlasted the event itself

## 👩 Encamped At Hazeroth

Hazeroth is where Miriam and Aaron challenged Moses's unique authority.

Miriam was struck with leprosy for seven days as a result.

Numbers twelve already told that whole story.

Even Moses's own family was not exempt from consequences.

👩 Miriam challenged Moses here
🦠 She was struck with leprosy for seven days
📜 Numbers twelve tells this story
📖 Even family was not exempt from consequence

# Numbers 33:18-36
# 🕳️ Nineteen Camps Of Silence
---
## 🕳️ Removed From Rimmonparez, And Pitched In Libnah

Nearly twenty camp names follow this one.

Almost none of them appear anywhere else in the Bible.

This stretch covers the years Israel spent wandering after Kadesh.

Numbers fourteen already handed down that forty year sentence.

Most of those years produced no story worth telling.

Only a name proves the camp ever existed.

🕳️ Almost twenty camps appear nowhere else
⏳ This covers the wasted years after Kadesh
📜 Numbers fourteen already told that sentence
📖 Silence does not mean the years were empty

## 🌄 Pitched In Mount Shapher

"Shapher" means beautiful or fair.

This whole stretch of names is long and forgettable.

Yet one camp still got a name that meant something lovely.

Scripture does not explain why.

It simply kept the name exactly as it was.

A small detail like this survives even in the driest chapter of the book.

🏔️ Shapher means beautiful or fair
🌄 Even a forgettable stretch had one lovely name
❓ Scripture does not explain why
📖 Small details survive even in dry chapters

## ⚓ Encamped At Eziongaber

Eziongaber looks like just one more name in a long list here.

Centuries later, King Solomon built a fleet of ships at this very port.

First Kings nine tells that later story.

A forgotten wilderness campsite became a working harbor for a future king.

⚓ Eziongaber later became a real port
👑 Solomon built ships there
📜 First Kings nine tells that story
📖 A campsite became a future king's harbor

## 🔁 Encamped In The Wilderness Of Zin, Which Is Kadesh

This is the very same Kadesh where the twelve spies were sent into Canaan.

Numbers thirteen told that story near the start of the wandering.

Israel is now standing on the same ground almost forty years later.

The map brought them full circle, even though the people themselves had not.

🔁 This is the same Kadesh from Numbers thirteen
🕵️ The spies were sent out from here
⏳ Nearly forty years passed since that day
📖 The map came full circle

# Numbers 33:37-39
# ⚱️ Aaron's Death At Mount Hor
---
## ⚱️ Aaron The Priest Went Up Into Mount Hor At The Commandment Of The LORD, And Died There

Aaron did not die from illness or an accident.

God directly commanded the timing and place of his death.

Numbers twenty already told this same event in full.

Even the nation's high priest was not above God's word.

⚱️ Aaron's death was commanded, not accidental
👑 Even the high priest obeyed God's word
📜 Numbers twenty tells the same event
📖 No one stands above God's command

## 📅 In The Fortieth Year After The Children Of Israel Were Come Out Of The Land Of Egypt

This single date closes out the whole forty year sentence from Kadeshbarnea.

Aaron was part of the generation that had refused to trust God at that border.

He died in the very year the punishment finally ran its course.

The date is not a small detail.

It marks a real ending.

📅 This date marks the sentence ending
⚖️ Aaron belonged to the punished generation
⏳ The forty years finally ran out
📖 A date can mark a real ending

## 🕰️ Aaron Was An Hundred And Twenty And Three Years Old When He Died

Moses was three years older than Aaron.

Both brothers would die without ever setting foot in Canaan.

Long life did not exempt either of them from that consequence.

The itinerary records the number plainly, without excuse or explanation.

🕰️ Aaron lived to one hundred twenty three
👴 Long life did not undo the consequence
🚫 Neither brother entered Canaan
📖 The number is stated plainly, no excuse

# Numbers 33:40
# ⚔️ A King Hears They Are Coming
---
## 👑 King Arad The Canaanite, Which Dwelt In The South In The Land Of Canaan, Heard Of The Coming Of The Children Of Israel

This one line interrupts a chapter that is otherwise just a travel list.

King Arad's attack and Israel's counter vow are told in full back in Numbers twenty one.

That earlier chapter even explains how the place got renamed Hormah.

The itinerary drops in this single reminder without retelling any of it.

A single verse can carry an entire story already told elsewhere.

👑 King Arad attacked Israel earlier in Numbers
🏷️ The place was later renamed Hormah
📜 The full story sits in Numbers twenty one
📖 One verse can carry an entire earlier story

# Numbers 33:41-49
# 🏕️ The Final Camps Before Moab
---
## 🐍 Pitched In Punon

Punon sat in the same stretch of land where the fiery serpents attacked Israel.

Numbers twenty one told that story of the bronze serpent lifted up for healing.

The itinerary passes through this ground almost silently here.

The same land that once brought judgment is now just one more stop on the way home.

🐍 Punon sits near the fiery serpent story
📜 Numbers twenty one tells that account
🩹 A bronze serpent brought healing there
📖 Judgment ground became just another stop

## 🏔️ Pitched In The Mountains Of Abarim, Before Nebo

Nebo is the mountain where Moses himself will die.

That death has not happened yet at this point in the story.

Deuteronomy thirty four tells that future moment in full.

This quiet mention of Nebo is a shadow of what is still to come.

🏔️ Nebo is where Moses will later die
📜 Deuteronomy thirty four tells that story
👤 That death has not happened yet here
📖 This mention shadows what is still coming

## 🏁 Pitched In The Plains Of Moab By Jordan Near Jericho

This is the very last campsite named in the whole list.

Every remaining chapter of Numbers happens from this one location.

Israel will still be camped here when the book of Joshua begins.

The wandering officially ends the moment they reach this spot.

📍 This is the final camp in the list
📚 The rest of Numbers happens right here
🚪 Joshua later opens from this same camp
📖 The wandering ends at this exact spot

## 🏕️ From Bethjesimoth Even Unto Abelshittim In The Plains Of Moab

"Abelshittim" is usually just called Shittim elsewhere in the Bible.

This is the same camp where Israel later fell into sin with Moab's gods.

Numbers twenty five already told that whole account.

Naming the full span of the camp shows just how large this final stop really was.

🏕️ Abelshittim is also called Shittim
⚠️ Israel's sin with Moab happened here
📜 Numbers twenty five tells that story
📖 The camp was large enough for two names

# Numbers 33:50-56
# 🗺️ Instructions For The Land Ahead
---
## 🔮 When Ye Are Passed Over Jordan Into The Land Of Canaan

Every command in the rest of this chapter is written as a future instruction.

Israel has not yet crossed the Jordan at this point in the story.

God is planning for a conquest that has not happened yet.

Instructions given in advance still count as real commands, not just suggestions for later.

🔮 These commands are written for the future
🌊 Israel has not crossed the Jordan yet
📋 God is planning ahead of the conquest
📖 Advance commands still count as real commands

## 🚪 Then Ye Shall Drive Out All The Inhabitants Of The Land From Before You

This command is not a suggestion or a preference.

Every existing group living in Canaan was to be removed entirely.

God had judged these nations for their idolatry and practices long before Israel arrived.

Israel's conquest was carrying out judgment, not just claiming property.

🚪 Every group in Canaan had to leave
⚖️ God had already judged these nations
🏹 This was judgment, not just conquest
📖 Israel carried out God's judgment here

## 🗿 Destroy All Their Pictures, And Destroy All Their Molten Images

This verse names two different kinds of carved idols, not one repeated command.

"Pictures" means carved stone images of false gods.

"Molten images" means idols cast from melted metal.

Both had to be destroyed completely, not stored away or reused.

🗿 Pictures means carved stone idols
🔨 Molten images means cast metal idols
🚫 Both had to be destroyed completely
📖 Nothing false could be kept or reused

## ⛰️ Pluck Down All Their High Places

"High places" means raised platforms or hilltop shrines built for worship.

Canaan's false worship almost always happened somewhere elevated.

Leaving even one high place standing would leave a door open to Canaan's religion.

Destroying it meant tearing the whole site down, not just closing it.

⛰️ High places means raised worship platforms
🏔️ False worship there happened on high ground
🚪 One left standing kept a door open
📖 Tearing it down meant no way back

## 🏞️ Ye Shall Dispossess The Inhabitants Of The Land, And Dwell Therein

"Dispossess" means to remove someone completely from land they once controlled.

This was not a temporary occupation or a shared living arrangement.

God ties the right to dwell there directly to His own gift of the land.

The land was never Israel's by conquest alone, it was theirs by promise first.

🏞️ Dispossess means removing them completely
🚫 This was not shared or temporary
🎁 The right to dwell came from God's gift
📖 The land was promised before it was conquered

## 🎯 Divide The Land By Lot For An Inheritance

"Lot" means a method of decision that removed personal or tribal favoritism.

Casting lots may have involved marked stones drawn at random before God.

Bigger tribes received a bigger share, smaller tribes received less.

No leader got to hand pick the best land for his own family.

🎯 Lot means a decision method without favoritism
🪨 Marked stones may have been drawn at random
⚖️ Bigger tribes received a bigger share
📖 No leader hand picked the best land

## 😖 Pricks In Your Eyes, And Thorns In Your Sides

These are not literal pricks and thorns growing in the land.

The image describes constant, nagging pain that never really goes away.

Leaving any Canaanite population in place would become exactly that kind of pain.

Small compromises left in place have a way of growing into constant trouble.

😖 This describes constant, nagging pain
⚠️ Left in place, the danger would remain
🔥 Small compromises grow into real trouble
📖 Incomplete obedience still left room for harm

## ⚖️ As I Thought To Do Unto Them

God is not only warning Israel about Canaan's fate.

He is warning that Israel could receive the exact same fate.

Obedience was never just about winning the land.

It was about staying different from the nations being removed from it.

⚖️ God warns Israel could share Canaan's fate
🔄 The same fate could reach either side
🕊️ Obedience meant staying different, not just winning
📖 The land was never the whole point
`.trim();

export const NUMBERS_THIRTY_THREE_PERSONAL_SECTIONS = parseNumbersThirtyThreeRawNotes(NUMBERS_THIRTY_THREE_RAW_NOTES);
