export type EzekielFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielFourRawNotes(rawText: string): EzekielFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 4:${startVerse}` : `Ezekiel 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Ezekiel 4 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_FOUR_RAW_NOTES = `# Ezekiel 4:1-3
# 🧱 Acting Out The Siege
---
## 🧱 Take Thee A Tile

A tile here means a flat sun dried clay brick.

Ancient scribes used bricks like this the way people today use a notepad.

God tells Ezekiel to draw on it instead of simply speaking.

The message becomes something Ezekiel can see and touch.

Not just something he hears.

🧱 Tile means a clay brick

✍️ Scribes used bricks like notepads

👀 Ezekiel is told to draw it

📖 The message is seen, not only heard

## 🗺️ Pourtray Upon It The City, Even Jerusalem

Pourtray is an old word for draw or sketch.

Ezekiel draws an actual map of Jerusalem on the brick.

Jerusalem sat many hundreds of miles away from Ezekiel in Babylon.

Distance never limits what God chooses to reveal.

✏️ Pourtray means draw or sketch

🗺️ Ezekiel draws Jerusalem itself

🌍 Jerusalem was far away in distance

📖 Distance never limits what God reveals

## ⚔️ Lay Siege Against It

To lay siege means to surround a city and cut off its escape.

God has Ezekiel build that whole operation in miniature around the drawing.

A fort shelters the attacking army.

A mount is a ramp built against the wall.

A camp rings the city on every side.

Battering rams break through gates and walls.

Jerusalem is about to face all of this for real.

⚔️ Siege means surrounding and cutting off

🏗️ Each weapon is modeled in miniature

🧱 Jerusalem will face the real thing

📖 A toy on a table becomes a prophecy

## 🔒 Set It For A Wall Of Iron Between Thee And The City

The iron pan was a flat metal plate normally used for baking.

Here God turns it into a symbolic wall between Ezekiel and the model city.

Iron does not bend.

It does not soften either.

The siege about to fall on Jerusalem works the same way.

🍳 The pan was normally used for baking

🧱 Here it becomes a symbolic wall

🔒 Iron does not bend or soften

📖 Jerusalem's judgment will not bend either

## 🎭 This Shall Be A Sign To The House Of Israel

A sign here does not mean a wooden signpost.

It means an acted out message.

A living picture instead of only words.

Ezekiel is not just predicting the siege.

He is performing it in miniature first.

House of Israel means the exiled nation watching him do it.

A performed warning is hard to ignore.

🎭 Sign means an acted out message

🧱 Ezekiel performs the siege in miniature

👥 House of Israel means the exiled nation

📖 A performed warning is hard to ignore

# Ezekiel 4:4-6
# 🛏️ Three Hundred And Ninety Days
---
## 🛏️ Lie Thou Also Upon Thy Left Side

Ezekiel is told to physically lie down for a long stretch of time.

His body becomes a living countdown of the nation's guilt.

Lying on the left side points north, toward Israel, the northern kingdom.

This is not comfortable theater.

It is a real physical ordeal.

🛏️ Ezekiel lies down for a long stretch

🧭 Left side points north toward Israel

⏳ His body becomes a living countdown

📖 This ordeal was real, not theater

## ⚖️ Lay The Iniquity Of The House Of Israel Upon It

Iniquity means guilt that still needs to be paid for.

Ezekiel does not commit Israel's sin.

He carries its weight on his own body instead.

A prophet sometimes acts out what the whole nation cannot yet feel for itself.

The days on his side stand in for years the nation spent sinning.

⚖️ Iniquity means unpaid guilt

🛏️ Ezekiel carries the weight, not the sin

🗣️ A prophet feels what the nation will not

📖 Days on his side equal years of sin

## 🔢 Three Hundred And Ninety Days

Three hundred ninety days represents three hundred ninety years in this sign.

Verse six makes that day for a year rule explicit.

Many scholars read this number as the long span of Israel's sin, counted back from the kingdom's division.

A single day of lying down stands for an entire year of the nation's history.

🔢 Three hundred ninety days means years

📅 Verse six states the day for year rule

📜 Likely counted from the kingdom's division

📖 One day stood in for one year

## 🧭 Lie Again On Thy Right Side

The right side points south, toward Judah, the southern kingdom.

This verse gives Judah its own forty day sentence, separate from Israel's three hundred ninety.

Forty already marks a season of testing elsewhere in scripture, from the flood to the wilderness years.

Judah's guilt gets counted on its own, not folded into Israel's.

🧭 Right side points south toward Judah

🔢 Forty days means forty years for Judah

🌊 Forty already marks testing elsewhere in scripture

📖 Each kingdom's guilt is counted on its own

# Ezekiel 4:7-8
# 💪 Thine Arm Shall Be Uncovered
---
## 👁️ Set Thy Face Toward The Siege Of Jerusalem

Ezekiel's whole body now points at the model city.

He cannot look away while he acts out this sign.

Every detail of his posture is part of the message, not incidental.

The prophet becomes the sermon, not just the one preaching it.

👁️ His whole body faces the model city

🚫 He cannot look away during the sign

🧍 Posture itself carries the message

📖 The prophet becomes the sermon itself

## 💪 Thine Arm Shall Be Uncovered

An uncovered arm pictures readiness for a fight or hard labor.

Normal clothing in this culture kept the arm covered in daily life.

Baring it here signals that Jerusalem's siege is close.

Not a distant threat, but a near one.

Ezekiel's own appearance becomes part of the warning.

💪 Uncovered arm pictures readiness for battle

👕 Normal clothing kept the arm covered

⚠️ Baring it signals a near siege

📖 His appearance itself becomes a warning

## ⛓️ I Will Lay Bands Upon Thee

Bands here likely means ropes or restraints holding Ezekiel in place.

He cannot shift from one side to the other until God allows it.

This removes any choice to shorten the sign out of discomfort.

The length of the sign belongs to God, not to Ezekiel's own comfort.

⛓️ Bands likely mean physical restraints

🚫 He cannot shift sides early

⏳ The timeline is fixed, not flexible

📖 God controls the length, not Ezekiel

# Ezekiel 4:9-11
# 🍞 Bread By Weight, Water By Measure
---
## 🌾 Wheat, And Barley, And Beans, And Lentiles, And Millet, And Fitches

These six grains and legumes do not normally belong in one loaf.

Mixing them together was a sign of scarcity, not a recipe choice.

Wheat and barley were the normal grains for bread.

Beans and lentiles were usually eaten on their own.

Millet and fitches were lesser grains, used when better ones ran out.

A besieged city empties its pantry into one jar.

🌾 Six different grains in one loaf

🍽️ Mixing them signals scarcity, not taste

🏙️ A besieged city empties its pantry

📖 Variety here means shortage, not flavor

## 🏺 Put Them In One Vessel

One vessel means every grain goes into a single container together.

A well stocked kitchen keeps grains separate by kind.

Combining everything into one jar pictures a city that no longer has separate stores.

Ezekiel eats what Jerusalem will soon be forced to eat.

🏺 One vessel means everything combined

🍽️ Normal kitchens kept grains separate

🏙️ One jar pictures a city's shortage

📖 Ezekiel previews the siege's own diet

## ⚖️ By Weight, Twenty Shekels A Day

A shekel here measures weight, not coins.

Twenty shekels comes to only a few ounces of bread a day.

That amount barely covers one small meal.

Rationed bread like this was a mark of siege, not a diet choice.

⚖️ A shekel measures weight here

🍞 Twenty shekels is only a few ounces

😟 That barely covers one meal

📖 Rationing marked a city under siege

## 💧 Drink Also Water By Measure, The Sixth Part Of An Hin

A hin was a liquid measure, about a gallon and a half.

A sixth of that comes out to about a pint and a half a day.

That is barely enough water for one person in a hot climate.

Hunger and thirst both become part of the sign.

🏺 A hin held a gallon and a half

💧 A sixth of that is barely a pint

🥵 Not enough water for a hot climate

📖 Hunger and thirst both preach the warning

## ⏰ From Time To Time Shalt Thou Drink

From time to time here does not mean whenever Ezekiel feels like it.

It means small sips doled out at fixed intervals through the day.

Freedom to eat or drink on his own schedule disappears completely in this sign.

Every meal becomes a scheduled reminder of the coming siege.

⏰ From time to time means set intervals

🚫 Not free access, whenever he wants

💧 Small sips doled out on schedule

📖 Every meal became a timed reminder

# Ezekiel 4:12-13
# 🔥 Baked In Their Sight
---
## 🍘 Thou Shalt Eat It As Barley Cakes

Barley cakes were flat, simple bread baked quickly over a fire.

They were already considered a poorer food than wheat bread.

Ezekiel's diet keeps getting more humble as the sign continues.

Even the shape of his food points toward coming hardship.

🍘 Barley cakes were flat and simple

💰 Barley bread ranked below wheat bread

📉 His diet grows poorer as the sign continues

📖 Even the food's shape points to hardship

## 🔥 Bake It With Dung That Cometh Out Of Man

Human dung was the first fuel God commands Ezekiel to use for baking.

That fuel was considered deeply unclean under the law.

Baking food over it would make the bread itself ceremonially defiled.

The command puts Ezekiel's own holiness on a collision course with God's instruction.

🔥 Human dung was the first fuel named

🚫 It counted as deeply unclean fuel

🍘 It would make the bread defiled

📖 Obedience here collided with his own holiness

## 🌍 Even Thus Shall The Children Of Israel Eat Their Defiled Bread Among The Gentiles

God names the point of the sign plainly here.

Israel will eat unclean food once scattered among foreign nations.

Exile would not just remove their land.

It would strip away their ability to stay ceremonially clean.

The defiled bread pictures a defiled, displaced life among the Gentiles.

🗣️ God states the sign's meaning plainly

🌍 Israel eats unclean food in exile

🏠 Exile strips away more than land

📖 Defiled bread pictures a defiled, displaced life

# Ezekiel 4:14-15
# 🙏 Ezekiel's Protest
---
## 🗣️ Ah Lord GOD! Behold, My Soul Hath Not Been Polluted

Ezekiel finally speaks for himself in this verse.

Up to this point he has only obeyed, never objected.

Here he tells God directly that he has kept himself ceremonially clean his whole life.

A prophet can obey fully and still bring a real concern honestly to God.

🗣️ Ezekiel finally speaks for himself

✅ He had stayed obedient without objecting before

🙏 He brings an honest concern to God

📖 Obedience and honesty can coexist

## 🚫 Neither Came There Abominable Flesh Into My Mouth

Abominable flesh means meat the law of Moses forbade outright.

That which dieth of itself means an animal that died from sickness or age.

Torn in pieces means an animal killed by a predator attack.

Both counted as unclean, never properly drained of blood.

Ezekiel points to a lifetime of careful obedience to these food laws.

His objection is not rebellion.

It is a plea rooted in real faithfulness.

🚫 Abominable flesh means forbidden meat

🩸 Self dead or torn animals were never eaten

📜 Ezekiel cites a lifetime of obedience

📖 His plea comes from real faithfulness

## 🐄 I Have Given Thee Cow's Dung For Man's Dung

God answers the protest with an actual change, not a rebuke.

Cow dung was already a common, accepted cooking fuel across the ancient Near East.

The sign itself still stands exactly as before.

God adjusts the method without ever softening the message.

🐄 Cow dung was a normal cooking fuel

✅ God grants the change, not a rebuke

🔥 The sign's meaning stays the same

📖 Mercy adjusted the method, not the message

# Ezekiel 4:16-17
# 💔 The Staff Of Bread Broken
---
## 💔 I Will Break The Staff Of Bread In Jerusalem

The staff of bread is an old picture of bread holding daily life upright.

Breaking that staff means the food supply itself gives way under the people.

This same idiom appears elsewhere in scripture whenever famine is the coming judgment.

Jerusalem is about to lose more than comfort.

It is about to lose its support.

🍞 Staff of bread pictures daily support

💔 Breaking it means the food supply fails

📜 This idiom marks famine elsewhere in scripture

📖 Jerusalem loses its support, not just comfort

## 😟 They Shall Eat Bread By Weight, And With Care

With care here means with anxiety, not simply being careful.

Every meal becomes a source of worry instead of comfort.

The rationed bread from Ezekiel's own sign is about to become Jerusalem's daily reality.

What the prophet acted out alone, the whole city will soon live.

😟 With care means anxious, not just careful

🍞 Every meal brings worry, not comfort

🏙️ Ezekiel's sign becomes the city's reality

📖 What one man acted, the city will live

## 😨 That They May Want Bread And Water, And Be Astonied One With Another

Astonied means stunned or horrified, far stronger than simply surprised.

Neighbors will look at each other in shared, silent shock over the shortage.

Consume away for their iniquity means they waste away specifically because of their own sin.

This famine is not random misfortune.

It is the direct result named back in verse four.

😨 Astonied means stunned, not just surprised

👥 Neighbors share the shock together

⚖️ They waste away for their own sin

📖 This famine was never random misfortune
`.trim();

export const EZEKIEL_FOUR_PERSONAL_SECTIONS = parseEzekielFourRawNotes(EZEKIEL_FOUR_RAW_NOTES);
