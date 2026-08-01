export type GenesisFortyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFortyFourRawNotes(rawText: string): GenesisFortyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFortyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+44:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 44 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+44:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+44:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 44 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 44,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 44:${startVerse}` : `Genesis 44:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Genesis 44 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_FOUR_RAW_NOTES = `# Genesis 44:1-5
# 🥤 Joseph Sets A Trap
---
## 🍞 Fill The Men's Sacks With Food, As Much As They Can Carry

Joseph is not finished testing his brothers yet.

He tells his steward to fill every sack completely full.

This is not punishment.

It is provision even in the middle of a trap.

The same hand that feeds them is also testing them.

Mercy and testing can happen at the very same time.

🍞 Joseph fills every sack completely

🎁 Full sacks are provision not punishment

⏳ The test is not finished yet

📖 Mercy and testing happen together

## 💰 Put Every Man's Money In His Sack's Mouth

This is not the first time this has happened.

Genesis forty two already showed money hidden the exact same way.

Joseph keeps returning what his brothers already paid.

It looks generous on the surface.

It will also make the coming accusation look far worse.

Kindness and a trap can wear the same disguise.

💰 Money reappears in the sacks again

🔁 Genesis forty two already did this

🎭 Kindness now doubles as bait

📖 A gift can hide a test

## 🥤 Put My Cup, The Silver Cup, In The Sack's Mouth Of The Youngest

The youngest son here is Benjamin.

Joseph does not hide the cup in just any sack.

He chooses the one brother he has been protecting since chapter forty two.

Benjamin becomes the one piece the whole test depends on.

Everyone else can walk away clean.

Only Benjamin is set up to look guilty.

🥤 The youngest son is Benjamin

🎯 Joseph targets him on purpose

🚶 Every other brother stays clear

📖 One brother carries the whole test

## 🌅 As Soon As The Morning Was Light

The brothers leave at first light.

They believe the danger already passed them by.

Benjamin is safe.

The food is loaded.

They have no idea anything is still wrong.

Relief before disaster is a pattern this family knows well.

🌅 They leave at the earliest hour

😌 They believe the danger has passed

🎒 Benjamin and the food are loaded

📖 Relief here comes right before disaster

## 😠 Wherefore Have Ye Rewarded Evil For Good

Joseph sends his steward racing after the brothers.

The charge is harsh on purpose.

Paying back kindness with evil was a serious insult in this culture.

Hospitality was treated as a sacred debt in the ancient world.

The brothers think the hard part of the trip is already behind them.

A new crisis starts the moment they feel safe again.

🏃 The steward chases the brothers down

😠 The accusation is harsh on purpose

🤝 Hospitality was a serious debt back then

📖 Relief turns to crisis in a moment

## 🔮 Is Not This It In Which My Lord Drinketh

This cup belongs to Joseph personally.

The steward claims Joseph uses it to divine hidden things.

To divine means to claim secret knowledge through omens or objects like this cup.

Some ancient rulers in Egypt practiced this kind of fortune telling.

The irony is real.

Joseph's true insight has never come from a cup.

It comes from God.

🥤 The cup belongs to Joseph himself

🔮 To divine means claiming hidden knowledge

🏺 Egyptian rulers practiced this kind of omen reading

📖 Joseph's real insight comes from God

# Genesis 44:6-10
# ⚖️ The Brothers Defend Themselves
---
## 🙅 God Forbid That Thy Servants Should Do According To This Thing

God forbid is a strong old way of saying that could never happen.

The brothers are not making a mild denial.

They are stunned that anyone would accuse them of this at all.

Their whole reaction is shock, not guilt.

Confident people react this way when they know they are innocent.

🙅 God forbid means absolutely never

😳 The brothers are genuinely stunned

💪 Their reaction reads as shock not guilt

📖 Confidence like this usually means innocence

## 🤔 How Then Should We Steal Out Of Thy Lord's House Silver Or Gold

The brothers build their defense on real history.

They already returned money they found by accident on an earlier trip.

Honest men do not usually turn around and start stealing on purpose.

Their logic is sound.

It just does not yet account for what is hiding in Benjamin's sack.

🤔 Their argument rests on real history

💰 They already returned money once before

✅ Honest men rarely turn to theft

📖 Their logic misses Benjamin's sack

## ⚰️ Both Let Him Die, And We Also Will Be My Lord's Bondmen

Bondmen means slaves.

The brothers offer an extreme penalty with full confidence.

Death for the guilty one.

Slavery for everyone else.

They make this vow because they are certain none of them is guilty.

They have no idea it is about to fall on Rachel's last remaining son.

⚰️ Bondmen means slaves in this context

😬 The brothers offer a severe penalty

💪 Confidence makes the vow feel safe

📖 The vow is about to backfire

## ✅ He With Whom It Is Found Shall Be My Servant

The steward does not accept the brothers' harsh offer.

He softens it instead.

Whoever has the cup will simply become a servant.

Everyone else is declared blameless in advance.

This small mercy echoes Joseph's pattern through the whole story.

Real consequences still apply.

They are just never as harsh as they could be.

🕊️ The steward softens the harsh offer

✅ Only the guilty one becomes a servant

🤝 Everyone else is cleared in advance

📖 Joseph's mercy softens every consequence

# Genesis 44:11-13
# 😱 The Cup Is Found
---
## 🏃 They Speedily Took Down Every Man His Sack

Speedily means quickly, without hesitation.

The brothers do not stall or argue further.

They open their own sacks in public without being forced.

People who feel guilty usually do not rush toward proof.

Their haste here shows real confidence.

🏃 Speedily means quickly and without delay

🎒 They open their own sacks first

💪 Guilty people rarely rush toward proof

📖 Their haste shows genuine confidence

## 🔍 He Searched, And Began At The Eldest, And Left At The Youngest

The search moves in exact birth order.

Every empty sack raises the tension a little higher.

The steward is not searching at random.

He is stretching the moment out on purpose.

Only Benjamin's sack is left by the end.

It was always going to land there.

🔍 The search follows birth order exactly

📈 Each empty sack raises the tension

🎯 Benjamin's sack is searched last

📖 The ending was decided from the start

## 👕 Then They Rent Their Clothes

Rent means torn.

Tearing your own clothes was an old physical sign of grief or shock.

It was not a calm gesture.

It happened without thinking, the moment the news landed.

This is not only fear of punishment.

Rachel's last remaining son is suddenly at the center of disaster again.

👕 Rent means torn in this verse

😭 Torn clothes signaled instant grief

💔 This reaction is grief more than fear

📖 Benjamin now stands at the center of disaster

# Genesis 44:14-17
# 🙇 Joseph Confronts Them Again
---
## 🙇 They Fell Before Him On The Ground

Judah and his brothers return to Joseph's house together.

They fall to the ground in front of him again.

This is the third time in three chapters they have bowed this way.

They still have no idea they are bowing to their own brother.

His boyhood dream keeps quietly coming true, piece by piece.

🙇 This is their third bow to Joseph

🔁 Bowing has now happened three times total

🌙 They still do not know who he is

📖 His old dream keeps coming true

## 🌍 Wot Ye Not That Such A Man As I Can Certainly Divine

Wot means know.

Joseph asks if they did not realize a man like him could uncover hidden things.

He is still playing a part.

To them he looks like a foreign ruler with mysterious powers.

He is keeping the truth of who he is hidden a little longer.

🌍 Wot means know in old English

🎭 Joseph plays the mysterious foreign ruler

🤫 He is not ready to reveal himself

📖 His true identity stays hidden for now

## 🙏 God Hath Found Out The Iniquity Of Thy Servants

Iniquity means sin or guilt.

Judah does not try to argue that Benjamin is innocent.

Instead he says God has uncovered their guilt.

Judah is not only thinking about a missing cup.

He is thinking about the debt this family has owed since Genesis thirty seven.

To him this feels like the past finally catching up with all of them.

🙏 Iniquity means sin or guilt

🥤 Judah does not defend the missing cup

📜 He is thinking of Genesis thirty seven

📖 The past feels like it is catching up

## 🕊️ God Forbid That I Should Do So

Joseph refuses to punish the whole family.

Only the one holding the cup will become his servant.

That means only Benjamin.

Everyone else is free to walk home untouched.

This is the exact center of the whole test.

Joseph is handing the brothers an easy way to leave Benjamin behind.

🕊️ Joseph refuses to punish everyone

🎯 Only Benjamin would become his servant

🚪 The rest are free to leave

📖 This is the heart of the whole test

# Genesis 44:18-23
# 🙏 Judah Steps Forward
---
## 🙏 Thou Art Even As Pharaoh

Judah compares Joseph's authority to Pharaoh's own before saying anything else.

He is choosing every word with care.

What follows becomes the longest single speech in the whole book of Genesis.

Judah is not defending himself here.

He is about to lay his family's entire history bare in front of a stranger.

🙏 Judah approaches with careful respect

👨‍👦 Judah pleads for his family, not himself

📖 This becomes Genesis longest single speech

➡️ Benjamin's life hangs on what comes next

## ❓ Have Ye A Father, Or A Brother

Judah reminds Joseph that this whole situation began with Joseph's own question.

That question was first asked back in chapter forty two.

Judah is showing that none of this was the brothers' scheme.

It traces back to something Joseph himself started.

❓ Joseph asked this first in chapter forty two

🔁 None of this was the brothers' plan

🧵 It traces back to Joseph's own words

📖 Judah ties the blame back to Joseph

## 👶 A Child Of His Old Age, And His Father Loveth Him

Judah repeats what they already told Joseph in chapter forty two.

Benjamin is the beloved youngest son, born to Jacob late in life.

Saying it slowly and in full is itself part of Judah's appeal.

He wants Joseph to feel the weight of it, not just hear the facts.

👶 Benjamin is Jacob's beloved youngest son

🐢 Judah repeats every detail slowly

❤️ He wants Joseph to feel the weight

📖 Facts alone would not carry this appeal

## 👀 That I May Set Mine Eyes Upon Him

Judah quotes Joseph's own past demand back to him.

Bring the boy so I can see him myself, Joseph had said.

Judah is building his case piece by piece.

He is using Joseph's own words as the foundation.

👀 Judah quotes Joseph's own past words

🧱 Each quote builds Judah's case further

🪞 Joseph's demand becomes the foundation here

📖 Judah argues using Joseph's own voice

## 💔 If He Should Leave His Father, His Father Would Die

Judah repeats a warning the brothers gave Joseph back in chapter forty two.

Taking Benjamin from Jacob could kill him, they said.

This was never a new concern invented for this moment.

The brothers said it from the very first conversation.

Joseph pushed forward anyway, knowing the risk already.

💔 This warning was given from the start

📜 It first appeared in chapter forty two

⚠️ Joseph already knew this risk

📖 He moved forward with full knowledge

## 🚫 Ye Shall See My Face No More

Judah repeats Joseph's exact ultimatum from before.

No Benjamin means no further access to Joseph at all.

Everything since chapter forty two traces back to this single sentence.

The whole family's fear started here.

🚫 No Benjamin means no more access

📜 This ultimatum began back in chapter forty two

🎁 Every choice since then traces to this line

📖 One sentence set the whole story moving

# Genesis 44:24-29
# 💔 Judah Recounts Jacob's Fear
---
## 🏠 We Told Him The Words Of My Lord

Judah explains that they went home and reported Joseph's demand to Jacob.

They gave it to him word for word.

Nothing was hidden or softened.

Jacob heard the full weight of it directly.

🏠 The brothers reported the demand exactly

🗣️ Nothing was hidden from Jacob

⚖️ He heard the full weight directly

📖 Honesty came before comfort here

## 🌾 Go Again, And Buy Us A Little Food

Judah quotes Jacob's own first response to the news.

Simply send them back for more food, Jacob said.

He had not yet grasped what that trip would require.

Hunger, once again, forces this family to face what it has been avoiding.

🌾 Jacob's first instinct is pure survival

🙈 He has not grasped the cost yet

🍽️ Hunger forces the family's hand again

📖 Survival keeps pushing this story forward

## 🙅 We Cannot Go Down, Except Our Youngest Brother Be With Us

Judah reports the brothers' firm answer to their own father.

No Benjamin meant no trip at all.

They are not hiding that they pushed back on Jacob too.

Judah is being fully honest about every part of this conversation.

🙅 The brothers held a firm line

👨‍👦 They pushed back on Jacob directly

🗣️ Judah hides none of it now

📖 Full honesty marks this whole speech

## 👨‍👩‍👦 Ye Know That My Wife Bare Me Two Sons

Judah quotes Jacob calling Rachel simply my wife.

Jacob had two wives and two concubines in total.

Calling her simply my wife is not an accident.

She was always the wife Jacob loved most.

Joseph and Benjamin are her two sons.

The other ten brothers have lived in their shadow for years.

👨‍👩‍👦 Jacob calls Rachel simply my wife

💍 She was always his favorite wife

👥 Joseph and Benjamin held a special place

📖 The other brothers lived in that shadow

## 💔 Surely He Is Torn In Pieces, And I Saw Him Not Since

Judah repeats what Jacob has believed for over twenty years.

A wild animal tore Joseph apart, Jacob thinks.

Judah says this straight to Joseph's face without knowing it.

Everyone in the room treats it as simple background information.

For Joseph, it is his own faked death recited back to him.

The very brother who helped stage it is now repeating the story.

💔 Jacob still believes this old story

😳 Judah repeats it without knowing the truth

🎭 Joseph hears his own cover story again

📖 The past speaks through Judah's own mouth

## ⚰️ Ye Shall Bring Down My Gray Hairs With Sorrow To The Grave

Gray hairs to the grave is an old idiom.

It means losing another son now would be the grief that finally kills Jacob in his old age.

This exact phrase already appeared once in Genesis forty two.

Judah repeats it word for word here.

He wants Joseph to understand exactly how serious Jacob's warning was.

⚰️ Losing a son could kill Jacob now

🔁 This same phrase appeared in Genesis forty two

🗣️ Judah repeats it word for word

📖 He wants Joseph to feel the full weight

# Genesis 44:30-31
# ❤️ His Life Is Bound Up In The Lad's Life
---
## ❤️ His Life Is Bound Up In The Lad's Life

Judah describes something almost physical here.

Jacob's own life is tied directly to whether Benjamin makes it home.

This is not exaggeration to Judah.

Jacob already believes he lost Joseph.

Losing Benjamin too, the last living link to Rachel, would be more than grief.

Judah believes it would actually kill him.

❤️ Jacob's life is tied to Benjamin's

💭 Judah does not think this is exaggeration

👶 Benjamin is the last link to Rachel

📖 Judah believes this loss would kill Jacob

## 🔁 Thy Servants Shall Bring Down The Gray Hairs Of Thy Servant Our Father

Judah repeats the same idiom a third time in this speech.

Now he applies it to all the brothers together, not just himself.

The repetition is not an accident.

Judah is making sure Joseph cannot miss what is at stake.

🔁 This is the idiom's third use here

🤝 Judah now speaks for every brother

🎯 The repetition is fully intentional

📖 Joseph cannot miss what is at stake

# Genesis 44:32-34
# 🙋 Judah Offers Himself
---
## 🤝 Thy Servant Became Surety For The Lad Unto My Father

Surety means a personal guarantee or pledge.

Judah reminds Joseph that he personally promised Jacob he would bring Benjamin home safely.

He promised to bear the blame forever if he failed.

Judah is keeping the exact word he gave in chapter forty three.

Keeping it now will cost him his own freedom.

🤝 Surety means a personal guarantee

📜 Judah made this promise in chapter forty three

⚖️ He promised to bear the blame forever

📖 Keeping his word will cost him everything

## 🙋 Let Thy Servant Abide Instead Of The Lad A Bondman

This is the turn the entire book has been building toward.

Judah offers to become a slave in Benjamin's place.

Benjamin could then go home free.

This is the same Judah who once suggested selling Joseph into slavery.

That happened back in Genesis thirty seven.

Now he offers to sell himself into slavery for nothing.

He wants to save the brother he once helped put in danger.

That change is exactly what Joseph has been waiting to see.

🙋 Judah offers to trade freedom for Benjamin

🔄 He once sold Joseph into slavery

🔁 Now he offers himself for nothing

📖 This proves Judah has truly changed

## 😢 Lest Peradventure I See The Evil That Shall Come On My Father

Peradventure is an old word meaning perhaps.

Judah closes by saying he cannot bear even the chance of watching his father suffer that loss.

He is not performing for effect here.

Judah genuinely cannot go home and watch Jacob break.

😢 Peradventure is an old word for perhaps

💔 Judah cannot bear watching his father suffer

🙏 This is not performance for effect

📖 Judah's love for his father is real`.trim();

export const GENESIS_FORTY_FOUR_PERSONAL_SECTIONS = parseGenesisFortyFourRawNotes(GENESIS_FORTY_FOUR_RAW_NOTES);
