export type EstherFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEstherFourRawNotes(rawText: string): EstherFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EstherFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Esther\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Esther 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Esther\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Esther\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Esther 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Esther 4:${startVerse}` : `Esther 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Esther 4 sections, received " + sections.length);
  }

  return sections;
}

const ESTHER_FOUR_RAW_NOTES = `# Esther 4:1-3
# 😢 Mordecai's Public Mourning
---
## 😢 Mordecai Rent His Clothes, And Put On Sackcloth With Ashes

Tearing one's clothes was a physical display of grief in this culture.

Sackcloth was a rough, uncomfortable fabric worn only during mourning or crisis.

Ashes on the body added a visible layer to that same message.

Mordecai is publicly announcing disaster, not quietly processing it alone.

😢 Rending clothes showed public grief

🪢 Sackcloth was rough mourning fabric

🌫️ Ashes marked crisis or sorrow

📖 Mordecai grieved where everyone could see

## 📢 Cried With A Loud And A Bitter Cry

This is not a quiet tear or a private sigh.

Mordecai's cry was loud enough to be heard through the city streets.

He wanted the coming danger known, not hidden.

Silence would have helped no one facing this decree.

📢 The cry was loud, not quiet

🏙️ It echoed through the city streets

👀 Mordecai wanted the danger known

➡️ Silence would not have helped anyone

## 🗺️ There Was Great Mourning Among The Jews, And Fasting, And Weeping, And Wailing

This grief was not limited to Mordecai or to the capital city Shushan.

The decree reached every province, so the mourning did too.

Fasting means going without food, often paired with prayer in scripture.

An entire people group was reacting to one single written decree.

🗺️ Mourning spread through every province

🍽️ Fasting means going without food

🙏 Fasting was often paired with prayer

📖 One decree affected an entire people

# Esther 4:4-8
# ✉️ Esther Learns The Truth
---
## 🏰 Esther's Maids And Her Chamberlains Came And Told It Her

Esther lived inside the palace, separated from the ordinary city.

News reached her only through her own servants, not firsthand.

She did not yet know why Mordecai was mourning so publicly.

Being queen came with real distance from what was happening outside.

🏰 Esther lived apart in the palace

👥 Servants were her only source of news

❓ She did not know the real reason

📖 Royal position brought real distance from truth

## 👗 She Sent Raiment To Clothe Mordecai, And To Take Away His Sackcloth From Him

Esther's first instinct was to fix the visible problem, not the real one.

Raiment simply means clothing, offered here to cover the sackcloth.

She did not yet understand what Mordecai was actually mourning.

Mordecai refused the clothes because the real danger was still unsolved.

👗 Raiment simply means clothing

🩹 Esther tried to fix what she could see

🙅 Mordecai refused the offered clothes

📖 Comfort cannot replace solving the real problem

## 🧑‍💼 Then Called Esther For Hatach, And Gave Him A Commandment To Mordecai

Hatach was one of the king's own chamberlains, assigned specifically to serve Esther.

Esther could not simply walk out to speak with Mordecai herself.

She sends a trusted go between instead, to learn the full story.

Even the queen needed help just to get real information.

🧑‍💼 Hatach was Esther's assigned chamberlain

🚪 Esther could not leave to ask directly

🔁 She used him as a trusted go between

📖 Even a queen needed help getting answers

## 💰 The Sum Of The Money That Haman Had Promised To Pay

Chapter three already revealed Haman's plan to destroy the Jewish people.

Haman had promised the king a massive sum of silver to fund the slaughter.

Mordecai makes sure Esther hears this exact detail, not a vague summary.

The threat against her own people now has a specific price attached to it.

💰 Haman promised silver for this plan

📜 Chapter three already revealed the scheme

🎯 Mordecai gives Esther the exact details

📖 The threat now has a specific price

## 📄 To Shew It Unto Esther, That She Should Go In Unto The King

Mordecai sends Esther the actual written decree as proof.

He does not simply ask her to worry alongside him.

He asks her to act, by approaching the king directly.

This request puts real risk on Esther personally for the first time.

📄 Mordecai sends the actual decree

🎯 He asks for action, not sympathy

👑 Esther must approach the king herself

📖 Real risk now falls on Esther

# Esther 4:9-11
# ⚖️ The Law Of The Inner Court
---
## 🏛️ Whosoever, Whether Man Or Woman, Shall Come Unto The King Into The Inner Court, Who Is Not Called

Persian kings guarded their access closely, even from close family.

Anyone entering the inner court uninvited faced a serious risk.

This law applied equally to men and women, with no royal exceptions named.

Esther explains this law carefully before agreeing to anything.

🏛️ Persian kings guarded access strictly

⚠️ Uninvited entry carried real danger

⚖️ The law applied to everyone equally

📖 Esther explains the risk plainly

## 👑 Except Such To Whom The King Shall Hold Out The Golden Sceptre, That He May Live

The golden sceptre was a royal rod the king could extend as a sign of favor.

Holding it out was the only way to escape the death penalty for entering uninvited.

Everything depended on one small, unpredictable gesture from the king.

Esther's life would hang on whether King Ahasuerus chose to raise his own hand.

👑 The sceptre was a royal rod

✋ Extending it spared the person's life

🎲 Survival depended on one gesture

📖 One choice could decide Esther's fate

## 📆 I Have Not Been Called To Come In Unto The King These Thirty Days

A full month had passed since Esther last saw the king.

That gap suggests her influence or favor may already be fading.

She is not exaggerating the danger to avoid helping Mordecai.

Her fear comes from a real, current change in her position.

📆 Thirty days had passed unseen

📉 Her favor may already be fading

🙅 She is not making an excuse

📖 Her fear reflects a real risk

# Esther 4:12-14
# 🔥 Mordecai's Challenge
---
## 🏰 Think Not With Thyself That Thou Shalt Escape In The King's House, More Than All The Jews

Mordecai will not let Esther assume her palace position keeps her safe.

Haman's decree targeted every Jew in the empire, without exceptions listed.

Being queen would not shield Esther if her identity became known.

Silence was never actually the safe choice it seemed to be.

🏰 Palace walls offered no real safety

📜 The decree named no exceptions

👑 Being queen would not protect her

📖 Silence was never truly safe

## 🕊️ Then Shall There Enlargement And Deliverance Arise To The Jews From Another Place

"Enlargement" is an old word for relief or freedom from pressure.

Mordecai trusts that God will save his people no matter what Esther decides.

He believes deliverance will come, even if Esther refuses to help.

His confidence rests in God's faithfulness, not in Esther's courage alone.

🕊️ Enlargement means relief or freedom

🙏 Mordecai trusts God will save His people

🔀 Deliverance could come another way

📖 God's faithfulness does not depend on one person

## ❓ Who Knoweth Whether Thou Art Come To The Kingdom For Such A Time As This

Mordecai reframes Esther's whole rise to queen as something larger than luck.

Her marriage to the king may have had a purpose beyond her own life.

This question does not demand an answer.

It demands a decision instead.

This line has become one of the most quoted verses in the whole Bible.

👑 Esther's rise may not be random

🎯 Her position may serve a bigger purpose

❓ The question demands a decision

📖 This verse still echoes far beyond Esther

# Esther 4:15-17
# 🕊️ If I Perish, I Perish
---
## 🍽️ Gather Together All The Jews That Are Present In Shushan, And Fast Ye For Me

Esther asks for a communal fast before she takes any action.

Fasting here meant going completely without food or water for three full days.

She wants her whole community united behind her, not facing this decision alone.

Prayer through fasting comes before any brave, risky move.

🍽️ Fasting meant no food or water

📆 The fast lasted three full days

👥 Esther wanted her people united

📖 Prayer came before bold action

## 🙋 I Also And My Maidens Will Fast Likewise

Esther does not ask for something she is unwilling to do herself.

She joins the same fast alongside her own maidens.

Leadership here means sharing the risk and the discipline, not just giving orders.

Her example matched the sacrifice she asked of everyone else.

🙋 Esther joined the fast herself

👥 Her maidens fasted alongside her

🤝 She shared the same sacrifice

📖 Real leadership shares the cost

## ⚖️ If I Perish, I Perish

This is the most quoted line in the entire book of Esther.

Esther accepts real, mortal risk instead of waiting safely on the sidelines.

She does not know if she will survive approaching the king uninvited.

She chooses to act anyway, trusting the outcome to God.

⚖️ This line is the book's most famous

💀 Esther accepts real mortal risk

❓ She does not know the outcome

📖 She acts and trusts God with the result

## 🔁 Mordecai Went His Way, And Did According To All That Esther Had Commanded Him

The chapter opened with Mordecai giving the challenge to Esther.

It closes with Mordecai now taking orders from her instead.

Esther has stepped into the leadership role Mordecai first pushed her toward.

The mentor now follows the one he once guided.

🔁 Roles reverse by the chapter's end

📢 Mordecai first gave the challenge

👑 Esther steps into leadership now

📖 The mentor follows the one he raised
`.trim();

export const ESTHER_FOUR_PERSONAL_SECTIONS = parseEstherFourRawNotes(ESTHER_FOUR_RAW_NOTES);
