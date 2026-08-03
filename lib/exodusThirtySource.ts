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
## 🪵 An Altar To Burn Incense Upon

This altar had one job only.

It burned incense, never meat or grain.

The bronze altar in the courtyard burned animal sacrifices.

This smaller altar stood inside, in the holy place.

"Shittim wood" means acacia wood, the same tough desert wood used for the ark.

🔥 This altar burns only incense

🪵 Shittim wood means tough acacia wood

📍 It stood inside the holy place

📖 A fourth altar with one job

## 📏 A Cubit Shall Be The Length Thereof And A Cubit The Breadth Thereof

A cubit was an ancient unit of measure.

It was based on the length of a forearm.

That put a cubit at about eighteen inches.

"Foursquare" means the base formed an equal square.

Every side matched the other three exactly.

This altar was small, about the size of a tabletop.

📏 A cubit measured about eighteen inches

⬜ Foursquare means an equal square base

🍽️ The altar was about tabletop sized

📖 Every side matched exactly the same

## 📐 Two Cubits Shall Be The Height Thereof The Horns Thereof Shall Be Of The Same

This altar stood about three feet tall.

That made it about waist high to an adult.

"Horns" were pointed corners carved at each top corner.

There were four horns in total, one per corner.

They came from the same block of wood as the altar.

Nothing was attached separately or glued on later.

📐 The altar stood about three feet tall

🐂 Horns were pointed corners at the top

🪵 All four horns came from one block

📖 Nothing on this altar was added later

## ✨ Thou Shalt Overlay It With Pure Gold

"Overlay" means covering something with a thin layer.

This altar was not built from solid gold.

Wood sat underneath the gold for real strength.

Solid gold alone would have been too soft on its own.

The gold gave the altar its holy shine.

✨ Overlay means a thin gold covering

🪵 Wood sat underneath for real strength

🚫 This altar was never solid gold

📖 Wood gave shape, gold gave shine

## 👑 Thou Shalt Make Unto It A Crown Of Gold Round About

This "crown" was not worn on anyone's head.

It was a decorative gold rim running around the top edge.

Think of a picture frame border on a piece of furniture.

It marked the altar's edge and gave it a finished look.

👑 This crown was not for a head

🖼️ It was a gold rim on top

🪑 Picture frames work the same way

📖 The rim gave the altar a finished edge

# Exodus 30:4-6
# 🪵 Carrying It Like The Ark
---
## 💍 Two Golden Rings Shalt Thou Make To It

Two gold rings were fixed near the top of the altar.

They sat on two opposite sides, not all four.

Their purpose is not explained in this verse.

The very next verse reveals exactly why they were there.

This same pattern shows up for almost every piece of tabernacle furniture.

Build the part first, then explain the reason.

💍 Two rings sat on opposite sides

🔜 Their purpose comes in the next verse

🔁 Nearly every tabernacle object follows this pattern

📖 Build first, then explain why

## 🚶 They Shall Be For Places For The Staves To Bear It Withal

"Staves" means carrying poles.

"Withal" is an old word for "with it" or "by means of it."

The poles slid through the rings on each side.

Two men could then lift and carry the altar together.

This altar was never meant to stay bolted in one spot.

It moved with Israel through the wilderness.

🚶 Staves means the carrying poles

⛺ Two men lifted it by the poles

📖 Withal means by means of it

➡️ It moved with Israel through the desert

## 🔗 Thou Shalt Make The Staves Of Shittim Wood And Overlay Them With Gold

These carrying poles matched the altar's own design.

Acacia wood formed the core.

A layer of gold covered the outside.

The ark's poles back in chapter twenty five used this same wood and gold combination.

That matching design was not an accident.

It tied this altar to the ark as one connected set.

🪵 The poles matched the altar's design

🔗 Chapter twenty five used this same design

⚖️ Wood and gold tied both objects together

📖 The match was on purpose, not chance

## 🚪 Thou Shalt Put It Before The Vail That Is By The Ark Of The Testimony

"Vail" is simply the old spelling of veil.

A veil was a thick curtain.

It separated the holy place from the innermost room.

That innermost room was called the Most Holy Place.

This altar stood just outside that curtain.

It was the closest object to the ark still allowed outside the veil.

🚪 Vail is the old spelling of veil

📍 The veil separated two sacred rooms

🔒 The ark sat behind that curtain

📖 This altar stood as close as allowed

## 🪑 Before The Mercy Seat That Is Over The Testimony Where I Will Meet With Thee

The mercy seat was the solid gold lid of the ark.

Chapter twenty five already described it in detail.

It was the exact spot where God's presence rested above the stone tablets.

This altar stood in direct line with that spot.

Every morning and evening, incense smoke rose straight toward where God met with Israel.

🪑 The mercy seat was the ark's gold lid

📜 The testimony means the stone tablets inside

💨 Incense rose toward that exact spot

📖 Worship pointed straight at God's presence

# Exodus 30:7-10
# 🕯️ Aaron's Morning And Evening Duty
---
## 🌅 Aaron Shall Burn Thereon Sweet Incense Every Morning

Burning incense was not a rare, special event.

It happened every single morning without fail.

"Sweet incense" points ahead to one exact recipe.

That recipe comes later in this same chapter.

This became one of the tabernacle's steady daily rhythms.

🌅 Incense burned every morning without fail

📋 Sweet incense points to a later recipe

🔁 This became a steady daily rhythm

📖 Worship here ran on daily repetition

## 🕯️ When He Dresseth The Lamps He Shall Burn Incense Upon It

"Dresseth" is an old word for trimming and tending.

Aaron trimmed the wicks of the golden lampstand each morning.

He also refilled its oil at the same time.

God links two separate chores together in this one verse.

Tending the lamps became the built in reminder to burn the incense.

🕯️ Dresseth means trimming and refilling oil

🔗 Two morning chores were linked together

⏰ One task reminded Aaron of the other

📖 Small routines carried real spiritual weight

## 🌇 When Aaron Lighteth The Lamps At Even He Shall Burn Incense Upon It

"Even" is simply an old word for evening.

The same pairing of lamps and incense happened again at night.

Morning and evening together bookended every full day of worship.

Nothing about this rhythm changed from one day to the next.

🌇 Even is an old word for evening

🔁 Morning and evening both got incense

🕯️ The same lamp and incense pairing repeated

📖 This rhythm marked every single day

## ♾️ A Perpetual Incense Before The Lord Throughout Your Generations

"Perpetual" means ongoing, with no planned end.

This command was not written for Aaron's lifetime alone.

It was meant to continue through every future generation of priests.

As long as the tabernacle system stood, this rule stood with it.

♾️ Perpetual means ongoing with no end

👨‍👦‍👦 This rule outlived Aaron's own lifetime

🔮 Future priests inherited the same duty

📖 A command built to never expire

## 🚫 Ye Shall Offer No Strange Incense Thereon

"Strange" here does not mean unusual or foreign.

It means unauthorized, anything other than what God commanded.

Only the one exact recipe from later in this chapter could be burned here.

No other blend, however similar, was allowed near this altar.

🚫 Strange means unauthorized, not just odd

📋 Only one exact recipe was allowed

🔒 No similar blend could substitute for it

📖 God controlled this altar down to the scent

## 🍷 Nor Burnt Sacrifice Nor Meat Offering Neither Shall Ye Pour Drink Offering Thereon

This verse rules out three more things on this altar.

No animal sacrifices belonged here, only on the bronze altar outside.

No grain offerings belonged here either.

A "drink offering" was wine poured out as part of another sacrifice.

Even that liquid offering was kept off this altar completely.

This altar's one job had no exceptions at all.

🐂 Animal sacrifices stayed on the outer altar

🌾 Grain offerings were kept off this altar

🍷 Drink offering means wine poured out

📖 This altar's one job had no exceptions

## 🩸 Aaron Shall Make An Atonement Upon The Horns Of It Once In A Year

This is the one exception to the no exceptions rule.

Once each year, blood touched the horns of this altar.

That blood came from the sin offering on the Day of Atonement.

Leviticus sixteen describes that yearly ceremony in full detail.

Blood touched only the four horns, not the whole altar surface.

🩸 One yearly exception touched this altar

📅 Once a year marks an annual event

🐂 Blood touched only the four horns

📖 Leviticus sixteen explains this ceremony fully

## 👑 It Is Most Holy Unto The Lord

"Most holy" was the highest rank of holiness in this system.

Only a small number of objects ever carried this label.

The ark carried it, and now this altar carries it too.

Not everything holy was equally holy in this system.

👑 Most holy was the highest rank

🏆 Very few objects carried this label

📊 Holiness here came in clear levels

📖 This altar ranked with the ark itself

# Exodus 30:11-16
# 💰 The Census Ransom Money
---
## 🔢 When Thou Takest The Sum Of The Children Of Israel Then Shall They Give Every Man A Ransom For His Soul

Taking a census here meant counting every man in Israel.

Counting alone was not allowed.

Each man had to pay a "ransom," a price paid to cover his life.

Many years later, King David took a census without this payment.

Second Samuel twenty four shows the disaster that followed.

🔢 A census required a payment, not a count

💰 Ransom means a price paid for a life

⚠️ Skipping this payment was never small

📖 Second Samuel twenty four shows what went wrong

## ⚠️ That There Be No Plague Among Them When Thou Numberest Them

Counting people carried a real spiritual danger in this system.

A census could tempt a leader to trust raw numbers instead of God.

The ransom payment stood as a built in reminder.

Every counted man still belonged to God first, not to the army count.

⚠️ Counting people carried real spiritual risk

💪 Numbers could tempt leaders to trust themselves

🙏 The payment reminded them life belonged to God

📖 A headcount was never the real danger

## ⚖️ Half A Shekel After The Shekel Of The Sanctuary

A shekel was a unit of weight, not a coin.

People paid in weighed silver long before stamped coins existed.

"Of the sanctuary" named one official, fixed standard weight.

That fixed weight was kept at the tabernacle itself.

Ordinary shekels could otherwise vary from region to region.

⚖️ A shekel was a weight, not a coin

🏛️ Of the sanctuary meant one fixed standard

📏 This stopped regional weights from varying

📖 One official weight kept the payment fair

## 🪙 A Shekel Is Twenty Gerahs

A "gerah" was the smallest unit of weight in this system.

It weighed only about half a gram.

Naming the exact number of gerahs defined a shekel with total precision.

That precision left no room for confusion or cheating.

🪙 Gerah was the smallest weight unit

📐 Twenty gerahs defined one exact shekel

🚫 No room was left for cheating

📖 Precision protected the fairness of the payment

## 🎂 From Twenty Years Old And Above Shall Give An Offering Unto The Lord

Twenty years old marked a specific threshold in Israel.

It was the age a man became eligible for military service.

This same payment counted him among the fighting age men of the nation.

The book of Numbers later uses this identical age threshold again.

🎂 Twenty years old marked military age

⚔️ It counted a man among the army

🔁 One age rule carried across two books

📖 Numbers later repeats this same threshold

## ⚖️ The Rich Shall Not Give More And The Poor Shall Not Give Less

Wealth made no difference to this specific payment.

Every man paid the exact same half shekel.

No one could buy a higher standing before God with extra silver.

No one was too poor to count as fully belonging either.

⚖️ Every man paid the same amount

🚫 Wealth bought no higher standing here

🤝 Poverty lowered no one's standing either

📖 God valued every life the same

## 🏛️ Thou Shalt Appoint It For The Service Of The Tabernacle Of The Congregation

This silver was not just a religious formality.

It funded the tabernacle's actual ongoing operation and upkeep.

Worship in this system required real materials, not only good intentions.

The ransom money became a genuine, working source of income.

🏛️ The silver funded real tabernacle upkeep

🔧 Worship required materials, not just intentions

💵 This became an actual income source

📖 Faith here still needed real resources

## 📿 A Memorial Unto The Children Of Israel Before The Lord To Make An Atonement For Your Souls

"Memorial" means something built to keep a truth remembered.

This was not a single, forgettable transaction.

Every collection retaught the whole nation the same lesson again.

God owned every life, and every life needed atonement.

Rank and wealth never changed that lesson.

📿 Memorial means built to stay remembered

🔁 Each collection retaught the same lesson

🙏 Every life belonged to God first

📖 Rank and wealth changed nothing here

# Exodus 30:17-21
# 🚰 The Bronze Washing Basin
---
## 🥣 Thou Shalt Also Make A Laver Of Brass And His Foot Also Of Brass To Wash Withal

A "laver" is an old word for a large wash basin.

Its "foot" was the pedestal base the basin rested on.

Both pieces were made of bronze, not gold.

Bronze matched the outer courtyard altar, not the golden inner furniture.

This basin's plain metal fit its plain, practical purpose.

🥣 Laver means a large wash basin

🦶 Foot means the pedestal base below it

🔶 Bronze matched its practical, everyday purpose

📖 Not every holy object was gold

## 📍 Thou Shalt Put It Between The Tabernacle Of The Congregation And The Altar

This basin's exact spot mattered.

It stood directly between the tabernacle entrance and the bronze altar.

Every priest walked right past it on the way between the two.

No priest could reach the tabernacle without passing this basin first.

📍 It stood between the tent and the altar

🚶 Every priest walked past it each time

✅ Washing became unavoidable, never optional

📖 Placement itself enforced the rule

## 🖐️ For Aaron And His Sons Shall Wash Their Hands And Their Feet Thereat

Chapter twenty nine already described a one time washing at Aaron's ordination.

This washing was different.

It repeated before every single act of priestly service, not just once.

Hands were washed for the work a priest would do.

Feet were washed for the ground he had just walked on.

🖐️ This differs from the one time ordination bath

🔁 This washing repeated before every service

🦶 Feet were washed for the ground walked

📖 Both hands and feet needed cleansing

## ⚰️ When They Go Into The Tabernacle They Shall Wash With Water That They Die Not

The warning attached to this washing was literal, not exaggerated.

Skipping it was treated as a life and death risk, not a small formality.

God's presence here was approached as genuinely dangerous when handled carelessly.

This was never simply about staying clean.

⚰️ Skipping this washing risked real danger

🚫 It was never a minor formality

⚡ Careless approach to God was dangerous

📖 This was about reverence, not cleanliness

## 🔁 So They Shall Wash Their Hands And Their Feet That They Die Not

This exact warning repeats here for a third time in five verses.

Ancient writers did not repeat words carelessly.

Repetition like this marked how seriously a rule mattered.

The stakes of this small basin were spelled out again and again.

🔁 This warning repeats for a third time

📜 Ancient repetition was never accidental filler

⚠️ Repetition showed how serious this rule was

📖 A small basin carried very high stakes

## 📜 And It Shall Be A Statute For Ever To Him And To His Seed Throughout Their Generations

A "statute for ever" was a permanent law.

It was never meant to expire or be renegotiated later.

"Seed" here means descendants, Aaron's future family line of priests.

This law was not written for one man alone.

It became a permanent part of the job for every priest after him.

📜 Statute for ever means a permanent law

👨‍👦‍👦 Seed means descendants, Aaron's future line

🔮 Every future priest inherited this same duty

📖 One rule outlasted one single lifetime

# Exodus 30:22-25
# 🌿 Mixing The Holy Anointing Oil
---
## 🌿 Take Thou Also Unto Thee Principal Spices

"Principal" means chief, the finest grade available.

Nothing here was a shortcut or a budget substitute.

Every single ingredient in this recipe had to meet that same top standard.

God cared about quality down to the smallest detail.

🌿 Principal means the finest grade available

🚫 No shortcut ingredient was acceptable

✨ Every ingredient met the same high standard

📖 Quality mattered down to the smallest detail

## 🌸 Of Pure Myrrh Five Hundred Shekels

Myrrh was a fragrant resin harvested from a thorny desert tree.

It was valuable enough to be weighed out like silver.

Five hundred shekels was a large, costly amount.

This same rare spice reappears in Matthew two as a gift for the infant Jesus.

🌸 Myrrh was resin from a thorny desert tree

⚖️ It was weighed out like silver

👶 Matthew two lists this same gift for Jesus

📖 One spice connects two very different stories

## 🌶️ Of Sweet Cinnamon Half So Much Even Two Hundred And Fifty Shekels

This was not the common kitchen spice known today.

It had to be imported over enormous trade distances from the east.

That distance made it extraordinarily expensive and rare in this region.

Its amount was set at exactly half the weight of the myrrh.

🌶️ This cinnamon traveled great trade distances

💰 Distance made it rare and costly

📐 Its weight was half the myrrh's

📖 Rare ingredients filled this holy recipe

## 🌾 Of Sweet Calamus Two Hundred And Fifty Shekels

"Calamus" was an aromatic reed grown in marshy wetlands.

It was also imported from distant lands, much like the cinnamon.

Its amount matched the cinnamon exactly, shekel for shekel.

Matching amounts likely meant these two ingredients balanced each other's scent.

🌾 Calamus was a reed from wetlands

🚢 It came from distant lands too

⚖️ Its amount matched the cinnamon exactly

📖 Balanced amounts balanced the finished scent

## 🌳 Of Cassia Five Hundred Shekels After The Shekel Of The Sanctuary

Cassia came from the inner bark of a tree closely related to cinnamon.

Its scent was similar but still distinct from cinnamon's.

Its weight, five hundred shekels, matched the myrrh exactly.

Both were measured using that same fixed sanctuary standard named earlier in this chapter.

🌳 Cassia came from a cinnamon relative tree

👃 Its scent was similar but distinct

⚖️ Its weight matched the myrrh exactly

📖 One fixed standard weighed every spice

## 🫒 And Of Oil Olive An Hin

A "hin" was an ancient liquid measurement, close to one gallon.

This measurement likely traced back to Egyptian usage.

Israel would have known that system from four hundred years spent there.

Olive oil served as the base liquid carrying all four spices together.

🫒 A hin equaled about one gallon

🇪🇬 This measure likely traced back to Egypt

🧴 Olive oil carried all four spices

📖 A borrowed measure held a holy mixture

## 🧪 Thou Shalt Make It An Oil Of Holy Ointment After The Art Of The Apothecary

An "apothecary" was an ancient trained perfumer and healer.

"Compound" here means expertly and precisely blended, not simply poured together.

Making this oil correctly required real, trained skill.

This single measured recipe became the one official oil for the chapter's anointing ceremonies.

🧪 Apothecary means a trained ancient perfumer

🎯 Compound means expertly blended, not dumped

📚 This oil required real trained skill

📖 One recipe served every anointing ahead

# Exodus 30:26-30
# 👑 Anointing Everything And Everyone Holy
---
## 🕍 And Thou Shalt Anoint The Tabernacle Of The Congregation Therewith And The Ark Of The Testimony

"Therewith" simply means "with it," pointing back to the oil just described.

The very same oil anointed the entire building and its most sacred object.

Nothing separated the tent from the ark inside it.

One identical substance now tied both together.

🕍 Therewith means with the oil just described

🔗 One oil connected the tent and the ark

⛺ Building and object shared this anointing

📖 One substance, one holy building

## 🍞 And The Table And The Candlestick And The Altar Of Incense

This list names the table, the candlestick, and this chapter's incense altar.

"Candlestick" is another name for the golden lampstand.

Each piece was already built in earlier chapters.

Now every single one received this same anointing.

🍞 The table held the bread inside

🕯️ Candlestick means the golden lampstand

✅ Every holy place object got anointed

📖 Nothing sacred inside was left out

## 🐂 And The Altar Of Burnt Offering With All His Vessels And The Laver And His Foot

The anointing did not stop inside the holy place.

It reached all the way out to the courtyard.

The bronze altar and the washing basin both received the same oil.

Even outer, everyday objects got the same treatment as the innermost gold furniture.

🐂 Anointing reached the outer courtyard too

🥣 The washing basin was included here

⚖️ Outer objects matched inner ones exactly

📖 Holiness reached every part of the space

## ✨ And Thou Shalt Sanctify Them That They May Be Most Holy

"Sanctify" means to set something apart for God's use alone.

This anointing moved ordinary objects into "most holy" territory.

That is the same top rank already given to the incense altar earlier in this chapter.

An entire list of objects now shared that highest rank.

✨ Sanctify means set apart for God alone

🏆 Most holy is the chapter's top rank

📈 Ordinary objects rose to this highest rank

📖 One rank now covered an entire list

## 🤲 Whatsoever Toucheth Them Shall Be Holy

This holiness spread outward through simple contact.

Anything that touched these objects became holy too.

Chapter twenty nine already established this exact same principle for the altar.

This was a consistent rule running through the whole system, not a one time idea.

🤲 Holiness spread through simple touch

🔁 Chapter twenty nine already showed this rule

📐 This was a consistent system wide rule

📖 Holiness here could spread by contact

## 👨‍⚕️ And Thou Shalt Anoint Aaron And His Sons And Consecrate Them That They May Minister Unto Me

The identical oil that had just anointed the building was now poured on people.

Objects and priests were bound together by the very same substance.

"Minister" means to serve in an official, appointed role.

This moment closes a loop begun back in chapters twenty eight and twenty nine.

Garments, ordination, and now anointing together finally produced functioning priests.

👨‍⚕️ The same oil anointed objects and people

⛪ Minister means serving in an appointed role

🔗 This closes a loop from earlier chapters

📖 Garments, ordination, and oil made priests

# Exodus 30:31-33
# 🚫 The Oil Nobody Else Can Wear
---
## 📢 This Shall Be An Holy Anointing Oil Unto Me Throughout Your Generations

This warning was spoken to the whole nation of Israel.

It was not addressed only to the priests.

The temptation to copy this valuable recipe applied to everyone.

"Throughout your generations" repeats the same permanent language used earlier for the incense.

📢 This warning reached the whole nation

⚠️ Everyone faced the same temptation

♾️ Throughout your generations means a permanent rule

📖 Value always tempts someone to copy it

## 🚷 Upon Man's Flesh Shall It Not Be Poured

Ordinary people could never wear this specific oil on their own skin.

Wealth or status made no exception to this rule.

Its exclusivity was exactly what gave the anointing its meaning.

If anyone could wear it casually, it would stop marking anything as special.

🚷 No ordinary person could wear this oil

⚖️ Wealth or status changed nothing here

💎 Exclusivity gave the anointing its meaning

📖 Something worn by everyone means nothing

## 🧪 Neither Shall Ye Make Any Other Like It After The Composition Of It

"Composition" means the exact recipe and ratio of ingredients.

That recipe was measured out earlier in this chapter.

Copying that formula for personal perfume was already forbidden.

This held true even if it was never worn on skin.

🧪 Composition means the exact recipe used

🚫 Copying the formula was already forbidden

👃 This held true even for personal perfume

📖 The formula itself was treated as sacred

## ✂️ Whosoever Compoundeth Any Like It Or Putteth Any Of It Upon A Stranger

"Stranger" here does not mean a foreigner.

It means anyone outside the anointed priestly family.

That included ordinary Israelites, not just outsiders from other nations.

Two separate crimes are named in this one verse.

Making a copy was one crime, and giving away the real oil was the other.

✂️ Stranger means outside the priestly family

🇮🇱 Ordinary Israelites counted as strangers here

⚖️ Copying and giving away were both crimes

📖 One word carried a specific legal meaning

## ⚔️ He Shall Even Be Cut Off From His People

"Cut off" was one of the harshest penalties in this legal system.

It meant complete removal from the whole covenant community.

This exact same penalty appears again at the very end of this chapter.

That repetition bookends the chapter with an identical warning.

⚔️ Cut off meant total community removal

🚪 This was one of the harshest penalties

🔁 The same penalty repeats at the chapter's end

📖 One warning framed the whole chapter

# Exodus 30:34-38
# 💨 The Holy Incense Recipe
---
## 🌿 Take Unto Thee Sweet Spices Stacte And Onycha And Galbanum

"Stacte" was a fragrant, gum like resin.

It was likely a form of myrrh that dripped naturally from certain trees.

"Onycha" came from the shell of a sea creature.

"Galbanum" was a bitter, sharp smelling resin.

That sharp scent was unusual among otherwise sweet smelling spices.

🌿 Stacte was likely a dripped myrrh resin

🐚 Onycha came from a sea creature's shell

🌫️ Galbanum was sharp and bitter smelling

📖 One odd ingredient balanced the sweet ones

## 🕊️ These Sweet Spices With Pure Frankincense Of Each Shall There Be A Like Weight

Frankincense was a fragrant white resin from a specific tree.

It later became one of the three gifts brought to the infant Jesus in Matthew two.

Myrrh, named earlier in this chapter, was the second of those three gifts.

"A like weight" means all four ingredients were measured in exactly equal amounts.

🕊️ Frankincense was a prized white resin

👶 Matthew two lists it as Christ's gift

⚖️ A like weight means four equal amounts

📖 Two of these spices reappear at Christ's birth

## 🧪 Thou Shalt Make It A Perfume A Confection After The Art Of The Apothecary Tempered Together

"Confection" here is an old word for a carefully blended compound.

It has nothing to do with candy in the modern sense.

"Tempered" means the ingredients were mixed thoroughly and evenly.

This required the same trained apothecary skill already named with the anointing oil.

🧪 Confection means a carefully blended compound

🍬 It has nothing to do with candy

🔄 Tempered means mixed thoroughly and evenly

📖 The same trained skill made both recipes

## ⚱️ And Thou Shalt Beat Some Of It Very Small And Put Of It Before The Testimony

Grinding the incense down to a fine powder let it burn evenly.

Larger, unground chunks would have burned poorly by comparison.

"Before the testimony" placed this incense near the golden altar already described.

That altar stood close to the ark holding the stone tablets.

⚱️ Fine powder let the incense burn evenly

🔥 Larger chunks would have burned poorly

📍 Before the testimony means near the ark

📖 Careful grinding served a real purpose

## 👑 It Shall Be Unto You Most Holy

This finished incense received the same rank as the ark.

That rank was "most holy," the chapter's highest label.

The incense altar and the anointing oil carried that same label too.

This chapter never wavered from that highest rank.

👑 This incense shared the ark's own rank

🔁 Most holy stayed the chapter's top label

📊 The ranking never wavered once

📖 Everything closest to God ranked highest

## 🚫 Ye Shall Not Make To Yourselves According To The Composition Thereof

The exact same warning already given about the anointing oil's formula repeats here.

Both of this chapter's two sacred formulas received identical protection.

Neither recipe could be copied for ordinary, personal use.

This chapter protected two secrets with the same strict rule.

🚫 This repeats the oil's copying ban

🔒 Both sacred formulas got equal protection

👃 Neither recipe was for personal use

📖 One strict rule guarded two secrets

## 👃 Whosoever Shall Make Like Unto That To Smell Thereto Shall Even Be Cut Off From His People

"To smell thereto" means using it just to enjoy its scent.

That private use had nothing to do with actual worship.

Even that quiet, seemingly harmless use carried the same harsh penalty named earlier in the chapter.

The chapter closes with the identical warning it opened with.

👃 To smell thereto means enjoying the scent

🙈 Even private use still carried a penalty

🔁 The same harsh warning closed the chapter

📖 A holy scent was never for personal use
`.trim();

export const EXODUS_THIRTY_PERSONAL_SECTIONS = parseExodusThirtyRawNotes(EXODUS_THIRTY_RAW_NOTES);
