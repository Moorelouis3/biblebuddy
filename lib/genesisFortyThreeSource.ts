export type GenesisFortyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFortyThreeRawNotes(rawText: string): GenesisFortyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFortyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+43:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 43 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+43:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+43:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 43 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 43,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 43:${startVerse}` : `Genesis 43:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Genesis 43 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_THREE_RAW_NOTES = `# Genesis 43:1-7
# 😟 Judah Confronts Jacob About The Demand
---
## 😟 The Famine Was Sore In The Land

"Sore" here does not mean painful the way it usually means today.

It means severe, describing how bad the shortage had become.

The grain the brothers carried home last time is already gone.

The family stands right back where it stood before the first trip to Egypt.

Only now Joseph has attached one hard condition to any more food.

😟 Sore means severe, not painful

🌾 The first trip's grain is already gone

⏳ Right back where the story started

📖 One new condition now blocks all food

## 🌾 Go Again, Buy Us A Little Food

Jacob's response sounds almost businesslike given how serious the famine really is.

"A little food" softens what the family desperately needs.

Jacob is choosing not to deal with the real problem yet.

The real problem is Benjamin, and he is avoiding it completely.

That avoidance cannot last through the rest of this conversation.

🌾 A little food undersells a desperate need

😶 Jacob avoids the real issue at first

👦 The real issue is Benjamin

📖 Avoidance never lasts long in this family

## 🗣️ The Man Did Solemnly Protest Unto Us

"Solemnly protest" means Joseph stated his warning firmly, almost like a sworn promise.

Judah is not paraphrasing what happened back in Egypt.

He repeats Joseph's own words so Jacob hears the real stakes.

"Ye shall not see my face" was never a passing threat.

It was the one fixed condition on ever coming back.

🗣️ Solemnly protest means a firm sworn warning

📜 Judah repeats Joseph's exact words

🚫 Ye shall not see my face was fixed

📖 One rule now controls the family's future

## 😠 Wherefore Dealt Ye So Ill With Me

This sounds like Jacob calmly asking what was said.

It is not really a question.

It is blame, aimed at his own sons.

Jacob is not thinking about what Joseph actually demanded.

He is thinking only about what this costs him now.

😠 Jacob's question is really blame

👥 He aims it at his own sons

💭 Fear pushes him to find someone to blame

📖 Panic often looks for a target

## 🤷 Could We Certainly Know That He Would Say

The brothers push back against Jacob's accusation.

Joseph asked pointed personal questions about their family.

They answered honestly, with no way to guess where it would lead.

This is the brothers' one real defense in the whole argument.

They were not scheming.

They were only answering a stranger's questions.

🤷 The brothers push back on the blame

❓ They answered honestly, not scheming

🔍 They could not guess where it would lead

📖 Honest answers are not a scheme

# Genesis 43:8-10
# 🤝 Judah Offers Surety
---
## 🍞 Send The Lad With Me, That We May Live, And Not Die

Judah shifts the argument from pride to survival.

He is not just satisfying an Egyptian official's demand anymore.

He tells his father plainly that the whole family will starve otherwise.

Even the children are at risk if they stay home arguing.

Judah finally says the thing everyone has been avoiding.

🍞 Judah shifts the argument to survival

👶 Even the children are at risk

🗣️ He says what everyone was avoiding

📖 Survival now outweighs every other concern

## 🤝 I Will Be Surety For Him

"Surety" means Judah is personally guaranteeing Benjamin's safe return.

If Benjamin does not come home, Judah says the blame is his alone.

This is the same Judah who once suggested selling Joseph for money.

Twenty years later he is offering to carry the weight instead of causing more of it.

A person can change what kind of brother he becomes.

🤝 Surety means guaranteeing someone's safe return

🔄 This is the same Judah from before

⚖️ He now offers to carry the blame himself

📖 Judah has become a different kind of brother

## ⏳ Except We Had Lingered, We Had Returned

"Lingered" means delayed, or dragged their feet instead of acting.

Judah points out how much their hesitation has already cost them.

Every day spent arguing is another day without food in Canaan.

He is not just making a moral case anymore.

He is making a practical one too.

⏳ Lingered means delayed or dragged their feet

🍞 Every day of arguing costs the family food

⚖️ Judah's case is moral and practical both

📖 Hesitation has a real growing price

# Genesis 43:11-14
# 🎁 Jacob's Instructions
---
## 🎁 Take Of The Best Fruits In The Land

Jacob finally gives in and prepares a gift for the powerful man in Egypt.

The gift included balm, honey, spices, myrrh, nuts, and almonds.

These were valuable trade goods, the best Canaan still had left during a famine.

Balm and myrrh were resins used in medicine and expensive perfume.

A gift like this was meant to soften a powerful stranger's attitude.

🎁 The gift used Canaan's best remaining goods

💰 Balm and myrrh were valuable resins

🙇 Gifts like this were meant to win favor

📖 Even famine could not empty their hands

## 💰 Take Double Money In Your Hand

Jacob tells his sons to bring back the money that mysteriously reappeared in their sacks.

He also tells them to bring double money for this trip's grain.

"Peradventure" is an old word meaning perhaps or maybe.

Jacob assumes the returned money was simply a clerk's mistake.

He has no idea it was mercy from the son he believes is dead.

💰 They must return the mystery money too

🤔 Peradventure means perhaps or maybe

😢 Jacob assumes a mistake, not mercy

📖 He cannot see the kindness hidden in it

## 🙏 God Almighty Give You Mercy Before The Man

Jacob asks God directly to soften the heart of a stranger he cannot control.

"God Almighty" is a name used only a handful of times in Genesis.

It points to God's total power over things far beyond Jacob's reach.

Prayer here replaces the plotting Jacob has been doing the whole chapter.

He finally hands the outcome to someone bigger than himself.

🙏 Jacob prays instead of plotting

💪 God Almighty names total, unmatched power

🎯 The prayer targets one stranger's heart

📖 Jacob finally hands the outcome to God

## 💔 If I Be Bereaved Of My Children, I Am Bereaved

"Bereaved" means robbed by loss or death.

Jacob has said this same kind of thing before, about Joseph.

Now he braces himself to possibly say it again about Benjamin.

He is not pretending the danger away.

He is choosing to let go of a grip he cannot actually keep.

💔 Bereaved means robbed by loss or death

🔁 Jacob said something like this once about Joseph

😨 Now he braces for it again with Benjamin

📖 Letting go costs him everything he has left

# Genesis 43:15-18
# 😨 Fear At Joseph's House
---
## 🏠 Bring These Men Home, And Slay, And Make Ready

Joseph sees Benjamin arrive and immediately orders a feast prepared.

This looks nothing like his rough treatment of the brothers back in chapter forty two.

A noon meal inside an official's private home was a genuine honor in this culture.

The brothers have no way of knowing why their treatment has suddenly changed.

All they can see is a powerful man who might be planning anything.

🏠 Joseph's tone shifts the moment he sees Benjamin

🍽️ A noon meal was a real honor

😕 The brothers cannot see why things changed

📖 Guilt makes kindness look like a trap

## 📋 The Man Did As Joseph Bade

"The man" here refers to the steward, the official running Joseph's household.

He follows Joseph's order without hesitation or explanation.

The brothers have no idea who gave the order or why.

They only see a stranger leading them somewhere unfamiliar and frightening.

Obedience up close can look like danger from the outside.

🧑‍💼 The man means Joseph's household steward

📋 He obeys Joseph's order at once

❓ The brothers do not know the reason

📖 Obedience can look like danger from outside

## 😨 The Men Were Afraid, Because They Were Brought Into Joseph's House

An invitation into a powerful man's private home should feel like an honor.

Instead these brothers feel only dread the moment they step inside.

Guilt from selling Joseph years earlier still shapes how they read every situation.

Even a moment of pure kindness gets filtered through old fear.

They cannot yet imagine that the man they fear is the brother they wronged.

😨 An honor feels like a threat to them

🏚️ Old guilt shapes how they see everything

🕰️ Years of guilt still color this moment

📖 They cannot yet see who is really inside

## ⚖️ That He May Seek Occasion Against Us

"Seek occasion against us" means looking for an excuse to accuse them.

The brothers assume the returned money back in chapter forty two was a setup.

They fear it was bait for a trap, meant to enslave them and take their animals.

Guilt has trained them to expect punishment even in a moment of real kindness.

Fear can turn an innocent gift into evidence of a plot.

😨 Seek occasion means hunting for an excuse

🪤 They believe the money was a trap

🐴 They fear losing themselves and their donkeys

📖 Guilt can make mercy look like danger

# Genesis 43:19-23
# 🗣️ The Steward Reassures Them
---
## 🚪 They Came Near To The Steward Of Joseph's House

"Communed" means they talked seriously with him, not just made small talk.

The brothers approach the steward before entering, not after.

They want to explain themselves at the door, before anyone can accuse them inside.

Fear is shaping every move they make in this scene.

Getting ahead of a problem still felt safer than waiting for it to happen.

🗣️ Communed means talked seriously

🚪 They explain themselves before entering

😰 Fear shapes every move they make

📖 Getting ahead of trouble felt safer

## 🗣️ We Came Down At The First Time To Buy Food

The brothers rush to explain themselves before anything bad can happen.

They lay out the whole story of the money that appeared in their sacks.

They insist over and over that they do not know how it got there.

They are trying to prove innocence before anyone even accuses them.

Fear is pushing them to over explain a story no one has challenged yet.

🗣️ The brothers explain themselves first

😰 Fear pushes them to over explain

💰 They insist they do not know

📖 Fear defends against accusations no one made

## 🤷 We Cannot Tell Who Put Our Money In Our Sacks

The brothers openly admit they do not understand what happened to them.

They are not hiding the mystery.

They are confessing it, openly, to a stranger who could easily punish them.

This honesty is a small but real crack in years of family secrecy.

The last real secret this family kept was about Joseph himself.

🤷 The brothers confess the mystery openly

🗣️ Honesty here takes real courage

🔓 A small crack appears in old family secrecy

📖 The bigger secret is still about Joseph

## 🕊️ Peace Be To You, Fear Not

The steward's answer is calm, and it catches the brothers completely off guard.

He tells them plainly not to be afraid.

Then he credits their God with placing treasure in their sacks, not a trap.

His words land as pure relief either way.

Simeon is brought out to them, safe, right after he speaks.

🕊️ Peace be to you means do not fear

🎁 He credits God with the money

👋 Simeon is returned to them safe

📖 Relief arrives before they even ask

# Genesis 43:24-25
# 🍽️ Preparing For The Meal
---
## 🐴 He Gave Their Asses Provender

"Provender" means feed for animals.

It is a small detail buried inside a bigger act of hospitality.

Water for the men, washing for their feet, and now food for their donkeys.

Every part of this household is being cared for, not just the guests.

Kindness here reaches all the way down to the animals.

🐴 Provender means animal feed

🧺 Hospitality here covers even the donkeys

💧 Water and washing come before the meal

📖 Real kindness reaches every detail

## ⏳ They Made Ready The Present Against Joseph Came At Noon

"Against Joseph came" is an old way of saying in preparation for his arrival.

The brothers get the gift ready while waiting nervously for noon.

They still do not understand why any of this hospitality is happening.

The man holding their lives in his hands is about to walk through the door.

Waiting is its own kind of pressure.

⏳ Against means in preparation for

🎁 The gift sits ready before Joseph arrives

😟 The brothers still do not understand why

📖 Waiting adds its own kind of tension

# Genesis 43:26-29
# 👋 Joseph Greets Them
---
## 🙇 They Bowed Themselves To Him To The Earth

The brothers bow to Joseph again, presenting their gift.

This is the second time in two chapters they have physically bowed before him.

They still have no idea they are bowing to their own brother.

Years earlier, Joseph dreamed that his brothers would bow down to him.

That old dream keeps quietly coming true in front of him.

🙇 The brothers bow to Joseph again

🌙 Joseph once dreamed this exact scene

😶 They still do not know who he is

📖 An old dream keeps fulfilling itself

## ❤️ Is Your Father Well? Is He Yet Alive?

Joseph asks about Jacob directly, almost too casually for what this moment actually is.

He has not seen his father in over twenty years.

The men delivering this news are the very brothers who took Joseph away from him.

A simple question is carrying two decades of separation underneath it.

❤️ Joseph finally asks about his father

⏳ Twenty years of separation sit behind this question

😶 The messengers are the ones who caused it

📖 A simple question can carry enormous weight

## 😭 Is This Your Younger Brother? God Be Gracious Unto Thee, My Son

Joseph sees Benjamin for the first time since Benjamin was a small child.

Benjamin is his only full brother, both of them sons of Rachel.

Calling Benjamin "my son" does not mean Joseph thinks he is Benjamin's father.

It is a term of warmth for someone much younger.

Joseph is barely holding himself together as he says it.

😭 Benjamin is Joseph's only full brother

💛 My son here means warmth, not fatherhood

🫂 Joseph speaks with an older man's warmth

📖 Joseph is holding back a flood of emotion

# Genesis 43:30-31
# 😢 Joseph Weeps Privately
---
## 😭 His Bowels Did Yearn Upon His Brother

In the Bible's language, the bowels were thought of as the seat of deep emotion.

That is close to how we say something is felt in the gut today.

"Bowels did yearn" means Joseph was suddenly overwhelmed with love the moment he saw Benjamin.

He cannot hold it together in front of everyone in the room.

So he leaves and finds a private place to weep alone.

😭 Bowels meant the seat of deep feeling

❤️ Bowels yearning means overwhelming love

🚪 Joseph leaves rather than break down in public

📖 Deep feeling still needed a private place

## 💧 He Washed His Face, And Refrained Himself

Joseph composes himself before walking back out to his brothers.

"Refrained" means he held back his emotion on purpose, by sheer will.

He is still testing his brothers, and the test is not finished yet.

Breaking down completely right now would end it too soon.

So he sets his own grief aside and returns to the table.

💧 Refrained means held back on purpose

🎭 Joseph is still managing an unfinished test

⏸️ Full honesty would end the test too soon

📖 He sets his grief aside for now

# Genesis 43:32-34
# 🍞 The Meal
---
## 🚫 The Egyptians Might Not Eat Bread With The Hebrews

Egyptians ate at a separate table from the Hebrews during this meal.

The text says the reason was that eating together would be offensive to Egyptians.

Egyptian culture looked down on shepherding peoples like the Hebrews as unclean or beneath them.

Joseph himself sits apart from the Egyptians too, caught between two worlds.

He rules as an Egyptian official but was born a Hebrew shepherd's son.

🚫 Egyptians avoided eating with Hebrews

🐑 Shepherd life was looked down on in Egypt

🎭 Joseph sits between two different worlds

📖 His identity never fully belonged to either side

## 😲 The Firstborn According To His Birthright

The brothers are seated in exact birth order, oldest all the way to youngest.

No stranger meeting them for the first time could have guessed that order.

"Marvelled" means they were amazed, even a little unsettled by it.

It is another clue the man knows far more than he should.

The brothers still cannot connect the clues in front of them.

🎯 They are seated in exact birth order

😲 Marvelled means amazed and unsettled

🔍 No stranger should know that order

📖 The clues are there, but unseen

## 🍽️ Benjamin's Mess Was Five Times So Much As Any Of Theirs

"Mess" here means a portion of food, not disorder or clutter.

Joseph gives Benjamin five times as much food as anyone else at the table.

This openly favors his one full brother in front of everyone.

It may also be another quiet test.

Joseph may be watching for the same jealousy that once targeted him.

🍽️ Mess means a portion of food

⚖️ Benjamin openly receives special favor

👀 Joseph may be watching for old jealousy

📖 The past quietly tests the present`.trim();

export const GENESIS_FORTY_THREE_PERSONAL_SECTIONS = parseGenesisFortyThreeRawNotes(GENESIS_FORTY_THREE_RAW_NOTES);
