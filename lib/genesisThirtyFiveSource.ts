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

const GENESIS_THIRTY_FIVE_RAW_NOTES = `# Genesis 35:1–5

# 🗣️ God Speaks To Jacob

---

## 🗣️ And God Said Unto Jacob

Chapter 34 ended with Jacob afraid.

Simeon and Levi had attacked the city of Shechem, killed all the men, rescued Dinah, and the rest of Jacob's sons plundered the city.

They took the livestock, wealth, women, and children.

Jacob feared that the surrounding Canaanite people would hear what happened, join together, and destroy his entire household.

Then chapter 35 begins with these words:

**"And God said unto Jacob."**

God speaks into the exact situation Jacob is afraid of.

Jacob does not know what to do next, but God does not leave him without direction.

God tells him to leave the dangerous area around Shechem and return to the place where God first appeared to him.

😨 Jacob fears retaliation after the attack on Shechem

🗣️ God speaks directly into Jacob's crisis

🛡️ God gives Jacob instructions instead of leaving him in fear

➡️ Arise, Go Up To Bethel

---

## ⛰️ Arise, Go Up To Bethel

The word **arise** means Jacob is to get up and take action.

God does not tell him to remain near Shechem worrying about what the surrounding people might do.

He commands Jacob to leave and go to **Bethel**.

Bethel was the place where God first appeared to Jacob when he was fleeing from Esau.

It was there that Jacob dreamed of a ladder reaching from earth to heaven, with angels ascending and descending upon it.

Bethel means **"House of God."**

⛰️ God tells Jacob to leave Shechem

🏃 Arise means to get up and act

🪜 Bethel is where Jacob saw the ladder to heaven

➡️ Dwell There

---

## 🏕️ Dwell There

To **dwell** means to live or remain in a place.

God is not telling Jacob to make a quick visit to Bethel and then leave.

He is telling Jacob to relocate his household there and stay.

Jacob had stopped near Shechem and purchased land there, but after the violence of chapter 34, God redirects him.

Bethel is where Jacob is supposed to settle at this point in his journey.

🏕️ Dwell means to live and remain there

📍 God is moving Jacob away from Shechem

🙏 Jacob must follow God's direction

➡️ Make There An Altar Unto God

---

## ⛪ Make There An Altar Unto God

God tells Jacob to build an altar at Bethel.

An altar was a place used for sacrifice, worship, and remembrance.

Jacob had built altars before, but now God specifically commands him to build one at the place where their relationship began.

This return to Bethel is not only a change of location.

It is a return to worship, obedience, and the promise Jacob made years earlier.

⛪ Jacob must build a place of worship

🙏 Returning to Bethel is also a spiritual return

➡️ That Appeared Unto Thee When Thou Fleddest From Esau

---

## 🪨 That Appeared Unto Thee When Thou Fleddest From The Face Of Esau Thy Brother

God reminds Jacob of the first time He appeared to him.

Years earlier, Jacob fled from home because Esau wanted to kill him after Jacob received Isaac's blessing.

While traveling alone, Jacob stopped for the night, placed a stone beneath his head, and slept.

God appeared to him in a dream and promised to protect him, bless him, and bring him back to the land.

When Jacob awoke, he set the stone upright, poured oil upon it, and named the place Bethel.

Now God is calling him back to the place where that promise was first given.

🪨 Jacob set up a stone at Bethel

🫒 He poured oil upon it

🏃 He was fleeing from Esau at the time

🙏 God had promised to bring him safely home

# Genesis 35:6–15

# ⛪ Jacob Builds An Altar

---

## 🏙️ Jacob Came To Luz… Which Is In The Land Of Canaan

Jacob obeys God and leaves the area around Shechem.

He travels with his household to **Luz**, a town in the land of Canaan.

Luz was the original name of the place Jacob had earlier called **Bethel**.

The Bible says:

**"Luz… that is, Bethel"**

because Luz and Bethel refer to the same general location.

Jacob's family had been living near the city of Shechem before this journey. They were not still near the mountain where Jacob wrestled with God.

📍 Jacob leaves the area around Shechem

🏙️ Luz was the location's original name

🏠 Bethel was the name Jacob gave it after meeting God

➡️ He And All The People That Were With Him

---

## 👨‍👩‍👧 He And All The People That Were With Him

Jacob does not arrive at Bethel alone.

The people traveling with him included:

- Jacob
- Leah, Rachel, Bilhah, and Zilpah
- His eleven sons who had already been born
- His daughter Dinah
- Male and female servants
- Shepherds and workers caring for his animals
- Members of the larger household connected to his family
- The women and children taken captive from Shechem

They also traveled with large numbers of sheep, goats, cattle, donkeys, camels, and other possessions.

The Bible does not give an exact number of people.

However, Jacob's household was much larger than only his wives and children. Years earlier, he had enough servants to divide his household into separate companies, and he owned enormous herds.

After the captives from Shechem were added, this would have looked like a large traveling camp.

👨‍👩‍👧 Jacob travels with his immediate family

👥 His household includes servants and workers

👩‍👧 Women and children from Shechem are also with them

🐑 Large herds travel alongside the people

➡️ He Built There An Altar

---

## ⛪ He Built There An Altar

After reaching Bethel, Jacob builds an altar.

An altar was a place where people offered sacrifices and worshiped God.

Jacob had first come to Bethel more than twenty years earlier while fleeing from Esau.

At that time, he was alone and afraid.

Now he returns with his wives, children, servants, livestock, and wealth.

Building the altar acknowledges that God fulfilled His promise to protect Jacob and bring him safely home.

⛪ Jacob builds a place of worship

🙏 He recognizes God's faithfulness

🏠 He has returned to the place where his journey began

➡️ He Called The Place El-beth-el

---

## 🙏 He Called The Place El-beth-el

Jacob calls the place connected with the altar **El-beth-el**.

**El-beth-el** means:

**"God of Bethel"**

or more literally:

**"God of the House of God."**

This does not mean Jacob is replacing the name Bethel.

The town or location was called **Bethel**, meaning **"House of God."**

Jacob now names the altar or sacred place **El-beth-el** because his focus is on the God who appeared to him there.

Jacob once emphasized the place where he met God.

Now he emphasizes the God who met him at that place.

🏠 Bethel means "House of God"

🙏 El-beth-el means "God of Bethel"

📖 Jacob is not giving the town a completely different name

➡️ There God Appeared Unto Him

---

## ✨ There God Appeared Unto Him When He Fled From His Brother

Jacob names the altar El-beth-el because this was where God appeared to him when he fled from Esau.

More than twenty years earlier, Jacob left home because Esau wanted to kill him.

Jacob stopped at Luz for the night and used a stone as his pillow.

While sleeping, he dreamed of a ladder reaching between earth and heaven, with angels ascending and descending.

God promised to:

- Give Jacob the land
- Multiply his descendants
- Protect him wherever he traveled
- Bring him safely back home

Jacob is now standing in the place where that promise began.

🏃 Jacob had been fleeing from Esau

🪜 God appeared through the dream of the ladder

🙏 God promised to protect and return him

➡️ Deborah, Rebekah's Nurse, Died

---

## 😢 Deborah, Rebekah's Nurse, Died

Deborah was the nurse of **Rebekah**, Jacob's mother.

A nurse in this setting was more than someone who briefly cared for a baby.

She could remain with the family for many years as a trusted caregiver, servant, companion, and respected member of the household.

Deborah first appears when Rebekah leaves Padan-aram to marry Isaac.

Genesis 24 says Rebekah's family sent her away with **her nurse**.

That unnamed nurse is identified here as Deborah.

This means Deborah originally traveled with Rebekah from Padan-aram to Canaan many years earlier.

👩 Deborah was Rebekah's longtime nurse

🛤️ She traveled with Rebekah when Rebekah left to marry Isaac

❤️ She had likely served the family for many decades

➡️ Why Is Deborah With Jacob?

---

## ❓ Why Is Rebekah's Nurse With Jacob's Household?

Deborah belonged to the generation of Isaac and Rebekah, not originally to Jacob and Rachel's generation.

The Bible does not explain when or why she began traveling with Jacob's household.

She may have joined Jacob after returning to Canaan.

She may have been sent to him by his mother.

She may have joined him after Rebekah became elderly or died.

But these are possibilities, not facts stated in Scripture.

Rebekah's death is never directly recorded in Genesis.

Isaac is still alive at this point and appears again at the end of the chapter.

The passage mentions Rebekah because it is identifying Deborah:

**She was the woman who had served Jacob's mother.**

📖 Scripture does not explain when Deborah joined Jacob

❓ Rebekah may or may not have already died

👴 Isaac is still alive

👩 Rachel is also still alive at this point

➡️ She Was Buried Beneath Bethel

---

## 🌳 She Was Buried Beneath Bethel Under An Oak

Deborah is buried beneath an oak tree near Bethel.

The phrase **"beneath Bethel"** means below or near the town of Bethel, likely at a lower elevation.

Bethel was located in hilly territory, so Deborah's burial place was under an oak below the settlement.

Her death receives special attention, which suggests she was deeply loved and respected by the family.

🌳 Deborah is buried near Bethel

⛰️ "Beneath Bethel" refers to the location below the town

😢 Her death causes great mourning

➡️ The Name Of It Was Called Allon-bachuth

---

## 😭 The Name Of It Was Called Allon-bachuth

The word **"it"** refers to the oak tree or the place around the tree where Deborah was buried.

Jacob's family calls it **Allon-bachuth**.

The name means:

**"Oak of Weeping"**

or:

**"Oak of Mourning."**

The name shows that Deborah's death brought deep sorrow to the household.

She was not treated like an unimportant servant.

She had likely been part of the family's life for generations.

🌳 The oak receives a special name

😭 Allon-bachuth means "Oak of Weeping"

❤️ Deborah was deeply mourned

➡️ God Appeared Unto Jacob Again

---

## ✨ God Appeared Unto Jacob Again

After Jacob arrives at Bethel, God appears to him again.

The word **"again"** connects this appearance with Jacob's previous encounters with God.

God had appeared to Jacob at Bethel when he first fled from Esau.

God had also met him when he returned to Canaan and wrestled through the night.

Now God appears again to confirm His promises.

✨ God renews His communication with Jacob

🙏 This continues the relationship that began years earlier

➡️ When He Came Out Of Padan-aram

---

## 🗺️ When He Came Out Of Padan-aram

**Padan-aram** was the region where Jacob lived with Laban for approximately twenty years.

It was also the homeland from which Rebekah had originally come.

The verse does not mean that God appeared at the exact moment Jacob stepped out of Padan-aram.

It means God appeared to Jacob after his return from that region.

Jacob has completed the long journey God promised to bring him through.

🗺️ Padan-aram was Laban's region

⏳ Jacob lived there for about twenty years

🏠 He has now returned to Canaan

➡️ God Blessed Him

---

## 🙌 God Blessed Him

God does not appear merely to give Jacob instructions.

He blesses him.

This blessing confirms that God's covenant remains with Jacob despite the sins, failures, and violence surrounding his family.

God's plan has not been cancelled.

The covenant given to Abraham and Isaac will continue through Jacob.

🙌 God confirms His favor

📖 The covenant continues through Jacob

➡️ Thy Name Is Jacob

---

## 🇮🇱 Thy Name Is Jacob… But Israel Shall Be Thy Name

God had already changed Jacob's name to Israel after Jacob wrestled with Him near the Jabbok River.

This is not a second, unrelated name change.

God is formally confirming the name He already gave him.

Jacob was his birth name.

It was connected with grasping the heel and later became associated with Jacob's history of striving, deceiving, and attempting to obtain blessings through his own plans.

Israel becomes his covenant name and marks the new identity God has given him.

The Bible continues using both names afterward.

Sometimes he is called Jacob.

Sometimes he is called Israel.

The new name does not erase the old name from every sentence, but it identifies what God is making him and what nation will come from him.

🇮🇱 God confirms the name Israel

📖 The name was first given after the wrestling encounter

👤 Scripture continues using both Jacob and Israel

➡️ I Am God Almighty

---

## 💪 I Am God Almighty

God identifies Himself as **God Almighty**.

The Hebrew title is **El Shaddai**.

This is the same name God used when confirming His covenant with Abraham.

By using this title, God reminds Jacob that He has the power to accomplish everything He is about to promise.

Jacob's descendants are not yet a nation.

They are still one large household.

But God Almighty can turn this household into nations and kings.

💪 God has the power to fulfill His promises

📖 El Shaddai means God Almighty

➡️ Be Fruitful And Multiply

---

## 👨‍👩‍👧‍👦 Be Fruitful And Multiply

God tells Jacob to be fruitful and multiply.

This means Jacob's family will continue growing through children, grandchildren, and future generations.

This language reaches back to God's blessing over humanity in Genesis 1.

It was also part of His covenant promises to Abraham and Isaac.

Jacob currently has eleven sons.

Benjamin will soon be born, completing the twelve sons who become the fathers of the tribes of Israel.

👨‍👩‍👧‍👦 Jacob's descendants will greatly increase

📖 The promise continues through future generations

➡️ A Nation And A Company Of Nations

---

## 🌍 A Nation And A Company Of Nations Shall Be Of Thee

God promises that a **nation** and a **company of nations** will come from Jacob.

The nation is Israel.

Jacob's twelve sons become the fathers of the twelve tribes of Israel.

The tribes together form one nation, but they also become numerous tribal peoples and communities.

The phrase **"company of nations"** emphasizes that Jacob will not produce a small family line.

An entire assembly of peoples will descend from him.

Later, Jacob's descendants would also spread into different territories and kingdoms.

🌍 Israel comes from Jacob

👨‍👩‍👦 His sons become the heads of Israel's tribes

📈 One household will become an entire people

➡️ Kings Shall Come Out Of Thy Loins

---

## 👑 Kings Shall Come Out Of Thy Loins

The phrase **"out of thy loins"** means from Jacob's physical descendants.

God promises that kings will come through Jacob's family line.

This includes Israelite kings such as:

- Saul
- David
- Solomon
- Hezekiah
- Josiah

The royal line would especially continue through Jacob's son Judah.

Ultimately, Jesus Christ would also be born through Jacob's descendants and the family line of David.

👑 Israel's kings descend from Jacob

🦁 The royal line later comes through Judah

✝️ Jesus is born through this covenant family

➡️ The Land Which I Gave Abraham And Isaac

---

## 🌿 The Land Which I Gave Abraham And Isaac

God reminds Jacob that the land promise did not begin with him.

God first promised the land of Canaan to Abraham.

He repeated the promise to Isaac.

Now He confirms it to Jacob.

Jacob is standing in the land, but his family does not yet possess the entire territory.

They are still travelers surrounded by Canaanite peoples.

The promise is about what God will give Jacob's descendants in the future.

🌿 The promise began with Abraham

👨‍👦 It continued through Isaac

🇮🇱 It is now confirmed to Jacob

➡️ To Thy Seed After Thee Will I Give The Land

---

## 🧬 To Thy Seed After Thee Will I Give The Land

The word **seed** means descendants.

God promises that Jacob's descendants will inherit the land of Canaan.

This is a generational inheritance, but it is more than ordinary wealth passed from father to son.

Jacob does not personally own the entire land.

God is promising to give it to the nation that will come from him.

The fulfillment will unfold over generations.

🧬 Seed means descendants

🏞️ The land will belong to future Israel

⏳ The promise will be fulfilled over time

➡️ God Went Up From Him

---

## ☁️ God Went Up From Him

After speaking with Jacob, God **"went up from him."**

This means the visible manifestation of God's presence withdrew.

God did not stop being everywhere.

The special appearance through which He communicated with Jacob came to an end.

The wording also shows that Jacob understood this as a real encounter with God, not merely his own thoughts.

☁️ God's visible appearance ends

🗣️ The conversation is completed

➡️ In The Place Where He Talked With Him

---

## 📍 In The Place Where He Talked With Him

The phrase refers to the exact location where God had spoken with Jacob.

Jacob marks the place because he wants the encounter to be remembered.

Throughout Genesis, important encounters with God are often connected with altars, stones, wells, or named locations.

These physical markers helped future generations remember what God had said and done.

📍 Jacob marks the location of the encounter

🧠 The place becomes a memorial

➡️ Jacob Set Up A Pillar Of Stone

---

## 🪨 Jacob Set Up A Pillar In The Place Where He Talked With Him

Jacob sets up a stone vertically as a pillar.

This pillar was not a building.

It was a standing stone used as a memorial.

Jacob had done something similar when God first appeared to him at Bethel.

By raising another pillar, Jacob publicly marks the place where God repeated the covenant and confirmed his name as Israel.

🪨 The pillar was a standing memorial stone

🙏 It marked the place where God spoke

➡️ He Poured A Drink Offering Thereon

---

## 🍷 He Poured A Drink Offering Thereon

A **drink offering** was liquid poured out before God as an act of worship.

Later in the Law of Moses, drink offerings commonly used wine.

Genesis 35 does not directly name the liquid Jacob poured, so we should not state with certainty that it was wine.

The offering was not poured out for Jacob to drink.

It was poured upon the pillar as an act of dedication, gratitude, and worship toward God.

🍷 A drink offering was liquid poured out to God

🙏 It expressed worship and dedication

📖 The verse does not identify the exact liquid

➡️ He Poured Oil Thereon

---

## 🫒 He Poured Oil Thereon

Jacob also pours oil on the stone.

Pouring oil showed that the pillar was being dedicated and set apart in connection with God.

Jacob had poured oil on a stone at Bethel more than twenty years earlier.

Repeating the action connects his present experience with his first encounter there.

Back then, Jacob was leaving Canaan alone.

Now he has returned with everything God promised to give him.

🫒 Oil symbolizes dedication

🔄 Jacob repeats what he did during his first visit

🙏 The act recognizes God's faithfulness

➡️ Jacob Called The Name Of The Place Bethel

---

## 🏠 Jacob Called The Name Of The Place Where God Spake With Him, Bethel

Jacob had already called the place Bethel in Genesis 28.

This verse does not mean that everyone forgot the name or that Jacob was inventing it for the first time again.

The name is being reaffirmed after God's new appearance there.

The Bible often repeats a naming event when a place receives renewed importance.

The first time Jacob called it Bethel, he was responding to God's promise.

Now he calls it Bethel again after seeing that God kept that promise and brought him home.

**Bethel means "House of God."**

🏠 Jacob reaffirms the name Bethel

📖 This is not a completely new naming

🙏 The place now carries both the original promise and its fulfillment

# Genesis 35:16–18

# 👶 The Birth Of Benjamin

---

## 🚶 They Journeyed From Bethel… And There Was But A Little Way To Come To Ephrath

After worshiping God at Bethel, Jacob and his household continue their journey.

The Bible says there was **"but a little way"** to **Ephrath**, meaning they were not far from reaching their destination when Rachel went into labor.

**Ephrath** was the older name for the area that later became known as **Bethlehem**.

Bethlehem would later become the hometown of King David and, many centuries later, the birthplace of Jesus Christ.

Jacob's family is now traveling through one of the most significant places in the Bible.

🚶 Jacob leaves Bethel

📍 Ephrath was the ancient name for Bethlehem

✝️ Bethlehem would later become the birthplace of Jesus

➡️ Rachel Travailed

---

## 🤰 Rachel Travailed, And She Had Hard Labor

The word **travailed** means Rachel was giving birth.

The Bible says she experienced **hard labor**, meaning the delivery was extremely difficult.

Her childbirth was far more painful and dangerous than normal.

In the ancient world, childbirth was one of the leading causes of death for women because there were no modern hospitals, surgery, blood transfusions, or medicines.

Rachel's labor became life-threatening.

🤰 Travailed means she was giving birth

😣 Hard labor means a very difficult and dangerous delivery

⚠️ Rachel's life was in danger

➡️ Fear Not

---

## 👩‍🍼 Fear Not; Thou Shalt Have This Son Also

Seeing Rachel's condition, the **midwife** tries to encourage her.

She says,

**"Fear not; thou shalt have this son also."**

The midwife is assuring Rachel that the baby will be born.

The word **"also"** reminds us that Rachel already had one son, **Joseph**.

Now God is giving her another son.

Sadly, although the child survives, Rachel herself does not.

👩‍🍼 The midwife comforts Rachel

👶 "Also" refers to Rachel's second son

❤️ The baby lives, but Rachel does not

➡️ Her Soul Was In Departing

---

## 💔 As Her Soul Was In Departing… For She Died

The Bible plainly tells us what happened.

Rachel dies while giving birth.

The phrase **"her soul was in departing"** is the Bible's way of describing her life coming to an end.

As Rachel's life slipped away, she gave a name to her newborn son before she died.

This marks one of the saddest moments in Jacob's life.

Rachel was the wife he loved and had worked fourteen years to marry.

💔 Rachel dies during childbirth

📖 "Her soul was in departing" describes her death

😢 Jacob loses the wife he loved most

➡️ Ben-oni

---

## 👶 She Called His Name Ben-oni

With her final words, Rachel names her son **Ben-oni**.

**Ben-oni** means:

**"Son of my sorrow"** or **"Son of my suffering."**

Rachel chooses this name because his birth is taking place during the suffering that leads to her death.

The name reflects the sadness and pain of that moment.

👶 Ben-oni means "Son of my sorrow"

💔 Rachel names him as she is dying

😢 The name reflects her suffering

➡️ Benjamin

---

## ❤️ But His Father Called Him Benjamin

Jacob does not keep the name **Ben-oni**.

Instead, he renames his son **Benjamin**.

The name **Benjamin** means:

**"Son of the right hand."**

In the Bible, the **right hand** often symbolizes honor, strength, favor, and blessing.

Rather than allowing his son to carry a name connected to sorrow for the rest of his life, Jacob gives him a name associated with honor and hope.

Benjamin would become Jacob's youngest son and would later be the father of the tribe of Benjamin, one of the twelve tribes of Israel.

❤️ Jacob changes his son's name

👶 Benjamin means "Son of the right hand"

🙏 Jacob chooses a name of honor instead of sorrow

➡️ Rachel Is Buried

# Genesis 35:19–20

# 💔 The Death Of Rachel

---

## 💔 And Rachel Died

Rachel dies shortly after giving birth to Benjamin.

She was the wife Jacob loved most and had worked fourteen years to marry.

Her death marks one of the saddest moments in Jacob's life and fulfills the danger that was seen during her difficult labor.

💔 Rachel dies after giving birth to Benjamin

😢 Jacob loses the wife he loved most

➡️ And Was Buried In The Way To Ephrath

---

## 🪦 And Was Buried In The Way To Ephrath, Which Is Bethlehem

Rachel is buried where she dies because Jacob's family is still traveling.

The Bible explains that **Ephrath** is **Bethlehem**, the town that would later become the hometown of King David and the birthplace of Jesus.

Although Rachel was Jacob's beloved wife, she was **not** buried in the family burial cave at Machpelah, where Abraham and Sarah were buried and where Isaac, Rebekah, Jacob, and Leah would later be buried.

Years later, Jacob himself remembered this event when speaking to Joseph (Genesis 48:7), saying that Rachel died on the journey and was buried on the way to Ephrath.

🪦 Rachel is buried where she died

📍 Ephrath is the ancient name for Bethlehem

❤️ Rachel's burial place is different from the family burial cave

➡️ Jacob Set A Pillar Upon Her Grave

---

## 🪨 And Jacob Set A Pillar Upon Her Grave

Jacob places a standing stone over Rachel's grave.

A **pillar** was a memorial marker that helped identify an important location and preserve its memory.

By setting up this pillar, Jacob honors Rachel and marks the place where she was buried.

🪨 Jacob marks Rachel's burial place

🙏 The pillar serves as a memorial

➡️ That Is The Pillar Of Rachel's Grave Unto This Day

---

## 📖 That Is The Pillar Of Rachel's Grave Unto This Day

The phrase **"unto this day"** means Rachel's grave was still known when the book of Genesis was written.

Her burial place remained a recognized landmark for generations.

There is also a traditional site near Bethlehem today known as Rachel's Tomb. While many believe it marks the location of her burial, the Bible simply tells us that Rachel was buried on the way to Ephrath (Bethlehem).

📖 Rachel's grave remained well known

🪨 The memorial stood for many generations

📍 Rachel's traditional tomb is near Bethlehem

# Genesis 35:21–27

# 👨‍👦 Jacob's Descendants

---

## ⛺ And Israel Journeyed

For the first time since God confirmed Jacob's new name, the Bible now refers to him as **Israel** instead of Jacob.

This marks an important transition in the story.

Although the Bible will continue to use both names throughout Genesis, this is the first time the narrative itself calls him **Israel** after God reaffirmed his new name.

Rachel has now died and been buried near Bethlehem.

After mourning her death, Israel continues the journey with his family.

⛺ The Bible now calls Jacob "Israel"

🇮🇱 This highlights his covenant identity

💔 Rachel has been buried, and the journey continues

➡️ Spread His Tent Beyond The Tower Of Eder

---

## 🏕️ Spread His Tent Beyond The Tower Of Eder

Israel moves his household and pitches his tents beyond the **Tower of Eder**.

The name **Eder** means **"flock."**

The Tower of Eder, or **Migdal Eder**, was likely a watchtower used by shepherds to guard their sheep and watch over the surrounding fields.

It was located near Bethlehem.

Jacob is continuing south toward Hebron, where his father Isaac is living.

🏕️ Israel moves his camp again

🐑 Tower of Eder means "Tower of the Flock"

📍 It was near Bethlehem on the way to Hebron

➡️ Reuben Went And Lay With Bilhah

---

## ⚠️ Reuben Went And Lay With Bilhah, His Father's Concubine

The Bible says Reuben **"lay with"** Bilhah.

This means he had sexual relations with her.

Bilhah was Rachel's servant and one of Jacob's wives, often called his **concubine**.

A concubine was a secondary wife who had a recognized relationship with her husband but did not have the same social status as the primary wives.

This was a very serious sin.

In the ancient world, sleeping with a ruler's wife or concubine could also be seen as an attempt to challenge his authority and claim leadership over the family.

Later in the Bible, Absalom would do something similar during his rebellion against King David.

Many Bible scholars believe Reuben's actions were more than sexual sin—they were also an attempt to place himself in authority as the firstborn son.

⚠️ "Lay with" means he had sexual relations with Bilhah

👩 Bilhah was Jacob's concubine and Rachel's servant

👑 Reuben may have been attempting to assert leadership over the family

➡️ Israel Heard It

---

## 👂 And Israel Heard It

The Bible simply says,

**"And Israel heard it."**

No immediate punishment is recorded here.

However, Israel did not forget what Reuben had done.

Many years later, when Jacob blessed his sons before his death, he removed Reuben's privileges as the firstborn because of this very sin (Genesis 49:3–4).

Sometimes the consequences of sin are not immediate, but they still come.

👂 Israel learns what happened

⏳ Judgment is delayed, not forgotten

📖 Reuben later loses the rights of the firstborn

➡️ Now The Sons Of Jacob Were Twelve

---

## 👨‍👦 Now The Sons Of Jacob Were Twelve

With Benjamin's birth, Jacob's family is now complete.

He has **twelve sons**, who will become the fathers of the **twelve tribes of Israel**.

This verse marks an important milestone in Genesis.

From this point forward, God's covenant nation begins taking shape through these twelve sons.

👨‍👦 Jacob now has twelve sons

🇮🇱 They become the fathers of Israel's twelve tribes

➡️ The Sons Of Leah

---

## 👨 The Sons Of Leah

Leah bore Jacob six sons:

- Reuben
- Simeon
- Levi
- Judah
- Issachar
- Zebulun

Reuben was the firstborn but would later lose his special privileges because of his sin with Bilhah.

Simeon and Levi were the two brothers who led the attack on Shechem.

Judah would later become the tribe through whom Israel's kings—and eventually Jesus Christ—would come.

👨 Leah bore six sons

👑 Judah's family line leads to King David and Jesus

⚠️ Reuben, Simeon, and Levi each faced consequences for their actions

➡️ The Sons Of Rachel

---

## ❤️ The Sons Of Rachel

Rachel, Jacob's beloved wife, had two sons:

- Joseph
- Benjamin

Joseph would later become the ruler of Egypt under Pharaoh.

Benjamin was Rachel's final son, whose birth cost Rachel her life.

❤️ Rachel bore Joseph and Benjamin

🇪🇬 Joseph would later rise to power in Egypt

💔 Rachel died giving birth to Benjamin

➡️ The Sons Of Bilhah

---

## 👩 The Sons Of Bilhah, Rachel's Handmaid

Bilhah was Rachel's servant.

When Rachel was unable to have children, she gave Bilhah to Jacob as a wife according to the customs of that time.

Bilhah became the mother of:

- Dan
- Naphtali

These two sons would later become tribes of Israel.

👩 Bilhah was Rachel's servant

👨‍👦 Dan and Naphtali were her sons

➡️ The Sons Of Zilpah

---

## 👩 The Sons Of Zilpah, Leah's Handmaid

Zilpah was Leah's servant.

Like Bilhah, she became one of Jacob's wives according to the customs of that time.

She gave birth to:

- Gad
- Asher

These sons also became tribes of Israel.

👩 Zilpah was Leah's servant

👨‍👦 Gad and Asher became tribes of Israel

➡️ These Are The Sons Of Jacob

---

## 📖 These Are The Sons Of Jacob, Which Were Born To Him In Padan-aram

The Bible summarizes Jacob's sons by saying they were born in **Padan-aram**.

Padan-aram was the region where Jacob lived with his uncle Laban for about twenty years.

Benjamin is the one exception.

He was born later, after Jacob had returned to Canaan, near Bethlehem.

The verse is emphasizing the family that was established during Jacob's years away from home rather than giving the exact birthplace of every son.

📖 Padan-aram was Laban's homeland

🏠 Most of Jacob's sons were born there

👶 Benjamin was born later near Bethlehem

➡️ Jacob Came Unto Isaac His Father

---

## 👴 And Jacob Came Unto Isaac His Father

After more than twenty years away, Jacob is finally reunited with his father, Isaac.

God had promised Jacob that He would bring him safely back to his father's house.

Now that promise is fulfilled.

Jacob returns not as the man who fled with almost nothing, but as the head of a large family with great wealth.

👴 Jacob is reunited with Isaac

🙏 God fulfills His promise to bring Jacob home

➡️ Unto Mamre… Unto The City Of Arbah

---

## 📍 Unto Mamre, Unto The City Of Arbah, Which Is Hebron

Isaac was living near **Mamre**, an area by the city of **Hebron**.

The Bible also calls Hebron **Kirjath-arba**, meaning **"City of Arba."**

This was the same general area where Abraham had lived for many years.

It was also where the family burial cave of Machpelah was located.

From the Bethlehem area to Hebron is roughly **30 kilometers (about 18–20 miles)**.

For a large household traveling with flocks and herds, this journey likely took several days.

📍 Mamre was near Hebron

🏠 Abraham and Isaac had lived there

🚶 It was about 30 km (18–20 miles) south of Bethlehem

➡️ Where Abraham And Isaac Sojourned

# Genesis 35:28–29

# 👴 The Death Of Isaac

---

## 👴 And The Days Of Isaac Were An Hundred And Fourscore Years

Isaac lived to be **180 years old**.

Many years earlier, when Isaac called Esau to receive the blessing, he believed he was near death because his eyesight had become very poor.

However, Isaac did **not** die then.

Instead, he lived for many more years.

Jacob spent about **20 years** living with Laban in Padan-aram.

After returning to Canaan, several more events took place before Jacob finally arrived at Hebron to see his father again.

By the time Isaac died, Jacob had already been home for a number of years.

Although the Bible does not give the exact number of years between Jacob's return and Isaac's death, Isaac lived **much longer** than anyone expected when he first blessed Jacob.

👴 Isaac lived to be 180 years old

👁️ He thought he was near death years earlier

⏳ He lived many years after blessing Jacob

➡️ Isaac Gave Up The Ghost

---

## 🕊️ And Isaac Gave Up The Ghost, And Died

The phrase **"gave up the ghost"** is an old English expression meaning that Isaac died.

It does not describe a ghost leaving his body.

It simply means that his earthly life came to an end.

The same expression is also used for Abraham and later for other people in the Bible.

🕊️ "Gave up the ghost" means Isaac died

📖 The Bible uses this expression for others as well

➡️ Was Gathered Unto His People

---

## ⚰️ And Was Gathered Unto His People

This is the same expression used when Abraham died.

Being **"gathered unto his people"** means Isaac was gathered to those who had gone before him.

It speaks of joining his ancestors in death.

Afterward, Isaac was buried in the family burial cave at **Machpelah**, where Abraham and Sarah had been buried.

Later, Rebekah, Jacob, and Leah would also be buried there.

⚰️ Isaac joins those who died before him

🪦 He is buried in the family burial place

📖 The same expression was used for Abraham

➡️ Being Old And Full Of Days

---

## 📖 Being Old And Full Of Days

The phrase **"full of days"** means Isaac lived a long and complete life.

God had fulfilled His promises to him.

Isaac lived to see Jacob safely return to Canaan.

He also lived long enough to see his grandchildren and the beginning of the family that would become the nation of Israel.

His life came to a peaceful end after many years.

👴 Isaac lived a long life

🙏 God fulfilled His promises to him

👨‍👩‍👦 He saw the next generation of God's covenant family

➡️ Esau And Jacob Buried Him

---

## 🤝 And His Sons Esau And Jacob Buried Him

Although Jacob and Esau had been separated for many years, they came together to bury their father.

Years earlier, Esau wanted to kill Jacob.

But after God brought reconciliation between them, the brothers were able to stand together at Isaac's burial.

This is the last recorded event involving Isaac.

His death closes another generation of the covenant family.

🤝 Esau and Jacob bury their father together

❤️ Their earlier reconciliation made this possible

📖 Isaac's death marks the end of another generation`;

export const GENESIS_THIRTY_FIVE_PERSONAL_SECTIONS = parseGenesisThirtyFiveRawNotes(GENESIS_THIRTY_FIVE_RAW_NOTES);
