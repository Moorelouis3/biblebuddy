export type EzekielNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielNineRawNotes(rawText: string): EzekielNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 9:${startVerse}` : `Ezekiel 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Ezekiel 9 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_NINE_RAW_NOTES = `# Ezekiel 9:1-4
# ✍️ Six Men And A Mark
---
## 📢 He Cried Also In Mine Ears With A Loud Voice

He here picks up the same glorious figure Ezekiel saw back in chapter eight.

That figure sits above God's throne and speaks with full authority.

A loud voice in a vision like this signals an urgent command.

What comes next is a summons, not a simple suggestion.

📢 He refers to the figure from chapter eight
👑 That figure speaks with full authority
⚠️ A loud voice signals urgency here
📖 What follows is a summons to act

## ⚔️ Every Man With His Destroying Weapon In His Hand

A destroying weapon is a tool built only to kill, not an everyday object.

These six men are not Jerusalem's human guards or soldiers.

They are heavenly agents sent to carry out God's own sentence.

Each one arrives already equipped for the exact task given to him.

⚔️ Destroying weapon means a killing tool
👤 These are not human city guards
👼 They are heavenly agents of judgment
📖 Each one arrives ready for his task

## 🧭 Six Men Came From The Way Of The Higher Gate

The higher gate sat on the north side of the temple complex.

North was the direction tied to danger and invasion throughout Ezekiel's visions.

Six men matches six weapons of judgment, one executioner for each.

Where they entered from already hints at what they came to do.

🧭 The higher gate faced north
⚠️ North pictured danger in these visions
🔢 Six men matches six weapons
📖 Their entry already hints at judgment

## 🖋️ One Man Among Them Was Clothed With Linen, With A Writer's Inkhorn By His Side

Linen was the fine white cloth worn by priests serving in the temple.

An inkhorn was a small container of ink carried by ancient scribes.

This seventh man stands apart from the six armed executioners beside him.

His job is to write and mark, not to strike anyone down.

🖋️ Linen was the cloth priests wore
📜 An inkhorn held a scribe's ink
👤 This man stands apart from the six
📖 He marks instead of striking

## 🪨 They Went In, And Stood Beside The Brasen Altar

The brasen altar was the bronze altar used for the temple's daily sacrifices.

Chapter eight already showed an idol standing at the gate to this same altar.

The seven messengers now gather at the exact spot sin had already reached.

God directs this vision back to the place where worship first went wrong.

🪨 The brasen altar was for sacrifice
🗿 An idol once stood at its gate
📍 The messengers gather at that same spot
📖 Judgment returns to where sin began

## ✨ The Glory Of The God Of Israel Was Gone Up From The Cherub

Glory here means God's visible presence and the weight of his holiness.

The cherub refers to the throne like chariot Ezekiel saw in chapter one.

God's presence lifting off its resting place is never a small detail in this book.

This is the first step of a departure that will take several chapters to finish.

✨ Glory means God's visible presence
🪑 Cherub refers to his throne like chariot
🚶 This is only the first step
📖 God's presence is beginning to leave

## 📣 He Called To The Man Clothed With Linen

He still refers to the glory of the God of Israel named in the line before.

God speaks directly to the man holding the inkhorn first.

He does not speak first to the six men carrying weapons.

Mercy speaks before judgment acts.

📣 He refers to God's glory again
✍️ God speaks to the scribe first
🙅 Not to the six armed men
📖 Mercy speaks before judgment acts

## 🚶 Go Through The Midst Of The City, Through The Midst Of Jerusalem

Midst means the very middle of something, not just its edges.

The phrase through the midst is repeated twice in a single line.

Repetition like this in Hebrew writing usually signals strong emphasis, not an accident.

No street or neighborhood in Jerusalem is meant to be skipped.

🚶 Midst means the very middle
🔁 The phrase repeats on purpose
📢 Repetition signals strong emphasis
📖 No part of the city is skipped

## ✍️ Set A Mark Upon The Foreheads Of The Men That Sigh And That Cry

A mark here was a visible symbol placed onto the skin.

Many scholars believe it was shaped like the Hebrew letter tav.

That letter looked like a simple cross or an X.

It recalls the blood placed on doorposts the night the Lord passed over Egypt.

The mark went only to those who grieved over the sin around them.

Grieving over sin was what set them apart.

✍️ A mark was a visible symbol
✝️ Many scholars see the letter tav
🩸 It recalls the blood on doorposts
📖 Grief over sin set them apart

# Ezekiel 9:5-7
# 💀 Judgment Begins At The Sanctuary
---
## ⚔️ Go Ye After Him Through The City, And Smite

Him refers to the man clothed with linen who just received his task.

The six armed men are told to follow his exact path.

Smite means to strike with force.

Here that force means to kill.

The six never act ahead of the one doing the marking.

⚔️ Him refers to the man with the inkhorn
🚶 The six follow his exact path
💥 Smite means to strike and kill
📖 Marking always comes before striking

## 🙅 Let Not Your Eye Spare, Neither Have Ye Pity

To spare means to hold back a punishment that is already deserved.

Pity means a feeling of sympathy strong enough to stop someone from acting.

The command removes both as an option for these six men.

This judgment was not going to be softened at the last moment.

🙅 Spare means holding back punishment
💔 Pity means sympathy that stops action
🚫 Both are removed as an option
📖 This judgment will not be softened

## 👥 Slay Utterly Old And Young, Both Maids, And Little Children, And Women

This list names every age and group among the people without the mark.

It does not mean every single person in Jerusalem without exception.

The very next line protects anyone who already carries that mark.

The severity named here shows how serious the sin had become.

👥 Names every age and group present
🙅 Not literally every person without exception
✍️ The mark already given protects some
📖 The severity shows how serious the sin was

## ✋ But Come Not Near Any Man Upon Whom Is The Mark

The mark placed in verse four comes with a guarantee attached to it.

Whoever carries it stays safe no matter what is happening around him.

Grace was decided before judgment ever reached the city.

The mark does more than identify someone.

It genuinely protects him too.

✋ The mark carries a guarantee
🛡️ Carriers stay safe in the chaos
🕊️ Grace was decided before judgment
📖 Marking protects, not just identifies

## 🏛️ And Begin At My Sanctuary

My sanctuary means God's own temple, the most sacred building in Jerusalem.

The command tells the six men exactly where to strike first.

God does not excuse his own people from the standard he holds others to.

Those closest to him are held to the highest account, not the lowest.

🏛️ Sanctuary means God's own temple
🥇 It is struck first, not last
⚖️ God holds his own people accountable
📖 Closeness to God raises the standard

## 👴 Then They Began At The Ancient Men Which Were Before The House

These ancient men were very likely the same elders described in chapter eight.

They were the ones secretly burning incense to idols inside that hidden room.

The leaders who led Israel into sin are the first ones judgment reaches.

Their punishment matches the exact sin that started this entire vision.

👴 Likely the same elders from chapter eight
🙈 They led secret idol worship
🥇 Leaders are judged first here
📖 Their punishment matches their sin

## 🏚️ Defile The House, And Fill The Courts With The Slain

To defile a building means to make it ceremonially unclean for holy use.

Dead bodies inside a holy space were considered deeply unclean under Israel's law.

The very courts once reserved for worship are now ordered filled with corpses.

These leaders had already defiled the temple once with their idols.

Now it is defiled again, this time with the dead.

🏚️ Defile means made ceremonially unclean
💀 Dead bodies made a space unclean
🗿 The temple was defiled by idols first
📖 Now it is defiled again by death

## 🚶 They Went Forth, And Slew In The City

The six men leave the temple grounds and head into the wider city.

What began inside the sanctuary does not stay contained there.

The sin that filled Jerusalem outside the temple gets judged outside it too.

No part of the city was meant to be left untouched.

🚶 They leave the temple grounds
🏙️ Judgment spreads into the city
🌆 Outside sin gets judged outside too
📖 No part of the city is untouched

# Ezekiel 9:8-11
# 🙏 Ezekiel Pleads, And God Answers
---
## 🙇 I Was Left, That I Fell Upon My Face, And Cried

Being left means Ezekiel was not handed a weapon of his own.

He was also never struck down like the people being judged nearby.

Falling on his face was a posture of desperate pleading before God.

Ezekiel stands here as a witness and an intercessor, not an executioner.

🙇 Left means given no weapon
🛡️ He was not struck down either
🙏 Falling down showed desperate pleading
📖 He stands as a witness, not a killer

## 😢 Ah Lord GOD! Wilt Thou Destroy All The Residue Of Israel

Residue means what is left over after most of something is already gone.

Ezekiel is asking whether even the small remnant of his people will be wiped out.

His question echoes Abraham pleading for Sodom and Moses pleading after the golden calf.

A true prophet does not celebrate judgment.

He grieves over it instead.

😢 Residue means what is left over
❓ He asks if even the remnant dies
🙏 His plea echoes Abraham and Moses
📖 A real prophet grieves over judgment

## ⚖️ The Iniquity Of The House Of Israel And Judah Is Exceeding Great

By this point, the northern kingdom of Israel had already fallen to Assyria.

Naming Israel alongside Judah points back to the sin of the whole nation.

Iniquity means guilt that has built up over a long period of time.

This was never just one bad generation.

It was a pattern that built up over many years.

⚖️ Iniquity means guilt built up over time
🗺️ Israel and Judah together mean the whole nation
📜 Israel had already fallen to Assyria
📖 This guilt built up over many years

## 🩸 The Land Is Full Of Blood, And The City Full Of Perverseness

Blood here stands for violence done against other people.

Perverseness means twisting what is right until it looks wrong.

These are two separate charges, not one repeated complaint.

Both violence and corrupted judgment had spread through the whole land.

🩸 Blood here means violence and injustice
🔀 Perverseness means twisting right into wrong
⚖️ These are two separate charges
📖 Both had spread through the whole land

## 🙈 The LORD Hath Forsaken The Earth, And The LORD Seeth Not

This sentence is not God describing himself.

It is the exact lie the people in chapter eight were already telling themselves.

They believed secret sin was safe because no one above was watching.

This entire vision proves that claim completely false.

🙈 Not God describing himself here
🗣️ It is the people's own false claim
🙉 They believed no one was watching
📖 This vision proves that claim false

## 👁️ Mine Eye Shall Not Spare, Neither Will I Have Pity

This exact command already appeared once from God's own mouth back in verse five.

Repeating it here through God's own voice confirms it was never just a one time order.

The same standard given to the executioners applies to God's own verdict as well.

There is no difference between what God commands and what God himself will do.

👁️ This command already appeared in verse five
🔁 Repeating it confirms it still stands
⚖️ God holds himself to his own standard
📖 He commands exactly what he will do

## ⚖️ I Will Recompense Their Way Upon Their Head

Recompense means to pay back in full.

It means giving something its exact weight.

Their way means the path and choices they themselves chose to walk.

Upon their head is an old way of saying consequences land on the one responsible.

God is not inventing new punishment here.

He is simply returning what their own sin already earned.

⚖️ Recompense means paying back in full
🚶 Their way means their own choices
🎯 Upon their head means consequences return
📖 God returns what their sin earned

## ✅ Reported The Matter, Saying, I Have Done As Thou Hast Commanded Me

The man with the inkhorn returns to confirm that his task is finished.

He marked everyone who genuinely grieved over Jerusalem's sin.

His simple report closes out the marking half of this vision.

The next chapter shows judgment moving even further through the city.

✅ The marking task is now finished
✍️ He marked everyone who truly grieved
📋 His report closes this part of the vision
📖 The next chapter moves judgment further
`.trim();

export const EZEKIEL_NINE_PERSONAL_SECTIONS = parseEzekielNineRawNotes(EZEKIEL_NINE_RAW_NOTES);
