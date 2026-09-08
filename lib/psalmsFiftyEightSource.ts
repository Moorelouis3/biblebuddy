export type PsalmsFiftyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFiftyEightRawNotes(rawText: string): PsalmsFiftyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFiftyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+58:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 58 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+58:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+58:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 58 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 58,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 58:${startVerse}` : `Psalms 58:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Psalms 58 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FIFTY_EIGHT_RAW_NOTES = `# Psalms 58:1-5
# 🐍 Judges Compared To Venomous Snakes
---
## 🏛️ O Congregation

The word congregation here likely points to a council of judges or rulers.

Not the everyday worshiping assembly the word usually brings to mind.

David is speaking directly to men who hold real power to judge others.

This whole psalm confronts corrupt leadership, not the general public.

🏛️ Congregation likely means a council of judges
👑 Addressed to men who hold power
⚖️ This psalm targets corrupt leadership
📖 David confronts abuse of power directly

## ❓ Do Ye Judge Uprightly, O Ye Sons Of Men

This question is not a real request for information.

David already knows the answer, and it is no.

Sons of men here means people with real authority over others.

The question exposes their failure before he says another word.

❓ The question is not a real request
✅ David already knows the answer is no
👥 Sons of men means powerful people
📖 Their failure is exposed immediately

## 🧠 In Heart Ye Work Wickedness

In Hebrew thought, the heart is where a person decides and plans.

This is not an accident or a slip of temper.

The wickedness described here was planned out on purpose.

Corruption began long before it ever reached their hands.

🧠 Heart means the seat of decision
🚫 Not an accident or sudden anger
📝 Their wickedness was planned in advance
📖 Corruption started before it ever acted

## ⚖️ Ye Weigh The Violence Of Your Hands

To weigh here pictures a merchant carefully measuring goods on a scale.

These judges are not lashing out in sudden anger.

They are calculating exactly how much harm to deal out.

Violence becomes a tool they measure and use on purpose.

⚖️ Weigh pictures a merchant measuring goods
🚫 Not a sudden burst of anger
🧮 Harm is carefully calculated in advance
📖 Violence becomes a deliberate tool

## 🌑 Estranged From The Womb

This does not mean these judges were born already guilty.

Old Testament poetry often uses extreme pictures to make a point.

David is saying their corruption runs as deep as anything can.

The exaggeration is intentional, not a claim about actual infants.

🚫 Not a literal claim about infants
📜 Old Testament poetry uses extreme pictures
🌑 Their corruption runs impossibly deep
📖 The exaggeration makes the point land

## 🤥 Go Astray As Soon As They Be Born, Speaking Lies

Lying was the exact tool corrupt judges used every single day.

A judge who lies can twist any case toward whatever he wants.

This is not childhood mischief being described here.

It names a lifelong pattern of dishonesty in their work.

🤥 Lying was their daily tool
⚖️ A lying judge can twist any case
🚫 Not childhood mischief being described
📖 It names a lifelong pattern of dishonesty

## 🐍 Their Poison Is Like The Poison Of A Serpent

Poison here pictures the real damage these judges caused other people.

A snake does not have to bite hard to do harm.

One small dose of venom is enough to kill.

David is saying their lies and rulings worked the same way.

🐍 Poison pictures real harm they caused
💉 A small dose of venom kills
⚖️ Their lies worked the same way
📖 Words and rulings carried deadly weight

## 🙉 The Deaf Adder That Stoppeth Her Ear

An adder is a venomous snake, similar to a small cobra.

Ancient folklore claimed this snake could block its own hearing.

Some believed it pressed one ear into the ground on purpose.

David pictures people who refuse to hear any correction at all.

No warning can reach someone who has already decided not to listen.

🐍 Adder means a venomous snake like a cobra
🙉 Folklore said it blocked its own hearing
🚫 It refused to hear any warning
📖 Some people are determined not to listen

## 🎶 The Voice Of Charmers, Charming Never So Wisely

Snake charmers were real performers in the ancient world.

They used music and movement to calm dangerous snakes.

Charming never so wisely is an old way of saying no matter how skilled.

Even the most skilled charmer could never reach this particular snake.

David is saying these judges are beyond anyone's ability to correct.

🎶 Snake charmers were real ancient performers
🐍 They used music to calm snakes
🙉 Never so wisely means no matter how skilled
📖 These judges are beyond anyone's correction

# Psalms 58:6-11
# 🌪️ Praying For God's Swift Justice
---
## 🙏 Break Their Teeth, O God, In Their Mouth

David is not literally asking God to injure someone's mouth.

Teeth here picture the power these judges use to harm others.

A lion's teeth are its main weapon.

David asks God to take away their power to hurt people.

🙏 This is a prayer, not a command
🦷 Teeth picture power to cause harm
🦁 A lion's main weapon is its teeth
📖 David asks God to remove that power

## 🦁 Break Out The Great Teeth Of The Young Lions, O LORD

The imagery shifts from snakes to lions here.

Lions were the most feared predator in the ancient world.

Young lions still had the strength to kill.

Both pictures describe the same corrupt and dangerous men.

🦁 The imagery shifts from snakes to lions
😱 Lions were the most feared ancient predator
💪 Young lions still had real killing strength
📖 Both pictures describe the same corrupt men

## 💧 Let Them Melt Away As Waters Which Run Continually

Picture water poured out onto dry, sandy ground.

It soaks in fast and leaves nothing behind.

David is praying for that same kind of complete disappearance.

He wants their threat gone without a trace.

💧 Water poured on dry ground disappears fast
🏜️ It soaks in and leaves nothing behind
🙏 David prays for the same disappearance
📖 He wants their threat gone completely

## 🏹 When He Bendeth His Bow To Shoot His Arrows, Let Them Be As Cut In Pieces

This line is one of the hardest to translate in the whole psalm.

The Hebrew wording here is genuinely unclear, even to scholars.

Many scholars believe David is praying that these attacks would fail before landing.

The picture is an arrow that breaks apart before it ever strikes.

📜 This line is hard to translate
❓ The Hebrew wording is genuinely unclear
🎯 The prayer is that their attacks fail
📖 It pictures an arrow breaking apart early

## 🐌 As A Snail Which Melteth

Ancient people believed a snail dissolved as it left its slime trail.

That was not scientifically true, but it was common folklore.

David uses that picture for something that fades away completely.

He wants his enemies to vanish the same way, without a trace.

🐌 People believed snails dissolved as they moved
📜 That was common ancient folklore, not fact
💨 It pictures something fading away completely
📖 He wants enemies to vanish completely

## 👶 Like The Untimely Birth Of A Woman, That They May Not See The Sun

An untimely birth here means a stillbirth or miscarried child.

Ancient people used this as a picture of a life that never began.

To see the sun was an old way of saying to be alive.

David is praying their harmful plans never get the chance to unfold.

👶 Untimely birth means a stillbirth
🌑 A picture of a life that never began
☀️ Seeing the sun means being alive
📖 Their harmful plans never get to unfold

## 🔥 Before Your Pots Can Feel The Thorns

Thorn branches were common quick burning fuel for cooking fires.

A pot set over thorns would heat up almost instantly.

This idiom pictures judgment landing before a meal even finishes cooking.

God's justice arrives faster than anyone expects.

🔥 Thorns were quick burning cooking fuel
🍲 A pot over thorns heats up fast
⏱️ Judgment lands before a meal finishes cooking
📖 God's justice arrives faster than expected

## 🌪️ He Shall Take Them Away As With A Whirlwind

A whirlwind is a sudden, violent storm that sweeps everything in its path.

This same image describes God's judgment in other parts of scripture.

It happens fast, without warning, and cannot be argued with.

David is praying for that same sudden, complete justice.

🌪️ A whirlwind sweeps everything in its path
⚡ It comes fast and without warning
🙏 It cannot be reasoned with or argued
📖 David prays for that same sudden justice

## ⚖️ The Righteous Shall Rejoice When He Seeth The Vengeance

Rejoicing here does not mean taking pleasure in someone else's pain.

Vengeance belongs to God alone throughout scripture, not to individuals.

The joy described here comes from seeing real justice finally arrive.

It is relief after a long wait, not cruelty.

⚖️ Vengeance belongs to God, not people
😌 This is relief, not personal cruelty
⏳ Joy comes after a long wait
📖 Real justice has finally arrived

## 😳 He Shall Wash His Feet In The Blood Of The Wicked

David is not describing a literal act anyone actually performed.

Ancient writers used this picture for total, decisive victory in battle.

A winning side standing over a defeated one was a common image.

The point is complete justice, not literal violence.

😳 This is shocking language on purpose
⚔️ It pictures total victory in battle
🏆 A common ancient image for winning
📖 The point is complete justice, not violence

## ✅ Verily There Is A Reward For The Righteous

Verily is an old word meaning truly or certainly.

David has spent this whole psalm describing corrupt injustice.

Here he lands on the opposite truth with full confidence.

Doing right will not go unnoticed or unrewarded forever.

✅ Verily means truly or certainly
📜 This psalm has described real injustice
🙌 David lands on the opposite truth
📖 Doing right is never unrewarded forever

## 🌍 He Is A God That Judgeth In The Earth

Every accusation in this psalm has been building toward this line.

Verse one asked whether human judges could judge with real honesty.

Here David answers that only God truly judges the earth.

Corrupt courts do not get the final word.

🌍 God judges the whole earth
❓ Verse one questioned human judges
✅ Only God truly judges with honesty
📖 Corrupt courts never get the final word
`.trim();

export const PSALMS_FIFTY_EIGHT_PERSONAL_SECTIONS = parsePsalmsFiftyEightRawNotes(PSALMS_FIFTY_EIGHT_RAW_NOTES);
