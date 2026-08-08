export type JoshuaNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaNineteenRawNotes(rawText: string): JoshuaNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 19:${startVerse}` : `Joshua 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Joshua 19 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_NINETEEN_RAW_NOTES = `# Joshua 19:1-9
# 🤝 Simeon Settles Inside Judah
---
## 🎲 The Second Lot Came Forth To Simeon

This chapter continues the same lot casting begun back in Joshua eighteen.

Simeon's turn came second among the seven tribes still waiting for land.

Judah was measured first in the chapters just before this one.

Judah's own territory turned out to be too large for one tribe.

Simeon's land was carved out from inside that same territory instead.

🎲 Simeon drew the second lot
📏 Judah's territory came first
🏠 Simeon settled inside Judah's land
📖 One lot casting reaches every tribe

## 🧩 Within The Inheritance Of The Children Of Judah

This does not mean Simeon received its own separate block of land.

Simeon's cities and villages sat scattered inside land already assigned to Judah.

No other tribe received its inheritance shaped this way.

Judah agreed to give up some of its own excess territory.

Two tribes ended up sharing one stretch of ground, not by accident.

🧩 Simeon's land sat inside Judah's
🚫 Not a separate block of land
🤝 Judah gave up some territory
📖 A unique arrangement among the tribes

## 💧 Beersheba, And Sheba, And Moladah

Beersheba means well of the oath, tied to a promise made generations earlier.

Abraham dug a well there and swore peace with a local king.

Isaac later repeated that same oath at the very same well.

Many scholars believe Sheba may simply repeat the name Beersheba here.

Beersheba later marked the southern edge of the whole nation.

📛 Beersheba means well of the oath
🤝 Abraham swore peace there first
🔁 Isaac repeated the oath later
📖 Beersheba marked Israel's southern edge

## 🏛️ Bethmarcaboth, And Hazarsusah

Bethmarcaboth means house of the chariots.

Hazarsusah means village of the horses.

Both names point to some kind of old military staging ground.

Simeon's dry southern land bordered Egypt and its ancient trade routes.

Even a small town's name can hint at forgotten history.

🏛️ Bethmarcaboth means house of chariots
🐎 Hazarsusah means village of horses
🛡️ Both names suggest a military site
📖 A city name can hide history

## 🏙️ Ziklag

Ziklag was first assigned to Simeon here in Joshua nineteen.

By David's lifetime, Philistines controlled the city instead.

The Philistine king Achish later gave Ziklag to David as a hideout.

David used it as his base while hiding from King Saul.

Amalekites later raided and burned Ziklag while David's army was away.

🏙️ Ziklag first belonged to Simeon
👑 Philistines later controlled the city
🏹 David hid there from Saul
📖 Amalekites later burned it down

## 🏘️ Thirteen Cities And Their Villages

Cities and villages describes a set pattern used across this whole chapter.

A city usually had walls and stood as the main defended town.

Villages were smaller, unwalled settlements that depended on that city nearby.

Thirteen such city clusters made up Simeon's full southern territory.

One short phrase actually summarizes an entire local defense system.

🏘️ Cities had walls, villages did not
🛡️ Villages relied on a nearby city
🔢 Thirteen clusters made up Simeon's land
📖 A short phrase names a whole system

## 📏 For The Part Of The Children Of Judah Was Too Much For Them

Judah's assigned land had turned out larger than the tribe actually needed.

Simeon received its inheritance carved out from that surplus instead.

Generations earlier, Jacob had predicted trouble for Simeon in Genesis forty nine.

Jacob said he would divide Simeon and scatter him within Israel.

That old prophecy is quietly fulfilled in this very arrangement.

📏 Judah's land was larger than needed
🎁 Simeon inherited from that surplus
📜 Genesis forty nine predicted this
📖 An old prophecy shapes this map

# Joshua 19:10-16
# 🌊 Zebulun's Landlocked Border
---
## 🌊 The Third Lot Came Up For The Children Of Zebulun

Jacob once blessed Zebulun as a tribe living at the haven of the sea.

That blessing in Genesis forty nine promised nearness to ships and trade.

This border description keeps Zebulun's actual land further inland instead.

The tribe touches toward the sea but never fully reaches the coast.

A blessing and an actual boundary do not always draw the same line.

🌊 Genesis forty nine promised sea access
🗺️ This border stays mostly inland
🧭 Zebulun only reaches toward the coast
📖 A promise and a border can differ

## 🧭 Toward The Sea, And Maralah, And Reached To Dabbasheth

This stretch of border ran west, angling toward the coastline.

Maralah and Dabbasheth are otherwise unknown town names today.

Their exact locations have been lost to history over time.

Even forgotten names once marked real, lived in places.

Not every ancient name survives, but each one meant a real home.

🧭 This border ran west toward the coast
❓ Maralah and Dabbasheth are unknown today
🕳️ Their exact locations are now lost
📖 Every name once marked a real home

## 💧 Reached To The River That Is Before Jokneam

Jokneam sat along this river marking part of Zebulun's border.

Later in this book, Jokneam becomes a city set aside for the Levites.

Levites had no land of their own, only scattered cities like this one.

A border marker here quietly becomes someone else's home city later.

Even a boundary line eventually houses people, not just marks land.

💧 Jokneam sat along this river
⛪ It later became a Levite city
🏠 Levites lived in scattered cities
📖 A border marker became a home

## ⛰️ Chislothtabor

Chislothtabor sat near the base of Mount Tabor.

Tabor rose as a distinct, rounded mountain visible for miles around.

Years later, the judge Deborah gathered Israel's army on that same mountain.

Barak led ten thousand men down from Tabor to defeat Sisera's army.

A quiet border town sat in the shadow of a future battlefield.

⛰️ Chislothtabor sat near Mount Tabor
👁️ Tabor stood out for miles
⚔️ Deborah gathered an army there later
📖 A border town near a future battle

## 🏙️ Kattath, And Nahallal, And Shimron, And Idalah, And Bethlehem

This list closes with a town also named Bethlehem.

This is not the famous Bethlehem where Jesus was later born.

That Bethlehem sat in Judah, far to the south of Zebulun.

This smaller Bethlehem sat here in the north instead.

A judge named Ibzan is later linked to a town by this name.

🏙️ This Bethlehem is not Jesus's Bethlehem
🧭 Judah's Bethlehem sat far south
📍 This Bethlehem sat here in Zebulun
📖 One name, two very different towns

## 🔢 Twelve Cities With Their Villages

Twelve cities and their villages complete Zebulun's whole territory.

That total sits smaller than tribes like Judah or the house of Joseph.

Zebulun's blessing in Genesis was never really about the size of the land.

Jacob praised Zebulun for what the tribe would do with its position.

A modest inheritance still carried the promise attached to it.

🔢 Twelve cities finished Zebulun's land
📏 Smaller than tribes like Judah
🌊 The blessing was about position, not size
📖 A modest land, a real promise

# Joshua 19:17-23
# 🌾 Issachar Settles The Fertile Valley
---
## 💰 The Fourth Lot Came Out To Issachar

Issachar's name comes from a word meaning hire or reward.

Leah named him after trading mandrakes for a night with Jacob.

That story appears back in Genesis chapter thirty.

Jacob later blessed Issachar as a tribe content to settle and serve.

A name born from a small bargain now names a fertile territory.

💰 Issachar means hire or reward
🌿 Leah's mandrake trade named him
📜 That story is in Genesis thirty
📖 A small bargain named a territory

## 🌱 Jezreel

Jezreel means God sows, a fitting name for this fertile valley.

King Ahab later built a royal palace here beside Naboth's vineyard.

Ahab and Jezebel had Naboth killed to steal that very vineyard.

The prophet Jehu later carried out judgment on Ahab's family in this valley.

Even Jezebel herself died here, thrown down exactly as Elijah had warned.

🌱 Jezreel means God sows
🍇 Ahab stole Naboth's vineyard here
⚔️ Jehu's judgment fell in this valley
📖 A name of planting, a place of harvest

## 🏠 Shunem

Shunem was home to a woman remembered for her hospitality.

She built a small room on her roof for the prophet Elisha.

When her son died, Elisha raised him back to life there.

That story is told in full in second Kings chapter four.

A quiet farming town became the setting for a resurrection.

🏠 Shunem hosted a hospitable woman
🛏️ She built a room for Elisha
✝️ Her son was raised from death
📖 A town remembered for a miracle

## 🏙️ Rabbith, And Kishion, And Abez

Kishion appears here as one of Issachar's ordinary border towns.

Later, this same city is set apart for the Levites to live in.

Zebulun's Jokneam earlier in this chapter received the same treatment.

The Levites ended up scattered across nearly every tribe's territory.

A pattern is forming across this whole chapter, one city at a time.

🏙️ Kishion sat inside Issachar's land
⛪ It later became a Levite city
🔁 Jokneam saw the same pattern
📖 Levites were scattered through every tribe

## ⛰️ The Coast Reacheth To Tabor

Issachar's border reaches the same Mount Tabor named earlier for Zebulun.

Three tribal borders, Issachar, Zebulun, and Naphtali, all meet near this mountain.

That shared border later mattered when Barak mustered troops from several tribes.

A mountain sitting on three borders became a natural gathering point.

Tribal lines on a map still had to work together in real life.

⛰️ Tabor sits on three tribal borders
🧭 Issachar, Zebulun, and Naphtali all meet
⚔️ Barak later gathered troops here
📖 Borders on paper still had to cooperate

## 🔢 Sixteen Cities With Their Villages

Sixteen cities and their villages completed Issachar's fertile territory.

This was some of the richest farmland anywhere in the whole country.

Jacob's old blessing pictured Issachar settling down rather than fighting for more.

That picture matches this land exactly, wide, fertile, and worth staying for.

A tribe blessed for rest received land built for exactly that.

🔢 Sixteen cities finished Issachar's land
🌾 This was rich farming country
😌 Jacob blessed Issachar to settle down
📖 A tribe built for rest got fertile land

# Joshua 19:24-31
# 🫒 Asher's Rich Coastal Border
---
## 😊 The Fifth Lot Came Out For The Tribe Of The Children Of Asher

Asher's name means happy or blessed.

Leah's servant Zilpah bore him, and Leah said happy am I.

That naming moment is recorded in Genesis chapter thirty.

Jacob later blessed Asher with rich food and royal delicacies.

A name meaning happy fits a tribe promised unusual abundance.

😊 Asher means happy or blessed
🍼 Zilpah bore him to Leah
📜 Genesis thirty records the naming
📖 A happy name, a rich promise

## 🏘️ Helkath, And Hali, And Beten, And Achshaph

These four towns opened Asher's border description.

Their names describe ordinary features such as a field, a shore, or a valley.

Asher's real fame was not these small towns but its olive oil.

Moses later said Asher would dip his foot in oil.

Small border towns sat inside a land famous for one product.

🏘️ Four towns open Asher's border
📛 The names describe local features
🫒 Asher's land was famous for oil
📖 Small towns, one famous product

## ⛰️ Reacheth To Carmel Westward

Carmel here is the same Mount Carmel remembered for a famous contest.

The prophet Elijah later challenged four hundred fifty prophets of Baal there.

Fire fell from heaven on Elijah's altar and proved the LORD was God.

Asher's border touched a mountain that later hosted one of the boldest moments in the Bible.

A border line here quietly reaches a future battlefield of faith.

⛰️ Carmel later hosted Elijah's contest
🔥 Fire fell and proved God real
👑 Baal's prophets were defeated there
📖 A border reaches a future battlefield

## 🏙️ Even Unto Great Zidon

Zidon was a major, wealthy Phoenician trading city on the coast.

The word great marks it as an important, well known city already.

Asher's border reached toward Zidon but never actually conquered it.

A later chapter admits Asher lived among Zidon's people instead of driving them out.

Reaching a border on a map was never the same as controlling it.

🏙️ Zidon was a wealthy trade city
🧭 Asher's border reached toward it
🚫 Asher never conquered the city
📖 A border is not the same as control

## 🏰 The Strong City Tyre

Tyre was another major Phoenician port city, famous for its strong defenses.

King Hiram of Tyre later supplied cedar wood for David's palace.

Hiram's craftsmen also helped build Solomon's temple in Jerusalem.

Centuries later, Jesus himself traveled through the region near Tyre.

A strong coastal city on Asher's border kept reappearing throughout the story.

🏰 Tyre was a strong port city
🌲 Hiram supplied cedar for David
🏛️ Tyre's craftsmen helped build the temple
📖 One city, centuries of later history

## 📍 Cabul On The Left Hand

Cabul marked a point along Asher's northern border here.

Centuries later, Solomon gave twenty cities in this same region to Hiram.

Hiram was displeased and mockingly called that land Cabul, meaning good for nothing.

A border marker's name became a king's insult generations afterward.

One small word here echoes forward into a much later disagreement.

📍 Cabul marked Asher's northern border
🎁 Solomon later gave land here to Hiram
😒 Hiram mocked it as good for nothing
📖 A border name became a king's insult

## 🔢 Twenty And Two Cities With Their Villages

Twenty two cities and their villages completed Asher's rich coastal territory.

That made Asher's list one of the longest in this entire chapter.

Moses once blessed Asher above the other sons in Deuteronomy thirty three.

A tribe born from a servant's son received an unusually generous inheritance.

The last were not always least in how the land was measured out.

🔢 Twenty two cities finished Asher's land
📏 One of the longest lists here
🙏 Moses blessed Asher above his brothers
📖 A generous inheritance for a servant's son

# Joshua 19:32-39
# 🦌 Naphtali's Northern Hills
---
## 🤼 The Sixth Lot Came Out To The Children Of Naphtali

Naphtali's name means my wrestling or my struggle.

Rachel's servant Bilhah bore him, and Rachel said she had wrestled with her sister.

That naming moment is recorded in Genesis chapter thirty.

Jacob later blessed Naphtali as a hind let loose, giving goodly words.

A name born from family struggle became a tribe known for freedom.

🤼 Naphtali means my wrestling
👶 Bilhah bore him to Rachel
📜 Genesis thirty records the naming
📖 A struggle became a tribe of freedom

## 🧭 Judah Upon Jordan Toward The Sunrising

This does not mean the tribe of Judah's main land bordered Naphtali here.

Judah's actual territory sat far to the south, near Jerusalem and Hebron.

The text does not fully explain this brief mention of Judah at this point.

Many scholars believe it may point to a small group settled in this area.

Not every detail in an old boundary list has a fully certain answer.

🧭 Judah's real land sat far south
❓ This mention is not fully explained
📚 Scholars are honestly divided on this
📖 Some details do not have certain answers

## 🎻 Ziddim, Zer, And Hammath, Rakkath, And Chinnereth

Chinnereth was the older name for the lake later called the Sea of Galilee.

The name comes from a word for harp, since the lake's shape resembles one.

Centuries later, Jesus taught, walked on water, and calmed storms on this same lake.

Rakkath sat nearby, and later tradition connects it to the city of Tiberias.

A lake named for a harp became the setting for much of Jesus's ministry.

🎻 Chinnereth means shaped like a harp
🌊 Chinnereth later became the Sea of Galilee
✝️ Jesus later ministered on this same lake
📖 A harp shaped lake, a major ministry

## 🏃 Kedesh

Kedesh later became one of Israel's six cities of refuge.

Anyone who killed someone by accident could flee there for safety.

Kedesh was also set apart as a home for the Levites.

The judge Barak came from this same city generations later.

A single town carried three separate roles across Israel's history.

🏃 Kedesh became a city of refuge
⛪ It was also a Levite city
⚔️ Barak the judge came from here
📖 One town, three later roles

## 🔥 Hazor

This is the same Hazor Joshua already burned back in chapter eleven.

Hazor had ruled as the head of a whole northern coalition of kings.

Joshua spared other conquered cities but chose to destroy this one completely.

Now, years later, its territory simply belongs to Naphtali on a map.

A once mighty capital ended up as one more name on a list.

🔥 Hazor was already burned in chapter eleven
👑 It had led a northern coalition
🏚️ Joshua destroyed it completely
📖 A capital became one name on a list

## 🌊 The Outgoings Thereof Were At Jordan

The Jordan river closed off Naphtali's eastern edge, just like it did for Zebulun.

This same river marked Israel's original crossing point back in Joshua chapter three.

By this point in the book, the Jordan threads through almost every tribe's border.

One river tied together tribes that otherwise never touched each other's land.

The whole conquest began at this river, and it still frames the land's shape.

🌊 Jordan closed Naphtali's eastern border
🚶 Israel crossed this river in chapter three
🧵 The Jordan threads through many borders
📖 One river frames the whole land

## 🔢 Nineteen Cities With Their Villages

Nineteen cities and their villages completed Naphtali's hill country territory.

This land sat in the far north, bordering both Zebulun and Asher.

Jacob's blessing had promised Naphtali freedom and swift, welcome speech.

A hilly northern homeland fit a tribe pictured as quick and free.

The land matched the old blessing almost exactly.

🔢 Nineteen cities finished Naphtali's land
🏔️ This territory sat in the far north
🦌 Jacob pictured Naphtali as free and swift
📖 The land matched the old blessing

# Joshua 19:40-48
# ⚔️ Dan Fights For More Room
---
## ⚖️ The Seventh Lot Came Out For The Tribe Of Dan

Dan's name means he judged or judge.

Rachel said God had judged her case and given her a son through Bilhah.

That naming moment is recorded in Genesis chapter thirty.

Jacob later described Dan as a serpent that ambushes from the side of the road.

A name about judgment fit a tribe that would fight in unexpected ways.

⚖️ Dan means he judged
👶 Bilhah bore him to Rachel
📜 Genesis thirty records the naming
📖 Jacob pictured Dan as an ambusher

## 🏠 Zorah, And Eshtaol

Zorah and Eshtaol together were the childhood home of one famous Israelite.

The judge Samson grew up in this exact area.

An angel first appeared to his parents near these very towns.

Samson was later buried between these two towns as well.

His whole story began and ended in these hills.

🏠 Zorah and Eshtaol raised Samson
👼 An angel appeared here first
💪 Samson's whole life centers on this area
📖 His story began and ended in these hills

## 🏙️ Ekron

Ekron was one of five major Philistine cities, each ruled by its own lord.

Dan's border touched Ekron, putting the tribe right against Philistine territory.

That closeness explains why Dan and the Philistines clashed so often later.

Samson's whole story plays out along this same tense border.

A line on a map here explains a whole later conflict.

🏙️ Ekron was a major Philistine city
🧭 Dan's border sat right against it
⚔️ This closeness led to constant conflict
📖 A border explains a later war

## 📏 The Coast Of The Children Of Dan Went Out Too Little For Them

Dan's assigned strip of land proved too small and too hard to hold.

Powerful Philistine and Amorite neighbors kept pressing in from every side.

A different chapter says the Amorites even forced Dan back into the hills.

This single honest sentence sets up the whole next part of Dan's story.

Not every tribe simply settled and stayed in the land it was given.

📏 Dan's land was too small
⚔️ Strong neighbors kept pressing in
🏔️ Amorites pushed Dan into the hills
📖 This sets up Dan's next move

## 🗡️ Therefore The Children Of Dan Went Up To Fight Against Leshem, And Took It

This single verse compresses a much longer story told fully in Judges eighteen.

Danite spies first scouted this peaceful, undefended northern city called Laish.

On the way they stole a man's idols and hired his private priest.

The full tribe then attacked the city and burned it completely.

One quick verse here hides a much longer and more troubling story.

🕵️ Spies scouted the city first
🗿 They stole idols along the way
🔥 They burned the city completely
📖 Judges eighteen tells the fuller story

## 🏙️ Called Leshem, Dan, After The Name Of Dan Their Father

Leshem was renamed Dan after the tribe's ancestor and founder.

This new city sat far in the north, near the source of the Jordan river.

From then on, Dan to Beersheba became a phrase for the whole land.

Centuries later, King Jeroboam set up a golden calf for worship in this same Dan.

A city won by conquest later became a symbol of Israel's worst idolatry.

🏙️ Leshem was renamed Dan
🗺️ Dan sat at Israel's far north
📏 From Dan to Beersheba covers the whole land
📖 Dan later became a site of idolatry

## 📜 This Is The Inheritance Of The Tribe Of The Children Of Dan

This closing line credits Dan with cities it did not actually keep.

Many of Dan's original coastal cities stayed under Philistine control for years.

The tribe's real story became less about holding land and more about moving.

Judges records Dan searching for a permanent home even after this chapter.

An inheritance on paper and an inheritance in practice were not always the same.

📜 This line closes Dan's official list
🏙️ Many cities stayed under Philistine control
🚶 Dan kept searching for a real home
📖 Paper and practice did not always match

# Joshua 19:49-51
# 🏆 Joshua's Own Reward, Last Of All
---
## ⏳ The Children Of Israel Gave An Inheritance To Joshua The Son Of Nun Among Them

Every other tribe received its land before Joshua ever asked for his own.

Joshua led this entire distribution process without taking anything for himself first.

Caleb had already received his own reward earlier, back in chapter fourteen.

Both men had trusted God as young spies decades before this moment.

A leader who serves first and receives last shows real trustworthiness.

⏳ Joshua waited until everyone else had land
🙌 He led without taking anything first
🤝 Caleb also waited his turn earlier
📖 Serving first proved real trustworthiness

## 🏔️ According To The Word Of The LORD They Gave Him The City Which He Asked, Even Timnathserah

Timnathserah sat in the hill country of Ephraim, Joshua's own tribe.

God had promised through Moses that Joshua would receive a place he asked for.

Joshua chose this specific city instead of having land assigned to him randomly.

The name is later spelled slightly differently as Timnathheres in the book of Judges.

The one who divided everyone else's land finally chose his own.

🏔️ Timnathserah sat in Ephraim's hill country
📜 God promised Moses Joshua would choose it
🙋 Joshua picked this city himself
📖 The divider finally chose his own

## 🏡 He Built The City, And Dwelt Therein

Joshua built up Timnathserah and made it his permanent home.

This was the same hill country he had explored decades earlier as a young spy.

Joshua later died there, and this book records his burial in that very city.

A place he first walked in faith became the place he was finally laid to rest.

One story, beginning as a spy, ending in these same hills.

🏡 Joshua built and lived in this city
🕵️ He had explored these hills as a spy
⚰️ Joshua was later buried here
📖 His story began and ended in these hills

## 🔁 Divided For An Inheritance By Lot In Shiloh Before The LORD

This exact sentence also opened the whole land division back in chapter fourteen.

Eleazar the priest and Joshua led the process together from beginning to end.

Casting lots let God make the final decision rather than human politics.

Shiloh, where the tabernacle now stood, framed the entire process from start to finish.

Six long chapters of dividing land close with the very sentence that began them.

🔁 This sentence also opened chapter fourteen
🤝 Eleazar and Joshua led together
🎲 Lots let God make the final call
📖 Six chapters close with their opening line

## 📜 So They Made An End Of Dividing The Country

This short sentence closes a promise that started centuries earlier with Abraham.

God first promised Abraham this exact land back in Genesis chapter twelve.

Years of wandering and years of conquest stood between that promise and this moment.

The land was never fully conquered yet, but it was now finally divided.

A promise spoken to one man finally became solid ground under twelve tribes.

📜 Genesis twelve first promised this land
⏳ Centuries passed between promise and division
🗺️ The land was divided, though not fully conquered
📖 A promise finally became solid ground
`.trim();

export const JOSHUA_NINETEEN_PERSONAL_SECTIONS = parseJoshuaNineteenRawNotes(JOSHUA_NINETEEN_RAW_NOTES);
