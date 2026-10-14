export type SecondCorinthiansTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondCorinthiansTwelveRawNotes(rawText: string): SecondCorinthiansTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondCorinthiansTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondCorinthians\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Corinthians 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondCorinthians\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondCorinthians\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Corinthians 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Corinthians 12:${startVerse}` : `2 Corinthians 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Second Corinthians 12 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CORINTHIANS_TWELVE_RAW_NOTES = `# SecondCorinthians 12:1-6
# 🪜 Visions No One Can Explain
---
## 📣 It Is Not Expedient For Me Doubtless To Glory

"Expedient" means useful or helpful for a purpose.

Paul admits that boasting will not really profit anyone.

He still chooses to do it anyway.

What follows is a story he almost never tells.

📢 Expedient means useful or helpful

🙅 Boasting will not really help anyone

📜 Paul tells the story anyway

📖 A story he almost never tells

## 🙋 I Knew A Man In Christ Above Fourteen Years Ago

Paul is describing himself here, not someone else.

Speaking about himself in the third person let him avoid sounding proud.

"In Christ" simply means a believer united with Christ.

Fourteen years places this vision long before this letter was written.

Scripture never says exactly when or where this happened.

🙋 Paul is actually describing himself

😇 Third person helped him avoid pride

✝️ In Christ means united with Christ

📖 Scripture never names the time or place

## 🪜 Caught Up To The Third Heaven

"Caught up" means suddenly taken, not something Paul chose himself.

Many ancient Jewish writers divided heaven into layers.

The first layer was simply the sky above the earth.

The second layer held the sun, moon, and stars.

The third layer was God's own dwelling place.

God pulled Paul directly into His own presence.

🪜 Caught up means suddenly taken

☁️ Sky and stars are the first heavens

🏠 Third heaven is God's own dwelling

📖 God pulled Paul into His presence

## 🤷 Whether In The Body I Cannot Tell

Paul repeats this same uncertainty twice in two verses.

He genuinely does not know if his body or only his spirit went to heaven.

That is not evasion.

It is honesty about what even he could not explain.

God alone knows exactly what happened.

🤷 Paul repeats the same uncertainty twice

👤 He does not know if his body went

🙏 God alone knows what truly happened

📖 Honesty, not evasion, drives the repetition

## 🌳 Caught Up Into Paradise

"Paradise" is another name for the same place Paul just called the third heaven.

Jesus used that same word speaking to the thief dying beside Him on the cross.

The word pictures a garden of perfect peace and life.

Paul is describing the same experience from a second angle.

🌳 Paradise names the same heavenly place

✝️ Jesus used this word at the cross

🌿 It pictures a garden of peace

📖 One experience, described a second way

## 🤐 Heard Unspeakable Words Which It Is Not Lawful For A Man To Utter

"Unspeakable" means forbidden to say out loud, not simply mysterious.

Paul was not allowed to repeat what he heard there.

"Lawful" here means permitted by God himself.

This silence was intentional, on purpose.

🤐 Unspeakable means forbidden, not just mysterious

🚫 Paul was not allowed to repeat it

📜 Lawful means permitted by God himself

📖 This silence was intentional, on purpose

## 📏 Of Such An One Will I Glory Yet Of Myself I Will Not Glory But In Mine Infirmities

Paul draws a careful line here.

He will boast about the vision itself.

He refuses to boast about himself as the one who received it.

"Infirmities" means weaknesses, the only thing Paul claims as his own.

This theme carries through the rest of the chapter.

📏 Paul draws a careful line

🙅 He refuses to boast about himself

🏳️ Infirmities means weaknesses, his real boast

📖 This theme carries through the chapter

## 🛑 Lest Any Man Should Think Of Me Above That Which He Seeth Me To Be

Paul explains why he holds back from saying more.

"Forbear" means to hold oneself back on purpose.

He worries people will think more of him than they should.

A spectacular vision could easily inflate his reputation.

Paul wants people to judge him by what they can actually see and hear.

🛑 Forbear means holding himself back

📈 A vision could inflate his reputation

👀 He wants to be judged by what shows

📖 Not by a secret no one can verify

# SecondCorinthians 12:7-10
# 🌵 The Thorn In The Flesh
---
## ⚖️ Lest I Should Be Exalted Above Measure

Paul explains why the thorn exists at all.

"Exalted above measure" means becoming proud beyond any proper limit.

The phrase appears twice in one verse for emphasis.

An experience that incredible could easily have made Paul feel superior.

God built in a safeguard before pride could take root.

⚖️ Exalted above measure means extreme pride

🔁 The phrase repeats twice for emphasis

🌟 The vision could have inflated Paul

📖 God built in a safeguard first

## 🌵 A Thorn In The Flesh

A thorn pictures something painful that never really goes away.

Scholars are genuinely divided about exactly what it was.

Many believe it was a lasting physical illness.

Others think it describes a constant human opponent.

Scripture itself never names the detail directly.

🌵 A thorn pictures constant, ongoing pain

❓ Scholars are divided on what it was

👁️ Many believe it was a physical illness

📖 Scripture leaves the detail unnamed on purpose

## 👊 The Messenger Of Satan To Buffet Me

"Buffet" means to strike again and again, like repeated blows.

Paul says Satan is the one delivering those blows.

Even so, Satan does not act outside of God's permission.

Job faced this same pattern of limited attacks earlier in scripture.

The thorn is painful, but it never escapes God's control.

👊 Buffet means repeated, ongoing blows

😈 Satan delivers the blows himself

🛑 Even Satan works within God's limits

📖 Job shows this same pattern earlier

## 🙏 I Besought The Lord Thrice

"Besought" means he begged, not just casually asked.

"Thrice" means at least three separate times.

Jesus prayed this same way in Gethsemane, asking three times.

Paul is not ashamed to admit he wanted relief.

Faithful prayer does not always get the answer it asks for.

🙏 Besought means he begged earnestly

🔢 Thrice means at least three times

✝️ Jesus prayed this same way once

📖 Faithful prayer is not always answered

## ✅ My Grace Is Sufficient For Thee

"Sufficient" means fully enough, not barely enough.

God does not promise to remove the thorn.

His grace will always be enough to carry Paul through it.

This answer redefines what Paul should actually be asking for.

The real need was never an easier life.

✅ Sufficient means fully enough, not barely

🚫 God does not remove the thorn

🙌 Grace is promised instead of relief

📖 The real need was never ease

## 🔄 My Strength Is Made Perfect In Weakness

This sounds like a contradiction at first.

Strength and weakness do not usually belong together.

God's power shows most clearly when human strength runs out.

Think of a cup that is already full.

Filling an empty one shows where the new water came from.

🔄 Strength and weakness seem like opposites

🫗 A full cup proves nothing new

💧 An empty cup reveals the real source

📖 Weakness displays God's power clearly

## 🔁 Most Gladly Therefore Will I Rather Glory In My Infirmities

Paul's attitude has fully shifted by this point.

He began the chapter reluctant to boast at all.

Now he says he is glad to boast, but only about weakness.

This is not fake positivity about suffering.

Weakness becomes the exact place God chooses to show up.

🔁 Paul's attitude has fully shifted

😊 He is now glad to boast

🙅 This is not fake positivity

📖 Weakness becomes where God shows up

## 🏛️ That The Power Of Christ May Rest Upon Me

"Rest upon" echoes how God's glory once rested on the tabernacle.

Paul pictures Christ's power settling on him the same visible way.

Weakness does not push God's power away.

Power dwells exactly in the place weakness already is.

🏛️ Rest upon echoes the tabernacle's glory

✨ Christ's power settles on Paul directly

🚫 Weakness does not push power away

📖 Power dwells exactly where weakness is

## 🩹 I Take Pleasure In Infirmities In Reproaches In Necessities In Persecutions In Distresses

"Take pleasure" does not mean Paul enjoyed the pain itself.

It means he welcomed what each hardship produced in him.

He names five very different kinds of suffering here.

Physical weakness, public insult, lack, attack, and crushing pressure all appear.

Every category of pain is included, not just one.

🩹 Infirmities means physical weakness

😔 Reproaches means public insults

📉 Necessities means lacking basic needs

📖 Every kind of suffering is welcomed

## 🔑 For When I Am Weak Then Am I Strong

This line resolves the paradox the whole chapter has built toward.

Weakness is not something Paul merely survives.

It becomes the very channel God's strength flows through.

The thorn itself never actually went away.

Paul's view of the thorn is what changed completely.

🔑 This line resolves the chapter's paradox

🚰 Weakness becomes the channel for strength

🌵 The thorn itself never went away

📖 Paul's view of it changed completely

# SecondCorinthians 12:11-13
# 🏆 Signs Of An Apostle
---
## 😤 I Am Become A Fool In Glorying

Paul admits that boasting like this makes him look foolish.

He insists the Corinthians forced him into it.

They should have defended his reputation themselves.

Instead their silence pushed Paul to defend himself.

Frustration speaks here, not pride.

😤 Paul admits this boasting looks foolish

👥 He says the Corinthians forced it

🛡️ They should have defended him first

📖 Frustration speaks here, not pride

## 🏆 In Nothing Am I Behind The Very Chiefest Apostles

"The very chiefest apostles" likely points to leaders like Peter, James, and John.

Paul claims full equality with them here.

"Though I be nothing" immediately qualifies that claim.

He is not denying his equality with other apostles.

He is denying that any of it comes from his own greatness.

🏆 Chiefest apostles means leaders like Peter

⚖️ Paul claims full equality with them

🙇 Though I be nothing humbles that claim

📖 None of it comes from his own greatness

## 🛠️ The Signs Of An Apostle Were Wrought Among You

"Wrought" means performed or carried out.

"Signs of an apostle" means proof that someone truly carries apostolic authority.

Paul says that proof already happened in Corinth itself.

He does not need to repeat the miracles now.

The Corinthians already watched them happen with their own eyes.

🛠️ Wrought means performed or carried out

✅ Signs of an apostle means real proof

👀 Corinth already watched this proof happen

📖 No new miracle needs repeating here

## ✅ In Signs And Wonders And Mighty Deeds

"Signs" points to miracles that confirm a message is true.

"Wonders" points to the awe those miracles caused in onlookers.

"Mighty deeds" points to the raw power behind the act itself.

The three words describe the same events from three different angles.

✅ Signs confirm that a message is true

😮 Wonders names the awe people felt

💪 Mighty deeds names the raw power

📖 Three angles, one complete picture

## 😏 Forgive Me This Wrong

This line is pure sarcasm, not a real apology.

The only wrong Paul committed was refusing their money.

Other traveling teachers in that culture charged for their time.

Paul served Corinth without ever being a financial burden.

He is mocking the idea that generosity needs forgiving.

😏 This line is deliberate sarcasm

💰 The wrong was refusing their money

🎁 Paul served them without being a burden

📖 Generosity does not need forgiving

# SecondCorinthians 12:14-18
# 🚪 A Third Visit No Burden
---
## 🔢 The Third Time I Am Ready To Come To You

"The third time" means Paul has already visited Corinth twice before.

One of those visits was a painful one, mentioned earlier in this letter.

He is now planning a third visit to the same church.

"Burdensome" means asking them to financially support him.

He commits to that same policy again before he even arrives.

🔢 Third time means this is visit number three

😔 One earlier visit was a painful one

💰 Burdensome means asking for financial support

📖 Paul commits to the same policy again

## 📏 I Seek Not Yours But You

Paul draws a clear line between two different things he could want.

"Yours" means their money and possessions.

"You" means the people themselves, their hearts and loyalty.

He insists he has only ever wanted the second one.

📏 Paul draws a clear line here

💰 Yours means their money and goods

❤️ You means the people themselves

📖 He has only ever wanted them

## 👪 The Children Ought Not To Lay Up For The Parents But The Parents For The Children

Paul uses an ordinary family picture to make his point.

In a healthy home, children do not save up money for their parents.

Parents are the ones who provide and save for their children instead.

Paul positions himself as a spiritual parent to the Corinthian church.

Giving flows from him to them, not the other way around.

👪 Paul uses an ordinary family picture

💰 Parents provide for children, not the reverse

🙇 Paul sees himself as their spiritual parent

📖 Giving flows from him to them

## 💸 I Will Very Gladly Spend And Be Spent For You

"Spend" pictures using up resources, time, and energy for someone else.

"Be spent" goes further, picturing Paul using up himself completely.

He says he will do this gladly, not out of obligation.

Nothing here is half hearted.

💸 Spend means using up resources for others

🔥 Be spent means using up himself

😊 He does this gladly, not reluctantly

📖 Nothing here is half hearted

## 😔 Though The More Abundantly I Love You The Less I Be Loved

Paul admits something painful here, plainly, without hiding it.

He loves the Corinthians more than they currently love him back.

That imbalance clearly hurts, but he keeps loving anyway.

Real love does not wait for an equal return before it gives.

😔 Paul admits a painful imbalance here

❤️ He loves more than he is loved

🤕 The imbalance clearly hurts him

📖 Real love does not wait for equal return

## 🗣️ Being Crafty I Caught You With Guile

Paul repeats an accusation made against him, not a confession.

"Crafty" and "guile" both mean clever deception meant to trick someone.

Critics apparently claimed his refusal of payment was itself a trick.

Paul says this with obvious sarcasm, not real guilt.

The accusation reveals more about his critics than about him.

🗣️ Paul repeats an accusation, not a confession

🎭 Crafty and guile both mean deception

😏 He says this with clear sarcasm

📖 The accusation reveals his critics, not him

## 👥 Did I Make A Gain Of You By Any Of Them Whom I Sent Unto You

Paul widens his defense to include the men he sent to Corinth.

"Make a gain" means to profit financially from someone.

He is asking the Corinthians to check the record themselves.

The expected answer here is no, not even once.

👥 Paul defends the men he sent too

💰 Make a gain means profiting financially

❓ He asks the Corinthians to check themselves

📖 The expected answer is no, not once

## 🤝 I Desired Titus And With Him I Sent A Brother

Titus was a trusted coworker Paul already mentions earlier in this letter.

Paul chose him personally to carry this appeal to Corinth.

The unnamed brother traveled alongside Titus as a witness to everything that happened.

Paul sent people he trusted completely, not strangers.

🤝 Titus was a trusted coworker of Paul

📨 Paul chose him to carry this appeal

👤 An unnamed brother traveled with him

📖 Paul sent people he trusted completely

## 🚶 Walked We Not In The Same Spirit Walked We Not In The Same Steps

"Same spirit" and "same steps" both describe consistent behavior.

Paul is not defending only himself here.

He is showing that his whole team acted with the same integrity.

One honest pattern ran through every person he sent.

Consistency itself is evidence that nothing dishonest happened.

🚶 Same steps means consistent, matching behavior

👥 The whole team shared one pattern

🔁 Spirit and steps both repeat the point

📖 Consistency itself proves nothing dishonest happened

# SecondCorinthians 12:19-21
# 😟 Fear Before The Visit
---
## ❓ Think Ye That We Excuse Ourselves Unto You

Paul anticipates a specific accusation before anyone even raises it.

Some might think his whole defense is really about saving his own reputation.

He flatly denies that motive here.

"We speak before God in Christ" means every word is accountable to God first.

Winning an argument in front of people is not his goal.

❓ Paul anticipates this exact accusation

🙅 He denies defending his own reputation

🙏 He speaks accountable to God first

📖 Winning an argument is not his goal

## 🏗️ We Do All Things Dearly Beloved For Your Edifying

"Edifying" means building someone up, the way a construction project adds to a building.

Paul's entire long defense in this letter has one real purpose.

That purpose is not protecting his own name for its own sake.

It is strengthening the Corinthians themselves.

Every hard word so far has aimed at their good, not his ego.

🏗️ Edifying means building someone up

🎯 His defense serves one real purpose

❤️ That purpose is their good

📖 Not his ego, their strength

## 😟 I Fear Lest When I Come I Shall Not Find You Such As I Would

Paul states his fear plainly instead of hiding it.

He worries the church has not changed the way he hopes.

He also worries they will see him differently than he wants.

This is not a confident apostle pretending everything is fine.

Honest leaders face real uncertainty too.

😟 Paul states his fear plainly

🔄 He worries the church has not changed

👀 He worries how they will see him

📖 Honest leaders face real uncertainty too

## ⚔️ Debates Envyings Wraths Strifes Backbitings Whisperings Swellings Tumults

Paul lists eight specific conflicts he fears finding in Corinth.

"Debates" means arguments over who is right.

"Envyings" means resentment over what someone else has.

"Backbitings" means talking badly about someone behind their back.

"Swellings" means pride that puffs a person up beyond the truth.

"Tumults" means outright chaos and disorder.

⚔️ Debates means arguing over who is right

😒 Envyings means resentment toward others

🗣️ Backbitings means talking badly behind backs

📖 Eight named sins, not one vague warning

## 😳 My God Will Humble Me Among You

"Humble" here does not mean a gentle, private lesson.

Paul fears God will expose him publicly if the church has not changed.

A pastor's reputation is tied to the health of the people he leads.

Unrepentant sin in Corinth would reflect badly on his own ministry.

This fear comes from love, not vanity.

😳 Humble here means public exposure

🔗 A pastor's reputation ties to his people

💔 Unrepentant sin reflects on his ministry

📖 This fear comes from love, not vanity

## 😭 I Shall Bewail Many Which Have Sinned Already

"Bewail" means to mourn deeply, more than simple disappointment.

Paul is not merely annoyed at sin he might find.

He pictures himself grieving over it the way someone grieves a real loss.

"Already" means this sin was happening before this letter was even written.

His sorrow is for people he genuinely loves, not strangers.

😭 Bewail means to mourn deeply

🚫 This is grief, not mere annoyance

📅 Already means the sin predates this letter

📖 His sorrow is for people he loves

## 🚫 The Uncleanness And Fornication And Lasciviousness Which They Have Committed

These three words describe specific sexual sin, not vague wrongdoing.

"Uncleanness" means moral impurity in a general sense.

"Fornication" means sexual immorality outside of marriage.

"Lasciviousness" means an unrestrained appetite for such behavior, without shame.

That open culture made the sin easy to drift back into.

🚫 Uncleanness means general moral impurity

💔 Fornication means sex outside marriage

🔥 Lasciviousness means shameless, unrestrained lust

📖 Corinth's culture made drifting back easy
`.trim();

export const SECOND_CORINTHIANS_TWELVE_PERSONAL_SECTIONS = parseSecondCorinthiansTwelveRawNotes(SECOND_CORINTHIANS_TWELVE_RAW_NOTES);
