export type GenesisThirtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtyFourRawNotes(rawText: string): GenesisThirtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+34:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 34 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+34:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+34:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 34 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 34,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 34:${startVerse}` : `Genesis 34:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Genesis 34 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_FOUR_RAW_NOTES = `# Genesis 34:1–12

# 👧 Dinah Is Defiled

---

## 👧 Dinah Went Out To See The Daughters Of The Land

Dinah, the daughter of **Jacob and Leah**, goes out to visit the young women living in the area.

The phrase **"the daughters of the land"** simply refers to the local women of Canaan.

Jacob's family had recently settled near **Shechem**, so Dinah was likely visiting or getting to know the women of the nearby city.

The Bible does not suggest that Dinah was doing anything sinful. It simply records where she went before the events that followed.

👧 Dinah visits the local women

🏙️ "Daughters of the land" means the women living nearby

📖 Jacob's family has recently settled near Shechem

➡️ Shechem sees Dinah

---

## 👑 Shechem… The Son Of Hamor The Hivite

Shechem was the son of **Hamor**, the ruler of the area.

The Bible calls Hamor **"the prince of the country,"** meaning he was the local chief or ruler over that region.

The city was also called **Shechem**.

It is possible that the city was named after Shechem or that both the city and the prince shared the same name. In the ancient world, cities were often named after important people or founders.

When Shechem saw Dinah, he **took her**, **lay with her**, and **defiled her**.

This describes a sexual assault.

Instead of honoring Dinah through marriage first, he forced himself upon her.

Because of this, Dinah was dishonored according to both God's standards and the customs of that time.

👑 Shechem was Hamor's son

🏙️ Hamor ruled the city of Shechem

⚠️ Shechem sexually assaulted Dinah

➡️ Shechem unexpectedly falls in love

---

## ❤️ His Soul Clave Unto Dinah

After assaulting Dinah, something unexpected happens.

The Bible says **"his soul clave unto Dinah."**

This means he became deeply attached to her.

The word **clave** means **clung** or **held tightly.**

The Bible also says he **loved the damsel** and **spake kindly unto her.**

In other words, after committing this terrible sin, Shechem developed genuine affection for Dinah and spoke tenderly to her.

This likely happened shortly after the assault, not years later.

His feelings, however, did not erase what he had done.

A person can express love afterward, but that does not undo the sin or the harm they caused.

❤️ Shechem becomes deeply attached to Dinah

🗣️ He speaks gently to her

⚠️ His feelings do not excuse his sin

➡️ Shechem asks to marry Dinah

---

## 💍 Get Me This Damsel To Wife

Shechem tells his father,

**"Get me this damsel to wife."**

In that culture, marriages were usually arranged between families.

Rather than speaking directly to Jacob, Shechem asks Hamor to negotiate the marriage.

This suggests that Shechem truly wanted Dinah as his wife after what happened.

💍 Shechem asks his father to arrange the marriage

👨 Fathers commonly negotiated marriages

➡️ Jacob hears what happened

---

## 😔 Jacob Held His Peace

News reaches Jacob that Dinah has been defiled.

At that moment, his sons are still out in the fields caring for the livestock.

Instead of reacting immediately, Jacob waits until they return.

The Bible says he **"held his peace,"** meaning he remained silent for the time being.

He waits until the entire family is present before responding.

😔 Jacob waits before responding

🐑 His sons are still in the fields

➡️ Hamor comes to speak with Jacob

---

## 🤝 Hamor Communed With Them

Hamor comes to meet Jacob and his family.

The word **communed** simply means **talked with** or **discussed matters together.**

He is trying to negotiate a peaceful solution after his son's terrible actions.

By this time, Dinah is apparently still in Shechem's household.

Later in the chapter, the Bible says Jacob's sons brought her out from Shechem's house, showing she had remained there during these discussions.

🤝 Hamor begins peace negotiations

🗣️ Communed means discussed together

🏠 Dinah appears to still be in Shechem's house

➡️ Jacob's sons arrive

---

## 😡 The Men Were Grieved… And Very Wroth

When Jacob's sons hear what happened, they immediately return from the fields.

The Bible says they were **grieved**, meaning they were deeply hurt and distressed.

They were also **very wroth**, meaning extremely angry.

The reason is then explained.

Shechem had **"wrought folly in Israel."**

The phrase **wrought folly** means he committed a shameful and wicked act.

By sleeping with Jacob's unmarried daughter through force, Shechem dishonored Dinah, disgraced her family, and violated God's moral standard.

The Bible says,

**"Which thing ought not to be done."**

In other words, this was not merely considered inappropriate.

It was a serious sin against both God and the family.

😔 Grieved means deeply distressed

😡 Wroth means extremely angry

⚠️ Wrought folly means committing a shameful sin

📖 Shechem dishonored Dinah and her family

➡️ Hamor makes an offer

---

## 🤝 Make Ye Marriages With Us

Hamor proposes that the two families become joined through marriage.

He says,

"Give your daughters unto us, and take our daughters unto you."

He is suggesting that Jacob's family and the people of Shechem become one larger community through intermarriage.

He also offers them the freedom to live there, trade, buy land, and prosper.

Although Jacob's family was already camping nearby, Hamor is now offering them the legal right to settle permanently among his people and enjoy the benefits of the land.

Hamor's proposal may have been sincere, but it also served another purpose.

If Jacob accepted the marriage, it would settle the conflict caused by Shechem's actions.

🤝 Hamor proposes intermarriage

🏡 He offers permanent settlement

💰 Jacob's family may buy, trade, and prosper there

➡️ Shechem makes his own appeal

---

## 💰 Ask Me Never So Much Dowry And Gift

Shechem now speaks personally.

He tells Jacob and Dinah's brothers,

"Whatever you ask, I will give."

A **dowry** or **bride-price** was a payment given to the bride's family before marriage.

Shechem is willing to pay whatever amount they request if they will allow him to marry Dinah.

His offer shows how determined he is to make Dinah his wife.

However, no amount of money could erase what had already happened.

💰 Dowry was the customary bride-price

❤️ Shechem offers whatever they ask

⚠️ Wealth cannot undo his sin

➡️ Jacob's sons answer with deceit

# Genesis 34:13–24

# ✂️ The Brothers' Requirements

---

## 🎭 The Sons Of Jacob Answered… Deceitfully

Jacob's sons do not answer Hamor and Shechem honestly.

The Bible says they answered **deceitfully**, meaning they intentionally spoke in a way that would trick them.

Although they appear willing to allow the marriage, they are secretly planning revenge for what Shechem did to Dinah.

Their words sound peaceful…

But their hearts are preparing for violence.

🎭 Deceitfully means to intentionally deceive

😡 The brothers are secretly planning revenge

⚠️ Their true intentions are hidden

➡️ The brothers give their condition

---

## ✂️ We Cannot Give Our Sister To One That Is Uncircumcised

The brothers say they cannot allow Dinah to marry an **uncircumcised** man.

Circumcision is the removal of the foreskin, the skin covering the tip of the penis.

Years earlier, God commanded Abraham that every male in his household be circumcised.

It became the outward sign of God's covenant with Abraham and his descendants.

The brothers are speaking about something that is truly part of God's covenant.

However, they are not using it for God's purposes.

They are using it as part of their trap.

✂️ Circumcision removes the foreskin

📖 God gave circumcision to Abraham

🤝 It was the sign of God's covenant

⚠️ The brothers misuse something holy

➡️ It Were A Reproach Unto Us

---

## 😔 It Were A Reproach Unto Us

A **reproach** is something that brings shame, disgrace, or dishonor.

The brothers claim it would bring shame upon their family if Dinah married someone outside God's covenant people.

Although this statement is true, they are not saying it out of faith.

They are using a true principle to hide their plan for revenge.

😔 Reproach means disgrace or shame

📖 God's covenant people were to remain separate

⚠️ The brothers use the truth deceptively

➡️ If Ye Will Be As We Be

---

## 🤝 If Ye Will Be As We Be

The brothers give one condition.

Every male in the city must become circumcised just as they are.

Only then, they say, can the marriage happen.

They make it sound like they are inviting the people of Shechem into the covenant family.

In reality, they are setting a trap.

🤝 Every male must be circumcised

📖 The brothers pretend this is about God's covenant

⚠️ It is actually part of their plan

➡️ Then Will We Give Our Daughters Unto You

---

## 👨‍👩‍👧 Then Will We Give Our Daughters Unto You… And We Will Take Your Daughters Unto Us

The word **"daughters"** is speaking generally.

It does not mean Jacob suddenly has many unmarried daughters.

The brothers are talking about future generations.

If the agreement is accepted, people from Jacob's family would marry people from Shechem's people, and vice versa.

The two groups would eventually become one people through marriage.

This is exactly what Hamor had proposed earlier.

👨‍👩‍👧 "Daughters" refers to future generations

💍 The two groups would freely intermarry

🏡 They would become one people

➡️ We Will Dwell With You

---

## 🏕️ We Will Dwell With You, And We Will Become One People

The brothers promise that if everyone is circumcised, Jacob's family will remain there permanently.

Instead of simply camping outside the city, the two communities would live together.

Their families…

Their businesses…

Their future generations…

Would all become united.

Again, this is only part of the deception.

🏕️ Jacob's family promises to remain

🤝 The two communities would unite

👨‍👩‍👧 Future generations would become one people

➡️ If Ye Will Not Hearken

---

## 🚶 If Ye Will Not Hearken Unto Us

**Hearken** means **to listen** or **to obey.**

The brothers tell Hamor that if the men refuse circumcision, they will simply take Dinah and leave.

There will be no marriage.

No agreement.

No relationship between the two families.

👂 Hearken means to listen or obey

🚶 The brothers threaten to leave

➡️ Their Words Pleased Hamor

---

## 😊 Their Words Pleased Hamor And Shechem

Hamor and Shechem gladly accept the proposal.

They believe the brothers are being sincere.

Neither of them realizes they are being deceived.

Instead, they believe peace is about to be restored.

😊 Hamor believes the proposal

🤝 They think reconciliation is possible

⚠️ They do not know it is a trap

➡️ The Young Man Deferred Not

---

## ❤️ The Young Man Deferred Not To Do The Thing

The word **deferred** means **delayed**.

Shechem **"deferred not,"** meaning he did not delay.

He immediately agreed to be circumcised.

The Bible says he **delighted in Jacob's daughter**, meaning he strongly desired to marry Dinah.

It also says he was **more honorable than all the house of his father.**

This does not mean he was righteous.

He had already committed a terrible sin.

It means he was highly respected and held in high esteem among the people of the city.

❤️ Deferred not means he did not delay

💍 Shechem eagerly agrees

👑 He was respected among his people

➡️ Hamor Speaks At The City Gate

---

## 🚪 Hamor And Shechem Came Unto The Gate Of Their City

The **city gate** was the center of public life.

It was where leaders met.

Business agreements were made.

Court cases were heard.

Important announcements were given.

Instead of speaking privately, Hamor presents the proposal before the city's leading men.

🚪 The city gate was the public meeting place

⚖️ Leaders gathered there

🗣️ Hamor presents the proposal publicly

➡️ These Men Are Peaceable With Us

---

## 🤝 These Men Are Peaceable With Us

Hamor tells the people that Jacob's family has peaceful intentions.

He encourages everyone to let them live in the land.

He also says they can trade, buy property, and prosper together.

In other words, both groups can benefit from living side by side.

🤝 Hamor describes Jacob's family as peaceful

🏡 He invites them to settle permanently

💰 Trade and business would benefit both groups

➡️ Let Us Take Their Daughters

---

## 👨‍👩‍👧 Let Us Take Their Daughters… And Give Them Our Daughters

Hamor repeats the idea of intermarriage.

The people of Shechem would marry into Jacob's family.

Jacob's descendants would marry into theirs.

Over time, the two peoples would become one united community.

👨‍👩‍👧 Hamor proposes intermarriage

🤝 The two peoples would become one

➡️ Shall Not Their Cattle… Be Ours?

---

## 🐑 Shall Not Their Cattle… And Their Substance… Be Ours?

Now Hamor gives another reason.

Jacob is extremely wealthy.

God has blessed him with large flocks, herds, servants, and possessions.

If Jacob's family becomes part of their community, Hamor tells the people that all of Jacob's prosperity will eventually benefit everyone.

His speech reveals that money and possessions are helping convince the men.

They are not only thinking about peace.

They are thinking about profit.

🐑 Jacob is extremely wealthy

💰 Hamor points to the financial benefits

📈 The people expect to share in Jacob's prosperity

➡️ Every Male Was Circumcised

---

## ✂️ All That Went Out Of The Gate Of His City… Were Circumcised

The phrase **"all that went out of the gate of his city"** refers to the men who belonged to the city.

The city gate was where the citizens and leaders gathered for official matters.

After hearing Hamor's proposal, the men accepted it.

Every male agreed to be circumcised.

None of them realized they had been deceived by Jacob's sons.

🚪 The phrase refers to the men of the city

👨 The citizens accepted Hamor's proposal

✂️ Every male was circumcised

⚠️ They did not know they were walking into a trap

➡️ Simeon and Levi carry out their plan

# Genesis 34:25–31

# ⚔️ The Brothers' Revenge

---

## 🩹 It Came To Pass On The Third Day, When They Were Sore

Three days after all the men of the city were circumcised, they were still recovering.

After circumcision, it is normal for the body to be painful and tender for several days.

The third day would have been one of the most painful stages of healing, making it difficult to walk, fight, or defend themselves.

Jacob's sons had planned this carefully.

They knew the men would be at their weakest.

🩹 The men were recovering from circumcision

😖 Sore means painful and weak from their wounds

📖 The brothers waited until the best time to attack

➡️ Simeon and Levi attack

---

## ⚔️ Simeon And Levi… Took Each Man His Sword

Only **Simeon and Levi** are mentioned here.

These were Dinah's full brothers, the sons of Jacob and Leah.

Each man took his own sword and entered the city.

The Bible says they came **boldly**, meaning they entered confidently without fear because they knew the men could not effectively resist.

They then **slew all the males**, meaning they killed every male in the city.

⚔️ Simeon and Levi carry out the attack

🗡️ Each man brings his own sword

💪 Boldly means confidently, knowing the men could not fight back

⚠️ Every male in the city is killed

➡️ Hamor and Shechem are killed

---

## ⚖️ They Slew Hamor And Shechem… And Took Dinah Out Of Shechem's House

Simeon and Levi kill both Hamor and his son Shechem.

The Bible then says they **took Dinah out of Shechem's house**.

This answers an earlier question in the chapter.

Dinah had apparently remained in Shechem's house during the marriage negotiations.

She had not yet returned to Jacob's family.

Only after Shechem was killed did her brothers bring her home.

⚖️ Hamor and Shechem are killed

🏠 Dinah had remained in Shechem's house

❤️ Her brothers bring her back home

➡️ The rest of Jacob's sons arrive

---

## 🏙️ The Sons Of Jacob Came Upon The Slain, And Spoiled The City

At this point, the Bible changes from mentioning only **Simeon and Levi** to saying **"the sons of Jacob."**

This indicates that the rest of Jacob's sons now join in after the fighting is over.

The word **spoiled** means they stripped the city of its possessions.

In other words, they looted it.

They took whatever they considered valuable because they believed the city had dishonored their sister.

This means Simeon and Levi carried out the killings, while the other brothers participated in taking the city's possessions.

👨 Simeon and Levi attack first

👨‍👦 The other brothers join afterward

💰 Spoiled means they looted the city

➡️ They take everything

---

## 🐑 They Took Their Sheep… Oxen… Asses… And All Their Wealth

The brothers take nearly everything that belonged to the people of the city.

They seize the sheep, cattle, donkeys, and everything valuable that was found both inside the city and in the surrounding fields.

This was more than revenge.

It was the complete plundering of the city.

The people lost both their lives and their possessions.

🐑 The livestock is taken

💰 The city's wealth is carried away

🏙️ Nothing valuable is left behind

➡️ Their Families Are Taken

---

## 👩 All Their Little Ones And Their Wives Took They Captive

The **little ones** were the children.

The **wives** were the women whose husbands had just been killed.

Instead of killing them, Jacob's sons took them captive.

The Bible does not tell us exactly how many people this included.

It was likely a large number, since every household would have had women and children.

This greatly increased the size of Jacob's camp almost overnight.

They now possessed not only more animals and possessions, but also many captives.

👶 Little ones means the children

👩 The wives are taken captive

🏕️ Jacob's camp suddenly becomes much larger

➡️ Jacob rebukes Simeon and Levi

---

## 😟 Ye Have Troubled Me

Jacob is deeply disturbed by what Simeon and Levi have done.

He says,

**"Ye have troubled me."**

In other words,

"You have brought great trouble upon our family."

Jacob's concern is not that Dinah was unimportant.

His concern is that their actions have now placed the entire family in danger.

😟 Jacob fears the consequences

👨‍👩‍👧 He worries about the whole family

➡️ To Make Me To Stink

---

## 👃 To Make Me To Stink Among The Inhabitants Of The Land

This is an expression.

Jacob is not talking about a physical smell.

To **"make me to stink"** means to give someone a terrible reputation.

Jacob is saying,

"You have made the people of this land hate us."

The surrounding nations would now see Jacob's family as violent and dangerous.

👃 "Make me to stink" means to ruin someone's reputation

😡 The surrounding people would now hate Jacob's family

➡️ The Canaanites And The Perizzites

---

## 🌍 The Canaanites And The Perizzites

The **Canaanites** were the many people groups already living throughout the land of Canaan.

The **Perizzites** were another Canaanite people group who lived in villages and rural areas throughout the land.

Jacob mentions both because they lived nearby.

News of what happened at Shechem could quickly spread among them.

🌍 The Canaanites lived throughout the land

🏕️ The Perizzites were another nearby people group

➡️ I Being Few In Number

---

## 👨‍👩‍👦 I Being Few In Number

Jacob says his family is **few in number.**

Compared to all the surrounding cities and tribes, Jacob's household was still small.

Although he had many servants and a large family, they were greatly outnumbered by the combined populations living throughout Canaan.

Jacob fears that the neighboring people will unite against them.

👨 Jacob's household is small compared to the surrounding nations

⚔️ He fears they cannot defend themselves

➡️ They Shall Gather Themselves Together

---

## ⚔️ They Shall Gather Themselves Together Against Me

The word **"they"** refers to the surrounding people groups, including the Canaanites and the Perizzites.

Jacob fears they will form an alliance to attack his family in revenge for what happened at Shechem.

If that happened, Jacob believed his entire household could be destroyed.

⚔️ "They" refers to the surrounding nations

😨 Jacob fears a united attack

🏕️ He worries his entire household could perish

➡️ Simeon And Levi Respond

---

## 😠 Should He Deal With Our Sister As With An Harlot?

Simeon and Levi answer their father with a question.

A **harlot** is a prostitute.

They are saying,

"Should Shechem have treated our sister like a woman who could simply be taken and used without honor or marriage?"

To them, Shechem had brought shame upon Dinah and their entire family.

Although their anger over what happened to Dinah was understandable, the violence and destruction they carried out went far beyond what God had commanded.

This brief question ends the chapter and leaves the conflict unresolved.

😠 Simeon and Levi defend their actions

💔 Harlot refers to a prostitute

⚖️ They believed they were defending their sister's honor

➡️ The consequences of their actions continue into the next chapter`;

export const GENESIS_THIRTY_FOUR_PERSONAL_SECTIONS = parseGenesisThirtyFourRawNotes(GENESIS_THIRTY_FOUR_RAW_NOTES);
