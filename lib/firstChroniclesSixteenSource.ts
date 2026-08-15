export type FirstChroniclesSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesSixteenRawNotes(rawText: string): FirstChroniclesSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 16:${startVerse}` : `1 Chronicles 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 1 Chronicles 16 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_SIXTEEN_RAW_NOTES = `# FirstChronicles 16:1-3
# 🏺 The Ark Comes Home And Israel Feasts
---
## 🏺 So They Brought The Ark Of God

This single line finally succeeds where chapter thirteen ended in disaster.

The ark had already traveled from Kirjathjearim to Obededom's house before reaching this spot.

Bringing it here placed the ark inside Jerusalem for the very first time.

David pitched only a tent for it, not a permanent building.

Solomon would build that permanent house for the ark many years later.

🏺 The ark finally reached Jerusalem
🚫 This reverses chapter thirteen's disaster
⛺ Only a tent housed it for now
📖 Solomon later built its permanent home

---

## 🎁 Burnt Sacrifices And Peace Offerings

A burnt offering was fully consumed on the altar, given entirely to God.

A peace offering was only partly burned, then shared in a meal among the people.

Offering both together marked total devotion alongside shared celebration.

That combination explains why this day ended in a feast, not just a ceremony.

🔥 Burnt offerings were fully consumed
🍽️ Peace offerings were shared in a meal
🙏 Together they marked devotion and celebration
📖 That is why the day became a feast

---

## 👑 He Blessed The People In The Name Of The LORD

This does not mean David had become a priest.

Kings in Israel could speak a blessing without holding priestly office.

Speaking "in the name of the LORD" means he spoke as God's appointed representative.

Solomon later gives a similar blessing when the temple is dedicated.

👑 David blessed the people as king
🚫 This did not make him a priest
📢 He spoke with God's authority, not his own
📖 Solomon later blesses the people the same way

---

## 🍇 A Loaf Of Bread, And A Good Piece Of Flesh, And A Flagon Of Wine

A flagon here likely meant a pressed cake of raisins, not a container of liquid wine.

Scholars remain divided on the exact translation of this word.

David gave this gift to every person in Israel, man and woman alike.

This gift reached the whole nation, not just its leaders.

A gift that size showed real generosity, not a token gesture.

🍞 Bread, meat, and a sweet cake were given
❓ The exact meaning of flagon is debated
👥 Every man and woman received one
📖 The gift matched the size of the joy

# FirstChronicles 16:4-7
# 🎼 David Appoints Levites To Minister Before The Ark
---
## 📯 To Record, And To Thank And Praise The LORD God Of Israel

To "record" here means to call something to remembrance, not to write it down.

These Levites served as public reminders, drawing attention back to what God had done.

Thanking and praising were separate, ongoing duties alongside this reminding role.

Worship here included proclaiming God's works out loud, not silent reflection alone.

📯 Record means calling something to mind
🗣️ Levites proclaimed God's deeds aloud
🙌 Thanking and praising were separate duties
📖 Worship included speaking, not just feeling

---

## 🎤 Asaph The Chief

Asaph already appeared in chapter fifteen as one of three lead singing families.

Here he is formally named chief, put in charge of this new, permanent ministry.

The psalm that follows in this chapter is credited directly to him and his family.

A full psalm rarely appears inside a history book like this one.

🎤 Asaph led the whole singing ministry
📜 He is named chief in this chapter
🎼 This chapter's psalm is credited to him
📖 A full psalm rarely sits inside history

---

## 📯 With Trumpets Continually Before The Ark

"Continually" is the key word in this line.

The procession itself lasted only one day.

This new arrangement was meant to continue every single day going forward.

David was establishing an ongoing ministry, not just celebrating a single event.

📯 Trumpets sounded before the ark daily
⏳ Continually means an ongoing arrangement
🎉 The procession itself was only one day
📖 David built a lasting ministry, not a moment

---

## 📜 Then On That Day David Delivered First This Psalm To Thank The LORD

"This psalm" refers to the song written out in the verses that follow.

Scholars have long noticed that it closely matches parts of Psalms 105, 96, and 106.

Worship pieces were sometimes assembled from earlier material for a specific occasion.

David handed this exact song to Asaph's family to use in worship going forward.

📜 This psalm follows in the next verses
🧩 It closely matches Psalms 105, 96, and 106
🎯 It may have been assembled for this day
📖 Asaph's family received it for lasting use

# FirstChronicles 16:8-13
# 📣 Give Thanks And Seek His Face
---
## 📢 Call Upon His Name, Make Known His Deeds Among The People

This line pairs two different actions together.

Calling on God's name describes private worship, turning toward Him directly.

Making His deeds known describes a public duty, telling others what He has done.

The psalm opens by joining personal worship to public witness in a single breath.

🙏 Calling on God's name is private worship
📢 Making His deeds known is public witness
🤝 The psalm joins both together
📖 Worship was never meant to stay silent

---

## ✨ Glory Ye In His Holy Name

To "glory" in something means to boast about it openly.

People usually boast about their own achievements or possessions.

Here the command is to boast about God instead.

This kind of boasting points every bit of credit away from the self.

✨ Glory here means to boast openly
🚫 Normal boasting centers on the self
🙌 This command redirects all the credit to God
📖 True worship boasts about someone else

---

## 🔍 Seek His Face Continually

"Continually" already appeared in verse six, describing the trumpets.

Here the same word describes an ongoing pursuit of God himself.

Seeking His face is relational language, not a one time search for information.

This kind of seeking never reaches a finish line in this life.

🔍 Continually repeats a theme from verse six
🤝 Seeking His face is relational, not informational
♾️ This pursuit has no finish line
📖 Worship here is a lifelong pursuit

---

## ⚖️ The Judgments Of His Mouth

"Judgments" here means God's spoken rulings, decisions he has handed down.

The picture is closer to a judge issuing a verdict than a parent giving advice.

God's very words carry binding, legal weight.

Remembering His judgments means taking His spoken word seriously.

⚖️ Judgments means God's spoken rulings
👨‍⚖️ The image is a judge, not a parent
📜 His words carry real, binding weight
📖 Remembering them means taking them seriously

---

## 👪 Ye Seed Of Israel His Servant, Ye Children Of Jacob, His Chosen Ones

Israel and Jacob are the same man, renamed by God back in Genesis.

"Seed of Israel" and "children of Jacob" both describe that same nation.

Calling the nation "his servant" and "his chosen ones" are titles of honor.

Being chosen meant being set apart for a purpose, not ranked above others.

👤 Israel and Jacob are the same man
👪 Both phrases describe the same nation
🎖️ Servant and chosen were titles of honor
📖 Chosen meant set apart for a purpose

# FirstChronicles 16:14-19
# 🤝 The Covenant Sworn To Abraham And Isaac
---
## ⏳ A Thousand Generations

This does not mean God counted out a literal one thousand generations.

The number here expresses something without any real limit.

Ancient writers often used large round numbers this way, to describe permanence.

God's covenant word was meant to last far beyond any single lifetime.

⏳ A thousand generations is not a literal count
♾️ Large numbers often meant without limit
📜 It describes the covenant's permanence
📖 God's word outlasts any single lifetime

---

## 📜 The Covenant Which He Made With Abraham, And Of His Oath Unto Isaac

A covenant was a formal agreement, often sealed with a sign.

An oath was a sworn guarantee, a promise backed by an appeal to God's own name.

The same promise gets renewed to Isaac using this stronger, sworn form.

Each generation received the same promise, restated in its own legal shape.

📜 A covenant was a formal agreement
🤝 An oath was a sworn guarantee
🔁 The same promise was renewed to Isaac
📖 Each generation received it in its own form

---

## 🗺️ The Lot Of Your Inheritance

A "lot" was a marked object cast to make a decision, similar to a die.

Land in Canaan was later divided among the tribes by this same method, recorded in Joshua.

Calling Canaan the people's "lot" ties this promise to that future division of land.

A promise made to one family became a real, measurable inheritance generations later.

🎲 A lot was cast like a die
🗺️ Joshua later divided the land this way
🔗 This verse ties the promise to that event
📖 A family promise became a nation's inheritance

---

## 👣 When Ye Were But Few, Even A Few, And Strangers In It

This line looks back to the earliest days of Abraham's family in Canaan.

Back then, they were a tiny household with no land of their own.

By David's time, that same family had become a full nation living securely in that land.

The distance between those two moments measures how far God's promise had already traveled.

👣 This recalls Abraham's small, landless family
🏕️ They once had no land of their own
🇮🇱 David's Israel had become a full nation
📖 The promise had already traveled a long way

# FirstChronicles 16:20-22
# 🛡️ God Reproved Kings For Their Sakes
---
## 👑 He Suffered No Man To Do Them Wrong: Yea, He Reproved Kings For Their Sakes

This describes real, historical run ins between the patriarchs and foreign kings.

Genesis records Pharaoh and Abimelech both threatening Abraham's family at different points.

In both cases, God intervened directly, warning those kings before real harm was done.

The patriarchs never had an army of their own to protect them.

👑 This recalls real conflicts with foreign kings
📜 Genesis names Pharaoh and Abimelech specifically
🛡️ God intervened before real harm happened
📖 The patriarchs had no army of their own

---

## 🛡️ Touch Not Mine Anointed, And Do My Prophets No Harm

"Mine anointed" here does not refer to David or to any king.

The word describes the patriarchs themselves, set apart for God's own purpose.

This line recalls moments like Pharaoh and Abimelech being warned about Abraham and Sarah in Genesis.

God stepped in personally to protect this family long before any king existed in Israel.

🛡️ Anointed here means the patriarchs, not a king
👑 No king existed in Israel yet
📖 This recalls Pharaoh and Abimelech in Genesis
➡️ God protected this family long before David

# FirstChronicles 16:23-27
# 🌍 Declare His Glory Among The Heathen
---
## 🌍 Sing Unto The LORD, All The Earth

Until this line, the psalm has spoken mostly about Israel and its own history.

This verse suddenly widens the call to every nation on earth.

The song shifts from Israel's own story to a call the whole world can hear.

A promise made to one family was always meant to reach everyone eventually.

🌍 The psalm suddenly widens to the whole earth
🇮🇱 Before this line it spoke mainly of Israel
📢 The invitation now reaches every nation
📖 One family's promise was meant for everyone

---

## 📢 Declare His Glory Among The Heathen

"Heathen" simply meant the nations surrounding Israel, not an insult.

Israel's calling included telling those very nations what God had done.

This turns worship into a kind of witness, aimed outward instead of staying inward.

Israel was never meant to keep this knowledge only to itself.

🌍 Heathen simply meant the surrounding nations
📢 Israel was called to tell them
👀 Worship here becomes a form of witness
📖 This knowledge was never meant to stay inward

---

## 🚫 All The Gods Of The People Are Idols

The Hebrew word behind "idols" is closer to "worthless things" or "nothings."

It was a deliberate insult, mocking the false gods worshipped by other nations.

The very next words state the sharp contrast, that the LORD alone made the heavens.

The comparison is not close, it is total.

🚫 Idols translates a word meaning worthless things
😏 It was a deliberate insult
🌌 The LORD alone made the heavens
📖 The comparison was never close

---

## 🕊️ Strength And Gladness Are In His Place

"His place" refers to the tent David had just pitched for the ark.

That simple tent, not a grand temple, is called the source of strength and gladness here.

True worship did not wait for an impressive building to be present.

God's presence, not the size of the structure, made the place matter.

⛺ His place refers to David's simple tent
🏛️ It was not yet an impressive building
🕊️ Strength and gladness came from God's presence
📖 Presence mattered more than the structure

# FirstChronicles 16:28-33
# 🌊 Let The Heavens Be Glad, And The Sea Roar
---
## ✨ Worship The LORD In The Beauty Of Holiness

Scholars are divided over exactly what "beauty of holiness" describes.

Some believe it points to special garments worn during worship.

Others believe it describes the beauty that holiness itself carries.

Either way, the verse links true worship with something beautiful, not something dull.

✨ Beauty of holiness has a debated meaning
👘 It may describe special worship garments
💎 It may describe holiness itself as beautiful
📖 Worship was never meant to feel dull

---

## 🌏 The World Also Shall Be Stable, That It Be Not Moved

This line is not describing geology or the physical shape of the earth.

It is describing the stability that comes from God's own rule over it.

A world under God's kingship holds together, verse by verse of this psalm.

Order in creation flows from order in who is actually in charge.

🌏 This is not a statement about geology
👑 It describes stability under God's rule
🧱 Creation holds together under His kingship
📖 Order flows from who is truly in charge

---

## 👑 The LORD Reigneth

This short line is the center point of the entire psalm.

Everything before it builds toward this declaration.

Everything after it flows out from this same claim.

God's kingship, not David's, is the real subject of this whole song.

👑 This line is the psalm's center point
⬆️ Earlier verses build toward it
⬇️ Later verses flow out from it
📖 God's kingship, not David's, is the real subject

---

## 🌊 Let The Sea Roar, And The Fulness Thereof

"The fulness thereof" means everything that fills the sea, every creature living inside it.

The sea is pictured here as an active worshipper, not simply a body of water.

This kind of language is common in Hebrew poetry, giving creation a voice.

Even the roar of the ocean becomes a kind of praise in this psalm.

🌊 Fulness thereof means everything living in the sea
🎭 The sea is pictured as a worshipper
📜 This is common in Hebrew poetry
📖 Even the ocean's roar becomes praise

---

## 🌳 The Trees Of The Wood Sing Out At The Presence Of The LORD

Trees cannot literally sing, and the psalm is not claiming they can.

This is personification, giving human action to something that has none.

The whole created order is pictured responding with joy to its Maker.

The psalm ends this section with all of creation caught up in worship together.

🌳 Trees do not literally sing
🎭 This is personification in poetry
🌍 All creation responds with joy here
📖 Worship ends this section, joining heaven and earth

# FirstChronicles 16:34-36
# 🙌 O Give Thanks, For His Mercy Endureth For Ever
---
## 💗 His Mercy Endureth For Ever

The Hebrew word behind "mercy" here is chesed, a loyal, covenant kind of love.

It describes a commitment that keeps showing up, not just a passing feeling.

This exact refrain later becomes the entire content of Psalm one hundred and thirty six.

A single line here grew into a whole psalm built on repeating it.

💗 Mercy translates chesed, covenant loyalty
🔁 It describes a commitment, not a feeling
📖 Psalm 136 later repeats this exact line
➡️ One line here became a whole psalm

---

## 🙏 Save Us, O God Of Our Salvation

This request breaks the pattern of pure praise found through most of the psalm.

It matches, almost word for word, the closing verse of Psalm one hundred and six.

That match suggests this song was assembled using pieces already familiar to Israel's worship.

Praise here makes room for a genuine, personal request.

🙏 This line shifts from praise to request
🧩 It matches Psalm 106's closing verse
📜 The song reused familiar worship material
📖 Praise made room for real requests

---

## 🗣️ All The People Said, Amen

"Amen" means "so be it" or "truly," a response confirming what was just said.

This is one of the earliest recorded moments of a crowd answering worship with this word.

The people were not passive here, they actively responded to what was sung.

Worship in Israel from its beginning included the congregation, not only its leaders.

🗣️ Amen means so be it, or truly
👥 This is an early recorded crowd response
🙌 The people actively joined the worship
📖 Worship included the congregation, not only leaders

# FirstChronicles 16:37-43
# 🚪 Ministers Left Before The Ark And At Gibeon
---
## 📅 As Every Day's Work Required

This phrase turns one great celebration into a lasting daily job.

The procession itself had lasted only a single day.

Asaph's family, though, was left with duties for every day going forward.

David built something meant to outlast the excitement of one afternoon.

📅 This established a daily, lasting duty
🎉 The procession itself lasted one day
🔁 Asaph's family served every day after that
📖 David built something meant to last

---

## 🚪 Obededom Also The Son Of Jeduthun And Hosah To Be Porters

Porters here means gatekeepers, guards controlling who could come and go.

This is not the same job as carrying baggage.

This Obededom was blessed once already, back when the ark rested safely in his house.

His family was now trusted with a permanent, guarding role near the ark.

🚪 Porters meant gatekeepers, not baggage carriers
🏠 This Obededom once hosted the ark
🛡️ His family guarded it permanently now
📖 Faithfulness led to lasting responsibility

---

## ⛰️ Before The Tabernacle Of The LORD In The High Place That Was At Gibeon

This does not mean the tabernacle had also moved to Jerusalem with the ark.

The original tabernacle Moses built still stood miles away, at Gibeon.

For a time, Israel's worship was genuinely split between two separate locations.

Solomon would not resolve this split until he built the temple years later.

⛰️ The tabernacle stayed at Gibeon
📍 Worship was split between two locations
⛺ The ark's tent was a separate place
📖 Solomon later resolved the split

---

## 🌅 Continually Morning And Evening

This describes the twice daily burnt offering commanded back in Exodus and Numbers.

Zadok's team kept this exact routine running at Gibeon, even with the ark elsewhere.

The law's regular sacrifice never paused during this period of split worship.

Obedience to the old command continued no matter where the ark itself rested.

🌅 This is the twice daily burnt offering
📜 Exodus and Numbers first commanded it
⛰️ Zadok's team kept it running at Gibeon
📖 Obedience continued despite the ark's absence

---

## 🎺 Heman And Jeduthun With Trumpets And Cymbals

Jeduthun is a new name here, not one of the three singers named in chapter fifteen.

Many scholars believe Jeduthun and Ethan, named earlier, were actually the same person.

Heman, though, is the same lead singer already introduced in chapter fifteen.

Both men led their own teams of musicians at Gibeon's separate worship site.

🎺 Jeduthun appears here for the first time
🔀 He may be the same person as Ethan
🎤 Heman was already named in chapter fifteen
📖 Both led musicians at Gibeon

---

## 🏠 David Returned To Bless His House

This day did not end quietly for David according to every account.

Second Samuel records that Michal confronted David bitterly the moment he returned home.

Chronicles simply stops the story here, leaving that confrontation out.

Chronicles was written to highlight David's faithful worship, not his family's conflict.

🏠 David returned home after this whole day
😠 Second Samuel records Michal's confrontation here
✂️ Chronicles leaves that scene out entirely
📖 Chronicles highlights worship, not family conflict
`.trim();

export const FIRST_CHRONICLES_SIXTEEN_PERSONAL_SECTIONS = parseFirstChroniclesSixteenRawNotes(FIRST_CHRONICLES_SIXTEEN_RAW_NOTES);
