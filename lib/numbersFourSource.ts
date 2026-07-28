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
# 📋 A Different Kind Of Census
---
## 🧮 Take The Sum Of The Sons Of Kohath From Among The Sons Of Levi
This is a brand new count, and it's aimed at just one of Levi's three sons - Kohath - not the whole tribe like the census back in Numbers 3. Numbers 4 exists to answer a very practical question chapter 3 never asked: exactly how many Levite men are actually old enough and strong enough to do the physical carrying work when the camp moves.
🧮 A brand new census, aimed at Kohath's family alone
📖 Different purpose than Numbers 3's whole-tribe dedication count
🚚 This one is about who can actually do the heavy carrying work
---
## 🎂 From Thirty Years Old And Upward Even Until Fifty Years Old
Three very different age ranges appear across three different Levite censuses in this book. Numbers 1 counted men twenty and up for war. Numbers 3 counted Levite males from one month old, for dedication. This one, thirty to fifty, is a working-age range - old enough to have the strength and experience for heavy manual labor, young enough that a fifty-year-old wasn't asked to keep hauling boards and covered ark poles for the rest of his life.
🎂 Thirty to fifty - a working-age range, unlike the other two censuses
⚔️ Numbers 1 counted twenty and up, for war
👶 Numbers 3 counted from one month old, for dedication
---
## 🏋️ All That Enter Into The Host, To Do The Work In The Tabernacle Of The Congregation
"Host" is the same Hebrew word (tsaba) used for a military army back in Numbers 1's war census. Israel didn't have a separate word for "organized labor force" - the same term for soldiers marching to battle described Levites marching with a covered ark on their shoulders. The work itself was thought of as a kind of service, disciplined and assigned, not a casual chore.
🏋️ "Host" is the same word used for Israel's military army
⚔️ The same term covers soldiers and sacred laborers alike
🔑 This work was organized and disciplined, not a casual task
---
## 📜 The Lord Spake Unto Moses And Unto Aaron
This exact phrase opens each new assignment through the whole chapter - Kohath's count here in verse 1, Gershon's in verse 21, Merari's in verse 29. It functions like a chapter within the chapter, a fresh command from God each time the focus shifts to a new Levite family.
📜 This phrase opens each new family's assignment in this chapter
🔁 It repeats again at verse 21 (Gershon) and verse 29 (Merari)
🔑 Structure to watch for as this whole long chapter unfolds

# Numbers 4:4-6
# 📦 Wrapping The Ark For Travel
---
## ⛺ This Shall Be The Service Of The Sons Of Kohath...About The Most Holy Things
"Most holy things" translates a Hebrew phrase used for the single most sacred tier of objects in the whole tabernacle system - the same phrase behind "Holy of Holies," the name of the innermost room. Kohath's family is assigned to the most dangerous, most sacred category of work in the entire chapter, which is exactly why the rest of this section reads like a strict procedure rather than a simple packing list.
⛺ "Most holy things" is the same phrase behind "Holy of Holies"
⚠️ The most sacred, most dangerous work in the whole chapter
📋 Everything from here reads like strict procedure, not a checklist
---
## 🚶 When The Camp Setteth Forward, Aaron Shall Come, And His Sons
This entire elaborate covering procedure only happens at one specific moment - right before Israel packs up and moves. It's not a daily ritual. And notice who does it: Aaron and his sons personally, not the Kohathites who will actually carry the load. The priests wrap; the Levites carry.
🚶 Only happens when the whole camp is about to move
👨‍👦 Aaron and his sons do the wrapping, not the Kohathites
🔑 Sets up the division of labor for this entire section
---
## 🧵 Take Down The Covering Vail
"The vail" is the same curtain that normally hangs inside the tabernacle, separating the Holy Place from the Most Holy Place where the ark sits (Exodus 26:31-33). For travel, that curtain comes down off its permanent hooks and becomes the ark's very first layer of covering - repurposed from a wall into a wrapping.
🧵 The same veil that normally separates the two inner rooms
🔄 Repurposed here as the ark's first travel covering
📖 Its usual place is described back in Exodus 26:31-33
---
## 📦 Cover The Ark Of Testimony With It
"Testimony" refers to the stone tablets of the Ten Commandments kept inside the ark - called "testimony" because they formally record the covenant terms between God and Israel. This is the single most sacred object Israel owns, and it gets covered before anyone besides Aaron and his sons even looks at it for travel.
📦 "Testimony" means the stone tablets of the covenant inside the ark
✍️ They formally record the covenant terms, like a legal witness
🔑 Israel's single most sacred object, covered first of everything
---
## 🦫 The Covering Of Badgers' Skins
Scholars still debate exactly what animal this Hebrew word (tachash) refers to - possibilities include a dolphin, a dugong, or simply a tough weatherproof leather, not necessarily a badger at all. Whatever the exact animal, its purpose is clear from context: a rugged, waterproof outer layer to protect the holy items from sun, sand, and rain during the journey.
🦫 The exact animal (tachash) is still debated by scholars today
🌧️ Its purpose is clear either way: a tough, waterproof outer layer
🏜️ Protection from sun, sand, and rain on the journey
---
## 💙 A Cloth Wholly Of Blue... And Put In The Staves Thereof
Blue was an expensive, hard-to-produce dye in the ancient world, associated with royalty and with heaven itself - the same blue used in the priest's own garments (Exodus 28:31). "Staves" are the long carrying poles; putting them in means the ark is now fully ready to be lifted and carried without anyone touching the ark itself.
💙 Blue was an expensive dye, tied to royalty and to heaven
👔 The same blue used in the priest's own garments (Exodus 28:31)
🪵 "Staves" are the carrying poles - now ready to lift, untouched

# Numbers 4:7-10
# 🍞 The Table And The Candlestick
---
## 🍞 Upon The Table Of Shewbread They Shall Spread A Cloth Of Blue
The table of shewbread held twelve loaves of bread, one for each tribe, replaced fresh every week and eaten only by the priests (Leviticus 24:5-9). Like the ark, it gets blue first - but unlike the ark, the table keeps its vessels and even its bread sitting right on top while it travels, as the next lines show.
🍞 Twelve loaves, one per tribe, refreshed weekly (Leviticus 24:5-9)
👔 Eaten only by the priests, never by ordinary Israelites
💙 Blue is the first layer here too, just like the ark
---
## 🥣 The Dishes, And The Spoons, And The Bowls, And Covers
These are the table's own serving equipment - dishes for the bread itself, spoons likely for incense set beside the loaves, bowls and covers for drink offerings. All of it stayed with the table, wrapped together as one unit rather than packed separately.
🥣 The table's own serving set - dishes, spoons, bowls, covers
🍷 Some pieces likely held incense or drink offerings
📦 All wrapped together with the table as one unit
---
## 🍞 The Continual Bread Shall Be Thereon
"Continual" is the key word - the loaves weren't removed for travel the way modern movers would carefully box up dishes. The bread stayed exactly where it always sat, on the table, even while the whole thing was wrapped and carried. God's provision for His people didn't pause just because the camp was on the move.
🍞 The bread stayed on the table even during travel, unmoved
⏸️ Nothing about worship paused just because Israel was moving
🔑 "Continual" is the operative word - constant, without interruption
---
## 🔴 A Cloth Of Scarlet...And Cover The Same With A Covering Of Badgers' Skins
The table gets a second color layer the ark didn't - scarlet, a deep red dye, tucked between the blue cloth and the outer badger-skin covering. The exact reason for scarlet specifically here isn't stated, but the pattern is clear: each sacred object gets its own particular sequence of colored layers, not a one-size-fits-all wrapping.
🔴 Scarlet is a layer unique to the table - the ark didn't get it
🎨 Each object gets its own specific sequence of colored cloths
📖 The text doesn't explain scarlet's meaning here directly
---
## 🕎 The Candlestick Of The Light, And His Lamps, And His Tongs, And His Snuffdishes
The candlestick is the golden menorah, the only source of light inside the tabernacle's Holy Place (Exodus 25:31-40). "Tongs" trimmed and adjusted the wicks; "snuffdishes" caught the burnt wick trimmings so they wouldn't just fall onto the floor of a tent lit entirely by open flame.
🕎 The candlestick is the golden menorah, the Holy Place's only light
🔥 "Tongs" adjusted the wicks; "snuffdishes" caught the trimmings
📖 Its full design is described back in Exodus 25:31-40
---
## 🪣 Put It...Within A Covering Of Badgers' Skins, And Shall Put It Upon A Bar
Unlike the ark and table, which travel on staves run through built-in rings, the candlestick has no such rings of its own - so instead it's simply set on a carrying bar or frame. A small practical difference, but it shows the instructions weren't copy-pasted; each object's actual shape shaped how it had to be carried.
🪣 No built-in carrying rings, unlike the ark and the table
🪵 Carried on a plain bar or frame instead of fitted staves
🔧 A small sign these instructions were tailored, not copy-pasted

# Numbers 4:11-14
# 🔥 Two Altars, Two Colors
---
## 🔥 Upon The Golden Altar They Shall Spread A Cloth Of Blue
The "golden altar" is the altar of incense, a small gold-covered altar standing just outside the veil in the Holy Place (Exodus 30:1-10) - not to be confused with the much bigger bronze altar coming up two verses from now. Incense burned here every morning and evening, so this altar was in daily use right up until the moment the camp moved.
🔥 The "golden altar" is the altar of incense, inside the Holy Place
🔀 Not the same as the bronze altar mentioned two verses later
⏰ Incense burned here twice daily, right up to the moment of travel
---
## 🧰 The Instruments Of Ministry, Wherewith They Minister In The Sanctuary
A catch-all category for whatever priestly tools were used regularly inside the Holy Place but didn't fit neatly under the ark, table, candlestick, or incense altar. Rather than list every single item by name, the text simply groups "everything else in daily use" into one wrapped bundle.
🧰 A catch-all for priestly tools not covered by the other categories
📦 Grouped and wrapped together as one bundle, not itemized
🔑 A practical shorthand for "everything else in regular use"
---
## 🪔 They Shall Take Away The Ashes From The Altar
The scene suddenly shifts location. Every altar mentioned so far - the ark, table, candlestick, incense altar - sat inside the tent itself. This altar is the large bronze altar of burnt offering, standing outside in the courtyard, where animal sacrifices were actually burned (Exodus 27:1-8). Removing its ashes was step one of the exact same daily routine a priest performed every single morning (Leviticus 6:10-11), not something invented just for travel days.
🪔 A location shift: this is the bronze altar out in the courtyard
🐑 Where animal sacrifices were actually burned, unlike the others
📖 Ash removal was already a normal daily task (Leviticus 6:10-11)
---
## 🟣 Spread A Purple Cloth Thereon
Purple, not blue - the only object in this whole procedure to get this particular color. Purple dye was even more expensive than blue in the ancient world, made from a rare sea snail, and used for royal robes. One reasonable guess: this altar, scarred by fire and constant sacrifice, still gets the most costly covering of all, a reminder that even the most-used, most physically worn object in the whole system was still treated as royal and holy.
🟣 Purple - the only object in this chapter covered in this color
🐚 An especially expensive dye, made from a rare sea snail
👑 Even the most fire-worn altar still gets treated as royal
---
## 🍴 The Censers, The Fleshhooks, And The Shovels, And The Basons
All tools for handling an active fire and fresh sacrifices: censers carried hot coals, fleshhooks (large forks) moved pieces of meat on the altar, shovels cleared ashes, and basons caught blood for the sprinkling rituals described in Leviticus. These are the grittiest, most hands-on tools of the whole tabernacle system.
🍴 Censers for coals, fleshhooks (forks) for handling meat
🧹 Shovels for ashes, basons for catching sacrificial blood
🔥 The grittiest, most hands-on tools in the whole system
---
## 📦 All The Vessels Of The Altar; And They Shall Spread Upon It A Covering Of Badgers' Skins
One final badger-skin layer closes out the whole Kohathite covering procedure - five separate sacred objects (ark, table, candlestick, incense altar, burnt-offering altar), each wrapped in its own specific sequence, all now sealed and ready to travel.
📦 The badger-skin layer that closes out this whole procedure
5️⃣ Five sacred objects wrapped, each in its own specific sequence
✅ All now sealed and ready for the road

# Numbers 4:15-16
# 🎒 Kohath Carries, Eleazar Oversees
---
## 🚫 They Shall Not Touch Any Holy Thing, Lest They Die
This is the warning the whole elaborate wrapping procedure exists to prevent. By the time the Kohathites arrive to carry these objects, every one of them is already fully covered by Aaron and his sons - so the Kohathites lift bundles and poles, never the sacred objects themselves. The danger isn't that God is looking for an excuse to punish someone; it's that direct, careless contact with what is fully holy was treated as genuinely lethal, the way handling a live wire is lethal regardless of anyone's intentions.
🚫 By the time Kohath arrives, everything is already fully covered
⚡ Treated like real physical danger, not an arbitrary punishment
🔑 The wrapping procedure exists specifically to prevent this
---
## 🎒 These Things Are The Burden Of The Sons Of Kohath
"Burden" translates massa, a word meaning both a physical load carried on the shoulders and a duty or responsibility assigned to someone. The wordplay runs through this whole chapter - every Levite family's "burden" is both the literal weight on their backs and the God-given job that weight represents.
🎒 "Burden" (massa) means both a physical load and an assigned duty
🔁 This double meaning runs through the entire chapter
🔑 A God-given job and a literal weight, in the very same word
---
## 🙏 The Office Of Eleazar The Son Of Aaron The Priest
Eleazar was already named back in Numbers 3 as the priest personally overseeing Kohath's family. Here his own specific responsibilities finally get listed - and notice they're different from what the Kohathites carry. Eleazar manages the tabernacle's ongoing supplies; Kohath physically transports its furniture.
🙏 Eleazar oversees Kohath's family, first named back in Numbers 3
📋 His job here is different from what Kohath physically carries
🔑 Supply management, not furniture-carrying
---
## 🕯️ The Oil For The Light, And The Sweet Incense, And The Daily Meat Offering, And The Anointing Oil
Four ongoing supplies Eleazar personally tracks: oil to keep the candlestick's lamps burning, incense for the golden altar, flour and oil for the daily grain offering, and the special anointing oil used to consecrate priests and holy objects (its recipe given in Exodus 30:22-33). These are consumables, restocked constantly, unlike the furniture Kohath carries only when the camp moves.
🕯️ Four ongoing supplies: lamp oil, incense, grain offering, anointing oil
🔄 Consumables restocked constantly, not carried occasionally
📖 The anointing oil's exact recipe is in Exodus 30:22-33
---
## 🏛️ The Oversight Of All The Tabernacle, And Of All That Therein Is
Beyond his four specific supplies, Eleazar holds general administrative responsibility for the entire tent and everything inside it. It's the difference between the people who physically load a moving truck and the one person who actually knows where everything belongs and whether anything is missing.
🏛️ General administrative oversight of the entire tabernacle
📋 Beyond his four specific supplies - the whole operation
🚚 Like the difference between movers and the one who tracks it all

# Numbers 4:17-20
# ❤️ A Warning So They May Live
---
## 📜 The Lord Spake Unto Moses And Unto Aaron
This exact refrain returns a third time in the chapter, marking another fresh command. Structurally, this short section functions as a kind of urgent footnote squeezed in right after the Kohath instructions are finished - as if to make absolutely sure the danger just described doesn't get treated carelessly.
📜 The same refrain marking each fresh command in this chapter
🗒️ Functions like an urgent footnote right after Kohath's instructions
🔑 Reinforcing how seriously this danger has to be taken
---
## ⛔ Cut Ye Not Off The Tribe Of The Families Of The Kohathites
A blunt warning: careless handling of what's holy could wipe out this entire clan. God is not looking to reduce Israel's workforce - the elaborate covering system exists precisely so this doesn't happen, and this verse makes the stakes explicit in case anyone had missed them.
⛔ A blunt warning: carelessness here could wipe out this whole clan
🎯 The covering system exists precisely to prevent this outcome
🔑 The stakes, spelled out plainly, in case anyone missed them
---
## ❤️ That They May Live, And Not Die, When They Approach Unto The Most Holy Things
This line reframes everything that came before it. The whole elaborate procedure - Aaron and his sons wrapping each object in its exact sequence of cloths and skins - isn't ceremonial fussiness. It's a life-saving system, built specifically so Kohath's family can do sacred work and survive it.
❤️ Reframes the whole procedure as life-saving, not just ceremonial
🛡️ Built specifically so Kohath's family can survive their own job
🔑 The purpose behind every layer of cloth described earlier
---
## 👉 Aaron And His Sons Shall Go In, And Appoint Every One To His Service And To His Burden
No Kohathite man shows up and picks whatever object looks interesting to carry. Aaron and his sons personally assign each man his specific task - which object, which part of the load - before anyone touches anything, even through a covering.
👉 Each man's task is personally assigned, not self-chosen
📋 Assigned before anyone even approaches a covered object
🔑 Order and specific assignment, not a free-for-all
---
## 👁️ They Shall Not Go In To See When The Holy Things Are Covered, Lest They Die
This pins down the exact choreography: Kohath's men are not even present while Aaron and his sons do the wrapping. They're summoned afterward, once every object is already fully covered, and lift only bundles and poles. Even witnessing the uncovered ark was treated as dangerous as touching it.
👁️ Kohath's men aren't even present during the wrapping itself
🚪 Summoned afterward, once everything is already covered
⚠️ Seeing the uncovered holy things was as dangerous as touching them

# Numbers 4:21-23
# 🌿 Gershon's Turn
---
## 📜 Take Also The Sum Of The Sons Of Gershon
The word "also" signals the pattern the rest of the chapter will follow - the same structure just applied to Levi's second family. Kohath's instructions took twenty verses because of the danger involved; Gershon's, as the next section shows, will move much faster.
📜 "Also" signals this repeats the same structure for a new family
⏩ Gershon's section moves much faster than Kohath's did
🔑 Less danger involved means far less procedural detail needed
---
## 👨‍👩‍👦 Throughout The Houses Of Their Fathers, By Their Families
The same organizational language used for every census in this book so far - counting by household and extended family, not just by raw individual headcount. It keeps each man counted alongside his own relatives, not as an anonymous number.
👨‍👩‍👦 The same family-based counting method used throughout Numbers
🔢 Keeps each man tied to his household, not just a raw number
🔁 Consistent method across every census in this book so far
---
## 🎂 From Thirty Years Old And Upward Until Fifty Years Old
The identical working-age range just used for Kohath, now applied to Gershon. All three Levite families share this same window - old enough for the physical demands, young enough not to be hauling gear indefinitely.
🎂 The same thirty-to-fifty range just used for Kohath
🔁 All three Levite families share this identical age window
💪 Old enough for the work, young enough not to do it forever

# Numbers 4:24-28
# 🏕️ Gershon Carries The Tent's Skin
---
## 🎒 To Serve, And For Burdens
The same two-word summary - service and burden - as Kohath's job, but the actual content is completely different. Where Kohath carried the sanctuary's most sacred furniture, Gershon's whole assignment is fabric: everything soft that makes up the tabernacle's walls and coverings.
🎒 Same two-word job summary as Kohath: service and burden
🧵 But the content is totally different - fabric, not furniture
🔑 Sets up everything the rest of this section describes
---
## 🏕️ The Curtains Of The Tabernacle, And The Tabernacle Of The Congregation, His Covering
This is the layered structure of the tent itself - the inner linen curtains that formed the actual walls people would see from inside, and the outer layers built over them (the goat-hair tent layer and its own coverings, detailed back in Exodus 26). Gershon's family carried the entire building envelope.
🏕️ The inner linen walls and the outer tent layers built over them
📖 The full layered design is described back in Exodus 26
🔑 Gershon's family carried the entire building's outer shell
---
## 🦫 The Covering Of The Badgers' Skins That Is Above Upon It
The same weatherproof outer material used to protect the ark and the other sacred furniture (verse 6) also formed the tabernacle's own top-most protective layer against the elements - one more sign this material was specifically valued for its ruggedness, used wherever something needed real weather protection.
🦫 The same weatherproof material used on the ark in verse 6
☔ Here it protects the whole tent's roof from the elements
🔑 Used consistently wherever real weather protection was needed
---
## 🚪 The Hanging For The Door Of The Tabernacle...And The Hanging For The Door Of The Gate Of The Court
Two separate doorways get two separate curtains here, easy to blur together. The tabernacle's own entrance (into the tent itself) has one hanging; the courtyard's outer gate, the entrance to the whole sacred compound from outside, has a different one. Gershon's family carried both.
🚪 Two separate doorways: the tent's own entrance and the outer gate
🔲 Easy to blur together, but they're two distinct curtains
🔑 Gershon's family was responsible for carrying both
---
## 🏛️ The Hangings Of The Court...And Their Cords, And All The Instruments Of Their Service
Beyond the doorways, the courtyard's entire perimeter was made of linen hanging walls, held up with cords and pegs rather than solid material - a fence made of fabric, not wood or stone. All of it, plus the ropes and tools needed to set it up, was Gershon's to carry.
🏛️ The courtyard's whole perimeter wall was made of hanging linen
🪢 Held up with cords and pegs, not wood or stone
📦 All of it, plus the tools to set it up, was Gershon's load
---
## 👉 At The Appointment Of Aaron And His Sons Shall Be All The Service
The same personal-assignment structure used for Kohath applies here too - Aaron and his sons decide who carries what. But notice what's missing compared to Kohath's section: no warning about death, no prohibition on looking or touching. Fabric carried openly on the shoulder isn't the same danger level as an uncovered ark.
👉 The same personal-assignment system used for Kohath
🚫 But no death warning here - a real difference between the two jobs
🔑 Fabric on the shoulder isn't the same danger as an uncovered ark
---
## 🤝 Under The Hand Of Ithamar The Son Of Aaron The Priest
A new name enters here - Ithamar, Aaron's other surviving son (alongside Eleazar, named back in Numbers 3:4). The two brothers split administrative oversight of the Levites between them: Eleazar over Kohath's high-danger sacred-furniture work, Ithamar over Gershon and, as the next section shows, Merari too.
🤝 Ithamar - Aaron's other surviving son, alongside Eleazar
🗂️ The two brothers split oversight of the Levites between them
🔑 Eleazar gets Kohath; Ithamar gets Gershon and Merari

# Numbers 4:29-33
# 🪵 Merari Carries The Tent's Bones
---
## 🌳 As For The Sons Of Merari, Thou Shalt Number Them After Their Families
The third and final Levite family, and the fastest section yet - by now the pattern (age range, family-based count, assigned duty) is fully established, so the text doesn't need to re-explain any of it.
🌳 The third and final Levite family covered in this chapter
⏩ The fastest section yet, since the pattern is already established
🔁 Same method, same age range, just a new family
---
## 🪵 The Boards Of The Tabernacle, And The Bars Thereof, And The Pillars Thereof, And Sockets Thereof
This assignment was already previewed back in Numbers 3:36-37 - Merari's family carries the tabernacle's literal skeleton: the wooden wall boards, the horizontal bars connecting them, the vertical support pillars, and the sockets they stood in. Where Gershon carried the skin of the building, Merari carried its bones.
🪵 The wooden frame - boards, bars, pillars, and their sockets
🦴 Where Gershon carried the skin, Merari carried the bones
📖 This same assignment was already listed in Numbers 3:36-37
---
## 🏛️ The Pillars Of The Court Round About, And Their Sockets, And Their Pins, And Their Cords
The courtyard's own structural supports too, not just the tabernacle building's frame - the posts holding up Gershon's hanging linen walls, plus the pins and cords anchoring everything to the ground. Heavy, unglamorous, absolutely essential.
🏛️ The courtyard's own structural posts, pins, and anchor cords
🔗 What actually holds up Gershon's hanging linen walls
📦 Heavy and unglamorous, but absolutely essential
---
## 📝 By Name Ye Shall Reckon The Instruments Of The Charge Of Their Burden
A detail unique to Merari - their equipment gets tracked by name, piece by piece, rather than just grouped by category the way the other families' gear was described. It suggests an actual itemized inventory list existed for these heavy structural pieces, likely because a missing socket or pillar was far harder to replace on the road than a lost cloth or cord.
📝 Merari's gear is tracked by individual name, not just by category
🧾 Suggests a real, itemized inventory list existed for these pieces
🔑 Heavy structural parts were harder to replace than lost fabric
---
## 🤝 The Service Of The Families Of The Sons Of Merari...Under The Hand Of Ithamar The Son Of Aaron The Priest
Confirms Ithamar's oversight extends to both non-Kohath families - Gershon and now Merari - while Eleazar's attention stays fixed on Kohath alone. A clean organizational chart: one priestly brother for the most dangerous job, one priestly brother for the other two combined.
🤝 Ithamar oversees both Gershon and Merari - confirmed again here
🔑 Eleazar's attention stays fixed on Kohath alone
📊 One brother for the highest-risk job, one for the other two

# Numbers 4:34-37
# 🔢 Kohath Counted: 2,750
---
## 👥 Moses And Aaron And The Chief Of The Congregation Numbered
A new detail: this count wasn't done by Moses and Aaron alone, but with the tribal chiefs personally involved too - the same leaders named individually back in Numbers 1:5-15. Counting roughly 8,500 working-age men across three families and matching each to a specific job was too large a task for two people alone.
👥 Tribal chiefs helped with this count too, not just Moses and Aaron
📖 The same leaders individually named in Numbers 1:5-15
🔑 A logistics task too large for just two people to manage alone
---
## ✅ All That Might Do Service In The Tabernacle Of The Congregation
This phrase is the key to reading these final numbers correctly - they count only deployable workers, not the whole Kohathite population. Numbers 3 already counted every male Kohathite from one month old (8,600 total); this new number is a much smaller slice, just the ones actually old enough and fit enough to work.
✅ Counts only deployable workers, not the whole population
👶 Numbers 3 already counted every Kohathite male from one month old
📉 This is a smaller, working-age slice of that larger total
---
## 🔢 Two Thousand Seven Hundred And Fifty
2,750 working-age Kohathite men - compared to the 8,600 counted for the whole Kohathite clan back in Numbers 3:28, meaning roughly 32 out of every 100 Kohathites actually fell inside the thirty-to-fifty working window.
🔢 2,750 working-age Kohathite men, the number this section lands on
📊 About 32 out of every 100 Kohathites fell in the working-age range
🧮 A real, checkable fraction of the larger clan total from Numbers 3
---
## ✅ According To The Commandment Of The Lord By The Hand Of Moses
The familiar obedience refrain closes out Kohath's numbers, the same formula that's ended nearly every count so far in this book - a reminder that even a headcount was treated as an act of obedience, not just paperwork.
✅ The same obedience refrain closing nearly every count in this book
📖 Even a headcount was treated as an act of obedience
🔁 Watch for this same line closing Gershon's and Merari's counts too

# Numbers 4:38-41
# 🔢 Gershon Counted: 2,630
---
## 📜 Those That Were Numbered Of The Sons Of Gershon, Throughout Their Families
Same method, second family - by now the census formula is fully familiar, so this section moves quickly to the number itself.
📜 Same counting method, now applied to Gershon's family
⏩ Moves quickly since the formula is already familiar
🔁 Second of three working-age counts in this chapter
---
## 🔢 Two Thousand And Six Hundred And Thirty
2,630 working-age Gershonite men, out of the 7,500 total Gershonites counted back in Numbers 3:22 - a slightly higher fraction than Kohath's, at roughly 35 out of every 100.
🔢 2,630 working-age Gershonite men
📊 Compared to 7,500 total Gershonites in Numbers 3:22
🧮 Roughly 35 out of every 100 Gershonites, slightly higher than Kohath's fraction
---
## ✅ Whom Moses And Aaron Did Number According To The Commandment Of The Lord
The same closing refrain, in spirit if not letter, as Kohath's section just used - the second of three identical bookends in this chapter.
✅ The same closing refrain used for Kohath's count too
🔁 The second of three identical bookends in this chapter
📖 One more left, coming at the end of Merari's numbers

# Numbers 4:42-45
# 🔢 Merari Counted: 3,200
---
## 📜 Those That Were Numbered Of The Families Of The Sons Of Merari
The third and final working-age count, following the exact same pattern as the two before it.
📜 The third and final working-age census in this chapter
🔁 Follows the exact same pattern as Kohath and Gershon
🔢 One more number left before the grand total
---
## 🔢 Three Thousand And Two Hundred
3,200 working-age Merarite men, out of 6,200 total Merarites in Numbers 3:34 - the highest working-age fraction of the three, at roughly 52 out of every 100, more than half. Fitting, since Merari's heavy structural-carrying job likely called for the most raw physical strength of any of the three assignments.
🔢 3,200 working-age Merarite men, out of 6,200 total in Numbers 3:34
📊 About 52 out of every 100 Merarites - the highest fraction of the three
💪 Fitting for the family carrying the heaviest structural loads
---
## ✅ Whom Moses And Aaron Numbered According To The Word Of The Lord By The Hand Of Moses
The third and final appearance of this closing refrain, one for each family - Kohath, Gershon, and now Merari, each count sealed with the exact same statement of obedience.
✅ The third and final appearance of this closing refrain
📖 One for each family - Kohath, Gershon, and now Merari
🔑 Every count in this chapter closes on obedience, not just numbers

# Numbers 4:46-49
# 🏁 The Grand Total: 8,580
---
## 👥 All Those That Were Numbered Of The Levites...Moses And Aaron And The Chief Of Israel Numbered
The grand total section, combining all three families into one final figure - the same team of leaders from verse 34 involved once more, now closing out the whole operation.
👥 Combines all three families into one final grand total
🔁 The same leadership team from verse 34, closing things out
🔑 The last number this long chapter has been building toward
---
## 🛠️ The Service Of The Ministry, And The Service Of The Burden
A tidy two-word summary of everything this chapter has described: "ministry" is the assisting, hands-on-holy-things work closest to the priests (Kohath's specialty), and "burden" is the carrying and transport work (Gershon and Merari's specialty). Two categories of labor, covering all three families between them.
🛠️ "Ministry" and "burden" - a two-word summary of the whole chapter
🙏 "Ministry" is Kohath's close-to-the-priests, hands-on work
🚚 "Burden" is Gershon and Merari's carrying and transport work
---
## 🔢 Eight Thousand And Five Hundred And Fourscore
"Fourscore" is an old way of saying eighty, so the total reads 8,000 + 500 + 80 = 8,580 - and the math checks out exactly: 2,750 (Kohath) + 2,630 (Gershon) + 3,200 (Merari) = 8,580. Compared against the 22,000 total Levites counted in Numbers 3, that means only about 39 out of every 100 Levites - well under half - actually fell inside the working-age window this chapter is built around.
🔢 "Fourscore" means eighty - the total is exactly 8,580
🧮 2,750 + 2,630 + 3,200 = 8,580, checking out exactly
📊 About 39 out of every 100 total Levites were working-age
---
## ✅ According To The Commandment Of The Lord They Were Numbered By The Hand Of Moses...Every One According To His Service, And According To His Burden
The chapter's final line ties everything together - the same obedience refrain that's now closed four straight chapters in this book (Numbers 1, 2, 3, and this one), plus a last callback to the "ministry and burden" pairing from two verses earlier. Every single Levite, in every single family, was counted, assigned, and sent to work in exact obedience to what God commanded.
✅ The same refrain that has now closed four chapters in a row
🔁 One final callback to "service" and "burden" from two verses earlier
🔑 Every Levite in every family, counted and sent to work in obedience
`;

export const NUMBERS_FOUR_PERSONAL_SECTIONS = parseNumbersFourRawNotes(NUMBERS_FOUR_RAW_NOTES);
