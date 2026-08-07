export type DeuteronomyTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyTenRawNotes(rawText: string): DeuteronomyTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 10:${startVerse}` : `Deuteronomy 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Deuteronomy 10 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_TEN_RAW_NOTES = `# Deuteronomy 10:1-5
# 🪨 A New Set Of Tablets
---
## 🪨 Hew Thee Two Tables Of Stone

"Hew" means to cut or shape something by striking it with a tool.

Moses has to carve these tables himself this time.

Deuteronomy nine already told what happened to the first set.

Moses smashed them in anger over the golden calf.

God does not simply hand Moses a replacement.

He requires Moses to do the physical work again.

🪨 Hew means to cut or shape
📜 Deuteronomy nine told the earlier story
💔 Moses broke the first tables himself
📖 This time the work falls to him
---
## 🔁 Like Unto The First

The replacement tables must match the original tables exactly.

Nothing about God's law changes just because Israel failed once.

Grace here does not mean a softer version of the law.

It means the same law given a second chance.

🔁 Like unto the first means an exact match
⚖️ The law itself does not change
🕊️ Grace does not soften the commandments
📖 God gives the same law a second chance
---
## 📦 Make Thee An Ark Of Wood

Moses says he made the ark himself in this verse.

The official Ark of the Covenant was actually built later by Bezaleel.

Exodus thirty seven describes that finished box covered in gold.

Many scholars believe Moses first built a plain wooden chest.

That chest held the tables safely until the golden ark was ready.

Two boxes fill two different needs in the same story.

📦 Moses built this ark himself here
🏗️ Bezaleel built the finished golden ark later
🌳 This was likely a plain wooden chest
📖 Two arks served two different moments
---
## 💥 Which Thou Brakest

"Brakest" is an old way of saying broke.

Moses is talking about himself in this line.

He shattered the first tables at the bottom of the mountain.

Exodus thirty two and Deuteronomy nine both told that story already.

He carries new stone up the same mountain instead.

💥 Brakest is an old word for broke
🏔️ Moses broke the first tables himself
📜 Exodus and Deuteronomy already told this
📖 He now carries the replacement uphill
---
## 🌳 An Ark Of Shittim Wood

"Shittim" refers to acacia, a hard, thorny tree common in the desert.

Acacia wood resists rot and insects far better than most trees.

It was one of the few strong woods available in this wilderness.

The same wood was used to build the tabernacle's furniture.

Moses reaches for the sturdy, practical material close at hand.

🌵 Shittim means acacia, a desert tree
🪵 Acacia resists rot and insects
⛺ The tabernacle furniture used this wood
📖 Moses used what the desert provided
---
## ✍️ According To The First Writing

God writes the exact same words onto the new tables.

Nothing is edited or softened this time.

This is the first time the text names them the ten commandments directly.

The phrase itself becomes attached to this exact moment.

The law survives Israel's failure completely unchanged.

✍️ God rewrites the exact same words
🔟 Ten commandments is named here directly
🔒 Nothing in the law gets softened
📖 Failure never changes what God requires
---
## 📯 In The Day Of The Assembly

"The assembly" refers to the day Israel gathered at the base of the mountain.

That was the day God spoke the ten commandments aloud to the whole nation.

Deuteronomy four already called that same day by this exact name.

Moses keeps returning to that one defining day throughout this book.

📯 Assembly means Israel gathered at the mountain
🔥 God spoke the commandments aloud that day
📜 Deuteronomy four already used this name
📖 One gathering still shapes this whole book
---
## 🙌 The LORD Gave Them Unto Me

Moses ends the sentence by naming exactly who gave him the tables.

He does not claim credit for writing a single word himself.

The commandments came from God, carried down by a human hand.

He is a messenger, not the author of what he teaches.

🙌 God gave Moses the finished tables
🚫 Moses claims no authorship himself
📬 He only carried what God wrote
📖 Moses teaches as a messenger, not an author
---
## 🔒 There They Be, As The LORD Commanded Me

The tables stay inside the ark from this moment forward.

Moses reports finishing the task exactly as God had instructed.

No detail of the assignment gets left undone.

This short line closes out the whole tablets story that began back in Exodus.

🔒 The tables stay inside the ark
✅ Moses finished the task exactly as told
📦 Nothing in the assignment was skipped
📖 The ark now holds God's own words

# Deuteronomy 10:6-9
# 🪦 Aaron's Death, Remembered Again
---
## 🗺️ Took Their Journey From Beeroth Of The Children Of Jaakan To Mosera

This verse suddenly jumps backward into a much older travel note.

Moses briefly steps outside the story he has been telling.

Numbers thirty three lists this same stretch of the wilderness journey.

That account places Aaron's death near Mount Hor, not Mosera by name.

Many scholars believe Mosera sat within the same district as Mount Hor.

The two accounts describe one event from two different angles.

🗺️ This jumps back into an older travel note
📜 Numbers thirty three records this same journey
⛰️ Mount Hor and Mosera likely sat close together
📖 Two accounts, one same remembered event
---
## ⚰️ There Aaron Died, And There He Was Buried

Aaron never reached the promised land he had led people toward for decades.

Numbers twenty already told this same death in full detail.

Moses brings it up again here, in the middle of a different speech.

Even Israel's first high priest still faced the same wilderness judgment as everyone else.

⚰️ Aaron died outside the promised land
📜 Numbers twenty told this story already
👑 Even the high priest faced judgment
📖 No one in that generation was exempt
---
## 👨‍👦 Eleazar His Son Ministered In The Priest's Office In His Stead

"In his stead" means Eleazar stepped into his father's exact role.

The priesthood does not end with Aaron's death.

It simply passes to the next generation in line.

This same handoff was already described fully in Numbers twenty.

👨‍👦 In his stead means taking the same role
🔄 The priesthood passes to the next generation
📜 Numbers twenty already described this handoff
📖 God's plan outlives any one leader
---
## 💧 A Land Of Rivers Of Waters

Most of this wilderness journey crossed dry, difficult ground.

Jotbath stood out as a rare spot with real flowing water.

A detail like this would have meant relief after a hard march.

The text remembers comfort along with hardship on this journey.

💧 Jotbath had real flowing water
🏜️ Most of the journey crossed dry ground
😌 A place like this brought real relief
📖 The journey held hardship and comfort both
---
## ✂️ The LORD Separated The Tribe Of Levi

"Separated" means set apart for a specific, sacred purpose.

Levi was chosen for holy service instead of soldiering or farming.

This decision is placed right after Aaron's death for a reason.

The chapter is explaining exactly why Levi's whole tribe carries priestly duties.

✂️ Separated means set apart for a purpose
⛪ Levi was chosen for sacred service
🔗 This explains the tribe's ongoing role
📖 Aaron's death and Levi's calling connect here
---
## 🪵 To Bear The Ark Of The Covenant

Levites physically carried the ark on long wooden poles.

No wheels or wagons touched this sacred object during travel.

This job belonged specifically to the Kohathite family within the tribe of Levi.

Carrying the ark was treated as an honor, not ordinary labor.

🪵 Levites carried the ark on poles
🚫 No wheels or wagons were used
👪 The Kohathites held this specific duty
📖 Carrying the ark was a true honor
---
## 🏞️ Levi Hath No Part Nor Inheritance With His Brethren

Every other tribe received its own section of the promised land.

Levi alone received no territory to farm or settle.

That absence was not a punishment or an oversight.

It was a deliberate choice tied to Levi's sacred assignment.

🗺️ Other tribes each received their own land
🚫 Levi received no territory at all
🎯 This absence was a deliberate choice
📖 Levi's calling replaced a normal inheritance
---
## 🙏 The LORD Is His Inheritance

Levites lived on tithes and offerings instead of crops or herds.

Their daily support came directly from the people's worship, not from farmland.

This arrangement kept the priesthood dependent on God, not on property.

The phrase describes a relationship, not a plot of ground.

🍞 Levites lived on tithes and offerings
🌾 No farmland supported their daily needs
🙏 This kept the priesthood dependent on God
📖 A relationship replaced a plot of ground

# Deuteronomy 10:10-11
# ⛰️ Forty Days, One More Time
---
## ⛰️ According To The First Time, Forty Days And Forty Nights

Moses spent another full forty days on the mountain this time.

Deuteronomy nine already described the first forty day stay in detail.

That first stay ended with Moses pleading for Israel's life.

This second stay produces the replacement tables God promised.

⛰️ Moses stayed forty days a second time
📜 Deuteronomy nine described the first stay
🙏 That first stay ended in pleading
📖 This stay produces the replacement tables
---
## 🕊️ The LORD Would Not Destroy Thee

Moses states the outcome of his forty day prayer plainly.

Israel deserved judgment after building the golden calf.

God chose mercy instead of destroying the whole nation.

This single line closes out the crisis that filled the previous chapter.

🙏 Moses had pleaded for forty days
⚖️ Israel deserved real judgment
🕊️ God chose mercy over destruction
📖 This line closes the golden calf crisis
---
## 🧍 Arise, Take Thy Journey Before The People

"Arise" is a command to get moving immediately.

"Before the people" means Moses is told to lead from the front.

The crisis is over, so the journey can now continue.

God redirects Moses from pleading back to leading.

🧍 Arise means get moving now
🚶 Before the people means leading from the front
🔁 God redirects Moses back to leading
📖 The journey resumes after the crisis
---
## 🤝 Which I Sware Unto Their Fathers

"Sware" is simply an old form of the word swore.

God is not making a brand new promise here.

He is fulfilling the same oath sworn to Abraham, Isaac, and Jacob.

That promise stretches all the way back to Genesis.

📜 Sware is an old form of swore
🤝 This is not a brand new promise
👴 Abraham, Isaac, and Jacob received this oath first
📖 One promise stretches back to Genesis

# Deuteronomy 10:12-13
# ❤️ What The LORD Truly Requires
---
## ❓ What Doth The LORD Thy God Require Of Thee

Moses asks this question out loud to the whole nation.

It sounds like a hard demand, but the list that follows is short.

This same question gets echoed centuries later in the prophet Micah.

The whole book of Deuteronomy can be summed up in this one line.

❓ Moses asks this question directly
📋 The list that follows is short
📜 Micah later echoes this same question
📖 This line summarizes the whole book
---
## 😨 To Fear The LORD Thy God

"Fear" here does not mean being terrified of God.

It means deep respect that shapes how a person actually lives.

A child can fear a parent's authority while still loving them completely.

That mix of respect and love is exactly what this word carries.

😨 Fear does not mean pure terror
🙇 It means deep, life shaping respect
👨‍👧 Like a child respecting a parent
📖 Respect and love work together here
---
## 🚶 To Walk In All His Ways

"Walk" is a common Bible picture for how someone lives day to day.

It has nothing to do with actual footsteps.

Walking in God's ways means letting his commands shape daily choices.

The picture keeps showing up throughout the whole book of Deuteronomy.

🚶 Walk pictures a whole way of life
🧭 It is not about literal footsteps
📋 God's commands shape daily choices
📖 This picture repeats throughout Deuteronomy
---
## ❤️ And To Love Him

Love appears here as something Israel is commanded to do.

Ancient treaties between kings and their subjects sometimes used this same word.

In that setting, love meant loyalty, not just a feeling.

God asks for loyalty that also runs emotionally deep.

❤️ Love is commanded here, not optional
📜 Ancient treaties used this same word
🤝 It meant loyalty, not only feeling
📖 God wants loyalty and real affection
---
## 🧠 With All Thy Heart And With All Thy Soul

"Heart" in this culture meant the mind and the will, not just emotion.

"Soul" points to a person's whole inner life and being.

Together the two words describe total, undivided devotion.

Nothing is supposed to be held back from this kind of love.

🧠 Heart meant the mind and will
💫 Soul means a person's whole being
🔗 Together they describe total devotion
📖 Nothing here is meant to be held back
---
## 🎯 For Thy Good

Moses adds a reason at the very end of this command.

The commandments were not handed down to make life harder.

They were designed to protect and benefit the people who kept them.

God's law and Israel's good are not in conflict here.

🎯 Moses gives the reason for the command
🛡️ The law was never meant to burden
✅ It was designed to protect and help
📖 God's law and Israel's good align

# Deuteronomy 10:14-15
# 🌌 Everything Already Belongs To God
---
## 🌌 The Heaven And The Heaven Of Heavens

"Heaven of heavens" is a Hebrew way of naming the highest possible point.

Repeating a word like this in Hebrew usually signals totality, not just size.

The phrase means every level of the sky, from the nearest to the farthest.

Nothing in the universe sits outside this claim.

🌌 Heaven of heavens means the highest point
🔁 Repeating a word signals totality in Hebrew
🌠 Every level of sky is included
📖 Nothing sits outside this claim
---
## 🌍 Is The LORD's Thy God

The whole earth already belonged to God before Israel existed.

Choosing Israel was never about God needing more territory.

He owned everything already, with room to spare.

That fact makes the choice in the next verse even more striking.

🌍 The earth already belonged to God
🚫 God did not need more territory
💰 He already owned everything, completely
📖 That makes his choice of Israel striking
---
## 😊 Only The LORD Had A Delight In Thy Fathers

"Delight" describes genuine affection, not a cold, formal duty.

"Only" narrows this down to one specific family out of the whole earth.

God is not obligated to love anyone by nature.

He chose to delight in Abraham, Isaac, and Jacob freely.

😊 Delight means genuine affection, not duty
🎯 Only narrows this to one family
🆓 God was never obligated to choose them
📖 He delighted in them freely
---
## 🌱 He Chose Their Seed After Them, Even You

God's choice did not stop with the original fathers.

"Their seed after them" means every generation that followed.

"Even you" includes the exact people listening to Moses right now.

The promise made to Abraham reaches all the way to this audience.

🌱 Their seed means every following generation
👥 Even you means this exact audience
🔗 One promise connects every generation
📖 Abraham's promise reaches this crowd directly
---
## 🚫 Above All People, As It Is This Day

"Above all people" does not mean Israel was somehow better than others.

Deuteronomy seven already explained that Israel was the smallest of the nations.

The choice was about God's love, not about Israel's size or strength.

"As it is this day" means the choice still stood, right up to this moment.

🚫 Above all people does not mean superior
📜 Deuteronomy seven already explained their small size
❤️ The choice rested on love, not strength
📖 This day means the choice still stands

# Deuteronomy 10:16-19
# 💔 A Circumcised Heart
---
## ✂️ Circumcise Therefore The Foreskin Of Your Heart

Physical circumcision marked every Israelite man as part of God's covenant.

Genesis seventeen first introduced that sign to Abraham's whole household.

Here Moses applies the same picture to the heart instead of the body.

An inward change is supposed to match the outward sign already given.

✂️ Circumcision marked the covenant physically
📜 Genesis seventeen introduced this sign
❤️ Moses now applies it to the heart
📖 The inside is meant to match the outside
---
## 🐂 Be No More Stiffnecked

"Stiffnecked" already appeared back in Deuteronomy nine.

The picture comes from an ox refusing to turn its neck toward the yoke.

A stiffnecked animal resists its owner's direction on purpose.

Moses is asking Israel to stop resisting God's guidance the same way.

🐂 Stiffnecked pictures an ox resisting the yoke
📜 Deuteronomy nine used this word already
🚫 It describes stubborn resistance on purpose
📖 Moses asks Israel to stop resisting
---
## 👑 God Of Gods, And Lord Of Lords

"God of gods" repeats a word to express the highest possible rank.

The same pattern appears in phrases like holy of holies.

It means God stands supreme over every rival power people worshiped.

No other god in the ancient world could actually compete.

👑 God of gods means the highest rank
🔁 Repeating the word signals supremacy
⚡ God outranks every rival power
📖 No other god could truly compete
---
## ⚖️ Which Regardeth Not Persons, Nor Taketh Reward

"Regardeth not persons" means God cannot be bribed or impressed by status.

Human judges in the ancient world often favored the rich or powerful.

God's judgment works exactly the opposite way, without favoritism.

Wealth, position, and connections carry no weight in front of him.

⚖️ Regardeth not persons means no favoritism
💰 Human judges often favored the wealthy
🚫 God cannot be bribed or impressed
📖 Status carries no weight before God
---
## 👶 He Doth Execute The Judgment Of The Fatherless And Widow

"The fatherless and widow" were two of the most vulnerable people in this culture.

Without a husband or father, a woman or child had little legal protection.

God personally takes up their case as their advocate.

The verses that follow will ask Israel to imitate this same care.

👶 Fatherless and widow lacked legal protection
⚖️ God personally defends their case
🛡️ He acts as their advocate
📖 Israel is asked to imitate this care
---
## 🧳 Loveth The Stranger, In Giving Him Food And Raiment

"The stranger" refers to a foreigner living among Israel without family land.

"Raiment" is an old word for clothing.

God provides for this outsider's most basic needs, food and clothing.

Care for the vulnerable extends beyond Israel's own family lines.

🧳 Stranger means a foreigner without land
👕 Raiment is an old word for clothing
🍞 God provides food and clothing for them
📖 God's care reaches beyond Israel's own family
---
## 🔄 Love Ye Therefore The Stranger

The command flips from describing God's character to describing Israel's duty.

God loved the stranger, so now Israel must do the same.

This is not a suggestion tucked into a list of ideas.

It is framed as a direct command, just like the others in this chapter.

🔄 God's example becomes Israel's command
❤️ Israel must now love the stranger too
📋 This is a direct command, not a suggestion
📖 God's character sets the standard here
---
## 🔗 For Ye Were Strangers In The Land Of Egypt

Moses grounds this command in Israel's own memory.

Israel had once been foreign, powerless slaves inside Egypt.

That shared experience is supposed to produce real empathy, not just rules.

Remembering weakness should soften how power gets used later.

🔗 The command is grounded in memory
⛓️ Israel had once been powerless slaves
💗 Shared experience should produce empathy
📖 Remembering weakness should shape how power is used

# Deuteronomy 10:20-22
# ⭐ From Seventy To The Stars
---
## 🤝 Him Shalt Thou Serve, And To Him Shalt Thou Cleave

"Cleave" means to hold on tightly and never let go.

Genesis two uses this exact same word for the bond between husband and wife.

Israel's relationship with God is pictured here as that close.

Service alone is not the goal, closeness is.

🤝 Cleave means holding on tightly
💍 Genesis two used this word for marriage
❤️ Israel's bond with God is pictured that close
📖 Closeness matters more than service alone
---
## 🗣️ Swear By His Name

Swearing by someone's name meant calling on that name as a guarantee.

Ancient people often swore oaths by whichever god they trusted most.

Israel is told to swear only by the LORD's own name.

That choice was itself a public statement about loyalty.

🗣️ Swearing meant calling a name as guarantee
🌍 Other nations swore by other gods
✅ Israel swears only by the LORD
📖 The choice itself declared loyalty
---
## 🎉 He Is Thy Praise, And He Is Thy God

"Thy praise" means God alone deserves Israel's boasting.

Other nations boasted about their armies, kings, or gods.

Israel is told to boast about the LORD instead.

That kind of praise reshapes what a whole nation values.

🎉 Thy praise means God deserves the boasting
⚔️ Other nations boasted about armies and kings
🙌 Israel boasts about the LORD instead
📖 This reshapes what the nation values
---
## ⚡ These Great And Terrible Things, Which Thine Eyes Have Seen

"Great and terrible things" refers to real events this generation actually witnessed.

The plagues in Egypt, the crossing of the sea, and the fire at Sinai all count.

"Thine eyes have seen" rules out any excuse of secondhand doubt.

This audience is not being asked to take Moses's word alone.

⚡ Great and terrible things means real events
🌊 The plagues and the sea both count
👁️ Thine eyes have seen removes any doubt
📖 This generation witnessed it firsthand
---
## 🔢 Thy Fathers Went Down Into Egypt With Threescore And Ten Persons

"Threescore and ten" is an old way of saying seventy.

Genesis forty six already counted Jacob's household at that same number.

Seventy people entered Egypt as one small, extended family.

That tiny starting number makes the next line even more striking.

🔢 Threescore and ten means seventy
📜 Genesis forty six recorded that same count
👪 Seventy people entered Egypt as one family
📖 A small start makes the growth striking
---
## ⭐ As The Stars Of Heaven For Multitude

God had promised Abraham descendants as countless as the stars.

Genesis fifteen recorded that promise long before Israel became a nation.

Seventy people had grown into a number too large to count easily.

The whole chapter closes by pointing back at a promise finally coming true.

⭐ Stars pictures a countless, growing number
📜 Genesis fifteen recorded this promise first
📈 Seventy people grew into a whole nation
📖 The chapter closes on a promise fulfilled
`.trim();

export const DEUTERONOMY_TEN_PERSONAL_SECTIONS = parseDeuteronomyTenRawNotes(DEUTERONOMY_TEN_RAW_NOTES);
