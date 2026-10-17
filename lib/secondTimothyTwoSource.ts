export type SecondTimothyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondTimothyTwoRawNotes(rawText: string): SecondTimothyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondTimothyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*2\s+Timothy\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Timothy 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+2\s+Timothy\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+2\s+Timothy\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Timothy 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Timothy 2:${startVerse}` : `2 Timothy 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Timothy 2 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_TIMOTHY_TWO_RAW_NOTES = `# 2 Timothy 2:1-2
# 🔥 Be Strong, And Commit It To Others
---
## 💪 Be Strong In The Grace That Is In Christ Jesus
"Strong" does not mean gritting his teeth and pushing through alone.

Paul points him to "grace," God's own strength working inside him.

Timothy was likely tired and discouraged when this letter arrived.

Real strength for ministry comes from outside the minister, not from willpower.

💪 Strong means God's strength, not willpower
🎁 Grace supplies the real strength
😟 Timothy was likely tired and afraid
📖 Ministry strength comes from God, not self
---
## 📘 The Same Commit Thou To Faithful Men
"The same" points back to the sound teaching Timothy heard from Paul.

"Among many witnesses" means this teaching was never a private, secret message.

Paul instructs Timothy to pass that same teaching to others he trusts.

Those men then become able to teach it to a next generation.

📘 The same means Paul's sound teaching
👀 Many witnesses heard it, not just Timothy
🤝 Timothy hands it to faithful men
📖 Teaching passes forward generation after generation

# 2 Timothy 2:3-7
# 🪖 A Good Soldier, An Athlete, A Farmer
---
## 🪖 Endure Hardness, As A Good Soldier Of Jesus Christ
"Endure hardness" means absorbing real difficulty without quitting the mission.

Roman soldiers accepted harsh conditions as a normal part of their calling.

Paul compares following Christ to that same kind of disciplined endurance.

Ministry was never going to be comfortable or easy for Timothy.

🪖 Endure hardness means absorbing real difficulty
⚔️ Soldiers accepted harsh conditions willingly
✝️ Ministry works the same way
📖 Comfort was never the promise given
---
## 🎯 No Man That Warreth Entangleth Himself
This does not mean a soldier can own nothing or work no job.

"Entangleth" pictures getting tied up in matters that pull focus away.

A soldier on active duty keeps his attention on the one who sent him.

Timothy is called to that same undivided focus in ministry.

🙅 Not a ban on normal life
🪢 Entangleth means getting tied up
🎯 Soldiers stay focused on their mission
📖 Timothy needed that same undivided focus
---
## 🏃 Strive For Masteries, Yet Strive Lawfully
"Strive for masteries" pictures competing in an athletic contest, like the Greek games.

Athletes could be disqualified for breaking the rules, no matter how fast they ran.

"Strive lawfully" means competing by the rules God himself has set.

Effort alone never guarantees the reward if the rules get broken.

🏃 Masteries pictures an athletic contest
📏 Rules governed who could be crowned
⚖️ Lawfully means playing by God's rules
📖 Effort without the rules wins nothing
---
## 🌾 The Husbandman That Laboureth Must Be First Partaker Of The Fruits
"Husbandman" is an old word for a farmer who works the land.

The farmer who actually does the hard work eats from the harvest first.

Paul draws one simple picture, real labor comes before any real reward.

Faithful ministry works by that same honest order.

🌾 Husbandman means a working farmer
🌱 Labor comes before the harvest
🏆 Reward follows real effort, not shortcuts
📖 Ministry rewards faithful labor the same way
---
## 🧠 Consider What I Say
"What I say" points back to the soldier, athlete, and farmer pictures.

Paul does not want Timothy to simply nod and move on.

He asks him to slow down and actually weigh each picture.

"The Lord give thee understanding" shows even that reflection depends on God.

🧠 What I say means the three pictures
🐢 Paul wants real reflection, not a nod
🙏 Even understanding comes as a gift
📖 Reflection depends on God's help

# 2 Timothy 2:8-10
# ⛓️ According To My Gospel
---
## 👑 Of The Seed Of David Was Raised From The Dead
"Seed of David" names Jesus's real, human royal bloodline.

"Raised from the dead" names his real, bodily resurrection afterward.

Paul puts both facts together in one short phrase on purpose.

Jesus was fully human and still conquered death itself.

👑 Seed of David means his human line
⚰️ Raised from the dead means bodily resurrection
🤝 Both facts stand together on purpose
📖 A real man conquered real death
---
## ⛓️ I Suffer Trouble, As An Evil Doer
Paul was chained and treated like a common criminal in Rome.

He had done nothing wrong to earn that treatment.

The gospel he preached was the real reason for his chains.

Suffering for the truth can look identical to real guilt from the outside.

⛓️ Paul was chained like a criminal
🙅 He had done nothing wrong
📢 The gospel caused his chains
📖 Suffering for truth can look like guilt
---
## 📜 The Word Of God Is Not Bound
Paul's own body sat locked behind prison walls.

"The word of God" means the message he preached, not a physical object.

That message kept traveling and spreading.

Paul himself could not move an inch.

Chains could stop a person.

They could never stop a message.

⛓️ Paul's body was locked away
📜 Word of God means the message
🌍 The message still kept spreading
📖 Chains cannot stop a message
---
## 🎯 For The Elect's Sakes
"Elect" names those God has chosen to receive salvation.

Paul endures his suffering so that group of people can be reached.

That salvation comes with the promise of eternal glory.

Paul's chains became the price of other people's rescue.

🎯 Elect means those God has chosen
⛓️ Paul suffered so they could be reached
🏆 Eternal glory made the cost worth it
📖 One man's chains, many people's rescue

# 2 Timothy 2:11-13
# 💍 It Is A Faithful Saying
---
## 🤝 If We Be Dead With Him, We Shall Also Live With Him
"Dead with him" pictures a believer's old life ending with Christ's death.

That death was already pictured at baptism, going under the water.

"Live with him" promises a new life now and a future resurrection later.

The pattern only works in that order, death always comes first.

⚰️ Dead with him means the old life ends
🌊 Baptism already pictured that death
🌱 Live with him promises new life
📖 Death always comes before new life
---
## ⚔️ If We Suffer, We Shall Also Reign With Him
This suffering means real hardship endured for following Christ.

"Reign with him" promises a future share in Christ's own rule and glory.

The order again matters, suffering now, reigning later.

Present pain was never the end of the story Paul was telling.

💔 Suffering here means real hardship for Christ
👑 Reign with him promises future glory
⏳ Suffering comes first, reigning comes later
📖 Present pain was not the ending
---
## 🙅 If We Deny Him, He Also Will Deny Us
This does not describe a single moment of fear or weakness.

Peter himself denied Christ once and was still restored afterward.

"Deny" here means a settled, final refusal to ever claim him.

That kind of permanent denial brings a matching permanent response.

🙅 Not a single moment of fear
🐓 Peter denied Christ once and was restored
🔒 Deny here means a final refusal
📖 A final denial brings a final answer
---
## ❓ If We Believe Not, Yet He Abideth Faithful
"Believe not" here pictures real doubt or wavering faith, not open rebellion.

Even in that weak and doubting moment, God's own character never changes.

"Abideth" means he remains exactly who he has always been.

God's faithfulness was never dependent on how strong Timothy's faith felt that day.

❓ Believe not means doubt, not rebellion
🪨 Abideth means God stays the same
💪 God's faithfulness never depended on ours
📖 His character outlasts our weak moments
---
## 🔒 He Cannot Deny Himself
God's own nature makes unfaithfulness to his promises impossible.

This is not a rule he follows, but his very nature.

If God ever broke his word, he would stop being God.

Every promise in this letter rests on that unshakeable fact.

🔒 Unfaithfulness is impossible for God
🧬 This is his nature, not a rule
🪨 Breaking his word would unmake him
📖 Every promise rests on this fact

# 2 Timothy 2:14-19
# 🔨 A Workman That Needeth Not To Be Ashamed
---
## ⚠️ Strive Not About Words To No Profit
"Strive about words" means arguing over fine points of language or wording.

These arguments produce no real spiritual growth for anyone involved.

"To no profit" names the result plainly, nothing good comes from it.

Worse, Paul says these fights actually harm the people listening.

⚠️ Strive about words means wordy arguments
🚫 These fights produce no real growth
📉 No profit means nothing good comes
📖 Listeners get hurt, not helped
---
## 📜 Study To Shew Thyself Approved Unto God
"Study" here means deliberate, disciplined effort, not casual curiosity.

"Approved" pictures passing a real test, not just getting by.

Timothy's goal was God's approval, not the approval of his critics.

That kind of approval takes real, ongoing work to earn.

📜 Study means disciplined effort
✅ Approved means passing a real test
🎯 God's approval mattered more than critics
📖 Real approval takes ongoing work
---
## 🔨 Rightly Dividing The Word Of Truth
The picture is a craftsman cutting a straight, accurate line.

"Rightly dividing" means handling scripture carefully, without twisting or forcing its meaning.

A sloppy workman cuts crooked lines and ruins the material.

A careless teacher does the same damage to God's truth.

🔨 Rightly dividing pictures a careful craftsman
📏 It means cutting a straight, honest line
⚠️ Careless teaching twists God's truth
📖 Good teaching cuts straight, not crooked
---
## 🗣️ Shun Profane And Vain Babblings
"Profane" means talk that treats sacred things as common or worthless.

"Vain babblings" means empty talk that sounds important but says nothing real.

Paul does not tell Timothy to argue with this kind of talk.

He tells him to walk away from it entirely.

🗣️ Profane means treating the sacred as common
💨 Vain babblings means empty, important sounding talk
🚶 Shun means walking away, not arguing
📖 Some talk deserves distance, not a reply
---
## 🦠 Their Word Will Eat As Doth A Canker
A "canker" was understood as a spreading sore or gangrene in the body.

It does not stay in one place, it slowly eats through healthy tissue.

False teaching spreads through a church the exact same way.

Left alone, it quietly destroys what looked healthy at first.

🦠 Canker means a spreading, eating sore
🩹 It does not stay contained
⛪ False teaching spreads the same way
📖 Left alone, it destroys what looked healthy
---
## 🪦 Saying That The Resurrection Is Past Already
Hymenaeus and Philetus taught that the resurrection had already fully happened.

They likely meant it only as a spiritual experience already completed.

That claim denied any future, physical resurrection still to come.

Getting this one point wrong overturned the faith of other believers.

🪦 They claimed the resurrection already happened
👻 They likely meant it only spiritually
🙅 That denied a future, physical resurrection
📖 One wrong claim overturned real faith
---
## 🪨 The Foundation Of God Standeth Sure
False teachers like Hymenaeus and Philetus could shake individual believers.

They could never shake the actual foundation God himself had laid.

"Standeth sure" means it holds firm no matter who attacks it.

God's own truth does not depend on how many people believe it.

🪨 Foundation means God's unshakeable truth
💔 False teachers shook people, not truth
🛡️ Standeth sure means it holds firm
📖 Truth does not depend on popularity
---
## 🚪 Depart From Iniquity
"Nameth the name of Christ" means anyone who publicly claims to follow him.

That public claim comes with a real, expected change in behavior.

"Depart from iniquity" means actually walking away from known wrongdoing.

Claiming Christ's name and tolerating sin were never meant to coexist.

🏷️ Nameth the name means claiming Christ
🚶 Depart means actually walking away
🙅 Sin and that claim do not mix
📖 A real claim changes real behavior

# 2 Timothy 2:20-23
# 🏺 In A Great House
---
## 🏺 Vessels Of Gold And Of Silver, But Also Of Wood And Of Earth
Think of a wealthy household with containers of every kind inside it.

Some vessels were valuable gold and silver, used for honored purposes.

Others were ordinary wood and clay, used for common or lesser tasks.

A church, like that house, holds genuine believers of very different character.

🏺 A great house holds many kinds of vessels
🏆 Gold and silver served honored purposes
🪵 Wood and clay served common tasks
📖 A church holds people of different character
---
## ✨ A Vessel Unto Honour, Sanctified, And Meet For The Master's Use
"Sanctified" means set apart for a special, dedicated purpose.

"Meet for the master's use" means genuinely ready whenever the owner needs it.

Becoming that kind of vessel starts with purging, deliberately removing what is unclean.

That choice is available to anyone willing to make it.

✨ Sanctified means set apart for God
🙌 Meet means genuinely ready to serve
🧹 Purging removes what is unclean first
📖 Anyone can choose to become this
---
## 🏃 Flee Also Youthful Lusts
"Flee" pictures running away immediately, not standing to debate the temptation.

"Youthful lusts" names the strong, impulsive desires common to younger believers.

Paul does not tell Timothy to simply resist and stand firm here.

Some temptations are safer to outrun than to fight.

🏃 Flee means running away immediately
🔥 Youthful lusts names impulsive young desire
🙅 Not every temptation is worth fighting
📖 Some things are safer to outrun
---
## 🌿 Follow Righteousness, Faith, Charity, Peace
Fleeing temptation alone leaves a dangerous, empty space behind it.

Paul immediately names four things to chase after instead.

"Charity" here means selfless love acted out toward other people.

Running from sin only works if someone runs toward something better.

🌿 Fleeing alone leaves an empty space
🎯 Four virtues fill that empty space
❤️ Charity means selfless, active love
📖 Run from sin toward something better
---
## ❓ Foolish And Unlearned Questions Avoid
"Unlearned questions" means debates with no real answer and no real purpose.

These are not honest, searching questions asked to learn something true.

"Gender strifes" means they only produce arguments, never real understanding.

Avoiding them is simple wisdom, not fear of hard questions.

❓ Unlearned questions means purposeless debates
🔍 Not the same as honest searching questions
💢 Gender strifes means only arguments result
📖 Avoiding them is wisdom, not fear

# 2 Timothy 2:24-26
# 🕊️ Apt To Teach, Patient
---
## 🕊️ The Servant Of The Lord Must Not Strive
This "strive" means quarreling and fighting with other people, not honest competition.

Paul already praised a different kind of striving, running a race honestly.

A minister can compete hard against sin and still refuse to fight people.

"Apt to teach, patient" describes a person built for correction, not conflict.

🏃 Strive here means quarreling with people
✅ Fighting sin and fighting people differ
📚 Apt to teach means built to correct
📖 Patience serves truth better than conflict
---
## 🤲 In Meekness Instructing Those That Oppose Themselves
"Meekness" means controlled strength, not weakness or passivity.

"Those that oppose themselves" names people actively arguing against the truth.

Paul tells Timothy to correct even these people gently, not harshly.

Harsh correction often hardens a person instead of changing their mind.

🤲 Meekness means controlled strength, not weakness
🙅 Opposers actively argue against the truth
🧘 Gentle correction was still required here
📖 Harsh correction rarely changes a mind
---
## 🕳️ Recover Themselves Out Of The Snare Of The Devil
A "snare" is a hidden trap built to capture an animal without a fight.

Paul pictures a person trapped by the devil without even realizing it.

"Recover themselves" pictures waking up and finally seeing the trap clearly.

Gentle correction, not harsh argument, is what often opens a trapped person's eyes.

🕳️ Snare means a hidden, silent trap
😴 A trapped person often does not know it
👀 Recover means finally seeing the trap
📖 Gentle truth opens trapped eyes
`.trim();

export const SECOND_TIMOTHY_TWO_PERSONAL_SECTIONS = parseSecondTimothyTwoRawNotes(SECOND_TIMOTHY_TWO_RAW_NOTES);
