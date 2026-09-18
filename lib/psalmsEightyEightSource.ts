export type PsalmsEightyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsEightyEightRawNotes(rawText: string): PsalmsEightyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsEightyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+88:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 88 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+88:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+88:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 88 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 88,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 88:${startVerse}` : `Psalms 88:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 88 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_EIGHTY_EIGHT_RAW_NOTES = `# Psalms 88:1-3
# 😢 A Cry By Day And By Night
---
## 🆘 O LORD God Of My Salvation

This title calls God his salvation even while he feels near death.

"LORD" is God's personal covenant name, not just a general title for deity.

Using that name means trusting the God who has kept his promises before.

Psalm 88 is the darkest psalm in the Bible, with no happy ending.

Even so, it opens by naming God as rescue, not as an enemy.

🆘 Salvation names God as rescue
✍️ LORD is God's personal covenant name
🌑 Psalm 88 never turns hopeful
📖 The prayer still opens naming God as rescue

## 😭 I Have Cried Day And Night Before Thee

"Cried" here means loud, urgent pleading, not a quiet complaint.

This was continuous prayer, not a single request said once.

"Day and night" is a Hebrew pattern for something happening without stop.

The psalmist has been begging God for help around the clock.

No answer has come yet, but the crying has not stopped either.

😭 Cried means loud urgent pleading
🔁 This was continuous prayer, not once
☀️ Day and night means without stop
📖 He keeps crying even with no answer

## 👂 Incline Thine Ear Unto My Cry

This does not mean God physically leans down to listen.

"Incline thine ear" pictures someone turning full attention toward a sound.

It describes the kind of listening a person gives to something urgent.

The psalmist wants more than notice, he wants God's full attention.

This plea assumes God can still be reached, even in deep despair.

👂 Incline pictures turning full attention
🚫 Not a claim about God's body
🔔 It describes urgent, close listening
📖 He believes God can still be reached

## 🫀 My Soul Is Full Of Troubles

"Soul" here means the whole inner person, not just one emotion.

It covers mind, will, and feeling together, not a separate spiritual part.

"Full of troubles" pictures a container packed past its limit.

There is no more room left inside him for anything else.

This is total exhaustion, not a passing mood.

🫀 Soul means the whole inner person
📦 Full means packed past its limit
😔 This is total exhaustion, not a mood
📖 No room is left inside him

## ⏳ My Life Draweth Nigh Unto The Grave

"Draweth nigh" is an old way of saying something is getting close.

"The grave" here is Sheol, the Old Testament name for the realm of the dead.

Sheol was pictured as a shadowy, silent place under the earth.

The psalmist feels his life slipping toward that place already.

He is not simply describing sadness, he believes he is actually dying.

⏳ Draweth nigh means getting close
⚰️ The grave here is Sheol
🌫️ Sheol was pictured as shadowy and silent
📖 He believes he is actually dying

# Psalms 88:4-7
# 🕳️ Laid In The Lowest Pit
---
## 🕳️ I Am Counted With Them That Go Down Into The Pit

"The pit" is another Old Testament name for the grave, like Sheol.

To be "counted with" a group means being reckoned as one of them.

The psalmist is still alive, but he feels already listed among the dead.

His suffering is severe enough that he identifies with those who have died.

This is not poetic exaggeration, it is how deep the despair actually goes.

🕳️ The pit is another name for the grave
📋 Counted with means reckoned among them
💔 He feels already listed with the dead
📖 His despair goes this deep

## 💪 As A Man That Hath No Strength

This phrase pictures someone with nothing left to fight with.

It was a common Old Testament way of describing total weakness.

The strength being described is not only physical.

His will to keep going is as drained as his body.

💪 No strength pictures total weakness
📜 This was a common Old Testament phrase
😩 His will is drained, not only his body
📖 Nothing is left to fight with

## 🔓 Free Among The Dead

This does not mean free in the sense of happy or liberated.

In this context, "free" means released from the world of the living.

It is closer to being discharged, cut loose from every duty and relationship.

The psalmist is describing exclusion, not relief.

Being "free among the dead" means no longer counted among the living at all.

🚫 Free here does not mean happy
🔓 It means released from the living
🔗 Discharged from every duty and relationship
📖 It describes exclusion, not relief

## 🧠 Whom Thou Rememberest No More

In Old Testament thought, the dead in Sheol were cut off from active life.

Being "remembered" by God meant being acted for, blessed, or helped.

The dead were pictured as beyond that kind of active relationship.

The psalmist fears becoming someone God no longer reaches toward.

This fear, not curiosity about death, is what drives the whole psalm.

🧠 Remembered means acted for and helped
🌑 The dead were pictured beyond that reach
😟 He fears being forgotten by God
📖 This fear drives the whole psalm

## ✋ Cut Off From Thy Hand

"Hand" in the Old Testament often stands for God's active power and help.

To be "cut off" from that hand means losing access to it completely.

This is not about losing God's existence, it is about losing his help.

The psalmist pictures himself outside the one reach that could save him.

✋ Hand stands for God's active power
✂️ Cut off means losing access to it
🆘 This is about losing help, not God
📖 He feels outside the saving reach

## 🕳️ Thou Hast Laid Me In The Lowest Pit, In Darkness, In The Deeps

This verse stacks three images of distance from life and light.

"The lowest pit" pictures the deepest possible point underground.

"Darkness" removes any comfort of sight or clarity.

"The deeps" adds the picture of being submerged, like water closing overhead.

Together they describe total isolation, as far from life as a place can be.

🕳️ Lowest pit means the deepest point
🌑 Darkness removes sight and clarity
🌊 The deeps pictures being submerged
📖 Together they describe total isolation

## ⚖️ Thy Wrath Lieth Hard Upon Me, And Thou Hast Afflicted Me With All Thy Waves

"Wrath" here means God's judgment, felt as crushing pressure.

"Lieth hard" pictures a heavy weight pressing down without let up.

Think of standing in the ocean as wave after wave crashes over you.

Before one wave passes, the next one is already breaking.

That is the picture behind "waves," suffering with no gap for breath.

The word "Selah" follows here, asking the reader to pause and feel the weight.

⚖️ Wrath means felt judgment, crushing pressure
🌊 Waves pictures suffering with no gap
🫁 No room is left to catch his breath
📖 Selah asks the reader to pause here

# Psalms 88:8-9
# 🚪 Shut Up And Unable To Come Forth
---
## 👥 Thou Hast Put Away Mine Acquaintance Far From Me

"Acquaintance" here means his circle of friends and familiar companions.

The psalmist says God himself is the one who pushed them away.

This is not simply about people abandoning him on their own.

He experiences even human distance as something coming from God's hand.

Suffering this severe often isolates a person from everyone around them.

👥 Acquaintance means his circle of friends
✋ He blames God for the distance
🏝️ Suffering this deep tends to isolate
📖 Even friendship feels out of reach

## 🤢 Thou Hast Made Me An Abomination Unto Them

"Abomination" is a strong Old Testament word for something disgusting or repulsive.

The psalmist believes his own suffering has made others recoil from him.

This may reflect how serious illness or visible affliction was treated at the time.

People sometimes kept their distance from suffering they did not understand.

Being treated this way adds shame on top of his physical pain.

🤢 Abomination means something seen as repulsive
👀 His suffering made others recoil
🚷 People kept distance from unexplained affliction
📖 Shame is added on top of pain

## 🔒 I Am Shut Up, And I Cannot Come Forth

This does not necessarily describe a literal prison cell.

"Shut up" pictures being trapped, with no way out of his situation.

It could describe an illness that kept him confined and unable to move freely.

Either way, the picture is the same, he has no exit.

There is no relief in sight and no door standing open.

🔒 Shut up pictures being trapped
🚪 Not necessarily a literal prison
🛏️ Could describe a confining illness
📖 No exit and no relief in sight

## 👁️ Mine Eye Mourneth By Reason Of Affliction

In Hebrew poetry, the eye often stands for visible, outward grief.

"Mourneth" means it shows constant sorrow, not one moment of tears.

His suffering, called "affliction," is written on his face for anyone to see.

He is not hiding his pain, he cannot hide it even if he wanted to.

👁️ The eye pictures visible grief
😢 Mourneth means constant sorrow
📖 Affliction is written on his face
➡️ He cannot hide this pain

## 📆 I Have Called Daily Upon Thee

"Daily" means this was not a one time cry for help.

The psalmist has kept praying every day, even without any answer yet.

This kind of repeated, unanswered prayer is honest, not weak faith.

Persistence itself becomes part of his declaration of trust.

📆 Daily means not just one prayer
🔁 He kept praying without an answer
💪 Persistence is not weak faith
📖 Persistence itself shows trust

## 🙌 I Have Stretched Out My Hands Unto Thee

Stretching out the hands was a common Old Testament posture for prayer.

It pictured someone reaching toward God, empty handed and open.

The gesture showed both need and trust at the same time.

Even without an answer yet, the psalmist keeps reaching in this posture daily.

🙌 Stretched hands was a prayer posture
🤲 It pictured reaching, empty and open
🔁 He keeps this posture up daily
📖 Need and trust are shown together

# Psalms 88:10-12
# ⚰️ Wonders Are Not Shown To The Dead
---
## ✨ Wilt Thou Shew Wonders To The Dead

"Shew wonders" means performing visible acts of power that people can see and praise.

This begins the first of several rhetorical questions aimed straight at God.

In Old Testament thought, the dead were pictured as cut off from that kind of witness.

The psalmist is not asking out of curiosity, he is arguing for his own life.

If he dies, he believes, this kind of miracle will never reach him again.

✨ Shew wonders means visible acts of power
❓ This begins a string of hard questions
🌑 The dead were pictured cut off
📖 He is arguing to stay alive

## 🙏 Shall The Dead Arise And Praise Thee

Old Testament writers often pictured Sheol as a place with no praise or worship.

Psalm 115 and Isaiah say something similar, the dead do not praise the LORD.

This is not a full doctrine of the afterlife, it is a real ancient assumption.

The psalmist uses that assumption as part of his argument to God.

His logic is simple, keep me alive so I can keep praising you.

🙏 Sheol was pictured without praise
📖 Other scripture says the same thing
🧠 This is an ancient assumption, not full doctrine
➡️ His logic is stay alive to praise

## ❤️ Shall Thy Lovingkindness Be Declared In The Grave

"Lovingkindness" translates the Hebrew word chesed, God's steady, loyal love.

It is the word used throughout the Old Testament for covenant faithfulness.

"Declared" means spoken about and witnessed by someone still living.

The psalmist argues that chesed needs a living witness to be declared at all.

❤️ Lovingkindness translates chesed, loyal love
🤝 It is covenant faithfulness language
🗣️ Declared means spoken by a witness
📖 He argues it needs a living witness

## 🔁 Thy Faithfulness In Destruction

This line repeats the idea of the verse before it in different words.

Hebrew poetry often says the same truth twice, using two different pictures.

"Faithfulness" here pairs with lovingkindness, both are parts of God's covenant character.

"Destruction" is another word for the grave, matching the earlier word Sheol.

The repeated pattern presses the same urgent question harder each time.

🔁 This repeats the line before it
📜 Hebrew poetry often says truth twice
🤝 Faithfulness pairs with lovingkindness
📖 The repetition presses the question harder

## 🌑 Thy Wonders Be Known In The Dark

"The dark" continues describing the grave, now as a place with no light.

"Known" here means recognized and talked about among people.

The psalmist pictures God's wonders needing daylight and living witnesses to be known.

Without that light, he argues, even a display of power would go unseen.

🌑 The dark continues describing the grave
👀 Known means recognized by people
💡 Wonders need light and witnesses
📖 Unseen power helps no one

## 🌫️ The Land Of Forgetfulness

"The land of forgetfulness" is a vivid Old Testament name for the grave.

It pictures a place where even memory itself fades away completely.

This is the final and heaviest of the psalmist's four rhetorical questions.

None of these questions get answered anywhere in this psalm.

That silence is part of what makes Psalm 88 so unusual among the Psalms.

🌫️ Land of forgetfulness is a grave image
🧠 Even memory fades there
❓ This closes four straight rhetorical questions
📖 None of them get answered

# Psalms 88:13-14
# 🌅 Still Crying Out Each Morning
---
## 🔄 But Unto Thee Have I Cried, O LORD

The word "but" marks a turn after four straight unanswered questions.

Despite the silence, the psalmist has not stopped praying to God.

He does not turn to another god or give up on prayer entirely.

This is stubborn faith, not resolved faith, and both are real.

🔄 But marks a turn after silence
🙏 He keeps praying despite no answer
💪 This is stubborn faith, not resolved
📖 He never turns anywhere else

## 📜 In The Morning Shall My Prayer Prevent Thee

"Prevent" here does not mean to stop or block, as it does today.

In the King James Bible, "prevent" means to come before or arrive first.

The psalmist says his prayer will reach God before anything else does each day.

Praying first thing in the morning was his set, daily habit.

📜 Prevent means to come before, not stop
🌅 His prayer arrives first each morning
🔁 This was a daily, set habit
📖 Prayer comes before anything else

## 🗑️ Why Castest Thou Off My Soul

"Castest off" pictures throwing something away as worthless or unwanted.

This is a blunt, painful question, not calm theological reflection.

The psalmist is allowed to ask God this directly, without softening it.

Honest prayer in the Bible often sounds exactly this raw.

🗑️ Castest off pictures throwing away
😣 This is blunt, not calm reflection
🗣️ He asks God this directly
📖 Honest prayer can sound this raw

## 🙈 Why Hidest Thou Thy Face From Me

"Hide thy face" is a common Old Testament idiom for withdrawn favor or silence.

It does not describe God literally covering his eyes.

A hidden face meant no visible blessing, protection, or response.

The psalmist feels this absence as sharply as any physical pain.

🙈 Hide thy face means withdrawn favor
🚫 Not a literal claim about God's eyes
🛡️ It meant no visible protection
📖 He feels this absence sharply

# Psalms 88:15-18
# 🌑 Darkness Is All That Is Left
---
## 🕰️ Afflicted And Ready To Die From My Youth Up

"From my youth up" means this suffering has lasted his whole life, not just recently.

"Ready to die" shows how close to death he has felt for a long time.

This is not a sudden crisis, it is a lifelong condition.

Long, unexplained suffering is one of the hardest experiences in scripture to sit with.

🕰️ From my youth up means lifelong
💔 Ready to die was a long feeling
📅 This is not a sudden crisis
📖 Scripture does not shy from this

## 😨 While I Suffer Thy Terrors I Am Distracted

"Terrors" pictures overwhelming dread, not a single scary moment.

"Distracted" here means something closer to confused or shaken apart inside.

The psalmist is describing a mind under real strain, not simple sadness.

Scripture does not flatten this kind of suffering into a quick lesson.

😨 Terrors means overwhelming dread
🌀 Distracted means shaken apart inside
🧠 This describes real mental strain
📖 Scripture does not rush past this

## 🌊 Thy Fierce Wrath Goeth Over Me

"Goeth over" repeats the picture from earlier of waves passing over him.

This time the focus is on how relentless the feeling is.

One wave of wrath does not finish before another one starts.

The psalmist feels overwhelmed, not just touched by difficulty.

🌊 Goeth over repeats the wave picture
🔁 One wave does not finish before the next
😵 He feels overwhelmed, not just touched
📖 This wears down more than his body

## ✂️ Thy Terrors Have Cut Me Off

This repeats the phrase "cut off" from earlier in the psalm, now caused by terrors.

Here it pictures being severed, like a branch cut away from a tree.

The mounting dread itself has become an enemy attacking him.

Fear this constant does not just feel bad, it actively wears a person down.

✂️ Cut off pictures being severed away
😰 Terrors themselves become the attacker
🌳 Like a branch cut from a tree
📖 Constant fear wears a person down

## 💧 They Came Round About Me Daily Like Water

This pictures his troubles surrounding him completely, from every side at once.

"Like water" suggests something that surrounds without ever staying still.

Think of standing in a rising flood with no dry ground anywhere near.

"Daily" means this was not one bad day, it kept happening again and again.

💧 Like water means surrounding on every side
🌊 It never stays still around him
📅 Daily means this kept happening
📖 There was no dry ground left

## ⭕ They Compassed Me About Together

This line restates the verse before it, a common move in Hebrew poetry.

"Compassed about" means completely surrounded, with no gap or opening.

"Together" adds that every trouble arrived at once, not one at a time.

The repeated pattern makes the feeling of being trapped even stronger.

⭕ This restates the line before it
🔁 Compassed about means fully surrounded
🧩 Together means every trouble at once
📖 Repetition makes the trap feel stronger

## 🫂 Lover And Friend Hast Thou Put Far From Me

"Lover" here likely means a close companion, not necessarily a spouse.

"Friend" adds anyone else the psalmist would have counted on for comfort.

Once again he says God is the one who pushed them away, not chance.

This is the same accusation from verse 8, now repeated at the very end.

🫂 Lover here means a close companion
👋 Friend means anyone he counted on
✋ He again blames God for the distance
📖 This repeats verse 8's accusation

## 🌑 Mine Acquaintance Into Darkness

This is the very last line of the psalm, and it never turns to hope.

Every other lament psalm eventually turns toward trust or praise before it ends.

Psalm 88 is the one psalm in the Bible that does not.

The psalmist is left with darkness as his closest remaining companion.

Scripture includes this kind of unresolved prayer on purpose, not by accident.

Even faith that stays in the dark is still real faith.

🌑 This is the psalm's very last line
🚫 Unlike other laments, it never turns to hope
📖 Psalm 88 is uniquely unresolved
➡️ Even faith in the dark is real faith
`.trim();

export const PSALMS_EIGHTY_EIGHT_PERSONAL_SECTIONS = parsePsalmsEightyEightRawNotes(PSALMS_EIGHTY_EIGHT_RAW_NOTES);
