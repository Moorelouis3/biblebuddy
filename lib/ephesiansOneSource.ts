export type EphesiansOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEphesiansOneRawNotes(rawText: string): EphesiansOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EphesiansOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ephesians\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ephesians 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ephesians\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Ephesians\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ephesians 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ephesians 1:${startVerse}` : `Ephesians 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ephesians 1 sections, received " + sections.length);
  }

  return sections;
}

const EPHESIANS_ONE_RAW_NOTES = `# Ephesians 1:1-2
# 👋 Greetings To The Saints At Ephesus
---
## 📜 Paul, An Apostle Of Jesus Christ By The Will Of God

An apostle means someone personally sent out with a message, not a title Paul gave himself.

Jesus himself appointed Paul to this role, the same way the original twelve were appointed.

By the will of God shows this calling was not Paul's own idea.

It came from God, and that is the authority behind everything Paul writes next.

📜 Apostle means someone personally sent out

✝️ Jesus himself appointed Paul

🙏 This calling came from God's will

📖 That is the authority behind this letter

## 🙏 To The Saints Which Are At Ephesus

Saints does not mean specially holy people, it is the normal New Testament word for believers.

Everyone who trusts in Christ gets called a saint in the Bible, not just a select few.

Ephesus was a large, wealthy port city in modern day Turkey.

It was famous for a massive temple to the goddess Diana, one of the ancient world's great pagan shrines.

A thriving church took root there, in the middle of that pagan culture.

🙏 Saints means ordinary believers

🏙️ Ephesus was a wealthy port city

🏛️ It had a famous pagan temple

📖 A real church grew there anyway

## 🤝 And To The Faithful In Christ Jesus

Faithful here means those who trust and remain loyal to Christ, not people who never struggle.

Paul adds this phrase right after saints to describe the same group a second way.

Being a saint and being faithful in Christ are not two different categories of people.

They are two names for the same identity, viewed from two angles.

🤝 Faithful means trusting and loyal

🔁 Same group as saints, second angle

🙅 Not two different categories

📖 One identity in Christ

## ✌️ Grace Be To You, And Peace

Grace was the normal Greek greeting, and peace was the normal Hebrew greeting.

Paul combines both into one blessing at the start of nearly every letter he wrote.

Grace means God's favor given freely, not earned.

Peace means the wholeness that comes from being right with God.

Putting them together greets both Jewish and Gentile believers in the same breath.

✌️ Grace was the Greek greeting

🕊️ Peace was the Hebrew greeting

🎁 Grace means favor freely given

📖 Together they greet both Jew and Gentile

# Ephesians 1:3-6
# ✨ Blessed In Christ
---
## 🙌 Blessed Be The God And Father Of Our Lord Jesus Christ

Blessed here means praised and worshiped, not given a gift.

Paul opens this long sentence the way a Jewish prayer often opened, praising God first.

Calling God the Father of our Lord Jesus Christ ties the blessing directly to Jesus.

Everything Paul is about to list flows out of that relationship.

🙌 Blessed means praised, not gifted

🙏 This opens like a Jewish prayer

✝️ Tied to Jesus as God's Son

📖 Everything below flows from this

## 🎁 Blessed Us With All Spiritual Blessings In Heavenly Places In Christ

Spiritual blessings are not money or health, they are gifts tied to a believer's standing with God.

Heavenly places does not mean a location believers travel to after death.

It describes the spiritual realm where Christ now rules, a realm believers already share in right now.

Every blessing Paul names in the rest of this chapter falls under this one heading.

🎁 Spiritual blessings are not physical gifts

🌌 Heavenly places means a realm, not a trip

⏳ Believers share in it already

📖 Everything below falls under this blessing

## 📅 Chosen Us In Him Before The Foundation Of The World

Before the foundation of the world means before anything was ever created.

God's choice of believers was not a reaction to something they did.

It happened outside of time, before there was even a world to act in.

This is the first of several words in this chapter about God planning ahead.

📅 Before creation, not after

🚫 Not a reaction to anything we did

⏳ A choice made outside of time

📖 God planned this far in advance

## ✨ Holy And Without Blame Before Him In Love

Holy means set apart for God, belonging fully to him.

Without blame means no accusation can rightly stick to the person anymore.

This is the purpose behind being chosen, not a side effect of it.

God chose people in order to shape them into this, not because they already were this.

✨ Holy means set apart for God

🙅 Without blame means no accusation sticks

🎯 This is the purpose of being chosen

📖 God shapes people into this

## 👨‍👩‍👧 Predestinated Us Unto The Adoption Of Children By Jesus Christ

Predestinated means decided on ahead of time, before it actually happened.

Adoption was a real legal practice in the Roman world, giving someone full rights as a son.

An adopted son in that culture had the same inheritance rights as a son born into the family.

Paul uses this picture to describe how believers legally belong to God's family through Christ.

👨‍👩‍👧 Predestinated means decided ahead of time

📜 Adoption was a real Roman legal practice

🏛️ An adopted son had full inheritance rights

📖 Believers belong to God's family this way

## 💗 According To The Good Pleasure Of His Will

Good pleasure means something God genuinely delights in, not a duty he reluctantly performs.

Adopting believers was not a burden God had to carry.

It was something he wanted to do, and it made him glad to do it.

That changes how a believer should picture being chosen.

💗 Good pleasure means genuine delight

🙅 Not a reluctant duty

😊 God wanted to do this

📖 Being chosen made God glad

## 🏆 To The Praise Of The Glory Of His Grace

Paul states the goal of all of this planning in one line.

Every choice God made here was aimed at being praised for his grace.

Grace means favor given to people who did not earn it.

The goal was never human achievement, it was God getting the credit he deserves.

🏆 States the goal of this planning

💗 Aimed at praise for his grace

🎁 Grace means unearned favor

📖 God gets the credit, not people

## 💞 Accepted In The Beloved

Accepted here carries the idea of being highly favored, warmly welcomed in.

The Beloved is a title for Jesus Christ, God's own dearly loved Son.

Being accepted in the Beloved means a believer shares in the same favor Jesus already has with the Father.

That favor is not something a believer earns on their own.

💞 Accepted means warmly welcomed in

✝️ The Beloved is a title for Jesus

🤝 Believers share in Jesus's own favor

📖 Not earned, only shared in

# Ephesians 1:7-10
# 🩸 Redemption And Mystery Revealed
---
## 🩸 Redemption Through His Blood, The Forgiveness Of Sins

Redemption means buying someone back out of slavery or debt.

In the ancient world, a slave could be set free once the right price was paid.

Christ's blood is that price, paid to free believers from sin's hold over them.

Forgiveness of sins is the direct result of that price being paid in full.

🩸 Redemption means buying someone out of slavery

💰 A price had to be paid

✝️ Christ's blood was that price

📖 Forgiveness follows the price being paid

## 💰 According To The Riches Of His Grace

Riches here does not describe money, it describes abundance without limit.

Paul is saying this forgiveness was not handed out sparingly or reluctantly.

It came from a grace so large it gets described the same way wealth is described.

God was generous, not stingy, in how he forgave.

💰 Riches means abundance without limit

🙅 Not handed out sparingly

🎁 Grace this large, not stingy

📖 God was generous in forgiving

## 🧠 Abounded Toward Us In All Wisdom And Prudence

Abounded means overflowed, more than enough and still spilling over.

Wisdom means understanding what is true.

Prudence means knowing how to apply that truth well in real situations.

God did not just give believers information, he gave them the ability to actually use it.

🧠 Abounded means overflowing, more than enough

📚 Wisdom means understanding what is true

🎯 Prudence means applying it well

📖 God gave ability, not just information

## 🔍 The Mystery Of His Will

A mystery in the Bible is not a puzzle to solve, it is a truth once hidden now revealed.

This mystery is explained later in the chapter as God's plan to unite all things in Christ.

It was not obvious ahead of time, even to the Old Testament prophets.

God chose this moment in history to finally make it known.

🔍 Mystery means once hidden, now revealed

🧩 Not a puzzle still unsolved

📜 Even the prophets did not fully see it

📖 God chose this moment to reveal it

## ⏳ The Dispensation Of The Fulness Of Times

Dispensation means a period of time with its own particular plan or arrangement.

The fulness of times means the moment history was finally ready for that plan.

God was not rushed and did not run late.

Christ came at the exact moment God had always intended.

⏳ Dispensation means a planned time period

⏰ Fulness of times means history's ready moment

🚫 God was not rushed or late

📖 Christ came at the right time

## 🧩 Gather Together In One All Things In Christ

Gather together in one means unite what was scattered or divided into a single whole.

This is the mystery Paul mentioned a few lines earlier, now named plainly.

Sin had fractured creation, setting people against God and against each other.

Christ is the one point where all of that gets brought back together.

🧩 Gather together means unite what was divided

🔍 This is the mystery, named plainly

💔 Sin had fractured everything

📖 Christ is where it comes back together

## 🌍 Both Which Are In Heaven, And Which Are On Earth

Paul widens this unity to the largest scale he can describe.

Heaven and earth covers every created thing.

That includes what is visible and invisible.

Nothing in all of creation sits outside this plan in Christ.

That is a far bigger claim than saving a few individual people.

🌍 Covers heaven and earth both

👁️ Visible and invisible together

🚫 Nothing sits outside this plan

📖 Bigger than saving individuals alone

# Ephesians 1:11-14
# 🔏 Sealed With The Spirit
---
## 🏛️ Obtained An Inheritance

An inheritance is something passed down, usually after a death, that becomes permanently yours.

Believers are described here as having already obtained one, not merely hoping for one someday.

This inheritance is not land or money, it is a share in everything Christ has.

Paul will describe parts of that inheritance later in this same prayer.

🏛️ Inheritance means something passed down permanently

✅ Already obtained, not just hoped for

✝️ A share in what Christ has

📖 More is coming later in this prayer

## 🎯 Predestinated According To The Purpose Of His Own Will

Paul repeats predestinated here, the same word from earlier in this chapter.

This time he pairs it with purpose, underlining that none of this was random.

God's will is the final reason given, not human choice or merit.

The repetition is intentional, driving the same point home a second time.

🎯 Predestinated repeats from earlier in this chapter

🧭 Paired with purpose, not randomness

🙅 Not based on human merit

📖 God's will is the final reason

## 🏆 That We Should Be To The Praise Of His Glory

This phrase already appeared once in verse six, almost word for word.

Paul circles back to it again here on purpose.

The goal of salvation keeps returning to the same point, God receiving praise.

It is not a side note, it is the point Paul keeps returning to.

🏆 Repeats almost word for word from verse six

🔁 Paul circles back on purpose

🎯 Praise keeps being the goal

📖 Not a side note, the main point

## 🥇 Who First Trusted In Christ

First here points to Jewish believers, who heard and trusted the gospel before Gentiles did.

Paul, writing to a mostly Gentile church, acknowledges this order without ranking anyone above another.

The gospel reached the Jewish people first, then spread outward to the rest of the world.

That order mattered historically, even though both groups now share the same inheritance.

🥇 First points to Jewish believers

📜 The gospel reached them before Gentiles

🌍 It then spread outward to the world

📖 Both groups now share one inheritance

## 🔏 Sealed With That Holy Spirit Of Promise

A seal in the ancient world marked something as officially owned and protected.

Wax seals on letters and documents proved who sent them.

They also kept a document from being tampered with after it was sent.

The Holy Spirit works the same way in a believer's life, marking them as genuinely belonging to God.

Of promise means this sealing was exactly what God had already promised to do.

🔏 A seal marked official ownership

📜 Wax seals protected documents from tampering

🕊️ The Spirit marks believers this way

📖 Exactly what God had promised

## 💳 The Earnest Of Our Inheritance

Earnest means a deposit paid now as a guarantee that the rest is coming later.

A buyer in the ancient world might pay earnest money to secure a purchase before paying in full.

The Holy Spirit is that deposit, proof that the full inheritance is certain to arrive.

Believers are not left guessing whether the rest of the promise is real.

💳 Earnest means a guarantee deposit

🤝 Like securing a purchase before paying in full

🕊️ The Spirit is that deposit

📖 The rest of the promise is certain

## 🏠 The Redemption Of The Purchased Possession

Purchased possession describes believers themselves, bought and now belonging to God.

Redemption here looks forward, to a final rescue still waiting to happen.

Believers already belong to God, but the full freeing of that possession is still ahead.

This points forward to the resurrection and the final restoring of everything.

🏠 Purchased possession means believers themselves

🔮 Redemption here points to the future

⏳ Full freedom is still ahead

📖 Points forward to the resurrection

# Ephesians 1:15-19
# 🙏 Paul's Prayer For The Ephesians
---
## 🙏 Cease Not To Give Thanks For You

Cease not means Paul never stopped doing this, not even once.

He had heard good reports about their faith in Jesus and their love for other believers.

Paul turned that news directly into constant thanksgiving to God.

Good news about other Christians becomes fuel for prayer, not just a pleasant report.

🙏 Cease not means never stopped

📰 Good reports had reached Paul

🔁 News became thanksgiving, not just feeling

📖 Good news should fuel prayer

## 📝 Making Mention Of You In My Prayers

Mention here means Paul names them specifically when he prays, not a vague general blessing.

Paul had many churches to pray for, yet he still named Ephesus by name.

Being remembered by name in someone's prayers was a real mark of care in the ancient church.

This is the same pattern Paul shows in several of his other letters.

📝 Mention means named specifically

🏙️ Ephesus got named among many churches

❤️ A real mark of personal care

📖 A pattern Paul repeats elsewhere

## 🧠 The Spirit Of Wisdom And Revelation In The Knowledge Of Him

This is not a request for a different gift of the Holy Spirit than believers already have.

Paul is asking that the Spirit already living in them produce wisdom and revelation.

Wisdom means understanding how to live rightly.

Revelation means seeing clearly what was once hidden.

Both are aimed at one goal, knowing God himself better, not just knowing facts about him.

🧠 Not a different Spirit, the same one

📚 Wisdom means living rightly

💡 Revelation means seeing clearly

📖 Both aim at knowing God himself

## 👁️ The Eyes Of Your Understanding Being Enlightened

This pictures understanding as eyes that can either be shut or opened to see.

Enlightened means given light to see something that was dark before.

Paul is not praying for new facts, he is praying for the ability to truly grasp what is already true.

A person can hear the gospel many times and still need God to open their eyes to it.

👁️ Understanding pictured as eyes

💡 Enlightened means given light to see

🧠 Not new facts, deeper grasp

📖 God opens eyes to what is already true

## 🌅 The Hope Of His Calling

Hope here is not wishful thinking, it is a confident expectation of something certain.

Calling means the invitation God issued to belong to him.

The hope of his calling means everything that invitation guarantees for the future.

Paul wants their eyes opened specifically to see how certain that future really is.

🌅 Hope means confident expectation

📣 Calling means God's invitation

🔮 Points to a guaranteed future

📖 Paul wants their eyes opened to see it

## 💎 The Riches Of The Glory Of His Inheritance In The Saints

This flips the inheritance language from earlier, this time God is described as the one with an inheritance.

His inheritance in the saints means believers themselves are the treasure God values and will fully claim.

Riches of the glory stacks two words for abundance together, on purpose, to stress how great this is.

Believers are not just receiving an inheritance, they are also God's own prized possession.

💎 God is described as having an inheritance

👥 His inheritance is the saints themselves

✨ Riches of glory stresses sheer greatness

📖 Believers are God's prized possession

## 💪 The Exceeding Greatness Of His Power To Us Ward

Exceeding greatness means power beyond ordinary measurement, more than any comparison can capture.

To us ward is an old way of saying toward us, aimed in our direction.

Paul wants believers to grasp the size of the power that is actually working for them.

This is not abstract theology, it is the same power named in the next verse.

💪 Exceeding greatness means beyond measure

🧭 To us ward means toward us

🎯 Aimed at believers specifically

📖 The same power named next

## ⚡ According To The Working Of His Mighty Power

Working means power actually at work, not power sitting idle in theory.

Mighty power stacks two strong words together for emphasis, much like riches of the glory did earlier.

Paul is building toward naming exactly what this power accomplished, which comes in the very next verse.

The size of this power is about to be measured against something enormous.

⚡ Working means power actively at work

💪 Mighty power stacks words for emphasis

➡️ Points to what comes next

📖 About to be measured against something huge

# Ephesians 1:20-23
# 👑 Head Over All Things
---
## ⚰️ Raised Him From The Dead

This names the exact power Paul was just building up to in the previous verse.

Raising Jesus from death was not a small miracle among many others.

It proved death itself has no authority over him anymore.

Everything else Paul says about Christ's authority rests on this one fact.

⚰️ The power Paul was building toward

💀 Not a small miracle among others

🚫 Death has no authority over him

📖 Everything else rests on this fact

## 👑 Set Him At His Own Right Hand In The Heavenly Places

The right hand was the position of highest honor and authority next to a king.

Setting Jesus there means giving him the highest possible place of rule.

Heavenly places again describes the spiritual realm where Christ now reigns.

This is not a temporary honor, it is where Jesus permanently sits.

👑 Right hand means highest honor

🏛️ Jesus given the highest place of rule

🌌 Heavenly places is where he now reigns

📖 A permanent position, not temporary

## ⚔️ Far Above All Principality, And Power, And Might, And Dominion

These four words describe ranks of spiritual authority, some good and some evil.

Far above means Christ outranks every single one of them without exception.

Paul is likely addressing real spiritual beings the Ephesians' culture took very seriously.

Ephesus itself was known for occult practice and belief in many powerful spirits.

⚔️ Four words for spiritual ranks

📈 Far above means Christ outranks them all

👻 Likely real spiritual beings

📖 Ephesus took these beliefs seriously

## 🌌 Every Name That Is Named, Not Only In This World, But Also In That Which Is To Come

Every name that is named covers any title or power anyone could ever hold.

This world covers the present age, right now.

That which is to come covers the future, including the age after this one ends.

Nothing in any time period outranks Christ.

🌌 Covers every title or power

🌍 This world means the present age

🔮 That which is to come means the future

📖 Nothing outranks Christ in any era

## 🦶 Put All Things Under His Feet

Putting something under someone's feet was an ancient picture of total defeat and submission.

Victorious kings were sometimes shown with conquered enemies literally under their feet.

This phrase declares that everything now answers to Christ.

That authority is already settled, even though it does not always look finished yet.

🦶 Under the feet pictures total defeat

👑 Victorious kings used this same image

🌍 Everything now answers to Christ

📖 Already settled, even if not fully visible yet

## ⛪ The Head Over All Things To The Church

Head means source and authority, the part that directs and gives life to the rest.

Paul narrows the focus here from all creation down to one specific group, the church.

Christ rules over everything in the universe, but he relates to the church in a closer, more personal way.

The church gets a relationship with this authority that the rest of creation does not.

⛪ Head means source and authority

🔍 Narrows from all creation to the church

❤️ A closer relationship than the rest of creation

📖 The church is uniquely connected to him

## 🌊 Which Is His Body, The Fulness Of Him That Filleth All In All

Calling the church his body means it is not just an organization Christ leads from a distance.

It is connected to him the way a body is connected to its head, alive and inseparable.

Fulness means the complete expression of something, with nothing missing.

Filleth all in all means Christ's presence reaches into every single part of it.

This chapter began with Christ far above every power and ends with him intimately joined to his church.

🌊 The church is his body, not distant

🔗 Connected like a body to its head

✨ Fulness means complete, nothing missing

📖 Begins with power above, ends with closeness
`.trim();

export const EPHESIANS_ONE_PERSONAL_SECTIONS = parseEphesiansOneRawNotes(EPHESIANS_ONE_RAW_NOTES);
