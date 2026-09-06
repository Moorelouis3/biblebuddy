export type PsalmsTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsTwentyNineRawNotes(rawText: string): PsalmsTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+29:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 29 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+29:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+29:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 29 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 29,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 29:${startVerse}` : `Psalms 29:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 29 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_TWENTY_NINE_RAW_NOTES = `# Psalms 29:1-2
# 🙌 Give Unto The LORD
---
## 👼 O Ye Mighty

"Mighty" here does not mean powerful human rulers.

The Hebrew phrase behind it points to heavenly beings.

David is calling on the angels themselves to praise God.

Even the strongest beings in heaven owe God worship.

👼 Mighty points to heavenly beings
🙇 David calls angels to praise God
💪 Even the strongest owe God worship
📖 No creature is above worshiping God

## 🗣️ Give Unto The LORD Glory And Strength

The word "give" here means to ascribe, not to hand over.

No creature can add anything to God that He lacks.

Glory means His visible weight and worth on display.

Strength names the power He already has without limit.

🗣️ Give means to ascribe, not hand over
✨ Glory means His visible weight and worth
💪 Strength names power He already has
➡️ Worship declares what is already true

## 👑 The Glory Due Unto His Name

"Due" means owed, like a debt that must be paid.

God's name stands for His whole character, not just a label.

Withholding worship from Him would be like refusing to pay what is owed.

His name has already earned the praise before anyone bows down.

👑 Due means owed like a debt
🏷️ God's name means His whole character
💳 Withholding worship would refuse a debt
📖 His name already earned the praise

## 💃 Worship The LORD In The Beauty Of Holiness

"Beauty of holiness" pictures worship dressed in its proper splendor.

Many scholars believe it may point to the priestly garments worn in the temple.

Others read it as the sheer splendor that belongs to God's own holiness.

Either way holiness itself is described as something beautiful, not just serious.

💃 Beauty of holiness means proper splendor
👘 It may point to priestly garments
✨ Or the splendor of holiness itself
📖 Holiness is beautiful, not only serious

# Psalms 29:3-9
# ⚡ The Voice Of The LORD
---
## ⚡ The Voice Of The LORD

"The voice of the LORD" is the theme repeated seven times in this psalm.

It pictures thunder itself as God speaking through a storm.

Ancient readers already linked thunder to the sound of a god's voice.

David uses that same image but points it straight at the one true LORD.

⚡ Voice of the LORD means thunder
🔁 The phrase repeats seven times here
⛈️ Ancient people linked thunder to a god's voice
📖 David points that image at the true LORD

## 🌊 Upon The Waters

The waters here likely picture the Mediterranean Sea during a violent storm.

Ancient Near Eastern people often saw the sea as a symbol of chaos.

By thundering over the waters God shows He rules even that chaos.

Nothing on earth, not even the sea, is outside His command.

🌊 Waters likely picture a stormy sea
🌀 The sea often symbolized chaos
👑 God rules even over that chaos
📖 Nothing on earth is outside His command

## 💪 The Voice Of The LORD Is Powerful

"Powerful" here means the voice carries real force, not just volume.

This is not a gentle whisper but a force that can move mountains later in the psalm.

David wants the reader to feel the weight behind God's speech.

Every word from a God like this carries actual power.

💪 Powerful means real force, not volume
🏔️ It can move mountains later in the psalm
🗣️ David wants the weight of God's speech felt
📖 Every word from God carries real power

## 👑 Full Of Majesty

"Majesty" describes the grandeur that belongs to a king.

This word was normally used for the splendor surrounding royal power.

David gives that royal splendor to the sound of God's voice itself.

Even a single sound from God carries the weight of a king's throne.

👑 Majesty means the grandeur of a king
🏰 Normally used for royal splendor
🎺 David gives that splendor to God's voice
📖 God's voice carries a king's weight

## 🌲 Breaketh The Cedars

Cedars were some of the largest and strongest trees known in the ancient world.

A tree that size could stand through almost any ordinary storm.

The voice of the LORD snaps a cedar the way a person snaps a twig.

This is a picture of power that no natural strength can resist.

🌲 Cedars were huge, strong trees
💥 They could survive almost any storm
🪵 God's voice snaps them like a twig
📖 No natural strength can resist that power

## 🇱🇧 The Cedars Of Lebanon

Lebanon was famous across the ancient world for its cedar forests.

Kings imported Lebanon's cedars to build palaces and temples, including Solomon's temple.

Naming Lebanon specifically points to the best and strongest trees anyone knew.

If God's voice can break the finest trees on earth, nothing stands against it.

🇱🇧 Lebanon was famous for its cedars
🏛️ Kings used them to build palaces
🌟 Lebanon meant the finest trees known
📖 Nothing stands against a voice like that

## 🐄 Skip Like A Calf

This pictures the mountains themselves trembling and jumping under the force of thunder.

A calf skips and jerks with quick, uncontrolled little movements.

The image compares an entire mountain range to that same jumpy motion.

It is a vivid way of describing an earthquake caused by God's voice.

🐄 A calf moves in quick jerky bursts
⛰️ Mountains are pictured skipping like that
🌍 This describes an earthquake in motion
📖 God's voice can move solid mountains

## 🦄 Lebanon And Sirion Like A Young Unicorn

"Sirion" was the name the Sidonians used for Mount Hermon.

The word translated "unicorn" does not mean a horse with one horn.

It refers to a wild ox, a strong animal known for restless energy.

Two mountain ranges are pictured leaping like that same wild, energetic animal.

🏔️ Sirion was the Sidonian name for Hermon
🐂 Unicorn here means a wild ox
⚡ The wild ox was strong and restless
📖 Both mountains leap like that same animal

## 🔥 Divideth The Flames Of Fire

"Divideth" pictures lightning splitting and forking as it strikes.

Thunder and lightning almost always appear together in a storm.

David keeps building one storm image after another to describe God's voice.

Fire under God's command bends into whatever shape His voice commands.

🔥 Divideth pictures forking lightning
⛈️ Thunder and lightning appear together
🧩 Each storm image builds on the last
📖 Fire bends to God's command

## 🏜️ Shaketh The Wilderness Of Kadesh

"Kadesh" names a real wilderness region, not just a poetic idea.

Naming an actual place makes the storm feel geographically specific.

The rest of the psalm already names real mountains like Lebanon and Hermon.

Even a named, familiar landscape is not beyond the reach of God's voice.

🏜️ Kadesh names a real wilderness region
📍 Naming a place makes the storm specific
🏔️ The psalm already named Lebanon and Hermon
📖 No familiar landscape is beyond God's voice

## 🦌 Maketh The Hinds To Calve

"Hinds" are female deer, known for being timid and easily startled.

Sudden shock or fear could cause a deer to give birth early.

The storm is pictured as so powerful it startles deer into labor.

Even the wild animals respond to the force behind God's voice.

🦌 Hinds are female deer
😨 Fear could cause early labor
⛈️ The storm startles deer that way
📖 Wild animals feel God's voice too

## 🌳 Discovereth The Forests

"Discovereth" here is an old word for stripping something bare.

The storm is pictured tearing leaves and branches off entire forests.

Nothing stays hidden or covered once a storm this strong passes through.

The same voice that breaks cedars also strips whole forests bare.

🌳 Discovereth means stripping bare
🍃 The storm tears leaves and branches away
👁️ Nothing stays hidden after a storm like that
📖 One voice breaks cedars and strips forests

## 🕍 In His Temple Doth Every One Speak Of His Glory

After all that storm imagery the scene shifts to worshipers inside the temple.

Everyone watching the storm from safety responds the same way, with praise.

The chaos outside becomes a reason to speak of God's glory inside.

Fear of the storm turns into worship of the one who sent it.

🕍 The scene shifts to the temple
🙏 Everyone inside responds with praise
🔄 Outside chaos becomes inside worship
📖 Fear of the storm becomes worship

# Psalms 29:10-11
# 👑 The LORD Sitteth King
---
## 🌊 The LORD Sitteth Upon The Flood

"The flood" points back to the great flood in the days of Noah.

That flood was the most overwhelming act of judgment Israel remembered.

God is pictured enthroned calmly above that same chaotic water.

The one who judged the flood has always been seated in full control.

🌊 The flood recalls Noah's flood
⚖️ That flood was a great judgment
🪑 God sits calmly above the chaos
📖 God was always in full control

## 👑 The LORD Sitteth King For Ever

Every storm in this psalm eventually passes and fades away.

God's kingship is pictured as permanent, with no storm ever ending it.

The word "for ever" contrasts directly with how quickly a storm moves on.

Thunder comes and goes, but this King never steps down from His throne.

👑 Storms in this psalm eventually pass
♾️ God's kingship never fades or ends
⚡ For ever contrasts with a passing storm
📖 This King never steps down

## 💪 Give Strength Unto His People

This "strength" is the same word used for God's own strength back in verse one.

What David first ascribed to God, God now hands back to His people.

The mighty voice that shakes mountains also empowers ordinary worshipers.

Strength is not just something God has, it is something God shares.

💪 Same word as strength in verse one
🔄 What David gave God, God gives back
🏔️ The mountain shaking voice empowers people too
📖 God shares His strength, not just holds it

## ☮️ Bless His People With Peace

"Peace" here means far more than just the absence of conflict.

It pictures a full, settled wholeness after chaos has passed through.

The psalm moves from a violent storm straight into a calm blessing.

The same voice that shakes creation is the voice that grants real rest.

☮️ Peace means full settled wholeness
🌪️ It follows right after the storm
🕊️ The psalm ends in calm blessing
📖 The same voice grants real rest
`.trim();

export const PSALMS_TWENTY_NINE_PERSONAL_SECTIONS = parsePsalmsTwentyNineRawNotes(PSALMS_TWENTY_NINE_RAW_NOTES);
