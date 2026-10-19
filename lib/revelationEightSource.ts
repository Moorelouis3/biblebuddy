export type RevelationEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationEightRawNotes(rawText: string): RevelationEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 8:${startVerse}` : `Revelation 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Revelation 8 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_EIGHT_RAW_NOTES = `# Revelation 8:1-2
# 👂 Silence Before The Trumpets
---
## 🤫 Silence In Heaven About The Space Of Half An Hour

This silence is not peaceful rest.

It is heaven holding its breath before judgment falls.

Every chapter before this one was filled with loud worship around God's throne.

All of that noise stops at once.

A sudden quiet often carries more weight than noise.

🤫 Heaven goes completely silent

⏳ The quiet lasts about half an hour

🙏 Worship suddenly stops before judgment comes

📖 Silence can carry real weight

## 🎺 To Them Were Given Seven Trumpets

In the Bible a trumpet usually announces something important.

It can announce a battle starting, a festival beginning, or a king arriving.

These seven angels already stand in the highest position before God's throne.

Being trusted with a trumpet here is a serious assignment.

It is not simply a reward.

These seven trumpets will each announce one of God's judgments.

Every blast that follows is about to change the world below.

🎺 A trumpet usually announces something major

⚔️ It can signal a battle or a king

👼 These angels already stand before God

📖 Each blast announces a new judgment

# Revelation 8:3-5
# 🔥 The Golden Censer
---
## 🥄 Having A Golden Censer

A censer was a small dish used to burn incense.

Priests in the earthly temple used one every single day.

This angel performs that same priestly action inside heaven itself.

The golden altar mentioned here matches the golden altar inside the earthly tabernacle.

Heaven's worship follows the same pattern already shown on earth.

🥄 A censer burns incense

⛪ Priests used one daily on earth

👼 This angel performs a priestly act

📖 Heaven mirrors the pattern shown on earth

## 🙏 With The Prayers Of All Saints

God is shown actually receiving the prayers of His people here.

The incense smoke rises mixed together with those prayers.

Smoke rising was already a picture of prayer reaching God in the Old Testament.

These prayers may include the cry from chapter six asking how long until justice comes.

No prayer offered to God goes unnoticed, even one prayed years earlier.

🙏 Incense pictures prayer rising up

📜 This picture goes back to the Old Testament

❓ These prayers may echo chapter six

📖 God receives every prayer offered to Him

## 🔥 Cast It Into The Earth

This is not the same quiet incense offering from verse three.

The angel now fills the censer with fire from the altar instead.

That fire gets thrown down toward the earth.

Voices, thunderings, lightnings, and an earthquake follow right after.

Mount Sinai shook with those same signs when God gave the law to Moses.

Prayer and judgment come from the very same altar.

🔥 The censer becomes a weapon

⚡ Thunder and lightning follow it

🏔️ Sinai shook with these same signs

📖 Prayer and judgment share one altar

# Revelation 8:6-7
# 🎺 The First Trumpet
---
## ⏱️ Prepared Themselves To Sound

Heaven's judgments do not happen randomly.

Each angel now gets ready to blow one trumpet.

Every angel waits for the exact right moment to begin.

The judgments arrive one at a time, not all at once.

Order, not chaos, controls everything happening here.

🎺 Angels prepare to sound trumpets

⏱️ The timing is not random

🔢 Judgments come one at a time

📖 Heaven follows real order

## 🧊 Hail And Fire Mingled With Blood

This is not an ordinary storm.

Hail, fire, and blood fall together onto the earth.

Egypt faced a very similar plague of hail and fire in the book of Exodus.

That plague struck one nation under one Pharaoh.

This judgment strikes the entire earth at once.

What happened once in Egypt now happens on a much larger scale.

🧊 Hail and fire fall together

🩸 Blood mixes into the storm

🇪🇬 Exodus had a similar plague

📖 One nation's plague now covers the earth

## 🌳 The Third Part Of Trees Was Burnt Up

Third part is a phrase that will repeat again and again in this chapter.

It means a judgment that is serious but not yet total.

A third of all the earth's trees burn up in this first trumpet.

Every blade of green grass burns up too.

Two thirds of the earth's plant life still survives this first judgment.

🌳 A third of earth's trees burn

🌿 All green grass burns too

🔢 Third part means partial, not total

📖 Mercy still limits this judgment

# Revelation 8:8-9
# 🌊 The Second Trumpet
---
## 🏔️ As It Were A Great Mountain Burning With Fire

This is not an actual mountain breaking off the land.

Something massive and burning falls out of the sky instead.

It crashes down into the sea.

The prophet Jeremiah once described Babylon's downfall the same way.

He called it a burning mountain thrown down.

John borrows that same picture for a judgment just as massive.

🏔️ Something huge and burning falls

🌊 It crashes into the sea

📜 Jeremiah used this image for Babylon

📖 A massive judgment reshapes the sea

## 🩸 The Third Part Of The Sea Became Blood

This sign already happened once before, in Egypt.

Egypt's first plague turned the Nile River to blood.

That plague struck one river in one country.

This judgment strikes a third of the entire sea.

An old sign from Egypt returns here on a much bigger stage.

🩸 A third of the sea turns red

🇪🇬 Egypt's first plague matches this

🌊 Scale grows from a river to the sea

📖 An old sign returns on a bigger stage

## 🐟 The Third Part Of The Creatures Which Were In The Sea

Life in the sea takes a direct hit in this judgment too.

Fish and every other sea creature die along with the blood filled water.

Ancient economies depended heavily on the sea for food.

Losing a third of that food source would have been devastating.

This judgment reaches living things, not just water.

🐟 Sea creatures die with the water

🍽️ Ancient people depended on the sea for food

💔 A third of that food source disappears

📖 Judgment reaches life, not just water

## ⛵ The Third Part Of The Ships Were Destroyed

This judgment strikes the economy too, not only nature.

Ships traveling the sea are destroyed along with everything else.

Trade and travel in the ancient world depended heavily on ships.

A wrecked fleet could not be replaced quickly.

Losing a third of all ships would cripple trade across the region.

Nature and the economy fall together in this one trumpet.

⛵ A third of all ships are destroyed

💰 Trade relied heavily on ships

🛠️ Ships could not be replaced quickly

📖 Judgment strikes the economy too

# Revelation 8:10-11
# ⭐ The Third Trumpet
---
## ⭐ A Great Star From Heaven, Burning As It Were A Lamp

Every trumpet so far has targeted a different part of creation.

This time a blazing object falls from the sky like a burning lamp.

It lands on the rivers and the springs that feed them.

Fresh water, not the sea, takes the hit this time.

The judgment moves from the sea straight to the water people actually drink.

⭐ A burning object falls from the sky

💧 It strikes rivers and springs

🌊 The sea was already struck before this

📖 Now drinking water is the target

## 🌿 The Name Of The Star Is Called Wormwood

Wormwood is a real plant known throughout the Bible for its bitter taste.

The Old Testament already used wormwood as a symbol of bitter suffering.

Naming the star after this plant was not random.

The name matches exactly what the judgment causes.

A bitter name was given to a bitter judgment.

🌿 Wormwood is a bitter plant

📜 The Old Testament already used this symbol

⚠️ The name was chosen on purpose

📖 Bitter taste matches bitter judgment

## 💧 Many Men Died Of The Waters, Because They Were Made Bitter

This judgment attacks the most basic thing people need to survive.

A third of all fresh water turns bitter and unsafe to drink.

People who need that water to live die from drinking it.

Clean water was never a luxury in the ancient world.

It was daily survival.

Losing a third of it was a direct threat to life itself.

💧 A third of fresh water turns bitter

☠️ Drinking it becomes deadly

🏺 Clean water meant daily survival

📖 Judgment strikes a basic need

# Revelation 8:12-13
# 🌑 The Fourth Trumpet And The Triple Woe
---
## ☀️ The Third Part Of The Sun Was Smitten

This judgment reaches all the way into the sky itself.

A third of the sun goes dark.

A third of the moon and a third of the stars go dark too.

Egypt once faced total darkness as one of its ten plagues.

This darkness only covers a third of the light, not all of it.

Even this partial darkness would have felt like the world itself was failing.

☀️ A third of the sun goes dark

🌙 The moon and stars dim too

🇪🇬 Egypt faced a similar plague

📖 Partial darkness still feels like collapse

## 🌗 The Day Shone Not For A Third Part Of It, And The Night Likewise

This phrase means both day and night lose a third of their normal light.

A third of each day now looks more like night.

A third of each night loses even the dim light the moon and stars give.

Time itself begins to feel unstable.

When light fails like this, nothing in daily life feels steady anymore.

🌗 Day and night both lose light

🕐 A third of daily light disappears

🌑 Nights lose their usual dim light

📖 Even time starts feeling unstable

## 📯 Woe, Woe, Woe, To The Inhabiters Of The Earth

Inhabiters simply means the people living on the earth.

An angel flies through the sky to announce a warning before anything else happens.

Woe is repeated three times in a row for full emphasis.

Only four trumpets have sounded so far.

Three more judgments are still coming.

The repeated warning says plainly that the worst has not even started yet.

📯 An angel announces a warning

🌍 Inhabiters means people living on earth

❗ Woe repeats three times for emphasis

📖 Three more trumpets are still coming
`.trim();

export const REVELATION_EIGHT_PERSONAL_SECTIONS = parseRevelationEightRawNotes(REVELATION_EIGHT_RAW_NOTES);
