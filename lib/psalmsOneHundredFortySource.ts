export type PsalmsOneHundredFortyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFortyRawNotes(rawText: string): PsalmsOneHundredFortyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFortyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+140:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 140 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+140:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+140:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 140 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 140,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 140:${startVerse}` : `Psalms 140:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 140 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FORTY_RAW_NOTES = `# Psalms 140:1-5
# 🪤 Snares, Serpents, And A Prayer For Rescue
---
## 🆘 Deliver Me O LORD From The Evil Man

"Deliver" means being pulled to safety out of danger already closing in.

"Preserve" means being kept safe from harm that has not yet struck.

David asks for both rescue and prevention in the same breath.

Hebrew poetry often repeats one idea in two different words for emphasis.

The evil man and the violent man are the same threat, named twice.

🆘 Deliver means rescue from present danger
🛡️ Preserve means being kept safe beforehand
🔁 Evil man and violent man are one enemy
📖 Hebrew poetry doubles an idea for emphasis

## 🧠 Which Imagine Mischiefs In Their Heart

"Imagine" here does not mean simply picturing something in the mind.

It means actively plotting and devising a plan of harm.

"Mischief" is not a mild word for playful trouble.

In the Bible it regularly names real, intended harm toward another person.

The plotting happens in the heart, the place Scripture treats as the seat of intention.

🧠 Imagine means actively plotting harm
⚠️ Mischief means real intended harm
❤️ Heart is the seat of intention
📖 These plots are deliberate, not impulsive

## ⚔️ Continually Are They Gathered Together For War

This does not describe an actual army preparing for battle.

"War" here pictures relentless, coordinated opposition against one person.

"Continually" means this hostility never lets up or takes a break.

David feels surrounded by an ongoing campaign, not a single attack.

⚔️ War here means coordinated opposition
🔁 Continually means the hostility never stops
🎯 The target is one person, David
📖 He feels under constant campaign, not one attack

## 🗡️ They Have Sharpened Their Tongues Like A Serpent

A sharpened tongue pictures words prepared and honed like a weapon.

"Like a serpent" compares their speech to a snake's silent, deadly strike.

Serpents in Scripture often carry the idea of deception, going back to Genesis.

These enemies plan their words as carefully as a soldier sharpens a blade.

🗡️ Sharpened tongue means words honed like a weapon
🐍 Serpent pictures a silent deadly strike
🎭 Serpents often carry the idea of deception
📖 Their words are planned, not careless

## 👄 Adders' Poison Is Under Their Lips

An "adder" is a venomous snake, related to the serpent image just used.

"Poison under their lips" pictures venom ready to strike the moment they speak.

The danger is not in their hands but in what comes out of their mouths.

Speech becomes the actual weapon these enemies use against David.

🐍 Adder means a venomous snake
👄 Poison under lips means dangerous speech
🚫 Their weapon is words, not hands
📖 Speech itself becomes the attack

## 🔁 Keep Me O LORD From The Hands Of The Wicked

David asks for rescue again, now three verses after his first plea.

Repeating "deliver," "preserve," and now "keep" is not empty repetition.

Hebrew poetry uses this stacking to show the weight of real danger.

The danger described in verses one through three has not faded from his mind.

🔁 David repeats his plea for rescue
📚 Repetition shows real weight, not filler
🖐️ Hands of the wicked means power to harm
📖 The danger from earlier verses still stands

## 🎯 Who Have Purposed To Overthrow My Goings

"Purposed" means they have made a deliberate decision, not a passing thought.

"Goings" means more than literal footsteps on a road.

It refers to David's whole course of life and daily direction.

These enemies are not trying to trip him once.

They are trying to derail the entire path he is walking.

🎯 Purposed means a deliberate decision
🚶 Goings means David's whole course of life
🚫 Not one trip, but total derailment
📖 The attack targets his whole path

## 🪤 The Proud Have Hid A Snare For Me And Cords

"The proud" names the enemies by their defining character trait.

Pride here is not simple confidence but arrogance that disregards God.

A "snare" is a hidden trap meant to catch prey without warning.

"Cords" describes rope used to bind whatever the snare catches.

The imagery shifts from weapons of speech to tools of a hunter.

😤 Proud means arrogant, not merely confident
🪤 Snare means a hidden trap
🪢 Cords describes rope for binding
📖 The image shifts from weapon to hunter

## 🛤️ They Have Spread A Net By The Wayside

A "wayside" is an ordinary path someone would walk every day.

The danger is not hidden in some exotic or unusual place.

It is hidden in the normal route David already travels.

Ordinary life itself has become the hunting ground for these enemies.

🛤️ Wayside means an ordinary daily path
🕸️ Net means a hidden trap for prey
🏠 The danger hides in normal life
📖 Even the familiar path is not safe

## ⚙️ They Have Set Gins For Me

"Gins" is an old English word for traps or snares.

It shares a root with the word "engine," something engineered to catch.

By this point in the psalm, David has named three different kinds of traps.

Snares, nets, and gins together paint one relentless picture of pursuit.

🪤 Gins is an old word for traps
⚙️ It shares a root with engine
🔢 Three trap words appear in five verses
📖 Together they picture relentless pursuit

# Psalms 140:6-8
# 🛡️ Turning To God As Refuge In Battle
---
## 🔀 I Said Unto The LORD Thou Art My God

David has spent five verses describing his enemies in detail.

Now the entire focus turns toward God instead.

Saying "thou art my God" is a personal claim, not a general statement about God.

David is renewing his own allegiance before he asks for anything else.

🔀 The focus shifts from enemies to God
🙋 My God is a personal claim
🤝 David renews his allegiance first
📖 Trust comes before the request

## 🙏 Hear The Voice Of My Supplications

A "supplication" is not a casual prayer or passing thought toward God.

It is an urgent, specific request made by someone in real need.

David is not simply talking to God in this line.

He is pleading, the way someone pleads when danger feels close.

🙏 Supplication means an urgent specific plea
🚨 It signals real, present need
🗣️ David is pleading, not chatting
📖 The urgency matches the danger he described

## 🔤 O GOD The Lord

"Lord" here translates Adonai, a Hebrew title meaning master or sovereign.

"GOD" in full capitals translates YHWH, God's personal covenant name.

The KJV uses this same pairing of titles throughout the Old Testament.

Stacking both names together calls on the full weight of who God is.

👑 Lord translates Adonai, meaning master
🔤 GOD in capitals translates YHWH
📚 This pairing appears often in the Old Testament
📖 Stacking both names calls on full authority

## 💪 The Strength Of My Salvation

"Strength" here does not describe David's own physical power.

It describes God as the source and cause of David's rescue.

Calling God "the strength of my salvation" names God as the whole reason deliverance is possible.

David is not asking for strength to save himself.

He is trusting the strength that already belongs to God.

💪 Strength here belongs to God, not David
🛟 Salvation means rescue from danger
🙌 God is the source, not a helper
📖 David trusts God's strength, not his own

## 🪖 Thou Hast Covered My Head In The Day Of Battle

Think of a soldier putting on a helmet before walking into a fight.

That is the picture behind "covered my head" in this line.

"Day of battle" describes an ongoing conflict, not one single skirmish.

God is described as protective gear David wears into an unfinished fight.

🪖 Covered my head pictures a helmet
⚔️ Day of battle means ongoing conflict
🛡️ God functions as David's protection
📖 The fight is not yet finished

## 🚫 Grant Not O LORD The Desires Of The Wicked

David is not asking God to punish his enemies out of personal spite.

He is asking God to simply let their own plans fail.

"Desires" here means whatever outcome the wicked are hoping to achieve.

Denying their desires is different from actively striking them down.

🚫 This is not a request for revenge
🎯 Desires means their hoped for outcome
🙅 David only asks for their plans to fail
📖 Denial is different from active punishment

## ➡️ Further Not His Wicked Device

"Further" is an old way of saying advance or help along.

"Device" means a scheme or plan, not a physical tool.

David is asking God not to give the wicked any assistance.

Even indirect help toward their plan is what he prays against.

➡️ Further means advance or help along
🧩 Device means a scheme or plan
🙅 David asks God to withhold assistance
📖 Even indirect help is what he prays against

## 📈 Lest They Exalt Themselves

"Exalt" means to lift up in pride, or in this case, boast.

David is not only concerned about his own safety in this line.

He is also concerned that success would make his enemies more arrogant.

Their failure protects David and also keeps their pride in check.

📈 Exalt means to lift up in pride
😤 The concern is their pride, not just safety
🛡️ Their failure protects David
📖 It also checks their arrogance

# Psalms 140:9-11
# ⚖️ Prayers For Justice To Turn Back On Them
---
## 🔄 The Head Of Those That Compass Me About

"Compass" means to surround completely, the same word used elsewhere for God's own presence.

Here it describes enemies surrounding David instead.

"The head" refers to the ringleader guiding the group against him.

David is not facing scattered opposition but an organized threat with a leader.

🔄 Compass means to surround completely
👑 Head means the leader of the group
🎯 The threat is organized, not scattered
📖 Even a ringleader falls under this prayer

## ⚖️ Let The Mischief Of Their Own Lips Cover Them

This line asks for a very specific kind of justice.

David wants the very words his enemies spoke to become their own downfall.

Their lips were the weapon back in verse three.

Now David prays that same weapon turns back on them.

⚖️ David asks for a specific kind of justice
👄 Their own lips become their downfall
🔁 The weapon from verse three returns on them
📖 The harm they planned lands on themselves

## 🔥 Let Burning Coals Fall Upon Them

Burning coals falling from above is a picture used elsewhere in Scripture for divine judgment.

David is not planning to attack his enemies himself.

He is asking God to be the one who judges them.

The image borrows the language of fire raining down from heaven.

🔥 Burning coals pictures divine judgment
🙅 David does not plan to attack himself
🙏 He leaves the judging to God
📖 The image echoes fire from heaven

## 🕳️ Cast Into The Fire Into Deep Pits

A "pit" in ancient warfare was often a trap dug into the ground.

"Deep pits" pictures a fall with no easy way back out.

Pairing fire and pits stacks two images of total, inescapable ruin.

David is praying for an ending, not a temporary setback.

🕳️ Pit pictures a trap with no easy exit
🔥 Fire and pits together mean total ruin
⏳ David prays for an ending, not a setback
📖 The judgment he asks for is final

## 🛑 That They Rise Not Up Again

This line makes the request from the verse before explicit.

David is not hoping for his enemies to be humbled and return later.

He is asking for their scheme to be finished completely.

The prayer matches the danger he described earlier as constant and unrelenting.

🛑 This makes the request explicit
🔁 Not humbled and returning, but finished
💯 David wants total resolution
📖 It matches the constant danger described earlier

## 🏗️ Let Not An Evil Speaker Be Established In The Earth

"Established" means to be given a lasting foothold or a secure place.

David is not only praying against this one moment of danger.

He is praying that this kind of person never gains lasting influence anywhere.

The request looks beyond his own situation toward a wider pattern.

🏗️ Established means a lasting foothold
🌍 The prayer reaches beyond David's own danger
🚫 He prays against lasting influence for evil speakers
📖 The request widens beyond his own case

## 🏹 Evil Shall Hunt The Violent Man To Overthrow Him

Hunting language filled the first half of this psalm, snares, nets, and gins.

There the enemies were the hunters and David was the prey.

Here that picture reverses, and evil itself becomes the hunter.

The violent man from verse one becomes hunted by his own evil.

🏹 Hunting language returns from earlier verses
🔁 The roles of hunter and hunted reverse
🎯 The violent man becomes the one hunted
📖 His own evil becomes his hunter

# Psalms 140:12-13
# 🙏 Confidence That God Defends The Afflicted
---
## ✅ I Know That The LORD Will Maintain The Cause Of The Afflicted

The tone of the psalm shifts here from asking to declaring.

"I know" states a settled confidence, not a hope David is unsure about.

"Maintain the cause" means to actively defend someone's side in a dispute.

"The afflicted" describes people worn down by suffering or oppression, like David himself.

🔀 The tone shifts from asking to declaring
✅ I know means settled confidence
⚖️ Maintain the cause means active defense
📖 The afflicted includes David himself

## ⚖️ The Right Of The Poor

"Right" here means a legal cause or a rightful claim, not simply charity.

"The poor" describes people without power to defend themselves in a dispute.

God is described as the one who takes up their case personally.

This is courtroom language applied to God's care for the powerless.

⚖️ Right means a rightful legal claim
🙇 The poor means those without power
👨‍⚖️ God takes up their case personally
📖 This is courtroom language for God's care

## 🙏 The Righteous Shall Give Thanks Unto Thy Name

The psalm turns one final time, now toward worship.

David moves from personal danger to a wider promise about the righteous in general.

Giving thanks "unto thy name" means praising God for who He has shown Himself to be.

The danger described throughout this psalm ends in gratitude, not despair.

🙏 The psalm turns toward worship
🌍 The promise widens beyond David alone
🏷️ Thy name means who God has shown Himself
📖 Danger throughout the psalm ends in gratitude

## 🏠 The Upright Shall Dwell In Thy Presence

"Dwell" pictures a settled, permanent home, not a brief visit.

This is the opposite of the wicked being cast into pits earlier in the psalm.

The upright are not just spared danger, they are welcomed close to God.

The whole psalm moves from enemies who hunt to a home in God's presence.

🏠 Dwell pictures a permanent home
🔁 This reverses the wicked being cast into pits
🤝 The upright are welcomed close to God
📖 The psalm ends in nearness, not just safety
`.trim();

export const PSALMS_ONE_HUNDRED_FORTY_PERSONAL_SECTIONS = parsePsalmsOneHundredFortyRawNotes(
  PSALMS_ONE_HUNDRED_FORTY_RAW_NOTES
);
