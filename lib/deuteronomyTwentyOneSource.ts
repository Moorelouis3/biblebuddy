export type DeuteronomyTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyTwentyOneRawNotes(rawText: string): DeuteronomyTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 21:${startVerse}` : `Deuteronomy 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Deuteronomy 21 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_TWENTY_ONE_RAW_NOTES = `# Deuteronomy 21:1-9
# ⚖️ Atoning For An Unsolved Death
---
## 🔍 If One Be Found Slain In The Land

This law addresses a real unsolved murder.

A body is found, but no one knows who is responsible.

The land itself bears the guilt of blood shed within it.

God treated it as a problem for the whole community.

🔍 A real killing with no known culprit

🩸 The land bore guilt for blood shed

👥 This became the whole community's problem

📖 God did not let this go unresolved

## 🕵️ It Be Not Known Who Hath Slain Him

Nobody confessed and no witness came forward.

This is the ancient version of a true cold case.

Normal law required clear testimony before anyone faced punishment.

Without a confession or witness, the normal process could not move forward.

God still provided a path toward justice even here.

🕵️ No confession and no witness existed

📜 Ancient law usually required clear testimony

🚫 Normal justice could not proceed here

📖 God still provided a path forward

## 👴 Thy Elders And Thy Judges Shall Come Forth

Elders were respected leaders who managed a town's daily affairs.

Judges handled formal legal decisions and disputes.

Both groups were required to respond to this death together.

Israel treated an unsolved death as serious enough for its top leaders.

👴 Elders managed everyday town matters

⚖️ Judges ruled on legal disputes

🤝 Both leaders responded together here

📖 Top leaders treated this death seriously

## 📏 Measure Unto The Cities Which Are Round About Him

Officials measured the exact distance to nearby towns.

That measurement identified the city closest to the body.

The closest city carried responsibility for the ritual that followed.

Justice here began with careful investigation.

📏 Officials measured distance to nearby towns

🎯 This identified the closest city

🏙️ That city bore ritual responsibility

📖 Investigation came before any ritual

## 🐄 An Heifer, Which Hath Not Been Wrought With

"Wrought with" means the animal had never been forced to work.

It had never pulled a plow or worn a yoke.

An unused animal represented something untouched and set apart for this purpose.

Ordinary work animals would not have carried the same meaning.

🐄 Wrought with means never forced to work

🚫 It had never worn a yoke

✨ An unused animal was set apart

📖 Ordinary animals could not replace this

## 🌾 A Rough Valley, Which Is Neither Eared Nor Sown

"Eared" is an old word meaning plowed.

This valley had never been plowed or planted with crops.

Untouched ground matched the untouched heifer brought to it.

The whole setting was deliberately set apart from ordinary use.

🌾 Eared is an old word for plowed

🏞️ This valley had never been farmed

🐄 Untouched ground matched the untouched heifer

📖 Everything here was set apart on purpose

## 💔 Strike Off The Heifer's Neck There In The Valley

This is not an ordinary sacrifice on an altar.

Normal sacrifices involved the throat and burning parts of the animal.

Breaking the heifer's neck instead marked this as something different.

The animal stood in for the unknown killer, absorbing the violence in a person's place.

🐄 This differs from a normal sacrifice

🔪 Normal sacrifices used the throat instead

💔 A broken neck marked this differently

📖 The animal stood in for the killer

## 🕎 The Priests The Sons Of Levi Shall Come Near

Levites were the tribe set apart for religious service.

Priests came from within that same tribe.

Their presence turned this from a town matter into a matter before God.

Even a local crime scene fell under priestly oversight.

🕎 Levites were set apart for worship

🙏 Priests came from within that tribe

✝️ Their presence brought God into this

📖 Even local crime involved priestly oversight

## ⚖️ By Their Word Shall Every Controversy And Every Stroke Be Tried

Priests did more than lead worship in ancient Israel.

They also settled disputes and judged difficult cases.

This gave legal decisions a spiritual weight beyond ordinary judgment.

Religion and justice were never treated as separate systems here.

⚖️ Priests also settled legal disputes

🙏 Judgment carried real spiritual weight

🤝 Religion and justice worked together

📖 These systems were never separate

## 💧 Wash Their Hands Over The Heifer That Is Beheaded

Washing hands here is a symbolic act, not literal cleaning.

It publicly declared that the town's leaders were innocent of this death.

The heifer's death visually carried away the town's uncertainty.

A physical action gave a spiritual claim real weight.

💧 Washing hands was a symbolic act

🙌 It declared the leaders innocent

🐄 The heifer visually carried the guilt

📖 A physical act gave weight to words

## 🗣️ Our Hands Have Not Shed This Blood

This is a formal legal oath, not a casual comment.

The elders state plainly they had no part in the death.

Speaking it aloud, together, made the claim official and binding.

Ancient courts relied on spoken declarations like this one.

🗣️ This was a formal legal oath

🙅 The elders deny any involvement

🤝 Speaking it together made it binding

📖 Ancient courts relied on spoken oaths

## 🙏 Be Merciful, O LORD, Unto Thy People Israel

This prayer moves from the local town to the whole nation.

What happened in one place could affect Israel's standing before God.

The elders ask for mercy on behalf of everyone, not just themselves.

One unsolved death was treated as a national concern.

🙏 This prayer covers the whole nation

🌍 One death could affect all Israel

🤝 The elders pray for everyone here

📖 A local problem became a national one

## ✅ The Blood Shall Be Forgiven Them

This line promises the ritual actually worked.

God accepted the heifer's death in place of punishing the whole town.

The community walked away genuinely clean, not just hopeful.

Forgiveness here was a stated fact, not a guess.

✅ The ritual truly worked here

🐄 The heifer stood in for punishment

🕊️ The town walked away clean

📖 This forgiveness was certain, not hopeful

## 🎯 Put Away The Guilt Of Innocent Blood From Among You

This final line names the whole purpose of the ritual.

Israel could not simply ignore a death and move on.

Guilt had to be actively removed, not quietly forgotten.

Doing what was right kept the whole community accountable to God.

🎯 This names the ritual's real purpose

🚫 Israel could not ignore a death

🧹 Guilt had to be actively removed

📖 Doing right kept the community accountable

# Deuteronomy 21:10-14
# 👰 Marrying A Captive Woman
---
## ⚔️ When Thou Goest Forth To War Against Thine Enemies

This law continues the war instructions from the previous chapter.

Ancient warfare regularly ended with captives taken from a defeated people.

This chapter now addresses what happens to one specific kind of captive.

Even war captives fell under God's law, not outside it.

⚔️ This continues chapter twenty's war laws

🏹 Ancient warfare produced captives regularly

👤 One kind of captive is addressed here

📖 War never sat outside God's law

## 👁️ Seest Among The Captives A Beautiful Woman

This describes a real and difficult situation in ancient warfare.

Women were often taken captive along with a defeated city's resources.

The law does not pretend this situation never happened.

Instead, it steps in to regulate what could otherwise turn violent.

👁️ A hard, real wartime situation

👤 Women were often taken captive

🚫 The law does not ignore this

📖 It steps in to regulate it

## ❤️ Hast A Desire Unto Her, That Thou Wouldest Have Her To Thy Wife

Even a soldier's private desire gets placed under legal limits here.

He could not simply take her by force in that moment.

Marriage was the only path the law allowed, not ownership.

This slowed down a dangerous situation with real legal steps.

❤️ Even desire was placed under law

🚫 Force was never a legal option

💍 Marriage was the only allowed path

📖 Law slowed down a dangerous moment

## ✂️ She Shall Shave Her Head, And Pare Her Nails

These were both ancient mourning customs.

"Pare" means to trim or cut down.

Shaving the head and paring the nails both marked a real loss.

This also stripped away the appearance that first caught the soldier's eye.

She entered this new life plainly, not as a trophy on display.

✂️ These were ancient mourning customs

✋ Pare means to trim or cut

😢 Both actions marked a real loss

📖 She entered plainly, not as a trophy

## 👗 Put The Raiment Of Her Captivity From Off Her

"Raiment" means clothing.

Her captive clothing marked her as property taken in war.

Removing it began to change her legal and social status.

The law moved her, step by step, toward becoming a wife.

👗 Raiment simply means clothing

🏷️ Captive clothing marked her as property

🔄 Removing it changed her status

📖 Each step moved her toward becoming a wife

## 📆 Bewail Her Father And Her Mother A Full Month

"Bewail" means to openly grieve and mourn.

She was given a full month to do that for her family.

Nobody could rush her into marriage during this time.

Losing her family through war was treated as a real loss.

This month protected her grief instead of ignoring it.

📆 Bewail means to openly grieve

🚫 No one could rush the marriage

👪 Losing her family was a real loss

📖 Her grief was protected, not ignored

## 💍 Thou Shalt Go In Unto Her, And Be Her Husband

Marriage only became official after every earlier step was completed.

Grief, transition, and time all had to pass first.

Nothing about this process happened quickly or carelessly.

Once married, she held the full legal status of a wife.

💍 Marriage came only after every step

⏳ Grief and transition took real time

🚫 Nothing here happened carelessly

📖 She then held a wife's full status

## 💔 If Thou Have No Delight In Her, Then Thou Shalt Let Her Go

This law plans ahead for a marriage that does not work out.

He could not simply keep her against her will indefinitely.

Letting her go freely was required, not optional.

Her future mattered even after the marriage ended.

💔 This plans for a failed marriage

🚫 She could not be kept by force

🚪 Letting her go was required

📖 Her future still mattered afterward

## 🚫 Thou Shalt Not Sell Her At All For Money

This law directly forbids treating her as property, even at the end.

"Merchandise" means treating a person like an item to be traded.

Whatever her earlier captive status had been, that status was now gone.

She left the marriage with real legal protection, not for sale.

🚫 Selling her was strictly forbidden

🏷️ Merchandise means treating her as an item

🔄 Her captive status no longer applied

📖 She left with real legal protection

## 🎯 Because Thou Hast Humbled Her

This phrase names the real reason behind every protection just listed.

Marrying her had already changed her life completely and permanently.

That change created a genuine responsibility toward her.

Her dignity mattered to God even inside a difficult wartime law.

🎯 This names the real reason for these laws

🔄 Her life had already changed completely

🤝 That change created real responsibility

📖 Her dignity mattered even in wartime law

# Deuteronomy 21:15-17
# 👶 Protecting The Firstborn's Rights
---
## 👰 One Beloved, And Another Hated

This describes a man with two wives in the same household.

"Hated" here means less loved, not despised.

Ancient marriages sometimes involved more than one wife at once.

This uneven love created real tension inside the family.

👰 Two wives shared one household here

❤️ Hated means less loved, not despised

👥 Multiple wives were sometimes allowed

📖 Uneven love created real family tension

## 👶 If The Firstborn Son Be Hers That Was Hated

This verse sets up the exact problem this law addresses.

The firstborn son belonged to the less favored wife.

A father's feelings could easily tempt him toward unfair treatment.

The law steps in before that unfairness can happen.

👶 The firstborn belonged to the less loved wife

💔 A father's feelings could tempt him

⚖️ This law prevents unfair treatment

📖 It steps in before harm is done

## 🚫 He May Not Make The Son Of The Beloved Firstborn

A father could not simply favor his preferred wife's son.

Birth order determined inheritance rights, not personal feelings.

This protected the actual firstborn from being pushed aside.

Law overruled favoritism in this one specific decision.

🚫 A father could not favor his choice

📆 Birth order decided inheritance rights

🛡️ This protected the real firstborn

📖 Law overruled personal favoritism here

## ✅ He Shall Acknowledge The Son Of The Hated For The Firstborn

The father had to legally recognize this son's true status.

His personal feelings toward the mother could not change the facts.

Acknowledgment here was a legal duty, not an emotional choice.

Truth about birth order outweighed a father's private preference.

✅ The father had to recognize this son

❤️ Feelings could not change the facts

📜 This was a legal duty

📖 Truth outweighed private preference

## 🔢 By Giving Him A Double Portion Of All That He Hath

The firstborn normally received twice the inheritance of any other son.

This custom gave him extra responsibility for the wider family later.

A double portion recognized that added future weight.

This right could not be quietly transferred to a favored brother.

🔢 Firstborns received double the inheritance

👨‍👩‍👧‍👦 That share came with added family duty

⚖️ The extra portion matched that duty

📖 This right could not be transferred away

## 💪 He Is The Beginning Of His Strength

This old phrase describes the very first child a father has.

It ties a son's birth to his father's early strength and vigor.

First sons carried a kind of honor tied to that timing.

That honor belonged to birth order, not to a father's favorite.

💪 This phrase describes the very first child

📆 It ties birth timing to a father's youth

👑 First sons carried real honor

📖 That honor followed birth, not favoritism

# Deuteronomy 21:18-21
# 😤 A Rebellious Son
---
## 😤 A Stubborn And Rebellious Son

This law describes an ongoing pattern, not one bad moment.

A single argument or mistake would not qualify here.

This son consistently refused every attempt to correct him.

The law targets persistent, repeated defiance.

🔁 This describes an ongoing pattern

🚫 One bad moment would not qualify

😤 The refusal was consistent and repeated

📖 The law targets persistent defiance

## 👨 Will Not Obey The Voice Of His Father, Or The Voice Of His Mother

Both parents are named here with equal authority.

Ancient society often gave fathers far more legal weight than mothers.

This law treats a mother's authority as just as binding.

Respect for both parents mattered equally under this law.

👨 The father is named here

👩 The mother is named equally

⚖️ Both held equal legal authority

📖 Respect for both parents mattered

## 📚 When They Have Chastened Him, Will Not Hearken Unto Them

"Chastened" means corrected or disciplined.

"Hearken" means to listen and obey.

This son ignored real discipline, not just casual advice.

Repeated correction had already failed before this law even applied.

📚 Chastened means corrected or disciplined

👂 Hearken means to listen and obey

🚫 This son ignored real discipline

📖 Correction had already failed here

## 🚫 Lay Hold On Him, And Bring Him Out Unto The Elders

Parents could not judge or punish this son on their own.

They were required to bring the matter before public leaders.

This removed the danger of a private, uncontrolled reaction.

Even family conflict had to pass through a real legal process.

🚫 Parents could not judge him alone

👴 The case went before the elders

🛡️ This prevented a private, uncontrolled reaction

📖 Even family conflict followed real process

## 🚪 Unto The Gate Of His Place

City gates served as the courtroom in ancient Israelite towns.

Elders gathered there to hear cases and settle disputes.

Taking him to the gate meant a real, public hearing.

This was not a rumor or a private accusation.

🚪 City gates worked as the courtroom

👴 Elders heard cases there

📢 This meant a real public hearing

📖 It was never a private accusation

## 🗣️ This Our Son Is Stubborn And Rebellious

Both parents had to say this together, out loud.

One angry parent alone could not bring this accusation.

Requiring both protected a son from one parent's grudge.

Agreement between both parents was the law's built in safeguard.

🗣️ Both parents spoke this together

🚫 One angry parent alone was not enough

🛡️ This protected against a private grudge

📖 Agreement was the law's real safeguard

## 🍷 He Is A Glutton, And A Drunkard

The accusation required specific, named behavior.

Vague complaints about attitude were not enough on their own.

Gluttony and drunkenness were treated as visible proof of the pattern.

Specific evidence protected against a case built on feelings alone.

🍷 Drunkenness was named as specific evidence

🍖 Gluttony was named the same way

📋 Vague complaints were not enough

📖 Evidence mattered more than feelings

## 👥 All The Men Of His City Shall Stone Him With Stones

The whole community carried out this sentence, not just the parents.

This spread the responsibility across many people, not one household.

Jewish tradition later added very strict requirements around this law.

Those added requirements meant it was almost never actually carried out.

The severity of the law aimed at prevention as much as punishment.

👥 The whole community carried this out

🚫 Responsibility was never just the parents'

📜 Later tradition made this extremely rare

📖 The law aimed at prevention itself

## 📢 All Israel Shall Hear, And Fear

This law was meant to be widely known across the nation.

Its severity served as a warning to every family listening.

The goal was to stop this pattern before it spread.

A serious warning protected far more families than it punished.

📢 This law was meant to be widely known

⚠️ Its severity served as a warning

🛑 The goal was to stop the pattern

📖 One warning protected many families

# Deuteronomy 21:22-23
# 🌳 Burying The Hanged Body
---
## 🌳 Thou Hang Him On A Tree

This describes displaying a body after execution, not the method of killing.

The death sentence itself happened separately, by stoning or another means.

Hanging the body afterward made the punishment publicly visible.

This was about public display, not the act of execution.

🌳 The body was displayed on a tree

⚖️ Execution itself happened separately

👁️ Display made the punishment visible

📖 This was about display, not killing

## 🌙 His Body Shall Not Remain All Night Upon The Tree

Israel's law required burial before nightfall, even for a criminal.

Leaving a body displayed overnight was considered a further dishonor.

Even a guilty person kept a basic level of human dignity.

Punishment had a clear limit here, and the law enforced it.

🌙 Burial was required before nightfall

🚫 Overnight display counted as dishonor

🙏 Even the guilty kept real dignity

📖 The law enforced a clear limit

## ⚖️ He That Is Hanged Is Accursed Of God

This phrase names why the body could not stay displayed.

A displayed body was seen as carrying a lasting curse.

Paul later quotes this exact phrase in Galatians when explaining Jesus.

Jesus is described there as taking on that same curse for others.

⚖️ This names why display could not continue

💔 A displayed body carried a lasting curse

📜 Paul quotes this phrase in Galatians

📖 Jesus is described as bearing that curse

## 🌍 That Thy Land Be Not Defiled

This closing line connects back to the start of the whole chapter.

An unburied body could spiritually defile the land, much like unresolved blood.

The land itself mattered to God, not just individual people.

This chapter opened and closed on the same concern for a clean land.

🔁 This connects back to the chapter's start

🌍 An unburied body could defile the land

🙏 The land itself mattered to God

📖 One concern framed the whole chapter
`.trim();

export const DEUTERONOMY_TWENTY_ONE_PERSONAL_SECTIONS = parseDeuteronomyTwentyOneRawNotes(DEUTERONOMY_TWENTY_ONE_RAW_NOTES);
