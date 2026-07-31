export type NumbersTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwentyRawNotes(rawText: string): NumbersTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 20:${startVerse}` : `Numbers 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Numbers 20 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_RAW_NOTES = `# Numbers 20:1-6
# 🏜️ Miriam Dies, The People Rebel Again
---
## 🏕️ Into The Desert Of Zin...Abode In Kadesh
The desert of Zin sits on the southern edge of Canaan, and Kadesh was a key oasis inside it - the same place where the twelve spies gave their unfaithful report back in Numbers 13-14. The text quietly jumps forward here: nearly 38 years have passed since that earlier visit, and this is essentially a new generation arriving at the same spot their parents once refused to trust God at.
🏜️ The desert of Zin sits on Canaan's southern border
🔁 Kadesh is the same oasis from the spies' unfaithful report
🔑 A new generation returns to the very place the old one failed

## 👩 Miriam Died There, And Was Buried There
Miriam is Moses and Aaron's older sister - the girl who watched over baby Moses in the basket (Exodus 2), who led the women in song after the Red Sea crossing (Exodus 15), and who was struck with leprosy for opposing Moses' authority in Numbers 12. Her death opens a chapter that will also take Aaron - the first cracks in the leadership team that has led Israel since Egypt.
👩 Miriam led the women's song at the Red Sea and once opposed Moses
☠️ Her death is stated in a single quiet sentence, no ceremony described
🔑 The first of three wilderness leaders to die in this closing stretch

## 💧 There Was No Water For The Congregation
This is the second time in Israel's story a water shortage sparks a crisis - the first was at Rephidim early in the journey, in Exodus 17. A whole generation later, with mostly new people in the camp, the underlying problem repeats: physical need turning immediately into complaint instead of prayer.
💧 The same kind of water crisis already happened once, in Exodus 17
👥 This time it's a new generation, not the one that left Egypt
🔑 The problem was never really about water - it was about trust

## 😠 The People Chode With Moses
"Chode" is the old past-tense form of "chide," meaning to argue or quarrel bitterly. This isn't a calm complaint - it's an angry confrontation aimed straight at their two leaders.
😠 "Chode" means argued or quarreled sharply
🗣️ Directed personally at Moses and Aaron, not just spoken in general
🔑 Sets the emotional temperature for everything that follows

## ☠️ Would God That We Had Died When Our Brethren Died
This is an old idiom meaning "we wish we had died," using God's name as part of the wish itself. It's dramatic, bitter hyperbole - the same kind of despairing language the people used back in Numbers 14, wishing they'd died rather than face hardship.
☠️ An idiom meaning "we wish we had died"
🔁 Nearly identical language to the despair voiced in Numbers 14
🔑 Real fear expressed as an exaggerated death-wish, not literal intent

## 🍇 No Place Of Seed, Or Of Figs, Or Of Vines, Or Of Pomegranates
These are exactly the kinds of crops the twelve spies carried back from Canaan as proof of the land's richness in Numbers 13:23, and the same crops later listed as part of the promised land's bounty in Deuteronomy 8:8. Complaining about their absence here is a bitter irony - the land with all of this was available a whole generation ago, and their parents refused to enter it.
🍇 The exact crops the spies once brought back as proof of Canaan's richness
📖 The same list Deuteronomy 8:8 later uses to describe the good land
🔑 What they're missing was already offered to their parents and rejected

## 🙇 Fell Upon Their Faces
Moses and Aaron respond to the accusations not by arguing back, but by falling facedown before God at the tabernacle door - the same posture Moses and Aaron took toward the rebellious congregation in Numbers 14:5. It's a plea for help, not a retreat from responsibility.
🙇 The same posture of pleading used during the spies' rebellion in Numbers 14
🚪 Done specifically at the tabernacle door, not in front of the crowd
🔑 Turning to God first instead of arguing back with the people

## ✨ The Glory Of The LORD Appeared Unto Them
This is the same visible sign of God's presence that filled the tabernacle in Exodus 40 and Leviticus 9 - not a vague feeling, but a real, appearing manifestation. Its arrival here signals God is about to act, not ignore the crisis.
✨ The same visible presence that filled the tabernacle in Exodus 40
👁️ A real appearance, not a private inner sense
🔑 Signals God is already moving to answer, before Moses even asks

# Numbers 20:7-9
# 🪨 Speak To The Rock
---
## 🪄 Take The Rod
The most likely rod meant here is Aaron's rod that budded, the one God had just commanded be kept permanently before the Testimony at the end of Numbers 17 as a sign against future rebellion. Taking that specific rod into this new crisis carries its own quiet warning, even before anything goes wrong.
🪄 Likely Aaron's rod that budded, kept before the Testimony in Numbers 17
⚠️ Its very presence carries a warning against rebellion
🔑 A sign from the last rebellion brought into the next one

## 🗣️ Speak Ye Unto The Rock Before Their Eyes
God's instruction is precise: speak to the rock, don't strike it, and do it where the whole community can watch. This single word - speak - is the detail everything in the next section hinges on.
🗣️ The command is to speak, not strike
👀 Done publicly, "before their eyes," as a witnessed miracle
🔑 This one word becomes the hinge the rest of the chapter turns on

## 🐄 Give The Congregation And Their Beasts Drink
The miracle has to be large enough to water not just the people but all their livestock too - a huge volume of water needed for a wilderness community that size. This isn't a small provision; it's a massive, visible display of God's care.
🐄 Water enough for the whole camp's people and livestock
📏 A miracle sized for an entire nation's needs, not a token gesture
🔑 Meant to be unmistakably large and unmistakably from God

## ✅ Moses Took The Rod From Before The LORD, As He Commanded Him
So far, Moses does exactly what he's told - he takes the correct rod from its place before the Testimony. The failure that's about to happen isn't in this step; it comes in how Moses uses the rod once he reaches the rock.
✅ Moses obeys this first instruction exactly
🪄 Takes the rod from where it had been kept since Numbers 17
🔑 The coming failure is in the method, not in this opening obedience

# Numbers 20:10-13
# 😡 Moses Strikes The Rock Twice
---
## 😤 Hear Now, Ye Rebels
Moses' tone here is sharp and angry, calling the whole congregation "rebels" to their faces. It's a real shift from earlier, more patient responses to complaints - forty years of leading this same kind of grumbling has clearly worn on him.
😤 A harsh, angry address - calling the people "rebels" outright
📉 A noticeable shift from Moses' earlier, more patient responses
🔑 Decades of repeated complaints finally boiling over

## 🙋 Must We Fetch You Water Out Of This Rock
Moses says "we," folding himself and Aaron into the credit for a miracle that belongs to God alone. That small word choice - claiming the act instead of pointing entirely to God - becomes part of exactly what God calls out as the failure in verse 12.
🙋 Moses says "we," not "God," about to produce the water
⚖️ A subtle claim of credit that God directly addresses next
🔑 Small in the moment, but named as the actual offense

## 🔨 Smote The Rock Twice
Instead of speaking to the rock as instructed, Moses strikes it - and strikes it twice, not once. This echoes Exodus 17, where God had actually commanded Moses to strike a rock for water years earlier; Moses may be repeating what worked before instead of listening to this new, different instruction.
🔨 Moses strikes the rock instead of speaking to it
🔁 Echoes Exodus 17, where striking a rock WAS the correct command back then
🔑 Old habits substituted for a new, specific instruction

## 💦 The Water Came Out Abundantly
Despite Moses' disobedience, the miracle still works - water pours out generously for the whole camp and their animals. God's provision for the people isn't withheld because of their leaders' failure; the judgment that follows falls on Moses and Aaron specifically, not on the thirsty crowd.
💦 The water still flows generously, despite how it was produced
🙏 The people's need is met even though the leaders disobeyed
🔑 Grace toward the crowd, judgment reserved for the leaders

## 🚫 Because Ye Believed Me Not, To Sanctify Me
"Sanctify" means to treat as holy - to represent God's character accurately and trustworthily in front of others. The failure wasn't a small procedural mistake; it was a public misrepresentation of who God is, done in front of the very nation watching Moses and Aaron lead.
🚫 "Sanctify" means to treat as holy and trustworthy
👀 The failure happened publicly, in front of the whole nation
🔑 A leadership failure to represent God's character correctly

## 🚷 Ye Shall Not Bring This Congregation Into The Land
The consequence is enormous: both Moses and Aaron - not just Moses - are barred from entering the promised land they've led Israel toward for forty years. One moment of disobedience costs both leaders the destination of their entire life's work.
🚷 Both Moses AND Aaron are barred, not Moses alone
⏳ The cost of one moment after forty years of leadership
🔑 Even Israel's greatest leaders weren't exempt from consequences

## 📛 This Is The Water Of Meribah
"Meribah" means strife or contention. There's already an earlier place given this same name in Exodus 17 - a different location, but the same word, marking a second place in Israel's story defined by arguing with God over water.
📛 "Meribah" means strife or contention
🔁 A second place in Israel's journey carrying this exact name
🔑 A recurring label for Israel's pattern of quarreling with God

## ✨ He Was Sanctified In Them
Even though Moses and Aaron failed to represent God rightly, God's holiness still comes through in how the whole event resolves - both in the judgment on the leaders and in the mercy shown to the thirsty people. God's character gets vindicated either way.
✨ God's holiness is shown even through a leadership failure
⚖️ Comes through both the judgment and the mercy in this one event
🔑 God's reputation didn't depend on Moses and Aaron getting it right

# Numbers 20:14-17
# ✉️ Messengers To The King Of Edom
---
## 👑 Unto The King Of Edom...Thy Brother Israel
Edom descends from Esau, Jacob's twin brother (Genesis 36), which makes "thy brother Israel" more than polite diplomatic language - it's a direct appeal to an actual, centuries-old family relationship. Moses is asking a literal relative for a favor.
👑 Edom descends from Esau, Jacob's twin brother
🤝 "Brother" is a real family claim, not just a diplomatic nicety
🔑 An appeal built on genuine kinship, not just courtesy

## 😩 Thou Knowest All The Travail That Hath Befallen Us
"Travail" means hard labor or intense suffering. Moses assumes Edom already has some awareness of Israel's hardships, appealing to shared knowledge before asking for anything.
😩 "Travail" means hard labor or suffering
📢 Assumes Edom already knows something of Israel's story
🔑 Building common ground before making the actual request

## 📜 Cried Unto The LORD, He Heard Our Voice, And Sent An Angel
Moses compresses the entire Exodus story - slavery, crying out, and rescue - into a few short lines, and specifically credits an angel with leading them out. This likely points back to God's promise in Exodus 23:20 to send a messenger ahead of Israel on their journey.
📜 A condensed retelling of the whole Exodus story
👼 The "angel" likely recalls God's promise in Exodus 23:20
🔑 Israel's own summary of their story: crying out, then rescue

## 🗺️ Kadesh, A City In The Uttermost Of Thy Border
This detail explains why Edom's permission even matters - Kadesh sits right against the edge of Edom's territory, so passing through their land is the natural route forward. It's a practical, geographic reason for the whole request.
🗺️ Kadesh sits directly against Edom's territorial border
🚶 Explains why passing through Edom's land was the natural route
🔑 A geographic fact, not just a diplomatic preference

## 🛣️ We Will Go By The King's Highway
This isn't a vague phrase - the King's Highway was a real, well-known ancient trade route running north-south through the region east of the Jordan. Naming it specifically shows Israel isn't asking to wander freely through Edom's land, only to travel one known, established road.
🛣️ A real, specific ancient trade route, not a vague description
📍 Naming it shows exactly how limited the request actually is
🔑 A narrow, specific ask rather than an open-ended one

## 🚫 We Will Not Pass Through The Fields, Or Through The Vineyards
Israel spells out exactly what they promise not to touch - crops and vineyards - along with a promise not to drink from any wells without payment. These are careful assurances meant to show this is a peaceful transit request, not the start of an invasion.
🚫 Specific promises: no crops touched, no wells drunk from freely
🕊️ Careful assurances meant to show peaceful intent
🔑 A deliberately narrow, non-threatening request

# Numbers 20:18-21
# 🚫 Edom Refuses
---
## ⚔️ Thou Shalt Not Pass By Me, Lest I Come Out Against Thee With The Sword
Edom's answer is an immediate, flat refusal backed by an explicit threat of violence - despite Moses having just appealed to their shared family history. The old rivalry between Jacob and Esau (Genesis 27, 33) appears to still color how their descendants treat each other centuries later.
⚔️ A flat refusal paired with a direct threat of violence
👥 Comes right after Moses appealed to their shared "brother" history
🔑 An old family rivalry still shaping how their nations relate

## 💰 If I And My Cattle Drink Of Thy Water, Then I Will Pay For It
Israel responds with an even more generous offer than before, promising to pay for anything they use rather than take it freely. "I will only, without doing anything else, go through on my feet" is an idiom for simply walking through with no other agenda - no fighting, no settling, nothing but passage.
💰 A second, even more generous offer - full payment for anything used
🚶 "Go through on my feet" means simply walking through, nothing more
🔑 Israel de-escalates rather than pushing back harder

## 🛡️ Edom Came Out Against Him With Much People, And With A Strong Hand
Edom's response escalates from words to an actual show of armed force - not just a refusal this time, but troops mobilized and positioned to physically block Israel's path.
🛡️ Words turn into an actual military mobilization
📈 A clear escalation from the first flat refusal
🔑 Edom backs its threat with a genuine show of force

## ↩️ Israel Turned Away From Him
Rather than force the issue, Israel simply withdraws and finds another route. This restraint matches later instructions in Deuteronomy 2:4-5, where God specifically tells Israel not to contend with Edom, since God had already given Edom their own land as Esau's inheritance.
↩️ Israel chooses to withdraw rather than fight
📖 Matches Deuteronomy 2:4-5's later command not to contend with Edom
🔑 Restraint here, even though Israel had every reason to push through

# Numbers 20:22-24
# ⛰️ Journey To Mount Hor
---
## ⛰️ Journeyed From Kadesh, And Came Unto Mount Hor
Mount Hor sits on the edge of Edom's territory, and the move here marks Israel finally leaving the Edom standoff behind and continuing its long journey toward the promised land.
⛰️ Located on the edge of Edom's territory
➡️ Marks the end of the Edom standoff and a return to the journey
🔑 The story moves forward even after being turned away

## 🗺️ By The Coast Of The Land Of Edom
"Coast" in the King James Bible almost always means border or region, not a seashore - Edom has no relevant sea coast in this context. This is simply saying Mount Hor sits along Edom's edge.
🗺️ "Coast" here means border or edge, not an actual seashore
📖 A common older meaning of the word throughout the KJV
🔑 An easy word to misread with its modern meaning

## ⚖️ He Shall Not Enter Into The Land...Because Ye Rebelled At Meribah
This directly carries out the judgment God already announced back in verse 12, and it happens relatively soon afterward - not as some distant, far-off consequence. Aaron's sentence catches up with him quickly.
⚖️ Fulfills the judgment first announced back in verse 12
⏱️ Happens soon after, not as a distant future consequence
🔑 A sentence pronounced and then carried out within the same chapter

# Numbers 20:25-29
# 👳 Aaron's Death, The Priesthood Passes On
---
## 👔 Strip Aaron Of His Garments, And Put Them Upon Eleazar
Aaron's priestly garments, detailed back in Exodus 28-29, aren't just clothing - they represent the high priest's office itself. Physically moving them from Aaron onto Eleazar is a visible, deliberate ceremony transferring the priesthood, not a private or quiet handoff.
👔 The garments represent the office of high priest, not just clothes
🔄 Moving them physically transfers the priesthood itself
🔑 A public, visible ceremony, not a quiet private handoff

## 👨‍👦 Eleazar His Son
Eleazar had already been given priestly responsibility in Numbers 19's red heifer ritual, a task involving death and impurity that a reigning high priest would normally avoid. That earlier assignment quietly foreshadowed exactly this moment - Eleazar stepping fully into his father's role.
👨‍👦 Already given priestly duty in Numbers 19's red heifer ritual
🔮 That earlier task quietly foreshadowed this full succession
🔑 A transition already being prepared for one chapter earlier

## 👥 In The Sight Of All The Congregation
Like the water miracle earlier in the chapter, Aaron's death is staged as something the whole community watches. It's treated as a major, public transition of national leadership, not a private family loss handled away from the people.
👥 Witnessed publicly by the whole community
🏛️ Treated as a national leadership transition, not a private matter
🔑 Contrasts with Miriam's death, told in a single quiet verse

## ⛰️ Moses And Eleazar Came Down From The Mount
Moses personally performs the ceremony that ends his own brother's life, then walks back down the mountain without him. It's a quiet but heavy detail - the same leader who has carried Israel through every crisis in this chapter now carries this loss too, and keeps leading anyway.
⛰️ Moses personally leads the ceremony ending his brother's life
🚶 Then walks back down the mountain without him
🔑 Grief carried privately while leadership continues publicly

## 😢 Mourned For Aaron Thirty Days
Thirty days of formal, national mourning is a significant, specific length of time - the same period later given to Moses himself after his death in Deuteronomy 34:8. Very few individuals in the Old Testament receive this kind of extended, nationwide mourning.
😢 A specific thirty-day period of formal national mourning
🔁 The same length of mourning later given to Moses in Deuteronomy 34:8
🔑 Marks Aaron among the very few given this level of national grief
`;

export const NUMBERS_TWENTY_PERSONAL_SECTIONS = parseNumbersTwentyRawNotes(NUMBERS_TWENTY_RAW_NOTES);
