export type PsalmsOneHundredFortyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFortyEightRawNotes(rawText: string): PsalmsOneHundredFortyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFortyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+148:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 148 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+148:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+148:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 148 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 148,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 148:${startVerse}` : `Psalms 148:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 148 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FORTY_EIGHT_RAW_NOTES = `# Psalms 148:1-6
# 🌌 Every Layer Of Heaven Summoned To Praise
---
## 🎉 Praise Ye The LORD

"Praise ye the LORD" translates the same Hebrew word, hallelujah.

Psalms 146 through 150 all open and close on this exact word.

This is the third psalm in that closing set of five.

The Psalter keeps circling back to this one command on purpose.

🎉 Hallelujah opens this psalm again
🔢 This is the third of five closing psalms
🔁 The command keeps repeating on purpose
📖 The Psalter keeps circling back to it

## 🌌 Praise Him In The Heights

"Heights" here does not mean the tall mountains of earth.

It points to the sky itself, the highest reaches above.

The same verse already said "from the heavens" just before this.

Hebrew poetry often says one thing twice using different words.

🌌 Heights means the sky itself
🔁 It repeats "from the heavens"
📜 Hebrew poetry often doubles an idea
📖 Both phrases point to the same place

## 👼 All His Angels

"Angels" are heavenly messengers who serve directly before God.

The Bible pictures them worshipping around God's throne constantly.

Calling on angels to praise fits this psalm's sweep from the very top down.

Even beings who already serve God at close range are told to praise Him again.

👼 Angels are God's heavenly messengers
🎼 They already worship near God's throne
⬆️ The psalm starts at the very top
📖 Even they are told to praise again

## ⚔️ All His Hosts

"Hosts" is a wider word than angels alone.

In the Old Testament it can mean armies, but also the sun, moon, and stars.

Neighboring ancient nations often worshipped the stars as gods in their own right.

Calling them "his hosts" puts them firmly under God's command instead.

⚔️ Hosts can mean armies or armies of stars
🌠 Neighboring nations worshipped stars as gods
👑 Here they are under God's command
📖 Nothing in the sky rules itself

## ☀️ Praise Ye Him, Sun And Moon

Sun and moon worship was common across the ancient Near East.

Egypt and Babylon both built entire religious systems around them.

This verse commands the sun and moon themselves to praise the true God.

Being told to worship strips them of any power of their own.

☀️ Sun and moon were worshipped as gods nearby
🇪🇬 Egypt and Babylon built religions around them
🙇 Here they are told to worship instead
📖 They have no power of their own

## ⭐ All Ye Stars Of Light

Ancient skies showed far more stars than most people see today.

No city lights blocked the view of the night sky back then.

"Stars of light" pictures countless points scattered across the dark sky.

Even the vast number of stars is called to join this one song.

⭐ Ancient skies showed far more stars
🌃 No city lights blocked the view
🔢 The number of stars seemed endless
📖 All of them are called to praise

## 🌌 Ye Heavens Of Heavens

This phrase repeats the word heavens to mean the highest heaven possible.

Hebrew often repeats a word like this to describe an extreme.

Ancient people often pictured the sky in layers, one above another.

This phrase reaches for the very top layer of them all.

🌌 Heavens of heavens means the highest heaven
📜 Repeating a word describes an extreme
🧱 The sky was pictured in layers
📖 This reaches the very top layer

## 💧 Waters That Be Above The Heavens

Genesis 1 describes waters separated above and below a great expanse.

This verse points back to that same ancient picture of the sky.

Ancient people believed rain came from a store of water held above the sky.

Even that unseen water is summoned to add its voice to the praise.

💧 Genesis 1 describes waters above the sky
🌧️ Ancient people pictured rain stored above
🔗 This verse points back to that picture
📖 Even unseen water joins the praise

## 🗣️ For He Commanded, And They Were Created

This line gives the reason for the whole first half of the psalm.

Every single thing named so far exists only because God spoke it into being.

Genesis 1 pictures this same pattern, God commanding and it happening.

Nothing in the sky earned its own existence.

🗣️ God commanded and they were created
📜 This matches the pattern in Genesis 1
🚫 Nothing earned its own existence
📖 Creation itself is reason enough to praise

## 🔒 A Decree Which Shall Not Pass

"Stablished" is an old spelling of established, meaning fixed permanently.

"Decree" means a fixed order, the kind a king issues.

"Shall not pass" means this law can never be broken or reversed.

The same God who created the heavens also locked their order in place.

🔒 Stablished is an old form of established
📜 Decree means a fixed, kingly order
🚫 Shall not pass means unbreakable
📖 God fixed the order He created

# Psalms 148:7-12
# 🌍 Earth's Full Cast Joins The Praise
---
## 🌍 Praise The LORD From The Earth

The first half of this psalm called on everything above the sky.

This verse turns the same command toward everything below it.

Together the two halves cover the entire creation, top to bottom.

Nothing in the universe is left out of this summons.

⬆️ The first half called on the sky
⬇️ This half turns toward the earth
🌐 Together they cover all creation
📖 Nothing is left out of the summons

## 🐋 Ye Dragons, And All Deeps

"Dragons" is an old word, not the mythical creature the word suggests today.

It points to large sea creatures, the kind ancient people found most frightening.

"Deeps" means the ocean depths, places no ancient sailor could see or reach.

Even the most feared and unreachable parts of creation are called to praise.

🐋 Dragons meant large sea creatures
😨 They were the most feared animals known
🌊 Deeps means the ocean depths
📖 Even the unreachable praises God

## 🔥 Fire, And Hail, Snow, And Vapours

This list names extreme, sometimes dangerous weather.

Fire likely pictures lightning striking down from a storm.

Hail was feared enough to appear as one of the plagues on Egypt.

"Vapours" means mist or fog, thin and hard to hold onto.

Even destructive or fleeting weather still answers to God's command.

🔥 Fire likely means lightning
🧊 Hail was one of the plagues on Egypt
🌫️ Vapours means mist or fog
📖 Even destructive weather answers to God

## 🌪️ Stormy Wind Fulfilling His Word

A storm looks chaotic to the people caught in it.

"Fulfilling his word" says the opposite, this wind is following an order.

Nothing about the weather in this psalm happens outside God's command.

Even the wildest storm still answers to someone.

🌪️ A storm looks chaotic to people in it
📜 Fulfilling his word means following an order
🎯 Weather here is never outside God's command
📖 The wildest storm still answers to Him

## ⛰️ Mountains, And Hills, Fruitful Trees, And Cedars

Mountains and hills are the land's most permanent, unmoving features.

"Cedars" points to the famous cedar trees of Lebanon, prized across the ancient world.

Solomon's temple was built largely from this same wood.

From the most fixed feature of the land to its tallest tree, all of it praises God.

⛰️ Mountains and hills never move
🌲 Cedars were Lebanon's famous trees
🏛️ Solomon's temple used this wood
📖 Fixed land and living trees both praise God

## 🦁 Beasts, And Cattle, Creeping Things, And Flying Fowl

These four categories echo the exact language used in Genesis 1.

"Beasts" means wild animals, and "cattle" means tame, domestic animals.

"Creeping things" covers small animals that move along the ground.

"Flying fowl" covers every kind of bird in the sky.

The same categories God named at creation are named again here in praise.

📜 These categories echo Genesis 1
🦁 Beasts means wild, cattle means tame
🐛 Creeping things means small ground animals
📖 Creation's own categories now praise their Maker

## 👑 Kings Of The Earth, And All People, Princes, And Judges

The psalm now turns from creation and animals to human rulers.

"Kings" and "princes" name different levels of political power.

"Judges" adds those who hold legal authority over others.

No level of human power stands outside this command to praise.

👑 Kings and princes are political rulers
⚖️ Judges hold legal authority
🚫 No level of power is exempt
📖 Every human authority is called to praise

## 🧑 Young Men, And Maidens, Old Men, And Children

This final list covers every stage of human life at once.

"Maidens" means young unmarried women.

The list moves from young and strong to old and small.

The whole human race is named together in one line.

🧑 Young men and maidens picture strength
👰 Maidens means young unmarried women
🧓 Old men and children complete the range
📖 The whole human race is named together

# Psalms 148:13-14
# 👑 A Name Above Earth And Heaven
---
## 🏔️ His Name Alone Is Excellent

"Excellent" in this verse does not simply mean very good.

It carries the older sense of towering, lifted high above everything else.

No other name shares this same place, God's name stands alone.

This line gives the reason for the whole psalm's praise.

🏔️ Excellent here means towering, lifted high
🚫 No other name shares this place
🎯 God's name stands alone
📖 This line gives the whole psalm's reason

## 🌍 His Glory Is Above The Earth And Heaven

The whole psalm has called on things in the heavens and things on the earth.

This line says God's glory outranks every single one of them.

Nothing summoned earlier in the psalm compares to Him at all.

Creation praises Him because it is not equal to Him.

🌍 The psalm called on heaven and earth
👑 God's glory outranks all of it
⚖️ Nothing compares to Him
📖 Creation praises what it cannot equal

## 🐂 He Exalteth The Horn Of His People

"Horn" is a common Old Testament picture for strength, like an animal's horn.

Exalting the horn means giving someone real strength or victory.

This shifts the psalm from creation in general to God's own people specifically.

The same God who commands stars and storms also lifts up His people.

🐂 Horn is a common picture for strength
⬆️ Exalting the horn means giving victory
🎯 This verse turns to God's own people
📖 The star ruling God lifts them too

## 🤝 A People Near Unto Him

"Near" describes closeness, not just geography.

Israel is described as a nation with unusual access to God.

The psalm closes with the very same word it opened with, hallelujah.

Every summons across the whole psalm ends on this one word.

🤝 Near describes closeness, not distance
🇮🇱 Israel had unusual access to God
🔁 The psalm closes with hallelujah again
📖 Every summons in this psalm ends here
`.trim();

export const PSALMS_ONE_HUNDRED_FORTY_EIGHT_PERSONAL_SECTIONS = parsePsalmsOneHundredFortyEightRawNotes(
  PSALMS_ONE_HUNDRED_FORTY_EIGHT_RAW_NOTES,
);
