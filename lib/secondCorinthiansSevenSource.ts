export type SecondCorinthiansSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondCorinthiansSevenRawNotes(rawText: string): SecondCorinthiansSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondCorinthiansSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondCorinthians\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Corinthians 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondCorinthians\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondCorinthians\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Corinthians 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Corinthians 7:${startVerse}` : `2 Corinthians 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Second Corinthians 7 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CORINTHIANS_SEVEN_RAW_NOTES = `# SecondCorinthians 7:1-4
# 🧼 Cleansing In The Fear Of God
---
## 🔙 These Promises

The word these promises points back to chapter six.

God had just promised to live inside his people.

He also promised to call them his own sons and daughters.

Paul says that promise should change how someone lives right now.

A promise from God was never meant to stay theoretical.

🔙 These promises points back to chapter six

🏠 God promised to dwell within his people

👪 He also promised to call them sons

📖 A real promise should change how someone lives

## 🧼 Cleanse Ourselves From All Filthiness Of The Flesh And Spirit

"Filthiness" means more than just dirt on the outside.

Paul means anything that corrupts a person toward sin.

"Flesh" points to the body and its visible actions.

"Spirit" points to the hidden thoughts inside a person.

God asks for cleansing in both places at once.

🧼 Filthiness means more than outward dirt

💪 Flesh refers to the body and its actions

🧠 Spirit refers to hidden inner thoughts

📖 God calls for cleansing inside and out

## 🏗️ Perfecting Holiness In The Fear Of God

"Perfecting" does not mean becoming flawless all at once.

It means pursuing holiness as a lifelong process.

"The fear of God" means deep reverence, not terror.

That reverence is what drives someone to keep growing.

Holiness in this verse is a direction, not a finish line.

🏗️ Perfecting means an ongoing process

🙏 Fear of God means deep reverence

🧭 Reverence drives continued growth

📖 Holiness is a direction, not a finish line

## 🙏 Receive Us

Paul is not asking for money or special treatment here.

He is asking the Corinthians to open their hearts back to him.

This picks up the same request from the end of chapter six.

Some in Corinth had started listening to Paul's rivals instead.

Paul wants that trust restored before anything else.

🙏 Not a request for money

❤️ Asking them to open their hearts

🔙 Picks up the request from chapter six

📖 Paul wants trust restored first

## 📋 We Have Wronged No Man, We Have Corrupted No Man, We Have Defrauded No Man

Paul lists three separate accusations he never actually committed.

"Wronged" means treating someone unfairly or causing them harm.

"Corrupted" means leading someone into sin or false teaching.

"Defrauded" means cheating someone out of money or property.

Three clear denials answer three real rumors spreading in Corinth.

📋 Three separate accusations named here

⚖️ Wronged means treating someone unfairly

🎭 Corrupted means leading someone astray

📖 Three rumors answered with three denials

## 🙅 I Speak Not This To Condemn You

This is not Paul scolding them out of anger.

He already explained his deep love for them back in chapter six.

Paul says their place in his heart was never in question.

Correction and love are not opposites here.

Paul corrects because he already loves them, not instead of it.

🙅 Not scolding out of anger

❤️ His love was already shown in chapter six

🤝 Their place in his heart was secure

📖 Correction and love can coexist

## ❤️ Ye Are In Our Hearts To Die And Live With You

"In our hearts to die and live with you" is a figure of speech.

It means total commitment, not a passing feeling.

Paul says he would stand with them through anything life brings.

That includes hardship, death, or ordinary daily living.

This bond was never going to be casual or temporary.

❤️ A figure of speech for commitment

🤝 Not a passing feeling

⚔️ Paul stands with them through anything

📖 This bond was never casual

## 🗣️ Great Is My Boldness Of Speech Toward You

"Boldness of speech" means speaking with total openness.

Paul is not hiding behind careful or guarded words.

He already showed that same openness back in chapter six.

This kind of honesty only works inside real trust.

Paul trusts the Corinthians enough to speak plainly now.

🗣️ Boldness of speech means total openness

🙅 Not hiding behind guarded words

🔙 Matches the openness from chapter six

📖 Honesty here comes from real trust

## ⚖️ I Am Filled With Comfort, I Am Exceeding Joyful In All Our Tribulation

Paul names two opposite feelings sitting inside him at once.

"Tribulation" means real, ongoing hardship, not a minor inconvenience.

Comfort and joy do not erase that hardship.

They exist together with the hardship, not after it ends.

Paul already described this same pattern back in chapter one.

⚖️ Two opposite feelings held at once

🌧️ Tribulation means real ongoing hardship

🤗 Comfort and joy do not erase hardship

📖 This echoes the pattern from chapter one

# SecondCorinthians 7:5-7
# 🤗 Comforted By The Coming Of Titus
---
## 📜 When We Were Come Into Macedonia

This moment was already described back in chapter two.

Paul had been anxiously waiting there for Titus to arrive.

"Macedonia" was the region north of Corinth across the sea.

Paul traveled there still not knowing how the Corinthians had responded.

The waiting itself was part of the hardship.

📜 Already mentioned back in chapter two

⏳ Paul was anxiously waiting for Titus

🗺️ Macedonia sat north of Corinth

📖 The waiting itself was hard

## 💪 Our Flesh Had No Rest

"Flesh" here means Paul's whole body and nerves.

"No rest" describes constant tension with no letup.

This was physical exhaustion caused by real worry.

Paul was not exaggerating for effect.

Anxiety can wear down a body just as much as labor.

💪 Flesh means his whole body

😣 No rest means constant tension

😓 Real worry caused real exhaustion

📖 Anxiety wears down a body too

## ⚔️ Without Were Fightings, Within Were Fears

Paul names two different kinds of pressure at once.

"Fightings" describes conflict coming from outside people or circumstances.

"Fears" describes anxiety coming from inside his own mind.

Both pressed on him in Macedonia at the very same time.

Even an apostle carried real fear, not constant confidence.

⚔️ Fightings means outside conflict

😨 Fears means inner anxiety

⏳ Both pressed on him at once

📖 Even Paul carried real fear

## 👑 God, That Comforteth Those That Are Cast Down

Paul names exactly who God is before naming what God did.

"Cast down" describes someone who feels discouraged or defeated.

Comfort here is not a vague feeling God hands out randomly.

It is tied to God's own character as a comforter.

Paul already named this same trait back in chapter one.

👑 God's identity named before his action

😔 Cast down means discouraged

🤗 Comfort flows from God's character

📖 Chapter one already named this trait

## 🚫 Comforted Us By The Coming Of Titus

God did not comfort Paul through a vision this time.

He used an ordinary person walking through the door instead.

Titus was Paul's trusted coworker, already mentioned earlier in this letter.

God regularly works comfort through people, not only miracles.

A friend's arrival can be an answer to prayer.

🚫 Not a vision or a voice

🚶 An ordinary person at the door

🤝 Titus was Paul's trusted coworker

📖 God often comforts through people

## 🔑 Not By His Coming Only

The word only signals a second source of comfort.

Titus brought more than just his own presence.

He also brought a full report from Corinth.

That report itself became part of the comfort Paul received.

Good news can comfort as much as a friend's company.

🔑 Only signals a second source

🚶 More than just his presence

📰 He brought a full report

📖 Good news comforts like company does

## 🙏 Your Earnest Desire, Your Mourning, Your Fervent Mind Toward Me

"Earnest desire" means a strong eager longing to make things right.

"Mourning" means real grief over how the conflict had gone.

"Fervent mind" means intense, focused devotion toward Paul.

Titus reported all three reactions back to Paul directly.

Their response proved the relationship was not actually broken.

🙏 Earnest desire means eager longing

😢 Mourning means real grief

🔥 Fervent mind means intense devotion

📖 Their response proved the bond held

# SecondCorinthians 7:8-10
# 😢 Godly Sorrow Versus Worldly Sorrow
---
## 📜 Though I Made You Sorry With A Letter

This letter is not the same one as First Corinthians.

Many scholars believe it was a separate letter that did not survive.

Paul wrote it with hard, direct correction inside it.

He knew that letter would cause real pain when it arrived.

Sending it was still the right choice.

📜 Not the same as First Corinthians

❓ Likely a separate letter, now lost

✍️ Written with hard direct correction

📖 The right choice despite the pain

## 🙅 I Do Not Repent, Though I Did Repent

Paul is not contradicting himself in this one line.

He briefly regretted sending such a painful letter.

Once he saw the good result, that regret disappeared.

"Repent" here means regret, not turning away from sin.

The outcome changed how Paul felt about the decision.

🙅 Not a contradiction here

😟 He briefly regretted the pain

😌 The good result ended that regret

📖 Outcome changed how he felt

## ⏳ But For A Season

"Season" means a limited stretch of time.

The sorrow Paul caused was never meant to last forever.

Temporary pain served a lasting purpose.

Paul distinguishes a hard moment from a hard life.

Pain with a purpose has an end point.

⏳ Season means a limited time

😢 The sorrow was never permanent

🎯 Temporary pain served a purpose

📖 Pain with purpose has an end

## 🧭 Ye Sorrowed To Repentance

The phrase to repentance names where this sorrow was headed.

Sorrow by itself is just an emotion.

"Repentance" means an actual change in direction and behavior.

Their sorrow did not stop at feeling bad.

It carried them all the way to real change.

🧭 Sorrow pointed toward repentance

😢 Sorrow alone is only an emotion

🔄 Repentance means a real change

📖 Their sorrow led to real change

## 🙏 After A Godly Manner

"Godly manner" means sorrow shaped by concern for God.

It is different from sorrow over getting caught.

Godly sorrow asks what was wrong, not just what it cost.

That difference changes where the sorrow eventually leads.

One kind builds a changed life, the other does not.

🙏 Godly manner means concern for God

🙅 Different from sorrow over consequences

❓ Godly sorrow asks what was wrong

📖 One kind builds a changed life

## 🙅 Receive Damage By Us In Nothing

Paul is not claiming credit for their change.

He is saying his hard letter did not actually harm them.

"Damage" here means real, lasting loss.

The pain was temporary, but the loss it caused was none.

Correction that leads to repentance is not really damage at all.

🙅 Not claiming personal credit

📜 The letter caused no lasting harm

⚖️ Damage means real lasting loss

📖 Correction toward repentance is not damage

## 🧭 Godly Sorrow Worketh Repentance To Salvation Not To Be Repented Of

Paul states the whole principle plainly here.

Godly sorrow leads somewhere specific, toward repentance and salvation.

"Not to be repented of" means this outcome never needs regretting later.

A changed life is never something to look back on with regret.

This kind of sorrow is worth the pain it costs.

🧭 Godly sorrow leads to salvation

✅ This outcome never needs regretting

💔 Short pain, lasting good result

📖 This kind of sorrow is worth it

## ⚖️ The Sorrow Of The World Worketh Death

Paul contrasts godly sorrow with its opposite here.

"Sorrow of the world" means regret focused only on consequences.

That kind of sorrow often spirals into despair instead of change.

It worketh death, leading nowhere but further loss.

Two sorrows can look the same on the outside and end very differently.

⚖️ Contrasts with godly sorrow

🌍 Worldly sorrow focuses on consequences

💀 It spirals toward despair

📖 Two sorrows can end very differently

# SecondCorinthians 7:11-13
# ✅ Proof Of Real Repentance
---
## 🧐 What Carefulness It Wrought In You, Yea, What Clearing Of Yourselves

"Carefulness" means a new seriousness about getting things right.

"Clearing of yourselves" means a genuine effort to set the record straight.

Paul lists the Corinthians' reaction to his letter one piece at a time.

These two reactions show people taking the problem seriously.

Real repentance shows up in visible effort, not just private feeling.

🧐 Carefulness means new seriousness

🧹 Clearing means setting the record straight

📋 Paul lists their reaction piece by piece

📖 Repentance shows up in visible effort

## 😡 What Indignation, Yea, What Fear, Yea, What Vehement Desire, Yea, What Zeal, Yea, What Revenge

Paul piles up five more reactions in a single breath here.

"Indignation" means real anger at the wrong that happened.

"Fear" means concern over what the conflict had cost them.

"Vehement desire" means a strong longing to make things right.

"Zeal" and "revenge" together describe fresh energy to correct the wrong.

😡 Indignation means real anger

😨 Fear means real concern

🙏 Vehement desire means strong longing

📖 Five honest emotions, one real repentance

## ✅ Ye Have Approved Yourselves To Be Clear In This Matter

Paul declares the case closed in this line.

"Approved yourselves" means they proved their innocence through real action.

"Clear in this matter" means fully cleared of the accusation.

Their response answered every doubt Paul might have had.

Trust that was damaged has now been fully restored.

✅ The case is declared closed

💪 Approved means proved through action

🧼 Clear means fully cleared

📖 Trust has been fully restored

## ❓ Not For His Cause That Had Done The Wrong, Nor For His Cause That Suffered Wrong

This likely refers to an earlier conflict mentioned earlier in this letter.

One man had done wrong, and another had suffered it.

Paul says neither man was his real reason for writing.

His actual goal was bigger than punishing or defending anyone.

He wanted the whole church to see their own devotion to God.

❓ Points to an earlier conflict

⚖️ One man wronged, one was wronged

🙅 Neither man was Paul's real reason

📖 His goal was bigger than blame

## 🎯 That Our Care For You Might Appear Unto You

Paul names his real motive for writing that letter.

He was not settling a private score for either man.

"Care for you" means genuine concern for the whole church.

He wanted that concern to become visible, not stay hidden.

Sometimes love has to be demonstrated before it can be believed.

🎯 Names his real motive

🙅 Not settling a private score

❤️ Care for you means genuine concern

📖 Love had to be shown, not just felt

## 🤝 We Were Comforted In Your Comfort

"Comforted in your comfort" means Paul's relief depended on theirs.

Titus brought back news that they had truly healed.

Paul's own peace rose and fell with the Corinthians' wellbeing.

That kind of empathy marks a real relationship, not a transaction.

Shared joy is just as real as shared suffering.

🤝 His relief depended on theirs

📰 Titus brought news they had healed

❤️ Paul's peace rose with their wellbeing

📖 Shared joy is as real as shared suffering

## 🔋 His Spirit Was Refreshed By You All

"Refreshed" pictures someone tired being given new strength.

Titus had likely traveled to Corinth anxious about the reception he would get.

Instead the whole church welcomed and encouraged him.

That welcome renewed him before he even returned to Paul.

Hospitality itself became part of this story's healing.

🔋 Refreshed means given new strength

😰 Titus arrived anxious about his welcome

🤗 The whole church welcomed him instead

📖 Hospitality became part of the healing

# SecondCorinthians 7:14-16
# 🙌 Confidence Restored
---
## 🗣️ If I Have Boasted Any Thing To Him Of You, I Am Not Ashamed

Paul had praised the Corinthians to Titus before he ever arrived.

That praise put Paul's own credibility at risk.

If the church had failed to welcome Titus, Paul would look foolish.

Instead their actual behavior matched everything Paul had promised.

Paul is not ashamed because the praise turned out true.

🗣️ Paul had praised them to Titus

⚠️ That praise risked his own credibility

✅ Their behavior matched his promise

📖 He is not ashamed, it proved true

## 🙌 Our Boasting Is Found A Truth

Paul's confidence in the Corinthians was not wishful thinking.

"Found a truth" means it was tested and proven accurate.

Real experience backed up what Paul had claimed in advance.

Words about people are only as good as what follows them.

The Corinthians' response turned Paul's words into fact.

🙌 Not wishful thinking on his part

🔍 Tested and proven accurate

⚖️ Real experience backed his words

📖 Their response made his words fact

## ❤️ His Inward Affection Is More Abundant Toward You

"Inward affection" describes deep inner emotion, the same idiom used in chapter six.

Titus now feels that same depth of love for the Corinthians.

His time with them changed how he personally feels about the church.

This was not a professional visit that ended when it was over.

Real ministry tends to create real attachment.

❤️ Inward affection means deep emotion

🔁 Matches the idiom from chapter six

🤝 Titus now loves this church personally

📖 Real ministry creates real attachment

## 🙅 With Fear And Trembling Ye Received Him

This does not mean the Corinthians were terrified of Titus.

"Fear and trembling" describes deep seriousness, not literal panic.

They took his visit and his message with real weight.

That same seriousness describes how Paul wants the gospel received elsewhere in his letters.

Humility, not terror, is the actual point of this phrase.

🙅 Not literal terror of Titus

⚖️ Fear and trembling means real seriousness

🙇 They took his visit seriously

📖 Humility, not terror, is the point

## 🏁 I Have Confidence In You In All Things

Paul ends the chapter exactly where he hoped he would.

Months of anxiety, a hard letter, and real tears led here.

"In all things" means the trust is now complete, not partial.

This confidence did not come cheap or easy.

A relationship nearly broken became stronger than before.

🏁 Ends exactly where Paul hoped

💔 Months of anxiety led to this

✅ Confidence now is complete, not partial

📖 A broken relationship grew stronger
`.trim();

export const SECOND_CORINTHIANS_SEVEN_PERSONAL_SECTIONS = parseSecondCorinthiansSevenRawNotes(SECOND_CORINTHIANS_SEVEN_RAW_NOTES);
