export type FirstJohnFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstJohnFiveRawNotes(rawText: string): FirstJohnFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstJohnFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstJohn\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First John 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstJohn\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstJohn\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First John 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 John 5:${startVerse}` : `1 John 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 First John 5 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_JOHN_FIVE_RAW_NOTES = `# FirstJohn 5:1-5
# 🏆 Overcometh The World
---
## 👶 Whosoever Believeth That Jesus Is The Christ Is Born Of God

"Born of God" means a real spiritual birth, not simply agreeing with a fact.

Believing that Jesus is the Christ, the promised Messiah, is the mark of that birth.

This is not head knowledge standing alone.

A true belief like this changes who a person actually belongs to.

John already said this plainly back in chapter four.

He repeats it here because the whole letter rests on it.

👶 Born of God means real spiritual birth
✝️ Believing Jesus is the Christ is the mark
🚫 Not head knowledge alone
📖 This belief changes who a person belongs to

## 👨‍👧 Loveth Him That Begat Loveth Him Also

"Him that begat" means God the Father, the one who gives spiritual birth.

"Him that is begotten of him" means every other believer born of that same God.

Loving God and loving a fellow believer are tied together here on purpose.

A person cannot genuinely claim one without the other following naturally.

This is the same link John already made at the end of chapter four.

He is not introducing a new idea, only restating a familiar one.

👨‍👧 Him that begat means God the Father
👪 Begotten of him means fellow believers
🔗 Loving God ties to loving believers
📖 One love does not stand without the other

## 🧪 By This We Know That We Love The Children Of God

John gives a real test here for love, not a feeling to search for inside.

"The children of God" means every person who has been born again through Christ.

Loving them is not optional kindness extended to some believers and not others.

Love for God and love for his children runs on the same wire.

A person cannot be wired to one and disconnected from the other.

🧪 This verse gives a real test
👪 Children of God means all believers
🔌 Love runs on the same wire
📖 Connected to God, connected to his children

## ⚖️ His Commandments Are Not Grievous

"Grievous" means heavy, painful, or hard to bear.

A modern reader might expect God's commands to feel like a crushing weight.

John says the opposite is actually true for a believer who loves God.

Obeying someone you love does not feel the same as obeying a stranger.

The weight of a command changes depending on who is giving it.

Love turns obedience from a burden into a response.

⚖️ Grievous means heavy or hard to bear
❌ God's commands are not a crushing weight
💗 Love changes how obedience feels
📖 Obedience becomes response, not burden

## 🌍 Whatsoever Is Born Of God Overcometh The World

"The world" here does not mean the physical planet or its people in general.

It means the whole system of values opposed to God and his ways.

Every person born of God already carries the ability to resist that system.

This is not a future hope still waiting to happen.

It is a present reality built into the new birth itself.

🌍 The world means a system opposed to God
👶 Born of God means this power already given
✅ A present reality, not a future hope
📖 New birth includes the power to resist

## ⚔️ This Is The Victory That Overcometh The World Even Our Faith

John now names the specific weapon behind that victory.

"Faith" here means real trust placed in who Jesus actually is.

This trust is not a feeling that rises and falls with circumstances.

It is the settled confidence that Jesus is the Son of God, named again in verse five.

That confidence is strong enough to outlast whatever the world throws against it.

Faith is not the reward for winning.

Faith is how the victory already happens.

⚔️ Victory means already overcoming the world
🙏 Faith means real trust in Jesus
🔒 Settled confidence, not changing feelings
📖 Faith is how victory already happens

# FirstJohn 5:6-8
# 💧 Came By Water And Blood
---
## 💧 This Is He That Came By Water And Blood

"Water" most likely points back to Jesus's baptism, the moment his ministry began.

"Blood" points to his real death on the cross, not a symbolic appearance of dying.

Some false teachers in John's day denied Jesus had a real physical body at all.

John insists Jesus came by both, a real baptism and a real death.

This is the same argument from chapter four, stated again here with different words.

A savior who only seemed human could not actually die for anyone's sin.

💧 Water likely points to his baptism
🩸 Blood points to his real death
🚫 Some denied he had a real body
📖 A real death required a real body

## 🕊️ The Spirit That Beareth Witness Because The Spirit Is Truth

"Beareth witness" means giving reliable testimony that something is true.

The Holy Spirit is the one actively confirming who Jesus really is.

This is not John's testimony standing alone, with no outside confirmation.

The Spirit's own nature makes that testimony dependable.

"The Spirit is truth" means he cannot confirm a lie, even to help a good cause.

📜 Beareth witness means giving reliable testimony
🕊️ The Holy Spirit confirms who Jesus is
✅ Not John's claim standing alone
📖 Truth cannot testify to a lie

## 👑 There Are Three That Bear Record In Heaven The Father The Word And The Holy Ghost

This verse names the Trinity directly, the Father, the Word, and the Holy Ghost.

Many scholars believe this exact wording was added to Greek manuscripts centuries after John wrote.

The oldest Greek copies of this letter do not contain this verse.

That does not mean the Trinity itself is untrue.

Other verses in the Bible teach it clearly on their own.

Good study always asks what the earliest evidence actually shows.

📜 This verse names Father, Word, and Spirit
🕰️ Likely added to Greek copies later
📚 Oldest manuscripts lack this verse
➡️ Other verses still teach the Trinity

## 🌊 There Are Three That Bear Witness In Earth The Spirit And The Water And The Blood

This list answers back to verse six.

Water and blood were named there first.

The Spirit is added here as a third witness alongside them.

All three point in the same direction, toward who Jesus truly is.

"These three agree in one" means their testimony never contradicts each other.

A case built on three matching witnesses is far stronger than one voice alone.

🔁 Answers back to verse six
🕊️ The Spirit joins as a third witness
🤝 All three testimonies agree
📖 Three witnesses make a stronger case

# FirstJohn 5:9-13
# 📜 The Witness Of God
---
## ⚖️ If We Receive The Witness Of Men The Witness Of God Is Greater

People accept human testimony in court, in news, in everyday life all the time.

John argues that God's testimony deserves even more trust than that.

"The witness of God" points to everything just said about the Spirit, the water, and the blood.

If a weaker witness gets believed without hesitation, a stronger witness deserves even more confidence.

Refusing to trust God's testimony makes no logical sense by this comparison.

⚖️ Witness of men means everyday human testimony
👑 Witness of God is stronger testimony
🧮 A weaker witness already gets trusted
📖 A stronger witness deserves more trust

## 🤥 He That Believeth Not God Hath Made Him A Liar

This is a serious charge, not an exaggeration for effect.

Refusing to believe God's testimony about his own Son treats God as dishonest.

"Made him a liar" does not mean God actually lied.

It means the unbeliever's own stance accuses him of lying.

Unbelief is never a neutral, harmless position in this light.

⚠️ A serious charge, not exaggeration
🤥 Unbelief treats God as dishonest
🚫 God did not actually lie
📖 Unbelief is never neutral

## 🎁 This Is The Record That God Hath Given To Us Eternal Life

"Record" here means an official testimony, like a sworn statement.

God himself is the one giving this testimony about his Son.

"Eternal life" does not just mean living forever without end.

It means a real, permanent kind of life different from life now.

That life is not found floating somewhere out in the world.

It is found specifically in Jesus, God's own Son.

📜 Record means an official testimony
⏳ Eternal life is more than endless years
🌟 It is a different kind of life
📖 That life is found in the Son

## 🔑 He That Hath The Son Hath Life

This sentence is as direct as John gets in the whole letter.

Having eternal life is not about religious effort or a lifetime of good deeds.

It depends entirely on one thing, having the Son.

The second half states the same truth from the opposite direction.

Having the Son means having life.

Not having the Son means not having life.

🔑 Life depends on having the Son
🚫 Not earned through effort or deeds
↔️ Stated both ways, positive and negative
📖 No Son means no life

## ✍️ That Ye May Know That Ye Have Eternal Life

John states his exact purpose for writing this part of the letter.

He does not want believers left guessing about something this important.

"Know" here means a settled confidence, not a hopeful guess.

Assurance of eternal life is meant to be something a believer can actually hold onto.

This is the difference between hoping for salvation and resting in it.

✍️ John states his purpose for writing
🧠 Know means settled confidence
🤲 Assurance is meant to be held
📖 Resting in it, not just hoping

# FirstJohn 5:14-17
# 🙏 According To His Will
---
## 💪 This Is The Confidence That We Have In Him

"Confidence" here means boldness in approaching God, not nervous hesitation.

This boldness is not based on a believer's own worthiness.

It rests on praying according to what God actually wants.

"According to his will" is the condition that shapes this whole promise.

A prayer lined up with God's will can be brought to him without fear.

💪 Confidence means boldness, not hesitation
🚫 Not based on personal worthiness
🎯 Depends on praying according to his will
📖 Lined up prayer can be bold prayer

## 🙏 We Know That We Have The Petitions That We Desired Of Him

"Petitions" means specific requests brought to God in prayer.

John links hearing and answering together as one continuous promise.

This is not a guarantee that every single wish gets granted exactly as asked.

It is tied directly back to the condition from the verse before it.

That condition is asking according to his will.

A request shaped by God's will can be prayed with real, settled expectation.

🙏 Petitions means specific requests
🔗 Tied to the condition before it
🚫 Not a promise for every wish
📖 God's will shapes real expectation

## 🤝 He Shall Ask And He Shall Give Him Life For Them That Sin Not Unto Death

"He" here refers to a believer who notices another believer's sin.

That observer is told to actually pray for the one who sinned.

"Give him life" points to God restoring and strengthening the sinning believer.

This describes sin that does not lead to spiritual death, a recoverable stumble.

Prayer becomes a real tool for helping a brother back toward health.

👀 He refers to a believer who notices sin
🙏 He is told to pray for them
💚 Give him life means restoration
📖 Prayer helps a brother recover

## ⚠️ There Is A Sin Unto Death

This phrase has alarmed readers for centuries, often more than it should.

John does not list which specific sin this is.

Many scholars believe it points to the hardened rejection of Christ described earlier in this letter.

It is not likely one ordinary sin that a believer commits and regrets.

John simply says he does not instruct believers to pray for that specific case.

This is not John giving up on anyone lightly.

⚠️ A phrase that has alarmed readers
❓ No specific sin is named
🔒 Likely points to hardened rejection of Christ
📖 Not an instruction to give up lightly

## ⚖️ All Unrighteousness Is Sin And There Is A Sin Not Unto Death

"Unrighteousness" means any failure to live up to what is right.

John confirms that every wrong act counts as real sin, with no exceptions.

At the same time, not every sin carries the weight of the sin just described.

Most sin a believer struggles with falls into this more common, recoverable category.

That distinction is meant to bring relief, not more anxiety.

⚖️ Unrighteousness means any failure to do right
✅ All wrongdoing counts as sin
🪶 Most sin is the lighter, recoverable kind
📖 Meant to bring relief, not anxiety

# FirstJohn 5:18-21
# 🗿 Keep Yourselves From Idols
---
## 🧭 Whosoever Is Born Of God Sinneth Not

This does not mean a believer becomes incapable of ever sinning again.

John already addressed sin directly earlier in this very chapter.

This describes a settled new direction, not an occasional slip.

A believer born of God is no longer at home in a sinful pattern of life.

The whole direction of that person's life has actually changed.

🚫 Not claiming sinless perfection
🧭 Describes a new settled direction
🏠 No longer at home in sin
📖 Direction changed, not perfection reached

## 😈 That Wicked One Toucheth Him Not

"That wicked one" refers to Satan himself, not sin in general.

"Toucheth him not" means Satan cannot gain lasting control over a believer born of God.

This does not promise a life completely free of temptation or attack.

It promises that Satan's grip cannot actually hold.

A believer stands protected, not unguarded, in that struggle.

😈 That wicked one means Satan
🚫 Cannot gain lasting control
⚔️ Temptation still happens
📖 His grip cannot actually hold

## 🛏️ The Whole World Lieth In Wickedness

"Lieth in wickedness" pictures something resting easily in a comfortable place.

Think of someone lying down in a bed, fully at rest.

The world rests in sin that same comfortable way.

This is a settled condition, not one bad season passing through.

Believers are described the opposite way, belonging to God instead.

That contrast is the whole point of naming it here.

🛏️ Lieth in wickedness means resting in sin
⏳ A settled condition, not a phase
↔️ Believers belong to God instead
📖 The contrast is the whole point

## ✝️ We Know That The Son Of God Is Come And Hath Given Us An Understanding

"Is come" points to the real, historical arrival of Jesus Christ in the flesh.

"An understanding" means real spiritual insight, not a guess or a feeling.

This insight lets a believer actually recognize who the true God is.

Without Christ coming, that kind of knowing was not available in the same way.

His arrival opened the door to real knowledge of God.

✝️ Is come means his real arrival
🧠 Understanding means real spiritual insight
🚪 Opened the door to knowing God
📖 Real knowledge follows his arrival

## 👑 This Is The True God And Eternal Life

John names Jesus directly as the true God in this closing statement.

This is one of the clearest statements of Christ's full deity in the whole New Testament.

"Eternal life" is tied to him directly, not to a separate source.

Knowing Jesus and having that life are never two separate things.

The letter's whole argument lands on this one identity.

👑 Jesus named as the true God
✝️ One of the clearest statements of his deity
🔗 Eternal life is tied to him
📖 The letter's argument lands here

## 🗿 Little Children Keep Yourselves From Idols

"Idols" does not only mean carved statues bowed down to in a temple.

Anything treated as a rival to the true God just named counts as an idol.

The false teachers and their false view of Christ fit that description too.

John's final word matches the whole letter's concern, protecting right belief about Jesus.

This short command sends a long letter off with a clear, practical charge.

🗿 Idols means more than carved statues
⚔️ Anything rivaling the true God counts
😈 False teaching about Christ fits too
📖 A practical charge closes the letter
`.trim();

export const FIRST_JOHN_FIVE_PERSONAL_SECTIONS = parseFirstJohnFiveRawNotes(FIRST_JOHN_FIVE_RAW_NOTES);
