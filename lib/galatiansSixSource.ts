export type GalatiansSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGalatiansSixRawNotes(rawText: string): GalatiansSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GalatiansSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Galatians\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Galatians 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Galatians\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Galatians\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Galatians 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Galatians 6:${startVerse}` : `Galatians 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Galatians 6 sections, received " + sections.length);
  }

  return sections;
}

const GALATIANS_SIX_RAW_NOTES = `# Galatians 6:1-5
# 🤝 Bear One Another's Burdens
---
## 🪤 If A Man Be Overtaken In A Fault

Overtaken means caught off guard, not planned ahead of time.

This pictures someone trapped by sin before they saw it coming.

Paul is not describing a rebel who planned to sin.

He is describing a believer who stumbled without meaning to.

That difference changes how the church should respond.

🪤 Overtaken means caught off guard

🙇 This is not planned rebellion

🤲 The person stumbled without meaning to

📖 That changes how the church responds

## 🩹 Ye Which Are Spiritual, Restore Such An One

Spiritual here names believers walking closely with God, not an elite class.

Restore is a repair word, used for setting a broken bone back in place.

The goal is healing, not punishment or public shame.

Someone has to do this work, and Paul says it falls to the mature.

🩹 Restore means repair, like a bone

🙅 Spiritual is not an elite label

🎯 The goal is healing, not shame

📖 Mature believers carry this responsibility

## 💪 In The Spirit Of Meekness

Meekness means strength that chooses to be gentle on purpose.

Restoring a fallen believer with force or shame usually backfires.

Meekness corrects without crushing the person being helped.

This is strength under control, not softness or weakness.

💪 Meekness is strength under control

🚫 Force and shame usually backfire

🤲 Correction without crushing the person

📖 Gentle strength restores, not crushes

## ⚠️ Considering Thyself, Lest Thou Also Be Tempted

Paul adds a warning aimed at the person doing the restoring.

Anyone helping a fallen believer can fall into the same sin.

Looking down on someone else's failure is its own kind of pride.

This keeps correction humble instead of superior.

⚠️ A warning for the one helping

🪞 The helper can fall too

💔 Looking down is its own pride

📖 This keeps correction humble

## 🎒 Bear Ye One Another's Burdens

A burden here means a heavy load a person cannot carry alone.

This could be grief, temptation, a hard sin struggle, or exhaustion.

Bearing it means sharing the weight, not just offering sympathy from a distance.

The church is meant to carry hard things together.

🎒 A burden is too heavy alone

🤝 Bearing it means sharing the weight

🙌 Not distant sympathy, real help

📖 The church carries hard things together

## ✅ So Fulfil The Law Of Christ

Fulfil means to complete or carry out fully, not just agree with in theory.

The law of Christ is not a new list of rules to follow.

It is love acted out exactly as Christ loved believers first.

Burden bearing is what that law actually looks like in practice.

✅ Fulfil means carry out fully

📜 Not a new rule list

❤️ Love acted out like Christ did

📖 Burden bearing fulfills that law

## 🎭 If A Man Think Himself To Be Something, When He Is Nothing

This describes someone with an inflated view of their own importance.

Thinking you are something when you are nothing is a form of self deception.

Pride often shows up right when someone is helping or correcting another person.

The warning fits perfectly after the call to restore a fallen believer gently.

🎭 An inflated view of your own importance

🙈 This is a form of self deception

⚠️ Pride often shows up during correction

📖 Pride ruins the gentle restoring Paul just described

## 🔍 Let Every Man Prove His Own Work

Prove means test or examine carefully, not just glance at.

Paul tells each person to check their own work, not everyone else's.

This guards against measuring yourself only by comparison to others.

Comparison can hide real problems or create false confidence.

🔍 Prove means test carefully

🪞 Check your own work first

🚫 Not measured by comparison to others

📖 Comparison hides real problems

## 🤔 Every Man Shall Bear His Own Burden

This sounds like it contradicts bearing one another's burdens from a few lines earlier.

It does not cancel the community support from a moment ago.

It adds personal responsibility right beside that support.

Some things only you can carry for yourself.

Choices and growth are two examples of that.

Community help and personal responsibility both belong in a healthy church.

🤔 This seems to contradict verse two

🧩 It adds responsibility, not cancels help

🎒 Some things only you can carry

📖 Both community help and responsibility matter

# Galatians 6:6-10
# 🌾 Whatsoever A Man Soweth
---
## 💬 Let Him That Is Taught In The Word Communicate Unto Him That Teacheth

Communicate here does not mean conversation, it means sharing material support.

The word covers money, food, or whatever a teacher needs to live.

Paul expects students of the word to help provide for their teachers.

Teaching the church was real work, and real work deserves real support.

💬 Communicate means sharing material support

💰 This covers money, food, basic needs

🙏 Students should help provide for teachers

📖 Real teaching work deserves real support

## 🙅 God Is Not Mocked

Mocked means fooled or deceived, treated as if He will not notice.

Paul warns that trying to get around this spiritual principle will not work.

Sowing and reaping is not a suggestion, it is how reality is built.

Nobody gets away with pretending this law does not apply to them.

🙅 Mocked means fooled or deceived

⚠️ You cannot get around this principle

🌾 Sowing and reaping is reality itself

📖 Nobody escapes this law

## 🌱 Whatsoever A Man Soweth, That Shall He Also Reap

Soweth means planting seed, and reap means gathering the harvest later.

Paul borrows a farming picture everyone in his audience understood instantly.

What a person plants now determines what grows later, with no shortcuts.

This principle works everywhere, not just in a field.

🌱 Soweth means planting, reap means harvest

🚜 A farming picture everyone understood

⏳ What you plant now grows later

📖 This principle works everywhere

## 🔥 He That Soweth To His Flesh Shall Of The Flesh Reap Corruption

Sowing to the flesh means feeding sinful desires again and again.

Corruption means decay, the slow breakdown of something that was once whole.

That harvest is not sudden, it builds up slowly over time.

Feeding the flesh now quietly grows something that eventually falls apart.

🔥 Sowing to the flesh feeds sin

🍂 Corruption means slow decay

⏳ This harvest builds up over time

📖 Feeding sin grows something that collapses

## 🌿 He That Soweth To The Spirit Shall Of The Spirit Reap Life Everlasting

This verse gives the exact opposite harvest as a direct contrast.

Sowing to the Spirit means choosing what the Spirit wants again and again.

Life everlasting here means the full, unending life God gives, not just more years.

The same planting principle produces two completely different harvests.

🌾 The exact opposite harvest, on purpose

🕊️ Sowing to the Spirit means obeying it

🌿 Life everlasting means full, unending life

📖 Same principle, two different harvests

## 😓 Let Us Not Be Weary In Well Doing

Weary means worn down, tempted to give up from exhaustion.

Well doing means ongoing good works, not a single kind act.

Paul knows that doing good for a long time without reward feels draining.

He is not shaming tiredness, he is encouraging people to keep going anyway.

😓 Weary means worn down, tempted to quit

🌱 Well doing means ongoing good works

⏳ Doing good long term feels draining

📖 Paul encourages pressing on anyway

## 📅 In Due Season We Shall Reap, If We Faint Not

Due season means the right time, not whenever a person wants it.

Harvests in farming come on their own timetable, never on demand.

Faint means collapse or give up completely before that timetable arrives.

The promise is real, but it requires patience to actually reach it.

📅 Due season means the right time

🌾 Harvests follow their own timetable

🛑 Faint means giving up completely

📖 The promise requires patience to reach

## 🌍 Do Good Unto All Men, Especially Unto Them Who Are Of The Household Of Faith

Paul sets a wide circle first, good done toward everyone without exception.

Household of faith means fellow believers, people connected by faith in Christ.

Especially shows a priority, not an exclusion of anyone outside that circle.

Love starts at home, then reaches outward from there.

🌍 Good done toward everyone first

🏠 Household of faith means fellow believers

🎯 Especially means priority, not exclusion

📖 Love starts at home, then spreads

# Galatians 6:11-13
# ✍️ I Have Written With Mine Own Hand
---
## 🖊️ Ye See How Large A Letter I Have Written Unto You With Mine Own Hand

Paul normally dictated his letters to a scribe who did the actual writing.

Here he takes the pen himself for this closing section.

Large letters likely means his own handwriting was big and rough looking.

Many scholars believe this points to a vision problem or hands worn from labor.

The personal signature proves this letter truly came from Paul himself.

✍️ Paul usually dictated to a scribe

🖊️ Here he writes with his own hand

👁️ Large letters may point to poor eyesight

📖 This proves the letter is truly his

## 🎭 To Make A Fair Shew In The Flesh

Fair shew means an impressive outward performance, not real substance underneath.

These teachers wanted to look successful in the eyes of other people.

Flesh here points to outward, physical religious credit, like circumcision.

The goal was appearance, not actual faithfulness to God.

🎭 Fair shew means an impressive performance

👀 They wanted to look successful

🩹 Flesh points to outward religious credit

📖 Appearance mattered more than faithfulness

## 💪 They Constrain You To Be Circumcised

Constrain means to pressure or force, not simply suggest or invite.

This was not a gentle offer left open for the Galatians to consider.

These teachers pushed hard to require circumcision as if it were mandatory.

That pressure itself reveals how far they had drifted from the true gospel.

💪 Constrain means pressure, not a suggestion

🚫 This was not a gentle offer

⚖️ Circumcision was pushed as mandatory

📖 The pressure reveals the drifted gospel

## 🎯 Only Lest They Should Suffer Persecution For The Cross Of Christ

This reveals their real motive, and it was not love for the Galatians.

Preaching only grace without the law angered the wider Jewish community at the time.

Adding circumcision let these teachers avoid that backlash for themselves.

Fear of persecution was quietly driving their entire message.

🎯 Their real motive now gets exposed

😨 They feared backlash from the wider community

🛡️ Circumcision let them avoid persecution

📖 Fear was driving their message

## ⚖️ Neither They Themselves Who Are Circumcised Keep The Law

Paul exposes a direct hypocrisy here, not just a difference of opinion.

These teachers demanded circumcision but did not actually keep the rest of the law themselves.

Their own lives did not match the standard they were forcing onto others.

A rule enforced by someone who ignores it loses all its weight.

🎭 Paul exposes direct hypocrisy here

⚖️ They did not keep the law themselves

🙅 Their lives did not match their demand

📖 An unkept rule loses its weight

## 🏆 That They May Glory In Your Flesh

Glory here means boasting, taking personal credit for something impressive.

Flesh again points to the physical mark of circumcision on the Galatians.

These teachers wanted to count converts as personal trophies to show off.

People were being used to build someone else's reputation.

🏆 Glory means boasting, taking credit

🩹 Flesh points to the circumcision mark

📊 Converts became personal trophies to them

📖 People were used to build reputation

# Galatians 6:14-16
# ✝️ God Forbid That I Should Glory
---
## ⚖️ God Forbid That I Should Glory, Save In The Cross Of Our Lord Jesus Christ

Paul draws a sharp contrast with the teachers he just exposed.

They gloried in flesh, Paul refuses to glory in anything except the cross.

God forbid is a strong expression, closer to an emphatic never.

The cross, once a symbol of shame, becomes Paul's only source of pride.

⚖️ A sharp contrast with those teachers

🚫 They gloried in flesh, Paul will not

❗ God forbid means an emphatic never

📖 The cross is Paul's only pride

## ✝️ By Whom The World Is Crucified Unto Me, And I Unto The World

This describes a death that runs in both directions at once.

The world's old value system, status, and pride, is dead to Paul now.

Paul himself looks dead and worthless by that same world's old standards.

Both sides of that old relationship have been ended completely.

✝️ A death running both directions at once

🌍 The world's old values are dead to Paul

🙈 Paul looks worthless by those old standards

📖 That old relationship is fully ended

## ⚖️ In Christ Jesus Neither Circumcision Availeth Any Thing, Nor Uncircumcision

Availeth means counts for anything or carries any weight at all.

Paul says this exact point for the second time in this short letter.

Neither having the mark nor lacking it changes a person's standing with God.

The whole debate the false teachers started simply does not matter to God.

⚖️ Availeth means carries any weight

🔁 Paul repeats this key point again

🙅 Having or lacking the mark changes nothing

📖 This whole debate does not matter to God

## 🌱 But A New Creature

New creature means a brand new creation, not a self improvement project.

This is not someone trying harder to be better than before.

It describes a completely new identity formed inside a person by Christ.

That new identity is the real thing that actually matters to God.

🌱 New creature means a new creation

🚫 Not a self improvement project

✨ A completely new identity in Christ

📖 That new identity is what matters

## 📏 As Many As Walk According To This Rule

Rule here means the standard Paul just named, new creation over old marks.

Walk pictures a daily, ongoing way of living out that standard.

This rule applies to anyone who follows it, with no exceptions listed.

Paul is drawing a clear line for how to measure true faith.

📏 Rule means the standard just named

🚶 Walk means a daily ongoing practice

🌍 This applies to anyone who follows it

📖 Paul draws a clear line here

## 🙏 Peace Be On Them, And Mercy, And Upon The Israel Of God

Peace and mercy here are a blessing Paul speaks over those who follow that rule.

Israel of God likely means everyone who belongs to God by faith, not only ethnic Israel.

That includes both Jewish and Gentile believers walking by the same new creation standard.

The old wall between the two groups has come down in Christ.

🙏 Peace and mercy are Paul's blessing

🌍 Israel of God may mean all believers

🤝 Jewish and Gentile believers are included

📖 The old wall has come down

# Galatians 6:17-18
# 🩹 The Marks Of The Lord Jesus
---
## 🚪 From Henceforth Let No Man Trouble Me

Paul is closing the door on this entire argument for good.

Trouble here echoes the same word used earlier for the false teachers who stirred up confusion.

Paul is not asking for debate, he is ending one.

He has made his case, and he will not keep defending it.

🚪 Paul closes the door on this debate

🔁 Trouble echoes the earlier troublemakers

🛑 This is not an invitation to argue

📖 Paul will not keep defending this

## 🩹 I Bear In My Body The Marks Of The Lord Jesus

Marks here likely means the scars Paul carried from beatings and stonings for preaching the gospel.

These scars were his real credentials, unlike the circumcision the false teachers demanded.

A circumcision scar is chosen and painless, these scars cost Paul everything.

His own body already proved who he truly served.

🩹 Marks means scars from real suffering

⚔️ These scars came from preaching the gospel

🙅 Unlike the chosen, painless circumcision mark

📖 Paul's body already proved his loyalty

## 🙏 Brethren, The Grace Of Our Lord Jesus Christ Be With Your Spirit

Paul closes the way he usually does, with a blessing of grace.

Your spirit makes this personal, speaking straight to each individual reader.

After a sharp and urgent letter, Paul still ends with warmth.

Correction and love were never opposites for Paul.

🙏 Paul closes with a blessing of grace

❤️ Your spirit makes this personal

🔥 A sharp letter still ends with warmth

📖 Correction and love were never opposites
`.trim();

export const GALATIANS_SIX_PERSONAL_SECTIONS = parseGalatiansSixRawNotes(GALATIANS_SIX_RAW_NOTES);
