export type GenesisTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisTwentyFiveRawNotes(rawText: string): GenesisTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 25:${startVerse}` : `Genesis 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Genesis 25 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_TWENTY_FIVE_RAW_NOTES = `# Genesis 25:1–6

# 👨‍👩‍👦 Abraham's Descendants

---

## ❤️ Then Again Abraham Took A Wife

Some time has passed since Sarah's death and Isaac's marriage to Rebekah.

Now Abraham marries again.

His new wife's name is **Keturah**.

The Bible does not tell us exactly where Keturah came from or how long after Isaac's marriage Abraham married her.

A wife in Abraham's day helped manage the household, oversee servants, raise children, and help continue the family line.

Abraham is old, but God still gives him more descendants.

❤️ Time has passed

👰 Abraham marries Keturah

🏡 A wife helped manage the household and family

➡️ Keturah has children

---

## 👶 She Bare Him Zimran, Jokshan, Medan, Midian, Ishbak, And Shuah

Keturah gives Abraham **six sons**.

These sons do not carry the covenant promise like Isaac, but they still become important family lines.

- **Zimran** — Little is known about him, but his descendants likely became a tribe east or southeast of Canaan.
- **Jokshan** — He becomes the father of Sheba and Dedan, two names later connected with Arabian trade routes.
- **Medan** — Likely became connected with desert tribes east of Canaan.
- **Midian** — The most important name in this list. His descendants become the **Midianites**. Later, Moses flees to Midian, marries Zipporah there, and lives there before God calls him at the burning bush.
- **Ishbak** — Little is known about him.
- **Shuah** — His descendants may be connected to the **Shuhites**, like Bildad the Shuhite in Job.

👶 Keturah has six sons

🌍 These sons become tribal family lines

📖 Midian becomes the most important later

➡️ Jokshan's line is explained

---

## 🌍 Jokshan Begat Sheba And Dedan

Jokshan has two sons: **Sheba** and **Dedan**.

These names are later connected with Arabian peoples known for trade, travel, spices, wealth, and caravan routes.

**Sheba** later becomes connected with a wealthy kingdom famous for gold, spices, and long-distance trade.

**Dedan** is also connected with merchants and trading peoples who traveled through desert routes.

These family lines help explain how Abraham's descendants spread far beyond Isaac's line.

🌍 Sheba is connected with wealth and trade

🐪 Dedan is connected with caravan routes and merchants

📖 Abraham's family spreads into many peoples

➡️ Dedan's sons are listed

---

## 👨‍👦 The Sons Of Dedan Were Asshurim, Letushim, And Leummim

Dedan has three sons: **Asshurim, Letushim, and Leummim**.

These names likely became clan or tribal groups.

The Bible does not give long stories about them, but Moses records them to show how Abraham's family kept spreading into different peoples and regions.

👨‍👦 Dedan's sons become family groups

🏕️ They likely became desert clans or tribes

📖 Abraham's descendants continue multiplying

➡️ Midian's family is listed

---

## 👨‍👦 The Sons Of Midian Were Ephah, Epher, Hanoch, Abidah, And Eldaah

Midian has five sons: **Ephah, Epher, Hanoch, Abidah, and Eldaah**.

These sons became branches of the Midianite people.

The Midianites later appear many times in Scripture.

Sometimes they interact peacefully with God's people, like when Moses lives in Midian.

Other times, they become enemies of Israel.

This shows that Abraham's descendants through Keturah became real nations and tribes, not just names in a list.

👨‍👦 Midian has five sons

🏕️ They become Midianite family lines

📖 The Midianites become important later in the Bible

➡️ Moses summarizes Keturah's children

---

## 📖 All These Were The Children Of Keturah

This verse summarizes the family line.

All these sons and grandsons came through Abraham and Keturah.

God had promised Abraham that he would become the father of many nations.

This chapter shows that promise spreading in more than one direction.

Isaac carries the covenant line, but Abraham's other children also become peoples and nations.

📖 These are Keturah's descendants

🌍 Abraham becomes father of many peoples

👑 Isaac still carries the covenant promise

➡️ Abraham gives Isaac the inheritance

---

## 👑 Abraham Gave All That He Had Unto Isaac

Abraham gives the main inheritance to Isaac.

Isaac is the promised son.

He is the son God chose to continue the covenant, the land promise, and the family line that will lead to Israel.

This does not mean Abraham gave nothing to his other sons.

The next verse shows that Abraham did give them gifts.

But the main inheritance, leadership, covenant blessing, and family authority all pass to Isaac.

👑 Isaac receives the main inheritance

📖 Isaac is the covenant son

🙏 God's promise continues through Isaac

➡️ Abraham also provides for his other sons

---

## 👨‍👦 Unto The Sons Of The Concubines Which Abraham Had

A **concubine** was a secondary wife.

She had a real relationship with the man, and her children were counted as his children, but she did not have the same status as the main wife.

Her children usually did not receive the main inheritance.

Sarah was Abraham's primary wife.

Isaac, Sarah's son, was the covenant heir.

The sons of the concubines were still Abraham's sons, but they were not given Isaac's place.

👨‍👦 Concubines were secondary wives

📖 Their children were real sons

👑 Isaac still remained the main heir

➡️ Abraham gives them gifts

---

## 🎁 Abraham Gave Gifts

Abraham does not send his other sons away empty-handed.

He gives them gifts before he dies.

These gifts may have included animals, silver, gold, servants, supplies, tents, tools, and anything needed to help them begin their own households.

This was Abraham providing for them without giving them Isaac's inheritance.

He gave them enough to start their own lives, build their own families, and settle elsewhere.

🎁 Abraham provides for his other sons

🐑 The gifts may have included animals, money, servants, and supplies

🏕️ These gifts helped them start their own households

➡️ Abraham sends them away from Isaac

---

## ➡️ And Sent Them Away From Isaac His Son, While He Yet Lived, Eastward Unto The East Country

Abraham sends his other sons away from Isaac while he is still alive.

This was wise.

If they all stayed near Isaac, there could have been fighting later over land, leadership, inheritance, and who had the right to rule Abraham's household.

Abraham handles it before he dies.

He makes Isaac's position clear while he is still alive.

The other sons are blessed and provided for, but Isaac remains the covenant heir.

They are sent **eastward**, meaning toward the lands east of Canaan, into the desert regions and Arabian territories.

➡️ Abraham prevents future conflict

👑 Isaac's inheritance is protected

🌍 The other sons settle east of Canaan

📖 Abraham's family spreads into many nations

# Genesis 25:7–11

# ⚰️ The Death Of Abraham

---

## 📖 These Are The Days Of The Years Of Abraham's Life

This is Moses' way of bringing Abraham's story to a close.

For over twelve chapters, the Bible has followed Abraham's journey—from God calling him out of Ur, to the covenant, Isaac's birth, and God's many promises.

Now Moses is closing Abraham's account before moving the story forward through Isaac.

📖 Moses closes Abraham's life story

❤️ Abraham's role in God's plan is complete

➡️ Abraham's age is recorded

---

## 🎂 An Hundred Threescore And Fifteen Years

A **score** means **twenty**.

So:

- 💯 One hundred = 100
- ✋ Threescore = 60 (3 × 20)
- ➕ Fifteen = 15

Together, Abraham lived **175 years**.

He had seen God's promises begin to come true before he died.

🎂 Score means twenty

🧮 100 + 60 + 15 = 175 years

🙏 Abraham lived a long, full life

➡️ Abraham dies

---

## 🕊️ Abraham Gave Up The Ghost

**"Gave up the ghost"** is an old Hebrew expression that simply means **he breathed his last and his spirit departed from his body.**

It is **not** talking about a ghost floating around.

The word **ghost** here refers to the **breath of life** or **spirit** leaving the body at death.

The same expression is used later for several people in the Bible, including Jesus.

🕊️ "Gave up the ghost" means he died

💨 His spirit departed from his body

📖 It is an ancient expression for death

➡️ Moses describes Abraham's life

---

## ❤️ Died In A Good Old Age, An Old Man, And Full Of Years

Abraham dies at **175 years old**.

Sarah had died earlier at **127 years old**, meaning Abraham lived about **48 years after Sarah's death**.

When the Bible says he was **"full of years,"** it means he lived a long, satisfying life.

He experienced God's blessings, saw Isaac grow into adulthood, saw Isaac married, met his grandchildren through Keturah, and watched God's promises begin to unfold.

His life was complete.

❤️ Abraham dies at 175 years old

👵 Sarah died at 127 years old

🙏 Abraham lived long enough to see God's promises begin

➡️ Abraham is gathered to his people

---

## 👨‍👩‍👧 Was Gathered To His People

This does **not** simply mean Abraham was buried.

Sarah was the only person buried in the cave before him.

Instead, this expression refers to Abraham being gathered to those who had gone before him in death.

It points to the continuation of life beyond physical death.

Only after saying he was gathered to his people does the Bible describe his burial.

🙏 Abraham joins those who died before him

📖 This speaks of life beyond physical death

⚰️ It is different from simply being buried

➡️ Isaac and Ishmael bury Abraham

---

## ⚰️ Isaac And Ishmael Buried Him In The Cave Of Machpelah

Both of Abraham's sons come together to bury their father.

Although Isaac remained the covenant heir and Ishmael lived far away, this shows there was still a relationship between them.

The Bible doesn't tell us how often they saw one another, but Ishmael returned to honor his father at his funeral.

The Cave of Machpelah is the burial place Abraham had purchased years earlier after Sarah died.

⚰️ Isaac and Ishmael bury Abraham together

❤️ Ishmael returns to honor his father

📖 Abraham is buried beside Sarah

➡️ Moses reminds us where the cave is

---

## 🏞️ The Field Which Abraham Purchased Of The Sons Of Heth

Moses reminds us that Abraham legally purchased this burial place.

The **sons of Heth** were the **Hittites**, descendants of **Heth**, one of Canaan's sons (Genesis 10).

Years earlier, Abraham refused to accept the land as a gift and paid the full price for it.

That purchase permanently secured the cave as his family's burial place.

🏞️ The land belonged to the Hittites

💰 Abraham legally purchased the field

📖 This fulfills the earlier account in Genesis 23

➡️ Abraham is buried with Sarah

---

## ❤️ There Was Abraham Buried, And Sarah His Wife

Abraham is laid to rest beside Sarah.

The husband and wife who had walked together through decades of faith, failures, waiting, and God's promises are now buried together.

The burial place Abraham purchased for Sarah now becomes the family tomb.

❤️ Abraham is buried beside Sarah

🏡 Machpelah becomes the family burial place

📖 Later Isaac, Rebekah, Jacob, and Leah will also be buried there

➡️ God's covenant continues through Isaac

---

## 🙏 It Came To Pass After The Death Of Abraham, That God Blessed His Son Isaac

With Abraham's story now complete, the focus shifts to Isaac.

The covenant has not ended.

God now continues His promises through the next generation.

The blessing that rested upon Abraham now rests upon Isaac as the covenant heir.

This marks the beginning of Isaac's role in God's unfolding plan.

🙏 God's covenant continues

👑 Isaac becomes the covenant patriarch

❤️ The promises now continue through Isaac

➡️ Isaac's home is mentioned

---

## 💧 Isaac Dwelt By The Well Beer-Lahai-Roi

Isaac continues living near **Beer-Lahai-Roi**, which means **"The Well of the Living One Who Sees Me."**

This is the same well where Hagar met the Angel of the Lord in Genesis 16 after fleeing from Sarah.

It is also where Isaac was living when Rebekah first arrived.

Now, after Abraham's death, Isaac continues living there as the new head of the covenant family.

💧 Beer-Lahai-Roi means "The Well of the Living One Who Sees Me"

📖 It connects back to Hagar's encounter with God

👑 Isaac now leads Abraham's household and carries God's covenant forward

# Genesis 25:12–18

# 🏕️ Ishmael's Descendants

---

## 📖 These Are The Generations Of Ishmael

Moses now shifts the story from Abraham to Ishmael.

Abraham has died.

Isaac has received the covenant and become the head of Abraham's household.

Now, before continuing Isaac's story, Moses briefly records what happened to Ishmael and his family.

This is a pattern seen throughout Genesis. Moses often finishes one family line before returning to the one through which God will continue His covenant.

📖 Moses finishes Ishmael's family line

👑 Isaac remains the covenant heir

➡️ Ishmael's family is introduced

---

## 👨 Abraham's Son, Whom Hagar The Egyptian, Sarah's Handmaid, Bare Unto Abraham

Moses reminds us exactly who Ishmael is.

He is Abraham's son through **Hagar**, the Egyptian servant Sarah gave to Abraham years earlier.

Although Ishmael was not the son of the covenant, he was still Abraham's son.

God had promised Abraham that Ishmael would also become a great nation, and now we begin to see that promise fulfilled.

👨 Ishmael is Abraham's son

👩 Hagar was Sarah's Egyptian handmaid

🙏 God also kept His promise to Ishmael

➡️ Ishmael's sons are listed

---

## 👨‍👦 These Are The Names Of The Sons Of Ishmael

Moses now records Ishmael's family.

The names are listed **according to their generations**, meaning they are recorded in family order, beginning with the oldest son.

Ishmael has **twelve sons**, just as God had promised Abraham in Genesis 17.

👨‍👦 Ishmael has twelve sons

📖 They are listed in family order

🙏 God fulfills His promise to Ishmael

➡️ The first four sons

---

## 👑 The Firstborn Of Ishmael: Nebaioth, Kedar, Adbeel, And Mibsam

These are Ishmael's first four sons.

1️⃣ **Nebaioth** — Ishmael's firstborn. His descendants became an Arabian tribe known for raising flocks.

2️⃣ **Kedar** — One of the most well-known Arabian tribes in the Old Testament. They became famous for shepherding, tents, and trade throughout the desert.

3️⃣ **Adbeel** — Became the ancestor of another Arabian clan.

4️⃣ **Mibsam** — Also became the head of a tribal family.

👑 These are Ishmael's first four sons

🏕️ Each became the father of a tribe

➡️ More sons are listed

---

## 👨‍👦 Mishma, Dumah, And Massa

Moses continues the genealogy.

5️⃣ **Mishma**

6️⃣ **Dumah**

7️⃣ **Massa**

These sons also became tribal leaders whose descendants settled throughout northern Arabia.

👨‍👦 More tribal families are established

🌍 Ishmael's descendants continue multiplying

➡️ The final sons are listed

---

## 👨‍👦 Hadar, Tema, Jetur, Naphish, And Kedemah

The final five sons complete Ishmael's family.

8️⃣ **Hadar**

9️⃣ **Tema** — Later became an important oasis and trading center in Arabia.

🔟 **Jetur** — Ancestor of the Itureans mentioned later in biblical history.

1️⃣1️⃣ **Naphish**

1️⃣2️⃣ **Kedemah**

Together these twelve sons fulfilled God's promise that Ishmael would become the father of twelve rulers.

👨‍👦 Ishmael has twelve sons

🌍 His descendants spread across Arabia

🙏 God's promise is fulfilled

➡️ Moses summarizes the family

---

## 👑 These Are The Sons Of Ishmael...Twelve Princes According To Their Nations

Moses summarizes the list.

Each son became the leader of his own people.

A **prince** was the chief or ruler of a tribe.

As their families grew, each tribe became its own **nation**—not a modern country, but an organized people group with its own leaders, territory, and settlements.

This is exactly what God promised years earlier.

👑 Each son became a tribal ruler

🏕️ Nations were growing tribes and people groups

🙏 God fulfilled His promise to Ishmael

➡️ Ishmael's life comes to an end

---

## 📖 These Are The Years Of The Life Of Ishmael...An Hundred And Thirty And Seven Years...He Gave Up The Ghost

Ishmael lived **137 years**.

Like Abraham, the Bible says he **gave up the ghost**, meaning his spirit departed from his body and he died.

The same expression was used for Abraham and simply describes death.

🙏 Ishmael lived 137 years

🕊️ "Gave up the ghost" means he died

📖 Moses closes Ishmael's life

➡️ Ishmael is gathered to his people

---

## ❤️ He Was Gathered Unto His People

Just as with Abraham, this means more than burial.

It speaks of joining those who had died before him.

Only afterward does the Bible describe where his descendants lived.

❤️ Ishmael's earthly life ends

📖 He is gathered to those who died before him

➡️ His descendants' homeland is described

---

## 🌍 They Dwelt From Havilah Unto Shur...Before Egypt, As Thou Goest Toward Assyria

Ishmael's descendants spread across a large region stretching from **Havilah** in Arabia to **Shur**, which lay near the border of Egypt.

This territory was **east and southeast of Canaan**, extending across the northern Arabian Desert toward Assyria.

Isaac remained in Canaan as the covenant heir.

Ishmael's family settled outside the Promised Land, just as Abraham had earlier sent them eastward.

🌍 Ishmael's descendants settled across northern Arabia

🏜️ Their territory stretched from Havilah to Shur

📖 Isaac remained in Canaan while Ishmael's family lived outside it

➡️ Moses ends Ishmael's account

---

## 👨 He Died In The Presence Of All His Brethren

**"His brethren"** refers to Ishmael's relatives—his brothers and the family descended from Abraham.

The expression means Ishmael's descendants settled alongside the other branches of Abraham's family, fulfilling what God had told Hagar long before: that Ishmael would live alongside his relatives.

It also brings Ishmael's story to a peaceful close before Genesis turns its full attention back to Isaac.

👨 Brethren means Abraham's extended family

🏕️ Ishmael's descendants settled alongside their relatives

📖 Moses now returns to the covenant line through Isaac

# Genesis 25:19–23

# 👶 Isaac's Descendants

---

## 📖 These Are The Generations Of Isaac

Moses now shifts the story from Ishmael back to Isaac.

Ishmael's family line has been completed.

Now the focus returns to the covenant family through whom God will continue His promises.

From this point forward, Genesis follows Isaac's descendants.

📖 Moses returns to the covenant family

👑 Isaac is now the focus of the story

➡️ Isaac's marriage is reviewed

---

## 💍 Isaac Was Forty Years Old When He Took Rebekah To Wife

Isaac was **40 years old** when he married Rebekah.

By this time, Abraham had lived long enough to see Isaac grow into adulthood, marry, and begin his own household.

Isaac was no longer a boy.

He was a grown man ready to continue the covenant family.

💍 Isaac marries at 40 years old

👨 He is now a mature man

➡️ Moses reminds us who Rebekah is

---

## 👨‍👩‍👧 The Daughter Of Bethuel The Syrian, Of Padan-aram, The Sister Of Laban The Syrian

Moses reminds us exactly who Rebekah is.

She is the daughter of **Bethuel**, Abraham's nephew, making Rebekah Abraham's great-niece and Isaac's cousin.

**Padan-aram** was the region in northern Mesopotamia where Abraham's relatives lived.

The word **"Syrian"** refers to someone from **Aram**, the region where Bethuel and Laban lived. It identifies where they were from, not their religion.

Moses also mentions **Laban** again because he will become a major part of the story later when Isaac sends Jacob there to find a wife.

👨 Rebekah is Isaac's cousin

🌍 Padan-aram was the homeland of Abraham's relatives

🇸🇾 "Syrian" means someone from Aram

📖 Laban is mentioned because he becomes important later

➡️ Isaac prays for Rebekah

---

## 🙏 Isaac Intreated The Lord For His Wife

**Intreated** means **earnestly prayed** or **pleaded with God**.

He prayed because Rebekah was unable to have children.

Just like Abraham and Sarah before them, Isaac and Rebekah faced years of waiting before God answered.

Rather than trying to solve the problem himself, Isaac brought it to God.

🙏 Entreated means earnestly prayed

❤️ Isaac prays for his wife

📖 Rebekah is unable to have children

➡️ God answers Isaac's prayer

---

## ❤️ The Lord Was Intreated Of Him...And Rebekah His Wife Conceived

God hears Isaac's prayer.

**"The Lord was intreated of him"** means **God answered Isaac's prayer.**

Rebekah then **conceived**, meaning she became pregnant.

Isaac and Rebekah waited about **20 years** after their marriage before God gave them children.

❤️ God answers Isaac's prayer

👶 Rebekah becomes pregnant

🙏 God's timing is perfect

➡️ Something unusual happens

---

## 👶 The Children Struggled Together Within Her

As Rebekah's pregnancy progressed, something frightening began happening.

The twins were not simply kicking.

They were **struggling violently against one another inside her womb**, almost as if they were already fighting before they were born.

The movement became so severe and unusual that Rebekah believed something was wrong.

This was far beyond a normal pregnancy.

The conflict inside her body reflected the conflict that would continue between the two nations they would one day become.

Unable to understand what was happening, Rebekah turns to God for an answer.

👶 The twins struggle violently inside the womb

⚔️ This is far more than normal movement

😟 Rebekah realizes something is seriously wrong

🌍 Their struggle points to the future conflict between their nations

➡️ Rebekah seeks the Lord for an explanation

---

## 🙏 If It Be So, Why Am I Thus?...She Went To Inquire Of The Lord

Rebekah asks,

**"Why is this happening to me?"**

She doesn't understand why the pregnancy is so difficult.

So she goes to **inquire of the Lord**, meaning she seeks God's answer through prayer.

Like Isaac before her, she brings her questions directly to God.

🙏 Rebekah seeks God's guidance

❤️ She asks why this is happening

📖 God answers her personally

➡️ God reveals His plan

---

## 👶 Two Nations Are In Thy Womb

God reveals that Rebekah is carrying twins.

But these are not just two babies.

They will become the fathers of **two nations**.

One son will become the nation of **Israel**, and the other will become the nation of **Edom**.

From the very beginning, God reveals that their lives will shape history.

👶 Rebekah is carrying twins

🌍 They will become two nations

🙏 God reveals His plan before they are born

➡️ The nations will be different

---

## 🌍 Two Manner Of People Shall Be Separated From Thy Bowels

God explains that these two sons will become two completely different peoples.

They will have different futures, different nations, and often opposing paths.

Their descendants will remain separate throughout much of Israel's history.

🌍 Two different nations will come from the twins

📖 Their descendants will follow different paths

➡️ One nation will become stronger

---

## 💪 The One People Shall Be Stronger Than The Other

God tells Rebekah that one nation will eventually become stronger than the other.

Throughout history, Israel would become greater than Edom, though there would be times when Edom gained temporary strength.

God is revealing His sovereign plan long before either child is born.

💪 One nation will become stronger

📖 God already knows their future

➡️ The greatest surprise is revealed

---

## 👑 The Elder Shall Serve The Younger

This was completely opposite of normal custom.

Normally, the **older son** received the birthright, leadership, and greater inheritance.

But God announces that **the younger son** will receive the covenant blessing instead.

Before either child has done anything good or bad, God reveals that His covenant will continue through the younger son, Jacob.

This was God's sovereign choice, not man's tradition.

👑 God chooses the younger son

📖 This reverses the normal custom of the firstborn

🙏 God's plan is established before either child is born

# Genesis 25:24–28

# 👶 The Birth Of Esau And Jacob

---

## 👶 When Her Days To Be Delivered Were Fulfilled...Behold, There Were Twins In Her Womb

The time finally came for Rebekah to give birth.

Just as God had told her, she was carrying **twins**.

In the ancient world, there were no ultrasounds or medical scans.

Parents usually did not know they were having twins until the babies were actually born.

That made this moment even more remarkable.

God had already revealed the secret before anyone else could have known.

👶 Rebekah gives birth

👶 Twins were often a surprise in the ancient world

🙏 God had already revealed what was inside her womb

➡️ The first son is born

---

## 🔴 The First Came Out Red, All Over Like An Hairy Garment...And They Called His Name Esau

The first baby was born with reddish skin and an unusually thick covering of hair.

The phrase **"like a hairy garment"** means his body was covered with so much hair that it looked almost like he was already wearing a coat.

This unusual appearance immediately stood out.

The name **Esau** is commonly understood to mean **"hairy"** or one associated with being rough and covered with hair.

His appearance at birth matched the kind of man he would later become.

🔴 Esau is born first

🧥 He is covered with an unusual amount of hair

📖 His name reflects his appearance

➡️ His brother follows

---

## ✋ After That Came His Brother Out...And His Hand Took Hold On Esau's Heel

As Jacob was being born, he was holding onto Esau's heel.

This was more than a random detail.

It symbolized the struggle that had already begun in the womb.

It also pointed forward to Jacob's future life, where he would eventually receive both the birthright and the blessing that normally belonged to the firstborn.

Even at birth, the brothers are pictured as competing with one another.

✋ Jacob is born holding Esau's heel

⚔️ Their struggle continues even at birth

📖 This points forward to the conflict that follows throughout their lives

➡️ Jacob receives his name

---

## 👶 His Name Was Called Jacob

The name **Jacob** means **"heel holder"** or **"one who grasps the heel."**

It also came to describe someone who follows closely behind another or seeks to take another's place.

His name perfectly matched the moment of his birth.

Later in Genesis, Jacob's life would continue to reflect both meanings until God eventually changed his name to Israel.

👶 Jacob means "heel holder"

✋ His name comes from the way he was born

📖 His life will reflect his name

➡️ Isaac's age is recorded

---

## 🎂 Isaac Was Threescore Years Old When She Bare Them

**Threescore** means **sixty**.

Isaac was **40 years old** when he married Rebekah.

Now he is **60 years old** when the twins are finally born.

That means Isaac and Rebekah waited **20 years** for God to answer their prayers.

For twenty years they trusted, prayed, and waited for the child God had promised.

God's promises sometimes take far longer than we expect, but He always keeps His word.

🎂 Isaac is 60 years old

⏳ The couple waited 20 years for children

🙏 God's timing is always perfect

➡️ The boys grow into very different men

---

## 🏹 The Boys Grew, And Esau Was A Cunning Hunter, A Man Of The Field

As the twins grew, their personalities became completely different.

A **cunning hunter** means Esau became a skilled, experienced hunter.

He knew how to track animals, survive outdoors, and provide food from the wilderness.

A **man of the field** means he loved life in the open country.

He preferred the outdoors, hunting, and adventure rather than staying close to home.

🏹 Esau becomes a skilled hunter

🌾 He enjoys life in the open fields

💪 His personality is active and adventurous

➡️ Jacob chooses a different life

---

## 🏕️ Jacob Was A Plain Man, Dwelling In Tents

The word **plain** here does **not** mean living on flat land.

It means Jacob was **quiet, peaceful, steady, and settled**.

Rather than spending his time hunting, Jacob stayed near the family camp.

**Dwelling in tents** means he helped manage the household, livestock, servants, and daily responsibilities that came with Abraham's large estate.

While Esau loved the wilderness, Jacob preferred life around home.

🏕️ Plain means quiet and steady

🐑 Jacob stayed with the family and their flocks

🏠 He managed life around the camp

➡️ Their parents develop favorites

---

## ❤️ Isaac Loved Esau...But Rebekah Loved Jacob

Isaac and Rebekah both loved their sons.

The Bible is not saying they hated the other child.

Instead, each parent naturally favored one son over the other.

Isaac especially enjoyed Esau because he often brought home fresh **venison**—wild game that Isaac loved to eat.

Rebekah, on the other hand, spent more time around Jacob, whose personality was much more like her own.

She also knew God's prophecy that **"the elder shall serve the younger,"** so she understood that Jacob would one day carry the covenant.

Sadly, these favoritism patterns would later create deep division within the family.

❤️ Both parents loved both sons

🍖 Isaac especially enjoyed Esau's hunting and venison

🏕️ Rebekah naturally grew closer to Jacob

📖 She also knew God's promise concerning the younger son

➡️ Favoritism begins to divide the family

# Genesis 25:29–34

# 🍲 Esau Sells His Birthright

---

## 🍲 Jacob Sod Pottage

**Sod** means **cooked** or **boiled**.

**Pottage** was a thick stew, much like a soup made with lentils, vegetables, herbs, and water.

While Esau was away hunting, Jacob was at home preparing a meal.

This fits their personalities.

Esau enjoyed life outdoors, while Jacob stayed near the tents helping manage the household.

🍲 Sod means cooked or boiled

🥣 Pottage was a thick lentil stew

🏕️ Jacob was preparing food while Esau was hunting

➡️ Esau returns home exhausted

---

## 🏹 Esau Came From The Field, And He Was Faint

After spending time hunting in the open country, Esau returned home **faint**.

**Faint** means completely exhausted, weak, and extremely hungry.

He wasn't literally dying.

He was speaking dramatically because he felt like he couldn't go any farther without food.

🏹 Esau returns from hunting

😩 Faint means exhausted and very hungry

➡️ He begs Jacob for food

---

## 🥣 Feed Me, I Pray Thee, With That Same Red Pottage...For I Am Faint

Esau sees Jacob's red lentil stew and immediately asks for some.

He doesn't care about anything except satisfying his hunger.

His appetite controls his decisions.

Instead of thinking about the future, he only thinks about the present moment.

🥣 Esau wants the red stew

😩 Hunger becomes his only focus

⚠️ He acts without thinking ahead

➡️ A new name is introduced

---

## 🔴 Therefore Was His Name Called Edom

**Edom** means **"red."**

Esau already had the name **Esau**, but after this event he also became known as **Edom** because of the **red stew** he desired so desperately.

Later, his descendants would become known as **the Edomites**, the nation of Edom.

This moment became so well known that it gave an entire nation its name.

🔴 Edom means "red"

🥣 The name comes from the red stew

🌍 Esau's descendants become the nation of Edom

➡️ Jacob makes an unexpected request

---

## 👑 Sell Me This Day Thy Birthright

Jacob sees an opportunity.

The **birthright** was different from the father's blessing.

The birthright belonged to the **firstborn son** and included:

- 👑 Leadership of the family after the father's death.
- 💰 A double portion of the inheritance.
- 🐑 Responsibility for the family's wealth, servants, flocks, and household.
- 📖 In Isaac's family, it also included the privilege of continuing God's covenant promises.

Jacob had spent years managing life around the tents while Esau preferred hunting and the outdoors.

Jacob understood the value of the birthright.

Esau did not.

👑 The birthright belonged to the firstborn

💰 It included leadership and a double inheritance

🐑 It meant managing the entire household

📖 It also carried the covenant promises

➡️ Esau answers carelessly

---

## 😩 Behold, I Am At The Point To Die...What Profit Shall This Birthright Do To Me?

Esau exaggerates his condition.

He isn't actually dying.

He's saying,

*"I'm so hungry that the birthright won't help me if I starve today."*

Instead of valuing God's promises and his future inheritance, Esau trades something eternal for something temporary.

His immediate appetite became more important than his lifelong calling.

😩 Esau speaks out of hunger

⚠️ He values the present over the future

📖 He treats God's gift as worthless

➡️ Jacob requires an oath

---

## 🤝 Swear To Me This Day

Jacob wants more than a verbal agreement.

He tells Esau to make it official by swearing an oath.

In the ancient world, an oath was a binding promise.

Once Esau swore, the agreement was considered legally and morally binding.

🤝 Jacob asks for an oath

📜 The agreement becomes official

➡️ Esau gives away his birthright

---

## 📜 He Swear Unto Him, And He Sold His Birthright Unto Jacob

Esau willingly agrees.

Jacob does not force him.

Esau knowingly gives up his birthright in exchange for one meal.

This wasn't a momentary mistake.

It revealed what Esau truly valued.

He considered a bowl of stew more important than the privileges of being the firstborn.

📜 Esau willingly sells his birthright

🍲 One meal becomes more valuable than God's promises

➡️ The trade is completed

---

## 🍞 Then Jacob Gave Esau Bread And Pottage Of Lentils

Jacob gives Esau bread and the lentil stew exactly as promised.

Esau eats, drinks, satisfies his hunger, and immediately leaves.

The meal solved his problem for only a short time.

The birthright he gave away would have lasted a lifetime.

🍞 Jacob keeps his promise

🥣 Esau satisfies a temporary hunger

⚠️ Temporary pleasure costs a lasting inheritance

➡️ Moses gives his conclusion

---

## ⚖️ Thus Esau Despised His Birthright

**Thus** means **"this shows"** or **"because of what just happened."**

Moses is giving God's conclusion to the story.

Esau didn't merely sell his birthright.

He **despised** it.

To **despise** means to treat something as having little or no value.

His actions showed that he cared more about satisfying his immediate desires than about the blessings, responsibilities, and covenant that belonged to the firstborn.

This is why the Bible later points back to Esau as a warning not to trade eternal blessings for temporary satisfaction.

⚖️ Thus means "this shows"

💔 Esau treated his birthright as worthless

🍲 He traded lasting blessings for temporary satisfaction

📖 Moses reveals Esau's true heart`;

export const GENESIS_TWENTY_FIVE_PERSONAL_SECTIONS = parseGenesisTwentyFiveRawNotes(GENESIS_TWENTY_FIVE_RAW_NOTES);
