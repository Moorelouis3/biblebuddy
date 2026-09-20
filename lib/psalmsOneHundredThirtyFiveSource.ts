export type PsalmsOneHundredThirtyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredThirtyFiveRawNotes(rawText: string): PsalmsOneHundredThirtyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredThirtyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+135:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 135 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+135:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+135:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 135 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 135,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 135:${startVerse}` : `Psalms 135:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Psalms 135 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_THIRTY_FIVE_RAW_NOTES = `# Psalms 135:1-3
# 📣 A Call To Praise In The Temple
---
## 🎺 Praise Ye The LORD

"Praise ye the LORD" translates a single Hebrew word, Hallelujah.

Hallelujah means praise the LORD as one command, not two separate words.

Many psalms open with this exact word.

Psalm 135 also closes on that very same word.

The whole song is framed by one command.

🎺 Hallelujah means praise the LORD

📣 One word, not two separate ideas

🔁 Psalm 135 opens and closes with it

📖 The whole song is framed by praise

## 📛 Praise Ye The Name Of The LORD

In the Bible, a name means far more than a label to call someone by.

The name of the LORD points to his full character and reputation.

To praise the name means praising everything God has revealed about himself.

That sets worship of the true God apart from worship of a nameless idol.

This very psalm later describes those idols without ever giving them a name.

📛 A name means more than a label

🙏 Praising the name means praising who God is

🆚 This sets God apart from nameless idols

📖 Worship centers on who God actually is

## 👥 O Ye Servants Of The LORD

The phrase "servants of the LORD" names a specific group here, not every believer in general.

Psalm 134, the psalm written just before this one, already introduced that same group.

Those servants were priests and Levites who kept watch at the temple day and night.

This song now calls on that very group to lead the praise.

The two psalms sit side by side on purpose.

👥 Servants names a specific temple group

🔗 Psalm 134 already introduced them

🌙 They were priests and Levites on duty

📖 This song calls on that same group

## 🏛️ Ye That Stand In The House Of The LORD, In The Courts

"The house of the LORD" names the main temple building itself.

"The courts" names the open, walled area surrounding that building.

Ordinary worshippers could enter the courts but not the temple building itself.

Only the priests and Levites named a moment ago could stand this close.

Standing here pictures nearness to God, not just a location.

🏛️ House names the temple building

🧱 Courts names the walled area around it

🚷 Ordinary worshippers stayed in the courts

📖 Standing near God pictures nearness itself

## ✅ For The LORD Is Good

Good here is not a mild compliment.

It names God's most basic quality.

Nothing in God works against that goodness.

Every act of power described later in this psalm flows from it.

✅ Good names God's basic character

🚫 Nothing in God works against it

🌊 His power always flows from goodness

📖 Goodness comes before every act of power

## 😊 Sing Praises Unto His Name, For It Is Pleasant

"Pleasant" means this kind of singing is enjoyable, not just required.

Many ancient religions treated ritual as a tense duty meant to avoid a god's anger.

This verse says the opposite about worshipping the LORD.

Praising him is described here as something genuinely good to do.

Worship in this psalm looks closer to delight than obligation.

😊 Pleasant means genuinely enjoyable

😨 Other ancient worship often ran on fear

🎶 This verse frames praise differently

📖 Worship here is delight, not dread

# Psalms 135:4-7
# 🌩️ The LORD Above All Gods
---
## 👤 The LORD Hath Chosen Jacob Unto Himself

Jacob is the man later renamed Israel, the ancestor of the whole nation.

God did not choose Jacob because Jacob earned it first.

Genesis records Jacob as a flawed man who deceived his own father and brother.

God's choice here rests on his own decision, not on Jacob's record.

That same undeserved choice now includes everyone descended from him.

👤 Jacob became Israel, the nation's ancestor

🤥 Genesis shows Jacob as far from perfect

🎯 God's choice rested on his own will

📖 Undeserved choice still defines this whole nation

## 💎 Israel For His Peculiar Treasure

"Peculiar" does not mean odd or strange in this verse.

It comes from an old word meaning a treasure set aside as someone's very own.

Kings in the ancient world kept a private treasury separate from the general funds.

Israel is described here as belonging to God in that same personal way.

This is not ownership like property, it is the closeness of something treasured.

💎 Peculiar means specially set apart

👑 Like a king's private treasury

🇮🇱 Israel belongs to God this way

📖 Being chosen means being treasured

## 🥇 The LORD Is Great, And Above All Gods

This verse does not claim other gods are real but simply weaker.

Ancient nations worshipped so called gods carved from wood, stone, or metal.

This same psalm later calls those objects lifeless and powerless.

Calling the LORD great above them means there is no real contest at all.

The comparison only exists to show how absurd the alternative really is.

🥇 This is not calling other gods real

🪵 Other gods were carved from wood or stone

📉 This psalm calls them powerless later

📖 There is no real contest at all

## 🗺️ Whatsoever The LORD Pleased, That Did He

This verse lists four separate realms one after another.

Heaven above, earth below, the seas, and the deep places under the sea.

Ancient people often pictured different gods ruling different parts of the world.

This verse credits one single God with control over every one of those realms.

Nothing on earth or under it sits outside his reach.

🗺️ Four realms are named in a row

🌍 Heaven, earth, seas, and the deep

🚫 No divided rule among different gods

📖 One God holds every realm at once

## 💨 He Causeth The Vapours To Ascend

"Vapours" refers to mist or clouds rising up from the ground and sea.

Ancient people watched this process without any scientific explanation for it.

This verse credits that entire unseen cycle to God's direct action.

What looks automatic to a modern reader was seen here as God at work.

💨 Vapours means rising mist or clouds

👀 Ancient readers had no science to explain it

🌦️ God gets credit for the whole cycle

📖 What seems automatic is still his work

## ⚡ He Maketh Lightnings For The Rain

Ancient people often noticed lightning and heavy rain arriving together.

This verse pairs them on purpose as if lightning brings the rain with it.

That is poetry describing an observed pattern, not a scientific formula.

Either way, the point stands that God controls the whole storm.

⚡ Lightning and rain are paired here

👁️ This reflects an observed pattern

🎨 The language is poetry, not science

📖 God is still behind the whole storm

## 🏦 He Bringeth The Wind Out Of His Treasuries

"Treasuries" here pictures a storehouse where valuable things are kept.

This verse imagines God keeping the wind in storerooms like that.

Wind cannot actually be seen or held in human hands.

Picturing it as something stored makes one point plain.

God controls even the forces no one can see.

🏦 Treasuries pictures a storehouse

💨 Wind is imagined as kept there

👁️ Wind cannot be seen or held

📖 God controls even unseen forces

# Psalms 135:8-9
# 🩸 Judgment On Egypt Remembered
---
## 🌙 Who Smote The Firstborn Of Egypt

This line recalls the tenth and final plague from the book of Exodus.

Every firstborn son in Egypt died in a single night.

That plague finally broke Pharaoh's refusal to let Israel go.

This psalm brings up that old story generations later as a reason for present praise.

🌙 This recalls the tenth plague

💔 Every firstborn son died that night

🔓 It finally freed Israel from Egypt

📖 Old history still fuels present praise

## 🐄 Both Of Man And Beast

The plague did not stop with human households.

Firstborn livestock died as well, according to the book of Exodus.

Egypt's economy depended heavily on its animals for food, labor, and wealth.

Naming both man and beast together shows how complete the judgment really was.

🐄 Livestock died along with people

💰 Egypt's economy depended on animals

📉 The judgment reached every corner of Egypt

📖 Nothing was left untouched by it

## 🔟 Tokens And Wonders

"Tokens and wonders" is another way of naming the ten plagues.

A token here means a visible sign meant to prove a point.

Each plague proved that the LORD, not Pharaoh, actually ruled Egypt.

These were not random disasters, they were pointed messages.

🔟 Tokens and wonders means the ten plagues

👉 A token is a sign that proves something

👑 Each plague proved who really ruled

📖 These were messages, not random disasters

## 🧑‍⚖️ Upon Pharaoh, And Upon All His Servants

Pharaoh was not the only target named here.

"His servants" points to the officials and advisors surrounding the throne.

Exodus shows some of those officials warning Pharaoh to let Israel go.

The judgment still reached the whole ruling circle around him, not Pharaoh alone.

👑 Pharaoh was not the only target

🧑‍⚖️ Servants means the officials around him

⚠️ Some of them warned Pharaoh already

📖 Judgment reached the whole ruling circle

# Psalms 135:10-12
# ⚔️ Conquest Of The Land
---
## 👑 Who Smote Great Nations, And Slew Mighty Kings

This verse moves the story forward from Egypt to the promised land.

"Great nations" and "mighty kings" describe the peoples Israel faced entering Canaan.

These were not weak or disorganized enemies.

The next two verses name specific examples of exactly who they were.

🚩 The story shifts from Egypt to Canaan

👑 Great nations means real, organized enemies

💪 These enemies were not weak

📖 The next verses name them directly

## 🗺️ Sihon King Of The Amorites

Sihon ruled an Amorite kingdom east of the Jordan River.

The book of Numbers records Israel asking to pass peacefully through his land.

Sihon refused and attacked Israel instead, and lost the resulting battle.

His defeat became one of Israel's first proofs that God would give them this land.

🗺️ Sihon ruled land east of the Jordan

🚫 He refused Israel safe passage

⚔️ His attack led to his own defeat

📖 His loss proved God's promise was real

## 🗿 Og King Of Bashan

Og ruled the region of Bashan, further north than Sihon's kingdom.

Deuteronomy describes Og as the last of a race of unusually large people.

His iron bed is even mentioned there as proof of his great size.

Israel defeated this seemingly unbeatable king just as completely as Sihon.

🗿 Og ruled the region of Bashan

📏 Deuteronomy describes him as unusually large

🛏️ His iron bed proved his size

📖 Even he could not stand against God

## 🏰 All The Kingdoms Of Canaan

This phrase widens the view beyond just Sihon and Og.

Canaan held many smaller kingdoms, each with its own king and city.

The book of Joshua records campaign after campaign against these kingdoms.

This verse sums up years of conquest in a single line.

🏰 Canaan held many separate kingdoms

📜 Joshua records the full campaign

🗓️ Years of conquest fit in one line

➡️ Small kingdoms fell one after another

## 🎁 Gave Their Land For An Heritage

"Heritage" means a possession handed down as an inheritance, not something earned by strength.

The word appears twice in this single verse for emphasis.

Israel did not defeat every enemy through greater skill alone.

The land came as a gift attached to a promise made long before any of these battles.

🎁 Heritage means an inherited gift

🔁 The word repeats for emphasis

💪 Skill alone did not win this land

📖 A promise, not just a battle, secured it

# Psalms 135:13-14
# 🕰️ God's Name And Mercy
---
## 🕰️ Thy Name, O LORD, Endureth For Ever

This verse picks up the same word "name" already introduced back in verse one.

Here the focus lands on how long that name lasts.

Human reputations rise for a while and eventually fade.

God's reputation is described here as permanent, never fading with time.

🕰️ Name here means lasting reputation

📉 Human reputations eventually fade

♾️ God's reputation never fades

📖 What God is stays the same over time

## 📜 Thy Memorial, O LORD, Throughout All Generations

"Memorial" means the way someone is remembered and named going forward.

Moses once asked God directly what his name was.

God's answer in the book of Exodus was called a memorial for every generation.

This verse points straight back to that earlier moment.

God's name was never meant for one generation only.

📜 Memorial means how someone is remembered

❓ Moses once asked God's name directly

🔙 Exodus already called it a memorial

📖 That name was never for one generation only

## ⚖️ The LORD Will Judge His People

"Judge" does not only mean punishment in this verse.

In the Old Testament, a judge often meant someone who steps in to defend and rescue.

This exact line also appears in the song of Moses in Deuteronomy.

There it describes God defending his people once their enemies grow proud.

⚖️ Judge can mean defend, not only punish

🛡️ Old Testament judges often rescued people

🔗 This line echoes Deuteronomy's song of Moses

📖 God steps in to defend, not just punish

## 🔄 He Will Repent Himself Concerning His Servants

"Repent" here does not mean God turning away from sin like a person would.

It describes God relenting, choosing compassion over continued judgment.

The Old Testament uses this kind of human language to describe God's heart toward his people.

This is comfort language, describing mercy that arrives right when it is needed.

🔄 Repent here means relenting, not confessing sin

❤️ It describes compassion over judgment

🗣️ Human language pictures God's own heart

📖 Mercy arrives right when it is needed

# Psalms 135:15-18
# 🗿 The Powerless Idols
---
## 🌍 The Idols Of The Heathen

"Heathen" in this verse simply means the nations surrounding Israel.

It does not carry the harsh tone the word can carry in modern speech.

Those nations worshipped many different gods, each represented by a carved object.

This section now turns to describe exactly what those objects were.

🌍 Heathen means the surrounding nations

🗣️ The word is descriptive, not a modern insult

🗿 Their gods were carved objects

📖 The next lines describe those objects

## 💰 Silver And Gold, The Work Of Men's Hands

These idols were made from valuable, expensive materials.

The materials made them impressive to look at.

But every single one still began as raw metal shaped by a human craftsman.

Something a person builds cannot be greater than the person who built it.

💰 Silver and gold made them look impressive

🔨 A human craftsman still shaped every one

⬇️ A maker is greater than what he makes

📖 These are objects, not gods

## 👄 They Have Mouths, But They Speak Not

This section lists four human senses one after another.

Every idol was carved to include a mouth, but it cannot speak.

It also has eyes, but they cannot see.

It has ears, but they cannot hear.

It has no breath at all inside it.

Something built to look alive still lacks life's real senses.

👄 A mouth is there, but it cannot speak

👁️ Eyes are there, but they cannot see

👂 Ears are there, but they cannot hear

📖 A carved shape still has no real life

## 🪞 They That Make Them Are Like Unto Them

This verse turns from describing the idols to describing the people who made them.

Whoever carves a lifeless object can become spiritually just as lifeless.

The same warning applies to whoever puts their trust in one.

Worship shapes the worshipper into the likeness of whatever they worship.

That is exactly why this psalm keeps pointing back to the living God instead.

🪞 Makers become like what they make

🙏 Worshippers share that same danger

🔄 Worship shapes the worshipper

📖 This points back to the living God

# Psalms 135:19-21
# 🙌 A Closing Call To Bless
---
## 🇮🇱 Bless The LORD, O House Of Israel

"House of Israel" calls on the whole nation to bless the LORD.

This is the widest possible group named in this psalm.

Every descendant of Jacob, mentioned back in verse four, is included here.

The call to praise now moves from a specific list toward everyone at once.

🇮🇱 Israel means the whole nation

👪 Every descendant of Jacob is included

📈 The call widens toward everyone

📖 Praise now reaches the whole nation

## 🕎 Bless The LORD, O House Of Aaron

"House of Aaron" narrows the call to one specific family within that nation.

Aaron was Moses' brother and the first high priest.

His descendants carried on the priesthood for generations after him.

Naming this one family separately shows their special role in temple worship.

🕎 Aaron's house means the priestly family

👤 Aaron was Moses' brother, the first priest

🔁 His descendants carried the priesthood onward

📖 Their role in worship was distinct

## 👥 O House Of Levi

Levi was one of Jacob's twelve sons and the ancestor of an entire tribe.

That tribe was set apart to assist the priests instead of receiving its own share of land.

Psalm 134 already described this same group standing watch at the temple by night.

This verse now calls that group by name to join the praise.

👥 Levi fathered a whole assisting tribe

🏛️ Levites served instead of owning land

🌙 Psalm 134 already named this group

📖 Now they are called by name

## 🌐 Ye That Fear The LORD, Bless The LORD

This phrase reaches past bloodline entirely.

Israel, Aaron, and Levi were all defined by ancestry and birth.

"Ye that fear the LORD" includes anyone who reveres him, regardless of family line.

The circle of praise widens with each phrase in this verse.

🌐 This phrase reaches past bloodline

👪 Israel, Aaron, Levi were all birth groups

🙌 Fearing the LORD is open to anyone

📖 The circle of praise keeps widening

## 🏔️ Blessed Be The LORD Out Of Zion, Which Dwelleth At Jerusalem, Praise Ye The LORD

"Zion" names the hill in Jerusalem where the temple stood.

This verse pictures blessing flowing outward from that exact location.

The very last words repeat the very first words of this psalm, Hallelujah.

The whole song about God's greatness and Egypt's judgment sits inside that one frame.

A psalm that opened with praise closes the only way it could, in praise.

🏔️ Zion names Jerusalem's temple hill

📍 Blessing flows outward from that place

🔁 The last words repeat the first words

📖 A psalm about praise ends in praise
`.trim();

export const PSALMS_ONE_HUNDRED_THIRTY_FIVE_PERSONAL_SECTIONS = parsePsalmsOneHundredThirtyFiveRawNotes(
  PSALMS_ONE_HUNDRED_THIRTY_FIVE_RAW_NOTES
);
