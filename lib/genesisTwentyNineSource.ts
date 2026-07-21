export type GenesisTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisTwentyNineRawNotes(rawText: string): GenesisTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+29:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 29 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+29:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+29:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 29 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 29,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 29:${startVerse}` : `Genesis 29:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Genesis 29 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_TWENTY_NINE_RAW_NOTES = `# Genesis 29:1–12

# 🚶 Jacob Meets Rachel

---

## 🚶 Jacob Went On His Journey

After God appeared to Jacob at Bethel and renewed the covenant, Jacob continues traveling toward **Haran**, where his mother's family lives.

"The people of the east" refers to the region of **Mesopotamia**, where Abraham's brother Nahor settled many years earlier.

Jacob is finally nearing the end of a journey of over **500 miles (800 km)**.

🚶 Jacob continues toward Haran

🌍 The "people of the east" lived in Mesopotamia

🏠 He is nearing his mother's relatives

---

## 💧 Behold, A Well In The Field

Jacob comes upon a well, much like Abraham's servant did years earlier when searching for a wife for Isaac.

In the ancient world, wells were gathering places where shepherds watered their flocks and where many important meetings took place.

🐑 A well was the center of daily life

💧 Water was essential for people and animals

📖 Another important meeting begins at a well

---

## 🐑 Three Flocks Of Sheep

A **flock** is a group of sheep cared for by one shepherd or one family.

The shepherds had brought their sheep to the well to be watered.

🐑 A flock is a group of sheep

👨‍🌾 Each flock belonged to a different shepherd

💧 They were waiting to water their animals

---

## 🪨 A Great Stone Was Upon The Well's Mouth

The opening of the well was covered by a large stone.

The stone protected the water from dirt, animals, and theft.

Because it was so heavy, several shepherds usually worked together to move it.

🪨 The stone covered the well

💧 It protected the water supply

💪 Several people normally moved it together

---

## 🐑 They Watered The Sheep

When all the shepherds arrived, they rolled the heavy stone away, allowed every flock to drink, then placed the stone back over the well.

This protected the well until the next watering time.

💧 The stone was rolled away

🐑 Every flock drank

🪨 The stone was replaced afterward

---

## 👋 My Brethren, Whence Be Ye?

Jacob politely asks,

"Where are you from?"

"My brethren" was a friendly way of addressing fellow travelers or shepherds. He is not calling them his actual brothers.

🤝 A respectful greeting

❓ Jacob asks where they are from

---

## 🏠 Of Haran Are We

The shepherds answer that they are from **Haran**.

Jacob immediately realizes he has finally reached the place where his mother's family lives.

📍 Jacob has reached Haran

🙌 His journey is nearly complete

---

## 👨 Know Ye Laban?

Jacob asks if they know **Laban**, the grandson of Nahor and the brother of Rebekah.

Laban is Jacob's **uncle**, and the very person Isaac told him to find.

The shepherds answer,

"We know him."

👨 Laban is Jacob's uncle

🏠 This is the family Jacob came to find

✅ The shepherds know exactly who he is

---

## 😊 Is He Well?

Jacob asks if Laban is doing well.

The shepherds reply,

"Yes."

Then they point into the distance and say,

"Look—Rachel, his daughter, is coming with the sheep."

Without realizing it, Jacob has already found the very family he traveled hundreds of miles to meet.

😊 Jacob asks about Laban

🐑 Rachel is approaching with the flock

✨ God's guidance becomes immediately visible

---

## ☀️ It Is Yet High Day

Jacob notices that it is still early enough for the sheep to continue grazing.

He asks the shepherds,

"Why don't you water the sheep now and take them back out to pasture?"

From Jacob's perspective, they seem to be wasting valuable daylight.

☀️ There is still plenty of daylight

🐑 Jacob expects them to water the sheep

🌿 More grazing time remains

---

## 🪨 We Cannot Until All The Flocks Be Gathered

The shepherds explain why they are waiting.

The stone covering the well is extremely heavy.

Rather than moving it every time one flock arrived, everyone waited until all the shepherds had gathered.

Then they would remove the stone together, water every flock, and replace it.

This saved work and helped protect the well.

🪨 Everyone waited together

💪 The stone required several people

💧 Every flock was watered at the same time

---

## 🐑 Rachel Came With Her Father's Sheep

Rachel arrives leading her father's flock.

This means Rachel herself was serving as a shepherd.

While many shepherds were men, women also cared for family flocks, especially in family-owned businesses.

Rachel is introduced as hardworking and responsible.

🐑 Rachel cared for her father's sheep

👩 She worked alongside the family business

💪 She is introduced as diligent and responsible

---

## 💪 Jacob Rolled The Stone From The Well's Mouth

As soon as Jacob sees Rachel, he walks to the well and rolls the heavy stone away himself.

The text emphasizes Jacob's strength and eagerness to help.

He then waters Laban's flock before even introducing himself.

Jacob immediately begins serving his future family.

💪 Jacob removes the heavy stone

🐑 He waters Rachel's flock

❤️ He immediately helps her

---

## 😭 Jacob Kissed Rachel And Wept

Jacob greets Rachel with a kiss, which in their culture was a normal family greeting between relatives.

Then he begins to cry.

These are not tears of sadness.

Imagine everything that has happened:

- He fled from Esau.
- He traveled over 500 miles alone.
- God appeared to him in a dream.
- God safely guided him to the exact family he was looking for.

After weeks of uncertainty, God has brought him exactly where he promised.

Jacob is overwhelmed with relief, gratitude, and emotion.

💋 A family greeting

😭 Tears of relief and gratitude

🙏 God has faithfully guided Jacob

---

## 🏃 Rachel Ran And Told Her Father

Jacob tells Rachel who he is:

He is the son of **Rebekah**, her father's sister.

That makes Jacob Rachel's **first cousin**.

Excited by the news, Rachel runs home to tell Laban that a member of their family has arrived.

🏃 Rachel runs home

👨 She tells Laban the news

👨‍👩‍👧 The family is reunited after many years

# Genesis 29:13–14

# 🤗 Laban Greets Jacob

---

## 📖 When Laban Heard The Tidings Of Jacob His Sister's Son

"It came to pass" is one of Moses' favorite phrases for moving the story forward after something has happened.

The word **tidings** simply means **news** or **report**.

Laban hears that Jacob, the son of his sister Rebekah, has arrived after traveling all the way from Canaan.

This immediately catches Laban's attention because Jacob is family.

📰 Tidings means news or report

👨 Jacob is Rebekah's son

🏃 Laban hears that family has arrived

---

## 🏃 He Ran To Meet Him

As soon as Laban hears the news, he runs to meet Jacob.

This is the second time we've seen Laban do this.

Years earlier, when Abraham's servant arrived looking for a wife for Isaac, Laban also ran out to meet him at the well.

Laban seems to be the kind of person who eagerly welcomes important visitors, especially family members.

🏃 Laban immediately runs to Jacob

📖 Just as he did with Abraham's servant

🤝 He warmly welcomes his relative

---

## 🤗 He Embraced Him, Kissed Him, And Brought Him To His House

Laban greets Jacob with an embrace and a kiss.

In the ancient Near East, this was a normal family greeting and a sign of affection and acceptance.

Laban then brings Jacob into his home as an honored guest.

🤗 A warm family welcome

💋 A customary greeting between relatives

🏠 Jacob is welcomed into Laban's home

---

## 🗣️ He Told Laban All These Things

Jacob tells Laban everything that has happened.

This likely included:

- Isaac sending him to Haran to find a wife.
- Esau's anger after the stolen blessing.
- His journey from Beersheba.
- God's appearance to him at Bethel.
- How God safely led him to Rachel at the well.

Laban now understands why Jacob has come and why he arrived alone.

🗣️ Jacob explains his journey

🙏 He shares how God guided him

🏠 Laban learns why Jacob has come

---

## 🩸 Surely Thou Art My Bone And My Flesh

Laban is saying,

"You are truly one of us."

"My bone and my flesh" was an ancient expression meaning **close blood relative** or **family**.

Laban recognizes Jacob as his own nephew and welcomes him accordingly.

👨 Jacob is Laban's nephew

🩸 "Bone and flesh" means close family

❤️ Laban accepts him as one of his own

---

## 📅 He Abode With Him The Space Of A Month

To **abide** means **to stay**, **remain**, or **live with** someone.

Jacob stays in Laban's home for an entire month.

During this time, Jacob is not simply relaxing.

As the following verses show, he begins helping Laban with the work, giving Laban time to see that Jacob is a hardworking and trustworthy man.

🏠 Abode means to stay or remain

📅 Jacob lives with Laban for one month

💪 During that month, Jacob begins working for Laban

# Genesis 29:15–20

# 💪 Jacob Worked For Rachel

---

## 🤝 Because Thou Art My Brother

Laban is not saying Jacob is literally his brother.

In the Old Testament, **brother** could also mean a close relative.

Jacob is actually Laban's **nephew**, the son of his sister Rebekah.

Laban recognizes that Jacob is family, but Jacob has also been working hard for him during the past month.

👨 Brother can mean a close relative

👨‍👦 Jacob is Laban's nephew

💪 Jacob has already been working for Laban

➡️ Laban talks about payment

---

## 💰 Shouldest Thou Therefore Serve Me For Naught?

**Naught** means **nothing** or **for free**.

Laban is saying,

**"Just because you are my relative does not mean you should work for me without being paid."**

Jacob had already been helping with Laban's animals and household.

Now Laban wants to turn that informal help into an official working agreement.

💰 Naught means nothing

💼 Jacob should not work for free

📜 Laban wants to make the arrangement official

➡️ Laban asks what Jacob wants

---

## 🪙 Tell Me, What Shall Thy Wages Be?

**Wages** means the payment someone receives for their work.

Laban asks Jacob,

**"What do you want me to pay you?"**

The payment could have been money, animals, food, land, or another form of property.

Instead of asking for silver, livestock, or possessions, Jacob asks for the right to marry Rachel.

🪙 Wages means payment for work

💰 Laban asks Jacob to name his price

❤️ Jacob chooses Rachel instead of money

➡️ Moses introduces Laban's daughters

---

## 👩 Laban Had Two Daughters

Laban has two daughters.

The older daughter is **Leah**.

The younger daughter is **Rachel**.

In their culture, the older daughter was normally expected to marry before the younger daughter.

That family custom becomes extremely important later.

👩 Leah is the older daughter

👩 Rachel is the younger daughter

📖 The older daughter normally married first

➡️ Moses describes Leah

---

## 👁️ The Name Of The Elder Was Leah

Leah was Laban's firstborn daughter.

Because she was the older sister, the family would normally expect her to marry before Rachel.

This explains part of what Laban does later, although he does not tell Jacob about that custom beforehand.

👁️ Leah is Laban's older daughter

💍 She was normally expected to marry first

➡️ Moses describes her appearance

---

## 👀 Leah Was Tender-Eyed

The phrase **tender-eyed** is difficult to translate exactly.

It does not plainly say that Leah was ugly.

It may mean that her eyes were soft, gentle, delicate, or less striking than Rachel's.

The verse is comparing the sisters.

Leah is mainly described by her eyes, while Rachel is described as beautiful in her entire appearance.

👀 Tender-eyed may mean soft or delicate eyes

📖 The Bible does not directly call Leah ugly

⚖️ Her appearance is contrasted with Rachel's

➡️ Moses introduces Rachel

---

## ✨ The Name Of The Younger Was Rachel

Rachel was Laban's younger daughter.

She was the shepherd Jacob met at the well when he first arrived in Haran.

Jacob had already become strongly attached to her before Laban asked him to name his wages.

🐑 Rachel cared for her father's sheep

💧 Jacob first met her at the well

❤️ Jacob had already fallen in love with her

➡️ Moses describes Rachel's appearance

---

## 🌹 Rachel Was Beautiful And Well-Favoured

**Beautiful** means Rachel had an attractive face.

**Well-favoured** means her overall appearance and physical form were attractive.

Together, the phrase means Rachel was considered exceptionally beautiful.

Her beauty is one of the reasons Jacob became so deeply drawn to her.

🌹 Rachel was exceptionally beautiful

😊 Well-favoured means attractive in appearance and form

❤️ Jacob loved Rachel

➡️ Jacob names his wages

---

## ❤️ Jacob Loved Rachel

Jacob did not ask for Rachel only because she was beautiful.

He had come to love her.

He had met her at the well, helped water her father's sheep, and then lived near her family for an entire month.

Now, when Laban asks what payment he wants, Jacob already knows his answer.

❤️ Jacob genuinely loved Rachel

🏠 He had spent time living with her family

➡️ Jacob offers seven years of work

---

## 💪 I Will Serve Thee Seven Years For Rachel Thy Younger Daughter

Jacob offers to work for Laban for **seven years** in exchange for permission to marry Rachel.

In the ancient world, a man often gave the bride's family a **bride-price** before the marriage.

Jacob had arrived without the wealth Abraham's servant once brought for Rebekah.

So instead of paying with silver, gold, or animals, Jacob offers his labor.

Seven years of work was a very valuable payment.

It showed Laban how seriously Jacob wanted Rachel.

💪 Jacob offers seven years of labor

💰 His work becomes the bride-price

❤️ Jacob is willing to make a major sacrifice for Rachel

➡️ Laban accepts the offer

---

## 🤝 It Is Better That I Give Her To Thee Than That I Should Give Her To Another Man

Laban says it would be better for Rachel to marry Jacob than a stranger.

Jacob is part of their extended family, and marriage within the family helped preserve property, relationships, and family loyalty.

Laban appears to agree to Jacob's exact request.

However, he does not clearly say,

**"After seven years, I will give you Rachel."**

His answer sounds like an agreement, but its vague wording leaves room for the deception that comes later.

🤝 Laban appears to accept Jacob's offer

👨‍👩‍👧 Jacob is already part of the family

⚠️ Laban's answer is not as direct as it first sounds

➡️ Jacob stays and works

---

## 🏠 Abide With Me

**Abide** means **stay**, **remain**, or **continue living here**.

Laban tells Jacob to remain in his household and begin the seven years of service.

Jacob agrees because he believes Rachel will become his wife when the work is complete.

🏠 Abide means stay or remain

💪 Jacob begins working for Laban

➡️ Seven years pass

---

## ⏳ Jacob Served Seven Years For Rachel

Jacob completes the full seven years he promised.

During that time, he likely continued caring for Laban's sheep, goats, and other property.

His labor increased Laban's wealth while serving as the payment for Rachel's hand in marriage.

⏳ Jacob completes seven years

🐑 He works with Laban's animals and household

💰 His labor pays the agreed bride-price

➡️ His love makes the years feel shorter

---

## ❤️ They Seemed Unto Him But A Few Days, For The Love He Had To Her

The seven years did not literally pass in only a few days.

The phrase means Jacob considered the work worth it because he loved Rachel so deeply.

He stayed focused on the future marriage instead of complaining about the length of the service.

To Jacob, seven years of labor felt small compared with the value of having Rachel as his wife.

❤️ Jacob's love made the sacrifice feel worthwhile

⏳ He remained patient for seven years

💍 Rachel was worth more to him than the payment he gave

# Genesis 29:21–30

# 🎭 Laban Deceives Jacob

---

## 🗓️ Give Me My Wife, For My Days Are Fulfilled, That I May Go In Unto Her

Jacob's seven years of service are finally complete.

He goes directly to Laban and asks him to keep his word.

**"Go in unto her"** is a common Hebrew idiom used throughout the Old Testament for a husband and wife's marital union.

It isn't crude or evasive language.

It was simply the standard way Scripture described a marriage being completed.

Jacob has waited seven full years, and he is eager for the promise to finally be kept.

🗓️ Jacob's seven years of service are complete

💍 He asks Laban to keep his word

📖 "Go in unto her" is a standard Hebrew idiom for marriage

➡️ Laban prepares a wedding feast

---

## 🎉 Laban Gathered Together All The Men Of The Place, And Made A Feast

Laban throws a large wedding feast and invites the men of the community.

Ancient Near Eastern weddings were major community events, often lasting several days and involving eating, drinking, and celebration.

This wasn't simply a private family matter.

The whole town was invited to witness that a legitimate marriage had taken place.

That public witness becomes important, because everyone at the feast will unknowingly help cover up what Laban is about to do.

🎉 A wedding feast was a major community event

🍷 Celebrations like this often lasted several days

👥 Public witnesses made the marriage look fully legitimate

➡️ Night falls on the wedding

---

## 🌙 In The Evening, He Took Leah His Daughter, And Brought Her To Him; And He Went In Unto Her

Under cover of darkness, and very likely after a feast involving a great deal of wine, Laban brings Leah instead of Rachel into the wedding tent.

Brides in that culture were commonly veiled during the ceremony and procession, which was completely ordinary and would not have raised suspicion on its own.

Combined with the darkness of night and a groom who had probably been drinking at the feast, the substitution succeeds.

🌙 The switch happens under cover of night

👰 Brides were customarily veiled, so this alone wasn't suspicious

🍷 A wedding feast with wine made the deception easier

➡️ Jacob discovers nothing until morning

---

## 👩‍🦰 Laban Gave Unto His Daughter Leah Zilpah His Maid For An Handmaid

As part of the wedding arrangement, Laban gives Leah her own servant, **Zilpah**, to be her personal maid.

This wasn't unusual for a father giving his daughter in marriage.

It shows that, on the surface, this looked like a fully legitimate, properly prepared wedding, not a rushed trick with no formal arrangements.

Zilpah's presence here matters for the rest of Genesis, since she later becomes the mother of two of Jacob's sons.

👩‍🦰 Zilpah becomes Leah's personal handmaid

🎁 A customary gift from a father to a newly married daughter

📖 Zilpah will reappear later in Jacob's family

➡️ The deception is finally exposed

---

## 😳 In The Morning, Behold, It Was Leah…What Is This Thou Hast Done Unto Me?

When morning comes, Jacob discovers that he has married Leah instead of Rachel.

His shock and anger are obvious.

He confronts Laban directly and asks why he was deceived after faithfully serving seven years for Rachel.

There is a sharp irony here that Moses expects the reader to notice.

Jacob, who once disguised himself in the dark to deceive his own father and steal a blessing meant for someone else, has now been deceived himself in the dark by his own father-in-law.

The deceiver has been deceived.

😳 Jacob discovers the substitution the next morning

😠 He confronts Laban directly

🔄 Jacob, once a deceiver himself, is now the one deceived

➡️ Laban offers his justification

---

## ⚖️ It Must Not Be So Done In Our Country, To Give The Younger Before The Firstborn

Laban defends himself by appealing to local custom.

In their culture, the older daughter was expected to marry before the younger one.

Whether this custom truly existed exactly as Laban describes it, or whether he is conveniently using it now to justify what he has done, the text does not fully resolve.

What is clear is that Laban never mentioned this supposed custom back when Jacob first asked to marry Rachel seven years earlier.

He only brings it up after the deception is already complete.

⚖️ Laban claims a local custom protecting the firstborn's right to marry first

🤔 He never mentioned this custom before Jacob's seven years of work

⚠️ The excuse conveniently arrives only after the deception

➡️ Laban offers Jacob a new arrangement

---

## 💍 Fulfil Her Week, And We Will Give Thee This Also…Yet Seven Other Years

Laban proposes a solution.

Jacob should complete the traditional seven day wedding celebration week with Leah, and then Laban will give him Rachel as a wife too, in exchange for another seven years of labor.

This means Jacob will end up serving Laban a total of fourteen years for Rachel alone, on top of anything he serves afterward.

Laban has effectively doubled the price after the wedding was already underway, something Jacob had little real power to negotiate or refuse at that point.

💍 Jacob must finish Leah's wedding week first

📆 Then Rachel will be given to him as well

⏳ The total price for Rachel becomes fourteen years, not seven

➡️ Jacob accepts the arrangement

---

## 👰 Jacob Did So…And He Gave Him Rachel His Daughter To Wife Also

Jacob agrees to Laban's terms.

He completes Leah's wedding week, and Laban then gives him Rachel as a second wife as well.

Having two wives at once, known as polygamy, was culturally accepted in the ancient world, though it was never God's original design shown back in Genesis 2, where God created one man and one woman as a single, unified pair.

Scripture consistently shows that households with multiple wives experienced deep rivalry, favoritism, and conflict, and Jacob's family will be no exception.

👰 Jacob marries both Leah and Rachel

📖 Polygamy was culturally common but not God's original design in Genesis 2

⚠️ Multiple wives repeatedly bring conflict throughout Scripture

➡️ Rachel also receives a handmaid

---

## 👩‍🦱 Laban Gave To Rachel His Daughter Bilhah His Handmaid To Be Her Maid

Just as Leah received Zilpah, Rachel now receives her own handmaid, **Bilhah**, as part of her marriage arrangement.

Like Zilpah, Bilhah's name will matter later in Genesis.

Both handmaids eventually bear children counted among Jacob's twelve sons, whose descendants become the twelve tribes of Israel.

👩‍🦱 Bilhah becomes Rachel's personal handmaid

🎁 The same customary gift already given to Leah

📖 Bilhah will also become significant later in Jacob's family

➡️ Jacob's true feelings become clear

---

## ❤️ He Loved Rachel More Than Leah, And Served With Him Yet Seven Years

Jacob now has two wives, but his heart still belongs primarily to Rachel.

This uneven love sets the stage for years of tension between the two sisters, tension that will play out openly in the children each of them bears.

Jacob completes the second seven years of labor exactly as agreed, meaning he will end up serving Laban fourteen years total in exchange for marrying Rachel.

❤️ Jacob loves Rachel more than Leah

💔 This favoritism creates lasting tension in the family

⏳ Jacob serves a full fourteen years for Rachel

➡️ The rivalry between the sisters is about to unfold

# Genesis 29:31–35

# 👶 Leah's Children

---

## 💔 When The Lord Saw That Leah Was Hated

The word **hated** here does **not** mean Jacob despised Leah or treated her cruelly.

In the Bible, **love** and **hate** are sometimes used as a comparison.

Jacob loved Rachel **more**, so Leah was the less-loved wife.

God saw Leah's loneliness and the pain of living in her sister's shadow.

He had compassion on her.

💔 Leah was loved less than Rachel

👀 God saw her pain

❤️ God cared for the overlooked

---

## 👶 He Opened Her Womb, But Rachel Was Barren

To **open her womb** means God allowed Leah to become pregnant.

The Bible emphasizes that children are a gift from God.

At the same time, **Rachel was barren**, meaning she was unable to have children.

This creates another familiar pattern in Genesis.

Just as Sarah and Rebekah struggled to have children, Rachel now experiences the same trial.

👶 God allowed Leah to conceive

🚫 Barren means unable to have children

📖 Another woman in the covenant family waits on God

---

## 👦 She Called His Name Reuben

Leah's first son is named **Reuben**.

The name sounds like the Hebrew words for **"See, a son!"**

Leah says,

**"Surely the Lord hath looked upon my affliction."**

Her **affliction** was the sorrow of being the less-loved wife.

She believed that giving Jacob his first son might finally cause him to love her more.

Sadly, the child did not solve the deeper problem in their marriage.

👦 Reuben means "See, a son!"

😢 God saw Leah's suffering

❤️ Leah hoped Jacob would now love her more

---

## 👂 She Called His Name Simeon

Leah becomes pregnant again and has a second son.

She names him **Simeon**, which means **"heard."**

Leah believes the Lord has heard her pain because she was less loved.

Again, her words reveal that she is still longing for Jacob's affection.

👂 Simeon means "heard"

🙏 Leah believes God heard her

💔 She still longs for Jacob's love

---

## 🤝 She Called His Name Levi

Leah has a third son and names him **Levi**, meaning **"joined"** or **"attached."**

She says,

**"Now this time will my husband be joined unto me."**

Leah hopes that after giving Jacob three sons, he will finally become closely attached to her.

She is still looking for the love she has been missing.

🤝 Levi means "joined" or "attached"

👨‍👩‍👦 Leah hopes Jacob will grow closer to her

💔 She still desires his affection

---

## 🙌 She Called His Name Judah

Leah has a fourth son and names him **Judah**, which means **"praise."**

This time something changes.

Unlike the first three sons, Leah does **not** mention Jacob.

Instead she says,

**"Now will I praise the Lord."**

Her focus shifts from trying to earn her husband's love to thanking God for His goodness.

Judah would later become one of the most important tribes in Israel.

From the tribe of Judah would come King David and, generations later, **Jesus Christ**.

🙌 Judah means "praise"

❤️ Leah turns her focus toward God

👑 From Judah would come David and Jesus

---

## ⏸️ She Left Bearing

The phrase **"she left bearing"** means Leah stopped having children for a time.

It does not mean she would never have more children.

It simply marks a pause before the story continues.

⏸️ Leah stops having children for a season

📖 Her story is not finished

➡️ More children will come later`;

export const GENESIS_TWENTY_NINE_PERSONAL_SECTIONS = parseGenesisTwentyNineRawNotes(GENESIS_TWENTY_NINE_RAW_NOTES);
