export type JobTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobTwentyOneRawNotes(rawText: string): JobTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 21:${startVerse}` : `Job 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Job 21 sections, received " + sections.length);
  }

  return sections;
}

const JOB_TWENTY_ONE_RAW_NOTES = `# Job 21:1-6
# 👂 Job Demands A Real Hearing
---
## 👂 Hear Diligently My Speech

Diligently means close, careful attention, not just half listening.

Job wants more than distracted sympathy from his friends.

He is asking them to actually weigh what he is about to say.

That request itself pushes back against how the conversation has gone so far.

👂 Diligently means close, careful attention
🎧 Job wants real listening, not distraction
⚖️ He wants his words truly weighed
📖 This pushes back on the conversation

## 🤝 Let This Be Your Consolations

Consolations means comfort meant to ease someone's pain.

Job says real listening would help him more than anything his friends have said so far.

Their answers have added pressure instead of relief.

A friend who finally listens can comfort more than one who keeps arguing.

🤝 Consolations means comfort for pain
🗣️ Job says listening would help more
😣 Their answers have added pressure
➡️ Real listening comforts more than arguing

## 🗝️ Suffer Me That I May Speak

Suffer here is an old word meaning allow or permit.

It does not mean pain or hardship the way it does today.

Job is asking for simple permission to finish his thought.

He expects to be interrupted again, the way earlier debates have gone.

🗝️ Suffer here means allow or permit
🚫 It does not mean pain today
🙏 Job asks for simple permission
📖 He expects to be interrupted again

## 😔 After That I Have Spoken, Mock On

Job already expects his friends to mock him once he finishes.

He asks them to wait until he is done before they respond that way.

This shows how discouraged Job has become by their responses so far.

He braces for scorn instead of hoping for comfort.

😔 Job expects to be mocked
⏳ He asks them to wait until he finishes
😞 He is discouraged by their past responses
➡️ He braces for scorn, not comfort

## ❓ Is My Complaint To Man

Job clarifies exactly who his real argument is with.

His complaint is not really against Zophar or his other friends.

It is against how God seems to be running the world.

That distinction matters for understanding everything Job says next.

❓ Job names who his complaint targets
🙅 It is not really against his friends
⚖️ It is against how God runs the world
📖 This shapes everything Job says next

## 💭 Why Should Not My Spirit Be Troubled

Job defends his right to feel disturbed by what he sees.

He is not ashamed of his own distress.

Anyone watching injustice go unanswered would feel the same unrest.

Job refuses to pretend calm he does not actually feel.

💭 Job defends his own distress
🙅 He is not ashamed of it
😟 Injustice would trouble anyone
➡️ Job refuses to fake calm

## 🤐 Lay Your Hand Upon Your Mouth

This is an old idiom for stunned, respectful silence.

Job wants his friends to be shocked speechless by what he is about to say.

He believes his point is strong enough to silence their usual answers.

He is asking for astonishment, not agreement, at least at first.

🤐 The idiom pictures stunned silence
😮 Job wants them shocked speechless
💪 He believes his point is strong
➡️ He wants astonishment before agreement

## 😨 Trembling Taketh Hold On My Flesh

Job admits that even he is disturbed by what he is about to argue.

Trembling here means physical fear, not just worried thoughts.

He is not making a cold argument.

He is confronting something that genuinely frightens him.

😨 Trembling means real physical fear
🧠 This is not a cold argument
💔 Job is genuinely frightened by this
📖 He confronts a truth that shakes him

# Job 21:7-13
# 📈 Why Do The Wicked Prosper
---
## ❓ Wherefore Do The Wicked Live, Become Old

Job launches his central question for this entire chapter.

He is not asking out of curiosity.

He is challenging the theology his friends have been repeating, that the wicked always suffer visibly.

Job points to plain, observable reality instead.

❓ Job asks his key question for the chapter
🎯 He is challenging his friends' theology
👀 He points to what is actually observable
📖 Reality does not always match their theory

## 💪 Yea, Are Mighty In Power

Job goes further than simply surviving.

He says the wicked do not just live long, they grow strong and influential.

This directly answers what Zophar just claimed in the chapter before this one.

Job is answering Zophar point by point.

💪 The wicked grow strong, not just old
🎯 This goes further than mere survival
🔄 It directly answers Zophar's last speech
➡️ Job argues point by point

## 🌱 Their Seed Is Established In Their Sight

Seed here means children and descendants, a common Old Testament word for offspring.

Established means secure and lasting, not scattered or lost.

Job says the wicked get to watch their own family line take root and thrive.

In their sight adds a painful detail, they live long enough to see it happen.

🌱 Seed means children and descendants
🏛️ Established means secure and lasting
👀 The wicked watch it happen themselves
📖 They live to see their own security

## 🏠 Their Houses Are Safe From Fear

This means their homes and households face no real threat.

Job's friends had claimed the wicked live in constant dread.

Job insists the opposite is often true in real life.

He is not describing an exception, he is describing a pattern he has actually watched.

🏠 This means no real threat to their homes
🙅 It contradicts what his friends claimed
👁️ Job describes what he has watched
➡️ This is a pattern, not one exception

## 🪄 Neither Is The Rod Of God Upon Them

The rod is a common Bible image for punishment or discipline.

Job says the wicked do not experience the correction his friends insist always follows sin.

This is Job's sharpest challenge yet to their entire argument.

If the rod never lands, their whole theory has a problem.

🪄 The rod pictures punishment or discipline
🚫 The wicked do not experience it here
🎯 This challenges his friends directly
📖 Their whole theory has a problem

## 🐂 Their Bull Gendereth, And Faileth Not

Gendereth is an old word meaning to produce offspring, here referring to breeding livestock.

Cattle were a primary form of wealth in the ancient world.

Job says their herds reproduce reliably, without failure or loss.

Even their animals prosper, not just their family.

🐂 Gendereth means to produce offspring
💰 Cattle were a main form of ancient wealth
📈 Their herds reproduce without failure
➡️ Even their animals prosper

## 🐄 Their Cow Calveth, And Casteth Not Her Calf

Casteth her calf is an old way of describing a miscarriage in livestock.

Job says their herds never lose a pregnancy, another sign of unbroken prosperity.

This detail would matter enormously to Job's original audience, herders who knew this risk firsthand.

Nothing about their success shows any crack.

🐄 Casteth her calf means a miscarriage
🚫 Their herds never lose a pregnancy
🌾 This mattered to ancient herding audiences
📖 Nothing about their success cracks

## 🐑 They Send Forth Their Little Ones Like A Flock

Job compares their many children to a flock of sheep, healthy and numerous.

Little ones here means young children, not livestock this time.

The image suggests a large, thriving family sent out to play freely.

Prosperity extends to the next generation without apparent cost.

🐑 Job compares many children to a flock
👶 Little ones means young children here
🏃 The image pictures free, healthy play
➡️ Prosperity reaches the next generation too

## 💃 Their Children Dance

Dancing here pictures genuine, carefree celebration, not forced performance.

This is the opposite of a household living under constant divine punishment.

Job paints a scene of real joy inside a family his friends would call cursed.

The picture is meant to unsettle their easy theology.

💃 Dancing pictures real, carefree joy
🙅 This is not a household under judgment
🎯 Job paints joy inside a supposedly cursed home
📖 The picture unsettles easy theology

## 🥁 They Take The Timbrel And Harp

A timbrel is a small hand drum, and the harp was a common stringed instrument.

Together they describe live music at a celebration, not just casual humming.

Job describes a household with the means and the mood to enjoy music regularly.

This is prosperity expressed through art and leisure, not just survival.

🥁 A timbrel is a small hand drum
🎻 The harp was a common stringed instrument
🎶 Together they describe live celebration music
➡️ This is leisure, not mere survival

## 🎺 Rejoice At The Sound Of The Organ

The organ here does not mean the modern instrument, it likely refers to a simple wind pipe.

Job lists a full band of instruments to stress how complete their happiness looks.

Nothing in this scene suggests fear, guilt, or coming judgment.

Job wants his friends to sit with that discomfort before he continues.

🎺 Organ here likely means a simple wind pipe
🎼 Job lists a full band on purpose
🙅 Nothing here suggests fear or guilt
📖 Job wants his friends to feel that discomfort

## 📆 They Spend Their Days In Wealth

Spend here means they live out their years, not that they waste money carelessly.

Job says their whole lifetime is marked by comfort, not struggle.

This is the normal, expected experience for this household, not a rare stretch of luck.

Their entire story runs counter to what Job's friends have argued.

📆 Spend means how they live out their years
💰 Their whole lifetime is marked by comfort
🔁 This is normal for them, not rare luck
➡️ Their story runs counter to his friends

## ⚰️ In A Moment Go Down To The Grave

Job adds one final, sharp detail to this picture.

Death comes to them quickly, without a long, painful decline.

No suffering illness marks their final days the way Job's own suffering has marked his.

Job is arguing that even their death looks easier than his current life.

⚰️ Death comes to them quickly here
🚫 No long, painful decline is described
😣 This contrasts with Job's own suffering
📖 Even their death looks easier than his life

# Job 21:14-16
# 🙅 They Tell God To Leave Them Alone
---
## 🗣️ Depart From Us

Job quotes the wicked directly here, showing exactly how they think.

They are not secretly afraid of God, they openly tell him to leave.

This is bold defiance, not quiet doubt.

Job wants his friends to notice how brazen this attitude really is.

🗣️ Job quotes the wicked directly
😤 They openly tell God to leave
💪 This is bold defiance, not quiet doubt
📖 Job highlights how brazen this is

## 📚 We Desire Not The Knowledge Of Thy Ways

They are not confused about God, they are actively uninterested.

Knowledge of thy ways means understanding how God wants people to live.

They reject that knowledge on purpose, not from ignorance.

Yet Job has just shown that God still lets them prosper anyway.

🚫 They are uninterested, not confused
📚 Knowledge of thy ways means how to live
🙅 They reject it on purpose
➡️ God still lets them prosper anyway

## 😏 What Is The Almighty, That We Should Serve Him

This question drips with contempt, not honest curiosity.

The wicked treat serving God as pointless, beneath any real benefit.

Job lets their own words condemn them without adding commentary of his own.

Sometimes the clearest argument is simply repeating what someone actually said.

😏 The question drips with contempt
🙅 They treat serving God as pointless
🗣️ Job lets their words speak for themselves
📖 Repeating their words is argument enough

## 💰 What Profit Should We Have, If We Pray Unto Him

Profit here means practical benefit or gain.

The wicked reduce prayer to a transaction, worth doing only if it pays off.

Job is showing exactly the shallow faith his friends should be more troubled by.

Yet these are the very people his friends claim always suffer for their sin.

💰 Profit means practical benefit or gain
🤝 They reduce prayer to a transaction
😤 This shallow faith should trouble the friends
➡️ These are the people said to always suffer

## 🤲 Their Good Is Not In Their Hand

This means their prosperity did not come from their own effort or skill.

Job admits something important here, their blessing ultimately still comes from God.

He is not saying God is absent from their success.

He is saying God's dealings with them do not match the tidy formula his friends keep repeating.

🤲 Their prosperity did not come from effort
🙌 It still ultimately comes from God
🚫 God is not absent from their story
📖 God's dealings resist a tidy formula

## ⚖️ The Counsel Of The Wicked Is Far From Me

Job draws a clear moral line here.

He says this even as he describes their prosperity honestly.

Counsel means their mindset and way of thinking, not just advice they give others.

Job refuses to be misunderstood as approving of what they believe.

Observing a hard truth is not the same as endorsing it.

⚖️ Job draws a clear moral line
🧠 Counsel means their mindset, not advice
🙅 Job does not approve of their beliefs
➡️ Observing a truth is not endorsing it

# Job 21:17-21
# ⚡ Punishing The Wrong Person
---
## 🕯️ How Oft Is The Candle Of The Wicked Put Out

Candle here is an image for a person's life and prosperity.

This rhetorical question echoes the very argument his friends have been making.

Job is not agreeing with them here, he is quoting their claim to challenge it.

His answer, based on everything just described, is that it happens far less often than they insist.

🕯️ Candle pictures a person's life and prosperity
❓ Job echoes his friends' own argument
🎯 He is quoting them to challenge them
📖 It happens less often than they claim

## 🔁 How Oft Cometh Their Destruction Upon Them

Job repeats the same rhetorical pattern a second time for emphasis.

Hebrew poetry often restates one idea using a slightly different angle.

Job is building toward his real point, that sudden, visible destruction is actually rare.

The wicked he has described so far die peacefully, not in dramatic ruin.

🔁 Job repeats the pattern for emphasis
📜 Hebrew poetry often restates one idea twice
🎯 His real point is that ruin is rare
📖 The wicked he described die peacefully

## ⚖️ God Distributeth Sorrows In His Anger

This line states the theology Job's friends hold, that God hands out suffering as direct, visible punishment.

Job is not stating his own belief here, he is naming theirs plainly.

He wants it clearly on the table before he argues against it.

Naming an opponent's claim honestly is the first step in answering it well.

⚖️ This states the friends' theology plainly
🗣️ Job names their belief, not his own
🎯 He puts it clearly on the table
➡️ Naming a claim well is the first step

## 🌾 As Stubble Before The Wind

Stubble means the dry, leftover stalks in a field after harvest, worthless and light.

Job pictures how his friends imagine the wicked disappearing, blown away easily and completely.

This is their image, describing sudden and total ruin.

Job has already shown this is not what he actually observes.

🌾 Stubble means dry, worthless leftover stalks
💨 It pictures easy, total disappearance
🗣️ This is his friends' image, not his
📖 Job has shown this does not match reality

## 🌬️ As Chaff That The Storm Carrieth Away

Chaff is the light, useless husk separated from grain during threshing.

This repeats the same idea as stubble, worthless material scattered by wind.

Job pairs both images to fully represent his friends' confident claim.

He sets this claim up clearly so he can dismantle it in the lines that follow.

🌬️ Chaff means the light husk from threshing
🔁 This repeats the stubble image
🗣️ Job fully represents his friends' claim
➡️ He is about to dismantle that claim

## 👪 God Layeth Up His Iniquity For His Children

This describes a common belief.

God saves up punishment and delivers it to a sinner's children instead of the sinner himself.

Job names this idea directly here.

He is about to argue that this approach actually fails as real justice.

Punishment delayed to someone else is not the same as punishment felt by the guilty man.

👪 This means punishment passed to descendants
🗣️ Job names this common belief directly
⚖️ He argues this fails as real justice
📖 Delayed punishment is not felt punishment

## 🎯 He Rewardeth Him, And He Shall Know It

Job insists that real justice requires the guilty man himself to feel the consequence.

Rewardeth here is used with irony.

It means repay, not bless.

Shall know it means the man must be conscious of what is happening to him.

Justice that skips past the guilty person to someone else misses the entire point.

🎯 Real justice must reach the guilty man himself
😏 Rewardeth is used here with irony
🧠 Shall know it means he must be conscious
➡️ Justice cannot skip past the guilty person

## 👁️ His Eyes Shall See His Destruction

Job insists the punishment has to be witnessed by the person who earned it.

Seeing it happen personally is very different from a punishment that arrives generations later.

Job is arguing for a kind of justice he has not actually seen God carry out.

This tension drives much of Job's frustration throughout the whole book.

👁️ Job wants the guilty man to witness it
🔁 Personal witnessing differs from delayed justice
😤 Job has not seen this kind of justice
📖 This tension drives much of the book

## 🍷 He Shall Drink Of The Wrath Of The Almighty

Drinking wrath is a common Bible image for fully experiencing God's judgment, not just hearing about it.

Job uses vivid, physical language on purpose here.

He wants judgment to be something the guilty person actually swallows and feels.

Anything less, in Job's argument, does not really count as justice at all.

🍷 Drinking wrath pictures fully experiencing judgment
💪 Job uses vivid, physical language on purpose
🎯 He wants the guilty to actually feel it
➡️ Anything less does not count as justice

## ❓ What Pleasure Hath He In His House After Him

Job raises a sharp, practical objection to punishing a dead man's family instead of him.

Once he is dead, he cannot enjoy or suffer anything happening to his household anymore.

Punishing his children does nothing to the man who actually sinned.

Job's logic exposes a real gap in his friends' comfortable theology.

❓ Job raises a sharp practical objection
⚰️ A dead man cannot feel what happens after
👪 Punishing children does nothing to the sinner
📖 This exposes a gap in the friends' theology

## ✂️ When The Number Of His Months Is Cut Off In The Midst

Cut off in the midst means his life ends abruptly, in the middle of his years.

Job points out that even this scenario does not solve the justice problem he just raised.

Whether the wicked man dies young or old, he still will not experience justice delivered to his descendants.

Job's argument stands regardless of how the wicked man's life ends.

✂️ Cut off in the midst means dying abruptly
❓ This still does not solve Job's objection
⏳ It does not matter when he dies
➡️ Job's argument holds either way

# Job 21:22-26
# ⚰️ Death Erases The Difference
---
## 🙏 Shall Any Teach God Knowledge

Job asks this question with real humility, not sarcasm this time.

He admits that no human, including himself, can fully explain how God runs the world.

This is a rare moment where Job pulls back from his own confident arguments.

Even his own theory about justice may not capture the whole picture.

🙏 Job asks this with real humility here
🧠 No human can fully explain God's ways
⏸️ Job pulls back from his own confidence
📖 His own theory may not be complete either

## 👑 Seeing He Judgeth Those That Are High

High here refers to people with power, status, or wealth, not physical height.

Job affirms that God still judges even the most powerful people.

This softens his earlier argument slightly, making room for real justice he simply has not personally witnessed.

Job is not abandoning faith in God's justice, only questioning its timing and form.

👑 High means people with power or status
⚖️ God still judges even powerful people
🔄 This softens Job's earlier argument
➡️ Job questions the timing, not the justice itself

## 💪 One Dieth In His Full Strength

Job now paints two contrasting deaths to make his final point.

This first man dies healthy and vigorous, not weakened by illness or age.

Full strength stresses that nothing about his death shows visible punishment.

He simply reaches the end of a comfortable, complete life.

💪 Job paints two contrasting deaths here
❤️ This man dies healthy, not weakened
🚫 Nothing shows visible punishment
📖 His life simply reaches a comfortable end

## 😌 Being Wholly At Ease And Quiet

Wholly at ease means completely comfortable, without worry or conflict.

Quiet here describes a peaceful, settled state of mind, not simply silence.

Job describes the ideal death his friends claim only the righteous deserve.

Yet nothing in the text says this man was righteous.

😌 Wholly at ease means completely comfortable
🤫 Quiet describes a peaceful state of mind
🏆 The friends reserve this death for the righteous
➡️ Nothing says this man was righteous

## 🥛 His Breasts Are Full Of Milk

This unusual phrase pictures a body still full of vitality and nourishment at the moment of death.

Some translations picture buckets or containers full of milk, describing prosperity and abundance.

Either way, the image points to a life still overflowing with health at its very end.

Nothing here pictures decline or want.

🥛 This pictures a body full of vitality
🍶 Some translations picture containers full of milk
❤️ It points to health right at the end
📖 Nothing here pictures decline or want

## 🦴 His Bones Are Moistened With Marrow

Marrow is the soft tissue inside bones, associated in this culture with strength and vitality.

Dry bones pictured weakness or old age in Hebrew idiom.

Moist bones pictured youthful strength instead.

Job describes a man who stays strong and vital all the way to his final day.

🦴 Marrow is the soft tissue inside bones
💧 Moist bones pictured youthful strength
💪 This man stays strong until his final day
📖 This is the opposite of a slow decline

## 😢 Another Dieth In The Bitterness Of His Soul

Job now describes the opposite kind of death, one marked by deep inner suffering.

Bitterness of his soul means ongoing grief, disappointment, or despair.

This could describe someone righteous or simply someone whose life was hard.

Job's point is that suffering does not reliably mark out who deserved it.

😢 Job now describes the opposite death
💔 Bitterness of soul means ongoing grief
❓ This does not reliably mark out guilt
📖 Suffering does not sort guilt from innocence

## 🍽️ Never Eateth With Pleasure

This phrase pictures a joyless life, where even basic daily comforts bring no real enjoyment.

Eating together was one of the most common pictures of contentment in this culture.

Losing pleasure even in something so ordinary shows just how deep this person's suffering runs.

Job describes a life drained of its smallest comforts.

🍽️ This pictures a completely joyless life
🤝 Eating together pictured contentment in this culture
😞 Losing even this shows deep suffering
➡️ Job describes a life drained of comfort

## ⚰️ They Shall Lie Down Alike In The Dust

Job lands his conclusion for this whole section here.

Alike means both men end up exactly the same, despite their completely different lives.

Dust is the common Old Testament picture of the grave and of death itself.

Death does not sort people by how comfortable or how bitter their lives were.

⚰️ Job lands his conclusion in this line
🟰 Alike means both men end up the same
🌍 Dust pictures the grave and death
📖 Death does not sort by how life went

## 🪱 The Worms Shall Cover Them

This final, blunt image describes the ordinary process of decay after death.

Job refuses to dress up death with softer language here.

Both the comfortable man and the bitter man share this exact same physical fate.

Whatever differences existed in life, none of them survive into the grave.

🪱 This describes ordinary decay after death
🗣️ Job refuses to soften this image
🟰 Both men share this exact same fate
➡️ No difference in life survives into the grave

# Job 21:27-30
# 🎯 You Already Have Your Answer
---
## 🎯 I Know Your Thoughts

Job shifts here from arguing about the wicked to confronting his friends directly.

He claims to see through what they are really thinking, even what they have not said aloud.

This turns the conversation personal again after a long, general argument.

Job is done letting them hide behind polite theology.

🎯 Job shifts to confronting his friends directly
🧠 He claims to see their unspoken thoughts
🗣️ The conversation turns personal again
📖 Job stops letting them hide behind theology

## 🗺️ The Devices Which Ye Wrongfully Imagine Against Me

Devices here means schemes or plans, not random thoughts.

Wrongfully imagine means Job believes they are twisting the situation unfairly against him.

He suspects his friends are quietly assuming his suffering proves he must be guilty of something.

Job names that unspoken assumption directly instead of letting it stay hidden.

🗺️ Devices means schemes or plans
⚖️ Wrongfully imagine means unfairly twisted
🤫 Job suspects an unspoken assumption of guilt
➡️ He names it directly instead of hiding it

## 👑 Where Is The House Of The Prince

Job quotes what he expects his friends to say back to him.

Prince here means a person of high rank or nobility, not only royalty.

Job predicts they will point to some example of a powerful wicked man who did fall.

He is anticipating their counterargument before they can even raise it.

🗣️ Job quotes their likely reply
👑 Prince means a person of high rank
🔍 They will point to one fallen wicked man
📖 Job anticipates their argument in advance

## 🏚️ Where Are The Dwelling Places Of The Wicked

This repeats the same challenge as the line before it, using a slightly different image.

Job expects them to argue that the homes of evil people eventually get destroyed.

He is not surprised by this argument, he has clearly heard it many times before.

Job is setting up to answer this exact objection in the lines that follow.

🏚️ This repeats the challenge with a new image
🗣️ They will argue evil homes get destroyed
🔁 Job has heard this argument many times
➡️ He is about to answer it directly

## 🚶 Have Ye Not Asked Them That Go By The Way

Job urges his friends to check with ordinary travelers instead of relying only on old sayings.

Them that go by the way means people who travel widely and see how life plays out in different places.

Job trusts real, lived observation more than a comfortable theory passed down as tradition.

He is asking them to actually verify their claim instead of just repeating it.

🚶 Job points them to ask real travelers
🗺️ They see how life plays out widely
👀 Job trusts real observation over tradition
📖 He wants them to verify, not just repeat

## 🔍 Do Ye Not Know Their Tokens

Tokens here means signs or evidence, something a witness could actually point to.

Job is challenging his friends to bring real proof, not just repeat a comfortable saying.

He believes travelers would report the same thing he has already argued, that the wicked often prosper.

Job wants facts to settle this, not inherited assumptions.

🔍 Tokens means signs or evidence
🗣️ Job challenges them to bring real proof
🚶 Travelers would confirm what Job has argued
➡️ Job wants facts, not inherited assumptions

## 📦 The Wicked Is Reserved To The Day Of Destruction

Job restates his friends' theology one more time before challenging it head on.

Reserved means kept back for a future moment.

It does not mean punished immediately.

Job is not denying that judgment exists somewhere in God's plan.

He is denying that it always shows up clearly and immediately in this life, the way his friends keep insisting.

🗣️ Job restates their theology plainly
📦 Reserved means kept back for later
🙅 Job does not deny judgment exists at all
📖 He denies it always shows up immediately

## ⚡ They Shall Be Brought Forth To The Day Of Wrath

This describes a future, decisive moment of judgment.

It is not a slow, visible punishment during life.

Job's friends want to believe justice is always immediate and obvious.

Job leaves room for a judgment that may only become clear later, even beyond this life.

That idea will matter more as the whole book of Job moves toward its ending.

⚡ This pictures a future, decisive judgment
👀 The friends want justice immediate and visible
⏳ Job leaves room for judgment that comes later
📖 This idea grows more important later in Job

# Job 21:31-34
# 😤 No One Answers For Him
---
## ❓ Who Shall Declare His Way To His Face

Job asks who will confront the wicked man directly.

He means in time for the man to actually hear it.

Declare his way means to openly name his sin to him personally.

Job points out that in real life, this confrontation rarely actually happens.

Powerful people often go their whole lives without ever being called out plainly.

❓ Job asks who confronts him directly
🗣️ Declare his way means naming his sin openly
🚫 This confrontation rarely actually happens
📖 Powerful people often avoid ever being called out

## ⚖️ Who Shall Repay Him What He Hath Done

Repay here means deliver the consequence that actually matches his actions.

Job repeats his central complaint from earlier in the chapter.

In his observation, this repayment usually never actually arrives in a visible way.

His question is left hanging on purpose, because he has no good answer for it.

⚖️ Repay means the consequence matching his actions
🔁 Job repeats his central complaint again
🚫 Repayment usually never visibly arrives
➡️ The question is left hanging on purpose

## ⚰️ Yet Shall He Be Brought To The Grave

Despite everything Job has just argued, the wicked man still eventually dies like everyone else.

Job is not claiming the wicked live forever, only that their death often looks peaceful, not punished.

Brought to the grave suggests an honored, proper burial.

It is not a shameful disgrace.

This detail sharpens Job's whole argument even further.

⚰️ The wicked man still eventually dies
🚫 Job is not claiming he lives forever
🏅 Brought suggests an honored, proper burial
📖 This sharpens Job's whole argument

## 🪦 Shall Remain In The Tomb

Remain suggests a lasting, secure resting place, not a hastily discarded body.

Job stresses that even in death, this man receives dignity and permanence.

This stands in sharp contrast to what Job's friends might expect for someone truly wicked.

The wicked man's ending looks respectable, not disgraceful.

🪦 Remain suggests a lasting, secure resting place
🏛️ Even in death, he receives dignity
🔄 This contrasts what the friends would expect
➡️ His ending looks respectable, not disgraceful

## 🌍 The Clods Of The Valley Shall Be Sweet Unto Him

Clods means clumps of soil, here picturing the earth of his own burial place.

Sweet is an unusual, almost tender word choice for dirt covering a grave.

Job pictures this man resting peacefully, gently, even affectionately, in death.

This is about as far from a shameful or violent ending as language can picture.

🌍 Clods means clumps of burial soil
🍯 Sweet is a surprisingly tender word here
😌 Job pictures a peaceful, gentle resting
📖 This is far from a shameful ending

## 🚶 Every Man Shall Draw After Him

This pictures a large funeral procession, with people following behind respectfully.

Job describes wide public honor at this man's burial, not quiet shame or rejection.

Instead of being forgotten, he is remembered and mourned by many.

Job's picture keeps getting harder for his friends' theology to explain away.

🚶 This pictures a large funeral procession
👥 Job describes wide public honor at burial
🙅 He is not forgotten or scorned
➡️ This keeps challenging his friends' theology

## 🔢 As There Are Innumerable Before Him

Innumerable means too many to count.

Job says this man simply joins a long, ordinary line of people who died the same peaceful way.

This is not some rare loophole or unusual exception.

Job insists this pattern is common, not the strange edge case his friends want it to be.

🔢 Innumerable means too many to count
🔁 This man joins a long, ordinary line
🚫 It is not a rare loophole or exception
📖 Job insists this pattern is common

## 🎯 How Then Comfort Ye Me In Vain

Job closes the chapter by turning the whole argument back onto his friends' actual goal.

In vain means their efforts have accomplished nothing worthwhile.

Their attempts at comfort have failed completely, because they were built on a flawed premise.

Job says their words have not helped him at all.

🎯 Job turns the argument back to their goal
🚫 In vain means it accomplished nothing
😞 Their comfort attempts have failed completely
➡️ Their words have not actually helped Job

## ❌ In Your Answers There Remaineth Falsehood

Falsehood here means their answers still contain error, even after this whole long conversation.

Job delivers his final, blunt verdict on everything his friends have argued so far in the book.

He is not simply frustrated with their tone, he believes their entire framework is wrong.

This closing line sets up even more conflict in the chapters still to come.

❌ Falsehood means their answers still contain error
⚖️ Job delivers his final verdict on their case
🧠 He believes their whole framework is wrong
📖 This sets up more conflict ahead
`.trim();

export const JOB_TWENTY_ONE_PERSONAL_SECTIONS = parseJobTwentyOneRawNotes(JOB_TWENTY_ONE_RAW_NOTES);
