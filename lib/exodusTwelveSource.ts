export type ExodusTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwelveRawNotes(rawText: string): ExodusTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 12:${startVerse}` : `Exodus 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Exodus 12 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWELVE_RAW_NOTES = `# Exodus 12:1-6

# 📅 A New Calendar, And Choosing The Lamb

---

## 📅 This Month Shall Be Unto You The Beginning Of Months

God resets Israel's entire calendar, making this month, later called Abib or Nisan, the first month of their new religious year. This moment is so significant it marks time itself starting over for the nation.

📅 God makes this month the official start of Israel's religious calendar

---

## 🐑 A Lamb For An House ... According To The Number Of The Souls

Each household selects one lamb, and if a family is too small to eat a whole lamb, they share with a neighboring household, ensuring the correct portion size for everyone present, souls meaning individual people.

🐑 Families too small for a whole lamb share with neighboring households

---

## ✅ Without Blemish, A Male Of The First Year

The lamb must be flawless and young, without blemish meaning no defects, disease, or injury. Only the best possible animal was acceptable for this sacrifice, nothing damaged or inferior.

✅ Without blemish means completely flawless, with no defects or injury

---

## 📆 Keep It Up Until The Fourteenth Day ... Kill It In The Evening

The lamb is selected on the tenth day but kept and observed for four full days before being killed, ensuring it's genuinely healthy and unblemished, not simply grabbed at the last moment.

📆 Four days of observation ensures the lamb is genuinely healthy, not rushed

# Exodus 12:7-11

# 🩸 Blood On The Doorposts

---

## 🩸 Strike It On The Two Side Posts And On The Upper Door Post

The lamb's blood is applied to the door frame itself, side posts and the upper door post, called the lintel, marking the entire entrance of the house with visible protection.

🩸 The blood marks the entire door frame: both sides and the top

---

## 🍞 Roast With Fire, And Unleavened Bread; And With Bitter Herbs

Unleavened bread is bread made without yeast, quick to prepare since there's no time to wait for dough to rise. Bitter herbs symbolically recall the bitterness of Israel's slavery in Egypt, tasted as part of the meal itself.

🍞 Unleavened bread is made without yeast, quick to prepare with no rising time

😣 Bitter herbs symbolically recall the bitterness of slavery in Egypt

---

## 🔥 Eat Not Of It Raw, Nor Sodden At All With Water, But Roast With Fire

Sodden means boiled. The meat must specifically be roasted, not boiled, likely because roasting keeps the animal fully visible and whole, connecting to the completeness and wholeness required throughout this ritual.

🔥 Sodden means boiled, and only roasting, not boiling, is permitted here

---

## 🥾 Your Loins Girded, Your Shoes On Your Feet ... Eat It In Haste

Girded means tucked up and secured for quick movement. Israel eats this meal fully dressed and ready to travel immediately, not relaxed at a leisurely table, showing they're meant to expect sudden departure that very night.

🥾 Girded means clothing tucked up and secured for immediate travel

⏳ The posture itself signals they should expect to leave suddenly, that same night

# Exodus 12:12-14

# 💀 The Passover Promise

---

## 💀 Against All The Gods Of Egypt I Will Execute Judgment

This final plague is described as a direct confrontation against Egypt's entire pantheon of gods, not merely Pharaoh personally, proving the LORD's supremacy over every deity Egypt worshiped.

💀 This plague directly confronts and judges Egypt's whole system of gods

---

## 🩸 When I See The Blood, I Will Pass Over You

This is where the word "passover" comes from directly, God passing over houses marked with the lamb's blood, sparing them from the judgment striking the rest of Egypt.

🩸 The word "passover" comes directly from God passing over marked houses

---

## 📖 Ye Shall Keep It A Feast ... By An Ordinance For Ever

God establishes Passover as a permanent, ongoing yearly observance, ordinance meaning a binding, official command, not a single one-time event but a lasting tradition for every future generation.

📖 Ordinance means a binding, official command meant to last permanently

# Exodus 12:15-20

# 🍞 The Feast Of Unleavened Bread

---

## 🍞 Seven Days Shall Ye Eat Unleavened Bread ... Put Away Leaven Out Of Your Houses

Leaven is yeast, or any agent causing bread to rise. For seven full days, Israel must remove all leaven completely from their homes, connecting to the hurried, unrisen bread they'll eat while fleeing Egypt.

🍞 Leaven means yeast, or anything causing bread to rise

⏳ This connects to the hurried departure, with no time for bread to rise

---

## 🚫 That Soul Shall Be Cut Off From Israel

This severe penalty means complete separation from the covenant community, showing just how seriously this command was meant to be taken, not treated as optional or symbolic only.

🚫 "Cut off" means complete separation from Israel's covenant community

---

## 🛐 An Holy Convocation ... No Manner Of Work Shall Be Done

A holy convocation is an official, sacred gathering, similar to a modern religious holiday requiring rest from ordinary labor. Only food preparation is permitted as an exception on these specific first and last days.

🛐 A holy convocation is an official, sacred gathering with rest from normal work

# Exodus 12:21-24

# 🌿 Moses Instructs The Elders

---

## 🌿 Take A Bunch Of Hyssop, And Dip It In The Blood

Hyssop was a small, bushy plant commonly used for sprinkling liquids in ancient rituals. It becomes the tool used to physically apply the lamb's blood onto each home's doorframe.

🌿 Hyssop was a small plant commonly used for sprinkling liquid in rituals

---

## 🚪 None Of You Shall Go Out At The Door Of His House Until The Morning

Israel is commanded to stay fully inside, trusting completely in the blood's protection rather than trying to actively defend themselves during the night the plague strikes.

🚪 Staying inside required trusting the blood's protection, not self-defense

---

## 👹 Will Not Suffer The Destroyer To Come In

The destroyer describes the agent of judgment carrying out this final plague. Suffer here means allow or permit, God actively preventing this destroyer from entering blood-marked homes.

👹 The destroyer carries out the judgment; suffer means allow or permit

# Exodus 12:25-28

# 👨‍👧 Teaching The Next Generation

---

## ❓ When Your Children Shall Say Unto You, What Mean Ye By This Service?

God builds a built-in teaching moment directly into this command, anticipating children's natural curiosity and ensuring the story gets explained and passed down accurately every single year.

❓ This command builds in a natural teaching moment for every generation

---

## 🙇 The People Bowed The Head And Worshipped

Before anything has even happened yet, Israel responds to these instructions with genuine worship, trusting God's plan in advance rather than waiting to see the results first.

🙇 Israel worships in trusting advance, before the events even take place

---

## ✅ The Children Of Israel Went Away, And Did As The LORD Had Commanded

Complete, immediate obedience follows without recorded objection or delay, a notable contrast to some of Israel's later, more hesitant responses throughout the wilderness years ahead.

✅ Israel's obedience here is immediate and complete, without recorded hesitation

# Exodus 12:29-30

# 🌙 Midnight Strikes

---

## 🌙 At Midnight The LORD Smote All The Firstborn ... From The Firstborn Of Pharaoh ... Unto The Firstborn Of The Captive That Was In The Dungeon

Exactly as warned back in chapter 11, this plague crosses every social boundary completely, from the ruling throne down to an imprisoned captive, showing total, universal reach.

🌙 The plague crosses every social class, from the throne to the prison

---

## 😭 There Was Not A House Where There Was Not One Dead

The devastation is described as absolutely universal across Egypt, no household escapes this loss, the full weight of the warning finally, completely fulfilled.

😭 This plague reaches literally every single household across Egypt

# Exodus 12:31-36

# 🚪 Pharaoh Finally Releases Israel

---

## 🌙 He Called For Moses And Aaron By Night

Pharaoh summons Moses and Aaron immediately, in the middle of the night, rather than waiting until morning, showing genuine, immediate urgency after this devastating loss.

🌙 Pharaoh's immediate, nighttime summons shows real urgency after his loss

---

## 🙏 Bless Me Also

Remarkably, even Pharaoh, after everything, asks for a blessing from Moses, a striking moment of humility from the same man who once mocked the LORD entirely back in chapter 5.

🙏 Even Pharaoh asks for a blessing, a striking reversal from chapter 5

---

## ⏳ The Egyptians Were Urgent Upon The People ... We Be All Dead Men

Ordinary Egyptians actively push Israel to leave immediately, terrified further delay might bring even more disaster upon them, completely reversing their earlier resistance to Israel's departure.

⏳ Ordinary Egyptians now actively push for Israel's immediate departure

---

## 💍 They Borrowed Of The Egyptians Jewels Of Silver, And Jewels Of Gold ... And They Spoiled The Egyptians

This directly fulfills God's promise from chapters 3 and 11, Israel leaving Egypt with real wealth given willingly by the Egyptians themselves, completing that specific prophecy exactly as spoken.

💍 This exactly fulfills the specific promise made back in chapters 3 and 11

# Exodus 12:37-39

# 🚶 The Journey Begins

---

## 🚶 About Six Hundred Thousand On Foot That Were Men, Beside Children

This staggering number counts only adult men, meaning the total population including women and children was likely well over two million people, an enormous nation moving all at once.

🚶 Counting only men means the true total population was likely over two million

---

## 🌍 A Mixed Multitude Went Up Also With Them

Not every person who left Egypt was ethnically Israelite. Some Egyptians and others joined this exodus too, shown mercy and welcomed into this massive, defining journey toward freedom.

🌍 Some non-Israelites joined the exodus too, welcomed into this journey

---

## 🍞 They Baked Unleavened Cakes ... Because They Were Thrust Out Of Egypt, And Could Not Tarry

Tarry means wait or delay. The bread stayed unleavened simply because there wasn't time to let it rise before their sudden, urgent departure, a real practical detail behind the ongoing yearly tradition.

🍞 Tarry means wait or delay, explaining why there was no time for the bread to rise

# Exodus 12:40-42

# ⏳ Four Hundred And Thirty Years

---

## ⏳ The Sojourning Of The Children Of Israel ... Was Four Hundred And Thirty Years

This gives the exact length of Israel's time connected to Egypt, from Abraham's original promise through generations of eventual slavery, a precise fulfillment of the timeline God gave Abraham back in Genesis 15.

⏳ This exact number fulfills the timeline God gave Abraham back in Genesis 15

---

## 🌙 A Night To Be Much Observed Unto The LORD

This specific night receives its own permanent, sacred significance, distinct from the broader Passover feast itself, meant to be remembered and honored by every future generation of Israel.

🌙 This exact night receives lasting, sacred significance for future generations

# Exodus 12:43-51

# 📜 Who May Keep The Passover

---

## 🚫 There Shall No Stranger Eat Thereof

A stranger here means someone with no covenant commitment to Israel's God, not simply a foreigner by ethnicity alone. Participation is tied to genuine covenant belonging, not nationality by itself.

🚫 This restriction is about covenant commitment, not ethnicity by itself

---

## ✂️ When Thou Hast Circumcised Him, Then Shall He Eat Thereof

A purchased servant could fully participate once circumcised, the covenant sign first given to Abraham, showing genuine inclusion was possible and available for outsiders willing to join the covenant fully.

✂️ Circumcision, the covenant sign from Genesis 17, opened full participation to outsiders

---

## 🦴 Neither Shall Ye Break A Bone Thereof

This specific, detailed instruction is later understood by New Testament writers as a foreshadowing detail connected to Jesus, whose bones also remained unbroken during His crucifixion.

🦴 This detail is later connected by New Testament writers to Jesus at the crucifixion

---

## ⚖️ One Law Shall Be To Him That Is Homeborn, And Unto The Stranger

Once someone joins the covenant fully, through circumcision, they receive exactly the same law and standing as someone born into Israel, no second-class status remains for genuine covenant members.

⚖️ Covenant members receive equal standing, regardless of birth origin

---

## ✅ The LORD Did Bring The Children Of Israel Out Of The Land Of Egypt By Their Armies

The chapter closes by confirming what four hundred years of promise and one devastating night of judgment finally accomplished, Israel's actual, complete departure from Egypt as an organized, whole nation.

✅ This closing line confirms the complete fulfillment of centuries of promise`;

export const EXODUS_TWELVE_PERSONAL_SECTIONS = parseExodusTwelveRawNotes(EXODUS_TWELVE_RAW_NOTES);
