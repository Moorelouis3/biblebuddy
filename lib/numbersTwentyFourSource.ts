export type NumbersTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwentyFourRawNotes(rawText: string): NumbersTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 24:${startVerse}` : `Numbers 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Numbers 24 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_FOUR_RAW_NOTES = `# Numbers 24:1-2
# 🕊️ Balaam Stops Fighting It
---
## 🎯 It Pleased The LORD To Bless Israel
Balaam finally stops resisting what has already happened twice. After two oracles came out as blessings instead of curses, he accepts that this is simply what God wants, not a fluke he can still work around.
This is a real shift in his posture. Back in Numbers 22, he kept asking God the same question hoping for a different answer. Now he stops pushing.
🎯 Balaam accepts the pattern instead of fighting it
🔁 Two earlier oracles already came out this way
🔑 A real change in his attitude, not just his words

## 🚫 He Went Not, As At Other Times, To Seek For Enchantments
"Enchantments" means the divination rituals Balaam used twice already — reading omens, watching for signs after animal sacrifices. This time he skips all of that.
Pagan diviners of this era relied on these rituals to try to control or predict what a god would do. Balaam quietly drops the whole method here.
🚫 "Enchantments" means divination rituals, like reading omens
🐂 The same method behind the seven-altar sacrifices in Numbers 23
🔑 He abandons the ritual search entirely this time

## 🏜️ He Set His Face Toward The Wilderness
Instead of looking for a private sign somewhere else, Balaam turns to look directly at Israel's camp spread out in the wilderness. He stops searching and just looks.
This small physical detail matters. Twice before, he stepped away from Balak to seek God alone. This time there's no stepping away — just a direct, open look at the people he's supposed to curse.
🏜️ Turns to look straight at Israel's camp
👁️ No private ritual step-away this time
🔑 A more open, direct posture than his last two attempts

## 🏕️ He Saw Israel Abiding In His Tents According To Their Tribes
The camp Balaam sees is the same highly organized system laid out back in Numbers 2 — each tribe camped in its assigned place around the tabernacle at the center. It isn't a scattered crowd; it's a nation in order.
🏕️ Israel's camp follows the tribal layout from Numbers 2
📐 An organized nation, not a random crowd
🔑 Order itself becomes part of what impresses Balaam

## 🕊️ The Spirit Of God Came Upon Him
This is different from what happened before. Earlier, God "met" Balaam and "put a word in his mouth" during a private encounter. Here, God's Spirit comes on him directly, the same kind of language used later for judges and prophets like Samson or Saul.
🕊️ A more direct, personal experience than his earlier oracles
⚡ Similar language to how judges and prophets are described later
🔑 Marks this third oracle as the most intense one yet

# Numbers 24:3-9
# 🌿 The Third Oracle: A Nation In Full Bloom
---
## 📜 Balaam The Son Of Beor Hath Said
Balaam introduces this oracle by naming himself and his father, Beor — a formal way ancient prophets and poets stated their own credentials before an important speech, similar to how a scribe might sign a document.
📜 A formal self-introduction before the oracle
🖋️ Similar to how ancient documents were formally signed
🔑 Signals this speech is serious and official, not casual

## 👁️ The Man Whose Eyes Are Open
This phrase repeats word for word from Numbers 23:3. There's real irony in it — back in Numbers 22, Balaam's own donkey saw the angel blocking the road before Balaam did. Now his eyes are truly open to something no one else can see.
👁️ Repeats the exact phrase from Numbers 23:3
🫏 Ironic callback: his donkey saw the angel before he did
🔑 His "open eyes" are now spiritual insight, not literal sight

## 😴 Falling Into A Trance, But Having His Eyes Open
A trance here means an overwhelming, altered state where God takes over the message, not sleep or unconsciousness. Balaam stays fully awake and aware while it happens — a detail meant to show this vision is real, not a dream he could misremember.
😴 "Trance" means an overwhelming God-given state, not sleep
👀 He stays awake and aware the whole time
🔑 Shows this is a real vision, not something dreamed up

## 🏕️ How Goodly Are Thy Tents, O Jacob, And Thy Tabernacles, O Israel
This line says the same thing twice in different words — "tents" and "tabernacles" both mean dwelling places, and "Jacob" and "Israel" both mean the same nation. Hebrew poetry often repeats an idea like this instead of rhyming sounds.
This exact verse became famous much later as the opening line of the Jewish morning prayer "Mah Tovu," still recited today.
🏕️ Says the same thing twice, a common Hebrew poetry pattern
🙏 Later became the opening line of the Jewish "Mah Tovu" prayer
🔑 A genuine compliment, not empty flattery

## 🌳 As The Valleys... As Gardens By The River's Side
Balaam pictures Israel's camp using images of lush, well-watered growth — valleys and river gardens were the most fertile, desirable land in the ancient Near East, nothing like the dry wilderness Israel is actually camping in.
🌳 Valleys and river gardens picture rich, fertile land
🏜️ A sharp contrast with the actual dry wilderness setting
🔑 A picture of thriving abundance, not literal geography

## 🌲 Trees Of Lign Aloes Which The LORD Hath Planted
Lign aloes were a rare, expensive aromatic wood imported from as far away as India, prized for its fragrance. Comparing Israel to a tree God Himself planted makes their existence and growth God's doing, not an accident of history.
🌲 Lign aloes were a rare, imported fragrant wood
💰 An expensive luxury item in the ancient world
🔑 "Which the LORD hath planted" makes Israel's growth God's own doing

## 🌲 Cedar Trees Beside The Waters
Cedars, especially the cedars of Lebanon, were the tallest and most valued trees in the region — later used to build Solomon's temple. Comparing Israel to cedar trees pictures a nation built to last and stand tall among the nations around it.
🌲 Cedars of Lebanon were the region's most prized, tallest trees
🏛️ The same wood later used to build Solomon's temple
🔑 Pictures Israel as strong and built to last

## 💧 He Shall Pour The Water Out Of His Buckets
This is fertility imagery — overflowing water pictures a nation that will keep growing and multiplying, never running dry. "His seed shall be in many waters" pictures descendants spreading out widely, like water flowing into many streams.
💧 Overflowing water pictures ongoing growth and multiplication
🌊 "Many waters" pictures descendants spreading widely
🔑 A promise of continued growth, not a one-time blessing

## 👑 His King Shall Be Higher Than Agag
Agag wasn't one specific man's name here — it was a royal title used by Amalekite kings, similar to how "Pharaoh" or "Caesar" worked as titles for a whole line of rulers. This line points ahead to Israel eventually having a king who outranks Amalek's throne.
👑 "Agag" was a royal title for Amalekite kings, not one man's name
📖 Comes up again later when King Saul fights an Agag in 1 Samuel 15
🔑 A forward-looking promise about Israel's future king

## 🐫 God Brought Him Forth Out Of Egypt
The same Exodus reminder repeated from Numbers 23:22, restating that everything happening here traces back to God's rescue of Israel from slavery, not anything Israel accomplished on its own.
🐫 Repeats the Exodus reminder from Numbers 23:22
📖 Roots this entire blessing back in the Exodus rescue
🔑 Credits God, not Israel's own strength, for where they stand now

## 🏹 He Shall Eat Up The Nations His Enemies, And Break Their Bones
This continues the "strength of an unicorn" comparison from Numbers 23:22 (a wild ox, not a mythical horse) with graphic ancient war poetry describing complete, decisive victory over enemy nations — not a literal claim about behavior.
🏹 Continues the wild-ox strength comparison from Numbers 23:22
⚔️ Standard ancient poetic language for total military victory
🔑 Not a literal description, but a common style for describing conquest

## 🦁 He Couched, He Lay Down As A Lion... Who Shall Stir Him Up?
A resting lion is more frightening than an attacking one — it pictures unstoppable strength so secure it doesn't even need to be active to be feared. This echoes Jacob's blessing over Judah as a lion in Genesis 49:9.
🦁 A resting lion pictures strength too secure to need to attack
📖 Echoes Judah's lion blessing back in Genesis 49:9
🔑 Confidence and power shown through stillness, not motion

## 🤝 Blessed Is He That Blesseth Thee, And Cursed Is He That Curseth Thee
This is a near word-for-word repeat of God's original promise to Abraham in Genesis 12:3. Balaam, without realizing the full weight of it, is confirming that the oldest covenant promise in the Bible still stands exactly as given.
🤝 Nearly repeats God's promise to Abraham in Genesis 12:3
📜 Confirms a promise made generations earlier
🔑 The exact reason Balak's whole plan was doomed from the start

# Numbers 24:10-13
# 😡 Balak Gives Up
---
## 👏 He Smote His Hands Together
This is an ancient gesture of rage and frustration, similar to an explosive clap — not applause. Balak's body language shows him losing control of his emotions in front of everyone watching.
👏 An ancient gesture of anger, not celebration
😤 Shows Balak losing composure publicly
🔑 His anger is physical, not just spoken

## 3️⃣ Thou Hast Altogether Blessed Them These Three Times
Balak counts it up: two full oracles in Numbers 23, and now this third one. "Altogether" means completely, with nothing held back — three separate chances to curse Israel, and three complete blessings instead.
3️⃣ Counts three full oracles: two in Numbers 23, one here
🙅 "Altogether" means completely, with nothing held back
🔑 A total, undeniable failure of Balak's entire plan

## 🏃 Flee Thou To Thy Place
Balak's fury turns into a blunt order to leave. This is a sharp reversal from how eager and respectful he was when he first sent for Balaam back in Numbers 22.
🏃 A blunt dismissal, ordering Balaam to leave
🔄 A sharp reversal from his eager welcome in Numbers 22
🔑 Shows how completely his plan has collapsed

## 💰 I Thought To Promote Thee Unto Great Honour
Balak reveals what he'd actually offered — wealth and high status, matching his original promise back in Numbers 22:17. He's now taking that offer off the table since Balaam never delivered the curse he was hired for.
💰 References the reward promised back in Numbers 22:17
🚫 That reward is now withdrawn
🔑 Confirms exactly what Balak had been dangling all along

## ⚖️ The LORD Hath Kept Thee Back From Honour
Without meaning to, Balak states the plain truth: it really was God, not Balaam's own choice, that stopped the reward from happening. Even in his anger, Balak accidentally confirms exactly what Balaam has been saying all along.
⚖️ Balak unintentionally admits the real cause
😅 Confirms Balaam's own explanation, even in anger
🔑 The truth comes out even from someone who doesn't want to admit it

## 🥈 If Balak Would Give Me His House Full Of Silver And Gold
Balaam repeats, almost word for word, what he told Balak's messengers back in Numbers 22:18. Saying it again here, after three failed attempts, proves he meant it the whole time — this was never about money.
🥈 Repeats his own words from Numbers 22:18
🔁 Said now for a third time, proving it was never empty talk
🔑 Confirms his consistency across the entire story

# Numbers 24:14-19
# ⭐ The Star Out Of Jacob
---
## 📢 I Will Advertise Thee
"Advertise" here is an old word meaning "inform" or "tell" — not selling something like the modern word suggests. Balaam is about to tell Balak, as a courtesy on his way out, what Israel will eventually do to Moab.
📢 "Advertise" here means "inform" or "tell," not sell
🎁 Offered almost as a parting courtesy before Balaam leaves
🔑 One last piece of information before this story ends

## 🔮 What This People Shall Do To Thy People In The Latter Days
"Latter days" signals this next oracle reaches further into the future than the first three — not just describing Israel's blessing now, but predicting events well beyond Balaam's own lifetime.
🔮 "Latter days" points to a more distant future than earlier oracles
⏳ Reaches beyond anything Balaam himself will see
🔑 Marks a shift into long-range prophecy

## 📖 The Man Whose Eyes Are Open Hath Said (Again)
Balaam repeats the identical formal introduction from verses 3-4 almost word for word, signaling this fourth oracle deserves the same serious, prophetic weight as the ones before it.
📖 Repeats the formula from verses 3-4 almost exactly
🎙️ Marks the same solemn, official prophetic style
🔑 Prepares the listener for another weighty message

## 🧠 Knew The Knowledge Of The Most High
This phrase is new here, not in the earlier oracles — it claims an even deeper level of insight into God's own understanding, appropriate for a prophecy that reaches further into the future than anything said before.
🧠 A new phrase not used in the earlier oracles
🔎 Claims deeper insight, fitting this longer-range prophecy
🔑 Signals this oracle goes further than the ones before it

## ⭐ There Shall Come A Star Out Of Jacob
A star was a common ancient symbol for a coming king or ruler, not a literal star. This line is read by both Jewish and Christian tradition as pointing toward a future king — including the star that later leads wise men to Jesus in Matthew 2.
⭐ A star was an ancient symbol for a coming king
📖 Echoed centuries later by the star in Matthew 2
🔑 One of the Bible's earliest hints of a future promised ruler

## 👑 A Sceptre Shall Rise Out Of Israel
A sceptre is a ruler's staff, a symbol of royal authority. This line closely matches Jacob's own prophecy over Judah in Genesis 49:10 that the "sceptre shall not depart from Judah" — pointing toward the same royal, eventually messianic, family line.
👑 A sceptre is a symbol of royal authority
📖 Closely matches Judah's blessing in Genesis 49:10
🔑 Two separate prophecies pointing to the same coming ruler

## 💥 Smite The Corners Of Moab, And Destroy All The Children Of Sheth
On the immediate, historical level, this predicts a future Israelite king defeating Moab — something King David actually does in 2 Samuel 8:2. "Children of Sheth" is unclear in meaning, possibly a poetic way of saying "all people" or "all who oppose."
💥 Predicts a future defeat of Moab, fulfilled by David in 2 Samuel 8:2
❓ "Children of Sheth" is unclear — possibly a poetic term for "all people"
🔑 Works on two levels: a near historical event and a wider prophecy

## 🏔️ Edom Shall Be A Possession, Seir Also Shall Be A Possession
Edom and Seir both refer to the descendants of Esau, Jacob's brother, living southeast of the Dead Sea. This too gets historically fulfilled when David conquers Edom in 2 Samuel 8:14.
🏔️ Edom and Seir both refer to Esau's descendants
📖 Fulfilled when David conquers Edom in 2 Samuel 8:14
🔑 Another specific nation the coming king will rule over

## 👑 Out Of Jacob Shall Come He That Shall Have Dominion
This restates the star/sceptre ruler from verse 17 in plainer language — dominion means real ruling authority, not just fame or influence. The oracle circles back to its central point one more time before ending.
👑 Restates the coming ruler from verse 17 in plainer words
⚖️ "Dominion" means real ruling authority
🔑 The oracle's central point, repeated once more before it closes

# Numbers 24:20-24
# 🌊 Oracles Against Amalek, The Kenites, And The Nations Beyond
---
## ⚔️ Amalek Was The First Of The Nations
Amalek was the very first nation to attack Israel after they left Egypt, ambushing them at Rephidim back in Exodus 17. This oracle marks Amalek's long history as Israel's oldest and most persistent enemy.
⚔️ The first nation to attack Israel after the Exodus (Exodus 17)
📖 Marks Amalek as Israel's oldest recurring enemy
🔑 A short oracle about a long-running conflict

## 💀 His Latter End Shall Be That He Perish For Ever
This prophecy of Amalek's total, final destruction plays out over centuries — through King Saul's war against them in 1 Samuel 15, and later through Haman, a descendant of an Amalekite king, in the book of Esther.
💀 Predicts Amalek's eventual total destruction
📖 Plays out through 1 Samuel 15 and later through Haman in Esther
🔑 One short verse covering centuries of ongoing conflict

## 🏔️ Strong Is Thy Dwellingplace, And Thou Puttest Thy Nest In A Rock
The Kenites were a nomadic people connected to Moses' father-in-law Jethro, already introduced as allies of Israel back in Numbers 10:29. This describes their fortified, defensible homes built into mountain cliffs.
🏔️ The Kenites were connected to Moses' father-in-law Jethro
🤝 Already introduced as Israel's allies in Numbers 10:29
🔑 "Nest in a rock" describes a naturally defensible mountain home

## 🏹 Nevertheless The Kenite Shall Be Wasted, Until Asshur Shall Carry Thee Away Captive
Despite their strong defenses and friendly relationship with Israel, even the Kenites won't escape history forever. "Asshur" is Assyria, foreshadowing the empire that will conquer this whole region centuries later, recorded in 2 Kings 17.
🏹 Even a friendly, well-defended people isn't exempt from history
🌍 "Asshur" is Assyria, a coming regional superpower
🔑 Points ahead to the Assyrian conquests of 2 Kings 17

## 😨 Alas, Who Shall Live When God Doeth This!
For a moment, Balaam breaks out of formal oracle language and reacts personally — an exclamation of genuine dread at the sheer scale of what he's seeing unfold across future history.
😨 A rare personal reaction breaking the formal oracle style
😳 Shows real dread at the scale of what's being revealed
🔑 Even the prophet is shaken by his own words here

## 🚢 Ships Shall Come From The Coast Of Chittim
Chittim refers to Cyprus and the wider Mediterranean coastlands. This oracle stretches the furthest of all four, likely pointing ahead to Greek and later Roman power eventually overtaking Assyria and this whole region, centuries after Balaam's own lifetime.
🚢 Chittim refers to Cyprus and Mediterranean coastlands
🏛️ Likely points ahead to Greek and Roman conquest, centuries later
🔑 The widest-reaching oracle in the whole sequence

## 🌍 Shall Afflict Asshur, And Shall Afflict Eber... He Also Shall Perish For Ever
Even mighty Assyria and "Eber" (likely a wider name for Mesopotamian peoples, possibly connected to the word "Hebrew") eventually fall too. The oracle ends by widening its lens to include everyone, closing on the same note as Amalek's fate: nothing that opposes God's plan lasts forever.
🌍 Even Assyria and the wider "Eber" peoples eventually fall
📖 "Eber" may connect to the word "Hebrew," though its exact scope is unclear
🔑 Closes with the same fate as Amalek: nothing opposing God's plan lasts

# Numbers 24:25
# 🚶 Two Men Go Their Separate Ways
---
## 🚶 Balaam Rose Up, And Went, And Returned To His Place
After four oracles and prophecies stretching centuries into the future, the story ends with a strangely quiet, ordinary sentence — Balaam just leaves. This isn't the last the Bible will hear of him; he reappears fighting against Israel in Numbers 31:8, and is later remembered as a warning, not a hero (2 Peter 2:15).
🚶 An oddly quiet, ordinary ending after such a huge prophecy
📖 Balaam reappears later in Numbers 31:8, no longer neutral
🔑 Later remembered in the Bible as a warning, not a hero

## 🏰 Balak Also Went His Way
Balak's story closes in total defeat — three separate locations, three sets of seven altars, fourteen animals each time, and none of it changed the outcome even slightly. Everything he spent turned out to be for nothing against a blessing he never had any power to undo.
🏰 Three locations, three rituals, all with the same result
💸 A massive effort that changed nothing
🔑 Confirms once more that no ritual can override God's decision
`;

export const NUMBERS_TWENTY_FOUR_PERSONAL_SECTIONS = parseNumbersTwentyFourRawNotes(NUMBERS_TWENTY_FOUR_RAW_NOTES);
