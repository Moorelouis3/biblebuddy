export type SecondChroniclesElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesElevenRawNotes(rawText: string): SecondChroniclesElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 11:${startVerse}` : `2 Chronicles 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 2 Chronicles 11 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_ELEVEN_RAW_NOTES = `# SecondChronicles 11:1-4
# ⚔️ God Stops A Civil War
---
## 🔢 An Hundred And Fourscore Thousand Chosen Men

"Fourscore" is an old word for eighty.

One hundred and fourscore thousand means one hundred eighty thousand men.

"Chosen men" means trained, battle ready warriors, not just any man able to fight.

Rehoboam was raising an army large enough to conquer the ten northern tribes back by force.

This was going to be a full scale civil war between brothers.

🔢 Fourscore is an old word for eighty

⚔️ These were trained battle ready soldiers

🩸 Rehoboam planned to retake Israel by force

📖 This was headed toward full civil war

---

## 🔮 The Word Of The LORD Came To Shemaiah The Man Of God

Shemaiah does not appear earlier in this book by name.

He was a prophet God used specifically to speak into this moment.

"Man of God" was a common title for a true prophet in the Old Testament.

God intervenes the moment before Rehoboam's army can even march.

🔮 Shemaiah was a prophet of the LORD

🏷️ Man of God was a prophet's title

⏱️ God speaks before the army can march

📖 God stops the war before it starts

---

## 🩸 Ye Shall Not Go Up Nor Fight Against Your Brethren

God calls the northern tribes brethren even after they broke away.

The political split did not erase the family bond in God's eyes.

Rehoboam had every legal reason to fight for his father's whole kingdom.

God still forbids the war anyway.

🩸 Brethren means Israel is still family

⚖️ Rehoboam had legal grounds to fight

🚫 God forbids the war regardless

📖 Family bond outweighs the political split

---

## 👑 For This Thing Is Done Of Me

This is not Rehoboam's failure alone or an accident of politics.

God says the split itself came from Him.

This points back to Ahijah the prophet's earlier word to Jeroboam in First Kings eleven.

The divided kingdom was already part of God's plan before Rehoboam ever took the throne.

👑 The split came from God, not chance

🔮 This fulfills Ahijah's earlier prophecy

📜 First Kings eleven records that word

📖 God's plan stood before Rehoboam's reign

---

## 🙏 They Obeyed The Words Of The LORD

Rehoboam actually listens this time.

He had already ignored the elders wise advice earlier in his reign.

Here, facing a prophet's direct word, he backs down completely.

One obedient moment does not erase his earlier harsh mistake with the northern tribes.

🙏 Rehoboam actually obeys this time

🔁 He earlier rejected the elders advice

🛑 He backs down from the war

📖 One good choice does not undo the last

# SecondChronicles 11:5-10
# 🏗️ Rehoboam Fortifies Judah
---
## 🏗️ Built Cities For Defence In Judah

Rehoboam gives up any hope of retaking the northern tribes by force.

Instead he turns every resource toward defending what remains of his kingdom.

That shift follows immediately after God stopped his war.

Judah was now a much smaller kingdom that needed real protection.

🏳️ Rehoboam gives up retaking the north

🏗️ He turns instead to defending Judah

🔁 This shift follows God's warning

📖 A smaller kingdom needed real protection

---

## 👶 He Built Even Bethlehem, And Etam, And Tekoa

Bethlehem was David's own hometown, a small and unremarkable village at the time.

Centuries later this same small town becomes the birthplace of Jesus.

Tekoa later became the hometown of the prophet Amos.

These small cities carried far more future weight than their size suggested.

👶 Bethlehem was David's small hometown

✝️ Jesus would later be born there

📜 Tekoa later produced the prophet Amos

📖 Small towns carried unseen future weight

---

## 🕳️ Bethzur, And Shoco, And Adullam

Adullam was famous already from David's own life.

David hid there in a cave.

He was running from King Saul.

First Samuel twenty two records the story.

Rehoboam is now fortifying places once tied to his own grandfather's survival story.

The kingdom's defense literally builds on ground from earlier scripture.

🕳️ Adullam was David's hiding cave

👑 David hid there fleeing Saul

🔁 Rehoboam fortifies his own family history

📖 The kingdom's defense reuses old ground

---

## ⚔️ Gath, And Mareshah, And Ziph

Gath was a major Philistine city, one of five key strongholds.

Ziph was where local men once betrayed David's hiding place to Saul.

Fortifying Gath suggests Judah controlled or bordered old Philistine territory at this time.

These names carry old memories of danger for David's own family line.

⚔️ Gath was a Philistine stronghold

🗣️ Ziph is where men betrayed David

🧭 Judah now controlled that same ground

📖 Old danger becomes new defense

---

## 🏹 Adoraim, And Lachish, And Azekah

Lachish looks unremarkable here, just one name in a list.

Centuries later it becomes one of the most famous sieges in the whole Old Testament.

The Assyrian king Sennacherib will attack Lachish directly in Second Kings eighteen.

This early fortification shows how important this specific city would remain for generations.

🏹 Lachish appears here as just a name

🪖 Assyria later besieges it directly

📜 Second Kings eighteen records that siege

📖 One city mattered for centuries

---

## 🧱 Fenced Cities

"Fenced" means walled and fortified, not surrounded by a simple fence.

Hebron carried deep history as Abraham's burial place and David's first capital.

All fifteen cities named here formed a defensive ring around Jerusalem itself.

Judah's whole survival strategy was protecting the capital, not expanding the border.

🧱 Fenced means walled and fortified

⛰️ Hebron held deep patriarchal history

⭕ The cities ringed Jerusalem for protection

📖 Judah's strategy was survival, not expansion

# SecondChronicles 11:11-12
# 🛡️ Strongholds Stocked For War
---
## 🏰 Fortified The Strong Holds, And Put Captains In Them

"Strong holds" were fortified military posts, more than simple city walls.

Putting captains in charge meant permanent military leadership, not temporary guards.

Rehoboam was building a real standing defense system, not a one time project.

Every one of those cities now had someone responsible for it.

🏰 Strong holds means fortified military posts

🎖️ Captains gave permanent leadership

🛡️ This was a lasting defense system

📖 Every city had someone in charge

---

## 🌾 Store Of Victual, And Of Oil And Wine

"Victual" is an old word for food supplies.

Oil and wine were basic staples of everyday life.

They were used for cooking, trade, and daily meals.

Stocking cities with supplies meant they could survive a long siege without outside help.

This kind of preparation only makes sense if Rehoboam expected a real future war.

🌾 Victual is an old word for food

🫒 Oil and wine were daily staples

🏯 Supplies allowed cities to survive a siege

📖 Rehoboam was preparing for a real war

---

## 🛡️ Shields And Spears

Shields and spears were the basic weapons of any ancient soldier.

This list is a reminder of how small Rehoboam's kingdom had become.

Only two tribes, Judah and Benjamin, stayed loyal after the split.

Ten tribes now belonged entirely to Jeroboam in the north.

🛡️ Shields and spears were basic weapons

✌️ Only two tribes stayed loyal

🔟 Ten tribes now followed Jeroboam

📖 The kingdom had shrunk dramatically

# SecondChronicles 11:13-15
# ⛪ Priests And Levites Flee South
---
## 🚶 Resorted To Him Out Of All Their Coasts

"Resorted" means they gathered and moved toward him on purpose.

"Coasts" here means territories or regions, not a literal seashore.

Priests and Levites from all over the northern tribes chose to relocate to Judah.

This was a quiet religious rebellion against Jeroboam.

🚶 Resorted means they moved toward him

🗺️ Coasts means territories, not seashores

⛪ Religious leaders relocated from the north

📖 It was a vote against Jeroboam

---

## 📦 The Levites Left Their Suburbs And Their Possession

Levites did not own farmland like other tribes.

Instead they lived in assigned suburb towns scattered throughout Israel.

Leaving those towns meant giving up their entire livelihood and inheritance.

This was not a small decision.

It was a total uprooting of their lives.

🏘️ Levites lived in assigned suburb towns

🌾 They had no farmland of their own

📦 Leaving meant losing their whole livelihood

📖 This was a total uprooting

---

## 🚫 Jeroboam And His Sons Had Cast Them Off

"Cast off" means Jeroboam removed the Levites from their priestly duties.

First Kings twelve explains why.

Jeroboam wanted priests loyal only to him.

Legitimate priests came only from the line of Aaron, through the tribe of Levi.

Jeroboam broke that rule to build a religious system he fully controlled.

🚫 Cast off means removed from duty

👑 Jeroboam wanted priests loyal to him

📜 Legitimate priests came from Aaron's line

📖 He built a system he controlled

---

## 🐐 For The Devils, And For The Calves Which He Had Made

"High places" were local worship sites, often built on hills, outside Jerusalem's temple.

"Devils" here likely refers to goat idols connected to false worship, not literal demons.

"The calves" points directly back to the two golden calves Jeroboam made in First Kings twelve.

Jeroboam built an entire counterfeit religion to keep Israel away from Jerusalem.

⛰️ High places were unauthorized worship sites

🐐 Devils likely means goat idols

🐂 Calves points back to First Kings twelve

📖 Jeroboam built a counterfeit religion

# SecondChronicles 11:16-17
# 🙏 Three Faithful Years
---
## ❤️ Such As Set Their Hearts To Seek The LORD God Of Israel

This group was bigger than just priests and Levites.

These are ordinary Israelites from every tribe who wanted to worship God rightly.

"Set their hearts" describes a deliberate, personal decision, not simple habit.

They gave up homes in the north because true worship mattered more to them.

❤️ Set their hearts means a deliberate choice

👥 Ordinary Israelites joined, not only priests

🏠 They gave up homes for true worship

📖 Worship mattered more than comfort

---

## 💪 So They Strengthened The Kingdom Of Judah

This wave of faithful people did more than grow the population.

They brought skill, loyalty, and true worship practice into Judah.

A kingdom is not strong from soldiers and walls alone.

Faithful people strengthened Rehoboam in a way his army never could.

💪 They strengthened more than just numbers

🙏 They brought loyalty and true worship

🏰 Walls alone do not make a kingdom strong

📖 Faithful people were their own kind of strength

---

## 📆 For Three Years They Walked In The Way Of David And Solomon

"Walked in the way of" means following the same faithful pattern of worship and obedience.

The chronicler names an exact number, three years, not simply a while.

That specific number hints that this faithfulness did not last.

The next chapter shows Rehoboam and Judah drifting away from this good start.

🚶 Walked in the way means faithful obedience

🔢 Three years is an exact, pointed number

⚠️ The number hints faithfulness would not last

📖 The next chapter shows the drift begin

# SecondChronicles 11:18-19
# 👰 Rehoboam's First Wives
---
## 👨 Mahalath The Daughter Of Jerimoth The Son Of David

Jerimoth is not one of David's well known sons like Solomon or Absalom.

He is mentioned only briefly elsewhere, as one of David's many other sons.

That makes Mahalath Rehoboam's own cousin, a granddaughter of David through a lesser known line.

Marrying within the extended family kept royal power close.

👨 Jerimoth was a lesser known son of David

👰 Mahalath was Rehoboam's own cousin

👑 This kept power inside the royal family

📖 Not every son of David became famous

---

## 👴 Abihail The Daughter Of Eliab The Son Of Jesse

Jesse was David's father, from Bethlehem.

Eliab was David's oldest brother, first introduced in First Samuel sixteen.

Abihail is Rehoboam's cousin from David's side of the family as well.

Both wives named here connect Rehoboam tightly to David's own bloodline.

👴 Jesse was David's father

👨 Eliab was David's oldest brother

👰 Abihail was another royal cousin

📖 Both wives tied Rehoboam to David's line

---

## 📜 Jeush, And Shamariah, And Zaham

These three sons receive nothing more than their names here.

Ancient genealogies often recorded names even without a story attached.

Preserving a name kept a person's place in the family record.

Not every child in scripture gets a story, but every name still mattered.

👶 These sons get only their names

📜 Genealogies often recorded names alone

🧬 A name preserved a person's place

📖 Not every child needs a story to matter

# SecondChronicles 11:20-21
# 💔 Maachah, The Favored Wife
---
## 👧 Maachah The Daughter Of Absalom

Absalom is only recorded as having one daughter.

Her name was Tamar, in Second Samuel fourteen.

Maachah was most likely Tamar's own daughter.

That would make her Absalom's granddaughter, not his direct daughter.

Old Testament genealogies often use daughter loosely for any female descendant.

Rehoboam's favorite wife carried Absalom's own blood.

Absalom had once tried to steal his grandfather's throne.

👧 Absalom's recorded daughter was named Tamar

👶 Maachah was likely Tamar's daughter

📜 Daughter often meant any female descendant

📖 Rehoboam's favorite wife carried Absalom's blood

---

## ❤️ Rehoboam Loved Maachah The Daughter Of Absalom Above All His Wives And His Concubines

Kings in this period commonly married many wives for political alliances.

Genuine personal love for just one of them was still possible.

This same pattern of one wife loved above the rest echoes Jacob's love for Rachel over Leah.

Favoritism inside a large family rarely stayed without consequences.

👑 Kings married many wives for alliances

❤️ Rehoboam still loved one above the rest

🔁 This echoes Jacob's love for Rachel

📖 Favoritism rarely stays without cost

---

## 🔢 Eighteen Wives, And Threescore Concubines

"Threescore" is an old way of saying sixty.

Rehoboam fathered twenty eight sons and sixty daughters.

That came from his many wives and concubines together.

Deuteronomy seventeen had already warned Israel's future kings not to multiply wives.

Solomon's own downfall through his many wives happened just one generation earlier.

🔢 Threescore is an old word for sixty

🧮 He fathered eighty eight children total

📜 Deuteronomy seventeen warned against many wives

📖 Solomon's own downfall came the same way

# SecondChronicles 11:22-23
# 👑 Abijah Named Successor
---
## 👑 Made Abijah The Son Of Maachah The Chief, To Be Ruler

Abijah was not automatically next in line just because he was born first.

Rehoboam chose him deliberately, likely because of his deep love for Maachah, Abijah's mother.

"To be ruler among his brethren" means Abijah was set above all his many half brothers.

This choice determined who would take the throne after Rehoboam died.

👑 Abijah was chosen, not automatically next

❤️ Maachah's favor likely shaped the choice

👥 He was placed above his half brothers

📖 This choice decided who would rule next

---

## 🧠 He Dealt Wisely, And Dispersed Of All His Children

"Dispersed" means Rehoboam spread his many sons out across different cities.

Placing them in separate fortified cities kept them from competing for power in one place.

Rehoboam had likely learned this lesson from his own family's violent history.

Spreading them out lowered the risk of another rebellion like Absalom's.

🗺️ Dispersed means spread across cities

🏰 Placement in fortresses prevented rivalry

⚔️ Rehoboam knew his family's violent history

📖 This wisdom lowered the risk of rebellion

---

## 💍 He Desired Many Wives

This final line is not a compliment tucked into the chapter's ending.

Deuteronomy had already warned Israel's kings against exactly this pattern.

Rehoboam's own father Solomon had been led astray by the same desire.

The chapter ends on a warning sign, not a celebration of Rehoboam's success.

⚠️ This line is not a compliment

📜 Deuteronomy warned kings against this

👑 Solomon fell to the same pattern

📖 The chapter ends on a warning sign
`.trim();

export const SECOND_CHRONICLES_ELEVEN_PERSONAL_SECTIONS = parseSecondChroniclesElevenRawNotes(SECOND_CHRONICLES_ELEVEN_RAW_NOTES);
