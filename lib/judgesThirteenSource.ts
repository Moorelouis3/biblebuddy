export type JudgesThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesThirteenRawNotes(rawText: string): JudgesThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 13:${startVerse}` : `Judges 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Judges 13 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_THIRTEEN_RAW_NOTES = `# Judges 13:1-3
# 😔 Bondage And A Promise
---
## 😔 Did Evil Again In The Sight Of The LORD

"Again" means this is not the first time this has happened.

Judges tells the same four part cycle over and over.

Israel turns from God.

God lets an enemy rule over them.

They cry out, and God sends a rescuer.

This time the cycle starts with the Philistines.

🔁 Again signals a repeating pattern

😔 Israel turns from God

⚔️ An enemy is allowed to rule

📖 The cycle repeats with the Philistines

## ⛓️ Delivered Them Into The Hand Of The Philistines Forty Years

"Delivered into the hand" means God handed them over to another nation's power.

The Philistines lived along the coast west of Israel.

They fought with iron weapons.

Forty years is the longest oppression in the whole book of Judges.

No other enemy in Judges rules Israel this long.

⛓️ Delivered into the hand means handed over

🌊 Philistines lived on the coast

⚔️ They fought with iron weapons

📖 Forty years is the longest oppression recorded

## 🧬 Of The Family Of The Danites

The Danites were the tribe descended from Dan, one of Jacob's twelve sons.

Their territory sat on the western edge of Israel, closest to Philistine land.

Zorah was a small town right on that border.

A story about Philistine oppression fittingly begins in the tribe nearest to them.

🧬 Danites descended from Jacob's son Dan

🗺️ Their land bordered Philistine territory

🏘️ Zorah sat right on that line

📖 The nearest tribe feels the oppression first

## 😢 His Wife Was Barren, And Bare Not

Barren means she could not have children.

The Bible repeats this detail with several important mothers.

Sarah, Rebekah, Rachel, and Hannah all struggled with this same pain.

Every one of their sons ends up serving a special purpose for God.

A promised child often carries a larger calling.

😢 Barren means unable to have children

👩 Sarah, Rachel, and Hannah shared this pain

👶 Their sons all served a special purpose

📖 A promised child often carries a calling

## 👼 The Angel Of The LORD Appeared Unto The Woman

The angel of the LORD is a special messenger who appears throughout the Old Testament.

Sometimes this figure speaks as if he is God Himself.

The same title appears earlier with Gideon in Judges six.

This chapter never gives the woman a name.

Her wisdom and faith carry the whole story instead.

👼 Angel of the LORD is a divine messenger

🗣️ He sometimes speaks as God Himself

🔁 The same title appears with Gideon

📖 The unnamed woman carries the story

## 🤰 Thou Shalt Conceive, And Bear A Son

God gives this promise directly, with no doubt or delay attached.

Sarah laughed when she heard a similar promise in Genesis.

This woman receives hers without hesitation or argument.

The son is promised before Manoah even hears the news.

God's plan for Samson begins before either parent knows his name.

🤰 The promise comes with no delay

😂 Sarah once laughed at a similar promise

🙏 This woman receives hers without doubt

📖 Samson's story begins before he is named
---
# Judges 13:4-5
# 🚫 The Nazarite Instructions
---
## 🍷 Drink Not Wine Nor Strong Drink

Wine comes from grapes.

Strong drink refers to other fermented beverages, like beer made from grain.

This command is not for the future baby alone.

The mother must avoid both while she carries him.

The vow begins in the womb, before he takes a single breath.

🍷 Wine comes from grapes

🍺 Strong drink means other fermented drinks

🤰 The mother must avoid both too

📖 The vow starts before he is born

## 🐷 Eat Not Any Unclean Thing

Unclean does not mean dirty in the ordinary sense.

It refers to animals God marked as forbidden food for Israel.

Leviticus eleven lists which creatures count as clean or unclean.

Pigs, shellfish, and several birds fall on the forbidden list.

The mother keeps this rule too, for the sake of her son.

🐷 Unclean means forbidden as food

📜 Leviticus lists which animals qualify

🚫 Pigs and shellfish are examples

📖 The mother follows this rule for him

## ✂️ No Razor Shall Come On His Head

Uncut hair was the outward sign of a Nazarite vow.

A razor never touching his head means his hair grows his entire life.

Most Nazarites only kept this vow for a set season.

Samson keeps it every day he lives.

✂️ Uncut hair marked a Nazarite vow

📆 Most vows lasted only a season

📌 Samson's vow never ends

📖 His hair becomes a lifelong sign

## 🙏 A Nazarite Unto God From The Womb

A Nazarite was someone specially set apart to God.

Numbers six describes the normal vow, covering wine, hair, and touching the dead.

People usually chose this vow for themselves, for a limited time.

Samson never chooses it.

God assigns it to him before he is even born.

🙏 Nazarite means set apart to God

📜 Numbers six explains the normal vow

⏳ Most Nazarites chose a limited time

📖 Samson's vow is assigned, not chosen

## 🚦 He Shall Begin To Deliver Israel

Begin is an unusual word for this kind of promise.

Earlier judges are described as fully saving Israel from their enemies.

Samson only starts the process.

Philistine oppression continues well past his own lifetime.

Full deliverance from the Philistines does not come until King David.

🚦 Begin signals incomplete deliverance

⚔️ Earlier judges fully defeated their enemies

⏭️ Samson only starts the process

📖 Full victory waits until David's reign
---
# Judges 13:6-7
# 🗣️ She Tells Manoah
---
## 👤 A Man Of God Came Unto Me

The narrator already told us this was the angel of the LORD.

The woman herself only recognizes a man of God.

She does not yet know exactly who visited her.

Her understanding grows as the story continues.

👤 She calls him a man of God

📖 The narrator already named him the angel

❓ She does not know his full identity

➡️ Her understanding grows across the chapter

## 🙂 His Countenance Was Like The Countenance Of An Angel Of God, Very Terrible

Countenance means the look or expression on someone's face.

Terrible here does not mean evil.

It means awe inspiring, the kind of face that makes a person afraid.

She compares his appearance to what people expected an angel to look like.

🙂 Countenance means facial expression

😨 Terrible means awe inspiring here

👼 She compares him to an angel

📖 His appearance itself signaled something holy

## ❓ I Asked Him Not Whence He Was, Neither Told He Me His Name

Whence is an old word meaning from where.

She admits she never asked where he came from.

He never offered his name on his own either.

The mystery around his identity is left standing on purpose.

❓ Whence means from where

🤐 She never asked his origin

🙊 He never gave his name

📖 His identity stays a mystery for now

## 📆 To The Day Of His Death

This phrase adds something new to the promise.

The first announcement in verse five never said how long the vow would last.

Now the length is stated plainly.

Samson stays set apart to God for his entire life.

📆 This phrase adds new detail

⏳ Verse five never stated a length

🔒 Now the length is made plain

📖 Samson stays set apart his whole life
---
# Judges 13:8-9
# 🙏 A Second Visit
---
## 🙏 Manoah Intreated The LORD

Intreated is an old spelling of entreated.

It means he begged or pleaded earnestly.

Manoah does not doubt what he was told.

He simply wants more instruction for raising the child.

🙏 Intreated means pleaded earnestly

❓ Manoah wants more instruction

🚫 He does not doubt the promise

📖 A humble request, not disbelief

## 👂 God Hearkened To The Voice Of Manoah

Hearkened means God listened and responded.

The request is answered, but not the way Manoah expects.

The angel returns to the woman first, not to him.

God chooses who receives the message, not the one asking.

👂 Hearkened means listened and responded

🔁 The angel returns, but to her first

🙎 Manoah is not there for it

📖 God decides who receives the message

## 🌾 The Angel Of God Came Again Unto The Woman As She Sat In The Field

This is the second time she meets him alone.

The field was where she likely worked or rested during the day.

Manoah is left out again, even though he was the one who prayed.

The story keeps trusting her with the message first.

🌾 The field was her everyday setting

🔂 This is her second private meeting

🙎 Manoah misses it again

📖 She keeps receiving the message first
---
# Judges 13:10-11
# 🏃 Manoah Meets Him
---
## 🏃 The Woman Made Haste, And Ran

She does not walk, she runs.

Her urgency shows how much this second visit matters to her.

She wants Manoah to meet him before he leaves again.

Her quick action gives Manoah his only real chance to see the man himself.

🏃 She runs instead of walking

⏱️ Her urgency shows how much this matters

🎯 She wants Manoah to meet him

📖 Her speed gives Manoah his chance

## 🗣️ Art Thou The Man That Spakest Unto The Woman

Spakest is an old form of the word spoke.

Manoah wants to be certain this is the same visitor.

He does not simply trust his wife's word alone.

His careful question shows he takes this seriously, not lightly.

🗣️ Spakest is an old form of spoke

❓ Manoah wants to be certain

🔍 He checks it for himself

📖 Careful questions show he takes this seriously
---
# Judges 13:12-14
# 👶 Raising The Child
---
## 📋 How Shall We Order The Child

Order here is an old way of saying raise or guide.

Manoah wants practical instructions for parenting, not just a promise.

He asks about the child's future, not only his birth.

This question shows real responsibility, not just excitement.

📋 Order means raise or guide

👨 Manoah wants practical parenting instructions

🎯 He looks past the birth itself

📖 A responsible father asking ahead

## 🔁 Let Her Beware

The angel does not give Manoah new information.

He simply repeats what he already told the woman.

All the responsibility during pregnancy rests on her, not him.

Manoah cannot take on this part of the vow himself.

🔁 The angel repeats, not adds

👩 Responsibility rests on the mother

🚫 Manoah cannot carry this part

📖 Some callings only one parent can carry

## 🍇 Any Thing That Cometh Of The Vine

The vine means the grapevine.

This includes grapes, raisins, and grape juice, not only wine.

Numbers six lists this same wide restriction for every Nazarite.

The rule is broader than just avoiding alcohol.

🍇 Vine means the grapevine

🧺 Grapes and raisins count too

📜 Numbers six lists the same rule

📖 The restriction is wider than wine alone
---
# Judges 13:15-18
# 🐐 The Secret Name
---
## ⏳ Let Us Detain Thee, Until We Shall Have Made Ready A Kid

Detain means to keep someone a little longer.

A kid is a young goat, a common meal for an honored guest.

Offering food to a visitor was standard hospitality in this culture.

Manoah still believes he is talking to an ordinary traveler.

⏳ Detain means keep him longer

🐐 A kid is a young goat

🍽️ Feeding guests was standard hospitality

📖 Manoah still thinks he is human

## 🚫 I Will Not Eat Of Thy Bread

This is not a rejection of hospitality.

The angel redirects the gift toward God instead of himself.

A burnt offering is a sacrifice fully given to the LORD, not eaten by anyone.

The visitor is quietly revealing he is not a guest to be fed.

🚫 Not a rejection of kindness

🔥 A burnt offering belongs to God alone

🙅 No part of it gets eaten

📖 A hint that he is no ordinary guest

## 🎭 For Manoah Knew Not That He Was An Angel Of The LORD

The narrator steps in to tell the reader something Manoah does not know yet.

This kind of aside builds suspense for what happens next.

The reader understands the moment before Manoah does.

His confusion is about to end all at once.

🎭 The narrator reveals what Manoah cannot see

😯 The reader knows before Manoah does

⏳ His confusion is about to end

➡️ The next verses answer his question

## ❓ What Is Thy Name

Manoah is not just curious.

Knowing a name let people properly credit and honor whoever helped them.

He wants to make sure God gets the right recognition later.

His question reveals real respect, not idle curiosity.

❓ Manoah asks for more than curiosity

🏅 Names let people give proper honor

🙏 He wants credit to land rightly

📖 Respect drives the question

## 🤫 Why Askest Thou Thus After My Name, Seeing It Is Secret

Secret here comes from a Hebrew word that can also mean wonderful.

Isaiah nine uses the same root for the coming Messiah, called Wonderful.

The angel is not simply refusing to answer.

He is hinting that his identity is too great for Manoah to grasp.

🤫 Secret can also mean wonderful

📜 Isaiah nine uses the same word

🚫 This is not a plain refusal

📖 His identity is too great to explain
---
# Judges 13:19-21
# 🔥 Ascending In The Flame
---
## 🥩 A Kid With A Meat Offering

Meat offering sounds like meat in modern English.

In this old language, it actually means a grain offering.

Manoah brings both an animal sacrifice and a grain gift together.

Both offerings go to God, exactly as the angel instructed.

🥩 Meat offering sounds like meat today

🌾 It actually means a grain offering

🐐 Manoah brings both kinds of gifts

📖 Both go to God as instructed

## 🪨 Offered It Upon A Rock Unto The LORD

The rock works as a simple, makeshift altar.

Gideon made a nearly identical offering earlier in Judges six.

Both scenes involve a rock, a messenger, and fire from the LORD.

The pattern told the ancient reader something dramatic was about to happen.

🪨 The rock works as an altar

🔁 Gideon's story used the same pattern

🔥 Both scenes end in supernatural fire

📖 Familiar patterns signal something dramatic

## ✨ The Angel Did Wonderously

Wonderously is an old spelling of wonderfully.

This word shares the same root as the name the angel just refused to give.

His actions now show the very thing his name could not say in words.

The miracle becomes its own kind of answer.

✨ Wonderously means in a wonderful way

🔗 It echoes the secret name from before

🎇 His actions answer where words did not

📖 The miracle speaks for itself

## 🔥 The Angel Of The LORD Ascended In The Flame Of The Altar

The visitor does not simply walk away.

He rises upward inside the very fire of the sacrifice.

This is the clearest possible proof he was never an ordinary man.

No human traveler could leave a scene this way.

🔥 He rises inside the sacrificial fire

🚫 No ordinary traveler leaves this way

✅ This is undeniable proof of who he was

📖 The mystery finally resolves itself

## 🙇 Fell On Their Faces To The Ground

Falling face down was a posture of worship and fear together.

People used this position when they realized they stood before God.

Manoah and his wife react the same way, together, in this moment.

Their next words show exactly what kind of fear filled them.

🙇 Falling face down showed worship and fear

👥 God's holy presence caused this reaction

🤝 Manoah and his wife react together

➡️ Their next words reveal real terror

## 🐢 Then Manoah Knew That He Was An Angel Of The LORD

Manoah is always the slower one to understand in this story.

The narrator already told the reader this fact back in verse six.

His wife likely suspected it even earlier than he did.

Manoah finally catches up to what everyone else already knew.

🐢 Manoah is slow to understand throughout

📖 The narrator told readers this already

👩 His wife likely suspected it first

➡️ He finally catches up to the truth
---
# Judges 13:22-23
# 😨 We Shall Surely Die
---
## 😨 We Shall Surely Die, Because We Have Seen God

This fear comes from a real belief held across the Old Testament.

No sinful human could look directly at God and survive it.

Moses heard this same warning back in Exodus thirty three.

Manoah assumes their story is about to end badly.

😨 An old belief shapes this fear

🚫 No sinful human could see God and live

📜 Moses heard the same warning in Exodus

📖 Manoah expects the worst

## 🧠 If The LORD Were Pleased To Kill Us

The wife answers with clear reasoning.

A God who wanted them dead would not have accepted their offering first.

He would not have shown them all these things either.

Every gift they just received points toward blessing.

🧠 She answers fear with reasoning

✅ God accepted their offering first

🎁 He revealed things a killer would not

📖 Every sign points toward blessing
---
# Judges 13:24-25
# 👶 Samson Is Born
---
## ☀️ Called His Name Samson

Samson likely comes from the Hebrew word for sun.

A name built on light and strength fits a man remembered for both.

The mother names him, even though Manoah was so involved earlier.

Naming rights in this culture usually belonged to the father.

☀️ Samson likely means sun

💪 A fitting name for his strength

👩 The mother names him herself

📖 An unusual honor in this culture

## 👶 The Child Grew, And The LORD Blessed Him

Samson has an ordinary childhood before anything dramatic happens.

The text does not rush from birth straight to heroics.

Blessing here means steady growth under God's favor.

Even a chosen life still includes years of simply growing up.

👶 Samson grows up like any child

⏳ The story does not rush ahead

🌱 Blessing shows in steady growth

📖 Even the chosen still grow up slowly

## 🌀 The Spirit Of The LORD Began To Move Him

Move here is a rare word, closer to stirring or pounding, like a heartbeat starting.

This is the first sign the Spirit is at work in him.

Nothing dramatic happens yet, just an early stirring.

His famous feats of strength are still ahead of him.

🌀 Move suggests an early stirring

🕊️ The Spirit begins working in him

⏳ Nothing dramatic happens yet

📖 His famous feats are still ahead

## 🏘️ Between Zorah And Eshtaol

Zorah already appeared back in verse two as Manoah's hometown.

Eshtaol was a neighboring town close by.

Both towns sat in the same border region near the Philistines.

Samson's whole story begins and ends in this same small stretch of land.

🏘️ Zorah already appeared in verse two

📍 Eshtaol sat nearby

🗺️ Both towns bordered Philistine territory

📖 Samson's story stays rooted in this land
`.trim();

export const JUDGES_THIRTEEN_PERSONAL_SECTIONS = parseJudgesThirteenRawNotes(JUDGES_THIRTEEN_RAW_NOTES);
