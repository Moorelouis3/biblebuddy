export type SecondCorinthiansThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondCorinthiansThirteenRawNotes(rawText: string): SecondCorinthiansThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondCorinthiansThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondCorinthians\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Corinthians 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondCorinthians\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondCorinthians\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Corinthians 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Corinthians 13:${startVerse}` : `2 Corinthians 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Second Corinthians 13 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CORINTHIANS_THIRTEEN_RAW_NOTES = `# SecondCorinthians 13:1-4
# ⚖️ Two Or Three Witnesses And The Power Of God
---
## 🔢 This Is The Third Time I Am Coming To You

"Third time" means Paul has visited Corinth twice already.

One of those visits was the painful one he already mentioned earlier in this letter.

He is now preparing to arrive a third time.

This visit will not be a casual one.

🔢 Third time means visit number three

😔 One earlier visit was painful

✈️ Paul is preparing to arrive again

📖 This visit will not be casual

## 📜 In The Mouth Of Two Or Three Witnesses Shall Every Word Be Established

This line is a direct quote from the law given through Moses.

Deuteronomy required at least two witnesses before anyone could be formally accused.

One single accusation was never enough to settle a serious charge.

Paul applies that same ancient legal standard to his dealings with Corinth.

He has now visited enough times to count as those required witnesses.

📜 This quotes the law of Moses

⚖️ Two witnesses were required to accuse someone

🙅 One accusation alone was never enough

📖 Paul's repeated visits now count as witnesses

## ⚠️ If I Come Again I Will Not Spare

Paul already warned the unrepentant during his painful second visit.

"Heretofore have sinned" points to believers who had not yet turned from sin.

"I will not spare" means Paul will not hold back discipline this time.

He is giving one final warning before he actually arrives.

⚠️ Paul already warned them once before

🚫 Heretofore have sinned means ongoing unrepented sin

🛑 I will not spare means real discipline

📖 This is one final warning before arrival

## ❓ Ye Seek A Proof Of Christ Speaking In Me

Some in Corinth doubted that Paul truly spoke for Christ at all.

"Proof" means evidence strong enough to settle the question for good.

They wanted undeniable confirmation of his authority before accepting his words.

Paul takes their demand seriously instead of brushing it aside.

❓ Some doubted Paul spoke for Christ

🔍 Proof means evidence that settles the question

👥 Corinth wanted confirmation of his authority

📖 Paul takes their demand seriously

## 🧭 Which To You Ward Is Not Weak But Is Mighty In You

"To you ward" is an old way of saying toward you.

Paul insists Christ has not been weak in dealing with the Corinthians.

Changed lives and answered prayer already stood as the real proof.

The evidence they wanted was already sitting in front of them.

🧭 To you ward means toward you

💪 Christ has not been weak among them

🌱 Changed lives already proved his power

📖 Their evidence was already right there

## 💀 He Was Crucified Through Weakness Yet He Liveth By The Power Of God

The cross looked like total defeat and shame to onlookers.

"Crucified through weakness" names how helpless Christ appeared in that moment.

The resurrection reversed that completely through the power of God.

Weakness and power sit side by side in the very same story.

Think of a seed that looks completely dead once it is buried.

Only afterward does real life break through the ground.

💀 Crucified through weakness means apparent defeat

⚡ Power of God raised him to life

🌱 A buried seed pictures this same pattern

📖 Weakness and power share one story

## 🪞 We Also Are Weak In Him But We Shall Live With Him By The Power Of God Toward You

Paul applies the exact same pattern to his own ministry now.

He admits real weakness in himself, the same word used for Christ.

God's power will still work through him toward the Corinthians.

This theme already ran through the end of the previous chapter.

🪞 Paul applies this pattern to himself

🙋 He admits his own real weakness

⚡ God's power will still work through him

📖 This theme already ran through chapter twelve

# SecondCorinthians 13:5-6
# 🔍 Examine Yourselves
---
## 🔄 Examine Yourselves Whether Ye Be In The Faith

Paul turns the testing around onto the Corinthians themselves.

"Examine" means to test carefully, the way someone checks a scale.

They wanted proof from Paul.

Paul says they should look for proof in their own lives first.

🔄 Paul turns the test back on them

⚖️ Examine means to test carefully

👀 They wanted proof from Paul

📖 Look for proof in your own life first

## 🪞 Know Ye Not Your Own Selves How That Jesus Christ Is In You

Paul assumes they can already recognize something real in themselves.

The presence of Jesus Christ in a believer is not usually hidden.

Changed desires, real faith, and a changed direction all count as evidence.

This is the proof Paul wants them to notice.

🪞 Paul assumes they can recognize this themselves

✝️ Christ's presence is not usually hidden

🔄 Changed desires and direction count as evidence

📖 This is the proof Paul wants noticed

## ❌ Except Ye Be Reprobates

"Reprobate" means someone who fails the test completely.

Paul is not stating that they have already failed.

He frames it as the one outcome he does not expect.

It does not mean every struggling believer is a reprobate.

The word describes total, final failure, not an ordinary stumble.

❌ Reprobate means failing the test completely

🙅 Paul is not stating they failed

✅ This is the outcome he does not expect

📖 It does not mean every stumble fails

## 🔁 I Trust That Ye Shall Know That We Are Not Reprobates

Paul turns the same test back toward his own ministry.

If Christ is genuinely at work in them, his gospel passed the test too.

Their changed lives became proof of both things at once.

Paul's confidence rests on what God already did in Corinth.

🔁 Paul turns the test back on himself

✅ Their changed lives prove his gospel passed too

🙏 His confidence rests on God's work

📖 Both tests share the exact same answer

# SecondCorinthians 13:7-10
# 🙏 Power For Edification Not Destruction
---
## 🙏 I Pray To God That Ye Do No Evil

Paul states his actual hope before explaining anything further.

He wants the Corinthians to genuinely live rightly.

That hope does not depend on making Paul look good.

Their obedience matters more to him than his own reputation.

🙏 Paul states his actual hope first

❤️ He wants them to live rightly

🪞 Their obedience matters more than his image

📖 This sets up the next contrast

## 📏 Not That We Should Appear Approved But That Ye Should Do That Which Is Honest

Paul draws a clear line between two different goals here.

"Approved" would mean Paul looking successful in front of others.

"Honest" means genuinely good and right, not just appearing that way.

Paul chooses their real goodness over his own public image every time.

📏 Paul draws a clear line here

👀 Approved means looking successful to others

✅ Honest means genuinely good not just appearing so

📖 Their real goodness outranks his public image

## 🛑 We Can Do Nothing Against The Truth But For The Truth

Paul describes a limit on his own authority here.

He will never use his apostolic power to oppose what is actually true.

Every use of his authority must ultimately serve the truth.

This limit protects the Corinthians from any kind of abusive leadership.

🛑 Paul names a real limit on himself

⚖️ He will never oppose what is true

🎯 His authority must always serve truth

📖 This limit protects them from abuse

## 🔁 We Are Glad When We Are Weak And Ye Are Strong

Paul returns to the same theme that closed the previous chapter.

His own weakness does not bother him here.

He is genuinely glad when it results in their strength.

"Your perfection" names the actual goal behind everything Paul has written.

🔁 Paul returns to chapter twelve's theme

😊 His own weakness does not bother him

💪 Their strength is what makes him glad

📖 Your perfection names his real goal

## ⚔️ Lest Being Present I Should Use Sharpness

"Sharpness" means strong, severe correction delivered in person.

Paul is writing ahead of time so he will not have to use it.

A letter now can prevent a harder confrontation later.

Paul clearly prefers correction through words over a painful personal visit.

⚔️ Sharpness means severe in person correction

✍️ Paul writes now to avoid using it

📨 A letter now prevents a harder visit

📖 Paul prefers words over painful conflict

## 🏗️ The Power Which The Lord Hath Given Me To Edification And Not To Destruction

"Edification" means building someone up, like adding to a structure.

"Destruction" means tearing something down instead.

Paul's apostolic authority was given for only one of those two purposes.

Every hard word in this letter has aimed at building the church up.

🏗️ Edification means building someone up

💥 Destruction means tearing something down

🎯 His authority exists for building up only

📖 Every hard word has aimed at that

# SecondCorinthians 13:11-14
# ✨ Farewell And The Final Blessing
---
## 🏁 Finally Brethren Farewell

"Finally" signals Paul is closing out this long and difficult letter.

"Brethren" reminds the Corinthians that Paul still considers them family.

"Farewell" was a normal way to end a letter in that culture.

Even after all the conflict, Paul closes with warmth, not distance.

🏁 Finally signals the letter is closing

👪 Brethren means Paul still calls them family

✉️ Farewell was a normal closing in that culture

📖 Paul closes with warmth not distance

## 📜 Be Perfect Be Of Good Comfort Be Of One Mind Live In Peace

Paul closes with four short commands packed close together.

"Be perfect" means grow toward maturity and completion in Christ.

"Be of good comfort" means take real encouragement, not forced cheer.

"Be of one mind" means choosing unity over the church's old quarrels.

"Live in peace" means actively ending the conflict still present among them.

📜 Paul closes with four short commands

🌱 Be perfect means growing toward maturity

🤝 Be of one mind means choosing unity

📖 Live in peace means ending the conflict

## 🔗 The God Of Love And Peace Shall Be With You

Paul ties God's presence directly to the commands he just gave.

Pursuing peace and unity is not just good advice on its own.

It is the very thing that invites God's presence among them.

Obedience and God's nearness are connected here, not separate ideas.

🔗 Paul ties this to the commands above

🕊️ Pursuing peace is more than good advice

🙏 It invites God's presence among them

📖 Obedience and nearness are connected here

## 💋 Greet One Another With An Holy Kiss

A holy kiss was a normal greeting of family affection in that culture.

It carried no romantic meaning at all.

Paul asks a divided church to physically show reconciliation to each other.

This command only makes sense because real conflict still existed among them.

💋 A holy kiss showed family affection

🙅 It carried no romantic meaning

🤝 Paul asks them to show reconciliation

📖 This only makes sense if conflict existed

## 🙋 All The Saints Salute You

"Saints" here simply means believers, not a special spiritual class.

"Salute" means to send warm greetings from a distance.

Paul is passing along greetings from other churches he has visited.

The wider church beyond Corinth has not forgotten them.

🙋 Saints simply means believers here

✉️ Salute means sending warm greetings

🌍 Other churches send their greetings too

📖 The wider church has not forgotten them

## ✝️ The Grace Of The Lord Jesus Christ And The Love Of God

This verse forms one of the clearest Trinitarian blessings in the New Testament.

"Grace" names the undeserved kindness that comes specifically through Jesus Christ.

"Love" names the deeper motive behind God the Father's actions.

Paul lists grace first because it is how that love first reaches sinners.

✝️ Grace comes specifically through Jesus Christ

❤️ Love names God the Father's deeper motive

🔢 Grace arrives first reaching sinners first

📖 One blessing names each divine person

## 🤝 The Communion Of The Holy Ghost

"Communion" means shared participation, not simply a feeling of closeness.

The Holy Ghost is the one who makes God's presence real inside a believer every day.

This finishes the one blessing naming Father, Son, and Holy Ghost together.

Paul ends this entire hard letter on full reconciliation, not lingering conflict.

🤝 Communion means shared participation together

👐 The Holy Spirit makes God's presence real

📜 Father Son and Spirit named as one blessing

📖 Paul ends in full reconciliation not conflict
`.trim();

export const SECOND_CORINTHIANS_THIRTEEN_PERSONAL_SECTIONS = parseSecondCorinthiansThirteenRawNotes(SECOND_CORINTHIANS_THIRTEEN_RAW_NOTES);
