export type DanielOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDanielOneRawNotes(rawText: string): DanielOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DanielOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Daniel\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Daniel 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Daniel\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Daniel\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Daniel 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Daniel 1:${startVerse}` : `Daniel 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Daniel 1 sections, received " + sections.length);
  }

  return sections;
}

const DANIEL_ONE_RAW_NOTES = `# Daniel 1:1-2
# 👑 Nebuchadnezzar Comes Against Jerusalem
---
## 📅 In The Third Year Of The Reign Of Jehoiakim

Jehoiakim was king of Judah when Babylon's armies first arrived at Jerusalem.

Jeremiah dates this same event to Jehoiakim's fourth year, not his third.

Babylon and Judah counted the start of a king's reign differently on their calendars.

Daniel is simply using the Babylonian method, not making an error.

📅 Jehoiakim ruled Judah at this time

🔄 Babylon counted a king's years differently

📜 Jeremiah uses Judah's own calendar

📖 Two true dates, two counting systems

## ⚔️ Nebuchadnezzar King Of Babylon Besieged It

To besiege a city means surrounding it and cutting off its food and supplies until it surrenders.

Nebuchadnezzar was not yet officially king when this campaign began.

He led the siege as crown prince while his father Nabopolassar still held the throne.

He became king himself within that same year.

⚔️ Besieged means surrounded and cut off

👑 Nebuchadnezzar was still a crown prince

🏛️ His father Nabopolassar still reigned

📖 He took the throne within the year

## 🙌 The Lord Gave Jehoiakim Into His Hand

Babylon did not win this war through strength alone.

The text says plainly that the Lord gave Jehoiakim into Nebuchadnezzar's hand.

Judah's defeat was God's judgment, not just a military outcome.

This truth frames the entire book of Daniel from its very first verse.

🙌 God gave Jehoiakim into Babylon's hand

⚖️ Defeat came as judgment, not accident

📖 God controls nations, not just armies

➡️ This truth frames the whole book

## 🗺️ Carried Into The Land Of Shinar

Shinar is an old name for the region of Babylon.

It is the same region named back in Genesis eleven, where the tower of Babel was built.

Nebuchadnezzar placed the temple's sacred vessels inside the temple of his own god.

In his mind, this proved his god had defeated Israel's God.

🗺️ Shinar is the region of Babylon

🏗️ The same region from the tower of Babel

🏛️ The vessels went into a pagan temple

📖 Nebuchadnezzar saw it as his god's victory

# Daniel 1:3-5
# 🎓 Chosen For The King's Court
---
## 👔 Ashpenaz The Master Of His Eunuchs

A eunuch in this royal setting was a court official.

Many had been castrated so they could serve safely inside a king's household.

Ashpenaz held authority over the king's whole staff of these officials.

He is the man Daniel and his friends would answer to for years.

🏛️ Eunuchs served inside the royal household

👔 Ashpenaz led the king's whole staff

📋 Daniel would answer to him for years

📖 A single official shaped Daniel's early life

## 🏅 Children Of Israel, And Of The King's Seed, And Of The Princes

Nebuchadnezzar wanted the best of Judah's next generation, not random captives.

The king's seed means royal family members, and the princes means Judah's noble class.

Taking its brightest young nobles was a deliberate way to weaken a conquered nation's future leadership.

👑 King's seed means royal family members

🏅 Princes means Judah's noble class

🎯 Babylon targeted Judah's future leaders

➡️ Weakening tomorrow's leaders secured today's peace

## 💪 No Blemish, But Well Favoured

No blemish meant physically flawless by the standards of the day.

Well favoured meant good looking and strong in appearance.

The king wanted young men who could represent Babylon well in his own court.

💪 No blemish means physically flawless

🙂 Well favoured means good looking

🏛️ They would represent Babylon publicly

📖 Appearance served the king's image

## 🧠 Skilful In All Wisdom, And Cunning In Knowledge

Cunning here does not mean sneaky or deceptive.

It is an old word for highly skilled or sharp minded.

Science meant learning and knowledge in general, not laboratory experiments.

The king wanted the smartest young men available, not just the strongest.

🧠 Cunning meant skilled, not deceptive

📚 Science meant learning in general

🎓 The king wanted the smartest youths

➡️ Mind mattered as much as body

## 🏛️ Teach Them The Learning And The Tongue Of The Chaldeans

The Chaldeans were the ruling scholar class of Babylon, known for astrology, omens, and ancient literature.

Learning their language and scholarship meant years of training inside a pagan worldview.

Daniel would need to master this education without losing his own faith inside it.

🏛️ Chaldeans were Babylon's scholar class

🔮 Their learning included astrology and omens

🛡️ Faith had to survive that training

📖 Daniel trained inside a pagan system

## 🍽️ A Daily Provision Of The King's Meat, And Of The Wine

Meat here is an old word for food in general, not just animal flesh.

Eating from the king's own table was meant as a reward, not a burden.

The training lasted three full years before any of them stood before the king.

🍽️ Meat meant food in general here

🎁 The king's table was meant as an honor

📆 Training lasted three full years

➡️ A reward can still carry a hidden cost

# Daniel 1:6-7
# 📛 New Names For Four Young Men
---
## ⚖️ Daniel, Hananiah, Mishael, And Azariah

Each of these four Hebrew names points straight back to God.

Daniel means God is my judge.

Hananiah means the Lord is gracious.

Mishael means who is what God is, and Azariah means the Lord has helped.

⚖️ Daniel means God is my judge

🙏 Hananiah means the Lord is gracious

❓ Mishael means who is what God is

📖 Azariah means the Lord has helped

## 🏛️ Gave Unto Daniel The Name Of Belteshazzar

Belteshazzar likely means Bel protect his life, naming a Babylonian god instead of the Lord.

Renaming captives was a common way for a conqueror to claim ownership over them.

Replacing a God centered name with a pagan one was meant to erase Daniel's old identity.

🏛️ Belteshazzar names a Babylonian god

👑 Renaming showed the conqueror's ownership

🗑️ The change aimed to erase his identity

➡️ A name was changed, not his heart

## 🔥 Shadrach, Of Meshach, And Of Abednego

These three new names likely honored Babylonian gods as well, including Nebo.

Abednego probably means servant of Nebo, a Babylonian god of wisdom.

These same three names appear again later in the story of the fiery furnace.

🏛️ These names likely honored pagan gods

📛 Abednego probably means servant of Nebo

🔥 Readers meet these names again later

📖 Pagan names could not erase their faith

# Daniel 1:8-10
# 🚫 Daniel Purposed Not To Defile Himself
---
## 💭 Daniel Purposed In His Heart

Purposed means Daniel made a firm, settled decision, not a passing wish.

This decision came before any pressure or consequence actually appeared.

Daniel decided who he would be before the test ever started.

💭 Purposed means a firm decision

⏳ The choice came before any pressure

🛡️ Daniel decided who he would be

➡️ Convictions work best when set early

## 🍽️ That He Would Not Defile Himself With The Portion Of The King's Meat

The king's food likely broke Jewish dietary law, or had first been offered to Babylonian gods.

Either reason would make it unclean under the law Daniel grew up keeping.

Eating it was not a small matter of taste, it was a matter of loyalty to God.

🍽️ The king's food likely broke Jewish law

🙏 Some of it may have honored idols

⚖️ This was about loyalty, not taste

📖 Small choices can carry real weight

## 🙌 Now God Had Brought Daniel Into Favour And Tender Love

Daniel was a captive with no real power of his own.

God worked quietly behind the scenes to soften his guard's heart toward him.

This favor made Daniel's bold request even possible to ask.

🙌 God worked where Daniel had no power

❤️ The guard's heart was softened toward him

🗣️ Favor made the request possible

📖 God opens doors before we ask

## 😨 I Fear My Lord The King

Worse liking meant looking thinner or less healthy than the other young men.

If Daniel's group looked weaker, the official in charge could be blamed and even executed.

This official was not being cruel, he was genuinely afraid for his own life.

🙂 Worse liking meant looking less healthy

⚠️ A poor appearance could cost him his life

😨 His fear for himself was real

➡️ Daniel's request put another man at risk

# Daniel 1:11-14
# 🥗 The Ten Day Test
---
## 👔 Daniel Said To Melzar

Melzar was likely a title for a steward, not a personal name.

This steward served directly under Ashpenaz, the chief official already introduced.

Daniel brought his request to the man who actually controlled his daily food.

👔 Melzar was likely a steward's title

📋 He served under the chief official

🗣️ Daniel asked the right man directly

➡️ Knowing who holds authority matters

## 🧪 Prove Thy Servants, I Beseech Thee, Ten Days

Prove means to test, and beseech means to ask earnestly or beg.

Daniel did not demand anything, he respectfully requested a short trial.

Ten days was a small enough risk for the steward to actually agree to it.

🧪 Prove means to test

🙏 Beseech means to ask earnestly

📆 Ten days was a small, safe risk

➡️ A humble request opened the door

## 🌱 Pulse To Eat, And Water To Drink

Pulse means simple foods like vegetables, grains, and legumes.

This plain diet avoided both forbidden meat and anything offered to idols.

Daniel was not asking for comfort, he was asking to stay faithful.

🌱 Pulse means simple plant based food

🚫 It avoided both unclean meat and idols

🙏 This was about faithfulness, not comfort

📖 Obedience can look very plain

## 🙂 Let Our Countenances Be Looked Upon Before Thee

Countenance means the appearance of someone's face and body.

Daniel proposed a fair, visible test instead of just an argument.

The result would be plain for anyone to see with their own eyes.

🙂 Countenance means facial appearance

👀 Daniel proposed a visible test

⚖️ Results would speak for themselves

➡️ Daniel let the evidence make his case

# Daniel 1:15-17
# 💪 Healthier On A Simple Diet
---
## 💪 Their Countenances Appeared Fairer And Fatter In Flesh

After only ten days, the four young men looked healthier than the others.

This happened on a simpler diet than the rich food from the king's own table.

Their health did not come from better food, it came from God's provision.

💪 They looked healthier after ten days

🍽️ Their diet was simpler, not richer

🙌 God provided the real result

📖 Faithfulness did not cost their health

## 📋 Melzar Took Away The Portion Of Their Meat

The short test became Daniel's new normal diet going forward.

The steward had clear proof and no longer needed convincing.

A small, faithful request turned into a lasting arrangement.

📋 The test became their new normal

👀 The steward saw clear proof

🔁 A small request became lasting practice

➡️ Faithfulness in small things can last

## 🙌 God Gave Them Knowledge And Skill In All Learning

This wisdom was a gift from God, not just years of hard study.

Daniel specifically received understanding in visions and dreams.

This exact gift becomes central to the rest of the book of Daniel.

🙌 Wisdom came as a gift from God

🎓 All four excelled in Babylon's learning

🌙 Daniel understood visions and dreams

📖 This gift shapes the whole book

# Daniel 1:18-21
# 👑 Found Best In All The Kingdom
---
## 🗣️ The King Communed With Them

Communed means Nebuchadnezzar personally spoke with and examined them.

This was not a simple formality, it was a direct royal interview.

Three years of training were about to be tested face to face.

🗣️ Communed means he personally spoke with them

👑 This was a direct royal interview

📆 Three years of training faced a real test

➡️ Preparation meets the moment it was for

## 🏆 None Like Daniel, Hananiah, Mishael, And Azariah

Out of every young man trained that year, these four stood out clearly.

Their faithfulness in small choices had led to real excellence.

God had kept His promise to give them favor and skill.

🏆 These four stood out clearly

🙏 Small faithfulness led to real excellence

🙌 God kept His earlier promise

📖 Integrity and excellence grew together

## 🔮 Ten Times Better Than All The Magicians And Astrologers

Magicians were sorcerers who practiced divination and spells.

Astrologers were scholars who read the stars and skies for omens.

God given wisdom outperformed Babylon's whole occult system.

This comparison was not close, the gap was obvious to everyone watching.

🔮 Magicians practiced sorcery and spells

⭐ Astrologers read the stars for omens

🙌 God's wisdom outperformed both systems

📖 The gap was obvious to everyone

## 📆 Daniel Continued Even Unto The First Year Of King Cyrus

This verse quietly spans around seventy years of Daniel's life.

Babylon's whole empire would rise and completely fall within that span.

Cyrus of Persia is the king who finally conquered Babylon.

Daniel's faithfulness outlasted the very empire that had captured him.

📆 This verse spans about seventy years

🏛️ Babylon's whole empire rose and fell

👑 Cyrus of Persia conquered Babylon

📖 Daniel's faithfulness outlasted his captors
`.trim();

export const DANIEL_ONE_PERSONAL_SECTIONS = parseDanielOneRawNotes(DANIEL_ONE_RAW_NOTES);
