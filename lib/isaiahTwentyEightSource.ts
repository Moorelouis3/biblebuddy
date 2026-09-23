export type IsaiahTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahTwentyEightRawNotes(rawText: string): IsaiahTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 28:${startVerse}` : `Isaiah 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Isaiah 28 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_TWENTY_EIGHT_RAW_NOTES = `# Isaiah 28:1-4
# 🍇 Woe To The Crown Of Pride
---
## 👑 The Crown Of Pride, To The Drunkards Of Ephraim

Ephraim refers to the leading tribe of Israel's northern kingdom.

Its capital city, Samaria, sat proudly on a hill above a rich valley.

That hilltop city itself became a crown of pride.

The men who should have led it well were drunk instead.

👑 Ephraim means the northern kingdom of Israel

🏔️ Samaria sat proudly on a hilltop

🍷 Its own leaders were often drunk

📖 Pride without watchfulness invites judgment

## 🌸 Whose Glorious Beauty Is A Fading Flower

"Fading flower" pictures something beautiful that will not last.

A flower looks stunning for only a short season.

The city's wealth and status felt permanent to the people living there.

God says it was already fading, whether they could see it or not.

🌸 A fading flower looks beautiful but briefly

⏳ Beauty like that does not last

😌 The people assumed it was permanent

📖 God saw what they could not

## ⛈️ A Mighty And Strong One... A Tempest Of Hail

This "mighty and strong one" is widely understood as the empire of Assyria.

Isaiah pictures Assyria's coming army as a hailstorm and a flood.

Both images describe something overwhelming that cannot be stopped once it starts.

God is the one sending this storm, not merely allowing it.

⛈️ The strong one likely means Assyria

🌊 Hail and flood picture overwhelming force

🛑 Nothing stopped it once it started

📖 God directed the storm, not just allowed it

## 🍈 As The Hasty Fruit Before The Summer

"Hasty fruit" means an early fig, ripe before the normal harvest.

Everyone wanted that first ripe fig and ate it the moment it was found.

Samaria will fall just as fast, swallowed the moment it is ready.

The city's fall will not be a slow decline.

🍈 Hasty fruit means an early ripe fig

😋 People grabbed that fruit instantly

⚡ Samaria's fall comes just as fast

➡️ Sudden judgment, not a slow decline

# Isaiah 28:5-6
# 👑 A Crown Of Glory To The Residue
---
## ✨ The LORD Of Hosts Be For A Crown Of Glory

God offers Ephraim's faithful remnant a very different kind of crown.

The chapter just described Ephraim's own crown fading like a flower.

This time the LORD himself is the crown, not a human city.

"The residue of his people" means the faithful remnant left after judgment.

✨ God offers a crown that never fades

👑 The LORD himself becomes the crown

🌾 Residue means the faithful remnant left

📖 Lasting glory replaces a fading one

## ⚖️ A Spirit Of Judgment To Him That Sitteth In Judgment

This verse promises truly fair leadership for the people who remain faithful.

Ephraim's own leaders in the opening verses failed at exactly this.

They were drunk while sitting in judgment over the people.

God promises to give the remnant what those leaders never provided.

⚖️ This promises truly fair leadership

🍷 Ephraim's leaders had already failed at it

🔁 God gives what earlier leaders lacked

➡️ True leadership still comes from God

# Isaiah 28:7-8
# 🍷 The Priest And The Prophet Have Erred
---
## 🍷 They Also Have Erred Through Wine

This failure was not limited to Ephraim alone.

The word "also" ties Judah's own leaders to the same sin.

Judah's priests and prophets, the spiritual leaders, were drunk too.

The very men meant to guide the nation could not see straight.

🍷 Also means Judah's leaders too

👥 Priests and prophets were drunk as well

🙈 The guides could not see straight

📖 No leader is automatically safe from failure

## 🤢 All Tables Are Full Of Vomit And Filthiness

A table in this culture was where a priest ate sacred offerings.

Instead these tables were covered in vomit from drunkenness.

The image is deliberately disgusting, meant to shock the reader.

Something meant to be holy had become something no one wanted near them.

🤢 Priestly tables should have been sacred

🍽️ Instead they were covered in vomit

😖 The image is meant to shock

📖 Holiness had been replaced with disgrace

# Isaiah 28:9-10
# 👶 Precept Upon Precept
---
## 👶 Whom Shall He Teach Knowledge

These mocking words belong to the drunk priests and prophets, not to God.

They are complaining that Isaiah teaches them like small children.

"Weaned from the milk" pictures a baby just old enough to be off the breast.

They think Isaiah's message is beneath grown, important men like themselves.

👶 The mockers are speaking, not God

😤 They resent being taught like children

🍼 Weaned means just past infancy

📖 Pride made simple truth feel insulting

## 🔁 Precept Upon Precept, Line Upon Line

Many scholars believe this Hebrew phrase imitates meaningless baby talk.

The mockers use it to imitate and ridicule how Isaiah teaches.

They meant it as an insult about simple, repetitive instruction.

Verse thirteen shows God taking their own mocking words and turning them into judgment.

🔁 The phrase mimics baby babble in Hebrew

😏 It was meant as an insult

🪞 Their own words return as judgment

📖 Mockery can become the thing that judges you

# Isaiah 28:11-13
# 🗣️ With Stammering Lips And Another Tongue
---
## 🗣️ With Stammering Lips And Another Tongue Will He Speak

The people refused God's message in their own familiar language.

So God says he will speak to them through a foreign one instead.

That foreign tongue is the language of the invading Assyrian army.

What sounded like simple baby talk will be replaced by a language they cannot follow at all.

🗣️ They refused God's message in plain Hebrew

🌍 A foreign tongue means the Assyrian invaders

⚔️ Judgment now speaks a foreign tongue

📖 Rejecting simple truth invited a harder lesson

## 🛌 This Is The Rest... Yet They Would Not Hear

"The rest" and "the refreshing" describe trust and peace under God's care.

God had already offered something better than a foreign invasion.

That offer was available all along, long before Assyria ever came.

The people simply would not listen to it.

🛌 God offered real rest first

🕊️ Rest here means trust and peace with God

🙉 They refused to listen to that offer

➡️ Judgment was not the first option given

## ⛓️ That They Might Go, And Fall Backward, And Be Broken

The mockers' own words from verse ten return here as judgment.

What the mockers once used as an insult now becomes their downfall.

"Fall backward" and "be broken" picture people stumbling as they retreat.

"Snared and taken" pictures them caught the way an animal is caught in a trap.

⛓️ Their own mocking phrase returns as judgment

🚶 Fall backward pictures a panicked retreat

🪤 Snared and taken pictures an animal trap

📖 What they mocked became their undoing

# Isaiah 28:14-15
# ☠️ Ye Scornful Men
---
## ☠️ Ye Scornful Men, That Rule This People Which Is In Jerusalem

This warning now shifts from Ephraim in the north to Jerusalem's own leaders.

These rulers are called "scornful," meaning they mock warnings instead of heeding them.

They watched Ephraim fall and still made the same prideful mistakes.

One nation's downfall did not teach the other nation anything.

☠️ The warning now shifts to Jerusalem

😏 Scornful means they mocked real warnings

👀 They watched Ephraim fall and ignored it

📖 One nation's fall did not teach the other

## 🤝 We Have Made A Covenant With Death

This "covenant with death" was a real political alliance, likely with Egypt.

Judah's leaders had secretly made that deal against the threat of Assyria.

They believed it would protect them no matter what came.

Isaiah calls that trust so foolish it is like making a deal with death itself.

🤝 This alliance was likely made with Egypt

🛡️ They believed it would fully protect them

💀 Isaiah calls that trust a deal with death

📖 Trusting the wrong thing is still trust misplaced

# Isaiah 28:16-17
# 🪨 A Tried Stone, A Precious Corner Stone
---
## 🪨 I Lay In Zion For A Foundation A Stone

Against that false safety, God offers a foundation that actually holds.

A cornerstone was the first and most important stone set in an ancient building.

Every other wall and stone was lined up against it.

This stone is called tried, precious, and sure, the opposite of a fragile foreign treaty.

🪨 God offers a foundation of his own

🏗️ A cornerstone anchored an entire building

✅ Tried, precious, and sure describe real stability

📖 True security looks nothing like a fragile alliance

## 🏃 He That Believeth Shall Not Make Haste

"Make haste" pictures someone panicking and fleeing in fear.

Those who build their trust on God's foundation stone will not need to run in panic.

This is a promise of calm confidence, not a guarantee of an easy life.

Later New Testament writers point back to this very stone as Christ himself.

🏃 Make haste pictures panicked fleeing

😌 Trusting God brings calm instead of panic

🛡️ The promise is confidence, not an easy life

📖 Later writers connect this stone to Christ

## 📏 Judgment Also Will I Lay To The Line, And Righteousness To The Plummet

A "line" and a "plummet" were an ancient builder's measuring tools.

Builders used them to check that a wall was straight and level.

God says he will measure Jerusalem's leaders by that same strict standard.

Their false refuge, the covenant with death, will not survive that measurement.

📏 Line and plummet were building tools

📐 They checked for a straight, level wall

⚖️ God measures the leaders by that standard

📖 A false refuge cannot pass a true measurement

# Isaiah 28:18-19
# 🌊 Your Covenant With Death Shall Be Disannulled
---
## 📜 Your Covenant With Death Shall Be Disannulled

"Disannulled" is an old legal word meaning canceled or declared void.

The political alliance from verse fifteen will not hold up under pressure.

"The overflowing scourge" pictures the coming Assyrian invasion like a flood.

When that flood comes, the treaty they trusted in will offer no protection at all.

📜 Disannulled means legally canceled

🤝 The alliance will not hold under pressure

🌊 The overflowing scourge pictures the coming invasion

📖 A false treaty cannot stop a real flood

## 😰 It Shall Be A Vexation Only To Understand The Report

The coming trouble was never going to be a single event.

"Morning by morning" and "day and by night" describe relentless, ongoing danger.

Even hearing the news of it, again and again, will feel exhausting and terrifying.

There will be no break long enough to feel safe.

😰 The danger repeats, not just once

🌅 Morning by morning pictures relentless trouble

📰 Even hearing the news becomes exhausting

➡️ No safe pause is offered here

# Isaiah 28:20-21
# 🛏️ The Bed Is Shorter Than A Man Can Stretch
---
## 🛏️ The Bed Is Shorter Than That A Man Can Stretch Himself On It

This is a proverb about something that looks useful but does not actually work.

A bed too short cannot give real rest no matter how tired someone is.

A blanket too narrow cannot cover someone no matter how carefully they wrap it.

The covenant with death works the same way, comfortable sounding but useless in practice.

🛏️ A proverb about something that fails

📏 The bed is simply too short

🧣 The blanket is too narrow to help

📖 The false alliance works the same way

## ⛰️ As In Mount Perazim... As In The Valley Of Gibeon

Mount Perazim recalls David's first victory over the Philistines in 2 Samuel five.

The valley of Gibeon recalls that same battle's second stage, described in 1 Chronicles fourteen.

In both moments, God fought for Israel, not against it.

Here God calls this coming judgment a "strange work," because for once he will act against his own people instead.

⛰️ Perazim recalls David's first Philistine victory

🏞️ Gibeon recalls that same battle's second stage

🛡️ Both times God fought for Israel

📖 This time God's work turns against them

# Isaiah 28:22-23
# 👂 Be Ye Not Mockers
---
## ⛓️ Be Ye Not Mockers, Lest Your Bands Be Made Strong

"Bands" here means chains or restraints, like a prisoner would wear.

This is a direct warning to stop the mocking attitude described earlier in the chapter.

Continued scorn will not soften the coming judgment.

It will only tighten it.

⛓️ Bands means chains or restraints

😏 This warns against continued mocking

🔒 Continued scorn does not soften judgment

➡️ Scorn can tighten the judgment it mocks

## 📜 A Consumption, Even Determined Upon The Whole Earth

"Consumption" here means a complete, decreed destruction, not a random disaster.

"Determined" means God had already settled on this outcome, not reacting in the moment.

This is not God losing his temper.

It is a planned response to persistent, willful mocking.

📜 Consumption means a complete, decreed destruction

📋 Determined means already decided in advance

😤 This is not a sudden loss of temper

📖 It is a planned response, not a reaction

# Isaiah 28:24-29
# 🌾 The Parable Of The Plowman
---
## 🚜 Doth The Plowman Plow All Day To Sow

The chapter suddenly shifts from warning into a simple farming picture.

A wise farmer does not plow the same ground endlessly.

He plows just long enough to prepare it, then moves on to planting.

Endless plowing without planting would waste the whole season.

🚜 The chapter shifts to a farming picture

⏳ Plowing has a clear stopping point

🌱 A wise farmer moves on to planting

➡️ Endless effort without a goal wastes the season

## 🌿 Cast Abroad The Fitches, And Scatter The Cummin

"Fitches" refers to a small black seed, sometimes called black cumin.

"Cummin" is a different seasoning seed, related to the herb still used in cooking today.

The farmer plants wheat, barley, and smaller seeds differently, not identically.

Good farming pays attention to what each specific crop actually needs.

🌿 Fitches means a small black seed

🌾 Cummin is a related seasoning seed

🧑‍🌾 Each crop gets planted differently

📖 Wisdom notices what each situation needs

## 🧠 For His God Doth Instruct Him To Discretion

Everything in this parable has been building toward this line.

Even an ordinary farmer's everyday skill ultimately comes from God's instruction.

If God teaches farming wisdom this carefully, he is not careless with his own people either.

The judgment described earlier in the chapter is not random cruelty.

🧠 Farming skill itself comes from God

🌾 God teaches even ordinary, everyday work

⚖️ God is not careless with judgment

📖 Nothing here happens by accident

## 🪵 The Fitches Are Not Threshed With A Threshing Instrument

A threshing sledge was a heavy tool dragged over grain to break it apart.

Delicate seeds like fitches and cummin would be crushed to nothing under that weight.

So the farmer uses a light staff or rod on them instead.

The right method always matches the material being handled.

🪵 A threshing sledge was a heavy tool

🌿 Delicate seeds cannot survive that weight

🪶 A light staff protects them instead

📖 The method always matches the material

## 🍞 Bread Corn Is Bruised

Wheat, unlike the smaller seeds, does need real crushing to become bread.

But even that process has a limit.

"He will not ever be threshing it" means the farmer eventually stops, not grinding forever.

Even the harshest process in this parable still has a measured end.

🍞 Wheat does need real crushing

⏳ Even that process eventually stops

🚫 The farmer never grinds forever

📖 Every hard process here has a limit

## 🌟 Wonderful In Counsel, And Excellent In Working

This whole farming picture was never really about farming.

It answers everything else this chapter has described, drunken leaders, scorn, and coming judgment.

Just as a wise farmer matches his method to each crop, God matches his judgment to his purpose.

Nothing in this chapter, however harsh it sounds, is beyond God's wisdom or outside his control.

🌟 The parable was never just about farming

🧑‍🌾 It answers everything else in this chapter

⚖️ God matches judgment to his purpose

📖 Nothing here is beyond God's wisdom
`.trim();

export const ISAIAH_TWENTY_EIGHT_PERSONAL_SECTIONS = parseIsaiahTwentyEightRawNotes(ISAIAH_TWENTY_EIGHT_RAW_NOTES);
