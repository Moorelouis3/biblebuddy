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
# 🌙 The King's Sleepless Night
---
## 😴 Could Not The King Sleep

This is one single sleepless night in the middle of a much bigger story.

The book of Esther never once mentions God by name.

Yet this ordinary moment becomes the hinge the whole rescue turns on.

What looks like an accident sets up everything that follows.

😴 One ordinary sleepless night
🚫 God is never named in Esther
🔑 This moment hinges the whole story
📖 Hidden providence works through ordinary events

## 📜 The Book Of Records Of The Chronicles

"Chronicles" here means the official daily record kept for the Persian king.

Every notable event in the kingdom was written down and filed away.

Mordecai's warning about the assassination plot had already been recorded there in chapter two.

It had simply been sitting unread and unrewarded ever since.

📜 Chronicles means the king's official daily record
🗄️ Every notable event got written down
🕵️ Mordecai's warning was recorded back in chapter two
📖 A forgotten record is about to matter

## 🚪 Two Of The King's Chamberlains, The Keepers Of The Door

"Chamberlains" were palace officials who guarded access near the king's private rooms.

"Keepers of the door" means they controlled exactly who could get close to him.

Bigthana and Teresh used that same trusted access to plan an assassination.

Mordecai discovered the plot and reported it before anyone was harmed.

🚪 Chamberlains guarded access near the king
🔑 Keepers of the door controlled entry
🗡️ These two planned to kill the king
📖 Mordecai's warning stopped it in time

## ❓ There Is Nothing Done For Him

This is the irony the whole chapter turns on.

Mordecai saved the king's life back in chapter two.

Persian kings were known for rewarding this kind of loyalty quickly and publicly.

His good deed had simply been overlooked for years.

That gap between what he deserved and what he received is about to close fast.

❓ The king asks about Mordecai's reward
🤷 Nothing had been done for him
🏆 Loyalty like this was usually rewarded fast
📖 An old debt is about to be paid

# Esther 6:4-6
# 😏 Haman Assumes The Honor Is His
---
## 🚪 Haman Was Come Into The Outward Court

"Outward court" was the outer waiting area, one step short of the king's presence.

Haman waits there early, on the very same morning.

He has one purpose for showing up so soon.

He wants royal permission to execute Mordecai immediately.

Neither man in this scene knows what the other is about to say.

🚪 Outward court means the outer waiting area
🌅 Haman arrives early that same morning
🎯 He wants Mordecai executed immediately
📖 Neither man knows what is coming

## 🪓 To Hang Mordecai On The Gallows That He Had Prepared

This callback points straight back to the gallows Zeresh suggested last chapter.

Haman had it built overnight, fully expecting to use it by evening.

He is walking in to make that request official.

He has no idea the king is thinking about Mordecai for the opposite reason.

🪓 This recalls the gallows from chapter five
🌙 Haman built it overnight already
📝 He plans to make the request official
📖 The king has the opposite plan in mind

## 🗣️ Let Him Come In

The king never even asks why Haman has come.

His servants simply confirm Haman is right outside, waiting.

He assumes Haman is the right person to answer his question about honoring someone.

That assumption is about to work against Haman completely.

🗣️ Servants confirm Haman is waiting
✅ The king lets him in at once
🤔 The king assumes Haman can help him
📖 That assumption backfires on Haman

## 🪞 To Whom Would The King Delight To Do Honour More Than To Myself

The king never says whose honor he means before asking Haman's advice.

Haman fills in that blank with his own name instantly.

His pride assumes no one could possibly outrank him in the king's eyes.

That single wrong guess shapes everything he says next.

❓ The king never names who he means
🪞 Haman assumes the honor is his own
💭 His pride fills in the blank
📖 One wrong guess shapes his whole answer

# Esther 6:7-9
# 👑 Haman Designs The Ultimate Honor
---
## 👘 The Royal Apparel Which The King Useth To Wear

Haman describes clothing that only the king himself was allowed to wear.

Putting it on someone else was normally unthinkable in this culture.

Haman is describing his own fantasy of near royal status.

He believes he is designing his own reward.

👘 Royal apparel means the king's own clothing
🚫 Normally no one else could wear it
🌟 Haman is picturing this for himself
📖 He thinks he is planning his own reward

## 🐎 The Horse That The King Rideth Upon, And The Crown Royal

Riding the king's personal horse showed the same rare status as wearing his clothes.

Some scholars believe the crown royal was set on the horse's head, not the man's.

Either way, this animal was instantly recognizable as belonging only to the king.

Everything about this request signals the highest possible honor in the kingdom.

🐎 The king's horse showed rare status too
👑 The crown royal may have crowned the horse
🔎 Either way this animal was unmistakably royal
📖 Every detail signals the highest honor

## 🎖️ One Of The King's Most Noble Princes

Haman insists a top ranking prince personally deliver the apparel and horse.

Even the messenger has to be someone of very high status.

This detail was not accidental generosity.

Haman wanted the whole city to see how important the honor really was.

🎖️ A top prince must deliver the honor
📬 Even the messenger had to rank high
👀 Every detail was meant to be seen
📖 Status was the whole point of the plan

## 📯 Proclaim Before Him, Thus Shall It Be Done

A royal herald walks ahead announcing the honor to everyone watching.

This turns a private reward into a public spectacle.

Ancient processions like this worked like a parade through the whole city.

Haman designed every detail to be witnessed, not just given quietly.

📯 A herald announces the honor publicly
🎊 This becomes a citywide spectacle
🚶 It works like an ancient parade
📖 Haman wanted everyone watching

# Esther 6:10-12
# 😱 The King Turns Haman's Words Against Him
---
## ⚡ Make Haste, And Take The Apparel And The Horse

The king answers immediately, with no discussion at all.

He repeats Haman's exact instructions back to him as an order.

Haman has no chance to ask who the honor is actually for yet.

His own plan is now completely out of his control.

⚡ The king answers with no delay
🔁 He repeats Haman's own instructions
❓ Haman still does not know for whom
📖 The plan slips out of Haman's hands

## 😲 Do Even So To Mordecai The Jew, That Sitteth At The King's Gate

The king finally names the man he means, Mordecai.

Haman built this entire ceremony to destroy the exact person he must now honor.

"Sitteth at the king's gate" reminds the reader Mordecai never actually left his post.

He kept serving faithfully the whole time no one seemed to notice.

😲 The king finally names Mordecai
🎭 Haman must honor the man he hates
🚪 Mordecai never left his post at the gate
📖 Faithful service was not going unnoticed after all

## 📝 Let Nothing Fail Of All That Thou Hast Spoken

The king holds Haman to every single word he just said.

There is no room left to soften or take any of it back.

Haman must personally carry out the exact ceremony he designed for himself.

He built this trap with his own mouth.

📝 The king holds Haman to his own words
🚫 No softening or backing out allowed
🙋 Haman must carry it out himself
📖 His own words became the trap

## 🐎 Haman Hasted To His House Mourning, And Having His Head Covered

Haman is not just delivering an order now.

He is the one who must carry it out.

He personally dresses Mordecai and leads his horse through the city.

He must proclaim Mordecai's honor out loud the entire way.

Mordecai simply returns to the king's gate afterward, without gloating.

Covering the head was a well known sign of shame in this culture.

Haman carries that public humiliation home alone.

🐎 Haman leads Mordecai's horse himself
📢 He proclaims the honor out loud
🤫 Mordecai returns to the gate quietly
📖 Head covering signals Haman's public shame

# Esther 6:13-14
# 🔮 Zeresh Predicts Haman's Downfall
---
## 🗣️ Told Zeresh His Wife And All His Friends

Haman reports every detail of his humiliation the moment he gets home.

This is the same circle that celebrated with him back in chapter five.

Their mood is about to shift completely.

Haman still does not realize how much worse this day is about to get.

🗣️ Haman retells his whole humiliation
👥 The same friends from chapter five listen
😬 Their mood is about to shift
📖 Worse news is still coming

## 🔄 If Mordecai Be Of The Seed Of The Jews, Thou Shalt Surely Fall Before Him

Zeresh and the wise men reverse their earlier advice completely.

Only one chapter ago they were the ones suggesting the gallows.

"Seed of the Jews" simply means belonging to the Jewish people by birth.

Even Haman's own household now senses he cannot win this fight.

🔄 Zeresh reverses her earlier advice
🪓 She had suggested the gallows one chapter ago
🌱 Seed of the Jews means Jewish by birth
📖 Even his own house senses defeat coming

## 🕸️ Came The King's Chamberlains, And Hasted To Bring Haman Unto The Banquet

Haman has no time to process this warning at all.

Royal officials interrupt mid conversation and rush him straight to Esther's banquet.

He walks from public humiliation directly into an even bigger trap.

The chapter ends in mid sentence, on purpose, to keep the reader moving forward.

⏰ No time to process the warning
🏃 Officials rush him to the banquet
🕸️ He walks from one trap into another
➡️ The chapter cuts off on purpose
`.trim();

export const ESTHER_SIX_PERSONAL_SECTIONS = parseEstherSixRawNotes(ESTHER_SIX_RAW_NOTES);
