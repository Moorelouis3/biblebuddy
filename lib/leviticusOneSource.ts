export type LeviticusOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusOneRawNotes(rawText: string): LeviticusOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 1:${startVerse}` : `Leviticus 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Leviticus 1 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_ONE_RAW_NOTES = `# Leviticus 1:1-2

# 📖 The LORD Calls Moses From The Tent

---

## 📖 The Book Of Leviticus Begins

"Leviticus" gets its name from the Levites, the tribe entrusted with tabernacle service, though this specific book is really written for Aaron's priestly family within that tribe. In the Hebrew Bible its title is simply Vayikra, "And he called" - the book's literal opening word. This chapter picks up the exact moment Exodus 40 ended: the tabernacle is finished and God's glory has just filled it, and the whole rest of this book answers one question - how does a sinful people safely live near a holy God who has moved in next door?

📖 "Leviticus" comes from the Levites, though the book centers on Aaron's priestly family specifically

📜 Its Hebrew title, Vayikra, just means "And he called" - the book's opening word

🏠 This continues directly from Exodus 40, where God's glory filled the finished tabernacle

---

## 📣 The LORD Called Unto Moses, And Spake Unto Him Out Of The Tabernacle Of The Congregation

Notice where the voice comes from now. Through most of Exodus, God spoke to Moses from the top of Mount Sinai, in thunder and fire. Now that the tabernacle is built and filled with His glory (Exodus 40:34-35), He speaks from inside the tent itself. The mountain isn't needed anymore - God's presence has moved down into the middle of the camp.

⛰️ Earlier in Exodus, God spoke to Moses from Mount Sinai

🏠 Now He speaks from the newly finished tent, right in the middle of the camp

✅ This is the very first thing God does once the tabernacle is complete: start talking from inside it

---

## 🐄 If Any Man Of You Bring An Offering Unto The LORD

The Hebrew word behind "offering" (korban) comes from a root meaning "to draw near." An offering wasn't primarily a religious tax or a gift to appease an angry God - it was a structured way of drawing close to Him. That idea sets the tone for the entire book: approaching a holy God is possible, but it has to happen on His terms, not just however a person feels like showing up.

🤝 The Hebrew word for "offering" literally means something drawn near or brought close

🎯 An offering wasn't a tax - it was a way of approaching God

📋 Leviticus spends its first chapters spelling out exactly how that approach has to work

---

## 🐑 Of The Cattle, Even Of The Herd, And Of The Flock

"Herd" means cattle - oxen, bulls, and cows. "Flock" means the smaller grazing animals, sheep and goats. Both terms describe ordinary livestock a farming family in ancient Israel would already own and raise, not some rare or imported animal. God's very first instruction in this new book is built around what an average Israelite family already had in their pen.

🐂 "Herd" refers to cattle - oxen, bulls, and cows

🐐 "Flock" refers to sheep and goats

🏡 Both were common animals a family already owned, not something exotic to acquire

# Leviticus 1:3-5

# 🔥 The Burnt Offering From The Herd

---

## 🔥 If His Offering Be A Burnt Sacrifice Of The Herd

A "burnt sacrifice" (olah in Hebrew) literally means "that which goes up" - the entire animal is turned to smoke and rises off the altar. Nothing is kept back and nothing is eaten by anyone. This is the first and most complete of several offering types Leviticus will describe (grain, peace, sin, and trespass offerings come later, each with a different purpose).

🔥 "Burnt sacrifice" (olah) means "that which goes up," describing the smoke rising from the altar

🚫 The entire animal is consumed - nothing is eaten by the priest or the offerer

📖 This is the first of five main offering types Leviticus will explain in its opening chapters

---

## 🐂 Let Him Offer A Male Without Blemish

"Without blemish" means free of any physical defect - no injury, no disease, no missing part. The command to bring a male, unblemished animal meant giving God the best of the herd, not an animal that was sick, old, or already on its way to being culled. Centuries later, the prophet Malachi rebukes Israel for breaking this exact standard by offering blind and lame animals instead (Malachi 1:8).

✅ "Without blemish" means the animal had no injury, disease, or physical defect

🎁 The requirement forced worshippers to give their best, not a leftover animal

📖 Malachi 1:8 later scolds Israel for offering blind and lame animals in violation of this same law

---

## 🙋 He Shall Offer It Of His Own Voluntary Will

This offering was freely chosen, not commanded in response to a specific sin. That matters: Leviticus opens with worship that is willingly given, before it ever gets to the offerings later in the book that are required after someone has done something wrong (like the sin and trespass offerings in chapters 4-7). Willing worship comes first in this book, not obligation.

🙋 This offering was optional - nothing forced the person to bring it

📖 Later chapters add required offerings tied to specific sins (chapters 4-7)

🎯 Leviticus opens with worship freely given, before it ever turns to worship required by guilt

---

## 🚪 At The Door Of The Tabernacle Of The Congregation Before The LORD

There's a fixed, specific location for this - the entrance to the tent, where the bronze altar had just been installed at the very end of Exodus (Exodus 40:29). A worshipper couldn't build a personal altar wherever felt convenient. "Before the LORD" adds that this whole act happened in God's direct presence, not privately or out of sight.

📍 The "door of the tabernacle" is where the bronze altar stood, set up at the end of Exodus 40

🚫 Worship had one prescribed location - not wherever an individual chose

👁️ "Before the LORD" means this happened openly, in His presence

---

## ✋ He Shall Put His Hand Upon The Head Of The Burnt Offering

Pressing a hand on the animal's head identified it as standing in for the person bringing it - a physical act linking the worshipper to the animal about to die in his place. "It shall be accepted for him to make atonement" - and "atonement" (kaphar) means to cover over sin and restore a broken relationship. This one small gesture carries the weight of the whole system: a costly life given in place of the one who deserved judgment.

✋ Laying a hand on the animal's head identified it as standing in for the offerer

🔗 "Atonement" (kaphar) means covering sin and restoring the relationship it broke

💔 One life is given in the place of another - the offerer's, not the animal's own

---

## 🔪 He Shall Kill The Bullock Before The LORD

It's easy to assume the priest did the killing, but the text says "he" - the offerer himself, continuing from the same subject as the previous verse. Worship here wasn't just handing over an animal and walking away; it required real, personal, costly participation. The priest's specific job doesn't start until the next phrase - handling the blood.

🔪 The offerer personally killed the animal - not the priest

💪 This required direct, costly participation, not just handing over livestock

🩸 The priest's job begins at the blood, not the slaughter

---

## 🩸 The Priests, Aaron's Sons, Shall Bring The Blood, And Sprinkle The Blood Round About Upon The Altar

Blood mattered because, as Leviticus states plainly later, "the life of the flesh is in the blood" (Leviticus 17:11). "Round about" means all four sides of the altar - a full, deliberate application, not a token splash. This is the one part of the whole process an ordinary Israelite could not do himself; it required a priest.

🩸 Blood represented the animal's life, given in the place of the offerer's own life

📐 "Round about" means all four sides of the altar - complete, not partial

👤 This priestly step was the only part of the process an ordinary Israelite couldn't perform himself

# Leviticus 1:6-9

# 🪓 Skinned, Cut, And Laid In Order

---

## 🪓 He Shall Flay The Burnt Offering, And Cut It Into His Pieces

"Flay" means to skin, removing the hide. The subject is still "he" - the offerer continues doing the hands-on work here, not the priest. A later law (Leviticus 7:8) actually gives the animal's hide to the officiating priest as his own personal portion, but that comes after this chapter.

🔪 "Flay" means to skin, or remove the hide

💪 The offerer, not the priest, still does this cutting work

📖 Leviticus 7:8 later awards the hide to the priest as his own portion

---

## 🔥 The Sons Of Aaron The Priest Shall Put Fire Upon The Altar, And Lay The Wood In Order

Now the priest's job begins in earnest: managing the fire and stacking the wood carefully, not haphazardly. "In order" matters - a later chapter (Leviticus 6:12-13) will require this altar fire to be kept burning continually, day and night, without ever going out. Worship here was handled with deliberate, careful attention, not thrown together.

🔥 Managing the fire and stacking the wood correctly was specifically the priest's job

📏 "In order" means careful, deliberate arrangement, not tossed on randomly

📖 Leviticus 6:12-13 later requires this altar fire to burn continually, never going out

---

## 🥩 The Priests...Shall Lay The Parts, The Head, And The Fat, In Order Upon The Wood

The fat was considered the richest and best part of the animal. Later chapters (Leviticus 3:17 and 7:23) permanently forbid Israelites from ever eating the fat of an ox, sheep, or goat - it belonged to God alone. Arranging the parts "in order," rather than dumping them on, shows careful, reverent handling of what represented a whole life given up.

🥇 Fat was considered the richest, most valuable part of the animal

🚫 Leviticus 3:17 and 7:23 later ban Israelites from ever eating this fat - it belonged to God alone

📐 Careful arrangement, piece by piece, reflected reverence for what was being offered

---

## 💧 His Inwards And His Legs Shall He Wash In Water

The internal organs and legs would naturally be dirty - the legs from walking on the ground, the inward parts from the animal's own digestion. Washing them before they went on the fire combined ordinary practical hygiene with a symbolic point: nothing unclean was allowed to touch God's altar, not even dirt that was nobody's fault.

💧 "Inwards" means internal organs; both they and the legs needed washing before burning

🧼 Legs were dirty from walking on the ground, organs from the animal's own digestion

✨ Even ordinary dirt wasn't allowed near the altar - everything had to be clean first

---

## ✅ The Priest Shall Burn All On The Altar

"All" is the key word. Nothing here is kept back for the priest or the offerer to eat, unlike the peace offering described later in chapter 3, where the worshipper actually shares a meal from part of the animal. The burnt offering gives up the entire animal with nothing held back - which is the whole point of this particular kind of sacrifice.

🔥 "Burn all" means the entire animal is consumed - no part is eaten by anyone

🍽️ Contrast: the peace offering in chapter 3 lets the worshipper eat part of the meal

💯 Total, no-strings devotion is what makes the burnt offering different from the others

---

## 🌬️ An Offering Made By Fire, Of A Sweet Savour Unto The LORD

"Sweet savour" is picture-language for a pleasing aroma - it describes acceptance, not literal need. God isn't hungry for smoke; the phrase means the offering, brought rightly and willingly, was received and approved. This exact idea of a pleasing offering gets picked up centuries later to describe Christ's own sacrifice in Ephesians 5:2.

🌬️ "Sweet savour" is figurative language meaning the offering was pleasing and accepted

🚫 This isn't about God needing or smelling food - it's about acceptance, not hunger

📖 Ephesians 5:2 later borrows this exact phrase to describe Christ's own sacrifice

# Leviticus 1:10-13

# 🐑 The Same Offering, From The Flock

---

## 🐑 If His Offering Be Of The Flocks, Namely, Of The Sheep, Or Of The Goats

This is the second, less costly tier of the burnt offering - for a family that didn't own cattle. Sheep and goats were smaller and cheaper than herd animals, which made the law accessible to people with fewer resources. The core requirement stays exactly the same: still a male, and still without blemish, no matter how much smaller or cheaper the animal was.

🐑 Sheep and goats were smaller and less expensive than cattle

💰 This made the burnt offering achievable for families without herd animals

✅ The requirements - male, without blemish - stayed identical regardless of the animal's cost

---

## 🧭 He Shall Kill It On The Side Of The Altar Northward

This is a new detail the herd instructions in verses 3-5 didn't include: an exact compass direction. The altar's north side becomes a recurring, specific location across Leviticus - several offering types later in the book (including certain sin offerings in chapters 4 and 6) are also slaughtered on this same north side.

🧭 This is the chapter's first exact compass direction given for a slaughter location

📍 The altar's north side becomes a standard, repeated location for several offering types later in Leviticus

📋 Specific locations mattered here, not just general instructions

---

## 🔁 He Shall Cut It Into His Pieces...The Priest Shall Lay Them In Order

This wording nearly repeats verses 6-8's instructions for the herd offering, almost word for word. That repetition isn't lazy writing - it's deliberate. Whether a worshipper brought an expensive ox or a much cheaper lamb, the process, the priest's careful attention, and God's acceptance were exactly the same.

🔁 This phrasing closely duplicates the herd instructions already given in verses 6-8

🎯 The repetition is intentional, not accidental

⚖️ A cheaper animal received the identical careful process as an expensive one

---

## 🌬️ An Offering Made By Fire, Of A Sweet Savour Unto The LORD (Again)

This exact refrain already closed the herd offering back in verse 9, and it will close the bird offering too, at the very end of this chapter in verse 17. The identical wording, repeated for every tier, says something plainly: acceptance before God was never based on the price tag of what a person brought.

🔁 The identical phrase already appeared in verse 9, and will appear again in verse 17

💰 Repeating it for every tier says acceptance wasn't measured by cost

⚖️ A cheap offering and an expensive one both end this book's very first chapter fully accepted

---

## 🤝 The Same Ritual For The Poor Worshipper And The Rich Worshipper

Standing back from the details: a family that could only afford a sheep received the identical ritual, the same priestly attention, and the same "sweet savour" acceptance as a family bringing a bull. That pattern goes even further in verses 14-17, where the offering becomes cheaper still - down to a single bird - and the acceptance stays exactly the same.

💰 The cost of the animal never changed how seriously or carefully the ritual was carried out

🤝 A poor Israelite's offering was accepted on the same terms as a wealthy one's

📖 Verses 14-17 push this pattern even further, down to the cheapest offering in the chapter

# Leviticus 1:14-17

# 🕊️ Even A Bird Was Enough

---

## 🕊️ If The Burnt Sacrifice...Be Of Fowls...Turtledoves, Or Young Pigeons

This is the third and most affordable tier in the chapter - for someone who couldn't manage even a sheep or a goat. Turtledoves and young pigeons were common, inexpensive birds throughout Israel. Centuries later, Luke 2:24 shows Mary and Joseph bringing exactly this offering at Jesus's dedication in the temple - a quiet detail confirming the family's poverty.

🕊️ Birds were the least expensive option among the chapter's three tiers

💰 Turtledoves and young pigeons were common, low-cost birds in Israel

📖 Luke 2:24 shows Mary and Joseph bringing this exact offering for Jesus - a sign of their poverty

---

## ✂️ The Priest Shall Bring It Unto The Altar, And Wring Off His Head

For the first time in this chapter, the priest performs the actual killing himself, rather than the offerer. A bird's small size made this a task better suited to a trained priest's hands than to an ordinary worshipper. The priest's role expands here compared to the larger-animal instructions earlier in the chapter.

✋ Unlike the ox or sheep, the priest personally kills the bird here, not the offerer

🐦 A bird's small size made this step better suited to a priest's practiced hands

📈 The priest's involvement grows as the offering's size shrinks

---

## 🩸 The Blood Thereof Shall Be Wrung Out At The Side Of The Altar

Blood still matters, even for the cheapest offering in the chapter. The meaning behind atonement - a life given, blood applied to the altar - doesn't shrink just because the offering itself got smaller and cheaper. Every tier in this chapter, whether bull, sheep, or bird, points to the same underlying truth about a costly life given in exchange.

🩸 Even the least expensive offering still required blood applied to the altar

📉 The offering's cost went down, but the meaning behind atonement never shrank

🔁 Bull, sheep, or bird - every tier in this chapter points to the same truth

---

## 🍽️ He Shall Pluck Away His Crop With His Feathers, And Cast It...By The Place Of The Ashes

A bird's "crop" is a digestive pouch near its throat, often holding undigested food and grit - it had to be removed since it wasn't fit to burn as an offering. The "place of the ashes" was a specific, set spot near the altar for this kind of waste, mentioned again later as part of the priest's regular duties in Leviticus 6:10-11.

🍽️ The "crop" is a bird's digestive pouch, holding waste that had to be removed

📍 The "place of the ashes" was a fixed, designated spot for altar refuse

📖 Leviticus 6:10-11 later describes this same ash-disposal spot as part of the priest's regular routine

---

## ✂️ He Shall Cleave It With The Wings Thereof, But Shall Not Divide It Asunder

"Cleave" here means to split or tear partway open - but not completely apart. Unlike the ox or sheep, which were fully cut into separate pieces, the small bird stayed mostly in one piece as it went on the fire. Even the smallest, cheapest offering in the chapter still received its own distinct, specific handling instructions - nothing was treated carelessly just because it was small.

✂️ "Cleave" means to split or tear partly open, not to sever completely

🐦 Unlike the larger animals, the bird stayed mostly in one piece

📋 Even the cheapest offering received its own precise, specific instructions

---

## 🌬️ It Is A Burnt Sacrifice, An Offering Made By Fire, Of A Sweet Savour Unto The LORD

This same closing phrase now finishes all three offering types in the chapter - herd, flock, and bird. The identical ending each time makes the chapter's point impossible to miss: God's acceptance never scaled with what a worshipper could afford. Leviticus opens its very first chapter making that plain before it moves on to anything else.

🔁 This exact phrase now closes all three offering tiers in the chapter

⚖️ The identical ending confirms acceptance was never based on cost

📖 Leviticus makes this point in its very first chapter, before covering anything else`;

export const LEVITICUS_ONE_PERSONAL_SECTIONS = parseLeviticusOneRawNotes(LEVITICUS_ONE_RAW_NOTES);
