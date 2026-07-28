export type NumbersThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersThreeRawNotes(rawText: string): NumbersThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 3:${startVerse}` : `Numbers 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Numbers 3 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_THREE_RAW_NOTES = `# Numbers 3:1-4
# 👨‍👩‍👦 Aaron's Sons, And A Tragedy Behind The List
---
## 📜 These Also Are The Generations Of Aaron And Moses
"Generations" translates the Hebrew word toledot, meaning a family record or history - the same word that opens Genesis 2:4 and many other sections of the Torah. Even though both men are named, the list that follows is really Aaron's family alone, because this chapter is about who gets to serve as priest, and priesthood runs through Aaron, not Moses.
📜 "Generations" (toledot) means a family record or history
👨‍👦 Only Aaron's sons are actually listed next, not Moses's
⛰️ Given "in mount Sinai" - the same setting as the rest of this book so far
---
## 👦 Nadab The Firstborn, And Abihu, Eleazar, And Ithamar
Four sons, named in birth order. Nadab, as firstborn, would normally have expected the greatest honor and the clearest path to becoming high priest after Aaron - a normal expectation this chapter is about to overturn.
👦 Four sons of Aaron, listed oldest to youngest
👑 Nadab, as firstborn, would normally expect the most honor
⚠️ That expectation is about to be undone in the very next verse
---
## ⚱️ Whom He Consecrated To Minister In The Priest's Office
"Consecrated" means formally set apart and ordained for holy service - the ceremony for this is described in detail back in Exodus 29 and Leviticus 8. All four sons went through that same ordination together, before anything went wrong.
⚱️ "Consecrated" means formally set apart for holy service
📖 The ordination ceremony itself is in Exodus 29 and Leviticus 8
🤝 All four brothers were ordained together, as equals
---
## 🔥 Nadab And Abihu Died Before The Lord, When They Offered Strange Fire
This is a flashback to Leviticus 10:1-2, where Nadab and Abihu offered "strange fire" - incense lit in a way God never commanded, using a source of fire other than the one He specified. Fire came out from the Lord and killed them both, right in the middle of their own ordination week.
🔥 "Strange fire" means an offering God never authorized or commanded
📖 The full story is told in Leviticus 10:1-2
💔 It happened during the very week of their own ordination
---
## 👶 They Had No Children
This detail matters for exactly one reason: no sons means no line through Nadab or Abihu to inherit the high priesthood. Their deaths didn't just cost them their own lives - it permanently redirected the entire priestly line to their younger brothers.
👶 No sons meant no future priestly line through either man
🔀 The high priesthood permanently shifts to the two younger brothers
📉 One moment of disobedience reshaped generations of Israel's worship
---
## 🙏 Eleazar And Ithamar Ministered In The Priest's Office In The Sight Of Aaron Their Father
"In the sight of" means under Aaron's direct supervision while he was still alive - the two surviving sons served alongside their father rather than immediately replacing him. Eleazar, the older of the two, will eventually succeed Aaron as high priest (Numbers 20:28).
🙏 "In the sight of" means serving under Aaron's direct watch
👴 Aaron was still alive and leading during this time
🔜 Eleazar will later succeed his father as high priest (Numbers 20:28)

# Numbers 3:5-10
# 🎁 The Levites Given To Aaron
---
## 👋 Bring The Tribe Of Levi Near
This command separates two things a modern reader might assume are the same: the priesthood (only Aaron and his direct male descendants) and the Levites (the entire tribe of Levi, including Aaron's own relatives). Every priest is a Levite, but not every Levite is a priest - this chapter exists to explain what the rest of the tribe does instead.
👋 Priesthood belongs only to Aaron's own descendants
🌳 "Levites" means the whole tribe of Levi, a much bigger group
🔑 This chapter defines the difference between the two
---
## 🤝 Present Them Before Aaron The Priest, That They May Minister Unto Him
The Levites' job isn't to offer sacrifices themselves - it's to serve and assist the priests who do. Think of it as the difference between the small number of people authorized to perform surgery and the much larger support staff who make sure the operating room actually runs.
🤝 Levites assist the priests; they don't perform sacrifices themselves
🏥 A support role, not a lesser version of the same job
📋 This division of labor is set up formally in this chapter
---
## 📋 Keep His Charge, And The Charge Of The Whole Congregation
"Charge" means an assigned duty or watch - something entrusted to someone's responsibility and care. This word appears so often in the rest of the chapter that it's worth locking in now: whenever "charge" shows up below, it means "the specific job God assigned to this group."
📋 "Charge" means an assigned duty entrusted to someone's care
🔁 This exact word repeats constantly through the rest of the chapter
🔑 Worth defining once clearly, since it carries the whole chapter
---
## 🧰 Keep All The Instruments Of The Tabernacle Of The Congregation
"Instruments" means the tabernacle's furnishings, tools, and equipment - everything from the ark to the smallest basin. The Levites are caretakers of these objects, not owners; nothing here belongs to them personally.
🧰 "Instruments" means the tabernacle's furnishings and equipment
🙌 The Levites care for these objects; they don't own them
🏛️ Caretaking, not possession, is the whole relationship
---
## 🎁 The Levites Unto Aaron And To His Sons: They Are Wholly Given Unto Him
"Wholly given" means entirely, without exception or partial claim - the tribe of Levi belongs to priestly service completely, the way a person can't be half-drafted into an army. This total, unconditional dedication is the key idea of the whole chapter.
🎁 "Wholly given" means completely, with no partial claim
⛔ Not a part-time or occasional duty - a full-time calling
🔑 This total dedication is the key idea running through this chapter
---
## ⚠️ The Stranger That Cometh Nigh Shall Be Put To Death
"Stranger" here doesn't mean a foreigner in the ordinary sense - it means any unauthorized person, Israelite or not, who approaches sacred duties without the proper priestly or Levitical role. The death penalty sounds harsh to modern ears, but it's the text's way of showing how seriously God's holiness had to be guarded from casual or careless approach.
⚠️ "Stranger" means anyone unauthorized, not simply a foreigner
🚫 This warns against casual or careless approach to holy things
🔁 This exact warning repeats again later in this same chapter

# Numbers 3:11-13
# 👶 Levites Instead Of The Firstborn
---
## 👶 Instead Of All The Firstborn That Openeth The Matrix Among The Children Of Israel
"Openeth the matrix" is an old expression meaning the first child born from a mother's womb - simply, the firstborn. God is announcing a substitution: instead of claiming every family's actual firstborn son for His service, He will accept the whole tribe of Levi as a stand-in for all of them at once.
👶 "Openeth the matrix" is an old phrase for "the firstborn child"
🔄 God accepts the Levites as a substitute for every family's firstborn
🔑 One tribe stands in for every other tribe's oldest sons
---
## 🤝 Therefore The Levites Shall Be Mine
This is ownership language - not a metaphor, but a legal-sounding claim. The reason becomes clear in the very next verse: God is calling in a debt He's owed from the exodus itself.
🤝 "Mine" is a direct ownership claim, not just a figure of speech
🔜 The reason for this claim is explained in the next verse
📖 Sets up the Passover connection that follows
---
## 🌙 On The Day That I Smote All The Firstborn In The Land Of Egypt I Hallowed Unto Me All The Firstborn
This is a direct callback to the tenth plague and the first Passover night in Exodus 12. Because Israel's firstborn sons were spared that night while Egypt's were struck down, God declared every Israelite firstborn son already, permanently, His own - "hallowed" meaning set apart as holy, belonging to Him. The Levites in this chapter are how that permanent claim actually gets carried out in daily life, generation after generation, instead of every family literally handing over their own oldest son.
🌙 A direct callback to the first Passover night in Exodus 12
✝️ "Hallowed" means set apart as holy, already belonging to God
🔁 The Levites are how this old claim gets carried out in practice

# Numbers 3:14-20
# 🌳 Numbering The Sons Of Levi
---
## ⚔️ Number The Children Of Levi... Every Male From A Month Old And Upward
Numbers 1's census only counted men twenty years old and up, fit for war. This census is different on purpose - it counts every Levite male from one month old, because this isn't a military draft, it's a dedication count. Every Levite boy belongs to God's service from infancy, whether or not he'll ever be old enough to actually do the work.
⚔️ Numbers 1 counted only war-age men, twenty and up
👶 This census counts every Levite male from one month old
🔑 A dedication count, not a military one - infancy already counts
---
## ✅ Moses Numbered Them According To The Word Of The Lord, As He Was Commanded
The same obedience refrain heard throughout Numbers 1 and 2 shows up again here - a short reminder, easy to skim past, that every one of these numbers exists because Moses did exactly what he was told, not because he improvised a system of his own.
✅ The same short obedience refrain from chapters 1 and 2
📖 A reminder that this whole structure was commanded, not invented
🔁 Watch for this phrase - it bookends major sections all through Numbers
---
## 🌳 Gershon, And Kohath, And Merari
The three sons of Levi, listed in birth order - Gershon is the oldest. Yet as the rest of this chapter unfolds, Kohath's family receives the most prominent role and the most detailed instructions, because Aaron and Moses themselves descend from Kohath, not Gershon.
🌳 Levi's three sons, listed oldest to youngest: Gershon, Kohath, Merari
👑 Kohath, the middle son, gets the most prominent role ahead
🔑 That's because Moses and Aaron's own family line runs through Kohath
---
## 👨‍👦 Libni, And Shimei
Gershon's two sons, and the ancestors of the two Gershonite clans (the Libnites and Shimites) named a few verses later. Their names themselves don't carry a well-known meaning worth pausing on - what matters here is simply tracing the family tree one generation further.
👨‍👦 Gershon's two sons, ancestors of the Libnite and Shimite clans
📋 Simple family-tree tracing, one generation at a time
🔜 Both clan names reappear again just a few verses ahead
---
## 👨‍👦‍👦 Amram, And Izehar, Hebron, And Uzziel
Kohath's four sons - and Amram is the name to circle here: he's Moses and Aaron's own father, first introduced back in Exodus 6:20. This verse is quietly identifying exactly where Moses and Aaron's immediate family sits within the larger tribe of Levi.
👨‍👦‍👦 Kohath's four sons: Amram, Izehar, Hebron, and Uzziel
🔑 Amram is Moses and Aaron's own father (Exodus 6:20)
📍 This pinpoints Moses and Aaron's exact place in Levi's family tree
---
## 👨‍👦 Mahli, And Mushi
Merari's two sons, ancestors of the Mahlite and Mushite clans named just below. As with Gershon's sons, the point here is completing the full three-branch family tree of Levi before the chapter turns to counting and assigning each branch.
👨‍👦 Merari's two sons, ancestors of the Mahlite and Mushite clans
🌳 Completes all three branches of Levi's family tree
📊 Sets up the counting and camp assignments that follow

# Numbers 3:21-26
# 🏠 The Gershonites
---
## 🏷️ Of Gershon Was The Family Of The Libnites, And The Family Of The Shimites
Clan names formed directly from ancestor names, exactly like the tribal clans back in Numbers 1 - the Libnites descend from Libni, the Shimites from Shimei. This naming pattern (ancestor's name plus "-ite") repeats for every Levite clan in this chapter.
🏷️ Clan names come directly from each ancestor's own name
🔁 The same "-ite" naming pattern used throughout Numbers 1
📋 This pattern repeats for every Levite clan in this chapter
---
## 🔢 Seven Thousand And Five Hundred
7,500 - the total count of Gershonite males one month and up, the smallest of the three Levite clans (Merari's 6,200 is actually smaller - Gershon lands in the middle of the three).
🔢 7,500 Gershonite males, one month old and up
📊 The middle-sized of the three Levite clans
✅ A real headcount, not a rounded estimate
---
## 🏕️ The Families Of The Gershonites Shall Pitch Behind The Tabernacle Westward
This is a separate, inner camp arrangement from the twelve-tribe layout in Numbers 2. The tribes camp in an outer ring in four directions; the three Levite clans camp in their own tighter ring immediately around the tabernacle itself, in their own four directions.
🏕️ A separate, inner ring of camping - just for the three Levite clans
🧭 The Gershonites take the west side of this inner ring
🔲 Two layers of camp structure: outer tribes, inner Levites
---
## 👤 Eliasaph The Son Of Lael
A different man from the Eliasaph named back in Numbers 2:14, who led the tribe of Gad and was the son of Deuel. Two leaders sharing one name is a good reminder to always check a name's father before assuming it's the same person.
👤 A different Eliasaph than the one leading Gad in Numbers 2:14
👨‍👦 This one is "the son of Lael," not "the son of Deuel"
🔑 Always check the father's name before assuming it's the same person
---
## 🧵 The Tabernacle, And The Tent, The Covering Thereof, And The Hanging For The Door
The Gershonites' assigned duty is all soft, fabric-based material: the inner linen tabernacle curtains, the outer goat-hair tent layer, the protective coverings over both, and the entrance hangings. This sets up a pattern worth tracking through the rest of the chapter - each Levite clan is responsible for one category of material.
🧵 The Gershonites' duty: fabric, curtains, and coverings
🚪 Includes the tabernacle's entrance hanging as well
🔑 Watch for this pattern - each clan gets one category of material
---
## 🏛️ The Hangings Of The Court, And The Curtain For The Door Of The Court, And The Cords
The courtyard's linen walls, its own entrance curtain, and the cords used to secure everything - all still fabric and rope, continuing the same "soft materials" assignment given to Gershon. The next section's clan will be responsible for something very different.
🏛️ Courtyard fabric and cords - still all soft materials
🔗 Continues the exact category assigned to this one clan
🔜 A very different category of duty is coming up next

# Numbers 3:27-32
# 🕯️ The Kohathites
---
## 👨‍👩‍👦 Of Kohath Was The Family Of The Amramites, And The Family Of The Izeharites, And The Family Of The Hebronites, And The Family Of The Uzzielites
Four Kohathite clans, one for each of Kohath's four sons named earlier. The Amramites are Moses and Aaron's own immediate clan - meaning Moses and Aaron were themselves, personally, part of the group being counted and assigned duties in this very section.
👨‍👩‍👦 Four clans, one for each of Kohath's four sons
🔑 The Amramites are Moses and Aaron's own personal clan
📍 Moses and Aaron are literally part of the group this section counts
---
## 🔢 Eight Thousand And Six Hundred, Keeping The Charge Of The Sanctuary
8,600 - the largest of the three Levite clans, entrusted with the largest responsibility: the sanctuary's holiest objects, described just below.
🔢 8,600 - the largest of the three Levite clans
🏛️ Given the weightiest duty: caring for the sanctuary's holiest items
📈 Size and responsibility line up together here
---
## 🧭 Shall Pitch On The Side Of The Tabernacle Southward
South, on this inner Levite ring, happens to be the same direction Reuben's tribal division camped in the outer ring (Numbers 2:10) - a coincidence of direction, not a stated connection between the two groups, since these are two completely separate camp systems.
🧭 South on this inner ring - same direction as Reuben's outer division
🔲 A coincidence of direction, not a stated relationship
🔑 Two separate systems: tribal camp and Levite camp
---
## 📛 Elizaphan The Son Of Uzziel
Elizaphan's name likely means "God has protected." He's Kohath's own grandson - his father Uzziel was one of Kohath's four sons named in verse 19 - which makes Elizaphan a nephew of Amram, meaning he's a first cousin to Moses and Aaron, personally leading his own uncle's much larger branch of the family.
📛 Elizaphan likely means "God has protected"
👨‍👦 He's Kohath's grandson, making him Moses and Aaron's first cousin
👴 A younger cousin placed in charge of his own uncle's larger clan
---
## 🕯️ Their Charge Shall Be The Ark, And The Table, And The Candlestick, And The Altars, And The Vessels Of The Sanctuary
Where Gershon's clan handled soft fabric, Kohath's clan is entrusted with the tabernacle's actual furniture - the ark of the covenant, the table of shewbread, the golden candlestick, and both altars (incense and bronze), plus their sacred vessels. This is by far the holiest category of material in the whole tabernacle.
🕯️ Kohath's duty: the ark, table, candlestick, and both altars
📦 The literal furniture, not the fabric around it
⚠️ The single holiest category of objects in the whole tabernacle
---
## 👨‍⚖️ Eleazar The Son Of Aaron The Priest Shall Be Chief Over The Chief Of The Levites
Because Kohath's clan carries the most sacred objects in existence, God places a priest - not just a fellow Levite - directly over their oversight. This is an early hint of the strict warning coming in Numbers 4: these objects are so holy that even the Kohathites themselves aren't allowed to look at or directly touch them without a priest first wrapping them in coverings.
👨‍⚖️ A priest, not just a Levite, is placed over Kohath's oversight
⚠️ A hint of Numbers 4's strict warning about touching these objects
🔑 The holiest duty gets the closest priestly supervision

# Numbers 3:33-37
# 🪵 The Merarites
---
## 🏷️ Of Merari Was The Family Of The Mahlites, And The Family Of The Mushites
The two Merarite clans, named for Merari's two sons from verse 20. Merari's whole branch is about to be given the plainest, heaviest-duty job of the three Levite clans.
🏷️ Two clans, named for Merari's two sons from verse 20
🔜 About to be assigned the heaviest, plainest-duty job of the three
📋 The final branch of Levi's family tree covered in this chapter
---
## 🔢 Six Thousand And Two Hundred
6,200 - the smallest of the three Levite clans, fitting for the smallest of Levi's three sons in terms of descendants, though not necessarily in terms of the physical weight of their job.
🔢 6,200 - the smallest of the three Levite clans
📉 Fewer people, but not necessarily an easier assignment
⚖️ Size of a group and difficulty of its job aren't the same thing
---
## 📛 Zuriel The Son Of Abihail... Shall Pitch On The Side Of The Tabernacle Northward
Zuriel's name likely means "God is my rock." North completes three of the four directions in this inner Levite ring - Gershon west, Kohath south, Merari north - with one direction still left for the next section.
📛 Zuriel likely means "God is my rock"
🧭 North - the third of four directions in this inner Levite ring
🔜 One direction in this inner ring is still left to be assigned
---
## 🪵 The Boards Of The Tabernacle, And The Bars Thereof, And The Pillars Thereof, And The Sockets Thereof
Where Gershon carried fabric and Kohath carried furniture, Merari's clan carries the heavy wooden frame and metal fittings - literally the tabernacle's skeleton. Between the three clans, every single physical category of the tabernacle now has an assigned caretaker: soft materials, sacred furniture, and structural frame.
🪵 Merari's duty: the wooden boards, bars, pillars, and sockets
🦴 Literally the tabernacle's structural skeleton
✅ Fabric, furniture, and frame - all three categories now covered
---
## 🏛️ The Pillars Of The Court Round About, And Their Sockets, And Their Pins, And Their Cords
The heavy structural elements of the courtyard boundary too - not just the tabernacle building itself, but the fence-like perimeter around the whole sacred complex. Merari's job across this whole section is consistently the load-bearing, structural half of the tabernacle system.
🏛️ Courtyard structural pieces, not just the tabernacle building
🔩 Consistently the load-bearing, heavy half of the whole system
📦 A physically demanding job, matched to a smaller headcount

# Numbers 3:38-39
# 🌅 Moses And Aaron Guard The Entrance
---
## 🌅 Before The Tabernacle Toward The East... Shall Be Moses, And Aaron And His Sons
The fourth and final position in the inner Levite ring - and it's reserved for Moses, Aaron, and Aaron's sons personally, camped at the tabernacle's own front entrance. East was already established back in Numbers 2 as the direction of highest honor, facing the sunrise and the tabernacle's own doorway - the same pattern repeats here, one ring closer to the center.
🌅 East - the place of highest honor, right at the tabernacle's own door
👨‍👨‍👦 Reserved specifically for Moses, Aaron, and Aaron's sons
🔁 The same east-equals-honor pattern from Numbers 2, one ring inward
---
## 🔁 Keeping The Charge Of The Sanctuary For The Charge Of The Children Of Israel; And The Stranger That Cometh Nigh Shall Be Put To Death
This is the same warning already given back in verse 10 - repeated here as a bookend, now that the fourth and final camp position has been assigned and the whole inner ring is complete. Whoever approaches this innermost boundary without authorization faces the same consequence stated at the start of the chapter.
🔁 The same warning already given back in verse 10
🔲 A bookend, marking the completion of the whole inner ring
⚠️ The consequence for unauthorized approach hasn't changed
---
## 🔢 All That Were Numbered Of The Levites... Were Twenty And Two Thousand
22,000 - adding Gershon's 7,500, Kohath's 8,600, and Merari's 6,200 gives 22,300, but the text records 22,000 exactly. Most careful readers connect this small gap to the 300 firstborn Levites among their own tribe (mentioned in some ancient Jewish commentary), who wouldn't be counted twice in a system built entirely around firstborn substitution - though the text itself doesn't explain the gap directly.
🔢 22,000 total Levites - the number the rest of the chapter now builds on
🧮 The three clan totals actually add up to 22,300, a small stated gap
🔑 This exact number becomes the center of the math in the rest of the chapter

# Numbers 3:40-43
# 🧮 Counting Every Firstborn In Israel
---
## 🆕 Number All The Firstborn Of The Males Of The Children Of Israel From A Month Old And Upward
A brand new census, separate from both Numbers 1's war-age count and this chapter's Levite count - this one counts only firstborn sons, across all twelve tribes, one month old and up. Its entire purpose is to get an exact number to measure against the 22,000 Levites just counted.
🆕 A brand new census: firstborn sons only, across all twelve tribes
🎯 Its whole purpose is to compare against the 22,000 Levites
📐 Setting up an exact one-to-one substitution, name for name
---
## 🐄 Take The Levites For Me... And The Cattle Of The Levites Instead Of All The Firstlings Among The Cattle
The substitution turns out to be bigger than just people - firstborn livestock were also historically claimed by God (a rule already given in Exodus 13:2, 13:12), and the Levites' own cattle now cover the value of Israel's firstborn animals the same way the Levite people cover Israel's firstborn sons.
🐄 Firstborn animals were already claimed by God (Exodus 13:2, 13:12)
🔄 The Levites' own cattle now substitute for Israel's firstborn animals
🔑 One substitution system, covering both people and livestock
---
## 🔢 Twenty And Two Thousand Two Hundred And Threescore And Thirteen
"Threescore" is an old way of saying sixty, so this number reads as 22,000 + 200 + 60 + 13, or 22,273 firstborn sons total. That's 273 more than the 22,000 Levites just counted - a gap the rest of the chapter exists to solve.
🔢 "Threescore" means sixty - this totals 22,273 firstborn sons
➕ 273 more firstborn than there are Levites to substitute for them
🔜 The rest of the chapter solves exactly this leftover gap

# Numbers 3:44-51
# 💰 Redeeming The Extra Firstborn
---
## 🔄 Take The Levites Instead Of All The Firstborn Among The Children Of Israel... And The Levites Shall Be Mine
The core substitution stated once more, plainly: every Levite cancels out one Israelite firstborn son, one-for-one, until the Levites run out.
🔄 One Levite cancels out one Israelite firstborn son, one-for-one
🔁 The same core idea from earlier in the chapter, restated plainly
🔜 That substitution is about to run out of Levites
---
## 🧮 For Those That Are To Be Redeemed Of The Two Hundred And Threescore And Thirteen Of The Firstborn... Which Are More Than The Levites
22,273 firstborn sons, but only 22,000 Levites - leaving exactly 273 firstborn sons with no Levite left to stand in for them. Those 273 need a different kind of substitution: money instead of a person.
🧮 22,273 firstborn sons, only 22,000 Levites to substitute for them
👤 273 sons are left over with no Levite match at all
💰 Their substitution has to be paid in money instead
---
## ⚖️ Thou Shalt Even Take Five Shekels Apiece By The Poll, After The Shekel Of The Sanctuary
"Poll" is an old word for a single counted head or person - each leftover firstborn son costs five shekels to redeem. "The shekel of the sanctuary" means a fixed, official weight standard used specifically for sacred transactions, so the payment couldn't be quietly shorted using a lighter, informal local shekel.
🗳️ "Poll" is an old word meaning "one counted person"
⚖️ "The shekel of the sanctuary" was a fixed, official weight standard
🔒 This prevented anyone from underpaying with a lighter local shekel
---
## 📏 The Shekel Is Twenty Gerahs
A "gerah" is a smaller unit of weight, and this verse is the Bible quietly defining its own currency for readers who wouldn't otherwise know the conversion - one shekel equaled twenty gerahs. This kind of built-in footnote shows up a few other places in the Torah whenever a specific, exact measurement matters.
⚖️ A "gerah" is a smaller unit of weight than a shekel
🔢 One shekel equaled twenty gerahs, defined right in the text itself
📏 A built-in footnote, used whenever an exact measurement matters
---
## 💰 Thou Shalt Give The Money... Unto Aaron And To His Sons
The redemption silver isn't a fine paid to God directly - it goes to the priests, supporting the people who carry out Israel's ongoing worship. Every leftover firstborn son's redemption becomes, quite literally, part of the priesthood's material support.
💰 The money goes to the priests, not as a fine straight to God
🙏 It becomes part of the priesthood's ongoing material support
🔑 Worship and provision for the priests are tied together here
---
## 🧮 A Thousand Three Hundred And Threescore And Five Shekels
1,365 shekels total - and the math checks out exactly: 273 leftover firstborn sons multiplied by 5 shekels each equals precisely 1,365. This kind of exact, verifiable arithmetic is a small but real sign of how carefully this record was kept.
🧮 273 leftover sons x 5 shekels each = exactly 1,365 shekels
✅ The math checks out precisely, verse by verse
📖 A small sign of how carefully this whole record was kept
---
## ✅ Moses Gave The Money... According To The Word Of The Lord, As The Lord Commanded Moses
The same obedience refrain that closes Numbers 1 and Numbers 2 closes this chapter too - a deliberate, repeated bookend showing that this whole complex system of counting, substituting, and redeeming happened in exact, careful obedience, down to the last shekel.
✅ The same closing obedience refrain used at the end of chapters 1 and 2
📖 A deliberate bookend running across all three chapters so far
🔑 Careful obedience, tracked down to the very last shekel
`;

export const NUMBERS_THREE_PERSONAL_SECTIONS = parseNumbersThreeRawNotes(NUMBERS_THREE_RAW_NOTES);
