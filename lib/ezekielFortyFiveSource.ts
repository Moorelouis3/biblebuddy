export type EzekielFortyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielFortyFiveRawNotes(rawText: string): EzekielFortyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielFortyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+45:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 45 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+45:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+45:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 45 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 45,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 45:${startVerse}` : `Ezekiel 45:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Ezekiel 45 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_FORTY_FIVE_RAW_NOTES = `# Ezekiel 45:1-8
# 🗺️ Dividing The Holy District
---
## 🎲 Divide By Lot The Land For Inheritance

To divide something "by lot" means letting a trusted random method decide it.

Something like a marked stone was drawn to settle the outcome.

This same method had already set the borders for Israel's twelve tribes.

Even this sacred strip of land follows Israel's normal way of dividing ground.

🎲 Lot means a trusted random method
🗺️ It already set the tribal borders
🤝 It kept the choice out of politics
📖 Sacred land used an ordinary method

## ✨ An Holy Portion Of The Land

"Holy portion" means a strip of ground set apart only for God.

It could not be bought or sold like ordinary property.

Twenty five thousand reeds long and ten thousand reeds wide marks its edge.

A reed measured about ten feet, so this strip stretched for many miles.

✨ Holy portion means ground set apart
🚫 It could not be bought or sold
📏 A reed measured about ten feet
📖 This strip stretched for many miles

## ⬛ Five Hundred In Length, With Five Hundred In Breadth, Square Round About

This smaller square sits inside the larger strip from verse one.

Five hundred reeds by five hundred reeds marks the ground for the temple itself.

A perfect square signals complete balance on every side.

The sanctuary and the most holy place both stand inside this square.

⬛ A smaller square sits inside the strip
🏛️ It marks the ground for the temple
⚖️ A square signals complete balance
📖 The most holy place stands inside it

## 🧱 Fifty Cubits Round About For The Suburbs Thereof

"Suburbs" here does not mean houses or neighborhoods like today.

It means an open buffer strip left empty around the sanctuary square.

A cubit measured about a foot and a half.

That gap kept ordinary daily activity away from holy ground.

🧱 Suburbs means an open buffer strip
📏 A cubit was about eighteen inches
🚧 The gap kept activity away from holy ground
📖 Even empty space protected what was sacred

## 🚪 In It Shall Be The Sanctuary And The Most Holy Place

This verse repeats the same measurement from verse one.

Repeating it ties the smaller square back to the larger district.

"Most holy place" means the innermost room only the high priest could enter.

Nesting a tiny inner room inside this larger area shows holiness working in layers.

🔁 This repeats the measurement from verse one
🧩 It ties the square to the larger district
🚪 Most holy place means the innermost room
📖 Holiness here worked in layers

## 👳 The Holy Portion Of The Land Shall Be For The Priests The Ministers Of The Sanctuary

This verse names exactly who the larger holy strip belongs to.

Priests served closest to God, offering sacrifices and tending the sanctuary.

Their homes and the sanctuary ground both sit inside this strip.

Living near their work kept priests close to the duties God gave them.

👳 Priests served closest to God
🏠 Their homes sat inside this strip
🏛️ Sanctuary ground shared the same space
📖 Nearness to God shaped daily life here

## 👷 The Levites, The Ministers Of The House, Have For Themselves... Twenty Chambers

Levites were the wider tribe that assisted the priests with temple service.

They stood one step below the priests in their assigned duties.

This verse gives them a strip of land, separate from the priests' portion.

Twenty chambers means rooms built for their housing and their work.

👷 Levites assisted priests with temple service
🪜 They stood one step below priests
🏠 They received their own separate strip
📖 Every servant had a real place here

## 🏙️ Ye Shall Appoint The Possession Of The City

This verse sets aside a third strip for ordinary people to live.

Five thousand reeds by twenty five thousand reeds was reserved for the city.

Unlike the land for the priests and Levites, this portion belonged to all of Israel.

Even common life had a planned, intentional place in this vision.

🏙️ A third strip was set aside here
📏 It measured five by twenty five thousand reeds
🤝 It belonged to all of Israel
📖 Ordinary life had a planned place too

## 👑 A Portion Shall Be For The Prince

The prince was a future ruling figure in this vision.

He was distinct from an ordinary king.

He received his own strip of land on either side of the holy portion.

That strip ran from the western border to the eastern border.

Giving him defined land kept his provision separate from everyone else's land.

👑 The prince was this vision's ruling figure
🗺️ His strip ran from west to east
🚧 It stayed separate from everyone else's land
📖 Defined land prevented future land grabs

## ✋ My Princes Shall No More Oppress My People

This verse states the whole point of the land plan directly.

Past rulers had seized land and crops from ordinary people for themselves.

Giving the prince his own fixed portion removed his reason to take more.

A clear boundary protected the people from a ruler's future greed.

✋ Past rulers had seized people's land
🗺️ A fixed portion removed his need for more
🛡️ Clear boundaries protected ordinary people
📖 Good design prevents future abuse

# Ezekiel 45:9-12
# ⚖️ Just Measures For Everyone
---
## ✋ Remove Violence And Spoil, And Execute Judgment And Justice

God turns from land dimensions to how leaders treat people.

"Violence" and "spoil" mean taking from others by force or by abusing power.

Judgment and justice mean judging by what is right.

That means following God's standard, not personal gain.

The same warning about enough already appeared in chapter forty four.

✋ Violence and spoil mean taking by force
⚖️ Judgment and justice mean judging rightly
🔁 The same warning appeared in chapter forty four
📖 Fair land plans still need fair leaders

## ⚖️ Ye Shall Have Just Balances, And A Just Ephah, And A Just Bath

A "balance" was a scale used to weigh goods like grain or silver.

An "ephah" measured dry goods.

A "bath" measured liquids like oil or wine.

A rigged scale or mismarked container let a seller cheat a buyer.

God required the tools of trade to be honest, not just the people.

⚖️ A balance means a weighing scale
🌾 Ephah measured dry goods like grain
🛢️ Bath measured liquids like oil
📖 Honest tools protect honest trade

## 🔗 The Ephah And The Bath Shall Be Of One Measure

This verse ties two different units to the exact same amount.

One ephah of grain equaled the same volume as one bath of oil.

Matching them this closely made cheating by mixing up units harder.

A buyer could trust one unit without learning two separate systems.

🔗 Ephah and bath were tied to one volume
🚫 Matching units made cheating harder
🧠 Buyers needed to learn only one system
📖 Simplicity itself protected fairness

## 🏺 The Tenth Part Of An Homer

A "homer" was the largest standard unit, used for a full load.

Both the ephah and the bath equaled one tenth of a homer.

That fixed ratio meant ten ephahs or ten baths equaled one homer.

A consistent ratio stopped markets from drifting into their own standards.

🏺 Homer was the largest standard unit
🔢 Ten ephahs or baths made one homer
📏 The ratio stayed fixed everywhere
📖 One standard stopped local cheating

## ⚖️ The Shekel Shall Be Twenty Gerahs

A "shekel" measured weight, most often used for silver or gold.

A "gerah" was the smallest weight unit, close to the weight of a seed.

Twenty gerahs always equaled one shekel, with no regional variation allowed.

Fixing the smallest unit protected buyers from tiny repeated shortchanging.

⚖️ Shekel measured silver or gold by weight
🌱 Gerah was the smallest weight unit
🔢 Twenty gerahs always equaled one shekel
📖 Even tiny units stayed fixed and fair

## 🏋️ Twenty Shekels, Five And Twenty Shekels, Fifteen Shekels, Shall Be Your Maneh

A "maneh" combined several shekels into one larger reference weight.

Listing three different totals shows this unit was not the same everywhere yet.

Fixing it here in God's instructions settled any local disagreement about its value.

A shared standard made trade possible between strangers who had never met.

🏋️ Maneh combined several shekels together
📜 Different totals show local disagreement existed
🔒 God's instructions settled its true value
📖 Shared standards make trust between strangers possible

# Ezekiel 45:13-17
# 🎁 The Oblation For Worship
---
## 🎁 The Sixth Part Of An Ephah Of An Homer Of Wheat

"Oblation" means a gift formally set apart and given to God.

This specific tax asked for part of a family's wheat and barley harvest.

That works out to under two percent of what a family grew.

A modest, fixed rate kept the system sustainable, not crushing.

🎁 Oblation means a formal gift to God
🌾 This asked for part of the wheat harvest
🔢 It worked out to under two percent
📖 A modest rate kept the system sustainable

## 🛢️ The Ordinance Of Oil, The Bath Of Oil... Out Of The Cor

A "cor" was simply another name for a homer, the largest unit.

Oil needed its own rule since it was measured differently than grain.

The rate asked for one tenth of a bath out of every cor.

Even oil, a valuable good, followed the same fair percentage pattern.

🏺 Cor was another name for a homer
🛢️ Oil needed its own separate rule
🔢 The rate matched about one tenth
📖 Even valuable goods followed the same pattern

## 🐑 One Lamb Out Of The Flock, Out Of Two Hundred

This oblation also included livestock, not only grain and oil.

One lamb out of every two hundred in a flock was set aside.

That ratio again landed near half a percent, a light and sustainable ask.

Every part of a farmer's livelihood had a small share directed toward worship.

🐑 Livestock was part of this oblation too
🔢 One lamb out of every two hundred
⚖️ The ratio stayed light and sustainable
📖 Every part of a livelihood touched worship

## 🤝 To Make Reconciliation For Them

"Reconciliation" means restoring a broken relationship back to peace.

These offerings existed to repair the relationship between the people and God.

Meat offerings, burnt offerings, and peace offerings each played a distinct part.

Worship here was never only ritual, it aimed at real restored relationship.

🤝 Reconciliation means restoring a broken relationship
🙏 These offerings aimed to repair that relationship
🔥 Different offerings played different parts
📖 Ritual here pointed toward real restoration

## 🤝 All The People Of The Land Shall Give This Oblation For The Prince

This verse clarifies who actually supplies these set apart portions.

The ordinary people provided the materials for the prince's worship duties.

The prince then used what the people gave to carry out his role.

A shared system meant no single person bore the full weight of national worship.

🤝 The people supplied the required materials
👑 The prince used it for his official duties
🔄 Supplying and performing worship were shared tasks
📖 No one person carried worship alone

## 👑 It Shall Be The Prince's Part To Give Burnt Offerings, And Meat Offerings, And Drink Offerings

The prince, not the ordinary priests, funded Israel's national worship calendar.

"Feasts," "new moons," and "sabbaths" cover every repeating holy occasion.

"Solemnities" is simply an older word for formally appointed sacred occasions.

Funding the whole yearly rhythm of worship fell on his shoulders.

👑 The prince funded Israel's national worship
📅 Feasts, new moons, and sabbaths recur yearly
📜 Solemnities means formally appointed sacred occasions
📖 One leader funded the whole yearly rhythm

## 🔥 He Shall Prepare The Sin Offering... To Make Reconciliation For The House Of Israel

This repeats the word "reconciliation" from verse fifteen on purpose.

The prince's offerings were not just civic duty.

They served that same restoring purpose for the whole nation.

Leadership and worship were never treated as two separate jobs here.

🔁 Reconciliation repeats from verse fifteen on purpose
👑 The prince's duty served that same purpose
🔥 Every offering worked toward one goal
📖 Leadership and worship were never separated

# Ezekiel 45:18-20
# 🩸 Cleansing The Sanctuary
---
## 🐂 Thou Shalt Take A Young Bullock Without Blemish

"Without blemish" means a physically healthy animal, free of injury or disease.

Offering a lesser animal would be like giving God something unwanted.

This cleansing happens once a year, on the first day of the religious calendar.

Starting the year by cleansing the sanctuary set the tone for everything after.

🐂 Without blemish means physically healthy
🎁 A lesser gift would show less honor
📅 This happened on the year's first day
📖 Starting clean set the tone for the year

## ✨ Cleanse The Sanctuary

"Cleanse" here does not mean physical dirt or dust.

It means removing ceremonial impurity built up from a year of use.

Even a space built for worship needed regular, deliberate renewal.

Holiness was treated as something to actively maintain, not something fixed.

✨ Cleanse means removing ceremonial impurity
🏛️ Even sacred space needed renewal
🔁 This happened on a yearly cycle
📖 Holiness required active maintenance

## 🚪 Put It Upon The Posts Of The House, And Upon The Four Corners Of The Settle Of The Altar

"Posts" means the doorframes marking the entrances into the temple.

A "settle" was a ledge partway up the altar's structure.

Applying blood to these points marked every major entry as cleansed.

Even small placements like these reflected real reverence.

🚪 Posts means the doorframes of entrances
🔼 A settle was a ledge on the altar
🩸 Blood marked every major entry point
📖 Precise placement reflected reverence, not procedure

## 🔁 The Seventh Day Of The Month

This same cleansing ritual repeated exactly one week after it first happened.

A seven day gap mirrors the same complete cycle seen throughout this vision.

Repeating it suggests one pass alone was never fully trusted.

Two careful passes protected worship from any missed error.

🔁 The ritual repeated after seven days
🔢 Seven again marks a complete cycle
⏳ One cleansing alone was not enough
📖 Thoroughness mattered more than speed

## ❓ For Every One That Erreth, And For Him That Is Simple

"Erreth" means someone who sinned without fully realizing it.

"Simple" here means naive or easily led astray, not unintelligent.

This cleansing covered unintentional failures, not only deliberate rebellion.

Even honest mistakes still needed real reconciliation.

❓ Erreth means sinning without realizing it
🧒 Simple means naive, not unintelligent
🩹 This covered unintentional failures too
📖 God's grace still required a real response

# Ezekiel 45:21-25
# 🍞 Passover And The Feast Of Tabernacles
---
## 🐑 In The First Month, In The Fourteenth Day Of The Month, Ye Shall Have The Passover

"Passover" remembers the night God spared Israel's firstborn sons in Egypt.

The angel of death passed over homes marked with lamb's blood on the doorframe.

This feast lasted a full seven days, not just one evening.

Even in this future vision, Israel is still told to remember that night.

🐑 Passover remembers Israel's rescue from Egypt
🚪 Blood on the doorframe meant safety
📅 The feast lasted a full seven days
📖 This future vision still remembers that night

## 🍞 Unleavened Bread Shall Be Eaten

"Unleavened" means made without yeast, so the bread never rises.

In Egypt, Israel left in such a hurry there was no time to let dough rise.

Eating unleavened bread for seven days reenacted that same hurried departure.

A simple food choice kept the memory of rescue alive every year.

🍞 Unleavened means made without yeast
⏱️ Israel left Egypt in a hurry
🔁 This food reenacted that same urgency
📖 A simple meal kept the memory alive

## 👑 The Prince Prepare For Himself And For All The People... A Bullock For A Sin Offering

This verse returns to the prince's duty, now tied to a specific feast day.

He provides this sin offering for everyone, not just his own household.

Representing the whole nation in worship was part of being a leader.

His offering set the pattern for everyone else's worship that week.

👑 The prince provides for the whole nation
🐂 One offering covers everyone, not just him
🤝 Representing the people was part of leading
📖 True leadership carries the whole group

## 🐂 Seven Bullocks And Seven Rams Without Blemish Daily The Seven Days

This is a far larger offering than the single animal needed on a normal day.

Fourteen healthy animals had to be sacrificed, every day, for a full week.

The scale reflects how central Passover was compared to any regular day.

A once a year feast received an equally rare level of devotion.

🐂 Fourteen animals were required daily
📅 This continued every day for a week
⚖️ Scale reflected the feast's importance
📖 Major feasts received major devotion

## 🐐 A Kid Of The Goats Daily For A Sin Offering

A "kid" simply means a young goat, distinct from the bullocks and rams.

This additional sin offering ran alongside the larger offerings every day.

Multiple offering types stacked together, each covering its own purpose.

Worship here had several moving parts, not one single ritual.

🐐 Kid means a young goat
🔁 This ran daily alongside the larger offerings
🧩 Different offerings covered different purposes
📖 Layered offerings mirrored this vision's layered holiness

## 🛢️ An Ephah For A Bullock, And An Ephah For A Ram, And An Hin Of Oil For An Ephah

A "hin" was a smaller liquid measure, used here for olive oil.

Each animal offering was paired with its own matching grain and oil portion.

Nothing was sacrificed alone, every offering came with proper companion gifts.

The careful pairing shows this worship was planned, not improvised.

🛢️ Hin was a smaller liquid measure for oil
🌾 Grain and oil paired with each animal
🧩 Companion gifts came standard here
📖 Worship here was planned, not improvised

## 🏕️ In The Seventh Month, In The Fifteenth Day... Shall He Do The Like

This describes the Feast of Tabernacles, Israel's other major seven day festival.

It fell six months after Passover, on the opposite side of the year.

The same offering pattern and the same scale repeated here.

Two feasts anchored Israel's entire worship calendar at opposite points in the year.

🏕️ This describes the Feast of Tabernacles
📅 It fell six months after Passover
🔁 The same offering pattern repeated here
📖 Two feasts anchored the whole worship year`.trim();

export const EZEKIEL_FORTY_FIVE_PERSONAL_SECTIONS = parseEzekielFortyFiveRawNotes(EZEKIEL_FORTY_FIVE_RAW_NOTES);
