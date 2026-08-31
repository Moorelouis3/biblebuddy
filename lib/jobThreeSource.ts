export type JobThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobThreeRawNotes(rawText: string): JobThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 3:${startVerse}` : `Job 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Job 3 sections, received " + sections.length);
  }

  return sections;
}

const JOB_THREE_RAW_NOTES = `# Job 3:1-6
# 🖤 Job Curses The Day He Was Born
---
## 😞 Cursed His Day

Job stayed silent for seven days after his suffering began.

Now he finally opens his mouth and speaks.

To curse his day means formally condemning the day he was born.

This is not casual complaining about a rough week.

It is the first extended speech Job gives in the entire book.

😞 Job breaks seven days of silence
🗣️ He formally curses his birth day
📜 First long speech in the book
📖 Grief has finally found words

## 🌒 Let The Day Perish Wherein I Was Born

Job wishes his own birthday had never existed at all.

Perish here means to vanish completely, as if it never happened.

He is not asking to die right now in this moment.

He is wishing his very existence could be erased from the start.

This is the deepest kind of despair a person can express.

🌒 Job wishes his birthday erased
💨 Perish means vanish completely
🚫 Not a wish to die now
📖 He wishes he never existed

## 👶 There Is A Man Child Conceived

In this culture, announcing a son's birth was a joyful public moment.

A man child meant a boy, prized for carrying on the family name.

Job pictures the exact announcement made the night he was conceived.

He wishes that joyful announcement had never been spoken.

👶 A man child means a son
🎉 Sons were announced with joy
🗣️ Job pictures that announcement
📖 He wishes it unsaid

## 🌑 Let Not God Regard It From Above

To regard something means to notice it and pay attention to it.

Job asks God to look away from this one day entirely.

He wants his birth day skipped over, as if God never saw it.

This is a startling request, asking the Creator to ignore a day He made.

🌑 Regard means notice and attend to
👁️ Job asks God to look away
📅 He wants the day skipped over
📖 A startling request of the Creator

## 💡 Let The Light Shine Upon It

Light in the Bible often stands for life, blessing, and God's favor.

Job asks that no such blessing ever touch this day.

He wants his birthday stripped of anything good, even ordinary daylight.

Every request in this passage pushes toward total erasure.

💡 Light often means life and blessing
🚫 Job wants no blessing on it
☀️ Even plain daylight is refused
📖 Every line pushes toward erasure

## 🌫️ Let Darkness And The Shadow Of Death Stain It

The shadow of death describes deep gloom, heavier than ordinary night.

Job piles up images of darkness to make his point unmistakable.

Stain here means to claim the day completely, covering it over.

He wants this day owned entirely by darkness and death.

🌫️ Shadow of death means deep gloom
🖤 Job piles up dark images
🎨 Stain means claim it completely
📖 He wants the day owned by death

## ☁️ Let A Cloud Dwell Upon It

Dwell means to live somewhere permanently, not just pass through.

Job wants a cloud to settle over his birthday and never leave.

A permanent cloud blocks any warmth or light from reaching it.

The image builds on the darkness already piled up in this section.

☁️ Dwell means to live there permanently
🌥️ A cloud settles and never leaves
🚫 It blocks all warmth and light
📖 The darkness keeps building

## 😱 Let The Blackness Of The Day Terrify It

Blackness here likely refers to a total eclipse or storm darkness.

Job wants the day itself to feel fear, as if it were alive.

Giving fear to a day is a striking poetic device.

He is speaking with the full force of his despair.

😱 Blackness may mean a total eclipse
🎭 Job gives the day human fear
✍️ This is powerful poetic language
📖 Despair drives the intensity here

## 🌌 Let Darkness Seize Upon It

The subject now shifts from the day to the night he was conceived.

Seize means to grab hold of something by force.

Job wants that night violently taken over by darkness.

His curse now covers both the day of birth and the night before it.

🌌 Focus shifts to the night
✊ Seize means grab by force
🌑 Job wants darkness to take it
📖 Both day and night are cursed

## 📅 Let It Not Be Joined Unto The Days Of The Year

Job wants that specific night erased from the calendar entirely.

Joined unto the days of the year means counted as part of the calendar.

He pictures the year itself refusing to include this one night.

This is Job's most extreme wish so far, to erase a day from time.

📅 Job wants the night uncounted
🗓️ Joined means included on the calendar
🚫 The year should skip this night
📖 His wish reaches to erase time itself

# Job 3:7-10
# 🌑 A Night Without Joy
---
## 🤐 Let That Night Be Solitary

Solitary means alone, without any companionship or new life added to it.

Job wants that night to produce nothing, especially no birth.

A night with no births would break the normal rhythm of a fruitful year.

He is asking for that one night to stand empty forever.

🤐 Solitary means alone, empty of life
🚫 Job wants no births that night
🔄 It would break a fruitful year's rhythm
📖 He wants it to stand empty

## 🎶 Let No Joyful Voice Come Therein

In this culture, a birth was often greeted with singing and shouting.

Job wants that joyful sound silenced completely for this one night.

Therein simply means within that night, nowhere else.

His request strips the night of the very sound that usually marks new life.

🎶 Births were greeted with joyful shouting
🤫 Job wants that sound silenced
📍 Therein means within that night
📖 He strips the night of new life's sound

## 😡 Let Them Curse It That Curse The Day

Some cultures had people believed to be skilled at cursing certain days.

Job calls on these professional cursers to target his birth night.

Many scholars believe this may reference those skilled at rousing Leviathan, the great sea creature.

Job is calling in the most feared curse he can imagine.

😡 Some believed certain people could curse days
🗣️ Job calls on these professional cursers
🐉 It may reference stirring up Leviathan
📖 He summons the most feared curse he knows

## 😭 Ready To Raise Up Their Mourning

To raise up mourning means stirring grief on purpose, almost like a skill.

These cursers were apparently able to summon sorrow or chaos at will.

Job wants their darkest power turned loose on his birth night.

His language grows more extreme with every line of this curse.

😭 Raise up mourning means stir grief
🎯 These cursers could summon sorrow at will
🌀 Job wants their power aimed at his birth
📖 His curse keeps growing more extreme

## ⭐ Let The Stars Of The Twilight Thereof Be Dark

Twilight here refers to the last visible light before full night.

Job wants even the faint evening stars blotted out.

Stars were the last small comfort of light left in the sky.

He wants every trace of light removed from that night, down to the last star.

⭐ Twilight means the last light before night
🌌 Job wants even faint stars darkened
✨ Stars were the sky's last comfort
📖 Every trace of light must go

## 🌅 Neither Let It See The Dawning Of The Day

Dawning means the sunrise, the moment night gives way to morning.

Job wants that specific night to never reach its own sunrise.

He pictures the night trapped in permanent darkness, never released into day.

This closes his wish that the night simply never end.

🌅 Dawning means the coming of sunrise
🚫 Job wants that night to never reach it
♾️ He pictures it trapped in permanent dark
📖 He wishes the night would never end

## 🚪 Because It Shut Not Up The Doors Of My Mother's Womb

Job now explains why he is cursing this night so harshly.

The doors of the womb is an old picture of the birth process itself.

He blames the night for allowing him to be born at all.

If the womb had simply stayed shut, none of his suffering would exist.

🚪 Doors of the womb pictures birth itself
😔 Job blames the night for his birth
🔒 He wishes the womb had stayed shut
📖 No birth would mean no suffering

# Job 3:11-16
# 😔 Why Did I Not Die At Birth
---
## ❓ Why Died I Not From The Womb

Job's questions now turn from cursing the night to questioning his own survival.

He asks why he did not die at the very moment of birth.

This is not a request for information, it is raw grief speaking.

Job is not claiming God caused his birth, he is simply venting the question.

❓ Job's focus shifts to his own survival
😢 He asks why he did not die young
🗯️ This is grief speaking, not a real question
📖 Raw pain drives every line here

## 💨 Why Did I Not Give Up The Ghost

To give up the ghost is an old way of saying to die.

Ghost here means breath or spirit, not a spooky figure.

Job wishes his very first breath had also been his last.

He is picturing death arriving before life ever truly began.

💨 Give up the ghost means to die
🌬️ Ghost here means breath or spirit
🍼 Job wishes his first breath was his last
📖 He pictures death arriving before life began

## 🤱 Why Did The Knees Prevent Me

Prevent in this old English usage means to come before or receive, not stop.

Some ancient customs involved a father or midwife placing a newborn on their knees.

This act formally welcomed the child into the family.

Job wishes that welcoming moment had simply never happened to him.

🤱 Prevent here means to receive, not stop
👐 Knees may picture a birth welcoming custom
👨‍👦 It formally welcomed a child into the family
📖 Job wishes that welcome never happened

## 🍼 Or Why The Breasts That I Should Suck

Job continues listing the ordinary steps of infancy he wishes he had skipped.

Nursing was the first basic act of survival after birth.

He is not just wishing for death, he is wishing away every early stage of life.

The list builds his case that nonexistence would have been kinder.

🍼 Nursing was the first act of survival
📋 Job lists every early stage of life
🚫 He wishes them all away
📖 Nonexistence felt kinder to him

## 😴 Then Had I Been At Rest

Rest here pictures the stillness of death, not a nap or vacation.

Job imagines that if he had died at birth, he would now be peacefully quiet.

He is contrasting that imagined peace with the pain he actually feels now.

For Job, death sounds like relief compared to his current suffering.

😴 Rest here pictures the stillness of death
🕊️ Job imagines dying at birth as peaceful
⚖️ He contrasts that peace with his real pain
📖 Death sounds like relief to him now

## 👑 With Kings And Counsellors Of The Earth

Job pictures the company he imagines he would keep in death.

Counsellors were trusted advisors to kings, powerful men in their own right.

In death, Job imagines resting alongside the most powerful people who ever lived.

Death here is pictured as a great equalizer, not a punishment.

👑 Job imagines resting among the powerful
🧑‍⚖️ Counsellors were trusted royal advisors
🕊️ Death would place him among great men
📖 Death equalizes rich and poor alike

## 🏛️ Which Built Desolate Places For Themselves

Desolate places likely refers to grand tombs and monuments, now lying in ruins.

Many ancient kings built massive structures meant to last forever, like pyramids.

Those monuments to power now sit empty and abandoned.

Job's point is that even the mightiest building projects end in silence.

🏛️ Desolate places likely means grand ruined tombs
👷 Kings built monuments meant to last forever
🏚️ Those monuments now sit empty
📖 Even the mightiest projects end in silence

## 💰 Or With Princes That Had Gold

Job adds another layer of the wealthy and powerful he imagines joining in death.

Princes with gold pictures rulers at the height of earthly success.

No amount of gold changes what eventually happens to everyone.

Job's argument is that death does not care how much a person owned.

💰 Princes with gold pictures earthly success
👑 These were rulers at their peak
⚰️ Gold changes nothing in the end
📖 Death does not care what a person owned

## 🕯️ As An Hidden Untimely Birth I Had Not Been

An untimely birth is an old term for a child who died before or at birth.

Job now wishes he had simply never existed at all, not even briefly.

Hidden suggests a birth quietly buried, without ceremony or attention.

This is the most extreme version of his wish so far.

🕯️ Untimely birth means a child lost early
🚫 Job wishes he never existed at all
🤫 Hidden suggests a quiet, unmarked burial
📖 This is his most extreme wish yet

## 🌘 As Infants Which Never Saw Light

Job pictures infants who died before ever opening their eyes to the world.

Never seeing light means never truly beginning a conscious life.

He envies their fate over his own long, painful existence.

To Job, never starting sounds better than starting and suffering this much.

🌘 These infants never opened their eyes
🔦 Never seeing light means never truly living
😔 Job envies their fate over his own
📖 Never starting feels better than his suffering

# Job 3:17-19
# ⚰️ Death Levels Everyone
---
## 🕊️ There The Wicked Cease From Troubling

Job now describes death as a place, using the word there repeatedly.

Cease means to stop completely, not just slow down.

He pictures death as the one place where evil people can no longer cause harm.

For Job, the grave becomes a place where injustice finally ends.

🕊️ There describes death as a place
🛑 Cease means to stop completely
😈 Evil people can no longer cause harm
📖 Injustice finally ends in the grave

## 🛌 There The Weary Be At Rest

Weary describes someone exhausted from a long, hard struggle in life.

Job includes himself in this picture, since he is deeply weary right now.

Rest here again pictures the stillness of death, not sleep.

He sees death as the end of exhaustion, not just of life.

🛌 Weary means exhausted from a long struggle
🙋 Job includes himself in this picture
😴 Rest again means the stillness of death
📖 Death ends exhaustion, not just life

## ⛓️ There The Prisoners Rest Together

Job widens his picture of death to include prisoners as well.

In life, prisoners were forced into hard labor with no relief.

He imagines them finally resting together, side by side, in death.

Death here removes every chain and every task.

⛓️ Job includes prisoners in this picture
🔨 Prisoners faced forced labor in life
🤝 They finally rest together in death
📖 Death removes every chain and task

## 🔇 They Hear Not The Voice Of The Oppressor

An oppressor is someone who cruelly commands and controls another person.

In life, prisoners had to constantly obey a harsh commanding voice.

Job pictures death as the place that finally silences that voice for good.

Silence becomes a form of mercy in this picture.

🔇 Oppressor means a cruel, commanding master
👂 Prisoners once had to obey that voice
🤐 Death finally silences it
📖 Silence becomes a form of mercy

## 👥 The Small And Great Are There

Small and great is an old way of saying the poor and the powerful.

Job's list keeps expanding to include every level of society.

Death does not sort people by rank, wealth, or importance.

Everyone Job describes ends up in the exact same place.

👥 Small and great means poor and powerful
📈 Job's list covers every level of society
⚖️ Death does not sort by rank or wealth
📖 Everyone ends up in the same place

## 🔓 The Servant Is Free From His Master

A servant in this culture was bound to obey a master's every command.

That bond lasted for the servant's entire working life, with no exception.

Job pictures death as the one event that finally breaks that bond.

Death becomes the great equalizer running through this entire section.

🔓 Servants were bound to obey a master
⛓️ That bond lasted their whole working life
💔 Death finally breaks that bond
📖 Death equalizes servant and master alike

# Job 3:20-23
# ❓ Why Give Light To The Miserable
---
## 💡 Wherefore Is Light Given To Him That Is In Misery

Job shifts from describing death to questioning why life continues at all.

Light here again stands for life itself, not just physical daylight.

He asks why God allows someone in deep misery to keep living.

This is the turning point where Job's grief becomes an open question to God.

💡 Light again stands for life itself
❓ Job asks why misery gets to keep living
🔄 His focus shifts from death to this question
📖 Grief becomes an open question to God

## 💔 Life Unto The Bitter In Soul

Bitter in soul describes someone whose inner life has turned to deep pain.

Job is describing his own condition here, not a stranger's.

He questions why life is given at all to someone in this much pain.

The question is aimed at God, even without naming Him directly in this line.

💔 Bitter in soul means deep inner pain
🙋 Job describes his own condition here
❓ He questions why such life continues
📖 The question is aimed at God

## ⏳ Which Long For Death, But It Cometh Not

Long for means to deeply desire or wait for something.

Job admits he wants to die, but death has not come for him.

This is one of the most honest and painful lines in the whole book.

Job is not being punished for saying this, he is simply being truthful.

⏳ Long for means deeply desire
💀 Job admits he wants to die
🗣️ This is one of his most honest lines
📖 Honesty, not sin, drives this confession

## ⛏️ Dig For It More Than For Hid Treasures

Job compares his desire for death to a desperate search for buried treasure.

Digging for hidden treasure was slow, hard, and driven by hope of reward.

Job says he would work that hard, and more, just to find death.

The image shows just how deeply Job longs for his suffering to end.

⛏️ Job compares his desire to a treasure hunt
💎 Buried treasure took slow, hard digging
😢 He would work even harder to find death
📖 The image shows the depth of his longing

## 🪦 When They Can Find The Grave

Job describes people who feel real joy the moment death finally arrives.

Rejoice exceedingly means an overwhelming, almost celebratory relief.

For Job, the grave has become something to hope for, not fear.

This shows how completely his suffering has reversed normal human instincts.

🪦 The grave becomes a source of hope
🎉 Rejoice exceedingly means overwhelming relief
🔄 Job's suffering reverses normal instincts
📖 The grave is hoped for, not feared

## 🌀 A Man Whose Way Is Hid

Way here means the direction and purpose of a person's life.

Job feels he cannot see where his life is going or why any of this is happening.

Hid means hidden, blocked from view, unclear.

This confusion is part of what makes his suffering so hard to bear.

🌀 Way means the direction of a life
🙈 Job cannot see where his life is going
❓ Hid means hidden and unclear
📖 The confusion deepens his suffering

## 🧱 Whom God Hath Hedged In

A hedge in this culture was a protective wall of thorny bushes around a field.

Back in chapter one, Satan complained that God had hedged Job in for protection.

Job now uses the same word, but feels trapped instead of protected.

The very thing that once kept him safe now feels like a prison wall.

🧱 A hedge was a protective thorny wall
🔁 Satan used this same word in chapter one
🔒 Job now feels trapped by it
📖 Protection now feels like a prison

# Job 3:24-26
# 😢 Job's Fear Has Come True
---
## 🍽️ My Sighing Cometh Before I Eat

Sighing here pictures constant, heavy groaning throughout the day.

Job says this grief now happens before he even eats his meals.

His pain has become the very first thing he feels each day.

Even the most basic routines of life are now shaped by sorrow.

🍽️ Sighing means constant, heavy groaning
🌅 It happens before he even eats
😔 Pain is now his first feeling each day
📖 Sorrow now shapes his most basic routines

## 🌊 My Roarings Are Poured Out Like The Waters

Roarings describes loud, uncontrollable cries of pain, not quiet weeping.

Job compares this sound to water pouring out without stopping.

The comparison shows grief he cannot hold back or control.

His suffering has become as constant and unstoppable as flowing water.

🌊 Roarings means loud, uncontrollable cries
💧 Job compares them to pouring water
🚫 He cannot hold back or control it
📖 His grief flows as constantly as water

## 😨 The Thing Which I Greatly Feared Is Come Upon Me

Job admits he lived with a quiet fear even before his suffering began.

That deep, private fear has now become his actual reality.

This line reveals Job was not a man free from worry before this.

His worst imagined outcome has now truly happened to him.

😨 Job admits a fear from before this
💭 That private fear is now his reality
😟 He was not free from worry before
📖 His worst fear has truly happened

## 🚨 I Was Not In Safety, Neither Had I Rest

Job closes the chapter by summarizing his condition in plain terms.

Safety and rest were both things he lacked even before his losses.

This suggests Job carried real anxiety underneath his earlier blessed life.

His outward peace did not mean his inner life was free of worry.

🚨 Job summarizes his condition plainly
🛡️ He lacked safety even before his losses
😰 He carried anxiety under his blessed life
📖 Outward peace did not mean inner peace

## 🌪️ Neither Was I Quiet, Yet Trouble Came

Job says he was not even calm before, and still trouble found him.

This final line removes any idea that Job somehow invited his suffering.

Trouble arrived regardless of how he was living or feeling.

The chapter ends with Job's raw honesty hanging in the air, unresolved.

🌪️ Job says he was not even calm
🚫 He did not invite his suffering
⚡ Trouble arrived regardless of his state
📖 The chapter ends unresolved, in raw honesty
`.trim();

export const JOB_THREE_PERSONAL_SECTIONS = parseJobThreeRawNotes(JOB_THREE_RAW_NOTES);
