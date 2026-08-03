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

# 🐂 A New Kind Of Offering

---

## 📜 The LORD Spake Unto Moses, Saying

This exact sentence opens dozens of sections all through Leviticus.

It marks a direct command from God, not a custom Israel invented.

Moses received it, then relayed it to the people.

Chapter four introduces a brand new kind of offering, the sin offering.

The burnt, grain, and peace offerings were already covered in chapters one through three.

📜 This formula marks a direct command

🆕 Chapter four introduces the sin offering

🔢 Three offerings already appeared before this

📖 Every ritual ahead traces to God's word

---

## 😶 A Soul Shall Sin Through Ignorance

"Soul" is just an old way of saying "a person."

It does not point to a separate spiritual part of someone.

"Through ignorance" means the person truly did not know it was wrong.

This whole chapter only deals with mistakes like that.

Numbers fifteen, verse thirty, draws a sharp line around deliberate sin.

Someone who sins knowingly, on purpose, is not covered by this offering.

😶 Soul just means a person

🤷 Through ignorance means an honest mistake

🚫 Deliberate sin is not covered here

📖 Numbers fifteen marks that dividing line

---

## ⛔ Concerning Things Which Ought Not To Be Done

This chapter covers breaking a rule, not failing to act.

It deals with a "thou shalt not," a command about what not to do.

Leviticus five later covers different failures, like refusing to speak up as a witness.

Chapter four stays focused on something a person actively did, even without meaning to.

⛔ This chapter covers broken rules, not neglect

📋 A broken command sits behind this

🔀 Leviticus five covers failing to act instead

➡️ The kind of sin decides the offering

---

## 👑 The Priest That Is Anointed

This phrase means the High Priest, Aaron and later whoever held that office.

He was anointed with the special oil described back in Exodus thirty.

"According to the sin of the people" is the striking part of this verse.

His sin is treated as seriously as if the whole nation had sinned.

He represented all of Israel before God every single day.

If the one man closest to God sinned, everyone's standing was put at risk.

👑 Anointed priest means the High Priest

🕯️ He was set apart with special oil

⚖️ His sin counts as heavy as the nation's

📖 One man's sin put everyone's standing at risk

---

## 🐂 A Young Bullock Without Blemish

This chapter grades the offering by how much responsibility the sinner carried.

The priest sits at the very top of that scale.

A bullock, a young bull, was the largest and costliest animal used in Leviticus.

"Without blemish" means physically flawless, with no injury, disease, or defect.

That standard never changes across any tier in this chapter.

🐂 A bullock was the costliest animal offered

📉 Later tiers require smaller, cheaper animals

✅ Without blemish always means physically flawless

📖 The offering always matches the offender's role

---

## ✋ Lay His Hand Upon The Bullock's Head

This gesture already appeared with every offering type back in chapters one through three.

A hand pressed on the animal's head linked the offerer to the animal about to die.

Normally the priest performs this ritual on behalf of someone else.

This time the priest confesses his own guilt and stands in the offerer's place himself.

The one who usually leads the ritual now needs it done for him.

✋ This gesture already appeared in earlier chapters

🔗 A hand linked the man to the animal

🪞 Here the priest offers for his own sin

📖 Even the priest needed forgiveness like anyone else

# Leviticus 4:5-12

# 🩸 Blood Reaches Behind The Veil

---

## 🏛️ Bring It To The Tabernacle Of The Congregation

In chapters one through three, blood only ever touched the altar out in the courtyard.

Here, for the first time, the priest carries blood inside the tent itself.

That marks a much deeper, more serious ritual than before.

A sin this significant reaches further into the sanctuary than an ordinary offering.

🏛️ This is blood's first trip inside the tent

📈 A sin's seriousness decides how deep it goes

🔁 Earlier offerings kept blood at the outer altar

📖 Deeper guilt calls for a deeper ritual

---

## 7️⃣ Sprinkle Of The Blood Seven Times Before The LORD

Seven often stands for completeness throughout the Bible.

Seven days of creation and seven day feasts both carry that same idea.

Here it means seven careful sprinklings, not one quick flick of the finger.

Repeating the act that many times made it deliberate and thorough.

🔢 Seven often means completeness in scripture

🔁 Repeating it made the act deliberate

🩸 One drop was never treated as enough

📖 A serious sin called for a thorough ritual

---

## 🧵 Before The Vail Of The Sanctuary

The veil was the heavy curtain separating two rooms inside the tabernacle.

One side was the Holy Place, where priests served every day.

The other was the Most Holy Place, where the ark of the covenant sat.

Only the High Priest could pass beyond that curtain, and only once a year.

Sprinkling blood toward the veil brought this sin as close to God's throne as almost anyone was ever allowed.

🧵 The veil separated two rooms inside the tent

🕍 One room held the ark of the covenant

🚫 Only the High Priest passed that curtain

📖 This ritual reached near God's own throne

---

## 🌬️ Upon The Horns Of The Altar Of Sweet Incense

This was a second altar, smaller and made of gold, standing just outside the veil.

It was used only for burning incense, described back in Exodus thirty.

"Horns" means the pointed corner projections built onto the top of the altar.

Touching blood to these horns marked a deeper application than any offering before it.

🌬️ A separate gold altar sat outside the veil

📐 Horns means the altar's pointed corners

🔥 This altar only ever burned incense

📖 Blood here marked an unusually deep ritual

---

## ⬇️ Pour All The Blood At The Bottom Of The Altar

Whatever blood was left over after the deeper rituals still had to go somewhere.

It was poured out at the base of the main altar in the courtyard.

None of it was ever reused or treated as ordinary liquid.

Even disposal followed one fixed, required location.

⬇️ Leftover blood went to the altar's base

🚫 Blood was never treated as ordinary waste

📍 Even disposal had one fixed spot

📖 Nothing about handling blood was left casual

---

## 🥩 The Fat That Covereth The Inwards

"Inwards" means the internal organs inside the animal's body.

The "caul" is a fatty membrane that covers part of the liver.

This exact list of fat portions already appeared for the peace offering back in chapter three.

That fat belonged to God alone and was never eaten by anyone.

🥩 Inwards simply means the internal organs

🫓 The caul covers part of the liver

🔁 The same fat list appeared in chapter three

📖 This fat was never food for anyone

---

## 🚫 The Skin, The Flesh, The Head, With His Legs

This list covers nearly the whole animal, everything except the fat already removed.

The peace offering in chapter three let the worshipper eat part of the meat.

The grain offering let the priests eat the leftovers.

None of this bullock was eaten by anyone at all.

🚫 This is nearly the whole animal

🍽️ Other offerings let someone eat the meat

🙅 Nobody ate any part of this bullock

📖 A sin offering gave nothing back to eat

---

## 🏕️ Carry Forth Without The Camp Unto A Clean Place

"Without the camp" means fully outside the borders of Israel's tent city.

A "clean place" was a specific spot kept free of anything ritually impure.

The remains could not simply be dumped wherever was convenient.

Hebrews thirteen connects this exact pattern to Jesus, who suffered outside Jerusalem's walls.

That ancient rule points all the way forward to the cross.

🏕️ Without the camp means fully outside Israel's borders

🧹 A clean place was a fixed, required spot

✝️ Hebrews thirteen ties this to the cross

📖 An ancient rule points forward to Jesus

# Leviticus 4:13-21

# 👥 When The Whole Nation Sins Together

---

## 👥 If The Whole Congregation Of Israel Sin Through Ignorance

This covers a shared mistake the entire community made together.

Maybe a bad ruling came from Israel's leaders, and everyone followed it in good faith.

The required offering matches the priest's own, a bullock, the costliest animal.

National guilt was treated with the same seriousness as the High Priest's own sin.

👥 This covers a mistake the whole community made

🐂 The offering matches the priest's own tier

⚖️ National guilt is treated just as seriously

📖 A shared mistake still needed a full answer

---

## 🙈 The Thing Be Hid From The Eyes Of The Assembly

"Hid from the eyes" means nobody recognized the sin while it was happening.

It was not obvious, and nobody knowingly disobeyed on purpose.

That matches "through ignorance," the same standard used all through this chapter.

The mistake only became clear sometime after the fact.

🙈 Hid from the eyes means unnoticed

🔎 Nobody knowingly disobeyed on purpose

🔁 This matches ignorance, the standard for this chapter

📖 Clarity came later, not in the moment

---

## 🗣️ The Assembly

"Assembly" translates a Hebrew word, qahal, meaning Israel gathered as one body.

The same word describes Israel gathered for worship, for war, or for a shared mistake.

It pictures the nation acting as a single unit before God.

Israel is never just a crowd of scattered individuals in this picture.

🗣️ Assembly, qahal, means Israel gathered as one

🤝 The same word covers worship, war, and guilt

🌍 Israel acts here as a single unit

📖 God deals with the nation as one body

---

## 👴 The Elders Of The Congregation Shall Lay Their Hands

The priest laid his own hand on the animal earlier for his own sin.

A whole nation obviously cannot all physically touch one bullock at once.

The elders, Israel's recognized leaders, do it on everyone's behalf instead.

One gesture, done by representatives, stood in for the whole nation.

👴 Elders were Israel's recognized leaders

✋ They acted on behalf of the whole nation

🔁 The same identifying gesture, adapted for a group

📖 Representatives could act for everyone at once

---

## 🩸 Sprinkle It Seven Times, Even Before The Vail

Every detail from the priest's own offering repeats here exactly.

Blood is carried inside, sprinkled seven times, and applied before the veil.

It also touches the horns of the incense altar, just as before.

The nation's guilt receives the same depth of ritual as the High Priest's own.

🔁 Every blood detail repeats from the priest's ritual

🩸 Seven sprinklings happen before the veil again

🌬️ Blood also reaches the incense altar's horns

📖 The whole nation is treated just as seriously

---

## ✝️ The Priest Shall Make An Atonement For Them, And It Shall Be Forgiven Them

"Atonement" translates a Hebrew word, kaphar, meaning to cover over or wipe away.

It restores a broken relationship rather than just erasing a record.

This is the chapter's first time the actual outcome gets stated so plainly.

The ritual leads to real forgiveness, not just outward ritual cleanliness.

✝️ Atonement means covering over sin completely

🎁 Forgiveness comes as a gift, not something earned

📢 This is the chapter's first plain promise

📖 The whole point was always real forgiveness

---

## 🔥 Carry Forth The Bullock, And Burn Him As He Burned The First Bullock

"The first bullock" points back to the priest's own animal from earlier in the chapter.

Same disposal, same location outside the camp, same method used again here.

Corporate guilt and the High Priest's own guilt get an identical process.

The size of the crowd never changed how thoroughly the ritual was carried out.

🔁 The first bullock means the priest's own animal

🏕️ The same outside camp disposal happens again

🎯 Corporate and priestly guilt match step for step

📖 A whole nation received no shortcuts here

# Leviticus 4:22-26

# 🐐 When A Leader Sins

---

## 👑 When A Ruler Hath Sinned

"Ruler" translates a Hebrew word, nasi, meaning a tribal chief or leader.

This is not the nation's highest authority.

That role belonged to the priest, and later the king.

This is the third tier in the chapter's descending scale.

The same "through ignorance" standard still applies at this level too.

👑 Ruler, nasi, means a tribal chief

📊 This is the third of four tiers here

🔁 The same ignorance standard still applies

📖 Every level of leadership answers to this rule

---

## 🐐 A Kid Of The Goats, A Male Without Blemish

Notice the offering shrinks here, from a bullock down to a goat.

A goat cost far less than the bullock required of the priest or the nation.

The animal's size tracks the offender's scope of responsibility, not how bad the sin felt.

A ruler affects fewer people than the priest or the whole nation does.

"Without blemish" still never changes, no matter how small the animal gets.

🐐 A goat is smaller than the bullock above

📉 Size tracks responsibility, not how the sin felt

👥 A ruler affects fewer people than a nation

📖 Without blemish never changes at any tier

---

## 🔪 Kill It In The Place Where They Kill The Burnt Offering

Leviticus one already fixed this exact spot, north of the altar.

Every animal in Leviticus so far has died in that same location.

Nothing about the killing itself changes based on who is offering it.

Only what happens to the blood afterward ever changes between tiers.

🔪 Leviticus one already fixed this exact spot

📍 Every offering type uses this same location

🔁 The killing itself never changes tier to tier

📖 Only the blood ritual afterward changes

---

## 🩸 Put It Upon The Horns Of The Altar Of Burnt Offering

This is the key difference from the priest's and the nation's offering earlier.

Their blood went inside the tent, in front of the veil.

A ruler's blood never goes past the outer courtyard at all.

It stays on the main altar, out where everyone could see it.

The depth of a ritual matches how far a sin's damage actually reaches.

🩸 A ruler's blood stays on the outer altar

🏛️ The priest's blood went inside the tent instead

📏 Ritual depth matches how far the damage reaches

📖 A leader's sin does not reach the sanctuary

---

## 🔥 Burn All His Fat Upon The Altar, As The Fat Of The Sacrifice Of Peace Offerings

Starting here, only the fat goes on the altar as a gift to God.

The rest of the meat is not burned outside the camp like the bullocks were.

Leviticus six later explains what happens instead, that meat becomes the priest's food.

The same atonement and forgiveness promise given above now belongs to this ruler too.

🔥 Only the fat is burned here

🍽️ The leftover meat becomes food for the priest

✝️ Atonement and forgiveness still follow this offering

📖 Every tier ends with the same promise

# Leviticus 4:27-31

# 🐐 An Ordinary Person's Guilt

---

## 🧑 Any One Of The Common People

This is the fourth and final tier in this chapter's scale.

The priest, the congregation, and the ruler already came before this one.

Now comes the individual with no special office or public role at all.

The same "through ignorance" standard covers this ordinary person just as much as anyone above.

🧑 This is the fourth and final tier

📊 Priest, nation, ruler, and now this person

🔁 The same ignorance standard covers everyone equally

📖 No role was ever too small to matter

---

## ♀️ A Kid Of The Goats, A Female Without Blemish

One more step down from the ruler's offering appears here.

This is not just a smaller category.

It is a female goat instead of a male one.

The pattern is now clear, bullock, then male goat, then female goat.

"Without blemish" still holds at the same standard every time.

♀️ A female goat replaces the ruler's male goat

📉 The animal keeps shrinking tier by tier

🔁 Bullock, male goat, then female goat, in order

📖 The flawless standard never once relaxes

---

## ✋🔪 Slay The Sin Offering In The Place Of The Burnt Offering

The same identifying gesture used by every tier above happens here too.

The same killing location, fixed back in Leviticus one, applies again.

An ordinary person follows the identical process as a ruler or a priest.

Only the size and cost of the animal ever really changes.

✋ The same hand gesture repeats at every tier

📍 The same killing spot applies here too

🔁 The process never changes across any tier

📖 Only the animal's size and cost changes

---

## 🌬️ Burn It Upon The Altar For A Sweet Savour Unto The LORD

"Sweet savour" already described the offerings back in chapters one through three.

This is its very first appearance tied to a sin offering.

Even an offering dealing with real guilt is called pleasing to God.

That is true as long as it was brought the way God prescribed.

🌬️ Sweet savour already described earlier offerings

🆕 This is its first use here

🤍 Guilt, brought rightly, can still please God

📖 God calls a rightly brought offering pleasing

---

## ✝️ Make An Atonement For Him, And It Shall Be Forgiven Him

The identical promise given to the priest and the ruler above now belongs here too.

No matter how small a person's role in Israel was, forgiveness stayed within reach.

Verse twenty eight adds one more detail, the sin coming "to his knowledge."

The same trigger already used for the ruler applies again for this tier.

Nobody needed someone else to accuse them first before seeking forgiveness.

✝️ The same promise now covers this tier too

🙌 Forgiveness stayed within everyone's reach

🙋 Recognizing the guilt yourself was already enough

📖 Nobody needed to be accused to seek forgiveness

# Leviticus 4:32-35

# 🐑 A Second Option For The Ordinary Person

---

## 🐑 If He Bring A Lamb For A Sin Offering

Here is a real flexibility this chapter has not offered anyone else yet.

The ordinary Israelite could choose between a female goat or a female lamb.

The priest, the nation, and the ruler each had only one required animal.

Only the common person in this chapter actually gets an option to choose.

🐑 A lamb becomes an alternative to the goat

🆕 This is the chapter's first real choice

👥 Only the ordinary person gets this option

📖 Even here, God made room for a choice

---

## 🩸 He Shall Bring It A Female Without Blemish

The lamb follows the exact same requirement already set for the goat.

It must be female, and it must be physically flawless.

Every step around it, the hand, the killing, the blood, stays identical too.

Only the animal chosen at the start ever really changes.

🩸 Female and flawless, just like the goat

🔁 Every ritual step stays exactly the same

✂️ Only the animal itself changes here

📖 The pattern holds steady no matter the choice

---

## 🔥 According To The Offerings Made By Fire Unto The LORD

This closing phrase ties the sin offering back to the other offering types.

The burnt, grain, and peace offerings were all "made by fire" too.

That phrase already appeared back in chapters one through three.

"Made by fire" means burned up completely as a gift to God.

Each offering served a different purpose, yet all were given the same way.

🔥 Made by fire links this to earlier offerings

🎁 It means burned up as a gift

🔗 The same phrase already appeared in earlier chapters

📖 Every offering type still points back to God

---

## 🎯 For His Sin That He Hath Committed, And It Shall Be Forgiven Him

By the end of this chapter, one pattern is impossible to miss.

Priest, nation, ruler, and ordinary person all sinned without meaning to.

Each one brought an offering scaled to their own role.

Every single one received the exact same outcome, atonement and forgiveness.

No one in Israel was ever left without a way back to God.

Not the High Priest, and not the poorest farmer either.

🎯 Every tier in this chapter ends in forgiveness

📏 Only the required animal ever changed

🙌 Rich or poor, everyone had the same path

📖 No one was left without a way back`.trim();

export const LEVITICUS_FOUR_PERSONAL_SECTIONS = parseLeviticusFourRawNotes(LEVITICUS_FOUR_RAW_NOTES);
