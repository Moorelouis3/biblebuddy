export type FirstThessaloniansFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstThessaloniansFiveRawNotes(rawText: string): FirstThessaloniansFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstThessaloniansFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*1\s+Thessalonians\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Thessalonians 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+1\s+Thessalonians\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+1\s+Thessalonians\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Thessalonians 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Thessalonians 5:${startVerse}` : `1 Thessalonians 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Thessalonians 5 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_THESSALONIANS_FIVE_RAW_NOTES = `# 1 Thessalonians 5:1-4
# ⏰ The Day of the Lord Comes Like a Thief
---
## 📅 Of the Times and the Seasons

"Times and seasons" was a set phrase in Jewish thinking about the end of the world.

It did not mean ordinary calendar dates.

It meant the hidden schedule God keeps for his final plan.

Jesus used this same phrase with his own disciples in the book of Acts.

He told them the times and seasons were not theirs to know.

Paul assumes the Thessalonians already understand that.

📅 Times and seasons means God's hidden schedule
📜 Jesus used this phrase too
🤫 Not theirs to know exactly
📖 Paul assumes they already understand this

## ✍️ Ye Have No Need That I Write Unto You

Paul does not introduce this topic as something brand new.

He reminds them of teaching he already gave in person.

This is the same pattern he used earlier in the letter about brotherly love.

Paul trusts what they already carry more than what he could add now.

✍️ Not a brand new topic
🗣️ Already taught in person before
🔁 Same pattern as brotherly love
📖 Paul trusts what they already carry

## 🌙 The Day of the Lord So Cometh

"The day of the Lord" is a phrase borrowed straight from the Old Testament prophets.

Joel and Amos both used it for the day God steps in to judge and to save.

It never meant a date anyone could mark on a calendar ahead of time.

It meant the moment God brings history to its turning point.

Paul lets that same old weight carry into this new letter.

🌙 Borrowed from Old Testament prophets
⚖️ Joel and Amos used it too
🔄 Marks history's turning point
📖 Paul carries that same weight forward

## 🥷 As a Thief in the Night

A thief never announces when he is coming.

That is exactly the point of this comparison.

Jesus used this same picture for his own return in the Gospels.

Peter later used it again in his second letter.

The point was never fear for its own sake.

The point was staying ready at all times.

🥷 A thief gives no warning
✝️ Jesus used this picture first
📜 Peter repeated it later
📖 The point is staying ready

## 🗣️ When They Shall Say, Peace and Safety

"Peace and safety" was not a phrase Paul invented out of nowhere.

Rome used almost this exact slogan to describe the stability of its own empire.

Coins and official speeches praised the peace Rome claimed to guarantee everywhere.

Paul warns that confidence like that can collapse in a single moment.

No human government can promise safety from God's coming judgment.

🗣️ Peace and safety echoes a Roman slogan
🏛️ Rome claimed to guarantee stability
💥 That confidence can collapse fast
📖 No government can promise this safety

## 💥 Sudden Destruction Cometh Upon Them

"Sudden" is the key word in this whole sentence.

The destruction does not creep up slowly where people can prepare.

It arrives all at once, the way lightning arrives.

The warning is aimed at those trusting the false peace from the verse before.

💥 Sudden means all at once
⚡ Like lightning not a slow creep
🙅 Aimed at the falsely confident
📖 No time left to prepare

## 🤰 As Travail Upon a Woman With Child

"Travail" means the hard labor pains that come before a child is born.

Old Testament prophets used this same picture for coming judgment many times before Paul.

Labor pain cannot be stopped once it begins.

It also only grows stronger, never weaker, as it goes on.

That is exactly how Paul describes this coming day.

🤰 Travail means labor pain
📜 Prophets used this picture before
⏳ It cannot be stopped once started
📖 It only grows stronger with time

## 🚪 They Shall Not Escape

This line closes the warning with no soft edge.

There is no back door for the people trusting in false peace.

The confidence described in verse three turns out to be an illusion.

Paul is not trying to frighten his own readers here.

He already tells them in the next verse that they are not in darkness.

🚪 No back door is offered
🎭 False peace turns out hollow
🛡️ Not aimed at Paul's own readers
📖 The next verse explains why

# 1 Thessalonians 5:5-8
# 🕯️ Children of Light, Not of the Night
---
## 🕯️ Ye Are All the Children of Light

"Children of light" describes a person's whole identity, not just good behavior now and then.

Light stands for truth, holiness, and belonging to God in this picture.

Other groups outside the church used this same light and darkness language around this same era.

Paul uses it to describe a new family the Thessalonians now belong to.

🕯️ Children of light means a new identity
✨ Light stands for truth and holiness
📜 Other groups used this language too
📖 It names a new family they belong to

## 🌑 We Are Not of the Night, Nor of Darkness

Paul does not just describe what they are.

He also names what they are no longer.

"Night" and "darkness" picture a life cut off from God and unaware of what is coming.

Their old life under that description is already behind them.

🌑 Night pictures life cut off from God
🔙 Describes what they used to be
🚫 That old life is behind them
📖 Identity now runs the other way

## 😴 Let Us Not Sleep, As Do Others

"Sleep" here does not mean rest at the end of a long day.

It means spiritual carelessness, drifting through life unaware that anything is coming.

"Others" points to people living as if the day of the Lord will never arrive.

Paul will not let his readers drift into that same careless pattern.

😴 Sleep means spiritual carelessness
🙈 Living unaware anything is coming
👥 Others describes the careless crowd
📖 Paul will not let them drift there

## 👀 Let Us Watch and Be Sober

"Watch" means staying alert on purpose, the way a guard stays alert on a city wall.

"Sober" is the opposite of a mind clouded by wine or by careless living.

Both words describe a clear headed kind of readiness.

This readiness is a daily choice, not a single moment of panic.

👀 Watch means staying alert on purpose
🍷 Sober means a clear mind
🧱 Pictures a guard on a wall
📖 Readiness is a daily choice

## 🌃 They That Sleep Sleep in the Night

Paul circles back to the sleep picture from two verses earlier.

Nighttime was when careless sleep and drunkenness both naturally happened in that world.

He is not talking about a normal nightly routine here.

He is talking about a whole life lived unaware and unprepared.

🌃 Returns to the sleep picture
🌙 Night was when carelessness happened
🔁 Not about an ordinary routine
📖 About a whole unprepared life

## 🍷 They That Be Drunken Are Drunken in the Night

Drunkenness pictures a mind that cannot think clearly or notice danger.

Public drunkenness at night was common enough in that culture to make this comparison land immediately.

Paul is not giving a lecture about wine itself here.

He is picturing a mind too clouded to notice the day of the Lord arriving.

🍷 Drunkenness clouds clear thinking
🌃 Night drinking was common then
🙈 Pictures a mind that misses danger
📖 Not really a lecture about wine

## 🛡️ Putting on the Breastplate of Faith and Love

A breastplate protected a Roman soldier's chest, the most vital part of his body.

Isaiah already pictured God himself wearing righteousness like a breastplate centuries earlier.

Paul borrows that same armor picture and gives it to ordinary believers.

Faith and love become the protection guarding the center of a believer's life.

🛡️ Breastplate protected the vital chest
📜 Isaiah used this image first
⚔️ Paul gives the armor to believers
📖 Faith and love guard the center

## ⛑️ For an Helmet, the Hope of Salvation

A helmet protected a soldier's head, the part hardest to defend in close combat.

Hope of salvation pictures the mind's own defense against fear and despair.

Isaiah again used salvation as a helmet in that same earlier passage.

A believer's hope is not wishful thinking, it is protective gear worn every day.

⛑️ Helmet protected the exposed head
🧠 Hope defends the mind itself
📜 Isaiah used this image too
📖 Hope is gear, not just a wish

# 1 Thessalonians 5:9-11
# ✝️ Appointed to Obtain Salvation
---
## ⚖️ God Hath Not Appointed Us to Wrath

"Appointed" means assigned ahead of time, like a role already given out.

Paul says plainly that wrath was never the role God assigned to believers.

This verse answers a fear some in the church were quietly carrying.

They worried the coming judgment might still land on them too.

⚖️ Appointed means assigned ahead of time
🙅 Wrath was never their assignment
😟 Answers a quiet fear in the church
📖 Judgment was never aimed at them

## ✝️ To Obtain Salvation by Our Lord Jesus Christ

"Obtain" means to actually receive something, not just hope for it someday.

Salvation here is not a reward earned through good behavior.

It comes specifically through Jesus Christ, named directly in this verse.

Paul ties the whole hope of this chapter to one specific person.

✝️ Obtain means actually receiving it
🎁 Not earned through good behavior
👑 Comes through Jesus Christ by name
📖 The whole hope rests on one person

## 🕊️ Who Died for Us

This short phrase holds the center of everything Paul has argued so far.

Christ's death is not a side detail in this letter.

It is the reason believers can face a coming day of judgment without terror.

Everything in this chapter stands on this one historical event.

🕊️ The center of Paul's whole argument
✝️ Christ's death removes the terror
🏛️ One real historical event
📖 Everything else stands on this

## 💤 Whether We Wake or Sleep

"Sleep" switches meaning again in this one verse.

Earlier in the chapter it meant spiritual carelessness.

Here it returns to the gentler meaning from chapter four, death itself.

Paul says it will not matter which group a believer belongs to when Christ returns.

💤 Sleep shifts meaning again here
⚰️ Now it means death itself
🔀 Different sense than earlier in the chapter
📖 Either way believers are included

## 🫂 Comfort Yourselves Together

"Comfort" does not mean simply feeling better for a moment.

It means actively strengthening someone who is struggling or afraid.

"Together" shows this job belongs to the whole church, not to Paul alone.

Every believer carries some responsibility for someone else's courage.

🫂 Comfort means actively strengthening someone
💪 More than a passing feeling
👥 A job for the whole church
📖 Everyone carries this responsibility

## 🧱 Edify One Another

"Edify" comes from a word that literally means to build a house.

Paul pictures each believer as a builder working on someone else's faith.

This is the same word he uses often about the local church as a whole.

No one in the church is only meant to receive this kind of building.

🧱 Edify literally means to build
🏠 Pictures building someone else's faith
🔁 A word Paul uses often
📖 No one only receives this gift

# 1 Thessalonians 5:12-15
# 🤝 Know Them Which Labour Among You
---
## 💪 Know Them Which Labour Among You

"Labour" describes hard, tiring work, not a light or occasional task.

This phrase names the people doing the daily, often unseen work of leading a church.

Paul asks the Thessalonians to notice and value this effort.

Leadership in the early church was built on service, not on status.

💪 Labour means hard tiring work
👀 Names people doing unseen church work
🙏 Paul asks them to notice it
📖 Leadership here is built on service

## 👑 Are Over You in the Lord, and Admonish You

"Over you" describes real authority, not just friendly influence.

That authority is carefully limited by the phrase "in the Lord."

Their authority only exists because it answers to Christ himself.

"Admonish" means to correct someone directly but out of real care.

👑 Describes real limited authority
⛓️ Limited by the phrase in the Lord
🗣️ Admonish means direct loving correction
📖 Their authority answers to Christ

## ❤️ Esteem Them Very Highly in Love for Their Work's Sake

"Esteem" means to hold someone in high honor and regard.

Paul roots that honor in their work, not in a title or position.

"For their work's sake" keeps this from becoming empty flattery.

Honor here is tied to what someone actually does for others.

❤️ Esteem means holding someone in honor
🛠️ Rooted in their actual work
🚫 Not empty flattery or a title
📖 Honor follows real service

## ☮️ Be at Peace Among Yourselves

This short command sits right after a verse about respecting leaders.

Disagreement about leadership can easily split a church apart quietly.

Paul heads off that danger before it even starts growing.

Peace here means an active choice, not simply the absence of conflict.

☮️ Guards against quiet division
👔 Follows right after leadership talk
🛑 Stops a danger before it grows
📖 Peace is a choice, not an accident

## ⚠️ Warn Them That Are Unruly

"Unruly" described soldiers who broke formation and would not stay in line.

Paul borrows a military word to describe people disrupting the church's order.

"Warn" means a direct, clear word, not a vague hint.

Some problems in a church need to be named plainly, not avoided.

⚠️ Unruly pictures soldiers breaking formation
🪖 A borrowed military word
🗣️ Warn means a direct clear word
📖 Some problems must be named plainly

## 🤲 Comfort the Feebleminded, Support the Weak

"Feebleminded" in this old English sense means fainthearted or easily discouraged.

It does not describe a person's intelligence at all.

"Weak" here points to someone struggling, whether in faith, body, or circumstance.

Paul gives two different needs their own specific response.

🤲 Feebleminded means fainthearted, not unintelligent
😟 Describes someone easily discouraged
🦽 Weak points to real struggle
📖 Each need gets its own response

## ⏳ Be Patient Toward All Men

"Patient" means staying steady with someone even when progress feels slow.

"All men" removes any excuse to give up on a difficult person.

This patience applies inside the church and toward outsiders alike.

Paul does not put a time limit on how long this patience should last.

⏳ Patient means staying steady over time
🌍 All men removes every excuse
🤝 Applies to insiders and outsiders
📖 No time limit is given

## 🚫 See That None Render Evil for Evil

"Render" means to pay something back, like settling a debt.

The natural instinct is to repay harm with equal harm.

Paul cuts that instinct off directly and completely.

Instead believers are told to chase after good, for each other and for everyone else.

🚫 Render means paying something back
🔥 Cuts off the instinct to retaliate
🏃 Calls believers to chase good instead
📖 Applies to everyone, not just insiders

# 1 Thessalonians 5:16-22
# 🙏 Rejoice Evermore
---
## 😊 Rejoice Evermore

"Evermore" means without stopping, not just during good seasons.

This command does not depend on circumstances staying pleasant.

Paul writes this to a church already facing real pressure and loss.

Joy here is rooted in who God is, not in how life feels that day.

😊 Evermore means without stopping
🌧️ Does not depend on circumstances
😔 Written to a suffering church
📖 Rooted in God, not in feelings

## 🙏 Pray Without Ceasing

"Without ceasing" does not mean kneeling in prayer every waking hour.

It pictures a constant awareness of God running underneath daily life.

Ancient writers used this same word for a repeated, nagging cough.

Prayer becomes something that keeps returning, not a single event each day.

🙏 Without ceasing means constant awareness
🫁 Compared to a repeated cough
🔁 Prayer keeps returning all day
📖 Not one event, a running habit

## 🍽️ In Every Thing Give Thanks

"Every thing" includes hard circumstances, not only the pleasant ones.

This is not a command to pretend pain is not real.

It is a command to keep thanking God even inside real pain.

The next line explains exactly why this is even possible.

🍽️ Every thing includes hard times too
🎭 Not pretending pain is not real
🙏 Thanks continues inside the pain
📖 The next line explains why

## 🔥 Quench Not the Spirit

"Quench" pictures pouring water over a fire to put it out completely.

The Holy Spirit is pictured here as something alive and active, like a flame.

A church can quietly smother that life through fear or control.

Paul warns against shutting down what God himself is doing.

🔥 Quench means dousing a fire
🕊️ Pictures the Spirit as a flame
🧊 A church can smother that life
📖 Do not shut down God's work

## 🗣️ Despise Not Prophesyings

"Despise" means to look down on something as worthless.

"Prophesyings" refers to spoken messages believed to come from God in gathered worship.

Some in the early church grew suspicious of this gift after it was misused.

Paul protects the gift itself even while warning against misuse later in the same verse.

🗣️ Despise means looking down on something
📣 Prophesyings were spoken messages from God
⚠️ Some had grown suspicious of it
📖 Paul protects the gift itself

## ⚖️ Prove All Things

"Prove" was a word used for testing coins to check they were not counterfeit.

Paul applies that same careful testing to teaching and spiritual claims.

Nothing gets accepted automatically just because it sounds spiritual.

Discernment protects the church from being fooled by something false.

⚖️ Prove means testing like a coin
🪙 Checks for spiritual counterfeits
🚫 Nothing accepted automatically
📖 Discernment protects the church

## ✋ Hold Fast That Which Is Good

"Hold fast" pictures gripping something tightly so it cannot be taken away.

This command follows right after the testing in the verse before it.

Testing without holding on afterward leaves a church with nothing solid.

What passes the test deserves a firm, continuing grip.

✋ Hold fast means gripping tightly
🔗 Follows right after the testing
🏚️ Testing alone leaves nothing solid
📖 What passes deserves a firm grip

## 🙅 Abstain From All Appearance of Evil

"Appearance" here does not mean how something merely looks to other people.

In this older English it means every kind or every form of evil.

Paul is not asking believers to avoid anything that might cause gossip.

He is asking them to avoid every actual form evil can take.

🙅 Appearance means every kind here
🔍 Not just how something looks
🗣️ Not really about avoiding gossip
📖 Covers every actual form of evil

# 1 Thessalonians 5:23-28
# 🕊️ The Very God of Peace Sanctify You Wholly
---
## 🕊️ And the Very God of Peace

"Very" in this older English does not work as a simple intensifier.

It means the real, true God, not an imitation or a lesser power.

"Peace" names a quality of God's own character, not just a mood he gives.

This whole blessing starts by naming exactly who is doing the blessing.

🕊️ Very means the real, true God
🚫 Not just an added intensifier
☮️ Peace names God's own character
📖 Names who gives this blessing

## ✨ Sanctify You Wholly

"Sanctify" means to set something apart completely for God's own use.

"Wholly" rules out a partial or halfway version of that process.

This is not describing a one time moment of decision only.

It describes an ongoing work God does across a believer's whole life.

✨ Sanctify means set apart for God
💯 Wholly rules out a partial version
🔁 Describes an ongoing work
📖 Covers a believer's whole life

## 🧩 Spirit and Soul and Body Be Preserved Blameless

Paul names three parts of a person in this one sentence.

Many scholars debate whether this means three separate pieces or simply the whole person three ways.

Either way, the point is that nothing about a person gets left out.

God's preserving work reaches every part, not just the parts that feel spiritual.

🧩 Names three parts of a person
🤔 Scholars debate the exact meaning
💯 Nothing about a person left out
📖 God's work reaches every part

## ⏳ Unto the Coming of Our Lord Jesus Christ

"Coming" translates a word used in that world for a king's official visit.

Cities would prepare and celebrate ahead of a ruler's arrival like this.

Paul borrows that picture for Christ's own promised return.

This whole blessing is aimed at that one future moment.

⏳ Coming pictures a king's official visit
🏛️ Cities prepared for a ruler's arrival
👑 Paul applies it to Christ's return
📖 The blessing aims at that moment

## 🤝 Faithful Is He That Calleth You

This line answers a question the whole chapter has quietly been building toward.

Can a believer actually be kept blameless until that future day.

Paul's answer does not rest on human effort or willpower at all.

It rests entirely on the God who already called them being faithful to finish it.

🤝 Answers the chapter's quiet question
💪 Not resting on human effort
🙏 Rests on God's own faithfulness
📖 He will finish what he started

## 💋 Greet All the Brethren With an Holy Kiss

A kiss of greeting was a normal custom across that whole culture.

"Holy" marks this one out from any romantic meaning entirely.

Men greeted men and women greeted women this way inside the church.

It expressed real family affection between believers who shared one faith.

💋 A normal greeting custom then
✨ Holy removes any romantic meaning
👥 Kept between the same gender
📖 Expressed real family affection

## 📜 I Charge You by the Lord That This Epistle Be Read

Paul gives a direct command about how this letter should be used.

"Charge" carries real authority, the weight of an order, not a casual request.

He wants it read aloud to every believer gathered in that church.

Letters like this one were already beginning to be treated as Scripture itself.

📜 Charge means a direct order
🔊 To be read aloud publicly
👥 Meant for every believer there
📖 An early step toward Scripture

## 🙏 The Grace of Our Lord Jesus Christ Be With You

Paul closes nearly every letter he writes with almost this exact line.

"Grace" names God's free kindness toward people who have not earned it.

This blessing is not a formality tacked onto the end.

It sends the whole weight of the letter off with one final gift.

🙏 Paul's standard closing line
🎁 Grace means free undeserved kindness
🚫 Not just an empty formality
📖 Sends the letter off with a gift`.trim();

export const FIRST_THESSALONIANS_FIVE_PERSONAL_SECTIONS = parseFirstThessaloniansFiveRawNotes(
  FIRST_THESSALONIANS_FIVE_RAW_NOTES
);
