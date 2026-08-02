export type ExodusThirtyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirtyFiveRawNotes(rawText: string): ExodusThirtyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirtyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+35:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 35 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+35:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+35:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 35 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 35,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 35:${startVerse}` : `Exodus 35:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Exodus 35 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTY_FIVE_RAW_NOTES = `# Exodus 35:1-3
# 🕯️ The Sabbath Comes Before The Building Begins
---
## 👥 Moses Gathered All The Congregation Of The Children Of Israel Together

This gathering happens right after Moses comes down the mountain a second time.

His face was still glowing from being with God at the end of chapter thirty four.

Every single Israelite is called together as one group.

Nobody is told the news family by family.

The tabernacle instructions God gave Moses alone are about to become a whole nation's project.

What started as a private conversation on a mountain now belongs to everyone.

👥 Everyone is gathered as one group

⛰️ This follows Moses' second trip down the mountain

✨ His face still glowed from being with God

📖 A private instruction becomes a shared project

## 📜 These Are The Words Which The LORD Hath Commanded

This phrase insists everything that follows came from the LORD, not from Moses.

Just one chapter earlier, the people had acted entirely on their own.

That earlier moment built a golden calf while Moses was still on the mountain.

Now Moses puts obedience front and center before a single instruction is even given.

The word commanded means these are not requests to think over.

Obedience comes before explanation this time.

📜 The LORD is named as the true source

⚠️ Disobedience happened just one chapter earlier

🫡 Obedience is framed before any details are given

➡️ These are commands, not options

## 🛑 An Holy Day, A Sabbath Of Rest To The LORD

This same weekly rest law was already given back in chapters twenty, twenty three, and thirty one.

Repeating it here, before any building begins, is not an accident.

The tabernacle is God's own house, but building it never overrides resting on His day.

Even sacred work must stop for the Sabbath.

God does not need Israel's labor more than He wants Israel's rest.

🛑 This Sabbath law already appeared three times

🏗️ Building God's house does not cancel this rule

📅 Rest applies even to sacred work

📖 God wants rest more than He wants labor

## ⚰️ Whosoever Doeth Work Therein Shall Be Put To Death

This exact penalty already appeared in chapter thirty one, verse fifteen.

Saying it again here, right before construction starts, is a specific warning.

The coming weeks will be full of busy, urgent building work.

Excitement about the project was never a reason to skip the day of rest.

This warning is aimed at enthusiasm, not laziness.

⚰️ This penalty already appeared in chapter thirty one

🔨 It is repeated right before construction begins

😊 Even eager builders are not exempt

➡️ Busyness is never an excuse to skip rest

## 🔥 Ye Shall Kindle No Fire Throughout Your Habitations Upon The Sabbath Day

"Habitations" means homes, the tents where each family actually lived.

Fire took real daily effort to light and keep going in the ancient world.

It was needed for cooking, warmth, and light every single day.

Naming fire specifically shows how far this rest was meant to reach.

It was not only for public religious work, it reached into ordinary daily life.

🏠 Habitations means the homes where families lived

🔥 Fire took real daily effort to light

🍲 It was needed for cooking, warmth, and light

📖 Sabbath rest reached into daily life

# Exodus 35:4-9
# 🎁 A Willing Hearted Offering
---
## 🗣️ This Is The Thing Which The LORD Commanded

Moses now moves from the Sabbath law to the building project itself.

He introduces this the exact same way, as something the LORD commanded.

Nothing about the actual construction is Moses' own idea.

Every instruction that follows carries God's authority, not a human plan.

🗣️ Moses again credits the LORD, not himself

🔄 Same pattern as the Sabbath command before it

🚫 None of this is Moses' own idea

📖 God's authority stands behind every instruction

## 💛 Take Ye From Among You An Offering Unto The LORD

This same call for materials already appeared in chapter twenty five.

That chapter recorded God's private instructions to Moses alone on the mountain.

This moment is where that private instruction becomes a public request.

What God said to one man now reaches an entire nation.

💛 This call repeats chapter twenty five almost exactly

⛰️ Chapter twenty five was private to Moses

📢 This moment makes it public

➡️ A private word becomes a shared project

## 🙌 Whosoever Is Of A Willing Heart, Let Him Bring It

Nothing here is required by tax, quota, or force.

Major building projects in Egypt ran on forced labor and mandatory tribute.

The tabernacle is built entirely from what people choose to give.

This is the opposite of the very system Israel just escaped.

🙌 Nothing is required by force or tax

🏛️ Egypt's building projects ran on forced labor

💝 The tabernacle runs on free choice instead

📖 This reverses the system Israel just left

## 🪙 Gold, And Silver, And Brass

Much of this metal likely came out of Egypt with the people themselves.

Chapter twelve describes the Egyptians handing over silver, gold, and clothing right before the Exodus.

What was plunder from a hostile nation becomes material for worship.

God turned Egypt's own wealth into the building blocks of His house.

🪙 This metal likely came from Egypt

🎁 Egyptians gave it away before the Exodus

🔄 Plunder becomes material for worship

📖 God repurposed Egypt's wealth for His own house

## 🧵 Blue, And Purple, And Scarlet, And Fine Linen, And Goats' Hair

Purple dye was the most expensive color in the entire ancient world.

It was extracted drop by drop from a specific sea snail.

Giving it here signals real, costly generosity, not leftover scraps.

Goats' hair was spun into the tough, coarse fabric used for the tent's outer covering.

Costly dye and ordinary hair both had a place in this offering.

🧵 Purple dye was the most expensive color

🐚 It came from a sea snail

🐐 Goats' hair became the tough outer tent covering

📖 Costly and ordinary materials both mattered here

## 🐏 Rams' Skins Dyed Red, And Badgers' Skins, And Shittim Wood

Many scholars believe "badgers' skins" mistranslates an unclear Hebrew word.

Real badgers did not live anywhere near this desert region.

The word more likely describes the tough, waterproof hide of a sea creature such as a dolphin or dugong.

"Shittim wood" is acacia, a hardy tree that actually grows in the Sinai desert.

Even the driest desert supplied exactly what this project needed.

🐡 Badgers' skins likely means a sea creature

🏜️ Real badgers never lived in this desert

🌳 "Shittim wood" is acacia, a desert tree

📖 The desert itself supplied the materials needed

## 🕯️ Oil For The Light, And Spices For Anointing Oil, And For The Sweet Incense

These ingredients point straight ahead to chapter thirty.

That chapter already gave the exact recipes for the anointing oil and the incense.

Both formulas were reserved only for tabernacle use, never for personal use.

The offering supplies raw materials for a recipe already settled on the mountain.

🕯️ These point to chapter thirty's recipes

🧪 Both formulas were reserved for tabernacle use only

🚫 Neither recipe was ever meant for personal use

📖 The people supply what the mountain already planned

## 💎 Onyx Stones, And Stones To Be Set For The Ephod, And For The Breastplate

These gemstones point ahead to the priestly garments described in chapter twenty eight.

The ephod was the priest's ornate vest, worn only while serving.

The breastplate held twelve stones, one for each tribe of Israel.

Even a gemstone here already had a purpose God had planned long before it arrived.

💎 These stones point to chapter twenty eight

👘 The ephod was the priest's ornate vest

🔢 The breastplate held one stone per tribe

📖 Every stone already had a planned purpose

# Exodus 35:10-19
# 🛠️ Naming Every Piece Of The Blueprint
---
## 🧠 Every Wise Hearted Among You Shall Come, And Make All That The LORD Hath Commanded

"Wise hearted" here means skilled at a craft, not intellectually clever.

Practical, hands on ability counts as its own kind of wisdom in this culture.

What follows repeats the same equipment list already given privately to Moses in chapters twenty five through thirty one.

This is the exact moment that private blueprint becomes public work.

🧠 Wise hearted means skilled at a craft

🔨 Hands on ability counts as real wisdom

📜 This repeats chapters twenty five through thirty one

➡️ A private blueprint becomes public work

## ⛺ The Tabernacle, His Tent, And His Covering, His Taches, And His Boards, His Bars, His Pillars, And His Sockets

"Taches" are clasps or hooks.

They joined the tabernacle's curtain sections into one continuous covering.

This whole structure was already described in detail back in chapter twenty six.

Every hook and board named here already had its blueprint drawn.

⛺ Taches are clasps or hooks

🧵 They joined the curtain sections together

📖 Chapter twenty six already described this structure

➡️ The most guarded object comes next

## 📦 The Ark, And The Staves Thereof, With The Mercy Seat, And The Vail Of The Covering

The ark held the stone tablets of the law inside it.

The mercy seat sat on top, the exact spot where God promised to meet with Moses in chapter twenty five.

The "vail" was the curtain separating the Most Holy Place from the rest of the tabernacle.

Only the high priest could pass through it, and only once a year.

The most guarded object in the whole tent gets named first.

📦 The ark held the stone tablets

🪑 The mercy seat is where God meets Moses

🚪 The vail separated the Most Holy Place

📖 Only the high priest crossed it yearly

## 🍞 The Table, And His Staves, And All His Vessels, And The Shewbread

The shewbread table held twelve loaves of bread.

Each loaf represented one of Israel's twelve tribes.

The bread was replaced fresh every single week.

It stood as a constant reminder that God provides.

🍞 Shewbread means twelve loaves representing Israel's tribes

📅 The bread was replaced fresh weekly

🍽️ Chapter twenty five first described this table

📖 The bread reminded Israel God provides

## 🕎 The Candlestick Also For The Light, And His Furniture, And His Lamps, With The Oil For The Light

The holy place had no windows.

This gold lampstand was its only source of light.

Scripture repeats this picture again and again, God's presence as light in the dark.

Without this lampstand, the holy place would have sat in total darkness.

🕎 The holy place had no windows

💡 This lampstand was its only light source

📜 Chapter twenty five first described it

📖 It pictures God's presence as light in darkness

## 💨 The Incense Altar, And His Staves, And The Anointing Oil, And The Sweet Incense, And The Hanging For The Door At The Entering In Of The Tabernacle

This gold altar stood just outside the veil, closest to the Most Holy Place.

Aaron burned incense on it every single morning and evening.

Chapter thirty already described this exact daily duty.

A fixed rhythm of worship happened here, twice a day, without fail.

💨 This altar stood just outside the veil

🌅 Aaron burned incense every morning and evening

📜 Chapter thirty already described this duty

📖 Worship here followed a fixed daily rhythm

## 🔥 The Altar Of Burnt Offering, With His Brasen Grate, His Staves, And All His Vessels, The Laver And His Foot

This bronze altar stood out in the open courtyard.

Animal sacrifices were actually burned here, in full public view.

That makes it very different from the gold incense altar hidden inside.

The laver was a wash basin, and "his foot" simply means its base or stand.

Priests washed their hands and feet at it before serving.

One altar faced the public, one stood in secret, and both were required.

🔥 This bronze altar stood in the public courtyard

👀 Sacrifices were burned here, in full view

🚿 The laver's foot means its base or stand

📖 One altar was public, one was hidden

## 🧱 The Hangings Of The Court, His Pillars, And Their Sockets, And The Hanging For The Door Of The Court

These linen curtain walls marked the outer edge of the whole tabernacle complex.

Chapter twenty seven already described this exact boundary.

The sacred space stayed visibly separate from the ordinary camp around it.

A curtain wall told every Israelite exactly where holy ground began.

🧱 These curtains marked the complex's outer boundary

📖 Chapter twenty seven already described this

🚧 The sacred space stayed visibly separate

➡️ A curtain marked exactly where holy ground began

## 📌 The Pins Of The Tabernacle, And The Pins Of The Court, And Their Cords

These are simple tent pegs and ropes.

They held the entire structure steady against desert wind.

Nobody would call a tent peg glamorous or important looking.

Even the smallest piece of hardware still counted as commanded work.

📌 Pins and cords are simple tent hardware

💨 They held the structure steady in desert wind

🔧 Nothing about them looks impressive

📖 Even small pieces counted as commanded work

## 👘 The Cloths Of Service, To Do Service In The Holy Place, The Holy Garments For Aaron The Priest, And The Garments Of His Sons, To Minister In The Priest's Office

These are the priestly garments described at length back in chapter twenty eight.

The ephod, the robe, the breastplate, and the turban all belong to this list.

Aaron and his sons wore these only while actively serving inside the tabernacle.

The list of objects ends, and attention shifts to the people who will actually build them.

👘 These garments were detailed in chapter twenty eight

👑 The list includes the ephod, robe, and breastplate

⏱️ They were worn only while actively serving

➡️ The list ends, and the builders come next

# Exodus 35:20-29
# 💛 Every Heart That Was Willing
---
## 🚶 All The Congregation Of The Children Of Israel Departed From The Presence Of Moses

The people do not hand anything over on the spot.

They go home first, back to their own tents and belongings.

Then they return with whatever they personally choose to bring.

This makes giving personal and individual, not one shared collection taken in the moment.

🚶 The people go home before giving anything

🏠 Each family decides what to bring

🎁 Giving here is personal, not a single collection

➡️ Two Hebrew phrases explain why they came back

## ❤️ Every One Whose Heart Stirred Him Up

This phrase describes internal motivation, not an order from Moses.

Nobody commands the people to give a specific amount.

Chapter thirty two showed this same kind of stirred heart building a golden calf.

The same heart that once moved toward sin now moves toward worship.

❤️ This phrase describes internal motivation, not force

🚫 No specific amount was ever ordered

🐂 This same heart once built a calf

📖 That heart now moves toward worship instead

## 🕊️ Every One Whom His Spirit Made Willing, And They Brought The LORD's Offering

"Heart stirred him up" and "spirit made willing" say almost the same thing twice.

Repeating the idea from two different angles doubles down on one point.

This response was real and personal, not staged or demanded.

Two phrases carry one message, nobody had to be talked into this.

🕊️ Two phrases repeat the same idea twice

✅ This emphasizes a real, personal response

🚫 Nothing here was staged or demanded

➡️ Men and women both come forward next

## 💍 Both Men And Women, As Many As Were Willing Hearted, And Brought Bracelets, And Earrings, And Rings, And Tablets, All Jewels Of Gold

"Tablets" here means a piece of jewelry, likely a pendant or nose ornament.

It does not mean a writing surface.

This is the same kind of jewelry Aaron collected before.

Earrings especially were melted down to build the golden calf in chapter thirty two.

The very metal once melted into an idol is now given back to God.

💍 Tablets here means a piece of jewelry

📝 It is not a writing surface

🐂 Aaron collected this jewelry for the calf

📖 The same gold now goes to God instead

## ✨ Every Man That Offered Offered An Offering Of Gold Unto The LORD

The original text repeats this same verb, offered offered, back to back.

That repetition emphasizes how widespread this giving actually was.

This was not a handful of wealthy donors stepping forward alone.

A broad wave of ordinary people chose to give, all at once.

✨ The doubled verb stresses how widespread giving was

👥 This was not just a few wealthy donors

🌊 A broad wave of ordinary people gave together

📖 Widespread generosity, not a handful of gifts

## 🧶 Every Man, With Whom Was Found Blue, And Purple, And Scarlet, And Fine Linen, And Goats' Hair, And Red Skins Of Rams, And Badgers' Skins, Brought Them

This phrase means people gave only from what they already personally owned.

Nothing here was seized from anyone's household.

Nobody searched tents or demanded a quota.

Every gift started as something already sitting in someone's own home.

🧶 "With whom was found" means already personally owned

🚫 Nothing was seized from any household

📋 No quota or search was ever ordered

➡️ Every gift began as someone's own belonging

## 🪵 Every One That Did Offer An Offering Of Silver And Brass Brought The LORD's Offering

The exact same voluntary pattern repeats here for metal and wood.

This is now the third time this chapter says the same thing in slightly different words.

Sheer repetition itself is the point.

The text keeps saying it because the response really was that complete.

🪵 The same pattern repeats for metal and wood

🔁 This is the third time this pattern appears

📢 Repetition itself makes the point

📖 The response really was this complete

## 🧵 All The Women That Were Wise Hearted Did Spin With Their Hands

Spinning thread by hand from raw fiber was a slow, genuinely skilled craft.

It was never simple busywork.

"Wise hearted" is the same term used for Bezaleel later in this chapter.

Their skill stands on equal footing with any other craftsman named here.

🧵 Hand spinning was a slow, skilled craft

🚫 It was never simple busywork

⚖️ Wise hearted is the same term for Bezaleel

📖 Their skill equals any craftsman named here

## 🐐 All The Women Whose Heart Stirred Them Up In Wisdom Spun Goats' Hair

This repeats the "heart stirred" language already used for the whole camp earlier in this section.

The exact same willing generosity is now credited to these women by name.

Skilled craft and a willing heart show up together again.

🐐 This repeats the "heart stirred" language from earlier

👩 The same generosity is credited to these women

🧶 Skilled craft and a willing heart appear together

➡️ Israel's leaders step forward next

## 👑 The Rulers Brought Onyx Stones, And Stones To Be Set, For The Ephod, And For The Breastplate

These are the tribal leaders, Israel's rulers.

They bring the rarest, most expensive materials of the whole offering.

Chapter thirty two showed these same leaders staying almost completely silent during the golden calf crisis.

Here, finally, the leaders act, and they act well.

👑 These are Israel's tribal leaders

💎 They bring the rarest materials of all

🐂 Chapter thirty two showed their near silence

📖 Here, the leaders finally act well

## 🌿 Spice, And Oil For The Light, And For The Anointing Oil, And For The Sweet Incense

This closing list matches the earlier request from verses eight and nine almost exactly.

Every single category of material asked for has now actually been supplied.

Nothing on God's original list came back empty.

🌿 This list matches verses eight and nine closely

✅ Every requested category was actually supplied

📋 Nothing came back empty

➡️ One final verse wraps up the whole response

## 🎁 The Children Of Israel Brought A Willing Offering Unto The LORD, Every Man And Woman, Whose Heart Made Them Willing

This closing sentence repeats the same "willing heart" language the section opened with.

The word "willing" now appears for the fourth time in this chapter alone.

Israel's labor in Egypt was forced and unpaid, under threat of punishment.

This time, the same people give freely, and nobody made them.

🎁 This bookends the section with "willing heart" again

🔢 Willing has now appeared four times here

⛓️ Their labor in Egypt was forced and unpaid

📖 This time, giving is free and chosen

# Exodus 35:30-35
# 🎨 Bezaleel And Aholiab, Filled And Called
---
## 📛 The LORD Hath Called By Name Bezaleel The Son Of Uri, The Son Of Hur, Of The Tribe Of Judah

Being called by name means personally and individually chosen.

This is not the same as being generally gifted along with everyone else.

Bezaleel comes from the tribe of Judah.

That same tribe later produces King David, and generations further on, Jesus.

Bezaleel's calling here is about skill, not royalty, but the tribe still matters.

📛 Called by name means personally chosen

🙅 Not the same as being generally gifted

👑 Judah later produces David, and then Jesus

📖 This calling is about craft, not royalty

## 🕊️ He Hath Filled Him With The Spirit Of God, In Wisdom, In Understanding, And In Knowledge, And In All Manner Of Workmanship

This exact language first appeared back in chapter thirty one.

Skilled craftsmanship, cutting stone, working metal, designing patterns, is described here as a direct gift of God's Spirit.

That is a striking claim.

A skilled pair of hands can be just as much a gift of God as a prophetic word.

🕊️ This language first appeared in chapter thirty one

🔨 Craftsmanship is named a gift of God's Spirit

🎯 Wisdom, understanding, knowledge, and skill are named together

📖 Skilled hands can be a gift too

## 💍 To Devise Curious Works, To Work In Gold, And In Silver, And In Brass

"Curious" in this old sense means carefully and skillfully made.

It does not mean strange or odd, the way the word is used today.

This is one of many words in the King James text whose meaning has quietly shifted since sixteen eleven.

Reading it with today's meaning would completely miss the point.

💍 Curious here means skillfully made

🚫 It does not mean strange or odd

📖 This word's meaning has shifted since sixteen eleven

➡️ Stonework and woodwork are named next

## 🪨 In The Cutting Of Stones, To Set Them, And In Carving Of Wood, To Make Any Manner Of Cunning Work

"Cunning" here means highly skilled.

It does not mean sneaky or deceptive, the way the word is usually used now.

This range of skill, gem cutting to woodcarving, shows Bezaleel's gifting covered many crafts at once.

One man carried an unusually wide range of skill.

🪨 Cunning here means highly skilled

🚫 It does not mean sneaky or deceptive

🎯 His gifting spanned several different crafts

📖 One man, many skills

## 🤝 He Hath Put In His Heart That He May Teach, Both He, And Aholiab, The Son Of Ahisamach, Of The Tribe Of Dan

Bezaleel is not only skilled, he is also gifted to teach others.

That means his skill can multiply beyond his own two hands.

Aholiab comes from Dan, a much smaller and less prominent tribe than Judah.

God's gifting for this sacred work was never limited to Israel's most notable family line.

🤝 Bezaleel is also gifted to teach others

✋ His skill can multiply past his own hands

⚖️ Dan is far less prominent than Judah

📖 This gift was not limited to Judah

## 🧵 Them Hath He Filled With Wisdom Of Heart, To Work All Manner Of Work, Of The Engraver, And Of The Cunning Workman, And Of The Embroiderer, In Blue, And In Purple, In Scarlet, And In Fine Linen, And Of The Weaver

This closing verse names four distinct specialties.

Engraving, general skilled craft, embroidery, and weaving.

It echoes chapter thirty one's description of these two men almost word for word.

What was privately promised to Moses on the mountain is now, publicly, actually happening.

🧵 Four specialties are named here

📖 This echoes chapter thirty one closely

✅ The private promise is now public

➡️ One closing thought ties the whole chapter together

## 🧑‍🤝‍🧑 Even Of Them That Do Any Work, And Of Those That Devise Cunning Work

This closing phrase covers every remaining skilled worker, named or not.

The word heart has now described willing givers, skilled women, and gifted craftsmen alike across this whole chapter.

Chapter thirty two showed a heart stirred toward a golden calf.

This same chapter shows that very heart stirred toward worship, generosity, and skilled work instead.

🧑‍🤝‍🧑 This phrase covers every remaining skilled worker

💛 "Heart" has described givers, women, and craftsmen alike

🐂 Chapter thirty two showed a sinful heart

📖 This chapter shows that heart stirred toward worship`.trim();

export const EXODUS_THIRTY_FIVE_PERSONAL_SECTIONS = parseExodusThirtyFiveRawNotes(EXODUS_THIRTY_FIVE_RAW_NOTES);
