export type JoshuaTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaTwelveRawNotes(rawText: string): JoshuaTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 12:${startVerse}` : `Joshua 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Joshua 12 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_TWELVE_RAW_NOTES = `# Joshua 12:1-6
# 🏔️ The Kings Defeated East Of The Jordan
---
## 📋 Now These Are The Kings Of The Land

This chapter is not a new story.

It counts up every king Israel already defeated in the chapters before it.

Moses defeated kings on one side of the Jordan.

Joshua defeated kings on the other side.

This list ties both halves of the conquest together.

📋 This is a summary, not new action
🗺️ Moses fought kings east of Jordan
⚔️ Joshua fought kings on the west
📖 One list ties both halves together

## 🏞️ From The River Arnon Unto Mount Hermon

The Arnon was a deep river gorge, almost like a natural wall.

It marked the southern edge of the land Israel took from Sihon.

Mount Hermon sat far to the north, capped in snow most of the year.

Naming both ends shows this was a large stretch of conquered land.

🏞️ Arnon was a deep river gorge
🧭 It marked the southern border
🏔️ Hermon marked the snowy north
📖 Together they span a huge stretch of land

## 👑 Sihon King Of The Amorites

Sihon ruled from Heshbon, a city east of the Jordan River.

Numbers chapter twenty one records Israel asking to pass peacefully through his land.

Sihon refused and attacked Israel instead.

That attack led to his own defeat and the loss of his kingdom.

👑 Sihon ruled from Heshbon
📜 Numbers twenty one tells his story
⚔️ He attacked instead of allowing passage
📖 His own choice cost him everything

## 🌊 Even Unto The River Jabbok

The Jabbok was a smaller river that fed into the Jordan.

Genesis records Jacob wrestling with God at this same river, generations earlier.

Jacob received a new name there, Israel.

The nation now named for that night reached this very border.

🌊 Jabbok was a smaller river
🤼 Jacob wrestled with God there
🏷️ He received the name Israel
📖 Israel's border reached that same spot

## 🚫 The Border Of The Children Of Ammon

Ammon's people descended from Lot, Abraham's nephew.

God had told Israel earlier not to attack Ammon or take their land.

This border marks the line Israel was not allowed to cross.

Sihon's land could be taken, but Ammon's could not.

👨‍👦 Ammon descended from Lot
🚫 God forbade attacking Ammon
🧭 This marked a line not to cross
📖 Sihon's land differed from Ammon's

## 🧂 Even The Salt Sea On The East

The salt sea is the sea known today as the Dead Sea.

Its water holds so much salt that almost nothing can live in it.

Naming this landmark on the border fixes an exact point on the map.

The description reads almost like a legal boundary line.

🧂 The salt sea is the Dead Sea
🐟 Almost nothing can live in it
📍 It fixed the border's exact point
📖 The text reads like a legal record

## 👣 Which Was Of The Remnant Of The Giants

Og was one of the last members of an ancient race the Bible calls giants.

Deuteronomy later says his bed was made of iron.

It measured about thirteen feet long.

Most of that ancient people had already vanished by this point in the story.

Og stood as a living reminder of a fading and fearsome past.

👣 Og was one of the last giants
🛏️ Deuteronomy describes his iron bed
📏 It measured about thirteen feet
📖 Og was a remnant of a vanished people

## 🛐 That Dwelt At Ashtaroth And At Edrei

Ashtaroth was named after Ashtoreth, a Canaanite goddess of fertility and war.

A city carrying a god's name shows how deeply pagan worship had taken root there.

Edrei was the site of Og's actual defeat, recorded back in Numbers chapter twenty one.

Both cities mark real places, not just names on a list.

🛐 Ashtaroth was named after a goddess
🏛️ Pagan worship had taken deep root
⚔️ Edrei was where Og fell
📖 These were real places, not just names

## 🐂 And Reigned In Mount Hermon

Bashan was known across the ancient world for its rich pasture and strong cattle.

Later prophets used the phrase bulls of Bashan to picture strength and pride.

Og's kingdom stretched across this entire fertile region.

A large and fruitful land had fallen under one giant king's rule.

🐂 Bashan was famous for strong cattle
📜 Prophets pictured pride as bulls of Bashan
👑 Og ruled this whole region
📖 A fruitful land served one king

## 📛 Moses The Servant Of The LORD

This title appears for Moses again and again throughout the book of Joshua.

It marks Moses as someone who carried out God's will, not his own agenda.

Moses defeated these kings east of the Jordan years before Joshua ever crossed the river.

His victories still count as part of Israel's total conquest.

📛 This title repeats often in Joshua
🙏 It marks obedience to God's will
⚔️ Moses won these battles earlier
📖 His victories still count in the total

## 🐄 Unto The Reubenites And The Gadites

These two and a half tribes owned large herds of cattle.

Numbers chapter thirty two records them asking Moses for this land.

It suited raising cattle far better than land further west.

Moses agreed only if their fighting men still helped conquer the rest of Canaan.

This verse shows Moses keeping that old agreement.

🐄 These tribes owned large herds
📜 Numbers thirty two records their request
🌾 This land suited raising cattle
📖 Moses kept his side of the deal

# Joshua 12:7-8
# 🗺️ The Kings Defeated West Of The Jordan
---
## 🔀 On This Side Jordan On The West

Verses one through six covered Moses' victories on the east side of the Jordan.

This verse shifts to Joshua's victories on the west side, inside Canaan itself.

The chapter is built in two clear halves.

Together they cover the entire promised land, not just part of it.

🔀 The chapter has two clear halves
🗺️ Moses conquered the east side
⚔️ Joshua conquered the west side
📖 Together they cover the whole land

## 🧭 From Baalgad In The Valley Of Lebanon

This same boundary phrase already appeared at the end of chapter eleven.

Baalgad marked the far north, and Mount Halak marked the far south.

Repeating it here ties the battle story to this official record.

Scripture is confirming its own account, not adding a new detail.

🔁 This phrase already appeared in chapter eleven
🧭 Baalgad marked the north
🏔️ Halak marked the south
📖 The record confirms the earlier story

## 🎁 According To Their Divisions

Joshua gave this land to Israel.

He did not yet decide who received which part.

The next several chapters describe how the land was divided among the twelve tribes.

This verse looks forward to that future process.

🎁 Joshua gave the land to Israel
❓ Who got what was still undecided
📋 Later chapters divide it by tribe
📖 Conquest and division were separate steps

## ⛰️ In The Mountains And In The Valleys

This verse names five different kinds of land, mountains, valleys, plains, springs, and wilderness.

Naming every terrain type shows the conquest reached every part of the country.

No landscape offered the defeated kings a place to hide.

The list itself is proof of how complete this victory became.

⛰️ Five terrain types are named
🗺️ The list covers the whole country
🚫 No landscape stayed untouched
📖 Completeness is the whole point

## 👥 The Hittites The Amorites And The Canaanites

This verse names six different peoples living inside Canaan before Israel arrived.

Genesis chapter fifteen promised Abraham this same land, and named seven nations there instead of six.

The Girgashites are the one nation left out of this shorter list.

Even a small gap like this shows the text was recorded carefully, not copied without thought.

👥 Six peoples are named here
📜 Genesis fifteen named seven instead
❓ The Girgashites are left out here
📖 Small details show careful recording

# Joshua 12:9-13
# 👑 Ten Kings Of The Southern Campaign
---
## 🏰 The King Of Jericho, One

Jericho's fall in chapter six was Israel's first victory inside Canaan.

The word one here works like a tally mark, counting one defeated king for one city.

Thirty one of these tally marks will appear before this chapter ends.

This simple counting word carries the weight of years of battles.

🏰 Jericho was Israel's first victory
🔢 One works like a tally mark
📊 Thirty one marks appear in total
📖 A small word carries a big history

## 💔 The King Of Ai, Which Is Beside Bethel

Ai's story included Israel's first defeat, caused by Achan's hidden sin in chapter seven.

Israel finally captured the city in chapter eight, after dealing with that sin.

Bethel is only named here as a nearby landmark, not as a conquered city yet.

Its own king shows up later in this very list.

💔 Ai brought Israel's first defeat
🔥 Achan's sin caused that loss
📍 Bethel is named as a landmark here
📖 Bethel's own king appears later

## ⚔️ The King Of Jerusalem, One

Jerusalem's king Adonizedek led the coalition of five kings fought in chapter ten.

His army was defeated there, but the city itself stayed in Canaanite hands for centuries.

Hebron was different, and God later gave that city to Caleb by name.

One city fell fully, and one only lost its army for now.

⚔️ Jerusalem's king led the coalition
🏙️ The city itself was not yet taken
🎁 Hebron went to Caleb
📖 A defeated army was not a captured city

## 🤝 The King Of Jarmuth, One

Jarmuth and Lachish were two more members of the southern coalition from chapter ten.

Lachish later grew into one of Judah's most heavily fortified cities.

Assyrian records centuries later still boasted about attacking Lachish.

A city first mentioned here as one line becomes a major player in later history.

🤝 Both joined the southern coalition
🏯 Lachish became a fortified city
📜 Assyria later recorded attacking it
📖 A small mention grew into a big story

## 🕳️ The King Of Eglon, One

Eglon was the last of the five kings hiding together in the cave from chapter ten.

Gezer was not part of that original coalition at all.

Gezer's king came to help Lachish and was defeated for that choice.

Choosing to get involved cost this king his own kingdom.

🕳️ Eglon was one of the cave kings
🆕 Gezer joined the fight later
🤝 Its king came to help Lachish
📖 Helping an ally cost him everything

## 🏙️ The King Of Debir, One

Debir was also known by an older name, Kirjathsepher.

Judges chapter one later says Caleb offered his daughter in marriage to whoever captured it.

Othniel won that challenge and became Israel's first judge.

Geder appears only here, with no other story attached to its name.

🏙️ Debir was also called Kirjathsepher
💍 Caleb offered his daughter to its conqueror
⚖️ Othniel became Israel's first judge
📖 Even an unknown city like Geder was remembered

# Joshua 12:14-18
# 📜 Ten More Kings Remembered
---
## 🔥 The King Of Hormah, One

Hormah means place of destruction in Hebrew.

Numbers chapter fourteen records Israel losing a battle near here, decades before this chapter.

That name was given after judgment, not victory.

The very ground that once recorded a failure now records a win.

🔥 Hormah means place of destruction
💔 Israel had lost a battle here before
⏳ Decades separated the two events
📖 Old defeat turned into new victory

## 🕳️ The King Of Libnah, One

Libnah was part of the southern campaign fought in chapter ten.

Adullam later becomes famous for a cave, not a king.

David hid from Saul in that same cave, gathering the men who would fight beside him for years.

A place named here for a defeated king becomes known instead for a future king in hiding.

⚔️ Libnah fell during the southern campaign
🕳️ Adullam later became known for a cave
🛡️ David hid there from Saul
📖 One place, two very different stories

## 🏠 The King Of Makkedah, One

Makkedah was the cave where the five coalition kings hid in chapter ten.

Bethel finally gets its own king listed here, separate from the earlier mention beside Ai.

Bethel means house of God, a name going back to Jacob's dream in Genesis.

A city with that meaningful name still had to be fought and defeated like any other.

🕳️ Makkedah held the hiding kings
🏙️ Bethel gets its own king here
🏠 Bethel means house of God
📖 That name did not exempt it from war

## ❓ The King Of Tappuah, One

Neither Tappuah nor Hepher appears anywhere else in the Bible's story.

Their kings still earn a place in this official record.

Being unfamiliar to a modern reader did not make a city less real.

Every fallen kingdom, famous or forgotten, gets counted the same way.

❓ Neither city appears elsewhere in scripture
📋 Both still earned a place here
🏘️ Being unfamiliar did not erase them
📖 Every kingdom counted the same

## 📍 The King Of Aphek, One

Aphek was a common place name, and more than one city shared it.

First Samuel chapter four later records a very different battle at a place also called Aphek.

There, the Philistines defeated Israel and captured the ark of the covenant.

The same name later marks Israel's own worst defeat, a reminder to always check the context.

📍 Aphek was a common place name
⚔️ First Samuel records a different Aphek battle
💔 Israel lost the ark there later
📖 Context decides which Aphek is meant

# Joshua 12:19-24
# 🏁 The Final Tally: Thirty And One Kings
---
## 🤝 The King Of Madon, One

Both kings belonged to the northern coalition already defeated in chapter eleven.

Hazor's king led that entire coalition and ruled the most powerful city in the north.

Chapter eleven already called Hazor the head of all those kingdoms.

This list simply confirms what the battle story already reported.

🤝 Both belonged to the northern coalition
👑 Hazor's king led that coalition
🏛️ Hazor was called the head kingdom
📖 This list confirms the earlier battle

## 🔀 The King Of Shimronmeron, One

Shimronmeron is very likely the same city called Shimron back in chapter eleven.

Spelling can shift slightly between one part of scripture and another.

Achshaph also joined that same northern coalition against Israel.

Matching names across chapters shows this list was built from real memory, not guesswork.

🔀 Shimronmeron likely matches Shimron
✍️ Spelling can shift across scripture
🤝 Achshaph joined the same coalition
📖 The list matches real events

## 🛣️ The King Of Taanach, One

Taanach and Megiddo sat close together, guarding an important valley trade route.

Megiddo's name later gives us the word Armageddon, the mountain of Megiddo, used in the book of Revelation.

That later meaning is centuries away from this simple list of two defeated kings.

A quiet name on a tally list would one day carry enormous weight.

🛣️ Both cities guarded a trade valley
🏔️ Megiddo's name later becomes Armageddon
📜 Revelation uses that name far later
📖 A small mention grew into huge meaning

## 🏃 The King Of Kedesh, One

Kedesh later becomes one of Israel's cities of refuge, a safe place for accidental killers.

Carmel is the same mountain range where Elijah later challenges the prophets of Baal.

Neither future story is told yet in this chapter.

The list simply marks that both places already belonged to Israel.

🏃 Kedesh later became a city of refuge
🔥 Carmel is Elijah's future mountain
⏳ Neither story is told here yet
📖 The list only marks ownership

## 🌊 The King Of Dor In The Coast Of Dor

Dor sat on the coast, already named as a boundary point back in chapter eleven.

It marked the far western edge of the land Joshua's campaign reached.

Naming a coastal city here shows the conquest reached all the way to the sea.

Not one border direction was left uncovered by the end of this book.

🌊 Dor sat on the coast
🧭 It marked the western edge
🗺️ The conquest reached the sea
📖 No direction was left uncovered

## ❓ The Nations Of Gilgal

This phrase is unusual, since Gilgal was normally Israel's own camp, not enemy territory.

Many scholars believe this refers to a different place, sometimes connected to Goiim, a word meaning nations.

The text itself does not explain the confusion further.

An honest reader admits some names in scripture stay genuinely uncertain.

❓ This phrase is unusual and puzzling
🏕️ Gilgal was normally Israel's own camp
📜 Some connect it to Goiim instead
📖 Some names stay honestly uncertain

## 🏙️ The King Of Tirzah

Tirzah does not seem important yet in this simple list.

First Kings later names Tirzah as the early capital of the northern kingdom of Israel, before Samaria replaced it.

That future matters far beyond anything visible in this one line.

A name easy to skip over here becomes a whole kingdom's capital later.

🏙️ Tirzah seems minor here
👑 It later became a capital city
🔀 Samaria eventually replaced it
📖 A small line hid a big future

## 🔢 All The Kings Thirty And One

This final count closes both halves of the chapter at once.

God had promised Abraham this land many generations earlier, long before any of these kings ever ruled.

Every single number in this list stands for a promise that was actually kept.

The next chapters turn from counting the land to dividing it among the tribes.

🔢 Thirty one closes the whole count
🤝 God's promise to Abraham stands behind it
✅ Every number represents a kept promise
📖 The story now turns to dividing the land
`.trim();

export const JOSHUA_TWELVE_PERSONAL_SECTIONS = parseJoshuaTwelveRawNotes(JOSHUA_TWELVE_RAW_NOTES);
