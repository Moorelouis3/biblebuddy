export type RevelationOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationOneRawNotes(rawText: string): RevelationOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 1:${startVerse}` : `Revelation 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Revelation 1 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_ONE_RAW_NOTES = `# Revelation 1:1-2
# 📜 The Revelation Is Unveiled
---
## 🔓 The Revelation Of Jesus Christ

"Revelation" means an unveiling, not a hidden code.

The Greek word behind it is apokalypsis, meaning something hidden is pulled back.

This book is not written to confuse the reader.

It is written to uncover what was previously hidden about Christ.

🔓 Revelation means something is unveiled
📜 It comes from the Greek apokalypsis
🙅 The book is not meant to confuse
📖 Christ is being revealed, not hidden

---
## 🖼️ Signified It By His Angel

"Signified" means communicated through signs and symbols.

God did not send John a plain, direct explanation.

He sent pictures, numbers, and images instead.

That is why Revelation reads so differently than a letter from Paul.

The symbols still carry a real, knowable meaning.

🖼️ Signified means shown through symbols
🔢 Numbers and images carry the message
✉️ This reads differently than Paul's letters
📖 The symbols still mean something specific

---
## ⏳ Shortly Come To Pass

This phrase does not mean every event happens within days.

"Shortly" points to the nearness of a process, not a strict deadline.

The same Greek word describes something already set in motion.

John's own readers already lived inside the world Revelation addressed.

The warnings and hope were already starting to unfold for them.

⏳ Shortly points to nearness, not a deadline
🚀 The process was already starting to move
👥 John's own readers were already affected
📖 Revelation speaks to its first readers too

---
## 👁️ Who Bare Record Of The Word Of God

"Bare record" means John testified as an eyewitness.

He is not inventing these symbols out of imagination.

He claims he personally saw what he is about to describe.

That claim matters for how seriously the book should be read.

👁️ Bare record means John testified firsthand
🙋 He claims to be an eyewitness
🚫 He is not inventing these images
📖 His testimony grounds the whole book

# Revelation 1:3-6
# 👑 Grace From Him Who Is, Was, And Is To Come
---
## 😊 Blessed Is He That Readeth

"Blessed" names a real happiness tied to God's favor.

This is the first of seven such blessings scattered through Revelation.

Reading the book aloud in church was the normal way people first heard it.

Most believers could not own a personal copy of scripture.

Hearing this prophecy read was treated as a genuine gift.

😊 Blessed names real favor from God
🥇 This is the first of seven such sayings
📢 Most people first heard it read aloud
📖 Hearing this prophecy counted as a gift

---
## ⏰ The Time Is At Hand

"At hand" does not promise the events happen that same week.

It means the process described is already near and already moving.

John the Baptist once preached that the kingdom was at hand the same way.

That kingdom did not fully arrive in a single day either.

Nearness in scripture often means a season has begun, not a stopwatch.

⏰ At hand means near, not immediate
🧭 The process was already in motion
👤 John the Baptist used the same phrase
📖 Nearness here is a season, not a stopwatch

---
## 🗺️ The Seven Churches Which Are In Asia

"Asia" here names a Roman province, not the continent.

It sat in what is now western Turkey.

Seven real congregations existed in seven real cities inside that province.

Each one receives its own letter later in this book.

🗺️ Asia was a Roman province, not a continent
📍 It covered part of modern day Turkey
⛪ Seven real churches existed in seven cities
📖 Each church gets its own letter later

---
## ♾️ Which Is, And Which Was, And Which Is To Come

This phrase names God as the one who exists outside of time.

He did not begin to exist and he will not stop existing.

The phrase echoes God's own name given to Moses, "I Am."

No past or future event can threaten who He already is.

♾️ God exists outside of time itself
🔥 This echoes the name given to Moses
🛡️ Nothing past or future threatens who He is
📖 His eternal name opens the whole book

---
## 🕊️ The Seven Spirits Which Are Before His Throne

This does not describe seven separate spirit beings.

Seven in Revelation usually pictures fullness or completeness.

The phrase points to the Holy Spirit in His complete, perfect work.

One Spirit is being described here, not seven different ones.

🙅 This is not seven separate spirit beings
🔢 Seven often pictures fullness in this book
🕊️ It points to the Holy Spirit's full work
📖 One Spirit stands fully present before the throne

---
## 🌅 The First Begotten Of The Dead

"Firstbegotten" names Christ as the first to rise into lasting resurrection life.

Others before him were raised only to die again later.

Christ's resurrection stands as the beginning of a whole harvest to follow.

Paul calls him the firstfruits using that same idea in different words.

🌅 Firstbegotten means first into lasting resurrection life
⚰️ Earlier raised people still died again later
🌾 Christ's rising starts a larger harvest
📖 His resurrection guarantees what comes after it

---
## 🩸 Washed Us From Our Sins In His Own Blood

This names the cost of forgiveness directly.

Sin is pictured here as a stain that needed real cleansing.

Christ's own blood is what paid for that cleansing.

Nothing else in the passage is offered as the price.

🩸 Christ's blood is named as the price
🧼 Sin is pictured as a stain needing cleansing
🙅 No other price is offered here
📖 Forgiveness cost something real, not a wish

---
## ⛰️ Made Us Kings And Priests Unto God

This title echoes a promise God gave Israel at Mount Sinai.

There, God called the whole nation a kingdom of priests.

Believers now share that same calling through Christ.

A priest represented people before God, and a king carried real authority.

⛰️ This echoes God's promise at Mount Sinai
⛪ Israel was once called a kingdom of priests
🙏 A priest represents people before God
📖 Believers now share both roles through Christ

# Revelation 1:7-8
# ⛅ He Cometh With Clouds
---
## ☁️ He Cometh With Clouds

Clouds in scripture often mark God's own visible arrival.

Clouds once covered Mount Sinai when God gave the law to Moses.

A cloud also received Jesus when he ascended into heaven.

His return is pictured the same way he left, openly and visibly.

☁️ Clouds often mark God's visible arrival
⛰️ Clouds once covered Mount Sinai
🚀 A cloud received Jesus at his ascension
📖 His return mirrors the way he left

---
## 🗡️ They Also Which Pierced Him

This phrase points to those responsible for Christ's crucifixion.

It echoes a promise from the prophet Zechariah about mourning for the one pierced.

That mourning is not pictured as punishment alone.

Scripture elsewhere ties this same moment to genuine repentance.

🗡️ Pierced points to those behind the crucifixion
📜 Zechariah already promised this same mourning
😢 The mourning is not only punishment
📖 Scripture connects it to real repentance

---
## 🔤 I Am Alpha And Omega

Alpha is the first letter of the Greek alphabet.

Omega is the last letter of that same alphabet.

Together they claim complete authority over everything from start to finish.

No event in history falls outside that claim.

🔤 Alpha is the first Greek letter
🔚 Omega is the last Greek letter
🌍 Together they claim authority over everything
📖 Nothing in history falls outside that claim

---
## 💪 The Almighty

"Almighty" translates a Greek word meaning the one who holds power over all things.

It is used only of God in scripture, never of a human ruler.

This title closes the section the way it opened, naming God's total power.

💪 Almighty means power over all things
🙅 Scripture never gives this title to humans
🔄 The section opens and closes on this power
📖 Total power frames the whole passage

# Revelation 1:9-11
# 🏝️ John On The Isle Of Patmos
---
## 🤝 Companion In Tribulation

John does not introduce himself as someone above his readers.

"Companion" means he shares the same suffering they are already facing.

He calls himself their brother before he says anything else about himself.

Shared suffering, not rank, is how he first describes their relationship.

🤝 Companion means John shares their suffering
🙅 He does not claim a higher rank
👪 He calls himself their brother first
📖 Shared suffering unites John with his readers

---
## 🏝️ The Isle That Is Called Patmos

Patmos was a small, rocky island in the Aegean Sea.

Rome used islands like this one to exile political and religious prisoners.

John was likely sent there for refusing to stop preaching about Christ.

This vision came to him in the middle of that punishment.

🏝️ Patmos was a small island in the Aegean
⛓️ Rome exiled prisoners to islands like it
📣 John was likely banished for preaching Christ
📖 This vision arrived in the middle of exile

---
## 👁️ I Was In The Spirit On The Lord's Day

"In the Spirit" describes a state of prophetic vision, not ordinary thought.

"The Lord's day" names Sunday, the day Christ rose from the dead.

Early believers already gathered for worship on that day.

John received this vision while already set apart for worship.

👁️ In the Spirit means a prophetic vision state
☀️ The Lord's day names Sunday
⛪ Early believers already worshiped on that day
📖 The vision came during a time of worship

---
## 📯 As Of A Trumpet

A trumpet in scripture announces something urgent and important.

It was never used for a quiet or casual message.

The voice John heard carried that same weight and authority.

What follows is meant to be heard as a command, not a suggestion.

📯 A trumpet announces something urgent
🙅 It is never used for casual news
👂 The voice carried the same weight
📖 What follows is a command, not a suggestion

---
## ✍️ What Thou Seest, Write In A Book

John is given a clear assignment before the vision even continues.

He is told to write down exactly what he sees.

This is not John's own private reflection on faith.

It is a message he is commanded to pass on to others.

✍️ John is told to write down the vision
🙅 This is not his own private reflection
📬 He is commanded to pass it on
📖 Revelation begins as an assignment, not a diary

---
## 🗺️ Unto Ephesus, And Unto Smyrna, And Unto Pergamos

These were three of seven real cities in the Roman province of Asia.

A letter carrier could travel a circular route connecting all seven in order.

Ephesus was a major trade city.

Smyrna was a wealthy port city.

Pergamos was a center of pagan worship.

Each city's letter later in Revelation fits its own real situation.

🗺️ These were real cities in Roman Asia
🔄 A carrier could travel a circular route
🏛️ Each city had its own real character
📖 Each one gets a fitting letter later

# Revelation 1:12-16
# ✨ One Like Unto The Son Of Man
---
## 🕎 Seven Golden Candlesticks

This is not simply decorative lighting equipment.

A single golden lampstand once stood inside Israel's tabernacle.

Here that image multiplies into seven separate lampstands.

Verse twenty later explains that each one pictures a real church.

🕎 This is not just decoration
⛺ One golden lampstand once stood in the tabernacle
🔥 Here the image multiplies into seven
📖 Each lampstand later pictures a real church

---
## 📜 One Like Unto The Son Of Man

"Son of man" was Daniel's own title for a glorious, heavenly figure.

Jesus used this same title for himself throughout his ministry.

John recognizes the figure in his vision immediately by this title.

The vision is identifying Christ, not introducing a stranger.

📜 Son of man comes from Daniel's vision
🗣️ Jesus used this title for himself
🙋 John recognizes the figure right away
📖 The vision names Christ, not a stranger

---
## 👘 Clothed With A Garment Down To The Foot

A long robe reaching to the feet marked someone of high rank.

Israel's priests wore robes shaped very much like this one.

Kings and dignitaries also wore long garments instead of short working clothes.

The clothing alone marks this figure as both priest and king.

👘 A long robe marked high rank
🙏 Israel's priests wore robes shaped like it
👑 Kings also wore long garments
📖 The clothing marks him as priest and king

---
## 💛 Girt About The Paps With A Golden Girdle

"Paps" is an old word for the chest.

A "girdle" was a wide sash or belt worn around the body.

Gold marked this particular sash as royal, not ordinary clothing.

Wearing it high, near the chest, also marked rest from heavy labor.

💛 Paps is an old word for the chest
🎗️ A girdle was a wide sash
👑 Gold marked it as royal clothing
📖 Its high placement marked rest from labor

---
## 🙅 His Head And His Hairs Were White Like Wool

White hair here does not describe old age or weakness.

Daniel used this same image for God himself, calling him the Ancient of Days.

White pictures purity and eternal wisdom instead of fading strength.

This detail links Christ directly to Daniel's vision of God on his throne.

🙅 White hair does not mean weakness here
📜 Daniel used this image for God's own throne
🤍 White pictures purity and eternal wisdom
📖 This links Christ directly to that vision

---
## 🔥 His Eyes Were As A Flame Of Fire

Fire in this picture stands for piercing, complete knowledge.

Nothing hidden from this figure's sight stays hidden for long.

The same image returns later in Revelation to describe Christ as judge.

These eyes see straight through every excuse and every disguise.

🔥 Fire pictures piercing, complete knowledge
🙅 Nothing stays hidden from this sight
⚖️ The same image later marks him as judge
📖 These eyes see past every disguise

---
## 🦶 His Feet Like Unto Fine Brass

Fine brass described metal that had been refined and purified by fire.

Feet pictured here as metal suggest a strength that will not bend or break.

This is not a fragile or uncertain figure standing before John.

Everything about the description points toward unshakable strength.

🔥 Fine brass meant metal refined by fire
🦶 Feet of metal suggest unbending strength
🙅 This is not a fragile figure
📖 Every detail points to unshakable strength

---
## 🌊 As The Sound Of Many Waters

"Many waters" pictures the roar of a large sea or a great waterfall.

That sound cannot be ignored or talked over by anything nearby.

The voice John hears carries that same overwhelming, constant power.

No quiet whisper could ever be compared to this sound.

🌊 Many waters pictures a roaring sea
🙅 This sound cannot be ignored
📢 The voice carries overwhelming, constant power
📖 No whisper compares to this sound

---
## ⭐ Seven Stars In His Right Hand

Verse twenty later names these stars as the messengers of the seven churches.

Holding them in his right hand pictures real protection and real authority.

The right hand in scripture usually marks a place of strength and honor.

These churches are not left unguarded or forgotten by Christ.

⭐ The stars are later named church messengers
✋ The right hand pictures strength and honor
🛡️ Holding them pictures real protection
📖 The churches are not forgotten by Christ

---
## 🗡️ Out Of His Mouth Went A Sharp Twoedged Sword

A sword with two edges can cut in either direction without turning.

This sword comes from Christ's mouth instead of his hand.

That detail points to the power of his spoken word itself.

His words judge and divide just as sharply as any blade.

🗡️ A twoedged sword cuts both ways
🗣️ This sword comes from his mouth
⚖️ It pictures the power of his spoken word
📖 His words judge as sharply as any blade

---
## 😮 His Countenance Was As The Sun Shineth In His Strength

"Countenance" means his face or overall appearance.

The comparison to the sun at full strength pictures blinding, overwhelming brightness.

No one could look directly at this face without being overcome.

This final detail completes a picture of total, radiant glory.

😮 Countenance means his face or appearance
☀️ The sun at full strength pictures blinding brightness
🙅 No one could look at it directly
📖 The picture closes on total, radiant glory

# Revelation 1:17-20
# 🔑 Fear Not, I Am The First And The Last
---
## 😨 I Fell At His Feet As Dead

This is the normal human response to seeing God's full glory directly.

Other prophets like Isaiah and Daniel reacted the exact same way.

John does not stand boldly in this presence on his own strength.

Real encounter with God's glory overwhelms a person completely.

😨 This is the normal response to God's glory
📜 Isaiah and Daniel reacted the same way
🙅 John does not stand boldly on his own
📖 Real glory overwhelms a person completely

---
## 🤲 Fear Not, I Am The First And The Last

Comfort arrives before any correction or warning in this moment.

Christ repeats the same claim already made in verse eight.

Being first and last means no beginning or ending threatens him.

That same unshakable identity now reaches out to calm a terrified man.

🤲 Comfort comes before any warning here
🔁 Christ repeats his claim from verse eight
♾️ First and last means no threat to him
📖 His unshakable identity now calms a terrified man

---
## ☠️ I Am He That Liveth, And Was Dead

Christ states his own death plainly, without softening the word.

He does not describe it as only appearing to die.

He then states his present life just as plainly.

Both halves of this claim rest on something that actually happened.

☠️ Christ names his own real death
🙅 He did not only appear to die
🌅 He then states his present life
📖 Both halves rest on real events

---
## 🔑 The Keys Of Hell And Of Death

A key in this picture means control over who enters and who leaves.

"Hell" here names the realm of the dead, not final punishment specifically.

Christ claims full authority over that realm because he already entered it himself.

No one else in scripture claims to hold these particular keys.

🔑 A key here means control over access
⚰️ Hell names the realm of the dead
🏆 Christ already entered that realm himself
📖 No one else claims these same keys

---
## 👁️ The Things Which Thou Hast Seen

This phrase points back to the vision John has already described.

Christ is giving John a simple outline for the whole book.

What John has already seen is only the outline's first part.

Two more categories of content are still coming after this one.

👁️ This points to the vision already described
🗂️ Christ gives John an outline for the book
🥇 This is only the outline's first part
📖 More categories of content are still coming

---
## 🏛️ The Things Which Are, And The Things Which Shall Be Hereafter

"The things which are" points to the present situation of the seven churches.

"The things which shall be hereafter" points to future events still to come.

Together with what John already saw, this makes a clear three part outline.

Revelation moves between a real present and a real future throughout the book.

🏛️ The things which are means the churches now
🔮 Hereafter points to future events still coming
🗂️ Together they form a three part outline
📖 Revelation moves between a real present and future

---
## 🔓 The Seven Stars Are The Angels Of The Seven Churches

Christ now explains his own symbol instead of leaving it a mystery.

"Angels" here most likely names the human messengers or leaders of each church.

The same Greek word can describe either a heavenly being or a human messenger.

Context in each case decides which meaning is correct.

🔓 Christ explains his own symbol directly
👤 Angels likely names each church's human leader
🔁 The same word fits either meaning
📖 Context decides which meaning fits here

---
## 🕎 The Seven Candlesticks Which Thou Sawest Are The Seven Churches

Every symbol John saw finally receives a plain explanation.

The lampstands are not angels, nations, or abstract ideas.

They are the seven actual congregations already named in verse eleven.

The vision that opened this chapter points straight at real, ordinary churches.

🕎 The lampstands get a plain explanation
🙅 They are not angels or abstract ideas
⛪ They are the seven congregations from verse eleven
📖 The vision points to real, ordinary churches
`.trim();

export const REVELATION_ONE_PERSONAL_SECTIONS = parseRevelationOneRawNotes(REVELATION_ONE_RAW_NOTES);
