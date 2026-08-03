export type ExodusTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentySixRawNotes(rawText: string): ExodusTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 26:${startVerse}` : `Exodus 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 26 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_SIX_RAW_NOTES = `# Exodus 26:1-6
# 🧵 The Inner Curtains
---
## 🎨 With Cherubims Of Cunning Work Shalt Thou Make Them

"Cunning work" means expert, artistic craftsmanship.

It does not mean trickery.

Ten curtains of fine linen made the tabernacle's inner layer.

Cherubim were woven directly into the fabric itself.

That is the same guardian figure watching over the mercy seat in chapter twenty five.

Now guardians covered the whole room, not just the lid of the ark.

🎨 Cunning work means skilled craftsmanship

👼 Cherubim were woven into the fabric

🏠 The same guardians now covered the room

📖 God's presence was surrounded by guardians

## 📏 The Length Of One Curtain Shall Be Eight And Twenty Cubits

A cubit measured about eighteen inches, close to a grown man's forearm.

Eight and twenty cubits comes to about forty two feet.

Four cubits comes to about six feet.

Each curtain stretched forty two feet long and six feet wide.

Ten of these curtains together made an enormous amount of cloth.

Every curtain matched the others in exact measure.

Precision came first, before a single curtain was ever hung.

📏 A cubit was about eighteen inches

🧮 Eight and twenty cubits equals forty two feet

🧵 Each curtain measured forty two by six feet

📖 Exact measure came before anything was hung

## 🔵 The Five Curtains Shall Be Coupled Together One To Another

The ten curtains were sewn into two separate sets of five.

Loops of blue thread ran along the edge of the outer curtain in each set.

"Selvedge" is the finished edge of a woven cloth that will not fray.

Fifty matching loops lined the edge of each set.

Think of two rows of zipper teeth waiting to interlock.

That is what these loops were built to do.

Nothing about this joining was left to guesswork.

🧵 Two sets of five curtains were sewn

🔵 Blue loops lined the edge of each set

🤐 Selvedge means a fray proof woven edge

📖 Fifty loops on each side, ready to interlock

## 🔗 Thou Shalt Make Fifty Taches Of Gold

"Taches" is an old word for clasps or hooks.

Fifty golden clasps locked the two halves of curtains into a single sheet.

The text does not call the result two curtains joined together.

It calls the result one tabernacle.

God cared about unity, not just decoration.

A tent built from many pieces was meant to function and look like one single house.

🔗 Taches means clasps or hooks

🥇 Fifty gold clasps joined the two halves

☝️ The result is called one tabernacle

📖 God designed unity, not just decoration

# Exodus 26:7-14
# 🐐 The Outer Coverings
---
## 🐐 Curtains Of Goats' Hair To Be A Covering Upon The Tabernacle

Goats' hair was the standard material for ordinary desert tents.

This second layer went directly over the beautiful linen curtains underneath.

Any traveler seeing the outside of this tent would see nothing special.

The glory was hidden one layer beneath a plain, common material.

Notice there are eleven curtains here, not ten like the inner layer.

That extra curtain has a purpose that shows up two verses later.

🐐 Goats hair was common desert tent material

🎭 A plain outer layer hid the glory inside

🔢 Eleven curtains, one more than the inner ten

📖 The extra curtain has a purpose ahead

## 📐 The Length Of One Curtain Shall Be Thirty Cubits

Thirty cubits comes to about forty five feet long.

Four cubits comes to about six feet wide.

That makes this outer layer three feet longer than the linen curtains underneath.

The extra length let the goat hair layer wrap further down the sides.

A covering has to be bigger than what it covers, or it will not reach.

📏 Thirty cubits equals about forty five feet

📐 This layer ran three feet longer than linen

🧥 Extra length let it wrap further down

📖 A covering must exceed what it covers

## ➕ Double The Sixth Curtain In The Forefront Of The Tabernacle

"Forefront" means the front, facing entrance of the tabernacle.

Six curtains were coupled on one side, five on the other, not an even split.

The sixth curtain, the extra one, was folded double right at the entrance.

That doubled the thickness exactly where the tent would be touched and weathered most.

The design put extra strength where it would actually be needed.

🚪 Forefront means the front facing entrance

⚖️ Six curtains on one side, five on other

➕ The sixth curtain folded double at the entrance

📖 Extra strength went where it was needed most

## 🥉 Fifty Taches Of Brass, And Put The Taches Into The Loops

This second layer used fifty loops and fifty clasps too, just like the first.

But these clasps were brass, not gold.

Chapter twenty five already showed gold on the furniture closest to God's presence.

Brass now marks this outer, more exposed layer of the tent.

The same materials keep repeating the same lesson, gold inside, brass outside.

🥉 These clasps were brass, not gold

🔁 Gold marked the furniture nearest God

📉 Brass marked the outer, exposed layers

📖 Materials themselves carried a lesson here

## ✂️ The Half Curtain That Remaineth Shall Hang Over The Backside Of The Tabernacle

"Remnant" here just means the leftover portion.

The goat hair layer measured more cloth than the linen layer beneath it.

That extra cloth was not wasted or cut away.

It hung down over the back and both sides of the structure instead.

Every excess inch still had a purpose, covering wood that would otherwise show.

✂️ Remnant means the leftover cloth

📏 The outer layer had extra length built in

🏠 That extra cloth hung over the sides

📖 Nothing extra went to waste here

## 🐏 Rams' Skins Dyed Red, And A Covering Above Of Badgers' Skins

Two more layers went on top of everything already described.

Ram hide dyed red came first.

Then a tough, weatherproof hide, likely from a sea creature, went over that.

From the inside out, the tabernacle now had four total layers.

Cherubim woven linen sat closest to God, and a plain hide roof sat outermost.

Nobody standing outside could guess what beauty was hidden under that plain roof.

🐏 Ram hide dyed red came next

🌊 A tough sea creature hide went on top

🔢 Four total layers ran from linen to hide

📖 Plain outside, glorious inside

# Exodus 26:15-19
# 🪵 The Standing Boards
---
## 🪵 Boards For The Tabernacle Of Shittim Wood Standing Up

Shittim wood is acacia, a hard, rot resistant wood that grows in the desert.

That is the same wood already used for the ark and the table in chapter twenty five.

Underneath all the curtain layers already described stood a real wooden frame.

These boards were not laid flat like a floor.

They stood upright, forming actual walls.

This was a built structure, not a simple tent held up by poles alone.

🪵 Shittim wood means acacia, hard and rot resistant

🔁 The same wood as the ark and table

🧱 Boards stood upright as real walls

📖 A built structure, not just a tent

## 📐 Ten Cubits Shall Be The Length Of A Board

Ten cubits comes to about fifteen feet tall.

A cubit and a half comes to a little over two feet wide.

Twenty of these boards lined each long side of the tabernacle.

Fifteen feet of height meant this was a genuine building, not a low tent.

A worshiper walking up to it would have to look up to see the top.

📐 Ten cubits equals about fifteen feet tall

🧍 Twenty boards lined each long side

🏠 This was a real building, not a tent

📖 Worshipers looked up to see the top

## 🔩 Two Tenons Shall There Be In One Board, Set In Order One Against Another

"Tenons" are wooden pegs carved into the bottom edge of each board.

Each peg was built to fit into a matching socket below it.

That is the same basic joint still used in woodworking today.

Every single board had to be shaped to fit its own exact spot.

Thousands of years before power tools existed, this design still had to line up perfectly.

🔩 Tenons means wooden pegs on the board's base

🧩 Each peg fit one matching socket

🛠️ The same joint is still used today

📖 Precise fitting mattered even in the desert

## 🥈 Forty Sockets Of Silver Under The Twenty Boards

Every board rested on two silver sockets.

That means the whole wooden frame of God's house stood on a foundation of silver.

Exodus thirty later explains where this silver came from.

It was atonement money, a required payment collected from every man counted in a census.

The tabernacle's foundation was funded by money tied to redemption, not by ordinary taxes.

🥈 Every board stood on two silver sockets

💰 Exodus thirty explains this silver as atonement money

🩸 That money came from redemption, not ordinary taxes

📖 God's house stood on a foundation of atonement

# Exodus 26:20-25
# 🧱 The North, West, And Corner Boards
---
## 🧭 There Shall Be Twenty Boards

The north wall matched the south wall exactly.

It used twenty boards and forty silver sockets, just like the south side.

This was not a random design choice.

A structure this size needed both long walls built to the same standard.

Nothing about God's house was stronger on one side than the other.

🧭 The north wall matched the south wall

🥈 Same twenty boards, forty silver sockets

⚖️ Both long walls used the same standard

📖 God's house was never lopsided

## 🔢 For The Sides Of The Tabernacle Westward Thou Shalt Make Six Boards

The west wall closed off the back of the tabernacle.

It was shorter than the long north and south walls.

Six boards were enough to close this shorter wall.

This wall stood nearest the ark itself, behind the veil.

Smaller did not mean less important.

🧭 The west wall closed the tabernacle's back

📏 It was shorter than the two long walls

🔢 Six boards were enough for this wall

📖 Smaller did not mean less important

## 📐 Two Boards Shalt Thou Make For The Corners Of The Tabernacle In The Two Sides

Two extra boards reinforced each back corner.

That is where the long north and south walls met the shorter west wall.

Corners take the most stress in any wooden structure.

God's design gave the weakest points of the frame extra support.

📐 Two extra boards reinforced each corner

🧭 Corners sit where two walls meet

💪 Corners absorb the most structural stress

📖 The weakest points got the most support

## 💍 Coupled Together Above The Head Of It Unto One Ring

This describes how the two corner boards locked together.

They were joined at the bottom.

They were joined again at the top, through a single ring.

Two separate joints turned two boards into one unified corner post.

A corner built from a single weak seam would have failed under real weight.

🔗 The corner boards locked at two points

⬇️ Joined at the bottom first

⬆️ Joined again at the top, through one ring

📖 Two joints made one strong corner post

## 🔢 Eight Boards, And Their Sockets Of Silver, Sixteen Sockets

The west wall's total came to eight boards.

Six regular boards plus two corner boards made that total.

Sixteen silver sockets held them in place, two per board.

That is the exact same pattern used on every other wall.

No matter which direction a wall faced, it stood on the same silver foundation.

🔢 Eight total boards made the west wall

🥈 Sixteen silver sockets, two per board

🔁 The same pattern used on every wall

📖 Every wall stood on the same silver foundation

# Exodus 26:26-30
# 🔗 The Connecting Bars
---
## 🪵 Five For The Boards Of The One Side Of The Tabernacle

Long horizontal bars, also cut from acacia wood, ran along the outside of the standing boards.

Rings attached to the boards let each bar slide through and connect the whole wall.

Five bars ran along each of the two long walls.

Five more bars ran along the shorter west wall.

Without these bars, every board would have stood alone and unstable.

Together they turned separate boards into one solid wall.

🪵 Horizontal bars connected the boards side to side

💍 Rings let each bar slide through and connect

🧱 Alone, each board would have been unstable

📖 Together the boards became one solid wall

## 🎯 The Middle Bar In The Midst Of The Boards Shall Reach From End To End

"Midst" simply means the middle.

The other bars may have run in shorter, connected sections.

This one center bar ran the entire length of the wall in a single piece.

It stayed hidden inside the boards, never visible from outside.

An unseen piece still carried real structural weight.

🎯 Midst simply means the middle

📏 This center bar ran the wall's full length

👁️ It stayed hidden inside the boards

📖 An unseen piece still carried real weight

## ✨ Overlay The Boards With Gold

Even the bars running inside the wooden frame were covered in gold.

Nobody outside the tabernacle would ever see these hidden bars.

Chapter twenty five already covered the ark the same way.

Gold went even on surfaces no one would ever see.

The standard was never gold only where people were watching.

It was gold everywhere, seen or unseen.

✨ Even hidden bars were covered in gold

👁️ No one outside would ever see them

🔁 This matches the ark's hidden gold surfaces

📖 Gold covered everything, not just what showed

## 📐 According To The Fashion Thereof Which Was Shewed Thee In The Mount

"Fashion" here simply means design or shape.

"Shewed" is an old spelling of showed.

This exact instruction has now repeated since chapter twenty five.

By this point the message is unmistakable.

Nothing about this building's design was left to human creativity.

Moses was building a copy of something he had already been shown.

📐 Fashion means design or shape

👀 Shewed is the old spelling of showed

🔁 This instruction has repeated since chapter twenty five

📖 Nothing here was left to human creativity

# Exodus 26:31-35
# 🚧 The Veil
---
## 🎨 Thou Shalt Make A Vail Of Blue, And Purple, And Scarlet

"Vail" is the old spelling of veil.

This curtain used blue, purple, scarlet thread, and fine linen worked in cunning work.

Those are the same colors and craftsmanship used on the tent's innermost layer.

This was not a plain room divider.

It was built to the highest standard found anywhere in the tabernacle.

🎨 Vail is the old spelling of veil

👑 Same royal colors as the inner tent layer

🏆 Same craftsmanship as the walls around the ark

📖 This was the highest standard in the building

## 🏛️ Hang It Upon Four Pillars Of Shittim Wood Overlaid With Gold

Four pillars held the veil in place.

Each pillar was acacia wood covered in gold.

Each one stood in a silver socket.

Gold above and silver below matches the standing boards described earlier.

Even the frame holding up a curtain followed the same careful pattern.

🏛️ Four gold covered pillars held the veil

🥈 Each pillar stood in a silver socket

🔁 This matches the boards described earlier

📖 Even a curtain frame followed the pattern

## 🚪 The Vail Shall Divide Unto You Between The Holy Place And The Most Holy

This one sentence names the tabernacle's two inner rooms.

"Thither" is an old word meaning "into that place."

The veil let the priest bring the ark into the most holy room.

The holy place was the outer room, where the table and lampstand stood.

The most holy was the innermost room, the Holy of Holies.

Only one man could enter it, and only once a year.

🚪 Thither means into that place

🍞 The holy place held the table and lampstand

📦 The most holy held only the ark

📖 Only one man entered, once a year

## 📦 Put The Mercy Seat Upon The Ark Of The Testimony In The Most Holy Place

This confirms exactly where the ark's golden lid would finally sit.

Chapter twenty five already described building the ark and the mercy seat on top of it.

That piece of furniture now had its permanent home, behind this veil.

It sat in total isolation from everyone but the high priest.

Even he could only approach it once a year, on the Day of Atonement.

📦 This confirms the ark's final resting place

🔒 It sat behind the veil, in isolation

🗓️ Only the high priest could approach it

📖 That access came once a year

## 🧭 Set The Table Without The Vail, And The Candlestick Over Against The Table

"Without the vail" means outside the veil, in the holy place.

The table of showbread sat on the north side of that outer room.

The golden lampstand sat across from it, on the south side.

Every piece of furniture from chapter twenty five now had an exact, assigned position.

Nothing in this house was placed by guesswork.

🧭 Vail here means outside, in the holy place

🍞 The table sat on the north side

🕯️ The lampstand sat on the south side

📖 Every piece had an exact, assigned place

## ✂️ The Veil Of The Temple Was Rent In Twain

Matthew twenty seven records the moment Jesus died.

At that moment, the temple veil tore from top to bottom.

That later temple veil descended directly from the curtain described in this chapter.

Hebrews ten explains what that tear meant.

It pictured a permanently open way into God's presence.

Christ made that access possible.

The single, yearly, single priest entrance this chapter describes was no longer needed.

✂️ Matthew twenty seven records that veil tearing

🕊️ Hebrews ten explains the tear as open access

🔓 That single yearly entrance was no longer needed

📖 Christ opened what this veil once sealed

# Exodus 26:36-37
# 🪡 The Door Of The Tent
---
## 🪡 An Hanging For The Door Of The Tent

"Wrought with needlework" describes embroidery.

That is a simpler skill level than the cunning work used deeper inside.

This entrance screen used the same rich colors as the inner veil.

Ordinary worshipers were the ones who actually saw this part of the building.

Yet it used less elaborate craft than the parts kept hidden from view.

The most public part of the building was not the most costly part.

🪡 Wrought with needlework means embroidered work

📉 Simpler than the cunning work used deeper inside

👀 Ordinary worshipers actually saw this entrance

📖 The most public part was not the costliest

## 🥉 Thou Shalt Cast Five Sockets Of Brass For Them

These entrance pillars stood on brass sockets, not silver like the tabernacle's side walls.

Chapter twenty five put gold on the furniture nearest God.

This chapter put silver under the walls in between.

Now brass sits at the outer doorway, where the general public would stand.

One consistent pattern runs from the first offering listed all the way to this final pillar.

🥉 These pillars stood on brass, not silver

🥇 Gold marked the furniture nearest God

🥈 Silver marked the walls in between

📖 Brass marked the outer edge, nearest the public`.trim();

export const EXODUS_TWENTY_SIX_PERSONAL_SECTIONS = parseExodusTwentySixRawNotes(EXODUS_TWENTY_SIX_RAW_NOTES);
