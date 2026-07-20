export type GenesisTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisTwentyThreeRawNotes(rawText: string): GenesisTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const sectionMatch = lines[index].trim().match(
      /^#\s*(?:\*\*)?(.*?Genesis\s+23:(\d+)(?:[-–—]|â€“|â€”)?(\d+)?)\s*(?:\*\*)?\s*$/i,
    );

    if (!sectionMatch) {
      index += 1;
      continue;
    }

    const icon = sectionMatch[1].replace(/Genesis\s+23:.+$/i, "").replace(/\*\*/g, "").trim();
    const startVerse = Number(sectionMatch[2]);
    const endVerse = Number(sectionMatch[3] || sectionMatch[2]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const sectionTitleMatch =
      lines[index]?.trim().match(/^#+\s*(?:\*\*)?(.+?)(?:\*\*)?$/) || lines[index]?.trim().match(/^\*\*(.+?)\*\*$/);
    if (!sectionTitleMatch) {
      throw new Error("Missing Genesis 23 section title after verse " + startVerse);
    }
    const title = sectionTitleMatch[1].trim();
    index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+/.test(lines[index].trim())) {
      const trimmed = lines[index].trim();
      const phraseMatch = trimmed.match(/^###\s+(.+)$/) || trimmed.match(/^\*\*(.+?)\*\*$/);

      if (!phraseMatch) {
        index += 1;
        continue;
      }

      const phraseTitle = phraseMatch[1].trim();
      index += 1;
      const bodyLines: string[] = [];

      while (
        index < lines.length &&
        !/^###\s+/.test(lines[index].trim()) &&
        !/^#\s+/.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 23 explanation for " + phraseTitle);
      }

      phrases.push([phraseTitle, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference:
        startVerse === endVerse
          ? "Genesis 23:" + startVerse
          : "Genesis 23:" + startVerse + "-" + endVerse,
      title,
      icon,
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Genesis 23 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_TWENTY_THREE_RAW_NOTES = `# Genesis 23:1–2

## 💔 The Death Of Sarah

### ⏳ Sarah Was An Hundred And Seven And Twenty Years Old

Sarah lived **127 years**.

She was **90 years old** when Isaac was born (Genesis 17:17; 21:5–7).

Since she dies at 127, Isaac is now **37 years old**.

This also means Abraham is about **137 years old**, since he was ten years older than Sarah.

Sarah is the **only woman in the Bible whose age at death is specifically recorded**, showing her importance in God's plan.

⏳ Sarah lived 127 years

👶 Isaac is now about 37 years old

👴 Abraham is about 137 years old

⭐ Sarah is the only woman in Scripture whose age at death is recorded

➡️ Moses closes the story of Sarah's life

---

### 📖 These Were The Years Of The Life Of Sarah

This is Moses' way of bringing Sarah's life story to its conclusion.

He is saying,

**"These are the complete years that Sarah lived."**

Her life is now finished, but God's covenant continues through Isaac.

📖 Sarah's life has come to an end

🙏 God's promises continue through Isaac

➡️ Sarah dies

---

### 🏙️ Sarah Died In Kirjath Arba (The Same Is Hebron) In The Land Of Canaan

**Kirjath Arba** was the older name of the city later known as **Hebron**.

It was located in the hill country of **Canaan**, about **20 miles (32 km) south of Jerusalem**.

Abraham had lived near Hebron for many years, especially around the **oaks of Mamre**.

This is the place where Sarah dies after spending decades following Abraham throughout the Promised Land.

🏙️ Kirjath Arba was later called Hebron

📍 Hebron is in southern Canaan

🏕️ Abraham and Sarah had lived there for many years

➡️ Abraham grieves for Sarah

---

### 😢 Abraham Came To Mourn For Sarah

To **mourn** means much more than simply feeling sad.

In the ancient Near East, mourning was a public expression of deep grief.

It often included:

- Crying openly
- Wearing rough sackcloth instead of normal clothing
- Sitting on the ground in ashes
- Fasting for a period of time
- Family and friends gathering to comfort those who were grieving

This was not a brief moment of sadness.

It was a season of honoring the person who had died.

Sarah had been Abraham's wife for many decades.

They had left Haran together, traveled through Canaan together, endured famine, waited decades for Isaac, and experienced God's promises side by side.

Now Abraham must continue without her.

😢 Mourning was a public expression of grief

🧎 It often included crying, sackcloth, ashes, and fasting

❤️ Abraham had spent most of his life with Sarah

➡️ Abraham weeps

---

### 😭 And To Weep For Her

To **weep** means to cry deeply and uncontrollably.

This was not simply shedding a few tears.

Abraham openly grieved the loss of the woman who had shared nearly every major event of his life.

The Bible does not criticize Abraham for weeping.

His sorrow reminds us that even people with great faith experience deep pain when they lose someone they love.

Faith does not remove grief.

It gives hope in the middle of grief.

😭 Weeping is deep, heartfelt crying

💔 Abraham truly loved Sarah

🙏 God allows His people to grieve

❤️ Faith and sorrow can exist together

---

# Genesis 23:3–18

## 🪦 Abraham Purchases Machpelah

### 🚶 Abraham Stood Up From Before His Dead

"Before his dead" means Abraham had been sitting beside Sarah's body, mourning her death.

After spending time grieving and weeping, he finally stands up to take care of the responsibility of burying his wife.

Even in the middle of great sorrow, life still had to move forward.

🚶 Abraham had been mourning beside Sarah's body

💔 He now begins making burial arrangements

➡️ Abraham speaks to the people of the land

---

### 🗣️ And Spake Unto The Sons Of Heth

The **sons of Heth** were the descendants of **Heth**, one of the sons of **Canaan**, who was the son of **Ham**, one of Noah's three sons (Genesis 10).

These descendants became known as the **Hittites**, one of the Canaanite peoples living in the Promised Land.

Although God had promised Abraham all of Canaan, the Hittites legally owned this area at the time.

🗣️ Heth was the son of Canaan

🌍 Canaan was the son of Ham, Noah's son

🏕️ The sons of Heth became the Hittites

📍 They owned the land around Hebron

➡️ Abraham makes a request

---

### 🌍 I Am A Stranger And A Sojourner With You

A **stranger** was someone who was not a citizen of the land.

A **sojourner** was someone living there temporarily without owning property.

Abraham reminds them that although he had lived among them for many years, he still did not own any land.

Now, after Sarah's death, he realizes he doesn't even own a place to bury his wife.

This shows that Abraham was still living by faith, trusting God's promise even before receiving it.

🌍 Abraham was not a citizen of Canaan

🏕️ He lived there as a temporary resident

🙏 He still trusted God's promise

➡️ Abraham asks to purchase land

---

### 🪦 Give Me A Possession Of A Burying Place With You

Abraham asks to buy a permanent burial place.

He is not asking for a favor or borrowing someone's tomb.

He wants land that legally belongs to his family forever.

Ironically, the very first piece of the Promised Land Abraham owns is a burial place for Sarah.

🪦 Abraham wants to purchase land

📜 He wants permanent ownership

⭐ This becomes Abraham's first possession in Canaan

➡️ Abraham explains why

---

### ❤️ That I May Bury My Dead Out Of My Sight

Abraham is not saying he wants to forget Sarah.

He simply means her body cannot remain unburied.

In the ancient world, people were normally buried very soon after death.

Abraham wants to give Sarah an honorable burial.

❤️ Abraham wants to bury Sarah respectfully

🪦 Burial usually took place quickly

💔 His grief now turns into responsibility

➡️ The Hittites answer

---

### 👑 Hear Us, My Lord…Thou Art A Mighty Prince Among Us

"My lord" was a respectful title, similar to saying **"sir."**

The Hittites call Abraham **"a mighty prince"** because they have watched God bless him.

Over the years Abraham had become extremely wealthy, commanded hundreds of trained servants, defeated powerful kings, made peace with neighboring rulers, and earned the respect of everyone around him.

Even people who did not worship Abraham's God recognized that God was with him.

👑 "My lord" is a title of respect

⭐ Abraham is honored by the people

🙏 They recognize God's blessing on his life

➡️ They offer him a burial place

---

### 🪦 In The Choice Of Our Sepulchers Bury Thy Dead…None Of Us Shall Withhold From Thee His Sepulcher

A **sepulcher** is a **burial tomb or burial cave** carved into the rock where people buried their family members.

The Hittites tell Abraham,

**"Choose whichever family tomb you want."**

They are even willing to let Sarah be buried in one of their own family burial places.

When they say,

**"None of us shall withhold from thee his sepulcher,"**

they mean,

**"No one will refuse you. Every family here would gladly let you use their burial cave."**

This shows the tremendous respect Abraham had earned among the people.

🪦 A sepulcher is a family burial cave or tomb

🤝 The Hittites offer Abraham any of their family tombs

❤️ No one refuses his request

⭐ Abraham has earned great respect among the people

➡️ Abraham responds respectfully

---

### 🙇 Abraham Stood Up And Bowed Himself To The People Of The Land

Although Abraham is God's chosen servant, he remains humble.

He bows before the Hittites as a sign of gratitude and respect.

Humility was an important part of ancient negotiations.

🙇 Abraham shows humility

🤝 He honors the people of the land

➡️ Abraham continues the discussion

---

### 💬 He Communed With Them

**Communed** simply means **he spoke or discussed the matter with them.**

Abraham respectfully continues the conversation because he has one specific burial place in mind.

💬 Communed means discussed together

🤝 Abraham begins negotiating

➡️ Abraham requests a specific cave

---

### 🙏 If It Be Your Mind…Hear Me, And Entreat For Me To Ephron The Son Of Zohar

**"If it be your mind"** means,

**"If you are willing."**

**Entreat** means to **ask or speak to someone on another person's behalf.**

Abraham asks the Hittites to speak with **Ephron**, the owner of the land, so they can arrange the purchase.

🙏 Abraham respectfully asks for their help

👤 Ephron owns the property

🤝 The people serve as witnesses

➡️ Abraham names the cave

---

### 🏞️ That He May Give Me The Cave Of Machpelah

Abraham specifically asks to buy the **Cave of Machpelah**, located at the edge of Ephron's field.

He wants a permanent family burial place.

This cave will later become the burial place of **Sarah, Abraham, Isaac, Rebekah, Jacob, and Leah.**

Although Abraham did not know everyone who would eventually be buried there, he was establishing a permanent resting place for God's covenant family.

🏞️ Machpelah becomes the family burial place

🪦 Sarah, Abraham, Isaac, Rebekah, Jacob, and Leah are buried there

📜 Abraham wants permanent ownership

➡️ Abraham offers to pay full price

---

### 💰 For As Much Money As It Is Worth

Abraham insists on paying the full value.

He refuses to accept the land as a gift.

By purchasing it legally, no one could later claim that the burial place did not belong to his family.

💰 Abraham insists on paying full price

📜 He wants unquestioned legal ownership

➡️ Ephron responds

---

### 👤 Ephron Dwelt Among The Children Of Heth…In The Audience Of All That Went In At The Gate Of His City

Ephron is present among the Hittites during the public meeting.

The **city gate** served as the city's courtroom, town hall, and business center.

Legal agreements were made there in front of witnesses.

Everything taking place here is being witnessed publicly, making the future sale official and legally recognized.

👤 Ephron is present

🚪 The city gate is where legal business was conducted

👥 The community witnesses the agreement

➡️ Ephron makes his offer

---

### 🎁 Nay, My Lord…The Field Give I Thee, And The Cave That Is Therein, I Give It Thee

Ephron publicly offers both the field and the cave to Abraham as a gift.

This generosity shows the incredible respect Abraham had earned over the years.

His integrity, kindness, military victories, great wealth, and the obvious blessing of God had made him one of the most respected men in the entire region.

Even so, Abraham will refuse the gift because he wants the land to belong to his family forever through a legal purchase.

🎁 Ephron offers the field and cave as a gift

👑 Abraham's reputation earns great respect

📜 Abraham will insist on buying it legally

➡️ Sarah's burial place becomes Abraham's first possession in the Promised Land

---

### 🙇 Abraham Bowed Down Himself Before The People Of The Land

Before continuing the negotiation, Abraham bows once again before the Hittites.

This shows his humility and respect.

Even though everyone highly respected Abraham, he never acted prideful or demanded special treatment.

🙇 Abraham remains humble

🤝 He shows respect to the people

➡️ Abraham insists on paying

---

### 💰 If Thou Wilt Give It, I Pray Thee, Hear Me…I Will Give Thee Money For The Field

Abraham politely refuses to accept the field as a gift.

This fits Abraham's character throughout Genesis.

Years earlier, after rescuing Lot and defeating the kings, the king of Sodom offered Abraham all the spoils of war.

Abraham refused because he never wanted anyone to say,

**"I made Abraham rich."**

He trusted God to provide everything he needed.

He was the kind of man who didn't want anyone to be able to say he owed them a favor or that his blessings came from someone else.

The same principle applies here.

He wants to own the land honestly by paying for it himself.

That way, no one could ever claim the land back or say it had only been borrowed.

💰 Abraham refuses a free gift

🙏 He trusts God alone to provide

📜 He wants permanent legal ownership

➡️ Abraham explains why

---

### 🪦 I Will Bury My Dead There

Abraham plans to use this cave as his family's permanent burial place.

After purchasing the land, Sarah would be carefully placed inside the cave, and the entrance would likely be closed with a large stone to protect it.

This would become Abraham's family tomb for generations.

Later, Abraham himself, Isaac, Rebekah, Jacob, and Leah would all be buried in this same cave.

🪦 Sarah will be buried here

🏛️ It becomes the family burial place

📖 Several members of God's covenant family are buried here

➡️ Ephron responds

---

### 👂 My Lord, Hearken Unto Me

**Hearken** simply means **"listen carefully."**

Ephron respectfully asks Abraham to listen to what he has to say.

👂 Hearken means listen

🤝 Ephron continues the conversation

➡️ He mentions the value of the land

---

### 🪙 The Land Is Worth Four Hundred Shekels Of Silver…What Is That Betwixt Me And Thee?

A **shekel** was a unit of weight used for silver.

**Four hundred shekels** was a very expensive piece of property—likely worth tens or even hundreds of thousands of dollars in today's value, depending on the value of silver and the land itself.

Notice that Ephron is **not demanding payment**.

He has already offered Abraham the field as a gift.

Instead, he casually mentions what the land is worth and says,

**"What is that betwixt me and thee?"**

**Betwixt** simply means **"between."**

In other words, Ephron is saying,

**"The land is worth 400 shekels, but what's that between friends? Don't let money come between us. Just take the land and bury Sarah."**

But Abraham is not that kind of man.

The moment Ephron states the value of the land, Abraham treats it as the purchase price.

Rather than accepting the gift, Abraham immediately decides to pay the full amount.

He refuses to leave any room for someone to later say the land had merely been loaned to him or that he owed Ephron a favor.

🪙 Four hundred shekels was a large amount of silver

🤝 Betwixt means "between"

😊 Ephron offers friendship over profit

💯 Abraham chooses to pay the full value anyway

➡️ Abraham weighs out the silver

---

### ⚖️ Abraham Hearkened Unto Ephron…And Weighed To Ephron The Silver

Abraham immediately weighs out the full **400 shekels of silver**.

In those days, silver was not counted like modern coins.

Instead, it was placed on a balance scale until it reached the agreed weight.

By paying the full amount immediately, Abraham ends the discussion.

The land now belongs to him completely, with no future obligation and no debt owed to anyone.

This perfectly reflects Abraham's character.

He wanted people to know that what God gave him could not be credited to another man.

⚖️ Silver was weighed on a balance

💰 Abraham immediately pays the full amount

🤝 He owes no one a favor

📜 The purchase becomes legally secure

➡️ The witnesses observe everything

---

### 👥 In The Audience Of The Sons Of Heth

This means the entire transaction happens publicly.

Everyone present hears the conversation and watches Abraham pay the silver.

There can be no future argument about who owns the land.

👥 Many witnesses watch the sale

📜 The agreement is public

➡️ The property is officially transferred

---

### 🌳 The Field Of Machpelah…The Cave…And All The Trees That Were In The Field

The purchase includes far more than just the cave.

Abraham legally buys:

- 🌳 The entire field
- 🪨 The cave inside the field
- 🌲 Every tree growing on the property
- 📍 Everything within its boundaries

Nothing is left out.

The entire property now belongs to Abraham.

🌳 The whole field is included

🪨 The cave is included

🌲 Even the trees become Abraham's property

➡️ The ownership is confirmed

---

### 📜 Were Made Sure Unto Abraham For A Possession

**Made sure** means the ownership was permanently confirmed.

Today we would say the deed was signed and officially transferred.

From this moment forward, the land legally belongs to Abraham and his descendants.

No one can later claim that it still belongs to Ephron.

📜 Made sure means legally confirmed

🏡 Abraham officially owns the property

⭐ His first possession in the Promised Land is now secure

➡️ The witnesses finalize the sale

---

### 🚪 In The Presence Of The Children Of Heth…Before All That Went In At The Gate Of His City

The city gate served as the legal center of the community.

Business transactions, court cases, contracts, and property sales all took place there before witnesses.

Because the purchase happened publicly at the city gate, everyone knew the land now belonged to Abraham.

This prevented future disputes and permanently established his family's ownership.

🚪 The city gate served as the town courthouse

👥 The community witnesses the purchase

📜 Abraham's ownership is publicly recognized

➡️ Sarah is finally laid to rest in her family's own burial place

---

# Genesis 23:19–20

## 🪦 The Burial Of Sarah

### ⚰️ After This, Abraham Buried Sarah His Wife

After the purchase was completed and witnessed by everyone at the city gate, Abraham was finally able to bury Sarah.

Burials in the ancient world normally took place very quickly, often the same day or within a short time after death.

To **bury** someone did not mean simply placing the body inside a cave.

Sarah's body would likely have been washed, wrapped in burial cloths, carried by family and servants to the cave, and laid to rest with great honor.

Afterward, the entrance to the cave would have been closed, likely with a large stone, protecting the burial place.

Unlike weddings, which could last for several days, burials happened much sooner because of the climate and the need to care for the body quickly.

This was Abraham's final act of love for the woman who had spent more than sixty years traveling beside him through God's promises.

⚰️ Sarah is finally laid to rest

❤️ Abraham honors his wife with a proper burial

🪦 Burials happened quickly in the ancient world

➡️ Moses explains where she was buried

---

### 🏞️ In The Cave Of The Field Of Machpelah Before Mamre…The Same Is Hebron In The Land Of Canaan

Sarah is buried in the **Cave of Machpelah**, which was located in a field near **Mamre**.

**Mamre** was the area where Abraham had lived for many years.

The nearby city was originally called **Kirjath-arba**, but later became known as **Hebron**.

Moses uses both names so the Israelites reading Genesis centuries later would know exactly where this important place was.

The cave is located near Hebron in the land of Canaan—the land God had promised to Abraham.

This is the first piece of the Promised Land that Abraham actually owns.

🏞️ Machpelah was near Mamre

📍 Kirjath-arba later became known as Hebron

🌍 Hebron is in the land of Canaan

⭐ This is Abraham's first possession in the Promised Land

➡️ The purchase is officially complete

---

### 📜 The Field, And The Cave That Is Therein, Were Made Sure Unto Abraham For A Possession Of A Burying Place By The Sons Of Heth

**Made sure** means the purchase was legally confirmed.

The sons of Heth—the Hittite leaders who witnessed the transaction—recognized that the field and the cave now belonged to Abraham.

No one could later dispute his ownership.

What began as a request for a place to bury Sarah became Abraham's first legally owned property in the land God had promised him.

That same cave would later become the burial place of **Abraham, Isaac, Rebekah, Jacob, and Leah**, making Machpelah the permanent family tomb of the patriarchs.

📜 The purchase is legally confirmed

🤝 The Hittites recognize Abraham's ownership

🪦 Machpelah becomes the family burial place

⭐ God's promise begins with one small piece of land`;

export const GENESIS_TWENTY_THREE_PERSONAL_SECTIONS = parseGenesisTwentyThreeRawNotes(GENESIS_TWENTY_THREE_RAW_NOTES);
