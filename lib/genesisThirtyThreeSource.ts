export type GenesisThirtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtyThreeRawNotes(rawText: string): GenesisThirtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+33:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 33 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+33:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+33:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 33 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 33,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 33:${startVerse}` : `Genesis 33:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Genesis 33 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_THREE_RAW_NOTES = `# Genesis 33:1–16

# 🤗 Jacob And Esau Meet

---

## 👀 Jacob Lifted Up His Eyes… And Behold, Esau Came

After twenty years away from home, the moment Jacob had feared finally arrives.

The night before, Jacob wrestled with God.

God changed his name from **Jacob** to **Israel**, marking the beginning of a new life.

Now, as morning comes, Jacob looks up and sees Esau approaching with **400 men**.

The last time Jacob saw Esau, his brother wanted to kill him for taking the blessing.

Jacob has spent twenty years wondering if that anger still remained.

Now the moment of truth has arrived.

👀 Jacob finally sees Esau

⏳ Twenty years have passed since they last met

⚔️ Esau still arrives with 400 men

🙏 God has already prepared Jacob for this moment

➡️ Jacob arranges his family

---

## 👨‍👩‍👧 He Divided The Children Unto Leah… Rachel… And The Two Handmaids

Jacob arranges his family into groups.

The **two handmaids** are:

- 👩 Bilhah (Rachel's maid)
- 👩 Zilpah (Leah's maid)

Years earlier, both women became Jacob's wives according to the customs of that time and each bore him children.

Jacob is organizing everyone before meeting Esau.

👩 Bilhah and Zilpah are Jacob's wives

👶 Each has children with Jacob

🏕️ Jacob carefully arranges the family

➡️ Rachel is placed last

---

## 🛡️ He Put The Handmaids… Then Leah… Then Rachel And Joseph Hindermost

Jacob places the handmaids and their children first.

Leah and her children come behind them.

Rachel and Joseph are placed last.

This was the safest position.

If Esau attacked from the front, Rachel and Joseph would have the greatest protection.

The Bible simply records what Jacob did.

It also shows that Rachel remained the wife Jacob loved most.

🛡️ Rachel and Joseph receive the greatest protection

❤️ Rachel is still Jacob's beloved wife

➡️ Jacob goes ahead alone

---

## 🙇 He Passed Over Before Them… And Bowed Himself To The Ground Seven Times

Jacob walks **ahead of everyone else**.

Instead of hiding behind his family, he places himself between Esau and those he loves.

As he approaches, he bows to the ground **seven times**.

Seven bows showed great humility and respect before an important person.

Jacob is not crawling the whole way.

He walks forward, bows deeply, gets up, walks farther, and bows again until he reaches Esau.

This is a public display of humility.

🙇 Jacob goes first

🛡️ He places himself before his family

🙏 Seven bows show great humility

➡️ Esau responds

---

## 🤗 Esau Ran To Meet Him

Everything changes in one moment.

Instead of attacking…

Esau **runs** toward Jacob.

In the ancient world, powerful men usually did not run.

Esau runs because he wants to reach his brother.

He embraces Jacob.

Falls on his neck.

Kisses him.

Then both brothers begin to cry.

God answered Jacob's prayer.

The brother Jacob feared for twenty years welcomes him with love instead of violence.

This is one of the greatest moments of reconciliation in Genesis.

🤗 Esau runs to Jacob

🫂 The brothers embrace

😭 Both men weep together

🙏 God turns fear into peace

➡️ Esau meets Jacob's family

---

## 👨‍👩‍👧 Who Are These With Thee?

Esau now notices the large family behind Jacob.

He asks,

**"Who are these?"**

Jacob answers,

**"The children whom God has graciously given thy servant."**

Even though Esau has already welcomed him, Jacob continues speaking humbly by calling himself **"thy servant."**

Instead of taking credit for his family, Jacob gives God the glory.

👨‍👩‍👧 Esau asks about Jacob's family

🙏 Jacob credits God for his children

🙇 Jacob continues speaking humbly

➡️ The family greets Esau

---

## 🙇 The Handmaids… Leah… Rachel… And Joseph Bowed Themselves

Each group approaches Esau one after another.

First Bilhah and Zilpah with their children.

Then Leah and her children.

Finally Rachel and Joseph.

Each group bows before Esau as a sign of respect.

The careful order Jacob established earlier is now carried out.

🙇 Each family group greets Esau

❤️ Rachel and Joseph come last

➡️ Esau asks about the gifts

---

## 🎁 What Meanest Thou By All This Drove?

A **drove** is a herd or group of animals.

Esau is asking,

**"What was all that livestock I met on the way?"**

He is referring to the many herds Jacob sent ahead as gifts.

Jacob answers,

**"To find grace in the sight of my lord."**

In other words,

**"I wanted to show you honor and seek your favor before we met."**

🎁 Drove means herd of animals

❤️ The gifts were meant to make peace

➡️ Esau refuses the gift

---

## 💰 I Have Enough, My Brother

Esau surprises Jacob again.

He says,

**"I have enough."**

Years earlier, Isaac blessed Esau as well.

Although Jacob received the covenant promises, Esau also became prosperous.

He had servants, livestock, and enough influence to travel with four hundred men.

Esau is not looking for Jacob's wealth.

He has been blessed too.

💰 Esau has become wealthy

🙏 God blessed Esau in his own way

➡️ Jacob insists

---

## ❤️ Receive My Present At My Hand

Jacob continues urging Esau to accept the gift.

For Jacob, this is more than giving away livestock.

Accepting the gift would show that Esau truly forgives him.

In the ancient world, accepting a gift often confirmed that peace had been restored between two people.

❤️ Jacob wants reconciliation

🤝 Accepting the gift confirms peace

➡️ Jacob compares Esau's face to God's

---

## 😊 I Have Seen Thy Face, As Though I Had Seen The Face Of God

Jacob is **not** saying Esau is God.

The night before, Jacob met God at Peniel and received mercy instead of judgment.

Now he expected judgment from Esau…

Instead, he received mercy again.

Seeing Esau welcome him peacefully reminded Jacob of the grace God had just shown him.

😊 Jacob receives unexpected mercy

🙏 God's grace is reflected in Esau's forgiveness

➡️ Esau accepts the gift

---

## 🎁 He Urged Him, And He Took It

Jacob continues insisting until Esau finally accepts the gift.

By receiving it, Esau shows that the relationship has been restored.

The gift is no longer about livestock.

It becomes a symbol of forgiveness.

🎁 Esau accepts Jacob's gift

🤝 Peace is fully restored

➡️ Esau offers to travel together

---

## 🚶 Let Us Take Our Journey Together

Esau invites Jacob to travel with him.

He even offers to go ahead and lead the way.

Jacob politely declines.

His children are young.

Many of the animals are nursing their young.

Large flocks could not keep the pace of four hundred men.

If they traveled too quickly, the weaker animals could die.

Jacob is not making excuses.

He is protecting the people and animals under his care.

🚶 Esau invites Jacob to travel together

👶 The children are still very young

🐑 The flocks need a slower pace

➡️ Esau offers protection

---

## 🛡️ Let Me Leave With Thee Some Of The Folk That Are With Me

Esau offers to leave some of his four hundred men behind to escort Jacob.

This was a generous offer.

It would provide protection for Jacob's family on the journey.

Jacob politely refuses.

He says,

**"What needeth it?"**

In other words,

**"There is no need."**

Jacob has already received what he wanted—Esau's favor.

He does not need an armed escort because God has already protected him.

🛡️ Esau offers an escort

🙏 Jacob politely declines

❤️ God's protection is enough

➡️ The brothers separate peacefully

---

## 🏔️ Esau Returned That Day Unto Seir

Esau returns to **Seir**, the mountainous region where he had settled and where the nation of **Edom** would later grow.

Jacob continues his own journey toward Canaan.

For twenty years, Jacob feared this meeting.

Instead of ending in violence…

It ends in forgiveness.

The chapter closes with two brothers parting in peace after God completely transformed the situation Jacob had feared most.

# Genesis 33:17–20

# 🏠 Jacob Reaches Canaan

---

## 🏠 Jacob Journeyed To Succoth… And Built Him An House

After peacefully separating from Esau, Jacob continues his journey.

He comes to a place called **Succoth**.

Unlike Abraham and Isaac, who are usually described as living in tents, Jacob **builds a house** here.

This suggests he planned to stay for a period of time rather than simply passing through.

He also makes **booths** for his livestock.

A booth was a simple shelter made from branches, wood, or other natural materials to protect animals from the sun and weather.

Because Jacob built these booths, the place became known as **Succoth**, a Hebrew word meaning **"booths"** or **"shelters."**

Although Jacob builds a house, he does not settle there permanently. God had promised him the land of Canaan, so this was only another stop along his journey.

🏠 Jacob builds a house, showing a temporary settlement

🐑 Booths are simple shelters for livestock

📖 Succoth means "booths" or "shelters"

➡️ Jacob continues into Canaan

---

## 🏙️ Jacob Came To Shalem, A City Of Shechem

Jacob eventually arrives in the land of **Canaan**, the land God promised to Abraham's descendants.

The verse says he came to **Shalem**, a city associated with **Shechem**.

A simple way to picture it is:

- 🌍 **Canaan** = the land (like a country or region)
- 🗺️ **Shechem** = the surrounding area or district
- 🏙️ **Shalem** = the city where Jacob arrived

The Bible also reminds us that Jacob came from **Padan-aram**, the region where he had lived with his uncle Laban for about twenty years.

Jacob has finally returned from his long exile.

He pitches his tent outside the city, showing that although he has entered Canaan, he is still living as a traveler.

🌍 Jacob returns to the Promised Land

🏙️ Shalem is a city near Shechem

🏡 Padan-aram was Laban's homeland

⛺ Jacob pitches his tent outside the city

➡️ Jacob purchases land

---

## 💰 He Bought A Parcel Of A Field

A **parcel** is simply a piece of land.

Jacob purchases the land where he had set up his tents.

The field is bought from the **children of Hamor**.

**Hamor** was the father of **Shechem**, the local ruler after whom the area was named.

Buying the land gave Jacob a lawful place to live instead of simply camping on someone else's property.

The price was **one hundred pieces of money**.

The Bible does not tell us exactly what type of money this was. In the ancient world, people often used pieces of silver or weighed-out metal as payment long before coins were invented.

This purchase is significant because it becomes one of the first pieces of the Promised Land legally owned by Jacob's family.

💰 Parcel means a piece of land

👨 Hamor was Shechem's father

🤝 Jacob legally purchases the property

📖 One hundred pieces of money was the purchase price

➡️ Jacob worships God

---

## ⛪ He Erected There An Altar, And Called It El-Elohe-Israel

After arriving safely in Canaan, Jacob's first recorded act is to worship God.

He builds an **altar**, a place dedicated to sacrifice and worship.

He names it **El-Elohe-Israel**, which means:

**"God, the God of Israel."**

This is deeply significant.

Only a short time earlier, God had changed Jacob's name to **Israel** after wrestling with him.

By giving the altar this name, Jacob publicly acknowledges that the God who protected him throughout his journey is now **his God**.

The man once known as Jacob the deceiver now openly worships as **Israel**, the one whom God transformed.

The chapter closes not with fear…

but with worship.

⛪ Jacob builds an altar to worship God

🙏 El-Elohe-Israel means "God, the God of Israel"

📖 Jacob publicly honors the God who changed his life

❤️ The chapter ends with worship instead of fear`;

export const GENESIS_THIRTY_THREE_PERSONAL_SECTIONS = parseGenesisThirtyThreeRawNotes(GENESIS_THIRTY_THREE_RAW_NOTES);
