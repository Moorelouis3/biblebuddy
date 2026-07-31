export type GenesisThirtyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtyFiveRawNotes(rawText: string): GenesisThirtyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+35:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 35 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+35:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+35:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 35 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 35,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 35:${startVerse}` : `Genesis 35:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Genesis 35 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_FIVE_RAW_NOTES = `# Genesis 35:1-5
# ⛰️ Called Back To Bethel
---
## ⛺ Arise, Go Up To Bethel

"Arise" means more than simply standing up.

It means move now, without delay.

God gives this command right after the violence at Shechem in the chapter before.

Jacob's sons had just slaughtered a whole city.

Instead of scolding Jacob, God gives him a task and a direction.

Bethel becomes the next stop on Jacob's long road home.

⛺ Arise means move now
😨 Jacob's sons had just brought danger home
🧭 God gives direction instead of scolding
📖 God turns crisis into a new assignment

## 🪜 That Appeared Unto Thee When Thou Fleddest From The Face Of Esau Thy Brother

God reminds Jacob of the exact place their relationship began.

Years earlier Jacob ran from home because Esau wanted to kill him.

Jacob stopped for the night with only a stone for a pillow.

God appeared to him there in a dream and promised to bring him home.

Now God sends him back to that same place.

🏃 Jacob once fled Esau in fear
🌙 God appeared to him in a dream
🪨 A stone pillow marked that night
📖 God now sends him back to that place

## 🗿 Put Away The Strange Gods That Are Among You

"Strange gods" means idols brought in from other households.

Rachel had taken some of these from her father Laban.

Others came from the plunder taken at Shechem.

Jacob had let these idols stay hidden in his camp for years.

Before returning to Bethel he demands they be removed.

🗿 Strange gods means foreign idols
👜 Rachel had taken some from Laban
⚔️ Others came from Shechem's plunder
📖 Jacob finally removes what was hidden

## 🧼 Be Clean, And Change Your Garments

Being clean here points to a purification ritual, not ordinary washing.

Meeting God in this culture required removing anything tied to idols first.

Changing garments marked leaving an old identity behind.

Jacob prepares his whole household, not only himself, for this moment.

This mirrors the way priests would later prepare before approaching the tabernacle.

🧼 Clean means purified not just washed
👕 New garments mark a new identity
🙏 The whole household must prepare
📖 This foreshadows how priests would prepare later

## 😢 Who Answered Me In The Day Of My Distress

Jacob openly credits God for answering him during his hardest days.

"The day of my distress" points back to his flight from Esau.

It also points to his hard years serving Laban.

God did not only appear to Jacob in comfort.

God met him in fear, in poverty, and in danger.

Jacob wants his family to remember that this God has proven faithful before.

😢 Distress recalls Jacob's flight from Esau
🙏 God answered him during hard years
🛡️ God met him in fear and danger
📖 Jacob teaches his family God is faithful

## 🌳 Hid Them Under The Oak Which Was By Shechem

Jacob buries the idols and earrings instead of keeping or selling them.

Earrings in this culture were often connected with pagan worship, much like small amulets.

Burying these items under a tree makes a visible, permanent break from that worship.

The oak near Shechem becomes a quiet marker of Jacob's obedience.

🗿 Jacob buries the idols completely
💍 Earrings often carried pagan meaning
🌳 The oak marks a permanent break
📖 Obedience here is visible, not just private

## 😨 The Terror Of God Was Upon The Cities

"The terror of God" means the surrounding cities were struck with a fear they could not explain.

Simeon and Levi had just slaughtered the men of Shechem in the chapter before.

By every normal expectation, nearby cities should have banded together for revenge.

Instead, God supernaturally protects Jacob's traveling household.

No army was needed because God controlled the fear in their enemies' hearts.

😨 Terror of God means supernatural fear
⚔️ Shechem's slaughter should have brought revenge
🛡️ God protects Jacob without an army
📖 God can control fear in enemies' hearts

# Genesis 35:6-8
# ⛪ Bethel At Last
---
## 🏙️ Jacob Came To Luz, Which Is In The Land Of Canaan

"Luz" was the original name of the town Jacob later called Bethel.

Jacob had been camped near Shechem before this chapter, not near this town.

Now his whole household finally arrives at the place God commanded.

The name Luz will soon disappear from the story in favor of Bethel.

🏙️ Luz was the town's original name
📍 Jacob had been camped near Shechem
🚶 The household finally reaches Bethel
📖 Luz gives way to a new name

## 🏠 He Built There An Altar, And Called The Place Elbethel

"Elbethel" means "God of the house of God."

Jacob had already named this place Bethel, meaning "house of God," many years earlier.

Now he names the altar itself after the God who lives at that house.

The shift is small but real.

🏠 Bethel means house of God
🙏 Elbethel means God of the house of God
⛪ Jacob builds an altar to mark it
📖 The focus shifts from place to God

## 🏃 Because There God Appeared Unto Him When He Fled From The Face Of His Brother

Jacob names the altar this way because of what happened here long before.

He had stopped for the night during his flight from Esau.

He was alone and afraid at the time.

God met him in a dream of a ladder reaching to heaven.

Jacob returns now with a full family and great wealth.

He remembers exactly where that first promise began.

🏃 Jacob once fled here in fear
🪜 A dream ladder marked this place
👨‍👩‍👧‍👦 He returns now with a full family
📖 Jacob remembers where the promise began

## 👵 Deborah, Rebekah's Nurse, Died

Deborah was the woman who had cared for Rebekah, Jacob's mother, since Rebekah was young.

A "nurse" in this culture was often a lifelong servant and trusted companion.

Genesis twenty four mentions an unnamed nurse who traveled with Rebekah to marry Isaac.

That unnamed woman is revealed here to be Deborah.

👵 Deborah cared for Rebekah for decades
🛤️ She once traveled with Rebekah to Canaan
😢 Her death brings deep family grief
📖 Genesis reveals her identity only here

## ⛰️ Buried Beneath Bethel Under An Oak

"Beneath Bethel" points to a spot at a lower elevation than the town itself.

Bethel sat on higher ground, so Deborah's grave lies just below the settlement.

Burying her under a specific oak tree made the location easy to remember.

Marking her grave this clearly shows how valued she was.

⛰️ Bethel sat on higher ground
🌳 The oak marked the grave's location
🗺️ The spot was easy to remember
📖 Deborah's grave marker shows her value

## 🌳 The Name Of It Was Called Allonbachuth

"Allonbachuth" means "oak of weeping."

The Hebrew word for oak and the word for weeping are joined into this one name.

Naming a tree after this moment kept Deborah's memory alive for later generations.

A name like this shows real mourning, not simply a passing notice.

🌳 Allonbachuth means oak of weeping
😭 The name preserved her memory
❤️ This shows genuine family mourning
📖 Two Hebrew words are joined here

# Genesis 35:9-15
# ✨ God Renews The Covenant
---
## 🗺️ God Appeared Unto Jacob Again, When He Came Out Of Padanaram

"Padanaram" was the region where Jacob lived with Laban for about twenty years.

The word "again" ties this appearance to God's earlier appearances at Bethel.

Jacob has now completed the long journey God promised to bring him through.

This meeting confirms that God kept every promise made before Jacob ever left home.

🗺️ Padanaram was Laban's home region
🔁 Again links this to earlier appearances
🚶 Jacob has finished a long journey
📖 God kept every promise made before

## 🇮🇱 Thy Name Shall Not Be Called Any More Jacob, But Israel Shall Be Thy Name

God had already renamed Jacob Israel after he wrestled through the night near the Jabbok river.

This moment is not a second, separate name change.

God is formally confirming the name he already gave him.

"Jacob" was tied to grasping and striving for blessing on his own terms.

"Israel" becomes the name that marks what God is making of him.

🇮🇱 Israel was already given at the Jabbok
✅ This confirms an already given name
🤼 Jacob's old name meant striving
📖 Israel marks a new identity from God

## 💪 I Am God Almighty

"God Almighty" translates the Hebrew title "El Shaddai."

This is the same title God used when confirming his covenant with Abraham.

By using it again, God reminds Jacob that he has the power to keep every promise about to be spoken.

Jacob's family is still just one household, not yet a nation.

💪 God Almighty translates El Shaddai
📜 The same title was used with Abraham
🏠 Jacob's family is still one household
📖 God has power to keep every promise

## 🌱 Be Fruitful And Multiply

This exact phrase first appears in Genesis one, spoken over all humanity.

It was also part of God's covenant promises to Abraham and Isaac.

Now the same words are spoken directly over Jacob.

His family will grow into a great nation instead of only a small one.

👨‍👩‍👧‍👦 It also blessed Abraham and Isaac
🌱 Now it rests directly on Jacob
🇮🇱 His family will become a great nation
📖 This phrase echoes Genesis one

## 🌍 A Nation And A Company Of Nations Shall Be Of Thee

A "nation" here means the single people of Israel that Jacob's family will become.

A "company of nations" means an entire assembly of related peoples.

Jacob's twelve sons will become the fathers of Israel's twelve tribes.

Later kingdoms and tribal groups would also trace their roots back to this one promise.

🇮🇱 Nation means the people of Israel
🌍 Company of nations means many related peoples
👨‍👦 Twelve sons become twelve tribes
📖 One family becomes many nations

## 👑 Kings Shall Come Out Of Thy Loins

"Out of thy loins" is an old way of saying from Jacob's own physical descendants.

Israel's kings, including Saul, David, and Solomon, all trace their line back to Jacob.

The royal line especially continues through Jacob's son Judah.

Centuries later, Jesus Christ is born through this same family line.

👑 Loins means Jacob's own descendants
🦁 Israel's kings trace back to Jacob
✝️ Jesus is born through this family
📖 One promise reaches all the way to Jesus

## 🌿 The Land Which I Gave Abraham And Isaac

God reminds Jacob that this land promise did not begin with him.

God first gave it to Abraham, then repeated it to Isaac.

Now God confirms the same promise directly to Jacob.

Jacob is standing in the land, but his family does not yet own it.

🌿 The promise began with Abraham
👴 It continued through Isaac
🇮🇱 Now it is confirmed to Jacob
📖 Standing there is not yet owning it

## 🧬 To Thy Seed After Thee Will I Give The Land

"Seed" here means descendants, not literal plant seed.

God is promising the land to a future generation, not to Jacob personally.

Jacob will spend his whole life as a traveler in this land, never owning it outright.

The promise will only be fulfilled generations later.

🧬 Seed means descendants
🚶 Jacob remains a traveler in this land
⏳ Full ownership comes generations later
📖 The promise outlives the man who received it

## ☁️ God Went Up From Him

This does not mean God stopped being present everywhere.

It means the visible appearance God used to speak with Jacob came to an end.

Encounters like this were special and temporary, not a constant vision.

Jacob understood this as a real meeting with God, not simply his own thoughts.

☁️ God's visible presence withdraws here
🙏 God still remains present everywhere
⏳ These appearances were temporary, not constant
📖 Jacob treats this as a real encounter

## 🪨 Jacob Set Up A Pillar In The Place Where He Talked With Him, Even A Pillar Of Stone

A "pillar" here means a single stone stood upright as a lasting marker.

Jacob had done something almost identical at this same spot many years earlier.

That was before he ever fled to Padanaram.

This time he returns in blessing instead of running in fear.

The stone will outlast the memory of the conversation itself.

🪨 A pillar is an upright memorial stone
🔁 Jacob set one here once before
🙏 Now he returns in blessing, not fear
📖 Stones outlast any single conversation

## 🍷 He Poured A Drink Offering Thereon, And He Poured Oil Thereon

A "drink offering" was liquid poured out before God as an act of worship.

Genesis thirty five never names the exact liquid.

It should not be stated with certainty that it was wine.

Pouring oil marked the stone as dedicated and set apart for God.

Jacob had poured oil on a stone at this same place once before.

🍷 A drink offering was worship, not a drink
🫒 Oil marked the stone as dedicated
🔁 Jacob repeats what he did years earlier
📖 The exact liquid is never named here

## 🏠 Jacob Called The Name Of The Place Where God Spake With Him, Bethel

Jacob had already named this place Bethel many years earlier, in Genesis twenty eight.

This is not a brand new naming, but a renewed one.

God has now kept the promise he made at that first visit.

Jacob confirms the name because the promise behind it has been proven true.

🏠 Bethel was already named long ago
🔁 This renews a name, not invents one
🙏 God has proven the earlier promise
📖 A name can hold both promise and proof

# Genesis 35:16-20
# 👶 Benjamin's Birth, Rachel's Death
---
## 📍 There Was But A Little Way To Come To Ephrath

"Ephrath" was the older name for the area later known as Bethlehem.

Bethlehem would become the hometown of King David.

Centuries later it would also become the birthplace of Jesus.

Jacob's family is traveling through a place that will matter far beyond this moment.

They were close to arriving when everything suddenly changed.

📍 Ephrath is the ancient name for Bethlehem
👑 David's hometown grows from this same ground
✝️ Jesus is later born in this place
📖 A quiet stop here holds huge meaning

## 🤰 Rachel Travailed, And She Had Hard Labour

"Travailed" means Rachel was in the process of giving birth.

"Hard labour" means her delivery had become unusually difficult and dangerous.

In the ancient world, childbirth was one of the leading causes of death for women.

There were no hospitals, surgery, or modern medicine available to help her.

🤰 Travailed means she was giving birth
⚠️ Hard labour means real danger, not routine pain
🏥 No modern medicine existed to help her
📖 Childbirth was a genuine life risk then

## 👩‍⚕️ Fear Not Thou Shalt Have This Son Also

A midwife speaks these words to comfort Rachel during the danger of labor.

The word "also" points back to Rachel's first son, Joseph.

The midwife is promising that this second son will be born alive.

Sadly, the baby survives, but Rachel herself does not.

👩‍⚕️ A midwife offers this comfort
👶 Also points back to Joseph, her first son
❤️ The baby lives through the danger
📖 Comfort for the child, not for Rachel

## 💔 As Her Soul Was In Departing, For She Died

"Her soul was in departing" is the Bible's gentle way of describing her death.

Rachel dies during the same labor that had already turned dangerous.

Even as her life was ending, she was still able to speak and name her son.

This becomes one of the saddest moments in Jacob's whole story.

💔 This phrase describes Rachel's death
🗣️ She still names her son as she dies
😢 This marks a deeply sad moment
📖 Even her final act was for her child

## 👶 She Called His Name Benoni

"Benoni" means "son of my sorrow."

Rachel names her son this way because his birth happens during the pain that costs her life.

The name would have followed him for the rest of his days if it had stayed.

A name like this carries real grief inside it, not just sadness in the moment.

👶 Benoni means son of my sorrow
💔 Rachel names him as she is dying
😢 This name reflects true suffering
📖 A name can carry lasting grief

## ❤️ His Father Called Him Benjamin

Jacob does not keep the name Rachel gave.

He renames his son Benjamin, meaning "son of the right hand."

In scripture, the right hand often stands for honor, strength, and favor.

Jacob chooses hope over sorrow for the name his son will carry his whole life.

❤️ Jacob changes his son's name
👶 Benjamin means son of the right hand
💪 The right hand often means honor
📖 Jacob picks hope over lasting sorrow

## 🪦 Buried In The Way To Ephrath, Which Is Bethlehem

Rachel is buried where she died, not carried back to the family burial cave.

That cave, called Machpelah, held Abraham and Sarah.

Isaac and Leah would later be buried there too.

Rachel alone among Jacob's close family is buried on the road instead.

Jacob remembers this moment years later when speaking to Joseph.

🪦 Rachel is buried where she died
⛰️ Machpelah held the rest of the family
🛤️ Only Rachel is buried on the road
📖 Jacob remembers this even years later

## 🪨 That Is The Pillar Of Rachel's Grave Unto This Day

"Unto this day" means the grave marker was still recognized when Genesis was written.

Jacob sets up a stone pillar the same way he did earlier at Bethel.

A pillar like this served as a lasting, physical memorial.

Rachel's grave remained a known landmark long after her death.

🪨 A pillar marks Rachel's grave
🔁 Jacob repeats what he did at Bethel
🗺️ The grave stayed a known landmark
📖 Stone memorials outlive the people they honor

# Genesis 35:21-26
# 👨‍👦 Twelve Sons Of Israel
---
## 🗼 Israel Journeyed, And Spread His Tent Beyond The Tower Of Edar

The Bible now calls Jacob "Israel" as the family continues traveling.

"Edar" means "flock," so the Tower of Edar was likely a watchtower used by shepherds.

This tower stood somewhere near Bethlehem, along the road toward Hebron.

The family keeps moving even during this season of mourning.

🇮🇱 The text now calls him Israel
🐑 Edar means flock
🗼 The tower likely guarded shepherds' flocks
📖 The journey continues even through grief

## ⚠️ Reuben Went And Lay With Bilhah His Father's Concubine

"Lay with" means Reuben had sexual relations with Bilhah.

Bilhah was Rachel's servant and one of Jacob's wives, often called a "concubine."

A concubine held a real marriage relationship but ranked below the primary wives.

In this culture, sleeping with a father's wife could also be read as an attempt to claim his authority.

⚠️ Lay with means sexual relations
👩 Bilhah was Jacob's concubine and Rachel's servant
👑 This could signal a claim on Jacob's authority
📖 This sin runs deeper than it first appears

## 🤫 Israel Heard It

No punishment is recorded here at all.

Israel does not forget what happened, even without saying anything right away.

Years later, on his deathbed, Jacob strips Reuben of his rights as firstborn because of this exact sin.

Consequences for sin are not always immediate, but they still arrive.

🤫 No punishment appears right away
⏳ Israel remembers this for years
📜 Reuben later loses his firstborn rights
📖 Delayed judgment is still real judgment

## 👨‍👦 Now The Sons Of Jacob Were Twelve

With Benjamin's birth, Jacob's family reaches its complete number.

Twelve sons will become the fathers of the twelve tribes of Israel.

This verse marks a real milestone in the whole book of Genesis.

From here forward, the story follows this one family becoming a nation.

👨‍👦 Jacob now has twelve sons
🇮🇱 They become Israel's twelve tribes
📖 This is a milestone for Genesis
➡️ The story now follows a growing nation

## 👨 The Sons Of Leah

Leah bore Jacob six sons.

Their names were Reuben, Simeon, Levi, Judah, Issachar, and Zebulun.

Reuben was firstborn but would soon lose that privilege because of his sin with Bilhah.

Simeon and Levi were the two brothers who led the violent attack on Shechem.

Judah's family line would later produce Israel's kings.

👨 Leah bore six of Jacob's sons
⚠️ Reuben would soon lose his firstborn place
⚔️ Simeon and Levi attacked Shechem
📖 Judah's line leads to David and Jesus

## ❤️ The Sons Of Rachel

Rachel bore Jacob two sons, Joseph and Benjamin.

Joseph would later rise to rule Egypt under Pharaoh.

Benjamin was Rachel's last son.

His birth cost Rachel her life.

❤️ Rachel bore Joseph and Benjamin
🇪🇬 Joseph later rules over Egypt
💔 Benjamin's birth cost Rachel her life
📖 Two sons carry enormous weight later

## 👩 The Sons Of Bilhah, And The Sons Of Zilpah

Bilhah was Rachel's servant.

She bore Dan and Naphtali.

Zilpah was Leah's servant.

She bore Gad and Asher.

Both women became Jacob's wives through the customs of that time.

All four of these sons also become tribes of Israel.

👩 Bilhah bore Dan and Naphtali
👰 Zilpah bore Gad and Asher
🇮🇱 All four sons become tribes too
📖 Two servants shape two tribes each

## 📜 These Are The Sons Of Jacob, Which Were Born To Him In Padanaram

This summary states that Jacob's sons were born in Padanaram.

Padanaram was the region where Jacob lived with his uncle Laban for about twenty years.

Benjamin is the one clear exception to this statement.

He was born later, after Jacob returned to Canaan, near Bethlehem.

📜 Most sons were born in Padanaram
🏠 Padanaram was Laban's home region
👶 Benjamin is the clear exception
📖 One family, born in two different lands

# Genesis 35:27-29
# 👴 Isaac's Death
---
## 👴 Jacob Came Unto Isaac His Father Unto Mamre

After more than twenty years away, Jacob is finally reunited with his father.

God had promised Jacob that he would bring him safely back to his father's house.

That promise is now fully kept.

Jacob returns not as the man who once fled with nothing.

He returns as the head of a large, wealthy family.

👴 Jacob is reunited with his father
🙏 God fulfills His promise to bring him home
💰 Jacob returns wealthy, not empty handed
📖 This fulfills a promise from decades earlier

## 🏙️ Unto The City Of Arbah, Which Is Hebron, Where Abraham And Isaac Sojourned

"Arbah" was an older name for the city later known as Hebron.

"Sojourned" means to live somewhere for a time without permanently owning the land.

Abraham and Isaac had both lived as travelers in this same area for years.

The family burial cave at Machpelah was also located near this city.

🏙️ Arbah was an older name for Hebron
🚶 Sojourned means living there without owning it
👴 Abraham and Isaac both lived here
📖 The family burial cave sat nearby

## 🔢 The Days Of Isaac Were An Hundred And Fourscore Years

"Fourscore" is an old way of saying eighty.

One score always means twenty years.

An hundred and fourscore years means Isaac lived to be one hundred eighty years old.

Years earlier, Isaac believed he was near death when he blessed Jacob.

Instead, he lived far longer than anyone expected.

🔢 Fourscore is an old way of saying eighty
📏 One score always means twenty years
👴 Isaac lived to one hundred eighty years
📖 He lived far longer than anyone expected

## 🕊️ Isaac Gave Up The Ghost, And Died

"Gave up the ghost" is an old English expression meaning simply that Isaac died.

It does not describe an actual ghost or spirit leaving in a visible way.

The same expression is used elsewhere in Genesis for other deaths, including Abraham's.

The KJV often uses this gentle phrase instead of a blunt word for death.

🕊️ Gave up the ghost means he died
👻 No literal ghost is described here
📜 The same phrase describes Abraham's death
📖 The KJV often softens the word death

## ⚰️ Was Gathered Unto His People

"Gathered unto his people" means Isaac joined those in his family who had died before him.

This exact phrase was also used to describe Abraham's death.

Isaac is later buried in the family cave at Machpelah, alongside Abraham and Sarah.

Rebekah, Jacob, and Leah would eventually be buried there as well.

⚰️ Gathered unto his people means joining ancestors
📜 The same words described Abraham's death
🪦 Isaac is buried at Machpelah
📖 This same tomb holds several generations

## 📖 Being Old And Full Of Days

"Full of days" means Isaac lived a long, complete life.

God had already fulfilled his promises to Isaac many times over.

Isaac lived long enough to see his grandchildren.

He also lived to see the beginning of Israel's twelve tribes.

His life reached a peaceful, unhurried end.

🙏 God fulfilled His promises to Isaac
👨‍👩‍👦 He saw his grandchildren's generation
🕊️ His life ended in peace
📖 Full of days means a complete life

## 🤝 His Sons Esau And Jacob Buried Him

Esau and Jacob had been separated for many years by real danger.

Years earlier, Esau had wanted to kill Jacob over the stolen blessing.

By the time of Isaac's death, God had already brought the brothers back together in peace.

Standing side by side to bury their father shows how far their relationship had come.

🤝 Esau and Jacob bury Isaac together
⚔️ They had once been bitter enemies
🕊️ God had already reconciled the brothers
📖 This burial closes out a whole generation`.trim();

export const GENESIS_THIRTY_FIVE_PERSONAL_SECTIONS = parseGenesisThirtyFiveRawNotes(GENESIS_THIRTY_FIVE_RAW_NOTES);
