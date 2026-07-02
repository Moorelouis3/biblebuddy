export type GenesisEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisEighteenRawNotes(rawText: string): GenesisEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const sectionMatch = lines[index].trim().match(
      /^#\s+(.+?)\s+Genesis\s+18:(\d+)(?:[–—-](\d+))?\s*$/i,
    );

    if (!sectionMatch) {
      index += 1;
      continue;
    }

    const icon = sectionMatch[1].trim();
    const startVerse = Number(sectionMatch[2]);
    const endVerse = Number(sectionMatch[3] || sectionMatch[2]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const sectionTitleMatch = lines[index]?.trim().match(/^##\s+(.+)$/);
    if (!sectionTitleMatch) {
      throw new Error(`Missing Genesis 18 section title after verse ${startVerse}`);
    }
    const title = sectionTitleMatch[1].trim();
    index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+/.test(lines[index].trim())) {
      const trimmed = lines[index].trim();
      const phraseMatch = trimmed.match(/^###\s+(.+)$/);

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
        throw new Error(`Missing Genesis 18 explanation for ${phraseTitle}`);
      }

      phrases.push([phraseTitle, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference:
        startVerse === endVerse
          ? `Genesis 18:${startVerse}`
          : `Genesis 18:${startVerse}-${endVerse}`,
      title,
      icon,
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error(`Expected 4 Genesis 18 sections, received ${sections.length}`);
  }

  return sections;
}

export const GENESIS_EIGHTEEN_RAW_NOTES = `# 👥 Genesis 18:1–8

## Abraham Gets A Visit

### ✨ And The LORD Appeared Unto Him

God appears to Abraham once again.

This happens shortly after the covenant of circumcision in Genesis 17.

Unlike the previous chapter, where God spoke directly to Abraham, this time the Lord appears with **two angels** in the form of three men (confirmed later in Genesis 18–19).

✨ God appears again

👥 The Lord arrives with two angels

📖 This begins another personal encounter with Abraham

➡️ Abraham is sitting outside his tent

---

### 🌳 In The Plains Of Mamre

The **plains of Mamre** were near **Hebron** in Canaan.

This was where Abraham had been living for some time and where he had previously built an altar to the Lord (Genesis 13:18).

🌳 Mamre was Abraham's home

🏕️ It was near Hebron in Canaan

📖 Abraham had already built an altar there

➡️ The visit takes place at his camp

---

### ☀️ And He Sat In The Tent Door In The Heat Of The Day

The **heat of the day** was usually around midday when the sun was at its hottest.

People often rested during this time instead of traveling.

Abraham was simply sitting at the entrance of his tent when the visitors arrived.

☀️ It was the hottest part of the day

🏕️ Abraham was resting at his tent

📖 The visit came during an ordinary moment

➡️ Abraham notices something unusual

---

### 👀 And He Lifted Up His Eyes And Looked

Abraham looked up from where he was sitting.

His attention was suddenly drawn to something unexpected.

👀 Abraham looks up

📖 His attention is captured

➡️ He sees three visitors

---

### 👥 And, Lo, Three Men Stood By Him

The word **lo** means **"look"** or **"behold."**

Abraham suddenly sees **three men standing nearby.**

The Bible never describes them walking toward him.

It simply says they were there.

Later in the chapter and in Genesis 19, we learn that these visitors are **the Lord** and **two angels** appearing in human form.

👥 Three men suddenly stand before Abraham

👀 The Bible does not describe them approaching

📖 They are the Lord and two angels

➡️ Abraham immediately responds

---

### 🏃 And When He Saw Them

As soon as Abraham recognized the visitors, he acted.

He did not ignore them or wait for them to come to him.

🏃 Abraham immediately responds

📖 Hospitality begins at once

➡️ He runs to greet them

---

### 🙇 And Ran To Meet Them From The Tent Door, And Bowed Himself Toward The Ground

Running to greet visitors was a sign of eagerness and honor.

Bowing to the ground was a common act of deep respect in the ancient Near East.

At this point, Abraham may not have fully understood exactly who these visitors were, but he knew they deserved great honor.

🏃 Abraham runs to greet them

🙇 He bows in respect

📖 Hospitality was highly valued

➡️ Abraham welcomes them

---

### 🙏 And Said, My Lord

The title **"My Lord"** is a respectful way of addressing someone of honor.

As the conversation continues, it becomes clear that Abraham is speaking directly to the Lord.

🙏 Abraham respectfully addresses the Lord

📖 He recognizes their importance

➡️ Abraham asks them to stay

---

### ❤️ If Now I Have Found Favor In Thy Sight

The word **favor** means **kindness** or **grace.**

Abraham is politely saying,

*"If you are pleased with me, please allow me to serve you."*

❤️ Favor means kindness or grace

🙏 Abraham humbly offers hospitality

📖 He desires to serve his guests

➡️ He asks them not to leave

---

### 🏕️ Pass Not Away, I Pray Thee, From Thy Servant

Abraham asks the visitors not to continue on their journey just yet.

He invites them to stay for a meal and some rest.

🏕️ Abraham invites them to stay

🙏 He wants to serve them

📖 Hospitality comes first

➡️ He prepares for them

---

### 💧 Let A Little Water, I Pray You

Water was one of the greatest acts of hospitality in the hot climate of Canaan.

Travelers would arrive hot, tired, and dusty.

Offering water was one of the first ways to welcome a guest.

💧 Abraham offers water

🏜️ Travelers needed refreshment

📖 Hospitality begins with care

➡️ Their feet are washed

---

### 🦶 Be Fetched, And Wash Your Feet

Foot washing was a normal custom in the ancient world.

People walked long distances wearing sandals on dusty roads.

Washing a guest's feet refreshed them before eating or resting.

This same custom appears many times throughout Scripture.

🦶 Foot washing refreshed weary travelers

🏜️ Roads were dusty

📖 It was a common act of hospitality

➡️ Abraham invites them to rest

---

### 🌳 And Rest Yourselves Under The Tree

Abraham invites his guests to sit in the shade.

The tree would provide relief from the intense afternoon heat.

🌳 Abraham offers shade

☀️ The visitors are invited to rest

📖 Abraham cares for their comfort

➡️ Food is prepared

---

### 🍞 And I Will Fetch A Morsel Of Bread

A **morsel** means **a small portion** or **a bite.**

Abraham humbly says he'll bring "a little bread," but he actually prepares an entire feast.

This humility is a beautiful example of biblical hospitality.

🍞 Morsel means a small portion

😊 Abraham modestly describes a large meal

📖 His actions exceed his words

➡️ The guests are refreshed

---

### ❤️ And Comfort Ye Your Hearts

This means,

**"Refresh yourselves," "strengthen yourselves,"** or **"restore your strength."**

Abraham wanted his guests to be refreshed before continuing their journey.

❤️ Comfort means refresh and strengthen

🍽️ Abraham wants his guests restored

📖 Hospitality met both physical and emotional needs

➡️ They can continue afterward

---

### 🚶 After That Ye Shall Pass On

After eating and resting, the visitors could continue their journey.

Abraham expected nothing in return.

🚶 The journey would continue afterward

🙏 Abraham serves without expecting repayment

📖 Hospitality is freely given

➡️ Abraham explains why they stopped

---

### 🏕️ For Therefore Are Ye Come To Your Servant

Abraham believed God had allowed them to come his way for this very reason.

He saw serving others as a privilege rather than an interruption.

🏕️ Abraham considers it an honor to serve

🙏 He calls himself their servant

📖 Hospitality reflects humility

➡️ The visitors accept

---

### ✅ And They Said, So Do, As Thou Hast Said

The visitors accept Abraham's invitation.

His offer of hospitality is gladly received.

✅ The visitors accept

😊 Abraham's invitation is welcomed

📖 The meal begins

➡️ Abraham prepares everything quickly

---

### 🏃 And Abraham Hastened Into The Tent Unto Sarah, And Said

The word **hastened** means **hurried quickly.**

Abraham immediately involves Sarah in preparing the meal.

🏃 Abraham moves quickly

👩 Sarah joins the preparation

📖 Hospitality involved the whole household

➡️ Instructions are given

---

### 🌾 Make Ready Quickly Three Measures Of Fine Meal

**Fine meal** was high-quality flour used to make bread.

**Three measures** was a very large amount—far more than three travelers would normally eat.

This was a generous feast, not a simple snack.

🌾 Fine meal was the best flour

🍞 Abraham prepares an abundant meal

📖 Hospitality was generous

➡️ Sarah begins baking

---

### 🍞 Knead It, And Make Cakes Upon The Hearth

A **hearth** was the place used for baking or cooking, often a stone oven or a heated cooking surface.

Sarah kneaded the dough and baked fresh bread for the guests.

🍞 The hearth was the cooking place

🔥 Fresh bread was prepared

📖 Sarah joins Abraham in serving

➡️ Abraham prepares the meat

---

### 🐄 And Abraham Ran Unto The Herd, And Fetched A Calf Tender And Good

Abraham personally selected a **young, tender calf**, meaning one of the best animals from the herd.

He did not serve leftovers.

He offered his guests the very best.

🐄 Abraham chooses the best calf

🥩 Tender means young and high quality

📖 Hospitality involved giving one's best

➡️ The meal is prepared

---

### 🔪 And Gave It Unto A Young Man; And He Hasted To Dress It

The **young man** quickly prepared the calf.

The word **dress** means **to prepare for cooking**.

This included slaughtering the animal, cleaning it, cutting it into portions, and cooking it.

🔪 Dress means prepare the meat

🥩 The calf was cleaned and cooked

📖 Everything was prepared quickly

➡️ The meal is served

---

### 🧈 And He Took Butter And Milk

Along with the meat and fresh bread, Abraham served butter (or curds) and milk.

This was a complete meal by the standards of the day.

🧈 Abraham serves dairy products

🥛 Milk and butter accompany the meal

📖 Abraham provides generously

➡️ The food is served

---

### 🍽️ And The Calf Which He Had Dressed, And Set It Before Them

The calf had now been fully prepared and cooked.

Abraham personally served the meal to his guests.

Rather than sitting down first, he focused on serving them.

🍽️ The meal is fully prepared

🥩 The cooked calf is served

📖 Abraham personally waits on his guests

➡️ They begin eating

---

### 🌳 And He Stood By Them Under The Tree, And They Did Eat

While the visitors ate, Abraham stood nearby like a servant ready to help if they needed anything.

The Bible simply says,

**"They did eat,"**

showing that these heavenly visitors truly appeared in human form during this encounter.

🌳 Abraham stands nearby while they eat

🙏 He serves rather than joins them

📖 The Lord and the two angels eat the meal

➡️ The conversation is about to turn toward Sarah and God's promise

# 👶 Genesis 18:9–15

## Sarah Is Promised A Son

### ❓ And They Said Unto Him, Where Is Sarah Thy Wife?

After the meal, the visitors turn the conversation toward Sarah.

The Lord already knows where she is.

The question is not for God's information—it prepares Abraham and Sarah for the promise that is about to be spoken.

❓ The conversation shifts to Sarah

👩 God already knows where she is

📖 The promise is about to be revealed

➡️ Abraham answers

---

### 🏕️ And He Said, Behold, In The Tent

Abraham simply answers that Sarah is inside the tent.

In that culture, it was common for women to remain inside while guests were entertained outside.

🏕️ Sarah is inside the tent

👩 This was a normal custom

📖 Abraham answers honestly

➡️ God repeats His promise

---

### ⏳ And He Said, I Will Certainly Return Unto Thee According To The Time Of Life

The phrase **"according to the time of life"** means **at this same time next year**, when the normal time for a child to be born has passed.

God is now giving Abraham a specific timeline.

Within one year, He will return, and Sarah will have the promised son.

⏳ God gives a specific timetable

👶 The promise is only one year away

📖 God's timing is exact

➡️ The promise is repeated

---

### 👶 And, Lo, Sarah Thy Wife Shall Have A Son

God leaves no room for doubt.

Sarah—not Hagar—will give birth to the covenant son.

This fulfills what God had already told Abraham in Genesis 17.

👶 Sarah will give birth

📖 She is the mother of the covenant child

🙏 God's promise is repeated

➡️ Sarah overhears

---

### 👂 And Sarah Heard It In The Tent Door, Which Was Behind Him

Sarah was standing just inside the entrance of the tent listening.

The visitors were outside with Abraham, and Sarah overheard the conversation from behind them.

The Bible isn't saying God didn't know she was there.

In fact, the next verses show that He knew exactly what she was thinking.

👂 Sarah listens from inside the tent

🏕️ She overhears the conversation

📖 God knows she is there

➡️ Moses explains their age

---

### 👴 Now Abraham And Sarah Were Old And Well Stricken In Age

Moses emphasizes just how impossible this promise seemed.

**Old** means they had advanced in years.

**Well stricken in age** means they were **very far advanced in age**, stressing that they were long past the normal years for having children.

It's Moses' way of saying this would require a miracle.

👴 Abraham and Sarah were very old

📖 Humanly speaking, having a child seemed impossible

🙏 The promise would require God's power

➡️ Sarah's condition is explained

---

### 🚺 And It Ceased To Be With Sarah After The Manner Of Women

This means Sarah had passed the age of childbearing.

Her monthly cycles had stopped, making pregnancy naturally impossible.

Moses emphasizes that Isaac's birth would be the result of God's power, not human ability.

🚺 Sarah was beyond childbearing age

👶 Pregnancy was naturally impossible

📖 Isaac's birth would be miraculous

➡️ Sarah reacts

---

### 😂 Therefore Sarah Laughed Within Herself

Unlike Abraham, who laughed openly before God in Genesis 17, Sarah laughs quietly to herself.

She doesn't speak out loud.

She simply thinks the promise sounds impossible.

God, however, hears even the thoughts of her heart.

😂 Sarah laughs inwardly

💭 She keeps her thoughts to herself

📖 God knows every thought

➡️ Sarah explains her thinking

---

### 🤔 Saying, After I Am Waxed Old, Shall I Have Pleasure, My Lord Being Old Also?

The word **waxed** simply means **grown** or **become**.

Sarah is saying,

*"Now that I have grown old, will I really experience this joy?"*

The word **pleasure** most likely refers to the joy and blessing of bearing a child, though it also includes the restoration of married life at an age when she believed those years were over.

She also points out that Abraham is old as well.

🤔 Waxed means grown old

👶 Pleasure refers to the joy of having the promised child

👴 Sarah also recognizes Abraham's age

➡️ God responds

---

### ❓ And The LORD Said Unto Abraham

Although Sarah laughed silently, the Lord addresses Abraham.

This immediately shows that nothing is hidden from God.

He even knows the thoughts people never speak aloud.

❓ God speaks to Abraham

💭 He knows Sarah's thoughts

📖 Nothing is hidden from God

➡️ God asks a question

---

### ❓ Wherefore Did Sarah Laugh?

The word **wherefore** means **why**.

God is asking,

*"Why did Sarah laugh?"*

The question isn't because God lacks information.

It's meant to confront Sarah's unbelief.

❓ Wherefore means "why"

📖 God confronts Sarah's doubt

🙏 God already knew the answer

➡️ He repeats her question

---

### 👶 Saying, Shall I Of A Certainty Bear A Child, Which Am Old?

God repeats Sarah's thoughts almost word for word.

This shows that He knew exactly what she had been thinking.

👶 God repeats Sarah's private thoughts

📖 He knows what no one else heard

🙏 Nothing is hidden from Him

➡️ God reminds them of His power

---

### 💪 Is Anything Too Hard For The LORD?

This is one of the great questions of Scripture.

God reminds Abraham and Sarah that nothing is impossible for Him.

What seems impossible to people is never impossible for God.

💪 Nothing is too difficult for God

🙏 God's power has no limits

📖 Faith trusts God's ability over human circumstances

➡️ God repeats His promise

---

### ⏳ At The Time Appointed I Will Return Unto Thee

God again gives the timing.

He has not forgotten His promise.

Everything will happen exactly when He has planned.

⏳ God keeps His timetable

📖 His promises arrive at the appointed time

🙏 God is never late

➡️ The promise is confirmed

---

### 👶 According To The Time Of Life, And Sarah Shall Have A Son

Once again, God declares exactly what will happen.

Within the next year, Sarah will give birth to Isaac.

The promise is repeated because God wants Abraham and Sarah to leave with complete certainty.

👶 Sarah will have a son

📖 God's promise is certain

🙏 Isaac's birth is now only months away

➡️ Sarah responds

---

### 😟 Then Sarah Denied, Saying, I Laughed Not

Sarah immediately denies laughing.

Her response shows that she became frightened after realizing the Lord knew her private thoughts.

😟 Sarah denies laughing

💭 She realizes God knows what she thought

📖 Fear leads her to deny it

➡️ Moses explains why

---

### 😨 For She Was Afraid

Sarah was afraid because she realized she was standing before the Lord.

The One who knew her hidden thoughts also knew she had doubted His promise.

😨 Sarah fears the Lord

🙏 She realizes nothing is hidden from Him

📖 God's presence exposes the heart

➡️ The Lord responds

---

### ✋ And He Said, Nay; But Thou Didst Laugh

The word **nay** means **no**.

The Lord gently but firmly corrects Sarah.

She could hide her laughter from Abraham...

But she could not hide it from God.

✋ Nay means "no"

📖 God gently corrects Sarah

🙏 Nothing can be hidden from the Lord

➡️ The promise of Isaac remains unchanged

# 🔥 Genesis 18:16–22

## Sodom and Gomorrah

### 🚶 And The Men Rose Up From Thence

After finishing the meal, the three visitors prepared to leave.

The word **thence** simply means **"from there"** or **"from that place."**

The "men" are the same three visitors introduced earlier in the chapter—the Lord and the two angels.

🚶 The three visitors prepare to leave

📖 Thence means "from there"

👥 The Lord and the two angels continue their journey

➡️ They head toward Sodom

---

### 👀 And Looked Toward Sodom

The visitors turned their attention toward **Sodom**, showing that it was their next destination.

Sodom was located southeast of where Abraham was living near Mamre, likely around **20–30 miles (32–48 km)** away.

This would have been about **a day's journey on foot.**

👀 The visitors set their course toward Sodom

📍 Sodom was about a day's walk away

📖 Their destination had already been determined

➡️ Abraham walks with them

---

### 🚶 And Abraham Went With Them To Bring Them On The Way

This was a common act of hospitality.

Hosts often walked with their guests for part of their journey before saying goodbye.

The Bible doesn't say exactly how far Abraham went, only that he accompanied them as they departed.

🚶 Abraham walks with his guests

🤝 This was a customary act of hospitality

📖 The exact distance isn't given

➡️ God begins speaking

---

### 🤔 And The LORD Said, Shall I Hide From Abraham That Thing Which I Do?

The Lord is not asking because He is uncertain.

He is revealing His decision.

God chooses to tell Abraham what He is about to do before judgment falls on Sodom.

Abraham is God's covenant partner, and God allows him to know what is coming.

🤔 God chooses to reveal His plans

📖 Abraham is included in God's purposes

🙏 The question introduces God's decision

➡️ God explains why

---

### 🌍 Seeing That Abraham Shall Surely Become A Great And Mighty Nation

God reminds us why Abraham is different.

Abraham is not just another man.

He is the one through whom God will build His covenant nation.

Everything God is doing now is connected to His future plan through Abraham.

🌍 Abraham will become a great nation

📖 God's covenant plan continues through him

🙏 His future gives context to this moment

➡️ God's blessing reaches the world

---

### 🌎 And All The Nations Of The Earth Shall Be Blessed In Him

This repeats God's covenant promise.

Ultimately, every nation will be blessed through Abraham because **Jesus Christ** will come through Abraham's family line.

God reminds the reader that Abraham's story affects the entire world.

🌎 God's promise extends to every nation

✝️ Jesus fulfills this promise

📖 Abraham's story is part of God's plan of redemption

➡️ God explains why He trusts Abraham

---

### ❤️ For I Know Him

This means God knows Abraham personally.

God knows Abraham's heart, his faith, and his character.

It is not merely knowing facts about Abraham—it is a relationship.

❤️ God knows Abraham personally

🙏 God knows his character

📖 Abraham has God's confidence

➡️ God knows how Abraham will lead

---

### 👨‍👩‍👦 That He Will Command His Children And His Household After Him

God knows Abraham will teach his family to follow Him.

Abraham won't keep God's truth to himself.

He will pass it on to his children, his servants, and future generations.

This is one reason God reveals His plans to Abraham.

👨‍👩‍👦 Abraham will lead his household

📖 He will teach future generations

🙏 God's truth is meant to be passed down

➡️ They will follow God's ways

---

### 🛤️ And They Shall Keep The Way Of The LORD

The **way of the Lord** means living according to God's commands.

God is contrasting Abraham's household with the wickedness of Sodom.

Abraham's family is to walk in obedience.

Sodom has chosen rebellion.

🛤️ The way of the Lord means living in obedience

📖 Abraham's family is called to follow God

⚖️ This contrasts with Sodom's wickedness

➡️ God explains what that looks like

---

### ⚖️ To Do Justice And Judgment, That The LORD May Bring Upon Abraham That Which He Hath Spoken Of Him

God's covenant people are to practice **justice** (doing what is right) and **judgment** (making righteous decisions).

As Abraham faithfully follows God, the promises God made to him will continue to unfold.

⚖️ God's people are to live justly

📖 Obedience reflects God's character

🙏 God's promises continue through faithful living

➡️ God now explains Sodom's condition

---

### 😢 And The LORD Said, Because The Cry Of Sodom And Gomorrah Is Great

The **cry** refers to the overwhelming outcry caused by the city's wickedness.

The sins of Sodom had become so great that they cried out for God's justice.

This does not mean the buildings were crying.

It refers to the suffering, violence, and evil that demanded God's judgment.

😢 The cry is the outcry against Sodom's wickedness

⚖️ Their sin calls for justice

📖 God hears the cries caused by evil

➡️ God explains why

---

### ⚠️ And Because Their Sin Is Very Grievous

The word **grievous** means **extremely serious**, **very severe**, or **exceedingly wicked**.

Sodom's sin had reached an extraordinary level.

⚠️ Grievous means extremely wicked

📖 Sodom's evil had become overwhelming

⚖️ Judgment was approaching

➡️ God investigates

---

### 👣 I Will Go Down Now

This does not mean God lacked information.

God already knew everything.

The language shows God personally entering the situation before bringing judgment.

It demonstrates that God's judgment is never careless or unfair.

👣 God personally enters the situation

📖 His judgment is always just

🙏 God acts with perfect righteousness

➡️ He examines the city

---

### 🔍 And See Whether They Have Done Altogether According To The Cry Which Is Come Unto Me

God is showing that His judgment is based on complete knowledge.

He is not acting on rumor or hearsay.

The Judge of all the earth investigates perfectly before He judges.

🔍 God judges with perfect knowledge

📖 His justice is never based on rumor

⚖️ God always judges fairly

➡️ God concludes His statement

---

### 📖 And If Not, I Will Know

This is another way of saying that God will fully establish the facts before judgment.

The language emphasizes God's perfect justice, not a lack of knowledge.

📖 God's justice is complete

⚖️ Every judgment is perfectly fair

🙏 God never judges unjustly

➡️ The visitors continue

---

### 🚶 And The Men Turned Their Faces Thence, And Went Toward Sodom

The two angels continued toward Sodom.

The phrase **turned their faces** simply means they **turned and left**.

Their mission in Sodom was about to begin.

🚶 The visitors leave for Sodom

📖 Turned their faces means they departed

👥 The angels continue their mission

➡️ Abraham remains behind

---

### 🙏 But Abraham Stood Yet Before The LORD

Abraham did not block God's path.

Instead, he remained standing before the Lord while the two angels continued toward Sodom.

This sets up the remarkable conversation that follows, where Abraham intercedes on behalf of the people living in Sodom.

🙏 Abraham remains with the Lord

👥 The two angels continue to Sodom

📖 Abraham is about to intercede for the city

➡️ The next conversation begins

# 🙏 Genesis 18:23–33

## Abraham Pleads for Sodom

### 🙏 And Abraham Drew Near, And Said

Rather than walking away, Abraham steps closer to the Lord.

This isn't an act of disrespect—it shows that Abraham is about to speak boldly yet humbly with God.

This is one of the clearest examples of **intercessory prayer** in the Bible, where someone prays on behalf of others.

🙏 Abraham approaches God

🗣️ He speaks with humility and boldness

📖 He begins interceding for Sodom

➡️ Abraham asks a question

---

### ⚖️ Wilt Thou Also Destroy The Righteous With The Wicked?

The **righteous** are those who seek to follow God.

The **wicked** are those who continually reject God's ways and practice evil.

Abraham asks,

**"Will You destroy those who follow You along with those who rebel against You?"**

He knows God is just and wonders whether innocent people will suffer alongside the guilty.

⚖️ Righteous follow God

❌ Wicked reject God

🙏 Abraham appeals to God's justice

➡️ He presents a scenario

---

### 🤔 Peradventure There Be Fifty Righteous Within The City

The word **peradventure** means **"suppose"** or **"what if."**

Abraham begins with **fifty righteous people**.

Ancient cities like Sodom often contained **hundreds, and possibly several thousand people**. While the Bible never tells us Sodom's exact population, **fifty righteous people would have been only a small portion of the city.**

Abraham is asking,

**"If there are even fifty people who truly follow You, would You spare the entire city because of them?"**

🤔 Peradventure means "suppose" or "what if"

🏙️ Fifty righteous people would have been a small percentage of the city

🙏 Abraham appeals to God's mercy

➡️ He continues his request

---

### 🏙️ Wilt Thou Also Destroy And Not Spare The Place For Fifty Righteous That Are Therein?

Abraham asks whether God would spare the entire city because of the presence of fifty righteous people.

This shows Abraham believes righteous people have a preserving influence on those around them.

🏙️ Abraham asks God to spare the city

🙏 He appeals for mercy

📖 The presence of the righteous matters

➡️ Abraham appeals to God's character

---

### ⚖️ That Be Far From Thee To Do After This Manner

Abraham is not accusing God.

He's saying,

**"That isn't like You."**

He knows God's character is perfectly just.

⚖️ Abraham trusts God's character

🙏 He knows God always does what is right

📖 God's justice is perfect

➡️ He explains why

---

### ⚔️ To Slay The Righteous With The Wicked

Abraham believes it would be unjust for those who follow God to receive the same judgment as those who openly rebel against Him.

His concern is about God's justice, not merely Sodom's survival.

⚔️ Abraham asks about justice

👥 He distinguishes the righteous from the wicked

📖 God always judges rightly

➡️ He continues his argument

---

### ⚖️ And That The Righteous Should Be As The Wicked

Abraham is essentially asking,

**"Why should those who follow You be treated exactly like those who reject You?"**

His appeal is based entirely on God's righteous character.

⚖️ The righteous should not be treated like the wicked

🙏 Abraham appeals to God's fairness

📖 God's judgments are always just

➡️ Abraham trusts God's role as Judge

---

### 👑 Shall Not The Judge Of All The Earth Do Right?

This is one of the greatest statements about God's character in Scripture.

Abraham acknowledges that God is **the Judge of all the earth.**

Because He is perfectly righteous, Abraham knows He will always do what is right.

👑 God is Judge of all the earth

⚖️ His justice is perfect

📖 Abraham trusts God's character completely

➡️ God answers

---

### ❤️ And The LORD Said, If I Find In Sodom Fifty Righteous Within The City

God immediately agrees.

If fifty righteous people are found, He will spare the entire city.

This reveals God's incredible mercy.

He is willing to spare hundreds—or even thousands—of wicked people because of a faithful few.

❤️ God is willing to show mercy

👥 Fifty righteous would spare the city

📖 Mercy triumphs over immediate judgment

➡️ God explains why

---

### 🏙️ Then I Will Spare All The Place For Their Sakes

God says the righteous would benefit everyone living in the city.

Their presence alone would delay judgment.

This reveals how much influence faithful people can have.

🏙️ The righteous benefit those around them

🙏 God is willing to spare the city

📖 The faithful have preserving influence

➡️ Abraham continues asking

---

### 🙇 Oh, Let Not The Lord Be Angry, And I Will Speak

As Abraham continues lowering the number from fifty to forty-five, forty, thirty, twenty, and finally ten, he pauses several times to ask God not to be angry.

Abraham knows he is speaking boldly before the Creator of the universe.

His humility is just as noticeable as his courage.

🙇 Abraham remains humble

🙏 He speaks with reverence

📖 Bold prayer should always be joined with humility

➡️ Abraham continues interceding

---

### 🙏 Behold Now, I Have Taken Upon Me To Speak Unto The Lord

Abraham recognizes the privilege of speaking directly with God.

He understands that he deserves nothing, yet God graciously allows the conversation to continue.

🙏 Abraham recognizes God's grace

🙇 He speaks with humility

📖 He never loses his reverence

➡️ The conversation continues

---

### 🤝 And The LORD Went His Way, As Soon As He Had Left Communing With Abraham

The word **communing** means **talking together**, **conversing**, or **fellowshipping**.

When their conversation ended, the Lord departed.

God had patiently listened to every request Abraham made.

🤝 Communed means talked together

🗣️ God patiently listened to Abraham

📖 Their conversation comes to an end

➡️ Abraham returns home

---

### 🏕️ And Abraham Returned Unto His Place

Abraham could do nothing more.

He had prayed.

He had interceded.

Now he left the outcome in God's hands.

This chapter ends with Abraham trusting God's perfect justice and perfect mercy.

🏕️ Abraham returns home

🙏 He leaves the situation with God

📖 Faith prays and then trusts God with the outcome

➡️ The story now moves to Sodom itself in Genesis 19`;

export const GENESIS_EIGHTEEN_PERSONAL_SECTIONS = parseGenesisEighteenRawNotes(
  GENESIS_EIGHTEEN_RAW_NOTES,
);
