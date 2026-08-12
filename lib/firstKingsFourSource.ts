export type FirstKingsFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsFourRawNotes(rawText: string): FirstKingsFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsFour\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsFour\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsFour\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 4:${startVerse}` : `1 Kings 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Kings 4 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_FOUR_RAW_NOTES = `# FirstKingsFour 4:1-6
# 👑 Solomon's Royal Cabinet
---
## 👑 So King Solomon Was King Over All Israel

This line marks a real turning point in the story.

Two earlier chapters showed rivals fighting for this exact throne.

Now the throne is settled and no rival remains.

A united, secure kingdom is the setting for the rest of this chapter.

👑 Solomon's reign now stands unopposed

⚔️ Two chapters of rivalry just ended

🏛️ The kingdom is fully united

📖 Peace here sets up this whole chapter

## 🏛️ These Were The Princes Which He Had

"Princes" here does not mean royal sons or heirs.

It means the top officials running the kingdom for the king.

Think of it as an ancient version of a cabinet of ministers.

Each one held real responsibility over one part of the government.

This list introduces the team that kept Israel running smoothly.

🏛️ Princes means top officials, not sons

📋 They ran the kingdom for Solomon

🤝 Think of them as royal cabinet ministers

📖 This list introduces Solomon's whole team

## 🙏 Azariah The Son Of Zadok The Priest

Zadok was the priest who anointed Solomon king back in chapter one.

God had already promised that Zadok's family would serve as priests permanently.

Azariah is Zadok's son, now carrying that same priesthood forward.

One faithful choice in chapter one is still paying off here.

🙏 Zadok anointed Solomon back in chapter one

📜 God promised Zadok's line the priesthood

👨‍👦 Azariah is Zadok's son and successor

📖 Faithfulness in chapter one still pays off

## ✍️ The Sons Of Shisha, Scribes

A "scribe" was a trained writer who kept the king's official records.

Elihoreph and Ahiah held this job together for Solomon's growing government.

Every law, letter, and decision needed someone to write it down correctly.

Nothing about running a kingdom this size could stay only spoken word.

✍️ Scribe means a trained royal record keeper

📝 Elihoreph and Ahiah shared this role

📜 Every law and decision needed writing down

📖 A growing kingdom needed careful written records

## 📚 Jehoshaphat The Son Of Ahilud, The Recorder

A "recorder" kept the official history of everything that happened in the kingdom.

Jehoshaphat held this same position earlier under King David.

His experience carried straight over into Solomon's new government.

Continuity like this kept the kingdom stable during a change of kings.

📚 Recorder means keeper of the kingdom's official history

🔁 Jehoshaphat held this role under David too

🏛️ His experience helped the new government

📖 Continuity kept the kingdom stable through the change

## ⚔️ Benaiah The Son Of Jehoiada Was Over The Host

Benaiah already proved his loyalty by carrying out Solomon's hardest orders in chapter two.

Now he receives the reward for that loyalty, command of the entire army.

"Host" is an old word for the army or armed forces.

Solomon replaced Joab, a rival commander, with a man he could fully trust.

⚔️ Benaiah proved loyal back in chapter two

🎖️ He now commands the entire army

🪖 Host is an old word for army

📖 Solomon rewarded loyalty with real power

## 📛 Zadok And Abiathar Were The Priests

This sounds like both men still served as active priests together.

Chapter two already showed Abiathar banished from the priesthood for backing the wrong king.

Many scholars believe this list reflects an earlier point in Solomon's reign.

Old titles sometimes stayed attached to a record even after circumstances changed.

📛 Both names appear here together

🚫 Abiathar was already banished in chapter two

📜 This list may reflect an earlier moment

📖 Records did not always match the latest events

## 🔀 Azariah The Son Of Nathan Was Over The Officers

This is a different Azariah than the priest named back in verse two.

Azariah was actually a common name in Israel at this time.

This Azariah oversaw the twelve regional officers described later in the chapter.

He served as the link between Solomon and the whole country's supply system.

🔀 A different Azariah than verse two

📛 Azariah was a common name then

🗺️ He oversaw the twelve regional officers

📖 He linked Solomon to the whole nation's supply

## 🤝 Principal Officer, And The King's Friend

"The king's friend" was a real, official title, not just a close relationship.

It named one trusted advisor with private access to the king at any time.

King David had this same position filled by a man named Hushai.

Zabud was Nathan's son, giving him a family tie to the prophet who once corrected David.

🤝 King's friend was a real title

🔑 It meant private access to the king

👑 David had this same position too

📖 Zabud's family already had a prophet's legacy

## 🏰 Ahishar Was Over The Household

Ahishar managed the daily operations of Solomon's entire palace.

That included the staff, the supplies, and the needs of the royal family.

He worked like a modern chief of staff runs an office today.

A kingdom this large needed someone managing its home base, not just its army.

🏰 Ahishar ran the whole royal palace

📦 He managed staff and daily supplies

🗂️ He worked like a modern chief of staff

📖 Great kingdoms still need a well run home

## 💰 Adoniram The Son Of Abda Was Over The Tribute

"Tribute" here means forced labor and taxes owed to the king.

Adoniram was the officer responsible for collecting that heavy burden from the people.

This same man appears again many years later under King Rehoboam.

That later appearance ends in his death, and it helps split the kingdom in two.

💰 Tribute means forced labor and taxes

📋 Adoniram collected this burden from the people

⚠️ He reappears later under King Rehoboam

📖 That later moment helps split the kingdom

# FirstKingsFour 4:7-11
# 🗺️ The Twelve Districts Begin
---
## 🗺️ Twelve Officers Over All Israel

Solomon divided the whole kingdom into twelve supply districts.

Each district had its own officer in charge of feeding the royal court.

This system spread the cost of running the kingdom across the entire nation.

No single region had to carry the whole burden alone.

🗺️ Solomon split Israel into twelve districts

🍽️ Each district fed the royal court

⚖️ The cost was spread across the nation

📖 This kept any one region from being crushed

## 📅 Each Man His Month In A Year Made Provision

The twelve officers did not all serve at the same time.

Each one took responsibility for exactly one month out of the year.

This rotation meant the palace always had fresh supplies coming in.

It also meant no district faced the burden all year long.

📅 Each officer served one month a year

🔄 The duty rotated through all twelve

🥗 Fresh supplies kept arriving all year

📖 No district bore the load year round

## 👤 The Son Of Hur, In Mount Ephraim

This officer is never given a personal name of his own.

He is only identified as the son of Hur.

Ancient records often listed officials this way, by family line instead of first name.

Mount Ephraim was the hill country home to the tribe of Ephraim.

👤 No personal name is given here

👨‍👦 He is named only as Hur's son

📜 Ancient lists often worked this way

📖 Mount Ephraim was Ephraim's tribal hill country

## ☀️ In Makaz, And In Shaalbim, And Bethshemesh, And Elonbethhanan

"Bethshemesh" means house of the sun, a city with a long history.

It was the very place the ark of the covenant first arrived after the Philistines gave it back.

These towns sat inside the district assigned to the son of Dekar.

A once famous battlefield or holy site could also just be someone's tax district.

☀️ Bethshemesh means house of the sun

📦 The ark once returned to this city

🗺️ These towns formed one officer's district

📖 Famous places still needed ordinary daily upkeep

## 🏘️ To Him Pertained Sochoh, And All The Land Of Hepher

"Pertained" is an old way of saying a place belonged to or fell under someone.

Sochoh and the land of Hepher both fell under this officer's district.

The son of Hesed managed this territory out of the town of Aruboth.

Every town in Israel belonged to someone's assigned supply district.

🏘️ Pertained means it belonged under him

🗺️ Sochoh and Hepher were his district

🏠 Aruboth was his home base

📖 Every town belonged to some district

## 💍 Taphath The Daughter Of Solomon To Wife

This officer did not just work for Solomon, he married into the family.

Taphath was Solomon's own daughter, given to him as a wife.

Marrying a royal daughter tied this officer's loyalty directly to the throne.

A district officer with a royal wife had every reason to stay faithful.

💍 This officer married Solomon's own daughter

👑 Taphath was a true princess

🤝 Marriage secured his loyalty to the throne

📖 Family ties reinforced political loyalty

# FirstKingsFour 4:12-19
# 🏔️ Districts Across The Land
---
## ⚔️ Taanach And Megiddo

Megiddo was one of the most fought over cities in the ancient world.

Armies crossed this valley again and again because every major trade route ran through it.

Revelation later borrows this city's name for Armageddon, the final battle.

Here it simply appears as one officer's peaceful supply district.

⚔️ Megiddo saw countless ancient battles

🛣️ Major trade routes ran right through it

🔥 Revelation later names Armageddon after this city

📖 A battle scarred city became a quiet district

## 🌾 Which Is By Zartanah Beneath Jezreel

Jezreel was a wide, fertile valley that cut straight through the middle of Israel.

Zartanah was a smaller town used here as a landmark near that valley.

Naming a small town next to a famous valley pins down the exact location.

Ancient readers needed real landmarks the same way people use street names today.

🌾 Jezreel was a wide fertile valley

📍 Zartanah marked a spot nearby

🗺️ Landmarks pinned down the district's location

📖 Ancient directions worked like modern street names

## 🔢 Threescore Great Cities With Walls And Brasen Bars

"Threescore" is an old way of counting by twenties, and it means sixty.

"Brasen bars" were heavy bronze bars used to lock a city's gates shut.

This region called Argob had sixty fortified cities in one small area.

These same cities are described being conquered generations earlier in the book of Deuteronomy.

🔢 Threescore means the number sixty

🚪 Brasen bars locked the city gates

🏰 Sixty fortified cities in one region

📖 Deuteronomy already told the story of Argob's conquest

## 🗡️ The Towns Of Jair The Son Of Manasseh

Jair was a conqueror from generations earlier, back in the time of Moses.

He captured a cluster of towns in Gilead and named them after himself.

Those towns still carried his name here, long after he had died.

One man's conquest left a mark on the map for generations.

🗡️ Jair conquered these towns long ago

👤 The towns still carried his name

📜 This happened back in the time of Moses

📖 One conquest left a lasting mark

## 😇 Ahinadab The Son Of Iddo Had Mahanaim

Mahanaim already carries real history by this point in the Bible.

Jacob met a company of angels there on his way back home.

Years later David hid there while fleeing his own son Absalom.

Now the same city appears simply as a peaceful supply district.

😇 Jacob once met angels at Mahanaim

🏃 David hid there fleeing Absalom

🕊️ Now it is a peaceful district

📖 This once troubled city now sits at peace

## 💍 He Also Took Basmath The Daughter Of Solomon To Wife

This is the second officer in this chapter to marry one of Solomon's daughters.

Basmath was given to Ahimaaz the same way Taphath was given earlier to another officer.

Solomon used marriage as a tool to bind his officers to the throne.

A pattern repeated on purpose is never just a coincidence.

💍 A second officer marries Solomon's daughter

🔁 This matches the pattern seen with Taphath

🤝 Marriage bound officers to the throne

📖 A repeated pattern is never an accident

## ⚔️ The Country Of Sihon King Of The Amorites, And Of Og King Of Bashan

Sihon and Og were two Amorite kings defeated generations earlier under Moses.

Israel took their land east of the Jordan River after those victories.

This verse simply names that old battlefield as Geber's peaceful district now.

A promise won in war became a home lived in during peace.

⚔️ Sihon and Og were defeated under Moses

🗺️ Israel took their land east of the Jordan

🏡 It is now a peaceful district

📖 A battlefield became a home in peace

## 🧭 He Was The Only Officer Which Was In The Land

Every other officer in this list is paired with a clear home region.

Geber alone is described as the only officer covering his entire territory.

His district sat on the far eastern edge, a frontier area needing careful control.

Solomon trusted one man alone with the responsibility other regions split between many.

🧭 Geber alone ran his whole district

🗺️ His territory sat on the frontier

🛡️ Frontier land needed careful control

📖 Solomon trusted him with a heavier load

# FirstKingsFour 4:20-24
# 🍇 Boundless And At Peace
---
## 🏖️ As The Sand Which Is By The Sea In Multitude

God promised Abraham that his descendants would be as many as the sand by the sea.

This verse shows that exact promise coming true generations later.

Judah and Israel were now too many to count, just as God had said.

A promise made to one man had grown into an entire nation.

🏖️ Sand by the sea means uncountable

📜 God promised this to Abraham

✅ The promise came true here

📖 One man's promise became a whole nation

## 🌊 From The River Unto The Land Of The Philistines, And Unto The Border Of Egypt

"The river" almost always means the Euphrates River in the Old Testament.

God had promised Abraham a kingdom stretching from that river all the way to Egypt.

Solomon's kingdom now reached that exact promised border.

A promise spoken to Abraham centuries earlier became a real map under Solomon.

🌊 The river means the Euphrates

📜 God promised Abraham this exact land

🗺️ Solomon's kingdom reached that full border

📖 An old promise became a real map

## 🎁 They Brought Presents, And Served Solomon All The Days Of His Life

These "presents" were not friendly gifts, they were required tribute payments.

Surrounding kingdoms paid Solomon to avoid conflict and stay in his favor.

This tribute continued for Solomon's entire reign, not just one season.

Steady tribute from other nations showed just how far Solomon's power reached.

🎁 Presents here means required tribute

🤝 Nations paid to stay in favor

📆 It continued through Solomon's whole reign

📖 Steady tribute showed the reach of his power

## 🌾 Thirty Measures Of Fine Flour, And Threescore Measures Of Meal

A "measure" here was a large unit, enough to feed many people at once.

Fine flour was the expensive kind, reserved for the best bread on the table.

"Meal" was coarser and more common, used for everyday cooking.

Feeding this much flour and meal every single day shows a massive royal household.

🌾 A measure was a large food unit

🍞 Fine flour was the expensive kind

🥣 Meal was the common everyday kind

📖 This much food fed a massive household

## 🐂 Ten Fat Oxen, And Twenty Oxen Out Of The Pastures

These are not the same kind of animal listed twice.

"Fat" oxen were raised in a stall and fed specifically to be eaten.

The other oxen simply came straight from the open pasture.

The royal table served both the specially raised and the ordinary kind.

🐂 Fat oxen were raised just for food

🌿 Pasture oxen came from open grazing

🍽️ Both kinds fed the royal table

📖 Even meat had two separate quality levels

## 🦌 Beside Harts, And Roebucks, And Fallowdeer, And Fatted Fowl

"Harts" and "roebucks" are old English names for kinds of deer.

"Fallowdeer" is another deer variety with a lighter, spotted coat.

"Fatted fowl" means birds deliberately fed up before being served.

Solomon's table included both farmed meat and hunted wild game.

🦌 Harts and roebucks were kinds of deer

🐾 Fallowdeer had a lighter spotted coat

🐔 Fatted fowl means deliberately fed birds

📖 Wild game and farmed meat both appeared

## 🌊 For He Had Dominion Over All The Region On This Side The River

"On this side the river" describes territory west of the Euphrates.

Solomon's rule reached every king and kingdom across that whole territory.

That is an enormous stretch of land for one king to control peacefully.

Political control this wide made room for the total peace described next.

🌊 This phrase means west of the Euphrates

👑 Solomon ruled every king across it

🗺️ This was an enormous territory

📖 Wide control made room for peace

## 🧭 From Tiphsah Even To Azzah

Tiphsah sat far to the northeast, right on the Euphrates River.

Azzah, better known as Gaza, sat far to the southwest.

Naming these two far apart cities together means the entire territory between them.

It works the same way as saying coast to coast today.

🧭 Tiphsah sat in the far northeast

🏖️ Azzah, or Gaza, sat in the southwest

🗺️ Together they mean the whole territory

📖 It works like saying coast to coast

## 🕊️ He Had Peace On All Sides Round About Him

No enemy nation threatened Solomon's kingdom from any direction.

This peace made room for building, trade, wisdom, and worship instead of war.

Solomon's father David spent his whole reign fighting to secure this land.

Solomon simply got to enjoy what David's wars had won.

🕊️ No enemy threatened from any direction

🏗️ Peace made room for building and trade

⚔️ David had fought to win this security

📖 Solomon inherited the peace David's wars secured

# FirstKingsFour 4:25-28
# 🐎 Safety, Strength, And Supply
---
## 🍇 Every Man Under His Vine And Under His Fig Tree

This phrase became a lasting symbol of peace and safety in the Bible.

It pictures a man sitting in his own yard, enjoying his own crops.

Nobody was raiding, drafting, or taxing that peace away.

Later prophets like Micah reuse this exact image to describe future peace.

🍇 Vine and fig tree means peace at home

🏡 A man safely enjoyed his own land

🚫 No one raided or taxed it away

📖 Prophets later borrowed this image of peace

## 🧭 From Dan Even To Beersheba

Dan sat at the far northern edge of Israel.

Beersheba sat at the far southern edge.

Naming both cities together means the entire land, end to end.

Both ends of the country lived in the same safety.

🧭 Dan marked the far north

🏜️ Beersheba marked the far south

🗺️ Together they mean the whole land

📖 Every corner shared the same safety

## 🐎 Forty Thousand Stalls Of Horses For His Chariots, And Twelve Thousand Horsemen

This is a massive military force for any ancient kingdom to maintain.

Chariots and cavalry were the most advanced weapons of that entire era.

An earlier law in Deuteronomy actually warned Israel's future kings against gathering too many horses.

This impressive number carries a quiet warning sign underneath the achievement.

🐎 Forty thousand stalls held chariot horses

🛡️ Chariots were the era's top weapon

⚠️ Deuteronomy warned kings against too many horses

📖 An impressive number hid a quiet warning

## 🍽️ They Lacked Nothing

This is the payoff of the twelve district system explained earlier in the chapter.

Every guest at Solomon's table was fully provided for, every single month.

A well run system does its job so quietly that nobody even notices it.

The best organization is the kind nobody has to think about.

🍽️ Every guest was fully provided for

📋 This proves the district system worked

🤫 Good systems run quietly in the background

📖 Nobody had to think about it working

## 🐫 Barley Also And Straw For The Horses And Dromedaries

"Dromedaries" are a fast breed of camel with a single hump.

They were used for quick travel and carrying urgent messages.

Feeding animals was just as much a part of the job as feeding people.

Even the fastest camels in the kingdom depended on this same careful system.

🐫 Dromedaries were fast single humped camels

✉️ They carried urgent messages quickly

🌾 Animals needed feeding just like people

📖 Even the fastest camels relied on this system

# FirstKingsFour 4:29-34
# 🦉 Wisdom Beyond Compare
---
## 🙏 Wisdom And Understanding Exceeding Much, And Largeness Of Heart

Solomon asked God for wisdom back in chapter three, and God gave far more than asked.

"Understanding" means the ability to see deeply into a problem, not just know facts.

"Largeness of heart" describes a wide, capable mind able to handle many kinds of matters.

God answered that one prayer with three distinct gifts, not just one.

🙏 God exceeded Solomon's own request

🔍 Understanding means deep insight, not just facts

🧠 Largeness of heart means a wide capable mind

📖 One prayer received three separate gifts

## 🏖️ Even As The Sand That Is On The Sea Shore

This exact picture already described Israel's population earlier in this same chapter.

Here it describes something different, the size of Solomon's mind instead of a nation.

Both descriptions point back to the same promise God made to Abraham.

A promise about a people became a promise about wisdom too.

🏖️ Sand by the sea reused from verse twenty

🧠 Now it describes wisdom, not population

📜 Both echo God's promise to Abraham

📖 One image, two different kinds of blessing

## 🧭 The Wisdom Of All The Children Of The East Country

"Children of the east" was a phrase for the peoples living east of Israel.

That region, including Arabia and Mesopotamia, was famous for its own wise teachers.

Job, from that same region, is even called a great man of the east.

Solomon is being measured against genuinely wise rivals, not weak ones.

🧭 Children of the east means eastern peoples

📚 That region had its own famous teachers

📜 Job also came from that same region

📖 Solomon was measured against real wisdom

## 🏛️ And All The Wisdom Of Egypt

Egypt was the ancient world's leading center of learning and science.

Its scholars were famous for medicine, mathematics, and building enormous monuments.

Comparing Solomon favorably to Egypt was comparing him to the top of the ancient world.

This was not a small compliment, it was the highest possible comparison available.

🏛️ Egypt led the ancient world in learning

🔬 Its scholars knew medicine and mathematics

🏗️ Egypt built the era's greatest monuments

📖 This comparison set the highest possible bar

## 👤 Ethan The Ezrahite, And Heman, And Chalcol, And Darda

These four men were real, well known wise men of that time.

Naming specific rivals made Solomon's claim to wisdom something people could actually check.

Two of these same names, Ethan and Heman, appear in the headings of Psalms.

Solomon was not just praised in vague terms, he beat named, respected experts.

👤 These were four real named wise men

✅ Naming rivals made the claim checkable

🎵 Ethan and Heman appear in Psalm headings

📖 Solomon beat named, respected experts

## 🌍 His Fame Was In All Nations Round About

Word of Solomon's wisdom did not stay inside Israel's own borders.

Foreign nations heard about it and began paying attention.

This detail quietly sets up the famous visit from the Queen of Sheba later on.

A gift given privately in chapter three became a public reputation here.

🌍 Fame spread far beyond Israel's borders

👂 Foreign nations heard about Solomon

👑 This sets up the Queen of Sheba's visit

📖 A private gift became a public reputation

## 📚 He Spake Three Thousand Proverbs

Solomon is the traditional author connected to the book of Proverbs in the Bible.

Only a small fraction of his three thousand proverbs actually made it into scripture.

Most of what Solomon ever said has simply been lost to history.

What survives is only a sample of a much larger body of wisdom.

📚 Solomon is linked to the book of Proverbs

🔢 Three thousand proverbs is a massive number

🗃️ Only a small fraction survives in scripture

📖 What remains is only a small sample

## 🎶 His Songs Were A Thousand And Five

Solomon is also connected to the Song of Solomon and several Psalms.

A thousand and five songs is an enormous personal output for one man.

Just like his proverbs, only a small piece of this work survived.

Solomon's gifts reached into poetry and music, not just practical advice.

🎶 Solomon wrote over a thousand songs

📜 He is linked to Song of Solomon

🗑️ Most of this work did not survive

📖 His wisdom included poetry and music too

## 🌲 From The Cedar Tree That Is In Lebanon Even Unto The Hyssop

The cedar of Lebanon was one of the tallest, most valuable trees in the ancient world.

"Hyssop" was a small, common plant that grew out of cracks in stone walls.

Naming the biggest tree and the smallest plant together means Solomon studied all of nature.

Nothing in the plant world was too small to interest him.

🌲 The cedar was the tallest, grandest tree

🌿 Hyssop was a tiny wall growing plant

📏 Together they mean the biggest to the smallest

📖 Nothing in nature was too small to study

## 🦁 Of Beasts, And Of Fowl, And Of Creeping Things, And Of Fishes

Solomon's knowledge did not stop at plants, it covered every kind of animal too.

This list covers land animals, birds, small crawling creatures, and fish, every category at once.

He studied creation the way a modern scientist studies biology.

God's gift of wisdom reached into the whole natural world, not just royal decisions.

🦁 Beasts means land animals of every kind

🐦 Fowl means birds of every kind

🐟 Fishes covered life in the water too

📖 Wisdom reached the whole natural world

## 🚶 There Came Of All People To Hear The Wisdom Of Solomon

Visitors did not just hear about Solomon's wisdom secondhand.

They traveled to Israel themselves to hear it in person.

Even kings from other nations sent people to witness it directly.

This chapter ends by pointing straight toward the visits and stories still to come.

🚶 Visitors traveled to hear Solomon directly

👑 Even foreign kings sent representatives

🌍 His reputation reached the whole earth

📖 This sets up the chapters still ahead`.trim();

export const FIRST_KINGS_FOUR_PERSONAL_SECTIONS = parseFirstKingsFourRawNotes(FIRST_KINGS_FOUR_RAW_NOTES);
