export type IsaiahTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahTwentyFiveRawNotes(rawText: string): IsaiahTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 25:${startVerse}` : `Isaiah 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 25 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_TWENTY_FIVE_RAW_NOTES = `# Isaiah 25:1-3
# 🙌 A Song Of Praise After Judgment
---
## 🙌 I Will Exalt Thee, I Will Praise Thy Name

"Exalt" means to lift someone up as highest, not just to compliment them.

Chapter twenty four ended with the LORD reigning in Zion.

Now Isaiah answers that reign with personal worship.

Judgment was never the end of the story.

Praise is what judgment was always leading toward.

🙌 Exalt means to lift up as highest

👑 Chapter twenty four ended with God reigning

🎤 Isaiah now answers with personal worship

📖 Judgment was always leading toward praise

## 📜 Thy Counsels Of Old Are Faithfulness And Truth

"Counsels" means plans or decisions, not casual advice.

Of old means those plans were made long before today.

Isaiah has just watched many of them come true exactly as promised.

A proven plan carries far more weight than a new promise.

📜 Counsels means plans, not casual advice

⏳ Of old means decided long ago

✅ Isaiah watched these plans come true

📖 A proven plan carries lasting weight

## 🏚️ Thou Hast Made Of A City An Heap

"Heap" pictures a city smashed down into a pile of broken rubble.

A "defenced" city was a fortified city, built to survive attack.

Even a fortress like that becomes only a ruin here.

Isaiah never names this city on purpose.

Chapter twenty four also left its ruined city unnamed.

This one will never be rebuilt again.

🏚️ Heap means smashed into rubble

🛡️ Defenced means fortified against attack

👤 Isaiah leaves the city unnamed on purpose

📖 Even a fortress falls and stays fallen

## 😨 The City Of The Terrible Nations Shall Fear Thee

"Terrible" here does not mean bad.

It means causing terror or dread.

These are nations fierce enough to frighten everyone around them.

Even nations that strong end up praising God instead of fighting Him.

Their fear here is not about losing a battle.

It is reverence for a power greater than their own.

😨 Terrible here means causing dread

💪 These nations were genuinely fierce

🙌 Even fierce nations turn to praise

📖 Fear here means reverence, not defeat

# Isaiah 25:4-5
# 🌊 Refuge From The Storm
---
## 🔁 A Strength To The Poor, A Strength To The Needy

Isaiah repeats a strength twice on purpose.

Hebrew poetry often doubles an idea instead of stating it only once.

The poor and the needy are two ways of naming people with no power of their own.

God is named as their protector before any nation is even mentioned.

This sets up the theme for the rest of the passage.

🔁 Isaiah repeats a strength twice

📜 Hebrew poetry often doubles an idea

🤲 Poor and needy both mean powerless

📖 God protects the powerless first

## 🌊 A Refuge From The Storm, A Shadow From The Heat

A refuge is a safe place to run to when danger comes.

A storm in this region could mean sudden, violent flooding.

Shade mattered just as much in a land with brutal heat.

God is pictured meeting two very different kinds of danger at once.

Whatever the threat, shelter is already provided.

🌊 Refuge means a safe place to run

⛈️ Storms in this region could flood suddenly

☀️ Shade protected people from brutal heat

📖 God shelters from every kind of danger

## 💨 The Blast Of The Terrible Ones Is As A Storm Against The Wall

"Blast" here means a violent gust or attack, not an explosion.

The terrible ones are the same fearsome oppressors named back in verse three.

Their attack is compared to a storm slamming against a wall.

A wall built to protect people becomes the very thing under assault.

Even that kind of pressure cannot outlast God's shelter.

💨 Blast means a violent gust or attack

😨 Terrible ones repeats the oppressors from verse three

🧱 Their attack hits like a storm

📖 God's shelter outlasts even that pressure

## 🌿 The Branch Of The Terrible Ones Shall Be Brought Low

Verse five pictures scorching heat suddenly cooled by the shadow of a passing cloud.

That is the picture for how God silences the noise of these oppressors.

"Branch" here stands for a family's strength or future, not a tree limb.

Bringing that branch low means cutting off their power for good.

The very people who terrified others end up humbled instead.

🌥️ A passing cloud cools scorching heat

🤫 That pictures God silencing the noise

🌿 Branch here means a family's strength

📖 The oppressors end up humbled instead

# Isaiah 25:6-8
# 🍽️ A Feast On The Mountain
---
## ⛰️ In This Mountain

This mountain refers to Mount Zion, Jerusalem's temple mountain.

Chapter twenty four already ended with the LORD reigning there.

Now that same mountain becomes the site of a joyful feast.

The place of judgment in chapter twenty four becomes the place of celebration here.

Zion is the hinge connecting both chapters.

⛰️ This mountain means Mount Zion

👑 Chapter twenty four crowned the LORD there

🎉 Zion now hosts a joyful feast

📖 Judgment and celebration share one mountain

## 🍖 A Feast Of Fat Things, A Feast Of Wines On The Lees

"Fat things" meant the richest, most tender cuts of meat available.

Wine "on the lees" was left resting on its sediment to deepen its flavor.

"Well refined" wine had that sediment carefully strained out before serving.

Together these describe the best food and the best drink a table could hold.

This is not a plain meal.

It pictures complete abundance.

🍖 Fat things meant the richest cuts of meat

🍷 Lees means wine rested on its sediment

🧪 Well refined means the sediment was strained out

📖 This feast pictures complete abundance

## 🌍 Unto All People

This feast is not for Israel alone.

All people points forward to every nation being welcomed to God's table.

That was a radical promise for readers who assumed this blessing was theirs only.

Paul later builds his whole argument for including the Gentiles on promises like this one.

The invitation was always wider than one nation.

🌍 This feast welcomes every nation

🚪 Not Israel alone, but all people

✝️ Paul later builds on promises like this

📖 The invitation was always this wide

## 🫥 The Face Of The Covering Cast Over All People

A "vail" here does not mean a piece of clothing.

It pictures something spread over every nation, blocking them from seeing clearly.

Many scholars believe this covering represents death and spiritual blindness together.

God promises to destroy that covering completely, not just lift it for a moment.

What has separated every nation from God is about to be removed.

🫥 Vail here is not a piece of clothing

🌑 It pictures blindness spread over every nation

💀 Many scholars connect it to death itself

📖 God removes what separated every nation from Him

## 💀 He Will Swallow Up Death In Victory

Death is pictured here as something that swallows people up.

This verse flips that image completely, now death itself gets swallowed.

Paul quotes this exact verse in First Corinthians fifteen when writing about the resurrection.

Revelation twenty one later echoes the same promise in its picture of the new creation.

Isaiah is describing the final defeat of death centuries before it happened.

💀 Death normally swallows people up

🔄 Here that image gets reversed completely

📜 Paul quotes this in First Corinthians fifteen

📖 Isaiah describes death's final defeat in advance

## 😢 The Lord GOD Will Wipe Away Tears From Off All Faces

Wiping a tear is a small, personal, tender action.

Here the LORD does it Himself, face by face.

Revelation twenty one uses this exact same picture for the world made new.

"Rebuke" in the same verse means the public shame Israel had carried among the nations.

God promises to take that shame away completely, along with every tear.

😢 Wiping tears is a tender, personal act

🙌 The LORD does this Himself, face by face

🌅 Revelation twenty one repeats this same picture

➡️ Shame and sorrow both get removed together

# Isaiah 25:9-12
# ⏳ Moab Brought Low
---
## 👀 Lo, This Is Our God, We Have Waited For Him

"Lo" is an old word for look, or pay attention right now.

"In that day" points to a future moment still ahead of Isaiah.

The people finally point at God directly and name Him as their own.

Waiting is not the same as doubting.

They kept trusting through the entire wait.

👀 Lo means look, pay attention now

📅 In that day points to a future moment

🙌 The people finally name God as their own

📖 Waiting through hardship is not doubt

## 🔁 We Will Be Glad And Rejoice In His Salvation

Isaiah repeats we have waited for him a second time here.

Repetition like this works the same way it did back in chapter twenty four.

It is not careless writing, it emphasizes something the writer wants remembered.

Long patience is about to turn into open gladness.

The waiting itself becomes part of the celebration.

🔁 Isaiah repeats we have waited on purpose

📜 Chapter twenty four used this same device

⏳ Long patience is about to end

📖 The wait becomes part of the joy

## 🗺️ Moab Shall Be Trodden Down Under Him

Moab was a nation east of the Dead Sea, a longtime enemy of Israel.

Every city before this was left unnamed on purpose.

Now Isaiah names one specific nation by name.

"Trodden down for the dunghill" pictures straw crushed underfoot until it turns into manure.

That is about as low and worthless as an image can get.

🗺️ Moab was a longtime enemy east of Israel

🕵️ Earlier cities in this chapter stayed unnamed

🎯 Now one specific nation gets named

📖 Trodden down pictures total, worthless defeat

## 🏊 As He That Swimmeth Spreadeth Forth His Hands To Swim

This pictures someone thrashing their arms to stay above water.

Moab is compared to a swimmer struggling not to sink.

All that motion still cannot save a swimmer God intends to bring down.

Their pride sinks along with everything they gained by force.

Struggling harder does not change the outcome here.

🏊 A swimmer thrashes arms to stay afloat

🌊 Moab struggles the same way here

⬇️ Struggling cannot stop God's judgment

📖 Their pride sinks with everything they gained

## 🔁 Bring Down, Lay Low, And Bring To The Ground, Even To The Dust

Isaiah stacks four different verbs for one single idea, total collapse.

Hebrew poetry already used this same stacking technique back in chapter twenty four.

Each verb pushes the picture lower than the last, ending at the dust itself.

Dust is where every proud, fortified city in this chapter ends up.

The chapter that opened with an unnamed city in ruins closes with pride ground into dust.

What began as judgment on the earth ends as the fall of pride itself.

🔁 Four verbs stack toward one idea

📜 Chapter twenty four used this technique too

⬇️ Every verb pushes lower than the last

📖 Judgment on the earth ends in pride's fall
`.trim();

export const ISAIAH_TWENTY_FIVE_PERSONAL_SECTIONS = parseIsaiahTwentyFiveRawNotes(ISAIAH_TWENTY_FIVE_RAW_NOTES);
