export type JeremiahFortyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFortyTwoRawNotes(rawText: string): JeremiahFortyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFortyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+42:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 42 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+42:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+42:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 42 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 42,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 42:${startVerse}` : `Jeremiah 42:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Jeremiah 42 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FORTY_TWO_RAW_NOTES = `# Jeremiah 42:1-3
# 🙏 The Remnant Pleads For Guidance
---
## 👐 From The Least Even Unto The Greatest

This phrase means everyone, with no exceptions for rank.

It covers the top military leaders and the lowest ordinary people.

The whole community approached Jeremiah together, not just a few leaders.

That makes the plea that follows a request from the entire remnant.

👐 Least to greatest means everyone included
🎖️ Leaders and common people came together
🤝 The whole remnant approached as one
📖 Their plea belonged to the entire group

## 🗣️ We Beseech Thee

"Beseech" means to beg earnestly.

This was not a casual, polite request.

The people were desperate for God to speak at all.

Their desperation sets up the promise of obedience two verses later.

🗣️ Beseech means to beg earnestly
😟 This was urgent, not casual
🙏 They pleaded for God to speak
➡️ Their desperation leads to a promise

## 😢 We Are Left But A Few Of Many

This line admits how small the surviving community had become.

Most of Judah was already dead, deported, or scattered.

The few who remained were standing in front of Jeremiah.

Their small number explains why this decision carried so much weight.

😢 Left but a few means a small remnant
💀 Most of Judah was already gone
🧍 The survivors stood before Jeremiah together
➡️ Their small number raised the stakes

## 🧭 Shew Us The Way Wherein We May Walk

This does not ask for a literal road or direction.

"The way" is a Hebrew idiom for a course of life or conduct.

They wanted to know what choice God wanted them to make next.

Chapter forty two gives them a clear answer to that question.

🧭 The way means a course of action
🚫 This is not a literal road
❓ They wanted to know God's next step
📖 Chapter forty two answers that question

# Jeremiah 42:4-6
# 🤝 A Vow Before It Is Tested
---
## 🤐 I Will Keep Nothing Back From You

Jeremiah promises to give them the whole message, not an edited version.

He will not soften a hard answer or hide a good one.

That promise matters in this chapter.

The answer they are about to receive is a hard one.

A prophet's job is to deliver the full word, not a comfortable one.

🤐 Keep nothing back means full honesty
✂️ Jeremiah will not edit the message
😬 The coming answer will be hard
📖 A prophet delivers the whole word

## ⚖️ The LORD Be A True And Faithful Witness Between Us

Calling God as a witness was a serious legal custom in the ancient world.

It meant staking their word on God himself if they broke the promise.

This was not a casual thing to say out loud.

The weight of this oath makes their later disobedience even more serious.

⚖️ A witness oath called on God directly
📜 Breaking it meant breaking faith with God
😐 This was not said casually
➡️ Their later actions break a serious vow

## ⚫ Whether It Be Good, Or Whether It Be Evil

This phrase names two complete opposites to cover everything in between.

They are promising to obey no matter what answer Jeremiah brings back.

A promise like this is easy to make before hearing the actual answer.

The real test comes once the answer turns out to be hard.

⚫ Good or evil means every possible answer
🗣️ They promised total obedience in advance
😌 Promises are easy before the test
➡️ The real test comes after the answer

## 🌿 That It May Be Well With Us

"Well" here means more than comfort or ease.

It describes a full and lasting peace for the whole community.

They tie their own wellbeing directly to obeying God's voice.

That connection is the real point of their promise.

🌿 Well means full lasting peace
🔗 They link peace to obedience
🗳️ The whole community makes this vow
📖 Obedience and wellbeing are tied together

# Jeremiah 42:7-12
# ⏳ God Answers: Stay And Be Rebuilt
---
## ⏳ After Ten Days

Jeremiah did not get an answer right away.

Ten days passed between the request and the word of the LORD arriving.

The text does not explain why the wait lasted that long.

Even a prophet had to wait on God's own timing.

⏳ Ten days passed before any answer
🤷 The text never explains the delay
🙇 Even Jeremiah had to simply wait
📖 God answers on his own timing

## 🏗️ I Will Build You, And Not Pull You Down

This building and planting language is not new.

It first appeared back in chapter one.

That was when Jeremiah himself was first called.

There it covered tearing down as well as building up.

Here God turns the building side of that promise toward the people.

The same God who announced judgment now offers to restore.

🏗️ Build and plant language started in chapter one
🧱 That calling covered both tearing down and building
🌱 God now offers the building half
➡️ The judge is also the restorer

## 😌 I Repent Me Of The Evil That I Have Done Unto You

"Repent" here does not mean God sinned or made a mistake.

It means God is turning away from the judgment already set in motion.

The evil mentioned is punishment, not wrongdoing on God's part.

This is God choosing mercy over the destruction already announced.

😌 Repent here means turning from judgment
🚫 God did not sin or err
⚖️ Evil here means punishment, not wrongdoing
📖 Mercy is replacing announced destruction

## 😨 Be Not Afraid Of The King Of Babylon

Babylon was the very nation this whole chapter is trying to escape.

God names that exact fear and tells them to let it go.

Fear of Babylon is the real reason they want to run to Egypt.

Removing that fear removes their whole excuse for leaving.

😨 Babylon is the fear driving this chapter
🛑 God directly names and addresses that fear
🏃 Fear of Babylon fuels the Egypt plan
➡️ Without that fear, their excuse disappears

## 🤲 I Will Shew Mercies Unto You, That He May Have Mercy Upon You

God says he will work through the king of Babylon himself.

A foreign king becomes the means of God's mercy, not just a threat.

This flips the people's assumption that Babylon only brings harm.

Mercy can arrive through the very hand people are afraid of.

🤲 God works mercy through Babylon's king
🔄 A feared enemy becomes a means of mercy
😮 This flips their whole assumption
📖 Mercy can come through a feared hand

## 🏡 Cause You To Return To Your Own Land

This promise ties their future directly to the land of Judah.

The land was not just property.

It was part of God's covenant with their ancestors.

Staying meant keeping their place inside that covenant story.

Leaving for Egypt meant walking away from that promise entirely.

🏡 Return ties them to the covenant land
📜 The land was part of God's covenant
🧬 Staying kept them in that story
➡️ Egypt meant walking away from it

# Jeremiah 42:13-18
# 🇪🇬 The Trap Waiting In Egypt
---
## 🎺 We Shall See No War, Nor Hear The Sound Of The Trumpet, Nor Have Hunger Of Bread

This phrase names three specific fears behind fleeing to Egypt.

War threatens their lives.

The trumpet signals soldiers marching into battle.

Hunger threatens their food supply.

They believed Egypt would remove them from all three dangers at once.

🎺 Trumpet means the call to battle
⚔️ War, hunger, and fear all drove this plan
🇪🇬 Egypt looked like an escape from all three
➡️ That escape turns out to be false

## 🎯 Set Your Faces To Enter Into Egypt

"Setting your face" is a Hebrew idiom for being fully determined.

It does not describe a possibility they are still weighing.

It describes a decision they have already made in their hearts.

That is exactly the dissembling named later in this same chapter.

🎯 Setting the face means full determination
🚫 This is not a maybe or option
✅ Their minds were already made up
📖 Their hidden choice comes up again later

## ⚔️ The Sword, Which Ye Feared, Shall Overtake You There

Egypt was supposed to be the place without war.

Instead, the very danger they are running from catches up with them there.

Fleeing does not outrun what God has already warned about.

The thing they fear most becomes the thing that finds them.

⚔️ The sword they feared follows them there
🇪🇬 Egypt was not the safe place they hoped
🏃 Running away does not outrun God's warning
➡️ Their greatest fear finds them anyway

## 🚫 None Of Them Shall Remain Or Escape

This line removes any hope of a partial escape.

It does not describe some people getting away and others staying caught.

Every single person who goes down this path shares the same outcome.

The warning covers the whole group, not just a few unlucky individuals.

🚫 None means the whole group, no exceptions
🧍 No partial escape is offered here
👥 Everyone sharing this choice shares this outcome
➡️ This warning spares no one in the group

## 🔥 As Mine Anger And My Fury Hath Been Poured Forth Upon The Inhabitants Of Jerusalem

Jerusalem had already experienced the full weight of this same judgment.

God compares what is coming in Egypt directly to what already happened there.

Distance does not change the outcome.

Only the location changes.

The same fury that fell on Jerusalem is not finished yet.

🔥 Jerusalem already suffered this same fury
🗺️ Egypt gets compared directly to Jerusalem
🧭 Changing location does not change the outcome
➡️ The same judgment is not finished

## 👋 Ye Shall See This Place No More

"This place" refers to the land of Judah itself.

Those who stay were promised a return to this same land in verse twelve.

Those who flee to Egypt are told the opposite.

One choice leads home.

The other leads away forever.

👋 This place means the land of Judah
🏡 Staying was tied to an eventual return
🇪🇬 Leaving was tied to permanent exile
➡️ One choice leads home, one leads away

# Jeremiah 42:19-22
# ⚖️ The Verdict Before The Choice
---
## 📢 I Have Admonished You This Day

"Admonished" means formally and seriously warned.

This was not a casual mention.

This kind of warning carried legal weight in the ancient world.

After this, no one in the group can claim they were never told.

The warning is now on record before anything happens next.

📢 Admonished means a formal, serious warning
📜 This carried real legal weight
🙅 No one can claim ignorance now
📖 The warning stands on record

## 🎭 Ye Dissembled In Your Hearts

"Dissembled" means they hid their true intention behind a false request.

They asked Jeremiah to pray as if the answer were still open.

Their hearts were already set on going to Egypt before he even answered.

Asking for guidance only works when the question is genuinely open.

Theirs was not.

🎭 Dissembled means hiding a true intention
❓ Their request looked open but was not
🇪🇬 Their hearts had already chosen Egypt
➡️ Fake honesty is still dishonesty

## 🙅 Ye Have Not Obeyed The Voice Of The LORD Your God

This verdict comes before the people have actually done anything in this chapter.

Their decision was already visible to God through their dissembling in verse twenty.

The failure named here is not a future possibility.

It is already settled.

The next chapter carries out what their hearts had already chosen here.

🙅 This verdict comes before their next move
👁️ God already saw their hidden decision
⚖️ Their failure is already settled, not future
📖 Chapter forty three carries out this choice

## ☠️ Ye Shall Die By The Sword, By The Famine, And By The Pestilence

This same triple warning already appeared twice earlier in this chapter.

Sword means death by violence.

Famine means death by starvation.

Pestilence means death by disease.

All three were already happening inside Judah.

Egypt was never going to be a safe escape from any of them.

☠️ Sword, famine, and pestilence repeat a warning
🩸 Sword means death by violence
🍞 Famine means death by starvation
📖 Egypt offers no real escape
`.trim();

export const JEREMIAH_FORTY_TWO_PERSONAL_SECTIONS = parseJeremiahFortyTwoRawNotes(JEREMIAH_FORTY_TWO_RAW_NOTES);
