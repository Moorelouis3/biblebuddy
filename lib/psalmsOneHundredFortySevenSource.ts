export type PsalmsOneHundredFortySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFortySevenRawNotes(rawText: string): PsalmsOneHundredFortySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFortySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+147:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 147 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+147:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+147:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 147 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 147,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 147:${startVerse}` : `Psalms 147:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 147 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FORTY_SEVEN_RAW_NOTES = `# Psalms 147:1-6
# 🌌 Praise Fits The God Who Counts The Stars
---
## 🎉 Praise Ye The LORD

"Praise ye the LORD" translates the same Hebrew word, hallelujah.

This exact command opened and closed Psalm 146 as well.

Psalms 146 through 150 all begin and end with this word.

This psalm is the second in that closing set of five.

🎉 Hallelujah opens this psalm again
🔁 Psalm 146 began the very same way
📚 This is the second of five closing psalms
📖 They all frame the end of the Psalter

## ✅ For It Is Good To Sing Praises Unto Our God

"Good" here does not just mean nice or pleasant.

It means fitting, worthwhile, the right thing to do.

Praise is not a chore added on top of faith.

Calling God "our God" also makes this personal, not distant.

✅ Good here means fitting and worthwhile
🙏 Praise is not just a duty
💛 It is something that benefits the worshiper
📖 Our God makes this personal, not distant

## 😊 For It Is Pleasant, And Praise Is Comely

"Pleasant" means praise brings real delight, not dry duty.

"Comely" is an old word meaning fitting or becoming.

Something comely looks right, the way it is supposed to look.

Praise fits who God is and who people are before Him.

😊 Pleasant means real delight, not duty
👗 Comely means fitting or becoming
🎯 Something comely looks the way it should
📖 Praise fits the relationship with God

## 🏗️ The LORD Doth Build Up Jerusalem

Jerusalem's walls and buildings had once been torn down by invading armies.

"Build up" pictures God restoring the city piece by piece.

Many scholars believe this psalm was written after the Babylonian exile.

The nation's greatest rebuilding project was really God's project all along.

🏗️ Build up means restore the city
💥 Jerusalem had been destroyed by invaders
📜 Likely written after the Babylonian exile
📖 The rebuilding was God's work first

## 🌍 He Gathereth Together The Outcasts Of Israel

"Outcasts" here means the Israelites scattered among foreign nations.

Many had been carried off as captives or had fled hard times.

Gathering them home pictures a shepherd bringing back lost sheep.

God is shown doing for the nation what only He could do.

🌍 Outcasts means scattered Israelites
⛓️ Many were exiles or captives
🐑 Gathering pictures a shepherd's care
📖 Only God could bring them home

## 💔 He Healeth The Broken In Heart, And Bindeth Up Their Wounds

These two lines say the same thing in two different pictures.

Hebrew poetry often repeats one idea using two images like this.

The first line names the wound, a broken heart.

The second line pictures a doctor wrapping and treating that wound.

💔 Broken heart means deep grief
🩹 Bindeth up pictures bandaging a wound
📜 Hebrew poetry often repeats an idea twice
📖 God treats grief like a doctor

## ⭐ He Telleth The Number Of The Stars, He Calleth Them All By Their Names

Counting every star pictures a task no human mind could finish.

Ancient people saw thousands of stars with no city lights to block them.

"Calleth them by their names" pictures personal knowledge, not just a count.

The God who knows every star also knows every brokenhearted person by name.

⭐ Counting stars pictures endless knowledge
🌌 Ancient skies showed far more stars than today
🏷️ Naming each one means personal knowledge
📖 He knows hurting people just as closely

## 💪 Great Is Our Lord, And Of Great Power

"Power" points to everything God is able to do.

The psalm has just given one example, numbering every star.

No force in creation limits what God can accomplish.

This line names a strength far beyond human power.

💪 Power means what God can do
⭐ The stars just proved this
🚫 Nothing limits what God can do
📖 His strength has already been shown

## 🧠 His Understanding Is Infinite

"Understanding" points to everything God knows, not just what He can do.

No number is too large and no detail is too small for Him.

Human knowledge always has an edge where it simply runs out.

God's knowledge has no edge to run out at all.

🧠 Understanding means everything God knows
🔍 No detail is too small for Him
🚧 Human knowledge always has a limit
📖 God's knowledge has no limit

## 🌱 The LORD Lifteth Up The Meek

"Meek" does not mean weak or timid.

It describes people who are humble and often overlooked by others.

Lifting them up means giving them honor they could not get alone.

The same God who just numbered every star also notices the overlooked.

🌱 Meek means humble, not weak
👀 They are often overlooked by others
⬆️ Lifted up means given honor and help
📖 The star counting God notices them too

## ⬇️ He Casteth The Wicked Down To The Ground

This line sits right next to the promise for the meek on purpose.

The meek are lifted up while the wicked are brought down.

"Casteth down to the ground" pictures a complete and humbling defeat.

God does not treat every kind of life the same way.

⬇️ Wicked here means those brought down
🔀 This contrasts with the meek being lifted
💥 Casteth down pictures total defeat
📖 God responds differently to different lives

# Psalms 147:7-11
# 🐎 God Delights In Reverence, Not Raw Strength
---
## 🙌 Sing Unto The LORD With Thanksgiving

This is not simply personal, private praise, sung alone.

"Thanksgiving" points to public, grateful worship offered out loud.

Ancient Israel often sang thanksgiving songs together at the temple.

Gratitude here is meant to be heard, not just felt.

🙌 Thanksgiving means grateful worship spoken aloud
🏛️ Ancient Israel sang this way at the temple
👥 Gratitude here is public, not private
📖 It is meant to be heard

## 🎵 Sing Praise Upon The Harp Unto Our God

The harp named here was a small stringed instrument, plucked by hand.

It was one of the most common instruments in ancient Israelite worship.

King David himself was known for playing this very instrument.

Music was never separate from worship in this culture.

🎵 The harp was a small stringed instrument
🏛️ It was common in Israelite worship
👑 David himself played this instrument
📖 Music and worship were never separate

## ☁️ Who Covereth The Heaven With Clouds

This line pictures God as the one directly controlling the sky.

Clouds were not just weather to an ancient reader.

They were a sign of God's hand actively at work overhead.

The next few lines will trace that same hand down to earth.

☁️ Clouds here show God's hand at work
🌤️ Weather was not seen as random
👆 God is pictured directly controlling the sky
📖 The next lines trace that care to earth

## 🌧️ Who Prepareth Rain For The Earth

Rain in this region could not be counted on like it can elsewhere.

A dry season could mean real famine for the whole community.

"Prepareth" means God provides rain on purpose, not by accident.

The same hand that shapes the clouds also sends the rain.

🌧️ Rain was never guaranteed in this land
🌾 A dry season could mean famine
🎯 Prepareth means provided on purpose
📖 God shapes the clouds and the rain

## ⛰️ Who Maketh Grass To Grow Upon The Mountains

Mountain grass grew far away from any farmer's field or care.

No person plowed it, watered it, or planted a single seed there.

God is shown tending places no human hand ever reaches.

His care extends even to grass nobody will ever notice.

⛰️ Mountain grass grew with no farmer's help
🌱 No person planted or watered it
👋 God tends places no human reaches
📖 His care reaches even unnoticed grass

## 🐾 He Giveth To The Beast His Food

"Beast" here means the wild animals living far from any farm.

No person feeds a wild animal in the field or forest.

God is shown providing for creatures nobody else looks after.

This same care will soon widen to birds no one values.

🐾 Beast means wild, untamed animals
🌲 No person feeds them in the wild
🍽️ God provides what no one else does
📖 This care widens to birds next

## 🐦 And To The Young Ravens Which Cry

Ravens were considered unclean birds under Israel's dietary law.

Nobody in this culture would have called the raven a favorite bird.

Yet God is shown personally feeding even its overlooked young.

If God cares for an unclean, unwanted bird, He is not selective in His care.

🐦 Ravens were considered unclean birds
👎 Nobody saw them as a favorite
🍽️ God still feeds their young
📖 His care is not selective

## 🐎 He Delighteth Not In The Strength Of The Horse

Horses were the ancient world's ultimate symbol of military power.

Kings built their armies and their pride around swift, strong horses.

This line says none of that impresses God even slightly.

Raw physical or military strength was never what earns His pleasure.

🐎 Horses symbolized military power
👑 Kings built pride around strong horses
🚫 None of that impresses God
📖 Military strength never earns His pleasure

## 🏃 He Taketh Not Pleasure In The Legs Of A Man

"The legs of a man" pictures human speed, strength, or athletic skill.

This widens the point from a king's army to any single person.

Even the fastest or strongest human still fails to impress God this way.

What earns God's pleasure is not found in the body at all.

🏃 Legs here means human speed and strength
🔀 This widens the point beyond kings
💪 Even the strongest human does not impress Him
📖 His pleasure is not found in the body

## 🙇 The LORD Taketh Pleasure In Them That Fear Him

"Fear" here does not mean being afraid or terrified.

It means treating God with deep respect and reverence.

This is what actually pleases God, not military strength or speed.

The contrast with the horse and the man's legs is placed here on purpose.

🙇 Fear here means deep reverence
🚫 Not the same as being afraid
🎯 This is what actually pleases God
📖 It is placed against strength on purpose

## 🤝 In Those That Hope In His Mercy

"Hope" here means trusting confidently, not just wishing for something.

"Mercy" points to God's kindness toward people who do not earn it.

Reverence and hope are named together as one matched pair.

Strength fades, but hope placed in God's mercy does not fail.

🤝 Hope means confident trust
💛 Mercy is kindness that is not earned
🔗 Reverence and hope are paired here
📖 Hope in mercy does not fail

# Psalms 147:12-14
# 🏙️ Zion Rebuilt With Peace And Plenty
---
## 🏙️ Praise The LORD, O Jerusalem, Praise Thy God, O Zion

"Zion" is another name for Jerusalem, the city where God's temple stood.

The psalm now speaks straight to the city as a person.

This direct address makes the praise personal, not just a general statement.

Praising by name matters more than praising in the abstract.

🏙️ Zion is another name for Jerusalem
🗣️ The psalm speaks directly to the city
👤 This makes the praise personal
📖 Praise aimed by name carries weight

## 🚪 He Hath Strengthened The Bars Of Thy Gates

City gates were the weakest point in any ancient city's defense.

"Bars" were heavy wooden or metal beams that locked the gates shut.

Strengthening them pictures real, practical protection, not just a nice feeling.

The God who counts stars also cares about a city's front door.

🚪 Gates were a city's weakest point
🔒 Bars were the beams that locked them shut
🛡️ This pictures real, practical protection
📖 God cares about even the front door

## 👶 He Hath Blessed Thy Children Within Thee

This verse likely pictures the population growing again after the exile.

Empty streets after captivity were slowly filling with families again.

A blessed household in this culture especially meant many healthy children.

The rebuilt walls now protect a city full of new life.

👶 Children returning pictures a city being repopulated
🏚️ Streets had been emptied by exile
👪 A blessed household meant many children
📖 New walls now guard new life

## ☮️ He Maketh Peace In Thy Borders

"Peace" here is the Hebrew idea of shalom, more than just no war.

Shalom describes a full, settled wholeness, not merely an absence of conflict.

"Borders" pictures the edges of the land finally safe from raids.

A nation cannot feel secure while enemies threaten its edges.

☮️ Peace here means shalom, full wholeness
🚫 More than just an absence of war
🗺️ Borders means the land's outer edges
📖 A secure edge lets a nation rest

## 🌾 And Filleth Thee With The Finest Of The Wheat

Wheat was the most valued grain crop in the ancient world.

"Finest" points to the best quality, not just a large amount.

Good harvests were never guaranteed in this climate.

Peace at the borders and plenty on the table are shown together here.

🌾 Wheat was the most valued grain
✨ Finest means the best quality, not just quantity
🌦️ Good harvests were never guaranteed
📖 Peace and plenty are linked together

# Psalms 147:15-18
# ❄️ Winter And Thaw Obey His Word
---
## 📜 He Sendeth Forth His Commandment Upon Earth

"Commandment" here does not mean a moral rule to obey.

It means an order given directly to the natural world itself.

The weather about to be described is not random at all.

Every storm and season in this psalm answers directly to God.

📜 Commandment here means an order to nature
🌍 It is sent directly upon the earth
🌦️ Weather is not shown as random
📖 Every season answers to God

## 🏃 His Word Runneth Very Swiftly

God's word is pictured here almost like a running messenger.

There is no delay between the command and the result.

Nature obeys the instant it receives the order.

Human obedience rarely moves this fast or this completely.

🏃 God's word runs like a swift messenger
⚡ There is no delay before it acts
❄️ Nature obeys the instant it is told
📖 Human obedience rarely moves this fast

## 🐑 He Giveth Snow Like Wool

Wool was a soft, thick material familiar to every shepherd's family.

A blanket of snow looks and feels much like a thick coat of wool.

This comparison lets a shepherding people picture snow easily in their minds.

God is shown using an everyday image to describe unfamiliar weather.

🐑 Wool was a familiar, everyday material
❄️ Snow is compared to a wool coat
🖼️ This gives an easy picture to imagine
📖 God uses the familiar to explain the strange

## 🌫️ He Scattereth The Hoarfrost Like Ashes

"Hoarfrost" is a thin, white layer of frozen dew that coats the ground.

Ashes from a cooking fire were a common, gray, scattered sight in this culture.

Both hoarfrost and ashes look like a fine coating spread over a surface.

God again reaches for something ordinary to describe something rare.

🌫️ Hoarfrost is frozen dew on the ground
🔥 Ashes were common leftovers from cooking fires
🖼️ Both look like a fine, scattered coating
📖 The ordinary explains the rare again

## 🍞 He Casteth Forth His Ice Like Morsels

"Morsels" is an old word for small bites or crumbs of food.

This line pictures hail falling in small, scattered chunks, like scraps tossed down.

The image keeps the weather easy to picture for an ancient reader.

Even the harshest weather is shown as something God simply throws down.

🍞 Morsels means small bites or crumbs
🧊 Hail is pictured falling like scattered crumbs
🖼️ The image keeps the weather easy to picture
📖 God simply throws even harsh weather down

## ❓ Who Can Stand Before His Cold

This is a rhetorical question with an obvious answer, nobody.

No person can stand unprotected against true extreme cold for long.

The line is not really about weather anymore at this point.

It pictures how small any person is before God's raw power.

❓ This question has an obvious answer, nobody
🥶 No one survives true extreme cold unprotected
🔀 The line is really about God's power
📖 It shows how small a person is

## 🌡️ He Sendeth Out His Word, And Melteth Them

The very same word that sent the snow and ice now melts them.

Winter did not arrive by accident, and it will not end by accident either.

God controls both the freeze and the thaw with one and the same word.

Nothing about the seasons is outside His command.

🌡️ The same word sends both freeze and thaw
❄️ Winter began by God's word, not by accident
➡️ Spring ends winter by that same word
📖 Nothing about the seasons escapes His command

## 💨 He Causeth His Wind To Blow, And The Waters Flow

A warm wind is what finally melts the frozen ground and ice.

"Waters flow" pictures streams and rivers running again after being frozen solid.

This closes the picture of a full season cycle, from freeze to thaw.

The chapter has now traced God's hand from the coldest moment to renewal.

💨 A warm wind melts the frozen ground
🌊 Waters flow means rivers running again
🔄 This completes a full season cycle
📖 God's hand covers freeze and renewal alike

# Psalms 147:19-20
# 📜 A Law Given To Israel Alone
---
## 👥 He Sheweth His Word Unto Jacob, His Statutes And His Judgments Unto Israel

"Jacob" and "Israel" name the very same nation, used side by side here.

Up to this point the psalm described God's power shown through nature.

This verse turns to a different kind of revelation, His written law.

"Statutes" and "judgments" mean the specific commands and rulings God gave His people.

👥 Jacob and Israel name the same nation
🌦️ Earlier verses showed God's power in nature
📜 This verse shows His revealed written law
📖 Statutes and judgments mean His specific commands

## 🌍 He Hath Not Dealt So With Any Nation

Every nation could look at creation and see something of God's power.

Only Israel received God's actual written law, given directly to them.

This made Israel's relationship with God different from every surrounding nation.

It was a privilege carrying real responsibility, not just a special status.

🌍 Every nation could see God in creation
📜 Only Israel received His written law
🎯 This made Israel's relationship with God unique
📖 Privilege here came with real responsibility

## 🔁 As For His Judgments, They Have Not Known Them

"They" here refers to the surrounding nations who had no such law.

Those nations lacked the same close instruction Israel had already received.

The psalm now ends the exact way it began, with the word hallelujah.

Praise ye the LORD closes the psalm to match the very first line.

🌍 They refers to the surrounding nations
📜 Those nations lacked this close instruction
🔁 The psalm ends just as it began
📖 Praise ye the LORD closes it out
`.trim();

export const PSALMS_ONE_HUNDRED_FORTY_SEVEN_PERSONAL_SECTIONS = parsePsalmsOneHundredFortySevenRawNotes(
  PSALMS_ONE_HUNDRED_FORTY_SEVEN_RAW_NOTES,
);
