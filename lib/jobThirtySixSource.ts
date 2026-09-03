export type JobThirtySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobThirtySixRawNotes(rawText: string): JobThirtySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobThirtySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+36:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 36 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+36:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+36:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 36 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 36,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 36:${startVerse}` : `Job 36:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Job 36 sections, received " + sections.length);
  }

  return sections;
}

const JOB_THIRTY_SIX_RAW_NOTES = `# Job 36:1-4
# 👂 Elihu Speaks For God Again
---
## 🗣️ Suffer Me A Little

"Suffer" is an old word that means "allow" or "permit."

It has nothing to do with pain or hardship.

Elihu is asking Job for a little more patience before he continues.

He believes he still has more to say in God's defense.

🗣️ Suffer means allow or permit

⏳ Elihu asks for more patience

📢 He is still defending God

📖 Old words can hide simple meanings

## 📣 I Have Yet To Speak On God's Behalf

Elihu has already spoken twice before this.

He tells Job plainly that he is not finished yet.

Everything Elihu says from here forward is meant to defend God's fairness.

He sees himself as God's spokesman in this conversation.

🔁 Elihu has spoken twice already

🗣️ He says he is not finished

🛡️ He speaks to defend God

📖 Elihu sees himself as God's spokesman

## 🌍 I Will Fetch My Knowledge From Afar

"From afar" means Elihu is drawing on more than just his own opinion.

He claims to pull from a wide range of knowledge and experience.

This is Elihu building up his own credibility before he speaks.

He wants Job to trust what comes next.

🌍 From afar means wide ranging knowledge

📚 Elihu claims broad experience

🎤 He is building his own credibility

➡️ He wants Job to trust him

## 📝 Ascribe Righteousness To My Maker

"Ascribe" means to credit something to someone.

Elihu promises to give God credit for being right in every situation.

This is the whole goal of everything Elihu is about to say.

He wants to defend God's fairness, not just win an argument with Job.

📝 Ascribe means to give credit

⚖️ Elihu will credit God as right

🎯 This is Elihu's whole goal

📖 Defending God matters more than winning

## 🎯 He That Is Perfect In Knowledge Is With Thee

Elihu claims his own understanding is complete and without error.

That is a bold, risky claim for anyone to make about himself.

Job's three friends failed earlier by claiming too much certainty as well.

Elihu is about to make the same mistake he criticized in them.

🎯 Elihu claims flawless understanding

⚠️ That claim is bold and risky

🔁 His friends made a similar mistake

📖 Confidence is not the same as truth

# Job 36:5-9
# ⚖️ God Watches The Righteous And The Wicked
---
## 💪 God Is Mighty, And Despiseth Not Any

Elihu opens with a plain statement about who God is.

God has enormous power, yet He does not look down on anyone.

Strength and kindness sit together in Him without conflict.

That combination is rare among powerful people.

💪 God holds enormous power

❤️ He does not despise anyone

⚖️ Strength and kindness both fit Him

📖 Real power does not need cruelty

## 🚫 He Preserveth Not The Life Of The Wicked

God does not prop up or protect wicked people forever.

At the same time He actively gives justice to the poor.

Elihu is describing a God who is actually paying attention.

Nobody gets ignored on either side of that balance.

🚫 God does not protect wicked lives

⚖️ He gives justice to the poor

👀 God is actively paying attention

📖 Nobody is overlooked by Him

## 👁️ He Withdraweth Not His Eyes From The Righteous

God keeps His attention on those who live rightly.

"With kings are they on the throne" pictures the righteous honored at the highest level.

Elihu says God can lift someone up permanently, not just for a season.

Being exalted here means lasting honor, not a temporary reward.

👁️ God watches the righteous closely

👑 They are pictured beside kings

⏳ God can lift someone up for good

📖 Lasting honor comes from God

## ⛓️ Bound In Fetters, And Holden In Cords Of Affliction

"Fetters" are chains or restraints used on a prisoner.

"Cords of affliction" describes suffering that feels just as tight and binding.

Elihu is not only talking about literal prisoners here.

He means anyone trapped by hardship, sickness, or loss.

⛓️ Fetters means chains or restraints

😣 Cords of affliction means binding suffering

🌍 This applies beyond literal prisoners

📖 Hardship can feel like being bound

## 🪞 He Sheweth Them Their Work, And Their Transgressions

Suffering is not always random punishment in Elihu's view.

Sometimes it becomes the moment a person finally sees their own sin clearly.

"Transgressions that they have exceeded" means sin that has gone too far.

Affliction can act like a mirror a person cannot look away from.

🪞 Suffering can reveal hidden sin

📈 Exceeded means sin gone too far

👀 Affliction forces honest self examination

📖 Hard seasons can expose the truth

# Job 36:10-14
# 👂 Discipline, Obedience, And Wasted Death
---
## 👂 He Openeth Also Their Ear To Discipline

"Openeth their ear" is a picture of someone finally becoming able to listen.

Before this moment, the message may have been there all along, unheard.

Discipline here means correction, not punishment for its own sake.

God's goal is a change of direction, not simply pain.

👂 Opening the ear means becoming able to listen

🎯 Discipline means correction, not cruelty

🔁 God's goal is a changed direction

📖 Correction aims at healing, not harm

## 🌾 They Shall Spend Their Days In Prosperity

Elihu lays out a clear path for anyone who listens and obeys.

Obedience here does not earn God's love, it responds to His correction.

The reward described is a full, peaceful life, not overnight riches.

Elihu wants Job to see that this door is still open to him.

✅ Obedience follows real correction

🌾 Prosperity here means a full life

🚪 This path is still open

➡️ Job can still choose it

## ⚔️ They Shall Perish By The Sword, And Die Without Knowledge

Elihu now describes the opposite path.

Refusing correction leads to a death that teaches the person nothing.

"Without knowledge" is the saddest part of this warning.

A painful ending becomes even worse when nothing was ever learned from it.

⚔️ Refusing correction has real consequences

🚫 Without knowledge means nothing was learned

😢 A wasted ending is the saddest part

📖 Suffering without learning helps no one

## 🎭 The Hypocrites In Heart Heap Up Wrath

"Hypocrites in heart" means people who look fine outwardly but resist God inside.

They keep storing up anger instead of dealing with what is wrong.

"They cry not when he bindeth them" means they never actually turn to God in their suffering.

That silence, not the suffering itself, is what keeps them stuck.

🎭 Hypocrites in heart hide inner resistance

📦 They store up anger instead of change

🤐 They never actually cry out to God

📖 Silence toward God keeps them stuck

## 😔 They Die In Youth, And Their Life Is Among The Unclean

This is a hard verse to read plainly.

Many scholars believe "the unclean" points to a life spent in shameful company.

Dying young here is not simply about age.

It pictures a life cut short, still tangled in the very sin that trapped it.

😔 A hard verse to read plainly

🤷 The unclean likely means shameful company

⏳ Dying young is not just about age

📖 A life can end still tangled in sin

# Job 36:15-19
# 🚪 A Door Back Into Blessing
---
## 🔁 He Delivereth The Poor In His Affliction

Elihu circles back to the same idea from verse ten.

Affliction can become the very place where God opens someone's ears.

The poor here means anyone humbled by hardship, not only the financially poor.

Suffering and rescue are not opposites in Elihu's argument.

🔁 This echoes the idea from verse ten

👂 Affliction can open someone's ears

🙇 The poor means anyone humbled by hardship

📖 Rescue can arrive inside suffering itself

## 🚧 Out Of The Strait Into A Broad Place

"Strait" is an old word for a narrow, tight, difficult place, not a straight line.

"Broad place" pictures open space, room to breathe, and relief.

Elihu tells Job this is exactly where God intended to bring him.

"A table full of fatness" pictures a life of overflowing abundance, not just enough to get by.

🚧 Strait means a tight, difficult place

🌄 Broad place means open relief

🍽️ Fatness pictures overflowing abundance

📖 This was God's intended direction for Job

## 🎯 Thou Hast Fulfilled The Judgment Of The Wicked

Elihu now turns the warning directly onto Job.

He is not saying Job committed the same sins as the wicked.

He means Job's complaints have started to sound like theirs.

"Judgment and justice take hold on thee" warns Job that he is now under close examination.

🎯 Elihu turns this warning onto Job

🗣️ Job's complaints echo the wicked

🔍 Job is now under close examination

📖 Words can accidentally mirror the wrong crowd

## 💰 A Great Ransom Cannot Deliver Thee

"Ransom" here means a payment offered to escape punishment.

Elihu warns that no amount of money could buy Job out of God's judgment.

This is a serious caution, not a threat meant to crush Job.

Elihu wants Job to take the warning seriously before it goes any further.

💰 Ransom means a payment to escape punishment

🚫 No payment can buy off God's judgment

⚠️ This is a serious caution

📖 Elihu wants Job to listen now

## ❓ Will He Esteem Thy Riches? No, Not Gold

Elihu asks a pointed question and answers it himself.

Job had been a wealthy man before his losses.

None of that wealth carries any weight with God.

God cannot be bribed or impressed by anything money can buy.

❓ Elihu asks and answers his own question

💎 Job's former wealth carried no weight

🚫 God cannot be bribed

📖 Money means nothing to God's judgment

# Job 36:20-25
# 🌌 Do Not Desire The Night
---
## 🌙 Desire Not The Night

"The night" here pictures death or sudden disaster arriving unseen.

Elihu warns Job not to wish for an escape through death.

"When people are cut off in their place" describes lives ending suddenly, without warning.

This is Elihu urging patience instead of a desperate shortcut.

🌙 The night pictures death or disaster

🙏 Elihu warns against wishing for it

⚡ People can be cut off suddenly

📖 Patience beats a desperate shortcut

## 🔀 This Hast Thou Chosen Rather Than Affliction

Elihu accuses Job of preferring complaint over honest correction.

"Regard not iniquity" is a warning to stay away from that path entirely.

Elihu believes Job has picked venting frustration over facing what needs to change.

Affliction was never the real enemy here.

🗣️ Elihu accuses Job of preferring complaint

🚧 Regard not iniquity is a clear warning

🔀 Job chose venting over facing change

📖 Affliction was never the real enemy

## 📈 God Exalteth By His Power: Who Teacheth Like Him

Elihu shifts from warning into worship.

He asks a question that expects one answer, nobody.

No teacher, philosopher, or wise man can compare to God's instruction.

This question sets up the rest of the chapter's focus on God's greatness.

📈 Elihu shifts into worship here

❓ The question expects the answer nobody

🎓 No teacher compares to God

📖 This sets up the chapter's focus

## 📋 Who Hath Enjoined Him His Way

"Enjoined" means to command or assign a task to someone.

Elihu asks whether anyone has ever told God what to do.

Nobody can accuse God of doing wrong and make it stick either.

God answers to no one above Him because there is no one above Him.

📋 Enjoined means to command someone

❓ Nobody has ever commanded God

🚫 No accusation against God can stick

📖 God answers to no one above Him

## 🙌 Remember That Thou Magnify His Work

Elihu calls Job back to worship instead of complaint.

"Magnify" means to make something look as great as it truly is, not to exaggerate it.

God's work does not need Job's help to be impressive.

It only needs Job's attention.

🙌 Elihu calls Job back to worship

🔍 Magnify means to see something's true size

✨ God's work is already impressive

📖 It only needs Job's attention

## 👀 Every Man May See It

God's greatness is not hidden or reserved for a select few.

Anyone nearby can see it plainly up close.

Anyone far away can still notice it from a distance.

Nobody has an excuse for missing it.

👀 God's greatness is not hidden

🏠 It is visible up close

🌍 It is visible from a distance

📖 Nobody has an excuse to miss it

# Job 36:26-29
# ☁️ The God Who Controls The Rain
---
## 🙌 God Is Great, And We Know Him Not

Elihu admits something surprising for someone who has spoken with such confidence.

Even Elihu confesses that God is beyond full human understanding.

"Neither can the number of his years be searched out" means God's existence has no beginning anyone can trace.

Confidence about God does not require fully understanding Him.

🙌 Elihu admits God's greatness is hard to grasp

❓ Even Elihu cannot fully know God

⏳ God's years cannot be traced or counted

📖 Confidence does not require full understanding

## 💧 He Maketh Small The Drops Of Water

Elihu now points to something everyone has seen, rain.

"Small the drops of water" describes water rising up as vapor before it ever falls as rain.

This is an early, poetic description of how rain actually forms.

Something this ordinary still carries God's design inside it.

💧 Elihu points to something familiar, rain

☁️ Water rises as vapor before falling

🔄 This pictures how rain actually forms

📖 Ordinary things still carry God's design

## 🎁 The Clouds Do Drop And Distil Upon Man Abundantly

"Distil" means to release slowly, drop by drop, like a slow steady drip.

Elihu describes rain as a gift given generously, not stingily rationed out.

This rain waters crops, fills wells, and keeps entire communities alive.

Something people barely notice is actually one of God's most constant provisions.

💧 Distil means a slow steady drip

🎁 Rain is a generous gift, not rationed

🌾 It keeps entire communities alive

📖 A constant provision people barely notice

## ⛺ The Noise Of His Tabernacle

"Tabernacle" usually means God's dwelling place or tent.

Here it likely pictures the sky itself as a kind of tent stretched over the earth.

"The noise" points toward thunder rolling across that sky.

Elihu asks whether anyone can fully explain how any of this actually works.

⛺ Tabernacle usually means God's dwelling

🌌 Here it pictures the sky as a tent

⚡ The noise points to rolling thunder

📖 Nobody can fully explain how it works

# Job 36:30-33
# ⚡ The Storm That Announces Itself
---
## 🤔 He Spreadeth His Light Upon It

This verse is difficult, and honest scholars disagree on its exact picture.

"Spreadeth his light" likely describes lightning flashing across the storm clouds.

"Covereth the bottom of the sea" may describe the roots of the clouds reaching down toward the ocean.

Even a hard verse like this still points toward the same idea, God controlling the whole storm.

🤔 This verse is genuinely difficult

⚡ Light likely pictures lightning

🌊 It may describe clouds reaching the sea

📖 God controls the whole storm

## ⚖️ By Them Judgeth He The People

Elihu connects the weather directly to how God deals with nations.

Storms and rain were not random to Elihu, they carried God's purpose.

"He giveth meat in abundance" points to rain making harvests possible.

The same storm can bring both correction and provision at once.

⚖️ Weather connects to how God judges nations

🌧️ Storms were never random to Elihu

🌾 Rain makes harvests, and meat, possible

📖 One storm can judge and provide together

## ☁️ With Clouds He Covereth The Light

Elihu now pictures the storm actually building.

Thick clouds move in and block out light that was visible only moments earlier.

"Commandeth it not to shine" pictures God directing even the light's timing.

Nothing about the coming storm is outside His control.

☁️ The storm is pictured building here

🌥️ Clouds block out visible light

🕹️ God directs even the light's timing

📖 Nothing in the storm escapes His control

## 🐄 The Cattle Also Concerning The Vapour

Elihu closes this chapter with a small, sharp detail.

Even animals sense a storm coming before it fully arrives.

If cattle can recognize God's power moving in the sky, people have no excuse to miss it.

This detail quietly sets up the storm that speaks in the very next chapter.

🐄 Even cattle sense the coming storm

👀 Animals notice what people often miss

🙈 People have even less excuse

📖 This sets up the storm in chapter 37
`.trim();

export const JOB_THIRTY_SIX_PERSONAL_SECTIONS = parseJobThirtySixRawNotes(JOB_THIRTY_SIX_RAW_NOTES);
