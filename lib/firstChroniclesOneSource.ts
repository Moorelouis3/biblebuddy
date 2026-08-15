export type FirstChroniclesOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesOneRawNotes(rawText: string): FirstChroniclesOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 1:${startVerse}` : `1 Chronicles 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 1 Chronicles 1 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_ONE_RAW_NOTES = `
# FirstChronicles 1:1-4
# 🌍 Ten Generations From Adam To Noah
---
## 👤 Adam, Sheth, Enosh

This is not a new story.

Genesis five already recorded this same line of names in full detail.

Genesis five gave each man an age, a lifespan, and one repeated line.

That line was always "and he died."

Chronicles strips all of that away and keeps only the names.

The first readers already knew these stories and only needed the spine.

👤 Same line of names as Genesis five

📜 Genesis gave ages and full stories

✂️ Chronicles keeps only the bare names

📖 The spine, not the story, is the point

---

## 🕳️ Kenan, Mahalaleel, Jered

These three names sit in the middle of the line before the flood.

Almost nothing else is recorded about them anywhere in Scripture.

A reader might expect Chronicles to explain who they were.

Instead these bare names are left to carry the weight by themselves.

Being remembered by name, generation after generation, was itself an honor in this culture.

🕳️ Barely mentioned anywhere else in Scripture

🔗 No extra stories attached to these names

⛓️ The unbroken chain itself is the point

📖 Being remembered by name was an honor

---

## 🚶 Henoch, Methuselah, Lamech

"Henoch" is the same man usually spelled Enoch in English Bibles.

Genesis says Enoch walked with God and did not die like everyone else.

Methuselah is remembered elsewhere as the oldest man in the Bible.

Neither famous detail is repeated here.

Chronicles trusts the reader already knows both stories.

The list moves at the same steady pace either way.

🚶 Henoch is the Enoch who walked with God

👴 Methuselah lived longer than anyone else

🤐 Neither famous detail is repeated here

📖 The list moves at one steady pace

---

## 🌊 Noah, Shem, Ham, And Japheth

The list finally slows down at Noah.

Genesis six through nine covers his story in full detail.

Naming his three sons here sets up the rest of this chapter.

Every nation listed in the verses ahead traces back to one of these three men.

This short verse is really the chapter's table of contents.

🌊 Noah is the flood generation

👪 Shem, Ham, and Japheth are his three sons

🌍 Every nation ahead traces to one of them

📖 This verse is the chapter's table of contents

# FirstChronicles 1:5-7
# 🚢 The Sons Of Japheth
---
## 🧭 The Sons Of Japheth

Japheth's seven sons became ancestors of peoples who settled north and west of Israel.

That region stretched across Asia Minor.

It also reached around the Mediterranean and Black Seas.

Genesis ten already listed this same family in more detail.

There it was called the table of nations.

Chronicles repeats it here for a reason.

It reminds Israel, after the exile, that their story fits inside the story of the whole world.

🧭 Japheth's line settled north and west

📜 Genesis ten already told this story

🌍 Israel's story fits inside the world's story

📖 God's people were never meant to be isolated

---

## 🗺️ Ashchenaz, And Riphath, And Togarmah

These three men were grandsons of Japheth through his son Gomer.

They are usually tied to peoples who settled the region later known as Armenia and Anatolia.

The name Togarmah reappears centuries later in Ezekiel's prophecy.

There it names part of a coalition marching against Israel.

A name buried in a genealogy can resurface as a real player much later in the story.

🗺️ Linked to the region of Armenia

🔮 One small name gains new weight later

🔁 Genealogy names can resurface in later books

📖 Togarmah reappears later in Ezekiel

---

## 🌊 Elishah, And Tarshish, Kittim, And Dodanim

These four names are usually tied to peoples who settled the coasts and islands of the Mediterranean Sea.

Tarshish becomes especially important later in the Bible.

It shows up as a distant, wealthy trading port.

Jonah tries to flee toward it instead of obeying God.

Kittim is generally linked to the island of Cyprus.

A single word in a list here becomes a real destination in a story readers already know.

🌊 Linked to Mediterranean coasts and islands

⛵ Tarshish is the port Jonah flees toward

🏝️ Kittim is linked to Cyprus

📖 A list name becomes a real place later

# FirstChronicles 1:8-12
# 🏜️ The Sons Of Ham
---
## 🌍 The Sons Of Ham

Ham's four sons became ancestors of nations that settled mostly south and west of Israel.

That included parts of Africa and the land of Canaan itself.

Mizraim is the Hebrew name for Egypt.

Israel would later spend four hundred years enslaved in that same nation.

Canaan is the very land God later promises to Abraham's descendants.

Two of the Bible's biggest storylines both trace back to this one verse.

🌍 Ham's sons settled south and west

🏺 Mizraim is the Hebrew name for Egypt

🗺️ Canaan is the promised land itself

📖 Two major storylines start in this verse

---

## 🗺️ Seba, And Havilah

Cush's five sons are generally linked to regions along the Red Sea and the Arabian peninsula.

These names rarely appear again anywhere else in the Bible.

Their value here is not in what happens to them later.

It is in showing that this family tree was recorded completely, not selectively.

Chronicles was written to prove Israel's identity by keeping the whole record.

🗺️ Linked to the Red Sea region

🤐 These names rarely reappear later

📋 The record is complete, not selective

📖 Full identity required a full record

---

## 🏹 Cush Begat Nimrod

"Mighty" does not simply mean strong here.

Genesis ten explains Nimrod became a mighty hunter and the founder of the first great kingdoms.

Those kingdoms included Babel.

He is the only individual in this entire chapter singled out with his own short comment.

That one line points back to a man readers already knew.

He built the tower that divided the nations.

🏹 Nimrod was a mighty hunter and king

🏙️ He founded the first great kingdoms

🗼 Genesis ten ties him to Babel

📖 One name is singled out, as a warning

---

## 🗺️ Ludim, And Anamim

These four sons of Mizraim are generally linked to different peoples within ancient Egypt and Libya.

None of them becomes individually important later in Scripture.

Together they flesh out how large Egypt's own family line already was.

A nation as significant as Egypt needed more than one line to describe where it came from.

🗺️ Linked to Egypt and Libya

🤐 None becomes individually important later

🌍 Together they show Egypt's size

📖 A major nation needed a full family line

---

## ⚔️ Of Whom Came The Philistines

This short note is the whole reason this verse matters.

It quietly names the ancestry of the Philistines.

The Philistines become Israel's most persistent later enemy.

"Caphthorim" is usually linked to the island of Crete.

Other Bible passages call the Philistines "Caphtorim," from Caphtor.

A people who fill the books of Judges and Samuel trace back to one line in an Egyptian family list.

⚔️ Names the ancestry of the Philistines

🏝️ Caphthorim is linked to Crete

🔗 Their origin is kept on record too

📖 Judges and Samuel feature this enemy

# FirstChronicles 1:13-16
# 🏛️ Canaan's Sons, The Peoples Of The Land
---
## 🌊 Zidon His Firstborn, And Heth

"Zidon" is the city later called Sidon, a major Phoenician port.

"Heth" becomes the ancestor of the Hittite people.

Firstborn status usually carried special rights and honor in this culture.

Naming Zidon as firstborn marks him as the lead son among Canaan's many descendants.

Both of these names will resurface constantly once Israel is actually living in the land.

🌊 Zidon becomes the city of Sidon

🏛️ Heth becomes the Hittite people

👑 Firstborn marked the lead son

📖 Both names return once Israel settles the land

---

## ⚔️ The Jebusite Also, And The Amorite

These are among the nations Israel is repeatedly commanded to drive out of Canaan.

The Jebusites in particular hold Jerusalem itself for generations.

David does not capture the city from them until much later.

The original audience already knew each of these names as a real enemy their ancestors fought.

The promised land did not sit empty when Israel arrived.

⚔️ Nations Israel was told to drive out

🏙️ Jebusites held Jerusalem until David

👥 Original readers knew these as real enemies

📖 The promised land was already filled

---

## 🎭 The Hivite, And The Arkite, And The Sinite

The Hivites reappear later in Joshua.

There they trick Israel into a peace treaty through deception at Gibeon.

The Arkite and Sinite peoples are tied to regions along the coast of ancient Phoenicia.

That area sits in what is now Lebanon.

None of these three groups plays as large a role later as the Hivites do.

🎭 Hivites later trick Israel at Gibeon

🌊 Arkite and Sinite are Phoenician coastal peoples

🤐 Smaller groups, still real history

📖 Every name had a real place

---

## 🏔️ The Arvadite, And The Zemarite, And The Hamathite

These final three Canaanite peoples are linked to cities further north along the coast.

One of those cities was Hamath.

Hamath later marks the northern boundary of the promised land in several other passages.

The list of Canaan's sons ends exactly where Israel's northern border will later be drawn.

This genealogy quietly maps out the very borders Israel will later fight to reach.

🏔️ Linked to cities further north

📏 Hamath marks Israel's later northern border

🗺️ The list ends at that same border

📖 The genealogy maps Israel's future borders

# FirstChronicles 1:17-23
# 📜 The Sons Of Shem
---
## 👑 The Sons Of Shem

Shem's line matters more than Ham's or Japheth's for one simple reason.

It leads straight to Abraham.

Asshur becomes the nation of Assyria, one of Israel's later conquerors.

Aram becomes the region of Syria.

Uz is usually linked to the homeland of Job.

This is the line the rest of the Bible keeps following, all the way to the promised family.

👑 Shem's line leads to Abraham

🏹 Asshur becomes Assyria

🗺️ Aram becomes Syria, Uz is Job's homeland

📖 The Bible keeps following this one line

---

## 🔤 Arphaxad Begat Shelah, And Shelah Begat Eber

"Eber" is almost certainly the root behind the word "Hebrew."

That word later names Abraham and his descendants.

This is not stated directly here, but the sound and the timing line up closely.

Most scholars accept the connection.

A word Israel used for its own identity may trace back to one ancestor's name.

That ancestor lived generations before Abraham was even born.

🔤 Eber likely gives the word Hebrew

👤 Comes generations before Abraham

🔗 Ties Israel's name to one ancestor

📖 The chapter explains Israel's own name

---

## ✂️ The Name Of The One Was Peleg

"Peleg" sounds like the Hebrew word for divided.

His name was chosen to mark a real event in his own lifetime.

Most readers connect this division to the tower of Babel.

That was when God confused the languages and scattered the nations across the earth.

Naming a child after a world changing event permanently recorded history inside a family tree.

✂️ Peleg sounds like divided

🗼 Likely tied to the tower of Babel

🗣️ Saying his name repeated the story

📖 The name recorded a real event

---

## 🔀 His Brother's Name Was Joktan

Joktan becomes the ancestor of thirteen sons, listed in the next few verses.

Peleg stays connected to the main line leading to Abraham.

Joktan's branch heads off toward Arabia instead.

It does not lead anywhere else in Scripture.

Two brothers, born in the same household, end up representing two very different paths.

🔀 Joktan fathers thirteen sons

🗺️ His branch heads toward Arabia

👬 Two brothers, two different paths

📖 One line continues, the other exits here

---

## 🗺️ Almodad, And Sheleph, And Hazarmaveth, And Jerah

These four sons of Joktan are generally linked to regions across the Arabian peninsula.

"Hazarmaveth" likely survives today in the name of the Hadramaut region of Yemen.

None of these names carries forward into any later Bible story.

Their purpose here is completeness.

A branch that leaves the main storyline still gets recorded in full.

🗺️ Linked to the Arabian peninsula

📍 Hazarmaveth may survive as Hadramaut

🤐 None reappears later in Scripture

📖 Even a side branch gets recorded fully

---

## 🏙️ Hadoram Also, And Uzal, And Diklah

These three continue the same list of Joktan's Arabian descendants.

"Uzal" is traditionally linked to the ancient name for the city now called Sanaa.

Sanaa is the capital of modern Yemen.

The pattern holds here too.

Names are tied to real places, none of them tied to a later Bible story.

🗺️ More of Joktan's Arabian sons

🏙️ Uzal is linked to ancient Sanaa

🤐 No later story attached

📖 A place can be honored without returning later

---

## 👑 Ebal, And Abimael, And Sheba

This "Sheba" is a different man from the grandson of Cush also named Sheba back in verse nine.

The same name can appear in more than one family branch.

The Bible later associates the name Sheba with a wealthy kingdom.

That kingdom is possibly in southern Arabia, home to the queen of Sheba.

A careful reader has to track which Sheba, and which family line, before assuming two are the same.

🔁 A different Sheba than verse nine

👑 Later linked to the queen of Sheba's kingdom

👥 Repeated names appear across branches

📖 Careful readers track each name's line

---

## 🥇 Ophir, And Havilah, And Jobab

"Ophir" later becomes famous as a source of gold for Solomon's temple.

Its exact location is still debated today.

The closing line, "all these were the sons of Joktan," formally seals off this branch.

Thirteen sons total came from Joktan.

That number matches the completeness this chapter has aimed for since verse one.

The line that matters for the rest of the Bible was never Joktan's line.

🥇 Ophir later supplies gold for the temple

🔒 The closing line seals off this branch

🔢 Thirteen sons total from Joktan

📖 The line that matters continues through Peleg

# FirstChronicles 1:24-27
# 🕊️ From Shem To Abraham
---
## 🧵 Shem, Arphaxad, Shelah

This short list repeats names already given a few verses earlier.

Now everything else has been stripped away.

Every side branch has been cut out entirely.

That includes all thirteen of Joktan's sons.

Only the ten generations connecting Shem directly to Abraham remain.

Chronicles wants this single, unbroken thread to stand out clearly.

🔁 Repeats names from earlier verses

✂️ Every side branch is cut away

🧵 Only the ten generation thread remains

📖 The main line is made to stand out

---

## 🤝 Eber, Peleg, Reu

"Reu" appears here for the first time in this chapter.

He is a son of Peleg, not mentioned in the earlier list.

His name is thought to relate to a word meaning friend or companion.

Little else is recorded about him anywhere in Scripture.

He is still a genuine link in the chain, even without a story attached.

🆕 Reu appears here for the first time

🤝 His name may mean friend

🤐 Almost nothing else is recorded

📖 A real link, even without a story

---

## 👴 Serug, Nahor, Terah

Terah is Abraham's own father.

Genesis eleven names him as the one who first set out from Ur toward Canaan.

He stopped partway, in the city of Haran.

Nahor shares his name with Abraham's own brother.

Names repeated across generations were common in this family.

The list has now arrived one generation before the man the rest of the Bible builds toward.

👴 Terah is Abraham's own father

🔁 Nahor's name repeats within the family

👣 One generation from Abraham

📖 Every earlier name led to this moment

---

## 🔤 Abram, The Same Is Abraham

This one line closes the genealogy that began with Adam.

That was fifty four verses earlier in this chapter, and thousands of years earlier in the story itself.

"Abram" was his original name.

God later changed it to "Abraham," meaning father of many nations, in Genesis seventeen.

Chronicles uses the later, covenant name here.

That choice reminds a discouraged post exile audience which promise they still belonged to.

🏁 Closes the line that began with Adam

🔤 Abram was renamed Abraham later

🤝 The covenant name is used here

📖 The whole chapter builds toward one man

# FirstChronicles 1:28-31
# 👶 The Sons Of Abraham
---
## 👶 The Sons Of Abraham, Isaac And Ishmael

Abraham had two sons named here.

Genesis records more sons born later, through another wife.

Isaac was the promised son, born to Sarah in her old age exactly as God had said.

Ishmael was born earlier, through Sarah's servant Hagar.

That happened when Sarah doubted the promise could still come true.

Listing Ishmael first here does not rank him above Isaac.

👶 Isaac was the promised son

🤱 Ishmael was born through Hagar

⏳ Isaac came through God's own timing

📖 Order here is not about rank

---

## 🏛️ The Firstborn Of Ishmael, Nebaioth

Genesis twenty five already recorded this same list of Ishmael's twelve sons.

There they are called princes over twelve tribes.

"Nebaioth" is usually linked to a people later known as the Nabateans.

The Nabateans eventually built the famous city of Petra.

Naming the firstborn first followed the same custom of honor used throughout this genealogy.

📜 Genesis twenty five records this list too

🏛️ Nebaioth is linked to the later Nabateans

👑 Firstborn named first, as usual

📖 Ishmael still received a full record

---

## ⛺ Kedar, And Adbeel, And Mibsam

"Kedar" becomes one of the most frequently mentioned Arab tribes anywhere else in the Old Testament.

It appears often in the poetry of Psalms and Song of Solomon.

Adbeel and Mibsam are mentioned only here.

The only other place is the parallel list in Genesis.

No further Bible history is attached to either name.

A name's later fame or silence did not affect whether it earned a place in the record.

⛺ Kedar becomes a well known Arab tribe

🤐 Adbeel and Mibsam stay mostly silent

⚖️ Fame did not change their place here

📖 Every name got equal respect

---

## 🏜️ Mishma, And Dumah, Massa, Hadad, And Tema

"Dumah" and "Tema" both later appear as place names in the desert regions of Arabia.

Both are tied to real oasis towns along ancient trade routes.

"Massa" likely gives its name to a tribe.

That tribe shows up in the wisdom sayings recorded in Proverbs thirty one.

These sons of Ishmael did not simply vanish from history.

Their names attached themselves permanently to real places on the map.

🏜️ Dumah and Tema became desert towns

🗺️ Names attached to real places

🧭 The genealogy doubles as a map

📖 Massa likely appears in Proverbs thirty one

---

## 🔒 Jetur, Naphish, And Kedemah

"Jetur" is usually linked to the later region of Ituraea.

The New Testament names that territory as the land Philip governs in Luke's Gospel.

Twelve sons total complete Ishmael's line here.

That number echoes God's earlier promise that Ishmael would father twelve princes.

Closing the phrase with "these are the sons of Ishmael" formally seals off his branch.

God kept His promise to Ishmael in full, even though Ishmael was never the child of the covenant.

🗺️ Jetur is linked to New Testament Ituraea

🔢 Twelve sons fulfill God's earlier promise

🔒 The phrase formally closes this branch

📖 God kept His word to Ishmael too

# FirstChronicles 1:32-34
# 🌿 Keturah's Sons, And Isaac And Israel
---
## 🤱 The Sons Of Keturah, Abraham's Concubine

Keturah was a wife Abraham took after Sarah died.

Genesis twenty five mentions her only briefly.

"Concubine" here describes a wife of secondary standing.

She did not receive the same inheritance rights given to Sarah's son Isaac.

Six more sons came through her, in addition to Isaac and Ishmael.

Abraham's family was far larger than the two sons most readers remember him for.

🤱 Keturah married Abraham after Sarah died

📜 Concubine meant secondary standing

👶 Six more sons came through her

📖 Abraham's family was larger than two sons

---

## 🐫 Zimran, And Jokshan, And Medan, And Midian

"Midian" is the most important name in this list.

His descendants become the Midianites, a nation that appears repeatedly later in Scripture.

Moses marries a Midianite woman.

Gideon later fights a massive Midianite army in the book of Judges.

The other five sons here never reappear anywhere else in the Bible.

🐫 Midian's line becomes the Midianites

👰 Moses marries a Midianite woman

⚔️ Gideon later fights Midian in Judges

📖 One brother's line shaped later history

---

## 🔁 The Sons Of Jokshan, Sheba And Dedan

This is a third Sheba and Dedan pairing in this chapter alone.

It is distinct from the Sheba descended from Cush earlier.

It is also distinct from the Dedan descended from Raamah in verse nine.

Repeated names across unrelated branches were common enough in this culture.

Readers were expected to track them by context.

These particular descendants are usually linked to trading peoples in the Arabian peninsula.

🔁 A third Sheba and Dedan pairing

👥 Repeated names were tracked by context

🐫 Linked to Arabian trading peoples

📖 The text expects a careful reader

---

## 🎁 The Sons Of Midian, Ephah And Epher

"Ephah" later appears by name in Isaiah's prophecy.

There he is pictured bringing gold and incense to worship the Lord alongside the nations.

The name "Henoch" appears here for a third time in this chapter.

It belongs to yet another unrelated family line.

These five sons complete Midian's own family here.

The chapter then moves fully back to the main covenant line.

🎁 Ephah later appears in Isaiah's prophecy

🔁 Henoch's name repeats a third time here

🔒 These five complete Midian's own line

📖 Even a future enemy gets named here

---

## 🔒 All These Are The Sons Of Keturah

This closing phrase seals off Keturah's entire branch.

The same pattern was used for Joktan and for Ishmael earlier in the chapter.

Three branches have now been fully recorded and closed.

Those are Ishmael's, Keturah's, and soon Esau's.

Each closure narrows the family tree one branch at a time.

The chapter is systematically ruling out every line except the one it is building toward.

🔒 Seals off Keturah's whole branch

🔢 Three branches now fully closed

✂️ Each closure narrows the family tree

📖 The chapter is ruling out every other line

---

## 👑 Abraham Begat Isaac, The Sons Of Isaac

After three side branches, the text finally returns to Isaac.

Isaac is the son of the covenant promise.

"Israel" here is Jacob, using the covenant name God gave him.

That name came after he wrestled at Peniel in Genesis thirty two.

Using "Israel" instead of "Jacob" signals which son actually carries the promise forward.

The genealogy has spent many verses clearing away every branch that will not lead to God's people.

↩️ The text returns to Isaac's line

🤼 Israel is Jacob's covenant name from Genesis

👑 The name signals who carries the promise

📖 Every other branch has been cleared away

# FirstChronicles 1:35-42
# ⛰️ The Sons Of Esau And Seir
---
## 👬 The Sons Of Esau

Esau is Jacob's twin brother.

He sold his birthright for a bowl of stew back in Genesis twenty five.

His five sons here become the ancestors of the nation of Edom.

Edom becomes Israel's neighbor and frequent rival to the southeast.

Genesis thirty six already recorded this same family in more detail.

The line that was passed over for the covenant still gets a full, respected record here.

👬 Esau is Jacob's twin brother

🍲 He sold his birthright for stew

🗺️ His sons become the nation of Edom

📖 The passed over line still gets a record

---

## ⚔️ The Sons Of Eliphaz, Amalek

"Amalek" here becomes the ancestor of the Amalekites.

That nation attacks Israel without provocation during the wilderness journey in Exodus seventeen.

The attack was serious enough that God commanded Israel to remember it.

Israel was told to eventually blot Amalek out permanently.

"Teman" becomes a region famous for its wisdom.

The book of Job later names it as Eliphaz's home.

⚔️ Amalek's line attacks Israel in Exodus

🗑️ God commanded Amalek's judgment

🧠 Teman becomes known for wisdom

📖 One grandson becomes a lasting enemy

---

## 👥 The Sons Of Reuel

These four names complete the family of Esau's second listed son.

None of them becomes individually significant in any later Bible narrative.

Their inclusion still matters for one reason.

Chronicles is trying to preserve Edom's full internal structure on the record, tribe by tribe.

A neighboring nation's family tree gets the same careful documentation Israel's own tree receives.

👥 Completes Reuel's own family line

🤐 None becomes individually significant

📋 Preserves Edom's full internal structure

📖 A neighbor's family gets the same care

---

## 🏔️ The Sons Of Seir

Seir was not descended from Esau at all.

He belonged to an earlier people already living in that region, usually called the Horites.

Esau's family eventually settled among the Horites.

They largely absorbed or displaced them over time.

That is why the land became known as Seir, and later as Edom.

Including a separate, non Esau family inside Esau's genealogy shows Chronicles recording actual history.

🏔️ Seir's people were the earlier Horites

🏕️ Esau's family later settled among them

📜 A separate people is included for accuracy

📖 The land had history before Esau arrived

---

## 🔤 Hori, And Homam, And Timna

"Hori" likely gives its name to the entire Horite people mentioned in the previous verse.

Timna, named here as Lotan's sister, is a different woman from Eliphaz's son Timna in verse thirty six.

Genesis thirty six adds that this Timna became a concubine of Eliphaz.

That marriage connected the Horite family directly into Esau's own household.

Two supposedly separate peoples were already blending together by marriage this early.

🔤 Hori likely names the whole Horite people

👩 A different Timna than verse thirty six

💍 Genesis thirty six ties her into Esau's family

📖 The two peoples were already blending

---

## 📦 The Sons Of Shobal, And The Sons Of Zibeon

This verse packs two separate short family lists together.

First comes Shobal's five sons, then Zibeon's two sons.

The "Anah" named here as Zibeon's son is a different man.

He is not the "Anah" listed among Seir's own sons in verse thirty eight.

Genesis thirty six clarifies that this second Anah discovered hot springs in the wilderness.

He found them while tending his father's donkeys.

Even a single repeated name inside one family can point to two different men with two different stories.

📦 Two short lists packed into one verse

🔁 A different Anah than verse thirty eight

♨️ Genesis thirty six ties him to hot springs

📖 One repeated name, two different men

---

## 👶 The Sons Of Anah, And The Sons Of Dishon

This continues down another generation of the Horite family line introduced through Seir.

None of these particular names carries forward into any other part of Scripture.

The genealogy is still tracking every branch fully.

That is true even generations deep into a family Esau did not originally found.

Thoroughness, not fame, is what earns a name a place in this record.

👶 Continues the Horite family line

🤐 None appears elsewhere in Scripture

📋 Every branch is still tracked fully

📖 Thoroughness earns a name its place

---

## 🔒 The Sons Of Ezer, And The Sons Of Dishan

This verse closes out the last two branches of Seir's Horite family.

Next the chapter moves on to Edom's kings.

"Uz" here is a different man from the "Uz" listed as one of Shem's own sons back in verse seventeen.

That is another repeated name in a different branch.

Every son and grandson of Seir has now been fully recorded.

The genealogy is about to shift from tracking a family to tracking a kingdom.

🔒 Closes out Seir's last two branches

🔁 A different Uz than verse seventeen

📋 Every Horite descendant now recorded

📖 The chapter shifts from family to kingdom

# FirstChronicles 1:43-50
# 👑 The Kings Of Edom Before Israel Had Kings
---
## ⏳ Kings That Reigned In The Land Of Edom

This line quietly points out that Edom had an organized kingship long before Israel did.

Israel would not have its first king, Saul, until many centuries later.

For an audience returning from exile with no king at all, that comparison would have stung.

This list is not neutral trivia.

It is a pointed reminder about how long Israel lagged behind its neighbor.

👑 Edom had kings long before Israel did

⏳ Saul comes centuries after this list

😔 A sharp comparison for exiled readers

📖 Not trivia, a pointed reminder

---

## 🏙️ Bela The Son Of Beor

This first king's name and city location are both otherwise unknown outside this passage.

The only other place it appears is the parallel list in Genesis thirty six.

Naming a king's city alongside his name was a standard way of recording royal history.

None of these Edomite kings inherit the throne from their father.

Edom's kingship rotated between different leading families.

It did not stay inside one dynasty.

🏙️ Dinhabah is otherwise unknown

📜 Naming a king's city was standard practice

🔀 No son inherits the throne here

📖 Kingship rotated between families

---

## 👑 Jobab The Son Of Zerah Of Bozrah

"In his stead" simply means Jobab took the throne after Bela.

That phrase becomes the pattern repeated for every king in this list.

Bozrah later becomes one of Edom's most important cities.

The prophets mention it repeatedly while pronouncing judgment on Edom.

Some readers connect this Jobab to the Job of the book of Job.

That link is far from certain, and most scholars doubt it.

👑 In his stead means he took the throne

🏙️ Bozrah becomes a major Edomite city

❓ A link to Job is uncertain

📖 A steady, repeating formula moves the list

---

## 🗺️ Husham Of The Land Of The Temanites

"Temanites" ties this king to the region of Teman.

Teman was already introduced earlier in this chapter as a grandson of Esau.

By this point in the list, the throne is passing between different regions of Edom.

It is no longer passing within one royal family.

Job's friend Eliphaz is specifically called a Temanite in the book of Job.

🗺️ Ties Husham to the region of Teman

🔀 The throne passes between regions

👑 Kingship rotated instead of passing by blood

📖 Job's friend Eliphaz was a Temanite

---

## 🐫 Hadad The Son Of Bedad

This is the first Edomite king in the list credited with a specific military achievement.

He defeated Midian, the same nation descended from Abraham through Keturah earlier in this chapter.

That battle happened in the territory of Moab.

This detail shows Edom was militarily active during this early period.

The genealogy briefly becomes a history book here.

It shows a real event, not just a name and a title.

⚔️ First king credited with a real victory

🐫 He defeated Midian, Keturah's descendants

🗺️ The battle happened in Moab's territory

📖 The list briefly becomes real history

---

## 📍 Samlah Of Masrekah

Masrekah's exact location is unknown today.

It was clearly significant enough to be remembered as a king's home city.

This king receives no additional detail beyond his name and city.

That matches the shorter entries earlier in the list.

Not every king got a story attached.

Some simply held the office and passed it on.

📍 Masrekah's exact location is unknown

🤐 No extra detail is given here

👑 Some kings simply held the office

📖 The record is not inflated where none exists

---

## 🌊 Shaul Of Rehoboth By The River

"The river" here almost certainly refers to the Euphrates.

That suggests this king's home city sat much farther north than most of Edom's other kings.

This "Shaul" shares his name with Israel's own first king, Saul.

The two men have no connection to each other.

A king from this far north ruling over Edom shows the kingdom's reach was wide.

🌊 The river likely means the Euphrates

🔁 Shares a name with Israel's King Saul

🗺️ Edom's reach stretched further north

📖 Shared names did not imply any connection

---

## 👑 Baalhanan The Son Of Achbor

"Baalhanan" means Baal is gracious, a name that openly honors the Canaanite storm god.

Edom's kings, unlike Israel's, were never bound by covenant to worship only the God of Israel.

A second king named Hadad closes out the list next.

He likely was also named after the storm god Hadad, worshipped across the ancient Near East.

The list closes with his own city, and his wife Mehetabel's family named in full.

Naming a queen's mother and grandmother was unusually detailed treatment for an ancient king list.

👑 Baalhanan means Baal is gracious

🚫 Edom's kings owed no covenant loyalty

⛈️ A second Hadad likely honors a storm god

📖 Even the queen's family is named in full

# FirstChronicles 1:51-54
# 🏛️ The Dukes Of Edom
---
## 🔀 Hadad Died Also, And The Dukes Of Edom Were

The list suddenly shifts from kings back to a different kind of leader called dukes.

The text does not explain exactly why the transition happens.

"Duke" here translates a Hebrew word meaning tribal chief.

That is closer to a clan leader than to a European style noble title.

Most scholars believe this shift reflects a real change in Edom's own government over time.

It likely moved from individual kings back to a council of tribal chiefs.

🔀 The list shifts from kings to dukes

🏕️ Duke here means a tribal chief

📜 Reflects a real change in Edom's government

📖 Chronicles records the change honestly

---

## 🔁 Duke Timnah, Duke Aliah, Duke Jetheth

"Timnah" here is a place or clan name.

It is distinct from both women named Timna mentioned earlier in this chapter.

These three names likely represent territories or clans, not individual rulers.

None of these three names reappears anywhere else in the Bible.

The list has shifted from tracking family lines to tracking territorial leadership.

🔁 A third distinct Timnah in this chapter

🗺️ Names likely mark territories or clans

🤐 None reappears elsewhere in Scripture

📖 Tracking has shifted to territorial leadership

---

## ⛏️ Duke Aholibamah, Duke Elah, Duke Pinon

"Aholibamah" shares its name with one of Esau's own wives, mentioned in Genesis thirty six.

This duke is a different figure, tied to a place, not a person.

"Pinon" is usually linked to a site later known for its copper mines.

That industry made parts of Edom genuinely wealthy.

Even a bare list of titles can hint at what made this neighboring nation economically significant.

🔁 Aholibamah shares a name with Esau's wife

⛏️ Pinon is linked to copper mining

💰 Hints at Edom's real economic strength

📖 Edom's wealth shows up in this list

---

## 🔀 Duke Kenaz, Duke Teman, Duke Mibzar

"Kenaz" and "Teman" both repeat names already used earlier in this chapter for individual grandsons of Esau.

Here they are reused as territorial or clan titles instead.

This is the same pattern seen throughout the chapter.

One name can belong to a person in one verse and a place or title in another.

"Mibzar" likely means fortress in Hebrew.

That suggests this duke's territory was known for its defenses.

🔁 Kenaz and Teman repeat earlier names

🔀 Names can shift from person to place

🏰 Mibzar likely means fortress

📖 Context matters every time a name returns

---

## 🏁 Duke Magdiel, Duke Iram

These final two names close out Edom's entire leadership record.

Kings and dukes are now finished together.

That ends the genealogy that began with Adam, fifty four verses earlier.

The closing phrase "these are the dukes of Edom" formally seals this list.

Chronicles will not return to Edom's family tree in this kind of detail again.

The very next chapter turns fully toward Israel's own line, starting with the sons of Israel himself.

🏁 Closes out Edom's entire leadership record

🔒 Seals this branch, like every one before it

➡️ Chapter two turns to Israel's own sons

📖 God includes all, His covenant narrows to one
`.trim();

export const FIRST_CHRONICLES_ONE_PERSONAL_SECTIONS = parseFirstChroniclesOneRawNotes(FIRST_CHRONICLES_ONE_RAW_NOTES);
