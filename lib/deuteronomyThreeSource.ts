export type DeuteronomyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyThreeRawNotes(rawText: string): DeuteronomyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 3:${startVerse}` : `Deuteronomy 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Deuteronomy 3 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_THREE_RAW_NOTES = `# Deuteronomy 3:1-7
# ⚔️ The Defeat Of Og, King Of Bashan
---
## 🗺️ Then We Turned, And Went Up The Way To Bashan

Bashan was a rich highland region east of the Jordan River.

Its grassy plains were famous across the ancient world for strong cattle and oak trees.

Israel had just finished defeating king Sihon further south.

Now the road curved north into new, unconquered territory.

🗺️ Bashan sat east of the Jordan

🐂 Bashan was famous for its strong cattle

🌳 Bashan was known for its oak trees

📖 Israel marched north from Sihon's land

## 👑 Og The King Of Bashan Came Out Against Us, He And All His People, To Battle At Edrei

Og ruled the entire kingdom of Bashan as its king.

He was the last known survivor of an ancient line of giants.

Edrei was one of his two royal cities, the site of this battle.

Og marched out to fight instead of standing aside.

👑 Og ruled all of Bashan

🏛️ Og was the last giant king

📍 Edrei was one of his royal cities

➡️ Og chose battle over peace

## 🔁 Fear Him Not: For I Will Deliver Him

God repeats a promise Israel had already seen come true.

He said the same thing about Sihon back in chapter two.

One answered prayer becomes proof for trusting the next one.

Og's size and reputation could not change what God already decided.

🔁 This promise echoes the one about Sihon

✅ God already proved this kind of promise

💪 Past victories build trust for new fights

📖 Og's fearsome size could not change God's plan

## ⚔️ We Smote Him Until None Was Left To Him Remaining

Smote means struck down in battle, a word for total defeat.

None was left him remaining describes wiping out Og's entire army.

The complete destruction of the cities themselves comes later in verse six.

Israel had already won this same kind of total victory once, against Sihon.

⚔️ Smote means struck down in battle

🪖 Og's whole army was defeated here

🏘️ The cities are destroyed later, in verse six

📖 Israel had already won this kind of victory

## 🔢 Threescore Cities, All The Region Of Argob

Threescore is an old way to say sixty.

Israel captured sixty separate walled cities in one campaign.

Argob was the name for this whole cluster of cities inside Bashan.

A region this size falling in one battle shows how total Og's defeat was.

🔢 Threescore means the number sixty

🏙️ Israel captured sixty cities at once

🗺️ Argob names this whole city cluster

📖 One battle ended an entire region's rule

## 🧱 All These Cities Were Fenced With High Walls, Gates, And Bars

Fenced cities had strong stone walls built for defense.

Gates could be shut and locked with heavy bars across them.

Cities built like this were meant to survive a long siege.

None of that defense stopped Israel from taking every single one.

🧱 Fenced means built with strong defensive walls

🚪 Gates locked shut with heavy bars

🏰 These cities were built to survive sieges

📖 Not one wall stopped Israel's advance

## ⚖️ We Utterly Destroyed Them, As We Did Unto Sihon

This describes what many scholars call herem, complete destruction dedicated to God as judgment.

It is one of the hardest verses in the book and deserves an honest look.

Moses already applied this same command to Sihon's cities back in chapter two.

This judgment targeted specific nations under specific conditions, not every future war.

⚖️ Herem means complete dedicated destruction

📜 This repeats the judgment already given against Sihon

🎯 This was tied to specific nations

📖 This was not a rule for every war

## 💰 All The Cattle, And The Spoil Of The Cities, We Took For A Prey

Prey here means plunder, goods and animals taken after a battle.

Livestock and property were kept this time, unlike the people themselves.

Israel did the exact same thing after defeating Sihon in chapter two.

Real, practical provision came out of a battle fought on God's promise.

💰 Prey means plunder taken after battle

🐄 Livestock and goods were kept here

🔁 This matches what happened after Sihon

📖 God's promise brought real provision too

# Deuteronomy 3:8-11
# 🛏️ Og, The Last Of The Giants
---
## 👑 Out Of The Hand Of The Two Kings Of The Amorites

The two kings of the Amorites are Sihon and Og, both defeated in these two chapters.

Their combined territory stretched from the river Arnon all the way north to Mount Hermon.

That is the entire eastern side of the Jordan River, top to bottom.

Two kingdoms taken in one campaign became the whole east bank of Israel's future home.

👑 The two kings were Sihon and Og

🗺️ Their land ran from Arnon to Hermon

📏 This covered the whole east bank

📖 Two kingdoms became one new territory

## 🏔️ Which Hermon The Sidonians Call Sirion, And The Amorites Call It Shenir

Hermon was a tall, snow capped mountain marking Israel's far northern border.

The Sidonians were a Phoenician people living along the coast to the northwest.

They called this same mountain Sirion.

The Amorites called it Shenir instead.

One mountain, three names, shows how many nations bordered this land.

🏔️ Hermon marked the northern border

🌊 The Sidonians lived along the coast

📛 Sidonians called this mountain Sirion

📖 Different nations used different names here

## 🗺️ All The Cities Of The Plain, And All Gilead, And All Bashan, Unto Salchah And Edrei

This verse lists everything just captured, region by region.

Gilead was a hilly, forested territory prized for its good grazing land.

Salchah and Edrei marked the eastern edges of Bashan, the campaign's outer limits.

Three separate regions, once three separate dangers, now belonged to Israel at once.

🗺️ This verse lists the whole conquest

🌲 Gilead was known for its good grazing land

📍 Salchah and Edrei marked Bashan's outer edge

📖 Three regions fell in one campaign

## 👹 Only Og King Of Bashan Remained Of The Remnant Of Giants

Remnant means the last survivors left from a larger group.

Chapter two already named several ancient peoples remembered as giants.

Og was the very last king from that same ancient line still alive.

His defeat quietly closes out a story that started generations earlier.

👹 Remnant means the last ones left

📜 Chapter two already named these giant peoples

👑 Og was the last giant king alive

📖 His defeat closes a very old story

## 🛏️ His Bedstead Was A Bedstead Of Iron

A bedstead is the frame that holds up a bed.

Iron was rare and costly in this time period.

This bed was likely kept afterward as proof of Og's unusual size.

Rabbath, an Ammonite city, is named as where the bed could still be seen.

🛏️ Bedstead means the frame of a bed

⚒️ Iron was rare and costly then

🏛️ The bed was likely kept as proof

📖 It stayed on display in Rabbath

## 📏 Nine Cubits Was The Length Thereof, And Four Cubits The Breadth Of It

A cubit measured from the elbow to the fingertips, close to eighteen inches long.

Nine cubits comes out to about thirteen feet in length.

Four cubits comes out to about six feet in width.

That is far larger than any ordinary bed frame of this period.

📏 A cubit was about eighteen inches

📐 Nine cubits equals about thirteen feet

📊 Four cubits equals about six feet

📖 This bed was unusually large

# Deuteronomy 3:12-17
# 🏕️ Land For Reuben, Gad, And Half Manasseh
---
## 👥 Gave I Unto The Reubenites And To The Gadites

Reuben and Gad were two of Jacob's twelve sons, tribes of Israel.

Both tribes owned large herds and asked for this good grazing land back in Numbers.

Moses grants them the southern half of the newly captured territory here.

Their choice to settle east of the Jordan will matter again later in this book.

👥 Reuben and Gad were two tribes of Israel

🐑 Both tribes owned large herds of livestock

🗺️ They received the southern captured land

📖 This choice returns again later in Deuteronomy

## 👹 Which Was Called The Land Of Giants

Manasseh was Joseph's son, and only half of his tribe settles here.

The other half will later receive land west of the Jordan instead.

This region kept the nickname land of giants long after Og's own defeat.

A whole territory carried the memory of the enemy Israel had just defeated.

👨‍👦 Manasseh was Joseph's son

✂️ Only half his tribe settled here

👹 This land kept the nickname land of giants

📖 The land remembered the enemy it once had

## 🏘️ Called Them After His Own Name, Bashanhavothjair

Jair was a descendant of Manasseh who conquered part of this new territory.

He captured a cluster of small towns in the region called Argob.

Havothjair means the villages of Jair in the original language.

Moses notes this name still lasted unto this day, even generations later.

👤 Jair conquered part of this land

🏘️ He captured a cluster of small towns

📛 Havothjair means the villages of Jair

📖 His name outlasted his own lifetime

## 👤 I Gave Gilead Unto Machir

Machir was Manasseh's son and Jair's own father.

He receives Gilead directly, a separate gift inside the larger division.

This one line quietly traces three generations of the same family.

Land grants like this one always follow real family lines here.

👤 Machir was Manasseh's son

👨‍👦 Machir was also Jair's father

🌳 Three generations appear in one line

📖 Land followed family lines here

## 🌊 Even Unto The River Jabbok, Which Is The Border Of The Children Of Ammon

The Jabbok was a river running toward the Jordan, marking Gad's northern edge.

This same river appears generations earlier in Genesis.

Jacob wrestled with God there the night before facing his brother Esau.

A border line in Deuteronomy quietly touches one of Genesis's most personal scenes.

🌊 Jabbok marked Gad's northern border

📜 This river appears back in Genesis

🤼 Jacob wrestled with God at this river

📖 A border touches an old, personal story

## 🌊 From Chinnereth Even Unto The Sea Of The Plain

Chinnereth was the Old Testament name for what is now called the Sea of Galilee.

The name likely comes from a Hebrew word for harp, echoing the lake's curved shape.

Jesus later spent much of His ministry along this exact same shoreline.

One short word in Deuteronomy names a lake the whole New Testament will return to.

🌊 Chinnereth is the Sea of Galilee's old name

🎻 The name likely means harp

✝️ Jesus later ministered along this shore

📖 An old name points toward the New Testament

## 🧂 Even The Salt Sea

The Salt Sea is what today is called the Dead Sea.

Its water holds so much salt and mineral content that almost nothing can live in it.

This body of water marks the southern edge of the land just described.

The boundary spans from the fresh water of Chinnereth to the lifeless Salt Sea.

🧂 The Salt Sea is the Dead Sea today

💀 Almost nothing can live in its water

🗺️ It marked the southern edge of this land

📖 The boundary ran from one sea to another

## ⛰️ Under Ashdothpisgah Eastward

Ashdothpisgah means the slopes beneath Mount Pisgah.

Pisgah was a ridge overlooking the Jordan Valley from the east.

This exact mountain returns later in this very chapter.

Moses will climb it soon to view the land he cannot enter.

⛰️ Ashdothpisgah means the slopes of Pisgah

🗺️ Pisgah overlooked the Jordan Valley

🔁 This mountain returns later in the chapter

📖 Moses will soon view the land from here

# Deuteronomy 3:18-22
# 🛡️ A Promise Before Rest
---
## ⚔️ Ye Shall Pass Over Armed Before Your Brethren The Children Of Israel

Reuben, Gad, and half of Manasseh already had their land, secured east of the Jordan.

God still required their fighting men to help conquer the land west of the river.

Having your own portion did not cancel the duty owed to the rest of Israel.

Settling first came with a condition attached, not a free pass out of the work ahead.

🏕️ These tribes already had their land

⚔️ Their warriors still had to help conquer more

🤝 A finished portion did not cancel the duty

📖 Their gift came with a condition attached

## ✅ All That Are Meet For The War

Meet is an old word meaning fit or qualified.

This phrase describes able bodied men ready for battle.

Not every man crossed, only the ones capable of fighting.

The rest of Israel still needed this specific kind of help.

✅ Meet means fit or qualified

⚔️ This describes men ready for battle

🚹 Not every man was required to cross

➡️ Israel still needed this trained help

## 🏠 Your Wives, And Your Little Ones, And Your Cattle

Families and herds stayed safely behind in the towns just won.

Only the fighting men needed to cross over armed.

This kept children and flocks out of a dangerous ongoing campaign.

Provision for the ones staying home came before the fighting even began.

🏠 Families stayed behind in their new towns

🐑 Only the fighting men crossed over

🛡️ This kept children and flocks safe

📖 Their homes were secured before the fighting

## 🕊️ Until The LORD Have Given Rest Unto Your Brethren

Rest here means the fighting is finally over for good.

Enjoying their own land too soon was not allowed here.

Their own rest had to wait for their brothers' rest first.

The word brethren keeps twelve separate tribes tied to one shared outcome.

🕊️ Rest means the fighting is finally over

⏳ Their own rest had to wait

🤝 Brothers came before personal comfort here

📖 Twelve tribes shared one outcome

## 👀 Thine Eyes Have Seen All That The LORD Your God Hath Done Unto These Two Kings

Moses reminds Joshua that he personally watched both battles happen.

Joshua was not being asked to trust a story secondhand.

He had already seen Sihon and Og fall with his own eyes.

Firsthand memory becomes the foundation for whatever comes next in Canaan.

👀 Joshua personally watched both battles

🚫 This was not a secondhand story

👑 He watched Sihon and Og both fall

📖 That memory prepares him for Canaan

## 🛡️ Ye Shall Not Fear Them: For The LORD Your God He Shall Fight For You

This exact promise already appeared once before in chapter one.

God is not offering new comfort here, just repeating an old one.

Joshua is about to lead the very people who once feared giants in that same chapter.

The same fear, and the same answer, now belong to Joshua's own generation.

🔁 This promise repeats one from chapter one

😨 The same fear returns in a new generation

🛡️ God fights, so Israel does not have to

📖 An old answer now belongs to Joshua

# Deuteronomy 3:23-29
# ⛰️ Moses Sees The Land He Cannot Enter
---
## 🙏 I Besought The LORD At That Time

Besought means begged earnestly.

Moses rarely describes his own prayers this openly in this book.

This short line opens a rare, personal window into his private request.

What follows is one of the most human moments in Deuteronomy.

🙏 Besought means begged earnestly

🚪 This opens a rare personal window

😔 Moses rarely prays this openly on the page

📖 A deeply human moment follows

## 🗣️ Thou Hast Begun To Shew Thy Servant Thy Greatness, And Thy Mighty Hand

Shew is an old spelling of show.

Moses points to the victories over Sihon and Og as proof.

He is not asking blindly here.

He asks based on everything he has already watched happen.

🗣️ Shew is an old spelling of show

⚔️ Moses points to Sihon and Og as proof

👀 He asks based on what he witnessed

➡️ Past power becomes reason to expect more

## 🙏 I Pray Thee, Let Me Go Over, And See The Good Land That Is Beyond Jordan, That Goodly Mountain, And Lebanon

Moses names exactly what he wants, entry into Canaan itself.

That goodly mountain likely points to the hill country around Jerusalem.

Lebanon lay even further north, famous for its tall cedar trees.

Moses does not ask for something vague, he names the whole land by its landmarks.

🙏 Moses asks to enter Canaan itself

⛰️ That goodly mountain points toward Jerusalem's hills

🌲 Lebanon was famous for its tall cedars

📖 Moses names the land by its landmarks

## 😠 The LORD Was Wroth With Me For Your Sakes

Wroth means angry.

This is not a random punishment invented in this chapter.

Numbers twenty already recorded Moses striking a rock instead of speaking to it as God commanded.

For your sakes means Israel's own earlier rebellion is tangled up in this consequence too.

😠 Wroth means angry

📜 Numbers twenty explains this consequence

🪨 Moses struck a rock instead of speaking

📖 Israel's rebellion is tangled into this too

## 🛑 Let It Suffice Thee, Speak No More Unto Me Of This Matter

Suffice means to be enough.

God tells Moses this request is closed, not open for further debate.

Even Moses, God's own closest friend, did not get every prayer answered as asked.

This is one of the clearest no answers to prayer in the whole Bible.

🛑 Suffice means to be enough

🚫 God closes this request for good

🙏 Even Moses did not get every prayer answered

📖 A clear no answer appears here

## ⛰️ Get Thee Up Into The Top Of Pisgah

God refuses entry but still grants Moses a real view of the land.

Pisgah was a high ridge east of the Jordan, overlooking the whole territory.

Moses gets to see north, south, east, and west from this one spot.

The refusal was not total, God still gave Moses something real to hold onto.

⛰️ Pisgah was a high overlooking ridge

👀 Moses could see in every direction

🚫 Moses still could not cross over

📖 The refusal came with a real gift

## 📢 Charge Joshua, And Encourage Him, And Strengthen Him

Charge means give a formal, serious command.

Moses is told to spend his energy preparing Joshua instead of grieving his own loss.

Encourage and strengthen describe two separate things Joshua will need going forward.

Moses turns his own disappointment into investment in the next leader.

📢 Charge means give a formal command

🎯 Moses prepares Joshua instead of grieving

💪 Encourage and strengthen are two different needs

📖 Disappointment becomes investment in Joshua

## 🏕️ So We Abode In The Valley Over Against Bethpeor

Abode means stayed or remained in one place.

Bethpeor was a valley location just east of the Jordan River.

This same place name will return at the very end of Deuteronomy.

The chapter closes with Israel simply waiting in sight of the land they cannot yet enter.

🏕️ Abode means stayed in one place

📍 Bethpeor was a valley by the Jordan

🔁 This place name returns later in Deuteronomy

📖 Israel waits in sight of the land
`.trim();

export const DEUTERONOMY_THREE_PERSONAL_SECTIONS = parseDeuteronomyThreeRawNotes(DEUTERONOMY_THREE_RAW_NOTES);
