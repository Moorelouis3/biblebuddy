export type PsalmsTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsTwentyEightRawNotes(rawText: string): PsalmsTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 28:${startVerse}` : `Psalms 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 28 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_TWENTY_EIGHT_RAW_NOTES = `# Psalms 28:1-3
# 🪨 Unto Thee Will I Cry
---
## 🪨 O LORD My Rock

"Rock" here is a title David gives to God, not a description of scenery.

A rock does not move, crack, or crumble under weight.

David is saying God is the one steady thing he can stand on.

This title shows up again and again through David's psalms because it never stopped being true.

🪨 Rock is a title for God
🧱 A rock does not move or crumble
🦶 God is what David stands on
📖 David returns to this title often

## 😶 Be Not Silent To Me

David is not just afraid of danger, he is afraid of being ignored.

Silence from God would feel worse than any enemy.

He compares that silence directly to the fear of death in the next line.

Naming that fear out loud is itself an act of trust.

😶 David fears being ignored by God
💀 He compares silence to death itself
🗣️ Naming the fear is an act of trust
📖 Silence would hurt more than any enemy

## 🕳️ Like Them That Go Down Into The Pit

"The pit" is an Old Testament picture of the grave, not a hole in the ground.

It describes the place of the dead, cut off from the living.

David is asking God to answer him now, not after it is too late.

The fear here is not vague, it is the fear of dying unheard.

🕳️ The pit means the grave
⚰️ It is the place of the dead
⏳ David wants an answer now
📖 He fears dying unheard

## ✋ Toward Thy Holy Oracle

"Oracle" here refers to the innermost room of the tabernacle, the Holy of Holies.

That was the one place God's presence dwelt above the ark.

Lifting up hands was the normal posture for prayer in David's day.

David prays facing the exact place where he believed God was truly present.

✋ Lifting hands was a normal prayer posture
🕍 Oracle means the Holy of Holies
📦 God's presence dwelt there above the ark
📖 David prays facing where God was present

## 🌊 Draw Me Not Away With The Wicked

"Draw away" pictures being pulled along with a crowd toward the same fate.

David is not asking to avoid the wicked, he is asking not to share their judgment.

The wicked here are workers of iniquity, people who make harm their steady practice.

David wants his own faithfulness recognized, not blame for someone else's sin.

🌊 Draw away means pulled along with them
⚖️ David asks not to share their judgment
🛠️ Workers of iniquity means harm as a practice
📖 He wants his own faithfulness recognized

## 🎭 But Mischief Is In Their Hearts

David describes people whose words and hearts do not match.

"Speak peace" means offering kind, friendly words on the surface.

"Mischief in their hearts" means real harm is being planned underneath.

David is asking not to be swept away with people like that when judgment comes.

🎭 Their words and hearts do not match
🕊️ Speak peace means friendly words on the surface
🗡️ Mischief means harm planned underneath
📖 David asks not to share their fate

# Psalms 28:4-6
# ⚖️ Render To Them Their Desert
---
## ⚖️ Render To Them Their Desert

"Desert" here does not mean a dry wilderness.

It means what a person has earned or deserves.

David is asking God to pay back the wicked exactly what their actions have earned.

This is a prayer for justice, not personal revenge.

⚖️ Desert here means what is deserved
🏜️ It does not mean a wilderness
📜 David asks God to repay their deeds
📖 This is a prayer for justice

## 🙈 They Regard Not The Works Of The LORD

"Regard" means to pay real attention to something and take it seriously.

These people saw what God had done and refused to let it change them.

This is not simple ignorance, it is a choice to look away.

David treats that refusal as the real root of their wickedness.

🙈 Regard means paying real attention
👀 They saw God's works and ignored them
🚫 Their ignoring was a choice
📖 That choice is the root of their sin

## 🏗️ He Shall Destroy Them, And Not Build Them Up

"Build up" is an image of a house or a life being made secure.

David says the wicked will get the opposite of that.

Instead of being established, they will be torn down completely.

The same God who builds His people up will not build up those who reject Him.

🏗️ Build up means made secure and established
🧨 The wicked get the opposite instead
🏚️ They will be torn down completely
📖 God builds up only those who seek Him

## 🎶 Because He Hath Heard The Voice Of My Supplications

"Supplications" means urgent, pleading requests, not casual prayers.

This line marks a turn, David has moved from asking to praising.

He does not wait for the danger to fully pass before giving thanks.

Knowing God heard him is enough to change the whole tone of the psalm.

🎶 Supplications means urgent pleading prayers
🔄 The psalm turns from asking to praising
⏩ David gives thanks before danger passes
📖 Being heard already changes his whole tone

# Psalms 28:7-9
# 🛡️ The LORD Is My Strength And My Shield
---
## 🛡️ My Strength And My Shield

"Strength" means the power that keeps David standing at all.

"Shield" means active protection from an attack, not passive safety.

Together the two describe a God who both holds David up and defends him.

David needs both, the power to endure and the protection to survive.

💪 Strength means the power to keep standing
🛡️ Shield means active protection from attack
🤝 God both holds him up and defends him
📖 David needs both endurance and protection

## 🤝 My Heart Trusted In Him, And I Am Helped

"Trusted" describes a decision already made, not a feeling still forming.

David states the help itself as something that already happened.

That trust came before the help arrived, not after.

His confidence rests on a choice, not a guarantee he could see in advance.

🤝 Trusted means a decision already made
✅ Help is described as already done
⏮️ Trust came before the help arrived
📖 Confidence rests on a choice, not proof

## 🎵 With My Song Will I Praise Him

David's response to being helped is not silence, it is song.

"My song" points to a specific act of worship, not just a feeling.

Praise here is spoken and public, not something kept inside.

Being helped by God moves naturally into thanking Him out loud.

🎵 Song means a specific act of worship
📣 Praise here is spoken, not just felt
🙏 Help moves naturally into thanks
📖 David worships out loud, not silently

## 👑 The Saving Strength Of His Anointed

"Anointed" means someone set apart for a role by having oil poured on their head.

Kings and priests were anointed this way in the Old Testament.

David the king is God's anointed here, the one God specifically protects.

The word "anointed" is also where the later title "Christ" comes from.

👑 Anointed means set apart with oil
🤴 Kings and priests were anointed this way
🛡️ David the king is God's anointed
📖 Anointed is also where Christ comes from

## 🐑 Feed Them Also, And Lift Them Up For Ever

"Feed" here is shepherd language, not a request for a single meal.

A shepherd fed, guided, and protected the flock every single day.

David asks God to shepherd the whole nation the same way God has shepherded him.

This is the same picture David uses in Psalm 23, where the LORD is his own shepherd.

🐑 Feed is shepherd language
🧑‍🌾 A shepherd guides and protects daily
🇮🇱 David asks God to shepherd the nation
📖 This echoes Psalm 23's shepherd image
`.trim();

export const PSALMS_TWENTY_EIGHT_PERSONAL_SECTIONS = parsePsalmsTwentyEightRawNotes(PSALMS_TWENTY_EIGHT_RAW_NOTES);
