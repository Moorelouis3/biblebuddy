export type GenesisTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisTwentyTwoRawNotes(rawText: string): GenesisTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const sectionMatch = lines[index].trim().match(
      /^#\s*(?:\*\*)?(.*?Genesis\s+22:(\d+)(?:[-–—]|â€“|â€”)?(\d+)?)\s*(?:\*\*)?\s*$/i,
    );

    if (!sectionMatch) {
      index += 1;
      continue;
    }

    const icon = sectionMatch[1].replace(/Genesis\s+22:.+$/i, "").replace(/\*\*/g, "").trim();
    const startVerse = Number(sectionMatch[2]);
    const endVerse = Number(sectionMatch[3] || sectionMatch[2]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const sectionTitleMatch =
      lines[index]?.trim().match(/^#+\s*(?:\*\*)?(.+?)(?:\*\*)?$/) || lines[index]?.trim().match(/^\*\*(.+?)\*\*$/);
    if (!sectionTitleMatch) {
      throw new Error("Missing Genesis 22 section title after verse " + startVerse);
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
        throw new Error("Missing Genesis 22 explanation for " + phraseTitle);
      }

      phrases.push([phraseTitle, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference:
        startVerse === endVerse
          ? "Genesis 22:" + startVerse
          : "Genesis 22:" + startVerse + "-" + endVerse,
      title,
      icon,
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Genesis 22 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_TWENTY_TWO_RAW_NOTES = `# Genesis 22:1–8

## 🐑 Isaac Becomes The Sacrifice

### ⏳ And It Came To Pass After These Things

Some years have passed since Abraham made the covenant with Abimelech at Beersheba.

Isaac is no longer a baby.

By this point, he is old enough to travel for several days, carry a large load of wood up a mountain, and have a thoughtful conversation with his father.

Abraham has now settled into life.

God has fulfilled many of His promises.

He has wealth, peace, land to live in, and the son he waited decades to receive.

Then God speaks again.

⏳ Several years have passed

👦 Isaac is now a young man

🙏 Abraham has enjoyed God's blessings

➡️ God gives Abraham one final test

---

### 🧪 God Did Tempt Abraham

Here, **tempt** does **not** mean God was tempting Abraham to sin.

It means **God tested Abraham**.

God already knew Abraham's heart.

The purpose of the test was to reveal Abraham's faith through his obedience.

This would become the greatest test Abraham would ever face.

🧪 Tempt means test

🙏 God never tempts people to sin

❤️ God is revealing Abraham's faith

➡️ God calls Abraham

---

### 🗣️ Abraham

God simply calls Abraham by name.

Just as He has done throughout Abraham's life, God begins with a personal call before giving new instructions.

🗣️ God calls Abraham personally

❤️ God still speaks to him

➡️ Abraham responds immediately

---

### 🙋 Behold, Here I Am

Abraham answers immediately.

"Here I am" means,

**"I am listening."**

**"I am ready."**

**"I am available."**

This shows Abraham's willingness to hear whatever God is about to say, even though he has no idea what is coming.

🙋 Abraham is ready to listen

🙏 He makes himself available to God

➡️ God gives an unexpected command

---

### 👦 Take Now Thy Son

God's command begins gently.

He tells Abraham to take his son.

At this point Abraham already knows something serious is coming.

👦 God begins with Isaac

❤️ The focus is on Abraham's son

➡️ God describes which son

---

### ❤️ Thine Only Son Isaac, Whom Thou Lovest

God is referring to Isaac as Abraham's **only son** because Isaac is now the only son living with Abraham and the only son through whom God's covenant will continue.

Ishmael has already left and is living in the wilderness.

God also says,

**"Whom thou lovest."**

The Bible openly tells us how deeply Abraham loved Isaac.

Years have passed since Isaac's birth.

Abraham has poured his love, time, teaching, and attention into him.

Lot is gone.

Ishmael is gone.

Isaac has become the center of Abraham's household and the child through whom every promise of God is supposed to come.

This command strikes directly at the deepest love in Abraham's heart.

❤️ Isaac is Abraham's beloved son

👦 Ishmael is no longer living with Abraham

💔 God asks for what Abraham loves most

➡️ God tells Abraham where to go

---

### 🏔️ Get Thee Into The Land Of Moriah

God tells Abraham to travel to the land of **Moriah**.

Moriah is about a **three-day journey north from Beersheba**, roughly **45–50 miles (70–80 km)**.

Centuries later, this same region would become the location of **Jerusalem**, where Solomon would build the Temple.

The place where Abraham is tested would eventually become one of the holiest places in Israel's history.

🏔️ Moriah is about three days from Beersheba

📍 It later becomes the area of Jerusalem

📖 God is leading Abraham to a significant place

➡️ God gives an impossible command

---

### 🔥 Offer Him There For A Burnt Offering

A **burnt offering** was a sacrifice completely given to God.

Normally, people offered animals from their flocks—the very best they had.

Now God tells Abraham to offer **Isaac**.

To Abraham, this command must have seemed impossible.

Isaac was not only his beloved son.

Isaac was the son through whom God had promised to build a great nation.

Abraham had waited decades for Isaac.

Now God appears to ask for him back.

Although Abraham could not understand it, he had already learned that God always keeps His promises, even when His commands seem impossible.

🔥 A burnt offering was completely given to God

🐑 Normally an animal was sacrificed

💔 God asks Abraham for what he treasures most

➡️ God will reveal the exact mountain

---

### ⛰️ Upon One Of The Mountains Which I Will Tell Thee Of

God does not immediately tell Abraham which mountain.

He simply tells him to begin the journey.

As Abraham obeys, God will continue directing him.

This is another reminder that God often reveals His plan one step at a time.

⛰️ God gives directions one step at a time

🙏 Abraham must trust while traveling

➡️ Abraham obeys immediately

---

### 🌅 Abraham Rose Up Early In The Morning

This phrase appears many times in Abraham's life.

Whenever God gives him instructions, Abraham responds without delay.

Even though this command must have broken his heart, he obeys immediately.

🌅 Abraham obeys without delay

🙏 Faith responds quickly

➡️ Abraham prepares for the journey

---

### 🫏 Saddled His Ass

An **ass** is a donkey.

To **saddle** the donkey means preparing it for the journey by placing equipment and supplies on it.

Everything needed for the trip is made ready.

🫏 Ass means donkey

🎒 Saddled means prepared it for travel

➡️ Abraham chooses his companions

---

### 👨‍🌾 Took Two Of His Young Men With Him, And Isaac His Son

Abraham takes two trusted servants and Isaac.

The servants will travel with them, but they will not accompany Abraham to the place of sacrifice.

Only Abraham and Isaac will continue to the mountain.

👨‍🌾 Two servants accompany Abraham

👦 Isaac travels with his father

➡️ Abraham prepares the sacrifice

---

### 🪵 And Clave The Wood For The Burnt Offering

**Clave** means **split** or **cut**.

Abraham personally prepares the wood that will later be used for the burnt offering.

Every swing of the axe would have reminded him of what God had commanded.

🪵 Clave means split or cut

🔥 Abraham prepares the wood himself

💔 Every step requires faith

➡️ They begin traveling

---

### 🚶 And Went Unto The Place Of Which God Had Told Him

Abraham begins the journey exactly as God commanded.

He does not argue.

He does not negotiate.

He simply obeys.

🚶 Abraham obeys God's command

🙏 Faith moves forward

➡️ Three days pass

---

### 🌄 Then On The Third Day Abraham Lifted Up His Eyes

The third day refers to **three days after leaving Beersheba**.

After traveling for three days, Abraham finally sees the mountain in the distance.

Those three days must have been some of the longest days of Abraham's life.

Every step brought him closer to what he believed would be the sacrifice of his beloved son.

Isaac likely had no idea what awaited him.

Abraham carried the burden alone.

🌄 Three days have passed

👀 Abraham finally sees the mountain

💔 Abraham has carried this burden in silence

➡️ Abraham speaks to the servants

---

### 🫏 Abide Ye Here With The Ass

**Abide** means **stay** or **remain**.

Abraham tells the two servants to stay behind with the donkey while he and Isaac continue alone.

🫏 Abide means stay here

👨‍🌾 The servants remain behind

➡️ Abraham and Isaac continue together

---

### ⛰️ I And The Lad Will Go Yonder, And Worship, And Come Again To You

**Yonder** simply means **over there**.

Notice that Abraham says,

**"We will come again to you."**

He does not say,

"I will come back."

Hebrews 11 later explains why.

Abraham believed that if God required Isaac's life, then God was able to raise him from the dead because God's promise could not fail.

Abraham still believed both of them would return.

⛰️ Yonder means over there

🙏 Abraham believes God's promise

❤️ He expects both of them to return

➡️ Isaac carries the wood

---

### 🪵 Abraham Took The Wood Of The Burnt Offering, And Laid It Upon Isaac His Son

Abraham places the wood on Isaac's shoulders.

Isaac carries the very wood that is meant for the sacrifice.

Many Christians see this as a picture pointing forward to Jesus carrying His own cross many centuries later.

🪵 Isaac carries the wood

📖 This foreshadows Christ carrying the cross

➡️ Abraham carries the rest

---

### 🔥 He Took The Fire In His Hand, And A Knife

Abraham carries the fire and the knife.

Isaac carries the wood.

Together they have everything needed for a burnt offering—except the sacrifice.

🔥 Abraham carries the fire

🔪 Abraham carries the knife

➡️ Father and son walk together

---

### 🚶 They Went Both Of Them Together

The Bible repeats this phrase to emphasize the unity between father and son.

Isaac willingly walks beside Abraham, completely trusting him.

🚶 Father and son walk together

❤️ Isaac trusts Abraham

➡️ Isaac asks a question

---

### 👦 My Father

As they climb the mountain, Isaac speaks.

He simply says,

"My father."

The conversation that follows becomes one of the most emotional moments in Genesis.

👦 Isaac speaks to Abraham

❤️ Father and son continue together

➡️ Abraham answers

---

### 🙋 Here I Am, My Son

Abraham lovingly answers Isaac.

Even while carrying the weight of God's command, he responds with tenderness.

🙋 Abraham answers lovingly

❤️ His love for Isaac is obvious

➡️ Isaac notices something

---

### ❓ Behold The Fire And The Wood, But Where Is The Lamb For A Burnt Offering?

Isaac has participated in sacrifices before.

He knows what is missing.

They have the fire.

They have the wood.

But there is no animal.

His question is completely innocent, yet it cuts directly into Abraham's heart.

❓ Isaac notices the missing sacrifice

🐑 He understands how sacrifices work

💔 His question deepens Abraham's test

➡️ Abraham answers in faith

---

### 🐑 My Son, God Will Provide Himself A Lamb For A Burnt Offering

This is one of Abraham's greatest statements of faith.

He does not know how God will solve the problem.

But he knows God will provide.

Abraham trusts God's promise even when he cannot understand God's command.

Centuries later, many Christians also see these words pointing forward to Jesus Christ—the Lamb whom God Himself would ultimately provide.

🐑 Abraham trusts God to provide

🙏 Faith believes before seeing

📖 God always keeps His promises

➡️ They continue together

---

### 🚶 So They Went Both Of Them Together

Father and son continue climbing the mountain together.

Abraham still trusts God.

Isaac still trusts his father.

Neither knows exactly how God will fulfill His promise, but they continue walking in faith.

🚶 They continue together

🙏 Abraham continues trusting God

❤️ The greatest test is about to reach its climax

---

# Genesis 22:9–14

## 🐏 God Provides A Substitute

### ⛰️ And They Came To The Place Which God Had Told Him Of

After traveling for **three days from Beersheba**, Abraham and Isaac finally arrive at the mountain God had chosen in the land of Moriah.

Every step of the journey had given Abraham time to think about what God had asked him to do.

Isaac still does not know that he is the sacrifice.

⛰️ Abraham and Isaac arrive after a three-day journey

📍 God had chosen this exact mountain

💔 Abraham has carried this burden the entire trip

➡️ Abraham builds an altar

---

### 🪨 And Abraham Built An Altar There

An altar was a place of worship and sacrifice.

Abraham gathers stones and builds the altar just as he had done many times before.

Isaac likely helped his father gather the stones and prepare everything, still believing they were waiting for God to provide the sacrifice.

🪨 Abraham builds an altar for worship

🤝 Isaac likely helps prepare it

🙏 Everything is ready except the sacrifice

➡️ Abraham prepares the wood

---

### 🪵 And Laid The Wood In Order

"Laid the wood in order" means Abraham carefully arranged the wood so the sacrifice could be placed on top.

Nothing is rushed.

Every piece is placed where it belongs.

With each step, Abraham moves closer to obeying what God had asked him to do.

🪵 Abraham carefully arranges the wood

🙏 Everything is prepared for the sacrifice

💔 Every step requires faith

➡️ Abraham binds Isaac

---

### 🤲 And Bound Isaac His Son, And Laid Him On The Altar Upon The Wood

Abraham gently ties Isaac and places him on top of the wood.

The Bible never says Isaac fought his father.

By this point, Isaac is likely strong enough that he could have resisted if he wanted to.

Instead, both father and son demonstrate remarkable trust.

For Abraham, this is the hardest moment of his life.

He has already watched Lot choose Sodom.

He painfully sent Ishmael away years earlier.

Now the son God promised him is lying on the altar.

Everything God promised seems to rest on Isaac, yet Abraham chooses to obey God anyway.

🤲 Abraham binds Isaac

❤️ Isaac appears to willingly trust his father

💔 Abraham faces the greatest test of his life

➡️ Abraham prepares to obey

---

### 🔪 And Abraham Stretched Forth His Hand, And Took The Knife To Slay His Son

Abraham reaches out and takes the knife.

He is no longer deciding whether he will obey.

His decision has already been made.

He is fully committed to carrying out God's command.

At the very last moment, heaven interrupts.

🔪 Abraham is ready to obey

🙏 His faith is complete

⚠️ Heaven intervenes at the final moment

➡️ The angel calls

---

### 👼 And The Angel Of The Lord Called Unto Him Out Of Heaven

The Angel of the Lord calls out from heaven before Abraham can harm Isaac.

This may be the same Angel of the Lord who previously appeared to Hagar in the wilderness, although the passage does not explicitly say so.

God stops Abraham at exactly the right moment.

👼 The Angel calls from heaven

⏱️ God intervenes at the final second

🙏 Isaac is spared

➡️ Abraham answers

---

### 🗣️ Abraham, Abraham

The Angel repeats Abraham's name to urgently stop him.

The repetition shows the importance and urgency of the moment.

God does not wait another second.

🗣️ Abraham's name is called twice

⏱️ The command is urgent

➡️ Abraham immediately responds

---

### 🙋 Here I Am

Abraham immediately answers,

**"Here I am."**

Even in the middle of the greatest test of his life, Abraham is still listening for God's voice.

🙋 Abraham immediately responds

🙏 He is still listening to God

➡️ God stops the sacrifice

---

### ✋ Lay Not Thine Hand Upon The Lad, Neither Do Thou Anything Unto Him

The Angel tells Abraham to stop.

Isaac is not to be harmed.

God never intended for Isaac to die.

The test is now complete.

Isaac's life is spared.

✋ God stops Abraham

❤️ Isaac is completely spared

🧪 The test has ended

➡️ God explains why

---

### 🙏 For Now I Know That Thou Fearest God

To **fear God** means to honor Him, trust Him, and obey Him above everything else.

God is not saying He learned new information.

Rather, Abraham's faith has now been demonstrated through his actions.

God had promised Abraham a nation through Isaac.

Yet Abraham trusted God enough to obey even when he could not understand how the promise would continue.

Before giving Abraham the responsibility of becoming the father of many nations, God revealed the depth of Abraham's obedience.

🙏 Fear means reverence, trust, and obedience

❤️ Abraham's faith has now been demonstrated

📖 Abraham trusted God's promise above his own understanding

➡️ Abraham withheld nothing

---

### ❤️ Seeing Thou Hast Not Withheld Thy Son, Thine Only Son From Me

Abraham was willing to give God the most valuable thing he possessed.

He did not place God's gift above God Himself.

This shows that Abraham loved and trusted God more than even the promised son through whom every blessing would come.

❤️ Abraham withheld nothing from God

🙏 God remained first in Abraham's life

📖 Faith places God above every blessing

➡️ God provides the sacrifice

---

### 🐏 Abraham Lifted Up His Eyes…And Behold Behind Him A Ram

At the exact moment the test ends, Abraham sees a ram.

A **ram** is a full-grown male sheep.

It was considered a valuable sacrifice because it was mature and costly.

God does not cancel the sacrifice altogether.

Instead, He provides another sacrifice to take Isaac's place.

This becomes one of the clearest pictures in Genesis of **a substitute**—one life given in place of another.

🐏 A ram is a mature male sheep

🎁 God provides the sacrifice

📖 The ram takes Isaac's place

➡️ The ram cannot escape

---

### 🌿 Caught In A Thicket By His Horns

A **thicket** is a thick bush or tangled group of branches.

The ram's horns are caught in the bushes, preventing it from running away.

This is no accident.

God provides the sacrifice at exactly the right place and exactly the right time.

🌿 A thicket is a dense bush

🐏 The ram cannot escape

🙏 God perfectly provides what is needed

➡️ Abraham offers the ram

---

### 🔥 Abraham Went And Took The Ram, And Offered Him Up For A Burnt Offering Instead Of His Son

Abraham offers the ram in Isaac's place.

The sacrifice still happens.

But now the ram dies instead of Isaac.

This points to one of the Bible's greatest themes:

God provides a substitute.

🔥 The sacrifice is completed

🐏 The ram dies in Isaac's place

❤️ Isaac is spared because God provides another sacrifice

➡️ Abraham names the place

---

### 📖 Abraham Called The Name Of That Place Jehovah-Jireh

**Jehovah-Jireh** means,

**"The Lord Will Provide."**

Abraham names the place after what God had done.

Throughout Abraham's journey, he has built altars and named significant places where God revealed Himself or fulfilled a promise.

Now he gives this mountain a name that reminds future generations that God provides exactly what His people need.

📖 Jehovah-Jireh means "The Lord Will Provide"

🙏 Abraham remembers God's provision

📍 The place becomes a lasting reminder of God's faithfulness

➡️ A saying continues through the generations

---

### ⛰️ In The Mount Of The Lord It Shall Be Seen

This became a well-known saying among God's people.

It means that on God's mountain, **the Lord provides**.

When God's people arrive at the place He leads them, they discover that He has already prepared what they need.

For Abraham, God provided a ram.

For future generations, this mountain would later become connected with Jerusalem, where the Temple was built and sacrifices were continually offered to God.

⛰️ God's provision is seen on His mountain

🙏 God provides exactly what is needed

📖 Jehovah-Jireh becomes a lasting testimony of God's faithfulness

---

# Genesis 22:15–19

## 🌟 Abraham Is Blessed

### 👼 And The Angel Of The Lord Called Unto Abraham Out Of Heaven The Second Time

After Isaac is safely off the altar and the ram has been offered, the Angel of the Lord speaks to Abraham again.

The test is over.

Now God explains why Abraham was tested and repeats His covenant with even greater certainty.

👼 The Angel speaks a second time

✅ The test is complete

🙏 God now confirms His promises

➡️ God makes an oath

---

### 📜 By Myself Have I Sworn, Saith The Lord

Normally, people swear an oath by someone greater than themselves.

But there is no one greater than God.

So God swears **by Himself**.

This is God's way of saying,

**"My promise is absolutely certain because it rests on My own character."**

**Saith the Lord** simply means,

**"The Lord says."**

📜 God swears by Himself because no one is greater

🙏 His promise cannot fail

🗣️ "Saith the Lord" means "the Lord says"

➡️ God explains why

---

### ❤️ Because Thou Hast Done This Thing

The "thing" God is talking about is Abraham's willingness to obey by offering Isaac.

Abraham trusted God even when he did not understand God's command.

He did not hold anything back from the Lord.

❤️ Abraham obeyed God's command

🙏 He trusted God above his own understanding

➡️ Abraham withheld nothing

---

### 👦 And Hast Not Withheld Thy Son, Thine Only Son

Abraham proved that he loved God more than even the greatest blessing God had given him.

Isaac was the promised son.

Yet Abraham was willing to place God's will above his own desires.

This is what the test revealed.

👦 Isaac was Abraham's greatest earthly treasure

❤️ Abraham placed God first

🙏 True faith obeys even when it is difficult

➡️ God repeats His blessing

---

### 🌿 That In Blessing I Will Bless Thee

This is not a brand-new promise.

God is reaffirming everything He has already promised Abraham.

Because Abraham has demonstrated his faith, God now confirms His covenant with an oath.

The promise is no longer simply spoken.

It has now been guaranteed by God's own word.

🌿 God confirms His covenant

📜 The promise is guaranteed by God's oath

🙏 God's promises never fail

➡️ God speaks about Abraham's descendants

---

### ⭐ In Multiplying I Will Multiply Thy Seed As The Stars Of Heaven, And As The Sand Which Is Upon The Seashore

This is a poetic picture of an enormous number of descendants.

The point is not to count the stars or grains of sand.

The point is that Abraham's descendants will become far too numerous to count.

Physically, this promise is fulfilled through the nation of Israel.

Spiritually, the New Testament teaches that all who place their faith in Christ become Abraham's spiritual children by faith.

Today, that number reaches into the billions.

⭐ Stars and sand picture an uncountable number

🇮🇱 Israel fulfills the physical promise

✝️ Believers in Christ become Abraham's spiritual family by faith

➡️ Abraham's descendants will have victory

---

### 🚪 Thy Seed Shall Possess The Gate Of His Enemies

In ancient cities, the **gate** was the place of strength, authority, and leadership.

To possess the gate of your enemies means to overcome them and gain victory over them.

God is promising that Abraham's descendants will triumph over those who oppose them.

🚪 The city gate represents authority and strength

⚔️ Abraham's descendants will overcome their enemies

🙏 God promises victory

➡️ All nations will be blessed

---

### 🌍 In Thy Seed Shall All The Nations Of The Earth Be Blessed

This promise reaches far beyond Israel.

Ultimately, it points to Jesus Christ.

Jesus was born through Abraham's family line.

Because of Jesus, salvation is offered to every nation, tribe, and people.

Through Abraham's descendant, the entire world receives the opportunity to know God.

🌍 The promise ultimately points to Jesus Christ

✝️ Salvation is offered to every nation

🙏 God's blessing extends to the whole world

➡️ The reason is given

---

### 🙏 Because Thou Hast Obeyed My Voice

Abraham's obedience did not earn God's promise.

God had already made the covenant years earlier.

But Abraham's obedience demonstrated that his faith was genuine.

Faith and obedience now worked together.

🙏 Abraham's obedience revealed his faith

❤️ True faith trusts God enough to obey

📖 God's covenant is confirmed

➡️ Abraham returns home

---

### 🚶 Abraham Returned Unto His Young Men

Abraham and Isaac come back down the mountain together.

The servants had been waiting exactly where Abraham left them.

The sacrifice is over.

Isaac is alive.

God has provided.

Although the Bible says very little about their conversation, it must have been one neither of them would ever forget.

🚶 Abraham and Isaac return together

❤️ Isaac has been spared

🙏 God's provision has been revealed

➡️ They return home

---

### 🏡 They Rose Up And Went Together To Beersheba

The entire group leaves Moriah and travels back to Beersheba.

The journey home would have taken about three days, just as the journey there had.

But this time, Abraham walks home with a much deeper understanding of God's faithfulness.

🏡 Abraham returns to Beersheba

🚶 The return journey takes about three days

🙏 Abraham has seen God provide firsthand

➡️ Abraham remains in Beersheba

---

### 🏕️ Abraham Dwelt At Beersheba

Abraham settles once again in Beersheba.

His greatest test is over.

God's covenant has been reaffirmed.

Isaac has been spared.

And Abraham now knows by experience what he declared on the mountain:

**"The Lord Will Provide."**

🏕️ Abraham continues living in Beersheba

📜 God's covenant has been confirmed

🙏 Jehovah-Jireh—The Lord will provide—has become Abraham's testimony

---

# Genesis 22:20–24

## 👨‍👩‍👧 Nahor's Descendants

### ⏳ And It Came To Pass After These Things

Some time has passed after Abraham returned from Mount Moriah.

Moses uses this phrase often to move the story forward without telling us exactly how much time has passed.

Now the focus briefly shifts away from Abraham to his brother's family.

⏳ Time has passed

📖 Moses moves the story forward

➡️ News reaches Abraham

---

### 🏡 It Was Told Abraham, Saying, Behold, Milcah Also Hath Born Children Unto Thy Brother Nahor

Someone brings Abraham news about his family back in Mesopotamia.

**Milcah** was Nahor's wife.

Nahor was Abraham's younger brother who stayed behind in **Haran** when Abraham left for Canaan (Genesis 11).

The Bible now updates Abraham on how his brother's family has grown over the years.

This family list is important because it introduces **Rebekah**, who will later become Isaac's wife.

🏡 Milcah is Nahor's wife

👨 Nahor is Abraham's younger brother

📍 Nahor remained in Haran while Abraham went to Canaan

➡️ Their family has grown

---

### 👨‍👩‍👧 The Sons Of Nahor And Milcah

Nahor and Milcah have **eight sons** together.

Moses lists them in order because one of their descendants will become very important later in Genesis.

Their sons are:

- **Uz** – Nahor's firstborn son.
- **Buz** – Nahor's second son.
- **Kemuel** – Nahor's third son. The Bible says Kemuel became the father of **Aram**, beginning another branch of the family.
- **Chesed**
- **Hazo**
- **Pildash**
- **Jidlaph**
- **Bethuel**

Although several of these names are never mentioned again, **Bethuel** becomes extremely important because he is the father of Rebekah.

👨 Nahor and Milcah have eight sons

📖 Moses records the family line

⭐ Bethuel becomes the key name to remember

➡️ Bethuel has a daughter

---

### 👰 Bethuel Begat Rebekah

This is the reason Moses includes the entire genealogy.

**Rebekah** will later become **Isaac's wife**.

She will leave Haran, marry Isaac, and become the mother of **Jacob and Esau**.

Jacob will later become Israel and have the **twelve sons** who become the twelve tribes of Israel.

Although Rebekah is only mentioned briefly here, she will soon become one of the most important women in Genesis.

👰 Rebekah is Bethuel's daughter

💍 She will become Isaac's wife

👶 She will become the mother of Jacob and Esau

🇮🇱 Through Jacob come the twelve tribes of Israel

➡️ Moses summarizes the family

---

### 👨‍👩‍👧 These Eight Milcah Did Bear To Nahor, Abraham's Brother

Moses summarizes the genealogy.

Milcah gave Nahor eight sons.

This reminds the reader that while God is building Abraham's family in Canaan, Abraham's relatives are also growing into a large family back in Haran.

👨‍👩‍👧 Milcah bears Nahor eight sons

📖 Both family lines continue to grow

➡️ Nahor also has children through another woman

---

### 👩 His Concubine, Whose Name Was Reumah

A **concubine** was a secondary wife.

She had a recognized relationship with the man but did not have the same status or inheritance rights as the primary wife.

Nahor's concubine was named **Reumah**.

Just like Abraham had Hagar, Nahor also had children through a concubine.

👩 Reumah is Nahor's concubine

📖 A concubine had lower status than a wife

➡️ She also has children

---

### 👶 Reumah Bare Also Tebah, Gaham, Tahash, And Maachah

Reumah gave Nahor **four additional sons**:

- Tebah
- Gaham
- Tahash
- Maachah

The Bible does not tell us much about these men.

They are recorded to complete Nahor's family genealogy, but unlike Rebekah's line, they do not play a major role in the Genesis narrative.

👶 Reumah has four sons

📖 Their names complete Nahor's family record

⭐ The main purpose of this genealogy is to introduce Rebekah`;

export const GENESIS_TWENTY_TWO_PERSONAL_SECTIONS = parseGenesisTwentyTwoRawNotes(GENESIS_TWENTY_TWO_RAW_NOTES);
