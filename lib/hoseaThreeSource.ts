export type HoseaThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHoseaThreeRawNotes(rawText: string): HoseaThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HoseaThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hosea\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hosea 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hosea\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Hosea\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hosea 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hosea 3:${startVerse}` : `Hosea 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Hosea 3 sections, received " + sections.length);
  }

  return sections;
}

const HOSEA_THREE_RAW_NOTES = `# Hosea 3:1-3
# 💍 Buying Back An Unfaithful Love
---
## 💍 Go Yet, Love A Woman Beloved Of Her Friend, Yet An Adulteress

This woman is almost certainly Gomer, the same wife Hosea married back in chapter one.

Beloved of her friend means another man now loves her instead of Hosea.

Yet an adulteress means she is still unfaithful even as this command comes.

God tells Hosea to love her again, right in the middle of that unfaithfulness.

This command is not a side detail.

It acts out the whole book's message inside one real marriage.

💍 Almost certainly Gomer from chapter one

💔 Her friend means another man now

🔁 Hosea is told to love her again

📖 The command acts out the whole book

## 💞 According To The Love Of The LORD Toward The Children Of Israel

Hosea's love for his wife is not the point by itself.

It is a living picture of how the LORD still loves unfaithful Israel.

Israel here means the whole nation, not one individual person.

Who look to other gods describes Israel chasing idols instead of the LORD.

The marriage and the nation are telling the exact same story.

💞 Hosea's love pictures God's love

🇮🇱 Israel means the whole nation

🙏 They were chasing other gods

📖 One story, a marriage and a nation

## 🍇 Love Flagons Of Wine

Flagons of wine sounds like simple drinking.

That is not the real picture here.

The Hebrew phrase behind it is closer to raisin cakes, not cups of wine.

These cakes were often used as offerings in pagan worship feasts.

Israel's craving here is for Baal worship food, not for alcohol.

A small mistranslation can hide a much bigger problem underneath it.

🍇 Flagons of wine means raisin cakes

🛐 These cakes fed pagan worship feasts

🚫 The craving is not for alcohol

📖 A small word hides the real sin

## 💰 Bought Her To Me For Fifteen Pieces Of Silver

Hosea pays an actual price to bring his wife back.

Fifteen pieces of silver was only half the price of a full grown slave.

Many scholars believe the barley payment in this verse covers the other half.

Buying her back this way means she had fallen into some kind of bondage.

Redeeming her costs Hosea something real, not just a kind word.

💰 Fifteen pieces of silver is half price

🐐 Barley likely covers the other half

⛓️ She had fallen into real bondage

📖 Her redemption cost Hosea something real

## 📏 An Homer Of Barley, And An Half Homer Of Barley

An homer was a large, standard dry measure in the ancient world.

It held about the amount one donkey could carry at once.

The word homer likely comes from the Hebrew word for donkey.

An half homer is simply half of that same amount.

Together with the silver, this barley likely matched the price of a slave.

That same price appears back in Exodus chapter twenty one.

Buying her back again was never just symbolic.

📏 An homer was a large dry measure

🐴 The word likely comes from donkey

➗ A half homer is half that amount

📖 Together it likely matched a slave's price

## ⏳ Thou Shalt Abide For Me Many Days

Abide here means she must stay set apart for a period of time.

During these days she is not to play the harlot or belong to another man.

This mirrors a time of purification, not a punishment with no purpose.

The marriage is being rebuilt slowly, not restored all at once.

⏳ Abide means staying set apart

🚫 She may not belong to another man

🛁 This is purification, not plain punishment

📖 The marriage rebuilds slowly, not instantly

## 🤝 So Will I Also Be For Thee

Hosea does not just demand faithfulness from her.

He commits to the same faithfulness himself, for the same length of time.

This mirrors a pattern used throughout the whole book.

Judgment and real commitment always travel together here.

Love here is never one sided in this story.

🤝 Hosea commits to faithfulness too

⏳ Both share the same waiting period

🔁 This mirrors God's own pattern

📖 Love here is never one sided

# Hosea 3:4-5
# ⏳ Stripped Down, Then Restored
---
## 👑 Without A King, And Without A Prince

No king and no prince together mean Israel's whole government disappears.

No one sits on David's throne over the ten northern tribes anymore.

No prince means not even a lesser ruler steps in to replace one.

This points toward the coming exile, when Assyria removes Israel's leadership completely.

Losing every leader forces Israel to finally look to God alone.

👑 No king means no throne at all

🏛️ No prince means no replacement either

⚔️ This points toward the coming exile

📖 Losing leaders turns Israel back to God

## 🛐 Without A Sacrifice, And Without An Image

Sacrifice here means Israel's normal temple worship of the LORD.

Image means an idol, something built for worshipping a false god instead.

Both get removed together, the true worship and the false worship alike.

This is not a punishment aimed only at idolatry.

It strips away every religious outlet Israel has, good and bad.

🛐 Sacrifice means true worship of the LORD

🗿 Image means an idol of false gods

⚖️ Both are removed at the same time

📖 Every outlet for worship disappears

## 👕 Without An Ephod, And Without Teraphim

An ephod was a priestly garment worn during true worship of the LORD.

It held the Urim and Thummim, objects used to seek God's direction.

Teraphim were small household idols.

The same word described the images Rachel stole, back in Genesis chapter thirty one.

Losing both items means losing access to any real guidance at all.

👕 An ephod was a true priest's garment

🎲 It helped seek God's direction

🗿 Teraphim were small household idols

📖 Rachel once stole these same idols

## 🌱 Seek The LORD Their God, And David Their King

This does not mean the historical King David will somehow return to life.

David had been dead for centuries by the time Hosea wrote this.

David their king points forward to a future king from David's own family line.

That hope is ultimately fulfilled in Jesus, a descendant of David.

🌱 Not a literal return of David

📜 David had been dead for centuries

🔮 This points to a future king

📖 Jesus later fulfills that hope

## 📅 In The Latter Days

Latter days is not a vague phrase for someday far off.

It points to a specific future era still ahead of the first readers.

Fear the LORD here means deep reverence, not simple terror.

Israel's long exile does not end in more judgment.

It ends in genuine worship instead.

📅 Latter days means a real future era

😨 Fear here means reverence, not terror

🔄 Exile does not end in more judgment

📖 It ends in genuine worship instead
`.trim();

export const HOSEA_THREE_PERSONAL_SECTIONS = parseHoseaThreeRawNotes(HOSEA_THREE_RAW_NOTES);
