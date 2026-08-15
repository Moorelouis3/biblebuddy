export type FirstChroniclesThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesThreeRawNotes(rawText: string): FirstChroniclesThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 3:${startVerse}` : `1 Chronicles 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Chronicles 3 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_THREE_RAW_NOTES = `# FirstChronicles 3:1-4
# 👑 David's Sons Born In Hebron
---
## 📚 Now These Were The Sons Of David

Chronicles was written for people who had just returned from exile in Babylon.

Many of them no longer knew their own family history in detail.

This chapter answers a real question those first readers were quietly asking.

The list settles exactly who belongs to David's own family.

It names sons, wives, and even a few daughters along the way.

📚 Chronicles was written after the exile

❓ Readers no longer knew their own history

👪 This list settles who belongs to David

📖 The names proved God's promise survived

## 🏙️ Which Were Born Unto Him In Hebron

Hebron was David's very first capital city, before Jerusalem.

He ruled there for several years before uniting the whole kingdom.

Choosing Hebron was not random.

It sat inside Judah's own tribal land and already carried deep history with Abraham.

Six sons were born to him during those Hebron years alone.

🏙️ Hebron was David's first capital

⏳ He ruled there several years

🗺️ Hebron sat inside Judah's own land

📖 Six sons were born there

## 👑 The Firstborn Amnon, Of Ahinoam The Jezreelitess

Amnon was David's oldest son and next in line for the throne by custom.

Second Samuel thirteen tells what he later does to his own half sister Tamar.

That crime eventually costs him his life.

His own brother Absalom has him killed in revenge two full years later.

Being firstborn guaranteed nothing in this family.

👑 Amnon was David's firstborn son

📜 Second Samuel thirteen tells his crime

💀 Absalom later has him killed

📖 Birth order guaranteed him nothing

## ❓ The Second Daniel, Of Abigail The Carmelitess

This son is not the famous prophet Daniel from the book of Daniel.

Second Samuel three names this same son Chileab instead of Daniel.

Ancient records sometimes give one person two different names.

Neither name appears again anywhere later in his own story.

He seems to have died young, since he never factors into any later conflict.

❓ Not the prophet Daniel

🔀 Second Samuel calls him Chileab

🤐 He never reappears in Scripture

📖 He likely died young

## 🏃 The Third, Absalom The Son Of Maachah The Daughter Of Talmai King Of Geshur

Absalom's mother was not an Israelite at all.

Talmai ruled Geshur, a small kingdom northeast of Israel, as a foreign king.

That royal blood may explain why Absalom carried himself with such open ambition.

After killing Amnon, Absalom flees to Geshur and hides with his own grandfather for years.

Family ties on his mother's side become his escape route from justice.

👑 Maachah's father was a foreign king

🗺️ Geshur sat northeast of Israel

🏃 Absalom later flees there after murder

📖 His mother's family became his hideout

## ⚔️ The Fourth, Adonijah The Son Of Haggith

Adonijah is David's fourth son, next in line after three older brothers are gone.

Amnon is dead, Absalom is dead, and Chileab has apparently died too by this point.

First Kings one shows Adonijah trying to crown himself king while David is still alive.

Solomon, born later, ends up taking the throne instead.

Being next in line was never a guarantee in David's own household.

👑 Adonijah is next in line by then

⚔️ He later tries to crown himself

👶 Solomon takes the throne instead

📖 Line order was never a guarantee

## 💍 The Fifth, Shephatiah Of Abital: The Sixth, Ithream By Eglah His Wife

Shephatiah and Ithream complete the list of six sons born to David in Hebron.

Neither man is ever mentioned again anywhere else in the Bible.

Six different mothers are named across these six sons, not one single wife.

Marrying widely was common for a king building alliances across tribes and regions.

Their names still earn a permanent place in the record, even without a story attached.

👶 Two more sons close the Hebron list

🤐 Neither appears again in Scripture

💍 Six sons, six different mothers

📖 A permanent record, even without a story

## 🔢 And In Jerusalem He Reigned Thirty And Three Years

David reigned seven years and six months in Hebron before Jerusalem was even his.

Thirty and three years is simply the old way of saying thirty three years.

Jerusalem becomes David's permanent capital for the rest of his long reign.

The city named here stays the capital for the rest of the Old Testament.

🔢 Thirty and three means thirty three

🏙️ Jerusalem became David's lasting capital

⏳ Over forty years on the throne total

📖 Jerusalem stays the capital going forward

# FirstChronicles 3:5-9
# 🏙️ Sons Born In Jerusalem, And The Household Beyond Them
---
## 🏙️ And These Were Born Unto Him In Jerusalem

The list now shifts from Hebron to Jerusalem, David's new capital city.

More sons follow, born after Israel's twelve tribes were finally united under one king.

Living in Jerusalem changed the shape of David's own household.

More wives, more sons, and eventually far more complicated family conflict followed.

🏙️ The scene shifts to Jerusalem

👑 Sons follow after his full kingship

👪 A larger household grows there

📖 More sons brought more conflict

## 📛 Shimea, And Shobab, And Nathan, And Solomon, Four, Of Bathshua The Daughter Of Ammiel

Bathshua is simply another spelling of the name Bathsheba, the woman from Second Samuel eleven.

Ammiel is the same man Second Samuel calls Eliam, just with the two name parts swapped.

Swapping word order inside a Hebrew name was not unusual in ancient writing.

Four sons are named here, born to David and Bathsheba after their marriage.

📛 Bathshua is another spelling of Bathsheba

🔀 Ammiel matches the name Eliam

📝 Ancient names sometimes swapped word order

📖 Four sons came from this marriage

## 👶 And Nathan

Nathan and Solomon are full brothers, both sons of David and Bathsheba.

Solomon becomes the next king, and this same chapter keeps tracing his royal line for many verses.

Nathan never becomes king, yet Luke's Gospel traces Jesus back through Nathan instead of Solomon.

Two different Gospel genealogies choose two different sons from this same short list.

👶 Nathan and Solomon are full brothers

👑 Solomon's line is traced next

📜 Luke traces Jesus through Nathan instead

📖 Two Gospels, two different sons

## 🤐 Ibhar Also, And Elishama, And Eliphelet

Three more sons follow, born to David through other wives in Jerusalem.

None of these three becomes important anywhere else in Scripture.

Their names still earn a place in this careful royal record.

A king's family record kept every son, not only the famous ones.

👶 Three more sons of David

🤐 None becomes significant later

📋 Still fully recorded here

📖 Every son counted, not only the famous

## 📜 And Nogah, And Nepheg, And Japhia

Three more names follow, continuing the list from the previous verse without a break.

Nepheg already appears once earlier in Second Samuel five, in an almost identical list.

That earlier list in Samuel helps confirm this record is accurate, not invented later.

Two different books preserve the very same family record independently.

👶 Three more sons continue the list

📜 Nepheg also appears in Second Samuel

✅ Two books confirm the same record

📖 Independent records that still agree

## 🔁 And Elishama, And Eliada, And Eliphelet, Nine

Elishama and Eliphelet already appeared once in verse six of this very chapter.

A family reusing the exact same name twice usually means the first child died young.

Giving a later son the same name kept that memory alive in the family.

Nine is the total count of sons born to David in Jerusalem by this point.

🔁 Elishama and Eliphelet repeat verse six

💔 Likely means an earlier child died

👶 The name was reused for a new son

📖 Nine sons total in Jerusalem

## 📋 These Were All The Sons Of David, Beside The Sons Of The Concubines, And Tamar Their Sister

This verse admits the list above is not even complete.

David also had sons through concubines that this record never bothers to name.

Tamar is named here as their sister, the only daughter mentioned in this whole family.

Second Samuel thirteen tells her story, assaulted by her own half brother Amnon.

Naming her here, without explanation, quietly honors a woman the rest of the Bible does not forget.

📋 The list admits it is incomplete

👤 Unnamed sons came through concubines

💔 Tamar's story is told in Second Samuel

📖 She is named, even without explanation

# FirstChronicles 3:10-14
# 📜 Solomon's Line, King After King, To Josiah
---
## 👑 And Solomon's Son Was Rehoboam, Abia His Son, Asa His Son, Jehoshaphat His Son

This verse begins a straight line of kings, father to son, one after another.

Rehoboam's own bad decisions split the kingdom into Israel and Judah in First Kings twelve.

Everything from here forward follows only the southern kingdom of Judah, David's own line.

Matthew's Gospel opens with almost this exact same chain of names centuries later.

👑 A straight line of kings begins here

💔 Rehoboam's choices split the kingdom

🏛️ Only Judah's line is tracked from here

📖 Matthew's Gospel repeats this same chain

## 💔 Joram His Son, Ahaziah His Son, Joash His Son

Ahaziah's mother was Athaliah, a daughter from the wicked house of King Ahab of Israel.

That marriage brought Ahab's own corruption directly into David's royal line for a generation.

Matthew's Gospel skips straight past Ahaziah, Joash, and the next king listed after him.

Many scholars believe Matthew left these three out simply to keep his own count even at fourteen.

👑 Ahaziah's mother came from Ahab's house

💔 Her family brought corruption into David's line

✂️ Matthew's genealogy skips three kings here

📖 A tidy count, not a hidden king

## 📛 Amaziah His Son, Azariah His Son, Jotham His Son

Azariah and Uzziah are two names for the very same king of Judah.

Second Chronicles twenty six tells how leprosy struck him after he acted like a priest.

He carried the second name Uzziah for the rest of his recorded story after that.

Kings in this period were not unusual for holding more than one name.

📛 Azariah is also called Uzziah

🤒 Leprosy struck him for acting like a priest

📜 Second Chronicles twenty six tells the story

📖 One king, two names in Scripture

## 💔 Ahaz His Son, Hezekiah His Son, Manasseh His Son

Ahaz was one of Judah's worst kings, closing the temple and worshiping foreign gods.

His own son Hezekiah reversed nearly everything, becoming one of Judah's best kings instead.

Manasseh, Hezekiah's son, then reverses course again into the worst evil Judah ever sees.

A father's faith never guaranteed his son would follow it, in either direction.

💔 Ahaz closed the temple in evil

✅ Hezekiah reversed course toward good

😈 Manasseh reversed course again into evil

📖 Faith was never simply inherited

## 💀 Amon His Son, Josiah His Son

Amon reigned only two years before his own servants killed him in his own house.

Josiah, his son, becomes king at only eight years old after that sudden death.

Second Kings twenty two tells how Josiah later leads Judah's last great religious reform.

He is the final king of real faith before the exile finally arrives.

💀 Amon was killed by his own servants

👶 Josiah becomes king at only eight

📜 Second Kings twenty two tells his reform

📖 Judah's last faithful king before exile

# FirstChronicles 3:15-16
# ⚔️ The Sons Of Josiah, And The Kings Before Exile
---
## 👶 And The Sons Of Josiah Were, The Firstborn Johanan, The Second Jehoiakim, The Third Zedekiah, The Fourth Shallum

Four sons of Josiah are named here in the order they were born.

Johanan, the actual firstborn, never becomes king at all in the historical record.

The next three all reign at different points during Judah's final chaotic years.

Being born first still did not guarantee the throne in this family.

👶 Four sons listed in birth order

🤐 Johanan never becomes king

👑 The other three all reign later

📖 Birth order still guaranteed nothing

## 📛 The Fourth Shallum

Shallum sounds like a minor name easy to skip past in this list.

Jeremiah twenty two directly identifies Shallum as the king better known as Jehoahaz.

Jehoahaz reigned only three months before Egypt's Pharaoh removed him and carried him away captive.

A name this brief in a genealogy can hide an entire short, sad reign.

📛 Shallum is another name for Jehoahaz

📜 Jeremiah twenty two makes the connection

⏳ He reigned only three months

📖 A short name can hide a short reign

## 🔀 And The Sons Of Jehoiakim: Jeconiah His Son, Zedekiah His Son

Jeconiah is another name for King Jehoiachin, carried off to Babylon in Second Kings twenty four.

This verse also lists a Zedekiah as Jehoiakim's son, separate from the Zedekiah named back in verse fifteen.

Second Kings identifies that earlier Zedekiah as a brother of Jehoiakim, not his son.

The text does not fully explain why a second man here shares that same name.

📛 Jeconiah is another name for Jehoiachin

🔀 A second Zedekiah appears here

❓ The text does not fully explain why

📖 Two men, one repeated royal name

# FirstChronicles 3:17-19
# ⛓️ Jeconiah's Sons, And Zerubbabel Born In Exile
---
## ⛓️ And The Sons Of Jeconiah, Assir, Salathiel His Son

Jeconiah was still a young king when Babylon carried him away in chains.

Some scholars read Assir here not as a proper name but as the word for captive itself.

If that reading is correct, this verse says Jeconiah the captive fathered Salathiel.

Either way, this whole family line begins in exile, far from its own homeland.

⛓️ Assir may simply mean captive

👑 Jeconiah was taken to Babylon young

❓ Scholars read this verse two ways

📖 This royal line begins in exile

## 👶 Malchiram Also, And Pedaiah, And Shenazar, Jecamiah, Hoshama, And Nedabiah

Six more sons of Jeconiah are named here, all born during his years in exile.

None of these six becomes famous anywhere else in the Bible.

Jeremiah once said Jeconiah would die as though he were childless, with no heir on the throne.

A long list of real sons here shows that curse never meant he had no children at all.

👶 Six more sons of Jeconiah

🤐 None becomes famous elsewhere

📜 Jeremiah's childless curse meant no throne

📖 It never meant no children at all

## 🔀 And The Sons Of Pedaiah Were, Zerubbabel, And Shimei

Ezra and Haggai both call Zerubbabel the son of Shealtiel instead of Pedaiah.

Shealtiel and Pedaiah were brothers, both sons of Jeconiah named in the verse just before this one.

Many scholars believe Shealtiel died without an heir, and Pedaiah fathered Zerubbabel in his brother's name.

That kind of family arrangement already appeared earlier in this very book, with Sheshan's daughter.

🔀 Ezra calls Zerubbabel Shealtiel's son

👥 Shealtiel and Pedaiah were brothers

👶 Pedaiah likely fathered him for his brother

📖 A pattern already seen earlier in Chronicles

## 🏠 And The Sons Of Zerubbabel, Meshullam, And Hananiah, And Shelomith Their Sister

Zerubbabel leads the very first group of exiles back home to Jerusalem in Ezra chapter one.

He oversees rebuilding the temple's foundation, encouraged directly by the prophets Haggai and Zechariah.

Matthew's Gospel later includes his name in Jesus's own royal genealogy.

A king's grandson born in captivity becomes the man who brings God's people home.

🏠 Zerubbabel leads the exiles home

🏛️ He rebuilds the temple's foundation

📜 Matthew includes him in Jesus's line

📖 Captivity's grandson brings the people home

# FirstChronicles 3:20-24
# 🌳 The Royal Line Outlives The Exile
---
## 👶 And Hashubah, And Ohel, And Berechiah, And Hasadiah, Jushabhesed, Five

Five more sons of Zerubbabel are named here, in addition to the two from the verse before.

None of these five becomes significant anywhere else in the Bible.

Together with Meshullam and Hananiah, that makes seven sons total for Zerubbabel.

A king's grandson in exile still managed to raise a large family of his own.

👶 Five more sons of Zerubbabel

🤐 None becomes significant elsewhere

🔢 Seven sons total are named

📖 A large family, even in exile's shadow

## ⏩ And The Sons Of Hananiah, Pelatiah, And Jesaiah, The Sons Of Rephaiah, The Sons Of Arnan, The Sons Of Obadiah, The Sons Of Shechaniah

This verse suddenly speeds up, listing only one name for each new generation.

Earlier verses gave full lists of brothers, but this one drops that pattern entirely.

Several generations may be compressed into this single verse, not just four or five.

The exact gap in years between these names is simply not stated anywhere.

⏩ The list suddenly speeds up here

👤 Only one name per generation now

⏳ Several generations may be compressed

📖 The exact years are never stated

## 👶 And The Sons Of Shechaniah, Shemaiah, And The Sons Of Shemaiah, Hattush, And Igeal, And Bariah, And Neariah, And Shaphat, Six

Six sons continue Shemaiah's own branch of this long royal family.

By this point in the list, the exile itself is likely a full lifetime in the past.

The family that Jeremiah once said would lose its throne keeps producing sons anyway.

David's line was never allowed to simply vanish, even without a crown to pass down.

👶 Six sons continue Shemaiah's branch

⏳ The exile is now generations past

👑 The throne is gone, the family is not

📖 David's line was never allowed to vanish

## 🔁 And The Sons Of Neariah, Elioenai, And Hezekiah, And Azrikam, Three

Three more sons continue the family line yet another generation forward.

None of these three becomes individually important anywhere else in Scripture.

The pattern by now is familiar, a name, a number, and nothing more.

Even a plain, uneventful generation still earned its place in this careful record.

👶 Three more sons of Neariah

🤐 None becomes important elsewhere

🔁 The pattern feels familiar by now

📖 Even a quiet generation was recorded

## 🌳 And The Sons Of Elioenai Were, Hodaiah, And Eliashib, And Pelaiah, And Akkub, And Johanan, And Dalaiah, And Anani, Seven

Seven sons close out this entire chapter, the last generation the record reaches.

That places this family several generations past Zerubbabel's own return from exile.

The Old Testament closes without any king from this line ever sitting on David's throne again.

Centuries later, Matthew's Gospel picks up this exact same family and carries it forward to Jesus.

The line this whole chapter protects never actually dies out.

👶 Seven sons close the chapter

⏳ Generations pass with no king restored

📜 Matthew later picks up this same line

📖 The promised line never dies out
`.trim();

export const FIRST_CHRONICLES_THREE_PERSONAL_SECTIONS = parseFirstChroniclesThreeRawNotes(FIRST_CHRONICLES_THREE_RAW_NOTES);
