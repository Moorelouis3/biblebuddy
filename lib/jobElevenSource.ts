export type JobElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobElevenRawNotes(rawText: string): JobElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 11:${startVerse}` : `Job 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Job 11 sections, received " + sections.length);
  }

  return sections;
}

const JOB_ELEVEN_RAW_NOTES = `# Job 11:1-6
# 🗣️ Should Not The Multitude Of Words Be Answered
---
## ❓ Should Not The Multitude Of Words Be Answered

Zophar is not making a mild suggestion here.

He opens with a jab straight at Job's own words.

The question expects an obvious answer, yes.

Someone who talks this much deserves a response.

Zophar believes silence has let Job's claims stand too long.

🗣️ Zophar opens with a sharp question
❓ The question expects the answer yes
⏳ Job has talked without being challenged
📖 Zophar now steps in to answer

## ⚖️ A Man Full Of Talk Be Justified

"Justified" is a legal word meaning declared innocent.

Zophar asks whether nonstop talking can produce that verdict.

He believes words alone cannot prove Job innocent.

Only the truth of the case can do that.

Zophar sees Job's long speeches as noise, not proof.

⚖️ Justified means declared innocent
🗣️ Zophar questions if talk proves anything
🚫 Words alone cannot settle guilt
📖 Zophar wants proof, not volume

## 🤐 Should Thy Lies Make Men Hold Their Peace

"Hold their peace" is an old phrase meaning stay silent.

Zophar accuses Job of expecting no one to answer him.

He calls Job's claims lies, a harsh and direct charge.

Zophar believes bold words should not go unchallenged forever.

This sets up the confrontation for the rest of the chapter.

🤐 Hold their peace means stay silent
😠 Zophar accuses Job of lying
🚫 He expects a challenge, not silence
📖 This sets up the whole chapter

## 😏 Shall No Man Make Thee Ashamed

"Mockest" means speaking with scorn toward something serious.

"Ashamed" here means proven wrong through open argument.

Zophar believes no one has confronted Job's mocking tone yet.

He now positions himself as that confronting voice.

This verse names exactly what Zophar is about to attempt.

😏 Mockest means speaking with scorn
🗯️ Ashamed means proven wrong in debate
🙋 No one has confronted Job yet
📖 Zophar now takes on that role

## 📋 My Doctrine Is Pure

This does not mean Job spoke these exact words earlier.

Zophar is summarizing what he believes Job's arguments amount to.

"Doctrine" here means teaching or belief, not just opinion.

Job has argued that he is innocent, though never in this exact phrase.

Zophar compresses that argument into a single sharp accusation.

🗣️ Job never said these exact words
📋 Doctrine means teaching or belief
🙋 Zophar compresses Job's argument here
📖 This is Zophar's summary, not a quote

## 🙏 Oh That God Would Speak

Zophar shifts from accusing Job to wishing God would step in directly.

He believes a direct word from God would settle everything.

"Open his lips against thee" pictures God speaking in open rebuke.

Zophar assumes that rebuke would side entirely with him.

He does not yet consider that God might disagree with his own view.

🙏 Zophar wishes God would speak directly
⚖️ He expects that word to be a rebuke
😌 Zophar assumes God agrees with him
📖 He never considers being wrong himself

## 💰 God Exacteth Of Thee Less Than Thine Iniquity Deserveth

"Exacteth" means demands as payment, like a debt being collected.

"Iniquity" means guilt or wrongdoing.

Zophar's core claim is that Job is actually getting off easy.

He believes Job's suffering is less than his sin has earned.

This is the sharpest accusation Zophar makes in the whole chapter.

💰 Exacteth means demands as payment
⚖️ Iniquity means guilt or wrongdoing
😤 Zophar claims Job is getting off easy
📖 This is his sharpest accusation yet

# Job 11:7-9
# 🔍 Canst Thou By Searching Find Out God
---
## 🔍 Canst Thou By Searching Find Out God

This question expects the answer no.

"Searching" pictures a determined human effort to fully understand something.

Zophar asks whether that kind of effort could ever fully grasp God.

Human effort, however determined, still has limits.

God is presented here as beyond full human discovery.

❓ The question expects the answer no
🔍 Searching pictures determined human effort
🧠 Human understanding still has real limits
📖 God is beyond full human discovery

## 💪 Find Out The Almighty Unto Perfection

"Almighty" is a title for God emphasizing total power.

"Unto perfection" here means completely, not partially.

Zophar asks if anyone could understand God's power all the way through.

The question is rhetorical, the assumed answer is no one can.

This idea sets up the description that follows.

💪 Almighty emphasizes God's total power
🎯 Unto perfection means fully or completely
🙅 No one can grasp God that fully
📖 This sets up the description ahead

## ⬆️ It Is As High As Heaven

This line uses height as a picture for something impossible to reach.

Heaven here means the sky, the highest point a person could imagine.

Zophar says God's greatness reaches beyond that highest point.

No one can act on something that far beyond their reach.

The picture continues in the next line with the opposite direction.

⬆️ Heaven pictures the highest reachable point
🌌 God's greatness goes beyond even that
🙅 No one can act that far up
📖 The picture continues downward next

## 🕳️ Deeper Than Hell

"Hell" here translates a Hebrew word for the grave.

It is not a place of eternal punishment in this verse.

Ancient readers used it to picture the deepest hidden place imaginable.

Zophar pairs it with heaven to describe two extreme directions.

God's greatness cannot be measured by reaching either extreme.

🕳️ Hell here means the grave
🌍 It pictures the deepest hidden place
⚖️ Heaven and hell picture two extremes
📖 God's greatness has no limit

## 📏 Broader Than The Sea

Zophar adds two more directions to the picture, length and width.

The earth was the largest solid distance ancient people could imagine.

The sea was the largest expanse of open space they knew.

Even those two enormous measurements still fall short of describing God.

Every direction runs out before God's greatness does.

📏 Earth pictures the largest solid distance
🌊 Sea pictures the largest open expanse
🙅 Both still fall short of God
📖 Every direction runs out before God does

# Job 11:10-12
# 👁️ For He Knoweth Vain Men
---
## 🚫 Then Who Can Hinder Him

"Hinder" means to stop or interfere with someone's action.

Zophar pictures God as completely free to act.

No human power could stop whatever God decides to do.

This describes pure, unstoppable authority.

It sets up the deeper point about God's awareness.

🚫 Hinder means to stop or interfere
👑 God acts with complete freedom
🙅 No human power can stop God
📖 This sets up the next point

## 🎭 For He Knoweth Vain Men

"Vain" here means empty, worthless, or without real substance.

Zophar is not calling every person foolish in a casual sense.

He means people who trust in empty things instead of God.

Zophar claims God sees straight through that emptiness.

Nothing about a person's true character stays hidden from God.

🎭 Vain means empty or without substance
👁️ God sees straight through emptiness
🙈 Nothing about a person stays hidden
📖 Zophar claims God knows people fully

## ❓ Will He Not Then Consider It

This question expects the answer yes.

Zophar insists God does take note of wickedness when he sees it.

"Consider" here means to weigh carefully and respond, not simply notice.

Zophar is arguing that nothing gets overlooked by God.

He will use this claim against Job in the verses ahead.

❓ The question expects the answer yes
⚖️ Consider means to weigh and respond
👁️ Nothing gets overlooked by God
📖 Zophar will use this against Job

## 🧠 For Vain Man Would Be Wise

Zophar returns to the same word "vain" from two lines earlier.

He claims empty minded people still want to appear wise.

Wanting wisdom and actually having it are two different things.

Zophar is building toward a blunt comparison in the next line.

The gap between wanting wisdom and having it is the whole point.

🎭 Vain repeats the same idea again
🧠 Wanting wisdom differs from having it
😏 People often want to appear wise
📖 Zophar builds toward a blunt comparison

## 🫏 Though Man Be Born Like A Wild Ass's Colt

This is one of the more vivid pictures in the whole book.

A wild donkey's colt is stubborn and resistant to training.

Zophar compares that untamed nature to how humans are naturally born.

Wisdom does not come naturally to people in his view.

It has to be trained into them over time.

🫏 A wild colt is stubborn and untamed
🍼 Zophar compares that to human nature
🎓 Wisdom must be trained, not assumed
📖 It does not come naturally

# Job 11:13-17
# 🙏 If Thou Prepare Thine Heart
---
## 🧭 If Thou Prepare Thine Heart

"Prepare" here means to set something in order deliberately.

Zophar shifts from accusation to advice for the first time in the chapter.

He is telling Job what repentance would look like in practice.

Preparing the heart means aiming it deliberately toward God.

This begins the list of conditions Zophar lays out for hope.

🧭 Prepare means to set in order
🔄 Zophar shifts from accusation to advice
🙏 This describes aiming the heart at God
📖 It begins Zophar's list of conditions

## 🙌 Stretch Out Thine Hands Toward Him

Stretching out the hands was a common posture for prayer.

It pictured someone openly appealing to God for help.

Zophar pairs that outward action with an inward change of heart.

This made the change visible, not just private.

Heart and hands were meant to move toward God together.

🙌 Stretched hands was a common prayer posture
🗣️ It pictured an open appeal to God
🤝 Zophar pairs inward change with outward action
📖 Heart and hands move together here

## ✋ Put It Far Away

"Iniquity in thine hand" pictures sin as something a person is holding.

Zophar is not describing a vague inward feeling here.

He means specific wrongdoing a person could actually name and set down.

"Put it far away" pictures a deliberate act of letting go.

This is a call to real repentance, not a vague wish.

✋ Iniquity in the hand pictures sin held
📛 Zophar means specific, nameable wrongdoing
🗑️ Put it far away means let it go
📖 This calls for real repentance

## ⛺ Let Not Wickedness Dwell In Thy Tabernacles

"Tabernacles" here simply means tents, the homes people lived in then.

Zophar is not only talking about private thoughts.

He means wickedness should not be allowed to live inside a household.

The command reaches from the heart all the way to daily life.

Repentance, for Zophar, has to be visible at home, not just internal.

⛺ Tabernacles means tents or homes
🏠 Zophar means wickedness in daily life
❤️ Repentance reaches from heart to home
📖 It has to be visible, not just internal

## 🙆 Then Shalt Thou Lift Up Thy Face Without Spot

"Lift up thy face" is an old idiom for standing with confidence.

"Without spot" means clean, with nothing left to be ashamed of.

Zophar promises that repentance would restore Job's confidence completely.

This is the reward attached to the conditions just listed.

Zophar presents it as a simple cause and effect.

🙆 Lift up thy face means stand confidently
✨ Without spot means clean, nothing to hide
🎁 This is the reward Zophar promises
📖 He presents it as cause and effect

## 😌 Thou Shalt Forget Thy Misery

Zophar promises Job would stop being weighed down by his pain.

"Remember it as waters that pass away" compares that pain to a flood.

Floodwaters look overwhelming while they are present.

They disappear completely once they have passed through.

Zophar is promising Job's suffering would feel just as far away someday.

😌 Zophar promises relief from Job's pain
🌊 Waters that pass away pictures a receding flood
💧 Floods look overwhelming, then disappear completely
📖 Zophar promises the pain will fade too

## ⏳ Thine Age Shall Be Clearer Than The Noonday

"Age" here means Job's remaining lifetime, not his current years.

Noonday is the brightest point of the day, with no shadows.

Zophar promises Job's future would be even brighter than that.

"Thou shalt shine forth" repeats that same promise of light.

Darkness and confusion would give way to clarity, in Zophar's view.

⏳ Age means Job's remaining lifetime
☀️ Noonday is the brightest point of day
🌅 Zophar promises a future even brighter
📖 Darkness would give way to clarity

# Job 11:18-20
# 🛡️ Thou Shalt Be Secure
---
## 🛡️ Thou Shalt Be Secure

"Secure" here means free from fear or threat.

Zophar ties that security directly to having real hope.

Without hope, Job's suffering would feel endless and unstable.

With hope restored, Zophar promises stability would follow.

This connects directly to the confidence promised two verses earlier.

🛡️ Secure means free from fear or threat
🌱 Zophar ties security to real hope
⚖️ Without hope, life feels unstable
📖 This echoes the confidence promised earlier

## 🕳️ Take Thy Rest In Safety

"Dig about thee" pictures someone settling into a permanent home.

People dug wells and foundations when they planned to stay long term.

This is not the language of someone still running or hiding.

Zophar is promising Job permanence, not just temporary relief.

Rest, here, means genuine safety, not simply the absence of activity.

🕳️ Digging pictures settling into a permanent home
🏡 Wells and foundations meant long term plans
🏃 This is not language of hiding
📖 Zophar promises permanence, not temporary relief

## 😌 None Shall Make Thee Afraid

Zophar promises Job a life with no lingering threat.

"Many shall make suit unto thee" pictures people coming to Job for favors.

That image reverses Job's current situation completely.

Right now, others avoid Job rather than seek him out.

Zophar promises that respect and standing would fully return.

😌 Zophar promises a life with no threat
🙇 Many making suit pictures people seeking favor
🔄 This reverses Job's current situation
📖 Zophar promises full respect returning

## 👁️ But The Eyes Of The Wicked Shall Fail

"Fail" here does not describe physical blindness.

It pictures hope running out completely, like a light going dark.

Zophar shifts from promises for Job to a warning for the wicked.

He wants Job to see the contrast between the two paths.

One path leads to security, the other leads to failing hope.

👁️ Fail here means hope running out
🕯️ It pictures a light going dark
🔀 Zophar shifts to warning the wicked
📖 He wants Job to see the contrast

## 💀 Their Hope Shall Be As The Giving Up Of The Ghost

"Giving up the ghost" is an old phrase simply meaning to die.

Zophar closes his speech on the harshest possible image.

The wicked's hope, he says, amounts to nothing but death itself.

This chapter ends with a warning instead of comfort.

Zophar leaves Job to decide which path actually describes him.

💀 Giving up the ghost means to die
😔 Their hope amounts to nothing but death
⚠️ Zophar closes his speech with a warning
📖 He leaves Job to weigh the choice
`.trim();

export const JOB_ELEVEN_PERSONAL_SECTIONS = parseJobElevenRawNotes(JOB_ELEVEN_RAW_NOTES);
