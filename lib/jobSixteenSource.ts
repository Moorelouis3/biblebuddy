export type JobSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobSixteenRawNotes(rawText: string): JobSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 16:${startVerse}` : `Job 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Job 16 sections, received " + sections.length);
  }

  return sections;
}

const JOB_SIXTEEN_RAW_NOTES = `# Job 16:1-5
# 😤 Miserable Comforters
---
## 🗣️ Miserable Comforters Are Ye All

"Comforters" means people who bring real comfort in suffering.

Job says his three friends have done the opposite.

Their long speeches accused him instead of comforting him.

He calls them miserable comforters, a title dripping with sarcasm.

This line opens Job's sharp reply to Eliphaz's second speech.

🗣️ Comforters should ease suffering, not accuse
😤 Job's friends became accusers instead
📢 Their speeches turned into accusations
📖 Job matches their sarcasm with his own

## 👂 I Have Heard Many Such Things

Job has now heard three long speeches say the same thing.

Eliphaz, Bildad, and Zophar each accused him of hidden sin.

None of them have said anything genuinely new to him.

Repeating an argument louder does not make it more true.

Job is worn down by the sameness of it all.

👂 Job has heard this argument three times
🔁 Each friend repeats the same accusation
🙉 Nothing new has actually been said
📖 Repetition does not make an argument true

## ❓ Shall Vain Words Have An End

"Vain" means empty or worthless.

Eliphaz used this exact word against Job back in chapter fifteen.

Now Job throws the same word back at him.

He is asking if these accusations will ever actually stop.

Two men are trading the same insult back and forth.

❓ Vain means empty and worthless
🔁 Eliphaz used this word first
🎯 Job throws the word back
📖 The same insult now goes both ways

## 💪 What Emboldeneth Thee That Thou Answerest

"Emboldeneth" means to make someone bold or confident.

Job asks what gives Eliphaz the confidence to keep speaking this way.

He is not asking out of real curiosity.

It is a pointed challenge to Eliphaz's harsh certainty.

Confidence is not the same as being right.

💪 Emboldeneth means made bold or confident
❓ Job challenges Eliphaz's harsh confidence
🚫 The question is not a real one
📖 Confidence is not proof of truth

## 🔄 If Your Soul Were In My Soul's Stead

"Stead" is an old word for place or position.

Job imagines what it would be like if the roles were reversed.

Judging suffering from the outside is always easier.

Job wants his friends to feel what he feels first.

Perspective changes everything about how a person judges pain.

🔄 Stead is an old word for place
🎭 Job imagines the roles reversed
👀 Judging from outside is always easier
📖 Perspective changes how pain gets judged

## 📚 I Could Heap Up Words Against You

Job says he could pile up accusations too, if he wanted to.

He has the same ability to build a harsh case.

He is choosing not to do what his friends have done.

Restraint here is a real choice, not a lack of ability.

📚 Heap up words means pile up accusations
💭 Job could argue just as harshly
🛑 He chooses restraint instead
📖 Restraint here is a real choice

## 🤦 Shake Mine Head At You

Shaking the head at someone was a common gesture of mockery in this culture.

It signaled scorn or contempt without saying a single word.

Job says he could mock them the exact same way.

He refuses to trade insult for insult.

🤦 Head shaking signaled mockery here
😏 It showed contempt without words
🙅 Job could mock them the same way
📖 He refuses to trade insult for insult

## 🎶 The Moving Of My Lips Should Asswage Your Grief

"Asswage" is an old spelling of "assuage," meaning to ease or lessen.

Job claims he would have offered real comfort in their place.

His words would have eased their pain, not added to it.

This is the exact opposite of what his friends have done.

Job describes the comfort he never actually received from them.

🎶 Asswage means to ease or lessen
🗣️ Job claims he would truly comfort
❤️ His words would ease, not wound
📖 This is the comfort Job never received

# Job 16:6-8
# 😩 Grief That Will Not Ease
---
## 😩 Though I Speak, My Grief Is Not Asswaged

Job admits that speaking has not eased his grief at all.

He already offered to comfort his friends with kind words in verse five.

But his own words bring him no relief in return.

Grief this deep does not respond to talking alone.

Job's honesty here contrasts with his friends' certainty.

😩 Speaking brings Job no real relief
🔁 He offered comfort but received none
💧 Grief this deep resists mere words
📖 Job's honesty contrasts their certainty

## 🤐 Though I Forbear, What Am I Eased

"Forbear" means to hold back or stay silent.

Job says silence brings him no relief either.

Speaking does not help and staying quiet does not help.

He is trapped between two options that both fail him.

This is the honest voice of someone with nowhere left to turn.

🤐 Forbear means to hold back
🚫 Silence brings him no relief
⚖️ Speaking and silence both fail him
📖 Job feels trapped with no way out

## 😔 He Hath Made Me Weary

Job shifts from addressing his friends to addressing God directly.

"He" now points to God, not to Eliphaz or the others.

Job says God himself has worn him down completely.

This is a bold, honest complaint aimed straight at God.

😔 He now means God, not the friends
🎯 Job addresses God directly here
😩 God has worn Job down completely
📖 Job voices honest complaint to God

## 🏚️ Thou Hast Made Desolate All My Company

"Desolate" means emptied out or left with nothing.

"My company" points to Job's household, servants, and family.

Earlier chapters already described losing his children and his wealth.

Job says God is the one behind that emptiness.

Nothing of his former household life remains standing.

🏚️ Desolate means emptied of everything
👪 Company means Job's household and family
📉 Earlier chapters already showed these losses
📖 Job names God behind the emptiness

## 😢 Filled Me With Wrinkles, Which Is A Witness Against Me

Job's suffering has visibly aged his body with wrinkles.

He says those wrinkles now testify against him like a witness.

People assume visible suffering must mean hidden guilt.

Job's own appearance gets used as evidence he did not create.

This connects directly to how his friends have judged him.

😢 Suffering has visibly aged Job's body
⚖️ His wrinkles get read as evidence
🙅 That evidence is not really guilt
📖 His own body gets used against him

## 🍂 My Leanness Rising Up In Me Beareth Witness To My Face

"Leanness" means wasting away, becoming thin and frail.

Job's body has visibly weakened from his ongoing suffering.

That physical change becomes one more piece of evidence against him.

His face itself now seems to accuse him, without him saying a word.

🍂 Leanness means wasting away and frail
📉 Suffering has visibly weakened Job's body
👀 His face now seems to accuse him
📖 Appearance is mistaken for proof of guilt

# Job 16:9-11
# 🦁 Torn By God's Wrath
---
## 🦁 He Teareth Me In His Wrath

Job pictures God attacking him like a wild animal tearing its prey.

"Wrath" means intense anger, not calm discipline.

This is some of the most violent language Job uses about God in the whole book.

Job's honesty here is raw and unfiltered.

🦁 God is pictured like a wild animal
😡 Wrath means intense burning anger
🗣️ This is Job's most violent language yet
📖 Job's honesty here stays completely unfiltered

## 😬 He Gnasheth Upon Me With His Teeth

"Gnasheth" means to grind the teeth in anger or hostility.

It is a picture of open hostility, not quiet distance.

Job feels personally hated, not just unlucky.

The image is meant to feel as frightening as it sounds.

😬 Gnasheth means grinding teeth in anger
😠 It pictures open hostility, not distance
💔 Job feels personally hated here
📖 The image is meant to frighten

## 👁️ Mine Enemy Sharpeneth His Eyes Upon Me

Job pictures a hostile, piercing stare fixed directly on him.

It is the look of someone hunting prey, not a passing glance.

Job feels watched and targeted, not simply forgotten.

This continues the predator imagery from the verse before it.

👁️ A sharp stare pictures being hunted
🎯 Job feels targeted, not forgotten
🦁 This continues the predator imagery
📖 Job feels watched by a hostile eye

## 😮 They Have Gaped Upon Me With Their Mouth

"Gaped" means to stare with the mouth open, usually in mockery.

Job now describes hostility from a wider crowd, not just his three friends.

Open mouthed staring was a public sign of scorn in this culture.

Job feels mocked in front of others, not just accused in private.

😮 Gaped means staring with an open mouth
🎭 This pictures public mockery, not privacy
👥 A wider crowd now surrounds Job
📖 Job feels shamed in front of others

## 👋 Smitten Me Upon The Cheek Reproachfully

Striking someone's cheek was a public gesture of deep insult in this culture.

"Reproachfully" means done in a way meant to shame someone.

This was not a private jab, it happened where others could see.

Job describes being humiliated openly, not just wounded quietly.

👋 Cheek striking signaled a public insult
😞 Reproachfully means done to shame someone
👀 Others could see this humiliation happen
📖 Job's shame here was public, not private

## 🤝 They Have Gathered Themselves Together Against Me

This pictures a group forming together with one shared purpose, opposing Job.

It is no longer just three friends speaking against him.

Job feels surrounded by collective hostility, not one voice at a time.

Isolation can feel heavier when it comes from a whole crowd.

🤝 A group unites with one purpose
👥 This goes beyond just three friends
🌀 Job feels surrounded, not just opposed
📖 Collective hostility feels heavier than one voice

## ⚖️ God Hath Delivered Me To The Ungodly

"Ungodly" describes people who live without regard for God.

Job says plainly that God allowed this suffering to happen.

This is one of the boldest statements in Job's whole speech.

Job does not soften what he believes is actually happening to him.

⚖️ Ungodly means living without regard for God
🗣️ Job states plainly that God allowed this
💥 This is a bold, unsoftened claim
📖 Job names what he believes is happening

## 🙌 Turned Me Over Into The Hands Of The Wicked

Hebrew poetry often repeats one idea using two different lines.

This line restates the verse before it in stronger language.

Job wants this specific point to be impossible to miss.

He feels completely abandoned to people who mean him harm.

🙌 Hebrew poetry often repeats one idea twice
🔁 This restates the line just before it
🎯 Job wants the point impossible to miss
📖 Job feels abandoned to those who harm him

# Job 16:12-14
# 🎯 Broken And Made A Target
---
## 🕊️ I Was At Ease, But He Hath Broken Me Asunder

Job remembers a time before his suffering began, when life was calm.

"Asunder" means broken apart or split into pieces.

That peaceful life ended suddenly, not gradually.

The contrast between before and after makes the pain sharper.

🕊️ Job once lived in real peace
💥 Asunder means broken apart completely
⏱️ The change happened suddenly, not slowly
📖 Contrast makes Job's pain feel sharper

## ✋ Taken Me By My Neck, And Shaken Me To Pieces

Job pictures himself seized violently, the way a predator grabs its prey.

Being shaken to pieces describes total, forceful destruction.

This is not a metaphor for mild discomfort.

Job is describing something that felt genuinely violent to him.

✋ Job pictures being seized violently
🦁 The image matches a predator's grip
💔 Shaken to pieces means total destruction
📖 This describes real, violent suffering

## 🎯 Set Me Up For His Mark

"Mark" here means a target, the kind archers aim at.

Job feels deliberately placed in the path of attack.

This sets up the archer imagery in the very next verse.

Job does not feel like a bystander in his own suffering.

🎯 Mark means a target for archers
🏹 Job feels deliberately placed for attack
🧭 This sets up the next verse's image
📖 Job feels chosen for suffering, not random

## 🏹 His Archers Compass Me Round About

"Compass" here means to surround completely.

Job pictures archers standing on every side of him.

There is no safe direction left to turn.

The target image from the verse before now fully unfolds.

🏹 Archers surround Job on every side
🚫 No safe direction remains open
🎯 This continues the target image
📖 The attack image now fully unfolds

## 🩸 He Cleaveth My Reins Asunder, And Doth Not Spare

"Reins" refers to the kidneys, believed in this culture to hold deep emotion.

Being struck there pictures the deepest possible kind of wound.

"Doth not spare" means no mercy is shown in the attack.

Job describes suffering that reaches all the way to his core.

🩸 Reins meant the kidneys, seat of emotion
💔 This pictures the deepest possible wound
🚫 Doth not spare means no mercy shown
📖 Job's pain reaches all the way in

## 💧 He Poureth Out My Gall Upon The Ground

"Gall" refers to bile, a bitter substance inside the body.

Ancient readers pictured this happening to a fatally wounded animal.

Job uses the image to describe suffering that feels fatal to him.

The bitterness pictured here matches how Job actually feels inside.

💧 Gall means bile, a bitter substance
🦌 The image pictures a fatal wound
😖 Job's suffering feels fatal to him
📖 Bitterness pictured here matches Job's grief

## 🧱 He Breaketh Me With Breach Upon Breach

A "breach" is a broken gap, like a hole torn in a wall.

"Breach upon breach" pictures repeated blows landing one after another.

There is no pause between one injury and the next.

Job feels struck again before he can recover from the last hit.

🧱 Breach means a broken gap or hole
🔁 The blows repeat one after another
⏱️ No pause exists between the strikes
📖 Job cannot recover before the next hit

## 🏃 He Runneth Upon Me Like A Giant

Job compares this final blow to being charged by a giant.

The image pictures overwhelming size and unstoppable force.

There is no way to resist or outrun something this strong.

This closes Job's description of feeling physically overwhelmed by God.

🏃 A giant pictures overwhelming force
🚫 Resistance feels completely impossible here
💥 This closes the physical attack imagery
📖 Job feels utterly overwhelmed by God

# Job 16:15-17
# 😢 Mourning Yet Innocent
---
## 🪡 I Have Sewed Sackcloth Upon My Skin

"Sackcloth" was a rough, uncomfortable garment worn during deep mourning.

Wearing it directly against bare skin added physical discomfort to the grief.

Job sewed it himself, showing this mourning was deliberate and ongoing.

This was not a brief, symbolic gesture.

🪡 Sackcloth was a rough mourning garment
😖 Wearing it added physical discomfort
🔁 Job sewed it himself, on purpose
📖 This mourning was deliberate, not brief

## 🐂 Defiled My Horn In The Dust

A "horn" in scripture often pictures strength, honor, or dignity.

Lowering that horn into the dust pictures total loss of status.

Job describes feeling utterly humbled, not just physically sick.

Honor that once stood tall now lies in the ground.

🐂 Horn pictures strength and honor
📉 Dust pictures total loss of status
😔 Job feels utterly humbled here
📖 Honor now lies flat in the dust

## 😭 My Face Is Foul With Weeping

"Foul" here describes a face red and swollen from constant crying.

It does not mean dirty in this context.

Job's grief has become something visible on his own face.

This is not one moment of tears but an ongoing state.

😭 Foul here means red and swollen
🚫 It does not mean dirty
👀 Grief has become visible on Job's face
📖 This is ongoing weeping, not one moment

## 🌑 On My Eyelids Is The Shadow Of Death

This pictures dark, heavy exhaustion settled over Job's eyes.

"Shadow of death" suggests Job feels closer to dying than living.

Sleeplessness and grief together have worn his body down completely.

The image is both physical and deeply emotional at once.

🌑 Dark shadows picture heavy exhaustion
💀 Job feels closer to death than life
😴 Grief and sleeplessness worked together here
📖 The image is physical and emotional

## ✋ Not For Any Injustice In Mine Hands

Job insists his suffering is not punishment for wrongdoing.

This directly answers the accusations Eliphaz made in chapter fifteen.

Job's hands represent his actions, and he says they are clean.

He refuses to accept guilt he does not actually carry.

✋ Hands here represent Job's actions
🙅 Job denies any real wrongdoing
🔁 This answers Eliphaz's chapter fifteen charge
📖 Job refuses guilt he does not carry

## 🙏 Also My Prayer Is Pure

Eliphaz had claimed Job restrained prayer before God, back in chapter fifteen.

Job directly denies that accusation here.

"Pure" means sincere and honest, without hidden corruption.

Job insists his relationship with God has stayed genuine through all of this.

🙏 Eliphaz claimed Job avoided real prayer
🙅 Job directly denies that charge
✨ Pure means sincere and honest
📖 Job's prayer life has stayed genuine

# Job 16:18-22
# ⚖️ A Witness In Heaven
---
## 🌍 O Earth, Cover Not Thou My Blood

Ancient thought pictured unavenged bloodshed as crying out from the ground.

Genesis records this same idea with Abel's blood after Cain killed him.

Job asks the earth not to bury his suffering in silence.

He wants his pain to remain a visible testimony, not hidden away.

🌍 Ancient thought pictured blood crying out
📖 Genesis describes this with Abel's blood
🗣️ Job wants his pain to stay visible
➡️ He refuses to let it be buried

## 📢 Let My Cry Have No Place

Job wants his cry for justice to keep echoing, not fade away.

"No place" here means no place to rest or be silenced.

He is asking for his suffering to be remembered, not forgotten.

This continues the same plea from the line just before it.

📢 Job wants his cry to keep echoing
🔇 No place means no place to be silenced
🧠 He wants his suffering remembered
📖 This continues the plea before it

## ☁️ My Witness Is In Heaven

Job expresses a flicker of hope in the middle of deep despair.

He believes someone in heaven can testify to his innocence.

His friends will not believe him, so he looks beyond them.

This hope grows even stronger later in Job chapter nineteen.

☁️ Job hopes for a heavenly witness
🙅 His friends refuse to believe him
👀 He looks beyond them for justice
📖 This hope grows in chapter nineteen

## 📜 My Record Is On High

"Record" here means a witness or testimony kept on Job's behalf.

"On high" points to heaven, the same place named in the line before.

Job restates his hope using a second, parallel phrase.

Hebrew poetry often doubles an idea for emphasis, just like here.

📜 Record means a witness or testimony
☁️ On high points to heaven again
🔁 Job restates the same hope twice
📖 Repetition here adds emphasis, not filler

## 😞 My Friends Scorn Me

"Scorn" means to mock or hold someone in open contempt.

Job names plainly what his three friends have actually become to him.

Comforters have turned into mockers over the course of this conversation.

Job does not soften this observation to spare their feelings.

😞 Scorn means open mockery or contempt
🔄 Comforters have become mockers instead
🗣️ Job names this plainly, without softening
📖 Job speaks the hard truth aloud

## 😢 Mine Eye Poureth Out Tears Unto God

Even while accused, Job still directs his grief toward God.

He does not turn away from God despite his pain.

His tears are aimed at God, not away from him.

This shows Job's faith enduring even in deep despair.

😢 Job's tears are aimed at God
🙏 He does not turn away from God
💔 His faith endures through real despair
📖 Grief here still points toward God

## ⚖️ O That One Might Plead For A Man With God

Job longs for an advocate to argue his case before God.

"Plead" here means to argue a case, like in a courtroom.

He feels he cannot make his case alone.

This longing points forward to Job's hope for a mediator later in the book.

⚖️ Plead means to argue a legal case
🙋 Job wants someone to argue for him
😔 He feels unable to plead alone
📖 This points toward Job's later hope

## 🧑‍🤝‍🧑 As A Man Pleadeth For His Neighbour

Job pictures ordinary legal advocacy between two neighbors.

He wants exactly that kind of help between himself and God.

This image sets up Job's famous hope for a redeemer in chapter nineteen.

Job is asking for someone to stand between him and God.

🤝 This pictures ordinary neighborly advocacy
🙏 Job wants the same help with God
🔮 It sets up chapter nineteen's hope
📖 Job wants someone to stand between them

## 📆 When A Few Years Are Come

Job believes his death is coming soon, not far away.

"A few years" suggests his time left feels short to him.

Suffering has made his future feel very limited.

This sets up the final line of the chapter.

📆 Job expects death to come soon
⏳ A few years means a short time
😔 Suffering shrinks how he sees his future
📖 This sets up the chapter's final line

## 🚪 The Way Whence I Shall Not Return

This phrase was a common ancient way of describing death.

Once a person went this way, there was no coming back.

Second Samuel uses this same idea about death later in scripture.

Job ends this speech facing his own mortality honestly.

🚪 A common way to describe death
🔒 No one returns once they go this way
📖 Second Samuel later echoes this same idea
➡️ Job ends by facing death honestly
`.trim();

export const JOB_SIXTEEN_PERSONAL_SECTIONS = parseJobSixteenRawNotes(JOB_SIXTEEN_RAW_NOTES);
