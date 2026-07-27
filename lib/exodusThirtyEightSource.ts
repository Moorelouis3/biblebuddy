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

# 🔥 The Altar Of Burnt Offering, Finally Built

---

## 🪵 He Made The Altar Of Burnt Offering Of Shittim Wood

This altar was already fully described back in chapter 27:1-8 as part of God's building instructions; now, seven chapters later, it actually gets built. **"Shittim"** wood is acacia, the same hard desert timber used for nearly every wooden piece in the tabernacle, chosen because it resists rot and insects far better than most trees available in the Sinai wilderness.

📖 Chapter 27:1-8 already gave the instructions; this verse shows the work done

🌵 "Shittim" wood is acacia, a durable desert timber

🪵 It's the same wood used for nearly every wooden tabernacle piece

---

## 📏 Five Cubits...Five Cubits...Foursquare...Three Cubits

A **"cubit"** measured roughly a foot and a half, the distance from an adult's elbow to fingertip. That makes this altar about seven and a half feet square and four and a half feet tall. **"Foursquare"** simply means the base was an equal-sided square, not a rectangle. This altar stood at the entrance of the court, and every animal sacrifice in Israel's worship passed over it.

📏 A cubit is about a foot and a half, elbow to fingertip

◻️ "Foursquare" means an equal-sided square base

🔥 About 7.5 feet square and 4.5 feet tall, set at the court's entrance

---

## 🔺 He Made The Horns Thereof On The Four Corners Of It

**"Horns"** were raised, pointed projections carved out of the same wood as the rest of the altar, one rising from each top corner. Blood from sacrifices was applied to these exact horns, and later in the Bible a person could grab hold of an altar's horns while pleading for mercy or protection.

🔺 "Horns" are raised projections at each of the altar's four corners

🩸 Sacrificial blood was applied directly to these horns

🙏 People later grabbed an altar's horns while pleading for mercy

---

## ✨ He Overlaid It With Brass

Unlike the ark, the mercy seat, and the table inside the tabernacle, which were all covered in gold, this altar got brass instead. The metal used on each object followed a pattern: gold stayed inside the tabernacle for the most holy furniture, while brass covered anything standing outside in the court, exposed to weather, fire, and constant use.

✨ Gold covered the holy objects inside; brass covered the outer court items

🔥 Brass could handle the heat and use of a constantly burning altar

🚪 The metal itself marked how close an object stood to God's presence

---

## 🍲 All The Vessels...The Pots, And The Shovels...And The Firepans

**"Pots"** collected the ashes that built up under the fire, and **"shovels"** and **"firepans"** were used to clean out and carry those ashes and hot coals. Every one of these ash-and-fire tools was made of brass, strong enough to survive constant heat without wearing out.

🍲 Pots collected ashes; shovels and firepans cleared and carried them

🔥 Brass tools could handle constant heat without breaking down

🧹 These were the daily maintenance tools for keeping the fire going

---

## 🩸 The Basons, And The Fleshhooks

**"Basons"** were bowls used to catch and carry the blood of the sacrifices, and **"fleshhooks"** were large forks used to handle raw meat on the altar. Together with the tools in the last verse, this gives the altar a complete brass toolkit: one set for fire and ash, one set for blood and meat.

🩸 Basons caught and carried sacrificial blood

🍖 Fleshhooks were large forks for handling meat on the fire

🧰 The altar came with a complete, purpose-built brass toolkit

---

## 🕸️ A Brasen Grate Of Network Under The Compass Thereof

The **"grate of network"** was a bronze mesh or grid set inside the hollow altar, roughly halfway up. It let air reach the fire from underneath and let ashes fall through, instead of just piling up and smothering the flames.

🕸️ The grate was a bronze mesh set inside the hollow altar

💨 It let air reach the fire and let ashes fall through

🔥 This kept the sacrifice burning properly instead of smothering

---

## 💍 He Cast Four Rings For The Four Ends Of The Grate

**"Cast"** means the brass was melted and poured into a mold. These four rings were attached to the grate itself, partway up the altar's sides, rather than to the top rim -- a lower attachment point kept the altar balanced while it was carried on poles.

💍 "Cast" means the brass was melted and poured into a mold

⚖️ Attaching the rings partway up kept the altar balanced when carried

🚶 The design let priests move the altar without tipping it

---

## 🪵 He Made The Staves Of Shittim Wood, And Overlaid Them With Brass

The carrying poles matched the same acacia-wood-and-metal-overlay pattern used for every other piece of tabernacle furniture, just in brass instead of gold. One proven design served the whole project.

🪵 Same acacia-wood pole design used throughout the tabernacle

✨ Overlaid in brass to match this altar's outer-court status

🔁 One reliable design, reused for every piece of furniture

---

## 🚶 He Put The Staves Into The Rings...To Bear It Withal

This verse shows the command from chapter 27:6-7 actually carried out -- the poles slid into the rings, ready to carry the altar the moment Israel broke camp. Like the ark's staves, these were meant to stay in place, keeping the altar always travel-ready.

📖 This fulfills the instruction already given in chapter 27:6-7

🏕️ The altar stayed ready to move the instant the camp broke

✅ Matching the plan exactly, verse for verse

---

## ◻️ He Made The Altar Hollow With Boards

Despite its brass covering, the altar wasn't a solid metal block -- it was built from wooden boards, hollow on the inside, then covered in brass like everything else. A solid brass altar that size would have been far too heavy to carry through the wilderness.

◻️ The altar was hollow wooden boards, not solid metal

⚖️ A solid brass altar would have been too heavy to transport

🚚 Hollow construction kept it light enough for the journey ahead

# Exodus 38:8

# 🪞 The Bronze Basin Made From Mirrors

---

## 🪞 He Made The Laver Of Brass, And The Foot Of It Of Brass

The **"laver"** was a large bronze basin where priests washed their hands and feet before entering the tabernacle or approaching the altar, a requirement first commanded back in chapter 30:17-21. The **"foot"** was the pedestal or stand that held the basin up off the ground.

🪞 The laver was a large basin for priests to wash before serving

📖 Chapter 30:17-21 first commanded this washing requirement

🦶 The "foot" was the stand or pedestal holding the basin up

---

## 🔍 Of The Lookingglasses Of The Women Assembling

**"Lookingglasses"** means mirrors -- in the ancient world, mirrors were made of polished bronze or copper, not glass, since glass mirrors didn't exist yet. Bronze mirrors were personal, valuable items, and here a group of women gave up their own mirrors so the metal could be melted down and reshaped into this basin.

🔍 "Lookingglasses" are mirrors, made of polished bronze in this era

💎 Personal mirrors were valuable, prized possessions in that culture

🔥 The women's mirrors were melted down to form the laver

---

## 🚪 Which Assembled At The Door Of The Tabernacle Of The Congregation

This phrase describes a specific group of women who regularly gathered or served at the tabernacle's entrance. Scripture doesn't say exactly what their role involved, but the same unusual phrase reappears far later in 1 Samuel 2:22, suggesting women serving at the tabernacle's door was an ongoing practice across Israel's history, not a one-time detail.

🚪 A specific group of women regularly gathered at the tabernacle entrance

📖 The same phrase reappears in 1 Samuel 2:22, generations later

👩 This points to an ongoing tradition of women serving there

---

## 💭 Turning Vanity Into Washing

A mirror is normally used to check your own appearance. Here, that exact kind of object was melted down and reshaped into the basin priests used to wash before meeting with God -- an object for looking at yourself became an object for getting clean before Him.

💭 Mirrors, made for checking appearance, became a washing basin

🧼 The laver's whole purpose was cleansing before approaching God

✨ A costly personal item was reshaped for corporate worship

# Exodus 38:9-13

# 🏕️ The Court's Four Walls Of Linen

---

## 🧵 The Hangings Of The Court Were Of Fine Twined Linen, An Hundred Cubits

**"Hangings"** were tall linen curtains that formed the court's outer wall, stretching about 150 feet along the south side alone. **"Fine twined linen"** meant each individual thread was itself twisted together from several finer threads first, making a stronger, higher-quality fabric than ordinary weaving.

🧵 "Hangings" were tall linen curtains forming the court's walls

📏 The south wall alone stretched about 150 feet

🪢 "Twined" linen used threads twisted from several finer strands

---

## 🏛️ Their Pillars Were Twenty, And Their Brasen Sockets Twenty

**"Pillars"** were upright wooden posts holding the curtain wall up, each one set into its own brass **"socket"** -- a heavy base that anchored the post in the ground. One socket served one pillar, all the way around the court.

🏛️ Pillars were upright wooden posts holding up the curtain wall

🪨 Each pillar sat in its own heavy brass socket for stability

1️⃣ One socket per pillar, all the way around

---

## 🪝 The Hooks Of The Pillars And Their Fillets Were Of Silver

**"Hooks"** held the linen curtain onto each pillar, and **"fillets"** were connecting bands or rods linking the pillars together like a rail. Even though the heavy base sockets were brass, anything that actually touched or connected to the curtain itself was made of silver.

🪝 Hooks attached the curtain directly to each pillar

🔗 Fillets were connecting bands linking pillars together

🥈 Silver was used for anything touching the curtain, brass for the base

---

## 🧭 For The North Side The Hangings Were An Hundred Cubits

The north wall repeated the exact same measurements, pillar count, and materials as the south wall. This mirrored symmetry shows the court was designed as a rectangle with matching long sides, not built piece by piece with no plan.

🧭 The north wall matched the south wall exactly

◻️ The matching sides confirm a planned rectangle, not guesswork

🔁 Repeating identical measurements twice shows careful design

---

## 🌅 For The West Side Were Hangings Of Fifty Cubits, Their Pillars Ten

The west wall was half the length of the north and south walls -- about 75 feet instead of 150 -- with exactly half as many pillars, ten instead of twenty. That keeps the same spacing between pillars all the way around, roughly one every five cubits.

🌅 The west wall was half the length of the north and south walls

🏛️ Ten pillars instead of twenty, keeping the same even spacing

📐 About one pillar every five cubits, all the way around

---

## 🌄 For The East Side Eastward Fifty Cubits

The east wall matched the west wall's length, but the east side wasn't a solid wall -- it held the court's only entrance, described in the next section. The tabernacle's entrance always faced east, the same direction the entrance to Eden faced before it was guarded and closed in Genesis 3:24.

🌄 The east wall matched the west wall's length exactly

🚪 The east side held the court's only entrance gate

🌳 Eden's entrance also faced east, guarded shut in Genesis 3:24

---

## 📐 Twenty Pillars, Then Ten: A Repeated Design Module

Look at the pattern across all four walls: twenty pillars for a hundred-cubit wall, ten pillars for a fifty-cubit wall. The ratio never changes. The builders weren't inventing each wall separately -- they were repeating one fixed unit of "one pillar per five cubits" around the entire perimeter.

📐 The pillar-to-length ratio stayed identical on every wall

🔁 One repeating design unit built the whole perimeter

🛠️ This consistency reflects careful, unified planning, not improvisation

# Exodus 38:14-17

# 🚪 Measuring The Gate Itself

---

## 📏 The Hangings Of The One Side Of The Gate Were Fifteen Cubits

The east wall totaled fifty cubits, but it wasn't one unbroken curtain -- part of it was a plain linen wall like the other three sides, and part of it was the decorated entrance itself. This verse covers the plain linen section on one side of that entrance, about twenty-two feet long.

📏 The east wall's fifty cubits weren't all one unbroken curtain

🧵 Part was plain linen wall; part was the decorated entrance

📐 This stretch measured about twenty-two feet

---

## ↔️ For The Other Side Of The Court Gate...Fifteen Cubits

The same fifteen-cubit stretch of plain linen wall appeared on the opposite side of the entrance too, with its own three pillars and three sockets. That leaves a twenty-cubit gap in the middle -- fifty total minus fifteen and fifteen -- for the entrance itself.

↔️ A matching fifteen-cubit plain wall sat on the entrance's other side

➗ Fifty cubits minus fifteen and fifteen leaves twenty cubits for the gate

🚪 That twenty-cubit gap was the actual entrance opening

---

## 🧵 All The Hangings Of The Court Round About Were Of Fine Twined Linen

This closing line confirms that every wall of the court, all the way around, used the identical high-quality linen fabric. The colorful, embroidered material was saved for only one spot -- the entrance screen itself, covered in the next section.

🧵 Every wall of the court used the same plain linen fabric

🎨 Color and embroidery were reserved for the entrance alone

🚪 That contrast made the gate stand out from the rest of the fence

---

## 🥉 The Sockets For The Pillars Were Of Brass

This restates the pattern already seen throughout the chapter: brass for the heavy foundation pieces buried in the ground, silver for the visible hardware attached to the curtains and pillar tops.

🥉 Brass was used for every buried foundation socket in the court

🥈 Silver was used for the visible hardware people could see and touch

🏗️ This metal hierarchy repeats consistently across the whole structure

---

## 🪝 The Hooks Of The Pillars And Their Fillets Of Silver

The same silver hooks-and-fillets combination already described for the north and south walls covered the gate area's pillars too, keeping the whole perimeter's hardware consistent.

🪝 The same silver hooks-and-fillets design continued around the gate

🔁 Consistency in materials ran through the entire court boundary

🥈 Nothing about the gate area's hardware was left inconsistent

---

## 👑 The Overlaying Of Their Chapiters Of Silver

A **"chapiter"** is the capital, the decorative cap that sits on top of a pillar like a crown. Every pillar around the whole court, roughly sixty of them in total, had its top covered in silver.

👑 A "chapiter" is the decorative cap on top of a pillar

🥈 Every one of the court's roughly sixty pillars had a silver-covered top

✨ Consistent silver tops gave the whole fence line a unified look

---

## ✅ All The Pillars Of The Court Were Filleted With Silver

This final summary line confirms the pattern one more time before the chapter moves on to tally exactly how much silver all of this actually required -- the number is coming in verses 25-28.

✅ This closing line confirms the silver pattern one last time

🔢 The next section reveals the exact silver total behind all of it

📖 The tally appears in verses 25-28, later in this chapter

# Exodus 38:18-20

# 🎨 The Colorful Entrance Screen

---

## 🧵 The Hanging For The Gate Of The Court Was Needlework

**"Needlework"** describes detailed embroidery, far more time-consuming and skilled than the simple woven linen used for the rest of the court's walls. Marking the entrance with embroidery instead of plain fabric made it visually stand out as the one way in.

🧵 "Needlework" means detailed embroidery, not simple weaving

⏳ Embroidery took far more time and skill than plain linen

🚪 The entrance stood out visually as the court's one way in

---

## 🎨 Of Blue, And Purple, And Scarlet, And Fine Twined Linen

This exact four-material combination -- blue, purple, scarlet, and fine linen -- marks every major threshold in the tabernacle: this outer gate, the inner veil to the Holy Place, and the innermost veil to the Most Holy Place. Purple dye especially was extremely expensive, made from crushed sea snails, so this color combination signaled "sacred boundary" wherever it appeared.

🎨 This same four-color combination marks every major tabernacle threshold

🐚 Purple dye came from crushed sea snails and was very costly

🚧 The colors themselves signaled "sacred boundary" to anyone approaching

---

## 📏 Twenty Cubits...The Height In The Breadth Was Five Cubits

The entrance opening measured about thirty feet wide and seven and a half feet tall -- wide enough for priests, sacrificial animals, and tabernacle furniture to move through freely.

📏 The gate opening was about thirty feet wide

📐 It stood about seven and a half feet tall

🐄 Large enough for priests, animals, and furniture to pass through

---

## 📐 Answerable To The Hangings Of The Court

**"Answerable"** here means matching. The gate screen's height matched the plain linen walls exactly, so the whole boundary looked level and uniform all the way around -- only the color and embroidery marked the entrance as different, not its size.

📐 "Answerable" means matching in size to the plain walls

📏 The height stayed uniform all the way around the court

🎨 Only color and decoration set the entrance apart, not height

---

## 🏛️ Their Pillars Were Four, And Their Sockets Of Brass Four

Four pillars held up the entrance screen, one more than the three-pillar sections used for the plain fifteen-cubit walls nearby. The wider, heavier embroidered fabric needed the extra support.

🏛️ Four pillars supported the entrance screen, one more than nearby sections

⚖️ The wider, heavier embroidered fabric needed the extra support

🎯 Practical engineering matched the entrance's larger size

---

## 🔨 All The Pins Of The Tabernacle...Were Of Brass

**"Pins"** were tent stakes, driven into the ground to anchor the guy-ropes holding the whole structure steady. Even this small, easily-overlooked piece of hardware, first mentioned here, was made of the same solid brass used throughout the outer court -- nothing in this project was treated as too minor to matter.

🔨 "Pins" were tent stakes anchoring the structure's guy-ropes

🥉 Even this small hardware was made of the same solid brass

🎯 Nothing in the tabernacle's construction was treated as unimportant

# Exodus 38:21-23

# 📜 The Builders, Named And Accountable

---

## 📋 This Is The Sum Of The Tabernacle, Even Of The Tabernacle Of Testimony

**"Sum"** means a tally or full accounting. **"Tabernacle of testimony"** is another name for the entire structure, named after the stone tablets of the covenant -- called the "testimony" -- that were kept inside the ark. The building is literally named after what it exists to hold.

📋 "Sum" means a full tally or accounting of materials

📜 "Testimony" refers to the covenant tablets kept inside the ark

🏷️ The whole structure is named after what it was built to hold

---

## ✍️ As It Was Counted, According To The Commandment Of Moses

This wasn't a loose summary -- it was a formal, official count, ordered by Moses himself. Every material named in the rest of this chapter was tracked and verified, not estimated after the fact.

✍️ This was a formal, official count, not a rough summary

📖 Moses himself ordered the accounting

🔢 Every material was tracked and verified, not estimated

---

## 👤 For The Service Of The Levites, By The Hand Of Ithamar, Son To Aaron The Priest

**Ithamar** was Aaron's youngest son, here shown personally overseeing this materials count on behalf of the Levites, the tribe assigned to care for the tabernacle. A specific named person was held responsible for the inventory, not an anonymous group.

👤 Ithamar was Aaron's youngest son

📊 He personally oversaw this count for the Levites, the tabernacle's caretaker tribe

✅ One named person was accountable, not an anonymous group

---

## 🛠️ Bezaleel The Son Of Uri, The Son Of Hur, Of The Tribe Of Judah

Bezaleel was first introduced back in chapter 31:1-5 as personally filled by God's Spirit for this exact craftsmanship. His grandfather Hur is very likely the same Hur who helped hold up Moses's hands during Israel's battle with Amalek in chapter 17 -- a family already proven faithful before this assignment.

🛠️ Bezaleel was named in chapter 31 as Spirit-filled for this work

🙌 His grandfather Hur likely helped hold up Moses's hands in chapter 17

👪 This family had already proven faithful before this assignment

---

## ✅ Made All That The LORD Commanded Moses

This exact phrase repeats like a refrain across the closing chapters of Exodus. It hammers home one point again and again: nothing here was improvised or adjusted. Every piece matched God's instructions to Moses precisely.

🔁 This phrase repeats like a refrain through Exodus's closing chapters

🎯 Nothing was improvised or changed from the original instructions

✅ Every single piece matched what God commanded, exactly

---

## 🎨 Aholiab...An Engraver, And A Cunning Workman, And An Embroiderer

Aholiab came from the tribe of Dan, a far less prominent tribe than Bezaleel's Judah, showing God's gifting for this work wasn't limited to Israel's most well-known family line. **"Cunning"** here is an old word meaning highly skilled, not deceptive or tricky.

🎨 Aholiab came from Dan, a much less prominent tribe than Judah

🌟 God's skill and calling weren't limited to the most prominent families

📖 "Cunning" here means highly skilled, not deceptive

# Exodus 38:24-29

# ⚖️ Counting Every Ounce Of Gold, Silver, And Brass

---

## 🥇 The Gold...Was Twenty And Nine Talents, And Seven Hundred And Thirty Shekels

A **"talent"** weighed roughly seventy-five pounds. Twenty-nine talents alone is well over a ton of gold -- an almost unbelievable amount for a people who had recently been slaves with nothing of their own.

🥇 A talent weighed roughly seventy-five pounds

⚖️ Twenty-nine talents comes to well over a ton of gold

😮 An extraordinary amount for former slaves who owned nothing

---

## 📏 After The Shekel Of The Sanctuary

The **"shekel of the sanctuary"** was a specific, fixed weight standard used only for tabernacle-related counting, unlike ordinary trade shekels, which could vary from merchant to merchant. Using one official standard meant no one could shortchange this offering, even accidentally.

📏 The "shekel of the sanctuary" was a fixed, official weight standard

🏪 Ordinary trade shekels could vary between merchants

✅ One official standard prevented any accidental shortchanging

---

## 🥈 The Silver Of Them That Were Numbered Of The Congregation

Unlike the gold, which came from freewill gifts described back in chapter 35, this silver came from a required payment tied to a census -- explained in full in the next verse.

🥈 This silver wasn't a freewill gift like the gold in chapter 35

📊 It came from a required payment tied to a census count

📖 The details of that payment are explained in the very next verse

---

## 🔢 An Hundred Talents, And A Thousand Seven Hundred And Threescore And Fifteen Shekels

**"Threescore"** is an old way of saying sixty (three sets of twenty). Add it up and the silver totals roughly three and three-quarter tons -- even more than the gold, though silver was less valuable per pound.

🔢 "Threescore" is an old term for sixty

⚖️ The total silver weighed roughly three and three-quarter tons

🥈 More silver than gold by weight, though worth less per pound

---

## 🪙 A Bekah For Every Man, That Is, Half A Shekel

A **"bekah"** was a specific coin-weight equal to exactly half a shekel -- the text even defines the word itself with "that is," right in the verse.

🪙 A "bekah" was a coin-weight equal to exactly half a shekel

📖 The verse defines its own term with "that is"

💰 A small, fixed amount, not left to anyone's judgment

---

## 👥 For Every One That Went To Be Numbered, From Twenty Years Old And Upward

This ties directly back to chapter 30:11-16, where God first commanded that every man twenty or older pay this exact half-shekel whenever a census was taken. Rich and poor paid the identical amount, so no one's life could be counted as worth more than anyone else's.

📖 Chapter 30:11-16 first commanded this half-shekel census payment

⚖️ Every man twenty and older paid the exact same amount

🟰 Rich and poor paid identically -- no life valued above another's

---

## 🧮 For Six Hundred Thousand And Three Thousand And Five Hundred And Fifty Men

That total, 603,550, matches the very same census number recorded in Numbers 1:46, taken around the same time. Two separate books of the Bible independently record the identical figure for how many men Israel had.

🧮 The total was 603,550 men counted

📖 Numbers 1:46 records this exact same figure

✅ Two separate books line up on the identical number

---

## 🏗️ Of The Hundred Talents Of Silver Were Cast The Sockets Of The Sanctuary, And Of The Vail

All that silver had one very specific job: it became the heavy sockets the tabernacle's actual wooden wall-frames stood in, plus the sockets for the inner veil. This wasn't decoration -- it was the structural foundation the whole building rested on.

🏗️ The silver became the sockets the tabernacle's wall-frames stood in

🧱 This was structural foundation, not decoration

📖 It also covered the sockets for the inner veil

---

## 1️⃣ An Hundred Sockets Of The Hundred Talents, A Talent For A Socket

A full talent of silver, about seventy-five pounds, went into each single socket. Every plank of the tabernacle's walls literally stood on a chunk of the nation's collective atonement-money offering.

1️⃣ One full talent of silver, about 75 pounds, went into each socket

🧱 Every wall-plank stood on a piece of that silver offering

🩸 The whole structure literally rested on atonement money

---

## 🪝 Of The Thousand Seven Hundred Seventy And Five Shekels He Made Hooks...And Filleted Them

The leftover 1,775 shekels, separate from the 100 talents used for sockets, covered every piece of smaller silver hardware described throughout this chapter -- the hooks, the chapiter overlays, and the connecting fillets.

🪝 This leftover silver covered all the smaller hardware pieces

👑 That includes the hooks and the chapiter overlays

🔗 And the connecting fillets described earlier in the chapter

---

## 🥉 The Brass Of The Offering Was Seventy Talents, And Two Thousand And Four Hundred Shekels

That's over 5,400 pounds of brass, the largest quantity of any metal used in the whole tabernacle. Brass covered the biggest surface area of all -- the entire outer court perimeter, the altar, and the laver -- which is exactly why it needed so much more material than the gold or silver.

🥉 Roughly 5,400+ pounds of brass, the largest metal total by far

📐 Brass covered the largest surface area: the whole outer court

🔥 The altar and laver also drew from this same brass supply

# Exodus 38:30-31

# 🧾 The Brass, Accounted For Down To The Last Peg

---

## 🧾 Therewith He Made The Sockets To The Door Of The Tabernacle

**"Therewith"** ties this verse directly back to the seventy-talent brass total just given in verse 29. This is a receipt -- a piece-by-piece list of exactly what that bulk metal became.

🧾 "Therewith" ties directly back to verse 29's brass total

📋 This verse is essentially a receipt for that metal

🔗 It shows precisely what the bulk brass became

---

## 🔥 And The Brasen Altar, And The Brasen Grate For It, And All The Vessels Of The Altar

This circles all the way back to the altar of burnt offering described at the very start of this chapter. The brass accounted for here really did become the objects already detailed in verses 1-7.

🔥 This circles back to the altar described at the chapter's opening

✅ Confirms the brass really became the objects listed in verses 1-7

🔁 The chapter closes by returning to where it began

---

## 🏛️ And The Sockets Of The Court Round About, And The Sockets Of The Court Gate

This covers the base sockets holding up all sixty-some pillars around the court's entire perimeter and gate -- brass here, not silver, since these carried the plain linen walls rather than the sanctuary's frame or the decorated gate screen.

🏛️ These are the base sockets for every pillar around the court

🥉 Brass was used here since these carried the plain linen walls

🥈 Silver was reserved for the sanctuary frame and gate screen instead

---

## 🔨 And All The Pins Of The Tabernacle, And All The Pins Of The Court Round About

The chapter's very last words return to the humblest object it ever mentioned -- the tent pegs, first named back in verse 20. A chapter that tracked a literal ton of gold closes by giving the same careful attention to stakes driven into the sand.

🔨 The chapter ends with the tent pegs first mentioned in verse 20

⚖️ The same care applied to a ton of gold applied to simple stakes

🎯 Nothing in this project was treated as too small to count`;

export const EXODUS_THIRTY_EIGHT_PERSONAL_SECTIONS = parseExodusThirtyEightRawNotes(EXODUS_THIRTY_EIGHT_RAW_NOTES);
