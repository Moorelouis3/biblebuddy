export type MatthewOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewOneRawNotes(rawText: string): MatthewOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 1:${startVerse}` : `Matthew 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Matthew 1 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_ONE_RAW_NOTES = `# Matthew 1:1-6
# 📜 A Promised Royal Line
---
## 📜 The Book Of The Generation

"Generation" here does not mean one single birth.

It means a complete written family record, generation after generation.

Matthew opens his whole Gospel with this record on purpose.

He wants every reader to see exactly who Jesus descended from before the story even starts.

📜 Generation means a full family record

✍️ Matthew records it on purpose

🔑 It opens his entire Gospel

📖 Jesus descent is laid out first

## 👑 The Son Of David, The Son Of Abraham

Matthew picks two names out of thousands of years of history to open with.

David represents the promise of a forever king over Israel.

Abraham represents the promise that every nation on earth would be blessed through his family.

Jesus fulfills both promises at once, in a single sentence.

👑 David means the promised royal line

🌍 Abraham means the promise to all nations

🔗 Jesus connects both ancient promises

📖 Two promises meet in one person

## 👩 Phares And Zara Of Thamar

Thamar is better known today as Tamar, a woman from Genesis thirty eight.

Judah failed to provide for her as the law required.

She took a bold, risky action to get the justice she was owed.

Matthew includes her name here on purpose, not by accident.

God's chosen family line already included someone the culture looked down on.

👩 Tamar appears from Genesis thirty eight

⚖️ Judah failed his duty toward her

💪 She acted boldly to claim justice

📖 God's line included an outsider

## 🌾 Booz Begat Obed Of Ruth

Ruth was not an Israelite by birth.

She came from Moab, a neighboring nation with a troubled history with Israel.

Her loyalty to her mother in law Naomi brought her into Israel's story.

Ruth became the great grandmother of King David himself.

🌾 Ruth came from Moab, not Israel

🤝 Her loyalty brought her into the family

👑 She became David's great grandmother

📖 An outsider became royal ancestry

## 🤐 Her That Had Been The Wife Of Urias

Matthew does not even name her here.

He calls her only "the wife of Urias," meaning Uriah.

That wording quietly points back to David's sin against Uriah in second Samuel.

Even a king's worst failure could not block God's larger plan.

🤐 Her name is left out on purpose

⚔️ The wording recalls David's sin against Uriah

📜 Second Samuel tells the full story

📖 Failure did not stop God's plan

# Matthew 1:7-11
# 👑 Kings Who Rose And Fell
---
## ⏭️ Joram Begat Ozias

This single line actually skips three kings of Judah.

Three kings reigned between Joram and Ozias.

Their names were Ahaziah, Joash, and Amaziah.

Ancient genealogies often skipped names to keep a pattern.

Matthew likely did this to keep his three sets of fourteen even.

👑 Three kings get skipped here

📜 Ahaziah, Joash, and Amaziah are missing

🔢 Ancient genealogies often condensed names

📖 Matthew shaped the list around fourteens

## 😔 Jechonias And His Brethren

Jechonias is better known elsewhere in the Bible as Jehoiachin.

He was the last king of Judah before the Babylonian exile.

The phrase "and his brethren" echoes verse two.

There, Judas and his brothers marked the start of the twelve tribes.

Here, Jechonias and his brothers mark the nation's fall into exile instead.

👑 Jechonias is also called Jehoiachin

🏰 He was Judah's last king before exile

🔁 This phrase echoes verse two's brethren

📖 Unity at the start, exile at this turn

## ⛓️ About The Time They Were Carried Away To Babylon

"Carried away" is the Bible's common phrase for forced exile.

Babylon's army destroyed Jerusalem and its temple around 586 BC.

Thousands of people were marched far from their homeland.

This exile lasted about seventy years before any return began.

Matthew uses this moment to mark where Israel's royal story breaks in two.

⛓️ Carried away means forced exile

🔥 Babylon destroyed Jerusalem and its temple

⏳ The exile lasted about seventy years

📖 This moment splits Israel's royal story

# Matthew 1:12-16
# 🔑 From Exile To Joseph
---
## 🌱 After They Were Brought To Babylon, Jechonias Begat Salathiel

Exile could have ended this royal family line completely.

Instead, the family line continues right in the middle of captivity.

Salathiel is also known elsewhere as Shealtiel.

God's promise to David kept moving forward even in exile.

🌱 The royal line survives captivity

📛 Salathiel is also called Shealtiel

⏳ This happens in the middle of exile

📖 God's promise kept moving in exile

## 🏛️ Zorobabel

Zorobabel is better known as Zerubbabel in the Old Testament.

He led the first group of exiles back to Jerusalem.

Ezra, Haggai, and Zechariah all describe him rebuilding the temple.

The promised line did not just survive exile.

It came home.

🏛️ Zorobabel is also called Zerubbabel

🚶 He led exiles back to Jerusalem

🧱 He helped rebuild the temple

📖 The promised line came home

## ✝️ Jacob Begat Joseph The Husband Of Mary, Of Whom Was Born Jesus

Every name before this one follows the same pattern, "X begat Y."

This verse suddenly breaks that pattern.

It does not say Joseph begat Jesus.

It says Jesus was born "of" Mary instead.

That small change points directly to the virgin birth explained later in this chapter.

✝️ Every other line says "begat"

🔀 This line breaks that pattern

🤍 Jesus is born "of" Mary, not Joseph

📖 This points ahead to the virgin birth

# Matthew 1:17
# 🔢 Three Sets Of Fourteen
---
## 🔢 Fourteen Generations

Fourteen is not a random number here.

In Hebrew, letters doubled as numbers.

The letters spelling "David" add up to fourteen.

Many scholars believe Matthew built this pattern on purpose to highlight David's name.

The whole genealogy becomes a coded reminder.

This is David's promised heir.

🔢 Fourteen is not random here

🔤 Hebrew letters doubled as numbers

👑 David's name adds up to fourteen

📖 The pattern points straight to David

## 📋 So All The Generations From Abraham To David Are Fourteen Generations

This list is not a complete family tree.

Matthew already skipped several kings earlier in the chapter.

Ancient writers regularly shaped genealogies around patterns instead of every single name.

The real point is not a perfect count.

The real point is that Jesus is David's rightful heir.

📋 This list skips some names

🏛️ Ancient genealogies often followed patterns

🎯 The point was never an exact count

📖 Jesus stands as David's rightful heir

# Matthew 1:18-21
# 👼 The Angel's Message To Joseph
---
## 💍 Espoused To Joseph

"Espoused" means legally engaged, not just dating or planning a wedding.

In this culture, betrothal was a binding legal agreement.

The couple did not yet live together or have a physical relationship.

Ending it required a formal divorce, just like ending an actual marriage.

💍 Espoused means legally engaged

📜 Betrothal was a binding agreement

🚫 The couple did not yet live together

📖 Ending it needed a formal divorce

## 👼 Found With Child Of The Holy Ghost

This phrase states plainly that Mary was already pregnant.

It also states just as plainly how, through the Holy Ghost.

No human father was involved in this pregnancy at all.

Matthew wants no confusion about what kind of birth this is.

👼 Mary was pregnant by the Holy Ghost

🚫 No human father was involved

✨ This conception was entirely supernatural

📖 Matthew states this plainly, with no confusion

## ⚖️ Being A Just Man, And Not Willing To Make Her A Publick Example

"Just" here means righteous, someone who followed God's law carefully.

A "publick example" meant exposing her shame openly in front of everyone.

The law gave Joseph the right to do exactly that.

Instead, his righteousness led him toward mercy, not public shame.

⚖️ Just means righteous under the law

😳 Publick example meant public shaming

📜 The law allowed Joseph to expose her

📖 His righteousness chose mercy instead

## 🤫 Minded To Put Her Away Privily

"Privily" is an old word meaning quietly or secretly.

Joseph planned to end the engagement without a public scene.

A quiet legal divorce still ended the betrothal properly.

It just spared Mary the public shame the law allowed.

🤫 Privily means quietly or secretly

📝 Joseph planned a quiet legal divorce

🛡️ This still ended the betrothal properly

📖 It spared Mary from public shame

## 😇 Fear Not To Take Unto Thee Mary Thy Wife

Angels often open their message with the same two words, fear not.

Joseph was almost certainly afraid of the scandal this marriage would bring.

The angel tells him plainly to go ahead and marry her.

God settles Joseph's fear before Joseph has to settle it himself.

😇 Fear not is a common angel greeting

😟 Joseph feared the coming scandal

💍 The angel tells him to marry her

📖 God settles Joseph's fear directly

## ✨ Thou Shalt Call His Name JESUS

"Jesus" comes from the Hebrew name Yeshua, the same name as Joshua.

The name itself means "The LORD saves."

Giving Joseph the right to name the child was a legal act.

In this culture, naming a child confirmed legal fatherhood, even without a blood tie.

Joseph becomes Jesus's legal father through this one command.

✨ Jesus comes from the Hebrew Yeshua

💬 The name means "The LORD saves"

📝 Naming the child was a legal act

📖 Joseph becomes Jesus's legal father

# Matthew 1:22-25
# 📖 Fulfilled As The Prophet Said
---
## 📜 That It Might Be Fulfilled Which Was Spoken Of The Lord By The Prophet

Matthew uses this exact phrase again and again throughout his Gospel.

Each time, he points to an Old Testament prophecy being fulfilled.

Here, he points specifically to the prophet Isaiah.

Matthew wrote mainly for a Jewish audience who already knew these prophecies.

📜 Matthew repeats this phrase often

🔗 It always points to a fulfilled prophecy

📖 Isaiah is the prophet named here

➡️ Matthew writes for a Jewish audience

## 🌟 A Virgin Shall Be With Child

This line comes from the prophet Isaiah, written centuries earlier.

The original Hebrew word can mean either virgin or young woman.

Matthew applies it directly to Mary's virgin pregnancy by the Holy Ghost.

Isaiah spoke of this centuries before it happened.

Matthew says it is happening right now, in Jesus.

🌟 Isaiah wrote this prophecy centuries earlier

🔤 The Hebrew word can mean young woman

✨ Matthew applies it to Mary directly

📖 An old prophecy is happening in Jesus

## 🤍 Emmanuel, Which Being Interpreted Is, God With Us

"Emmanuel" is a Hebrew name built from two words.

It literally means "God with us."

Jesus is never actually called Emmanuel again anywhere else in the Gospel.

The name describes who He is, not a title people used daily.

God stepping personally into human history is the whole point of this chapter.

🤍 Emmanuel means "God with us"

📛 It describes who Jesus is

🚫 This title is never repeated later

📖 God enters human history personally

## 🛡️ Knew Her Not Till She Had Brought Forth Her Firstborn Son

"Knew her not" is the Bible's common way of describing physical intimacy.

Joseph and Mary had no physical relationship before Jesus was born.

This confirms the virgin birth all the way up to the delivery itself.

"Firstborn" suggests Mary had other children with Joseph after this.

Matthew closes the chapter with simple obedience.

Joseph did exactly what the angel told him to do.

🛡️ Knew her not means no physical intimacy

👶 This confirms the virgin birth fully

👨‍👩‍👧 Firstborn hints at future children later

📖 Joseph obeys exactly what God commanded
`.trim();

export const MATTHEW_ONE_PERSONAL_SECTIONS = parseMatthewOneRawNotes(MATTHEW_ONE_RAW_NOTES);
