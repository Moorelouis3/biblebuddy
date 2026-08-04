export type NumbersFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersFourRawNotes(rawText: string): NumbersFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 4:${startVerse}` : `Numbers 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Numbers 4 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_FOUR_RAW_NOTES = `# Numbers 4:1-3
# 🧮 Counting Kohath's Working Men
---
## 🧮 Take The Sum Of The Sons Of Kohath

This is not the same census as Numbers three.

That count covered every Levite male, down to one month old.

This new count narrows to one family, the Kohathites.

It also narrows to one question.

Who is old enough and strong enough to work.

Numbers three counted a tribe.

Numbers four counts a workforce.

🧮 A brand new census, separate from Numbers three

👶 Numbers three counted Levites one month old

💪 This count asks who can actually work

📖 A tribe was counted before, now a workforce

## 🎂 From Thirty Years Old And Upward Even Until Fifty Years Old

Thirty to fifty was the working age window for Levite labor.

Numbers one counted men twenty and up, for war.

Numbers three counted Levite males one month and up, for dedication.

This chapter uses a narrower band than either of those counts.

Old enough to carry real weight.

Young enough to still carry it well.

Three counts, three different purposes, in the very same book.

🎂 Thirty to fifty was the working age range

⚔️ Numbers one counted men twenty and older

👶 Numbers three counted Levites one month and older

📖 Three censuses, three very different purposes

## 🏋️ To Do The Work In The Tabernacle Of The Congregation

"Host" is the same Hebrew word used for Israel's army.

Ancient Hebrew had no separate word for organized labor.

The term for marching soldiers also covered Levites marching with sacred cargo.

This work counted as disciplined service, not a casual errand.

Every Kohathite man reported for duty the way a soldier would.

⚔️ Host is the same word for army

🪖 Hebrew had one word for both jobs

📋 This work was service, not a casual errand

📖 Kohath reported for duty like a soldier

## 📜 The Lord Spake Unto Moses And Unto Aaron

This same line opens a new assignment three times in this chapter.

It appears here in verse one, for Kohath.

It appears again in verse seventeen, still about Kohath.

A close cousin of it opens Gershon's assignment in verse twenty one.

That version speaks to Moses alone, not to Aaron.

Each repeat marks a fresh command from God.

Watch for this line to mark where the chapter's focus shifts.

📜 This refrain opens a new command three times

🔁 It returns in verse seventeen, still for Kohath

👤 Verse twenty one speaks to Moses alone

📖 Watch for it to mark a new focus

# Numbers 4:4-6
# 📦 Wrapping The Ark For The Road
---
## ⛺ About The Most Holy Things

"Most holy things" translates the same Hebrew phrase behind Holy of Holies.

That phrase names the single most sacred category in the whole tabernacle.

Kohath's family is assigned to that category, not to ordinary furniture.

That is why the rest of this section reads like a strict procedure.

Every step exists to protect something considered fully holy.

⛺ Most holy things echoes Holy of Holies

⚠️ The most sacred category in the tabernacle

📋 Kohath's job is strict procedure, not simple packing

📖 Every step protects something fully holy

## 🚶 When The Camp Setteth Forward, Aaron Shall Come

This whole covering procedure happens at one moment only.

That moment is right before Israel packs up and moves.

It is not a daily ritual repeated every morning.

Notice who does the wrapping, Aaron and his sons.

The Kohathites who will carry these objects do not touch them yet.

Priests wrap the objects.

Levites carry what the priests have already wrapped.

🚶 This only happens when camp moves

👨‍👦 Aaron and his sons do the wrapping

🙅 Kohath does not touch anything yet

📖 Priests wrap, then Levites carry

## 🧵 Take Down The Covering Vail

"The vail" is the same curtain that hangs inside the tabernacle.

It normally separates the Holy Place from the Most Holy Place.

That is where the ark itself sits, described back in Exodus twenty six.

For travel, that curtain comes down off its regular hooks.

It becomes the ark's very first layer of covering.

A wall becomes a wrapping.

🧵 The vail is the curtain between two rooms

🛑 It usually hides the ark from view

🔄 A wall becomes the ark's first wrapping

📖 Exodus twenty six describes its normal place

## 🦫 The Covering Of Badgers' Skins

Scholars still debate exactly what animal this Hebrew word names.

Some think a dolphin, others a dugong, others simply tough weatherproof leather.

The text never settles on one exact animal.

What is clear is the purpose, not the species.

This layer had to survive sun, sand, and blowing dust on the road.

🦫 The exact animal named here is still debated

🐬 A dolphin, dugong, or tough leather

🏜️ Its job was protection from sun and sand

📖 The purpose is clear either way

## 💙 A Cloth Wholly Of Blue

Blue dye was expensive and hard to produce in the ancient world.

It was tied to royalty, and to heaven itself.

Priests wore this same blue in their own garments.

Here it becomes the ark's outermost, visible layer.

Every other holy object hides its blue cloth under something else.

The ark alone wears its blue on the outside.

💙 Blue was an expensive dye tied to royalty

👔 Priests wore this same blue themselves

👀 The ark shows its blue outside

📖 Even the wrapping marked the ark as unique

# Numbers 4:7-10
# 🍞 Packing The Table And The Lamp
---
## 🍞 Upon The Table Of Shewbread They Shall Spread A Cloth Of Blue

"Shewbread" means bread that stayed constantly on display before the Lord.

The table held twelve loaves, one for each tribe of Israel.

Priests alone ate this bread, and only inside the tabernacle courts.

Like the ark, the table gets blue cloth first.

Unlike the ark, the table keeps its bread sitting on top while it travels.

🍞 Shewbread means bread kept constantly on display

🔟 Twelve loaves stood for the twelve tribes

👔 Only priests were allowed to eat it

📖 The bread stayed on the table during travel

## 🥣 The Dishes, And The Spoons, And The Bowls, And Covers

These were the table's own serving pieces, not random extras.

Dishes held the bread itself.

Spoons likely held incense set beside the loaves.

Bowls and covers were used for the drink offering poured out with the meal.

All of it traveled wrapped together as one single unit.

🥣 Dishes held the bread loaves

🍷 Spoons likely carried incense

🫗 Bowls and covers served the drink offering

📖 Everything traveled together as one unit

## ⏸️ The Continual Bread Shall Be Thereon

"Continual" means without a break, never removed.

The loaves were not boxed up separately for the road the way movers pack dishes.

Bread stayed exactly where it always sat, right on the table.

Worship did not pause just because the camp was moving.

⏸️ Continual means without a break

🍞 Bread stayed on the table during travel

🚶 Worship did not stop while Israel moved

📖 God's provision kept going, even on the road

## 🔴 A Cloth Of Scarlet

The table receives a second colored cloth the ark never got.

Scarlet, a deep red dye, sits between the blue cloth and the outer covering.

The text never explains why scarlet belongs here specifically.

What is clear is that each object gets its own particular sequence of layers.

No single wrapping pattern fit every piece of furniture.

🔴 Scarlet is a second, unique layer

🎨 Each object gets its own layer sequence

🔑 No single pattern covered every piece

📖 The text does not explain scarlet's meaning here

## 🕎 The Candlestick Of The Light, And His Lamps, And His Tongs, And His Snuffdishes

The candlestick is the golden lampstand, often called the menorah.

It was the only source of light inside the tabernacle's Holy Place.

"Tongs" trimmed and adjusted the burning wicks.

"Snuffdishes" caught the burnt wick trimmings before they hit the floor.

A tent lit only by open flame needed careful, constant tending.

🕎 The candlestick is the golden menorah

💡 It was the Holy Place's only light source

🔥 Tongs trimmed wicks, snuffdishes caught the ash

📖 Open flame indoors needed constant careful tending

# Numbers 4:11-14
# 🔥 Two Altars Get Wrapped Too
---
## 🔥 Upon The Golden Altar They Shall Spread A Cloth Of Blue

The golden altar is the altar of incense, small and gold covered.

It stood just outside the veil, inside the Holy Place itself.

Incense burned here every single morning and evening.

This altar was still in daily use right up to the moment of travel.

Do not confuse it with the much larger altar named two verses later.

🔥 The golden altar burned incense, not sacrifices

⏰ It was used twice daily, morning and evening

🔀 A different altar appears two verses later

📖 Worship continued right up to travel

## 🧰 The Instruments Of Ministry, Wherewith They Minister In The Sanctuary

This phrase covers tools used often, but never named one by one.

They were the priestly items that did not fit under the ark, table, or lamp.

The text does not list every small tool by name.

It groups them into one bundle instead.

That bundle traveled wrapped as a single package.

🧰 A catch all for tools not named elsewhere

📦 Grouped and wrapped as one single bundle

🔑 Shorthand for everything else in regular use

📖 Not every holy object gets its own verse

## 🪔 They Shall Take Away The Ashes From The Altar

The scene shifts location without any announcement.

Every object named so far sat inside the tent itself.

This altar is the large bronze altar, standing outside in the open courtyard.

Animal sacrifices were actually burned here.

Removing its ashes was already a normal task, done every single morning.

This was not a special step invented just for travel days.

🪔 The scene shifts to the bronze altar outside

🐑 Animal sacrifices were burned here, unlike the others

🔑 Not a new step, just an old one

📖 Ash removal was already a normal daily task

## 🟣 Spread A Purple Cloth Thereon

Purple appears nowhere else in this whole procedure.

Purple dye cost even more than blue, made from a rare sea snail.

It was normally reserved for royal robes.

This altar was scarred by fire and constant sacrifice.

Even so, it still gets the costliest covering of all.

The most worn object in the system was still treated as royal.

🟣 Purple appears only here, nowhere else

🐚 Purple dye came from a rare sea snail

👑 It was normally kept for royal robes

📖 The most worn object still counted as royal

## 🍴 The Censers, The Fleshhooks, And The Shovels, And The Basons

These are tools for handling active fire and fresh sacrifice.

Censers carried hot coals.

Fleshhooks were large forks, used to move meat on the altar.

Shovels cleared away ashes.

Basons caught blood for the sprinkling rituals described elsewhere in the law.

These were the grittiest, most hands on tools in the whole system.

🍴 Censers carried hot coals

🔱 Fleshhooks moved meat on the altar

🧹 Shovels cleared ashes, basons caught blood

📖 The grittiest tools in the whole system

# Numbers 4:15-16
# 🎒 Kohath May Carry, Never Look
---
## 🚫 They Shall Not Touch Any Holy Thing, Lest They Die

This warning is the reason the whole wrapping procedure exists.

By the time Kohath's men arrive, Aaron and his sons have already covered everything.

Kohath lifts bundles and poles, never the holy objects underneath.

The danger was treated as real and physical, not a symbolic threat.

Careless contact with something fully holy was considered genuinely lethal.

🚫 Everything is already covered before Kohath arrives

🎒 Kohath carries bundles, never the objects themselves

⚡ The danger was treated as real, not symbolic

📖 The wrapping procedure exists to prevent this

## 🎒 These Things Are The Burden Of The Sons Of Kohath

"Burden" translates a Hebrew word that means two things at once.

It means a physical load carried on the shoulders.

It also means a duty or a responsibility assigned to someone.

That double meaning runs through this entire chapter.

Every family's burden is a weight on the back and a job from God.

🎒 Burden means a physical load

📋 Burden also means an assigned duty

🔁 Both meanings run through the whole chapter

📖 One word carries a weight and a calling

## 🙏 The Office Of Eleazar The Son Of Aaron The Priest

Eleazar was already named back in Numbers three as Kohath's overseer.

Here his own specific job finally gets listed in full.

His responsibilities are different from what the Kohathites physically carry.

Eleazar manages the tabernacle's ongoing supplies.

Kohath transports its furniture.

🙏 Eleazar oversees Kohath, first named in Numbers three

📋 His job differs from what Kohath carries

🔑 Eleazar manages supplies, Kohath moves furniture

📖 Two roles, split between family and priest

## 🕯️ The Oil For The Light, And The Sweet Incense, And The Daily Meat Offering, And The Anointing Oil

Four supplies fall under Eleazar's personal watch.

Oil kept the candlestick's lamps burning.

Incense fed the golden altar every morning and evening.

Flour and oil made up the daily grain offering.

Anointing oil consecrated priests and holy objects alike.

These four are consumables, restocked constantly.

Furniture only moves when the whole camp moves.

🕯️ Four supplies fall under Eleazar's watch

🔥 Lamp oil, incense, and grain offering are three

💧 Anointing oil consecrated priests and objects

📖 Supplies get restocked, furniture only moves sometimes

## 🏛️ The Oversight Of All The Tabernacle, And Of All That Therein Is

Beyond his four named supplies, Eleazar holds one more responsibility.

He answers for the entire tent and everything inside it.

Think of a moving crew and the one person holding the master list.

The crew carries boxes.

That one person knows exactly where everything belongs.

🏛️ Eleazar's oversight covers the whole tabernacle

📋 Beyond four supplies, a general watch over everything

🚚 Like movers and the person with the list

📖 Someone had to know where everything belonged

# Numbers 4:17-20
# ⚠️ A Warning So Kohath Can Live
---
## 📜 The Lord Spake Unto Moses And Unto Aaron, Saying

This exact refrain returns a third time in the chapter.

It marks another fresh command, right after Kohath's instructions just finished.

The timing feels urgent, almost like a footnote squeezed in immediately.

It reads as if nothing about this danger could be left to assumption.

📜 The same refrain returns a third time here

🗒️ It functions like an urgent footnote

⏱️ Placed right after Kohath's instructions finish

📖 Nothing about this danger was left to chance

## ⛔ Cut Ye Not Off The Tribe Of The Families Of The Kohathites

This is a blunt warning, careless handling could wipe out an entire clan.

God is not looking for a reason to reduce Israel's workforce.

The opposite is true.

The covering system exists precisely so this outcome never happens.

This verse states the stakes plainly, in case anyone had missed them.

⛔ Carelessness here could wipe out a whole clan

🎯 The covering system exists to prevent this

🙅 God was not looking to reduce the workforce

📖 The stakes are stated plainly, on purpose

## ❤️ That They May Live, And Not Die, When They Approach Unto The Most Holy Things

This line reframes everything written before it.

The wrapping procedure is not ceremonial fussiness over cloth and color.

It is a life saving system.

It exists so that Kohath's family can do sacred work and survive doing it.

❤️ This line reframes the whole procedure

🛡️ The wrapping was never just about cloth

✅ It exists so Kohath's family could survive

📖 Safety was the purpose behind every layer

## 👉 Aaron And His Sons Shall Go In, And Appoint Every One To His Service And To His Burden

No Kohathite man picks whichever object looks interesting to carry.

Aaron and his sons personally assign each man his exact task.

That assignment happens before anyone even approaches a covered object.

Order comes before access, every single time.

👉 Each man's task is personally assigned

📋 Assignment happens before anyone approaches the objects

🚫 No one chose their own task freely

📖 Order came before access, every time

## 👁️ They Shall Not Go In To See When The Holy Things Are Covered, Lest They Die

This pins down the exact choreography of the whole process.

Kohath's men are not even present while Aaron and his sons wrap the objects.

They are summoned only after everything is already fully covered.

Even watching the uncovered ark was treated as dangerous as touching it.

👁️ Kohath's men are absent during the wrapping itself

🚪 They are summoned only once wrapping is done

⚠️ Even watching the uncovered ark was dangerous

📖 Distance from danger was built into the process

# Numbers 4:21-23
# 🌿 Gershon's Count Begins
---
## 📜 Take Also The Sum Of The Sons Of Gershon

The word "also" signals a pattern about to repeat.

The very same structure used for Kohath now applies to Levi's second family.

Kohath's instructions filled twenty verses because of real danger involved.

Gershon's section will move much faster than that.

📜 Also signals the same structure repeating

🔁 This is Levi's second family, after Kohath

⏩ Gershon's section moves much faster

📖 Less danger meant far less procedural detail

## 👨‍👩‍👦 Throughout The Houses Of Their Fathers, By Their Families

This is the same organizing language used for every census in this book.

Men were counted by household and extended family, not as raw numbers.

That method kept each man tied to his own relatives.

No one became just an anonymous headcount.

👨‍👩‍👦 The same family based counting method returns

🔢 Men were counted by household, not alone

🔁 This method runs through every census so far

📖 Family kept each man from being a number

## 🎂 From Thirty Years Old And Upward Until Fifty Years Old

This is the identical working age range already used for Kohath.

All three Levite families share this same window.

Old enough for real physical demands.

Young enough that the work would not run forever.

🎂 The same thirty to fifty range as Kohath

🔁 All three Levite families share this window

💪 Old enough for real physical work

📖 A shared standard across every Levite family

# Numbers 4:24-28
# 🏕️ Gershon Carries The Tent Itself
---
## 🎒 To Serve, And For Burdens

This is the same two word summary already used for Kohath's job.

Service and burden name the work in both cases.

The actual content is completely different between the two families.

Kohath carried the sanctuary's most sacred furniture.

Gershon's whole assignment is fabric, everything soft in the tabernacle's structure.

🎒 Service and burden repeats Kohath's summary

🧵 But the actual content is totally different

🪑 Kohath carried furniture, Gershon carries fabric

📖 Same words, a very different job

## 🏕️ The Curtains Of The Tabernacle, And The Tabernacle Of The Congregation, His Covering

This describes the tent's own layered structure.

Inner linen curtains formed the walls people would see from inside.

Outer layers, including a goat hair covering, were built over those inner curtains.

Gershon's family carried the entire building's outer shell.

🏕️ Inner linen curtains formed the visible walls

🐐 Outer layers covered those inner curtains

🔑 Gershon carried the whole building's shell

📖 Exodus twenty six describes the full design

## 🦫 The Covering Of The Badgers' Skins That Is Above Upon It

This is the same weatherproof material used earlier on the ark.

Here it forms the tabernacle's own topmost, outdoor layer.

That repeated choice is not a coincidence.

This material was specifically valued for handling real weather.

🦫 The same weatherproof material used on the ark

☔ Here it protects the whole tent's roof

🔁 Used again wherever weather protection was needed

📖 One material, trusted for every outdoor layer

## 🚪 The Hanging For The Door Of The Tabernacle, And The Hanging For The Door Of The Gate Of The Court

Two separate doorways get two separate curtains here.

It is easy to blur them together on a first read.

The tabernacle's own entrance, into the tent itself, has one hanging.

The courtyard's outer gate, entrance to the whole compound, has a different one.

Gershon's family carried both.

🚪 Two doorways, easy to blur into one

🏕️ One hanging covers the tent's own entrance

🚧 A separate hanging covers the outer gate

📖 Gershon carried both curtains, not just one

## 🏛️ The Hangings Of The Court, And Their Cords, And All The Instruments Of Their Service

Beyond the doorways, the courtyard's whole perimeter was made of hanging linen.

It was held up with cords and pegs, not wood or stone.

Picture a fence built entirely out of fabric.

All of it, plus the tools to set it up, belonged to Gershon.

🏛️ The courtyard's whole perimeter was hanging linen

🪢 Held up with cords and pegs, not stone

🧵 Picture a fence made entirely of fabric

📖 Fabric, cords, and tools all traveled together

## 👉 At The Appointment Of Aaron And His Sons Shall Be All The Service

The same personal assignment system used for Kohath applies here too.

Aaron and his sons decide who carries what.

Notice what is missing compared to Kohath's section.

There is no warning about death, no ban on looking or touching.

Fabric carried openly on the shoulder is not the same danger as an uncovered ark.

👉 Aaron and his sons assign every task

🚫 No death warning appears in this section

🧵 Fabric on the shoulder was a lesser risk

📖 Danger level shaped how strict each rule was

## 🤝 Under The Hand Of Ithamar The Son Of Aaron The Priest

A new name enters here, Ithamar.

He is Aaron's other surviving son, alongside Eleazar.

The two brothers split oversight of the Levites between them.

Eleazar watches over Kohath's high danger, sacred furniture work.

Ithamar watches over Gershon, and soon Merari too.

🤝 Ithamar, Aaron's other surviving son, appears here

🗂️ The two brothers split oversight of the Levites

🙏 Eleazar covers Kohath, the most dangerous job

📖 Ithamar covers Gershon and, next, Merari

# Numbers 4:29-33
# 🪵 Merari Carries The Frame
---
## 🌳 As For The Sons Of Merari, Thou Shalt Number Them After Their Families

This is the third and final Levite family covered in the chapter.

By now the pattern is fully set, age range, family count, assigned duty.

The text does not need to re explain any of it here.

This section moves the fastest of the three.

🌳 The third and final Levite family here

🔁 Same pattern, age range, count, and duty

⏩ The fastest section of the three

📖 A familiar pattern needs fewer words

## 🪵 The Boards Of The Tabernacle, And The Bars Thereof, And The Pillars Thereof, And Sockets Thereof

This assignment was already previewed back in Numbers three.

Merari's family carried the tabernacle's literal skeleton.

Wooden wall boards, the bars connecting them, the pillars, and the sockets they stood in.

Gershon carried the building's skin.

Merari carried its bones.

🪵 Merari carried the wooden frame and boards

🦴 Gershon carried the skin, Merari the bones

🔑 Every piece of the skeleton had a name

📖 This assignment was already listed in Numbers three

## 🏛️ The Pillars Of The Court Round About, And Their Sockets, And Their Pins, And Their Cords

The courtyard's own structural supports belonged to Merari too.

These are the posts holding up Gershon's hanging linen walls.

Pins and cords anchored the whole structure to the ground.

Heavy, unglamorous, and completely essential.

🏛️ The courtyard's posts belonged to Merari

🔗 These held up Gershon's hanging walls

📌 Pins and cords anchored everything down

📖 Unglamorous work that held the whole camp up

## 📝 By Name Ye Shall Reckon The Instruments Of The Charge Of Their Burden

This detail is unique to Merari's section.

Their equipment was tracked by name, piece by piece.

Other families' gear was simply grouped by category.

A missing socket or pillar was far harder to replace on the road than a lost cloth.

An itemized list protected against exactly that kind of loss.

📝 Merari's gear was tracked by individual name

📦 Other families' gear was grouped by category

🔧 A lost pillar was hard to replace

📖 An itemized list guarded against real loss

## 🤝 This Is The Service Of The Families Of The Sons Of Merari

This confirms Ithamar's oversight extends to both non Kohath families.

Gershon and now Merari both answer to him.

Eleazar's attention stays fixed on Kohath alone.

One brother covers the highest risk job.

The other brother covers the remaining two combined.

🤝 Ithamar oversees both Gershon and Merari

🔑 Eleazar's focus stays fixed on Kohath alone

📊 One brother, one high risk job

📖 A clean, deliberate division of oversight

# Numbers 4:34-37
# 🔢 Kohath's Total Is Two Thousand Seven Hundred And Fifty
---
## 👥 Moses And Aaron And The Chief Of The Congregation Numbered

This count was not done by Moses and Aaron alone.

Tribal chiefs personally took part in the counting too.

These are the same leaders named individually back in Numbers one.

Counting thousands of working age men across three families needed more than two people.

👥 Tribal chiefs helped with this count too

🔢 A large task needed more than two counters

🔑 Leadership shared the load of counting

📖 These leaders were already named in Numbers one

## ✅ All That Might Do Service In The Tabernacle Of The Congregation

This phrase is the key to reading the numbers correctly.

It counts only deployable workers, not the whole Kohathite population.

Numbers three already counted every male Kohathite from one month old.

This new number is a much smaller slice of that larger total.

✅ This counts only deployable workers

👶 Numbers three counted Kohathites from one month old

📉 This total is a smaller working slice

📖 Two different numbers answer two different questions

## 🔢 Two Thousand Seven Hundred And Fifty

This is the working age total for Kohath's family alone.

Numbers three already counted eight thousand six hundred Kohathites in all.

That means about a third of Kohathites actually fell in the working range.

Two out of every three Kohathites were too young, too old, or simply not counted here.

🔢 Two thousand seven hundred fifty working age men

📊 About a third of all Kohathites counted here

🧮 A real, checkable slice of the larger clan

📖 Most Kohathites were outside the working window

## ✅ According To The Commandment Of The Lord By The Hand Of Moses

This familiar line closes out Kohath's numbers.

It is nearly the same formula that has ended almost every count so far.

Even a headcount was treated as an act of obedience.

Watch for this same line to close Gershon's and Merari's numbers too.

✅ The same closing formula ends nearly every count

🔁 Watch for it closing Gershon's and Merari's totals

🔑 Numbers were never just paperwork here

📖 Even a headcount counted as obedience

# Numbers 4:38-41
# 🔢 Gershon's Total Is Two Thousand Six Hundred And Thirty
---
## 📜 Those That Were Numbered Of The Sons Of Gershon, Throughout Their Families

Same method, second family.

The census formula is fully familiar by this point in the chapter.

This section moves quickly toward the number itself.

📜 Same counting method, now for Gershon

⏩ Moves quickly since the method is familiar

🔁 The second of three working age totals

📖 Familiar patterns need fewer words to explain

## 🔢 Two Thousand And Six Hundred And Thirty

This is Gershon's working age total.

Numbers three counted seven thousand five hundred Gershonites in all.

That puts Gershon's working fraction slightly higher than Kohath's.

About a third of Gershonites fell inside this working range.

🔢 Two thousand six hundred thirty working age men

📊 Compared to seven thousand five hundred total Gershonites

🧮 A fraction slightly higher than Kohath's

📖 Each family's numbers tell its own story

## ✅ Whom Moses And Aaron Did Number According To The Commandment Of The Lord

This is the same closing refrain used for Kohath's count.

It is the second of three identical bookends in this chapter.

One more is still coming, at the end of Merari's numbers.

✅ The same closing refrain returns here

🔁 The second of three matching bookends

🧮 Every total in this chapter closes alike

📖 One more bookend still remains

# Numbers 4:42-45
# 🔢 Merari's Total Is Three Thousand And Two Hundred
---
## 📜 Those That Were Numbered Of The Families Of The Sons Of Merari

This is the third and final working age count in the chapter.

It follows the exact same pattern as Kohath and Gershon before it.

One number remains before the chapter's grand total.

📜 The third and final working age census here

🔁 Follows the same pattern as before

🔢 One number left before the grand total

📖 Three families, one consistent method

## 🔢 Three Thousand And Two Hundred

This is Merari's working age total, the largest of the three families.

Numbers three counted six thousand two hundred Merarites in all.

That puts Merari's working fraction above half, higher than Kohath's or Gershon's.

Merari's job carrying heavy boards and pillars likely called for the most raw strength.

🔢 Three thousand two hundred working age men

📊 Over half of all Merarites fell here

💪 The highest working fraction of the three families

📖 A heavier job may explain the higher fraction

## ✅ Whom Moses And Aaron Numbered According To The Word Of The Lord By The Hand Of Moses

This is the third and final appearance of this closing refrain.

One appearance closes each family, Kohath, Gershon, and now Merari.

Every single count in this chapter ends on the same note, obedience.

✅ The third and final closing refrain appears here

🔁 One appearance for each of the three families

🔑 The pattern is now complete

📖 Every count in this chapter ends on obedience

# Numbers 4:46-49
# 🏁 Every Levite Totals Eight Thousand Five Hundred And Fourscore
---
## 👥 Whom Moses And Aaron And The Chief Of Israel Numbered

This section combines all three families into one final figure.

The same leadership team from verse thirty four appears once more.

Their work here closes out the whole counting operation.

👥 All three families combine into one final total

🔁 The same leaders from verse thirty four return

🏁 Their work closes the whole operation

📖 One number to summarize the whole chapter

## 🛠️ The Service Of The Ministry, And The Service Of The Burden

This is a tidy two word summary of the entire chapter.

"Ministry" names the close, hands on work nearest the priests.

That was Kohath's specialty.

"Burden" names the carrying and transport work.

That was Gershon and Merari's specialty.

Two categories of labor, covering all three families between them.

🛠️ Ministry and burden summarize the whole chapter

🙏 Ministry was Kohath's close, hands on work

🚚 Burden was Gershon and Merari's carrying work

📖 Two categories covered every family's job

## 🔢 Eight Thousand And Five Hundred And Fourscore

"Fourscore" is an old way of saying eighty.

The grand total reads eight thousand five hundred eighty.

That is Kohath's total, Gershon's total, and Merari's total, added together.

The math checks out exactly.

Numbers three counted twenty two thousand Levites in all.

That means well under half of all Levites fell inside this chapter's working age window.

🔢 Fourscore means eighty, and the total is exact

🧮 The three family totals add up perfectly

📊 Well under half of all Levites worked

📖 A precise total, checkable line by line

## ✅ According To The Commandment Of The Lord They Were Numbered By The Hand Of Moses

This final line ties the whole chapter together.

The same obedience refrain has now closed four straight chapters in this book.

It adds one last callback to service and burden from two verses earlier.

Every single Levite, in every single family, was counted, assigned, and sent to work.

All of it happened in exact obedience to what God commanded.

✅ The same refrain has now closed four chapters

🔁 One last callback to service and burden

👥 Every Levite was counted and assigned

📖 Obedience closes the chapter, as it opened
`.trim();

export const NUMBERS_FOUR_PERSONAL_SECTIONS = parseNumbersFourRawNotes(NUMBERS_FOUR_RAW_NOTES);
