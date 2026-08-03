export type ExodusTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyEightRawNotes(rawText: string): ExodusTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 28:${startVerse}` : `Exodus 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Exodus 28 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_EIGHT_RAW_NOTES = `# Exodus 28:1-4
# 🎽 Called To Serve At The Altar
---
## 👨‍👦 Aaron Thy Brother, And His Sons With Him

Aaron was Moses' own brother, chosen out of the whole nation for one task.

Up to this point Moses had spoken with God directly on Israel's behalf.

Now God sets apart one family line to serve permanently at the altar.

This is the beginning of the priesthood as its own lasting office.

Aaron and his sons will carry that office long after Moses is gone.

👨‍👦 Aaron was Moses' own brother

🛐 God sets apart one family line

🏛️ The priesthood becomes a lasting office

📖 This office outlives Moses himself

## 👶 Nadab And Abihu, Eleazar And Ithamar, Aaron's Sons

All four of Aaron's sons are named here before any garment is even described.

Nadab and Abihu already stood with Moses on the mountain in chapter twenty four.

Leviticus ten later records both of them dying within this very priesthood.

They will offer fire God never commanded, and judgment will fall on them.

Eleazar and Ithamar are named here too.

They will carry the priestly line forward after their brothers are gone.

👶 All four sons are named individually

🏔️ Nadab and Abihu already stood on the mountain

😔 Leviticus ten records their deaths later

📖 Eleazar and Ithamar carry the line forward

## 🙏 That He May Minister Unto Me In The Priest's Office

"Minister" means to serve in an official role, not just help out casually.

In the priest's office, Aaron would represent the people before God every day.

He would offer sacrifices, care for the tabernacle, and carry Israel's needs to God.

No ordinary Israelite could walk into that role without being formally set apart.

This office made Aaron the one official link between the nation and its God.

🙏 Minister means to serve officially

🏛️ Aaron represents the people before God

🕯️ He offers sacrifices and tends the tabernacle

📖 The priesthood links the nation to God

## ✨ Holy Garments For Glory And For Beauty

"Glory" here means weight, dignity, and honor.

"Beauty" means genuine visual loveliness, clothes that were pleasing to look at.

These were never meant to be plain, functional work clothes.

Every stitch was designed to make the priesthood look as dignified as its work.

God cared about how His worship looked, not only how it functioned.

✨ Glory means weight and dignity

🎨 Beauty means genuine visual loveliness

👔 The garments were never plain or ordinary

📖 God cared how His worship looked

## 🧠 Wise Hearted, Whom I Have Filled With The Spirit Of Wisdom

God names specific craftsmen and fills them with skill for this exact project.

"Wise hearted" describes people with real hands on ability, not just good intentions.

This is the same kind of gifting chapter thirty one will later name in Bezaleel.

Skilled sewing and metalwork counted as a genuine gift from God's own Spirit.

God does not only inspire prophets and priests, He also equips craftsmen.

🧠 Wise hearted means skilled by hand

🪡 God fills specific craftsmen with skill

🛠️ Chapter thirty one names this gift again

📖 God equips craftsmen, not only priests

## 🕯️ To Consecrate Him

"Consecrate" means to set someone apart as holy for one specific purpose.

Aaron could not simply put on the garments and begin serving that day.

The clothing itself was part of a formal ceremony that made him a priest.

Once consecrated, Aaron belonged to God's service in a way no other Israelite did.

🕯️ Consecrate means set apart as holy

👘 The garments were part of a ceremony

🚫 Aaron could not simply start serving

📖 Consecration changed what Aaron belonged to

## 👑 A Breastplate, And An Ephod, And A Robe, And A Broidered Coat, A Mitre, And A Girdle

God lists six separate garments before a single one has been described in detail.

Each piece will get its own detailed instructions later in the chapter.

Together they formed a full priestly wardrobe unlike anything an ordinary Israelite wore.

No detail was left for Aaron or the craftsmen to decide on their own.

👑 Six garments are named up front

📋 Each piece gets detailed instructions later

🧵 Together they formed a full priestly wardrobe

📖 God left no detail for guesswork

# Exodus 28:5-10
# ✨ The Ephod Of Gold And Blue
---
## 🧵 Gold, And Blue, And Purple, And Scarlet, And Fine Linen

Every priestly garment used the same five materials, gold thread and four colors of cloth.

Blue, purple, and scarlet dye were extremely expensive in the ancient world.

Purple dye especially came from crushed sea snails and cost more than gold.

"Fine linen" means tightly woven, high quality cloth, not the coarse linen common people wore.

These were royal colors, the kind used for kings, not shepherds or slaves.

🧵 Five materials repeat through every garment

🐚 Purple dye came from crushed sea snails

👑 These were the colors of royalty

📖 God dressed the priesthood like kings

## 🥋 The Ephod Of Gold, With Cunning Work

An "ephod" was a decorated vest like garment worn over the robe.

"Cunning work" means expert, highly skilled craftsmanship, not trickery or deception.

Gold thread was woven directly into the cloth alongside the colored fibers.

This single garment took real technical mastery to produce by hand.

🥋 An ephod is a decorated vest

🧠 Cunning work means expert craftsmanship

🧵 Gold thread was woven into the cloth

📖 The ephod demanded real technical mastery

## 🤝 Two Shoulderpieces Thereof Joined At The Two Edges

The ephod had two shoulder straps that joined its front and back panels together.

Picture a modern apron that ties over both shoulders to hold it in place.

Those shoulder straps become important later, since the memorial stones sit on them.

The design was practical first, built to actually stay on during long hours of service.

🤝 Shoulderpieces joined the front and back

👕 Picture an apron worn over both shoulders

💎 The memorial stones will sit here later

📖 Function mattered as much as beauty

## 🎗️ The Curious Girdle Of The Ephod

"Curious" here does not mean odd, it means skillfully and carefully made.

A "girdle" was a woven sash or belt, not underwear in the modern sense.

This sash cinched the ephod snugly around Aaron's body.

It was made of the very same gold and colored thread as the ephod itself.

🎗️ Curious means skillfully made, not odd

🪢 A girdle is a woven sash

👔 It cinched the ephod around the body

📖 Even the belt matched the ephod's material

## 💍 Grave On Them The Names Of The Children Of Israel

"Grave" here means to engrave or carve, the same root word as engraving.

Two onyx stones were cut, six tribal names carved into each one.

Onyx is a smooth banded gemstone, valuable and difficult to carve by hand.

Every tribe's name was permanently fixed in stone before the ephod was ever worn.

💍 Grave means to engrave or carve

🪨 Onyx is a smooth banded gemstone

🔢 Six tribal names were cut into each stone

📖 Every tribe was fixed in stone

# Exodus 28:11-14
# 💍 Stones Of Memorial Upon His Shoulders
---
## 🔏 Like The Engravings Of A Signet

A "signet" was a personal seal ring, pressed into wax or clay to prove identity.

Ancient signets carried a unique design that only their owner used.

Engraving the tribal names with that same careful precision made each name official.

This was not casual scratching, it was formal, permanent identification.

🔏 A signet was a personal seal ring

🖋️ Signets proved identity in the ancient world

✅ The engraving made each name official

📖 This was permanent, formal identification

## 💪 Stones Of Memorial Unto The Children Of Israel

"Memorial" means something kept on purpose so it will not be forgotten.

The stones sat on Aaron's shoulders, the part of the body used for carrying weight.

Aaron literally carried the twelve tribes with him every time he served.

This was not decoration, it pictured the priest bearing Israel's full weight before God.

💪 Memorial means kept so it is not forgotten

🪨 The stones sat on Aaron's shoulders

🏋️ Shoulders are the body's carrying place

📖 Aaron carried Israel's weight before God

## 🥇 Ouches Of Gold

"Ouches" is an old word for gold settings, the sockets that hold a gemstone in place.

Modern jewelry still uses the same idea, just not the same word.

Each onyx stone needed a secure gold frame before it could be attached to the ephod.

A stone this valuable could not simply be glued or tied on loosely.

🥇 Ouches means gold settings for stones

💍 The sockets held each gemstone in place

🔒 A secure frame kept the stones fixed

📖 Valuable stones needed valuable settings

## ⛓️ Two Chains Of Pure Gold, Of Wreathen Work

"Wreathen work" means twisted or braided, like a rope woven from gold wire.

These chains connected the shoulder stones to the breastplate described next.

Pure gold was soft enough to twist by hand but still held its shape.

Every connecting piece on this garment was made from the same costly material.

⛓️ Wreathen work means twisted like a rope

🧑‍🎨 Craftsmen twisted gold wire by hand

🔗 These chains linked the shoulders to the breastplate

📖 Even the connectors were pure gold

# Exodus 28:15-21
# 💎 The Breastplate Of Judgment
---
## ⚖️ The Breastplate Of Judgment

This piece hung over Aaron's chest.

It carried real legal and spiritual weight.

"Judgment" here refers to the rulings and decisions Aaron would make on Israel's behalf.

Verse thirty later explains this breastplate held objects used to seek God's answers.

The name marked it as a tool for decisions, not just a decorated pocket.

⚖️ Judgment means rulings made on Israel's behalf

🫀 The breastplate hung over Aaron's chest

🔮 It later holds tools for seeking God's answers

📖 This was a tool, not decoration

## 📐 Foursquare It Shall Be Being Doubled

"Foursquare" means shaped like a perfect square, equal on every side.

A "span" was an ancient measurement, about the width of a spread hand.

Doubled means the cloth was folded over into a pouch.

A flat panel could not have held anything inside it.

That pouch mattered later, since the Urim and Thummim were kept inside it.

📐 Foursquare means a perfect square shape

✋ A span was about a hand's width

👝 Doubled means folded into a pouch

📖 The pouch held objects used later

## 💎 The First Row Shall Be A Sardius, A Topaz, And A Carbuncle

Twelve different gemstones filled four rows, three stones set in each row.

The first row held a sardius, a topaz, and a carbuncle.

The second row added an emerald, a sapphire, and a diamond.

The third row added a ligure, an agate, and an amethyst.

The fourth row added a beryl, an onyx, and a jasper.

Precious stones like these were rare and costly for anyone outside a king's court.

Together the twelve stones formed a small glittering wall across Aaron's chest.

💎 Twelve stones filled four rows

🌈 Nearly every color of the ancient world appeared

👑 Stones this rare belonged only to royalty

📖 Each stone was different, none repeated

## 🔢 Twelve, According To Their Names

Every single stone carried one tribe's name, not a general symbol for Israel.

Each tribe was represented individually, not folded into one collective idea.

The engraving matched the shoulder stones, formal and permanent.

Aaron carried both the whole nation and each of its twelve parts at once.

🔢 Every stone carried one tribe's name

🧩 Each tribe stayed individually represented

🔏 The engraving was formal and permanent

📖 Aaron carried the whole and every part

# Exodus 28:22-28
# ⛓️ Chains And Rings That Hold It Together
---
## ⛓️ Chains At The Ends Of Wreathen Work Of Pure Gold

These twisted gold chains reappear here, now used to attach the breastplate itself.

The same wreathen, or twisted, technique from the shoulder chains repeats on this piece.

Repeating the same materials and methods tied every part of the priestly garments together.

Nothing about this outfit was mixed and matched from different workshops or styles.

⛓️ The same twisted gold technique repeats here

🔁 Materials and methods matched across the whole garment

🧵 Nothing was mixed from different styles

📖 Every piece was built as one set

## 💍 Two Rings Of Gold On The Two Ends

Gold rings were fixed to the two top corners of the breastplate.

Each ring gave the wreathen chains a fixed point to attach to.

Without these rings, the heavy gemstone panel would have nothing to hang from.

Every attachment point on this garment was planned before a single stone was set.

💍 Rings sat on the breastplate's top corners

🔗 Each ring gave the chains a fixed point

⚖️ The rings supported real weight

📖 Every attachment was planned in advance

## 🔩 Two Other Rings On The Two Sides Of The Ephod

A second, lower set of rings connected the bottom of the breastplate to the belt.

Picture two straps buckled at both the shoulder and the waist.

One connection point alone would let the heavy breastplate swing loose.

High and low connection points kept it steady against his chest.

🔩 A lower set of rings connected the base

🎒 Think of straps buckled at two points

🧍 One connection alone would let it swing loose

📖 Two points kept it steady against his chest

## 🎗️ With A Lace Of Blue

A "lace" here means a cord or thin strip used to bind two things together.

Blue cord tied the lower rings of the breastplate to the ephod's belt.

Blue was already established as a royal, heavenly color throughout this garment.

Even the small cord holding pieces together matched the same deliberate color scheme.

🎗️ Lace means a binding cord

🔵 Blue cord joined the breastplate to the belt

👑 Blue already marked royalty throughout the garment

📖 Even the small cord matched the plan

## 🚫 That The Breastplate Be Not Loosed From The Ephod

God gives a direct command that this piece must never come apart from the ephod.

The breastplate carried Israel's names and the tools used to seek God's decisions.

Something that important could not be allowed to slip, fall, or come untied.

The command turns careful design into a binding rule Aaron had to obey.

🚫 The breastplate could never come loose

📜 It carried Israel's names and God's decisions

⚠️ Something this important could not risk falling

📖 Careful design became a binding command

# Exodus 28:29-30
# 🕊️ Bearing Israel Upon His Heart
---
## 🫀 Aaron Shall Bear The Names Upon His Heart

The shoulder stones showed strength, carrying Israel's names like a weight Aaron bore.

The breastplate sat over the heart instead, the ancient symbol of care and affection.

Together the two pieces pictured a priest who represented Israel in both strength and love.

God wanted Aaron to approach Him remembering the people, not just performing a duty.

🫀 The heart symbolized care, not just strength

💪 Shoulders already pictured carrying and strength

🤝 Together the pieces showed strength and love

📖 Aaron approached God remembering the people

## 🔮 The Urim And The Thummim

These two objects were placed inside the folded pouch of the breastplate.

"Urim" likely means lights, and "Thummim" likely means perfections, though the text does not say for certain.

The text does not describe exactly what they looked like or how they worked.

Many believe Aaron used them to receive a clear yes or no answer from God.

Whatever their exact form, their purpose was hearing from God on Israel's behalf.

🔮 Urim and Thummim sat inside the pouch

💡 Urim likely means lights

✅ Thummim likely means perfections

📖 Their purpose was hearing from God

## ⚖️ Bear The Judgment Of The Children Of Israel

Continually means this did not happen only once.

It was Aaron's ongoing responsibility every time he served.

Every time Aaron entered God's presence, he carried Israel's cases and needs.

This ties directly back to why the piece was called the breastplate of judgment.

The priesthood was never a role Aaron could set down or take a break from.

⚖️ Continually means ongoing, not just once

🚶 Aaron carried Israel's needs every time he entered

🔗 This ties back to the breastplate's name

📖 The priesthood was never off duty

# Exodus 28:31-35
# 🔔 The Robe, The Pomegranates, And The Bells
---
## 🔵 The Robe Of The Ephod All Of Blue

This robe was worn underneath the ephod, covering Aaron from shoulders to ankles.

Unlike the ephod, this piece used only one color, blue, with no gold thread mixed in.

Blue already marked royalty and heaven throughout this chapter's other garments.

A single solid color made this layer simpler, but no less deliberate than the rest.

🔵 The robe was worn under the ephod

📏 It covered Aaron from shoulders to ankles

👑 Blue again marked royalty and heaven

📖 Simple did not mean careless

## 🕳️ The Hole Of An Habergeon

This robe was pulled over the head, so it needed an opening at the top.

A "habergeon" was a coat of mail, a piece of armor worn around the neck.

That opening was reinforced with woven binding so it would resist tearing.

"Rent" means torn, and God specifically commanded this reinforcement to prevent it.

🕳️ The robe had an opening at the top

🛡️ A habergeon was a piece of armor

🧵 Woven binding reinforced the neck opening

📖 Rent means torn, and God prevented it

## 🔔 A Golden Bell And A Pomegranate, Round About The Hem

Around the bottom hem, cloth pomegranates alternated with small golden bells.

A pomegranate was a well known ancient symbol of fruitfulness and blessing.

The pattern repeated all the way around, bell, pomegranate, bell, pomegranate.

Fruit and sound together turned the hem into its own kind of quiet sermon.

🔔 Bells and pomegranates alternated around the hem

🍎 Pomegranates symbolized fruitfulness and blessing

🔁 The pattern repeated with no gaps

📖 Even the hem carried a message

## 👂 His Sound Shall Be Heard, That He Die Not

The bells rang softly with every step Aaron took inside the Holy Place.

That sound told anyone listening outside that the priest was alive and still moving.

Entering God's presence carelessly, or in the wrong garments, carried real danger.

The sound was not decoration, it was a safeguard built into the clothing itself.

👂 The bells rang with every step

✅ The sound proved the priest was alive

⚠️ Approaching God's presence carelessly was dangerous

📖 Safety was sewn into the garment itself

# Exodus 28:36-38
# 🥇 Holiness To The Lord
---
## 🥇 A Plate Of Pure Gold, Holiness To The Lord

A separate gold plate was engraved with one short phrase, Holiness to the Lord.

Pure gold was the most valuable and lasting material used anywhere in this outfit.

Aaron literally wore a declaration about God's character on his own forehead.

Every person who saw him would see that phrase before anything else.

🥇 A gold plate carried one short phrase

✨ Holiness to the Lord was the phrase

👁️ Everyone who saw Aaron saw that phrase first

📖 Gold marked it as the most lasting piece

## 🎗️ Upon The Forefront Of The Mitre

A "mitre" was a wound cloth turban worn on Aaron's head during service.

The gold plate sat on the very front of it.

A blue cord tied the plate onto the turban.

The forehead is the most visible part of a person facing you.

Placing the plate there made sure the phrase was the first thing anyone noticed.

🎗️ A mitre was a wound cloth turban

🔵 A blue cord tied on the plate

👀 The forehead is the most visible spot

📖 The phrase was meant to be noticed first

## 😔 Bear The Iniquity Of The Holy Things

"Iniquity" means guilt or wrongdoing, even the kind done without noticing it.

Even Israel's best gifts and offerings were never perfectly clean or pure.

Aaron symbolically carried that leftover guilt so the gifts could still be accepted.

This pictures a priest absorbing fault on behalf of the people he represents.

It points forward to a much greater priest who would carry sin fully.

😔 Iniquity means guilt, even unnoticed guilt

🎁 Even Israel's best gifts were imperfect

🤲 Aaron symbolically carried that leftover guilt

📖 A greater priest would carry sin fully

# Exodus 28:39-43
# 👖 Garments For All The Priests
---
## 🧵 Embroider The Coat Of Fine Linen

"Embroider" means to stitch decorative patterns directly into the woven cloth.

This coat sat closest to Aaron's body, underneath the blue robe and the ephod.

"Needlework" describes the detailed hand stitching used on the matching girdle.

Even the innermost, least visible layer received the same careful craftsmanship as the rest.

🧵 Embroider means stitching decorative patterns

👕 This coat sat closest to Aaron's body

🪡 Needlework describes the detailed hand stitching

📖 Even the hidden layer was made with care

## 👨‍👩‍👦 For Aaron's Sons Thou Shalt Make Coats

The ordinary priests, Aaron's sons, received their own version of these garments too.

Theirs were simpler than the high priest's, but built with the same purpose.

"Glory and beauty" describes their clothing as well, not only Aaron's.

Every priest who served, not just the one leading, dressed with real dignity.

👨‍👩‍👦 Aaron's sons received their own garments

📉 Their version was simpler than Aaron's

✨ Glory and beauty applied to them too

📖 Every serving priest dressed with dignity

## 🫗 Anoint Them, And Consecrate Them, And Sanctify Them

Three different actions installed a priest into office, not just one.

"Anoint" means to pour oil on someone, marking them as chosen for a task.

"Consecrate" comes from a phrase meaning to fill the hand, an old idiom for taking office.

"Sanctify" means to make holy, set apart from ordinary, everyday use.

All three steps were required together, no shortcut version existed.

🫗 Anoint means pouring oil to mark someone chosen

✋ Consecrate literally means to fill the hand

🕯️ Sanctify means made holy, set apart

📖 All three steps were required together

## 🩲 Linen Breeches To Cover Their Nakedness

These were simple undergarments worn beneath all the other priestly layers.

Many surrounding nations had priests who served with parts of the body exposed.

Israel's priests were required to stay fully covered, even underneath their outer robes.

Modesty at the altar reflected God's holiness, not human embarrassment.

🩲 Breeches were simple undergarments

🙈 Other nations' priests often served exposed

🙏 Israel's priests stayed fully covered

📖 Modesty at the altar reflected God's holiness

## ⚰️ That They Bear Not Iniquity, And Die: It Shall Be A Statute For Ever

Serving at the altar improperly dressed was treated as a life or death matter.

"Statute for ever" means a permanent law, not a temporary rule for one generation.

God set a lasting standard for how anyone would approach Him from now on.

Every detail in this chapter mattered enough to be written down as unchanging law.

⚰️ Improper dress at the altar risked death

📜 Statute for ever means a permanent law

🕰️ The standard applied to every future generation

📖 God treated every detail as unchanging law
`.trim();

export const EXODUS_TWENTY_EIGHT_PERSONAL_SECTIONS = parseExodusTwentyEightRawNotes(EXODUS_TWENTY_EIGHT_RAW_NOTES);
