export type SecondCorinthiansFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondCorinthiansFiveRawNotes(rawText: string): SecondCorinthiansFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondCorinthiansFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondCorinthians\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Corinthians 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondCorinthians\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondCorinthians\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Corinthians 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Corinthians 5:${startVerse}` : `2 Corinthians 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Second Corinthians 5 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CORINTHIANS_FIVE_RAW_NOTES = `# SecondCorinthians 5:1-5
# 🏕️ A Tent We Will One Day Leave
---
## 🏕️ Our Earthly House Of This Tabernacle

"Tabernacle" means a tent, a shelter built to be temporary.

Paul compares the human body to a tent used only for a short stay.

A tent can be comfortable for now.

Still nobody expects to live inside one forever.

This body serves its purpose today, but it was never built to last without end.

⛺ Tabernacle means a temporary tent

🏠 Paul compares the body to a tent

⏳ No tent is built to last

➡️ Something better waits beyond this tent

## 🏗️ We Have A Building Of God

This building is not a house made of wood or stone.

It is the new body God prepares for everyone who trusts Him.

Paul sets it directly against the tent just described.

A tent gets taken down one day.

A building stands.

🏗️ Building means the body God prepares

🆚 Set against the tent just described

⛺ A tent comes down one day

📖 A building is made to stand forever

## 🏛️ Not Made With Hands, Eternal In The Heavens

"Not made with hands" means no human effort built it.

This points to a resurrection body that only God can make.

"Eternal in the heavens" means it will never wear out or fade.

The tent wears down over years.

This new body never will.

🙅 Not made with hands means no human effort

✝️ Only God can make this new body

♾️ Eternal means it will never wear out

📖 The tent fades, this new body never will

## 😩 For In This We Groan

"Groan" describes a deep, wordless longing a person feels but struggles to say out loud.

Paul is not groaning from doubt or despair.

He already described this same groan back in chapter four.

It is the ache of living in a body that is wearing out.

The ache sits alongside real trust in God.

😩 Groan means a deep wordless longing

🚫 Not doubt or despair

📜 Chapter four named this same groan

➡️ Trust and groaning can live together

## 👕 Earnestly Desiring To Be Clothed Upon

"Clothed upon" pictures putting on a new garment over what a person already wears.

Paul is not asking to lose his body completely.

He is longing for his new body to be added like a covering.

The groan in this verse is a homesick kind of longing.

It reaches toward the heavenly house just described.

👕 Clothed upon means a covering added

🙅 Not asking to lose this body

🏠 Longing for the heavenly house to come

📖 The groan here is a homesick longing

## 👻 Not Be Found Naked

This does not mean Paul fears a literal lack of clothes.

"Naked" here pictures a soul without any body at all.

Paul wants to be certain he receives a new body, not simply lose this one.

The hope is addition, not loss.

🙅 Not about literal clothing or shame

👻 Naked pictures a soul without a body

➕ Paul hopes for addition, not loss

📖 The soul was never meant to be bodiless

## ⚖️ Do Groan, Being Burdened

"Burdened" describes the weight of pain, sickness, and age pressing down on a body.

Paul admits this honestly instead of pretending faith removes all hardship.

The groan is real.

It does not come from wanting less life.

It comes from wanting more life than this body can hold.

⚖️ Burdened means weight pressing down on the body

🗣️ Paul admits hardship honestly

➕ The groan wants more life, not less

📖 More life than this body can hold

## 💀 Mortality Might Be Swallowed Up Of Life

"Mortality" means the part of a person that can die.

"Swallowed up" pictures something completely overtaken, with nothing left of it.

Paul does not hope for death to be softened.

He hopes for death to be erased entirely by life.

💀 Mortality means the part that can die

🌊 Swallowed up means completely overtaken

🚫 Not softened, but erased completely

📖 Life will overtake death entirely

## 🔨 Wrought Us For The Selfsame Thing

"Wrought" means made or shaped by careful work.

"The selfsame thing" points back to the new body just described.

Paul is clear that a person cannot build this new body by effort.

God alone shapes a person for this future.

🔨 Wrought means shaped by careful work

🎯 The selfsame thing means the new body

🙅 No person can build this alone

📖 God alone shapes a person for this

## 💰 The Earnest Of The Spirit

"Earnest" means a deposit paid now that guarantees a larger payment later.

The Holy Spirit living in a believer works the same way.

Think of a deposit paid to hold a house before moving day arrives.

The deposit itself is real, even though the full home is not handed over yet.

The Spirit is proof the rest of the promise is coming.

💰 Earnest means a deposit guaranteeing more

🏠 Think of a deposit that holds a house

🕊️ The Spirit lives in a believer now

📖 The Spirit proves the rest is coming

# SecondCorinthians 5:6-10
# ⚖️ Confident Before The Judgment Seat
---
## 💪 Always Confident

"Confident" here means a settled courage, not a passing mood.

This confidence comes directly from the earnest of the Spirit just described.

Paul is not promising comfort in every circumstance.

He is naming a steady trust that holds no matter what the body faces.

💪 Confident means settled courage

🕊️ Comes from the Spirit already given

🌊 Not comfort in every circumstance

📖 A steady trust that always holds

## 🏠 At Home In The Body, We Are Absent From The Lord

"At home in the body" means living this normal, physical, everyday life.

"Absent from the Lord" does not mean God has left a person.

It means a person has not yet seen the Lord face to face.

Paul draws a clear line between life now and what comes after.

🏠 At home means ordinary daily life

🙅 Absent does not mean God left

👀 Means not yet seeing Him face to face

📖 Life now differs from what comes after

## 🚶 We Walk By Faith, Not By Sight

"Walk" describes the whole pattern of daily life and decisions.

"Faith" means trusting what God has said, even without seeing it yet.

"Sight" means relying only on what the eyes can prove.

Paul says the Christian life runs on trust, not on visible proof.

🚶 Walk means the whole pattern of life

🙏 Faith means trusting without seeing yet

👁️ Sight means needing visible proof

📖 Trust leads this life, not visible proof

## 🙅 Willing Rather To Be Absent From The Body

This does not mean Paul wants to escape life through despair.

"Absent from the body" means leaving this physical body behind at death.

"Present with the Lord" means standing with Christ immediately after.

Paul says this preference openly, without fear of what death actually is.

🙅 Not escape through despair

⚰️ Absent from the body means death

✝️ Present with the Lord means standing with Him

📖 Paul names death without fear

## 💪 Wherefore We Labour

"Labour" means ongoing, deliberate effort, not an occasional task.

Knowing what waits after death does not make Paul stop working now.

It gives his daily work a clear purpose.

The hope of heaven fuels effort on earth instead of replacing it.

💪 Labour means ongoing deliberate effort

🚫 Hope does not stop the work

🎯 It gives daily work a purpose

📖 Heaven's hope fuels effort, not laziness

## ✅ Accepted Of Him

"Accepted" means approved and welcomed, not merely tolerated.

Paul's goal in laboring is to please the Lord, whether he is alive or already gone.

The outcome he wants is the same in both conditions.

Pleasing Christ, not personal comfort, is the real target.

✅ Accepted means approved and welcomed

🎯 The goal is pleasing the Lord

⚖️ The same goal in life or death

📖 Pleasing Christ is the real target

## ⚖️ The Judgment Seat Of Christ

A "judgment seat" was a raised platform where a ruler announced an official verdict.

Many scholars believe Paul is picturing the bema, a seat used by Roman officials.

This is not the final judgment that decides heaven or hell.

It is an evaluation of how a believer already saved has actually lived.

⚖️ Judgment seat means an official verdict platform

🏛️ Likely pictures a Roman bema seat

🙅 Not the judgment deciding heaven or hell

📖 It evaluates how a believer has lived

## 📋 Receive The Things Done In His Body

"The things done in his body" means every real action from this earthly life.

Paul is not describing a vague, general review.

He is describing specific actions brought into account.

Nothing done in this body quietly disappears.

📋 The things done means real actions

🙅 Not a vague general review

🔍 Specific actions are brought into account

📖 Nothing done in the body disappears

## ⚖️ Whether It Be Good Or Bad

This judgment covers a believer's whole life.

Good works receive reward.

Wasted or sinful choices still get named honestly.

This is an honest accounting, not a loss of salvation.

⚖️ Covers a believer's whole life

🏆 Good works receive real reward

🔥 Wasted choices get named honestly

📖 This is accounting, not losing salvation

# SecondCorinthians 5:11-13
# 🔥 The Terror Of The Lord
---
## 😨 The Terror Of The Lord

"Terror" here means a reverent, sober fear of standing before a holy judge.

This connects directly to the judgment seat just described.

Paul is not describing a cowering, anxious fear.

Knowing that account is coming shapes how he lives and preaches right now.

😨 Terror means reverent sober fear

⚖️ Connects to the judgment seat

🙅 Not cowering or anxious fear

📖 This fear shapes how Paul lives now

## 🗣️ We Persuade Men

Paul preaches the gospel with real urgency because that coming account is real.

"Persuade" means actively trying to convince, not casually presenting an idea.

This is not manipulation for personal gain.

It is honest urgency born from knowing what is at stake.

🗣️ Persuade means actively trying to convince

🔥 Comes from knowing judgment is real

🙅 Not manipulation for personal gain

📖 Honest urgency, not a sales pitch

## 👁️ Made Manifest Unto God

"Manifest" means fully visible, with nothing hidden.

Paul says God already sees him completely, motives included.

He is not performing for an audience he can fool.

Every hidden motive stands open before God right now.

👁️ Manifest means fully visible

🙏 God already sees Paul completely

🎭 No performing for an audience

📖 Hidden motives stand open before God

## 📣 Commend Not Ourselves Again

"Commend" means to recommend or promote oneself.

Paul already defended his ministry earlier in this letter.

He is not repeating that defense to boost his own reputation.

He is giving the Corinthians a reason to be proud of him in front of others.

📣 Commend means promoting oneself

🙅 Not repeating an old defense

🎁 Giving Corinthians a reason to be proud

📖 This is for their benefit, not his pride

## 🎭 Glory In Appearance, And Not In Heart

"Appearance" means outward show, titles, rhetoric, and impressive credentials.

"Heart" means a person's real character underneath all of that.

Some teachers in Corinth were judged only by outward show.

Paul wants the Corinthians able to answer those critics with something deeper than appearance.

🎭 Appearance means outward show and titles

❤️ Heart means real character underneath

👎 Some teachers were judged only by show

📖 Paul offers something deeper than appearance

## 🔥 Whether We Be Beside Ourselves

"Beside ourselves" means acting with intense, overflowing zeal that can look strange to onlookers.

"Sober" means calm, careful, ordinary behavior.

Paul admits both sides of his ministry exist.

Either way, the purpose stays the same.

It serves God's glory and the Corinthians' good.

🔥 Beside ourselves means intense overflowing zeal

😌 Sober means calm ordinary behavior

🤝 Both sides belong to his ministry

📖 Either way serves God and the church

# SecondCorinthians 5:14-15
# ✝️ Love That Leaves No Other Direction
---
## 🧱 The Love Of Christ Constraineth Us

"Constraineth" means to press in from every side, leaving no room to go another direction.

This is not guilt pushing Paul forward.

Christ's love surrounds him so completely that it controls every choice he makes.

A river between two banks only has one direction it can flow.

🧱 Constraineth means pressed in from every side

🙅 Not guilt, but love

🌊 Love controls every choice Paul makes

📖 Love leaves only one direction to go

## ✝️ If One Died For All, Then Were All Dead

Christ's death proves something true about every person, not just about Christ.

Everyone was already dead in sin before Christ ever died.

His death was not a rescue from a minor problem.

It answered a condition every single person already shared.

✝️ Christ's death reveals the truth about everyone

💀 Everyone was already dead in sin

🙅 Not a rescue from a small problem

📖 Christ answered a condition everyone shared

## ⏳ Should Not Henceforth Live Unto Themselves

"Henceforth" means from this point onward.

"Live unto themselves" means living only for personal comfort and interest.

Christ's death changes the direction of an entire life, not just a person's final destination.

Self interest is no longer the center.

⏳ Henceforth means from this point onward

🪞 Live unto themselves means living for self

🔄 Christ's death redirects a whole life

📖 Self interest is no longer the center

## ✝️ Unto Him Which Died For Them, And Rose Again

A new life now centers on Christ instead of self.

"Rose again" matters as much as "died."

A dead savior could inspire nothing.

A risen savior gives a reason to live differently every day.

✝️ Life now centers on Christ

⚰️ Died matters, but rising matters too

💀 A dead savior could not inspire this

📖 A risen savior changes how a person lives

# SecondCorinthians 5:16-17
# 🐣 A New Creature
---
## 👔 Know We No Man After The Flesh

"After the flesh" means judging someone only by outward status, background, or appearance.

Paul once evaluated people that way himself, by rank, nation, and religious credentials.

The cross changes how a believer sees every other person.

Outward categories no longer decide a person's worth.

👔 After the flesh means outward status

🔄 Paul once judged people this way

✝️ The cross changes how people are seen

📖 Outward categories no longer decide worth

## 👳 Though We Have Known Christ After The Flesh

This likely refers to judging Jesus only as a man from Nazareth, a Jewish teacher among many others.

Paul may be thinking of how some once viewed Jesus before fully trusting Him.

That outward view misses who Jesus actually is.

Knowing Christ now means knowing Him as risen Lord, not merely as a historical figure.

👳 This likely means judging Jesus as a man

🕍 A teacher from Nazareth, nothing more

🙅 That outward view misses who He is

📖 Christ is known now as risen Lord

## 🐣 A New Creature

"New creature" means a new kind of existence, not an improved version of the old one.

This is not a fresh start on the same foundation.

It is an entirely new creation, the same word used for Genesis itself.

Being in Christ changes what a person actually is, not only what a person does.

🐣 New creature means a new existence

🙅 Not just an improved old self

🌍 The same word used for creation

📖 Being in Christ changes what a person is

## 📜 Old Things Are Passed Away

"Old things" means the former identity, habits, and direction of a life without Christ.

"Passed away" means they are genuinely gone, not simply covered over.

This is not pretending the past never happened.

It means that past no longer defines who a person is now.

📜 Old things means the former identity

🚫 Passed away means truly gone

🙅 Not pretending the past never happened

📖 The past no longer defines the person

## 🌱 All Things Are Become New

This covers more than feelings or good intentions.

It touches a person's purpose, relationships, and direction all at once.

Paul does not say some things improved.

He says everything is genuinely new.

🌱 Covers more than feelings alone

🧭 Purpose, relationships, and direction all change

🙅 Not just improvement

📖 Everything is genuinely new

# SecondCorinthians 5:18-19
# 🤝 Given The Ministry Of Reconciliation
---
## 🌱 All Things Are Of God

The new creation just described did not start with human effort.

"Of God" means the source and the credit both belong to Him.

A person cannot manufacture this new identity on their own.

God initiates it from beginning to end.

🌱 The new creation began with God

🏆 Credit and source both belong to Him

🙅 No person can manufacture this themselves

📖 God initiates it from start to finish

## 🤝 Reconciled Us To Himself By Jesus Christ

"Reconciled" means two parties who were at odds are now brought back into peace.

Sin had placed humanity at odds with God.

Jesus Christ is the one who closes that distance.

The peace did not come from a human apology.

It came through His work alone.

🤝 Reconciled means enemies brought back to peace

⚔️ Sin had placed humanity at odds with God

✝️ Christ closes that distance

📖 Peace came through His work, not apology

## 📋 The Ministry Of Reconciliation

"Ministry" means an assigned task, not a suggestion or a hobby.

God gives believers the job of carrying this same peace to others.

This is not limited to apostles or pastors alone.

Anyone reconciled to God is handed this same assignment.

📋 Ministry means an assigned task

🕊️ Believers carry this peace to others

🙅 Not limited to apostles or pastors

📖 Every believer is handed this assignment

## ✝️ God Was In Christ, Reconciling The World Unto Himself

This is one of the clearest statements in the whole Bible about who Jesus is.

God was not sending a messenger from a distance.

God himself was personally present in Christ.

The reconciling work and God's own presence cannot be separated.

✝️ One of the clearest statements about Jesus

📨 Not a messenger sent from a distance

🙌 God himself was present in Christ

📖 His presence and His work cannot separate

## 📒 Not Imputing Their Trespasses Unto Them

"Imputing" means counting something against a person's record.

"Trespasses" means specific wrongs, not a vague general flaw.

God chooses not to charge those wrongs against the people who trust Him.

The debt is real.

It is simply not placed on their account.

📒 Imputing means counting against a record

⚠️ Trespasses means specific wrongs

🙅 God does not charge those wrongs

📖 The debt is real but not charged

## 📜 The Word Of Reconciliation

"The word" here means the actual message believers are trusted to deliver.

It is not a vague feeling or a private experience alone.

It is a specific message.

God offers peace through Christ.

Believers carry real words, not only a changed life.

📜 The word means an actual message

🙅 Not a vague feeling alone

🗣️ The message, God offers peace in Christ

📖 Believers carry words, not just a changed life

# SecondCorinthians 5:20-21
# 🎖️ Ambassadors Pleading On Christ's Behalf
---
## 🎖️ Ambassadors For Christ

An "ambassador" represents a king in a foreign land, speaking with the king's own authority.

An ambassador never announces personal opinions.

Paul says believers carry Christ's own message into the world this same way.

The words carry real weight because of who sent them.

🎖️ Ambassador means an official representative

👑 Speaks with the king's own authority

🙅 Never personal opinions

📖 Believers carry Christ's message with real weight

## 🙏 As Though God Did Beseech You By Us

"Beseech" means to beg or plead earnestly.

God himself is pictured pleading through a human messenger.

This is not a distant command barked from far away.

It is an urgent, personal plea carried through ordinary people.

🙏 Beseech means to beg or plead

👑 God pleads through a human messenger

🙅 Not a distant cold command

📖 An urgent plea carried by ordinary people

## 🤲 Be Ye Reconciled To God

This command sounds strange since God has already done the reconciling work.

The call is to receive peace God has already offered, not to earn it.

A gift still has to be personally accepted.

An open hand holding a gift means nothing until someone actually takes it.

🤲 The command is to receive, not earn

🎁 God already finished the reconciling work

✋ A gift still must be accepted

📖 An open hand still needs a taker

## 😇 Made Him To Be Sin For Us, Who Knew No Sin

Jesus never sinned, not even once.

Yet God treated Him as though He carried every sin ever committed.

This is not Christ becoming sinful in His own character.

It is Christ legally bearing the full weight and penalty of sin.

😇 Jesus never sinned, not even once

⚖️ God treated Him as if He had

🙅 Not becoming sinful in character

📖 He legally bore the full penalty

## 🔄 The Righteousness Of God In Him

This is the trade at the center of the whole chapter.

Christ took on what belonged to sinners, their guilt.

Believers receive what belonged only to Christ, His righteousness.

Nothing in this chapter was ever about human effort earning a place with God.

🔄 This is the chapter's central trade

⚖️ Christ took on the guilt of sinners

🎁 Believers receive Christ's own righteousness

📖 None of this is earned by human effort
`.trim();

export const SECOND_CORINTHIANS_FIVE_PERSONAL_SECTIONS = parseSecondCorinthiansFiveRawNotes(SECOND_CORINTHIANS_FIVE_RAW_NOTES);
