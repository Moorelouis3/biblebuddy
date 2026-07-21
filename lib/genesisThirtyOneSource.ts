export type GenesisThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtyOneRawNotes(rawText: string): GenesisThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+31:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 31 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+31:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+31:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 31 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 31,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 31:${startVerse}` : `Genesis 31:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Genesis 31 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_ONE_RAW_NOTES = `# Genesis 31:1–16

# 🏠 God Tells Jacob To Return

---

## 😠 Jacob Hath Taken Away All That Was Our Father's

Laban's sons have become jealous of Jacob.

Over the years, Jacob's flocks had grown larger and stronger while Laban's wealth had decreased.

Instead of recognizing that God had blessed Jacob, they accused him of stealing what belonged to their father.

They believed Jacob had become rich at Laban's expense.

In reality, Jacob had only received what had been agreed upon, and God was the One causing his flocks to increase.

😠 Laban's sons become jealous

🐑 Jacob's flocks continue growing

💰 They accuse Jacob of taking Laban's wealth

🙏 God is the One blessing Jacob

➡️ They complain about Jacob's success

---

## 💰 Of That Which Was Our Father's Hath He Gotten All This Glory

The word **glory** here means **wealth**, **honor**, or **prosperity**.

Laban's sons are saying,

**"Everything Jacob has came from our father."**

They believe Jacob's success belongs to Laban.

Their jealousy causes them to ignore how many times Laban had treated Jacob unfairly.

Instead of celebrating God's blessing, they resent Jacob for becoming successful.

💰 Glory means wealth or prosperity

😠 They believe Jacob's riches belong to Laban

❤️ Jealousy blinds them to the truth

➡️ Jacob notices a change

---

## 👀 Jacob Beheld The Countenance Of Laban

**Beheld** means **looked at** or **noticed.**

**Countenance** refers to someone's **face**, **expression**, or **attitude.**

Jacob notices that Laban's facial expression and attitude toward him have changed.

Laban is no longer warm, friendly, or welcoming.

Jacob realizes the relationship has become dangerous.

👀 Beheld means looked closely

🙂 Countenance means facial expression or attitude

⚠️ Laban is no longer friendly

➡️ Jacob senses trouble

---

## 😔 It Was Not Toward Him As Before

Laban no longer treats Jacob the way he once did.

The friendship between them has disappeared.

After hearing his sons complain, Laban's attitude becomes cold and hostile.

Jacob realizes it is probably no longer safe to remain there.

😔 Laban's attitude has changed

😠 His family now resents Jacob

⚠️ Jacob realizes trouble is coming

➡️ God speaks to Jacob

---

## 🏠 Return Unto The Land Of Thy Fathers

God tells Jacob it is finally time to go home.

About **twenty years** have passed since Jacob fled from Esau.

Now God calls him back to the land He promised Abraham and Isaac.

God does not simply tell Jacob to leave.

He also gives him a promise:

**"I will be with thee."**

🏠 God tells Jacob to return home

📖 About twenty years have passed

🤝 God promises to stay with him

➡️ Jacob gathers his wives

---

## 🐑 Jacob Sent And Called Rachel And Leah To The Field Unto His Flock

Instead of talking at home, Jacob calls Rachel and Leah out into the fields where he is watching the sheep.

This gives them privacy.

He likely wants to speak without Laban or anyone else overhearing the conversation.

Jacob is preparing his family for a major decision.

🐑 Jacob meets them privately

🤫 He wants a confidential conversation

🏠 He prepares them to leave Haran

➡️ Jacob explains the situation

---

## 👀 I See Your Father's Countenance

Again, **countenance** means **attitude**, **expression**, or **the look on someone's face.**

Jacob tells Rachel and Leah that he has noticed their father's attitude has changed.

Laban no longer looks at him with kindness.

Jacob realizes the relationship has become dangerous.

👀 Countenance means attitude or expression

😠 Laban is no longer friendly

⚠️ Jacob knows something has changed

➡️ God has protected Jacob

---

## 🙏 But The God Of My Father Hath Been With Me

Although Laban has treated Jacob unfairly for many years, God has remained faithful.

Jacob gives God the credit for protecting him and blessing his work.

He knows his success did not come from luck or cleverness alone.

It came because God was watching over him.

🙏 God protected Jacob

💪 God blessed his work

❤️ Jacob gives God the credit

➡️ Jacob reminds them how hard he worked

---

## 💪 With All My Power I Have Served Your Father

Jacob reminds Rachel and Leah how hard he has worked.

He did not become wealthy by laziness.

For twenty years he faithfully cared for Laban's animals.

He gave everything he had to his work.

💪 Jacob worked with all his strength

🐑 He faithfully cared for Laban's flocks

📖 He earned what he received

➡️ Laban repeatedly cheated him

---

## ⚖️ Your Father Hath Deceived Me, And Changed My Wages Ten Times

Laban repeatedly changed their agreement whenever Jacob began succeeding.

The phrase **"ten times"** is likely an expression meaning **many times**, not necessarily exactly ten.

Each time Jacob started prospering, Laban changed the deal to benefit himself.

Yet every time Laban changed the agreement, God caused the new animals Jacob was supposed to receive to become the ones that multiplied.

Laban kept trying to outsmart Jacob.

God kept overruling Laban's plans.

⚖️ Laban repeatedly changed the agreement

💰 He tried to keep Jacob from prospering

🙏 God kept blessing Jacob anyway

➡️ God protected Jacob

---

## 🛡️ God Suffered Him Not To Hurt Me

Here the word **suffered** means **allowed**.

Jacob is saying,

**"God did not allow Laban to harm me."**

Although Laban tried to cheat him again and again, God prevented those plans from succeeding.

God protected Jacob's livelihood and kept His promises.

🛡️ Suffered means allowed

🙏 God prevented Laban from harming Jacob

❤️ God remained faithful to His promise

➡️ God blessed Jacob's wages

---

## 🐑 Thus The Speckled Shall Be Thy Wages

Jacob reminds Rachel and Leah about the agreement.

At one point Laban said Jacob could keep all the **speckled** animals.

Instead of producing mostly solid-colored offspring, God caused many speckled animals to be born.

Jacob's flock increased.

🐑 Speckled animals became Jacob's payment

🙏 God caused many to be born

📈 Jacob's flock grew larger

➡️ Laban changes the deal again

---

## 🐐 Thus The Ringstraked Shall Be Thy Hire

Later Laban changed the agreement again.

Now Jacob would receive only the **ringstraked** animals.

A **ringstraked** animal had striped or banded markings.

Once again, God caused many ringstraked animals to be born.

No matter how Laban changed the deal, God continued blessing Jacob.

🐐 Ringstraked means striped or banded

⚖️ Laban changes the agreement again

🙏 God blesses Jacob again

➡️ God is in control

---

## 🙌 Thus God Hath Taken Away The Cattle Of Your Father, And Given Them To Me

Jacob makes something very clear.

He does **not** say,

**"I made myself rich."**

He says,

**"God has done this."**

Laban may have tried to cheat Jacob, but God made sure Jacob still received what was rightfully his.

Every increase in Jacob's flocks was the result of God's blessing.

🙌 God is the One who blessed Jacob

🐑 Jacob gives God the credit

⚖️ God overruled Laban's deception

➡️ Jacob explains the dream

---

## 💭 It Came To Pass At The Time That The Cattle Conceived

The cattle are mating and becoming pregnant.

During this season, God gives Jacob a dream explaining what is really happening.

Earlier, Jacob had placed peeled branches before the stronger animals when they bred (Genesis 30).

The Bible records that event, but here God reveals that the true reason Jacob prospered was **not the branches**.

The branches themselves had no supernatural power.

God was the One controlling which animals were born.

The dream shows that Jacob's success came through God's blessing, not through a magical breeding technique.

🐑 The animals are breeding

🌙 God gives Jacob a dream

🌿 The branches were not the source of the blessing

🙏 God controlled the outcome

➡️ Jacob sees the animals in his dream

---

## 🌙 The Rams Which Leaped Upon The Cattle Were Ringstraked, Speckled, And Grizzled

In the dream, Jacob sees the male animals breeding with the females.

The males are described as:

- 🟤 **Ringstraked** — striped or banded.
- ⚪ **Speckled** — covered with small spots.
- ⚫ **Grizzled** — marked with darker patches or mixed-colored spots.

God is showing Jacob that He is directing the breeding of the animals.

The increase of Jacob's flock is not an accident.

It is God's hand fulfilling His promise to bless and provide for Jacob.

🌙 God explains what has been happening

🐏 The marked animals produce more offspring

🙏 God is directing the increase

📖 Jacob's prosperity comes from God's blessing, not luck

---

## 👼 The Angel Of God Spake Unto Me In A Dream

While Jacob is dreaming, **the Angel of God** speaks directly to him.

Throughout Genesis, **the Angel of the LORD** appears several times.

He spoke to **Hagar** in the wilderness (Genesis 16).

He called to **Abraham** when Isaac was about to be offered (Genesis 22).

Many Bible scholars believe these appearances are more than ordinary angels.

Because the Angel speaks as God, receives worship, and identifies Himself as God, many believe these are appearances of **Jesus Christ before His birth** (called a pre-incarnate appearance of Christ).

Whether one holds that view or simply sees Him as God's special messenger, the important point is that God Himself is speaking to Jacob.

👼 God speaks to Jacob through the Angel of God

📖 The Angel also appeared to Hagar and Abraham

🙏 Many believe this is Jesus before His earthly birth

➡️ God calls Jacob by name

---

## 🙋 Jacob… Here Am I

When God calls Jacob's name, Jacob immediately answers,

**"Here am I."**

This is a response of readiness and willingness to listen.

Throughout Scripture, faithful servants often answer God this way.

Jacob is paying attention because he recognizes this dream is from God.

🙋 Jacob immediately responds

👂 He is ready to listen

🙏 He recognizes God's voice

➡️ God explains what Jacob is seeing

---

## 🐏 Lift Up Now Thine Eyes And See

God tells Jacob to carefully look at what is happening.

In the dream, Jacob sees that the rams breeding with the flock are ringstraked, speckled, and grizzled.

This is God's way of showing Jacob that He—not luck, not the peeled branches, and not Jacob's own wisdom—is controlling the increase.

Every healthy animal Jacob receives is part of God's blessing.

🐏 God directs Jacob's attention

🙏 God controls the breeding

📈 Jacob's prosperity comes from God

➡️ God explains why

---

## 👀 For I Have Seen All That Laban Doeth Unto Thee

God tells Jacob,

**"I have seen everything Laban has done to you."**

Nothing escaped God's attention.

God saw every time Laban changed Jacob's wages.

He saw every dishonest agreement.

He saw every attempt to take advantage of Jacob.

Although Laban thought no one noticed, God had been watching all along.

This is also an encouragement for believers today.

Even when people treat us unfairly, God sees everything.

👀 God saw every injustice

⚖️ Nothing escaped His attention

🙏 God was already working behind the scenes

➡️ God reminds Jacob who He is

---

## 🏠 I Am The God Of Bethel

God reminds Jacob of **Bethel**.

Bethel means **"House of God."**

This is the place where Jacob fled from Esau many years earlier.

While sleeping there, Jacob dreamed of the ladder reaching to heaven with angels ascending and descending.

It was there that God first confirmed the covenant promises to Jacob.

Now God reminds him,

**"I am the same God who met you there."**

🏠 Bethel means House of God

🌙 Jacob first met God there in a special way

🤝 God reminds Jacob of His promises

➡️ God reminds Jacob of his commitment

---

## 🪨 Where Thou Anointedst The Pillar

After Jacob's dream at Bethel, he took the stone he had used as a pillow and stood it upright as a memorial.

He poured oil on it to dedicate the place to God.

The stone itself was never worshiped.

Instead, it served as a reminder of the moment God revealed Himself to Jacob.

God now reminds Jacob of that important day.

🪨 Jacob set up a memorial stone

🫒 He poured oil on it to dedicate it to God

📖 It marked the place where God met him

➡️ God reminds Jacob of his vow

---

## 🤝 Where Thou Vowedst A Vow Unto Me

God reminds Jacob,

**"You made a promise to Me here."**

At Bethel, Jacob vowed that if God protected him, provided for him, and brought him safely home again, then the Lord would be his God.

Now, about twenty years later, God has fulfilled those promises.

He protected Jacob.

He blessed Jacob.

He made Jacob wealthy.

Now it is time for Jacob to fulfill his part by returning home.

🤝 God remembers Jacob's vow

🙏 God has kept every promise

❤️ Now Jacob must obey

➡️ God gives the command

---

## 🏠 Arise, Get Thee Out From This Land

God tells Jacob it is time to leave Haran.

His work there is finished.

The covenant family belongs in the land God promised to Abraham and Isaac.

Jacob is to return to **Canaan**, the Promised Land, where God will continue fulfilling His covenant.

God is not simply moving Jacob geographically.

He is moving His covenant plan forward.

🏠 God tells Jacob to leave Haran

📍 He is returning to Canaan

🤝 God's covenant continues there

➡️ Rachel and Leah respond

---

## 👭 Is There Yet Any Portion Or Inheritance For Us In Our Father's House?

Rachel and Leah ask whether they have any inheritance left in their father's household.

Normally, daughters could receive gifts or financial support from their father, especially if there were no sons or through a marriage settlement.

Instead, they feel their father has treated them unfairly.

They realize Laban has cared more about what he could gain than about their well-being.

Their question is really saying,

**"Do we have anything left here worth staying for?"**

👭 Rachel and Leah question their father's treatment

💰 They feel they have no inheritance left

😔 They no longer feel valued

➡️ They explain why

---

## 🚪 Are We Not Counted Of Him Strangers?

Rachel and Leah feel as though their own father treats them like outsiders.

Instead of treating them as beloved daughters, they believe Laban has treated them like property to profit from.

They no longer feel connected to his household.

Their relationship with him has been damaged.

🚪 They feel like outsiders

💔 Laban has not treated them as cherished daughters

😔 Their trust in him is gone

➡️ They explain why

---

## 💰 He Hath Sold Us, And Hath Quite Devoured Also Our Money

Rachel and Leah believe Laban benefited financially from their marriages.

Jacob worked **fourteen years** to marry them.

That labor functioned as a bride-price paid to Laban.

Instead of saving or sharing any of that wealth with his daughters, Laban kept it for himself.

When they say he has **"devoured our money,"** they mean he has consumed everything that should have benefited them.

In their eyes, he treated them like a business transaction instead of daughters.

💰 Jacob's labor served as the bride-price

😔 Laban kept everything for himself

💔 They feel used instead of cared for

➡️ They support Jacob

---

## 🙌 All The Riches Which God Hath Taken From Our Father, That Is Ours, And Our Children's

Rachel and Leah recognize something important.

They do **not** say Jacob stole Laban's wealth.

They acknowledge that **God** gave those riches to Jacob.

Because Jacob is their husband, they recognize that his blessings now belong to their household and will provide for their children.

They understand that God's blessing has transferred to Jacob's family.

🙌 They recognize God's hand

🏠 Jacob's wealth now supports their family

👨‍👩‍👧‍👦 Their children will inherit those blessings

➡️ They encourage Jacob to obey

---

## ✅ Whatsoever God Hath Said Unto Thee, Do

Rachel and Leah fully support Jacob.

Instead of resisting the move, they encourage him to obey God immediately.

This is significant because leaving Haran means leaving everything familiar.

Yet they believe following God's direction is more important than staying with their father.

Together they agree that obedience to God is the right decision.

✅ Rachel and Leah support Jacob

🙏 They trust God's direction

🏠 The family prepares to return to Canaan

# Genesis 31:17–21

# 🐪 Jacob On The Run

---

## 🐪 Jacob Rose Up And Set His Sons And His Wives Upon Camels

Jacob immediately obeys God's command to leave.

He loads his wives, children, and household onto camels and begins the long journey back to Canaan.

By this point, about **twenty years** have passed since Jacob first arrived in Haran.

Most of his children are still young, but many are no longer babies.

Reuben, Jacob's oldest son, was likely around **six or seven years old**, while Joseph had just recently been born (Genesis 30:22–24).

Rachel was no longer barren, and she would later become pregnant with Benjamin during the journey (Genesis 35).

This was not a small family traveling alone.

It was a growing household beginning a journey home.

🐪 Jacob immediately prepares to leave

👨‍👩‍👧‍👦 Most of his children are still young

👶 Joseph has recently been born

➡️ The entire household begins moving

---

## 🐑 He Carried Away All His Cattle

Jacob was no longer a poor man arriving with only a walking staff.

Over twenty years, God had blessed him with enormous wealth.

His flocks included sheep, goats, camels, donkeys, servants, and other livestock.

Managing that many animals required numerous shepherds and servants.

This would have looked more like a moving caravan than one family taking a trip.

The Bible does not tell us exactly how many people traveled with Jacob, but it certainly included far more than Jacob, his wives, and his children.

It likely included servants, shepherds, maidservants, and hundreds—possibly thousands—of animals.

Moving such a household would have stretched across a large area as they traveled.

🐑 Jacob has become very wealthy

👨‍🌾 Many servants and shepherds likely traveled with him

🐪 Hundreds or even thousands of animals moved together

➡️ Jacob takes everything he owns

---

## 📦 All His Goods Which He Had Gotten

**Goods** refers to all of Jacob's possessions.

This included tents, clothing, cooking supplies, tools, furniture, food, valuables, animals, and everything needed to support a large household.

They were not simply moving people.

They were relocating an entire community.

Every possession had to be packed and transported for a journey that would last several weeks.

📦 Goods means all of Jacob's possessions

🏕️ The household packed everything needed for travel

🐪 They were moving an entire camp

➡️ Jacob leaves Padan-aram

---

## 🏠 To Go Unto Isaac His Father In The Land Of Canaan

Jacob is finally returning home.

He left Canaan about twenty years earlier after fleeing from Esau.

Now God is bringing him back.

The journey from **Padan-aram (Haran)** to **Canaan** was roughly **450–550 miles (725–885 km)** depending on the exact route.

Traveling with women, young children, servants, and large flocks would have been slow.

The trip likely took **several weeks**, possibly around **one month or more**, depending on weather and grazing conditions.

God had promised to bring Jacob home safely, and now that promise was beginning to be fulfilled.

🏠 Jacob returns to Canaan

🛣️ The journey was roughly 450–550 miles

🐑 Large flocks made travel slow

🙏 God is fulfilling His promise

➡️ Laban is away

---

## ✂️ Laban Went To Shear His Sheep

Laban happened to be away shearing his sheep.

Sheep shearing was an important yearly event.

It was a busy season involving many workers and often ended with celebration and feasting.

Because Laban was occupied elsewhere, Jacob had the opportunity to leave before Laban discovered what was happening.

God's timing once again protected Jacob.

✂️ Laban is busy shearing sheep

🎉 Sheep shearing was an important annual event

🙏 God provides the opportunity for Jacob to leave

➡️ Rachel does something unexpected

---

## 🗿 Rachel Had Stolen The Images That Were Her Father's

The **images** were household idols, often called **teraphim**.

These small idols were connected with family religion and false worship.

Some historians also believe they could represent inheritance rights or family authority.

The Bible does not clearly explain why Rachel stole them.

She may have wanted to keep her father from using them for divination.

She may have believed they had spiritual value.

Or she may have thought they represented the family's inheritance.

Whatever her reason, the Bible does not praise her actions.

Rachel's theft creates serious problems later in the chapter.

🗿 The images were household idols

❌ They were connected with false worship

🤔 The Bible never clearly explains Rachel's motive

➡️ Jacob leaves secretly

---

## 🤫 Jacob Stole Away Unawares To Laban The Syrian

The phrase **stole away** does **not** mean Jacob committed theft.

It means he **slipped away secretly** or **departed without being noticed**.

He left before Laban realized what was happening.

Laban is called **"the Syrian"** because he lived in the region of **Aram**, also called Syria.

His family was part of the Aramean people.

🤫 Jacob leaves secretly

👀 Laban does not know he is leaving

🌍 Laban is called the Syrian because he is an Aramean

➡️ Jacob does not tell Laban

---

## 🏃 He Told Him Not That He Fled

Jacob leaves without telling Laban.

The word **fled** means to leave quickly, especially because danger is expected.

Jacob feared Laban might stop him, take his daughters back, or prevent him from leaving.

Rather than risk confrontation, Jacob quietly departs while Laban is away.

🏃 Jacob leaves without telling Laban

⚠️ He fears Laban will stop him

🙏 He trusts God to protect him

➡️ They cross a major river

---

## 🌊 He Passed Over The River

The river refers to the **Euphrates River**, one of the largest rivers in the ancient Near East.

Crossing it marked a major step in leaving Mesopotamia behind.

Once they crossed, they were committed to the journey home.

There was no easy turning back.

🌊 The river is likely the Euphrates

🛣️ Crossing it marked a major stage of the journey

➡️ Jacob heads toward Gilead

---

## ⛰️ He Set His Face Toward Mount Gilead

To **set his face toward** something means to determine where you are going.

Jacob deliberately heads toward the mountainous region of **Gilead**, east of the Jordan River.

This area lay on the route toward Canaan.

The phrase also shows determination.

Jacob is no longer wandering.

He knows where God has told him to go, and he is moving forward in obedience.

⛰️ Set his face means to head purposefully toward

🗺️ Gilead was on the road to Canaan

🙏 Jacob is following God's direction

# Genesis 31:22–35

# 🏃 Laban Chases Jacob

---

## 🏃 It Was Told Laban On The Third Day That Jacob Was Fled

Laban does not discover Jacob's departure immediately.

Because he was away shearing his sheep, **three full days pass** before someone informs him that Jacob has left.

Those three days gave Jacob a valuable head start.

Even with that advantage, Laban eventually caught up to him, showing how urgently he pursued Jacob.

🏃 Laban learns of Jacob's departure three days later

⏳ Jacob gains a three-day head start

⚠️ Laban immediately begins chasing him

➡️ Laban gathers his men

---

## 👥 He Took His Brethren With Him

**Brethren** here refers to Laban's relatives, servants, and the men of his household.

It likely included his sons and other family members who were able to travel and help pursue Jacob.

Laban was not chasing Jacob alone.

He gathered a group large enough to catch an entire traveling caravan.

👥 Brethren means relatives and men of his household

💪 Laban gathers a search party

➡️ They begin the pursuit

---

## 🐪 Pursued After Him Seven Days' Journey

This means Laban chased Jacob for **seven more days** after learning he had fled.

Adding Jacob's three-day head start means Jacob had likely been traveling for about **ten days** before Laban finally caught him.

Considering Jacob was traveling with women, young children, servants, and thousands of animals, Laban's group had to move quickly to overtake them.

🐪 Laban pursues Jacob for seven days

📅 Jacob has been traveling about ten days total

⚡ Laban's group travels much faster

➡️ Laban catches Jacob

---

## ⛰️ They Overtook Him In Mount Gilead

**Overtook** means **caught up with**.

Laban finally reaches Jacob in the hill country of **Gilead**.

Jacob has not escaped.

Now the two large camps meet face to face.

⛰️ Overtook means caught up with

🏕️ The two camps meet in Gilead

➡️ God intervenes first

---

## 🌙 God Came To Laban In A Dream By Night

Before Laban can confront Jacob, God speaks to him in a dream.

God steps in to protect Jacob.

This shows that even though Laban is angry and has the power to harm Jacob, God remains in control of the situation.

🌙 God warns Laban before the confrontation

🙏 God protects Jacob

➡️ God gives a serious warning

---

## ⚠️ Take Heed That Thou Speak Not To Jacob Either Good Or Bad

**Take heed** means **be careful** or **watch yourself**.

The phrase **"neither good nor bad"** is a Hebrew expression meaning,

**"Do not threaten him, harm him, manipulate him, or attempt to force the situation."**

God is warning Laban not to do anything against Jacob.

Laban is allowed to speak with Jacob, but he is not allowed to take matters into his own hands.

⚠️ Take heed means be careful

🙏 God forbids Laban from harming Jacob

⚖️ God limits what Laban is allowed to do

➡️ Laban reaches Jacob's camp

---

## 🏕️ Jacob Had Pitched His Tent… And Laban Pitched In Mount Gilead

To **pitch a tent** means to set up camp.

Jacob had stopped traveling for the night and established camp in the mountains.

Laban and his men arrived and set up their own camp nearby.

Now two large groups are camped within sight of each other, preparing for a tense conversation.

🏕️ Pitch means to set up camp

👥 Two large camps now face each other

➡️ Laban confronts Jacob

---

## ❓What Hast Thou Done, That Thou Hast Stolen Away Unawares To Me?

Laban asks,

**"Why did you leave without telling me?"**

The phrase **stolen away** does not mean Jacob stole property.

It means he slipped away secretly without giving notice.

Laban is accusing Jacob of disappearing without allowing him to respond.

❓ Laban asks why Jacob left secretly

🏃 Stolen away means slipped away unnoticed

➡️ Laban accuses Jacob of kidnapping

---

## 👨‍👩‍👧 Carried Away My Daughters As Captives Taken With The Sword

Laban speaks as though Jacob kidnapped Rachel and Leah.

A **captive taken with the sword** was someone captured during war against their will.

Laban is pretending his daughters were forced to leave.

In reality, Rachel and Leah had already agreed that God wanted Jacob to leave, and they willingly went with him.

Laban ignores their decision and speaks as if they had no choice.

👨‍👩‍👧 Laban compares his daughters to prisoners of war

❌ Rachel and Leah actually chose to leave

➡️ Laban claims he deserved a farewell

---

## 🎉 I Might Have Sent Thee Away With Mirth…

Laban claims he would have thrown a celebration.

**Mirth** means joy or celebration.

The **tabret** was a small hand drum or tambourine.

The **harp** was a stringed musical instrument.

Laban says,

**"If you had told me, I would have thrown a joyful farewell with music and celebration."**

Whether he truly would have done this is doubtful.

Earlier, Jacob admitted he feared Laban would stop him from leaving.

🎉 Mirth means joyful celebration

🥁 Tabret was a tambourine-like instrument

🎵 Harp was used during celebrations

➡️ Laban says Jacob acted foolishly

---

## 😔 Thou Hast Done Foolishly In So Doing

Laban says Jacob acted unwisely.

From Laban's point of view, Jacob should have trusted him enough to leave openly.

Jacob, however, knew Laban had repeatedly deceived him over the past twenty years.

Jacob believed leaving quietly was the safest choice.

😔 Laban says Jacob acted foolishly

⚖️ Jacob believed secrecy was necessary

➡️ Laban makes a threat

---

## ⚔️ It Is In The Power Of My Hand To Do You Hurt

Laban admits he has enough men to harm Jacob if he wanted.

This is a direct threat.

He is saying,

**"I have the power to hurt you."**

But then he immediately admits he cannot because God warned him during the night.

⚔️ Laban had the ability to attack

🙏 God's warning stopped him

➡️ Laban mentions God's warning

---

## 🙏 The God Of Your Father Spake Unto Me Yesternight

Laban says,

**"The God of your father."**

He does **not** call Him **my God** because Laban still worshiped other gods, including the household idols Rachel stole.

Laban recognized Israel's God was powerful enough to warn him, but he had not devoted himself to worshiping Him alone.

This shows Laban believed in God's power without fully following Him.

🙏 Laban acknowledges God's authority

🗿 Laban still worships other gods

➡️ Laban asks about the idols

---

## 🗿 Wherefore Hast Thou Stolen My Gods?

Laban's greatest concern now becomes his household idols.

These were small carved images called **teraphim**.

They were connected to family worship and possibly inheritance rights.

Laban assumes Jacob stole them, not knowing Rachel had secretly taken them.

🗿 Laban searches for his household idols

❌ Jacob has no idea Rachel took them

➡️ Jacob answers confidently

---

## 😟 Because I Was Afraid

Jacob explains why he left secretly.

He feared Laban would forcibly keep Rachel and Leah from leaving.

**Peradventure** means **perhaps** or **maybe**.

Jacob says,

**"I thought perhaps you would take your daughters back by force."**

After twenty years of deception, Jacob no longer trusted Laban.

😟 Jacob feared Laban

💪 He believed Laban might use force

➡️ Jacob unknowingly makes a dangerous statement

---

## ⚖️ With Whomsoever Thou Findest Thy Gods, Let Him Not Live

Jacob is completely confident no one stole the idols.

Without realizing Rachel is guilty, he boldly says,

**"If you find them, that person deserves to die."**

Ironically, Jacob unknowingly pronounces judgment on his own beloved wife.

This is similar to later stories in Genesis where someone confidently speaks before knowing all the facts.

For example, when Joseph's brothers said the one with Joseph's silver cup should become a servant (Genesis 44), they unknowingly placed themselves in danger.

Jacob does not know Rachel is hiding the idols.

⚖️ Jacob believes no one stole them

😔 He unknowingly condemns Rachel

➡️ Laban begins searching

---

## 🏕️ Laban Went Into Jacob's Tent…

Laban searches every tent.

He checks Jacob's tent.

Then Leah's.

Then the tents of Bilhah and Zilpah.

Finally, he enters Rachel's tent.

Large households often lived in **multiple tents**, not one.

Each wife commonly had her own living space, while servants and children could occupy nearby tents.

So it is not unusual that Rachel had her own tent.

🏕️ Large families often lived in several tents

👨‍👩‍👧 Each wife commonly had her own tent

➡️ Rachel hides the idols

---

## 🗿 Rachel Had Taken The Images

The **images** are the same household idols mentioned earlier.

Rachel hides them inside the **camel's furniture**, which refers to the saddle bags or storage compartment attached to the camel.

She then sits on top of them.

Because she is sitting over the idols, Laban never thinks to look underneath her.

🗿 Images means household idols

🐪 Camel's furniture refers to the saddle bags

🙈 Rachel hides the idols beneath herself

➡️ Rachel deceives her father

---

## 🤫 The Custom Of Women Is Upon Me

Rachel tells Laban,

**"The custom of women is upon me."**

She is saying she is having her monthly menstrual period.

According to the customs of that time, this would have made approaching her or disturbing where she was sitting socially inappropriate and ceremonially unclean (see Leviticus 15).

Because of this, Laban does not insist that she stand up.

Rachel uses the situation to hide the idols successfully.

🤫 Rachel says she is on her monthly period

🚫 Laban does not ask her to get up

🗿 The idols remain hidden beneath her

➡️ Laban leaves without finding them

# Genesis 31:36–42

# 😠 Jacob Confronts Laban

---

## 😠 Jacob Was Wroth, And Chode With Laban

After being falsely accused and having every tent searched, Jacob finally reaches his limit.

**Wroth** means **very angry**.

**Chode** means **argued**, **rebuked**, or **confronted sharply**.

For twenty years, Jacob had remained patient while Laban repeatedly deceived him.

Now, after finding nothing, Jacob finally speaks.

😠 Wroth means very angry

🗣️ Chode means argued or rebuked

⏳ Twenty years of frustration finally come out

➡️ Jacob asks what he did wrong

---

## ❓What Is My Trespass? What Is My Sin?

A **trespass** is a wrongdoing or offense against someone.

Jacob asks,

**"What have I actually done wrong?"**

He is challenging Laban to name a real crime.

Jacob knows he has stolen nothing.

He wants Laban to explain why he has treated him like a criminal.

❓ Trespass means wrongdoing

⚖️ Jacob asks for evidence

➡️ Jacob questions the pursuit

---

## 🏃 That Thou Hast So Hotly Pursued After Me

**Hotly pursued** means **chased with great determination and urgency.**

Jacob asks,

**"Why did you chase me so aggressively?"**

Laban traveled for seven days with a large group of men as though hunting a dangerous criminal.

Jacob believes that response was completely unjustified.

🏃 Hotly pursued means chased aggressively

⚖️ Jacob believes Laban overreacted

➡️ Jacob demands proof

---

## 🔍 What Hast Thou Found Of All Thy Household Stuff?

Jacob reminds Laban that he searched every tent.

He searched Jacob's tent.

Leah's tent.

Bilhah's tent.

Zilpah's tent.

Rachel's tent.

Yet he found nothing.

Jacob says,

**"You accused me of stealing. Now show everyone what you actually found."**

🔍 Laban searched everything

❌ He found no evidence

⚖️ Jacob asks him to prove the accusation

➡️ Let everyone judge

---

## ⚖️ That They May Judge Betwixt Us Both

Jacob wants everyone present to hear both sides.

His relatives and Laban's relatives can now judge who has acted honestly.

Jacob is confident the evidence is on his side.

⚖️ Jacob welcomes an open judgment

👥 Both families hear the case

➡️ Jacob reviews twenty years of service

---

## 📅 This Twenty Years Have I Been With Thee

Jacob reminds Laban of everything he has done.

He spent:

- **14 years** working for Leah and Rachel.
- **6 more years** building his own flocks.

For **twenty years**, Jacob faithfully served Laban.

He believes his loyalty deserves better treatment than suspicion and accusations.

📅 Jacob served twenty years

👰 Fourteen years for his wives

🐑 Six years for his flocks

➡️ Jacob describes his work

---

## 🐑 Thy Ewes And Thy She-Goats Have Not Cast Their Young

**Ewes** are **female sheep**.

**She-goats** are female goats.

**Cast their young** means to miscarry or lose their babies before birth.

Jacob is saying he cared for Laban's animals so well that they remained healthy and continued reproducing.

His careful work helped Laban's wealth increase for many years.

🐑 Ewes are female sheep

🐐 She-goats are female goats

👶 Cast their young means miscarry

➡️ Jacob protected Laban's flocks

---

## 🍖 The Rams Of Thy Flock Have I Not Eaten

Jacob says he never used Laban's animals for his own food.

He did not enrich himself by secretly eating the flock he was hired to protect.

He respected Laban's property.

🍖 Jacob never took Laban's animals for himself

🙏 He acted honestly

➡️ He accepted personal losses

---

## 🐺 That Which Was Torn Of Beasts I Brought Not Unto Thee

Sometimes wild animals attacked the flock.

Normally a shepherd could bring the remains of the dead animal as proof that it had been killed by predators.

Jacob says he did not even do that.

Instead, he personally accepted responsibility.

He covered the loss himself.

🐺 Wild animals sometimes killed sheep

💰 Jacob accepted responsibility

🙏 He protected Laban's interests

➡️ Jacob paid for losses himself

---

## 💰 I Bare The Loss Of It

**Bare** means **carried** or **accepted**.

Jacob is saying,

**"I personally paid for the missing animals."**

Instead of making Laban absorb the loss, Jacob took the financial hit himself.

He sacrificed his own wealth to protect Laban's.

💰 Jacob personally paid for losses

❤️ He protected Laban's wealth

➡️ Laban still demanded payment

---

## 🛡️ Of My Hand Didst Thou Require It, Whether Stolen By Day Or Stolen By Night

Whenever an animal disappeared, Laban expected Jacob to replace it.

It did not matter whether it disappeared during the day or during the night.

Jacob bore the responsibility.

He accepted losses that many employers would not have expected a shepherd to cover.

🛡️ Laban held Jacob responsible for every loss

🌞 Day or 🌙 night made no difference

➡️ Jacob endured difficult conditions

---

## 🥵 The Drought Consumed Me, And The Frost By Night

Jacob describes the harsh conditions of shepherding.

During the day he worked under extreme heat.

At night the temperatures became bitterly cold.

Shepherds stayed outside with the animals through every season.

This was exhausting physical labor.

🥵 Scorching heat during the day

🥶 Bitter cold during the night

🐑 Shepherding required constant sacrifice

➡️ Jacob rarely rested

---

## 😴 My Sleep Departed From Mine Eyes

Jacob often stayed awake watching the flock.

Shepherds had to guard against predators, thieves, and wandering animals.

Many nights he sacrificed sleep to protect Laban's property.

😴 Jacob lost many nights of sleep

🐺 He constantly watched the flock

➡️ Twenty years of faithful service

---

## ⏳ Thus Have I Been Twenty Years In Thy House

Jacob summarizes his entire time with Laban.

Twenty years of faithful service.

Twenty years of hard labor.

Twenty years of deception.

Despite everything, Jacob remained faithful to his responsibilities.

⏳ Twenty years of labor

💪 Jacob remained faithful

➡️ Laban repeatedly changed the agreement

---

## 💵 Thou Hast Changed My Wages Ten Times

Jacob reminds Laban that he repeatedly changed their agreement.

Whenever Jacob began succeeding, Laban adjusted the terms to benefit himself.

Yet every time Laban changed the deal—from speckled animals to ringstraked animals and back again—God caused Jacob's portion to multiply.

Laban tried to control Jacob's future.

God overruled every attempt.

💵 Laban repeatedly changed the agreement

🙏 God continued blessing Jacob

➡️ God protected Jacob

---

## 🙏 Except The God Of My Father… And The Fear Of Isaac Had Been With Me

**The fear of Isaac** does **not** mean Isaac was afraid of God.

It means **the God whom Isaac reverenced, worshiped, and stood in awe of.**

Jacob is speaking about the same God worshiped by Abraham and Isaac.

He says that without God's protection, Laban would have sent him away with nothing.

Jacob gives God all the credit for preserving him.

🙏 The fear of Isaac refers to the God Isaac worshiped

🛡️ God protected Jacob

➡️ God saw everything

---

## 👀 God Hath Seen My Affliction And The Labour Of My Hands

**Affliction** means suffering, hardship, or mistreatment.

Jacob says God saw every difficult day.

He saw every unfair wage change.

He saw every sleepless night.

He saw every sacrifice Jacob made.

Nothing escaped God's attention.

👀 God saw Jacob's suffering

💪 God saw his hard work

🙏 God never forgot him

➡️ God defended Jacob

---

## ⚖️ And Rebuked Thee Yesternight

**Rebuked** means **corrected**, **warned**, or **restrained**.

Jacob reminds Laban that the only reason he did not attack was because God confronted him the night before.

God Himself defended Jacob.

Without that warning, Jacob believes Laban would have harmed him.

This ends Jacob's defense with a reminder that throughout all twenty years, God—not Jacob's own strength—had been his true protector.

⚖️ Rebuked means warned or corrected

🌙 God confronted Laban the previous night

🛡️ God protected Jacob from harm

# Genesis 31:43–55

# 🤝 Jacob Makes A Covenant With Laban

---

## 👨‍👩‍👧 These Daughters Are My Daughters, And These Children Are My Children

Laban is speaking as the head of the family.

Rachel and Leah are literally his daughters.

When he says, **"these children are my children,"** he is referring to his **grandchildren**.

In Bible times, older family members often spoke this way because the entire extended family was considered one household.

Laban is emphasizing his family connection, even though Jacob is now the head of his own household.

👨‍👩‍👧 Laban speaks as the family patriarch

👶 "My children" refers to his grandchildren

🏠 He emphasizes they are still his family

➡️ Laban claims the livestock

---

## 🐑 These Cattle Are My Cattle

Laban is not saying he legally owns Jacob's animals.

He is expressing how he feels.

For twenty years, Jacob worked with Laban's livestock.

In Laban's mind, Jacob's prosperity came from his household.

Jacob, however, has already made it clear that God gave him those animals.

This shows the difference between how Laban views the situation and how Jacob views it.

🐑 Laban feels everything came from his household

🙏 Jacob believes God gave him the increase

➡️ Laban chooses peace

---

## 🤝 Let Us Make A Covenant

A **covenant** is a serious agreement between two parties.

Unlike God's covenant, which is based on God's promises, this covenant is a **peace agreement** between two men.

Today, we might call it a **peace treaty** or a formal agreement.

Both men promise not to harm one another in the future.

🤝 A covenant is a binding agreement

🕊️ This is a peace treaty between Jacob and Laban

📖 It is different from God's covenant

➡️ They create a witness

---

## 🪨 Let It Be For A Witness Between Me And Thee

A **witness** is something that testifies an agreement was made.

No person would remain there forever.

Instead, the stone monument would remind future generations that this covenant had taken place.

Whenever someone asked,

**"Why is this pile of stones here?"**

the answer would be,

**"This marks the covenant between Jacob and Laban."**

🪨 The stones permanently remember the agreement

📖 Future generations would know what happened there

➡️ Jacob builds a memorial

---

## 🪨 Jacob Took A Stone, And Set It Up For A Pillar

A **pillar** was one large upright stone.

Jacob had done something similar years earlier at **Bethel**, where he poured oil on a stone after God appeared to him.

This pillar was different.

Instead of marking God's appearance, it marked the covenant between Jacob and Laban.

🪨 A pillar is one standing stone

📖 It serves as a memorial

➡️ More stones are gathered

---

## 🪨 Gather Stones… And Made An Heap

A **heap** simply means a large pile of stones.

The pillar was one upright stone.

The heap was many stones gathered together.

Together they formed a visible memorial that could easily be recognized by anyone traveling through the area.

🪨 Heap means pile of stones

🪨 Pillar means one standing stone

➡️ They share a covenant meal

---

## 🍞 They Did Eat There Upon The Heap

Sharing a meal often confirmed an agreement in the ancient world.

By eating together, Jacob and Laban publicly recognized that peace had been established between them.

This meal celebrated the covenant they had just made.

🍞 They share a covenant meal

🤝 The meal confirms their agreement

➡️ The monument receives names

---

## 📍 Laban Called It Jegar-sahadutha… Jacob Called It Galeed

Both names mean essentially the same thing:

**"Heap of Witness."**

The difference is the language.

**Jegar-sahadutha** is the **Aramaic** name used by Laban.

**Galeed** is the **Hebrew** name used by Jacob.

This small detail reminds us that although they were relatives, they came from different regions and spoke different dialects.

They are naming the **stone heap**, not the mountain itself.

📍 Both names mean Heap of Witness

🗣️ Laban uses Aramaic

📖 Jacob uses Hebrew

➡️ The stones become a witness

---

## 👀 This Heap Is A Witness Between Me And Thee

The heap cannot literally speak.

Instead, it serves as a permanent reminder.

Whenever either family saw the stones, they would remember the promise both men had made.

The stones "witness" by preserving the memory of the covenant.

👀 The heap reminds both families of their promise

🪨 The stones preserve the agreement

➡️ Another name is given

---

## 🏔️ Mizpah

**Mizpah** means **"watchtower"** or **"watching place."**

Laban says,

**"The LORD watch between me and thee, when we are absent one from another."**

This is **not** a romantic statement like it is sometimes used today.

Laban is really saying,

**"May God keep watch over both of us when we are apart and make sure neither one of us breaks this agreement."**

God Himself becomes the One who watches over the covenant.

🏔️ Mizpah means watchtower

👀 God watches both men

🤝 God holds them accountable

➡️ Laban protects his daughters

---

## 👩 If Thou Shalt Afflict My Daughters… Or Take Other Wives Beside My Daughters

Laban tells Jacob not to mistreat Rachel or Leah.

He also tells him not to marry additional wives besides them.

At this point Jacob already has Bilhah and Zilpah, but they came into the family through Rachel and Leah themselves.

Laban is warning Jacob not to add any new wives beyond those already in the household.

👩 Laban wants his daughters treated fairly

💍 He warns Jacob not to marry additional wives

➡️ God is the witness

---

## 🙏 God Is Witness Betwixt Me And Thee

Even if no human sees someone break the agreement, God does.

Laban reminds Jacob that the Lord Himself is watching.

God becomes the ultimate witness to the covenant.

🙏 God sees everything

⚖️ God will judge anyone who breaks the agreement

➡️ Laban explains the boundary

---

## 🚧 This Heap… And This Pillar Be Witness

The stone heap and the standing pillar mark the boundary between them.

Neither Jacob nor Laban is to cross that boundary **to attack** the other.

This is essentially a border established by covenant.

Both men promise peaceful relations from this point forward.

🚧 The stones mark the covenant boundary

🕊️ Neither man will cross to do harm

➡️ They call on God

---

## 👴 The God Of Abraham And The God Of Nahor

**Nahor** was Abraham's brother.

He was also Laban's grandfather.

That makes Nahor Jacob's **great-uncle**.

Laban refers to the God worshiped by both branches of the family.

Jacob, however, responds differently.

👴 Nahor was Abraham's brother

👨‍👩‍👦 Laban comes from Nahor's family line

➡️ Jacob answers with his own oath

---

## 🙏 Jacob Sware By The Fear Of His Father Isaac

The **Fear of Isaac** is another title for the God Isaac worshiped.

It refers to the God whom Isaac honored, reverenced, and stood in awe of.

Jacob chooses this title instead of mentioning Nahor because Jacob serves the one true God worshiped by Abraham and Isaac.

🙏 Fear means reverent awe

📖 Jacob swears by the God of Isaac

➡️ They seal the covenant

---

## 🔥 Jacob Offered Sacrifice… And Called His Brethren To Eat Bread

Jacob offers a sacrifice to God.

Then everyone shares another meal together.

The first meal celebrated the covenant.

This meal follows the sacrifice and marks the restoration of peace between the two groups.

They remain together that night without conflict.

🔥 Jacob worships God

🍞 The families share another meal

🕊️ Peace has been established

➡️ Laban returns home

---

## 🌅 Laban Rose Up… Kissed His Sons And His Daughters… And Blessed Them

When Laban says **"his sons and his daughters,"** he is speaking as the family patriarch.

The phrase includes:

- 👩 Rachel and Leah (his daughters)
- 👶 Their children (his grandchildren)

Just as earlier he called his grandchildren **"my children,"** he now includes them in his farewell.

Laban kisses them goodbye, blesses them, and returns home.

This ends Jacob's twenty-year stay in Haran and closes this chapter of his life.

🌅 Laban says goodbye to his family

👶 "His sons" includes his grandsons

🏠 Laban returns home while Jacob continues toward Canaan`;

export const GENESIS_THIRTY_ONE_PERSONAL_SECTIONS = parseGenesisThirtyOneRawNotes(GENESIS_THIRTY_ONE_RAW_NOTES);
