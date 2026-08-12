export type FirstKingsEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsEightRawNotes(rawText: string): FirstKingsEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsEight\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsEight\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsEight\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 8:${startVerse}` : `1 Kings 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 1 Kings 8 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_EIGHT_RAW_NOTES = `# FirstKingsEight 8:1-5
# 📦 Solomon Gathers Israel To Bring Up The Ark
---
## 🏛️ Assembled The Elders Of Israel

"Elders" means the recognized leaders chosen from each tribe and family group.

Solomon called every level of Israel's leadership to Jerusalem for this event.

That includes tribal heads and the leading fathers of each household.

Bringing the ark up was too important for a private ceremony.

👴 Elders were each tribe's leaders

🏛️ Every level of leadership was called

👀 The whole nation would witness this

📖 The ark's return was a national event

## 🏔️ The City Of David, Which Is Zion

"Zion" refers to the specific hill in Jerusalem that David once captured as his stronghold.

David had kept the ark there since he first brought it to Jerusalem.

That was decades before Solomon ever built the temple.

Zion later became a wider name for the whole city and even for God's people.

🏔️ Zion was David's captured hill

🕰️ The ark had rested there for decades

🏙️ Zion later named the whole city

📖 God's presence had a long history there

## 📅 The Month Ethanim, Which Is The Seventh Month

"Ethanim" was an older Canaanite name for the month later called Tishri in the Hebrew calendar.

That month lines up with parts of September and October on a modern calendar.

This same month held the Feast of Tabernacles, one of Israel's three required pilgrimage feasts.

Solomon timed the temple dedication to land inside a feast every Israelite was already gathering for.

📅 Ethanim was later called Tishri

🍂 It falls near September and October

⛺ Tabernacles fell in this same month

📖 Solomon timed the dedication around it

## ✋ The Priests Took Up The Ark

Only priests were allowed to carry the ark, never ordinary Israelites.

Years earlier, a man named Uzzah touched the ark to steady it and died on the spot.

Second Samuel records that moment as a warning about how holy the ark was.

By the time of this ceremony, the rule was being followed with care.

✋ Only priests could carry the ark

⚠️ Uzzah once touched it and died

📜 Second Samuel records that warning

📖 Israel now carried it with care

## 🐑 Could Not Be Told Nor Numbered For Multitude

This phrase means the sacrifices were too many to count.

Solomon was not exaggerating for effect.

Ancient records describe other kings holding equally massive dedication feasts.

The scale of the offering matched the scale of what was being dedicated.

🐑 Too many sacrifices to count

👑 Kings often marked events this way

📜 Massive feasts were not unheard of

📖 The offering matched the occasion's weight

# FirstKingsEight 8:6-9
# 📦 The Ark Comes To Its Resting Place
---
## 🚪 Into The Oracle Of The House, To The Most Holy Place

"Oracle" was the word for the innermost room of the temple, the Holy of Holies.

Only the high priest could enter this room.

He could enter only once a year, on the Day of Atonement.

Placing the ark here meant it had reached its true resting place.

🚪 Oracle means the innermost room

👑 Only the high priest entered

📅 He entered just once a year

📖 The ark reached its true home

## 👼 Under The Wings Of The Cherubims

"Cherubims" were the winged heavenly beings carved to stand guard over the ark.

Chapter six describes two of them built from olive wood and covered in gold.

Their wings stretched wide enough to cover the entire ark beneath them.

The image pictures God's throne guarded and shielded from every side.

👼 Cherubims are guardian heavenly beings

🪵 Chapter six describes their construction

🪽 Their wings covered the ark

📖 God's throne was fully shielded

## 🪵 They Drew Out The Staves

"Staves" were the long carrying poles that ran through rings on the ark's sides.

Priests always lifted the ark using these poles instead of touching it.

Now that the ark would never travel again, the poles were pulled out slightly.

Their ends still showed just inside the holy place.

No one outside the room could see them.

That detail suggests the author of Kings had stood in that room himself.

🪵 Staves were the ark's carrying poles

✋ Priests never touched the ark directly

👁️ The ends showed just inside the room

📖 The writer likely saw it himself

## 🕰️ There They Are Unto This Day

This phrase means the staves were still visible when the author of Kings wrote this account.

First and Second Kings were compiled long after Solomon's reign, using older royal records.

The phrase confirms this detail came from an eyewitness source, not guesswork.

It gives readers a small window into how trustworthy the writer considered his own information.

🕰️ This detail dates the author's sources

📚 Kings used older royal records

👀 An eyewitness likely reported this

📖 The writer trusted his information

## 📜 Nothing In The Ark Save The Two Tables Of Stone

By this point, the ark held only the two stone tablets of the Ten Commandments.

Hebrews chapter nine describes the ark once holding a pot of manna and Aaron's rod as well.

Those items had apparently been removed or lost sometime before Solomon's day.

The tablets Moses received were the one piece of the ark's original contents that remained.

📜 Only the stone tablets remained

🍯 Manna and Aaron's rod were once inside

❓ Those items were gone by now

📖 The tablets outlasted everything else

## ⛰️ Which Moses Put There At Horeb

"Horeb" is another name for Mount Sinai, the mountain where Moses received the law.

The covenant described here is the agreement God made with Israel right after leaving Egypt.

Placing these tablets inside the ark preserved the actual terms of that covenant.

Centuries later, those same tablets were still sitting inside Solomon's finished temple.

⛰️ Horeb is another name for Sinai

📜 The tablets held the covenant's terms

🏛️ Centuries later they still remained inside

➡️ The covenant journeyed all the way to Jerusalem

# FirstKingsEight 8:10-13
# ☁️ The Cloud Fills The House
---
## ☁️ The Cloud Filled The House Of The LORD

This cloud is the same visible sign of God's presence that once filled the tabernacle.

Exodus chapter forty describes that same cloud settling over the finished tabernacle in the wilderness.

God was confirming He accepted this new house the same way He accepted the old tent.

The cloud was not ordinary smoke from the sacrifices.

It was a direct sign from God himself.

☁️ The cloud signals God's presence

📜 Exodus tells of this same cloud

🏠 God accepted this new house too

📖 The sign came from God himself

## 😮 The Priests Could Not Stand To Minister

The presence of God was so strong that the priests had to stop their duties completely.

This was not simple fear.

It was being physically overwhelmed by God's nearness.

Nothing like this had happened during the years the tabernacle stood.

The dedication of the temple marked an unusually powerful moment of God's presence.

😮 Priests were overwhelmed, not afraid

🛑 Their duties had to stop

🆕 This had never happened before

📖 God's presence filled the temple fully

## ✨ The Glory Of The LORD Had Filled The House

"Glory" describes the visible weight of God's own presence, not just praise or honor.

In the Old Testament, this glory often appeared as light, fire, or a thick cloud.

The same glory had once filled the tabernacle and later would fill this temple.

Its presence proved God himself had come to dwell among His people.

✨ Glory means God's visible presence

🔥 It often appeared as fire or cloud

🏠 The same glory now filled the temple

📖 God himself had come to dwell here

## ⛰️ The LORD Said That He Would Dwell In The Thick Darkness

This phrase points back to Mount Sinai, where God also appeared to Israel inside a thick cloud.

Exodus and Deuteronomy both describe that mountain covered in smoke, fire, and thick darkness.

Solomon is connecting this new temple to that same awesome meeting place.

The same God who spoke from Sinai now had a permanent house in Jerusalem.

⛰️ This recalls God's appearance at Sinai

🌩️ Sinai was covered in cloud and fire

🔗 Solomon links the temple to Sinai

📖 The same God now had a permanent house

## ⛺ A Settled Place For Thee To Abide In For Ever

For centuries, the tabernacle was a tent that moved with Israel through the wilderness.

This temple was different.

It was built from stone and cedar to stand in one place.

Solomon is not claiming God is limited to this one building.

He is saying this house would be God's fixed meeting place from now on.

⛺ The tabernacle once moved constantly

🏛️ This temple was built to stay put

🌍 God is not confined to one place

📖 Jerusalem became His fixed meeting place

# FirstKingsEight 8:14-21
# 🙏 Solomon Blesses The Assembly And Recounts God's Promise
---
## 🔄 The King Turned His Face About

Until this moment, Solomon had been praying and speaking toward the temple itself.

Turning around meant he now faced the crowd of Israelites gathered behind him.

This small detail shows the writer watched the ceremony closely enough to record it.

The turn marks a shift from addressing God to addressing the people.

🔄 Solomon turned from the temple

👥 He now faced the people

✍️ The writer recorded this small detail

📖 The turn shifts to a blessing for Israel

## ✋ With His Hand Fulfilled It

This is a Hebrew way of saying God did not just promise with words.

He also carried the promise out in action.

"Mouth" stands for the spoken promise.

"Hand" stands for the promise now being fulfilled in real stone and cedar.

🗣️ Mouth stands for the spoken word

✋ Hand stands for the promise fulfilled

📜 God had promised David a temple

📖 Every word of God becomes real

## 📛 That My Name Might Be Therein

Putting God's "name" in a place meant God's presence would be found there.

It did not mean His name was physically written on the walls.

This language protects an important truth about God.

He fills heaven and earth.

Yet He chose to meet His people at one place.

📛 God's name means His presence

🚫 It is not a literal inscription

🌌 God fills heaven and earth completely

📖 He still chose one meeting place

## 👑 I Chose David To Be Over My People Israel

God is recalling how He picked David long before David became king.

First Samuel describes David as the youngest son, out tending sheep.

His older brothers looked far more fit to rule.

God chose David anyway, over every more obvious candidate.

🐑 David once tended his father's sheep

👴 Older brothers seemed like better choices

👑 God chose David anyway

📖 David's line now filled this temple

## ❤️ It Was In The Heart Of David My Father To Build An House

David wanted to build God's temple himself, not leave it for his son.

Second Samuel chapter seven records David bringing this wish to the prophet Nathan.

God turned the request down.

David had shed too much blood in war to build a house of peace.

❤️ David wanted to build it himself

📜 Second Samuel records his request

🚫 God said no to David

📖 David could not build this house

## 🙌 Whereas It Was In Thine Heart

God tells David that wanting to build the temple still counted for something.

The desire itself pleased God even though David never laid a single stone.

This shows God values a willing heart, not just a finished task.

Solomon is repeating God's own words back to the people at the dedication.

❤️ Wanting counted for something

🙌 The desire pleased God

🧠 God values a willing heart

📖 Solomon repeats God's own words here

## 👶 Thy Son That Shall Come Forth Out Of Thy Loins

"Come forth out of thy loins" is an old way of saying a direct biological son.

This rules out any adopted heir or more distant relative.

God specifically promised the temple would be built by David's own child.

Solomon standing there that day was the fulfillment of that exact promise.

👶 Loins means a direct blood son

🚫 Not an adopted or distant heir

📜 God named David's own child specifically

📖 Solomon fulfilled that exact promise

## 🔀 Risen Up In The Room Of David My Father

"In the room of" is an old phrase meaning "in the place of."

Solomon is saying he now holds the position that once belonged to David.

This is succession language, describing the throne passing from father to son.

The promise God made about David's line was now visibly true.

🔀 Room here means place, not a chamber

👑 Solomon now holds David's position

🔁 The throne passed from father to son

📖 God's promise about David's line held true

# FirstKingsEight 8:22-26
# 🙌 Solomon's Prayer Begins
---
## 🙌 Spread Forth His Hands Toward Heaven

This was the normal posture for prayer in the ancient Near East, not a modern habit.

Worshipers lifted open palms upward as a sign of asking and receiving from God.

Solomon prays standing in front of the altar, in full view of everyone gathered.

His posture alone told the crowd exactly what he was about to do.

🙌 Open palms was the ancient prayer posture

🎁 It signaled asking to receive from God

👀 Solomon prayed in full view of Israel

📖 His posture announced the prayer before words did

## 👑 There Is No God Like Thee

Solomon opens by declaring that Israel's God has no equal, anywhere.

The nations around Israel worshiped many different gods tied to different regions and needs.

Solomon says none of them compare to the LORD, in heaven or on earth.

This is a direct challenge to every rival god of the ancient world.

👑 God has no equal anywhere

🌍 Other nations worshiped many gods

⚡ None of them compare to the LORD

📖 Solomon challenges every rival god directly

## 🤝 Who Keepest Covenant And Mercy

A "covenant" is a binding promise between two parties, sealed with serious commitment.

"Mercy" here translates a Hebrew word meaning loyal, faithful love that does not quit.

Solomon is praising God for keeping His word even when people fail to keep theirs.

This combination of covenant and mercy runs through the entire story of Israel.

🤝 Covenant means a binding promise

❤️ Mercy means loyal, faithful love

🙏 God keeps His word regardless

📖 This pattern runs through all of Israel's story

## 👑 There Shall Not Fail Thee A Man In My Sight

This is God's promise that David's family line would always have a descendant ready to rule.

Second Samuel chapter seven records God making this exact promise to David.

The promise came with one condition, David's children had to walk faithfully before God.

Later kings would break that condition again and again, with painful consequences.

👑 A descendant would always be ready to rule

📜 Second Samuel records this original promise

⚖️ The promise depended on faithfulness

📖 Later kings often broke that condition

## 🗣️ Let Thy Word, I Pray Thee, Be Verified

Solomon asks God to prove His own promise true, out loud, before the whole nation.

This is not doubt.

It is a bold request grounded in God's own past faithfulness.

Solomon stakes his father's name and God's own reputation on this same request.

🗣️ Solomon asks God to prove His word

🙏 This is bold trust, not doubt

👑 David's name rests on this request

📖 Asking God to keep His word is trust

# FirstKingsEight 8:27-30
# 🌌 Will God Dwell On The Earth
---
## ❓ Dwell On The Earth?

Solomon immediately questions the very idea he just built a house for.

This is not doubt.

It is an honest acknowledgment of how big God actually is.

No building, no matter how grand, could ever hold the God who made everything.

Solomon wants Israel to see the temple as a meeting place, not a container for God.

❓ Solomon questions his own project

🙏 This is honesty, not doubt

🌌 No building could ever hold God

📖 A meeting place, never a cage

## 🌌 The Heaven And Heaven Of Heavens Cannot Contain Thee

"Heaven of heavens" is a Hebrew way of naming the highest, largest heaven imaginable.

Repeating the word this way is how Hebrew expresses the biggest possible version of something.

If even that highest heaven cannot hold God, no earthly building ever could.

Solomon uses this to set up the smaller argument that follows about his own house.

🌌 Heaven of heavens means the highest heaven

🔁 Repeating a word signals its biggest form

🚫 Not even that heaven can hold God

📖 Solomon builds his argument on this fact

## 🧮 How Much Less This House That I Have Builded

This is Solomon's logical follow through on the point he just made.

If the largest heaven cannot contain God, this building certainly cannot either.

Solomon is not lowering his view of the temple.

He is raising his view of God.

🧮 This follows Solomon's larger argument

🏛️ The temple cannot contain God either

🔽 Solomon is not lowering the temple's value

📖 He is raising his view of God

## 👁️ Thine Eyes May Be Open Toward This House Night And Day

The Bible often describes God's attention using human body language like eyes and ears.

Saying God's eyes are open toward the temple means He is constantly watching and listening there.

This does not mean God's presence is limited to the building.

It means the temple became the place His people would turn to reach Him.

👁️ Eyes picture God's constant attention

👂 God watches and listens at this place

🚫 God is not limited to the building

📖 The temple became where people turned to Him

## 🌌 Hear Thou In Heaven Thy Dwelling Place

This phrase clears up exactly where God actually lives, in heaven, not the temple.

The temple was the direction people faced when they prayed.

Centuries later, exiled Israelites like Daniel would still pray facing toward this same place.

The building pointed people toward God.

It never contained Him.

🌌 God's true home is heaven

🧭 The temple gave prayer its direction

📖 Daniel later prayed facing this same place

➡️ The building pointed to God, not around Him

# FirstKingsEight 8:31-34
# ⚖️ Prayers For The Oath And For Defeat In Battle
---
## ⚖️ An Oath Be Laid Upon Him To Cause Him To Swear

Ancient Israel had no lie detectors or forensic evidence for hard disputes.

When there were no witnesses, an accused person could be required to swear an innocence oath.

That oath was taken before the altar, calling on God to judge if it was false.

Solomon asks God to actually act whenever this custom happens in His house.

⚖️ No lie detectors existed back then

🙋 An accused person could swear an oath

🛐 The altar functioned like a courtroom

📖 Solomon asks God to judge honestly

## ⚖️ Condemning The Wicked, To Bring His Way Upon His Head

"Bring his way upon his head" means the guilty person receives the consequences of his own actions.

This is the first of seven specific requests Solomon lists in this prayer.

Each request asks God to act as the true judge when human courts fall short.

God alone can see the truth no oath or witness could fully prove.

⚖️ His own actions come back on him

🥇 This opens seven specific requests

👨‍⚖️ God judges when courts cannot

📖 Only God sees the full truth

## ⚔️ Smitten Down Before The Enemy

This phrase pictures Israel's army losing badly and being struck down in battle.

Deuteronomy already warned defeat like this would follow if Israel turned from God.

Solomon is not inventing a new idea.

He is quoting a consequence God had already promised.

⚔️ Israel's army is pictured losing badly

📜 Deuteronomy already warned of this outcome

🔁 Solomon quotes an old warning

📖 This request assumes future failure is coming

## 🙏 Confess Thy Name, And Pray, And Make Supplication

"Supplication" means a humble, earnest request, more urgent than a routine prayer.

Confessing God's name meant publicly admitting the LORD alone was the true God.

This step matters because Israel's defeat often came from chasing after other gods.

Turning back always starts with naming the one true God again.

🙏 Supplication means an urgent, humble request

📛 Confessing His name means admitting the truth

🚫 Idols were often the real problem

📖 Turning back starts with naming God again

## 🏡 Bring Them Again Unto The Land

This is a request for restoration, not just forgiveness after defeat.

Solomon asks God to bring defeated, scattered Israelites back to their own land.

Centuries later, this exact prayer would matter during Israel's exile to Babylon.

Solomon is praying for a future crisis he could not have known the details of.

🏡 This asks for full restoration

🗺️ Not just forgiveness, but a return home

🏰 This mattered greatly during the Babylonian exile

📖 Solomon prayed ahead for a crisis to come

# FirstKingsEight 8:35-40
# 🌾 Prayers For Drought, Famine, And Plague
---
## 🚪 Heaven Is Shut Up, And There Is No Rain

This pictures the sky itself as a door that closes and stops the rain.

In Israel's farming economy, no rain within a single season could mean real hunger.

The text names sin as the specific cause of this kind of drought.

This links a physical hardship directly back to a spiritual condition.

🚪 Heaven shut means the sky withholds rain

🌾 No rain could mean real hunger fast

⚡ Sin is named as the cause here

📖 A physical problem points to a spiritual one

## 📖 Teach Them The Good Way Wherein They Should Walk

Solomon does not just ask God to send rain and stop there.

He asks God to teach Israel how to live well going forward.

This shows the real goal was correction, not just relief from the drought.

Solomon wants the nation changed, not just comfortable again.

🌧️ Rain alone was not the real goal

📖 Solomon also asks for teaching

🔄 Correction mattered more than comfort

➡️ God wanted real change, not comfort

## 🌬️ Blasting, Mildew, Locust

"Blasting" and "mildew" were crop diseases caused by scorching wind and fungus.

Locusts and caterpillars were insect swarms that could strip a field bare in days.

These same disasters had struck Egypt centuries earlier, back when Israel was still enslaved there.

Solomon is asking God to hear Israel even when the exact plagues of Egypt return on their own land.

🌬️ Blasting and mildew were crop diseases

🦗 Locusts could strip a field bare fast

🇪🇬 These disasters once struck Egypt too

📖 Solomon asks God to hear even old plagues

## 💔 Every Man The Plague Of His Own Heart

This means each person recognizes his own specific sin, not just a general problem.

Physical plagues in the land often point back to something wrong inside a person.

Solomon prays for individuals here, not just the nation as one large group.

Every person spreading his hands toward the temple is bringing a personal, private need.

💔 Each person knows his own sin

🔍 Outer plagues can point to inner problems

🙋 Solomon prays for individuals, not just the nation

📖 Every private need reaches God through this house

## 🔁 Thou, Even Thou Only, Knowest The Hearts

Solomon repeats the word "thou" three times in a row for emphasis.

No human judge, priest, or king can actually see inside another person's heart.

Only God has that kind of complete access to what someone truly thinks and feels.

This is why Solomon keeps asking God, and not people, to judge these hidden matters.

🔁 Thou repeats three times for emphasis

🙈 No human can see inside a heart

👁️ Only God has that access

📖 That is why God alone judges

## 🎯 That They May Fear Thee All The Days

The ultimate goal of every answered prayer here was not comfort alone.

Solomon wants these answers to build lasting reverence for God in Israel's daily life.

"Fear" in this sense means deep respect and awe, not being scared or afraid.

Every drought, plague, or disaster answered was meant to point people back to God.

🎯 The goal was more than comfort

🙇 Fear here means deep respect, not fright

📅 This reverence was meant to last daily

📖 Every answered prayer pointed back to God

# FirstKingsEight 8:41-45
# 🌍 Prayers For The Stranger And For Battle
---
## 🌍 A Stranger, That Is Not Of Thy People Israel

"Stranger" here means a foreigner, someone completely outside Israel's covenant family.

Solomon deliberately includes people outside Israel in this dedication prayer.

That inclusion was unusual, since most ancient nations only prayed for their own people.

This moment hints at a much bigger purpose for the temple than Israel alone.

🌍 Stranger means someone outside Israel

🙏 Solomon prays for outsiders on purpose

🏛️ Most nations only prayed for themselves

📖 The temple's purpose reached beyond Israel

## 💪 Thy Strong Hand, And Thy Stretched Out Arm

This exact phrase appears many times throughout the first five books of the Bible.

It describes God's power shown when He rescued Israel out of slavery in Egypt.

A foreigner hearing about this event would hear about Israel's God specifically, not a vague idea of religion.

Solomon expects God's reputation to travel to nations that never witnessed the exodus themselves.

💪 This phrase recalls the exodus power

📜 It repeats often across the first five books

🌍 Foreigners would hear this same reputation

📖 God's fame was expected to travel far

## 🌎 That All People Of The Earth May Know Thy Name

This line states the larger purpose behind the entire temple project.

Israel was never meant to keep God's name to itself.

The nation existed partly to make God known to every other nation on earth.

This same purpose runs from Abraham's original calling all the way through the whole Bible.

🌎 This states the temple's larger purpose

🚫 Israel was not meant to keep God private

📢 Israel existed to make God known

📖 This purpose runs through the whole Bible

## 🗺️ Whithersoever Thou Shalt Send Them

"Whithersoever" is an old word simply meaning "wherever."

Solomon assumes Israel's wars would happen only at God's direction, not the king's own ambition.

This request assumes obedience, the people would fight only where God sent them.

That assumption placed a real limit on human power in Israel's government.

🗺️ Whithersoever means wherever

🧭 Wars were meant to follow God's direction

⚔️ Not the king's own ambition

📖 This limited human power in Israel

## ⚖️ Maintain Their Cause

"Cause" here means their side of a conflict or a legal dispute.

Asking God to maintain their cause meant asking Him to act as their defender.

This was not a blank request for victory in every fight, right or wrong.

Solomon is asking God to back Israel specifically when their cause was just.

⚖️ Cause means their side of a conflict

🛡️ Solomon asks God to be their defender

🚫 Not a blank check for every war

📖 God's backing depended on a just cause

# FirstKingsEight 8:46-53
# ⛓️ The Prayer For Captivity And Return
---
## 💯 There Is No Man That Sinneth Not

Solomon pauses his own prayer to state a hard truth about every person.

No one, not even Israel's most faithful people, lives a completely sinless life.

This admission comes before Solomon even describes exile, defeat, or disaster.

Solomon is preparing Israel to expect failure, and to know God's mercy would still be there.

💯 No one lives completely sinless

⏸️ Solomon pauses to state this plainly

🔮 This comes before describing exile at all

📖 Mercy was ready even before the failure

## 🔮 Carry Them Away Captives Unto The Land Of The Enemy

Solomon prays about a national exile centuries before it actually happened.

Both the northern kingdom of Israel and later Judah would be carried off, exactly as described here.

Assyria conquered the north, and Babylon later conquered the south.

This prayer reads almost like a preview of events still generations away.

🔮 Solomon describes an exile before it happened

🏹 Assyria later conquered the northern kingdom

🦁 Babylon later conquered the southern kingdom

📖 This prayer previewed real future history

## 🧠 Bethink Themselves In The Land Whither They Were Carried Captives

"Bethink themselves" is an old phrase meaning to stop and reconsider, to come to their senses.

This describes the turning point where captive Israelites finally recognize their own sin.

"Repent" means an actual change of direction, not just feeling sorry.

This turning could happen even far from home, in the middle of a foreign land.

🧠 Bethink means to come to their senses

🔄 Repent means an actual change of direction

😔 Not just feeling sorry

📖 This turn could happen even in exile

## ❤️ Return Unto Thee With All Their Heart, And With All Their Soul

This phrase echoes the exact wording of the great command in Deuteronomy chapter six.

Israel was always called to love and follow God with everything they had.

Solomon prays that real repentance in exile would look like that same wholehearted return.

Partial, halfway sorrow was never what this prayer had in mind.

📜 This echoes Deuteronomy's great command

❤️ Heart and soul means everything a person has

🔄 Repentance should match that same wholeness

📖 Halfway sorrow was not the goal here

## 💗 Give Them Compassion Before Them Who Carried Them Captive

Solomon asks God to soften the hearts of the very captors holding Israel prisoner.

This is a remarkable request, asking mercy even from Israel's enemies.

Years later, the Persian king Cyrus would show exactly this kind of unexpected compassion.

Cyrus allowed the exiled Jews to return home and even helped rebuild the temple.

💗 Solomon asks God to soften enemy hearts

🙏 This is mercy prayed for from enemies

👑 Cyrus later showed this kind of compassion

📖 He even helped rebuild the temple later

## 🔥 The Midst Of The Furnace Of Iron

A furnace of iron was used to melt and refine metal at extreme heat.

Egypt's slavery is pictured here as exactly that kind of brutal, forced labor.

The image is not exaggeration, ancient Egyptian building projects used exhausting, forced human labor.

Solomon reminds God, and the people, exactly what kind of bondage they had already been rescued from once.

🔥 A furnace melted metal at extreme heat

⛓️ Egypt's slavery is pictured the same way

🧱 Egyptian building projects used forced labor

📖 God had already rescued them once before

## 🌟 Separate Them From Among All The People Of The Earth

This describes Israel's unique status, set apart from every other nation on earth.

Being chosen was never about being better than other people.

It was about carrying God's name and purpose out into the world.

Solomon closes this long prayer by returning to that original, defining calling.

🌟 Israel was set apart from other nations

🚫 Chosen did not mean better

📢 It meant carrying God's purpose forward

📖 Solomon returns to Israel's original calling

# FirstKingsEight 8:54-61
# 🙌 Solomon's Final Blessing And Charge
---
## 🙇 Kneeling On His Knees With His Hands Spread Up To Heaven

This verse reveals a detail not mentioned earlier, Solomon had been kneeling the entire prayer.

Verse twenty two only said he stood with hands spread toward heaven.

Now readers learn he had lowered himself all the way to his knees at some point.

That posture shows real humility from a king in front of his entire nation.

🙇 Solomon had been kneeling this whole time

📏 Verse twenty two only mentioned standing

🙌 His hands stayed spread toward heaven

📖 A king humbled himself before his people

## 💯 There Hath Not Failed One Word Of All His Good Promise

Solomon declares that every single promise God ever made to Israel came true.

Not one word failed, not one promise fell short.

This includes the promises made through Moses generations earlier.

Solomon's own finished temple was living proof of that same faithfulness.

💯 Every promise God made came true

🚫 Not one word failed

📜 This includes promises made through Moses

📖 The temple itself proved that faithfulness

## 📜 Let Him Not Leave Us, Nor Forsake Us

This exact plea echoes words Moses once spoke to Joshua before Israel entered the promised land.

Solomon is asking for that same ongoing presence, generations later.

Having the temple built did not guarantee God would automatically stay.

The relationship with God still had to be maintained, not assumed.

📜 This echoes Moses' words to Joshua

🕰️ Solomon asks for the same presence

🚫 A temple did not guarantee God's presence

📖 The relationship still had to be kept

## 📐 Incline Our Hearts Unto Him

"Incline" means to bend or lean something in a certain direction.

Solomon is not just asking for outward obedience to rules.

He is asking God to actually shape and turn the people's inner desires.

Real obedience always starts with a heart that wants to follow, not just a body that complies.

📐 Incline means to bend or lean

🎯 This is not just outward obedience

❤️ Solomon asks God to shape their hearts

📖 Real obedience starts on the inside

## 📜 Commandments, And His Statutes, And His Judgments

These are three different Hebrew words for law bundled together in one phrase.

"Commandments" are direct moral instructions, like the Ten Commandments.

"Statutes" are lasting decrees meant to shape everyday practice and worship.

"Judgments" are case by case rulings, the kind a judge would apply to a specific dispute.

📜 Three separate legal terms are bundled here

✋ Commandments are direct moral instructions

🏛️ Statutes are lasting decrees for daily life

📖 Judgments are case by case rulings

## 🌍 That All The People Of The Earth May Know That The LORD Is God

This repeats almost the exact same missional purpose Solomon named earlier in verse forty three.

The goal was never for Israel alone to know God.

It was for the whole earth to eventually recognize Him as the only true God.

Solomon frames the entire temple project around this one massive purpose.

🔁 This repeats verse forty three's purpose

🌍 The whole earth was the intended audience

☝️ The LORD alone is the true God

📖 The temple served this massive purpose

## 💯 Let Your Heart Therefore Be Perfect With The LORD Our God

"Perfect" here does not mean sinless or flawless in this context.

It means wholly devoted, undivided, fully committed to God alone.

Solomon closes his blessing by calling Israel to that kind of complete loyalty.

This same call echoes through the rest of the book of Kings.

💯 Perfect here does not mean sinless

❤️ It means wholly and fully devoted

🙏 Solomon calls Israel to complete loyalty

📖 This call echoes through the rest of Kings

# FirstKingsEight 8:62-66
# 🎉 The Dedication Feast
---
## 🔥 A Sacrifice Of Peace Offerings

A peace offering differed from a burnt offering, which was completely burned on the altar.

Only part of a peace offering was burned.

The rest was cooked and eaten by the worshipers and priests.

It pictured fellowship, God and His people sharing a meal together.

🔥 Burnt offerings were fully burned up

🍖 Peace offerings were partly eaten

🤝 It pictured a shared meal with God

📖 This fit the mood of celebration

## 🐂 Two And Twenty Thousand Oxen, And An Hundred And Twenty Thousand Sheep

That totals twenty two thousand oxen and one hundred twenty thousand sheep.

Feeding a crowd this size for over a week required an enormous, coordinated effort.

Numbers this large in ancient records often signaled overwhelming scale rather than an exact tally.

Either way, the point stands, Solomon spared nothing for this dedication.

🐂 Twenty two thousand oxen were offered

🐑 One hundred twenty thousand sheep as well

📊 Ancient numbers often signaled overwhelming scale

📖 Solomon spared nothing for this day

## 🏛️ Hallow The Middle Of The Court

Solomon set apart the open courtyard in front of the temple for this one day.

The regular bronze altar could not physically hold this much sacrifice.

Solomon expanded the sacred space instead of turning worshipers away.

That kind of resourcefulness reveals how much care went into this celebration.

🏛️ Solomon set apart the whole courtyard

⚙️ The regular altar was simply too small

📐 He expanded the sacred space to fit

📖 Real care went into this celebration

## 🧭 From The Entering In Of Hamath Unto The River Of Egypt

This phrase names the far north and far south edges of Israel's territory.

Hamath sat near Israel's northern border, and the river of Egypt marked the southern edge.

Naming both edges together is a way of saying the whole nation gathered, not just people from nearby.

This celebration pulled in Israelites from every corner of the land.

🧭 Hamath marked the northern edge

🗺️ The river of Egypt marked the south

🌍 Naming both means the whole nation came

📖 Every corner of the land was represented

## 🗓️ Seven Days And Seven Days, Even Fourteen Days

This celebration actually combined two separate week long events into one long stretch.

The first week dedicated the temple itself.

The second week overlapped with the regularly scheduled Feast of Tabernacles.

Fourteen straight days of national worship was an extraordinary length even for Israel.

🗓️ Two separate weeks combined into one

🏛️ Week one dedicated the temple

⛺ Week two was the Feast of Tabernacles

📖 Fourteen days of worship was extraordinary

## 😊 Joyful And Glad Of Heart

This phrase closes the entire dedication account on a note of genuine happiness.

The people were not just relieved the ceremony had ended.

They were celebrating everything God had done for David and for the whole nation.

The temple's dedication ends the way it should, with a grateful, joyful people.

😊 The chapter closes on real happiness

🙌 This was not simple relief

👑 They celebrated God's goodness to David

📖 A grateful people close the temple's dedication`.trim();

export const FIRST_KINGS_EIGHT_PERSONAL_SECTIONS = parseFirstKingsEightRawNotes(FIRST_KINGS_EIGHT_RAW_NOTES);
