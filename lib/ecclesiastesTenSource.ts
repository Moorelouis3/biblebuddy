export type EcclesiastesTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEcclesiastesTenRawNotes(rawText: string): EcclesiastesTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EcclesiastesTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ecclesiastes\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ecclesiastes 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ecclesiastes\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Ecclesiastes\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ecclesiastes 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ecclesiastes 10:${startVerse}` : `Ecclesiastes 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Ecclesiastes 10 sections, received " + sections.length);
  }

  return sections;
}

const ECCLESIASTES_TEN_RAW_NOTES = `# Ecclesiastes 10:1-3
# 🪰 A Little Folly Outweighs Wisdom And Honour
---
## 🪰 Dead Flies Cause The Ointment Of The Apothecary To Send Forth A Stinking Savour

"Apothecary" was the ancient equivalent of a perfumer who mixed fine oils.

A few dead flies in that costly ointment ruin the whole jar.

The smell of rot spreads and overwhelms the smell of the perfume.

One small, ugly thing can spoil something otherwise valuable.

🪰 Apothecary means an ancient perfumer

🧴 Dead flies ruin the whole jar

👃 A little rot overwhelms the good smell

📖 One flaw can spoil something valuable

## 🎯 So Doth A Little Folly Him That Is In Reputation For Wisdom And Honour

This verse now explains exactly what the dead flies were a picture of.

A person can be known for wisdom and honor for years.

One small act of folly can still spoil that whole reputation.

The comparison is not flattering, but it is exact.

🎯 This verse explains the fly picture

👤 A person can be known for wisdom

💥 One foolish act can spoil that name

📖 Reputation is fragile, like the ointment

## 👉 A Wise Man's Heart Is At His Right Hand

This is not a statement about which hand a person favors.

In this culture, the right side pictured strength, skill, and good judgment.

Saying a wise man's heart sits at his right hand means his choices go the right direction.

The left side carried the opposite picture.

👉 Right hand pictures strength and skill

🧠 A wise heart chooses the right way

⚖️ This is about judgment, not handedness

📖 Culture used sides to picture direction

## 🧭 A Fool's Heart At His Left

This half of the proverb completes the picture from the line before it.

A fool's inner compass points toward the wrong direction instead.

The Bible is not describing left handed people here.

It is describing where a fool's choices consistently lead.

🧭 Completes the wise heart comparison

😵 A fool's compass points wrong

🙅 Not about left handed people

📖 It describes where choices lead

## 🚶 When He That Is A Fool Walketh By The Way, His Wisdom Faileth Him

"Walketh by the way" simply means going about ordinary, everyday business.

A fool does not need a crisis to reveal himself.

Plain daily life is already enough to expose his lack of wisdom.

His foolishness shows up in the small, unremarkable moments.

🚶 Walking by the way means daily life

😬 No crisis is needed to expose him

🔍 Ordinary moments reveal a fool

📖 Small moments show what is inside

## 🗣️ He Saith To Every One That He Is A Fool

This does not mean the fool announces his own foolishness out loud.

His words and choices say it for him without him realizing it.

Everyone watching can tell, even though he cannot see it himself.

Folly is loud even when it never names itself.

🗣️ He does not announce it directly

👀 His actions say it for him

😶 He cannot see it himself

📖 Folly is loud without naming itself

# Ecclesiastes 10:4-7
# 👑 When Folly Sits In High Places
---
## 👑 If The Spirit Of The Ruler Rise Up Against Thee

"The spirit of the ruler" means the ruler's anger rising toward you.

This pictures a real, dangerous moment, not a small annoyance.

Rulers in the ancient world held enormous power over people under them.

An angry ruler could end a career or a life.

👑 The ruler's spirit means his anger

⚠️ This is a real, dangerous moment

🏛️ Rulers held enormous power

📖 Anger from power was not safe

## 🏃 Leave Not Thy Place

The instinct in that moment is to flee or panic.

This verse instead advises staying calm and steady.

Fleeing suddenly can look like guilt, even when there is none.

Staying in place is presented here as the wiser response.

🏃 Fleeing looks like an instinct

🧘 The verse advises staying steady

😨 Fleeing can look like guilt

📖 Calm is the wiser response

## 🕊️ For Yielding Pacifieth Great Offences

"Yielding" means responding gently instead of matching anger with anger.

"Pacifieth" means calms down or soothes.

A gentle, calm response can defuse even a serious offense.

This is practical wisdom for surviving a powerful person's anger.

🕊️ Yielding means a gentle response

😌 Pacifieth means calms down

🔥 Gentleness can defuse real anger

📖 This is wisdom for surviving power

## ☀️ There Is An Evil Which I Have Seen Under The Sun, As An Error Which Proceedeth From The Ruler

"Under the sun" is this book's repeated phrase for life as it is observed on earth.

"An error which proceedeth from the ruler" means a mistake made by whoever holds power.

The Preacher is about to describe something he has personally witnessed go wrong.

This introduces the specific example that follows.

☀️ Under the sun means observed on earth

👑 The error comes from the ruler

👁️ The Preacher witnessed this himself

📖 It introduces the example ahead

## 🎭 Folly Is Set In Great Dignity

Someone unqualified and foolish is given a position of high honor.

This is the specific error the Preacher just introduced.

Foolishness does not disqualify a person from power in a broken system.

That mismatch is exactly what troubles him here.

🎭 A fool is given high honor

❌ Foolishness does not disqualify power

⚠️ This is the error just named

📖 The mismatch troubles the Preacher

## 💰 And The Rich Sit In Low Place

This does not mean wealthy people always deserve high status either.

It describes the opposite failure happening at the same time.

Those with real means and skill are pushed down instead.

The whole social order looks upside down here.

💰 The rich are pushed to low place

🔄 The opposite failure happens too

⚖️ Skill and means are ignored

📖 The order looks upside down

## 🐎 I Have Seen Servants Upon Horses

Horses in the ancient world were a mark of high status, often used by nobility and officials.

A servant riding one pictures someone placed far above his true position.

This image makes the disorder from the earlier verse concrete and visible.

It is not really about animals, it is about rank.

🐎 Horses marked high status

👤 A servant on one is out of place

🎯 This makes the disorder visible

📖 It is really about rank

## 🚶 And Princes Walking As Servants Upon The Earth

This finishes the reversal with the exact opposite picture.

Those born to lead are found doing the lowest, most ordinary tasks.

The two images together paint one clear picture of a broken order.

Wisdom and rank no longer line up the way they should.

🚶 Princes are found doing servant work

🔁 This completes the reversal

🖼️ Both images form one picture

📖 Wisdom and rank no longer match

# Ecclesiastes 10:8-11
# 🕳️ Careless Work Carries Its Own Risk
---
## 🕳️ He That Diggeth A Pit Shall Fall Into It

This is a plain proverb about actions that carry their own risk.

A pit dug carelessly, perhaps to trap someone else, can catch its own digger.

The work itself is dangerous, not just the intended target.

Ordinary labor is never entirely free of risk.

🕳️ A dug pit can trap its digger

⚠️ The work itself carries danger

🎯 Not just the intended target

📖 No labor is fully risk free

## 🧱 Whoso Breaketh An Hedge, A Serpent Shall Bite Him

A "hedge" was a stone or thorn wall built around a field or vineyard.

Snakes commonly nested in the cracks and gaps of these old stone walls.

Someone tearing one down could easily disturb a hidden snake without warning.

This is another everyday task with a hidden, real danger.

🧱 A hedge was a stone or thorn wall

🐍 Snakes nested inside old walls

⚡ Tearing it down could disturb one

📖 Everyday work hides real danger

## 🪨 Whoso Removeth Stones Shall Be Hurt Therewith

This adds a third example of ordinary labor carrying its own risk.

Moving heavy stones by hand could easily crush or injure the worker.

The pattern from the pit and the hedge continues here.

Even simple physical work is never entirely safe.

🪨 Moving stones could injure the worker

🔁 The pattern from before continues

💪 Physical work is never fully safe

📖 A third example makes the point

## 🪓 He That Cleaveth Wood Shall Be Endangered Thereby

"Cleaveth" means splitting or chopping, the way an axe splits a log.

Chopping wood was common daily work in this culture.

A slipped axe or a flying splinter could easily hurt the worker.

This completes the list of four ordinary, risky tasks.

🪓 Cleaveth means chopping or splitting

🪵 Wood chopping was common daily work

⚠️ A slip could easily cause injury

📖 This completes the list of four

## 🔪 If The Iron Be Blunt, And He Do Not Whet The Edge, Then Must He Put To More Strength

"Whet" means to sharpen a blade on a stone.

A dull axe forces the worker to swing harder just to cut the same wood.

Skipping the sharpening does not save time, it only adds strain.

The next line names the lesson this whole example is building toward.

🔪 Whet means to sharpen a blade

🪓 A dull axe forces harder swings

⏳ Skipping sharpening adds strain instead

📖 The next line names the lesson

## 🧠 But Wisdom Is Profitable To Direct

This is the lesson the whole list of risky tasks was building toward.

Wisdom here simply means thinking ahead before swinging the axe.

Skill and preparation change the outcome of ordinary, risky work.

The pit, the hedge, the stones, and the wood all prove this one point.

🧠 Wisdom means thinking ahead

🎯 It changes the outcome of work

🔁 Four examples all prove this

📖 Preparation matters more than force

## 🎶 Surely The Serpent Will Bite Without Enchantment

"Enchantment" refers to snake charming, a real ancient practice of controlling snakes with sound or movement.

A snake charmer could sometimes calm or control a snake this way.

An untrained, unprepared person gets no such protection.

The serpent bites exactly when there is no wisdom or skill involved.

🎶 Enchantment refers to snake charming

🐍 A charmer could sometimes control a snake

🙅 An unprepared person has no such skill

📖 Bites happen where wisdom is missing

## 🗣️ And A Babbler Is No Better

A "babbler" is someone who talks constantly without any real skill behind the words.

This final line compares empty talk to an unprotected snake charmer.

Words alone accomplish nothing without real wisdom behind them.

The whole section closes on that same point about wisdom and preparation.

🗣️ A babbler talks without real skill

🐍 Compared to an unskilled snake charmer

❌ Empty words accomplish nothing

📖 Wisdom must sit behind the words

# Ecclesiastes 10:12-15
# 💬 The Fool's Mouth Wears Him Out
---
## 🗣️ The Words Of A Wise Man's Mouth Are Gracious

"Gracious" here means pleasant, kind, and well chosen.

A wise person's speech tends to help the people who hear it.

This sets up a direct contrast with what follows in the next line.

Wisdom shows up first in how a person actually talks.

🗣️ Gracious means pleasant and well chosen

🤝 Wise speech tends to help others

🔁 It sets up a contrast next

📖 Wisdom shows first in speech

## 😵 But The Lips Of A Fool Will Swallow Up Himself

This does not describe a strange, literal accident.

It means a fool's own words eventually bring him down.

Careless talk creates the very trouble that later destroys him.

His mouth becomes the source of his own ruin.

😵 Not a literal, strange accident

🗣️ His own words bring him down

💥 Careless talk creates real trouble

📖 His mouth causes his own ruin

## 🚩 The Beginning Of The Words Of His Mouth Is Foolishness

A fool's pattern of speech reveals itself immediately, from the very first words.

There is no gradual descent into nonsense here.

The foolishness is present from the opening sentence.

This sets up an even worse ending in the next line.

🚩 Foolishness shows from the first words

⏱️ There is no gradual decline

😬 It is present from the start

📖 A worse ending follows next

## 😈 And The End Of His Talk Is Mischievous Madness

"Mischievous madness" means reckless, harmful foolishness, not literal insanity.

What starts as simple foolishness grows worse the longer the fool keeps talking.

His speech does not improve with more words, it deteriorates.

This completes the picture of a fool undone by his own mouth.

😈 Mischievous madness means reckless foolishness

📉 Talk grows worse over time

🗣️ More words make it worse

📖 He is undone by his own mouth

## 🗯️ A Fool Also Is Full Of Words

A fool talks constantly, often about things he cannot actually know.

Quantity of words is mistaken here for wisdom or insight.

The next line names exactly what he cannot know but keeps discussing anyway.

Excess talking is treated as a symptom of folly, not a strength.

🗯️ A fool talks constantly

❌ Words are mistaken for wisdom

🔮 He discusses what he cannot know

📖 Excess talk is a symptom of folly

## 🔮 A Man Cannot Tell What Shall Be

This is not a complaint about a fool specifically anymore.

It states a plain limit that applies to every single person.

No one can fully know what is coming next, in this life or after it.

The fool's fault is pretending otherwise and talking as if he does.

🔮 No one can fully know the future

👤 This limit applies to everyone

🗣️ The fool talks as if he knows

📖 Pretending is the real fault

## 😩 The Labour Of The Foolish Wearieth Every One Of Them

A fool's own efforts leave him exhausted, and often accomplish little.

This is not about physical work being tiring in general.

It is about wasted, misdirected effort that drains a person without a payoff.

Folly is presented here as genuinely costly, not just embarrassing.

😩 A fool's effort leaves him exhausted

🎯 Not about ordinary tiring work

🔄 It is wasted, misdirected effort

📖 Folly carries a real cost

## 🏙️ Because He Knoweth Not How To Go To The City

This pictures someone who cannot manage the simplest, most obvious task.

Finding the road to a nearby city required no special skill in this culture.

A fool struggles even with life's most basic, practical demands.

This closes the section on a note of plain, ordinary incompetence.

🏙️ Finding the city was a simple task

🙅 A fool cannot manage even that

🧭 Basic, practical demands trip him up

📖 The section ends on plain incompetence

# Ecclesiastes 10:16-20
# 🐦 A Careless Kingdom And A Careless Tongue
---
## 👶 Woe To Thee, O Land, When Thy King Is A Child

This is not primarily a comment about a king's literal age.

"A child" pictures a ruler who is immature, reckless, or easily led.

A nation suffers when the person at the top lacks wisdom and self control.

Leadership quality shapes the wellbeing of everyone under it.

👶 A child pictures an immature ruler

🏚️ Not just about literal age

🧠 A nation suffers under poor leadership

📖 Leadership shapes everyone under it

## 🍽️ And Thy Princes Eat In The Morning

Feasting in the morning, before the day's work was done, marked reckless indulgence in this culture.

Meals were normally eaten later, after responsibilities had been handled.

Leaders feasting early signals disorder and misplaced priorities at the top.

This detail paints the child king's court as careless and self indulgent.

🍽️ Morning feasting marked reckless indulgence

⏰ Meals normally came after work

👑 It signals disorder at the top

📖 The court looks careless and self indulgent

## 👑 Blessed Art Thou, O Land, When Thy King Is The Son Of Nobles

"Son of nobles" points to someone raised with discipline, training, and a sense of duty.

This is less about bloodline and more about the character that upbringing produced.

Such a leader is trained to think of the nation before himself.

This verse flips the warning from before into a picture of blessing.

👑 Son of nobles suggests discipline and training

🎓 Upbringing shaped his character

🤝 He is trained to think of others

📖 This flips the earlier warning into blessing

## 🍞 And Thy Princes Eat In Due Season, For Strength, And Not For Drunkenness

This describes eating for the right reason, to gain strength for real work.

"Due season" means the proper time, not whenever appetite demands it.

This is a direct contrast to the reckless morning feasting from two verses earlier.

Self control at the leadership level reflects the health of the whole land.

🍞 Eating for strength, not excess

⏳ Due season means the proper time

🔁 A contrast to the earlier feasting

📖 Leaders' self control reflects the land

## 🛠️ By Much Slothfulness The Building Decayeth

"Slothfulness" means laziness, neglecting work that clearly needs doing.

A building does not fall apart from one skipped repair alone.

Ongoing, repeated neglect is what eventually brings a structure down.

This proverb now shifts from leadership to a picture of everyday neglect.

🛠️ Slothfulness means laziness

🏚️ Not one skip, but ongoing neglect

📉 Repeated neglect brings a structure down

📖 The topic shifts to everyday neglect

## 🏠 And Through Idleness Of The Hands The House Droppeth Through

This pictures a literal roof beginning to leak from lack of maintenance.

"Idleness of the hands" simply means refusing to do the needed physical work.

Small, unattended problems eventually let the rain straight through.

Neglect, whether in a kingdom or a household, produces the same slow ruin.

🏠 A neglected roof begins to leak

✋ Idleness means refusing needed work

💧 Small problems let the rain through

📖 Neglect produces the same slow ruin

## 🎉 A Feast Is Made For Laughter, And Wine Maketh Merry

This verse turns toward the ordinary pleasures of life.

Feasts and wine are named plainly as sources of real enjoyment.

The Preacher is not condemning celebration itself here.

The next line adds a practical, grounding reminder about cost.

🎉 Feasts and wine bring real enjoyment

🚫 Celebration itself is not condemned

💭 The tone turns lighter here

📖 A grounding reminder follows next

## 💰 But Money Answereth All Things

This means money is what actually pays for the feast and the wine.

It is a plain, practical statement, not a claim that money solves every problem.

Even joy and celebration rest on ordinary financial reality.

The Preacher never stops being practical, even about joy.

💰 Money pays for feasts and wine

🙅 Not a claim it solves everything

🧾 Joy still rests on real cost

📖 The Preacher stays grounded and practical

## 🤐 Curse Not The King, No Not In Thy Thought

This is not simply advice about staying quiet in public.

It extends all the way to a person's private, unspoken thoughts.

Ancient kings held enormous power, including over anyone who opposed them.

The warning is about the real danger of disloyalty being found out.

🤐 More than staying quiet in public

🧠 It reaches private, unspoken thoughts

👑 Kings held enormous, dangerous power

📖 The warning is about being found out

## 🛏️ Curse Not The Rich In Thy Bedchamber

A "bedchamber" was the most private room a person had in this culture.

This verse insists even that private space is not truly secure.

The wealthy and powerful often had ways of hearing what was said about them.

Privacy offered less real protection than people assumed.

🛏️ Bedchamber was the most private room

🔒 Even that space was not secure

👂 The powerful often heard what was said

📖 Privacy offered less protection than assumed

## 🐦 For A Bird Of The Air Shall Carry The Voice, And That Which Hath Wings Shall Tell The Matter

This vivid image is likely the origin of the modern saying, a little bird told me.

It pictures words traveling and reaching the wrong ears in ways no one can control.

Servants, messengers, or simple gossip could carry private words back to powerful people.

The chapter closes with a warning that careless words rarely stay hidden.

🐦 Likely the origin of that saying

📢 Words travel where they should not

🗣️ Gossip could reach powerful people

📖 Careless words rarely stay hidden
`.trim();

export const ECCLESIASTES_TEN_PERSONAL_SECTIONS = parseEcclesiastesTenRawNotes(ECCLESIASTES_TEN_RAW_NOTES);
