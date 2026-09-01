export type JobTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobTwentyTwoRawNotes(rawText: string): JobTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 22:${startVerse}` : `Job 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Job 22 sections, received " + sections.length);
  }

  return sections;
}

const JOB_TWENTY_TWO_RAW_NOTES = `# Job 22:1-5
# 🗣️ Eliphaz Turns Sharp
---
## 💰 Can A Man Be Profitable Unto God

Profitable means useful or beneficial in a practical sense.

Eliphaz opens his final speech with a sharp question.

He asks whether human goodness actually helps God in any way.

The implied answer is no, God does not need anything Job could offer.

💰 Profitable means useful or beneficial
❓ Eliphaz opens with a sharp question
🙅 He implies God needs nothing from Job
➡️ God's goodness does not depend on people

## 🧠 As He That Is Wise May Be Profitable Unto Himself

This phrase compares human righteousness to human wisdom.

A wise man mostly benefits himself through his own good choices.

Eliphaz argues that righteousness works the same way.

It helps the person living it, not God who stays unaffected by it.

🧠 Wisdom benefits mostly the wise person
⚖️ Eliphaz compares this to righteousness
🙂 Righteousness helps the person, not God
➡️ God stays unaffected either way

## 😊 Is It Any Pleasure To The Almighty, That Thou Art Righteous

Eliphaz repeats his point with a second rhetorical question.

Pleasure here means personal delight or benefit.

He asks whether Job's righteous life brings God any real delight.

Eliphaz wants Job to see his goodness as something owed, not a gift.

❓ Eliphaz repeats the point again
😊 Pleasure means personal delight or benefit
🙋 He questions if God delights in Job's life
📖 Job's goodness is framed as something owed

## 💵 Is It Gain To Him, That Thou Makest Thy Ways Perfect

Gain here means profit or advantage.

Eliphaz asks if Job's careful obedience adds anything to God's account.

Makest thy ways perfect means living with careful, consistent integrity.

Eliphaz insists none of this changes God's position at all.

💵 Gain means profit or advantage
❓ Does Job's obedience add to God
🎯 Perfect ways means careful, consistent integrity
📖 None of it changes God's position

## ⚖️ Will He Reprove Thee For Fear Of Thee

Reprove means to correct or rebuke someone for wrongdoing.

Eliphaz asks if God would ever discipline Job out of fear.

The idea is almost absurd on its face.

God has no reason to fear a human being.

⚖️ Reprove means to correct or rebuke
😨 Eliphaz asks if fear drives God's discipline
🙅 The idea sounds almost absurd
➡️ God has no reason to fear anyone

## 🎯 Is Not Thy Wickedness Great

Eliphaz drops the careful questioning and accuses Job directly.

This is the turn in his whole speech.

He claims Job's sin is not small but enormous.

Everything that follows will try to prove this claim.

🎯 Eliphaz drops the careful questioning
🔄 This is the turn in his speech
📢 He claims Job's sin is enormous
➡️ The rest of his speech proves this claim

## ♾️ Thine Iniquities Infinite

Iniquities means sins or moral wrongs, more than simple mistakes.

Infinite here is an exaggeration for emphasis, not a literal count.

Eliphaz wants Job to feel the weight of an endless list of failures.

This sets up the specific accusations that follow.

⚖️ Iniquities means sins, not mere mistakes
♾️ Infinite is used here for emphasis
😣 Eliphaz wants Job to feel real weight
➡️ This sets up the specific charges ahead

# Job 22:6-9
# 💔 The Accusations Begin
---
## 🤝 Taken A Pledge From Thy Brother For Nought

A pledge was an item taken as security for a loan or debt.

For nought means Job took it without any real reason or cause.

Ancient law allowed pledges but limited how they could be taken.

Eliphaz accuses Job of taking collateral he had no right to.

🤝 A pledge secured a loan or debt
🚫 For nought means without real cause
📜 Ancient law limited how pledges worked
📖 Eliphaz accuses Job of taking unfairly

## 👕 Stripped The Naked Of Their Clothing

This accuses Job of taking a poor man's only garment as a pledge.

Old Testament law required returning a clothing pledge by nightfall.

Losing that covering overnight meant real physical suffering in the cold.

Eliphaz claims Job ignored this basic protection for the poor.

👕 Job allegedly took a poor man's garment
🌙 Law required returning it by nightfall
🥶 Losing it overnight caused real suffering
➡️ Eliphaz says Job ignored this protection

## 💧 Not Given Water To The Weary

Hospitality to a tired traveler was a basic expectation in this culture.

Offering water cost almost nothing to give.

Eliphaz accuses Job of refusing even this small kindness.

Withholding it would have marked Job as coldhearted in his community.

💧 Water for travelers was basic hospitality
🆓 It cost almost nothing to give
🙅 Eliphaz says Job refused this kindness
📖 Withholding it seemed coldhearted to others

## 🍞 Withholden Bread From The Hungry

Withholden is an old word meaning held back or refused.

Bread here represents basic food, not a specific loaf.

Eliphaz claims Job denied food to people who genuinely needed it.

This accusation escalates from small unkindness to real neglect.

🚫 Withholden means held back or refused
🍞 Bread represents basic, needed food
😔 Eliphaz says Job denied it to the hungry
➡️ This accusation escalates to real neglect

## 💪 As For The Mighty Man, He Had The Earth

Mighty man means someone powerful or influential in the community.

Eliphaz accuses Job of favoring the powerful over the weak.

He suggests Job let strong men take the best land unfairly.

Wealth and land were the clearest signs of status in this culture.

💪 Mighty man means someone powerful
🏞️ Job allegedly favored the powerful
⚖️ Strong men took the best land unfairly
📖 Land marked status in this culture

## 👩 Thou Hast Sent Widows Away Empty

Widows had no husband to provide or advocate for them.

Sent away empty means they left with nothing after asking for help.

Ancient law placed special responsibility on the community to care for widows.

Eliphaz accuses Job of failing that basic duty.

👩 Widows lacked a husband's protection
🙅 They allegedly left with nothing
📜 Law required special care for widows
➡️ Eliphaz says Job failed that duty

## 👶 The Arms Of The Fatherless Have Been Broken

Fatherless means orphaned children with no father to protect them.

Broken arms here is a figure of speech, not a literal injury.

It pictures children left powerless and unable to defend themselves.

Eliphaz claims Job crushed the support these children depended on.

👶 Fatherless means children without a father
💪 Broken arms pictures lost strength
🚫 It is a figure of speech
📖 Eliphaz says Job crushed their support

# Job 22:10-14
# 🌩️ Snares And A God Too Far To See
---
## 🪤 Snares Are Round About Thee

Snares are traps, usually set to catch an animal by surprise.

Eliphaz says Job's troubles now surround him the same way.

He presents Job's suffering as the direct result of the sins just listed.

This is Eliphaz connecting cause and effect plainly.

🪤 Snares means traps set to catch prey
🔄 Job's troubles now surround him
⚖️ Eliphaz ties this to Job's alleged sins
➡️ He connects cause and effect directly

## 😨 Sudden Fear Troubleth Thee

Eliphaz claims Job's fear comes without warning, striking suddenly.

Troubleth means to disturb deeply, not a minor worry.

He frames this fear as proof of hidden guilt.

A clear conscience, in his view, would not feel this way.

😨 Sudden fear strikes without warning
😣 Troubleth means deep disturbance
🎯 Eliphaz treats this as proof of guilt
➡️ He assumes a clear conscience feels no fear

## 🌑 Darkness, That Thou Canst Not See

This darkness pictures confusion and lost direction, not just nightfall.

Eliphaz says Job cannot see his own path clearly anymore.

He blames this blindness on Job's supposed sin.

The image continues his pattern of tying suffering to hidden guilt.

🌑 Darkness pictures confusion, not just night
🧭 Job allegedly cannot see his path
⚖️ Eliphaz blames this on hidden sin
📖 This continues his pattern of blame

## 🌊 Abundance Of Waters Cover Thee

This pictures Job as overwhelmed, like floodwaters rising over him.

Water imagery often described being overtaken by disaster in this culture.

Eliphaz uses the image to describe total, drowning ruin.

He sees Job's suffering as complete, not partial.

🌊 Water pictures Job being overwhelmed
📈 This imagery often described disaster
🌀 Eliphaz means total, drowning ruin
➡️ He sees Job's suffering as complete

## 🌌 Is Not God In The Height Of Heaven

Eliphaz shifts to describing Job's supposed thinking about God.

He notes that God dwells far above in the highest heaven.

This sets up an accusation that Job thinks distance means blindness.

The height of heaven pictures God's power and majesty.

🌌 Eliphaz shifts to Job's supposed thinking
☁️ God dwells in the highest heaven
📏 Height pictures God's power and majesty
➡️ This sets up an accusation to come

## ⭐ Behold The Height Of The Stars, How High They Are

Eliphaz points to the stars as another picture of God's distance.

Ancient people saw the stars as impossibly far away and fixed in the sky.

He uses this image to suggest Job sees God as remote.

The next verse reveals why this matters to his argument.

⭐ Eliphaz points to the distant stars
🔭 Stars seemed impossibly far and fixed
🙅 He suggests Job sees God as remote
➡️ The next verse explains why it matters

## 🗣️ Thou Sayest, How Doth God Know

Eliphaz now puts words directly into Job's mouth.

He claims Job secretly believes God cannot see what happens on earth.

Nothing in Job's earlier speeches actually says this.

Eliphaz is guessing at Job's hidden thoughts, not quoting him honestly.

🗣️ Eliphaz puts words in Job's mouth
❓ He claims Job doubts God's sight
🚫 Job never actually said this
📖 Eliphaz is guessing, not quoting honestly

## ☁️ Can He Judge Through The Dark Cloud

This continues Eliphaz's imagined version of Job's thinking.

He pictures thick clouds blocking God's view of the earth.

The question implies Job believes clouds could hide sin from God.

Eliphaz will use this same image against Job in the next line.

☁️ This continues Eliphaz's imagined view
🙈 Clouds pictured as blocking God's sight
🤔 It implies sin could hide from God
➡️ Eliphaz turns this image against Job next

## 🔄 He Walketh In The Circuit Of Heaven

Circuit means a circular path, like the sun's path across the sky.

Ancient people pictured the sky as a dome God walked along.

Eliphaz claims Job sees God as distant, walking far above, uninvolved.

This finishes his imagined picture of what Job secretly believes.

🔄 Circuit means a circular path
🌅 Ancient people pictured a domed sky
🚶 Job allegedly sees God as distant
📖 This finishes Eliphaz's imagined picture

# Job 22:15-20
# 🌊 The Old Way The Wicked Walked
---
## 👀 Hast Thou Marked The Old Way

Marked here means paid close attention to or studied carefully.

Eliphaz asks if Job has considered how history has always worked.

The old way refers to a long tradition of how God deals with sinners.

He is appealing to precedent, not just his own opinion.

👀 Marked means paying close attention
📜 The old way means a long tradition
⚖️ Eliphaz appeals to precedent, not opinion
➡️ He wants history to prove his point

## 🚶 Which Wicked Men Have Trodden

Trodden means walked, as in following a well worn path.

Eliphaz pictures sin as a path many wicked people have followed before.

He wants Job to see himself as walking that same old road.

The image assumes Job's suffering fits a familiar, ancient pattern.

🚶 Trodden means walked, a well worn path
🛤️ Sin is pictured as a path
🎯 Eliphaz places Job on that same road
📖 He assumes a familiar, ancient pattern

## ⏳ Cut Down Out Of Time

This means these wicked people died early, before their expected lifespan.

Eliphaz uses their sudden deaths as proof they were judged by God.

Out of time stresses how unexpected and premature their end was.

This is the fate Eliphaz warns Job could still be heading toward.

⏳ Cut down means dying early
⚖️ Their deaths are treated as proof
😮 Out of time stresses how sudden it was
➡️ Eliphaz warns Job of this same fate

## 🏗️ Whose Foundation Was Overflown With A Flood

Foundation means the base or footing something is built on.

This line likely echoes the flood story from the book of Genesis.

Many scholars believe Eliphaz is pointing to Noah's generation as his example.

That flood destroyed a whole generation known for wickedness.

🏗️ Foundation means the base something rests on
🌊 This likely echoes the flood of Genesis
📜 Many scholars see Noah's generation here
📖 That flood destroyed a wicked generation

## 🗣️ Which Said Unto God, Depart From Us

Eliphaz quotes the exact defiant words Job used to describe the wicked.

Job said this himself back in chapter twenty one.

Eliphaz borrows Job's own example and turns it back on him.

He wants Job to see himself standing with the people Job just condemned.

🗣️ Eliphaz quotes Job's own earlier words
🔁 Job used this phrase in chapter twenty one
🎯 Eliphaz turns Job's example back on him
➡️ He places Job among the condemned

## 🙅 What Can The Almighty Do For Them

This question shows the wicked dismissing God as useless to them.

They see no benefit in trusting or obeying him.

Eliphaz repeats this attitude to remind Job where such thinking leads.

The old way he mentioned always ends the same way, in ruin.

🙅 The wicked dismiss God as useless
🚫 They see no benefit in trusting him
⚖️ Eliphaz reminds Job where this leads
📖 The old way always ends in ruin

## 🏠 Yet He Filled Their Houses With Good Things

This admits something that complicates Eliphaz's own argument.

God still blessed these wicked people with prosperity for a time.

Eliphaz does not stop to explain this tension.

He moves quickly past it toward his main point.

🏠 God still blessed them for a time
⚖️ This complicates Eliphaz's own argument
🙈 He does not explain the tension
➡️ Eliphaz moves quickly past it

## 🔁 The Counsel Of The Wicked Is Far From Me

Eliphaz uses this exact same line Job spoke in chapter twenty one.

Counsel means their mindset and way of thinking, not just advice.

Both men agree wicked thinking should be rejected.

Their real disagreement is not about this line but about Job's own guilt.

🔁 Eliphaz repeats Job's own line
🧠 Counsel means mindset, not just advice
🤝 Both men reject wicked thinking here
📖 Their real fight is about Job's guilt

## 😊 The Righteous See It, And Are Glad

Eliphaz describes how good people respond when the wicked finally fall.

Glad here means genuine relief, not cruel pleasure.

He believes justice being visible brings comfort to honest people.

This is the outcome Eliphaz insists always eventually happens.

😊 Glad means genuine relief, not cruelty
👀 The righteous witness the wicked falling
⚖️ Visible justice comforts honest people
➡️ Eliphaz insists this always happens

## 😏 The Innocent Laugh Them To Scorn

Laugh to scorn means to mock someone who deserved what happened to them.

This is not casual cruelty in Eliphaz's view, it is vindication.

He pictures a clear, public reversal that everyone can see and understand.

The wicked lose their power and their dignity at the same time.

😏 Laugh to scorn means deserved mockery
⚖️ Eliphaz calls this vindication, not cruelty
👥 The reversal is public and clear
📖 The wicked lose power and dignity

## 💰 Our Substance Is Not Cut Down

Substance here means wealth, property, and possessions.

The righteous speaker contrasts their own lasting security with the wicked's sudden loss.

This is spoken from the viewpoint of those who remained faithful.

It draws a clear line between two very different outcomes.

💰 Substance means wealth and possessions
🏛️ The righteous keep lasting security
⚖️ This contrasts with the wicked's sudden loss
➡️ It draws a line between two outcomes

## 🔥 The Remnant Of Them The Fire Consumeth

Remnant means whatever is left over after the main loss.

Fire here pictures total, final destruction, not a partial setback.

Eliphaz closes this section on a note of complete ruin.

He wants Job to feel the finality of that ending clearly.

🔥 Remnant means whatever is left over
💥 Fire pictures total, final destruction
🎯 Eliphaz closes on complete ruin
📖 He wants Job to feel this finality

# Job 22:21-26
# 🤲 Acquaint Now Thyself With Him
---
## 🔄 Acquaint Now Thyself With Him

Eliphaz suddenly changes his tone here.

Acquaint means to become closely familiar with someone again.

He is calling Job back into a relationship with God, not just correct behavior.

This softer appeal marks a real turn in his speech.

🔄 Eliphaz suddenly changes his tone
🤝 Acquaint means becoming familiar again
🙏 He calls Job back into relationship
➡️ This marks a real turn in the speech

## 🕊️ Be At Peace

Peace here means a restored, settled relationship, not just calm feelings.

Eliphaz promises this peace will follow if Job reconciles with God.

He frames the whole conflict as something Job can simply end.

The offer assumes Job's own choice caused the original break.

🕊️ Peace means a restored relationship
🤝 It follows reconciliation with God
🔓 Eliphaz frames this as Job's choice
📖 He assumes Job caused the original break

## 📜 Receive The Law From His Mouth

Law here means instruction or teaching, broader than a list of rules.

From his mouth stresses that this teaching comes directly from God himself.

Eliphaz urges Job to accept correction rather than keep arguing.

He believes humility now would end Job's suffering sooner.

📜 Law here means instruction or teaching
🗣️ From his mouth means direct from God
🙇 Eliphaz urges Job to accept correction
➡️ He believes humility would end the suffering

## 📦 Lay Up His Words In Thine Heart

Lay up means to store carefully for future use, like treasure.

Heart in this culture meant the center of thought, not just emotion.

Eliphaz wants God's teaching to shape how Job thinks daily.

This goes beyond one time obedience toward lasting change.

📦 Lay up means storing carefully
🧠 Heart meant the center of thought
🔁 Eliphaz wants daily, lasting change
📖 This goes beyond one time obedience

## 🔙 If Thou Return To The Almighty

Return here pictures Job coming back after wandering away.

This assumes Job has actually left God's ways, which Job denies.

Eliphaz's whole appeal depends on an assumption Job would reject.

Still, the promise that follows is genuine and generous.

🔙 Return pictures coming back after wandering
❓ This assumes guilt Job denies
⚖️ The appeal rests on that assumption
➡️ The promise that follows is still generous

## 🏗️ Thou Shalt Be Built Up

Built up pictures restoration, like a torn down house being rebuilt.

Eliphaz promises Job's life will be reconstructed, not just patched.

Think of a house stripped down to its foundation.

This promise offers a completely fresh structure, not a quick repair.

🏗️ Built up pictures full restoration
🏚️ Job's life is like a torn down house
🏠 The promise offers a fresh structure
📖 Not a patch, but a rebuild

## ⛺ Put Away Iniquity Far From Thy Tabernacles

Tabernacles here means tents, the ordinary word for a household's home.

Eliphaz calls Job to remove sin from his whole household, not just himself.

This assumes sin has spread beyond Job to affect his family.

It is a broad, sweeping call to change.

⛺ Tabernacles means tents, a household's home
👪 The call includes Job's whole household
🧹 Eliphaz wants sin removed completely
➡️ This is a broad, sweeping call

## 💛 Lay Up Gold As Dust

This is a hyperbole, an exaggeration used to make a point vividly.

Eliphaz pictures gold becoming as common to Job as ordinary dirt.

The image promises overwhelming wealth, not a modest recovery.

He wants Job to picture total abundance, not just enough to get by.

💛 This is a vivid exaggeration
🌍 Gold becomes as common as dirt
💰 The promise is overwhelming wealth
📖 Eliphaz pictures total abundance, not just enough

## 🗺️ The Gold Of Ophir

Ophir was a distant region famous throughout the ancient world for fine gold.

Naming it here is like naming the finest gold available anywhere.

Eliphaz uses this specific detail to make the promise feel real, not vague.

The comparison would have meant something concrete to the first hearers.

🗺️ Ophir was famous for its fine gold
🏆 Naming it means the very finest gold
🎯 This makes the promise feel concrete
➡️ First hearers would recognize it immediately

## 🛡️ The Almighty Shall Be Thy Defence

Defence here means protection from danger or attack.

Eliphaz promises that God himself will guard Job going forward.

This replaces every human accusation with a much stronger source of safety.

The promise answers Job's fear of being exposed and unprotected.

🛡️ Defence means protection from danger
🙏 God himself will guard Job
💪 This is stronger than human accusation
📖 It answers Job's fear of exposure

## 🪙 Thou Shalt Have Plenty Of Silver

Plenty here means more than enough, a generous abundance.

Silver, like gold, was a direct measure of wealth in this economy.

Eliphaz pairs this promise with the earlier gold as dust image.

Material security is part of the reconciliation he is offering.

🪙 Plenty means more than enough
💵 Silver measured wealth in this economy
🔁 This pairs with the earlier gold image
➡️ Material security is part of the offer

## 🙆 Lift Up Thy Face Unto God

Lifting up the face is an old idiom for approaching someone with confidence.

A lowered face pictured shame or guilt in this culture.

Eliphaz promises Job will one day stand before God without fear.

This directly answers the shame Job has felt throughout his suffering.

🙆 Lifting the face means confident approach
😔 A lowered face pictured shame
🙏 Job will one day stand unashamed
📖 This answers the shame of his suffering

# Job 22:27-30
# 🙏 The Promise Of Restoration
---
## 🙏 Thou Shalt Make Thy Prayer Unto Him

Eliphaz promises that Job's prayers will actually be heard again.

This assumes Job's prayers currently feel unheard or blocked.

The promise restores open communication between Job and God.

It answers one of Job's deepest complaints throughout the book.

🙏 Job's prayers will be heard again
🚫 This assumes they now feel blocked
🔓 The promise restores open communication
➡️ It answers one of Job's deepest complaints

## 🤝 Thou Shalt Pay Thy Vows

Vows were promises made to God, often during a time of crisis.

Paying a vow meant following through once the crisis had passed.

Eliphaz pictures Job finally free to fulfill promises made in hardship.

This detail assumes real relief is coming, not just quiet endurance.

🤝 Vows were promises made to God
✅ Paying one meant following through
🙏 Job would finally fulfill his promises
📖 This assumes real relief is coming

## 📢 Thou Shalt Decree A Thing, And It Shall Be Established

Decree here means to declare or determine something with authority.

Established means it will actually happen, not just be hoped for.

Eliphaz promises Job unusual influence once he is restored.

This pictures a level of favor beyond ordinary daily life.

📢 Decree means declaring with authority
✅ Established means it will actually happen
💪 Eliphaz promises unusual future influence
➡️ This pictures favor beyond ordinary life

## 💡 The Light Shall Shine Upon Thy Ways

Light here pictures clarity, success, and God's favor together.

Darkness earlier in the chapter pictured confusion and hidden guilt.

This promise reverses that darkness completely.

Job's path forward would finally be clear and blessed.

💡 Light pictures clarity and favor together
🌑 It reverses the darkness from earlier
🛤️ Job's path would finally be clear
📖 The reversal is complete, not partial

## ⬇️ When Men Are Cast Down, Then Thou Shalt Say, There Is Lifting Up

Cast down means brought low by hardship or failure.

Lifting up means rescue or restoration for someone in that state.

Eliphaz promises Job will one day have the power to help others rise.

The sufferer would become someone who brings comfort instead.

⬇️ Cast down means brought low
⬆️ Lifting up means rescue or restoration
🤝 Job would gain power to help others
➡️ The sufferer becomes a source of comfort

## 🙇 He Shall Save The Humble Person

Humble here means someone lowly, without power to save themselves.

Eliphaz promises God rescues exactly this kind of person.

This connects directly to the future role Eliphaz just described for Job.

Job would move from needing rescue to helping deliver it.

🙇 Humble means someone without power to save themselves
🙏 God rescues exactly this kind of person
🔁 This connects to Job's promised future role
📖 Job moves from rescued to rescuer

## 🏝️ He Shall Deliver The Island Of The Innocent

Island is an unusual word choice in this exact spot.

Many scholars believe the original text may have read differently here.

The general promise stays the same either way, God rescues the innocent.

The exact wording of this line remains genuinely uncertain.

🏝️ Island is an unusual word here
📜 Many scholars debate the original wording
🙏 God still rescues the innocent
➡️ The exact wording remains uncertain

## 🤲 It Is Delivered By The Pureness Of Thine Hands

Pureness of hands is an old idiom for genuine innocence in action.

Eliphaz closes his speech circling back to his opening accusation.

He implies that clean living, not just belief, brings deliverance.

The whole speech ends exactly where his argument against Job began.

🤲 Pureness of hands means genuine innocence
🔁 Eliphaz circles back to his opening
✋ Clean living, not just belief, matters
📖 The speech ends where the argument began
`.trim();

export const JOB_TWENTY_TWO_PERSONAL_SECTIONS = parseJobTwentyTwoRawNotes(JOB_TWENTY_TWO_RAW_NOTES);
