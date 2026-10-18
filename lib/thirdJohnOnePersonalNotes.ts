export type ThirdJohnOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseThirdJohnOneRawNotes(rawText: string): ThirdJohnOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ThirdJohnOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*3\s*John\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 3 John 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+3\s*John\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+3\s*John\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 3 John 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `3 John 1:${startVerse}` : `3 John 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 3 John 1 sections, received " + sections.length);
  }

  return sections;
}

const THIRD_JOHN_ONE_RAW_NOTES = `# 3 John 1:1-2
# 📜 The Elder Greets A Faithful Friend
---
## 📜 The Elder Unto The Wellbeloved Gaius

"The elder" is a title, not John's given name.

Early church writers believed the apostle John wrote this letter.

John also calls himself "the elder" in his previous letter.

"Gaius" was a common name across the Roman world.

Unlike the lady in John's other letter, Gaius is a real named man.

📜 Elder is a title not a name
🧓 Many believe John wrote this
👤 Gaius was a common Roman name
📖 Gaius is a real named friend

---
## ❤️ Whom I Love In The Truth

John's love for Gaius is anchored in shared belief.

This is not ordinary affection between old friends.

Truth comes first, and real love grows out of it.

John loved his other readers this same way too.

❤️ Love grows out of shared truth
🙅 Not ordinary friendly affection alone
✝️ Shared belief comes before this love
📖 John loved every reader this way

---
## 🙏 That Thou Mayest Prosper And Be In Health

John opens with a wish for Gaius's whole life.

"Prosper" here means things going well, not becoming wealthy.

Ancient letters often opened with a wish for good health.

John follows that custom, then goes further than custom required.

🙏 John wishes Gaius well all around
💰 Prosper means things going well, not riches
📜 Ancient letters often opened this way
📖 John goes further than custom required

---
## 🌱 Even As Thy Soul Prospereth

John compares two kinds of prospering in one line.

One is physical health, the other is spiritual health.

He says Gaius's soul was already prospering.

That comparison shows John cared about more than Gaius's body.

A healthy soul mattered more to John than a healthy body.

🌱 Soul prospering means spiritual health
🩺 Different from simple physical health
👀 John already saw Gaius thriving in faith
📖 Spiritual health mattered most to John

# 3 John 1:3-4
# 😊 Joy Over A Child Walking In Truth
---
## 📰 The Brethren Came And Testified Of The Truth That Is In Thee

Traveling believers had visited John with a report about Gaius.

"Testified" means they gave a firsthand, truthful account.

Their report was not a rumor or secondhand guess.

John trusted what these visitors told him in person.

📰 Travelers brought John a firsthand report
🔎 Testified means giving a truthful account
🙅 This was not rumor or guesswork
📖 John trusted what he was told

---
## 🚶 Even As Thou Walkest In The Truth

"Walking in truth" describes a whole way of living.

It covers daily choices, not just one stated belief.

Gaius lived out his faith where others could see it.

Real belief shows up in ordinary daily actions.

🚶 Walking describes a whole way of life
🗓️ It means daily choices, not one belief
👀 Others could see Gaius living it out
📖 Belief shows up in daily action

---
## 😊 I Have No Greater Joy Than To Hear That My Children Walk In Truth

John calls Gaius one of his spiritual children.

That title did not require being related by blood.

It described someone John helped bring to faith or taught.

No other news brought John greater joy than this.

A teacher's greatest joy is seeing a student remain faithful.

👨‍👦 Children here means spiritual, not blood family
📚 John likely taught or led Gaius to faith
😊 This news brought John his greatest joy
📖 A teacher's joy is a faithful student

# 3 John 1:5-6
# 🤝 Faithful To Strangers
---
## 🤝 Thou Doest Faithfully Whatsoever Thou Doest To The Brethren And To Strangers

Gaius helped fellow believers he already knew.

He also helped strangers he had never met before.

In the ancient world, travel without lodging was dangerous.

Christian hospitality often meant housing and feeding traveling strangers.

John praises Gaius for helping both groups faithfully.

🤝 Gaius helped believers he already knew
🚶 He also helped total strangers
🏠 Hospitality meant housing traveling believers
📖 Faithfulness covered friends and strangers alike

---
## 📣 Have Borne Witness Of Thy Charity Before The Church

"Borne witness" means these travelers publicly reported Gaius's kindness.

"Charity" here means practical love, not just warm feelings.

The whole church had heard about Gaius's generosity.

His private kindness became a public example.

📣 Borne witness means a public report
🤲 Charity means practical love, not a feeling
🏛️ The whole church heard about it
📖 Private kindness became a public example

---
## 🚶 Bring Forward On Their Journey After A Godly Sort

Traveling teachers needed food, money, and lodging for the road.

"Bring forward on their journey" meant helping supply all three.

"After a godly sort" means doing it in a way that honored God.

Gaius was asked to send these travelers off well equipped.

John calls this ordinary kindness a very good thing to do.

🧳 Travelers needed food, money, and lodging
🚶 Bring forward means helping them on their way
🙏 Godly sort means doing it to honor God
📖 John calls this a very good thing

# 3 John 1:7-8
# ✝️ Partners In The Truth
---
## 🎺 For His Name's Sake They Went Forth

These travelers were missionaries, not ordinary tourists.

They left home specifically to spread the name of Jesus.

"His name's sake" means their whole purpose was Christ's honor.

Their travel had a clear mission behind it.

🎺 These travelers were missionaries
🚶 They left home to spread Christ's name
🎯 Their purpose was Christ's honor
📖 Travel with mission, not mere tourism

---
## 💰 Taking Nothing Of The Gentiles

"Gentiles" here means people outside the Jewish and Christian faith.

These missionaries refused payment from unbelievers for their work.

Accepting money from Gentiles could make the gospel look like a business.

Their refusal protected the honor of the message they carried.

🌍 Gentiles means people outside the faith
🙅 These missionaries refused their money
💰 Payment could make the gospel look like business
📖 Refusing money protected the message's honor

---
## 🤝 That We Might Be Fellowhelpers To The Truth

"Fellowhelpers" means partners working toward the same goal.

Gaius could not travel and preach himself.

By housing and funding these missionaries, he still shared in their work.

Supporting the mission made Gaius a true partner in it.

🤝 Fellowhelpers means true working partners
🏠 Gaius supported instead of traveling himself
💪 Support counted as real partnership
📖 Helping the mission means sharing in it

# 3 John 1:9-11
# 👑 Diotrephes And The Call To Do Good
---
## 👑 Diotrephes, Who Loveth To Have The Preeminence Among Them

Diotrephes was a leader in this local church.

"Preeminence" means wanting to rank above everyone else.

He loved being first more than he loved serving others.

John names this exact flaw instead of staying vague.

👤 Diotrephes was a local church leader
👑 Preeminence means wanting to rank first
💔 He loved status more than serving
📖 John names this flaw directly

---
## 🚪 Receiveth Us Not

Diotrephes refused to welcome John's own messengers.

This was a direct, personal rejection of John's authority.

A church leader was shutting out the apostle's representatives.

That refusal revealed exactly where his loyalty really stood.

🚪 Diotrephes refused John's own messengers
👎 This rejected John's authority directly
⚠️ A leader shutting out an apostle's representatives
📖 His refusal revealed his loyalty

---
## 🗣️ Prating Against Us With Malicious Words

"Prating" means talking too much, usually about nothing worthwhile.

"Malicious" means the words were meant to cause harm.

Diotrephes was not just gossiping, he was spreading lies on purpose.

Careless talk became a weapon aimed at John's reputation.

🗣️ Prating means talking on and on
🎯 Malicious means meant to cause harm
😈 Diotrephes spread lies on purpose
📖 Words became a weapon here

---
## 🚫 Casteth Them Out Of The Church

Diotrephes went beyond words to actual exclusion.

He physically removed faithful believers from the congregation.

"Casteth out" describes a forceful, public removal.

A leader meant to protect people was driving them away instead.

🚫 Diotrephes removed believers from the church
💪 Casteth out means forceful removal
🔄 A protector became the one driving people away
📖 Leadership was used to harm, not help

---
## ⚖️ Follow Not That Which Is Evil, But That Which Is Good

John turns from describing Diotrephes to giving Gaius direction.

"Follow" means more than admiring, it means imitating someone's pattern.

Diotrephes was not someone worth imitating, even as a leader.

Gaius needed a clear, simple standard to measure leaders by.

⚖️ John shifts from warning to direction
👣 Follow means imitating a pattern
🙅 Even a leader can be the wrong pattern
📖 Gaius needed a clear standard

---
## 💔 He That Doeth Evil Hath Not Seen God

John sets up a sharp contrast between two kinds of people.

Doing good consistently shows a real relationship with God.

"Hath not seen God" means never truly knowing Him at all.

Behavior reveals whether someone actually knows God or only claims to.

⚖️ Two opposite patterns are contrasted here
✅ Good actions show a real relationship with God
💔 Hath not seen God means never knowing Him
📖 Behavior reveals what someone really believes

# 3 John 1:12-14
# 🕊️ A Good Report And A Promise To Visit
---
## 🏅 Demetrius Hath Good Report Of All Men

Demetrius is introduced as the clear opposite of Diotrephes.

Everyone who knew him spoke well of his character.

John likely wanted Gaius to welcome Demetrius on his travels.

One good leader's example balances out one bad leader's example.

🏅 Demetrius is the opposite of Diotrephes
👥 Everyone who knew him spoke well of him
🤝 John wanted Gaius to welcome him
📖 A good example balances a bad one

---
## 📖 We Also Bear Record, And Ye Know That Our Record Is True

John adds his own personal endorsement to Demetrius's good name.

"Bear record" means giving sworn, firsthand testimony.

Gaius already had reason to trust John's word.

Two separate testimonies now stood behind Demetrius's character.

🤝 John adds his own endorsement
🔎 Bear record means sworn firsthand testimony
✅ Gaius already trusted John's word
➡️ Two testimonies secure Demetrius's good name

---
## 📜 I Had Many Things To Write, But I Will Not With Ink And Pen

"Pen" here refers to a reed pen, not a modern ballpoint.

John had much more he wanted to say to Gaius.

He chose to hold most of it back on purpose.

A letter could never fully replace a real conversation.

🖊️ Pen here means an ancient reed pen
✍️ John had much more he could say
🤐 He held it back on purpose
📖 A letter cannot replace real conversation

---
## 🗣️ We Shall Speak Face To Face

John plans an actual visit, not another letter.

"Face to face" pictures a real, direct conversation.

Some things are only settled fully in person.

John valued presence over paper whenever he had the choice.

🚶 John plans a real visit in person
🗣️ Face to face means a direct conversation
⚖️ Some things are only settled in person
📖 John valued presence over paper

---
## 👋 Greet The Friends By Name

John closes with a personal touch instead of a generic goodbye.

"By name" means greeting individuals, not just the whole group.

Early churches functioned like close, connected family networks.

A short closing line still showed real personal care.

👋 John closes with a personal touch
👤 By name means greeting individuals, not a group
👨‍👩‍👧‍👦 Churches functioned like connected family networks
📖 A short closing still showed real care
`.trim();

export const THIRD_JOHN_1_PERSONAL_SECTIONS = parseThirdJohnOneRawNotes(THIRD_JOHN_ONE_RAW_NOTES);
