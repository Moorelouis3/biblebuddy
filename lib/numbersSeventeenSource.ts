export type NumbersSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersSeventeenRawNotes(rawText: string): NumbersSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 17:${startVerse}` : `Numbers 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Numbers 17 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_SEVENTEEN_RAW_NOTES = `# Numbers 17:1-3
# 🌿 Twelve Rods, One For Each Tribe
---
## 🪄 Take Of Every One Of Them A Rod
A rod here means a straight wooden staff, the kind a shepherd carried or a tribal chief used as a mark of authority (the same word appears for Moses's own staff back in Exodus 4:2 and for Judah's walking staff in Genesis 38:18). It wasn't a weapon - it was a personal symbol of leadership, something every household head would already own and instantly recognize as his.
Using an everyday object like this made the coming test impossible to fake. A rod is simply cut wood - it cannot sprout new growth once it's been separated from its roots.
🪄 A rod was a shepherd's or leader's staff, not a weapon
🌳 The same Hebrew word used for Moses's own staff (Exodus 4:2)
🔑 An everyday object, chosen so the coming test couldn't be faked
---
## 🏠 According To The House Of Their Fathers
"House of their fathers" is a standing phrase throughout Numbers for a tribe's family line, traced back to the original son of Jacob it came from. It's the same organizing unit used back in the census of chapters 1-2, so every original reader already knew exactly what group this meant.
🏠 A tribe's family line traced back to one of Jacob's sons
📋 The same unit already used for Israel's census in chapters 1-2
🔑 A familiar phrase, not a new category invented for this test
---
## 👑 Of All Their Princes...Twelve Rods
"Princes" here means the twelve tribal chiefs, the same leaders named and counted back in Numbers 1:5-16. Twelve rods meant one representative per tribe, with no tribe left out and none given two chances.
👑 "Princes" are the twelve tribal chiefs already named in Numbers 1
🎯 One rod per tribe - no tribe skipped, none given extra odds
🔑 A completely even playing field for every tribe
---
## ✍️ Write Thou Every Man's Name Upon His Rod
Each rod was personally labeled before the test began, so there could be no confusion or dispute afterward about which rod belonged to which leader. Whatever the outcome, everyone would know exactly whose rod it was.
✍️ Each rod personally labeled before the test started
🔍 Removes any room for confusion about whose rod is whose
🔑 Built so the result couldn't be argued with afterward
---
## 🎗️ Thou Shalt Write Aaron's Name Upon The Rod Of Levi
This is God's direct answer to the challenge Korah raised one chapter earlier - that Aaron had no more right to the priesthood than any other Levite. Aaron's rod represents the whole tribe of Levi here, standing in exactly the spot Korah tried to claim for himself.
🎗️ Aaron's rod represents all of Levi in this test
⚔️ A direct response to Korah's challenge from chapter 16
🔑 Puts Aaron's claim on the same public, testable footing as everyone else's
---
## 📌 For One Rod Shall Be For The Head Of The House Of Their Fathers
This line clarifies the rule so there's no ambiguity: exactly one rod per tribal head, nothing more. It also matters because Levi doesn't usually get counted alongside the other eleven tribes in a census (Numbers 1:47-49 sets Levites apart from the fighting-age count) - here, for this specific test, Levi's rod stands right alongside everyone else's.
📌 Exactly one rod per tribal head - the rule stated plainly
🔢 Levi is normally counted separately from the other tribes (Numbers 1:47-49)
🔑 Here, for this test, Levi's claim is judged the same way as any other tribe's

# Numbers 17:4-5
# 📜 Laid Before The Testimony
---
## 🕍 Lay Them Up In The Tabernacle Of The Congregation Before The Testimony
"The testimony" refers to the ark of the covenant, which held the stone tablets of the Ten Commandments - the physical proof of God's covenant with Israel (Exodus 25:16). Placing the rods directly in front of it meant the test would happen in the most sacred, restricted space in the entire camp, somewhere ordinary Israelites couldn't even go to tamper with the results.
🕍 "The testimony" is the ark holding the Ten Commandments tablets
🚪 The most restricted, sacred space in the whole camp
🔑 No ordinary person could reach the rods to interfere
---
## 🤝 Where I Will Meet With You
This location wasn't chosen at random - it's the same specific spot God had already promised, back in Exodus 25:22, to meet with Moses and speak with him. Running the test there ties it directly to God's own ongoing presence, not just to Moses's authority.
🤝 The same meeting place God already promised in Exodus 25:22
📍 Ties the test to God's presence, not just to Moses's word
🔑 The result would come from the source it claimed to come from
---
## 🌱 The Man's Rod, Whom I Shall Choose, Shall Blossom
A dead, cut branch cannot sprout new growth on its own - that basic fact is exactly what makes this test work. Whichever rod blossoms overnight will have done something wood simply cannot do naturally, making the outcome unmistakably God's doing rather than nature's coincidence.
🌱 Cut wood cannot sprout new growth on its own
🚫 Nothing about this could happen by natural coincidence
🔑 The test is designed to have only one possible honest explanation
---
## 🗣️ I Will Make To Cease From Me The Murmurings
"Murmurings" is the same word used again and again throughout Numbers for Israel's repeated grumbling against Moses and Aaron - after the spies' report in chapter 14, and just one chapter earlier during Korah's rebellion in chapter 16. God states plainly here that this test exists specifically to put that pattern to rest.
🗣️ The same word used for Israel's repeated complaints through Numbers
📖 Already seen in chapters 14 and 16
🔑 This test's stated purpose is to end the pattern for good

# Numbers 17:6-7
# 📦 The Rods Gathered And Laid Before The LORD
---
## 🙌 Every One Of Their Princes Gave Him A Rod Apiece
All twelve tribal leaders actually complied and handed over their rods - nobody refused or hesitated, unlike Dathan and Abiram's flat refusal to even appear before Moses just one chapter earlier (Numbers 16:12).
🙌 Full compliance from all twelve tribal leaders
🔁 A contrast with Dathan and Abiram's refusal in chapter 16
🔑 Nobody hesitated to submit their rod to the test
---
## 🪵 The Rod Of Aaron Was Among Their Rods
Aaron's rod isn't singled out, set apart, or given any special placement among the twelve - it sits alongside the others exactly like every other tribe's rod. If Aaron's claim was going to be proven, it would happen on completely equal footing, with no advantage built in.
🪵 No special placement or treatment for Aaron's own rod
⚖️ Sits alongside the other eleven on equal footing
🔑 Whatever happens next can't be blamed on favoritism
---
## 📦 Moses Laid Up The Rods Before The LORD In The Tabernacle Of Witness
"Tabernacle of witness" is another name for the same tent already called "the tabernacle of the congregation" earlier in this chapter - both names point back to the ark's tablets, which served as legal "witness" to the covenant between God and Israel.
📦 Another name for the same tent named earlier in this chapter
⚖️ "Witness" points back to the covenant tablets inside the ark
🔑 The location's very name reinforces what's about to be proven

# Numbers 17:8-9
# 🌰 Aaron's Rod Buds, Blossoms, And Bears Almonds
---
## 🌅 On The Morrow Moses Went Into The Tabernacle Of Witness
"Morrow" is an old word simply meaning "the next day." Moses doesn't wait weeks to check the results - the test resolves overnight, leaving no long stretch of time where doubt or tampering could creep in.
🌅 "Morrow" is old English for "the next day"
⏱️ Resolved overnight, not over weeks
🔑 No long gap where doubt could creep back in
---
## 🌸 Budded, And Brought Forth Buds, And Bloomed Blossoms, And Yielded Almonds
This lists three separate growth stages - budding, blossoming, and bearing fruit - that would normally take an almond tree weeks or months to move through in order. Aaron's cut, dead rod does all three at once, overnight, with nothing left ambiguous about whether this was really a miracle.
🌸 Three growth stages that normally take weeks or months
⚡ All three happen at once, overnight, on a dead branch
🔑 Nothing ambiguous is left about what caused it
---
## 🌰 Almonds
The almond tree held a specific meaning in Israel: it was the first tree to bloom each year, often while snow was still on the ground, and its Hebrew name (shaqed) comes from the word for "watching" or "waking." The prophet Jeremiah later sees an almond branch as a sign that God is "watching over" His word to make sure it happens (Jeremiah 1:11-12) - the same tree, carrying the same idea, centuries later.
🌰 The first tree to bloom each year in Israel
📖 Its Hebrew name means "watching" or "waking"
🔑 Jeremiah later uses the same tree as a sign God is watching over His word
---
## 👀 Moses Brought Out All The Rods...They Looked, And Took Every Man His Rod
This wasn't a private announcement - every tribal leader personally saw and handled his own rod again, still plain dead wood, right next to Aaron's now flowering with fruit. Nobody had to simply take Moses's word for it.
👀 Every leader personally saw and handled his own rod again
🌿 Compared it directly against Aaron's now-living branch
🔑 Nobody had to just take Moses's word for the outcome

# Numbers 17:10-11
# 🏺 Kept As A Permanent Warning
---
## 🏺 Bring Aaron's Rod Again Before The Testimony, To Be Kept For A Token Against The Rebels
God doesn't let this proof fade into memory - He commands it kept permanently, right next to the covenant tablets themselves. Hebrews 9:4 later confirms this rod stayed inside or alongside the ark for generations, a physical object anyone could still point to long after everyone who witnessed the actual event had died.
🏺 Kept permanently next to the covenant tablets themselves
📜 Hebrews 9:4 confirms it stayed with the ark for generations
🔑 A physical proof that outlasted every eyewitness
---
## 🛑 That Thou Quite Take Away Their Murmurings From Me, That They Die Not
God ties this rod's purpose directly to preventing more death - the murmuring that fueled Korah's rebellion in the previous chapter had already cost thousands of lives (Numbers 16:49). Keeping visible proof of Aaron's calling was meant to stop that same complaint from rising again and causing more of the same.
🛑 Directly tied to preventing more deaths like chapter 16's
📊 That chapter's murmuring already cost thousands of lives
🔑 A lasting object meant to head off a repeat tragedy
---
## ✅ And Moses Did So: As The LORD Commanded Him, So Did He
A short, simple compliance line, but one that fits a pattern already well established for Moses throughout this book - whatever God commands, he carries out exactly, without editing or negotiating.
✅ A brief line, but part of an established pattern for Moses
📖 He carries out God's commands exactly, without changes
🔑 Consistent, exact obedience, even in small details like this

# Numbers 17:12-13
# 😨 Israel's Terrified Response
---
## 😱 Behold, We Die, We Perish, We All Perish
Saying the same idea three times in a row ("die," "perish," "perish") is a Hebrew way of expressing overwhelming panic, not just stating a fact. This comes right after chapter 16 ended with 14,700 people dead from a plague (Numbers 16:49) - the fear in this line is not exaggerated.
😱 Repeating the same idea three times signals real panic, not exaggeration
📊 Comes right after 14,700 deaths in chapter 16
🔑 A completely understandable reaction to what they just witnessed
---
## 🚪 Whosoever Cometh Any Thing Near Unto The Tabernacle Of The LORD Shall Die
The people draw a sweeping, fearful conclusion - that simply being near God's presence is now lethal for anyone, not just for rebels who challenge it directly. It's an overcorrection born out of real trauma, but not quite accurate to what actually happened.
🚪 A sweeping conclusion: nearness itself is now deadly
😨 Born out of real trauma, but an overcorrection
🔑 Fear stretching a specific judgment into a general one
---
## ❓ Shall We Be Consumed With Dying?
This closing question is left hanging on purpose - it's the exact problem the next chapter exists to answer. Numbers 18 opens with God giving Aaron and the priests a clear, structured system for how Israel can safely approach the tabernacle, directly responding to the fear raised right here.
❓ Left open on purpose, unanswered in this chapter
📖 Numbers 18 opens by directly answering this exact fear
🔑 Sets up the very next chapter's entire subject
`;

export const NUMBERS_SEVENTEEN_PERSONAL_SECTIONS = parseNumbersSeventeenRawNotes(NUMBERS_SEVENTEEN_RAW_NOTES);
