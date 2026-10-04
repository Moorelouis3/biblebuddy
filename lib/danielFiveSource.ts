export type DanielFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDanielFiveRawNotes(rawText: string): DanielFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DanielFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Daniel\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Daniel 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Daniel\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Daniel\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Daniel 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Daniel 5:${startVerse}` : `Daniel 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Daniel 5 sections, received " + sections.length);
  }

  return sections;
}

const DANIEL_FIVE_RAW_NOTES = `# Daniel 5:1-4
# 🍷 Belshazzar's Reckless Feast
---
## 🍷 Made A Great Feast To A Thousand Of His Lords

A feast this size was a massive show of wealth and power.

A thousand lords eating together in one room was rare even for a king.

Babylon was under siege from a Persian army at this very moment.

Many historians believe Belshazzar threw this party to prove he still felt safe.

That kind of confidence was about to prove completely wrong.

🍷 A feast showed off royal power

⚔️ A Persian army surrounded the city

😤 Belshazzar still felt completely untouchable

➡️ His confidence was about to collapse

## 🍾 Whiles He Tasted The Wine

This detail pins down exactly when Belshazzar gave the order.

He was already drinking when the idea came to him.

This was not a planned decision made with sober judgment.

Wine had already loosened whatever restraint might have stopped him otherwise.

A moment of drunken pride is about to trigger real consequences.

🍷 Belshazzar was already drinking wine

💭 The idea came in that moment

🚫 This was not a sober decision

➡️ Drunken pride triggered real consequences

## 👑 His Father Nebuchadnezzar Had Taken Out Of The Temple

Nebuchadnezzar was not literally Belshazzar's father.

The word father was often used in this culture for an ancestor or a former ruler.

Belshazzar actually ruled as co regent under his own father, King Nabonidus.

Calling Nebuchadnezzar his father still linked him to Babylon's most famous king.

These golden vessels had been carried off from Jerusalem many years before.

Daniel chapter one already told how Nebuchadnezzar brought these very vessels to Babylon.

👑 Father often meant ancestor or ruler

🏛️ Nabonidus was Belshazzar's actual father

🏺 The vessels were taken years earlier

📖 Daniel chapter one already introduced them

## 🕍 The Temple Which Was In Jerusalem

This temple was the one Solomon built for the Lord in Jerusalem.

It was the most sacred building in the whole nation of Israel.

Nebuchadnezzar had destroyed the city and carried off its treasures years before.

These particular vessels had sat untouched in a Babylonian storehouse ever since.

Taking them out now was not a small decision.

🕍 Solomon built this temple for God

🏚️ Babylon destroyed it years earlier

📦 The vessels sat unused since then

➡️ Using them now was a deliberate choice

## 🍷 That The King, And His Princes, His Wives, And His Concubines, Might Drink Therein

Princes were the nobles and officials closest to the king.

Wives held an official, recognized place in the royal household.

Concubines held a lower, secondary status but still belonged to that household.

Every rank of Belshazzar's court was included in this one act.

The whole palace was about to share in the same sacrilege.

👑 Princes were the king's top officials

👰 Wives held an official royal status

💍 Concubines held a lower status

➡️ Everyone in the palace joined in

## 🍷 Drank In Them

Verse two already said this exact command was given.

Verse three repeats it again as something that actually happened.

Old Testament narration often states a command, then confirms it was obeyed.

That pattern makes the obedience to Belshazzar's order unmistakable.

Nobody in that room refused to take part.

📜 Verse two gave the command

✅ Verse three shows it carried out

🔁 This pattern confirms real obedience

➡️ Nobody in the room refused

## 🙏 Praised The Gods Of Gold, And Of Silver, Of Brass, Of Iron, Of Wood, And Of Stone

Each material named a different kind of idol found across the empire.

Gold and silver idols were costly, carved for wealthy households and temples.

Brass, iron, wood, and stone idols were cheaper, common versions of the same thing.

Every idol listed here was lifeless material shaped by human hands.

Daniel will repeat this exact list later to make one sharp point.

🥇 Gold and silver idols were costly

🪵 Wood and stone idols were common

🙏 All of them were lifeless objects

📖 Daniel repeats this list again later

# Daniel 5:5-9
# ✍️ The Writing On The Wall
---
## ✍️ Fingers Of A Man's Hand

No body, arm, or person appeared, only fingers writing by themselves.

This made the moment instantly unnatural and impossible to explain away.

A hand with no body is one of the most unsettling images in the whole book.

Everyone in that hall would have recognized this as something supernatural immediately.

✍️ Only fingers appeared, no full body

😨 This was instantly unnatural to see

👀 Nobody could explain it away

➡️ Everyone recognized this as supernatural

## 🕯️ Over Against The Candlestick

A candlestick here means a tall lampstand that lit the room.

The writing appeared directly across from that light on purpose.

That placement made sure every single person could see it clearly.

Nothing about this message was meant to stay hidden or private.

🕯️ Candlestick means a tall lampstand

💡 It lit the exact wall used

👀 Everyone in the room could see

➡️ This message was never meant to be hidden

## 🧱 Upon The Plaister Of The Wall

Plaister is an old spelling of plaster, a smooth coating over stone or brick.

Palace walls were often plastered white, which made writing on them easy to see.

A plain, pale wall became the perfect surface for this message.

The ordinary wall of the party room turned into something terrifying.

🧱 Plaister means plaster on the wall

⚪ Palace walls were smooth and pale

📝 That surface made the writing visible

➡️ An ordinary wall turned terrifying

## 😨 The King's Countenance Was Changed

Countenance means the look or expression on someone's face.

Belshazzar's face instantly showed the fear he could not hide.

His confident, drunken mood from the feast disappeared in a moment.

No one needed him to say a word to know something was wrong.

😨 Countenance means the look on a face

😳 Fear replaced his confident mood

⚡ The change happened instantly

➡️ His face spoke before he could

## 🦵 The Joints Of His Loins Were Loosed

This is an old, graphic way of describing complete physical terror.

His legs weakened so badly he could barely stand upright.

His knees knocked together, a detail used nowhere else this vividly in the Bible.

A king who ruled a feast moments earlier now could hardly stand on his own.

🦵 His legs weakened from pure fear

🦶 His knees physically knocked together

😱 This describes complete physical terror

➡️ The king could barely stand

## 🧙 The Astrologers, The Chaldeans, And The Soothsayers

Astrologers studied the stars and planets to predict events.

Chaldeans here refers to a trained class of Babylonian priests and scholars.

Soothsayers claimed to see hidden meanings through omens and signs.

Babylon relied on all three groups together for this kind of emergency.

⭐ Astrologers studied the stars

📚 Chaldeans were trained priest scholars

🔮 Soothsayers read omens and signs

➡️ Babylon leaned on all three groups

## 👑 Clothed With Scarlet, And Have A Chain Of Gold About His Neck

Scarlet was an expensive dye reserved for royalty and high officials.

Wearing it in public marked a person as someone of real importance.

A gold chain was a visible badge of high office, not just jewelry.

Joseph received almost this same honor centuries earlier in Egypt.

👑 Scarlet marked true royal status

⛓️ The chain showed real authority

💰 Both were expensive, visible symbols

📖 Joseph once received a similar honor

## 🥉 The Third Ruler In The Kingdom

This reward sounds strange, since third place is an odd prize to offer.

Belshazzar could not offer first place because his father Nabonidus still held it.

Belshazzar himself already held the second position as co regent.

Third place was genuinely the highest reward he had the power to give.

🥉 Third was the highest open rank

👑 Nabonidus still held first place

🤝 Belshazzar already held second place

📖 This detail matches real history closely

## ❌ They Could Not Read The Writing

Babylon's entire professional class of wise men failed completely.

None of them could even read the words, let alone explain them.

This same failure happened once before under Nebuchadnezzar in an earlier chapter.

Human wisdom kept running into the exact same wall.

❌ The wise men could not read it

🔁 This mirrors an earlier chapter's failure

🧠 Human wisdom reached its limit

📖 Only God's wisdom could solve this

## 😧 His Lords Were Astonied

Astonied is an old word meaning shocked or stunned into silence.

The fear in that room was no longer just the king's problem.

Every noble who had just been praising idols now sat in terror.

The whole feast had turned from celebration to dread in moments.

😧 Astonied means stunned into silence

👥 Fear spread to all the lords

🍷 The feast turned to dread

➡️ Nobody there felt safe anymore

# Daniel 5:10-12
# 👸 The Queen Remembers Daniel
---
## 👸 The Queen

This queen was likely not one of the wives already at the feast.

Verses two and three already mention wives and concubines who were present.

Many scholars believe this was the queen mother, Belshazzar's mother or grandmother.

She remembered events from decades earlier that the younger king did not.

👸 She was likely the queen mother

🍷 The wives were already at the feast

🧓 She remembered an older generation's history

➡️ Her memory is about to help the king

## 🙇 O King, Live For Ever

This was a standard, formal greeting used when addressing a king.

It did not mean she believed he was actually immortal.

Royal courts across the ancient Near East used similar formal phrases.

She opens with calm respect even though the room is in chaos.

🙇 This was a formal royal greeting

🚫 It did not claim real immortality

🌍 Similar phrases appeared across the region

➡️ She stayed calm in the chaos

## ✨ The Spirit Of The Holy Gods

This phrase describes how Babylonians understood Daniel's unusual gift.

They had no category for the one true God, so they borrowed their own religious language.

Nebuchadnezzar used this exact same phrase about Daniel in an earlier chapter.

The queen is quoting a description that was already well known in the palace.

✨ This was pagan language for a gift

🙏 Babylon had no category for one true God

🔁 Nebuchadnezzar used this phrase before

📖 The description was already well known

## 👑 Whom The King Nebuchadnezzar Thy Father, The King, I Say, Thy Father

The queen repeats the word father three times in one sentence.

That repetition was not careless writing or a mistake.

She is pressing hard on the connection between Belshazzar and Nebuchadnezzar's history.

She wants the king to remember exactly whose example he should be following.

🔁 Father is repeated three times here

🎯 This repetition is deliberate emphasis

📜 She presses the family connection hard

➡️ She wants Belshazzar to remember the lesson

## 🧙 Master Of The Magicians, Astrologers, Chaldeans, And Soothsayers

Daniel had once been placed in charge of this entire group of wise men.

That appointment is described in full in an earlier chapter of this book.

It meant Daniel outranked every single person who had just failed the king.

The very men who could not read the writing once answered to him.

🧙 Daniel once led this whole group

📖 Chapter two already tells that story

🏆 He outranked everyone who had failed

➡️ The right man was still available

## 📣 Now Let Daniel Be Called, And He Will Shew The Interpretation

The queen does not simply suggest Daniel as an option among others.

She states plainly that he will succeed where everyone else failed.

Her confidence comes from watching him work decades earlier, not from guessing.

A forgotten man is about to be remembered at the exact right moment.

📣 She confidently recommends Daniel by name

✅ She expects him to succeed

🧓 Her confidence comes from past memory

➡️ A forgotten man returns at the right moment

# Daniel 5:13-16
# 🧙 Daniel Brought Before The King
---
## ❓ Art Thou That Daniel

The king's question carries a note of surprise in it.

Daniel had clearly been out of the current court's daily notice for some time.

Belshazzar needs to confirm this is really the same famous man from his father's day.

A name once common in the palace had nearly been forgotten.

❓ The question carries real surprise

🧓 Daniel had faded from recent memory

✅ Belshazzar confirms his identity first

➡️ A nearly forgotten name resurfaces

## ⛓️ The Children Of The Captivity Of Judah

This phrase identifies Daniel as a Jewish exile, not a native Babylonian.

Judah was the southern kingdom that Nebuchadnezzar conquered decades earlier.

Daniel had been brought to Babylon as a young man after that conquest.

Belshazzar states this plainly, as if reminding himself who Daniel really is.

⛓️ Judah was the conquered southern kingdom

🧑 Daniel was taken as a young exile

📅 This happened decades before this night

➡️ Belshazzar reminds himself who Daniel is

## 🗺️ Whom The King My Father Brought Out Of Jewry

Jewry here simply means the land and people of Judah.

Belshazzar again calls Nebuchadnezzar his father, using the same loose family term from earlier.

This confirms Daniel's service stretched back across an entire previous reign.

Daniel has now outlasted one king and is about to meet his downfall.

🗺️ Jewry means the land of Judah

👑 Father again means a royal predecessor

📆 Daniel served across an entire reign

➡️ He is about to see a king's downfall

## ✨ The Spirit Of The Gods Is In Thee

Belshazzar repeats the exact phrase the queen used only moments earlier.

This shows her words had already reached and convinced the king.

He still frames Daniel's gift through his own pagan worldview.

He has heard enough to feel real hope for the first time tonight.

✨ Belshazzar repeats the queen's own words

🗣️ Her words had already reached him

🙏 He still uses pagan language

➡️ He feels real hope for the first time

## ❌ They Could Not Shew The Interpretation Of The Thing

Belshazzar restates the failure that has already happened once in this chapter.

Repeating it here raises the pressure on Daniel even higher.

Every expert the empire had to offer has already run out of answers.

Daniel is the very last option left in the room.

❌ The failure is restated for pressure

📈 This raises the stakes for Daniel

🧠 Every other expert has failed already

➡️ Daniel is the last option left

## 🔍 Thou Canst Make Interpretations, And Dissolve Doubts

Dissolving doubts means untangling confusing or uncertain problems completely.

Belshazzar is describing Daniel's reputation, built up over many years of service.

He is hoping that reputation still holds true tonight.

He has no idea yet how directly this writing concerns him personally.

🔍 Dissolving doubts means solving real confusion

🏆 This describes Daniel's long standing reputation

🙏 Belshazzar hopes the reputation still holds

➡️ He does not expect what is coming

## ⛓️ Have A Chain Of Gold About Thy Neck

Belshazzar repeats the exact reward he already offered in an earlier verse.

Nobody has claimed it yet, since nobody could read the writing.

He is raising the offer directly in front of the one man who might succeed.

The promise has not changed, only the person being asked now has.

🎁 The same reward is offered again

❌ Nobody has claimed it yet

🎯 It is aimed straight at Daniel

➡️ Only the person being asked has changed

# Daniel 5:17-21
# 📜 Daniel Recalls Nebuchadnezzar's Pride
---
## 🚫 Let Thy Gifts Be To Thyself

Daniel refuses the reward before he has even read a single word.

He will not let payment shape or soften whatever the message turns out to be.

This was a bold thing to say to a frightened, powerful king.

His integrity mattered more to him than the promised honor.

🚫 Daniel refuses payment up front

🗣️ He speaks boldly to a king

⚖️ Truth matters more than reward

➡️ Integrity comes before honor here

## 📖 Yet I Will Read The Writing

Daniel still agrees to do the job, just without any payment attached.

He separates the act of service from any personal benefit.

He will tell the king the truth either way.

That decision costs him nothing but could cost the king everything.

📖 He agrees to interpret anyway

🎁 He separates service from payment

🗣️ The truth will be told regardless

➡️ The cost falls on the king, not Daniel

## 👑 The Most High God Gave Nebuchadnezzar Thy Father A Kingdom

Daniel starts not with the writing but with a history lesson.

He reminds Belshazzar that Nebuchadnezzar's entire empire came from God, not from his own strength.

Majesty, glory, and honour were all gifts, not personal achievements.

Daniel is laying groundwork the king badly needs before hearing the verdict.

👑 Nebuchadnezzar's empire was a gift

🎁 God gave majesty, glory, and honour

💪 None of it came from his own strength

➡️ Daniel sets up the lesson first

## ⚔️ Whom He Would He Slew

This describes total, unchecked power over life and position.

Nebuchadnezzar could end a life or raise someone up with a single word.

No one in his empire could question or resist those decisions.

Daniel is describing just how much power this one man actually held.

⚔️ Nebuchadnezzar held total life and death power

👤 One word could end or raise anyone

🚫 Nobody could resist his decisions

➡️ His power was nearly unlimited

## 💔 His Heart Was Lifted Up, And His Mind Hardened In Pride

Having unlimited power eventually changed how Nebuchadnezzar saw himself.

He began to credit his own greatness instead of the God who gave it to him.

A hardened mind describes someone who refuses correction even when it is offered.

Pride grew slowly until it completely took over his thinking.

💔 Power changed how he saw himself

🙏 He stopped crediting God for it

🧠 A hardened mind refuses correction

➡️ Pride slowly took over completely

## 📉 He Was Deposed From His Kingly Throne

Deposed means removed by force from a position of power.

The most powerful man in the world lost everything almost overnight.

No army or wealth could protect him once God decided to act.

This is the exact story told in full in an earlier chapter of Daniel.

📉 Deposed means removed by force

👑 He lost everything very quickly

🛡️ No army could protect him

📖 Chapter four tells this full story

## 🫏 His Dwelling Was With The Wild Asses

Nebuchadnezzar did not simply lose his title, he lost his mind.

He lived like an animal, away from every other person, for a set period of time.

Eating grass and sleeping outside described a complete collapse of human dignity.

The most powerful man alive became indistinguishable from a wild animal.

🫏 He lived among wild animals

🌾 He ate grass like an ox

💧 Dew soaked his body outdoors

➡️ Total power collapsed into total humiliation

## 📖 Till He Knew That The Most High God Ruled

This humiliation had one clear purpose, not just punishment for its own sake.

Nebuchadnezzar needed to learn, in the most physical way possible, who actually ruled.

Once he learned that lesson, his mind and his throne were both restored.

That full ending is recorded in detail in an earlier chapter.

📖 The humiliation had a clear purpose

🧠 Nebuchadnezzar had to learn this lesson

👑 His throne was restored afterward

➡️ God's rule was the whole point

## 👆 That He Appointeth Over It Whomsoever He Will

This is the exact lesson Daniel wants Belshazzar to hear tonight.

God, not any human king, decides who holds power and for how long.

Nebuchadnezzar eventually learned this the hard way, through complete humiliation.

Daniel is about to ask whether Belshazzar learned anything from watching it happen.

👆 God decides who holds power

📉 Nebuchadnezzar learned this through humiliation

❓ Daniel is building toward a question

➡️ Belshazzar is about to be tested

# Daniel 5:22-24
# ⚖️ Belshazzar's Greater Guilt
---
## ⚖️ Thou His Son, O Belshazzar, Hast Not Humbled Thine Heart

Daniel's tone shifts sharply from history lesson to direct accusation.

Belshazzar is not ignorant, he clearly knew this entire story already.

Knowing the lesson and still repeating the mistake makes his guilt worse, not smaller.

This is the turning point where the speech becomes personal.

⚖️ The tone shifts to direct accusation

🧠 Belshazzar clearly knew the whole story

📈 Knowing made his guilt worse

➡️ The speech now turns personal

## ☁️ Lifted Up Thyself Against The Lord Of Heaven

This phrase describes a direct, personal act of defiance against God.

Using God's own sacred vessels for a drunken party made that defiance public and deliberate.

Belshazzar did not simply ignore God, he actively provoked him.

This is a far bolder sin than Nebuchadnezzar's quiet personal pride ever was.

☁️ This names direct defiance of God

🍷 The sacred vessels made it public

🔥 Belshazzar actively provoked God

➡️ This sin went further than pride alone

## 🙏 The Gods Of Silver, And Gold, Of Brass, Iron, Wood, And Stone

Daniel repeats the exact list of materials from earlier in this chapter.

Repeating it here drives home just how worthless these objects actually were.

Every single idol on this list was built, not born, and shaped, not alive.

The list is the same, but it now lands as a direct accusation.

🙏 The same idol list returns here

🔁 Repetition drives the point home

🪵 Every idol was built, not alive

➡️ The same list now lands as an accusation

## 👁️ Which See Not, Nor Hear, Nor Know

These three verbs describe the most basic abilities any living thing has.

An idol made of gold or stone has none of them at all.

Belshazzar praised objects with less awareness than an animal, let alone a person.

The contrast with the true God could not be stated more plainly.

👁️ These idols cannot see at all

👂 They cannot hear anything either

🧠 They have no awareness or thought

➡️ The contrast with God is total

## 🫁 The God In Whose Hand Thy Breath Is

Every single breath Belshazzar has ever taken came from this God, not from idols.

This includes every breath he took while mocking him at that very feast.

Life itself depended completely on the one being he had just insulted.

This line turns the accusation from history into something deeply personal.

🫁 Every breath came from this God

🍷 Even his breath at the feast

💔 He mocked the source of his own life

➡️ This makes the charge deeply personal

## 🛤️ Whose Are All Thy Ways

This means every decision, path, and outcome in Belshazzar's life belonged to God.

He had treated his throne and his choices as entirely his own.

Daniel corrects that assumption directly, in front of the whole court.

Nothing about his life had ever truly been outside God's control.

🛤️ Every path in life belongs to God

👑 Belshazzar treated it as his own

🗣️ Daniel corrects this in public

➡️ Nothing was ever outside God's control

## ✍️ Then Was The Part Of The Hand Sent From Him

Daniel finally connects the mysterious hand directly back to God himself.

Nobody in the room had known for certain where the hand came from until now.

The writing was never random or accidental.

It was a direct, deliberate message sent because of everything just described.

✍️ Daniel names God as the source

❓ Nobody knew that for certain before

🎯 The writing was never random

➡️ It was a deliberate message from God

# Daniel 5:25-28
# 🔢 The Words Are Interpreted
---
## 🔢 MENE, MENE, TEKEL, UPHARSIN

These four words are Aramaic, the everyday language of the Babylonian court.

Each one was also the name of a unit of money or weight.

A mina, a mina, a shekel, and a half mina sound like a market list.

The real meaning only appears once Daniel explains the wordplay hidden inside them.

🔢 These are Aramaic weight and money words

💰 A mina, a shekel, a half mina

🏪 Each word doubled as everyday currency

➡️ Daniel reveals the hidden wordplay

## 📊 MENE, God Hath Numbered Thy Kingdom, And Finished It

Mene sounds like the Aramaic word for numbered or counted.

Daniel explains that God has already counted out Belshazzar's days as king.

That number has already reached its final total.

There is no reversing a countdown that has already finished.

📊 Mene sounds like numbered or counted

📅 God had already counted his days

🔚 The countdown had already finished

➡️ Nothing could reverse that total

## ⚖️ TEKEL, Thou Art Weighed In The Balances, And Art Found Wanting

Tekel sounds like the Aramaic word for weighed, the same root behind the shekel.

A balance was a simple scale used to measure exact weight or value.

Belshazzar had been placed on that scale and measured against God's standard.

He came up short, exactly like an underweight coin in an honest merchant's hand.

⚖️ Tekel sounds like weighed

📏 A balance measured exact value

📉 Belshazzar was measured and fell short

➡️ He failed an honest, exact standard

## ✂️ PERES, Thy Kingdom Is Divided

Peres is the singular form behind the plural word upharsin used in the writing.

It sounds like the Aramaic word for divided or split apart.

Babylon's kingdom was about to be broken apart and handed to someone else.

The wordplay packed a whole verdict into a single everyday coin name.

✂️ Peres sounds like divided

💔 Babylon was about to be split apart

🪙 One coin name carried the whole verdict

➡️ Judgment hid inside ordinary words

## 🏛️ Given To The Medes And Persians

Peres also sounds remarkably close to the word Persia itself.

The Medes and Persians were two allied peoples rising to power east of Babylon.

Their combined empire would replace Babylon as the next great world power.

This matches the second kingdom shown in the statue from an earlier chapter.

🏛️ Peres sounds like the word Persia

🤝 Medes and Persians were rising allies

🌍 Their empire would replace Babylon

📖 This matches an earlier chapter's vision

## 🔁 MENE, MENE

The word mene appears two times in a row in the actual writing.

Hebrew and Aramaic writers often repeated a word on purpose for emphasis.

Doubling the word made the verdict feel certain and final, not uncertain.

This was not a copying mistake or an accident in the text.

🔁 Mene appears twice on purpose

📢 Doubling a word added emphasis

✅ It made the verdict feel certain

➡️ This was deliberate, not accidental

## ✍️ This Is The Writing That Was Written

This line confirms Daniel is now reading the actual words on the wall.

Up to this point, the writing had only been described, never spoken aloud.

Daniel reads it plainly before explaining what each word means.

The room finally hears the exact words that had frightened the king.

✍️ Daniel reads the actual words aloud

👂 Nobody had heard them spoken yet

📖 He explains them only after reading

➡️ Fear finally gets a clear answer

# Daniel 5:29-31
# 👑 The Kingdom Changes Hands That Night
---
## 👑 They Clothed Daniel With Scarlet

Belshazzar keeps his promise even after hearing a verdict against himself.

Daniel had already refused any reward before reading the writing.

The king honors him anyway, since the reward was never Daniel's idea to begin with.

A doomed king still followed through on simple honesty.

👑 Belshazzar still kept his promise

🚫 Daniel never asked for the reward

✅ The honor was the king's own choice

➡️ Honesty was rewarded even in judgment

## 📣 Made A Proclamation Concerning Him

A proclamation was a formal public announcement made before witnesses.

This made Daniel's new rank official, not just a private word between two men.

The whole court now knew exactly who had solved the mystery.

It would not matter for very long, but it was real while it lasted.

📣 A proclamation was a public announcement

👥 This made the rank official

🏆 The whole court witnessed it

➡️ It mattered for only a short time

## ⚔️ In That Night Was Belshazzar The King Of The Chaldeans Slain

Mene had promised Belshazzar's days were already numbered and finished.

That exact promise came true before the night itself was even over.

Many historians believe Cyrus's army entered the city that same night by rerouting a nearby river.

Chaldeans here names the ruling Babylonian dynasty that had governed for generations.

A powerful empire collapsed in a single night, with no trial or delay.

⚔️ Belshazzar was killed that same night

📊 Mene's promise came true immediately

🌊 Historians believe a diverted river let soldiers in

➡️ A whole empire ended without delay

## 👑 Darius The Median Took The Kingdom

Darius the Median is a figure historians still discuss and debate today.

Many believe he may be the same person as a governor who served under Cyrus the Great.

Whoever he was exactly, his arrival marks a real change of empire in this story.

Babylon's long reign over the region had officially come to an end.

👑 Darius took control of the kingdom

🤔 His exact identity is still debated

🌍 A new empire now ruled the region

➡️ Babylon's long reign had ended

## 🔢 Being About Threescore And Two Years Old

Threescore and two is an old way of saying sixty two years old.

Darius was already an older man when he took control of a massive new kingdom.

That detail signals a change in leadership as well as a change in nationality.

A new chapter in Daniel's long life, and in world history, begins here.

🔢 Threescore and two means sixty two

🧓 Darius was already an older man

🌍 A new nation now ruled Babylon

➡️ A new chapter begins for Daniel too
`.trim();

export const DANIEL_FIVE_PERSONAL_SECTIONS = parseDanielFiveRawNotes(DANIEL_FIVE_RAW_NOTES);
