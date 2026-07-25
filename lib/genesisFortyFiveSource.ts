export type GenesisFortyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFortyFiveRawNotes(rawText: string): GenesisFortyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFortyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+45:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 45 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+45:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+45:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 45 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 45,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 45:${startVerse}` : `Genesis 45:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Genesis 45 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_FIVE_RAW_NOTES = `# Genesis 45:1-3

# 🎭 Joseph Reveals Himself

---

## 😭 Joseph Could Not Refrain Himself

Refrain means hold back. After weeping privately twice already in this story, Joseph finally can't contain his emotion any longer in front of everyone.

Every test is over. Judah's offer to trade his own freedom for Benjamin's was the proof Joseph needed that his brothers had truly changed.

😭 Refrain means hold back

⏳ This is the moment all the earlier testing was building toward

---

## 🚪 Cause Every Man To Go Out From Me

Joseph clears the room of every Egyptian witness before revealing who he is. This is a private, family moment, not a public spectacle.

It's also protective. What Joseph is about to say, that his own brothers sold him into slavery, could bring shame or even danger to his brothers if Egyptian officials overheard it.

🚪 Joseph clears the room before revealing his identity

🛡️ Keeping this private protects his brothers, not just his own emotions

---

## 📢 He Wept Aloud: And The Egyptians And The House Of Pharaoh Heard

Even with the room cleared, Joseph's weeping is so loud it carries through the walls to the Egyptians outside and reaches Pharaoh's own household.

This is not quiet, composed crying. It's decades of grief, fear, and hope breaking open at once.

📢 His weeping is loud enough to be heard outside the room

💔 Years of buried emotion are surfacing all at once

---

## 🎭 I Am Joseph

Joseph says his own name out loud to his brothers for the first time in over twenty years. After every disguise, every harsh word, every test, this is the moment the mask finally comes off.

🎭 This is the first time Joseph reveals his real identity to his brothers

⏳ Over twenty years of hidden identity end in these two words

---

## ❓ Doth My Father Yet Live?

Joseph's very next words, immediately after revealing himself, are about Jacob. Not questions about the money, the accusations, or the test. Just: is my father still alive?

This tells us exactly what's been weighing on Joseph the whole time he's had power. Not revenge. His father.

❓ Joseph's first concern after revealing himself is Jacob, not the past wrongs

💛 This shows what's actually been on Joseph's heart the entire time

---

## 😳 His Brethren Could Not Answer Him; For They Were Troubled At His Presence

The brothers are stunned into silence. Troubled here means deeply shaken, even terrified.

The man who has held their lives in his hands this whole time, who accused them, tested them, and could have destroyed them, is the very brother they sold into slavery over twenty years ago.

😳 Troubled means deeply shaken or terrified

⚡ The brothers realize their judge this whole time was their own brother

# Genesis 45:4-8

# 🙏 Joseph Explains God's Plan

---

## 🤝 Come Near To Me, I Pray You

Joseph doesn't wait for his stunned brothers to move. He invites them closer himself, softening the moment instead of letting the silence stretch on.

🤝 Joseph closes the distance himself rather than waiting on them

---

## 💔 I Am Joseph Your Brother, Whom Ye Sold Into Egypt

Joseph says it plainly, including the hardest part himself: "whom ye sold into Egypt." He doesn't dance around what happened. He names it directly, then moves immediately toward forgiveness rather than accusation.

💔 Joseph names the wrong directly instead of avoiding it

➡️ He moves straight from naming the wrong to offering peace

---

## 🕊️ Be Not Grieved, Nor Angry With Yourselves

Joseph's first instruction to his brothers is to let go of their guilt. He's not minimizing what they did. He's releasing them from carrying it forever.

🕊️ Joseph releases his brothers from ongoing guilt, without denying what happened

---

## 🌾 For God Did Send Me Before You To Preserve Life

Joseph reframes his entire story: not "you sent me to Egypt," but "God sent me before you." This doesn't erase his brothers' choice to sell him. It means God worked through that choice toward a purpose bigger than the brothers intended.

🌾 Joseph sees God's purpose working through, not excusing, his brothers' sin

📖 A wrong done to someone doesn't cancel out what God can still do through it

---

## 🌱 Earing Nor Harvest

Earing is an old word for plowing. Joseph explains that for five more years, there will be no plowing and no harvest anywhere, meaning the famine is far from over.

This detail matters because it shows exactly how much worse things would get for the family without Joseph's position in Egypt.

🌱 Earing means plowing

⏳ Five more full years of famine remain

---

## 🛟 To Preserve You A Posterity ... A Great Deliverance

Posterity means future descendants. Joseph explains that his years of suffering weren't random. God used his position to keep the entire covenant family, and its future generations, alive.

🛟 Posterity means the family's future generations

📖 God's plan through Joseph secures the family's whole future, not just this one famine

---

## 👑 He Hath Made Me A Father To Pharaoh

Being called "a father to Pharaoh" was a real Egyptian title for a top royal advisor, not a literal family claim. Joseph explains again that God, not his brothers or his own effort, is the one who placed him in this position.

👑 "Father to Pharaoh" was an Egyptian title for a chief advisor

🙏 Joseph credits God for his position a third time in this short speech

# Genesis 45:9-11

# 🏃 Joseph's Instructions To Bring Jacob

---

## 🏃 Haste Ye ... Tarry Not

Joseph is urgent. Tarry means delay. He wants his father moved to Egypt immediately, not because of the test anymore, but because time and the famine are both still working against the family.

🏃 Tarry means delay

⏳ Joseph's urgency is about the ongoing famine, not more testing

---

## 🌾 Thou Shalt Dwell In The Land Of Goshen

Goshen was a fertile region in northeastern Egypt, well suited for grazing livestock, and separate enough from the main Egyptian population to let Jacob's family keep their own identity and way of life.

🌾 Goshen was a fertile grazing region in northeastern Egypt

🏠 Settling there let the family stay together and keep their own way of life

---

## 🤲 There Will I Nourish Thee

Joseph promises to personally provide for his father and the whole family through the remaining five years of famine. This is the same brother who was once left to be sold for silver, now offering to support the family that sold him.

🤲 Joseph personally commits to providing for the whole family

🔄 The brother once sold for money now offers full provision in return

# Genesis 45:12-15

# 🤗 Joseph Embraces His Brothers

---

## 👀 Your Eyes See ... That It Is My Mouth That Speaketh Unto You

Joseph points out that his brothers, and Benjamin especially, can see for themselves it's really him speaking, not a translator or an impersonator. He's asking them to trust what's right in front of them.

👀 Joseph asks them to trust the plain evidence of their own eyes

---

## 📣 Ye Shall Tell My Father Of All My Glory In Egypt

Joseph wants Jacob to hear not just that Joseph is alive, but how well things have actually gone for him. This isn't pride. It's reassurance for a father who has grieved his son as dead for over twenty years.

📣 Joseph wants Jacob reassured, not just informed

💛 This detail is about comforting Jacob's grief, not boasting

---

## 😭 He Fell Upon His Brother Benjamin's Neck, And Wept

Joseph embraces Benjamin first, his only full brother, both sons of Rachel. This is the reunion Joseph has been quietly working toward since Benjamin first arrived in Egypt.

😭 Benjamin is Joseph's only full brother, and gets embraced first

⭐ This completes the reunion the whole testing process was building toward

---

## 💋 He Kissed All His Brethren ... His Brethren Talked With Him

Joseph kisses each brother in turn, a customary greeting of full acceptance and reconciliation in this culture. Only after this physical, visible reconciliation are the brothers finally able to speak freely with him.

💋 A kiss here signals full reconciliation, not just affection

🗣️ Real conversation only becomes possible after trust is restored

# Genesis 45:16-20

# 👑 Pharaoh's Generous Response

---

## 📢 The Fame Thereof Was Heard In Pharaoh's House

News that Joseph's brothers have arrived spreads quickly through the royal household. Joseph's story and position are well known enough that this news matters to Pharaoh personally.

📢 Joseph's family situation is significant news even inside the palace

---

## 😊 It Pleased Pharaoh Well, And His Servants

Pharaoh isn't just tolerant of this reunion, he's genuinely glad about it, and so is his court. This reaction sets up Pharaoh's unusually generous response in the verses that follow.

😊 Pharaoh's genuine approval sets up his generosity next

---

## 🐫 Lade Your Beasts ... Get You Unto The Land Of Canaan

Lade means load up. Pharaoh personally instructs Joseph's brothers to head back to Canaan and bring the whole family to Egypt, backing Joseph's invitation with royal authority.

🐫 Lade means load up

👑 Pharaoh personally endorses and backs Joseph's invitation

---

## 🧈 Ye Shall Eat The Fat Of The Land

"The fat of the land" is an idiom meaning the very best, richest produce a land has to offer, not literal animal fat. Pharaoh is promising Jacob's family full access to Egypt's best resources.

🧈 "The fat of the land" means the very best of what a land produces

🎁 Pharaoh offers the family Egypt's finest resources, not just survival

---

## 🚚 Take You Wagons ... Regard Not Your Stuff

Pharaoh provides Egyptian wagons for transporting the women, children, and elderly, and tells the brothers not to worry about their belongings back in Canaan, since Egypt's resources will cover everything they need.

🚚 Wagons are provided specifically for the vulnerable members of the family

📦 Pharaoh removes any worry about what has to be left behind

# Genesis 45:21-24

# 🎁 Gifts And Departure

---

## 🎁 Joseph Gave Them Wagons ... And Provision For The Way

Joseph follows through on Pharaoh's promise immediately, supplying wagons and food for the journey. He doesn't just send permission, he personally provides for the trip.

🎁 Joseph personally supplies the wagons and travel provisions

---

## 👘 Changes Of Raiment ... Benjamin ... Three Hundred Pieces Of Silver

Raiment means clothing. Every brother receives a change of clothes, but Benjamin alone receives five changes and three hundred pieces of silver.

This is deliberate favoritism, the same pattern that once caused so much pain in this family with Joseph's coat. This time, though, the other ten brothers know the full story and don't react with jealousy. That's the real proof of how much they've changed.

👘 Raiment means clothing

💰 Benjamin receives far more than the others, echoing Joseph's old coat

🕊️ Unlike before, no jealousy follows this favoritism, showing real change

---

## 🐴 Ten Asses Laden ... Ten She Asses Laden

Joseph sends ten male donkeys loaded with Egypt's finest goods and ten female donkeys loaded with grain, bread, and meat, specifically for his father's journey and comfort.

🐴 Twenty animals in total are loaded specifically for Jacob's benefit

---

## ⚠️ See That Ye Fall Not Out By The Way

Joseph's parting words are a warning: don't quarrel or blame each other on the road home. He knows this family's history of conflict well enough to guess old tensions could resurface once they're alone together again.

⚠️ Joseph anticipates old family tension could resurface on the journey

🧠 He knows his brothers' history well enough to warn them in advance

# Genesis 45:25-28

# 💔 Jacob Hears The News

---

## 😨 Joseph Is Yet Alive ... Jacob's Heart Fainted, For He Believed Them Not

The brothers deliver the news to Jacob, and his heart "fainted," meaning he went numb with shock. After more than twenty years of believing Joseph was dead, he simply cannot accept the news as true at first.

😨 Jacob's heart "fainting" describes numb, disbelieving shock

⏳ Twenty years of grief don't dissolve with just one sentence

---

## ❤️‍🩹 The Spirit Of Jacob Their Father Revived

Only after hearing every detail, and seeing the wagons Joseph actually sent, does Jacob's spirit come back to life. Real, physical evidence is what finally breaks through decades of grief.

❤️‍🩹 Seeing real proof, not just hearing words, is what convinces Jacob

🚚 The wagons themselves become physical evidence Joseph is truly alive

---

## 🙌 It Is Enough; Joseph My Son Is Yet Alive

Jacob's response is simple and complete. After all the losses, the favoritism, the grief, and the waiting, one truth is enough to satisfy him: his son is alive.

🙌 One truth outweighs every year of grief that came before it

➡️ Jacob is finally ready to see Joseph before he dies`;

export const GENESIS_FORTY_FIVE_PERSONAL_SECTIONS = parseGenesisFortyFiveRawNotes(GENESIS_FORTY_FIVE_RAW_NOTES);
