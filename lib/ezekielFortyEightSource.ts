export type EzekielFortyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielFortyEightRawNotes(rawText: string): EzekielFortyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielFortyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+48:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 48 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+48:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+48:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 48 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 48,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 48:${startVerse}` : `Ezekiel 48:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Ezekiel 48 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_FORTY_EIGHT_RAW_NOTES = `# Ezekiel 48:1-7
# 🧭 Seven Tribes Across The North
---
## 📜 Now These Are The Names Of The Tribes

"Portion" means the exact piece of land given to one tribe.

This verse opens a long list dividing the whole land.

Every tribe receives one named strip, not scattered plots.

Nothing is left open to later argument or dispute.

Each family will know exactly where its ground begins and ends.

📜 Portion means a tribe's own land

🗺️ The whole land gets divided here

🚫 Nothing is left to later dispute

📖 Every tribe gets a fixed place

## 🧭 These Are His Sides East And West

Each tribe's land forms one long strip running across the whole country.

The strip starts near the Jordan or the Dead Sea in the east.

It stretches all the way to the Mediterranean Sea in the west.

Picture horizontal bands stacked on top of each other like a ladder.

Dan's band sits at the very top, farthest north of all.

Every tribe gets the same shape, only moved further south.

🧭 Each tribe gets one long strip

🌅 Strips run from east to west

🪜 Bands stack like rungs on a ladder

📖 Every tribe shares the same shape

## 🏔️ The Border Of Damascus Northward

Hethlon and Hazarenan were real landmarks somewhere near ancient Syria.

Their exact locations are no longer known today.

Damascus still stands today as the capital of modern Syria.

This border marks the farthest point Israel's land was ever said to reach.

Chapter forty seven already explained Hamath as a major northern city.

🏔️ Hethlon and Hazarenan are lost names

🗺️ Damascus still stands in Syria today

📏 This marks the land's farthest north

📖 Chapter forty seven already named Hamath

## 😔 A Portion For Dan

Dan was one of Jacob's twelve sons, born through Rachel's servant Bilhah.

The tribe of Dan struggled for generations to hold onto its own land.

Judges eighteen shows Dan's people forced to move and settle elsewhere.

Later, Dan became known for building a shrine to a golden calf.

Even this troubled tribe receives a guaranteed place in God's new land.

😔 Dan struggled to keep land before

⚠️ Dan later built a golden calf shrine

🧵 Jacob's twelve sons each get a place

📖 Not even Dan is written out

## 🧵 A Portion For Asher

Asher was born to Zilpah, the servant Leah gave to Jacob.

Zilpah's two sons were Gad and Asher.

Children born through a servant still received full standing as tribes.

Family status in Israel did not depend only on who gave birth.

Asher's placement here shows that inheritance follows God's plan, not birth rank.

🧵 Asher's mother was Zilpah, Leah's servant

👶 A servant's sons still became full tribes

⚖️ Birth order did not decide inheritance

📖 God's plan outranks human birth rank

## 🧵 A Portion For Naphtali

Naphtali was born to Bilhah, the servant Rachel gave to Jacob.

Bilhah's two sons were Dan and Naphtali.

That makes Naphtali a full brother to Dan, listed just above him.

Both brothers now sit side by side on this map.

Old family ties from Genesis still shape where each tribe stands.

🧵 Naphtali's mother was Bilhah, Rachel's servant

👬 Dan and Naphtali were full brothers

🗺️ Both brothers now sit side by side

📖 Old family ties still shape this map

## 👑 A Portion For Manasseh

Manasseh was Joseph's firstborn son, born before his brother Ephraim.

In Genesis forty eight, Jacob still blessed the younger Ephraim first.

That blessing gave Ephraim the greater future, even though Manasseh came first.

Manasseh's strip here sits farther out, away from the sanctuary at the center.

Being born first did not guarantee the better position.

👑 Manasseh was Joseph's actual firstborn son

🔄 Jacob still blessed younger Ephraim first

📏 Manasseh's land sits farther from center

📖 Birth order again does not decide rank

## 🌾 A Portion For Ephraim

Ephraim was Joseph's younger son, yet he received the greater blessing.

Genesis forty eight records Jacob crossing his hands to bless Ephraim first.

Ephraim's strip of land sits closer to the sanctuary than Manasseh's does.

Closeness to the center here pictures the greater blessing Ephraim received.

A geography lesson is quietly repeating a family story from Genesis.

🌾 Ephraim was Joseph's younger son

🤲 Jacob crossed his hands to bless him first

📍 Ephraim's land sits nearer the center

📖 Geography echoes an old family blessing

## 🔄 A Portion For Reuben

Reuben was Jacob's actual firstborn son, oldest of all twelve.

Genesis forty nine records Jacob taking away Reuben's special firstborn rights.

Reuben had dishonored his father, so Judah received the leading role instead.

Even after losing that standing, Reuben still receives a full portion here.

Losing first place in one story did not mean losing everything forever.

🔄 Reuben was Jacob's actual firstborn

⚖️ Reuben lost his firstborn rights later

👑 Judah received the leading role instead

📖 A lost privilege did not erase grace

## 👑 A Portion For Judah

Judah is the tribe that produced Israel's kings, including David.

This chapter places Judah last among the seven northern tribes.

That last position is actually the one closest to the sanctuary.

The royal tribe stands nearest to God's own dwelling place.

Centuries later, a king from this same tribe is called the Lion of Judah.

👑 Judah is Israel's royal tribe

📍 Judah sits closest to the sanctuary

🦁 A future king is called Judah's Lion

📖 The royal tribe stands nearest to God

# Ezekiel 48:8-14
# 🏛️ The Holy Portion For Sanctuary And Priests
---
## 🎁 Five And Twenty Thousand Reeds In Breadth

"Offering" here means a piece of land set apart only for God.

A "reed" was a long measuring rod.

It was already used in chapters forty and forty one.

One reed measured about ten and a half feet.

Twenty five thousand reeds describes an enormous stretch of ground.

Many scholars believe the numbers in this vision are meant to feel vast.

The sheer scale matches a vision built on God's greatness.

🎁 Offering means land set apart for God

📏 A reed was about ten feet long

🌌 The number pictures something vast on purpose

📖 Scale here points to God's greatness

## 🏛️ The Sanctuary Shall Be In The Midst Of It

The temple sits at the exact center of this holy portion of land.

That holy portion then sits at the center of the whole nation's land.

Picture circles inside circles, with the temple as the innermost ring.

God's presence occupies the very middle of Israel's entire geography.

Nothing about this plan puts God on the edge of the picture.

🏛️ The temple sits at the very center

🎯 Circles inside circles frame the layout

🗺️ The whole nation surrounds that center

📖 God's presence is never on the edge

## 🖼️ The Oblation That Ye Shall Offer Unto The LORD

This verse names the entire holy block of land, not just one group's share.

It measures twenty five thousand by ten thousand, a large rectangle inside the whole land.

Verse ten divides this same rectangle between the priests and the Levites.

Think of this verse as drawing the outer frame before filling it in.

🖼️ This verse draws the outer frame first

📏 The block measures twenty five by ten thousand

✂️ Verse ten divides it between two groups

📖 The whole plan fills in piece by piece

## 🧭 Toward The North Five And Twenty Thousand In Length

This verse gives the priests their own exact measurements inside the larger block.

North and south each measure twenty five thousand in length.

East and west each measure ten thousand in breadth.

The sanctuary itself sits in the middle of this priestly share.

Levites receive a separate, equally sized share described a few verses later.

🧭 North and south measure the longer sides

📐 East and west measure the shorter sides

🏛️ The sanctuary sits inside this priestly share

📖 Levites get their own equal share next

## ✅ Sanctified Of The Sons Of Zadok

Zadok was a priest who stayed loyal to David and Solomon.

Some other priests had instead supported a rival claim to the throne.

Ezekiel forty four already explained that some Levites had served idols in the past.

Those unfaithful Levites lost the right to serve directly at the altar.

Zadok's own family line kept its full priestly honor because it stayed faithful.

✅ Zadok stayed loyal to David's line

❌ Other priests backed a rival king

💔 Some Levites had served idols before

📖 Faithfulness kept Zadok's family honored

## 🔒 A Thing Most Holy By The Border Of The Levites

"Most holy" marks the highest level of sacred ground in this whole plan.

Only priests could approach ground given this level of holiness.

Ordinary Israelites could reach the Levites' land, but not this inner section.

Holiness increases the closer the ground sits to the center.

Access narrows as that holiness increases.

🔒 Most holy means the highest sacred level

🚫 Only priests could approach this ground

📏 Holiness increases nearer the center

📖 Access narrows as holiness increases

## 🧑‍🤝‍🧑 The Levites Shall Have Five And Twenty Thousand

Levites were the broader tribe that assisted the priests in temple work.

They did not offer sacrifices themselves, but kept the temple running.

Their portion here matches the priests' portion in size.

Equal land size shows how essential their support role truly was.

🧑‍🤝‍🧑 Levites assisted priests in temple work

🚫 Levites did not offer sacrifices themselves

📏 Their land size equals the priests' own

📖 Support work mattered as much as size shows

## 🚫 Neither Exchange, Nor Alienate The Firstfruits Of The Land

"Alienate" here means giving land away permanently to someone else.

This sacred ground could never be sold, traded, or given away.

Leviticus twenty five already protected family land through the jubilee law.

This sacred strip receives even stronger protection than ordinary family land.

What belongs to God can never slip into private hands.

🚫 Alienate means giving land away for good

🔁 Leviticus twenty five protected family land too

🔒 This land gets even stronger protection

📖 What belongs to God stays God's alone

# Ezekiel 48:15-22
# 🏙️ The City, Its Suburbs, And The Prince
---
## 🏙️ A Profane Place For The City

"Profane" here does not mean sinful or wicked.

It simply means common ground, not set apart for sacred use.

This five thousand measure strip is for ordinary daily living.

Houses, streets, and markets belong in this common area.

The holy ground described earlier stays completely separate from this one.

🏙️ Profane here means common, not sinful

🏠 This area is for ordinary daily life

🛍️ Houses and markets belong in this zone

📖 Common ground still has a planned place

## 🎯 The City Shall Be In The Midst Thereof

The actual city sits inside this common strip of land.

That puts the city inside the larger holy complex.

The city itself measures four thousand five hundred units on each side.

That is smaller than the five thousand measure strip surrounding it.

Ordinary life and sacred life stay close but separate.

God planned exactly how near people live to where He dwells.

🎯 The city sits inside the common strip

🧩 It stays close to the sacred zone

🚧 Ordinary life and sacred life stay separate

📖 God planned how near people live to Him

## 🌳 The Suburbs Of The City

"Suburbs" in this verse does not mean neighborhoods outside a city.

That modern meaning is not what this old word pictures.

It means an open strip of grass and pasture around the city walls.

That open ring gave animals room to graze close to home.

🌳 Suburbs here means open pasture land

🐑 Animals grazed in this surrounding ring

🏘️ Modern suburbs mean something different today

📖 The original picture was simply open ground

## 🌾 For Food Unto Them That Serve The City

Farmland beside the city grows food for its own workers.

That food never had to travel far from home.

The whole plan was built to feed itself without outside help.

🌾 Nearby farmland feeds the city's workers

🚫 Food never had to travel far

🔁 The plan feeds itself on its own

📖 Self sufficiency was built into the design

## 🌍 Out Of All The Tribes Of Israel

The workers who farm and serve this city are not from one tribe.

People from every tribe share the job of keeping it running.

No single group owns this privilege.

No single group carries the whole burden either.

🌍 Workers come from every tribe, not one

🤝 The job is shared across the nation

⚖️ No tribe carries the burden alone

📖 Shared work pictures a shared nation

## ⬛ The Holy Oblation Foursquare

"Foursquare" means a perfect square, with all four sides exactly equal.

Perfect squares in scripture often picture completeness or wholeness.

Revelation twenty one later describes the New Jerusalem the same exact way.

A shape this precise was never left to chance in either vision.

⬛ Foursquare means a perfect, equal square

✨ Squares often picture completeness in scripture

🏙️ Revelation's New Jerusalem repeats this same shape

📖 Precise shape mirrors a precise plan

## 👑 The Residue Shall Be For The Prince

"The prince" is the ruling figure described throughout chapters forty through forty six.

He is not called a king in the full royal sense used earlier in Israel's history.

His own land flanks both sides of the holy center, never inside it.

Even the ruler stays outside the ground reserved only for God and the priests.

👑 The prince is this vision's coming ruler

🚫 He is never called a full king here

📍 His land flanks the center on both sides

📖 Even the ruler stays outside God's ground

## 🤝 Between The Border Of Judah And The Border Of Benjamin

Judah and Benjamin sit right next to each other at the very center.

These two tribes stayed together as one kingdom after Israel split apart.

First Kings twelve records the other ten tribes breaking away under Jeroboam.

Centuries later, this vision still places these two loyal tribes side by side.

🤝 Judah and Benjamin sit at the center

💔 Ten tribes broke away in First Kings

🛡️ Judah and Benjamin had stayed loyal together

📖 Old loyalty still shapes this final map

# Ezekiel 48:23-29
# 🗺️ Five More Tribes And The Final Border
---
## 👦 Benjamin Shall Have A Portion

Benjamin was Jacob's youngest son, born to Rachel near the end of her life.

Israel's first king, Saul, came from the tribe of Benjamin.

Benjamin's strip sits right below the prince's portion, closest to the center.

This list now moves on to the five tribes south of that center.

👦 Benjamin was Jacob's youngest son

👑 Israel's first king, Saul, came from Benjamin

📍 Benjamin's strip sits closest to the center

📖 Five more tribes now fill out the south

## 🔢 Simeon Shall Have A Portion

These four tribes complete the southern half of the land.

Counting every strip in this chapter adds up to exactly twelve.

Levi is missing from the count since Levites already received a portion earlier.

Joseph is counted twice, once as Manasseh and once as Ephraim.

The math still lands on the same twelve tribes promised long ago.

🔢 Four more tribes complete the south

❓ Levi is missing from this land count

➕ Joseph counts twice, as two sons

📖 The total still equals twelve tribes

## 🏜️ From Tamar

Tamar here is a place name, not the woman named Tamar elsewhere in the Bible.

It marks a desert town near the southern end of the Dead Sea.

This border description starts counting from that exact location.

🏜️ Tamar here is a place, not a person

🗺️ It sits near the southern Dead Sea

📍 The southern border starts counting here

📖 Same name, completely different meaning

## 💧 Unto The Waters Of Strife In Kadesh

This same place already appeared in chapter forty seven's border description.

"Waters of strife" names the old event where Israel quarreled with Moses over water.

That border tour started at the north in chapter forty seven.

It now finishes its circuit here, at the south.

💧 This place already appeared in chapter forty seven

😠 It recalls Israel's old quarrel with Moses

🔁 The border tour now completes its circuit

📖 Old failure still marks the promised edge

## 🌊 To The River Toward The Great Sea

This closing border point runs toward the Mediterranean Sea in the far southwest.

A border brook, likely along Egypt's edge, marked this same corner in older descriptions.

The land's full outline is now complete, north to south, east to west.

🌊 The great sea means the Mediterranean

🏞️ A border brook marked this southern corner

🗺️ The land's outline is now fully traced

📖 Every edge of the promise is accounted for

## 🎲 Ye Shall Divide By Lot

"By lot" means the boundaries were settled by a method outside human control.

Chapter forty seven already used this same method to include foreigners in the land.

No tribe could argue its way into a better plot of ground.

God's own decision, not favoritism, settled every border in this chapter.

🎲 By lot means a method beyond human control

🔁 Chapter forty seven used this same method

🚫 No tribe argued its way into more land

📖 God's decision settled every border here

## ✍️ Saith The Lord GOD

This exact phrase closes many major sections throughout the whole book of Ezekiel.

It works like a seal stamped on an official document.

This entire land division carries God's own signature.

Nothing about this plan was left to human guesswork.

✍️ This phrase seals major sections in Ezekiel

📜 It works like a stamp on a document

🔏 This whole division carries God's own signature

📖 Nothing here was left to guesswork

# Ezekiel 48:30-35
# 🚪 Twelve Gates And The City's New Name
---
## 🧱 The Goings Out Of The City

"Goings out" here means the outer boundary lines framing the city itself.

Each of the four sides measures four thousand five hundred units long.

This is the city's own edge, separate from the farmland described earlier.

A perfectly even square frames the city on every side.

🧱 Goings out means the city's outer edge

📏 Each side measures the same length

⬛ The city forms a perfectly even square

📖 Symmetry marks this city on every side

## 🚪 One Gate Of Levi

This phrase names one of three gates on the city's north side.

The other two gates there belong to Reuben and Judah.

Levi receives a gate here despite having no ordinary land strip earlier.

The city belongs to the whole covenant family, including the tribe that only serves.

🚪 This gate marks the city's north side

👥 Reuben and Judah share that same side

❌ Levi had no land strip earlier

📖 A gate honors Levi without needing land

## 🚪 One Gate Of Joseph

This phrase names one of three gates on the city's east side.

The other two gates there belong to Benjamin and Dan.

Joseph appears here as one single name, not split into Ephraim and Manasseh.

The earlier land division needed two separate strips for Joseph's two sons.

🚪 This gate marks the city's east side

👥 Benjamin and Dan share that same side

➗ Land needed two strips for Joseph's sons

📖 A gate only needs one family name

## 🏙️ With Their Three Gates

This phrase describes the west side gates, named for Gad, Asher, and Naphtali.

The south side carries its own three gates, named for Simeon, Issachar, and Zebulun.

Together all twelve tribes each receive their own named entrance into the city.

Revelation twenty one later describes the New Jerusalem with twelve gates named the same way.

This ancient vision of Ezekiel's city becomes a blueprint for that final vision.

🧭 West and south complete the last six gates

🔢 All twelve tribes get a named gate

🏙️ Revelation's New Jerusalem repeats this same plan

📖 Ezekiel's city becomes a blueprint for Revelation

## 📐 Round About Eighteen Thousand Measures

Adding all four equal sides together gives this total distance around the city.

The exact size this represents in modern terms is genuinely debated among scholars.

What stays clear either way is the perfect, deliberate symmetry of the design.

Nothing about this city's shape was left uneven or accidental.

📐 This total comes from four equal sides

❓ The exact modern size is debated

⬛ The design stays perfectly symmetrical either way

📖 Nothing here was left uneven or accidental

## 🕊️ The LORD Is There

This final line gives the city a brand new name.

Many know this name in Hebrew as Jehovah Shammah.

Chapters eight through eleven sit near the start of this book.

They showed God's own glory leaving the temple because of sin.

This closing verse promises the exact opposite ending.

God's presence will never leave this city again.

The whole book ends on that promise, not a measurement.

🕊️ Its new name is the LORD is there

💔 God's glory once left the temple in sin

🔁 This verse promises the opposite outcome

📖 Ezekiel ends on presence, not measurement
`.trim();

export const EZEKIEL_FORTY_EIGHT_PERSONAL_SECTIONS = parseEzekielFortyEightRawNotes(EZEKIEL_FORTY_EIGHT_RAW_NOTES);
