export type GenesisTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisTwentyRawNotes(rawText: string): GenesisTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const sectionMatch = lines[index].trim().match(
      /^#\s*(?:\*\*)?(.*?Genesis\s+20:(\d+)(?:[-–—]|â€“|â€”)?(\d+)?)\s*(?:\*\*)?\s*$/i,
    );

    if (!sectionMatch) {
      index += 1;
      continue;
    }

    const icon = sectionMatch[1].replace(/Genesis\s+20:.+$/i, "").replace(/\*\*/g, "").trim();
    const startVerse = Number(sectionMatch[2]);
    const endVerse = Number(sectionMatch[3] || sectionMatch[2]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const sectionTitleMatch =
      lines[index]?.trim().match(/^#+\s*(?:\*\*)?(.+?)(?:\*\*)?$/) || lines[index]?.trim().match(/^\*\*(.+?)\*\*$/);
    if (!sectionTitleMatch) {
      throw new Error("Missing Genesis 20 section title after verse " + startVerse);
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
        throw new Error("Missing Genesis 20 explanation for " + phraseTitle);
      }

      phrases.push([phraseTitle, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference:
        startVerse === endVerse
          ? "Genesis 20:" + startVerse
          : "Genesis 20:" + startVerse + "-" + endVerse,
      title,
      icon,
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Genesis 20 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_TWENTY_RAW_NOTES = `# Genesis 20:1–8

## 🤥 Abraham Deceives Abimelech

### 🚶 And Abraham Journeyed From Thence

**Thence** simply means **"from there."**

After the destruction of Sodom and Gomorrah, Abraham leaves the area around Mamre and travels south.

The Bible does not tell us exactly why he moved, but Abraham was a shepherd with large flocks and herds. It was common for him to travel in search of fresh pasture and water.

🚶 Thence means "from there"

🔥 This takes place after Sodom and Gomorrah's destruction

🐑 Abraham continues living as a traveling shepherd

➡️ He heads toward the southern region

---

### 🧭 Toward The South Country

The **south country** refers to the **Negev**, the dry southern region of Canaan.

This area was ideal for shepherds because it had open grazing land, even though it was much drier than the Jordan Valley.

🧭 The south country is the Negev

🐑 A region commonly used by shepherds

📖 Abraham had traveled through this area before

➡️ Moses gives Abraham's location

---

### 🏕️ And Dwelt Between Kadesh And Shur, And Sojourned In Gerar

**Kadesh** and **Shur** were landmarks in the southern wilderness.

**Gerar** was a prosperous Philistine city ruled by **King Abimelech**, located between Canaan and Egypt.

To **sojourn** means to live somewhere temporarily without settling there permanently.

Although God had promised Abraham the land of Canaan, he still lived there as a foreigner.

🏕️ Gerar was a Philistine city

🧭 Kadesh and Shur marked the surrounding region

🚶 Sojourn means to live somewhere temporarily

➡️ Abraham repeats an old mistake

---

### 🤥 And Abraham Said Of Sarah His Wife, She Is My Sister

Years earlier, Abraham told the exact same lie in Egypt before Pharaoh.

Once again, fear causes Abraham to believe someone might kill him in order to take Sarah.

Even after seeing God rescue Lot, destroy Sodom, renew His covenant several times, and promise Isaac's birth, Abraham still struggles with fear.

This reminds us that even people with great faith still have moments of weakness.

🤥 Abraham repeats the same lie

😟 Fear overcomes his faith

📖 This mirrors what happened in Egypt

➡️ The king takes Sarah

---

### 👑 And Abimelech King Of Gerar Sent And Took Sarah

Believing Sarah is unmarried, King Abimelech brings her into his royal household.

Just like Pharaoh before him, Abimelech acts on the information Abraham and Sarah gave him.

He has no reason to believe he is doing anything wrong.

👑 Abimelech believes Sarah is unmarried

🤝 He acts on Abraham's words

📖 Sarah is brought into the king's household

➡️ God intervenes before anything happens

---

### 🌙 But God Came To Abimelech In A Dream By Night

Before Abimelech ever touches Sarah, God appears to him in a dream.

Throughout the Bible, God sometimes speaks through dreams to warn people or reveal His plans.

Here, God steps in to protect both Sarah and His promise that Isaac would soon be born.

🌙 God warns Abimelech in a dream

🛡️ God protects Sarah before anything happens

👶 God's promise concerning Isaac is preserved

➡️ God gives a serious warning

---

### ⚠️ Behold, Thou Art But A Dead Man

God warns Abimelech that he is under a sentence of death if he continues.

**Dead man** does not mean he is already dead.

It means that unless he obeys God, death is certain.

⚠️ God gives a serious warning

💀 Dead man means judgment is certain without repentance

🙏 God gives Abimelech an opportunity to obey

➡️ God explains why

---

### 💍 For The Woman Which Thou Hast Taken

God explains exactly why Abimelech is in danger.

The problem is not that Sarah entered his palace.

The problem is that she already belongs to another man.

💍 Sarah already belongs to Abraham

⚖️ Marriage is being protected

➡️ God states the reason

---

### ❤️ For She Is A Man's Wife

Sarah is Abraham's wife.

Even though Abraham failed to protect his own marriage by lying, God faithfully protects His covenant.

God remains faithful even when His people are not.

❤️ Sarah is Abraham's wife

🛡️ God protects His covenant

📖 God's faithfulness is greater than man's failures

➡️ Abimelech responds

---

### 🚫 But Abimelech Had Not Come Near Her

The Bible makes it clear that Abimelech had not slept with Sarah.

God stopped everything before any sin occurred.

This also protects the coming birth of Isaac.

🚫 Abimelech had not touched Sarah

🛡️ God prevented any sin

👶 Isaac's promised birth remains untouched

➡️ Abimelech pleads his case

---

### 🙏 Lord, Wilt Thou Slay Also A Righteous Nation?

Abimelech asks if God will destroy an innocent ruler and his people.

He believes he has acted honestly because Abraham and Sarah both told him the same story.

He is asking God to judge fairly.

🙏 Abimelech asks for justice

⚖️ He believes he acted honestly

➡️ He explains why

---

### 🗣️ Said He Not Unto Me, She Is My Sister?

Abimelech reminds God that Abraham himself claimed Sarah was his sister.

From his point of view, he simply believed what he had been told.

🗣️ Abraham gave false information

👑 Abimelech trusted Abraham's words

➡️ Sarah confirmed it

---

### 👩 And She, Even She Herself Said, He Is My Brother

Sarah also repeated the same story.

Because both Abraham and Sarah agreed, Abimelech had no reason to suspect deception.

👩 Sarah confirmed Abraham's story

🤝 Both of them told the same lie

➡️ Abimelech explains his motives

---

### ❤️ In The Integrity Of My Heart And Innocency Of My Hands Have I Done This

**Integrity** means honesty and sincerity.

**Innocency** means freedom from intentional wrongdoing.

Abimelech explains that he believed he was doing the right thing based on the information he had received.

❤️ Integrity means honesty

🤲 Innocency means freedom from intentional guilt

⚖️ Abimelech acted with a clear conscience

➡️ God answers

---

### 🌙 God Said Unto Him In A Dream

God tells Abimelech that He knows he acted with an honest heart.

God sees not only our actions but also our intentions.

🌙 God knows Abimelech's heart

❤️ God recognizes his honesty

➡️ God explains what He did

---

### 🛡️ For I Also Withheld Thee From Sinning Against Me

God says He personally prevented Abimelech from committing sin.

Without God's intervention, Abimelech would have unknowingly committed adultery.

This shows God's sovereign protection over His covenant.

🛡️ God prevented the sin

⚖️ God protected Sarah

📖 God preserved His promise

➡️ Therefore…

---

### ✋ Therefore Suffered I Thee Not To Touch Her

Here, **suffered** means **allowed**.

God is saying,

**"I did not allow you to touch her."**

God Himself prevented the relationship before it ever happened.

✋ Suffered means allowed

🛡️ God prevented the relationship

➡️ God gives one command

---

### 🔄 Now Therefore Restore The Man His Wife

**Restore** means **return**.

God commands Abimelech to immediately give Sarah back to Abraham.

Only then will the judgment be removed.

🔄 Restore means return

💍 Sarah must go back to Abraham

➡️ God identifies Abraham

---

### 👤 For He Is A Prophet

This is the **first time** the word **prophet** appears in the Bible.

A prophet is someone chosen by God to speak God's message and represent Him before others.

Even though Abraham has just lied, God still calls him His prophet.

This reminds us that God's calling depends on His grace, not human perfection.

👤 First mention of "prophet"

📖 A prophet represents God

❤️ God uses imperfect people

➡️ Abraham will intercede

---

### 🙏 And He Shall Pray For Thee, And Thou Shalt Live

God tells Abimelech that Abraham will pray on his behalf.

To **pray for thee** means Abraham will ask God to forgive and spare Abimelech.

If Abimelech obeys, God promises he will live.

🙏 Abraham will intercede for Abimelech

❤️ God offers mercy after obedience

➡️ A warning remains

---

### ⚠️ If Thou Restore Her Not

God gives Abimelech a clear choice.

Return Sarah…

or face judgment.

⚠️ God gives a clear decision

📖 Obedience brings mercy

➡️ The consequence is stated

---

### 💀 Know Thou That Thou Shalt Surely Die, Thou And All That Are Thine

If Abimelech refuses, judgment will fall upon him and everyone under his authority.

This shows how a leader's decisions can affect an entire household or nation.

💀 Judgment would affect his whole household

👑 Leaders influence those under them

⚖️ God's warning is certain

➡️ Abimelech responds immediately

---

### 🌅 Therefore Abimelech Rose Early In The Morning

Like many people in Genesis who respond to God, Abimelech acts immediately.

He does not delay after receiving God's warning.

🌅 He obeys immediately

⚡ No delay after God's warning

➡️ He informs everyone

---

### 📢 And Called All His Servants, And Told All These Things In Their Ears

Abimelech gathers his servants and tells them everything God had revealed in the dream.

He hides nothing from them.

📢 Abimelech tells the whole household

👑 Everyone hears God's warning

➡️ Their response

---

### 😨 And The Men Were Sore Afraid

**Sore afraid** means **greatly terrified**.

After hearing what God had said, everyone realized they were dealing with the God of Abraham.

They understood that His warning was real.

😨 Sore afraid means greatly terrified

⚖️ They recognize God's authority

🙏 Fear leads them to take God's warning seriously

---

# Genesis 20:9–16

## 🤝 Abimelech Confronts Abraham

### 😠 Then Abimelech Called Abraham

After telling his servants about the dream, Abimelech immediately calls Abraham to confront him.

Rather than responding with violence, he wants to understand why Abraham deceived him.

😠 Abimelech confronts Abraham

👑 The king demands an explanation

➡️ He asks his first question

---

### ❓ What Hast Thou Done Unto Us?

Abimelech asks,

**"Why would you do this to us?"**

From his point of view, Abraham brought danger upon an innocent kingdom.

He cannot understand why a man of God would put others in such danger.

❓ "Why did you do this?"

⚖️ Abraham's lie affected innocent people

➡️ Abimelech asks what he did wrong

---

### 🤷 What Have I Offended Thee, That Thou Hast Brought On Me And On My Kingdom A Great Sin?

Abimelech asks,

**"What did I ever do to deserve this?"**

He had welcomed Abraham into his land and treated him fairly.

Instead, Abraham's lie almost caused Abimelech and his entire kingdom to unknowingly sin against God.

🤷 Abimelech believes he treated Abraham fairly

⚖️ The entire kingdom was placed in danger

📖 Sin affects more than just one person

➡️ Abimelech rebukes Abraham

---

### 📢 Thou Hast Done Deeds Unto Me That Ought Not Be Done

Abimelech tells Abraham that what he did was wrong.

In other words,

**"No one should treat another person this way."**

Ironically, the pagan king is correcting God's prophet.

📢 Abimelech rebukes Abraham

⚖️ Even unbelievers recognize dishonesty

📖 God's people should live with integrity

➡️ The king asks why

---

### 🤔 What Sawest Thou, That Thou Hast Done This Thing?

Abimelech asks,

**"What made you think you had to do this?"**

He wants to understand what Abraham saw that made him believe lying was necessary.

🤔 "What made you think this was necessary?"

👑 Abimelech wants an explanation

➡️ Abraham answers honestly

---

### 😟 Because I Thought, Surely The Fear Of God Is Not In This Place

Abraham explains that he assumed the people of Gerar did not fear God.

He expected them to act like the wicked people of Sodom.

Instead of trusting God, Abraham judged the situation by his own fears.

Ironically, Abimelech proves to have far more respect for God than Abraham expected.

😟 Abraham assumed the worst

⚖️ Fear led him to make wrong assumptions

📖 Abimelech proves more honorable than expected

➡️ Abraham explains his fear

---

### ⚔️ And They Will Slay Me For My Wife's Sake

Abraham believed someone would kill him in order to marry Sarah.

This was the exact same fear he had years earlier in Egypt.

Although God had protected him before, Abraham still struggled to trust Him completely.

⚔️ Abraham feared for his life

📖 This repeats what happened in Egypt

🙏 Fear again overcomes faith

➡️ Abraham reveals another truth

---

### 👨‍👩‍👧 Yet Indeed She Is My Sister

Abraham explains that Sarah really is his half-sister.

Both of them shared the same father, **Terah**, but had different mothers.

Later, Sarah became Abraham's wife.

At that time in history, long before God's Law was given through Moses, marriages between close relatives were still practiced.

Centuries later, God's Law would forbid these kinds of marriages (Leviticus 18).

👨‍👩‍👧 Sarah is Abraham's half-sister

👨 They share the same father, Terah

📖 God's Law prohibiting this came much later

➡️ Abraham explains their agreement

---

### 🤝 This Is Thy Kindness Which Thou Shalt Shew Unto Me

**Shew** simply means **show**.

Abraham explains that he and Sarah had made an agreement years earlier.

Whenever they entered a new place, Sarah would say Abraham was her brother.

He believed this would protect his life.

🤝 Shew means show

📖 This was a long-standing agreement

😟 Abraham relied on deception instead of trusting God

➡️ Abimelech responds generously

---

### 🐑 And Abimelech Took Sheep, And Oxen, And Menservants, And Womenservants, And Restored Him Sarah His Wife

Instead of punishing Abraham, Abimelech gives him gifts and returns Sarah safely.

Once again, Abraham leaves a foreign king richer than when he arrived.

Just as in Egypt, God protects Abraham despite his failure.

This reminds Abraham that God's promises—not his own schemes—are what preserve and bless him.

🐑 Abimelech gives Abraham great wealth

❤️ Sarah is safely returned

📖 God protects Abraham despite his failure

➡️ Abimelech makes another generous offer

---

### 🌿 Behold, My Land Is Before Thee; Dwell Where It Pleaseth Thee

Abimelech gives Abraham permission to live anywhere in his territory.

This would have been a tremendous blessing for a shepherd with thousands of animals.

Instead of driving Abraham away, Abimelech welcomes him to remain.

🌿 Abraham may live anywhere in the land

🐑 Plenty of pasture for his flocks

👑 Abimelech responds with generosity

➡️ Abimelech speaks to Sarah

---

### 💰 Behold, I Have Given Thy Brother A Thousand Pieces Of Silver

Abimelech publicly gives Abraham one thousand pieces of silver.

This was an enormous amount of wealth.

Although it is impossible to calculate an exact modern value, many scholars estimate it would equal **hundreds of thousands of dollars** in today's purchasing power.

The money was not a payment because Abimelech had done something wrong.

Instead, it was a public declaration before everyone that Sarah was an honorable woman who had never been touched.

It also showed that Abraham and Sarah were leaving the kingdom with honor, not shame.

💰 A thousand pieces of silver was an enormous gift

💵 Worth roughly hundreds of thousands of dollars today

❤️ The gift publicly honored Sarah

➡️ Abimelech explains why

---

### 👀 He Is To Thee A Covering Of The Eyes

This expression means **Sarah's honor and reputation were publicly protected.**

Think about what everyone in Gerar would have assumed.

The king had taken Sarah into his palace.

People could have easily believed she had become one of the king's wives or concubines.

Even though nothing happened, rumors would have spread.

By giving Abraham this large public gift and returning Sarah untouched, Abimelech was publicly declaring to everyone:

**"Sarah is innocent. I did not touch her. She belongs to Abraham."**

The payment "covered the eyes" of anyone who might accuse or shame Sarah.

It removed suspicion from her name.

👀 Sarah's reputation is publicly protected

👑 The king proves she was never touched

❤️ The gift removes suspicion from Sarah

➡️ Moses explains the result

---

### ✅ Thus She Was Reproved

Here the word **reproved** does **not** mean Sarah was scolded.

It means she was **vindicated**, **cleared**, or **shown to be innocent** before everyone.

Her reputation had been restored.

No one could truthfully accuse her of wrongdoing because the king himself publicly defended her.

This is why the "covering of the eyes" comes first—it explains **how** her reputation was restored.

✅ Sarah is publicly declared innocent

❤️ Her reputation is completely restored

👑 The king himself clears her name

➡️ God will now heal Abimelech's household

---

# Genesis 20:17–18

## 🙏 Abraham Prays For Abimelech

### 🙏 So Abraham Prayed Unto God

After Abimelech obeyed God by returning Sarah, Abraham prayed for him.

This is the first time in the Bible we actually see Abraham acting in his role as a **prophet**, just as God had said in verse 7.

A prophet not only speaks God's message but also intercedes for others by praying on their behalf.

It's also a beautiful picture of forgiveness. Even though Abraham had just been corrected by Abimelech, he now prays for the very man he had wronged.

🙏 Abraham fulfills his role as God's prophet

❤️ He prays for the man he had deceived

📖 A prophet also intercedes for others

➡️ God answers Abraham's prayer

---

### ❤️ And God Healed Abimelech

The healing was not from a physical injury or disease.

God had temporarily brought a curse upon Abimelech's household because Sarah had been taken into his palace.

When Abraham prayed, God removed that judgment.

The household was restored to normal.

❤️ God removes His judgment

🙏 Abraham's prayer is answered

📖 The healing restores Abimelech's household

➡️ The family is restored

---

### 👨‍👩‍👧 And His Wife And His Maidservants, And They Bare Children

This explains what the healing was.

While Sarah was in Abimelech's household, God had prevented the women from becoming pregnant.

Their wombs had been closed.

After Abraham prayed, God opened their wombs again, and they were able to have children.

This also protects God's promise to Sarah.

No one could ever question whose son Isaac would be.

Sarah had never become Abimelech's wife, and Abimelech had never touched her.

👶 The women could have children again

❤️ God restored fertility to the household

📖 Isaac's lineage remained completely protected

➡️ Moses explains why

---

### 🔒 For The Lord Had Fast Closed Up All The Wombs Of The House Of Abimelech

**Fast closed** means **completely shut**.

Before Abimelech ever knew what was happening, God had already prevented every woman in his household from conceiving children.

This was God's way of stopping the situation before it could go any further.

It also served as evidence that God was protecting Sarah and His covenant with Abraham.

🔒 Fast closed means completely shut

👶 Every womb in Abimelech's household had been closed

🛡️ God protected Sarah and His covenant

➡️ The reason is given

---

### ❤️ Because Of Sarah, Abraham's Wife

Everything happened because Sarah belonged to Abraham.

God had promised that within about one year Sarah would give birth to Isaac.

Nothing was going to interfere with that promise.

From beginning to end, God protected Sarah, preserved His covenant, and kept His word exactly as He had promised.

❤️ Sarah was God's chosen mother of the promised son

👶 God protected Isaac's future birth

📖 God's promises cannot be stopped by man's mistakes`;

export const GENESIS_TWENTY_PERSONAL_SECTIONS = parseGenesisTwentyRawNotes(GENESIS_TWENTY_RAW_NOTES);
