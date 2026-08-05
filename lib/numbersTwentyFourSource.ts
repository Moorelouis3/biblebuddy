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

const NUMBERS_TWENTY_FOUR_RAW_NOTES = `
# Numbers 24:1-2
# 🕊️ Balaam Stops Fighting The Blessing
---
## 🎯 It Pleased The LORD To Bless Israel

Balaam finally stops trying to change God's mind.

Twice already, in Numbers 23, his curses turned into blessings instead.

This time he does not even attempt a curse.

He simply accepts what God has already decided.

🎯 Balaam stops trying to change God's mind

🔁 Two earlier oracles already turned to blessing

✅ He accepts the outcome instead of resisting

📖 Resisting God gives way to accepting Him

---
## 🔮 He Went Not To Seek For Enchantments

"Enchantments" means divination rituals, ways diviners tried to read a god's will.

Twice before, Balaam watched omens after animal sacrifices.

This time he skips that ritual completely.

Ancient diviners relied on rituals like this to predict what a god would do.

Balaam no longer needs one.

🔮 Enchantments means divination rituals

🐂 He used this method twice before

🚫 This time he skips the ritual completely

➡️ He no longer needs a ritual at all

---
## 🏜️ He Set His Face Toward The Wilderness

"Set his face" means he turned to look straight at something.

Twice before, Balaam stepped away from Balak to seek God alone.

This time there is no stepping away.

He simply turns and looks at Israel's camp.

🏜️ Set his face means he turned to look

🚶 No private step away this time

👁️ He looks directly at Israel's camp

➡️ A more open posture than before

---
## 🏕️ He Saw Israel Abiding In His Tents According To Their Tribes

The camp Balaam sees is not a scattered crowd.

Numbers 2 already laid out this exact system.

Each tribe camped in its assigned place around the tabernacle.

Balaam is looking at a nation in order, not chaos.

🏕️ Israel's camp follows the layout from Numbers 2

📐 Each tribe has its assigned place

🎯 Order, not chaos, is what Balaam sees

📖 Structure becomes part of what impresses him

---
## 🕊️ The Spirit Of God Came Upon Him

This is different from what happened in Balaam's first two oracles.

Earlier, God met Balaam and put a word in his mouth during a private encounter.

Here, God's Spirit comes on him directly.

That is the same kind of language later used for judges and prophets like Samson.

🕊️ A more direct experience than his earlier oracles

⚡ Similar language used later for judges and prophets

🔥 Marks this as the most intense encounter yet

📖 God's presence grows stronger with each oracle

---
# Numbers 24:3-9
# 🌿 A Nation In Full Bloom
---
## 📜 Balaam The Son Of Beor Hath Said

Balaam names himself and his father, Beor, before he speaks.

Ancient prophets and poets often stated their own credentials this way.

It works something like a scribe signing a document before writing it.

This detail signals that the oracle to come is formal and official.

📜 Naming himself is a formal introduction

🖋️ Similar to signing a document before writing

🎙️ Signals the oracle is official, not casual

📖 The formality matches the weight of what follows

---
## 👁️ The Man Whose Eyes Are Open

This exact phrase already appeared once, in Numbers 23:3.

There is real irony hidden in it.

Back in Numbers 22, Balaam's own donkey saw the angel before he did.

Now, at last, his eyes are open to something no one else can see.

👁️ The phrase repeats from Numbers 23:3

🫏 His donkey saw the angel first

😳 Balaam is the last one to truly see

📖 Open eyes here means spiritual insight, not sight

---
## 🗣️ Which Heard The Words Of God, Which Saw The Vision

Balaam claims two separate kinds of contact with God in the same breath.

He says he heard God's words.

He also says he saw a vision from the Almighty.

Stacking both claims together makes the oracle harder to dismiss as guesswork.

🗣️ He claims to hear God's words

👁️ He also claims to see a vision

🔗 Both claims stack together in one line

📖 Together they make the message harder to doubt

---
## 😴 Falling Into A Trance, But Having His Eyes Open

A trance here does not mean sleep or losing consciousness.

It means an overwhelming state that God brings on him.

Balaam stays fully awake through the whole thing.

That detail matters, since it shows this vision was real, not a dream he could forget.

😴 Trance means a state God brings on

👀 Balaam stays awake the entire time

🚫 Not sleep, and not unconsciousness

➡️ Staying awake proves this was not a dream

---
## 🏕️ How Goodly Are Thy Tents, O Jacob

"Tents" and "tabernacles" both mean the same thing, a dwelling place.

"Jacob" and "Israel" both mean the same nation, just two different names.

Hebrew poetry often repeats one idea in different words instead of using rhyme.

This exact verse later became the opening line of the Jewish morning prayer Mah Tovu.

🏕️ Tents and tabernacles both mean dwellings

👥 Jacob and Israel both mean one nation

🎶 Hebrew poetry repeats ideas instead of rhyming

📖 This verse opens the Jewish prayer Mah Tovu

---
## 🌳 As The Valleys Are They Spread Forth

Balaam is not describing where Israel is actually camped.

Israel is sitting in dry wilderness, nothing close to a valley or a river garden.

Valleys and river gardens were the most fertile land in the ancient world.

Balaam borrows that image to picture Israel thriving, not to describe the ground under their feet.

🌳 Valleys and river gardens meant rich, fertile land

🏜️ Israel's real camp was dry wilderness

🎨 This is an image of thriving, not geography

📖 Balaam pictures growth, not location

---
## 🌲 Trees Of Lign Aloes Which The LORD Hath Planted

Lign aloes were a rare, fragrant wood, imported from as far away as India.

Owning it marked real wealth in the ancient world.

Calling Israel a tree that the LORD planted makes their growth God's own doing.

It is not an accident of history.

🌲 Lign aloes was a rare imported wood

💰 Owning it marked real wealth

🌱 The LORD planted this tree himself

📖 Israel's growth is credited to God, not chance

---
## 🌲 Cedar Trees Beside The Waters

Cedars, especially the cedars of Lebanon, were the tallest trees in the region.

Solomon later used this same wood to build the temple.

Comparing Israel to cedar trees pictures a nation built to last.

It also pictures a nation that stands tall among its neighbors.

🌲 Cedars of Lebanon were the region's finest trees

🏛️ The same wood later built Solomon's temple

💪 The image pictures strength and lasting power

📖 Israel is pictured as built to last

---
## 💧 He Shall Pour The Water Out Of His Buckets

This is fertility imagery, not a literal description of buckets.

Overflowing water pictures a nation that keeps growing and never runs dry.

"His seed shall be in many waters" pictures descendants spreading like water into many streams.

The oracle even adds that his kingdom shall be lifted higher because of this growth.

💧 Overflowing water pictures ongoing growth

🌊 Many waters pictures descendants spreading widely

📈 The kingdom itself grows more exalted

➡️ A promise of lasting growth, not one event

---
## 👑 His King Shall Be Higher Than Agag

Agag was not one specific man's name here.

It was a royal title used by Amalekite kings.

It worked the way Pharaoh worked as a title for a whole line of rulers.

That promise comes true later, when King Saul fights an Agag in 1 Samuel 15.

👑 Agag was a royal title, not a name

🏛️ It worked like the title Pharaoh

🔮 The line points to a future Israelite king

📖 It comes true later in 1 Samuel 15

---
## 🐫 God Brought Him Forth Out Of Egypt

This is the same Exodus reminder already used once, in Numbers 23:22.

Everything Balaam describes traces back to one event, God rescuing Israel from slavery.

Israel did not build this greatness by its own strength.

God gets the credit for where the nation stands now.

🐫 Repeats the Exodus reminder from Numbers 23:22

🔑 Everything traces back to that one rescue

🚫 Not a result of Israel's own strength

📖 God gets credit for Israel's current standing

---
## 🐂 He Hath As It Were The Strength Of An Unicorn

This does not mean a mythical horned horse.

The Hebrew word here describes a wild ox, known for raw strength.

Comparing Israel to this animal pictures a power that no one can tame.

The image continues into the next line about broken bones and enemies.

🐂 Unicorn here means a wild ox

💪 The image is raw, untamed strength

🚫 Not a mythical horned horse

➡️ The strength image continues into the next line

---
## 🏹 He Shall Eat Up The Nations His Enemies

This is not a literal claim about Israel's future behavior.

Ancient war poetry regularly used graphic language like this for total victory.

Breaking bones and piercing with arrows are standard images for a total military defeat.

The point is total victory, not a literal description of violence.

🏹 Ancient poetry described total victory this way

💥 Broken bones pictures decisive defeat

🎯 Piercing with arrows is standard war imagery

📖 The point is total victory, not literal violence

---
## 🦁 He Couched, He Lay Down As A Lion

A resting lion is more frightening than an attacking one.

It pictures strength so secure it does not need to move to be feared.

This same image already appeared in Jacob's blessing over Judah, in Genesis 49:9.

Confidence and power are shown through stillness here, not motion.

🦁 A resting lion pictures unstoppable strength

😌 It need not attack to be feared

📖 Echoes Judah's blessing in Genesis 49:9

➡️ Power shown through stillness, not motion

---
## 🤝 Blessed Is He That Blesseth Thee

This line nearly repeats God's original promise to Abraham, in Genesis 12:3.

Balaam says it without realizing the full weight behind it.

He is confirming, out of his own mouth, that the oldest covenant promise still stands.

This is the exact reason Balak's entire plan was doomed before it began.

🤝 Nearly repeats God's promise in Genesis 12:3

😮 Balaam confirms it without realizing the weight

📜 The oldest covenant promise still stands

📖 Balak's whole plan was doomed from the start

---
# Numbers 24:10-13
# 😡 Balak's Anger, Balaam's Answer
---
## 👏 He Smote His Hands Together

This is not applause.

It is an ancient gesture of rage, closer to an explosive, angry clap.

Balak's body language shows him losing control in front of everyone watching.

His anger is physical here, not just spoken.

👏 Smote his hands together means an angry clap

😤 Not applause, a gesture of rage

👀 Shown publicly, in front of everyone

➡️ His anger is physical, not just words

---
## 🔢 Thou Hast Altogether Blessed Them These Three Times

"Altogether" means completely, with nothing held back.

Balak is counting up the failures out loud.

Two full oracles already happened in Numbers 23, and this is the third one.

Three separate chances to curse Israel produced three complete blessings instead.

🔢 Altogether means completely, nothing held back

🧮 Counts three oracles total, two before this one

🚫 Three chances to curse, three blessings instead

📖 A total, undeniable failure of Balak's plan

---
## 🏃 Flee Thou To Thy Place

Balak's fury turns into a blunt order to leave.

This is a sharp reversal from how he greeted Balaam back in Numbers 22.

Then, he was eager and respectful, hoping for a curse.

Now he simply wants Balaam gone.

🏃 A blunt order to leave

🔄 A reversal from his welcome in Numbers 22

😤 Respect has turned into dismissal

➡️ Shows how completely his plan collapsed

---
## 💰 I Thought To Promote Thee Unto Great Honour

Balak reveals exactly what he had offered, wealth and high status.

That matches his original promise, already made back in Numbers 22:17.

He is now taking the offer off the table.

Balaam never delivered the curse he was hired to speak.

💰 References the reward promised in Numbers 22:17

🚫 That reward is now withdrawn

🙅 Balaam never delivered the curse

📖 Confirms exactly what Balak had been offering

---
## ⚖️ The LORD Hath Kept Thee Back From Honour

Without meaning to, Balak states the plain truth.

It was God, not Balaam's own choice, that stopped the reward.

Even in his anger, Balak confirms exactly what Balaam has been saying the whole time.

Truth can surface even through an angry accusation.

⚖️ Balak admits the real cause without meaning to

😅 It was God, not Balaam's choice

✅ Confirms what Balaam had already said

📖 Truth can surface even through anger

---
## 🗣️ Spake I Not Also To Thy Messengers

Balaam is not saying something new here.

He already told Balak's messengers this at the very start of the story.

That happened back in Numbers 22:18.

He is simply reminding Balak that he warned him from the beginning.

🗣️ Balaam already said this in Numbers 22:18

📢 He reminds Balak he warned him first

🔁 His answer never changed

➡️ Consistency, not a new excuse

---
## 🥈 If Balak Would Give Me His House Full Of Silver And Gold

Balaam repeats, almost word for word, what he told Balak's messengers at the start.

He says it again now, after three failed attempts to curse Israel.

Saying it a second time proves he meant it the whole time.

This was never about money for Balaam.

🥈 Repeats his own words from Numbers 22:18

🔁 Said again after three failed oracles

✅ Proves it was never empty talk

📖 Confirms his consistency across the whole story

---
## 🚫 I Cannot Go Beyond The Commandment Of The LORD

This is the core claim Balaam has made from the start of the story.

He cannot say anything, good or bad, from his own mind.

Only what the LORD actually says gets spoken.

Three oracles later, that claim has now been proven completely true.

🚫 Balaam cannot speak beyond God's command

🗣️ Only what the LORD says gets spoken

✅ This claim has now been proven true

📖 Obedience, not opinion, shaped every oracle

---
# Numbers 24:14-19
# ⭐ The Star Out Of Jacob
---
## 📢 I Will Advertise Thee

"Advertise" here is an old word meaning to inform or tell.

It has nothing to do with selling, the way the word is used today.

Balaam is about to tell Balak, almost as a parting courtesy, what Israel will do to Moab.

This is one last piece of information before Balaam heads home.

📢 Advertise here means inform or tell

🚫 Not selling, the modern meaning of the word

🎁 Offered almost as a parting courtesy

➡️ One last message before Balaam leaves

---
## 🔮 What This People Shall Do In The Latter Days

"Latter days" points further into the future than anything said so far.

The first three oracles described Israel's blessing happening now.

This next oracle reaches past both Balaam and Balak's own lifetimes.

It marks a real shift toward distant prophecy.

🔮 Latter days points to a more distant future

⏳ Earlier oracles described the present

📆 This one reaches past Balaam's own lifetime

📖 A shift toward distant prophecy

---
## 🗣️ He Hath Said, Which Heard The Words Of God

This opening line repeats the same formula already used in verses three and four.

Balaam names himself the same way, and claims to hear God's words the same way.

Repeating the formula on purpose gives this fourth oracle the same weight as the others.

Nothing about the introduction is thrown together at the last minute.

🗣️ Repeats the formula from verses three and four

🎙️ Gives this oracle the same solemn weight

📜 Nothing here is thrown together

➡️ Prepares the listener for another serious message

---
## 🧠 Knew The Knowledge Of The Most High

This exact phrase is new, it never appeared in the earlier oracles.

It claims an even deeper level of insight into God's own understanding.

That fits an oracle that reaches further into the future than anything said before.

The deeper the reach into time, the deeper the insight needed to see it.

🧠 A new phrase, not used earlier

🔎 Claims deeper insight into God's understanding

⏳ Fits a prophecy reaching further ahead

📖 Deeper reach requires deeper insight

---
## 👁️ I Shall See Him, But Not Now

Balaam is not describing something happening in his own lifetime.

He says plainly that this vision is for later, and far away.

He can see the outcome clearly, even though it will not happen soon.

This distance is part of the point, not a flaw in the vision.

👁️ Balaam sees something far in the future

⏳ Not now, and not nearby

🔭 A distant vision, not a current event

➡️ The distance is part of the prophecy itself

---
## ⭐ There Shall Come A Star Out Of Jacob

A star was a common ancient symbol for a coming king, not a literal star.

Jewish and Christian tradition both read this line as pointing toward a future king.

Centuries later, a star leads wise men to Jesus in Matthew 2.

This is one of the Bible's earliest hints of a promised ruler still to come.

⭐ A star symbolized a coming king

📖 Echoed later by the star in Matthew 2

👑 Points toward a future ruler

➡️ One of the Bible's earliest royal hints

---
## 👑 A Sceptre Shall Rise Out Of Israel

A sceptre is a ruler's staff, a symbol of royal authority.

This line closely matches Jacob's own words over Judah, in Genesis 49:10.

There, the sceptre would not depart from Judah.

Two separate prophecies, spoken years apart, point to the same coming ruler.

👑 A sceptre symbolizes royal authority

📖 Matches Judah's blessing in Genesis 49:10

🔗 Two prophecies point to one ruler

➡️ Later read as pointing toward the Messiah

---
## 💥 Smite The Corners Of Moab

On the historical level, this predicts a future Israelite king defeating Moab.

King David actually does exactly that, later, in 2 Samuel 8:2.

"Children of Sheth" is unclear in meaning.

It may simply be a poetic way of saying all people, or every opponent.

💥 Predicts a future defeat of Moab

📖 Fulfilled by David in 2 Samuel 8:2

❓ Children of Sheth has unclear meaning

➡️ Possibly a poetic phrase for all opponents

---
## 🏔️ Edom Shall Be A Possession, Seir Also

Edom and Seir both refer to the same people, the descendants of Esau.

Esau was Jacob's brother.

They lived southeast of the Dead Sea, in the territory later called Edom.

This prophecy also gets fulfilled, when David conquers Edom in 2 Samuel 8:14.

🏔️ Edom and Seir both mean Esau's descendants

🗺️ Their land sat southeast of the Dead Sea

📖 Fulfilled when David conquers Edom

➡️ Another nation placed under the coming king

---
## ⚔️ Israel Shall Do Valiantly

This line is short, but it states the outcome plainly.

Israel will not just survive these coming conflicts.

The oracle keeps circling back to the same theme.

Strength comes from God, not from Israel's own size or skill.

⚔️ Valiantly means acting with courage and success

💪 Israel's strength is credited to God

🔁 The oracle repeats this theme throughout

📖 Confidence here rests on God's promise

---
## 👑 Out Of Jacob Shall Come He That Shall Have Dominion

This line restates the star and sceptre image from verse seventeen.

Now it is said in plainer language.

"Dominion" means real ruling authority, not just fame or popularity.

The oracle circles back to its central point one more time before it ends.

👑 Restates the star and sceptre from verse 17

⚖️ Dominion means real ruling authority

🔁 The oracle's central point, repeated

📖 The whole point of this oracle

---
## 🏙️ Destroy Him That Remaineth Of The City

"Him that remaineth" points to whatever survivors are left after a city falls.

This line pictures a complete victory, with no escape for the losing side.

It closes the fourth oracle on the same note as the rest of it.

Total and final victory belongs to the coming king.

🏙️ Remaineth means whatever survivors are left

🏳️ Pictures a complete, final victory

🔚 Closes the oracle on total victory

📖 Nothing about this promise is left unfinished

---
# Numbers 24:20-24
# 🌊 Oracles Against Amalek And The Nations Beyond
---
## ⚔️ Amalek Was The First Of The Nations

Amalek was the very first nation to attack Israel after they left Egypt.

That ambush happened at Rephidim, recorded back in Exodus 17.

This short oracle marks Amalek's long history as Israel's oldest enemy.

The rivalry did not start here, it started decades earlier.

⚔️ The first nation to attack Israel after Exodus

📖 That ambush happened in Exodus 17

🕰️ Marks Amalek as Israel's oldest enemy

➡️ A short oracle covering a very old conflict

---
## 💀 His Latter End Shall Be That He Perish For Ever

This is a prediction of Amalek's complete, final destruction.

It does not happen all at once.

King Saul fights Amalek generations later, in 1 Samuel 15.

Even later, Haman, a descendant of an Amalekite king, is defeated in the book of Esther.

💀 Predicts Amalek's total destruction

📖 Fulfilled partly through Saul in 1 Samuel 15

👤 Continues through Haman in Esther

➡️ One verse covering centuries of conflict

---
## 👀 He Looked On The Kenites

The Kenites were a nomadic people connected to Jethro, Moses' father in law.

They were already introduced as allies of Israel, back in Numbers 10:29.

Balaam now turns his gaze toward this smaller, friendly nation.

Even Israel's allies get a place in this string of oracles.

👀 The Kenites were connected to Jethro

🤝 Already introduced as allies in Numbers 10:29

🏕️ A nomadic, friendly nation

📖 Even friends of Israel appear in this oracle

---
## 🏔️ Strong Is Thy Dwellingplace, Thou Puttest Thy Nest In A Rock

This line pictures the Kenites' homes built into mountain cliffs.

"Nest in a rock" describes a location hard for enemies to reach.

Their homes were genuinely strong by the standards of the day.

That strength becomes important in the very next line.

🏔️ Nest in a rock means a mountain home

🛡️ Their homes were naturally defensible

💪 A real, physical strength

➡️ That strength gets tested next

---
## 🏹 The Kenite Shall Be Wasted, Until Asshur Carry Thee Away Captive

Even a well defended, friendly people does not escape history forever.

"Asshur" is Assyria, a regional power not yet risen when Balaam speaks.

This line foreshadows the Assyrian conquests recorded later, in 2 Kings 17.

Strong walls could not stop what was still generations away.

🏹 Even defended peoples are not exempt

🌍 Asshur is Assyria, a future superpower

📖 Foreshadows the conquests of 2 Kings 17

➡️ Strong walls could not stop this outcome

---
## 😨 Alas, Who Shall Live When God Doeth This

For a moment, Balaam breaks out of formal oracle language completely.

He reacts personally, with a real exclamation of dread.

The scale of what he is seeing unfold across future history genuinely shakes him.

Even the prophet speaking these words is not unaffected by them.

😨 A rare personal reaction breaks the formal style

😳 Shows real dread, not detached prophecy

⏳ The scale of future history is overwhelming

📖 Even the prophet is shaken here

---
## 🚢 Ships Shall Come From The Coast Of Chittim

Chittim refers to Cyprus and the wider Mediterranean coastlands.

This oracle now reaches further than any of the other three.

Many read it as pointing ahead to Greek and later Roman power.

That power would rise over this whole region centuries after Balaam's own lifetime.

🚢 Chittim means Cyprus and the Mediterranean coast

🏛️ Likely points to Greek and Roman power

⏳ Centuries beyond Balaam's own lifetime

📖 The furthest reaching oracle in the sequence

---
## 🌍 Shall Afflict Asshur, And Shall Afflict Eber

Even mighty Assyria eventually falls under this same widening judgment.

"Eber" likely refers to a broader group of Mesopotamian peoples.

Some scholars connect the name to the word Hebrew.

The oracle keeps widening its lens instead of narrowing it.

🌍 Asshur and Eber both fall under judgment

❓ Eber's exact identity is unclear

🔗 Possibly connected to the word Hebrew

📖 The oracle widens instead of narrowing

---
## ♾️ He Also Shall Perish For Ever

This exact phrase already closed the oracle about Amalek, back in verse twenty.

Using it again here ties both oracles together with the same final note.

Nothing that opposes God's plan lasts, no matter how strong it becomes.

The chapter's final oracles all land on this same conclusion.

♾️ Repeats the same phrase from verse twenty

🔗 Ties both oracles to one ending

🚫 Nothing opposing God's plan lasts

📖 Every oracle in this chapter lands here

---
# Numbers 24:25
# 🚶 Two Men Go Their Separate Ways
---
## 🚶 Balaam Rose Up, And Went And Returned To His Place

After four oracles stretching centuries into the future, the story ends quietly.

Balaam simply leaves, with no dramatic final scene.

This is not the last time the Bible mentions him.

He reappears fighting against Israel in Numbers 31:8, and is later called a warning in 2 Peter 2:15.

🚶 An unusually quiet, ordinary ending

📖 He reappears later in Numbers 31:8

⚠️ Remembered as a warning in 2 Peter 2:15

➡️ A huge prophecy ends on a small sentence

---
## 🏰 Balak Also Went His Way

Balak's story closes in complete defeat.

Three separate locations, three sets of seven altars, fourteen animals offered each time.

None of it changed the outcome even slightly.

Everything Balak spent turned out to be for nothing.

🏰 Three locations, three rituals, one result

💸 A massive effort that changed nothing

🚫 Ritual could not override God's decision

📖 Confirms what verse nine already said
`.trim();

export const NUMBERS_TWENTY_FOUR_PERSONAL_SECTIONS = parseNumbersTwentyFourRawNotes(NUMBERS_TWENTY_FOUR_RAW_NOTES);
