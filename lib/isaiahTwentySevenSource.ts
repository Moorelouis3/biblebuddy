export type IsaiahTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahTwentySevenRawNotes(rawText: string): IsaiahTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+27:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 27:${startVerse}` : `Isaiah 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 27 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_TWENTY_SEVEN_RAW_NOTES = `# Isaiah 27:1-2
# 🐉 Leviathan Judged And A New Song
---
## 📅 In That Day

"In that day" points forward to a future day of the LORD.

This same phrase already opened three chapters in a row before this one.

Chapters twenty four through twenty seven form one long vision together.

Each new use of the phrase moves that vision one step further forward.

📅 In that day points to the future

🔗 The same phrase opened three earlier chapters

📜 Four chapters form one long vision

➡️ Each use moves the vision forward

## 🐍 Leviathan The Piercing Serpent

Leviathan was a legendary sea monster known across the ancient world.

Nearby cultures pictured it as a twisting, many headed creature of chaos.

"Piercing" pictures a serpent that strikes fast, before it can be stopped.

Many scholars believe Leviathan stands for the proud empires that opposed God.

🐍 Leviathan means a legendary sea monster

🌀 Nearby cultures pictured it as chaos itself

⚡ Piercing pictures a fast, striking serpent

📖 It stands for empires that opposed God

## 🐊 He Shall Slay The Dragon That Is In The Sea

Leviathan is also called "that crooked serpent" in this same verse.

Crooked here means twisting and writhing, not simply dishonest.

The dragon in the sea was another ancient symbol of overwhelming chaos.

Genesis already pictured God ruling calmly over the sea at creation.

This verse promises God will finish that old victory for good.

🐊 Crooked serpent means twisting and writhing

🌊 The dragon symbolized overwhelming chaos

🌍 Genesis already showed God ruling the sea

📖 God finishes that victory for good

## ⚔️ With His Sore And Great And Strong Sword

Isaiah stacks three words together here, sore, great, and strong.

Ancient Hebrew poetry often piled up words like this for emphasis.

The point is not a description of the blade itself.

It pictures a weapon strong enough that nothing can survive it.

⚔️ Sore, great, and strong are stacked together

📜 Hebrew poetry piled up words for emphasis

🛡️ The point is not the blade itself

📖 Nothing can survive a weapon like this

## 🎶 Sing Ye Unto Her, A Vineyard Of Red Wine

The tone shifts here from a battle scene to a song.

"Her" points to a vineyard, pictured here almost like a person.

Isaiah already used a vineyard song once before, back in chapter five.

That earlier song ended in judgment, a vineyard torn down and abandoned.

This new song is about to tell a very different story.

🎶 The tone shifts from battle to song

🍇 Her pictures the vineyard as a person

📜 Chapter five already used a vineyard song

➡️ This song tells a different story

# Isaiah 27:3-6
# 🍇 The Song Of The Fruitful Vineyard
---
## 💧 I The LORD Do Keep It

Chapter five described a vineyard its owner finally gave up on.

He tore down its hedge and let it be trampled flat.

Here the LORD says the opposite about this vineyard.

He will personally keep it Himself, without giving up.

The neglect from chapter five has no place in this new song.

💧 Chapter five showed a vineyard given up on

🚧 That vineyard lost its hedge and protection

🤲 Here the LORD keeps this vineyard Himself

📖 Neglect has no place in this new song

## 🌙 I Will Keep It Night And Day

The LORD says He will water this vineyard every single moment.

Then He repeats the same promise a second way, night and day.

Hebrew poetry often repeats an idea like this for emphasis.

No gap of neglect is left standing anywhere in the picture.

💧 Every moment means constant watering

🌙 Night and day repeats the same promise

📜 Hebrew poetry repeats ideas for emphasis

📖 No gap of neglect remains here

## 🔥 Fury Is Not In Me

Earlier chapters were full of God's fury against sin and pride.

Here that fury is turned off completely toward this vineyard.

The vineyard is not the target of the anger described before.

Verse three already explained why, this vineyard has God's own careful care.

🔥 Earlier chapters showed real fury against sin

🚫 That fury is not aimed at this vineyard

🍇 The vineyard receives careful care instead

📖 God's anger and God's care have different targets

## 🌵 Who Would Set The Briers And Thorns Against Me In Battle

Chapter five already used briers and thorns once before.

There they grew up because the vineyard was neglected and unprotected.

Here they picture any enemy that dares to rise up against God.

The question expects one answer.

Nobody could actually win a fight like that.

🌵 Chapter five already used briers and thorns

🚧 There they grew from neglect

⚔️ Here they picture enemies rising against God

📖 Nobody could win that kind of fight

## 🔥 I Would Go Through Them, I Would Burn Them Together

God answers His own question from the line before.

He would not run from briers and thorns.

He would walk straight through them and burn them completely.

Fire here pictures a judgment that is fast and total.

🚶 God answers His own question directly

🔥 He would burn them completely

⚡ Fire pictures fast, total judgment

➡️ No enemy of the vineyard could survive

## 🤝 Let Him Take Hold Of My Strength, That He May Make Peace With Me

This verse offers a different ending than burning.

"Take hold of my strength" pictures someone reaching for God's protection.

Peace here is not weakness.

It is a real offer of safety.

Even a brier or a thorn could choose this path instead.

🤝 This verse offers a different ending

🙌 Taking hold pictures reaching for protection

🕊️ Peace is a real offer, not weakness

➡️ Even an enemy could still choose this

## 🌱 Cause Them That Come Of Jacob To Take Root

"Them that come of Jacob" means the people of Israel.

"Take root" pictures a plant finally settling deep and steady into the ground.

Earlier chapters pictured nations and cities being uprooted and destroyed.

Israel gets the opposite picture here, planted firmly instead of torn out.

🌱 Come of Jacob means Israel's people

🌳 Take root pictures settling in deep

🏚️ Earlier chapters showed nations uprooted

📖 Israel is planted firmly instead

## 🌍 Fill The Face Of The World With Fruit

Israel does not just grow for its own sake in this verse.

"Blossom and bud" pictures new life breaking out into the open.

The fruit from this vineyard is meant to reach the whole world.

God's promise to Abraham always included blessing every nation, not just one.

🌸 Blossom and bud pictures new life opening

🌍 The fruit reaches the whole world

🤝 This echoes God's promise to Abraham

📖 One nation's fruit blesses every nation

# Isaiah 27:7-11
# ⚖️ Measured Discipline, Not Destruction
---
## ❓ Hath He Smitten Him, As He Smote Those That Smote Him

This verse asks a rhetorical question.

The expected answer is no.

"Him" means Jacob, the people of Israel.

"Those that smote him" means the nations that attacked Israel.

Hebrew poetry often repeats one idea in two different lines.

Both halves of this verse make the same point.

Israel was not struck down the way its enemies were.

❓ This verse asks a question

✅ The expected answer is no

👥 Him means Jacob, the people of Israel

📖 Israel was not struck like its enemies

## ⚖️ In Measure, When It Shooteth Forth, Thou Wilt Debate With It

"In measure" means God's correction was carefully sized, not extreme.

"Debate with it" pictures a courtroom argument, not a violent outburst.

God is shown here reasoning with His people.

This was discipline measured out on purpose.

It was never given in careless anger.

⚖️ In measure means carefully sized correction

🏛️ Debate with it pictures a courtroom

🗣️ God reasons with His people here

📖 This discipline was never careless anger

## 🌬️ He Stayeth His Rough Wind In The Day Of The East Wind

The east wind in this region was a hot, scorching desert wind.

It could wither crops and dry up water in a single day.

"Stayeth" means held back, like a hand pulling in the reins.

God used only part of that wind's full force on His people.

🌬️ The east wind was hot and scorching

🌾 It could wither crops in one day

✋ Stayeth means held back, like reins pulled in

📖 God held back its full force

## 🔥 The Iniquity Of Jacob Be Purged

"Purged" means cleaned out completely, the way fire refines metal.

The discipline in this chapter was never about revenge.

Its whole purpose was removing sin, not destroying the people.

Verse eight already showed that same measured, purposeful correction.

🔥 Purged means cleaned out completely

🚫 This was never about revenge

🎯 The purpose was removing sin

📖 Correction here aimed at purity, not ruin

## 🪨 The Stones Of The Altar As Chalkstones

"Chalkstones" are a soft, crumbly limestone that breaks apart easily.

Pagan altars were built from stone for offering sacrifices to false gods.

Smashing them into chalkstone powder made them completely unusable again.

This is what real repentance looked like in the ancient world.

🪨 Chalkstones are soft, crumbly limestone

🔨 Pagan altars get smashed to powder

🚫 Powder means the altar cannot be rebuilt

📖 This pictured real repentance in action

## 🌳 The Groves And Images Shall Not Stand Up

"Groves" refers to wooden poles set up to honor a false goddess.

"Images" means carved idols made to represent other gods.

Both were common across Canaanite worship in Isaiah's own time.

Neither one is left standing once Jacob's sin is truly purged.

🌳 Groves means wooden poles for a false goddess

🗿 Images means carved idols of other gods

🚫 Both were common in Canaanite worship

📖 Neither survives once sin is purged

## 🏚️ The Defenced City Shall Be Desolate

"Defenced" means heavily fortified, built to withstand any attack.

Even a city built that strong could not survive this judgment.

Earlier chapters already tore down proud, fortified cities the same way.

Its own defenses could not save it in the end.

🏚️ Defenced means heavily fortified

🏰 Even strong walls could not survive judgment

🔁 Earlier chapters tore down cities like this

📖 Defenses could not save it in the end

## 🐄 There Shall The Calf Feed, And There Shall He Lie Down

A once busy, fortified city becomes an open pasture instead.

Calves now graze and rest where people used to live and work.

"Consume the branches thereof" pictures the calf eating what little still grows there.

This is a complete reversal, a guarded city turned into an empty field.

🐄 A fortified city becomes open pasture

🌿 Calves graze where people once lived

🍃 They eat what little still grows

📖 A guarded city becomes an empty field

## 🌿 When The Boughs Thereof Are Withered, They Shall Be Broken Off

"Boughs" means the tree branches, continuing the vineyard picture from earlier.

Once a branch dries out, it snaps off on its own.

This city has become as lifeless as a withered branch.

Nothing about it can be revived or grafted back in.

🌿 Boughs means the tree branches

🥀 Dried branches snap off easily

🏚️ The city is as lifeless as one

📖 Nothing here can be revived

## 🔥 The Women Come, And Set Them On Fire

Gathering dead branches for firewood was normal daily work for women.

Here even that dead wood is only good for burning now.

"A people of no understanding" explains why no mercy follows this.

They did not recognize the God who made them in the first place.

Because of that, He that formed them shows them no favour in return.

🔥 Women gathered dead wood for firewood

🪵 Even the wood is only fit to burn

🙈 No understanding means they never recognized God

📖 No recognition of God brought no mercy

# Isaiah 27:12-13
# 📯 The Great Trumpet And The Gathering
---
## 🌾 Beat Off From The Channel Of The River Unto The Stream Of Egypt

"Beat off" describes threshing grain or shaking olives down from a tree.

Here it pictures God carefully gathering His scattered people the same way.

"The river" means the Euphrates, the promised land's far northern edge.

"The stream of Egypt" was a smaller stream marking its southern border.

Together those two landmarks describe the full stretch of the promised land.

🌾 Beat off pictures threshing grain

🗺️ The river means the Euphrates

🧭 The stream of Egypt marks the southern edge

📖 Together they mark the whole promised land

## 🔢 Ye Shall Be Gathered One By One

This gathering is not a vague, anonymous return of a crowd.

"One by one" means every single person gets noticed and counted.

"O ye children of Israel" makes the promise personal and direct.

God is not gathering an abstract nation here.

He is gathering real people, one at a time.

🔢 Gathering happens one person at a time

👀 Every single person gets noticed

🗣️ The promise is spoken directly to them

📖 God gathers people, not an abstract nation

## 📯 The Great Trumpet Shall Be Blown

The trumpet here was a ram's horn, often called a shofar.

It was blown to call people together for worship or for war.

A trumpet this loud reaches people who are scattered far apart.

This call gathers God's people back together one final time.

📯 The trumpet was a ram's horn

📢 It called people to worship or war

🌍 A loud trumpet reaches people far apart

📖 This call gathers God's people together

## 🌍 Ready To Perish In The Land Of Assyria, And The Outcasts In The Land Of Egypt

Assyria and Egypt were the two great powers surrounding Israel.

Many Israelites had ended up scattered in both directions over the years.

"Ready to perish" describes people worn down and close to giving up.

"Outcasts" describes people pushed out and left without a home.

Both groups get called back by the very same trumpet.

🌍 Assyria and Egypt surrounded Israel

🏚️ Israelites had scattered in both directions

😔 Ready to perish means close to giving up

📖 One trumpet calls both groups home

## ⛰️ Worship The LORD In The Holy Mount At Jerusalem

The whole chapter ends where true worship was always meant to happen.

"The holy mount" points to the temple built on Mount Zion.

Scattered, exhausted people are not just brought home to safety.

They are brought all the way back to worship.

This closes the larger vision that began back in chapter twenty four.

⛰️ The holy mount points to Mount Zion

🏠 People are brought home, not just to safety

🙏 The goal is worship, not just survival

📖 This closes the vision from chapter twenty four
`.trim();

export const ISAIAH_TWENTY_SEVEN_PERSONAL_SECTIONS = parseIsaiahTwentySevenRawNotes(ISAIAH_TWENTY_SEVEN_RAW_NOTES);
