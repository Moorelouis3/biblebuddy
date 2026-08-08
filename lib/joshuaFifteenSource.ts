export type JoshuaFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaFifteenRawNotes(rawText: string): JoshuaFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 15:${startVerse}` : `Joshua 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Joshua 15 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_FIFTEEN_RAW_NOTES = `# Joshua 15:1-4
# 🗺️ Judah's Southern Border Line
---
## 🗺️ This Then Was The Lot Of The Tribe

A lot was a small marked stone or object.

Casting it looked random, but Israel believed God controlled where it landed.

Chapter fourteen already introduced how the land was divided this way.

Judah receives the first and largest territory named in this whole process.

🗺️ Lot means a small marked stone

🎲 Casting it looked random to people

🙏 God controlled the result, Israel believed

📖 Judah's territory is named first here

## 🌵 Even To The Border Of Edom

Edom was the nation descended from Esau, Jacob's brother.

Their land sat southeast of Judah, along the edge of the wilderness.

Naming Edom here marks exactly where Judah's territory would stop.

Two brothers' descendants end up as neighbors on this very border.

🌵 Edom descended from Esau

🧭 Their land bordered Judah's south

📍 This verse marks that boundary

📖 Two brothers' families become neighbors

## 🏜️ The Wilderness Of Zin

Zin was a harsh desert region on Canaan's southern edge.

Kadeshbarnea, mentioned two verses later, sat inside this same wilderness.

Israel camped here for a long stretch during the wilderness years.

This border line runs straight through ground Israel already knew well.

🏜️ Zin was a harsh desert region

📍 Kadeshbarnea sat inside this wilderness

⛺ Israel camped here for years

📖 Judah's border runs through familiar ground

## 📍 Unto Kadeshbarnea

Kadeshbarnea is the same camp from Joshua fourteen.

Caleb was sent out from there to spy on Canaan forty five years earlier.

That same location now marks a corner of his own tribe's border.

The place where his faith was tested becomes part of his people's inheritance.

📍 Kadeshbarnea recalls Joshua fourteen

🕵️ Caleb spied from there long ago

⏳ Forty five years separate the two moments

📖 His faith site becomes his tribe's land

## 🧭 This Shall Be Your South Coast

Coast here is an old word for border, not a shoreline.

Judah's southern edge runs through dry land, far from any sea.

Modern readers picture a beach, but the text means a boundary line.

Every border named in this chapter uses coast the same way.

🧭 Coast means border, not shoreline

🏜️ This edge runs through dry land

📖 The word repeats through the chapter

➡️ Watch for this meaning throughout

# Joshua 15:5-12
# 🕍 Borders That Circle Jerusalem
---
## 🌊 The East Border Was The Salt Sea

The salt sea is what we call the Dead Sea today.

Its water holds so much salt that almost nothing can live in it.

This sea marks Judah's entire eastern boundary, all the way to Jordan's end.

A lifeless sea forms the edge of the tribe's promised inheritance.

🌊 Salt sea means the Dead Sea

🧂 Its high salt content kills nearly everything

🧭 It marks Judah's whole eastern edge

📖 A lifeless sea borders a living inheritance

## 🪨 The Stone Of Bohan The Son Of Reuben

Bohan was a man from the tribe of Reuben.

A large stone bearing his name marked this stretch of the border.

Naming landmarks after real people made borders easy to walk and confirm.

This detail shows how practical, not abstract, these boundary lines actually were.

🪨 A stone marked this border point

👤 Bohan came from the tribe of Reuben

🚶 Named landmarks helped people walk the line

📖 Borders here were practical, not abstract

## 🔥 The Valley Of The Son Of Hinnom

This valley sat just outside Jerusalem's walls.

Centuries later it became a place where child sacrifice was practiced.

By Jesus's time its name, Gehenna, had become a picture of judgment.

A quiet border marker in Joshua grows into a heavy word by the New Testament.

🔥 Hinnom sat outside Jerusalem's walls

😢 It later hosted terrible sacrifices

📖 Its name became Gehenna in the New Testament

➡️ A border marker grew into a warning

## 🏙️ The South Side Of The Jebusite, The Same Is Jerusalem

The Jebusites controlled Jerusalem at this point in the story.

Judah's border runs right along the edge of that city.

Israel will not actually capture Jerusalem itself for a very long time.

David finally takes the city centuries later, in second Samuel chapter five.

🏙️ Jebusites still held Jerusalem here

🧭 Judah's border touched the city's edge

⏳ Israel could not take it yet

📖 David finally captures it much later

## 🗿 The Valley Of The Giants

Giants here translates a Hebrew word for the Rephaim people.

The Rephaim were known for unusual size, much like the Anakims in Hebron.

This valley sat close to Jerusalem, on the northern side of Hinnom.

Fear of giants shaped this whole region's reputation long before Israel arrived.

🗿 Giants here means the Rephaim people

📏 They were known for great size

📍 The valley sat near Jerusalem

📖 Their reputation shaped this whole region

## 🌊 The Great Sea

The great sea is the Mediterranean Sea.

It forms the western edge of Judah's whole territory.

Judah's land now has four clear edges, sea, sea, wilderness, and border stones.

An inheritance is not vague here, it is drawn on the map exactly.

🌊 Great sea means the Mediterranean

🧭 It forms Judah's western edge

🗺️ Four edges frame Judah's land

📖 This inheritance was drawn precisely

# Joshua 15:13-19
# 🏆 Caleb, Othniel, And Achsah
---
## 🎁 Unto Caleb He Gave A Part Among The Children Of Judah

Caleb receives his own portion inside Judah's larger territory.

Chapter fourteen already promised him this exact land.

That promise is now formally carried out here.

A decades old promise finally becomes a legal inheritance.

🎁 Caleb gets his own portion

📜 Chapter fourteen already promised this

✅ The promise is carried out here

📖 A decades old promise becomes reality

## 📜 According To The Commandment Of The LORD To Joshua

This land grant did not come from Joshua's personal choice.

God had already commanded exactly what Caleb should receive.

Joshua's role here is to carry out God's word, not decide it.

Leaders in this story answer to a higher authority than their own judgment.

📜 God commanded this grant

🧑 Joshua only carried it out

🚫 This was not Joshua's own idea

📖 Leaders answer to God's authority

## 🏙️ The City Of Arba The Father Of Anak, Which City Is Hebron

Arba was remembered as the founder of the Anakim people.

Joshua fourteen already explained that Arba was a great man among them.

Hebron carried his name before Israel ever arrived there.

This land came with a history of fear attached to it.

🏙️ Arba founded the Anakim people

🏛️ Hebron carried Arba's name

😨 The land carried real fear too

📖 Joshua fourteen already explained this

## ⚔️ Caleb Drove Thence The Three Sons Of Anak

Sheshai, Ahiman, and Talmai were named leaders among the Anakim.

The ten fearful spies described these very men back in Numbers thirteen.

Caleb personally faces the exact giants that terrified Israel forty five years earlier.

The fear that once stopped a whole nation could not stop one faithful old man.

⚔️ Three named Anakim leaders defeated

😱 The same giants Israel once feared

🕵️ First described back in Numbers thirteen

📖 One man's faith outlasted a nation's fear

## 🚶 He Went Up Thence To The Inhabitants Of Debir

Caleb does not stop after taking Hebron.

Debir was another fortified city, southwest of Hebron in the hill country.

He keeps fighting well into his eighties.

Age never becomes Caleb's excuse to stop trusting God with hard ground.

🚶 Caleb pushes on to Debir

🏰 Debir sat southwest of Hebron

👴 He kept fighting in his eighties

📖 Age never excused him from trusting God

## 🏛️ The Name Of Debir Before Was Kirjathsepher

Kirjathsepher likely means city of the book or city of the scribe.

That name may point to some kind of archive or writing center there.

Renaming a captured city was common practice across this whole region.

A city once linked to writing now belongs to God's people instead.

🏛️ Kirjathsepher likely means city of the book

✍️ It may have housed records or scribes

🔁 Renaming captured cities was common

📖 The city now belongs to Israel

## 🤝 He That Smiteth Kirjathsepher... I Will Give Achsah My Daughter To Wife

Caleb offers his daughter in marriage as a reward for military success.

This custom feels foreign today, but it was normal in the ancient world.

Marriages often sealed alliances or rewarded loyalty rather than starting with romance.

Achsah's story will show she was far from a passive prize.

🤝 Marriage offered as a battle reward

🌍 This custom was normal then

⚔️ Loyalty and alliance often shaped marriage

📖 Achsah proves far from passive

## 🗡️ Othniel The Son Of Kenaz, The Brother Of Caleb

Othniel takes on the challenge and wins Debir.

He is Caleb's own younger relative, not an outsider.

The book of Judges later names Othniel as Israel's very first judge.

A quiet victory here becomes the start of a much bigger calling.

🗡️ Othniel wins the city of Debir

👨‍👦 He was Caleb's younger relative

⚖️ Judges later names him Israel's first judge

📖 A small victory starts a bigger calling

## 🐴 She Moved Him To Ask Of Her Father A Field, And She Lighted Off Her Ass

Achsah urges Othniel to ask Caleb for more land.

When that does not seem to move fast enough, she goes herself.

Lighting off her donkey was a formal gesture, a sign of respect before a request.

She approaches her father boldly, but she still honors the proper custom.

🐴 She dismounts as a formal gesture

🙇 The gesture showed respect before asking

🗣️ She speaks to Caleb herself

📖 Bold and respectful at the same time

## ❓ Caleb Said Unto Her, What Wouldest Thou

Caleb responds with an open, welcoming question.

He does not dismiss his daughter's approach as improper or unwelcome.

A father in this culture had every right to refuse such a request.

Instead, he invites her to say plainly what she wants.

❓ Caleb welcomes her question

🚪 He does not turn her away

👴 Fathers could easily have refused

📖 He invites her to speak plainly

## 💧 Give Me Also Springs Of Water

Achsah already received dry southern land as part of her dowry.

In this desert region, springs of water mattered more than open acres.

She asks for the one resource that would make her land actually livable.

Her request is practical, not greedy, a plea for what she truly needs.

💧 Springs mattered more than dry acres

🏜️ Her given land needed water

🎯 The request was practical, not greedy

📖 She asks for what she needs

## 🌊 The Upper Springs, And The Nether Springs

Caleb does not give Achsah just one spring.

He gives her both the upper and the lower water sources.

That is more than she directly asked for in her request.

A generous father closes this whole family story on a note of blessing.

🌊 Caleb gives both spring sources

➕ That is more than she asked

👴 A generous, willing father

📖 The family story closes in blessing

# Joshua 15:20-32
# 📜 The Cities Of The South
---
## 📖 This Is The Inheritance Of The Tribe Of The Children Of Judah

This line closes the border description and opens a new list.

What follows names the actual cities inside those borders.

A border only means something once real towns fill it in.

The chapter moves from drawing lines to naming lived in places.

📖 This line closes the border section

🏘️ A new city list begins here

🗺️ Borders become real through named towns

➡️ The chapter shifts from lines to places

## 🏴 The Uttermost Cities... Toward The Coast Of Edom Southward

Uttermost means the farthest, outermost towns of the territory.

These cities sat right at the edge, closest to Edom's border.

Frontier towns like these often served as lookout points or defense lines.

Judah's safety depended on who controlled these outer edges first.

🏴 Uttermost means the farthest towns

🧭 These sat right at Edom's edge

🛡️ Frontier towns often guarded the border

📖 Judah's safety began at these edges

## 🏹 Ziklag

Ziklag appears here as one small town in Judah's southern list.

Many years later a Philistine king gives this same town to David.

David uses Ziklag as his base while hiding from king Saul.

A minor name in a list becomes the site of a king's exile.

🏹 Ziklag was one small border town

👑 David later receives this same city

🏕️ He used it as a hiding base

📖 A minor name becomes a king's refuge

## 💧 Beersheba

Beersheba means well of the oath in Hebrew.

Abraham dug a well and made a treaty there generations earlier.

Isaac later confirmed that same well and treaty for himself.

This ancient family site now becomes part of Judah's official territory.

💧 Beersheba means well of the oath

👴 Abraham dug the well long ago

👨‍👦 Isaac confirmed it again later

📖 A family site becomes tribal land

## 🔢 All The Cities Are Twenty And Nine, With Their Villages

Villages here means small, unwalled settlements near a larger walled city.

The exact count, twenty nine, was not a guess.

Numbers like this functioned as an official legal record, not decoration.

A careful count protected each family's claim for generations to come.

🔢 Twenty nine was an exact count

🏘️ Villages means small unwalled settlements

📜 This functioned as a legal record

📖 Exact counts protected future claims

# Joshua 15:33-44
# 🌾 The Lowland Cities Of Judah
---
## 🌾 In The Valley

This valley region is often called the Shephelah.

It sits between the coastal plain and the higher hill country.

Its rolling, fertile land made it valuable and easy to fight over.

Many major Bible stories take place in this exact strip of land.

🌾 This region is called the Shephelah

🗺️ It sits between coast and hills

🌱 Fertile land made it valuable

📖 Major Bible stories happen right here

## 🕳️ Adullam

Adullam later becomes famous because of a cave near the town.

David hides there from king Saul for a season.

Discouraged and struggling men gather around David at that very cave.

A name in a boundary list becomes a turning point in David's story.

🕳️ Adullam is known for its cave

👑 David hid there from Saul

🤝 Struggling men gathered around him there

📖 A list name becomes a turning point

## ⚔️ Socoh, And Azekah

Socoh and Azekah sit on either side of the valley of Elah.

That same valley later hosts the fight between David and Goliath.

The armies of Israel and Philistia camp on hills near these very towns.

This short city list quietly names the ground of one of scripture's most famous battles.

⚔️ These towns frame the valley of Elah

🥊 David faces Goliath in that valley

🏕️ Both armies camped near these towns

📖 A famous battle happened right here

## 🏰 Lachish

Lachish grows into one of Judah's most important fortified cities.

Assyrian armies later lay siege to it under king Hezekiah.

The prophet Isaiah addresses that exact crisis in his writing.

This small mention in Joshua marks the start of a city with a long, dramatic future.

🏰 Lachish became a major fortress city

⚔️ Assyria later laid siege to it

📖 Isaiah addresses that exact crisis

➡️ A small mention hides a big future

## 🌾 Mareshah

Mareshah sat near Lachish in this same lowland district.

Later generations of kings fortified it for defense.

A prophet named Eliezer is later connected to this town in Chronicles.

Even a briefly named city still carries its own quiet thread through scripture.

🌾 Mareshah sat near Lachish

🏰 Later kings fortified this town

📜 Chronicles later names it again

📖 Small cities still carry real history

## 🔢 Fourteen Cities With Their Villages

This exact phrase repeats after every district in the list.

It is not filler or a copy paste mistake.

Each repetition marks a separate, carefully counted section of land.

The repetition itself is evidence of how carefully this record was kept.

🔢 This phrase repeats after each district

📋 It marks a separate counted section

✅ Not filler, but careful counting

📖 Careful records protected every family's claim

# Joshua 15:45-47
# 🏙️ Philistine Cities Judah Never Fully Held
---
## 🏛️ Ekron, With Her Towns And Her Villages

Ekron was one of the five major Philistine cities.

Judah's border technically included Ekron on paper.

Philistines actually kept real control of this city for centuries.

An allotment on a map did not always mean actual possession.

🏛️ Ekron was a major Philistine city

📜 It was listed inside Judah's border

👑 Philistines actually kept control there

📖 A map claim was not automatic possession

## ⚓ Unto The Sea, All That Lay Near Ashdod

Ashdod was another of the five major Philistine cities.

A captured ark of the covenant is later brought there in first Samuel.

Ashdod's own god, Dagon, famously falls before that ark.

This coastal city plays a real role much later in Israel's story.

⚓ Ashdod was a major Philistine city

📦 The ark was later held there

🗿 Dagon their god fell before it

📖 This city returns later in scripture

## 🏜️ Gaza... Unto The River Of Egypt

Gaza marked the southernmost edge of Philistine territory.

The river of Egypt likely refers to a seasonal stream, not the Nile itself.

This line marks the outer limit of the whole promised land.

Judah's boundary reaches all the way to the edge of Egypt's border.

🏜️ Gaza sat at Philistia's southern edge

🌊 The river of Egypt was a seasonal stream

🧭 This marks the promised land's outer limit

📖 Judah's border reached toward Egypt

## ⚔️ Territory Claimed, Not Always Territory Held

This whole coastal strip belonged to Judah by God's grant.

Judges and first Samuel both show ongoing Philistine conflict in this same region.

The land was promised in full, even where Israel had not yet taken it.

A promise being true does not always mean it is finished being fulfilled.

⚔️ Philistine conflict continues for centuries

📜 The land was promised in full

⏳ Fulfillment and possession were not the same

📖 God's promises can outlast slow obedience

# Joshua 15:48-60
# ⛰️ The Hill Country Towns
---
## ⛰️ In The Mountains

This phrase marks the start of the hill country district.

These towns sat higher and were harder to reach than the lowland cities.

Height often meant safety from enemy chariots and easier defense.

Judah's territory covers coast, lowland, and highland ground all at once.

⛰️ Marks the start of hill country

🏔️ Higher towns were harder to reach

🛡️ Height helped defend against chariots

📖 Judah's land spans coast to highland

## 📚 Kirjathsannah, Which Is Debir

This is the very same Debir from Caleb and Othniel's story earlier.

It appears again here, listed formally among the hill country towns.

The narrative and the city list are describing the same real land.

A story readers just watched unfold gets confirmed again in the official record.

📚 Same Debir from Caleb's story

📋 Now listed in the formal record

🔁 Narrative and list describe one land

📖 A story gets confirmed in the record

## 🏛️ Kirjatharba, Which Is Hebron

This is Caleb's own city, named here again by its older title.

Kirjatharba, meaning city of Arba, was explained back in verse thirteen.

Seeing it twice shows how carefully this list matches the earlier narrative.

Caleb's personal story and Judah's official land registry agree on the same ground.

🏛️ Kirjatharba is Hebron, Caleb's city

📖 Already explained back in verse thirteen

🔁 The list matches the earlier story

➡️ Caleb's story and the registry agree

## 🐑 Maon, Carmel... Ziph

This exact wilderness district shows up again generations later.

David hides from king Saul in this same rugged country.

Nabal, a wealthy man from Carmel, later refuses to help David here.

Names in a boundary list quietly become the backdrop for a future king's hardest years.

🐑 This district reappears in David's story

🏃 David hid from Saul in this land

👨‍🌾 Nabal of Carmel later refuses him

📖 A list becomes a future king's backdrop

## 🗣️ Ziph

The men of Ziph later betray David's hiding place to Saul.

That betrayal happens twice, in first Samuel chapters twenty three and twenty six.

Ziph's name in this quiet list carries a much darker story later on.

Not every town in this list stays neutral once the bigger story unfolds.

🗣️ Ziphites later betray David's location

🔁 This happens twice in first Samuel

😔 A quiet name hides a darker story

📖 Not every town stays neutral later

## 🕍 Kirjathbaal, Which Is Kirjathjearim

Kirjathjearim becomes deeply important after this chapter.

The ark of the covenant rests there for about twenty years.

It stays there until David finally brings it to Jerusalem.

A town named once in a border list becomes the ark's long resting place.

🕍 Kirjathjearim held the ark later

⏳ It stayed there about twenty years

👑 David eventually brought it to Jerusalem

📖 A border town becomes the ark's home

# Joshua 15:61-63
# 🏜️ The City Judah Could Not Take
---
## 🌴 In The Wilderness... Engedi

Engedi was a lush oasis on the edge of the Dead Sea.

Fresh springs there supported life in the middle of dry desert.

David later hides in caves near Engedi while fleeing from Saul.

A green refuge inside a harsh wilderness makes an ideal hiding place.

🌴 Engedi was a desert oasis

💧 Fresh springs supported life there

🏃 David later hid there from Saul

📖 A green refuge inside a harsh land

## 🧂 The City Of Salt

This town sat somewhere near the Dead Sea's mineral rich shore.

Its name likely came from the salt deposits common in that area.

Very little else is recorded about this particular city.

Even a barely mentioned town still earned its place in Judah's official record.

🧂 Named for nearby salt deposits

📍 Located near the Dead Sea

❓ Little else is recorded about it

📖 Even small towns earned a place here

## 🚫 The Jebusites... Could Not Drive Them Out

Jerusalem was technically inside Judah's allotted border.

Judah tried but failed to remove the Jebusites who lived there.

This admission breaks the pattern of clean, total victories in this book.

The conquest of Canaan was real, but it was not yet finished everywhere.

🚫 Judah could not remove the Jebusites

🏙️ Jerusalem sat inside their own border

😔 This breaks the pattern of clean wins

📖 The conquest was real but unfinished

## 📅 Dwell With The Children Of Judah At Jerusalem Unto This Day

Unto this day means the writer is speaking from years later.

The Jebusites and Judah's people lived side by side for a long stretch.

Jerusalem does not fully come under Israel's control until David's reign.

A single failure recorded honestly here waits generations for God's promise to catch up.

📅 Unto this day marks a later writer

🏘️ Jebusites and Judah lived side by side

👑 David finally secures the city later

📖 Honest failure still waits on God's promise
`.trim();

export const JOSHUA_FIFTEEN_PERSONAL_SECTIONS = parseJoshuaFifteenRawNotes(JOSHUA_FIFTEEN_RAW_NOTES);
