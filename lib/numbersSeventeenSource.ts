export type NumbersSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersSeventeenRawNotes(rawText: string): NumbersSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 17:${startVerse}` : `Numbers 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Numbers 17 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_SEVENTEEN_RAW_NOTES = `# Numbers 17:1-3
# 🌿 Twelve Rods, One For Each Tribe
---
## 🪄 Take Of Every One Of Them A Rod

A rod means a straight wooden staff.

It was not a weapon.

It was the mark of authority a family leader carried every day.

Cut wood cannot sprout new growth once it is separated from its roots.

That simple fact is what makes the coming test impossible to fake.

🪄 A rod means a leader's staff

🌳 Not a weapon at all

🔑 An everyday object anyone could recognize

📖 Cut wood cannot grow on its own

## 🏠 According To The House Of Their Fathers

The house of their fathers means a tribe's family line.

It traces back to the one son of Jacob that tribe descended from.

This phrase already organized Israel's census back in chapters one and two.

Every original reader already knew exactly which group this meant.

🏠 House of their fathers means a family line

📋 Traces back to one of Jacob's sons

🔢 Already used to organize Israel's census

📖 A familiar phrase, not a new one

## 👑 Of All Their Princes

Princes here means the twelve tribal chiefs.

Numbers chapter one already named and counted these same twelve leaders.

Twelve rods meant one rod for every tribe, with no tribe left out.

None of the twelve got a second chance either.

👑 Princes means the twelve tribal chiefs

📚 Already named in Numbers chapter one

🔢 One rod for every tribe

➡️ An equal test for every tribe

## ✍️ Write Thou Every Man's Name Upon His Rod

Each rod was personally labeled before the test even began.

That labeling removed any room for confusion about which rod belonged to which leader.

Whatever happened next, everyone would know exactly whose rod it was.

The test was built so the result could not be argued with afterward.

✍️ Each rod personally labeled beforehand

🔍 No room left for confusion

🤝 Everyone would know whose rod it was

📖 Built so the result could not be disputed

## 🎗️ Write Aaron's Name Upon The Rod Of Levi

Aaron's name goes on the rod that stands for the whole tribe of Levi.

This is God's answer to the challenge Korah raised only one chapter earlier.

Korah argued that Aaron had no more right to the priesthood than any other Levite.

Levi is normally counted apart from the other tribes in Israel's census.

Here, for this test, Levi's rod stands right beside everyone else's.

🎗️ Aaron's rod stands for all of Levi

⚔️ God's answer to Korah's challenge

🔢 Levi is normally counted apart from Israel

📖 Here Levi stands on equal footing

# Numbers 17:4-5
# 📜 Laid Before The Testimony
---
## 🕍 Before The Testimony

The testimony refers to the ark of the covenant.

Inside the ark sat the stone tablets of the Ten Commandments.

Those tablets were physical proof of God's covenant with Israel.

Placing the rods there put the test in the most sacred space in the whole camp.

No ordinary Israelite could even enter that space to tamper with the results.

🕍 Testimony means the ark of the covenant

📜 Held the Ten Commandments tablets inside

🚪 The most sacred, restricted space in camp

➡️ No ordinary person could reach the rods

## 🤝 Where I Will Meet With You

This location was not chosen at random.

God had already promised this exact spot to Moses.

That promise came back in Exodus chapter twenty five.

Running the test here ties it to God's own presence, not just to Moses's authority.

🤝 Not a random location

🗺️ Already promised back in Exodus

👤 Tied to God's presence, not just Moses

📖 The result would come from its true source

## 🌱 The Man's Rod, Whom I Shall Choose, Shall Blossom

A dead, cut branch cannot sprout new growth on its own.

That simple fact is exactly what makes this test work.

Whichever rod blossoms overnight will have done something wood cannot do naturally.

The outcome could only be explained one way, as God's own doing.

🌱 Cut wood cannot sprout on its own

🚫 Nothing about this could happen naturally

🎯 One outcome, one honest explanation

📖 The result would have to be God's doing

## 🗣️ Make To Cease From Me The Murmurings

Murmurings means Israel's constant grumbling against Moses and Aaron.

This same word already showed up after the spies' bad report in chapter fourteen.

It showed up again just one chapter earlier, during Korah's rebellion in chapter sixteen.

God states plainly that this test exists to put that pattern to rest for good.

🗣️ Murmurings means Israel's constant grumbling

📚 Already seen in chapters fourteen and sixteen

🎯 This test targets that exact pattern

➡️ Meant to end the pattern for good

# Numbers 17:6-7
# 📦 The Rods Gathered And Laid Before The LORD
---
## 🙌 Every One Of Their Princes Gave Him A Rod Apiece

All twelve tribal leaders actually complied and handed over their rods.

Nobody refused or hesitated.

Just one chapter earlier, Dathan and Abiram flatly refused to even appear before Moses.

This time, every single leader cooperated without a fight.

🙌 Full compliance from all twelve leaders

🚫 Nobody refused or hesitated

🔁 A contrast with Dathan and Abiram's refusal

📖 Complete cooperation this time

## 🪵 The Rod Of Aaron Was Among Their Rods

Aaron's rod is not singled out or given any special placement.

It sits alongside the other eleven rods exactly the same way.

If Aaron's claim was going to be proven, it would happen on equal footing.

Nothing about the setup gave him any advantage.

🪵 No special treatment for Aaron's rod

⚖️ Sits alongside the other eleven

🎯 Proven on completely equal footing

📖 No advantage built into the test

## 📦 The Tabernacle Of Witness

Tabernacle of witness is another name for the same tent.

Earlier in this chapter it was called the tabernacle of the congregation.

Both names point back to the ark's tablets, which served as legal witness to the covenant.

Even this location's name points forward to what is about to be proven.

📦 Another name for the same tent

⚖️ Points back to the ark's tablets

📜 Those tablets were the covenant's witness

📖 The name itself points to what is coming

# Numbers 17:8-9
# 🌰 Aaron's Rod Buds, Blossoms, And Bears Almonds
---
## 🌅 On The Morrow

Morrow is an old word that simply means the next day.

Moses does not wait weeks to check the results.

The test resolves overnight.

That leaves no long stretch of time where doubt or tampering could creep in.

🌅 Morrow means the next day

⏱️ Resolved overnight, not over weeks

🚫 No long gap for doubt to grow

📖 A test with no room to tamper

## 🌸 Budded, And Brought Forth Buds, And Bloomed Blossoms, And Yielded Almonds

This describes three separate growth stages, budding, blossoming, and bearing fruit.

An almond tree normally moves through those stages over weeks or months.

Aaron's cut, dead rod does all three at once, overnight.

Nothing about what caused it is left in doubt.

🌸 Three stages, budding to blossoming to fruit

⚡ Normally takes weeks or months

🌰 Happens overnight on a dead branch

📖 Nothing left in doubt about the cause

## 🌰 Almonds

The almond tree held special meaning in Israel.

It was the first tree to bloom each year.

Snow was often still on the ground when it bloomed.

Its Hebrew name, shaqed, comes from the word for watching or waking.

The prophet Jeremiah later uses this same tree as a sign that God is watching over His word.

🌰 First tree to bloom each year

❄️ Snow was often still on the ground

🗣️ Hebrew name means watching or waking

📖 A sign that God is watching

## 👀 They Looked, And Took Every Man His Rod

This was not a private announcement.

Every tribal leader personally saw and handled his own rod again.

His rod was still plain dead wood, right next to Aaron's rod, now covered in living fruit.

Nobody had to simply take Moses's word for what happened.

👀 Every leader saw his own rod again

🌿 Compared directly against Aaron's living branch

🙅 Nobody just took Moses's word for it

📖 A public, undeniable result

# Numbers 17:10-11
# 🏺 Kept As A Permanent Warning
---
## 🏺 To Be Kept For A Token Against The Rebels

God does not let this proof fade into memory.

He commands it kept permanently, right next to the covenant tablets themselves.

Hebrews chapter nine later confirms this rod stayed with the ark for generations.

It became a physical object anyone could still point to long after every eyewitness had died.

🏺 Kept permanently next to the covenant tablets

📜 Hebrews nine confirms it stayed for generations

👁️ Proof that outlasted every eyewitness

📖 A lasting, physical reminder

## 🛑 That They Die Not

God ties this rod's purpose directly to preventing more death.

The murmuring behind Korah's rebellion in the last chapter had already cost thousands of lives.

Keeping visible proof of Aaron's calling was meant to stop that complaint from rising again.

A lasting object was meant to head off a repeat tragedy.

🛑 Tied to preventing more deaths

📊 Chapter sixteen already cost thousands of lives

🔁 Meant to stop the complaint from returning

📖 A lasting object against repeat tragedy

## ✅ As The LORD Commanded Him, So Did He

This is a short, simple line about obedience.

It fits a pattern already well established for Moses throughout this book.

Whatever God commands, Moses carries it out exactly.

He does not edit it or negotiate the terms.

✅ A brief line about obedience

🔁 Fits Moses's established pattern

🎯 He carries out commands exactly

📖 No editing, no negotiating

# Numbers 17:12-13
# 😨 Israel's Terrified Response
---
## 😱 We Die, We Perish, We All Perish

Saying the same idea three times in a row is a Hebrew way of showing real panic.

This is not simply stating a fact.

It comes right after chapter sixteen ended with over fourteen thousand people dead from a plague.

The fear in this line is not exaggerated.

😱 Repeating an idea three times signals panic

📊 Chapter sixteen already killed thousands

🎯 Not exaggeration, real fear

📖 A completely understandable reaction

## 🚪 Whosoever Cometh Any Thing Near Unto The Tabernacle Of The LORD Shall Die

The people draw a sweeping, fearful conclusion here.

They believe simply being near God's presence is now dangerous for anyone, not just for open rebels.

That is an overcorrection born out of real trauma.

It does not match what actually happened.

🚪 Nearness itself now feels deadly to them

😨 Born from real trauma

🎯 Does not match what happened

📖 Fear stretching one judgment into a general rule

## ❓ Shall We Be Consumed With Dying?

This closing question is left hanging on purpose.

It is the exact problem the next chapter exists to answer.

Numbers chapter eighteen opens with God giving Aaron and the priests a clear system.

That system directly answers the fear raised right here.

❓ Left open on purpose

📋 Numbers eighteen answers it directly

🙏 Aaron and the priests get a clear system

📖 Sets up the very next chapter
`.trim();

export const NUMBERS_SEVENTEEN_PERSONAL_SECTIONS = parseNumbersSeventeenRawNotes(NUMBERS_SEVENTEEN_RAW_NOTES);
