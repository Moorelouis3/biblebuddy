export type JobSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobSevenRawNotes(rawText: string): JobSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 7:${startVerse}` : `Job 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Job 7 sections, received " + sections.length);
  }

  return sections;
}

const JOB_SEVEN_RAW_NOTES = `# Job 7:1-6
# ⏳ Weary As A Hired Servant
---
## 😔 Is There Not An Appointed Time To Man

"Appointed time" here points to hard, required service, not just any schedule.

Job compares human life on earth to a soldier's tour of duty.

Neither one gets to leave early.

Job feels trapped inside a term of service he never chose.

😔 Appointed time means required service
🪖 Job compares life to military duty
⏱️ Neither soldier nor hireling leaves early
📖 Job feels trapped in his term

## 🌆 As A Servant Earnestly Desireth The Shadow

A "hireling" was a day laborer paid only for the hours he worked.

He watches for the shadow to lengthen, since that meant the workday was ending.

That shadow also marked the moment his wages were finally due.

Job says he waits for relief the same way a worker waits for quitting time.

🌆 Hireling means a day laborer
⏳ Shadow signals the workday ending
💰 Wages come due at day's end
📖 Job waits for relief the same way

## 📅 Months Of Vanity

"Vanity" means emptiness, something hollow or wasted.

Job is not just tired for one bad day.

He describes entire months that feel completely empty of purpose.

Time itself has become part of his suffering.

📅 Vanity means empty or wasted
😩 Job names whole months, not days
🕳️ His time feels hollow and pointless
📖 Even time itself now weighs on him

## 🌙 Wearisome Nights Are Appointed To Me

Job's nights bring him no rest.

"Appointed" here means assigned, as if by a court's official sentence.

This feels like a punishment, not chance.

Even the dark hours give him no escape.

🌙 Wearisome nights bring no rest
⚖️ Appointed means assigned like a sentence
😔 Job calls this punishment, not luck
📖 Even night offers him no escape

## 🔄 Full Of Tossings To And Fro

"Tossings to and fro" describes restless turning in bed.

Job cannot fall asleep or lie still.

He watches for morning the entire night.

Sleep should offer an escape from pain.

Even that escape is closed to him.

🔄 Tossings to and fro means restless turning
😖 Job cannot fall asleep or rest
🌅 He watches all night for morning
📖 Even sleep offers him no escape

## 🪱 My Flesh Is Clothed With Worms And Clods Of Dust

Job describes his skin in graphic, physical detail.

"Clothed with worms" pictures open sores that have become infested.

"Clods of dust" describes crusted dirt and scabbing covering his body.

This reflects a real and severe skin disease.

🪱 Worms pictures infested open sores
🧱 Clods of dust means crusted scabs
🤒 This reflects a real skin disease
📖 Job's suffering is physical, not just emotional

## 😖 My Skin Is Broken, And Become Loathsome

"Loathsome" means disgusting to look at, something people want to turn away from.

Job's skin keeps breaking open and oozing.

He is describing how his own body has become repulsive, even to himself.

This detail explains why his friends reacted the way they did earlier in the book.

😖 Loathsome means disgusting to look at
🩹 His skin keeps breaking open
🪞 Job feels repulsive even to himself
📖 This explains his friends' reaction earlier

## 🧵 Swifter Than A Weaver's Shuttle

A "shuttle" was the small tool a weaver threw back and forth across a loom.

It moved fast enough to blur, all day long.

Job says his days are passing that quickly.

Speed would be a comfort if something good waited at the end.

Instead his fast moving days are spent without hope.

🧵 A shuttle flew fast across a loom
⏩ Job's days pass by just as fast
😔 Speed offers no comfort here
📖 His fast days end without hope

# Job 7:7-10
# 💨 My Life Is Wind
---
## 💨 O Remember That My Life Is Wind

"Wind" here means something brief, invisible, and impossible to hold onto.

Job asks God to keep this fact in mind before it is too late.

He is not questioning whether God remembers in general.

He is begging for that memory to shape how God treats him now.

💨 Wind means brief and impossible to hold
🙏 Job asks God to remember this
⏳ He fears it will soon be too late
📖 He wants that memory to shape God's response

## 👁️ Mine Eye Shall No More See Good

Job expects to die soon.

He does not believe he will see anything good again in this life.

This is not calm acceptance of death.

It is a raw statement of hopelessness spoken in the middle of his pain.

👁️ Job expects death is near
🚫 He expects no more good in life
😔 This is not calm acceptance
📖 It is raw, honest hopelessness

## 👀 The Eye Of Him That Hath Seen Me Shall See Me No More

Job pictures the people who currently see him every day.

Soon they will look for him and find nothing.

He means the people around him now, not one specific person.

Death will remove him so completely that his presence simply stops.

👀 Him refers to those who see Job now
🚶 Soon they will look and find nothing
🕳️ Death removes him completely
📖 His presence will simply stop

## 🙏 Thine Eyes Are Upon Me, And I Am Not

Job shifts from people's eyes to God's eyes directly.

He says God is watching him closely right now.

Soon, Job says, that same watching God will look and find him gone.

The contrast between being watched and then vanishing is the whole point.

🙏 Job shifts from people's eyes to God's
👁️ God is watching him closely now
🕳️ Soon Job says he will be gone
📖 Being watched now makes the vanishing sharper

## ☁️ As The Cloud Is Consumed And Vanisheth Away

Think of a cloud burning off in the morning sun.

It does not fade slowly.

It simply stops being there.

Job compares his own life to that same disappearing cloud.

☁️ A cloud can vanish completely
🌤️ It does not fade, it disappears
🔄 Job compares his life to that cloud
📖 Both leave no trace behind

## ⚰️ He That Goeth Down To The Grave Shall Come Up No More

"The grave" here means Sheol, the ancient Hebrew name for the place of the dead.

In Job's time, people believed death in this life was completely final.

No one who died came back to walk among the living again.

Job is stating what everyone around him already believed to be true.

⚰️ Grave means Sheol, the place of the dead
🔒 Death in this life was seen as final
🚫 No one returned to walk among the living
📖 Job states a belief everyone already shared

## 🏠 He Shall Return No More To His House

Job pushes the point even further than before.

It is not only his own body and presence that vanish.

His home and his daily place in the world will also stop knowing him.

Even the ground he walked on will move on without him.

🏠 Even his own home will forget him
🌍 His place in the world disappears too
🚶 Job pushes his point even further
📖 The world moves on without him

# Job 7:11-16
# 🗣️ Job Will Not Stay Silent
---
## 🗣️ I Will Not Refrain My Mouth

"Refrain" means to hold back or restrain.

Job decides he will not stay quiet about his pain any longer.

Up to this point he has listened to his friends without much interruption.

Now he chooses to speak his mind fully and honestly.

🗣️ Refrain means to hold back
🤐 Job has stayed mostly quiet until now
📢 He decides to speak fully
📖 Honest speech replaces silence here

## 💔 I Will Speak In The Anguish Of My Spirit

"Anguish" means deep, crushing emotional pain.

Job is not choosing his words carefully to sound calm.

He is speaking directly out of real inner suffering.

The Bible allows this kind of honest, painful prayer.

💔 Anguish means deep, crushing pain
🎭 Job is not performing calm control
🗯️ He speaks straight from real suffering
📖 Scripture makes room for honest pain

## 😣 I Will Complain In The Bitterness Of My Soul

"Complain" here does not mean sinful grumbling against God.

It means an honest, formal statement of grief.

It is closer to a legal case laid out in words.

"Bitterness" describes a soul worn raw by suffering.

😣 Complain means a formal statement of grief
⚖️ It resembles a legal case, not grumbling
💢 Bitterness describes a soul worn raw
📖 Job wants to be heard, not to accuse

## 🐋 Am I A Sea, Or A Whale

Ancient people believed the sea and great sea creatures needed to be held back by force.

"Whale" here likely refers to a legendary sea monster, not a literal whale.

Job asks God why he is being treated like something dangerous.

He does not see himself as a threat at all.

🐋 Whale likely means a legendary sea monster
🌊 Ancient people saw the sea as untamed
🔒 Job feels treated like a threat
📖 He does not see himself that way

## 👮 That Thou Settest A Watch Over Me

"Settest a watch" means posting a guard to monitor someone closely.

Guards were normally placed over prisoners or dangerous animals.

Job asks why God treats him the same way.

He wants relief from constant scrutiny, not an escape from God altogether.

👮 A watch means a posted guard
🔗 Guards usually watched prisoners or threats
❓ Job asks why he gets that treatment
📖 He wants relief, not to escape God

## 😱 Then Thou Scarest Me With Dreams

Job expects his bed to offer comfort at the end of a hard day.

Instead, sleep brings frightening dreams and visions.

"Terrifiest" means to fill with real terror, not mild unease.

Even the one place Job hoped for relief has turned against him.

😱 Job expects comfort from his bed
💭 Sleep brings frightening dreams instead
😨 Terrifiest means filled with real terror
📖 Even rest has turned against him

## 💔 My Soul Chooseth Strangling, And Death Rather Than My Life

This verse describes the depth of Job's despair, not a plan he intends to carry out.

He says death would feel better than the suffering he lives with now.

This matches what Job already said in chapter six about wanting God to end his life.

Job never acts on this wish himself, in either chapter.

💔 This shows despair, not an actual plan
😔 Death sounds better than his current pain
🔁 This echoes his words back in chapter six
📖 Job never acts on the wish himself

## 😩 I Would Not Live Alway

"Alway" is an old spelling of always.

"Loathe" means to hate something intensely.

Job says he would not want to live forever if life stayed this painful.

Even endless life sounds unbearable to him right now.

😩 Alway is an old spelling of always
🤢 Loathe means to hate intensely
♾️ Even forever sounds unbearable to him
📖 His pain reshapes how he sees life

## 🙏 Let Me Alone For My Days Are Vanity

Job asks for space, not for abandonment.

He returns again to the word "vanity," the same word used back in verse three.

His days feel empty and meaningless to him right now.

That repeated word ties this whole section together.

🙏 Job asks for space, not abandonment
🔁 Vanity repeats the word from verse three
😔 His days still feel empty to him
📖 The repetition ties the section together

# Job 7:17-21
# ❓ What Is Man
---
## ❓ What Is Man, That Thou Shouldest Magnify Him

This question echoes a theme found elsewhere in scripture.

There, the same wondering carries awe and praise.

Job asks it here in the opposite spirit.

"Magnify" means to make someone important, or watch them closely.

Job is not amazed by that attention.

He is exhausted by it instead.

❓ This question usually carries awe elsewhere
🔁 Job asks it in bitterness instead
👁️ Magnify means to notice or watch closely
📖 Job feels exhausted, not amazed, by it

## 🔬 Visit Him Every Morning, And Try Him Every Moment

"Try" here means to test or examine closely.

Job pictures God running a fresh test on him every single morning.

Even the smaller word "moment" adds constant, unending scrutiny.

There is no pause built into this kind of attention.

🔬 Try means to test or examine
🌅 God tests him fresh every morning
⏱️ Moment adds constant, unending scrutiny
📖 Job finds no pause in this attention

## 💧 Till I Swallow Down My Spittle

"Till I swallow down my spittle" was a common ancient idiom.

It meant the briefest possible moment, about as long as it takes to swallow.

Job is not asking for a long vacation from his pain.

He is asking for even one tiny breath of relief.

💧 Spittle here is an idiom for an instant
⏳ It means the briefest possible pause
🙏 Job is not asking for a long break
📖 He wants even one small breath of relief

## 🙇 I Have Sinned What Shall I Do Unto Thee

This is not a full confession of definite wrongdoing.

Job raises the idea only as a hypothetical.

"Preserver of men" is a title for God as the one who keeps humanity alive.

Job asks why even a small sin would draw this much attention.

🙇 This is not a full confession
💭 Job raises sin only as a hypothetical
🛡️ Preserver of men means God sustains humanity
📖 Even small sin would not deserve this weight

## 🎯 Set Me As A Mark Against Thee, So That I Am A Burden To Myself

A "mark" was the target archers aimed at during practice.

Job feels like he has been set up as a target for God's arrows.

This echoes the same arrow image Job used back in chapter six.

He says his own existence has become a weight even he cannot carry.

🎯 Mark means a target for archers
🏹 Job feels chosen as God's target
🔁 This echoes the arrows from chapter six
📖 His own life has become a heavy weight

## 🙏 Pardon My Transgression, And Take Away Mine Iniquity

"Transgression" means one specific wrong act.

"Iniquity" means the deeper guilt or crookedness behind that act.

Job asks a simple question, if he is guilty, why not just forgive him.

He would rather be forgiven than keep suffering under this much scrutiny.

🙏 Transgression means one specific wrong act
⚖️ Iniquity means the deeper guilt behind it
❓ Job asks why God will not simply forgive
📖 He wants mercy more than scrutiny

## 💤 Now Shall I Sleep In The Dust

"Sleep in the dust" is a poetic way of describing death and burial.

This picks up the same grave imagery Job used earlier in this chapter.

Job expects this to happen soon, not far in the future.

Death feels close enough to name plainly.

💤 Sleep in the dust pictures death
🔁 This repeats the chapter's earlier grave image
⏳ Job expects this to happen soon
📖 He names death plainly, without flinching

## 🌅 Thou Shalt Seek Me In The Morning, But I Shall Not Be

Job closes the chapter exactly where he opened it, waiting for morning.

This time God is the one who comes looking, and finds nothing.

The chapter began with Job watching for dawn in pain.

It ends with God watching for Job, too late.

🌅 Job closes on the same morning image
🔁 The chapter opened the same way it ends
😔 This time God searches and finds nothing
📖 The ending arrives one step too late
`.trim();

export const JOB_SEVEN_PERSONAL_SECTIONS = parseJobSevenRawNotes(JOB_SEVEN_RAW_NOTES);
