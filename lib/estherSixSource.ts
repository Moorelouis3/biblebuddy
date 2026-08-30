export type EstherSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEstherSixRawNotes(rawText: string): EstherSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EstherSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Esther\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Esther 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Esther\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Esther\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Esther 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Esther 6:${startVerse}` : `Esther 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Esther 6 sections, received " + sections.length);
  }

  return sections;
}

const ESTHER_SIX_RAW_NOTES = `# Esther 6:1-3
# 😴 A Sleepless Night Reveals A Debt
---
## 😴 On That Night Could Not The King Sleep

This was not ordinary insomnia catching up with a busy king.

The timing lands right after Esther's first banquet with Haman.

It also lands the night before Haman plans to ask for Mordecai's death.

Nothing in the text explains why sleep left the king that night.

The reader is meant to feel God working through an unexplained detail.

😴 Sleep left the king that night
🍽️ It follows Esther's first banquet
🪓 It precedes Haman's plan for Mordecai
📖 An unexplained detail carries God's hand

## 📜 The Book Of Records Of The Chronicles

The book of records of the chronicles was the king's official daily log.

Persian kings kept a written record of notable events and loyal service.

Reading it aloud was one common way to pass a sleepless night.

Whatever happened to be on that page that night was no accident.

📜 The chronicles were the king's official log
👂 Reading them aloud passed a sleepless night
🎯 Loyal service got recorded there too
📖 That night's page was no accident

## 🚪 Two Of The King's Chamberlains

Bigthana and Teresh were two of the king's personal chamberlains.

A chamberlain managed the king's private chambers and guarded his access.

These two also guarded the door closest to the king's own room.

Esther chapter two already told this exact story when it happened.

🚪 Chamberlains guarded the king's private chambers
👥 Bigthana and Teresh guarded his door
🔁 Esther chapter two told this story first
📖 Old loyalty is about to matter again

## ⚔️ Who Sought To Lay Hand On The King Ahasuerus

"To lay hand on" means to physically attack or assassinate.

Bigthana and Teresh had plotted to kill King Ahasuerus himself.

Mordecai overheard the plan and reported it before it could happen.

His loyalty that day saved the king's life.

⚔️ Lay hand on means to attack
🗡️ Bigthana and Teresh plotted murder
👂 Mordecai overheard and reported the plot
📖 His loyalty saved the king's life

## 🦸 There Is Nothing Done For Him

Mordecai exposed a real assassination plot and saved the king's life.

A reader might assume a hero like that was rewarded right away.

The servants confirm the opposite happened.

Nothing was ever done to thank or repay him.

That gap has been sitting unnoticed until this exact night.

🦸 Mordecai saved the king's life
❌ No reward was ever given
⏳ Years passed with the debt unpaid
📖 That forgotten debt is about to matter

# Esther 6:4-6
# 😏 Haman Walks Into His Own Question
---
## ❓ Who Is In The Court

The king interrupts the reading to ask a practical question.

He wants a noble on hand to help decide Mordecai's reward.

The hour is likely very early morning, before the business day begins.

Whoever happens to be there next is no accident either.

❓ The king asks who is nearby
👑 He wants a noble to help decide
🌅 The hour is very early morning
📖 The timing keeps lining up perfectly

## 🚪 Haman Was Come Into The Outward Court

"Outward court" means a different, less guarded area than the inner court.

Esther risked her life entering the inner court back in chapter five.

Haman walked into the outward court on his own, unannounced.

He came early because he could not wait to ask for Mordecai's death.

🚪 Outward court means a less guarded area
👑 Esther risked the inner court in chapter five
😤 Haman came on his own, unannounced
📖 He could not wait to act

## 🪓 To Hang Mordecai On The Gallows That He Had Prepared

This gallows is the same one built at the end of chapter five.

Zeresh suggested it, and Haman ordered it built that very night.

Haman came to ask the king's permission to use it on Mordecai.

He has no idea the king is about to ask him something else first.

🪓 This is the gallows from chapter five
👥 Zeresh suggested it, Haman built it
🎯 Haman wants permission to use it
📖 A different question is coming first

## ❓ What Shall Be Done Unto The Man Whom The King Delighteth To Honour

This single question turns the whole chapter.

The king does not yet say who the man is.

He genuinely wants Haman's honest advice on how to honor someone.

Every word that follows will be used against the very man giving the advice.

❓ One question changes the whole chapter
🤫 The king does not name the man
💭 He wants Haman's honest advice
📖 Haman's own words will trap him

## 😏 To Whom Would The King Delight To Do Honour More Than To Myself

Haman thinks this question can only be about him.

His pride fills in the blank before the king says another word.

That single wrong assumption is about to shape everything he says next.

The reader already knows the honor is meant for Mordecai instead.

😏 Haman assumes the honor is for him
💭 Pride fills in the blank for him
⚠️ That wrong guess shapes what comes next
📖 The honor is really for Mordecai

# Esther 6:7-9
# 👑 Haman Describes The Ultimate Honor
---
## 👑 The Royal Apparel Which The King Useth To Wear

Wearing the king's own clothing was a rare, enormous honor in Persia.

Ordinary people were never allowed to wear anything the king had worn himself.

Haman suggests this thinking he is describing his own future reward.

Every detail he lists here will end up on Mordecai instead.

👑 The king's own robe was rare
🚫 Nobody normally wore the king's clothes
😏 Haman pictures himself wearing it
📖 Mordecai receives it instead

## 🐎 The Horse That The King Rideth Upon

Riding the king's personal horse carried the same rare honor as his robe.

That horse had never been ridden by anyone but the king himself.

Letting another man ride it in public announced the king's highest favor.

Haman still believes every word of this praise is about to land on him.

🐎 The king's horse was never shared
🚫 Only the king had ridden it
📢 Riding it announced the king's favor
📖 Haman still expects it for himself

## 👑 The Crown Royal Which Is Set Upon His Head

Many scholars believe this crown was set on the horse's head, not the man's.

Persian custom sometimes dressed the king's own horse in a royal headdress.

The text leaves the exact picture a little open.

Either way, this honor ranks just below the king himself.

👑 Many scholars place the crown on the horse
🐎 Persian horses sometimes wore a royal headdress
❓ The text leaves the picture a little open
📖 This honor ranks just below the king

## 👑 One Of The King's Most Noble Princes

Haman insists a top noble, not a servant, must do the honoring.

That detail matters because Haman clearly pictures himself as that noble.

He wants the honor performed by someone important, since he assumes it is for him.

The king is about to hand that exact job to Haman himself.

👑 A top noble must do the honoring
😏 Haman pictures himself as that noble
🎯 He wants someone important to lead it
📖 The king hands that job to Haman

## 📢 Proclaim Before Him

A royal proclaim was a herald calling out words for the whole street to hear.

This turns a private reward into a loud, public announcement.

Everyone in the city would see and hear the honor happen.

Haman is designing the most public celebration he can imagine, for himself.

📢 A herald called out the news aloud
🏙️ The whole city would see and hear
🎉 Haman wants maximum public celebration
📖 He designs it thinking of himself

# Esther 6:10-11
# 😱 The Honor Turns On Haman
---
## 😱 Do Even So To Mordecai The Jew

The king names the man Haman must honor, and it is Mordecai.

Every single word Haman just described now belongs to his enemy instead of to him.

The king calls him "Mordecai the Jew," the same identity Haman hates most.

This is the exact reversal the whole chapter has been building toward.

😱 Mordecai is the man to honor
🔄 Haman's own words now reward his enemy
✡️ The king names him Mordecai the Jew
📖 The whole chapter turns right here

## 🚪 That Sitteth At The King's Gate

Mordecai has been sitting at the same gate since chapter two.

Haman walks past that gate every day without seeing Mordecai's real value.

The king remembers exactly where to find him without being told twice.

A position Haman saw as beneath him turns out to matter most.

🚪 Mordecai still sits at the same gate
👀 Haman never saw his real value
🎯 The king knows exactly where to find him
📖 A lowly seat mattered most after all

## 📜 Let Nothing Fail Of All That Thou Hast Spoken

The king holds Haman to every single word he just said.

Haman cannot quietly water down the honor now that it is not for him.

His own plan for glory becomes the exact trap he must carry out.

There is no way for Haman to back out of his own words.

📜 The king holds him to his own words
🪤 His plan becomes his own trap
🚫 Haman cannot back out now
📖 His words carry out his enemy's honor

## 👔 Brought Him On Horseback Through The Street Of The City

Haman personally dresses the man he wanted dead just hours earlier.

He leads Mordecai's horse through the same streets where the gallows now stands unused.

Every step of this parade is led by Haman's own hands.

Pride built this entire scene, and pride is the one paying for it.

👔 Haman personally dresses his enemy
🐎 He leads Mordecai's horse himself
🪓 The unused gallows stands nearby
📖 Haman's own pride pays the price

# Esther 6:12-14
# 🌙 Zeresh Warns Of A Fall To Come
---
## 🚪 Mordecai Came Again To The King's Gate

Mordecai returns to the same quiet spot he sat in before.

He does not chase after more praise or celebrate the moment.

The public honor does not seem to change him at all.

His steady character stands out next to Haman's swinging emotions.

🚪 Mordecai returns to his same seat
🙏 He does not chase more praise
🧭 The honor does not change him
📖 His steady character stands out

## 😔 Haman Hasted To His House Mourning, And Having His Head Covered

Covering the head was an ancient sign of shame and grief.

Haman rushes home instead of walking with any dignity at all.

Just hours earlier he was planning his enemy's execution.

Now he hides his face from the same city he wanted to impress.

😔 Covering the head signaled shame
🏃 Haman rushes home instead of walking proud
⏳ Hours earlier he planned an execution
📖 He now hides from the same city

## 🔮 Thou Shalt Not Prevail Against Him, But Shalt Surely Fall Before Him

Zeresh and Haman's wise men say something surprising out loud.

They admit that Haman cannot win this fight because of who Mordecai is.

Haman's own household names God's people as a force he cannot beat.

Even his closest advisors can already see how this story ends.

🔮 His own advisors predict his fall
✡️ Mordecai's identity as a Jew matters
😨 Even Haman's household sees the danger
📖 The ending is already visible to them

## ⏰ Hasted To Bring Haman Unto The Banquet That Esther Had Prepared

Haman has no time to process the warning he just heard.

The king's men arrive and rush him straight to Esther's second banquet.

He walks in still shaken, with no chance to prepare a defense.

The trap that began this chapter is about to close completely.

⏰ Haman has no time to recover
🍽️ He is rushed to Esther's banquet
😰 He arrives shaken and unprepared
📖 The trap is about to close
`.trim();

export const ESTHER_SIX_PERSONAL_SECTIONS = parseEstherSixRawNotes(ESTHER_SIX_RAW_NOTES);
