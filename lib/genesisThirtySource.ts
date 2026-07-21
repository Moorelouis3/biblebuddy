export type GenesisThirtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtyRawNotes(rawText: string): GenesisThirtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+30:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 30 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+30:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+30:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 30 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 30,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 30:${startVerse}` : `Genesis 30:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Genesis 30 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_RAW_NOTES = `# Genesis 30:1–4

# 💔 Rachel Becomes Jealous Of Leah

---

## 💔 When Rachel Saw That She Bare Jacob No Children

Rachel realizes she still has not been able to have children.

By this point, Leah has already given Jacob **four sons**, while Rachel has none.

This was likely not something that happened over a few weeks or months. It probably took **several years** for Leah to have Reuben, Simeon, Levi, and Judah.

During all that time, Rachel watched Leah become the mother of Jacob's growing family.

In the ancient world, having children was one of a wife's greatest hopes and responsibilities. Sons would carry on the family name, inherit property, provide for their parents in old age, and increase the family's strength.

A woman who could not have children often experienced deep sorrow, disappointment, and shame, even though infertility was not her fault.

Every new son Leah gave birth to would have been another painful reminder that Rachel remained childless.

💔 Rachel remains unable to have children

👶 Leah has already given Jacob four sons

⏳ Several years have likely passed

😢 Childlessness brought deep sorrow in that culture

➡️ Rachel becomes jealous

---

## 😔 Rachel Envied Her Sister

**Envied** means **wanting what someone else has and feeling pain because you do not have it yourself.**

Rachel was not simply jealous of Leah's children.

She likely watched Jacob playing with his sons, holding them, teaching them, and celebrating each new birth.

Leah was able to give Jacob the family Rachel desperately wanted to give him herself.

Rachel also had to share her husband with Leah, but now Leah had something Rachel could not provide.

Her envy was growing from years of disappointment and heartbreak.

The Bible honestly shows that even God's chosen family struggled with jealousy, comparison, and emotional pain.

😔 Envy means wanting what someone else has

👶 Rachel longs for children of her own

❤️ She wants to build a family with Jacob

📖 Even God's people struggled with jealousy

➡️ Rachel blames Jacob

---

## 😭 Give Me Children, Or Else I Die

Rachel speaks from overwhelming emotion.

She is not saying she will literally die that very moment.

She means that her grief feels unbearable.

Instead of bringing her pain to God, she directs it toward Jacob, almost speaking as though he has the power to fix the problem.

Rachel's words reveal how deeply broken and desperate she has become after years without children.

😭 Rachel speaks out of deep pain

💔 Her grief feels unbearable

👨 She wrongly places the responsibility on Jacob

➡️ Jacob becomes angry

---

## 😠 Jacob's Anger Was Kindled

**Anger was kindled** means **his anger was stirred up** or **burned intensely.**

Jacob becomes angry because Rachel is asking him to do something that no human being can control.

He knows he cannot give someone the ability to have children.

Her words sound as though she is blaming him for something only God has authority over.

Jacob understands that life ultimately comes from God.

😠 Kindled means stirred up or burned with anger

👨 Jacob feels unfairly blamed

🙏 He knows only God gives life

➡️ Jacob points Rachel to God

---

## 🙏 Am I In God's Stead?

**Stead** means **place** or **position.**

Jacob is asking,

**"Am I in God's place?"**

He is reminding Rachel that he is her husband, but he is not God.

Only God has the authority to open or close the womb.

Jacob is saying,

**"I cannot do what only God has the power to do."**

🙏 Stead means place or position

👑 Only God has authority over life

👨 Jacob cannot control whether Rachel conceives

➡️ God alone opens and closes the womb

---

## 👶 Who Hath Withheld From Thee The Fruit Of The Womb?

The **fruit of the womb** refers to children.

Jacob explains that God has not yet allowed Rachel to become pregnant.

He is not saying God does not care about Rachel.

He is simply acknowledging that God is sovereign over life and birth.

Throughout Scripture, we repeatedly see that God opens barren wombs in His own perfect timing.

👶 Fruit of the womb means children

🙏 God is sovereign over birth

⏳ God's timing is different from man's

➡️ Rachel proposes another plan

---

## 👩 Behold My Maid Bilhah

Rachel follows the same custom that Sarah had used years earlier with Hagar.

In the ancient Near East, if a wife could not have children, she could give her female servant to her husband to bear children on her behalf.

The servant would become a secondary wife or concubine.

Although the servant physically gave birth, the children were legally recognized as belonging to the wife who gave her servant.

This is exactly what Sarah did with Hagar, which resulted in the birth of Ishmael.

Rachel now follows the same human solution instead of waiting on God's timing.

As before, the Bible records this custom without approving it.

👩 Rachel follows Sarah's earlier example

📖 This was an accepted custom in that culture

👶 The children would legally belong to Rachel

⚠️ The Bible records the practice but does not command it

➡️ Bilhah will bear children for Rachel

---

## 🤱 She Shall Bear Upon My Knees

This phrase describes an ancient adoption custom.

When Bilhah gave birth, the child would be presented to Rachel, symbolically **upon her knees**, showing that Rachel accepted the child as her own.

It did not mean Rachel physically gave birth.

It was a legal and symbolic act declaring that the child would belong to Rachel's household and carry her family line.

🤱 A symbolic adoption ceremony

👶 Bilhah gives birth physically

❤️ Rachel becomes the legal mother

➡️ Rachel hopes to build a family

---

## 👶 That I May Also Have Children By Her

Rachel hopes that through Bilhah she can finally have a family.

She believes Bilhah's children will legally be counted as her own.

Although this was culturally accepted, Rachel is once again trying to solve God's timing through human effort.

Later in the story, God Himself will open Rachel's womb without the need for human schemes.

👶 Rachel wants a family through Bilhah

📖 The children would legally belong to Rachel

🙏 God's promise will ultimately come through His own power

➡️ Bilhah becomes Jacob's wife

---

## 💍 She Gave Him Bilhah Her Handmaid To Wife

This means Bilhah became one of Jacob's wives, although she held a lower status than Leah and Rachel.

The Bible does not describe another week-long wedding feast or public celebration like Jacob's marriages to Leah and Rachel.

Instead, this appears to have been a simple legal arrangement within the household.

Bilhah's purpose was to bear children on Rachel's behalf.

💍 Bilhah becomes another wife

🏠 She remains Rachel's servant

📖 No separate wedding celebration is mentioned

➡️ Jacob goes in to Bilhah

---

## ❤️ Jacob Went In Unto Her

The phrase **went in unto her** is a respectful biblical way of saying that Jacob had sexual relations with Bilhah.

As a result, Bilhah became pregnant.

This begins another chapter in the growing family of Jacob, as more of the future tribes of Israel will now be born.

❤️ A biblical expression for marital relations

👶 Bilhah conceives

📖 Jacob's family continues to grow

# Genesis 30:5–13

# 👶 Bilhah And Zilpah's Children

---

## 👶 Bilhah Conceived And Bare Jacob A Son

Rachel's plan appears to work.

After Jacob has relations with Bilhah, she becomes pregnant and gives birth to a son.

Although Bilhah is the one who physically gives birth, the child is legally counted as Rachel's according to the custom of that time.

Rachel now feels she finally has a child connected to her household.

👶 Bilhah gives birth

❤️ The child is legally considered Rachel's

📖 Rachel believes God has answered her situation

➡️ Rachel names the child

---

## ⚖️ God Hath Judged Me

Rachel is not saying that God condemned her.

The word **judged** here means that **God has heard her case and acted on her behalf.**

Rachel had likely spent years praying for children.

She believed her barrenness was a painful disgrace, and now she sees Bilhah's son as God responding to her cries.

Rachel feels that God has finally looked upon her situation and given her relief.

⚖️ Judged means God acted on her behalf

🙏 Rachel believes God heard her prayers

❤️ She sees this birth as an answer from God

➡️ Rachel names him Dan

---

## 👶 Therefore Called His Name Dan

**Dan** means **"judge"** or **"he has judged."**

Rachel chooses this name because she believes God has judged her case fairly and answered her prayers by giving her a son through Bilhah.

Like many names in Genesis, Dan's name reflects the circumstances surrounding his birth.

👶 Dan means judge

⚖️ Rachel believes God answered her case

📖 His name remembers God's intervention

➡️ Bilhah has another son

---

## 👶 Bilhah Conceived Again

Bilhah becomes pregnant a second time and gives birth to another son for Rachel's household.

Rachel is not satisfied with only one child.

She desires an even larger family, just as Leah's family continues to grow.

This second son becomes another tribe of Israel.

👶 Bilhah has a second son

🏠 Rachel's household continues growing

📖 Another future tribe of Israel is born

➡️ Rachel compares herself to Leah

---

## 🤼 With Great Wrestlings Have I Wrestled With My Sister

Rachel is describing the ongoing competition between herself and Leah.

The word **wrestlings** refers to an intense struggle or conflict.

This is not a physical fight.

It is an emotional battle over children, family, and Jacob's affection.

For years, Rachel had watched Leah bear son after son while she remained childless.

Now she feels she is finally catching up.

🤼 Wrestlings means intense struggle

👭 Rachel compares herself with Leah

💔 Their rivalry continues

➡️ Rachel believes she has prevailed

---

## 🏆 And I Have Prevailed

**Prevailed** means **to overcome** or **to win.**

Rachel believes she has finally gained ground against Leah because she now has two sons through Bilhah.

In Rachel's mind, this is a victory in their ongoing rivalry.

However, the family competition is far from over.

🏆 Prevailed means to overcome or win

👶 Rachel now has two sons through Bilhah

📖 The rivalry between the sisters continues

➡️ Rachel names the child Naphtali

---

## 👶 She Called His Name Naphtali

**Naphtali** means **"my wrestling"** or **"my struggle."**

His name reflects Rachel's words about struggling with Leah.

Every time his name was spoken, it reminded the family of Rachel's long emotional battle to have children.

👶 Naphtali means my wrestling

🤼 His name remembers Rachel's struggle

📖 Biblical names often reflected important events

➡️ Leah responds

---

## 👩 When Leah Saw That She Had Left Bearing

Leah notices that she has stopped having children.

For the time being, she is no longer becoming pregnant.

After watching Rachel give Bilhah to Jacob, Leah decides to follow the same custom.

She gives her own servant, Zilpah, to Jacob so that more children can be added to her household.

👩 Leah's pregnancies have stopped

📖 She follows the same custom Rachel used

🏠 Leah wants her family to continue growing

➡️ Zilpah becomes Jacob's wife

---

## 💍 She Took Zilpah Her Maid And Gave Her To Jacob To Wife

Leah gives Zilpah to Jacob just as Rachel had given Bilhah.

Zilpah becomes another wife of Jacob with the purpose of bearing children for Leah's household.

The Bible does not mention another wedding feast or ceremony.

It appears to have been a household arrangement following the accepted customs of that culture.

💍 Zilpah becomes another wife

🏠 She remains Leah's servant

📖 The arrangement follows the custom of that time

➡️ Zilpah gives birth

---

## 👶 Zilpah Bare Jacob A Son

Zilpah gives birth to her first son.

Although Zilpah is the biological mother, the child is counted as belonging to Leah's household.

The competition between the two sisters now continues through their servants.

👶 Zilpah gives birth

❤️ The child belongs to Leah's household

📖 The family continues growing

➡️ Leah names him Gad

---

## 🛡️ She Called His Name Gad

**Gad** is commonly understood to mean **"good fortune," "good luck,"** or **"a troop comes."**

Leah sees this birth as another blessing from God.

She believes good fortune has come to her household once again.

🛡️ Gad means good fortune or a troop

🎉 Leah celebrates another blessing

📖 His name marks another joyful birth

➡️ Zilpah has another son

---

## 👶 Zilpah Bare Jacob A Second Son

Zilpah gives birth to a second son.

Just as Bilhah had two sons for Rachel, Zilpah now has two sons for Leah.

Jacob's family continues expanding as the future tribes of Israel are being born.

👶 Zilpah has a second son

🏠 Leah's household grows again

📖 More future tribes of Israel are born

➡️ Leah rejoices

---

## 😊 Happy Am I, For The Daughters Will Call Me Blessed

Leah believes other women will now look at her with admiration.

The phrase **"the daughters"** refers to other women.

Because of the many children connected to her household, Leah believes she will be considered fortunate and blessed.

Her words show that she still longs for approval and honor.

😊 Leah feels greatly blessed

👩 The daughters refers to other women

🙏 She believes others will admire her

➡️ She names him Asher

---

## 👶 She Called His Name Asher

**Asher** means **"happy," "blessed,"** or **"fortunate."**

Leah chooses this name because she feels joyful over another son and believes God has blessed her household.

Like the other names in Genesis, Asher's name reflects the emotions surrounding his birth.

👶 Asher means happy or blessed

😊 Leah celebrates God's blessing

📖 His name remembers her joy

# Genesis 30:14–16

# 🌿 Leah's Plan

---

## 🌾 Reuben Went In The Days Of Wheat Harvest

This event takes place during the **wheat harvest**, the time of year when the grain was ripe and ready to be gathered.

Harvest season was one of the busiest times of the year. Families worked together in the fields collecting grain that would become food for the months ahead.

Reuben, who is still a young boy, is out in the fields during the harvest.

🌾 Wheat harvest was gathering ripe grain

👨‍🌾 Families worked together in the fields

👦 Reuben is still a young child

➡️ Reuben finds something unusual

---

## 🌿 Found Mandrakes In The Field

**Mandrakes** are plants with fragrant yellow fruit and large roots.

In the ancient world, many people believed mandrakes could increase fertility and help a woman become pregnant.

There is **no biblical evidence** that mandrakes actually had this power.

The Bible simply records what people believed at that time.

Rachel, who desperately wants children, hopes the mandrakes might help her conceive.

🌿 Mandrakes were believed to increase fertility

📖 The Bible never says they actually worked

❤️ Rachel desperately wants children

➡️ Reuben brings them to Leah

---

## 👦 Brought Them Unto His Mother Leah

Reuben brings the mandrakes to his mother, Leah.

Since Leah receives them, they belong to her.

Rachel notices the mandrakes and immediately asks for some because she still longs to have children.

👦 Reuben gives the mandrakes to Leah

🌿 Leah now owns them

❤️ Rachel wants them because she hopes for a child

➡️ Rachel makes a request

---

## 🌿 Give Me, I Pray Thee, Of Thy Son's Mandrakes

Rachel politely asks Leah if she can have some of Reuben's mandrakes.

Rachel is likely hoping they might help her become pregnant.

Although God alone controls the womb, Rachel is still looking for another solution instead of simply waiting on God's timing.

🌿 Rachel asks for the mandrakes

👶 She hopes they might help her have children

🙏 God alone gives life

➡️ Leah responds emotionally

---

## 💔 Is It A Small Matter That Thou Hast Taken My Husband?

Leah's words reveal years of hurt.

She feels that Rachel has always had Jacob's greatest love.

Although Leah has given Jacob many sons, she still knows Rachel is the wife Jacob truly wanted.

When Leah says,

**"Thou hast taken my husband,"**

she means Rachel has always had Jacob's heart and affection.

Now Leah feels Rachel wants to take something else that belongs to her.

This shows the painful rivalry that has existed between the sisters for years.

💔 Leah still feels unloved

❤️ Rachel has always had Jacob's affection

😢 Years of hurt come to the surface

➡️ Rachel offers an exchange

---

## 🤝 Therefore He Shall Lie With Thee Tonight For Thy Son's Mandrakes

Rachel agrees to trade.

She tells Leah that Jacob can spend the night with Leah in exchange for the mandrakes.

It appears that Rachel normally decided whose tent Jacob would stay in.

For Leah, this trade means another opportunity to have a child.

For Rachel, the mandrakes seem valuable enough to exchange a night with Jacob.

🤝 Rachel trades a night with Jacob

🌿 Leah gives Rachel the mandrakes

👶 Both sisters are still seeking more children

➡️ Jacob returns from work

---

## 🌅 Jacob Came Out Of The Field In The Evening

Jacob returns home after spending the day working.

As a shepherd, his work included caring for Laban's sheep and goats, leading them to pasture, protecting them, watering them, and managing the flocks.

After finishing the day's work, he returns from the fields.

🌅 Jacob finishes a day's work

🐑 He has been caring for Laban's flocks

🏠 He returns home that evening

➡️ Leah meets him

---

## 💬 Thou Must Come In Unto Me

Leah meets Jacob before he reaches the tents.

She tells him that he will spend the night with her.

The phrase **"come in unto me"** is a respectful biblical expression meaning she is inviting Jacob to have marital relations with her.

Leah believes she has the right because of the agreement she made with Rachel.

💬 A biblical expression for marital relations

🤝 Leah reminds Jacob of the agreement

➡️ Leah explains why

---

## 💰 I Have Surely Hired Thee With My Son's Mandrakes

Leah tells Jacob that she has **"hired"** him.

She does not mean Jacob is literally being bought.

She means she exchanged Reuben's mandrakes with Rachel in return for Jacob spending the night with her.

The verse highlights how unusual and strained this family situation had become.

Instead of enjoying a peaceful marriage, the sisters are bargaining with one another over time with their husband.

💰 Leah traded the mandrakes

🤝 Rachel agreed to the exchange

💔 The rivalry between the sisters continues

➡️ Jacob stays with Leah

---

## ❤️ He Lay With Her That Night

Jacob spends the night with Leah according to the agreement between the sisters.

This moment leads directly to Leah becoming pregnant again in the verses that follow.

Even through this complicated family situation, God continues carrying out His plan to build the nation of Israel through Jacob's family.

❤️ Jacob stays with Leah

👶 This leads to another pregnancy

📖 God continues working through an imperfect family

# Genesis 30:17–21

# 🙏 Leah Conceives Again

---

## 🙏 God Hearkened Unto Leah

The word **hearkened** means **God listened and responded.**

This does not mean God had ignored Leah before.

It means God heard her prayers and acted on her behalf.

After Leah spent the night with Jacob, God allowed her to become pregnant once again.

Throughout Genesis, we repeatedly see that children ultimately come from God.

🙏 Hearkened means God listened and responded

👂 God heard Leah's prayers

👶 God allowed Leah to conceive again

➡️ Leah gives birth to another son

---

## 👶 She Bare Jacob The Fifth Son

Leah gives birth to **Jacob's fifth son**.

Although this is Leah's fifth son personally, he is **Jacob's ninth child overall**.

By this point, Jacob's family is growing rapidly as God continues building the nation He promised to Abraham.

👶 Leah gives birth to her fifth son

👨‍👩‍👧‍👦 He is Jacob's ninth child

📖 God's promise continues through Jacob's family

➡️ Leah names him Issachar

---

## 💰 God Hath Given Me My Hire

**Hire** means **payment**, **reward**, or **wages**.

Leah believes God has rewarded her.

She connects this blessing to the fact that she gave her servant Zilpah to Jacob earlier.

Leah is not saying she earned God's blessing.

She is simply expressing that she believes God has graciously rewarded her with another son.

💰 Hire means reward or wages

🙏 Leah believes God has rewarded her

👶 God blesses her with another son

➡️ She names him Issachar

---

## 👶 She Called His Name Issachar

The name **Issachar** is connected with the idea of **reward**, **wages**, or **compensation**.

Leah chooses this name because she believes God has rewarded her by giving her another son.

Like the names of her other children, Issachar's name reflects Leah's thoughts at the time of his birth.

👶 Issachar means reward or wages

🙏 Leah sees this son as God's blessing

📖 His name remembers God's provision

➡️ Leah conceives again

---

## 👶 Leah Conceived Again

Leah becomes pregnant once more.

She gives birth to **her sixth son**.

At this point, Leah has become the mother of more sons than anyone else in Jacob's household.

God continues blessing her with children even though she has long struggled to receive Jacob's affection.

👶 Leah has a sixth son

🏠 Her household continues growing

🙏 God continues blessing Leah

➡️ Leah speaks again

---

## 🎁 God Hath Endued Me With A Good Dowry

The word **endued** means **blessed**, **honored**, or **graciously given.**

A **dowry** was something valuable connected with marriage.

Here, Leah is not speaking about money or property.

She is saying that God has richly blessed her by giving her six sons.

To Leah, her children are a priceless gift from God.

🎁 Endued means richly blessed

💎 Dowry refers to a valuable gift

👶 Leah sees her sons as God's precious blessing

➡️ Leah hopes Jacob will remain close to her

---

## 🏠 Now Will My Husband Dwell With Me

The word **dwell** means **to live with**, **remain with**, or **stay close to.**

Leah hopes that after giving Jacob six sons, he will finally spend more of his time with her.

This reveals that, despite all of God's blessings, Leah still longs for her husband's affection.

Even after six sons, she still desires the love she has been missing.

🏠 Dwell means remain or stay close

❤️ Leah hopes Jacob will choose her more often

💔 She still longs for his affection

➡️ She names her son Zebulun

---

## 👶 She Called His Name Zebulun

The name **Zebulun** is connected with the idea of **dwelling**, **honor**, or **living together.**

Leah chooses this name because she hopes Jacob will now remain with her more often after she has given him six sons.

Once again, the name reflects her deepest desire for her husband's love.

👶 Zebulun is connected with dwelling or honor

❤️ Leah hopes Jacob will remain close to her

📖 His name reflects her longing for love

➡️ Leah has one more child

---

## 👧 Afterwards She Bare A Daughter

After giving birth to six sons, Leah gives birth to a daughter.

She names her **Dinah**.

Dinah is Jacob's only daughter specifically mentioned by name in Genesis.

Jacob likely had other daughters (Genesis 37:35 mentions "daughters"), but Dinah becomes important because of the events recorded later in Genesis 34.

👧 Leah gives birth to a daughter

📖 Dinah is the only daughter named in Genesis

➡️ Her story becomes important later

---

## 👨‍👩‍👧‍👦 Jacob's Family Continues To Grow

By this point in the story, Jacob's household includes:

- 👩 **Leah:** Reuben, Simeon, Levi, Judah, Issachar, Zebulun, and Dinah
- 👩 **Bilhah:** Dan and Naphtali
- 👩 **Zilpah:** Gad and Asher
- 👩 **Rachel:** Still waiting for God to open her womb

So far, Jacob has **eleven children**:

- 👦 **Ten sons** through Leah, Bilhah, and Zilpah
- 👧 **One daughter**, Dinah

One more son, **Joseph**, will soon be born to Rachel, and Benjamin will be born later, completing the twelve sons who become the fathers of the **twelve tribes of Israel**.

👨‍👩‍👧‍👦 Jacob's family is still growing

👦 Ten sons have been born so far

👧 Dinah is his only named daughter

📖 God is preparing the future nation of Israel

# Genesis 30:22–24

# 👶 The Birth Of Joseph

---

## 🙏 God Remembered Rachel

When the Bible says **God remembered Rachel**, it does **not** mean God had forgotten about her.

The word **remembered** means **God chose to act on His promises and respond at the appointed time.**

We have seen this before.

After the flood, **"God remembered Noah"** (Genesis 8:1). God had never forgotten Noah, but that was the moment He began changing Noah's circumstances by causing the floodwaters to recede.

The same thing happens here.

God had always seen Rachel's pain and heard her prayers.

Now, in His perfect timing, He acts.

🙏 Remembered means God acted at the right time

🌊 Just as God remembered Noah after the flood

❤️ God had never forgotten Rachel

➡️ God responds to her prayers

---

## 👂 God Hearkened To Her

**Hearkened** means **God listened and responded.**

Rachel had spent years longing for a child.

She had watched Leah, Bilhah, and Zilpah have children while she remained barren.

She had prayed, cried, and waited.

Now God answers those prayers.

This reminds us that although God's answers may seem delayed, He still hears the prayers of His people.

👂 Hearkened means God listened and responded

🙏 Rachel's prayers are finally answered

⏳ God's timing is often different from ours

➡️ God opens her womb

---

## 👶 He Opened Her Womb

To **open her womb** means God allowed Rachel to become pregnant.

For many years, Rachel had been unable to have children.

By this point in the story, Jacob already has **eleven children** through Leah, Bilhah, and Zilpah.

Rachel has watched child after child be born while waiting for her own.

Now God changes her situation.

The child she gives birth to will become one of the most important people in Genesis.

👶 God allows Rachel to conceive

👨‍👩‍👧‍👦 Eleven children have already been born

🙏 God changes Rachel's situation

➡️ Rachel gives birth

---

## 👶 She Conceived And Bare A Son

Rachel finally gives birth to her first son.

This is the child she has prayed for over many years.

For Rachel, this birth is more than becoming a mother.

It is the end of years of disappointment, waiting, and sorrow.

God has finally answered her deepest prayer.

👶 Rachel becomes a mother

❤️ Years of waiting come to an end

🙏 God answers her prayer

➡️ Rachel praises God

---

## 😊 God Hath Taken Away My Reproach

**Reproach** means **shame**, **disgrace**, or **public embarrassment.**

In Rachel's culture, being unable to have children often brought deep personal sorrow and social shame.

Rachel had carried that burden for many years.

Now she believes God has removed that shame by giving her a son.

She no longer feels defined by her barrenness.

😊 Reproach means shame or disgrace

👶 Rachel no longer feels ashamed

🙏 She gives God the credit

➡️ She names her son

---

## 👦 She Called His Name Joseph

The name **Joseph** means **"may he add"** or **"he will add."**

Rachel chooses this name because she believes God is not finished blessing her.

Joseph's name reflects both gratitude for the son she has received and hope for another son in the future.

Joseph will become one of the most important figures in the entire book of Genesis.

Through him, God will preserve Jacob's family during the coming famine.

👦 Joseph means "may he add"

🙏 Rachel thanks God for her son

📖 Joseph will become a key figure in Genesis

➡️ Rachel hopes for another child

---

## ➕ The Lord Shall Add To Me Another Son

Rachel is already looking ahead.

After waiting so many years for her first child, she prays that God will bless her with another.

Her hope is eventually fulfilled.

Years later, Rachel gives birth to **Benjamin**, Jacob's youngest son.

Sadly, Rachel dies while giving birth to him (Genesis 35).

This verse shows that Rachel's faith and hope have replaced the despair she once felt.

➕ Rachel prays for another son

🙏 She believes God will continue to bless her

👶 God later gives her Benjamin

📖 Her story continues in the chapters ahead

# Genesis 30:25–33

# 🤝 Jacob Makes A Deal With Laban

---

## 🏠 When Rachel Had Born Joseph

Joseph's birth marks a turning point in Jacob's life.

By now, Jacob has completed the fourteen years he promised Laban for Leah and Rachel.

What began as a short stay to escape Esau has become a completely different life.

Jacob arrived alone with almost nothing.

Now, fourteen years later, he has two wives, two servant wives, eleven sons, one daughter, and a large household.

He knows it is finally time to return home.

🏠 Fourteen years have passed

👨‍👩‍👧‍👦 Jacob now has a large family

➡️ He is ready to return to Canaan

---

## 🚶 Send Me Away

Jacob asks Laban,

**"Send me away, that I may go unto my own place, and to my own country."**

He is asking for permission to leave.

In that culture, Jacob had entered Laban's household under an agreement.

Before taking his family and leaving, it was considered honorable to settle matters with the head of the household.

Jacob is not running away.

He wants to leave the right way.

🚶 Jacob asks to leave respectfully

🤝 He wants to end their agreement honorably

🏠 His goal is to return home

---

## 👨‍👩‍👧 Give Me My Wives And My Children

Jacob reminds Laban,

**"These are the family I worked for."**

He spent fourteen years earning the right to marry Leah and Rachel.

Now he wants to take his wives and children and build his own household.

Jacob is no longer the young man who arrived with nothing.

He is now the head of a growing family.

👨‍👩‍👧 Jacob has earned his family

⏳ Fourteen years of service are complete

🏠 He wants to build his own household

---

## 💪 Thou Knowest My Service Which I Have Done Thee

Jacob reminds Laban of everything he has done.

For fourteen years he faithfully cared for Laban's animals, property, and business.

Laban knows Jacob has worked honestly and diligently.

Jacob is appealing to that record of faithful service.

💪 Jacob worked faithfully

🐑 He cared for Laban's business

📖 Laban knew Jacob's character

---

## 🙏 Tarry

**Tarry** means **stay** or **remain.**

Laban does not want Jacob to leave.

By this point, Laban realizes his own wealth has grown because God has been blessing Jacob.

Instead of saying goodbye, he asks Jacob to stay longer.

🙏 Tarry means stay

💰 Laban wants Jacob to remain

➡️ He explains why

---

## 📈 The Lord Hath Blessed Me For Thy Sake

Laban admits something important.

He says,

**"The Lord hath blessed me because of you."**

Laban recognizes that ever since Jacob arrived, everything has prospered.

This echoes what happened with Abraham.

God's blessing on Abraham overflowed onto those around him.

Now the same covenant blessing is resting on Jacob.

Laban does not credit Jacob's skill alone.

He recognizes that the Lord is the true source of the blessing.

📈 Laban's wealth has greatly increased

🙏 He recognizes God's blessing

📖 God's covenant blessing continues through Jacob

---

## 💰 Appoint Me Thy Wages

Laban tells Jacob,

**"Name your price."**

**Wages** means the payment someone receives for their work.

Laban is willing to negotiate because he wants Jacob to stay.

He believes keeping Jacob is worth almost any price.

💰 Wages means payment for work

🤝 Laban lets Jacob choose his payment

➡️ Jacob makes an unusual request

---

## 🐑 Thou Knowest How I Have Served Thee

Jacob reminds Laban how faithfully he has cared for the flocks.

When he says,

**"Thy cattle was with me,"**

he means the animals were under his care.

He fed them, protected them, bred them, and managed them.

Jacob is pointing to years of faithful work.

🐑 Jacob cared for Laban's animals

🛡️ He protected and managed the flocks

📖 Laban had seen Jacob's faithfulness

---

## 📈 It Was Little Before I Came

Jacob reminds Laban where everything started.

Before Jacob arrived, Laban's flocks were much smaller.

Now they have grown into a great multitude.

Again, Jacob does not take credit for the increase.

He points to the Lord.

Just as God blessed Abraham's household, God is now blessing Jacob's work.

📈 Laban started with much less

🐑 His flocks multiplied greatly

🙏 God caused the increase

---

## 🏡 When Shall I Provide For Mine Own House Also?

Jacob says,

**"Now it's time for me to provide for my own family."**

For fourteen years, Jacob has worked to increase someone else's wealth.

Now he has wives, children, and a household of his own.

He wants to begin building an inheritance for them.

🏡 Jacob wants to provide for his own family

👨‍👩‍👧‍👦 His household has grown

💰 It is time to build his own wealth

---

## 🙅 Thou Shalt Not Give Me Anything

Jacob surprises Laban.

Instead of asking for silver, gold, or livestock upfront, he says,

**"Don't give me anything."**

Like Abraham before him, Jacob does not ask for gifts.

Instead, he proposes an arrangement where God can bless his work.

Jacob trusts that if the Lord is with him, his own flocks will grow.

🙅 Jacob asks for no gifts

🙏 He trusts God to provide

➡️ He proposes a different payment

---

## 🐐 Removing All The Speckled And Spotted Cattle

Jacob offers an unusual deal.

He will continue caring for Laban's flocks.

As payment, he will keep only the animals that are:

- 🟤 Brown among the sheep
- ⚪⚫ Speckled or spotted among the goats

These animals were less common than the solid-colored animals.

At first glance, Jacob's request seems like a poor bargain.

Laban keeps the majority of the flock, while Jacob receives only the unusual-colored animals that are born.

🐐 Jacob chooses the uncommon animals

⚪ Speckled and spotted goats

🟤 Brown sheep

📖 It seems like a humble request

---

## 💰 Of Such Shall Be My Hire

**Hire** means **payment** or **wages.**

Jacob's salary will not be money.

Instead, every qualifying animal born into the flock will belong to him.

As the years pass, his own flock can grow naturally.

This arrangement depends entirely on God's blessing rather than Jacob demanding wealth upfront.

💰 Hire means payment

🐑 Jacob's wages are certain animals

🙏 He trusts God to bless the arrangement

---

## ⚖️ So Shall My Righteousness Answer For Me

Jacob wants everything to be completely honest.

His **righteousness** refers to his integrity and honesty.

If anyone checks his flocks later, it will be easy to see whether he has stolen anything.

Only the agreed-upon animals should belong to Jacob.

He wants his character to speak for itself.

⚖️ Righteousness refers to honest conduct

🤝 Jacob wants a transparent agreement

📖 His integrity will prove he has not cheated

---

## 🚫 That Shall Be Counted Stolen From Me

Jacob sets one final condition.

If any animal is found among his flock that does **not** match the agreement, it should be considered stolen.

He is making it impossible for Laban to accuse him of dishonesty later.

Jacob wants the arrangement to be clear, fair, and easy for everyone to verify.

🚫 Jacob welcomes accountability

🐑 Only the agreed animals belong to him

🤝 The agreement protects both men

# Genesis 30:34–36

# 🐐 Laban Changes The Deal

---

## 🤝 Behold, I Would It Might Be According To Thy Word

Laban agrees to Jacob's proposal.

He is saying,

**"I agree. Let's do exactly what you suggested."**

From Laban's point of view, this seems like an excellent deal.

Since speckled, spotted, and brown animals were less common, Laban probably assumes Jacob will end up with very little.

Laban believes the agreement favors him.

🤝 Laban accepts Jacob's proposal

🐑 He believes he will keep most of the flock

📖 The deal seems to favor Laban

➡️ Laban immediately takes action

---

## 🐐 He Removed The He Goats That Were Ringstraked And Spotted

A **he goat** is a **male goat**.

**Ringstraked** means the animal had **stripes or bands of color** on its body.

**Spotted** means it had large patches of different colors.

Laban immediately removes every male goat that already matches Jacob's future payment.

Instead of leaving them in the flock, he separates them.

🐐 He goat means a male goat

⚪ Ringstraked means striped

⚫ Spotted means marked with patches of color

➡️ Laban removes them from the flock

---

## 🐐 All The She Goats That Were Speckled And Spotted

A **she goat** is a **female goat**.

**Speckled** means covered with many small spots.

**Spotted** usually refers to larger patches of color.

Laban removes every female goat that already has these markings.

By removing both the males and females, he greatly reduces the chance that more spotted animals will be born.

🐐 She goat means a female goat

⚪ Speckled means small spots

⚫ Spotted means larger patches

📖 Laban removes them all

➡️ He continues separating the flock

---

## 🐑 Everyone That Had Some White In It, And All The Brown Among The Sheep

Laban also removes every sheep that matches Jacob's agreement.

Any sheep with white markings or brown-colored wool is taken away.

He leaves Jacob only the ordinary solid-colored animals to care for.

Laban is trying to make sure Jacob starts with nothing.

🐑 Laban removes the qualifying sheep

📖 Jacob is left with the ordinary flock

⚠️ Laban makes the deal harder for Jacob

➡️ The animals are separated

---

## 👨‍👦 Gave Them Into The Hand Of His Sons

Laban places all of the removed animals into the care of **his own sons**.

This was more than simply assigning someone to watch them.

By giving them to his sons, Laban keeps them completely separate from Jacob's flock.

This prevents those animals from breeding with the ones Jacob is caring for.

It appears Laban is trying to make it as difficult as possible for Jacob to increase his own flock.

👨‍👦 Laban gives the animals to his sons

🐑 They are kept separate from Jacob's flock

⚠️ Laban makes the agreement even harder for Jacob

➡️ Laban increases the distance

---

## 🚶 He Set Three Days' Journey Betwixt Him And Jacob

**Betwixt** means **between**.

A **three days' journey** means Laban moves these animals far away from Jacob.

This creates a huge distance between the two flocks.

The purpose was to prevent the removed animals from mixing back in with the flock Jacob cared for.

Laban believes this will keep Jacob from gaining many spotted or speckled animals in the future.

🚶 Betwixt means between

📍 The flocks are separated by three days' travel

🐑 The animals cannot mix together

➡️ Jacob continues working

---

## 🐑 Jacob Fed The Rest Of Laban's Flocks

Jacob continues doing exactly what he promised.

He faithfully cares for the animals that remain.

Even though Laban has made the arrangement much more difficult, Jacob keeps working honestly.

What happens next will not be because Jacob tricked Laban.

It will happen because **God blesses Jacob**, just as He blessed Abraham before him.

🐑 Jacob continues caring for the remaining flock

🤝 He keeps his agreement

🙏 The coming increase will be God's blessing, not Jacob's deception

# Genesis 30:37–43

# 📈 Jacob Prospers

---

## 🌿 Jacob Took Rods Of Green Poplar, Hazel, And Chestnut Trees

A **rod** is simply a **fresh tree branch** or **stick**.

Jacob cuts branches from three different kinds of trees:

- 🌳 **Poplar**
- 🌳 **Hazel**
- 🌳 **Chestnut**

These were living branches with bark still on them.

God later blesses Jacob's flocks, but Moses first tells us what Jacob physically did while caring for the animals.

🌿 A rod is a tree branch

🌳 Jacob cuts fresh branches

📖 Moses describes Jacob's actions

➡️ Jacob prepares the branches

---

## ⚪ Peeled White Strakes In Them

Jacob peels strips of bark off the branches.

Underneath the bark is lighter-colored wood.

By removing parts of the bark, the branches become striped with dark bark and white wood.

**Strakes** simply means **stripes**.

He is making striped branches.

⚪ Jacob removes strips of bark

🌿 White wood appears underneath

📖 The branches become striped

➡️ Jacob places them before the animals

---

## 💧 He Set The Rods Before The Flocks In The Gutters

The **gutters** were **watering channels** or **feeding areas** where the water collected.

They were not house gutters like we think of today.

The **watering troughs** were long containers or stone basins where the animals came to drink.

Jacob places the striped branches where the animals regularly gathered.

💧 Gutters were watering channels

🐑 Troughs were places where animals drank

🌿 Jacob places the branches there

➡️ The animals gather there

---

## 🐑 They Should Conceive When They Came To Drink

The animals often mated during the time they gathered together at the watering place.

Jacob places the branches where they would be seen during breeding.

Many people in the ancient world believed what animals looked at while mating could influence the appearance of their offspring.

The Bible records what Jacob did.

It does **not** say the branches themselves had magical power.

Later, Jacob explains that **God** is the One who caused his flocks to increase (Genesis 31:9–12).

🐑 The animals gathered there to mate

🌿 Jacob places the branches nearby

🙏 God—not the branches—causes the increase

➡️ The flock grows

---

## 🐐 The Flocks Conceived… And Brought Forth Ringstraked, Speckled, And Spotted

The animals give birth to young that are:

- ⚪ **Ringstraked** — striped
- ⚫ **Speckled** — covered with small spots
- ⚪⚫ **Spotted** — marked with larger patches of color

These are exactly the animals Jacob and Laban agreed would belong to Jacob.

As more of these unusual animals are born, Jacob's own flock begins growing.

🐐 The animals have babies

⚪ Some are striped

⚫ Some are speckled and spotted

📖 These animals now belong to Jacob

➡️ Jacob separates them

---

## 🐑 Jacob Did Separate The Lambs

Whenever animals matching the agreement were born, Jacob separated them from Laban's flock.

He began building his own flock while continuing to care for Laban's.

Little by little, Jacob's wealth started increasing.

🐑 Jacob separates his animals

📈 His own flock begins growing

🤝 Laban keeps his flock

➡️ Jacob manages both groups

---

## 👀 He Set The Faces Of The Flock Toward The Ringstraked

Jacob arranged the animals so they faced the striped and spotted animals.

Again, this reflects the breeding practices people believed worked in that culture.

The important point is not the branches or where the animals looked.

The important point is that **God was blessing Jacob**, just as He had promised.

👀 Jacob arranges the animals

📖 This reflects ancient breeding practices

🙏 God's blessing is the true reason for the increase

➡️ Jacob separates the flocks

---

## 🚫 He Put His Own Flocks By Themselves

Jacob keeps his growing flock separate from Laban's flock.

This prevents confusion over which animals belong to whom.

Everything remains visible and honest, just as Jacob promised earlier.

🐑 Jacob keeps the flocks separate

🤝 The agreement remains clear

📖 Each man's animals are easy to identify

➡️ Jacob continues managing the breeding

---

## 💪 The Stronger Cattle Did Conceive

Jacob paid attention to the healthiest and strongest animals.

When the stronger animals bred, he followed the same process with the branches.

When the weaker animals bred, he did not.

As a result, the stronger offspring mostly became part of Jacob's flock, while many of the weaker animals remained with Laban.

Whether Jacob understood animal breeding well or not, Genesis later makes it clear that **God** was directing the outcome.

💪 Jacob uses the strongest breeding animals

🐑 The weaker animals mostly remain with Laban

🙏 God's blessing is behind Jacob's success

➡️ Jacob becomes wealthy

---

## 📈 The Man Increased Exceedingly

Jacob's wealth grows rapidly.

His flock becomes very large.

As his animals multiply, so does everything else he owns.

Soon he has:

- 🐑 Large flocks
- 👨 Male servants
- 👩 Female servants
- 🐪 Camels
- 🫏 Donkeys

Just as God blessed Abraham, He is now blessing Jacob.

God's covenant promises are continuing through the next generation.

📈 Jacob becomes very wealthy

🐑 His flocks multiply greatly

👨‍👩‍👧 His household continues growing

🙏 God's covenant blessing is clearly seen in Jacob's life`;

export const GENESIS_THIRTY_PERSONAL_SECTIONS = parseGenesisThirtyRawNotes(GENESIS_THIRTY_RAW_NOTES);
