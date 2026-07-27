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

# 🕯️ The Sabbath Comes Before Any Building

---

## 👥 Moses Gathered All The Congregation Of The Children Of Israel Together, And Said Unto Them

This is likely the very next thing Moses does after coming down the mountain the second time with his face still shining (the end of chapter 34). Before a single tool is picked up for the tabernacle, he calls the entire nation together as one group to hear from him directly.

👥 This follows right after Moses' shining-face return in chapter 34

📢 The whole nation is gathered as one body, not told piecemeal

➡️ What follows is framed as a direct command, not a suggestion

---

## 📜 These Are The Words Which The LORD Hath Commanded, That Ye Should Do Them

Moses frames everything that follows as something to be done, not just heard. After the golden calf disaster, where the people acted the moment Moses' back was turned, this opening line puts obedience front and center before a single instruction is even given.

📜 Moses frames this as commands to obey, not just information to hear

⚠️ This comes right after a chapter where the people acted badly on their own

➡️ The very first command given is surprising

---

## 🛑 Six Days Shall Work Be Done, But On The Seventh Day There Shall Be To You An Holy Day, A Sabbath Of Rest To The LORD

Before any mention of gold, curtains, or the ark, the Sabbath is the very first thing repeated here — the same weekly rest law already given in chapters 20, 23, and 31. Building God's own house was never allowed to become an excuse to break God's rest.

🛑 The Sabbath is repeated first, before any building instructions at all

🏗️ Even constructing the tabernacle itself doesn't override this rest

➡️ The seriousness of this law is stated plainly next

---

## ⚰️ Whosoever Doeth Work Therein Shall Be Put To Death

This same severe penalty already appeared back in chapter 31:15. Its repetition here, right before the building project begins, is a warning aimed squarely at the coming weeks of eager, busy construction work — enthusiasm for the project is not an excuse to skip the rest day.

⚰️ This repeats the same death-penalty warning from chapter 31:15

🔨 It's placed here specifically to guard against "too busy building" excuses

➡️ One specific example of forbidden work is named

---

## 🔥 Ye Shall Kindle No Fire Throughout Your Habitations Upon The Sabbath Day

**"Habitations"** means homes or dwelling places. Lighting a fire — needed for cooking, warmth, and light — took real ongoing effort in the ancient world, so naming it specifically shows just how completely the Sabbath rest was meant to reach into daily life, not just formal labor.

🔥 "Habitations" means homes or dwelling places

🍲 Fire was needed for cooking and warmth, so banning it reached into daily life

➡️ With rest settled, Moses turns to the offering itself

# Exodus 35:4-9

# 🎁 A Willing-Hearted Offering

---

## 🗣️ Moses Spake Unto All The Congregation... This Is The Thing Which The LORD Commanded, Saying

Moses now moves from the Sabbath law to the building project itself, introducing it the same way — as something the LORD commanded, not Moses' own idea.

🗣️ Moses again credits the LORD, not himself, as the source of this instruction

➡️ The very first requirement is about the heart, not the material

---

## 💛 Take Ye From Among You An Offering Unto The LORD

This same call for materials already appeared in chapter 25:1-7, almost word for word. Repeating it here, right before the actual building starts, bridges God's private instructions to Moses on the mountain with the public moment the people actually respond.

💛 This nearly repeats the original call for materials from chapter 25

🌉 It bridges God's private instructions to Moses with the people's public response

➡️ The offering has one very specific condition attached

---

## 🙌 Whosoever Is Of A Willing Heart, Let Him Bring It

Nothing here is required by tax or force. Unlike major building projects in Egypt and other ancient empires, which ran on forced labor and mandatory tribute, the tabernacle is built entirely from what people choose to give.

🙌 Nothing is required by force, tax, or quota

🏛️ Ancient building projects elsewhere typically ran on forced labor, not choice

➡️ The list of acceptable materials begins with the metals

---

## 🪙 Gold, And Silver, And Brass

Much of this metal likely came from the jewelry the Israelites carried out of Egypt, when the Egyptians handed over their silver, gold, and clothing right before the Exodus (chapter 12:35-36). What was plunder from Egypt becomes the raw material for worship.

🪙 This gold and silver likely came from the Egyptians in chapter 12:35-36

🔄 Plunder from Egypt becomes raw material for worshiping God

➡️ Fabric and hair-based materials come next

---

## 🧵 Blue, And Purple, And Scarlet, And Fine Linen, And Goats' Hair

Purple dye was the most expensive color in the ancient world, extracted drop by drop from a specific sea snail, so its presence here signals real costly generosity. Goats' hair was spun into the coarse, durable fabric used for the tabernacle's outer tent covering.

🧵 Purple dye was the most expensive color in the ancient world to produce

🐐 Goats' hair was spun into the tough outer covering fabric of the tent

➡️ Animal hides and wood are named next

---

## 🐏 Rams' Skins Dyed Red, And Badgers' Skins, And Shittim Wood

Most scholars think "badgers' skins" is a KJV mistranslation of an unclear Hebrew word — real badgers didn't live in this desert region, and the word more likely refers to the tough, waterproof hide of a sea creature like a dolphin or dugong, used for the tent's weatherproof outer layer. **"Shittim wood"** is acacia, a hardy tree that actually grows in the Sinai desert and resists rot.

🐏 "Badgers' skins" likely mistranslates a word for waterproof sea-creature hide

🌳 "Shittim wood" is acacia, a rot-resistant tree native to this desert region

➡️ Oil and incense ingredients round out the list

---

## 🕯️ Oil For The Light, And Spices For Anointing Oil, And For The Sweet Incense

These ingredients point directly ahead to the detailed recipes for the anointing oil and incense already given in chapter 30 — specific formulas reserved only for tabernacle use.

🕯️ These point directly to the exact recipes given back in chapter 30

🚫 Both formulas were reserved only for tabernacle use, never for personal use

➡️ The final materials named are precious stones

---

## 💎 Onyx Stones, And Stones To Be Set For The Ephod, And For The Breastplate

These specific gemstones anticipate the priestly garments described in detail back in chapter 28 — the ephod (the priest's ornate vest) and the breastplate holding twelve stones representing Israel's twelve tribes.

💎 These stones point ahead to the priestly garments detailed in chapter 28

🔢 The breastplate held twelve stones, one for each tribe of Israel

➡️ Attention turns from materials to the actual builders

# Exodus 35:10-19

# 🛠️ The Same Blueprint, Named Again

---

## 🧠 Every Wise Hearted Among You Shall Come, And Make All That The LORD Hath Commanded

**"Wise hearted"** here means skilled at a craft, not intellectually clever — practical, hands-on ability is treated as its own form of wisdom. What follows is essentially the same equipment list already given privately to Moses on the mountain in chapters 25-31; this moment is where that private blueprint becomes a public, shared project.

🧠 "Wise hearted" means skilled at a craft, not intellectually clever

🔁 This repeats the private mountain instructions of chapters 25-31 publicly

➡️ The tabernacle structure itself is listed first

---

## ⛺ The Tabernacle, His Tent, And His Covering, His Taches, And His Boards, His Bars, His Pillars, And His Sockets

**"Taches"** are clasps or hooks, used to join the tabernacle's curtain sections together into one continuous covering, first described back in chapter 26.

⛺ "Taches" are clasps or hooks joining the curtain sections together

📖 This whole structure list matches chapter 26's original instructions

➡️ The innermost, holiest object comes next

---

## 📦 The Ark, And The Staves Thereof, With The Mercy Seat, And The Vail Of The Covering

The ark held the stone tablets and was topped by the mercy seat, the exact spot where God promised to meet with Moses (chapter 25:22). The **"vail"** is the curtain separating the Most Holy Place from the rest of the tabernacle, so sacred that only the high priest could pass through it, once a year.

📦 The mercy seat is the exact spot God promised to meet Moses, in chapter 25

🚪 The "vail" separated the Most Holy Place, crossed only once a year

➡️ Furniture from the holy place follows

---

## 🍞 The Table, And His Staves, And All His Vessels, And The Shewbread

The **shewbread** table held twelve loaves of bread representing Israel's twelve tribes, replaced fresh every week as a continual reminder of God's provision, first detailed in chapter 25.

🍞 The shewbread represented Israel's twelve tribes, refreshed weekly

📖 This table was first detailed back in chapter 25

➡️ The room's only light source is named next

---

## 🕎 The Candlestick Also For The Light, And His Furniture, And His Lamps, With The Oil For The Light

This gold lampstand was the only light inside the holy place, since it had no windows — a picture that reappears throughout Scripture of God's presence as light in the dark, first described back in chapter 25.

🕎 This lampstand was the tabernacle's only source of light, with no windows

📖 It was first described in chapter 25, alongside the ark and table

➡️ A second altar, for incense, comes next

---

## 💨 The Incense Altar, And His Staves, And The Anointing Oil, And The Sweet Incense, And The Hanging For The Door At The Entering In Of The Tabernacle

This gold altar stood just outside the veil and was where Aaron burned incense every morning and evening, a duty detailed back in chapter 30, alongside the oil and incense formulas already named in this chapter's offering list.

💨 Aaron burned incense here every morning and evening, per chapter 30

🚪 This altar stood just outside the veil, closest to the Most Holy Place

➡️ The outdoor altar and washing basin are named next

---

## 🔥 The Altar Of Burnt Offering, With His Brasen Grate, His Staves, And All His Vessels, The Laver And His Foot

This bronze altar stood in the outer courtyard, where animal sacrifices were actually burned — a very different, more public altar than the gold incense altar inside. The **laver** was the wash-basin priests used to clean their hands and feet before serving, "his foot" meaning its base or stand.

🔥 This bronze altar in the courtyard is where animal sacrifices were burned

🚿 The laver's "foot" is its base or pedestal stand, used for washing

➡️ The courtyard's boundary comes next

---

## 🧱 The Hangings Of The Court, His Pillars, And Their Sockets, And The Hanging For The Door Of The Court

These linen curtain walls marked the outer boundary of the whole tabernacle complex, first detailed back in chapter 27, keeping the sacred space visibly separated from the ordinary camp around it.

🧱 These curtains marked the outer boundary of the entire sacred complex

📖 This courtyard boundary was first detailed in chapter 27

➡️ Small but essential hardware is named next

---

## 📌 The Pins Of The Tabernacle, And The Pins Of The Court, And Their Cords

These tent pegs and ropes were the unglamorous hardware holding the entire structure steady against desert wind — a reminder that even the smallest, least impressive pieces were still part of what the LORD commanded.

📌 These pegs and ropes held the whole structure steady in desert wind

🔧 Even the smallest hardware pieces still counted as commanded work

➡️ The final items are the priestly clothing itself

---

## 👘 The Cloths Of Service, To Do Service In The Holy Place, The Holy Garments For Aaron The Priest, And The Garments Of His Sons, To Minister In The Priest's Office

These are the detailed priestly garments described at length back in chapter 28 — the ephod, breastplate, robe, and turban Aaron and his sons wore only while serving inside the tabernacle.

👘 These garments were described in full detail back in chapter 28

🚫 They were worn only while actively serving inside the tabernacle

➡️ The people's actual response begins next

# Exodus 35:20-29

# 💛 Every Heart That Was Willing

---

## 🚶 All The Congregation Of The Children Of Israel Departed From The Presence Of Moses

The people don't hand anything over on the spot — they go home first, back to their own tents and belongings, before returning with whatever they choose to bring. Giving here is personal and individual, not a single communal collection taken up in the moment.

🚶 The people go home first, rather than giving anything on the spot

🏠 This makes the offering personal and individual, not one shared collection

➡️ Two different Hebrew phrases describe why they came back

---

## ❤️ Every One Whose Heart Stirred Him Up

This is the first of two phrases describing internal motivation, both aimed at the same idea: nobody is being ordered to give. After chapter 32, where the people's hearts led them toward a golden calf, this is the same kind of heart now moving in the right direction.

❤️ This is the first of two phrases both describing internal motivation

🔄 The same kind of eager heart that built a calf in chapter 32 now builds rightly

➡️ The second phrase adds another layer

---

## 🕊️ Every One Whom His Spirit Made Willing, And They Brought The LORD's Offering To The Work Of The Tabernacle

Pairing "heart stirred him up" with "spirit made willing" doubles down on the same point from two different angles — this response is real, personal, and un-coerced, not stage-managed or demanded.

🕊️ Two different phrases stack together to emphasize the same point twice

✅ The response is real and personal, not staged or demanded

➡️ Both men and women are named as givers

---

## 💍 Both Men And Women... Brought Bracelets, And Earrings, And Rings, And Tablets, All Jewels Of Gold

**"Tablets"** here means a type of jewelry, likely a pendant or nose ornament, not a writing surface. This is strikingly the same category of jewelry — earrings especially — that Aaron collected from the people to melt down into the golden calf back in chapter 32:2-3.

💍 "Tablets" here means a piece of jewelry, not a writing surface

🐂 This is the same kind of jewelry Aaron melted into the golden calf in chapter 32

➡️ The text pauses to underline just how many gave

---

## ✨ Every Man That Offered Offered An Offering Of Gold Unto The LORD

The repeated verb ("offered offered") in the original text emphasizes just how widespread this giving was — this wasn't a handful of wealthy donors, but a broad wave of ordinary people all choosing to give at once.

✨ The doubled verb in the Hebrew emphasizes how widespread this giving was

👥 This wasn't a few wealthy donors — it was a broad wave of ordinary people

➡️ Fabric and hide materials are given too

---

## 🧶 Every Man With Whom Was Found Blue, And Purple, And Scarlet, And Fine Linen, And Goats' Hair, And Red Skins Of Rams, And Badgers' Skins, Brought Them

The phrase **"with whom was found"** signals that people gave only from what they already personally owned — nothing here was seized or demanded from anyone's household.

🧶 "With whom was found" means people gave only what they already owned

🚫 Nothing described here was seized or demanded from anyone

➡️ Metal and wood offerings are described the same way

---

## 🪵 Every One That Did Offer An Offering Of Silver And Brass Brought The LORD's Offering: And Every Man, With Whom Was Found Shittim Wood, Brought It

The same voluntary pattern repeats one more time for metal and wood, reinforcing through sheer repetition just how total and complete the people's response was.

🪵 The same voluntary pattern is repeated once more for metal and wood

🔁 The repetition itself emphasizes just how total this response was

➡️ Skilled women are highlighted specifically next

---

## 🧵 All The Women That Were Wise Hearted Did Spin With Their Hands, And Brought That Which They Had Spun, Both Of Blue, And Of Purple, And Of Scarlet, And Of Fine Linen

Hand-spinning thread from raw fiber was a slow, genuinely skilled craft, not simple busywork. Naming these women specifically as **"wise hearted"** — the same term used for Bezaleel later in this chapter — puts their craftsmanship on equal footing with any other skilled worker.

🧵 Hand-spinning was a slow, genuinely skilled craft, not simple busywork

⚖️ These women are called "wise hearted," the same term used for Bezaleel

➡️ Even more women are named for a related skill

---

## 🐐 All The Women Whose Heart Stirred Them Up In Wisdom Spun Goats' Hair

This repeats the "heart stirred" language from earlier in the section, applying the exact same willing generosity already shown by the men specifically to these women's specialized craft.

🐐 This repeats the "heart stirred" language used earlier for the whole camp

👩 The exact same willing generosity is credited to these women by name

➡️ Israel's leaders step forward too

---

## 👑 The Rulers Brought Onyx Stones, And Stones To Be Set, For The Ephod, And For The Breastplate

These are the tribal leaders, and their contribution — the rarest, most expensive gemstones — stands out because it directly contrasts with their near-total silence and passivity during the golden calf disaster in chapter 32, where Aaron acted almost alone as their representative.

👑 These tribal leaders bring the rarest, most expensive materials of all

🔄 This contrasts with the leaders' near-silence during chapter 32's crisis

➡️ A short list of remaining items closes out the giving

---

## 🌿 And Spice, And Oil For The Light, And For The Anointing Oil, And For The Sweet Incense

This closes out the specific list of items, matching the earlier call for materials in verses 8-9 almost exactly, confirming that every single category requested was actually met.

🌿 This closing list matches the earlier request in verses 8-9 almost exactly

✅ Every single category of material requested was actually provided

➡️ One final summary verse wraps up the whole response

---

## 🎁 The Children Of Israel Brought A Willing Offering Unto The LORD, Every Man And Woman, Whose Heart Made Them Willing To Bring For All Manner Of Work, Which The LORD Had Commanded To Be Made By The Hand Of Moses

This closing sentence bookends the section with the same "willing heart" language it opened with, and stands in sharp contrast to Israel's forced, unpaid labor as slaves back in Egypt — this time, giving is free, personal, and eager.

🎁 This bookends the section with the same "willing heart" language

⛓️ This freely-chosen giving contrasts sharply with their forced labor in Egypt

➡️ Two specific craftsmen are named to lead the actual construction

# Exodus 35:30-35

# 🎨 Bezaleel And Aholiab, Filled And Called

---

## 📛 Moses Said Unto The Children Of Israel, See, The LORD Hath Called By Name Bezaleel The Son Of Uri, The Son Of Hur, Of The Tribe Of Judah

Being **"called by name"** means personally and individually chosen, not just generally gifted along with everyone else. Bezaleel comes from the tribe of Judah, the same tribe that will later produce King David and, generations further on, Jesus — though Bezaleel's calling here is about craftsmanship, not royalty.

📛 "Called by name" means personally and individually chosen by God

👑 Bezaleel comes from Judah, the same tribe as David and, later, Jesus

➡️ What Bezaleel is filled with is stated directly

---

## 🕊️ And He Hath Filled Him With The Spirit Of God, In Wisdom, In Understanding, And In Knowledge, And In All Manner Of Workmanship

This same language first appeared in chapter 31:2-3, and it's a striking claim: skilled craftsmanship — cutting stone, working metal, designing patterns — is described here as a direct result of being filled with God's own Spirit, not a lesser gift than prophecy or leadership.

🕊️ This exact language first appeared back in chapter 31

🔨 Skilled craftsmanship is described here as a genuine gift of God's Spirit

➡️ Specific skills are listed by name

---

## 💍 And To Devise Curious Works, To Work In Gold, And In Silver, And In Brass

**"Curious"** in this old English sense means carefully and skillfully made, not strange or odd. This is a case where a common word has quietly changed meaning since the KJV was translated.

💍 "Curious" here means skillfully and carefully made, not strange or odd

📖 This is a word that has quietly changed meaning since 1611

➡️ Stonework and woodwork are named next

---

## 🪨 And In The Cutting Of Stones, To Set Them, And In Carving Of Wood, To Make Any Manner Of Cunning Work

**"Cunning"** here means highly skilled, not sneaky or deceptive — another old word whose meaning has shifted over time. This range of skills, from gem-cutting to woodcarving, shows Bezaleel's gifting covered many different crafts at once.

🪨 "Cunning" here means highly skilled, not sneaky or deceptive

🎯 Bezaleel's gifting spans several very different crafts at once

➡️ A second craftsman is introduced to work alongside him

---

## 🤝 And He Hath Put In His Heart That He May Teach, Both He, And Aholiab, The Son Of Ahisamach, Of The Tribe Of Dan

Bezaleel isn't just skilled — he's also gifted to teach others, so the work can multiply beyond just his own two hands. Aholiab comes from Dan, a much smaller and less prominent tribe than Judah, showing God's gifting for this sacred work wasn't limited to Israel's most notable family line.

🤝 Bezaleel is gifted to teach, so his skill multiplies beyond his own hands

⚖️ Aholiab's tribe, Dan, is far less prominent than Bezaleel's tribe, Judah

➡️ A final summary names their combined specialties

---

## 🧵 Them Hath He Filled With Wisdom Of Heart, To Work All Manner Of Work, Of The Engraver, And Of The Cunning Workman, And Of The Embroiderer, In Blue, And In Purple, In Scarlet, And In Fine Linen, And Of The Weaver

This closing verse names four distinct specialties — engraving, general skilled craft, embroidery, and weaving — echoing chapter 31's original description almost word for word, confirming that everything privately promised to Moses on the mountain is now, publicly, actually beginning.

🧵 Four distinct specialties are named: engraver, craftsman, embroiderer, weaver

📖 This closely echoes chapter 31's original description of these two men

➡️ The private mountain instructions have now fully become public, shared work

---

## 💛 Wisdom Of Heart, Named One Final Time

The word "heart" has now appeared for willing givers, skilled women, and gifted craftsmen alike across this entire chapter. The same heart that can be stirred toward sin, as in chapter 32, is shown here stirred toward worship, generosity, and skilled work — all under that same word.

💛 "Heart" describes givers, skilled women, and craftsmen alike in this chapter

🔄 The same heart capable of sin in chapter 32 is shown capable of worship here`;

export const EXODUS_THIRTY_FIVE_PERSONAL_SECTIONS = parseExodusThirtyFiveRawNotes(EXODUS_THIRTY_FIVE_RAW_NOTES);
