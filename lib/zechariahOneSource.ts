export type ZechariahOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZechariahOneRawNotes(rawText: string): ZechariahOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZechariahOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zechariah\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zechariah 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zechariah\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Zechariah\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zechariah 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zechariah 1:${startVerse}` : `Zechariah 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Zechariah 1 sections, received " + sections.length);
  }

  return sections;
}

const ZECHARIAH_ONE_RAW_NOTES = `# Zechariah 1:1-6
# 🔄 Turn Back To Me
---
## 🏛️ In The Eighth Month, In The Second Year Of Darius

"Darius" was the Persian king ruling over the whole empire at this time.

This date lands about two years after the Jews were allowed to return from exile in Babylon.

Haggai had already delivered his own messages earlier in that same year.

Zechariah now joins that same prophetic push to finish the temple.

🏛️ Darius ruled the Persian empire
📅 This date falls after the return from exile
🗣️ Haggai had already been preaching that year
📖 Zechariah joins the same temple building push

## 👨‍👦 The Son Of Berechiah, The Son Of Iddo The Prophet

Zechariah names his father and his grandfather here.

Berechiah was his father, a name not mentioned anywhere else in the Old Testament.

Iddo was a priest who had returned from exile with the first wave of exiles.

Naming three generations roots Zechariah firmly inside a known priestly family.

👨‍👦 Berechiah was Zechariah's father
📜 Berechiah appears nowhere else in scripture
🙏 Iddo was a priest from the return
📖 This places Zechariah in a priestly family

## 😠 The LORD Hath Been Sore Displeased With Your Fathers

"Sore" here means severely, not painfully.

God is saying he was deeply and seriously angry with the generation before this one.

That generation lived through the final years leading up to the exile.

This opening line sets up the warning that follows.

😠 Sore means severely, not painfully
⚡ God was deeply angry with that generation
📜 That generation led up to the exile
📖 This sets up the warning ahead

## 🔄 Turn Ye Unto Me, Saith The LORD Of Hosts, And I Will Turn Unto You

God offers a straight trade here.

"Turn" means to repent, to change direction and go the other way.

If the people turn back toward God, he promises to turn back toward them.

The offer requires a response before anything else changes.

🔄 Turn means to repent and change direction
🤝 God offers an honest trade
👣 The people must move first
📖 Repentance opens the door to restoration

## ⚠️ Be Ye Not As Your Fathers

This is a direct warning, not a gentle suggestion.

The fathers mentioned are the earlier generation who ignored prophetic warnings before the exile.

Zechariah's audience is being told not to repeat that same mistake.

A history lesson is being turned into a present command.

⚠️ This is a direct warning
📜 The fathers ignored earlier warnings
🚫 The audience must not repeat that mistake
📖 History becomes a present command

## 📯 The Former Prophets Have Cried

"The former prophets" refers to earlier voices like Isaiah and Jeremiah.

They warned the nation for generations before Jerusalem finally fell.

"Cried" pictures prophets pleading loudly, not just speaking in passing.

Their warnings were not quiet or easy to miss.

📯 Former prophets means Isaiah and Jeremiah
📢 Cried means pleading loudly
⏳ They warned for generations
📖 Their message was impossible to miss

## 👂 They Did Not Hear, Nor Hearken Unto Me

"Hearken" means to listen and obey, not just to hear sound.

The fathers heard the words but refused to act on them.

Hearing without obeying is the real failure being named here.

That gap between hearing and obeying led straight to judgment.

👂 Hearken means to listen and obey
🙉 They heard but did not obey
⚖️ The failure was in the response
📖 Hearing without obeying brought judgment

## ⏳ Your Fathers, Where Are They

This question has an obvious answer.

The earlier generation God is describing has already died.

Even the prophets who warned them did not live forever either.

The point is that no generation escapes its own mortality.

⏳ The earlier generation has already died
📯 Even the prophets did not live forever
💀 No generation escapes mortality
📖 Time passes, but God's word remains

## 🗣️ Like As The LORD Of Hosts Thought To Do Unto Us

This records the fathers' own confession, spoken after judgment had already fallen.

They finally admitted that God did exactly what he said he would do.

The punishment matched their own ways and their own doings.

A confession that comes only after the damage is done still counts as truth spoken.

🗣️ This records the fathers' own confession
✅ God did exactly what he promised
⚖️ The punishment matched their own ways
📖 Truth admitted late is still truth

# Zechariah 1:7-11
# 🐎 Riders Among The Myrtles
---
## 📅 The Eleventh Month, Which Is The Month Sebat

"Sebat" is the eleventh month on the Hebrew calendar, falling in our January or February.

This vision comes about five months after the messages in verses one through six.

Dating the vision this precisely matches the same careful dating style used in Haggai.

A reader can track this whole book almost month by month.

📅 Sebat is the eleventh Hebrew month
❄️ It falls in winter
⏳ This comes five months after the first message
📖 The book can be tracked almost monthly

## 👤 A Man Riding Upon A Red Horse

This rider turns out to be the angel of the LORD, named later in verse eleven.

"Red" often pictures bloodshed or war, a color tied to conflict throughout scripture.

The vision opens with a single rider standing ready to report.

This figure leads the patrol that is about to speak.

👤 The rider is the angel of the LORD
🔴 Red often pictures bloodshed or war
🐎 He leads this whole patrol
📖 He is ready to report what he found

## 🏞️ Among The Myrtle Trees That Were In The Bottom

"The bottom" means a low valley or ravine, not the bottom of something else.

Myrtle trees were ordinary, small shrubs, nothing like a mighty cedar.

This humble setting matches Jerusalem's own humble condition at this time.

A small, overlooked plant hosts an enormous vision.

🏞️ Bottom means a low valley
🌿 Myrtle was a small, ordinary shrub
🏙️ It matches Jerusalem's humble state
📖 A small setting holds a huge vision

## 🐴 Red Horses, Speckled, And White

These horses belong to a group of riders sent out to patrol the earth.

The different colors mark separate patrol groups, not random decoration.

A similar image of colored horses later appears in the book of Revelation.

This patrol has already finished its assigned mission by the time the vision opens.

🐴 These horses belong to a patrol
🎨 Colors mark separate patrol groups
📜 Revelation later echoes this same image
➡️ Their mission is already complete

## 👼 I Will Shew Thee What These Be

A new figure appears here, called simply the angel that talked with me.

This interpreting angel will guide Zechariah through several more visions in this book.

Zechariah does not have to guess at the meaning on his own.

An explained vision is the pattern for nearly all of Zechariah's night visions.

👼 A new interpreting angel appears here
🗣️ He guides Zechariah through the visions
❓ Zechariah is never left guessing alone
📖 Explained visions become this book's pattern

## 🌍 Whom The LORD Hath Sent To Walk To And Fro Through The Earth

This patrol was not sent by chance.

God himself sent these riders out across the whole earth.

A similar phrase describes a very different kind of patrol in the book of Job.

Here, the walking to and fro belongs fully to God's own authority.

🌍 The riders patrol the whole earth
👑 God himself sent them out
📜 Job uses a similar phrase differently
📖 This patrol answers only to God

## 🌎 All The Earth Sitteth Still, And Is At Rest

This does not sound like bad news at first.

A calm, peaceful world should be good news for everyone, including Jerusalem.

The next verses reveal that calm elsewhere has not reached Jerusalem's own ruins yet.

The patrol's report becomes the reason the angel pleads for Jerusalem in the next verse.

🌎 The nations outside Judah seem calm
🏙️ Jerusalem still lies in ruins
⚖️ Calm elsewhere is not calm everywhere
➡️ This report leads straight into a plea

# Zechariah 1:12-17
# 🕊️ Comfortable Words For Jerusalem
---
## 👼 How Long Wilt Thou Not Have Mercy On Jerusalem

The angel of the LORD speaks this prayer out loud on Zechariah's behalf.

It is a direct question aimed at God himself.

The calm, resting world from the last verse makes Jerusalem's ruin feel even harder to bear.

Even an angel can voice the same frustration the people themselves were feeling.

👼 The angel prays this on Zechariah's behalf
❓ It questions God directly
🏙️ Jerusalem's ruin contrasts the calm world
📖 Even angels can voice real frustration

## 🔢 These Threescore And Ten Years

"Threescore and ten" is an old way of saying seventy.

Jeremiah had already promised the exile in Babylon would last exactly seventy years.

That seventy year period was either just finishing or already complete by this point.

The angel's question asks why relief still has not fully arrived.

🔢 Threescore and ten means seventy
📜 Jeremiah had promised a seventy year exile
⏳ That period was ending around now
📖 The question asks why relief feels delayed

## 💬 Good Words And Comfortable Words

"Comfortable" here means strengthening and reassuring, not simply cozy.

God answers the angel's hard question with real kindness.

The reply is gentle, but it is not vague or empty.

Specific promises follow immediately after this gentle answer.

💬 Comfortable means strengthening, not cozy
🤝 God answers with real kindness
✅ The reply is not vague
📖 Specific promises follow right after

## ❤️ I Am Jealous For Jerusalem And For Zion With A Great Jealousy

This "jealousy" is not selfish envy.

It describes a fierce, protective love for something that truly belongs to someone.

God is claiming Jerusalem as his own in the strongest possible language.

That ownership is the reason he will act on her behalf.

❤️ Jealous means fierce, protective love
🚫 This is not selfish envy
🏙️ God claims Jerusalem as his own
📖 Ownership is the reason he acts

## 🌍 The Heathen That Are At Ease

"The heathen" refers to the nations that conquered and scattered Israel and Judah.

"At ease" pictures them living comfortably while Jerusalem still lies in ruins.

That comfort looks unfair sitting right next to Jerusalem's suffering.

God names that unfairness plainly before answering it.

🌍 Heathen means the conquering nations
😌 At ease means living comfortably
⚖️ Their comfort sits beside Jerusalem's ruin
📖 God names the unfairness plainly

## ➕ They Helped Forward The Affliction

God admits his own anger toward Israel was real but limited.

The nations God used for judgment went much further than he intended.

"Helped forward" means they pushed the suffering past what was ever meant to happen.

Being a tool of judgment does not excuse going beyond it.

⚖️ God's own anger was limited
➕ The nations pushed it further
🚫 Being a tool does not excuse excess
📖 Judgment has limits even the judged can break

## 🏛️ My House Shall Be Built In It

"My house" means the temple, the building currently sitting unfinished.

This is a direct, personal promise, not a vague hope.

Haggai's own messages about the temple are being echoed and confirmed here.

Two separate prophets now carry the exact same promise.

🏛️ My house means the temple
📜 This matches Haggai's own promise
🤝 Two prophets confirm one promise
📖 God commits personally to the project

## 📏 A Line Shall Be Stretched Forth Upon Jerusalem

A "line" here is a measuring cord used before any building work begins.

Surveyors stretched this cord across a site to mark out new walls and streets.

This image promises the actual rebuilding of the city itself, not only the temple.

Measuring for something new is a hopeful act after years of ruin.

📏 A line is a measuring cord
🏗️ Surveyors used it before building
🏙️ This promises the whole city rebuilt
📖 Measuring is itself a hopeful act

## 🏘️ My Cities Through Prosperity Shall Yet Be Spread Abroad

This promise reaches past Jerusalem to the smaller towns around it.

"Spread abroad" pictures towns growing and expanding outward again.

The word "yet" repeats three times across these two verses.

That repetition insists the promise is still coming, even though it has not arrived yet.

🏘️ This promise reaches smaller towns too
📈 Spread abroad means growing outward
🔁 Yet repeats three times here
📖 Repetition insists the promise still stands

## ✅ The LORD Shall Yet Comfort Zion, And Shall Yet Choose Jerusalem

"Choose" does not mean God is picking Jerusalem for the first time.

It means he is renewing and reaffirming a choice he already made long ago.

This line closes the whole opening vision on a note of comfort.

The chapter began with the fathers' judgment and ends with the children's hope.

✅ Choose means renewing an old decision
🕊️ This closes the vision in comfort
⚖️ Judgment opened, hope closes it
📖 God's choice of Jerusalem stands renewed

# Zechariah 1:18-21
# 🐂 Four Horns And Four Craftsmen
---
## 👀 Lifted I Up Mine Eyes, And Saw

This phrase marks the start of a brand new vision.

Zechariah actively looks up this time, rather than simply watching events unfold.

Several of his visions open with this same kind of phrase.

A new scene is clearly beginning right here.

👀 This marks a brand new vision
🙆 Zechariah actively looks up
🔁 Several visions open this same way
📖 A clear new scene begins here

## 🐂 Behold Four Horns

A horn pictures strength and power, the way an animal uses it to fight.

Ancient readers understood horns as a natural symbol of a kingdom's military might.

Four horns together suggest every direction of opposing power, not just one enemy.

This image sets up the question that follows immediately.

🐂 A horn pictures strength and power
⚔️ It symbolizes a kingdom's might
🧭 Four horns suggest every direction
📖 This sets up the question ahead

## 🌍 The Horns Which Have Scattered Judah, Israel, And Jerusalem

These horns stand for the nations that conquered and scattered God's people.

Judah and Israel are named as the two separate kingdoms that once existed.

Jerusalem is named a third time on its own as the capital city.

Naming all three stresses how completely the scattering reached every part of the nation.

🌍 Horns stand for conquering nations
🗺️ Judah and Israel were two kingdoms
🏙️ Jerusalem is named as the capital
📖 The scattering reached every part

## 🔨 The LORD Shewed Me Four Carpenters

"Carpenters" translates a word that can mean any skilled craftsman.

It does not have to mean someone who only works with wood.

Four craftsmen arrive to match the four horns exactly, one for one.

God provides an answer sized perfectly to the problem.

🔨 Carpenters means any skilled craftsman
🪵 Not only someone who works wood
🔢 Four craftsmen match four horns
📖 God's answer fits the problem exactly

## 🙇 So That No Man Did Lift Up His Head

"Lift up his head" is an old way of describing confidence and dignity.

The horns had crushed that confidence completely out of Judah.

People under this kind of pressure often live in constant fear and shame.

This phrase names exactly what the coming craftsmen are sent to undo.

🙇 Lift up his head means confidence
💔 The horns crushed that confidence
😔 People lived in fear and shame
📖 This names what will soon be undone

## 😱 Come To Fray Them

"Fray" is an old word meaning to frighten or terrify.

The craftsmen's job is not to build anything in this vision.

Their job is to scare off the very powers that scattered Judah.

A tool meant for building becomes a weapon against oppression here.

😱 Fray means to frighten or terrify
🔨 Their job is not building here
⚔️ Their job is driving off oppressors
📖 A building tool becomes a weapon

## ⚖️ Lifted Up Their Horn Over The Land Of Judah To Scatter It

This final line repeats the chapter's opening problem one more time.

Judah had been small and defenseless against these more powerful nations.

The chapter that began with a call to repentance now ends with a promise of justice.

Every power that scattered God's people will one day answer for it.

🐂 This repeats the chapter's opening problem
🛡️ Judah stood defenseless before
⚖️ The chapter ends in promised justice
📖 Every scattering power will answer for it
`.trim();

export const ZECHARIAH_ONE_PERSONAL_SECTIONS = parseZechariahOneRawNotes(ZECHARIAH_ONE_RAW_NOTES);
