export type SecondCorinthiansElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondCorinthiansElevenRawNotes(rawText: string): SecondCorinthiansElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondCorinthiansElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondCorinthians\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Corinthians 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondCorinthians\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondCorinthians\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Corinthians 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Corinthians 11:${startVerse}` : `2 Corinthians 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Second Corinthians 11 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CORINTHIANS_ELEVEN_RAW_NOTES = `# SecondCorinthians 11:1-6
# 😅 A Foolish Kind Of Boasting
---
## 📣 Bear With Me A Little In My Folly

Paul is not admitting to real foolishness here.

"Folly" means foolish sounding talk, and Paul is about to boast about himself.

Boasting was something he normally refused to do.

He asks the Corinthians to tolerate this one unusual speech.

The whole chapter is Paul doing something he hates.

📣 Folly means foolish sounding talk

🙅 Paul is not really being foolish

⚠️ He is about to boast, which he avoids

📖 The Corinthians must tolerate this chapter

## 💍 I Have Espoused You To One Husband

"Espoused" means promised in marriage, like an engagement.

Paul pictures the church as a bride being prepared for Christ.

In that culture, a father was responsible for guarding his daughter's purity before her wedding.

Paul sees himself in that same protective role over Corinth.

His jealousy here is not selfish.

It exists to guard someone meant for another.

💍 Espoused means promised in marriage

👰 Paul pictures the church as a bride

🛡️ He guards her like a protective father

📖 His jealousy exists to protect, not possess

## 🐍 As The Serpent Beguiled Eve Through His Subtilty

"Subtilty" means clever, deceptive cunning, not simple cleverness.

Paul reaches back to the garden of Eden for this picture.

The serpent did not force Eve to sin.

It talked her into doubting God's word instead.

Paul fears the Corinthians are facing that same kind of danger.

🐍 Subtilty means clever deception

🌳 Paul points back to the garden of Eden

🗣️ The serpent persuaded, it did not force

📖 Corinth faces that same kind of danger

## 💗 Corrupted From The Simplicity That Is In Christ

"Simplicity" here means single minded devotion, not simple mindedness.

Picture a bride who only has eyes for one groom.

False teaching does not always deny Christ outright.

It often just adds something else alongside him.

That addition alone is enough to corrupt pure devotion.

💗 Simplicity means single minded devotion

👀 Like a bride with eyes for one groom

➕ False teaching often just adds extras

📖 Adding to Christ corrupts pure devotion

## 📢 If He That Cometh Preacheth Another Jesus

Paul names the real threat invading Corinth here.

Rival teachers arrived preaching a different Jesus, a different spirit, and a different gospel.

The word "another" appears three times in one verse for emphasis.

Paul is not objecting to a different style of teaching.

He is objecting to a different message entirely.

📢 Rival teachers brought a different Jesus

🔁 Another repeats three times for emphasis

🙅 He never allows a different message

📖 Style can differ, the message cannot

## 🏆 Not A Whit Behind The Very Chiefest Apostles

"A whit" means even a tiny amount.

So "not a whit behind" means fully equal.

"Chiefest apostles" likely refers to famous leaders like Peter, James, and John.

Paul's rivals apparently ranked him below those names.

Paul flatly denies that ranking here.

📏 A whit means even a tiny amount

🏆 Chiefest apostles means famous leaders

📉 Rivals ranked Paul below them

📖 Paul denies that ranking outright

## 🗣️ Rude In Speech Yet Not In Knowledge

"Rude" here means unpolished speech, not rudeness.

Paul admits he was never trained in formal public speaking.

Ancient Corinth prized skilled rhetoric the way some places prize celebrity.

Paul separates style from substance on purpose.

A rough delivery does not mean a shallow message.

🗣️ Rude means unpolished, not impolite

🎭 Corinth prized skilled public speaking

📚 Paul had knowledge, not polish

📖 Style and substance are not the same

# SecondCorinthians 11:7-11
# 💸 A Gospel Preached For Free
---
## 🙇 Abasing Myself That Ye Might Be Exalted

"Abasing" means lowering oneself in status, not feeling ashamed.

Paul preached in Corinth without charging for his teaching.

In that culture, free teaching could look like low status.

Paid teachers were often seen as valuable.

Free teaching could look unskilled by comparison.

His critics twisted that generosity into proof he was second rate.

🙇 Abasing means lowering status, not shame

💸 Paul taught in Corinth for free

📉 Free teaching could look like low status

📖 Critics twisted generosity into an insult

## 🏛️ I Robbed Other Churches

Paul is using exaggeration here, not confessing an actual crime.

Other churches, mainly in Macedonia, financially supported him during his time in Corinth.

He calls that support robbery to sharpen the unfairness of the picture.

Those churches gave so that Corinth could receive his ministry for free.

🏛️ Robbed is deliberate exaggeration

🤝 Macedonian churches supported him instead

🎁 They gave so Corinth received him free

📖 Paul sharpens the point with irony

## 💰 Chargeable To No Man

"Chargeable" means being a financial burden on someone.

Paul refused to let his needs fall on the Corinthians.

Brethren from Macedonia stepped in to cover what he lacked.

Paul commits to keeping that same pattern going forward.

💰 Chargeable means a financial burden

🙅 Paul refused to burden Corinth

🤝 Macedonian believers supplied what he lacked

📖 He commits to keep that pattern

## 🛑 No Man Shall Stop Me Of This Boasting

Paul treats refusing payment as a boast worth defending.

"Achaia" was the Roman province that included Corinth.

He is not boasting about his own greatness here.

He is boasting about a policy he refuses to abandon.

🛑 Paul defends one specific boast

🗺️ Achaia was the province including Corinth

📜 The boast is about a policy, not himself

📖 He will not abandon that policy

## ❓ Wherefore Because I Love You Not God Knoweth

Paul anticipates the worst possible explanation for his refusal.

Maybe his critics suggested he kept his distance because he did not care.

Paul answers that accusation by appealing straight to God as his witness.

He cannot prove his own heart with words alone.

❓ Paul anticipates the worst explanation

💔 Maybe he just did not love them

🙏 He appeals to God as his witness

📖 Only God can verify a motive

# SecondCorinthians 11:12-15
# 🎭 Apostles In Disguise
---
## 🎯 Cut Off Occasion From Them Which Desire Occasion

Paul explains the real reason behind refusing payment.

Rival teachers were looking for any angle to claim equal standing with Paul.

If Paul took money like they did, they could point to that as proof.

Refusing payment denies them that one easy comparison.

🎯 Rivals looked for an equal standing claim

💸 Taking money would have given them an opening

🚫 Paul denies them that easy comparison

📖 His free ministry cuts off their claim

## 🏷️ False Apostles Deceitful Workers

Paul finally names what he has only implied up to this point.

"Deceitful workers" means people who do real work toward a false end.

These teachers were not obviously evil on the surface.

Their danger was in what they imitated, not in what they openly rejected.

🏷️ Paul finally names them directly

🛠️ Deceitful workers do real work for a lie

🎭 Their danger was imitation, not open attack

📖 They looked legitimate on the surface

## 👼 Satan Himself Is Transformed Into An Angel Of Light

"Angel of light" pictures something that looks pure and glorious outside.

Paul widens the picture from these teachers to their actual source.

Deception rarely looks like deception.

The most dangerous lies wear the appearance of truth.

👼 Angel of light means something that looks pure

🙅 Deception rarely looks like deception

💡 The most dangerous lies imitate truth

📖 Satan himself sets that pattern

## ⚖️ Ministers Of Righteousness Whose End Shall Be According To Their Works

Paul applies the same disguise to Satan's human helpers.

They present themselves as champions of righteousness.

But they teach something false underneath.

Paul does not promise they will be exposed right away.

He promises their outcome will eventually match what they actually did.

🎭 Rivals disguise themselves as righteous ministers

⏳ Exposure may not come right away

⚖️ Their end will match their actual works

📖 Appearance does not change the outcome

# SecondCorinthians 11:16-21
# 🙄 Fools Gladly Suffered
---
## ⚠️ Yet As A Fool Receive Me That I May Boast Myself A Little

Paul repeats his warning before continuing into risky territory.

He knows boasting sounds foolish, and he says so plainly instead of hiding it.

He asks for patience the way a friend asks before an unusual favor.

Naming the awkwardness up front is itself part of his honesty.

⚠️ Paul repeats his warning on purpose

😅 He admits boasting sounds foolish

🙏 He asks for patience like a friend

📖 Naming the awkwardness is honesty

## 🙋 Not After The Lord But As It Were Foolishly

Paul admits this particular speech does not come from direct divine instruction.

He is not claiming the Lord commanded him to boast.

He is choosing a human strategy to meet a specific problem in Corinth.

Paul is careful to label which parts of his letters carry that weight.

🙋 Paul admits this is his own strategy

🚫 Not a command from the Lord

🎯 It targets a specific problem in Corinth

📖 He labels the weight of his own words

## 🏷️ Seeing That Many Glory After The Flesh I Will Glory Also

"Glory after the flesh" means boasting about human credentials.

Paul's rivals likely bragged about training, birth, or connections.

Paul decides to answer them on their own chosen ground, just this once.

Matching their game is not the same as endorsing it.

🏷️ Glory after the flesh means human credentials

🎓 Rivals bragged about training and birth

🎲 Paul answers on their own chosen ground

📖 Matching the game is not endorsing it

## 😏 Ye Suffer Fools Gladly Seeing Ye Yourselves Are Wise

This line is a deliberate insult, not an accident.

The Corinthians thought their own wisdom let them see through anyone foolish.

In reality they were easily fooled by confident sounding rivals.

Paul uses their own self image against them to make the point land.

😏 This line is a deliberate insult

🧠 Corinth thought they could spot foolishness

🙈 They were actually easily fooled

📖 Paul uses their self image against them

## ⛓️ If A Man Bring You Into Bondage If A Man Devour You

Paul lists four things the Corinthians apparently tolerated from these rivals.

"Bondage" meant controlling behavior.

"Devour" meant exploiting them financially.

"Smite you on the face" may describe real disrespect or public humiliation.

Paul's point is simple.

They tolerated real harm from confident strangers.

⛓️ Bondage means controlling behavior

🍽️ Devour means financial exploitation

👊 Smite on the face means humiliation

📖 Corinth tolerated real harm from strangers

## 🔄 I Speak As Concerning Reproach As Though We Had Been Weak

Paul accepts the label of weakness for a moment.

Doing so lets his next point work.

"Howbeit" signals he is about to flip the comparison.

Whatever boldness anyone else claims, Paul claims he can match it too.

The reversal sets up the hard list ahead.

🙇 Paul accepts the label of weakness briefly

🔄 Howbeit signals a coming reversal

💪 He claims to match any rival's boldness

📖 The reversal sets up the list ahead

# SecondCorinthians 11:22-29
# ⚔️ A List Of Real Scars
---
## 📌 Are They Hebrews So Am I

Paul matches his rivals point by point on Jewish identity.

"Hebrews" points to language and heritage.

"Israelites" points to covenant standing.

"Seed of Abraham" points to the promise line itself.

Paul shows he holds every one of those credentials.

📌 Hebrews points to language and heritage

📜 Israelites points to covenant standing

🌱 Seed of Abraham points to the promise line

📖 Paul matches every credential claimed

## 🙋 Ministers Of Christ I Am More

Paul shifts from shared heritage to a harder comparison.

The real contest now is suffering for the gospel.

"I speak as a fool" reminds the reader he still hates this kind of talk.

He claims to have endured more than any rival, not merely equal credentials.

🙋 Paul shifts the comparison to suffering

😅 He flags his discomfort with boasting

📈 He claims more suffering, not just equal standing

📖 This claim opens the list ahead

## 🩸 In Stripes Above Measure In Prisons More Frequent In Deaths Oft

"Stripes" means whip marks from beatings.

"In deaths oft" does not mean Paul died repeatedly.

It means he faced death again and again.

Each phrase names a category Paul is about to detail with real numbers.

🩸 Stripes means whip marks from beatings

⚰️ Deaths oft means repeated brushes with death

🔢 Each phrase opens into real numbers

📖 Summary is about to become specifics

## 📏 Of The Jews Five Times Received I Forty Stripes Save One

Jewish law capped synagogue whippings at forty lashes.

"Save one" means thirty nine, a deliberate margin under that limit.

Paul endured that exact punishment five separate times.

The careful number shows this was official discipline, not random violence.

📏 Jewish law capped whippings at forty lashes

➖ Save one means thirty nine, a safety margin

🔁 Paul endured this five separate times

📖 This was official punishment, not random violence

## 🪵 Thrice Was I Beaten With Rods

This punishment was Roman, not Jewish, and used wooden rods.

Acts records one specific instance of this happening at Philippi.

Roman citizens were technically supposed to be protected from this kind of beating.

Paul endured it anyway, three separate times.

🪵 Beaten with rods was a Roman punishment

🏛️ Acts records one instance at Philippi

🛡️ Roman citizens were normally protected from this

📖 Paul endured it three times anyway

## 🪨 Once Was I Stoned

Stoning was a punishment meant to kill, carried out by a crowd throwing rocks.

Acts fourteen records Paul surviving exactly this attack at Lystra.

The crowd left him for dead outside the city.

He walked back into the city the next day.

🪨 Stoning was meant to kill by crowd attack

📜 Acts fourteen records this at Lystra

💀 The crowd left him for dead

📖 Paul returned to the city anyway

## ⛵ Thrice I Suffered Shipwreck A Night And A Day In The Deep

Sea travel in the ancient world carried constant real danger.

Paul survived three separate wrecks across his years of travel.

"A night and a day in the deep" pictures him adrift with no rescue in sight.

That kind of exposure alone could easily have killed him.

⛵ Ancient sea travel carried constant danger

🌊 Paul survived three separate wrecks

🕐 He spent a full night and day adrift

📖 Exposure alone could have killed him

## 🗡️ In Perils Of Waters In Perils Of Robbers

Paul begins a rapid list of eight distinct dangers in one breath.

"Waters" meant dangerous rivers and sudden flooding along the road.

"Robbers" targeted the same roads and mountain passes Paul had to use.

Every clause in this list was a real memory, not poetic exaggeration.

🌊 Waters meant dangerous rivers and flooding

🗡️ Robbers targeted the roads Paul traveled

🔢 Eight distinct dangers follow in one breath

📖 Each clause names a real memory

## 💔 Perils Among False Brethren

This list moves from dangers in nature to dangers from people.

"Mine own countrymen" means fellow Jews who opposed his gospel message.

"The heathen" meant Gentile opposition from trade or local religion.

"False brethren" means people inside the church who worked against Paul.

🧭 The list moves from nature to people

⚔️ Countrymen means opposition from fellow Jews

💔 False brethren means betrayal from inside

➡️ Betrayal hurt more than any danger listed

## 😴 In Weariness And Painfulness In Watchings Often

This verse shifts from sudden violent dangers to constant physical hardship.

"Watchings" means staying awake through the night, often on guard or in prayer.

"Fastings often" here likely means going without food by circumstance, not by choice.

"Nakedness" means lacking adequate clothing, not full exposure.

😴 Watchings means staying awake through the night

🍞 Fastings often meant going without food

🥶 Nakedness means lacking adequate clothing

📖 Hardship here is constant, not sudden

## ❤️ The Care Of All The Churches

Paul saves his heaviest burden for last, on purpose.

Every physical danger just listed was temporary.

Each one eventually ended.

Caring for every church he had founded or visited never stopped.

That ongoing weight outranks every physical attack listed before it.

❤️ Paul saves the heaviest burden for last

⏳ Physical dangers were temporary

🏛️ Caring for the churches never stopped

📖 Emotional weight outranks the physical list

## 🔥 Who Is Weak And I Am Not Weak

Paul closes the list by pointing to how deeply he felt for others.

When a believer under his care struggled, Paul felt that struggle himself.

"Burn" pictures a fire of concern lit inside him by someone else's pain.

The whole list exists to prove how much he actually loved them.

🤝 Paul felt what struggling believers felt

🔥 Burn pictures concern lit by someone's pain

💗 The list proves how much he loved them

📖 Suffering was never the point, love was

# SecondCorinthians 11:30-33
# 🧺 Boasting In Weakness
---
## 🏳️ I Will Glory Of The Things Which Concern Mine Infirmities

"Infirmities" means weaknesses, the opposite of the usual boasting material.

Paul will not boast about strength, skill, or success.

He boasts only about the places where he was weak.

God carried him through every one of them.

🏳️ Infirmities means weaknesses, not strengths

🙅 Paul refuses to boast about skill or success

🙏 He boasts only where God carried him through

📖 Weakness becomes his only boasting material

## 🙏 Knoweth That I Lie Not

Paul swears by God before continuing into one final story.

Calling on God as a witness was the strongest guarantee available in that culture.

He seems aware this next story might sound unbelievable.

The oath tells the reader to take what comes next as plain fact.

🙏 Paul swears by God before continuing

⚖️ A divine oath was the strongest guarantee

😮 The next story might sound unbelievable

📖 He insists it happened exactly as told

## 👑 In Damascus The Governor Under Aretas The King

Aretas was a real Nabatean king who controlled territory including Damascus for a time.

A governor acting under his authority was actively hunting Paul down.

This detail anchors the story to a real, specific moment in Paul's early ministry.

Acts nine records this same escape from a different angle.

👑 Aretas was a real Nabatean king

🏛️ His governor was actively hunting Paul

📅 This anchors the story to a real moment

📖 Acts nine tells the same escape

## 🧺 Let Down By The Wall In A Basket And Escaped His Hands

City walls in that era were thick enough to have windows built into them.

Friends lowered Paul through one of those wall openings in a large basket.

This was not a dignified escape.

It was humiliating and dangerous.

Paul ends his boasting list with the most embarrassing moment he could have chosen.

🧺 Friends lowered Paul in a basket

🧱 City walls had windows built into them

😳 The escape was humiliating, not heroic

📖 Paul ends on his most embarrassing moment
`.trim();

export const SECOND_CORINTHIANS_ELEVEN_PERSONAL_SECTIONS = parseSecondCorinthiansElevenRawNotes(SECOND_CORINTHIANS_ELEVEN_RAW_NOTES);
