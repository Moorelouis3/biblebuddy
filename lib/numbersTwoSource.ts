export type NumbersTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwoRawNotes(rawText: string): NumbersTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 2:${startVerse}` : `Numbers 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Numbers 2 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWO_RAW_NOTES = `# Numbers 2:1-2
# 🚩 The Camp Formation Command
---
## 🚩 Every Man Of The Children Of Israel Shall Pitch By His Own Standard
"Standard" means a large banner or flag - most likely a distinct color or symbol - marking one of the four major camp divisions this chapter is about to describe. In a nation numbering over two million people, a visible flag was the only practical way for someone to find their way home across a sprawling, tent-covered wilderness.
This is also the first time Numbers 1's list of tribes gets turned into an actual physical arrangement - the census counted the people, and this chapter tells them exactly where to stand.
🚩 A "standard" was a large banner marking one of four major divisions
🏕️ Made it possible to navigate a camp of over two million people
📖 Numbers 1 counted the people; Numbers 2 tells them where to stand
---
## 🏠 With The Ensign Of Their Father's House
An "ensign" was a smaller banner, one level down from the standard - most likely marking the individual family group ("the house of their fathers") camped within the larger tribal division. Together, standard and ensign formed a two-tier system: one flag for the whole division, a second, smaller flag for the family cluster inside it.
🏠 An "ensign" marked a smaller family group, not the whole division
🔢 Two levels of flags: one for the tribe, one for the family within it
🗺️ Helped narrow down not just which camp, but which exact spot
---
## 🏛️ Tabernacle Of The Congregation
"Congregation" translates the Hebrew word edah, meaning the whole community formally gathered together as a worshiping nation - not just a crowd or a random collection of people. "Tabernacle of the congregation" is this tent's most common name throughout Exodus, Leviticus, and Numbers, worth learning because it keeps appearing across all three books.
🏛️ "Congregation" (Hebrew edah) means the formally assembled community
📖 This is the tent's most common name across Exodus, Leviticus, and Numbers
🔤 Worth learning now - it keeps appearing throughout the rest of the Torah
---
## 📏 Far Off About The Tabernacle Shall They Pitch
"Far off" sets a deliberate buffer zone between the ordinary tribes camped around the edge and the sacred tent at the center. This echoes the boundary God set around Mount Sinai itself back in Exodus 19:12, where the people were warned not to even touch the mountain while His presence rested there.
📏 A deliberate buffer zone, not just leftover space
⛰️ Echoes the boundary set around Mount Sinai in Exodus 19
⚠️ Nearness to God's presence still required careful distance

# Numbers 2:3-9
# 🦁 Judah's Camp Leads The East
---
## 🌅 On The East Side Toward The Rising Of The Sun
"East" is the direction of the sunrise, and in the ancient world it was widely treated as the "front" or place of honor rather than just one direction among four. The tabernacle's own entrance and altar faced this same direction (Exodus 27:13), meaning Judah's camp sat closest to the one doorway into the whole sacred complex.
🌅 East = the direction of sunrise, treated as the place of honor
🚪 The tabernacle's own entrance faced this same direction
👑 Judah camped nearest the one doorway into the sacred complex
---
## ⚔️ His Host, And Those That Were Numbered Of Them
"Host" means an organized armed force, not just a crowd of people. This exact phrase repeats for every tribe throughout this chapter - a formal reminder that each of these numbers represents a real, structured military division, not just a headcount sitting idle.
⚔️ "Host" means an organized fighting force
🔁 This phrase repeats for every tribe through the whole chapter
🪖 Each number is a real division, ready to march or fight
---
## 🦁 Nahshon The Son Of Amminadab Shall Be Captain
Nahshon was introduced back in Numbers 1:7 - ancestor of King David and, generations later, of Jesus (Matthew 1:4), and Aaron's brother-in-law through his sister Elisheba. Here he's given actual command: leading not just his own tribe but the entire eastern division, first to march whenever Israel moves.
🦁 Already introduced in ch1 as an ancestor of David and Jesus
👨‍👩‍👧 Aaron's brother-in-law, now placed in real command
🚶 Leads not just Judah, but the whole eastern division
---
## 🔢 Judah's Full Strength: Threescore And Fourteen Thousand And Six Hundred
74,600. This is the exact same number recorded in the census back in Numbers 1:27 - chapter 2 doesn't recount anyone. It takes the same 603,550 men already counted and simply organizes them into a physical layout around the tabernacle.
🔢 Same 74,600 already recorded in Numbers 1:27
🗺️ This chapter organizes the census; it doesn't repeat it
🦁 Confirms Judah as the single largest tribe, now placed at the front
---
## 🌾 Issachar And Zebulun Pitch Next Unto Him
Nethaneel leads Issachar and Eliab leads Zebulun, both camping right alongside Judah. All three are Leah's sons, the same grouping Numbers 1:26-31 already noted - a family relationship from Genesis now written into the physical shape of the camp.
🌾 Nethaneel (Issachar) and Eliab (Zebulun) join Judah's division
👨‍👩‍👧‍👦 All three are Leah's sons, grouped together again
🧭 A family relationship becomes literal geography
---
## 📛 Nethaneel And Eliab: Names Not Yet Explained
Nethaneel means "God has given" or "gift of God," and Eliab means "God is my father." Ch1 introduced both men by name only - here's what those names actually meant, continuing the same pattern of fathers quietly weaving faith into their sons' names, already seen with Zurishaddai and Ammishaddai.
📛 Nethaneel means "gift of God"
📛 Eliab means "God is my father"
🙏 Continues the pattern of faith-filled Hebrew names from ch1
---
## ➕ All That Were Numbered In The Camp Of Judah: 186,400
Judah, Issachar, and Zebulun together total 186,400 - the largest of the four camp divisions this chapter sets up, matching the same total already calculated in Numbers 1:26-31. The biggest division gets the place of honor at the front.
➕ 186,400 - the largest of the four divisions
🔗 Same total already added up in Numbers 1:26-31
🥇 The biggest division leads the whole camp
---
## 🚶 These Shall First Set Forth
This is genuinely new information, not found in ch1: when Israel finally breaks camp, Judah's division marches out first. This isn't just described here - it actually happens exactly this way in Numbers 10:14, when the march finally begins.
🚶 Judah's division marches out first when Israel moves
📖 This is fulfilled exactly as stated, in Numbers 10:14
🧭 Camp position previews marching order

# Numbers 2:10-16
# 🧭 Reuben's Camp On The South
---
## 🧭 On The South Side Shall Be The Standard Of The Camp Of Reuben
South is the second of the four cardinal directions this chapter assigns, and Reuben's division sets out second in the marching order too. Position in the camp and position in the march are the same thing throughout this whole chapter.
🧭 South is the second of four directions assigned in this chapter
🥈 Reuben's division also marches second, matching its position
🔗 Camp position and march position are the same thing here
---
## 👴 Reuben, Simeon, And Gad Camp Together
Elizur leads Reuben, Shelumiel leads Simeon, and Eliasaph leads Gad - the same trio already grouped together in Numbers 1:20-25, now literally camped side by side. Gad, though actually the son of Zilpah rather than one of Leah's own sons, is grouped here rather than with the other handmaid-born tribes.
👴 Elizur, Shelumiel, and Eliasaph lead this trio
🔗 The same grouping already previewed in Numbers 1
🐐 Gad joins here despite being Zilpah's son, not Leah's
---
## 📛 Elizur, Shelumiel, And Eliasaph
Elizur means "my Rock is God," Shelumiel means "God is my peace," and Eliasaph means "God has added." Three more captains whose own names quietly carried a statement of faith, a detail this chapter doesn't explain but that a careful reader can notice by studying the names themselves.
📛 Elizur means "my Rock is God"
📛 Shelumiel means "God is my peace"
📛 Eliasaph means "God has added"
---
## 🔢 Reuben's Division Total: 151,450
Reuben (46,500), Simeon (59,300), and Gad (45,650) combine to 151,450 - the same total already reached in Numbers 1, now confirmed as one physical camp grouping on the south side.
🔢 151,450 combined, matching Numbers 1's earlier total
🧭 Now confirmed as one physical division, not just a math sum
📉 The second-largest of the four camp divisions
---
## 🥈 They Shall Set Forth In The Second Rank
"Rank" here means marching order, not military grade. Reuben's division travels directly behind Judah's whenever Israel moves - a position this chapter sets up now and Numbers 10 will show carried out exactly as planned.
🥈 "Rank" means marching order here, not military grade
🚶 Reuben's division travels directly behind Judah's
📖 Numbers 10 shows this carried out exactly as planned
---
## 🗺️ Camp Direction Wasn't A Preview Of Their Later Land
It might seem like these compass directions predict where each tribe eventually settled in Canaan, but they don't - Reuben, for example, ends up east of the Jordan River (Numbers 32), nowhere near "south." This camp order was about wilderness travel logistics, not a map of the promised land.
🗺️ These directions describe camp order, not future territory
🏞️ Reuben actually settles east of the Jordan (Numbers 32), not south
🧭 A logistics plan for the wilderness, not a land map

# Numbers 2:17
# ⛺ God's Tent At The Center
---
## ⛺ The Tabernacle Shall Set Forward With The Camp Of The Levites In The Midst Of The Camp
The Levites camp in a protective ring immediately around the tabernacle (already commanded in Numbers 1:53), and that whole cluster sits at the literal center of Israel's camp, with the four tribal divisions surrounding it on all four sides. The physical layout is a giant square with God's dwelling place at the very middle.
⛺ The tabernacle and Levites sit at the literal center of camp
🔲 Four tribal divisions surround it on all four sides
🎯 A visible reminder: God's presence at the center of national life
---
## 🚶 As They Encamp, So Shall They Set Forward, Every Man In His Place
Whatever position a tribe held while stationary, it kept that exact same position while marching - no scrambling, no renegotiating order each time Israel packed up camp. This one sentence turns the rest of the chapter into a marching-order plan, not just a parking plan.
🚶 Camp order and march order are the same order
🔁 No re-shuffling positions each time Israel moved
📖 Sets up the detailed marching sequence coming in Numbers 10
---
## 📐 A Real Blueprint For Over Two Million People
What follows in the rest of this chapter is essentially a field logistics plan - the kind of thing a modern military or city planner would draw up, but written for a wilderness nation with no maps, trucks, or radios. Every family had one exact spot, reachable by looking for two banners: a standard, then an ensign.
📐 A real logistics plan for a nation of well over two million
🏕️ No maps or radios - just the standard and ensign banner system
👨‍👩‍👧‍👦 Every family had one exact, findable spot

# Numbers 2:18-24
# 👦 Ephraim's Camp On The West
---
## 🌇 On The West Side Shall Be The Standard Of The Camp Of Ephraim
West sits opposite the tabernacle's east-facing entrance - the "back" of the whole complex. Ephraim's division takes third position both in camp and on the march, continuing the same order this chapter has followed by direction.
🌇 West sits opposite the tabernacle's entrance side
🥉 Ephraim's division takes the third position, camp and march alike
🧭 The same direction-equals-order pattern continues here
---
## 👦 Ephraim, Manasseh, And Benjamin: Rachel's Family Reunited
Elishama leads Ephraim, Gamaliel leads Manasseh, and Abidan leads Benjamin. Ephraim and Manasseh are Joseph's two sons; Benjamin is Rachel's other son. All three descend from Rachel, Jacob's most-loved wife, and here they camp together as one division on the west side.
👦 Elishama, Gamaliel, and Abidan lead this trio
👩 All three tribes trace back to Rachel, Jacob's most-loved wife
🧭 Rachel's whole family line camps together, west of the tabernacle
---
## 📛 Elishama, Gamaliel, And Abidan
Elishama means "God has heard," Gamaliel means "God is my reward" (a name that reappears centuries later on the famous rabbi who taught the apostle Paul, in Acts 22:3 - a different man, but the same meaningful name), and Abidan means "my father is judge."
📛 Elishama means "God has heard"
📛 Gamaliel means "God is my reward" - the same name later belongs to Paul's teacher in Acts 22:3
📛 Abidan means "my father is judge"
---
## 🔢 Ephraim's Division Total: 108,100
Ephraim (40,500), Manasseh (32,200), and Benjamin (35,400) combine to 108,100 - the smallest of the four divisions, the same total already reached back in Numbers 1:32-37.
🔢 108,100 combined - the smallest of the four divisions
🔗 Matches the total already calculated in Numbers 1
👩 Rachel's family line remains the smallest grouping here too
---
## 🤲 Ephraim Named And Positioned Before His Older Brother
Ephraim, the younger son, is named and camped ahead of Manasseh here just as he was counted ahead of him in Numbers 1 - a repeated, visible sign of Jacob's deliberate crossed-hands blessing back in Genesis 48, still shaping Israel's order a generation later.
🤲 Younger Ephraim is placed ahead of older Manasseh again
📖 Matches Jacob's crossed-hands blessing from Genesis 48
🔁 The same reversal repeats in both the census and the camp order
---
## 🥉 They Shall Go Forward In The Third Rank
Ephraim's division marches third, right after Reuben's - the order Numbers 10 will later carry out in practice, continuing the pattern this chapter has followed since Judah's "first" and Reuben's "second."
🥉 Ephraim's division marches third, right after Reuben's
📖 Numbers 10 later carries out this exact order
🔢 First, second, third - the pattern continues predictably

# Numbers 2:25-31
# 🌒 Dan's Camp Guards The Rear
---
## 🌒 The Standard Of The Camp Of Dan Shall Be On The North Side
North completes the fourth and final direction, closing the square of tribes around the tabernacle. Ahiezer leads this division, which - unlike the other three - marches last rather than simply in sequence with the group nearest it.
🌒 North completes the four directions surrounding the tabernacle
🧭 Ahiezer leads this fourth and final division
🔚 This division marches last, not simply "fourth in line"
---
## 🥈 Dan: A Handmaid's Son Leading The Second-Largest Division
Dan's own tribe was already the second-largest in Numbers 1 (62,700), and together with Asher and Naphtali it forms the second-largest of the four camp divisions here too - a striking result for tribes descended from Bilhah and Zilpah, the handmaids, rather than Jacob's two wives.
🥈 Dan's tribe alone was the second-largest in Numbers 1
👩‍👦 Dan, Asher, and Naphtali all trace to the handmaids, not the wives
📈 Family status at birth never limited how much God multiplied a tribe
---
## 📛 Ahiezer, Pagiel, And Ahira
Ahiezer means "my brother is help," and Pagiel means "entreaty of God." Ahira's name is more unusual - it likely means "brother of evil" or "brother of a shepherd," depending on how the Hebrew root is read; not every name on this list carries an obviously flattering meaning, and the text doesn't smooth that over.
📛 Ahiezer means "my brother is help"
📛 Pagiel means "entreaty of God"
📛 Ahira's meaning is debated, and not obviously flattering
---
## 🔢 Dan's Division Total: 157,600
Dan (62,700), Asher (41,500), and Naphtali (53,400) combine to 157,600 - more than Rachel's entire family grouping of 108,100, confirming what Numbers 1 already showed: the handmaid-born tribes were some of the strongest in the whole nation.
🔢 157,600 combined - larger than Rachel's whole family grouping
📈 Confirms what Numbers 1 already showed about these three tribes
💡 A mother's status never capped how much a tribe could grow
---
## 🔚 They Shall Go Hindmost With Their Standards
"Hindmost" means last, at the very back of the marching column. Being last wasn't a lesser or embarrassing job - the rear guard protected stragglers, the weak, and anyone falling behind from an attack coming from the rear, an important responsibility rather than a lower rank.
🔚 "Hindmost" means last in the marching line, not "least important"
🛡️ The rear guard protected stragglers and anyone falling behind
💪 An important responsibility, not a demotion
---
## 🧭 All Four Directions, All Four Ranks, Now Assigned
East (first), south (second), west (third), north (last) - by the end of this section, every one of the twelve tribes has both a fixed camp position and a fixed marching position, an enormous organizational structure completed in a single chapter.
🧭 East-first, south-second, west-third, north-last
✅ Every one of twelve tribes now has both a camp and march position
📐 An enormous organizational task, completed in one chapter

# Numbers 2:32-34
# 📊 The Whole Camp, In Order
---
## 🔢 Six Hundred Thousand And Three Thousand And Five Hundred And Fifty
603,550 - the exact same grand total already reached in Numbers 1:46. This verse simply confirms that organizing the nation into four camp divisions changed nothing about the actual count; it only changed where everyone stood.
🔢 603,550 - identical to the total already given in Numbers 1:46
🗺️ Organizing the camp didn't change the count, only the arrangement
✅ A second confirmation of the same number, for accuracy
---
## 🚫 But The Levites Were Not Numbered Among The Children Of Israel
This repeats the exclusion already explained in Numbers 1:47-53 - the Levites aren't part of any of the four directional divisions because they camp in their own protective ring immediately around the tabernacle instead, a fifth grouping that sits outside this chapter's four-camp count entirely.
🚫 Levites are excluded from all four directional divisions
⛺ They form their own protective ring around the tabernacle instead
🔢 Technically a fifth grouping, outside this chapter's main count
---
## 🦁 A Later Tradition: Four Faces At The Four Camps
Jewish tradition (recorded in the ancient commentary Numbers Rabbah) noticed something the text itself never states outright: the lead tribe at each of the four directions - Judah (associated with a lion) to the east, Reuben (a man) to the south, Ephraim (an ox) to the west, and Dan (an eagle) to the north - matches the four faces described on the living creatures in Ezekiel 1:10 and Revelation 4:7. It's worth knowing as a pattern later readers have noticed, not as something this chapter claims for itself.
🦁 Judah (lion) - east; Reuben (man) - south
🐂 Ephraim (ox) - west; Dan (eagle) - north
📖 A traditional connection to Ezekiel 1:10 and Revelation 4:7, not a claim this text makes directly
---
## 🙌 The Children Of Israel Did According To All That The LORD Commanded Moses
The same obedience refrain that closed Numbers 1 (v.54) closes this chapter too - a deliberate bookend showing that an enormous national reorganization, assigning over two million people to exact positions, happened in complete, careful obedience.
🙌 The same closing refrain used at the end of Numbers 1
📖 A deliberate bookend between the two chapters
✅ A massive reorganization, carried out in complete obedience
---
## 🧭 So They Pitched By Their Standards, And So They Set Forward
This final line directly answers the command given all the way back in verse 2 - what God ordered at the start of the chapter is confirmed as actually done by the end. The plan and its fulfillment bookend the whole chapter.
🧭 Directly answers the command given back in verse 2
📖 The plan and its fulfillment bookend this whole chapter
✅ Instruction given, then confirmed as carried out exactly
`;

export const NUMBERS_TWO_PERSONAL_SECTIONS = parseNumbersTwoRawNotes(NUMBERS_TWO_RAW_NOTES);
