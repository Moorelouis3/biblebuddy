export type FirstKingsFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsFiveRawNotes(rawText: string): FirstKingsFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsFive\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsFive\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsFive\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 5:${startVerse}` : `1 Kings 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Kings 5 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_FIVE_RAW_NOTES = `# FirstKingsFive 5:1-3
# 🤝 Hiram Reaches Out To Solomon
---
## 🌊 Hiram King Of Tyre Sent His Servants Unto Solomon

Tyre was a wealthy coastal city famous for trade, ships, and skilled builders.

Hiram was its king and a longtime ally of Israel's royal family.

He sent servants the moment he heard a new king sat on Israel's throne.

Reaching out fast was a normal move between allied kings in that world.

🌊 Tyre was a wealthy coastal trading city

👑 Hiram was Tyre's king and Israel's ally

📨 He reached out as soon as Solomon reigned

📖 Allied kings kept contact through changes in power

## 📍 In The Room Of His Father

"Room" here is an old word for place or position.

It means Solomon now stood where his father David once stood.

The Bible uses this same phrase for other kings taking their father's throne.

Hiram was really writing to congratulate Solomon on becoming the new king.

📍 Room means place or position

👑 Solomon now filled David's position

🔁 The Bible reuses this phrase for other kings

📖 Hiram was congratulating a new king

## ❤️ For Hiram Was Ever A Lover Of David

This does not describe romance or family affection.

In this culture, calling another king your "lover" or "friend" was treaty language.

It marked a formal, political alliance between two kingdoms.

David and Hiram had already built that kind of bond years earlier.

❤️ Lover here does not mean romance

🤝 It meant a formal political ally

📜 Kings used this word in treaties

📖 David and Hiram were already allies

## 🏛️ Could Not Build An House Unto The Name Of The LORD His God

David wanted to build God a permanent house but never got the chance.

First Chronicles explains the fuller reason, David had shed too much blood in war.

Constant fighting on every side left no room for a building project this size.

God saved that honor for a son who would reign in a time of peace.

🏛️ David wanted to build this house

⚔️ Constant war made building impossible for him

📜 Chronicles explains David had shed much blood

📖 That honor waited for a son of peace

## 👣 Until The LORD Put Them Under The Soles Of His Feet

This is an old picture of total victory, not a literal detail about feet.

Placing an enemy under your feet meant you had fully defeated them.

Ancient kings even carved images of beaten enemies under a ruler's throne or footstool.

David's wars finally ended with every enemy pictured that same way.

👣 Under his feet is a victory image

⚔️ It means total defeat of enemies

🪑 Kings pictured enemies as a footstool

📖 David's wars ended in full victory

# FirstKingsFive 5:4-6
# 🌲 Solomon Asks Hiram For Cedar
---
## ⚔️ Neither Adversary Nor Evil Occurrent

"Adversary" is an old word for an enemy or opponent.

"Evil occurrent" is an old way of saying a disaster or crisis happening.

Solomon is saying no enemy and no emergency stood in his way.

That total calm is exactly what David never had during his own reign.

⚔️ Adversary means enemy or opponent

🌪️ Evil occurrent means a disaster happening

🕊️ Solomon faced neither problem

📖 David never enjoyed this same calm

## 📜 As The LORD Spake Unto David My Father

Solomon is quoting an exact promise God had already made.

Years earlier, God told David through the prophet Nathan that his son would build the house.

That promise is recorded back in Second Samuel, long before Solomon was even born.

Solomon is not guessing at God's plan, he is simply carrying it out.

📜 Solomon quotes an older promise

👼 God gave this word through Nathan

✅ It appears back in Second Samuel

📖 Solomon is fulfilling the promise, not guessing

## 🌲 Hew Me Cedar Trees Out Of Lebanon

Lebanon was a mountain range just north of Israel, covered in ancient cedar forests.

Cedar wood resisted rot and insects and carried a strong, pleasant smell.

Kings across the ancient world prized it for palaces and temples.

Solomon wanted the finest wood available for God's own house.

🏔️ Lebanon was a forested mountain range

🌲 Cedar resisted rot and insects

👑 Kings everywhere prized this wood

📖 Solomon wanted the best wood for God

## 🪓 There Is Not Among Us Any That Can Skill To Hew Timber Like Unto The Sidonians

"Skill to hew" means having real skill at cutting wood.

The Sidonians were people from Sidon, a leading Phoenician city near Tyre.

They were famous throughout the ancient world for cutting and shipping timber.

Solomon needed Hiram's workers because Israel lacked this specific trade skill.

🪓 Skill to hew means skilled at cutting

🏙️ Sidon was a leading Phoenician city

🚢 Sidonians were famous timber experts

📖 Israel needed skills it did not have

## 💰 Unto Thee Will I Give Hire For Thy Servants

Solomon promised real payment, not just a favor between friends.

"Hire" is an old word for wages or payment for work done.

This was a genuine business contract between two kingdoms, not just personal charity.

The wage plan is spelled out fully a few verses later.

💰 Hire means wages for work

🤝 This was a real business deal

📜 Both nations benefited from the arrangement

📖 The wage details come a bit later

# FirstKingsFive 5:7-9
# 🎉 Hiram's Joyful Reply
---
## 🎉 When Hiram Heard The Words Of Solomon, That He Rejoiced Greatly

Hiram was not just being polite, the text says he truly rejoiced.

A strong, wise, stable neighbor was actually good news for Tyre too.

Peace and trade between neighboring kingdoms benefited both sides.

Hiram had every reason to celebrate Solomon's request.

🎉 Hiram's joy was genuine, not polite

🤝 A stable Israel was good for Tyre

💱 Peace between neighbors helped both nations

📖 Hiram had real reason to celebrate

## 🙏 Blessed Be The LORD This Day, Which Hath Given Unto David A Wise Son

Hiram was not an Israelite, yet he blessed Israel's God by name.

A foreign king recognized what only God could give, real wisdom.

This is one of several moments where outsiders honor the LORD in this story.

Solomon's wisdom was already being noticed far outside his own borders.

🙏 Hiram was a foreign king, not Israelite

✅ He still blessed Israel's own God

🌍 Outsiders keep noticing the LORD's work

📖 Solomon's wisdom was already spreading

## 🌲 I Will Do All Thy Desire Concerning Timber Of Cedar, And Concerning Timber Of Fir

"Fir" is a different evergreen tree from cedar, often used for flooring and paneling.

Cedar gave strength and a rich look for the temple's main structure.

Fir added a lighter wood for other finishing work inside.

Hiram agreed to supply both kinds of wood in full.

🌲 Fir was a separate evergreen tree

🏛️ Cedar was used for strong structure

🪵 Fir was used for finishing work

📖 Hiram agreed to supply both

## 🪵 I Will Convey Them By Sea In Floats Unto The Place That Thou Shalt Appoint Me

"Floats" here means log rafts, cut trees bound together to float on water.

Workers cut the cedar and fir high in the Lebanon mountains.

They hauled the logs down to the coast, then lashed them into rafts.

The rafts sailed south along the coast to wherever Solomon chose to land them.

🪵 Floats means rafts of bound logs

⛏️ Workers cut trees in the mountains

🌊 Rafts carried logs down the coast

📖 They landed wherever Solomon chose

## ⛰️ Thou Shalt Accomplish My Desire, In Giving Food For My Household

Tyre sat on a narrow strip of coastline with little farmland of its own.

A city that size could not grow enough grain to feed itself.

Hiram needed steady food far more than he needed extra silver or gold.

Solomon's grain shipments would matter to Tyre as much as Tyre's cedar mattered to Solomon.

⛰️ Tyre had little farmland of its own

🌾 The city could not feed itself alone

🍞 Hiram needed food more than treasure

📖 Both kings needed what the other had

# FirstKingsFive 5:10-12
# 🤝 A Deal Sealed In Peace
---
## ✅ So Hiram Gave Solomon Cedar Trees And Fir Trees According To All His Desire

Hiram followed through completely on everything he had promised.

Nothing in the request was reduced or left out.

A promise made between two kings only mattered once it was actually kept.

This chapter cares as much about follow through as it does about the original ask.

✅ Hiram kept his promise in full

📦 Nothing was reduced or left out

🤝 Kept promises made the alliance real

📖 Follow through mattered as much as words

## 📏 Twenty Thousand Measures Of Wheat For Food To His Household, And Twenty Measures Of Pure Oil

A "measure" here was likely a cor, one of the largest units in ancient Israel.

A single cor held enough grain to fill several large barrels.

Twenty thousand of them made an enormous shipment of food, not a small gift.

Solomon paid a king's ransom in food for Hiram's timber and skilled labor.

📏 A measure was likely a large cor

🌾 Twenty thousand measures was a massive shipment

🫒 Pure oil was also part of the payment

📖 Solomon paid richly for Hiram's help

## 🔁 Thus Gave Solomon To Hiram Year By Year

This was not a single, one time gift between the two kings.

Solomon supplied Hiram with food every single year, on a set schedule.

An ongoing arrangement like this needed real trust on both sides.

The temple project would take years, so the trade deal had to last that long too.

🔁 This payment repeated every single year

📅 It ran on a steady yearly schedule

🤝 Ongoing trade required lasting trust

📖 A long project needed a long deal

## 🙏 The LORD Gave Solomon Wisdom, As He Promised Him

This is the same wisdom God promised Solomon back at Gibeon.

There, God offered Solomon anything he wanted, and Solomon asked for wisdom instead of riches.

Handling a huge international building project is one place that wisdom is now visible.

God's promise from chapter three is already paying off in chapter five.

🙏 This wisdom was promised back at Gibeon

🎁 Solomon asked wisdom instead of riches

🏗️ Wisdom now shows up in real leadership

📖 An early promise is already bearing fruit

## 📜 And They Two Made A League Together

A "league" here means a formal treaty, not a casual understanding.

Both kings gave their word to honor fixed, agreed terms.

This is one of the earliest recorded peace treaties in Israel's history as a united kingdom.

The temple could only be built because two kingdoms first chose peace.

📜 League means a formal treaty

🤝 Both kings agreed to honor it

🏛️ This was an early peace treaty

📖 Peace between nations made the temple possible

# FirstKingsFive 5:13-15
# 🪨 Solomon's Labor Force
---
## 📋 And King Solomon Raised A Levy Out Of All Israel

A "levy" was a forced labor draft, not a request for volunteers.

The king had the legal power to pull ordinary men away from their homes to work.

Solomon used this same tool later in the chapter for even more workers.

A labor draft like this would eventually become a serious source of national anger.

📋 Levy means a forced labor draft

👑 The king could pull men from home

⚒️ Solomon used it for this huge project

📖 This same tool later helped split the kingdom

## 🔢 And The Levy Was Thirty Thousand Men

Thirty thousand men is a massive number pulled from ordinary daily life.

Every one of those men had a farm, a family, or a trade waiting at home.

A project on this scale touched almost every town in the kingdom.

Solomon's temple came with a real human cost most readers never picture.

🔢 Thirty thousand men were drafted

🏡 Each one left a home behind

🗺️ Nearly every town felt this project

📖 Building glory carried a human cost

## 🔄 Ten Thousand A Month By Courses

"Courses" is an old word for rotating shifts, not random turns.

Ten thousand men worked in Lebanon at any given time.

Each group served one month away, then came home for two months.

Rotating the workforce kept the draft from destroying anyone's normal life completely.

🔄 Courses means rotating scheduled shifts

🌲 Ten thousand worked in Lebanon at once

🏠 Two months home followed one month away

📖 Rotation kept the draft survivable

## 👤 And Adoniram Was Over The Levy

Adoniram was the officer placed in charge of this entire labor draft.

He already appeared earlier in this book overseeing tribute for Solomon.

Years later, a different king will send this same Adoniram back out to Israel.

That later mission ends with Adoniram stoned to death by an angry crowd.

👤 Adoniram ran the whole labor draft

📜 He already served under Solomon before

⚠️ Sent out again under a later king

📖 That mission ends in his death

## 🔢 Threescore And Ten Thousand That Bare Burdens, And Fourscore Thousand Hewers In The Mountains

"Threescore" is an old way of counting by twenty, and it means sixty.

So "threescore and ten thousand" means seventy thousand men carrying loads.

"Fourscore" means eighty, so eighty thousand more men cut stone in the mountains.

That is one hundred fifty thousand workers before counting Solomon's own officers.

🔢 Threescore means sixty, fourscore means eighty

📦 Seventy thousand men carried heavy loads

⛏️ Eighty thousand men cut stone

📖 The full workforce topped a hundred fifty thousand

# FirstKingsFive 5:16-18
# 🏗️ Stone Cut For The Foundation
---
## 🗂️ Beside The Chief Of Solomon's Officers Which Were Over The Work, Three Thousand And Three Hundred

This number does not count laborers, it counts the men managing them.

That many supervisors kept a workforce of over one hundred fifty thousand organized.

A project this size needed real structure, not just raw manpower.

Good management made an almost impossible task actually possible.

🗂️ These were managers, not laborers

🔢 Thirty three hundred supervisors ran the project

🏗️ Huge projects still need real structure

📖 Organization made the impossible possible

## 🪨 Great Stones, Costly Stones, And Hewed Stones

These are three separate descriptions of stone, not one repeated idea.

"Great" stones were simply large in size.

"Costly" stones were expensive, likely fine quality limestone worth real money.

"Hewed" stones were carefully cut and shaped, not left rough from the quarry.

🪨 Great means large in size

💰 Costly means expensive quality stone

🔨 Hewed means carefully cut and shaped

📖 Every word here describes something different

## 🏗️ To Lay The Foundation Of The House

A foundation carries the weight of everything built on top of it later.

Rough, uneven stone would eventually crack or shift under that pressure.

That is why Solomon insisted on the best stone before laying a single wall.

This chapter ends right at the very first physical step of building the temple.

🏗️ A foundation carries all future weight

⚠️ Rough stone could crack under pressure

✅ Solomon started with the best stone

📖 The real building begins right here

## 🔲 Solomon's Builders And Hiram's Builders Did Hew Them, And The Stonesquarers

"Stonesquarers" were skilled masons trained to cut stone into perfect right angles.

The parallel account in Second Chronicles names them as men from Gebal, another Phoenician city.

Israelite and Phoenician workers were literally shaping this stone side by side.

God's house was being built by more than one nation's hands.

🔲 Stonesquarers cut stone into exact angles

🏙️ Second Chronicles names them men of Gebal

🤝 Israelites and Phoenicians worked side by side

📖 More than one nation built this house

## 📦 So They Prepared Timber And Stones To Build The House

Every person, promise, and shipment in this chapter led to this one moment.

The wood is cut, the stone is shaped, and both sides have kept their word.

Nothing has actually been built yet, only prepared.

The next chapter finally raises the walls this chapter spent its whole length preparing for.

📦 Everything in this chapter built toward this

🪵 Timber and stone both stood ready

⏳ Nothing was built yet, only prepared

📖 The next chapter finally raises the walls`.trim();

export const FIRST_KINGS_FIVE_PERSONAL_SECTIONS = parseFirstKingsFiveRawNotes(FIRST_KINGS_FIVE_RAW_NOTES);
