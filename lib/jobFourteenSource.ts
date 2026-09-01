export type JobFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobFourteenRawNotes(rawText: string): JobFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 14:${startVerse}` : `Job 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Job 14 sections, received " + sections.length);
  }

  return sections;
}

const JOB_FOURTEEN_RAW_NOTES = `# Job 14:1-3
# 😔 Man's Few And Trouble Filled Days
---
## 👤 Man That Is Born Of A Woman

Job is describing every human being who has ever lived.

The phrase does not point to himself alone.

It states a plain fact about the whole human race.

Being born of a woman simply means being human, nothing more.

👤 Every human being is included here
🌍 Job speaks about the whole human race
📜 Being born makes a person fully mortal
📖 Job begins with a fact everyone shares

## ⏳ Of Few Days, And Full Of Trouble

This phrase sums up the whole of human life in one line.

A lifetime looks short and painful from where Job stands.

Job is not only speaking about himself here.

He is naming the condition every person is born into.

⏳ Few days means a short lifetime
😢 Full of trouble means constant hardship
🧍 Job names the human condition itself
📖 Life is short and heavy with pain

## 🌸 He Cometh Forth Like A Flower, And Is Cut Down

Cometh forth means to spring up or bloom quickly.

Wildflowers in a hot climate bloom fast and fade just as fast.

Job compares a human life to that same short bloom.

Neither the flower nor the person gets to choose when the cutting comes.

🌸 Cometh forth means springs up quickly
🔥 Wildflowers there bloomed and faded fast
✂️ Cut down pictures a sudden ending
📖 A life can end just as fast

## 🌗 He Fleeth Also As A Shadow, And Continueth Not

Continueth means to remain or stay in place.

A shadow never stays still.

It moves and vanishes as the light changes.

Job compares his own life to that same passing shadow.

Nothing about a shadow can be held onto or kept.

🌗 Continueth means to remain or stay
🏃 A shadow keeps moving and never lasts
👤 Job compares his life to a shadow
📖 Human life passes by just as fast

## 👁️ Dost Thou Open Thine Eyes Upon Such An One

This does not describe God glancing at Job by accident.

Open thine eyes means to fix a close, searching gaze on someone.

Job is asking why God would examine someone this fragile so closely.

A flower and a shadow do not usually get watched this hard.

👁️ Open thine eyes means a close, searching look
🤔 Job questions why God watches him so closely
🌸 He compares himself to a flower and shadow
➡️ Job feels examined far more than he expected

## ⚖️ Bringest Me Into Judgment With Thee

Job feels he has been dragged into a courtroom he never asked to enter.

Judgment here means a formal legal case, not a passing opinion.

Job feels he is on trial before the one being he cannot argue with as an equal.

This tension shapes the tone of the rest of the chapter.

⚖️ Judgment means a formal legal case
😟 Job feels put on trial by God
🧑‍⚖️ He cannot argue with God as an equal
📖 This tension shapes the rest of the chapter

# Job 14:4-6
# 📏 No One Is Clean And Days Are Numbered
---
## ❓ Who Can Bring A Clean Thing Out Of An Unclean

This is a rhetorical question with an obvious answer, nobody can.

Job is talking about being born naturally impure or sinful.

Something impure cannot produce something pure on its own.

Job is arguing that his own flawed nature is not fully his fault.

❓ This question expects the answer, no one
🧼 Clean and unclean describe moral purity here
🌱 An impure source cannot produce a pure result
📖 Job points to inherited human sinfulness

## 📏 His Days Are Determined

Determined means already fixed or decided in advance.

Job says the length of a person's life is set by God ahead of time.

No one can add extra days once that number is set.

This is not a comforting thought for Job.

It feels like a trap instead.

📏 Determined means already fixed in advance
⏳ God sets each life's length in advance
🔒 No extra days can be added later
📖 Job feels boxed in by that limit

## 📆 The Number Of His Months Are With Thee

With thee means God alone holds and keeps this count.

Job pictures God as the one who tracks every month of a life.

No human being can see or change that number.

Only God knows exactly how long anyone has left.

📆 With thee means God alone holds the count
🗓️ Every month of life is tracked by God
🙈 No human can see that number
📖 Only God knows how long anyone has left

## 🚧 Thou Hast Appointed His Bounds That He Cannot Pass

Bounds means a fixed limit or boundary, like a fence line.

God has set an edge on every human life that cannot be crossed.

No effort, wealth, or wisdom can push past that appointed edge.

Job states this as settled fact, not as something up for debate.

🚧 Bounds means a fixed limit or boundary
🧱 God sets that limit for every life
💪 No effort can push past that edge
📖 Job treats this limit as settled fact

## 🙏 Turn From Him, That He May Rest

Job is asking God to look away from him for now.

He does not want to escape God forever, only to get some relief.

Constant divine attention feels heavy and exhausting to Job right now.

He simply wants a break from being watched so closely.

🙏 Job asks God to look away for now
😮‍💨 He wants relief, not permanent escape
👀 Constant attention feels heavy to Job
📖 He is asking for a short rest

## 👷 As An Hireling, His Day

A hireling is a hired worker who is paid for each day of labor.

Think of a laborer who counts down the hours until quitting time.

That worker's day has a clear beginning and a clear end.

Job compares his own life to that same countable, limited stretch of time.

👷 Hireling means a hired day laborer
⏰ A hired day has a clear end
🧾 Job compares his life to a paid shift
📖 His time is limited, like a workday

# Job 14:7-9
# 🌳 Even A Cut Tree Can Sprout Again
---
## 🌳 There Is Hope Of A Tree

Job shifts to a new picture, a tree that gets cut down.

Unlike a person, a felled tree is not automatically finished.

Job sets this up as a real possibility for hope, not a certainty yet.

The next few verses explain exactly how that hope works.

🌳 Job introduces a new picture, a tree
✂️ A cut tree is not automatically finished
🌱 This sets up a real possibility of hope
📖 The next lines explain how that hope works

## 🌿 The Tender Branch Thereof Will Not Cease

A tender branch is a young, soft new shoot of growth.

Will not cease means the growth will not stop or run out.

Even after being cut, the tree keeps sending out fresh shoots.

The tree's life is not tied to just one trunk or branch.

🌿 Tender branch means a young new shoot
🔄 Will not cease means the growth keeps going
🪓 Cutting the tree does not end its life
📖 New growth keeps appearing after the cut

## 🌱 Though The Root Thereof Wax Old In The Earth

Wax old means to grow old or age over time.

Job pictures the root system slowly aging underground, out of sight.

Even an aging root can still hold enough life to try again.

Age alone does not automatically end the tree's ability to grow.

🌱 Wax old means to grow old
🌍 The root ages slowly, out of sight
💪 An old root can still hold life
📖 Age alone does not end its chance

## 🪵 The Stock Thereof Die In The Ground

Stock means the leftover stump or trunk left after a tree is cut.

From the outside, that stump can look completely dead.

Job admits it can even seem to die fully in the ground.

Yet the next verse shows that appearance is not the whole story.

🪵 Stock means the leftover stump or trunk
💀 A stump can look completely dead
👀 It may even seem to die fully
➡️ The next verse tells a different story

## 💧 Through The Scent Of Water It Will Bud

Scent of water describes even the faintest trace of moisture reaching the roots.

It does not take a flood, just the smallest hint of water.

Travelers in that region had seen dead looking stumps bud again after rain.

A tiny bit of water can restart a life that looked completely finished.

💧 Scent of water means a trace of moisture
🌧️ It does not take a flood to work
👣 People had seen dead stumps bud again
📖 A small amount of water can restart life

## 🌳 Bring Forth Boughs Like A Plant

Boughs are the larger branches of a tree.

Job says the once dead looking stump grows branches again, like a new plant.

The whole picture is one of full, real recovery, not a small twitch of life.

This tree image is the strongest hope Job can find anywhere in nature.

🌳 Boughs means the tree's larger branches
🌱 The stump grows back like a new plant
🔁 This pictures full recovery, not a small twitch
📖 Nature offers Job his strongest image of hope

# Job 14:10-12
# 🍂 Man Does Not Return Like The Tree
---
## 🔀 But Man Dieth, And Wasteth Away

The word but marks a hard turn away from the tree's hopeful picture.

A tree can recover from being cut down.

A human being cannot recover from death the same way.

Job draws this contrast on purpose, not by accident.

🔀 But signals a sharp turn in the argument
🌳 A tree can recover from being cut
🧍 A person cannot recover the same way
📖 Job draws this contrast on purpose

## 💨 Man Giveth Up The Ghost, And Where Is He

Giveth up the ghost is an old way of saying someone breathes their last breath and dies.

"Where is he" is not really a question expecting an answer.

It expresses that the person seems to simply vanish from the world.

Job is naming how final and untraceable death feels to him.

💨 Giveth up the ghost means breathes his last
❓ Where is he expresses sudden absence
👻 The person seems to vanish completely
📖 Death feels final and untraceable to Job

## 🏜️ As The Waters Fail From The Sea

Fail here means to dry up or run out completely.

Job is likely picturing an inland sea or large lake shrinking in a drought.

People in that region had watched bodies of water disappear like this before.

Job uses something they had actually witnessed to describe death.

🏜️ Fail means to dry up completely
🌊 Job pictures a sea or lake shrinking
👁️ People had witnessed this kind of drought
📖 Job uses a familiar sight to describe death

## 🌊 The Flood Decayeth And Drieth Up

Flood in this verse means a river or flowing body of water, not the flood of Noah.

Decayeth means it wastes away or breaks down over time.

Even a strong, flowing river can eventually dry up completely.

Job repeats the picture to make the point land harder.

🌊 Flood here means a river, not Noah's flood
📉 Decayeth means it wastes away over time
💧 A flowing river can still dry up
📖 Job repeats the image to drive it home

## 🔄 So Man Lieth Down, And Riseth Not

This reverses the picture Job just built about the tree.

The tree could rise again after a little water.

Job sees no such rising for a man.

He states this fact without softening it.

🔄 This reverses the earlier tree picture
🌳 The tree could rise again after water
🧍 Job sees no such rising for man
📖 This is grief, not comfort

## 🌌 Till The Heavens Be No More, They Shall Not Awake

This does not mean Job believed there was zero chance of any future resurrection.

Job is describing how death feels to human eyes.

As long as the heavens continue exactly as they are, Job sees no return.

Job wrestles with this honestly instead of forcing a neat answer.

🌌 This is not a final theological claim
👁️ Job speaks from what he can observe
⏳ He sees no return within his lifetime
📖 Job wrestles honestly instead of forcing an answer

# Job 14:13-15
# 🙏 Job's Desperate Prayer For Later
---
## 🙏 O That Thou Wouldest Hide Me In The Grave

This is not a wish to die out of despair alone.

Job is asking God to hide him safely away for now.

He pictures the grave as a temporary shelter, not a final end here.

This is closer to a desperate prayer than a hopeless one.

🙏 Job is praying, not simply despairing
🛡️ He pictures the grave as a shelter
⏳ He imagines this as temporary, not final
📖 This is a desperate prayer, not surrender

## 🫥 That Thou Wouldest Keep Me Secret

Keep me secret means to hide Job away where trouble cannot reach him.

Job wants to be tucked out of sight until danger has passed.

This request pictures God as a protector, not only as a judge.

Job still trusts God enough to ask for shelter from Him.

🫥 Keep me secret means hide me away
⛈️ Job wants shelter from present trouble
🛡️ He still sees God as a protector
📖 Job trusts God even in his pain

## 🔥 Until Thy Wrath Be Past

Job believes his suffering is connected to God's wrath somehow.

Wrath here means strong anger or judgment, not a passing bad mood.

Job is not certain why this wrath has come, only that it feels real to him.

He hopes for a future point when it will finally lift.

🔥 Wrath means strong anger or judgment
❓ Job is unsure why it fell on him
⏳ He hopes it will eventually pass
📖 Job holds onto hope even in confusion

## 📅 Thou Wouldest Appoint Me A Set Time

Appoint means to set or fix in advance, the same word used earlier for his days.

Job is now asking for a new appointed time, one on the other side of death.

He wants God to set a moment when this hiding will end.

This shows Job is not asking to disappear forever.

📅 Appoint means to set a moment in advance
🔁 Job echoes the same word from earlier
⏰ He wants a clear end point
📖 Job is not asking to disappear forever

## 🧠 And Remember Me

Job is afraid of being forgotten completely, not just of dying.

Remember here means to actively keep someone in mind and care for them.

Job wants God to still know his name after the grave.

This one small request carries most of the chapter's hope.

🧠 Remember means to actively keep in mind
😟 Job fears being forgotten, not just dying
🙏 He wants God to still know him
📖 This request carries the chapter's hope

## ❓ If A Man Die, Shall He Live Again

This is one of the most important questions in the whole book of Job.

Job is not stating a firm belief here.

He is asking a real, open question instead.

He does not yet have a clear answer to hold onto.

The rest of the Bible answers this question far more fully than Job could.

❓ Job asks a real, open question
📖 He has no firm answer yet
🌱 This plants an idea about life after death
➡️ Later scripture answers this more fully

## ⏳ All The Days Of My Appointed Time Will I Wait

Job decides to keep waiting instead of giving up.

Appointed time points back to the fixed length of life mentioned earlier.

Job commits to waiting through whatever time he has left.

Waiting itself becomes an act of faith here, not passive giving up.

⏳ Job chooses to wait, not quit
🔁 Appointed time echoes his earlier words
💪 He commits to waiting it out
📖 Waiting becomes an act of faith

## 🔄 Till My Change Come

Change here likely points to death itself, or to some shift after death.

Job does not fully explain what this change will look like.

He simply trusts that some kind of change is still coming for him.

This word plants a seed of hope without forcing a complete answer.

🔄 Change likely points to death or beyond
❓ Job does not explain it fully
🌱 He trusts some real change is coming
📖 This plants hope without a full answer

## 📣 Thou Shalt Call, And I Will Answer Thee

Job imagines a future conversation between himself and God.

God calls out, and Job answers back, like two people reunited.

This pictures a relationship continuing, not simply ending in silence.

Job longs for contact with God to continue past death.

📣 Job pictures God calling out to him
🗣️ He imagines himself answering back
🤝 This pictures a relationship continuing
📖 Job longs for contact beyond death

## 🖐️ Thou Wilt Have A Desire To The Work Of Thine Hands

The work of thine hands refers to Job himself, since God made him.

Job hopes God will still want him, the way a craftsman still cares about something they made.

This ends the section on a note of hope instead of despair.

Job moves from fear of being forgotten to trust that God still wants him.

🖐️ The work of thine hands means Job himself
🛠️ God is pictured as the maker
❤️ Job hopes God still wants him
📖 The section ends on hope, not despair

# Job 14:16-17
# 🔍 God Watches Every Step And Sin
---
## 👣 For Now Thou Numberest My Steps

Numberest my steps means God is tracking Job's every single move.

This is not a comforting kind of attention to Job right now.

Job feels watched constantly, almost like he is under surveillance.

The closeness Job longed for earlier now feels like pressure instead.

👣 Numberest my steps means tracking every move
👀 Job feels watched constantly right now
😟 This attention feels like pressure, not comfort
📖 Closeness can feel like relief or pressure

## ❓ Dost Thou Not Watch Over My Sin

This is not Job admitting to some hidden secret sin.

Job is voicing a fear, not confessing a specific wrongdoing.

He feels like every flaw he has is being closely inspected.

Job is describing the pressure of feeling constantly judged.

❓ This is a fear, not a confession
🔬 Job feels every flaw is inspected
⚖️ He feels constantly judged
📖 Job names the pressure of feeling watched

## 👜 My Transgression Is Sealed Up In A Bag

People in the ancient world sealed valuable items in a bag to keep them safe.

Job pictures his sins being kept that same way, sealed and preserved.

This means nothing Job has done wrong seems to be forgotten or lost.

Job feels like his failures are being carefully kept on record.

👜 Sealing a bag kept its contents safe
🔒 Job pictures his sins sealed the same way
📋 Nothing wrong he has done feels forgotten
📖 Job feels his failures are on record

## 🧵 Thou Sewest Up Mine Iniquity

Sewest up means to stitch closed, the way a bag or wound gets sealed shut.

Job describes his sin as something stitched shut and sealed away.

The image is careful and permanent, not careless or forgetful.

Job feels that nothing about his failures has been overlooked.

🧵 Sewest up means stitched closed
👜 Job's sin is pictured as sealed away
🔐 The image feels careful and permanent
📖 Job feels nothing has been overlooked

# Job 14:18-22
# ⛰️ Even Mountains Wear Away
---
## ⛰️ The Mountain Falling Cometh To Nought

Cometh to nought means comes to nothing, or is completely worn away.

Job says even a mountain eventually crumbles into nothing.

If something that solid does not last, Job feels his own life certainly will not.

Job reaches for the largest, most permanent thing he can picture.

⛰️ Cometh to nought means worn to nothing
🏔️ Even a mountain eventually crumbles
💔 Job feels far less permanent than a mountain
📖 Job reaches for the largest image

## 🪨 The Rock Is Removed Out Of His Place

Even a huge rock does not stay fixed in one spot forever.

Slowly, over time, it shifts and moves from where it once sat.

Job is building a picture of total, patient erosion by time.

Nothing physical in Job's world seems permanent to him right now.

🪨 A rock does not stay fixed forever
⏳ Time slowly shifts it from its place
🌊 Job pictures total erosion over time
📖 Nothing feels permanent to Job right now

## 💧 The Waters Wear The Stones

Water looks soft and harmless compared to solid stone.

Yet given enough time, moving water slowly wears even hard stone smooth.

Job uses this to picture how slowly, unstoppable forces erode a life.

The damage does not need to be sudden to still be complete.

💧 Water looks soft compared to stone
🪨 Given time, water wears stone down
⏳ Erosion here is slow but complete
📖 Damage does not need to be sudden

## 🌱 Thou Washest Away The Things Which Grow Out Of The Dust Of The Earth

This pictures a flood carrying off plants growing up out of the soil.

Job connects this directly back to human beings, who were formed from dust.

What grows from dust can just as easily be washed back into it.

Job sees his own life inside that same fragile cycle.

🌱 This pictures plants washed away by water
🌍 Humans were also formed from dust
🔄 What comes from dust can return to it
📖 Job sees himself inside that same cycle

## 💔 Thou Destroyest The Hope Of Man

Job names the fear underneath every picture in this chapter.

This is not only about a short life.

It is that hope itself feels crushed.

Job says this directly to God, without softening it.

💔 Job names the fear behind every image
😢 Hope itself feels crushed to him
🗣️ Job says this directly to God
📖 This is the chapter's emotional low point

## 🏆 Thou Prevailest For Ever Against Him, And He Passeth

Prevailest means to win out over or overpower completely.

Job says God always wins this contest between life and death.

He passeth means the person dies and moves on from this life.

Job states this as an unbeatable, ongoing pattern, not a single loss.

🏆 Prevailest means to win out completely
⚖️ God always wins this struggle
💀 He passeth means the person dies
📖 Job names an unbeatable, ongoing pattern

## 🙂 Thou Changest His Countenance, And Sendest Him Away

Countenance means the appearance or expression of someone's face.

Job pictures death changing a person's face completely, the way sickness or age already does.

Sendest him away describes death as a kind of dismissal from this life.

Job sees death as something forced on a person, not something chosen.

🙂 Countenance means a person's face or look
😷 Death changes that appearance completely
🚪 Sendest him away means dismissal from life
📖 Job sees death as something forced on him

## 👨‍👦 His Sons Come To Honour, And He Knoweth It Not

Job pictures a father who has already died.

That father's children might later succeed and gain honor in life.

The dead father never finds out any of this happened.

Job is naming a real, painful gap between the living and the dead.

👨‍👦 Job pictures a father who has died
🏆 His children may later gain honor
🙈 The father never learns of it
📖 Job names a real, painful gap

## 📉 They Are Brought Low, But He Perceiveth It Not

This flips the previous picture, now the children fall into hardship instead.

The dead father does not learn about this sorrow either.

Job says death cuts off knowledge of both good news and bad news equally.

Whatever happens to a family after death, the one who died cannot see it.

📉 This flips the previous picture completely
😢 The children may fall into hardship instead
🙈 The father does not learn this either
📖 Death cuts off knowledge of both

## 🩹 His Flesh Upon Him Shall Have Pain

Job closes the chapter by returning to his own body.

He believes pain belongs to the living, not to the dead.

This grounds the whole chapter back in his present suffering.

Job has not been speaking only in abstract ideas.

🩹 Job returns to his own body here
😖 He connects pain to being alive
🧍 This grounds the chapter in his suffering
📖 Job was never only speaking abstractly

## 😢 His Soul Within Him Shall Mourn

Job ends the chapter with grief that reaches all the way to his inner self.

Soul here means his inmost self, his real, honest feelings underneath everything.

The chapter opened naming the sorrow of every human life.

It closes with Job's own sorrow, still present and still unresolved.

😢 Soul means Job's inmost, honest self
🔁 The chapter opened naming universal sorrow
🧍 It closes with Job's own sorrow
📖 Job's grief remains open and unresolved
`.trim();

export const JOB_FOURTEEN_PERSONAL_SECTIONS = parseJobFourteenRawNotes(JOB_FOURTEEN_RAW_NOTES);
