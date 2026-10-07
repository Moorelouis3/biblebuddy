export type MalachiTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMalachiTwoRawNotes(rawText: string): MalachiTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MalachiTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Malachi\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Malachi 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Malachi\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Malachi\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Malachi 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Malachi 2:${startVerse}` : `Malachi 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Malachi 2 sections, received " + sections.length);
  }

  return sections;
}

const MALACHI_TWO_RAW_NOTES = `# Malachi 2:1-4
# ⚖️ A Curse For The Priests
---
## This Commandment Is For You

God now turns from Israel in general straight to its priests.

Chapter one already named the priests as the ones despising God's table.

Now they get a command aimed at them alone.

What follows is not a suggestion they can set aside.

⚖️ Aimed directly at the priests

🔁 Follows chapter one's rebuke

📜 A command, not a suggestion

📖 Leaders answer to a higher standard

## If Ye Will Not Lay It To Heart

To lay something to heart means to take it seriously enough to change.

God is not asking for a feeling here.

He wants the priests to actually listen and respond.

Hearing the words without changing anything is the same as not hearing them at all.

❤️ Lay to heart means truly listen

🙉 Not a feeling but a response

🚫 Hearing without changing is not hearing

📖 God wants a real response

## I Will Curse Your Blessings

God says He will turn the very blessings they expect into curses instead.

This is not a future threat only.

Yea, I have cursed them already means judgment has already begun.

The priests are living under this curse right now, whether they feel it or not.

🔄 Blessings turned into curses

⏳ Not only a future threat

✅ The curse has already begun

📖 Judgment can start before it is felt

## Spread Dung Upon Your Faces

This is one of the most shocking images in the whole Old Testament.

Dung here refers to the waste of the sacrificial animals, normally burned far outside the camp.

God says that very waste will end up smeared on the priests themselves.

Those who were supposed to handle what is holy are pictured covered in what is unclean.

🤢 Dung means sacrificial animal waste

🔥 Normally burned far from camp

💩 Now smeared on the priests

📖 Holy hands pictured utterly unclean

## One Shall Take You Away With It

This pictures the priests being hauled off like garbage headed for the dump.

It is a vivid image of total disgrace.

Those who once stood at the altar end up thrown out with the filth itself.

Nothing is left of their former honor in this picture.

🗑️ Pictured like garbage for the dump

😳 A vivid image of disgrace

⚰️ Altar servants thrown out with filth

📖 Honor is completely erased here

## My Covenant Might Be With Levi

Levi was one of Jacob's twelve sons, and his descendants became the priestly tribe.

God made a special covenant with that tribe to serve Him at the altar.

This verse says the real goal of the coming judgment is to protect that covenant.

God disciplines His priests because the covenant still matters to Him.

👨‍👦 Levi fathered the priestly tribe

🤝 God's covenant set them apart

🎯 Judgment aims to protect that covenant

📖 Discipline shows the covenant still matters

# Malachi 2:5-9
# 🕊️ The Covenant Of Levi
---
## My Covenant Was With Him Of Life And Peace

Him here refers to Levi, standing in for the whole priestly line descended from him.

God's covenant with that line promised life and peace in return for faithful service.

This was never a cold contract.

It was a real relationship with real benefits attached.

👨‍👦 Him refers to Levi's whole line

🤝 Covenant promised life and peace

❤️ Never just a cold contract

📖 A real relationship not paperwork

## The Fear Wherewith He Feared Me

Fear here does not mean being terrified.

It means a deep respect that shapes how a person lives.

Levi's whole line once served God with that kind of reverence.

That reverence is exactly what today's priests have lost.

😨 Fear here means deep respect

🙏 Reverence shaped how Levi lived

📉 Today's priests have lost it

📖 Reverence should still shape worship

## The Law Of Truth Was In His Mouth

The ideal priest taught the law exactly as God gave it, without twisting it.

Truth here means teaching that matches reality, not personal opinion.

People could trust what came out of his mouth completely.

That trust is the whole point of having a teaching priest at all.

📜 Taught the law without twisting it

✅ Truth means teaching that matches reality

🤝 People could trust his words

📖 Trust is the point of a teacher

## Iniquity Was Not Found In His Lips

Iniquity means sin or moral wrongdoing.

This priest did not use his position to spread lies or twist the truth for gain.

His words and his character matched each other.

That consistency is exactly what later priests failed to keep.

⚖️ Iniquity means sin or wrongdoing

🚫 Did not twist truth for gain

🪞 Words and character matched

📖 Later priests lost that consistency

## Walked With Me In Peace And Equity

Equity means fairness, treating every person the same way under the law.

Walking with God pictures an ongoing, daily closeness, not a single good moment.

Peace and fairness marked this priest's entire life, not just his sermons.

That kind of consistency is rare and worth noticing.

⚖️ Equity means real fairness

🚶 Walking pictures ongoing closeness with God

🕊️ Peace and fairness marked his life

📖 Consistency like this is rare

## Turn Many Away From Iniquity

A good priest did more than keep himself clean.

He actively pulled other people back from sin through his teaching.

This was the practical result of carrying truth in his mouth.

Teaching that only protects the teacher misses half the job.

🙋 A good priest stayed clean himself

🤝 He also pulled others from sin

📚 Teaching truth produced real results

📖 Good teaching protects more than the teacher

## The Priest's Lips Should Keep Knowledge

Priests were expected to be a living library of God's instructions.

People were supposed to be able to come and ask, and trust the answer.

Keep here means guard carefully, not just store somewhere.

Losing that knowledge meant the whole nation lost its main source of truth.

📚 Priests held God's instructions

❓ People could ask and trust the answer

🔒 Keep means guard carefully

📖 Losing it cost the whole nation

## He Is The Messenger Of The LORD

Messenger is the same idea behind the name Malachi itself, back in chapter one.

A true priest was meant to carry God's words faithfully to the people.

This verse ties the priest's whole job back to that one word.

Carrying a message faithfully was never optional for the priesthood.

📯 Messenger echoes the name Malachi

🗣️ Priests carried God's words to people

🔗 Ties the job to one word

📖 Faithful delivery was never optional

## Ye Have Corrupted The Covenant Of Levi

God now turns from the ideal priest to the real ones standing in front of Him.

Corrupted means they twisted something good until it no longer worked as intended.

The very covenant meant to set them apart is the one they broke.

They have caused many to stumble instead of guiding them straight.

🔄 From the ideal priest to the real

🧨 Corrupted means twisted until broken

💔 They broke their own covenant

📖 Guides became a cause of stumbling

## Made You Contemptible And Base

Contemptible means looked down on, worthy of scorn.

Base means low and without honor.

God says their own actions earned them this reputation among the people.

Nobody forced that judgment on them from the outside.

🙄 Contemptible means worthy of scorn

📉 Base means low and dishonored

🪞 Their own actions earned it

📖 The judgment was never forced on them

## Partial In The Law

Partial here means showing favoritism instead of applying the law evenly.

Some worshipers likely got easier treatment than others at the altar.

A law applied unevenly stops being trustworthy for anyone.

That unfairness is exactly what broke the people's trust in their priests.

⚖️ Partial means real favoritism

💰 Some got easier treatment than others

🚫 Uneven law loses all trust

📖 Unfairness broke the people's trust

# Malachi 2:10-12
# 💔 Treachery Against A Brother
---
## Have We Not All One Father?

This question points back to Jacob, the shared ancestor of every tribe in Israel.

Every person in the room could trace their family back to that same man.

Shared blood should have made betrayal between them almost unthinkable.

Instead, that shared history is exactly what gets violated next.

👴 One father points to Jacob

🌳 Every tribe shares that ancestor

🚫 Shared blood should stop betrayal

📖 Shared history gets violated anyway

## Hath Not One God Created Us?

This second question widens the point beyond family ties.

Every Israelite was also created by the very same God.

Two bonds stack on top of each other here, blood and Creator.

Breaking faith with a brother breaks faith on both levels at once.

🙏 Points to one shared Creator

🧬 Adds to the shared ancestor

🔗 Two bonds stack together here

📖 Betrayal breaks both at once

## Profaning The Covenant Of Our Fathers

Profaning means treating something sacred as if it were ordinary or disposable.

The covenant of our fathers points back to the promises God made to Abraham, Isaac, and Jacob.

Breaking faith with a brother is treated here as breaking faith with that whole covenant.

A private wrong against one person reaches all the way back to an ancient promise.

🔓 Profaning means treating the sacred as ordinary

📜 The covenant traces to Abraham and Jacob

💔 One broken bond touches the whole covenant

📖 Private wrongs can carry ancient weight

## An Abomination Is Committed In Israel

Abomination is one of the strongest words the Old Testament uses for wrongdoing.

It describes something that disgusts God at the deepest level.

The text does not soften what just happened by calling it a mistake.

Naming it this plainly removes any excuse for treating it lightly.

🚨 Abomination is an extremely strong word

🤢 It describes something that disgusts God

🚫 Not softened into a mere mistake

📖 Plain naming removes every excuse

## Married The Daughter Of A Strange God

This phrase does not mean God literally has a daughter.

It means marrying a woman who still worships a foreign god.

Strange here is an old word for foreign, not odd or unusual.

Marriages like this were pulling Israel's worship away from the one true God.

🚫 Not a literal daughter of God

🌍 Strange means foreign, not odd

💍 Marrying into foreign worship

📖 This pulled Israel from true worship

## The Master And The Scholar

This old phrase is genuinely hard to translate, and scholars read it a few different ways.

Many believe it was simply a way of saying every last one, no exceptions.

The LORD will cut off means removing someone from the covenant community entirely.

Whoever did this would not be allowed to quietly stay part of the people.

❓ A hard phrase to translate exactly

🔢 Many read it as every last one

✂️ Cut off means removed from the community

📖 No quiet exception was allowed

# Malachi 2:13-16
# 😢 Covering The Altar With Tears
---
## Covering The Altar Of The LORD With Tears

This pictures men showing up at the altar in visible distress, weeping and crying out loud.

The tears are not about losing a loved one.

They are about God refusing to accept their offerings anymore.

Even real emotion cannot undo what their own unfaithfulness caused.

😢 Men weep openly at the altar

🚫 Not grief over a death

🙅 Grief over rejected offerings instead

📖 Emotion cannot undo the real cause

## He Regardeth Not The Offering Any More

This connects directly back to the rejected offerings from chapter one.

God is still refusing to accept what these men bring to the altar.

Tears at the altar were not fixing the deeper problem underneath.

The problem was never the offering itself, it was the life behind it.

🔗 Connects back to chapter one

🙅 God still refuses the offerings

😢 Tears could not fix it

📖 Real problem was the life behind it

## The Wife Of Thy Youth

This phrase points to the man's first wife, the one he married early in life.

She had likely stood by him for years before this moment.

Youth here highlights how long this relationship had already lasted.

This was not a new or casual relationship being discussed.

💍 Wife of thy youth means his first wife

⏳ She had stood by him for years

🚫 Not a new or casual bond

📖 Long history makes betrayal heavier

## Thou Hast Dealt Treacherously

Dealt treacherously describes breaking trust with someone who trusted you completely.

This exact charge was already used earlier in the chapter about brother against brother.

Now it lands specifically on how these men treated their own wives.

The same sin that broke the nation also broke their homes.

🔪 Dealt treacherously means broken trust

🔁 Already named earlier in the chapter

🏠 Now aimed at their own wives

📖 One sin broke the nation and the home

## The Wife Of Thy Covenant

Covenant here means marriage was never just a private arrangement between two people.

It was a formal promise made with God himself as a witness.

Breaking that promise was not only hurting a spouse.

It was breaking faith with God who witnessed the vow.

📜 Marriage was a formal covenant

👁️ God witnessed the original promise

💔 Breaking it hurt more than a spouse

📖 It broke faith with God too

## Did Not He Make One?

This question looks back to creation, when God made one man and one woman as a pair.

He had the power to make many partners for Adam if He wanted to.

He chose to make exactly one, establishing the pattern marriage was meant to follow.

That original design is the standard being violated in this chapter.

🌱 Looks back to creation itself

👫 God chose to make exactly one

💑 This set the pattern for marriage

📖 That design is being violated here

## He Might Seek A Godly Seed

Godly seed means children raised to know and follow the one true God.

This was one real purpose behind the marriage pattern just described.

Marrying outside the faith, as verse eleven already described, worked against that very purpose.

A marriage was never just about the two people inside it.

🌱 Godly seed means faithful children

🎯 A real purpose behind marriage

🚫 Verse eleven's marriages worked against it

📖 Marriage always reached beyond the couple

## Take Heed To Your Spirit

This exact warning appears twice in just a few verses, in verse fifteen and verse sixteen.

Spirit here means a person's inner attitude, not just their outward actions.

Repeating a warning in scripture is rarely an accident.

God wanted this point impossible to miss.

🔁 Repeated twice in a few verses

🧠 Spirit means inner attitude

📣 Repetition is rarely an accident

📖 God wanted this impossible to miss

## He Hateth Putting Away

Putting away is the old phrase for divorce.

God states His own view here in the plainest possible words.

This does not mean every divorce situation is identical or without mercy elsewhere in scripture.

It does mean divorce was never God's design or desire for marriage.

🚫 Putting away means divorce

🗣️ God states His view plainly

⚖️ Not every case is identical

📖 Divorce was never God's design

## One Covereth Violence With His Garment

This is another old idiom that is genuinely hard to picture today.

Many scholars believe it pictures stained clothing, with violence covering the man like a visible mark.

Garments in this culture often symbolized a person's covenant status or standing.

Divorcing a faithful wife is pictured here as an act of real violence, not a neutral legal step.

❓ A hard idiom to picture today

🩸 Pictures violence staining the garment

📜 Garments often marked covenant standing

📖 Divorce pictured as real violence

# Malachi 2:17
# 😤 Wearying God With Words
---
## Ye Have Wearied The LORD With Your Words

Wearied means worn out or exhausted, the way constant complaining wears out a listener.

God is not literally getting physically tired here.

The image describes how their constant complaints have piled up before Him.

Words alone were enough to create this kind of exhaustion.

😩 Wearied means worn out

🙅 Not physical tiredness for God

📢 Constant complaints piled up

📖 Words alone caused this weight

## Every One That Doeth Evil Is Good

This is the actual complaint hiding behind their innocent sounding question.

They had started saying openly that evil people seemed to do just fine.

Watching the wicked prosper can quietly plant this exact doubt in anyone.

Saying it out loud is what finally wearied God.

🗣️ Their real complaint, stated plainly

👀 Evil people seemed to prosper

🌱 Doubt grows from watching that

📖 Saying it aloud wearied God

## Where Is The God Of Judgment?

This question accuses God of being absent or asleep on justice.

It assumes He has stopped caring about right and wrong entirely.

This exact question is answered directly in the very next chapter.

A messenger of judgment is already on the way when this book continues.

❓ Accuses God of being absent

💤 Assumes He stopped caring

➡️ Answered directly in chapter three

📖 Judgment was already on the way
`.trim();

export const MALACHI_TWO_PERSONAL_SECTIONS = parseMalachiTwoRawNotes(MALACHI_TWO_RAW_NOTES);
