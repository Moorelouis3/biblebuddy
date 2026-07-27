export type ExodusFortyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusFortyRawNotes(rawText: string): ExodusFortyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusFortyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+40:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 40 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+40:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+40:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 40 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 40,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 40:${startVerse}` : `Exodus 40:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Exodus 40 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_FORTY_RAW_NOTES = `# Exodus 40:1-8

# 📅 One Year To The Day

---

## 📅 On The First Day Of The First Month Shalt Thou Set Up The Tabernacle

The first month of Israel's calendar was called Abib (later renamed Nisan), roughly matching our March-April. Exodus 12:2 made this the very start of Israel's religious year, because it was the month of the Passover and the Exodus itself. This command lands exactly one year, to the day, after Israel walked out of Egypt - the tabernacle is finished and raised on the first anniversary of their freedom.

📅 The first month, Abib/Nisan, was set as year one, day one back in Exodus 12:2

🗓️ This is exactly one year after Israel left Egypt

🏗️ Freedom's anniversary becomes the day God's house is finally standing

---

## 🏠 The Tabernacle Of The Tent Of The Congregation

This structure gets two names used together throughout the book. "Tabernacle" means dwelling place - it's where God lives among His people. "Tent of the congregation" (sometimes translated "tent of meeting") means the place Israel gathers to meet with Him. One building, two purposes: God's address, and Israel's meeting point with Him.

🏠 "Tabernacle" means dwelling place - where God lives

🤝 "Tent of the congregation" means where Israel meets with Him

🏗️ One structure carries both jobs at once

---

## 📜 Put Therein The Ark Of The Testimony, And Cover The Ark With The Vail

The very first item placed inside is the holiest one: the ark, holding the stone tablets of the covenant. It's covered with the veil immediately, before anything else in the building is even set up. The order isn't random - assembly starts at the center, with the most sacred object, and works outward from there.

📜 The ark, the holiest object in Israel, goes in first

🚪 It's veiled immediately, before any other furniture is placed

➡️ Assembly moves from the center outward, not the other way around

---

## 🕯️ Bring In The Table...And Bring In The Candlestick, And Light The Lamps Thereof

Next come the table (which will hold the shewbread) and the golden lampstand. Both belong in the Holy Place, the outer room just in front of the veiled ark, and both were already built and described in detail back in chapters 25 and 37.

🍞 The table held the shewbread, described fully in chapter 25

🕯️ The candlestick (lampstand) lit the Holy Place

📖 Both were already fully built - this is placement, not construction

---

## 🔥 Set The Altar Of Gold For The Incense Before The Ark Of The Testimony

The incense altar goes just outside the veil, positioned in a direct line with the ark on the other side of the curtain - as close to the Most Holy Place as anything could get without actually entering it.

🔥 The incense altar sits just outside the veil

📐 It lines up directly with the ark, positioned across the curtain

🚫 This is as near the Most Holy Place as any daily-use object comes

---

## 🚪 Put The Hanging Of The Door To The Tabernacle

This is the tent's own entrance curtain - not the outer court's gate, which comes later in verse 8. Think of it as the front door to the sacred tent itself, separate from the fence line around the whole property.

🚪 This curtain is the tent's own front door

🏗️ It's different from the court gate, set up separately in verse 8

🧵 One property, two separate entrances at two separate boundaries

---

## 🔥 Set The Altar Of The Burnt Offering Before The Door Of The Tabernacle

Now the assembly moves out into the court: the large bronze altar, where animals were sacrificed, is placed right at the tent's entrance. This is the first object anyone entering the court from outside would actually reach.

🔥 The bronze altar of burnt offering stood at the tent's entrance

🚶 It's the first major object a worshipper coming in from outside would meet

🏗️ Assembly is still working from the center out to the edge

---

## 💧 Set The Laver Between The Tent...And The Altar, And Shalt Put Water Therein

The bronze washing basin goes between the altar and the tent door - positioned exactly where a priest would need it, after handling a sacrifice at the altar but before stepping through the tent door to serve inside.

💧 The laver sat between the altar and the tent's entrance

🧼 That's exactly where a priest needed to wash before going further in

🏗️ Its placement follows the actual order priests would move through

---

## 🏛️ Set Up The Court Round About, And Hang Up The Hanging At The Court Gate

The outer boundary - the linen walls and the entrance gate - is set up last of all. Notice the pattern across this whole passage: God's instructions build the tabernacle from the holiest point outward, ark first and court fence last, which is the exact reverse of the path a worshipper would walk once it's finished - gate first, then altar, then laver, then tent door, then finally toward the veiled ark at the center.

🏛️ The court's outer fence and gate go up last

➡️ Assembly runs center-to-edge; a worshipper's path runs edge-to-center

🚶 Approaching God and building His house move in opposite directions

# Exodus 40:9-11

# 🕊️ Anointing Everything Holy

---

## 🫙 Take The Anointing Oil, And Anoint The Tabernacle, And All That Is Therein

The special anointing oil - the exact recipe of myrrh, cinnamon, calamus, cassia, and olive oil given back in chapter 30 - gets used for the very first time here. To "anoint" means to pour or rub oil on something as a formal act of dedicating it to God. Nothing in the tabernacle becomes holy just by being expensive material; it becomes holy because it's set apart for God through this act.

🫙 This is the oil's recipe from chapter 30, used here for the first time

💧 "Anoint" means to pour oil on something as an act of dedication

✨ Holiness comes from being set apart for God, not from expensive materials

---

## ✨ And Shalt Hallow It, And All The Vessels Thereof: And It Shall Be Holy

"Hallow" means to make holy or set apart. Even the smaller tools and vessels used inside the tabernacle - not just the big furniture pieces - get included in this same declaration. Nothing inside gets left as "ordinary."

✨ "Hallow" means to formally set something apart as holy

🔧 Even small vessels and tools are included, not just major furniture

🚫 Nothing inside the tabernacle stays "ordinary" after this

---

## 🔥 Anoint The Altar Of Burnt Offering...An Altar Most Holy

This verse introduces a new phrase: "most holy." Not everything anointed carries the exact same level of holiness - the text is starting to build a hierarchy, with some objects (like this altar, and later the ark) marked as more sacred than others.

🔥 "Most holy" is a specific, higher-level designation

📊 Not every anointed object carries the exact same degree of holiness

📜 This starts a pattern of ranked sacredness that runs through the rest of the tabernacle system

---

## 💧 Anoint The Laver And His Foot, And Sanctify It

Even the washing basin - the most plain, functional piece of equipment in the whole tabernacle - receives the same anointing and the same word, "sanctify," used for the ark itself. There's no such thing as an unimportant object once it belongs to God's house.

💧 The laver gets the same anointing as the ark and the altar

🧼 It's the most plain, purely functional item in the building

🏠 Nothing that belongs to God's house counts as unimportant

# Exodus 40:12-15

# 👑 Aaron And His Sons Set Apart Forever

---

## 🚿 Bring Aaron And His Sons Unto The Door...And Wash Them With Water

Before Aaron or his sons put on a single piece of priestly clothing, they're washed with water first. This mirrors the fuller ordination ceremony from chapter 29 - purification always comes before dressing, and dressing always comes before serving.

🚿 Washing happens before any priestly garment is put on

📖 This matches the fuller ordination ceremony already given in chapter 29

📋 Purification, then dressing, then service - always in that order

---

## 👔 Put Upon Aaron The Holy Garments, And Anoint Him, And Sanctify Him

The elaborate garments described in chapter 28 and actually sewn in chapter 39 - the ephod, the breastplate, the blue robe, the golden forehead plate - get worn for the very first time here. And this time the anointing oil isn't just poured on an object; it's poured on a person, Aaron himself.

👔 These are the exact garments designed in chapter 28, built in chapter 39

🫙 This time the oil anoints a person, not just furniture

✅ Everything built across five chapters is finally put into use

---

## ⛪ That He May Minister Unto Me In The Priest's Office

"Minister" simply means to serve, and "the priest's office" means the formal, official role of priest. This phrase is the whole point of the last several chapters: all the garments, all the anointing oil, all the ordination steps exist for this one purpose - so Aaron can actually do the job God assigned him.

⛪ "Minister" means to serve; "the priest's office" means the formal role itself

🎯 Every garment and ritual detail exists to make this one purpose possible

✅ This is the payoff of everything built and prepared so far

---

## 🧥 Bring His Sons, And Clothe Them With Coats

Aaron's sons receive plain linen coats, not the gold-threaded ephod or jeweled breastplate reserved for the high priest alone (already detailed in chapter 39:27). Same washing, same general anointing, but a visibly simpler wardrobe marking their different rank within the priesthood.

🧥 The sons wear plain linen coats, not Aaron's elaborate garments

📖 Chapter 39:27 already described this simpler priestly clothing

📊 Same washing and anointing, but a clearly different rank

---

## ♾️ Their Anointing Shall Surely Be An Everlasting Priesthood Throughout Their Generations

"Everlasting" here means permanent for as long as this whole covenant system stood - not one generation's job, but a role passed down through Aaron's family line for centuries, all the way through the rest of the Old Testament until the temple system it belonged to came to an end.

♾️ "Everlasting" means permanent within this covenant system, not a one-time role

👪 The priesthood was meant to pass down through Aaron's family line

⏳ It continued for centuries, through the rest of Israel's history

# Exodus 40:16-19

# 🏗️ Moses Raises The Tabernacle

---

## ✅ Thus Did Moses: According To All That The LORD Commanded Him, So Did He

This exact obedience refrain echoed through chapter 39 as the craftsmen finished each piece. Now it applies to Moses personally, doing the actual physical work of assembly himself, not just approving what others built.

✅ This same refrain ran through chapter 39 for the craftsmen's work

🙌 Now it describes Moses' own hands-on physical labor

📏 Obedience here means matching the instructions exactly, with nothing added or skipped

---

## 🗓️ In The First Month In The Second Year, On The First Day Of The Month

This pins the date down precisely: day one of month one, year two, counting from the Exodus out of Egypt. Israel arrived at Sinai around the third month of year one (Exodus 19:1), which means the entire tabernacle project - collecting materials, building every piece, sewing every garment - took roughly nine months from start to finish.

🗓️ This is exactly one year after leaving Egypt, to the day

⛰️ Israel had arrived at Sinai about nine months earlier, in month three of year one

🔨 The whole building project took roughly nine months, start to finish

---

## 🔨 Moses Reared Up The Tabernacle, And Fastened His Sockets, And Set Up The Boards Thereof

Moses doesn't just supervise this final assembly - the text describes him physically fastening sockets, setting up boards, fitting bars, and raising pillars, the same hands-on work the skilled craftsmen did throughout chapters 36-39.

🔨 Moses is described doing hands-on physical assembly work

🏗️ Sockets, boards, bars, and pillars all get fitted into place

👷 A leader who builds alongside the work, not only one who commands it

---

## 🧑‍🤝‍🧑 "Moses" Standing In For The Whole Team

Later, in Numbers 4, moving just the tabernacle's frame and coverings required assigned teams of Levites and ox-carts - far more than one man could lift alone. Crediting "Moses" here for raising the entire structure is a common style in Hebrew narrative: naming the leader for work his whole team carried out under his direction, not claiming he did it single-handed.

🧑‍🤝‍🧑 Numbers 4 later shows moving this structure required organized teams

📖 Naming the leader for group work is a normal pattern in Hebrew narrative

🔨 "Moses" here represents the whole crew working under his direction

---

## 🧵 He Spread Abroad The Tent Over The Tabernacle...As The LORD Commanded Moses

The layered coverings - fine linen, goat hair, ram skins, and the tough outer skin, all detailed back in chapter 26 - go on last, closing up the structure. The chapter bookends this whole section with the same phrase it started with: as the LORD commanded.

🧵 The layered tent coverings from chapter 26 go on last

🏗️ This finishes and seals the physical structure

🔁 The refrain "as the LORD commanded Moses" bookends the passage

# Exodus 40:20-25

# 📜 The Ark, The Table, And The Lamp

---

## 📜 He Took And Put The Testimony Into The Ark

"The testimony" refers to the two stone tablets carrying the Ten Commandments, first mentioned back in Exodus 31:18 and 34:29. They're called "the testimony" because they testify, or bear witness, to the terms of the covenant between God and Israel.

📜 "The testimony" means the two stone tablets of the Ten Commandments

📖 Exodus 31:18 and 34:29 already introduced these tablets

⚖️ They're called testimony because they witness to the covenant's terms

---

## 🪶 Set The Staves On The Ark, And Put The Mercy Seat Above Upon The Ark

The "staves" are the carrying poles, which chapter 25:15 said must never be removed - the ark had to stay ready to move at any time. The "mercy seat" is the solid gold lid, where the blood of atonement would later be applied once a year, and where God's presence was said to meet with Israel above the two cherubim.

🪶 "Staves" are the carrying poles, permanently fixed per chapter 25:15

🥇 The "mercy seat" is the ark's gold lid, the place of atonement

🤝 This is where God's presence was said to meet with Israel

---

## 🚪 Set Up The Vail Of The Covering, And Covered The Ark Of The Testimony

The moment the ark is placed, the veil goes up and hides it from view. From this point forward, no one sees the ark itself except the high priest, and only once a year, on the Day of Atonement (Leviticus 16).

🚪 The veil hides the ark from view the moment it's placed

👤 Only the high priest ever saw it again after this

📅 That happened just once a year, on the Day of Atonement

---

## 🧭 Put The Table...Upon The Side Of The Tabernacle Northward, Without The Vail

This is the first time in the chapter an exact compass direction is given: the table goes on the north side of the Holy Place, outside the veil. Precise, physical placement mattered as much as which objects were included.

🧭 This is the chapter's first exact compass direction: north

📐 The table sat in the Holy Place, outside the veil

🏗️ Exact placement mattered, not just which pieces were used

---

## 🍞 He Set The Bread In Order Upon It Before The LORD

The "bread" is the shewbread, twelve loaves representing Israel's twelve tribes, kept continually present on the table (fully explained back in chapter 25). "Before the LORD" means it stayed there as an ongoing offering, present in His sight at all times, not eaten in one sitting like a normal meal.

🍞 The shewbread's twelve loaves represented Israel's twelve tribes

📖 Chapter 25 already explained this bread in full

⏳ "Before the LORD" means continually present, not a one-time meal

---

## 🕯️ Put The Candlestick...Over Against The Table, On The Side Of The Tabernacle Southward

The golden lampstand goes on the south side, directly across the room from the table on the north side - close enough that its light would actually illuminate the bread and the whole Holy Place.

🕯️ The lampstand sat on the south side, facing the table

🧭 North and south placement put the two pieces directly across from each other

💡 Its light illuminated both the bread and the room itself

---

## 🔥 He Lighted The Lamps Before The LORD

Notice who performs this act: Moses, not Aaron. At this exact moment, Aaron has been washed, dressed, and anointed, but the priesthood isn't yet functioning on its own - Moses is still personally handling tasks that will soon belong to Aaron's family alone.

🔥 Moses personally lights the lamps here, not Aaron

⏳ The priesthood exists but isn't yet running independently

🔄 Tasks like this one will soon transfer fully to Aaron's family

# Exodus 40:26-29

# 🔥 The Golden Altar And The Brazen Altar

---

## 🔥 Put The Golden Altar In The Tent Of The Congregation Before The Vail

The incense altar takes its position last among the Holy Place furniture, sitting right up against the veil - the closest object to the Most Holy Place that any priest could regularly approach without actually crossing inside.

🔥 The incense altar is the last Holy Place item placed

🚪 It sits directly against the veil

🚫 This was the nearest a regularly-serving priest ever got to the ark

---

## 💨 And He Burnt Sweet Incense Thereon

This is the altar's first actual use - the incense recipe of stacte, onycha, galbanum, and frankincense from chapter 30 gets burned here for the first time. Incense rising in smoke is often used elsewhere in Scripture as a picture of prayer rising up to God (see Psalm 141:2 and Revelation 5:8).

💨 This is the incense altar's very first recorded use

📖 The recipe itself came from chapter 30

🙏 Rising incense smoke often pictures prayer rising to God elsewhere in Scripture

---

## 🚪 Set Up The Hanging At The Door Of The Tabernacle

The tent's own entrance curtain, already planned back in verse 5, is now actually installed - the last piece completing the tent structure itself before attention turns to the court altar outside.

🚪 This is the same door curtain planned earlier in verse 5

✅ Its installation completes the tent structure itself

➡️ Attention now shifts outward, to the court altar

---

## 🐏 Put The Altar Of Burnt Offering...And Offered Upon It The Burnt Offering And The Meat Offering

The large bronze altar is set up, and sacrifices are offered on it for the first time. A "burnt offering" was an animal completely consumed by fire, symbolizing total devotion. A "meat offering" is an old English term for a grain or flour offering - "meat" here means food in general, not literally animal flesh.

🐏 This is the bronze altar's first recorded use for sacrifice

🔥 A "burnt offering" was an animal entirely consumed, symbolizing total devotion

🌾 A "meat offering" here means a grain offering - "meat" meant food broadly in old English

# Exodus 40:30-33

# 💧 Washing, And The Work Is Finished

---

## 💧 Set The Laver Between The Tent...And Put Water There, To Wash Withal

The bronze basin, made from Israelite women's donated mirrors back in chapter 38, is filled with water and installed exactly where the plan in verse 7 called for - functional installation now matching the earlier design.

💧 This is the same laver made from donated mirrors in chapter 38

📐 Its placement matches the plan laid out earlier in verse 7

✅ Design and execution line up exactly

---

## 🚿 Moses And Aaron And His Sons Washed Their Hands And Their Feet Thereat

This is the laver's first recorded use. Notice that Moses washes right alongside Aaron and his sons, even though Moses himself was never made a priest - a small detail highlighting his unique, in-between role as the one who set the whole system up.

🚿 This is the laver's very first recorded use

🤝 Moses washes alongside Aaron's family despite not being a priest himself

🌉 It highlights Moses' unique role bridging leadership and priesthood

---

## 🔁 When They Went Into The Tent...And When They Came Near Unto The Altar, They Washed

Chapter 30:20-21 already established this as a strict, standing rule with no exceptions: wash every single time before entering the tent or approaching the altar, on pain of death for skipping it. This verse shows the rule actually being kept in practice.

📖 Chapter 30:20-21 already set this as a strict, no-exceptions rule

⚠️ Skipping this washing carried a death penalty in that earlier passage

✅ This verse shows the rule being put into real practice

---

## 🏁 So Moses Finished The Work

This phrase deliberately echoes Genesis 2:1-2, where God "finished" His work of creation and rested. The builder of God's dwelling place completing his labor is framed in the same language as creation itself being completed - a small but pointed way of tying this project back to the very beginning of the Bible.

🏁 This phrasing echoes Genesis 2:1-2, where God "finished" His work

🌍 Completing God's house is framed with creation-level language

📖 A deliberate callback tying Exodus back to Genesis

# Exodus 40:34-35

# ☁️ The Glory Fills The Tabernacle

---

## ☁️ Then A Cloud Covered The Tent Of The Congregation

This is the very same cloud that led Israel out of Egypt (Exodus 13:21-22) and came down on Mount Sinai in thunder and fire (Exodus 19:16-18). Now it settles directly onto the finished tabernacle - the instant the building is complete, God's visible presence arrives with no delay at all.

☁️ This is the same cloud that led Israel out of Egypt in Exodus 13

⛰️ It's the same cloud that covered Sinai in Exodus 19

⚡ God's presence arrives the moment the building is finished - no gap, no delay

---

## ✨ And The Glory Of The LORD Filled The Tabernacle

"Glory" translates a Hebrew word (kabod) meaning weightiness or substantial presence - this isn't a vague feeling, it's something visible and tangible that actually filled physical space. The same thing happens centuries later at the dedication of Solomon's temple (1 Kings 8:10-11), where priests couldn't even stand to minister because of it.

✨ "Glory" (kabod) means a weighty, visible, tangible presence

🏛️ The same event repeats at Solomon's temple in 1 Kings 8:10-11

👀 This was something people could physically perceive, not just sense emotionally

---

## 🚫 Moses Was Not Able To Enter Into The Tent Of The Congregation

This is a striking detail: Moses, who spoke with God face to face on the mountain (Exodus 33:11) more directly than anyone else in the Old Testament, is now physically unable to enter his own finished tent because God's presence is too overwhelming. Closeness to God never erases His holiness.

🚫 Even Moses, God's closest human friend so far, can't enter

📖 Exodus 33:11 already described their face-to-face relationship

⚡ Intimacy with God doesn't cancel out His overwhelming holiness

---

## ⏳ Because The Cloud Abode Thereon

"Abode" is old English for "remained" or "stayed put." This wasn't a brief visit or a flash of light that faded - the presence of God settled in and stayed, dwelling in the structure exactly as its name, "tabernacle," dwelling place, promised it would.

⏳ "Abode" means remained or stayed, not a brief visit

🏠 This matches the name "tabernacle" itself - a true dwelling place

✅ God's presence didn't fade; it settled in and stayed

---

## 📖 A Foretaste Of What Was Still To Come

Centuries later, John 1:14 describes Jesus as the Word who "dwelt," or literally "tabernacled," among people - using the same imagery on purpose. Revelation 21:3 promises a future where "the tabernacle of God is with men" permanently, with no tent, veil, or distance left at all. The tent finished in this chapter is the first physical version of a promise that runs the entire length of Scripture: God coming to actually live with the people He saves.

📖 John 1:14 describes Jesus using this same "tabernacle" imagery on purpose

🏙️ Revelation 21:3 promises this dwelling becomes permanent, with no veil left

🎯 One promise - God dwelling with His people - runs from here to the Bible's final pages

# Exodus 40:36-38

# 🔥 The Cloud By Day, The Fire By Night

---

## ➡️ When The Cloud Was Taken Up From Over The Tabernacle, The Children Of Israel Went Onward

From this point forward, the cloud itself becomes Israel's marching orders. There's no separate signal, no human decision to strike camp - when the cloud visibly lifted off the tabernacle, that was the command to pack up and move.

➡️ The cloud itself functioned as Israel's signal to move

🚫 No separate human decision was needed to start traveling

👀 A visible, physical sign controlled the whole nation's schedule

---

## 🛑 If The Cloud Were Not Taken Up, Then They Journeyed Not Till The Day That It Was Taken Up

Staying put was just as much God's decision as moving was. Numbers 9:15-23 later explains this could mean staying camped for as little as a single day or as long as a full year - and either way, Israel wasn't free to decide for themselves when they'd had enough of waiting.

🛑 Staying camped was God's decision, not a matter of convenience

📖 Numbers 9:15-23 explains this could last anywhere from a day to a year

⏳ Israel had no say over how long they waited in any one place

---

## 🌙 The Cloud Of The LORD Was Upon The Tabernacle By Day, And Fire Was On It By Night

The visible form simply changed with the light. A cloud is easy to see against a bright daytime sky, but nearly invisible in the dark - so at night, the same presence appeared as glowing fire instead, doubling back to the exact pattern first described when Israel left Egypt in Exodus 13:21-22.

🌙 The same presence changed appearance: cloud by day, fire by night

👀 A cloud would be hard to see against a dark night sky; fire wouldn't

📖 This directly matches Exodus 13:21-22's original description

---

## 👁️ In The Sight Of All The House Of Israel, Throughout All Their Journeys

This wasn't a private sign reserved for Moses or the priests alone - every person in the entire nation could see it, every single day, for the whole span of "all their journeys," which stretches across the rest of the Pentateuch, through the forty years covered in Numbers and into Deuteronomy.

👁️ Every person in Israel could see this sign, not just leaders

🗓️ "All their journeys" points ahead to the forty years covered in Numbers

📖 This detail bridges Exodus into the rest of the Pentateuch

---

## 🏁 The Book Of Exodus Ends Here

Exodus opened with Israel enslaved, crying out under Pharaoh, invisible to the powers running their world (chapters 1-2). It closes with Israel free, organized under God's law, carrying His own visible presence with them into the wilderness. The distance between those two starting and ending points is the entire message of the book: God delivers His people, gives them His law, and comes to actually live among them.

🏁 Exodus began with Israel enslaved and unseen, crying out in Egypt

✅ It ends with Israel free, ordered, and carrying God's visible presence

📖 Deliverance, law, and God's dwelling presence - the whole book in three moves`;

export const EXODUS_FORTY_PERSONAL_SECTIONS = parseExodusFortyRawNotes(EXODUS_FORTY_RAW_NOTES);
