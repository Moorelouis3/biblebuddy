export type FirstPeterTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstPeterTwoRawNotes(rawText: string): FirstPeterTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstPeterTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstPeter\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Peter 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstPeter\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstPeter\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Peter 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Peter 2:${startVerse}` : `1 Peter 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 First Peter 2 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_PETER_TWO_RAW_NOTES = `# FirstPeter 2:1-3
# 💔 Laying Aside All Malice, And All Guile
---
## 💔 Laying Aside All Malice, And All Guile

"Malice" means a settled desire to see someone else hurt.

"Guile" means using lies or tricks to get your way.

Peter lists these first because they quietly ruin a church family.

Think of them like dirty clothes already taken off.

You do not put dirty clothes back on once removed.

New life in Christ works the same way with old habits.

💔 Malice means wanting someone hurt
🎭 Guile means lying to get your way
👕 Peter pictures them as removed clothes
📖 Old habits do not go back on

## 🎭 Hypocrisies, And Envies, And All Evil Speakings

"Hypocrisy" means saying one thing and feeling another inside.

"Envy" means resenting someone else for what they have.

"Evil speaking" means tearing another person down with words.

Peter groups these three together on purpose.

Each one quietly destroys trust inside a community.

A church full of fakers and gossips cannot function as one body.

🎭 Hypocrisy means faking what you feel
👀 Envy means resenting what someone has
🗣️ Evil speaking tears another person down
📖 All three destroy trust in community

## 👶 As Newborn Babes, Desire The Sincere Milk Of The Word

Peter compares new believers to babies just born.

A newborn wants milk without being taught to want it.

The desire is automatic and urgent from the very first day.

"Sincere" means pure, with nothing mixed in to water it down.

The "word" here is the same gospel message from chapter one.

A healthy new believer craves it the same way a baby craves milk.

👶 Peter compares believers to newborn babies
🍼 A baby wants milk without teaching
🧪 Sincere means pure with nothing mixed in
📖 New believers should crave the word

## 🌱 That Ye May Grow Thereby

Babies do not drink milk for no reason.

Milk is how a newborn grows strong enough for everything else.

Reading and hearing God's word works the same way for a believer.

It is not a box to check once and move past.

It is the ongoing food that produces real spiritual growth.

Skipping it leaves a believer stuck at the same immature stage.

🍼 Milk exists to make a baby grow
🌱 God's word produces spiritual growth
🔁 Ongoing food, not a one time task
📖 Skipping it stalls spiritual growth

## 👅 If So Be Ye Have Tasted That The Lord Is Gracious

Peter assumes his readers already experienced God's kindness firsthand.

"Tasted" points to a real experience, not a theory someone was taught.

Once something good is truly tasted, people want more of it.

That same hunger should now drive the desire for God's word.

Peter is not asking them to manufacture desire from nothing.

He is reminding them of a hunger they should already have.

👅 Tasted means a real experience
🍯 Tasting something good creates more hunger
🙏 That hunger should drive desire for scripture
📖 Peter reminds instead of demanding desire

# FirstPeter 2:4-8
# 🧱 Coming, As Unto A Living Stone
---
## 🧱 Coming, As Unto A Living Stone

Peter moves from a picture of milk to a picture of a building.

A living stone sounds like a contradiction on purpose.

Stones are not alive, but Jesus is called one anyway.

He is the one stone this entire building rests on.

Coming to him is not a single visit.

It happens again and again, every day.

🧱 Peter moves from milk to building
🪨 A living stone is a contradiction
✝️ Jesus is the stone everything rests on
📖 Coming to him happens again and again

## 🚫 Disallowed Of Men, But Chosen Of God, And Precious

"Disallowed" means rejected, like a stone a builder inspects and throws out.

Jesus faced that exact rejection from the religious leaders of his own day.

God's verdict on him was the opposite of theirs.

God called him chosen and precious, the stone the building needed.

Human rejection and God's approval are not the same measurement.

🚫 Disallowed means rejected by a builder
👥 Religious leaders rejected Jesus
💎 God called him chosen and precious
📖 Human rejection and God's verdict differ

## 🏠 Ye Also, As Lively Stones, Are Built Up A Spiritual House

Peter now applies the picture to every believer, not only Jesus.

"Lively stones" means living stones, the same word used for Jesus above.

Each believer is one stone fitted into something larger.

That larger structure is called a spiritual house.

No single stone in this house stands alone.

🧱 Peter applies the picture to believers
💚 Lively means living, the same word as before
🏠 Each believer is a stone in God's house
📖 No stone in this house stands alone

## 🙏 An Holy Priesthood, To Offer Up Spiritual Sacrifices

In the Old Testament, only priests from Levi could offer sacrifices.

Peter says every believer in this new house is now a priest.

"Spiritual sacrifices" are not animals on an altar anymore.

They are things like prayer, praise, and a life lived for God.

Access to God no longer runs through one family.

🐑 Only Levite priests once offered sacrifices
🧎 Every believer is now a priest
🙏 Spiritual sacrifices means prayer and praise
📖 Access to God runs through no family

## 📐 Behold, I Lay In Sion A Chief Corner Stone, Elect, Precious

Peter quotes directly from the prophet Isaiah here.

"Sion" is another name for Jerusalem, God's chosen city.

A "chief corner stone" sets the alignment for an entire building.

Every other stone gets measured and squared against it.

"Elect" means chosen on purpose, not picked by accident.

📜 Peter quotes the prophet Isaiah
🏙️ Sion is another name for Jerusalem
📐 A corner stone sets the alignment
📖 Elect means chosen on purpose

## 🪨 He That Believeth On Him Shall Not Be Confounded

"Confounded" means put to shame or left disappointed.

The promise here is simple.

Trust in this stone and that trust will hold.

A building lined up against a true corner stone does not collapse.

The same security applies to a person whose faith rests on Christ.

😳 Confounded means put to shame
🪨 Trust in this stone will hold
🏗️ A true corner stone will not fail
📖 Faith in Christ carries that security

## 💎 Unto You Therefore Which Believe He Is Precious

Peter now splits his readers into two groups by their response to Jesus.

The first group believes, and to them Christ is treasured.

"Precious" repeats the exact word used for him back in verse four.

What one person treasures, another can walk past without noticing.

The value never changes.

Only the response to him does.

➗ Peter splits readers by response
💎 Believers find Christ precious
🔁 Precious repeats the word from verse four
📖 The value stays, only response changes

## 🏗️ The Stone Which The Builders Disallowed Is Made The Head Of The Corner

This line quotes Psalm 118, a psalm Jesus once quoted about himself.

The builders here picture the religious leaders who examined and rejected Jesus.

"The head of the corner" means the most important stone in the structure.

The very stone they threw out became the one everything depends on.

God's plan often overturns a verdict human experts feel certain about.

📜 This quotes Psalm 118 directly
👥 Builders picture the religious leaders
🏗️ Head of the corner means most important
📖 God overturned their rejection completely

## 🧱 A Stone Of Stumbling, And A Rock Of Offence

The same stone that holds up the building trips up those who reject it.

"Stumbling" and "offence" both describe someone tripped up by resistance.

Jesus does not change depending on who looks at him.

For some he is the foundation.

For others he is the obstacle.

The stone stays the same.

Only the response decides which it becomes.

🧱 The same stone holds and trips
🚧 Stumbling means tripped up by resistance
➰ Jesus never changes based on the viewer
📖 The response decides foundation or obstacle

## ❓ Whereunto Also They Were Appointed

This phrase has caused real disagreement among careful readers.

It does not mean God forced anyone to reject Christ.

It means God's warning was written long before it happened.

Rejecting the stone was always going to lead to stumbling.

The outcome itself was appointed.

The choice to reject was still theirs.

❓ This phrase has real disagreement
🚫 God did not force the rejection
📜 The warning was written long before
📖 The outcome was appointed, choice stayed theirs

# FirstPeter 2:9-10
# 👑 Ye Are A Chosen Generation, A Royal Priesthood
---
## 👑 Ye Are A Chosen Generation, A Royal Priesthood

Peter gives his readers four titles in a row, borrowed from Israel's identity.

"Chosen generation" means a people God selected on purpose.

"Royal priesthood" combines two roles that used to belong to separate people.

Kings and priests were separate offices under the Old Testament law.

Every believer now carries both identities at once.

👑 Chosen generation means selected on purpose
🧎 Royal priesthood combines two old offices
⚔️ Kings and priests used to be separate
📖 Believers now carry both at once

## ✂️ An Holy Nation, A Peculiar People

"Holy" means set apart for a different purpose than everyone else.

"Nation" describes a whole people group, not scattered individuals.

"Peculiar" does not mean strange in the modern sense of the word.

It means belonging specifically to someone, like treasured personal property.

God is describing a people who belong only to him.

✂️ Holy means set apart for a purpose
🌍 Nation means a whole people group
💰 Peculiar means treasured personal property
📖 This people belongs to God uniquely

## 👀 That Ye Should Shew Forth The Praises Of Him

None of these titles exist for the believer's own comfort.

They exist for a purpose stated in the same sentence.

"Shew forth" means to put something on display for others to see.

A royal priesthood exists to make God's praise visible to others.

Identity in Christ always comes with a job attached.

🎯 These titles come with a purpose
👀 Shew forth means put on display
🌍 The priesthood makes praise visible to others
📖 Identity always comes with a job

## 🌑 Called You Out Of Darkness Into His Marvellous Light

"Darkness" here describes life lived without knowing God at all.

It is not only sin.

It is confusion about who God even is.

"Marvellous light" describes the opposite, a clear view of God.

The word "called" means God made the first move.

No one wanders into this light by accident.

🌑 Darkness means life without knowing God
❓ It includes confusion, not only sin
🌞 Marvellous light means a clear view of God
📖 God made the first move

## 🌍 In Time Past Were Not A People, But Are Now The People Of God

Many of Peter's readers were Gentiles, not born into Israel's covenant.

By Jewish standards, they had no old claim to being God's people.

Peter borrows language from the prophet Hosea about Israel's own restoration.

He applies that same restoration language to Gentile believers now.

Belonging to God was never limited to one bloodline.

🌍 Many readers were Gentiles, not Israelites
🚫 They had no old claim to God
📜 Peter borrows language from the prophet Hosea
📖 Belonging to God was never one bloodline

## 🎁 Had Not Obtained Mercy, But Now Have Obtained Mercy

"Mercy" means receiving kindness that was never deserved or earned.

Peter repeats the phrase "obtained mercy" twice on purpose.

The repetition marks a clean before and after in his readers' lives.

Nothing about them changed their own eligibility for mercy.

God's mercy was the only thing that moved.

🎁 Mercy means undeserved kindness
🔁 Peter repeats the phrase on purpose
⏳ It marks a clear before and after
📖 Only God's mercy moved, not their worth

# FirstPeter 2:11-12
# 🙏 I Beseech You As Strangers And Pilgrims
---
## 🙏 I Beseech You As Strangers And Pilgrims

"Beseech" means a serious personal appeal, stronger than a simple suggestion.

"Strangers" describes someone living outside their true home country.

"Pilgrims" describes someone only passing through on the way somewhere else.

Peter reminds his readers where their real citizenship actually is.

This world was never meant to be their permanent address.

🙏 Beseech means a serious personal appeal
🌍 Strangers means living outside your true home
🚶 Pilgrims means only passing through
📖 This world is not the permanent address

## ⚔️ Abstain From Fleshly Lusts, Which War Against The Soul

"Abstain" means a deliberate choice to stay away from something.

"Fleshly lusts" means desires that come from the body, not God's will.

Peter pictures these desires as soldiers fighting the soul.

This is not a minor annoyance.

It is open warfare.

A pilgrim in enemy territory cannot afford to relax.

🚫 Abstain means a deliberate choice to resist
🔥 Fleshly lusts come from the body
⚔️ Peter pictures them as soldiers at war
📖 A pilgrim cannot afford to relax

## 🗣️ Having Your Conversation Honest Among The Gentiles

"Conversation" in this older English means a person's whole way of life.

It is a much wider word than just spoken words.

"Honest" here means visibly good, not merely technically truthful.

"Gentiles" refers to the non believers watching these Christians every day.

A believer's daily conduct was their most visible sermon.

🗣️ Conversation here means a whole way of life
✅ Honest means visibly good, not just truthful
👀 Gentiles are the watching non believers
📖 Daily conduct was the most visible sermon

## 📅 They May By Your Good Works Glorify God In The Day Of Visitation

Some neighbors were calling these Christians evildoers, based on rumor alone.

Peter does not tell his readers to argue the point.

He tells them to let consistent good works answer instead.

"The day of visitation" points to a moment God's work becomes clear.

Good works will not always win an argument.

They can still change a verdict.

🗣️ Neighbors were calling them evildoers
🤐 Peter says let good works answer
📅 Day of visitation means God's work turns clear
📖 Good works can still change a verdict

# FirstPeter 2:13-17
# 🙇 Submit Yourselves To Every Ordinance Of Man For The Lord's Sake
---
## 🙇 Submit Yourselves To Every Ordinance Of Man For The Lord's Sake

"Submit" means placing yourself willingly under another's authority.

"Ordinance of man" describes human laws and governing structures.

The motive clause matters as much as the command.

Peter says to do this for the Lord's sake.

Not because every ruler personally deserves it.

Honoring God can mean honoring a flawed system.

🙇 Submit means placing yourself under authority
📜 Ordinance of man means human law
🎯 The motive given is for the Lord's sake
📖 Honoring God can mean honoring a flawed system

## 🏛️ Whether It Be To The King, As Supreme

Peter was writing under the rule of Rome, not a Christian government.

"The king" here likely points to the Roman emperor of that day.

"Supreme" acknowledges his authority at the top of the human chain.

Peter is not saying the emperor outranks God.

He is saying the emperor still holds a real place under God.

🏛️ Peter wrote under Roman rule
👑 The king likely means the Roman emperor
⛓️ Supreme means top of the human chain
📖 The emperor's place is real, not above God

## 🏢 Unto Governors, As Unto Them That Are Sent By Him

Governors were the regional officials appointed under the emperor's authority.

"Sent by him" describes their actual job under Roman law.

Their stated purpose was punishing evildoers and rewarding good behavior.

Peter treats that job description as something worth respecting.

Government, even a flawed one, still serves a real purpose.

🏢 Governors were regional Roman officials
📋 Sent by him describes their job
⚖️ Their purpose was punishing evil, rewarding good
📖 Government still serves a real purpose

## 🔁 With Well Doing Ye May Put To Silence The Ignorance Of Foolish Men

Some people were spreading false, ignorant accusations about these Christians.

Peter's strategy here is not a public argument or a legal defense.

"Well doing" means a consistent pattern of visible good behavior.

A consistent pattern is harder to argue against than a single rumor.

Quiet, repeated goodness can shut a loud accusation down.

🗣️ Some spread false, ignorant accusations
🤐 Peter's answer is not an argument
🔁 Well doing means a consistent pattern
📖 Quiet goodness can outlast loud rumor

## 🕊️ As Free, And Not Using Your Liberty For A Cloke Of Maliciousness

Peter reminds his readers that their freedom in Christ is real.

"Cloke" means a cover used to hide something else underneath.

"Maliciousness" repeats the same word for harmful intent from verse one.

Some could twist Christian freedom into an excuse for bad behavior.

Real freedom in Christ is never a disguise for doing whatever you want.

🕊️ Christian freedom is real and genuine
🧥 Cloke means a cover for something else
💔 Maliciousness repeats the word from verse one
📖 Freedom is never a disguise for harm

## 🌍 Honour All Men. Love The Brotherhood. Fear God. Honour The King

Peter closes this section with four short commands fired in a row.

Each command points to a separate relationship a believer must manage.

"Honour all men" covers the general public, even total strangers.

"Love the brotherhood" is reserved specifically for fellow believers.

"Fear God" outranks every other command on this list.

"Honour the king" comes last, placed under God, not above him.

🌍 Honour all men covers total strangers
🤝 Love the brotherhood means fellow believers
👑 Fear God outranks every command here
📖 Honour the king comes last, under God

# FirstPeter 2:18-20
# 🏠 Servants, Be Subject To Your Masters With All Fear
---
## 🏠 Servants, Be Subject To Your Masters With All Fear

"Servants" here translates a Greek word often used for household workers.

Ancient household slavery differed from later chattel slavery.

It was still part of an unjust system.

Peter addresses the real situation his readers were living in.

"With all fear" means a deep, respectful seriousness, not constant terror.

Peter gives guidance for a hard system.

He does not call that system good.

🏠 Servants translates a word for workers
📜 Peter addresses a real, hard situation
😟 With all fear means serious respect
📖 Guidance for a system, not approval

## 😠 Not Only To The Good And Gentle, But Also To The Froward

"Froward" means stubborn, harsh, and difficult to please.

It would be easy to respect a kind master.

Peter specifically calls out respecting a harsh one too.

The real test of character shows up with the difficult person.

Anyone can manage patience when patience costs nothing.

😠 Froward means harsh and difficult
😊 Respecting a kind master is easy
🧪 The real test is the harsh master
📖 Patience costs nothing with easy people

## ✅ This Is Thankworthy, If A Man For Conscience Toward God Endure Grief

"Thankworthy" means something God actually notices and approves.

"Conscience toward God" means an awareness that God himself is watching.

"Endure grief" describes suffering something painful without giving up.

The motive matters as much as the suffering itself.

Enduring hardship simply because God sees it changes its meaning.

✅ Thankworthy means something God approves
👁️ Conscience toward God means knowing he watches
😢 Endure grief means suffering without giving up
📖 The motive changes the meaning of suffering

## 👊 What Glory Is It, If Ye Be Buffeted For Your Faults

"Buffeted" means struck or beaten, a harsh physical punishment.

Peter asks a pointed, rhetorical question here.

If someone is punished because they did wrong, that teaches nothing special.

Anyone, believer or not, can take deserved punishment without complaint.

Peter is building toward a much higher standard.

👊 Buffeted means struck or beaten
❓ Peter asks a pointed rhetorical question
⚖️ Deserved punishment teaches nothing special
📖 He is building toward a higher standard

## ❤️ If Ye Do Well, And Suffer For It, This Is Acceptable With God

Here is the higher standard Peter has been building toward.

Suffering for doing right is harder to accept.

Suffering for doing wrong is easy to accept.

"Acceptable" means something God receives with favor, not mere permission.

This verse sets up Christ's own example in the next section.

🎯 This is the higher standard Peter builds to
😣 Suffering for doing right is harder to accept
❤️ Acceptable means received with God's favor
📖 This sets up Christ's example next

# FirstPeter 2:21-25
# 🔗 Christ Also Suffered For Us, Leaving Us An Example
---
## 🔗 Christ Also Suffered For Us, Leaving Us An Example

"Hereunto were ye called" points back to the unjust suffering Peter just described.

Christ suffered to save his readers.

He also suffered to show them exactly how to suffer well.

"Example" means a pattern laid down to be copied.

Peter now walks through that pattern verse by verse.

🔗 Hereunto points back to unjust suffering
✝️ Christ suffered both to save and show
📐 Example means a pattern to be copied
📖 Peter now walks through that pattern

## 📜 Who Did No Sin, Neither Was Guile Found In His Mouth

This line quotes directly from Isaiah's prophecy about the suffering servant.

"No sin" covers every action Christ ever took, without exception.

"No guile" covers every word Christ ever spoke, even under pressure.

Most people guard their actions but slip with their words when cornered.

Christ's integrity held in both places at once.

📜 This quotes Isaiah's suffering servant prophecy
✅ No sin covers every action
🗣️ No guile covers every word
📖 His integrity held in both places

## 🗣️ When He Was Reviled, Reviled Not Again

"Reviled" means insulted or mocked with cruel words.

The natural instinct is to fire back an insult of equal size.

Christ had every verbal weapon available and chose not to use it.

"When he suffered, he threatened not" extends that same restraint to physical pain.

Silence here was not weakness.

It was complete self control.

🗣️ Reviled means insulted with cruel words
🔥 The instinct is to fire back equally
🤐 Christ chose silence instead
📖 Silence here meant control, not weakness

## 🤲 He Committed Himself To Him That Judgeth Righteously

"Committed" means handing something over completely and trusting it there.

Christ did not demand justice from the people mistreating him.

He handed the whole situation over to God the Father instead.

"Judgeth righteously" means God's verdict is always fair, unlike a human one.

Letting go of the need to settle the score is its own form of trust.

🤲 Committed means handing something over fully
🚫 Christ did not demand justice himself
⚖️ Judgeth righteously means God's verdict is fair
📖 Letting go of the score is trust

## ⚖️ Who His Own Self Bare Our Sins In His Own Body On The Tree

"His own self" emphasizes that no one else could carry this weight.

"Bare our sins" means he carried guilt and penalty that belonged to someone else.

"The tree" is Peter's word for the cross, borrowed from Deuteronomy.

This single line sits at the center of the whole passage.

Everything before it was about enduring suffering.

This is about taking it on in someone else's place.

👤 No one else could carry this
⚖️ Bare our sins means carrying someone else's guilt
🌳 The tree is Peter's word for the cross
📖 This line is the center of the passage

## 🩸 By Whose Stripes Ye Were Healed

"Stripes" means the wounds left by a whip.

That whip was part of the beating Christ took.

This line quotes Isaiah 53 almost word for word.

"Healed" points past the physical, toward sin's damage.

The wounds on him became the source of wholeness.

His injury purchased their healing.

🩸 Stripes means wounds from a whip
📜 This quotes Isaiah 53 almost directly
🩹 Healed points past the physical, to sin
📖 His injury purchased their healing

## 🐑 Ye Were As Sheep Going Astray

Sheep are famously bad at finding their own way back once lost.

They wander gradually, one step at a time.

They rarely notice the drift until they are already far away.

"Going astray" describes exactly that kind of slow, unnoticed drift.

Peter is not describing one dramatic rebellion.

He is describing the quiet way people drift without meaning to.

🐑 Sheep are bad at finding their way
🚶 They wander gradually, one step at a time
🌀 Astray describes a slow, unnoticed drift
📖 Drift is often quiet, not dramatic

## 🧑‍🌾 Now Returned Unto The Shepherd And Bishop Of Your Souls

A lost sheep cannot find its own way home.

Someone has to go out and find it instead.

"Shepherd" describes the one who actively searches and brings it back.

"Bishop" here means overseer, the one who watches over them now.

The chapter opened with newborn babies and closes with found sheep.

Both pictures describe the same thing, a life now cared for.

🐑 A lost sheep cannot find its way
🧑‍🌾 Shepherd means the one who searches
👁️ Bishop means the one who watches now
📖 The chapter opened with babies, closed with sheep
`.trim();

export const FIRST_PETER_TWO_PERSONAL_SECTIONS = parseFirstPeterTwoRawNotes(FIRST_PETER_TWO_RAW_NOTES);
