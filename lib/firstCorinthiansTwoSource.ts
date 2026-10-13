export type FirstCorinthiansTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansTwoRawNotes(rawText: string): FirstCorinthiansTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 2:${startVerse}` : `1 Corinthians 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 First Corinthians 2 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_TWO_RAW_NOTES = `# FirstCorinthians 2:1-5
# 🗣️ Preaching Christ Crucified Alone
---
## 🎤 Excellency Of Speech Or Of Wisdom

Excellency of speech means polished, impressive public speaking.

Corinth prized that skill above almost anything else in daily life.

Chapter one already showed how much this city admired clever orators.

Paul walked in and refused to perform that way on purpose.

🎤 Excellency of speech means polished speaking
🏛️ Corinth prized that skill highly
📜 Chapter one already showed this pride
📖 Paul refused to perform that way

## ✝️ Save Jesus Christ, And Him Crucified

Determined means Paul made one deliberate choice before he even arrived.

He chose to leave out every other subject he could have taught.

A crucified criminal was a shameful topic in Roman culture.

Paul built his entire message on that one shameful fact anyway.

🎯 Determined means one deliberate choice
📚 Paul left out every other subject
😳 A cross was a shameful topic
📖 Paul built his message on it anyway

## 😟 In Weakness, And In Fear, And In Much Trembling

Paul describes his own state honestly, not as false modesty.

Acts eighteen records real threats against him in this very city.

Trembling pictures a physical, visible shake, not a mild worry.

A fragile, frightened preacher still delivered a message that changed a city.

😟 Paul admits real weakness here
⚔️ Acts eighteen shows real threats
🫨 Trembling means a visible physical shake
📖 A fragile preacher still changed a city

## 🎭 Enticing Words Of Man's Wisdom

Enticing means words crafted specifically to persuade through charm instead of truth.

Greek teachers were trained for years to speak exactly that way.

Paul had that same training available and chose not to use it.

His plain approach was a decision, not a lack of skill.

🎭 Enticing means crafted to persuade
🏛️ Greek teachers trained for years at this
🙅 Paul chose not to use it
📖 Plainness was a decision, not weakness

## ⚡ Demonstration Of The Spirit And Of Power

Demonstration means visible proof, the kind a courtroom accepts as evidence.

This likely points to real changed lives, not staged tricks.

Paul lets the result speak instead of his own delivery.

A changed life became the only proof Paul needed to offer.

⚖️ Demonstration means visible proof
🔄 This points to real changed lives
🚫 Not staged tricks
📖 A changed life was Paul's only proof

## 🏗️ Your Faith Should Not Stand In The Wisdom Of Men

Stand here means the ground a person's trust actually rests on.

A faith built on clever argument collapses the moment a sharper argument appears.

Paul wanted a foundation that could never be argued away.

Only God's own power can hold faith steady for a lifetime.

🏗️ Stand means the ground trust rests on
💨 Clever arguments can collapse just as fast
🪨 Paul wanted an unshakable foundation
📖 Only God's power holds faith steady

# FirstCorinthians 2:6-9
# 🔐 A Wisdom Kept Hidden Until Now
---
## 🌱 Howbeit We Speak Wisdom Among Them That Are Perfect

Howbeit is an old word meaning however or still.

Perfect here does not mean flawless or without sin.

It means mature, someone who has grown in understanding over time.

Paul does have real wisdom to teach, just not the kind Corinth expected.

🔀 Howbeit means however or still
🌱 Perfect means mature, not flawless
📈 Mature believers can grasp deeper teaching
📖 Paul's wisdom is real, just different

## 👑 The Princes Of This World, That Come To Nought

Princes here means the powerful rulers who governed that world.

Come to nought means their power eventually fades to nothing.

Rome's emperors and Jerusalem's leaders both looked permanent at the time.

Every one of them is now gone, while Christ's kingdom remains.

👑 Princes means powerful worldly rulers
💨 Come to nought means fading to nothing
🏛️ Rome and Jerusalem's leaders looked permanent
📖 Christ's kingdom outlasted every one of them

## 🔒 The Wisdom Of God In A Mystery, Even The Hidden Wisdom

Mystery in scripture means a truth God kept concealed until the right time.

It is not a puzzle meant to confuse anyone on purpose.

God always planned to reveal it, just not immediately.

The cross was the moment this hidden plan finally came into view.

🔒 Mystery means a truth kept concealed
⏳ Not a puzzle meant to confuse
📅 God always planned to reveal it
📖 The cross revealed the hidden plan

## 📋 Ordained Before The World Unto Our Glory

Ordained means planned and decided in advance, not improvised later.

This plan existed before the world itself was even made.

Our glory points to the future reward promised to every believer.

God's rescue plan was never a backup idea.

📋 Ordained means decided in advance
🌌 The plan predates the world itself
🏆 Our glory means the future reward
📖 This was never a backup plan

## 💡 They Would Not Have Crucified The Lord Of Glory

The princes mentioned above means the religious and political leaders of that day.

They acted against Jesus without recognizing who he truly was.

Calling him the Lord of glory makes their mistake even sharper.

Their worst act of injustice became the very path to salvation.

🏛️ Princes means the religious and political leaders
😳 They did not recognize who Jesus was
💡 Lord of glory sharpens their mistake
📖 Their injustice became the path to salvation

## 📜 Eye Hath Not Seen, Nor Ear Heard

This line quotes the prophet Isaiah, slightly reworded by Paul.

Isaiah originally pointed to blessings no one could have imagined in advance.

Paul applies that same promise to what God prepared through Christ.

No one could have guessed in advance how far God's plan would go.

📜 This quotes the prophet Isaiah
🙈 No one could imagine it beforehand
🧭 Paul applies it to Christ's plan
📖 God's plan outran every guess

# FirstCorinthians 2:10-13
# 🕊️ The Spirit Reveals What Eyes Cannot See
---
## 🔓 God Hath Revealed Them Unto Us By His Spirit

Revealed means something hidden has now been opened up and made plain.

The mystery from the verses before this one is the thing now revealed.

This revealing did not come through study or cleverness.

It came directly through God's own Spirit.

🔓 Revealed means made plain and open
📜 This is the mystery from earlier verses
🧠 It did not come through cleverness
📖 It came through God's own Spirit

## 🔍 The Spirit Searcheth All Things, Yea, The Deep Things Of God

Searcheth means to examine something fully, leaving nothing hidden.

Deep things pictures truths buried far below the surface, like treasure underground.

No human research could ever reach that deep on its own.

Only God's own Spirit can reach what belongs to God.

🔍 Searcheth means examining something fully
💎 Deep things means truths like buried treasure
⛏️ Human research cannot reach that deep
📖 Only God's Spirit reaches what is God's

## 🧠 What Man Knoweth The Things Of A Man, Save The Spirit Of Man

Paul uses an everyday comparison to make a hard idea simple.

Only a person truly knows their own private thoughts.

Nobody else can read another person's mind directly.

In that same way, only God's Spirit truly knows God's own mind.

🧠 Only a person knows their own thoughts
🚫 Nobody else can read another mind
🪞 This is an everyday comparison
📖 Only God's Spirit knows God's mind

## 🕊️ Not The Spirit Of The World, But The Spirit Which Is Of God

The spirit of the world means the ordinary human way of thinking and judging.

It relies only on the five senses and human logic.

Believers receive a different source of understanding entirely.

That different source lets them know what God has freely given.

🌍 Spirit of the world means human thinking alone
👁️ It relies on senses and logic only
🕊️ Believers receive a different source
📖 It reveals what God freely gave

## 🔗 Comparing Spiritual Things With Spiritual

Comparing here means explaining one spiritual truth using other spiritual truth.

Paul will not force these ideas into categories built for debate or philosophy.

Spiritual truth needs its own kind of language to make sense.

The Holy Ghost supplies the words, not polished human training.

🔗 Comparing means explaining truth with truth
🚫 Not forced into philosophy's categories
🗣️ Spiritual truth needs its own language
📖 The Holy Ghost supplies the words

# FirstCorinthians 2:14-16
# 🧠 Natural Man Versus Spiritual Man
---
## 🧍 The Natural Man Receiveth Not The Things Of The Spirit Of God

Natural man means a person relying only on human senses and reasoning.

That person has not yet received God's Spirit at all.

Spiritual truth genuinely looks like nonsense from that vantage point.

This is not about intelligence, it is about a missing source of understanding.

🧍 Natural man means relying on senses alone
🚫 That person lacks God's Spirit
🤷 Spiritual truth looks like nonsense to him
📖 This is about a missing source, not intelligence

## 🙄 They Are Foolishness Unto Him

Foolishness here repeats the exact word already explained back in chapter one.

To the natural man, the gospel sounds genuinely absurd, not just unfamiliar.

This reaction is expected, not a sign something is wrong with the message.

The problem sits with the hearer's missing source, not the truth itself.

🔁 This repeats chapter one's word
🙄 The gospel sounds genuinely absurd to him
✅ This reaction is expected, not alarming
📖 The problem is the hearer, not the truth

## 👁️ Because They Are Spiritually Discerned

Discerned means understood and recognized for what something truly is.

Spiritual truth needs a spiritual sense to be recognized at all.

It works a little like needing working eyes to see color.

Without that sense, the truth stays invisible no matter how plainly it is stated.

👁️ Discerned means recognized for what it is
🌈 It is like needing eyes to see color
🚫 Without that sense, truth stays invisible
📖 Plain words cannot force spiritual sight

## ⚖️ He That Is Spiritual Judgeth All Things

Judgeth here means to evaluate and understand correctly, not to condemn.

A believer with the Spirit can rightly weigh what the natural man cannot.

That believer sees the true value of spiritual truth clearly.

Yet no outsider can rightly evaluate that believer's own spiritual understanding in return.

⚖️ Judgeth means evaluating, not condemning
👀 A believer can rightly weigh spiritual truth
🔄 This insight is not available in reverse
📖 Spiritual sight sees what others cannot

## 🎁 We Have The Mind Of Christ

This line quotes the prophet Isaiah, who asked who could instruct the Lord.

No human has ever stood close enough to God to correct or advise him.

Believers are never given that position over God either.

Instead, believers are given something else entirely, Christ's own mind guiding their understanding.

📜 This quotes the prophet Isaiah
🙅 No human instructs or advises God
🎁 Believers are given Christ's mind instead
📖 Christ's mind guides a believer's understanding
`.trim();

export const FIRST_CORINTHIANS_TWO_PERSONAL_SECTIONS = parseFirstCorinthiansTwoRawNotes(FIRST_CORINTHIANS_TWO_RAW_NOTES);
