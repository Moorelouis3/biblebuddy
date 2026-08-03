export type LeviticusTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTenRawNotes(rawText: string): LeviticusTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 10:${startVerse}` : `Leviticus 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Leviticus 10 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TEN_RAW_NOTES = `# Leviticus 10:1-3
# 🔥 Strange Fire
---
## 👨‍👦 Nadab And Abihu, The Sons Of Aaron

Nadab and Abihu are the two oldest sons of Aaron.

They stood beside their father through the ordination in chapter eight.

They also appear far earlier, in Exodus twenty four, climbing partway up Mount Sinai with Moses and the elders.

Being the oldest and already trusted did not protect them here.

Standing near God was never a reason to skip His instructions.

👨‍👦 Aaron's two oldest sons

📜 Named earlier at Sinai in Exodus

⚖️ Rank did not excuse what follows

➡️ Closeness to God still requires obedience

## 🔥 Took Either Of Them His Censer

A censer means a small metal pan used to carry hot coals and incense.

Priests carried censers into the tabernacle regularly as part of normal worship.

The tool itself was not the problem in this story.

What Nadab and Abihu chose to put inside it was.

🔥 Censer means a firepan for incense

🙏 A normal, approved tool for priests

❓ The problem was never the equipment

➡️ What went inside it is what mattered

## 🚫 Offered Strange Fire Before The LORD

Strange fire means fire taken from the wrong source.

Chapter six already commanded that the altar's own fire must never go out.

Every offering was supposed to be lit only from that one continual flame.

Nadab and Abihu used a different source instead.

Their sin was not confusion about the rule.

It was choosing to act without any command to do so.

🔥 Strange fire means fire from the wrong source

📖 Chapter six required using only the altar's fire

🚫 They used a different source than commanded

➡️ Acting without a command was the real sin

## 😢 There Went Out Fire From The LORD, And Devoured Them

This is the same phrase used one verse earlier in chapter nine.

There it described fire consuming the offering while the whole nation shouted with joy.

Here the same kind of fire strikes the men themselves instead of an animal.

The repetition is not an accident.

The same fire that proved God's acceptance in chapter nine becomes judgment here.

🔥 Same phrase used in chapter nine

🐂 There it consumed an offering

😢 Here it consumes the men themselves

📖 Acceptance and judgment sit one chapter apart

## 🕯️ They Died Before The LORD

Before the LORD means directly in front of the tabernacle itself.

Nadab and Abihu died at or near the very altar where they had just been serving.

Their deaths happened in the holiest and most visible place in the whole camp.

There was no private place to fail in this role.

🕯️ Before the LORD means at the tabernacle

⚡ Death came in the middle of active service

👀 It happened in full public view

📖 There was no private place to fail here

## ✨ I Will Be Sanctified In Them That Come Nigh Me

Sanctified means treated as holy and taken with total seriousness.

Moses explains what Nadab and Abihu's deaths actually meant.

Anyone who comes close to God must treat that closeness with real weight.

This has been a theme running through Leviticus since chapter one.

Nearness to God was never a casual privilege.

✨ Sanctified means treated as holy

⚖️ Closeness to God demands real seriousness

📜 A theme running through Leviticus since chapter one

➡️ Nearness to God was never casual

## 🤐 Aaron Held His Peace

Held his peace means Aaron said nothing at all.

No protest and no argument are recorded in the text.

This does not mean Aaron felt nothing in that moment.

Verse nineteen later in this chapter shows his grief was real.

Silence here was restraint, not an empty heart.

🤐 Held his peace means Aaron said nothing

😶 No protest is recorded in the text

😢 His grief surfaces later in verse nineteen

📖 Silence here was restraint, not an empty heart

# Leviticus 10:4-7
# 😢 No Time To Mourn
---
## 👨‍👩‍👧 Mishael And Elzaphan, The Sons Of Uzziel The Uncle Of Aaron

Uzziel was a brother of Aaron and Moses's own father, Amram.

That makes Mishael and Elzaphan first cousins to Aaron.

It also makes them cousins to Moses.

Moses chose family on purpose for this task.

The job needed people close enough to be trusted.

It also needed people far enough from Aaron's own sons.

His sons were still bound by the mourning restrictions in verse six.

👨‍👩‍👧 First cousins to Aaron and Moses

📜 Uzziel was Aaron's uncle

🎯 Close family, but not bound by Aaron's restrictions

➡️ Moses chose trust over convenience

## ⚰️ Carry Your Brethren From Before The Sanctuary Out Of The Camp

A dead body made a person and a place ceremonially unclean under the law.

Anything dead had to be removed from the sanctuary area right away.

Out of the camp was the standard place for anything unclean or destroyed.

The burnt remains of the sin offering in earlier chapters went to that same place.

⚰️ A dead body made the space unclean

🏕️ Anything unclean had to leave the sanctuary fast

🔥 The same place used for burnt offering remains

📖 Uncleanness could not stay near God's presence

## 👕 Carried Them In Their Coats

This means the bodies were carried out still wearing their priestly garments.

Nobody stopped to strip and redress them first.

There was no time for a normal burial preparation.

Speed and respect mattered more than ceremony in this moment.

👕 Their garments were never removed

⏱️ No time for normal burial preparation

🏃 Speed mattered more than ceremony here

➡️ Even grief followed the priestly order

## 😢 Uncover Not Your Heads, Neither Rend Your Clothes

Loosening the hair and tearing the clothes were Israel's normal signs of mourning.

Everyone in the camp would have recognized both signs instantly.

Aaron and his surviving sons were forbidden from doing either one.

Their grief had to stay invisible.

They remained on active duty the whole time.

😢 Loose hair and torn clothes signaled mourning

🚫 Aaron's family could not use either sign

👨‍👦 Eleazar and Ithamar named for the first time

➡️ Duty required grief to stay hidden

## ⚠️ Lest Ye Die, And Lest Wrath Come Upon All The People

This warning is severe on purpose.

Stepping away from duty to mourn was not allowed.

Even grief for their own sons could not excuse it.

God's anger could fall on the whole nation instead.

Their conduct as priests was never only a private matter.

⚠️ The warning is severe on purpose

🇮🇱 Their conduct affected the whole nation

🛑 Duty could not pause even for grief

📖 Priestly failure carried national consequences

## 👥 Let Your Brethren, The Whole House Of Israel, Bewail The Burning

Ordinary Israelites were free to mourn Nadab and Abihu in the normal way.

Their grief was allowed and even expected.

Aaron and his surviving sons could not do the same.

They were still needed for active duty in that exact moment.

The restriction was about function, not about caring less.

👥 Ordinary Israelites could mourn normally

🙏 Their grief was allowed and expected

⚖️ Aaron's sons stayed on active duty instead

➡️ The restriction was about duty, not love

## 🚪 Ye Shall Not Go Out From The Door Of The Tabernacle

This repeats the same boundary rule from chapter eight.

Aaron and his sons had already stayed at the tabernacle entrance for seven days during their ordination.

Now the same rule applies again, this time during real tragedy.

Duty required staying in place even in the worst moment of their lives.

🚪 Same boundary rule as chapter eight

🔁 Aaron's sons stayed put during ordination too

⏳ Now the rule held during real tragedy

📖 Duty required staying even in grief

## 🫒 The Anointing Oil Of The LORD Is Upon You

The anointing oil in chapter eight was not only a one time ceremony.

It marked Aaron and his sons as permanently set apart for God's service.

That permanent status is the reason given for why they could not step away to grieve.

Being set apart came with real weight, not only privilege.

🫒 The anointing marked them as permanently set apart

📖 Callback to the anointing oil in chapter eight

⚖️ Being set apart came with ongoing obligation

➡️ Privilege and cost arrived together

# Leviticus 10:8-11
# 🍷 No Wine Or Strong Drink
---
## 🗣️ The LORD Spake Unto Aaron

Through nearly all of Leviticus so far, God has spoken to Moses first.

Moses then relayed each message to Aaron.

This is the first time in the whole book that God speaks directly to Aaron alone.

The timing matters, coming right after the tragedy of the first seven verses.

🗣️ First direct word from God to Aaron alone

📖 Every earlier instruction came through Moses first

🎯 A clear shift right after the tragedy

➡️ Grief did not close off God's voice

## 🍷 Do Not Drink Wine Nor Strong Drink

Strong drink means a fermented beverage other than wine.

It was made from grain, dates, or other fruit instead of grapes.

Between the two words, this command bans every kind of alcoholic drink.

Nothing about being impaired was allowed near God's altar.

🍷 Strong drink means fermented drinks besides wine

🌾 Made from grain, dates, or other fruit

🚫 Together the words cover every alcoholic drink

➡️ Nothing impaired belonged near God's altar

## ⏱️ When Ye Go Into The Tabernacle Of The Congregation

This ban does not cover every moment of a priest's life.

It applies specifically to entering the tabernacle for active service.

The stakes are the same severe language just used for Nadab and Abihu.

Many readers connect this law directly to what caused their fatal mistake.

⏱️ The ban applies to active tabernacle service

🚷 Not a rule for a priest's whole life

⚠️ Echoes the lest ye die warning above

➡️ Many connect this law to Nadab and Abihu

## ♾️ A Statute For Ever Throughout Your Generations

For ever means this command never expires.

It marks the alcohol ban as permanent law, not a rule for one grieving moment.

Every future priest is bound by the same restriction.

A tragedy on one day produced a rule that lasted for centuries.

♾️ For ever means the law never expires

📜 Permanent law, not a rule for one moment

👨‍👦‍👦 Every future priest is bound the same way

📖 One tragedy produced a lasting rule

## 🧠 Put Difference Between Holy And Unholy

This names the real reason behind the alcohol ban.

Priests had to make careful and sober judgment calls constantly.

They had to tell holy things apart from ordinary things.

Impaired judgment could lead back to a mistake like verses one through three.

🧠 Priests needed clear judgment for constant rulings

⚖️ Holy versus ordinary was a real decision

🍷 Alcohol could compromise that very judgment

➡️ Sober minds protected against another tragedy

## 🧼 Between Unclean And Clean

This second pair of words covers a different kind of judgment call.

Holy and unholy dealt with sacred status.

Unclean and clean dealt with everyday ritual purity.

That purity system runs across many earlier chapters.

Both pairs required the same sober, careful mind to sort correctly.

🧼 Unclean and clean covers ritual purity

📖 A separate judgment from holy and unholy

🔁 Purity laws run through many earlier chapters

➡️ Both pairs needed the same sober mind

## 📖 That Ye May Teach The Children Of Israel All The Statutes

Priests were not only responsible for performing sacrifices.

This verse reveals a second major job.

They also had to teach the whole nation God's laws directly.

Teaching accurately required the same sober clarity as making ritual judgment calls.

📖 A second priestly duty besides sacrifice

🧠 Teaching required a clear, sober mind

🇮🇱 This duty reached the whole nation

➡️ Knowing God's law was not only for priests

## ✋ Which The LORD Hath Spoken Unto Them By The Hand Of Moses

By the hand of Moses means Moses was the channel through which these laws first came.

Aaron and his sons now had to pass those same laws on to the people.

The chain of authority ran from God, to Moses, to the priests, to the nation.

Nobody at any step was free to teach their own opinion instead.

✋ By the hand of Moses names the source

🔗 From God, to Moses, to the priests

📖 A clear chain of authority for every law

➡️ Nobody could teach their own opinion instead

# Leviticus 10:12-15
# 🍞 What The Priests Could Eat
---
## 🍞 The Meat Offering That Remaineth

Meat offering is the old English name for the grain offering explained back in chapter two.

It was made of flour and oil, not animal meat.

Only a small handful of it was ever burned on the altar as God's token share.

That remaineth means the larger leftover portion that belonged to the priests.

🍞 Meat offering means the grain offering

🔥 Only a handful was ever burned

🥖 That remaineth means the leftover portion

➡️ The rest belonged to the priests

## 📍 Eat It Without Leaven Beside The Altar

Without leaven means made with no yeast at all.

Chapter two already set that same rule for grain offerings.

Beside the altar names the one place this food could be eaten.

The location was not optional.

It was part of the law itself.

🍞 Without leaven means made without yeast

📖 The same rule set back in chapter two

📍 It had to be eaten beside the altar

➡️ The location was part of the law

## 📊 For It Is Most Holy

Most holy is a specific ranking inside the sacrificial system.

It sits higher than the plain word holy.

Only a few offerings ever reached this top rank.

That rank explains the strict rules around it.

📊 Most holy ranks higher than holy

🏆 Only a few offerings reached this rank

📏 The rank is why the rules were strict

➡️ Higher holiness meant stricter handling

## 💰 It Is Thy Due, And Thy Sons' Due

Due means a rightful payment, not a generous gift.

Serving at the altar came with an actual right to a share of what was offered.

Priests owned no farmland like the rest of Israel.

This system was how they were fed.

💰 Due means a rightful payment

🌾 Priests owned no farmland of their own

🍞 Offerings were their actual livelihood

➡️ This was pay, not charity

## 📊 The Wave Breast And Heave Shoulder Shall Ye Eat In A Clean Place

This portion comes from the peace offering explained back in chapters three and seven.

It carried looser rules than the grain offering just described.

Clean place is a lower bar than holy place.

Any ceremonially clean spot would do, not only the ground next to the altar.

📊 A lower ranked portion than the grain offering

📍 Clean place allowed more room than holy place

🍽️ Any ceremonially clean spot would do

➡️ Rules matched each offering's own rank

## 👧 Thy Sons, And Thy Daughters With Thee

The most holy grain offering could only be eaten by male priests.

This peace offering portion was different.

It could be shared with daughters too.

That difference traces straight back to each offering's holiness rank.

A priest's whole household could benefit from this specific gift.

👧 Daughters could share this portion

🚫 The grain offering did not allow that

⚖️ The difference came from holiness rank

➡️ A whole household could share in this gift

## 🌊 To Wave It For A Wave Offering Before The LORD

Wave and heave describe two different priestly gestures.

Wave meant moving the offering side to side before the altar.

Heave meant lifting it up and down.

Both gestures were already explained back in chapter seven.

They turned a piece of meat into a small, visible act of worship.

🌊 Wave meant moving side to side

⬆️ Heave meant lifting up and down

📖 Both gestures explained back in chapter seven

➡️ A simple portion became an act of worship

## ♾️ By A Statute For Ever

Statute for ever repeats the exact phrase already used for the alcohol ban earlier in this chapter.

That repetition confirms this priestly food right is permanent too.

It was not a one time gift after one hard week.

It belonged to every priest who would ever serve after Aaron.

♾️ Statute for ever means permanent, not temporary

🔁 The same phrase used for the alcohol ban

🍞 A lasting right, not a one time gift

➡️ It belonged to every priest who followed

# Leviticus 10:16-20
# 😠 The Goat That Was Burned
---
## 🔍 Moses Diligently Sought The Goat Of The Sin Offering, And It Was Burnt

Diligently sought means Moses went looking for this one animal on purpose.

This was not a casual question asked in passing.

He discovered that the people's sin offering goat from chapter nine had been completely burned.

It was supposed to be eaten by the priests instead.

🔍 Diligently sought means Moses looked on purpose

🐐 The goat first appeared back in chapter nine

🔥 It was burned instead of eaten

➡️ Something had gone wrong with the process

## 😠 He Was Angry With Eleazar And Ithamar

Eleazar and Ithamar are Aaron's two surviving sons.

They are the ones left after Nadab and Abihu died earlier in this same chapter.

Moses directs his anger at them specifically.

They were the priests responsible for this particular offering.

😠 Aaron's two remaining sons

👨‍👦 The ones left after Nadab and Abihu died

🎯 They were responsible for this offering

➡️ The chapter's grief was still fresh

## 🍽️ Seeing It Is Most Holy

Eating this portion was not simply a priestly perk.

It was part of how atonement actually worked.

By eating the sin offering, the priests carried the people's guilt in a symbolic way.

Skipping the meal was not a small oversight.

🍽️ Eating this food was a required duty

⚖️ Priests symbolically carried the people's guilt

🙏 Part of how atonement was completed

➡️ Skipping it was a real problem

## ⚖️ God Hath Given It You To Bear The Iniquity Of The Congregation

Bear the iniquity means to carry the weight of someone else's guilt.

The priests took on this role by eating the sin offering meat.

This was not eating for pleasure or reward.

It was one working part of the atonement system.

⚖️ Bear the iniquity means carrying someone's guilt

🍽️ Eating the meat carried out that role

🚫 Not eaten for pleasure or reward

➡️ One working part of the atonement system

## ✅ To Make Atonement For Them Before The LORD

This names the purpose behind the whole sin offering process.

Atonement was not complete until every required step happened.

Eating the meat was one of those required steps, not an optional extra.

Skipping it left the process unfinished.

✅ Atonement required every step, not just some

🍽️ Eating the meat was one required step

🚫 It was never an optional extra

➡️ Skipping it left the process unfinished

## 🩸 The Blood Of It Was Not Brought In Within The Holy Place

Chapter six already set the rule that decides this exact case.

If a sin offering's blood was carried into the tabernacle, the meat had to be burned outside the camp.

If the blood stayed outside, the meat was supposed to be eaten instead.

This goat's blood never went inside.

By that rule, it should have been eaten, not burned.

📖 A rule from chapter six decides this case

🩸 Blood inside meant the meat was burned

🍽️ Blood outside meant the meat was eaten

➡️ This goat should have been eaten

## 😢 Such Things Have Befallen Me

Aaron points back to the deaths of Nadab and Abihu earlier in the chapter.

He does not need to name his sons again.

Everyone already knows what he means.

This is a quiet way of saying it has been the worst day of his life.

😢 Aaron references his sons' deaths again

💔 A quiet way to name the worst day

🗣️ The start of his explanation to Moses

➡️ Grief needed no further explanation

## ❓ Should It Have Been Accepted In The Sight Of The LORD

Aaron raises a real question, not an excuse.

Eating this portion was normally tied to celebration among the priests.

Doing that on the very day his sons died felt wrong to him.

He is weighing the spirit of the law against its bare technical letter.

❓ Aaron raises a genuine question

🍽️ This meal was normally tied to celebration

💔 Celebrating felt wrong on that specific day

➡️ He weighs the law's spirit against its letter

## ✅ When Moses Heard That, He Was Content

Moses accepts Aaron's reasoning without further argument.

This closes the chapter on a note of mercy, not more conflict.

A strict system of rules still made room for a father's genuine grief.

The law was never meant to crush the people who had to live under it.

✅ Moses accepts the explanation without dispute

🤝 The chapter ends in resolution, not conflict

❤️ A strict system still made room for grief

📖 The law was never meant to crush people`.trim();

export const LEVITICUS_TEN_PERSONAL_SECTIONS = parseLeviticusTenRawNotes(LEVITICUS_TEN_RAW_NOTES);
