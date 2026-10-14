export type SecondCorinthiansTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondCorinthiansTenRawNotes(rawText: string): SecondCorinthiansTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondCorinthiansTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondCorinthians\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Corinthians 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondCorinthians\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondCorinthians\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Corinthians 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Corinthians 10:${startVerse}` : `2 Corinthians 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Second Corinthians 10 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CORINTHIANS_TEN_RAW_NOTES = `# SecondCorinthians 10:1-3
# 🛡️ A Different Kind Of Fight
---
## 🙏 Now I Paul Myself Beseech You

Paul suddenly switches from "we" to his own name here.

That shift signals personal weight.

"Beseech" means to plead or urge.

It is not a casual request.

Paul stops hiding behind a group voice.

He speaks for himself in this part.

🙏 Paul writes in his own name

✍️ The shift signals personal weight

🗣️ Beseech means to plead, not ask lightly

📖 He speaks for himself here

## 🕊️ The Meekness And Gentleness Of Christ

"Meekness" does not mean weakness.

It means strength that stays under control.

"Gentleness" means a mild and patient manner.

Christ had power but chose restraint.

Paul appeals to that same pattern.

💪 Meekness means controlled strength

🕊️ Gentleness means a patient manner

✝️ Christ had power but chose restraint

📖 Paul appeals to that pattern

## 😶 In Presence Am Base Among You, But Being Absent Am Bold

This is the accusation Paul answers in this chapter.

"Base" is an old word for humble or lowly looking.

Critics said Paul seemed weak face to face.

They said he only sounded bold from a distance.

Paul quotes their own accusation before he answers it.

😶 Base means humble or lowly looking

📝 Critics called his letters bold

👤 They thought him weak in person

📖 Paul quotes the accusation first

## 🤞 That I May Not Be Bold When I Am Present

Paul hopes he will not need that boldness face to face.

He would rather settle this through a letter first.

Strong authority in person was always his last resort.

The warning here is also a real hope.

🤞 Paul hopes it will not come to that

✍️ He prefers to settle this by letter

⚠️ Strong authority was his last resort

📖 The warning is also a hope

## 🚶 Which Think Of Us As If We Walked According To The Flesh

"Walked according to the flesh" is not a moral accusation here.

It means operating by worldly methods.

Status, rhetoric, and self promotion are examples of those methods.

Some in Corinth accused Paul of acting that way.

Paul is about to answer that exact charge.

🚶 Walking after the flesh means worldly methods

🗣️ It is not a moral accusation here

🎭 Status and rhetoric are examples

📖 Paul is about to answer this charge

## 🧍 Though We Walk In The Flesh

Paul admits he still lives in a normal human body.

He never claims to be above ordinary human weakness.

The point is not that Paul is superhuman.

The real question is where his power actually comes from.

🧍 Paul admits ordinary human weakness

🙅 He never claims to be superhuman

🔑 The real question is his power's source

📖 That answer comes next

## ⚔️ We Do Not War After The Flesh

"War after the flesh" means fighting with worldly weapons.

Intimidation and clever argument are examples of those weapons.

Paul switches to a military picture for this whole section.

His rivals in Corinth likely fought that way.

Paul refuses to fight on those terms.

⚔️ War after the flesh means worldly tactics

🗣️ Rivals likely used rhetoric and attacks

🙅 Paul refuses that kind of fight

📖 A different weapon is coming

# SecondCorinthians 10:4-6
# 🏰 Weapons That Tear Down Strongholds
---
## 🛡️ The Weapons Of Our Warfare Are Not Carnal

"Carnal" means merely human or physical.

Paul does not fight with money, status, or force.

His real weapons are things like truth and prayer.

Critics judged him by carnal standards like appearance.

Spiritual weapons fight an entirely different kind of war.

🙅 Carnal means merely human or physical

🙏 Paul's weapons are truth and prayer

🎯 Critics judged him by carnal standards

📖 Spiritual weapons fight a different war

## 🏰 Mighty Through God To The Pulling Down Of Strong Holds

A "stronghold" was a fortified position built for a long siege.

Ancient cities often had walls meant to outlast any attack.

Paul applies that picture to deeply rooted false beliefs.

No human weapon could break through walls like that.

God's power is what actually brings them down.

🏰 Strongholds were fortified, hard to break

🧠 Paul applies it to false beliefs

💥 No human weapon could break through

📖 God's power brings the walls down

## 🧠 Casting Down Imaginations

"Imaginations" here means proud reasonings, not daydreams.

These are arguments people build to ignore God.

Paul pictures tearing these reasonings down like a wall.

A clever argument against God is still just another wall.

🧠 Imaginations means proud reasonings

🧱 These are arguments against God

🔨 Paul pictures tearing them down

📖 A clever argument is still a wall

## 🗼 Every High Thing That Exalteth Itself Against The Knowledge Of God

"High thing" pictures a tower of pride raised against God.

This could be a philosophy, a reputation, or a confident opinion.

Anything placed above what God has revealed fits this category.

The cleverness of the idea does not exempt it.

🗼 High thing pictures a tower of pride

🧩 It can be a philosophy or opinion

🙅 Anything placed above God counts

📖 Cleverness does not exempt it

## ⛓️ Bringing Into Captivity Every Thought To The Obedience Of Christ

"Captivity" pictures a prisoner taken after a battle.

Paul applies that image to a person's own thoughts.

Every thought now marches under the authority of Christ.

This is not about losing freedom.

It is about who that freedom actually serves.

⛓️ Captivity pictures a prisoner after battle

🧠 Paul applies it to private thoughts

✝️ Thoughts now answer to Christ

📖 Freedom still needs a master to serve

## ⚖️ Having In A Readiness To Revenge All Disobedience

This is not Paul plotting personal revenge on his critics.

"Revenge" here means church discipline, not an emotional payback.

Paul waits until most of the Corinthians are clearly obedient.

Only then will he deal firmly with the troublemakers left.

⚖️ Revenge means discipline, not payback

⏳ Paul waits for their obedience first

🎯 Troublemakers are dealt with afterward

📖 Discipline follows loyalty

# SecondCorinthians 10:7-11
# 👀 Appearances And Accusations
---
## 👀 Do Ye Look On Things After The Outward Appearance

Paul's critics judged leaders by confidence and polish.

That standard rewards performance over substance.

Paul asks the Corinthians to look past appearances.

This question exposes their real problem.

👀 Outward appearance means surface impressions

🎭 That standard rewards performance over truth

🙅 Paul asks them to look deeper

📖 Their standard was the real problem

## 🙋 As He Is Christ's, Even So Are We Christ's

Some leader in Corinth apparently claimed a special belonging to Christ.

Paul will not let that claim go unanswered.

He insists his own standing with Christ is just as real.

Belonging to Christ is not ranked by status.

🙋 Someone claimed special belonging to Christ

🙅 Paul refuses to concede that

⚖️ His own standing is equally real

📖 Belonging to Christ is not ranked

## 😌 I Should Not Be Ashamed

Paul says he would not actually be ashamed to boast about this.

His authority was real, given directly by the Lord.

Boasting about a God given calling differs from empty self promotion.

Paul simply chooses not to lean on that boast here.

💪 Paul would not be ashamed to boast

✝️ His authority came directly from the Lord

🙅 This differs from empty self promotion

📖 He chooses restraint instead

## 🏗️ Which The Lord Hath Given Us For Edification, And Not For Your Destruction

"Edification" means building something up, like constructing a house.

Paul's authority was meant to strengthen the church.

It was never meant to tear the church down.

He names that purpose before he uses any of his authority.

That purpose becomes the test for how power should be used.

🏗️ Edification means building something up

🙅 Destruction is the opposite goal

🎯 Purpose comes before any use of power

📖 That purpose tests how power is used

## 😨 That I May Not Seem As If I Would Terrify You By Letters

Paul's critics painted his letters as attempts to scare the church.

Paul pushes back on that specific reading of his own words.

He wants correction received as care.

Intimidation was never his actual goal.

😨 Critics called his letters intimidation

🙅 Paul rejects that reading

❤️ He wants correction read as care

📖 Intent and reception are not the same

## 💬 For His Letters, Say They, Are Weighty And Powerful

"Say they" marks this as a quote from Paul's critics.

It is not Paul's own opinion of his writing.

Even his critics admitted his letters carried real force.

Paul is about to reuse their own words against them.

💬 Say they marks this as a quote

✍️ Even critics called his letters powerful

🎯 Paul reuses their words next

📖 He lets their own compliment stand

## 😕 But His Bodily Presence Is Weak, And His Speech Contemptible

"Contemptible" means worthy of scorn, not simply unimpressive.

Ancient audiences valued polished, trained public speaking highly.

Paul apparently did not meet that performance standard.

His critics said so bluntly, to his face.

😕 Contemptible means worthy of scorn

🗣️ Trained public speaking was highly valued then

📉 Paul did not meet that standard

📖 Critics judged him by stage presence

## ✍️ Such Will We Be Also In Deed When We Are Present

Paul promises his letters and his actions will match completely.

There will be no gap between what he writes and what he does.

This directly answers the accusation back in verse one.

Consistency itself becomes Paul's defense here.

✍️ Words and actions will match

🚫 No gap between letter and visit

🔁 This answers verse one directly

📖 Consistency becomes Paul's defense

# SecondCorinthians 10:12-16
# 📏 Measuring By God's Rule, Not Your Own
---
## 🙋 Of The Number Of Them That Commend Themselves

Some leaders in Corinth openly praised themselves and their own ministries.

Paul refuses to join that comparison contest.

Stepping into that game would mean accepting its rigged rules.

Refusing to compete is itself an answer.

🙋 Some leaders praised themselves openly

🙅 Paul refuses to join that contest

🎲 The comparison game had rigged rules

📖 Refusing to play is an answer

## 📝 Measuring Themselves By Themselves, And Comparing Themselves Among Themselves

Picture grading your own test using an answer key you wrote yourself.

That is the exact mistake Paul describes here.

A standard only means something if it comes from outside the person being measured.

Paul calls this approach plainly unwise.

📝 Grading your own test with your own key

🔁 Self made standards prove nothing

📏 A real standard comes from outside

📖 Paul calls this plainly unwise

## 📏 According To The Measure Of The Rule Which God Hath Distributed To Us

"Rule" here is an old word for a measuring reed.

It is the same root behind our word canon.

Paul pictures God assigning each worker a measured area of ministry.

Corinth falls inside the boundary God assigned to Paul.

He is not reaching into territory that was never his.

📏 Rule means a measuring reed

🗺️ God assigns each worker a measured area

✅ Corinth falls inside Paul's assigned area

📖 He stays inside his own boundary

## 🌱 We Are Come As Far As To You Also In Preaching The Gospel

Paul personally founded the church in Corinth.

He is not intruding on ground someone else first broke.

His rivals arrived only after Paul's own work was done.

This quietly settles who actually has authority here.

🌱 Paul personally founded this church

🚫 He is not intruding on another's ground

👥 Rivals arrived after his work was done

📖 This settles who has real authority here

## 🏗️ Of Other Men's Labours

Paul refuses to take credit for work other people started.

His rivals seem comfortable building reputations on groundwork they did not lay.

Paul draws a clear line between founding something and moving into it.

🙅 Paul will not claim others' work

🏗️ Rivals built on groundwork they did not lay

📏 Founding and moving in differ

📖 Paul keeps that line clear

## 📈 That We Shall Be Enlarged By You According To Our Rule Abundantly

Paul hopes the Corinthians' growing faith will expand his ministry's reach.

"Enlarged" pictures his assigned territory growing wider.

It does not picture his own reputation growing.

Their strength becomes the platform for Paul to go further.

📈 Enlarged pictures a growing territory

🙏 Their growth drives this, not Paul's effort

🤝 Their strength becomes his platform

📖 This hope leans on their faith

## 🗺️ To Preach The Gospel In The Regions Beyond You

Paul already has his sights set past Corinth.

Romans fifteen later names Spain as part of that goal.

His ambition was reaching places no one had preached yet.

Stealing credit for another man's finished work never appealed to him.

🗺️ Paul already looked past Corinth

🇪🇸 Spain is named later as part of this

🧭 He wanted unreached places, not finished ones

📖 Stealing credit never appealed to him

# SecondCorinthians 10:17-18
# 🙌 Glory Belongs To The Lord
---
## 📜 He That Glorieth, Let Him Glory In The Lord

This line quotes an Old Testament command almost word for word.

Jeremiah nine carries the same phrase first.

Paul has spent this whole chapter refusing to boast about himself.

Here he finally names where boasting actually belongs.

📜 This quotes Jeremiah nine closely

🙅 Paul refused self boasting all chapter

🙌 Here he names where boasting belongs

📖 One line answers the whole chapter

## ✅ Not He That Commendeth Himself Is Approved, But Whom The Lord Commendeth

"Commendeth" means to officially approve or praise someone's work.

Self praise carries no real weight.

Confidence alone does not make it true.

Approval that actually matters only comes from the Lord.

✅ Commendeth means official approval

🙅 Self praise carries no real weight

🙏 Only the Lord's approval matters

📖 This settles the chapter's whole argument
`.trim();

export const SECOND_CORINTHIANS_TEN_PERSONAL_SECTIONS = parseSecondCorinthiansTenRawNotes(SECOND_CORINTHIANS_TEN_RAW_NOTES);
