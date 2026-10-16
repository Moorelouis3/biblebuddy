export type SecondThessaloniansTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondThessaloniansTwoRawNotes(rawText: string): SecondThessaloniansTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondThessaloniansTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*2\s+Thessalonians\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Thessalonians 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+2\s+Thessalonians\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+2\s+Thessalonians\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Thessalonians 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Thessalonians 2:${startVerse}` : `2 Thessalonians 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Thessalonians 2 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_THESSALONIANS_TWO_RAW_NOTES = `# 2 Thessalonians 2:1-2
# ⏳ A Warning Not To Be Shaken
---
## 🙏 We Beseech You, Brethren

"Beseech" means a strong, urgent plea, not a light request.

Paul is not casually asking something small here.

He is pleading over something that really matters to him.

The subject is serious enough to open the whole chapter this way.

🙏 Beseech means a strong urgent plea
❗ Not a casual request
📢 Paul opens with real urgency
📖 The subject matters enough to plead

## 🤝 Our Gathering Together Unto Him

This phrase points to believers being gathered to Christ at his coming.

Paul had already described this same gathering in his first letter.

It is the same event, not a separate one introduced here.

Some in Thessalonica were confused about whether that day had already passed.

🤝 Gathering means being gathered to Christ
📜 Already described in the first letter
🔁 Same event, not a new one
📖 Confusion was forming about this day

## 😧 Soon Shaken In Mind, Or Be Troubled

"Shaken in mind" means thrown into confused anxious thinking.

"Troubled" adds a deeper sense of real alarm, not mild worry.

Paul names two different reactions he wants them to avoid.

Rumors about the day of Christ had clearly reached this church.

😧 Shaken means thrown into confusion
😱 Troubled means real alarm
🗯️ Paul names two different reactions
📖 Rumors had reached this church

## ✉️ Neither By Spirit, Nor By Word, Nor By Letter As From Us

Paul lists three ways a false claim about the day of Christ could spread.

"Spirit" here means a claimed prophecy or spiritual message.

"Word" means a rumor passed along by mouth.

"Letter" means a forged document pretending to come from Paul himself.

Someone may have been spreading false teaching under his name.

✉️ Three sources named for false claims
🗣️ Spirit means a claimed prophecy
👂 Word means a spoken rumor
📖 A forged letter could carry his name

# 2 Thessalonians 2:3-5
# ⚠️ The Falling Away And The Man Of Sin
---
## 🚫 Let No Man Deceive You By Any Means

Paul opens with a direct command to guard against deception.

False claims about Christ's coming were already circulating in this church.

The warning is not vague or general here.

It applies specifically to the signs he is about to describe.

🚫 A direct command against deception
📣 False claims were already spreading
🎯 The warning targets specific signs
📖 Clarity protects against confusion

## 📉 Except There Come A Falling Away First

"Falling away" describes a large scale turning away from the faith.

It is not one person losing belief quietly.

Paul says this must happen before the day of Christ arrives.

This event becomes one clear marker pointing to that day.

📉 Falling away means mass departure from faith
🙅 Not one quiet private doubt
🗓️ It comes before the day of Christ
📖 A visible marker, not a secret sign

## 😈 That Man Of Sin Be Revealed, The Son Of Perdition

"Man of sin" names a single future figure, not a symbol or a group.

"Son of perdition" means someone marked for final destruction.

The same title is used for Judas in the Gospel of John.

Both names point to someone who embodies opposition to God completely.

😈 Man of sin names one figure
💀 Son of perdition means marked for destruction
📜 Same title used for Judas
📖 Both names point to total opposition

## 👑 Opposeth And Exalteth Himself Above All That Is Called God

This figure does not just resist God quietly.

He actively works against everything connected to God's name.

"Exalteth himself" means he lifts his own position above every rival.

He treats his own claim to worship as higher than all others.

👑 He actively opposes God himself
⬆️ Exalteth means he lifts himself up
🙇 He outranks every other object of worship
📖 Total opposition, not quiet resistance

## 🏛️ Sitteth In The Temple Of God, Shewing Himself That He Is God

"Shewing" is an old spelling of showing.

Sitting in God's own temple was the ultimate act of blasphemy.

He does not just claim power.

He demands to be worshipped as God himself.

This is the clearest picture Paul gives of total self worship.

🏛️ Shewing is an old form of showing
⛔ Sitting there was pure blasphemy
👑 He demands worship as God
📖 The clearest picture of total pride

## 🧠 When I Was Yet With You, I Told You These Things

Paul is not introducing a brand new teaching here.

He had already explained this complete sequence in person before.

Reminding them is meant to calm their fear, not alarm them further.

Oral teaching carried just as much weight as anything written down.

🧠 Paul taught this teaching in person already
🔁 A reminder here, not new material
😌 Meant to calm fear, not stir it
📖 Spoken teaching carried real authority

# 2 Thessalonians 2:6-8
# 🛑 The Restrainer And The Wicked One
---
## 🛑 Ye Know What Withholdeth

"Withholdeth" means something or someone is currently holding this figure back.

Paul assumes the Thessalonians already know what this restrainer is.

He does not explain it directly in this letter.

Many scholars still debate exactly who or what Paul meant by this.

The Bible does not spell out every detail here.

🛑 Withholdeth means a restraining force
🤐 Paul assumes they already know
❓ The identity is never spelled out
📖 Some mysteries stay genuinely open

## 🌫️ The Mystery Of Iniquity Doth Already Work

"Mystery" here means a truth once hidden, now partly revealed.

"Iniquity" means sin or wickedness in a deep, settled form.

Paul says this wickedness is already active in the world.

The final figure is future, but the pattern behind him is not.

🌫️ Mystery means a once hidden truth
😔 Iniquity means deep settled sin
⚙️ This wickedness is already active
📖 The pattern exists before the person

## 🤚 He Who Now Letteth Will Let, Until He Be Taken Out Of The Way

"Letteth" is an old word that means to hinder or restrain.

This is the opposite of how the word let is used today.

Something or someone currently restrains this wicked figure from appearing.

That restraint will not last forever.

🤚 Letteth means to hinder or restrain
🔄 Opposite meaning from the word today
⏳ The restraint will not last forever
📖 Removal of restraint allows him to appear

## 🔥 Consume With The Spirit Of His Mouth

This pictures total defeat without an actual physical battle.

Christ's mere word is powerful enough to end him completely.

Brightness of his coming adds a second image of overwhelming light.

No contest is needed between Christ and this false figure.

🔥 Defeat comes without a real battle
🗣️ Christ's word alone is enough
☀️ Brightness pictures overwhelming light
📖 No real contest ever takes place

# 2 Thessalonians 2:9-12
# 😈 Satan's Counterfeit And God's Judgment
---
## ⚡ After The Working Of Satan With All Power And Signs And Lying Wonders

This figure performs real, visible wonders, not simple tricks.

These same words describe Christ's own miracles elsewhere in the Bible.

Here they are copied into a convincing counterfeit.

The lie works because it imitates something genuine.

⚡ Real wonders, not simple tricks
📜 Same words used for Christ's miracles
🎭 A counterfeit copy of the real thing
📖 Counterfeits work by imitating the genuine

## 😔 Deceivableness Of Unrighteousness In Them That Perish

"Deceivableness" is an old word for the power to deceive.

This deception only works on people who already love wrongdoing.

"Perish" means a people are headed toward final separation from God.

The deception finds willing ground, not innocent victims.

😔 Deceivableness means the power to deceive
💔 It works on those who love wrongdoing
⚠️ Perish means final separation from God
📖 Deception finds willing ground, not victims

## 💔 Received Not The Love Of The Truth

This names the real reason people fall for the deception.

They did not simply lack information about the truth.

They never loved the truth once it reached them.

Rejection, not ignorance, is the real cause named here.

💔 Not a lack of information
🙅 They never loved the truth
⚖️ Rejection, not ignorance, caused this
📖 A real choice, not a mistake

## 🌫️ God Shall Send Them Strong Delusion

This delusion is not God causing innocent people to sin.

It is God confirming a choice people already made.

Strong delusion means their self deception becomes total and complete.

Judgment sometimes looks like letting people have exactly what they chose.

🌫️ Not God forcing innocent sin
✅ God confirms an existing choice
🔒 Delusion becomes total and complete
📖 Judgment can mean getting what was chosen

## ⚖️ Damned Who Believed Not The Truth, But Had Pleasure In Unrighteousness

"Damned" here means a final, settled judgment, not a casual insult.

Two things are named together, believing wrongly and loving wrongdoing.

The verdict rests on what a person loved, not only what they believed.

Pleasure in unrighteousness means they enjoyed what was wrong, not merely tolerated it.

⚖️ Damned means a final settled judgment
🧠 Unbelief and love of wrong named together
❤️ The verdict rests on what was loved
📖 Enjoying wrong is worse than tolerating it

# 2 Thessalonians 2:13-15
# 🙏 Chosen And Called To Stand Fast
---
## 🙏 Bound To Give Thanks Alway To God For You

Paul feels a real, permanent obligation to thank God for this church.

Beloved of the Lord names their true standing before God.

Thanksgiving here is a response to something God has already done.

This echoes the same thanks Paul gave at the start of the first chapter.

🙏 Bound means a real obligation
❤️ Beloved names their true standing
🙌 Thanks responds to what God did
📖 Echoes the same thanks from chapter one

## ✝️ Chosen You To Salvation Through Sanctification Of The Spirit

"Chosen" points to God's decision to save them from the beginning.

"Sanctification" means being set apart for God's own purposes.

This is not something they achieved on their own.

Belief of the truth stands in sharp contrast to the lie mentioned earlier in the chapter.

✝️ Chosen means God decided from the start
🕊️ Sanctification means set apart for God
🙅 Not something earned by effort
📖 Belief of truth contrasts the earlier lie

## 📯 Called You By Our Gospel

"Called" names the moment God's choice actually reached this church.

The gospel was the specific method God used to call them.

This connects their calling directly to Paul's own preaching.

Obtaining the glory of Christ is the goal that calling aims toward.

📯 Called means the choice reaching them
📜 The gospel was the method used
🤝 Connects directly to Paul's preaching
📖 Their calling aims toward Christ's glory

## 🧱 Stand Fast, And Hold The Traditions

"Stand fast" means holding a steady position under pressure.

"Traditions" means the apostolic teaching Paul had already given them.

It does not mean manmade ritual invented later.

Paul names two ways that teaching reached them, spoken word and written letter.

🧱 Stand fast means a steady position
📚 Traditions means apostolic teaching not ritual
🗣️ Teaching came by word and letter
📖 Steadiness matters more under real pressure

# 2 Thessalonians 2:16-17
# 🕊️ A Closing Prayer For Strength
---
## 🙌 Our Lord Jesus Christ Himself, And God, Even Our Father

Paul names Christ before naming the Father here.

This places Christ and the Father side by side in this prayer.

Both are named as the source of what follows.

The order itself quietly affirms who Christ really is.

🙌 Christ is named first here
⚖️ Christ and the Father named together
🤝 Both are the source of this prayer
📖 The order affirms who Christ is

## 💗 Everlasting Consolation And Good Hope Through Grace

"Consolation" means comfort, something already given, not just promised.

"Good hope" means confident expectation, not wishful thinking.

Both gifts flow from grace, God's undeserved kindness.

Paul prays from a place of settled confidence, not uncertainty.

💗 Consolation means comfort already given
🌟 Good hope means confident expectation
🎁 Both flow from God's grace
📖 Confidence, not uncertainty, shapes this prayer

## 🧱 Stablish You In Every Good Word And Work

"Stablish" is an old form of the word establish.

Paul prays for firmness that reaches both speech and action.

Good word and work covers everything a believer says and does.

The letter ends by asking God to make that firmness last.

🧱 Stablish is an old form of establish
🗣️ Firmness is prayed for in speech
🔨 And in action as well
📖 The letter ends praying for lasting firmness
`.trim();

export const SECOND_THESSALONIANS_TWO_PERSONAL_SECTIONS = parseSecondThessaloniansTwoRawNotes(
  SECOND_THESSALONIANS_TWO_RAW_NOTES
);
