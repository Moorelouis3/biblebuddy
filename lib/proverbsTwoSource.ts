export type ProverbsTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsTwoRawNotes(rawText: string): ProverbsTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 2:${startVerse}` : `Proverbs 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Proverbs 2 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_TWO_RAW_NOTES = `# Proverbs 2:1-4
# 🎯 The Call To Seek Wisdom
---
## 🎯 If Thou Wilt Receive My Words

"Receive" means far more than simply hearing something.

It means actively welcoming the words in and letting them shape you.

A person can hear an entire sermon and receive none of it.

Solomon calls his reader "my son," the way a teacher addresses a student.

This whole chapter is that teacher speaking to that one student.

🎯 Receive means active welcome, not passive hearing

👂 Hearing and receiving are not the same

🎓 Son is Solomon's word for his student

📖 This whole chapter speaks to that student

---

## 🗝️ Hide My Commandments With Thee

"Hide" here does not mean conceal something in shame.

It means store something valuable where it will not be lost.

Think of hiding money in a safe place instead of hiding a stolen item.

Solomon wants his son to treasure these words, not just remember them for a test.

🗝️ Hide means store safely, not conceal

💰 Like locking away something valuable

🧠 Not memorized for a test

📖 Treasured, not just remembered

---

## 👂 Incline Thine Ear Unto Wisdom

"Incline" describes a physical action, leaning the body toward something.

Ancient hearers pictured someone leaning in close to catch every word of a teacher.

Wisdom does not sneak up on a distracted mind.

It has to be chased with real attention.

👂 Incline means physically leaning in

🎓 Ancient students leaned toward their teacher

📵 Wisdom does not arrive during distraction

➡️ It takes real, focused attention

---

## 🎯 Apply Thine Heart To Understanding

"Apply" means aiming something with effort and purpose.

In the Bible, the heart is not just the seat of emotion.

It stands for a person's whole inner will, the part that decides.

Understanding is not accidental information.

It is a target a person aims at on purpose.

🎯 Apply means aim with real effort

❤️ Heart means the whole inner will

🧭 Not just emotion, but decision

📖 Understanding is aimed at, not accidental

---

## 📣 Criest After Knowledge, And Liftest Up Thy Voice

This describes crying out loud, not a quiet inner wish.

Ancient Hebrew poetry often says one idea two different ways in a row.

Crying after knowledge and lifting the voice describe the same search.

The repetition adds weight, not a second action.

📣 Criest means crying out loud

🔁 Hebrew poetry often repeats an idea

🙌 Both phrases describe one urgent search

📖 Repetition adds weight, not new action

---

## ⛏️ Seekest Her As Silver, And Searchest For Her As For Hid Treasures

In the ancient world, silver had to be dug and refined from ore by hand.

Finding buried treasure meant real digging, not a lucky glance at the ground.

Solomon compares wisdom to both, something valuable enough to work hard for.

Casual interest never uncovers it, determined searching does.

⛏️ Silver was mined and refined by hand

💎 Treasure required real digging, not luck

💪 Wisdom takes the same hard work

📖 Only determined searching finds it

# Proverbs 2:5-8
# 🛡️ Wisdom Comes From The LORD
---
## 😨 Then Shalt Thou Understand The Fear Of The LORD, And Find The Knowledge Of God

"Fear of the LORD" does not mean being afraid of God like an enemy.

It means taking God so seriously that His view shapes your choices.

"Knowledge of God" means a real, personal knowing, not just facts about Him.

Both phrases describe one reward, given once wisdom is truly sought.

😨 Fear of the LORD is not terror

🙇 It means taking God seriously

🤝 Knowledge of God means personal knowing

📖 Both phrases describe the same reward

---

## 🎁 The LORD Giveth Wisdom

Wisdom is not something a person invents by being clever enough.

It is a gift, given by God to those who genuinely ask.

That protects a proud person from claiming credit that is not theirs.

It also gives real hope to someone who feels far from wise today.

🎁 Wisdom is a gift, not an invention

🙏 It is given to those who ask

🚫 No one earns it by being clever

📖 Hope, even for someone who feels far off

---

## 👄 Out Of His Mouth Cometh Knowledge And Understanding

"His mouth" is a picture for God's spoken word.

Ancient Israel did not have a written Bible sitting on every shelf.

Knowledge came first through what God spoke and what was passed down by teachers.

Wisdom still begins outside a person, with what God has said.

👄 Mouth pictures God's spoken word

📜 Israel first heard truth, then later wrote it

🗣️ Teachers passed down what God spoke

📖 Wisdom starts outside us, with God

---

## 🛡️ A Buckler To Them That Walk Uprightly

A "buckler" was a small round shield strapped to the forearm.

It protected a soldier in close combat, not from a distance.

Calling God a buckler means He guards up close, in real danger.

"Uprightly" describes a life lived honestly, matching what a person believes.

🛡️ Buckler was a small forearm shield

⚔️ Used in close combat, not distance

🤲 God guards up close, not far off

📖 Uprightly means an honest, matching life

---

## ⚖️ He Keepeth The Paths Of Judgment, And Preserveth The Way Of His Saints

"Paths of judgment" means the roads of fair, right decisions.

God actively guards those roads.

He does not just approve of them from a distance.

"Saints" here does not mean famous dead Christians honored by a church.

In the Old Testament it simply means God's set apart, faithful people.

⚖️ Paths of judgment mean fair decisions

👁️ God actively guards that road

✝️ Saints does not mean famous dead figures

📖 It means God's set apart people

# Proverbs 2:9-11
# 💛 Wisdom Enters The Heart
---
## 🙏 Righteousness, And Judgment, And Equity

"Righteousness" means living in right relationship with God and others.

"Judgment" means the skill of weighing a case with justice.

"Equity" means treating every person the same, no matter their status.

Wisdom does not stay abstract.

It shows up in how a person treats others.

🙏 Righteousness means right relationship with God

⚖️ Judgment means weighing a case with justice

🤝 Equity means treating everyone the same

📖 Wisdom shows up in how we treat others

---

## 🚪 When Wisdom Entereth Into Thine Heart

"Entereth" pictures wisdom moving in and settling down, not just visiting.

Think of a guest who moves in permanently instead of staying one night.

Once wisdom lives in the heart, it starts shaping everyday decisions.

It is no longer outside information a person has to remember on purpose.

🚪 Entereth means moving in, not visiting

🛏️ Like a guest who stays for good

🧠 It starts shaping daily decisions

📖 No longer outside information to recall

---

## 😊 Knowledge Is Pleasant Unto Thy Soul

This corrects a common assumption that learning wisdom feels heavy or dull.

"Pleasant" means it brings real enjoyment, the way a good meal satisfies hunger.

Wisdom was never meant to feel like a chore forced on a person.

God designed understanding to feel like a genuine delight.

😊 Corrects the idea that wisdom feels dull

🍽️ Pleasant means real enjoyment, like a good meal

🚫 Not a chore forced on anyone

📖 Understanding is designed to feel like delight

---

## 🧭 Discretion Shall Preserve Thee, Understanding Shall Keep Thee

"Discretion" means the wisdom to make a careful call before acting.

"Preserve" and "keep" both picture a guard standing watch over something valuable.

Here wisdom is not just a teacher.

It is also a bodyguard.

It protects a person from choices they would later regret.

🧭 Discretion means a careful call before acting

🛡️ Preserve and keep both picture a guard

👮 Wisdom is also a bodyguard here

📖 It protects us from later regret

# Proverbs 2:12-15
# 🕶️ Deliverance From Evil Men
---
## 🚫 To Deliver Thee From The Way Of The Evil Man

This corrects the idea that wisdom is only about being smart.

Wisdom also functions as protection, pulling a person away from real danger.

"The evil man" is not a distant villain.

He is often someone nearby, easy to imitate.

Wisdom gives a person the discernment to spot that influence early.

🚫 Corrects wisdom as only being smart

🛟 Wisdom also functions as protection

👥 The evil man is often nearby

📖 Discernment spots the influence early

---

## 🔁 The Man That Speaketh Froward Things

"Froward" is a word this chapter uses again and again.

It means twisted, stubborn, and deliberately turned away from what is right.

A froward person does not stumble into wrong.

They choose it on purpose.

This word sets up a pattern the rest of the chapter keeps returning to.

🔁 Froward repeats through this whole chapter

🌀 It means twisted and deliberately wrong

🎯 Chosen on purpose, not stumbled into

📖 A pattern the chapter keeps returning to

---

## 🛤️ Who Leave The Paths Of Uprightness, To Walk In The Ways Of Darkness

The Bible often pictures a right life as a lit, visible path.

Leaving that path does not happen by accident.

It is a deliberate turn.

"Darkness" pictures a way a person cannot fully see, full of hidden danger.

Choosing that path means giving up light on purpose.

🛤️ A right life pictured as a lit path

🔀 Leaving it is a deliberate turn

🌑 Darkness means hidden, unseen danger

📖 Giving up light on purpose

---

## 😈 Who Rejoice To Do Evil, And Delight In The Frowardness Of The Wicked

This describes something more troubling than simply doing wrong.

It describes actually enjoying it, feeling pleasure instead of guilt.

A conscience can grow calloused enough to celebrate what should cause shame.

Solomon names this stage because it is further down the same road.

😈 Describes enjoying evil, not just doing it

💔 Pleasure instead of guilt

🧊 A conscience can grow calloused over time

📖 A late stage on the same road

---

## 🌀 Whose Ways Are Crooked, And They Froward In Their Paths

"Crooked" pictures a path that bends and twists instead of running straight.

It is the opposite of the honest, direct road wisdom walks.

This verse repeats "froward" one more time, tying the whole section together.

A crooked, froward life is the description this section warns against.

🌀 Crooked means a bent, twisting path

🛣️ The opposite of an honest, straight road

🔁 Froward is repeated once more here

📖 This is the life the section warns against

# Proverbs 2:16-19
# 🚪 Deliverance From The Strange Woman
---
## 🚫 The Strange Woman, Even The Stranger Which Flattereth With Her Words

"Strange woman" is a Hebrew idiom, not a note about her nationality.

It refers to a woman forbidden to a man because of marriage, hers or his.

"Flattereth" means smooth speech that lowers a person's guard.

Her words feel like an invitation, but the goal is to trap, not to bless.

🚫 Strange woman is an idiom, not nationality

💍 She is forbidden because of marriage

🗣️ Smooth speech that lowers a person's guard

📖 Her invitation is designed to trap

---

## 💑 Which Forsaketh The Guide Of Her Youth

"The guide of her youth" refers to her own husband, the man she married when young.

In ancient Israel, marriage was viewed as a lifelong guide, not a temporary arrangement.

"Forsaketh" means abandoning that guide completely, not simply drifting from him.

This phrase names exactly who is being wronged by her unfaithfulness.

💑 Guide of her youth means her husband

📜 Marriage was viewed as a lifelong guide

🚪 Forsaketh means abandoning him completely

📖 Names exactly who is being wronged

---

## 💍 Forgetteth The Covenant Of Her God

Marriage in Israel was never viewed as a private, personal agreement.

It was a covenant, a formal promise made with God as the witness.

"Forgetteth" does not mean simply losing memory of a fact.

It means treating a sacred promise as if it never mattered.

💍 Marriage was a covenant, not a private deal

🙏 God stood as witness to that promise

🧠 Forgetteth means more than losing memory

📖 Treating a sacred promise like nothing

---

## 📉 Her House Inclineth Unto Death, And Her Paths Unto The Dead

"Inclineth" pictures something leaning, tipping slowly toward a direction.

Her house is not literally falling.

It is heading toward ruin.

Every path built on this choice ends up at the same place.

The chapter is blunt on purpose.

This road does not lead somewhere neutral.

📉 Inclineth means slowly tipping toward

🏚️ Her house is heading toward ruin

🔀 Every path leads to the same end

📖 This road is not a neutral one

---

## ⚠️ None That Go Unto Her Return Again, Neither Take They Hold Of The Paths Of Life

This is not a claim that every single person is trapped forever.

It is a warning about how entangling this path usually becomes.

"The paths of life" describes the flourishing, godly life wisdom offers instead.

The chapter wants its reader to see the danger before stepping onto that road.

⚠️ Not a claim everyone is trapped forever

🕸️ A warning about how entangling it becomes

🌿 Paths of life means the flourishing road

📖 See the danger before stepping in

# Proverbs 2:20-22
# 🌳 The Two Paths, Two Endings
---
## 🎯 That Thou Mayest Walk In The Way Of Good Men

This verse states the whole chapter's point plainly.

Wisdom was never only about knowing the right answer.

It was always about which road a person actually walks.

Everything before this verse builds toward this one turn of direction.

🎯 States the whole chapter's point plainly

🧠 Wisdom is not only right answers

🚶 It is about which road we walk

📖 Everything builds toward this turn

---

## 🗺️ The Upright Shall Dwell In The Land

"The land" is not just real estate to ancient Israel.

It was the specific inheritance God promised to His people.

To dwell there in safety was a sign of walking in God's favor.

Staying rooted in that promise meant staying rooted in obedience.

🗺️ The land was Israel's promised inheritance

🏠 Dwelling there safely was a sign of favor

🌳 Rootedness in the promise meant obedience

📖 Staying meant staying close to God

---

## 🪓 The Wicked Shall Be Cut Off From The Earth

This pictures a tree being cut down at its trunk.

Something once standing tall is suddenly removed from where it grew.

The image is sudden and final, not a slow fade.

It matches the earlier picture of a house leaning toward ruin.

🪓 Pictures a tree cut down at the trunk

🌳 Something tall is suddenly removed

⚡ Sudden and final, not a slow fade

📖 It matches the earlier ruined house

---

## 🌱 The Transgressors Shall Be Rooted Out Of It

"Rooted out" is a gardening picture, pulling a plant out by its roots.

That is a deeper removal than simply cutting off the top.

Nothing is left behind to grow back later.

The chapter opened with an invitation and closes with this final warning.

🌱 Rooted out means pulled out by the roots

✂️ Deeper than just cutting off the top

🚫 Nothing is left to grow back

📖 The chapter closes on this final warning
`.trim();

export const PROVERBS_TWO_PERSONAL_SECTIONS = parseProverbsTwoRawNotes(PROVERBS_TWO_RAW_NOTES);
