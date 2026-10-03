export type EzekielTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielTwentyFiveRawNotes(rawText: string): EzekielTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 25:${startVerse}` : `Ezekiel 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Ezekiel 25 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_TWENTY_FIVE_RAW_NOTES = `# Ezekiel 25:1-4
# 😏 Ammon Mocks Jerusalem's Fall
---
## 🧭 Set Thy Face Against The Ammonites

"Set thy face against" means turn toward someone with the full weight of judgment.

Ezekiel used this same command earlier when God judged Jerusalem.

Now the message turns outward toward a foreign nation.

The Ammonites descended from Lot, Abraham's nephew.

They lived just east of the Jordan River.

This chapter turns from Judah's sin to the nations who celebrated her fall.

🧭 Set thy face means aim judgment directly
📜 Ezekiel used this against Jerusalem before
🏞️ Ammonites descended from Lot, lived east
📖 Judgment now turns toward the nations

## 😏 Thou Saidst, Aha

"Aha" is not a cry of surprise here.

It is a shout of mocking delight over someone else's disaster.

Ammon cheered when Babylon tore down Jerusalem's Temple.

Think of a neighbor laughing while your house burns down.

That laughter reveals exactly where their heart stands.

God heard that laughter, and this whole chapter is His answer to it.

😏 Aha means mocking delight, not surprise
🏛️ Ammon cheered the Temple's destruction
🔥 Like a neighbor laughing at your fire
📖 God heard it and now answers back

## ⛪ Against My Sanctuary, When It Was Profaned

Sanctuary names the Temple in Jerusalem, God's own house.

Profaned means a holy place was treated as common and torn open.

Ezekiel had just described that exact destruction at the end of the last chapter.

Ammon did not mourn that loss.

They celebrated it as proof that Judah's God had failed.

God takes that celebration personally, since the sanctuary belonged to Him first.

⛪ Sanctuary names God's own Temple
🧱 Profaned means made common, torn open
😈 Ammon celebrated instead of mourning
📖 God takes that celebration personally

## 🏞️ Against The Land Of Israel, When It Was Desolate

This is the second target of Ammon's taunt.

Desolate means the land was left empty and ruined after Babylon's invasion.

The same verse adds a third taunt, aimed at the house of Judah taken captive.

Three disasters, three separate taunts, all aimed at the same fallen nation.

Ammon piled insult on top of injury instead of showing any sympathy.

A grieving nation needs comfort, not mockery from a neighbor who escaped the same judgment.

🏞️ Desolate means left empty and ruined
🔁 Three taunts hit the same nation
💔 Ammon mocked instead of comforting
📖 Insult piled on top of injury

## 🏜️ I Will Deliver Thee To The Men Of The East

The men of the east were nomadic desert tribes living beyond the Jordan.

They had no fixed cities, moving instead with their herds from place to place.

God hands Ammon's own fields and vineyards over to these wandering outsiders.

The invaders will eat the fruit and drink the milk that once belonged to Ammon.

The nation that mocked Judah's loss is about to lose everything the same way.

Mockery never protects anyone from the same fate landing on their own doorstep.

🏜️ Men of the east were nomadic tribes
🐫 They moved with herds, no fixed cities
🔄 Ammon loses everything the same way Judah did
📖 Mockery did not protect them from this

# Ezekiel 25:5-7
# 🐫 Mockery Turns Into Ruin
---
## 🏙️ I Will Make Rabbah A Stable For Camels

Rabbah was the capital city of Ammon, their center of power and pride.

God says that proud capital will become nothing more than a camel stable.

The same verse says the rest of Ammon becomes a couching place for flocks.

A couching place simply means where animals lie down to rest.

The whole nation, capital and countryside, turns into empty pastureland.

A city that once ruled an entire nation ends up ruled by livestock instead.

🏙️ Rabbah was Ammon's proud capital
🐫 It becomes a camel stable instead
🐑 The countryside becomes flock pastureland
📖 A ruling city ends up ruled by livestock

## 🔁 Ye Shall Know That I Am The LORD

This exact phrase has repeated throughout the book of Ezekiel.

Until now, God mostly spoke it to Israel, His own covenant people.

Here it is spoken to Ammon, a nation that never claimed to follow Him at all.

God is not only Lord over Israel.

He is Lord over every nation, whether they ever acknowledged Him or not.

Ammon is about to learn that the same way Israel already did.

🔁 This phrase repeats throughout Ezekiel
🇮🇱 Until now it was spoken to Israel
🌍 Now it is spoken to Ammon too
📖 God is Lord over every nation

## 👏 Clapped Thine Hands, And Stamped With The Feet

Clapping and stamping here are not applause.

They are a gloating celebration, the kind of gesture used to mock a fallen enemy.

Ammon performed this gesture while watching Israel's land lay desolate.

Think of someone dancing in the street outside a neighbor's funeral.

That picture captures how ugly this celebration looked to God.

Rejoiced in heart means the glee was completely sincere.

👏 Clapping and stamping were gloating, not applause
🕺 Like dancing outside a neighbor's funeral
💔 Ammon celebrated Israel's desolation openly
📖 Rejoiced in heart means it was sincere

## 💰 Deliver Thee For A Spoil To The Heathen

Spoil means plunder, the loot taken when an army conquers a people.

Ammon is about to become that plunder for other nations instead of taking it.

Cut thee off from the people means Ammon stops existing as a distinct nation.

Perish out of the countries means there will be no place left bearing their name.

History confirms this happened, since no nation called Ammon exists anywhere today.

The mockers became the mocked, destroyed by the same kind of judgment they celebrated.

💰 Spoil means plunder taken by conquerors
🚫 Cut off means Ammon stops existing
🗺️ Perish out means no place bears their name
📖 The mockers became the mocked

# Ezekiel 25:8-11
# 🏔️ Moab Is Erased
---
## 👪 Moab And Seir Do Say

Moab descended from Lot as well, making them cousins to Ammon.

They lived east of the Dead Sea, another neighbor with centuries of conflict against Israel.

Seir names the hill country belonging to Edom, mentioned here alongside Moab.

Both nations watched Jerusalem fall and drew the same wrong conclusion.

Their shared insult is recorded in the very next line.

Family history did not make these neighbors any kinder to Judah.

👪 Moab descended from Lot, like Ammon
🏔️ Seir names Edom's hill country
🤝 Both nations shared the same insult
📖 Family ties did not bring kindness

## ✡️ The House Of Judah Is Like Unto All The Heathen

This insult strikes at the heart of what made Israel different.

Judah had always claimed a special covenant relationship with the one true God.

Moab's taunt says that relationship meant nothing in the end.

To them, Judah's fall proved their God was no stronger than any other god.

This is the real target of God's anger in this chapter.

Mocking a nation's fall is one thing, but mocking God's own faithfulness is another.

✡️ Judah claimed a special covenant with God
😏 Moab's taunt denied that meant anything
⚖️ The insult really questioned God's own power
📖 Mocking God's faithfulness is the real offense

## 🚪 I Will Open The Side Of Moab From The Cities

Opening the side of a country means breaking down its border defenses.

Moab's frontier cities were its first line of protection against invaders.

Bethjeshimoth, Baalmeon, and Kiriathaim were real border towns, each a known stronghold.

The glory of the country names these cities as Moab's pride and security.

God is about to strip away exactly what Moab trusted to keep it safe.

Pride in a border wall means nothing once God decides to open it.

🚪 Opening the side means breaking border defense
🏰 These were Moab's real frontier strongholds
💎 Glory of the country names their pride
📖 God strips away what Moab trusted

## 🪦 That The Ammonites May Not Be Remembered Among The Nations

This judgment promises more than defeat.

It promises erasure.

Both Ammon and Moab are handed over to the same wandering desert tribes.

Over time their names disappeared from maps and from history itself.

No nation today calls itself Ammon or Moab.

Mockery carried a cost that outlasted the mockers themselves.

🪦 This judgment means erasure, not just defeat
🏜️ Both nations given to the same desert tribes
🗺️ No nation today is called Ammon or Moab
📖 Mockery outlasted the mockers themselves

# Ezekiel 25:12-14
# 👬 Edom's Betrayal Answered
---
## 👬 Edom Hath Dealt Against The House Of Judah By Taking Vengeance

Edom descended from Esau, Jacob's own twin brother.

Israel and Edom were family, not strangers, going back to the very beginning.

When Babylon attacked Jerusalem, Edom did not stay neutral.

Other prophets record Edom helping loot the city and trap fleeing refugees.

Family loyalty should have meant something here, and it meant nothing at all.

Betrayal by a brother cuts deeper than an insult from a stranger.

👬 Edom descended from Esau, Jacob's brother
🩸 Israel and Edom were family, not strangers
⚔️ Edom helped during Jerusalem's fall, not against it
📖 Betrayal by family cuts deepest

## 🏙️ I Will Make It Desolate From Teman

Teman was a major city in Edom's territory, known for wisdom and trade.

Dedan was a trading region connected to Edom further to the south.

Naming both places means this judgment covers the whole territory, not just one city.

Man and beast both disappearing means total emptiness, not a partial defeat.

A country famous for smart advisors could not reason its way out of this judgment.

🏙️ Teman was a known Edomite city
🐫 Dedan was a southern trading region
🗺️ Both places mean the whole territory
📖 Wisdom could not save them from this

## 🔄 By The Hand Of My People Israel

God does not only judge Edom directly.

He hands the task to Israel, the very nation Edom had betrayed.

This reverses the entire situation from the start of the chapter.

Edom rejoiced over Israel's weakness.

Israel ends up being the instrument of Edom's downfall instead.

History records a real fulfillment centuries later, when Israel's own kings conquered Edom's territory.

🔄 God used Israel to judge Edom
🔃 This reverses who rejoiced over whom
📜 History later fulfilled this, Edom was conquered
📖 Vengeance became literal history, not just words

# Ezekiel 25:15-17
# ⚔️ The Philistines' Old Hatred Ends
---
## 💔 To Destroy It For The Old Hatred

The Philistines were Israel's oldest and most familiar enemy.

Goliath and Samson's lifelong conflicts both trace back to this same nation.

Old hatred names a grudge stretching back for generations, not one recent event.

Despiteful heart means their revenge came from deep, settled bitterness.

Some wounds get older instead of healing.

God noticed that old bitterness too.

⚔️ Philistines were Israel's oldest enemy
🗿 Goliath and Samson trace to this nation
💔 Old hatred means a generations old grudge
📖 God noticed bitterness that never healed

## 🗡️ I Will Cut Off The Cherethims

The Cherethims were a specific group within the Philistine nation.

Years earlier, King David trusted Cherethite soldiers as his own personal bodyguard.

That detail makes this judgment sharper, since Israel once depended on men from this very group.

Trusted allies in one generation became a target for judgment in another.

Relationships between nations rarely stay the same for long.

🗡️ Cherethims were a Philistine subgroup
🛡️ David once trusted them as bodyguards
🔄 Former allies became a target here
📖 National relationships rarely stay the same

## 🌊 Destroy The Remnant Of The Sea Coast

The Philistines lived along the Mediterranean coast in cities like Gaza and Ashdod.

Remnant here means whatever was left after earlier wars had already thinned them out.

This judgment finishes what those earlier defeats had already started.

A long rivalry does not end with a partial victory in this chapter.

God closes it out completely, coastline and all.

🌊 Philistines lived along the Mediterranean coast
📉 Remnant means what earlier wars left behind
🏁 This finishes what earlier defeats started
📖 God closes out the rivalry completely

## 😡 With Furious Rebukes

Furious rebukes names punishment delivered with visible, forceful anger.

This is not a quiet correction behind closed doors.

The same refrain returns one final time, they shall know that I am the LORD.

That phrase has now closed every judgment in this entire chapter.

Four nations mocked Jerusalem's pain.

All four heard the exact same answer.

😡 Furious rebukes means forceful, visible punishment
🔁 The refrain closes every judgment here
🌍 Four nations, one identical answer
📖 Mockery of pain still has a limit
`.trim();

export const EZEKIEL_TWENTY_FIVE_PERSONAL_SECTIONS = parseEzekielTwentyFiveRawNotes(EZEKIEL_TWENTY_FIVE_RAW_NOTES);
