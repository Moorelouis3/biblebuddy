export type EzekielFortySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielFortySixRawNotes(rawText: string): EzekielFortySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielFortySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+46:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 46 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+46:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+46:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 46 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 46,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 46:${startVerse}` : `Ezekiel 46:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 46 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_FORTY_SIX_RAW_NOTES = `# Ezekiel 46:1-3
# 🚪 Gate Rules For Sabbath And New Moon
---
## 🚪 Shut The Six Working Days

This gate controlled entry into the inner court, the space closest to the altar.

On six ordinary working days it stayed closed to everyone.

It opened only on two special days, the sabbath and the new moon.

This is not the same gate sealed forever back in chapter forty four.

That outer gate stayed shut because the LORD himself had entered through it.

This inner gate just opens and closes on a weekly and monthly schedule.

🚪 This gate guards the inner court

📅 It opens only on sabbath and new moon

🔒 A different gate than the one sealed forever

📖 Access here follows a set schedule

## 🚶 By The Way Of The Porch Of That Gate Without

This describes how the prince approaches the gate from outside.

A porch is a covered entry passage attached to the gate itself.

The prince walks in from the outer court, not from inside the temple.

He stands at the entrance instead of walking straight through to the altar.

Priests alone may go past this point into the holy rooms.

Even the leader of Israel waits at the edge of this holy space.

🚶 Porch means a covered entry passage

🧍 The prince enters from the outer court

🙏 Priests alone may go further in

📖 Even the leader waits at the edge

## 🔥 The Priests Shall Prepare His Burnt Offering And His Peace Offerings

The prince does not slaughter or prepare his own sacrifice.

Priests handle every part of the actual offering on his behalf.

A burnt offering was completely consumed by fire, showing full devotion to God.

A peace offering was partly burned and partly eaten in a shared meal.

Together these two offerings cover both worship and fellowship with God.

Even the ruler needs priests to approach God properly.

🔥 Priests prepare the offerings, not the prince

🙌 Burnt offerings are fully consumed by fire

🍽️ Peace offerings include a shared meal

📖 Even the ruler needs priests to approach God

## 🪨 He Shall Worship At The Threshold Of The Gate

The threshold is the stone sill at the base of a doorway.

The prince worships right there, not inside the gate structure itself.

This spot marks how close he may come without crossing into priestly ground.

His position shows honor without granting him a priest's access.

Even Israel's rulers answered to this same boundary.

🪨 Threshold means the stone sill of a doorway

🧎 The prince worships there, not further in

👑 Honor does not grant priestly access

📖 Even rulers answer to this boundary

## 🌇 The Gate Shall Not Be Shut Until The Evening

Once opened for the sabbath or new moon, the gate stays open all day.

It only closes again once evening arrives.

This gives the whole community time to come and worship without being rushed.

A door open all day pictures access that is not hurried or restricted.

God is not stingy with the time he gives his people to approach him.

🌇 The gate stays open until evening

⏰ Worship is not rushed to a short window

🚪 A wide open door pictures full access

📖 God gives his people time to approach him

## 👥 The People Of The Land Shall Worship At The Door Of This Gate

"The people of the land" means the ordinary population, not priests or officials.

They worship at the same gate the prince uses.

He stands nearer, at the threshold.

They stand further back, at the door of the gate.

Rank is visible even in where each person stands to worship.

Everyone still worships before the LORD together on these two days.

👥 People of the land means ordinary Israelites

🚪 They worship at the door of the gate

📏 Position at the gate reflects rank

📖 Everyone still worships together on these days

# Ezekiel 46:4-7
# 🐑 Offerings For Sabbath And New Moon
---
## 🐑 Six Lambs Without Blemish, And A Ram Without Blemish

"Without blemish" means the animal had no injury, disease, or defect of any kind.

Only the healthiest animals were acceptable for this offering.

Giving God a damaged or inferior animal would have meant giving him the leftovers.

Six lambs plus one ram made up the sabbath burnt offering.

The best of the flock went to God every single week.

🐑 Without blemish means no injury or defect

💎 Only the best animals were accepted

🚫 A damaged animal was not acceptable worship

📖 God receives the best, not the leftovers

## 🌾 The Meat Offering Shall Be An Ephah For A Ram

A meat offering here means a grain offering, not an offering made of meat.

An ephah was a dry measurement, about two thirds of a bushel.

Grain accompanied the ram as a companion gift alongside the animal.

This pairing reminded Israel that both field and flock belonged to God.

🌾 Meat offering here means a grain offering

📏 An ephah held two thirds of a bushel

🤝 Grain always accompanied the animal sacrifice

📖 Both field and flock belonged to God

## ⚖️ The Meat Offering For The Lambs As He Shall Be Able To Give

Unlike the ram's grain portion, the lambs' portion was not a fixed amount.

The prince could give whatever amount he was able to give.

This flexibility sat inside an otherwise exact and detailed system.

God's worship here left room for honest capacity, not forced uniformity.

⚖️ The lamb portion was not a fixed amount

🙌 The prince gave what he was able

🧩 One flexible rule sat inside many exact ones

📖 God made room for honest capacity

## 🫙 An Hin Of Oil To An Ephah

A hin was a liquid measurement, about one gallon.

Oil was mixed into the grain offering, not poured out separately.

Oil often pictured the Spirit of God or personal devotion in worship.

Even the grain offering could not be brought dry and empty.

🫙 A hin was about one gallon

🌾 Oil mixed into the grain offering

✨ Oil often pictured devotion or the Spirit

📖 Nothing came before God dry and empty

## 🐂 In The Day Of The New Moon It Shall Be A Young Bullock

The new moon offering was larger than the weekly sabbath offering.

A young bullock, meaning a young bull, was added alongside the ram and lambs.

Marking the start of a new month called for a bigger sacrifice than an ordinary sabbath.

Israel's calendar ran on the moon, so every new month carried its own worship moment.

🐂 Bullock means a young bull

📅 The new moon offering was larger

🌙 A new month began with its own sacrifice

📖 Israel's calendar itself shaped its worship

## ✋ According As His Hand Shall Attain Unto

This phrase repeats the same flexible rule already given for the sabbath offering.

"Attain unto" means as much as a person can reasonably provide.

Larger animals kept a fixed amount.

The lambs stayed flexible, just as before.

Consistency in worship mattered more than identical numbers every time.

✋ Attain unto means what he can provide

🔁 This repeats the sabbath's flexible rule

📐 Larger animals fixed, lambs stayed flexible

📖 Consistency mattered more than identical numbers

# Ezekiel 46:8-10
# 🔄 Entering By One Gate, Leaving By Another
---
## 🚶 He Shall Go Forth By The Way Thereof

The prince enters and leaves this gate by the same path.

This differs from the rule later given to the common people during the feasts.

His access through this one gate stays consistent every time he worships here.

A steady, repeated pattern fits a ruler's settled role in worship.

🚶 The prince uses the same path both ways

🔁 His pattern stays steady every time

👑 A settled role fits a settled leader

📖 Even movement in worship can carry meaning

## 🧭 He That Entereth In By The North Gate Shall Go Out By The South Gate

During Israel's great yearly feasts, crowds of worshippers filled the temple courts.

Entering and exiting through one door became genuinely dangerous with that many people.

Worshippers who entered from the north gate had to leave through the south gate.

Worshippers who entered from the south gate had to leave through the north gate.

This created one steady flow of people, instead of a crowded standstill.

🧭 North gate in, south gate out

↔️ South gate in, north gate out

🚦 One flow avoided a crowded standstill

📖 Even crowd flow served order, not chaos

## 🚫 He Shall Not Return By The Way Of The Gate Whereby He Came In

Worshippers could not double back through the same gate they entered.

Only forward movement, all the way through and out the far side, was required.

This kept the whole procession moving instead of crossing back on itself.

A crowd of thousands needed real order to stay reverent instead of chaotic.

🚫 No doubling back through the same gate

➡️ Only forward movement was allowed

🧍 Order protected reverence in a packed crowd

📖 Worship stayed reverent instead of chaotic

## 👑 The Prince In The Midst Of Them

The prince received no special shortcut or private exit for himself.

He moved in and out among the ordinary worshippers, not ahead of them.

His place in the crowd pictured a leader who worships alongside his people.

Leadership in this restored temple did not mean standing apart from everyone else.

🚶 The prince walks among the people, not ahead

🤝 He shares the same gates as everyone

👥 Leadership here does not mean standing apart

📖 The prince worships alongside his people

## 📆 In The Solemn Feasts

"Solemn feasts" refers to Israel's great appointed festivals, including Passover and Tabernacles.

These were the times each year when all Israel gathered at the temple together.

Huge crowds gathering at once explain why strict gate rules suddenly mattered here.

A festival this size needed real crowd management, not just good intentions.

📆 Solemn feasts means Israel's great festivals

🎉 All Israel gathered at these times

👥 Huge crowds required real crowd management

📖 Worship on this scale needed real planning

# Ezekiel 46:11-15
# 🌅 The Daily Lamb And The Prince's Freewill Gifts
---
## 🔁 In The Feasts And In The Solemnities

This verse confirms the same grain and oil measurements applied during the yearly feasts.

One consistent system covered the weekly sabbath, the monthly new moon, and the yearly feasts.

A worshipper always knew exactly what an offering required, no matter which day it was.

Consistency protected ordinary people from confusion or unfair demands.

🔁 The same measurements applied at every feast

📐 One system covered sabbath, new moon, and feasts

🧮 Worshippers always knew what was required

📖 Clear rules protected people from unfair demands

## 🎁 A Voluntary Burnt Offering Or Peace Offerings Voluntarily

This offering was not scheduled on the calendar like the others in this chapter.

The prince brought it purely by his own choice, whenever he wanted to give it.

Repeating the word "voluntarily" in one verse stresses that nothing forced this gift.

A freewill gift given with no obligation often reveals the heart behind it.

🎁 A voluntary offering was not scheduled

🙋 The prince gave it by his own choice

💛 Repetition stresses that nothing forced this gift

📖 A freewill gift reveals the heart behind it

## 🚪 One Shall Then Open Him The Gate That Looketh Toward The East

This east gate opens as a special exception, outside its normal weekly schedule.

Someone unlocks it just for this one voluntary offering, then shuts it again right after.

The gate briefly serves the same role for a freewill gift as it does for a scheduled one.

Even a spontaneous act of worship received the same full honor as a planned one.

🚪 The gate opens as a special exception

🔓 It opens just for this one offering

🔒 It shuts again right after he leaves

📖 A spontaneous gift received full honor

## 🐑 A Lamb Of The First Year Without Blemish

"Of the first year" means a lamb still in its first twelve months of life.

This was the daily burnt offering, repeated every single morning without exception.

This same daily sacrifice first appeared centuries earlier in the law given through Moses.

A fresh, unblemished lamb died every morning so Israel could begin each day right with God.

🐑 First year means under twelve months old

🌅 This sacrifice happened every single morning

📜 Moses first commanded this same daily offering

📖 Israel began each day right with God

## ⏳ A Perpetual Ordinance Unto The LORD

"Perpetual" means permanent, never meant to stop or be replaced.

"Ordinance" means a fixed rule, not a one time suggestion.

This offering was never meant to be optional or occasional.

Some practices in Israel's worship were built to continue without end.

⏳ Perpetual means permanent and never ending

📏 Ordinance means a fixed, binding rule

🔁 This offering was never optional

📖 Some worship was built to never stop

## 🌾 The Sixth Part Of An Ephah

The grain and oil portions for the daily lamb were smaller than the sabbath portions.

A sixth of an ephah and a third of a hin made a modest daily gift.

Smaller daily amounts still added up to real devotion over months and years.

God did not need a large gift every morning, only a faithful one.

🌾 The daily grain portion was smaller

🫙 The daily oil portion was smaller too

📆 Small daily gifts added up over time

📖 Faithfulness mattered more than size

## 🥣 To Temper With The Fine Flour

"To temper" means to mix together until the oil and flour were evenly combined.

Fine flour was flour ground smooth, without the rough bits left in cheaper grain.

Even this small daily offering used the best quality flour available.

Small and plain did not mean careless or low quality.

🥣 Temper means to mix thoroughly together

🌾 Fine flour means smooth, high quality flour

✨ Even a small gift used the best flour

📖 Small did not mean careless

# Ezekiel 46:16-18
# 🏞️ The Prince's Land Cannot Be Taken By Force
---
## 👨‍👦 It Shall Be Their Possession By Inheritance

A gift of land from the prince to his own son stayed in that family forever.

It became the son's permanent possession, passed down the family line.

This protected the prince's own household from ever losing its land.

Family land here was meant to be kept, not treated as a temporary loan.

👨‍👦 Gifts to a son stay in the family

♾️ It becomes a permanent possession

🏡 The prince's household land stays secure

📖 Family land was meant to be kept

## 📅 The Year Of Liberty

A gift of land to a servant worked differently than a gift to a son.

"Year of liberty" refers to the Jubilee, a reset that came every fifty years.

At the Jubilee, that gifted land returned to the prince's own family.

This stopped the royal estate from slowly shrinking through gifts given to outsiders.

📅 A gift to a servant works differently

🎁 Year of liberty means the Jubilee reset

🔄 The land returns to the prince at Jubilee

📖 The royal estate stayed protected over time

## ✊ The Prince Shall Not Take Of The People's Inheritance By Oppression

"Oppression" here means using power to take land that rightfully belonged to someone else.

This law directly forbids a ruler from seizing land from ordinary citizens.

Centuries earlier, king Ahab had done exactly this to a man named Naboth over his vineyard.

That famous abuse of royal power is the exact behavior this new law shuts down.

✊ Oppression means using power to steal land

🍇 King Ahab once took Naboth's vineyard this way

🚫 This new law directly forbids that abuse

📖 Royal power was never meant to steal

## 🧬 That My People Be Not Scattered Every Man From His Possession

Losing family land in Israel meant more than losing property.

Every family's inherited plot connected them to their tribe and to God's promise.

Scattering people off their land would have unraveled that whole inherited identity.

Protecting land was really about protecting belonging.

🏞️ Losing land meant losing more than property

🧬 Land connected families to their tribe

🧩 Scattering people would unravel their identity

📖 Protecting land protected belonging

## 🏡 He Shall Give His Sons Inheritance Out Of His Own Possession

If the prince wanted to provide for his sons, he had his own land to use.

He never needed to touch land belonging to ordinary families.

This verse closes off any excuse for taking land from the people.

Generosity toward his own family was never allowed to cost someone else their home.

🏡 The prince had his own land to give

🙅 He never needed the people's land

🔒 This closed off any excuse to take it

📖 His generosity could not cost someone else

# Ezekiel 46:19-24
# 🍲 Kitchens For The Holiest Offerings
---
## 👼 Into The Holy Chambers Of The Priests

Ezekiel's guide keeps leading him deeper into the temple complex.

These chambers were private rooms reserved only for priests, not for ordinary worshippers.

They sat toward the north side, away from the public areas of the temple.

A temple this holy needed protected space set apart just for its priests.

👼 A guide keeps leading Ezekiel through the temple

🚪 These chambers were reserved only for priests

🧭 They sat toward the north side

📖 Holy work needed its own protected space

## 🍲 The Priests Shall Boil The Trespass Offering And The Sin Offering

A trespass offering atoned for a specific wrong done against God or another person.

A sin offering atoned for sin in a more general sense.

Both were considered extremely holy and had to be cooked in this one set apart kitchen.

Where something was cooked mattered just as much as what was cooked.

⚖️ Trespass offerings atoned for a specific wrong

💔 Sin offerings atoned for sin in general

🍲 Both were cooked in one holy kitchen

📖 Where it was cooked mattered too

## 🚷 That They Bear Them Not Out Into The Utter Court, To Sanctify The People

"Utter court" means the outer court, the space open to ordinary people.

Carrying this especially holy meat out there risked transferring its holiness onto whoever touched it.

That kind of accidental holiness would have confused what was sacred and what was common.

Keeping categories clear protected both the offering and the people from real confusion.

🚷 Utter court means the public outer court

⚡ Holy meat could transfer holiness by accident

🧩 Mixing categories would cause real confusion

📖 Clear boundaries protected everyone

## 🔲 He Caused Me To Pass By The Four Corners Of The Court

Ezekiel's guide now walks him through the outer court instead of the inner one.

Each of the court's four corners held its own small enclosed space.

These four matching courts were built identically, one tucked into each corner.

Even the outer court, open to ordinary people, was carefully planned down to its corners.

🚶 The guide walks Ezekiel through the outer court

🔲 Each corner held its own enclosed space

🟰 All four corners matched exactly

📖 Even the outer court was carefully planned

## 📏 Forty Cubits Long And Thirty Broad

A cubit measured about eighteen inches, close to the length of a forearm.

Forty cubits long comes to about sixty feet.

Thirty cubits broad comes to about forty five feet.

Each of these four small courts was sizable, closer to a courtyard than a closet.

Precise measurements here show this temple was planned in exact detail.

📏 A cubit was about eighteen inches

📐 Forty by thirty cubits is a sizable space

🏗️ These courts were courtyards, not closets

📖 This temple was planned in exact detail

## 🏗️ A Row Of Building Round About

Each of these four corner courts had a row of small kitchens built into it.

"Boiling places" were fixed cooking stations built right into the court's walls.

This was not a single open fire pit but a row of permanent, built in stations.

Worship here required real, lasting infrastructure, not makeshift arrangements.

🏗️ Each court had a row of kitchens

🔥 Boiling places were permanent cooking stations

🧱 These stations were built into the walls

📖 Worship required lasting infrastructure

## 🧑‍🍳 The Ministers Of The House Shall Boil The Sacrifice Of The People

"Ministers of the house" refers to temple workers, a different group from the priests themselves.

Earlier in this chapter, priests cooked the trespass and sin offerings in their own private kitchen.

Here, in the outer court, a different kitchen handled the offerings brought by ordinary people.

Two separate kitchens kept the holiest offerings and the people's offerings properly apart.

🧑‍🍳 Ministers of the house means temple workers

🍲 They cooked the offerings of ordinary people

🏠 Priests had a separate, more private kitchen

📖 Two kitchens kept holiness properly sorted
`.trim();

export const EZEKIEL_FORTY_SIX_PERSONAL_SECTIONS = parseEzekielFortySixRawNotes(EZEKIEL_FORTY_SIX_RAW_NOTES);
