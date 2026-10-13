export type FirstCorinthiansSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansSevenRawNotes(rawText: string): FirstCorinthiansSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 7:${startVerse}` : `1 Corinthians 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 First Corinthians 7 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_SEVEN_RAW_NOTES = `# FirstCorinthians 7:1-2
# 💍 Concerning The Things Ye Wrote
---
## Concerning The Things Whereof Ye Wrote

Paul is answering an actual letter the Corinthian church sent him.

That letter raised real questions about marriage and singleness.

This whole chapter reads like Paul working through that list point by point.

Knowing a real letter sits behind these words changes how we read his tone.

He is responding to people, not writing abstract rules.

📬 Corinth sent Paul a real letter

❓ The letter asked about marriage

📝 Paul answers point by point

📖 Real questions shaped this whole chapter

## It Is Good For A Man Not To Touch A Woman

"Touch" here means sexual relations, not a casual touch on the arm.

Paul is quoting a phrase the Corinthians themselves had written to him.

Some in Corinth were teaching that any sexual activity, even inside marriage, made a person less holy.

Paul does not fully agree with that idea, and the rest of the chapter corrects it.

🤝 Touch means sexual relations here

📜 Paul quotes the Corinthians own words

🙅 Some taught marriage made people unholy

📖 Paul spends the chapter correcting that

## Let Every Man Have His Own Wife

Paul is not banning marriage in the verse before this one.

He is answering a group that leaned too hard toward forced singleness.

His actual counsel is the opposite of total avoidance.

Marriage protects both husband and wife from sexual sin outside the home.

🙅 Paul does not ban marriage here

⚖️ He answers forced singleness teaching

💍 Marriage is his actual counsel

📖 It protects both husband and wife

# FirstCorinthians 7:3-5
# 💞 Due Benevolence
---
## Render Unto The Wife Due Benevolence

"Due benevolence" is an old way of describing the sexual relationship owed within marriage.

Paul states the husband's duty first, then immediately states the wife's matching duty.

That order was unusual for the ancient world, where wives were rarely granted equal standing.

Marriage in Paul's view runs on mutual obligation, not one sided demand.

💞 Due benevolence means marital intimacy

🔁 The husband owes it first

⚖️ The wife is owed it too

📖 Marriage runs on mutual duty

## The Wife Hath Not Power Of Her Own Body

This does not mean a wife has no say over her own body in general.

Paul is talking only about this one specific area, intimacy within marriage.

He immediately says the exact same thing about the husband's body too.

Neither spouse gets to treat this part of marriage as theirs alone to control.

🙅 Not a claim about all control

💞 Applies only to marital intimacy

🔁 The husband is bound the same way

📖 Neither spouse controls this alone

## Satan Tempt You Not For Your Incontinency

"Incontinency" means a lack of self control, especially over sexual desire.

Paul allows married couples to pause intimacy only briefly, and only by mutual agreement.

The purpose has to be prayer or fasting, not one spouse avoiding the other.

He warns that stretching the pause too long leaves either spouse open to temptation.

🧠 Incontinency means weak self control

🙏 A pause is allowed for prayer

🤝 Both spouses must agree to it

📖 A long pause invites temptation

# FirstCorinthians 7:6-9
# 🔥 Better To Marry Than To Burn
---
## I Speak This By Permission, And Not Of Commandment

Paul flags his own words here as personal counsel, not a direct order from God.

He wants the Corinthians to know the difference between his advice and a command.

This honesty matters because later in the chapter he gives an actual command from the Lord.

Readers should notice which parts of this chapter carry which level of authority.

🗣️ Paul marks this as counsel

🚫 Not a direct command from God

🔀 Later verses carry a real command

📖 Watch which authority each verse claims

## Every Man Hath His Proper Gift Of God

"Gift" here means a particular calling or capacity God gives a person.

Paul is not saying marriage is better than singleness or the other way around.

Some people are given the capacity to stay single without constant struggle.

Others are given the capacity to thrive within marriage instead.

🎁 Gift means a God given calling

⚖️ Neither state beats the other

🧘 Some are suited to stay single

📖 Others are suited to marry

## It Is Good For Them If They Abide Even As I

Paul points to his own life as one living example of singleness.

He was likely a widower or had never married, though the text does not say for certain.

He offers himself as proof that remaining single and serving God fully is possible.

He never demands that everyone follow his own path.

🙋 Paul offers his own life as proof

❓ His exact marital history stays unclear

🧭 Singleness can serve God fully

📖 He never forces his path on others

## Better To Marry Than To Burn

"Burn" does not refer to punishment in the afterlife.

It describes the ongoing pull of unmet sexual desire.

Paul is being practical, not harsh, about human nature.

Marriage is the honest answer for someone who cannot realistically stay single.

🔥 Burn means unmet sexual desire

🚫 Not a reference to punishment

🧠 Paul is being realistic here

📖 Marriage answers a real need

# FirstCorinthians 7:10-11
# 💔 Let Not The Wife Depart
---
## Unto The Married I Command, Yet Not I, But The Lord

Here Paul shifts from his own counsel to a direct command.

He is likely pointing back to words Jesus himself taught about marriage.

This is a different weight than the earlier verses in this chapter carried.

A married believer cannot treat this instruction as optional advice.

🔀 Paul shifts to a direct command

🗣️ The command traces back to Jesus

⚖️ It carries more weight than advice

📖 This instruction is not optional

## Let Her Remain Unmarried, Or Be Reconciled

Paul is addressing a believer who has already separated from a spouse.

He does not open the door to marrying someone new in that situation.

The two choices on the table are staying single or working toward reconciliation.

The goal behind both choices is protecting the original marriage, not ending it.

🚪 This addresses an already separated spouse

🙅 Marrying someone new is not offered

🧍 Staying single is one option

📖 Reconciliation is the hoped for outcome

# FirstCorinthians 7:12-16
# 🕊️ Sanctified By The Husband
---
## But To The Rest Speak I, Not The Lord

Paul now addresses a situation Jesus never directly spoke about, a believer married to an unbeliever.

Saying "not the Lord" does not mean Paul is guessing or less trustworthy here.

He is simply being clear that this specific guidance comes through his own apostolic authority.

The early church still treated his letters as carrying real divine weight.

❓ This situation Jesus never addressed directly

🗣️ Paul speaks with apostolic authority

🚫 Not a guess or lesser claim

📖 His letters still carried real weight

## The Unbelieving Husband Is Sanctified By The Wife

"Sanctified" here does not mean the unbelieving spouse is automatically saved.

It means the marriage itself is set apart and made acceptable in God's eyes.

A believer does not pollute a marriage just by staying married to an unbeliever.

The household stays whole and blessed because of the believing spouse's presence.

🙅 Sanctified does not mean automatic salvation

🏠 It means the marriage is set apart

💞 The believer does not pollute it

📖 The household stays blessed through them

## Else Were Your Children Unclean, But Now Are They Holy

Some Corinthians worried their children were somehow impure because one parent did not believe.

Paul answers that worry directly and plainly.

The children of a mixed marriage are not treated as outsiders to God's family.

This single verse removed a real source of anxiety for these families.

😟 Corinth worried about mixed marriage children

🧒 Paul says those children are not impure

👪 They are not outsiders to God's family

📖 This verse removed real anxiety

## A Brother Or A Sister Is Not Under Bondage

"Bondage" here means being trapped in a marriage that has already ended through abandonment.

If the unbelieving spouse chooses to leave, the believer is not required to chase them down.

This is not Paul encouraging believers to leave their marriages.

It only applies when the unbelieving spouse walks away first.

⛓️ Bondage means being trapped unfairly

🚶 This covers a spouse who leaves

🙅 Not permission to leave first

📖 It applies only after abandonment

## Whether Thou Shalt Save Thy Husband

Paul gives a real reason to hope and stay in a mixed marriage when possible.

A believing spouse's daily example can influence the unbelieving spouse toward faith over time.

Nobody can guarantee that outcome in advance.

Staying is never a wasted effort, even when the result stays uncertain.

🌱 Daily example can influence a spouse

❓ No outcome is ever guaranteed

🏠 Staying is never wasted effort

📖 Hope is a real reason to remain

# FirstCorinthians 7:17-20
# 📏 Abide In The Calling
---
## As God Hath Distributed To Every Man

Paul is laying down a general rule before giving specific examples.

Becoming a believer does not automatically require changing your social situation.

God meets people exactly where they already are.

The transformation He wants happens on the inside first.

📏 A general rule comes before examples

🧍 Faith does not demand new circumstances

📍 God meets people where they are

📖 Inner change comes before outer change

## Circumcision Is Nothing, And Uncircumcision Is Nothing

Circumcision marked a man as Jewish under the old covenant.

Paul says that marker no longer decides anyone's standing with God.

Being Jewish or being a Gentile is no longer the measuring stick.

What matters now is obedience to God's actual commands.

✂️ Circumcision marked Jewish identity

🚫 It no longer decides standing with God

🌍 Jewish or Gentile no longer matters

📖 Obedience is the real measure now

## Let Every Man Abide In The Same Calling Wherein He Was Called

"Calling" here means the situation a person was already living in when they came to faith.

Paul is not telling people to never change jobs or never move.

He is correcting an urge in Corinth to treat conversion as a reason to upend everything at once.

Faithfulness where you already stand matters more than chasing a new status.

📍 Calling means your situation at conversion

🚫 Not a ban on every future change

🏠 Corinth wanted to upend everything

📖 Faithfulness matters more than new status

# FirstCorinthians 7:21-24
# ⛓️ Bought With A Price
---
## Art Thou Called Being A Servant? Care Not For It

"Servant" here translates a Greek word closer to bondservant in the Roman world.

Paul is speaking to believers who were legally enslaved under that system.

"Care not for it" means do not let that status consume you with anxiety.

Paul is not defending slavery, he is giving pastoral comfort inside a system he did not control.

⛓️ Servant means bondservant in that world

😟 Care not means do not be anxious

🙏 This is pastoral comfort, not approval

📖 Paul did not control that system

## Being A Servant, Is The Lord's Freeman

Paul flips the usual social ranking completely upside down here.

A believer who is legally enslaved is truly free in Christ.

A believer who is legally free is truly a servant of Christ.

Earthly status and spiritual status run on two separate tracks.

🔄 Paul flips the social ranking here

🕊️ An enslaved believer is free in Christ

🙇 A free believer serves Christ fully

📖 Earthly and spiritual status differ

## Ye Are Bought With A Price

The price Paul means is Christ's own death on behalf of every believer.

That price applies equally to the enslaved believer and the free believer in the church.

Because of that price, no believer ultimately belongs to another person.

Every believer's final ownership belongs to God alone.

💰 The price means Christ's own death

⚖️ It applies equally to every believer

🚫 No believer belongs to another person

📖 Final ownership belongs to God alone

# FirstCorinthians 7:25-28
# 💭 Concerning Virgins
---
## Concerning Virgins I Have No Commandment Of The Lord

"Virgins" here most likely means young unmarried women, possibly already promised in engagement.

Paul again states he has no direct command from Jesus covering this exact situation.

He offers his own careful judgment instead, calling it trustworthy because of God's mercy toward him.

This is honest about where personal counsel ends and direct revelation begins.

👧 Virgins likely means young unmarried women

❓ No direct command covers this case

🙏 Paul offers trustworthy personal judgment

📖 He is honest about the difference

## Good For The Present Distress

"Present distress" points to real hardship the Corinthian church was facing at that time.

Many scholars believe this refers to famine, persecution, or general instability in that era.

Starting a marriage and family is harder during active hardship than during stable times.

Paul's counsel to stay single here is practical, tied to that specific moment.

⚠️ Present distress means real hardship then

🌾 Likely famine or persecution in Corinth

👪 Hardship makes starting a family harder

📖 This counsel fits that specific moment

## Art Thou Bound Unto A Wife? Seek Not To Be Loosed

Paul gives the same balanced advice from both directions here.

A married man should not go looking for a way out of his marriage.

An unmarried man should not rush into one simply to feel settled.

Contentment matters more than changing your current status either way.

⚖️ Advice runs both directions equally

🙅 Married men should not seek an exit

🧍 Single men should not rush in

📖 Contentment matters more than status

## Such Shall Have Trouble In The Flesh

This is not Paul condemning marriage as a mistake.

He is being honest that marriage brings real, practical difficulty alongside its real joys.

That honesty is part of why he let singleness remain a valid choice during hard times.

"I spare you" shows Paul trying to protect them from needless extra hardship.

🙅 Not a condemnation of marriage

⚠️ Marriage brings real practical difficulty

🛡️ Paul tries to spare them hardship

📖 Marriage is never forbidden here

# FirstCorinthians 7:29-31
# ⏳ The Time Is Short
---
## The Time Is Short

Paul is not predicting an exact date for the end of the world.

He means that every believer's time to serve God faithfully is limited.

That urgency should shape how tightly people hold onto earthly plans.

Eternity reframes what actually deserves first priority today.

⏳ Not a prediction of an exact date

⏱️ Every believer's time is limited

🎯 Urgency should shape daily priorities

📖 Eternity reframes what matters most

## As Though They Had None

Paul is not telling married people to ignore their spouses.

He means a believer should never let any earthly relationship outrank loyalty to God.

Holding something loosely is different from abandoning it completely.

The point is right priority, not neglect.

🙅 Not permission to ignore a spouse

⚖️ Nothing should outrank loyalty to God

🤲 Holding loosely differs from abandoning

📖 Right priority, not real neglect

## As Though They Wept Not, As Though They Rejoiced Not

Paul is not asking believers to become emotionally numb.

He means even strong emotions, grief and joy alike, should not control a believer's whole focus.

A believer can feel deeply and still keep their eyes fixed on God first.

Both extremes of life stay secondary to that fixed focus.

🙅 Not a call to emotional numbness

😢 Grief should not take over focus

😊 Joy should not take over focus

📖 God stays the fixed priority

## The Fashion Of This World Passeth Away

"Fashion" here means the whole outward pattern and system of present day life.

Business deals, social structures, and daily routines all count as part of that fashion.

Paul is saying all of it is temporary, no matter how permanent it feels.

Believers invest their deepest hope somewhere that actually lasts.

🌍 Fashion means the world's whole pattern

💼 Business and routines are part of it

⏳ All of it is temporary

📖 Real hope rests somewhere lasting

# FirstCorinthians 7:32-35
# 🙏 Without Carefulness
---
## I Would Have You Without Carefulness

"Carefulness" here means anxious worry, not simple caution.

Paul genuinely wants the Corinthians free from needless anxiety, not just informed.

He is about to explain why singleness can reduce one specific kind of worry.

This is pastoral concern, not a hidden insult toward marriage.

😟 Carefulness means anxious worry here

🎯 Paul wants them free of needless anxiety

🧍 Singleness can reduce one kind of worry

📖 This is pastoral care, not insult

## He That Is Unmarried Careth For The Things That Belong To The Lord

An unmarried believer can often give undivided attention to serving God.

That is a real advantage, not a claim that single people love God more.

Fewer competing responsibilities can mean more available time and energy.

Paul names this honestly as one practical benefit of singleness.

🎯 Undivided attention is a real advantage

🚫 Not a claim of greater love for God

⏰ Fewer responsibilities, more available time

📖 Paul names this benefit honestly

## There Is Difference Also Between A Wife And A Virgin

Paul is not ranking the value of married women against unmarried women.

He is describing two different sets of daily responsibilities, not two different levels of worth.

A wife rightly cares for her husband's needs alongside her devotion to God.

An unmarried woman can direct that same devotion in a more singular direction.

🙅 Not a ranking of personal worth

📋 Two different sets of responsibilities

💞 A wife rightly cares for her husband

📖 Devotion looks different in each case

## Without Distraction

"Distraction" here means divided attention, not something inherently bad.

Paul uses this word to summarize his whole point about singleness and marriage.

Both states are good, but they place a believer's attention in different directions.

The goal in either state is still full devotion to God, however it gets lived out.

🎯 Distraction means divided attention

⚖️ Both marriage and singleness are good

🧭 Each directs attention differently

📖 Full devotion to God is the real goal

# FirstCorinthians 7:36-38
# 🌸 The Flower Of Her Age
---
## If Any Man Think That He Behaveth Himself Uncomely Toward His Virgin

This verse likely addresses a father or guardian responsible for an unmarried young woman in his household.

Arranged engagements were common in this culture, often decided by a father rather than the couple themselves.

"Uncomely" means improper or embarrassing, a worry that delaying marriage might cause real social harm.

Paul is answering a very specific family situation, not a general rule for every reader.

👨‍👧 Likely addresses a father or guardian

💍 Engagements were often arranged by fathers

😳 Uncomely means improper or embarrassing

📖 This answers one specific family situation

## If She Pass The Flower Of Her Age

"The flower of her age" describes a woman's prime marriageable years in that culture.

Passing that window carried real social pressure in the ancient world, more than it typically does today.

A guardian delaying marriage too long could expose a young woman to real difficulty.

Paul treats that pressure as a legitimate, practical concern, not something to dismiss.

🌸 Flower of her age means prime years

⏳ Passing it carried real social pressure

😟 Delay could cause real difficulty

📖 Paul treats this as legitimate

## He That Giveth Her Not In Marriage Doeth Better

This is not a universal claim that staying single always outranks marriage.

Paul is speaking to one specific situation involving hardship and pressure at that time.

Both choices, allowing the marriage or keeping her unmarried, are already called good earlier in the passage.

"Doeth better" fits this one circumstance, not every circumstance afterward.

🙅 Not a universal rule for everyone

📍 Tied to one specific situation

⚖️ Both choices are already called good

📖 Better fits this case, not every case

# FirstCorinthians 7:39-40
# 🕯️ At Liberty Only In The Lord
---
## The Wife Is Bound By The Law As Long As Her Husband Liveth

Paul restates the basic marriage bond already described back in verse ten.

That bond lasts for the full length of both spouses' lives, not just while convenient.

Death is the one clear boundary Paul names for ending that bond.

This sets up the exception he gives in the very next line.

💍 The bond lasts through both lives

⚰️ Death is the clear boundary named

🔁 This recalls the promise from verse ten

📖 It sets up the next exception

## At Liberty To Be Married To Whom She Will, Only In The Lord

A widow in this church was genuinely free to remarry after her husband's death.

"Only in the Lord" places one real limit on that freedom, the new husband must share her faith.

This protects her from the exact tension described earlier about mixed marriages.

Freedom here is real, but it is not freedom without any direction at all.

🕊️ A widow is genuinely free to remarry

🙏 Only in the Lord means a believing spouse

🛡️ This avoids the earlier mixed marriage tension

📖 Real freedom still has real direction

## I Think Also That I Have The Spirit Of God

Paul closes this long, practical chapter with quiet confidence rather than a loud demand.

He is not claiming perfect certainty about every single detail he has given.

He is claiming that the Holy Spirit genuinely guided his overall counsel.

That is Paul's final word on marriage, singleness, and everything addressed in this chapter.

🕊️ Paul closes with quiet confidence

❓ Not a claim of perfect certainty

🙏 The Spirit guided his counsel

📖 This settles the whole chapter's advice
`.trim();

export const FIRST_CORINTHIANS_SEVEN_PERSONAL_SECTIONS = parseFirstCorinthiansSevenRawNotes(FIRST_CORINTHIANS_SEVEN_RAW_NOTES);
