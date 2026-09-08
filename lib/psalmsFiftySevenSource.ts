export type PsalmsFiftySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFiftySevenRawNotes(rawText: string): PsalmsFiftySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFiftySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+57:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 57 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+57:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+57:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 57 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 57,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 57:${startVerse}` : `Psalms 57:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 57 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FIFTY_SEVEN_RAW_NOTES = `# Psalms 57:1-5
# 🛡️ Under The Shadow Of His Wings
---
## 🙏 Be Merciful Unto Me, O God, Be Merciful Unto Me

Repeating the same plea twice is a mark of real urgency.

In Hebrew poetry, saying something twice doubles its weight.

Many scholars connect this psalm to David hiding from Saul in a cave.

Whichever cave it was, David wrote this prayer while genuinely hunted.

The doubled plea captures exactly how urgent that danger felt.

🙏 Repeating a plea doubles its urgency
🗻 Tied to David hiding in a cave
👑 Saul was hunting David at the time
📖 The doubled plea matches real danger

## 🕊️ In The Shadow Of Thy Wings Will I Make My Refuge

Refuge means a safe place to hide from danger.

The picture is a mother bird sheltering her chicks under her wings.

David is not describing a literal physical shelter.

He is describing where he places his trust while hiding.

The true safety was never the cave itself.

It was God, pictured here as covering wings.

🐦 Refuge means a safe hiding place
🕊️ Pictures a mother bird's wings
🏔️ The cave was not his real safety
📖 His true safety was always God

## ⏳ Until These Calamities Be Overpast

Calamities means serious troubles or disasters.

Overpast means completely passed by.

David is not asking to avoid trouble altogether.

He is asking to be kept safe until it ends.

This prayer asks for endurance, not instant rescue.

⛈️ Calamities means serious trouble
⏳ Overpast means completely passed by
🛡️ David asks for safety through trouble
📖 The prayer asks for endurance not rescue

## 👑 I Will Cry Unto God Most High

Most High translates the Hebrew title Elyon.

It names God as ruler above every other power.

Crying out to this specific name is not random.

It reminds David exactly who he is appealing to.

👑 Most High translates the name Elyon
🌍 It names God above every power
🙏 David appeals to that highest authority
📖 The name he chooses is not random

## 🎯 Unto God That Performeth All Things For Me

Performeth means brings something to completion.

David is not just asking God for help.

He is trusting God to finish what concerns him.

The outcome already rests safely in God's hands.

✅ Performeth means brings to completion
🙌 David trusts not merely asks
🎯 The outcome rests in God's hands
📖 His confidence is not in himself

## 📨 He Shall Send From Heaven, And Save Me

Reproach means shame and insult, not just physical harm.

To swallow up pictures being consumed completely by an enemy.

David fears more than losing this fight.

He fears being shamed and erased entirely.

He trusts God to send rescue down from heaven itself.

😳 Reproach means public shame and insult
🐊 Swallow up pictures being consumed whole
😨 David fears shame more than harm
📖 He trusts rescue sent from heaven

## 💧 God Shall Send Forth His Mercy And His Truth

Selah likely marks a pause for the reader to reflect.

Mercy and truth are often paired together in the Psalms.

Mercy names God's kindness toward someone who does not deserve it.

Truth names God's reliability to keep His word.

Together they name exactly what David needs most right now.

⏸️ Selah marks a pause to reflect
💗 Mercy means kindness not deserved
🪨 Truth means God keeps His word
📖 David needs both together right now

## 🦁 My Soul Is Among Lions

Soul here means David's whole life, not just his feelings.

Lions was a common Old Testament picture for dangerous enemies.

David is not describing literal wild animals.

He is describing men who want to destroy him.

🦁 Lions pictures dangerous human enemies
❤️ Soul means David's whole life
😱 These were not literal animals
📖 Real men wanted to destroy him

## 🗡️ Their Tongue A Sharp Sword

Spears and arrows picture teeth ready to tear and pierce.

A sharp sword pictures a tongue used to wound with words.

David faced both physical danger and cruel accusations.

Lies spread by words can cut as deep as a blade.

🗡️ Sharp sword pictures a cruel tongue
🏹 Spears and arrows picture sharp teeth
💬 Words can wound like weapons
📖 David faced danger and cruel lies together

## 🌤️ Be Thou Exalted, O God, Above The Heavens

This line marks the end of the psalm's first half.

Exalted means lifted up and honored above everything else.

David has just described lions, swords, and real danger.

He answers that danger with praise instead of fear.

This same line will return again to close the whole psalm.

👑 Exalted means lifted above everything
🦁 David just described real danger
🙌 He answers danger with praise
📖 This same line returns again later

# Psalms 57:6-11
# 🙌 A Heart Fixed On Praise
---
## 🕸️ They Have Prepared A Net For My Steps

A net here pictures a hidden trap set to catch prey.

David's enemies planned his downfall in advance.

Bowed down means weighed down under real pressure.

This was not sudden despair but the weight of a real plot.

🕸️ Net pictures a hidden trap
📉 Bowed down means weighed down
🎯 Enemies planned his downfall in advance
📖 The weight came from a real plot

## 🕳️ Into The Midst Whereof They Are Fallen Themselves

A pit here means another kind of hidden trap.

Digging one was a common way to catch an enemy by surprise.

Whoever dug this pit fell into it themselves.

This pictures a common Old Testament pattern of poetic justice.

The trap meant for David caught its own makers instead.

🕳️ A pit means a hidden trap
🔄 The trap caught its own makers
⚖️ A picture of poetic justice
📖 Evil plans can turn back on the planner

## 🪨 My Heart Is Fixed, O God, My Heart Is Fixed

Fixed means firmly settled, not wavering or uncertain.

Saying it twice shows this resolve is not a passing feeling.

Earlier in the psalm David described real fear and danger.

Now his heart has settled into steady trust despite that danger.

🪨 Fixed means firmly settled
🔁 Said twice to show real resolve
😨 Danger is still real around him
📖 His heart has settled into trust

## 🎵 I Will Sing And Give Praise

David moves from a settled heart straight into action.

Singing and praise are not separate from trust.

They flow directly out of that settled trust.

Worship here is a decision, not just a passing feeling.

🎵 Sing and praise flow from trust
🙌 Worship follows a settled heart
✅ This is a decision not a mood
📖 Trust naturally turns into praise

## ✨ Awake Up, My Glory

My glory here likely refers to David's own soul or tongue.

David is calling his own inner self to wake up and respond.

This is David deliberately rousing himself to worship.

Worship like this does not always happen automatically.

✨ My glory likely means his soul
📣 David calls himself to wake up
💪 Worship here is a deliberate choice
📖 It did not happen automatically

## 🎻 Awake, Psaltery And Harp

A psaltery was a stringed instrument similar to a small harp.

David calls his own instruments to join his waking praise.

I myself will awake early means he chooses to rise before dawn.

He wants his praise to be the first sound of the day.

🎻 Psaltery was a small stringed instrument
🌄 Awake early means rising before dawn
🎶 His instruments join his praise
📖 He wants praise to start the day

## 📣 I Will Praise Thee Among The People

David does not plan to praise God only in private.

Among the people and among the nations means a public audience.

This reaches beyond Israel to people outside the covenant.

His private rescue becomes a reason for public praise.

📣 David plans to praise God publicly
🌍 Among the nations reaches beyond Israel
🙌 His rescue becomes public praise
📖 Private deliverance leads to public worship

## ☁️ Thy Mercy Is Great Unto The Heavens

Mercy and truth return here as a matching pair.

This echoes the same two words used earlier in the psalm.

Unto the heavens and unto the clouds pictures something without limit.

David is not describing a small, occasional kindness.

He is describing mercy and truth big enough to cover his danger.

☁️ Unto the clouds pictures no limit
🔁 Echoes mercy and truth from before
💗 God's mercy matches the danger's size
📖 Nothing David faced was bigger than this

## 🌅 Let Thy Glory Be Above All The Earth

This refrain already closed the first half of the psalm.

Repeating it here is a deliberate bookend, not filler.

The psalm opened surrounded by lions, spears, and swords.

It closes with that same confident praise stated twice.

🔁 This line repeats verse five exactly
🦁 It opened surrounded by real danger
🙌 It closes in the same confident praise
📖 Fear gave way to lasting praise
`.trim();

export const PSALMS_FIFTY_SEVEN_PERSONAL_SECTIONS = parsePsalmsFiftySevenRawNotes(PSALMS_FIFTY_SEVEN_RAW_NOTES);
