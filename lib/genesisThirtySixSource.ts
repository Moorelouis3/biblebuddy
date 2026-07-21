export type GenesisThirtySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtySixRawNotes(rawText: string): GenesisThirtySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+36:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 36 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+36:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+36:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 36 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 36,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 36:${startVerse}` : `Genesis 36:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Genesis 36 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_SIX_RAW_NOTES = `# Genesis 36:1–5

# 📖 The Generations Of Esau

---

## 📖 Now These Are The Generations Of Esau

After recording the death of Isaac, Moses briefly shifts the focus away from Jacob.

For many chapters, Genesis has followed Jacob's life because God's covenant continued through him.

Now Moses records what became of **Esau** and his family before returning to Jacob's descendants.

This follows a pattern seen throughout Genesis.

The Bible often records the descendants of the family line that does **not** carry the covenant before returning to the line through which God's promises continue.

📖 Moses now turns to Esau's family

👨 Jacob remains the line of God's covenant

📜 Genesis records Esau's descendants before returning to Jacob

➡️ Who Is Edom?

---

## 🔴 Who Is Edom?

The Bible says,

**"Who is Edom."**

**Edom** was another name for Esau.

The name **Edom** means **"red."**

Years earlier, Esau sold his birthright to Jacob for the red stew Jacob had prepared.

Because of that event, he became known as **Edom**, and his descendants became the nation of **Edomites**.

Throughout the rest of the Old Testament, Israel and Edom would often have a troubled relationship, even though they descended from two brothers.

🔴 Edom means "red"

🥣 The name comes from the red stew Esau desired

👨 The Edomites descended from Esau

➡️ Esau Took His Wives Of The Daughters Of Canaan

---

## 👰 Esau Took His Wives Of The Daughters Of Canaan

Esau married women from the people of Canaan.

This was something Abraham had specifically tried to avoid for Isaac.

Abraham sent his servant all the way back to his relatives to find a wife for Isaac because he did not want his family marrying the Canaanites, who worshiped false gods.

Later, Rebekah was deeply grieved by Esau's Canaanite wives.

She told Isaac that they made her life bitter.

Marrying into families that served other gods often led God's people away from Him.

This became a repeated problem throughout Israel's history.

👰 Esau married Canaanite women

🙏 Abraham had warned against this

💔 Rebekah was grieved by Esau's marriages

🗿 The Canaanites worshiped false gods

➡️ Adah

---

## 👩 Adah, The Daughter Of Elon The Hittite

Adah was one of Esau's wives.

She was the daughter of **Elon**, who belonged to the **Hittites**.

The Hittites were one of the major people groups living in Canaan.

They were descendants of Canaan and did not worship the God of Abraham.

Adah later became the mother of Esau's son **Eliphaz**.

👩 Adah was one of Esau's wives

👨 Elon was her father

🏕️ The Hittites lived in Canaan

➡️ Aholibamah

---

## 👩 Aholibamah, The Daughter Of Anah, The Daughter Of Zibeon The Hivite

Aholibamah was another of Esau's wives.

She was the daughter of **Anah**, who was the son of **Zibeon the Hivite**. (In Hebrew, "daughter" here can mean a female descendant; later verses identify Anah as Zibeon's son.)

The **Hivites** were another Canaanite people group living in the land.

Like the other Canaanite nations, they did not worship the true God.

Aholibamah would later become the mother of three of Esau's sons.

👩 Aholibamah was Esau's wife

👨 Anah was her father

🏕️ Zibeon belonged to the Hivites

➡️ Bashemath

---

## 👩 Bashemath, Ishmael's Daughter, Sister Of Nebajoth

Bashemath was Esau's third wife.

Unlike Esau's other wives, she was not a Canaanite.

She was a daughter of **Ishmael**, Abraham's son through Hagar.

This made Bashemath Esau's cousin.

The Bible also identifies her as the sister of **Nebajoth**, Ishmael's firstborn son.

Earlier in Genesis, Esau married into Ishmael's family after realizing that his Canaanite marriages displeased his parents.

👩 Bashemath was Ishmael's daughter

👨 Ishmael was Abraham's son

👦 Nebajoth was her brother

➡️ Adah Bare To Esau Eliphaz

---

## 👶 And Adah Bare To Esau Eliphaz

Adah gave birth to **Eliphaz**, Esau's first recorded son.

Eliphaz would later become the father of several chiefs, making him an important ancestor of the nation of Edom.

His descendants are listed later in this chapter.

👶 Eliphaz was Esau's son through Adah

👑 His family became leaders in Edom

➡️ Bashemath Bare Reuel

---

## 👶 And Bashemath Bare Reuel

Bashemath gave birth to **Reuel**, another of Esau's sons.

Like his brother Eliphaz, Reuel would become the father of chiefs within the nation of Edom.

His descendants are also listed later in the chapter.

👶 Reuel was Esau's son through Bashemath

👑 His descendants became Edomite chiefs

➡️ Aholibamah Bare Jeush…

---

## 👶 And Aholibamah Bare Jeush, And Jaalam, And Korah

Aholibamah gave birth to three sons:

- Jeush
- Jaalam
- Korah

These sons also became part of the growing nation of Edom.

Together with Eliphaz and Reuel, they complete the list of Esau's five sons born in Canaan.

👶 Jeush, Jaalam, and Korah were Esau's sons

👨 Aholibamah was their mother

➡️ These Are The Sons Of Esau

---

## 📖 These Are The Sons Of Esau, Which Were Born Unto Him In The Land Of Canaan

Before Esau moved away from Canaan, he had five sons:

- Eliphaz
- Reuel
- Jeush
- Jaalam
- Korah

These sons became the beginning of the nation of Edom.

In the verses that follow, the Bible will trace their descendants and show how Esau's family grew into a powerful people.

👨 Esau had five sons born in Canaan

🌎 They became the ancestors of the Edomites

➡️ Esau Moves To Mount Seir

# Genesis 36:6–12

# ⛰️ Esau Settles in Mount Seir

---

## 👨 Esau Took His Wives, And His Sons, And His Daughters

Esau gathered his entire family before leaving the land of Canaan.

His household included his **three wives**:

- **Adah**, the daughter of Elon the Hittite.
- **Aholibamah**, the daughter of Anah, granddaughter of Zibeon the Hivite.
- **Bashemath**, the daughter of Ishmael and sister of Nebajoth.

He also took his sons and daughters. Genesis has already named his five sons, but it does not record the names of his daughters.

This was a permanent move, so Esau took his entire family with him.

👨 Esau moves his whole family

👰 His three wives travel with him

👧 His sons and daughters leave Canaan

➡️ And All The Persons Of His House…

---

## 🏕️ And All The Persons Of His House, And His Cattle, And All His Beasts

The **persons of his house** were everyone who belonged to Esau's household, including servants, shepherds, herdsmen, and others who worked for him.

His **cattle** included livestock such as sheep, goats, oxen, and cows. These animals were an important source of food, clothing, and wealth.

His **beasts** were larger working animals, such as camels and donkeys, used for transportation, carrying supplies, and traveling long distances.

These verses show that Esau had become a wealthy man with a large household, just like Jacob.

🏕️ Esau had many servants and workers

🐑 His cattle were valuable livestock

🐪 His beasts were used for travel and work

➡️ And All His Substance…

---

## 💰 And All His Substance

The word **substance** means everything Esau owned.

This included his possessions, tents, tools, clothing, household goods, money, and anything else that made up his wealth.

Esau was not leaving with only his family—he was moving everything he had accumulated over many years.

💰 Substance means all of Esau's possessions

🏕️ He moved everything he owned

➡️ Which He Had Gotten In The Land Of Canaan

---

## 🌾 Which He Had Gotten In The Land Of Canaan

Everything Esau was taking had been acquired while living in Canaan.

He had spent most of his life there, building his family, increasing his flocks, and becoming a wealthy man.

Now he was leaving behind the land where he had built his life.

🌾 Esau gained his wealth while living in Canaan

🐑 His flocks and possessions had grown over many years

➡️ And Went Into The Country From The Face Of His Brother Jacob

---

## 🚶 And Went Into The Country From The Face Of His Brother Jacob

The phrase **"from the face of his brother Jacob"** means Esau moved **away from** Jacob.

This does not mean they were enemies again.

Earlier, God had brought reconciliation between the two brothers.

Instead, Esau settled in another region while Jacob remained in Canaan, the land God had promised to Abraham, Isaac, and Jacob.

🚶 Esau moved away from Jacob

🤝 The brothers had already been reconciled

🌍 Jacob remained in the Promised Land

➡️ For Their Riches Were More Than That They Might Dwell Together

---

## 🐑 For Their Riches Were More Than That They Might Dwell Together

Both Esau and Jacob had become extremely wealthy.

Their flocks, herds, servants, and families had grown so large that the land could no longer support both households living together.

This is very similar to what happened earlier with **Abraham and Lot**, when they separated because there was not enough grazing land for all their livestock.

🐑 Both brothers had become very wealthy

🌿 There was not enough land for both households

📖 This echoes the separation of Abraham and Lot

➡️ And The Land Wherein They Were Strangers…

---

## 🌿 And The Land Wherein They Were Strangers Could Not Bear Them Because Of Their Cattle

Although Canaan had been promised to Abraham's descendants, they were still living there as **strangers**, surrounded by the people of the land.

The available pasture and water could not support the enormous number of animals owned by both brothers.

Their separation was a practical decision because of their great wealth.

🌿 They were still living as strangers in Canaan

🐑 The land could not support all their livestock

➡️ Thus Dwelt Esau In Mount Seir

---

## ⛰️ Thus Dwelt Esau In Mount Seir

Esau settled permanently in **Mount Seir**, a mountainous region south and southeast of the Dead Sea.

This became the homeland of Esau's descendants.

While Jacob remained in Canaan, Esau established a new nation in Mount Seir.

⛰️ Esau settled in Mount Seir

🏠 It became the home of his descendants

➡️ Esau Is Edom

---

## 🔴 Esau Is Edom

Moses reminds the reader that **Esau** is also called **Edom**.

The name **Edom** means **"red,"** a reminder of the red stew for which Esau sold his birthright.

From this point on, whenever the Bible speaks of **Edom** or the **Edomites**, it is referring to Esau and his descendants.

🔴 Esau was also called Edom

🌎 His descendants became the nation of Edom

➡️ These Are The Generations Of Esau

---

## 📖 These Are The Generations Of Esau

Moses now begins tracing Esau's family line in detail.

Just as Genesis recorded the descendants of Adam, Noah, Ishmael, and others, it now records the descendants of Esau.

This helps explain where the nation of Edom came from before the story returns to Jacob's family.

📖 Moses begins Esau's family record

🌎 The chapter explains the origin of the Edomites

➡️ The Father Of The Edomites In Mount Seir

---

## 👨 The Father Of The Edomites In Mount Seir

Esau became the father of the nation known as the **Edomites**.

They settled in Mount Seir and remained there for many generations.

Throughout the Old Testament, the Edomites appear as one of Israel's neighboring nations.

Although Israel and Edom descended from twin brothers, their relationship was often marked by conflict.

👨 Esau became the father of the Edomites

⛰️ Mount Seir became their homeland

📖 Israel and Edom descended from Jacob and Esau

➡️ These Are The Names Of Esau's Sons

---

## 👦 These Are The Names Of Esau's Sons

Moses now begins listing Esau's descendants family by family.

These names become the leaders and ancestors of the nation of Edom.

👦 Moses begins naming Esau's descendants

🌎 These families became the nation of Edom

➡️ Eliphaz…

---

## 👦 Eliphaz, The Son Of Adah, The Wife Of Esau

Eliphaz was Esau's first recorded son.

His mother was **Adah**, one of Esau's Canaanite wives.

Eliphaz became an important ancestor in Edom, and many chiefs descended from him.

👦 Eliphaz was Esau's son through Adah

👑 His descendants became leaders in Edom

➡️ Reuel…

---

## 👦 Reuel, The Son Of Bashemath, The Wife Of Esau

Reuel was Esau's son through **Bashemath**, the daughter of Ishmael.

His descendants also became important families within the nation of Edom.

👦 Reuel was Esau's son through Bashemath

🌎 His family became part of the nation of Edom

➡️ The Sons Of Eliphaz…

---

## 👨‍👦 And The Sons Of Eliphaz Were Teman, Omar, Zepho, Gatam, And Kenaz

Eliphaz had five sons:

- **Teman**
- **Omar**
- **Zepho**
- **Gatam**
- **Kenaz**

These men became the heads of important Edomite families.

**Teman** later became one of the best-known regions in Edom and was famous for its wise men.

👨‍👦 Eliphaz had five sons

👑 They became leaders of Edomite clans

📍 Teman became a well-known region in Edom

➡️ And Timna Was Concubine…

---

## 👩 And Timna Was Concubine To Eliphaz, Esau's Son

Timna was Eliphaz's **concubine**, meaning she was a secondary wife with a lower social status than a primary wife.

Although her position was different, children born to a concubine were still recognized as members of the family.

👩 Timna was Eliphaz's concubine

👨‍👩‍👦 Her children were recognized as part of the family

➡️ And She Bare To Eliphaz Amalek

---

## 👶 And She Bare To Eliphaz Amalek

Timna gave birth to **Amalek**, making him Esau's grandson.

Amalek became the father of the **Amalekites**, a nation that would become one of Israel's greatest enemies.

From the time of Moses through the days of Saul and David, the Amalekites repeatedly attacked God's people.

This is the first time Amalek is mentioned in the Bible.

👶 Amalek was Esau's grandson

⚔️ His descendants became the Amalekites

📖 This is Amalek's first appearance in Scripture

➡️ These Were The Sons Of Adah, Esau's Wife

---

## 📖 These Were The Sons Of Adah, Esau's Wife

Moses closes this section by identifying the descendants of **Adah**.

Her family line included **Eliphaz** and his descendants, including Amalek.

The chapter will now continue by tracing the descendants of Esau's other sons.

📖 This completes Adah's family line

➡️ Moses now moves to Esau's remaining descendants

# Genesis 36:13–30

# 👑 The Generations Of Esau Continued

---

## 👨‍👦 These Are The Sons Of Reuel

Reuel was one of Esau's sons through **Bashemath**, the daughter of Ishmael.

These men were **Esau's grandsons**:

- Nahath
- Zerah
- Shammah
- Mizzah

Like the other branches of Esau's family, they would eventually become leaders among the Edomites.

👨‍👦 Reuel was Esau's son

👶 These four men were Esau's grandsons

➡️ These Were The Sons Of Bashemath, Esau's Wife

---

## 👩 These Were The Sons Of Bashemath, Esau's Wife

This verse closes the family record of **Bashemath**.

Bashemath was Esau's wife and the daughter of **Ishmael**, making her part of Abraham's family through Hagar.

Her son Reuel became the ancestor of another important branch of the Edomite nation.

👩 Bashemath was Esau's wife

👨 Reuel was her son

🌎 His descendants became Edomite clans

➡️ These Were The Sons Of Aholibamah…

---

## 👩 These Were The Sons Of Aholibamah, The Daughter Of Anah, The Daughter Of Zibeon, Esau's Wife

Aholibamah was another of Esau's wives.

She was the daughter of **Anah** and the granddaughter of **Zibeon the Hivite**.

Her three sons were:

- Jeush
- Jaalam
- Korah

These sons became another branch of Esau's descendants.

👩 Aholibamah was Esau's wife

👦 She had three sons

➡️ These Were Dukes Of The Sons Of Esau

---

## 👑 These Were Dukes Of The Sons Of Esau

The word **duke** does **not** mean a European noble like we think of today.

The Hebrew word means **chief**, **tribal leader**, or **clan leader**.

As Esau's family grew, each major family became its own clan, and each clan had a leader.

That is why the chapter repeatedly says **"Duke Teman," "Duke Omar,"** and so on.

These were the chiefs who led the different Edomite families.

👑 Duke means chief or clan leader

🏕️ Each family branch had its own leader

➡️ The Sons Of Eliphaz…

---

## 👨‍👦 The Sons Of Eliphaz

Eliphaz was Esau's firstborn son.

His sons became chiefs in Edom:

- Teman
- Omar
- Zepho
- Kenaz
- Korah
- Gatam
- Amalek

Several of these names later became the names of regions and clans within Edom.

👨‍👦 Eliphaz's family became chiefs

🌎 Their names became Edomite clans

➡️ These Are The Dukes That Came Of Eliphaz…

---

## 🌎 These Are The Dukes That Came Of Eliphaz In The Land Of Edom

The **land of Edom** was the territory occupied by Esau's descendants.

It centered around **Mount Seir**, south and southeast of the Dead Sea.

Over time, Mount Seir became the heart of the nation of Edom.

This verse is showing that Eliphaz's descendants became leaders within that land.

🌎 Edom was the nation descended from Esau

⛰️ Mount Seir became its homeland

➡️ These Were The Sons Of Adah, Esau's Wife

---

## 👩 These Were The Sons Of Adah, Esau's Wife

This verse finishes the family record of **Adah**.

Adah was Esau's Canaanite wife and the mother of Eliphaz.

Her descendants became one of the largest branches of the Edomite nation.

👩 Adah was Esau's wife

👨 Eliphaz was her son

➡️ These Are The Sons Of Reuel…

---

## 👨‍👦 These Are The Sons Of Reuel, Esau's Son

Reuel's descendants also became chiefs.

The chapter lists:

- Duke Nahath
- Duke Zerah
- Duke Shammah
- Duke Mizzah

Like Eliphaz's family, these men became leaders over their own clans in Edom.

👑 Reuel's sons became clan chiefs

🌎 They ruled different Edomite families

➡️ These Are The Dukes That Came Of Reuel…

---

## 📖 These Are The Dukes That Came Of Reuel In The Land Of Edom

This verse summarizes Reuel's family.

His descendants became another group of chiefs within the nation of Edom.

Each branch of Esau's family developed into its own clan with its own leader.

📖 Reuel's family formed another branch of Edom

👑 Each clan had its own chief

➡️ These Were The Sons Of Bashemath…

---

## 👩 These Were The Sons Of Bashemath, Esau's Wife

Moses closes the record of Bashemath's descendants before moving to Esau's final family branch.

👩 Bashemath's family record is complete

➡️ These Are The Sons Of Aholibamah…

---

## 👩 These Are The Sons Of Aholibamah, Esau's Wife

Aholibamah's sons also became chiefs:

- Duke Jeush
- Duke Jaalam
- Duke Korah

Together with the descendants of Adah and Bashemath, they completed the leadership of the Edomite clans.

👑 Aholibamah's sons became chiefs

🌎 They completed Esau's family branches

➡️ These Are The Sons Of Esau…

---

## 🔴 These Are The Sons Of Esau, Who Is Edom, And These Are Their Dukes

Moses summarizes everything he has listed so far.

Esau, also called **Edom**, became the father of the Edomite nation.

His sons became clans, and those clans were led by chiefs, or **dukes**.

This explains how the nation of Edom was organized from its earliest generations.

🔴 Esau is Edom

👑 His descendants became chiefs of Edom

➡️ These Are The Sons Of Seir The Horite…

---

## ⛰️ These Are The Sons Of Seir The Horite, Who Inhabited The Land

Moses now shifts from Esau's family to the people who already lived in **Mount Seir** before Esau arrived.

**Seir** was a man whose descendants were called the **Horites**.

The **Horites** lived in the mountainous region of Seir before the Edomites settled there.

Later, Esau's descendants became the dominant people in the land, and Mount Seir became known as the land of Edom.

👨 Seir was the ancestor of the Horites

⛰️ The Horites lived in Mount Seir before Esau

🌎 The Edomites later settled and ruled the land

➡️ Lotan, Shobal, Zibeon, Anah, Dishon, Ezer, And Dishan

---

## 👨 Lotan, Shobal, Zibeon, Anah, Dishon, Ezer, And Dishan

These were the seven sons of **Seir the Horite**.

Moses lists them because they were the original family leaders living in Mount Seir before Esau's descendants settled there.

Their descendants are recorded to show the history of the land before it became Edom.

👨 These were Seir's seven sons

⛰️ They were the original Horite family leaders

➡️ These Are The Dukes Of The Horites…

---

## 👑 These Are The Dukes Of The Horites

Like the Edomites, the Horites were organized into clans led by **chiefs**, called **dukes** in the King James Version.

Moses records these leaders because they were the rulers of Mount Seir before the Edomites became established there.

👑 Duke means chief or clan leader

⛰️ The Horites also had tribal leaders

📖 Moses records the early rulers of Mount Seir

➡️ The Children Of Lotan Were Hori And Hemam

---

## 👨 The Children Of Lotan Were Hori And Hemam; And Lotan's Sister Was Timna

Lotan was one of the sons of Seir the Horite.

His sons were **Hori** and **Hemam**.

The Bible also mentions his sister **Timna** because she later became the concubine of **Eliphaz**, Esau's son (Genesis 36:12).

Through Timna, the Horites became connected to Esau's family by marriage.

Timna later gave birth to **Amalek**, making her an important person in the genealogy.

👨 Hori and Hemam were Lotan's sons

👩 Timna was Lotan's sister

🤝 Timna connected the Horites to Esau's family

➡️ The Children Of Shobal…

---

## 👨 The Children Of Shobal Were These; Alvan, Manahath, Ebal, Shepho, And Onam

Shobal was another son of Seir the Horite.

These men were his sons and became heads of their own Horite families.

Moses records their names to show how the Horite people were organized before the Edomites ruled the land.

👨 These were Shobal's sons

🏕️ They became leaders of Horite families

➡️ These Are The Children Of Zibeon…

---

## 👨 And These Are The Children Of Zibeon; Both Ajah, And Anah

Zibeon was another son of Seir.

He had two recorded children:

- **Ajah**
- **Anah**

This **Anah** is the same man mentioned earlier as the father of **Aholibamah**, one of Esau's wives.

That means Esau married into one of the leading Horite families.

👨 Ajah and Anah were Zibeon's sons

👰 Anah later became the father of Esau's wife Aholibamah

➡️ This Was That Anah…

---

## 🌿 This Was That Anah That Found The Mules In The Wilderness, As He Fed The Asses Of Zibeon His Father

This verse identifies Anah by mentioning an event for which he became well known.

The King James Version says Anah **"found the mules"** in the wilderness.

The original Hebrew is difficult to translate.

Many modern Bible translations understand it to mean that Anah discovered **hot springs** in the wilderness rather than mules.

While caring for his father's donkeys, Anah made a discovery that became well known enough for Moses to mention it here.

🌿 Anah became known for an important discovery

📖 The Hebrew may refer to hot springs rather than mules

🐴 He was caring for his father's donkeys when it happened

➡️ The Children Of Anah…

---

## 👨 And The Children Of Anah Were These; Dishon, And Aholibamah The Daughter Of Anah

Anah had at least two recorded children:

- **Dishon**
- **Aholibamah**

Aholibamah later became one of Esau's wives.

This reminds the reader once again that Esau married into the Horite families living in Mount Seir.

👨 Dishon was Anah's son

👰 Aholibamah became Esau's wife

➡️ These Are The Children Of Dishon…

---

## 👨 And These Are The Children Of Dishon; Hemdan, Eshban, Ithran, And Cheran

Dishon was one of Anah's sons.

His four sons became another branch of the Horite families living in Mount Seir.

Like the other genealogies, Moses is recording the major family lines of the people who originally lived in the land.

👨 These were Dishon's sons

🏕️ They formed another Horite family branch

➡️ The Children Of Ezer…

---

## 👨 The Children Of Ezer Are These; Bilhan, Zaavan, And Akan

Ezer was another son of Seir.

His three sons became additional Horite family leaders.

Their descendants helped make up the Horite population before the Edomites became the dominant nation in the land.

👨 These were Ezer's sons

🏕️ They became Horite family leaders

➡️ The Children Of Dishan…

---

## 👨 The Children Of Dishan Are These; Uz, And Aran

Dishan was another son of Seir.

His sons were:

- Uz
- Aran

Like the other descendants of Seir, they became heads of Horite families living in Mount Seir.

👨 Uz and Aran were Dishan's sons

🏕️ They became part of the Horite clans

➡️ These Are The Dukes That Came Of The Horites

---

## 👑 These Are The Dukes That Came Of The Horites

Moses now summarizes the Horite leaders:

- Duke Lotan
- Duke Shobal
- Duke Zibeon
- Duke Anah
- Duke Dishon
- Duke Ezer
- Duke Dishan

The word **duke** means **chief**, **tribal leader**, or **clan leader**.

Each of these men led one of the major Horite clans before the Edomites ruled the land.

👑 Duke means chief or clan leader

🏕️ These men led the Horite clans

➡️ According To Their Dukes In The Land Of Seir

---

## ⛰️ According To Their Dukes In The Land Of Seir

Before Esau's descendants settled in Mount Seir, the land was already organized under Horite clan leaders.

As Esau's family grew and became the nation of Edom, they eventually replaced the Horites as the dominant people of the region.

Moses includes this history to explain who originally lived in Mount Seir before it became the homeland of the Edomites.

⛰️ Mount Seir was first inhabited by the Horites

👑 The Horites were organized under clan chiefs

🌎 The Edomites later became the ruling nation in the land

# Genesis 36:31–39

# 🏛️ The Kings Of Edom

---

## 👑 And These Are The Kings That Reigned In The Land Of Edom

Moses now shifts from the family leaders, or **dukes**, to the **kings** who ruled Edom.

A **duke** was the chief or leader of a single clan or tribe.

A **king** ruled over the entire nation, governing all the clans together.

This shows that the nation of Edom had grown from individual family groups into an organized kingdom.

👑 Dukes ruled individual clans

🏛️ Kings ruled the entire nation of Edom

➡️ Before There Reigned Any King Over The Children Of Israel

---

## 📖 Before There Reigned Any King Over The Children Of Israel

This tells us that **Edom became a kingdom before Israel did**.

Esau's descendants organized themselves under kings long before Israel had kings like Saul, David, or Solomon.

Although Esau's descendants became a powerful nation, God's covenant promises did not pass through Esau.

God chose **Jacob (Israel)** to be the father of the covenant nation through whom the Messiah would come.

Even so, God still blessed Esau by making him into a great nation, just as He had promised.

📖 Edom had kings before Israel

👨 Jacob became the father of Israel

🔴 Esau became the father of the nation of Edom

🙏 God blessed both brothers, but His covenant continued through Jacob

➡️ Bela The Son Of Beor Reigned In Edom

---

## 👑 And Bela The Son Of Beor Reigned In Edom

Bela is the first king of Edom mentioned in the Bible.

The Bible does not tell us how he became king or how long he ruled.

His name marks the beginning of Edom's line of kings.

This **Beor** should not be confused with the father of Balaam in the book of Numbers. The Bible does not identify them as the same person.

👑 Bela was Edom's first recorded king

📖 Little else is known about him

➡️ The Name Of His City Was Dinhabah

---

## 🏙️ And The Name Of His City Was Dinhabah

Dinhabah was the city from which Bela ruled.

Unlike Israel, which was not yet a kingdom, Edom was already organized into cities under a central ruler.

The Bible does not tell us exactly where Dinhabah was located, and its location has been lost to history.

Just as **Canaan** was a region containing many cities, **Edom** was also a region with several cities ruled by its kings.

🏙️ Dinhabah was Bela's royal city

🌎 Edom was a region made up of several cities

➡️ Bela Died…

---

## 👑 And Bela Died, And Jobab The Son Of Zerah Of Bozrah Reigned In His Stead

After Bela died, **Jobab** became the next king.

Jobab was the son of **Zerah** and came from the city of **Bozrah**.

Bozrah later became one of the most important cities in Edom and is mentioned many times by the prophets.

The phrase **"reigned in his stead"** means Jobab succeeded Bela as king.

👑 Jobab became the next king

🏙️ He came from Bozrah

➡️ Jobab Died…

---

## 👑 And Jobab Died, And Husham Of The Land Of Temani Reigned In His Stead

After Jobab died, **Husham** became king.

He came from the land of the **Temanites**, a region within Edom.

Teman later became famous for its wise men.

The prophets Jeremiah and Obadiah both mention the wisdom of Teman.

👑 Husham became the next king

📍 He came from the region of Teman

🧠 Teman later became known for its wise men

➡️ Husham Died…

---

## ⚔️ And Husham Died, And Hadad The Son Of Bedad, Who Smote Midian In The Field Of Moab, Reigned In His Stead

After Husham died, **Hadad**, the son of **Bedad**, became king.

The Bible tells us that Hadad **"smote Midian,"** meaning he defeated the Midianites in battle.

The **Midianites** were descendants of **Midian**, one of Abraham's sons through Keturah after Sarah died.

The battle took place in the **field of Moab**, the territory belonging to the nation of Moab, descendants of Lot.

This verse highlights Hadad's military success, showing that he was known as a victorious king.

⚔️ "Smote" means defeated in battle

👑 Hadad became king after Husham

🛡️ He defeated the Midianites in the land of Moab

➡️ The Name Of His City Was Avith

---

## 🏙️ And The Name Of His City Was Avith

Avith was the city associated with King Hadad.

Like many of the cities listed in this chapter, its exact location is unknown today.

It was one of the cities within the kingdom of Edom.

🏙️ Avith was Hadad's city

🌎 It was located within Edom

➡️ Hadad Died…

---

## 👑 And Hadad Died, And Samlah Of Masrekah Reigned In His Stead

When Hadad died, **Samlah** became king.

He came from **Masrekah**, another city in Edom.

The Bible records his hometown but gives no additional details about his reign.

👑 Samlah became king

🏙️ He came from Masrekah

➡️ Samlah Died…

---

## 👑 And Samlah Died, And Saul Of Rehoboth By The River Reigned In His Stead

After Samlah died, **Saul** became king.

This is **not** King Saul of Israel.

This Saul ruled Edom many years before Israel's first king.

He came from **Rehoboth by the River**, likely a town located near a major river, though its exact location is uncertain.

The phrase helps distinguish this Rehoboth from other places with the same name.

👑 This is not Israel's King Saul

🏙️ He came from Rehoboth by the River

➡️ Saul Died…

---

## 👑 And Saul Died, And Baal-hanan The Son Of Achbor Reigned In His Stead

After Saul died, **Baal-hanan**, the son of **Achbor**, became king.

The Bible records his family line but gives no additional details about his reign.

Like the kings before him, he ruled over the nation of Edom.

👑 Baal-hanan became the next king

📖 Little else is known about him

➡️ Baal-hanan Died…

---

## 👑 And Baal-hanan The Son Of Achbor Died, And Hadar Reigned In His Stead

Hadar became the next recorded king of Edom.

Unlike the earlier kings, the Bible gives additional information about his city and even his wife.

This suggests Hadar may have been especially well known when these records were preserved.

👑 Hadar became the next king

📖 More family details are given than for earlier kings

➡️ The Name Of His City Was Pau

---

## 🏙️ And The Name Of His City Was Pau

Pau was the city from which Hadar ruled.

Like many ancient Edomite cities, its exact location is unknown today.

It was one of the royal cities within the kingdom of Edom.

🏙️ Pau was Hadar's royal city

🌎 It was located within Edom

➡️ His Wife's Name Was Mehetabel

---

## 👩 And His Wife's Name Was Mehetabel, The Daughter Of Matred, The Daughter Of Mezahab

Unlike the other kings in this chapter, Hadar's wife is named.

Her name was **Mehetabel**, and Moses also records her father, **Matred**, and her grandfather, **Mezahab**.

The Bible does not explain why her family is mentioned.

Listing her ancestry may indicate that she came from a respected or influential family within Edom.

This kind of detail was often included in ancient genealogies to identify important family connections.

👩 Mehetabel was Hadar's wife

👨 Her father was Matred

👴 Her grandfather was Mezahab

📖 Her family lineage was important enough for Moses to record

# Genesis 36:40–43

# 🏞️ The Dukes Of Edom

---

## 👑 And These Are The Names Of The Dukes That Came Of Esau

Earlier in the chapter, Moses listed the **dukes**, or clan chiefs, according to the different branches of Esau's family, such as the descendants of Eliphaz, Reuel, and Aholibamah.

Here, Moses summarizes the leadership of the nation another way.

Instead of grouping the dukes by their fathers, he lists them according to the territories and clans they governed.

This shows how Esau's descendants grew from one family into an organized nation with different regions, each led by its own chief.

👑 The earlier list grouped the dukes by family

🗺️ This list groups them by the territories they ruled

🌎 Edom had become an organized nation

➡️ According To Their Families…

---

## 🏡 According To Their Families, After Their Places, By Their Names

Each duke ruled over a particular family, clan, and region.

The phrases **"according to their families," "after their places,"** and **"by their names"** show that every clan had its own territory and its own leader.

This was the political organization of the nation of Edom.

Rather than one chief ruling every village, each region had its own clan leader under the kingdom of Edom.

🏡 Each clan had its own territory

👑 Every region had its own chief

🗺️ Edom was organized into family territories

➡️ Duke Timna…

---

## 👑 Duke Timna, Duke Alvah, Duke Jetheth

These were three of the clan chiefs who governed different parts of Edom.

The Bible gives their names to preserve the official leadership of the nation.

Although little else is known about these men, they were recognized as leaders among the Edomites.

👑 These men were Edomite clan chiefs

📖 Their names preserve Edom's leadership

➡️ Duke Aholibamah…

---

## 👑 Duke Aholibamah, Duke Elah, Duke Pinon

These chiefs ruled additional Edomite clans.

Their names show that Esau's descendants had spread throughout the land and established many family territories.

👑 More clan leaders are listed

🌎 Edom continued to grow into a large nation

➡️ Duke Kenaz…

---

## 👑 Duke Kenaz, Duke Teman, Duke Mibzar

Kenaz and Teman were already associated with earlier family lines in the chapter.

**Teman** became one of the most important regions of Edom and was later known for its wise men.

Mibzar is mentioned only here, but it was likely another Edomite district or clan.

👑 These chiefs governed important Edomite regions

📍 Teman later became famous throughout the Old Testament

➡️ Duke Magdiel…

---

## 👑 Duke Magdiel, Duke Iram

These are the final two dukes listed in Genesis.

Together with the others, they complete the record of Edom's clan leaders.

By this point, Esau's descendants had become a well-established nation with many leaders and territories.

👑 These complete the list of Edomite chiefs

🌎 Edom had become a fully organized nation

➡️ These Be The Dukes Of Edom…

---

## 🏞️ These Be The Dukes Of Edom, According To Their Habitations In The Land Of Their Possession

The word **"habitations"** refers to the places where the Edomites lived.

The **"land of their possession"** means the territory they owned and controlled.

Unlike earlier in Genesis, when Esau was still living among the Canaanites, the Edomites now possessed their own homeland in **Mount Seir**.

Each duke governed the people living within his own territory.

🏞️ Habitations means the places where they lived

🌎 The land of their possession was Edom in Mount Seir

👑 Each duke ruled his own territory

➡️ He Is Esau, The Father Of The Edomites

---

## 🔴 He Is Esau, The Father Of The Edomites

Genesis closes Esau's family record by reminding us that Esau became the father of the **Edomites**.

Although the Bible focuses mainly on Jacob's descendants because God's covenant continued through Israel, Esau also became the father of a strong and influential nation.

The Edomites occupied the mountainous region of **Mount Seir**, south and southeast of the Dead Sea. Throughout the Old Testament they were neighbors of Israel and often came into conflict with them.

The Bible does not tell us exactly how large the Edomite population became, but by the time Israel left Egypt, Edom was already an established kingdom with kings, cities, territorial chiefs, and enough military strength that Israel asked permission to pass through their land instead of trying to fight them (Numbers 20). This shows they had grown into a significant regional power.

🔴 Esau became the father of the Edomites

⛰️ The Edomites settled in Mount Seir

👑 They developed into a kingdom with kings, cities, and clan chiefs

⚔️ They became one of Israel's strongest neighboring nations`;

export const GENESIS_THIRTY_SIX_PERSONAL_SECTIONS = parseGenesisThirtySixRawNotes(GENESIS_THIRTY_SIX_RAW_NOTES);
