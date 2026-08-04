export type NumbersNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersNineRawNotes(rawText: string): NumbersNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 9:${startVerse}` : `Numbers 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Numbers 9 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_NINE_RAW_NOTES = `# Numbers 9:1-5
# 📅 Passover, One Year Later
---
## 🏕️ In The Wilderness Of Sinai

Israel is not in a new place here.

They have been camped at the base of Mount Sinai since Exodus 19.

Every major event so far happened on this same ground.

The Ten Commandments, the tabernacle, and the ordination of the priests all happened right here.

This chapter still takes place before the nation marches anywhere.

🏕️ Camped at Sinai since Exodus 19

🛠️ The tabernacle and the Law both given here

🚶 Israel has not yet begun to move

📖 The whole story happened on this ground

## 📅 The First Month Of The Second Year

This date sits earlier than it looks.

The census that opens the book of Numbers happened in the second month of this same year.

That means this Passover actually happened one month before the story in chapter one.

Numbers often groups material by topic instead of by strict time order.

The order on the page does not always match the order in real life.

📅 One month before Numbers chapter one

📚 Numbers groups by topic, not by order

🔀 The census actually came after this event

📖 Events are not always told in order

## 🎉 Let The Children Of Israel Also Keep The Passover

The word also signals a repeat, not a brand new command.

Passover was already given once, back in Exodus 12.

That was the night Israel finally left Egypt.

Now, one year later, God tells them to keep it again.

A one time rescue is becoming a yearly feast.

🎉 Also means this is a repeat

🌙 First commanded in Exodus 12

🏃 The night of the escape from Egypt

📖 A one time rescue becomes a yearly feast

## 🕰️ At His Appointed Season

Appointed season translates a Hebrew word, moed.

Moed means a fixed date set by God himself.

It is not a day the people could pick for convenience.

The same word describes Israel's other yearly feasts later in the Law.

These dates were never meant to be flexible.

🕰️ Appointed season means a fixed date

📜 The Hebrew word is moed

📅 Also used for Israel's other yearly feasts

📖 Sacred timing, not a convenient one

## 🌇 The Fourteenth Day Of This Month, At Even

Even is an old word for evening, close to sunset.

In this culture a new day started at evening, not at midnight.

So the fourteenth day at even points to one specific twilight hour.

That is when the Passover lamb was killed and eaten.

It is the exact same timing first given in Exodus 12:6.

🌇 Even means evening, near sunset

🌙 Days began at evening, not midnight

🐑 The hour the lamb was killed and eaten

📖 Matches the timing from Exodus 12:6

## 📜 All The Rites Of It, And All The Ceremonies Thereof

Rites and ceremonies mean nearly the same thing here.

Repeating two similar words together was a way to add emphasis.

The point is every single detail, not just the headline instruction.

Nothing about the original Passover could be quietly dropped or simplified.

The blood, the herbs, and the posture of eating ready to travel all still applied.

📜 Rites and ceremonies are close in meaning

🔁 Repeating them doubles the emphasis

🚫 Nothing could be dropped or simplified

📖 According to all means every detail

## 🗣️ Moses Spake Unto The Children Of Israel

The command travels through a clear chain of people.

God speaks to Moses first.

Only after that does Moses pass the word to Israel.

This same relay pattern repeats constantly through Exodus, Leviticus, and Numbers.

Moses functions as the one authorized go between.

🗣️ God speaks to Moses first

🔁 Moses then passes it to the people

📚 This pattern repeats across three books

📖 Moses is the one authorized go between

## ✅ According To All That The LORD Commanded Moses, So Did The Children Of Israel

This is an exact obedience formula.

A command is given, and then its completion is confirmed.

The same wording closes the tabernacle building account in Exodus 39 and 40.

It also matches the ordination language for the Levites from Numbers chapter 8.

Scripture uses this formula to certify that nothing was skipped or changed.

✅ Command given, then confirmed complete

🏗️ Matches the tabernacle building account

👐 Also matches the Levites ordination in Numbers 8

📖 A certification that nothing was skipped

# Numbers 9:6-8
# ❓ A Problem Nobody Expected
---
## 💀 Defiled By The Dead Body Of A Man

Touching a human corpse made a person ceremonially unclean under the Law.

That uncleanness is a separate category from moral sin.

It works more like a temporary status than a permanent stain.

It blocked someone from sacred activity until the status passed.

Only a human body is in view here, not an animal carcass.

💀 Touching a corpse caused uncleanness

⏳ A temporary status, not a moral judgment

🚪 It blocked sacred activity until it passed

📖 Animal carcasses followed different rules in Leviticus

## 🚫 They Could Not Keep The Passover On That Day

Ceremonial uncleanness barred a person from Passover completely.

This was not a minor inconvenience.

It meant real exclusion from one of Israel's most important yearly feasts.

These particular men had no idea this situation was even possible.

It happened to them without warning.

🚫 Uncleanness meant total exclusion

😟 Not a minor inconvenience at all

❓ No existing law covered their case yet

📖 A real problem nobody saw coming

## 🙋 They Came Before Moses And Before Aaron

The men bring their problem to both of Israel's top leaders together.

Moses led the nation.

Aaron served as high priest over all sacred matters.

Bringing a ceremonial question to Aaron fits since purity questions fell under his authority.

They went to the proper leaders instead of deciding on their own.

🙋 Brought to both leaders together

👑 Aaron oversaw sacred and ceremonial matters

⚖️ A purity question fit his role

📖 They sought proper authority, not a shortcut

## 🗣️ Wherefore Are We Kept Back

Notice what these men are not saying.

They are not searching for a loophole to skip a duty they disliked.

They genuinely want to take part in Passover.

They are upset that circumstances outside their control are stopping them.

Their complaint is really a request for a way to obey.

❤️ A genuine desire to worship

🚫 Not an excuse to avoid Passover

🙏 Blocked by circumstance, not by choice

📖 A request to obey, not an excuse

## 🤲 Stand Still, And I Will Hear What The LORD Will Command

Moses does not guess or make up an answer on the spot.

He pauses the whole situation.

He goes to ask God directly.

Stand still means wait, not that the answer is no.

This same pattern repeats later with Zelophehad's daughters in Numbers 27.

🤲 Moses asks God instead of guessing

⏸️ Stand still means wait, not refuse

🔁 The same pattern returns in Numbers 27

📖 New questions still needed God's own answer

# Numbers 9:9-14
# 🗓️ The Second Passover
---
## 👨‍👩‍👧‍👦 Of You Or Of Your Posterity

Posterity means descendants, your children and grandchildren and all who come after.

God phrases this answer to cover more than the men who just asked.

This is not a one time exception for a few defiled men.

It becomes a permanent part of the Law for every future generation.

Anyone facing this same problem later is already covered.

👨‍👩‍👧‍👦 Posterity means future descendants

📜 Not just an answer for this generation

♾️ A permanent addition to the Law

📖 Future Israelites are already covered

## 💀 Unclean By Reason Of A Dead Body

This restates the exact problem raised back in verses six and seven.

Corpse defilement is the same issue those men brought to Moses.

Naming it again confirms their case is now covered by real law.

An informal question just became an official, lasting rule.

💀 Restates the same problem from earlier

✅ Their case is now covered by law

📜 An informal question becomes official

📖 A lasting rule, not a one time answer

## 🚶 Or Be In A Journey Afar Off

A second excuse appears here that nobody had even asked about.

Being away on a long trip when Passover falls is a real problem too.

God expands the provision beyond the exact question that was raised.

He covers a related problem before anyone has to ask about it separately.

🚶 A second valid reason, unasked

➕ God expands the provision himself

🧭 Covers a problem before it is raised

📖 Two distinct reasons someone might miss the date

## ✅ Yet He Shall Keep The Passover Unto The LORD

This is the heart of the whole provision.

Missing the regular date for a valid reason does not mean losing the year entirely.

There is a real, legitimate makeup chance built into the Law itself.

God provides for the honest, unavoidable gap, not only the ideal case.

✅ Missing the date does not mean losing it

🔁 A real makeup chance, built into the Law

🤲 God plans for honest, unavoidable gaps

📖 Grace built directly into the rule itself

## 📆 The Fourteenth Day Of The Second Month

The makeup date sits exactly one month after the regular Passover date.

Same day of the month, same evening timing as before.

Later Jewish tradition calls this exact provision Pesach Sheni, the Second Passover.

Some Jewish communities still observe it today.

📆 One month after the regular date

🕯️ Called Pesach Sheni in later tradition

🌍 Still observed by some communities today

📖 A second chance, not a shortcut

## 🌿 Eat It With Unleavened Bread And Bitter Herbs

Both elements repeat the original Passover meal from Exodus 12.

Unleavened bread has no yeast, so the dough never had time to rise.

That recalled how fast Israel had to leave Egypt.

Bitter herbs recalled the bitterness of their years as slaves there.

🍞 Unleavened bread means bread without yeast

🏃 It recalled the rushed departure from Egypt

🌿 Bitter herbs recalled years of slavery

📖 Even the makeup meal kept the same symbols

## 🦴 Nor Break Any Bone Of It

This detail repeats Exodus 12:46 almost word for word.

Nothing about the makeup Passover was allowed to be a shortened version.

Centuries later, John 19:36 points back to this exact rule.

It connects the unbroken Passover lamb to Jesus, whose bones were not broken at the cross.

🦴 Repeats Exodus 12:46's rule exactly

🚫 No shortcuts allowed for the makeup meal

✝️ John 19:36 later connects this to Jesus

📖 A small ritual detail carrying forward

## 📋 According To All The Ordinances Of The Passover

Ordinances simply means laws or established rules.

This closing line makes sure nobody assumes the makeup date is a lighter version.

Every single requirement of the regular Passover still applies in full.

It just happens one month later than usual.

📋 Ordinances means established laws

🚫 Not a lighter or easier version

✅ Every requirement still applies in full

📖 Only the date moved, not the standard

## ⚠️ Forbeareth To Keep The Passover

Forbeareth is an old word for refuses or holds back on purpose.

This describes a completely different person than the men in verses six through eight.

Those men wanted to obey and had a real, unavoidable excuse.

This person has no valid excuse at all and simply chooses not to take part.

⚠️ Forbeareth means refuses on purpose

🙅 A very different case than before

🙏 Those men wanted to obey

📖 This one simply chooses not to

## ✂️ That Soul Shall Be Cut Off From Among His People

Cut off is a severe covenant idiom.

It means being removed from the community and its promises.

That could happen through death, exile, or God's own direct judgment.

Scholars debate the exact mechanism, but everyone agrees on the severity.

This penalty only applies to willful refusal, never to an honest excuse.

✂️ Cut off means total severance

⚖️ The exact mechanism is debated

😔 A serious, permanent kind of loss

📖 Only for willful refusal, never honest excuse

## 🎒 That Man Shall Bear His Sin

Bear his sin is another set idiom in the Law.

It means the person carries full responsibility for the consequences.

Nobody else can be blamed for his choice.

This is the exact opposite outcome of the men in verses six through eight.

Those men brought their problem to God instead of ignoring it, and received a provision.

🎒 Bear his sin means full responsibility

🙅 No one else to share the blame

🔀 The opposite outcome of the honest men

📖 Bringing a problem to God changes the outcome

## 🌍 If A Stranger Shall Sojourn Among You

Sojourn means to live temporarily as a foreigner in someone else's land.

A sojourner is a long term resident, not a citizen by birth.

Stranger here refers to a non Israelite living within the camp.

Later in the Law it also covers someone living within the land itself.

🌍 Sojourn means living as a resident foreigner

🧭 Stranger means a non Israelite in the camp

🏕️ A resident, not a citizen by birth

📖 The Law still made room for outsiders

## 🤝 Ye Shall Have One Ordinance

This is a genuinely striking piece of ancient law.

The exact same rule applies no matter someone's ethnic background.

A foreign resident who wanted to keep Passover met the same standard as a native born Israelite.

There was no separate, lesser track for outsiders.

🤝 One law for foreigner and native alike

⚖️ No separate or lesser track

🌍 Equal treatment written directly into the Law

📖 Striking fairness for its ancient time

# Numbers 9:15-19
# ☁️ The Cloud Covers The Tabernacle
---
## 🏗️ On The Day That The Tabernacle Was Reared Up

Reared up means erected, set up for the first time.

This points back to Exodus 40, when Moses finished assembling the tabernacle.

Exodus 40:17 dates that day to the first day of this same first month.

That means the tabernacle went up just two weeks before this chapter's Passover.

🏗️ Reared up means erected or built

📆 Points back to Exodus 40's assembly

🗓️ Two weeks before this chapter's Passover

📖 The timeline connects both events together

## 📜 The Tent Of The Testimony

This is another name for the tabernacle.

It highlights what the tabernacle held at its center.

The stone tablets of the Ten Commandments sat inside the ark there.

Calling it the testimony ties the whole structure back to the covenant given at Sinai.

📜 An alternate name for the tabernacle

🪨 Named for the stone tablets inside it

🤝 Ties the tent back to the covenant

📖 A tent that witnesses to the Law

## 🌥️ The Cloud Covered The Tabernacle

This same cloud already appeared back in Exodus 40:34 and 35.

It was so thick with God's presence that even Moses could not enter then.

Here in Numbers the focus shifts to how the cloud worked every single day.

It moves from one dramatic moment to an ongoing, daily pattern.

🌥️ The same cloud from Exodus 40

🚪 So thick even Moses could not enter

📆 Now shown as a daily pattern

📖 One presence, described two different ways

## 🔥 As It Were The Appearance Of Fire

At night the same visible sign changed its appearance.

By day it looked like a cloud.

By night it looked like fire.

The fire also gave the whole camp real light after dark.

🔥 Fire appeared at night instead of cloud

💡 It gave practical light in the dark

🌓 Two forms, one continuous presence

📖 God's presence never actually left

## 🔁 So It Was Alway

This was not a one time spectacle on the tabernacle's opening day.

It became the constant pattern for the whole wilderness journey.

That journey would eventually stretch on for forty years.

🔁 Not a one time event

⏳ The pattern lasted forty years

🛡️ Reliable, not a rare miracle

📖 Constant presence for the whole journey

## 🚩 When The Cloud Was Taken Up From The Tabernacle

The cloud lifting off the tabernacle worked as literal marching orders.

There was no separate announcement.

No council meeting decided it was time to move.

The visible sign itself was the command.

🚩 The lifting cloud was the signal

📢 No separate announcement was needed

⏰ The sign itself gave the order

📖 God controlled the schedule directly

## ⛺ There The Children Of Israel Pitched Their Tents

Abode means stayed or rested in one place.

It is the same root word used elsewhere for God dwelling among his people.

Israel's campsite for the night was not chosen by scouting good ground or water.

It was wherever the cloud itself came to rest.

🛌 Abode means stayed or rested

🤝 The same word describes God dwelling with people

🗺️ Campsites were not chosen by scouting

📖 The cloud alone decided where to stop

## 📢 At The Commandment Of The LORD

This phrase repeats constantly through the rest of the passage.

That repetition is deliberate.

The cloud's movement was never weather or coincidence.

It was God speaking through a visible sign instead of words.

📢 Repeated deliberately through this passage

🌤️ The cloud's movement was not random

🗣️ A visible sign instead of spoken words

📖 Repetition here underlines the point

## ⏳ When The Cloud Tarried Long Upon The Tabernacle

Tarried means lingered or stayed put for a long while.

Kept the charge means they held their assigned post faithfully.

Obeying a command to move is not the hardest part here.

Staying obediently still, with no idea how long the wait will last, is.

⏳ Tarried means lingered in place

🛑 Kept the charge means faithful waiting

😤 Waiting is its own kind of obedience

📖 No timeline given, yet they stayed faithful

# Numbers 9:20-23
# ⏱️ Two Days, Or A Month, Or A Year
---
## 🔢 Whether It Were Two Days, Or A Month, Or A Year

The range given here is deliberately wide.

It runs from a couple of days all the way to twelve full months.

The point is unmistakable, Israel had zero ability to predict how long they would stay anywhere.

Every bit of scheduling power belonged to God alone.

🔢 A deliberately wide range of time

📅 No way to predict their own schedule

🎲 Zero control over how long they stayed

📖 All scheduling power belonged to God

## 🏕️ The Children Of Israel Abode In Their Tents, And Journeyed Not

This restates the waiting scenario from earlier in the chapter.

Now it is stretched to its most extreme case.

A cloud might not move for an entire year.

Living that long without knowing when to expect movement tested real patience.

🏕️ The same waiting, now at its most extreme

📆 A cloud that might stay a full year

😤 Real patience tested over time

📖 Extended waiting is still active trust

## ⚡ When It Was Taken Up, They Journeyed

The moment the cloud lifted, the response had to be immediate.

It made no difference whether the wait had been two days or a year.

There was no lingering to finish other business first.

No delay was allowed just for convenience.

⚡ The response had to be immediate

⏱️ Two days or a year made no difference

🚫 No lingering for other business

📖 Instant obedience, every single time

## 🌙 Whether It Was By Day Or By Night

Even a night departure did not earn a delay until morning.

That meant packing an entire camp of families, animals, and the tabernacle itself in the dark.

Full readiness was expected at any hour.

Not just the convenient daylight ones.

🌙 Night departures still required instant obedience

🌃 Packing a whole camp in darkness

⏰ Full readiness at any hour

📖 Convenience was never part of the deal

## 📢 At The Commandment Of The LORD They Rested

The chapter repeats this phrase one final time here.

It closes the passage the same way it built it, through repetition.

By this point the reader has heard the phrase enough times to not miss it.

Nothing in this whole passage was left to chance.

📢 The closing repetition of the same phrase

🔁 Built and closed through repetition

🎯 The point could not be missed by now

📖 Nothing here was left to chance

## ✋ By The Hand Of Moses

The cloud communicated visibly and directly, without spoken words.

Moses still functioned as the leader who translated that sign into real orders.

The sign came from God.

The actual logistics of moving hundreds of thousands of people still ran through Moses.

✋ Moses translated the sign into orders

🗣️ The sign itself came from God

🚶 Logistics for the whole camp ran through him

📖 Divine guidance still needed human leadership
`.trim();

export const NUMBERS_NINE_PERSONAL_SECTIONS = parseNumbersNineRawNotes(NUMBERS_NINE_RAW_NOTES);
