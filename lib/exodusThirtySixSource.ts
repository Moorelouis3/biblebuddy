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

## 🛠️ Then Wrought Bezaleel And Aholiab, And Every Wise Hearted Man

**"Wrought"** is an old past-tense word for "worked" — the same root as "wrought iron." After two full chapters of instructions and one chapter of gathering materials, this is the moment actual building finally starts. Everything before this verse was planning; this verse is hammers and looms moving.

🛠️ "Wrought" is an old word meaning "worked"

📋 This is the first verse where real building actually begins

🔄 Chapters 25-35 were all planning and gathering, leading to this moment

---

## 🕊️ In Whom The LORD Put Wisdom And Understanding To Know How To Work

This restates, almost word for word, what chapter 31 already said about Bezaleel and Aholiab being personally filled with God's Spirit for this exact task. Skilled craftsmanship is treated here as a genuine spiritual gift, not a lesser, purely human talent separate from what God gives.

🕊️ This echoes chapter 31's description of the Spirit filling these craftsmen

🔨 Skilled craft work is treated as a real spiritual gift, not a lesser talent

📖 Nothing about this chapter's building was left to guesswork or improvisation

---

## 📣 Moses Called Bezaleel And Aholiab, And Every Wise Hearted Man... Whose Heart Stirred Him Up To Come Unto The Work

Moses doesn't draft workers or assign a labor quota. He calls specifically the people whose own hearts were already stirred toward the work, the same "willing heart" language chapter 35 used for the offering itself. The volunteer spirit that supplied the materials also supplies the labor.

📣 Moses calls workers by name, not by forced assignment or quota

❤️ "Heart stirred him up" repeats chapter 35's language for willing givers

🙌 The same volunteer spirit behind the offering now builds the actual object

---

## 💰 They Received Of Moses All The Offering... And They Brought Yet Unto Him Free Offerings Every Morning

The gifts didn't stop once construction started. People kept bringing fresh offerings **every morning**, even as the craftsmen were already at work, showing this wasn't a one-time collection but an ongoing outpouring that had to be actively managed.

💰 Offerings kept arriving fresh every single morning, not just once

📈 This shows sustained generosity, not a single one-time collection

⚙️ The craftsmen had to actively receive and manage an ongoing flow of gifts

---

## 🚶 The Wise Men... Came Every Man From His Work Which They Made; And They Spake Unto Moses

The skilled craftsmen actually leave their workstations mid-task to go find Moses. Stopping real construction work to report a problem tells you how serious and unusual the situation had become — this wasn't a minor comment in passing.

🚶 The craftsmen physically stopped building to go speak with Moses directly

⏸️ Pausing real work to report something shows how serious this was

🗣️ This is a direct, in-person report, not a rumor passed along

---

## 📊 The People Bring Much More Than Enough For The Service Of The Work

This is a strange complaint by any normal standard: not a shortage, but a surplus so large it had become a logistics problem. Compare this to almost every other ancient building project in the world, funded by taxes, tribute, or forced labor — here the challenge was too much free generosity, not too little.

📊 The complaint here is surplus, not shortage — an unusual problem to have

🏛️ Most ancient building projects struggled with too little funding, not too much

✨ This is a direct result of the willing-heart giving described in chapter 35

---

## 🛑 Moses Gave Commandment... Let Neither Man Nor Woman Make Any More Work For The Offering Of The Sanctuary

Moses has to formally stop the giving, having it announced camp-wide. This is the only place in the whole tabernacle story where a leader has to actively restrain generosity instead of calling for more of it.

🛑 Moses issues a formal, camp-wide order to stop bringing gifts

📢 It's proclaimed publicly, reaching the entire nation at once

🔄 This flips the usual pattern — restraining giving instead of requesting it

---

## ⛔ So The People Were Restrained From Bringing

Notice the word **"restrained"** — it took active effort to hold people back, implying many still wanted to give even after hearing the announcement. The same nation that once gave gold too eagerly for a golden calf in chapter 32 now gives too eagerly for the right thing.

⛔ "Restrained" implies real effort was needed to actually stop the giving

🔄 The same eager-giving instinct from chapter 32's calf now serves God rightly

❤️ People kept wanting to give even after being told they could stop

---

## ✅ For The Stuff They Had Was Sufficient For All The Work To Make It, And Too Much

The chapter's opening scene closes with this plain summary: total, overflowing sufficiency. Every single material listed back in chapter 35's offering call — gold, silver, linen, wood, oil, gemstones — actually arrived in full, and then some.

✅ Every material category requested in chapter 35 arrived in full supply

🎯 "Too much" closes the giving story on total abundance, not scarcity

🏗️ With materials fully settled, the chapter turns to the actual construction

# Exodus 36:8-13

# 🧵 The Curtains, Actually Made

---

## 🎨 Every Wise Hearted Man... Made Ten Curtains Of Fine Twined Linen, And Blue, And Purple, And Scarlet

These are the same four costly materials named back in chapter 25's original offering list, now actually being woven into fabric by hand. Blue, purple, and scarlet were expensive dyes reserved for royalty and the wealthy in the ancient world, not everyday clothing colors.

🎨 These are the same royal materials first listed in chapter 25's offering call

👑 Blue, purple, and scarlet dyes were expensive, associated with royalty

🧵 What was raw offered material in chapter 35 is now finished fabric

---

## 👼 With Cherubims Of Cunning Work Made He Them

**"Cunning work"** is an old phrase meaning highly skilled, artistic craftsmanship — not trickery, which is what the word suggests today. These guardian-figure images, matching the cherubim overshadowing the mercy seat inside the ark, were woven directly into the innermost fabric layer covering the whole structure.

👼 "Cunning work" means expert craftsmanship, not deception

🏠 Cherubim were woven right into the fabric, not painted or added on

🔁 This matches the cherubim already on the mercy seat inside the ark

---

## 📏 The Length Of One Curtain Was Twenty And Eight Cubits, And The Breadth... Four Cubits

At roughly a foot and a half per cubit, each curtain measured about forty-two feet long and six feet wide — massive pieces of hand-woven fabric for people living as nomads in tents. This matches chapter 26's blueprint measurement exactly, down to the cubit.

📏 Each curtain measured roughly 42 feet long and 6 feet wide

🏕️ This was an enormous weaving project for a desert-dwelling, tent-based people

✅ The measurement matches chapter 26's original blueprint exactly

---

## 🔗 He Coupled The Five Curtains One Unto Another: And The Other Five Curtains He Coupled One Unto Another

The ten curtains were sewn into two separate panels of five each before being joined into one, rather than stitched together one at a time in a single long strip. This two-panel method made the massive covering easier to manage during both weaving and eventual transport.

🔗 The ten curtains formed two panels of five, not one continuous strip

🎒 Working in two sections made both weaving and later transport more manageable

📐 The final result still had to become a single seamless covering

---

## 🪡 He Made Loops Of Blue On The Edge Of One Curtain From The Selvedge In The Coupling

A **"selvedge"** is the self-finished edge of a woven fabric that won't fray or unravel — every hand-loomed fabric naturally has one. Loops made of blue thread were sewn along this edge specifically so the two five-curtain panels could later be joined together.

🪡 A "selvedge" is the natural, non-fraying edge of woven fabric

🔵 Loops of blue thread were sewn along this edge for later joining

🧩 This detail shows real weaving expertise, not simple sewing

---

## 🔢 Fifty Loops Made He In One Curtain... The Loops Held One Curtain To Another

Fifty matching loops lined the edge of each five-curtain panel, precisely spaced to align with fifty loops on the other panel. That kind of exact matching, fifty to fifty, required careful measuring throughout the entire weaving process, not just at the final assembly.

🔢 Fifty loops on each panel had to align exactly with fifty on the other

📏 This required precise measuring throughout the weaving, not just at the end

🤝 The two panels were designed from the start to fit together perfectly

---

## 🥇 He Made Fifty Taches Of Gold, And Coupled The Curtains Together: So It Became One Tabernacle

**"Taches"** is an old word for clasps or hooks. Fifty gold clasps locked the two panels into a single covering, and the text specifically says the result **"became one tabernacle"** — not two halves joined, but one unified structure, exactly as chapter 26 had specified it should be.

🥇 "Taches" are clasps or hooks, here made of solid gold

☝️ The text emphasizes "one tabernacle," not two halves merely attached

✅ This fulfills chapter 26's instruction for this exact layer, word for word

# Exodus 36:14-19

# ⛺ The Tent's Protective Layers

---

## 🐐 He Made Curtains Of Goats' Hair For The Tent Over The Tabernacle: Eleven Curtains He Made Them

A second, plainer layer went directly over the beautiful cherubim-woven linen: coarse goats' hair, the standard material used for ordinary desert tents throughout the ancient Near East. Notice there are eleven curtains here, one more than the ten linen curtains beneath.

🐐 Goats' hair was the standard material for everyday desert tents

🔢 Eleven goat-hair curtains is one more than the ten linen curtains below

📊 That extra curtain has a specific purpose explained a few verses later

---

## 📏 The Length Of One Curtain Was Thirty Cubits, And Four Cubits Was The Breadth

At roughly a foot and a half per cubit, each of these curtains measured about forty-five feet long, three feet longer than the linen curtains beneath. The extra length let this outer layer hang down and fully cover the more delicate, precious fabric underneath on every side.

📏 Each curtain measured about 45 feet long, longer than the linen layer

🛡️ The extra length let this tough outer layer fully cover the fabric beneath

🔒 This protected the costly linen and cherubim work from weather exposure

---

## 🔀 He Coupled Five Curtains By Themselves, And Six Curtains By Themselves

Unlike the linen layer's even five-and-five split, this layer was grouped five and six — an uneven pairing that puts the extra eleventh curtain into the larger group of six, right where it's needed at the tent's front.

🔀 This layer splits five and six, unlike the linen layer's even five and five

➕ The extra eleventh curtain sits inside the larger six-curtain group

🚪 That placement points toward the entrance, covered a few verses later

---

## 🔢 He Made Fifty Loops Upon The Uttermost Edge Of The Curtain In The Coupling

The same loop-and-clasp joining method used for the inner linen layer is reused here for the outer goat-hair layer: fifty matching loops on each panel's edge. Reusing one proven system for both layers made a massive, complex structure buildable by hand.

🔢 The same fifty-loop joining system from the linen layer is reused here

🛠️ Reusing one proven method made this massive structure buildable by hand

🔁 Consistency in method, not just materials, runs through the whole design

---

## 🥉 He Made Fifty Taches Of Brass To Couple The Tent Together, That It Might Be One

The clasps joining this outer layer were brass, not the gold used for the linen layer beneath it. This matches a consistent pattern seen throughout the tabernacle's construction: gold marks what's closest to the sacred center, and plainer metal marks the more exposed, outer layers.

🥉 These clasps were brass, unlike the gold clasps of the linen layer

📉 Brass consistently marks the more exposed, outer parts of the structure

🎯 This same gold-to-brass gradient runs throughout the whole design

---

## 🐏 He Made A Covering For The Tent Of Rams' Skins Dyed Red

A third layer, dyed red ram hide, went directly over the goat-hair tent. Tanned and dyed leather was a durable, weatherproof material, adding real protection on top of the woven layers beneath it against sun, wind, and the rare desert rain.

🐏 Dyed red ram hide formed a third, more weatherproof layer

🌧️ Tanned leather added real protection against sun, wind, and rain

🎨 The red dye kept even this practical layer visually rich, not plain

---

## 🦫 And A Covering Of Badgers' Skins Above That

Most scholars think **"badgers' skins"** mistranslates an unclear Hebrew word, since actual badgers didn't live in this desert region. It more likely refers to the tough, waterproof hide of a sea creature like a dolphin or dugong, forming the tabernacle's final, plain, weatherproof outer roof.

🦫 "Badgers' skins" likely mistranslates a word for waterproof sea-creature hide

🐬 A dugong or dolphin hide is the more likely source material

🎭 This final plain layer gave no outward hint of the glory hidden inside

# Exodus 36:20-24

# 🪵 Boards For The South Side

---

## 🏗️ He Made Boards For The Tabernacle Of Shittim Wood, Standing Up

Underneath every curtain layer stood the tabernacle's real skeleton: upright boards of shittim (acacia) wood, the same rot-resistant desert timber already used for the ark and table. This was a genuine wooden structure with curtains draped over it, not a simple cloth tent held up by poles alone.

🏗️ Shittim (acacia) wood boards formed the tabernacle's actual wooden frame

🌳 This is the same durable desert wood already used for the ark and table

⛺ Curtains were draped over this frame, not just held up by simple poles

---

## 🎒 Built To Come Apart Again

Despite looking like a permanent wooden building, this entire frame was designed to be taken apart and rebuilt at every campsite. Numbers 4:31-32 later assigns one specific Levite family, the Merarites, to the job of carrying these exact boards, bars, pillars, and sockets whenever Israel moved.

🎒 This wooden frame was fully designed to be disassembled and rebuilt

📦 Numbers 4 names a specific Levite family assigned to carry these pieces

🚶 A structure this solid still had to travel with a nomadic nation

---

## 📐 The Length Of A Board Was Ten Cubits, And The Breadth Of A Board One Cubit And A Half

At roughly a foot and a half per cubit, each board stood about fifteen feet tall and just over two feet wide. A wall built from boards this size had genuine height and solid structure, not a low, sagging tent roof.

📐 Each board stood about 15 feet tall and just over 2 feet wide

🏠 A structure built from boards this size had real height, not a low tent

🧱 Twenty of these boards, side by side, formed one entire long wall

---

## 🔩 One Board Had Two Tenons, Equally Distant One From Another

**"Tenons"** are wooden projections carved into the bottom of a board, designed to fit precisely into matching sockets below — the same basic joinery principle still used in fine woodworking today. Every board had to be shaped to fit its own exact spot, like a puzzle piece cut by hand.

🔩 Tenons are wooden pegs carved to fit precisely into sockets below

🧩 Each board was custom-shaped to fit its own specific spot in the wall

🛠️ This is the same basic joinery principle still used in woodworking today

---

## 🧭 He Made Boards For The Tabernacle; Twenty Boards For The South Side Southward

The south wall gets built first, using twenty boards of matching size. Naming a direction this specifically (south, and later north and west) confirms the tabernacle had one fixed, deliberate orientation, not a random or arbitrary layout.

🧭 The south wall was built first, using twenty matching boards

🧭 Naming exact directions shows the tabernacle had one fixed orientation

📖 This matches chapter 26's original blueprint for the same wall

---

## 🥈 Forty Sockets Of Silver He Made Under The Twenty Boards; Two Sockets Under One Board

Each board rested on two silver sockets, meaning this entire wall literally stood on a foundation of silver. Chapter 30 later explains this silver came from a required "atonement money" collected from every counted Israelite, so the tabernacle's very foundation was funded by redemption money, not ordinary taxes.

🥈 Every board rested on two silver sockets as its literal foundation

💰 Chapter 30 explains this silver came from required "atonement money"

🩸 The wall's foundation was funded by redemption money, not ordinary taxes

---

## 🔩 Two Sockets Under One Board For His Two Tenons

The pairing here matters: each board's two wooden tenons each got their own separate silver socket to sit in, rather than both pegs sharing one wide slot. Two fixed points instead of one kept a fifteen-foot-tall board from twisting or rocking side to side once it was standing.

🔩 Each of a board's two tenons had its own separate silver socket

⚖️ Two fixed points, not one, kept a tall board from twisting or rocking

🧱 This small detail mattered for the stability of the whole standing wall

# Exodus 36:25-30

# 🧱 North, West, And The Corners

---

## 🧭 For The Other Side Of The Tabernacle, Which Is Toward The North Corner, He Made Twenty Boards

The north wall is built to exactly match the south wall from the previous section: same count, same size, same silver sockets. Symmetry, not variation, was the rule for the tabernacle's long sides.

🧭 The north wall exactly matches the south wall in count and size

⚖️ Symmetry between the two long walls was the deliberate design rule

📖 This mirrors chapter 26's blueprint for the north side just as precisely

---

## 🥈 And Their Forty Sockets Of Silver; Two Sockets Under One Board, And Two Sockets Under Another Board

The exact same silver-sockets-under-every-board pattern repeats here without any change, confirming both long walls of the structure shared one identical foundation system throughout.

🥈 The same two-silver-sockets-per-board pattern repeats without change

🔁 Both long walls of the structure share one identical foundation system

🧱 Forty total silver sockets support each twenty-board wall

---

## 🌅 And For The Sides Of The Tabernacle Westward He Made Six Boards

The back wall, facing west, was shorter than the two long side walls — only six boards instead of twenty. This made the tabernacle's overall footprint a rectangle, not a square, roughly fifteen feet wide by forty-five feet long.

🌅 The west-facing back wall used only six boards, far fewer than the sides

📐 This made the tabernacle a rectangle, not a square, in overall shape

🧭 The entrance faced east, opposite this shorter back wall

---

## 📐 And Two Boards Made He For The Corners Of The Tabernacle In The Two Sides

Two extra boards were built specifically for the two back corners, where the long side walls met the shorter back wall. Corners are structurally the weakest point in any framed building, so this detail shows real engineering care, not just a simple box shape.

📐 Two extra boards reinforced the two rear corners specifically

🏗️ Corners are typically the weakest point of a framed structure

🛠️ This detail reflects real structural engineering, not a simple box design

---

## 💍 And They Were Coupled Beneath

Locking the corner boards together at the bottom, near ground level, kept the base of the corner from spreading apart under the weight and pull of the walls meeting there. This is the first of two separate connection points named for this one joint.

💍 The bottom connection point kept the corner from spreading apart

🏗️ This is the first of two separate joints named for this single corner

🌬️ A stable base mattered most where two heavy walls actually met

---

## 🔗 And Coupled Together At The Head Thereof, To One Ring

**"Head thereof"** means the top of the corner. A single ring at the very top tied both corner boards together as one unit, so the corner was locked at both the bottom and the top, not just one end, making the whole frame far more rigid against desert winds.

🔗 "Head thereof" means the top of the corner boards

🌬️ Locking both the top and bottom made the frame far more wind-resistant

🔒 One ring at the top tied both corner boards into a single unit

---

## 🔢 There Were Eight Boards; And Their Sockets Were Sixteen Sockets Of Silver

This closing tally confirms the west wall's total: six flat boards plus two corner boards equals eight, resting on sixteen silver sockets (two per board). The careful counting throughout this section shows nothing here was left approximate.

🔢 Six flat boards plus two corner boards totals eight for the west wall

🥈 Sixteen silver sockets support these eight boards, two per board

✅ This careful tally confirms nothing in the frame was left approximate

# Exodus 36:31-34

# 🔗 The Bars That Locked It Together

---

## 🪵 He Made Bars Of Shittim Wood; Five For The Boards Of The One Side Of The Tabernacle

Long horizontal bars, also cut from acacia wood, threaded through rings attached to the boards, running the length of each wall to lock the upright boards together side to side. Without these bars, each board would have stood alone and unstable.

🪵 Horizontal bars connected the boards side to side along each wall

🔗 Without these bars, each individual board would have stood alone

🧱 Five bars ran the length of the south wall specifically

---

## 🔁 And Five Bars For The Boards Of The Other Side... And Five Bars For The Boards... For The Sides Westward

The same five-bar system repeats for the north wall and, in an adjusted form, for the shorter west wall, tying the entire wooden frame into one connected, wind-resistant structure rather than three separate walls simply standing next to each other.

🔁 Five bars reinforced the north wall, matching the south wall exactly

🧩 An adjusted version of the same system secured the shorter west wall

🏗️ This turned three separate walls into one single, connected structure

---

## 🎯 He Made The Middle Bar To Shoot Through The Boards From The One End To The Other

**"Shoot through"** is an old way of saying "pass through" or "run through," not related to shooting a weapon. Unlike the other bars, which likely ran in shorter connected sections, this single central bar ran the entire length of each wall in one piece, hidden inside the boards themselves.

🎯 "Shoot through" is an old phrase meaning "pass through," not a weapon

📏 This central bar ran the full length of the wall in a single piece

👁️ It stayed completely hidden inside the boards, unseen but essential

---

## ✨ He Overlaid The Boards With Gold, And Made Their Rings Of Gold To Be Places For The Bars

Every board, and every connecting ring the bars passed through, was covered in gold — hidden structural pieces no visitor would ever see got the same treatment as the most visible furniture. The standard was gold throughout the frame, not gold only where people could look at it.

✨ Even hidden structural boards and rings were covered in gold

👁️ No visitor would ever see this gold, since it was inside the walls

🎯 The standard was gold throughout, not gold only where it would be seen

---

## 🥇 And Overlaid The Bars With Gold

The bars sliding through those gold rings were themselves gold-covered too, meaning the entire internal skeleton of the tabernacle's walls, boards, rings, and bars alike, was gold from the inside out, matching the same total-coverage standard already used on the ark in chapter 25.

🥇 The bars themselves were also fully overlaid with gold, inside and out

🔁 This matches the ark's identical gold overlay of surfaces no one would see

🏛️ The entire wall skeleton, not just the outer decoration, was gold-covered

# Exodus 36:35-38

# 🚪 The Veil And The Door

---

## 🎨 He Made A Vail Of Blue, And Purple, And Scarlet, And Fine Twined Linen: With Cherubims Made He It Of Cunning Work

**"Vail"** is the old spelling of veil. This curtain, dividing the Holy Place from the innermost Most Holy Place, used the exact same royal colors and cherubim imagery as the outermost linen layer covering the whole tabernacle — the same level of craftsmanship as the walls surrounding the ark itself.

🎨 "Vail" is simply the old spelling of veil

👑 It used the same royal colors and cherubim imagery as the linen ceiling

🚧 This marked it as the most sacred barrier inside the entire structure

---

## 🪵 He Made Thereunto Four Pillars Of Shittim Wood, And Overlaid Them With Gold

Four gold-covered wooden pillars held the veil in place inside the tabernacle, standing between the Holy Place and the Most Holy Place. Because this veil stood deep inside the sacred interior, its pillars got the same fully gold-covered treatment as the ark and the boards, not a lesser finish.

🪵 Four gold-covered pillars held the veil upright inside the sanctuary

📍 These pillars stood between the Holy Place and the Most Holy Place

✨ Being deep inside the sacred space, they received a full gold covering

---

## 🥇 Their Hooks Were Of Gold; And He Cast For Them Four Sockets Of Silver

Even the small hooks holding the veil onto its pillars were gold, and the pillars themselves stood on silver sockets, matching the silver-footed boards forming the tabernacle's walls. Every detail this deep inside the structure followed the same gold-and-silver standard, nothing downgraded.

🥇 Even the small hooks attaching the veil were made of gold

🥈 These pillars stood on silver sockets, matching the wall boards nearby

🎯 Nothing this deep inside the structure used a lesser material

---

## 🪡 He Made An Hanging For The Tabernacle Door Of Blue, And Purple, And Scarlet, And Fine Twined Linen, Of Needlework

**"Needlework"** describes embroidery, a real skill but one step simpler than the "cunning work" used for the inner veil. The entrance screen, the part every ordinary priest would actually see and pass through daily, used the same rich colors as the veil but with less elaborate craftsmanship than what stood hidden deepest inside.

🪡 "Needlework" means embroidered work, a simpler skill than "cunning work"

🚪 This is the entrance screen every ordinary priest would see and use daily

📉 The most public-facing part used less elaborate craft than the hidden veil

---

## 🥉 And The Five Pillars Of It With Their Hooks: And He Overlaid Their Chapiters And Their Fillets With Gold: But Their Five Sockets Were Of Brass

**"Chapiters"** are the decorative tops (capitals) of the pillars, and **"fillets"** are decorative connecting bands or rings around them — both gold-covered here, just like the inner veil's pillars. But these entrance pillars stood on brass sockets, not silver, matching the established pattern of gold nearest the center, silver in between, and brass at the outermost, most public edge.

🥉 "Chapiters" are pillar-top capitals; "fillets" are decorative connecting bands

📊 These parts were gold, but the entrance pillars' sockets were brass, not silver

🎯 This closes out the whole chapter on the same gold-silver-brass gradient

---

## ✅ The Blueprint, Finally Built

From the ten cherubim-woven curtains in verse 8 through this final brass-socketed doorway, this chapter has followed chapters 25 through 31's original mountain instructions in the same order, almost word for word, without a single deviation. What God privately showed Moses on the mountain has now, publicly and physically, actually been built.

✅ This chapter follows chapters 25-31's blueprint in order, without deviation

⛰️ What God privately showed Moses has now become a real, physical building

🏗️ The next chapter turns to the ark and furniture placed inside this frame`;

export const EXODUS_THIRTY_SIX_PERSONAL_SECTIONS = parseExodusThirtySixRawNotes(EXODUS_THIRTY_SIX_RAW_NOTES);
