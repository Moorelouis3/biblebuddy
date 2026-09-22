export type IsaiahElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahElevenRawNotes(rawText: string): IsaiahElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 11:${startVerse}` : `Isaiah 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Isaiah 11 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_ELEVEN_RAW_NOTES = `# Isaiah 11:1-2
# 🌳 A Branch Rises From Jesse's Root
---
## 🌱 There Shall Come Forth A Rod Out Of The Stem Of Jesse

"Rod" here does not mean a tool for punishing.

It means a fresh shoot rising from the ground.

"Jesse" was the father of King David.

He stood at the root of Judah's whole royal line.

By this point in Isaiah, that royal line looked cut down.

"Stem" here means a stump, all that is left of a felled tree.

A new shoot from an old stump means life after what looked like a permanent end.

🌱 Rod means a fresh new shoot

👑 Jesse was David's father

🪓 Stem means a stump, not a trunk

📖 New life rises from what looked dead

## 🌿 A Branch Shall Grow Out Of His Roots

"Branch" repeats the same idea as "rod."

Hebrew poetry often restates one thought in two ways.

Later in Isaiah, "the Branch" becomes a title for God's promised king.

The roots of that stump were buried and hidden.

They were never actually dead.

Hope was growing in the most forgotten part of the family tree.

🌿 Branch repeats the idea of rod

🔁 Hebrew poetry often restates one idea

👑 The Branch later becomes a title

📖 Hope grew in a forgotten root

## 🕊️ The Spirit Of The LORD Shall Rest Upon Him

This is not a brief visit of God's Spirit.

"Rest upon" pictures the Spirit settling permanently.

Think of a bird settling into a nest it will not leave.

Earlier kings in Israel sometimes lost God's Spirit through their own sin.

This king's connection to the Spirit is lasting, not fragile.

That permanence sets him apart from every king before him.

🕊️ Rest upon means settling permanently

🏠 A nest pictures a lasting stay

👑 Earlier kings could lose the Spirit

📖 This king's connection never leaves

## 🧠 The Spirit Of Wisdom And Understanding, The Spirit Of Counsel And Might

This verse lists six qualities the Spirit gives, two by two.

"Wisdom" means applying truth well in real situations.

"Understanding" means grasping why something is true.

"Counsel" means sound judgment for hard decisions.

"Might" means the strength to carry out that judgment.

Wisdom without strength stays only an idea.

🧠 Wisdom means applying truth well

💡 Understanding means grasping the why

🗣️ Counsel means sound judgment

📖 All four together shape how he leads

## 📖 The Spirit Of Knowledge And Of The Fear Of The LORD

"Knowledge" here means personally knowing God, not just facts about Him.

"The fear of the LORD" means deep reverence, not fright.

These six qualities describe a king equipped in every direction.

Wisdom and understanding shape how he thinks.

Counsel and might shape how he acts.

Knowledge and reverence shape how he relates to God.

📖 Knowledge means truly knowing God

🙇 Fear of the LORD means reverence

🎯 Six qualities cover every angle

➡️ This king was equipped completely

# Isaiah 11:3-5
# ⚖️ He Judges With Perfect Righteousness
---
## 👃 Quick Understanding In The Fear Of The LORD

"Quick understanding" translates a phrase that pictures a keen sense of smell.

Many scholars note it describes discernment that moves fast, almost like catching a scent.

This king will not need to slowly reason his way toward good judgment.

His discernment moves quickly because reverence for God shapes it from the inside.

Wisdom without reverence tends to drift toward self interest.

👃 Quick understanding pictures keen scent

⚡ His discernment moves fast, not slow

🙇 Fear of the LORD shapes it

📖 Reverence keeps wisdom from drifting

## 👀 He Shall Not Judge After The Sight Of His Eyes

Most human judges are swayed by appearances.

Wealth and status often shape their verdicts.

This king's judgment does not depend on how someone looks.

"Neither reprove after the hearing of his ears" adds that rumor will not sway him either.

His verdicts come from something deeper than surface impressions.

👀 Most judges are swayed by looks

👂 Rumor will not sway him either

⚖️ His verdicts run deeper than appearances

📖 This fairness was rare then and now

## 🥀 With Righteousness Shall He Judge The Poor

"The poor" means people without wealth or influence.

Ancient courts often favored whoever could pay the largest bribe.

This king judges the poor by the same standard as everyone else.

"Equity" means fairness applied evenly, not adjusted by class.

Justice that only works for the powerful was never real justice.

🥀 The poor lacked money to bribe judges

💰 Courts often favored the wealthy

⚖️ This king judges everyone the same

📖 Justice for the powerful alone is not justice

## 🌬️ He Shall Smite The Earth With The Rod Of His Mouth

This is a picture, not a literal weapon.

His spoken word carries the force of a physical blow.

"The breath of his lips shall he slay the wicked" repeats the same idea.

Simply speaking judgment is enough for this king.

His word carries God's own authority behind it.

🌬️ His word strikes like a physical blow

🗣️ Speech alone carries his judgment

🔁 Breath of his lips repeats the idea

📖 His words carry God's own authority

## 🎗️ Righteousness Shall Be The Girdle Of His Loins

A "girdle" was a wide belt tied around the waist.

It held a loose robe secure for work or battle.

Without it, robes could trip a person or get tangled.

Calling righteousness his girdle means it is not decoration.

It is what holds everything else together.

"Faithfulness the girdle of his reins" repeats the same picture.

🎗️ A girdle secured a robe for action

🪢 Righteousness is not decoration but support

🔁 Faithfulness repeats the same picture

📖 His actions stay secured by his character

# Isaiah 11:6-9
# 🐺 The Peaceable Kingdom
---
## 🐺 The Wolf Also Shall Dwell With The Lamb

In nature, a wolf is a predator and a lamb is easy prey.

This picture describes a complete reversal of that natural order.

It is not simply describing calmer wolves.

It describes a world where the whole structure of violence is undone.

This is poetry pointing toward the full effect of the coming king's reign.

🐺 A wolf naturally hunts a lamb

🔄 This pictures a total reversal

🌍 It is not about calmer wolves

📖 It points to the king's full reign

## 🐆 The Leopard Shall Lie Down With The Kid

A "kid" is a young goat, another natural target for a leopard.

"Lie down with" pictures rest and safety, not a tense standoff.

The wolf and lamb pattern repeats here with a new pair.

Piling up example after example makes the promise feel complete.

Nothing in this coming peace is left as an exception.

🐆 A kid is a young goat

😴 Lie down with pictures safety, not tension

🔁 The wolf and lamb pattern repeats

📖 Nothing is left as an exception

## 🦁 The Calf And The Young Lion And The Fatling Together

A "fatling" was a young animal fattened for a coming feast.

That role usually sat opposite a predator's role.

Placing a calf, a lion, and a fatling side by side lists three very different roles.

Prey, predator, and food source now share the same space peacefully.

The old order where the strong preyed on the weak has ended.

🦁 A fatling was fattened for a feast

🐂 Three very different animals appear together

🕊️ Predator and prey now share space

📖 The old order of predator and prey ends

## 👶 And A Little Child Shall Lead Them

In any normal setting, a child leading dangerous animals would be reckless.

Here it works because those animals are no longer dangerous.

Placing the weakest figure in charge measures how complete this peace is.

A child leading a wolf and a lion pictures total trust.

The safest place in this scene is right beside the child.

👶 A child leading predators would normally be reckless

🐺 It works because danger itself is gone

📏 This measures how complete the peace is

📖 The safest place is beside the child

## 🐄 The Cow And The Bear Shall Feed

A cow and a bear normally avoid sharing the same field.

"Feed" here means grazing together, side by side.

Neither animal is threatened by the other.

"Their young ones shall lie down together" extends this peace to the next generation.

This peace is stable enough to be trusted by their offspring too.

🐄 A cow and bear normally avoid each other

🌾 Feed means grazing peacefully side by side

👶 The peace extends to their young too

📖 This peace is stable, not a truce

## 🦁 The Lion Shall Eat Straw Like The Ox

A lion is a predator built to hunt meat.

An ox eating straw is completely ordinary.

Picturing a lion doing the same thing changes its whole nature.

It is not just a change in behavior for one day.

Even a predator's nature bends under this coming king's reign.

🦁 A lion naturally hunts, it does not graze

🌾 An ox eating straw is ordinary

🧬 This changes nature, not just behavior

📖 Even instinct bends under this reign

## 🐍 The Sucking Child Shall Play On The Hole Of The Asp

An "asp" is a venomous snake.

Its hole was a place any parent would keep a child far away from.

A "sucking child" means a nursing infant, the most vulnerable person imaginable.

"The weaned child shall put his hand on the cockatrice' den" repeats the picture with an older child.

Danger that once meant certain death no longer threatens at all.

🐍 An asp was a venomous snake

👶 A sucking child is a nursing infant

🔁 The picture repeats with an older child

📖 The weakest and the deadliest now coexist

## ⛰️ They Shall Not Hurt Nor Destroy In All My Holy Mountain

"My holy mountain" refers to Zion, God's own dwelling place.

This peace is not scattered randomly across the whole earth.

It is centered specifically where God's presence is most fully known.

Peace spreads outward from God's presence, not the other way around.

Wherever God truly reigns becomes safe first.

⛰️ Holy mountain refers to Zion

📍 Peace is centered on God's presence

🌊 It spreads outward from there

📖 Wherever God reigns becomes safe first

## 🌊 The Earth Shall Be Full Of The Knowledge Of The LORD, As The Waters Cover The Sea

This comparison pictures total, complete coverage.

Water does not cover the sea partially or occasionally.

It fills every part, all the way to the bottom.

"Knowledge of the LORD" means truly, personally knowing who God is.

Once everyone truly knows God, the old reasons for violence disappear.

🌊 Water covers the sea completely

🌍 Knowledge of God fills the earth

❤️ Knowledge here means truly knowing God

📖 Once God is known, violence disappears

# Isaiah 11:10-12
# 🚩 An Ensign To The Nations
---
## 🌱 A Root Of Jesse, Which Shall Stand For An Ensign Of The People

This repeats the imagery from the very first verse of the chapter.

An "ensign" was a raised banner people could rally toward.

Earlier in this same section of Isaiah, an ensign marked an invading army.

Here the image is completely flipped.

This ensign draws people toward rescue, not toward destruction.

🌱 Root of Jesse repeats the chapter's opening

🚩 An ensign was a raised banner

⚔️ Earlier ensigns marked invading armies

📖 This ensign draws people to rescue

## 🌍 To It Shall The Gentiles Seek

"Gentiles" means every nation outside of Israel.

This coming king was not meant for one nation alone.

The rest of Isaiah repeatedly widens this promise to the whole world.

Nations with no covenant with God are pictured actively searching him out.

"His rest shall be glorious" promises his reign becomes a place of true rest.

🌍 Gentiles means every nation, not just Israel

🔍 Outside nations are pictured seeking him

📜 Isaiah widens this promise repeatedly

📖 His reign becomes a place of true rest

## ✋ The Lord Shall Set His Hand Again The Second Time

God had already rescued His people once, out of slavery in Egypt.

"The second time" points to a greater rescue still to come.

"To recover the remnant" means gathering back what judgment had scattered.

This is not a brand new plan.

It is the same rescuing God acting again.

✋ God's hand pictures His own action

🏺 The first rescue was from Egypt

🔁 The second time points to a greater rescue

📖 The same God acts again

## 🗺️ From Assyria, And From Egypt, And From Pathros, And From Cush, And From Elam, And From Shinar, And From Hamath, And From The Islands Of The Sea

This long list names real regions scattered across the ancient world.

They stretch from Mesopotamia to Africa to distant coastlands.

Naming each place makes the scattering feel as total as it actually was.

The promise of gathering matches the scattering exactly, place for place.

No corner of the earth is too far for God to reach.

🗺️ These were real, scattered regions

🧭 The list covers every direction

⚖️ Gathering matches the scattering exactly

📖 No place is too far for God

## 📣 He Shall Set Up An Ensign For The Nations, And Shall Assemble The Outcasts Of Israel

The same ensign image from earlier in this section returns here.

"Outcasts" means people driven out, not people who left by choice.

"Gather together the dispersed of Judah" repeats the same promise using Judah's name.

Both halves of the divided kingdom are included in this one gathering.

A promise this large was never meant for only part of God's people.

📣 The ensign image returns again

🏚️ Outcasts means driven out, not self exiled

🤝 Both Israel and Judah are included

📖 This promise was never partial

# Isaiah 11:13-14
# 🤝 Old Rivalries End
---
## 💔 The Envy Also Of Ephraim Shall Depart

"Ephraim" was the leading tribe of the northern kingdom.

Its name was often used for the whole northern kingdom.

Ephraim in the north and Judah in the south competed for generations.

That old jealousy gets named specifically as something God removes.

Peace among God's own people comes before peace with outside nations here.

💔 Ephraim names the northern kingdom

⚔️ Ephraim and Judah had long competed

🩹 This old jealousy is named for removal

📖 Peace begins inside God's own family

## ⚔️ The Adversaries Of Judah Shall Be Cut Off

"Adversaries" means enemies actively working against Judah.

"Cut off" is a strong phrase, meaning completely removed.

This promise addresses outside threats right after healing an inside conflict.

Peace within God's people and safety from outside threats arrive together.

One kind of peace was never meant to stand alone.

⚔️ Adversaries means active enemies

✂️ Cut off means completely removed

🏠 This follows the promise of inner peace

📖 Inner and outer peace arrive together

## 🤝 Ephraim Shall Not Envy Judah, And Judah Shall Not Vex Ephraim

This verse names the conflict from both directions.

"Vex" means to provoke or harass on purpose.

Both tribes carried real grievances built up over generations.

The promise is not that one side simply wins the argument.

Both old grudges end together, at the same time.

🤝 The conflict is named from both sides

😠 Vex means deliberate provoking

⚖️ Both tribes carried real grievances

📖 Both grudges end at the same time

## 🦅 They Shall Fly Upon The Shoulders Of The Philistines Toward The West

The Philistines lived along the coast, to Israel's west.

They were frequent, longstanding enemies.

"Fly upon the shoulders" pictures a fast, overwhelming attack.

Think of a bird swooping down without warning.

Once Israel's internal rivalry ends, its outside enemies no longer threaten the same way.

🦅 Fly upon shoulders pictures a swift attack

🌊 Philistines lived to the west, along the coast

🏠 A divided house cannot fight well

📖 Unity restores real strength

## ✊ They Shall Lay Their Hand Upon Edom And Moab

Edom and Moab were neighboring nations with a long, tense history against Israel.

"Lay their hand upon" here means to subdue or bring under control.

"The children of Ammon shall obey them" adds a third neighboring nation to the list.

Every old regional rival gets named specifically, not left vague.

None of Israel's historic troublemakers are left out of this reversal.

✊ Lay their hand means to subdue

🗺️ Edom and Moab were old regional rivals

📜 Ammon is named as a third nation

📖 No old rival is left out

# Isaiah 11:15-16
# 🛣️ A Highway For The Remnant
---
## 🌊 The LORD Shall Utterly Destroy The Tongue Of The Egyptian Sea

"The tongue of the Egyptian sea" pictures a narrow inlet of the Red Sea.

It was shaped like a tongue reaching into the land.

"Utterly destroy" here means God will dry it up completely.

This deliberately recalls the Red Sea crossing during the exodus.

That older miracle becomes the pattern for describing a brand new one.

🌊 The tongue pictures a narrow sea inlet

🏺 This recalls the exodus from Egypt

🔁 An old miracle becomes the pattern

📖 God repeats power His people know

## 💨 With His Mighty Wind Shall He Shake His Hand Over The River

"The river" most likely refers to the Euphrates.

Many scholars see it as a major boundary crossed by returning exiles.

A "mighty wind" recalls the wind God used to part the Red Sea.

Shaking a hand over the river pictures direct, personal control.

The same God who controlled water at the exodus controls it again here.

💨 The river likely names the Euphrates

🌬️ Mighty wind recalls the Red Sea

✋ Shaking a hand shows direct control

📖 Nature itself helps bring them home

## 👣 Smite It In The Seven Streams, And Make Men Go Over Dryshod

Breaking one river into seven smaller streams made it easier to cross.

"Dryshod" means crossing with completely dry feet.

No one had to wade through water at all.

This detail removes every practical obstacle for people returning home.

God clears the road so the journey itself becomes easy.

👣 Seven streams made the crossing easier

🥾 Dryshod means crossing with dry feet

🚧 Every practical obstacle is removed

📖 God clears the road for the return

## 🛣️ There Shall Be An Highway For The Remnant Of His People, Which Shall Be Left, From Assyria

A "highway" meant a cleared, prepared road in the ancient world.

It was often built for a king's own official travel.

Building one implies careful preparation, not a chance escape route.

The chapter closes by naming the exodus from Egypt directly.

What God did once at Israel's beginning, He promises to do again.

🛣️ A highway meant a prepared royal road

🎯 It shows careful, intentional preparation

🔁 The chapter closes by naming the exodus

📖 What God did once, He does again
`.trim();

export const ISAIAH_ELEVEN_PERSONAL_SECTIONS = parseIsaiahElevenRawNotes(ISAIAH_ELEVEN_RAW_NOTES);
