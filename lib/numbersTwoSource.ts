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
# 🚩 God Gives The Camp Its Shape
---
## 🚩 Shall Pitch By His Own Standard

A standard was a large banner or flag.

It marked one of four major divisions in the camp.

Israel numbered well over two million people at this point.

A visible flag was the only way to find your own group.

This turns Numbers one's list of names into an actual place to stand.

🚩 Standard means a large banner

🏕️ It marked one of four divisions

🔢 Over two million people needed direction

📖 Numbers one counted them, this places them

## 🏠 With The Ensign Of Their Father's House

An ensign was a smaller banner than the standard.

It marked one family group inside a larger tribal division.

Think of the standard as marking your street and the ensign as marking your house.

Together the two flags formed a two level system.

One flag pointed to the right neighborhood, the other to the right family cluster.

🏠 Ensign means a smaller banner

👪 It marked one family group

🗺️ Standard finds the block, ensign finds the house

📖 Two flags, two levels of direction

## 📏 Far Off About The Tabernacle Of The Congregation

Far off means a deliberate gap, not leftover space.

The ordinary tribes camped at a real distance from the sacred tent.

This same boundary language appears at Mount Sinai in Exodus nineteen.

There the people were warned not to even touch the mountain.

Nearness to God's presence still called for real distance and real care.

📏 Far off means on purpose

⛰️ Echoes the Sinai boundary from Exodus nineteen

⚠️ Closeness to God still required care

📖 Distance protected the people, not God

# Numbers 2:3-9
# 🦁 Judah Leads The Eastern Camp
---
## 🌅 On The East Side Toward The Rising Of The Sun

East is the direction of sunrise.

In the ancient world that direction was treated as the place of honor.

The tabernacle's own entrance faced this same direction.

That means Judah's camp sat closest to the one doorway into the whole sacred tent.

Being placed first here was a mark of highest honor, not random luck.

🌅 East meant sunrise, the place of honor

🚪 The tabernacle entrance also faced east

👑 Judah camped nearest that one doorway

📖 Position in camp showed real honor

## 🦁 Nahshon The Son Of Amminadab Shall Be Captain

Nahshon already appeared back in Numbers one as a tribal leader.

He was an ancestor of King David.

Generations later he was also an ancestor of Jesus, named in Matthew one.

He was Aaron's brother in law through his sister Elisheba.

Here he receives real command over the entire eastern division, not just his own tribe.

🦁 Nahshon first appeared back in Numbers one

👑 An ancestor of King David

👨‍👩‍👧 Aaron's brother in law through his sister

📖 Now placed in command of a whole division

## 🔢 Threescore And Fourteen Thousand And Six Hundred

Threescore is an old word for sixty.

Sixty plus fourteen thousand and six hundred equals seventy four thousand six hundred men.

This chapter repeats this same old counting language for every tribe.

The number itself is not new information.

It matches the exact count already taken in Numbers one.

🔢 Threescore is an old word for sixty

🧮 The total comes to 74,600 men

🔁 This counting style repeats all chapter

📖 Same number already counted in Numbers one

## 🌾 Pitch Next Unto Him

Issachar and Zebulun camp right beside Judah.

All three tribes trace back to Leah, Jacob's first wife.

Numbers one already grouped these same three tribes together.

A family relationship from Genesis becomes literal geography in the camp.

🌾 Issachar and Zebulun join Judah's camp

👪 All three trace back to Leah

🔗 Numbers one grouped them the same way

📖 Family history becomes literal camp geography

## 🚶 These Shall First Set Forth

Judah, Issachar, and Zebulun together total 186,400 people.

That is the largest of the four camp divisions in this chapter.

The largest division also earns the honor of marching out first.

This plan is not just a guess, since Numbers ten shows it carried out exactly.

➕ 186,400 people in Judah's whole division

🥇 The largest division of the four

🚶 Judah marches out first when Israel moves

📖 Numbers ten shows this happening exactly

# Numbers 2:10-16
# 🧭 Reuben Camps On The South
---
## 🧭 On The South Side Shall Be The Standard Of The Camp Of Reuben

South is the second of four directions assigned in this chapter.

Reuben's division also marches second whenever Israel moves.

Camp position and marching position are the same thing throughout this chapter.

There is no separate plan for standing still and for moving.

🧭 South is the second direction assigned

🥈 Reuben's division also marches second

🔗 Camp order and march order match

📖 One plan covers both standing and moving

## 🐐 Then The Tribe Of Gad

Reuben, Simeon, and Gad camp together on the south side.

Reuben and Simeon are both sons of Leah.

Gad is actually the son of Zilpah, Leah's handmaid, not Leah herself.

He still camps with this family group rather than with the other handmaid born tribes.

👪 Reuben, Simeon, and Gad share one camp

👩 Reuben and Simeon come from Leah

🐐 Gad comes from Zilpah, Leah's handmaid

📖 Family groupings did not always split by mother

## 🔢 All That Were Numbered In The Camp Of Reuben

This same total already appeared once, back in Numbers one.

Reuben, Simeon, and Gad combine to 151,450 people.

That makes Reuben's division the second largest of the four.

This verse simply confirms that count as one physical camp.

🔗 Numbers one already gave this same total

🔢 151,450 people in Reuben's whole division

🥈 The second largest of the four camps

📖 A math total became a real place

## 🥈 They Shall Set Forth In The Second Rank

Rank here means marching order, not military grade.

Reuben's division travels directly behind Judah's division.

The same word can describe rank and grade very differently.

This plan made here is not just theory, it actually happens later.

🥈 Rank means marching order here

🚶 Reuben travels right behind Judah

🔁 The same word describes rank and grade differently

📖 Numbers ten carries out this exact order

## ⚔️ According To Their Armies

This phrase describes military organization for travel, not future land.

It is easy to assume these compass directions predict where each tribe later settled in Canaan.

They do not.

Reuben, camped here on the south, actually settles east of the Jordan River in Numbers thirty two.

This whole arrangement was about wilderness logistics, not a map of the promised land.

⚔️ Armies here means organized wilderness travel

🗺️ Camp side did not predict future land

🏞️ Reuben later settles east of the Jordan

📖 A travel plan, not a land map

# Numbers 2:17
# ⛺ God's Tent Travels At The Center
---
## ⛺ The Tabernacle Of The Congregation Shall Set Forward With The Camp Of The Levites In The Midst Of The Camp

The Levites camp in a protective ring immediately around the tabernacle.

That whole cluster sits at the exact center of Israel's camp.

Four tribal divisions surround it on every side.

The physical layout formed a giant square with God's dwelling place in the very middle.

⛺ Levites ring the tabernacle at the center

🔲 Four divisions surround it on all sides

🎯 A giant square centered on God's presence

📖 A visible reminder of who Israel lived around

## 🚶 Every Man In His Place

Whatever position a tribe held while camped, it kept that same position while marching.

There was no scrambling to find a spot each time Israel packed up.

This one sentence turns the rest of the chapter into a marching plan, not just a parking plan.

The whole nation moved in the same order every single time.

🚶 Camp order and march order stayed the same

🔁 No reshuffling positions each time they moved

📋 A parking plan became a marching plan

📖 The same order held every single time

# Numbers 2:18-24
# 👦 Ephraim Camps On The West
---
## 🌇 On The West Side Shall Be The Standard Of The Camp Of Ephraim

West sits directly opposite the tabernacle's east facing entrance.

That makes it the back of the whole sacred complex.

Ephraim's division takes the third position, both in camp and on the march.

The same direction equals order pattern continues here as it did for Judah and Reuben.

🌇 West sits opposite the entrance side

🥉 Ephraim's division takes the third position

🔁 The direction and order pattern continues

📖 Camp layout matched marching order again

## 👶 Then The Tribe Of Benjamin

Benjamin was Rachel's only other son besides Joseph.

He joins Ephraim and Manasseh, Joseph's two sons, on the west side.

All three tribes trace back to Rachel, the wife Jacob loved most.

Numbers one already grouped these same three tribes together.

👶 Benjamin was Rachel's only other son

👨‍👦 He joins Joseph's two sons here

👩 All three trace back to Rachel

📖 Numbers one grouped them the same way

## 📛 Elishama The Son Of Ammihud

These three captains' names carried quiet statements of faith.

Elishama means God has heard.

Gamaliel means God is my reward.

That same name later belongs to a rabbi who taught the apostle Paul in Acts twenty two.

Abidan means my father is judge.

📛 Elishama means God has heard

🏆 Gamaliel means God is my reward

👨‍🏫 The same name later belongs to Paul's teacher

📖 Fathers wove faith right into their sons' names

## 📉 All That Were Numbered Of The Camp Of Ephraim

Ephraim's division turns out to be the smallest of the four.

Ephraim, Manasseh, and Benjamin combine to 108,100 people.

The same total was already reached back in Numbers one.

Rachel's family line remains the smallest grouping in both counts.

📉 Ephraim's division was the smallest of four

🔢 108,100 people combined in this division

🔗 Numbers one already reached this same total

📖 Rachel's line stayed smallest in both counts

## 🤲 And By Him Shall Be The Tribe Of Manasseh

Ephraim is named and camped ahead of Manasseh here.

That is easy to miss, since Manasseh was actually the older brother.

Jacob deliberately blessed the younger Ephraim ahead of Manasseh back in Genesis forty eight.

Numbers one already counted Ephraim first for this same reason.

A blessing spoken over a boy's head still shaped Israel's order a generation later.

🤲 Ephraim is listed ahead of older Manasseh

📖 Jacob blessed Ephraim first in Genesis forty eight

🔁 Numbers one already showed this same order

➡️ One spoken blessing shaped order for generations

# Numbers 2:25-31
# 🌒 Dan Camps On The North And Guards The Rear
---
## 🌒 The Standard Of The Camp Of Dan Shall Be On The North Side

North completes the fourth and final direction in this chapter.

It closes the square of tribes around the tabernacle.

Ahiezer leads this division of Dan, Asher, and Naphtali.

Unlike the other three divisions, this one marches last rather than simply fourth in line.

🌒 North completes the fourth direction

🔲 It closes the square around the tabernacle

🧭 Ahiezer leads this whole division

📖 This division marches last, not simply fourth

## 📈 Then The Tribe Of Naphtali

Birth order never predicted how large a tribe would grow.

Dan, Asher, and Naphtali camp together here on the north side.

All three trace back to Bilhah and Zilpah, the family handmaids, not to Jacob's two wives.

Together they still form the second largest of the four camp divisions.

📈 Birth order never predicted tribal size

👩‍👦 Dan, Asher, and Naphtali share the handmaids

🚫 None of them descend from a wife directly

📖 Still the second largest of four divisions

## 🛡️ Ahiezer The Son Of Ammishaddai

Ahiezer means my brother is help.

Pagiel means entreaty of God.

Ahira's name is harder to pin down.

Numbers one already named these three captains but never explained what their names meant.

🛡️ Ahiezer means my brother is help

🙏 Pagiel means entreaty of God

❓ Ahira's meaning is genuinely debated

📖 Numbers one never explained these names

## 🔢 All They That Were Numbered In The Camp Of Dan

Numbers one already hinted at how strong this division would be.

Dan, Asher, and Naphtali combine to 157,600 people.

That is larger than Rachel's entire family grouping of 108,100.

A mother's status never capped how large a tribe could grow.

📚 Numbers one already hinted at their strength

🔢 157,600 people in Dan's whole division

📈 Larger than Rachel's entire family grouping

📖 Growth was never capped by birth order

## 🔚 They Shall Go Hindmost With Their Standards

Hindmost means last, at the very back of the line.

Being placed last was not a lesser or embarrassing job.

The rear guard protected stragglers and anyone falling behind from an attack.

That was a position of real responsibility, not a demotion.

🔚 Hindmost means last in the line

🛡️ The rear guard protected stragglers

💪 A position of real responsibility

📖 Not a demotion, but an honor

# Numbers 2:32-34
# 📊 The Whole Camp Now In Order
---
## 🔢 Six Hundred Thousand And Three Thousand And Five Hundred And Fifty

The grand total comes to 603,550 fighting men.

That is the exact same number already reached in Numbers one.

Organizing the nation into four camp divisions changed nothing about the actual count.

It only changed where every single person stood.

🔢 603,550 matches the earlier total exactly

🗺️ The organizing changed nothing about the count

📍 It only changed where people stood

📖 A second confirmation, for real accuracy

## 🚫 But The Levites Were Not Numbered Among The Children Of Israel

This same exclusion was already explained back in Numbers one.

The Levites are missing from all four directional divisions on purpose.

They camp in their own protective ring immediately around the tabernacle instead.

That makes them a fifth grouping, outside this chapter's main count entirely.

🚫 Levites are missing from all four divisions

⛺ They ring the tabernacle on their own

🧮 A fifth grouping outside the main count

📖 Numbers one already explained this exclusion

## 🧭 So They Pitched By Their Standards, And So They Set Forward

This line directly answers the command given back in verse two.

What God ordered at the start of the chapter is now confirmed as done.

The same obedience refrain that closed Numbers one closes this chapter too.

An enormous national reorganization happened in complete, careful obedience.

🧭 Directly answers the command from verse two

✅ The plan and its fulfillment bookend the chapter

🙌 The same obedience refrain closes both chapters

📖 A massive task, carried out in obedience
`.trim();

export const NUMBERS_TWO_PERSONAL_SECTIONS = parseNumbersTwoRawNotes(NUMBERS_TWO_RAW_NOTES);
