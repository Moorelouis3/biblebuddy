export type ActsThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsThirteenRawNotes(rawText: string): ActsThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 13:${startVerse}` : `Acts 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Acts 13 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_THIRTEEN_RAW_NOTES = `# Acts 13:1-3
# 🙌 Set Apart For The Work
---
## 📜 Prophets And Teachers

Prophets spoke messages directly from God to the gathered church.

Teachers explained and applied scripture that already existed.

The church at Antioch had several of both kinds of leaders at once.

This mix of gifts shows the church was not run by one person alone.

📜 Prophets delivered fresh messages from God
📚 Teachers explained existing scripture
👥 Antioch had several leaders at once
➡️ Leadership was shared, not centered on one man

## 🖤 Simeon That Was Called Niger

Niger is a Latin word that means black.

This nickname likely marked Simeon as a man of African descent.

The church at Antioch already crossed ethnic lines within its first years.

The gospel was never limited to one people group.

🖤 Niger means black in Latin
🌍 Simeon was likely of African descent
⛪ Antioch's church already crossed ethnic lines
📖 The gospel reached every people group early

## 🌍 Lucius Of Cyrene

Cyrene was a city on the coast of North Africa, in what is now Libya.

It had a large Jewish population, far from Jerusalem.

Men from Cyrene appear more than once in the book of Acts.

One of them helped first preach to Greeks back in Antioch.

Lucius now helps send missionaries out from that very same church.

🌍 Cyrene sat on the coast of North Africa
📚 It held a large Jewish population
🔥 A Cyrenian once first preached to Greeks there
📖 Lucius now helps send missionaries from Antioch

## 👑 Manaen, Which Had Been Brought Up With Herod The Tetrarch

A tetrarch ruled one quarter of a larger kingdom under Rome's authority.

This Herod was Herod Antipas, the same ruler who later executed John the Baptist.

"Brought up with" describes a close childhood companion raised alongside royalty.

Manaen grew up inside Herod's own court, yet chose a very different path.

👑 A tetrarch ruled one quarter of a kingdom
⚔️ This Herod later executed John the Baptist
🏛️ Manaen was raised inside Herod's own court
➡️ He chose faith over a life at court

## 🗣️ The Holy Ghost Said, Separate Me Barnabas And Saul

The Holy Ghost spoke directly and plainly to the gathered leaders.

This was not a vague feeling or a private hunch one person claimed alone.

Several leaders apparently heard and recognized the same call together.

God had already chosen Barnabas and Saul before the church ever voted on it.

🗣️ The Spirit spoke directly to the group
👥 Several leaders recognized the same call
🙌 Barnabas and Saul were set apart by name
📖 God's choice came before the church's decision

## 🙏 Laid Their Hands On Them

Laying on hands was a physical act of blessing and public endorsement.

It did not create the calling, because God had already done that.

The gesture showed that the whole church agreed with God's decision.

An inward call was now matched by a visible, public sending.

🙏 Laying on hands was a public blessing
✅ It did not create their calling
🤝 The church agreed with what God chose
➡️ An inner call became a public sending

## 🕊️ Being Sent Forth By The Holy Ghost

Luke credits the Holy Ghost, not the church leaders, as the one who sent them out.

This trip became the first organized missionary journey recorded in the New Testament.

Antioch, not Jerusalem, became the launching point for reaching the wider world.

A single act of obedience in one city changed how the gospel would spread for centuries.

🕊️ The Holy Ghost is credited as the sender
🚀 This began the first organized mission trip
🏙️ Antioch became the launching point, not Jerusalem
📖 One sent trip changed history for centuries

# Acts 13:4-5
# ⛵ To Cyprus
---
## ⚓ Departed Unto Seleucia

Seleucia was the main seaport serving the city of Antioch.

Antioch itself sat inland, so travelers had to reach this port first.

From here, ships could sail out across the open Mediterranean Sea.

The missionaries' very first step was an ordinary walk to a dock.

⚓ Seleucia was Antioch's seaport
🚶 Antioch itself sat inland from the coast
🌊 Ships launched into the Mediterranean from here
➡️ Even God's mission starts with ordinary steps

## 🏝️ Sailed To Cyprus

Cyprus was a large island in the eastern Mediterranean Sea.

It was also Barnabas's home island, the place he grew up.

Taking the gospel to Cyprus first was a natural and personal choice for him.

God often sends people first to the places and people they already know.

🏝️ Cyprus was a large island nation
🏠 It was Barnabas's home island
❤️ The choice was personal for him
📖 God often sends us where we already belong

## 🕍 Preached The Word Of God In The Synagogues

A synagogue was a Jewish gathering place for prayer and teaching.

Visiting teachers were often invited to speak after the regular reading.

Paul and Barnabas used this same open door in almost every town they entered.

Starting with people who already knew the scriptures was not avoidance.

It was strategy.

🕍 Synagogue means a Jewish gathering place
🎤 Visiting teachers were often invited to speak
🚪 Paul and Barnabas used this open door often
📖 Starting with the familiar was strategy, not avoidance

## 📜 They Had Also John To Their Minister

This John is John Mark, the same man whose mother's house appeared back in Acts twelve.

"Minister" here means a helper or attendant, not a modern church pastor.

John Mark likely handled practical travel needs so Paul and Barnabas could focus on preaching.

A quiet helper's role in this verse later grows into writing an entire Gospel.

📜 This is John Mark from Acts twelve
🛠️ Minister here means a helper, not a pastor
🎒 He likely handled practical travel needs
📖 A quiet helper later wrote a whole Gospel

# Acts 13:6-12
# 🔮 Elymas The Sorcerer
---
## 🔮 A Certain Sorcerer, A False Prophet, A Jew, Whose Name Was Barjesus

A sorcerer practiced magic and claimed secret knowledge of hidden things.

Rome and local courts often kept such men close as advisors.

Barjesus means son of Jesus, using an Aramaic word for Jesus that is really the name Joshua.

This man carried the very name of salvation while standing against it.

🔮 A sorcerer claimed secret, hidden knowledge
🏛️ Such men were often kept as advisors
📛 Barjesus means son of Jesus
➡️ He carried that name while opposing it

## 🏛️ The Deputy Of The Country, Sergius Paulus

"Deputy" is the King James word for a Roman proconsul, the governor of a province.

Sergius Paulus was a real historical figure, not an invented character.

Ancient inscriptions found on Cyprus name an actual Roman official by this same name.

Luke's history checks out against evidence outside the Bible itself.

🏛️ Deputy means a Roman proconsul, or governor
📜 Sergius Paulus was a real historical figure
🪨 Ancient inscriptions on Cyprus confirm his name
📖 Luke's history matches evidence outside scripture

## 🧠 A Prudent Man

Prudent means wise and careful in making decisions.

Sergius Paulus was open minded enough to invite Paul and Barnabas to speak at all.

His good judgment is exactly why Elymas worked so hard to stop him.

A wise man was the real target of this entire spiritual battle.

🧠 Prudent means wise and careful
🚪 Sergius Paulus welcomed Paul and Barnabas
⚔️ His good judgment threatened Elymas directly
📖 A wise man was the real target here

## 🏷️ So Is His Name By Interpretation

"Elymas" was not Barjesus's birth name, it was his professional title as a magician.

The word likely comes from an Arabic or Aramaic term for a wise man or magician.

Luke pauses the story just to translate this title for his readers.

Even small narrator details like this one are meant to be understood, not skipped past.

🏷️ Elymas was a title, not his birth name
📚 It likely meant wise man or magician
✍️ Luke paused the story to translate it
📖 Even small details deserve a plain explanation

## ⚔️ Withstood Them, Seeking To Turn Away The Deputy From The Faith

Withstood means he actively opposed and resisted them, not just disagreed quietly.

Elymas saw real political danger in losing his access to Sergius Paulus.

If the deputy believed, Elymas would likely lose his position and his income.

Spiritual opposition is sometimes really about protecting worldly power and money.

⚔️ Withstood means active, open resistance
💰 Elymas feared losing his position and income
🚪 His whole influence depended on access to power
📖 Spiritual fights often hide a fight over money

## 📛 Who Also Is Called Paul

Saul already had both a Hebrew name and a Roman name before this moment.

"Saul" was his Jewish name, and "Paul" was his Roman name, used among Gentiles.

Luke simply starts using the Roman name here because the story now moves into the Gentile world.

This was not a religious name change, since Paul's old name is used again later too.

📛 Saul already had two names, Hebrew and Roman
🌍 Paul was the name used among Gentiles
🔄 Luke switches names as the mission shifts
📖 This was never a religious name change

## 🕊️ Filled With The Holy Ghost, Set His Eyes On Him

Paul did not rely on his own cleverness to face this confrontation.

Being filled with the Spirit meant God's power was working through him in that moment.

"Set his eyes on him" describes an intense, unflinching stare.

Paul looked straight at the real spiritual danger instead of looking away from it.

🕊️ Paul relied on the Spirit, not cleverness
👁️ He fixed an intense stare on Elymas
🧍 This was courage, not natural boldness alone
📖 Real power came from God, not Paul himself

## 🐍 O Full Of All Subtilty And All Mischief, Thou Child Of The Devil

"Subtilty" is an old word for cunning and deceitful cleverness.

Paul's words here echo language Jesus once used against religious leaders who opposed Him.

Calling someone a child of the devil was the strongest possible spiritual accusation available.

Paul named the real source behind Elymas's opposition instead of debating him politely.

🐍 Subtilty means cunning, deceitful cleverness
⚡ Jesus once used this same kind of language
⚠️ Child of the devil was the strongest charge
📖 Paul named the real source behind the resistance

## 🌀 Wilt Thou Not Cease To Pervert The Right Ways Of The Lord

"Pervert" here means to twist or distort something, not its modern sexual meaning.

Elymas was not merely wrong, he was actively bending truth for his own gain.

Paul confronts him with a direct question, not a gentle suggestion.

Sin that twists what is true never stays neutral, it actively works against others.

🌀 Pervert means to twist or distort truth
🎯 Elymas was actively bending truth, not just wrong
❓ Paul asked a direct question, not a suggestion
📖 Twisted truth never stays neutral for long

## 👁️ Thou Shalt Be Blind, Not Seeing The Sun For A Season

This judgment was a direct, physical sign matching Elymas's spiritual blindness.

"For a season" means for a limited time, not forever.

The blindness was meant to correct him, not simply destroy him.

God's discipline here still carried a door back open, even in judgment.

👁️ The blindness matched his spiritual condition
⏳ For a season means a limited time
🔧 This judgment aimed to correct, not destroy
📖 Even God's discipline left a door open

## 🌫️ There Fell On Him A Mist And A Darkness

Luke describes two separate stages, a mist first and then full darkness.

This slow, physical darkening may have grown gradually instead of happening all at once.

Elymas needed someone to lead him by the hand immediately afterward.

The sorcerer who once controlled others now depended completely on their help.

🌫️ A mist came first, then full darkness
⏱️ The blindness likely grew gradually, not instantly
🤲 Elymas needed someone to guide him by hand
➡️ The controller now depended on others completely

## 🎯 Believed, Being Astonished At The Doctrine Of The Lord

Sergius Paulus is the one who actually mattered in this whole confrontation.

Elymas tried to block him, and the opposite happened instead.

"Astonished" describes complete amazement, not calm, polite interest.

The real target of the enemy's attack became the actual convert in the end.

🎯 Sergius Paulus was the real target all along
🔄 The opposition backfired completely
😲 Astonished means complete amazement, not mild interest
📖 The intended victim became the actual convert

# Acts 13:13-16
# 🏛️ Arrival In Pisidian Antioch
---
## ⛵ Paul And His Company Loosed From Paphos

"Loosed" is an old nautical word meaning they set sail.

Notice the company is now called Paul's, not Barnabas's, for the first time.

This small shift in wording quietly signals a change in who leads the mission.

Barnabas still travels with Paul, but the spotlight has started to move.

⛵ Loosed means they set sail
🔄 The group is now called Paul's company
👥 Leadership was quietly shifting toward Paul
📖 A small wording change signals a real shift

## 🗺️ Came To Perga In Pamphylia

Pamphylia was a coastal region in what is now southern Turkey.

Perga sat a short distance inland from the coast along a river.

This was simply the next practical stop on their journey north.

Even famous missionary journeys were made up of small, ordinary legs like this one.

🗺️ Pamphylia was a region in modern Turkey
🏞️ Perga sat inland along a river
➡️ This was one ordinary stop on the journey
📖 Great journeys are built from small, plain steps

## 🚶 John Departing From Them Returned To Jerusalem

This John is John Mark, the helper mentioned earlier in the chapter.

Luke records his leaving without stating a reason here.

Chapter fifteen later reveals that this departure became a real point of conflict between Paul and Barnabas.

A quiet, one line exit in this verse grows into a much bigger story later.

🚶 John Mark left the mission here
❓ Luke gives no reason for his leaving
⚡ This later caused real conflict in chapter fifteen
📖 A small detail here grows into something bigger

## 🏙️ Antioch In Pisidia

This city shares a name with the Antioch the missionaries just left in Syria.

The two cities are hundreds of miles apart and completely unrelated otherwise.

Antioch was an extremely common city name across the ancient Roman world.

Readers need to track which Antioch is meant in each part of the story.

🏙️ This Antioch sat in Pisidia, not Syria
📍 The two cities were hundreds of miles apart
🔁 Antioch was a very common ancient city name
📖 Context tells us which Antioch is meant

## 🪑 Went Into The Synagogue On The Sabbath Day, And Sat Down

Sitting down was the normal posture for someone simply attending the service.

Paul and Barnabas did not force their way into speaking that day.

They followed the regular customs of the synagogue like any other visitor.

God's work here started through ordinary respect for local custom, not disruption.

🪑 Sitting down meant they came as regular guests
🚪 They did not force their way into speaking
🤝 They simply followed normal synagogue custom
📖 Respect for custom opened the door for them

## 📖 After The Reading Of The Law And The Prophets

A normal sabbath service included set readings from the Law and the Prophets.

The Law meant the first five books of the Old Testament.

The Prophets covered the historical and prophetic books that followed.

Paul's sermon was invited only after these scriptures were read aloud first.

📖 The Law meant the first five books
📜 The Prophets covered the books that followed
🗓️ This was the normal order of service
➡️ Paul spoke only after scripture was read first

## ✋ Beckoning With His Hand

This hand gesture was a common way ancient speakers called for quiet before talking.

It signals Paul understood normal public speaking customs of his day.

He was not an awkward outsider shouting over a crowd.

Paul addressed this room with real confidence and skill.

✋ The gesture simply called the room to quiet
🎤 It matched normal public speaking customs
🧍 Paul was no awkward outsider here
📖 He spoke with real skill and confidence

## 👥 Men Of Israel, And Ye That Fear God

Paul greets two separate groups in the room with this one line.

"Men of Israel" meant ethnic Jews born into the covenant people.

"Ye that fear God" meant Gentiles who respected Israel's God without fully converting.

Paul's sermon was built to reach both groups at once from the very first sentence.

👥 Paul addressed two separate groups at once
🕍 Men of Israel meant ethnic Jews
🙏 God fearers were Gentile sympathizers, not converts
📖 One sermon was aimed at both groups

# Acts 13:17-21
# 📜 Paul Retells Israel's Story
---
## 📜 Chose Our Fathers, And Exalted The People

Paul starts his sermon with Israel's own history, not an abstract idea.

"Chose" points back to God picking Abraham out of the whole ancient world.

"Exalted" means God lifted the people up and gave them honor over time.

Paul builds trust with his audience before he ever mentions Jesus by name.

📜 Paul began with Israel's own history
🎯 Chose points back to Abraham's calling
⬆️ Exalted means God lifted the people up
📖 Paul built trust before naming Jesus

## 💪 With An High Arm Brought He Them Out Of It

"An high arm" is an old idiom for a clear and powerful show of strength.

The same picture language appears throughout the Old Testament for the exodus from Egypt.

Paul is describing the plagues and the parting of the Red Sea in one short phrase.

God's power back then was public, visible, and impossible to miss.

💪 A high arm means visible, powerful strength
🌊 This phrase recalls the exodus from Egypt
⚡ It compresses the plagues and the sea
📖 God's power then was impossible to miss

## ⏳ Suffered Their Manners In The Wilderness

"Suffered their manners" is an old way of saying God patiently put up with their behavior.

This was not approval of their complaining and disobedience in the wilderness.

It was patience that stretched across forty long years of wandering.

God's patience here was real, but it was never the same thing as agreement.

⏳ Suffered their manners means God endured patiently
😤 This covered forty years of complaint and disobedience
🚫 Patience here was not the same as approval
📖 Even that patience lasted forty full years

## ⚔️ Destroyed Seven Nations, And Divided Their Land To Them By Lot

These seven nations lived in Canaan before Israel's arrival under Joshua.

"By lot" meant the land was divided using a method like drawing straws.

This removed any claim that one tribe simply grabbed the best land for itself.

God's gift of land was handed out in peace, not fought over by Israel's own tribes.

⚔️ Seven nations lived in Canaan before Israel
🎲 By lot means divided like drawing straws
⚖️ This kept the division fair between tribes
📖 God's gift was not fought over internally

## ⚖️ Judges About The Space Of Four Hundred And Fifty Years, Until Samuel

Judges were local leaders who rescued and governed Israel before any king existed.

This long number likely combines several overlapping periods rather than one unbroken timeline.

Many scholars treat it as a rounded, approximate span rather than an exact count.

The real point is simply how long Israel waited before God gave them a king.

⚖️ Judges led Israel before any king existed
🧮 This number likely combines overlapping periods
📏 It was likely a rounded, approximate span
📖 Israel waited a long time for a king

## 👑 They Desired A King, And God Gave Unto Them Saul The Son Of Cis

Israel's demand for a king was itself a rejection of God as their direct ruler.

God still granted the request, even knowing how it would go.

"Cis" is simply an older spelling of the name Kish, Saul's father.

Saul's reign would eventually fail, setting up the story's real turn toward David.

👑 Asking for a king rejected God's rule
✅ God granted the request anyway
📛 Cis is an older spelling of Kish
📖 Saul's failure sets up the turn to David

# Acts 13:22-25
# 👑 From David To John The Baptist
---
## ❤️ David The Son Of Jesse, A Man After Mine Own Heart

"A man after mine own heart" does not mean David was morally perfect.

David sinned seriously more than once later in his own story.

The phrase means David's heart stayed turned toward God, even after failing badly.

God valued a returning heart far more than a flawless record.

❤️ After God's own heart does not mean sinless
⚠️ David failed seriously more than once
🔄 His heart kept turning back to God
📖 A returning heart matters more than perfection

## 🎯 Raised Unto Israel A Saviour, Jesus

Paul finally says the name Jesus out loud after a long run up through history.

"Saviour" means the one who rescues, not simply a good teacher or a wise example.

David's own family line leads directly to this one promised rescuer.

Every name and date before this moment in the sermon was leading here.

🎯 Paul finally names Jesus directly
🛡️ Saviour means a rescuer, not just a teacher
🌳 David's family line leads straight to Jesus
📖 The whole history was leading to this name

## 🚰 The Baptism Of Repentance

John the Baptist's ministry came right before Jesus's own public ministry began.

"Repentance" means a real turning away from sin, not just feeling sorry about it.

John's baptism prepared people's hearts to recognize and receive the Messiah.

A forerunner's job is to prepare the way, not to be the main event himself.

🚰 John's baptism came just before Jesus's ministry
🔄 Repentance means turning away, not just feeling sorry
🛤️ It prepared hearts to receive the Messiah
📖 A forerunner prepares the way, not the event

## 👟 Whose Shoes Of His Feet I Am Not Worthy To Loose

Removing someone's sandals was normally a servant's lowest, most humble task.

John says he is not even fit to do that small job for Jesus.

This was an extreme statement of humility from a man many people already admired.

John pointed every bit of attention away from himself and toward Jesus instead.

👟 Removing sandals was a servant's lowest task
🙇 John said he was not even fit
👏 John was already widely admired by others
📖 He pointed all attention toward Jesus instead

# Acts 13:26-31
# ✝️ The Gospel Announced
---
## 🌳 Children Of The Stock Of Abraham, And Whosoever Among You Feareth God

Paul repeats his opening address, naming both groups in the room again.

"Stock" means family line or ancestry, pointing back to Abraham himself.

Paul keeps both Jews and God fearing Gentiles inside the same promise.

Nobody listening that day was outside the reach of what Paul was about to say.

🌳 Stock means family line, back to Abraham
👥 Paul addresses both Jews and Gentiles again
🤝 Both groups share the same promise
📖 Nobody in the room was left outside

## 🎯 To You Is The Word Of This Salvation Sent

Paul makes this sermon personal, not a distant lecture about history.

"Sent" means this message was deliberately aimed at the people in that room.

Salvation was not a future rumor, it had already arrived for them.

Every sermon in Acts eventually turns from facts into a direct, personal appeal.

🎯 This sermon was aimed directly at them
📬 Sent means deliberately delivered, not accidental
⏰ Salvation had already arrived, not just promised
📖 History always turns into a personal appeal

## ❓ Because They Knew Him Not

Paul describes Jesus's death as a tragedy born from ignorance, not pure malice alone.

The religious leaders heard the prophets read aloud every single sabbath.

They still failed to recognize Jesus as the one those same prophets described.

Familiarity with scripture does not automatically guarantee that a person truly understands it.

❓ Paul blames ignorance, not only malice
📖 Leaders heard the prophets every sabbath
😕 They still failed to recognize Jesus
➡️ Familiar scripture does not guarantee understanding

## ⚖️ Fulfilled Them In Condemning Him

The leaders condemned Jesus while trying to protect their own religious system.

Without realizing it, their actions fulfilled the very prophecies they claimed to honor.

Human sin and God's plan are moving through the very same event here.

God's purposes are never actually blocked by human opposition, even hostile opposition.

⚖️ The leaders condemned Jesus to protect their system
🔄 Their actions unknowingly fulfilled prophecy
🤝 Sin and God's plan moved through one event
📖 Human opposition never actually blocks God's purpose

## ⚖️ Though They Found No Cause Of Death In Him

Roman law required a real legal charge before anyone could be executed.

Pilate himself could not find any actual crime that Jesus had committed.

The religious leaders pushed for death anyway, despite this lack of evidence.

Innocence did not protect Jesus from a demand made out of pure hostility.

⚖️ Roman law required a real legal charge
🤷 Pilate found no actual crime committed
😠 Leaders pushed for death without evidence
📖 Innocence did not stop their hostility

## ✝️ Took Him Down From The Tree, And Laid Him In A Sepulchre

"Tree" here is an old, deliberate word for the cross Jesus died on.

The Old Testament already called anyone hung this way cursed by that method of death.

Early Christians used this exact word on purpose to connect Jesus to that older law.

A sepulchre was simply a tomb, often cut directly into solid rock.

✝️ Tree is an old word for the cross
📜 The Old Testament called this method cursed
🔗 Early Christians used the word on purpose
📖 A sepulchre was a tomb cut into rock

## 🔑 But God Raised Him From The Dead

This short sentence is the turning point of Paul's entire sermon.

Every single thing he says after this line depends on it being true.

Paul does not pause to argue the point here, he simply states it as fact.

The resurrection is the hinge the whole Christian message swings on.

🔑 This line is the sermon's turning point
⚓ Everything after this depends on it
📢 Paul states it plainly, as settled fact
📖 The resurrection is the hinge of the message

## 👀 Seen Many Days Of Them Which Came Up With Him From Galilee

Paul points to many living eyewitnesses, not a private or secret vision.

These witnesses had followed Jesus for years before His death.

"Many days" means repeated, extended contact, not one brief or confused sighting.

Paul's case for the resurrection rests on real people who could still be questioned.

👀 These were real eyewitnesses, not a secret vision
🚶 They had followed Jesus for years already
📅 Many days means repeated, extended contact
📖 Real witnesses could still be questioned by anyone

# Acts 13:32-37
# 📖 Fulfilled In The Resurrection
---
## 🔗 The Promise Which Was Made Unto The Fathers

Paul connects Jesus back to promises God made long before, to Abraham and David both.

Nothing about the gospel was a sudden, brand new idea invented on the spot.

God had been building toward this one moment across many centuries.

The gospel is the payoff of a very long and patient story.

🔗 Jesus connects back to very old promises
🆕 Nothing here was a sudden new idea
⏳ God built toward this across centuries
📖 The gospel pays off a long story

## 👑 As It Is Also Written In The Second Psalm, Thou Art My Son

Paul quotes Psalm two, a text already understood as pointing toward a coming king.

"Thou art my son" names a unique, direct relationship between God and this king.

Paul applies this ancient royal psalm specifically to Jesus's resurrection.

Scripture had been quietly pointing to this moment long before Paul ever said a word.

👑 Psalm two already pointed to a coming king
🔑 Thou art my son names a unique bond
✝️ Paul applies this psalm to the resurrection
📖 Scripture pointed here long before Paul spoke

## 🔒 I Will Give You The Sure Mercies Of David

This line quotes the prophet Isaiah, not an idea Paul invented himself.

"Sure mercies" means promises that are completely reliable and will never fail.

God once made lasting promises directly to King David about his family line.

Paul argues that Jesus is exactly how those old, sure promises get kept.

📖 This line quotes the prophet Isaiah
🔒 Sure mercies means promises that cannot fail
👑 These promises were originally made to David
➡️ Jesus is how those promises get kept

## 📜 Thou Shalt Not Suffer Thine Holy One To See Corruption

This line quotes Psalm sixteen, another psalm linked to King David.

"Corruption" here means the physical decay a dead body normally undergoes.

The psalm promises God's holy one would not stay in the grave long enough to decay.

David himself could not be the final subject, since his own body did decay.

📜 This quotes Psalm sixteen, a psalm of David
💀 Corruption means a body's physical decay
⏳ The promise was no decay, not no death
📖 David's own body still decayed over time

## 😴 Fell On Sleep, And Was Laid Unto His Fathers

"Fell on sleep" is a gentle, old way of saying someone died.

"Laid unto his fathers" describes being buried in the family burial place.

David served his own place in history, then his part ended there.

Even a king as great as David still had to die like everyone else.

😴 Fell on sleep gently means he died
⚰️ Laid unto his fathers means a family burial
👑 David's part in the story ended here
📖 Even a great king still had to die

## ⚖️ But He, Whom God Raised Again, Saw No Corruption

Paul draws a direct, deliberate contrast between David and Jesus here.

David's body decayed normally in the grave, exactly as expected.

Jesus's body did not decay at all, because He did not stay dead.

This contrast is Paul's proof that the resurrection psalm points to Jesus, not David.

⚖️ Paul contrasts David directly against Jesus
⚰️ David's body decayed, exactly as expected
✝️ Jesus's body never decayed at all
📖 This contrast proves the psalm points to Jesus

# Acts 13:38-41
# ⚠️ A Warning From The Prophets
---
## 🎁 Through This Man Is Preached Unto You The Forgiveness Of Sins

Paul finally states the core offer of his entire sermon in one plain line.

"Forgiveness" means sins are fully released, not simply overlooked or excused quietly.

This offer is tied directly to Jesus, the man Paul has been describing all along.

Every detail before this moment was building toward this one simple offer.

🎁 Paul states the sermon's core offer plainly
🔓 Forgiveness means sins are fully released
✝️ The offer is tied directly to Jesus
📖 Everything before this led to one simple offer

## ⚖️ Justified From All Things, Which Ye Could Not Be Justified By The Law Of Moses

"Justified" means declared right and clear before God, not merely forgiven once.

The law of Moses could expose sin, but it could never fully erase it.

The law was never designed to be the final solution to human sin.

Paul offers something the law itself was never able to deliver.

⚖️ Justified means declared right before God
🪞 The law could expose sin, not erase it
🚧 The law was never the final solution
📖 Paul offers what the law could not deliver

## ⚠️ Beware Therefore, Lest That Come Upon You, Which Is Spoken Of In The Prophets

Paul shifts from good news into a direct, serious warning.

He is not threatening them, he is quoting their own trusted prophets back to them.

Good news always carries a real decision attached to it.

Ignoring an offer is itself a choice, with real consequences either way.

⚠️ Paul shifts into a direct warning
📜 He quotes their own trusted prophets
🤔 Good news always carries a real decision
📖 Ignoring an offer is still a choice

## 📜 Behold, Ye Despisers, And Wonder, And Perish

This exact line is quoted from the prophet Habakkuk, written centuries earlier.

Habakkuk originally warned about Babylon's sudden, unbelievable rise to power.

Paul now applies that same warning to people doubting the gospel in front of him.

"Despisers" means people who dismiss a message as unworthy of their attention.

📜 This quote comes from the prophet Habakkuk
🏛️ It originally warned about Babylon's sudden rise
🔄 Paul reapplies the warning to the gospel
📖 Despisers means those who dismiss the message

## 😲 A Work Which Ye Shall In No Wise Believe

This work seemed completely unbelievable to the people who first heard it announced.

Habakkuk's original hearers could not imagine Babylon's rapid rise either.

"In no wise" is an old way of saying not at all, under any circumstance.

Some of God's biggest moves look impossible right up until they actually happen.

😲 This work seemed completely unbelievable at first
🏛️ Babylon's rise once seemed just as impossible
🚫 In no wise means not at all
📖 God's biggest moves can look impossible beforehand

# Acts 13:42-45
# 🏙️ The City Responds
---
## 🙏 The Gentiles Besought That These Words Might Be Preached To Them The Next Sabbath

"Besought" means they begged earnestly, not simply made a polite request.

These were likely Gentiles who had never heard this kind of message before.

Their response was immediate hunger, not the cautious hesitation Paul may have expected.

A sermon aimed first at Israel ended up exciting the Gentiles the most.

🙏 Besought means they begged earnestly
👂 These Gentiles may have heard this message first
⚡ Their hunger was immediate, not hesitant
📖 Gentiles ended up the most excited listeners

## 🔄 Religious Proselytes Followed Paul And Barnabas

A proselyte was a Gentile who had formally converted all the way into Judaism.

This made them different from the looser "God fearers" mentioned earlier in the chapter.

Proselytes already knew the scriptures well, since they had studied to convert in the first place.

Paul's message was landing across every level of religious background in that city.

🔄 A proselyte was a full convert to Judaism
📏 This differs from the looser God fearer group
📚 Proselytes already knew scripture well
📖 Paul's message reached every religious background

## 📣 Almost The Whole City Together To Hear The Word Of God

A single sabbath's success turned into a citywide event within just one week.

Word about Paul's message had clearly spread fast through ordinary conversation.

This kind of massive turnout was impossible to ignore for anyone in town.

Momentum like this always draws out both strong supporters and strong opponents quickly.

📣 Success spread fast through ordinary word of mouth
🏙️ A whole city gathered within just one week
👀 This turnout was impossible to ignore
📖 Momentum draws out supporters and opponents fast

## 😤 Filled With Envy

Envy, not theology, was the real motive driving this opposition.

The Jewish leaders had enjoyed respected status in that city for a long time.

Watching crowds turn toward Paul and Barnabas threatened that long held position.

Jealousy over lost attention can disguise itself as a religious argument.

😤 Envy, not theology, drove the opposition
🏛️ Leaders had held respected status for years
📉 Crowds shifting toward Paul threatened that position
📖 Jealousy can disguise itself as religious debate

## 🗣️ Contradicting And Blaspheming

"Contradicting" meant arguing directly against what Paul had just taught.

"Blaspheming" meant speaking with contempt against God or sacred things.

Moving from disagreement into blasphemy shows how far their anger had grown.

Losing an argument in public can push people toward words they would not otherwise use.

🗣️ Contradicting meant arguing directly against Paul
🚫 Blaspheming meant contempt for sacred things
📈 Their anger grew from disagreement to blasphemy
📖 Public arguments can push people to extremes

# Acts 13:46-52
# 🌅 Turning To The Gentiles
---
## 📈 Paul And Barnabas Waxed Bold

"Waxed" is an old word for grew, with no connection to candle wax at all.

Public rejection did not make Paul and Barnabas quiet or cautious.

Instead, opposition pushed them to speak with even more boldness than before.

Pressure in this story grows faith outward instead of shrinking it.

📈 Waxed means grew, unrelated to candle wax
🛡️ Rejection did not make them cautious
🔥 Opposition pushed them to speak bolder
📖 Pressure here grew faith instead of shrinking it

## 🥇 It Was Necessary That The Word Of God Should First Have Been Spoken To You

Paul explains a clear pattern he has followed in every city so far.

The gospel was offered to Israel first, out of real respect for the covenant.

"Necessary" points to God's own plan, not simply Paul's personal preference.

This order mattered, even though the response that day had turned painful.

🥇 Israel was offered the gospel first
🤝 This showed respect for the covenant
📋 Necessary points to God's plan, not preference
📖 The order mattered, even after rejection

## 👀 Lo, We Turn To The Gentiles

"Lo" is an old word simply meaning look, or pay attention to this.

This line marks a real strategic turning point in the mission's whole direction.

Rejection in one group did not end the mission, it simply redirected it.

From this point forward, the Gentile mission becomes the dominant focus of Acts.

👀 Lo simply means look, or pay attention
🔄 This marks a real turning point
➡️ Rejection redirected the mission, not ended it
📖 The Gentile mission now becomes the main focus

## 📜 I Have Set Thee To Be A Light Of The Gentiles

Paul quotes the prophet Isaiah to defend this major shift in direction.

This mission to the Gentiles was never a backup plan or an afterthought.

God had announced this plan clearly, centuries before Paul ever said a word.

Paul's decision was obedience to an old promise, not an improvised new idea.

📜 Paul quotes the prophet Isaiah here
🆕 This was never a backup plan
⏳ God announced this plan centuries earlier
📖 Paul obeyed an old promise, not a whim

## 📋 As Many As Were Ordained To Eternal Life Believed

"Ordained" here means appointed or marked out beforehand by God.

This line has started serious discussion for centuries about God's role in salvation.

Luke's simple point in context is that belief followed God's prior work.

Those who were ready responded the moment they actually heard the message.

📋 Ordained means appointed beforehand by God
💬 This line has sparked centuries of discussion
🔄 Belief followed God's prior work here
📖 Readiness met the message the moment it came

## 📢 The Word Of The Lord Was Published Throughout All The Region

"Published" here means publicly announced and spread, not printed on paper.

This spread happened mostly through ordinary word of mouth between towns.

One obedient trip from Antioch now reaches an entire surrounding region.

Small, faithful actions can spread far beyond where they first began.

📢 Published means announced, not printed on paper
🗣️ It spread mainly through word of mouth
🌍 One trip reached an entire region
📖 Small actions spread far beyond their start

## 👑 The Jews Stirred Up The Devout And Honourable Women, And The Chief Men Of The City

These women were likely Gentile God fearers who held real social influence.

"Honourable" points to genuine status and respect within that city's society.

Opposition here worked through powerful social connections, not an angry street mob.

Influential people can be turned against a message just as easily as crowds can.

👑 These women held real social influence
🏛️ Honourable points to genuine status and respect
🤝 Opposition worked through powerful connections, not a mob
📖 Influential people can be turned just like crowds

## 🚪 Raised Persecution Against Paul And Barnabas, And Expelled Them Out Of Their Coasts

Social pressure escalated here into an actual, organized expulsion from the city.

"Coasts" in this verse means the surrounding region or territory, not a beach.

Paul and Barnabas were forced out, not simply asked politely to leave.

Rejection in one city never stopped the mission moving forward to the next.

🚪 Pressure escalated into an organized expulsion
🗺️ Coasts here means a region, not a beach
⚠️ They were forced out, not asked politely
📖 Rejection in one city never stopped the mission

## 📍 They Shook Off The Dust Of Their Feet Against Them

Jesus had already taught His followers to do exactly this back in the Gospels.

The gesture symbolically declared that a town's rejection was now entirely its own responsibility.

It was not an act of anger, but a formal, deliberate sign of closure.

Paul and Barnabas left clean, carrying no bitterness forward with them.

📖 Jesus had already taught this gesture
📍 It declared the town's rejection its own responsibility
🚫 This was closure, not an angry outburst
➡️ They left clean, without carrying bitterness forward

## 🗺️ Came Unto Iconium

Iconium sat further inland, in the central region of Asia Minor.

This city becomes an important stop again later in Paul's story.

The missionaries kept moving forward immediately, without stopping to recover from rejection.

Every closed door in this chapter simply opens onto the next open road.

🗺️ Iconium sat inland in central Asia Minor
🔁 This city matters again later in Acts
🚶 They kept moving right after being expelled
📖 Every closed door opened onto a new road

## 🙌 The Disciples Were Filled With Joy, And With The Holy Ghost

This joy belonged to the new believers left behind in Antioch of Pisidia, not just to Paul and Barnabas.

Persecution had just driven their teachers out of the city entirely.

Real joy here came from the Holy Ghost, not from comfortable or easy circumstances.

The chapter that opened with a church sending missionaries closes with a church overflowing in joy.

🙌 This joy belonged to the believers left behind
⚠️ Their own teachers had just been driven out
🕊️ Real joy came from the Spirit, not comfort
📖 The chapter closes on joy, not defeat
`.trim();

export const ACTS_THIRTEEN_PERSONAL_SECTIONS = parseActsThirteenRawNotes(ACTS_THIRTEEN_RAW_NOTES);
