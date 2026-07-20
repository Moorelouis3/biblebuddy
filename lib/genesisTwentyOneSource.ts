export type GenesisTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisTwentyOneRawNotes(rawText: string): GenesisTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const sectionMatch = lines[index].trim().match(
      /^#\s*(?:\*\*)?(.*?Genesis\s+21:(\d+)(?:[-–—]|â€“|â€”)?(\d+)?)\s*(?:\*\*)?\s*$/i,
    );

    if (!sectionMatch) {
      index += 1;
      continue;
    }

    const icon = sectionMatch[1].replace(/Genesis\s+21:.+$/i, "").replace(/\*\*/g, "").trim();
    const startVerse = Number(sectionMatch[2]);
    const endVerse = Number(sectionMatch[3] || sectionMatch[2]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const sectionTitleMatch =
      lines[index]?.trim().match(/^#+\s*(?:\*\*)?(.+?)(?:\*\*)?$/) || lines[index]?.trim().match(/^\*\*(.+?)\*\*$/);
    if (!sectionTitleMatch) {
      throw new Error("Missing Genesis 21 section title after verse " + startVerse);
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
        throw new Error("Missing Genesis 21 explanation for " + phraseTitle);
      }

      phrases.push([phraseTitle, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference:
        startVerse === endVerse
          ? "Genesis 21:" + startVerse
          : "Genesis 21:" + startVerse + "-" + endVerse,
      title,
      icon,
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Genesis 21 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_TWENTY_ONE_RAW_NOTES = `# Genesis 21:1–8

## 👶 Isaac Is Born

### ❤️ And The Lord Visited Sarah As He Had Said

The word **visited** means that God personally fulfilled His promise to Sarah.

The Bible does not explain how God enabled Sarah to conceive.

Unlike Mary, whose pregnancy came through the miraculous work of the Holy Spirit without a human father, Sarah conceived naturally through Abraham and Sarah's marriage.

The miracle was not how Isaac was conceived, but that an elderly, barren woman who had been unable to have children her entire life was suddenly able to become pregnant because God fulfilled His promise.

❤️ God personally fulfilled His promise

👶 Sarah conceived through Abraham

✨ The miracle was that God enabled a barren woman to have a child

➡️ God keeps His word

---

### 📖 And The Lord Did Unto Sarah As He Had Spoken

Everything happened exactly as God promised.

Years earlier, God had told Abraham and Sarah that she would bear a son.

Now every word God spoke comes true.

This reminds us that God's promises are always fulfilled, even when they seem impossible.

📖 God keeps every promise

🙏 Nothing God says fails

➡️ Sarah becomes pregnant

---

### 🤰 For Sarah Conceived And Bare Abraham A Son In His Old Age

Conceived means Sarah became pregnant.

Bare means she gave birth.

This is Abraham's second son, but he is Sarah's first and only son.

Isaac is the promised son through whom God's covenant will continue.

The phrase "in his old age" reminds us that Abraham was now 100 years old.

This also foreshadows Jacob later having Joseph in his old age, showing another miraculous birth in the covenant family.

🤰 Conceived means became pregnant

👶 Bare means gave birth

👴 Abraham is now 100 years old

📖 Isaac is the promised covenant son

➡️ God kept His timing

---

### ⏰ At The Set Time Of Which God Had Spoken To Him

God's promise happened exactly when He said it would.

This connects back to Genesis 18:14, when the Lord said:

**"At the time appointed I will return unto thee… and Sarah shall have a son."**

One year later, that promise is fulfilled exactly.

⏰ God's timing is perfect

📖 Fulfills Genesis 18:14

🙏 God is never early or late

➡️ Abraham names his son

---

### 👶 Abraham Called The Name Of His Son Isaac

Abraham obeys God and names his son Isaac, just as God commanded.

The Hebrew name Isaac (Yitzḥaq) means **"he laughs"** or **"laughter."**

The name is a constant reminder of God's faithfulness.

Abraham laughed when God first promised him a son (Genesis 17).

Sarah also laughed when she overheard God's promise in the tent (Genesis 18).

Now every time they call Isaac's name, they remember that what once seemed impossible became reality through God.

Isaac is also the promised son through whom God's covenant, the nation of Israel, and ultimately the Messiah will come.

👶 Isaac means "he laughs" or "laughter"

😂 His name recalls Abraham's and Sarah's laughter

❤️ God turned doubt into joy

📖 Isaac is the promised covenant son

➡️ Abraham obeys God's covenant

---

### ✂️ Abraham Circumcised His Son Isaac Being Eight Days Old, As God Had Commanded Him

Abraham immediately obeys God's command.

This connects back to Genesis 17, where God established circumcision as the sign of His covenant and commanded that every male child be circumcised on the eighth day.

Isaac becomes the first child specifically recorded as receiving this covenant sign from birth.

✂️ Abraham obeys immediately

📖 Connects back to Genesis 17

🤝 Circumcision is the sign of God's covenant

➡️ Abraham's age is recorded

---

### 🎂 Abraham Was One Hundred Years Old When His Son Isaac Was Born Unto Him

Abraham is now 100 years old.

Earlier, both Abraham and Sarah laughed because they believed they were too old to have children.

Now God has proven that nothing is impossible for Him.

Human limitations never limit God's power.

🎂 Abraham is 100 years old

😂 Their earlier doubts have been answered

✨ Nothing is impossible for God

➡️ Sarah rejoices

---

### 😂 God Hath Made Me To Laugh

Sarah's laughter has completely changed.

Earlier, she laughed because she doubted.

Now she laughs because she is overwhelmed with joy.

God has turned her disbelief into celebration.

😂 Sarah's laughter becomes joy

❤️ God transformed doubt into faith

🙏 God's promises bring lasting joy

➡️ Others will celebrate too

---

### 😊 So That All That Hear Will Laugh With Me

Sarah is saying that everyone who hears this story will rejoice with her.

The birth of Isaac is so miraculous that others will celebrate what God has done.

This is no longer laughter of unbelief.

It is laughter of amazement and joy.

😊 Others will rejoice with Sarah

❤️ God's blessings become a testimony

😂 Doubt has become celebration

➡️ Sarah reflects on God's miracle

---

### 🤱 Who Would Have Said Unto Abraham, That Sarah Should Have Given Children Suck?

Sarah is expressing amazement.

She is saying,

**"Who would have ever believed that I would one day nurse a baby?"**

Given children suck simply means to breastfeed a child.

Years earlier, having a baby seemed impossible.

Now she is personally nursing the promised son.

🤱 Given children suck means to breastfeed

😮 Sarah marvels at God's miracle

👶 She is personally caring for Isaac

➡️ God fulfilled the impossible

---

### 👴 For I Have Born Him A Son In His Old Age

Sarah praises God for fulfilling His promise despite Abraham's old age.

She knows this birth could only happen because of God's power.

Her words are filled with gratitude rather than doubt.

👴 Abraham's age made this humanly impossible

✨ God made the impossible possible

❤️ Sarah now celebrates God's faithfulness

➡️ Isaac grows

---

### 🍼 And The Child Grew, And Was Weaned

Weaned means Isaac stopped nursing and began eating regular food.

In Abraham's day, children were often weaned around 2–3 years of age, much later than is common today.

This marked an important milestone because many children did not survive infancy.

Reaching the age of weaning was a reason for great celebration.

🍼 Weaned means no longer nursing

🍞 Isaac begins eating regular food

🎉 Reaching this age was a major milestone

➡️ Abraham celebrates

---

### 🎉 Abraham Made A Great Feast The Same Day That Isaac Was Weaned

Abraham celebrates Isaac's weaning with a great feast.

This was more than just a birthday party.

It was a public celebration thanking God for preserving the promised son through infancy.

Everyone could now clearly see that God's promise to Abraham and Sarah was becoming reality.

🎉 Abraham holds a great celebration

🙏 The feast thanks God for preserving Isaac

📖 The promised son continues to grow

---

# Genesis 21:9–16

## 🚶 Sarah Sends Hagar Away

### 👀 And Sarah Saw The Son Of Hagar The Egyptian

The son of Hagar is Ishmael.

Hagar was Sarah's Egyptian servant whom Sarah had given to Abraham years earlier when she believed she could never have children.

God later promised that Isaac—not Ishmael—would be the son through whom His covenant would continue.

Although many years had passed, the tension between Sarah and Hagar had never fully disappeared.

Now, after Isaac's birth and weaning celebration, Sarah notices Ishmael's behavior toward Isaac.

👀 Sarah notices Ishmael

📖 Old family tensions resurface

👶 Isaac is now the promised son

➡️ Sarah sees Ishmael's behavior

---

### 😒 Which She Had Born Unto Abraham, Mocking

Mocking means making fun of someone, laughing at them, insulting them, or trying to make them feel small.

This was much more than normal teasing between children.

Years later, Galatians 4:29 says Ishmael was persecuting Isaac.

Persecuting means repeatedly treating someone badly—constantly making fun of them, putting them down, picking on them, and trying to hurt or humiliate them because of who they are.

Sarah realized this wasn't just childish teasing. She saw a serious attitude developing that would only get worse if it continued.

😒 Mocking means making fun of or insulting someone

⚠️ Persecuting means repeatedly mistreating someone

📖 Sarah sees the conflict becoming serious

➡️ Sarah goes to Abraham

---

### 🗣️ Wherefore She Said Unto Abraham

Wherefore means therefore or because of this.

After seeing Ishmael mock Isaac, Sarah immediately speaks to Abraham.

She is no longer willing to let the situation continue.

🗣️ Wherefore means therefore

👩 Sarah responds immediately

➡️ She makes a demand

---

### 🚪 Cast Out This Bondwoman And Her Son

Cast out means send away or drive out.

A bondwoman was a female servant or slave.

Sarah refers to Hagar by her position instead of by her name, showing that their relationship has completely broken down.

She wants both Hagar and Ishmael removed from Abraham's household.

🚪 Cast out means send away

⛓️ Bondwoman means female servant or slave

💔 Sarah wants Hagar and Ishmael to leave

➡️ Sarah explains why

---

### 👑 For The Son Of This Bondwoman Shall Not Be Heir With My Son, Even With Isaac

Sarah does not want Ishmael sharing Isaac's inheritance.

In that culture, inheritance and family leadership were extremely important.

Although God had already promised in Genesis 17 that Ishmael would become a great nation, God had also made it clear that His covenant would continue through Isaac.

Sarah's concern is partly emotional, but it also agrees with what God had already declared.

👑 Sarah wants Isaac to receive the inheritance

📖 God had already chosen Isaac for the covenant

🌎 Ishmael would still become a great nation

➡️ Abraham struggles with the decision

---

### 😔 And The Thing Was Very Grievous In Abraham's Sight Because Of His Son

Grievous means deeply painful or heartbreaking.

This was not simply Hagar being sent away.

Ishmael was Abraham's own son.

By this time, Ishmael was about 16–17 years old.

That means Abraham had spent roughly seventeen years raising him.

Although the Bible does not describe their relationship in detail, we have already seen Abraham's heart.

He lovingly cared for Lot like a son, rescued him when he was captured, risked his own life for him, and welcomed him into his household for years.

If Abraham showed that much love toward his nephew, it is difficult to imagine that he loved his own son any less.

Abraham had watched Ishmael learn to walk, taught him, protected him, laughed with him, and expected him to become the son through whom God's promises would come.

Then Isaac was born, and now Abraham finds himself caught between the son he had spent years raising and the son God had promised through Sarah.

This was one of the most painful moments of Abraham's life.

He was not simply sending away a servant.

He was saying goodbye to his firstborn son.

😔 Grievous means deeply painful

👨 Ishmael was about 16–17 years old

❤️ Abraham had spent years raising and loving him

💔 Abraham is torn between his two sons

➡️ God speaks

---

### 🗣️ And God Said Unto Abraham

God steps into the situation.

Just as He has done many times before, God gives Abraham clear direction during a difficult moment.

🗣️ God speaks directly to Abraham

🙏 God provides guidance

➡️ God comforts Abraham

---

### ❤️ Let It Not Be Grievous In Thy Sight Because Of The Lad

God tells Abraham not to let his heart be overwhelmed.

The lad refers to Ishmael.

God is not telling Abraham to stop loving his son.

Nor is He saying that Ishmael no longer matters.

Instead, God is reassuring Abraham that Ishmael's future is now in His hands.

God is essentially saying,

**"Trust Me. I have already promised to bless Ishmael, and I will keep My promise."**

Abraham had seen God protect Hagar before when she fled into the wilderness.

God found her, cared for her, and brought her safely back.

Now God is asking Abraham to trust Him again.

Abraham does not have to carry Ishmael's future by himself because God Himself will take care of both Ishmael and Hagar.

❤️ God is not rejecting Ishmael

🙏 God tells Abraham to trust Him

🌎 God will personally care for Ishmael

❤️ God will also watch over Hagar

➡️ God explains why

---

### ⛓️ And Because Of Thy Bondwoman

God also refers to Hagar as the bondwoman.

The term simply identifies her as Sarah's servant.

It is not saying she is only connected to Abraham because of Ishmael.

God is referring to her social position within Abraham's household.

Even though Hagar is leaving, she has not been forgotten.

God is already planning to care for her in the wilderness.

⛓️ Bondwoman means Sarah's servant

📖 It describes her position in the household

❤️ God has not forgotten Hagar

➡️ God tells Abraham what to do

---

### 👂 In All That Sarah Hath Said Unto Thee, Hearken Unto Her Voice

Hearken means listen or obey.

This is surprising because God tells Abraham to listen to Sarah.

Not because Sarah is perfect, but because in this matter her request agrees with God's covenant plan.

God Himself confirms that Isaac is the son through whom His covenant will continue.

👂 Hearken means listen or obey

📖 God tells Abraham to listen to Sarah

🙏 Sarah's request agrees with God's covenant

➡️ God explains why

---

### 👶 For In Isaac Shall Thy Seed Be Called

God reminds Abraham of the promise He has repeated many times.

Isaac—not Ishmael—is the son through whom the covenant, the nation of Israel, and eventually the Messiah will come.

This does not mean God has rejected Ishmael.

It simply means Isaac has a different role in God's plan.

👶 Isaac is the covenant son

📖 God's promise continues through Isaac

❤️ Ishmael still has a future

➡️ God comforts Abraham again

---

### 🌎 Also Of The Son Of The Bondwoman Will I Make A Nation, Because He Is Thy Seed

God reassures Abraham that Ishmael will not be abandoned.

Because Ishmael is Abraham's son, God will bless him and make him into a great nation, just as He promised in Genesis 17.

Abraham does not need to worry about Ishmael's future because God is already watching over him.

🌎 Ishmael will become a great nation

❤️ God has not forgotten him

📖 God keeps His promises to both sons

➡️ Abraham obeys

---

### 🌅 And Abraham Rose Up Early In The Morning

Throughout Genesis, rising early in the morning often shows immediate obedience after hearing God's instructions.

Abraham does not delay.

Even though this decision breaks his heart, he trusts God enough to obey Him.

🌅 Abraham obeys immediately

🙏 He trusts God's command

➡️ Hagar leaves

---

### 🎒 And Took Bread, And A Bottle Of Water…And Sent Her Away

Abraham gives Hagar food and water before sending her away.

Sent her away means she was leaving Abraham's household permanently.

She was no longer living under Abraham's protection.

Although this seems harsh, Abraham obeys because God Himself instructed him to do so.

🎒 Abraham provides supplies

🚶 Hagar leaves Abraham's household

🙏 Abraham obeys God's command

➡️ Hagar enters the wilderness

---

### 🏜️ She Departed, And Wandered In The Wilderness Of Beersheba

Hagar leaves and wanders through the wilderness near Beersheba, located in the southern part of Canaan.

A wilderness was dry, hot, and dangerous.

Without enough water, survival was difficult.

By this time Ishmael was likely around 16–17 years old, not a small child.

Even so, traveling alone through the desert with only limited supplies would have been extremely dangerous.

🏜️ Beersheba was in the southern wilderness

☀️ The desert was harsh and dangerous

🚶 Hagar and Ishmael travel alone

➡️ Their water runs out

---

### 💧 And The Water Was Spent In The Bottle

Spent means used up.

Their entire water supply is gone.

In the wilderness, running out of water could quickly become life-threatening.

💧 Spent means completely used up

☀️ They now face dehydration

⚠️ Their situation becomes desperate

➡️ Hagar protects Ishmael

---

### 🌿 And She Cast The Child Under One Of The Shrubs

Cast here does not mean she threw Ishmael.

It simply means she gently placed or laid him beneath a desert shrub to give him shade from the hot sun.

She is trying to protect him as best she can.

🌿 Cast means laid down

☀️ The shrub provides shade

❤️ Hagar tries to protect Ishmael

➡️ She walks away

---

### 🏹 She Went, And Sat Her Down Over Against Him A Good Way Off, As It Were A Bowshot

Hagar walks a short distance away.

A bowshot means about as far as an arrow could be shot from a bow.

She stays close enough to know where Ishmael is but far enough away that she does not have to watch him die.

🏹 A bowshot is the distance an arrow travels

😢 Hagar cannot bear to watch

➡️ She explains why

---

### 😭 Let Me Not See The Death Of The Child

Hagar believes Ishmael is about to die from thirst.

Unable to watch him suffer, she moves away and breaks down in grief.

This is a mother's heartbreak.

😭 Hagar believes Ishmael will die

💔 She cannot bear to watch

➡️ She cries out

---

### 😢 She Lifted Up Her Voice, And Wept

Lifted up her voice means she cried out loudly.

She is no longer silently grieving.

She openly weeps before God in complete desperation.

Although Hagar feels completely alone in the wilderness, God has not forgotten either her or Ishmael.

😢 Lifted up her voice means she cried aloud

💔 Hagar pours out her grief

🙏 God has not forgotten them

---

# Genesis 21:17–21

## 👼 God Cares For Ishmael

### 🙏 And God Heard The Voice Of The Lad

The lad is Ishmael.

God hears Ishmael crying.

Whether he was crying out in prayer or simply crying in desperation, God heard him.

Ishmael had spent his whole life in Abraham's household.

He had seen Abraham build altars, offer sacrifices, and pray to God.

He knew who the true God was.

This is another reminder that although Ishmael was no longer the son of the covenant, God had not forgotten him.

🙏 God hears Ishmael

👂 God listens to those in need

❤️ Ishmael has not been forgotten

➡️ God sends His angel

---

### 👼 And The Angel Of God Called To Hagar Out Of Heaven

This is likely the same Angel of the Lord who met Hagar years earlier when she fled from Sarah while pregnant with Ishmael.

The first time, God found Hagar in the wilderness before Ishmael was born.

Now, many years later, God meets her again in another wilderness when Ishmael is nearly grown.

This shows God's faithfulness.

He cared for Hagar then, and He cares for her now.

👼 God meets Hagar again

🏜️ Both meetings happen in the wilderness

❤️ God remains faithful through the years

➡️ The angel comforts Hagar

---

### ❓ What Aileth Thee, Hagar?

What aileth thee? simply means:

**"What is wrong?"** or **"What troubles you?"**

God already knows what has happened.

The question invites Hagar to realize that she is not alone.

❓ "What aileth thee?" means "What is wrong?"

❤️ God knows her pain

🙏 God begins comforting her

➡️ The angel tells her not to fear

---

### ❤️ Fear Not, For God Hath Heard The Voice Of The Lad Where He Is

The angel tells Hagar not to be afraid.

God has already heard Ishmael.

Although everything looks hopeless, God's promise has not changed.

God knows exactly where Ishmael is.

No wilderness is too far away for God.

❤️ God tells Hagar not to fear

👂 God has heard Ishmael

📍 God knows exactly where they are

➡️ God reminds her of His promise

---

### 🌎 Arise, Lift Up The Lad…For I Will Make Him A Great Nation

The angel tells Hagar to get up, help Ishmael, and keep moving.

Then God reminds her of His promise.

**"I will make him a great nation."**

This is God's way of saying,

**"My promise is still in effect."**

Ishmael cannot die here because God has already promised that one day he will become a great nation.

God's promises do not fail.

When God makes a promise, He also provides what is needed to fulfill it.

🌎 God's promise still stands

🙏 God always keeps His promises

❤️ Ishmael's future is secure

➡️ God provides a miracle

---

### 👀 And God Opened Her Eyes

God enables Hagar to see something she had not noticed before.

Whether God miraculously created the well at that moment or simply opened her eyes to a well that was already nearby, the point is the same:

God provided exactly what she needed at exactly the right time.

This is a miracle of God's provision.

👀 God opens Hagar's eyes

✨ God provides exactly when needed

❤️ God answers their desperate situation

➡️ She finds water

---

### 💧 And She Saw A Well Of Water

A well was much more than one drink.

A well was a dependable source of water.

It meant survival.

With water, they could continue living, travel safely, care for their animals, and build a future.

God didn't simply give Hagar enough water for one afternoon.

He provided a continuing source of life.

This reflects how God often provides—not just for today's need, but for tomorrow's as well.

💧 A well is a lasting source of water

❤️ God provides for both today and tomorrow

🏜️ Their immediate danger is over

➡️ Hagar fills the bottle

---

### 🥤 She Went, And Filled The Bottle With Water, And Gave The Lad Drink

Hagar immediately fills the water bottle.

Then she gives Ishmael water.

The crisis is over.

God has rescued them.

🥤 Hagar obeys immediately

💧 Ishmael receives water

❤️ God saves their lives

➡️ Ishmael grows

---

### ❤️ And God Was With The Lad As He Grew

This is one of the Bible's greatest statements.

God was with him.

God's presence remained with Ishmael as he grew into adulthood.

Later, Genesis will repeatedly say that God was with Joseph, showing His blessing and protection.

Here we see that same language used of Ishmael.

Although Ishmael was not the son through whom the covenant would continue, God still watched over him because God always keeps His promises.

❤️ God remained with Ishmael

🛡️ God protected and blessed him

📖 God's promises never fail

➡️ Ishmael learns to survive

---

### 🏹 He Dwelt In The Wilderness, And Became An Archer

Ishmael continues living in the wilderness.

An archer was a skilled hunter and survivor.

He would have used a bow to hunt animals for food and protect himself in the harsh desert.

Combined with the well God provided, Ishmael now had both water and a way to provide food.

God had equipped him for the life ahead.

🏹 An archer hunted with a bow

🥩 Hunting provided food

🛡️ His skills helped him survive

➡️ Ishmael settles farther south

---

### 🏜️ He Dwelt In The Wilderness Of Paran

Paran was a large wilderness south of Canaan and northwest of the Sinai Peninsula.

It lay farther south than Beersheba.

At some point, Hagar and Ishmael continued traveling until they settled there.

The wilderness became Ishmael's home.

🏜️ Paran was south of Beersheba

🚶 Hagar and Ishmael continued traveling

🏕️ The wilderness became their home

➡️ Hagar finds Ishmael a wife

---

### 💍 His Mother Took Him A Wife Out Of The Land Of Egypt

Hagar chooses an Egyptian wife for Ishmael because Egypt was her homeland.

She naturally looked to her own people when arranging his marriage.

The Bible does not say that marrying an Egyptian caused Ishmael to turn away from God.

However, throughout Scripture, marriages often influenced families spiritually because husbands and wives shared beliefs, customs, and traditions.

Ishmael became the father of many descendants, known as the Ishmaelites, while Isaac became the father of the nation through whom God's covenant continued.

Both nations grew from Abraham, but each followed a different path in God's plan.

💍 Hagar chooses a wife from her homeland

🇪🇬 Egypt was Hagar's native country

🌎 Ishmael becomes the father of the Ishmaelites

📖 Isaac and Ishmael become two different family lines

---

# Genesis 21:22–34

## 🤝 Abraham Makes A Covenant With Abimelech

### ⏳ And It Came To Pass At That Time

Some time has passed after Hagar and Ishmael were sent away.

Abraham is still living in the region near Gerar and Beersheba.

By now, Abimelech has watched Abraham long enough to recognize that God is clearly blessing him.

⏳ Time has passed

🏕️ Abraham is still living in the region

👀 Abimelech has been watching Abraham's life

➡️ The king comes to speak with Abraham

---

### 👑 Abimelech And Phichol The Chief Captain Of His Host Spake Unto Abraham

Abimelech is the same king of Gerar from Genesis 20.

Phichol was the chief captain of his host, meaning he was the commander of Abimelech's army.

This means the king does not come alone.

He brings his military leader with him, showing that this meeting is official and serious.

👑 Abimelech is the king of Gerar

⚔️ Phichol is the commander of the army

📖 This is an official meeting

➡️ They recognize God's hand on Abraham

---

### 🙏 God Is With Thee In All That Thou Doest

Abimelech admits that God is clearly with Abraham.

He has seen Abraham's wealth, protection, growth, and favor.

Even though Abraham has made mistakes, God's blessing on his life is obvious to outsiders.

This is similar to what will later happen with Joseph, where even unbelievers can see that God is with him.

🙏 God is clearly with Abraham

👀 Abimelech can see God's blessing

📖 God's presence becomes visible to others

➡️ Abimelech asks for a covenant

---

### 🤝 Now Therefore Swear Unto Me Here By God

Abimelech asks Abraham to make a serious oath before God.

To swear means to make a solemn promise.

Abimelech knows Abraham's God is powerful, so he wants the agreement made in God's name.

🤝 Swear means make a solemn promise

🙏 Abimelech wants the oath made before God

📖 He recognizes Abraham's God is real

➡️ He asks Abraham not to betray him

---

### 🚫 That Thou Wilt Not Deal Falsely With Me

To deal falsely means to lie, deceive, betray, or act dishonestly.

This connects directly back to Genesis 20, where Abraham deceived Abimelech by saying Sarah was his sister.

Abimelech is basically saying,

**"Promise me you will not trick me or betray me again."**

🚫 Deal falsely means act dishonestly

📖 Abimelech remembers Abraham's earlier deception

🤝 He wants peace and honesty going forward

➡️ The covenant will continue through generations

---

### 👨‍👩‍👦 Nor With My Son, Nor With My Son's Son

Abimelech wants this agreement to last beyond just one generation.

He wants peace between Abraham's household and Abimelech's family line.

This is not just a short-term deal.

It is meant to protect future generations.

👨‍👩‍👦 The covenant includes future descendants

🤝 Abimelech wants lasting peace

📖 This agreement is bigger than one moment

➡️ Abimelech reminds Abraham of his kindness

---

### ❤️ According To The Kindness That I Have Done Unto Thee, Thou Shalt Do Unto Me

Abimelech reminds Abraham that he treated him kindly.

After the Sarah situation, Abimelech gave Abraham livestock, servants, silver, and permission to live in his land.

Now he asks Abraham to treat him with the same kindness.

In simple words, he is saying,

**"I have done right by you. Now promise you will do right by me."**

❤️ Abimelech reminds Abraham of his kindness

🤝 He asks for the same treatment back

📖 Peace should go both ways

➡️ The land is included too

---

### 🏕️ And To The Land Wherein Thou Hast Sojourned

Abimelech also includes the land where Abraham has been living.

Abraham is still a sojourner, meaning he is living there temporarily as a foreigner.

Abimelech had allowed Abraham to remain in his territory, and now he wants peace between Abraham's people and the people of the land.

🏕️ Abraham is living in Abimelech's territory

🚶 Sojourned means lived there temporarily

🤝 Abimelech wants peace in the land

➡️ Abraham agrees

---

### ✅ And Abraham Said, I Will Swear

Abraham agrees to the covenant.

He promises to deal honestly with Abimelech and his descendants.

This is important because Abraham is no longer acting out of fear like he did before.

Now he agrees openly and peacefully.

✅ Abraham agrees to swear

🤝 He accepts the covenant

📖 Abraham chooses peace

➡️ Abraham brings up another problem

---

### ⚠️ And Abraham Reproved Abimelech Because Of A Well Of Water

Reproved means Abraham corrected him or brought a complaint against him.

The issue was a well of water.

For shepherds, wells were extremely important.

Abraham had flocks, herds, servants, and a large household. Without water, they could not survive.

So this was not a small argument.

A well could mean life, safety, food, and the ability to remain in the land.

⚠️ Reproved means corrected or complained

💧 Wells were extremely valuable

🐑 Abraham's household needed water to survive

➡️ Abraham explains what happened

---

### 💧 Which Abimelech's Servants Had Violently Taken Away

Abimelech's servants had taken Abraham's well by force.

Violently taken away means they seized it aggressively or unfairly.

The Bible does not say they killed anyone.

It means they used force or intimidation to take control of the well.

This was a serious problem because whoever controlled the well controlled life in that area.

💧 The servants seized Abraham's well

⚠️ Violently taken means taken by force

🐑 Water rights were a major issue for shepherds

➡️ Abimelech responds

---

### 🤷 I Wot Not Who Hath Done This Thing

I wot not means "I do not know."

Abimelech says he did not know who had taken the well.

He is saying this was not done by his command.

🤷 I wot not means "I do not know"

👑 Abimelech denies knowing about it

➡️ He says Abraham never told him

---

### 🗣️ Neither Didst Thou Tell Me, Neither Yet Heard I Of It, But Today

Abimelech says Abraham had never told him about the well.

He also says he had not heard about it from anyone else until that day.

This means the problem may have been caused by Abimelech's servants without the king knowing.

Now that the covenant is being made, Abraham brings the issue into the open.

🗣️ Abimelech says he was never told

👂 He only hears about it now

⚖️ The issue is brought into the open

➡️ Abraham gives gifts

---

### 🐑 Abraham Took Sheep And Oxen, And Gave Them Unto Abimelech

Abraham gives Abimelech sheep and oxen as part of the covenant agreement.

This was a normal way to confirm peace between two parties.

The animals were not random gifts.

They helped seal the covenant and showed that both men were making a serious agreement.

🐑 Abraham gives covenant gifts

🤝 The animals help confirm the agreement

📖 Peace is being formally established

➡️ They make a covenant

---

### 🤝 And Both Of Them Made A Covenant

A covenant is a serious binding agreement.

Sometimes covenants involved cutting animals and walking between the pieces, like Genesis 15.

Here, the text does not say they cut the animals.

It simply says Abraham and Abimelech made a covenant, using gifts and witnesses to confirm the agreement.

🤝 Covenant means serious agreement

📖 This covenant establishes peace

⚖️ Both men are bound by the promise

➡️ Abraham sets apart seven lambs

---

### 🐑 Abraham Set Seven Ewe Lambs Of The Flock By Themselves

A ewe lamb is a young female sheep.

Abraham separates seven ewe lambs from the rest of the animals.

This catches Abimelech's attention because these seven lambs have a special purpose.

🐑 Ewe lamb means young female sheep

7️⃣ Abraham sets seven apart

👀 Abimelech notices something unusual

➡️ Abimelech asks what they mean

---

### ❓ What Mean These Seven Ewe Lambs Which Thou Hast Set By Themselves?

Abimelech asks Abraham why he separated the seven lambs.

He understands the sheep and oxen were part of the covenant, but the seven ewe lambs are different.

Abraham is about to use them as proof that the well belongs to him.

❓ Abimelech asks what the lambs mean

🐑 The seven lambs have a special purpose

➡️ Abraham explains

---

### 🧾 These Seven Ewe Lambs Shalt Thou Take Of My Hand

Abraham asks Abimelech to personally receive the seven lambs.

By accepting them, Abimelech is agreeing to Abraham's claim about the well.

The lambs become a public sign that Abraham dug the well and has rightful ownership of it.

🧾 Abimelech receives the lambs as evidence

🐑 The lambs confirm Abraham's claim

⚖️ The well dispute is being settled

➡️ The lambs become a witness

---

### 👀 That They May Be A Witness Unto Me

A witness is something that confirms the truth.

These seven lambs would stand as proof that Abimelech accepted Abraham's claim.

If anyone later argued over the well, Abraham could point back to this agreement.

The lambs were like a receipt, a legal marker, and a public testimony all at once.

👀 Witness means proof or testimony

🧾 The lambs confirm the agreement

📖 Everyone would know Abraham's claim was accepted

➡️ Abraham explains what the witness proves

---

### 💧 That I Have Digged This Well

Abraham is saying,

**"This well belongs to me because I dug it."**

In a dry land, digging a well was hard work and extremely valuable.

By accepting the seven lambs, Abimelech publicly recognizes that Abraham dug the well and has the right to use it.

💧 Abraham dug the well

⚖️ The well now legally belongs to Abraham

🐑 Abimelech accepts the proof

➡️ The place receives its name

---

### 🏙️ Wherefore He Called That Place Beersheba

Wherefore means therefore or because of this.

The place is called Beersheba because of the oath and the seven lambs.

The name Beersheba can mean **"well of the oath"** or **"well of seven."**

This explains why Moses already called the area Beersheba earlier when Hagar and Ishmael wandered there.

Moses is writing many years later, so he uses the name his readers would recognize, even though this event explains how the place got that name.

🏙️ Beersheba means "well of the oath" or "well of seven"

💧 The name is connected to Abraham's well

📖 Moses uses the familiar name earlier for his readers

➡️ The covenant is confirmed there

---

### 🤝 Because There They Sware Both Of Them

Sware means swore or made an oath.

Abraham and Abimelech both made promises there.

That oath is part of why the place became known as Beersheba.

🤝 Sware means swore

📖 Both men made an oath

💧 The oath is connected to the well

➡️ The covenant is completed

---

### 📜 Thus They Made A Covenant At Beersheba

The covenant is now complete.

Abraham and Abimelech have agreed to peace.

Abraham has also secured the rights to the well.

This means Abraham can safely remain in the land with water for his household and animals.

📜 The covenant is completed

🤝 Abraham and Abimelech are at peace

💧 Abraham's well is protected

➡️ Abimelech returns home

---

### 🚶 Then Abimelech Rose Up, And Phichol The Chief Captain Of His Host

After the covenant is finished, Abimelech and Phichol prepare to leave.

The king and his military commander have completed their official business with Abraham.

🚶 The meeting is over

👑 Abimelech and Phichol leave together

➡️ They return to their land

---

### 🏙️ And They Returned Into The Land Of The Philistines

Abimelech and Phichol return to the land of the Philistines.

This shows that Abraham remains in their territory peacefully.

The agreement worked.

🏙️ They return to Philistine territory

🤝 Peace has been established

📖 Abraham is allowed to remain

➡️ Abraham worships God

---

### 🌳 Abraham Planted A Grove In Beersheba

A grove is a group of trees.

Planting trees showed that Abraham intended to stay there for a while.

This is important because Abraham is still a sojourner, but now he has a protected place, a well, and peace in the land.

🌳 Grove means a group of trees

🏕️ Abraham settles there for a time

💧 Beersheba becomes an important place for him

➡️ Abraham worships

---

### 🙏 And Called There On The Name Of The Lord

Abraham worships God at Beersheba.

To call on the name of the Lord means to pray, worship, and publicly acknowledge God.

Abraham has done this throughout his journey, building altars and worshiping wherever God provides for him.

🙏 Abraham worships God

📖 He publicly honors the Lord

❤️ He remembers who protected him

➡️ God is identified by a special title

---

### ♾️ The Everlasting God

Here Abraham calls on the everlasting God.

This means God is eternal.

Kings come and go.

Cities rise and fall.

Covenants between men can last for generations.

But God Himself has no beginning and no end.

Abraham can trust Him because the God who made the promise will still be God forever.

♾️ Everlasting means eternal

🙏 God has no beginning or end

📖 Abraham trusts the God who never changes

➡️ Abraham remains in the land

---

### 🏕️ Abraham Sojourned In The Philistines' Land Many Days

Abraham continues living in the land of the Philistines for a long time.

He still does not fully own the land God promised him.

But God gives him peace, provision, and a place to live while he waits for the promise to unfold.

🏕️ Abraham lives there for many days

🚶 He remains a sojourner

💧 God provides land, peace, and water

📖 God's promise continues forward`;

export const GENESIS_TWENTY_ONE_PERSONAL_SECTIONS = parseGenesisTwentyOneRawNotes(GENESIS_TWENTY_ONE_RAW_NOTES);
