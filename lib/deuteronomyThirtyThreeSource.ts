export type DeuteronomyThirtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyThirtyThreeRawNotes(rawText: string): DeuteronomyThirtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyThirtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+33:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 33 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+33:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+33:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 33 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 33,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 33:${startVerse}` : `Deuteronomy 33:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Deuteronomy 33 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_THIRTY_THREE_RAW_NOTES = `# Deuteronomy 33:1-3
# ⛰️ The LORD Came From Sinai
---
## 📜 This Is The Blessing Wherewith Moses The Man Of God Blessed

Man of God is a title the Bible uses for only a few people.

It marks someone whose life was spent in unusually close service to God.

Moses speaks about himself here in the third person, near the very end of his life.

A dying leader blessing every tribe by name already happened once before.

Jacob blessed his own twelve sons the exact same way in Genesis 49.

This chapter is Moses' very last word to the whole nation.

🕊️ Man of God marks close service to God
📜 Moses speaks of himself in third person
👪 Jacob blessed his sons the same way
📖 This is Moses' very last word
---
## ⚰️ Before His Death

This short phrase quietly sets the mood for the entire chapter.

Moses already knows from chapter thirty two that he will not enter Canaan.

Every blessing that follows is spoken by a man who knows his own time is almost over.

The next chapter records that death actually happening.

A final blessing carries more weight than an ordinary one.

⏳ Moses knows his time is almost over
🚫 He already knows he will not enter Canaan
📖 Chapter 34 records his actual death
➡️ A final blessing carries extra weight
---
## ⛰️ The LORD Came From Sinai, And Rose Up From Seir

Moses pictures God's arrival like a sunrise moving across the land.

Sinai is where God first gave Israel the law after the exodus from Egypt.

Seir is the mountain region of Edom, southeast of the Dead Sea.

The image is God's glory moving from one mountain range toward another.

This is poetry, not a literal travel route.

⛰️ Sinai is where the law was given
🏔️ Seir is the mountain region of Edom
🌅 God's arrival is pictured like a sunrise
📖 The image is poetry, not a route
---
## 🌄 He Shined Forth From Mount Paran

Paran is a wilderness region south of Canaan, near where Israel camped for years.

Shined forth continues the sunrise picture from the line before it.

Naming three separate mountains in one sentence stacks up the sense of God's approach.

Each name would have been familiar ground to the people listening.

🏜️ Paran is a wilderness region near Canaan
🌄 Shined forth continues the sunrise image
🗺️ Three mountain names build one picture
📖 These places were familiar to the people
---
## 😇 He Came With Ten Thousands Of Saints

Ten thousands is simply the largest round number Hebrew poetry commonly used.

It functions the way English speakers might say countless or without number.

Saints here means holy ones, most likely a picture of heavenly beings around God.

The verse is describing an overwhelming heavenly escort, not a literal headcount.

🔢 Ten thousands means an uncountable number
😇 Saints here means holy heavenly beings
👑 God arrives with a vast escort
📖 This is poetry, not a headcount
---
## 🔥 From His Right Hand Went A Fiery Law For Them

The right hand is the ancient picture of strength and highest honor.

Fiery law recalls the fire, smoke, and thunder that covered Sinai in Exodus 19.

The law did not come quietly, it came wrapped in visible power.

✋ The right hand pictures strength and honor
🔥 Fiery law recalls Sinai's fire and smoke
📜 The law arrived wrapped in visible power
📖 Exodus 19 records that same scene
---
## ❤️ Yea, He Loved The People, All His Saints Are In Thy Hand

Yea is an old word simply meaning yes, or truly.

This line turns from picturing God's power to naming His motive.

Saints here again means the holy people God has set apart, Israel itself.

Being in God's hand pictures complete protection and ownership.

Power alone never explains the exodus, only love does.

✅ Yea is an old word for truly
❤️ God's motive is named as love
🤲 In thy hand pictures protection and ownership
📖 Love, not just power, explains the exodus
---
## 🧎 They Sat Down At Thy Feet, Every One Shall Receive Of Thy Words

Sitting at someone's feet was the normal posture of a student before a teacher.

The image pictures all of Israel as students gathered to receive instruction.

Every one shall receive of thy words promises that the teaching reaches everybody, not just leaders.

🧎 Sitting at the feet meant being a student
📚 Israel is pictured as gathered students
🗣️ God's words reach every single person
📖 Instruction, not force, is the picture

# Deuteronomy 33:4-5
# 👑 He Was King In Jeshurun
---
## 📜 Moses Commanded Us A Law

Moses briefly speaks about himself in the third person again here.

A law given through one man was still meant for the whole nation to obey.

This confirms that Moses himself stood under the same law he delivered.

📜 Moses again speaks of himself directly
👤 The law came through one man
👪 It was still meant for the whole nation
📖 Moses stood under his own law too
---
## 🎁 Even The Inheritance Of The Congregation Of Jacob

Inheritance means something owned permanently, not borrowed or temporary.

Congregation of Jacob is another way of naming all of Israel as one body.

Framing the law as an inheritance means every future generation owns it too.

🎁 Inheritance means permanent ownership
👪 Congregation of Jacob names all of Israel
⏳ Future generations own the law too
📖 The law was never meant to expire
---
## 👑 And He Was King In Jeshurun

Jeshurun is an old poetic nickname for Israel meaning the upright one.

The word he in this line points to God, not to Moses.

Israel technically had no human king yet at this point in its history.

God Himself is named as the true ruler over the nation.

📛 Jeshurun is a poetic nickname for Israel
👑 He refers to God, not Moses
🚫 Israel had no human king yet
📖 God is named as the true ruler
---
## 🏛️ When The Heads Of The People And The Tribes Of Israel Were Gathered Together

Heads of the people means the tribal leaders and elders.

This describes a formal national assembly, not a casual crowd.

The whole structure of Israel, tribe by tribe, is pictured standing together in one place.

This is the exact setting for the tribe by tribe blessings that follow.

🏛️ Heads of the people means the leaders
🤝 This describes a formal national assembly
👪 All twelve tribes stand together here
📖 This sets the stage for what follows

# Deuteronomy 33:6
# 💧 Let Reuben Live
---
## 💧 Let Reuben Live, And Not Die

Reuben was Jacob's firstborn son, but he lost his birthright generations earlier.

Genesis 49 already pictured Reuben as unstable as water because of his sin against his father.

This blessing is noticeably smaller than the ones surrounding it.

Simply asking for survival, not greatness, may be the point.

👴 Reuben was Jacob's firstborn son
💧 Genesis 49 called him unstable as water
📉 This blessing is smaller than the others
📖 Survival itself is treated as a real gift
---
## 🔢 And Let Not His Men Be Few

This line asks for the tribe's numbers to hold steady, not to explode.

By the time of later censuses, Reuben was in fact one of the smaller tribes.

Even a modest blessing here still comes from God, not bad luck.

🔢 The request is for steady numbers
📉 Reuben later became one of the smaller tribes
🙏 Even a modest blessing still comes from God
📖 Reuben survived, exactly as asked

# Deuteronomy 33:7
# 🗣️ Hear LORD The Voice Of Judah
---
## 🗣️ Hear, LORD, The Voice Of Judah

This blessing opens as a direct prayer to God rather than a statement about Judah.

Judah was the tribe that would one day produce Israel's kings, including David.

Oddly, this blessing never mentions kingship or a scepter the way Genesis 49 did.

Some readers notice Judah standing a little apart from the rest of the tribes here.

🗣️ This blessing is a direct prayer
👑 Judah would later produce Israel's kings
❓ No scepter or kingship is mentioned here
📖 Judah stands slightly apart in this list
---
## 🤲 And Bring Him Unto His People

This line asks for Judah to be reunited with the rest of the nation.

Judah's territory later sat apart from the northern tribes.

The prayer is for unity, not permanent distance.

🤲 The prayer asks for reunion
🗺️ Judah's land later sat apart geographically
🤝 The request is for unity, not distance
📖 Even a leading tribe still needed this prayer
---
## 💪 Let His Hands Be Sufficient For Him, And Be Thou An Help To Him From His Enemies

Sufficient here means strong enough, capable enough for whatever comes.

The line asks for Judah's own strength and for God's help at the very same time.

Human effort and divine help are not treated as opposites in this verse.

💪 Sufficient means strong enough for the task
🙏 God's help is asked for directly
🤝 Effort and God's help work together
📖 Neither one replaces the other here

# Deuteronomy 33:8-11
# ✨ Thy Thummim And Thy Urim
---
## ✨ Let Thy Thummim And Thy Urim Be With Thy Holy One

Urim and Thummim were two small objects kept in the high priest's breastplate.

Priests used them to seek a yes or no answer from God on important decisions.

Thy holy one here refers to Levi, the priestly tribe.

This is the tribe entrusted with the nation's most sacred objects.

✨ Urim and Thummim were used for guidance
👔 They were kept in the high priest's breastplate
🙋 Thy holy one refers to Levi
📖 Levi held the nation's most sacred objects
---
## ⛲ Whom Thou Didst Prove At Massah, And With Whom Thou Didst Strive At The Waters Of Meribah

Massah and Meribah were two places where Israel tested God over a lack of water.

Those events happened back in Exodus 17 and again in Numbers 20.

This line reminds the reader that Levi's trustworthiness was actually tested, not assumed.

⛲ Massah and Meribah were water crisis sites
📜 Recorded in Exodus 17 and Numbers 20
🧪 Levi's loyalty was tested, not assumed
📖 The testing proved Levi trustworthy
---
## 👨‍👩‍👧 Who Said Unto His Father And To His Mother, I Have Not Seen Him

This line looks back to Exodus 32, when Israel worshipped a golden calf while Moses was on the mountain.

The Levites were the tribe that stood with Moses and helped stop that sin.

This verse pictures Levi choosing loyalty to God even over his own family members.

That kind of loyalty is exactly why the tribe was trusted with priestly duties.

🐄 This recalls the golden calf in Exodus 32
⚔️ Levi stood with Moses against the sin
👨‍👩‍👧 Loyalty to God came before family loyalty
📖 That loyalty earned Levi the priesthood
---
## 🙅 Neither Did He Acknowledge His Brethren, Nor Knew His Own Children

This continues the same picture from the line before it.

Acknowledge and knew both describe normal family loyalty being set aside for a greater duty.

The point is not that Levi stopped loving his family.

The point is that God's command came first when the two collided.

👪 This continues the same family picture
⚖️ Family loyalty was set aside, not erased
🥇 God's command came first that day
📖 The two loyalties collided only once
---
## 📚 They Shall Teach Jacob Thy Judgments, And Israel Thy Law

This introduces the ongoing job the Levites would carry for the rest of Israel's history.

Judgments and law both mean God's instructions for how to live.

Levi's role was never only about offering sacrifices.

Teaching the rest of the nation was just as central to the job.

📚 Levi's job included teaching, not just sacrifice
⚖️ Judgments and law both mean God's instructions
🎓 This role continued for generations
📖 Teaching was central to the priesthood
---
## 🔥 They Shall Put Incense Before Thee, And Whole Burnt Sacrifice Upon Thine Altar

Incense was burned daily inside the tabernacle as a picture of prayer rising to God.

A whole burnt sacrifice meant the entire animal was given, none of it kept back for the priest.

Both duties belonged only to Levi's priestly line.

🔥 Incense pictured prayer rising to God
🐑 A whole burnt offering held nothing back
👔 Both duties belonged only to Levi
📖 Total surrender is pictured in the sacrifice
---
## 🙏 Bless, LORD, His Substance, And Accept The Work Of His Hands

Substance here means Levi's livelihood, since the tribe received no land inheritance like the others.

Levi lived off the offerings and tithes brought by the rest of Israel instead.

This blessing asks God to provide for a tribe with no fields of its own.

🏡 Levi received no land like other tribes
🙏 Substance means Levi's whole livelihood
🎁 Levi lived on Israel's offerings and tithes
📖 God is asked to provide instead of land
---
## ⚔️ Smite Through The Loins Of Them That Rise Against Him

Loins here is an old word for the body's core strength and ability to have descendants.

This is a request for God to permanently defeat Levi's enemies.

The blessing closes by asking for protection, after already asking for provision and purpose.

💪 Loins pictures a person's core strength
⚔️ This asks for lasting defeat of enemies
🛡️ Protection follows provision and purpose
📖 The blessing covers every real need

# Deuteronomy 33:12
# 🛡️ The Beloved Of The LORD Shall Dwell In Safety
---
## ❤️ The Beloved Of The LORD Shall Dwell In Safety By Him

Beloved here refers to the tribe of Benjamin.

Genesis 49 pictured Benjamin as a ravenous wolf, a much harsher image than this one.

This blessing instead focuses entirely on safety and closeness to God.

❤️ Beloved refers to the tribe of Benjamin
🐺 Genesis 49 pictured Benjamin as a wolf
🛡️ This blessing focuses on safety instead
📖 The same tribe gets a softer picture here
---
## 🌄 And The LORD Shall Cover Him All The Day Long

Cover here pictures constant shelter, the way a parent shields a child from danger.

All the day long means this protection was never occasional.

🌄 Cover pictures constant shelter
👶 Like a parent shielding a child
⏳ All the day long means constant protection
📖 This was never occasional care
---
## 🏔️ And He Shall Dwell Between His Shoulders

This unusual phrase likely pictures Benjamin's territory sitting in the hill country around Jerusalem.

Between his shoulders may also picture being carried close, the way a father carries a child on his back.

Either reading points to the same idea, nearness to God's own presence.

Jerusalem and its temple would later sit right inside Benjamin's borders.

🏔️ Benjamin's land sat in the hill country
👨‍👧 The image may picture being carried close
🏛️ Jerusalem later sat inside Benjamin's own borders
📖 Nearness to God is the point either way

# Deuteronomy 33:13-17
# 🌾 Blessed Of The LORD Be His Land
---
## 🌾 Blessed Of The LORD Be His Land

Joseph's blessing here is the longest of all twelve, matching how large his territory became.

Joseph technically has no single tribe, his blessing is split between his two sons instead.

This opening line sets up a long list of specific agricultural blessings that follows.

🌾 Joseph's blessing is the longest of the twelve
👶 It is split between his two sons
📋 A list of specific blessings follows
📖 The length matches his large territory
---
## ☔ For The Precious Things Of Heaven, For The Dew

Precious things repeats through this entire section as a refrain tying every image together.

Dew was essential to farming in a region with a long dry season each year.

Naming heaven's dew as a blessing is really a blessing over Joseph's future harvests.

🔁 Precious things repeats as a refrain
☔ Dew mattered during the long dry season
🌾 This is really a blessing over harvests
📖 Weather itself becomes a gift here
---
## 🌊 And For The Deep That Coucheth Beneath

The deep here means underground water sources like springs and wells, not the ocean.

Coucheth is an old word meaning lies down or crouches.

The picture is of water resting quietly underground, ready to be drawn up when needed.

🌊 The deep means underground springs and wells
🐾 Coucheth is an old word for lies down
💧 Water is pictured resting, ready when needed
📖 Both rain above and water below are covered
---
## ☀️ And For The Precious Fruits Brought Forth By The Sun

Sun and moon together simply mean the full yearly cycle of seasons.

Ancient farmers depended on both daylight growth and the moon's role in marking planting times.

This line blesses Joseph's land across every season, not just one harvest.

☀️ Sun and moon together mean the full year
🌱 Both track different parts of the growing cycle
📅 The blessing covers every season
📖 Joseph's land is blessed year round
---
## ⛰️ And For The Chief Things Of The Ancient Mountains

Ancient and lasting both stress how old and permanent these mountains already were.

Joseph's territory included some of the best hill country in all of Canaan.

Calling something ancient in a blessing over a young nation is a way of saying it was built to last.

⛰️ Ancient and lasting both stress permanence
🗺️ Joseph received some of the best hill country
🏗️ The blessing was built to last
📖 Old mountains picture a lasting inheritance
---
## 🔥 And For The Good Will Of Him That Dwelt In The Bush

Him that dwelt in the bush is a direct callback to Exodus 3.

That is where God first appeared to Moses inside a burning bush.

This is the only place in the whole blessing that names that exact event.

Naming it here ties Joseph's material blessing back to God's own personal presence.

🔥 This recalls the burning bush of Exodus 3
👣 The only direct callback to that event
🎁 It ties blessing back to God's presence
📖 Presence, not just provision, is the real gift
---
## 👑 Let The Blessing Come Upon The Head Of Joseph

Separated from his brethren recalls Joseph's whole story, sold away by his own brothers in Genesis 37.

That separation once looked like a tragedy, then became the reason Egypt had food during the famine.

The very thing that once looked like rejection is remembered here as part of the blessing.

👑 The blessing lands on Joseph's own head
🩸 Separated recalls being sold by his brothers
🍞 That separation later saved Egypt from famine
📖 Rejection became part of the blessing itself
---
## 🐂 His Glory Is Like The Firstling Of His Bullock

A firstling was the first and most valuable animal born to a herd.

Unicorns in the King James translation actually means a wild ox, a real and powerful animal, not a mythical horse.

Horns picture raw military strength in this kind of poetry.

🐂 A firstling was the most valuable animal born
🦏 Unicorns here means a real wild ox
💪 Horns picture military strength
📖 This is not the mythical creature readers expect
---
## 🌍 With Them He Shall Push The People Together To The Ends Of The Earth

Push here pictures an ox using its horns to drive enemies back.

To the ends of the earth is poetic language for total, far reaching victory.

This blessing pictures Joseph's descendants as a real military force.

🐂 Push pictures an ox driving enemies back
🌍 Ends of the earth means total victory
⚔️ Joseph's tribe is pictured as a real force
📖 Strength backs up the earlier land blessings
---
## 👶 They Are The Ten Thousands Of Ephraim, And The Thousands Of Manasseh

Ephraim and Manasseh were Joseph's two sons, each treated as a full tribe of their own.

Genesis 48 already told the story of Jacob crossing his hands to bless Ephraim above his older brother.

This verse confirms that reversal came true, Ephraim's numbers outgrew Manasseh's over time.

👦 Ephraim and Manasseh were Joseph's two sons
🤲 Genesis 48 crossed hands to favor Ephraim
📈 Ephraim's numbers really did grow larger
📖 An old family blessing came true here

# Deuteronomy 33:18-19
# ⛵ Rejoice Zebulun In Thy Going Out
---
## ⛵ Rejoice, Zebulun, In Thy Going Out

Zebulun's territory reached toward the coast, giving the tribe access to sea trade.

Going out fits a tribe known for travel and commerce rather than settled farming.

⛵ Zebulun's land reached toward the coast
🚢 The tribe was known for sea trade
🧭 Going out fits a traveling people
📖 Zebulun's blessing matches its actual territory
---
## ⛺ And, Issachar, In Thy Tents

Issachar is blessed in the opposite direction, staying in tents rather than going out.

Issachar's territory sat inland, well suited to settled farming instead of trade.

Two neighboring tribes receive two very different, and equally real, blessings.

⛺ Issachar is blessed for staying, not going
🌾 Issachar's land suited settled farming
🤝 Two tribes get two different blessings
📖 Both directions can be a real blessing
---
## ⛰️ They Shall Call The People Unto The Mountain

This line switches from blessing the tribes individually to picturing them worshipping together.

The mountain likely refers to a shared worship site near their joined territory, possibly Tabor.

Sacrifices of righteousness means offerings given with a right heart, not just the right ritual.

⛰️ The tribes are pictured worshipping together
📍 The mountain was likely near their shared land
❤️ Righteousness means a right heart, not just ritual
📖 Trade and farming both feed real worship
---
## 🌊 For They Shall Suck Of The Abundance Of The Seas

Suck here pictures nursing, drawing wealth out the way a baby draws milk.

Treasures hid in the sand likely points to the purple dye and glass making tied to this coastal region.

This is a blessing over real, specific economic wealth.

🍼 Suck pictures drawing out wealth like nursing
🐚 Treasures in the sand hints at dye trade
💰 This blesses real economic wealth
📖 God's blessing reaches into daily trade

# Deuteronomy 33:20-21
# 🦁 He Dwelleth As A Lion
---
## 📈 Blessed Be He That Enlargeth Gad

Enlargeth means makes bigger or gives more territory.

Gad had already asked to settle east of the Jordan River back in Numbers 32, outside Canaan proper.

This blessing confirms God's approval of that choice and its growth.

📈 Enlargeth means makes bigger
🗺️ Gad settled east of the Jordan River
✅ This confirms God approved that choice
📖 Numbers 32 tells that earlier story
---
## 🦁 He Dwelleth As A Lion, And Teareth The Arm With The Crown Of The Head

This is fierce battle imagery, a lion tearing straight through an enemy.

Arm and crown of the head together picture total defeat of an opponent.

Gad's territory bordered hostile groups, so strength here was a practical need, not just poetry.

🦁 Gad is pictured as a fierce lion
⚔️ Arm and head together picture total defeat
🛡️ Gad's border location made strength a real need
📖 This blessing matches Gad's actual situation
---
## 🏞️ And He Provided The First Part For Himself

This recalls Gad choosing its land first, before the rest of Israel crossed into Canaan.

The lawgiver here is Moses, whose own final resting place would later sit near Gad's territory.

Choosing early carried real responsibility, not just an early advantage.

🏞️ Gad chose its land before the rest
📜 The lawgiver refers to Moses himself
🪦 Moses would later be buried nearby
📖 Gad's early choice came with real responsibility
---
## ⚔️ He Executed The Justice Of The LORD, And His Judgments With Israel

This recalls Gad's warriors crossing the Jordan to help the other tribes conquer Canaan.

That crossing kept an earlier promise made back in Numbers 32.

Gad kept its word even after already receiving its own land east of the Jordan.

Justice of the LORD here means carrying out God's plan for the whole nation.

🌊 Gad's warriors crossed the Jordan to help others
🤝 That crossing kept an earlier promise
🏡 Gad already had land east of the Jordan
📖 Gad's land came with a shared duty

# Deuteronomy 33:22
# 🦁 Dan Is A Lion's Whelp
---
## 🦁 Dan Is A Lion's Whelp

Whelp means a young lion, not yet fully grown.

Genesis 49 already pictured Dan as a serpent by the road, a very different image than this one.

A young lion still pictures real danger, just earlier in its growth.

🦁 Whelp means a young lion
🐍 Genesis 49 pictured Dan as a serpent instead
💪 A young lion still means real danger
📖 Dan gets a different image here
---
## 🐆 He Shall Leap From Bashan

Bashan was a fertile region northeast of the Sea of Galilee, later part of Dan's expanded territory.

Leap pictures a sudden, fast strike rather than a slow advance.

This matches Dan's later history of a tribe that migrated and expanded aggressively.

🗺️ Bashan sat northeast of the Sea of Galilee
🐆 Leap pictures a sudden, fast strike
📈 Dan's tribe later expanded aggressively
📖 The image matches Dan's real history

# Deuteronomy 33:23
# 🌊 Satisfied With Favour
---
## 🌊 O Naphtali, Satisfied With Favour, And Full With The Blessing Of The LORD

Satisfied and full both describe abundance, not just enough to get by.

Favour is an old spelling of favor, meaning God's kindness and goodwill.

Naphtali's blessing opens with pure abundance before naming anything specific.

🌊 Satisfied and full both mean real abundance
❤️ Favour is an old spelling of favor
🎁 God's kindness comes before any specifics
📖 Abundance is named before it is explained
---
## 🗺️ Possess Thou The West And The South

Naphtali's actual territory sat around the fertile land near the Sea of Galilee.

Possessing both directions pictures a wide, secure inheritance rather than a narrow strip of land.

The tribe's real geography backs up the poetry of abundance just spoken over it.

🗺️ Naphtali's land sat near the Sea of Galilee
🧭 West and south together mean a wide territory
🏡 The inheritance was secure, not narrow
📖 Geography backs up the promise of abundance

# Deuteronomy 33:24-25
# 🫒 Let Him Dip His Foot In Oil
---
## 👶 Let Asher Be Blessed With Children

This opens with a blessing of many children, a sign of strength and future hope in this culture.

More children meant more workers, more protection, and a bigger name within Israel.

👶 Many children marked strength and hope
👪 More children meant more workers and protection
📈 A larger family meant a bigger name
📖 Asher's blessing starts with people, not land
---
## 🤝 Let Him Be Acceptable To His Brethren

Acceptable to his brethren means Asher was well regarded by the other tribes.

Not every tribe earned that kind of respect from its neighbors.

This kind of reputation blessing does not appear this way anywhere else in the chapter.

🤝 Acceptable means well regarded by others
👀 Not every tribe earned that respect
🏅 This is a reputation blessing
📖 Being liked by others was worth naming
---
## 🫒 And Let Him Dip His Foot In Oil

Oil here means olive oil, one of the most valuable products in the ancient world.

Asher's territory later became known for its many olive groves.

Dipping a foot in oil pictures such abundance that oil is everywhere underfoot.

🫒 Oil meant olive oil, a valuable product
🌳 Asher's land became known for olive groves
👣 Dipping a foot pictures overflowing abundance
📖 Wealth here is pictured, not just stated
---
## 🥾 Thy Shoes Shall Be Iron And Brass

Shoes made of iron and brass is a picture, not a literal description of footwear.

It likely points to mineral wealth in Asher's hill country, or to unusual strength and protection.

Either reading points to a tribe built for endurance.

🥾 Iron shoes are a picture, not literal footwear
⛏️ May point to mineral wealth in the hills
🛡️ May also picture strength and protection
📖 Either way, Asher is built for endurance
---
## 💪 And As Thy Days, So Shall Thy Strength Be

This well known line promises strength that matches need across an entire lifetime.

It is not a promise that strength stays exactly the same every day.

It is a promise that whatever the day demands, enough strength will be there for it.

💪 Strength is promised to match each day's need
📅 The promise covers a whole lifetime
🔁 Strength was never meant to stay identical daily
📖 Enough strength arrives when the day demands it

# Deuteronomy 33:26-29
# 🛡️ The Eternal God Is Thy Refuge
---
## 🙌 There Is None Like Unto The God Of Jeshurun

Jeshurun is the same poetic nickname for Israel used back in verse 5.

The blessing now turns from the tribes to God Himself for its closing words.

None like unto is a claim of total uniqueness, not just greatness compared to others.

📛 Jeshurun is the same nickname from verse 5
🔄 The focus shifts from tribes to God
🥇 None like unto claims total uniqueness
📖 The blessing closes by praising God directly
---
## ☁️ Who Rideth Upon The Heaven In Thy Help

Rideth upon the heaven pictures God moving across the sky the way a king rides in a chariot.

Excellency means majesty or supreme greatness.

This kind of sky riding language was often used for pagan storm gods in the surrounding nations.

Here it is claimed for the LORD alone.

🐎 Rideth pictures God riding like a king
👑 Excellency means majesty or supreme greatness
⛈️ Similar language once described pagan storm gods
📖 This power belongs to the LORD alone
---
## 🛡️ The Eternal God Is Thy Refuge, And Underneath Are The Everlasting Arms

Refuge means a safe place to run to when danger comes.

Everlasting arms pictures God holding and carrying His people the way a parent carries a tired child.

This is one of the most quoted lines in the whole chapter for good reason.

🛡️ Refuge means a safe place from danger
🤲 Everlasting arms pictures being carried, not just held
👶 Like a parent carrying a tired child
📖 Safety here is personal, not just distant protection
---
## ⚔️ And He Shall Thrust Out The Enemy From Before Thee

Thrust out pictures active removal, not just a promise of eventual peace.

This points forward to the actual conquest of Canaan under Joshua.

The command to destroy them is God's, spoken directly, not Moses' own idea.

⚔️ Thrust out means active removal, not just peace
🗺️ This points forward to Joshua's conquest
🗣️ Destroy them is God's own command
📖 Moses is only repeating what God said
---
## 🌾 Israel Then Shall Dwell In Safety Alone

Dwell in safety alone means Israel would not need to depend on other nations for protection.

Fountain of Jacob is a picture of Jacob's descendants flowing out like water from a spring.

Corn and wine together simply describe a rich and fertile land.

🛡️ Alone means not depending on other nations
⛲ Fountain of Jacob pictures descendants like flowing water
🌾 Corn and wine describe a fertile land
📖 Safety and abundance are promised together
---
## 😊 Happy Art Thou, O Israel

Happy here means genuinely blessed, not just a passing feeling.

Who is like unto thee echoes the earlier line about God being like no other.

The nation's uniqueness now mirrors God's own uniqueness named a few lines earlier.

😊 Happy means genuinely blessed, not a feeling
🔄 This echoes the earlier line about God
🥇 Israel's uniqueness now mirrors God's own
📖 A nation reflects the God who saved it
---
## 🛡️ The Shield Of Thy Help, And The Sword Of Thy Excellency

Shield pictures defense, protection from an incoming attack.

Sword pictures offense, the power to strike and win a battle.

God is described here as both, defense and attack in one.

🛡️ Shield pictures defense from attack
⚔️ Sword pictures the power to strike
🤲 God is described as both at once
📖 Full protection needs both defense and offense
---
## 🗣️ And Thine Enemies Shall Be Found Liars Unto Thee

Found liars means their threats and boasts will not hold up in the end.

Enemies who once looked strong are shown to have no real power after all.

This is God keeping His word, not Israel's own strength doing the work.

🗣️ Found liars means threats will not hold up
🎭 Enemies looked strong but had no real power
🙏 God's word, not Israel's strength, wins this
📖 The victory belongs to God
---
## 👣 And Thou Shalt Tread Upon Their High Places

High places were hilltop sites used for pagan worship in Canaan.

Treading upon them pictures a total victory, reaching even into the enemy's places of worship.

The blessing that opened with God arriving from Sinai closes with His people walking in complete victory.

⛰️ High places were pagan hilltop worship sites
👣 Treading pictures total victory
🏔️ Victory reaches even their places of worship
📖 The chapter opens and closes with God's power
`.trim();

export const DEUTERONOMY_THIRTY_THREE_PERSONAL_SECTIONS = parseDeuteronomyThirtyThreeRawNotes(DEUTERONOMY_THIRTY_THREE_RAW_NOTES);
