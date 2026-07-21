export type GenesisTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisTwentySixRawNotes(rawText: string): GenesisTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 26:${startVerse}` : `Genesis 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Genesis 26 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_TWENTY_SIX_RAW_NOTES = `# Genesis 26:1–5

# 🤝 God's Covenant With Isaac

---

## 🌾 There Was A Famine In The Land

Another famine strikes the land of Canaan.

This is **not** the same famine Abraham experienced years earlier.

Moses points this out because the situation closely mirrors Abraham's life.

When Abraham faced famine, he traveled to Egypt, where he told Pharaoh that Sarah was his sister.

Now Isaac faces a similar test.

Will he trust God, or will he follow the same path his father did?

🌾 A new famine strikes Canaan

📖 This is different from Abraham's famine

🙏 Isaac now faces a similar test of faith

➡️ Isaac travels toward Gerar

---

## 👑 Isaac Went Unto Abimelech King Of The Philistines Unto Gerar

Instead of immediately going to Egypt, Isaac travels to **Gerar**, a Philistine city in the southern part of Canaan.

**Abimelech** was likely the royal title of the Philistine king, much like "Pharaoh" was the title for Egypt's king.

This is probably not the exact same Abimelech Abraham knew many years earlier, but another king who held the same title.

Gerar lay near the border of Egypt, making it the last major stop before entering Egypt.

Isaac is heading in the same direction Abraham once did.

👑 Isaac travels to Gerar

🌍 Gerar was a Philistine city near Egypt

📖 Abimelech was likely a royal title, not a personal name

➡️ God appears before Isaac reaches Egypt

---

## ✋ The Lord Appeared Unto Him…Go Not Down Into Egypt

Before Isaac enters Egypt, God speaks to him.

Unlike Abraham, Isaac is told **not** to go there.

God stops him before he repeats his father's journey.

Instead of looking to Egypt for security, Isaac is told to trust God's provision where he is.

This is Isaac's opportunity to respond differently than Abraham did.

✋ God personally appears to Isaac

🚫 God tells him not to go to Egypt

🙏 Isaac is called to trust God instead of circumstances

➡️ God tells Isaac where to stay

---

## 🏕️ Sojourn In This Land, And I Will Be With Thee

**Sojourn** means to live somewhere temporarily as a foreigner.

God tells Isaac to remain in the land even though there is famine.

He doesn't promise that life will be easy.

He promises **His presence.**

The greatest promise isn't food or wealth.

It's that God Himself will be with Isaac.

🏕️ Sojourn means to live temporarily as a foreigner

❤️ God promises His presence

🙏 Isaac is called to trust instead of running

➡️ God renews His covenant

---

## 🌍 Unto Thee And Unto Thy Seed I Will Give All These Countries

God now repeats the covenant He first made with Abraham.

The land is no longer promised only to Abraham.

Now the promise is officially passed to Isaac.

Through Isaac would come **Jacob**.

Through Jacob would come the **twelve tribes of Israel**.

From that family line would eventually come **King David**, and ultimately **Jesus Christ**, through whom the whole world would be blessed.

🌍 God transfers the covenant promise to Isaac

👨‍👦 Isaac's descendants will inherit the land

📖 Through Isaac come Jacob, Israel, David, and Jesus

➡️ God confirms His oath

---

## 🤝 I Will Perform The Oath Which I Swore Unto Abraham Thy Father

God reminds Isaac that He is continuing the very promise He made to Abraham.

Nothing has changed.

Abraham has died, but God's covenant has not.

The promises do not end with one generation.

God is faithfully carrying them forward through Isaac.

🤝 God keeps His promises across generations

📖 Isaac now carries the covenant

🙏 God's faithfulness does not end with Abraham

➡️ God repeats the promise of countless descendants

---

## ⭐ I Will Make Thy Seed To Multiply As The Stars Of Heaven

This is the exact promise God repeatedly gave Abraham.

Isaac's descendants would become too numerous to count, like the stars in the night sky.

At this point Isaac has no children.

Yet God speaks as though the promise is already certain.

God's promises depend on His faithfulness, not on present circumstances.

⭐ God repeats Abraham's promise

👨‍👩‍👦 Isaac's descendants will become countless

🙏 God speaks with complete certainty

➡️ God promises both people and land

---

## 🏞️ I Will Give Unto Thy Seed All These Countries…And In Thy Seed Shall All The Nations Of The Earth Be Blessed

God promises two things.

First, Isaac's descendants will inherit the land of Canaan.

Second, through Isaac's family, **all nations** will be blessed.

This reaches far beyond Israel.

It ultimately points to **Jesus Christ**, a descendant of Isaac, whose salvation would be offered to people from every nation on earth.

🏞️ God promises the land

🌍 God's blessing will reach every nation

✝️ The promise ultimately points to Jesus Christ

➡️ God explains why He is doing this

---

## 🙏 Because That Abraham Obeyed My Voice, And Kept My Charge, My Commandments, My Statutes, And My Laws

God explains why the covenant continues through Isaac.

Abraham consistently trusted and obeyed God throughout his life.

**Kept My charge** means Abraham faithfully carried out the responsibilities God gave him.

**Commandments** were God's direct commands.

**Statutes** were His appointed instructions.

**Laws** were the ways God instructed Abraham to live.

This does **not** mean Abraham was perfect.

Genesis has already shown Abraham making mistakes.

Rather, Abraham's life was characterized by faith, repentance, and obedience.

Because Abraham walked with God, the covenant promises now continue through Isaac.

🙏 Abraham faithfully obeyed God

📖 Kept My charge means he carried out God's responsibilities

❤️ His life was marked by faith and obedience—not perfection

➡️ God's covenant now continues through Isaac

# Genesis 26:6–11

# 🎭 Isaac's Deception

---

## 🏕️ Isaac Dwelt In Gerar

Isaac obeys God.

Instead of continuing south into Egypt like Abraham once did, Isaac stays in **Gerar**, just as God commanded.

Gerar was a Philistine city near the border of Egypt.

Although there was still famine, Gerar had enough resources for Isaac to survive.

By staying there, Isaac was trusting God's instruction instead of looking to Egypt for security.

🏕️ Isaac obeys God's command

🌍 Gerar was a Philistine city near Egypt

🙏 Isaac trusts God by remaining there

➡️ Isaac faces the same fear as Abraham

---

## 😨 The Men Of The Place Asked Him Of His Wife…He Said, She Is My Sister

History repeats itself.

Just as Abraham had done years earlier, Isaac becomes afraid.

He tells the men that Rebekah is his sister instead of his wife.

Isaac fears they will kill him so they can take Rebekah because she is very beautiful.

Even after watching God faithfully keep His promises to Abraham, Isaac falls into the same temptation.

Fear causes him to trust his own plan instead of trusting God's protection.

😨 Isaac becomes afraid

💔 He repeats Abraham's mistake

👩 Rebekah's beauty causes Isaac to fear for his life

➡️ Time passes

---

## ⏳ It Came To Pass, When He Had Been There A Long Time

Some time passes.

Isaac and Rebekah continue living in Gerar for quite a while.

The longer they stay, the harder it becomes to keep their lie hidden.

Eventually, the truth begins to reveal itself.

⏳ Isaac lives in Gerar for some time

🏠 Their deception continues

➡️ The king notices something unusual

---

## 👀 Abimelech Looked Out At A Window…Isaac Was Sporting With Rebekah

One day, King Abimelech looks out his window and sees Isaac **sporting** with Rebekah.

The word **sporting** means showing affection, laughing together, embracing, or behaving in a way that only a husband and wife normally would.

It wasn't anything inappropriate.

It was simply obvious that they were much more than brother and sister.

Their natural affection exposed the lie.

👀 Abimelech sees Isaac and Rebekah together

❤️ Sporting means showing the affection of husband and wife

📖 Their actions reveal the truth

➡️ The king confronts Isaac

---

## ❗ Behold, Of A Surety She Is Thy Wife

Abimelech immediately realizes the truth.

He calls Isaac and says,

"She is certainly your wife!"

The king had seen enough to know Isaac had lied.

This is almost the exact same confrontation Abraham received years earlier.

❗ The deception is uncovered

👑 Abimelech confronts Isaac

➡️ Isaac explains why he lied

---

## 😔 Because I Said, Lest I Die For Her

Isaac admits the truth.

He lied because he was afraid someone would kill him in order to take Rebekah.

His fear overcame his faith.

Even though God had just promised,

**"I will be with thee,"**

Isaac still tried to protect himself through deception.

😔 Isaac confesses his fear

⚠️ Fear led him to distrust God's promise

➡️ Abimelech rebukes Isaac

---

## ⚖️ What Is This Thou Hast Done Unto Us?

Abimelech is shocked.

Just like the Egyptian Pharaoh and the earlier Abimelech confronted Abraham, this king asks,

**"Why would you do this to us?"**

Isaac's lie had placed innocent people in danger.

The king had treated Isaac kindly, yet Isaac repaid that kindness with deception.

⚖️ Abimelech rebukes Isaac

😔 Isaac's lie endangered innocent people

➡️ The king explains the danger

---

## ⚠️ One Of The People Might Lightly Have Lain With Thy Wife, And Thou Shouldest Have Brought Guiltiness Upon Us

Abimelech explains the problem.

Someone in the kingdom could have unknowingly taken Rebekah, believing she was unmarried.

If that had happened, they would have committed adultery without realizing it.

Even though the Philistines did not worship the Lord the way Abraham's family did, Abimelech understood that taking another man's wife was a serious moral offense.

He also remembered what had happened to the earlier Abimelech during Abraham's lifetime.

God had struck that household because Sarah was Abraham's wife.

Whether through history or tradition, this king knew he did not want to bring God's judgment upon his people.

⚠️ Someone could have unknowingly committed adultery

📖 Abimelech understands the seriousness of taking another man's wife

😨 He wants no part of God's judgment

➡️ The king protects Isaac and Rebekah

---

## 🛡️ Abimelech Charged All His People, Saying, He That Toucheth This Man Or His Wife Shall Surely Be Put To Death

Instead of punishing Isaac, Abimelech protects him.

He issues a royal command that no one is to harm Isaac or Rebekah.

Anyone who violates that order will receive the death penalty.

Ironically, the man who lied because he feared being killed is now protected by the very king he feared.

God kept His promise after all.

🛡️ Abimelech places Isaac and Rebekah under royal protection

⚖️ Anyone who harms them will be put to death

🙏 God protects Isaac despite Isaac's lack of faith

➡️ God continues to bless Isaac despite his failure

# Genesis 26:12–16

# 🌾 Isaac's Prosperity And The Philistines' Envy

---

## 🌾 Then Isaac Sowed In That Land, And Received In The Same Year An Hundredfold: And The Lord Blessed Him

"Hundredfold" is an extraordinary yield.

Normal ancient grain harvests were far lower than that, often closer to eightfold or tenfold in a genuinely good year.

A hundredfold return was so far beyond normal that it could only be explained as a direct act of God, not skilled farming or good weather.

This detail matters because it happens in the middle of a famine, on land Isaac does not own, while he is living as a foreign guest in Gerar.

Ordinary circumstances point toward failure.

God still produces overwhelming success.

Jesus later uses this exact picture, a hundredfold return, as the image of seed falling on good ground in the parable of the sower.

🌾 Isaac plants crops in the middle of a famine

📊 A hundredfold yield was far beyond a normal ancient harvest

🙏 The blessing is credited directly to God, not to Isaac's skill

➡️ Isaac's prosperity keeps growing

---

## 📈 And The Man Waxed Great, And Went Forward, And Grew Until He Became Very Great

"Waxed" is an old word meaning grew or increased.

It's related to the phrase "waxing and waning," still used today to describe the moon growing fuller.

This is not describing a single good harvest.

Moses describes a continuous, escalating pattern.

Isaac's wealth did not level off.

It kept increasing until the people around him considered him one of the most powerful men in the entire region.

📈 Waxed means grew or increased

🔁 This describes ongoing growth, not a single lucky year

👑 Isaac becomes one of the most prominent men in the region

➡️ Moses lists exactly what made him so wealthy

---

## 🐑 For He Had Possession Of Flocks, And Possession Of Herds, And Great Store Of Servants

In the ancient Near East, wealth wasn't measured in money the way it is today.

It was measured in land, livestock, and labor.

Flocks and herds were essentially walking wealth, providing wool, milk, meat, and goods for trade.

A "great store of servants" meant Isaac had enough household workers and hired hands to actually manage an operation this large.

Wealth on this scale required real manpower to plant, harvest, herd, and guard it all.

🐑 Flocks and herds were the main form of wealth in the ancient world

💰 Livestock functioned like walking currency

👥 A large household of servants was needed to manage that much wealth

➡️ This growth doesn't go unnoticed

---

## 😒 And The Philistines Envied Him

Isaac was living in Gerar as a guest under Abimelech's protection, not as a citizen with inherited land rights.

His hosts begin to resent how much he has prospered while living among them.

This mirrors what happens generations later when Israel prospers in Egypt under Joseph, and a new Pharaoh who "knew not Joseph" grows afraid of how numerous and strong they had become.

Prosperity that isn't understood as God's blessing often produces jealousy instead of goodwill in the people watching it happen.

😒 The Philistines resent Isaac's growing wealth

🏕️ He was living among them as a guest, not a landowner

📖 A very similar pattern repeats later with Israel in Egypt

➡️ Their envy turns into open hostility

---

## 🪨 For All The Wells Which His Father's Servants Had Digged In The Days Of Abraham His Father, The Philistines Had Stopped Them, And Filled Them With Earth

Wells in the ancient Near East were not simple holes in the ground.

Digging one by hand through rock and soil down to the water table could take a skilled crew days or even weeks of labor.

A well represented a serious, lasting investment, and owning one gave a family or tribe a real claim to that land.

Filling a well with earth and rubble wasn't an accident, and it wasn't a small act of vandalism either.

It was a hostile, deliberate statement.

The Philistines were erasing physical evidence of Abraham's presence and, by extension, denying that his family had any lasting claim to that ground.

🪨 Digging a well by hand was a major, lasting investment

⚒️ A well represented a real claim to the land

😠 Deliberately filling one in was an act of open hostility

➡️ Abimelech makes his feelings official

---

## 🚪 And Abimelech Said Unto Isaac, Go From Us; For Thou Art Much Mightier Than We

This is a striking admission from a king.

Abimelech doesn't accuse Isaac of any crime or wrongdoing.

He simply admits that Isaac has become too strong, too wealthy, and too influential for his own comfort.

In the ancient world, a foreign guest who outgrew his host's own power was seen as a real political and military risk, not just an economic inconvenience.

Abimelech would rather remove that risk while relations are still peaceful than wait until Isaac's household is strong enough to threaten his own rule outright.

🚪 Abimelech asks Isaac to leave

⚖️ He admits no wrongdoing, only that Isaac has grown too powerful

👑 A guest who outgrew his host's strength was seen as a political threat

➡️ Isaac obeys and moves into the valley of Gerar

# Genesis 26:17–22

# 🕳️ Disputes Over The Wells

---

## 🏕️ Isaac Departed Thence, And Pitched His Tent In The Valley Of Gerar, And Dwelt There

After Abimelech asked Isaac to leave, Isaac peacefully departed from the city of Gerar.

Instead of leaving the entire region, he moved into the **Valley of Gerar**, just outside the city where there was room for his flocks, servants, and tents.

Isaac could have fought to stay, but he chose peace instead of conflict.

🏕️ Isaac leaves the city of Gerar

🌄 He settles in the nearby Valley of Gerar

🙏 Isaac chooses peace instead of fighting

➡️ Isaac begins reopening Abraham's wells

---

## 💧 Isaac Digged Again The Wells Of Water...For The Philistines Had Stopped Them After The Death Of Abraham...And He Called Their Names After The Names By Which His Father Had Called Them

Isaac reopened the wells that Abraham's servants had dug years earlier.

After Abraham died, the Philistines had filled those wells with dirt to make them unusable.

Instead of creating an entirely new system, Isaac restored what his father had built.

He even gave the wells the same names Abraham had originally given them, honoring his father's legacy.

💧 Isaac restores Abraham's wells

🪨 The Philistines had filled them with dirt

👨‍👦 Isaac honors Abraham by keeping the original names

➡️ His servants discover fresh water

---

## 🌊 Isaac's Servants Digged In The Valley, And Found There A Well Of Spring Water

While working in the valley, Isaac's servants dug another well.

This wasn't just standing rainwater.

They discovered a **spring**, meaning fresh underground water that flowed continuously.

A spring was one of the greatest discoveries a shepherd could make because it provided a constant source of water for people, animals, and crops.

Finding it was another sign of God's provision.

🌊 They discover a fresh underground spring

💧 Spring water flows continuously

🙏 God continues providing for Isaac

➡️ A dispute immediately begins

---

## ⚔️ The Herdmen Of Gerar Did Strive With Isaac's Herdmen, Saying, "The Water Is Ours"

The shepherds of Gerar argued with Isaac's shepherds over the well.

**Strive** means to argue, fight, or contend over something.

Water was life.

Without it, their flocks could not survive.

Instead of responding with violence, Isaac chose to walk away.

⚔️ Strive means to argue or fight

💧 Both groups wanted the well

🙏 Isaac refuses to fight

➡️ Isaac names the well

---

## 🪨 He Called The Name Of The Well Esek, Because They Strove With Him

Isaac named the well **Esek**.

**Esek** means **contention**, **quarreling**, or **dispute**.

The name reminded everyone what had happened there.

🪨 Esek means contention or dispute

⚔️ The name remembers the conflict

➡️ Isaac digs another well

---

## 💧 They Digged Another Well, And Strove For That Also...And He Called The Name Of It Sitnah

Isaac's servants dug a second well.

Once again, the shepherds argued over it.

Instead of fighting back, Isaac moved on again.

He named this well **Sitnah**, which means **hostility**, **opposition**, or **hatred**.

The conflict had grown beyond a simple disagreement.

People were now openly opposing Isaac.

💧 Isaac digs another well

⚔️ Another dispute begins

🪨 Sitnah means hostility or opposition

🙏 Isaac still chooses peace

➡️ Isaac moves once more

---

## 🌿 He Removed From Thence, And Digged Another Well, And For That They Strove Not

Isaac moved a third time.

He dug another well.

This time, no one argued over it.

Instead of spending his life fighting over every opportunity, Isaac trusted God to lead him to the right place.

Sometimes God doesn't remove every conflict.

Sometimes He simply leads His people somewhere better.

🌿 Isaac moves again

💧 He digs a third well

🙌 No one argues over it

➡️ Isaac recognizes God's provision

---

## 🌳 He Called The Name Of It Rehoboth

Isaac named the third well **Rehoboth**.

**Rehoboth** means **broad places**, **room**, or **wide open space**.

The name reflected what God had done.

After two disputes, God had finally given Isaac room to live and grow without conflict.

🌳 Rehoboth means broad places or room

🙏 God finally provides peace

➡️ Isaac praises God's provision

---

## 🌱 For Now The Lord Hath Made Room For Us, And We Shall Be Fruitful In The Land

Isaac recognizes that this wasn't luck.

God had been leading him all along.

Instead of fighting to keep the first two wells, Isaac trusted God until He opened the right door.

Now Isaac says,

**"The Lord has made room for us."**

Because God provided peace, Isaac knew his family, servants, and flocks could now grow and flourish.

🙏 Isaac gives God the credit

🌱 God makes room for Isaac to flourish

❤️ Sometimes God's provision is peace instead of victory in every fight

➡️ Isaac settles before God speaks to him again

# Genesis 26:23–25

# 🙏 God Appears To Isaac

---

## ⛰️ He Went Up From Thence To Beersheba

Isaac leaves the Valley of Gerar and returns to **Beersheba**, back in the southern part of Canaan.

Beersheba was already a special place in his family's history.

This was where Abraham had made his covenant with Abimelech, dug wells, planted a grove, and worshiped God.

Now Isaac returns to the very place where his father had experienced God's faithfulness.

🏕️ Isaac leaves Gerar

📍 He returns to Beersheba in Canaan

👨‍👦 He comes back to a place filled with Abraham's history with God

➡️ God speaks to Isaac again

---

## 🌙 The Lord Appeared Unto Him The Same Night

That very night, God appears to Isaac.

After all the moving, arguing over wells, and uncertainty, God speaks at exactly the right time.

This wasn't a new covenant.

It was a reminder.

God knew Isaac had just been through conflict after conflict.

Now God reassures him that he is still exactly where God wants him to be.

🌙 God appears after the conflict ends

🙏 God encourages Isaac at the right moment

➡️ God reminds him whose family he belongs to

---

## ✨ I Am The God Of Abraham Thy Father…Fear Not, For I Am With Thee, And Will Bless Thee

God introduces Himself the same way He has before.

"I am the God of Abraham your father."

God is reminding Isaac,

"The promises I made to Abraham now belong to you."

When God says, **"Fear not,"** He knows Isaac has every human reason to be afraid.

He's been forced to move.

People have fought over his wells.

The future has been uncertain.

God doesn't give Isaac a brand-new promise.

He reminds him of the promise He has already made.

Sometimes we don't need a new promise from God.

We simply need to remember the one He has already given.

🙏 God reminds Isaac of the covenant

❤️ "Fear not" because God is still with him

✨ God's promises have not changed

➡️ God explains why the promise continues

---

## ⭐ I Will Multiply Thy Seed For My Servant Abraham's Sake

God tells Isaac that the covenant is continuing because of the promise He made to Abraham.

This doesn't mean Isaac earned it himself.

It means God always keeps His word.

Years earlier, God promised Abraham that his descendants would become a great nation.

Now Isaac officially carries that same covenant.

Through Isaac would come Jacob.

Through Jacob would come the twelve tribes of Israel.

Through that family line would eventually come King David, and later, Jesus Christ.

God's promise is moving forward exactly as He said it would.

⭐ The covenant now continues through Isaac

🤝 God is keeping His promise to Abraham

🌍 The family line leading to Israel and Jesus continues

➡️ Isaac responds by worshiping

---

## 🪨 He Built An Altar There

Isaac's first response isn't to build a house.

It isn't to build more fences.

It isn't even to dig another well.

He builds an altar.

Just like Abraham often did, Isaac stops to worship God before doing anything else.

The altar was a public declaration that this place belonged to God.

🪨 Isaac worships before building anything else

👨‍👦 He follows Abraham's example

🙏 Worship comes before work

➡️ Isaac prays to God

---

## 🙌 Called Upon The Name Of The Lord

To **call upon the name of the Lord** means to worship Him, pray to Him, thank Him, and publicly acknowledge Him as God.

Isaac isn't simply saying God's name.

He's entering into fellowship with Him.

This phrase appears throughout Abraham's life and now becomes part of Isaac's life as well.

It shows that Isaac's relationship with God is becoming his own, not simply something he inherited from his father.

🙌 Isaac worships and prays to God

❤️ His relationship with God becomes personal

👨‍👦 Isaac continues Abraham's spiritual legacy

➡️ Isaac settles there

---

## ⛺ Pitched His Tent There, And There Isaac's Servants Digged A Well

After worshiping, Isaac settles in Beersheba.

His servants immediately begin digging another well.

Throughout this chapter, wells have become a picture of God's provision.

Every time one well was taken away, God provided another.

Now Isaac has both what he needs most:

🙏 God's presence.

💧 God's provision.

He has a place to live, water for his household, and the reassurance that God is still leading him.

⛺ Isaac settles permanently at Beersheba

💧 His servants dig another well

🙏 God provides both His presence and His provision

➡️ Abimelech comes to make peace with Isaac

# Genesis 26:26–35

# 🤝 A Covenant With Abimelech

---

## 👑 Then Abimelech Went To Him From Gerar, And Ahuzzath One Of His Friends, And Phichol The Chief Captain Of His Army

Some time after Isaac settled in Beersheba, **King Abimelech** traveled from Gerar to meet him.

He brought **Ahuzzath**, one of his trusted advisers or close companions, along with **Phichol**, the commander of his army.

This is very similar to what happened years earlier with Abraham. The same king and military commander who made a covenant with Abraham now come to make one with Isaac.

👑 Abimelech travels to Beersheba

👥 He brings his adviser and military commander

📖 The same leaders who dealt with Abraham now meet Isaac

➡️ Isaac questions why they came

---

## ❓ Wherefore Come Ye To Me? Seeing Ye Hate Me, And Have Sent Me Away From You

Isaac asks a very honest question.

"Why have you come to me?"

He reminds them that they had already asked him to leave because they were afraid of how much God had blessed him.

Isaac isn't trying to insult them.

He simply wants to know why they suddenly want a relationship after sending him away.

❓ Isaac asks why they came

💔 They had previously sent him away

🤔 Isaac wants to know what changed

➡️ Abimelech explains

---

## 👀 We Saw Certainly That The Lord Was With Thee

Abimelech answers honestly.

He says they clearly recognized that **the Lord was with Isaac**.

Isaac's success wasn't normal.

His crops, animals, servants, and prosperity made it obvious that God was blessing him.

The king understood that fighting someone whom God was blessing would be a mistake.

👀 Everyone recognized God's blessing

🙏 God's favor was obvious

➡️ The king asks for peace

---

## 🤝 Let There Be Now An Oath Betwixt Us…Let Us Make A Covenant With Thee

An **oath** was a solemn promise made before God.

A **covenant** was a binding agreement between two parties.

Abimelech wants a peace treaty.

He isn't asking Isaac for money or livestock.

He wants both families and their future generations to live peacefully together.

🤝 An oath is a solemn promise

📜 A covenant is a binding agreement

🕊️ Abimelech asks for lasting peace

➡️ He explains his request

---

## ✋ That Thou Wilt Do Us No Hurt…As We Have Not Touched Thee…As We Have Done Unto Thee Nothing But Good…And Have Sent Thee Away In Peace

Abimelech asks Isaac to promise that he will never attack them.

From Abimelech's point of view, they had not harmed Isaac.

They simply asked him to move because he had become too powerful.

Whether Isaac completely agreed with that version of events or not, he chose peace instead of reopening the dispute.

✋ Abimelech asks Isaac not to harm them

🕊️ He believes they parted peacefully

🙏 Isaac chooses peace instead of revenge

➡️ Isaac welcomes them

---

## 🍖 He Made Them A Feast, And They Did Eat And Drink

Isaac accepts their request.

He prepares a feast, and they eat together.

Sharing a meal was a common way of celebrating and confirming a covenant.

🍖 Isaac prepares a feast

🤝 The meal confirms the covenant

➡️ They make the agreement official

---

## 🌅 They Rose Up Betimes In The Morning, And Sware One To Another…And Isaac Sent Them Away, And They Departed From Him In Peace

**Betimes** means **early in the morning**.

The next morning they formally swear their oath to one another.

Isaac sends them home, and they leave in peace.

🌅 Betimes means early in the morning

🤝 The covenant is officially confirmed

🕊️ They leave as friends

➡️ God immediately blesses Isaac

---

## 💧 Isaac's Servants Came…We Have Found Water

That same day Isaac's servants return with exciting news.

The well they had been digging has finally produced water.

This is the same well they had begun digging after Isaac settled in Beersheba.

Throughout this chapter, every successful well has been another reminder that God is providing for Isaac wherever he goes.

💧 The new well produces water

🙏 God continues providing for Isaac

➡️ Isaac gives the well a name

---

## 🏙️ He Called It Shebah…Therefore The Name Of The City Is Beersheba Unto This Day

Isaac names the well **Shebah**, meaning **oath**.

Because of the oath made that day, the city became known as **Beersheba**, meaning **"Well of the Oath."**

This also connects back to Abraham's earlier covenant in the same place, showing that Isaac is continuing his father's legacy.

🏙️ Shebah means oath

💧 Beersheba means "Well of the Oath"

📖 Isaac continues Abraham's legacy

➡️ Moses introduces Esau's family

---

## 💍 Esau Was Forty Years Old When He Took To Wife Judith The Daughter Of Beeri The Hittite, And Bashemath The Daughter Of Elon The Hittite

These verses now shift away from Isaac and begin talking about **Esau**.

When Esau was forty years old, he married **two wives**:

- **Judith**, daughter of Beeri the Hittite.
- **Bashemath**, daughter of Elon the Hittite.

These women were Hittites—part of the Canaanite people.

Earlier, Abraham had gone to great lengths to make sure Isaac did **not** marry a Canaanite woman because they worshiped false gods.

Esau ignored that example and chose wives from the surrounding Canaanite culture.

💍 Esau marries Judith and Bashemath

🏛️ Both wives are Hittites

⚠️ Esau ignores his family's example

➡️ His parents are deeply grieved

---

## 😢 Which Were A Grief Of Mind Unto Isaac And To Rebekah

**A grief of mind** means continual sorrow, heartache, and distress.

Isaac and Rebekah weren't upset simply because Esau got married.

They were grieved because he married women who did not worship the Lord.

They knew those marriages would influence their family and future generations.

This is the first sign that Esau is beginning to treat God's covenant differently than the rest of his family.

😢 Grief of mind means continual sorrow and heartache

⚠️ Esau's marriages brought spiritual conflict into the family

📖 His choices foreshadow the division that follows in the next chapter`;

export const GENESIS_TWENTY_SIX_PERSONAL_SECTIONS = parseGenesisTwentySixRawNotes(GENESIS_TWENTY_SIX_RAW_NOTES);
