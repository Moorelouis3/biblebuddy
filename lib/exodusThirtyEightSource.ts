export type ExodusThirtyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirtyEightRawNotes(rawText: string): ExodusThirtyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirtyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+38:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 38 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+38:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+38:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 38 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 38,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 38:${startVerse}` : `Exodus 38:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 38 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTY_EIGHT_RAW_NOTES = `# Exodus 38:1-7
# 🔥 Building The Altar Of Burnt Offering
---
## 🌵 He Made The Altar Of Burnt Offering Of Shittim Wood

"Shittim" wood is acacia, a hard timber common in the Sinai desert.

Builders chose it because it resists rot and insects far better than most trees.

This same wood already shaped the ark, the table, and the boards of the walls.

Now, chapters after God first gave the instructions, this altar finally gets built.

One reliable material carried nearly every wooden piece of the whole structure.

🌵 Shittim wood means acacia

🐛 Acacia resists rot and insects

🪵 The same wood built other tabernacle pieces

📖 Chapter twenty seven ordered this altar first

## 📏 Five Cubits Was The Length Thereof

A "cubit" measured the distance from an elbow to the fingertips.

That comes out to about eighteen inches in modern terms.

Five cubits by five cubits works out to about seven feet across.

Three cubits tall comes to about four and a half feet high.

A modest sized altar like this still carried the weight of a nation's worship.

📏 A cubit equals about eighteen inches

📐 The base measured about seven feet wide

📊 The altar stood about four feet tall

➡️ A modest altar carried Israel's worship

## ◻️ It Was Foursquare

"Foursquare" means the base formed an equal sided square, not a rectangle.

Every side measured exactly the same five cubits.

A square base gave the altar even weight on all four sides.

That evenness mattered for something carried constantly through the wilderness.

Every measurement in the tabernacle followed a precise plan, not a rough guess.

◻️ Foursquare means an equal sided square

📏 Every side measured exactly five cubits

⚖️ A square base kept weight even

📖 Precision marked every part of the plan

## 🔺 He Made The Horns Thereof On The Four Corners Of It

"Horns" were pointed pieces carved from the same wood, one rising from each top corner.

Blood from every sacrifice was applied directly to these horns.

Later in the Bible, a person in danger could run and grab an altar's horns.

Holding onto the horns was a way of pleading for mercy and protection.

This small detail on a construction list carried real spiritual weight.

🔺 Horns rose from each top corner

🩸 Sacrificial blood touched these horns directly

🙏 People later grabbed the horns for mercy

📖 A construction detail carried spiritual weight

## ✨ He Overlaid It With Brass

Gold covered the objects kept inside the tabernacle, like the ark and the table.

Brass covered anything standing outside in the open court.

This altar stood outside, so it got brass instead of gold.

Brass could also handle the heat of a fire that burned constantly.

The metal on an object quietly marked how close it stood to God's presence.

✨ Gold covered objects kept inside

🔥 Brass covered objects standing outside

🌡️ Brass could handle constant heat

📖 Metal choice marked closeness to God

## 🍲 The Pots, And The Shovels, And The Basons, And The Fleshhooks, And The Firepans

This altar came with a complete set of brass tools for daily use.

"Pots" caught the ashes that piled up beneath the fire.

"Shovels" cleared those ashes out from underneath.

"Firepans" carried away hot coals.

"Basons" caught the blood of a sacrifice.

"Fleshhooks" were large forks for handling raw meat.

One set handled fire and ash, the other handled blood and meat.

🍲 Pots caught ashes under the fire

🧹 Shovels and firepans cleared them out

🩸 Basons caught the blood of sacrifice

📖 One toolkit handled every task at the altar

## 🕸️ A Brasen Grate Of Network Under The Compass Thereof

The "grate of network" was a bronze mesh set inside the hollow altar.

It sat about halfway up, between the fire on top and the ground below.

The mesh let air reach the fire and let ashes fall through underneath.

Without it, ashes would pile up and slowly smother the flame.

🕸️ The grate was a bronze mesh

📍 It sat halfway inside the altar

💨 Air and falling ash passed through it

📖 Good airflow kept the fire burning

## 💍 He Cast Four Rings For The Four Ends Of The Grate

"Cast" means the metal was melted and poured into a mold to form its shape.

Four rings were attached to the grate, partway up the altar's sides.

That lower position kept the altar balanced during travel.

Carrying poles called "staves" slid through these rings.

The poles were shittim wood covered in brass, matching the altar itself.

Every piece followed the same design, whether wood, metal, or ring.

💍 Cast means poured melted brass into a mold

🚶 Four rings sat partway up the sides

⚖️ Lower rings kept the altar balanced

📖 One matching design ran through every piece

## 🚚 He Made The Altar Hollow With Boards

Despite the brass covering, this altar was not a solid block of metal.

It was built from wooden boards, hollow on the inside.

A solid brass altar this size would have been far too heavy to carry.

Hollow construction kept the altar light enough for a wilderness journey.

◻️ The altar was hollow wood, not solid metal

⚖️ Solid brass would have been too heavy

🚚 Hollow boards kept the weight manageable

📖 Even holy furniture had to be practical

# Exodus 38:8
# 🪞 A Basin Made From Mirrors
---
## 🪞 He Made The Laver Of Brass, And The Foot Of It Of Brass

A "laver" was a large bronze basin where priests washed before serving.

Chapter thirty already commanded this washing before anyone could approach the altar.

The "foot" was the stand or pedestal that held the basin up off the ground.

Every priest touched this object before doing anything else in the tabernacle.

🪞 A laver was a basin for washing

📖 Chapter thirty first commanded this washing

🦶 The foot was the basin's stand

➡️ Washing came before every act of service

## 🔍 Of The Lookingglasses Of The Women Assembling

"Lookingglasses" means mirrors, though nothing like glass mirrors today.

In this era, mirrors were made of polished bronze, not glass at all.

A bronze mirror was a valuable, personal possession, not a cheap item.

A group of women gave up their own mirrors so the metal could be melted down.

An object made for checking your own appearance became a basin for washing before God.

🔍 Lookingglasses means mirrors made of bronze

💎 Bronze mirrors were valuable personal items

🔥 Women's mirrors were melted for the laver

📖 A mirror became a tool for approaching God

## 🚪 Which Assembled At The Door Of The Tabernacle Of The Congregation

This names a specific group of women who regularly gathered at the tabernacle entrance.

Scripture never spells out exactly what their role involved.

The same unusual phrase reappears far later, in First Samuel two, verse twenty two.

That repetition suggests women serving at the entrance was an ongoing practice, not one moment.

🚪 A group of women gathered at the entrance

📖 First Samuel two repeats this same phrase

❓ Their exact duties go unnamed

➡️ Unnamed service still mattered to God

# Exodus 38:9-13
# 🏕️ The Court Walls Of Linen
---
## 🧵 The Hangings Of The Court Were Of Fine Twined Linen

"Hangings" were tall linen curtains that formed the court's outer wall.

"Fine twined linen" meant each thread was itself twisted from several finer threads first.

That twisting made a stronger, tighter fabric than ordinary weaving.

This one wall alone stretched a hundred cubits, about a hundred and fifty feet long.

A simple curtain wall marked the boundary of holy space in the middle of the camp.

🧵 Hangings were tall linen curtains

🪢 Twined linen used twisted, doubled threads

📏 One wall stretched about a hundred fifty feet

📖 A curtain wall marked off holy space

## 🏛️ Their Pillars Were Twenty, And Their Brasen Sockets Twenty

"Pillars" were upright wooden posts holding up the curtain wall.

Each pillar stood in its own brass "socket," a heavy base anchoring it to the ground.

Twenty pillars and twenty sockets lined this one wall alone.

One socket served one pillar, all the way around the court.

🏛️ Pillars were upright posts holding the wall

🪨 Each pillar sat in a brass socket

🔢 Twenty pillars lined this one wall

📖 One socket anchored every single pillar

## 🪝 The Hooks Of The Pillars And Their Fillets Were Of Silver

"Hooks" attached the linen curtain onto each pillar.

"Fillets" were connecting bands that linked the pillars together like a rail.

The heavy base socket of each pillar was brass, buried in the ground.

Anything that actually touched or connected to the curtain itself was silver instead.

A hidden foundation of brass held up a visible finish of silver.

🪝 Hooks attached the curtain to each pillar

🔗 Fillets linked the pillars together

🥈 Silver covered anything touching the curtain

📖 Hidden brass held up visible silver

## 🧭 For The North Side The Hangings Were An Hundred Cubits

The north wall repeated the exact same length as the south wall.

It also matched the same pillar count and the same materials.

Nothing about this second wall needed new instructions or new choices.

Matching walls on opposite sides show a court built from one single plan.

🧭 The north wall matched the south wall

🔁 Same length, same pillars, same materials

📐 A repeated pattern, not a new plan

📖 One design shaped the whole court

## 🌅 For The West Side Were Hangings Of Fifty Cubits, Their Pillars Ten

The west wall measured only fifty cubits, half the length of the north and south walls.

It needed only ten pillars, exactly half as many as those longer walls.

The ratio of one pillar to five cubits of wall stayed exactly the same.

Even a shorter wall followed the very same spacing rule as every other wall.

🌅 The west wall was half as long

🏛️ Ten pillars, exactly half of twenty

📐 One pillar for every five cubits

📖 The same spacing rule never changed

## 🌄 For The East Side Eastward Fifty Cubits

The east wall matched the west wall's length, at fifty cubits.

Unlike the other three sides, the east wall was not a solid curtain.

It held the court's only entrance, described later in this chapter.

The tabernacle's one doorway always faced east.

That same direction was where the entrance to Eden faced before it was shut, in Genesis three.

🌄 The east wall matched the west wall's length

🚪 The east side held the court's only gate

🧭 The tabernacle's doorway always faced east

📖 Eden's entrance faced the same direction

# Exodus 38:14-17
# 🚪 Measuring The Gate
---
## 📏 The Hangings Of The One Side Of The Gate Were Fifteen Cubits

The east wall totaled fifty cubits, but it was not one unbroken curtain.

Part of it was plain linen wall, just like the other three sides.

This verse covers the plain section on one side of the entrance.

That stretch measured fifteen cubits, about twenty two feet long.

📏 The east wall was not one solid curtain

🧵 Part of it was plain linen wall

📐 This stretch measured about twenty two feet

📖 Even the gate area had a plain section

## 🤲 On This Hand And That Hand

"On this hand and that hand" is an old way of saying on either side.

A matching fifteen cubit strip of plain wall sat on the other side of the entrance too.

Fifty total cubits minus fifteen and fifteen leaves twenty cubits in the middle.

That twenty cubit gap was the entrance opening itself.

🤲 This hand and that hand means either side

🧵 A matching plain strip sat opposite the first

➗ Fifty minus fifteen and fifteen leaves twenty

📖 That twenty cubit gap was the gate

## 🧵 All The Hangings Of The Court Round About Were Of Fine Twined Linen

Every wall of the court used the exact same linen fabric.

North, south, east, and west all matched, plain and unbroidered.

Only one small stretch of the boundary would look any different.

That difference was saved for the entrance screen itself, covered next.

🧵 Every wall used the same plain linen

🧭 North, south, east, and west all matched

🎨 Only one small stretch would look different

📖 The entrance alone would stand out

## 🥉 The Sockets For The Pillars Were Of Brass

Brass covered the heavy foundation pieces buried in the ground.

Silver covered the hardware people could actually see and touch.

That same hierarchy held true for every pillar around the gate.

Hidden and visible parts of the fence followed one consistent rule.

🥉 Brass covered every buried foundation piece

🥈 Silver covered the hardware people could see

🔁 The same pattern held around the gate

📖 Hidden and visible parts followed one rule

## 👑 The Overlaying Of Their Chapiters Of Silver

A "chapiter" is the capital, the decorative cap that sits on top of a pillar.

Every pillar around the whole court had its top covered in silver.

That is about sixty pillars in total, each one finished the same way.

A consistent silver top gave the whole fence line one unified look.

The next section reveals exactly how much silver all of this actually required.

👑 A chapiter is a pillar's decorative cap

🥈 Every pillar's top was covered in silver

🔢 About sixty pillars, all finished alike

📖 A silver tally comes later in the chapter

# Exodus 38:18-20
# 🎨 The Colorful Entrance Screen
---
## 🧵 The Hanging For The Gate Of The Court Was Needlework

"Needlework" means detailed embroidery, stitched by hand into the fabric.

That is far more time consuming and skilled than the plain woven linen used elsewhere.

Marking the entrance with embroidery instead of plain fabric made it stand out.

Anyone approaching the court could see exactly where the one way in was.

🧵 Needlework means detailed hand stitched embroidery

⏳ Embroidery took far more skill than plain weaving

🚪 The entrance stood out from the rest

📖 One glance showed visitors the way in

## 🎨 Of Blue, And Purple, And Scarlet, And Fine Twined Linen

This same four color combination marks every major threshold in the tabernacle.

It appears here at the outer gate, and again at the inner veils.

Purple dye was extremely expensive in the ancient world, made from crushed sea snails.

Wherever these four colors appeared together, they marked a sacred boundary.

🎨 This color set marks every major threshold

🚪 It marks this gate and the inner veils

🐚 Purple dye came from crushed sea snails

📖 These colors marked a sacred boundary

## 📏 Twenty Cubits Was The Length, And The Height In The Breadth Was Five Cubits

The gate opening measured about thirty feet wide.

It stood about seven and a half feet tall.

That was large enough for priests, sacrificial animals, and furniture to move through freely.

A gate built for constant, practical use, not just for looks.

📏 The gate was about thirty feet wide

📐 It stood about seven feet tall

🐄 Wide enough for animals and furniture

📖 Built for constant practical use

## 📐 Answerable To The Hangings Of The Court

"Answerable" here means matching in size.

The gate screen's height matched the plain linen walls exactly.

That kept the whole boundary looking level and even all the way around.

Only the color and the embroidery marked the entrance as different, not its height.

📐 Answerable means matching in size

📏 The gate's height matched the plain walls

⚖️ The whole boundary stayed level and even

📖 Color, not height, marked the difference

## 🔨 All The Pins Of The Tabernacle, And Of The Court Round About, Were Of Brass

"Pins" were tent stakes, driven into the ground to anchor guy ropes.

Those ropes held the whole tent structure steady against desert wind.

This is the first time pins get mentioned in the whole chapter.

Even this small, easily overlooked piece of hardware was made of solid brass.

Nothing in this project was treated as too minor to matter.

🔨 Pins were tent stakes anchoring the ropes

💨 Ropes held the structure steady in wind

🥉 Even small hardware was made of brass

📖 Nothing here was too minor to matter

# Exodus 38:21-23
# 📜 The Builders Named And Accountable
---
## 📋 This Is The Sum Of The Tabernacle, Even Of The Tabernacle Of Testimony

"Sum" here means a full tally, a complete accounting of everything used.

"Tabernacle of testimony" is another name for the whole structure.

That name comes from the stone tablets of the covenant kept inside the ark.

Those tablets were called the "testimony," so the building is named after what it holds.

📋 Sum means a full tally of materials

📜 Testimony refers to the covenant tablets

🏷️ The whole structure is named after them

📖 A building named for what it holds

## ✍️ As It Was Counted, According To The Commandment Of Moses

This was not a loose or casual summary.

It was a formal, official count, ordered by Moses himself.

Every material in this chapter was tracked and verified, not simply guessed at afterward.

Even sacred work still needed honest, careful bookkeeping.

✍️ This was a formal, official count

✅ Sacred work still needed honest bookkeeping

🔢 Every material was tracked and verified

📖 Moses himself ordered the accounting

## 👤 For The Service Of The Levites, By The Hand Of Ithamar, Son To Aaron The Priest

Ithamar was the youngest son of Aaron, the high priest.

Here he personally oversaw this materials count.

The Levites were the tribe assigned to care for the tabernacle.

One specific, named person was held responsible for the inventory, not an anonymous group.

👤 Ithamar was Aaron's youngest son

📊 He personally oversaw this count

🛡️ The Levites cared for the tabernacle

📖 One named person, not a nameless group

## 🛠️ Bezaleel The Son Of Uri, The Son Of Hur, Of The Tribe Of Judah

Bezaleel was introduced back in chapter thirty one as filled by God's own Spirit for this exact work.

His grandfather was Hur, from the tribe of Judah.

Hur likely helped hold up Moses's hands during the battle with Amalek.

That battle happened back in chapter seventeen.

This family had already proven faithful, generations before this assignment.

🛠️ Bezaleel was Spirit filled for this work

👴 His grandfather Hur came from Judah

🙌 Hur likely helped hold up Moses's hands

📖 A family already proven faithful

## 🔁 Made All That The LORD Commanded Moses

This exact phrase repeats again and again across the closing chapters of Exodus.

It functions almost like a refrain, said over and over.

The point is simple, nothing here was improvised or adjusted on the fly.

Every single piece matched God's instructions to Moses precisely.

🔁 This phrase repeats through Exodus's closing chapters

🎯 Nothing was improvised or changed

✅ Every piece matched the instructions exactly

📖 Obedience, not improvisation, built this place

## 🎨 Aholiab, Son Of Ahisamach, Of The Tribe Of Dan, An Engraver, And A Cunning Workman

Aholiab came from the tribe of Dan, a far less prominent tribe than Bezaleel's Judah.

God's skill and calling for this work were not limited to Israel's most well known family line.

"Cunning" here is an old word meaning highly skilled.

It does not mean deceptive or tricky, which is what the word suggests today.

🎨 Aholiab came from the tribe of Dan

🌟 Skill here was not limited to one family

✅ Not deceptive, despite how the word sounds today

📖 Cunning here means highly skilled

# Exodus 38:24-29
# ⚖️ Counting The Gold, Silver, And Brass
---
## 🥇 The Gold Of The Offering, Was Twenty And Nine Talents, And Seven Hundred And Thirty Shekels

A "talent" weighed about seventy five pounds.

Twenty nine talents alone comes to well over a ton of gold.

That is an extraordinary amount for a people who had recently been slaves with nothing.

Every ounce came from what the people freely chose to give.

🥇 A talent weighed about seventy five pounds

⚖️ Twenty nine talents topped a ton of gold

😮 An extraordinary amount for former slaves

📖 Every ounce came from a willing gift

## 📏 After The Shekel Of The Sanctuary

The "shekel of the sanctuary" was one specific, official weight standard.

It was used only for counting materials tied to the tabernacle.

Ordinary trade shekels used in the marketplace could vary from merchant to merchant.

One fixed standard meant no one could shortchange this offering, even by accident.

📏 The sanctuary shekel was one fixed standard

🏪 Trade shekels varied between merchants

✅ No one could shortchange this offering

📖 One standard protected the whole gift

## 🥈 The Silver Of Them That Were Numbered Of The Congregation

Unlike the gold, which came from freewill gifts back in chapter thirty five, this silver was different.

It came from a required payment tied to a census, a counting of the people.

The details of that required payment come in the very next verse.

Not every gift in the tabernacle was optional.

🥈 This silver was not a freewill gift

📊 It came from a required census payment

✅ Some parts of this offering were required

📖 The payment details follow in the next verse

## 🔢 An Hundred Talents, And A Thousand Seven Hundred And Threescore And Fifteen Shekels

"Threescore" is an old way of saying sixty, three sets of twenty.

Add it all up and the silver totals close to four tons.

That is even more than the gold, by weight.

Silver was worth less than gold per pound, but there was far more of it collected.

🔢 Threescore is an old word for sixty

⚖️ The silver totaled close to four tons

🥈 More silver than gold by weight

📖 Value and weight are not the same thing

## 🪙 A Bekah For Every Man, That Is, Half A Shekel

A "bekah" was a specific coin weight equal to exactly half a shekel.

The verse even defines its own term, right in the text, with the words "that is."

Nothing here was left to guesswork or personal judgment.

A fixed, small amount, the same for absolutely everyone.

🪙 A bekah equaled exactly half a shekel

✅ Nothing was left to guesswork

🟰 The same fixed amount for everyone

📖 The verse defines its own term

## ⚖️ From Twenty Years Old And Upward

This ties back to chapter thirty, where God first commanded a census payment.

Every man twenty years old or older had to pay this exact half shekel.

Rich and poor paid the identical amount, with no difference between them.

In God's counting, no man's life was worth more than another's.

📖 Chapter thirty first commanded this payment

⚖️ Every man twenty or older paid it

🟰 Rich and poor paid the same amount

➡️ No life counted for more than another's

## 🧮 For Six Hundred Thousand And Three Thousand And Five Hundred And Fifty Men

That total comes to six hundred three thousand, five hundred fifty men.

The very same figure appears again in the book of Numbers, chapter one.

Two separate books of the Bible independently record the identical number.

A small detail like a census count still lines up across Scripture.

🧮 The total was six hundred three thousand men

✅ Two books agree on the identical number

🔗 Even small details line up across Scripture

📖 Numbers chapter one records this same figure

## 🏗️ Of The Hundred Talents Of Silver Were Cast The Sockets Of The Sanctuary, And Of The Vail

All of that silver had one very specific job.

It became the heavy sockets that the tabernacle's wooden wall frames stood inside.

It also became the sockets for the inner veil, the curtain guarding the most holy place.

This was structural foundation, not decoration.

🏗️ The silver became the wall frame sockets

🧱 It also formed the inner veil's sockets

🚫 This was structure, not decoration

📖 The nation's gift held up the building itself

## 🔘 An Hundred Sockets Of The Hundred Talents, A Talent For A Socket

A full talent of silver, about seventy five pounds, went into each single socket.

That silver came from the required payment every man twenty and older had made.

Every plank of the tabernacle's walls stood on a piece of that collective offering.

The whole building rested literally on money tied to atonement.

🔘 One full talent went into each socket

💰 The silver came from every man's payment

🧱 Every wall plank stood on that silver

📖 The building rested on atonement money

## 🪝 Of The Thousand Seven Hundred Seventy And Five Shekels He Made Hooks For The Pillars

This leftover silver was separate from the hundred talents already used for sockets.

It covered every piece of smaller hardware described throughout this chapter.

That includes the hooks, plus the silver overlay on the chapiters.

It also covered the connecting fillets mentioned earlier.

🪝 This leftover silver covered smaller hardware

👑 That included the hooks and chapiter overlays

🔗 It also covered the connecting fillets

📖 No silver was left unaccounted for

## 🥉 The Brass Of The Offering Was Seventy Talents, And Two Thousand And Four Hundred Shekels

That comes to well over five thousand pounds of brass.

It was the largest quantity of any single metal used in the whole tabernacle.

Brass covered the biggest surface area of all, the entire outer court fence.

The altar and the laver also drew from this same brass supply.

🥉 Over five thousand pounds of brass total

📐 The largest metal quantity in the project

🏕️ Brass covered the whole outer court fence

📖 One supply built the altar and laver too

# Exodus 38:30-31
# 🧾 Brass Accounted For To The Last Peg
---
## 🧾 Therewith He Made The Sockets To The Door Of The Tabernacle Of The Congregation

"Therewith" ties this verse directly back to the seventy talent brass total just given.

This whole section works like a receipt.

It lists exactly what that bulk metal actually became.

Even the entrance sockets for the tabernacle's own door came from this supply.

🧾 Therewith ties back to the brass total

📋 This section works like a receipt

🚪 It covered the tabernacle's own door sockets

📖 Every ounce of brass is accounted for

## 🔥 And The Brasen Altar, And The Brasen Grate For It, And All The Vessels Of The Altar

The chapter circles back to the altar described at its very start.

The brass counted here really did become the objects detailed earlier.

Nothing was left out between the tally and the finished work.

The chapter ends exactly where it began.

🔥 This circles back to the chapter's opening

✅ The brass really became those exact objects

🔁 Nothing was left out of the tally

📖 The chapter ends where it started

## 🏛️ The Sockets Of The Court Round About, And The Sockets Of The Court Gate

These are the base sockets holding up every pillar around the court's whole perimeter.

That includes the gate area's pillars too.

Brass was used here, not silver, since these carried the plain linen walls.

Silver was saved for the sanctuary's own frame and the entrance screen instead.

🏛️ These sockets held up every court pillar

🚪 That includes the pillars near the gate

🥉 Brass carried the plain linen walls

📖 Silver was saved for holier places

## 🔨 All The Pins Of The Tabernacle, And All The Pins Of The Court Round About

The chapter's very last words return to its humblest object.

"Pins" were the tent pegs, first named earlier in this same chapter.

A chapter that tracked more than a ton of gold closes on simple stakes in the sand.

The same careful attention covered the smallest object and the costliest one alike.

🔨 The chapter ends on its humblest object

⛺ Pins were simple tent pegs

⚖️ Gold and stakes got equal care

📖 Nothing here was too small to count`.trim();

export const EXODUS_THIRTY_EIGHT_PERSONAL_SECTIONS = parseExodusThirtyEightRawNotes(EXODUS_THIRTY_EIGHT_RAW_NOTES);
