export type FirstChroniclesNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesNineRawNotes(rawText: string): FirstChroniclesNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 9:${startVerse}` : `1 Chronicles 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 1 Chronicles 9 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_NINE_RAW_NOTES = `# FirstChronicles 9:1-3
# 📜 All Israel Comes Home
---
## 📚 So All Israel Were Reckoned By Genealogies

"Reckoned" means officially counted and recorded by family line.

Eight whole chapters before this one did exactly that work.

Every genealogy from Adam to the tribes led here.

This record decided who truly belonged to Israel's family.

📚 Reckoned means counted and recorded

🌳 Eight chapters built this family tree

🆔 The record proved who belonged

📖 Belonging mattered as much as blood

## 📕 Written In The Book Of The Kings Of Israel And Judah

This book is not the Bible book of Kings.

It was a separate royal record that no longer survives.

Ancient kings kept official court chronicles alongside their scribes.

Chronicles itself likely drew from records exactly like this one.

📕 A lost royal record, not our Bible book

✍️ Kings kept official court chronicles

🗄️ This one no longer survives

📖 Chronicles likely drew from records like it

## ⚖️ Carried Away To Babylon For Their Transgression

This is the hinge the whole book has been building toward.

Everything from Adam onward now lands on one hard fact.

Israel broke its covenant with God for centuries.

Babylon's conquest and exile were the consequence, not an accident.

⚖️ This verse is the book's hinge

📜 Centuries of covenant breaking led here

🏛️ Babylon's exile was a consequence

📖 Judgment followed generations of warning

## 🏠 The First Inhabitants That Dwelt In Their Possessions

"First inhabitants" means the very first wave to return from exile.

Persia's king Cyrus had issued a decree letting captives go home.

These are the families who took that offer and rebuilt Jerusalem.

Ezra and Nehemiah tell this same return story in more detail.

🏠 First inhabitants means the earliest returnees

👑 Cyrus of Persia allowed the return

🧱 They came home to rebuild Jerusalem

📖 Ezra and Nehemiah tell the fuller story

## 🏺 The Israelites, The Priests, The Levites, And The Nethinims

"Nethinims" means temple servants assigned to the lowest support work.

Joshua nine explains where this group first came from.

The Gibeonites tricked Israel into a treaty instead of conquest.

Their punishment became permanent service at the altar.

🏺 Nethinims means temple support servants

🤝 Joshua nine explains their origin

🏹 Gibeonites tricked Israel into a treaty

📖 A punishment became lasting temple service

# FirstChronicles 9:4-9
# 🏘️ Judah And Benjamin Settle In
---
## 🔗 Uthai The Son Of Ammihud, The Son Of Pharez The Son Of Judah

Six generations link Uthai straight back to Judah's son Pharez.

Pharez himself is remembered from a difficult story in Genesis thirty eight.

Naming that chain proves Uthai's family never lost its place in Judah.

A name list like this worked as a returning family's paperwork.

🔗 Six generations link Uthai to Pharez

👴 Pharez appears back in Genesis thirty eight

🪪 The chain proved Uthai's tribal identity

📖 Genealogies worked like ancient paperwork

## 👪 Of The Shilonites, Asaiah The Firstborn

"Shilonites" likely names a family connected to Shelah, one of Judah's sons.

Shelah is easy to confuse with the town Shiloh, but they are different.

Asaiah is simply named as this branch's oldest son.

Short entries like this still mark a real, remembered family.

👪 Shilonites likely traces to Shelah

🚫 Not the same as the town Shiloh

👶 Asaiah was this branch's firstborn

📖 Short entries still marked real families

## 👬 Of The Sons Of Zerah, Jeuel, And Their Brethren, Six Hundred And Ninety

Zerah was Pharez's twin brother, also a son of Judah.

Six hundred ninety men from just this one branch settled in Jerusalem.

That number shows how large and established Judah's tribe still was.

Exile had scattered Israel but had not erased its numbers.

👬 Zerah was Pharez's twin brother

🔢 Six hundred ninety men from one branch

🏙️ A large group resettled Jerusalem

📖 Exile did not erase Judah's numbers

## 🧍 Of The Sons Of Benjamin, Sallu, Ibneiah, Elah, And Meshullam

Four different men lead Benjamin's returning families in this list.

Each one carries his own chain of ancestors back several generations.

Benjamin and Judah were the two tribes that had stayed together in the southern kingdom.

That is exactly why both tribes appear first among the returnees.

🧍 Four men lead Benjamin's families

🔗 Each traces several generations back

🤝 Benjamin and Judah stayed together

📖 That explains why both return first

## 👑 All These Men Were Chief Of The Fathers In The House Of Their Fathers

"Chief of the fathers" means the recognized head of an extended family branch.

It is a title of leadership, not simply the oldest living relative.

Nine hundred fifty six men are counted under Benjamin's chiefs alone in verse nine.

Titles like this kept a growing, resettling community organized.

👑 Chief of the fathers means family leader

🚫 Not just the oldest relative

🔢 Nine hundred fifty six men counted here

📖 Titles kept a resettling people organized

# FirstChronicles 9:10-13
# 👑 The Priests Who Served In The House Of God
---
## 🗂️ Of The Priests, Jedaiah, And Jehoiarib, And Jachin

These three names represent entire priestly divisions, not just three men.

First Chronicles twenty four already organized the priesthood into twenty four courses.

Naming the lead figure here stands for his whole rotating division.

The exile could not be allowed to erase which family served which week.

🗂️ These names lead priestly divisions

🔄 Chronicles twenty four lists all the courses

👤 One name stood for a whole group

📖 Exile could not erase this order

## 🏛️ Azariah, The Ruler Of The House Of God

"Ruler of the house of God" is this chapter's title for the high priest.

Azariah's chain runs back through Zadok, the priest David trusted most.

It continues all the way to Aaron's grandson Ahitub.

Naming that whole chain proved Azariah's right to the highest office.

🏛️ This title means high priest

🔗 His line runs back through Zadok

👴 The chain reaches Aaron's grandson Ahitub

📖 Ancestry proved his right to serve

## 🧬 Maasiai The Son Of Adiel, The Son Of Immer

Immer was the ancestor behind one of the twenty four priestly courses.

His descendants are still traceable here, generations after the exile.

Small details like a father's name kept every priestly line provable.

Nothing about temple service could rest on an unverified claim.

🧬 Immer led one priestly course

📆 His line survived past the exile

📄 Names kept every claim provable

📖 Temple service demanded proven ancestry

## 🔢 A Thousand And Seven Hundred And Threescore, Very Able Men

"Threescore" is an old way of saying sixty.

The full count reaches one thousand seven hundred sixty priests.

"Very able men" means physically and spiritually fit for demanding temple work.

That is a large, functioning priesthood rebuilt after total collapse.

🔢 Threescore means sixty

➕ The total reaches 1,760 priests

💪 Able men means fit for the work

📖 A whole priesthood was rebuilt

# FirstChronicles 9:14-16
# 🎵 The Levites Of Merari And Asaph
---
## 👨‍👦 Shemaiah The Son Of Hasshub, Of The Sons Of Merari

Merari was one of Levi's three original sons, alongside Gershon and Kohath.

Merari's family had specific duties tied to the tabernacle's frame and structure.

Shemaiah's chain proves his branch of that same family survived the exile.

Every Levite family needed this same proof to reclaim its duties.

👨‍👦 Merari was one of Levi's three sons

🏗️ His family handled the tabernacle's structure

🔗 Shemaiah's chain proves his branch survived

📖 Every family needed the same proof

## 🎼 Mattaniah The Son Of Micah, The Son Of Asaph

Asaph was one of David's three chief musicians, named back in Chronicles six.

His descendants are still leading temple music generations later.

A gift for worship music could run in a family for centuries.

This line connects straight back to the choir David personally organized.

🎼 Asaph was one of David's chief musicians

🎤 His descendants still led temple music

🧬 Musical gifting ran in the family

📖 This links back to David's own choir

## 🏘️ That Dwelt In The Villages Of The Netophathites

"Netophathites" names people from Netophah, a small town near Bethlehem.

Not every Levite lived inside Jerusalem itself.

Some families settled in nearby villages and traveled in for their duties.

The temple's workforce reached well beyond the city's own walls.

🏘️ Netophathites means people from Netophah

📍 Netophah sat near Bethlehem

🚶 Some Levites traveled in from nearby

📖 Temple service reached beyond the city

# FirstChronicles 9:17-21
# 🚪 Gatekeepers At The King's Gate
---
## 🚪 And The Porters Were, Shallum, And Akkub, And Talmon, And Ahiman

"Porters" here means gatekeepers, not people carrying luggage.

These four men led the teams guarding the temple's entrances.

Shallum is named first because he held the senior post among them.

Guarding sacred space was treated as seriously as any priestly duty.

🚪 Porters means gatekeepers, not luggage carriers

🛡️ Four men led the guard teams

🥇 Shallum held the senior post

📖 Guarding the temple was a sacred duty

## ⏳ Who Hitherto Waited In The King's Gate Eastward

"Hitherto" means up until this very point in the record.

The king's gate eastward was the temple's main ceremonial entrance.

East facing gates carried extra importance across the ancient Near East.

The rising sun in the east made that direction feel like the place of honor.

⏳ Hitherto means up until now

🚪 The king's gate faced east

🌅 East held special ceremonial honor

📖 Sunrise linked that gate to honor

## ⚔️ The Korahites Were Over The Work Of The Service, Keepers Of The Gates

The Korahites descend from Korah, who led a deadly rebellion in Numbers sixteen.

Numbers twenty six already confirmed Korah's own sons did not die with him.

Generations later, that same surviving family now guards God's own house.

A family's worst moment did not get the final word on its future.

⚔️ Korah led a rebellion in Numbers sixteen

👨‍👦 His sons survived per Numbers twenty six

🚪 Their descendants now guard the temple

📖 A dark past did not define their future

## 🛡️ Phinehas The Son Of Eleazar Was The Ruler Over Them In Time Past

Phinehas earned lasting honor for stopping a plague in Numbers twenty five.

God rewarded his zeal with a covenant of an everlasting priesthood.

This verse remembers him specifically as an early leader of the gatekeepers.

His name still carried weight generations after he was gone.

🛡️ Phinehas stopped a plague in Numbers twenty five

🤝 God gave him an everlasting priesthood

🚪 He once led the gatekeepers

📖 His name still carried weight later

## 🚪 Zechariah The Son Of Meshelemiah Was Porter Of The Door

This Zechariah is one gatekeeper among many named across this list.

His post covered the tabernacle of the congregation's actual doorway.

Every doorway into sacred space had a specific, accountable person assigned.

Nothing about access to God's house was left unguarded or unclear.

🚪 Zechariah guarded a specific doorway

📛 Meshelemiah was named as his father

🎯 Every gate had one accountable person

📖 Access to God's house stayed guarded

# FirstChronicles 9:22-27
# 🕰️ Two Hundred Twelve Porters On Rotation
---
## 🔢 All These Which Were Chosen To Be Porters Were Two Hundred And Twelve

Two hundred twelve men total held this one specific temple job.

That number alone shows how seriously Israel treated guarding sacred space.

This was not a side task handled by whoever happened to be free.

It was a large, organized force with its own leadership structure.

🔢 212 men held this one job

🛡️ Guarding sacred space was taken seriously

🏗️ It ran as an organized force

📖 Access to the temple was never casual

## 👴 David And Samuel The Seer Did Ordain In Their Set Office

"Samuel the seer" is the same prophet who anointed both Saul and David.

"Ordain" means he formally appointed people into a lasting position.

Samuel had died long before David's temple plans were finished.

This verse shows the gatekeeping system began earlier than most readers assume.

👴 Samuel the seer anointed Saul and David

✍️ Ordain means formally appointed

⏳ Samuel died before the temple was built

📖 This system started earlier than expected

## 🧭 In Four Quarters Were The Porters, Toward The East, West, North, And South

Every side of the temple complex had its own dedicated watch.

No single direction was left less guarded than the others.

This mirrors how Israel's tribes once camped around the tabernacle in the wilderness.

Order around God's dwelling place was never an accident.

🧭 All four directions were guarded

⚖️ No side was left weaker

⛺ This echoes the wilderness camp layout

📖 Order around God's house was intentional

## 🔁 Their Brethren Were To Come After Seven Days From Time To Time

This describes a rotating weekly shift system for gate duty.

Families relieved each other on a set schedule rather than serving nonstop.

A system like this let gatekeeping stay sustainable across many generations.

Nobody carried the whole burden alone for very long.

🔁 Guards rotated on a weekly schedule

👪 Families relieved each other in turn

⏳ This kept the duty sustainable

📖 No one carried the burden alone

## 🏠 They Lodged Round About The House Of God, The Opening Thereof Every Morning

Some gatekeepers actually lived on site, not just visited for a shift.

Their job included the very first task of each new day, unlocking the gates.

Overnight presence meant the temple was never left completely unwatched.

Even the smallest daily task, opening a door, was treated as sacred responsibility.

🏠 Some gatekeepers lived on site

🌅 They opened the gates each morning

🌙 The temple was never unwatched

📖 Even small tasks were sacred duties

# FirstChronicles 9:28-34
# 🏺 Vessels, Spices, And The Bread That Never Ran Out
---
## 🔢 Certain Of Them Had The Charge Of The Ministering Vessels By Tale

"By tale" means by an exact, counted number.

These sacred vessels were tracked precisely every single time they moved.

Losing or misplacing even one piece was never treated as acceptable.

Careful counting protected items that were used directly in worship.

🔢 By tale means by exact count

🏺 Sacred vessels were tracked precisely

🚫 Nothing was allowed to go missing

📖 Careful counting protected sacred items

## 🌾 The Fine Flour, And The Wine, And The Oil, And The Frankincense, And The Spices

These five items were the core raw materials for temple offerings.

Fine flour and oil formed the grain offerings.

Wine was poured out alongside the sacrifices.

Frankincense burned into sweet smoke on the altar.

Someone had to manage a steady supply of every single one.

🌾 Flour and oil built grain offerings

🍷 Wine was poured out with sacrifices

🕯️ Frankincense burned as sweet smoke

📖 Supplies needed constant, careful management

## 🧴 Some Of The Sons Of The Priests Made The Ointment Of The Spices

This "ointment" was almost certainly the holy anointing oil described in Exodus thirty.

Exodus gave an exact, guarded recipe that outsiders were forbidden to copy.

Only priests, not ordinary Levites, were trusted to prepare it.

That restriction protected something meant to mark people and objects as set apart.

🧴 This recalls the recipe from Exodus thirty

🔒 The formula was tightly guarded

👑 Only priests prepared this ointment

📖 It marked things as set apart

## 🍳 Mattithiah Had The Set Office Over The Things That Were Made In The Pans

"Things made in the pans" likely means flat baked offerings cooked in a griddle.

Leviticus two describes grain offerings prepared exactly this way.

Mattithiah's whole job centered on this one specific baking task.

Even a narrow assignment like this had a name and a family behind it.

🍳 Pans likely means flat baked offerings

📜 Leviticus two describes this offering

👤 Mattithiah's whole job was this one task

📖 Every task had a named person

## 🍞 The Sons Of The Kohathites Were Over The Shewbread, To Prepare It Every Sabbath

"Shewbread" means the twelve loaves kept constantly on display before God.

Leviticus twenty four already commanded fresh loaves every single week.

The Kohathites, Levi's other main branch, carried this exact duty here.

Bread that never ran out pictured God's constant provision for His people.

🍞 Shewbread means twelve loaves always on display

📆 Fresh loaves were baked every sabbath

👨‍👦 The Kohathites carried this duty

📖 It pictured God's constant provision

## 🆓 The Singers, Who Remaining In The Chambers Were Free

"Free" here means excused from every other Levite duty, not free of charge.

These men worked in music full time, day and night without a break.

No gate duty, no vessel counting, no baking pulled their attention away.

Worship music was treated as a job serious enough to demand full focus.

🆓 Free means excused from other duties

🎵 Singers worked music full time

🚫 No other jobs pulled their focus

📖 Worship music demanded full attention

# FirstChronicles 9:35-38
# 👨‍👦 The Family That Founded Gibeon
---
## 🏙️ The Father Of Gibeon, Jehiel, Whose Wife's Name Was Maachah

"Father of Gibeon" is a common genealogy phrase meaning founding leader of that town.

It does not always mean he was that town's literal first parent.

Jehiel is remembered here as Gibeon's leading founding figure.

Gibeon is about to matter greatly in the very next chapter.

🏙️ Father of means founding leader

🚫 Not always a literal first parent

👤 Jehiel led the town of Gibeon

📖 Gibeon matters again very soon

## 👀 His Firstborn Son Abdon, Then Zur, And Kish, And Baal, And Ner, And Nadab

Kish and Ner are the two names worth watching closely in this list.

Kish will soon be named as the father of Saul, Israel's first king.

Ner will be named as the father of Saul's general Abner.

A crowded list of names is quietly setting up the whole next chapter.

👀 Kish and Ner deserve attention here

👑 Kish will father King Saul

⚔️ Ner will father Abner, Saul's general

📖 This list sets up the next chapter

## 🏘️ And Mikloth Begat Shimeam, And They Also Dwelt With Their Brethren At Jerusalem

This branch of the family split across two locations.

Some stayed near Gibeon while others moved into Jerusalem itself.

Family lines rarely stayed in one single place for very long.

The record simply tracked wherever each branch actually ended up.

🏘️ This family split across two towns

📍 Some stayed near Gibeon

🏙️ Others moved into Jerusalem

📖 Records tracked families wherever they went

# FirstChronicles 9:39-44
# 👑 Saul's Line, Named Again Before The Fall
---
## 🔁 And Ner Begat Kish, And Kish Begat Saul

This exact family chain already appeared once before in chapter eight.

Chronicles repeats it here as this section moves toward Saul's actual downfall.

Saul was Israel's very first king, chosen after the people demanded a king.

Repetition here signals a coming shift in the story's whole direction.

🔁 This same chain appeared in chapter eight

👑 Saul became Israel's first king

📢 The people originally demanded a king

📖 Repetition signals a coming turn

## 🤝 And Jonathan, And Malchishua, And Abinadab, And Eshbaal

Jonathan is remembered as David's closest friend, loyal even against his own father.

"Eshbaal" means "man of Baal," using the word in its old, harmless sense of lord.

Chapter eight already explained how later scribes swapped that word for "bosheth," meaning shame.

That is why this same son appears elsewhere as Ishbosheth.

🤝 Jonathan was David's loyal friend

📛 Eshbaal originally meant man of lord

✏️ Later scribes swapped it for bosheth

📖 The same man is called Ishbosheth elsewhere

## 📛 And The Son Of Jonathan Was Meribbaal, And Meribbaal Begat Micah

"Meribbaal" is this same grandson's formal name, again using baal in its old sense.

Second Samuel calls him Mephibosheth after that same later name swap.

David later showed him extraordinary kindness for Jonathan's sake alone.

One small grandson carried the weight of an entire covenant of loyalty.

📛 Meribbaal uses baal in its old sense

✏️ Second Samuel calls him Mephibosheth

🤝 David showed him kindness for Jonathan

📖 One grandson carried a covenant's weight

## 🔗 The Sons Of Micah Were, Pithon, And Melech, And Tahrea, And Ahaz

Four more generations continue past Micah without a single missing link.

Careful preservation like this protected Jonathan's own bloodline for centuries.

Nothing about this family's record was allowed to simply fade away.

Every name mattered enough to someone to be written down and kept.

🔗 Four more generations follow Micah

🛡️ This protected Jonathan's bloodline

📜 Nothing was allowed to fade away

📖 Every name was worth preserving

## 👶 And Ahaz Begat Jarah, And Azel Had Six Sons

The chain keeps stretching outward, adding Alemeth, Azmaveth, Zimri, Moza, and more.

Azel eventually closes this whole branch with six named sons of his own.

A list this detailed shows Chronicles cared about ordinary descendants, not only kings.

Faithfulness across generations mattered even for names history barely remembers otherwise.

🔗 The chain keeps stretching outward

👶 Azel closes it with six sons

📚 Chronicles cared about ordinary descendants

📖 Faithfulness mattered beyond famous names

## 📋 Azrikam, And Bocheru, And Ishmael, And Sheariah, And Obadiah, And Hanan

This full list of names closes out First Chronicles nine.

The very next chapter tells the story of Saul's death in battle.

Placing his family record immediately before his death was not an accident.

Readers meet the man in full before watching him fall.

📋 This full list closes the chapter

⚔️ Saul's death comes in chapter ten

🎯 The placement was deliberate

📖 Readers meet the man before his fall
`.trim();

export const FIRST_CHRONICLES_NINE_PERSONAL_SECTIONS = parseFirstChroniclesNineRawNotes(FIRST_CHRONICLES_NINE_RAW_NOTES);
