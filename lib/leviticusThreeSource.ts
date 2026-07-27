export type LeviticusThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusThreeRawNotes(rawText: string): LeviticusThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 3:${startVerse}` : `Leviticus 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Leviticus 3 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_THREE_RAW_NOTES = `# Leviticus 3:1-5

# 🕊️ The Peace Offering, From The Herd

---

## 🕊️ A Sacrifice Of Peace Offering

"Peace offering" translates the Hebrew word shelamim, related to shalom, meaning wholeness and well-being. This is the third offering type Leviticus explains, after the burnt offering in chapter 1 and the grain offering in chapter 2. It's the only one of the three where the worshipper actually gets to eat part of the meat himself, turning the sacrifice into a shared meal with God.

🕊️ "Peace offering" (shelamim) comes from shalom, meaning wholeness and well-being

🔥🌾 Chapters 1 and 2 already covered the burnt offering and the grain offering

🍽️ This is the first offering type where the worshipper eats part of the meat himself

---

## ⚧️ Whether It Be A Male Or Female

The burnt offering in chapter 1 required a male animal every time. The peace offering relaxes that rule - either sex was acceptable here. This isn't a lower standard, just a different kind of offering with a different purpose: the burnt offering pictured total, costly surrender, while the peace offering centered on fellowship and a shared meal, so the male-only requirement didn't carry over.

🐂 Chapter 1's burnt offering required a male animal, no exceptions

🐄 The peace offering allowed either a male or a female

🎯 Different offerings served different purposes, so their rules differed too

---

## ✅ Without Blemish Before The LORD

Even with the male-or-female flexibility, one rule never changed: the animal still had to be physically perfect, free of injury, disease, or defect. Giving God a flawed animal was never allowed, no matter which offering type was in view.

✅ "Without blemish" means no injury, disease, or physical defect

🔁 This exact standard already applied to the burnt offering in chapter 1

🎁 Some rules flexed between offering types; this one never did

---

## ✋ He Shall Lay His Hand Upon The Head Of His Offering

This is the same identifying gesture already seen in chapter 1 - a hand pressed on the animal's head, linking the worshipper to the animal about to die. Here it carries a slightly different weight: this offering isn't primarily about atonement for sin, it's about celebrating peace and fellowship with God, so the gesture marks this particular animal as this particular person's gift.

✋ Laying a hand on the head marked the animal as belonging to this offerer

🔁 The same gesture already appeared with the burnt offering in chapter 1

🤝 Here it's tied to fellowship and thanksgiving, not primarily to atonement for sin

---

## 🚪 Kill It At The Door Of The Tabernacle Of The Congregation

Same fixed location as the other offerings - the entrance to the tent, where the altar stood. No matter which of the three offering types a family brought, it all happened in the same place, in full view, never privately or wherever felt convenient.

🚪 The tabernacle's entrance, where the altar stood, was the required location

🔁 Chapters 1 and 2 already established this same fixed spot

👁️ Every offering type happened openly, not in private

---

## 🩸 Aaron's Sons The Priests Shall Sprinkle The Blood Upon The Altar Round About

"Round about" means all four sides of the altar, a complete and deliberate application, not a quick splash. Handling the blood was a priest's job alone - a detail that stayed consistent across every offering type in Leviticus so far.

🩸 "Round about" means blood was applied on all four sides of the altar

👤 Only a priest could handle the blood, never the ordinary worshipper

🔁 This same detail already applied to both earlier offering types

---

## 🥩 The Fat That Covereth The Inwards

"Inwards" means the internal organs. The fat surrounding them was set apart specifically for God - it never went to the priest or the worshipper as food. Verse 16, at the end of this chapter, states the rule plainly: all the fat belongs to the LORD.

🥩 "Inwards" refers to the internal organs

🚫 The fat covering them was never eaten by anyone, priest or worshipper

📖 Verse 16 later spells out this rule directly: the fat is the LORD's

---

## 🫘 The Two Kidneys, And The Fat...By The Flanks

"Flanks" means the sides of the body, near the lower back. Ancient Israelites connected the kidneys to a person's deepest emotions and conscience - Scripture elsewhere speaks of God "trying the reins" (an old word for kidneys) to describe testing what's truly inside a person (Psalm 7:9, Jeremiah 17:10). Removing this specific fat for the altar wasn't random butchery; it followed a precise, repeated pattern.

🫘 "Flanks" means the sides of the body, near the lower back

💭 Ancient Israelites connected the kidneys to a person's inner emotions and conscience

📖 Psalm 7:9 and Jeremiah 17:10 describe God "trying the reins" - testing what's inside a person

---

## 🍖 The Caul Above The Liver

The "caul" is a fatty membrane, sometimes called the liver's lobe, that sits over part of that organ. Naming this exact piece, every time, in every offering in this chapter, shows how precisely Leviticus tracked which parts belonged to God and which didn't - nothing was left to guesswork.

🍖 "Caul" refers to a fatty membrane covering part of the liver

📏 The same exact body part is named every time this offering is described

🎯 Precision mattered - nothing about what belonged to God was left vague

---

## 🔥 Burn It On The Altar Upon The Burnt Sacrifice

This detail connects the peace offering directly to the offering that came before it. The altar already had a burnt offering on it, kept burning - Leviticus 6:12-13 later requires the altar fire to never go out - and the peace offering's fat portion was added on top of that fire, not lit separately. The two offerings physically shared the same flame.

🔥 The peace offering's fat was burned on top of an already-burning burnt offering

📖 Leviticus 6:12-13 later requires this altar fire to never go out

🔗 The two offering types physically shared the same fire, not separate ones

---

## 🌬️ An Offering Made By Fire, Of A Sweet Savour Unto The LORD

This same phrase already closed sections in chapters 1 and 2. It means the offering, brought the right way, was accepted and pleasing to God - not that God needed the smoke or the smell. The third offering type in a row ends its first tier with this identical assurance.

🌬️ "Sweet savour" means the offering was accepted, not that God needed food

🔁 The identical phrase already closed sections in both chapters 1 and 2

✅ All three offering types share this same note of acceptance

# Leviticus 3:6-11

# 🐑 The Peace Offering, From The Flock

---

## 🐑 Of The Flock; Male Or Female

Same flexibility as the herd offering just described - either sex was fine for this second, smaller tier. The flock tier (sheep and goats) already appeared as the second, more affordable option for the burnt offering back in chapter 1; here it works the same way for the peace offering.

🐑 Male or female was acceptable, same as the herd offering above

🐐 "Flock" means sheep and goats, a smaller, less costly option than cattle

🔁 Chapter 1 already used this same herd-then-flock structure

---

## 🐏 If He Offer A Lamb

This verse narrows down to a lamb specifically - the goat option comes in verse 12. Splitting "flock" into its two versions, lamb then goat, mirrors how carefully this whole chapter tracks small distinctions between very similar offerings.

🐏 "Lamb" narrows the flock category down to one specific animal

🐐 The goat version of this same offering comes later, in verse 12

📋 The chapter tracks each small variation with its own instructions

---

## ✋ Lay His Hand Upon The Head Of His Offering (Again)

The same identifying gesture from verse 2 repeats here for the lamb. Every worshipper, whatever animal he brought, personally marked it as his before it died.

✋ The same hand-on-the-head gesture already described for the herd offering

🔁 This detail doesn't change based on which animal was offered

🤝 Every worshipper personally identified with the animal, regardless of cost

---

## 🔪 Kill It Before The Tabernacle Of The Congregation

Same fixed location, same requirement already explained for the herd offering. The lamb didn't get slaughtered at home or in a field - it had to happen at the tabernacle's entrance, just like every offering in this chapter so far.

🚪 The lamb was killed at the tabernacle's entrance, same as the herd offering

🔁 Location never changed regardless of which animal a worshipper brought

📍 This consistency runs through every offering type in this chapter

---

## 🩸 Aaron's Sons Shall Sprinkle The Blood Thereof Round About Upon The Altar

Same priestly duty, same "round about" thoroughness already explained for the herd offering. No matter which animal came through the door, the blood was handled by a priest, completely, on every side of the altar.

🩸 The same "round about" application already described for the herd offering

👤 Blood-handling stayed a priest's job regardless of the animal's size or cost

⚖️ A lamb received exactly the same careful treatment as an ox

---

## 🐑 The Fat Thereof, And The Whole Rump

"Rump" is a new detail that didn't appear with the herd offering - many sheep raised in the ancient Near East were a fat-tailed breed, whose tails stored a large, distinct deposit of fat prized as a delicacy. Because that tail fat was so substantial on this kind of sheep, Leviticus calls it out by name here instead of leaving it lumped in with the rest of the fat.

🐑 Many ancient Near Eastern sheep had large, fat-storing tails

🍖 That tail fat was substantial enough to be named on its own

📋 This detail wasn't needed for the herd offering, since cattle don't have this feature

---

## ✂️ It Shall He Take Off Hard By The Backbone

"Hard by" is an old way of saying "right next to" or "close against." The fatty tail had to be removed by cutting close to the spine, not left attached with extra flesh or taken carelessly further down.

✂️ "Hard by" is an old phrase meaning "right next to" or "close against"

🦴 The cut was made close to the backbone, not further down the tail

📏 Precision, again, mattered even in this small cutting detail

---

## 🥩 The Fat That Covereth The Inwards (Again)

The same fat-removal instructions from the herd offering repeat here almost word for word - the inward-covering fat, the two kidneys, the caul above the liver. This isn't the chapter running out of new things to say; it's making sure a worshipper bringing a lamb followed the identical standard as one bringing an ox.

🔁 This repeats the herd offering's fat instructions almost word for word

⚖️ A lamb owner met the exact same standard as a cattle owner

🎯 Consistency, not variety, is the point of the repetition

---

## 🔥 The Priest Shall Burn It Upon The Altar

Notice the wording shift - earlier verses said "Aaron's sons," and now it simply says "the priest." Both phrases point to the same priestly family carrying out tabernacle duties; Leviticus isn't being inconsistent, just using different ways to refer to the same office.

👤 "The priest" and "Aaron's sons" refer to the same priestly family

🔁 Both phrases describe the identical role already explained in chapter 1

📖 Leviticus varies its wording without changing what's actually meant

---

## 🍞 It Is The Food Of The Offering Made By Fire

Here Leviticus calls the burned portion "food" - not because God eats it, but because this is picture-language for an offering fully accepted and consumed, the same way a meal is fully consumed by whoever eats it. This word choice ties back to chapter 2, where the leftover grain offering literally became food for the priests.

🍞 "Food" here is picture-language for an offering fully given and accepted

🚫 God doesn't literally eat the smoke - the word is symbolic

🌾 Chapter 2 used "food" more literally, for the priests' actual leftover meal

---

## 🌬️ No "Sweet Savour" This Time

Unlike verse 5's ending for the herd offering, this verse skips the words "sweet savour." That's a real difference in wording, not a difference in meaning - verse 16 brings the fuller phrase back for the goat offering, showing that both versions describe the same accepted, pleasing gift to God.

📝 Verse 5 said "sweet savour" for the herd offering; this verse doesn't repeat it

🔁 Verse 16 later brings the fuller phrase back for the goat offering

✅ The shorter and longer wording both describe the same accepted offering

# Leviticus 3:12-17

# 🐐 The Goat Offering, And A Permanent Rule

---

## 🐐 If His Offering Be A Goat

This is the third and final animal option in the chapter. Unlike the herd and flock instructions earlier, this verse skips repeating "male or female" and "without blemish" - not because those rules no longer applied, but because Leviticus has already established them twice and doesn't need to spell them out a third time.

🐐 The goat is the third and final offering option in this chapter

📏 "Male or female" and "without blemish" still applied, just weren't repeated again

✂️ Leviticus shortens its wording once a rule has already been fully explained

---

## ✋🔪 Lay His Hand Upon The Head Of It...Kill It

For the third time in this chapter, the same two actions repeat: the identifying hand, then the killing at the tabernacle's entrance. Three tiers, three animals, one unchanging process.

🔁 This is the third time this exact two-step process appears in this chapter

🐂🐑🐐 Herd, flock, and now goat all follow the identical pattern

🎯 The chapter's point: the process never bends based on the animal

---

## 🩸 The Sons Of Aaron Shall Sprinkle The Blood Thereof Upon The Altar Round About

Same priestly duty, same complete application on all sides of the altar, for the third and final time in this chapter. By now the pattern is unmistakable on purpose.

🩸 The same "round about" blood application already used twice in this chapter

👤 Still exclusively a priest's task, never the worshipper's

🔁 Three offerings, three identical blood procedures

---

## 🥩 The Fat, The Kidneys, And The Caul Above The Liver (A Third Time)

The identical fat-removal details - inward-covering fat, two kidneys, caul above the liver - repeat here for the third animal in a row. This chapter is built on repetition on purpose: no matter the animal's size, cost, or species, God claimed the exact same specific portions every time.

🔁 The same fat portions named for the herd and flock offerings repeat here again

⚖️ Cattle, sheep, and now goats all met one identical standard

🎯 Three repeats in one chapter is a deliberate teaching tool, not filler

---

## ⭐ All The Fat Is The LORD's

This exact sentence doesn't appear after the herd or lamb sections - it shows up here, at the very end of the goat instructions, as a summary statement covering the whole chapter. After three rounds of naming the same fat portions, Leviticus states the underlying rule plainly: none of that fat ever belonged to a person, priest or worshipper. It belonged to God alone.

⭐ This summary line only appears once, closing out all three offering types

🚫 The fat was never available for a priest or worshipper to eat

🎯 Three rounds of examples end in one plain, direct statement

---

## 🌬️ The Food Of The Offering Made By Fire For A Sweet Savour

Here both phrases - "food" and "sweet savour" - appear together, unlike verse 11's lamb offering, which used "food" alone. Putting them back together at the chapter's close ties every version of this offering, however it was worded along the way, back to the same single meaning: a gift fully given and fully accepted.

📝 Verse 11 used "food" alone; this verse brings back "sweet savour" too

🔗 Combining both phrases ties every version of this offering to the same idea

✅ Herd, lamb, and goat all end up meaning exactly the same thing to God

---

## 📜 A Perpetual Statute For Your Generations

"Perpetual statute" means a permanent law, not a temporary rule for just that moment in the wilderness. "Generations" means Israel's descendants across all future time - this command wasn't meant to expire once the original audience died out.

📜 "Perpetual statute" means a law meant to last permanently

👨‍👩‍👧‍👦 "Generations" means Israel's descendants across all future time

🚫 This wasn't a temporary wilderness-only rule

---

## 🗺️ Throughout All Your Dwellings

This rule wasn't limited to activity happening right at the tabernacle - it reached every place an Israelite family actually lived, across the whole land. Wherever Israel settled, this law traveled with them.

🗺️ "Dwellings" means everywhere Israelites actually lived, not just at the tabernacle

🌍 The rule applied nationwide, not only at the central place of worship

📦 A law given in the wilderness was built to travel with Israel into the land

---

## 🚫 Ye Shall Eat Neither Fat...

This ban covers the fat already discussed all through this chapter - the exact portions that went to the altar, never to a person's table. Verse 16 just said this fat belonged to the LORD; this final verse turns that fact into a permanent command for every Israelite household.

🚫 This fat is the exact same fat the chapter has been describing throughout

⭐ Verse 16 already called this fat the LORD's; here it becomes a binding rule

🏠 The command applied to every Israelite household, not just those bringing offerings

---

## 🩸 ...Nor Blood

Blood gets its own separate ban, for a different reason than fat. Leviticus 17:11 later spells it out: "the life of the flesh is in the blood." Blood wasn't just another body part - it stood for life itself, and life belonged to God, not to the dinner table.

🩸 Blood was banned for a different reason than fat

📖 Leviticus 17:11 explains it directly: "the life of the flesh is in the blood"

💛 Blood represented life itself, which belonged to God alone`;

export const LEVITICUS_THREE_PERSONAL_SECTIONS = parseLeviticusThreeRawNotes(LEVITICUS_THREE_RAW_NOTES);
