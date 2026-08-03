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

"Peace offering" means friendship and wholeness with God.

This is the third kind of offering explained in Leviticus.

The first two were the burnt offering and the grain offering.

This offering lets the worshipper eat part of the meat himself.

It becomes a shared meal with God, not just smoke rising into the sky.

🕊️ Peace offering means friendship with God

🔥 Burnt and grain offerings came first

🍽️ The worshipper eats part of this one

📖 A shared meal, not just smoke

## 🐂 Of The Herd

"Herd" means cattle, the largest animals a family might own.

Leviticus already used this same herd first pattern for the burnt offering in chapter one.

Flock animals come next, a smaller and more affordable option.

A worshipper offered whichever tier matched what he actually owned.

🐂 Herd means the largest, most valuable animals

🔁 Chapter one already used this same tier system

🐑 Flock animals come next, a cheaper option

📖 Worshippers gave according to what they owned

## 🐄 Whether It Be A Male Or Female

The burnt offering in chapter one required a male animal every time.

This offering allows either a male or a female.

That is not a lower standard, only a different purpose.

The burnt offering pictured total surrender.

This offering pictures fellowship instead.

🐂 Chapter one required a male animal only

🐄 This offering allows a male or female

🎯 Different offerings serve different purposes

📖 Fellowship replaces total surrender here

## ✅ Without Blemish Before The LORD

"Blemish" means any injury, disease, or physical flaw.

This exact standard already applied to the burnt offering in chapter one.

Some rules changed between offering types, like which sex was allowed.

This rule never changed no matter which offering a worshipper brought.

✅ Blemish means injury, disease, or a flaw

🔁 Chapter one already required this same standard

🔀 Some offering rules flexed between the three types

📖 A flawed animal was never acceptable to give

## ✋ Lay His Hand Upon The Head Of His Offering

This hand on the head gesture already appeared with the burnt offering in chapter one.

A worshipper pressed his hand on the animal to mark it as his own gift.

Here the meaning shifts slightly toward fellowship instead of guilt.

This offering celebrates peace with God more than it covers sin.

✋ The same hand gesture as chapter one

🎁 It marked the animal as this offerer's gift

🤝 Here it points to fellowship, not guilt

📖 Peace with God is the focus here

## 🚪 Kill It At The Door Of The Tabernacle Of The Congregation

The "door of the tabernacle" was the entrance to the tent, where the altar stood.

Every offering in this chapter happened at this exact same spot.

No family sacrificed animals at home or out in a private field.

Worship here always happened out in the open, in front of everyone.

🚪 The tabernacle entrance is where the altar stood

🔁 Every offering type used this same location

🏠 No one sacrificed animals privately at home

📖 Openness before God mattered more than convenience

## 🩸 Aaron's Sons The Priests Shall Sprinkle The Blood

Handling the blood was never the worshipper's job.

Only Aaron's sons, the ordained priests, were allowed to touch it.

This same rule already applied to the burnt offering in chapter one.

The blood represented life itself, so only the priest could bring it to the altar.

🩸 Only priests could handle the blood

👤 Aaron's sons means the ordained priesthood

🔁 Chapter one already set this same rule

📖 Blood represented life, so priests alone carried it

## 🔄 Round About

"Round about" means every side of the altar, not just one splash of blood.

The priest walked the altar and applied blood on all four sides.

This was a careful, complete action, not a quick or careless one.

Every offering in this chapter required this same thorough application.

🔄 Round about means all four sides

🩸 Blood touched the entire altar, not one spot

🎯 This was careful, not quick or careless

📖 Every offering type required this same care

## 🥩 The Fat That Covereth The Inwards

"Inwards" means the internal organs inside the animal's body.

The fat surrounding those organs belonged to God alone.

No priest and no worshipper ever ate this particular fat.

It belonged to God, not to people.

Verse sixteen, later in this chapter, states the rule plainly.

🥩 Inwards means the internal organs

🚫 This fat was never eaten by anyone

⭐ It belonged to God, not to people

📖 Verse sixteen later states this rule plainly

## 🫘 The Two Kidneys, Which Is By The Flanks

"Flanks" means the sides of the body, near the lower back.

Ancient Israelites connected the kidneys to a person's deepest feelings.

Scripture describes God testing "the reins," an old phrase for testing what is inside a person.

Removing this fat followed an exact, repeated pattern, not random butchering.

🫘 Flanks means the sides near the lower back

💭 Kidneys stood for a person's inner feelings

📜 Scripture speaks of God testing the reins

📖 This cut followed an exact pattern every time

## 🍖 The Caul Above The Liver

The "caul" is a fatty membrane that covers part of the liver.

This exact same body part gets named every single time this offering appears.

Nothing about what belonged to God was left vague or up for guessing.

Precision mattered here, down to one specific piece of fat.

🍖 Caul means a fatty membrane over the liver

📏 This same body part is named every time

🎯 Nothing here was left vague or unclear

📖 Precision mattered, down to one exact piece

## 🔥 Burn It On The Altar Upon The Burnt Sacrifice

This peace offering was not burned on a separate fire of its own.

The altar already held a burnt offering, kept burning at all times.

Leviticus six later requires that this altar fire never go out.

The fat from this offering was simply added on top of that same fire.

🔥 The altar fire was already burning

🔁 The peace offering shared that same fire

🔗 Two offerings burned on one continuous flame

📖 This altar fire was never allowed to die

## 🌬️ An Offering Made By Fire, Of A Sweet Savour Unto The LORD

"Sweet savour" means the offering was fully accepted and pleasing to God.

It does not mean God needed the smoke or the smell for food.

This same phrase already closed sections in chapters one and two.

Three offering types in a row end on this identical note of acceptance.

🌬️ Sweet savour means fully accepted by God

🚫 God did not need the smoke for food

🔁 Chapters one and two already used this phrase

📖 Three offering types share this same ending

# Leviticus 3:6-11
# 🐑 The Peace Offering, From The Flock
---
## 🐑 Of The Flock

"Flock" means sheep and goats, a smaller and more affordable group of animals.

This is the second tier, just like it was for the burnt offering in chapter one.

Either a male or a female was acceptable here too.

The same flexibility from the herd offering carries over to this smaller tier.

🐑 Flock means sheep and goats

💰 A smaller, more affordable tier than cattle

🐄 Male or female was fine here too

📖 The same herd flexibility carries over here

## 🐏 If He Offer A Lamb

This verse narrows the flock category down to one specific animal, a lamb.

The goat option, the other half of flock, comes later in verse twelve.

Splitting flock into lamb and goat shows how carefully this chapter tracks small differences.

Every animal type gets its own exact set of instructions.

🐏 Lamb narrows flock down to one animal

🐐 The goat version comes later, in verse twelve

📋 The chapter tracks each small difference on purpose

📖 Every animal type gets its own instructions

## 🔪 Kill It Before The Tabernacle Of The Congregation

This verse repeats the same hand on the head gesture explained back in verse two.

It also repeats the same fixed location as the herd offering.

Here the text says before the tabernacle instead of at the door of it.

Both phrases point to the exact same spot, the tabernacle's entrance.

✋ The same hand gesture repeats here again

📍 The same fixed location as before

📝 Before means the same as at the door

📖 The lamb met the same exact standard

## 🐑 The Fat Thereof, And The Whole Rump

"Rump" refers to the fat tail of certain sheep raised in this region.

Many ancient Near Eastern sheep were a fat tailed breed.

Their tails stored a large, distinct deposit of fat, prized as a delicacy.

Because that tail fat was so large, Leviticus names it on its own here.

The herd offering never mentioned this detail, since cattle do not have this feature.

🐑 Rump means the fat tail of these sheep

🧈 Many local sheep had large fat tails

🍖 This fat was prized as a delicacy

📖 Cattle lack this feature, unlike sheep

## ✂️ It Shall He Take Off Hard By The Backbone

"Hard by" is an old phrase meaning right next to or close against.

The fatty tail had to be cut close to the spine.

It could not be left attached with extra flesh still on it.

Precision mattered again, even in this small cutting detail.

✂️ Hard by means right next to

🦴 The cut was made close to the spine

📏 Extra flesh could not be left attached

📖 Even small cutting details carried precise rules

## 🥩 The Two Kidneys, And The Caul Above The Liver

This verse repeats the exact same fat instructions already given for the herd offering.

The kidneys, the flank fat, and the caul above the liver all return here.

This is not the chapter running out of new things to say.

It is making sure a lamb owner met the same standard as a cattle owner.

🔁 These same fat instructions already appeared once

⚖️ A lamb owner met the same standard

🐄 A cattle owner faced this exact standard too

📖 Repetition here proves the standard never changed

## 👤 The Priest Shall Burn It Upon The Altar

Earlier verses said "Aaron's sons."

This verse simply says "the priest."

Both phrases point to the exact same priestly family and office.

Leviticus varies its wording without ever changing what is actually meant.

👤 Aaron's sons means the priestly family

🔁 The priest refers to that same family

✍️ Different words, same job every time

📖 Leviticus varies wording without changing the meaning

## 🍞 It Is The Food Of The Offering Made By Fire

Leviticus calls this burned portion "food," but God does not literally eat it.

This is picture language for an offering that is fully given and fully accepted.

Chapter two already used the word "food" for the priests' actual leftover meal.

Here the same word paints a different, symbolic picture instead.

🍞 Food here is picture language, not literal eating

🚫 God does not literally eat the smoke

🌾 Chapter two used food for a real meal

📖 The same word paints two different pictures

## 📝 Unto The LORD

Verse five, for the herd offering, ended with the words "sweet savour."

This verse, for the lamb, leaves those words out.

That is a real difference in wording, not a difference in meaning.

Verse sixteen later brings the fuller phrase back for the goat offering.

Herd, lamb, and goat all still describe one single, accepted gift to God.

📝 Verse five said sweet savour for the herd

✂️ This verse leaves those words out

🔁 Verse sixteen brings the fuller phrase back

📖 All three offerings mean the same accepted gift

# Leviticus 3:12-17
# 🐐 The Goat, And A Perpetual Rule
---
## 🐐 If His Offering Be A Goat

The goat is the third and final animal option in this chapter.

This verse skips repeating "male or female" and "without blemish."

Those rules still applied here.

Leviticus simply did not spell them out a third time.

Once a rule has been fully explained twice, the text shortens.

🐐 Goat is the third and final option

✂️ Male or female, without blemish, stay unstated

📏 Both rules still fully applied to the goat

📖 Leviticus shortens wording once a rule is clear

## 🔪 Lay His Hand Upon It, Kill It

For the third time in this chapter, the same two steps repeat.

A worshipper laid his hand on the animal, then killed it at the tabernacle.

Herd, flock, and now goat all follow this identical process.

The process never bends based on which animal a family could afford.

🔁 The third time this same process appears

🐐 Herd, flock, and now goat all match

🎯 God required this process every single time

📖 Consistency mattered more than the animal's cost

## 🥩 The Fat, The Kidneys, And The Caul Above The Liver

The same fat instructions repeat here for the third animal in a row.

The fat covering the inwards, the two kidneys, and the caul above the liver all return.

This chapter repeats itself on purpose, not out of laziness.

No matter the animal's size or cost, God claimed these exact same parts every time.

🔁 The same fat parts repeat a third time

🥩 Inwards fat, kidneys, and caul all return

🎯 Repetition here is deliberate, not accidental

📖 God claimed the same parts every time

## ⭐ All The Fat Is The LORD's

This exact sentence never appeared after the herd or lamb instructions.

It shows up only here, at the end of the goat instructions.

After three rounds of naming the same fat, Leviticus states the rule plainly.

That fat never belonged to a person, priest or worshipper alike.

It belonged to God alone.

⭐ This summary line appears only once

🚫 The fat was never available to eat

👤 Not the priest, not the worshipper either

📖 Three examples end in one plain statement

## 🌬️ The Food Of The Offering Made By Fire For A Sweet Savour

Here both phrases, "food" and "sweet savour," appear together.

Verse eleven, for the lamb, used only the word "food" alone.

Bringing both phrases back together closes out the chapter with one full meaning.

Herd, lamb, and goat all end up meaning the exact same thing to God.

📝 Food and sweet savour appear together here

✂️ Verse eleven used only the word food

🔗 Both phrases together close out the chapter

📖 Every offering means the same thing to God

## 📜 A Perpetual Statute For Your Generations

"Perpetual statute" means a permanent law, not a rule only for that moment.

"Generations" means Israel's descendants across all future time.

This command was never meant to expire once the first audience died out.

It was built to outlast the wilderness and travel into the future.

📜 Perpetual statute means a permanent law

👨‍👩‍👧‍👦 Generations means all of Israel's future descendants

🚫 This was never a temporary wilderness rule

📖 The law was built to outlast that generation

## 🗺️ Throughout All Your Dwellings

"Dwellings" means every place an Israelite family actually lived.

This rule was not limited to activity right at the tabernacle.

It reached every home, across the whole land, not just the center of worship.

Wherever Israel settled, this law traveled with them.

🗺️ Dwellings means everywhere Israelites actually lived

🏠 Not limited to activity at the tabernacle

🌍 The rule applied nationwide, not only centrally

📖 This law traveled with Israel everywhere

## 🚫 Ye Shall Eat Neither Fat

This ban covers the exact fat described all through this chapter.

That fat always went to the altar, never to a family's table.

Verse sixteen already called this fat the LORD's alone.

Here that fact becomes a binding command for every household.

🚫 This bans the fat named in this chapter

⭐ Verse sixteen already called this fat the LORD's

🏠 Every household was bound, not just offerers

📖 A stated fact becomes a binding rule here

## 🩸 Nor Blood

Blood gets its own separate ban, for a different reason than fat.

Leviticus seventeen later explains it directly.

"The life of the flesh is in the blood."

Blood was not just another body part.

It stood for life itself, and life belonged to God alone.

🩸 Blood was banned for a different reason

❤️ The life of the flesh is blood

📖 Leviticus seventeen explains this idea further

➡️ Life itself belonged to God, not the table
`.trim();

export const LEVITICUS_THREE_PERSONAL_SECTIONS = parseLeviticusThreeRawNotes(LEVITICUS_THREE_RAW_NOTES);
