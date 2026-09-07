export type PsalmsFortyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFortyEightRawNotes(rawText: string): PsalmsFortyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFortyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+48:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 48 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+48:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+48:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 48 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 48,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 48:${startVerse}` : `Psalms 48:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 48 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FORTY_EIGHT_RAW_NOTES = `# Psalms 48:1-3
# 🏙️ Zion, The City Of The Great King
---
## 🙌 Great Is The LORD, And Greatly To Be Praised

"Great" here does not mean merely impressive.

It means God is worthy of the highest praise anyone can offer.

This psalm was likely sung by pilgrims arriving in Jerusalem for a festival.

The opening line sets the tone before a single detail about the city appears.

Praise comes first, and every verse after this one explains why.

👑 Great means worthy of top praise

🎶 Pilgrims likely sang this at Jerusalem

🥇 Praise comes before any details

📖 The reason follows in later verses

## 🏔️ In The City Of Our God, In The Mountain Of His Holiness

The city of our God means Jerusalem, where the temple stood.

The mountain of his holiness means Mount Zion, the ridge the temple sat on.

Calling it holy sets this one hill apart from every other mountain nearby.

Jerusalem was not holy by nature.

It became holy because God chose to dwell there.

🏙️ City of our God means Jerusalem

⛰️ Mountain of his holiness means Zion

✨ Holiness sets this hill apart

📖 God's presence made the place holy

## 🌍 Beautiful For Situation, The Joy Of The Whole Earth

"Situation" here means location, not appearance.

Zion is being praised for where it sits, not simply how it looks.

Calling it the joy of the whole earth is poetic exaggeration.

The writer means Jerusalem should matter to every nation, not only Israel.

A small hill in a small kingdom gets described with the biggest praise language available.

📍 Situation means location, not looks

🌍 Joy of whole earth is poetic praise

🏙️ Jerusalem is meant to matter globally

📖 A small hill gets the biggest praise

## 🧭 On The Sides Of The North

This does not mean Zion sits on the north edge of Jerusalem.

Many scholars believe this phrase echoes an older image from surrounding nations.

Some ancient peoples believed their gods lived on a great mountain in the north.

The psalm borrows that image and hands the honor to Zion instead.

The true God outranks any mountain other nations imagined for their gods.

🧭 Sides of north echoes an old image

⛰️ Other nations pictured their god's mountain there

🏔️ The psalm hands that honor to Zion

📖 The true God outranks imagined ones

## 👑 The City Of The Great King

This title belongs to God, not to any human ruler of Jerusalem.

Ancient kings often claimed a capital city as proof of their own greatness.

This verse quietly corrects that assumption.

Jerusalem is great because it belongs to the greatest King of all.

Every earthly king who ever ruled there was only borrowing the title.

👑 Great King means God, not a human

🏙️ Kings usually claim credit for capitals

✅ This verse corrects that assumption

📖 Every ruler there borrowed God's title

## 🛡️ God Is Known In Her Palaces For A Refuge

"Her palaces" refers to the grand buildings inside Jerusalem, especially near the temple.

A refuge means a safe place to run when danger comes.

People learned that God was a refuge from inside the city itself.

Palaces built by human kings usually promised safety through soldiers and walls.

Here safety comes from God's presence, not from the building.

🏛️ Palaces means Jerusalem's grand buildings

🛡️ Refuge means a safe place to run

🏙️ Safety was learned inside the city itself

📖 God's presence secured it, not the walls

# Psalms 48:4-8
# ⚔️ Kings Flee In Terror
---
## 👀 For, Lo, The Kings Were Assembled

"Lo" is an old word meaning look, or pay attention.

This describes a coalition of kings gathering their armies against Jerusalem.

Many scholars connect this to a real invasion Judah faced at some point.

The exact king or battle is not named here.

What mattered to the writer was the pattern, enemies uniting against God's city.

👀 Lo means look, or pay attention

⚔️ Kings gathered their armies together

📜 Likely recalls a real invasion of Judah

📖 Enemies uniting was the real pattern

## 🚶 They Passed By Together

This pictures the enemy kings marching past Jerusalem in formation, as one united army.

Uniting multiple kingdoms against one small city was meant to guarantee an easy victory.

Nothing about this moment sounds threatening yet.

That calm tone is about to change completely.

🚶 Passed by together means one united army

🤝 Multiple kingdoms joined against one city

😌 The tone here still sounds calm

➡️ That calm is about to break

## 😲 They Saw It, And So They Marvelled

"It" likely means Jerusalem itself, or some visible sign of God's presence there.

"Marvelled" means they were caught completely off guard.

These kings expected an easy target, not something that stopped them cold.

Their confidence breaks the moment they actually see the city.

👀 It likely means Jerusalem itself

😲 Marvelled means caught off guard

🎯 They expected an easy target

📖 Their confidence breaks on arrival

## 🏃 They Were Troubled, And Hasted Away

"Troubled" here means gripped by real panic, not mild worry.

"Hasted away" means they fled quickly, without finishing what they came to do.

An army that marches together in verse four runs apart by verse five.

No battle is even described here.

The kings simply lose their nerve and leave.

😨 Troubled means gripped by panic

🏃 Hasted away means they fled fast

⚔️ No actual battle is described

📖 Fear alone ended the invasion

## 🤰 Pain, As Of A Woman In Travail

"Travail" means the intense pain of childbirth.

This is a common Old Testament picture for sudden, overwhelming fear.

Labor pain arrives fast and cannot be stopped once it starts.

That is exactly the kind of fear that seizes these kings.

🤰 Travail means the pain of childbirth

⚡ It pictures sudden overwhelming fear

⏳ That pain cannot be stopped once started

📖 The same fear seizes these kings

## 🚢 Thou Breakest The Ships Of Tarshish

Tarshish was a distant trading port, likely somewhere in the western Mediterranean.

Ships of Tarshish became a general phrase for the largest, most impressive vessels of the day.

Breaking those ships pictures God defeating even the strongest human power.

The east wind names the specific weapon, a storm strong enough to wreck a fleet.

Nothing built by human hands can stand against it.

🚢 Tarshish ships meant the largest vessels

🌬️ East wind means a storm that wrecks fleets

💥 Even the strongest fleet could not survive

📖 Human power cannot stand against God

## 👂 As We Have Heard, So Have We Seen

The worshipers had heard stories about God protecting Jerusalem before this moment.

Now they have watched it happen with their own eyes.

Hearing a story and witnessing it firsthand are two very different kinds of faith.

This generation gets to move from the first kind to the second.

👂 Heard means stories passed down before

👁️ Seen means witnessed it firsthand

🔁 Hearing and seeing are different kinds of faith

📖 This generation witnessed it themselves

## ⚔️ In The City Of The LORD Of Hosts

"LORD of hosts" is a title naming God as commander over armies of angels.

It appears here right after the enemy's sudden retreat.

The title fits the moment perfectly.

The real army protecting Jerusalem was never a human one.

⚔️ LORD of hosts means commander of angels

🏃 This follows the enemy's sudden retreat

🛡️ The real protection was never human

📖 Angel armies, not soldiers, won this

## 🏛️ God Will Establish It For Ever. Selah

"Establish" means to make secure and lasting.

The city that just survived an invasion is promised permanent protection.

"Selah" likely marked a musical pause, giving singers a moment to reflect.

The pause lands right after the biggest claim in the psalm so far.

🏛️ Establish means made secure forever

🛡️ Jerusalem gets lasting protection promised

⏸️ Selah likely marked a musical pause

📖 The pause follows the psalm's biggest claim

# Psalms 48:9-11
# 🙏 Meditating On God's Lovingkindness
---
## ❤️ We Have Thought Of Thy Lovingkindness

"Lovingkindness" translates a Hebrew word, chesed, meaning God's loyal, covenant keeping love.

It is not a passing feeling.

It is a steady commitment that never quits.

The worshipers pause here to think carefully about that love, not just feel it.

❤️ Lovingkindness translates the Hebrew word chesed

🤝 It means loyal, covenant keeping love

⏳ It is a steady commitment, not a mood

📖 Worshipers pause here to think it through

## 🏛️ In The Midst Of Thy Temple

The temple was the building where God's presence was said to dwell most directly.

Meditating on God's love happens here, in that exact space.

This was not private, quiet reflection alone at home.

It happened in the middle of public worship, surrounded by others doing the same.

🏛️ Temple was where God's presence dwelled

🙏 Reflection happens inside that exact space

👥 This worship happened alongside a whole crowd

📖 Meditation and public worship both matter

## 🏷️ According To Thy Name, So Is Thy Praise

A name in this culture meant more than a simple label.

It stood for a person's whole reputation and character.

God's praise should match exactly who he actually is.

Bigger claims about God are not empty flattery.

They are simply accurate.

🏷️ A name meant reputation and character

⚖️ Praise should match who God actually is

🚫 These claims are not empty flattery

📖 True praise is simply accurate

## ✋ Thy Right Hand Is Full Of Righteousness

The right hand was the hand of strength and action in this culture.

Calling it full of righteousness ties God's power directly to his justice.

Power alone can be used for good or for harm.

God's power is never separated from what is right.

✋ Right hand meant strength and action

⚖️ Righteousness ties power to justice

🔀 Power alone can go either way

📖 God's power is always right

## 👧 Let Mount Zion Rejoice, Let The Daughters Of Judah Be Glad

"Daughters of Judah" means the smaller towns and villages surrounding Jerusalem.

Zion was the capital, but the whole surrounding region shares in this joy.

News this big does not stay contained in one city.

It spreads outward to every town that belongs to the same nation.

👧 Daughters of Judah means nearby towns

🏙️ Zion was the capital city itself

📣 Big news spreads beyond one city

📖 The whole nation shares this joy

## ⚖️ Because Of Thy Judgments

"Judgments" here means God's right decisions and verdicts, not punishment alone.

This includes exactly what just happened, the kings who fled without a fight.

God's judgments in this psalm bring relief, not fear, for his own people.

Justice can be very good news, depending on which side of it someone stands.

⚖️ Judgments means God's right decisions

🏃 Includes the kings who just fled

😌 Judgment brought relief, not fear here

📖 Justice is good news for God's people

# Psalms 48:12-14
# 🚶 Walking Zion To Tell The Next Generation
---
## 🚶 Walk About Zion, And Go Round About Her

This is a direct instruction, not just a poetic image.

Worshipers are told to physically walk the perimeter of the city.

Walking the walls let people see with their own eyes what God had protected.

A story told secondhand does not land the same way as one witnessed firsthand.

🚶 A direct instruction to walk the city

👀 Walking let people see the protection themselves

🗣️ Firsthand witness lands differently than a story

📖 Seeing it built lasting confidence

## 🗼 Tell The Towers Thereof

Towers here means the defensive structures built into Jerusalem's walls.

Counting them was a way of taking inventory of the city's strength.

Every tower still standing was physical proof that the invasion in verse four had failed.

The walk becomes a kind of testimony, not just a stroll.

🗼 Towers means the city's defensive structures

🔢 Counting them checked the city's strength

✅ Standing towers proved the invasion failed

📖 The walk itself became a testimony

## 🧱 Mark Ye Well Her Bulwarks

"Bulwarks" means the outer walls and ramparts built for defense.

"Mark ye well" means look carefully, do not rush past it.

These walls were not decoration.

They were the reason Jerusalem could survive being surrounded by armies.

🧱 Bulwarks means the outer defensive walls

👁️ Mark well means look carefully

🛡️ These walls were built for real defense

📖 They explained the city's survival

## 🏛️ Consider Her Palaces

This repeats a word already used back in verse three.

There, palaces were tied to God being known as a refuge.

Here, considering them again ties the city's grandeur back to that same protection.

Beauty and safety are not treated as two separate things in this psalm.

🏛️ Palaces already appeared back in verse three

🛡️ There it was tied to refuge

🔁 Considering them again repeats that link

📖 Beauty and safety are tied together

## 📜 That Ye May Tell It To The Generation Following

This whole walking tour has one clear purpose, passing the story forward.

A generation that never saw the invasion still needs to know what happened.

Memory fades fast without something deliberate done to preserve it.

Walking, counting towers, and telling the story all serve that one goal.

📜 The tour exists to pass the story on

👶 Future generations need to hear it too

⏳ Memory fades without deliberate effort

📖 Every action here serves that one goal

## ❤️ For This God Is Our God For Ever And Ever

The psalm shifts from looking at walls to naming who truly matters.

Every tower and palace only matters because of who protects them.

This declaration is personal, our God, not a distant, general belief.

That claim is not limited to this one generation.

🏛️ The focus shifts from walls to God

❤️ Our God makes this personal, not distant

⏳ For ever and ever means no limit

📖 God's protection outlasts any single generation

## 🧭 He Will Be Our Guide Even Unto Death

A guide leads someone through unfamiliar or dangerous ground.

This promise covers the whole of life, all the way to its end.

Some ancient manuscripts read this phrase differently.

They read it as beyond death, not only up to it.

The promise reaches further than this one lifetime alone.

🧭 A guide leads through dangerous ground

⏳ This promise covers a whole lifetime

📜 Some manuscripts read it as beyond death

📖 God's guidance outlasts this life alone
`.trim();

export const PSALMS_FORTY_EIGHT_PERSONAL_SECTIONS = parsePsalmsFortyEightRawNotes(PSALMS_FORTY_EIGHT_RAW_NOTES);
