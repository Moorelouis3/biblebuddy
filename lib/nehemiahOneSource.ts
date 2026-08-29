export type NehemiahOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNehemiahOneRawNotes(rawText: string): NehemiahOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NehemiahOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nehemiah\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nehemiah 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nehemiah\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Nehemiah\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nehemiah 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nehemiah 1:${startVerse}` : `Nehemiah 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Nehemiah 1 sections, received " + sections.length);
  }

  return sections;
}

const NEHEMIAH_ONE_RAW_NOTES = `# Nehemiah 1:1-3
# 😢 Bad News From Jerusalem
---
## 📝 The Words Of Nehemiah The Son Of Hachaliah

This opening line works like a diary or memoir beginning.

Nehemiah is naming himself as the author of what follows.

His father was a man named Hachaliah, otherwise unknown in the Bible.

The book is written in first person, as a personal record.

📝 This reads like a personal memoir

👤 Nehemiah names himself as the writer

❓ His father Hachaliah is otherwise unknown

📖 The whole book is told in first person

## 🗓️ In The Month Chisleu, In The Twentieth Year

Chisleu is a Hebrew month that falls in our November and December.

The twentieth year refers to King Artaxerxes of Persia.

Ezra had already traveled to Jerusalem in this same king's seventh year.

About thirteen years now separate that earlier journey from this moment.

🗓️ Chisleu falls in November and December

👑 Artaxerxes was king of Persia then

📜 Ezra had gone in year seven

📖 Thirteen years separate the two events

## 🏰 As I Was In Shushan The Palace

Shushan was the winter capital of the Persian empire.

Today the site is called Susa, in modern Iran.

The palace was actually a walled fortress complex, not one building.

This is the very same setting later used in the book of Esther.

🏰 Shushan was the Persian winter capital

🗺️ Today the site is called Susa

🏯 The palace was a whole fortress complex

📖 Esther is set in this same place

## 👤 Hanani, One Of My Brethren

Hanani was one of Nehemiah's own blood relatives.

He had traveled all the way from Judah to Persia.

This same Hanani is later put in charge of Jerusalem itself.

Family loyalty is part of what starts this whole story moving.

👤 Hanani was Nehemiah's own relative

🚶 He traveled from Judah to Persia

🏙️ He later helps govern Jerusalem

📖 Family loyalty starts this whole story

## 🏘️ The Jews That Had Escaped, Which Were Left Of The Captivity

This phrase does not mean people who ran away from guards.

It describes the Jewish community still living in and around Jerusalem.

Decades earlier, King Cyrus had allowed captives in Babylon to return home.

These are the descendants of that return, still struggling in the land.

❗ Escaped does not mean fleeing guards

🏘️ It means the Jews still in Judah

🔙 Cyrus had let captives return earlier

📖 These are their struggling descendants

## 😔 In Great Affliction And Reproach

Affliction means real, ongoing suffering.

Reproach means public shame that everyone around you can see.

Jerusalem was not just physically weak.

It was also a source of disgrace.

Israel's God had his own reputation tied to this city.

😔 Affliction means real ongoing suffering

😳 Reproach means public shame

🏙️ Jerusalem's weakness brought public disgrace

📖 God's reputation was tied to the city

## 🧱 The Wall Of Jerusalem Also Is Broken Down, And The Gates Thereof Are Burned With Fire

A city without walls in this world had no real protection.

Babylon had destroyed these very walls many years before.

A later attempt to rebuild the wall had already been stopped by force.

That opposition is recorded earlier, in the book of Ezra.

This report meant Jerusalem was still sitting completely exposed.

🧱 No wall meant no protection

🔥 Babylon destroyed these walls earlier

🛑 A rebuilding attempt was stopped by force

📖 Jerusalem sat completely exposed

# Nehemiah 1:4-7
# 🙏 Nehemiah's Grief And Confession
---
## 😢 I Sat Down And Wept, And Mourned Certain Days, And Fasted, And Prayed

Nehemiah's grief was not a quick, private moment.

He wept immediately when he heard the news.

Then he kept mourning and fasting for several days after that.

His sorrow led him straight into prayer, not despair.

😢 Nehemiah wept the moment he heard

📆 The mourning lasted several days

🍽️ He fasted during that whole time

📖 His grief led him into prayer

## 🌌 The God Of Heaven

This title for God appears often in Ezra and Nehemiah.

Persian officials used similar language for whichever god they honored.

Nehemiah is not shrinking God down to fit that custom.

He is using a title anyone in the empire would recognize as pointing to the one true God.

🌌 This title appears often in this era

👑 Persian officials used similar language

✝️ Nehemiah is not shrinking God down

📖 He points to the one true God

## 🙏 I Beseech Thee, O LORD God Of Heaven, The Great And Terrible God

Beseech means to beg earnestly, with real desperation.

Terrible does not mean bad in this verse.

Here it means awe inspiring, the kind of great that makes a person tremble.

Nehemiah opens his prayer by naming exactly who he is speaking to.

🙏 Beseech means to beg earnestly

😮 Terrible here does not mean bad

⚡ It means awe inspiring and great

📖 He names exactly who he prays to

## 🤝 That Keepeth Covenant And Mercy For Them That Love Him

Covenant means a formal, binding promise made between two parties.

Mercy here carries the old idea of loyal, faithful love.

God is described as the one who keeps His side of that promise.

Nehemiah is reminding God, and himself, of a relationship that already exists.

🤝 Covenant means a binding promise

💗 Mercy means loyal faithful love

✅ God keeps His side of it

📖 Nehemiah recalls an existing relationship

## 🙋 Both I And My Father's House Have Sinned

Nehemiah was not personally alive during Jerusalem's fall to Babylon.

He still includes himself fully in this confession of sin.

Father's house means his whole family line, past and present.

Owning a sin you did not personally commit is called identifying with your people.

🙋 Nehemiah was not alive then

👪 Father's house means his whole family

🤲 He owns sin he did not commit

📖 He confesses together with his people

## 💔 We Have Dealt Very Corruptly Against Thee

Corruptly means deeply and repeatedly wrong, not just a small mistake.

This is a strong word, used elsewhere for outright rebellion.

Nehemiah does not soften the confession to make it easier to say.

Honest prayer starts with calling sin exactly what it is.

💔 Corruptly means deeply and repeatedly wrong

⚠️ It is a strong word for rebellion

🗣️ Nehemiah does not soften his words

📖 Honest prayer names sin plainly

## 📜 The Commandments, Nor The Statutes, Nor The Judgments

These are three separate categories inside the Law of Moses.

Commandments are the direct moral instructions, like do not steal.

Statutes are the fixed rules for worship and daily practice.

Judgments are the case by case rulings for specific situations.

📜 Three categories make up the Law

✋ Commandments are direct moral instructions

🕯️ Statutes govern worship and practice

📖 Judgments are rulings for specific cases

# Nehemiah 1:8-9
# 🔄 Remembering The Promise
---
## 🗣️ If Ye Transgress, I Will Scatter You Abroad Among The Nations

Nehemiah is quoting God's own warning back to Him in prayer.

This warning was first given through Moses, long before Jerusalem even had a king.

Transgress means to cross a line that was clearly marked.

Scattering among the nations is exactly what later happened in the exile.

🗣️ Nehemiah quotes God's own words back

📜 Moses first gave this warning

🚫 Transgress means crossing a marked line

➡️ Scattering is exactly what happened later

## ⚖️ But If Ye Turn Unto Me, And Keep My Commandments, And Do Them

This is the second half of the same promise Nehemiah quotes.

Judgment was never God's final word to His people.

Turning back and obeying again was always the way home.

Nehemiah is holding on to a promise, not just confessing failure.

⚖️ This is the promise half of the warning

🚪 Judgment was never God's final word

🔄 Turning back was always the way home

📖 Nehemiah holds a promise, not just failure

## 🌐 Cast Out Unto The Uttermost Part Of The Heaven

This is a figure of speech for the farthest possible place on earth.

It does not describe a location somewhere in outer space.

The point is that no distance is too far for God to reach.

Even total exile could not put someone beyond His care.

🌐 This means the farthest place on earth

🚀 It is not a location in space

📏 No distance is too far for God

📖 Exile could not escape His care

## 🏙️ The Place That I Have Chosen To Set My Name There

This place is Jerusalem, and specifically its temple.

God had chosen this one city out of every possible location.

Setting His name there meant His presence was tied to that place.

The promise of return always leads back to this same city.

🏙️ This place is Jerusalem and its temple

✋ God chose one city out of all

🕊️ His presence was tied to that place

📖 Every promise of return points here

# Nehemiah 1:10-11
# 🍷 The King's Cupbearer
---
## 💰 These Are Thy Servants And Thy People, Whom Thou Hast Redeemed

Redeemed means bought back or set free at a cost.

Nehemiah is pointing back to the exodus out of Egypt.

God had already invested Himself deeply in this people.

Nehemiah leans on what God has already done.

💰 Redeemed means bought back at a cost

🐑 This points back to the exodus

❤️ God already invested in this people

📖 The prayer leans on what God has done

## ✋ By Thy Great Power, And By Thy Strong Hand

This exact phrase is used elsewhere for the exodus from Egypt.

Nehemiah is connecting this moment to that same rescue.

The same God who freed slaves centuries earlier is still active now.

Nehemiah is not asking a distant God for a new kind of help.

✋ This phrase describes the exodus rescue

🔗 Nehemiah connects this moment to that one

💪 The same God is still active now

📖 He is not asking a distant God

## 😨 Who Desire To Fear Thy Name

Fear here does not mean being afraid of a threat.

It means taking God seriously enough to obey Him.

This is the same kind of fear mentioned back in the report from Judah.

Nehemiah counts himself among the people who take God seriously.

😨 Fear does not mean being afraid

🙇 It means taking God seriously

🔁 This fear was mentioned earlier too

📖 Nehemiah counts himself among them

## 👑 Grant Him Mercy In The Sight Of This Man

This man refers to the king of Persia, not yet named.

Nehemiah has not spoken to the king about any of this yet.

He is praying for favor before he even opens his mouth.

The next chapter reveals what actually happens in that meeting.

👑 This man is the unnamed king

🤐 Nehemiah has not spoken to him yet

🙏 He prays for favor beforehand

📖 Chapter two reveals what happens next

## 🍷 For I Was The King's Cupbearer

A cupbearer tasted the king's wine before the king drank it.

This guarded against poison and made the role deeply trusted.

Cupbearers often had close daily access and real personal influence.

This single detail explains how Nehemiah could possibly help Jerusalem at all.

🍷 A cupbearer tasted the king's wine

🛡️ The job guarded against poison

🤝 Cupbearers had real personal influence

📖 This explains how Nehemiah could help
`.trim();

export const NEHEMIAH_ONE_PERSONAL_SECTIONS = parseNehemiahOneRawNotes(NEHEMIAH_ONE_RAW_NOTES);
