export type DanielTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDanielTwoRawNotes(rawText: string): DanielTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DanielTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Daniel\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Daniel 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Daniel\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Daniel\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Daniel 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Daniel 2:${startVerse}` : `Daniel 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Daniel 2 sections, received " + sections.length);
  }

  return sections;
}

const DANIEL_TWO_RAW_NOTES = `# Daniel 2:1-3
# 👑 Nebuchadnezzar's Troubled Sleep
---
## 📅 In The Second Year Of The Reign Of Nebuchadnezzar

Daniel chapter one already described three full years of training for Daniel and his friends.

This verse places the king's dream in only the second year of his reign.

Babylon counted a king's first partial year differently from his later full years.

The two timelines fit together once that counting method is understood.

📅 Second year of Nebuchadnezzar's reign

📚 Chapter one covered three training years

🔄 Babylon counted reign years differently

📖 The two timelines still agree

---

## 💤 Nebuchadnezzar Dreamed Dreams

The plural word "dreams" describes one single dream told twice for emphasis.

Hebrew and Aramaic writers often repeated a word like this to show real weight.

This was not several different dreams in one night.

It was one unforgettable dream that struck the king hard.

💤 Dreams means one retold dream

🔁 Repetition shows real weight

🌙 Only one dream occurred

➡️ The dream shook the king deeply

---

## 😨 His Spirit Was Troubled, And His Sleep Brake From Him

"Brake" is the old King James form of the word broke.

The king was more than annoyed, he was genuinely afraid.

Fear pulled him fully awake in the middle of the night.

A troubled spirit here means real inner dread, not simple worry.

😨 Brake means broke in old English

💔 Troubled spirit means real dread

🌙 Fear woke him in the night

📖 This fear ran deeper than worry

---

## 🔮 The Magicians, And The Astrologers, And The Sorcerers, And The Chaldeans

Babylon kept four separate classes of occult advisers on staff.

Magicians practiced charms and spells.

Astrologers studied the stars and skies for hidden omens.

Sorcerers claimed power over spirits and unseen forces.

Chaldeans were the elite scholar class trained in all of this learning together.

🔮 Magicians practiced charms and spells

⭐ Astrologers read the stars for omens

👁️ Sorcerers claimed power over spirits

📖 Chaldeans were the trained scholar class

---

## 🗣️ For To Shew The King His Dreams

"Shew" is the King James spelling of the word show.

The king summoned his whole occult staff for one simple task.

He wanted them to recount the actual dream itself, not just explain it.

That detail becomes the real test later in the chapter.

🗣️ Shew means show

📋 One task, the whole staff summoned

🎯 He wanted the dream recounted

➡️ That detail becomes the real test

---

## 💭 My Spirit Was Troubled To Know The Dream

The king does not yet admit that he has forgotten the dream itself.

He only says here that he wants to understand what it meant.

The missing piece becomes clear just one verse later.

This small detail sets up the real crisis of the whole chapter.

💭 The king hides a bigger problem

🧩 A missing piece is coming

⏳ It surfaces in the very next verse

📖 This detail drives the whole chapter

# Daniel 2:4-6
# 🗣️ The King's Impossible Demand
---
## 📜 To The King In Syriack

"Syriack" is the Aramaic language used in official Babylonian court business.

Starting at this verse, the book of Daniel itself switches into Aramaic.

It stays in that language all the way through chapter seven.

The shift in language matches a shift toward Gentile world events.

📜 Syriack means Aramaic

🏛️ The court used it for official business

🔀 Daniel's own text switches language here

📖 The switch matches a shift to Gentile history

---

## 👑 O King, Live For Ever

This greeting was the standard way to address a reigning king.

It functioned like a formal title, not a genuine wish for eternal life.

Every speaker in this scene would have opened with it out of custom.

The Chaldeans use it here before admitting they cannot actually help him.

👑 A standard royal greeting

🎭 Not a literal wish for eternity

📋 Required court custom

➡️ Formality came before any real answer

---

## 😔 The Thing Is Gone From Me

Here the king finally reveals the real problem.

He has not just forgotten the meaning of the dream.

He has forgotten the dream itself completely.

This makes the test far harder than a normal request for interpretation.

😔 The king forgot the dream itself

🧩 Not just the meaning, the memory

⚠️ This makes the test far harder

📖 No ordinary skill could pass this test

---

## ⚔️ Cut In Pieces, And Your Houses Shall Be Made A Dunghill

This threat describes execution followed by total public disgrace.

A "dunghill" was a heap of waste and rubbish outside a city.

Turning a family's house into one erased their name and memory completely.

The king is not bluffing, he is naming the exact cost of failure.

⚔️ Cut in pieces means execution

🗑️ Dunghill means a waste heap

👪 Whole households faced ruin too

📖 Failure carried total, public cost

---

## 🎁 Gifts And Rewards And Great Honour

The king offers the opposite outcome if the wise men succeed.

Wealth, status, and public praise sat on one side of the scale.

Death and disgrace sat on the other.

No middle option was offered to anyone in the room.

🎁 Success promised wealth and honour

⚖️ Failure promised death and shame

🚫 No safe middle option existed

➡️ Everything rode on one impossible task

# Daniel 2:7-11
# 😨 The Wise Men Admit Defeat
---
## ⏳ Ye Would Gain The Time

The king accuses his wise men of stalling on purpose.

He believes they are hoping he will eventually just explain the dream himself.

Buying time was a common trick when a real answer was impossible.

The king refuses to let that trick work on him.

⏳ The king suspects deliberate stalling

🎭 Stalling was a common trick

🚫 He refuses to be tricked

📖 He sees through the delay

---

## 🤥 Prepared Lying And Corrupt Words

The king assumes his wise men plan to simply make something up.

A false interpretation would be easy to produce if only the meaning were asked for.

Requiring the dream itself first closes off that entire shortcut.

This single demand exposes their real limits almost immediately.

🤥 A false meaning would be easy

🔒 Requiring the dream closes that shortcut

⚠️ Their real limits are exposed

📖 The demand leaves no room to fake

---

## 🌍 There Is Not A Man Upon The Earth That Can Shew

The wise men finally admit the plain truth out loud.

No human being anywhere could do what the king is asking.

This is the first honest sentence spoken in the whole scene.

Their confession sets up exactly what Daniel will later show is possible.

🌍 No human anywhere could do this

🗣️ Their first honest admission

🚫 The whole class failed together

➡️ Daniel will prove it is possible

---

## 👑 No King, Lord, Nor Ruler, That Asked Such Things

The wise men claim this request has never been made of anyone before.

Normally a king only asked for a dream's meaning, already knowing the dream.

Nebuchadnezzar is asking for something no ruler in history required.

That makes their failure look less shameful in their own eyes.

👑 No ruler ever demanded this before

📜 Kings normally already knew the dream

🆕 This request was truly unheard of

➡️ They excuse their failure as unfair

---

## ✨ Except The Gods, Whose Dwelling Is Not With Flesh

The wise men admit only a god could reveal this secret.

They believe their own gods live far away from human life.

That admission is more true than they realize.

A God who is not flesh is about to answer through a man who is.

✨ Only a god could reveal this

🏛️ Their gods seem distant from humans

😮 They admit more than they know

📖 The true God will answer through a man

# Daniel 2:12-16
# ⚔️ The Decree To Slay The Wise Men
---
## 😡 Angry And Very Furious

The king's anger is described twice in a row for emphasis.

This was not simple annoyance, it was blind rage.

A ruler with total power acting out of blind rage is dangerous for everyone nearby.

😡 Anger is named twice for emphasis

🔥 This was blind rage, not annoyance

⚠️ Total power made the rage dangerous

➡️ Everyone nearby was now at risk

---

## ☠️ Commanded To Destroy All The Wise Men Of Babylon

The death sentence covers the entire occult class, not only the men who spoke.

Daniel and his three friends belonged to that same trained class from chapter one.

They were never even called into the king's presence for this test.

A decree aimed at others is about to reach Daniel by accident.

☠️ The decree covers the whole class

🎓 Daniel's group belonged to that class

🚫 They were never even questioned

➡️ Danger reached them without warning

---

## 👤 Arioch The Captain Of The King's Guard

Arioch held command over the soldiers who carried out royal executions.

He is the man given the task of killing every wise man in Babylon.

Daniel approaches the very officer holding that order in his hand.

👤 Arioch commanded the royal executioners

🗡️ He held the kill order itself

🚶 Daniel walks straight toward him

➡️ Daniel faces the danger directly

---

## 🧠 Daniel Answered With Counsel And Wisdom

Daniel does not panic or argue when he hears the news.

He responds with calm, careful words instead of fear.

That composure is what gives Arioch a reason to actually listen.

🧠 Daniel stays calm under threat

🗣️ Careful words replace panic

👂 Calm words earn a real hearing

📖 Composure opened the door to mercy

---

## ⏳ Desired Of The King That He Would Give Him Time

Daniel requests a delay directly from the king himself.

This took real courage, since the king had just threatened everyone with death.

Daniel's earlier favor with the court, built back in chapter one, makes this access possible.

⏳ Daniel asks the king for time

😨 This request took real courage

🤝 Earlier favor made the access possible

📖 Past faithfulness opened today's door

# Daniel 2:17-19
# 🙏 A Prayer For Mercy
---
## 🏠 Made The Thing Known To Hananiah, Mishael, And Azariah

These are the same three friends renamed Shadrach, Meshach, and Abednego in chapter one.

Daniel does not face this crisis alone.

He brings his closest companions into it immediately.

🏠 Same three friends from chapter one

🤝 Daniel refuses to face this alone

👥 He brings them in immediately

➡️ Shared crisis called for shared prayer

---

## 🙏 Desire Mercies Of The God Of Heaven

"The God of heaven" is a title used often in Babylon's foreign setting.

It sets Israel's God apart clearly from Babylon's many local gods.

The four friends ask together for mercy, not for cleverness.

🙏 God of heaven sets Him apart

🌍 Used often in this foreign setting

🤲 They ask for mercy, not skill

📖 Mercy was the real request

---

## 🌙 Revealed Unto Daniel In A Night Vision

God answers through a vision while Daniel sleeps.

This matches the same way God spoke to Daniel back in chapter one.

The secret that defeated every wise man in Babylon comes freely once God gives it.

🌙 God answers through a night vision

🔁 This matches Daniel's gift from chapter one

🎁 The secret came freely from God

➡️ No skill could have earned it

---

## 🙌 Daniel Blessed The God Of Heaven

Daniel's very first response to the answered prayer is worship.

He does not run to tell the king right away.

He stops to thank God before doing anything else.

🙌 Worship comes before any action

🛑 Daniel pauses before running to the king

🙏 Gratitude comes first, every time

📖 Worship led, the rest followed

# Daniel 2:20-23
# 📖 Daniel's Prayer Of Praise
---
## ⏳ He Changeth The Times And The Seasons

Daniel praises God for controlling history itself, not just this one dream.

Seasons and set times are not random, they move under God's hand.

This single line prepares the reader for the dream's whole meaning.

⏳ God controls history's timing

🌗 Seasons move under His hand

🧭 Nothing in time is random

📖 This sets up the dream's full meaning

---

## 👑 He Removeth Kings, And Setteth Up Kings

This directly echoes what Daniel chapter one already showed, God gave Jehoiakim into Babylon's hand.

Nebuchadnezzar's whole empire exists only because God allowed it.

The king who holds Daniel's life in his hands answers to someone greater.

👑 Kings rise and fall under God

🔁 This echoes chapter one's lesson

🏛️ Babylon's empire exists by God's choice

➡️ The king himself answers to God

---

## 🌑 He Revealeth The Deep And Secret Things

Babylon's whole occult class failed to produce one true secret.

Daniel contrasts their failure with what the real God can do with ease.

"The light dwelleth with him" means nothing is hidden from God, ever.

🌑 God reveals what no one else can

🔮 This contrasts Babylon's failed occult class

💡 Light dwelling with Him means nothing hides

📖 God's knowledge has no limit

---

## 🙏 O Thou God Of My Fathers

Daniel calls God the God of his fathers, not a God he discovered on his own.

His faith was inherited from Abraham, Isaac, and generations before him.

Living in exile never broke that family line of belief.

🙏 Daniel's faith was inherited, not new

📜 It traces back through his fathers

🌍 Exile never broke that family line

📖 Faith carried through the generations

# Daniel 2:24-30
# 👑 Daniel Stands Before The King
---
## 🙅 Destroy Not The Wise Men Of Babylon

Daniel's very first words to Arioch ask for other lives to be spared.

He could have simply saved himself and let the rest die.

Instead he stops the whole execution before even seeing the king.

🙅 Daniel pleads for the others first

💔 He could have saved only himself

🛑 He halts the whole execution

➡️ Mercy came before his own safety

---

## ⛓️ I Have Found A Man Of The Captives Of Judah

Arioch introduces Daniel to the king by his lowest possible status.

"Captives of Judah" reminds everyone that Daniel is a conquered foreigner, not a Babylonian noble.

God is about to use exactly that overlooked status to reveal His power.

⛓️ Daniel is introduced as a captive

🏛️ Not a noble, a conquered foreigner

👑 Low status hid real purpose

📖 God uses the overlooked for great things

---

## 🔮 The Soothsayers

"Soothsayers" is a new term added to the list of occult advisers already named earlier.

They claimed to predict the future through omens and hidden signs.

Every title in this growing list has already failed the exact same test.

🔮 Soothsayers predicted the future by omens

📋 A new name added to the list

🚫 Every title here already failed

➡️ Daniel stands apart from all of them

---

## 🙌 There Is A God In Heaven That Revealeth Secrets

Daniel is asked directly if he can do what no one else could.

His very first words give the credit away immediately.

He refuses to let the king think this is his own skill.

🙌 Daniel gives credit away immediately

🚫 He refuses to claim personal skill

🗣️ His very first words name God

📖 Credit went to God before anything else

---

## 📜 What Shall Be In The Latter Days

"The latter days" is a phrase pointing toward future events still to come.

Daniel tells the king his dream is not only about Babylon's own time.

It reaches forward into history that had not happened yet.

📜 Latter days points to future events

🔭 The dream reaches beyond Babylon's time

🧭 It stretches into history not yet lived

📖 God already saw what was coming

---

## 🙏 Not For Any Wisdom That I Have More Than Any Living

Daniel repeats the same humility he already showed earlier in the chapter.

He insists this answer did not come from being smarter than anyone else.

He wants the king to understand the thoughts of his own heart, not just admire Daniel.

🙏 Daniel denies any personal advantage

🧠 Not wisdom, but a gift received

👑 The king's own heart is the real point

➡️ The message mattered more than the messenger

# Daniel 2:31-35
# 🗿 The Dream Of The Great Image
---
## 😮 The Form Thereof Was Terrible

"Terrible" here means awe inspiring and frightening, not simply unpleasant.

The king saw a towering human shaped statue unlike anything built by human hands.

Its sheer size and brightness alone were enough to leave him shaken.

😮 Terrible means awe inspiring and frightening

🗿 A towering human shaped statue

✨ Its brightness alone was overwhelming

➡️ The king was shaken immediately

---

## 🥇 This Image's Head Was Of Fine Gold

The statue is made of four different metals from top to bottom.

Gold sits at the very top, the most valuable metal of the four.

What each metal represents is explained plainly later in this same chapter.

🥇 Gold forms the very top

🏗️ Four metals build the whole image

📉 Value decreases moving downward

➡️ The meaning comes later in the chapter

---

## 🦵 His Legs Of Iron, His Feet Part Of Iron And Part Of Clay

The image grows weaker and more mixed the further down it goes.

Iron is strong, but clay is brittle and crumbles easily.

Combining them in one pair of feet makes the whole statue unstable at its base.

🦵 The statue weakens near the bottom

🛡️ Iron is strong on its own

🏺 Clay is brittle and crumbles

📖 A mixed base cannot stay stable

---

## 🪨 A Stone Was Cut Out Without Hands

"Without hands" means no human being carved or shaped this stone.

Every other part of this vision was built, carried, or worn by people.

This one object comes from somewhere else entirely.

🪨 Without hands means no human carved it

👐 Everything else in the vision was human made

✨ This object comes from elsewhere

➡️ Something greater is about to arrive

---

## 🌬️ Became Like The Chaff Of The Summer Threshingfloors

A "threshingfloor" was the flat ground where grain was separated from its outer husk.

"Chaff" is that leftover husk, light enough for wind to blow completely away.

The entire mighty statue is reduced to something a breeze can scatter in an instant.

🌬️ Chaff means the light leftover husk

🏚️ Threshingfloor is where grain was separated

💨 Wind scatters it completely away

📖 Mighty things can vanish that fast

# Daniel 2:36-43
# 📜 The Interpretation Of The Kingdoms
---
## 👑 A King Of Kings

This title here simply means a king with authority over other lesser kings.

It does not carry the same meaning as its later use for Jesus in the New Testament.

Nebuchadnezzar ruled over many smaller kings and territories under Babylon's control.

👑 A king who rules over other kings

🏛️ Nebuchadnezzar ruled many lesser kings

📖 Different from its later New Testament use

➡️ Human greatness still answers to God

---

## 🥇 Thou Art This Head Of Gold

Daniel identifies the first metal plainly, Babylon itself.

Gold's high value matches Babylon's own wealth and world power at its peak.

Nebuchadnezzar personally stands at the very top of this entire vision.

🥇 Gold represents Babylon itself

💰 Gold matches Babylon's real wealth

👑 Nebuchadnezzar stands at the very top

📖 Every empire still has an end

---

## 🥈 Another Kingdom Inferior To Thee

Many scholars believe this second kingdom points to the Medes and Persians.

"Inferior" does not mean weaker in battle, it means lower in this ranking of metals.

Each kingdom after Babylon will rule a wider stretch of the earth.

🥈 Many see this as Medo Persia

📉 Inferior means lower, not weaker

🗺️ Later kingdoms covered more territory

➡️ Empires keep rising after Babylon falls

---

## 🥉 Another Third Kingdom Of Brass

Many scholars believe this third kingdom points forward to Greece.

Brass was prized for weapons and armor across the ancient world.

This kingdom is said to bear rule over the whole earth, wider than Babylon ever had.

🥉 Many see this as Greece

⚔️ Brass was common for weapons and armor

🌍 Its reach covers the whole earth

📖 Each empire grows wider than the last

---

## 🦾 The Fourth Kingdom Shall Be Strong As Iron

Many scholars believe this fourth kingdom points forward to Rome.

Iron breaks apart everything weaker than itself without much effort.

This empire is described as the most crushing power of the four.

🦾 Many see this as Rome

🔨 Iron crushes everything weaker

💥 The most crushing of the four

➡️ Strength alone still cannot last forever

---

## 🏺 Iron Mixed With Miry Clay

"Miry" means soft, wet, and unstable, the opposite of solid ground.

The final kingdom keeps some of iron's strength but adds real weakness at its base.

A kingdom built this way can look strong while already cracking apart inside.

🏺 Miry means soft and unstable

🔨 Some iron strength still remains

💔 Real weakness hides inside the structure

📖 Strength and weakness can exist together

---

## 🤝 They Shall Mingle Themselves With The Seed Of Men

This describes rulers trying to unite through marriages and political alliances.

"Seed of men" refers to descendants joined together across different family lines.

Iron and clay never truly bond, no matter how hard anyone tries to mix them.

🤝 Mingling describes alliances and marriages

👪 Seed of men means family lines joined

🚫 Iron and clay never truly bond

➡️ Political unity could not hold together

# Daniel 2:44-45
# ⛰️ The Everlasting Kingdom
---
## ⛰️ A Kingdom, Which Shall Never Be Destroyed

God was never absent from this vision, even in its final line.

Every human kingdom in the statue eventually breaks apart and fades away.

God's own kingdom is the only part of the vision built to last forever.

⛰️ God's kingdom never gets destroyed

📉 Every human kingdom eventually fades

🏗️ Only this kingdom was built to last

📖 God's rule outlasts every empire

---

## 💥 It Shall Break In Pieces And Consume All These Kingdoms

The small stone from earlier in the vision grows into a mountain filling the whole earth.

It does not simply sit beside the other kingdoms, it replaces them completely.

No empire that came before it survives once this kingdom arrives.

💥 The stone grows into a mountain

🌍 It fills the whole earth

🚫 It replaces every earlier kingdom

➡️ Nothing before it is left standing

---

## ✅ The Dream Is Certain, And The Interpretation Thereof Sure

Daniel closes his explanation with total confidence, not a careful guess.

Both words, "certain" and "sure," say the same thing twice for emphasis.

This double assurance matters, since the king's whole life depends on trusting it.

✅ Certain and sure repeat for emphasis

🎯 Daniel speaks with total confidence

⚖️ The king's life depended on trusting it

📖 God's revealed truth needs no hedging

# Daniel 2:46-49
# 🙌 Daniel's Reward
---
## 🙇 Fell Upon His Face, And Worshipped Daniel

Nebuchadnezzar reacts to the dream's answer by bowing to the man, not only to God.

This does not mean the king suddenly abandoned every other god he believed in.

His next words still credit Daniel's God, even while his actions honor Daniel himself.

🙇 The king bows to the man

⚠️ His worship is misdirected here

🗣️ His words still credit God

📖 Actions and words did not fully match

---

## 🔥 Offer An Oblation And Sweet Odours Unto Him

An "oblation" is a formal offering, often grain or drink, given in worship.

"Sweet odours" refers to burning incense as part of that same offering.

These are the exact actions normally reserved for worshiping a god, not a man.

🔥 Oblation means a formal worship offering

🌿 Sweet odours means burning incense

🙇 These acts belonged to worship

➡️ The king crossed a line without realizing it

---

## 🙌 A God Of Gods, And A Lord Of Kings

The king openly admits Daniel's God is greater than every god he already serves.

This is real, genuine praise, even though it falls short of full devotion.

A pagan king still ends up proclaiming the truth about the true God.

🙌 Nebuchadnezzar admits God's greatness

🏛️ He still keeps his other gods

🗣️ His words proclaim real truth

📖 Even a pagan king spoke truth

---

## 🏛️ Ruler Over The Whole Province Of Babylon

Daniel moves from condemned captive to powerful ruler in a single day.

This exact promotion matters later, once Daniel's authority carries weight across future chapters.

God is building Daniel's future long before Daniel understands why it matters.

🏛️ Daniel rises from captive to ruler

📈 This happens within a single day

🔮 His authority matters in later chapters

➡️ God was already shaping Daniel's future

---

## 🤝 He Set Shadrach, Meshach, And Abednego, Over The Affairs

Daniel does not keep this reward only for himself.

He shares real authority with the same three friends who prayed with him.

Their names return here using the Babylonian names first given back in chapter one.

🤝 Daniel shares the reward with friends

🙏 These are the friends who prayed with him

📛 Their Babylonian names appear here again

📖 Shared faithfulness brought shared reward

---

## 🚪 Daniel Sat In The Gate Of The King

"The gate" was not just a doorway, it was where legal and civic decisions were made.

Sitting there meant Daniel held real judicial authority inside the empire.

A captive brought in to possibly die now sits in a seat of real power.

🚪 The gate was a seat of judgment

⚖️ Daniel held real legal authority

🔁 He went from prisoner to judge

📖 God turned the whole story around
`.trim();

export const DANIEL_TWO_PERSONAL_SECTIONS = parseDanielTwoRawNotes(DANIEL_TWO_RAW_NOTES);
