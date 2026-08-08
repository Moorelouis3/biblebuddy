export type JoshuaSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaSixteenRawNotes(rawText: string): JoshuaSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 16:${startVerse}` : `Joshua 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Joshua 16 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_SIXTEEN_RAW_NOTES = `# Joshua 16:1-4
# 🗺️ The Lot Of The Children Of Joseph
---
## 🗺️ The Lot Of The Children Of Joseph Fell

Joseph never became his own tribe.

Genesis forty eight records Jacob adopting Joseph's two sons as his own.

So Ephraim and Manasseh each became a tribe in Joseph's place.

That is why this territory is described as one shared lot before it splits.

🗺️ Joseph has no tribe of his own
👨‍👦 Jacob adopted his two sons instead
🌾 Ephraim and Manasseh became tribes
📖 Their shared land is named here first

## 🏙️ From Jordan By Jericho

Jericho was the first city Israel conquered in this whole book.

Its walls fell in chapter six, at the very start of the conquest.

Now the very same city marks a boundary line on a map.

The site of Israel's first victory becomes routine geography a few chapters later.

🏙️ Jericho fell first in chapter six
🧱 Its walls came down by God's power
🗺️ It now just marks a border
📖 A famous victory becomes routine geography

## 🏠 Throughout Mount Bethel

Bethel means house of God in Hebrew.

Jacob named it that after dreaming of a ladder reaching to heaven there.

Genesis records that the city's older name, before Jacob renamed it, was Luz.

A place tied to one of Jacob's most personal encounters with God now sets a border line.

🏠 Bethel means house of God
🪜 Jacob dreamed of a ladder there
📜 Its older name was Luz
📖 A personal encounter now marks a border

## 🏘️ From Bethel To Luz

Luz and Bethel sound like the same city, but they are not always the same place in scripture.

Judges chapter one tells of a man who showed Israel's spies a secret way into Bethel.

Spared for his help, he later left and built a brand new city, naming it Luz again.

One name ends up marking two different towns across the story.

🏘️ Luz and Bethel can differ later
🕵️ A man showed spies a way in
🏗️ He later built a new city called Luz
📖 One name marks two different towns

## 🏹 Unto The Borders Of Archi To Ataroth

Archi names a clan territory, not a single town.

Second Samuel later introduces Hushai the Archite, a trusted friend of King David.

Hushai's loyalty helps undo a dangerous plot against David during Absalom's revolt.

A clan name dropped into a border list quietly points toward a future king's ally.

🏹 Archi marks a clan's territory
🤝 Hushai the Archite serves David later
🛡️ His loyalty helps save David's throne
📖 A border name points to a future ally

## 🌊 Down Westward, And To Gezer

Gezer sat on Judah and Ephraim's shared western edge.

Israel will fail to remove the Canaanites living there, as verse ten records.

Centuries later an Egyptian king burns the city and gives it to Solomon as a wedding gift.

Ground Israel could not fully take by conquest eventually arrives by an entirely different route.

🌊 Gezer sat on the western border
🏹 Israel could not remove its people
🔥 An Egyptian king later burned it
📖 The city arrives through a different route later

## 🌾 So The Children Of Joseph, Manasseh And Ephraim, Took Their Inheritance

This line formally closes the shared portion belonging to both of Joseph's sons.

Jacob had promised Joseph a double share, one portion more than his brothers.

Two full tribes descending from one son fulfill that older promise exactly.

A blessing spoken back in Genesis becomes measured land right here.

🌾 This closes Joseph's shared portion
👴 Jacob promised him a double share
🌿 Two tribes fulfill that promise
📖 An old blessing becomes real land

# Joshua 16:5-8
# 🧭 Ephraim's Own Border Is Drawn
---
## 🧭 The Border Of The Children Of Ephraim According To Their Families

The shared Joseph border from verses one through four now splits.

This section marks out land belonging specifically to Ephraim alone.

Manasseh's own separate border comes later, in chapter seventeen.

Brothers who once shared one description now each get their own exact lines.

🧭 The shared border now splits
🌿 This section belongs to Ephraim alone
📜 Manasseh's own border comes later
📖 Brothers now get separate exact lines

## 🏰 Atarothaddar, Unto Bethhoron The Upper

Bethhoron actually names twin towns, an upper town and a lower one.

Joshua chapter ten already made this road famous.

There the Lord hurled great hailstones on Israel's enemies along this very route.

A road once soaked in God's dramatic victory now simply marks a tribal line.

🏰 Bethhoron names two twin towns
⛈️ Joshua ten made this road famous
🪨 God once hurled hailstones there
📖 A famous road becomes a quiet border

## 🌄 The Border Went Out Toward The Sea To Michmethah

Michmethah sat near Shechem, a major city just north of this border.

It marks the meeting point between Ephraim's land and Manasseh's land.

Chapter seventeen names this same spot again from Manasseh's side.

One landmark quietly ties two separate chapters of land records together.

🌄 Michmethah sat near Shechem
🧭 It marks Ephraim and Manasseh's meeting point
📜 Chapter seventeen names it again
📖 One landmark ties two chapters together

## ⛪ Unto Taanathshiloh

Taanathshiloh sat close to Shiloh, a town whose name means rest.

Shiloh soon becomes the resting place for the tabernacle itself.

Chapter eighteen shows Israel setting up God's dwelling place there.

A border marker here quietly points toward Israel's coming center of worship.

⛪ Taanathshiloh sat near Shiloh
🕊️ Shiloh's name means rest
⛺ The tabernacle soon rests there
📖 A border points toward Israel's worship center

## 🔄 Down From Janohah To Ataroth, And To Naarath, And Came To Jericho

This line traces the border back around toward Jericho.

The path forms a loop rather than a single straight line.

Ancient border lists commonly followed natural landmarks instead of drawing simple shapes.

Walking this line meant physically tracing a real route across real land.

🔄 The border loops back toward Jericho
🗺️ It is not a straight line
🏞️ Landmarks shaped the actual path
📖 Someone once walked this exact route

## 🍎 From Tappuah Westward Unto The River Kanah

Tappuah likely comes from the Hebrew word for apple.

Kanah likely comes from the Hebrew word for reed or cane.

Both names describe ordinary plants that grew along this stretch of land.

Even a formal legal border was named after simple, familiar things people could picture.

🍎 Tappuah likely means apple
🌾 Kanah likely means reed
🌿 Both names come from plants
📖 A legal border used familiar names

## 📖 This Is The Inheritance Of The Tribe Of The Children Of Ephraim By Their Families

This closing line matches the same formula used for Judah in chapter fifteen.

Every tribe's land grant gets recorded with this same official wording.

The repeated formula shows this was a consistent legal process, not a one time event.

Each tribe receives the same careful documentation, no matter how small or large its land.

📖 This formula matches Judah's closing line
📜 Every tribe's grant uses this wording
⚖️ The process was consistent for all
➡️ Every tribe got equally careful records

# Joshua 16:9-10
# ⚠️ Cities Shared And Canaanites Left Behind
---
## 🏘️ The Separate Cities For The Children Of Ephraim Were Among The Inheritance Of The Children Of Manasseh

Ephraim's territory was not one single unbroken block of land.

Some of its towns sat physically inside land otherwise belonging to Manasseh.

Chapter seventeen explains this same overlap again from Manasseh's side of the story.

Two brothers' inheritances end up woven together rather than neatly divided.

🏘️ Ephraim's land was not one solid block
🌿 Some towns sat inside Manasseh's land
📜 Chapter seventeen explains this again
📖 Two tribes' land ends up woven together

## 🚫 They Drave Not Out The Canaanites That Dwelt In Gezer

God had commanded Israel to remove the nations living in the land.

Here, for the first time in Ephraim's account, that command goes unfulfilled.

Judah already left the Jebusites in Jerusalem back in chapter fifteen.

A pattern of incomplete obedience is starting to repeat itself tribe by tribe.

🚫 Ephraim failed to remove Gezer's people
📜 God had commanded full removal
🏙️ Judah left people in Jerusalem too
📖 Incomplete obedience starts repeating

## 📅 Dwell Among The Ephraimites Unto This Day

Unto this day signals that the writer is speaking from years after the events.

The Canaanites of Gezer remained a settled, permanent presence, not a brief holdout.

The book of Judges repeats this exact same detail almost word for word.

A quiet failure recorded once gets confirmed again later as ongoing and unresolved.

📅 Unto this day marks a later writer
🏘️ Canaanites stayed permanently, not briefly
📜 Judges repeats this same detail
📖 An old failure stayed ongoing and unresolved

## 👑 And Serve Under Tribute

Tribute meant forced labor rather than full removal from the land.

Israel settled for control and taxation instead of complete obedience.

First Kings later records an Egyptian king finally burning Gezer and killing its people.

That city is only fully cleared out generations later, and not by Israel's own hand.

👑 Tribute meant forced labor, not removal
⚖️ Israel chose control over full obedience
🔥 Egypt later burned Gezer completely
📖 Full obedience arrived generations late, by another hand
`.trim();

export const JOSHUA_SIXTEEN_PERSONAL_SECTIONS = parseJoshuaSixteenRawNotes(JOSHUA_SIXTEEN_RAW_NOTES);
