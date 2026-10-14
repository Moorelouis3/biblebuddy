export type SecondCorinthiansOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondCorinthiansOneRawNotes(rawText: string): SecondCorinthiansOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondCorinthiansOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondCorinthians\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Corinthians 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondCorinthians\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondCorinthians\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Corinthians 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Corinthians 1:${startVerse}` : `2 Corinthians 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Second Corinthians 1 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CORINTHIANS_ONE_RAW_NOTES = `# SecondCorinthians 1:1-2
# ✍️ Grace And Peace To Every Believer
---
## 📨 An Apostle Of Jesus Christ By The Will Of God

"Apostle" means someone sent out with a specific message and authority.

Paul did not appoint himself to this role.

He names "the will of God" because his authority came from a call, not ambition.

Corinth had people questioning whether Paul was a real apostle at all.

This opening line answers that doubt before the letter even begins.

📨 Apostle means someone sent with authority
🙏 Paul's call came from God, not himself
❓ Some in Corinth doubted his authority
📖 Paul answers the doubt in his first line

## 🧑 Timothy Our Brother

Timothy was a close companion who traveled and ministered with Paul for years.

"Brother" marks him as a fellow believer, not a blood relative.

Timothy is also named later in this very chapter as present with Paul in Ephesus.

Naming him here shows Paul was not writing or working alone.

🧑 Timothy traveled closely with Paul
🤝 Brother means fellow believer
📍 He is named again later in this chapter
📖 Paul's ministry was never a one man effort

## 🗺️ With All The Saints Which Are In All Achaia

"Saints" simply means believers set apart for God, not specially holy figures.

Achaia was the Roman province that included the city of Corinth.

Addressing "all" the saints in the whole province shows this letter was never meant for Corinth alone.

Other churches scattered across the region were meant to read it too.

🙏 Saints simply means believers
🗺️ Achaia was Corinth's Roman province
⛪ Other churches in the region were included
➡️ This letter traveled beyond just Corinth

## 🎁 Grace Be To You And Peace

"Grace" means God's favor given freely, not earned by good behavior.

"Peace" reflects the Hebrew word shalom, a wholeness that goes beyond the absence of conflict.

Paul combines a Greek style greeting with a Jewish one in a single line.

Both the Gentile and Jewish believers reading this letter would hear something familiar.

🎁 Grace means favor that is not earned
🕊️ Peace reflects the Hebrew word shalom
🌍 Paul blends Greek and Jewish greetings
📖 Every reader found something familiar

# SecondCorinthians 1:3-7
# 🤗 The God Of All Comfort
---
## ❤️ The Father Of Mercies

"Mercies" means compassion shown to someone who could not fix their own trouble.

Paul does not call God the Father of power or the Father of judgment here.

He chooses the one title that fits what he is about to describe.

Everything that follows in this chapter grows out of that choice.

❤️ Mercies means compassion for the helpless
🚫 Paul skips titles about power or judgment
🎯 He picks the title the moment needs
📖 Mercy sets up everything that follows

## 🤗 The God Of All Comfort

"Comfort" in this letter means far more than making someone feel better for a moment.

The Greek word behind it pictures someone called alongside to help carry a load.

Paul will use some form of this word ten times in just these next few verses.

He wants the Corinthians to feel the weight of that repetition.

🤗 Comfort means help carried alongside someone
🏋️ It pictures carrying a load together
🔁 Paul repeats the word again and again
📖 Repetition shows how much this matters

## 🎯 That We May Be Able To Comfort Them Which Are In Trouble

Paul names the purpose behind his own suffering here.

God did not comfort Paul only so Paul could feel better.

The comfort was meant to be passed on to someone else in pain.

Suffering that is endured well becomes a tool for helping another person later.

🎯 Comfort has a purpose beyond Paul
🔄 It was meant to be passed along
🫂 Pain can prepare someone to help others
➡️ Suffering can become useful later

## ✝️ As The Sufferings Of Christ Abound In Us

This does not mean Paul's suffering added anything to Christ's work on the cross.

"Sufferings of Christ" here means hardship endured for the sake of following Christ.

Paul faced rejection, danger, and hardship because of the message he carried.

That kind of suffering connects a believer to Christ, it does not compete with Him.

✝️ This is not suffering that saves anyone
🔥 It means hardship for following Christ
⚠️ Paul faced real rejection and danger
📖 Suffering for Christ connects, it does not compete

## ⚓ Our Hope Of You Is Stedfast

"Stedfast" is an old spelling of steadfast, meaning firm and not easily shaken.

Paul's hope for the Corinthians is not wishful thinking.

It rests on something he has already seen them do, sharing in both suffering and comfort.

A hope built on shared experience holds up better than a hope built on guesswork.

⚓ Stedfast means firm and unshaken
🙅 This is not wishful thinking
👀 It rests on what Paul has seen
📖 Shared experience makes hope solid

# SecondCorinthians 1:8-11
# ⚠️ Trouble In Asia
---
## 🗺️ Our Trouble Which Came To Us In Asia

"Asia" here means a Roman province in what is now western Turkey, not the whole continent.

Paul does not name the exact event, but it was severe enough to mention by itself.

Many scholars believe this may connect to the dangerous riot in Ephesus described in Acts nineteen.

Paul trusted the Corinthians enough to tell them about a moment he nearly did not survive.

🗺️ Asia was a Roman province, not the continent
❓ Paul never names the exact event
📚 It may connect to the Acts 19 riot
📖 Paul trusted them with his hardest moment

## ⚖️ Pressed Out Of Measure, Above Strength

"Pressed out of measure" pictures weight piling on until there is no room left to bear it.

"Above strength" makes clear this was beyond what Paul could handle on his own.

Paul is not exaggerating for effect here.

He wants the Corinthians to understand just how close to breaking he actually came.

⚖️ Pressed out of measure means crushing weight
💪 Above strength means beyond his own ability
🚫 Paul is not exaggerating here
📖 He wants them to know just how close

## 😨 We Despaired Even Of Life

"Despaired" means Paul reached a point of giving up hope, not just feeling discouraged.

He expected to die from whatever happened to him in Asia.

This is one of the most honest confessions of fear in any of Paul's letters.

Even an apostle faced moments that felt beyond hope.

😨 Despaired means giving up hope entirely
⚰️ Paul expected to die
🗣️ This is unusually honest for Paul
📖 Even an apostle faced real fear

## ⚖️ The Sentence Of Death In Ourselves

Paul pictures himself already judged and condemned to die.

He names the purpose behind that terrifying moment in the very next phrase.

The point was to stop trusting in his own strength completely.

A crisis that strips away self reliance can leave a person depending only on God.

⚖️ Sentence of death means feeling already condemned
🎯 Paul names the purpose right after
🙅 It stripped away his self reliance
📖 The crisis pushed him toward God alone

## 🙏 Ye Also Helping Together By Prayer For Us

Paul does not picture himself surviving alone.

He credits the Corinthians' own prayers as part of how he was delivered.

"Helping together" pictures many people pulling in the same direction at once.

Prayer connected a struggling missionary in Asia to a church far away in Corinth.

🙏 Paul credits their prayers directly
🤝 Helping together means pulling together
🌍 Asia and Corinth were far apart
📖 Prayer closed that distance

# SecondCorinthians 1:12-14
# 🪞 A Clear Conscience
---
## 🪞 The Testimony Of Our Conscience

"Conscience" means the inner sense that tells a person whether they have acted rightly.

Paul is not asking the Corinthians to simply take his word for it.

He points to his own conscience as a witness that can be examined.

A clear conscience gave Paul confidence even while defending himself under suspicion.

🪞 Conscience means an inner sense of right
🙋 Paul offers it as a witness
🔍 It can be examined, not just claimed
📖 A clear conscience gave him confidence

## 🎯 In Simplicity And Godly Sincerity

"Simplicity" here means one honest motive, not a hidden agenda.

"Sincerity" comes from an old picture of something tested in sunlight and found free of cracks.

Paul claims his dealings with Corinth could survive that same kind of close inspection.

Nothing in his conduct needed to be hidden from the light.

🎯 Simplicity means one honest motive
☀️ Sincerity pictures something tested in sunlight
🔍 Paul's conduct could survive inspection
📖 Nothing needed to stay hidden

## 🧠 Not With Fleshly Wisdom, But By The Grace Of God

"Fleshly wisdom" means clever manipulation aimed at personal advantage.

Paul contrasts that kind of cleverness with God's grace working through him.

Some in Corinth valued impressive speakers who used exactly this kind of manipulation.

Paul refuses to win them over by playing that same game.

🧠 Fleshly wisdom means clever manipulation
🎁 Grace means God's favor, not a trick
🗣️ Corinth valued impressive, manipulative speakers
➡️ Paul refused to play that game

## 🏆 Even As Ye Also Are Ours

"Rejoicing" here works like a noun, meaning something a person is proud of or boasts in.

Paul says the Corinthians are his pride, and he is theirs in return.

That pride will be fully proven "in the day of the Lord Jesus," at the final judgment.

A relationship built on honesty is the kind that still stands on that day.

🏆 Rejoicing here means a source of pride
🔄 Paul and the Corinthians share this pride
⚖️ The day of the Lord means judgment
📖 Honest relationships hold up at judgment

# SecondCorinthians 1:15-17
# 🧭 A Change Of Plans
---
## 🗺️ That Ye Might Have A Second Benefit

Paul had originally planned to visit Corinth twice, on his way to and from Macedonia.

"A second benefit" means a second visit the Corinthians could enjoy.

This plan is why some in Corinth later felt let down when it changed.

Paul is about to explain himself, not just announce a change.

🗺️ Paul planned two separate visits
🎁 A second benefit means a second visit
😕 The change later disappointed some in Corinth
📖 Paul is about to explain why

## 🧭 To Pass By You Into Macedonia

Macedonia was the Roman region just north of Corinth's province of Achaia.

Paul's original route had him stopping in Corinth on the way there and on the way back.

Changing that route meant changing something he had already promised in person or by letter.

A broken travel plan became, for some, a reason to question Paul's word.

🗺️ Macedonia sat just north of Achaia
🧭 Paul's route included two stops in Corinth
📝 The change broke an earlier promise
➡️ Some used it to question his word

## 🪶 Did I Use Lightness?

"Lightness" is an old word for being unreliable or careless with one's word.

Paul asks this as a direct question, anticipating the accusation before anyone can make it.

He is not dodging the issue, he is naming it himself.

Facing a criticism directly carries more weight than ignoring it.

🪶 Lightness means being unreliable with one's word
❓ Paul asks the question himself
🙋 He names the accusation before they can
📖 Facing criticism directly carries weight

## 🔄 Yea Yea, And Nay Nay

This phrase pictures someone who says yes and no in the same breath, impossible to pin down.

Paul denies that this describes how he makes decisions.

His change of plans came from a real reason, not a careless or double minded habit.

The next verses explain exactly what that reason was tied to, God's own faithfulness.

🔄 Yea yea and nay nay means being unpredictable
🙅 Paul denies this describes him
🎯 His change had a real reason
➡️ That reason connects to God's faithfulness

# SecondCorinthians 1:18-22
# ✅ Yea And Amen
---
## 🔗 Our Word Toward You Was Not Yea And Nay

Paul ties his own reliability to God's own character.

If God is faithful, Paul argues, then the message Paul preached cannot have been unreliable.

This is not pride, it is Paul defending the gospel itself, not just his personal reputation.

An unreliable messenger would cast doubt on the message he carried.

🔗 Paul ties his word to God's character
✅ A faithful God backs a faithful message
🛡️ Paul defends the gospel, not just himself
📖 An unreliable messenger harms the message

## 🧑 Silvanus And Timotheus

"Silvanus" is another name for Silas, Paul's companion from the book of Acts.

"Timotheus" is simply an older spelling of Timothy.

Paul names both men because they preached the same consistent message in Corinth with him.

Three witnesses to the same unwavering message carried more weight than one.

🧑 Silvanus is another name for Silas
📜 Timotheus is an older spelling of Timothy
🗣️ Both preached the same message with Paul
📖 Three witnesses carried more weight

## 🎯 All The Promises Of God In Him Are Yea, And In Him Amen

Every promise God ever made finds its yes, its confirmation, in Jesus Christ.

"Amen" is a Hebrew word meaning let it be so, often used to close a solemn statement.

Paul uses it here as a seal on every promise God has ever given.

Nothing God promised is left hanging in doubt.

🎯 Every promise is confirmed in Christ
🙏 Amen means let it be so
🔏 Paul uses it to seal every promise
📖 Nothing God promised is left in doubt

## 🔏 Hath Also Sealed Us, And Given The Earnest Of The Spirit In Our Hearts

A "seal" in the ancient world marked something as owned, authentic, and protected.

"Earnest" meant a deposit paid up front that guaranteed a larger payment still to come.

The Holy Spirit works two ways in a believer's life, proof of ownership and promise of more to come.

Believers do not have to wonder whether the rest of what God promised will arrive.

🔏 A seal marked ownership and protection
💰 Earnest meant a guaranteed deposit
🕊️ The Spirit proves both at once
📖 More of what God promised is coming

# SecondCorinthians 1:23-24
# 🤲 Helpers Of Your Joy
---
## 🙏 I Call God For A Record Upon My Soul

Calling God as a "record" means asking God to serve as a witness to the truth of a statement.

This was the strongest kind of oath available to Paul, placing his own soul on the line.

He is not exaggerating for effect, he is swearing to something he could not take back.

Paul wanted no doubt left about his sincerity on this point.

🙏 Calling God as record means a solemn oath
⚖️ This was the strongest oath available
🚫 Paul is not exaggerating here
📖 He wanted no doubt left about his sincerity

## 🛑 To Spare You I Came Not As Yet Unto Corinth

Paul finally gives the real reason behind his change of plans.

He stayed away to avoid a visit that would have ended in painful confrontation.

Later chapters in this letter describe the conflict Paul was trying to let settle first.

A delayed visit can be an act of mercy, not a broken promise.

🛑 Paul finally gives his real reason
😬 He avoided a painful confrontation
📜 Later chapters describe that conflict
➡️ Delay can be mercy, not failure

## 👑 Not For That We Have Dominion Over Your Faith

"Dominion" means total control or ownership over someone.

Paul makes clear he never wanted to rule over what the Corinthians believed.

Some leaders in the ancient world did treat churches like personal territory.

Paul refuses that role for himself here in plain words.

👑 Dominion means total control over someone
🙅 Paul never wanted to rule their faith
⚠️ Some leaders did treat churches that way
📖 Paul refuses that role outright

## 🤲 We Are Helpers Of Your Joy: For By Faith Ye Stand

Paul describes his role with a far humbler word than ruler.

A "helper" supports someone else's progress instead of directing it.

Their standing before God rests on their own faith, not on Paul's authority over them.

Paul ends this chapter exactly where he wants the Corinthians to end it too, resting on faith alone.

🤲 Helper means supporting, not directing
🧍 Their standing rests on their own faith
🙅 Not on Paul's authority over them
📖 The chapter ends resting on faith alone
`.trim();

export const SECOND_CORINTHIANS_ONE_PERSONAL_SECTIONS = parseSecondCorinthiansOneRawNotes(SECOND_CORINTHIANS_ONE_RAW_NOTES);
