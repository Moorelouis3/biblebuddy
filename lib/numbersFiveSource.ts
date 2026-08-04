export type NumbersFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersFiveRawNotes(rawText: string): NumbersFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 5:${startVerse}` : `Numbers 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Numbers 5 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_FIVE_RAW_NOTES = `# Numbers 5:1-4
# 🏕️ Keeping The Camp Clean
---
## 🩹 Every Leper

"Leper" means someone with a skin disease that made them ceremonially unclean.

Leviticus already spelled out which skin conditions counted, back in chapters thirteen and fourteen.

A priest had to examine the person and confirm it.

No one could declare themselves unclean on a guess.

🩹 Leper means a skin disease, not one illness

🔍 A priest confirmed the diagnosis, not a guess

📖 Leviticus thirteen and fourteen defined the list

➡️ Diagnosis never rested on self judgment

## 💧 Every One That Hath An Issue

"Issue" means an ongoing bodily discharge that would not stop on its own.

Leviticus fifteen lays out exactly what counted and how long it lasted.

The person stayed unclean only until the discharge actually stopped.

This was a physical condition, not a punishment for sin.

💧 Issue means an ongoing bodily discharge

⏳ Uncleanness lasted only as long as it did

📖 Leviticus fifteen spells out the full rule

➡️ A physical condition, not a moral verdict

## ☠️ Whosoever Is Defiled By The Dead

Touching a dead body made a person unclean under this law.

Numbers nineteen will spell out the full rule for this later in the book.

Everyone eventually faced this, since every family eventually buries someone.

This was never about singling out a few unlucky people.

☠️ Touching a corpse caused uncleanness

📖 Numbers nineteen gives the full rule later

👪 Every family eventually faced this same law

➡️ Nobody here was singled out

## 🚻 Both Male And Female Shall Ye Put Out

This law names both men and women, with no exception either way.

Numbers one counted only men old enough for war.

This purity law drew no line by sex at all.

Everyone in the camp lived under the exact same standard.

🚻 The law names men and women equally

🔢 Numbers one counted only men fit for war

⚖️ Purity law drew no line by sex

➡️ One standard covered the whole camp

## 🏕️ Without The Camp

"Without" is an old word for outside, not "lacking."

Numbers two already laid out the camp in careful rings.

The tabernacle sat at the center, with the tribes camped around it.

Being sent "without the camp" meant leaving that entire arrangement.

🏕️ Without means outside, not lacking

📖 Numbers two already laid out the camp

🎯 The tabernacle sat at the very center

➡️ Leaving meant leaving the whole arrangement

## 🕊️ That They Defile Not Their Camps, In The Midst Whereof I Dwell

God names the real reason for this law right here.

The tabernacle sat in the physical center of the camp.

God Himself lived there, among His own people.

This law protected a space where God actually lived.

🕊️ God names the real reason Himself

📍 The tabernacle sat at the camp's center

❤️ God lived there, among His people

➡️ The law protected God's own dwelling place

## ✅ And The Children Of Israel Did So

Israel obeys immediately, with no argument recorded.

This same fast obedience pattern shows up closing out other chapters in this book.

A command is given, and it gets carried out right away.

This short line sets the tone before the next law even starts.

✅ Israel obeyed immediately, without argument

🔁 This same fast obedience pattern repeats later

📋 Command given, then carried out at once

➡️ This sets the tone for what follows

# Numbers 5:5-10
# ⚖️ When Trust Is Broken
---
## ⚖️ A Sin That Men Commit, To Do A Trespass Against The Lord

This law covers everyday wrongs between people, like lying or stealing.

It calls every one of those wrongs a trespass against God, not only against the person harmed.

Hurting another person also breaks trust with the God who commanded honesty.

Leviticus six carries this same law in different words.

⚖️ Covers everyday wrongs like lying and stealing

🙏 Every wrong also trespasses against God

🤝 Hurting a person breaks trust with God too

📖 Leviticus six carries this same law

## 🎯 And That Person Be Guilty

Guilt here is a fact, not a feeling.

It becomes true the moment the wrong is done.

That holds even if nobody else ever finds out.

Everything else in this law builds on that starting point.

🎯 Guilt is a fact, not a feeling

⏱️ It becomes true the moment the wrong happens

🙈 True even if no one else finds out

➡️ Everything else in this law builds from here

## 🗣️ Then They Shall Confess Their Sin Which They Have Done

Confession has to come before any payment.

The guilty person has to name the actual wrong out loud.

A vague sense of guilt does not count here.

Words come before money in this whole process.

🗣️ Confession comes first, before payment

🎯 The specific wrong gets named out loud

🚫 A vague feeling of guilt is not enough

➡️ Words come before money in this process

## 💰 Recompense His Trespass With The Principal Thereof

"Principal" means the original amount that was taken or owed.

It is the base debt itself, before any penalty gets added.

Paying back the principal makes the wronged person whole again.

This is the starting payment, not the full one.

💰 Principal means the original amount owed

🔁 Paying it back restores what was lost

🧾 This is the base debt, before any penalty

➡️ A starting payment, not the full one

## ➕ And Add Unto It The Fifth Part Thereof

"Fifth part" means an extra one fifth of the original amount.

The guilty person pays this on top of the principal.

Leviticus uses this same fraction for similar cases.

Restitution alone was never treated as enough.

➕ Fifth part means an extra one fifth

📖 Leviticus repeats this same fraction elsewhere

💸 Paid on top of the original amount

➡️ Wrongdoing carried a real cost beyond repayment

## 🤝 Give It Unto Him Against Whom He Hath Trespassed

The payment goes straight to the person who was actually wronged.

It never went into a general fund for the community.

This law aimed at repairing one specific relationship.

Restitution here was personal, not abstract.

🤝 Payment goes directly to the person wronged

🚫 Not a fine paid into a general fund

❤️ Aimed at repairing one specific relationship

➡️ Restitution here was personal, not abstract

## 👪 But If The Man Have No Kinsman To Recompense The Trespass Unto

This covers a hard case, when the wronged person has already died.

Normally a close relative would step in to receive payment on their behalf.

Israelite family structure usually had someone ready for exactly this situation.

Sometimes, though, no relative was left at all.

👪 A hard case, the wronged person has died

🔁 Normally a relative received payment instead

🏛️ Family structure usually covered this gap

➡️ Sometimes no relative was left at all

## 🙏 Let The Trespass Be Recompensed Unto The Lord, Even To The Priest

Even with no person left to receive it, the debt still has to be paid.

The payment goes to God, delivered through the priest.

Wrongdoing never simply disappears because the victim is unreachable.

God stands in for the missing relative.

🙏 The debt still gets paid regardless

👤 It goes to God, through the priest

❌ Wrongdoing never simply disappears

➡️ God stands in for the missing relative

## 🐏 Beside The Ram Of The Atonement, Whereby An Atonement Shall Be Made For Him

This ram is a separate sacrifice, doing a separate job from the payment.

Paying back the debt repairs the relationship with the person wronged.

The sacrifice repairs the relationship with God that the sin damaged.

Two different wrongs get two different repairs.

🐏 A separate sacrifice, apart from the payment

🤝 Restitution repairs the human relationship

🙏 The sacrifice repairs the relationship with God

➡️ Two wrongs, two separate repairs

## 🎁 Every Offering Of All The Holy Things...Shall Be His

This shifts into a short note about priestly income.

Gifts and offerings that people bring to a priest become that priest's own.

Priests received no land inheritance like the other tribes did.

These gifts worked as their actual livelihood.

🎁 Offerings brought to a priest become his own

🏞️ Priests received no land inheritance

💼 These gifts functioned as their livelihood

📖 This theme returns later in this book

## ✨ And Every Man's Hallowed Things Shall Be His

This repeats the same rule from the verse just before it, plainly.

"Hallowed things" means anything a person formally set apart as holy.

Whatever a person gave the priest belonged to that priest afterward.

The rule is stated twice so nobody could claim confusion later.

🔁 Repeats the rule from the verse before it

✨ Hallowed things means anything set apart as holy

🎁 Given to the priest, kept by the priest

➡️ Stated twice so no one could claim confusion

# Numbers 5:11-15
# 😠 A Husband's Suspicion
---
## 🚶 If Any Man's Wife Go Aside, And Commit A Trespass Against Him

"Go aside" is an old way of saying she turned away from the marriage.

The same word "trespass" links this law to the one just before it.

Both laws treat a broken promise as a broken trust, not only a private matter.

This one specifically covers a wife's unfaithfulness.

🚶 Go aside is an old idiom for unfaithfulness

🔗 Trespass echoes the law just before this one

🤝 A broken trust, not only a private matter

➡️ This law addresses a wife's unfaithfulness specifically

## 📜 And A Man Lie With Her Carnally

This states plainly what the accusation actually is.

"Carnally" is an old word for a physical sexual act.

The law does not soften or hide what it means.

Everything that follows depends on whether this actually happened.

📜 States plainly what the accusation is

🔤 Carnally is an old word for sex

🚫 The law does not soften what it means

➡️ Everything that follows depends on this one fact

## 🤫 It Be Hid From The Eyes Of Her Husband, And Be Kept Close

This describes a secret affair, hidden from everyone else involved.

That detail explains why this unusual law exists at all.

Ordinary evidence is not available when only two people know the truth.

The law had to be built for exactly this kind of gap.

🤫 Describes a secret, hidden from everyone else

❓ Explains why this unusual law is needed

🔍 Ordinary evidence is not available here

➡️ Built for a real gap in proof

## 👀 There Be No Witness Against Her, Neither She Be Taken With The Manner

Israelite law normally needed more than one witness for a serious case.

"Taken with the manner" is an old phrase for caught in the act.

This verse rules out both of the usual ways to prove guilt.

Something else has to settle a case like this one.

👀 Two witnesses were normally required

🚨 Taken with the manner means caught outright

❌ Both usual ways to prove guilt fail here

➡️ Something else has to settle this case

## 😠 The Spirit Of Jealousy Come Upon Him, And He Be Jealous Of His Wife

This exact phrase gets repeated twice in a row in verse fourteen.

One time covers a wife who is actually guilty.

The other covers a wife who is not.

Suspicion itself triggers this whole process, whether accurate or mistaken.

😠 Repeated twice, once for guilt, once for innocence

⚖️ The law covers both situations the same way

🔁 The exact same phrase both times

➡️ Suspicion alone triggers this process

## 🌾 The Tenth Part Of An Ephah Of Barley Meal

An ephah was a dry measure, about enough grain to fill a large basket.

A tenth of one was a small, modest amount.

Barley was cheaper than the wheat flour used in most grain offerings.

This offering matched the uncomfortable situation it was tied to.

🌾 An ephah was a large dry measure

🔟 A tenth of one was a small amount

💰 Barley was cheaper than the usual wheat flour

➡️ A modest offering, matching an uncomfortable moment

## 🚫 He Shall Pour No Oil Upon It, Nor Put Frankincense Thereon

Normal grain offerings included oil, a sign of blessing.

They also included frankincense, a sweet smelling incense.

Both are left out of this one on purpose.

This offering was not meant to celebrate, only to raise a hard question.

🚫 Oil and frankincense are both left out

🕊️ Oil normally signaled a blessing

🔥 Frankincense normally added a sweet smell

➡️ This offering raised a question, not a celebration

## 📜 An Offering Of Jealousy, An Offering Of Memorial, Bringing Iniquity To Remembrance

"Memorial" here does not mean a happy remembrance.

It means this offering formally places the accusation on record before God.

The whole point was to name the suspicion out loud in a sacred setting.

It was never meant to ask for a blessing.

📜 Memorial means placing the matter on record

🎯 Its purpose was to name the suspicion

⚖️ A legal function, not a request for blessing

➡️ Spoken out loud, in a sacred setting

## 👉 Then Shall The Man Bring His Wife Unto The Priest

This single instruction takes the whole matter out of the husband's hands.

He cannot personally judge, punish, or divorce her over an unproven suspicion.

The case has to go through God, by way of the priest.

This protected the wife from harm based on accusation alone.

👉 Takes the matter out of the husband's hands

🚫 He cannot judge or punish her himself

🙏 The case goes through God and the priest

➡️ Protects the wife from harm on accusation alone

# Numbers 5:16-18
# 🏺 The Ritual Begins
---
## 📍 The Priest Shall Bring Her Near, And Set Her Before The Lord

"Before the LORD" means at the entrance of the tabernacle itself.

That was the sacred space where formal matters got brought straight to God.

This was never a quiet conversation between three people.

It was a formal proceeding, done in front of God.

📍 Before the LORD means at the tabernacle entrance

📋 A formal proceeding, not a private talk

🙏 Done directly in front of God

➡️ Not hidden behind closed doors

## 🏺 Holy Water In An Earthen Vessel

This "holy water" was almost certainly plain water from the priest's washing basin.

Exodus thirty describes that basin, used before priests served at the altar.

It was called holy because of where it came from, not a special formula.

"Earthen vessel" means a plain clay pot, not the usual gold or silver.

🏺 Likely ordinary water from the priests' washing basin

🍶 A plain clay pot, not gold or silver

🔑 Holy by its source, not a formula

📖 That basin is described back in Exodus thirty

## 🌫️ Of The Dust That Is In The Floor Of The Tabernacle

Plain dust, taken from the actual ground of the holy space, goes into the water.

Scripture often uses dust as a picture of humility and human smallness.

Stirring it into this water ties the ritual to the exact place they stood.

Nothing here came from outside the sacred space.

🌫️ Ordinary dust, from the holy ground itself

🔑 Dust often pictures humility in scripture

📍 Ties the ritual to the exact place

➡️ Nothing here came from outside

## 💇 Uncover The Woman's Head

A married woman's hair was normally kept covered, as a sign of modesty.

Uncovering it here, in public, was a visible sign of shame.

It marked her openly, in front of everyone present, as a woman under suspicion.

The ritual made her situation impossible to hide.

💇 Covered hair normally marked modesty and status

👁️ Uncovering it here was a public shaming

🎯 Marked her openly as a woman under suspicion

➡️ Her situation could not be hidden here

## ✋ Put The Offering Of Memorial In Her Hands

She personally holds the very offering that raises the accusation.

This forces her direct part in her own hearing.

She is not a silent bystander in this process.

She physically carries the thing that puts the matter on record.

✋ She physically holds the accusing offering

🎯 Forces her direct part in her own hearing

🚫 Not a silent bystander here

➡️ She carries what puts this on record

## ☠️ The Bitter Water That Causeth The Curse

This name describes what the water is about to become, not how it tastes now.

It only becomes a curse if she turns out to be guilty.

The name looks ahead to what might happen, not backward to a fixed property.

Everything about this ritual depends on that one condition.

☠️ Names what the water is about to become

⚖️ Only a curse if real guilt exists

🔮 Looks ahead, not backward

➡️ Everything hinges on that one condition

# Numbers 5:19-22
# 🗣️ The Oath And The Curse
---
## ⚖️ The Priest Shall Charge Her By An Oath

An oath here is a formal, binding self curse, not a casual promise.

Swearing this kind of oath before God counted as one of the most serious acts a person could make.

Everything said after this carries that same weight.

Nothing about the ritual stayed casual from this point on.

⚖️ An oath here is a binding self curse

🌍 Oaths like this were treated as deeply serious

🔑 Sets the weight for what follows

➡️ Nothing about this stayed casual

## 🕊️ If No Man Have Lain With Thee...Be Thou Free From This Bitter Water

The innocent outcome gets stated first, plainly.

If she told the truth, the water has no power over her at all.

This ritual was never built to threaten every woman brought to it.

Only a genuinely guilty woman had anything to fear.

🕊️ States the innocent outcome first

✅ A truthful woman faces no real power

🎯 Not built to threaten every woman

➡️ Only real guilt carried any danger

## 😠 If Thou Hast Gone Aside To Another, And If Thou Be Defiled

The guilty condition gets spelled out just as carefully as the innocent one before it.

Both outcomes are named in full, before the ceremony moves forward.

The law never hides what it is actually threatening.

Everyone present hears exactly what is at stake either way.

😠 The guilty condition, spelled out carefully

⚖️ Mirrors the innocent condition named just before

📋 Both outcomes named before the ritual continues

➡️ Everyone hears exactly what is at stake

## ⚠️ The Priest Shall Charge The Woman With An Oath Of Cursing

The language shifts here from a neutral oath to one specifically "of cursing."

This is the second half of the same oath.

It now spells out exactly what happens to her if she is guilty.

The ceremony is about to name real consequences out loud.

⚠️ A shift to specifically an oath of cursing

🔀 The second half of the same oath

📋 Now naming real consequences directly

➡️ Prepares for the exact curse formula next

## 👥 The Lord Make Thee A Curse And An Oath Among Thy People

This is a set curse formula, a known pattern in the ancient world.

Her name could become an actual byword, something people said when cursing someone else.

"May you end up like her" is the kind of phrase this points toward.

This was specific, known language, not a vague threat.

👥 A set formula, not a vague threat

🗣️ Her name could become an actual curse word

🌍 A known pattern across the ancient world

➡️ Specific language, aimed at a specific fear

## 🦵 Thy Thigh To Rot, And Thy Belly To Swell

Many scholars read "thigh" here as an old euphemism for the womb.

Genesis forty six uses similar language for descendants coming from someone's thigh.

Read that way, this judgment points toward infertility or a lost pregnancy.

It was not just any illness picked without meaning.

🦵 Thigh is widely read as an old euphemism

📖 Similar language appears in Genesis forty six

🤰 Likely points to infertility or a lost pregnancy

➡️ A specific judgment, not just any illness

## 🌊 This Water...Shall Go Into Thy Bowels

The text repeats that the water itself carries the judgment.

It is never the priest's opinion or the community's verdict doing the work.

Nothing about this outcome depends on a human decision.

It depends entirely on whether real guilt exists.

🌊 The water itself carries the judgment

🚫 Not the priest's opinion or a human verdict

🎯 Nothing here depends on a human decision

➡️ It depends entirely on real guilt

## 🙏 And The Woman Shall Say, Amen, Amen

"Amen" is an old word meaning "so be it" or "truly."

She says it twice here, for emphasis.

She is not a silent, forced participant in this ritual.

She personally and verbally agrees to the entire oath.

🙏 Amen means so be it or truly

🔁 Said twice here, for emphasis

🗣️ She personally agrees to the whole oath

➡️ Not a silent or forced participant

# Numbers 5:23-28
# 🥤 Drinking The Water
---
## 📖 The Priest Shall Write These Curses In A Book, And He Shall Blot Them Out With The Bitter Water

The curse words get physically written down in ink first.

Then they get washed off the page, straight into the water she is about to drink.

The written curse becomes a literal part of what she consumes.

This made the oath something physical, not only something spoken aloud.

📖 The curse is written down first, in ink

🥤 Washed off the page into the water

🌊 A literal part of what she drinks

➡️ Made the oath physical, not only spoken

## 🥤 The Priest Shall Cause The Woman To Drink The Bitter Water

Drinking the water gets mentioned twice in this short passage.

Hebrew narration often states the main outcome first, then circles back for detail.

That pattern shows up exactly here, across these verses.

The second mention walks through the fuller order of events.

🥤 Drinking is mentioned twice in this passage

🔁 The outcome named first, then retold in detail

📖 A common pattern in Hebrew narration

➡️ The second mention fills in the full order

## 🌊 Shall Enter Into Her, And Become Bitter

This phrase repeats an important point about how the ritual actually worked.

The bitterness only becomes real once the water is inside her.

That only happens if she is actually guilty.

Many ancient trial rituals used substances dangerous to anyone who drank them.

🌊 Bitterness becomes real only once inside her

⚖️ Only happens if she is actually guilty

🌍 Other ancient ordeals often harmed anyone who drank

➡️ Her innocence was never at risk here

## 🙌 The Priest Shall Take The Jealousy Offering...And Wave The Offering Before The Lord

"Wave offering" names a specific ritual motion.

The priest physically presents the food to God as a symbolic gesture.

This step shows up across many different Israelite offerings.

Nothing about this motion was invented just for this one case.

🙌 A specific motion, presenting food to God

🔁 A standard step across many offerings

📖 Not invented specifically for this case

➡️ Even here, the normal steps still apply

## 🔥 Burn It Upon The Altar

A handful of the barley meal gets burned as a normal grain offering.

This follows the same basic steps as any other grain offering in Israel's worship.

Even in this uncomfortable situation, the ordinary rules still applied.

The ritual never skipped its normal structure, no matter how tense the moment.

🔥 A handful is burned, the standard rule

📋 Follows the same steps as any grain offering

⚖️ The ordinary rules still applied here

➡️ Structure held, even under real tension

## ⏱️ And Afterward Shall Cause The Woman To Drink The Water

This confirms the exact order of events in the ceremony.

The offering gets burned first, and only afterward does she drink.

Nothing about this sequence was improvised on the spot.

It matches exactly the fuller order promised a few verses earlier.

⏱️ Confirms the exact order of events

🔥 Offering burned first, then the drink

📋 Nothing here was improvised

➡️ Matches the order promised earlier

## 🤰 Her Belly Shall Swell, And Her Thigh Shall Rot

This is the exact consequence named back in the oath itself.

Now it plays out for a woman who is actually guilty.

The text stays fully consistent between the promise and the outcome.

Nothing here happens beyond what the oath already described.

🤰 The exact consequence named in the earlier oath

✅ Shown here actually playing out

🔗 Consistent between promise and outcome

➡️ Nothing happens beyond what guilt required

## 👥 The Woman Shall Be A Curse Among Her People

This consequence reaches past the physical and into her whole community.

Her name becomes exactly what the earlier curse formula predicted.

People could use her story as a warning to others.

The social cost here mattered as much as the physical one.

👥 A public, social consequence too

🔗 Fulfills the curse formula named earlier

🗣️ Her story becomes a warning to others

➡️ Social cost mattered as much as physical cost

## ✅ If The Woman Be Not Defiled, But Be Clean

The innocent outcome gets stated here just as plainly as the guilty one was.

This law never lingers only on guilt.

It gives equal weight to what happens when suspicion turns out false.

That balance runs through the entire ritual.

✅ The innocent outcome, stated just as plainly

⚖️ Equal weight given to both outcomes

🎯 The law never lingers only on guilt

➡️ Balance runs through this whole ritual

## 🕊️ Then She Shall Be Free

"Free" here means more than simply unharmed.

It means formally cleared, with the matter officially closed.

She carries no ongoing legal cloud from the accusation.

The suspicion ends completely, on the record, not quietly.

🕊️ Free means formally cleared, not just unharmed

📋 The matter is officially closed

🚫 No ongoing legal cloud remains

➡️ Cleared on the record, not quietly dropped

## 🌱 And Shall Conceive Seed

This promise goes further than simply saying nothing bad happens.

An innocent woman receives an active blessing of future children.

That is a genuinely positive outcome, not only the absence of harm.

The law names something good specifically for her.

🌱 More than no harm, an active blessing

👶 A promise of future children

➕ A positive outcome, not just an absence

➡️ Named specifically as good for her

# Numbers 5:29-31
# 📜 The Law Of Jealousies
---
## 📜 This Is The Law Of Jealousies

This closing line names and sums up the entire ritual just described.

This book repeats this pattern, a short closing line naming a law it just gave.

The same structure returns in chapter six, for the law of the Nazarite.

A short label like this marks where one topic ends.

📜 A closing line naming the whole ritual

🔁 The same pattern returns in chapter six

📋 A structural marker, closing one topic

➡️ Signals where this subject ends

## 😠 When A Wife Goeth Aside To Another Instead Of Her Husband, And Is Defiled

The guilty scenario gets restated here one final time.

This time it stands as the formal legal definition of the law.

Every earlier detail in the chapter points back to this one line.

The chapter closes by naming exactly what it was always about.

😠 The guilty scenario, restated one final time

📋 Now stated as a formal legal definition

🔗 Every earlier detail points back here

➡️ Names exactly what the chapter covered

## 🌫️ Or When The Spirit Of Jealousy Cometh Upon Him

This restates that the law applies to unfounded suspicion too, not only real guilt.

The chapter makes sure this point does not get lost at the end.

The ritual existed for a jealous husband's use in either case.

Both possibilities stayed covered, all the way through.

🌫️ Confirms the law covers unfounded suspicion too

🎯 Not only cases of proven guilt

⚖️ Made available for either situation

➡️ Both possibilities stayed covered throughout

## 🙏 The Priest Shall Execute Upon Her All This Law

This is one more reminder of where the authority to judge actually sits.

That authority belongs to the priest, acting before God.

It never belonged to the husband acting alone.

The chapter closes on the same point it kept making the whole way through.

🙏 Authority sits with the priest, before God

🚫 Never with the husband acting alone

🔁 The same point made throughout the chapter

➡️ Judgment never rested on one man's word

## ✅ Then Shall The Man Be Guiltless From Iniquity

The husband avoids guilt by bringing his suspicion through this exact process.

He does not take matters into his own hands.

This law protected him too, as long as he followed the process.

It covered violence or public shaming he might have chosen instead.

✅ The husband avoids guilt by using this process

🚫 He never acts on his own

🛡️ The law protected him too

➡️ Covered violence he might have chosen instead

## ⚖️ And This Woman Shall Bear Her Iniquity

This final line applies real consequence only to a woman who is genuinely guilty.

It is not a blanket statement about women in general.

The same condition that ran through the whole chapter shows up here too.

Real guilt, and nothing less, is what this line actually depends on.

⚖️ Applies only to a genuinely guilty woman

🚫 Not a blanket statement about women

🔗 The same condition ran through the chapter

➡️ Depends on real guilt, nothing less
`.trim();

export const NUMBERS_FIVE_PERSONAL_SECTIONS = parseNumbersFiveRawNotes(NUMBERS_FIVE_RAW_NOTES);
