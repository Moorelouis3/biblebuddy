export type GenesisThirtySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtySevenRawNotes(rawText: string): GenesisThirtySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+37:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 37 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+37:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+37:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 37 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 37,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 37:${startVerse}` : `Genesis 37:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Genesis 37 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_SEVEN_RAW_NOTES = `# Genesis 37:1–4

# 🏕️ Joseph And His Brothers

---

## 🏕️ And Jacob Dwelt In The Land Wherein His Father Was A Stranger

After finishing the history of Esau and the nation of Edom, Moses now returns to the family line through which God's covenant would continue.

Esau settled in **Mount Seir** and became the father of the **Edomites**, a growing nation with chiefs, cities, and kings.

Now the story shifts back to **Jacob**, because God's promises to Abraham were passed through him—not Esau.

The word **"stranger"** means **sojourner** or **temporary resident**. Although God had promised this land to Abraham and his descendants, Isaac never owned most of it during his lifetime. He lived there by faith, trusting God's promise.

Jacob now lives in the same land where his father Isaac had lived as a sojourner.

🏕️ Moses returns to Jacob's family

🌎 Esau became the father of the nation of Edom

🙏 Isaac and Jacob lived in Canaan by faith as sojourners

➡️ In The Land Of Canaan

---

## 🌎 In The Land Of Canaan

Canaan was the land God promised to Abraham when He called him to leave his homeland.

That promise was passed from **Abraham** to **Isaac**, and then to **Jacob**.

Although both Jacob and Esau became wealthy enough that the land could not support them together, Jacob remained in Canaan because this was the land of God's covenant promise.

Esau established his nation in Mount Seir, while Jacob remained in the Promised Land.

🌎 Canaan was the Promised Land

📖 God's covenant continued through Jacob

⛰️ Esau settled in Mount Seir while Jacob remained in Canaan

➡️ These Are The Generations Of Jacob

---

## 📖 These Are The Generations Of Jacob

This is one of Moses' most important transition phrases in Genesis.

The phrase **"These are the generations…"** introduces the next major section of the book.

Now the focus shifts from Jacob himself to what happened through his family.

Although Jacob had twelve sons, this section mainly follows the life of **Joseph**, because God would use him to preserve Jacob's family during a coming famine.

Through Joseph, God would save not only his own family but also many other lives throughout the region.

📖 Moses begins the history of Jacob's family

👨 The story now centers mainly on Joseph

🌾 God will use Joseph to preserve many lives

➡️ Joseph, Being Seventeen Years Old

---

## 👦 Joseph, Being Seventeen Years Old

This is the first major introduction to **Joseph** in Genesis.

He is **seventeen years old**, making him one of the youngest of Jacob's sons.

Joseph's life will become the main focus of the rest of Genesis.

God will take him from being a shepherd's son to becoming the ruler of Egypt, using him to preserve His covenant family during a worldwide famine.

At seventeen, Joseph is still young, faithful, and learning, but God is already preparing him for a much greater purpose.

👦 Joseph is introduced at seventeen years old

👑 God is preparing him for an extraordinary future

🌾 He will one day preserve many lives

➡️ Was Feeding The Flock With His Brethren

---

## 🐑 Was Feeding The Flock With His Brethren

Like the rest of Jacob's sons, Joseph worked as a shepherd.

He was out in the fields caring for the family's flocks alongside his brothers.

Shepherding required long days, protecting the sheep, finding food and water, and keeping them safe from danger.

Although Joseph would one day become a ruler, he first learned responsibility through ordinary work.

🐑 Joseph worked as a shepherd

👨‍👦 He worked alongside his brothers

➡️ And The Lad Was With The Sons Of Bilhah, And With The Sons Of Zilpah

---

## 👨‍👦 And The Lad Was With The Sons Of Bilhah, And With The Sons Of Zilpah

Joseph was working specifically with the sons of **Bilhah** and **Zilpah**, the two servant wives of Jacob.

These brothers included:

- **Dan**
- **Naphtali** (sons of Bilhah)
- **Gad**
- **Asher** (sons of Zilpah)

The Bible does not explain why Joseph was with these four brothers instead of all eleven.

Some Bible teachers suggest they may have been assigned to work together, while others simply see this as describing the group Joseph happened to be with at that time.

Scripture does not tell us more, so we should avoid going beyond what it says.

👨‍👦 Joseph was with Bilhah's and Zilpah's sons

📖 The Bible does not explain why this particular group is mentioned

➡️ And Joseph Brought Unto His Father Their Evil Report

---

## ⚠️ And Joseph Brought Unto His Father Their Evil Report

Joseph returned to Jacob and reported wrongdoing that he had witnessed.

The phrase **"evil report"** means Joseph was reporting behavior that was sinful or wicked—not merely annoying or immature.

The Bible does not tell us exactly what his brothers were doing.

Because Scripture is silent, we cannot say for certain.

However, Joseph's older brothers had already shown a pattern of violent and sinful behavior. Reuben had dishonored his father by sleeping with Bilhah. Simeon and Levi had slaughtered the men of Shechem, and the other brothers joined in plundering the city and taking its women, children, and possessions.

That background helps explain why Jacob may have taken Joseph's report seriously.

⚠️ "Evil report" refers to serious wrongdoing

📖 The Bible does not reveal exactly what happened

👨 Jacob already knew some of his older sons had acted wickedly before

➡️ Now Israel Loved Joseph More Than All His Children

---

## ❤️ Now Israel Loved Joseph More Than All His Children

The Bible openly says that Jacob loved Joseph more than his other sons.

This favoritism was visible to the entire family.

Several reasons are given or suggested in Scripture.

The very next verse says Joseph was **"the son of his old age."**

Joseph was also the **first son of Rachel**, the wife Jacob loved most and worked fourteen years to marry.

After Rachel died, Joseph likely became even more precious to his father.

Some Bible teachers also observe that Joseph's character stands in sharp contrast to many of his older brothers, who had already committed serious sins recorded in Genesis.

Whatever the reasons, Jacob's favoritism was obvious, and it created division within the family.

❤️ Joseph was Jacob's favorite son

💔 He was Rachel's firstborn

⚠️ Jacob's favoritism became obvious to the whole family

➡️ Because He Was The Son Of His Old Age

---

## 👴 Because He Was The Son Of His Old Age

Joseph was born when Jacob was much older than he had been when his older sons were born.

After waiting many years for Rachel to have children, Joseph's birth was especially joyful.

His birth reminded Jacob that God had answered Rachel's prayers after years of barrenness.

This helps explain why Joseph held a special place in his father's heart.

👴 Joseph was born during Jacob's later years

🙏 His birth came after Rachel's long period of barrenness

➡️ And He Made Him A Coat Of Many Colours

---

## 👕 And He Made Him A Coat Of Many Colours

Jacob gave Joseph a special robe that set him apart from his brothers.

The exact appearance of the garment is debated. The Hebrew may describe a richly ornamented or long-sleeved robe, but in the King James Version it is called **"a coat of many colours."**

Either way, it was an expensive garment that marked Joseph as someone receiving special honor.

For a family of shepherds who spent their days caring for flocks, this was not the kind of clothing normally worn for hard labor.

The coat became a visible symbol of Jacob's favoritism.

Instead of bringing Joseph respect from his brothers, it placed a target on his back and increased their jealousy.

👕 Joseph received a costly, honored robe

🐑 It was unusual clothing for a working shepherd

💔 The coat became a symbol of favoritism

➡️ When His Brethren Saw That Their Father Loved Him More

---

## 👀 And When His Brethren Saw That Their Father Loved Him More Than All His Brethren

Joseph's brothers **saw** the favoritism for themselves.

Jacob did not keep his preference hidden.

The special robe and the attention Joseph received made it obvious that he was treated differently.

Jacob had grown up in a home where favoritism caused conflict—Isaac favored Esau, while Rebekah favored Jacob.

Sadly, Jacob repeated the same mistake in his own family.

👀 The favoritism was visible to everyone

👕 The special robe made it impossible to hide

⚠️ Jacob repeated the pattern of favoritism from his own childhood

➡️ They Hated Him

---

## 💔 They Hated Him

The jealousy of Joseph's brothers grew into hatred.

Hatred is more than simple dislike—it is a deep resentment that desires harm rather than good.

Instead of rejoicing over their younger brother, they allowed jealousy to control their hearts.

This hatred will continue to grow throughout Joseph's story.

💔 Jealousy became hatred

⚠️ Sin continued to grow in their hearts

➡️ Could Not Speak Peaceably Unto Him

---

## 🗣️ And Could Not Speak Peaceably Unto Him

Joseph's brothers became so bitter that they could not even speak kindly to him.

Their conversations were marked by hostility instead of peace.

Many Bible teachers understand this to mean they regularly spoke harshly or disrespectfully to Joseph because of the resentment they carried.

The broken relationship inside Jacob's family sets the stage for the events that follow.

🗣️ Joseph's brothers could not speak kindly to him

💔 Their hatred affected the way they treated him every day

➡️ Joseph's Dreams Begin

# Genesis 37:5–8

# 💭 Joseph Has A Dream

---

## 💭 And Joseph Dreamed A Dream, And He Told It His Brethren

God gave Joseph a significant dream, but Joseph immediately shared it with his brothers.

This shows Joseph's honesty, but it may also reveal his youthful **naivety**.

The previous verses already told us that his brothers **hated him** and **could not speak peacefully to him**. Joseph knew they disliked him because they openly showed it.

Yet he still told them a dream that placed him in a position above them.

Some Bible teachers believe Joseph was simply excited to share what God had shown him. Others think he was immature and did not yet understand how his words would affect his brothers.

The Bible does not condemn Joseph for telling the dream, but it does show that he underestimated the jealousy already growing in his family.

💭 God gave Joseph a dream

👦 Joseph honestly shared it with his brothers

⚠️ His youth and inexperience may have kept him from seeing how they would react

➡️ And They Hated Him Yet The More

---

## 💔 And They Hated Him Yet The More

Before Moses even tells us the dream, he tells us its result.

This prepares us for what is coming.

Joseph's brothers already hated him because of Jacob's favoritism.

Now that hatred grows even stronger after hearing Joseph speak.

Their hearts were becoming harder with each new event.

💔 Moses tells us the result before the dream itself

📈 Their hatred continued to grow

➡️ Hear, I Pray You, This Dream Which I Have Dreamed

---

## 🗣️ Hear, I Pray You, This Dream Which I Have Dreamed

The phrase **"I pray you"** does not mean Joseph is praying to his brothers.

In the King James Version, it is an old English expression meaning:

- **"Please."**
- **"I ask you."**
- **"Listen, if you will."**

Joseph is politely asking his brothers to listen as he tells them about his dream.

🗣️ "I pray you" means "please" or "I ask you"

👂 Joseph politely asks his brothers to listen

➡️ For, Behold, We Were Binding Sheaves In The Field

---

## 🌾 For, Behold, We Were Binding Sheaves In The Field

A **sheaf** is a bundle of grain stalks that have been cut during harvest and tied together.

To **bind sheaves** means to gather the harvested grain and tie it into bundles so it could be carried or stored.

Since Jacob's family raised both livestock and crops, this would have been familiar work.

Joseph's dream begins with an ordinary farming scene that his brothers would immediately understand.

🌾 A sheaf is a bundle of harvested grain

🪢 Binding sheaves means tying the grain together after harvest

➡️ Lo, My Sheaf Arose, And Also Stood Upright

---

## 🌾 Lo, My Sheaf Arose, And Also Stood Upright

The word **"Lo"** means **"Look!"**, **"Behold!"**, or **"Suddenly!"**

In the dream, Joseph's bundle of grain unexpectedly stood upright while the others remained around it.

This unusual event signals that the dream has a symbolic meaning rather than describing a normal harvest.

The standing sheaf represents Joseph being raised to a position of honor and authority.

👀 "Lo" means "Look!" or "Behold!"

🌾 Joseph's sheaf stood upright

👑 It symbolized Joseph being lifted to a position of honor

➡️ And, Behold, Your Sheaves Stood Round About, And Made Obeisance To My Sheaf

---

## 🙇 And, Behold, Your Sheaves Stood Round About, And Made Obeisance To My Sheaf

The word **"obeisance"** means **to bow down**, **show respect**, or **pay homage** to someone in authority.

In Joseph's dream, the other sheaves surrounded his sheaf and bowed before it.

The symbolism was clear.

Joseph's brothers understood that the dream pictured them one day bowing before Joseph.

🙇 Obeisance means to bow in respect or submission

🌾 The brothers' sheaves bowed before Joseph's sheaf

👑 The dream pointed to Joseph being honored above his brothers

➡️ Shalt Thou Indeed Reign Over Us?

---

## 👑 And His Brethren Said To Him, Shalt Thou Indeed Reign Over Us?

Joseph's brothers immediately understood what the dream meant.

They were offended by the thought that their younger brother might one day rule over them.

In their culture, the older brothers normally held greater honor and authority.

**Reuben**, as the firstborn, would have expected to lead the family after Jacob.

Instead, Joseph—the second-youngest son—was describing a future where they would bow before him.

From their perspective, the idea sounded unbelievable and insulting.

👑 The brothers understood the meaning of the dream

👨 Reuben and the older brothers expected to lead the family

😠 Joseph's dream challenged everything they expected

➡️ Or Shalt Thou Indeed Have Dominion Over Us?

---

## 🌍 Or Shalt Thou Indeed Have Dominion Over Us?

The word **"dominion"** means **rule**, **authority**, or **government over others**.

Earlier in Genesis, God gave mankind dominion over the animals and over the earth (Genesis 1:26-28).

Here, Joseph's brothers ask whether he is claiming that he will one day have authority over them.

They are not asking an honest question.

They are reacting with anger because they believe Joseph is claiming a position far above his place in the family.

🌍 Dominion means authority or rule

👑 The brothers believed Joseph was claiming authority over them

➡️ And They Hated Him Yet The More For His Dreams, And For His Words

---

## 💔 And They Hated Him Yet The More For His Dreams, And For His Words

Joseph's dream did not create their hatred—it intensified what was already there.

Moses says they hated him **because of his dreams and because of his words**.

Whether Joseph shared the dream with youthful excitement or simple honesty, his brothers rejected both the message and the messenger.

Instead of asking whether God might be speaking, they allowed jealousy to harden their hearts even further.

Their hatred is becoming the driving force behind the events that will soon follow.

💔 Their hatred continued to grow

💭 They rejected both Joseph's dream and his words

⚠️ Jealousy was preparing them for an even greater sin

➡️ Joseph's Second Dream

# Genesis 37:9–11

# 🌙 Joseph Has Another Dream

---

## 💭 And He Dreamed Yet Another Dream, And Told It His Brethren

Not long after the first dream, Joseph received another dream from God.

Once again, he told it to his brothers.

Considering that his first dream had already increased their hatred, this may show Joseph's youth and inexperience. He either did not realize how deeply his brothers resented him, or he believed it was important to tell them what God had revealed.

The Bible never says Joseph was boasting. Many Bible teachers believe he was simply reporting the dream honestly, though without the wisdom to recognize how it would be received.

💭 God gave Joseph another dream

👦 Joseph shared it with his brothers again

⚠️ His youth may have kept him from recognizing how badly they would react

➡️ Behold, I Have Dreamed A Dream More

---

## 🌙 Behold, I Have Dreamed A Dream More

The phrase **"I have dreamed a dream more"** simply means:

**"I have had another dream."**

Joseph is telling his family that God has given him a second dream.

The second dream is important because it confirms the message of the first.

In the Bible, when God repeats something, it often emphasizes that His purpose is certain and will come to pass.

🌙 Joseph received a second dream

📖 The second dream confirms the first

➡️ And, Behold, The Sun And The Moon And The Eleven Stars Made Obeisance To Me

---

## 🌞 And, Behold, The Sun And The Moon And The Eleven Stars Made Obeisance To Me

This dream uses heavenly bodies as symbols instead of bundles of grain.

The **sun** represents **Jacob**, the head of the family.

The **eleven stars** represent Joseph's eleven brothers.

The **moon** most likely represents the family's mother figure.

Because Rachel had already died, Bible teachers have suggested different possibilities.

Some believe the moon represents **Leah**, who was Jacob's senior wife and likely became the family's leading matriarch after Rachel's death.

Others suggest it could represent **Bilhah**, Rachel's handmaid, who may have helped care for Joseph and Benjamin after Rachel died.

The Bible does not identify the moon specifically, so we cannot be certain.

The word **"obeisance"** means to bow down in honor or submission.

Just as in the first dream, Joseph's family understood that the dream pointed to him being honored above the rest of the household.

🌞 The sun represents Jacob

🌙 The moon likely represents the family's mother figure

⭐ The eleven stars represent Joseph's brothers

🙇 Obeisance means to bow in honor or submission

➡️ And He Told It To His Father, And To His Brethren

---

## 👨‍👦 And He Told It To His Father, And To His Brethren

Unlike the first dream, Joseph now tells both his father and his brothers.

The dream no longer involves only the brothers.

It now includes the entire family.

Joseph appears to believe the dream is important enough for everyone to hear, including Jacob.

👨‍👦 Joseph shared the dream with his whole family

🏡 The dream involved more than just the brothers

➡️ And His Father Rebuked Him

---

## ⚠️ And His Father Rebuked Him

The word **"rebuked"** means **to correct**, **to scold**, or **to express disapproval**.

Jacob immediately questioned Joseph's dream.

His response may have been intended to correct Joseph in front of his brothers or to calm the growing tension within the family.

Even though Jacob questioned the dream, his reaction does not end there.

⚠️ Rebuked means to correct or express disapproval

👨 Jacob publicly challenged Joseph's words

➡️ What Is This Dream That Thou Hast Dreamed?

---

## ❓ What Is This Dream That Thou Hast Dreamed?

Jacob asks Joseph what this dream is supposed to mean.

He continues:

**"Shall I and thy mother and thy brethren indeed come to bow down ourselves to thee to the earth?"**

Jacob immediately understands the symbolism.

He recognizes that the sun represents himself and that the rest of the family is also included.

Jacob had personally experienced God's guidance through dreams and visions.

God had spoken to him at Bethel through the dream of the ladder reaching to heaven.

God had spoken to him on multiple occasions throughout his life.

He had wrestled with God and received the new name **Israel**.

Because of these experiences, Jacob knew that God could reveal His plans through dreams.

While he questions Joseph openly, he does not dismiss the possibility that the dream may have come from God.

❓ Jacob understood the symbolism immediately

🌙 He knew God often spoke through dreams

🙏 His own life had been shaped by God's revelations

➡️ And His Brethren Envied Him

---

## 😠 And His Brethren Envied Him

The brothers' attitude now changes from hatred alone to **envy**.

Envy is the painful desire to possess what someone else has or to resent the favor they receive.

Joseph was already his father's favorite.

Now his brothers hear that God may also have a special purpose for him.

Instead of humbling themselves before God, they became even more resentful toward Joseph.

😠 The brothers became jealous of Joseph's future

💔 Their resentment continued to grow

➡️ But His Father Observed The Saying

---

## 🤔 But His Father Observed The Saying

Although Jacob publicly rebuked Joseph, he did not forget the dream.

The phrase **"observed the saying"** means Jacob **kept the matter in mind**, **thought about it carefully**, and **waited to see what God would do**.

This is similar to how other people in Scripture quietly treasured and reflected on things they did not yet fully understand.

Jacob's experiences with God had taught him that God's plans often seemed impossible at first but became clear in time.

Instead of dismissing Joseph's dream, Jacob quietly remembered it.

🤔 Jacob carefully kept the dream in mind

🙏 He had learned that God often reveals His plans before they happen

⏳ He waited to see whether God would bring the dream to pass

➡️ Joseph Is Sent To His Brothers

# Genesis 37:12–17

# 🚶 Joseph Searches For His Brothers

---

## 🐑 And His Brethren Went To Feed Their Father's Flock In Shechem

Some time has passed since Joseph's dreams.

His brothers traveled north to **Shechem** to graze Jacob's flocks.

Shechem is an important location in Jacob's life.

It was here that Dinah was assaulted, and Simeon and Levi later killed all the men of the city. Afterward, Jacob feared that the surrounding Canaanite nations would unite against his family because of what his sons had done (Genesis 34).

Later, God told Jacob to leave Shechem and travel to Bethel (Genesis 35).

Now the brothers have returned to the area around Shechem to find good pasture for the sheep.

The Bible does not explain why they returned, but the region was known for fertile grazing land.

🐑 The brothers returned to the region of Shechem

⚔️ This is the same place where the massacre of Shechem took place

🌿 The area was known for good pasture

➡️ Israel Said Unto Joseph…

---

## 👨 And Israel Said Unto Joseph, Do Not Thy Brethren Feed The Flock In Shechem?

Notice that Joseph is not with his brothers.

The others have already taken the flocks north, while Joseph remains with Jacob.

The journey from **Hebron to Shechem** was roughly **50 miles (80 km)**.

Traveling with large flocks would likely take **three to five days**, since sheep move slowly and need frequent stops for food and water.

The brothers would have slept outdoors, watched for predators, protected the animals from thieves, and searched for fresh grazing land.

Jacob asks Joseph,

"Aren't your brothers feeding the flock in Shechem?"

This prepares Joseph for an important assignment.

👨 Joseph remained with Jacob

🐑 His brothers had already traveled several days to Shechem

🏕️ Shepherding required difficult travel and camping outdoors

➡️ Come, And I Will Send Thee Unto Them

---

## 🚶 Come, And I Will Send Thee Unto Them

Jacob sends Joseph to check on his brothers.

Earlier, Joseph had brought his father an **evil report** about wrongdoing among his brothers.

Now Jacob once again entrusts Joseph with checking on them.

The Bible does not explicitly say Jacob distrusted his sons because of their past sins, but considering everything already recorded in Genesis—including Reuben's sin and the violence at Shechem—it is understandable why Jacob wanted to know how they were doing.

Joseph's task was not to help with the sheep but to see how his brothers and the flocks were faring and report back.

🚶 Jacob sends Joseph to check on his brothers

📖 Joseph had previously reported wrongdoing

👀 Joseph's assignment was to observe and report back

➡️ And He Said To Him, Here Am I

---

## 🙋 And He Said To Him, Here Am I

Joseph immediately agrees to obey his father.

The phrase **"Here am I"** means,

"I am ready."

or

"I am available."

It is a response of willingness and obedience.

Throughout Scripture, faithful servants often respond this way when called.

Abraham answered God this way (Genesis 22:1), Moses did the same (Exodus 3:4), and later Isaiah would also respond, "Here am I; send me" (Isaiah 6:8).

Joseph demonstrates a willing and obedient heart.

🙋 "Here am I" expresses readiness and obedience

🙏 Joseph willingly accepted his father's assignment

➡️ Go, I Pray Thee, See Whether It Be Well With Thy Brethren

---

## 🛤️ Go, I Pray Thee, See Whether It Be Well With Thy Brethren

Jacob asks Joseph to travel north and check on both his brothers and the flocks.

The phrase **"I pray thee"** simply means **"please."**

Joseph would be traveling alone across rugged countryside.

The journey involved walking for several days through hills and open country where travelers could face wild animals, dangerous terrain, robbers, or other threats.

This was not a short afternoon walk but a demanding journey requiring courage and endurance.

Joseph obeyed without hesitation.

🛤️ Jacob asked Joseph to travel alone

🐺 The journey carried real dangers and hardships

🙏 Joseph obeyed without hesitation

➡️ And Bring Me Word Again

---

## 📖 And Bring Me Word Again

Jacob wanted Joseph to return with news.

His assignment was simple:

- Check on the brothers.
- Check on the flocks.
- Return home and report what he found.

Joseph was acting as his father's trusted messenger.

📖 Joseph was sent to bring back a report

👨 Jacob wanted to know that everyone was safe

➡️ So He Sent Him Out Of The Vale Of Hebron

---

## 🏞️ So He Sent Him Out Of The Vale Of Hebron

Jacob's family was living near **Hebron** in southern Canaan.

From there, Joseph began the long journey north.

The distance from Hebron to Shechem was approximately **50 miles (80 km)**, a journey that likely required **three to five days on foot**.

Joseph traveled alone, leaving the safety of home to fulfill his father's request.

🏞️ Joseph began his journey from Hebron

🚶 The trip to Shechem took several days on foot

➡️ And He Came To Shechem

---

## 🌿 And He Came To Shechem

Joseph faithfully completed the first part of his journey.

After several days of traveling, he finally arrived in the region of Shechem.

But when he arrived, his brothers were nowhere to be found.

🌿 Joseph reached Shechem

👀 His brothers had already moved on

➡️ A Certain Man Found Him

---

## 👤 And A Certain Man Found Him, And, Behold, He Was Wandering In The Field

Joseph searched the countryside looking for his brothers but could not find them.

As he wandered through the fields, an unnamed man noticed him.

The Bible never identifies this man.

Some have wondered whether God providentially placed him there to help Joseph, while others simply see him as a local resident.

The text does not say, but the encounter becomes crucial because it keeps Joseph moving toward God's plan.

👤 An unnamed man found Joseph searching

🧭 This meeting directed Joseph to his brothers

➡️ What Seekest Thou?

---

## ❓ And The Man Asked Him, Saying, What Seekest Thou?

The man simply asks,

"What are you looking for?"

Joseph's wandering had made it obvious that he was searching for someone.

This question opens the way for Joseph to explain why he has come.

❓ The man notices Joseph is searching for someone

➡️ I Seek My Brethren

---

## 👨‍👦 And He Said, I Seek My Brethren: Tell Me, I Pray Thee, Where They Feed Their Flocks

Joseph politely explains that he is looking for his brothers.

Again, **"I pray thee"** means **"please."**

Joseph is asking for directions because he genuinely cannot find them.

Despite already traveling for several days, he continues searching rather than giving up.

👨‍👦 Joseph politely asks for help

🙏 He remains committed to completing his father's assignment

➡️ They Are Departed Hence

---

## 📍 And The Man Said, They Are Departed Hence: For I Heard Them Say, Let Us Go To Dothan

The man tells Joseph that his brothers have already left Shechem.

They had moved on to **Dothan**, another area with pasture for their flocks.

Dothan was located about **12–15 miles (19–24 km)** north of Shechem, adding another day's journey on foot.

Instead of turning back, Joseph continued following them.

📍 The brothers had moved on to Dothan

🌿 Dothan provided more grazing land

🚶 Joseph continued his search

➡️ Joseph Went After His Brethren

---

## 🚶 And Joseph Went After His Brethren, And Found Them In Dothan

Joseph faithfully completed his mission.

His journey now included:

- **Hebron → Shechem** (about 50 miles / 80 km)
- **Shechem → Dothan** (about 12–15 miles / 19–24 km)

Altogether, Joseph walked roughly **62–65 miles (100–105 km)** before finding his brothers.

After locating them, he would still have needed to make the long journey back to Hebron to report to Jacob.

Joseph's willingness to travel such a great distance alone demonstrates his obedience, perseverance, and faithfulness to his father's instructions.

🚶 Joseph traveled more than 60 miles to find his brothers

🙏 He faithfully completed the task his father gave him

➡️ Joseph's Brothers Conspire Against Him

# Genesis 37:18–27

# ⚔️ The Brothers Make A Plan

---

## 👀 And When They Saw Him Afar Off

Joseph's brothers recognized him while he was still **far away**.

Because he was approaching from a distance, they had plenty of time to discuss what they wanted to do before he arrived.

Joseph had no idea what was waiting for him.

He had faithfully traveled more than 60 miles to check on his brothers, believing he was carrying out his father's instructions.

👀 The brothers saw Joseph long before he reached them

⏳ They had time to plan before he arrived

➡️ Even Before He Came Near Unto Them, They Conspired Against Him To Slay Him

---

## ⚔️ Even Before He Came Near Unto Them, They Conspired Against Him To Slay Him

The word **"conspired"** means to secretly plan together.

The word **"slay"** means **to kill** or **to murder**.

Before Joseph even spoke a single word, his brothers had already decided to kill him.

Joseph was far from home, alone, and completely vulnerable.

The Bible shows how deeply hatred had taken root in their hearts. Their jealousy had now grown into a murder plot.

⚔️ They secretly planned to murder Joseph

💔 Their hatred had reached its worst point

➡️ Behold, This Dreamer Cometh

---

## 💭 And They Said One To Another, Behold, This Dreamer Cometh

Instead of calling him **their brother**, they called him **"this dreamer."**

The nickname was meant as an insult.

Joseph's dreams had become the very thing they hated most about him.

Every time they looked at him, they were reminded of the possibility that one day they might bow before him.

Rather than asking whether God might be speaking through the dreams, they mocked Joseph and allowed their resentment to grow.

💭 They mocked Joseph by calling him "the dreamer"

😠 His dreams had become a source of bitterness

➡️ Come Now Therefore, And Let Us Slay Him…

---

## 🕳️ Come Now Therefore, And Let Us Slay Him, And Cast Him Into Some Pit

The brothers planned to kill Joseph and throw his body into a **pit**.

These pits were often large cisterns dug into the ground to collect rainwater during the wet season.

When empty, they became deep, dry holes with steep sides that were almost impossible to climb out of.

Many were between **10 and 20 feet (3–6 meters)** deep.

Throwing someone into one could leave them trapped with no way to escape.

🕳️ A pit was usually a dry water cistern

⬇️ It was deep enough to trap a person

➡️ And We Will Say, Some Evil Beast Hath Devoured Him

---

## 🐺 And We Will Say, Some Evil Beast Hath Devoured Him

The brothers planned to lie to Jacob.

They would claim that a wild animal had attacked Joseph.

Large predators living in the land during that period included:

- 🦁 Lions
- 🐻 Bears
- 🐺 Wolves

Such attacks were well known to shepherds.

Their plan was to make Joseph's disappearance look like a tragic accident.

🐺 The brothers planned to deceive Jacob

🦁 They intended to blame Joseph's death on a wild animal

➡️ And We Shall See What Will Become Of His Dreams

---

## 💔 And We Shall See What Will Become Of His Dreams

This statement reveals the real reason behind the murder plot.

The brothers were not simply angry with Joseph.

They wanted to destroy the future that his dreams predicted.

Ironically, every step they took to stop God's plan would eventually become part of the way God fulfilled it.

💔 Their hatred centered on Joseph's dreams

👑 They believed killing Joseph would destroy God's plan

➡️ And Reuben Heard It

---

## 🛡️ And Reuben Heard It, And He Delivered Him Out Of Their Hands

Reuben, the oldest brother, stepped in.

The phrase **"delivered him out of their hands"** means Reuben prevented the others from carrying out their plan immediately.

As the firstborn, Reuben carried a measure of responsibility for the family.

Although he had sinned earlier by sleeping with Bilhah, he did not want Joseph murdered.

🛡️ Reuben stopped the immediate murder plot

👨 As the oldest brother, he intervened

➡️ Let Us Not Kill Him

---

## ✋ And Said, Let Us Not Kill Him

Reuben persuaded the others not to shed Joseph's blood.

He was trying to slow the situation down before it went too far.

Although he did not openly challenge all of his brothers, he redirected their plan away from immediate murder.

✋ Reuben convinced the brothers not to kill Joseph immediately

⏳ He bought Joseph time

➡️ Shed No Blood, But Cast Him Into This Pit That Is In The Wilderness

---

## 🕳️ Shed No Blood, But Cast Him Into This Pit That Is In The Wilderness

Reuben proposed a different plan.

Instead of killing Joseph themselves, they would throw him into a dry pit in the wilderness.

The Bible immediately tells us why Reuben suggested this.

His real intention was not to leave Joseph there.

He planned to return later and rescue him after the others had gone.

🕳️ Reuben suggested the pit instead of murder

🤫 His true plan was to rescue Joseph later

➡️ That He Might Rid Him Out Of Their Hands, To Deliver Him To His Father Again

---

## ❤️ That He Might Rid Him Out Of Their Hands, To Deliver Him To His Father Again

This verse reveals Reuben's secret motive.

He hoped to rescue Joseph and safely return him to Jacob.

Rather than confronting all of his brothers directly, Reuben quietly planned to save Joseph when the opportunity came.

❤️ Reuben intended to rescue Joseph

🏡 His goal was to return Joseph safely to Jacob

➡️ They Stripped Joseph Out Of His Coat

---

## 👕 And It Came To Pass, When Joseph Was Come Unto His Brethren, That They Stripped Joseph Out Of His Coat, His Coat Of Many Colours That Was On Him

The first thing the brothers did was remove Joseph's special robe.

This was the very garment that symbolized Jacob's love and favoritism.

They were not just removing clothing.

They were stripping away the symbol of everything they hated about Joseph.

👕 The brothers removed Joseph's special robe

💔 The coat had become a symbol of their jealousy

➡️ They Took Him, And Cast Him Into A Pit

---

## 🕳️ And They Took Him, And Cast Him Into A Pit: And The Pit Was Empty, There Was No Water In It

The brothers threw Joseph into the dry cistern.

A fall of **10–20 feet (3–6 meters)** onto hard rock could easily cause bruises, broken bones, sprains, or other serious injuries.

The Bible does not say Joseph was injured, but it emphasizes that the pit contained **no water**, leaving him trapped with no hope of climbing out on his own.

Later, Joseph's brothers admitted that they heard his desperate pleas for mercy and ignored them (Genesis 42:21).

🕳️ Joseph was trapped in a dry cistern

📖 Later Scripture tells us he pleaded for mercy

💔 His brothers ignored his cries

➡️ They Sat Down To Eat Bread

---

## 🍞 And They Sat Down To Eat Bread

After throwing Joseph into the pit, the brothers calmly sat down to eat.

This detail highlights the hardness of their hearts.

Years later, the brothers remembered hearing Joseph's distress as he begged them for mercy (Genesis 42:21).

Yet instead of helping him, they continued eating as though nothing had happened.

🍞 The brothers showed no compassion

💔 They ignored Joseph's cries while they ate

➡️ They Lifted Up Their Eyes…

---

## 🐪 And They Lifted Up Their Eyes And Looked, And, Behold, A Company Of Ishmeelites Came From Gilead

As they ate, they saw a caravan of **Ishmaelites** approaching.

The Ishmaelites were descendants of **Ishmael**, Abraham's son through Hagar.

That made them distant relatives of Jacob's family.

The caravan came from **Gilead**, a region east of the Jordan River that was known for producing valuable goods.

🐪 The Ishmaelites were distant relatives of Jacob

🌿 They came from the region of Gilead

➡️ With Their Camels Bearing Spicery And Balm And Myrrh

---

## 🌿 With Their Camels Bearing Spicery And Balm And Myrrh, Going To Carry It Down To Egypt

The Ishmaelites were merchants traveling in a trading caravan.

Their camels carried valuable products including:

- 🌿 **Spicery** — aromatic spices used for cooking, perfume, and trade.
- 🌳 **Balm** — a valuable healing resin from trees, often used as medicine and perfume.
- 💧 **Myrrh** — a fragrant resin used for perfume, medicine, and embalming.

They were transporting these expensive goods to **Egypt**, one of the largest trading centers in the ancient world.

This caravan would become God's unexpected means of moving Joseph to Egypt.

🐪 The Ishmaelites were traders

🌿 They carried valuable goods to Egypt

➡️ Judah Said Unto His Brethren…

---

## 💰 And Judah Said Unto His Brethren, What Profit Is It If We Slay Our Brother, And Conceal His Blood?

Judah now speaks.

Rather than asking what was morally right, he asks what they would **gain** by killing Joseph.

The word **"profit"** means **benefit** or **financial gain**.

Judah reasons that if Joseph is going to disappear anyway, they might as well make money instead of committing murder.

💰 Judah focuses on profit instead of mercy

⚖️ His proposal changes the plan from murder to selling Joseph

➡️ Come, And Let Us Sell Him To The Ishmeelites

---

## 💵 Come, And Let Us Sell Him To The Ishmeelites

Instead of killing Joseph, Judah suggests selling him into slavery.

In the ancient world, slavery often resulted from war, debt, or human trafficking.

A slave became the legal property of another person and could be bought or sold.

For Joseph, this meant being separated from his family and losing his freedom.

Although Judah believed this was the more merciful option, it was still a terrible injustice.

💵 Joseph was sold into slavery

⛓️ Slavery meant losing both freedom and family

➡️ Let Not Our Hand Be Upon Him

---

## ✋ And Let Not Our Hand Be Upon Him; For He Is Our Brother And Our Flesh

Judah argues that they should not personally kill Joseph because he is **"our brother and our flesh."**

The phrase **"our flesh"** means he shared the same family and bloodline.

Judah's reasoning is ironic.

He recognizes Joseph is his own brother, yet he is still willing to sell him into slavery.

✋ Joseph was their own brother

🩸 "Our flesh" means a member of the same family

⚠️ They chose slavery instead of murder

➡️ His Brethren Were Content

---

## 👍 And His Brethren Were Content

The word **"content"** here means the brothers **agreed** with Judah's plan.

They abandoned the murder plot and decided to sell Joseph instead.

Although they believed they were solving their problem, they were unknowingly carrying out God's larger plan.

Years later, Joseph would tell them:

**"Ye thought evil against me; but God meant it unto good."** (Genesis 50:20)

👍 The brothers agreed to sell Joseph

🙏 God would use even their evil actions to accomplish His purpose

➡️ Joseph Is Sold Into Egypt

# Genesis 37:28–30

# 🇪🇬 Joseph Sold Into Slavery

---

## 🐪 Then There Passed By Midianites Merchantmen

The **Midianites** were descendants of **Midian**, one of Abraham's sons through **Keturah**, whom Abraham married after Sarah died (Genesis 25:1-2).

That made the Midianites distant relatives of Jacob's family.

You may notice that this passage mentions both **Midianites** and **Ishmaelites**.

Many Bible scholars believe these merchant caravans often traveled together, and the names were sometimes used interchangeably because they were closely associated in the same trading companies.

Others believe the caravan included both Midianite and Ishmaelite merchants.

Either way, there is no contradiction—the group traveling to Egypt included people from both related nations.

🐪 The Midianites descended from Abraham through Midian

👨‍👩‍👦 They were distant relatives of Jacob's family

🤝 The caravan likely included both Midianites and Ishmaelites

➡️ They Drew And Lifted Up Joseph Out Of The Pit

---

## 🕳️ And They Drew And Lifted Up Joseph Out Of The Pit, And Sold Joseph To The Ishmeelites For Twenty Pieces Of Silver

Joseph was pulled from the pit, but instead of being rescued, he was sold as a slave.

The price was **twenty pieces of silver**.

In the ancient Near East, this was the typical price for a healthy young slave around Joseph's age.

Twenty shekels of silver was a significant amount of money, but it was far from a fortune.

Based on the value of silver alone, it would equal only a few hundred U.S. dollars today. However, its **purchasing power** was much greater than that.

Many scholars estimate that twenty shekels represented **several months of a laborer's wages**, perhaps around **three to four months** depending on the time and place.

Since Reuben was absent, the money was likely divided among the remaining **nine brothers**.

Even after splitting it, each brother received only a small amount.

For that small profit, they sold their own brother into slavery.

💰 Joseph was sold for twenty pieces of silver

⛓️ It was the normal price for a young slave

💔 The brothers exchanged their brother for only a few months' wages

➡️ And They Brought Joseph Into Egypt

---

## 🇪🇬 And They Brought Joseph Into Egypt

The merchants continued their journey into Egypt with Joseph.

To Joseph, this probably looked like the end of everything.

He was leaving his father, his home, and the Promised Land.

But from God's perspective, this was the beginning of His plan.

God was sending Joseph ahead to prepare a place where Jacob's family would later survive the coming famine.

What looked like tragedy was actually God's providence at work.

🇪🇬 Joseph was taken to Egypt as a slave

🙏 God was already working through this painful event

➡️ Reuben Returned Unto The Pit

---

## 😨 And Reuben Returned Unto The Pit; And, Behold, Joseph Was Not In The Pit; And He Rent His Clothes

At some point, Reuben had left the group.

The Bible does not tell us where he went.

Many scholars believe he stepped away, planning to return privately and rescue Joseph after the others had left.

When he returned, Joseph was gone.

Reuben **"rent his clothes,"** meaning he **tore his garments**.

In the ancient world, tearing one's clothing was a visible expression of overwhelming grief, horror, guilt, or deep distress.

People would literally tear the neckline or front of their robe as an outward sign that their hearts were broken.

😨 Reuben returned expecting to rescue Joseph

👕 Tearing his clothes showed intense grief and shock

➡️ The Child Is Not; And I, Whither Shall I Go?

---

## 😢 And He Returned Unto His Brethren, And Said, The Child Is Not; And I, Whither Shall I Go?

Reuben immediately realized what had happened.

Joseph was gone.

As the **firstborn son**, Reuben knew he carried responsibility for his younger brothers.

Earlier in Genesis, Reuben had already brought shame upon himself by sleeping with Bilhah, his father's concubine.

Now he faced returning to Jacob with the news that Joseph—the son Jacob loved most—had disappeared.

His question,

**"Whither shall I go?"**

means,

**"How can I possibly face my father now?"**

or,

**"What am I going to do?"**

Reuben understood that Jacob would hold him accountable as the oldest brother.

😢 Reuben felt responsible for Joseph

👨 As the firstborn, he expected to answer to Jacob

💔 He dreaded facing his father with the terrible news

➡️ The Brothers Deceive Jacob

# Genesis 37:31–36

# 💔 Jacob Thinks Joseph Is Dead

---

## 🐐 And They Took Joseph's Coat, And Killed A Kid Of The Goats

A **kid of the goats** is a **young goat**.

The brothers killed the goat so they could use its blood as part of their deception.

Earlier, they had planned to tell Jacob that a wild animal had killed Joseph.

Now they were carrying out that plan.

By covering Joseph's coat with blood, they intended to make the story appear believable.

🐐 A kid is a young goat

🩸 The goat's blood was used to support their lie

➡️ And Dipped The Coat In The Blood

---

## 🩸 And Dipped The Coat In The Blood

The brothers soaked Joseph's special robe in the goat's blood.

The blood made it appear as though Joseph had been attacked and killed by a wild animal.

This was a carefully planned deception.

Instead of telling one lie, they created physical "evidence" to convince Jacob that Joseph was dead.

🩸 The blood was meant to imitate a fatal animal attack

🎭 The brothers created false evidence to support their story

➡️ And They Sent The Coat Of Many Colours

---

## 👕 And They Sent The Coat Of Many Colours

The word **"sent"** simply means they **had it taken** to Jacob.

In the next phrase, the Bible says **"they brought it to their father."**

These two statements work together.

The coat was sent from Dothan back to Jacob, and then it was presented to him.

The Bible does not tell us whether all the brothers returned together or whether only some of them carried the coat.

Scripture simply emphasizes that the bloody robe was delivered to Jacob.

👕 The coat was taken back to Jacob

📖 The Bible does not say which brothers carried it

➡️ And They Brought It To Their Father

---

## 😔 And They Brought It To Their Father, And Said, This Have We Found: Know Now Whether It Be Thy Son's Coat Or No

Notice how carefully the brothers choose their words.

They never say,

"Joseph is dead."

Instead, they simply present the coat and ask Jacob to identify it.

By doing this, they allow Jacob to reach the conclusion himself.

This makes their lie appear more convincing because they never directly accuse a wild animal or claim to have witnessed Joseph's death.

😔 The brothers carefully avoided saying Joseph was dead

🎭 They allowed Jacob to draw the conclusion himself

➡️ It Is My Son's Coat

---

## 💔 And He Knew It, And Said, It Is My Son's Coat; An Evil Beast Hath Devoured Him; Joseph Is Without Doubt Rent In Pieces

The moment Jacob recognized the robe, he immediately believed the worst.

The brothers had succeeded.

Jacob concluded that Joseph had been attacked by a wild animal.

The word **"rent"** means **torn apart** or **ripped to pieces**.

Jacob believed there was no possibility that Joseph had survived.

Ironically, everything Jacob believed was wrong.

Joseph was alive, but Jacob had no reason to think otherwise.

💔 Jacob believed Joseph had been killed

🐺 He thought a wild animal had torn him apart

➡️ Jacob Rent His Clothes

---

## 👕 And Jacob Rent His Clothes, And Put Sackcloth Upon His Loins

Just as Reuben had done earlier, Jacob **rent**, or **tore**, his clothing.

In the ancient world, tearing one's garments was a public expression of overwhelming grief.

Jacob also put **sackcloth** around his **loins**, meaning around his waist and hips.

Sackcloth was a rough, coarse fabric usually made from goat's hair.

It was uncomfortable to wear and became a symbol of deep mourning, repentance, or great sorrow.

By wearing sackcloth, Jacob was outwardly expressing the pain that filled his heart.

👕 Jacob tore his clothing in grief

🧵 Sackcloth was rough clothing worn during mourning

💔 His outward appearance reflected his broken heart

➡️ And Mourned For His Son Many Days

---

## 😭 And Mourned For His Son Many Days

To **mourn** means far more than simply feeling sad.

It is deep grief over the loss of someone you love.

The Bible does not tell us exactly how many days Jacob mourned.

The phrase **"many days"** simply tells us that his grief continued for a long time.

Day after day, Jacob believed his beloved son was gone forever.

He likely wept, struggled to eat, lost sleep, and carried the constant weight of heartbreak.

Meanwhile, Joseph's brothers knew the truth.

Every day they watched their father suffer, knowing they could have ended his pain simply by confessing what they had done.

Instead, they remained silent.

😭 Mourning is deep grief over the loss of a loved one

📅 Jacob's sorrow lasted for a long time

💔 The brothers watched their father's suffering while hiding the truth

➡️ All His Sons And All His Daughters Rose Up To Comfort Him

---

## 🤝 And All His Sons And All His Daughters Rose Up To Comfort Him

Jacob's entire family tried to comfort him.

The irony is heartbreaking.

The very sons who caused his grief were now pretending to comfort him.

Their outward compassion hid the terrible secret they were keeping.

Jacob's daughters also tried to encourage him, but nothing could remove his sorrow.

🤝 The whole family tried to comfort Jacob

🎭 The guilty brothers hid their deception

➡️ But He Refused To Be Comforted

---

## 💔 But He Refused To Be Comforted

Jacob refused every attempt to ease his grief.

The Bible records his own words:

**"For I will go down into the grave unto my son mourning."**

Jacob believed this sorrow would stay with him for the rest of his life, all the way to his own death.

The word **grave** here translates the Hebrew word **sheol**, referring to the realm of the dead. Jacob was saying that nothing would remove this pain except death itself.

Genesis then adds one final, heartbreaking line:

**"Thus his father wept for him."**

Jacob's grief was not a passing sorrow.

It became a defining ache that stayed with him for years, even though—unknown to him—Joseph was still alive.

💔 Jacob believed his grief would last until death

⚰️ Grave (sheol) refers to the realm of the dead

😭 Jacob's father wept bitterly for his son

➡️ Meanwhile, Joseph Is Sold In Egypt

---

## 🇪🇬 And The Midianites Sold Him Into Egypt Unto Potiphar

While Jacob mourned at home, the merchants who had carried Joseph away completed their journey into Egypt.

There, they sold him to **Potiphar**, an official described as **"an officer of Pharaoh's, and captain of the guard."**

The word **officer** can also be translated **eunuch**, though in Scripture it was sometimes used more broadly for a court official regardless of that specific meaning.

**Captain of the guard** means Potiphar held real authority within Egypt's government, likely overseeing Pharaoh's bodyguard or the royal prison.

Joseph, the favored son who once wore a coat of many colours, was now a slave in a foreign land, serving in the household of a powerful Egyptian official.

Yet even here, God's providence was already at work, placing Joseph in a household of real influence rather than a random one.

🇪🇬 Joseph is sold to Potiphar in Egypt

👑 Potiphar was a high-ranking Egyptian official

🛡️ He served as captain of the guard

🙏 God was already positioning Joseph within Egypt's government`;

export const GENESIS_THIRTY_SEVEN_PERSONAL_SECTIONS = parseGenesisThirtySevenRawNotes(GENESIS_THIRTY_SEVEN_RAW_NOTES);
