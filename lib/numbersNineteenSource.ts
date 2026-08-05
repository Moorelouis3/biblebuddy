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

God addresses Moses and Aaron together here, not Moses alone.

Most commands in Numbers reach Israel through Moses first.

This one goes straight to the priesthood as well.

The ritual that follows belongs to Aaron's family, not the general camp.

Naming Aaron by name signals this law is priestly business from the very first line.

🗣️ Addressed to Moses and Aaron together

👳 Signals priestly business from the start

📜 Most Numbers laws reach Moses first

📖 This ritual belongs to Aaron's line

## 📜 The Ordinance Of The Law

"Ordinance" means a fixed rule, not a suggestion or a one time idea.

Calling it "the law" marks it as a permanent command.

Verses like this often introduce a ritual before naming a single detail.

Numbers already contains many other permanent ordinances for offerings, feasts, and purity.

This heading tells the reader the ritual about to follow carries real weight.

📜 Ordinance means a fixed required rule

🔒 The Law marks it as permanent

📋 Introduces the ritual before any detail

📖 This command carries lasting weight

## 🔴 A Red Heifer Without Spot, Wherein Is No Blemish

A heifer is a young cow that has never had a calf.

Solid red cattle were rare in the ancient world.

Most cattle were black, brown, or spotted instead.

"Without spot" and "no blemish" mean completely free of injury or flaw.

Only a flawless animal could serve in Israel's system of offerings.

Finding one took real searching, and that search was part of the cost.

🐄 A heifer is a cow that never calved

🔴 Solid red cattle were genuinely rare

✨ Without spot means completely flawless

📖 Only a perfect animal would do

## 🐂 Upon Which Never Came Yoke

A yoke is the wooden frame strapped across an animal's neck for plowing or pulling a cart.

This heifer had never worn one and never done ordinary labor.

It was set apart for this one purpose from birth, not pulled from the work herd.

Every detail so far points to something reserved fully for God.

🐂 A yoke harnesses an animal for work

🆕 This heifer had done no ordinary labor

🎯 Set apart from birth for this purpose

📖 Every detail marks it as reserved for God

## 👳 Ye Shall Give Her Unto Eleazar The Priest

Eleazar is Aaron's son, next in line to become high priest.

Handing this ritual to Eleazar instead of Aaron is a small but real signal.

Aaron is nearing the end of his life and dies later in Numbers chapter twenty.

Eleazar already handles duties tied to death and impurity that Aaron would normally avoid.

The leadership of Israel's priesthood is already shifting toward the next generation.

👳 Eleazar is Aaron's son and heir

➡️ Aaron nears the end of his life

🔄 Leadership is already passing forward

📖 A quiet signal of generational change

## 🚪 Bring Her Forth Without The Camp

Ordinary sacrifices happen at the altar inside the tabernacle courtyard.

This ritual happens completely outside the camp instead.

Death is the source of the deepest ceremonial uncleanness in Israel's law.

Anything connected to death has to stay away from the holy center of the camp.

Distance itself communicates how serious this uncleanness is treated.

🚪 Performed outside the camp, not the altar

☠️ Death causes the deepest uncleanness

🏕️ Holiness stays at the camp's center

📖 Distance reflects how serious this is

## 🔪 One Shall Slay Her Before His Face

Someone else kills the heifer while Eleazar only watches.

"Before his face" means done in his presence and under his authority.

Eleazar oversees the death without performing the killing himself.

Even this unusual ceremony keeps a careful division of roles.

🔪 Someone else performs the actual killing

👀 Before his face means in his presence

🔑 Eleazar oversees without doing the killing

📖 Roles stay divided even in this ritual

## 🩸 Sprinkle Of Her Blood Directly Before The Tabernacle

Eleazar takes the blood and flicks it toward the tabernacle from outside the camp.

He does this seven times in a row.

Seven is the number of completeness throughout the Bible.

Sprinkling seven times makes the act fully thorough, even at a distance.

The ritual stays connected to the tabernacle without the blood ever entering it.

🩸 Blood is flicked toward the tabernacle

🔂 Seven repeats signal full completeness

📏 Done at a distance, never inside

📖 Connection without ever entering the tabernacle

## 🔥 One Shall Burn The Heifer In His Sight

The entire animal is burned, skin, flesh, blood, and even the dung.

Most burnt offerings only burn select fat and choice pieces.

Nothing here is eaten or saved aside as food.

This is a total destruction of the whole animal, not a partial one.

A complete burning matches the weight of what is being cleansed.

🔥 Every part of the animal is burned

🚫 Nothing is eaten or saved as food

🔁 Unlike most burnt offerings in the law

📖 Total burning matches total cleansing

## 🌲 Cedar Wood, And Hyssop, And Scarlet

Cedar wood, hyssop, and scarlet wool are all cast into the fire together.

Hyssop is a small bushy herb with clusters of tiny leaves.

This same trio of materials appears in exactly one other law.

That law cleanses a healed leper in Leviticus fourteen.

Both rituals move something from unclean back to clean.

Reusing the same materials links two very different acts of becoming clean again.

🌲 Cedar, hyssop, and scarlet burn together

🌿 Hyssop is a small bushy herb

🔗 The same trio cleanses a leper in Leviticus

📖 Two different rituals share one method

# Numbers 19:7-10
# 🧼 Clean Enough To Make Others Clean
---
## 👔 The Priest Shall Wash His Clothes, And He Shall Bathe His Flesh

Before Eleazar can return to the camp he must wash his clothes and bathe completely.

This is a required step, not a personal choice.

No one gets to skip it, not even the officiating priest.

Only after washing can he safely come back among the people.

👔 A full wash is required, not optional

🚿 The mandatory step before returning

🔑 No exception, not even for the priest

📖 Cleanness comes before rejoining the camp

## ⏳ The Priest Shall Be Unclean Until The Even

"Even" means evening, so this uncleanness lasts only until sundown.

Performing this ritual to make others clean makes Eleazar himself unclean.

The ashes this ritual produces will purify people from death's defilement later.

Yet producing those ashes defiles the priest who makes them right now.

The one who purifies becomes impure in the process.

⏳ Even means evening, until sundown

🔄 The purifier becomes impure while purifying

♻️ A paradox repeated for several people

📖 Purity here comes at a real cost

## 🔥 He That Burneth Her Shall Wash His Clothes

A second person, likely not Eleazar, actually burns the heifer.

That person faces the identical requirement as the priest.

Wash, bathe, and stay unclean until evening.

Everyone who touches this process at any stage picks up the same temporary impurity.

🔥 A separate person handles the burning

🔁 Faces the same wash and wait rule

🧍 Impurity spreads to everyone involved

📖 Contact with this ritual always costs something

## 🧑‍🌾 A Man That Is Clean Shall Gather Up The Ashes

The ashes must be collected by someone who starts out ceremonially clean.

Gathering them will make that same person unclean afterward anyway.

The ashes need careful handling from the very first person who touches them.

Even a clean gatherer cannot avoid catching the ritual's uncleanness.

🧑‍🌾 Must start clean to gather the ashes

📦 Careful handling from the first touch

♻️ Even a clean gatherer becomes unclean

📖 Respect for the ashes outweighs convenience

## 💧 A Water Of Separation

"Water of separation" means water mixed with these ashes.

It gets used later to cleanse anyone who touches death.

The text also calls this a purification for sin.

No specific individual sin caused any of these deaths.

Contact with death itself counted as a kind of defilement needing atonement.

💧 Water mixed with ashes, used to cleanse

⚰️ Cleanses anyone who has touched death

⚖️ Classified as a sin offering

📖 Death itself required atonement in this system

## 🌍 Unto The Stranger That Sojourneth Among Them

"Stranger" means a person from outside Israel living among God's people.

"Sojourn" means living somewhere temporarily, as a resident rather than a citizen.

This law explicitly includes them too.

Foreigners living in Israel were not exempt from needing this same purification.

🌍 Stranger means a foreigner living among Israel

🏕️ Sojourn means living there temporarily

🤝 Foreigners were bound by the same law

📖 No exemption based on nationality

## ♾️ A Statute For Ever

This entire ritual system is declared permanent, not a temporary wilderness arrangement.

It is meant to remain in effect for every future generation.

Numbers repeats this kind of permanent statute often.

A law repeated this way is a law meant to outlast the moment it was given.

♾️ Declared permanent, not temporary

📅 Applies to every future generation

🔁 One of many statutes like it in Numbers

📖 Meant to outlast the moment it was given

# Numbers 19:11-13
# ☠️ Touching Death, Seven Days Unclean
---
## 👤 He That Toucheth The Dead Body Of Any Man Shall Be Unclean Seven Days

Any contact with a human corpse triggers a full week of uncleanness.

Even a simple touch counts, not only handling the body directly.

That is far longer than the "until evening" uncleanness from the heifer ritual itself.

Direct contact with death outweighs contact with the ritual built to answer it.

👤 Touching a body causes seven days unclean

📈 Far longer than the until evening rule

⚖️ Death outweighs the ritual meant to cleanse it

📖 Contact with death carries the heaviest weight

## 🗓️ On The Third Day, And On The Seventh Day

The purification using ashes and water happens on two specific days.

The third day after contact with death, and the seventh day.

Skipping the third day application meant the seventh day cleansing would not count either.

Timing itself was part of what made the ritual work.

📆 Sprinkling required on the third day

🗓️ A second sprinkling required on day seven

⏭️ Skipping day three invalidates the whole process

📖 Timing was part of the ritual itself

## 🕵️ The Dead Body Of Any Man That Is Dead

This phrase repeats "dead" almost on purpose.

Ancient legal language often restates plainly like this.

The repetition closes off any reading that might apply to some deaths but not others.

No exception exists for how or why someone died.

🕵️ Dead is repeated almost on purpose

📜 Common feature of ancient legal wording

🚫 Closes off loopholes in the law

📖 No exception for how someone died

## 🚫 That Soul Shall Be Cut Off From Israel

Refusing this purification carried Israel's most severe covenant penalty.

"Cut off" means permanent removal from the covenant community.

That removal could come through death, exile, or God's own judgment.

The text names the reason for this harsh penalty.

This person defiles the tabernacle of the Lord itself.

Israel's holiness as a nation depended on individuals following through.

🚫 Cut off means permanent removal

⚖️ Could come through death, exile, or judgment

🏕️ The charge is defiling the tabernacle itself

📖 National holiness depended on individual obedience

# Numbers 19:14-16
# ⛺ The Law Of The Tent
---
## ⛺ When A Man Dieth In A Tent

Israelites lived in tents, especially during the wilderness years.

This law addresses the most common setting death would actually happen in.

The text spells out exactly how far uncleanness spreads through a shared space.

Nothing about wilderness death was left to guesswork.

⛺ Tents were the common wilderness home

📋 Removes guesswork about spreading uncleanness

🏕️ Matches the real living conditions of the camp

📖 Nothing about this law was left vague

## 🚶 All That Come Into The Tent, And All That Is In The Tent

Uncleanness from a death in a tent does not stop with the person who died.

Anyone who enters that tent picks it up too.

Everything already inside the tent is affected as well.

Death's defilement fills the whole space, not just the body itself.

🚶 Anyone entering the tent becomes unclean

📦 Everything already inside is affected too

🌫️ Defilement fills the space, not one point

📖 Death's reach extends beyond the body

## 🍶 Every Open Vessel, Which Hath No Covering Bound Upon It

An open container is one without a tightly fitted lid or covering.

Left in a tent where someone died, it becomes unclean.

A sealed container in the same tent stays clean.

Whatever is exposed to the space picks up the defilement.

🍶 Open means no tight lid or covering

🔓 Uncovered containers pick up uncleanness

🔒 Sealed containers stay clean

📖 Exposure, not location, decides what is affected

## ⚔️ Whosoever Toucheth One That Is Slain With A Sword In The Open Fields

The law extends past someone dying naturally in a tent.

It covers violent death out in an open field as well.

It also covers old scattered bones, and even touching a grave.

Any contact with death, in any form, triggers the same seven day uncleanness.

⚔️ Covers violent death in open fields

🦴 Also covers old bones from the past

🪦 Even touching a grave counts

📖 One broad rule, not a narrow list

# Numbers 19:17-19
# 🌿 Sprinkled Clean With Hyssop
---
## 🔥 They Shall Take Of The Ashes Of The Burnt Heifer

The actual cleansing procedure finally arrives here.

Ashes from the red heifer, saved back in verse nine, get put to use.

They are mixed with "running water," water actively flowing from a spring or stream.

Flowing water was considered more pure than still standing water.

Everything set up earlier in the chapter finally pays off in this moment.

🔥 The saved ashes are finally put to use

💧 Running water means flowing, not still

✨ Flowing water was seen as more pure

📖 Verses one through ten finally pay off

## 🌿 A Clean Person Shall Take Hyssop, And Dip It In The Water

Hyssop is a small bushy herb with clusters of tiny leaves.

Its shape made it ideal for holding and flicking liquid.

The same plant painted lamb's blood on Israelite doorposts at the first Passover.

A humble household herb gets reused across several major rituals in the law.

🌿 Hyssop is a small bushy herb

💦 Its shape made it ideal for sprinkling

🚪 The same plant marked doorposts at Passover

📖 One humble herb, reused across the law

## 🧑‍🤝‍🧑 Sprinkle It Upon The Tent, And Upon All The Vessels, And Upon The Persons

The sprinkling covers everything the earlier verses named as affected.

The tent itself, every vessel inside it, and every person present.

The cure matches the exact scope of what became defiled.

Nothing contaminated gets skipped in this cleansing.

🧑‍🤝‍🧑 Covers the tent, its contents, and people

🎯 Matches exactly what became defiled

🧹 Nothing contaminated gets skipped

📖 The cure is scoped to the problem

## 📅 Sprinkle Upon The Unclean On The Third Day, And On The Seventh Day

The same third day, seventh day timing from earlier in the chapter returns here.

This time it describes the actual mechanics of the cleansing.

Two separate sprinklings are required, not one.

After the second sprinkling, the person washes, bathes, and becomes clean that same evening.

📅 Two sprinklings, day three and day seven

🛁 Followed by washing and bathing

🌇 Clean again by evening of day seven

📖 The timeline announced earlier is carried out

# Numbers 19:20-22
# ⚠️ Cut Off, Or Made Clean
---
## 🚫 That Soul Shall Be Cut Off From Among The Congregation

The chapter repeats its harshest penalty one final time.

This is almost word for word the same warning from verse thirteen.

Refusing purification means being cut off from the whole congregation.

Repeating the warning at the chapter's close underlines how seriously God takes this law.

🚫 Repeats verse thirteen's warning almost exactly

🔁 Placed again at the chapter's close

⚠️ Cut off means removal from the whole congregation

📖 Repetition signals how seriously this is taken

## 🔄 He That Sprinkleth The Water Of Separation Shall Wash His Clothes

Even the person performing the final cleansing sprinkle must wash their own clothes afterward.

The paradox from earlier in the chapter holds true all the way to the end.

The one purifying still becomes impure in the process.

No one handling this ritual, at any stage, gets a full exemption.

🔄 The final sprinkler must still wash

🌀 The purifier still becomes impure

🔁 The paradox holds through the last step

📖 No stage of this ritual grants full exemption

## 👋 He That Toucheth The Water Of Separation Shall Be Unclean Until Even

Simply touching the purifying water causes temporary uncleanness.

Not the ashes, not a corpse, just the mixed water itself.

Uncleanness lasts only until evening in this case.

The ritual's own tools carry a trace of the very problem they remove.

👋 Touching the water causes uncleanness too

💧 Even the mixed water itself, not just ashes

⏳ Lasts only until evening

📖 The remedy carries a trace of the problem

## 🔗 Whatsoever The Unclean Person Toucheth Shall Be Unclean

The chapter's last line states the principle behind everything just described.

Uncleanness spreads by contact, passing from a defiled person to what they touch next.

This single sentence explains why the chapter needed so many specific rules.

Tents, vessels, graves, and bones are all working out this one principle.

🔗 States the rule behind the whole chapter

📖 Uncleanness spreads by contact, person to object

🧩 Explains why so many specific rules exist

➡️ One principle, many careful applications
`.trim();

export const NUMBERS_NINETEEN_PERSONAL_SECTIONS = parseNumbersNineteenRawNotes(NUMBERS_NINETEEN_RAW_NOTES);
