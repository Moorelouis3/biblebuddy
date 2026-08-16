export type GenesisThirtyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtyNineRawNotes(rawText: string): GenesisThirtyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+39:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 39 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+39:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+39:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 39 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 39,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 39:${startVerse}` : `Genesis 39:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Genesis 39 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_NINE_RAW_NOTES = `# Genesis 39:1-6
# 🌍 The Lord Was With Joseph
---
## ⛓️ And Joseph Was Brought Down To Egypt

Genesis now returns to Joseph's story.

Back in **Genesis 37**, we were introduced to Jacob's twelve sons. Joseph was his favorite son, and God gave Joseph dreams that one day his family would bow before him. Instead of rejoicing, his ten older brothers became jealous. Their jealousy turned into hatred, and they sold Joseph to a caravan of Ishmaelite traders heading to Egypt.

Genesis 38 then paused Joseph's story to focus on Judah. That chapter covered more than twenty years of Judah's life—his marriage, the birth of his sons, the death of his wife, Tamar, and the birth of Perez and Zerah.

Now, Genesis returns to the exact point where Joseph had just been sold into slavery.

While Judah's life continued for over twenty years, Joseph's story is picking up right where Genesis 37 left off.

Joseph was taken from **Canaan** to **Egypt**, a journey of roughly **250–300 miles (400–480 km)** depending on the route the caravan traveled. On foot, this likely took several weeks.

Imagine being around seventeen years old.

Your own brothers betray you.

You are tied up and sold like property.

You are carried farther away from your father every single day.

Every mile means less hope of ever seeing home again.

Everything familiar disappeared.

A different country.

A different language.

Different customs.

Different religion.

Different gods.

From a human perspective, it might have seemed as though Joseph had been abandoned.

But the very next verse reminds us that God had never left him.

⛓️ Joseph's story now resumes after the events of Genesis 38.

🌍 He was taken hundreds of miles from his home in Canaan to Egypt.

🙏 Although everything around Joseph changed, God had not changed.

---
## 👤 And Potiphar, An Officer Of Pharaoh

Joseph was purchased by a man named **Potiphar**.

Potiphar was not an ordinary Egyptian.

He was **an officer of Pharaoh**, meaning he served directly under Pharaoh, the king of Egypt.

The title "officer" refers to someone who held an important government position.

Pharaoh was considered the supreme ruler of Egypt. He controlled the military, the government, the economy, and the courts. Many Egyptians even viewed Pharaoh as a god or the son of their gods.

That means Joseph was not purchased by a poor farmer or a small shepherd.

He entered the household of one of the most powerful men in Egypt.

This would completely change Joseph's future.

Instead of disappearing into hard labor somewhere in the countryside, God placed him in a home where important people regularly came and went.

What looked like bad luck was actually God's providence at work.

👤 Potiphar was a high-ranking government official.

👑 Pharaoh was the king and absolute ruler of Egypt.

🏛️ God placed Joseph in one of the most influential households in the nation.

---
## 🛡️ Captain Of The Guard, An Egyptian

Potiphar was also the **captain of the guard**.

This was one of the highest military positions in Egypt.

He was responsible for protecting Pharaoh and maintaining security.

Many Bible scholars believe this position also included overseeing the royal prison and carrying out executions ordered by Pharaoh.

In today's world, his role would combine responsibilities similar to the head of the Secret Service, the commander of an elite military unit, the director of a prison system, and a chief security officer—all serving directly under the president or king.

The Bible also tells us Potiphar was **an Egyptian**.

That may seem like a small detail, but it is important.

Joseph had been raised worshiping the one true God.

Potiphar grew up worshiping the many gods of Egypt.

Everything about Joseph's new life was different.

Yet God would soon demonstrate that His power was not limited to the land of Canaan.

The Lord rules every nation.

🛡️ Potiphar held one of Egypt's highest security positions.

🇪🇬 He worshiped the gods of Egypt, not the God of Israel.

🌍 God's authority extends far beyond one nation.

---
## 🤝 Bought Him Of The Hands Of The Ishmeelites, Which Had Brought Him Down Thither

The Ishmaelite traders completed their journey and sold Joseph to Potiphar.

Joseph was no longer traveling.

He now officially belonged to his new master.

The word **"thither"** simply means **"to that place"** or **"there."**

The Ishmaelites had brought Joseph there—to Egypt—and now his life entered a completely new chapter.

From the world's perspective, Joseph had become nothing more than property.

But from God's perspective, Joseph was exactly where He intended him to be.

The same caravan that Joseph's brothers used to get rid of him became the very means God used to position Joseph for the future.

🤝 Joseph was sold directly to Potiphar.

📖 "Thither" simply means "to that place."

🙏 God was already working through what looked like tragedy.

---
## 🙏 And The Lord Was With Joseph

This is one of the most important statements in Joseph's entire life.

Joseph had lost almost everything.

His freedom.

His family.

His home.

His reputation.

His future as he imagined it.

But he had not lost the Lord.

Notice that God did not immediately rescue Joseph.

Instead, God remained with him in the middle of slavery.

Sometimes we think God's presence means our circumstances become easy.

Joseph's life teaches the opposite.

God's presence does not always remove hardship.

It gives us strength, wisdom, peace, and favor while we walk through it.

Joseph was in Egypt.

God was still with him.

Joseph was a slave.

God was still with him.

Joseph had been betrayed.

God was still with him.

No matter where God's people go, the Lord goes with them.

🙏 God's presence did not leave Joseph.

⛓️ Joseph was a slave, but he was not abandoned.

❤️ God's presence is greater than our circumstances.

---
## 📈 And He Was A Prosperous Man

The word **"prosperous"** does not simply mean rich.

It means to succeed, flourish, or accomplish what God gives someone to do.

Joseph owned nothing.

He had no money.

No freedom.

No possessions.

Yet God caused everything Joseph touched to succeed.

This teaches an important lesson.

Prosperity in God's eyes is not determined by your bank account.

It is determined by God's blessing upon your work.

Whatever Joseph was asked to do, he did it faithfully.

Whether organizing supplies...

Managing servants...

Keeping records...

Supervising household workers...

Caring for livestock...

Managing food storage...

Planning daily operations...

Everything Joseph handled seemed to succeed.

God blessed the work of Joseph's hands.

📈 Prosperity means success under God's blessing.

💼 Joseph prospered even though he owned nothing.

🙏 God's blessing was evident in everything Joseph did.

---
## 🏠 And He Was In The House Of His Master The Egyptian

Joseph served **inside Potiphar's household** rather than being sent to work in the fields.

This was a significant assignment.

Large Egyptian estates functioned much like modern businesses.

Potiphar likely owned homes, farmland, livestock, warehouses, servants, and numerous employees.

His household may have included dozens or even hundreds of servants working in different areas.

Joseph's work placed him at the center of the estate's daily operations.

Instead of spending every day doing manual labor in the fields, Joseph worked where the estate was managed.

God was preparing Joseph for leadership long before Joseph realized it.

🏠 Joseph served inside Potiphar's estate.

📋 Large Egyptian households operated like major businesses.

🎓 God was training Joseph for greater responsibilities.

---
## 👀 And His Master Saw That The Lord Was With Him

Potiphar noticed something different about Joseph.

Potiphar did not worship the God of Israel.

Yet even this Egyptian official could see that Joseph's life was different.

Joseph worked with honesty.

He worked with excellence.

He could be trusted.

Everything he managed seemed to improve.

People often notice God's work in our lives before they understand the God we serve.

Joseph never had to boast about himself.

His life spoke for him.

👀 Potiphar noticed God's blessing on Joseph.

🇪🇬 Even a pagan recognized something was different.

✨ Joseph's character reflected God's work in his life.

---
## 🌱 And That The Lord Made All That He Did To Prosper In His Hand

Everything Joseph managed succeeded.

If he supervised servants, they worked efficiently.

If he cared for livestock, the animals flourished.

If he organized supplies, nothing was wasted.

If he managed finances, everything remained in order.

If he oversaw crops or storage, the estate became more productive.

The Bible is not saying Joseph possessed magical abilities.

It is saying God blessed Joseph's faithful work.

Joseph still had to labor.

He still had responsibilities.

God blessed his diligence.

This is often how God's blessing works.

He blesses faithful obedience.

🌱 God blessed Joseph's work.

💼 Everything Joseph managed improved.

🙏 God's blessing worked through Joseph's faithful efforts.

---
## 😊 And Joseph Found Grace In His Sight, And He Served Him

Joseph earned Potiphar's confidence.

The word **"grace"** here means **favor**.

Potiphar looked upon Joseph with approval because Joseph continually proved himself trustworthy.

Joseph served Potiphar faithfully.

He did not become bitter.

He did not constantly complain about being a slave.

Instead, he honored God by doing excellent work wherever he had been placed.

Faithfulness in small responsibilities often leads to greater opportunities.

😊 Joseph gained Potiphar's favor.

🤝 His faithful service earned trust.

📈 Faithfulness opened the door to promotion.

---
## 🏛️ And He Made Him Overseer Over His House, And All That He Had He Put Into His Hand

Joseph received an extraordinary promotion.

Potiphar placed Joseph over his entire estate.

An **overseer** managed every aspect of the household.

Joseph likely supervised servants, handled finances, managed food and supplies, organized daily operations, directed laborers, and reported only to Potiphar himself.

In today's world, this would be similar to being appointed the **chief operating officer (COO)** or **chief executive officer (CEO)** of a large company.

Imagine purchasing a seventeen- or eighteen-year-old slave...

Then trusting him to manage your entire business.

That level of trust had to be earned.

Potiphar saw something in Joseph that few people ever demonstrate:

complete integrity.

🏛️ Joseph became manager of Potiphar's entire estate.

💼 He oversaw nearly every aspect of Potiphar's business.

🤝 Potiphar trusted Joseph completely.

---
## 🌾 That The Lord Blessed The Egyptian's House For Joseph's Sake

God blessed Potiphar's household because of Joseph.

This did not mean Potiphar suddenly believed in the God of Israel.

It means God chose to bless everything connected with Joseph.

The estate prospered.

The servants worked well.

The livestock increased.

The business flourished.

The crops produced.

Peace and order marked the household.

Joseph became a blessing everywhere God placed him.

🌾 God blessed Potiphar because of Joseph.

🏠 The entire estate prospered.

🙏 God often blesses those around His faithful servants.

---
## 🌿 And The Blessing Of The Lord Was Upon All That He Had In The House, And In The Field

God's blessing reached every part of Potiphar's property.

The **house** refers to everything managed inside the estate.

The **field** refers to everything outside—farmland, livestock, crops, vineyards, orchards, and other agricultural work.

Nothing escaped God's blessing.

Everything under Joseph's management prospered.

This also strengthened the relationship between Joseph and Potiphar.

Potiphar increasingly realized that trusting Joseph consistently brought good results.

🌿 God's blessing extended everywhere.

🏠 The house prospered.

🌾 The fields prospered.

---
## 🔑 And He Left All That He Had In Joseph's Hand

Potiphar eventually trusted Joseph with everything.

Joseph effectively became the administrator of the entire estate.

Today, this would be like giving someone complete authority over your businesses, finances, employees, investments, schedules, and daily operations.

Joseph made decisions on Potiphar's behalf.

Other servants answered to Joseph.

Purchases.

Sales.

Planning.

Management.

Daily operations.

Everything flowed through Joseph.

For a young man who had arrived as a foreign slave, this was an astonishing level of responsibility.

🔑 Potiphar entrusted Joseph with everything.

💼 Joseph became the estate's chief administrator.

🤝 Extraordinary trust was built between master and servant.

---
## 🍞 And He Knew Not Ought He Had, Save The Bread Which He Did Eat

This phrase means Potiphar no longer worried about the details of running his estate.

Joseph handled everything.

The only thing Potiphar concerned himself with was eating his daily meals.

Today we might say,

**"He didn't have a care in the world."**

Or,

**"He never had to think about the business because someone he completely trusted was running it."**

That is exactly how much confidence Potiphar had in Joseph.

🍞 Potiphar no longer managed the estate himself.

😊 Joseph handled every responsibility.

🤝 Complete trust had been established.

---
## 😊 And Joseph Was A Goodly Person, And Well Favoured

The word **"goodly"** refers to Joseph's physical appearance.

It means he was handsome, well-built, and attractive.

The phrase **"well favoured"** means he had a pleasing or beautiful appearance.

This description is very similar to the one given about his mother, Rachel, in Genesis 29:17.

The Bible mentions Joseph's appearance here because it prepares us for what happens next.

Joseph's character had already attracted Potiphar's respect.

Soon, his appearance would attract the attention of Potiphar's wife.

😊 Joseph was handsome and physically well-built.

👀 He had an attractive appearance.

📖 This sets the stage for the temptation that follows in the next section.

# Genesis 39:7-12
# 🔥 Joseph Was Tempted
---
## ⏳ And It Came To Pass After These Things

The phrase **"after these things"** means some time had passed after everything described in Genesis 39:1–6.

Joseph had arrived in Egypt as a seventeen-year-old slave.

He had been purchased by Potiphar.

The Lord was with him.

Everything Joseph touched began to prosper.

Potiphar noticed Joseph's ability and character.

Joseph gained his master's trust.

Eventually, Potiphar promoted him until Joseph became **overseer of his entire household and estate**.

So this temptation did not happen the moment Joseph arrived in Egypt.

Joseph had already gone through a period of growth, work, promotion, and increasing responsibility.

We cannot know exactly how many years had passed. Joseph was seventeen when he was sold and thirty when he later stood before Pharaoh, meaning everything involving Potiphar and the prison happened somewhere within that thirteen-year period.

By this point, Joseph was no longer merely the frightened teenage slave who had just arrived from Canaan.

He had become a respected young man with authority, responsibility, influence, and the trust of one of Egypt's most powerful officials.

And that is when another kind of test entered his life.

⏳ Some time had passed since Joseph arrived in Egypt.

📈 Joseph had risen from slave to overseer.

⚠️ Temptation came after Joseph had gained success and influence.

---
## 👀 His Master's Wife Cast Her Eyes Upon Joseph

Joseph's master was **Potiphar**, so this was Potiphar's wife.

The phrase **"cast her eyes upon Joseph"** means she began looking at Joseph with sexual desire.

She did not merely notice that Joseph existed.

She looked at him differently.

The previous verse specifically told us Joseph was **"goodly" and "well favoured,"** meaning he was physically handsome and attractive.

Now Moses immediately shows us why that detail mattered.

Potiphar's wife became attracted to him.

Joseph was also no longer simply one of many servants working somewhere outside the estate.

He was the man running the household.

He had authority.

He was trusted.

He was successful.

People answered to him.

Potiphar's wife would have seen Joseph regularly because he was constantly involved in the administration of her husband's estate.

The phrase suggests her attention lingered on him until attraction became desire.

This is where temptation often begins.

Something gets our attention.

Then we continue looking.

Then the thought becomes desire.

And eventually desire begins asking for action.

👀 "Cast her eyes" means she looked at Joseph with sexual desire.

🔥 Attraction began developing into temptation.

🏛️ Joseph's position kept him regularly around Potiphar's household.

---
## 🛏️ And She Said, Lie With Me

Potiphar's wife did not hint at what she wanted.

She directly told Joseph:

**"Lie with me."**

She was asking him to have sex with her.

Think about the situation Joseph was in.

This was not simply a random woman.

This was **his master's wife**.

Potiphar had purchased Joseph as a slave and then trusted him enough to place his entire estate under Joseph's authority.

Joseph knew Potiphar's finances.

His servants.

His property.

His livestock.

His business.

His household.

Potiphar had placed enormous trust in him.

Having sex with Potiphar's wife would have been one of the greatest betrayals Joseph could commit against the man who trusted him.

It was also extremely dangerous.

If the relationship were discovered, Joseph could lose his position, his freedom, and possibly his life.

And there was another layer.

Potiphar's wife possessed power over Joseph.

Joseph was still legally a slave.

She was the wife of his owner.

That created an enormous imbalance of power.

Yet Joseph did not allow fear, attraction, opportunity, or pressure to determine his decision.

🛏️ "Lie with me" means she directly asked Joseph to have sex with her.

🤝 Accepting would betray Potiphar's enormous trust.

⚠️ Joseph risked everything whether he obeyed her or refused her.

---
## ✋ But He Refused, And Said Unto His Master's Wife, Behold, My Master Wotteth Not What Is With Me In The House, And He Hath Committed All That He Hath To My Hand

Joseph **refused**.

That is important.

He did not flirt with the idea.

He did not tell her he needed time to think.

He did not try to see how far he could go without technically committing adultery.

He said no.

Then Joseph explained why.

The word **"wotteth"** means **knows** or **concerns himself with**.

When Joseph says Potiphar **"wotteth not what is with me in the house,"** he means Potiphar no longer concerns himself with the details of the estate because Joseph handles everything.

Potiphar trusted Joseph so completely that he did not need to constantly check behind him.

Joseph then says:

**"He hath committed all that he hath to my hand."**

In other words:

> "Your husband has trusted me with everything he owns."

Joseph understood that trust created responsibility.

The more Potiphar gave Joseph, the more wrong it would be for Joseph to secretly betray him.

This is integrity.

Integrity means being trustworthy even when the person who trusts you is not there to watch.

✋ Joseph immediately refused her.

📖 "Wotteth not" means Potiphar did not concern himself with the details because Joseph handled them.

🤝 Joseph understood the weight of the trust Potiphar had given him.

---
## 👑 There Is None Greater In This House Than I

Joseph explains just how much authority Potiphar had given him.

**"There is none greater in this house than I."**

Joseph was saying:

> "There is nobody here with more authority than me."

Except for Potiphar himself, Joseph was at the top.

If Joseph gave an instruction, servants followed it.

If he made a decision about the estate, that decision carried Potiphar's authority behind it.

This makes Joseph's refusal even more impressive.

Joseph had power.

He had access.

He had privacy.

He had opportunity.

And the woman pursuing him was his master's wife.

Joseph could easily have convinced himself that his position entitled him to whatever he wanted.

Instead, he understood that greater authority meant **greater responsibility**.

👑 Joseph was second only to Potiphar in the household.

🔑 He had extraordinary authority for someone who had entered Egypt as a slave.

⚖️ Joseph did not use his power as an excuse to sin.

---
## 🚫 Neither Hath He Kept Back Any Thing From Me But Thee, Because Thou Art His Wife

Potiphar had withheld only **one thing** from Joseph.

His wife.

Joseph could manage the money.

The servants.

The property.

The animals.

The supplies.

The business.

Almost everything Potiphar possessed had been placed under Joseph's authority.

But Potiphar's wife was not Joseph's.

Joseph understood the boundary clearly.

**"Because thou art his wife."**

That relationship was sacred.

Marriage created a boundary Joseph had no right to cross.

This goes all the way back to Genesis 2, where God established marriage as a covenant between a man and a woman.

Joseph did not see Potiphar's wife simply as an attractive woman offering him sex.

He saw her first as **another man's wife**.

And that changed everything.

🚫 Potiphar had given Joseph everything except his wife.

💍 Joseph respected the sacred boundary of marriage.

🤝 He refused to betray the man who trusted him.

---
## 🙏 How Then Can I Do This Great Wickedness, And Sin Against God?

Joseph finally reaches the deepest reason for his refusal.

He does not merely say:

> "Potiphar might catch me."

He does not say:

> "I could lose my job."

He does not say:

> "People might find out."

He says:

**"How then can I do this great wickedness, and sin against God?"**

Joseph understood that adultery would certainly be a betrayal of Potiphar.

But ultimately, his sin would be against **God**.

That is the foundation of Joseph's integrity.

Potiphar might never know.

The servants might never know.

Nobody in Canaan might ever hear about it.

But God would know.

Joseph had been taken hundreds of miles away from his father and the covenant family.

He was living in Egypt among people who worshiped completely different gods.

Yet Joseph understood something powerful:

**Distance from home did not mean distance from God.**

The God of Abraham, Isaac, and Jacob was still Joseph's God in Egypt.

Joseph calls adultery **"great wickedness."**

He understood that sexual sin was not merely breaking a social rule.

It violated another person's marriage.

It betrayed trust.

And above everything else, it rebelled against God.

Joseph's question reveals the heart of a person who truly walks with God:

Not,

**"Can I get away with this?"**

But,

**"How could I do this against God?"**

🙏 Joseph's highest loyalty belonged to God.

👁️ Even if nobody else knew, Joseph knew God would know.

❤️ Integrity is choosing faithfulness because of who God is, not merely because we fear getting caught.

---
## 📅 And It Came To Pass, As She Spake To Joseph Day By Day

The phrase **"it came to pass"** tells us that time continued to move forward.

This was not a single conversation.

This became a daily battle.

Every day Potiphar's wife continued approaching Joseph.

Every day she tried to persuade him.

Every day she tempted him.

Every day she looked for another opportunity.

The phrase **"day by day"** shows her persistence.

She refused to accept Joseph's first answer.

She kept wearing him down, hoping that eventually he would give in.

Temptation often works this way.

It rarely disappears after one victory.

It returns.

Again.

And again.

And again.

Joseph faced this pressure while continuing to manage Potiphar's entire household.

He could not simply quit his job.

He still had responsibilities.

He still had to enter the house every day to perform the work Potiphar had entrusted to him.

Joseph teaches us that faithfulness is often not one big decision.

Sometimes it is making the same godly decision every single day.

📅 "Day by day" shows this temptation continued over an extended period.

🔥 Potiphar's wife refused to give up.

🙏 Joseph remained faithful day after day.

---
## 👂 That He Hearkened Not Unto Her, To Lie By Her, Or To Be With Her

The word **"hearkened"** means **to listen to, obey, or give in to someone's request.**

Joseph did none of those things.

He never entertained the idea.

He never negotiated.

He never thought,

*"Maybe just this once."*

His answer remained the same every single day.

No.

But Joseph did something else that is easy to miss.

The Bible says he refused **"to lie by her, or to be with her."**

He didn't simply refuse adultery.

He avoided situations where he would be alone with her.

Joseph understood something that many people ignore.

The safest way to defeat temptation is often to avoid unnecessary opportunities for temptation altogether.

He wasn't trying to prove how spiritually strong he was.

He was trying to remain faithful.

Sometimes wisdom means creating distance before temptation becomes sin.

If someone is trying to overcome drunkenness, they don't keep alcohol in the house.

If someone struggles with gambling, they don't keep visiting casinos.

If someone struggles with sexual temptation, they don't intentionally place themselves in compromising situations.

Joseph wasn't weak because he avoided temptation.

He was wise.

👂 "Hearkened not" means Joseph never gave in to her requests.

🚪 Joseph avoided being alone with her whenever possible.

🛡️ Wisdom often means fleeing temptation before it becomes sin.

---
## 🏠 And It Came To Pass About This Time, That Joseph Went Into The House To Do His Business

After this ongoing struggle, **more time passed.**

Then one particular day, Joseph entered the house to carry out his normal responsibilities.

The phrase **"to do his business"** simply means Joseph was doing the work Potiphar had entrusted to him.

He wasn't looking for Potiphar's wife.

He wasn't secretly meeting her.

He wasn't flirting with temptation.

He was working.

As overseer of the estate, Joseph likely entered the house to handle records, supervise servants, organize supplies, manage finances, or oversee the daily operations of Potiphar's household.

This was part of his job.

Joseph was simply being faithful to the responsibilities God had placed before him.

Sometimes temptation comes while we are faithfully doing ordinary work.

🏠 Joseph entered the house to perform his normal responsibilities.

📋 "His business" refers to the work Potiphar had entrusted to him.

🙏 Joseph was serving faithfully when temptation confronted him again.

---
## 🚪 And There Was None Of The Men Of The House There Within

Normally, a large estate like Potiphar's would have been full of activity.

Servants would have been preparing meals.

Stewards would have been organizing supplies.

Laborers would have been coming and going.

Household workers would have been cleaning, serving, and carrying out their daily duties.

Messengers, assistants, and other officials may also have been moving throughout the estate.

But on this particular day...

No men were inside the house.

Whether this happened by coincidence or whether Potiphar's wife deliberately arranged it, the Bible does not say.

What it does tell us is that Joseph and Potiphar's wife were suddenly alone.

The opportunity she had been waiting for had finally arrived.

🚪 The house was unusually empty.

👥 Normally many servants and workers would have been present.

⚠️ Joseph and Potiphar's wife were now completely alone.

---
## ✋ And She Caught Him By His Garment, Saying, Lie With Me

The temptation now became physical.

Before, Potiphar's wife had used only words.

Now she grabbed Joseph by his garment.

This was no longer merely a suggestion.

She physically attempted to stop him from leaving.

Again she demanded,

**"Lie with me."**

Joseph was now standing at a crossroads.

He could surrender to temptation.

Or he could lose everything.

From a worldly perspective, Joseph had every reason to give in.

Nobody else was there.

No witnesses.

No servants.

No Potiphar.

No one would immediately know.

Yet Joseph's decision had already been made long before this moment.

He had settled in his heart that he would not sin against God.

Because his conviction was already settled, his response came immediately.

✋ The temptation became physical.

⚠️ Joseph was alone with Potiphar's wife.

🙏 Joseph's convictions had already been settled before the temptation reached its highest point.

---
## 🏃 And He Left His Garment In Her Hand, And Fled, And Got Him Out

Joseph did not argue.

He did not try to reason with her.

He did not stay to defend himself.

He ran.

She held onto his garment, but Joseph chose to leave the garment behind rather than stay another second in temptation.

The loss of a piece of clothing was far better than the loss of his integrity.

This is one of the clearest pictures in Scripture of how believers should respond to temptation.

There are moments when standing and fighting is not the wisest option.

Sometimes the godliest response is simply to leave.

Run.

Get out.

Remove yourself from the situation before temptation has the opportunity to become sin.

Joseph would rather lose his position...

Lose his reputation...

Even lose his freedom...

Than lose his obedience to God.

His garment stayed behind.

But his integrity went with him.

🏃 Joseph immediately fled from temptation.

👕 He left his garment behind rather than compromise his integrity.

🙏 Sometimes the strongest act of faith is simply walking away.

# Genesis 39:13-19
# ⚖️ Joseph Accused Of Wrongdoing
---
## ⚖️ And It Came To Pass, When She Saw That He Had Left His Garment In Her Hand, And Was Fled Forth

The phrase **"it came to pass"** simply moves the story forward.

Joseph had just refused Potiphar's wife for the final time.

She grabbed his garment.

Joseph pulled away.

Then he **fled**.

The word **"fled"** means he ran away immediately.

He did not stop to argue.

He did not try to explain himself.

He escaped the situation as quickly as possible.

Now Moses shifts our attention away from Joseph and onto Potiphar's wife.

Joseph had done the right thing.

Now we are about to see how Potiphar's wife responds after being rejected.

Instead of admitting the truth...

She begins creating a lie.

🏃 Joseph escaped the temptation immediately.

👕 His garment remained in her hand.

⚠️ The story now shifts from Joseph's obedience to her deception.

---
## 📢 Then She Called Unto The Men Of Her House, And Spake Unto Them, Saying, See, He Hath Brought In An Hebrew Unto Us To Mock Us

Potiphar's wife immediately called the men who worked around the household.

These were likely the household servants, stewards, overseers, guards, and other workers responsible for the daily operation of Potiphar's estate.

Whether they were Egyptian servants, hired workers, or slaves from different nations, they all served under Potiphar's authority—and under Joseph's leadership as overseer.

Notice how she begins her accusation.

She does not first call Joseph by his name.

She says,

**"He hath brought in an Hebrew unto us."**

By calling Joseph **"a Hebrew,"** she draws attention to the fact that Joseph was an outsider.

He was not Egyptian.

He spoke differently.

He worshiped a different God.

He came from another land.

Many scholars believe she intentionally emphasized Joseph's nationality to stir up suspicion and resentment against him.

Joseph was already different.

Now she was using that difference against him.

She also says,

**"to mock us."**

Here, the word **"mock"** does not mean making jokes or laughing at someone.

In this context it carries the idea of insulting, humiliating, violating, or treating someone shamefully.

She is accusing Joseph of bringing disgrace upon the entire household.

Everything she says is carefully designed to make herself appear innocent while making Joseph appear dangerous.

📢 Potiphar's wife gathered witnesses before Joseph could tell the truth.

🇪🇬 She emphasized Joseph was "a Hebrew" to portray him as an outsider.

🎭 "Mock us" refers to bringing shame and humiliation, not making jokes.

---
## 🚨 He Came In Unto Me To Lie With Me, And I Cried With A Loud Voice

Potiphar's wife completely reverses what actually happened.

In reality...

She repeatedly pursued Joseph.

She asked him day after day to lie with her.

She grabbed his garment.

Joseph ran away.

But in her version of the story, Joseph becomes the aggressor.

She claims,

**"He came in unto me to lie with me."**

She is accusing Joseph of attempted sexual assault.

Then she adds,

**"I cried with a loud voice."**

This detail was important.

In the ancient world, a woman crying out loudly would be viewed as evidence that she resisted an attack and called for help.

By including this detail, Potiphar's wife makes her lie sound believable.

She is carefully constructing a story that explains why Joseph fled the house.

According to her version, Joseph ran because her screams frightened him away.

Every part of the story is designed to make Joseph appear guilty while making herself appear completely innocent.

🚨 Potiphar's wife falsely accused Joseph of attacking her.

📢 She claimed she screamed to make her story believable.

⚖️ She completely reversed the truth to protect herself.

---
## 👕 And It Came To Pass, When He Heard That I Lifted Up My Voice And Cried, That He Left His Garment With Me, And Fled, And Got Him Out

Potiphar's wife now points to Joseph's garment as the evidence for her story.

The garment was likely Joseph's outer robe or cloak—the loose outer piece of clothing commonly worn over his tunic.

When Joseph fled, he chose to leave the garment behind rather than stay in a situation that could lead to sin.

Now that same garment becomes the centerpiece of her false accusation.

This is the second time in Joseph's life that a piece of clothing has been used against him.

Back in Genesis 37, Joseph's **coat of many colors** became the false evidence his brothers used to convince Jacob that Joseph had been killed by a wild animal.

Now another garment is being used to convince Potiphar that Joseph committed a crime he never committed.

In both situations, Joseph's clothing became false evidence because of someone else's deception.

The garment itself was innocent.

The lie came from the people holding it.

👕 Joseph's garment became false evidence against him.

🎭 This is the second time clothing has been used to deceive others about Joseph.

⚖️ The evidence looked convincing, but the story behind it was completely false.

---
## ⏳ And She Laid Up His Garment By Her, Until His Lord Came Home

After the other servants heard her story, Potiphar's wife kept Joseph's garment beside her.

She was no longer acting out of panic.

She was preparing her case.

The garment became what she believed was physical proof of her accusation.

Then she waited for Potiphar to return home.

Joseph had already fled.

The servants had already heard her version of events.

Now she was ready to tell the same story to her husband.

Everything was being carefully arranged so that Joseph would appear guilty before he ever had the opportunity to defend himself.

⏳ Potiphar's wife kept the garment as supposed evidence.

⚖️ She prepared her accusation before Potiphar returned.

🎭 Joseph would now have to face a lie that had already been accepted by others.

---
## 🗣️ And She Spake Unto Him According To These Words, Saying, The Hebrew Servant Which Thou Hast Brought Unto Us Came In Unto Me To Mock Me

When Potiphar returned, his wife repeated the same accusation almost word for word.

Again she avoids calling Joseph by name.

Instead she says,

**"The Hebrew servant."**

Then she adds,

**"which thou hast brought unto us."**

There is subtle blame in those words.

She is not only accusing Joseph.

She is reminding Potiphar that **he** was the one who brought Joseph into their household.

It is almost as if she is saying,

*"This happened because you trusted him."*

She again says Joseph came to **"mock"** her.

Here the word does not mean making fun of someone.

It carries the idea of insulting, humiliating, violating, or bringing disgrace.

She is accusing Joseph of treating her shamefully through attempted sexual assault.

By repeating the story exactly, she strengthens the lie and makes it sound rehearsed and believable.

🎭 Potiphar's wife repeated the same false story to her husband.

🇪🇬 She again emphasized Joseph was "the Hebrew servant."

⚖️ She subtly shifted part of the blame toward Potiphar for bringing Joseph into the household.

---
## 👕 And It Came To Pass, As I Lifted Up My Voice And Cried, That He Left His Garment With Me, And Fled Out

Potiphar's wife finishes telling her false story.

She claims that when she screamed for help, Joseph immediately ran away and left his garment behind.

Once again, she points to the garment as her supposed proof.

To anyone hearing only her side of the story, the garment would appear to support everything she was saying.

But the garment proved only one thing:

Joseph left.

It did not prove why he left.

She supplied the story.

The garment simply became the evidence she used to make her lie believable.

This is now the second time in Joseph's life that an innocent piece of clothing is used to support a false story.

His brothers used his coat of many colors to deceive Jacob.

Now Potiphar's wife uses Joseph's garment to deceive Potiphar.

In both cases, the clothing was innocent.

The deception came from the people holding it.

👕 The garment became the "evidence" supporting her lie.

🎭 She used Joseph's flight to create a false story.

⚖️ Evidence without the truth can easily be used to deceive.

---
## 😠 And It Came To Pass, When His Master Heard The Words Of His Wife, Which She Spake Unto Him, Saying, After This Manner Did Thy Servant To Me, That His Wrath Was Kindled

When Potiphar heard his wife's accusation, the Bible says "his wrath was kindled," meaning he became very angry.

Interestingly, the text never tells us who his anger was directed toward.

This has led many Bible readers, commentators, and theologians to suggest that Potiphar may not have fully believed his wife's accusation.

Several observations from the text support this possibility.

By this point, Joseph had likely served in Potiphar's house for nearly ten years. During that time, Potiphar watched Joseph faithfully manage every part of his estate.

Joseph was no longer simply another slave.

He had become Potiphar's most trusted servant.

The Bible says Potiphar placed everything under Joseph's authority. His servants, finances, fields, livestock, storehouses, and household operations were all entrusted to Joseph. Potiphar concerned himself with virtually nothing except the food placed before him.

That level of trust is not developed in a few weeks.

It is built over years of proven faithfulness.

Many commentators therefore believe that a genuine relationship had developed between the two men. Whether viewed as a trusted chief steward, right-hand man, or even something resembling a father-and-son relationship, Joseph had earned Potiphar's complete confidence.

Another observation frequently noted by scholars is Potiphar's position.

Potiphar was the captain of the guard, a position that included authority over Pharaoh's prison and, very likely, responsibility for carrying out executions ordered by Pharaoh.

If Potiphar had been completely convinced that Joseph had attempted to sexually assault his wife, many commentators argue that execution would have been the expected punishment.

Instead, Potiphar imprisoned Joseph.

Significantly, he placed him in the royal prison under his own authority rather than ordering his immediate death.

Many theologians see this as evidence that Potiphar found himself in an impossible position.

He could not publicly accuse his own wife of lying without bringing disgrace upon his household.

Yet after years of watching Joseph's integrity, faithfulness, and the Lord's blessing upon his life, he may also have found it difficult to believe Joseph was capable of such a crime.

According to this view, prison became the only solution that preserved both his public authority and Joseph's life.

The Bible never explicitly tells us whether this interpretation is correct.

However, many commentators believe Potiphar's decision to imprison Joseph rather than execute him fits naturally with the years of trust that had already been established between them.

😠 Potiphar's anger was real, but Scripture never identifies exactly where it was directed.

🤝 Many commentators believe years of trust made it difficult for Potiphar to accept the accusation against Joseph.

⚖️ Joseph's imprisonment, rather than immediate execution, has led many theologians to conclude that Potiphar may have doubted his wife's account.

# Genesis 39:20-23
# 🔒 Joseph Is Thrown In Prison
---
## 🔒 And Joseph's Master Took Him, And Put Him Into The Prison, A Place Where The King's Prisoners Were Bound; And He Was There In The Prison

After hearing his wife's accusation, Potiphar had Joseph arrested and placed into prison.

This was not an ordinary prison.

The Bible specifically says it was **"a place where the king's prisoners were bound."**

In other words, this was the royal prison.

It was where prisoners connected to Pharaoh's court and government were held.

Many commentators note that this was very different from an ordinary criminal prison.

It was more like what we might compare today to a federal prison for government officials rather than a common prison for everyday criminals.

Some theologians also point to this as another possible indication that Potiphar was not completely convinced Joseph was guilty.

Instead of ordering Joseph's execution—which Potiphar likely had the authority to do as captain of the guard—he placed Joseph into the royal prison under his own authority.

Whether this was because Potiphar doubted his wife's story or because he believed prison was the safest solution, Scripture does not explicitly say.

What is certain is that Joseph once again found himself in circumstances he did not deserve.

Yet even prison would become another place where God continued preparing him for something greater.

🔒 Joseph was placed in the royal prison where Pharaoh's prisoners were kept.

🏛️ This was different from an ordinary prison and was connected to the king's court.

⚖️ Many commentators see Joseph's imprisonment instead of execution as another reason to believe Potiphar may have had doubts about the accusation.

---
## ✨ But The Lord Was With Joseph

For the third time in this chapter, Moses reminds us of the most important truth in Joseph's story:

**"The Lord was with Joseph."**

Nothing about Joseph's circumstances suggested that.

He had been betrayed by his brothers.

Sold into slavery.

Falsely accused.

Now he was sitting in prison.

From a human perspective, it looked like Joseph's life kept getting worse.

But God's presence had never left him.

The Lord being with Joseph did not mean Joseph avoided hardship.

It meant that God remained with him through every hardship.

God continued guiding him.

Protecting him.

Giving him wisdom.

Giving him favor.

Prospering the work of his hands.

Joseph lost his freedom, but he never lost God's presence.

This is one of the greatest themes in Joseph's life.

Your circumstances may change.

God's presence does not.

✨ God's presence never left Joseph, even in prison.

🙏 Being "with Joseph" did not remove hardship—it gave Joseph strength and favor through it.

📖 God's faithfulness remained constant even when Joseph's circumstances changed.

---
## ❤️ And Showed Him Mercy, And Gave Him Favour In The Sight Of The Keeper Of The Prison

God's presence quickly became visible again.

The keeper of the prison began looking upon Joseph with favor.

The word **"favor"** means kindness, acceptance, trust, and goodwill.

Joseph distinguished himself once again through his character, integrity, wisdom, and faithful work.

Before long, the prison keeper trusted Joseph just as Potiphar had trusted him.

This wasn't because Joseph manipulated people.

It was because God's blessing was evident in his life.

Wherever Joseph went, people recognized they could trust him.

God continued opening doors that no one else could open.

❤️ God gave Joseph favor with the prison keeper.

🤝 Favor produced trust, responsibility, and opportunity.

✨ Even inside prison, God continued working behind the scenes.

---
## 🔑 And The Keeper Of The Prison Committed To Joseph's Hand All The Prisoners That Were In The Prison

The prison keeper eventually entrusted all the prisoners to Joseph's care.

This meant Joseph was no longer simply another prisoner.

He became the administrator of the prison.

He likely organized daily responsibilities.

Assigned work.

Managed supplies.

Helped maintain order.

Oversaw the routines of the other prisoners.

In many ways, Joseph was now doing inside the prison exactly what he had done in Potiphar's household.

Wherever Joseph was placed, he faithfully served until he was entrusted with more.

Many readers see God's preparation unfolding here.

Years earlier, Joseph was learning to manage his father's household.

Then he learned to oversee Potiphar's estate.

Now he was learning to lead inside a royal prison.

Each season required greater wisdom, greater leadership, and greater responsibility.

God was preparing Joseph for a position he could not yet see.

🔑 Joseph became responsible for the daily management of the prison.

📈 God continued increasing Joseph's leadership wherever he was placed.

👑 Many commentators see these experiences as God's preparation for Joseph's future leadership over Egypt.

---
## 👀 The Keeper Of The Prison Looked Not To Anything That Was Under His Hand

This statement closely mirrors what the Bible previously said about Potiphar.

Just as Potiphar eventually stopped worrying about anything under Joseph's care, the keeper of the prison reached the same conclusion.

Joseph had proven himself trustworthy again.

The prison keeper no longer felt the need to supervise Joseph's work.

Everything Joseph managed was handled faithfully.

A clear pattern is beginning to emerge.

Joseph's circumstances keep changing...

...but Joseph's character never does.

Whether he is a shepherd...

A slave...

Or a prisoner...

He works with excellence.

He honors God.

He earns trust.

And God continues opening new doors.

Many readers also see this as part of God's long-term preparation.

Every assignment Joseph received taught him new leadership skills that would eventually prepare him to oversee an entire nation during the coming famine.

👀 The prison keeper trusted Joseph completely.

🔁 This mirrors the trust Potiphar had already placed in Joseph.

🌾 God was preparing Joseph step by step for the leadership role he would one day have over Egypt.

---
## 🌱 Because The Lord Was With Him, And That Which He Did, The Lord Made It To Prosper

The chapter ends exactly where it began.

Joseph prospered because **the Lord was with him.**

His success did not depend on freedom.

It did not depend on wealth.

It did not depend on his location.

It depended on God's presence.

Whether Joseph lived in Canaan...

Potiphar's house...

Or Pharaoh's prison...

God continued causing the work of his hands to prosper.

Looking back over Joseph's life, many commentators see that God was using every stage to prepare him for his greatest assignment.

Managing a family flock...

Managing Potiphar's estate...

Managing Pharaoh's prison...

Each responsibility prepared Joseph for the day he would manage Egypt itself and, through Egypt, preserve countless lives during the famine.

What looked like setbacks were actually God's training ground.

🌱 Joseph prospered because God's presence remained with him.

📖 Every season of Joseph's life prepared him for greater responsibility.

👑 God was shaping Joseph into the leader who would one day save Egypt and many surrounding nations from famine.`.trim();

export const GENESIS_THIRTY_NINE_PERSONAL_SECTIONS = parseGenesisThirtyNineRawNotes(GENESIS_THIRTY_NINE_RAW_NOTES);
