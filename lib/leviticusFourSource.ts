export type LeviticusFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusFourRawNotes(rawText: string): LeviticusFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 4:${startVerse}` : `Leviticus 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Leviticus 4 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_FOUR_RAW_NOTES = `# Leviticus 4:1-4

# 🐂 Sin Without Realizing It

---

## 📜 The LORD Spake Unto Moses, Saying

This exact sentence opens dozens of Leviticus's sections. It marks this as a direct command from God, spoken to Moses to relay to the people, not a tradition Israel invented on its own. Chapter 4 introduces a brand new offering type: the sin offering, following the burnt offering (chapter 1), grain offering (chapter 2), and peace offering (chapter 3).

📜 This formula opens most of Leviticus's major sections

🆕 Chapter 4 introduces the fourth offering type, the sin offering

🔢 Chapters 1-3 already covered the burnt, grain, and peace offerings

---

## 😶 A Soul Shall Sin Through Ignorance

"Soul" (Hebrew nephesh) is just an old way of saying "a person" - not some separate spiritual part of someone. "Through ignorance" means the person did something wrong without realizing it was wrong at the time, a genuine mistake, not open defiance.

This whole chapter deals only with unintentional sin. Numbers 15:30 draws a sharp line: someone who sins "with a high hand" - on purpose, knowing better - isn't covered by this offering at all.

😶 "Soul" (nephesh) simply means "a person," not a separate spirit-part

🤷 "Through ignorance" means an honest mistake, not defiance

🚫 Numbers 15:30 says deliberate, "high-handed" sin isn't covered by this offering

---

## ⛔ Concerning Things Which Ought Not To Be Done

This chapter is specifically about breaking a "thou shalt not" - a prohibition - not about failing to do something God commanded. Leviticus 5 later adds cases about failing to act, like refusing to testify; chapter 4 stays focused on things a person actively, if unknowingly, did wrong.

⛔ This chapter covers broken prohibitions, not neglected duties

📖 Leviticus 5 later covers different, related failure-to-act cases

🎯 The distinction matters for which offering fits which situation

---

## 👑 If The Priest That Is Anointed Do Sin According To The Sin Of The People

"The priest that is anointed" means the High Priest - Aaron, and later whoever held his office - anointed with the special oil recipe from Exodus 30. "According to the sin of the people" is the striking part: his sin counts as seriously as if the entire nation had sinned.

That's because of his role. The High Priest represented all of Israel before God every single day. If the one man standing between the nation and God was compromised, it put everyone's relationship with God at risk, not just his own.

👑 "The priest that is anointed" means the High Priest, Aaron's office

⚖️ His sin is treated as seriously as if the whole nation had sinned

🤝 His representative role meant his failure put everyone's standing with God at risk

---

## 🐂 A Young Bullock Without Blemish

This chapter grades the size of the required offering by how much responsibility the sinner carried, and the priest sits at the very top of that scale. A bullock, a young bull, was the largest, costliest animal used in any Leviticus offering. "Without blemish" means physically flawless - no injury, disease, or defect, the same unbending standard already required in chapters 1-3.

🐂 A bullock, the costliest animal offered in Leviticus, matches the priest's high responsibility

📉 Later in this chapter, the required animal gets smaller as the offender's public role shrinks

✅ "Without blemish" - no injury, disease, or defect - never changes across any tier

---

## 🚪 Unto The Door Of The Tabernacle Of The Congregation

Same fixed location already used for every offering type so far - the entrance to the tent, in the open, where anyone present could see. No offering in Leviticus happens in secret or wherever is convenient for the offerer.

🚪 The tabernacle's entrance was the required site for every offering type

👁️ This kept every sacrifice public and visible, never done in private

🔁 Chapters 1-3 already established this exact same location

---

## ✋ Shall Lay His Hand Upon The Bullock's Head, And Kill The Bullock

The same identifying gesture from chapters 1-3 - a hand pressed on the animal's head, linking the offerer to the animal about to die in his place. What's different here: normally the priest facilitates this ritual for someone else. This time he's confessing his own guilt and identifying himself with the animal.

✋ Laying a hand on the head marks the animal as standing in for the offerer

🔁 This same gesture already appeared with every offering type in chapters 1-3

🪞 Uniquely here, the priest is offering for his own sin, not someone else's

---

## 🔁 For His Sin, Which He Hath Sinned

Hebrew often repeats a verb with its matching noun for emphasis - "sinned a sin," or here "for his sin, which he hath sinned." It reads like clunky repetition in English, but in Hebrew it's a normal way of underlining that something really happened, not softening it into something vague.

🔁 Hebrew often pairs a verb with its matching noun for emphasis

📝 This isn't awkward repetition - it's a normal way to underline something happened

🔂 This same construction repeats for nearly every tier in this chapter

# Leviticus 4:5-12

# 🩸 Blood Reaches The Veil

---

## 🏛️ Bring It To The Tabernacle Of The Congregation

In chapters 1-3, blood only ever touched the outer bronze altar, out in the courtyard. Here, for the first time, the priest carries blood inside the tent itself - a much deeper, more serious ritual, because a sin this significant reaches further into the sanctuary than an ordinary offering.

🏛️ This is the first time in Leviticus blood is carried inside the tent itself

📈 The seriousness of the sin determines how deep into the sanctuary the ritual goes

🔁 Chapters 1-3's blood applications stayed at the outer altar only

---

## 7️⃣ Sprinkle Of The Blood Seven Times Before The LORD

Seven shows up throughout the Bible as a number tied to completeness - seven days of creation, seven-day feasts, and here, seven sprinklings to fully and completely deal with this sin. It wasn't a quick flick of the finger; it was a deliberate, repeated act.

7️⃣ Seven often represents completeness throughout the Bible

🔁 Repeating the sprinkling seven times made this a deliberate, thorough act

🩸 A single drop wasn't considered sufficient for guilt this serious

---

## 🧵 Before The Vail Of The Sanctuary

The veil was the heavy curtain separating the Holy Place, where priests served daily, from the Most Holy Place, where the ark of the covenant sat and only the High Priest could enter, once a year. Sprinkling blood toward the veil brought this sin symbolically as close to God's own throne room as anyone but the High Priest on the Day of Atonement was ever allowed to go.

🧵 The veil separated the Holy Place from the Most Holy Place, where the ark sat

🚫 Only the High Priest could pass beyond the veil, and only once a year

📍 This ritual brought the sin's weight right up to that boundary

---

## 🌬️ Upon The Horns Of The Altar Of Sweet Incense

This is a second golden altar, standing just outside the veil, used only for burning incense (Exodus 30:1-10) - different from the large bronze altar for burnt offerings out in the courtyard. Its "horns" were pointed corner projections. Touching blood to these horns marks this as a deeper application than chapters 1-3 ever required.

🌬️ The incense altar was a separate, smaller golden altar just outside the veil

📐 "Horns" means the pointed corner projections on top of the altar

📏 This deeper application matches how serious the priest's sin is

---

## ⬇️ Pour All The Blood At The Bottom Of The Altar Of The Burnt Offering

After the special applications inside the tent, whatever blood was left over was disposed of at the base of the main altar out in the courtyard - never reused, never handled casually, never simply discarded elsewhere.

⬇️ Leftover blood was poured out at the base of the outer altar

🚫 Blood in Leviticus is never treated as ordinary waste

📍 Even disposal followed a fixed, required location

---

## 🥩 The Fat That Covereth The Inwards, The Kidneys, And The Caul Above The Liver

"Inwards" means the internal organs, and the "caul" is a fatty membrane over part of the liver. This is the exact same list of fat portions already named for the peace offering in chapter 3 - fat that belonged to God alone, never eaten by anyone.

🥩 "Inwards" means the internal organs; the "caul" covers part of the liver

🔁 This is the identical fat list already used for the peace offering in chapter 3

🚫 None of this fat was ever eaten - it belonged to God alone

---

## ⚖️ As It Was Taken Off From The Bullock Of The Sacrifice Of Peace Offerings

Leviticus explicitly points back to chapter 3's instructions instead of repeating every measurement again. The fat-removal procedure stayed identical across totally different offering types with totally different purposes - only what happened to the rest of the animal changed.

⚖️ Leviticus cross-references chapter 3 instead of re-explaining the same steps

🔗 The fat-removal procedure stayed the same across different offering types

🎯 What changed between offerings was the purpose and the remains, not this step

---

## 🚫 The Skin, The Flesh, The Head, The Legs, The Inwards, And The Dung

This is nearly the entire animal, everything except the fat God claimed. Unlike the peace offering, where the worshipper ate part of the meat, or the grain offering, where the priests ate the leftovers, none of this bullock was eaten by anyone.

🚫 This list covers almost the whole animal, minus the fat already removed

🍽️ The peace offering (chapter 3) let the worshipper eat some meat; this offering didn't

🙅 Nobody - not the priest, not the offerer - ate any part of this bullock

---

## 🏕️ Carry Forth Without The Camp Unto A Clean Place

"Without the camp" means outside Israel's entire tent city, past its boundaries. A "clean place" was a designated spot kept free from anything that would make it ritually impure - the remains couldn't just be dumped anywhere.

This detail matters far beyond Leviticus. Hebrews 13:11-12 directly connects this pattern to Jesus, who "suffered without the gate" - crucified outside Jerusalem's walls - drawing a straight line from this ancient rule to the cross.

🏕️ "Without the camp" means fully outside Israel's tent city

🧹 A "clean place" was a specific, designated, ritually pure location

✝️ Hebrews 13:11-12 ties this exact pattern to Jesus's crucifixion "without the gate"

---

## 🔥 Burn Him On The Wood With Fire, Where The Ashes Are Poured Out

This burning is separate from the fat burned on the altar - the rest of the carcass was destroyed entirely at the ash-disposal site outside camp, not offered as a pleasant gift to God the way the fat was. It was a disposal of guilt, not a gift.

🔥 This burning outside camp is separate from the fat burned on the altar

🗑️ The ash-disposal site was the fixed location for this kind of burning

⚠️ This burning disposed of guilt - it wasn't offered as a pleasing gift like the fat was

---

## 🌬️ The Altar Of Sweet Incense

"Sweet incense" wasn't a generic scent - Exodus 30:34-38 gives its exact recipe (stacte, onycha, galbanum, and frankincense) and bans anyone from making a copy for personal use. This altar sat in the Holy Place, burning that specific incense morning and evening, and this is the first time in Leviticus its horns get blood applied to them.

🌬️ Exodus 30:34-38 gives this incense's exact, one-of-a-kind recipe

🚫 Copying this exact blend for personal use was strictly forbidden

🆕 This is the first time in Leviticus blood touches this particular altar's horns

---

## ⚠️ Handling This Blood Was A Priest's Job Alone

Every single step in this ritual - carrying the blood inside, dipping the finger, sprinkling seven times, applying it to two different altars - belongs to the priest, never the person who actually sinned. The offerer's part ends at laying his hand on the animal.

⚠️ Every blood-handling step belongs to the priest, never the offerer

✋ The offerer's role ends after laying a hand on the animal's head

👤 This division of labor stayed consistent across every offering type in Leviticus

# Leviticus 4:13-21

# 👥 When The Whole Nation Sins Together

---

## 👥 If The Whole Congregation Of Israel Sin Through Ignorance

This covers a shared, corporate mistake - the entire community following bad direction together without realizing it broke God's law. Maybe a bad ruling from Israel's leaders, followed in good faith by everyone. The required offering matches the priest's: a bullock, the costliest animal, because this guilt belongs to the whole nation.

👥 This covers a mistake the entire community made together, in good faith

🐂 The offering matches the priest's tier: a bullock, the costliest animal

⚖️ National guilt is treated with the same seriousness as the High Priest's own

---

## 🙈 The Thing Be Hid From The Eyes Of The Assembly

"Hid from the eyes" means nobody recognized the sin at the time - it wasn't obvious, and nobody knowingly disobeyed. That's exactly what "through ignorance" means throughout this chapter: an honest mistake that only becomes clear later.

🙈 "Hid from the eyes" means the sin wasn't recognized when it happened

🔎 It only became clear as sin sometime after the fact

🔁 This matches "through ignorance," the same standard used all through this chapter

---

## 🗣️ The Assembly

"Assembly" translates the Hebrew qahal - Israel gathered together as one body, whether for worship, war, or, as here, taking responsibility for a shared mistake. The same word describes the whole nation acting as one throughout the Old Testament.

🗣️ "Assembly" (qahal) means Israel gathered together as one body

🤝 The same word describes the nation for worship, war, and shared responsibility

🌍 It pictures Israel acting as a single unit before God, not scattered individuals

---

## 📢 When The Sin...Is Known

The offering only happens once the sin actually comes to light - Leviticus doesn't ask Israel to hunt down every possible hidden mistake, only to respond once one becomes known. Awareness triggers the responsibility to act.

📢 The requirement to offer a sacrifice starts once the sin is discovered

🔍 Israel wasn't expected to search endlessly for undiscovered mistakes

⏰ Discovery, not the original act, is what triggers the response

---

## 👴 The Elders Of The Congregation Shall Lay Their Hands

In the section above, the priest laid his own hand on the animal for his own sin. Here, since an entire nation obviously can't all physically touch one bullock, the elders - Israel's recognized leaders and representatives - do it on everyone's behalf.

👴 Elders were Israel's recognized leaders and representatives

✋ They laid hands on behalf of the whole nation, not just themselves

🔁 This is the same identifying gesture, adapted for a group instead of one person

---

## 🩸 The Priest...Shall Bring Of The Bullock's Blood...Sprinkle It Seven Times...Before The Vail

Every detail from the priest's own sin offering repeats here exactly: blood brought inside, seven sprinklings, application before the veil and on the incense altar's horns. The nation's corporate guilt is handled with the identical depth of ritual as the High Priest's own sin.

🔁 Every blood detail from the priest's offering repeats here exactly

🩸 Seven sprinklings before the veil, same as verses 6-7

⚖️ The whole nation's guilt receives the same depth of treatment as the priest's own

---

## 🥩 He Shall Take All His Fat From Him, And Burn It Upon The Altar

Same fat-removal and altar-burning procedure already spelled out for the priest's own bullock - Leviticus doesn't re-list every organ this time, trusting the reader to remember verses 8-10.

🥩 Same fat portions from verses 8-10 apply here without restating them

✂️ Leviticus shortens repeated instructions once they've already been fully explained

🔥 The altar burning follows the identical pattern already established

---

## ✝️ The Priest Shall Make An Atonement For Them, And It Shall Be Forgiven Them

"Atonement" translates the Hebrew kaphar, meaning to cover over or wipe away, restoring a broken relationship rather than just erasing a record. This is the first time this chapter states the actual outcome plainly: the ritual leads to real forgiveness, not just ritual cleanliness.

✝️ "Atonement" (kaphar) means covering over sin and restoring the relationship

🎁 Forgiveness here is God's gift through the ritual He prescribed, not something earned

📖 This is the chapter's first explicit statement that this process leads to forgiveness

---

## 🔥 Carry Forth The Bullock Without The Camp, And Burn Him As He Burned The First Bullock

"The first bullock" points back to the priest's own animal from verses 11-12. Same disposal, same location, same method, reinforcing that corporate guilt and the High Priest's own guilt are dealt with by an identical process from start to finish.

🔁 "The first bullock" refers back to the priest's animal in verses 11-12

🏕️ Same outside-the-camp disposal used for the priest's own offering

🎯 Corporate and priestly guilt are handled by an identical process, start to finish

---

## 📋 It Is A Sin Offering For The Congregation

This closing label at the end of verse 21 names the offering type explicitly, tying this whole section together under one term: a corporate sin offering. It's the same term used for individuals later in the chapter, but applied here to the nation as a single unit before God.

📋 "Sin offering" is the formal name closing out this section

🧩 The whole nation is treated as one unit before God in this ritual

🔁 The same term applies to individuals in the sections that follow

---

## 🧮 Nine Verses For One Bullock

Stepping back, this entire section, covering an error made by an entire nation, takes the same nine verses and the same one bullock as the High Priest's own personal sin in the section before it. Leviticus doesn't need more ritual just because more people were involved.

🧮 The same length of ritual covers one person's sin and a whole nation's sin

🐂 One bullock proves sufficient no matter how many people the guilt touches

⚖️ More people involved never meant a bigger or longer ritual was required

# Leviticus 4:22-26

# 🐐 When A Leader Sins

---

## 👑 When A Ruler Hath Sinned

"Ruler" translates the Hebrew nasi, meaning a tribal chief or leader, not the nation's highest authority (that's the priest, spiritually, and later the king). This is the third tier in the chapter's scale, one step below the priest and the whole congregation.

👑 "Ruler" (nasi) means a tribal chief or leader, not the top national authority

📊 This is the third of four tiers this chapter covers, in descending order

🔁 The same "through ignorance" standard applies to every tier

---

## 🐐 A Kid Of The Goats, A Male Without Blemish

Notice the offering shrinks: from a bullock, required of the priest and congregation, down to a male goat. The animal's size and cost tracks the offender's scope of public responsibility - a ruler affects fewer people than the priest or the whole nation, so his required offering is smaller, though still male and still physically flawless.

🐐 A goat is smaller and less costly than the bullock required above

📉 The offering size tracks scope of responsibility, not how bad the sin felt

✅ "Without blemish" - no injury, disease, or defect - still never changes

---

## 🔪 Kill It In The Place Where They Kill The Burnt Offering

Leviticus 1:11 fixed this spot on the north side of the altar. Every animal killed in Leviticus so far, no matter the offering type, dies in this same specific location - nothing about the killing itself changes based on who's offering.

🔪 Leviticus 1:11 already fixed this exact spot, north of the altar

📍 Every offering type in Leviticus uses this identical killing location

🔁 Only the blood-handling afterward changes between offering types

---

## 🩸 Put It Upon The Horns Of The Altar Of Burnt Offering

This is the key difference from the priest's and the congregation's offering above. Their blood went inside the tent, before the veil. The ruler's blood never goes past the outer courtyard - it stays on the main bronze altar, out where everyone could see.

The depth of the ritual matches the depth of the damage. A ruler's sin, while serious, doesn't reach into the sanctuary the way the High Priest's own sin or the whole nation's guilt does.

🩸 The ruler's blood stays on the outer altar - it never enters the tent

🏛️ The priest's and congregation's blood, by contrast, went inside, before the veil

📏 Ritual depth is scaled to how far-reaching the sin's damage actually is

---

## ⬇️ Pour Out His Blood At The Bottom Of The Altar

Same leftover-blood disposal already used for the priest's and congregation's offerings, poured at the base of the altar, never reused, never treated as ordinary.

⬇️ Same base-of-the-altar disposal already used earlier in this chapter

🔁 This detail doesn't change no matter which tier is offering

🚫 Leftover blood was never simply discarded or reused

---

## 🔥 Burn All His Fat Upon The Altar, As The Fat Of The Sacrifice Of Peace Offerings

Here's a major structural shift worth catching: starting with the ruler's offering, only the fat goes on the altar - the rest of the meat is not burned outside the camp like the priest's and congregation's bullocks were. Leviticus 6:26 later clarifies what happens instead: the remaining meat becomes food for the priest.

🔥 Only the fat is burned on the altar for this and every tier below it

🍽️ Unlike the priest's/congregation's offering, the rest of the meat isn't burned outside camp

📖 Leviticus 6:26 later explains: this leftover meat becomes the priest's food

---

## ✝️ The Priest Shall Make An Atonement For Him As Concerning His Sin, And It Shall Be Forgiven Him

The same atonement-and-forgiveness promise already given to the congregation now applies personally to an individual ruler. No tier in this chapter, high or low, is left without a path to forgiveness - the size of the animal changes, but the outcome doesn't.

✝️ The same atonement-and-forgiveness promise repeats for this individual tier

🎯 Every tier in this chapter, without exception, ends in the offer of forgiveness

📏 Only the required animal changes across tiers - the outcome never does

---

## 📊 Bullock, Then Goat - The Pattern So Far

A quick recap worth noticing at the halfway point of this chapter: the priest and the whole congregation both required a bullock and inside-the-veil blood; the ruler requires a smaller goat and outer-altar-only blood. Two more tiers, both smaller still, are coming next.

📊 Priest and congregation: bullock, blood inside the veil

📉 Ruler: a smaller goat, blood on the outer altar only

🔜 Two more tiers, both even smaller, follow next in this chapter

# Leviticus 4:27-31

# 🐐 The Ordinary Israelite, Option One

---

## 🧑 Any One Of The Common People

This is the fourth and final tier - the ordinary Israelite, with no special office or leadership role. The scale in this chapter runs priest, then whole congregation, then ruler, and now the individual with no public position at all.

🧑 This is the fourth and last tier in the chapter's scale

📊 Priest, congregation, ruler, and now the ordinary person, each with a matching offering

🔁 The same "through ignorance" standard covers every single tier equally

---

## ♀️ A Kid Of The Goats, A Female Without Blemish

One more step down from the ruler's offering: not just a smaller animal category, but now a female instead of a male. The scale by now is unmistakable: bullock, then male goat, then female goat, shrinking with every tier, while "without blemish" never once relaxes.

♀️ A female goat, one tier below the ruler's required male goat

📉 The pattern across this chapter: the animal shrinks as public responsibility shrinks

✅ The flawless standard stays exactly the same at every single tier

---

## ✋🔪 Lay His Hand Upon The Head Of The Sin Offering, And Slay It

The same identifying gesture and the same killing location used by every tier above - an ordinary person follows the identical process as a ruler, a priest, or the whole nation, just with a smaller animal.

✋ Same hand-on-the-head gesture already used by every tier in this chapter

📍 Same killing location - "the place of the burnt offering" - as every tier above

🔁 The process never changes; only the animal's size and cost does

---

## 🩸 The Priest Shall Take Of The Blood Thereof With His Finger, And Put It Upon The Horns Of The Altar Of Burnt Offering

Same outer-altar-only blood application already used for the ruler - this offering, like the ruler's, never reaches inside the veil. An ordinary person's honest mistake is real and needs dealing with, but it doesn't require the deepest level of ritual reserved for the priest's or the whole nation's guilt.

🩸 Blood stays on the outer altar, same as the ruler's offering

🚫 This offering, like the ruler's, never goes inside the veil

⚖️ Depth of ritual still matches scope of the sin's reach, even at this lowest tier

---

## 🌬️ Burn It Upon The Altar For A Sweet Savour Unto The LORD

"Sweet savour" already appeared throughout chapters 1-3 for the burnt, grain, and peace offerings, but this is its first appearance in a sin offering. Even an offering dealing with real guilt is called pleasing and accepted by God when brought His prescribed way.

🌬️ "Sweet savour" already described the offerings in chapters 1-3

🆕 This is the phrase's first appearance tied to a sin offering

🤍 Even guilt, brought rightly, results in something God calls pleasing

---

## ✝️ Make An Atonement For Him, And It Shall Be Forgiven Him

The identical promise already given to the priest, the congregation, and the ruler now belongs to the ordinary Israelite too. No matter how small a person's role in Israel, forgiveness through this offering was never out of reach.

✝️ The same atonement-and-forgiveness promise repeats for the fourth time in this chapter

🙌 An ordinary person's access to forgiveness matched everyone else's

🔁 Only the animal's size ever changed - never the outcome

---

## 🙋 Whoever Recognized Their Own Guilt Could Come

Verse 28 says "or if his sin...come to his knowledge" - the same trigger already used for the ruler in verse 23. Nobody was required to wait for someone else to point out their mistake; recognizing it themselves was enough to require, and enable, bringing this offering.

🙋 Self-recognition of guilt was enough to trigger this requirement

🔁 The same wording already applied to the ruler's offering in verse 23

🚪 Nobody needed someone else to first accuse them before they could seek forgiveness

# Leviticus 4:32-35

# 🐑 The Ordinary Israelite, Option Two

---

## 🐑 If He Bring A Lamb For A Sin Offering

Here's a real flexibility this chapter hasn't offered anyone else: the ordinary Israelite gets to choose between a female goat, just described, or a female lamb, here. The priest, the congregation, and the ruler each had exactly one required animal - only the common person gets an option.

Leviticus 5:7-13 goes even further for this same tier, allowing two birds, or even a bit of flour, for someone too poor to afford a goat or lamb at all - showing this system never let cost become a wall between a sinner and forgiveness.

🐑 A lamb is offered as an alternative to the female goat just described

🆕 This is the first real choice given to any tier in this chapter

📖 Leviticus 5:7-13 later allows birds or flour for those who couldn't afford even this

---

## ✋🔪🩸🔥 The Same Process, Now With A Lamb

Every step repeats exactly as just described for the goat: the identifying hand, the killing at the burnt offering's spot, blood on the outer altar's horns, and the fat burned on the altar. Leviticus doesn't bother re-explaining any of it - by now the pattern is fully established.

🔁 Every ritual step repeats exactly as described for the female goat

✂️ Leviticus shortens the instructions once a pattern's been fully explained

🎯 Only the animal itself changes; every action around it stays identical

---

## 🔥 According To The Offerings Made By Fire Unto The LORD

This closing phrase ties the sin offering back into the same family as the burnt, grain, and peace offerings from chapters 1-3, all of them "made by fire," meaning burned as a gift given up to God, even though each type served a completely different purpose.

🔥 "Made by fire" links this offering back to the burnt, grain, and peace offerings

🎁 All are gifts given up and consumed, no matter their different purposes

🔗 This phrase closes the chapter by tying all four offering types together

---

## 🤫 The One Detail Left Unsaid For The Priest

Look back across this whole chapter: the congregation, the ruler, and both versions of the common person's offering each close with the plain words "it shall be forgiven him" or "forgiven them." The priest's own section back in verses 3-12 never actually says this.

That's likely because the priest's sin offering opens the whole chapter and sets the pattern every other tier then follows - the forgiveness promise is stated once the pattern is clear, not because the High Priest is somehow excluded from it.

🤫 Verses 3-12, the priest's own offering, never explicitly state "forgiven"

✅ Every tier after that - congregation, ruler, and both common-person options - does

📖 The pattern, not an exclusion, likely explains why it's stated later, not first

---

## 🎯 Four Tiers, One Path Back To God

By the end of this chapter, the pattern is unmistakable: priest, congregation, ruler, and ordinary person all sinned unintentionally, all brought an offering scaled to their role, and all received the exact same outcome - atonement and forgiveness. No one in Israel, from the High Priest down to the poorest farmer, was ever left without a way back.

🎯 Every tier in this chapter ends in the same outcome: forgiveness

📏 Only the required animal changed - the path back to God never did

🙌 No one in Israel, regardless of role or income, was left without access to it`;

export const LEVITICUS_FOUR_PERSONAL_SECTIONS = parseLeviticusFourRawNotes(LEVITICUS_FOUR_RAW_NOTES);
