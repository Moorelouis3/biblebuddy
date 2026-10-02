export type EzekielFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielFifteenRawNotes(rawText: string): EzekielFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 15:${startVerse}` : `Ezekiel 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Ezekiel 15 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_FIFTEEN_RAW_NOTES = `# Ezekiel 15:1-5
# 🍷 The Useless Vine Wood
---
## 📜 The Word Of The LORD Came Unto Me

This exact phrase opens many of Ezekiel's messages.

It marks the words that follow as God speaking, not Ezekiel's own idea.

The prophet becomes a messenger, not the author.

Every parable in this chapter carries that same weight.

📜 This phrase marks a message from God
🗣️ Ezekiel speaks as a messenger only
⚖️ The words carry God's own authority
📖 What follows is not Ezekiel's opinion

## 👤 Son Of Man

"Son of man" is God's regular way of addressing Ezekiel.

It never flatters him with a title of honor.

It simply calls him a mortal, dust and breath like anyone else.

God speaks to His prophet as a man, not an equal.

👤 Son of man means an ordinary mortal
🚫 It carries no special honor
🌬️ Ezekiel is dust and breath
📖 God speaks to him as a man

## ❓ What Is The Vine Tree More Than Any Tree

This question expects one answer, none at all.

A vine is not stronger, taller, or sturdier than a forest tree.

Grapevines grow thin and twisted, built for climbing, not building.

God starts this parable by comparing something weak to something strong.

❓ The question expects the answer none
🍇 A vine is not sturdier than a tree
🌲 Forest trees are strong, vines are not
📖 God compares something weak to something strong

## 🌳 A Branch Which Is Among The Trees Of The Forest

A forest held tall, useful timber trees all around it.

A grapevine was never grown for lumber in the first place.

Vine wood is soft, bent, and full of twists.

Even standing beside real trees, it was never in their class.

🌳 Forests held strong, useful timber trees
🍇 Vines were never grown for lumber
🌀 Vine wood grows soft and twisted
📖 It never belonged in the same class

## 🔨 Shall Wood Be Taken Thereof To Do Any Work

"Any work" here means real construction, beams, boards, tools.

Vine wood could not be shaped into something sturdy.

It bends and splits instead of holding weight.

No builder in Israel would ever reach for a grapevine branch.

🔨 Any work means real construction use
🪵 Vine wood will not hold weight
🙅 It bends and splits instead
📖 No builder would choose a vine branch

## 📌 Will Men Take A Pin Of It To Hang Any Vessel Thereon

A "pin" here means a small wooden peg.

Ordinary households used pegs like this to hang pots and tools on a wall.

Even that small, simple job was too much for vine wood.

The question is almost insulting on purpose.

📌 A pin means a small wooden peg
🏠 Homes used pegs to hang tools
🙅 Vine wood fails even that small job
📖 It fails even the smallest task

## 🔥 It Is Cast Into The Fire For Fuel

Fuel is the one honest use for this wood.

It cannot build, and it cannot even hang a pot.

Burning is the only job left for it.

Good timber trees become firewood eventually too.

Vine wood never had anything better to offer.

🔥 Fuel is its one honest use
🙅 It cannot build or hang anything
🪵 Burning is the only job left
📖 Useless wood still ends in the fire

## 🔥 The Fire Devoureth Both The Ends Of It, And The Midst Of It Is Burned

"Devoureth" is an old word for eating something completely up.

Picture a log burnt black at both ends.

The middle section is scorched too, not just the tips.

Nothing about this stick is left whole or useful.

🔥 Devoureth means eaten up completely
🪵 Both ends burn black first
🌑 The middle gets scorched too
📖 Nothing is left whole or useful

## ✅ When It Was Whole, It Was Meet For No Work

"Meet" is an old word for fit or suitable.

Even whole and never touched by fire, this wood had no real use.

Burning only makes an already useless thing more useless.

The parable's whole point rests on this one line.

✅ Meet means fit or suitable
🪵 Whole wood already had no use
🔥 Burning only adds to the waste
📖 One useless thing becomes more useless still

# Ezekiel 15:6-8
# 🏙️ Jerusalem Becomes The Vine
---
## 🍷 So Will I Give The Inhabitants Of Jerusalem

The parable was never really about trees.

God now names exactly who it was about all along, the people of Jerusalem.

They were never meant for strength or special status either.

Like the vine wood, their only remaining use is judgment by fire.

🍷 The vine was always about Jerusalem
🏙️ God names the city directly now
🔥 Their only remaining use is judgment
📖 The parable turns into a verdict

## 👁️ I Will Set My Face Against Them

"Set my face against" is a way of saying direct, personal opposition.

This is not distant anger from far away.

God turns His full attention toward judging them Himself.

The same phrase appears earlier in Ezekiel fourteen against a false prophet.

👁️ Set my face means direct opposition
🎯 God turns His full attention here
🔁 The same phrase appeared in chapter fourteen
📖 This judgment is personal, not distant

## 🔥 They Shall Go Out From One Fire, And Another Fire Shall Devour Them

This does not describe one quick disaster.

It pictures someone surviving one danger only to meet a second one.

Jerusalem would face the Babylonian siege, and later exile after that.

There was no safe escape route built into this judgment.

🔥 This pictures two dangers, not one
🏃 Surviving the first did not mean safety
⚔️ Siege and exile both lay ahead
📖 No escape route was left open

## 🔁 Ye Shall Know That I Am The LORD

This exact phrase repeats constantly across the whole book of Ezekiel.

Judgment here was never random cruelty.

It was meant to prove something true about who God is.

Even painful events were designed to reveal His identity clearly.

🔁 This phrase repeats all through Ezekiel
🎯 Judgment here had a real purpose
🪞 It reveals who God truly is
📖 Even pain can reveal God's identity

## 🏜️ I Will Make The Land Desolate

"Desolate" means emptied out and left in ruins.

This points forward to Jerusalem's real destruction by Babylon.

Fields, homes, and city walls would all stand abandoned.

The image of burnt vine wood becomes an entire burnt land.

🏜️ Desolate means emptied and ruined
🏙️ This points to Jerusalem's real fall
🏠 Homes and walls would stand abandoned
📖 One burnt stick becomes a whole land

## ⚖️ Because They Have Committed A Trespass

"Trespass" names a specific, real sin, not bad luck.

Ezekiel fourteen already named idolatry as that exact sin.

This judgment was never about randomness or uncontrolled anger.

A real cause stood behind every part of this parable.

⚖️ Trespass names a specific real sin
🪨 Chapter fourteen already named that sin
🎯 Judgment here was never random
📖 A real cause stood behind the parable
`.trim();

export const EZEKIEL_FIFTEEN_PERSONAL_SECTIONS = parseEzekielFifteenRawNotes(EZEKIEL_FIFTEEN_RAW_NOTES);
