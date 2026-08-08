export type JoshuaTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaTwentyOneRawNotes(rawText: string): JoshuaTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 21:${startVerse}` : `Joshua 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Joshua 21 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_TWENTY_ONE_RAW_NOTES = `# Joshua 21:1-3
# 🏘️ The Levites Come Asking For What Was Promised
---
## 📣 Then Came Near The Heads Of The Fathers Of The Levites

The heads of the fathers means the leading men of each Levite family line, not literal fathers.

Levi had three sons long ago, Gershon, Kohath, and Merari, and each line still had its own leaders.

These leaders came to Eleazar the priest and Joshua together, not to one or the other alone.

The Levites never received a normal tribal territory earlier in this book like the other tribes did.

This meeting exists to finally settle what they were promised instead of land.

🏘️ Heads of the fathers means clan leaders
👨‍👩‍👧 Levi had three family lines
⚖️ They approached both leaders together
📖 The Levites never received normal land

## ⛺ They Spake Unto Them At Shiloh In The Land Of Canaan

Shiloh was the town where Israel had set up the tabernacle a few chapters earlier.

It served as the nation's central worship site before Jerusalem ever held that role.

Choosing Shiloh for this meeting was not random.

A request tied to the priesthood and worship fit naturally at the place where worship already happened.

⛺ Shiloh already held the tabernacle
🕍 It worked as Israel's worship center
📍 The location fit this request
📖 Worship and land met at Shiloh

## 🐄 Cities To Dwell In, With The Suburbs Thereof For Our Cattle

"Suburbs" here does not mean a housing area outside a city.

It means the open pastureland that surrounded each town.

The Levites received no farmland like the other tribes did.

Their livestock still needed room to graze every day.

Cities without pastureland attached would have been useless to them.

🏙️ Suburbs meant grazing pastureland
🐄 Livestock needed room to graze
🌾 Levites received no farmland
📖 Cities came with pasture attached

## 🎁 Out Of Their Inheritance, At The Commandment Of The LORD

The other twelve tribes had just finished receiving their own promised territory.

Now they had to give up a portion of that same land for the Levites.

This was not each tribe volunteering on its own idea.

The LORD commanded it directly, so no tribe could simply refuse.

Every tribe ended up supporting the priesthood out of its own hard won ground.

🎁 Tribes gave up part of their land
👑 The LORD commanded this directly
🚫 No tribe could refuse the order
📖 Every tribe helped support the priesthood

# Joshua 21:4-8
# 🎲 Four Family Lines Split Forty Eight Cities
---
## 🎲 The Lot Came Out For The Families Of The Kohathites

Casting lots was Israel's method for making decisions that needed to feel fair to everyone.

It likely involved marked stones or sticks drawn out to decide an outcome.

Israel already used this same method to divide up tribal land earlier in the book.

Using it again here kept even the priesthood's cities from feeling like human favoritism.

Kohath was one of Levi's three original sons, and his family line goes first in this list.

🎲 Casting lots decided the outcome
🪨 It may have used marked stones
⚖️ This kept the process feeling fair
📖 Kohath's line is listed first

## 🕯️ The Children Of Aaron The Priest, Which Were Of The Levites, Had By Lot

Not every Kohathite was a priest.

Aaron's own direct descendants formed a smaller, separate group inside the wider Kohathite family.

Only Aaron's line actually served as priests offering sacrifices in the tabernacle.

The rest of Kohath's family assisted with tabernacle duties without offering sacrifices themselves.

This chapter treats Aaron's descendants as their own distinct group with their own separate list of cities.

👨‍👦 Not every Kohathite was a priest
🕯️ Aaron's own line served as priests
🛠️ The rest assisted without offering sacrifices
📖 Aaron's family gets its own city list

## ➕ And Out Of The Tribe Of Zebulun, Twelve Cities

Add every number in this section together and the total lands on forty eight cities.

Thirteen went to the priests, ten to the rest of Kohath, thirteen to Gershon, and twelve to Merari.

No other tribe was given cities scattered inside every other tribe's land like this.

The Levites needed to live spread out because their job was serving all of Israel, not one region.

A priest, teacher, or judge from the tribe of Levi was never supposed to be far away.

➕ Thirteen, ten, thirteen, and twelve total forty eight
🗺️ Levites were spread through every tribe
🧑‍🏫 Their job was serving all of Israel
📖 No Israelite lived far from a Levite

## 🔁 As The LORD Commanded By The Hand Of Moses

This exact phrase already appeared once, back in verse two.

Repeating it here was not careless writing.

It reminds the reader that none of this was Joshua's own invention.

Every city assignment traces back to a command Moses received decades earlier.

Joshua's generation is simply carrying out a plan God had already set in motion long before they were born.

🔁 This phrase already appeared in verse two
✍️ The repetition was intentional
👴 The command traces back to Moses
📖 Joshua's generation is finishing an old plan

# Joshua 21:9-16
# 🏙️ The Priests Receive Hebron And Judah's Towns
---
## 🥇 For Theirs Was The First Lot

Among all the Levite families, Aaron's priestly line was given the very first lot drawn.

Going first in an ancient lottery was a mark of honor, not simply luck of the draw.

The priests carried the heaviest responsibility of any Levite family, offering sacrifices daily inside the tabernacle.

Their cities needed to be chosen and named before anyone else's.

Order in this list was never accidental.

🥇 Aaron's line drew the first lot
🕯️ Priests carried the heaviest duties
📜 Order in the list mattered
📖 Their cities were chosen first

## 💪 The City Of Arba The Father Of Anak, Which Is Hebron

Arba was remembered as the founder of Hebron, and his name meant father of Anak.

Anak was the ancestor of the Anakim, a people remembered in scripture as unusually tall and strong.

The ten fearful spies in the book of Numbers pointed to the Anakim as a reason not to enter Canaan.

Caleb was the one spy who trusted God despite that same report.

The very city once feared for its giants now belonged to God's priests.

🏙️ Arba founded the city of Hebron
💪 Anak's descendants were the Anakim
👀 Spies once feared this same people
📖 A feared city became a priest city

## 🌾 But The Fields Of The City, And The Villages Thereof, Gave They To Caleb

Giving Hebron to the priests did not mean Caleb lost everything he had been promised.

The city itself, with its walls and houses, went to the priests as a Levite city.

The surrounding fields and smaller villages stayed with Caleb as his own personal property.

A city could belong to one group while the land around it belonged to another.

Caleb's original inheritance from chapter fourteen was never actually taken away.

🏙️ The city itself went to the priests
🌾 Caleb kept the surrounding fields
🏘️ Land could be shared in layers
📖 Caleb's promise stayed intact

## 🛡️ Hebron With Her Suburbs, To Be A City Of Refuge For The Slayer

Chapter twenty already introduced Hebron as one of the six cities of refuge.

This verse folds that same information back into the Levite city list.

The priests who lived in Hebron were also the ones responsible for judging refuge cases there.

Protecting the accused and serving as a priest turned out to be the same job in this city.

Justice and worship shared the very same address.

🛡️ Hebron was already a refuge city
👴 Priests judged refuge cases there
⚖️ Justice and worship overlapped here
📖 One city held both roles

## 📜 And Debir With Her Suburbs

Debir already appeared back in chapter fifteen under an older name, Kirjathsepher.

Caleb once offered his own daughter Achsah in marriage to whoever could capture that city.

Othniel, Caleb's younger relative, took the city and won her hand.

The very city won through that family story now becomes a home for priests.

A place tied to one family's courage became a place tied to the whole nation's worship.

📜 Debir was once called Kirjathsepher
🗡️ Othniel captured it and married Achsah
👨‍👩‍👧 The story is told in chapter fifteen
📖 A family story became a priest city

## 🏘️ Nine Cities Out Of Those Two Tribes

Jattir, Eshtemoa, Holon, Ain, Juttah, and Bethshemesh round out this list.

Scripture stays quiet about most of these towns anywhere else in its pages.

Together with Hebron, Libnah, and Debir, they total nine cities from Judah and Simeon.

God did not only bother naming the famous places.

Every quiet town still got written down by name.

🏘️ Six more towns fill out the list
📚 Scripture stays quiet about most of them
➕ Together they total nine cities
📖 Every quiet town still got named

# Joshua 21:17-19
# 🕍 Priestly Cities In Benjamin
---
## 🤝 Gibeon With Her Suburbs, Geba With Her Suburbs

Gibeon was the city whose people once tricked Israel into a peace treaty back in chapter nine.

They pretended to have traveled from a distant country just to avoid being destroyed.

Joshua honored that treaty even after learning the truth, and Gibeon survived as a result.

Geba sat nearby on Benjamin's northern edge, with far less written about it than Gibeon.

A city built on a lie still ended up serving God's worship.

🤝 Gibeon tricked Israel into a treaty
📜 Chapter nine tells that whole story
🗺️ Geba sat on Benjamin's northern edge
📖 A deceptive city became a priest city

## 🔮 Anathoth With Her Suburbs

Anathoth sat inside the tribe of Benjamin's land, not far from Gibeon and Geba.

Centuries later, the prophet Jeremiah was born into a priestly family from this very town.

The book of Jeremiah names Anathoth as his hometown by name in its opening lines.

A small Benjamite priest city eventually produced one of the Bible's most important prophets.

Being from a quiet town never stopped Jeremiah from carrying a massive message.

🏘️ Anathoth was a Benjamite city
✍️ Jeremiah's book opens by naming it
🔮 A quiet town produced a major prophet
📖 Jeremiah later came from Anathoth

## 🏘️ And Almon With Her Suburbs

Almon closes out this group of Benjamite cities with little further record in scripture.

It never appears again anywhere else in the Bible after this list.

Not every place in the Bible needs a dramatic story attached to it.

Some cities simply mattered because God's people needed a Levite living nearby.

The list does not rank cities by fame.

🏘️ Almon has almost no other record
🚫 It never reappears elsewhere in scripture
🙏 Some cities mattered just by being needed
📖 The list never ranks cities by fame

## ✅ All The Cities Of The Children Of Aaron Were Thirteen Cities

Nine cities came from Judah and Simeon.

Four more came from Benjamin.

Nine plus four equals the thirteen cities promised back in verse four.

The math in this chapter is never rounded or approximate.

Every number given earlier gets checked and confirmed by the end of each list.

➕ Nine plus four equals thirteen
🧮 The numbers are never approximate
✅ Each earlier promise gets confirmed
📖 Precision itself is part of the message

# Joshua 21:20-26
# 🏛️ Cities For The Rest Of Kohath
---
## 🛡️ Shechem With Her Suburbs In Mount Ephraim, To Be A City Of Refuge For The Slayer

Chapter twenty already told Shechem's rich history, Abraham's altar, Jacob's well, and Joseph's final burial place.

This time Shechem goes to the rest of Kohath's family, not to Aaron's priestly line.

The wider Levite family, not just the priests, also carried real responsibility in Israel's daily life.

A refuge city needed capable people living there no matter which Levite branch they came from.

Shechem's long history and its legal role now belonged to a different set of caretakers.

⛺ Shechem carried deep family history already
👨‍👩‍👧 This branch was not the priestly line
🛡️ Shechem was also a refuge city
📖 Different Levites, same important role

## 🛣️ And Gezer With Her Suburbs

Gezer sat in a strategic location along a major ancient trade route.

The book of Judges later admits Israel never fully drove out the Canaanites living there.

Gezer stayed a foreign held city for generations after Joshua's own lifetime.

It was eventually conquered by an Egyptian Pharaoh, who gave it to King Solomon as a wedding gift.

The book of Kings records that whole exchange.

🛣️ Gezer sat on a major trade route
⚔️ Canaanites stayed there long after Joshua
👑 Pharaoh later gave it to Solomon
📖 Kings tells that whole story

## ⚔️ And Kibzaim With Her Suburbs, And Bethhoron With Her Suburbs

Kibzaim has almost no other record anywhere in scripture.

Bethhoron does have a story, tied to the battle back in chapter ten.

Israel chased the five defeated kings down the very pass named after this town.

That same town now becomes a home for Levites instead of a battlefield memory.

Shechem, Gezer, Kibzaim, and Bethhoron together complete Ephraim's four cities.

📚 Kibzaim has almost no other record
⚔️ Bethhoron recalls the battle in chapter ten
🏙️ A battlefield became a Levite home
📖 These four complete Ephraim's cities

## 🏘️ And Out Of The Tribe Of Dan, Eltekeh With Her Suburbs, Gibbethon With Her Suburbs

Dan's own territory had already proven small and difficult to hold, described back in chapter nineteen.

Even so, Dan still gave up land here to support the Levites.

Eltekeh and Gibbethon have little further story recorded anywhere else in scripture.

A struggling tribe still carried its share of responsibility for Israel's worship.

No tribe was excused from this duty because its own land was small.

🏘️ Dan's own territory was already small
🤲 Dan still gave land for the Levites
📚 Eltekeh and Gibbethon are rarely mentioned again
📖 No tribe was excused from this duty

## 🔁 Aijalon With Her Suburbs, Gathrimmon With Her Suburbs

Aijalon completes Dan's four cities given to the Levites.

This same valley shows up later in the book of Judges during a major battle.

Gathrimmon appears here for the first time in this chapter.

It will appear again shortly, this time for a completely different tribe.

That repeat is worth watching for in the next few verses.

🏘️ Aijalon completes Dan's four cities
⚔️ This valley reappears later in Judges
👀 Watch for that name again soon
📖 Gathrimmon shows up here first

## 🌾 And Out Of The Half Tribe Of Manasseh, Tanach With Her Suburbs, And Gathrimmon With Her Suburbs

Tanach was an old Canaanite city sitting near the fertile Jezreel valley.

Gathrimmon now appears a second time, this time for half of the tribe of Manasseh.

Many scholars believe this may reflect an early copying detail.

Chronicles lists a different city name in this same spot.

A small puzzle like this does not undo the accuracy of everything else in the list.

Careful readers still notice details like this, even thousands of years later.

🌾 Tanach sat near the Jezreel valley
🔁 Gathrimmon appears a second time here
📜 Chronicles may record a different name
📖 Careful readers still catch details like this

## 🧮 Were Ten With Their Suburbs

Two from Manasseh, four from Ephraim, and four from Dan complete Kohath's remaining ten cities.

Combined with the priests' earlier thirteen cities, Kohath's whole family now totals forty three.

Gershon and Merari still remain to be listed after this.

The chapter keeps proving its own math one family line at a time.

Nothing here is left to guesswork.

➕ Two, four, and four make ten
🧮 Kohath's whole family now totals forty three
⏭️ Gershon and Merari come next
📖 Every number checks out exactly

# Joshua 21:27-33
# 🕊️ Cities For Gershon
---
## 🗺️ Golan In Bashan With Her Suburbs, To Be A City Of Refuge For The Slayer

Chapter twenty already introduced Golan as a refuge city with a name still used today.

The modern Golan Heights region carries this same ancient name.

Here Golan gets folded into Gershon's family portion of Levite cities.

A city meant to protect the accused also carried Gershon's family name into the future.

Some names from Joshua's time never disappeared from the map.

🗺️ Golan already appeared as a refuge city
🏔️ Its name survives as the Golan Heights
👨‍👩‍👧 Gershon's family received this city
📖 Some ancient names never disappeared

## 🏘️ And Beeshterah With Her Suburbs

Beeshterah appears only this one time anywhere in the entire Bible.

Its name may echo Ashtoreth, a Canaanite goddess worshipped in that region before Israel ever arrived.

A city once tied to a foreign god became a home for the Levites instead.

Even a place with almost no other record still had its ground reclaimed for God's purposes.

The text still gave it a name rather than leaving it out.

📛 Beeshterah appears only this once
🗿 Its name may echo a Canaanite goddess
🔄 A pagan city became a Levite home
📖 Even this quiet ground got reclaimed

## 🌊 Kishon With Her Suburbs, Dabareh With Her Suburbs

Kishon shares its name with a famous river mentioned later in the book of Judges.

This town sat inside the territory of Issachar, a tribe that rarely takes center stage in Joshua.

Dabareh sat nearby, with very little else recorded about it in scripture.

A quiet tribe still gave up two of its towns to support the Levites.

God's plan reached tribes the story rarely mentions by name.

🌊 Kishon shares its name with a river
🌾 Issachar rarely appears elsewhere in Joshua
🏘️ Dabareh has very little other record
📖 God's plan reached even quiet tribes

## 🏘️ Jarmuth With Her Suburbs, Engannim With Her Suburbs

Jarmuth and Engannim complete Issachar's four cities given to the Levites.

Engannim means spring of gardens, describing a place known for fresh water.

Almost nothing else is recorded about either town beyond this list.

Four cities from one quiet tribe still carried real weight in this careful record.

The text spends just as much care naming these towns as it did Judah's famous ones.

🏘️ These complete Issachar's four cities
💧 Engannim means spring of gardens
📚 Almost nothing else is recorded about them
📖 Care was equal for every tribe

## 🌊 Mishal With Her Suburbs, Abdon With Her Suburbs

Asher's territory sat along the coast, described back in chapter nineteen.

Mishal and Abdon begin Asher's contribution to Gershon's family of cities.

Scripture records almost nothing else about either town.

A coastal tribe far from the story's main events still supported the Levites fully.

Distance from the action never excused a tribe from this responsibility.

🌊 Asher's land sat along the coast
🏘️ These begin Asher's Levite cities
📚 Scripture records almost nothing else about them
📖 Distance never excused this responsibility

## 🏘️ Helkath With Her Suburbs, And Rehob With Her Suburbs

Helkath and Rehob complete Asher's four cities for the Levites.

Rehob shares its name with another town mentioned earlier during the conquest of the land.

Names repeating across different regions were common in the ancient world.

Even towns with almost no individual story still filled out this exact record.

Four full cities from Asher now stand fully accounted for.

🏘️ These complete Asher's four cities
🔁 Rehob shares its name with another town
🌍 Repeated names were common back then
📖 Asher's cities stand fully accounted for

## 📛 Kedesh In Galilee With Her Suburbs, To Be A City Of Refuge For The Slayer

Chapter twenty already explained that Kedesh means holy or set apart.

This is now the third refuge city confirmed inside the Levite list, after Hebron and Golan.

All six refuge cities from chapter twenty turn out to also be Levite cities.

Refuge and priesthood were never two separate systems in Israel.

The same people who protected the accused were the same people who served at the altar.

📛 Kedesh means holy or set apart
🛡️ This is the third refuge city listed
🔗 Refuge and priesthood overlapped completely
📖 The same people did both jobs

## ♨️ And Hammothdor With Her Suburbs, And Kartan With Her Suburbs

Hammothdor's name comes from the word for hot springs.

That detail points to the hot springs region near the Sea of Galilee, still known today near Tiberias.

Kartan closes out Naphtali's three cities with almost nothing else recorded about it.

Together with Kedesh, these three complete Naphtali's contribution to Gershon's family.

A city's name could preserve real geography for thousands of years.

♨️ Hammothdor's name means hot springs
🌊 That points to springs near Galilee
🏘️ Kartan has almost no other record
📖 Ancient names preserved real geography

## ✅ Were Thirteen Cities With Their Suburbs

Two from Manasseh, four from Issachar, four from Asher, and three from Naphtali complete Gershon's total.

That adds up to the same thirteen cities promised back in verse six.

Only Merari's family remains to be listed after this.

Every number in this chapter has now checked out so far.

The list keeps proving its own accuracy one family at a time.

➕ Two, four, four, and three make thirteen
✅ This matches the promise from verse six
⏭️ Only Merari is left to list
📖 The accuracy keeps holding up

# Joshua 21:34-40
# 🐑 Cities For Merari
---
## 🌊 Jokneam With Her Suburbs, And Kartah With Her Suburbs

Zebulun's land touched the sea, described back in chapter nineteen.

Jokneam, Kartah, Dimnah, and Nahalal complete Zebulun's four cities for Merari's family.

Very little else is written about any of these four towns elsewhere in scripture.

Merari, the last of Levi's three family lines, finally receives cities of its own here.

Even the last family line in the list received full and equal treatment.

🌊 Zebulun's land touched the sea
🏘️ Four Zebulun towns went to Merari
👨‍👩‍👧 Merari was Levi's third and final line
📖 The last line got equal treatment

## 🏜️ Bezer With Her Suburbs, And Jahazah With Her Suburbs

Chapter twenty already introduced Bezer as a refuge city out in open wilderness land.

Jahazah sat nearby, remembered mainly as the site of Israel's first battle victory against Sihon.

That battle happened generations earlier, recorded in the book of Numbers.

These two towns from Reuben's territory now belong to Merari's Levite family.

A wilderness battlefield and a wilderness refuge city ended up side by side on this list.

🏜️ Bezer was already a refuge city
⚔️ Jahazah recalls the battle against Sihon
📚 Numbers records that earlier battle
📖 Two wilderness towns now sit side by side

## 📜 Kedemoth With Her Suburbs, And Mephaath With Her Suburbs

Kedemoth and Mephaath complete Reuben's four cities given to Merari's family.

Both sat in the same wilderness territory Reuben claimed back in chapter thirteen.

Almost nothing else about either town survives elsewhere in scripture.

Four full cities from Reuben now stand fully accounted for.

The record stays just as careful for the tribe that settled farthest from the story's center.

🏘️ These complete Reuben's four cities
🏜️ Both sat in Reuben's wilderness land
📚 Almost nothing else is recorded about them
📖 The record stayed careful either way

## 🛡️ Ramoth In Gilead With Her Suburbs, To Be A City Of Refuge For The Slayer

Chapter twenty already told how King Ahab later died near this very city.

Ramoth in Gilead completes the sixth and final refuge city confirmed inside this Levite list.

Three sat west of the Jordan, Hebron, Shechem, and Kedesh.

Three sat east of the Jordan, Golan, Bezer, and Ramoth.

Every refuge city in all of Israel turned out to be staffed by a Levite family.

👑 Ahab later died near Ramoth
🛡️ This completes all six refuge cities
🗺️ Three sat west, three sat east
📖 Levites staffed every refuge city

## 🕊️ And Mahanaim With Her Suburbs

Mahanaim means two camps or two companies.

Jacob first named this place after seeing a company of angels there.

That story is recorded back in the book of Genesis.

Centuries later, King David fled to this same city during Absalom's rebellion.

The same city sheltered a fleeing patriarch and, generations later, a fleeing king.

🕊️ Mahanaim means two camps
👼 Jacob named it after seeing angels
👑 David later fled here from Absalom
📖 The name still fit centuries later

## 👑 Heshbon With Her Suburbs, And Jazer With Her Suburbs

Heshbon was once the capital city of Sihon, the Amorite king.

Israel defeated Sihon and took this city before ever crossing the Jordan into Canaan.

The book of Numbers records that entire battle.

Jazer closes out Gad's four cities with a similar wilderness era history behind it.

A city once ruled by an enemy king became a home for God's own priesthood family.

👑 Heshbon was Sihon's Amorite capital
⚔️ Israel took it before crossing the Jordan
📚 Numbers tells that whole story
📖 An enemy capital became a Levite city

## ✅ Were By Their Lot Twelve Cities

Four from Zebulun, four from Reuben, and four from Gad complete Merari's twelve cities.

That matches the exact number promised back in verse seven.

Kohath, Gershon, and Merari have now all been listed in full.

Every Levite family line received cities inside multiple different tribes.

The whole distribution finally stands complete.

➕ Four, four, and four make twelve
✅ This matches the promise from verse seven
👨‍👩‍👧 All three Levite lines are now listed
📖 The whole distribution stands complete

# Joshua 21:41-45
# 🙌 Every Promise Kept
---
## ➕ All The Cities Of The Levites Were Forty And Eight Cities With Their Suburbs

Thirteen for the priests, ten for the rest of Kohath, thirteen for Gershon, and twelve for Merari.

Add every group together and the total lands on forty eight cities exactly.

That number was promised back at the start of this chapter and never changed.

Nothing about this list was rounded, estimated, or left vague.

A promise made in general terms turned into an exact, countable reality.

➕ Thirteen, ten, thirteen, and twelve total forty eight
🎯 This matches the original promise exactly
🧮 Nothing here was left vague
📖 A promise became a countable reality

## 🤝 The LORD Gave Unto Israel All The Land Which He Sware To Give Unto Their Fathers

"Sware" means swore, an oath made with a solemn, binding promise.

The fathers here means Abraham, Isaac, and Jacob, the patriarchs who first received this promise.

God first made this promise to Abraham generations earlier, recorded in the book of Genesis.

That promise waited through slavery in Egypt and forty years of wandering before this moment arrived.

Every step of that long story was leading here.

🤝 Sware means an oath was made
👴 The fathers means Abraham, Isaac, and Jacob
📜 The promise began generations earlier in Genesis
📖 The whole story led to this moment

## 🕊️ The LORD Gave Them Rest Round About

Rest here means safety from war, not simply feeling relaxed.

No enemy nation was left standing strong enough to threaten Israel at this point.

This was the first real peace the nation had known since leaving Egypt.

The New Testament book of Hebrews later uses this same picture of rest to describe something even greater.

That later rest points toward peace found in Christ, not only peace from war.

🕊️ Rest here means safety from enemies
⚔️ No enemy nation stood against them
🏆 This was Israel's first real peace
📖 Hebrews later points to a greater rest

## 🙌 There Failed Not Ought Of Any Good Thing Which The LORD Had Spoken, All Came To Pass

"Ought" here is an old word meaning anything at all, unrelated to the modern phrase "ought to."

Not one single promise God ever spoke to Israel failed to come true.

This verse works like a closing statement for the whole first half of the book of Joshua.

Every land promise, every city, and every boundary line has now been fulfilled exactly as spoken.

God's faithfulness was never in question, only Israel's willingness to walk into what He already gave.

🙌 Ought means anything, not "ought to"
✅ Every promise God spoke came true
🏁 This closes Joshua's land conquest story
📖 God's faithfulness never wavered
`.trim();

export const JOSHUA_TWENTY_ONE_PERSONAL_SECTIONS = parseJoshuaTwentyOneRawNotes(JOSHUA_TWENTY_ONE_RAW_NOTES);
