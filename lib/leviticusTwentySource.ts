export type LeviticusTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwentyRawNotes(rawText: string): LeviticusTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 20:${startVerse}` : `Leviticus 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Leviticus 20 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWENTY_RAW_NOTES = `# Leviticus 20:1-5
# 🔥 The Death Penalty For Molech Worship
---
## 👶 Giveth Any Of His Seed Unto Molech

"Seed" means his own children.

Molech was a god worshipped by nations near Israel, like the Ammonites.

Worship included burning children alive as an offering.

This law names that practice directly and bans it.

👶 Seed means his own children

🔥 Molech worship burned children alive

🌍 Ammonites and neighboring nations worshipped Molech

📖 This law bans child sacrifice outright

## 🌍 The Strangers That Sojourn In Israel

"Sojourn" means to live somewhere for a time without being a native there.

This law covers foreigners living in Israel, not only native born Israelites.

Some other practices were allowed as private matters for foreigners in this culture.

Child sacrifice was banned for everyone in the land, with no exception.

🌍 Sojourn means living somewhere as a foreigner

🚫 The ban covers foreigners too

⚖️ Other laws sometimes allowed exceptions for them

📖 This law allowed no exception for anyone

## 🪨 The People Of The Land Shall Stone Him With Stones

The words "surely be put to death" repeat the same Hebrew verb twice for emphasis.

That doubled phrase appears close to a dozen times across this chapter.

Stoning made the execution a group act carried out by the whole community.

No single person carried the blame for one execution alone.

🔁 Surely repeats a Hebrew verb twice

📊 This doubled phrase repeats through the chapter

🪨 Stoning was carried out by the community

📖 No one person bore the blame alone

## 👁️ I Will Set My Face Against That Man

This is a Hebrew idiom for God turning his full attention toward someone in judgment.

It does not mean God literally has a face pointed somewhere.

The phrase pictures a direct, unmissable stare rather than a passing glance.

It appears here right after a warning that human judges might fail to act.

👁️ The idiom pictures a direct stare

🚫 It does not describe a literal face

⚖️ It follows a warning about human judges

📖 God notices even when courts fail

## ✨ To Defile My Sanctuary And To Profane My Holy Name

"Profane" means treating something holy as common or worthless.

This sin is described here as an attack on God's name, not only on the child.

"My sanctuary" is God's own dwelling place among the people.

The same word "profane" appears again later in this book for misusing God's name.

✨ Profane means treating holy things as common

🏛️ Sanctuary means God's own dwelling place

🎯 Framed as an attack on God

📖 God's name and God's people are both harmed

## 👪 Then I Will Set My Face Against That Man And Against His Family

This verse describes what happens when a community hides its eyes and stays silent.

God's judgment widens here to include the guilty man's whole family.

That is a real escalation past the death sentence just described.

Staying silent about wrongdoing does not make the consequence smaller.

🙈 This follows a community staying silent

👪 Judgment widens to the man's family

📈 Silence makes the outcome worse, not milder

📖 Communal silence carries its own cost

## 💔 Go A Whoring After Him To Commit Whoredom With Molech

Idolatry gets described throughout the Old Testament using marriage language.

Israel's relationship with God gets pictured like a marriage covenant.

Following Molech, or covering for someone who does, counts as breaking faith with God.

This same picture returns again soon with mediums in verse six.

💔 Idolatry is pictured as breaking a marriage

🤝 Israel's bond with God works like a covenant

🔮 The same picture returns with mediums soon

📖 Unfaithfulness to God takes many forms

# Leviticus 20:6-8
# 🔮 Turning To Mediums Instead Of God
---
## 🔮 Such As Have Familiar Spirits And After Wizards

A "familiar spirit" describes a supposed spirit contacted through a medium.

Mediums claimed contact with the dead or with hidden secret knowledge.

A "wizard" here means someone who claims special hidden knowledge or power.

This exact warning already appeared earlier in this book, at chapter nineteen.

🔮 A spirit supposedly contacted through a medium

🧙 Wizard means a claimed source of hidden knowledge

🔗 The warning repeats an earlier chapter

📖 Both promise secrets only God can give

## ✨ Sanctify Yourselves Therefore And Be Ye Holy

"Sanctify" means to set apart for God's own use.

That is the same root idea behind the word "holy."

This command follows right after two of the chapter's most serious warnings.

Holiness here means actively rejecting Molech worship and consulting mediums.

✨ Sanctify means set apart for God

🔗 Holy shares the same root idea

⚖️ This follows two serious warnings

📖 Holiness means rejecting these practices

## 🙏 I Am The LORD Which Sanctify You

People are commanded to be holy in the line just before this one.

This line adds an important balance to that command.

God names himself here as the one who actually makes his people holy.

Holiness is something God gives, even while he commands his people to pursue it.

🙏 God calls himself the one who sanctifies

⚖️ Holiness is commanded and also given

🤝 Effort and gift work together here

📖 Holiness never depends on people alone

## 📜 Ye Shall Keep My Statutes And Do Them

This short line closes the chapter's opening section.

A long list of specific penalties for specific sins follows right after it.

The general command to obey now gets applied case by case.

"I am the LORD" repeats again, a signature phrase used throughout this book.

📜 This line closes the opening section

📋 A detailed penalty list follows next

🔁 I am the LORD repeats as a signature

➡️ General obedience becomes specific cases next

# Leviticus 20:9-10
# ⚖️ Cursing Parents And Adultery
---
## 🗣️ Every One That Curseth His Father Or His Mother

"Curseth" here means more than a rude insult.

It covers treating a parent with contempt or calling down harm on them.

This law stands as the exact opposite of the command to honor a father and mother.

That honor command appears in the Ten Commandments and again earlier in this book.

🗣️ Curseth means contempt or calling down harm

📜 This opposes the command to honor parents

🔟 The honor command is one of the ten

📖 Family respect carried real legal weight

## 🩸 His Blood Shall Be Upon Him

This exact phrase repeats many times through this chapter.

It means the guilty person carries full responsibility for his own death sentence.

The community or judges who carry out the sentence do not bear that blame.

Watching for this phrase helps track which laws in this chapter carry it.

🩸 The phrase means self caused responsibility

⚖️ It removes blame from the community

🔁 It repeats often through this chapter

📖 Not every law here uses this phrase

## 💔 The Adulterer And The Adulteress Shall Surely Be Put To Death

"Another man's wife" ties this law to family and inheritance concerns in this culture.

Adultery threatened whose child belonged to whose family.

Both the man and the woman are held equally responsible here.

Many ancient near eastern law codes did not apply penalties this evenly.

💔 Wife language ties to family inheritance

👨‍👩‍👧 Adultery threatened whose child was whose

⚖️ Both the man and woman are responsible

📖 Equal treatment was not a given elsewhere

# Leviticus 20:11-12
# 🚫 A Father's Wife And A Son's Wife
---
## 🔗 The Man That Lieth With His Father's Wife

This exact relationship was already forbidden earlier in this book, at chapter eighteen.

That earlier chapter explained what was off limits.

This chapter now supplies the penalty the earlier one left unstated.

"Uncovered his father's nakedness" describes violating his father's marriage, not an assault on his father's body.

🔗 The ban already appears in chapter eighteen

⚖️ This chapter adds the missing penalty

🛏️ Nakedness language means violating a marriage

📖 Words here describe more than they show

## ⚖️ Both Of Them Shall Surely Be Put To Death

Both people receive the same death penalty here.

The wording assumes both people took part willingly.

Forced cases get treated differently elsewhere in this law.

This formula signals a willing act, not an assault.

⚖️ Both people share the same penalty

🤝 The wording assumes willing participation

🚨 Forced cases are treated differently elsewhere

📖 Willingness changes how a case is judged

## 👨‍👩‍👦 If A Man Lie With His Daughter In Law

A "daughter in law" means a son's wife.

Extended families in this culture often lived closely together across generations.

That closeness is part of why this law needed to be spelled out.

Judah's own failure with his daughter in law Tamar shows this was a real danger.

👨‍👩‍👦 Daughter in law means a son's wife

🏡 Close family living made this a real risk

⚠️ This was not a hypothetical case

📖 Judah's failure with Tamar shows the danger

## 🔤 They Have Wrought Confusion

"Confusion" translates a Hebrew word meaning a blurring of categories meant to stay separate.

The same underlying concern shows up in the mixed kinds bans given earlier in this book.

Those earlier laws applied to crops and fabric.

This law applies that same idea to family roles instead.

🔤 Confusion means blurring separate categories

🔗 The same idea covers crops and fabric elsewhere

👪 Here it applies to family roles

📖 Order mattered in every part of life

# Leviticus 20:13-14
# 🔥 Two More Capital Sexual Sins
---
## 🚫 Both Of Them Have Committed An Abomination

This law was already stated earlier in this book, at chapter eighteen.

This chapter now attaches the penalty to that earlier command.

"Abomination" describes something considered deeply detestable or ritually unacceptable.

The same strong word appears elsewhere in this chapter for practices tied to pagan worship.

🔗 The ban already appears in chapter eighteen

🔤 Abomination means deeply detestable

⚖️ This verse adds the missing penalty

📖 The same strong word repeats later

## ⚰️ They Shall Surely Be Put To Death Their Blood Shall Be Upon Them

This uses the same doubled death sentence formula used throughout the chapter.

It also repeats the self responsibility phrase already seen in verse nine.

No special or different language marks this case apart from the others.

This offense gets grouped with the chapter's other capital sexual sins.

🔁 The formula repeats from earlier verses

⚰️ Doubled wording marks the death sentence

📊 No different language sets this case apart

📖 It stands beside the chapter's other cases

## 👰 If A Man Take A Wife And Her Mother

This case means marrying both a woman and her own mother at the same time.

Chapter eighteen's earlier list of forbidden relationships did not directly name this case.

This chapter adds it here as a new case, not a repeated one.

That shows this list expands on the earlier chapter rather than only repeating it.

👰 This means marrying a woman and her mother

🆕 Chapter eighteen did not name this case

📜 This chapter adds new cases too

📖 The lists work together, not alone

## 🔥 They Shall Be Burnt With Fire

Burning was a harsher method than the stoning used elsewhere in this chapter.

It was reserved for only a small handful of the worst offenses in the law.

"That there be no wickedness among you" frames this penalty as protecting the whole community.

The stated goal here is community protection, not only punishing two individuals.

🔥 Burning was reserved for the worst offenses

📊 Only a few cases get it

🎯 The stated goal protects the whole community

📖 Some penalties aim past the individual

# Leviticus 20:15-16
# 🐴 Named For Both A Man And A Woman
---
## 🐴 He Shall Surely Be Put To Death And Ye Shall Slay The Beast

This act was already banned earlier in this book, at chapter eighteen.

This verse adds the penalty, and unusually, the animal is killed too.

That killing does not mean the animal is morally guilty.

It reflects the idea that the whole act defiled the animal and it had to be fully removed.

🔗 The ban already appears in chapter eighteen

🐴 The animal is killed as well

✨ The act itself defiled the animal

📖 Removal here goes beyond the guilty person

## 👩 If A Woman Approach Unto Any Beast

The earlier ban at chapter eighteen only named the case of a man.

This verse explicitly closes that gap and names a woman too.

The law was never limited by gender, even though the earlier chapter did not spell out both sides.

Naming both sides here removes any doubt about who the law covers.

👩 This verse names the woman's case too

🔗 Chapter eighteen only named the man

📜 The law was never limited by gender

📖 Naming both sides removes any doubt

## 🔪 Thou Shalt Kill The Woman And The Beast

Some religious practices among Israel's neighbors linked rituals to animals or animal gods.

Egyptian and Canaanite fertility cults are examples scholars point to.

Naming this act directly may answer a real practice Israel encountered nearby.

This law was likely not addressing a purely hypothetical case.

🌍 Neighboring religions sometimes linked rituals to animals

🏺 Egyptian and Canaanite cults are examples

🚫 This law may answer a real practice

📖 This chapter often responds to real customs

# Leviticus 20:17-18
# 🩸 A Sister And The Blood Law
---
## 👫 If A Man Shall Take His Sister

This relationship was already banned earlier in this book, at chapter eighteen.

The penalty named here is being cut off, not the stoning used for several other cases in this chapter.

That is a real difference in severity worth noticing.

This chapter does not treat every forbidden relationship with the same penalty.

🔗 The ban already appears in chapter eighteen

⚖️ The penalty here is cut off, not stoning

📊 Penalties in this chapter vary in severity

📖 Not every case gets the same weight

## ⚖️ He Shall Bear His Iniquity

"Bear his iniquity" is a lighter formula than the phrase "his blood shall be upon him."

This wording reinforces that this offense sits at its own place on the chapter's scale.

The word "iniquity" means guilt or wrongdoing that a person must answer for.

This same lighter formula returns again later in the chapter.

⚖️ Bear his iniquity is a lighter formula

📊 It marks its own place on the scale

🔤 Iniquity means guilt a person answers for

📖 The same formula returns again later

## 🩸 Lie With A Woman Having Her Sickness

"Her sickness" means menstruation.

Purity rules for this already appear earlier in this book, at chapter fifteen.

This verse addresses intentional relations during that time, not accidental contact.

Chapter fifteen covered the ordinary case, and this chapter covers the deliberate one.

🩸 Her sickness means menstruation

🔗 Purity rules already appear in chapter fifteen

⚖️ This verse addresses an intentional act

📖 Deliberate choices carry heavier weight here

## 💧 He Hath Discovered Her Fountain

"Fountain" works as a euphemism for the source of her blood.

The penalty named here is being cut off again, not execution.

That matches the penalty given for the sister relationship just above it.

This chapter keeps using more than one level of consequence throughout.

💧 Fountain is a euphemism for her blood

⚖️ The penalty matches the case just before

📊 This chapter uses more than one severity level

📖 Wording often signals how serious a case is

# Leviticus 20:19-21
# 👪 An Aunt An Uncle's Wife And A Brother's Wife
---
## 👩 The Nakedness Of Thy Mother's Sister Nor Of Thy Father's Sister

Aunts on either side of the family were already banned as partners earlier in this book.

This verse repeats both cases together in one line.

"Near kin" here means close blood relatives.

The penalty named again is "bear their iniquity," the lighter formula seen earlier.

🔗 Both cases already appear in chapter eighteen

👪 Near kin means close blood relatives

⚖️ The lighter iniquity penalty returns here

📖 Close relatives got explicit, repeated warnings

## 👨‍👩‍👦 If A Man Shall Lie With His Uncle's Wife

This verse introduces a third kind of penalty in this chapter, dying without children.

A family's name, inheritance, and land allotment all depended on having heirs in this culture.

Dying childless was understood as a severe consequence, even without a court carrying out an execution.

This penalty was likely understood as God's own action.

👨‍👩‍👦 A third penalty appears here, dying childless

🏡 Inheritance and land depended on having heirs

✨ This was likely seen as God's own action

📖 Some consequences do not need a court

## 👰 If A Man Shall Take His Brother's Wife

This repeats a ban already given earlier in this book, at chapter eighteen.

The same "childless" penalty appears again here.

This case assumes the brother is still alive.

A separate custom called levirate marriage later covered the case of a brother who had died.

🔗 The ban already appears in chapter eighteen

👰 The childless penalty repeats here

⚠️ This case assumes the brother is alive

📖 A dead brother's case worked differently

## 🚫 It Is An Unclean Thing

"Unclean" here names a moral and ritual violation, not a matter of hygiene.

The same word describes forbidden foods and practices elsewhere in this book.

Using it here ties a family sin to the same category as other serious violations.

This chapter treats moral and ritual purity as closely connected ideas.

🚫 Unclean names a moral and ritual violation

🍽️ The same word covers forbidden foods elsewhere

🔗 One word ties different violations together

📖 Purity here means more than hygiene

# Leviticus 20:22-24
# 🌍 Do Not Let The Land Reject You
---
## 🤮 Spue You Not Out

"Spue" is an old word meaning vomit.

The image pictures the land itself rejecting its people for wrongdoing.

This nearly repeats a warning already given earlier in this book, at chapter eighteen.

Together the two chapters form matching bookends, one listing the laws and the other listing the penalties.

🤮 Spue is an old word for vomit

🔗 This nearly repeats chapter eighteen's warning

📚 The two chapters form matching bookends

📖 Even the land can reject wrongdoing

## 🚶 The Manners Of The Nation Which I Cast Out Before You

"The nation" here refers to the Canaanites.

Israel was about to move into and settle the Canaanites' land.

Their practices, including everything just listed in this chapter, are named as the reason God removed them.

This connects the whole list of laws to a real historical decision.

🚶 The nation means the Canaanites

🏞️ Israel was about to settle their land

⚖️ Their practices led to their removal

📖 This law explains a real historical event

## 😤 Therefore I Abhorred Them

"Abhorred" is a strong word describing God's judgment.

It applies here to an entire culture's practices, not only to individual offenders.

This line frames everything listed before it as a real moral evaluation.

The list in this chapter was never just a random set of rules.

😤 Abhorred describes strong, active judgment

🌍 It applies to a whole culture here

📜 This is a moral evaluation, not trivia

📖 God judges patterns, not only individuals

## 🍯 A Land That Floweth With Milk And Honey

This phrase describes the promised land's fertility and abundance.

"Milk" points to healthy livestock and good pasture.

"Honey" points to a land rich enough to support wild bees.

This phrase repeats often through the story of the exodus and the wilderness years.

🍯 This phrase describes fertility and abundance

🐄 Milk points to healthy livestock

🐝 Honey points to wild bees thriving

📖 The promise was a good place to live

# Leviticus 20:25-26
# 🐄 Clean And Unclean Animals Again
---
## 🐄 Put Difference Between Clean Beasts And Unclean

This calls back to detailed food laws already given earlier in this book, at chapter eleven.

This chapter reframes those laws as part of the same theme of being set apart.

Birds get named too, alongside land animals, under the same principle.

Everyday eating habits carried real theological weight in this culture.

🔗 This calls back to chapter eleven's food laws

✨ Reframed here as being set apart

🦅 Birds fall under the same principle too

📖 Daily meals carried real spiritual weight

## 🚫 Ye Shall Not Make Your Souls Abominable

The same strong word "abominable" appeared earlier in this chapter for the worst sexual sins.

That word gets reused here for violating food laws.

This does not mean eating an unclean animal carries equal weight to those earlier sins.

The text treats both as expressions of the same underlying call to holiness.

🔤 Abominable repeats a word from earlier

⚖️ Not claimed as equal in weight

✨ Both point to the same call to holiness

📖 One word can link very different laws

## ✨ I The LORD Am Holy And Have Severed You From Other People

This chapter's holiness refrain returns here for the final time.

It ties diet, family ethics, and worship together under a single reason.

"Severed" here means the same thing as being set apart.

This was simply what belonging to this God looked like in daily practice.

🔁 The holiness refrain returns one last time

🔗 Diet and family ethics share one reason

🔤 Severed means set apart

📖 Daily life reflected who Israel belonged to

# Leviticus 20:27
# 🔮 One Final Warning About Mediums
---
## 👫 A Man Also Or Woman That Hath A Familiar Spirit Or That Is A Wizard

This verse closes the chapter by returning to the warning already given back in verse six.

Verse six only stated the penalty as being cut off.

This final verse spells out the human death penalty explicitly.

Both men and women are named here as equally liable.

🔗 This returns to the warning in verse six

⚖️ It spells out the death penalty explicitly

👫 Men and women are named equally

📖 The chapter closes with equal accountability

## 🪨 They Shall Stone Them With Stones

The chapter closes exactly the way it opened, with a stoning penalty.

Verse two opened with stoning for Molech worship.

This verse ends with stoning for consulting mediums.

Both practices count here as looking for power outside of God.

🪨 Stoning opened and closes this chapter

🔗 Verse two used the same penalty

🔮 Mediums and Molech share this same warning

📖 The whole chapter argues for one loyalty
`.trim();

export const LEVITICUS_TWENTY_PERSONAL_SECTIONS = parseLeviticusTwentyRawNotes(LEVITICUS_TWENTY_RAW_NOTES);
