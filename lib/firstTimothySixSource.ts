export type FirstTimothySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstTimothySixRawNotes(rawText: string): FirstTimothySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstTimothySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*1\s+Timothy\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Timothy 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+1\s+Timothy\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+1\s+Timothy\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Timothy 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Timothy 6:${startVerse}` : `1 Timothy 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Timothy 6 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_TIMOTHY_SIX_RAW_NOTES = `# 1 Timothy 6:1-2
# ⛓️ Servants Under The Yoke
---
## ⛓️ Servants As Are Under The Yoke
"Servants" here means people bound to serve a master, often for life.
Many never chose this status and could not simply quit the job.
"The yoke" pictures a heavy wooden frame joining two oxen for labor.
Paul borrows that image to name how binding this burden really was.

⛓️ Servants means people bound to serve
🐂 Yoke pictures oxen joined for labor
📜 Many never chose this status
📖 Paul names how heavy this was
---
## 🙇 Count Their Own Masters Worthy Of All Honour
Paul gives this instruction even for servants with harsh or unfair masters.
"Worthy of all honour" means full, genuine respect, not grudging politeness.
A servant's attitude at work reflected directly on the church's reputation.
Christian freedom inside the heart never excused open disrespect toward authority.

🙇 Honour here means full real respect
😠 This applied even to harsh masters
⛪ Attitude at work reflected on the church
📖 Inner freedom did not excuse disrespect
---
## 📜 The Name Of God And His Doctrine
"Blasphemed" means spoken against with contempt or mockery.
Paul ties a servant's daily conduct to how outsiders viewed God and the gospel.
A disrespectful servant could make the whole Christian message look false.
Ordinary work became a public testimony, whether anyone noticed it or not.

🗣️ Blasphemed means mocked with contempt
👀 Outsiders judged God by this conduct
⚠️ Bad conduct could discredit the message
📖 Daily work became a real testimony
---
## 🤝 Because They Are Brethren
Verse two addresses the opposite case, a servant with a believing master.
In Christ, master and servant now stood as equal brothers in faith.
That equality could easily tempt a servant to slack off or demand respect.
Paul instead tells them to serve these masters even more faithfully.

🤝 Master and servant were now brothers
⚖️ Equality in Christ was still real
😮 That truth could tempt some to slack
📖 Paul calls for even better service
---
## 🎁 Partakers Of The Benefit
"Partakers of the benefit" points to a master who shared fully in the gospel.
Both master and servant now received the same grace and the same salvation.
Faithful, beloved service honored the shared faith they held in common.
Shared grace, not shared status, was what truly bound them together.

🎁 Partakers means sharing fully together
🙏 Both received the same grace
❤️ Service honored their shared faith
📖 Shared grace bound them together

# 1 Timothy 6:3-5
# ⚔️ Doting About Questions And Strifes
---
## 📚 If Any Man Teach Otherwise
"Teach otherwise" means spreading a different doctrine than what Paul had delivered.
This was a real threat already active inside the church at Ephesus.
Timothy needed a clear standard to measure any new teaching against.
Sound doctrine, not popularity, became the real measuring line.

📚 Teach otherwise means a rival doctrine
⚠️ This threat was already active
📏 Timothy needed a clear standard
📖 Sound doctrine was the real measure
---
## 💊 Wholesome Words
"Wholesome" literally means healthy, the same word used for sound medicine.
True teaching was pictured as medicine that actually heals the hearer.
False teaching might sound clever but left a person spiritually sick.
Paul ties sound words directly to the teaching of Jesus himself.

💊 Wholesome means healthy, like medicine
🤒 False teaching left hearers sick
✝️ True teaching traced back to Jesus
📖 Sound words actually heal people
---
## 🦚 He Is Proud, Knowing Nothing
Paul names a sharp irony in verse four about this kind of teacher.
He claims special knowledge, yet Paul says he knows nothing at all.
"Proud" describes someone puffed up with a false sense of insight.
Real knowledge and real humility were missing at exactly the same time.

🦚 Proud means puffed up falsely
🚫 He claims insight he lacks
🎭 Confidence masked real ignorance
📖 Pride and ignorance arrived together
---
## 🌀 Doting About Questions And Strifes Of Words
"Doting" means an unhealthy, obsessive fixation on a subject.
This teacher loved arguing over wording more than living out real faith.
Paul lists the fruit of this habit, envy, strife, and railings.
Arguments like these built nothing and fed on themselves endlessly.

🌀 Doting means an unhealthy obsession
🗣️ He loved arguing over wording
💔 Envy and strife grew from it
📖 Empty arguments feed on themselves
---
## 🔍 Evil Surmisings
"Surmisings" means suspicions or guesses formed without real evidence.
Paul calls them "evil" because they assumed the worst about other people.
This habit of constant arguing naturally bred constant suspicion as well.
A community built on guesswork like this could not stay healthy for long.

🔍 Surmisings means guesses without evidence
😈 Evil marks assuming the worst
🤝 Trust breaks down under suspicion
📖 Guesswork cannot hold a church together
---
## 💵 Supposing That Gain Is Godliness
Some teachers in Ephesus had begun treating faith as a path to profit.
"Gain" here points to money and social standing a teacher could collect.
They reversed the real order, using godliness as a tool to get rich.
True godliness was never meant to be cashed in for profit.

💵 Gain here means money and status
🔄 They reversed godliness and profit
🙅 Faith became a tool for wealth
📖 Godliness is not a cash machine
---
## 🚪 From Such Withdraw Thyself
"Withdraw" means a real, deliberate distance, not simply polite disagreement.
Paul tells Timothy to separate from teachers who fit this entire description.
This was not about every disagreement, but a settled pattern of corruption.
Some teaching required confrontation elsewhere, but this kind called for distance.

🚪 Withdraw means real deliberate distance
🚫 This targeted a settled pattern
⚖️ Not every disagreement needed this
📖 Some errors call for distance, not debate

# 1 Timothy 6:6-10
# 💰 Godliness With Contentment
---
## 💰 Godliness With Contentment Is Great Gain
Paul takes the word "gain" right back from the false teachers in verse five.
"Contentment" means being satisfied with what a person already has.
True gain was never going to come from chasing profit through religion.
Godliness paired with contentment was already the richest possible life.

💰 Gain gets redefined from verse five
😌 Contentment means being satisfied already
🚫 Real gain never came from profit
📖 Godliness plus contentment is true wealth
---
## 👶 We Brought Nothing Into This World
Paul points Timothy toward the most basic fact about every human life.
A newborn arrives owning nothing, no wealth, and no possessions at all.
That same person will carry nothing out of this world at death either.
Wealth was never a permanent part of anyone's real identity.

👶 Everyone arrives owning nothing at all
⚰️ Everyone leaves owning nothing either
🎭 Wealth was never part of identity
📖 Life frames money as only temporary
---
## 🍞 Food And Raiment Let Us Be Therewith Content
"Raiment" is an older word simply meaning clothing.
Paul names only the most basic human needs in this verse.
Contentment here did not require comfort, luxury, or financial security.
A life with just these two things still counted as genuinely enough.

🍞 Raiment is an old word for clothing
🏠 Paul names only the most basic needs
💎 Comfort and luxury were not required
📖 Basic needs alone can be enough
---
## 🕳️ Fall Into Temptation And A Snare
"Temptation" here describes a real pull toward wanting more than enough.
"Snare" pictures a hidden trap that catches an animal before it notices.
That same pull quietly traps a person long before they ever get rich.
"Foolish and hurtful lusts" describes desires that damage the person who holds them.

🕳️ Snare pictures a hidden trap
🎯 Temptation is a real pull toward more
💔 Foolish lusts damage the one who wants
📖 Wanting riches is the real danger
---
## 🌊 Drown Men In Destruction And Perdition
"Drown" pictures someone pulled under slowly, not destroyed all at once.
"Destruction" points to ruin in this present life, practical and visible.
"Perdition" carries the heavier weight of final, eternal loss.
Paul names both the immediate cost and the ultimate cost in one breath.

🌊 Drown pictures a slow pulling under
💥 Destruction means ruin in this life
⚖️ Perdition means a final eternal loss
📖 Both costs arrive from the same root
---
## 🌱 The Love Of Money Is The Root Of All Evil
This famous line is often misquoted as simply "money is the root of all evil."
Paul names the "love" of money, not money itself, as the real root.
A coin in someone's pocket has no moral weight on its own.
What a person's heart desires decides whether wealth becomes dangerous.

🌱 Love of money is named, not money
💰 Money itself carries no moral weight
❤️ The heart decides the real danger
📖 Desire, not currency, is the root
---
## 🧭 Erred From The Faith
"Erred" means wandering off a path, drifting rather than leaving all at once.
Paul pictures people slowly pulled off course by their pursuit of money.
This was not usually one dramatic decision to abandon belief.
Small, repeated choices about money quietly moved them further away.

🧭 Erred means a slow drifting away
🐌 This was gradual, not sudden
💵 Money pulled them off course
📖 Small choices moved them further
---
## 🗡️ Pierced Themselves Through With Many Sorrows
"Pierced" pictures a self inflicted wound, not harm done by someone else.
These sorrows were the direct result of their own pursuit of wealth.
Paul paints money's promised comfort and its actual cost side by side.
Chasing riches ended up producing exactly the pain it claimed to prevent.

🗡️ Pierced pictures a self inflicted wound
🙋 They caused this harm themselves
⚖️ Promised comfort produced real pain
📖 The chase defeated its own purpose

# 1 Timothy 6:11-16
# 🏆 Fight The Good Fight
---
## 🙋 O Man Of God
"Man of God" was a title used in the Old Testament for prophets like Moses and Elijah.
Paul applies that same weighty title directly to Timothy here.
It marked Timothy as someone set apart for God's own purposes.
The instructions that follow carry the full weight of that title.

🙋 Man of God named prophets before him
📜 Moses and Elijah carried this title
🎯 Timothy was marked for God's purpose
📖 This title adds weight to what follows
---
## 🏃 Flee These Things
"These things" points directly back to the love of money just described.
"Flee" means running away fast, not standing to argue or negotiate.
Some temptations are better outrun than reasoned with face to face.
Paul treats the love of money as exactly that kind of danger.

🏃 Flee means running, not arguing
💰 These things means love of money
⚠️ Some temptations are better outrun
📖 Paul treats money as this kind of danger
---
## 🥊 Fight The Good Fight Of Faith
Paul switches images from running away to standing and fighting hard.
"Fight" pictures real, sustained effort, not a single easy moment.
This battle was fought for faith itself, not against another person.
A life of godliness required both fleeing certain things and fighting for others.

🥊 Fight pictures real sustained effort
🛡️ The battle was fought for faith
🙅 Not a fight against another person
📖 Godliness needs fleeing and fighting both
---
## ✊ Lay Hold On Eternal Life
"Lay hold" means grasping something tightly, the way a person grabs a rope.
Timothy had already been called to this eternal life at his conversion.
He had also professed it publicly in front of many witnesses.
Paul urges him to hold firmly to what he already owned by faith.

✊ Lay hold means grasping tightly
🎯 Timothy was already called to this
🗣️ He professed it before witnesses
📖 He is told to hold what he has
---
## 👑 Who Quickeneth All Things
"Quickeneth" is an old word meaning to give life.
Paul calls on God using this title right before a solemn charge.
The same God who gives life to everything now charges Timothy directly.
That connection makes the charge that follows impossible to take lightly.

👑 Quickeneth means to give life
🌍 God gives life to everything
🎯 This God charges Timothy directly
📖 That weight makes the charge serious
---
## ✝️ Before Pontius Pilate Witnessed A Good Confession
Paul points Timothy to the clearest possible example of standing firm.
Jesus himself testified to the truth even while on trial for his life.
Pilate held real political power to release or condemn him.
Jesus never wavered or softened his answer to avoid that danger.

✝️ Jesus testified while on trial
⚖️ Pilate held real power over him
🗣️ Jesus never softened his answer
📖 This example anchors Timothy's own stand
---
## 🚫 Without Spot, Unrebukeable
"Without spot" pictures a garment kept free of any visible stain.
"Unrebukeable" means no one could rightly bring a valid accusation.
Paul ties this purity to a clear point in the future, Christ's appearing.
Timothy's conduct now was measured against that coming day.

🚫 Without spot pictures a clean garment
🙅 Unrebukeable means no valid accusation
📅 Purity was measured against Christ's return
📖 Future hope shapes present conduct
---
## 👑 The Blessed And Only Potentate
"Potentate" means a sovereign ruler holding supreme and total power.
Paul calls God the only one who truly holds that kind of power.
"King of kings" and "Lord of lords" push that point even further.
Every earthly ruler, including Pilate from the verse before, answers to this one.

👑 Potentate means a supreme ruler
☝️ God alone holds total power
🌍 King of kings tops every throne
📖 Even Pilate answers to this ruler
---
## ✨ Dwelling In The Light Which No Man Can Approach Unto
This light describes God's own glory, far too intense for human eyes.
"No man hath seen, nor can see" admits a real limit on human sight.
Paul is not describing ignorance here.
He is describing God's own sheer greatness instead.

✨ This light is God's own glory
👁️ No human eye could bear it
🌟 This names greatness, not ignorance
📖 The chapter ends lifted toward God

# 1 Timothy 6:17-21
# 👑 Charge Them That Are Rich
---
## 💎 Charge Them That Are Rich In This World
Paul now turns from warning those desiring wealth to addressing the already wealthy.
"In this world" marks their riches as something temporary, tied only to this life.
Wealth itself was not the problem Paul addressed in this instruction.
How a rich person carried that wealth was the real concern here.

💎 This addresses people already wealthy
🌍 In this world marks wealth as temporary
🙅 Wealth itself was not the problem
📖 How they carried it mattered most
---
## 🎈 Not Highminded
"Highminded" means arrogant, looking down on people who have less.
Wealth can quietly convince a person they deserve special treatment.
Paul warns against letting money inflate a person's sense of worth.
Humility was expected regardless of how much a person owned.

🎈 Highminded means arrogant and prideful
👀 Wealth can distort self worth
🙇 Humility was still expected
📖 Money never earns special treatment
---
## 🌫️ Trust In Uncertain Riches
"Uncertain" describes wealth that can vanish quickly through no fault of its owner.
Markets fail and thieves steal without warning.
Fortunes can change within a single lifetime.
Paul contrasts that instability directly with trusting the living God instead.

🌫️ Uncertain means wealth that can vanish
📉 Fortunes can change within a lifetime
🙏 Paul contrasts this with trusting God
📖 Only God offers a lasting foundation
---
## 🎁 Rich In Good Works
Paul flips the word "rich" from money toward generosity and action.
This kind of richness could not be stolen, taxed, or lost in a crash.
"Ready to distribute" and "willing to communicate" both describe real generosity.
True wealth now meant how freely a person gave, not how much they kept.

🎁 Rich now means generous action
🔒 This wealth cannot be stolen
🤲 Ready and willing both mean generous
📖 True wealth is measured by giving
---
## 🏦 Laying Up In Store For Themselves A Good Foundation
Paul pictures generous giving as a kind of savings account for the future.
"Against the time to come" points ahead to eternity, not retirement.
This good foundation supported a person's hold on eternal life itself.
Generosity now became an investment that could never collapse later.

🏦 Giving pictured as real savings
⏳ Time to come points to eternity
🧱 This foundation supported eternal life
📖 Generosity became a lasting investment
---
## 🔒 That Which Is Committed To Thy Trust
"Committed to thy trust" pictures something valuable handed over for safekeeping.
Timothy had been given the gospel itself to guard and protect.
A trust like this carried real responsibility, not casual ownership.
Guarding the gospel was the most serious trust Timothy could carry.

🔒 This pictures something handed for safekeeping
📘 Timothy was entrusted with the gospel
⚖️ A trust carries real responsibility
📖 Guarding the gospel was his highest trust
---
## 🗣️ Oppositions Of Science Falsely So Called
"Science" here is an old word simply meaning knowledge, not modern laboratories.
Some teachers claimed access to secret, superior spiritual knowledge.
Many scholars believe this points toward an early form of what became Gnosticism.
Paul calls this knowledge false, despite its confident and impressive claims.

🗣️ Science here means claimed knowledge
🔮 Some claimed secret spiritual insight
📜 This likely points toward early Gnosticism
📖 Paul calls this knowledge false
---
## 🙏 Grace Be With Thee
Paul closes this letter the same simple way he opened it.
This short blessing asks for God's continued favor over Timothy personally.
After chapters of hard instruction, the letter ends on pure kindness.
Grace, not performance, remained the real foundation under everything Paul had written.

🙏 Grace closes the letter simply
❤️ This blessing covers Timothy himself
🕊️ The letter ends on real kindness
📖 Grace remains the true foundation
`.trim();

export const FIRST_TIMOTHY_SIX_PERSONAL_SECTIONS = parseFirstTimothySixRawNotes(FIRST_TIMOTHY_SIX_RAW_NOTES);
