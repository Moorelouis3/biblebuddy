export type SecondChroniclesFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesFourRawNotes(rawText: string): SecondChroniclesFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 4:${startVerse}` : `2 Chronicles 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 2 Chronicles 4 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_FOUR_RAW_NOTES = `# SecondChronicles 4:1
# 🔥 The Altar Of Brass
---
## 🔥 An Altar Of Brass

An altar of brass was the temple's main altar for burnt offerings.

Priests laid the sacrifice on top and burned it there completely.

This altar stood in the outer court where ordinary worshipers could see it.

Everything else in the chapter sits farther inside, out of public view.

🔥 Altar of brass means the burnt offering altar

🐑 Sacrifices were burned completely on it

👀 It stood in the outer court

➡️ Later furnishings sit deeper inside

---

## 📐 Twenty Cubits The Length Thereof, And Twenty Cubits The Breadth Thereof

A cubit measured about the length of a man's forearm.

Twenty cubits by twenty cubits made this altar a perfect square.

That comes to about thirty feet on every side.

The tabernacle's altar in Exodus was only five cubits square.

Solomon's version was four times as wide on each side.

📏 A cubit equals about a forearm's length

⬛ Twenty by twenty cubits made a square

📐 About thirty feet on each side

📖 Four times wider than the tabernacle's altar

---

## 📏 Ten Cubits The Height Thereof

Ten cubits comes to about fifteen feet tall.

That height put the altar's top well above a standing priest's head.

Priests likely needed a ramp or steps to reach the top safely.

The temple scaled up every measurement from the tabernacle's smaller version.

Nothing about Solomon's house was built to ordinary human size.

📏 Ten cubits is about fifteen feet

🧍 Taller than a standing priest's head

🪜 A ramp likely reached the top

📖 Everything here was built oversized

# SecondChronicles 4:2-5
# 🌊 The Molten Sea
---
## 🌊 A Molten Sea Of Ten Cubits

A molten sea was a massive round basin cast entirely from bronze.

Molten means poured as liquid metal into a mold and left to cool.

Ten cubits across comes to about fifteen feet in diameter.

Nothing this large had ever stood in the tabernacle before it.

🌊 A molten sea is a huge cast basin

🔥 Molten means poured as liquid metal

📏 About fifteen feet across

📖 Far larger than anything the tabernacle held

---

## 🔢 A Line Of Thirty Cubits Did Compass It

A line of thirty cubits describes the sea's full circumference.

That distance comes to about forty five feet around the rim.

A circle ten cubits across would measure closer to thirty one cubits around.

Many scholars believe this number was simply rounded for the record.

Scripture often favors a whole number over an exact one.

📏 Thirty cubits describes the full circumference

🔵 About forty five feet around the rim

🔢 The exact math would run slightly higher

📖 Scripture often rounds a measurement

---

## 🐂 The Similitude Of Oxen

Similitude means a carved likeness or image of something real.

A ring of carved oxen ran beneath the sea's rim all the way around.

Two full rows of these oxen were cast right into the bronze itself.

The carving was part of the casting, not added on afterward.

🐂 Similitude means a carved likeness

🔄 Oxen circled the whole rim

🔩 Two full rows were cast together

📖 The design was cast, not added later

---

## 🧭 It Stood Upon Twelve Oxen

Twelve oxen supported the entire weight of the sea beneath it.

Three oxen faced north, three west, three south, and three east.

Their bodies formed the legs the huge basin rested on.

Facing all four directions covered every side of the temple courtyard.

🐂 Twelve oxen carried the whole sea

🧭 Three faced each of four directions

🦵 Their bodies formed the sea's legs

➡️ Every direction of the courtyard was covered

---

## ✋ The Brim Of It Like The Work Of The Brim Of A Cup

A handbreadth was about the width of four fingers held together.

The sea's wall was that thick all the way around.

Its rim curved outward like the lip of an ordinary drinking cup.

Carved lily flowers decorated that curved rim.

Even the smallest edge of this basin carried real craftsmanship.

✋ A handbreadth equals about four fingers

🍵 The rim curved like a cup's lip

🌸 Lily flowers decorated the rim

📖 Even the edge showed real craftsmanship

---

## 🪣 It Received And Held Three Thousand Baths

A bath was a liquid measure used throughout the Old Testament.

One bath held close to six gallons of liquid.

Three thousand baths adds up to about eighteen thousand gallons of water.

That is by far the largest single vessel in the whole temple.

Priests used its water to wash before approaching the altar.

🪣 A bath measured about six gallons

🔢 Three thousand baths equals eighteen thousand gallons

🏆 The largest single vessel in the temple

📖 Its water prepared priests to serve

# SecondChronicles 4:6
# 🛁 The Ten Lavers
---
## 🛁 He Made Also Ten Lavers

A laver was a smaller basin used for washing.

Solomon set five lavers on the right side of the temple.

He set five more on the left side to match.

Ten lavers meant a much bigger washing system than before.

🛁 A laver is a smaller washing basin

🔀 Five stood on each side

🔢 Ten lavers total, five and five

📖 A much bigger system than before

---

## 🐑 Such Things As They Offered For The Burnt Offering They Washed In Them

These ten lavers had one specific job in the temple.

Priests washed the parts of burnt offering animals in them.

A burnt offering was fully consumed on the altar afterward.

Washing came first, then the fire finished the sacrifice.

🐑 Burnt offering parts were washed here

🔥 The whole animal was later burned

💧 Washing happened before the fire

📖 Cleaning came before the offering was complete

---

## 🚿 But The Sea Was For The Priests To Wash In

The lavers and the sea served two different purposes.

Lavers cleaned pieces of the sacrifice itself.

The sea existed for the priests to wash their own bodies.

One object cleaned the offering, and the other cleaned the people serving it.

🐑 Lavers cleaned the sacrifice pieces

🚿 The sea cleaned the priests themselves

🙌 Object and person had separate basins

📖 Even washing followed a careful order

# SecondChronicles 4:7-9
# 🕯️ Candlesticks, Tables, And The Courts
---
## 🕯️ Ten Candlesticks Of Gold According To Their Form

The tabernacle held only one golden candlestick in Exodus twenty five.

Solomon's temple now held ten of them instead.

According to their form means each one matched that original pattern exactly.

Five stood on the right side and five on the left.

🕯️ The tabernacle had only one candlestick

✨ Solomon's temple now held ten

📐 Each one matched the original pattern

📖 Light in the temple multiplied tenfold

---

## 🍞 He Made Also Ten Tables

The tabernacle held only one table for the shewbread.

Solomon's temple now held ten tables instead of one.

Shewbread was bread kept continually in God's presence.

More tables meant more of that bread displayed at once.

🍞 The tabernacle had only one table

🔢 Ten tables now stood in its place

📿 Shewbread stayed in God's presence

📖 More bread, more constant presence

---

## 🥣 An Hundred Basons Of Gold

These basons were smaller gold bowls used in daily temple service.

A hundred of them shows how much equipment ordinary worship required.

None of this gold sat unused in a storeroom.

Every bason had a real job to do.

🥣 Basons were small gold bowls

🔢 A hundred were made in all

🛠️ Worship required real daily equipment

📖 Every piece had a working purpose

---

## 🏛️ The Court Of The Priests, And The Great Court

The temple grounds had two separate courtyards.

The court of the priests sat closest to the altar and the house.

The great court surrounded it, open to a wider crowd of worshipers.

Distance from the center matched a person's role in worship.

🏛️ Two separate courtyards stood here

🙏 The priests' court sat closest in

👥 The great court held the wider crowd

📖 Distance matched a worshiper's role

---

## 🚪 Overlaid The Doors Of Them With Brass

The court's doors were built of wood like ordinary doors.

Solomon covered them in brass instead of leaving them plain.

Brass on outdoor doors could survive weather that gold could not.

Even the entrances to the outer courts still received real craftsmanship.

🚪 Court doors were covered in brass

🌦️ Brass held up against outdoor weather

🏗️ Not left as plain wood

📖 Even the entrances got real craft

# SecondChronicles 4:10
# 📍 The Sea's Placement
---
## 🧭 He Set The Sea On The Right Side Of The East End

The right side here means the south side of the temple.

The east end faced the sunrise, the direction worshipers approached from.

Solomon placed the sea near that entrance corner, not hidden away.

Its position made it one of the first things a visitor saw.

🧭 Right side here means south

🌅 The east end faced the sunrise

👀 Visitors saw it near the entrance

📖 Its placement was not an accident

---

## 📍 Over Against The South

The south here pins down the sea's exact corner.

The sea sat between the altar and the temple's main door.

A priest walked past the sea on the way from one to the other.

Washing sat physically between sacrifice and entering God's house.

📍 The south pins down the exact corner

🔥 It sat near the altar

🚪 Also near the temple's main door

📖 Washing stood between sacrifice and entry

# SecondChronicles 4:11-14
# 🛠️ Huram's Bronze Work
---
## 🪣 Huram Made The Pots, And The Shovels, And The Basons

Pots here were used for carrying away ashes from the altar.

Shovels cleared ash from the altar's surface between sacrifices.

Basons caught and held the blood of the sacrifice.

Three separate tools handled three separate parts of one job.

🪣 Pots carried ashes away

🧹 Shovels cleared the altar's surface

🩸 Basons caught the sacrifice's blood

📖 One task, split across three tools

---

## 👷 Huram Finished The Work

This Huram is the skilled craftsman introduced back in chapter two.

His mother was Israelite and his father was from Tyre.

Solomon specifically requested him for his rare bronze working skill.

Finishing this list marks the end of his bronze assignment.

👷 Huram was introduced in chapter two

🌍 Born of an Israelite mother, a Tyrian father

🔨 Solomon requested his bronze skill by name

📖 This finished his full assignment

---

## 🏛️ The Two Pillars, And The Pommels, And The Chapiters

These are the same two pillars named Jachin and Boaz in chapter three.

A pommel was a rounded bowl shaped piece near the pillar's top.

A chapiter was the full decorated capital that pommel belonged to.

Huram is now credited by name for building both.

🏛️ These are Jachin and Boaz again

⚪ A pommel was a rounded bowl shape

👑 A chapiter was the full decorated top

📖 Huram gets credit here by name

---

## 🔗 The Two Wreaths To Cover The Two Pommels

A wreath here was a network of chain like carving.

Each wreath wrapped around and hid the plain metal pommel beneath it.

Decoration covered function, so no bare piece was left showing.

This matches the chain carving already described inside the temple in chapter three.

🔗 A wreath was chain like carving

🙈 It covered the plain pommel underneath

🎨 Nothing bare was left showing

📖 It echoes the chains carved inside

---

## 🍎 Four Hundred Pomegranates On The Two Wreaths

Two hundred pomegranates decorated each of the two wreaths.

They were arranged in two rows of a hundred on every wreath.

Pomegranates already appeared as a symbol of fruitfulness in chapter three.

The same fruit now covers the entrance pillars in staggering number.

🍎 Two hundred pomegranates per wreath

🔢 Four hundred in all, arranged in rows

🌳 A symbol of fruitfulness repeated here

📖 A familiar symbol shown in staggering number

---

## 🛠️ He Made Also Bases, And Lavers Made He Upon The Bases

A base here was a bronze stand that held a laver above the ground.

First Kings describes these bases with wheels for moving them around the court.

A laver could then be rolled to wherever washing was needed.

Even the stands beneath the basins were built with real purpose.

🛠️ A base was a bronze stand

🎡 First Kings describes wheels on them

🚶 Lavers could roll where needed

📖 Even the stands served a purpose

# SecondChronicles 4:15-18
# ⚖️ The Sea, The Tools, And Their Weight
---
## 🌊 One Sea, And Twelve Oxen Under It

Chronicles restates what already got built earlier in the chapter.

One sea, resting on twelve oxen, appears here as a final tally.

Historical books often repeat a finished project once before moving on.

The repetition works like a checklist item being marked complete.

🌊 One sea gets counted again here

🐂 Twelve oxen still support it

✅ This reads like a finished checklist

📖 The record confirms it was completed

---

## 🍖 The Fleshhooks, And All Their Instruments

A fleshhook was a forked metal tool for handling meat.

Priests used it to lift pieces of sacrifice off the altar.

All their instruments covers every remaining small bronze tool in the temple.

None of these tools were left out of the official record.

🍖 A fleshhook lifted meat off the altar

🔧 It was a forked metal tool

📋 All their instruments means every small tool

📖 Nothing here went unrecorded

---

## 👨‍🔧 Did Huram His Father Make

His father here is not a literal family title for Huram.

It was an honorary way of naming a master craftsman.

The same title marked a skilled leader other workers respected and followed.

Solomon trusted him enough to give him this whole bronze assignment.

👨‍🔧 His father was an honorary title

🏆 It marked a master craftsman

👥 Other workers respected and followed him

📖 Solomon trusted him with this whole task

---

## ✨ Of Bright Brass

Bright brass means bronze that was polished until it shone.

Plain cast bronze looked dull compared to this finished version.

Polishing took extra time on top of the original casting work.

Even the finish on this metal was not left ordinary.

✨ Bright brass means polished bronze

🌑 Plain cast metal looked dull instead

⏳ Polishing took real extra time

📖 The finish itself was not ordinary

---

## 🗺️ In The Clay Ground Between Succoth And Zeredathah

Solomon had these pieces cast in the plain of Jordan, not in Jerusalem.

That valley had the right clay ground for large scale bronze casting.

Workers packed wet clay into a mold shape and poured melted bronze inside.

Succoth and Zeredathah simply mark the stretch of valley where this happened.

🗺️ Cast in the Jordan valley, not Jerusalem

🧱 Clay ground suited large scale casting

🔥 Melted bronze was poured into molds

📖 Succoth and Zeredathah mark the location

---

## ⚖️ The Weight Of The Brass Could Not Be Found Out

Nobody ever weighed the full amount of bronze used in this project.

That is a striking admission for such a detailed building record.

Chapter three already gave an exact weight for the gold used inside.

The bronze outside apparently reached an amount too large to measure.

⚖️ Nobody weighed the total bronze

📜 A striking gap in a detailed record

✨ Chapter three gave an exact gold weight

📖 The bronze exceeded easy measurement

# SecondChronicles 4:19-22
# 🌟 The Golden Furnishings
---
## ✨ The Golden Altar Also

This golden altar is different from the bronze altar back in verse one.

It stood inside the temple itself, not out in the courtyard.

Priests burned incense on it rather than animal sacrifices.

Two altars now served two very different purposes in the same building.

✨ A second altar, made of gold

🏠 It stood inside the temple itself

🌫️ Incense burned here, not sacrifice

📖 Two altars, two different purposes

---

## 🍞 The Tables Whereon The Shewbread Was Set

Verse eight already mentioned Solomon's ten tables for the temple.

This verse confirms their exact purpose, holding the shewbread.

The tabernacle had managed with just one such table for centuries.

Ten tables now held that same bread continually before God.

🍞 These tables held the shewbread

🔟 Ten replaced the tabernacle's single table

⛺ The tabernacle used only one for centuries

📖 More tables meant more constant bread

---

## 🕯️ That They Should Burn After The Manner Before The Oracle

The oracle is another name for the most holy house from chapter three.

These candlesticks stood in the main hall just outside that inner room.

After the manner means they burned in the exact prescribed way.

Their light stayed lit facing the room where God's presence rested.

🕯️ These lamps stood before the oracle

🕍 Oracle means the most holy house

📏 They burned in the prescribed way

📖 Light faced where God's presence rested

---

## 🌸 The Flowers, And The Lamps, And The Tongs

Flowers here were decorative gold shapes built into the candlestick's design.

Lamps were the small oil vessels that actually held the flame.

Tongs let a priest adjust a wick without ever touching the fire directly.

Three small parts kept one larger object working properly.

🌸 Flowers decorated the candlestick's design

🔥 Lamps held the actual oil flame

🛠️ Tongs adjusted the wick safely

📖 Small parts kept the whole thing working

---

## 💯 That Perfect Gold

Perfect gold describes the purest, most refined grade available.

Lower grades of gold still contained other mixed in metals.

Solomon chose the highest possible standard for these small objects.

Even tiny tools like tongs did not get a lesser grade.

💯 Perfect gold means the purest grade

⚗️ Lower grades mixed in other metals

🏆 Solomon chose the highest standard

📖 Even small tools got the best grade

---

## ✂️ The Snuffers, And The Basons, And The Spoons, And The Censers

Snuffers trimmed burnt wick tips off the lamps.

Basons and spoons handled liquid and incense in small amounts.

Censers carried burning incense from one place to another.

Four different small tools, each with one specific daily job.

✂️ Snuffers trimmed the burnt wick tips

🥄 Basons and spoons handled small amounts

🌫️ Censers carried burning incense around

📖 Four tools, four specific daily jobs

---

## 🚪 The Inner Doors Thereof For The Most Holy Place

Even the doors leading into the most holy place were made of gold.

That room held the ark and stood as the most restricted space in Israel.

Nothing about this final detail was left ordinary or plain.

The whole chapter closes the same way chapter three did, on total extravagance.

🚪 Even these inner doors were gold

🕍 They led to the most holy place

🚫 Nothing here was left plain

📖 The chapter closes on total extravagance
`.trim();

export const SECOND_CHRONICLES_FOUR_PERSONAL_SECTIONS = parseSecondChroniclesFourRawNotes(SECOND_CHRONICLES_FOUR_RAW_NOTES);
