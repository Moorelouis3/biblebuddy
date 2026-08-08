export type JudgesTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesTwelveRawNotes(rawText: string): JudgesTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 12:${startVerse}` : `Judges 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Judges 12 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_TWELVE_RAW_NOTES = `
# Judges 12:1-3
# 🔥 Ephraim Threatens War
---
## 😠 The Men Of Ephraim Gathered Themselves Together

Ephraim was one of the twelve tribes of Israel, descended from Joseph's younger son.

This is not the first time Ephraim has shown up late and angry over being left out of a fight.

The exact same complaint happened to Gideon two judges earlier in this book.

A pattern is forming with this proud, powerful tribe.

😠 Ephraim was one of Israel's twelve tribes
🔁 They made this same complaint to Gideon
💪 Ephraim was proud of its size and strength
➡️ This pattern is about to turn violent

## 🧭 Went Northward

Northward describes the direction Ephraim's men traveled to reach Jephthah in Gilead.

Gilead sat east of the Jordan River, so this trip also meant crossing the river.

Ephraim's own land sat west of the Jordan, closer to the center of Israel.

Traveling this far to confront Jephthah shows how seriously they took the insult.

🧭 Northward marks their direction of travel
🌊 They also crossed the Jordan River
🗺️ Ephraim's own land sat to the west
➡️ The distance shows how serious their anger was

## 🔥 We Will Burn Thine House Upon Thee With Fire

This threat meant burning Jephthah alive inside his own home.

It was not a normal complaint between neighbors, it was a declaration of war.

Ephraim never actually helped fight Ammon, yet still demanded to share the credit.

Their anger was about wounded pride, not about justice.

🔥 The threat meant burning Jephthah alive
⚔️ This was a declaration of war
🙅 Ephraim never actually helped fight Ammon
➡️ Wounded pride, not justice, drove their anger

## ⚔️ I And My People Were At Great Strife

Strife means intense conflict, here referring to Gilead's war against Ammon.

Jephthah answers Ephraim's threat calmly, laying out the facts before defending himself.

He reminds them that Gilead alone was the one actually facing Ammon's army.

Jephthah is about to prove that he did try to include Ephraim.

⚔️ Strife means intense, dangerous conflict
🗣️ Jephthah answers calmly with facts first
🛡️ Gilead alone was facing Ammon's army
➡️ Jephthah is about to defend himself

## 📯 When I Called You, Ye Delivered Me Not Out Of Their Hands

This directly contradicts Ephraim's claim that Jephthah never called for their help.

Jephthah insists that he did call Ephraim, and they simply did not come.

The dispute now comes down to two very different memories of the same event.

Ephraim never gets a chance to answer this specific claim.

📯 Jephthah says he did call Ephraim
🙅 Ephraim simply failed to respond
🧠 The two sides remember events differently
➡️ Ephraim never answers this claim directly

## 🖐️ I Put My Life In My Hands

This idiom means Jephthah risked his own life without anyone else's help.

Left without support from Ephraim, he still chose to fight Ammon anyway.

The same phrase describes extreme risk elsewhere in the Old Testament.

Winning that fight alone now becomes his defense against Ephraim's anger.

🖐️ The idiom means risking one's own life
🎯 Jephthah fought alone, without Ephraim's help
🔁 The same phrase describes extreme risk elsewhere
📖 Winning alone becomes his defense here

# Judges 12:4-6
# 🗣️ The Shibboleth Test
---
## ⚔️ Jephthah Gathered Together All The Men Of Gilead

This is no longer a war against a foreign enemy, it is Israelite against Israelite.

Gilead was a region east of the Jordan, home to Jephthah's own people.

Ephraim's threat has pushed two tribes of the same nation into open battle.

The chapter shifts from national defense to a deeply personal grudge match.

⚔️ Israelites now fight fellow Israelites
🗺️ Gilead was Jephthah's own home region
💔 A threat sparked a civil war
➡️ National defense turned into a grudge match

## 🏃 Ye Gileadites Are Fugitives Of Ephraim

Fugitives here does not mean criminals on the run, it means deserters or outcasts.

Ephraim is insulting Gilead as a leftover, lesser branch of their own tribe.

This insult echoes the one Jephthah already faced from his own brothers back in chapter eleven.

Being called an outcast has now followed Jephthah into leading his own people.

🏃 Fugitives here means deserters or outcasts
😤 Ephraim is mocking Gilead's status
🔁 The same insult echoes Jephthah's own past
➡️ Old rejection follows him into leadership

## 🌊 The Gileadites Took The Passages Of Jordan

Passages here means the shallow river crossings where people could cross the Jordan on foot.

Controlling these fords meant controlling the only way home for Ephraim's fleeing soldiers.

Gilead turns the river itself into a trap for the retreating army.

Geography becomes a weapon in this battle between brother tribes.

🌊 Passages means the river's shallow crossings
🚧 Gilead now controls the only way home
🪤 The river becomes a trap for Ephraim
➡️ Geography turns into a weapon here

## ❓ Art Thou An Ephraimite? If He Said, Nay

Fleeing Ephraimites tried to deny their identity to cross the river safely.

A simple denial was not enough, since Gilead still needed real proof either way.

The next verse reveals exactly how Gilead planned to catch a lie.

A single word was about to decide who lived and who did not.

❓ Fleeing men denied being from Ephraim
🕵️ A denial alone was not proof
🔍 Gilead needed a way to test the truth
➡️ One word would decide life or death

## 🗣️ Say Now Shibboleth

Shibboleth is a Hebrew word usually meaning an ear of grain or a flowing stream.

The word's meaning barely mattered, what mattered was how it was pronounced.

Ephraim's dialect could not produce the sh sound found in Gilead's speech.

This single test is where the English word shibboleth comes from today.

🗣️ Shibboleth means grain or flowing stream
👂 Its meaning mattered less than its sound
🔤 Ephraim's dialect lacked the sh sound
📖 English still borrows this word today

## 👄 He Could Not Frame To Pronounce It Right

Frame here means shape or form, describing how the mouth produces a sound.

An Ephraimite's accent turned the sh sound into a plain s sound instead.

Sibboleth instead of Shibboleth was a small difference that could not be hidden.

A single letter of pronunciation became a matter of life and death.

👄 Frame means to shape or form
🔤 The sh sound came out as s
🎯 A tiny sound difference gave them away
➡️ Pronunciation alone decided who lived

## 📊 Forty And Two Thousand

This number counts the Ephraimites killed at the river crossings alone.

That is close to the population of an entire town lost in one conflict.

The number shows how far Ephraim's pride and threats had cost them.

A quarrel that began with a burned house threat has ended in disaster.

📊 Forty two thousand died at the crossings
🏘️ That is close to a whole town's population
💔 Pride and threats cost Ephraim dearly
➡️ A threat of fire ended in disaster

# Judges 12:7
# ⚰️ Jephthah Dies
---
## 👑 Jephthah Judged Israel Six Years

Judged here means Jephthah led and governed Israel, not only settled court cases.

Six years is a short reign compared to some judges named earlier in this book.

His leadership began in rejection and ended after one costly, bittersweet victory.

The outcast who once fled to Tob died as Israel's recognized leader.

👑 Judged means he led and governed Israel
⏳ Six years was a short reign
💔 His leadership began in rejection
📖 An outcast died as Israel's leader

## ⚰️ Was Buried In One Of The Cities Of Gilead

The text does not name the exact city where Jephthah was buried.

Many scholars believe this vagueness simply reflects how ordinary his burial was compared to other leaders.

Gilead was the region tied to his birth, his exile, and his rise to power.

His whole story begins and ends inside that same rough border land.

⚰️ The exact burial city is not named
📜 Many scholars see this as an ordinary burial
🗺️ Gilead framed his birth, exile, and rise
➡️ His story begins and ends in one place

# Judges 12:8-10
# 👨‍👩‍👧‍👦 Ibzan Judges Israel
---
## 🏙️ Ibzan Of Bethlehem Judged Israel

This Bethlehem was likely a town in the tribe of Zebulun, not the famous Bethlehem in Judah.

Two different towns shared the same name, a common pattern across ancient Israel.

Ibzan is one of several judges the book covers in only a few short verses.

A short record still means his leadership was real and worth preserving.

🏙️ This Bethlehem was likely in Zebulun
🔀 Two towns shared the same name
📏 His record here is brief but real
➡️ A short entry still marks real leadership

## 👨‍👩‍👧‍👧 He Had Thirty Sons, And Thirty Daughters

A family this large was a public sign of wealth, status, and influence.

Sixty children meant sixty marriages to arrange across many different families.

Numbers like these mark a judge's success without needing to describe a single battle.

Not every judge in this book is remembered for fighting a war.

👨‍👩‍👧‍👧 Sixty children signaled wealth and status
🤝 Each child meant another family alliance
⚖️ Success here is measured without any battle
📖 Not every judge is remembered for war

## 🤝 Whom He Sent Abroad, And Took In Thirty Daughters From Abroad

Ibzan arranged marriages outside his own town for all sixty of his children.

Marriages like these often built political and social alliances between different clans or towns.

Sending children out and bringing others in wove Ibzan's family into a much wider network.

Family connections could carry as much influence in Israel as any army.

🤝 Ibzan arranged marriages outside his town
🔗 These marriages likely built political alliances
🕸️ His family became part of a wider network
➡️ Family ties carried real, lasting influence

# Judges 12:11-12
# 🏞️ Elon Judges Israel
---
## 🏞️ Elon, A Zebulonite, Judged Israel

A Zebulonite was a member of the tribe of Zebulun, settled in northern Israel.

Elon's entire recorded story fits inside two short verses of this chapter.

The book of Judges does not measure every leader by the length of his story.

Faithful, quiet leadership still earned Elon a place in Israel's history.

🏞️ Zebulonite means from the tribe of Zebulun
📏 His whole story fits two verses
⚖️ Judges does not measure leaders only by length
➡️ Quiet leadership still earned him a place

## ⏳ Elon The Zebulonite Died, And Was Buried In Aijalon

This Aijalon sat in the territory of Zebulun, a different place from the better known Aijalon in Dan.

Two towns sharing one name shows why place names always needed their region named alongside them.

Ten years of leadership closes with a burial in his own tribe's own land.

Even a brief record ties a leader firmly to his own people.

⏳ This Aijalon sat in Zebulun's territory
🔀 A different town shares that same name
🗺️ He was buried among his own tribe
📖 Even a brief record names his home

# Judges 12:13-15
# 🐴 Abdon Judges Israel
---
## 👑 Abdon The Son Of Hillel, A Pirathonite Judged Israel

Pirathonite means Abdon came from Pirathon, a town in the hill country of Ephraim.

He is the last of the six judges covered in this short closing chapter.

His story, like Ibzan's and Elon's, is told through numbers rather than a battle scene.

Wealth and family size become the marks of his leadership here.

👑 Pirathonite means from the town of Pirathon
🏔️ Pirathon sat in Ephraim's hill country
📜 He is the last judge in this chapter
➡️ Numbers, not battles, tell his story

## 👨‍👧 He Had Forty Sons And Thirty Nephews

Nephews here follows an older use of the word, meaning grandsons rather than a brother's sons.

Seventy male descendants across two generations was an enormous, thriving family line.

A family this size marked Abdon as a wealthy and deeply respected leader.

The size of his household spoke for him without a single battle needing to be told.

👨‍👧 Nephews here likely means grandsons
👨‍👩‍👧‍👦 Seventy descendants spanned two generations
💰 This size marked real wealth and honor
➡️ His household spoke without any battle

## 🐴 That Rode On Threescore And Ten Ass Colts

Threescore and ten means seventy, matching the seventy sons and grandsons named just before.

Riding a donkey colt, rather than walking, was a visible mark of wealth and rank.

Jair's own thirty sons rode the very same kind of animal earlier in this book.

Every son and grandson riding his own colt showed the whole family's standing at once.

🐴 Threescore and ten means seventy
💎 Riding a donkey colt marked wealth
🔁 Jair's sons rode the same animal earlier
📖 The whole family's standing showed at once

## 🏔️ Buried In Pirathon, In The Mount Of The Amalekites

This hill country in Ephraim carried the name of the Amalekites, an old enemy of Israel.

The name likely remained from an earlier Amalekite presence or raid in that same region.

A place named for a former enemy became the resting place of an Israelite leader.

Abdon's burial closes this chapter's quiet run of six judges named without a single war story.

🏔️ The hill country bore the Amalekites' name
⚔️ Amalek was an old enemy of Israel
🕊️ A former enemy's namesake became his resting place
📖 This chapter closes six judges without war
`.trim();

export const JUDGES_TWELVE_PERSONAL_SECTIONS = parseJudgesTwelveRawNotes(JUDGES_TWELVE_RAW_NOTES);
