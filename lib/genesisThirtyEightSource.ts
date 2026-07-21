export type GenesisThirtyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtyEightRawNotes(rawText: string): GenesisThirtyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+38:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 38 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+38:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+38:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 38 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 38,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 38:${startVerse}` : `Genesis 38:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Genesis 38 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_EIGHT_RAW_NOTES = `# Genesis 38:1–5

# 📖 Judah's Descendants

---

## 📖 And It Came To Pass At That Time

Genesis 38 continues the story of **Jacob's descendants**.

We have already met Joseph and his brothers.

Joseph was Jacob's favorite son. Jacob gave him the coat of many colours, which became a visible sign of the special love and honor Joseph received from his father.

Joseph's brothers hated him because of that favoritism and because of the dreams that showed them bowing before him.

When Joseph came to check on them, they plotted to kill him. Instead, Judah suggested that they sell him into slavery.

Afterward, they covered Joseph's coat with goat's blood and allowed Jacob to believe that his beloved son had been torn apart by a wild animal.

Genesis 37 ended with Jacob mourning deeply while his sons knew Joseph was still alive.

Now the story turns toward **Judah**, the brother who proposed selling Joseph.

This chapter shows what began happening in Judah's life after the terrible thing he had done.

👕 Joseph's coat was used to deceive Jacob

⛓️ Judah helped sell Joseph into slavery

😭 Jacob was left grieving while his sons hid the truth

➡️ Then Judah Went Down From His Brethren

---

## 📖 Then Judah Went Down From His Brethren

Judah left his brothers and separated himself from the family.

The phrase **"went down"** describes Judah leaving the higher country where his family lived and descending toward the lower land around Adullam.

But this was more than a change of location.

Judah had just helped sell Joseph into slavery. He had watched his father recognize the bloody coat, collapse in grief, tear his clothes, put on sackcloth, and weep for Joseph.

Judah knew why Jacob was suffering.

He knew Joseph was not dead.

He knew that he and his brothers had caused all of it.

Every day Judah remained at home, he would have heard Jacob mourning. He would have seen the pain on his father's face and known that he could stop it by telling the truth.

Judah could not remain there and continue facing what he had done, so he left his brothers and moved away from the family.

Good people can do terrible things and still be deeply affected by them afterward.

Sin does not always leave a person feeling victorious. Sometimes the guilt, shame, and consequences become so heavy that the person tries to escape the people and places that remind them of what happened.

Judah left the family, but he could not escape the consequences of his choices.

🏠 Judah separated himself from his brothers

😭 He left while Jacob was still mourning Joseph

💔 Judah was living with the guilt and consequences of what he had done

➡️ And Turned In To A Certain Adullamite

---

## 📖 And Turned In To A Certain Adullamite

An **Adullamite** was a person from **Adullam**, a Canaanite town located southwest of Bethlehem in the lowlands of Canaan.

The phrase **"turned in to"** means Judah went to stay with him, attached himself to him, or became closely associated with him.

Judah did not simply pass through Adullam.

He began building a life there among the Canaanites.

This also seems to have been someone Judah already knew. Judah did not wander into Adullam and suddenly choose a stranger at random. He deliberately went to a particular man who is named in the next phrase.

That means Judah already had a relationship or connection outside his own family that gave him somewhere to go when he decided to leave.

Instead of turning back toward his father and facing what he had done, Judah turned toward the Canaanites.

📍 Adullam was a Canaanite town

🤝 Judah went to stay with someone he already knew

⚠️ He moved away from his covenant family and became connected with the Canaanites

➡️ Whose Name Was Hirah

---

## 📖 Whose Name Was Hirah

The Adullamite man was named **Hirah**.

Hirah became Judah's close companion and appears again later in the chapter.

The fact that Scripture records his name shows that he was not merely a stranger Judah met once.

Judah had an established relationship with him.

When Judah left his brothers, Hirah was the person he turned toward.

That friendship helped pull Judah further into Canaanite society and away from the spiritual direction of Abraham, Isaac, and Jacob.

🤝 Hirah was Judah's close Adullamite companion

📖 He will appear again later in the chapter

➡️ And Judah Saw There A Daughter Of A Certain Canaanite

---

## 📖 And Judah Saw There A Daughter Of A Certain Canaanite

Once Judah settled among the people of Adullam, he saw a Canaanite woman and desired her.

This should immediately stand out because the men in Judah's family had repeatedly been warned against marrying women from Canaan.

Abraham made his servant swear not to take a Canaanite wife for Isaac.

Isaac and Rebekah also instructed Jacob not to marry one of the daughters of Canaan.

The issue was not ethnicity. It was spiritual influence.

The Canaanites worshiped false gods and practiced ways of life that were opposed to the God of Abraham.

Judah knew the pattern established by his family, but he ignored it.

He was already in a damaged place emotionally and spiritually.

He had helped betray his brother, deceived his father, left his family, and surrounded himself with people outside the covenant household.

Now he made another serious decision.

This is how sin often works.

One wrong decision creates pain. Instead of facing the pain, a person runs from it. Then, in that broken state, they make another decision that pulls them even farther away.

⚠️ Judah chose a woman from the Canaanites

📖 Abraham and Isaac had already warned against this

💔 Judah's guilt and separation were leading him into more bad decisions

➡️ Whose Name Was Shuah

---

## 📖 Whose Name Was Shuah

The wording most likely means that **Shuah was the woman's father**.

She was the daughter of a Canaanite man named Shuah.

The Bible never gives the woman's personal name.

Instead, she is identified by her father and by her Canaanite background.

This emphasizes the family and culture Judah was marrying into.

👨 Shuah was the woman's Canaanite father

📖 The woman herself is not named

➡️ And He Took Her

---

## 📖 And He Took Her

The phrase **"he took her"** means Judah took her as his wife.

In biblical language, to "take" a woman often means to marry her and bring her into one's household.

Judah did not merely have a brief encounter with her.

He formed a marriage and began building a family among the Canaanites.

💍 Judah married the Canaanite woman

🏠 He began establishing his own household away from Jacob's family

➡️ And Went In Unto Her

---

## 📖 And Went In Unto Her

The phrase **"went in unto her"** is a respectful biblical expression meaning that Judah had sexual relations with his wife.

Their marriage was consummated, and she soon became pregnant.

❤️ Judah had marital relations with his wife

👶 Their family began to grow

➡️ And She Conceived, And Bare A Son

---

## 📖 And She Conceived, And Bare A Son; And He Called His Name Er

Judah's wife conceived and gave birth to their first son.

Judah named him **Er**.

Er was Judah's firstborn, which meant he would normally have held the place of honor and inheritance among Judah's children.

He will become an important part of the story shortly.

👶 Er was Judah's firstborn son

🏠 He would normally inherit the leading position in Judah's household

➡️ And She Conceived Again

---

## 📖 And She Conceived Again, And Bare A Son; And She Called His Name Onan

Judah's wife became pregnant again and gave birth to another son.

She named him **Onan**.

This time, the mother is the one who names the child.

Onan was Judah's second son and would later be expected to fulfill an important family responsibility after the death of his older brother.

👶 Onan was Judah's second son

📖 His role will become important later in the chapter

➡️ And She Yet Again Conceived

---

## 📖 And She Yet Again Conceived, And Bare A Son, And Called His Name Shelah

Judah's wife conceived a third time and gave birth to **Shelah**.

Judah now had three sons:

**Er, Onan, and Shelah.**

These three sons would all become connected to Tamar and to the continuation of Judah's family line.

👶 Shelah was Judah's third son

👨‍👦‍👦 Judah now had three male descendants

➡️ And He Was At Chezib When She Bare Him

---

## 📖 And He Was At Chezib When She Bare Him

**Chezib** was a town in the lowland region of Canaan, probably the same place later known as **Achzib**.

Judah was at Chezib when Shelah was born.

This detail shows how far Judah's life had shifted from his father's household.

He had left his brothers, attached himself to Hirah, married a Canaanite woman, and was now raising children in Canaanite territory.

The location matters because it shows that Judah's separation from the family was not temporary.

He had settled into a completely different life.

📍 Chezib was a town in the Canaanite lowlands

🏠 Judah had established a life away from Jacob and his brothers

➡️ Judah Takes A Wife For Er

# Genesis 38:6–12

# 👰 Tamar And Judah's Sons

---

## 👰 And Judah Took A Wife For Er His Firstborn, Whose Name Was Tamar

Judah arranged a wife for his oldest son, **Er**.

Her name was **Tamar**.

The Bible does not tell us who Tamar's parents were or provide much information about her background. However, since Judah was living among the Canaanites and had married a Canaanite woman himself, Tamar was most likely from the surrounding Canaanite population.

It is not surprising that Judah chose a Canaanite wife for his son.

Judah had already married into the Canaanites, and his three sons were half Canaanite. They were being raised in Canaanite territory and surrounded by Canaanite customs, culture, and religion.

Instead of leading his family back toward the example of Abraham, Isaac, and Jacob, Judah was doubling down and planting his family even more deeply among the people of Canaan.

💍 Tamar became the wife of Judah's firstborn son

🏠 Judah continued building his family among the Canaanites

⚠️ His descendants were becoming increasingly connected to Canaanite culture

➡️ And Er, Judah's Firstborn, Was Wicked In The Sight Of The Lord

---

## 👁️ And Er, Judah's Firstborn, Was Wicked In The Sight Of The Lord

The word **"wicked"** means morally evil, corrupt, or deeply sinful.

Er was not merely immature or imperfect. Something about the way he lived was seriously evil before God.

The phrase **"in the sight of the Lord"** means God saw Er's actions and judged them for what they truly were.

Other people may not have known everything Er was doing, but nothing was hidden from God.

Er may have participated in the idolatry, sexual immorality, violence, cruelty, or abuse common among the surrounding Canaanites.

He may also have mistreated Tamar.

Whatever he did, it was evil enough for God to bring immediate judgment upon him.

Er had grown up with a father from a troubled family, a Canaanite mother, and the influence of Canaanite society all around him. That environment did not help guide him toward a godly life.

But Er was still responsible for the wickedness he chose.

👁️ God saw everything Er did

⚠️ "Wicked" means deeply evil and corrupt

💔 Er's upbringing exposed him to ungodly influences

➡️ And The Lord Slew Him

---

## 💀 And The Lord Slew Him

The word **"slew"** means **killed**.

God brought direct judgment upon Er and took his life.

This was not simply a random death.

The verse directly connects Er's death with his wickedness before the Lord.

Er was Judah's firstborn son and would normally have carried Judah's name, inheritance, and family line forward.

Instead, his wicked life brought his future to an immediate end.

⚖️ God judged Er's wickedness

💀 "Slew" means that God took his life

👑 Judah's firstborn died without leaving an heir

➡️ And Judah Said Unto Onan

---

## 👨‍👦 And Judah Said Unto Onan, Go In Unto Thy Brother's Wife, And Marry Her, And Raise Up Seed To Thy Brother

After Er died without leaving a child, Judah instructed his second son, **Onan**, to marry Tamar.

This followed an ancient family custom later written into Israel's Law in **Deuteronomy 25:5–10**.

It is known as **levirate marriage**.

If a married man died without producing a son, his brother was expected to marry the widow and give her a child.

The first son born from that relationship would legally continue the name and inheritance of the brother who had died.

The living brother served in the place of the dead brother so that his family line would not disappear.

Judah's household possessed livestock, servants, wealth, and an inheritance connected to Jacob's family. Continuing Er's line was therefore extremely important.

👨‍👦 Onan was expected to marry Tamar

📜 This custom was later included in the Law of Moses

👶 Their first son would continue Er's family line

➡️ And Onan Knew That The Seed Should Not Be His

---

## 🌱 And Onan Knew That The Seed Should Not Be His

Onan understood exactly what Judah was asking him to do.

Under the custom of levirate marriage, the first son born to Tamar would legally be considered **Er's heir**, not Onan's. That child would inherit the portion of the family estate that belonged to Er, the firstborn.

As the oldest surviving son, Onan stood to receive a larger inheritance if Er never had an heir.

By giving Tamar a son, Onan would lose both wealth and status.

His problem was never that he misunderstood the custom.

He fully understood it.

He simply chose his own financial gain over his responsibility to his brother and to Tamar.

🌱 Onan knew exactly what was expected of him

💰 Er's future son would receive the firstborn's inheritance

⚖️ Selfishness became more important than obedience

➡️ And It Came To Pass…He Spilled It On The Ground

---

## 🚫 And It Came To Pass, When He Went In Unto His Brother's Wife, That He Spilled It On The Ground, Lest That He Should Give Seed To His Brother

The phrase **"it came to pass"** simply means **"it happened"** or **"it came about."**

Whenever Onan had relations with Tamar, he deliberately prevented her from becoming pregnant.

He wanted the pleasure of the relationship without fulfilling the responsibility that came with it.

The verse even tells us **why** he did it:

**"Lest that he should give seed to his brother."**

He intentionally refused to provide an heir for Er because he wanted to protect his own inheritance.

This passage is often misunderstood.

Onan's sin was **not masturbation**.

His sin was selfishly exploiting Tamar while deliberately refusing to fulfill the covenant responsibility God expected of him.

He used Tamar for his own desires while denying her the child and security she was entitled to receive.

🚫 Onan intentionally prevented Tamar from becoming pregnant

💔 He used Tamar while refusing his responsibility

💰 His motivation was protecting his own inheritance

➡️ And The Thing Which He Did Displeased The Lord

---

## ⚖️ And The Thing Which He Did Displeased The Lord

God saw far more than Onan's outward actions.

He saw his heart.

Onan knowingly disobeyed his family duty, deceived Tamar, dishonored his deceased brother, and acted entirely out of selfish ambition.

What displeased the Lord was not simply one act.

It was a pattern of greed, deception, and refusing to do what was right while taking advantage of someone who depended on him.

God cares not only about what people do but also about the motives behind their actions.

⚖️ God judged both actions and motives

💔 Onan chose selfishness over responsibility

👁️ Nothing is hidden from the Lord

➡️ Wherefore He Slew Him Also

---

## ☠️ Wherefore He Slew Him Also

The word **"wherefore"** means **"because of this"** or **"for this reason."**

The word **"slew"** means **"killed."**

Because of Onan's deliberate rebellion, God judged him just as He had judged Er.

Judah had now lost **two sons**.

The family he was trying to establish among the Canaanites was falling apart.

These repeated tragedies would eventually humble Judah and begin changing his heart.

☠️ God judged Onan for his deliberate rebellion

👨‍👦 Judah lost a second son

📖 God's justice is impartial, even within His covenant family

➡️ Then Said Judah To Tamar

---

## 🏠 Then Said Judah To Tamar, Remain A Widow At Thy Father's House

After the death of Er and Onan, Judah told Tamar to return to her father's house and remain a widow.

In the ancient world, widows had very little protection or financial security unless a family cared for them. By returning to her father's house, Tamar would once again depend on her own family for provision.

According to the custom of levirate marriage, Judah was responsible for making sure Tamar eventually married his next son, Shelah. Sending her away was meant to be temporary while Shelah was still too young.

🏠 Tamar returned to her father's home

💔 She remained a widow without children

⏳ Judah delayed what should eventually happen

➡️ Till Shelah My Son Be Grown

---

## 👦 Till Shelah My Son Be Grown

**Shelah** was Judah's youngest son.

At this point, he was not old enough to marry Tamar.

Judah told Tamar to wait until Shelah became an adult. On the surface, this sounded like a reasonable plan and gave Tamar hope that one day she would still have a husband and an heir.

However, Judah's words would eventually prove to be only a promise. As the story continues, he never intends to give Shelah to Tamar.

👦 Shelah was still too young to marry

⏳ Tamar was told to wait

📖 Judah made a promise he would not keep

➡️ For He Said, Lest Peradventure He Die Also, As His Brethren Did

---

## 😟 For He Said, Lest Peradventure He Die Also, As His Brethren Did

The word **"peradventure"** means **"perhaps"** or **"maybe."**

Judah was afraid of losing his last remaining son.

After burying both Er and Onan, he began to believe that Shelah might die as well if he married Tamar.

Instead of recognizing that God judged Er and Onan because of **their own wickedness**, Judah wrongly associated Tamar with their deaths.

Grief had clouded Judah's judgment.

Ironically, Judah was now experiencing the same fear of losing children that his own father, Jacob, had experienced.

😟 Judah feared losing his last son

💭 "Peradventure" means "perhaps" or "maybe"

💔 Grief caused Judah to blame the wrong person

➡️ And Tamar Went And Dwelt In Her Father's House

---

## 🏡 And Tamar Went And Dwelt In Her Father's House

Tamar obeyed Judah and returned to her father's house to wait.

She did exactly what was asked of her.

Her life was placed on hold. She had no husband, no children, and no clear future until Judah fulfilled his promise concerning Shelah.

Tamar waited patiently, trusting that Judah would eventually do what was right.

🏡 Tamar obediently returned to wait

⏳ Her future depended on Judah keeping his word

➡️ This period of waiting sets the stage for what follows

# Genesis 38:13–19

# 🎭 Tamar Tricks Judah

---

## 🐑 And It Was Told Tamar, Saying, Behold, Thy Father In Law Goeth Up To Timnath To Shear His Sheep

Someone informed Tamar that her father-in-law, Judah, was traveling to **Timnath** for the annual sheep shearing.

Sheep shearing was one of the biggest events of the year. After months of caring for the flocks, shepherds gathered to shear the sheep, sell wool, conduct business, and celebrate. It was a time of feasting, drinking, and rejoicing because it marked the reward for a year's labor.

Tamar immediately understood what this meant.

Judah would be away from home, relaxed, surrounded by celebration, and less guarded than usual.

She had faithfully waited for years for Judah to fulfill his promise to give her Shelah as her husband. Shelah was now fully grown, yet Judah had done nothing.

Tamar realized Judah never intended to keep his word.

🐑 Sheep shearing was a joyful celebration.

🍷 It was often accompanied by feasting and drinking.

👀 Tamar recognized this as the opportunity she had been waiting for.

➡️ Tamar Removes Her Widow's Garments

---

## 👗 And She Put Her Widow's Garments Off From Her

For years Tamar had dressed as a widow.

Although the Bible does not describe exactly what a widow's garment looked like, it was clothing that publicly identified a woman whose husband had died. It showed that she remained unmarried and was still in mourning.

Every day she wore those garments, they reminded everyone that she was still waiting.

By taking them off, Tamar was making a deliberate decision.

She had patiently obeyed Judah.

She had honored his instructions.

Now she realized waiting any longer would accomplish nothing because Judah had broken his promise.

Removing her widow's garments marked the beginning of her plan.

💔 Tamar had faithfully waited for years.

👗 Removing the garments symbolized a new course of action.

⚖️ Judah's broken promise led Tamar to act.

➡️ Tamar Disguises Herself

---

## 🧕 And Covered Her With A Veil, And Wrapped Herself

Tamar covered her face with a veil so no one would recognize her.

The phrase **"wrapped herself"** means she completely disguised her appearance.

In the ancient Near East, prostitutes—especially cult prostitutes connected with pagan worship—sometimes concealed themselves while sitting near roads or city entrances where travelers would pass.

The veil hid Tamar's identity.

Judah would see only what appeared to be a prostitute waiting for customers.

Her disguise was carefully planned.

She wanted Judah to judge only by what he saw.

🎭 Tamar completely hid her identity.

🧕 The veil prevented Judah from recognizing her.

👀 Her disguise was part of a carefully planned strategy.

➡️ Tamar Waits By The Road

---

## 🚪 And Sat In An Open Place, Which Is By The Way To Timnath

Tamar positioned herself beside the road leading to Timnath.

The **"open place"** was likely a well-known public location near the entrance to the town where travelers regularly passed.

She did not randomly choose this location.

She knew Judah would have to travel this road to reach the sheep-shearing celebration.

If she wanted Judah to see her, this was the perfect place to wait.

Everything about Tamar's plan had been carefully thought through.

📍 Tamar positioned herself where Judah would certainly pass.

🚶 The road to Timnath was heavily traveled.

🎯 Every detail of her plan was intentional.

➡️ Tamar's Motivation Is Explained

---

## ⏳ For She Saw That Shelah Was Grown, And She Was Not Given Unto Him To Wife

This verse explains Tamar's motivation.

Years had passed.

Shelah was now an adult.

Judah had promised Tamar that once Shelah was old enough, she would become his wife.

Instead, Judah ignored his promise.

Tamar realized she had been deceived.

She had faithfully remained a widow while Judah quietly refused to do what was right.

She was no longer willing to sit and wait for something that was never going to happen.

⏳ Shelah had reached marriageable age.

💔 Judah broke the promise he had made.

⚖️ Tamar realized she had been treated unjustly.

➡️ Judah Sees Tamar

---

## 💃 When Judah Saw Her, He Thought Her To Be An Harlot

A **harlot** is a prostitute—a woman who received payment in exchange for sexual relations.

When Judah saw Tamar sitting beside the road with her face covered, he immediately assumed she was a prostitute.

Notice how quickly Judah reached that conclusion.

He did not appear shocked.

He did not question why she was there.

Instead, he instantly recognized what he believed she was.

Whether Judah had personally visited prostitutes before or simply recognized the situation because prostitution was common, it shows this was not something foreign to him.

His response reveals the condition of his heart.

Instead of walking away, he decided to approach her.

💃 A harlot was a prostitute.

👀 Judah immediately assumed that was who she was.

⚠️ Lust began controlling Judah's decisions.

➡️ The Disguise Works

---

## 😶 Because She Had Covered Her Face

The reason Judah failed to recognize Tamar was because her face was completely hidden.

The disguise worked perfectly.

Judah never imagined the woman sitting beside the road was his own daughter-in-law.

His desire blinded his judgment.

Instead of looking carefully, he acted on impulse.

The veil became the very thing that allowed Tamar's plan to succeed.

🎭 Tamar's identity remained hidden.

👀 Judah never recognized his daughter-in-law.

⚠️ Lust kept him from seeing the truth.

➡️ Judah Approaches Tamar

---

## 👉 And He Turned Unto Her By The Way, And Said, Go To, I Pray Thee, Let Me Come In Unto Thee

As Judah walked past Tamar, he turned toward her and made his intentions clear.

The phrase **"let me come in unto thee"** is a polite King James expression meaning **"let me have sexual relations with you."**

Judah believed he was speaking to a prostitute and was asking to purchase her services.

This reveals something about Judah's character during this period of his life.

He had left the spiritual influence of his father's household, married into the Canaanites, and was now willingly seeking sexual immorality.

Whether this was something Judah had done before or whether it was a moment of weakness, the Bible shows that he was willing to commit the act without hesitation.

His lust overpowered his judgment.

🔥 Judah acted on impulse instead of self-control.

💰 He believed he was purchasing a prostitute's services.

⚠️ Lust often causes people to make decisions they later regret.

➡️ Judah Does Not Recognize Her

---

## 🎭 For He Knew Not That She Was His Daughter In Law

Judah had no idea he was speaking to Tamar.

The disguise had completely worked.

His own daughter-in-law stood before him, yet he never recognized her because the veil concealed her identity.

There is a powerful lesson here.

Sin often blinds people.

Judah was so focused on satisfying his own desires that he failed to see what was actually happening.

Had he recognized Tamar, this entire encounter would have ended immediately.

Instead, his spiritual blindness allowed him to continue walking directly into the trap.

👀 Judah never recognized Tamar.

🎭 Her disguise completely fooled him.

⚠️ Sin often blinds people to what should be obvious.

➡️ Tamar Negotiates Payment

---

## 💬 And She Said, What Wilt Thou Give Me, That Thou Mayest Come In Unto Me?

Tamar immediately spoke as a prostitute would.

She asked Judah what payment he intended to give her.

This was normal.

Prostitutes did not provide their services without receiving compensation.

Tamar was not asking because she wanted money.

She was making sure Judah committed himself before anything happened.

Everything she said kept Judah believing she was exactly who she appeared to be.

Her plan continued to unfold exactly as she intended.

💬 Tamar stayed in character.

💰 Payment was expected before any agreement.

🎯 Every word strengthened Judah's deception.

➡️ Judah Offers A Young Goat

---

## 🐐 And He Said, I Will Send Thee A Kid From The Flock

Judah promised to send Tamar **a kid**, meaning **a young goat**, from his flock.

A young goat was valuable property.

It could provide meat, eventually produce offspring if raised, or be sold for money.

It was a common and respectable form of payment in the ancient world.

Judah did not have a goat with him, so he promised to send one later.

From Judah's perspective, this was a fair payment.

From Tamar's perspective, a promise alone was not enough.

🐐 A "kid" was a young goat.

💰 Livestock often served as a form of payment.

🤝 Judah expected Tamar to trust his promise.

➡️ Tamar Requires A Pledge

---

## 🤝 And She Said, Wilt Thou Give Me A Pledge, Till Thou Send It?

The word **"pledge"** means **security**, **collateral**, or **a guarantee**.

Tamar knew Judah could simply walk away and never return.

She wisely asked him to leave something valuable behind until the goat was delivered.

This was a common business practice in the ancient world.

When someone could not immediately pay a debt, they often left something valuable as collateral to guarantee they would return.

Tamar was thinking several steps ahead.

She wanted proof of Judah's identity.

Not money.

Not jewelry for its value.

She wanted evidence that could never be denied.

🤝 A pledge was collateral guaranteeing payment.

📝 Tamar wanted proof, not merely a promise.

🎯 She was already thinking beyond the young goat.

➡️ Judah Asks What Pledge To Give

---

## ❓ And He Said, What Pledge Shall I Give Thee?

Judah immediately agreed.

Instead of questioning why a prostitute wanted collateral, he simply asked what she wanted him to leave behind.

His desire had become stronger than his caution.

Normally, a person would protect valuable personal possessions.

Instead, Judah was willing to hand over items that identified him personally.

Lust continued clouding his judgment.

❓ Judah quickly agreed to leave collateral.

⚠️ His judgment continued to weaken.

💭 Desire often causes people to ignore obvious risks.

➡️ Tamar Names The Pledge

---

## 💍 And She Said, Thy Signet, And Thy Bracelets, And Thy Staff That Is In Thine Hand

Tamar asked for three very specific items.

**The signet** was Judah's personal seal. It was often engraved with his unique mark and used to stamp documents into soft clay or wax. It functioned much like a modern signature or official ID.

**The bracelets** were most likely the cord or chain attached to the signet seal, allowing it to be worn around the neck or wrist. Together, the signet and cord identified its owner.

**The staff** was Judah's walking stick. It was far more than something to lean on. A man's staff often had unique carvings or markings that identified its owner and represented his authority and position.

Together, these three items were like handing someone your driver's license, passport, signature, and house keys all at once.

Tamar did not choose them because they were expensive.

She chose them because they unmistakably belonged to Judah.

💍 **Signet** — Judah's personal seal and signature.

🪢 **Bracelets (cord)** — Held the signet and identified its owner.

🦯 **Staff** — Judah's personal walking staff and symbol of authority.

Judah was so consumed by lust that he willingly handed over everything needed to identify him.

He never stopped to think about the consequences.

➡️ Judah Hands Over The Pledge

---

## 🤰 And He Gave It Her, And Came In Unto Her, And She Conceived By Him

Judah never stopped to reconsider what he was doing.

Without hesitation, he handed Tamar his signet, his cord, and his staff—the very items that identified him personally. In his desire to satisfy his lust, he willingly gave away possessions that no careful man would normally hand to a stranger.

Then Judah had sexual relations with Tamar.

Unlike Onan earlier in the chapter, Judah made no attempt to prevent Tamar from becoming pregnant. His mind was completely consumed by the moment. He wasn't thinking about consequences, his reputation, or what might happen afterward.

As a result, Tamar conceived.

What began as one sinful decision would now have lifelong consequences.

This is one of the great lessons about sin. In the moment, sin promises pleasure, excitement, and secrecy. It rarely reminds us that every decision has consequences that eventually come to light.

Judah had already spent years moving farther from God. He helped sell Joseph into slavery, separated himself from his covenant family, married into the Canaanites, lost two sons because of wickedness, and lost his wife. Instead of dealing with his grief, guilt, and failures, he continued making one compromise after another.

Sin often works this way.

One bad decision becomes easier to repeat until a person's life begins moving in a direction they never expected.

🔥 Lust clouded Judah's judgment.

💍 He surrendered priceless possessions for a moment of pleasure.

🤰 Tamar conceived, and the consequences had begun.

➡️ Tamar Leaves

---

## 🚶 And She Arose, And Went Away

After everything was finished, Tamar quietly left.

The Bible simply says she arose and went away.

Judah apparently never realized who she really was.

Her plan had succeeded exactly as she intended.

While Judah believed the encounter was over, Tamar knew it had only just begun.

There is a striking contrast between Judah and Tamar.

Judah believed he could simply move on with his life.

Tamar knew this moment would eventually force Judah to face the truth.

Many people treat sin the same way.

They think once the moment has passed, everything is over.

But God sees everything, and what is hidden today often becomes known later.

🚶 Tamar quietly departed.

👀 Judah remained completely unaware.

⏳ The truth would soon come to light.

➡️ Tamar Returns To Her Widow's Clothing

---

## 🧕 And Laid By Her Veil From Her, And Put On The Garments Of Her Widowhood

After leaving, Tamar removed her veil and put her widow's garments back on.

She returned home looking exactly as she had before.

To everyone around her, nothing appeared to have changed.

She once again looked like the faithful widow who had patiently waited for Judah to fulfill his promise.

No one would have guessed what had just taken place.

The disguise had served its purpose.

Tamar's plan was complete.

🎭 The disguise was no longer needed.

👗 Tamar returned to her widow's clothing.

🏠 Outwardly, everything appeared normal.

# Genesis 38:20–23

# 🔍 Hirah Looks For Tamar

---

## 🐐 And Judah Sent The Kid By The Hand Of His Friend The Adullamite, To Receive His Pledge From The Woman's Hand: But He Found Her Not

Judah kept his word.

He sent the promised young goat by the hand of **Hirah the Adullamite**, the same friend first mentioned earlier in the chapter.

By this point, roughly twenty years had passed since Judah left his father's household and settled among the Canaanites.

Yet Hirah was still one of Judah's closest companions.

This shows how deeply Judah had rooted his life among the Canaanites.

Notice that Judah did not go himself.

Instead, he sent Hirah.

The Bible does not explain why, but it may have spared Judah the embarrassment of personally returning to the place where he believed he had hired a prostitute.

When Hirah arrived, Tamar was already gone.

He searched for the woman who possessed Judah's pledge, but he could not find her.

🐐 Judah honored his promise to send the goat.

🤝 Hirah remained Judah's trusted friend after many years.

🔍 Tamar had already disappeared.

➡️ Hirah Asks The Local Men

---

## ❓ Then He Asked The Men Of That Place, Saying, Where Is The Harlot, That Was Openly By The Way Side? And They Said, There Was No Harlot In This Place

Hirah questioned the local men.

He asked where the prostitute who had been sitting beside the road could be found.

Their answer surprised him.

"There was no harlot in this place."

Of course there wasn't.

Tamar had never been a prostitute.

She had only disguised herself as one for a single purpose.

The people living there had never seen such a woman regularly sitting there because Tamar's appearance had been temporary.

Everything had happened exactly according to her plan.

❓ Hirah searched for the woman.

🚫 The local men said no prostitute had been there.

🎭 Tamar's disguise had completely disappeared.

➡️ Hirah Returns Empty-Handed

---

## 📢 And He Returned To Judah, And Said, I Cannot Find Her. And Also The Men Of The Place Said, That There Was No Harlot In This Place

Hirah returned with unexpected news.

He could not find the woman anywhere.

To make matters even stranger, the local people insisted that no prostitute had ever been there.

Judah's possessions were gone.

His signet, cord, and staff were now in Tamar's possession.

Neither Judah nor Hirah had any idea that the woman they were searching for was actually Judah's own daughter-in-law.

Everything Tamar needed to expose Judah was now safely in her hands.

📢 Hirah returned empty-handed.

👀 Judah still knew nothing.

💍 Tamar still possessed Judah's personal belongings.

➡️ Judah Gives Up The Search

---

## 😳 And Judah Said, Let Her Take It To Her, Lest We Be Shamed: Behold, I Sent This Kid, And Thou Hast Not Found Her

Judah made the decision to stop searching.

His concern was no longer recovering his possessions.

His greatest concern was his reputation.

The phrase **"lest we be shamed"** reveals Judah's heart.

He was not worried that he had sinned against God.

He was worried that other people might discover what he had done.

Many people fear public embarrassment more than private sin.

Judah would rather lose his valuable possessions than have everyone talking about the fact that he had tried to hire a prostitute.

He acknowledged that he had done his part by sending the young goat.

Hirah had searched faithfully.

There was nothing more they could do.

Little did Judah know, the evidence of his sin had not disappeared.

It was only waiting for the right moment to be revealed.

😳 Judah feared disgrace more than he feared sin.

🐐 He believed the matter was finished.

⚖️ God was preparing to bring everything into the light.

# Genesis 38:24–26

# 🔥 Judah Changes His Ways

---

## ⏳ And It Came To Pass About Three Months After

About three months had passed since Judah unknowingly had sexual relations with Tamar.

By this point, Tamar's pregnancy would have begun to show.

For three months, neither Judah nor anyone else appears to have known what had happened on the road to Timnath.

Judah likely believed the entire incident was behind him.

He had sent the young goat.

Hirah had searched for the woman.

Nothing had come of it.

But God was about to bring what had been done in secret into the open.

This reminds us that time does not erase sin.

Even when months pass, God is still able to reveal the truth at exactly the right moment.

⏳ Three months had passed since Judah met Tamar.

🤰 Tamar's pregnancy had become visible.

⚖️ The truth was about to be revealed.

➡️ Judah Hears A Report About Tamar

---

## 🗣️ It Was Told Judah, Saying, Tamar Thy Daughter In Law Hath Played The Harlot

Someone informed Judah that Tamar had **"played the harlot."**

This does not necessarily mean they believed she had become a professional prostitute.

The expression means she had acted like a sexually immoral woman by having sexual relations outside of marriage.

Remember, Tamar was still publicly known as Judah's widowed daughter-in-law.

She was expected to remain faithful while waiting for Judah to fulfill his promise regarding Shelah.

Now people believed she had broken that trust.

From everyone's perspective, Tamar had dishonored herself and Judah's family.

Ironically, the man condemning Tamar was the very man responsible for her pregnancy.

🗣️ "Played the harlot" means she was accused of sexual immorality.

👗 Tamar was still expected to live as a widow.

⚖️ Judah judged her without realizing his own guilt.

➡️ The Report Grows More Serious

---

## 🤰 And Also, Behold, She Is With Child By Whoredom

The report became even more serious.

Not only had Tamar been accused of sexual immorality, but she was also pregnant.

The word **"whoredom"** refers to sexual immorality, especially sexual relations outside God's design for marriage.

In the eyes of the community, Tamar's pregnancy seemed to prove the accusation.

No one knew the full story.

Everyone assumed Tamar alone was guilty.

Yet the man who had made her pregnant was standing among those hearing the accusation.

Only God knew the whole truth.

🤰 Tamar's pregnancy appeared to confirm the accusation.

📖 "Whoredom" refers to sexual immorality.

👀 Only God knew who the child's father really was.

➡️ Judah's Harsh Judgment

---

## 🔥 And Judah Said, Bring Her Forth, And Let Her Be Burnt

Judah's response was immediate and severe.

Without asking questions...

Without investigating...

Without showing mercy...

He demanded that Tamar be burned.

This was an incredibly harsh judgment.

The irony is impossible to miss.

Judah was ready to punish Tamar for the very sin he himself had committed.

He pointed the finger at someone else while ignoring his own guilt.

This is a common tendency of human nature.

It is often easier to recognize sin in other people than it is to admit our own.

Jesus would later teach the same principle when He spoke about trying to remove a speck from another person's eye while ignoring the beam in our own (Matthew 7:3–5).

Judah believed he was acting as a righteous judge.

In reality, he was condemning himself.

🔥 Judah demanded the harshest punishment.

👉 He judged Tamar while ignoring his own sin.

⚖️ God was about to expose the hypocrisy.

➡️ Tamar Sends The Evidence

---

## 💍 When She Was Brought Forth, She Sent To Her Father In Law, Saying, By The Man, Whose These Are, Am I With Child

As Tamar was being brought out for judgment, she did not immediately accuse Judah publicly.

Instead, she quietly sent his personal belongings to him with a message.

She simply stated,

**"By the man, whose these are, am I with child."**

Notice her wisdom.

She did not embarrass Judah before everyone by immediately naming him.

She allowed him the opportunity to recognize the truth himself.

The evidence spoke louder than any accusation.

The signet.

The cord.

The staff.

These were the very items Judah had willingly placed into her hands three months earlier.

💍 Tamar presented the evidence.

🤐 She allowed Judah to confess instead of publicly attacking him.

⚖️ The truth could no longer be hidden.

➡️ Tamar Asks Judah To Discern

---

## 👀 And She Said, Discern, I Pray Thee, Whose Are These, The Signet, And Bracelets, And Staff

The word **"discern"** means **recognize**, **identify**, or **acknowledge**.

Tamar simply asked Judah to identify the owner of the items.

There was no argument.

No shouting.

No long explanation.

She let the evidence speak for itself.

The very objects Judah had surrendered in a moment of lust now became the proof of his guilt.

It is amazing how the things we think will remain hidden often become the evidence that exposes us.

👀 "Discern" means recognize or identify.

💍 Judah's own belongings testified against him.

⚖️ The evidence left no room for denial.

➡️ Judah Finally Confesses

---

## 🙏 And Judah Acknowledged Them, And Said, She Hath Been More Righteous Than I

For the first time in this chapter, Judah stopped blaming someone else.

He acknowledged that the items belonged to him.

Then he made one of the most remarkable statements of his life.

**"She hath been more righteous than I."**

Judah was not saying Tamar was sinless.

He was admitting that, in this situation, she had acted more justly than he had.

Tamar had been wronged.

Judah had promised to give her Shelah as a husband.

He never fulfilled that promise.

Her actions grew out of Judah's failure to do what was right.

This is the turning point in Judah's life.

Earlier, he condemned Tamar without mercy.

Now he publicly confessed his own guilt.

True repentance begins when we stop making excuses and honestly admit our sin.

🙏 Judah confessed his guilt.

⚖️ Tamar had been treated unjustly.

❤️ This became the beginning of Judah's transformation.

➡️ Judah Explains His Failure

---

## 👨‍👦 Because That I Gave Her Not To Shelah My Son

Judah explained exactly why Tamar had been more righteous.

He admitted that he had failed to keep his promise.

Years earlier, he had told Tamar to remain a widow until Shelah grew up.

Shelah was now an adult.

Yet Judah never intended to give Tamar to him in marriage.

His fear and broken promise had placed Tamar in an impossible position.

Judah finally admitted that his own actions had created the situation.

Confession always begins by accepting responsibility instead of blaming others.

👨‍👦 Judah admitted he broke his promise.

📖 Tamar had been treated unfairly.

✅ Judah finally accepted responsibility.

➡️ Judah's Behavior Changes

---

## 🤝 And He Knew Her Again No More

The phrase **"he knew her again no more"** means Judah never again had sexual relations with Tamar.

The Bible records this to show that what happened was never repeated.

Many theologians also believe this verse suggests something more.

Although Judah never again had sexual relations with Tamar, they believe he likely accepted responsibility for her and the twins she was carrying, bringing her back under the protection of his household as his widowed daughter-in-law.

The text does not explicitly say this happened, so we should be careful not to state it as fact.

What the Bible does make clear is that Judah's behavior changed.

The man who was once driven by lust and hypocrisy had begun taking responsibility for his actions.

This chapter marks the beginning of the transformation that will eventually make Judah the same man who later offers his own life in place of Benjamin's in Genesis 44.

🤝 Judah never had sexual relations with Tamar again.

❤️ Many theologians believe he accepted responsibility for Tamar and her children, though Scripture does not state this directly.

🌱 This chapter marks the beginning of Judah's transformation.

# Genesis 38:27–30

# 👶 The Birth Of Perez And Zerah

---

## 🤰 And It Came To Pass In The Time Of Her Travail

The word **"travail"** refers to the painful labor and childbirth that a woman experiences as she prepares to give birth.

Approximately six months had passed since Judah unknowingly conceived these children with Tamar. What had once been a hidden sin was now becoming part of God's greater plan.

The day had finally arrived for Tamar to deliver her babies.

Although this pregnancy began under difficult circumstances, God was still working through it to accomplish His purposes.

🤰 "Travail" refers to the pains of childbirth.

⏳ About six months had passed since Tamar became pregnant.

🙏 God was still working through imperfect people to accomplish His plan.

➡️ Twins Are Discovered

---

## 👶 Behold, Twins Were In Her Womb

As Tamar went into labor, everyone discovered she was carrying twins.

Twins were uncommon in the ancient world and were often viewed as remarkable births.

The last twins recorded in Scripture were **Jacob and Esau** in Genesis 25.

Just as God had worked through Jacob and Esau to continue His covenant promises, He was now preparing to work through another unexpected set of twins.

No one could have imagined that one of these boys would become an ancestor of King David and, ultimately, Jesus Christ.

👶 Tamar was carrying twins.

📖 The previous twins in Scripture were Jacob and Esau.

👑 God was continuing His redemptive plan through another unexpected birth.

➡️ A Hand Appears First

---

## ✋ And It Came To Pass, When She Travailed, That The One Put Out His Hand

Now the actual birth began.

Earlier, **"travail"** referred to the time of labor.

Here, it describes Tamar actively giving birth.

As the first baby began to emerge, something unusual happened.

Instead of his head appearing first, he stretched one hand outside the womb.

This immediately caught the attention of the midwife because it appeared that this child would be born first.

The Bible records this detail because the order of birth was extremely important.

✋ The baby's hand appeared before the rest of his body.

👶 This was an unusual delivery.

👀 Everyone believed this child would be born first.

➡️ The Midwife Marks His Hand

---

## 🧵 And The Midwife Took And Bound Upon His Hand A Scarlet Thread, Saying, This Came Out First

The midwife quickly tied a scarlet thread around the baby's wrist.

This served as a marker to identify which twin had first appeared during the birth.

In biblical times, the firstborn son normally received the birthright.

The birthright carried special privileges, including leadership within the family and a larger inheritance.

Since twins were being born, the midwife wanted there to be no confusion about who appeared first.

The scarlet thread would settle the matter.

🧵 The scarlet thread identified the first twin.

👑 The birth order affected the birthright.

📖 The midwife wanted no confusion about who appeared first.

➡️ The Hand Is Withdrawn

---

## ↩️ And It Came To Pass, As He Drew Back His Hand

Then something completely unexpected happened.

The baby whose hand had appeared first pulled it back into the womb.

No birth was completed.

The child who seemed certain to be the firstborn was suddenly no longer being delivered.

Everyone watching must have been surprised.

God was once again overturning human expectations.

↩️ The baby withdrew his hand.

😲 The expected firstborn had not yet been born.

🙏 God was about to surprise everyone.

➡️ The Other Twin Is Born First

---

## 👶 And, Behold, His Brother Came Out

As soon as the first baby's hand disappeared, the other twin was born first.

The child without the scarlet thread emerged before his brother.

The order of birth had suddenly changed.

The one everyone expected to be first was now second.

This is another reminder of a theme that appears throughout Genesis.

Again and again, God works through the unexpected.

Isaac instead of Ishmael.

Jacob instead of Esau.

Joseph instead of his older brothers.

Now Perez instead of Zerah.

God's purposes are not determined by human expectations.

👶 The second twin was actually born first.

📖 The scarlet thread remained on the other baby's hand.

🙏 God once again worked through the unexpected.

➡️ The Midwife's Amazement

---

## 💥 And She Said, How Hast Thou Broken Forth? This Breach Be Upon Thee

The midwife was amazed.

She exclaimed,

**"How hast thou broken forth?"**

The word **"breach"** means **a breaking through**, **a bursting out**, or **a breakthrough**.

Perez had unexpectedly broken past his brother to become the first child actually born.

His dramatic entrance became the reason for his name.

This was no ordinary birth.

The child who appeared to be second became first.

The theme fits perfectly with the book of Genesis, where God repeatedly raises up the unexpected person to fulfill His purposes.

💥 "Breach" means a breaking through or bursting forth.

👶 Perez unexpectedly became the firstborn.

📖 God continued reversing human expectations.

➡️ His Name Is Called Perez

---

## 📖 Therefore His Name Was Called Perez

The name **Perez** means **breach**, **breaking through**, or **bursting forth**.

His name forever reminded everyone of the remarkable way he entered the world.

Perez would become far more important than anyone present could have imagined.

He became the ancestor of **Boaz**, **King David**, and eventually **Jesus Christ**.

What looked like a strange and confusing birth was actually part of God's sovereign plan of redemption.

📖 Perez means "breach" or "breaking through."

👑 Perez became part of the family line leading to Jesus.

🙏 God often works through unexpected circumstances.

➡️ The Second Twin Is Born

---

## 🔴 And Afterward Came Out His Brother, That Had The Scarlet Thread Upon His Hand

Finally, the other twin was born.

The scarlet thread was still tied around his hand exactly where the midwife had placed it, confirming that he was indeed the child who had first reached out during labor—even though his brother had ultimately been delivered first.

The thread served its purpose exactly as intended.

It gave a clear, physical record of what had happened, protecting against any confusion about which twin had first put out his hand.

🧵 The scarlet thread confirmed his identity.

👶 He was the twin who had first reached out his hand.

📖 His birth order was unusual, but the thread proved the truth.

➡️ His Name Is Called Zerah

---

## 📖 And His Name Was Called Zerah

Judah's second son was named **Zerah**.

The name **Zerah** is connected to Hebrew words meaning **"dawn,"** **"brightness,"** or **"scarlet,"** fittingly tied to the scarlet thread that marked his hand during birth.

Although Zerah's hand appeared first, Perez was the one who actually broke through and was born first. This unexpected reversal echoes a theme found throughout Genesis: God often works through the one who was not expected to come first.

Both sons became founders of important family lines within the tribe of Judah. But it was through **Perez** that the promised royal line would continue—leading eventually to Boaz, David, and ultimately Jesus Christ (Matthew 1:3).

Judah's story, which began with deep failure, sin, and broken promises, closes with the unexpected beginning of the very family line through which the Messiah would come.

God's grace transformed Judah's darkest chapter into part of His redemptive plan.

📖 Zerah means dawn, brightness, or scarlet.

👑 Perez became part of the line leading to David and Jesus.

🙏 God brought redemption out of Judah's failure.`;

export const GENESIS_THIRTY_EIGHT_PERSONAL_SECTIONS = parseGenesisThirtyEightRawNotes(GENESIS_THIRTY_EIGHT_RAW_NOTES);
