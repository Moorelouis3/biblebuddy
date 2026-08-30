export type EstherNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEstherNineRawNotes(rawText: string): EstherNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EstherNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Esther\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Esther 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Esther\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Esther\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Esther 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Esther 9:${startVerse}` : `Esther 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Esther 9 sections, received " + sections.length);
  }

  return sections;
}

const ESTHER_NINE_RAW_NOTES = `# Esther 9:1-2
# 🔄 The Day That Turned
---
## 📅 The Twelfth Month, That Is, The Month Adar

Adar was the last month of the Hebrew calendar year.

Haman had cast lots back in chapter three to pick this exact day.

Eleven months passed between that lottery and the day finally arriving.

The narrator wants the reader to feel how long the Jews had to wait.

📅 Adar sits at the year's end
🎲 Haman chose this date by casting lots
⏳ Eleven months passed before it arrived
📖 The long wait made the reversal land harder

## 🔄 It Was Turned To The Contrary

The parenthetical in verse one is the real headline of this chapter.

Haman's decree said the enemies of the Jews would have power over them that day.

Instead the opposite happened before a single sword was drawn.

God is never named in this book, yet the reversal still lands exactly where it needed to.

🔄 The parenthetical holds the real headline
⚔️ Haman's decree promised victory to the enemies
🙌 The opposite happened instead
📖 God's hand shows without His name appearing

## ⚔️ To Lay Hand On Such As Sought Their Hurt

This phrase makes clear the Jews were not attacking innocent neighbors.

The king's second decree in chapter eight only allowed action against those already hunting them.

Every fight described in this chapter answers an existing threat, not a new one.

The Jews used the exact self defense that decree granted them, nothing more.

⚔️ The decree allowed defense, not conquest
🎯 Only actual attackers were targeted
📜 Chapter eight's decree set that limit
📖 The Jews fought only what was forced

## 😨 The Fear Of Them Fell Upon All People

This exact wording already appeared once before, in chapter eight verse seventeen.

There the officials feared the Jews after Mordecai's rise to power.

Here ordinary people across the empire feel that same fear on the day of battle.

The reversal promised on paper becomes something the whole empire can feel firsthand.

😨 Fear here echoes chapter eight verse seventeen
🔁 The same phrase returns on purpose
🌍 Now the whole empire feels it
📖 Paper reversal becomes a felt reality

# Esther 9:3-4
# 👑 Mordecai's Shadow Protects Them
---
## 🏛️ The Rulers, The Lieutenants, And The Deputies Helped The Jews

These titles name different ranks in the Persian regional government.

A lieutenant managed a smaller district.

A deputy handled local matters underneath him.

Every layer of government sided with the Jews once Mordecai's decree was known.

Officials rarely risk taking sides unless something forces their hand.

🏛️ Different ranks of officials all helped
📉 A lieutenant ran a smaller district
📋 A deputy handled local matters
📖 Every layer of power took their side

## 😨 The Fear Of Mordecai Fell Upon Them

Mordecai now holds the exact office and ring Haman once held.

Officials fear crossing a man who can end a career with one order.

This same pattern already worked once with Joseph in Egypt centuries earlier.

A foreign born official can rise so high that the whole government moves around him.

😨 Mordecai now controls real royal power
💍 He holds the ring Haman once held
🔁 Joseph's rise in Egypt matches this pattern
📖 One official's rise can move a whole government

## 📈 Mordecai Waxed Greater And Greater

"Waxed" is an old word meaning grew or increased steadily.

His rise did not stop at one high office.

It kept building, month after month, across the whole empire.

He began this book mourning at the palace gate in chapter four.

Now he stands second only to the king himself.

📈 Waxed means grew steadily over time
🏛️ His power kept building empire wide
😢 He once mourned at the palace gate
📖 Now he stands second only to the king

# Esther 9:5-10
# ⚔️ The Ten Sons Of Haman
---
## ⚔️ Smote All Their Enemies With The Stroke Of The Sword

This is the moment the counter decree from chapter eight finally takes effect.

The Jews fight back exactly as that decree allowed them to.

Nothing here is a surprise attack, since the whole empire had months of warning.

Both sides had known this exact day was coming since the letters went out.

⚔️ The counter decree takes effect here
📜 The Jews fight within what it allowed
📅 Both sides knew this day was coming
📖 Warning did not stop the enemies from trying

## 🏰 In Shushan The Palace The Jews Slew Five Hundred Men

Shushan the palace was the fortified royal complex, not the whole city.

Five hundred enemies attacking inside the seat of imperial power is a striking number.

This is where Haman first plotted the whole massacre back in chapter three.

The very ground where the plan was hatched becomes the place it fails hardest.

🏰 Shushan the palace means the royal complex
🔢 Five hundred fell in that one place
📍 Haman plotted his massacre in this same place
📖 The plan failed exactly where it began

## 📛 Parshandatha, Dalphon, Aspatha, And The Rest Of Haman's Sons

Scripture rarely bothers naming minor characters by name.

Listing all ten sons individually marks this as a deliberate, complete ending.

Every branch of Haman's household is accounted for, not just Haman himself.

The text wants the reader to know his whole line ended that day.

📛 Naming all ten marks a complete ending
🌳 Every branch of his household is named
🚫 Haman's own bloodline is now finished
📖 A detailed record like this is never accidental

## 👑 The Son Of Hammedatha, The Enemy Of The Jews

Haman's father's name repeats the ancestry already explained back in chapter three.

Calling him the enemy of the Jews one final time closes the label he wore the whole book.

King Saul was once commanded to wipe out Agag's whole nation and failed to finish the job.

Generations later this moment finally finishes what that command required.

👑 Hammedatha repeats Haman's family line
🏷️ Enemy of the Jews closes his label
📜 Saul once failed to finish this exact command
📖 Generations later the task is finally complete

## 🎁 But On The Spoil Laid They Not Their Hand

Taking spoil after a battle was completely normal and expected in the ancient world.

The Jews had full legal right to take it under their own decree.

They chose not to touch a single item anyway.

Saul lost his kingdom partly for keeping spoil from that same Amalekite nation in First Samuel fifteen.

This time the descendants of that spared enemy line get no such foothold.

🎁 Spoil was legal and fully expected
🙅 The Jews chose to take none
👑 Saul lost his kingdom for keeping Amalekite spoil
📖 This time the enemy gets no foothold

# Esther 9:11-15
# 🙏 Esther Asks For One More Day
---
## 🗣️ What Is Thy Petition, And It Shall Be Granted Thee

The king repeats the same open offer he made back in chapter five and chapter seven.

He lists the numbers first as if the danger is already fully handled.

His tone sounds almost pleased with how the day went.

Esther is about to show him the danger is not actually over yet.

🗣️ The king repeats his open offer again
🔢 He lists numbers like the danger is over
😊 His tone sounds satisfied and confident
📖 Esther is about to correct that assumption

## 🏰 Let It Be Granted To The Jews To Do It Also Tomorrow

Five hundred enemies died inside Shushan, yet Esther says the threat is not finished.

Hidden supporters of Haman likely still remained inside the capital itself.

One day of fighting was not always enough to root out every last threat.

Esther asks for exactly one more day, not open ended violence.

🏰 Danger still remained inside the capital
🕵️ Hidden supporters likely still remained
📅 She asks for one more day only
📖 The request is specific, not open ended

## ⚰️ Let Haman's Ten Sons Be Hanged Upon The Gallows

Haman's ten sons already died in the fighting the day before.

Hanging their bodies publicly was not about killing them again.

It was a public display meant to erase any shame or honor for their memory.

This is the exact gallows Haman built to kill Mordecai in chapter seven.

The very structure meant for Mordecai's death displays Haman's whole family's downfall instead.

⚰️ The sons were already dead by this point
🪧 Hanging the bodies was a public display
🪵 This is Haman's own gallows from chapter seven
📖 His trap displays his family's downfall instead

# Esther 9:16-19
# 📆 Two Cities, Two Days
---
## 🔢 Slew Of Their Foes Seventy And Five Thousand

This number covers every Jewish community across the empire's provinces, not just Shushan.

Seventy five thousand is a massive number for a single day of fighting.

The text repeats one detail from Shushan without changing it here.

They still laid not their hands on the prey, taking no plunder anywhere in the empire.

🌍 This covers every province, not just Shushan
🔢 Seventy five thousand fell in one day
🚫 No plunder was taken anywhere
📖 The same restraint held true empire wide

## ⚔️ Rested, And Made It A Day Of Feasting And Gladness

Provinces outside Shushan fought only on the thirteenth day of Adar.

They rested the very next day, the fourteenth.

That rest became a celebration instead of just a pause.

Feasting turned a day of fear into a permanent day of joy.

⚔️ Provinces fought only on the thirteenth
😌 They rested the very next day
🎉 Rest became celebration, not just a pause
📖 Fear turned into a lasting joy

## 🏰 Assembled Together, And On The Fifteenth Day They Rested

Jews inside Shushan kept fighting one extra day, through the fourteenth.

Their rest landed one day later than everyone else, on the fifteenth.

This gap explains why some cities still celebrate Purim a day later even today.

Walled cities followed Shushan's timing.

Village communities followed everyone else's timing instead.

🏰 Shushan fought one extra day
📆 Their rest fell on the fifteenth instead
🔀 This gap still shapes Purim's calendar today
📖 Walled cities and villages still differ on this

## 🏘️ Made The Fourteenth Day A Good Day, Of Sending Portions

Villages without walls had no reason to add a second day of fighting.

Their single day of celebration became the pattern most Jews still follow.

Sending portions one to another meant sharing food with neighbors and friends.

This small custom becomes the seed of a tradition still practiced at Purim today.

🏘️ Villages needed only the one day
🍽️ Sending portions meant sharing food with others
🎁 A simple custom started here
📖 That custom is still practiced at Purim today

# Esther 9:20-23
# ✍️ Mordecai Establishes Purim
---
## 📜 Mordecai Wrote These Things, And Sent Letters Unto All The Jews

Every earlier letter in this book carried royal political power behind it.

This letter carries something different, a shared memory Mordecai wants preserved forever.

He writes not as a government official this time but as one of the people.

The goal is not survival anymore but remembrance.

📜 Earlier letters carried royal political power
🕯️ This one carries shared memory instead
🤝 Mordecai writes as one of the people
📖 The goal shifts from survival to remembrance

## 🔤 To Stablish This Among Them Yearly

"Stablish" is an old spelling of establish, meaning to make something permanent.

Mordecai is not suggesting a one time party.

He is founding a yearly holiday meant to outlast his own lifetime.

The fourteenth and fifteenth of Adar become fixed dates on the Jewish calendar from this point forward.

🔤 Stablish means to make something permanent
🎊 This is not a one time party
📅 It becomes a fixed yearly holiday
➡️ The calendar itself changes from this point

## 🎁 Days Of Feasting And Joy, And Gifts To The Poor

This verse names two customs that still mark Purim today.

Sending portions became known later as mishloach manot, gift baskets shared between friends.

Gifts to the poor became known as matanot laevyonim, a duty to include everyone in the joy.

Nobody celebrates alone and nobody is forgotten in the celebration.

🎁 Sending portions became mishloach manot
💰 Gifts to the poor became matanot laevyonim
🤗 Nobody was meant to celebrate alone
📖 Everyone was included in the joy

# Esther 9:24-28
# 📜 Why It Is Called Purim
---
## 🎲 Had Cast Pur, That Is, The Lot

This sentence repeats the exact explanation already given back in chapter three.

"Pur" was a small object, similar to a modern die, used to select a date by chance.

Haman trusted random chance to pick the day of his revenge.

The whole book quietly shows that nothing about that day was actually left to chance.

🎲 Pur means a lot, like a die
📅 Haman used it to pick his date
🍀 He trusted random chance for his plan
📖 Nothing here was truly left to chance

## 💀 His Wicked Device Should Return Upon His Own Head

Haman planned complete destruction for an entire people.

That exact plan instead fell back onto him and his own family.

This is the same pattern already seen with the gallows he built for Mordecai.

The story keeps repeating one lesson, that harm aimed at others often returns to the sender.

💀 Haman planned destruction for a whole people
🔁 That plan fell back on him instead
🪵 The same pattern already happened with his gallows
📖 Harm aimed outward often returns to the sender

## 🎲 They Called These Days Purim After The Name Of Pur

The holiday's name literally means lots, in the plural.

Naming a joyful holiday after the very tool of the enemy's plan is deliberate.

It keeps the origin of the danger permanently attached to the celebration of surviving it.

Every time someone says the word Purim they are naming Haman's own gamble.

🎲 Purim literally means lots, plural
🎉 A joyful feast keeps its origin
🔗 The danger and the celebration stay linked
📖 Saying Purim names Haman's own gamble

## ♾️ These Days Of Purim Should Not Fail From Among The Jews

This is a promise about permanence, not just a description of one festival.

"Seed" here means future generations, descendants not yet born.

Purim is still celebrated today, thousands of years after this promise was written.

The promise made in this single verse has held for the entire span of Jewish history since.

♾️ This promises permanence, not one festival
👶 Seed means future generations not yet born
📆 Purim is still kept thousands of years later
📖 One verse's promise has held for centuries

# Esther 9:29-32
# 🖋️ Esther And Mordecai Confirm It In Writing
---
## 👨‍👧 Esther The Queen, The Daughter Of Abihail

Abihail was already named as Esther's father back in chapter two.

Repeating his name here reminds the reader she is still Mordecai's own family.

She signs this letter with both her father's name and her royal title together.

Both identities work together to make this decree stick.

👨‍👧 Abihail was named back in chapter two
👑 Esther signs with both name and title
🤝 Family identity and royal power combine here
📖 Both together make this decree stick

## 🗺️ Sent The Letters Unto The Hundred Twenty And Seven Provinces

This exact number of provinces already appeared at the very start of the book.

Chapter one opened with a feast celebrating that same vast empire.

The empire that once hosted Vashti's downfall now carries the Jews' rescue to its farthest edges.

Nothing about the empire's size changed, only what its letters now carried.

🗺️ The same province count opened the book
👑 Chapter one's feast celebrated this same empire
🔁 The empire's reach now carries rescue instead
📖 Only the message inside the letters changed

## 🕊️ With Words Of Peace And Truth

Every earlier decree in this book carried threat, danger, or urgent warning.

This is the first letter in the whole story described as peaceful.

"Truth" here means the account is accurate, not exaggerated for effect.

The book that opened with a king's anger closes with an honest, peaceful letter instead.

⚔️ Earlier decrees all carried threat or urgency
🕊️ This is the first peaceful letter
✅ Truth means the account is accurate
📖 Anger opened the book, peace closes it

## ✅ The Decree Of Esther Confirmed These Matters

This is the last official act attributed to Esther in the whole book.

The word confirmed means it settled any doubt about Purim's authority for good.

Written in the book means it entered a permanent historical record, not just a spoken agreement.

Esther began the book with no political power at all and ends it writing law.

✅ This is Esther's final act in the book
📜 Confirmed means all doubt is settled
🗄️ Written in the book means a lasting record
📖 She began with no power, ends writing law
`.trim();

export const ESTHER_NINE_PERSONAL_SECTIONS = parseEstherNineRawNotes(ESTHER_NINE_RAW_NOTES);
