export type NehemiahSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNehemiahSevenRawNotes(rawText: string): NehemiahSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NehemiahSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nehemiah\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nehemiah 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nehemiah\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Nehemiah\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nehemiah 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nehemiah 7:${startVerse}` : `Nehemiah 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Nehemiah 7 sections, received " + sections.length);
  }

  return sections;
}

const NEHEMIAH_SEVEN_RAW_NOTES = `# Nehemiah 7:1-3
# 🚪 Guards Before The Gates
---
## 🎶 The Porters And The Singers And The Levites Were Appointed

Appointed means these workers received official duty, not a casual invitation.

Porters guarded the gates, singers led worship, and Levites served daily temple needs.

Until the wall stood finished, none of them had a secure place to serve.

A finished wall gave normal temple life room to start again.

Worship could now return to a steady rhythm instead of constant emergency.

🎶 Singers led temple worship again

🚪 Porters guarded the finished gates

🧹 Levites served daily temple needs

📖 A finished wall restored steady worship

## 😇 A Faithful Man, And Feared God Above Many

Hanani was Nehemiah's own brother, first named back in chapter one.

A blood tie alone was never the reason he received this charge.

Feared God above many means his reverence stood out even among devoted men.

Nehemiah trusted him with the whole city because of that reverence.

Family loyalty and personal faithfulness happened to line up in the same man.

👨‍👩‍👦 Hanani was Nehemiah's own brother

⚖️ Character earned the charge, not family

🙏 He feared God above many others

📖 Faithfulness and loyalty met in one man

## ☀️ Until The Sun Be Hot

Ancient cities usually opened their gates right at the first light of dawn.

Nehemiah delayed that moment until the sun stood fully in the sky.

Early dawn light still hides shapes moving near a wall in shadow.

Waiting for full daylight let guards see every approach clearly.

A small delay bought real safety for the whole city.

🌅 Most cities opened gates at dawn

☀️ Nehemiah waited for full daylight

👀 Guards could see danger clearly

📖 A short delay bought real safety

## 🏠 Every One To Be Over Against His House

Over against his house means each guard stood watch near his own home.

A hired soldier might grow careless after a long, uneventful shift.

A man guarding his own family had no room for that carelessness.

Personal stake turned ordinary citizens into the city's most reliable watchmen.

🏠 Each guard watched near his own home

😴 Hired guards can grow careless

❤️ Personal stakes sharpen real attention

📖 Ordinary citizens became reliable watchmen

# Nehemiah 7:4
# 🏚️ A City Too Big For Its People
---
## 🏙️ The City Was Large And Great, But The People Were Few Therein

Jerusalem's ancient walls could hold far more people than currently lived inside them.

Decades of exile had emptied the city long before Nehemiah ever arrived.

A finished wall could not fill empty streets by itself.

That gap becomes Nehemiah's next problem once this list is recorded.

Chapter eleven later describes families being chosen by lot to move in.

🏙️ Jerusalem could hold far more people

👥 Exile had emptied the city for decades

🧱 A wall could not fill empty streets

📖 Chapter eleven solves this same gap

## 🏚️ The Houses Were Not Builded

Not builded means many houses still sat in ruins from the earlier destruction.

The wall protected the city before every home inside it was repaired.

Security came first, and ordinary rebuilding still waited its turn.

A finished wall did not mean a finished city.

🏚️ Not builded means still in ruins

🧱 The wall was finished first

🏗️ Ordinary rebuilding still waited its turn

📖 A finished wall was not a finished city

# Nehemiah 7:5-7
# 📜 Finding The Family Register
---
## 🙏 My God Put Into Mine Heart

Nehemiah credits God directly for the idea to organize this count.

He does not claim the plan came from his own administrative skill.

Scripture often describes guidance like this as God's own prompting.

Even a practical census gets described here as something God started.

🙏 Nehemiah credits God for the idea

🚫 He does not claim personal credit

📜 Scripture often describes guidance this way

📖 Even practical plans can be God's prompting

## 📜 A Register Of The Genealogy Of Them Which Came Up At The First

This register was an old family record kept from the very first return.

Zerubbabel led that first return nearly ninety years before Nehemiah's own arrival.

Ezra chapter two already recorded this exact same family list once before.

Nehemiah copies it here for an entirely different purpose, filling an empty city.

One record served two different generations and two different needs.

📜 This register recorded the first return

⏳ That return happened nearly ninety years earlier

🔁 Ezra two recorded this same list

📖 One record served two different needs

## 🕎 Nehemiah, Azariah, Raamiah, Nahamani

This leader list matches Ezra chapter two with a few small differences.

Azariah appears here where Ezra's version instead names a man called Seraiah.

Nahamani appears as an extra name not found in Ezra's shorter list.

That addition brings this list to twelve leaders, matching Israel's twelve tribes.

Small spelling and naming differences do not make either record false.

Decades of careful copying by hand can shift small details like this.

🔁 This list nearly matches Ezra two

🆕 Nahamani is an added twelfth name

🕎 Twelve leaders echo Israel's twelve tribes

📖 Small copying differences are not contradictions

# Nehemiah 7:8-25
# 🔢 A Number That Changed
---
## 🔢 The Children Of Azgad, Two Thousand Three Hundred Twenty And Two

Ezra chapter two recorded Azgad's family at one thousand two hundred twenty two.

This later list records the very same family at two thousand three hundred twenty two.

Some copies may have preserved a later, updated count for this one family.

Others believe a number simply shifted somewhere across repeated copying.

Either way, the difference sits openly in scripture rather than being hidden.

God's word records real history honestly instead of a smoothed over story.

🔢 Ezra counted Azgad much lower

📈 This list nearly doubles that count

✍️ Copying by hand allowed real drift

📖 Scripture records real history honestly

# Nehemiah 7:26-38
# 🏘️ Old Battles, New Names
---
## ⚔️ The Men Of Michmas, An Hundred And Twenty And Two

Michmas was the site of one of Israel's most famous ancient battles.

First Samuel describes Jonathan and his armor bearer attacking a whole Philistine garrison there.

That daring stand once turned an entire war in Israel's favor.

Centuries later, Michmas appears here as a small, ordinary hometown count.

A place once famous for courage now just sends families back to Judah.

⚔️ Michmas hosted Jonathan's famous stand

🛡️ First Samuel tells that whole story

🏘️ It became an ordinary hometown here

📖 Old courage faded into a quiet count

# Nehemiah 7:39-42
# 🕊️ The Priests Return, Unchanged
---
## 🕊️ The Priests: The Children Of Jedaiah, Of The House Of Jeshua

These four priestly families total exactly the same number Ezra recorded decades earlier.

Many family counts through this chapter drift a little from Ezra's version.

The priestly count here matches that older record exactly, without any drift.

A steady priesthood mattered enough that this number stayed precisely fixed.

Not every part of the record changed with time.

🕊️ Priests total matches Ezra exactly

🔢 Other family counts drift some

⚖️ This number stayed precisely fixed

📖 Not every detail changed with time

# Nehemiah 7:43-45
# 🎶 A Growing Choir
---
## 🎶 The Singers: The Children Of Asaph, An Hundred Forty And Eight

Ezra's earlier list counted Asaph's singers at only one hundred twenty and eight.

This later count records twenty more singers serving in the same family line.

Verse four already said the wider population of Jerusalem had stayed small.

Even so, the temple's music ministry had grown across those same decades.

Worship can grow even while a city struggles to recover.

🎶 Ezra counted fewer singers here

📈 This list counts twenty more voices

🏙️ Jerusalem's population had stayed small

📖 Worship grew where the city had not

# Nehemiah 7:46-56
# 🎁 Names Once Belonging To Enemies
---
## 🎁 The Children Of Besai, The Children Of Meunim, The Children Of Nephishesim

Meunim were an Arabian people group that once fought against Judah as enemies.

Second Chronicles describes King Uzziah battling this same people generations earlier.

Here their descendants serve inside the temple as dedicated Nethinim workers.

A family once counted among Judah's enemies now helps run God's worship.

Old hostility did not permanently bar a family from serving God's house.

⚔️ Meunim once fought against Judah

📜 Second Chronicles records that old conflict

🛐 Their descendants now serve the temple

📖 Old enemies found a new place

# Nehemiah 7:57-60
# 🛠️ Servants Named One By One
---
## 🛠️ The Children Of Sotai, The Children Of Sophereth, The Children Of Perida

Solomon once put conquered peoples to forced labor for his building projects.

These families likely descended from that same forced labor generations later.

Instead of one anonymous group, each family here gets its own name.

A record like this refused to erase people history might have forgotten.

Being named still mattered, even at the very bottom of the social order.

🛠️ Solomon once forced peoples to labor

👪 These families likely descended from them

📝 Each family is named, not lumped together

📖 Naming refused to let them be forgotten

# Nehemiah 7:61-65
# 🔍 One Question, Two Generations
---
## 🏛️ The Tirshatha Said Unto Them

Tirshatha was the Persian title for the appointed governor of the province.

Zerubbabel likely held this same title when Ezra recorded this ruling long ago.

By Nehemiah's own time, he himself carried the title of governor.

The unresolved priesthood question had now waited across two separate governors.

Nearly a century had passed and no priest with Urim and Thummim had appeared.

Some questions in scripture stay open far longer than a single lifetime.

🏛️ Tirshatha named the province's governor

👑 Zerubbabel likely held it first

📜 Nehemiah later held that same title

📖 One question outlasted two governors

# Nehemiah 7:66-69
# 🐫 One Number That Never Moved
---
## 🎯 The Whole Congregation Together Was Forty And Two Thousand Three Hundred And Threescore

Many smaller family counts through this chapter drift from Ezra's earlier version.

This one final total matches Ezra's record exactly, down to the last number.

Scribes across decades of copying still guarded this headline number carefully.

The animal counts that follow also match Ezra's list exactly.

Small details drifted while the numbers that mattered most stayed fixed.

🔢 Small family counts drifted over time

🎯 This total matches Ezra exactly

🐫 The animal counts match too

📖 The most important numbers stayed fixed

# Nehemiah 7:70-72
# 🪙 The Governor Gave First
---
## 🪙 The Tirshatha Gave To The Treasure A Thousand Drams Of Gold

This verse lists Nehemiah's own personal gift before naming anyone else's.

Ezra's earlier version lumped every leader's gift into one combined total.

Here the governor's own contribution stands recorded on its own line.

Nehemiah refused special privileges from the people back in chapter five.

Giving first, rather than only asking others to give, matched that same pattern.

🪙 Nehemiah's gift is listed first

📜 Ezra combined every leader's gift together

👑 The governor's gift stands on its own

📖 Leading by example matched his pattern

# Nehemiah 7:73
# 🕎 Waiting For The Seventh Month
---
## 🕎 When The Seventh Month Came

The seventh month on the Hebrew calendar held some of Israel's most important feasts.

It included the Feast of Trumpets and the solemn Day of Atonement.

This whole long list ends by pointing toward that specific month.

Chapter eight opens with the people gathering to hear the Law read aloud.

A census of names quietly sets up one of the book's greatest moments.

🕎 The seventh month held major feasts

📯 It included the Feast of Trumpets

📜 Chapter eight opens right after this

➡️ A list of names leads to revival
`.trim();

export const NEHEMIAH_SEVEN_PERSONAL_SECTIONS = parseNehemiahSevenRawNotes(NEHEMIAH_SEVEN_RAW_NOTES);
