export type EcclesiastesFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEcclesiastesFourRawNotes(rawText: string): EcclesiastesFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EcclesiastesFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ecclesiastes\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ecclesiastes 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ecclesiastes\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Ecclesiastes\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ecclesiastes 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ecclesiastes 4:${startVerse}` : `Ecclesiastes 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Ecclesiastes 4 sections, received " + sections.length);
  }

  return sections;
}

const ECCLESIASTES_FOUR_RAW_NOTES = `# Ecclesiastes 4:1-3
# 😢 Tears With No Comforter
---
## 😢 Behold The Tears Of Such As Were Oppressed

"Oppressed" means people treated unjustly by those with power over them.

The Preacher takes a hard, honest look at real suffering here.

He does not look away from pain the way earlier chapters looked away from vanity.

No one steps in to comfort these people at all.

😢 Oppressed means treated unjustly
👀 The Preacher looks straight at suffering
🚫 No one steps in to help
📖 Real pain gets named honestly

## ⚖️ On The Side Of Their Oppressors There Was Power

Power sat entirely on one side of this situation.

The people doing the oppressing held all the leverage.

Nothing balanced the scales in favor of the victims.

This describes exactly why the suffering never gets fixed.

⚖️ Power sat only on one side
💪 Oppressors held all the leverage
🚫 Nothing balanced the scales
📖 That imbalance is why the pain continues

## 💀 Praised The Dead Which Are Already Dead More Than The Living

This is a shocking statement to say out loud.

The Preacher says being dead beats watching this kind of injustice happen.

He is not glorifying death itself here.

He is measuring how unbearable this oppression actually is.

💀 A shocking statement to say aloud
😢 Death seems better than watching injustice
🚫 Not glorifying death for its own sake
📖 It measures how unbearable oppression feels

## 🚫 Better Is He Than Both They, Which Hath Not Yet Been

This pushes the thought even further than the last verse.

Someone never born never had to witness any of this cruelty.

The Preacher ranks nonexistence above both life and death here.

It is one of the darkest lines in the whole book.

🚫 Never being born avoids witnessing cruelty
📉 Ranked above both life and death
😔 One of the darkest lines here
📖 Oppression is that heavy to the Preacher

## ☀️ Who Hath Not Seen The Evil Work That Is Done Under The Sun

"Under the sun" is the Preacher's repeated phrase for ordinary earthly life.

The evil work refers back to the oppression just described.

Someone unborn escapes seeing any of it at all.

The phrase ties this dark moment back to the whole book's theme.

☀️ Under the sun means ordinary earthly life
😔 Evil work refers to the oppression
🚫 The unborn escape seeing any of it
📖 Ties back to the book's whole theme

# Ecclesiastes 4:4-6
# 😩 Envy, Folly, And A Full Hand
---
## 😩 All Travail, And Every Right Work

"Travail" means hard, exhausting labor.

"Right work" means work done skillfully and well.

The Preacher notices that skill and effort do not go unnoticed by others.

Doing something well invites attention, and attention often invites envy.

😩 Travail means exhausting labor
🛠️ Right work means skillful work
👀 Skill draws attention from others
📖 Attention often invites envy

## 💼 A Man Is Envied Of His Neighbour

Doing good work can make the people around you jealous instead of glad.

This flips the expected reward for hard work upside down.

Success becomes a source of tension rather than simple satisfaction.

The Preacher calls this reaction vanity and vexation of spirit.

💼 Good work can spark jealousy
🔄 Flips the expected reward upside down
😤 Success becomes a source of tension
📖 Called vanity and vexation of spirit

## 🙅 The Fool Foldeth His Hands Together, And Eateth His Own Flesh

Folding the hands together is a picture of complete idleness.

"Eateth his own flesh" is a vivid way of describing self destruction.

The fool avoids the envy problem from the last verse by refusing to work at all.

His solution creates a worse problem than the one he was avoiding.

🙅 Folded hands means complete idleness
😬 Eateth his own flesh means self destruction
🔄 Avoids envy by refusing to work
📖 His fix is worse than the problem

## 🤲 Better Is An Handful With Quietness

A handful represents having just enough, not an abundance.

"Quietness" describes a calm, peaceful state of mind.

The Preacher weighs a small amount of peace against two full hands of stress.

He picks the smaller portion every time.

🤲 A handful means just enough
😌 Quietness means calm and peaceful
⚖️ Weighed against two full hands of stress
📖 The smaller portion wins every time

# Ecclesiastes 4:7-8
# 🔁 Vanity Of The Man Alone
---
## 🔄 Then I Returned, And I Saw Vanity Under The Sun

The Preacher shifts his attention to a brand new example here.

"Returned" signals he is circling back to his ongoing search for meaning.

This short verse introduces the case study that follows.

It sets up one of the most personal pictures in the whole chapter.

🔄 Returned signals a new example
🔍 Continues his ongoing search
📝 Introduces the case study ahead
📖 One of the chapter's most personal pictures

## 👤 There Is One Alone, And There Is Not A Second

This describes a person with no spouse, no partner, no one beside him.

"Neither child nor brother" removes every close family relationship as well.

The Preacher pictures someone completely isolated from other people.

This isolation becomes the whole point of the example.

👤 Describes someone completely alone
👪 No spouse, child, or brother
🚫 Every close relationship removed
📖 Isolation is the whole point here

## 🌀 Yet Is There No End Of All His Labour

This man works constantly despite having no one to work for.

His labor never reaches a finish line or a resting point.

Wealth keeps growing, but the growth never satisfies him.

Work without relationship becomes an endless, hollow cycle.

🔄 Work never reaches a finish line
💰 Wealth keeps growing without satisfaction
🕳️ Becomes a hollow, endless cycle
📖 Work without relationship never fills the gap

## 😔 For Whom Do I Labour, And Bereave My Soul Of Good

"Bereave" means to deprive someone of something valuable.

The man never even stops to ask himself this obvious question.

He is depriving his own soul of good things and does not notice.

The Preacher calls this whole pattern vanity and a sore travail.

😔 Bereave means to deprive someone
❓ He never asks the obvious question
💔 He deprives his own soul of good
📖 Called vanity and a sore travail

# Ecclesiastes 4:9-12
# 🤝 Two Are Better Than One
---
## 🤝 Two Are Better Than One

This verse directly answers the lonely man from the verses just before.

Partnership brings a reward that isolation simply cannot produce.

The Preacher now builds a short list of reasons why.

Four separate pictures follow to prove the point.

🤝 Directly answers the lonely man
🎁 Partnership brings a real reward
📋 A short list of reasons follows
📖 Four pictures prove the point

## 🙌 The One Will Lift Up His Fellow

"Fellow" simply means a companion or a partner.

This pictures someone falling, perhaps literally on a rough road.

A companion is right there to help them back up.

Falling is no longer a disaster when someone else is present.

🧍 Fellow means a companion
🤕 Pictures someone falling down
🙌 A companion helps them back up
📖 Falling stops being a disaster

## 😢 Woe To Him That Is Alone When He Falleth

"Woe" is a strong word for deep trouble or grief.

The solitary man from earlier reappears in this exact scenario.

No one is there to notice or to help him.

The danger of isolation becomes very concrete here.

😢 Woe means deep trouble
👤 The solitary man reappears here
🚫 No one is there to help
📖 Isolation becomes a real danger

## 🌙 How Can One Be Warm Alone

This refers to two travelers sharing body heat on a cold night.

Ancient travel often meant sleeping outdoors without modern bedding.

A companion literally kept a person warmer and safer.

The picture is physical, but the point reaches further than temperature.

🌙 Pictures travelers sharing warmth outdoors
🏕️ Ancient travel often meant sleeping outside
🔥 A companion kept a person safer
📖 The point reaches beyond temperature

## ⚔️ Two Shall Withstand Him

"Him" here refers to an attacker or an enemy.

One person alone stands a poor chance against real opposition.

Two people together can actually hold their ground.

Numbers change the outcome of a real confrontation.

⚔️ Him refers to an attacker
👤 One person stands a poor chance
🤝 Two people can hold their ground
📖 Numbers change a real confrontation

## 🧵 A Threefold Cord Is Not Quickly Broken

A cord made of three strands twisted together is far stronger than a single strand.

Many scholars believe this pictures a marriage or friendship that includes God as the third strand.

Each added strand makes the whole cord harder to snap.

The chapter's whole case for partnership ends on this strong image.

🧵 Three twisted strands beat one
🙏 Many see God as the third strand
💪 Each strand adds real strength
📖 The case for partnership ends here

# Ecclesiastes 4:13-16
# 👑 A Poor Wise Child And An Old Foolish King
---
## 👶 Better Is A Poor And A Wise Child

The Preacher compares two very different rulers in this final story.

Poverty and youth do not disqualify someone from being genuinely wise.

Wisdom matters more here than wealth, age, or an existing crown.

This flips the usual assumptions about who deserves respect.

👶 Compares two different kinds of ruler
💰 Poverty does not disqualify wisdom
👑 Wisdom outweighs wealth and age
📖 Flips assumptions about who deserves respect

## 📢 An Old And Foolish King, Who Will No More Be Admonished

"Admonished" means to be warned or corrected by someone else.

This king has grown too proud or too stubborn to accept advice.

Age and a crown do not automatically bring wisdom with them.

A ruler who cannot be corrected becomes dangerous to everyone around him.

📢 Admonished means warned or corrected
🚫 Too proud to accept advice
👑 A crown does not guarantee wisdom
📖 An uncorrectable ruler becomes dangerous

## ⛓️ Out Of Prison He Cometh To Reign

This pictures a dramatic reversal from prisoner to king.

Many scholars believe this reflects a real pattern of political overthrow in the ancient world.

Someone with nothing can suddenly end up with everything.

Circumstances at the start of life do not decide how the story ends.

⛓️ Pictures a prisoner becoming king
🔄 Reflects real ancient political overthrow
📈 Someone with nothing can rise fast
📖 A start does not decide the ending

## 👑 He That Is Born In His Kingdom Becometh Poor

This describes the exact opposite reversal in the very same verse.

A child born into royal privilege can still end up losing everything.

Birth into comfort is no guarantee of staying there.

Both directions prove that human fortune constantly shifts.

👑 Describes the opposite reversal
📉 Royal birth can still end in poverty
🎲 Comfort at birth is no guarantee
📖 Fortune constantly shifts both ways

## 🔄 The Second Child That Shall Stand Up In His Stead

"In his stead" means taking someone else's former place.

This new young ruler is the poor wise child from a few verses back.

Even this promising new leader eventually gets replaced by someone else.

The cycle of rising and replacing never actually stops.

🔄 In his stead means taking someone's place
👶 This is the poor wise child again
➰ Even he gets replaced eventually
📖 The cycle of replacing never stops

## ♾️ There Is No End Of All The People

This describes an endless line of people stretching backward through history.

Generation after generation already lived and ruled before this moment.

No single person or leader is the first or the last in this long line.

The size of that crowd makes any one ruler's reign look very small.

♾️ Describes an endless line of people
🕰️ Generation after generation came before
👤 No one is first or last
📖 One reign looks small against that crowd

## 🤷 They Also That Come After Shall Not Rejoice In Him

Future generations will not celebrate this ruler the way people expect.

Popularity and memory fade faster than anyone imagines while still in power.

Even a wise, well loved leader eventually gets forgotten or replaced in people's affections.

The whole story ends exactly where the chapter's other stories ended, at vanity and vexation of spirit.

🤷 Future generations will not celebrate him
⏳ Popularity fades faster than expected
😶 Even good leaders get forgotten
📖 Ends again at vanity and vexation
`.trim();

export const ECCLESIASTES_FOUR_PERSONAL_SECTIONS = parseEcclesiastesFourRawNotes(ECCLESIASTES_FOUR_RAW_NOTES);
