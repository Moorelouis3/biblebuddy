export type FirstChroniclesTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesTwoRawNotes(rawText: string): FirstChroniclesTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 2:${startVerse}` : `1 Chronicles 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 1 Chronicles 2 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_TWO_RAW_NOTES = `
# FirstChronicles 2:1-2
# 👨‍👦 The Twelve Sons Of Israel
---
## 👤 These Are The Sons Of Israel

Israel is the covenant name God gave Jacob after he wrestled at Peniel.

This chapter uses that name on purpose, not the name Jacob.

Genesis thirty five already recorded this same list of sons in full.

Chronicles is not adding new information here.

It is reminding a discouraged, exiled people whose sons they descend from.

👤 Israel is Jacob's covenant name

🤼 Given after he wrestled at Peniel

📜 Genesis thirty five lists these sons too

📖 The exiles are reminded whose sons they are

---

## 👶 Reuben, Simeon, Levi, And Judah

These four are listed in the exact order they were born.

Reuben was the firstborn, but he lost his rights after a serious sin later in Genesis.

Simeon and Levi also lost standing after a violent act against Shechem.

Judah ends up carrying the leading role instead, even though he was only the fourth son.

The order here quietly hints at everything that happens later in the story.

👶 Listed in true birth order

👎 Reuben lost his rights later

⚔️ Simeon and Levi lost standing too

📖 Judah rises though born fourth

---

## 👪 Dan, Joseph, And Benjamin, Naphtali, Gad, And Asher

The remaining eight sons are not listed in birth order here.

Jacob had four wives, and each mother's sons tend to cluster together in lists like this one.

Joseph and Benjamin were the two sons of Rachel, the wife Jacob loved most.

Dan, Naphtali, Gad, and Asher came through Jacob's two handmaids, Bilhah and Zilpah.

The list groups families the way the original household actually lived, not by who was born first.

👪 Eight sons, four different mothers

❤️ Joseph and Benjamin were Rachel's sons

🤱 Dan, Naphtali, Gad, Asher came through handmaids

📖 Grouped by household, not birth order

# FirstChronicles 2:3-4
# 🕊️ Judah's Sons And The Story Of Tamar
---
## 👶 Er, And Onan, And Shelah

These three sons open Judah's own family line.

Genesis thirty eight tells their full story in detail.

That chapter is one of the darkest in the whole book of Genesis.

Chronicles compresses it down to a single list of names here.

👶 Judah's first three sons

📜 Genesis thirty eight tells their story

🌑 One of Genesis's darkest chapters

📖 Compressed here into three names

---

## 🚫 Born Unto Him Of The Daughter Of Shua The Canaanitess

This does not mean Judah's marriage simply went unnoticed by the text.

Judah's father and grandfather both went out of their way to avoid marrying into Canaan.

Judah married a Canaanite woman anyway, without that same care.

The genealogy records the fact plainly, without excusing it.

🚫 Abraham and Isaac avoided Canaanite wives

💍 Judah married one anyway

📜 The record states it plainly

📖 No excuse is offered here

---

## ⚖️ Was Evil In The Sight Of The Lord, And He Slew Him

The text never says exactly what Er did wrong.

Genesis thirty eight only repeats that his wickedness was serious.

It was serious enough for God himself to end his life.

That silence is not an accident.

Some sins are simply named as evil without a full explanation being owed to the reader.

❓ The exact sin is never named

⚖️ God himself ended his life

🤐 Genesis stays silent on details

📖 Some evil needs no explanation

---

## 👰 Tamar His Daughter In Law Bare Him Pharez And Zerah

This one line hides an entire dramatic story.

Onan refused to give Tamar a child after Er died.

Judah then failed to give Tamar his youngest son Shelah as promised.

Tamar disguised herself and tricked Judah into fathering her twins himself.

That messy, uncomfortable history is exactly how Pharez and Zerah were born.

👰 Onan refused Tamar a child

🚫 Judah broke his promise about Shelah

🎭 Tamar disguised herself to get justice

📖 Pharez and Zerah came from that story

---

## 🔢 All The Sons Of Judah Were Five

Only three sons were named just now, plus two more through Tamar.

That still adds up to five.

Er and Onan died without children of their own.

Chronicles counts every son who was ever born, not only the ones whose lines continued.

The dead were not erased from the family record.

🔢 Five sons total, including the dead

💀 Er and Onan died childless

📋 Every birth still gets counted

📖 The record does not erase the dead

# FirstChronicles 2:5-8
# 🎶 Pharez, Zerah, And Achar The Troubler
---
## 👑 The Sons Of Pharez, Hezron And Hamul

Hezron becomes the single most important name in this entire chapter.

Almost every family line described from here on traces back through him.

Hamul is mentioned once here and never explained further anywhere else.

One brother becomes the center of the chapter, the other fades from view.

👑 Hezron becomes the chapter's key name

🌳 Most later lines trace through him

🤐 Hamul is never explained further

📖 One name rises, one quietly fades

---

## 🎶 Zimri, And Ethan

"Ethan" is likely the same man remembered as Ethan the Ezrahite.

Psalm eighty nine carries his name in its title.

Zimri appears here only once and is not connected to anything later.

A single name in a genealogy can turn out to be a psalm writer readers already know.

🎶 Ethan is likely Psalm eighty nine's author

🤐 Zimri appears only this once

🔗 Small names can carry big surprises

📖 A genealogy name becomes a psalmist

---

## 🎵 Heman, And Calcol, And Dara

Heman is likely the same man credited with writing Psalm eighty eight.

First Kings four later compares Solomon's wisdom directly to these four brothers.

Solomon was said to be wiser than all of them combined.

That comparison only makes sense if the first readers already knew these four for their wisdom.

🎵 Heman likely wrote Psalm eighty eight

🧠 First Kings four calls them wise men

👑 Solomon is compared to all four

📖 Fame here explains a later verse

---

## 🔤 The Sons Of Carmi, Achar The Troubler Of Israel

"Achar" is another spelling of the name Achan.

Joshua seven tells his full story, hiding stolen goods from the ruined city of Jericho.

His sin brought defeat on the whole nation, not just on himself.

His name even sounds like the Hebrew word for trouble.

🔤 Achar is another spelling of Achan

🏙️ Joshua seven tells his story

⚔️ His sin brought national defeat

📖 His name itself sounds like trouble

---

## 🔥 Who Transgressed In The Thing Accursed

"Accursed" here means something devoted entirely to destruction.

It was forbidden to keep an accursed thing for personal use.

Jericho's plunder belonged to God alone after Israel's victory there.

Achan took silver and gold from it for himself in secret.

Keeping something set apart for God was treated as a serious betrayal, not a small theft.

🔥 Accursed means set apart for destruction

🏺 Jericho's plunder belonged to God alone

🤫 Achan took some of it secretly

📖 Taking it counted as betrayal

# FirstChronicles 2:9-12
# 👑 Hezron To Jesse, By Way Of Boaz
---
## 👶 Jerahmeel, And Ram, And Chelubai

Hezron had three sons, and this chapter eventually tracks all three in full.

Jerahmeel's own long family line comes later in this same chapter.

Chelubai is actually another name for Caleb, who also gets a long line later.

Ram becomes the most important of the three, since his line leads to David.

👶 Hezron's three sons named here

📜 Jerahmeel gets his own section later

🔀 Chelubai is another name for Caleb

📖 Ram's line leads toward David

---

## 👑 Ram Begat Amminadab, Prince Of The Children Of Judah

"Prince" here means a tribal leader, not a king's son.

This same Amminadab is very likely Aaron's own father in law, named in Exodus six.

His daughter Elisheba married Aaron, Israel's first high priest.

A single name links Judah's royal line and Israel's priestly line together this early.

👑 Prince means tribal leader here

🔗 Likely Aaron's own father in law

💍 His daughter married Aaron

📖 Royal and priestly lines connect early

---

## 👰 Nahshon Begat Salma, And Salma Begat Boaz

Nahshon led the tribe of Judah during the wilderness census in the book of Numbers.

Salma is a shortened form of the name Salmon.

Boaz already appears in this same line, the man who marries Ruth in the book of Ruth.

The line quietly moves from the wilderness camp straight toward a love story two generations later.

🏕️ Nahshon led Judah in the wilderness

🔤 Salma is short for Salmon

👰 Boaz marries Ruth later

📖 Wilderness leader to love story

---

## 👴 Boaz Begat Obed, And Obed Begat Jesse

The book of Ruth ends with almost this exact same short list.

Obed was Boaz and Ruth's son, born after Ruth left her homeland of Moab for good.

Jesse is Obed's son, and Jesse's own family fills the next section of this chapter.

Four generations after Boaz, God's promised king is about to be born into this family.

📜 Matches Ruth's own closing genealogy

👶 Obed was Boaz and Ruth's son

👴 Jesse is Obed's son

➡️ David is four generations away

# FirstChronicles 2:13-17
# 🎵 Jesse's Sons, And David The Seventh
---
## ⚔️ Eliab His Firstborn, And Abinadab The Second, And Shimma The Third

Eliab is the same brother who mocks David harshly in first Samuel seventeen.

He assumes David only came to watch the battle with Goliath out of curiosity.

Abinadab and Shimma stand beside Saul's army in that same story.

Being the oldest and tallest did not make any of these three brothers the one God chose.

😤 Eliab later mocks David

⚔️ All three stood in Saul's army

📏 Being oldest did not make them chosen

📖 God's choice ignored birth order

---

## 🔢 Nethaneel The Fourth, Raddai The Fifth

First Samuel sixteen describes Jesse presenting eight sons to the prophet Samuel.

This list in Chronicles only names seven sons total.

Most likely one brother died without children and was quietly left out of this record.

A genealogy tracks family lines forward, not simply every person who was ever born.

🔢 Samuel's account lists eight sons

📜 Chronicles only names seven here

💭 One brother likely left no line

📖 Genealogies track lines, not headcounts

---

## 👶 Ozem The Sixth, David The Seventh

David is named last, after six older brothers already passed over by Samuel.

Being seventh in a family list often carried the sense of completeness in this culture.

Samuel had to specifically ask if there was still a younger son out with the sheep.

The very order of this list retells how surprising David's selection truly was.

👶 David is the seventh son listed

🔢 Seven often signaled completeness

🐑 Samuel had to ask about him

📖 The order retells a surprising choice

---

## 👩 Whose Sisters Were Zeruiah, And Abigail

Zeruiah's three sons become some of the most important military men in David's kingdom.

Joab commands David's entire army for most of his reign.

Abishai and Asahel fight alongside their brother in many of David's battles.

David's own family supplied much of the leadership behind his later throne.

👩 Zeruiah is David's own sister

⚔️ Her son Joab commands the army

🛡️ Abishai and Asahel fight beside him

📖 Family supplied David's military leaders

---

## 👰 Abigail Bare Amasa, And The Father Of Amasa Was Jether The Ishmeelite

This Abigail is David's sister, a different woman from the Abigail who later becomes David's wife.

Amasa eventually commands Absalom's rebel army against his own uncle David.

David later forgives him and even makes him commander of Israel's whole army.

Family loyalty in this household did not always guarantee political loyalty later on.

👩 A different Abigail than David's wife

⚔️ Amasa later leads a rebel army

🤝 David later forgives and promotes him

📖 Family ties did not guarantee loyalty

# FirstChronicles 2:18-20
# 🛠️ Caleb Son Of Hezron, And Bezaleel
---
## 🔀 Caleb The Son Of Hezron Begat Children Of Azubah His Wife, And Of Jerioth

This Caleb is not the famous spy who explored Canaan alongside Joshua.

That well known Caleb was the son of Jephunneh, from a different family branch entirely.

Sharing a common name without sharing an identity happens often in these genealogies.

Careful readers check whose son a name belongs to before assuming they already know the man.

🔀 Not the famous spy Caleb

👤 That Caleb was Jephunneh's son

👥 Two men share one common name

📖 Family line settles who is who

---

## 👶 Her Sons Are These, Jesher And Shobab And Ardon

Three sons are named here through Caleb's wife Azubah.

None of the three becomes individually important in any later Bible story.

Their record still stands complete in this genealogy, just like every other family listed here.

A name did not need to become famous to earn a place in the record.

👶 Three sons through Azubah

🤐 None becomes important later

📋 Still fully recorded here

📖 Fame was never the requirement

---

## 👩 When Azubah Was Dead, Caleb Took Unto Him Ephrath, Which Bare Him Hur

Ephrath gives her name to Ephratah, an older name closely tied to the town of Bethlehem.

Hur becomes an important name in his own right through his own descendants.

This short verse quietly plants the seed for Bethlehem's whole later story.

A wife's name here becomes the root of a place readers will meet again and again.

👩 Ephrath connects to Ephratah

🏙️ Ephratah ties to Bethlehem

👶 Hur is her son with Caleb

📖 A wife's name roots a whole town

---

## 🛠️ Hur Begat Uri, And Uri Begat Bezaleel

Bezaleel becomes the master craftsman chosen by God to build the tabernacle.

Exodus thirty one says God filled him personally with wisdom and skill for the work.

He designed the ark and nearly every sacred object Israel carried through the wilderness.

A name buried three generations deep in a genealogy turns out to be one of Scripture's great artists.

🛠️ Bezaleel built the tabernacle

✨ God filled him with wisdom and skill

📦 He designed the ark itself

📖 A genealogy hides a great artist

# FirstChronicles 2:21-24
# 🏕️ Hezron's Later Family, And Jair's Cities
---
## 💍 Afterward Hezron Went In To The Daughter Of Machir The Father Of Gilead

Machir was a grandson of Joseph, through the tribe of Manasseh.

That makes this marriage a rare crossing between the tribe of Judah and the tribe of Manasseh.

Gilead was the region east of the Jordan River that Machir's own family eventually settled.

This single marriage quietly ties two very different tribal territories into one shared family tree.

👤 Machir descended from Manasseh

💍 A marriage crossing two tribes

🗺️ Gilead lay east of the Jordan

📖 One family tree, two territories

---

## 🔢 Whom He Married When He Was Threescore Years Old

"Threescore" is an old way of saying sixty.

Hezron was already sixty years old when this marriage and this son took place.

That detail shows this family branch grew later in Hezron's life than the branches already listed.

Genealogies did not always move in a single tidy line from start to finish.

🔢 Threescore means sixty

👴 Hezron was sixty at this marriage

📆 A later branch of his family

📖 Genealogies do not always move in order

---

## 🏘️ Segub Begat Jair, Who Had Three And Twenty Cities In The Land Of Gilead

Jair shares his name with a later judge of Israel described in the book of Judges.

Whether they are the same man or two men generations apart is genuinely unclear from the text.

These twenty three cities were most likely small tent villages rather than walled towns.

Elsewhere in Scripture they are even called by the name Havothjair, the villages of Jair.

🔤 Shares a name with a later judge

❓ Same man or different is unclear

⛺ Cities likely meant tent villages

📖 Also called the villages of Jair

---

## 🏙️ Hezron Was Dead In Calebephratah, Then Abiah Bare Him Ashur The Father Of Tekoa

This verse finally closes out Hezron's own story after many verses following him.

Tekoa becomes a real town remembered later in Scripture.

The prophet Amos comes from Tekoa.

A wise woman from Tekoa also helps reconcile David and Absalom in second Samuel.

A town founded quietly here in a genealogy becomes the home of a future prophet.

🏁 Closes out Hezron's own story

🏙️ Tekoa becomes a real later town

🗣️ A wise woman from there aids David

📖 Amos the prophet comes from Tekoa

# FirstChronicles 2:25-29
# 🌳 The Sons Of Jerahmeel
---
## 👑 The Sons Of Jerahmeel The Firstborn Of Hezron Were, Ram The Firstborn

Jerahmeel was Hezron's actual firstborn son, ahead of both Ram and Caleb named earlier.

Yet the chapter chose to describe Ram's own line first, all the way down to David.

Chronicles often follows importance to the story rather than strict birth order.

The line that matters most to God's larger plan gets told first, even out of order.

👑 Jerahmeel was Hezron's true firstborn

📖 Yet Ram's line was told first

🔀 Chronicles often follows importance, not order

➡️ God's plan shaped the order here

---

## 👰 Jerahmeel Had Another Wife Whose Name Was Atarah

Multiple wives inside one family show up repeatedly across this whole chapter.

Atarah is named specifically here, unlike some wives left completely unnamed in other verses.

Being named at all was not something every wife in these lists received.

Even a brief mention like this one preserved a real woman's place in the family record.

👰 Another wife of Jerahmeel

📛 Atarah is named specifically

🤐 Not every wife received a name

📖 A brief mention still preserved her place

---

## 👥 The Sons Of Ram The Firstborn Of Jerahmeel Were, Maaz, And Jamin, And Eker

These three sons belong to Ram, a different Ram from the more famous Ram descended from Pharez earlier.

The same name shows up in two completely separate branches of Hezron's family.

None of these three particular sons becomes important anywhere else in Scripture.

Their record still stands complete, exactly like every branch surrounding them.

🔁 A different Ram than earlier

👥 Same name, separate branch

🤐 None becomes important later

📖 Still recorded completely

---

## 👶 The Sons Of Onam Were, Shammai, And Jada

Onam is one of Jerahmeel's grandsons, born through the wife named Atarah two verses earlier.

His two sons Shammai and Jada open two separate branches the rest of this section keeps tracking.

Shammai's own branch gets named first, followed by Jada's branch a few verses later.

A genealogy this deep is really several smaller family trees branching off one trunk.

👶 Onam is one of Jerahmeel's grandsons

🌿 His two sons start two branches

📋 Shammai's branch comes first

📖 One trunk, several branching trees

---

## 👩 The Wife Of Abishur Was Abihail, She Bare Him Ahban, And Molid

Abihail is named specifically here, the same courtesy already shown to Jerahmeel's wife Atarah.

Shammai's own son Abishur is the husband being described.

Two sons, Ahban and Molid, complete this small branch of the family.

Neither name appears again anywhere else in Scripture.

👩 Abihail is named specifically

👤 Abishur is her husband

👶 Ahban and Molid complete the branch

📖 Neither name reappears in Scripture

# FirstChronicles 2:30-33
# ✂️ Nadab, Sheshan, And Jerahmeel's Line Closes
---
## 💀 The Sons Of Nadab, Seled And Appaim, But Seled Died Without Children

Dying without children was a serious note in a genealogy built to track family lines forward.

A branch that ends this way simply stops, with nothing more to record.

Appaim's own line continues instead, all the way down to a man named Sheshan.

Not every branch in a family tree survives to be counted in the next generation.

💀 Seled died without children

✂️ His branch simply stops here

🌱 Appaim's branch continues instead

📖 Not every branch survives

---

## 👤 The Sons Of Ishi Were Sheshan, And His Child Was Ahlai

This verse quietly introduces Sheshan, a name about to matter far more than this line suggests.

Ahlai is named as his child here, without the text saying son or daughter.

The next section of this chapter explains that Sheshan actually had no sons at all.

A small, easy to miss verse is about to become the hinge for the whole next story.

👤 Sheshan is introduced quietly here

👶 Ahlai is named as his child

❓ The text does not say son or daughter

📖 A small verse becomes a hinge

---

## 👥 The Sons Of Jada The Brother Of Shammai, Jether And Jonathan

Jada is Onam's other son, the brother of Shammai named a few verses earlier.

Jether dies without children here, the same fate that already ended Seled's branch.

Jonathan's own branch continues instead, the same pattern already seen once in this family.

The chapter keeps repeating this shape, a branch that ends and a branch that continues.

👥 Jada is Shammai's brother

💀 Jether died without children

🌱 Jonathan's branch continues instead

📖 Ending and continuing branches repeat

---

## 🔒 These Were The Sons Of Jerahmeel

Peleth and Zaza, Jonathan's own two sons, close out this final small branch.

The closing line formally seals off Jerahmeel's entire family.

Ishmael's line and Keturah's line were sealed the same way earlier in this book.

Sheshan, named just two verses earlier, is not actually finished yet.

The very next verses follow his story, because he had no son to carry his line forward the usual way.

👶 Peleth and Zaza close this branch

🔒 The formula seals Jerahmeel's whole line

👀 Sheshan is not finished yet

📖 His story continues in what follows

# FirstChronicles 2:34-41
# 🤝 Sheshan's Daughter And Jarha The Egyptian
---
## 👧 Now Sheshan Had No Sons, But Daughters

This short line explains exactly why Sheshan's family needed an unusual solution.

Inheritance and family lines in this culture normally passed through sons.

Sheshan had none, only daughters, leaving his own branch looking finished.

The text already hinted at this name two verses earlier, and now explains why it mattered.

👧 Sheshan had daughters, no sons

📜 Inheritance normally passed through sons

⚠️ His branch looked finished

📖 The earlier hint now makes sense

---

## 👤 Sheshan Had A Servant, An Egyptian, Whose Name Was Jarha

A servant in this setting often meant something closer to an indentured worker than to slavery as understood today.

Jarha's Egyptian background made him an outsider to Sheshan's own family and tribe.

Yet he is about to become the surprising answer to Sheshan's problem of having no sons.

👤 Jarha was an Egyptian servant

🌍 An outsider to Sheshan's tribe

❓ He becomes the surprise solution

📖 Outsiders enter Israel's family lines

---

## 💍 Sheshan Gave His Daughter To Jarha His Servant To Wife

This marriage was not simply arranged out of desperation with no purpose.

Marrying a daughter to a servant kept the family's inheritance and name from disappearing entirely.

The children born from this marriage would still legally count as part of Sheshan's own line.

A creative solution inside the law preserved a family that otherwise had no sons at all.

💍 Marriage kept the family line alive

📜 Children still counted as Sheshan's own

⚖️ A legal solution, not just desperation

📖 The family name did not disappear

---

## 🔗 She Bare Him Attai, And Attai Begat Nathan, And Nathan Begat Zabad

This short chain shows the plan actually worked.

Sheshan's line continues successfully through Jarha's family, generation after generation.

None of these three names becomes significant anywhere else in the Bible.

Their only job in this record is proving the line survived at all.

✅ The plan worked, the line continued

🔗 Three generations named in a row

🤐 None becomes significant elsewhere

📖 Their job was simply surviving

---

## 🔁 Zabad Begat Ephlal, And Ephlal Begat Obed

This Obed shares his name with Boaz and Ruth's famous son from earlier in the chapter.

He is a completely different man, from a completely different branch of Hezron's family.

Repeated names across unrelated branches happen often enough in this genealogy to expect by now.

Careful readers keep tracking whose son a name belongs to, every time it reappears.

🔁 A different Obed than Ruth's grandson

👥 A separate branch of the family

🔂 Repeated names appear often here

📖 Whose son matters more than the name

---

## 🔗 Jekamiah Begat Elishama

The chain continues for several more unremarkable generations after Obed.

None of these men appear anywhere else in the Bible outside this one list.

The genealogy still records every single one of them by name, in full.

A family line did not need a famous ending to still matter enough to preserve in writing.

🔗 Several more generations named in full

🤐 None appears anywhere else

📋 Still fully recorded regardless

📖 A line mattered without a famous ending

# FirstChronicles 2:42-45
# 🗺️ The Sons Of Caleb, A Second List
---
## 🔁 Now The Sons Of Caleb The Brother Of Jerahmeel Were, Mesha His Firstborn, Which Was The Father Of Ziph

This returns to the same Caleb already introduced back in verse eighteen, not a new man.

Genealogies often circle back to expand a family branch already mentioned earlier.

Ziph becomes a real wilderness location in the region of Judah.

David hides there from Saul for a stretch of time in first Samuel twenty three.

🔁 The same Caleb from verse eighteen

🌳 A returning branch, expanded further

🏜️ Ziph is a real wilderness region

📖 David hides there from Saul

---

## 🏙️ The Sons Of Mareshah The Father Of Hebron

"Hebron" here names a person, not only the famous city that shares his name.

Cities in ancient Israel were frequently named after the family or clan that first settled them.

This same pattern repeats through much of this genealogy, blending people and places together.

A city readers already know may trace its very name back to one man listed in a genealogy.

👤 Hebron is a person's name here

🏙️ Cities were often named after founders

🔀 People and places blend together

📖 A city's name can start in a list

---

## 🔀 The Sons Of Hebron, Korah And Tappuah And Rekem And Shema

This Korah is a different man from the more infamous Korah who rebels against Moses in Numbers.

That rebel Korah came from the tribe of Levi, not Judah at all.

Sharing a name across two completely different tribes was common enough not to assume any connection.

Four sons complete Hebron's own family branch here.

🔀 A different Korah than the rebel

👥 That Korah came from Levi's tribe

🚫 No connection should be assumed

📖 Four sons complete this branch

---

## 🏰 Maon Was The Father Of Bethzur

This chain adds one more generation onto Hebron's family line.

Maon becomes another real wilderness region, close by Ziph, where David hid earlier in his story.

Bethzur later becomes a fortified city, defended during conflicts recorded much later in Israel's history.

A short, unfamiliar genealogy chain quietly maps out real ground David himself once walked.

🔗 One more generation of Hebron's line

🏜️ Maon sits near Ziph in the wilderness

🏰 Bethzur later becomes a fortress

📖 The list maps ground David once walked

# FirstChronicles 2:46-49
# 👶 Caleb's Concubines, Ephah And Maachah
---
## 👩 Ephah, Caleb's Concubine, Bare Haran, And Moza, And Gazez

A concubine was a wife of lower legal standing, without the same full inheritance rights as a primary wife.

Ephah still receives full credit here as the mother of these sons, named right alongside every other wife.

Haran and his own son end up sharing the identical name Gazez.

Repeating a father's name for a son was not unusual in this family's naming habits.

📜 Concubine meant lower legal standing

👩 Still named and credited fully

🔁 A father and son share one name

📖 Repeated names ran in this family

---

## 👶 The Sons Of Jahdai, Regem And Jotham And Gesham And Pelet

Jahdai is not connected anywhere in the text to any of the names surrounding him.

Six sons are still listed here in full, with no explanation of where this man fits in the family.

Genealogies sometimes preserve a family branch even when the connecting link has been lost.

Completeness mattered here more than a perfectly clean family tree.

❓ Jahdai's connection is unclear

👶 Still six sons listed in full

🌳 A branch preserved without a clear link

📖 Completeness mattered over neatness

---

## 👩 Maachah, Caleb's Concubine, Bare Sheber, And Tirhanah

This is Caleb's second concubine named in this chapter, alongside Ephah from a few verses earlier.

Building a family through more than one wife or concubine was a normal, expected practice in this culture.

Neither Sheber nor Tirhanah becomes significant anywhere else in Scripture.

Their names still earn a permanent place in this careful family record.

👩 Caleb's second named concubine

👪 A normal practice in this culture

🤐 Neither son becomes significant later

📖 Still permanently recorded here

---

## 👰 The Daughter Of Caleb Was Achsa

This Caleb is still Hezron's son, the same man introduced back in verse eighteen.

A different Caleb, the son of Jephunneh, has a daughter with this same name in the book of Joshua.

Whether these two women are actually one person is genuinely debated among careful readers.

Either way, naming a daughter at all inside a long list of sons was worth doing here.

👰 Caleb here is still Hezron's son

🔀 A different Caleb's daughter shares her name

❓ Whether they are one woman is debated

📖 Naming a daughter here was worth doing

# FirstChronicles 2:50-55
# 🏙️ Caleb's Line To Bethlehem And The Kenites
---
## 📦 Shobal The Father Of Kirjathjearim

This Hur is the same man named back in verse twenty, the son of Ephrath and father of Bezaleel.

Ephratah was another name closely tied to the region around Bethlehem.

Kirjathjearim later becomes the town where the ark of the covenant rests for twenty years in first Samuel seven.

This single verse links Bezaleel's family, Bethlehem's region, and the ark's own resting place together.

👤 Hur is Ephrath's son from verse twenty

🏙️ Ephratah ties to the Bethlehem region

📦 Kirjathjearim later houses the ark

📖 Three storylines meet in one verse

---

## 🏙️ Salma The Father Of Bethlehem, Hareph The Father Of Bethgader

Salma founding Bethlehem is not a small detail buried in a list of names.

This is the very town where Ruth and Boaz's story unfolds, and later where David is born.

Centuries later it becomes the town where Jesus himself is born, exactly as the prophet Micah foretold.

A single line in a genealogy quietly names the birthplace of Israel's greatest king and, later, its Messiah.

🏙️ Salma founds Bethlehem

👑 David's own birthplace

✨ One line, two births centuries apart

📖 Micah foretold the Messiah born there

---

## 👥 Shobal Had Sons, Haroeh And Half Of The Manahethites

"Manahethites" names a clan or family group tied to a specific place, not a single individual.

Being described as only half of that clan suggests the group was itself divided.

Genealogies sometimes tracked entire communities this way, not only single family threads.

A clan could be split and recorded in fractions, the same way land or inheritance sometimes was.

👥 Manahethites names a clan, not one man

➗ Half suggests a divided group

🏘️ Communities were tracked here too

📖 Clans could be split, like inheritance

---

## 👪 The Families Of Kirjathjearim, The Ithrites And Puhites

These four family groups all descend from the town of Kirjathjearim named a few verses earlier.

None of them becomes individually significant anywhere else in Scripture.

Their value here lies in showing how one town's population broke down into real family clans.

A genealogy like this one worked like a census as much as a family tree.

👪 Four clans from Kirjathjearim

🤐 None becomes significant elsewhere

📋 Shows how one town's people divided

📖 Part census, part family tree

---

## 🏙️ The Sons Of Salma, Bethlehem And The Netophathites

Salma is not literally fathering a town named Bethlehem the way a man fathers a son.

The genealogy uses family language to describe founding or settling a place.

Ancient readers understood that shorthand naturally, without needing it explained.

"The house of Joab" here likely refers to the clan descended from David's own military commander named earlier.

Reading these as real founders of real settlements makes the whole list make sense.

🏙️ Fathering here means founding a place

👶 Family language described settling land

⚔️ House of Joab likely ties to David's general

📖 Read as founders, the list makes sense

---

## 👤 The Kenites That Came Of Hemath, The Father Of Rechab

"Jabez" shares its name with the man remembered for a short, well known prayer later in this same book.

"Scribes" here means professional record keepers, a respected and specialized trade in the ancient world.

The Kenites trace back to Moses's own father in law Jethro, an outsider people who lived alongside Israel.

The house of Rechab reappears centuries later in Jeremiah thirty five, praised for stubborn faithfulness.

📛 Jabez shares a name used later here

✍️ Scribes were professional record keepers

👤 Kenites trace back to Moses's father in law

📖 Rechab's house is praised in Jeremiah
`.trim();

export const FIRST_CHRONICLES_TWO_PERSONAL_SECTIONS = parseFirstChroniclesTwoRawNotes(FIRST_CHRONICLES_TWO_RAW_NOTES);
