export type NumbersNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersNineteenRawNotes(rawText: string): NumbersNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 19:${startVerse}` : `Numbers 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Numbers 19 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_NINETEEN_RAW_NOTES = `# Numbers 19:1-6
# 🐄 The Ordinance Of The Red Heifer
---
## 🗣️ Spake Unto Moses And Unto Aaron
This command comes to both Moses and Aaron together, not funneled through Moses alone. Since the ritual instructions are specifically for Eleazar, a priest, God addresses the current high priest directly alongside Moses, matching the pattern priestly matters usually follow in Numbers.
🗣️ Addressed to both leaders together, not Moses only
👳 Fits the pattern of priestly instructions naming Aaron directly
🔑 Signals this law belongs specifically to priestly responsibility
---
## 📜 The Ordinance Of The Law
"Ordinance" means a fixed, required rule, not a suggestion. Calling it "the law" flags a permanent, binding command, not a one-time instruction for this specific moment in Israel's wilderness journey.
📜 "Ordinance" means a fixed, required rule
🔒 Flagged as permanent law, not a one-time instruction
🔑 Sets the tone before a single ritual detail is even given
---
## 🐄 A Red Heifer Without Spot, Wherein Is No Blemish
A heifer is a young cow that has never had a calf. Solid red cattle were genuinely rare in the ancient world - most cattle were black, brown, or spotted - which made this animal costly and hard to find on purpose.
"Without spot" and "no blemish" mean completely free of any flaw, injury, or discoloration. Like every animal offered to God in this system, only the best, most perfect specimen would do.
🐄 A heifer is a young cow that has never calved
🔴 Solid red cattle were naturally rare and hard to find
🔑 Rarity plus perfection made this animal deliberately costly to obtain
---
## 🐂 Upon Which Never Came Yoke
A yoke is the wooden frame strapped across an animal's neck to make it pull a plow or cart. An animal that never wore one had never done ordinary work - it was set apart for this one sacred purpose from the start, not a retired work animal.
🐂 A yoke is the harness used to make an animal work
🆕 This heifer had never done ordinary labor
🔑 Wholly devoted from birth, not repurposed later
---
## 👳 Ye Shall Give Her Unto Eleazar The Priest
Eleazar is Aaron's son, next in line to become high priest. Handing this ritual to Eleazar instead of Aaron is a small but real signal - Aaron is nearing the end of his life, he dies later in Numbers 20, and Eleazar is already stepping into priestly duties tied to death and impurity that the reigning high priest would normally avoid.
👳 Eleazar is Aaron's son and the next high priest
➡️ A quiet signal that Aaron's role is passing to the next generation
🔑 Ties this ritual to a leadership transition already underway in Numbers
---
## 🚪 Bring Her Forth Without The Camp
Unlike ordinary sacrifices offered at the altar inside the tabernacle courtyard, this whole ritual happens outside the camp. Death is the ultimate source of ceremonial uncleanness in Israel's law, so the ritual dealing with death has to stay physically separate from the holy space at the camp's center.
🚪 Performed entirely outside the camp, not at the altar
☠️ Because this ritual exists specifically to deal with death
🔑 Distance from the sanctuary matches the seriousness of what's handled
---
## 🔪 One Shall Slay Her Before His Face
Eleazar watches the slaughter but doesn't perform it himself - someone else does the actual killing while Eleazar oversees and then handles the blood. Even this unusual ceremony keeps a careful division of labor.
🔪 Eleazar oversees; someone else does the killing
👀 "Before his face" means done in his presence, under his authority
🔑 Even this unusual ritual keeps a careful division of roles
---
## 🩸 Sprinkle Of Her Blood Directly Before The Tabernacle...Seven Times
Eleazar takes the blood and flicks it toward the tabernacle from outside the camp, seven times. Seven is the Bible's number of completeness - a seven-fold sprinkling makes the blood application fully thorough, even done at a distance rather than on the altar itself.
🩸 Blood is sprinkled toward the tabernacle, not carried inside
7️⃣ Seven repetitions signal thoroughness and completeness
🔑 The ritual stays connected to the tabernacle without ever entering it
---
## 🔥 The Priest Shall Burn The Heifer In His Sight
The entire animal is burned - skin, flesh, blood, even dung - everything, not just the fat and choice pieces the way most burnt offerings worked. Nothing is eaten or set aside as food; this is a total destruction of the whole animal.
🔥 Every part is burned, including skin and dung
🚫 Unlike most sacrifices, none of this animal is eaten
🔑 A total burning matches the totality of what's being cleansed
---
## 🌲 Cedar Wood, And Hyssop, And Scarlet
Cedar wood, hyssop (a small bushy herb), and scarlet-dyed wool appear together in exactly one other ritual in the Law: cleansing a healed leper in Leviticus 14. Both rituals deal with moving something from "unclean" back to "clean," and both use this identical trio of materials.
🌲 Cedar, hyssop, and scarlet wool - all cast into the fire
📖 The exact same trio used to cleanse a healed leper in Leviticus 14
🔑 A deliberate echo linking two different "clean again" rituals

# Numbers 19:7-10
# 🧼 Clean Enough To Make Others Clean
---
## 👔 The Priest Shall Wash His Clothes, And He Shall Bathe His Flesh
Before Eleazar can even walk back into the camp, he has to wash his clothes and bathe his whole body. This isn't optional hygiene - it's the required first step before an unclean person can safely be around others again.
👔 A required full wash, not just a suggestion
🚿 The mandatory first step back toward the camp
🔑 Even the officiating priest doesn't get an exception
---
## ⏳ The Priest Shall Be Unclean Until The Even
Here's the strange part of this whole ritual: performing it to make others clean makes Eleazar himself unclean until evening. The ashes this ritual produces will purify people from death's defilement, yet producing them defiles the priest who makes them.
⏳ "Even" means evening - uncleanness lasts until sundown
🔄 The purifier becomes impure while purifying
🔑 A paradox repeated three times in this passage for three different people
---
## 🔥 He That Burneth Her Shall Wash His Clothes...And Shall Be Unclean Until The Even
The person who actually burns the heifer - likely someone other than Eleazar, who only sprinkled the blood - faces the identical requirement: wash, bathe, and stay unclean until evening. Everyone who touches this process at any stage picks up the same temporary impurity.
🔥 A second, separate person handles the actual burning
🔁 Faces the exact same wash-and-wait requirement as the priest
🔑 Uncleanness spreads to everyone involved, not just one person
---
## 🧑‍🌾 A Man That Is Clean Shall Gather Up The Ashes
The ashes themselves must be collected by someone who starts out ceremonially clean, even though gathering them will make that same person unclean afterward. The ashes need careful, respectful handling from the very first person to touch them.
🧑‍🌾 Must start clean, even though the task itself defiles
📦 Ashes require careful handling from the very first touch
🔑 Respect for the ashes' purpose outweighs the inconvenience of the rule
---
## 💧 A Water Of Separation: It Is A Purification For Sin
"Water of separation" means water mixed with these ashes, used later to cleanse anyone defiled by contact with death. "Purification for sin" ties this ritual to the same category as Israel's regular sin offerings, even though no specific individual sin caused the death - contact with death itself counted as a kind of defilement needing atonement.
💧 The ashes get mixed into water used for later cleansing
⚖️ Classified as a "sin offering," even with no specific sin committed
🔑 Death itself, not just wrongdoing, required atonement in this system
---
## 🌍 Unto The Stranger That Sojourneth Among Them
"Stranger" here means a non-Israelite living among God's people, and "sojourn" means to live somewhere temporarily as a resident rather than a citizen. This law is explicitly extended to include them too - foreigners living in Israel weren't exempt from needing this same purification.
🌍 "Stranger" means a foreigner living among Israel
🏕️ "Sojourn" means living there temporarily, not as a full citizen
🔑 Foreigners were bound by the same purity requirements as Israelites
---
## ♾️ A Statute For Ever
This whole heifer ritual and its ashes-based cleansing system is declared permanent, not a temporary wilderness arrangement. It's meant to remain in effect for every future generation, not just this one moment in Israel's journey.
♾️ Declared permanent, not temporary
📅 Meant to apply to every future generation
🔑 One of many "for ever" statutes stacking up throughout Numbers

# Numbers 19:11-13
# ☠️ Touching Death, Seven Days Unclean
---
## 👤 He That Toucheth The Dead Body Of Any Man Shall Be Unclean Seven Days
Any contact with a human corpse - not just handling it directly, but even simple touch - triggers a full week of ceremonial uncleanness. That's far longer than the "until evening" uncleanness from handling the heifer ritual itself, showing that direct contact with death outweighs contact with the cleansing process built to answer it.
👤 Touching a dead body causes seven days of uncleanness
📈 Much longer than the "until evening" rule from earlier in the chapter
🔑 Direct contact with death outweighs contact with the cleansing process
---
## 3️⃣7️⃣ Purify Himself...Third Day...Seventh Day
The purification ritual using the ashes-water mixture had to happen on two specific days: the third day and the seventh day after contact with death. Skipping the third-day application meant the seventh-day cleansing wouldn't count either - the timing itself was part of what made the ritual work.
3️⃣ Sprinkling required on day three after contact with death
7️⃣ A second sprinkling required on day seven
🔑 Skipping the third day made the whole process invalid, not just late
---
## 🕵️ He That Toucheth The Dead Body Of Any Man That Is Dead
The verse repeats "dead body of any man that is dead" almost redundantly. Ancient legal language often restates plainly like this on purpose, closing off any reading of the law that might apply to some deaths but not others.
🕵️ Repeats "dead" almost redundantly on purpose
📜 A common feature of ancient legal language, closing loopholes
🔑 No exceptions for how or why someone died
---
## 🚫 Purifieth Not Himself...Cut Off From Israel...Defileth The Tabernacle
Refusing or neglecting this purification carried Israel's most severe covenant penalty: being "cut off," permanently removed from the covenant community, whether through death, exile, or God's own judgment. The text explains why - this person "defileth the tabernacle of the LORD," an accusation of directly contaminating God's dwelling place, not just personal carelessness.
🚫 "Cut off" means permanent removal from the covenant community
🏕️ The accusation isn't just personal neglect - it's defiling the tabernacle itself
🔑 Israel's holiness as a nation depended on individuals following through

# Numbers 19:14-16
# ⛺ The Law Of The Tent
---
## ⛺ This Is The Law, When A Man Dieth In A Tent
Israelites lived in tents, especially during the wilderness years, so this law addresses the most common real-life scenario death would happen in. Rather than leaving people to guess how far uncleanness spreads through a shared living space, the text spells it out precisely.
⛺ Addresses the most common setting death would actually occur in
📋 Removes guesswork about how far uncleanness spreads
🔑 Practical law for the actual living conditions of the wilderness camp
---
## 🚶 All That Come Into The Tent...Shall Be Unclean Seven Days
Uncleanness from a death inside a tent doesn't just affect the person who died or touched the body - it spreads to anyone who enters that tent at all, and to everything already inside it, for a full week. Death's defilement fills the whole space, not just the body itself.
🚶 Anyone entering the tent becomes unclean, not just those touching the body
📦 Everything already inside the tent is affected too
🔑 Death's impurity fills an entire space, not a single point
---
## 🍶 Every Open Vessel...Is Unclean
An open container - one without a tightly fitted lid or covering - left in a tent where someone died becomes unclean, while a sealed container stays clean. Whatever is exposed to the space picks up the defilement; whatever is sealed off doesn't.
🍶 Uncovered containers become unclean; sealed ones don't
🌬️ Follows the same logic as anything exposed to a contaminated space
🔑 A surprisingly specific, practical detail inside a spiritual law
---
## ⚔️ Whosoever Toucheth One That Is Slain With A Sword...Or A Grave
The law extends beyond someone dying naturally in a tent to violent death out in the open, scattered human bones, or even just touching a grave. Any contact with death in any form, anywhere, triggers the same seven-day uncleanness - the rule isn't narrowly limited to one specific scenario.
⚔️ Covers violent death in open fields, not just a tent
🦴 Also covers old bones and even touching a grave
🔑 One broad rule, not a narrow list of exceptions

# Numbers 19:17-19
# 🌿 Sprinkled Clean With Hyssop
---
## 🔥 They Shall Take Of The Ashes Of The Burnt Heifer...And Running Water
The actual cleansing procedure finally arrives: ashes from the red heifer, saved back in verse 9, get mixed with "running water" - water actively flowing from a spring or stream, considered more ritually pure than still, standing water.
🔥 The saved ashes from earlier in the chapter are put to use here
💧 "Running water" meant flowing water, seen as purer than standing water
🔑 The whole ritual from verses 1-10 finally pays off in this moment
---
## 🌿 A Clean Person Shall Take Hyssop, And Dip It In The Water
Hyssop is a small, bushy herb with clusters of tiny leaves, ideal for holding and flicking liquid - the same plant used at the very first Passover to paint lamb's blood on Israelite doorposts in Egypt (Exodus 12:22). Its practical shape made it a natural, repeated tool for sprinkling rituals throughout the Law.
🌿 Hyssop's bushy shape made it ideal for flicking liquid
🚪 The same plant used to apply blood at the first Passover
🔑 A humble household herb reused across multiple major rituals
---
## 🧑‍🤝‍🧑 Sprinkle It Upon The Tent, And Upon All The Vessels, And Upon The Persons
The sprinkling covers everything the earlier verses named as affected: the tent itself, every vessel inside it, and every person who was present. The cleansing ritual matches the exact scope of what became defiled - nothing contaminated gets skipped.
🧑‍🤝‍🧑 Covers the tent, its contents, and every person present
🎯 Matches exactly what verses 14-16 described as defiled
🔑 The cure is scoped to match the full extent of the problem
---
## 📅 Sprinkle Upon The Unclean On The Third Day, And On The Seventh Day
The same third-day-then-seventh-day timing from verse 12 shows up again here as the actual mechanics of the ritual - two separate sprinklings, not one. After the second sprinkling on day seven, the person washes their clothes, bathes, and becomes clean that same evening.
📅 Two required sprinklings: day three, then day seven
🛁 Followed by washing, bathing, and becoming clean that evening
🔑 The timeline announced back in verse 12 is finally carried out here

# Numbers 19:20-22
# ⚠️ Cut Off, Or Made Clean
---
## 🚫 The Man That Shall Be Unclean...Shall Not Purify Himself...Cut Off
The chapter repeats its harshest penalty one final time, almost word for word from verse 13: refusing this purification means being cut off from the whole congregation. Repeating the warning at the very end of the chapter reinforces how seriously God takes this particular law.
🚫 Nearly repeats verse 13's warning word for word
🔁 Placed again at the chapter's close for emphasis
🔑 A law repeated this often is a law meant to be taken seriously
---
## 🔄 A Perpetual Statute...He That Sprinkleth The Water Of Separation Shall Wash His Clothes
Even the person performing the final cleansing sprinkle still has to wash their own clothes afterward - the paradox from earlier in the chapter, where the purifier temporarily becomes impure, holds true all the way through to this very last step of the process.
🔄 Applies even to the person doing the final, curative sprinkling
🌀 The same purifier-becomes-impure paradox from earlier holds to the end
🔑 No one handling this ritual, at any stage, gets a clean exemption
---
## 👋 He That Toucheth The Water Of Separation Shall Be Unclean Until Even
Even simply touching the purifying water itself - not the ashes, not a corpse, just the mixed water used for cleansing - causes temporary uncleanness until evening. The ritual's own tools carry a measure of the same impurity they're designed to remove.
👋 Even touching the cleansing water itself causes uncleanness
🌀 The remedy carries a trace of the very problem it solves
🔑 A final example of how thoroughly this system polices contact with death
---
## 🔗 Whatsoever The Unclean Person Toucheth Shall Be Unclean
The chapter's very last line states the underlying principle behind everything just described: uncleanness spreads by contact, passing from a defiled person to whatever or whoever they touch next. This one sentence explains why the chapter needed so many specific rules for tents, vessels, graves, and bones - it's all working out the consequences of this single principle.
🔗 States the underlying rule behind the whole chapter: uncleanness spreads by touch
📖 Explains why so many specific scenarios needed their own rule
🔑 One simple principle producing an entire chapter of careful detail
`;

export const NUMBERS_NINETEEN_PERSONAL_SECTIONS = parseNumbersNineteenRawNotes(NUMBERS_NINETEEN_RAW_NOTES);
