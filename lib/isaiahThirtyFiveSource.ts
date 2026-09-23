export type IsaiahThirtyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahThirtyFiveRawNotes(rawText: string): IsaiahThirtyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahThirtyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+35:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 35 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+35:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+35:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 35 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 35,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 35:${startVerse}` : `Isaiah 35:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Isaiah 35 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_THIRTY_FIVE_RAW_NOTES = `# Isaiah 35:1-4
# 🏜️ The Wilderness And The Solitary Place Shall Be Glad
---
## 🏜️ The Wilderness And The Solitary Place Shall Be Glad

A "solitary place" means ground so empty that no traveler ever passes through.

A wilderness already sounds abandoned and lifeless.

Isaiah pictures both suddenly filled with joy.

The emptiest ground in the whole land is the first to rejoice.

No place is too empty for God's attention.

🏜️ Solitary place means no one travels there
😐 Wilderness already sounds lifeless and empty
🎉 Both places are pictured filled with joy
📖 No place is too empty for God

## 🌹 Blossom As The Rose

The word "rose" here does not necessarily mean a modern rose bush.

Many scholars believe it more likely describes a crocus or another wildflower of the region.

Either way the picture stays the same.

Dry, cracked ground bursts into unexpected color.

A desert here does not just survive.

It comes alive completely.

🌹 Rose likely means a crocus or wildflower
🌍 Either way the picture is the same
🎨 Dry ground bursts into unexpected color
📖 The desert does not survive, it comes alive

## 🏔️ The Glory Of Lebanon Shall Be Given Unto It

"Lebanon" was famous across the ancient world for its tall, thick forests.

"Carmel" and "Sharon" were both regions known for rich, fertile soil.

Isaiah borrows the reputation of three of the most beautiful places in the land.

The empty wilderness is promised that exact same beauty.

What was once famous only in fertile regions now belongs to the desert.

🌲 Lebanon was known for thick forests
🌾 Carmel and Sharon were known for rich soil
✨ Isaiah borrows the beauty of three regions
📖 That same beauty is promised to the desert

## 👀 They Shall See The Glory Of The LORD

This is the real reason for all the sudden blooming.

The changed landscape is not the point on its own.

It exists so people can see something true about God.

Beauty here becomes evidence, not decoration.

The desert becomes a witness to who God is.

🌸 Blooming is not the point on its own
👁️ It exists so people can see God
🔍 Beauty here becomes evidence, not decoration
📖 The desert becomes a witness to God

## 💪 Strengthen Ye The Weak Hands

This command is addressed to those who are strong enough to help others.

"Weak hands" pictures people who have grown tired and discouraged.

"Feeble knees" pictures people who feel too unsteady to keep going.

The command is simple, hold up the ones who are struggling.

Comfort here is not just felt, it is something people are told to do.

💪 Weak hands pictures people grown tired
🦵 Feeble knees pictures people feeling unsteady
🤝 Strong people are told to help others
📖 Comfort here is something people must do

## 😨 Say To Them That Are Of A Fearful Heart

A "fearful heart" describes someone gripped by real anxiety, not simple nervousness.

The instruction is not to pretend the fear is not there.

It is to speak directly to people who are genuinely afraid.

"Be strong, fear not" is a command, not just a suggestion.

Courage here is commanded because it is being supplied by God.

😨 Fearful heart means real anxiety, not nerves
🗣️ Speak directly to people who are afraid
💪 Be strong is a command, not advice
📖 Courage is supplied because God commands it

## ⚔️ Behold, Your God Will Come With Vengeance

"Vengeance" here does not mean uncontrolled anger.

It means God stepping in to set a wrong right.

"Recompence" means giving back exactly what is deserved, in this case rescue.

The same coming of God that judges also comes to save.

This promise pairs a warning with genuine comfort.

⚔️ Vengeance here means setting a wrong right
⚖️ Recompence means giving back what is deserved
🛟 This same coming of God also saves
📖 Warning and comfort arrive together here

## 🙌 He Will Come And Save You

This line answers every fear named just one line earlier.

God is not only coming to judge the nations.

He is coming for the people who are afraid right now.

The rescue promised here is personal, not distant.

Fear gets the last word replaced by rescue.

🙌 This answers the fear named just before
🎯 God comes for the people who are afraid
🤲 Rescue here is personal, not distant
📖 Fear is replaced here by rescue

# Isaiah 35:5-7
# 👁️ Then The Eyes Of The Blind Shall Be Opened
---
## 👁️ The Eyes Of The Blind Shall Be Opened

This promise is not a poetic exaggeration.

The blind are promised the ability to actually see again.

Isaiah is not only describing plants and hills changing.

People themselves are included in this coming restoration.

The New Testament later shows Jesus healing exactly this kind of blindness.

👁️ This promise is literal, not just poetic
🌍 More than plants and hills are changing
🧍 People themselves are included in this promise
📖 Jesus later heals exactly this kind of blindness

## 👂 The Ears Of The Deaf Shall Be Unstopped

"Unstopped" means something blocked is finally cleared open.

Deafness here is pictured as ears that were sealed shut.

The same God who opens blind eyes also opens deaf ears.

Every kind of brokenness named here gets undone, not just one.

Nothing about this restoration leaves a gap.

🔓 Unstopped means something blocked is cleared
👂 Deafness is pictured as ears sealed shut
🤝 The same God heals both conditions
📖 This restoration leaves nothing out

## 🦌 The Lame Man Shall Leap As An Hart

A "hart" is an old word for a male deer.

Deer are known for moving with quick, graceful speed.

A man who could not walk is pictured suddenly running free.

This is not a small improvement, it is complete restoration.

The change is as dramatic as the animal picture suggests.

🦌 Hart is an old word for a deer
🏃 Deer move with quick graceful speed
🚶 A man who could not walk now runs
📖 This restoration is complete, not partial

## 🎶 The Tongue Of The Dumb Shall Sing

"Dumb" in the King James is an old word for unable to speak.

It does not mean unintelligent the way the word is used casually today.

Someone who could never form words is pictured not just speaking but singing.

Singing takes even more ability than ordinary speech.

The restoration promised here goes beyond the minimum.

🤐 Dumb here means unable to speak
🚫 It does not mean unintelligent
🎤 Someone once silent is pictured singing
📖 The healing goes beyond the minimum

## 💦 In The Wilderness Shall Waters Break Out

A wilderness normally means no water for miles.

Isaiah pictures streams suddenly appearing where none existed before.

The parched ground itself is pictured turning into a pool.

Even the driest, most hopeless ground is included in this change.

Nothing about this land stays as dry as it once was.

🏜️ Wilderness normally means no water for miles
💧 Streams appear where none existed before
🏞️ Even parched ground becomes a pool
📖 Nothing here stays as dry as before

## 🐍 The Habitation Of Dragons, Where Each Lay

"Dragons" here is again the King James word for jackals.

Jackals were wild animals that made their home in dry, empty places.

The very ground where wild animals once slept is pictured changing completely.

Grass, reeds, and rushes all need real water to grow.

The most desolate address in the land becomes fertile ground.

🐺 Dragons here again means jackals
🏜️ Jackals lived in dry empty places
🌿 Grass and reeds need real water to grow
📖 The most desolate ground becomes fertile

# Isaiah 35:8-10
# 🛣️ The Way Of Holiness
---
## 🛣️ It Shall Be Called The Way Of Holiness

This highway is not just a road for travel.

It is named for what it represents, not just where it goes.

"Holiness" means being set apart, belonging to God alone.

Even the path itself carries that meaning in its name.

Walking this road means walking toward God, not just toward a place.

🛣️ This road is named for what it means
✝️ Holiness means being set apart for God
🚶 The road itself carries that meaning
📖 Walking it means walking toward God

## 🚫 The Unclean Shall Not Pass Over It

"Unclean" here does not describe someone who simply needs a bath.

It describes anything considered unfit to approach a holy God.

This road comes with a real boundary, not open to everyone as they are.

Access to it depends on being made clean first, not on effort alone.

The road protects what it leads to.

🧼 Unclean does not mean simply dirty
🚫 It means unfit to approach a holy God
🔒 This road has a real boundary
📖 The road protects what it leads to

## 🧭 The Wayfaring Men, Though Fools, Shall Not Err Therein

"Wayfaring men" simply means ordinary travelers on foot.

"Err" means to wander off course or get lost.

"Fools" here does not insult intelligence, it describes the inexperienced or untrained.

Even a traveler with no skill for finding the way cannot get lost on this road.

The road itself is clear enough to guide anyone who walks it.

🚶 Wayfaring men means ordinary travelers
🧭 Err means to wander off course
🙃 Fools here means untrained, not unintelligent
📖 This road is clear enough to guide anyone

## 🦁 No Lion Shall Be There

Lions were a real, familiar danger on any ancient road.

Isaiah promises this road removes that danger completely.

No predator of any kind is allowed to threaten it.

This is not a road that is merely well built.

It is a road that is truly safe.

🦁 Lions were a real danger on ancient roads
🚫 No predator threatens this road
🛡️ This danger is removed completely
📖 This road was built to be safe

## 🚶 The Redeemed Shall Walk There

"Redeemed" describes someone who has been bought back or set free.

This road was never meant for the strong or the deserving only.

It was built specifically for people who needed rescue.

Every person walking this road carries that same story.

The road is not for the impressive, it is for the rescued.

💰 Redeemed means bought back or set free
🆘 This road was built for people needing rescue
🚶 Every walker shares that same story
📖 This road is for the rescued

## 🎉 The Ransomed Of The LORD Shall Return

"Ransomed" pictures a price paid to bring someone home from captivity.

This promise points ahead to Israel's return from exile.

"Return" here means an actual journey, not just a feeling of relief.

Zion is named as the specific destination waiting for them.

This is a homecoming, not a vague hope.

💵 Ransomed pictures a price paid for freedom
🏠 This points to Israel's return from exile
🗺️ Zion is the specific destination
📖 This is a real homecoming, not a hope

## 😢 Sorrow And Sighing Shall Flee Away

This line closes the chapter the same way it opened, with reversal.

The chapter began with an empty desert turned glad.

It ends with grieving people turned joyful.

"Flee away" pictures sorrow running off like a defeated enemy.

Isaiah thirty five promises that joy, not sorrow, gets the last word.

🔄 This closes the chapter with reversal
🏜️ The chapter began with a desert turned glad
😢 Flee away pictures sorrow running off
📖 Joy gets the last word, not sorrow
`.trim();

export const ISAIAH_THIRTY_FIVE_PERSONAL_SECTIONS = parseIsaiahThirtyFiveRawNotes(ISAIAH_THIRTY_FIVE_RAW_NOTES);
