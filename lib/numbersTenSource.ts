export type NumbersTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTenRawNotes(rawText: string): NumbersTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 10:${startVerse}` : `Numbers 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Numbers 10 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TEN_RAW_NOTES = `# Numbers 10:1-4
# 🎺 Two Trumpets Of Silver
---
## 🔨 Make Thee Two Trumpets Of Silver
These are straight metal trumpets (Hebrew hatzotzerah), completely different from the ram's-horn shofar used elsewhere in the Law. Silver was a valuable, precious metal, so making the camp's signal instruments out of it marked them as something set apart, not ordinary noise-makers.
🔨 Straight metal trumpets, not the ram's-horn shofar
💰 Silver marked them as valuable and set apart
🔑 Two very different instruments, two very different jobs
---
## ⚒️ Of A Whole Piece Shalt Thou Make Them
"Of a whole piece" means hammered and shaped from a single block of silver, not welded together from separate parts. This is the same construction method used for the golden lampstand and the cherubim on the mercy seat - no fragile seams, built to last.
⚒️ Hammered from one solid piece, no seams
🕯️ Same building method used for the golden lampstand
🔑 Built for durability, not quick or cheap construction
---
## 📯 For The Calling Of The Assembly, And For The Journeying Of The Camps
One instrument, two completely different uses. The rest of the chapter spells out exactly how the same trumpets could mean "everyone gather here" one moment and "start marching" the next, depending on how they were blown.
📯 One instrument built to send two very different messages
🚶 The difference is entirely in how it's blown
🔑 Sets up the signal system explained in the verses that follow
---
## 🚪 All The Assembly Shall Assemble Themselves...At The Door Of The Tabernacle
When both trumpets sounded together, the whole nation gathered, and specifically at one place - the tabernacle's entrance. Every all-camp gathering pointed people back toward God's dwelling place at the center of camp, not some random meeting spot.
🚪 Both trumpets together called the entire nation
⛺ The gathering point was always the tabernacle's own door
🔑 Every full assembly centered on God's presence, not convenience
---
## 🙋 If They Blow But With One Trumpet, Then The Princes...Shall Gather
A smaller, quieter signal for a smaller job: one trumpet alone called only the twelve tribal leaders named back in Numbers 1:5-15, not the whole camp. A leadership meeting didn't need to interrupt everyone else's day.
🙋 One trumpet called only the twelve tribal leaders
👥 A practical, smaller-scale version of the same system
🔑 Not every gathering needed the whole nation present

# Numbers 10:5-8
# 📯 Alarm Or Assembly
---
## 🚨 When Ye Blow An Alarm
"Alarm" describes a distinct pattern of short, sharp blasts (teruah), different from the plain, sustained tone used just for gathering people. Two different sounds carried two different meanings, almost like a simple code the whole camp learned to recognize.
🚨 A pattern of short, sharp blasts, not a plain tone
🎵 Different sounds carried different, specific meanings
🔑 A simple, learnable signal code for the entire camp
---
## 🧭 The Camps That Lie On The East Parts Shall Go Forward
This is the exact camp layout from Numbers 2:3-9 put into motion - Judah's division camped east, closest to the tabernacle's entrance, and marches first. The trumpet alarm is the literal cue that turns that fixed arrangement into an actual moving column.
🧭 Matches Judah's east-side camp position from Numbers 2
🚶 The alarm is the cue that starts the whole column moving
🔑 A blueprint from chapter 2 finally put into action
---
## 🔁 When Ye Blow An Alarm The Second Time...The South Side Shall Take Their Journey
A second alarm blast cued Reuben's division, camped south per Numbers 2:10-16. Only two directions get spelled out by name here, but the pattern implies a third and fourth alarm existed for the west and north divisions as well.
🔁 A second, distinct blast cued the south-side camp
🧩 Only two directions are named, but a full pattern is implied
🔑 A repeatable system, not a one-time set of instructions
---
## 🙅 Ye Shall Blow, But Ye Shall Not Sound An Alarm
For simply gathering the people without moving anywhere, the plain blow (from verse 3) was used instead of the alarm pattern. Keeping the two sounds clearly different prevented the whole camp from panicking or packing up by mistake.
🙅 A gathering call, not the marching-alarm pattern
😌 Kept the camp from mistaking "meet here" for "move now"
🔑 Two distinct sounds prevented dangerous confusion
---
## ✋ The Sons Of Aaron, The Priests, Shall Blow With The Trumpets
Only Aaron's priestly sons were authorized to sound these trumpets - not any Levite, and not any ordinary Israelite. Every command that moved the entire nation had to run through sanctioned, priestly hands.
✋ Only Aaron's priestly sons could sound the trumpets
🚫 Not open to any Levite or ordinary Israelite
🔑 National movement tied directly to authorized leadership
---
## ♾️ An Ordinance For Ever Throughout Your Generations
Not a temporary wilderness-only rule. This trumpet system was meant to continue long after Israel reached the promised land, and later generations kept using priestly trumpets even once they had a fixed temple instead of a portable tabernacle.
♾️ Meant to last well beyond the wilderness years
🏛️ Still used by later generations at the fixed temple
🔑 A permanent institution, not a temporary travel tool

# Numbers 10:9-10
# ⚔️ War And Worship
---
## ⚔️ If Ye Go To War In Your Land Against The Enemy That Oppresseth You
The wording is specific: this covers defending against an oppressor, not launching an offensive conquest. The trumpet's battlefield use is tied to being attacked first, not to starting a fight.
⚔️ Specifically defensive war against an oppressor
🛡️ Not a rule about starting offensive conquest
🔑 The trigger is being attacked, not attacking first
---
## 🙏 Ye Shall Be Remembered Before The LORD Your God, And Ye Shall Be Saved
The trumpet blast wasn't a military tactic meant to scare the enemy - it functioned almost like a prayer made audible, calling on God's own covenant promise to fight for Israel rather than relying on Israel's own strength.
🙏 Less a battle tactic, more an audible prayer
🤝 Calls on God's covenant promise to fight for them
🔑 Victory credited to God's remembering, not Israel's strength
---
## 🎉 In The Day Of Your Gladness...And In The Beginnings Of Your Months
Trumpets weren't only for danger. They also marked joyful, peaceful occasions - Israel's festivals and the new moon (rosh chodesh) that opened each Hebrew month, a monthly celebration built right into the calendar.
🎉 Also sounded on festival days and joyful occasions
🌙 "Beginnings of your months" means the new moon each month
🔑 One instrument for both danger and celebration
---
## 🔥 Ye Shall Blow With The Trumpets Over Your Burnt Offerings
The trumpet sound accompanied the sacrifices already commanded back in Leviticus 1 and expanded later in Numbers 28-29, turning a quiet ritual act into something the whole camp could hear happening.
🔥 Paired with the sacrifices already commanded in Leviticus
📢 Turned a quiet ritual into something audibly public
🔑 Worship made loud on purpose, not kept silent
---
## 📝 For A Memorial Before Your God: I Am The LORD Your God
"Memorial" is the same idea behind the twelve stones on the priest's breastplate in Exodus 28:29 - something physical (or here, audible) placed intentionally in front of God as a reminder of His people and His promises.
📝 "Memorial" echoes the breastplate stones of Exodus 28
🔔 An intentional reminder placed before God, not just for people
🔑 Sound used the same way a physical object was used elsewhere

# Numbers 10:11-13
# ☁️ The Cloud Lifts
---
## 📅 The Twentieth Day Of The Second Month, In The Second Year
A precise date: just over eleven months after leaving Egypt in Exodus 12, and about two months after the tabernacle's completion in Exodus 40:17. Israel has spent nearly a full year camped in one place at Sinai, receiving law after law.
📅 About eleven months after the Exodus from Egypt
⛺ Roughly two months after the tabernacle was finished
🔑 Nearly a full year spent camped in the same place
---
## 🌥️ The Cloud Was Taken Up From Off The Tabernacle
This is the exact signal described just one chapter earlier in Numbers 9:17, and the trumpet system from verses 1-10 finally put to real use. The cloud lifts, and the entire camp-order machinery from Numbers 2 starts moving for the first time.
🌥️ The exact cloud signal described in Numbers 9:17
📯 The trumpet system from this chapter now put into action
🔑 Chapter 2's blueprint finally becomes a real march
---
## 🏜️ The Wilderness Of Paran
A desert region north of Sinai, on the general route toward Canaan. Paran becomes Israel's base for a long stretch of the wilderness years, and it's the very place the twelve spies are later sent out from in Numbers 13:3.
🏜️ A desert region between Sinai and Canaan
🔍 Later the launching point for the twelve spies, Numbers 13
🔑 Israel's next home base for a long stretch of the journey
---
## ✋ According To The Commandment Of The LORD By The Hand Of Moses
Even though the cloud itself gave the visible signal, the text credits both God's command and Moses' human leadership together - the same partnership pattern already established at the end of Numbers 9.
✋ Credits both God's command and Moses' leadership together
🔁 The same pairing already set up at the end of Numbers 9
🔑 Divine guidance still worked through human leadership

# Numbers 10:14-17
# 🚩 Judah Leads The Way
---
## 🥇 In The First Place Went The Standard Of The Camp Of...Judah
This matches the marching order God laid out back in Numbers 2:9 exactly - Judah's division (Judah, Issachar, Zebulun) leads every march, the same as they camped closest to the tabernacle's east-facing entrance.
🥇 Matches the marching order set in Numbers 2:9
🧭 The same division that camped nearest the entrance, east
🔑 Camp position and march position were the same plan
---
## 👑 Over His Host Was Nahshon The Son Of Amminadab
The same leader named back in Numbers 1:7 and 2:3. Worth remembering: Nahshon's family line runs down to King David and eventually to Jesus (Matthew 1:4) - the man leading Israel's very first steps out of Sinai is also an ancestor of Israel's future king.
👑 The same captain already named in Numbers 1 and 2
✝️ His family line leads to David, and later to Jesus (Matthew 1:4)
🔑 Israel's first steps forward led by a future royal ancestor
---
## 🏗️ The Tabernacle Was Taken Down
The unglamorous work behind the scenes: before anyone could march, the entire sanctuary structure had to be fully disassembled - boards, curtains, coverings, all following the exact procedure laid out in Numbers 4.
🏗️ Had to be fully disassembled before any marching began
📋 Followed the detailed procedure from Numbers 4
🔑 A massive logistical task hidden behind one short verse
---
## 🚶 The Sons Of Gershon And The Sons Of Merari Set Forward, Bearing The Tabernacle
These two Levite families - responsible for the fabric coverings and the wooden frame, per Numbers 4:24-33 - travel early, right behind Judah. That early start matters, and the reason why becomes clear in the next section.
🚶 The two Levite families carrying the tent structure itself
📦 Responsible for coverings and frame, per Numbers 4
🔑 An early head start whose purpose shows up next

# Numbers 10:18-21
# 🏕️ Reuben And The Kohathites
---
## 🥈 The Standard Of The Camp Of Reuben Set Forward
Reuben's division (Reuben, Simeon, Gad) camped south of the tabernacle per Numbers 2:10-16, and marches second - exactly where their fixed camp position placed them in line.
🥈 Reuben's division camped south, per Numbers 2
🚶 Marches second, in the same order as their camp position
🔑 A predictable, already-established order, not a new decision
---
## 📦 The Kohathites Set Forward, Bearing The Sanctuary
"Sanctuary" here means the holy furniture specifically - the ark, table, lampstand, and altars (Numbers 4:4-15) - carried only by hand on poles, never loaded onto a cart, because of how sacred each piece was.
📦 "Sanctuary" means the ark, table, lampstand, and altars
🙌 Carried by hand on poles, never by cart
🔑 The most sacred cargo in the entire camp
---
## 🏗️ The Other Did Set Up The Tabernacle Against They Came
Here's the real logistical purpose of Judah and the Levites marching first: Gershon and Merari, who left earlier with the tent structure, have time to rebuild the tabernacle's frame and coverings before the Kohathites arrive with the furniture - so the ark never sits out in the open, even briefly.
🏗️ Gershon and Merari rebuild the tent before the furniture arrives
⏱️ The early head start from section 5 finally explained
🔑 The most sacred items were never left exposed, even briefly

# Numbers 10:22-25
# 🚩 Ephraim And Dan
---
## 🥉 The Standard Of The Camp Of The Children Of Ephraim Set Forward
Ephraim's division (Ephraim, Manasseh, Benjamin) camped west per Numbers 2:18-24. Notice the family reunion this creates: Ephraim and Manasseh were Joseph's sons, and Benjamin was Rachel's other son - so this whole third division descends from Jacob's beloved wife.
🥉 Ephraim's division camped west, per Numbers 2
👨‍👩‍👦 Ephraim, Manasseh, and Benjamin all descend from Rachel
🔑 One division built entirely around Rachel's family line
---
## 🛡️ Which Was The Rereward Of All The Camps
"Rereward" is old English for rearguard. Dan's division (Dan, Asher, Naphtali) marched last, watching the back of this massive column of people, animals, and wagons for any surprise threat from behind.
🛡️ "Rereward" is old English for rearguard
🚶 Dan's division marched last, protecting the rear
🔑 The most vulnerable position, deliberately guarded
---
## 🧭 Ahiezer The Son Of Ammishaddai
Dan's captain's name means "my brother is help" - a fitting name for the leader of the division whose entire job was watching over the community's most exposed, trailing edge.
🧭 His name means "my brother is help"
🛡️ A fitting name for the leader guarding the rear
🔑 Even names in these lists sometimes carry meaning

# Numbers 10:26-28
# 📜 The March, In Order
---
## ✅ Thus Were The Journeyings Of The Children Of Israel According To Their Armies
A closing summary line confirming this exact order - Judah first, then Reuben, then the Kohathites with the furniture, then Ephraim, then Dan bringing up the rear - wasn't a one-time arrangement. It became the standard formation used every time camp broke for the rest of the wilderness years.
✅ Confirms this order became the standard, repeated pattern
🔁 Used every time camp broke for the rest of the journey
🔑 One march described here stands in for every future march
---
## ⚔️ According To Their Armies
"Armies" (tsaba) is military language, the same word used for the census counts back in Numbers 1. Even in ordinary travel, Israel moved with military-style discipline and formation, not as a loose, disorganized crowd.
⚔️ The same military word used for the Numbers 1 census counts
🚶 Discipline and formation, even during ordinary travel
🔑 A structured nation on the move, not a scattered crowd

# Numbers 10:29-32
# 🤝 Moses And Hobab
---
## 👪 Hobab, The Son Of Raguel The Midianite, Moses' Father In Law
A family detail worth untangling: Raguel is another name for Jethro (also called Reuel in Exodus 2:18), Moses' father-in-law from Exodus 18. Hobab appears to be Jethro's son, making him Moses' brother-in-law - though the exact relationship is debated among translators. Either way, this is the same Midianite family that sheltered Moses and gave him Zipporah as a wife.
👪 Raguel is another name for Jethro, Moses' father-in-law
🤔 Hobab appears to be Jethro's son, so likely Moses' brother-in-law
🔑 The same Midianite family that took Moses in during Exodus 2
---
## 🗺️ We Are Journeying Unto The Place Of Which The LORD Said, I Will Give It You
Moses openly names the destination as the same promised land God pledged to Abraham back in Genesis 12:7 and reaffirmed at the burning bush in Exodus 3:8. This march has a specific target, not just aimless wandering.
🗺️ The same land promised to Abraham in Genesis 12:7
🔥 Reaffirmed to Moses at the burning bush, Exodus 3:8
🔑 A named destination, not an aimless journey
---
## 🙅 I Will Not Go; But I Will Depart To Mine Own Land, And To My Kindred
Hobab's honest refusal - he already has a home and family of his own, and leaving them behind for an uncertain, possibly years-long wilderness journey is a real, costly ask, not a simple favor.
🙅 An honest refusal, not rudeness
🏠 He already had his own land and family to return to
🔑 A genuinely costly request, not a small favor
---
## 👁️ Thou Mayest Be To Us Instead Of Eyes
Moses' sharper follow-up appeal: Hobab, having actually lived in this desert region, knew practical survival details - water sources, safe paths, terrain - that the cloud's guidance didn't spell out on its own. God's supernatural leading and human, on-the-ground expertise weren't treated as competing, but as working together.
👁️ Hobab's local desert knowledge filled a real, practical gap
🌵 Water sources, safe paths, and terrain the cloud didn't spell out
🔑 Divine guidance and human expertise working side by side
---
## 🤝 What Goodness The LORD Shall Do Unto Us, The Same Will We Do Unto Thee
Moses renews his offer with a firmer, more personal promise - not just vague future blessing, but Israel's direct commitment to share whatever good they receive with Hobab specifically. Later, Judges 1:16 and 4:11 mention Hobab's descendants, the Kenites, still living alongside Israel - suggesting he, or at least his family, may have ultimately said yes.
🤝 A firmer, more personal repeat of the earlier offer
👨‍👦 Judges 1:16 and 4:11 later mention his descendants, the Kenites
🔑 A hint that the family did eventually stay close to Israel

# Numbers 10:33-36
# ⛺ The Ark Goes Before Them
---
## ⛰️ They Departed From The Mount Of The LORD Three Days' Journey
"The mount of the LORD" is Sinai itself. After roughly eleven months camped there, Israel is finally, physically leaving - a real turning point in the story, closing out the long Sinai chapter of the book.
⛰️ "The mount of the LORD" means Mount Sinai
📆 Israel leaves after almost eleven full months camped there
🔑 A genuine turning point, not just another travel note
---
## 📦 The Ark Of The Covenant Of The LORD Went Before Them...To Search Out A Resting Place
Notably different from the usual order in chapter 2, where the ark traveled in the middle of camp with the Kohathites. Here it moves out ahead of everyone, almost like a scout, marking each new resting place before the rest of the nation arrives.
📦 Different from the ark's usual mid-camp position, Numbers 2
🔍 Moves ahead of the camp like a scout, this time only
🔑 A special arrangement for this particular stretch of travel
---
## 🌥️ The Cloud Of The LORD Was Upon Them By Day
A quick callback tying this specific journey to the daily cloud-and-fire guidance system just described in Numbers 9:15-23 - the system already explained in theory is now shown actually running, day by day.
🌥️ Ties back to the guidance system explained in Numbers 9
📖 Theory from chapter 9 now shown actually in motion
🔑 The daily pattern already promised is now being lived out
---
## 🙏 Rise Up, LORD, And Let Thine Enemies Be Scattered
Moses speaks this short prayer every time the ark set out to travel. Jewish tradition later calls it part of "the Song of the Ark," and some Hebrew Bibles even mark these two verses off with special inverted letters, showing they were treated as their own distinct, self-contained unit within the text.
🙏 Spoken by Moses every time the ark set out to travel
📜 Later called part of "the Song of the Ark" in Jewish tradition
🔑 Marked off in some Hebrew Bibles as its own distinct unit
---
## 🛡️ Let Them That Hate Thee Flee Before Thee
Israel's enemies and God's enemies are treated as one and the same here. The ark's advance into new territory wasn't framed as Israel's own military strength doing the work, but as God Himself going out ahead to fight.
🛡️ Israel's enemies and God's enemies treated as identical
⚔️ Credits God going out to fight, not Israel's own strength
🔑 The ark's movement pictured as God Himself advancing
---
## 🔄 Return, O LORD, Unto The Many Thousands Of Israel
The closing half of the same short liturgy, spoken when the ark came to rest. "Return" pictures God's presence coming back to settle among the camp again after leading the charge forward, and "the many thousands" echoes the massive population counted back in Numbers 1.
🔄 The closing half, spoken when the ark came to rest
⛺ Pictures God's presence settling back among the camp
🔑 "Many thousands" echoes the Numbers 1 census count
`;

export const NUMBERS_TEN_PERSONAL_SECTIONS = parseNumbersTenRawNotes(NUMBERS_TEN_RAW_NOTES);
