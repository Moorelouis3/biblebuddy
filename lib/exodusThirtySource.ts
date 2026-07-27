export type ExodusThirtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirtyRawNotes(rawText: string): ExodusThirtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+30:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 30 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+30:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+30:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 30 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 30,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 30:${startVerse}` : `Exodus 30:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Exodus 30 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTY_RAW_NOTES = `# Exodus 30:1-3

# 🔥 The Altar Of Incense

---

## 🪵 Thou Shalt Make An Altar To Burn Incense Upon: Of Shittim Wood

This is a fourth altar mentioned in Exodus, and it has a completely different job than the others. The bronze altar in the courtyard burned animal sacrifices; this smaller, gold-covered altar stood inside the holy place and burned only incense, never meat or grain.

🔥 This altar has one single job: burning incense, nothing else

🪵 "Shittim wood" is acacia wood, the same tough desert wood used for the ark

📍 It stood inside the holy place, not out in the courtyard

---

## 📏 A Cubit Shall Be The Length Thereof, And A Cubit The Breadth Thereof; Foursquare Shall It Be

A cubit was an ancient measurement based on the length of a forearm, roughly a foot and a half. "Foursquare" simply means the base was an equal square on all four sides, not a rectangle.

📏 A cubit was about a foot and a half, measured from a forearm

⬜ "Foursquare" means the base was a perfect square, equal on every side

🤏 At about eighteen inches per side, this altar was small and tabletop-sized

---

## 📐 Two Cubits Shall Be The Height Thereof: The Horns Thereof Shall Be Of The Same

At roughly three feet tall, this altar stood about waist-high. The "horns" were pointed projections carved out of each of the four top corners, made from the very same block of wood as the altar itself rather than attached separately.

📐 About three feet tall, roughly waist-high to an adult

🐂 "Horns" were pointed corners at each of the four top corners

🪵 They were carved from the same solid piece, not added on afterward

---

## ✨ Thou Shalt Overlay It With Pure Gold... And Thou Shalt Make Unto It A Crown Of Gold Round About

"Overlay" means covering the wood with a thin layer of gold, not building it from solid gold, which is why acacia wood was needed underneath for strength. The "crown" here isn't worn on a head; it's a decorative gold molding running around the top edge, like a picture frame border.

✨ "Overlay" means a thin gold covering over wood, not solid gold

🪵 Wood underneath gave the altar strength gold alone could not

👑 This "crown" is a decorative gold rim, not a crown for a person

# Exodus 30:4-6

# 🪵 Carrying It Like The Ark

---

## 💍 Two Golden Rings Shalt Thou Make To It Under The Crown Of It, By The Two Corners Thereof

Rings were attached near the top of the altar, on two opposite sides, for one specific reason explained in the very next verse. Building rings into a piece of furniture before explaining why is a pattern repeated for nearly every object in the tabernacle.

💍 Two gold rings were fixed near the top, on two opposite sides

🔜 Their purpose is explained in the next verse, not this one

🔁 Rings-then-purpose is a pattern used for almost every tabernacle object

---

## 🚶 They Shall Be For Places For The Staves To Bear It Withal

"Staves" are carrying poles, and "withal" is an old word meaning "with it" or "by means of it." This altar was never meant to stay bolted in one spot; it was built to be lifted and carried by hand as Israel moved camp through the wilderness.

🚶 "Staves" means the carrying poles slid through the rings

📖 "Withal" is an old word for "by means of it" or "with it"

⛺ The altar was portable, built to move with Israel through the desert

---

## 🪵 Thou Shalt Make The Staves Of Shittim Wood, And Overlay Them With Gold

The carrying poles used the exact same wood-and-gold design as the altar itself, and this same wood-and-gold combination also built the poles for the ark of the covenant back in chapter 25. The matching materials deliberately connect this altar to the ark as a set.

🪵 The poles matched the altar: acacia wood covered in gold

🔗 The ark's poles in chapter 25 used this identical design

⚖️ Matching materials tied these two objects together as one set

---

## 🚪 Thou Shalt Put It Before The Vail That Is By The Ark Of The Testimony

"Vail" is simply the old spelling of veil, the thick curtain separating the holy place from the innermost room, the Most Holy Place. This incense altar sat just outside that curtain, as close to the ark as any object was allowed to get without actually crossing behind the veil.

🚪 "Vail" is the old spelling of veil, a thick separating curtain

📍 This altar stood right outside that curtain, not behind it

📏 It was the closest object to the ark allowed outside the veil

---

## 🪑 Before The Mercy Seat That Is Over The Testimony, Where I Will Meet With Thee

The mercy seat was the solid gold lid of the ark, described back in chapter 25, where God's presence uniquely rested above the tablets of the law. Positioning this altar directly in line with that spot meant the daily incense smoke rose toward the very place where God met with Israel.

🪑 The mercy seat was the gold lid of the ark, God's meeting place

📜 "The testimony" refers to the stone tablets kept inside the ark

💨 Incense smoke from this altar rose straight toward that meeting place

# Exodus 30:7-10

# 🕯️ Aaron's Morning And Evening Duty

---

## 🌅 Aaron Shall Burn Thereon Sweet Incense Every Morning

Burning incense here wasn't a special, occasional event; it happened every single morning as a routine part of tabernacle life. "Sweet incense" points ahead to the exact recipe God gives later in this same chapter, one specific blend and no other.

🌅 Burning incense was a daily morning routine, not an occasional act

📋 "Sweet incense" points ahead to the exact recipe given later

🔁 This became one of the tabernacle's steady, repeated rhythms

---

## 🕯️ When He Dresseth The Lamps, He Shall Burn Incense Upon It

"Dresseth" is an old word for trimming and tending, meaning Aaron cleaned the wicks and refilled the oil of the golden lampstand each morning. God ties two separate daily chores together here, the lamps and the incense, so one job reminded the priest to do the other.

🕯️ "Dresseth" means trimming wicks and refilling oil, not dressing clothes

🔗 The lampstand duty and the incense duty were linked together

⏰ Doing one task each morning served as a built-in reminder for the other

---

## 🌇 When Aaron Lighteth The Lamps At Even, He Shall Burn Incense Upon It

The exact same pairing of lamps and incense repeated again at evening, bookending each full day of tabernacle worship. "Even" is simply an old word for evening.

🌇 "Even" is an old word for evening

🔁 Morning and evening incense bookended every single day

🕯️ The same lamp-then-incense pairing repeated twice daily

---

## ♾️ A Perpetual Incense Before The Lord Throughout Your Generations

"Perpetual" means ongoing, never meant to stop or expire. This wasn't a rule for one generation only; it was designed to continue for as long as the tabernacle system itself existed.

♾️ "Perpetual" means continuing on, never scheduled to end

📜 This command wasn't just for Aaron's lifetime alone

👨‍👦‍👦 It was meant to continue through every future generation

---

## 🚫 Ye Shall Offer No Strange Incense Thereon, Nor Burnt Sacrifice, Nor Meat Offering

"Strange" here means unauthorized or different from what God specifically commanded, not simply unusual. God names three things forbidden on this particular altar: any other incense blend, animal sacrifices, and grain offerings.

🚫 "Strange" means unauthorized, not just odd or foreign

📋 Only the one specific incense recipe was ever allowed here

🚷 Sacrifices and grain offerings belonged on the other altar, not this one

---

## 🍷 Neither Shall Ye Pour Drink Offering Thereon

A "drink offering" was a poured-out liquid, usually wine, given as part of other sacrifices elsewhere in Israel's worship. Even that liquid offering was barred from this altar, making its one job, burning incense alone, completely without exception.

🍷 A "drink offering" was wine poured out as part of a sacrifice

🚷 Even this liquid offering was kept off the incense altar

🎯 The altar's single purpose had no exceptions at all

---

## 🩸 Aaron Shall Make An Atonement Upon The Horns Of It Once In A Year With The Blood Of The Sin Offering

This one exception happened only once annually, on the Day of Atonement described later in Leviticus 16. Blood touched only the horns, the four corners, not the whole altar surface, during this single yearly ceremony.

🩸 This one yearly exception is the Day of Atonement, Leviticus 16

📅 "Once in a year" marks this as an annual event, not routine

🐂 Blood touched only the four horns, not the entire altar

---

## 👑 It Is Most Holy Unto The Lord

"Most holy" was the highest category of holiness in the tabernacle system, reserved for only a handful of objects like the ark and this altar. Ranking mattered in this system: everything was holy, but not everything was equally holy.

👑 "Most holy" was the top tier, above ordinary "holy" status

🏆 Only a small number of objects ever received this label

📊 The tabernacle system ranked holiness in clear, deliberate levels

# Exodus 30:11-16

# 💰 The Census Ransom Money

---

## 🔢 When Thou Takest The Sum Of The Children Of Israel After Their Number, Then Shall They Give Every Man A Ransom For His Soul

Taking a census, counting the people, required each man to pay a "ransom," a price paid to cover or protect his life. Later in Israel's history, in 2 Samuel 24, King David takes a census without following this pattern and disaster follows, showing this wasn't a small formality.

🔢 A census here required a payment, not just a headcount

💰 "Ransom" means a price paid to protect or cover a life

📖 2 Samuel 24 shows what went wrong when this pattern was ignored

---

## ⚠️ That There Be No Plague Among Them, When Thou Numberest Them

Counting people carried real spiritual danger in this system, because a census could tempt a leader to trust in numbers and military strength instead of God. The ransom payment was a built-in reminder that every counted man still belonged to God first.

⚠️ Counting people carried a real spiritual risk in this system

💪 A census could tempt leaders to trust raw numbers over God

🙏 The payment reminded everyone that each life still belonged to God

---

## ⚖️ Half A Shekel After The Shekel Of The Sanctuary

A shekel was a unit of weight used for money long before coins existed; people paid in weighed silver, not stamped currency. "The shekel of the sanctuary" names a fixed, official standard weight kept at the tabernacle, since ordinary shekels could otherwise vary by region.

⚖️ A shekel was a weight of silver, used before coins existed

🏛️ "Of the sanctuary" meant one official, fixed standard weight

📏 This stopped regional differences from changing how much was owed

---

## 🪙 A Shekel Is Twenty Gerahs

A "gerah" was the smallest unit of weight in this system, roughly half a gram, used here simply to define exactly how heavy a shekel was. Spelling this out in such precise, small units left zero room for confusion or cheating on the exact amount owed.

🪙 A "gerah" was the smallest weight unit in this system

📐 Twenty gerahs precisely defined the weight of one shekel

🚫 This precision left no room for confusion about the amount owed

---

## 🎂 From Twenty Years Old And Above, Shall Give An Offering Unto The Lord

Twenty years old marked the age where a man became eligible for Israel's military census, counted among the fighting-age men of the nation. This same age threshold shows up again in the book of Numbers when Israel's tribes are formally counted.

🎂 Twenty years old was the threshold for military-age counting

⚔️ It marked entry into the fighting-age men of the nation

📖 The book of Numbers uses this identical age threshold later

---

## ⚖️ The Rich Shall Not Give More, And The Poor Shall Not Give Less

Wealth made no difference to this particular payment; every man, regardless of how much silver he owned, paid the exact same half shekel. No one could buy extra standing before God, and no one was too poor to be counted as fully belonging.

⚖️ Every man paid the same amount, rich or poor alike

🚫 Wealth couldn't buy a higher standing in this system

🤝 Poverty didn't lower anyone's place before God either

---

## 🏛️ Thou Shalt Appoint It For The Service Of The Tabernacle Of The Congregation

This money wasn't just a religious formality; it had a real, practical use, funding the ongoing operation and maintenance of the tabernacle itself. Worship in this system required real resources, not just good intentions.

🏛️ The silver funded the tabernacle's actual ongoing operation

🔧 Worship required real materials and upkeep, not just intentions

💵 This became a functioning income source, not a symbolic gesture

---

## 📿 A Memorial Unto The Children Of Israel Before The Lord, To Make An Atonement For Your Souls

"Memorial" means something meant to keep a truth in constant memory, not just a one-time transaction. Every time this silver was collected, it re-taught the entire nation the same lesson: God owns every life, and every life needed atonement, regardless of rank or wealth.

📿 "Memorial" means something built to keep a truth remembered

🔁 Each collection re-taught the same lesson to the whole nation

🙏 The lesson: every life belongs to God and needs atonement

# Exodus 30:17-21

# 🚰 The Bronze Washing Basin

---

## 🥣 Thou Shalt Also Make A Laver Of Brass, And His Foot Also Of Brass, To Wash Withal

A "laver" is an old word for a large wash basin, and its "foot" is the pedestal base it stood on, both made of bronze rather than gold. Unlike the golden furniture reserved for the holiest spaces, this washing basin used the same metal as the outer courtyard altar, matching its more practical, everyday purpose.

🥣 "Laver" is an old word for a large wash basin

🦶 Its "foot" was the pedestal base the basin rested on

🔶 Bronze, not gold, fit this basin's practical, everyday purpose

---

## 📍 Thou Shalt Put It Between The Tabernacle Of The Congregation And The Altar, And Thou Shalt Put Water Therein

Its exact placement mattered: positioned directly between the tabernacle entrance and the bronze altar, it sat right along the path any priest would walk between the two. No priest could reach the tabernacle without passing this basin first.

📍 It stood exactly between the tabernacle entrance and the altar

🚶 Every priest had to pass it walking between the two

✅ Its placement made washing unavoidable, not optional

---

## 🖐️ For Aaron And His Sons Shall Wash Their Hands And Their Feet Thereat

This washing was different from the one-time bathing during the ordination ceremony in chapter 29; this was an ongoing, repeated ritual for every act of service going forward. Hands for the work a priest would do, feet for the ground he walked on, both needed washing before approaching anything holy.

🖐️ This differs from the one-time ordination washing in chapter 29

🔁 This washing repeated before every act of priestly service

🦶 Hands for their work, feet for their steps, both required cleansing

---

## ⚰️ When They Go Into The Tabernacle Of The Congregation, They Shall Wash With Water, That They Die Not

The stakes attached to this simple act of washing were literally life and death, not a minor formality that could be skipped when convenient. God's presence was treated as genuinely dangerous to approach carelessly, not simply special or important.

⚰️ Skipping this washing carried a literal life-or-death warning

🚫 It was never treated as a skippable, minor formality

⚡ God's presence was approached as genuinely dangerous when careless

---

## 🔥 Or When They Come Near To The Altar To Minister, To Burn Offering Made By Fire Unto The Lord

The same washing requirement applied a second time, at the altar, not just at the tabernacle entrance. Every point of closer approach to God required its own fresh act of cleansing, rather than one wash covering an entire day of service.

🔥 The same washing rule applied again at the altar

📍 Two separate locations both required this same cleansing act

🔁 Closer approach to God meant a fresh washing each time, not one

---

## 📜 So They Shall Wash Their Hands And Their Feet, That They Die Not: And It Shall Be A Statute For Ever

A "statute for ever" is a permanent law meant to never expire or be renegotiated by a later generation. This same warning phrase, "that they die not," repeats for the third time in just five verses, driving home exactly how seriously this basin's use was taken.

📜 A "statute for ever" is a law meant to never expire

🔁 "That they die not" repeats three times in these five verses

⚠️ The repetition itself shows how seriously this rule was taken

---

## 👨‍👦‍👦 To Him And To His Seed Throughout Their Generations

"Seed" here means descendants, Aaron's future family line of priests stretching forward through history. This washing law wasn't written for one man; it became a permanent part of the job for every priest who would ever serve after him.

👨‍👦‍👦 "Seed" means descendants, Aaron's future priestly family line

🔮 The law was written for every future priest, not just Aaron

⏳ It remained in effect for as long as the priesthood existed

# Exodus 30:22-25

# 🌿 Mixing The Holy Anointing Oil

---

## 🌿 Take Thou Also Unto Thee Principal Spices

"Principal" means chief, the finest and most valuable grade available, not a shortcut or budget substitute. Every ingredient in this recipe had to meet the same top-quality standard before it could go anywhere near this holy blend.

🌿 "Principal" means the finest, top-quality grade available

🚫 No shortcut or lesser-quality substitute was acceptable here

✨ Every single ingredient had to meet this same high standard

---

## 🌸 Of Pure Myrrh Five Hundred Shekels

Myrrh was a fragrant resin harvested from a thorny desert tree, valuable enough to be counted and traded by exact weight, just like silver. This same rare spice reappears much later in Scripture as one of the gifts the wise men brought to the infant Jesus in Matthew 2.

🌸 Myrrh was a fragrant resin from a thorny desert tree

⚖️ It was valuable enough to be weighed out like silver

👶 Matthew 2 lists this same spice among the magi's gifts to Jesus

---

## 🌶️ And Of Sweet Cinnamon Half So Much, Even Two Hundred And Fifty Shekels

Cinnamon here wasn't the common kitchen spice familiar today; it had to be imported over enormous trade distances from far to the east, making it extraordinarily expensive and rare in the ancient Near East. Its cost required exactly half as much weight as the myrrh, hinting the myrrh itself was somewhat less costly ounce for ounce.

🌶️ This cinnamon traveled enormous trade distances from the east

💰 It was extraordinarily rare and expensive in this region

📐 Its amount was set at exactly half the weight of the myrrh

---

## 🌾 And Of Sweet Calamus Two Hundred And Fifty Shekels

"Calamus," sometimes called sweet cane, was an aromatic reed harvested from marshy wetlands, also imported from distant lands like cinnamon. Matching amounts of cinnamon and calamus suggest these two ingredients balanced each other's scent in the finished blend.

🌾 "Calamus" was an aromatic reed grown in marshy wetlands

🚢 It was imported from distant lands, much like the cinnamon

⚖️ Matching amounts hint the two balanced each other's scent

---

## 🌳 And Of Cassia Five Hundred Shekels, After The Shekel Of The Sanctuary

Cassia came from the inner bark of a tree closely related to cinnamon, giving it a similar but distinct fragrance. Its amount matched the myrrh exactly, five hundred shekels each, weighed using that same fixed official sanctuary standard mentioned earlier for the census money.

🌳 Cassia came from a tree closely related to the cinnamon tree

⚖️ Its weight, five hundred shekels, matched the myrrh exactly

🏛️ It used the same fixed sanctuary weight standard as before

---

## 🫒 And Of Oil Olive An Hin

A "hin" was an ancient liquid measurement, roughly a gallon, likely borrowed originally from Egyptian measuring systems Israel would have known from their four hundred years there. This olive oil served as the actual base liquid that carried all four measured spices into one finished mixture.

🫒 A "hin" was a liquid measure, roughly one gallon

🇪🇬 The measurement likely traces back to Egyptian usage

🧴 Olive oil was the base liquid carrying the spices together

---

## 🧪 And Thou Shalt Make It An Oil Of Holy Ointment, An Ointment Compound After The Art Of The Apothecary

An "apothecary" was the ancient equivalent of a skilled perfumer or pharmacist, trained in precisely blending oils, spices, and medicines. "Compound" here means expertly mixed, not simply dumped together, requiring real trained skill to produce correctly.

🧪 An "apothecary" was an ancient trained perfumer or pharmacist

🎯 "Compound" means expertly and precisely mixed, not just combined

📚 Making this oil correctly required real, trained skill

---

## 👑 It Shall Be An Holy Anointing Oil

This single, carefully measured recipe became the one official oil used for every anointing ceremony described in the rest of the chapter. No other formula, however similar, could substitute for this exact one.

👑 This one recipe became the official oil for every anointing

🔒 No similar substitute formula was ever allowed to replace it

📋 The exact recipe itself carried lasting, official weight

# Exodus 30:26-30

# 👑 Anointing Everything And Everyone Holy

---

## 🕍 And Thou Shalt Anoint The Tabernacle Of The Congregation Therewith, And The Ark Of The Testimony

"Therewith" simply means "with it," referring back to the oil just described. The very same oil poured onto Aaron in chapter 29 was now applied to the entire building and its most sacred object, tying every part of this system together with one identical substance.

🕍 "Therewith" is an old word simply meaning "with it"

🔗 The same oil connected the whole building to its holiest object

⛺ One single recipe anointed both the tent and the ark inside it

---

## 🍞 And The Table And All His Vessels, And The Candlestick And His Vessels, And The Altar Of Incense

This lists the table for showbread, the golden lampstand, and the incense altar just described earlier in this very chapter, each object built in earlier chapters now receiving this same anointing. Nothing inside the holy place was left untouched by this oil.

🍞 The table held the showbread described in earlier chapters

🕯️ The candlestick is the golden lampstand from chapter 25

✅ Every furnishing inside the holy place received this same oil

---

## 🐂 And The Altar Of Burnt Offering With All His Vessels, And The Laver And His Foot

The anointing extended beyond the holy place, reaching all the way out into the courtyard to the bronze altar and the washing basin just described. Even outer, more accessible objects received the identical treatment as the innermost gold furniture.

🐂 The oil reached out to the courtyard, not just the inner room

🥣 The washing basin just described was included in this anointing

⚖️ Outer, everyday objects received the same treatment as the holiest ones

---

## ✨ And Thou Shalt Sanctify Them, That They May Be Most Holy

"Sanctify" means to formally set apart for God's exclusive use, moving an object from ordinary status into "most holy" territory. This is the same top-tier ranking given earlier to the incense altar, now extended across this entire list of objects.

✨ "Sanctify" means formally set apart for God's exclusive use

🏆 "Most holy" is the same top ranking given to the incense altar

📈 Ordinary objects were moved into this highest possible category

---

## 🤲 Whatsoever Toucheth Them Shall Be Holy

This holiness was described as contagious in one direction, spreading outward from these objects to anything that touched them. This same principle appeared with the altar back in chapter 29, showing this wasn't a one-time idea but a consistent rule running through the whole tabernacle system.

🤲 Holiness here spread outward through simple contact

🔁 Chapter 29 already established this exact same principle

📐 It functioned as a consistent rule, not an isolated exception

---

## 👨‍⚕️ And Thou Shalt Anoint Aaron And His Sons, And Consecrate Them

The identical oil that had just sanctified the building and its furniture was now poured on people. Objects and people were bound together by literally the same substance, not just a similar ceremony performed separately.

👨‍⚕️ The same oil used on objects was now poured onto people

🔗 One substance bound both the furniture and the priests together

🎯 This wasn't a similar ceremony, it was the identical oil

---

## ⛪ That They May Minister Unto Me In The Priest's Office

"Minister" means to serve in an official, appointed role, not a casual or voluntary task. This phrase closes the loop from chapter 28's garment instructions and chapter 29's ordination ceremony, all three chapters together finally producing functioning priests.

⛪ "Minister" means serving in a formal, officially appointed role

🔗 This closes a loop begun back in chapters 28 and 29

✅ Garments, ordination, and anointing together finally produced priests

# Exodus 30:31-33

# 🚫 The Oil Nobody Else Can Wear

---

## 📢 Speak Unto The Children Of Israel, Saying, This Shall Be An Holy Anointing Oil Unto Me Throughout Your Generations

This warning was addressed to every ordinary Israelite, not just to priests, because the temptation to imitate or steal this valuable recipe applied to the whole nation. "Throughout your generations" repeats the same permanent, ongoing language already used for the incense earlier in the chapter.

📢 This warning was spoken to the whole nation, not just priests

⚠️ The temptation to copy this valuable recipe applied to everyone

♾️ "Throughout your generations" marks this as a permanent rule

---

## 🚷 Upon Man's Flesh Shall It Not Be Poured

Ordinary people were flatly barred from ever wearing this specific oil on their own skin, no matter their wealth or status. Its exclusivity was what made anointing with it mean something; if anyone could wear it casually, it would stop marking anything as special.

🚷 No ordinary person could ever wear this specific oil

💎 Its exclusivity was exactly what gave the anointing meaning

⚖️ Wealth or status made no exception to this rule

---

## 🧪 Neither Shall Ye Make Any Other Like It, After The Composition Of It

"Composition" means the exact recipe, the specific ratio of ingredients just measured out earlier in the chapter. Copying that formula for personal perfume, even without ever pouring it on skin, was itself already forbidden.

🧪 "Composition" means the exact recipe and ingredient ratios

🚫 Even making a copy for personal perfume was forbidden

🔒 The formula itself was treated as sacred, not just its use

---

## ✂️ Whosoever Compoundeth Any Like It, Or Whosoever Putteth Any Of It Upon A Stranger

"Stranger" here doesn't mean a foreigner; it means anyone outside the anointed priestly family, including ordinary Israelites, the same meaning this word carried back in chapter 29. Two separate crimes are named here: making a copy, or giving the real oil to someone unauthorized to wear it.

✂️ "Stranger" means anyone outside the priestly family, not a foreigner

🇮🇱 Ordinary Israelites counted as "strangers" to this oil

⚖️ Making a copy and giving away the real oil were both crimes

---

## ⚔️ He Shall Even Be Cut Off From His People

"Cut off" was one of the most severe penalties in this legal system, meaning complete removal and exclusion from the covenant community. This same harsh penalty appears again at the very end of this chapter, bookending it with the identical warning.

⚔️ "Cut off" was one of the harshest penalties in this legal system

🚪 It meant total removal and exclusion from the whole community

🔁 This exact same penalty repeats again at the chapter's end

# Exodus 30:34-38

# 💨 The Holy Incense Recipe

---

## 🌿 Take Unto Thee Sweet Spices, Stacte, And Onycha, And Galbanum

"Stacte" was a fragrant, gum-like resin, likely a form of myrrh that dripped naturally from certain trees. "Onycha" came from a shell of a sea creature, and "galbanum" was a bitter, sharp-smelling resin, an unusual ingredient to include among otherwise sweet-smelling spices.

🌿 "Stacte" was a fragrant resin, likely a form of dripped myrrh

🐚 "Onycha" was an aromatic ingredient sourced from a sea creature's shell

🌫️ "Galbanum" was sharp and bitter-smelling, unlike the other spices

---

## 🕊️ These Sweet Spices With Pure Frankincense: Of Each Shall There Be A Like Weight

Frankincense was a fragrant white resin from a specific tree, prized enough to later become one of the three gifts brought to the infant Jesus in Matthew 2, alongside the myrrh mentioned earlier in this chapter. "A like weight" means all four ingredients, stacte, onycha, galbanum, and frankincense, were measured out in exactly equal amounts.

🕊️ Frankincense was a prized white resin from a specific tree

👶 It reappears in Matthew 2 as a gift brought to the infant Jesus

⚖️ "A like weight" means all four ingredients were measured equally

---

## 🧪 And Thou Shalt Make It A Perfume, A Confection After The Art Of The Apothecary, Tempered Together, Pure And Holy

"Confection" here is an old word for a carefully blended compound, not candy in the modern sense. "Tempered" means thoroughly and evenly mixed, made once again by that same trained apothecary skill mentioned earlier with the anointing oil.

🧪 "Confection" here means a carefully blended compound, not candy

🔄 "Tempered" means the ingredients were mixed thoroughly and evenly

📚 The same trained apothecary skill from the oil recipe was required

---

## ⚱️ And Thou Shalt Beat Some Of It Very Small, And Put Of It Before The Testimony In The Tabernacle Of The Congregation

Grinding the incense down to a fine powder let it burn evenly and release its fragrance completely, rather than smoldering unevenly in larger chunks. "Before the testimony" places this incense right where the golden altar already stood, close to the ark holding the stone tablets.

⚱️ Grinding it to fine powder let it burn evenly and completely

🔥 Larger, unground chunks would have burned poorly by comparison

📍 "Before the testimony" places it near the altar close to the ark

---

## 👑 It Shall Be Unto You Most Holy

The exact same top-tier "most holy" ranking already applied to the ark, the incense altar, and the anointing oil now applied to this finished incense blend as well. This chapter consistently reserves its highest label for anything most directly connected to God's presence.

👑 This incense received the same top ranking as the ark and altar

🔁 "Most holy" consistently marks whatever sits closest to God

📊 The chapter's holiness ranking stayed completely consistent

---

## 🚫 As For The Perfume Which Thou Shalt Make, Ye Shall Not Make To Yourselves According To The Composition Thereof

The exact same warning already given about the anointing oil's formula repeats here for the incense recipe. Both of this chapter's two most sacred formulas received identical protection against being copied for ordinary, personal use.

🚫 This repeats the same copying ban already given for the oil

🔁 Both sacred formulas in this chapter received identical protection

🔒 Neither recipe could be reproduced for ordinary personal use

---

## 👃 Whosoever Shall Make Like Unto That, To Smell Thereto, Shall Even Be Cut Off From His People

"To smell thereto" means using it simply to enjoy its fragrance for oneself, not necessarily using it in worship at all. Even that private, seemingly harmless use of a copied blend still carried the same severe penalty already named earlier in the chapter for misusing the anointing oil.

👃 "To smell thereto" means enjoying its scent for personal pleasure

😮 Even this private, seemingly harmless use carried the harshest penalty

🔁 The chapter closes with the identical warning it opened with earlier`;

export const EXODUS_THIRTY_PERSONAL_SECTIONS = parseExodusThirtyRawNotes(EXODUS_THIRTY_RAW_NOTES);
