export type JobFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobFourRawNotes(rawText: string): JobFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 4:${startVerse}` : `Job 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Job 4 sections, received " + sections.length);
  }

  return sections;
}

const JOB_FOUR_RAW_NOTES = `# Job 4:1-6
# 🗣️ Eliphaz Speaks First
---
## 😐 Eliphaz The Temanite Answered

Eliphaz is the first of Job's three friends to speak.

He is likely the oldest, since he speaks first and is named first in every list.

Temanite means he came from Teman, a city in Edom known for its wise men.

His hometown alone told the ancient reader to expect careful, respected wisdom.

😐 Eliphaz speaks first among the friends
👴 He is likely the oldest of the three
🏙️ Teman was an Edomite city known for wisdom
📖 The reader expects a wise, careful answer

## 🤔 If We Assay To Commune With Thee

Assay means to attempt or try something carefully.

Commune means to speak openly, sharing real thoughts, not small talk.

Eliphaz is asking permission before he even begins.

He knows he is about to say something hard to hear.

🤔 Assay means to carefully attempt
🗨️ Commune means to speak openly
🙏 Eliphaz asks permission first
📖 He knows hard words are coming

## 😤 Who Can Withhold Himself From Speaking

Withhold means to hold back or refuse to do something.

Eliphaz admits he cannot stay silent any longer.

He has watched Job suffer and feels compelled to respond.

This sets up a speech that means well but will still wound Job deeply.

😤 Withhold means to hold back
🗣️ Eliphaz cannot stay silent
👀 He has watched Job's suffering closely
📖 Good intentions will still cause pain

## 👨‍🏫 Thou Hast Instructed Many

Instructed means taught or trained, the way a teacher trains students.

Eliphaz reminds Job of his old reputation as a wise counselor.

People used to come to Job for guidance, not the other way around.

This is the first step in Eliphaz's argument, built on Job's own past words.

👨‍🏫 Instructed means taught or trained
🎓 Job had a reputation as a wise counselor
🔄 People once came to him for help
📖 Eliphaz builds his case on Job's own past

## 💪 Strengthened The Weak Hands

Weak hands is an old picture of people who have lost the strength to keep going.

To strengthen their hands means to encourage and steady someone who is failing.

Job used to be the one who lifted others out of despair.

Eliphaz is about to ask if that same wisdom can help Job now.

💪 Weak hands means people losing strength
🙌 Job used to steady the discouraged
🔄 He lifted others out of despair
📖 Eliphaz wonders if it can help him now

## 🦵 Strengthened The Feeble Knees

Feeble knees describes legs that are shaking and about to give way from fear.

In this culture, trembling knees were a common picture of terror or collapse.

Job's words used to hold people up when their courage failed them.

Eliphaz is laying the groundwork to turn this praise into a pointed question.

🦵 Feeble knees means legs shaking with fear
😰 Trembling knees pictured terror or collapse
🙌 Job's words once held people steady
📖 Eliphaz is setting up a pointed question

# Job 4:7-11
# 🦁 Eliphaz's Theory Of Justice
---
## ❓ Now It Is Come Upon Thee, And Thou Faintest

The word now marks a sharp turn in Eliphaz's speech.

Faintest means to grow weak, weary, and discouraged.

Eliphaz points out that the man who strengthened others now cannot strengthen himself.

The comfort he once offered easily now seems far harder to reach for.

❓ Now marks a sharp turn in the speech
😩 Faintest means to grow weak and weary
🔄 The comforter cannot comfort himself
📖 His advice is harder to reach for now

## 🙏 Is Not This Thy Fear, Thy Confidence

Fear here means reverence for God, not being afraid of Him.

Eliphaz is asking whether Job's faith itself should be his source of strength.

On the surface this sounds encouraging, almost like a reminder to trust God.

Underneath, it quietly questions whether Job's faith was ever as solid as it looked.

🙏 Fear here means reverence for God
💪 Eliphaz asks if faith is Job's strength
😊 It sounds encouraging on the surface
📖 It quietly questions how solid that faith was

## ⚖️ Who Ever Perished, Being Innocent

Perished means to be destroyed completely, not simply to die of old age.

Eliphaz states his core belief here for the first time.

He believes truly innocent people are never wiped out by disaster.

This idea will drive nearly everything Eliphaz says for the rest of the book.

⚖️ Perished means destroyed completely
💭 Eliphaz states his core belief here
🚫 He thinks the innocent are never wiped out
📖 This idea shapes his whole argument

## 🌾 Where Were The Righteous Cut Off

Cut off means removed or killed, often used for a family line ending.

This restates the same claim as the line before it in different words.

Hebrew poetry often repeats one idea twice using two different pictures.

Both lines together insist that real disaster only strikes the truly guilty.

🌾 Cut off means removed or killed
🔁 It restates the claim in different words
📜 Hebrew poetry often repeats ideas this way
📖 Both lines claim disaster strikes only the guilty

## 🌱 They That Plow Iniquity, And Sow Wickedness

Plow and sow are both farming terms for preparing ground and planting seed.

Eliphaz compares sin to a crop a person deliberately plants.

Iniquity means deliberate wrongdoing, not an accident or a mistake.

The picture makes sin sound like a choice with a predictable outcome.

🌱 Plow and sow are farming terms
🌾 Eliphaz compares sin to a planted crop
😈 Iniquity means deliberate wrongdoing
📖 Sin becomes a choice with a predictable result

## 🌽 Reap The Same

Reap means to gather the harvest that a planted crop produces.

Eliphaz's point is simple, whatever a person plants, that is what grows back.

He is arguing that suffering is always the harvest of some earlier sin.

This exact idea is what Job's story will eventually prove is not always true.

🌽 Reap means to gather the harvest
🌾 Whatever is planted is what grows back
😔 Eliphaz ties suffering to earlier sin
📖 Job's story will prove this is not true

# Job 4:12-16
# 👻 A Vision In The Night
---
## 🤫 A Thing Was Secretly Brought To Me

Eliphaz shifts from an argument to a personal story.

Secretly here means privately, in a way meant just for him.

He claims to have received a private message beyond ordinary human wisdom.

This is meant to give his next words extra weight and authority.

🤫 Eliphaz shifts to a personal story
🔒 Secretly means privately, just for him
📩 He claims a private, unusual message
📖 It adds authority to his coming words

## 🌙 In Thoughts From The Visions Of The Night

Visions of the night refers to a dream, not a waking experience.

In this culture, many believed dreams could carry real messages from God or the spirit world.

Eliphaz frames his experience as something that happened while he was asleep.

The setting is meant to sound mysterious and beyond ordinary explanation.

🌙 Visions of the night means a dream
💭 Dreams were believed to carry real messages
😴 Eliphaz says this happened while asleep
📖 The setting sounds mysterious on purpose

## 😨 Fear Came Upon Me, And Trembling

Trembling here describes an uncontrollable physical shaking from fear.

In the Bible, sudden terror often marks an encounter with something supernatural.

Eliphaz describes his own body reacting before he even understands what is happening.

His fear is meant to convince Job this experience was real and not imagined.

😨 Trembling means uncontrollable shaking
✨ Sudden terror often marks the supernatural
😳 His body reacts before he understands why
📖 The fear is meant to prove it real

## 👤 A Spirit Passed Before My Face

The text never says clearly whether this spirit was good, evil, an angel, or something else.

That uncertainty is likely intentional, since the whole experience feels unclear even to Eliphaz.

Passed before my face means it moved directly in front of him.

The vagueness leaves the reader almost as unsettled as Eliphaz claims to be.

👤 The spirit's nature is never explained
❓ The uncertainty seems intentional
👁️ It passed directly in front of him
📖 The vagueness unsettles the reader too

## 🥶 The Hair Of My Flesh Stood Up

This phrase describes the physical sensation of goosebumps rising from fear.

It is one of the oldest ways in any language to describe sudden terror.

Eliphaz uses this detail to make his story feel vivid and believable.

Every detail so far builds toward the message the vision is about to deliver.

🥶 This phrase describes goosebumps from fear
📜 It is an old way to describe terror
🎯 The detail makes the story feel vivid
📖 It all builds toward the coming message

## 🔇 There Was Silence, And I Heard A Voice

This line is a striking contrast, describing silence and a voice in the same breath.

It likely means the surrounding world went completely still before the voice spoke.

That kind of silence often marks a sacred or unusual moment in scripture.

The stage is now fully set for the vision's actual message.

🔇 Silence and voice appear together
🌍 The world likely went completely still
✨ Such silence often marks a sacred moment
📖 The stage is set for the message

# Job 4:17-21
# 🏺 Fragile As Clay
---
## ⚖️ Shall Mortal Man Be More Just Than God

Mortal means a human being who will eventually die, unlike God.

Just means morally right or righteous in judgment.

The vision's question is actually true on its own, no human is more righteous than God.

The danger comes later, in how Eliphaz will wrongly apply this true idea to Job.

⚖️ Mortal means a human who will die
✅ Just means morally right in judgment
📖 The question itself is true
➡️ Eliphaz will misapply it to Job

## 😇 He Put No Trust In His Servants

Servants here likely refers to angels, God's heavenly attendants.

The vision claims that even angels are not perfectly trustworthy compared to God.

This raises the bar impossibly high before ever mentioning human beings at all.

If angels fall short of God's standard, the argument builds toward humans falling far shorter.

😇 Servants here likely means angels
📉 Even angels fall short of God's standard
📈 The bar is raised before humans are mentioned
📖 Humans will be shown to fall far shorter

## 🌀 His Angels He Charged With Folly

Charged with folly means accused of foolishness or moral failure.

This is a startling claim, since angels were considered nearly perfect beings.

The vision uses this shocking comparison to make its next point land even harder.

If even angels can be charged with folly, no human stands on solid ground.

🌀 Charged with folly means accused of foolishness
😮 This is a shocking claim about angels
📊 It sets up an even harder comparison
📖 No human stands on solid ground after this

## 🏺 Houses Of Clay

Houses of clay is a picture of the human body, fragile like a mud brick structure.

Ancient homes were often built from sun dried clay or mud brick, easily damaged.

The image reminds the reader how easily a human life can be broken or destroyed.

Unlike God, whose dwelling is unshakable, a human body is temporary and weak.

🏺 Houses of clay pictures the human body
🧱 Ancient homes were often made of mud brick
💔 It shows how easily a life can break
📖 Human bodies are temporary, unlike God

## 🦋 Crushed Before The Moth

This line says human bodies can be crushed by something as small and weak as a moth.

A moth is one of the smallest, most fragile creatures a person would encounter.

The comparison is meant to feel almost absurd, showing how fragile people truly are.

Eliphaz is building toward the idea that no one, including Job, is truly secure.

🦋 A moth is tiny and fragile
😲 The comparison feels almost absurd
🍃 It shows how fragile people truly are
📖 No one is as secure as they assume

## ⏳ Destroyed From Morning To Evening

This phrase says a human life can end within the space of a single day.

There is no promise of a long life or a slow, expected decline.

The vision emphasizes just how suddenly everything can be taken away.

This detail would have struck especially close to Job, whose losses came in a single day.

⏳ A life can end within one day
🚫 No promise of a slow decline is given
⚡ Everything can be taken away suddenly
📖 This detail echoes Job's own sudden losses

## 🕳️ They Perish For Ever Without Any Regarding It

Regarding means noticing or paying attention to something.

This line claims that most people die and are quickly forgotten by everyone else.

It paints a bleak picture of human life as brief and ultimately unnoticed.

Eliphaz is using this vision to humble Job before he continues his main argument.

🕳️ Regarding means noticing or paying attention
😔 Most people are quickly forgotten
📉 Life is painted as brief and unnoticed
📖 Eliphaz uses this to humble Job

## 👑 Their Excellency Which Is In Them Goeth Away

Excellency here means a person's dignity, greatness, or standing in life.

Goeth away means it fades and disappears, taken away at death.

Even someone with a great reputation loses all of it in the end.

The line reduces every human achievement to something ultimately temporary.

👑 Excellency means dignity or greatness
💨 Goeth away means it fades at death
📉 Even great reputations disappear
📖 Every achievement is ultimately temporary

## 🕯️ They Die, Even Without Wisdom

This closing line can mean people die without ever truly gaining understanding.

It leaves an unsettling note hanging over the whole vision, with no clear resolution offered.

Eliphaz stops here, letting the vision's weight sit heavy before he continues speaking.

The chapter closes not with comfort, but with a picture of how small and fragile Job truly is.

🕯️ People may die without true understanding
😶 The vision ends with no resolution
⚖️ Eliphaz lets the weight sit heavy
📖 The chapter closes on human smallness
`.trim();

export const JOB_FOUR_PERSONAL_SECTIONS = parseJobFourRawNotes(JOB_FOUR_RAW_NOTES);
