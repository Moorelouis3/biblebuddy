export type NumbersThirtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersThirtyFourRawNotes(rawText: string): NumbersThirtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersThirtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+34:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 34 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+34:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+34:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 34 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 34,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 34:${startVerse}` : `Numbers 34:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Numbers 34 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_THIRTY_FOUR_RAW_NOTES = `# Numbers 34:1-2
# 📜 The Land That Shall Fall Unto You
---
## 🗺️ When Ye Come Into The Land Of Canaan

This command comes while Israel is still camped on the plains of Moab.

"When ye come" makes clear the entrance has not happened yet.

The land gets described in full detail before a single Israelite foot steps on it.

A promise made to Abraham long ago is about to become a real map.

🗺️ Israel has not yet entered Canaan

⏳ The command comes before the entrance

📜 An old promise becomes a real map

📖 Faith precedes possession here

## 🎁 This Is The Land That Shall Fall Unto You For An Inheritance

"Inheritance" means a possession passed down, not something earned by fighting for it.

"Fall unto you" pictures the land dropping into place, almost like a lottery outcome.

Israel will still have to fight for this land in the book of Joshua.

But the land already legally belongs to them before that fighting even starts.

🎁 Inheritance means a passed down possession

🎲 Fall unto you pictures a lottery outcome

⚔️ Real fighting still lies ahead

📖 Ownership comes before the conquest

## 🧭 With The Coasts Thereof

The word "coasts" does not mean seashore in this verse.

"Coasts" here means borders or boundary lines instead.

The rest of this chapter draws that boundary line piece by piece.

Every direction, south, west, north, and east, gets its own description.

🧭 Coasts means borders, not a seashore

📏 The whole chapter draws one boundary

🔄 Four directions each get explained

➡️ A promise becomes a precise boundary

# Numbers 34:3-5
# 🧭 Your South Quarter
---
## 🏜️ Your South Quarter Shall Be From The Wilderness Of Zin

"Quarter" here simply means a region, like a compass direction.

The wilderness of Zin sits along Canaan's southern edge, next to Edom.

This is the same wilderness where Israel camped for years during the wandering.

Naming it here ties the promised boundary back to ground Israel already knew.

🧭 Quarter means a compass direction

🏜️ Zin sits on the southern edge

👣 Israel already knew this ground

📖 The boundary connects promise to memory

## 🌊 The Outmost Coast Of The Salt Sea Eastward

The salt sea is the body of water known today as the Dead Sea.

"Outmost coast" means the farthest edge of that sea, not the middle of it.

Placing the border here anchors the whole southern line to one clear landmark.

A border only works if people can actually find it on the ground.

🌊 Salt sea is today's Dead Sea

📍 Outmost coast means the farthest edge

🗿 One landmark anchors the whole line

➡️ A border must be findable, not vague

## 📍 The Going Forth Thereof Shall Be From The South To Kadeshbarnea

Kadeshbarnea is not a new name to readers of Numbers.

This is the exact place where the twelve spies gave their report in Numbers thirteen.

The unbelief that started there cost an entire generation forty years in the wilderness.

Now, decades later, that same place simply marks a boundary point on a map.

📍 Kadeshbarnea is a familiar location

🕵️ The spies gave their report there

⏳ Forty years passed since that failure

📖 Old failure now marks new progress

## 🏞️ Fetch A Compass From Azmon Unto The River Of Egypt

"Fetch a compass" is an old phrase meaning the border curves or turns.

The river of Egypt here is a small stream near Sinai, not the Nile.

Ancient boundary descriptions often followed rivers and mountains instead of drawn lines.

Nature itself supplied the markers for this early legal boundary.

🔄 Fetch a compass means the border turns

🏞️ Not the Nile, a small stream

⛰️ Rivers and mountains marked ancient borders

📖 Nature supplied this boundary's fence posts

# Numbers 34:6-9
# 🌊 West And North Borders
---
## 🌊 Ye Shall Even Have The Great Sea For A Border

The great sea is the Mediterranean, the largest water Israel would have known.

This border needed no extra landmarks because the coastline itself was the landmark.

A sea makes one of the simplest borders to defend and describe.

Every other direction required naming several places, this direction required naming just one.

🌊 Great sea means the Mediterranean

🗺️ The coastline itself was the marker

🛡️ Seas are simple borders to hold

📖 One direction needed only one name

## ⛰️ From Mount Hor Ye Shall Point Out Your Border Unto The Entrance Of Hamath

This mount Hor sits far north, a different place from the mount Hor of chapter twenty.

"The entrance of Hamath" was a well known pass leading into Syrian territory.

Hamath itself marked the traditional northern edge of Israel's promised land elsewhere in scripture.

Reaching this point meant the promised territory stretched far beyond Canaan's familiar core.

⛰️ This mount Hor differs from chapter twenty's

🚪 Entrance of Hamath was a known pass

🗺️ Hamath marked the traditional northern edge

➡️ The promise reached farther than expected

## 🏁 The Goings Out Of It Shall Be At Hazarenan

"Goings out" is this chapter's repeated phrase for where a border segment ends.

Hazarenan closes the north border exactly where the east border begins next.

The writer is careful to make every line connect without a gap.

A boundary with gaps would leave room for a future dispute.

🏁 Goings out means where a line ends

🔗 Hazarenan connects north to east

🧩 No gaps were left in the line

📖 A closed boundary prevents future disputes

# Numbers 34:10-12
# 🗺️ Your East Border
---
## 🔗 Ye Shall Point Out Your East Border From Hazarenan To Shepham

The east border begins exactly where the north border just ended.

This careful hand off from direction to direction leaves no ground unclaimed.

Every side of the land locks into the next one this way.

The whole boundary works like one unbroken rope drawn around the land.

🔗 East border starts where north ended

🧵 No ground is left unclaimed

🔄 Each side locks into the next

📖 One unbroken rope surrounds the land

## 🌊 The Side Of The Sea Of Chinnereth Eastward

Chinnereth is the older Hebrew name for what later scripture calls the Sea of Galilee.

Naming it here places the east border along a lake most readers already picture.

This same water later frames much of Jesus' ministry in the Gospels.

The Old Testament boundary and the New Testament setting share one shoreline.

🌊 Chinnereth is Galilee's older Hebrew name

🗺️ The east border runs along this lake

📖 Jesus later ministered around this water

➡️ Old and New Testament geography line up

## 🚧 The Border Shall Go Down To Jordan

The Jordan River becomes the western wall of the two and a half tribes named earlier.

For the tribes still waiting on the western side, this river is the last obstacle before Canaan.

Joshua chapter three later describes crossing it on dry ground.

That crossing echoes the Red Sea crossing under Moses.

🌊 Jordan forms the eastern tribes' western wall

🚧 It is the last barrier for the rest

🚶 Joshua three crosses it on dry ground

📖 One river, two very different meanings

## 🔄 This Shall Be Your Land With The Coasts Thereof Round About

This line closes the whole boundary description that started back in verse three.

"Round about" means the border has now been traced in a complete circle.

South, west, north, and east all connect back into one shape.

The land is no longer just a promise, it is now a defined territory.

🔄 Round about means a complete circle

🧭 All four directions now connect

🗺️ The land becomes a real drawn shape

📖 A promise becomes a defined territory

# Numbers 34:13-15
# ⚖️ Nine Tribes And The Half Tribe
---
## 🎲 Which The LORD Commanded To Give Unto The Nine Tribes, And To The Half Tribe

Twelve tribes existed, but only nine and a half will divide the land just described.

"By lot" means the specific plot each tribe received was decided by a method like casting dice.

Casting lots removed human favoritism from a decision this important.

Chapter thirty five later shows the one remaining tribe, Levi, receiving cities instead of farmland.

🔢 Only nine and a half tribes divide it

🎲 By lot removed human favoritism

👀 Casting lots kept the process fair

📖 Levi's different portion comes in chapter thirty five

## 📍 Have Received Their Inheritance On This Side Jordan Near Jericho Eastward

Reuben, Gad, and half of Manasseh already claimed their land back in Numbers thirty two.

"This side Jordan" means the eastern side, the side Israel is camped on right now.

Their choice to settle there for good grazing land came before Canaan was even divided.

That earlier decision is why only two and a half tribes are missing from this chapter.

🐑 Reuben, Gad, half Manasseh chose earlier

📍 This side Jordan means the eastern side

📆 Their choice came before Canaan's division

➡️ Their absence here was already explained

# Numbers 34:16-19
# 👑 Eleazar The Priest, And Joshua
---
## 👥 These Are The Names Of The Men Which Shall Divide The Land Unto You

God does not leave this decision to Moses alone.

A whole team of leaders will oversee dividing the land among all the tribes.

Moses himself will die before Israel ever crosses the Jordan.

Naming a full leadership team here already prepares Israel for life after him.

👥 A whole team, not Moses alone

🕊️ Moses will not cross the Jordan

📋 Twelve leaders share this responsibility

📖 Israel is prepared for life after Moses

## 👑 Eleazar The Priest, And Joshua The Son Of Nun

Eleazar became high priest back in Numbers twenty after his father Aaron died.

Joshua already carries God's chosen authority to succeed Moses, confirmed in Numbers twenty seven.

Pairing a priest with Israel's next leader makes dividing the land both a legal and spiritual task.

These two names guarantee continuity even though the exodus generation has almost entirely died out.

👑 Eleazar became priest after Aaron

🎖️ Joshua is Moses' already chosen successor

🤝 A priest and a leader work together

📖 Continuity survives a whole generation's death

## 🕵️ Of The Tribe Of Judah, Caleb The Son Of Jephunneh

Caleb is the only person named here whom the reader has already met.

He was one of the twelve spies in Numbers thirteen who trusted God over fear.

Every other spy from that generation died in the wilderness for their unbelief.

Old faith forty years earlier now earns Caleb a personal role in the conquest.

🕵️ Caleb was one of the twelve spies

🦁 He trusted God over fear of giants

⚰️ The other unbelieving spies died first

📖 Old faith earns a new assignment

# Numbers 34:20-29
# 📋 One Prince Of Every Tribe
---
## 📋 Of The Tribe Of The Children Of Simeon, Shemuel The Son Of Ammihud

From here through verse twenty eight, nine more princes get named in this same short format.

A name like "Shemuel" appears nowhere else in scripture beyond this single verse.

These men have no recorded stories, no famous deeds, and no other appearances.

Their presence here alone was worth writing down, even without a story attached.

📋 Nine more princes follow this pattern

👤 Most names appear only here

📜 No story survives beyond the name

📖 Being recorded mattered on its own

## ✂️ The Prince Of The Children Of Joseph, For The Tribe Of The Children Of Manasseh, Hanniel The Son Of Ephod

Manasseh gets its own prince even though half the tribe already settled east of the Jordan.

Only the western half of Manasseh, the half still waiting to cross into Canaan, needed a voice here.

Ephraim, Manasseh's brother tribe, gets a separate prince in the very next verse.

One father split into two completely separate shares of the promised land.

✂️ Only western Manasseh needed a prince here

👬 Ephraim gets a separate prince next

👪 One father split into two territories

📖 Joseph's blessing multiplied into two tribes

## 🔁 These Are They Whom The LORD Commanded To Divide The Inheritance Unto The Children Of Israel In The Land Of Canaan

This closing line repeats language almost word for word from verse seventeen.

It frames the whole list of twelve names as one complete unit.

Twelve leaders total, one priest, one military successor, and ten tribal princes, now stand ready.

The land was already described in full detail, now the people match the plan.

🔁 Closing words echo verse seventeen exactly

👥 Twelve leaders total stand ready

🗺️ The land was already fully described

📖 People are now matched to the plan
`.trim();

export const NUMBERS_THIRTY_FOUR_PERSONAL_SECTIONS = parseNumbersThirtyFourRawNotes(NUMBERS_THIRTY_FOUR_RAW_NOTES);
