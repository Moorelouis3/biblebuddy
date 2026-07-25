export type GenesisFortyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFortyEightRawNotes(rawText: string): GenesisFortyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFortyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+48:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 48 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+48:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+48:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 48 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 48,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 48:${startVerse}` : `Genesis 48:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Genesis 48 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_EIGHT_RAW_NOTES = `# Genesis 48:1-2

# 🛏️ Joseph Visits His Sick Father

---

## 🤒 Thy Father Is Sick

Word reaches Joseph that Jacob is dying. Joseph brings his two sons, Manasseh and Ephraim, with him, sensing this visit carries special weight.

🤒 Jacob is nearing death, prompting this visit

👦 Joseph brings his two sons along, expecting this moment to matter

---

## 💪 Israel Strengthened Himself, And Sat Upon The Bed

Even weak and dying, Jacob gathers his strength to sit upright for this meeting. This is a deliberate act of respect and readiness, not just physical effort. What Jacob is about to do next matters enough to him to fight through his frailty for it.

💪 Jacob physically musters his remaining strength for this moment

🎯 His effort shows how important what's about to happen is to him

# Genesis 48:3-4

# 🙏 Jacob Recounts God's Promise

---

## ✝️ God Almighty Appeared Unto Me At Luz

God Almighty translates the Hebrew name El Shaddai, a name emphasizing God's supreme power. Luz was the original name of the place Jacob later renamed Bethel, meaning "house of God," after his famous vision of the ladder to heaven back in Genesis 28.

✝️ God Almighty translates El Shaddai, emphasizing God's supreme power

🏠 Luz was the original name of Bethel, where Jacob had his ladder vision

---

## 🌍 A Multitude Of People ... An Everlasting Possession

Jacob repeats God's covenant promise almost word for word: descendants beyond counting, and permanent ownership of the land. Even now, near death in Egypt, Jacob's mind is fixed on the promise God made to his family generations ago.

🌍 Jacob restates the covenant promise of descendants and land

📖 This same promise was first given to Abraham and passed down through Isaac

# Genesis 48:5-7

# 👶 Jacob Adopts Ephraim And Manasseh

---

## 👨‍👦‍👦 Thy Two Sons ... Are Mine; As Reuben And Simeon, They Shall Be Mine

Jacob formally adopts Joseph's two sons as his own, placing them on equal legal standing with his own sons Reuben and Simeon. This isn't sentimental language, it's a real legal and covenant act that will shape Israel's future tribal structure.

👨‍👦‍👦 Jacob is performing a formal adoption, not just an emotional gesture

📜 Ephraim and Manasseh become full tribes of Israel because of this moment

---

## 🎁 Called After The Name Of Their Brethren In Their Inheritance

Any children Joseph has after Ephraim and Manasseh will not get their own separate tribal inheritance, they'll be counted under Ephraim and Manasseh's tribal lines instead. This adoption is specific and limited, not open-ended.

🎁 Only Ephraim and Manasseh receive this special adopted status, not future sons

---

## 💔 Rachel Died By Me ... I Buried Her There In The Way Of Ephrath; The Same Is Bethlehem

In the middle of this legal moment, Jacob suddenly brings up Rachel's death, unprompted. Ephrath is identified as Bethlehem, the same town later famous as David's hometown and the birthplace of Jesus. Even decades later, Jacob's grief for Rachel, Joseph's mother, is still close to the surface.

💔 Jacob's grief for Rachel resurfaces even in this legal, formal moment

🏘️ Ephrath is identified here as Bethlehem, later famous in Israel's history

# Genesis 48:8-11

# 👀 Jacob's Fading Eyes

---

## ❓ Israel Beheld Joseph's Sons, And Said, Who Are These?

Jacob doesn't recognize his own grandsons by sight. This isn't confusion about who they are in general, it's a direct result of his failing eyesight, which the text explains just two verses later.

❓ Jacob's question is about eyesight, not memory or confusion

---

## 👓 The Eyes Of Israel Were Dim For Age, So That He Could Not See

Jacob's blindness in old age directly echoes his own father Isaac's blindness in Genesis 27, when Jacob himself took advantage of poor eyesight to receive Isaac's blessing instead of Esau. Now Jacob is the one who can't see clearly during a blessing.

👓 Jacob's blindness mirrors Isaac's blindness from Genesis 27

🔄 The same physical weakness that once helped Jacob now limits Jacob himself

---

## 😲 I Had Not Thought To See Thy Face: And, Lo, God Hath Shewed Me Also Thy Seed

Jacob never expected to see Joseph alive again, let alone live long enough to meet Joseph's own children. Shewed is an old spelling of "showed." This is Jacob recognizing an extra, unexpected layer of blessing on top of Joseph's survival itself.

😲 Jacob never expected to live long enough to meet Joseph's children

📖 Shewed means showed

# Genesis 48:12-14

# 🤲 The Crossed-Hands Blessing

---

## 🙇 Joseph Bowed Himself With His Face To The Earth

Joseph, the second most powerful man in Egypt, bows completely to the ground before his dying father. Worldly power means nothing here, Joseph humbles himself fully in front of Jacob's authority as his father and as the covenant's patriarch.

🙇 Joseph's political power doesn't override his respect for his father

---

## ✋ Ephraim In His Right Hand Toward Israel's Left Hand, And Manasseh In His Left Hand Toward Israel's Right Hand

Joseph carefully positions his sons so that Manasseh, the firstborn, lines up with Jacob's stronger right hand, following normal birth-order custom. The right hand traditionally carried the greater blessing in this culture.

✋ Joseph positions his sons to follow normal firstborn custom

🫱 The right hand traditionally carried the greater blessing

---

## 🔄 Guiding His Hands Wittingly; For Manasseh Was The Firstborn

Wittingly means knowingly and deliberately, not by accident. Despite being nearly blind, Jacob crosses his arms on purpose, placing his right hand on Ephraim, the younger son, instead of Manasseh. This isn't confusion, it's an intentional reversal.

🔄 Wittingly means knowingly and on purpose, not by mistake

🎯 Jacob's crossed hands are a deliberate choice, not blindness causing an error

# Genesis 48:15-16

# 🙏 Jacob's Blessing

---

## 🚶 The God Before Whom My Fathers Abraham And Isaac Did Walk

Jacob roots his blessing in three generations: Abraham, Isaac, and now himself, describing their whole lives as walking with God. This blessing is Jacob passing down a family relationship with God, not just wishing his grandsons well.

🚶 "Walking with God" describes a whole life lived in relationship with Him

📖 Jacob links three generations, Abraham, Isaac, and himself, in this one blessing

---

## 👼 The Angel Which Redeemed Me From All Evil

Jacob refers to God's protective presence across his whole difficult life as "the Angel who redeemed me." Redeemed here means rescued or delivered, the same idea used later in Scripture for God rescuing Israel from slavery in Egypt.

👼 Redeemed means rescued or delivered from danger

🔮 This same rescue language later describes Israel's deliverance from Egypt

---

## 🌍 Let My Name Be Named On Them ... Let Them Grow Into A Multitude

Jacob asks that his own name, and the names of Abraham and Isaac before him, be carried forward through Ephraim and Manasseh. He's asking God to make these two grandsons carry the whole covenant family's identity into the future.

🌍 Jacob asks for the whole covenant legacy to continue through these two grandsons

# Genesis 48:17-19

# ⚖️ Joseph's Objection And Jacob's Refusal

---

## 😟 It Displeased Him: And He Held Up His Father's Hand

Joseph notices the crossed hands and assumes it's a mistake caused by Jacob's blindness. He tries to physically correct it, moving Jacob's right hand from Ephraim's head to Manasseh's, expecting his father simply can't see clearly.

😟 Joseph assumes his father's blindness caused an honest mistake

🖐️ He physically tries to correct what he thinks is an error

---

## 🚫 Not So, My Father: For This Is The Firstborn

Joseph respectfully but firmly pushes back, reminding Jacob which son is actually the firstborn, expecting his father to simply not realize what he's done.

🚫 Joseph respectfully corrects his father, assuming genuine confusion

---

## 👴 I Know It, My Son, I Know It

Jacob's response is calm and clear: he already knows exactly what he's doing. This confirms the crossing of hands back in verse 14 was never a mistake at all, it was Jacob's deliberate decision from the start.

👴 Jacob confirms he made this choice fully aware, not by accident

---

## 📈 His Younger Brother Shall Be Greater Than He

Jacob predicts that Ephraim's tribe will grow larger and more prominent than Manasseh's, despite Manasseh being the firstborn. This continues a pattern seen again and again in Genesis: the younger repeatedly rising above the older, as with Jacob himself over Esau, and Isaac over Ishmael.

📈 Jacob predicts Ephraim's line will surpass Manasseh's

🔁 This mirrors the recurring Genesis pattern of the younger rising above the older

# Genesis 48:20-22

# 🌍 The Final Blessing And Parting Words

---

## 🙏 In Thee Shall Israel Bless, Saying, God Make Thee As Ephraim And As Manasseh

Jacob's blessing becomes so significant that it turns into a lasting formula, future generations of Israel will use "God make thee as Ephraim and as Manasseh" as a standard blessing over their own children.

🙏 This blessing becomes a lasting formula used by later generations

---

## ⬆️ He Set Ephraim Before Manasseh

Jacob makes his intentional order official and public, formally placing Ephraim ahead of Manasseh, cementing the reversal he already explained.

⬆️ Jacob makes the reversed birth order official and public

---

## ⚰️ Behold, I Die: But God Shall Be With You

Jacob acknowledges his own approaching death plainly and without fear, immediately turning the focus to God's continued presence with Joseph and the whole family after he's gone.

⚰️ Jacob faces his own death directly, without avoiding the subject

🙏 His focus shifts immediately to God's ongoing presence with his family

---

## ⚔️ One Portion Above Thy Brethren, Which I Took Out Of The Hand Of The Amorite With My Sword And With My Bow

Jacob gives Joseph an extra portion of land beyond what his brothers receive, language that connects to the region near Shechem. This detail links back to the family's earlier history in that area from Genesis 33-34, giving Joseph a tangible inheritance beyond the shared blessing.

⚔️ Jacob gives Joseph an extra land inheritance beyond his brothers' shares

🗺️ This connects back to the family's earlier history near Shechem in Genesis 33-34`;

export const GENESIS_FORTY_EIGHT_PERSONAL_SECTIONS = parseGenesisFortyEightRawNotes(GENESIS_FORTY_EIGHT_RAW_NOTES);
