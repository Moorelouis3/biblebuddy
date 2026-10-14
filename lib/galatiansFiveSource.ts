export type GalatiansFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGalatiansFiveRawNotes(rawText: string): GalatiansFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GalatiansFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Galatians\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Galatians 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Galatians\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Galatians\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Galatians 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Galatians 5:${startVerse}` : `Galatians 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Galatians 5 sections, received " + sections.length);
  }

  return sections;
}

const GALATIANS_FIVE_RAW_NOTES = `# Galatians 5:1-6
# ⛓️ Stand Fast In Liberty
---
## 🪖 Stand Fast Therefore In The Liberty

Stand fast means to hold a position and refuse to retreat.

Paul pictures the Galatians as an army under pressure to fall back into an old way of living.

Christ already won this freedom for them at a real cost.

Giving it up now would hand back ground that was already paid for.

🪖 Stand fast means hold your ground

💰 Christ already paid for this freedom

⬅️ Some pressure wants them to retreat

📖 Paul refuses to let that happen

## ⛓️ Entangled Again With The Yoke Of Bondage

A yoke is the heavy wooden bar fitted over an animal to force it into labor.

Bondage means slavery, a total loss of control over one's own life.

Paul is not describing a light inconvenience here.

He is warning against walking back into a form of slavery Christ already removed.

🐂 A yoke is a heavy wooden bar

⛓️ Bondage means slavery, total loss of control

⚠️ This is not a light inconvenience

➡️ Walking back means returning to slavery

## ✂️ If Ye Be Circumcised, Christ Shall Profit You Nothing

Circumcision was the sign God gave Abraham long before the law was given at Sinai.

False teachers were telling the Galatians they needed it to be right with God.

Adding that requirement makes Christ's finished work insufficient on its own.

A gift stops being a gift the moment it needs an added payment.

📜 Circumcision was Abraham's original covenant sign

⚠️ False teachers demanded it for salvation

🚫 This makes Christ's work insufficient alone

📖 A gift cannot need an added payment

## ⚖️ A Debtor To Do The Whole Law

A debtor owes something in full, with no partial payment accepted.

Paul warns that circumcision is not an isolated step a person can take alone.

Accepting it legally ties a person to keep every other command in the entire law.

Nobody can actually keep that whole law perfectly.

💳 A debtor owes the full amount

🔗 Circumcision ties you to the whole law

❌ Nobody keeps the whole law perfectly

📖 Partial law keeping was never an option

## 💔 Ye Are Fallen From Grace

This does not mean a believer loses salvation and becomes unsaved again.

It describes trying to be justified by keeping the law instead of trusting Christ.

That approach falls away from grace as the method for righteousness.

The person falls out of one way of relating to God, not out of God's family.

🙅 This does not mean losing salvation

⚖️ It means trusting law instead of Christ

🔄 That falls away from grace as the method

📖 The relationship with God remains intact

## ⏳ We Through The Spirit Wait For The Hope Of Righteousness By Faith

Waiting here does not mean passive, uncertain hoping.

It means a confident, settled expectation already guaranteed by the Spirit.

Hope of righteousness points to full and final right standing not yet fully revealed.

Faith is the only ground this waiting stands on.

⏳ Waiting here is confident, not uncertain

🕊️ The Spirit guarantees the expectation

🎯 Full righteousness is still coming

📖 Faith alone is the ground for this

## ❤️ Faith Which Worketh By Love

Neither circumcision nor uncircumcision carries any weight with God at all.

What actually matters is faith that shows up as visible love in action.

Real faith was never meant to stay invisible or merely private.

Love is the evidence that faith is alive and working.

🤷 Circumcision carries no weight with God

❤️ What matters is faith acting in love

👁️ Real faith was never meant to be invisible

📖 Love proves that faith is alive

# Galatians 5:7-12
# 🏃 Ye Did Run Well
---
## 🏃 Ye Did Run Well

Paul pictures the Christian life as a race.

This is an image he uses often in his letters.

The Galatians started out strong, moving steadily toward the goal.

Something has since pulled them off course.

Paul names the good start before he names the problem.

🏃 Paul pictures life as a race

🚀 The Galatians started out strong

🛑 Something has slowed them down

📖 Paul names the good start first

## 🙋 Who Did Hinder You That Ye Should Not Obey The Truth

Hinder means to block or cut in on someone during a race.

Paul asks directly who cut in on their progress.

He does not let the blame stay vague or abstract.

Someone specific interrupted a race that was going well.

🚧 Hinder means to block or cut in

❓ Paul asks who caused the block

🎯 He refuses to leave blame vague

📖 Someone specific interrupted their progress

## 🙅 This Persuasion Cometh Not Of Him That Calleth You

Him that calleth refers to God, who called the Galatians to faith.

This new teaching did not come from that same source.

A message that pulls people away from grace cannot be traced back to God.

The real source of this pressure was something else entirely.

👆 Him that calleth refers to God

🚫 This new teaching is not from Him

🔍 God never sends messages away from grace

📖 This pressure came from another source

## 🍞 A Little Leaven Leaveneth The Whole Lump

Leaven is yeast, the ingredient that makes bread dough rise.

A tiny amount works through an entire batch of dough.

Paul uses it here as a warning about false teaching.

One small wrong idea can spread through and affect a whole church.

🍞 Leaven means yeast in bread dough

🔬 A tiny amount affects the whole batch

⚠️ Paul warns about false teaching here

📖 One wrong idea can spread through a church

## ⚖️ He That Troubleth You Shall Bear His Judgment

Paul still has confidence that the Galatians themselves will come back around.

But he draws a hard line for whoever is actually causing this confusion.

That person will personally answer for the damage being done.

Confidence in the church does not mean excusing the one stirring up trouble.

🙏 Paul still has confidence in them

⚖️ The troubler will personally answer for it

🚫 This is not excusing the real cause

📖 Stirring up trouble carries real consequences

## ✝️ Then Is The Offence Of The Cross Ceased

The offence of the cross is the scandal that salvation cannot be earned.

That truth insults anyone who wants credit for their own effort.

Adding circumcision back in would remove that scandal entirely.

It would turn an offensive gift back into an acceptable transaction.

✝️ The cross offends human effort

💳 Salvation cannot be earned at all

🔄 Circumcision would remove that offense

📖 A free gift would become a transaction

## ✂️ I Would They Were Even Cut Off Which Trouble You

This is one of Paul's sharpest and most startling lines in any letter.

Many scholars believe he is making a harsh play on the word circumcision itself.

If cutting the flesh matters so much to them, Paul suggests they go further.

The line shows how seriously Paul took this threat to the gospel.

😤 This is Paul's sharpest line here

🔪 Many scholars see a play on circumcision

⚠️ Paul pushes their own logic further

📖 This shows how serious the threat was

# Galatians 5:13-15
# 🤝 Called Unto Liberty
---
## 🔓 Ye Have Been Called Unto Liberty

Liberty here means freedom from trying to earn standing with God through the law.

This calling came from God Himself, not from the Galatians' own effort.

It was always meant to lead somewhere specific.

Freedom was never meant to be the final destination by itself.

🔓 Liberty means freedom from earning standing

📣 This calling came from God Himself

🎯 Freedom was meant to lead somewhere

📖 Freedom is not the final destination

## 🚫 Only Use Not Liberty For An Occasion To The Flesh

Paul immediately guards against a dangerous misreading of freedom.

Freedom was never meant to become permission to indulge sinful desires.

An occasion here means an opportunity or excuse.

Real freedom and selfish indulgence point in opposite directions.

⚠️ Freedom is not permission to sin

🚪 Occasion means an opportunity or excuse

↔️ Freedom and indulgence point opposite ways

📖 Paul guards freedom from this misreading

## ❤️ By Love Serve One Another

Free people still choose to serve, but now from love instead of obligation.

This is the real purpose behind the freedom Paul just described.

Serving here is voluntary, not forced by fear or law.

Love turns freedom outward instead of letting it turn inward.

🤲 Free people still choose to serve

🎯 This is freedom's real purpose

🔄 Service here is voluntary, not forced

📖 Love turns freedom toward others

## 📜 All The Law Is Fulfilled In One Word

Fulfilled here means completed or summed up in a single statement.

Paul is not throwing out the entire law as worthless.

He is naming the one command every other law ultimately serves.

Love is the thread running underneath all the rest.

📜 Fulfilled means summed up in one word

🚫 Paul is not throwing out the law

🧵 One command ties the rest together

📖 Love is the thread underneath it all

## 👨‍👩‍👧 Thou Shalt Love Thy Neighbour As Thyself

This command already existed in the law long before Paul ever quoted it.

It measures love for others against the love people already have for themselves.

Nobody needs convincing to look out for their own interests.

The law simply asks that same energy to be turned toward others.

📜 This command already existed in the law

🪞 It measures love against self love

💡 Nobody needs convincing to care for themselves

➡️ That same energy should turn toward others

## 🐾 If Ye Bite And Devour One Another

Bite and devour paints a picture of wild animals tearing at each other.

Paul chooses harsh, physical language on purpose here.

Arguments inside the church can turn that vicious without anyone noticing.

Freedom without love curdles quickly into infighting.

🐾 Bite and devour pictures wild animals

🎯 Paul chooses harsh language on purpose

🔥 Church conflict can turn this vicious

📖 Freedom without love curdles into infighting

## ⚠️ Take Heed That Ye Be Not Consumed One Of Another

Consumed means completely destroyed, like a fire burning through a building.

Paul is naming the real cost of ongoing infighting.

A divided church can genuinely destroy itself from the inside.

This warning closes the whole point about liberty's real purpose.

🔥 Consumed means completely destroyed, like fire

⚠️ Paul names the real cost here

🏚️ Infighting can destroy a church fully

📖 Liberty's purpose was never infighting

# Galatians 5:16-18
# ⚔️ Walk In The Spirit
---
## 🚶 Walk In The Spirit

Walk pictures a steady, step by step way of living, not a single decision.

This is something practiced moment by moment, not finished once.

Paul gives this as the practical answer to the warning he just gave.

Walking in the Spirit is how freedom avoids turning into infighting.

🚶 Walk means a steady way of living

🔁 This is practiced moment by moment

💡 Paul gives this as the real answer

📖 This is how freedom avoids infighting

## 🚫 Ye Shall Not Fulfil The Lust Of The Flesh

Lust of the flesh means more than just sexual desire alone.

It covers every sinful pull of human nature, in any direction.

Fulfil means to carry out or satisfy that pull completely.

Walking in the Spirit is what actually blocks that outcome.

🔥 Lust of the flesh is broader than sex

🧭 It covers every sinful pull of nature

🚫 Fulfil means carrying a desire out fully

📖 The Spirit blocks that outcome

## ⚔️ The Flesh Lusteth Against The Spirit

Flesh here means the old sinful nature still present in every believer.

Lusteth means to desire strongly, pulling hard in its own direction.

This is not a one time battle but an ongoing condition.

Every believer carries this exact tension inside them.

🧍 Flesh means the old sinful nature

💪 Lusteth means desiring strongly in a direction

🔄 This battle is ongoing, not one time

📖 Every believer carries this exact tension

## 🔀 These Are Contrary The One To The Other

Contrary means directly opposed, pulling in different directions.

Flesh and Spirit are not simply different, but true enemies.

This conflict is built into the Christian life, but it is not a sign of failure.

Feeling this pull actually shows the Spirit is present and active.

🔀 Contrary means directly opposed forces

⚔️ Flesh and Spirit are true enemies

✅ This conflict is normal, not failure

📖 Feeling it shows the Spirit is active

## 🔒 So That Ye Cannot Do The Things That Ye Would

This tension leaves a believer caught in the middle, pulled both ways at once.

The flesh wants one thing and the Spirit wants another.

Neither side simply wins by itself without a choice being made.

This struggle protects a believer from either extreme, license or legalism.

🥊 Believers are pulled in two directions

↔️ Flesh wants one thing, Spirit another

🙅 Neither side wins without a choice

📖 This struggle protects from both extremes

## 🆓 If Ye Be Led Of The Spirit, Ye Are Not Under The Law

Led here means actively guided, not just occasionally inspired.

A person following the Spirit's direction no longer needs the law as an outside rulebook.

This does not mean the law's moral standard disappears.

It means the Spirit now produces from the inside what the law could only demand from the outside.

🧭 Led means actively guided, not occasional

📜 The Spirit replaces the law as guide

✅ The law's standard still stands

➡️ The Spirit produces what law only demanded

# Galatians 5:19-21
# 🚫 The Works Of The Flesh
---
## 👁️ Now The Works Of The Flesh Are Manifest

Manifest means obvious, plain to see, impossible to hide for long.

Paul is about to list specific, visible patterns of behavior.

These are not secret, hidden sins known only to God.

Everyone around a person can usually see these patterns clearly.

👁️ Manifest means obvious, plain to see

📋 Paul lists specific, visible behaviors

🙈 These are not secret or hidden

📖 Others can usually see these patterns

## 💔 Adultery, Fornication, Uncleanness, Lasciviousness

This first group of words centers on sexual sin in several forms.

Adultery means unfaithfulness inside marriage.

Fornication means sexual activity outside of marriage entirely.

Uncleanness and lasciviousness describe moral impurity and shameless, unrestrained indulgence.

💍 Adultery breaks faith inside marriage

🚫 Fornication means sex outside marriage

🧼 Uncleanness and lasciviousness mean impurity and excess

📖 Paul names sexual sin without flinching

## 🗿 Idolatry, Witchcraft, Hatred, Variance, Emulations

Idolatry means worshiping anything in God's rightful place.

Witchcraft points to sorcery, the use of drugs or spells to manipulate outcomes.

Hatred, variance, and emulations describe open conflict, quarreling, and jealous rivalry.

These sins attack relationships just as much as the first group attacked the body.

🗿 Idolatry means worshiping something besides God

🧪 Witchcraft points to sorcery or drugs

⚔️ Variance and emulations mean quarreling and rivalry

📖 These sins attack relationships, not just the body

## ⚔️ Wrath, Strife, Seditions, Heresies

Wrath and strife describe explosive anger and ongoing quarreling.

Seditions means factions formed to divide a group against itself.

Heresies here does not mean wrong doctrine the way the word is used today.

It means a party spirit, splitting people into competing camps.

🔥 Wrath and strife mean anger and quarreling

✂️ Seditions means factions dividing a group

🤔 Heresies here means party spirit, not doctrine

📖 Paul condemns splitting people into camps

## 🍺 Envyings, Murders, Drunkenness, Revellings

Envyings means resenting what someone else has.

Drunkenness and revellings describe loss of control through alcohol and wild parties.

Paul even includes murder in this same ordinary list of community sins.

These acts range from private resentment to the most extreme act possible.

👀 Envyings means resenting what others have

🍷 Drunkenness and revellings mean losing control

🔪 Murder sits in this same list

📖 This list spans small sins to the extreme

## ⚠️ They Which Do Such Things Shall Not Inherit The Kingdom Of God

This is a serious warning, not a casual aside.

Paul is not describing a single slip or an occasional failure.

He means an entire lifestyle built around these patterns without repentance.

A settled pattern of life reveals whether someone truly belongs to God's kingdom.

⚠️ This is a serious warning

🔁 This means a settled lifestyle, not one slip

💔 It describes a life without repentance

📖 Life patterns reveal who belongs to God

# Galatians 5:22-26
# 🍇 The Fruit Of The Spirit
---
## 🍇 But The Fruit Of The Spirit Is Love, Joy, Peace

Fruit is singular here, not fruits, on purpose in the original language.

This points to one unified character, not a shelf of separate gifts to pick from.

Love, joy, and peace describe the inward shape of that one character.

A person cannot have genuine love without joy and peace growing alongside it.

🍇 Fruit is singular, one character

🚫 Not separate gifts to pick from

❤️ Love, joy, peace describe one shape

📖 These three grow together, not apart

## 🕊️ Longsuffering, Gentleness, Goodness, Faith

Longsuffering means patient endurance with difficult people over a long time.

Gentleness describes strength that is held back and used carefully.

Goodness means active kindness that benefits someone else.

Faith here points to simple faithfulness and reliability, not belief itself.

⏳ Longsuffering means patient endurance over time

🤲 Gentleness means strength held back carefully

🎁 Goodness means active kindness toward others

📖 Faith here means faithfulness, not belief

## 🥋 Meekness, Temperance: Against Such There Is No Law

Meekness means strength under control, not weakness.

Temperance means self control, especially over desires and impulses.

No law exists to restrain things that are already good.

A law only restrains what left alone would cause harm.

🛡️ Meekness means strength under control

🎚️ Temperance means self control over impulses

✅ No law restrains what is already good

📖 Law only exists to restrain harm

## ✝️ They That Are Christ's Have Crucified The Flesh

Crucified here is a decisive, violent image, not a gentle metaphor.

It means putting something to death once, not slowly managing it forever.

Affections and lusts refers to sinful desires and the pull they create.

Believers have already declared war on these desires through their union with Christ.

✝️ Crucified means a decisive death, not gradual

🔪 This happens once, not slowly forever

💭 Affections and lusts means sinful desires

📖 Believers have already declared war on these

## 🚶 If We Live In The Spirit, Let Us Also Walk In The Spirit

Live describes a believer's new position, already true the moment they trusted Christ.

Walk describes the daily practice of living that position out.

Having new life does not automatically guarantee living it out well.

Paul pushes from settled position toward daily, practical action.

🌱 Live means a new position, already true

🚶 Walk means daily practice of that position

⚠️ Position does not guarantee daily practice

📖 Paul pushes position toward daily action

## 🎭 Let Us Not Be Desirous Of Vain Glory

Vain glory means empty, hollow self promotion with nothing real behind it.

It is the opposite of the quiet fruit Paul just described.

Chasing this kind of glory usually costs a community its peace.

The chapter closes right back where it began, warning against infighting.

🎭 Vain glory means empty self promotion

🔄 This is the opposite of real fruit

💔 Chasing it costs a community its peace

📖 The chapter ends warning against infighting

## ⚡ Provoking One Another, Envying One Another

Provoking means deliberately irritating or challenging someone else.

Envying means resenting what someone else has or is.

Paul names both the aggressive and the resentful sides of pride.

Both habits quietly destroy the unity the Spirit's fruit was meant to produce.

⚡ Provoking means deliberately irritating someone

👀 Envying means resenting what others have

🎭 Both are two sides of pride

📖 Both quietly destroy real unity
`.trim();

export const GALATIANS_FIVE_PERSONAL_SECTIONS = parseGalatiansFiveRawNotes(GALATIANS_FIVE_RAW_NOTES);
