export type FirstChroniclesSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesSixRawNotes(rawText: string): FirstChroniclesSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 6:${startVerse}` : `1 Chronicles 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 15) {
    throw new Error("Expected 15 1 Chronicles 6 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_SIX_RAW_NOTES = `# FirstChronicles 6:1-3
# 📜 Levi's Family Splits Into Three
---
## 👨‍👩‍👦 The Sons Of Levi Gershon Kohath And Merari

Levi had three sons who became three separate family branches.

Gershon was the oldest, then Kohath, then Merari.

Every Levite in the rest of this chapter belongs to one of these three lines.

Moses and Aaron come from the middle branch, Kohath.

The chapter will trace all three branches from here forward.

👨‍👩‍👦 Levi had three sons

🔢 Gershon Kohath and Merari in birth order

🏛️ Every Levite traces to one branch

📖 Moses and Aaron come from Kohath

## 👶 The Sons Of Kohath Amram Izhar Hebron And Uzziel

Kohath had four sons of his own.

Amram is the son this chapter follows closely.

Amram becomes the father of Aaron, Moses, and Miriam.

The other three sons, Izhar, Hebron, and Uzziel, start separate Kohathite families.

Those other families reappear later as temple musicians and city dwellers.

👶 Kohath had four sons

⭐ Amram is the key son here

👨‍👧‍👦 Amram fathers Aaron Moses and Miriam

📖 The other sons return later in the chapter

## 👴 The Children Of Amram Aaron And Moses

Amram's two most famous sons are named together here.

Aaron becomes the first high priest of Israel.

Moses leads Israel out of Egypt and receives the law at Sinai.

Two brothers, raised in the same home, carry two different callings.

This chapter follows Aaron's priestly line for the next fourteen verses.

👴 Amram fathered Aaron and Moses

🕊️ Aaron becomes the first high priest

📜 Moses leads Israel and receives the law

📖 Aaron's line is traced next

## 👩 And Miriam

Miriam is named alongside her two brothers, not left out.

Exodus fifteen calls her a prophetess in her own right.

She led the women of Israel in song after crossing the Red Sea.

Numbers twelve later records her challenging Moses' leadership and facing consequences for it.

Her place in this list marks her as a real leader in Israel's story.

👩 Miriam named with her brothers

🎤 Called a prophetess in Exodus fifteen

🎶 Led the women in song

📖 Numbers twelve shows her later challenge

## 🔥 The Sons Also Of Aaron Nadab And Abihu Eleazar And Ithamar

Aaron had four sons who could have carried the priesthood forward.

Nadab and Abihu die in Leviticus ten for offering fire God did not command.

Only Eleazar and Ithamar are left to carry the priestly line.

Eleazar becomes the son this whole chapter tracks going forward.

One reckless act in Leviticus quietly narrows this entire genealogy.

👦 Aaron had four sons

🔥 Nadab and Abihu die in Leviticus ten

👨 Only Eleazar and Ithamar remain

📖 Eleazar's line is what this chapter follows

# FirstChronicles 6:4-8
# ⛓️ The Priesthood Chain Begins
---
## 👶 Eleazar Begat Phinehas

Begat is an old word that simply means fathered or became the parent of.

Phinehas is not just a name on a list here.

Numbers twenty five records Phinehas stopping a plague through his own bold action.

God rewarded him there with a promise of an everlasting priesthood for his family.

This whole chain of names is that very promise playing out generation after generation.

👶 Begat means fathered

🗡️ Phinehas acted boldly in Numbers twenty five

🤝 God promised him an everlasting priesthood

📖 This chain fulfills that promise

## ➡️ Phinehas Begat Abishua

The chain moves forward one generation at a time.

Abishua is otherwise unknown outside this genealogy.

Chronicles still records his name carefully, generation by generation.

A family record does not need a famous story to matter.

Being named here is itself a form of honor.

➡️ One generation at a time

🤷 Abishua has no other story

📜 Chronicles still records his name

📖 Being listed is its own honor

## ⏳ Abishua Begat Bukki And Bukki Begat Uzzi

Two more generations pass in a single verse.

This pace shows how a genealogy can compress centuries into a few lines.

Neither Bukki nor Uzzi appears anywhere else in the Bible.

Their place in this priestly chain still mattered enough to preserve.

The record cares about the whole unbroken line, not only its famous names.

⏳ Two generations in one verse

🕰️ Centuries compressed into a few lines

🤐 Neither name appears elsewhere

📖 The whole line mattered, not just famous names

## 8️⃣ Uzzi Begat Zerahiah And Zerahiah Begat Meraioth

The chain keeps its steady pace through two more fathers and sons.

By this point eight generations have passed since Aaron.

No king or major event interrupts the record.

It simply keeps counting one priest after another.

That steadiness itself is part of what the chapter wants to show.

⏳ Two more generations recorded

🔢 Eight generations since Aaron by now

🚫 No major event interrupts it

📖 Steady succession is the point

## 🔁 Meraioth Begat Amariah And Amariah Begat Ahitub

Two more names complete the middle of this chain.

Amariah and Ahitub are common priestly names that repeat later in the chapter.

The same names appearing more than once is not a mistake.

Priestly families often reused honored names across generations.

Watch for these two names again further down the list.

➡️ Two more generations named

🔁 Amariah and Ahitub repeat later

👨‍👦 Reused names were common in priestly families

📖 Watch for these names again

## 👑 Ahitub Begat Zadok

Zadok's name matters far beyond this brief mention.

Second Samuel shows Zadok staying loyal to David during Absalom's rebellion.

First Kings shows him staying loyal to Solomon over a rival claim to the throne.

Solomon later makes Zadok his sole high priest.

That single decision fulfills a judgment God spoke back in First Samuel two against Eli's family.

👑 Zadok stayed loyal to David

🤴 Zadok stayed loyal to Solomon

🕍 Solomon made him sole high priest

📖 It fulfilled a First Samuel judgment against Eli

## 🏃 Zadok Begat Ahimaaz

Ahimaaz is not just another name in the chain.

Second Samuel eighteen names him as the swift runner who brought David news of a battle.

He raced another messenger to reach the king first.

David waited anxiously for that very news about his son Absalom.

A name buried in a genealogy turns out to belong to a real, dramatic moment.

🏃 Ahimaaz was a runner

⚔️ He carried battle news to David

🥇 He raced to arrive first

📖 A genealogy name hides a real story

# FirstChronicles 6:9-15
# 🏛️ The Chain Runs To The Exile
---
## 🔁 Ahimaaz Begat Azariah And Azariah Begat Johanan

The chain keeps moving forward from the runner Ahimaaz.

Azariah is a common priestly name that appears three separate times in this short passage.

Each Azariah is a different man in a different generation.

The repetition can confuse a reader who is not watching closely.

Verse ten pauses briefly to clarify exactly which Azariah matters most here.

➡️ Chain continues from Ahimaaz

🔁 Azariah appears three times in this passage

👥 Each Azariah is a different man

📖 Verse ten clarifies which one matters

## ⏸️ He It Is That Executed The Priests Office In The Temple That Solomon Built

This parenthetical note breaks the normal rhythm of the list on purpose.

It tells the reader which Azariah served as high priest.

He held that role in Solomon's newly finished temple in Jerusalem.

That temple replaced the portable tabernacle Israel had carried since Moses' time.

This is the first time in the chapter a name is tied to a specific, dated event.

⏸️ The rhythm breaks on purpose here

🕍 This Azariah served in Solomon's temple

🏛️ The temple replaced the old tabernacle

📖 A name is tied to a real event

## 🔁 Azariah Begat Amariah And Amariah Begat Ahitub

The chain resumes its normal pace after that one detour.

Amariah and Ahitub are the same two names used back in verse seven.

Different men in a later generation carry those same honored names forward.

Priestly families clearly valued repeating names from earlier ancestors.

Careful reading, not assumption, is what tells these generations apart.

🔁 Amariah and Ahitub repeat from before

👨‍👦 Different men, same honored names

📜 Priestly families reused ancestor names

📖 Careful reading separates the generations

## 👑 Ahitub Begat Zadok And Zadok Begat Shallum

A second Zadok now appears in this same genealogy.

The first Zadok, back in verse eight, served under David and Solomon.

This later Zadok lives generations afterward, closer to the kingdom's final years.

Shallum, his son, is a name that matters again in the very next verse.

Two men sharing one name are easy to mix up without paying attention.

🔁 A second Zadok appears here

👑 The first Zadok served David and Solomon

⏳ This Zadok lived generations later

📖 Shallum matters again next verse

## 📚 Shallum Begat Hilkiah And Hilkiah Begat Azariah

Hilkiah is the third named person in this verse pair, and his role is a major one.

Second Kings twenty two records Hilkiah finding a lost copy of the Book of the Law.

That discovery happens during King Josiah's repair work on the temple.

Its rediscovery sparks one of the biggest religious reforms in Judah's history.

A single line in a genealogy hides one of the Old Testament's turning points.

📚 Hilkiah found the lost Book of the Law

🏛️ It happened during Josiah's temple repairs

🔥 It sparked a major religious reform

➡️ A genealogy line hides a turning point

## ⚔️ Azariah Begat Seraiah And Seraiah Begat Jehozadak

Seraiah is the last high priest before Jerusalem's final fall.

Second Kings twenty five records Nebuchadnezzar's officers executing him at Riblah.

That happened after Jerusalem's walls were broken and the temple burned.

Seraiah's son Jehozadak survives him and appears in the very next verse.

The priestly chain barely survives the kingdom's darkest hour.

⚔️ Seraiah was the last high priest

💀 He was executed at Riblah

🏚️ This followed Jerusalem's destruction

📖 His son Jehozadak survives him

## ⏸️ Jehozadak Went Into Captivity

This verse stops the chain deliberately at the exile.

The LORD is named as the true cause behind Nebuchadnezzar's conquest.

A foreign king's army was the visible tool, not the deeper reason.

Jehozadak's own son, Jeshua, becomes the first high priest after the exile ends.

Ezra and Haggai both pick up that part of the story later.

⏸️ The chain stops here on purpose

👑 The LORD is named as the true cause

🌍 Nebuchadnezzar's army was the visible tool

➡️ Jehozadak's son leads the priesthood home from exile

# FirstChronicles 6:16-19
# 🔄 The Record Starts Fresh
---
## 🔁 The Sons Of Levi Gershom Kohath And Merari

This is the same three sons of Levi named back in verse one.

Gershom here is simply a different spelling of Gershon.

Hebrew names often shift slightly depending on which part of the Bible records them.

The chapter is not introducing new sons, it is starting a second, separate list.

This second list organizes the Levites by family group instead of by father to son succession.

🔁 Same three sons as verse one

📝 Gershom is a spelling variant of Gershon

📚 Hebrew spelling could shift between passages

📖 This starts a second organizing list

## 👶 These Be The Names Of The Sons Of Gershom Libni And Shimei

Gershom's two sons are named here for the first time in this chapter.

Libni and Shimei each start their own separate family branch.

Verses twenty and twenty one trace Libni's line forward several more generations.

This short verse is really a table of contents for what comes next.

A genealogy often plants a name early and pays it off later.

👶 Gershom's two sons named

🌳 Each starts a separate branch

📑 This sets up verses twenty and twenty one

📖 A name planted here pays off later

## 🔁 The Sons Of Kohath Were Amram And Izhar And Hebron And Uzziel

This exactly repeats the same four names already given in verse two.

The repetition is not a copying mistake.

The first list in verses one through three tracked Aaron's specific priestly succession.

This second list is organizing every Levite family for practical assignments.

The same facts can serve two different purposes in the same chapter.

🔁 Same four names as verse two

✅ Not a copying mistake

🎯 This list serves a different purpose

📖 One fact, two different uses

## 🏠 These Are The Families Of The Levites According To Their Fathers

Families here means an organized clan or household group, not just close relatives.

Each family traced back to one of Levi's original sons or grandsons.

Israel used this family structure to assign duties, offerings, and even cities.

Nothing about a Levite's daily life happened outside of this family system.

The rest of the chapter builds directly on these family lines.

🏠 Families means organized clan groups

👴 Each traced back to Levi's line

📋 Duties and cities were assigned by family

📖 The rest of the chapter builds on this

# FirstChronicles 6:20-24
# ⚡ Korah's Line Survives
---
## ➡️ Of Gershom Libni His Son Jahath His Son Zimmah His Son

His son here always means the next generation, never a second son of the same father.

Libni was just named as Gershom's son in verse seventeen.

Now the chain follows Libni's own descendants forward three more generations.

Jahath and Zimmah are otherwise unknown outside this list.

The family record keeps moving even when no other story survives about a name.

➡️ His son means the next generation

🔗 Libni's own line continues here

🤷 Jahath and Zimmah have no other story

📖 The record moves on regardless

## ⏳ Joah His Son Iddo His Son Zerah His Son Jeaterai His Son

Four more generations pass in a single verse.

This Zerah is not the famous Zerah born to Judah in Genesis thirty eight.

The same name could belong to entirely different families and tribes.

Jeaterai closes out this branch of Gershom's family for now.

Nothing more is said about any of these four men elsewhere in the Bible.

⏳ Four generations in one verse

🔁 A different Zerah than Judah's son

🌐 Names could repeat across tribes

📖 This branch closes here for now

## ⚡ The Sons Of Kohath Amminadab His Son Korah His Son

This Korah is the same man who led a rebellion against Moses in Numbers sixteen.

The ground opened and swallowed Korah along with his fellow rebels there.

Numbers twenty six adds one important detail many readers miss.

It says plainly that the children of Korah did not die with him.

His family line survived that judgment and continues right here in this genealogy.

⚡ This is the Korah of Numbers sixteen

🌋 The ground swallowed Korah and his allies

✅ Numbers twenty six says his children survived

📖 His family line continues in this list

## 🔁 Assir His Son

The name Assir appears twice in these two verses.

It shows up first at the end of verse twenty two, then again in verse twenty three.

This is likely a real repeated ancestor name, not a scribal accident.

The text does not explain why the name recurs so closely.

Later in the chapter, this branch of Korah's family becomes something surprising.

🔁 Assir appears twice in two verses

👨‍👦 Likely a genuinely repeated family name

❓ The text does not explain why

➡️ This branch has a surprising future

## 🔚 Tahath His Son Uriel His Son Uzziah His Son And Shaul His Son

Four final names close out this stretch of Kohath's genealogy.

This Shaul shares his name with Israel's first king, Saul, but is a different man.

Common names repeat across tribes and centuries without any connection between them.

The next section shifts to a different branch of Kohath's family entirely.

That branch eventually leads to the prophet Samuel and his sons.

🔚 Four names close this stretch

👑 A different Shaul than King Saul

🌐 Common names repeat without connection

📖 The next branch leads to Samuel

# FirstChronicles 6:25-30
# 🎼 A Family Line Toward Samuel
---
## 👶 The Sons Of Elkanah Amasai And Ahimoth

This Elkanah is a different branch of Kohath's family than the one just finished.

Amasai and Ahimoth are named as his two sons.

The name Elkanah itself repeats several more times in the next two verses.

That repetition is intentional, honoring an ancestor's name across generations.

Watch this name closely, because it leads somewhere important.

👶 Amasai and Ahimoth named here

🔁 Elkanah repeats in coming verses

👴 Honoring an ancestor's name

➡️ This name leads somewhere important

## 🎯 As For Elkanah The Sons Of Elkanah Zophai His Son And Nahath His Son

As for Elkanah signals the record is now focusing on one specific branch.

Zophai gives his name to a region called Ramathaim Zophim.

That region becomes the hometown of the prophet Samuel's family.

Nahath continues the chain one more generation.

The genealogy is quietly walking toward one of Israel's most important prophets.

🎯 The record narrows to one branch

🗺️ Zophai's name marks a region

🏡 That region is Samuel's hometown area

📖 The line is walking toward Samuel

## 🎯 Eliab His Son Jeroham His Son Elkanah His Son

This final Elkanah in the chain is not just another name.

First Samuel one names Samuel's own father as Elkanah, son of Jeroham.

That description matches this exact genealogy line perfectly.

The prophet Samuel's family tree has just been confirmed in full.

Chronicles is showing that Samuel came from a real, traceable Levite family.

🎯 This Elkanah is Samuel's own father

📜 First Samuel one confirms the match

✅ The genealogy lines up exactly

📖 Samuel came from a real Levite family

## ❓ The Sons Of Samuel The Firstborn Vashni And Abiah

First Samuel eight names Samuel's firstborn son as Joel, not Vashni.

Many scholars believe Vashni is not actually a name at all here.

In Hebrew it can be read as the phrase and the second.

That reading suggests a copyist accidentally dropped the name Joel from this line.

The text as it stands leaves a real gap that this comparison helps explain.

❓ Vashni does not match First Samuel's Joel

📚 Many scholars believe it means and the second

✍️ A name may have dropped from copying

📖 Comparing texts explains the gap

## 🔀 The Sons Of Merari Mahli Libni His Son Shimei His Son Uzza His Son

The record now shifts to Merari's third branch of the Levite family.

Libni and Shimei share their names with Gershom's sons from verse seventeen.

Different Levite families clearly reused the same set of common names.

Uzza continues the chain one more generation forward.

This branch resurfaces later as the family of a temple musician named Ethan.

🔀 Shift to Merari's family

🔁 Names repeat from Gershom's branch

🎼 This branch leads to a musician later

📖 Watch for Ethan further ahead

## 🔚 Shimea His Son Haggiah His Son Asaiah His Son

Three more generations close out this branch of Merari's family.

None of these three men are mentioned anywhere else in scripture.

Their descendant Ethan is named directly in verse forty four.

A quiet family record here sets up a much more visible role later.

The chapter keeps building toward the temple's music leadership piece by piece.

🔚 Three generations close this branch

🤷 None named elsewhere in scripture

🎤 Their descendant Ethan appears later

📖 The chapter is building toward temple music

# FirstChronicles 6:31-38
# 🎵 David Appoints The Singers
---
## 🎶 David Set Over The Service Of Song

David personally organized formal music ministry for Israel's worship.

After that the ark had rest points back to David finally bringing the ark to Jerusalem.

First Chronicles fifteen and sixteen record that earlier celebration in full.

Only after the ark settled did David turn to organizing ongoing worship music.

Permanent leadership follows a permanent home for God's presence among His people.

🎶 David organized formal worship music

📦 This follows the ark reaching rest

📜 First Chronicles fifteen and sixteen tell that story

📖 Settled worship follows a settled ark

## ⛺ Until Solomon Had Built The House Of The Lord In Jerusalem

This marks the moment worship shifts from a portable tent to a permanent building.

The tabernacle of the congregation was the same traveling tent used since Moses' time.

Their order refers to organized shifts, later spelled out fully in chapter twenty five.

Music ministry did not stop when the building changed, only the setting did.

The singers simply moved from a tent to a temple.

⛺ The tabernacle was the old traveling tent

🕍 Solomon's temple was the new permanent home

🔄 Their order means organized shifts

📖 The singers moved, the ministry continued

## 📝 Heman A Singer The Son Of Joel The Son Of Shemuel

Shemuel is simply the Hebrew form of the name Samuel.

This confirms Heman is Samuel's actual grandson, son of his firstborn Joel from verse twenty eight.

Heman becomes the chief singer standing at the center of temple music.

His family background ties Israel's greatest prophet directly to its worship leadership.

A prophet's grandson leads the praise of the very God his grandfather served.

📝 Shemuel is the Hebrew form of Samuel

👴 Heman is Samuel's own grandson

🎤 Heman becomes the chief singer

📖 A prophet's family leads temple worship

## 🔙 The Son Of Elkanah The Son Of Jeroham The Son Of Eliel The Son Of Toah

The genealogy here runs backward instead of forward like most of this chapter.

Each the son of phrase steps one generation further into the past.

Elkanah and Jeroham already appeared earlier in Samuel's own family record.

This backward list confirms Heman's ancestry line by line, all the way up.

Chronicles wants no doubt left about who Heman really descends from.

🔙 The list runs backward here

📿 Elkanah and Jeroham repeat from earlier

✅ It confirms Heman's ancestry

📖 No doubt is left about his line

## 🗺️ The Son Of Zuph The Son Of Elkanah The Son Of Mahath The Son Of Amasai

Zuph gives his name to a region called the land of Zuph in First Samuel nine.

Samuel's own hometown, Ramah, sat inside that very region.

Amasai already appeared as one of Elkanah's sons back in verse twenty five.

The backward chain keeps connecting to names already given earlier in the chapter.

Every generation named here has already been placed somewhere in this genealogy.

🗺️ Zuph named a region near Samuel's home

🏡 Samuel's hometown Ramah sat inside it

🔗 Amasai already appeared in verse twenty five

📖 Every name connects back through the chapter

## ⚡ The Son Of Tahath The Son Of Assir The Son Of Ebiasaph The Son Of Korah

The backward chain now reaches all the way to Korah.

This is the same Korah whose rebellion was struck down in Numbers sixteen.

His descendants were spared, exactly as Numbers twenty six had already stated.

Now one of those descendants leads Israel's temple worship.

A family once judged for rebellion now stands closest to God's presence in praise.

⚡ The chain reaches Korah

🌋 Korah's rebellion was judged in Numbers sixteen

✅ His descendants were spared

📖 His family now leads temple worship

## 👴 The Son Of Izhar The Son Of Kohath The Son Of Levi The Son Of Israel

The genealogy finally reaches all the way back to Jacob, called Israel here.

Most genealogies in this chapter stop at Levi and go no further.

Reaching back to the patriarch himself is unusually deep.

It ties temple worship to the very oldest covenant identity of God's people.

Heman's music ministry is rooted in the entire story of Israel, not just one family.

👴 The chain reaches Jacob, called Israel

🛑 Most genealogies here stop at Levi

🔗 This one goes further back

📖 Worship is rooted in Israel's whole story

# FirstChronicles 6:39-43
# 🎤 Asaph Stands At His Right Hand
---
## 👬 His Brother Asaph Who Stood On His Right Hand

Brother here means a fellow Levite serving alongside Heman, not a literal sibling.

Standing at the right hand marks Asaph as second in the worship leadership.

Many Psalms carry Asaph's own name in their titles, including Psalm fifty.

His descendants continue serving as temple musicians for generations after him.

A single title, right hand, tells the reader exactly where he stood in rank.

👬 Brother means fellow Levite here

🥈 Right hand marks second rank

🎼 His descendants kept serving after him

📖 Many Psalms carry Asaph's name

## 🔙 The Son Of Michael The Son Of Baaseiah The Son Of Malchiah

Asaph's backward genealogy begins here, just like Heman's did.

Michael, Baaseiah, and Malchiah appear nowhere else in the Bible.

Their names are still preserved carefully, generation by generation.

This kind of record mattered for proving a family's right to serve in worship.

An unknown name in a genealogy still carried real legal and religious weight.

🔙 The backward genealogy begins

🤷 These three names appear nowhere else

📜 Careful preservation still mattered

📖 Names proved a right to serve

## 🔁 The Son Of Ethni The Son Of Zerah The Son Of Adaiah

This Zerah is another example of a common name reused across different families.

Judah's famous son Zerah, from Genesis thirty eight, is a completely different man.

Levite records and tribal records both drew from the same limited pool of names.

Nothing here connects Asaph's ancestor to Judah's tribe at all.

Readers have to check context, not just a name, to know who is meant.

🔁 Zerah was a common reused name

👨 A different man than Judah's son

🌐 Names were drawn from a shared pool

📖 Context, not the name alone, tells who

## 🔚 The Son Of Jahath The Son Of Gershom The Son Of Levi

Asaph's chain closes at Gershom, Levi's other son besides Kohath.

Heman descended from Kohath, but Asaph descends from Gershom instead.

Two different sons of Levi now stand together leading Israel's worship music.

The third position, at the left hand, still belongs to a leader from Merari's family.

All three of Levi's sons end up represented in temple worship leadership.

🔚 Asaph's chain closes at Gershom

🔀 A different Levi son than Heman

👬 Two branches lead worship together

📖 All three of Levi's sons will be represented

# FirstChronicles 6:44-49
# 🎻 Ethan Completes The Three
---
## 🎻 Ethan The Son Of Kishi Stood On The Left Hand

Ethan completes the three man team leading Israel's temple music.

Heman stood at the center, Asaph stood at his right hand, and Ethan stood at his left.

Ethan descends from Merari, the third son of Levi named all the way back in verse one.

Some later passages call this same man Jeduthun, likely a second name or title.

All three original branches of Levi now stand together in one worship team.

🎻 Ethan completes the three man team

↔️ Heman center, Asaph right, Ethan left

🔀 Ethan descends from Merari's line

📖 All three Levite branches now unite

## 🔙 The Son Of Hashabiah The Son Of Amaziah The Son Of Hilkiah

Ethan's backward genealogy continues through three more otherwise unknown names.

This Hilkiah is not the same man who found the Book of the Law in Second Kings.

The same name can belong to entirely unrelated people even within one chapter.

Careful readers track a name's whole context, not just the sound of it.

The chain presses on toward Levi with no more famous stops along the way.

🔙 Ethan's genealogy continues backward

🚫 Not the same Hilkiah as Second Kings

🌐 Same names can belong to unrelated people

📖 Context matters more than the name alone

## 🔚 The Son Of Mahli The Son Of Mushi The Son Of Merari The Son Of Levi

Ethan's chain finally closes at Levi, just as Heman's and Asaph's did.

All three musicians now trace back to the same great grandfather, Levi himself.

Their three separate branches, Kohath, Gershom, and Merari, all converge on temple worship.

This was not an accident of one gifted family, it was drawn from all of Levi's descendants.

Israel's worship leadership represented the whole tribe, not just one favored line.

🔚 Ethan's chain closes at Levi

👴 All three musicians share one ancestor

🌳 Three branches converge on worship

📖 Leadership drew from the whole tribe

## 🧹 Their Brethren Also The Levites Were Appointed Unto All Manner Of Service

Not every Levite became a singer, priest, or famous leader.

Most Levites carried out ordinary, essential tasks around the tabernacle.

That included setting up, guarding, transporting, and maintaining the sacred furniture.

These duties rarely appear in a story, but the tabernacle could not run without them.

Ordinary service was still counted as real service to God.

🧹 Most Levites did ordinary tasks

🚚 Setup, guarding, and transport were included

🏕️ The tabernacle depended on this work

📖 Ordinary service still counted as service

## 🚪 But Aaron And His Sons Offered Upon The Altar

This verse draws a firm line between two different Levite roles.

Only Aaron's actual descendants, the priests, could offer sacrifices on the altar.

Only they could enter the most holy place to make atonement for Israel.

Every other Levite supported that work but never performed it themselves.

This division follows exactly what God commanded Moses back in Exodus and Leviticus.

🚪 A firm line separates two roles

🔥 Only priests offered on the altar

🕍 Only priests entered the most holy place

📖 This followed Moses' own instructions

# FirstChronicles 6:50-53
# 🔁 The Priestly Line Retold
---
## 🔁 These Are The Sons Of Aaron Eleazar His Son Phinehas His Son

This is the exact same chain already given back in verses four through eight.

Chronicles is not making a mistake by repeating itself here.

The first telling carried the priestly line all the way to the Babylonian exile.

This second telling exists for a different reason entirely.

It sets up the list of cities the priestly family actually lived in.

🔁 Same chain as verses four through eight

✅ Not a mistake, a deliberate repeat

🎯 This telling has a different purpose

📖 It leads into a list of cities

## ✅ Bukki His Son Uzzi His Son Zerahiah His Son

The chain matches the earlier telling name for name.

This kind of exact match confirms the record's own internal consistency.

A genealogy repeated twice with no changes is a genealogy worth trusting.

Consistency like this mattered greatly to the people who first copied and preserved it.

The record treats its own accuracy as something worth double checking.

✅ The names match exactly

🔍 Exact matches show consistency

📜 Consistency mattered to ancient copyists

📖 The record checks its own accuracy

## 🔁 Meraioth His Son Amariah His Son Ahitub His Son

The chain still matches the earlier list precisely at this point.

Amariah and Ahitub already appeared once in verses seven and eleven.

This is now the third time these two particular names surface in one chapter.

Reused names remain one of this chapter's clearest patterns.

Watching for repeated names helps a reader track which generation is in view.

✅ Still matches the earlier list

🔁 Third appearance of these two names

📊 A clear pattern across the chapter

📖 Repeated names mark the generation

## 🛑 Zadok His Son Ahimaaz His Son

This second telling of the chain stops exactly where verse eight stopped, at Ahimaaz.

It does not continue on to the exile like the first telling did.

Zadok and Ahimaaz mark the era of David and Solomon's kingdom.

That era is exactly when the city assignments about to be listed took place.

The genealogy stops precisely where the story needs it to stop.

🛑 Stops at Ahimaaz, not the exile

👑 Marks the era of David and Solomon

🏙️ That era matches the coming city list

📖 The stopping point was deliberate

# FirstChronicles 6:54-60
# 🏙️ Cities For Aaron's Family
---
## 🏘️ Their Dwelling Places Throughout Their Castles In Their Coasts

Castles here is an old word for fortified towns, not stone medieval fortresses.

Coasts simply means territory or borders in this older style of English.

For theirs was the lot means the land was assigned by casting lots, not by choice.

Joshua twenty one describes the original process this verse now looks back on.

Even land assignment was treated as something God decided, not something people fought over.

🏘️ Castles means fortified towns here

🗺️ Coasts means territory or borders

🎲 The lot means land assigned by casting lots

📖 God decided the assignment, not people

## 🏛️ They Gave Them Hebron In The Land Of Judah

Hebron was already one of the oldest and most significant cities in Israel's story.

Genesis twenty three records Abraham buying a burial site there for Sarah.

That same city now becomes home to Aaron's priestly descendants.

A city tied to Israel's founding patriarch now hosts its founding priestly family.

The two oldest threads of Israel's story meet in one place.

🏛️ Hebron was already historically significant

⚰️ Abraham bought a burial site there

🕍 It now hosts the priestly family

📖 Two old threads of the story meet here

## 🏙️ But The Fields Of The City They Gave To Caleb

The priests received the walled town itself, not the farmland surrounding it.

That farmland instead stayed with Caleb, son of Jephunneh.

Joshua fourteen already promised Caleb this exact region for his own courage and faith.

This verse quietly confirms that earlier promise was honored in full.

Two different families could share one city without losing what was rightfully theirs.

🏙️ Priests got the town, not the fields

🌾 Fields stayed with Caleb's family

🤝 This honors Joshua fourteen's earlier promise

📖 Two families both kept their share

## 🏃 Hebron The City Of Refuge

A city of refuge was a safe place for someone who killed another person by accident.

Numbers thirty five and Joshua twenty first established six such cities across Israel.

Someone fleeing there could avoid instant revenge from a victim's grieving family.

They still had to stand trial before the town's elders to prove it was truly an accident.

Justice and mercy both had a place inside this one system.

🏃 A refuge for accidental killers

⚖️ Numbers and Joshua established six such cities

👴 Elders still judged the case

📖 Justice and mercy worked together

## 🌾 Libnah With Her Suburbs And Jattir And Eshtemoa

Suburbs in this old sense means open pastureland around a town, not modern housing.

That open land gave the priestly families room to raise livestock near their homes.

Libnah, Jattir, and Eshtemoa were all towns inside Judah's own territory.

Priests needed to live close enough to serve at the tabernacle and later the temple regularly.

Their homes and their work were never meant to be far apart.

🌾 Suburbs meant open pastureland

🐑 It gave room to raise livestock

🗺️ All three towns sat inside Judah

📖 Priests lived near where they served

## 🏘️ Hilen With Her Suburbs Debir With Her Suburbs Ashan And Bethshemesh

Four more towns round out Judah's contribution to the priestly family.

Debir was once a Canaanite stronghold before Israel's conquest under Joshua.

Bethshemesh later becomes the town where the ark of the covenant rests after the Philistines return it.

First Samuel six tells that dramatic story in full.

Ordinary town names on a list can carry extraordinary history behind them.

🏘️ Four more Judah towns listed

⚔️ Debir was once a Canaanite stronghold

📦 Bethshemesh later welcomes the returned ark

📖 Ordinary names can hide big history

## 🗺️ Geba And Alemeth And Anathoth Thirteen Cities

Benjamin's territory adds three more towns to the priestly family's holdings.

Anathoth becomes especially significant many centuries later.

It is the hometown of the prophet Jeremiah, named in Jeremiah chapter one.

The chapter closes this section with a clear final count, thirteen cities total.

A prophet's roots trace all the way back to this brief list in Chronicles.

🗺️ Benjamin adds three more towns

✍️ Anathoth is Jeremiah's hometown

🔢 Thirteen cities total for this family

📖 A prophet's roots trace back here

# FirstChronicles 6:61-65
# 🎯 The Rest Of The Levites Assigned
---
## 👥 Unto The Sons Of Kohath Which Were Left Ten Cities

Which were left means the Kohathite families outside Aaron's own priestly branch.

Aaron's descendants already received their thirteen cities in the previous section.

These other Kohathite families now receive ten separate cities of their own.

Half the tribe of Manasseh supplied this particular set of towns.

Not every Levite family lived near the others, even within the same clan.

👥 The wider Kohathite families, not Aaron's line

🏙️ Aaron's branch already had thirteen cities

🔟 These families received ten more

📖 Even one clan spread across different lands

## 🔢 To The Sons Of Gershom Thirteen Cities

Gershom's families received their own thirteen cities from four different tribes.

Issachar, Asher, Naphtali, and Manasseh in Bashan all contributed land.

That spread reached across much of northern Israel.

No single tribe carried the whole burden of housing the Levites alone.

Every corner of the land ended up hosting at least one Levite family.

🔢 Thirteen cities from four tribes

🧭 The spread reached northern Israel

🤝 No tribe carried the burden alone

📖 Every region hosted a Levite family

## 🧮 Unto The Sons Of Merari Twelve Cities

Merari's families received twelve cities from three more tribes.

Reuben, Gad, and Zebulun each contributed land from their own territory.

Adding up all three Levite branches gives a striking total.

Kohath's ten, Gershom's thirteen, and Merari's twelve together equal thirty five cities.

Aaron's own thirteen bring the full total across the whole tribe of Levi to forty eight.

🔢 Twelve cities from three more tribes

➕ Reuben Gad and Zebulun contributed

🧮 The Levite total reaches forty eight cities

📖 Numbers thirty five already set that exact number

## 📋 The Children Of Israel Gave To The Levites These Cities

This verse steps back to summarize the whole system in one sentence.

All of Israel, not just certain tribes, provided land for the Levites.

Numbers eighteen already explained why the Levites needed this arrangement in the first place.

They received no single territorial inheritance like the other twelve tribes did.

Scattering them among every tribe meant their teaching role reached the whole nation.

📋 A summary of the whole system

🇮🇱 All of Israel provided the land

🚫 Levites got no single territory of their own

📖 Scattering them spread their teaching everywhere

## 🏷️ They Gave By Lot Which Are Called By Their Names

Judah, Simeon, and Benjamin are named here as three more contributing tribes.

This actually repeats territory already described back in verses fifty seven through sixty.

Chronicles often summarizes a list right after giving its full detail.

Which are called by their names simply means the next verses will name each city.

A short summary line often signals more specific detail is coming right behind it.

🔁 Judah Simeon and Benjamin repeat here

📝 This summarizes verses fifty seven to sixty

🏷️ Called by their names means detail is coming

📖 A summary often leads into more detail

# FirstChronicles 6:66-70
# 🌄 Ephraim And Manasseh's Share
---
## 👥 The Residue Of The Families Of The Sons Of Kohath

Residue means the Kohathite families still waiting for their own cities at this point.

Ephraim's territory now provides land for this remaining group.

Every branch of Kohath's large family eventually receives a place to live.

No family was simply forgotten or left without an assigned home.

Careful, complete bookkeeping runs through this entire section of the chapter.

👥 Residue means the remaining families

🗺️ Ephraim provides their territory

✅ No family was left out

📖 The record stays careful and complete

## 🏛️ Shechem In Mount Ephraim The City Of Refuge

Shechem carries enormous history well before this brief mention.

Genesis thirty three records Jacob buying land there and settling his family.

Joshua twenty four records Israel renewing its covenant with God at that very spot.

Joseph's bones were also buried at Shechem after Israel finally entered the land.

Now this same historic town also serves as one of the six cities of refuge.

🏛️ Shechem carries deep history

🏕️ Jacob settled and bought land there

📜 Israel renewed its covenant there in Joshua

📖 It now serves as a city of refuge

## ⚔️ Gezer With Her Suburbs And Jokmeam With Her Suburbs And Bethhoron

Bethhoron is remembered for one of Joshua's most dramatic battles.

Joshua ten records the sun and moon standing still during Israel's victory there.

That battlefield now becomes a quiet home for one of Kohath's priestly families.

A place once defined by war becomes a place defined by ordinary daily life.

History and everyday life often sit on the very same ground.

⚔️ Bethhoron recalls Joshua's famous battle

☀️ The sun stood still there in Joshua ten

🏡 The battlefield becomes an ordinary home

📖 History and daily life share the same ground

## 🗺️ Aijalon With Her Suburbs And Gathrimmon With Her Suburbs

Two more towns complete Ephraim's contribution to the Kohathite families.

Aijalon sits in the same valley where Joshua's battle at Bethhoron continued.

Gathrimmon rounds out this stretch of territory with no separate story attached to it.

Not every town on this list needs a dramatic history to matter.

Some simply mattered because a family needed somewhere to live.

🗺️ Two more towns from Ephraim

⚔️ Aijalon sits near Joshua's battle site

🏘️ Gathrimmon needed no dramatic story

📖 A home mattered just by being needed

## 🗺️ Out Of The Half Tribe Of Manasseh Aner And Bileam

The half tribe of Manasseh contributes two final towns to this group.

For the family of the remnant closes out the very last unplaced Kohathite family.

Every single Kohathite family named in this chapter now has a recorded home.

The careful bookkeeping that began back in verse fifty four finally reaches its end.

Nothing about this record was left loose or unfinished.

🗺️ Manasseh gives two final towns

🏁 This closes the last unplaced family

✅ Every Kohathite family now has a home

📖 The record leaves nothing unfinished

# FirstChronicles 6:71-76
# 🏔️ Gershom's Family Settles North
---
## 🏔️ Golan In Bashan With Her Suburbs

Golan becomes another one of the six cities of refuge across Israel.

It gives its name to the region still known today as the Golan Heights.

An ancient town assigned to a Levite family left its mark on a modern map.

Bashan sat on the far northeastern edge of Israel's settled land.

Even the far frontier needed a place of safety and a Levite family present.

🏔️ Golan was another city of refuge

🗺️ Its name survives in the Golan Heights

🧭 Bashan sat on the far frontier

📖 The frontier needed refuge too

## 🏛️ Ashtaroth With Her Suburbs

Ashtaroth keeps the name of Ashtoreth, a Canaanite goddess worshiped before Israel arrived.

Israel resettled many existing towns instead of always building brand new ones.

Keeping an old name did not mean keeping the old worship that went with it.

A Levite family now lived in a town once devoted to a false god.

The land itself was being reclaimed for God's purposes, name and all.

🏛️ Named after the goddess Ashtoreth

🏘️ Israel often resettled existing towns

🚫 The old name outlived the old worship

📖 The land was reclaimed for God's purposes

## ✨ Kedesh With Her Suburbs Daberath With Her Suburbs

Issachar's territory contributes its first two towns to Gershom's families here.

This Kedesh is a different town than the one named later in verse seventy six.

More than one Israelite town shared the name Kedesh, which means holy or set apart.

Daberath sat near Mount Tabor in the same general region.

Readers should not assume every repeated name points to the very same place.

🗺️ Issachar's first two towns listed

🔁 A different Kedesh than verse seventy six

✨ Kedesh means holy or set apart

📖 Repeated names do not mean the same place

## 🔁 Ramoth With Her Suburbs And Anem With Her Suburbs

Two more Issachar towns close out that tribe's contribution.

This Ramoth is a different town than Ramoth in Gilead, named later in the chapter.

The Bible reuses place names often enough that context always has to settle it.

Anem is otherwise unmentioned anywhere else in scripture.

Even a town with no other story still received a Levite family and a purpose.

🗺️ Two more towns close out Issachar

🔁 A different Ramoth than the one in Gilead

❓ Anem has no other story

📖 Every town still had a purpose

## 🤝 Mashal With Her Suburbs And Abdon And Hukok And Rehob

Asher's territory contributes four towns in this pair of verses.

Rehob is a name shared with more than one location described in the book of Joshua.

None of these four towns carries a major individual story of its own.

Together they simply completed Asher's share of the responsibility to house the Levites.

A whole tribe's faithfulness could show up in something as plain as a land list.

🗺️ Four towns from Asher's territory

🔁 Rehob is a name used elsewhere too

🤝 Together they completed Asher's share

📖 Faithfulness can look like a plain land list

## 🧭 Kedesh In Galilee With Her Suburbs And Hammon And Kirjathaim

Naphtali's Kedesh is specifically marked in Galilee to distinguish it from Issachar's Kedesh.

This Kedesh in Galilee is also counted among the six cities of refuge.

That means Golan and this Kedesh both sit inside this one short section.

Hammon and Kirjathaim close out Naphtali's contribution with no further detail given.

Two cities of refuge appearing so close together shows how deliberately they were spread across the land.

🧭 Marked in Galilee to avoid confusion

🏔️ Also a city of refuge

🗺️ Two refuge cities appear in this section alone

📖 Refuge cities were spread out on purpose

# FirstChronicles 6:77-81
# 🌾 Merari's Family Completes The Map
---
## 👥 Unto The Rest Of The Children Of Merari Rimmon And Tabor

The rest of the children of Merari means the final unplaced branch of that family.

Zebulun's territory provides their first two towns.

Mount Tabor gives its name to the second town, a well known landmark in northern Israel.

Every branch of every Levite family has now nearly received its full assignment.

Just five verses remain to finish the whole list that began back in verse fifty four.

👥 The final unplaced Merarite branch

🗺️ Zebulun provides the first towns

⛰️ Tabor is a well known landmark

📖 The whole list is almost finished

## 🧭 Bezer In The Wilderness With Her Suburbs

On the other side Jordan means these towns sit east of the river, unlike most of Israel's main territory.

Bezer becomes another one of the six cities of refuge scattered across the land.

That brings the refuge city count named across this chapter to five so far.

One more city of refuge is still waiting to be named just two verses ahead.

The full set of six was never left to chance or convenience.

🧭 East of the Jordan River

🏃 Bezer is another city of refuge

🔢 Five refuge cities now named

📖 One more refuge city is still coming

## 🗺️ Jahzah With Her Suburbs And Kedemoth And Mephaath

Reuben's territory contributes three more towns in this short stretch.

None of these three carries a major story elsewhere in scripture.

They still round out Reuben's full share of responsibility for housing the Levites.

A tribe's faithfulness rarely gets a dramatic story, most of it looks like this instead.

Plain obedience, repeated across many towns, is still real obedience.

🗺️ Three more towns from Reuben

❓ None carries a major story

🤝 They complete Reuben's full share

📖 Plain obedience is still real obedience

## 🎯 Out Of The Tribe Of Gad Ramoth In Gilead

Ramoth in Gilead is the sixth and final city of refuge named across this whole record.

Together with Hebron, Shechem, Golan, Kedesh in Galilee, and Bezer, the full set is now complete.

Numbers thirty five and Joshua twenty both required exactly six such cities.

This one quiet verse finally closes out a requirement given generations earlier.

A single law given through Moses is still being carefully kept this many years later.

🎯 The sixth and final city of refuge

🔢 Six cities of refuge now complete

📜 Numbers and Joshua required exactly six

📖 An old law was still being kept

## 👼 And Mahanaim With Her Suburbs

Mahanaim already carries real history long before this list.

Genesis thirty two records Jacob meeting God's angels there on his way home.

Second Samuel seventeen records David fleeing there during his own son Absalom's rebellion.

A town tied to two of Israel's most personal, painful family stories now houses a Levite family.

Even a place scarred by family conflict still had room for God's ongoing work.

👼 Jacob met angels there in Genesis

👑 David fled there during Absalom's revolt

💔 A place tied to family conflict

📖 God's work continued there anyway

## 👑 Heshbon With Her Suburbs And Jazer With Her Suburbs

Heshbon was once the capital city of Sihon, the Amorite king.

Numbers twenty one records Israel defeating Sihon and taking this very city.

A former enemy capital now quietly closes out the entire Levite city list.

The chapter ends not with a battle or a famous name, but with an ordinary town.

Forty eight cities, scattered from Judah to Bashan, mark the Levites' true inheritance across all of Israel.

👑 Heshbon was once Sihon's capital

⚔️ Israel conquered it in Numbers twenty one

🏁 An old enemy capital closes the list

📖 Forty eight cities were the Levites' true inheritance
`.trim();

export const FIRST_CHRONICLES_SIX_PERSONAL_SECTIONS = parseFirstChroniclesSixRawNotes(FIRST_CHRONICLES_SIX_RAW_NOTES);
