export type PsalmsSeventyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSeventyFiveRawNotes(rawText: string): PsalmsSeventyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSeventyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+75:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 75 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+75:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+75:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 75 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 75,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 75:${startVerse}` : `Psalms 75:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 75 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SEVENTY_FIVE_RAW_NOTES = `# Psalms 75:1
# 🙏 Thanks Given Twice Over
---
## 🔁 Unto Thee, O God, Do We Give Thanks, Unto Thee Do We Give Thanks

This line repeats the same words twice in a row.

Hebrew poetry often repeats an idea instead of rhyming sounds.

Saying it twice pushes the thanks past a quick, polite word.

The psalm opens already leaning fully into gratitude.

🔁 The same words repeat on purpose
📜 Hebrew poems repeat ideas, not sounds
🙏 Repetition pushes past a quick thanks
📖 The psalm opens fully leaning into gratitude

## 🔀 Thy Name Is Near Thy Wondrous Works Declare

This sentence sounds backward to a modern reader.

It actually means the wondrous works declare that God's name is near.

Name here means God's own reputation and character.

Near means close enough to be seen and felt.

The proof is God's own visible actions.

It is not just a private feeling.

🔀 The word order sounds backward today
🏷️ Name means God's reputation and character
👀 Near means close enough to be seen
📖 God's own works are the proof

# Psalms 75:2-3
# 🗣️ God Speaks In The First Person
---
## 🗣️ When I Shall Receive The Congregation

The word I here is God speaking.

It is not the psalmist's own voice.

Psalms sometimes shift suddenly into God's own voice like this.

Receive the congregation pictures God stepping in as judge over the people.

That moment comes at a time only God chooses.

🗣️ I here means God speaking directly
🔄 Psalms sometimes shift into God's voice
⚖️ Receiving the congregation means stepping in as judge
📖 God alone chooses when that happens

## ⚖️ I Will Judge Uprightly

Uprightly means completely fair.

It means judging with no favoritism at all.

Human judges in the ancient world often took bribes.

God's promise rules out that kind of corruption.

This is the fairness people longed for but rarely received.

⚖️ Uprightly means completely fair judgment
💰 Human judges often took bribes
🚫 God's promise rules out that corruption
📖 This is the fairness people longed for

## 🌍 The Earth And All The Inhabitants Thereof Are Dissolved

Dissolved does not mean the earth is literally melting.

It pictures the whole world feeling unstable.

It feels like everything could fall apart any moment.

Ancient poets used this same picture during real national crisis.

The next line answers this fear directly.

🌍 Dissolved means the world feels unstable
💥 It pictures near total collapse
📜 Poets used this image during real crisis
📖 The next line answers this fear

## 🏛️ I Bear Up The Pillars Of It Selah

Ancient people pictured the earth resting on pillars.

Think of a house resting on its foundation.

The picture describes what holds the world steady.

God claims that steadying job for himself.

Selah is a pause marker that shows up often in the Psalms.

No one today knows exactly what it meant to the original singers.

🏛️ Pillars pictures the earth's unseen support
🏠 Think of a house on its foundation
⏸️ Selah likely marked a pause to reflect
📖 God claims that steadying job himself

# Psalms 75:4-6
# 🐂 Do Not Lift Up Your Horn
---
## 🧠 I Said Unto The Fools, Deal Not Foolishly

Fools in the Bible rarely means someone lacking intelligence.

It usually means someone who ignores God on purpose.

Dealing foolishly means living as if God will never step in.

The warning targets a choice, not a lack of ability.

🧠 Fools rarely means lacking intelligence
🙈 It means ignoring God on purpose
⚠️ Foolishly means living as if unchecked
📖 The warning targets a choice, not ability

## 🐂 To The Wicked, Lift Not Up The Horn

Horn here does not mean a musical instrument.

It borrows the picture of an animal raising its horns before a fight.

Lifting up the horn became a common way to describe boasting.

The warning tells the wicked to stop flaunting their strength.

🐂 Horn borrows the picture of an animal
⚔️ Raised horns pictured readiness for a fight
😤 Lifting the horn means boasting of power
📖 The wicked are told to stop flaunting it

## 🐴 Speak Not With A Stiff Neck

A stiff neck pictures an animal refusing to bend under a yoke.

Applied to a person, it means refusing to bow down.

Speaking with a stiff neck means talking with open, stubborn pride.

Both this image and the horn image describe the same arrogance.

🐴 Stiff neck pictures an animal refusing the yoke
🙅 Applied to people, it means refusing correction
🗣️ It describes stubborn, prideful speech
📖 Both images point to the same arrogance

## 🧭 Promotion Cometh Neither From The East, Nor From The West, Nor From The South

This line names three directions on purpose.

It leaves one direction out completely.

North never gets mentioned, even though it completes the compass.

Many scholars believe ancient readers connected the north with God's own dwelling place.

Leaving it out points straight to where promotion actually comes from.

🧭 Three directions are named, one is missing
🚫 North is left out on purpose
⛰️ North was linked to God's dwelling place
📖 The missing direction points straight to God

# Psalms 75:7-8
# 🍷 The Cup In God's Hand
---
## ⚖️ God Is The Judge: He Putteth Down One, And Setteth Up Another

This line directly answers the warning just given to the proud.

Putteth down one means removing someone from power.

Setteth up another means placing someone else there instead.

God, not human effort, controls who rises and who falls.

⚖️ This answers the warning to the proud
⬇️ Putteth down means removed from power
⬆️ Setteth up means placed into power
📖 God alone controls that outcome

## 🍷 In The Hand Of The LORD There Is A Cup

A cup in someone's hand pictures something about to be poured out.

Other prophets use this exact same picture.

Isaiah and Jeremiah both describe a cup of wrath poured on nations.

This cup does not hold anything worth celebrating.

🍷 A cup pictures something about to be poured
📜 Other prophets use this same picture
⚡ Isaiah and Jeremiah describe this same cup
📖 The cup here is not for celebration

## 🍇 The Wine Is Red, It Is Full Of Mixture

Red wine here pictures something strong and severe.

Mixture refers to spices added to wine in the ancient world.

Adding mixture made the wine hit harder.

The judgment pictured here is made heavier, not softer.

🍷 Red pictures something strong and severe
🌿 Mixture means added spices or ingredients
💪 Mixture made the wine hit harder
📖 The judgment pictured here is not softened

## 🍶 The Dregs Thereof, All The Wicked Of The Earth Shall Wring Them Out, And Drink Them

Dregs are the thick, bitter leftovers at the bottom of a cup.

No one wants to drink that part.

Wring them out pictures forcing out every last bit.

The wicked are made to finish the judgment completely.

🍶 Dregs means the bitter leftover at the bottom
🤢 No one wants to drink that part
🫗 Wring out means forcing out every last bit
📖 The wicked finish the judgment completely

# Psalms 75:9-10
# 📯 Horns Cut Off, Horns Lifted High
---
## 🔄 I Will Declare For Ever

The voice shifts back here from God speaking to the psalmist.

Declare means announce publicly, not just feel something privately.

For ever signals this is not a one time reaction.

The psalmist commits to telling this story again and again.

🔄 The voice shifts back to the psalmist
📢 Declare means announce publicly
⏳ For ever means not just once
📖 The psalmist commits to telling it again

## 🏷️ I Will Sing Praises To The God Of Jacob

God of Jacob is a title used often across the Psalms.

It ties this prayer back to Jacob's own story.

Jacob wrestled with God and came away limping but blessed.

Calling on that same God links personal history to present worship.

🏷️ God of Jacob is a common Psalm title
🤼 It recalls Jacob's own wrestling story
🩹 Jacob left limping but blessed
📖 Personal history feeds into present worship

## 🐂 All The Horns Of The Wicked Also Will I Cut Off

This picks the horn picture back up from earlier in the psalm.

Cutting off the horn means stripping away power completely.

An animal without horns loses its main way to fight.

The proud boasting named back in verse four gets fully undone.

🐂 This returns to the horn picture
✂️ Cutting off means stripping away power
🚫 A hornless animal cannot fight or threaten
📖 The earlier boasting gets fully undone

## ⬆️ The Horns Of The Righteous Shall Be Exalted

Exalted means lifted up high, the opposite of cut off.

The righteous do not have to grab this strength themselves.

It is given, the same way promotion in verse six comes from God.

The psalm ends by handing real strength to people who did not demand it.

⬆️ Exalted means lifted up high
🤲 The righteous do not grab this themselves
🎁 Strength is given, not demanded
📖 The psalm ends with strength rightly placed`.trim();

export const PSALMS_SEVENTY_FIVE_PERSONAL_SECTIONS = parsePsalmsSeventyFiveRawNotes(PSALMS_SEVENTY_FIVE_RAW_NOTES);
