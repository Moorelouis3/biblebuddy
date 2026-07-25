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

Even in the middle of setting up a test, Joseph makes sure the family eats. He isn't starving them to force a confession. He's still providing for them fully while the trap is being set.

This is the same pattern from chapter 42: real mercy sitting right alongside real pressure.

🍞 Joseph fully provides for the family even while testing them

⚖️ Mercy and testing are happening in the same moment, not in sequence

---

## 💰 Put Every Man's Money In His Sack's Mouth

This is the third time money quietly reappears in these sacks across two trips. Joseph keeps doing this deliberately.

It isn't only kindness. This time it also makes the brothers look more suspicious once the missing cup is discovered, since they'll already appear to be men who "steal" money without explanation.

💰 This is the third time Joseph secretly returns their money

🎯 The returned money now doubles as part of the coming accusation

---

## 🥤 Put My Cup ... And His Corn Money

Joseph targets Benjamin specifically, hiding both the silver cup and Benjamin's own grain payment in his sack alone.

Benjamin isn't just one suspect among many here. He's the one person set up to look guilty.

🥤 Benjamin alone gets the planted cup

🎯 He's the specific target of this whole test, not a random pick

---

## 🌅 As Soon As The Morning Was Light

The brothers leave at first light, eager to get home with Benjamin safe and the crisis apparently over.

That eagerness matters. They have no idea anything is wrong. They think the hard part is already behind them.

🌅 They leave at the earliest possible moment, relieved and hopeful

😌 They believe the danger has already passed

---

## 😠 Wherefore Have Ye Rewarded Evil For Good?

Joseph sends his steward to chase them down with a jarring accusation: paying back kindness with evil.

From the brothers' side, this must land like a gut-punch. They think they've done everything right this whole trip.

😠 The accusation frames them as betraying real kindness

😨 It hits right when they thought they were safe

---

## 🔮 Whereby Indeed He Divineth

Divineth means to practice divination, a way some ancient rulers claimed to discover hidden things, sometimes by reading patterns in liquid inside a cup.

The steward accuses them of stealing the very cup Joseph supposedly uses to see hidden truth. It's ironic, because Joseph's real insight doesn't come from a cup or a trick. It comes from God.

🔮 Divineth means practicing divination, a form of fortune-telling

🎭 The accusation plays into an Egyptian image of Joseph, not who he really is

# Genesis 44:6-10

# ⚖️ The Accusation

---

## 🙅 God Forbid That Thy Servants Should Do According To This Thing

The steward catches up and repeats the accusation. The brothers' response is immediate and strong: "God forbid," an old way of saying "absolutely not, that could never be true."

They aren't just denying a crime. They're stunned anyone would think they'd do it.

🙅 "God forbid" is a strong, immediate denial, not a soft one

😳 They're genuinely shocked by the accusation

---

## 🤔 How Then Should We Steal Out Of Thy Lord's House Silver Or Gold?

The brothers make their case with real logic: they already brought back money they found by accident in their sacks last time. Why would honest men like that turn around and deliberately steal silver now?

Their defense is solid. It just doesn't account for the fact that they're not looking at their own sacks yet.

🤔 Their reasoning is genuinely sound, based on their past honesty

🔍 They don't yet know what's actually in Benjamin's sack

---

## ⚰️ With Whomsoever It Be Found, Both Let Him Die, And We Also Will Be My Lord's Bondmen

So sure of their innocence, the brothers offer an extreme penalty: death for the guilty one, slavery for the rest.

Bondmen means slaves. This is a reckless promise, made with total confidence, by men who have no idea it's about to fall on Rachel's last remaining son.

⚰️ Bondmen means slaves

😬 They offer a severe penalty because they're certain none of them is guilty

---

## ✅ He With Whom It Is Found Shall Be My Servant; And Ye Shall Be Blameless

The steward softens the brothers' own offer. Instead of death, whoever has the cup will simply become a servant. Everyone else is declared blameless in advance.

This small mercy from the steward mirrors Joseph's pattern throughout the whole story: real consequences, but never as harsh as they could be.

✅ Blameless here means cleared in advance of guilt

🕊️ The penalty is real but softened, echoing Joseph's pattern of restrained authority

# Genesis 44:11-13

# 😱 The Cup Is Found

---

## 🏃 They Speedily Took Down Every Man His Sack, And Opened

Speedily means quickly, without hesitation. The brothers don't stall or argue further. They immediately open their sacks to prove their innocence.

Their confidence here is genuine. Confident people don't usually rush to open their own luggage in public.

🏃 Speedily means quickly, without delay

😤 Their haste shows real confidence, not guilt

---

## 🔍 He Searched, And Began At The Eldest, And Left At The Youngest

The steward searches in exact birth order, oldest to youngest, drawing out the tension with every empty sack until only Benjamin's is left.

The order isn't random. It's built to stretch the moment as long as possible before landing exactly where it was always going to land.

🔍 The search moves in birth order, building suspense verse by verse

😨 The cup was always going to turn up in the last sack checked

---

## 👕 Then They Rent Their Clothes

Rent means tore. Tearing your clothes was an old, immediate physical expression of grief or horror, done without thinking.

This isn't just fear of punishment. It's the sight of Rachel's last remaining son suddenly at the center of exactly the kind of disaster this family has lived through before.

👕 Rent means tore, an old physical sign of grief or shock

💔 Their reaction is grief, not just fear

# Genesis 44:14-17

# 🙇 Joseph Confronts Them Again

---

## 🙇 They Fell Before Him On The Ground

Judah and his brothers return to Joseph's house and fall to the ground in front of him again.

This is now the third time in three chapters the brothers have physically bowed before Joseph, still with no idea they're bowing to their own brother. His boyhood dream keeps fulfilling itself piece by piece.

🙇 This is the third time the brothers bow before Joseph

🌙 His old dream keeps quietly coming true

---

## 🌍 Wot Ye Not That Such A Man As I Can Certainly Divine?

Wot means know. Joseph asks if they didn't realize a man like him could supposedly uncover hidden things.

He's still fully in character as a foreign ruler with mysterious powers, keeping the truth of who he is hidden a little longer.

🌍 Wot means know

🎭 Joseph is still playing the role of a mysterious foreign official

---

## 🙏 God Hath Found Out The Iniquity Of Thy Servants

Judah doesn't try to argue that Benjamin is innocent of the cup. Instead, he says God has uncovered their guilt.

Iniquity means sin or wrongdoing. Judah isn't only thinking about a missing cup. He's thinking about the debt this family has owed since Genesis 37. To him, this feels like the past finally catching up with all of them.

🙏 Iniquity means sin or guilt

📖 Judah reads this as payback for the old sin against Joseph, not bad luck

---

## 🕊️ God Forbid That I Should Do So ... Get You Up In Peace

Joseph refuses to punish everyone. Only the one with the cup, meaning Benjamin, will become his servant. The rest are free to go home untouched.

This is the exact center of the whole test: Joseph hands the brothers a clean, easy way to leave Benjamin behind and walk away free.

🕊️ Joseph offers the brothers an easy exit that abandons Benjamin

🎯 This is the precise moment the entire test has been building toward

# Genesis 44:18-23

# 🗣️ Judah Recounts The Demand

---

## 🙏 For Thou Art Even As Pharaoh

Judah steps forward carefully, comparing Joseph's authority to Pharaoh's own before saying another word.

This begins the longest single speech in the whole book of Genesis. Judah isn't defending himself here. He's about to lay his family's entire history bare in front of a stranger who holds Benjamin's life in his hands.

🙏 Judah approaches with deep, careful respect

📖 What follows is the longest single speech in Genesis

---

## ❓ Have Ye A Father, Or A Brother?

Judah reminds Joseph this whole situation started with a simple question Joseph himself asked back in chapter 42, about their family.

Judah is showing that none of this was the brothers' scheme. It traces back to Joseph's own question.

❓ Judah traces the whole crisis back to Joseph's original question

🔁 Nothing about this was the brothers' idea

---

## 👶 A Child Of His Old Age ... His Father Loveth Him

Judah repeats what they already told Joseph: Benjamin is the beloved youngest son, born to Jacob late in life.

Saying it slowly, in full, is itself part of Judah's appeal. He wants Joseph to feel the weight of it, not just hear the facts.

👶 Judah repeats every detail about how precious Benjamin is to Jacob

🐢 Saying it slowly is part of the appeal, not just information

---

## 👀 That I May Set Mine Eyes Upon Him

Judah quotes Joseph's own past demand back to him: bring the boy so I can see him myself.

Judah is building his case piece by piece, using Joseph's own words as the foundation.

👀 Judah quotes Joseph's own past words back to him

---

## 💔 If He Should Leave His Father, His Father Would Die

Judah repeats the warning the brothers originally gave Joseph in chapter 42: taking Benjamin from Jacob could kill him.

This wasn't a new concern invented for this moment. The brothers said it from the very beginning, and Joseph pushed forward anyway.

💔 This warning was given from the very first conversation

⚠️ Joseph already knew this risk before demanding Benjamin come

---

## 🚫 Ye Shall See My Face No More

Judah repeats Joseph's exact ultimatum: no Benjamin, no further access to him at all.

Everything the family has done since chapter 42, the trip, the fear, the gifts, the argument with Jacob, all traces back to this one sentence.

🚫 This single sentence is the reason for everything that's happened since

# Genesis 44:24-29

# 💔 Judah Recounts Jacob's Fear

---

## 🏠 We Told Him The Words Of My Lord

Judah explains that they went home and reported Joseph's exact demand to Jacob, word for word.

Nothing was hidden or softened. Jacob heard the full weight of it directly.

🏠 The brothers reported the demand to Jacob exactly as given

---

## 🌾 Go Again, And Buy Us A Little Food

Judah quotes Jacob's own first response: simply send them back for more food, without yet grasping what that would require.

Hunger, once again, is what forces this family to face what it's been avoiding.

🌾 Jacob's first instinct is simply about survival

⚠️ He hasn't yet processed what going back will actually cost him

---

## 🙅 We Cannot Go Down ... Except Our Youngest Brother Be With Us

Judah reports the brothers' own firm answer to Jacob: no Benjamin, no trip.

They aren't hiding that they pushed back on their father too. Judah is being fully honest about every part of this conversation.

🙅 The brothers openly admit they held this line with Jacob too

---

## 👨‍👩‍👦 My Wife Bare Me Two Sons

Judah quotes Jacob calling Rachel simply "my wife," even though Jacob had two wives and two concubines.

That detail is not an accident. Rachel was always the wife Jacob loved most, and her two sons, Joseph and Benjamin, hold a place in Jacob's heart the other ten brothers have lived with for years.

👨‍👩‍👦 Jacob calling Rachel "my wife" reveals where his deepest love lies

💭 The other brothers have lived in the shadow of this favoritism their whole lives

---

## 💔 Surely He Is Torn In Pieces; And I Saw Him Not Since

Judah repeats, word for word, what Jacob has believed for over twenty years: that Joseph was torn apart by a wild animal.

Judah says this straight to Joseph's face without knowing it. Everyone in the room treats it as simple background information. For Joseph, it's the sound of his own faked death being casually repeated by the very brother who helped stage it.

💔 Judah unknowingly repeats the lie the brothers told about Joseph's death

😳 Joseph is hearing his own cover story recited back to him directly

---

## ⚰️ Ye Shall Bring Down My Gray Hairs With Sorrow To The Grave

Judah quotes Jacob's own words, an idiom meaning that losing another son now would be the grief that finally kills him in his old age.

This exact phrase already appeared once in Genesis 42. Judah repeats it word for word here, making sure Joseph understands exactly how serious Jacob's warning was.

⚰️ "Gray hairs to the grave" means dying under the weight of grief in old age

🔁 Judah repeats Jacob's exact warning, not a paraphrase of it

# Genesis 44:30-31

# 😢 What Losing Benjamin Would Do To Jacob

---

## ❤️ His Life Is Bound Up In The Lad's Life

Judah describes something almost physical: Jacob's own life is tied directly to whether Benjamin makes it home.

This isn't exaggeration to Judah. Jacob already believes he lost Joseph. Losing Benjamin too, the last living link to Rachel, would be more than grief. Judah believes it would actually kill him.

❤️ Jacob's life is described as literally tied to Benjamin's survival

💔 Judah isn't speaking poetically. He believes this is simply true

---

## ⚰️ Thy Servants Shall Bring Down The Gray Hairs Of Thy Servant Our Father With Sorrow To The Grave

Judah repeats the same idiom a third time in this speech, but now applies it to all the brothers together, not just himself.

The repetition isn't accidental. Judah is making sure Joseph cannot miss exactly what is at stake if Benjamin doesn't return.

⚰️ This is the third time this exact idiom appears in the speech

🤝 Judah now speaks for all the brothers, not just himself

# Genesis 44:32-34

# 🙋 Judah Offers Himself

---

## 🤝 Thy Servant Became Surety For The Lad Unto My Father

Judah reminds Joseph that he personally promised Jacob he would bring Benjamin home safely, and would bear the blame forever if he failed.

This is Judah keeping the exact word he gave in chapter 43, even though keeping it now will cost him his own freedom.

🤝 Judah is honoring a specific promise he made to Jacob

📖 Keeping that promise is about to cost him everything

---

## 🙋 Let Thy Servant Abide Instead Of The Lad A Bondman

This is the turn the entire book has been building toward. Judah offers to become a slave in Benjamin's place, so Benjamin can go home free.

This is the same Judah who once suggested selling Joseph into slavery for money back in Genesis 37. Now he offers to sell himself into slavery for nothing, to save a different younger brother from the very fate he once helped cause.

That change is exactly what Joseph has been waiting to see.

🙋 Judah offers to trade his own freedom for Benjamin's

🔄 This is the same man who once profited from selling a brother into slavery

⭐ Judah's transformation is the proof Joseph has been testing for

---

## 😢 Lest Peradventure I See The Evil That Shall Come On My Father

Judah closes by saying he cannot bear to watch his father suffer that loss. Peradventure means perhaps, so he's saying he can't risk even the chance of seeing that pain happen.

Judah isn't performing for effect here. He genuinely cannot go home and watch Jacob break.

😢 Peradventure means perhaps

💔 Judah's closing words are about protecting his father, not just keeping a promise`;

export const GENESIS_FORTY_FOUR_PERSONAL_SECTIONS = parseGenesisFortyFourRawNotes(GENESIS_FORTY_FOUR_RAW_NOTES);
