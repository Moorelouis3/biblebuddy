export type ExodusTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyTwoRawNotes(rawText: string): ExodusTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 22:${startVerse}` : `Exodus 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Exodus 22 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_TWO_RAW_NOTES = `# Exodus 22:1-4
# 🐂 Restitution For Theft
---
## 🐂 He Shall Restore Five Oxen For An Ox

An ox was worth far more than a sheep to a farming family.

It did the heavy daily work of plowing and pulling a cart.

Killing a stolen ox erased that whole future of labor.

That is why the fine was five oxen for one ox.

A stolen sheep only cost four sheep to repay.

🐂 An ox meant plowing and daily labor

💰 Losing that labor made the fine steeper

🐑 A sheep repaid at only four

📖 The penalty matched the real economic loss

## 🌙 If A Thief Be Found Breaking Up

"Breaking up" is the old way of saying breaking into a house.

This law covers a thief caught in the act at night.

In the dark, a homeowner could not tell how dangerous the thief was.

Striking that intruder in self defense carried no guilt.

The law protected fear born from real, unclear danger.

🌙 Breaking up means breaking in at night

🏚️ Darkness hid how dangerous the thief was

🛡️ Self defense at night carried no guilt

📖 The law understood fear in the dark

## ☀️ If The Sun Be Risen Upon Him

Daylight changed the whole legal picture for the homeowner.

Once the sun was up, he could see the thief clearly.

He could judge whether the thief was truly dangerous.

Killing him in daylight now counted as murder, not defense.

A safer response, like shouting for help, was possible in the light.

☀️ Daylight let the homeowner see clearly

👀 A clear view meant a real choice

⚖️ Killing him now counted as murder

📖 Daylight removed the excuse of not knowing

## 💰 He Shall Be Sold For His Theft

Not every thief could pay back what he stole.

If he owned nothing, money could not settle the debt.

The law then let him work off the debt as a servant.

He was sold into a fixed term of labor, not slavery for life.

Even a thief with nothing still owed a real payment.

💰 A thief with nothing had no cash

🔨 Labor became the way to pay the debt

⛓️ This meant a fixed term, not lifelong slavery

📖 Even poverty did not cancel the debt

## 🐐 He Shall Restore Double

This verse covers a different situation than verse one.

Here the stolen animal is found alive in the thief's hand.

Nothing was killed or sold, so less harm was done.

The lighter penalty fit the smaller amount of damage.

Double payment still made theft a costly choice.

🐐 The stolen animal was found alive

✅ Less harm meant a lighter penalty

💰 Double payment still cost the thief

📖 Punishment matched the real damage done

# Exodus 22:5-6
# 🔥 Field Damage And Fire
---
## 🌾 Of The Best Of His Own Field, And Of The Best Of His Own Vineyard, Shall He Make Restitution

If someone's animal wandered into a neighbor's field, real damage followed.

The one responsible had to repay with his own best crop.

He could not hand over his leftover or lowest quality produce.

Careless field damage still carried a real, painful cost.

🌾 A wandering animal caused real crop loss

💯 Repayment came from the very best crop

🚫 Leftover or poor produce was not allowed

📖 Carelessness still carried a real cost

## 🔥 He That Kindled The Fire Shall Surely Make Restitution

"Kindled" simply means started or lit.

This law covers a fire that spread further than planned.

Thorns catch fire fast and can carry flame into a whole field.

Even an accident still belonged to the person who lit the spark.

Starting a fire came with responsibility for where it traveled.

🔥 Kindled means started or lit

🌾 Thorns could carry fire into a field

🤷 Even an accident still had an owner

➡️ Starting a fire meant owning where it spread

# Exodus 22:7-9
# ⚖️ Property Left In Trust
---
## 💵 If The Thief Be Found, Let Him Pay Double

This law covers valuables left with a neighbor for safekeeping.

If those valuables were then stolen, someone had to answer for it.

Finding the real thief settled the whole matter cleanly.

The thief himself paid double, and the trusted neighbor was cleared.

💵 Valuables were left for safekeeping

🔍 Finding the real thief solved the case

✅ The trusted neighbor was cleared completely

📖 The actual thief paid the price

## 👨‍⚖️ The Master Of The House Shall Be Brought Unto The Judges

Sometimes the thief was never found at all.

Suspicion then fell on the person who was holding the goods.

That person had to appear before the judges.

He had to prove he had not secretly taken it himself.

👨‍⚖️ An unfound thief shifted the suspicion

🏛️ The trusted keeper faced the judges

🤲 He had to prove his own innocence

📖 Trust came with real accountability

## ⚖️ Whom The Judges Shall Condemn, He Shall Pay Double Unto His Neighbour

This rule covered any kind of disputed lost property.

It applied to an ox, a sheep, clothing, or anything else claimed as stolen.

Both sides told their story in front of the judges.

Whoever the judges ruled against paid back twice the value.

⚖️ This covered any disputed lost property

👥 Both sides told their story in court

🔨 The judges made the final ruling

➡️ Losing the case cost double the value

# Exodus 22:10-13
# 🐑 Liability For Animals Left In Care
---
## 🙏 Then Shall An Oath Of The Lord Be Between Them Both

This law covers an animal left with someone for safekeeping.

It died, was hurt, or wandered off with no one watching.

Without witnesses, no one could prove exactly what happened.

The caretaker could swear an oath before God that he had not stolen it.

The owner then had to accept that oath and let the matter rest.

🙏 An oath was sworn before God

👀 No witnesses meant no clear proof

🤝 The owner had to accept the oath

📖 God's name settled disputes people could not

## 🐫 If It Be Stolen From Him, He Shall Make Restitution Unto The Owner Thereof

This covers a different outcome than an oath or torn remains.

Here the animal was stolen while under someone else's care.

The caretaker himself now owed the owner full repayment.

Holding someone's property came with real responsibility attached.

🐫 The animal was stolen while in his care

💰 The caretaker owed full repayment

🔐 Trust came with real responsibility

📖 Carelessness while entrusted still had a cost

## 🐺 If It Be Torn In Pieces, Then Let Him Bring It For Witness

Sometimes a wild animal killed the livestock instead.

The caretaker could bring back the torn remains as proof.

Torn remains showed a real attack, not carelessness or theft.

A genuine tragedy did not require him to pay anything back.

🐺 A wild animal could kill the livestock

🩸 Torn remains served as real proof

🙅 Proof cleared him of any payment

➡️ A real attack was not carelessness

# Exodus 22:14-15
# 🔨 Liability For Borrowed Property
---
## 🔨 The Owner Thereof Being Not With It, He Shall Surely Make It Good

"Ought" is an old word simply meaning anything.

This covers something borrowed that was later hurt or died.

The owner was not there to help watch over it.

Full responsibility for the loss fell on the borrower alone.

Borrowing something meant accepting real risk for its care.

🔨 Ought is an old word for anything

🤕 The borrowed item was hurt or died

👤 The owner was not present to help

➡️ Full risk fell on the borrower

## 🐴 If The Owner Thereof Be With It, He Shall Not Make It Good

This covers a different situation than the verse before it.

Here the owner was present the whole time the item was used.

Shared presence meant shared responsibility for whatever happened.

A rented item worked differently.

The rental fee already covered that risk.

🐴 The owner stayed present this time

🤝 Shared presence meant shared responsibility

💵 A rental fee already covered risk

➡️ Presence and payment changed the outcome

# Exodus 22:16-17
# 💍 Seduction Of An Unmarried Woman
---
## 🤝 He Shall Surely Endow Her To Be His Wife

"Entice" means to talk or persuade someone into something.

This law covers a man who convinced an unmarried woman to sleep with him.

He could not simply walk away afterward.

He owed her the full protection and status of marriage.

This required real responsibility instead of abandonment.

🤝 Entice means to talk someone into it

💍 He owed her real marriage status

🚫 Walking away was not allowed

📖 The law forced responsibility, not abandonment

## 🚫 He Shall Pay Money According To The Dowry Of Virgins

"Dowry" means the bride price a husband's family paid.

The woman's father still had the final say over the marriage.

He could refuse to let his daughter marry the man.

Even then, the man still owed the full bride price.

Refusing the marriage cost the man nothing less financially.

🚫 Dowry means the bride price paid

👴 The father could refuse the marriage

💰 The man still owed full payment

➡️ Refusal did not lower his cost

# Exodus 22:18-20
# ⚔️ Witchcraft, Bestiality, And Idolatry
---
## 🧙 Thou Shalt Not Suffer A Witch To Live

"Suffer" here is an old word meaning to allow or permit.

Witchcraft meant using occult power to control spiritual forces outside God.

Nations surrounding Israel practiced this kind of magic openly.

This law drew a hard line against it entering Israelite life.

🧙 Suffer means to allow or permit

🔮 Witchcraft meant occult power outside God

🌍 Neighboring nations practiced this openly

📖 Israel was told to draw a hard line

## 🐴 Whosoever Lieth With A Beast Shall Surely Be Put To Death

This law names a serious sexual perversion practiced in surrounding cultures.

Treating it as a capital offense showed how seriously God took it.

It violated the created order God intended for human relationships.

No culture around Israel got a pass to normalize this.

🐴 This targeted a serious perversion

⚖️ It carried the same weight as murder

👤 It broke the created order

📖 God intended better for human relationships

## 🛐 He That Sacrificeth Unto Any God, Save Unto The Lord Only

Worshiping any other god was never treated as a private choice.

It was punished as seriously as murder or witchcraft in this law.

Israel's whole relationship with God depended on exclusive loyalty.

Sharing that loyalty with another god broke the entire covenant.

🛐 Other worship was never just private

⚖️ This crime matched murder in seriousness

🤝 Israel's covenant demanded exclusive loyalty

📖 Divided worship broke the whole agreement

# Exodus 22:21-24
# 🫂 Protecting Strangers, Widows, And Orphans
---
## 🧳 Thou Shalt Neither Vex A Stranger, Nor Oppress Him

"Vex" means to harass or mistreat someone.

God grounds this command in Israel's own memory.

They knew exactly what it felt like to be powerless foreigners in Egypt.

That memory removed any excuse to treat outsiders the same way.

🧳 Vex means to harass or mistreat

🌍 Israel remembered being foreigners in Egypt

🚫 That memory removed any excuse

📖 Shared suffering was meant to build mercy

## 😢 Ye Shall Not Afflict Any Widow, Or Fatherless Child

Widows and orphans had no husband or father to defend them legally.

That made them the most vulnerable people in the whole community.

God says plainly that he personally listens when they cry out.

Their cry never goes unheard, even if no human helps them.

😢 Widows and orphans lacked legal defense

🎯 They were the most vulnerable people

👂 God personally listens to their cry

📖 Their cry never goes unheard

## 🔥 My Wrath Shall Wax Hot, And I Will Kill You With The Sword

"Wax hot" means to grow or increase in intensity.

This punishment fits the exact crime that was committed.

Whoever creates widows and orphans through cruelty faces the same loss.

His own wife could become a widow, his own children fatherless.

🔥 Wax hot means to grow in intensity

⚖️ The punishment mirrors the exact harm

🔁 The cruelty comes back on his own family

📖 God takes the vulnerable personally

# Exodus 22:25-27
# 💰 Lending Without Usury And Taking A Pledge
---
## 💰 Thou Shalt Not Be To Him As An Usurer

"Usury" means charging interest to profit off someone's debt.

Lending to a poor neighbor was meant to be real help.

It was never supposed to become a way to profit from hardship.

Charging that neighbor extra turned generosity into exploitation.

💰 Usury means charging interest for profit

🤝 Lending was meant to be real help

🚫 Profit off hardship was forbidden

📖 Generosity was not meant to become exploitation

## 🧥 Thou Shalt Deliver It Unto Him By That The Sun Goeth Down

A "pledge" was collateral held until a debt got paid back.

A neighbor's cloak could be taken as that collateral.

For a poor person, that cloak likely doubled as his only blanket.

The law required returning it every single evening so he could sleep.

🧥 A pledge was collateral for a debt

🛏️ A poor man's cloak was his blanket

🌇 It had to return every evening

📖 The law protected basic human comfort

## 🙏 When He Crieth Unto Me, That I Will Hear, For I Am Gracious

This verse explains why the pledge law existed at all.

Keeping someone's only covering overnight caused real suffering.

God says plainly that he hears that kind of cry.

His own character, gracious and attentive, shaped this entire law.

🙏 The law protected against real suffering

👂 God hears the cry of the poor

❤️ Grace shaped this entire command

📖 God's character sits behind every law

# Exodus 22:28-31
# 🙏 Firstfruits, Firstborn, And Holiness
---
## ⚖️ Thou Shalt Not Revile The Gods, Nor Curse The Ruler Of Thy People

"Revile" means to insult someone harshly and openly.

"Gods" here likely refers to judges acting with God given authority.

This command protected both religious and civil leadership from open contempt.

Respect for legitimate authority mattered to God, not just good manners.

⚖️ Revile means to insult harshly

👨‍⚖️ Gods likely means judges here

🏛️ Both religious and civil leaders were protected

📖 Respect for authority mattered to God

## 🌾 Thou Shalt Not Delay To Offer The First Of Thy Ripe Fruits

Giving God the first and best of the harvest was an act of trust.

It happened before anyone knew how the rest of the season would go.

That timing said God came first, ahead of the family's own security.

Delay would have meant giving God the leftovers instead of the best.

🌾 The first fruits came before the rest

🙏 Giving early was an act of trust

👨‍👩‍👧 God came before the family's own security

📖 The best belonged to God first

## 🐑 Seven Days It Shall Be With His Dam

"Dam" means the mother animal.

A newborn animal needed a full week nursing with its mother.

Only on the eighth day could it be offered to God.

This built basic, humane animal care directly into a command about worship.

🐑 Dam means the mother animal

🍼 A newborn nursed a full week first

⏳ The eighth day was the earliest offering

📖 Worship still required humane care

## 🐺 Neither Shall Ye Eat Any Flesh That Is Torn Of Beasts In The Field

Meat from an animal already killed by a predator was considered unclean.

Eating it also carried a real risk to basic health.

Israel had to cast that meat to the dogs instead.

Avoiding it marked God's people as different, set apart, and holy.

🐺 Torn meat came from a predator kill

🤢 Eating it carried a real health risk

🐕 It went to the dogs instead

📖 Holiness shaped even what Israel ate
`.trim();

export const EXODUS_TWENTY_TWO_PERSONAL_SECTIONS = parseExodusTwentyTwoRawNotes(EXODUS_TWENTY_TWO_RAW_NOTES);
