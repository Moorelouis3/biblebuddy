export type SecondChroniclesNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesNineRawNotes(rawText: string): SecondChroniclesNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 9:${startVerse}` : `2 Chronicles 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 2 Chronicles 9 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_NINE_RAW_NOTES = `# SecondChronicles 9:1-4
# 👑 The Queen Of Sheba Arrives
---
## 👑 Queen Of Sheba

Sheba was a wealthy kingdom in southern Arabia.

Some ancient writers connect its trade routes across the Red Sea into East Africa too.

Its wealth came from controlling the spice trade, especially frankincense and myrrh.

A queen ruling that kingdom controlled some of the richest trade routes in the ancient world.

Her visit was not a small errand.

It was one great power reaching out to another.

🗺️ Sheba sat in southern Arabia

🌿 Its wealth came from the spice trade

👑 A queen ruled that kingdom alone

📖 Two great powers meet in this visit

---

## 🧩 To Prove Solomon With Hard Questions

"Prove" here means to test, not to approve.

Ancient royal courts sometimes traded riddles as a public contest of wisdom.

Whoever answered every riddle proved a right to be called wise.

The queen came prepared with questions meant to expose any gap in his reputation.

She was not visiting to flatter him.

She came to find out if the stories about him were true.

🧩 Prove means to test

👑 Royal courts held riddle contests

❓ She wanted proof, not flattery

📖 She checked whether the fame was real

---

## 🐫 Camels That Bare Spices And Gold In Abundance

"Bare" is an old word for carried.

A caravan loaded with spices, gold, and precious stones was not a small gift.

It was a visible display of Sheba's own wealth and trading power.

Every camel that entered Jerusalem told Solomon's court how rich her kingdom already was.

The gifts were part of the test too.

A truly great king would not need to be impressed by wealth alone.

🐫 Bare is an old word for carried

💰 The caravan displayed Sheba's own wealth

🚶 Every camel carried part of the message

📖 True greatness could not be bought with gifts

---

## 🗣️ Communed With Him Of All That Was In Her Heart

"Communed" means an open, ongoing conversation, not a formal audience with fixed questions.

She spoke to Solomon about whatever was actually on her mind.

That went beyond the questions she had prepared in advance.

The test turned into a real conversation between two rulers.

Wisdom that only answers scripted questions is not real wisdom.

🗣️ Communed means open conversation

❓ She spoke beyond her prepared questions

👑 Two rulers talked as equals

📖 Real wisdom holds up outside a script

---

## ❓ There Was Nothing Hid From Solomon

Every question she asked, Solomon answered.

"Nothing hid" means his wisdom had no limit her questions could find.

Years earlier Solomon asked God for wisdom instead of riches at Gibeon.

This moment shows that request was answered in full.

A foreign queen with her hardest questions still could not stump him.

❓ She asked, he answered every time

🙏 Recalls Solomon's prayer for wisdom at Gibeon

👑 A queen's hardest test still failed

📖 God's gift proved complete

---

## 🏰 The House That He Had Built

"The house" here means Solomon's own royal palace, not the temple.

Second Chronicles eight already described this building project, thirteen years in the making.

The queen now sees it with her own eyes instead of hearing about it secondhand.

Wisdom in Solomon's court was not only spoken.

It could be seen in how his whole kingdom was run.

🏰 The house means Solomon's palace

📚 Already described back in chapter eight

👀 She sees it firsthand now

📖 Wisdom shows up in more than words

---

## 🍽️ The Meat Of His Table

Verse three and four list everything that impressed her about daily palace life.

The food on his table was one part of it.

The seating order of his servants was another.

How his ministers dressed and were cared for was a third.

Even his cupbearers had their own fine clothing.

None of that happened by accident.

It reflects the same order and wisdom she came looking for.

🍽️ The food on his table stood out

🪑 So did the order of his servants

🎩 Ministers and cupbearers had fine apparel

📖 Order like that reflects real wisdom

---

## 🪜 His Ascent By Which He Went Up Into The House Of The LORD

"Ascent" means the stairway Solomon used to reach the temple.

It connected his own palace directly to the temple of the LORD.

Seeing that path with her own eyes told her something words could not.

Solomon's kingdom and his worship were not separate things.

One walkway physically joined his throne to God's house.

🪜 Ascent means a stairway or walkway

🏛️ It joined his palace to the temple

👑 Rule and worship were not separate

📖 One path led straight to God's house

---

## 😮 There Was No More Spirit In Her

"No more spirit in her" is an old way to describe being completely overwhelmed.

It does not mean she lost her breath or fainted.

It means everything she saw left her without words.

She had come expecting to test Solomon.

Instead his kingdom left her stunned into silence.

😮 No more spirit means overwhelmed

🤐 Not a literal loss of breath

👀 Everything she saw left her speechless

📖 The tester became the amazed one

# SecondChronicles 9:5-8
# 🙏 Her Words To The King
---
## 📜 It Was A True Report Which I Heard

"Report" here means the rumors already reaching her homeland before she came.

Solomon's fame had traveled far beyond Israel's own borders.

She admits the stories she heard at home were accurate.

That is a rare thing for a foreign ruler to admit.

Fame that survives a visit is fame that was true all along.

📜 Report means the rumors she had heard

🌍 His fame had traveled far from home

✅ She admits the stories were true

📖 Real fame survives a firsthand visit

---

## 🤔 Howbeit I Believed Not Their Words

"Howbeit" is an old word for however.

The queen admits she doubted the reports before she came.

Rumors of a king this wise and wealthy sounded too big to be real.

Seeing it herself was the only thing that finally convinced her.

Doubt was a reasonable response to a story that sounded impossible.

🤔 Howbeit means however

😕 She doubted the reports at first

👀 Seeing it herself changed her mind

📖 Doubt gave way to real evidence

---

## 😲 The One Half Was Not Told Me

"The one half was not told me" means the reports fell short of reality.

Not because anyone lied to her, but because words could not capture it fully.

Reports gave her a fraction of what Solomon's wisdom and wealth actually were.

Standing in Jerusalem, she finally saw the rest for herself.

Some things cannot be summarized secondhand.

😲 Half told means an incomplete picture

🗣️ Words could not capture it fully

👑 The reality outgrew every rumor

📖 Some things must be seen firsthand

---

## 🙌 Happy Are Thy Men

"Happy" here means blessed, not simply cheerful.

She is not complimenting Solomon directly in this line.

She is naming his own servants as fortunate people.

They get to live inside this wisdom every single day.

An outsider notices what insiders can start to take for granted.

🙌 Happy means blessed here

👥 She praises his servants directly

📅 They live near wisdom daily

📖 Outsiders notice what insiders forget

---

## 👂 Stand Continually Before Thee

Solomon's own household never had to wait for an audience with him.

"Continually" means without any break, not occasional access.

That kind of daily nearness was rare in the ancient world.

Most outsiders only heard about a wise king from a distance.

His own servants lived inside that wisdom every day.

👂 Continually means without a break

🏰 His servants had daily access to him

🌍 Most people only heard of him

📖 Nearness to wisdom was a real gift

---

## 🙏 Blessed Be The LORD Thy God

A foreign queen praising Israel's God is a striking moment here.

Sheba normally worshiped its own gods, not the God of Israel.

Yet after watching Solomon's kingdom, she praises the LORD by name.

Wisdom and order this complete pointed her straight to their source.

A visit meant to test a king ended up pointing to God.

🙏 A foreign queen praises the LORD

🌍 Sheba normally worshiped other gods

👑 Solomon's order pointed to its source

📖 The test ended up pointing to God

---

## 👑 To Be King For The LORD Thy God

Solomon's throne was never fully his own.

He rules on God's behalf, not by his own claim to power.

First Chronicles twenty eight already called it the LORD's own throne.

Even a foreign queen recognizes that Solomon rules under someone greater.

Every king in Israel answered to a higher King.

👑 Solomon rules on God's behalf

📚 First Chronicles already named it God's throne

🌍 Even an outsider recognizes this

📖 Every king in Israel answered to God

---

## ⚖️ To Do Judgment And Justice

Judgment and justice describe the actual job of a king in Israel.

"Judgment" means settling disputes in a fair way.

"Justice" means treating every person, rich or poor, by the same standard.

This was the exact request Solomon made to God back in First Kings three.

The queen is naming, without knowing it, the very prayer that started it all.

⚖️ Judgment means settling disputes in a fair way

🤝 Justice means one standard for everyone

🙏 This matches Solomon's own prayer

📖 She names the prayer without knowing it

# SecondChronicles 9:9-12
# 🎁 Gifts Exchanged
---
## 💰 An Hundred And Twenty Talents Of Gold

A talent was the largest weight measurement used in the ancient world.

One talent was close to seventy five pounds.

An hundred and twenty talents means close to four and a half tons of gold.

That single gift was worth more than most kingdoms gathered in years.

This was not a small courtesy gift.

It was proof of how wealthy Sheba really was.

💰 A talent was a huge unit of weight

⚖️ One talent was close to seventy five pounds

🐫 This gift alone weighed tons of gold

📖 It proved exactly how rich Sheba was

---

## 🌿 Neither Was There Any Such Spice

This line singles out her spices as unmatched, even among royal gifts.

Sheba controlled the frankincense and myrrh trade routes that supplied the ancient world.

No other gift ever recorded in Solomon's court matched the quality of hers.

Spices like these were burned in worship and used in expensive perfume and medicine.

Her gift was not just generous.

It was the very best her kingdom had to offer.

🌿 Her spices were unmatched, even for a king

🐫 Sheba controlled the frankincense and myrrh trade

🕯️ These spices were used in worship and medicine

📖 She gave the very best she had

---

## 🥇 Gold From Ophir

Ophir was a distant, gold rich region reached only by long sea voyages.

Its exact location is not fully known today, though many scholars place it near Arabia or East Africa.

Huram, the king of Tyre, supplied ships and sailors for these journeys.

Solomon partnered with him already back in chapter eight to reach it.

Gold from Ophir meant gold that took real risk and distance to obtain.

🥇 Ophir was a distant, gold rich region

🚢 It took long sea voyages to reach

🤝 Huram's ships helped Solomon get there

📖 This gold came at real cost and risk

---

## 🌳 Algum Trees

Algum wood was a rare, fragrant wood imported from the same distant regions as the gold.

It was too valuable and too scarce to use for ordinary building.

Solomon used it for temple work and for musical instruments instead.

A tree most Israelites had never even seen became part of temple worship.

Even the wood used mattered.

🌳 Algum was a rare, fragrant imported wood

💎 It was too valuable for ordinary building

🎵 Solomon used it for instruments and terraces

📖 Even the wood used for worship mattered

---

## 🎶 Harps And Psalteries For Singers

A "psaltery" was a stringed instrument, similar to a harp but smaller.

Both were played to accompany singers during temple worship.

These instruments, cut from the rare algum wood, had never been made in Judah before.

Worship in Solomon's temple involved trained musicians, not silence.

Even the instruments were made from the best materials available.

🎶 A psaltery is a small, stringed instrument

🎤 Both instruments accompanied temple singers

🌳 They were cut from the rare algum wood

📖 Worship used the very best materials available

---

## 🎁 All Her Desire, Whatsoever She Asked

Solomon did not simply accept her gifts and send her home.

He gave her everything she wanted in return, beyond what she had already brought him.

Ancient royal custom expected a host to match or exceed a guest's generosity.

Solomon's response matched the wisdom she came looking for.

Generosity, not just cleverness, was part of what impressed her.

🎁 Solomon gave her everything she asked for

🤝 Royal custom expected generous hosting

👑 He matched the wealth she brought

📖 His generosity matched his wisdom

---

## 🚶 She Turned, And Went Away To Her Own Land

The visit, remarkable as it was, eventually had to end.

She returns home to Sheba with her own servants, not staying in Jerusalem.

This closes one specific royal visit inside a much bigger picture painted later in the chapter.

Verse twenty three will reveal that kings from all over the earth came seeking Solomon.

Her visit was famous, but it was only one example among many.

🚶 She returns home with her servants

🏁 This closes one specific royal visit

🌍 Verse twenty three names many more visitors

📖 Her visit was one example among many

# SecondChronicles 9:13-16
# 🪙 Solomon's Yearly Gold
---
## 🔢 Six Hundred And Threescore And Six Talents

"Threescore" is an old word for sixty.

Six hundred and threescore and six means six hundred sixty six talents of gold.

That is close to twenty five tons of gold arriving in a single year.

This total did not even include tribute, trade income, or personal gifts described next.

Solomon's wealth was not a one time windfall.

It was a yearly flood of gold that kept arriving.

🔢 Threescore is an old word for sixty

⚖️ The total was six hundred sixty six talents

📅 This arrived every single year

📖 Wealth kept flowing in, not just once

---

## 🐫 Chapmen And Merchants

A "chapman" is an old word for a traveling trader or peddler.

This income came separately from the yearly total already named in verse thirteen.

Ordinary trade, not just royal tribute, kept adding to Solomon's wealth.

Kings of Arabia and regional governors added their own gold and silver on top of that.

Wealth reached Solomon from every direction at once.

🐫 A chapman is an old word for trader

💰 This came on top of the yearly total

🌍 Even everyday trade added to his wealth

📖 Wealth reached him from every direction

---

## 👑 Kings Of Arabia And Governors Of The Country

This names two separate sources of Solomon's income beyond ordinary trade.

Foreign kings sent gold as a form of tribute, acknowledging his power.

Local governors within his own territory sent gold as a form of taxation.

Both outside nations and Solomon's own government funded his growing wealth.

Power and wealth were feeding each other constantly.

👑 Foreign kings sent tribute gold

🏛️ Local governors sent gold as taxes

🌍 Wealth came from outside and inside

📖 Power and wealth kept feeding each other

---

## 🛡️ Two Hundred Targets Of Beaten Gold

A "target" here means a large shield, not something used for archery practice.

"Beaten gold" means gold hammered into thin sheets and layered over the shield's frame.

Six hundred shekels of gold covered a single target, an enormous amount for one shield.

These shields were built for display, not for battle.

No soldier could carry that much gold weight into a real fight.

🛡️ A target here means a large shield

🔨 Beaten gold means gold hammered thin

⚖️ Each one used six hundred shekels of gold

📖 These shields were built to display wealth

---

## 🗡️ Three Hundred Shields

These were smaller than the two hundred targets described just before them.

Each one still used three hundred shekels of gold, half the weight of a target.

Solomon apparently wanted two sizes of golden shields on display, not just one.

Even the smaller version was still an extravagant amount of gold.

Scale itself became part of the display.

🗡️ These shields were smaller than the targets

⚖️ Each used three hundred shekels of gold

📏 Two different sizes were both on display

📖 Even the smaller shields were extravagant

---

## 🌲 House Of The Forest Of Lebanon

This building gets its name from the many cedar pillars lining its halls.

Rows of cedar columns made it look like walking through a forest.

It served as an armory and treasury, not a house anyone actually lived in.

Both sets of golden shields were displayed here, not carried into battle.

A building named after a forest held the kingdom's golden wealth.

🌲 Named for its rows of cedar pillars

🏛️ It served as an armory and treasury

🛡️ Both sets of gold shields were kept here

📖 A forest of cedar guarded golden wealth

# SecondChronicles 9:17-19
# 🦁 The Great Ivory Throne
---
## 🦷 A Great Throne Of Ivory

Ivory came from imported elephant tusks, expensive and rare in the ancient world.

It was carved first.

Then it was overlaid completely with pure gold.

A throne built from two of the rarest materials in the world announced real power.

This was not simply a chair.

It was a statement built to be seen.

🦷 Ivory came from imported elephant tusks

✨ It was overlaid with pure gold

👑 Two rare materials built one throne

📖 The throne was a statement of power

---

## 🪜 Six Steps To The Throne

Steps leading up to a throne were common in the ancient world.

Each step a visitor climbed physically placed the king higher above them.

Six steps meant six deliberate moments of looking up before ever reaching Solomon.

The design itself reinforced who held the authority in that room.

Architecture here was doing the work of a message.

🪜 Six steps led up to the throne

👀 Visitors looked up with every step

👑 Height itself reinforced his authority

📖 The design carried its own message

---

## 🦶 A Footstool Of Gold, Fastened To The Throne

A footstool kept a seated king's feet from resting on the bare floor.

"Fastened" means it was permanently attached, not a separate piece that could be moved.

Made of gold like the throne itself, it matched everything around it.

Every detail near the throne, down to where the king's feet rested, was gold.

Nothing about this seat was left plain or ordinary.

🦶 A footstool kept his feet off the floor

🔗 Fastened means permanently attached

✨ It was gold like the throne itself

📖 Even his footrest was made of gold

---

## 🪑 Two Lions Standing By The Stays

"Stays" means the armrests on either side of the throne's seat.

A carved lion stood beside each one, facing outward.

Lions symbolized strength and royalty across the ancient Near East.

Genesis forty nine already calls Judah, Solomon's own tribe, a lion's whelp.

The armrests themselves reminded every visitor which tribe this king came from.

🪑 Stays means the throne's armrests

🦁 A lion stood beside each one

📜 Genesis already calls Judah a lion's whelp

📖 The throne reminded visitors of his tribe

---

## 🦁 Twelve Lions Stood There

Twelve more lions lined the six steps, two on every step.

Twelve is not a random number in Israel's story.

It matches the twelve tribes descended from Jacob's sons.

Every step a visitor climbed passed lions representing the whole nation, not just Solomon alone.

The throne represented all of Israel, not one man's power.

🦁 Twelve lions lined the six steps

🔢 Twelve matches the twelve tribes of Israel

🚶 Visitors passed the whole nation climbing up

📖 The throne stood for all of Israel

---

## 🌍 There Was Not The Like Made In Any Kingdom

This is the chronicler's own verdict, not Solomon's boast about himself.

No other kingdom in the known world had built a throne to match it.

Fame like this traveled through trade routes long before photographs or news ever existed.

Visitors who saw it firsthand were the ones who spread that reputation onward.

A single piece of furniture became part of Solomon's worldwide fame.

🌍 No other kingdom matched this throne

✍️ This is the chronicler's own verdict

🗣️ Visitors spread the reputation by word of mouth

📖 One throne became part of his fame

# SecondChronicles 9:20-21
# ⚓ Silver Like Stones And Ships Of Tarshish
---
## 🥈 None Were Of Silver

Every drinking vessel in Solomon's palace was made of gold, none of silver.

That detail only makes sense against what silver normally meant in the ancient world.

Silver was usually a precious metal on its own, valuable enough for royal use elsewhere.

In Solomon's court it was considered too plain to bother using.

Gold had become that ordinary in his kingdom.

🥈 Every vessel in his palace was gold

💰 Silver was normally precious on its own

😮 In Solomon's court it seemed too plain

📖 Gold had become that common for him

---

## 🚢 The King's Ships Went To Tarshish

Tarshish likely refers to a distant port, possibly located in southern Spain.

"Ships of Tarshish" may also describe a class of large, ocean going trading vessels.

Either way, these were not small boats meant for coastal trips.

Solomon partnered again with Huram's sailors, the same partnership already seen with the Ophir voyages.

Solomon's trade network reached far beyond the Mediterranean world nearby.

🚢 Tarshish likely names a distant port

⛴️ Or it may describe large trading ships

🤝 Huram's sailors partnered on these voyages

📖 Solomon's trade reached far beyond nearby lands

---

## 📅 Every Three Years Once

Ancient sailing ships depended entirely on wind and open water routes.

A journey this far could take a full year in each direction alone.

Loading, trading, and returning safely stretched the whole trip out even longer.

Three years between voyages was not laziness.

It reflects exactly how long a voyage like this actually took.

📅 Three years passed between each voyage

🌬️ Ancient ships depended on wind and routes

⏳ A trip this far took a long time

📖 The gap reflects real travel time, not delay

---

## 🐒 Apes, And Peacocks

These animals came from far outside Israel's own region, likely India or East Africa.

Neither one had any practical use in Solomon's kingdom.

They existed purely as exotic proof of how far his trade network reached.

A king who could bring home living animals from distant lands controlled a truly wide network.

Even strange, useless cargo became a display of power.

🐒 Apes and peacocks came from distant lands

🌍 Likely from India or East Africa

🎪 They had no practical use at home

📖 Even exotic cargo displayed his reach

# SecondChronicles 9:22-24
# 🌍 Kings Of The Earth Seek Solomon
---
## 👑 Passed All The Kings Of The Earth

This is the chapter's own summary statement about Solomon's reign.

"Passed" means he surpassed or exceeded every other ruler alive at the time.

Both riches and wisdom are named together, not one without the other.

Back in First Kings three, Solomon asked God only for wisdom.

God gave him riches and honor on top of it, exactly as promised.

👑 Passed means he surpassed every other king

💰 Both riches and wisdom are named together

🙏 He originally only asked for wisdom

📖 God added riches exactly as promised

---

## 🌍 Sought The Presence Of Solomon

The queen of Sheba was not a single, unusual visitor.

She represents a pattern that played out with kings across the earth.

Rulers from distant nations traveled specifically to hear Solomon speak, not just to trade with him.

His court became a destination people crossed real distance to reach.

Fame like this spread because people actually showed up, not just because of rumor.

🌍 Many kings sought him out, not only Sheba

👑 The queen's visit was part of a pattern

🗣️ They came to hear him speak

📖 Fame spread because people actually showed up

---

## 💡 That God Had Put In His Heart

This line credits the source of Solomon's wisdom directly.

It did not come from his own natural cleverness or training.

First Kings three describes God giving Solomon wisdom in a dream at Gibeon.

Every visiting king who marveled at Solomon was really witnessing God's gift on display.

Solomon's fame ultimately pointed past himself.

💡 Wisdom came from God, not cleverness

🌙 First Kings three names the dream at Gibeon

👑 Every visitor really witnessed God's gift

📖 Solomon's fame pointed past himself

---

## 📆 A Rate Year By Year

This phrase means these gifts were not a one time occurrence.

Visiting kings brought tribute on a regular, expected schedule, not just once out of curiosity.

That kind of ongoing tribute functioned like an unofficial tax paid to a dominant power.

Solomon's influence was not a passing trend.

It was a structured, lasting arrangement between nations.

📆 A rate year by year means ongoing tribute

🌍 Nations paid it on a regular schedule

💰 It worked like an unofficial tax

📖 His influence was structured, not passing

---

## 🎁 Vessels Of Silver, And Vessels Of Gold

This verse lists several categories of gifts arriving every year.

Silver and gold vessels were valuable, often ceremonial containers.

Clothing, weapons, spices, horses, and mules rounded out the list.

Together these gifts cover nearly every category of ancient wealth.

Solomon's court kept absorbing the finest goods the world produced.

🎁 Vessels of silver and gold were valuable gifts

👗 Fine clothing rounded out the list

🐎 Horses and mules were part of it too

📖 Nearly every category of wealth is named here

---

## 🛡️ Harness

In this verse, "harness" is an old word for armor, not horse equipment.

Kings sent weapons and armor along with their other tribute gifts.

Even military gear became part of a peaceful, diplomatic exchange.

Solomon's court received both luxury goods and tools of war side by side.

Wealth and military strength arrived together, not separately.

🛡️ Harness here is an old word for armor

⚔️ Kings sent weapons as tribute too

🤝 Military gear became a diplomatic gift

📖 Wealth and strength arrived together

# SecondChronicles 9:25-28
# 🐎 Horses, Chariots, And Dominion
---
## 🐎 Four Thousand Stalls For Horses And Chariots

First Kings four describes this same total as forty thousand stalls instead of four thousand.

Many scholars point to an early copying difference between manuscripts to explain the gap.

Either way, the point stands, Solomon kept a massive standing chariot force.

A stall count this size describes real military infrastructure, not decoration.

Solomon's kingdom was built for defense as much as for display.

🐎 First Kings four lists a different total

📜 Many scholars point to a copying difference

🏇 Either number describes a huge chariot force

📖 Solomon built for defense, not just display

---

## 🏘️ Chariot Cities

These were fortified towns built specifically to house and supply chariot forces.

First Kings nine names cities like Hazor, Megiddo, and Gezer among them.

Chariots needed stables, drivers, and supply routes spread across the kingdom, not kept in one place.

Positioning them at key locations let Solomon respond quickly across his whole territory.

Military planning, not just wealth, shaped how Solomon's kingdom was built.

🏘️ Chariot cities housed military forces

🗺️ First Kings nine names several of them

🐎 Chariots were spread across the kingdom

📖 Military planning shaped his whole kingdom

---

## 🏇 Twelve Thousand Horsemen

"Horsemen" means cavalry riders, distinct from soldiers who fought on foot or from chariots.

Twelve thousand riders describes an enormous standing military force for this era.

Deuteronomy seventeen had actually warned future kings against multiplying horses for themselves.

Solomon's own buildup sits in real tension with that specific warning.

Wealth and power, even when God given, carried real risk.

🏇 Horsemen means cavalry riders

🔢 Twelve thousand was an enormous force

⚠️ Deuteronomy seventeen warned against this exact thing

📖 Even God given power carried real risk

---

## 🗺️ From The River Even Unto The Land Of The Philistines

"The river" here means the Euphrates, far to the northeast of Israel.

Solomon's authority reached from that river all the way to Philistine territory and Egypt's border.

This matches the exact boundaries God promised Abraham back in Genesis fifteen.

A promise made centuries earlier to one wandering man was now fully in place.

Solomon's kingdom was living inside an old promise, not just building a new one.

🗺️ The river means the Euphrates

🌍 His authority reached to Egypt's border

📜 This matches the promise made to Abraham

📖 An old promise was now fully in place

---

## 🥈 Silver In Jerusalem As Stones

This is a figure of speech, not a literal claim about stones.

It means silver had become as common in Jerusalem as the stones lying on the ground.

A metal that once measured real wealth had lost its status entirely under Solomon.

Only gold still carried any real weight in his court, as verse twenty already showed.

Abundance itself had changed what counted as valuable.

🥈 This is a figure of speech

🪨 Silver became as common as stones

📉 It lost its status as valuable

📖 Abundance changed what counted as rich

---

## 🌲 Cedar Trees Made He As The Sycomore Trees

Cedar was a rare, expensive wood imported from Lebanon at real cost.

Sycomore was a common, lower quality wood that grew locally in the lowlands.

Comparing cedar to sycomore means expensive wood became as ordinary as cheap wood.

This mirrors the exact same idea already used about silver just one line earlier.

Solomon's kingdom kept repeating one message, nothing here was scarce anymore.

🌲 Cedar was rare and imported from Lebanon

🌿 Sycomore was common and grew locally

📉 Cedar became as ordinary as sycomore

📖 Nothing in this kingdom stayed scarce

---

## 🐴 Horses Out Of Egypt

Egypt was known across the ancient world for breeding strong, valuable horses.

Solomon imported them directly, adding to the massive force already described in this chapter.

Deuteronomy seventeen specifically warned Israel's future king not to send people back to Egypt for horses.

Solomon is shown doing precisely the thing that warning named.

The chapter's glowing account of Solomon quietly carries this one uncomfortable detail.

🐴 Egypt bred strong, valuable horses

📥 Solomon imported them directly

⚠️ Deuteronomy specifically warned against this

📖 One warning quietly went unheeded here

# SecondChronicles 9:29-31
# ⚰️ Solomon Dies And Rehoboam Reigns
---
## 📚 The Book Of Nathan The Prophet

The chronicler names a real written source instead of writing from memory.

Nathan the prophet had a close relationship with David's household for decades.

This document has not survived to the present day.

The Bible mentions other lost records like this one in several places.

Whatever we do not have was never meant to replace what we were given.

📚 The chronicler names a real written source

🗣️ Nathan was close to David's own household

📜 This document has not survived to today

📖 Scripture sometimes points past its own pages

---

## 👁️ Ahijah The Shilonite

Ahijah was a prophet from the town of Shiloh, an early center of Israel's worship.

He appears later in First Kings eleven, tearing his own garment into twelve pieces.

That act symbolically announces the kingdom's coming split under Solomon's own son.

Naming him here quietly plants a seed for what comes right after this chapter.

The chronicler is preparing readers for trouble before it actually arrives.

👁️ Ahijah was a prophet from Shiloh

👕 He later tears his garment in First Kings

🔀 That act predicts the kingdom's coming split

📖 A seed for trouble is planted here

---

## 🔮 Visions Of Iddo The Seer Against Jeroboam

A "seer" is an old word for a prophet who received visions.

Jeroboam had not yet rebelled at the point this chapter describes.

His name appearing here already points forward to the coming division of the kingdom.

This whole glowing chapter about Solomon's wealth ends on a quiet, ominous note.

Even at the height of glory, the story was already turning toward trouble.

🔮 A seer is a prophet who received visions

👤 Jeroboam had not rebelled yet

🔀 His name points to the coming split

📖 Glory and warning sit side by side here

---

## 🕰️ Forty Years

Forty years was Solomon's entire length of reign over Israel.

David, his father, also reigned for exactly forty years before him.

Numbers repeated like this in Scripture often carry the sense of a full, complete lifetime of rule.

Solomon's reign is being marked here as a complete era, not just an ending date.

A long, full reign is now closing.

🕰️ Forty years was Solomon's full reign

👑 David also reigned forty years

🔁 Repeated numbers often signal completeness

📖 One complete era is now closing

---

## 😴 Slept With His Fathers

"Slept with his fathers" is a common Old Testament way of describing death.

It reflects a belief that death was not a final, hopeless ending in this culture.

Being buried in the city of David placed him among his own family line.

The phrase treats death with dignity.

It avoids harsh, blunt language.

Even at the end of the chapter, the language stays respectful.

😴 Slept means died, in old language

🏛️ He was buried among his own family

🕊️ The phrase softens how death is described

📖 The account closes with dignity

---

## 👑 Rehoboam His Son Reigned In His Stead

This one line closes Solomon's story and opens the next one.

Rehoboam becomes king without his father's hard won experience.

The very next chapter shows him losing most of the kingdom almost immediately.

Everything built across this chapter, the wealth, the wisdom, the fame, now passes to him.

A kingdom built over forty years is handed to someone untested.

👑 Solomon's story closes, Rehoboam's opens

😬 He lacks his father's experience

📉 The kingdom soon begins to fracture

📖 A forty year legacy meets an untested heir
`.trim();

export const SECOND_CHRONICLES_NINE_PERSONAL_SECTIONS = parseSecondChroniclesNineRawNotes(SECOND_CHRONICLES_NINE_RAW_NOTES);
