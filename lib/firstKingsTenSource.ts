export type FirstKingsTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsTenRawNotes(rawText: string): FirstKingsTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsTen\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsTen\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsTen\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 10:${startVerse}` : `1 Kings 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 1 Kings 10 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_TEN_RAW_NOTES = `# FirstKingsTen 10:1-3
# 👑 The Queen Of Sheba Comes To Test Him
---
## 👂 Heard Of The Fame Of Solomon

Solomon's reputation had already spread far beyond Israel's own borders.

"Fame" here means his wisdom and wealth had become common talk among foreign nations.

Trade routes carried news the same way they carried goods.

A king this remarkable was worth traveling a great distance to see for herself.

👂 Fame means widespread reputation
🗺️ News traveled along trade routes
👑 Solomon's reputation crossed nations
📖 Trade routes carried news, not just goods

---

## ❓ Hard Questions

"Hard questions" here means more than casual curiosity.

Ancient rulers often tested each other with riddles and difficult sayings.

Answering well proved a king's wisdom was real.

The queen came ready to test Solomon herself.

❓ Hard questions means real riddles
👑 Rulers tested each other this way
🧠 Answers proved wisdom was genuine
📖 The queen came ready to test him

---

## 🐫 A Very Great Train

A "train" here means a long traveling procession, not a railway.

Camels, servants, and treasure all moved together as one great company.

A visit like this signaled real political weight, not a casual errand.

The size of her train matched the size of her question for Solomon.

🐫 Train means a long procession
👥 Camels and servants moved together
👑 Size signaled real political weight
➡️ A grand visit for a grand question

---

## 🌿 Camels That Bare Spices

Spices were among the most valuable goods in the ancient world.

Sheba sat along major trade routes for frankincense and myrrh.

Carrying this much spice meant carrying enormous wealth on camelback.

This gift was chosen to impress, not simply to travel light.

🌿 Spices were extremely valuable goods
🐫 Sheba controlled key spice routes
💰 This much spice meant real wealth
📖 The gift was meant to impress

---

## 🧠 There Was Not Any Thing Hid From The King

Solomon does not stumble on a single one of her hard questions.

Every difficult question she brings gets a real answer.

This was the same wisdom God had promised him back at Gibeon.

The gift he asked for in chapter three is now on full display.

🧠 Solomon answered every question
✅ Nothing stumped him at all
🙏 This wisdom was God's gift from Gibeon
📖 Chapter three's promise is now visible

---

# FirstKingsTen 10:4-9
# 😮 There Was No More Spirit In Her
---
## 🏛️ All Solomon's Wisdom, And The House That He Had Built

The queen came to test Solomon's mind, not just tour his buildings.

What she finds overwhelms her on both fronts at once.

His wisdom matched every hard question.

His palace matched every rumor she had heard.

Two different kinds of greatness stood confirmed in front of her.

🏛️ She tested wisdom and buildings
🧠 His wisdom passed every test
🏗️ His palace matched the rumors
📖 Two kinds of greatness, both proven

---

## 👥 The Sitting Of His Servants, And The Attendance Of His Ministers

"Attendance" here means how organized and ready his officials were, not simply that they showed up.

A royal court in disorder was common in the ancient world.

Solomon's court ran with visible structure and discipline.

That order impressed her as much as any single treasure.

👥 Attendance means organized readiness
🌍 Disorder was common elsewhere
🏛️ Solomon's court ran smoothly
📖 Order impressed her like treasure did

---

## 😮 There Was No More Spirit In Her

This phrase does not mean she fainted or lost consciousness.

It is an old way of describing being completely overwhelmed.

Every question she asked had already been proven true.

She simply had no words left to respond with.

😮 No more spirit means overwhelmed
🚫 Not a literal fainting
✅ Every claim proved true
📖 She ran out of words

---

## 📣 The Half Was Not Told Me

The queen admits that the reports she heard were actually too modest.

Reputation alone had not prepared her for what she found in person.

This phrase has since become a common saying about exceeded expectations.

Reality here outran even the most impressive rumor.

📣 Reports had understated the truth
👑 Reality outran the rumor itself
🗣️ The phrase became a common saying
📖 Solomon exceeded even the highest expectations

---

## 🙌 Blessed Be The LORD Thy God

A foreign queen from a distant land praises Israel's God by name.

She does not credit Solomon's skill alone for what she witnessed.

This kind of praise from an outsider was rare in the Old Testament.

Her words point straight past the king to the God who placed him there.

🙌 A foreign queen praises the LORD
🌍 This kind of praise was rare
👑 She looks past Solomon himself
📖 Credit goes to God, not skill

---

## ⚖️ To Do Judgment And Justice

The queen names the actual purpose behind Solomon's throne.

A king was never meant to rule for personal glory alone.

"Judgment and justice" means fair rulings and honest treatment for his people.

Her words describe exactly what Solomon asked God for back in chapter three.

⚖️ Judgment and justice means fair rule
👑 Kingship was never about personal glory
🙏 This echoes Solomon's request in chapter three
📖 Her praise names his true purpose

---

# FirstKingsTen 10:10-13
# 🎁 Gifts Exchanged Between Two Kingdoms
---
## 💰 An Hundred And Twenty Talents Of Gold

A talent was a unit of weight, close to seventy five pounds.

One hundred twenty talents comes out to around nine thousand pounds of gold.

This is the exact same amount Hiram already sent Solomon back in chapter nine.

Two different rulers, on two different occasions, chose the very same number.

💰 A talent weighed about seventy five pounds
⚖️ The total was around nine thousand pounds
🔁 Hiram sent this same amount before
📖 Two rulers, one striking coincidence

---

## 🌿 There Came No More Such Abundance Of Spices

The text says plainly that no gift like this ever arrived again.

This was not just a large gift, it was the largest on record.

Sheba's queen set a standard nobody else ever matched.

Her generosity became the benchmark for every gift that followed.

🌿 No later gift matched this one
🏆 This spice gift was the largest ever
👑 The queen set the standard
📖 Generosity here became the benchmark

---

## 🌳 The Navy Also Of Hiram... Great Plenty Of Almug Trees

"Almug" trees are likely a type of sandalwood imported from the Ophir region.

Hiram's ships brought this rare wood alongside gold and precious stones.

Wood this fine was worth shipping across long ocean distances.

This detail shows Solomon's building projects depended on far reaching trade.

🌳 Almug trees were likely rare sandalwood
🚢 Hiram's navy carried it from Ophir
💎 Fine wood was worth shipping far
📖 Trade fueled Solomon's building projects

---

## 🎶 Pillars For The House Of The LORD... Harps Also And Psalteries

The rare wood was not simply stored away as a trophy.

Some became pillars supporting the temple and the palace.

The rest became musical instruments for temple worship.

A single import served both construction and worship at once.

🎶 Rare wood served two purposes
🛕 Some became temple pillars
🎵 Some became harps and psalteries
📖 One import served building and worship

---

## 🤝 Solomon Gave Unto The Queen Of Sheba All Her Desire

Solomon does not simply accept her gifts and send her home.

He gives back whatever she asked for, beyond his usual custom.

"Royal bounty" means gifts given freely, beyond what any exchange required.

This meeting ends as a genuine exchange between equals, not one sided.

🤝 Solomon gave generously in return
🎁 He met every request she made
👑 Royal bounty means freely given gifts
📖 This was an exchange, not one sided giving

---

# FirstKingsTen 10:14-17
# 💰 The Weight Of Gold That Came To Solomon
---
## 🔢 Six Hundred Threescore And Six Talents Of Gold

"Threescore" is an old way of saying sixty.

Six hundred, plus sixty, plus six equals six hundred sixty six talents.

At about seventy five pounds per talent, that is close to fifty thousand pounds of gold.

This was Solomon's income in a single year alone.

🔢 Threescore means sixty
➕ The total equals six hundred sixty six talents
⚖️ That is close to fifty thousand pounds
📖 All of this arrived in one year

---

## 🐫 Of The Merchantmen, And Of The Traffick Of The Spice Merchants

The queen of Sheba's gift was only one source of Solomon's wealth.

Traveling merchants paid fees or taxes to trade through his territory.

Spice caravans and regional governors added even more income on top.

Solomon's gold came from many directions, not one single gift.

🐫 Merchants paid to trade through his land
🌿 Spice caravans added more income
👑 Governors contributed as well
📖 Wealth came from many directions

---

## 🛡️ Two Hundred Targets Of Beaten Gold

A "target" here means a large ceremonial shield, not something thrown.

"Beaten" gold means gold hammered thin and shaped by hand.

Six hundred shekels went into each one, close to fifteen pounds of gold apiece.

These shields were built to display wealth, not for battle.

🛡️ Target means a large ceremonial shield
🔨 Beaten means hammered by hand
⚖️ Held close to fifteen pounds of gold
📖 These shields displayed wealth, not war

---

## 🛡️ Three Hundred Shields Of Beaten Gold

These smaller shields used only three pounds of gold each.

That is about five times less gold than the large targets.

Even the smaller shields were kept in a place of honor.

Every shield in this room announced the same message, endless wealth.

🛡️ Smaller shields still cost real gold
⚖️ About five times less than the targets
🏛️ Both kinds were kept on display
📖 Every shield announced endless wealth

---

## 🏛️ The House Of The Forest Of Lebanon

This is not an actual forest despite the name.

It was a large hall built with rows of cedar pillars.

The cedar pillars resembled a forest, which is where the name came from.

This building stored weapons, treasure, and royal display pieces like these shields.

🏛️ Not a real forest at all
🌲 Named for its rows of cedar pillars
🗄️ It stored weapons and treasure
📖 The shields were kept in this hall

---

# FirstKingsTen 10:18-20
# 🦁 A Great Throne Of Ivory
---
## 🦁 A Great Throne Of Ivory, And Overlaid It With The Best Gold

Ivory came from elephant tusks, an extremely expensive material in this era.

Combining ivory with the finest gold made this throne one of a kind.

A throne this costly was never meant to be practical furniture.

It was meant to announce the power of the man sitting on it.

🦁 Ivory came from elephant tusks
💎 One of a kind with gold
👑 The throne was never just furniture
📖 It announced the power of the king

---

## 🪜 The Throne Had Six Steps

Climbing six steps to reach the throne set the king physically above everyone else.

Height in the ancient world often symbolized authority.

A visitor had to look up at Solomon the entire approach.

The design itself preached a message before Solomon ever spoke.

🪜 Six steps raised the king up
👁️ Height symbolized authority
🚶 Visitors looked up the whole approach
📖 The design spoke before Solomon did

---

## 🦁 Two Lions Stood Beside The Stays

"Stays" here means the armrests built into the sides of the throne.

Lions were a common ancient symbol of royal strength.

Two carved lions guarded the king's own hands as he sat.

Even small details on this throne carried royal meaning.

🦁 Stays means the throne's armrests
💪 Lions symbolized royal strength
🛡️ Lions guarded the king's hands
📖 Even small details carried meaning

---

## 🦁 Twelve Lions Stood There On The One Side And On The Other

Twelve lions lined the six steps, two standing guard on each one.

The number twelve likely echoes the twelve tribes of Israel.

No other structure like this existed among Israel's neighboring kingdoms.

The throne visually connected Solomon's reign to the whole nation he ruled.

🦁 Twelve lions lined the six steps
🇮🇱 Twelve likely echoes Israel's tribes
🌍 No neighboring kingdom had one like it
📖 The throne visually connected Solomon to his nation

---

## 🏆 There Was Not The Like Made In Any Kingdom

The text steps back here to make one final comparison.

No other king anywhere had a throne to match this one.

This was not exaggeration for effect.

It was a genuine claim of uniqueness.

Solomon's wisdom already stood unmatched, and now his craftsmanship did too.

🏆 No kingdom had a throne like it
👑 The claim was not exaggeration
🧠 His wisdom was already unmatched
📖 Now his craftsmanship matched his wisdom

---

# FirstKingsTen 10:21-22
# ⚓ Silver Was Nothing Accounted Of
---
## 🥂 All King Solomon's Drinking Vessels Were Of Gold

Even everyday cups and vessels in the palace were made of gold.

Nothing common or ordinary sat on Solomon's table.

This was not one dramatic display, it was the daily normal.

Wealth this constant said more than any single gift ever could.

🥂 Even daily cups were gold
🏛️ Nothing ordinary sat on his table
📆 This wealth was constant, not occasional
📖 Constant wealth spoke louder than one gift

---

## 🪙 It Was Nothing Accounted Of In The Days Of Solomon

Silver still had real value everywhere else in the ancient world.

In Solomon's kingdom, silver had lost its shine from sheer abundance.

This detail is not a boast about waste.

It is a measure of just how much gold had entered the kingdom.

🪙 Silver kept value everywhere else
👑 Only in Solomon's kingdom did it lose value
📏 This measures the scale of his gold
📖 Abundance changed what counted as valuable

---

## ⚓ A Navy Of Tharshish With The Navy Of Hiram

"Tharshish" likely refers to a distant seafaring destination, not one fixed city.

Some scholars connect it to Spain, others to a general type of ocean going ship.

Either way, the name signals long distance ocean travel.

These ships were built for voyages far beyond nearby coastal waters.

⚓ Tharshish signals long ocean voyages
🗺️ Its exact location is debated
🚢 Ships were built for distant travel
📖 This fleet reached far beyond nearby coasts

---

## 📆 Once In Three Years Came The Navy

A three year round trip shows just how far these ships traveled.

Ancient ships depended on seasonal winds, not fixed schedules.

A journey this long meant Solomon planned for the very long term.

Patience like this points to serious, sustained wealth, not a lucky gift.

📆 Three years shows a very long voyage
🌬️ Ships depended on seasonal winds
⏳ Solomon planned on a long timeline
📖 Sustained wealth, not a lucky gift

---

## 🦚 Bringing Gold, And Silver, Ivory, And Apes, And Peacocks

This cargo list points to places far beyond the Mediterranean world.

Apes and peacocks were not native anywhere near Israel.

Some scholars connect these imports to India or East Africa.

Solomon's trade network reached further than most readers assume.

🦚 Apes and peacocks were exotic imports
🗺️ Neither animal was native near Israel
🌍 Scholars point toward India or East Africa
📖 Solomon's trade reached further than expected

---

# FirstKingsTen 10:23-25
# 🌍 Solomon Exceeded All The Kings Of The Earth
---
## 🌍 Exceeded All The Kings Of The Earth For Riches And For Wisdom

The chapter now steps back to summarize everything shown so far.

No single king anywhere combined this much wealth with this much wisdom.

The two qualities are named together on purpose, not separately.

Solomon's reign is presented as unmatched on both fronts at once.

🌍 No king matched both qualities
💰 Riches and wisdom are named together
🧠 The pairing is intentional
📖 Solomon stood unmatched on both fronts

---

## 👑 All The Earth Sought To Solomon, To Hear His Wisdom

The queen of Sheba was not a rare exception.

Rulers from many nations made the same kind of journey she did.

"All the earth" is a common way of describing wide international attention.

Solomon's court had become a destination, not just a local government.

👑 The queen was not an exception
🌍 Many nations made similar journeys
🗣️ All the earth means wide attention
📖 Solomon's court became a destination

---

## 🙏 Which God Had Put In His Heart

This phrase returns to the source of Solomon's wisdom one more time.

It did not come from natural talent or years of study alone.

God placed it there, the same way He promised back in chapter three.

The chapter never lets the reader forget where the wisdom actually came from.

🙏 Wisdom came from God, not talent alone
📜 This echoes the promise in chapter three
🧠 The source is named again here
📖 The chapter keeps crediting God, not Solomon

---

## 📅 They Brought Every Man His Present... A Rate Year By Year

What began as occasional gifts becomes an expected yearly pattern.

"A rate" here means a fixed, recurring tribute, not a one time gesture.

Visiting kings settled into a routine of honoring Solomon regularly.

Sustained tribute like this reveals lasting influence, not a passing trend.

📅 Gifts became a yearly pattern
💰 A rate means fixed recurring tribute
👑 Kings honored Solomon on a routine
📖 Lasting influence, not a passing trend

---

# FirstKingsTen 10:26-29
# 🐎 Chariots, Horses, And Trade With Egypt
---
## 🐎 A Thousand And Four Hundred Chariots, And Twelve Thousand Horsemen

This is a massive standing military force for a kingdom at peace.

Solomon was not actively fighting wars during most of his reign.

A force this size was about projecting strength, not fighting battles.

Numbers alone could keep rival nations from testing Israel's borders.

🐎 A massive force for a kingdom at peace
🕊️ Solomon fought few active wars
💪 The force projected strength, not battle
📖 Strength alone discouraged rival nations

---

## 🪨 Made Silver To Be In Jerusalem As Stones

This is a figure of speech, not a literal description of the streets.

It means silver had become as common in the city as ordinary rocks.

The same idiom appears again later in Second Chronicles.

Wealth this extreme needed an exaggerated picture to be believable at all.

🪨 A figure of speech, not literal streets
🪙 Silver became as common as stone
📜 The same idiom appears again later
📖 Extreme wealth needed an extreme picture

---

## 🐴 Solomon Had Horses Brought Out Of Egypt

This detail sounds impressive at first.

It also carries a warning underneath.

Deuteronomy seventeen specifically told Israel's future kings not to multiply horses from Egypt.

That command was meant to stop kings from depending on Egypt instead of God.

Solomon's own success is quietly breaking a rule written just for him.

🐴 Horses came directly from Egypt
📜 Deuteronomy seventeen warned against this
⚠️ The command protected trust in God
📖 Solomon is quietly breaking his own rule

---

## 💼 The King's Merchants Received The Linen Yarn At A Price

Solomon's merchants operated as official royal traders, not private businessmen.

They bought goods like linen yarn directly through royal channels.

Trade at this level was controlled by the crown itself.

Commerce and kingship were tightly bound together under Solomon.

💼 Royal merchants traded on the king's behalf
🧵 Linen yarn came through royal channels
👑 The crown controlled major trade
📖 Commerce and kingship were tightly bound

---

## 🌍 For All The Kings Of The Hittites, And For The Kings Of Syria

Solomon was not simply importing horses and chariots for himself.

He resold them to neighboring kings at a markup.

This made Israel a hub for military trade across the whole region.

The same warning from Deuteronomy now stretches even further than before.

🌍 Solomon resold to neighboring kings
💰 He profited from the markup
🗺️ Israel became a regional trade hub
📖 The Egypt warning now stretches even further
`.trim();

export const FIRST_KINGS_TEN_PERSONAL_SECTIONS = parseFirstKingsTenRawNotes(FIRST_KINGS_TEN_RAW_NOTES);
