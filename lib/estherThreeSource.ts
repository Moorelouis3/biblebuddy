export type EstherThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEstherThreeRawNotes(rawText: string): EstherThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EstherThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Esther\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Esther 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Esther\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Esther\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Esther 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Esther 3:${startVerse}` : `Esther 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Esther 3 sections, received " + sections.length);
  }

  return sections;
}

const ESTHER_THREE_RAW_NOTES = `# Esther 3:1-4
# 👑 Haman Rises, Mordecai Refuses To Bow
---
## 📈 Advanced Him, And Set His Seat Above All The Princes

Being advanced here means Haman received the highest rank any official under the king could hold.

His new seat placed him above every other prince in the empire.

This title functioned much like a modern prime minister answering only to the king himself.

No one in Persia now outranked Haman except Ahasuerus.

📈 Haman received the highest rank

👑 His seat sat above every prince

🏛️ The role worked like a prime minister

📖 Only the king outranked him

## 🗡️ Haman The Son Of Hammedatha The Agagite

Agagite ties Haman's family line back to Agag, a king of the Amalekites.

The Amalekites had been Israel's bitter enemies since the exodus out of Egypt.

King Saul was once commanded to defeat Agag and his whole people.

Haman descending from that same line makes this conflict older than either man realizes.

🗡️ Agagite links Haman to Agag

⚔️ The Amalekites were Israel's old enemy

👑 Saul once fought that same line

📖 This feud is centuries old

## 🙇 Bowed, And Reverenced Haman

Bowing to a high official was a normal court custom in the Persian empire.

The king had personally commanded that everyone show Haman this honor.

Refusing was not simply rude, it was disobeying a direct royal order.

Every servant at the king's gate followed this command without hesitation.

🙇 Bowing honored a high official

👑 The king commanded this himself

🚫 Refusing meant disobeying the king

📖 Every servant obeyed except one

## 🚫 Mordecai Bowed Not, Nor Did Him Reverence

This does not mean Mordecai was simply being stubborn or rude.

Bowing to Haman likely felt to Mordecai like honoring Israel's ancient enemy.

Many scholars believe his Jewish faith and history made this bow impossible for him.

One man's silent refusal is about to set the whole chapter in motion.

🚫 Mordecai refused to bow

🕎 His faith and history were at stake

⚔️ Haman represented an old enemy

📖 This refusal starts the chapter's conflict

## ❓ Why Transgressest Thou The King's Commandment

Transgressest is an old word meaning to break or disobey a command.

The king's own servants noticed Mordecai's refusal before Haman ever did.

They questioned him directly, giving him repeated chances to simply comply.

Mordecai never answered with an excuse, only with his identity.

❓ Transgressest means to disobey

👀 Servants noticed the refusal first

🔁 They questioned him repeatedly

📖 He never made an excuse

## 🕎 He Had Told Them That He Was A Jew

Mordecai's identity, not his manners, was the real reason he would not bow.

Declaring himself a Jew openly explained his refusal without asking for permission.

This is the first time in the book his faith is named as the cause.

That single fact is about to endanger every Jewish person in the empire.

🕎 Mordecai named his identity

🙅 His faith explained the refusal

🆕 The first time faith is the reason

📖 One man's faith now endangers many

# Esther 3:5-6
# 😡 Haman's Wrath Becomes A Plan To Destroy A People
---
## 😡 Then Was Haman Full Of Wrath

Wrath here means a deep, burning fury, not simple annoyance.

The same word described Ahasuerus after Vashti refused him back in chapter one.

One official's small refusal produced the same intensity of anger as a queen's public defiance.

Haman's pride could not absorb being ignored by a single man.

😡 Wrath means burning fury

👑 The same word described the king's anger

🪞 A small refusal triggered a huge reaction

📖 Haman's pride could not take it

## 😤 He Thought Scorn To Lay Hands On Mordecai Alone

Thought scorn means Haman considered the idea beneath him.

Punishing only Mordecai suddenly felt far too small for his wounded pride.

One man's death would not satisfy the insult Haman believed he had suffered.

His anger was already reaching far beyond a single person.

😤 Thought scorn means considered beneath him

🎯 Punishing one man felt too small

💔 His pride demanded more

📖 His anger was already spreading

## 📢 They Had Shewed Him The People Of Mordecai

Shewed is an old spelling of showed or told.

Someone in the court informed Haman that Mordecai belonged to the Jewish people.

That single piece of information reshaped Haman's entire plan for revenge.

A personal grudge was about to become a plan against an entire nation.

📢 Shewed means told or informed

🗣️ Someone revealed Mordecai's people

🔄 The information reshaped his plan

📖 A grudge became a national threat

## ☠️ Haman Sought To Destroy All The Jews Throughout The Whole Kingdom

This is the moment the story turns from personal insult to attempted genocide.

Haman's target was no longer one man but every Jewish person in the Persian empire.

The kingdom stretched across dozens of provinces and many different peoples.

One official's wounded pride now threatened to erase an entire nation.

☠️ The target became every Jew

🌍 The empire spanned many provinces

💔 Pride escalated into genocide

📖 One man's anger threatened a nation

# Esther 3:7
# 🎲 Casting Lots To Choose A Day
---
## 🎲 They Cast Pur, That Is, The Lot

Pur was the Persian word for a lot, an object cast like dice to make a decision.

Casting lots was a common way ancient peoples believed they could learn a god's will.

This word Pur is exactly where the festival of Purim later gets its name.

A random throw of an object was about to decide a fate for millions.

🎲 Pur means the lot

🙏 Lots were believed to reveal a god's will

🎉 Purim is named after this word

📖 A random throw shaped a huge fate

## 📅 In The Twelfth Year Of King Ahasuerus

This dates the scene about five years after Esther was crowned queen in chapter two.

Years had passed quietly while Esther lived as queen without her identity being known.

That gap of time explains why Mordecai's earlier good deed had already been forgotten.

The story is now entering its most dangerous chapter yet.

📅 Five years had passed since chapter two

👑 Esther had been queen the whole time

🤫 Her identity was still hidden

📖 The story enters its most dangerous turn

## 🗓️ From Month To Month, To The Month Adar

Adar was the twelfth and final month on the ancient Hebrew calendar.

Casting lots repeatedly across many months was meant to find the luckiest possible day.

That superstitious search accidentally gave the Jewish people nearly a full year of warning.

A practice meant to seal their fate ended up buying them time instead.

🗓️ Adar was the final month

🎯 The lots searched for a lucky day

⏳ It gave almost a year of warning

📖 Superstition accidentally bought them time

# Esther 3:8-9
# 🗣️ Haman Makes His Case To The King
---
## 🌍 There Is A Certain People Scattered Abroad And Dispersed

Haman never once says the word Jews out loud to the king.

Calling them a certain people let him accuse an entire nation without naming it plainly.

This vague language made the accusation sound like a report, not a personal grudge.

Leaving out the name made the lie easier for the king to accept.

🌍 Haman never says Jews aloud

🗣️ Vague language hid his motive

📋 It sounded like a report

📖 Leaving out the name helped the lie

## ⚖️ Their Laws Are Diverse From All People

Diverse here means different, not disorganized or inferior.

Haman used the Jewish people's distinct customs and worship as proof of disloyalty.

Being different was reframed as being dangerous to the whole kingdom.

This same tactic has been used against minority groups throughout history.

⚖️ Diverse means different

🕎 Their customs were used as evidence

🚨 Different was framed as dangerous

📖 This tactic repeats throughout history

## 💰 It Is Not For The King's Profit To Suffer Them

Suffer here means to allow or tolerate, not to feel pain.

Haman argued the king was financially losing out by letting the Jews remain.

Framing genocide as a budget decision made it easier for the king to approve.

Real people's lives were reduced to a line in an economic argument.

💰 Suffer means allow or tolerate

📉 Haman framed it as a money issue

🧾 Genocide became a budget decision

📖 Real lives were reduced to numbers

## 🪙 I Will Pay Ten Thousand Talents Of Silver

A talent was a unit of weight, and ten thousand talents was an almost unthinkable amount of silver.

Many scholars believe this sum equaled a massive share of the entire empire's yearly income.

Haman was willing to personally fund the killing out of his own wealth.

That size of bribe shows exactly how badly he wanted this decree approved.

🪙 A talent was a unit of weight

💵 The sum was almost unthinkably large

🏦 It may have rivaled royal income

📖 The bribe reveals his determination

# Esther 3:10-11
# 💍 The King Hands Over His Ring
---
## 💍 The King Took His Ring From His Hand, And Gave It Unto Haman

The king's ring was a signet, a personal seal used to make any document official.

Handing it over gave Haman the power to write laws in the king's own name.

Ahasuerus transferred enormous authority in a single, casual gesture.

No official record shows the king asking a single follow up question.

💍 The ring was the king's signet

✍️ It let Haman write official laws

👑 Huge authority changed hands instantly

📖 The king asked no questions

## 🎯 The Jews' Enemy

The narrator stops here to name Haman plainly for the very first time.

Up to this point the text only described his anger and his plan.

Now the story calls him exactly what he has become.

This label follows Haman for the rest of the book.

🎯 The narrator names Haman directly

📜 Earlier verses only described his plan

🏷️ The label sticks for the whole book

📖 The story now has a clear villain

## 🪙 The Silver Is Given To Thee, The People Also

This does not necessarily mean the king refused the bribe money.

Many scholars believe the king waved off the payment as unnecessary, not unwanted.

Either way, an entire people's fate was handed over in the very same sentence.

The silver and the lives were treated with the exact same weight.

🪙 The bribe may have been waved off

🤷 The king barely paused over it

⚖️ People and silver got equal weight

📖 A nation's fate was handed away

## 🙌 To Do With Them As It Seemeth Good To Thee

The king gave Haman total freedom over an entire people's fate.

No investigation happened, and no name was ever confirmed.

Ahasuerus trusted one angry official completely, without checking a single fact.

That carelessness is exactly what makes this decree possible.

🙌 Haman got total freedom

🔍 No investigation ever happened

🤝 The king trusted him blindly

📖 Carelessness made the decree possible

# Esther 3:12-15
# 📜 The Decree Goes Out Across The Empire
---
## ✍️ Written According To All That Haman Had Commanded

This does not say the king personally wrote or even reviewed the decree.

Haman dictated every word, and the scribes simply recorded his commands.

The king's name went on a document he likely never read closely.

Real power in this scene belonged to Haman, not to the throne.

✍️ Haman dictated every word

📜 Scribes only recorded his orders

👑 The king's name was just attached

📖 Real power belonged to Haman

## 🔏 Sealed With The King's Ring

Sealing meant pressing the signet ring into wax to make a document legally binding.

Once sealed, a Persian royal decree could never be canceled by anyone, even the king.

That permanence is a detail the rest of the book depends on completely.

A single wax impression just made this decree unstoppable.

🔏 Sealing made the decree official

🚫 Persian law could not undo it

⏳ This permanence matters later

📖 One seal made it unstoppable

## 🗺️ To Every People After Their Language

The Persian empire stretched across many nations, each with its own spoken language.

Sending the decree in every regional language shows just how vast this threat was.

Nothing about this order was small, local, or easy to escape.

Every province, in its own tongue, received the same death sentence.

🗺️ The empire held many languages

📨 The decree was translated for each one

🌍 The threat reached everywhere

📖 No province could escape it

## ⚔️ To Destroy, To Kill, And To Cause To Perish, All Jews, Both Young And Old

Stacking three separate words for killing was a deliberate way to leave no room for mercy.

Naming both young and old made clear that no age offered any protection.

This was not written as a warning, but as a complete plan.

The language itself was built to guarantee total destruction.

⚔️ Three words for killing were stacked

👶 Young and old were both included

🚫 No age offered protection

📖 The wording aimed for total destruction

## 💰 To Take The Spoil Of Them For A Prey

Spoil and prey both mean the property and belongings left behind after a killing.

The decree legally allowed anyone to keep whatever their victims owned.

That detail gave ordinary citizens a financial reason to take part.

Greed was written directly into the plan alongside the violence.

💰 Spoil meant the victims' property

🏠 Killers could legally keep it

🤑 It gave citizens a motive to join

📖 Greed was built into the plan

## ⏳ That They Should Be Ready Against That Day

Ready against that day means the whole empire had months to prepare in advance.

The gap between this decree and the chosen day in Adar stretched nearly eleven months.

Jewish families across the empire now had to live with that date hanging over them.

That long wait is its own kind of cruelty, separate from the violence itself.

⏳ Nearly eleven months of advance notice

😨 Families lived under that deadline

🕰️ The wait was its own cruelty

📖 Dread stretched out for months

## 🍷 The King And Haman Sat Down To Drink

This scene deliberately echoes the drinking feasts back in chapter one.

Two powerful men celebrated calmly on the very day they doomed a whole people.

Nothing about their evening reflected the weight of what they had just signed.

Their comfort stands in sharp contrast to what comes at the end of this verse.

🍷 The scene echoes chapter one's feasts

😌 Two men celebrated calmly

⚖️ Their comfort ignored the decree's weight

📖 Their calm contrasts with the next line

## 😟 The City Shushan Was Perplexed

Perplexed means confused and deeply troubled, not simply surprised.

Ordinary people in the capital reacted with distress the moment the decree spread.

Common citizens sensed the horror of this order even while the king felt nothing.

That gap between the throne room and the streets closes this chapter on a chilling note.

😟 Perplexed means deeply troubled

🏙️ The city reacted with real distress

👑 The king felt none of it

📖 The chapter ends on that gap
`.trim();

export const ESTHER_THREE_PERSONAL_SECTIONS = parseEstherThreeRawNotes(ESTHER_THREE_RAW_NOTES);
