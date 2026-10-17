export type HebrewsFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHebrewsFourRawNotes(rawText: string): HebrewsFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HebrewsFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hebrews\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hebrews 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hebrews\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Hebrews\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hebrews 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hebrews 4:${startVerse}` : `Hebrews 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Hebrews 4 sections, received " + sections.length);
  }

  return sections;
}

const HEBREWS_FOUR_RAW_NOTES = `# Hebrews 4:1-5
# 🚪 A Rest Still Open
---
## 👀 Let Us Therefore Fear

"Fear" here does not mean terror or dread.

It means a careful, healthy alertness that keeps a person from drifting.

Chapter three just warned about hearts that quietly harden over time.

This fear is the opposite of that slow process.

Staying alert is how a believer avoids becoming the next example.

👀 Fear here means careful alertness

🚫 Not terror or dread

🪨 Chapter three warned about hardened hearts

📖 Alertness guards against slow drifting

---
## 🔗 A Promise Being Left Us Of Entering Into His Rest

"His rest" is not a new promise invented for this chapter.

It picks up the warning chapter three already raised about failing to enter.

The invitation first quoted from Psalm ninety five is still standing for this audience.

It was never withdrawn.

That means falling short is still a real danger, not ancient history.

🔗 His rest continues chapter three's warning

📜 The Psalm ninety five invitation still stands

🚪 It was never withdrawn

📖 Falling short is still possible today

---
## 🏃 Should Seem To Come Short Of It

"Come short" means to miss a goal that was actually within reach.

Think of a runner who slows down just before the finish line.

The race was never too hard.

The focus simply failed near the end.

Missing the promise would not come from a lack of opportunity.

🏃 Come short means missing a reachable goal

🏁 Pictures a runner slowing before the finish

🎯 The race was never too hard

➡️ Missing it means losing focus, not access

---
## 👂 The Gospel Preached, As Well As Unto Them

"Them" refers back to the wilderness generation from chapter three.

Both that generation and this book's readers heard the same kind of good news.

For Israel it was the promise of entering the land of rest.

For these readers it is the full gospel of Christ.

The hearing was equal even though the outcome was not.

👂 Them means the wilderness generation

📜 Both groups heard a promise of rest

✝️ These readers hear the full gospel

📖 Equal hearing did not guarantee equal belief

---
## 🧪 Not Being Mixed With Faith In Them That Heard It

Hearing good news and actually trusting it are two different things.

"Mixed with faith" pictures two ingredients combined into one, like flour mixed with water.

Without that mixing, the word never becomes anything useful.

The wilderness generation heard the promise but never let it become trust.

🧪 Mixed with faith pictures two ingredients combined

🍞 Like flour that needs water to become bread

👂 Hearing alone changes nothing by itself

📖 Trust is what makes the word useful

---
## ✝️ We Which Have Believed Do Enter Into Rest

This verse draws a sharp line between two groups.

One side simply heard a promise.

The other side believed it and is already entering what it offers.

Belief is the hinge the whole chapter turns on.

✝️ Draws a line between two groups

👂 One side only heard the promise

🚪 The other side believed and is entering it

📖 Belief is the hinge of this chapter

---
## 🏗️ Although The Works Were Finished From The Foundation Of The World

God's rest was not invented to match the readers' own timeline.

It has existed since creation itself was completed.

That means the delay in entering it was never on God's side.

The rest has simply been waiting, ready, this whole time.

🏗️ Rest existed since creation was finished

⏳ The delay was never on God's side

🚪 It has been ready and waiting

📖 Entering it was always available

---
## 📜 Of The Seventh Day

This quotation comes from Genesis chapter two, where God rested after creating the world.

That rest did not mean God grew tired.

It meant the work of creation was fully, perfectly finished.

The seventh day became the pattern behind the entire idea of rest in this chapter.

📜 Quotes Genesis two, the seventh day

🛌 God's rest meant finished, not tired

🏁 It marked creation as complete

📖 This becomes the pattern for the whole chapter

---
## 🔁 If They Shall Enter Into My Rest

This exact phrase was already quoted once in chapter three, from Psalm ninety five.

Here the writer lines it up next to the Genesis account of the seventh day.

Two separate passages, written centuries apart, both use the same word for rest.

That pairing is deliberate, not a coincidence of wording.

It shows the writer that this rest means something bigger than either a weekend pause or a plot of land.

🔁 Same phrase quoted again from Psalm ninety five

📚 Paired on purpose with Genesis two

🧩 Two passages share one key word

📖 Rest means more than land or a weekend

# Hebrews 4:6-10
# 🛌 Entering God's Rest
---
## 🚪 It Remaineth That Some Must Enter Therein

Since the wilderness generation never entered, the promise of rest was never actually fulfilled.

An unfulfilled promise does not simply expire.

Logically, someone still has to enter it eventually.

That conclusion is what opens the door for a later generation, including these readers.

🚪 The promise was never fulfilled by Israel

⏳ An unfulfilled promise does not expire

🔑 Someone still has to enter it

📖 That opens the door for later readers

---
## 📜 They To Whom It Was First Preached Entered Not In

"First" matters here.

Israel in the wilderness was the earliest audience to hear this exact promise of rest.

Being first did not make them the only chance.

Their failure to enter left the invitation open for whoever comes after them.

📜 First means the earliest audience to hear it

🏜️ Israel heard it before anyone else

🚫 Being first was not the only chance

📖 Their failure left the door open

---
## 📅 He Limiteth A Certain Day

"Limiteth" means to set a fixed boundary on something.

Here it means God marks out a specific moment for a specific invitation.

If entering rest only applied to the Exodus generation, there would be no reason to write it again.

A later passage still uses the same words, centuries after Moses.

That later passage proves the invitation kept moving forward in time.

📅 Limiteth means setting a fixed boundary

🏜️ Could have applied only to Exodus Israel

📜 A later passage reuses the same words

📖 The invitation kept moving forward in time

---
## 👑 Saying In David

"In David" points to Psalm ninety five, a psalm credited to King David.

David wrote centuries after Moses led Israel through the wilderness.

Yet David still used the word "today" when describing the same invitation to rest.

That gap in time is the whole argument.

👑 David wrote Psalm ninety five centuries later

⏳ He still called it today

🔁 Same invitation, much later writer

📖 The time gap carries the argument

---
## ⏰ After So Long A Time

Hundreds of years passed between the wilderness generation and David's psalm.

Across all that time, God still describes the rest as something open right now.

An offer that lasts for centuries is not a narrow, one time chance.

⏰ Centuries passed between Moses and David

🚪 The offer was still open in David's time

🔓 Centuries long offers are not narrow chances

📖 The invitation has never closed

---
## 🗺️ If Jesus Had Given Them Rest

"Jesus" in this verse is not Jesus Christ.

It is the Greek spelling of the Hebrew name Joshua, the leader who brought Israel into Canaan.

Joshua really did lead that generation's children into the promised land.

Even so, the writer says that land still was not the true rest.

🗺️ Jesus here means Joshua, not Christ

🚶 Joshua led Israel into Canaan

🏞️ Canaan was real, but not final

📖 A real victory, but not the final rest

---
## 📆 Then Would He Not Afterward Have Spoken Of Another Day

If entering Canaan under Joshua had settled the matter, David would have had nothing left to say.

Instead David spoke of another day, generations after Joshua's conquest.

That means Canaan was only a shadow of the real promise.

The true rest still had not arrived even after the land was won.

📆 Canaan would have closed the question

🗣️ David still spoke of another day

🏞️ The land was a shadow, not the goal

📖 The true rest had still not arrived

---
## 🏁 There Remaineth Therefore A Rest To The People Of God

This is the chapter's main conclusion stated flat.

Canaan was not it.

The wilderness generation's failure was not the end of the story.

A greater rest still waits ahead for God's people, including these readers.

🏁 This is the chapter's main conclusion

🏞️ Canaan was never the final answer

⏳ The story was not over

📖 A greater rest still waits ahead

---
## 🛌 He Also Hath Ceased From His Own Works, As God Did From His

Entering God's rest means something deeper than finishing a project.

It means ceasing the exhausting effort of trying to earn approval through constant striving.

God did not stop working from exhaustion at creation.

He stopped because the work was genuinely complete.

Entering his rest means trusting that the same kind of finished work now covers the believer.

🛌 Rest means ceasing exhausting self effort

🏗️ God stopped because the work was complete

🙌 Not exhaustion, but completion

📖 Trusting finished work is what rest means

# Hebrews 4:11-13
# 🗡️ A Word That Sees Everything
---
## 🏃 Let Us Labour Therefore To Enter Into That Rest

This sounds like a contradiction at first.

How can anyone labour to enter rest.

The labour described here is not working to earn the promise.

It is the daily effort of staying alert and trusting instead of drifting away.

🏃 Sounds like a contradiction at first

🙌 Not working to earn the promise

👀 It means staying alert in trust

📖 Effort here protects faith, not earns it

---
## 📚 Lest Any Man Fall After The Same Example Of Unbelief

"Example" means a case study, a pattern meant to be learned from.

The wilderness generation is not simply old history to skim past.

Their failure is placed here on purpose, as a warning this generation can still avoid.

📚 Example means a pattern to learn from

🏜️ The wilderness generation is not just history

⚠️ Their failure is a deliberate warning

📖 This generation can still avoid repeating it

---
## 🌱 The Word Of God Is Quick

"Quick" in the King James English does not mean fast.

It means alive, the same old meaning kept in the phrase "the quick and the dead."

God's word is described here as a living thing, not a dead record of old rules.

🌱 Quick means alive, not fast

📜 Old English kept this meaning elsewhere too

📖 God's word is living, not a dead record

➡️ A living word can still speak today

---
## 🗡️ Sharper Than Any Twoedged Sword

A twoedged sword cuts in both directions a blade can move.

Ancient soldiers prized this kind of sword for cutting cleanly through almost anything.

Comparing God's word to one says it cuts with total precision.

Nothing about a person can hide from that kind of precision.

🗡️ A twoedged sword cuts both directions

⚔️ Ancient soldiers prized its precision

🎯 God's word cuts with the same precision

📖 Nothing can hide from it

---
## 🔬 Piercing Even To The Dividing Asunder Of Soul And Spirit

No physical blade can actually separate a soul from a spirit.

This is describing a kind of seeing no sword could ever do.

"Soul" and "spirit" sit so close together in a person that only God's word can tell them apart.

The picture is depth, not literal surgery.

🔬 No physical blade can do this

👁️ It describes seeing, not cutting flesh

🧩 Soul and spirit sit very close together

📖 The picture is depth, not surgery

---
## 🦴 Of The Joints And Marrow

Joints and marrow sit at two very different depths inside the body.

A joint is visible once the skin is opened.

Marrow is hidden deep inside the bone itself.

Pairing them pictures God's word reaching the most hidden parts of a person, not just the obvious ones.

🦴 Joints are visible, marrow is hidden

📏 The pair shows two very different depths

👁️ God's word reaches the hidden parts

📖 Nothing stays too deep to be seen

---
## 🧠 A Discerner Of The Thoughts And Intents Of The Heart

"Discerner" means one who judges by seeing clearly through something.

"Thoughts" are what a person consciously reasons.

"Intents" are the hidden motives underneath those thoughts.

God's word is described as reading both layers at once.

🧠 Discerner means one who sees clearly through

💭 Thoughts are what a person reasons

🎭 Intents are the hidden motives underneath

📖 God's word reads both at once

---
## 👁️ All Things Are Naked And Opened Unto The Eyes Of Him

"Naked" here means completely exposed, with nothing left covered.

The sword image from the verse before continues directly into this one.

Nothing a person hides, even from themselves, stays hidden from God.

👁️ Naked means completely exposed

🗡️ Continues the sword picture from before

🙈 Nothing stays hidden, even from oneself

📖 God sees what no one else can

---
## ⚖️ With Whom We Have To Do

This is an old English way of naming the one a person must finally answer to.

It is not a casual relationship being described.

Every reader of this chapter stands accountable to this same God, whether they feel it or not.

⚖️ An old phrase for who we answer to

🙏 Describes real accountability, not a casual tie

👤 Every reader stands before this same God

📖 Accountability is real, felt or not

# Hebrews 4:14-16
# 👑 A High Priest Who Understands
---
## 👑 We Have A Great High Priest, That Is Passed Into The Heavens

Earthly high priests could only enter a small, curtained room inside the temple, and only once a year.

This high priest has gone directly into heaven itself, into God's own presence.

That is a much greater access than any priest before him ever had.

👑 Earthly priests entered a small curtained room

🚪 This high priest entered heaven itself

📏 His access is far greater

📖 Nothing stands between him and God's presence

---
## ✝️ Jesus The Son Of God

This is the actual Jesus Christ speaking of here, not Joshua from earlier in the chapter.

The two names look identical in Greek, which is why this chapter can mention both.

Naming him Son of God here, right where priestly access is described, ties his identity to his role directly.

✝️ This is Jesus Christ, not Joshua

🔤 Both names share one Greek spelling

👑 Son of God names his identity

📖 Identity and role are tied together here

---
## ✊ Let Us Hold Fast Our Profession

This is the second time this book gives this exact command.

Chapter three already explained that "profession" means the faith openly confessed before others.

A great high priest now backs up that confession with his own direct access to God.

Confidence here rests on who represents a person, not on their own effort.

✊ Second time this book gives this command

🗣️ Profession means faith confessed openly

👑 A great high priest now backs that confession

📖 Confidence rests on who represents us

---
## 💔 Touched With The Feeling Of Our Infirmities

"Infirmities" means weaknesses, limits, and struggles common to every human life.

This high priest does not watch human struggle from a distance.

He personally feels it alongside the person going through it.

That is very different from being judged by someone who has never struggled at all.

💔 Infirmities means common human weakness

👁️ He does not watch from a distance

🤝 He feels it alongside the person

📖 Very different from a distant judge

---
## 🧪 In All Points Tempted Like As We Are, Yet Without Sin

"All points" means every category of temptation a person actually faces, not just a few.

Being tempted and giving in to temptation are two separate things.

Jesus faced the full range of temptation and never once gave in.

That combination, full exposure with no failure, is what makes his sympathy trustworthy rather than naive.

🧪 All points means every category of temptation

🚫 Being tempted is not the same as sinning

✝️ Jesus faced it fully and never gave in

📖 That combination makes his sympathy trustworthy

---
## 🚪 Come Boldly Unto The Throne Of Grace

"Boldly" means approaching with real confidence, not creeping in afraid of punishment.

"Throne of grace" describes God's own throne, but named here for what it offers rather than for judgment.

That naming is only possible because of the high priest just described.

🚪 Boldly means confident, not afraid

👑 Named for what it offers, not judgment

🙏 Grace is the whole point of this throne

📖 This access exists because of the high priest

---
## 🙏 Obtain Mercy, And Find Grace To Help In Time Of Need

"Mercy" and "grace" are doing two different jobs in this verse.

Mercy covers failure, meaning a person is not punished as they deserve.

Grace supplies strength for whatever still lies ahead.

The whole chapter's warning about drifting away ends here, on an open invitation instead of a closed door.

🙏 Mercy covers failure already committed

💪 Grace supplies strength for what is ahead

🔑 They are two different gifts

📖 The chapter ends on an open invitation
`.trim();

export const HEBREWS_FOUR_PERSONAL_SECTIONS = parseHebrewsFourRawNotes(HEBREWS_FOUR_RAW_NOTES);
