export type NehemiahThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNehemiahThreeRawNotes(rawText: string): NehemiahThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NehemiahThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nehemiah\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nehemiah 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nehemiah\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Nehemiah\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nehemiah 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nehemiah 3:${startVerse}` : `Nehemiah 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Nehemiah 3 sections, received " + sections.length);
  }

  return sections;
}

const NEHEMIAH_THREE_RAW_NOTES = `# Nehemiah 3:1-2
# 🧱 The Wall Building Begins At The Top
---
## 👑 Eliashib The High Priest Rose Up

Eliashib held the highest religious office in all of Israel.

He does not send workers to take his place.

He picks up tools and builds right alongside everyone else.

The whole list of builders opens with the man at the very top.

👑 Eliashib held the highest office

🧱 He built alongside everyone else

🥇 The builder list opens with him

📖 Leadership here meant going first

## 🐑 They Builded The Sheep Gate

The sheep gate stood closest to the temple courts.

Sacrificial animals entered the city through this exact gate.

It made sense for priests to rebuild the gate tied to worship.

The very first gate named in this chapter belonged to them.

🐑 Sheep gate stood nearest the temple

🐐 Animals for sacrifice entered here

⛪ Priests fit rebuilding a worship gate

📖 Worship opens the list of gates

## 🕊️ They Sanctified It

To sanctify something means to set it apart for holy use.

Most gates in the wall were simply built and used.

This gate instead received a ceremony marking it as sacred.

Even a gate could be treated as something set apart for God.

🕊️ Sanctify means set apart for God

🚪 Most gates were just built plainly

✨ This gate got a sacred ceremony

📖 A gate itself could be holy

## 🗼 Unto The Tower Of Meah, Unto The Tower Of Hananeel

Meah likely comes from the Hebrew word for a hundred.

Many scholars believe it describes the tower's height in cubits.

Hananeel means God has been gracious, a name built right into the wall.

These two towers marked the stretch the priests were responsible for.

🗼 Meah likely means the number hundred

📏 It may describe the tower's height

🙏 Hananeel means God has been gracious

📖 Even tower names carried meaning

# Nehemiah 3:3-5
# 🐟 A Gate, A Family Tree, And A Refusal
---
## 🐟 The Fish Gate Did The Sons Of Hassenaah Build

The fish gate sat near where merchants once sold fish from the coast.

This family built the frame, the doors, the locks, and the bars.

Naming every piece shows the writer wanted a precise record kept.

A completed gate needed far more than just stacked stone.

🐟 Fish gate stood near the fish trade

🚪 They built doors, locks, and bars

📝 The record names every single piece

📖 A gate needed more than stone

## 🔗 And Next Unto Them Repaired

This exact phrase repeats dozens of times through the rest of the chapter.

It describes families working in a chain, each taking the next stretch of wall.

No family built the whole wall alone.

The chapter reads like a construction roster, not a story about one hero.

🔗 This phrase repeats through the chapter

🧱 Each family took the next stretch

🤝 No one family built it alone

📖 The chapter reads like a roster

## 📛 Meremoth The Son Of Urijah, The Son Of Koz

Naming a father and grandfather was a normal way to identify someone.

It confirmed which family and priestly line a man belonged to.

Meremoth appears again later in this chapter.

He repairs a second stretch of wall there.

These genealogies were never filler.

They proved exactly who was accountable for each stretch of wall.

📛 Naming father and grandfather confirmed identity

👪 It showed a man's priestly line

🔁 Meremoth repairs a second stretch later

📖 Names proved who built what

## 👷 The Tekoites Repaired, But Their Nobles Put Not Their Necks To The Work

Ordinary people from Tekoa showed up and did the labor.

Their own nobles refused to join in.

They considered the work beneath them.

Put their necks to the work is an old idiom for bending down to labor.

This is the first hint that not everyone shared Nehemiah's urgency.

👷 Ordinary Tekoites showed up and worked

🙅 Their nobles refused to join in

💪 Put their necks means bend to labor

📖 Not everyone shared this urgency

# Nehemiah 3:6-12
# 🏛️ Trades, Halves, And A Governor's Doorstep
---
## 🚪 The Old Gate Repaired Jehoiada And Meshullam

The old gate likely marked one of the original entrances into the city.

Jehoiada and Meshullam rebuilt its beams, doors, locks, and bars completely.

This is the second gate in the chapter described piece by piece.

The writer wanted readers to know exactly what a rebuilt gate required.

🚪 Old gate was an original entrance

🔨 They rebuilt beams, doors, and locks

📋 This is the second gate detailed

📖 A rebuilt gate took real work

## 🏛️ Unto The Throne Of The Governor On This Side The River

This phrase names the official seat of Persia's regional governor.

Rebuilding a stretch of wall reaching his seat carried a quiet message.

The wall was not a rebellion.

It was a project done in plain sight.

🏛️ This named the governor's seat

🧱 The wall reached right to his post

👀 Building near him meant nothing hidden

📖 This was no secret rebellion

## 🥇 Uzziel The Son Of Harhaiah, Of The Goldsmiths

Uzziel is identified by his trade, not only by his family.

Goldsmiths normally shaped jewelry and fine metal, not stone walls.

Skilled tradesmen still left their shops to take a turn on the wall.

Every kind of worker in the city had a stretch to answer for.

🥇 Uzziel is named by his trade

💍 Goldsmiths usually shaped fine metal

🧱 Even tradesmen worked on the wall

📖 Every worker had a stretch to answer for

## 🧴 They Fortified Jerusalem Unto The Broad Wall

Hananiah worked as an apothecary, mixing spices, perfumes, and ointments.

That trade had nothing to do with stone or mortar.

The broad wall was a wide section of Jerusalem's fortification.

Archaeologists have since found remains of a wall this thick still standing in Jerusalem.

🧴 Hananiah mixed spices and perfumes

🧱 Broad wall was a wide fortification

🏺 Archaeologists later found this same wall

📖 Even perfume makers fortified the city

## 🗺️ Rephaiah The Son Of Hur, The Ruler Of The Half Part Of Jerusalem

Jerusalem was divided into administrative halves for local governing.

Rephaiah ruled one half, and another official ruled the other.

This kind of civic structure existed before the wall project even began.

The rebuilding used the city's existing leadership instead of starting from nothing.

🗺️ Jerusalem was split into two halves

👑 Rephaiah ruled one of the halves

🏛️ This structure existed before rebuilding began

📖 Existing leaders carried the project forward

## 👑 Shallum The Son Of Halohesh, He And His Daughters

Shallum ruled the other half of Jerusalem alongside Rephaiah.

His daughters are named as builders too, a detail easy to miss.

Naming daughters as laborers was unusual for a record from this culture.

Rebuilding the wall pulled in an entire family, not only its men.

👑 Shallum ruled the other half

👧 His daughters are named as builders

📜 Naming daughters here was unusual

📖 The wall pulled in whole families

# Nehemiah 3:13-15
# ⛲ Valley, Waste, And Water
---
## 🏘️ The Valley Gate Repaired Hanun, And The Inhabitants Of Zanoah

Zanoah was a town outside Jerusalem whose people came to help.

A cubit measured close to eighteen inches, about the length of a forearm.

A thousand cubits comes out to nearly a third of a mile of wall.

This one crew covered the longest single stretch named in the chapter.

🏘️ Zanoah's people traveled in to help

📏 A cubit was close to eighteen inches

🛣️ A thousand cubits is nearly a third mile

📖 This was the longest stretch named

## 🗑️ But The Dung Gate Repaired Malchiah

This gate carried the plain job of hauling waste out of the city.

Its name was never meant to sound impressive.

Nehemiah had already ridden past this very gate on his night survey.

An unglamorous gate still received the same careful repair as any other.

🗑️ This gate carried waste out

📛 Its name was never meant to impress

🌙 Nehemiah had passed it on his night ride

📖 Even the plain gate got real care

## ⛲ The Gate Of The Fountain Repaired Shallun, He Built It, And Covered It

This gate stood near a natural spring that supplied the city with water.

Covered it likely means Shallun added a roof over part of the structure.

Nehemiah had also passed this gate on his earlier night survey.

Water access mattered as much to the city as any stone wall.

⛲ Fountain gate stood near a spring

🏠 Covered it likely means he added a roof

🌙 Nehemiah had surveyed this same gate

📖 Water access mattered as much as stone

## 💧 The Wall Of The Pool Of Siloah By The King's Garden

Siloah is the same pool later called Siloam in the New Testament.

Centuries later, Jesus sends a blind man to wash in this exact pool.

The king's garden sat nearby, watered by this same reliable spring.

A small detail in a building list quietly points toward a much later story.

💧 Siloah is later called Siloam

👁️ Jesus later sends a blind man here

🌳 The king's garden sat nearby

📖 A small detail points to a later story

# Nehemiah 3:16-21
# ⚰️ Tombs, Guards, And One Eager Builder
---
## 👤 After Him Repaired Nehemiah The Son Of Azbuk

This Nehemiah is a different man from the book's author.

Nehemiah was a common name among the Jewish exiles who returned.

Readers should not confuse him with the governor leading the whole project.

Two men can share a name and still play very different roles.

👤 This is a different Nehemiah

📛 Nehemiah was a common exile name

🚫 Do not confuse him with the governor

📖 Two men can share one name

## ⚰️ Unto The Place Over Against The Sepulchres Of David

Sepulchres means burial tombs, here belonging to Israel's ancient kings.

This stretch of wall ran right past the resting place of royalty.

Repairing near a royal tomb carried extra weight and honor.

Nehemiah's own family took on one of the most meaningful sections of the wall.

⚰️ Sepulchres means royal burial tombs

👑 This wall section ran past David's tomb

🙏 The location carried real honor

📖 Nehemiah's family got a meaningful section

## ⚔️ Unto The House Of The Mighty

The mighty likely refers to David's elite guard of warriors.

Their quarters may have stood along this stretch of wall.

This detail places famous soldiers from the old kingdom into this section.

Even a building list can quietly touch a much older story.

⚔️ The mighty were likely elite warriors

🏠 Their quarters may have stood here

📜 This ties the wall to an older story

📖 Old history sits inside this list

## ⛪ After Him Repaired The Levites, Rehum The Son Of Bani

Levites normally served in the temple, not on construction projects.

Their appearance here shows the whole community stepped outside its usual role.

Hashabiah, another Levite, ruled half of the nearby town of Keilah.

The wall needed hands from every corner of Jewish life, not just builders.

⛪ Levites usually served in the temple

🧱 Here they left that role to build

🏘️ Hashabiah ruled half of Keilah

📖 Every corner of Jewish life pitched in

## 🔥 After Him Baruch The Son Of Zabbai Earnestly Repaired

Earnestly is the only effort word used for any single builder in this list.

Every other name simply repairs a piece.

This one repairs with visible eagerness instead.

The writer wanted this man's enthusiasm remembered specifically.

🔥 Earnestly is the only such word used

🧱 Others simply repair their piece

✨ Baruch works with visible eagerness

📖 One worker's effort gets noticed

# Nehemiah 3:22-27
# 🛕 Priests From The Plain, Servants On The Hill
---
## 🗺️ After Him Repaired The Priests, The Men Of The Plain

The plain likely refers to the Jordan Valley region near Jericho.

Priests from outside Jerusalem traveled in to take their own section.

This detail widens the circle of who considered this project their own.

The wall belonged to more than just the people who lived inside it.

🗺️ The plain likely means the Jordan Valley

🚶 Priests traveled in from outside Jerusalem

🤝 This widened who felt responsible

📖 The wall belonged to more than residents

## 🏠 After Him Repaired Benjamin And Hashub Over Against Their House

Several builders in this chapter work the section nearest their own home.

Building near your own house made practical sense for citizen laborers.

It also gave each family a direct stake in that exact stretch.

Self interest and community good pointed in the same direction here.

🏠 Builders often worked near their own home

👥 This made sense for citizen laborers

🎯 It gave each family a direct stake

📖 Self interest and community aligned here

## 🛕 The Nethinims Dwelt In Ophel

Nethinims were temple servants who helped the Levites with lower level duties.

Their name means those given, dedicated to temple service instead of ordinary work.

Ophel was a hill within Jerusalem, close to the temple itself.

Even a group with low social standing gets its own place named here.

🛕 Nethinims served the Levites at the temple

📛 Their name means those given

⛰️ Ophel was a hill near the temple

📖 Low status still got named here

## 💧 Unto The Place Over Against The Water Gate Toward The East

The water gate opened toward a spring that supplied the city.

This same gate becomes important later, when the people gather to hear the law read aloud.

For now it simply marks where the Nethinims' section of wall ended.

A gate mentioned in passing here will matter again soon.

💧 Water gate opened toward the spring

📚 The people later gather here for scripture

📍 It marked the end of this section

➡️ This gate matters again soon

## 🔁 After Them The Tekoites Repaired Another Piece

Tekoites from earlier in the chapter refused to help through their own nobles.

Ordinary people from that same town show up here for a second assignment.

Their nobles' refusal never stopped the regular people of Tekoa from working.

One town's shame in verse five gets quietly redeemed by its own people here.

🔁 Tekoites return for a second stretch

🙅 Their nobles had refused back in verse five

💪 Ordinary people kept working anyway

📖 The town's shame gets quietly redeemed

# Nehemiah 3:28-32
# 🔄 The Wall Comes Full Circle
---
## 🐴 From Above The Horse Gate Repaired The Priests, Every One Over Against His House

The horse gate likely stood near the king's stables in earlier times.

Priests once again take a section, each working the stretch nearest his own home.

This is the third time priests are named as builders in this chapter.

Their involvement runs from the very first gate to nearly the very last.

🐴 Horse gate likely stood near stables

⛪ Priests again worked near their own homes

🔢 This is their third mention as builders

📖 Priests bookend this entire chapter

## 👪 After Them Repaired Zadok The Son Of Immer Over Against His House

Immer named a whole division of priests, not just one family.

Zadok belonged to a priestly line traced back to older organized groups.

Shemaiah, named right after him, kept watch as keeper of the east gate.

Family names here still pointed back to older, established structures.

👪 Immer named a whole priestly division

📛 Zadok belonged to that priestly line

🚪 Shemaiah kept watch at the east gate

📖 Names pointed to older structures

## 📋 Over Against The Gate Miphkad

Miphkad likely means appointed place or a place of review.

Some scholars connect it to inspecting troops or counting the people.

It stood near the very end of the wall's full circuit.

A counting gate fits well near the end of this long list.

📋 Miphkad likely means appointed place

🔢 It may connect to counting people

🏁 It sat near the end of the circuit

📖 A counting gate fits the end here

## 📐 And To The Going Up Of The Corner

The corner marked where the wall's line changed direction sharply.

This landmark already appeared earlier in the chapter at a different turn.

Repeating it shows the builders were closing a full loop.

The chapter has been tracing one continuous line the entire time.

📐 The corner marked a sharp turn

🔁 This landmark repeats from earlier

🔄 The builders were closing a full loop

📖 One continuous line runs through the chapter

## 🔁 Between The Going Up Of The Corner Unto The Sheep Gate Repaired The Goldsmiths And The Merchants

The list ends exactly where it began, back at the sheep gate.

Goldsmiths and merchants take the very last stretch, closing the circle.

Nehemiah had ridden this same loop alone and in secret back in chapter two.

What one man surveyed quietly by night, a whole city finished together in the light.

🔁 The list ends back at the sheep gate

🥇 Goldsmiths and merchants close the final stretch

🌙 Nehemiah once rode this loop alone

📖 One man's secret ride became a citywide finish
`.trim();

export const NEHEMIAH_THREE_PERSONAL_SECTIONS = parseNehemiahThreeRawNotes(NEHEMIAH_THREE_RAW_NOTES);
