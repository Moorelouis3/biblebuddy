export type GenesisFortySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFortySixRawNotes(rawText: string): GenesisFortySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFortySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+46:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 46 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+46:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+46:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 46 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 46,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 46:${startVerse}` : `Genesis 46:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Genesis 46 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_SIX_RAW_NOTES = `# Genesis 46:1-4

# 🙏 God Speaks To Jacob At Beersheba

---

## 🛐 Came To Beer-sheba, And Offered Sacrifices Unto The God Of His Father Isaac

Beer-sheba was a significant place in the family's history, where both Abraham and Isaac had worshiped God before. Jacob stops here deliberately before leaving the promised land, to seek God's blessing on this huge, uncertain move.

🛐 Beer-sheba was a place already tied to Abraham and Isaac's worship of God

🚶 Jacob pauses for God's guidance before making this life-changing move

---

## 🌙 God Spake Unto Israel In The Visions Of The Night

God speaks to Jacob (called Israel here) in a night vision, calling his name twice: "Jacob, Jacob." Repeating someone's name like this in Scripture usually signals an especially important, personal moment.

🌙 A repeated name in Scripture usually marks a significant, personal moment

🗣️ Jacob answers immediately: "Here am I"

---

## 🌍 Fear Not To Go Down Into Egypt; For I Will There Make Of Thee A Great Nation

God directly addresses Jacob's likely fear about leaving the promised land. Egypt isn't a detour from God's promise to Abraham, it's actually where that promise will grow into a great nation, through the very famine that's forcing this move.

🌍 God reassures Jacob that leaving Canaan doesn't mean leaving the promise behind

📈 Egypt becomes the place the covenant family grows into a nation, not where the promise stalls

---

## ✋ Joseph Shall Put His Hand Upon Thine Eyes

This phrase describes closing a dying person's eyes after death, a tender final act performed by someone close to the deceased. God promises Jacob that Joseph, the son Jacob believed was dead for over twenty years, will be the one present at Jacob's own death.

✋ This idiom describes closing a loved one's eyes after death

💛 God promises Jacob the very son he grieved will be with him at the end

# Genesis 46:5-7

# 🐫 The Journey Begins

---

## 🚚 Carried Jacob Their Father ... In The Wagons Which Pharaoh Had Sent

The sons transport Jacob, the children, and the wives in the actual wagons Pharaoh provided back in chapter 45. This detail confirms Pharaoh's promise was already being kept before the family even reached Egypt.

🚚 The wagons are the very ones Pharaoh sent, already put to good use

---

## 🐑 They Took Their Cattle, And Their Goods

The family doesn't leave Canaan with nothing. They bring their full flocks, herds, and possessions, everything they'd built over years in the land, into this new chapter of their story.

🐑 The family brings its full livestock and possessions to Egypt, not just people

---

## 👨‍👩‍👧‍👦 His Sons' Sons ... His Daughters, And His Sons' Daughters, And All His Seed

Seed here means offspring or descendants. This move to Egypt isn't just Jacob and his twelve sons, it's the entire extended family, multiple generations, moving together into a new land.

👨‍👩‍👧‍👦 Seed means descendants

🏡 This is a full, multi-generational family relocation, not a small group

# Genesis 46:8-15

# 📜 The Sons Of Leah

---

## 📜 These Are The Names Of The Children Of Israel

The rest of this chapter lists every member of Jacob's family by name, tribe by tribe. In Scripture, a genealogy like this isn't filler, it's a record proving exactly who belongs to God's covenant family as it enters Egypt, name by name.

📜 A genealogy in Scripture functions as an official family record, not filler

🔢 Every name here documents someone specifically counted as part of God's covenant people

---

## 👶 Reuben, Jacob's Firstborn

Reuben is named first because he's the oldest son, a position of honor in this culture even though Reuben had lost some of his father's trust earlier in Genesis. His descendants are listed by name, continuing his line despite his past mistakes.

👶 Being firstborn was a position of honor even after Reuben's earlier failures

---

## 💔 Er And Onan Died In The Land Of Canaan

This is a direct callback to Genesis 38, the story of Judah, Tamar, and his sons Er and Onan, both of whom God struck down for their wickedness. Even inside a genealogy meant to celebrate the growing family, Scripture doesn't hide the family's real, painful history.

💔 This references the deaths of Er and Onan back in Genesis 38

📖 Scripture includes real family failures even inside a hopeful genealogy

---

## 👧 With His Daughter Dinah

Dinah, Jacob's daughter whose story is told in Genesis 34, is specifically named here among Leah's children, even though genealogies in this culture usually list only sons. Her inclusion shows she remained a counted, valued part of the family despite everything she went through.

👧 Naming a daughter here was unusual and shows she was still counted as family

---

## 🔢 All The Souls ... Were Thirty And Three

Souls here simply means people, individual persons. Leah's branch of the family alone, her sons, grandsons, and Dinah, comes to thirty-three people, giving a real sense of how large this family has already grown.

🔢 Souls means individual people, not a spiritual term here

📊 Leah's line alone already totals thirty-three family members

# Genesis 46:16-18

# 📜 The Sons Of Zilpah

---

## 🤝 Whom Laban Gave To Leah His Daughter

Zilpah was the handmaid Laban gave to Leah at her wedding, who later became a secondary wife to Jacob and bore him sons, Gad and Asher, whose family lines are listed here. This reflects the culture's practice of a wife's handmaid bearing children on her behalf.

🤝 Zilpah was Leah's handmaid, given to her by her father Laban

👨‍👩‍👦 Handmaids bearing children for their mistress was a recognized custom of this culture

---

## 🔢 Even Sixteen Souls

Zilpah's branch of the family totals sixteen people. Between Leah's own children and Zilpah's, nearly half of Jacob's whole household descends from these two women alone.

🔢 Zilpah's line contributes sixteen more family members to the total count

# Genesis 46:19-22

# 📜 The Sons Of Rachel

---

## 💛 The Sons Of Rachel Jacob's Wife; Joseph, And Benjamin

Rachel is specifically called "Jacob's wife" here, a small detail that quietly confirms she held Jacob's deepest love among all his wives. She had only two sons of her own, Joseph and Benjamin, the two brothers whose story has driven most of this book.

💛 Calling Rachel "Jacob's wife" by name reflects how central she was to Jacob's heart

👦 Joseph and Benjamin were Rachel's only two biological sons

---

## 👶 Unto Joseph ... Were Born Manasseh And Ephraim

Joseph's two Egyptian-born sons, introduced back in chapter 41, are formally counted here as part of Jacob's family line, even though they were born and raised entirely in Egypt to an Egyptian mother.

👶 Manasseh and Ephraim are counted as full members of Jacob's covenant family

---

## 🔢 All The Souls Were Fourteen

Rachel's branch, including Joseph's two sons, totals fourteen people, the smallest of the four family branches, fitting since Rachel had the fewest years with Jacob before her death.

🔢 Rachel's line, the smallest branch, still totals fourteen family members

# Genesis 46:23-27

# 🔢 The Sons Of Bilhah And The Family Total

---

## 🤝 The Sons Of Bilhah, Which Laban Gave Unto Rachel His Daughter

Bilhah was Rachel's handmaid, given to her the same way Zilpah was given to Leah, and became Jacob's fourth wife, bearing Dan and Naphtali. All four women, Leah, Zilpah, Rachel, and Bilhah, are represented in this family record.

🤝 Bilhah was Rachel's handmaid, mirroring Zilpah's role for Leah

👨‍👩‍👧‍👦 All four of Jacob's wives are represented in this genealogy

---

## 🔢 All The Souls Were Threescore And Six

Threescore means sixty. Sixty-six is the total count of Jacob's direct descendants who physically traveled with him into Egypt, not counting his sons' wives.

🔢 Threescore means sixty, so sixty-six people traveled with Jacob himself

---

## 🔟 All The Souls Of The House Of Jacob ... Were Threescore And Ten

Adding Joseph and his two Egyptian-born sons already in Egypt brings the grand total to seventy. Seventy is a number that shows up again and again in Scripture to represent completeness, and it becomes the well-known starting size of the nation that eventually leaves Egypt in the book of Exodus.

🔟 The full household total comes to seventy people

📖 Seventy is a number Scripture often uses to represent completeness

📈 This same number seventy becomes the starting point for the story told in Exodus

# Genesis 46:28-30

# 🤗 Jacob And Joseph Reunite

---

## 🧭 He Sent Judah Before Him Unto Joseph, To Direct His Face Unto Goshen

Jacob sends Judah ahead as a guide to make sure the family finds their way straight to Goshen. It's worth noticing that Judah, once the brother who suggested selling Joseph for profit, is now the one trusted to lead the family safely to him.

🧭 Judah is sent ahead to guide the family directly to Goshen

🔄 The same brother who once proposed selling Joseph now leads the family to him

---

## 🐎 Joseph Made Ready His Chariot ... Fell On His Neck, And Wept On His Neck A Good While

Joseph doesn't wait for his father to arrive somewhere formal. He personally rides out to meet Jacob and embraces him for a long, unhurried time, "a good while," showing this reunion isn't rushed or restrained in any way.

🐎 Joseph personally travels to meet his father rather than waiting for him

😭 "A good while" shows this embrace was long and unrestrained, not brief

---

## 💬 Now Let Me Die, Since I Have Seen Thy Face

Jacob's words aren't a literal wish to die immediately. It's an old expression meaning his life now feels complete, since he's seen with his own eyes that Joseph is truly alive, after over twenty years of grieving him as dead.

💬 This is an expression of complete contentment, not a literal death wish

⏳ Over twenty years of grief are resolved in this one reunion

# Genesis 46:31-34

# 🐑 Joseph Prepares His Family To Meet Pharaoh

---

## 📢 I Will Go Up, And Shew Pharaoh ... My Brethren ... Are Come Unto Me

Shew is an old spelling of "show." Joseph plans to formally present his family to Pharaoh himself, taking personal responsibility for introducing them into Egyptian society rather than leaving them to explain themselves.

📢 Shew means show

🛡️ Joseph personally takes responsibility for introducing his family to Pharaoh

---

## 🐑 The Men Are Shepherds ... They Have Brought Their Flocks

Joseph coaches his family in advance on exactly how to describe their occupation to Pharaoh: shepherds, a trade the family has practiced across generations.

🐑 Joseph prepares his family's exact answer in advance

---

## ❓ What Is Your Occupation?

Joseph anticipates Pharaoh's likely question and makes sure his family is ready with a clear, honest answer instead of being caught off guard in front of the most powerful man in Egypt.

❓ Joseph prepares the family for a specific question before it's even asked

---

## 🚫 Every Shepherd Is An Abomination Unto The Egyptians

Egyptian culture looked down on shepherding as a lowly, unclean occupation. Joseph's plan is strategic: by openly stating they're shepherds, the family will naturally be kept separate in Goshen rather than absorbed into the general Egyptian population, letting them preserve their own identity, customs, and worship of God.

🚫 Egyptians viewed shepherding as a low, unclean occupation

🧠 Joseph turns this cultural prejudice into a strategy for keeping his family together in Goshen`;

export const GENESIS_FORTY_SIX_PERSONAL_SECTIONS = parseGenesisFortySixRawNotes(GENESIS_FORTY_SIX_RAW_NOTES);
