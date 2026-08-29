export type NehemiahTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNehemiahTwelveRawNotes(rawText: string): NehemiahTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NehemiahTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nehemiah\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nehemiah 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nehemiah\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Nehemiah\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nehemiah 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nehemiah 12:${startVerse}` : `Nehemiah 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Nehemiah 12 sections, received " + sections.length);
  }

  return sections;
}

const NEHEMIAH_TWELVE_RAW_NOTES = `# Nehemiah 12:1-7
# 🏠 The Priests And Levites Who Returned
---
## 🏠 Now These Are The Priests And The Levites That Went Up With Zerubbabel

Zerubbabel led the very first group of Jewish exiles home from Babylon.

That return happened decades before Nehemiah ever arrived in Jerusalem.

This chapter reaches back to name the priests who made that first journey.

Nehemiah is preserving a record almost a century old by the time he writes it.

🏠 Zerubbabel led the first return home

📆 This happened decades before Nehemiah

📜 The chapter records that first generation

📖 Old records mattered enough to preserve

## ✡️ The Son Of Shealtiel, And Jeshua

"Jeshua" is the Hebrew form of the name later written in Greek as Jesus.

It means "the Lord saves."

This particular Jeshua served as high priest for that first generation of returned exiles.

He is not the Jesus of the Gospels, even though the names share the same root.

Many Jewish parents chose that name because it declared their hope in God.

✡️ Jeshua is Hebrew for Jesus

📖 The name means the Lord saves

👤 This Jeshua was a high priest

➡️ Same name, different person than Christ

## 📜 Seraiah, Jeremiah, Ezra

This Ezra is not the same man as Ezra the scribe from earlier chapters.

Priestly names repeated often across generations in the same families.

A son was frequently named after a father or a grandfather.

Matching names across lists like this one do not always mean matching people.

❌ Not the same Ezra as the scribe

👪 Priestly names repeated across generations

🔁 Sons often carried a father's name

📖 Same name does not mean same man

## 📋 Iddo, Ginnetho, Abijah

Genealogy mattered enormously to a priest returning from exile.

A priest who could not prove his family line was barred from serving.

This full list of names functioned as each family's proof of the right to serve.

An ordinary list of names was actually a legal document.

📜 Names proved the right to serve

🚫 Unproven lines were barred from duty

🗂️ This list functioned as legal proof

📖 A list of names carried real weight

## 🔢 Sallu, Amok, Hilkiah, Jedaiah

This final name group closes out the list of priestly family heads.

Twenty two priestly families are named across these first seven verses.

That exact number matters again later, when a second list appears for the next generation.

🔢 Twenty two priestly families are named

📋 This closes the first family list

🔁 The same count returns later

📖 Numbers in genealogies are not random

## 👑 These Were The Chief Of The Priests And Of Their Brethren

"Chief" here means the head of a family line, not a personal rank.

This list names leading households, not every individual priest.

Each name stood for an entire family serving in that role.

👑 Chief means head of a family

👪 One name represents a whole household

🔢 Not a headcount of every priest

📖 Families served, not just individuals

# Nehemiah 12:8-9
# 🎶 Levites Over The Thanksgiving And The Watches
---
## 🎶 The Levites

Priests were the specific descendants of Aaron who offered the sacrifices.

Levites were the wider tribe that assisted with the rest of temple worship.

Every priest was a Levite, but not every Levite was a priest.

This verse switches from the narrower priestly list to the broader Levite one.

🔥 Priests offered the sacrifices

🎶 Levites assisted the wider worship

👪 Every priest was also a Levite

📖 Two roles, one shared tribe

## 🎤 Mattaniah, Which Was Over The Thanksgiving

This phrase names a specific job, not just a title.

Mattaniah led the songs of thanksgiving during temple worship.

That same musical office is named again later in this very chapter.

Worship leadership was treated as a real, assigned responsibility.

🎤 Mattaniah led thanksgiving songs

🎶 A specific worship leading role

🔁 The same office appears again later

📖 Worship leadership was a real job

## ⏰ Also Bakbukiah And Unni, Their Brethren, Were Over Against Them In The Watches

"Watches" means organized shifts of duty, not one ongoing job.

"Over against them" describes singing back and forth between two groups.

One group would sing a line and the other would answer it.

This call and response pattern shaped much of Israel's temple worship.

⏰ Watches means scheduled shifts

🗣️ Groups sang back and forth

🎶 Call and response worship style

📖 Worship was structured, not random

# Nehemiah 12:10-11
# 👑 The High Priestly Line
---
## 👴 And Jeshua Begat Joiakim, Joiakim Also Begat Eliashib, And Eliashib Begat Joiada

"Begat" is an old word that simply means "fathered."

This verse traces four straight generations of high priests, father to son.

Jeshua led the very first generation that returned from exile.

Eliashib would later serve as high priest during much of Nehemiah's own time.

👴 Begat means fathered

📜 Four generations trace here, in order

🏠 Jeshua led the first return generation

📖 Eliashib served during Nehemiah's own time

## ✍️ Joiada Begat Jonathan, And Jonathan Begat Jaddua

This verse adds two more generations onto the same family line.

Many scholars believe this Jaddua served as high priest decades after Nehemiah died.

That would mean a later scribe extended this list well past Nehemiah's own lifetime.

The Bible itself was cared for and updated by faithful hands across generations.

📜 Two more generations are added

👴 Jaddua likely served after Nehemiah's death

✍️ A later scribe extended the record

📖 Scripture was preserved across generations

# Nehemiah 12:12-17
# 📜 The Priestly Courses Under Joiakim
---
## 📜 In The Days Of Joiakim Were Priests, The Chief Of The Fathers

This verse starts a second list of priestly family heads.

The first list, back in verses one through seven, named the fathers.

This new list names their sons, one generation later, under the high priest Joiakim.

Reading the two lists side by side traces one unbroken family chain.

📜 A second list begins here

👴 The first list named the fathers

👦 This list names their sons

📖 Together they trace one family chain

## 🔑 Of Ezra, Meshullam

Each pair in this list follows the same simple pattern.

The first name is the founding family from the earlier list.

The second name is whoever led that family in Joiakim's own generation.

Once that pattern is clear, the rest of the list reads itself.

🔑 Same pattern repeats through the list

👴 First name is the founding family

👦 Second name is the current leader

📖 One key unlocks the whole list

## ✍️ Of Melicu, Jonathan

Most of these names never appear anywhere else in the Bible.

No dramatic story is attached to Jonathan here.

God still had this name written down and preserved for centuries.

Faithful, unremarkable service was still worth recording.

❓ Most of these names appear only once

📖 No dramatic story is attached

✍️ God still preserved their names

➡️ Quiet faithfulness still counted

## 🔍 Of Harim, Adna

Comparing this list to the earlier one shows more than who continued serving.

A family missing from this second list may have died out entirely.

Ancient record keepers tracked survival as carefully as they tracked service.

A list like this quietly holds both the living names and the missing ones.

🔍 Compare this list to the earlier one

❌ A missing name could mean a lost family

✍️ Record keepers tracked both outcomes

📖 What is absent can matter too

## 👶 Of Abijah, Zichri

Abijah named one of the priestly divisions first organized under King David.

Centuries later, a priest named Zacharias served in that very same division.

That priest was the father of John the Baptist in the Gospel of Luke.

A name buried in a genealogy list here connects directly to the New Testament.

👴 Abijah named a priestly division

👶 Zacharias later served in it

📖 He fathered John the Baptist

➡️ Old lists connect to the Gospels

## 📋 Of Miniamin, Of Moadiah, Piltai

This whole section can feel like a wall of unfamiliar names.

Every name on it belonged to a real family serving in the temple.

Someone chose to write each one down rather than let it disappear.

That choice mattered to God even when it barely registers with a modern reader.

📋 A long list of real families

🏛️ Each family served in the temple

✍️ Someone chose to preserve every name

📖 Preserved names mattered to God

# Nehemiah 12:18-21
# 🔚 Closing The Priestly Family List
---
## 🔤 Of Sallai, Kallai

Slight spelling differences appear across these two priestly lists.

Miamin in the earlier list becomes Miniamin only a few verses later.

That kind of small variation was normal in ancient Hebrew name spelling.

It does not mean the two records disagree with each other.

🔤 Names shift slightly in spelling

📜 Miamin becomes Miniamin later

✅ This is normal, not an error

📖 Ancient spelling was less fixed than today

## 🔚 Of Hilkiah, Hashabiah

This entry closes out the second priestly family list.

Twenty two families were named the first time, back in verses one through seven.

This second list, one generation later, still lines up closely with that same count.

Steady continuity mattered more to these families than dramatic change.

🔚 This closes the second family list

🔢 Twenty two families were named the first time

📖 The count still lines up closely

➡️ Steady continuity mattered here

# Nehemiah 12:22-26
# 📚 Records Kept Into Darius's Reign
---
## 📜 The Levites In The Days Of Eliashib, Joiada, And Johanan, And Jaddua, Were Recorded Chief Of The Fathers

This verse extends the priestly record four more generations past Joiakim.

Eliashib, Joiada, Johanan, and Jaddua each led the priesthood in his own turn.

The record keeping did not stop with Nehemiah's own generation.

Later scribes kept adding to this same list long after Nehemiah wrote his memoir.

📜 Four more generations are added here

👑 Each name led in his own era

✍️ Record keeping outlasted Nehemiah himself

📖 Later scribes kept the list current

## 👑 Also The Priests, To The Reign Of Darius The Persian

This Darius reigned decades after Nehemiah's own time as governor.

His name appearing here is a clue about how this whole book came together.

A later editor kept adding names even after Nehemiah stopped writing his own memoir.

Scripture itself shows real, ongoing care in how it was preserved.

👑 Darius reigned after Nehemiah's own time

🕰️ This list kept growing after him

✍️ A later editor added these names

📖 Scripture was cared for across generations

## 📚 Written In The Book Of The Chronicles

This is not the biblical book of Chronicles found earlier in the Old Testament.

It refers instead to an official government record book kept at the time.

Ancient governments regularly kept detailed archives like this one.

This verse names a source document, not a Bible book that shares its title.

📚 Not the Bible book of Chronicles

🏛️ An official government record book

🗂️ Governments kept detailed archives

📖 A source, not a Bible title

## 👑 According To The Commandment Of David The Man Of God

The worship pattern still being followed here began with King David.

That was about five hundred years before Nehemiah's own lifetime.

One king's careful planning shaped temple worship for centuries after he died.

👑 David set this pattern long ago

📆 About five hundred years earlier

🎶 His planning shaped worship for centuries

📖 One faithful plan outlived its maker

## 🚪 Porters Keeping The Ward At The Thresholds Of The Gates

"Porters" means gatekeepers, not workers who carry luggage.

"Ward" means an assigned guard duty, not a hospital room.

These men physically guarded the entrances to the temple courts.

Their job protected the temple from anyone entering who should not.

🚪 Porters means gatekeepers

🛡️ Ward means an assigned guard duty

👀 They guarded the temple entrances

📖 Their watch protected what was holy

## 🤝 In The Days Of Nehemiah The Governor, And Of Ezra The Priest, The Scribe

This verse anchors the whole record to one specific moment in history.

Nehemiah served as governor while Ezra served as priest and scribe.

Both men led at the same time, in the same city.

Their shared leadership is confirmed here in plain, simple language.

🏛️ Nehemiah served as governor

📖 Ezra served as priest and scribe

🤝 Both led at the same time

➡️ Their partnership is confirmed here

# Nehemiah 12:27-30
# 🎶 Gathering For The Dedication
---
## 🏗️ At The Dedication Of The Wall Of Jerusalem They Sought The Levites

"Dedication" means formally setting something apart for God's own purpose.

The wall was not simply finished construction being inspected.

It was being offered to God the same way a new temple would be.

That is why Levites, not construction workers, led this moment.

🏗️ Dedication means setting something apart for God

🧱 More than finished construction

🙏 The wall was offered to God

📖 Levites led it, not builders

## 🥁 With Cymbals, Psalteries, And With Harps

Cymbals were metal discs clashed together for percussion.

Psalteries were stringed instruments similar to a small harp.

Harps added a third layer of sound to the celebration.

Together these instruments filled the wall with loud, festive worship.

🥁 Cymbals were clashing percussion

🎻 Psalteries were small stringed instruments

🎶 Harps added another layer of sound

📖 Together they made loud, joyful worship

## 🏘️ From The Villages Of Netophathi

These singers did not live inside Jerusalem year round.

Netophathi was a village near Bethlehem where many of them made their home.

They had to be specially gathered in for this one time celebration.

🎤 Singers lived outside the city

🏘️ Netophathi was a village near Bethlehem

📣 They were specially gathered for this day

📖 Worship leaders traveled far to serve

## 🗺️ From The House Of Gilgal, And Out Of The Fields Of Geba And Azmaveth

Gilgal, Geba, and Azmaveth were small towns scattered around Jerusalem.

Musicians from each of these outlying places made the trip in.

Even the most distant singers did not want to miss this day.

🗺️ Small towns scattered near Jerusalem

🚶 Musicians traveled in from each one

❤️ Nobody wanted to miss this day

📖 Distance did not stop their worship

## 💧 The Priests And The Levites Purified Themselves, And Purified The People, And The Gates, And The Wall

To "purify" meant performing a ceremonial washing before approaching something holy.

People were purified first, the same way they always were before worship.

Then, strikingly, even the gates and the wall itself were purified.

Setting apart a stone wall this way showed the whole city now belonged to God.

💧 Purify means ceremonial cleansing

🙋 People were purified as usual

🧱 Even the gates and wall were purified

📖 The whole city was set apart

# Nehemiah 12:31-37
# 🚶 The First Choir Walks South
---
## 🗣️ Then I Brought Up The Princes Of Judah Upon The Wall

The word "I" here means Nehemiah is speaking again, in his own voice.

Nehemiah had stepped back from narrating during the long lists of names.

Now his personal, eyewitness account of this day resumes.

🗣️ I means Nehemiah speaking directly

📜 The long list section has ended

👀 His eyewitness account resumes here

📖 A firsthand memory, not just a record

## 🎶 Appointed Two Great Companies Of Them That Gave Thanks

Nehemiah organized two separate choirs for this celebration.

Each group would walk in an opposite direction along the top of the wall.

They were meant to meet again on the far side, near the temple.

The entire wall would be walked and sung over before the day ended.

🎶 Two choirs were organized

🔄 Each walked a different direction

🤝 They planned to meet again later

📖 The whole wall was covered in song

## 🚪 Whereof One Went On The Right Hand Upon The Wall Toward The Dung Gate

The "dung gate" was plainly named for its practical use.

Refuse and waste were carried out of the city through that gate.

Even an unglamorous gate got included in this celebration.

No part of the wall was treated as unworthy of the dedication.

🚪 Dung gate means the refuse gate

🗑️ Waste left the city through it

🎉 Even this gate joined the celebration

📖 No part of the wall was skipped

## 🎺 The Son Of Zaccur, The Son Of Asaph

This trumpeter's family line is traced back five names, all the way to Asaph.

Asaph served as King David's original chief musician, centuries earlier.

That means this one trumpeter's family had led temple music for five hundred years.

🎺 A trumpeter's family line is traced

👴 It reaches back to Asaph

📆 That spans about five hundred years

📖 One family's music outlasted generations

## 🏙️ The Stairs Of The City Of David

The "city of David" was the oldest, original part of Jerusalem.

David had captured that section of the city long before Solomon built the temple.

Walking past it connected this new celebration to the city's oldest history.

🏙️ City of David was Jerusalem's oldest part

👑 David captured it generations earlier

🚶 This walk passed through old history

📖 New joy met an ancient city

## 💧 Even Unto The Water Gate Eastward

This is the same water gate where Ezra once read the law aloud to the city.

That reading, back in chapter eight, brought the people to tears and then to joy.

Now that same spot hosts another unforgettable public moment.

💧 Same gate as Ezra's law reading

😢 That day ended in tears and joy

🎉 Now it hosts a new celebration

📖 One location, two unforgettable days

# Nehemiah 12:38-43
# 🚶 The Second Choir Walks North
---
## 🔄 The Other Company Of Them That Gave Thanks Went Over Against Them

This is the second choir, heading the opposite direction from the first.

Together the two groups now cover the entire circuit of the wall.

Nothing about Jerusalem's new wall goes unsung on this day.

🎶 The second choir goes the other way

🔄 Together they cover the whole wall

🎉 Nothing is left unsung

📖 A complete celebration, start to finish

## 🚶 And I After Them, And The Half Of The People Upon The Wall

Nehemiah does not just plan this celebration from a distance.

He personally walks with the second group, on top of the wall himself.

The governor who organized the building project also joins its dedication in person.

🚶 Nehemiah walks with the second group

👀 He is present, not distant

🏗️ Builder and celebrant, the same man

📖 Leadership shown by presence, not just planning

## 🗼 From Beyond The Tower Of The Furnaces Even Unto The Broad Wall

This phrase begins listing the landmarks along the wall's northern route.

The tower of the furnaces and the broad wall were real, known places in the city.

Verse thirty nine goes on to name several more gates along this same walk.

Naming each landmark let the reader picture the exact path this choir walked.

🗼 Tower of the furnaces was a real landmark

🧱 Broad wall marked another known spot

🗺️ More gates are named in verse thirty nine

📖 Every landmark let readers picture the walk

## 🐑 Even Unto The Sheep Gate

The sheep gate is where the entire wall building project began, back in chapter three.

This procession ends its long walk at that very same gate.

The wall that started at the sheep gate is now finished and celebrated there too.

🐑 Sheep gate is where building began

🏁 This procession ends there too

🔁 Start and finish share one location

📖 The whole project comes full circle

## 🛑 They Stood Still In The Prison Gate

"Stood still" simply means the procession stopped moving here.

This gate stood near the temple, where both companies were now heading.

The two separate choirs are about to reunite in one place.

🛑 Stood still means the walking stopped

🏛️ This gate stood near the temple

🤝 The two choirs are about to reunite

📖 One wall, one people, one place

## 🎼 The Singers Sang Loud, With Jezrahiah Their Overseer

"Overseer" here means a choir director, the person leading and coordinating the singers.

Jezrahiah's name is recorded simply because his leadership made this moment happen well.

A single, well led voice can shape how an entire crowd worships together.

🎼 Overseer means choir director

👤 Jezrahiah led the singers

🎤 Good leadership shaped the sound

📖 One leader, one unified voice

## 👨‍👩‍👧 The Wives Also And The Children Rejoiced

This celebration was never only for the leaders or the workers.

Wives and children are named here as full participants in the joy.

The book began in chapter one with Nehemiah weeping over Jerusalem's ruined walls.

It now ends with an entire city, including its children, rejoicing out loud.

👨‍👩‍👧 Wives and children shared in the joy

📣 The celebration was heard far away

😢 The book began with tears over ruins

📖 It now ends in citywide joy

# Nehemiah 12:44-47
# 💰 Provision For The Priests And Levites
---
## 🌾 Appointed Over The Chambers For The Treasures, For The Offerings, For The Firstfruits, And For The Tithes

"Firstfruits" meant giving God the very first portion of a harvest, before using the rest.

"Tithes" meant giving a required tenth of income or produce.

Priests and Levites owned no farmland of their own to live on.

These gifts were literally how the temple workers were fed and supported.

🌾 Firstfruits means the harvest's first portion

🔟 Tithes means a required tenth

🏛️ Priests owned no farmland

📖 These gifts fed the temple workers

## ❤️ Judah Rejoiced For The Priests And For The Levites That Waited

Ordinary people are described here as glad to support the temple workers.

That kind of generosity did not always last in Israel's later history.

On this particular day, giving came from genuine joy, not obligation.

❤️ The people gave gladly here

📆 This generosity did not always last

🎁 Giving came from joy, not duty

📖 A high point worth noticing

## 👑 According To The Commandment Of David, And Of Solomon His Son

This same pattern of worship reaches all the way back to David and Solomon.

Two kings from five centuries earlier still shaped exactly how this day unfolded.

Faithful patterns can outlive the kings who first set them.

👑 David and Solomon set this pattern

📆 About five centuries earlier

🔁 Their order still shaped this day

📖 Faithful patterns can outlive kings

## 🎶 In The Days Of David And Asaph Of Old There Were Chief Of The Singers

Asaph is named here for the third time in this one chapter.

He is remembered as the founder of Israel's tradition of temple music.

That legacy had already lasted five hundred years by Nehemiah's own day.

🎶 Asaph is named a third time

👴 He founded Israel's music tradition

📆 His legacy spanned five hundred years

📖 One man's gift outlived him by centuries

## 🔁 And Gave The Portions Of The Singers And The Porters, Every Day His Portion

This chapter opened by listing the priests who first came home from exile.

It closes with the whole nation providing for those same worship leaders, one generation later.

The people who once needed to be led are now the ones sustaining the leaders.

🏠 The chapter opened with those returning home

🎶 It closes with the nation supporting worship

🔁 The reader becomes the provider

📖 A full circle across one chapter
`.trim();

export const NEHEMIAH_TWELVE_PERSONAL_SECTIONS = parseNehemiahTwelveRawNotes(NEHEMIAH_TWELVE_RAW_NOTES);
