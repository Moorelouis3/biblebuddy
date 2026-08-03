export type ExodusThirtySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirtySixRawNotes(rawText: string): ExodusThirtySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirtySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+36:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 36 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+36:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+36:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 36 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 36,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 36:${startVerse}` : `Exodus 36:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 36 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTY_SIX_RAW_NOTES = `# Exodus 36:1-7
# 🎁 Too Much To Give
---
## 🛠️ Then Wrought Bezaleel And Aholiab

"Wrought" means worked, an old way of saying they built something by hand.

Chapters twenty five through thirty five were all planning and gathering materials.

This is the very first verse where real building actually starts.

Bezaleel and Aholiab were the two men God named by name back in chapter thirty one.

Every measurement chosen on the mountain now becomes something real.

🛠️ Wrought means worked, not fought

📋 Chapters twenty five to thirty five were planning

🔨 This verse begins the real building

📖 The mountain instructions now become a real object

## 🧠 Every Wise Hearted Man

"Wise hearted" does not mean smart in an ordinary way.

It means someone gifted with real hands on skill, like carpentry or weaving.

Chapter thirty one already said God filled these workers with His own Spirit for this task.

Skilled craft work is treated here as a real gift from God.

It is not a lesser talent sitting apart from spiritual gifts.

🧠 Wise hearted means skilled, not merely smart

🕊️ God filled these workers with His Spirit

🪚 Craft skill counts as a real gift

📖 Skill and spirit are not separate things

## ❤️ Whose Heart Stirred Him Up

"Heart stirred him up" describes an inner pull toward the work, not a paycheck.

Chapter thirty five used this same phrase for the people who gave the materials.

Moses does not draft workers or hand out a labor quota here.

He calls only the ones already moved from the inside to come and help.

The same willing spirit behind the gifts now builds the object itself.

❤️ Heart stirred means an inner pull to help

🎁 Chapter thirty five used this phrase for givers

🙋 Moses calls people, not a labor draft

📖 One willing spirit both gave and built

## 🌄 Free Offerings Every Morning

The gifts did not stop once the work actually began.

People kept bringing fresh offerings every single morning, even mid construction.

Someone had to keep receiving those gifts.

That happened at the very same time as the actual building.

This was an ongoing outpouring, not a single one time collection.

🌄 Offerings kept arriving morning after morning

🏗️ Building and collecting happened at the same time

📈 The giving was ongoing, not a single moment

📖 Generosity outlasted the initial call for it

## 📊 Much More Than Enough

This is an unusual complaint by any normal standard.

The workers are not reporting a shortage but a surplus so large it became a problem.

Most ancient building projects in that world ran on taxes, tribute, or forced labor.

Here the challenge was too much free generosity, not too little money.

This surplus comes directly from the willing hearted giving described back in chapter thirty five.

📊 The complaint is surplus, not shortage

🏛️ Most ancient projects struggled to find enough funding

✨ This nation gave more than it needed

📖 Willing generosity created an unusual problem

## 🛑 So The People Were Restrained

"Restrained" means someone had to actively hold the people back.

Moses has to send out a formal order across the whole camp to stop giving.

This is the only place in the whole tabernacle story where a leader stops generosity instead of asking for more.

The very last line of this opening scene says the stuff was already sufficient, and too much.

This same people once gave gold too eagerly for a golden calf.

Now they give too eagerly for the right thing instead.

🛑 Restrained means people were actively held back

📢 Moses stops giving with a camp wide order

🔁 The calf's eager giving now serves God rightly

📖 A nation prone to excess finally gives rightly

# Exodus 36:8-13
# 🧵 The Curtains Take Shape
---
## 🎨 Fine Twined Linen, And Blue, And Purple, And Scarlet

These are the same four costly materials first named back in chapter twenty five.

Blue, purple, and scarlet were expensive dyes reserved mostly for royalty in the ancient world.

Fine twined linen means the thread itself was tightly spun and woven for strength.

What was raw offered material in chapter thirty five now becomes finished fabric.

🎨 These are chapter twenty five's original colors

👑 Blue purple and scarlet marked royalty

🧵 Fine twined linen means tightly spun thread

📖 Offered material becomes finished fabric here

## 👼 Cherubims Of Cunning Work

"Cunning work" is an old phrase for expert artistic skill, not trickery.

Cherubims were guardian figures woven directly into this fabric by hand.

The same guardian image already sits on the mercy seat covering the ark.

Weaving figures this detailed into cloth took real trained skill, not a quick pattern.

👼 Cunning work means expert skill, not deceit

🛡️ Cherubims are guardian figures, not decoration

🔁 This matches the mercy seat's cherubims

📖 Skill this careful took real training

## 📏 Twenty And Eight Cubits

A cubit was close to a foot and a half in modern measurement.

Twenty and eight cubits works out to about forty two feet long.

Four cubits across works out to about six feet wide.

Picture a curtain about the length of a school bus.

This matches chapter twenty six's blueprint exactly, down to the cubit.

📏 A cubit was near eighteen inches

🚌 Forty two feet, like a school bus

🧵 Each curtain was six feet wide

📖 The build matched the blueprint exactly

## 🔗 Coupled The Five Curtains

The ten curtains were not sewn edge to edge in one long strip.

Instead they were joined into two separate panels of five curtains each.

Working in two smaller sections made weaving and later folding far more manageable.

The two panels still had to become one seamless covering in the end.

🔗 Ten curtains formed two panels of five

🧺 Smaller panels were easier to weave

🎒 Two panels folded and moved more easily

📖 Two panels still became one covering

## 🪡 Loops Of Blue On The Edge

A selvedge is the finished edge of woven fabric that will not fray.

Every hand loomed piece of cloth naturally has one along its border.

Loops of blue thread were sewn along this edge on purpose.

Those loops existed only so the two five curtain panels could later be joined.

🪡 A selvedge is fabric's natural finished edge

🔵 Blue loops lined that finished edge

🧩 The loops existed only to join panels

📖 Even an edge served a building purpose

## 🥇 So It Became One Tabernacle

"Taches" is an old word for clasps or hooks.

Fifty gold clasps locked the two curtain panels into a single covering.

The text does not say two halves joined together.

It says plainly that the result became one tabernacle.

That wording matches exactly what chapter twenty six had asked for.

🥇 Taches means clasps, made of solid gold

🔗 Fifty clasps locked both panels together

☝️ The result is called one tabernacle

📖 The finished work matched the plan exactly

# Exodus 36:14-19
# ⛺ A Tougher Layer Goes On
---
## 🐐 Curtains Of Goats' Hair

Goats hair was the ordinary material used for everyday desert tents.

This second layer sat directly over the beautiful linen layer below it.

Eleven curtains were made here, one more than the ten linen curtains underneath.

That extra curtain was not a mistake, it had a specific job explained later in the chapter.

🐐 Goats hair was standard desert tent material

🏕️ This layer covered the finer linen beneath

🔢 Eleven curtains is one more than ten

📖 The extra curtain had a real purpose

## 📏 Thirty Cubits, And Four Cubits

At about a foot and a half per cubit, this curtain measured close to forty five feet long.

That is about three feet longer than the linen curtain beneath it.

The extra length let this tougher outer layer hang down over every side.

That overhang fully covered and protected the finer, more costly fabric underneath.

📏 Forty five feet, longer than the linen

🛡️ Extra length let this layer overhang the sides

🧵 The costly linen stayed fully covered

📖 A plain layer protected a precious one

## 🔀 Five Curtains By Themselves, And Six

The linen layer split evenly, five curtains and five curtains.

This goat hair layer splits unevenly instead, five curtains and six.

That extra sixth curtain in the larger group was not random.

It sat exactly where the entrance would later need extra covering.

🔀 This split is uneven, five and six

➕ The extra curtain joins the larger group

🚪 That placement points toward the entrance

📖 An uneven split still served a purpose

## 🥉 Fifty Taches Of Brass

The clasps joining this outer layer were brass, not the gold used before.

Brass cost far less than gold in the ancient world.

This is not the first time gold marks something closer to the center.

Plainer metal marks the layers exposed to weather and daily wear.

🥉 These clasps were brass, not gold

💰 Brass cost less than gold

🎯 Gold marks the inner, protected layers

📖 Material value follows a clear pattern

## 🐏 Rams' Skins Dyed Red

A third layer went directly over the goat hair tent.

This one was tanned leather, dyed red, taken from ram hides.

Tanned leather held up far better against sun, wind, and rare desert rain.

This layer added real weatherproofing on top of two woven layers.

🐏 Ram hide formed a third, tougher layer

🌧️ Tanned leather resisted sun, wind, and rain

🧴 This layer added real weatherproofing

📖 Even a protective layer kept its color

## 🦫 A Covering Of Badgers' Skins

Actual badgers did not live in this desert region at all.

Many scholars believe this phrase mistranslates a Hebrew word for a different animal.

It likely points to the tough, waterproof hide of a sea creature such as a dugong.

This final, plain layer became the tabernacle's outer roof, facing the world.

Nothing about its outside gave any hint of the gold and cherubims hidden within.

🦫 Badgers likely mistranslates a different animal

🐬 A dugong hide fits the region better

🎭 This plain layer faced the outside world

📖 Glory stayed hidden under a plain roof

# Exodus 36:20-24
# 🪵 The Frame Beneath It All
---
## 🏗️ Shittim Wood, Standing Up

Under every curtain layer stood a real wooden skeleton.

Shittim is another name for acacia, a hard desert wood that resists rot.

The same wood was already used for the ark and the table.

This was never a simple cloth tent held up by a few poles.

It was a true wooden structure with fabric draped over the outside.

🏗️ Shittim wood means acacia, rot resistant

🌳 The same wood built the ark and table

⛺ Curtains covered a real wooden frame

📖 This was a building, not just cloth

## 📐 A Cubit And A Half

At about a foot and a half per cubit, each board stood close to fifteen feet tall.

Each board measured just over two feet wide.

A wall built from boards this size had genuine height and weight.

Twenty of these boards side by side formed one entire long wall.

📐 Each board stood close to fifteen feet tall

📏 Each board was just over two feet wide

🧱 Twenty boards formed one full wall

📖 Height and weight, not a low tent

## 🔩 Two Tenons, Equally Distant

A tenon is a wooden peg carved into the bottom of a board.

Each peg was built to fit precisely into a matching socket below it.

That same basic joinery method is still used in fine woodworking today.

Every single board had to be shaped by hand to fit its own exact spot.

🔩 A tenon is a peg carved into wood

🧩 Each peg fit one matching socket

🛠️ This joinery method is still used today

📖 Every board was custom cut by hand

## 🧭 The South Side Southward

The south wall was the first one actually built, using twenty matching boards.

Naming a direction this specifically was not an accident.

It confirms the tabernacle always faced one fixed, deliberate orientation.

This matches chapter twenty six's original blueprint for the same wall.

🧭 The south wall came first, twenty boards

🎯 A named direction means a fixed layout

📌 Direction was never left to chance

➡️ The blueprint was followed wall by wall

## 🥈 Forty Sockets Of Silver

Every board rested on two silver sockets underneath it.

That means this entire wall literally stood on a foundation of silver.

Chapter thirty already explained this silver came from required atonement money.

Every counted Israelite had to pay that price, rich or poor alike.

The wall's foundation was funded by that redemption money, not ordinary taxes.

🥈 Every board stood on two silver sockets

💰 Chapter thirty names this silver atonement money

🩸 Rich and poor paid the same price

📖 Redemption money became the wall's own foundation

## 🔩 Two Sockets Under One Board

Each board's two wooden tenons each got its own separate silver socket.

The two pegs did not share one wide slot together.

Two separate fixed points kept a board this tall from twisting side to side.

That small detail mattered for the stability of the entire standing wall.

🔩 Each tenon got its own separate socket

⚖️ Two fixed points stopped the board from twisting

🧱 Stability mattered for a fifteen foot wall

📖 A small detail protected the whole structure

# Exodus 36:25-30
# 🧱 North, West, And The Corners
---
## 🧭 Toward The North Corner, He Made Twenty Boards

The north wall was built to exactly match the south wall already finished.

Same count of boards, same size, same silver sockets underneath.

Symmetry, not variety, was the rule for the tabernacle's two long walls.

This mirrors chapter twenty six's blueprint for the north side just as closely.

🧭 The north wall matched the south exactly

⚖️ Symmetry was the rule for both walls

📏 Same boards, same size, same sockets

📖 The blueprint held true on every side

## 🥈 Their Forty Sockets Of Silver

The same silver sockets pattern from the south wall repeats here without change.

Two sockets held every single board in place, on both long walls.

Forty total silver sockets supported each twenty board wall.

Repeating the same system on both sides kept the whole structure balanced.

🥈 The same socket pattern repeats here

🧱 Forty silver sockets held each long wall

⚖️ Balance came from repeating one system

📖 Consistency ran through the whole design

## 🌅 Westward He Made Six Boards

The back wall, facing west, used only six boards instead of twenty.

That made the tabernacle's overall shape a rectangle, not a square.

The structure measured close to fifteen feet wide by forty five feet long.

The entrance faced east, directly opposite this shorter back wall.

🌅 The west wall used just six boards

📐 The whole building formed a rectangle

🚪 The entrance faced east, opposite this wall

📖 Shape followed function, not decoration

## 📐 For The Corners Of The Tabernacle

Two extra boards were built specifically for the two back corners.

That is where the long side walls met the shorter back wall.

Corners are usually the weakest point in any framed structure.

This detail shows real engineering care, not just a simple box shape.

📐 Two extra boards reinforced the back corners

🏗️ Corners are typically a structure's weak point

🧠 This shows real engineering thought

📖 Care went into the hardest joints

## 🔗 Coupled Together At The Head Thereof

"Head thereof" is an old way of saying the top of the corner.

The corner boards were joined at the bottom near the ground first.

Then a single ring joined both corner boards again at the very top.

Locking both ends made the whole frame far sturdier against desert wind.

🔗 Head thereof means the top of the corner

⬇️ The corner was joined first at the bottom

⬆️ Then joined again at the very top

📖 Two joints made the frame windproof

## 🔢 Sixteen Sockets Of Silver

This verse tallies the whole west wall at last.

Six flat boards plus two corner boards equals eight total.

Eight boards rested on sixteen silver sockets, two for each board.

This careful count shows nothing in the frame was left approximate.

🔢 Six boards plus two corner boards equal eight

🥈 Sixteen sockets supported those eight boards

✅ Two sockets held up every single board

📖 Careful counting left nothing to guesswork

# Exodus 36:31-34
# 🔗 Bars That Locked It Together
---
## 🪵 Bars Of Shittim Wood

Long horizontal bars, also cut from acacia wood, ran the length of each wall.

They threaded through rings attached to the standing boards.

Without these bars, every single board would have stood alone and unstable.

Five bars ran the length of the south wall specifically.

🪵 Horizontal bars ran the length of each wall

🔗 Bars threaded through rings on the boards

🧱 Without bars, each board stood alone

📖 Bars turned separate boards into one wall

## 🔁 For The Sides Westward

The same five bar system repeats for the north wall.

An adjusted version secures the shorter west wall as well.

Three separate walls were never meant to simply stand side by side.

This turned three walls into one single, connected structure.

🔁 Five bars matched the north wall too

🧩 A shorter version secured the west wall

🏗️ Three walls became one connected structure

📖 Connection mattered as much as height

## 🎯 Shoot Through The Boards

"Shoot through" is an old way of saying pass through, not a weapon.

Most bars likely ran in shorter, connected sections along the wall.

This one middle bar ran the entire length of the wall in a single piece.

It stayed completely hidden inside the boards, unseen but essential.

🎯 Shoot through means to pass through

📏 This bar ran the wall's full length

👁️ It stayed hidden inside the boards

📖 What holds a structure up is often unseen

## ✨ Overlaid The Boards With Gold

Every board, and every ring the bars passed through, was covered in gold.

No visitor to the tabernacle would ever see this gold at all.

It sat hidden inside the walls, never facing outward.

The standard here was gold throughout, not gold only where people could look.

✨ Hidden boards and rings were gold too

👁️ No visitor would ever see this gold

🎯 Gold covered everything, seen or unseen

📖 Hidden faithfulness matched visible glory

## 🥇 Overlaid The Bars With Gold

The bars sliding through those gold rings were themselves gold covered too.

The entire internal skeleton, boards, rings, and bars alike, was gold from the inside out.

This matches the same total coverage standard already used on the ark itself.

Nothing about the frame's inner skeleton was left plain or unfinished.

🥇 Bars were gold covered, inside and out

🔁 This matched the ark's own gold standard

🏛️ The whole skeleton was gold, not just decoration

📖 Even the frame reflected the same glory

# Exodus 36:35-38
# 🚪 The Veil And The Door
---
## 🎨 A Vail Of Blue, And Purple, And Scarlet

"Vail" is simply the old spelling of veil.

This curtain divided the Holy Place from the innermost Most Holy Place.

It used the exact same royal colors as the outer linen ceiling.

Cherubims were woven into it too, using that same cunning work.

This marked it as the most sacred barrier inside the whole structure.

🎨 Vail is just the old spelling of veil

👑 It reused the same royal colors

👼 Cherubims were woven in the same way

📖 This was the most sacred inside barrier

## 🪵 Four Pillars Of Shittim Wood

Four gold covered wooden pillars held the veil upright inside the tabernacle.

They stood exactly between the Holy Place and the Most Holy Place.

This veil sat deep inside the sacred interior of the whole structure.

Its pillars got the same full gold treatment as the ark and the boards.

🪵 Four pillars held the veil upright

📍 They stood between the two holy rooms

✨ Deep interior pieces got full gold cover

📖 Nothing this close to the ark was plain

## 🥈 Four Sockets Of Silver

Even the small hooks holding the veil onto its pillars were made of gold.

The pillars themselves stood on four silver sockets.

That matches the same silver footed pattern already seen on the wall boards.

Every detail this deep inside the structure followed one gold and silver standard.

🥈 These pillars stood on silver sockets

🥇 Even the small hooks were gold

🔁 This matched the wall boards' pattern

📖 One standard ran through the whole interior

## 🪡 An Hanging For The Tabernacle Door

"Needlework" describes embroidery, a real skill but simpler than cunning work.

This entrance screen used the same rich colors as the inner veil.

Every ordinary priest would actually see and pass through this screen daily.

The most public facing part of the building used simpler craft than the hidden veil.

🪡 Needlework is embroidery, simpler than cunning work

🚪 Priests saw and used this screen daily

🎨 Same rich colors, less elaborate craft

📖 The most seen part was simplified on purpose

## 🥉 Their Five Sockets Were Of Brass

"Chapiters" are the decorative tops, or capitals, of the pillars.

"Fillets" are decorative bands wrapped around them.

Both were gold covered here, just like the inner veil's pillars.

These entrance pillars stood on brass sockets instead of silver.

That closes the whole chapter on one gold, silver, and brass pattern.

🥉 Chapiters are pillar tops, fillets are bands

🥇 Both were gold covered like the veil's pillars

📉 These entrance sockets were brass, not silver

📖 Gold, silver, and brass followed one pattern`.trim();

export const EXODUS_THIRTY_SIX_PERSONAL_SECTIONS = parseExodusThirtySixRawNotes(EXODUS_THIRTY_SIX_RAW_NOTES);
