export type RevelationTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationTwentyOneRawNotes(rawText: string): RevelationTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 21:${startVerse}` : `Revelation 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Revelation 21 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_TWENTY_ONE_RAW_NOTES = `# Revelation 21:1-2
# 🌅 A New Heaven And A New Earth
---
## 🌄 A New Heaven And A New Earth

John is not describing a second attempt at creation.

"New" means renewed and transformed.

It does not mean thrown away and discarded.

Sin had wounded the first creation since Genesis three.

God restores what He made instead of scrapping it.

🌄 New means renewed, not discarded

🩹 Sin wounded the first creation

🧵 God restores what He made

📖 Restoration beats starting completely over

## 🌊 There Was No More Sea

In the Bible, the sea often stands for chaos and danger.

Sailors feared sudden storms that could sink a ship without warning.

Old Testament writers already pictured the sea as the home of monsters like Leviathan.

Removing the sea is not a complaint about the ocean itself.

It means every lasting source of chaos is finally gone.

🌊 The sea pictured chaos and danger

⚓ Sailors feared sudden deadly storms

🐉 Leviathan lived in the chaotic sea

📖 No more sea means no more chaos

## 🏙️ The Holy City, New Jerusalem

"New Jerusalem" is not just another city built from scratch.

It represents God's people gathered perfectly, pictured as a city.

Jerusalem on earth had a long history of both faithfulness and failure.

This new city replaces that broken history with something whole.

🏙️ New Jerusalem pictures God's gathered people

📜 Earthly Jerusalem had a broken history

✨ This city replaces that history completely

📖 God's people become a perfect city

## ⬇️ Coming Down From God Out Of Heaven

This city does not rise up from the earth.

It comes down, straight from God, out of heaven.

The direction matters more than it first appears.

Heaven is moving toward earth, not pulling people away from it.

⬇️ The city comes down, not up

🌍 Heaven moves toward earth here

🚫 This is not an escape to heaven

📖 God brings heaven to His people

## 👰 Prepared As A Bride Adorned For Her Husband

A bride in this culture was dressed and adorned for hours before the wedding.

Every detail was chosen to present her at her most beautiful.

The city is pictured the same way, prepared with that same care.

This is the picture of God's people made ready, not thrown together.

👰 A bride was carefully adorned

💍 Every detail was chosen with care

🏙️ The city is pictured the same way

📖 God prepares His people, not rushes them

# Revelation 21:3-4
# 🏡 God Dwells With His People
---
## ⛺ The Tabernacle Of God Is With Men

"Tabernacle" means the tent where God's presence once lived among Israel.

It was the one place His presence was especially near.

Here, that nearness is no longer limited to one tent or one building.

God's presence now fills the whole scene permanently.

⛺ Tabernacle means the tent of God's presence

📍 It used to mark one special place

🔓 That limit is now gone completely

📖 God's presence is no longer confined

## 🤝 They Shall Be His People, And God Himself Shall Be Their God

This exact promise appears again and again throughout the Old Testament.

God kept saying it to Israel through Moses and the prophets.

Here, the promise is not simply renewed one more time.

It is finally and permanently fulfilled.

🤝 This promise repeats throughout the Old Testament

📣 Moses and the prophets both heard it

🔑 This promise is finally fulfilled

📖 God's oldest promise reaches its ending

## 😢 God Shall Wipe Away All Tears From Their Eyes

This promise looks forward to a specific future moment.

It does not erase the real grief people carried before it.

God Himself performs this action, not an angel or an assistant.

The picture is personal, a father gently wiping a child's face.

😢 Tears picture every grief carried before

🙌 God Himself does the wiping

👨‍👧 The picture is personal, like a parent

📖 Grief gets a personal, gentle ending

## ⚰️ There Shall Be No More Death

Death has followed every human life since Genesis three.

No illness, war, or age ever reversed that guarantee.

This verse does not soften death, it ends it completely.

The very thing sin introduced is the thing finally removed.

⚰️ Death has followed life since Genesis three

🚫 Nothing before this verse ever reversed it

🔚 This verse ends death completely

📖 What sin introduced is finally removed

## 💧 Neither Sorrow, Nor Crying, Neither Shall There Be Any More Pain

This does not mean people are too distracted to notice pain.

Sorrow, crying, and pain are named because their causes are gone.

Sickness, loss, and fear are what actually produce those three things.

Remove the causes, and the symptoms have nothing left to attach to.

💧 Sorrow and crying are named directly

🩺 Sickness and loss once caused them

🧹 Removing the cause removes the symptom

📖 Nothing is left to produce pain

# Revelation 21:5-8
# 🔤 Alpha And Omega Makes All Things New
---
## 👀 Behold, I Make All Things New

This sentence is not a future promise only.

God speaks it as something already happening right now.

"Behold" means pay attention, something important is being said.

The one who spoke creation into existence now speaks it renewed.

👀 Behold means pay close attention

⏳ Not just future, happening now

🗣️ The same voice that first created

📖 God renews what He once made

## ✍️ Write: For These Words Are True And Faithful

John receives a direct command to write this down.

"True" means the words match reality exactly.

"Faithful" means they can be fully trusted and relied on.

Together, those two words guarantee this vision is not exaggeration.

✍️ John is commanded to write this

✅ True means matching reality exactly

🤝 Faithful means fully trustworthy

📖 These words are not exaggeration

## 🔤 I Am Alpha And Omega, The Beginning And The End

"Alpha" and "Omega" are the first and last Greek letters.

Saying both means covering absolutely everything in between them too.

God is not only present at the start of the story.

He is also present at its very end.

🔤 Alpha and Omega are first and last

📏 Together they cover everything between

🌱 God was present at the beginning

📖 God is present at the end too

## 💧 Of The Fountain Of The Water Of Life Freely

"Freely" means without any payment required.

Water in a dry climate was often scarce and valuable.

Access to a flowing fountain, not a stored jar, pictures abundance.

This same water of life appears again at the very end of the Bible.

💧 Freely means no payment required

🏜️ Water was scarce in that climate

⛲ A fountain pictures lasting abundance

📖 This same picture closes the whole Bible

## 🏆 He That Overcometh Shall Inherit All Things

"Overcometh" is the same word used in each of the seven church letters earlier in Revelation.

It means standing firm in faith through real pressure to give up.

An inheritance belongs to a child, not a stranger.

That is the relationship being offered here.

🏆 Overcometh matches the seven church letters

💪 It means standing firm under pressure

👨‍👩‍👧 Inheritance belongs to a child

📖 God offers that relationship here

## 📜 I Will Be His God, And He Shall Be My Son

This wording matches how an adoption was declared in that world.

Sonship was not assumed, it was formally granted.

Overcoming does not earn God's love.

It is the proof of a relationship already given.

📜 This wording matches a legal adoption

👪 Sonship here is formally granted

🚫 Overcoming does not earn love

📖 It proves a relationship already given

## 😨 The Fearful, And Unbelieving, And The Abominable

This list names a life that refuses God's offer entirely.

"Fearful" here means cowardice, refusing to stand for truth under pressure.

"Abominable" means living in a way that is morally repulsive.

Whoremongers and sorcerers are also named in this list.

Idolaters and liars complete it.

This verse is a warning, not a curiosity.

😨 Fearful means cowardice under pressure

🤢 Abominable means morally repulsive living

🔮 Sorcerers and idolaters chose false gods

📖 This list warns, it does not entertain

## ☠️ Which Is The Second Death

"Second death" appears only in the book of Revelation.

The first death is physical, the end of life on earth.

The second death is spiritual, a final separation from God.

This is the last time this phrase appears in the whole book.

☠️ Second death is unique to Revelation

🫀 First death ends physical life

🚪 Second death means final separation from God

📖 This phrase closes out here

# Revelation 21:9-14
# 👰 The Bride, The Holy City
---
## 📯 One Of The Seven Angels Which Had The Seven Vials

This is the same kind of angel who showed John Babylon's fall in chapter seventeen.

"Vials" means bowls, the containers that poured out the seven last plagues.

The same messenger now reveals the opposite kind of city.

One city was judged, the other is blessed.

📯 Same angel appeared back in chapter seventeen

🥣 Vials means bowls of final judgment

🏙️ One city falls, one city rises

📖 Judgment and blessing come from the same hand

## 🔁 I Will Shew Thee The Bride, The Lamb's Wife

This same angel used almost the same words back in chapter seventeen.

There, the invitation led to Babylon, a city pictured as a prostitute.

Here, it leads to the opposite picture, a faithful bride.

The two cities are meant to be compared directly.

🔁 Same invitation words as chapter seventeen

💔 Babylon was pictured as unfaithful

👰 This city is pictured as faithful

📖 The contrast is intentional, not accidental

## 🏜️ He Carried Me Away In The Spirit To A Great And High Mountain

John was carried away in the spirit once before, in chapter seventeen.

That time, he landed in a wilderness to see Babylon.

This time, he lands on a great and high mountain.

The setting itself signals which city is being honored.

🏜️ Babylon was shown in a wilderness

⛰️ This city is shown on a mountain

👁️ Being carried away means a vision

📖 The setting honors this city

## 💎 Her Light Was Like Unto A Stone Most Precious

"Jasper" in the ancient world described a brilliant, clear precious stone.

Modern jasper is usually opaque, so the picture can mislead a reader today.

This jasper is compared to crystal, meaning clear and radiant, not cloudy.

The city does not generate its own light, it reflects God's glory.

💎 Jasper then meant brilliant and clear

🔍 Modern jasper looks different, usually opaque

✨ Crystal clear light, not cloudy

📖 The city reflects God's glory

## 🚪 At The Gates Twelve Angels, And Names Written Thereon

Twelve gates mark twelve entrances into this city.

Each gate carries the name of one tribe of Israel.

An angel stands guard at every single gate.

The Old Testament people of God are honored by name here.

🚪 Twelve gates mark twelve entrances

🏷️ Each gate names one tribe

👼 An angel guards every gate

📖 Israel's twelve tribes are honored here

## 🧭 On The East Three Gates, On The North Three Gates

Twelve gates are not placed at random.

Three gates sit on each of the four directions.

Four sides of three gates equal twelve exactly.

The city is balanced and complete from every direction.

🧭 Gates split evenly across four directions

🚪 Three gates sit on each side

🔢 Four times three equals twelve

📖 The city is balanced from every side

## 🧱 The Wall Of The City Had Twelve Foundations, And In Them The Names Of The Twelve Apostles

Twelve foundations complete a pattern started at the gates.

The gates carry Israel's twelve tribes.

The foundations carry the Lamb's twelve apostles.

Old Testament Israel and the New Testament church hold up the same city together.

🧱 Twelve foundations complete the pattern

🏷️ Gates carry Israel's twelve tribes

✝️ Foundations carry the twelve apostles

📖 Old and new covenant share one city

# Revelation 21:15-17
# 📏 Measuring The City
---
## 🌾 He That Talked With Me Had A Golden Reed To Measure The City

"Reed" means a dried plant stalk used as a measuring rod.

The prophet Ezekiel saw an angel measure a future temple with the exact same tool.

That measuring scene in Ezekiel forty was never actually built on earth.

Here, the same kind of measuring finally reaches its true fulfillment.

🌾 Reed means a dried measuring rod

📐 Ezekiel saw this same tool used

🏛️ Ezekiel's temple vision was never built

📖 This vision fulfills what Ezekiel saw

## 📐 The City Lieth Foursquare

"Foursquare" means equal on every side.

Length, width, and height all match exactly.

A perfect cube pictures total balance, nothing lopsided or unfinished.

The Old Testament holy of holies was also shaped as a perfect cube.

📐 Foursquare means equal on every side

🧊 A cube pictures total balance

🏛️ The holy of holies shared this shape

📖 Perfect balance marks this whole city

## 📏 He Measured The City With The Reed, Twelve Thousand Furlongs

"Furlong" is an old unit, close to one eighth of a mile.

Twelve thousand furlongs adds up to about fifteen hundred miles.

That length, width, and height describe a city larger than a small country.

The number itself points back to Israel's twelve tribes again.

📏 A furlong is about one eighth mile

🗺️ Twelve thousand furlongs equals about 1,500 miles

🏔️ The city is larger than a small country

📖 Twelve again points back to Israel's tribes

## 📏 He Measured The Wall Thereof, An Hundred And Forty And Four Cubits

"Cubit" was an ancient measure, about a foot and a half long.

One hundred forty four cubits comes out to about two hundred feet.

"That is, of the angel" means the angel used ordinary human units.

The number is not a mysterious heavenly measurement.

It is one anyone could check for themselves.

📏 Cubit means about a foot and a half

🧮 144 cubits equals about 200 feet

👤 The angel used ordinary human units

📖 Anyone could check this measurement themselves

# Revelation 21:18-21
# 💎 Built Of Gold And Precious Stones
---
## 🧱 The Building Of The Wall Of It Was Of Jasper

The wall itself is not ordinary stone or brick.

It is built entirely from jasper, the same brilliant stone from verse eleven.

A wall usually marks a boundary meant to keep danger out.

Here, the boundary itself reflects God's own glory.

🧱 The wall is made of jasper

🔁 This matches verse eleven's jasper

🚧 Walls usually guard against danger

📖 This boundary reflects God's glory

## 🏙️ The City Was Pure Gold, Like Unto Clear Glass

This is not shiny gold paint on an ordinary building.

Ordinary gold is solid and opaque, blocking light completely.

This gold is somehow also clear, like glass.

The material itself breaks the rules of anything on earth today.

🏙️ The whole city is made of gold

🚫 Ordinary gold is solid, not clear

🔍 This gold is also somehow transparent

📖 Nothing on earth matches this material

## 💎 The Foundations Of The Wall Were Garnished With Precious Stones

Twelve stones are named here, one for each foundation.

Centuries earlier, a high priest wore twelve stones on his breastplate.

Those breastplate stones also represented the twelve tribes of Israel.

Stones named here include jasper, sapphire, emerald, and amethyst, among others.

The same gemstone imagery now holds up the whole eternal city.

💎 Twelve stones mark twelve foundations

📿 A high priest wore the same idea

🏷️ Those stones once represented Israel's tribes

📖 Old priestly imagery holds up this city

## 🦪 The Twelve Gates Were Twelve Pearls

"Pearl" was one of the rarest, costliest items in the ancient world.

A single large pearl could be worth more than years of ordinary wages.

Each gate is not merely decorated with a pearl.

Each gate is one single, solid pearl.

Entry into this city costs the richest material anyone could imagine.

🦪 Pearl was among the costliest ancient items

💰 One pearl could outvalue years of wages

🚪 Each gate is one entire pearl

📖 Entry here uses the richest material imagined

## 🛣️ The Street Of The City Was Pure Gold, As It Were Transparent Glass

This is the third time this chapter repeats gold described like glass.

Repetition in scripture is rarely filler.

It usually signals real weight instead.

Walls, city, and street all share the same impossible material.

Every surface of this place reflects the same unearthly glory.

🛣️ The street matches the gold like glass

🔁 This is the third such repetition

⚖️ Repetition here signals weight, not filler

📖 Every surface shares the same glory

# Revelation 21:22-27
# 🌇 No Temple, No Night, No Impurity
---
## 🏛️ I Saw No Temple Therein

A temple exists to hold God's presence in one place.

Israel's temple always pointed toward something greater than itself.

Here, there is no building because there is no distance left to bridge.

God and the Lamb are present directly, not through a structure.

🏛️ Temples normally hold God's presence

👉 Israel's temple pointed beyond itself

🚫 No building because no distance remains

📖 God's presence needs no structure here

## 🌞 The City Had No Need Of The Sun, Neither Of The Moon, To Shine In It

Isaiah pictured this exact scene centuries before Revelation was written.

Sun and moon are not destroyed.

They are simply unnecessary here.

God's own glory provides light brighter than either one.

A light that never needs to rise or set never leaves.

🌞 Sun and moon are not destroyed

🔆 They are simply unnecessary here

✨ God's glory outshines them both

📖 This light never rises or sets

## 🌍 The Nations Of Them Which Are Saved Shall Walk In The Light Of It

This phrase widens the promise beyond the twelve tribes named earlier.

"Nations" means people from every background, not one ethnic group alone.

Walking in light pictures living openly, with nothing left to hide.

The invitation reaches further than it did at the very start.

🌍 Nations means every background, not one group

🚶 Walking in light means living openly

🙈 Nothing is left to hide here

📖 This invitation reaches far beyond Israel alone

## 👑 The Kings Of The Earth Do Bring Their Glory And Honour Into It

These are the same kings who mourned Babylon's fall in chapter eighteen.

There, their wealth and glory burned up with that city.

Here, their glory is finally offered somewhere it will last.

Loyalty misplaced in Babylon finally lands in the right place.

👑 Same kings as chapter eighteen's mourning

🔥 Babylon's wealth once simply burned up

🎁 Their glory is finally offered rightly

📖 Misplaced loyalty finds the right place

## 🚪 The Gates Of It Shall Not Be Shut At All By Day

Ancient cities closed their gates every evening for protection.

An open gate at night meant real danger could walk right in.

This city's gates never close because no danger remains.

Safety here is not a precaution.

It is simply a permanent fact.

🚪 Ancient gates closed every single evening

⚔️ An open gate once meant danger

🔓 These gates never need to close

📖 Safety here is permanent, not precaution

## 🚫 There Shall In No Wise Enter Into It Any Thing That Defileth

"Defileth" means made impure, unfit for a holy place.

"In no wise" is an old way of saying absolutely not, under any condition.

This is not a loose suggestion.

It is an absolute boundary instead.

The city's beauty and its purity are never separated from each other.

🚫 Defileth means impure, unfit to enter

❌ In no wise means absolutely not

🛡️ This boundary is absolute, not loose

📖 Beauty and purity never separate here

## 📚 They Which Are Written In The Lamb's Book Of Life

This exact book appeared already, back in chapter twenty's judgment scene.

Being written there was the one thing that mattered in that judgment.

Entry into this city traces back to that same book.

The ending of Revelation connects directly back to its most serious warning.

📚 This book first appeared in chapter twenty

⚖️ Being written there decided that judgment

🔑 Entry here traces to that book

➡️ The ending connects to the earlier warning
`.trim();

export const REVELATION_TWENTY_ONE_PERSONAL_SECTIONS = parseRevelationTwentyOneRawNotes(REVELATION_TWENTY_ONE_RAW_NOTES);
