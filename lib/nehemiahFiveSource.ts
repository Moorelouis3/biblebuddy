export type NehemiahFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNehemiahFiveRawNotes(rawText: string): NehemiahFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NehemiahFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nehemiah\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nehemiah 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nehemiah\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Nehemiah\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nehemiah 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nehemiah 5:${startVerse}` : `Nehemiah 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Nehemiah 5 sections, received " + sections.length);
  }

  return sections;
}

const NEHEMIAH_FIVE_RAW_NOTES = `# Nehemiah 5:1-5
# 😭 A Cry Of Hunger And Debt
---
## 😭 Against Their Brethren The Jews

Their brethren the Jews does not mean a foreign enemy.

It means the wealthier nobles and rulers among their own people.

The wall was rising fast, but ordinary families were falling behind at the same time.

This cry breaks out from inside the very people building the wall.

The real threat to Jerusalem was no longer only outside the gate.

😭 Their brethren means wealthier Jewish nobles
🏗️ The wall rose as families fell behind
⚔️ This danger came from inside the camp
📖 Enemies are not the only threat

---

## 🌾 We, Our Sons, And Our Daughters, Are Many

This complaint comes from families with many children to feed.

More children meant more grain was needed just to survive.

Corn in this verse means grain in general, not a single vegetable.

These families were not asking for luxury or comfort.

They were asking only to eat and stay alive.

👨‍👩‍👧‍👦 Large families needed more grain
🌾 Corn here means grain in general
🍞 They only asked to eat and live
📖 Basic survival was already slipping away

---

## 📜 We Have Mortgaged Our Lands, Vineyards, And Houses

To mortgage something means pledging it as security for a loan.

These families had no money left, so they pledged the only property they owned.

A dearth is a severe shortage of food, close to a famine.

Land, vineyards, and homes were being handed over just to buy grain.

For a farming family, that property was their entire future.

📜 Mortgaged means pledged as loan security
🌾 Dearth means a severe food shortage
🏡 Land was traded away just for grain
📖 Their whole future was on the line

---

## 👑 Borrowed Money For The King's Tribute

Tribute here means a tax owed to the Persian king, Artaxerxes.

Every province under Persian rule paid this tax no matter the local hardship.

The famine had already drained these families, yet the tax bill still came due.

So they borrowed money against their own land just to cover it.

A government tax does not pause because people are starving.

👑 Tribute means tax owed to the king
💰 The tax came due despite the famine
🏡 Land was pledged just to pay it
📖 A tax bill ignores real hardship

---

## ⛓️ We Bring Into Bondage Our Sons And Our Daughters

Bondage here means slavery, working off a debt with no freedom.

These parents were forced to hand their own children over as unpaid servants.

Verse five says plainly that these children share the same blood as the nobles now enslaving them.

The families had no power left to redeem them, meaning no money to buy them back.

Debt had turned neighbor against neighbor and parent against child.

⛓️ Bondage means slavery to pay a debt
👨‍👩‍👧 Their own children were handed over
💸 They had no money to buy them back
📖 Debt turned family against family

# Nehemiah 5:6-8
# 😠 Nehemiah's Rebuke
---
## 😠 I Was Very Angry When I Heard Their Cry

Nehemiah does not hide his anger or explain it away.

Hearing that families were selling their own children broke something in him at once.

This anger was not a loss of control.

It became the fuel for the confrontation in the very next verse.

Righteous anger here moves a person toward action, not away from it.

😠 Nehemiah felt real, immediate anger
👂 Hearing the cry triggered it directly
🔥 His anger became fuel, not chaos
📖 Righteous anger leads to action

---

## 💰 Ye Exact Usury, Every One Of His Brother

Usury means charging interest on a loan, often at an unfair rate.

Under the law of Moses, Jews were forbidden to charge interest to fellow Jews.

The nobles and rulers had been doing exactly that to their own struggling neighbors.

Nehemiah does not raise this quietly in private.

He calls together a great public assembly to confront them directly.

💰 Usury means charging unfair interest
📜 The law forbid this between Jews
⚖️ The nobles broke that law openly
📖 Nehemiah confronted them in public

---

## 🕊️ Will Ye Even Sell Your Brethren

Nehemiah reminds the nobles of something they had conveniently forgotten.

He and others had spent their own money buying Jewish captives back from foreign nations.

Now those same freed people were being resold into slavery by their own countrymen.

Faced with this accusation, the nobles have nothing to say.

Their silence in this moment is close to a confession.

🕊️ Some Jews had been bought back from exile
🔄 Their own people were now reselling them
🤐 The nobles had no answer to give
📖 Silence here was an admission of guilt

# Nehemiah 5:9-13
# 🤝 The Promise To Restore
---
## 👀 Ought Ye Not To Walk In The Fear Of Our God

Nehemiah widens the argument beyond simple fairness.

He connects the nobles' greed directly to how surrounding nations viewed God's people.

Reproach means public shame, brought on by the enemies who were watching this behavior.

Their conduct was never only a private matter between lender and borrower.

It reflected on God himself in the eyes of every watching nation.

👀 Enemies were watching how Israel treated its own
😔 Reproach means public shame
🙏 Fearing God should shape daily fairness
📖 Their actions reflected on God's own name

---

## 🙋 Let Us Leave Off This Usury

Nehemiah admits that he and his own household had also lent money and grain.

He does not exempt himself from the correction he is demanding.

Leave off simply means stop, starting now, not gradually.

He asks the nobles to hold themselves to the same standard he accepts.

A leader asking others to change carries more weight once he changes first.

🙋 Nehemiah admits he had also lent money
🛑 Leave off means stop immediately
⚖️ He holds himself to the same standard
📖 Leading by example carries real weight

---

## 🏡 Their Lands, Their Vineyards, Their Oliveyards, And Their Houses

Nehemiah does not ask for a small gesture.

He demands every piece of property taken as collateral be handed back the same day.

An oliveyard is simply a grove of olive trees, a valuable crop in this region.

He also demands the interest already collected in money, corn, wine, and oil be returned.

Full restoration, not a partial fix, is what he demands.

🏡 Every pledged property gets returned
🌳 An oliveyard is a grove of olive trees
💰 All the collected interest gets returned too
📖 Nehemiah demands full restoration

---

## 🤝 Then I Called The Priests, And Took An Oath Of Them

The nobles agree in words, promising to restore everything and charge nothing more.

Nehemiah does not simply trust a spoken promise.

He calls in the priests and makes the nobles swear a formal oath before witnesses.

A spoken promise and a sworn oath did not carry the same weight in this culture.

Turning agreement into oath made the promise far harder to walk back later.

🤝 The nobles agreed to restore everything
🙏 Nehemiah still required a formal oath
👀 Priests witnessed the sworn promise
📖 An oath is harder to break

---

## 👕 Shake Out Every Man From His House

Nehemiah performs a visual warning to make the oath impossible to forget.

He shakes out the fold of his own garment, the part used to carry things.

The gesture pictures a man being emptied out completely, the same way the garment now is.

Anyone who broke this promise, Nehemiah says, should end up shaken out and emptied just like it.

The whole assembly answers with one word, Amen, meaning let it be so.

👕 Nehemiah shakes out his own garment
🫳 The gesture pictures a man emptied out
⚠️ It warned what breaking the oath would cost
📖 The crowd sealed it with one word

# Nehemiah 5:14-16
# 👑 Nehemiah's Example As Governor
---
## 🍞 I And My Brethren Have Not Eaten The Bread Of The Governor

Every governor before Nehemiah collected a regular food allowance straight from the people.

That allowance is what the bread of the governor refers to.

Nehemiah says plainly that for twelve full years he never once took it.

Twelve years is not a short season of good behavior.

It covers his entire time in this office, without exception.

🍞 Bread of the governor means an official allowance
👑 Past governors always claimed this allowance
🙅 Nehemiah refused it for his whole term
📖 Twelve years of consistent restraint

---

## 💰 The Former Governors That Had Been Before Me Were Chargeable Unto The People

Chargeable here means the earlier governors were a financial burden on the people.

They took bread, wine, and forty shekels of silver on top of normal supplies.

A shekel was a unit of silver weight, so forty shekels was a real, heavy tax.

Their own servants treated the people harshly too.

Nehemiah refused every part of that pattern because of his fear of God.

💰 Chargeable means a financial burden
🥈 Forty shekels was a heavy tax in silver
👎 Their servants treated people harshly too
📖 Nehemiah broke that pattern out of fear

---

## 🧱 I Continued In The Work Of This Wall

Nehemiah had every chance to use his position for personal gain.

Instead he stayed focused entirely on finishing the wall.

He and his own servants worked construction alongside everyone else.

A governor could easily have stood back and only given orders.

Nehemiah chose the harder, more costly path instead.

🧱 Nehemiah stayed focused on the wall
🚫 He never used his office to gain land
👷 His own servants worked construction too
📖 He chose the harder path over comfort

# Nehemiah 5:17-19
# 🍽️ A Costly Open Table
---
## 🍽️ An Hundred And Fifty Of The Jews And Rulers

Nehemiah kept an enormous household table running every single day.

An hundred and fifty guests, plus visitors from surrounding nations, ate at his expense regularly.

Feeding a crowd that size required serious wealth and constant effort.

This was not a small act of hospitality.

It was a massive, ongoing personal cost that Nehemiah carried without complaint.

🍽️ Nehemiah fed about a hundred and fifty daily
👥 Officials and foreign visitors were included
💰 This required serious ongoing wealth
📖 Generosity here came at a real cost

---

## 🐂 One Ox And Six Choice Sheep

This verse lists the actual daily cost of Nehemiah's table.

One ox and six of the best sheep were prepared fresh every single day.

Every ten days, a full new supply of wine was brought in as well.

Despite this expense, Nehemiah still refused to claim the governor's official allowance.

He absorbed a massive cost so the already burdened people would not have to pay it.

🐂 One ox was prepared fresh daily
🐑 Six choice sheep were served too
🍷 Wine was restocked every ten days
📖 Nehemiah paid this himself, not the people

---

## 🙏 Think Upon Me, My God, For Good

Nehemiah ends the chapter with a short, personal prayer.

He is not asking for public praise or recognition from the people.

He simply asks God to remember everything he has done for them.

This same kind of prayer appears again later in the book.

It reveals a leader who served for God's approval, not human applause.

🙏 Nehemiah prays a short personal request
👤 He seeks God's approval, not public praise
🔁 This same prayer pattern returns later
📖 Quiet faithfulness still hopes to be seen
`.trim();

export const NEHEMIAH_FIVE_PERSONAL_SECTIONS = parseNehemiahFiveRawNotes(NEHEMIAH_FIVE_RAW_NOTES);
