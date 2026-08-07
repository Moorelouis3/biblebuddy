export type DeuteronomyTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyTwentyFourRawNotes(rawText: string): DeuteronomyTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 24:${startVerse}` : `Deuteronomy 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Deuteronomy 24 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_TWENTY_FOUR_RAW_NOTES = `# Deuteronomy 24:1-4
# 📜 The Law Of Divorce And Remarriage
---
## 👀 No Favour In His Eyes

This phrase does not describe a crime like adultery.

Adultery already carried the death penalty under the law.

"No favour" means the husband simply stopped being pleased with her.

That could be almost anything, not a specific offense.

The law does not endorse this reason as good.

It only regulates what must happen if a man acts on it.

👀 No favour means simple displeasure

⚖️ Adultery already carried a death penalty

🚫 The law does not endorse this reason

📖 The law regulates a bad choice already made

## 🔍 Some Uncleanness In Her

Bible teachers have argued over this phrase for centuries.

Some read it as a moral failure short of adultery.

Others read it as almost any flaw the husband disliked.

Jesus later pointed back to this exact law in Matthew nineteen.

He said Moses allowed divorce because of hard hearts, not because God wanted it.

The debate itself proves the law was a limit, not a command.

🔍 Uncleanness meant a flaw, not adultery

📚 Teachers have debated this phrase for centuries

✝️ Jesus references this law in Matthew

📖 The law limited divorce, not commanded it

## 📄 A Bill Of Divorcement

A bill of divorcement was a legal document, not just a spoken decision.

The husband had to write it and hand it directly to his wife.

That paperwork gave her real proof that the marriage had legally ended.

Without it, she could later be accused of leaving him without cause.

The written bill protected her more than it protected him.

📄 A bill was a written legal document

✍️ The husband had to write it himself

🛡️ It proved the marriage had ended

📖 The document protected the wife, not the husband

## 🤲 Give It In Her Hand

Handing her the document made the divorce official and undeniable.

No one could later claim it never happened.

This small detail mattered because rumor alone could ruin a woman's reputation.

A physical document settled the question for good.

🤲 Handing it over made it official

🗣️ Rumors could not undo a written record

👩 A woman's reputation depended on proof

📖 A document settled what gossip could not

## 💍 She May Go And Be Another Man's Wife

This law never commands divorce.

It only describes what happens after a divorce already occurred.

The woman is free to remarry once the bill is given.

That freedom mattered because without it she would be stuck, unable to remarry or return home.

💍 The law permits, it does not command

🔓 She becomes free to remarry

🚪 Without this she could not remarry

📖 Permission is not the same as approval

## 💔 The Latter Husband Hate Her

This verse imagines a real second marriage, not a loophole.

The second husband could also grow to dislike her.

He could send her away the same way the first husband did.

The law treats this as a genuine, separate marriage with its own risks.

💔 A second marriage could also fail

🔁 The same divorce process could repeat

⚖️ The law treats it as fully real

📖 Marriage carried real risk each time

## 🚫 May Not Take Her Again To Be His Wife

This is the actual command inside the whole passage.

Everything before this verse only sets up the situation.

The first husband is forbidden from remarrying her after she married someone else.

Allowing that would let a husband treat his wife like property he could reclaim.

The law shuts that door completely.

🚫 The first husband cannot remarry her

🏠 Everything before this sets up the rule

💰 A wife is not property to reclaim

📖 The command closes that door for good

## 😨 That Is Abomination Before The LORD

"Abomination" is a strong word for something God finds deeply offensive.

Remarrying a former wife after she belonged to another man defiled the marriage itself.

It also would let men trade wives back and forth for gain.

God calls that corruption exactly what it is.

😨 Abomination means deeply offensive to God

🔁 Remarrying her again defiled the marriage

💰 It could turn wives into bargaining chips

📖 God names this corruption plainly

## 🌍 Cause The Land To Sin

The Old Testament often treats the land itself as something that can be defiled.

Certain sins were believed to pollute the ground the people lived on.

This law protected more than one marriage.

It protected the whole community from guilt God would eventually judge.

🌍 The land itself could carry guilt

⚠️ Certain sins were believed to defile it

🏘️ This law protected the whole community

📖 One family's sin could touch everyone

# Deuteronomy 24:5-7
# 🏠 Guarding Marriage And Life
---
## 💍 Taken A New Wife

This law picks up an idea introduced back in Deuteronomy twenty.

A newly married man received a full year at home before any national duty.

That included the army and any other public assignment, not just war.

The command values a new marriage as urgent national business.

💍 A newly married man gets a year home

📜 Chapter twenty already introduced this idea

🪖 The exemption covers more than just war

📖 A new marriage counts as urgent business

## ⚔️ He Shall Not Go Out To War

War in the ancient world could easily mean death or a long absence.

A brand new marriage could not survive that kind of separation.

God protected the marriage before He protected national interest.

This priority still surprises readers who expect duty to come first.

⚔️ War risked death or long separation

💔 A new marriage could not survive that

🥇 Marriage came before national duty

📖 God protected the home before the mission

## 😊 Cheer Up His Wife

"Cheer up" here means far more than telling a joke.

It describes building real closeness and comfort within a brand new marriage.

The Hebrew idea behind it points toward bringing joy and security to her.

A whole year was set aside just for that purpose.

😊 Cheer means building real closeness

🏡 A full year was set aside for this

❤️ The goal was comfort, not entertainment

📖 God cared about the marriage succeeding

## 🪨 The Nether Or The Upper Millstone

A millstone was two flat stones used to grind grain into flour every day.

"Nether" means the lower, heavier stone.

"Upper" means the smaller stone that turned on top of it.

A family needed both pieces together to make bread at all.

Taking just one stone made the whole set useless.

🪨 A millstone ground grain into flour

⬇️ Nether means the lower stone

⬆️ Upper means the smaller top stone

📖 Losing either stone stopped the whole family

## ⚰️ He Taketh A Man's Life To Pledge

This does not mean the lender was literally stealing a life.

The millstone made the family's daily bread possible.

Taking it away meant the family could not eat.

Scripture treats destroying someone's livelihood as seriously as harming their body.

⚰️ This is not a literal death threat

🍞 The millstone made daily bread possible

🚫 Taking it left the family unable to eat

📖 Destroying a livelihood is treated as serious harm

## 👤 Stealing Any Of His Brethren

This law is not about stealing property.

It describes kidnapping a fellow Israelite, taking an actual human being.

That crime targeted someone's freedom, not their belongings.

The law treats it in a category of its own.

👤 This describes kidnapping a person

🚫 It is not ordinary property theft

🔒 The crime targets someone's freedom

📖 Kidnapping stands in its own category

## 💰 Maketh Merchandise Of Him, Or Selleth Him

"Merchandise" here means treating a human being like an item to be sold.

The kidnapper's goal was profit, turning a person into property for trade.

This is the ancient world's version of human trafficking.

The Bible names it plainly rather than softening the crime.

💰 Merchandise means selling a person for profit

🔗 This is ancient human trafficking

📛 The Bible names the crime plainly

📖 A person is never property for trade

## ⚖️ That Thief Shall Die

Ordinary theft in Israel's law required repayment, not death.

Kidnapping a person carried the death penalty instead.

The difference in punishment shows how seriously the law valued human freedom.

Taking someone's life away by force was treated worse than taking their goods.

⚖️ Ordinary theft only required repayment

💀 Kidnapping carried the death penalty

🧍 The law valued human freedom highly

📖 Stealing a person outweighed stealing goods

## 🧹 Put Evil Away From Among You

This exact phrase repeats again and again throughout Deuteronomy.

It means the community had a duty to judge sin, not just ignore it.

Letting a known crime go unpunished let corruption spread through the whole camp.

Justice here was a communal responsibility, not only a private matter between two people.

🧹 This phrase repeats throughout Deuteronomy

⚖️ The community had to judge sin

🦠 Ignoring crime let corruption spread

📖 Justice was everyone's shared responsibility

# Deuteronomy 24:8-9
# 🩹 Remembering The Warning At Miriam
---
## 🩹 The Plague Of Leprosy

"Leprosy" in the Old Testament covers a wider range of skin conditions than the modern disease by that name.

Any strange skin sore, discoloration, or infection could fall under this category.

The priests examined the person and decided whether it made them ceremonially unclean.

This was about worship and community health together, not only a medical diagnosis.

🩹 Leprosy covered many kinds of skin disease

🔍 Priests examined and diagnosed the condition

🕍 Uncleanness affected worship, not just health

📖 Body and worship were closely connected

## ⚖️ The Priests The Levites Shall Teach You

The priests functioned like the community's health authority.

Leviticus thirteen and fourteen lay out exactly how they examined and diagnosed a case.

Obeying their ruling mattered more than personal opinion about the sore.

Skipping their process could spread real disease through the whole camp.

⚖️ Priests acted as the health authority

📜 Leviticus lays out their exact process

🙅 Personal opinion did not override their ruling

📖 Obedience protected the whole community's health

## 👩 Remember What The LORD Did Unto Miriam

This points back to Numbers chapter twelve.

Miriam, Moses' sister, spoke against him out of jealousy and pride.

God struck her with leprosy for seven days as a direct consequence.

The memory served as a warning about the danger of contempt for God's chosen leader.

👩 This recalls Numbers chapter twelve

😤 Miriam spoke against Moses in pride

🩹 God struck her with leprosy

📖 The story warned against contempt for leaders

## 🚶 By The Way, After Ye Were Come Forth Out Of Egypt

This places Miriam's punishment during the wilderness journey, a recent memory for this generation.

Many listening had grown up hearing that story firsthand.

The warning was not ancient legend.

It was still living memory.

🚶 This happened during the wilderness journey

👂 Many had heard the story firsthand

📜 The warning was not ancient legend

📖 Recent memory carries real weight

# Deuteronomy 24:10-13
# 🧥 Dignity In Lending
---
## 🤝 Thy Brother

"Brother" here does not mean a literal sibling.

It refers to any fellow Israelite bound to the same covenant.

Deuteronomy uses this word constantly to remind the people they are one family.

Lending money to a brother was never supposed to feel like a business deal alone.

🤝 Brother means any fellow Israelite

👪 Deuteronomy treats the nation as one family

💰 Lending was more than a business deal

📖 Covenant relationship shaped ordinary money matters

## 📦 Fetch His Pledge

A "pledge" was an object given as collateral for a loan.

It proved the borrower's promise to repay was serious.

The lender could keep the item until the debt was settled.

This system let people borrow even without cash or land to offer upfront.

📦 A pledge was collateral for a loan

🤲 It backed up the borrower's promise

🔓 The lender held it until repayment

📖 Pledges let the poor still borrow

## 🚪 Thou Shalt Not Go Into His House

The lender was forbidden from entering the borrower's home to choose the pledge himself.

That would let the lender pick the most valuable or most humiliating item in the house.

The law took that power away completely.

Dignity mattered even in the middle of a debt.

🚪 Lenders could not enter the home

👀 Entering let them pick the best item

🛡️ The law removed that power entirely

📖 Dignity mattered even during a debt

## 🧍 Stand Abroad

"Abroad" simply means outside, not overseas.

The lender had to wait outside the door.

The borrower himself chose which item to bring out as the pledge.

That small shift put the power back in the poorer man's hands.

🧍 Abroad means outside, not overseas

⏳ The lender waited at the door

✋ The borrower chose his own pledge

📖 Power shifted to the poorer man

## 🌙 If The Man Be Poor, Thou Shalt Not Sleep With His Pledge

This likely refers to a man's outer cloak, the garment people also used as a blanket at night.

A similar law in Exodus twenty two describes the exact same situation.

Holding onto that cloak overnight left a poor man cold and exposed.

The law drew a hard line the lender could not cross.

🌙 This pledge was likely his cloak

🧥 People used cloaks as blankets at night

📜 Exodus describes this same law

📖 The lender could not take his warmth

## ☀️ Deliver Him The Pledge Again When The Sun Goeth Down

The lender had to return the cloak every single evening.

The loan was still unpaid at that point.

The daily return cost the lender real convenience.

The borrower's need to sleep warm outweighed the lender's comfort.

Mercy here was not optional.

It was written into the law itself.

☀️ The cloak returned every single evening

💸 That cost the lender real convenience

🧍 The borrower's comfort came first

📖 Mercy was written into the law

## 🙏 That He May Sleep In His Own Raiment, And Bless Thee

"Raiment" simply means clothing.

The law expected the poor man to respond with a blessing, a prayer of thanks toward the lender.

That blessing was never legally required.

It grew naturally out of real kindness.

Most creditors in the ancient world squeezed every bit of leverage they could.

This law asked for the opposite instead.

🙏 Raiment simply means clothing

😊 A blessing was a natural response

🚫 Blessing was never legally required

📖 This law asked for kindness, not leverage

## ⚖️ It Shall Be Righteousness Unto Thee

"Righteousness" here does not mean religious ritual or sacrifice.

It means simply doing right by another person in a real, practical way.

Returning the cloak cost the lender something and he did it anyway.

That kind of everyday fairness counted as true righteousness before God.

⚖️ Righteousness meant practical fairness, not ritual

🧥 Returning the cloak cost something real

✅ Doing right by a neighbor counted

📖 Everyday fairness is real righteousness to God

# Deuteronomy 24:14-16
# 💵 Fair Wages And Personal Guilt
---
## 😔 Oppress An Hired Servant

"Oppress" here means cheating a worker out of fair, timely pay.

It is not only about cruelty or violence.

Withholding wages counted as oppression just as much as any physical mistreatment.

The law took quiet financial harm just as seriously as open abuse.

😔 Oppress means cheating a worker's pay

💸 Withholding wages counted as real oppression

🤐 Financial harm can be just as quiet

📖 Quiet harm was still taken seriously

## 🍞 Poor And Needy

Day laborers in this culture usually had no savings to fall back on.

Whatever they earned that day fed their family that same night.

A single late payment could mean nobody ate.

Modern workers with monthly paychecks rarely feel that kind of urgency.

🍞 Day laborers had no savings

🌙 Wages fed the family that same night

⏳ One late payment meant real hunger

📖 Urgency like this is easy to forget today

## 🌍 Thy Brethren, Or Thy Strangers

This law protects Israelites and foreign workers equally.

A hired stranger got the exact same legal protection as a fellow Israelite.

That stood out as a generous standard for the ancient world.

Fairness in pay was not limited to people who shared the same blood.

🌍 Israelites and strangers were protected equally

🤝 Foreign workers had the same legal rights

⭐ This stood out in the ancient world

📖 Fair pay was not about shared blood

## 💰 At His Day Thou Shalt Give Him His Hire

"Hire" simply means wages.

The law required payment on the very same day the work was done.

Delaying it even until the next morning broke the command.

This protected workers who lived paycheck to paycheck before that phrase even existed.

💰 Hire simply means wages

📅 Payment was due the same day

🚫 Even a one day delay broke the rule

📖 This protected people living day to day

## 😢 Lest He Cry Against Thee Unto The LORD

An unpaid worker's cry functioned almost like a formal complaint straight to God.

That image echoes Israel's own cry to God while enslaved in Egypt.

The employer who withheld wages stood in the same position Pharaoh once did.

God still listens closely when the powerless cry out.

😢 An unpaid worker's cry reached God

🔗 This echoes Israel's own cry in Egypt

👑 The unfair employer resembles Pharaoh here

📖 God still hears the powerless cry out

## 👨‍👧 The Fathers Shall Not Be Put To Death For The Children

This law sets up individual legal responsibility in Israel's courts.

A father could not be executed for a crime his child committed.

A child could not be executed for a crime the father committed.

This does not cancel other places where sin has consequences across generations.

It is specifically about how human courts must assign guilt.

👨‍👧 Fathers were not executed for children

👧 Children were not executed for fathers

⚖️ Israel's courts judged each person alone

📖 Guilt belonged to the person who sinned

# Deuteronomy 24:17-18
# 🧕 Justice For The Powerless
---
## ⚖️ Pervert The Judgment

"Pervert" here means bending a legal decision unfairly.

It could mean favoring a wealthy or powerful person in a dispute.

It could also mean simply not bothering to give a weaker party a fair hearing.

Courts in Israel were commanded to treat every case the same regardless of who stood before them.

⚖️ Pervert means bending a legal decision

💰 Favoring the powerful counted as perversion

🙉 Ignoring the weak counted just the same

📖 Every case deserved a fair hearing

## 🧕 The Stranger, Nor The Fatherless

These groups appear together again and again throughout Deuteronomy.

A stranger had no extended family in the land to defend him.

A fatherless child had no father to speak for him in court.

Both were named specifically because both were easy to exploit quietly.

🧕 Strangers had no family network here

👶 The fatherless had no father to defend them

🔁 These two are named again and again

📖 The vulnerable are named on purpose

## 🧥 Take A Widow's Raiment To Pledge

Earlier in this chapter, a poor man's cloak could be taken if it was returned each night.

A widow's cloak could not be taken at all, not even for one night.

She had no husband at home to make sure it came back.

The law gave her extra protection because she had no one else to rely on.

🧥 A poor man's cloak could return nightly

🚫 A widow's cloak could not be taken

👤 She had no husband to reclaim it

📖 She received extra protection because of that

## ⛓️ Thou Wast A Bondman In Egypt

This reason repeats constantly throughout Deuteronomy's laws.

Israel's own memory of slavery became the motivation for treating vulnerable people with mercy.

God does not simply command compassion, He grounds it in Israel's own story.

Their suffering was meant to produce empathy, not bitterness.

⛓️ Israel remembered their own slavery

❤️ That memory became the reason for mercy

📜 This reason repeats throughout Deuteronomy

📖 Suffering was meant to produce empathy

# Deuteronomy 24:19-22
# 🌾 Leaving The Harvest For Others
---
## 🌾 A Sheaf In The Field

A "sheaf" is a bundle of cut grain stalks tied together after harvest.

Workers sometimes missed one out in the field by accident.

That leftover bundle became the starting point for an entire welfare system.

Nothing about it was wasted, even though it was overlooked.

🌾 A sheaf is a bundle of grain

🙈 Workers sometimes missed one by accident

🍂 One leftover bundle mattered greatly

📖 Nothing overlooked was actually wasted

## 🚫 Thou Shalt Not Go Again To Fetch It

This is a direct command, not a suggestion for extra kindness.

The farmer had to deliberately leave the forgotten sheaf behind.

Efficient harvesting was not the highest goal of the field.

Provision for the poor mattered more than squeezing out every last bit of grain.

🚫 This was a command, not a suggestion

🌾 The farmer left the sheaf on purpose

🎯 Efficiency was not the field's highest goal

📖 Provision mattered more than maximum profit

## 🤲 It Shall Be For The Stranger, For The Fatherless, And For The Widow

This exact trio of people appears three times in just four verses.

Strangers, orphans, and widows all lacked land or family income of their own.

This law built a real welfare system directly into everyday farming.

The Book of Ruth shows this exact law working in real life, when Ruth gleaned in Boaz's field.

🤲 This trio repeats three times here

👪 None of them had land of their own

🌾 Farming itself became a welfare system

📖 Ruth later lived out this exact law

## 🙌 That The LORD Thy God May Bless Thee

A real promise is attached to this generosity.

Blessing here follows giving away a margin of the harvest, not hoarding all of it.

The farmer who left something behind was trusting God with the outcome.

Generosity and blessing are tied together throughout this law.

🙌 A blessing is promised here directly

🌾 Giving away margin, not hoarding it

🙏 Leaving grain behind required real trust

📖 Generosity and blessing move together

## 🫒 Beatest Thine Olive Tree

Olives were harvested by hitting the branches with a long stick or rod.

That method knocked most of the ripe olives down to the ground.

The law allowed only one pass through the tree.

Whatever remained after that single pass belonged to the poor by law.

🫒 Olives were knocked down with a stick

🌳 Only one pass through the tree was allowed

🍂 Leftover olives were not the farmer's

📖 One pass was the legal limit

## 🌿 Boughs

"Boughs" simply means the branches of the tree.

The command forbids going back over those branches a second time.

Any olives still hanging after the first pass stayed there on purpose.

The poor were allowed to come collect what was left behind.

🌿 Boughs simply means the tree branches

🚫 A second pass was not allowed

🫒 Leftover olives stayed on purpose

📖 The poor could collect what remained

## 🍇 Thou Shalt Not Glean It Afterward

To "glean" means going back over a field or vineyard to gather whatever was missed the first time.

This same word appears throughout the Book of Ruth.

The command extends the exact same harvest principle from grain and olives to grapes.

One harvest, three different crops, the same law of leaving some behind.

🍇 Glean means gathering what was missed

📚 Ruth's whole story uses this same word

🌾 Grain, olives, and grapes shared the rule

📖 One law covered every part of harvest

## ⛓️ Thou Wast A Bondman In The Land Of Egypt

This exact reasoning already appeared just a few verses earlier in this chapter.

Repeating it here on purpose ties the whole chapter back to one root idea.

Israel's memory of slavery was meant to shape ordinary daily behavior, not just big moments.

Compassion for the vulnerable was never optional.

It was rooted in Israel's own story of suffering.

⛓️ This reasoning repeats from earlier verses

🔁 Repetition ties the whole chapter together

❤️ Memory was meant to shape daily life

📖 Compassion was rooted in Israel's own story
`.trim();

export const DEUTERONOMY_TWENTY_FOUR_PERSONAL_SECTIONS = parseDeuteronomyTwentyFourRawNotes(DEUTERONOMY_TWENTY_FOUR_RAW_NOTES);
