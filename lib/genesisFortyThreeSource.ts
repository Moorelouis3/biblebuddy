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

Sore here means severe, not painful in the modern sense.

The grain from the first trip is gone.

The family is right back where they started, except now there's a condition attached to going back: Benjamin has to come too.

😟 Sore means severe

🌾 The first trip's grain has already run out

⚖️ Survival and Benjamin's safety are now tied together

---

## 🗣️ The Man Did Solemnly Protest Unto Us

Judah reminds Jacob what Joseph actually said.

Solemnly protest means Joseph stated it firmly and seriously, not as a casual suggestion.

"Ye shall not see my face" was Joseph's exact condition: no Benjamin, no more grain, no more audience with him at all.

Judah isn't guessing at the terms. He's repeating them exactly.

🗣️ Solemnly protest means stated firmly and seriously

🚫 "Ye shall not see my face" was a flat condition, not a suggestion

---

## 😠 Wherefore Dealt Ye So Ill With Me

Jacob turns on his sons in frustration, blaming them for even mentioning they had another brother.

"Dealt ye so ill with me" means "why did you treat me so badly."

Jacob isn't thinking about what was actually said in Egypt. He's thinking about what it costs him now.

😠 Jacob blames his sons for volunteering the information

💭 Jacob's fear is making him reach for someone to blame

---

## 🤷 Could We Certainly Know That He Would Say, Bring Your Brother Down?

The brothers push back. Joseph asked pointed, personal questions, and they simply answered honestly.

They had no way of knowing those answers would lead to this demand.

This is the brothers' one real defense: they weren't scheming, they were just answering a powerful stranger's questions.

🤷 The brothers were answering honestly, not planning ahead

❓ They had no way to predict where the questions were leading

# Genesis 43:8-10

# 🤝 Judah Offers Surety

---

## 🤝 I Will Be Surety For Him

Surety means Judah is putting himself on the line as a guarantee.

If Benjamin doesn't come home safely, Judah says the blame is his to carry forever.

This is a real shift. Back in Genesis 37, Judah was the one who suggested selling Joseph for profit. Now he's the one offering to carry the full weight of protecting a younger brother.

🤝 Surety means personally guaranteeing someone's safe return

🔄 This is the same Judah who once suggested selling Joseph

📖 A person can change what kind of brother they are

---

## ⏳ Except We Had Lingered, We Had Returned This Second Time

Judah points out the obvious: their hesitation is costing them time and food.

Lingered means delayed or dragged their feet.

Every day they argue is another day the family goes hungry.

⏳ Lingered means delayed

🍞 Every day of arguing is a day closer to starving

# Genesis 43:11-14

# 🎁 Jacob's Instructions

---

## 🎁 Take Of The Best Fruits In The Land ... A Present

Jacob gives in and tells his sons to bring a gift: balm, honey, spices, myrrh, nuts, and almonds.

These were valuable trade goods, the best of what Canaan still had even during a famine.

Balm and myrrh were resins used in medicine and in expensive perfumes. Spices were rare and costly. This gift is meant to soften the powerful Egyptian official's attitude toward them.

🎁 The gift is made of Canaan's most valuable trade goods

💰 Balm and myrrh were used in medicine and costly perfume

🙇 A gift like this was a way to show respect and win favor

---

## 💰 Take Double Money ... Peradventure It Was An Oversight

Peradventure means perhaps or maybe.

Jacob tells them to bring back the money that mysteriously reappeared in their sacks, plus double money for this trip's grain.

He assumes the returned money was simply a mistake, an oversight by an Egyptian clerk.

He has no idea it was a deliberate act of mercy from the son he thinks is dead.

💰 They're told to return the mystery money plus pay double

🤔 Peradventure means perhaps

😢 Jacob assumes a mistake where there was actually mercy

---

## 🙏 God Almighty Give You Mercy ... If I Be Bereaved, I Am Bereaved

Jacob finally lets go, and does it by handing the outcome to God.

Bereaved means robbed by loss or death.

"If I be bereaved, I am bereaved" is Jacob accepting that he cannot control what happens next. He's said it before about Joseph. Now he braces to possibly say it again about Benjamin.

This is a father surrendering the one thing he's been gripping the tightest.

🙏 Jacob places the outcome in God's hands

💔 Bereaved means robbed by loss or death

📖 Letting go here costs Jacob everything he has left to lose

# Genesis 43:15-18

# 😨 Fear At Joseph's House

---

## 🏠 Bring These Men Home ... Dine With Me At Noon

Joseph sees Benjamin arrive and immediately orders a feast prepared.

This is a huge shift from his rough treatment of them in chapter 42.

The brothers don't know why any of this is happening. All they see is a powerful stranger suddenly inviting them to his private home.

🏠 Joseph's tone shifts the moment he sees Benjamin

🍽️ A formal noon meal at an official's house was a major honor

😕 The brothers have no idea why their treatment just changed

---

## 😨 That He May Seek Occasion Against Us

The brothers assume the worst.

"Seek occasion against us" means looking for an excuse to punish them.

They think the returned money is a setup, a trap meant to justify enslaving them and taking their donkeys.

Guilt has trained them to expect punishment, even in a moment that's actually kindness.

😨 They believe they're walking into a trap

⚖️ "Seek occasion" means looking for an excuse to accuse them

📖 Guilt can make mercy look like danger

# Genesis 43:19-23

# 🗣️ The Steward Reassures Them

---

## 🗣️ O Sir, We Came Indeed Down At The First Time To Buy Food

The brothers rush to explain themselves to Joseph's steward before anything bad can happen.

They lay out the whole story of the money appearing in their sacks, insisting they don't know how it got there.

They're trying to prove their innocence before they're even accused of anything.

🗣️ The brothers explain themselves before being accused

😰 Fear is driving them to over-explain

---

## 🕊️ Peace Be To You, Fear Not ... Your God ... Hath Given You Treasure

The steward's answer is calm and surprising.

He tells them not to be afraid, and credits their God with putting the money there as treasure, not as a trap.

Then he brings Simeon out to them, safe.

Whether or not the steward fully understood Joseph's private mercy, his words land as pure relief to men who expected punishment.

🕊️ The steward tells them not to fear

🎁 He credits their God with a gift, not a trick

👋 Simeon is returned to them safe, as promised

---

## 🐴 He Gave Their Asses Provender

Provender means feed for animals.

Small detail, but it shows real hospitality: their donkeys are cared for along with the men themselves.

🐴 Provender means animal feed

🤲 Even the animals are treated with real care

# Genesis 43:24-25

# 🍽️ Preparing For The Meal

---

## 🍽️ They Made Ready The Present Against Joseph Came At Noon

The brothers get their gift ready, nervously waiting for the man who holds their lives in his hands to arrive for a meal they don't understand the purpose of.

"Against Joseph came" is an old way of saying "in preparation for when Joseph would arrive."

🍽️ They prepare the gift ahead of Joseph's arrival

⏳ "Against" here means "in preparation for," an old use of the word

# Genesis 43:26-29

# 👋 Joseph Greets Them

---

## 🙇 They Bowed Themselves To Him To The Earth

The brothers bow to Joseph again, presenting their gift.

This is the second time in two chapters they've physically bowed before him, still not knowing they're bowing to their own brother.

Joseph's boyhood dream keeps coming true in front of him, piece by piece.

🙇 The brothers bow to Joseph a second time

🌙 Joseph's old dream keeps quietly fulfilling itself

---

## ❤️ Is Your Father Well ... Is He Yet Alive?

Joseph asks about Jacob directly, and the brothers answer that he's alive and well.

This is Joseph getting real news about the father he hasn't seen in over twenty years, delivered by the very brothers who took that father's son away from him.

❤️ Joseph finally gets real news about his father

⏳ Twenty years of separation are behind this simple question

---

## 😭 Is This Your Younger Brother? ... God Be Gracious Unto Thee, My Son

Joseph sees Benjamin for the first time since Benjamin was a small child.

Benjamin is his only full brother, both sons of Rachel.

Joseph blesses him warmly, calling him "my son" even though Joseph is Benjamin's brother, not his father. It's a term of deep affection here, not a literal claim.

😭 Benjamin is Joseph's only full brother, both sons of Rachel

💛 "My son" here is affectionate warmth, not a literal title

# Genesis 43:30-31

# 😢 Joseph Weeps Privately

---

## 😭 His Bowels Did Yearn Upon His Brother

In the Bible's language, the bowels were thought of as the seat of deep emotion, similar to how we say something is felt "in your gut" today.

"His bowels did yearn" means Joseph was overwhelmed with love and emotion the moment he saw Benjamin.

He can't hold it together in front of everyone, so he leaves the room to weep alone.

😭 "Bowels yearning" is old language for being overwhelmed with deep feeling

🚪 Joseph leaves the room rather than break down in public

---

## 💧 He Washed His Face ... And Refrained Himself

Joseph composes himself before coming back out.

Refrained himself means he held back his emotion by force of will.

He's still testing his brothers. Breaking down completely, right now, would end the test before it's finished.

💧 Refrained means held back deliberately

🎭 Joseph is still managing the test even while overwhelmed personally

# Genesis 43:32-34

# 🍽️ The Meal

---

## 🚫 The Egyptians Might Not Eat Bread With The Hebrews ... An Abomination

Egyptians ate separately from Hebrews at this meal, and the text says it was because doing otherwise would be an abomination to Egyptians.

Egyptian culture viewed shepherding peoples like the Hebrews as ritually unclean or socially beneath them.

Joseph himself, though ruling as an Egyptian official, still sits apart from the Egyptians in this scene, in a kind of in-between position.

🚫 Egyptians avoided eating with Hebrews as a cultural boundary

🐑 Hebrew shepherd life was looked down on by Egyptian custom

---

## 😲 The Firstborn According To His Birthright ... The Men Marvelled

The brothers are seated in exact birth order, oldest to youngest, something no stranger could have guessed correctly.

Marvelled means they were amazed, even a little unsettled.

This detail is another quiet clue that "the man" running this whole encounter knows far more about their family than he should.

😲 Marvelled means amazed and unsettled

🔍 Being seated in exact birth order is a clue they don't yet understand

---

## 🍽️ Benjamin's Mess Was Five Times So Much As Any Of Theirs

Mess here means a portion or serving of food, not a mess in the modern sense.

Joseph gives Benjamin five times as much food as everyone else, a deliberate favoring of his one full brother.

It may also be another quiet test: watching whether the brothers respond to a favored younger brother with jealousy, the same way they once did with Joseph himself.

🍽️ Mess means a portion of food, not disorder

⚖️ Benjamin openly receives special favor, just like Joseph once did

🔍 Joseph may be watching to see if old jealousy resurfaces`;

export const GENESIS_FORTY_THREE_PERSONAL_SECTIONS = parseGenesisFortyThreeRawNotes(GENESIS_FORTY_THREE_RAW_NOTES);
