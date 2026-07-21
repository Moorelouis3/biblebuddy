export type GenesisThirtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtyTwoRawNotes(rawText: string): GenesisThirtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+32:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 32 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+32:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+32:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 32 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 32,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 32:${startVerse}` : `Genesis 32:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Genesis 32 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_TWO_RAW_NOTES = `# Genesis 32:1–5

# 📨 Jacob Sends A Message To Esau

---

## 🚶 Jacob Went On His Way

Jacob continues the journey God told him to take.

Twenty years earlier, he had fled from Canaan because Esau wanted to kill him after the blessing was given to Jacob.

During those twenty years, Jacob lived with Laban, married Leah and Rachel, built a large family, and became a wealthy man.

When Jacob finally left Haran, Laban chased him for about seven days before catching him in Gilead.

After making a covenant of peace, Laban returned home.

Now Jacob continues south toward **Canaan**, the land God promised to Abraham, Isaac, and now Jacob.

The only major problem left is Esau.

🚶 Jacob continues toward Canaan

📖 Twenty years have passed since he fled

🤝 His conflict with Laban is over

⚠️ Now he must face Esau

➡️ God encourages Jacob

---

## 👼 The Angels Of God Met Him

As Jacob travels, he is met by **God's angels**.

The Bible does not explain exactly how many there were or what they looked like.

Their appearance reminds Jacob that God has not abandoned him.

Years earlier, at Bethel, Jacob saw angels ascending and descending on the ladder.

Now, just before he must face Esau, God again allows him to see His heavenly messengers.

It is a reminder that although Jacob may feel alone, heaven is with him.

👼 God's angels meet Jacob

🙏 God reminds Jacob He is still with him

📖 This calls back to Jacob's dream at Bethel

➡️ Jacob recognizes God's protection

---

## 🏕️ This Is God's Host

The word **host** means **army**, **camp**, or **company**.

Jacob realizes these are not ordinary travelers.

This is God's heavenly army surrounding him.

Jacob is about to face his greatest earthly fear—meeting Esau again.

Before that happens, God reminds him that Heaven's army is greater than anything on earth.

🏕️ Host means army or camp

👼 Jacob recognizes God's heavenly army

🛡️ God is protecting Jacob

➡️ Jacob names the place

---

## 📍 He Called The Name Of That Place Mahanaim

**Mahanaim** means **"Two Camps."**

Jacob now sees two camps:

- 🏕️ His own camp, made up of his family, servants, and livestock.
- 👼 God's camp, made up of His angels.

The name reminds Jacob that he is not traveling alone.

Even though he cannot always see God's protection, it is there.

📍 Mahanaim means Two Camps

🏕️ Jacob has one camp

👼 God has another

🙏 God is traveling with Jacob

➡️ Jacob prepares to meet Esau

---

## 📨 Jacob Sent Messengers Before Him To Esau His Brother

Jacob knows he is getting close to Esau.

The last time they saw each other was about **twenty years earlier**, when Esau wanted to kill Jacob for taking the blessing.

Rather than suddenly appearing, Jacob wisely sends messengers ahead.

He wants to know whether Esau is still angry before bringing his entire family into danger.

These messengers would have traveled ahead of Jacob's caravan to deliver his message and return with Esau's response.

📨 Jacob sends men ahead

⏳ Twenty years have passed

⚠️ He wants to know whether Esau is still angry

➡️ The message is sent to Seir

---

## 🗺️ Unto The Land Of Seir, The Country Of Edom

**Seir** is the mountainous region where Esau settled.

It is located **south of the Dead Sea**, southeast of Canaan.

The region later became known as **Edom**.

The name **Edom** comes from Esau himself.

Earlier, after selling his birthright for the **red stew**, Esau was also called **Edom**, which means **"red."**

His descendants eventually became the nation of Edom.

🗺️ Seir is where Esau settled

📍 It is south of the Dead Sea

🔴 Edom comes from Esau's nickname

➡️ Jacob speaks humbly

---

## 🙇 Thus Shall Ye Speak Unto My Lord Esau

Jacob tells his servants to call Esau **"my lord."**

This is surprising.

Years earlier, Isaac's blessing said that **the older would serve the younger**.

Yet Jacob does not act proudly.

Instead, he humbles himself before Esau.

He is seeking peace, not trying to prove his position.

🙇 Jacob calls Esau "my lord"

❤️ He approaches with humility

🕊️ His goal is reconciliation

➡️ Jacob calls himself a servant

---

## 🤲 Thy Servant Jacob

Jacob refers to himself as **Esau's servant.**

Again, this is an act of humility.

He is lowering himself instead of demanding his rights.

Jacob is trying to remove every reason Esau might have for feeling threatened.

Rather than claiming superiority, he comes in peace.

🤲 Jacob calls himself a servant

🕊️ He lowers himself to seek peace

🙏 Humility often opens the door to reconciliation

➡️ Jacob explains where he has been

---

## 🏠 I Have Sojourned With Laban

**Sojourned** means **lived temporarily** or **stayed for a time.**

Jacob is saying,

**"Laban's house was never my permanent home."**

God had always intended for Jacob to return to Canaan.

His twenty years in Haran were temporary.

🏠 Sojourned means lived temporarily

📖 Haran was never Jacob's permanent home

➡️ Jacob explains his prosperity

---

## 🐂 I Have Oxen, Asses, Flocks, And Menservants And Womenservants

Jacob tells Esau about the wealth God has given him.

He owns:

- 🐂 Oxen
- 🫏 Donkeys
- 🐑 Large flocks
- 👨 Menservants
- 👩 Womenservants

Jacob is trying to communicate something important.

He is **not returning to take anything from Esau.**

He is already wealthy.

God has provided everything he needs.

🐂 Jacob has become wealthy

🙏 God has blessed him greatly

❤️ He is not returning to claim Esau's possessions

➡️ Jacob asks for peace

---

## 🙏 That I May Find Grace In Thy Sight

**Grace** here means **favor**, **kindness**, or **acceptance.**

Jacob is asking Esau,

**"Will you receive me peacefully?"**

He does not simply show up expecting forgiveness.

He sends word first, hoping to restore the relationship before they meet face to face.

Although God had already commanded Jacob to return, Jacob still takes practical steps toward reconciliation.

He trusts God's promise while also approaching his brother with humility and wisdom.

🙏 Grace means favor or acceptance

🕊️ Jacob asks for reconciliation

🤝 He prepares the way before arriving

➡️ Jacob waits for Esau's response

# Genesis 32:6–8

# 🛡️ Jacob Prepares To Meet Esau

---

## 🏃 The Messengers Returned To Jacob

The servants return after successfully finding Esau.

They deliver both good news and alarming news.

Yes, Esau is coming.

But he is not coming alone.

He is traveling with **four hundred men**.

The messengers do not say whether Esau's intentions are peaceful or hostile.

That uncertainty immediately fills Jacob with fear.

🏃 The messengers return from Esau

📨 Esau is coming to meet Jacob

⚠️ They do not know whether he comes in peace or for war

➡️ Four hundred men are with him

---

## ⚔️ He Cometh To Meet Thee, And Four Hundred Men With Him

In the ancient world, **four hundred men** was a large armed company.

This was not a small family visit.

It looked more like a military force.

From Jacob's perspective, this was terrifying.

Twenty years earlier, Esau had sworn to kill him.

Now the very brother he feared is approaching with hundreds of men.

Jacob has no way of knowing whether Esau is coming to welcome him—or to finish what he threatened years before.

The Bible never says Esau planned to attack.

That was Jacob's fear, not necessarily Esau's intention.

⚔️ Four hundred men looked like an army

😨 Jacob remembers Esau's threat from twenty years earlier

❓ Jacob does not know Esau's true intentions

➡️ Jacob becomes afraid

---

## 😨 Jacob Was Greatly Afraid And Distressed

Jacob's fear is completely understandable.

He has his wives.

His young children.

His servants.

His flocks.

Everything God has blessed him with is traveling together.

If Esau attacks, his entire household could be destroyed.

Even though Jacob has just seen God's angels at Mahanaim, he still struggles with fear.

This reminds us that faith and fear can exist at the same time.

Jacob believes God, but he is still human.

😨 Jacob fears for his entire family

👨‍👩‍👧‍👦 His wives and children are vulnerable

🙏 Even believers sometimes struggle with fear

➡️ Jacob makes a plan

---

## 🏕️ He Divided The People… Into Two Bands

A **band** means **a group** or **a camp**.

Jacob divides everything he owns into **two separate camps**.

One camp contains part of the family, servants, and animals.

The second camp contains the rest.

If one group is attacked, the other may have enough time to escape.

This is a practical plan to protect his family.

Earlier, Jacob had named the place **Mahanaim**, meaning **"Two Camps,"** because he saw his camp and God's camp.

Now, interestingly, Jacob literally divides **his own camp into two camps** as well.

🏕️ Band means camp or group

👨‍👩‍👧‍👦 Jacob separates his household

🛡️ He hopes at least one group survives

➡️ Jacob explains his plan

---

## 🛡️ If Esau Come To The One Company, And Smite It…

**Smite** means **to strike**, **attack**, or **kill**.

Jacob assumes the worst-case scenario.

If Esau attacks one camp, the other camp may have time to flee.

Jacob is not preparing for a celebration.

He is preparing for the possibility of war.

His plan shows both wisdom and fear.

He trusts God, but he also takes practical steps to protect those under his care.

🛡️ Smite means attack or strike

⚔️ Jacob prepares for the possibility of battle

🏃 One camp could escape if the other is attacked

🙏 Jacob combines faith with practical action

# Genesis 32:9–12

# 🙏 Jacob Prays To God

---

## 🙏 O God Of My Father Abraham, And God Of My Father Isaac

Jacob begins by calling on the God of Abraham and Isaac.

He is not praying to an unknown god.

He is praying to the same God who made the covenant with his grandfather Abraham, confirmed it to his father Isaac, and then confirmed it to Jacob at Bethel.

Jacob knows exactly who he is calling upon.

🙏 Jacob prays to the covenant God

📖 The same God of Abraham and Isaac

➡️ Jacob reminds God of His promise

---

## 📖 The Lord Which Said Unto Me, Return Unto Thy Country… And I Will Deal Well With Thee

Jacob reminds God of what He had already promised.

God Himself told Jacob to return to Canaan.

God Himself said,

**"I will be with you."**

Now Jacob is facing what appears to be a deadly situation.

Esau is approaching with four hundred men.

Jacob is essentially praying,

**"Lord, I'm here because You told me to come. I'm trusting the promise You gave me."**

This is not Jacob accusing God.

It is Jacob praying based on God's own Word.

This is actually a great example of biblical prayer.

📖 Jacob reminds God of His promise

🙏 God told Jacob to return

❤️ Jacob bases his prayer on God's Word

➡️ Jacob humbles himself

---

## 🙇 I Am Not Worthy Of The Least Of All The Mercies

Jacob begins by admitting he deserves nothing.

**Mercies** are God's kindness and compassion.

**Truth** refers to God's faithfulness in keeping His promises.

Jacob realizes everything he has—his family, wealth, protection, and blessings—came from God.

He is no longer the young man who left home with almost nothing.

Everything he has is because God has been faithful.

🙇 Jacob humbles himself

❤️ Mercies are God's kindness

📖 Truth refers to God's faithfulness

➡️ Jacob remembers where he started

---

## 🥾 With My Staff I Passed Over This Jordan, And Now I Am Become Two Bands

When Jacob first crossed the **Jordan River**, he owned almost nothing.

His **staff** was simply the walking stick he carried.

He left home alone with very few possessions.

Now, twenty years later, he returns with wives, children, servants, and enormous flocks.

**Two bands** refers to the **two camps** Jacob just divided his household into.

God had multiplied everything Jacob possessed.

This is Jacob acknowledging how much God has blessed him.

🥾 Jacob left home with only a staff

🏕️ Two bands means two camps

🙏 God multiplied everything Jacob owned

➡️ Jacob asks for deliverance

---

## 🛡️ Deliver Me… From The Hand Of My Brother

Jacob finally tells God exactly what he is afraid of.

He is afraid of Esau.

Not just uncomfortable.

Not just nervous.

He believes Esau may kill him.

Jacob fears that his wives and children could also die if Esau attacks.

After twenty years, Jacob still remembers Esau's last words before he fled.

🛡️ Jacob honestly tells God his fear

😨 He fears Esau will attack

👨‍👩‍👧‍👦 He fears for his entire family

➡️ Jacob reminds God again

---

## 🌊 Thou Saidst, I Will Surely Do Thee Good…

Jacob finishes his prayer by reminding God of another promise.

God had promised to multiply Jacob's descendants until they would become too numerous to count.

Jacob is essentially saying,

**"Lord, You promised this. If Esau kills us now, how will that promise be fulfilled?"**

This does **not** mean Jacob lacks faith.

In fact, it shows faith.

Throughout Scripture, many faithful people prayed this way.

David often reminded God of His promises.

Moses reminded God of His promises.

The prophets did the same.

Jacob is not questioning whether God can keep His Word.

He is asking God to act according to the Word He has already spoken.

This is one of the strongest prayers Jacob has prayed so far because it is built on God's promises instead of Jacob's own ideas.

🌊 Jacob reminds God of His promise

🙏 He prays according to God's Word

❤️ This is an expression of faith, not unbelief

📖 God's promises become the foundation of Jacob's prayer

# Genesis 32:13–23

# 🎁 A Present For Esau

---

## 🌙 He Lodged There That Same Night

**Lodged** means **spent the night** or **camped there.**

"**There**" refers to the place where Jacob had just prayed to God.

Instead of immediately continuing forward, Jacob spends the night making preparations for meeting Esau.

He has prayed.

Now he takes practical action.

🌙 Lodged means camped for the night

🙏 Jacob has finished praying

➡️ He prepares a gift for Esau

---

## 🎁 Took Of That Which Came To His Hand A Present For Esau

The phrase **"that which came to his hand"** means **from what he already owned.**

Jacob chooses animals from his own flocks.

A **present** means a gift.

In the ancient world, expensive gifts were often used to show respect, humility, and a desire for peace.

Jacob hopes the gift will soften Esau's heart before they meet face to face.

He is not trying to buy forgiveness.

He is trying to show honor and goodwill.

🎁 Jacob chooses gifts from his own wealth

❤️ The gift is meant to show humility

🕊️ Jacob hopes to restore peace

➡️ The gift is enormous

---

## 🐑 Two Hundred She-Goats… Twenty He-Goats… Two Hundred Ewes… Twenty Rams…

Jacob's gift is incredibly valuable.

- 🐐 **She-goats** are female goats.
- 🐐 **He-goats** are male goats.
- 🐑 **Ewes** are female sheep.
- 🐏 **Rams** are male sheep.

Notice the balance between males and females.

Jacob is not simply giving animals for food.

He is giving breeding pairs that can multiply into large flocks.

This is the kind of gift that could increase someone's wealth for years.

🐐 She-goats are female goats

🐏 Rams are male sheep

📈 The animals could multiply into much larger flocks

➡️ More valuable animals follow

---

## 🐪 Thirty Milch Camels With Their Colts

**Milch camels** are female camels that are producing milk.

**Colts** are their young offspring.

These were among the most valuable animals in the ancient world.

Camels provided transportation, milk, breeding, and carried heavy loads across long distances.

Giving thirty nursing camels with their young was an extremely generous gift.

🐪 Milch means milk-producing

👶 Colts are young camels

💰 These were very valuable animals

➡️ Jacob continues the gift

---

## 🐄 Forty Kine And Ten Bulls

**Kine** is an old English word for **cows** (female cattle).

A **bull** is an adult male cow.

Unlike **rams**, which are male sheep, bulls are male cattle.

Again, Jacob gives both females and males so the herd can continue growing.

🐄 Kine means cows

🐂 Bulls are male cattle

📈 Another breeding herd is included

➡️ More livestock follows

---

## 🫏 Twenty She-Asses And Ten Foals

A **she-ass** is a female donkey.

A **foal** is a young donkey.

Donkeys were extremely useful in Bible times.

They carried supplies, transported people, and worked as pack animals.

Like the rest of the gift, these animals added long-term value.

🫏 She-ass means female donkey

🐴 Foals are young donkeys

💼 Donkeys were valuable working animals

➡️ Jacob organizes the gift

---

## 🐑 Every Drove By Themselves

A **drove** is a group or herd of animals.

Jacob separates each herd instead of sending everything together.

This was a very wise strategy.

Esau would not see one gift.

He would see gift…

after gift…

after gift…

Each new herd would remind Esau that Jacob was honoring him.

The generosity would seem even greater because the gifts kept coming.

🐑 Drove means herd of animals

🎁 Jacob sends the gift in stages

📈 Each herd makes the gift seem even larger

➡️ Jacob instructs his servants

---

## 🗣️ They Be Thy Servant Jacob's… It Is A Present Unto My Lord Esau

Jacob tells every servant to say the same thing.

Notice his humility.

He again calls himself:

**"thy servant Jacob."**

He again calls Esau:

**"my lord."**

Jacob is trying to remove every reason for conflict.

He wants Esau to know he comes in peace.

🙇 Jacob calls himself a servant

👑 Esau is addressed as lord

🕊️ Jacob seeks reconciliation

➡️ The gifts continue one after another

---

## 🎁 The Servant Jacob Is Behind Us

Every servant repeats the same message.

This creates anticipation.

After each gift, Esau hears,

**"Jacob is still coming."**

Then another gift arrives.

Then another.

Then another.

By the time Esau finally meets Jacob, he has already received an enormous display of humility and generosity.

Jacob is intentionally allowing time for Esau's anger to cool.

🎁 The message is repeated with every herd

⏳ The gifts arrive one after another

❤️ Jacob hopes each gift softens Esau's heart

➡️ Jacob explains his plan

---

## ❤️ I Will Appease Him With The Present

**Appease** means **to calm someone's anger** or **make peace.**

**Peradventure** means **perhaps.**

Jacob says,

**"Perhaps he will accept me."**

Jacob still has no idea how Esau will respond.

He is doing everything he can to prepare for a peaceful reunion.

❤️ Appease means calm someone's anger

🙏 Peradventure means perhaps

🕊️ Jacob hopes for reconciliation

➡️ Jacob remains behind

---

## 🌙 Himself Lodged That Night In The Company

Jacob stays behind while the gifts go ahead.

The **company** refers to his own camp.

He spends one final night before meeting Esau face to face.

The gifts are now traveling ahead while Jacob waits.

🌙 Jacob remains with his family

🎁 The gifts continue ahead

➡️ Jacob moves his family

---

## 🌊 He Took His Two Wives… His Two Womenservants… His eleven Sons

That night Jacob moves his family across the stream.

At this point, only **eleven sons** have been born.

Benjamin has not yet been born.

Jacob is carefully moving everyone into position before the meeting with Esau.

👨‍👩‍👦 Jacob moves his entire family

👶 Seven sons have been born so far

➡️ They cross the Jabbok

---

## 🏞️ Passed Over The Ford Jabbok

The **Jabbok** was a river east of the Jordan River.

A **ford** is a shallow place where people and animals can safely cross a river.

Jacob leads everyone across this crossing point before remaining behind by himself.

🏞️ Jabbok is a river

🌊 A ford is a shallow crossing place

➡️ Everyone crosses safely

---

## 💧 He Sent Them Over The Brook

A **brook** is a small river or stream.

Jacob sends his wives, children, servants, animals, and possessions across first.

By the end of the night, everyone else is safely on the other side.

Only Jacob remains behind.

This sets up one of the most important events of his life in the next section, when he will be alone with God.

💧 Brook means a small river or stream

👨‍👩‍👧‍👦 Jacob sends everyone across first

🙏 Jacob is left alone before meeting God

# Genesis 32:24–27

# 🤼 Jacob Wrestles With An Angel

---

## 🌙 Jacob Was Left Alone

After sending his wives, children, servants, animals, and possessions across the **Jabbok River**, Jacob stays behind by himself.

He had already sent everyone he loved to safety.

If Esau attacked during the night or early the next morning, his family would already be on the other side.

Now, for the first time in many years, Jacob is completely alone.

Before Jacob can face Esau, God first meets Jacob.

🌙 Jacob sends his family across first

👨‍👩‍👧‍👦 Everyone else is safe on the other side

🙏 Jacob is alone with God

➡️ A mysterious man appears

---

## 🤼 There Wrestled A Man With Him Until The Breaking Of The Day

Yes, this was **literal physical wrestling**.

The Hebrew word means to grapple, struggle, or wrestle by holding onto someone.

This was not simply a dream or an inner spiritual struggle.

Jacob physically wrestled with a man throughout the night.

Later in the chapter—and in Hosea 12:3–5—we learn this "man" is the **Angel of the LORD**, a visible appearance of God.

The wrestling also pictures Jacob's entire life.

His life had been one long struggle:

- 👶 Struggling with Esau before birth.
- 🥣 Struggling over the birthright.
- 🎭 Deceiving Isaac for the blessing.
- 🤝 Struggling with Laban for twenty years.
- ⚔️ Now preparing to face Esau.

Before Jacob enters the Promised Land again, God deals with Jacob personally.

🤼 This was literal wrestling

🌙 The struggle lasted all night

🙏 The "man" is the Angel of the LORD

➡️ The wrestling reaches its climax

---

## 🦵 He Touched The Hollow Of His Thigh

The **hollow of the thigh** refers to the **hip socket**.

The Angel does not overpower Jacob through wrestling.

Instead, He simply **touches** Jacob's hip.

Immediately, Jacob's hip is injured.

This shows something important.

God could have ended the wrestling instantly at any moment.

He allowed the struggle to continue because He was teaching Jacob something.

🦵 The hollow of the thigh is the hip socket

👆 The Angel simply touches Jacob

💪 God's power is effortless

➡️ Jacob's hip is injured

---

## 🩹 The Hollow Of Jacob's Thigh Was Out Of Joint

**Out of joint** means the hip was **dislocated**.

Jacob could no longer wrestle using his own strength.

For the rest of his life, Jacob would walk with a limp.

The limp became a permanent reminder that his strength alone could never accomplish God's plan.

From this point forward, Jacob would have to depend on God instead of himself.

🩹 Jacob's hip is dislocated

🚶 Jacob walks with a limp afterward

🙏 God teaches Jacob dependence

➡️ The Angel tells Jacob to let go

---

## 🌅 Let Me Go, For The Day Breaketh

The **Angel** is the one speaking here.

He says,

**"Let Me go, because dawn is breaking."**

This does **not** mean the Angel is unable to leave.

God is not trapped by Jacob.

Instead, the Angel is giving Jacob an opportunity to respond.

Jacob realizes he is wrestling with someone far greater than an ordinary man.

🌅 The Angel speaks

🙏 God is in complete control

➡️ Jacob refuses to let go

---

## 🙏 I Will Not Let Thee Go, Except Thou Bless Me

Now **Jacob** is speaking.

Earlier in life, Jacob tried to obtain blessings through deception.

Now he asks directly.

He knows only God can truly bless him.

Jacob is no longer wrestling simply to win a fight.

He is clinging to God because he knows he desperately needs His blessing before facing Esau.

This is one of the biggest turning points in Jacob's life.

🙏 Jacob is the one speaking

❤️ He desperately seeks God's blessing

📖 He now depends on God instead of deception

➡️ The Angel asks Jacob a question

---

## ❓What Is Thy Name?

The **Angel** asks,

**"What is your name?"**

Of course, God already knows Jacob's name.

The question is meant for Jacob.

The name **Jacob** means **"heel-grabber"** and came to describe someone who **grasps, supplants, or deceives**.

Years earlier, Jacob lied about who he was when he stood before his blind father Isaac.

Now, standing before God, Jacob tells the truth.

He simply answers,

**"Jacob."**

In a sense, he is admitting,

**"This is who I have been."**

God is preparing to give him a new name—and a new identity.

❓ The Angel asks Jacob's name

📖 God already knows the answer

❤️ Jacob honestly admits who he is

➡️ God prepares to change Jacob forever

# Genesis 32:28–32

# 👑 God Changes Jacob's Name

---

## 👑 Thy Name Shall Be Called No More Jacob, But Israel

God gives Jacob a new name.

**Jacob** means **heel-grabber**, and over time it came to describe someone who grasped, deceived, and relied on his own plans to get ahead.

For years, Jacob lived up to that name.

He deceived Esau.

He deceived Isaac.

Then, for the next twenty years, God allowed Jacob to experience what it felt like to be on the other side.

Laban deceived him with Leah.

Laban changed his wages ten times.

Laban constantly manipulated him.

God was not simply punishing Jacob.

He was shaping him.

Now, after years of growth and one final night of wrestling with God, Jacob is no longer the same man.

His identity is changing.

This is more than a new name.

It marks the beginning of a new life.

👑 Jacob's old identity is left behind

📖 God used twenty years to shape his character

❤️ Israel marks a new beginning

➡️ God explains the new name

---

## 💪 For As A Prince Hast Thou Power With God And With Men, And Hast Prevailed

The name **Israel** is commonly understood to mean **"He struggles with God,"** **"God prevails,"** or **"Prince with God."**

The point is not that Jacob defeated God.

No human can do that.

Rather, Jacob persevered.

He held on to God in faith and refused to let go until he received God's blessing.

Throughout his life, Jacob struggled with people—Esau, Isaac, Laban—and now he has struggled with God.

But instead of relying on deception, he clung to God.

That is the victory.

💪 Israel points to a new relationship with God

🙏 Jacob prevailed by trusting God

❤️ His greatest victory was surrender

➡️ Jacob asks God's name

---

## ❓Tell Me, I Pray Thee, Thy Name

Jacob now asks the Man,

**"What is Your name?"**

He realizes he has been wrestling with someone far greater than an ordinary man.

The Angel does not answer directly.

Instead He asks,

**"Why do you ask My name?"**

Throughout the Old Testament, when God chooses not to reveal His name fully, it reminds people that His identity is far greater than they can fully understand.

Jacob already knows everything he needs to know.

He knows he has encountered God.

Instead of answering the question, God blesses him.

❓ Jacob wants to know who he wrestled

🙏 God does not reveal more than Jacob needs

❤️ God responds with a blessing

➡️ Jacob names the place

---

## 🌅 Jacob Called The Name Of The Place Peniel

**Peniel** means **"Face of God."**

Jacob says,

**"I have seen God face to face, and my life is preserved."**

Jacob understands that the Man he wrestled was no ordinary man.

He had encountered God in a visible form.

What amazes Jacob is not simply that he saw God.

It is that he survived.

Throughout Scripture, God's holiness is so overwhelming that people often feared seeing Him would mean death.

Instead, Jacob receives mercy.

🌅 Peniel means Face of God

🙏 Jacob realizes he encountered God

❤️ God spared his life

➡️ Jacob leaves changed forever

---

## 🦵 The Sun Rose Upon Him, And He Halted Upon His Thigh

As morning arrives, Jacob continues his journey.

But now he walks differently.

**Halted** means **he limped**.

Every step reminded Jacob of what happened that night.

Years earlier, Jacob walked away from home depending on his own cleverness.

Now he walks toward Esau depending on God.

His limp becomes a lifelong reminder that God's strength is made perfect in human weakness.

🌅 A new day begins

🦵 Jacob walks with a permanent limp

🙏 His weakness reminds him to depend on God

➡️ Israel remembers this event

---

## 🥩 Therefore The Children Of Israel Eat Not Of The Sinew Which Shrank

**Sinew** is a **tendon**, the strong tissue that connects muscle to bone.

The **sinew which shrank** refers to the tendon near the hip that was affected when God touched Jacob's thigh.

Because of this event, the Israelites developed the custom of not eating that particular tendon from an animal.

This was not part of the Law of Moses yet.

It became a long-standing tradition that reminded God's people of the night Jacob became Israel.

Every time they avoided that tendon, they remembered how God transformed the father of their nation.

🥩 Sinew means tendon

🦵 It refers to the tendon near Jacob's injured hip

📖 The custom reminded Israel of the night God changed Jacob's life`;

export const GENESIS_THIRTY_TWO_PERSONAL_SECTIONS = parseGenesisThirtyTwoRawNotes(GENESIS_THIRTY_TWO_RAW_NOTES);
