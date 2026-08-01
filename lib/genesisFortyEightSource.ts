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

The word "one" never names who brought this news to Joseph.

Joseph responds by bringing his two sons with him.

He senses this visit will carry lasting weight.

An ordinary report becomes the reason for an urgent trip.

A father's blessing was worth rushing for.

🤒 An unnamed messenger brings the news

👦 Joseph brings both his sons

⏱️ He responds without delay

📖 A father's blessing was worth rushing for

## 💪 Israel Strengthened Himself, And Sat Upon The Bed

Jacob gathers what strength he has left to sit upright.

Sitting up here is a deliberate act, not just physical effort.

In this culture, a formal blessing was given sitting up, not lying down.

Jacob would rather fight through weakness than deliver it lying flat.

Some moments deserve your very last strength.

💪 Jacob musters his remaining strength

🛏️ Sitting up signaled a formal moment

😤 He refuses to bless Joseph lying down

📖 Some moments deserve your very last strength

# Genesis 48:3-4
# 🙏 Jacob Recounts God's Promise
---
## ✝️ God Almighty Appeared Unto Me At Luz

"God Almighty" translates the Hebrew name El Shaddai.

The name points to God's supreme, unmatched power.

Luz was the town later renamed Bethel, meaning "house of God."

That renaming happened after Jacob's vision of a ladder reaching to heaven.

Jacob is standing in memory on the same ground where God first spoke to him.

✝️ God Almighty means El Shaddai

💪 The name points to supreme power

🏠 Luz became Bethel after Jacob's vision

📖 Jacob recalls where God first spoke

## 🌍 An Everlasting Possession

Jacob repeats the covenant promise God gave him at Bethel.

It included descendants too many to count.

It included permanent ownership of the land of Canaan.

Jacob is near death in Egypt, far from that land.

His mind stays fixed on a promise not yet fulfilled.

Recounting it here is Jacob's way of clinging to it.

🌍 Jacob repeats God's covenant promise

👶 It promised descendants beyond counting

🗺️ It promised permanent ownership of Canaan

📖 Jacob clings to an unfulfilled promise

# Genesis 48:5-7
# 👶 Jacob Adopts Ephraim And Manasseh
---
## 👨‍👦‍👦 As Reuben And Simeon, They Shall Be Mine

Jacob formally adopts Joseph's two sons as his own.

Ephraim and Manasseh now stand equal to Jacob's own sons.

That includes Reuben and Simeon.

This is not sentimental language.

It is a legal, covenant act with lasting consequences.

Two grandsons become founders of tribes in their own right.

👨‍👦‍👦 Jacob adopts Joseph's two sons

⚖️ Equal in status to Reuben and Simeon

📜 This is a legal covenant act

📖 Two grandsons become tribes of their own

## 🎁 Called After The Name Of Their Brethren In Their Inheritance

Any sons born to Joseph after this will not get their own tribal share.

They will be counted under Ephraim and Manasseh instead.

The adoption Jacob just made is specific, not open ended.

Only these two grandsons receive this special status.

Jacob draws a clear boundary around an extraordinary gift.

🎁 Future sons get no separate share

📋 They fall under Ephraim and Manasseh

🚧 The adoption applies to two sons only

📖 Jacob draws a clear boundary here

## 💔 The Same Is Bethlehem

In the middle of a legal adoption, Jacob suddenly brings up Rachel.

Rachel died on the road, before they reached their destination.

Ephrath, where Jacob buried her, is identified here as Bethlehem.

Bethlehem later becomes David's hometown and the birthplace of Jesus.

Decades have passed, but Jacob's grief for Joseph's mother has not faded.

A legal moment breaks open into a private, personal memory.

💔 Jacob interrupts himself to mention Rachel

🛣️ She died before reaching their destination

🏘️ Ephrath is identified here as Bethlehem

📖 Old grief still surfaces in a legal moment

# Genesis 48:8-11
# 👀 Jacob's Fading Eyes
---
## ❓ Who Are These?

Jacob does not recognize his own grandsons standing in front of him.

This is not confusion about who they are as people.

Two verses later, the text explains the real reason.

Jacob's eyesight has failed with age.

A question that sounds like forgetting is really about failing eyes.

❓ Jacob fails to recognize his grandsons

👁️ The cause is revealed two verses later

👓 His eyesight has failed with age

📖 A question about sight, not memory

## 👓 The Eyes Of Israel Were Dim For Age

Jacob's blindness in old age is not the first in this family.

His own father Isaac was also nearly blind in Genesis 27.

Jacob once used Isaac's poor eyesight to receive a blessing meant for Esau.

Now Jacob is the one who cannot see clearly during a blessing.

The same weakness that once helped Jacob now limits him.

👓 Jacob's eyesight fails him in old age

🔁 Isaac was also nearly blind in Genesis 27

🎭 Jacob once exploited that same weakness

📖 The same weakness now limits Jacob himself

## 😲 God Hath Shewed Me Also Thy Seed

"Shewed" is an old spelling of "showed."

Jacob never expected to see Joseph alive again.

He certainly never expected to meet Joseph's own children.

Meeting his grandsons feels like an extra blessing stacked on Joseph's survival.

Jacob names this moment for what it is, more than he dared hope for.

😲 Shewed means showed in old English

🙅 Jacob never expected to see Joseph again

👶 Meeting grandsons was an unexpected extra

📖 This moment exceeds anything Jacob had hoped for

# Genesis 48:12-14
# 🤲 The Crossed Hands Blessing
---
## 🙇 Bowed Himself With His Face To The Earth

Joseph is the second most powerful man in all of Egypt.

He still bows completely to the ground before his dying father.

Worldly power carries no weight in this moment.

Joseph submits fully to Jacob's authority as father and patriarch.

The most powerful man in the room chooses to kneel.

🙇 Joseph bows fully to the ground

👑 His power in Egypt means nothing here

🙏 He submits to his father's authority

📖 The powerful man in the room kneels

## ✋ Toward Israel's Right Hand

Joseph positions his sons with care before the blessing begins.

Manasseh, the firstborn, is placed toward Jacob's stronger right hand.

Ephraim, the younger, is placed toward Jacob's weaker left hand.

In this culture, the right hand carried the greater blessing.

Joseph is following ordinary custom, not asking for anything unusual.

✋ Joseph positions his sons deliberately

👑 Manasseh lines up with the stronger hand

🫲 Ephraim lines up with the weaker hand

📖 Joseph expects nothing but ordinary custom

## 🔄 Guiding His Hands Wittingly

"Wittingly" means knowingly and on purpose, not by accident.

Jacob is nearly blind, yet he crosses his arms with full control.

He places his right hand on Ephraim, the younger son.

This is not the mistake it looks like.

A blind man makes one of the most deliberate choices in Genesis.

🔄 Wittingly means done on purpose

🙈 Jacob is nearly blind here

✋ He deliberately crosses his hands

📖 A blind man acts with full intention

# Genesis 48:15-16
# 🙏 Jacob's Blessing
---
## 🚶 My Fathers Abraham And Isaac Did Walk

Jacob roots this blessing in three generations of family faith.

Abraham walked with God.

Isaac walked with God.

Now Jacob describes his own life the same way.

This blessing hands down a relationship with God, not just good wishes.

🚶 Walking with God spans three generations

👴 Abraham and Isaac both walked with God

🙏 Jacob claims that same relationship

📖 The blessing passes down a relationship, not wishes

## 👼 The Angel Which Redeemed Me From All Evil

"Redeemed" means rescued or delivered from danger.

Jacob is describing God's protection across his whole difficult life.

The same word later describes Israel's rescue from slavery in Egypt.

One man's story becomes the pattern for an entire nation's story.

Jacob is not thanking luck.

He is naming exactly who rescued him.

👼 Redeemed means rescued or delivered

🛡️ Jacob describes God's protection over his life

🔮 The same word later describes Israel's rescue

📖 Jacob names exactly who rescued him

## 🌍 Let Them Grow Into A Multitude

Jacob asks that his own name be carried into the future.

He asks the same for the names of Abraham and Isaac.

Ephraim and Manasseh become the ones who carry that legacy forward.

This blessing asks God to keep the whole covenant family's identity alive.

Two grandsons are asked to carry an entire family's story forward.

🌍 Jacob asks for his name to endure

👴 Abraham and Isaac's names ride along

👶 Ephraim and Manasseh carry that legacy

📖 Two grandsons carry a whole family's story

# Genesis 48:17-19
# ⚖️ Joseph's Objection And Jacob's Refusal
---
## 😟 It Displeased Him

Joseph notices his father crossing his hands and assumes a mistake.

He believes Jacob's blindness caused him to reach for the wrong son.

Joseph reaches out to physically move his father's hand.

He expects Jacob simply cannot see what he is doing.

Joseph fixes an error that is not one.

😟 Joseph assumes his father made a mistake

🖐️ He tries to physically correct it

👓 He blames Jacob's failing eyesight

📖 Joseph fixes an error that is not one

## 🚫 For This Is The Firstborn

Joseph corrects his father, respectfully but firmly.

He reminds Jacob which son was born first.

Joseph still believes this is confusion, not a decision.

He does not yet know his father sees everything clearly.

Joseph is arguing against a choice his father already made on purpose.

🚫 Joseph firmly corrects his father

👴 He names Manasseh as the firstborn

🙅 He assumes confusion, not a choice

📖 Joseph argues against a deliberate decision

## 👴 I Know It, My Son, I Know It

Jacob's answer is calm and certain.

He already knows exactly what he is doing.

This confirms the crossed hands in verse fourteen were never a mistake.

It was Jacob's decision from the very start.

A dying man corrects his own son without raising his voice.

👴 Jacob answers with calm certainty

✅ He already knows what he is doing

🔄 The crossed hands were never accidental

📖 He corrects his son without raising his voice

## 📈 His Younger Brother Shall Be Greater Than He

Jacob predicts that Ephraim's line will grow larger than Manasseh's.

This happens despite Manasseh being the firstborn son.

Genesis keeps returning to this same pattern.

The younger repeatedly rises above the older, as with Jacob over Esau.

God's choices in this family rarely follow birth order.

📈 Ephraim's line will surpass Manasseh's

👶 The younger son rises again

🔁 Genesis repeats this pattern often

📖 God's choices rarely follow birth order

# Genesis 48:20-22
# 🌍 The Final Blessing And Parting Words
---
## 🙏 God Make Thee As Ephraim And As Manasseh

Jacob's blessing here becomes something bigger than a private moment.

It turns into a lasting formula for later generations.

Israelite parents will bless their own children using these same names.

Two grandsons become the standard for a good blessing.

A single deathbed blessing outlives the room.

🙏 This blessing becomes a lasting formula

👶 Later parents bless children with these names

📜 Ephraim and Manasseh become the standard

📖 A deathbed blessing outlives the room

## ⬆️ He Set Ephraim Before Manasseh

Jacob makes his choice official and public.

This is not a private opinion whispered between father and son.

Ephraim is formally placed ahead of his older brother.

The reversal Jacob already explained now becomes permanent record.

Jacob makes his decision permanent before he dies.

⬆️ Jacob makes the order official

📢 It is announced publicly, not privately

👶 Ephraim is placed ahead of his brother

📖 Jacob makes this reversal permanent

## ⚰️ Behold, I Die

Jacob names his own death plainly, without flinching.

He does not linger on fear or dread.

His focus shifts immediately to what happens after he is gone.

God's presence will stay with Joseph and the whole family.

Jacob's last words point away from himself and toward God.

⚰️ Jacob names his death plainly

😌 He shows no fear of it

🙏 His focus shifts to God's presence

📖 His last words point toward God

## ⚔️ With My Sword And With My Bow

Jacob gives Joseph one extra portion of land beyond his brothers' shares.

The language here connects to the region near Shechem.

That is the same area from the family's earlier history.

Joseph receives a tangible inheritance on top of the shared blessing.

Even a covenant this large still comes with a personal gift.

⚔️ Joseph receives one extra portion of land

🗺️ The land connects to the region near Shechem

📜 That area appears earlier in Genesis

📖 A shared blessing still includes a personal gift
`.trim();

export const GENESIS_FORTY_EIGHT_PERSONAL_SECTIONS = parseGenesisFortyEightRawNotes(GENESIS_FORTY_EIGHT_RAW_NOTES);
