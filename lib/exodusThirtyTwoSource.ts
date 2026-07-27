export type ExodusThirtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirtyTwoRawNotes(rawText: string): ExodusThirtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+32:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 32 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+32:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+32:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 32 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 32,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 32:${startVerse}` : `Exodus 32:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 32 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTY_TWO_RAW_NOTES = `# Exodus 32:1-6

# 🐄 The People Build A Golden Calf

---

## ⏳ The People Gathered Themselves Together Unto Aaron... For As For This Moses, We Wot Not What Is Become Of Him

Moses has been up the mountain forty days (Exodus 24:18), and the people's patience runs out first. **"Wot not"** is an old form of "wit," meaning "know" — so "we wot not" simply means "we do not know."

Notice what they ask for: not a return to Egypt, but new gods to replace the leader they assume is gone. Their fear isn't a loss of faith exactly — it's a demand for something visible and controllable to walk in front of them.

⏳ Forty days of waiting wears out the people's patience completely

❓ "Wot not" is an old word meaning "do not know"

🐄 They ask for gods they can see and control, not a return to slavery

➡️ Aaron's response sets the whole disaster in motion

---

## 💍 Break Off The Golden Earrings, Which Are In The Ears Of Your Wives, Of Your Sons, And Of Your Daughters

Aaron could have refused. Instead he asks for gold — likely much of it the very same plunder God arranged for Israel to carry out of Egypt as they left (Exodus 12:35-36), freely given by the Egyptians themselves. The same gold meant to fund a future tabernacle is redirected toward an idol before that tabernacle is even built.

💍 Aaron complies instead of resisting the crowd's demand

🇪🇬 This gold likely came from the plunder God provided at the Exodus

📖 The very resource meant for God's house is diverted into an idol first

➡️ Aaron does more than just collect the gold

---

## 🔨 He Received Them At Their Hand, And Fashioned It With A Graving Tool, After He Had Made It A Molten Calf

A **"graving tool"** is an engraving or carving instrument, and **"molten"** means melted down and poured into shape. Aaron is named as the one actively crafting this, verse by verse — not a passive bystander swept along by the crowd.

The contrast with the previous chapter is sharp. Chapter 31 just described Bezaleel and Aholiab, filled with the Spirit of God, using their skilled hands to build instruments of true worship. Here Aaron, the nation's own high priest, uses his hands to build the opposite.

🔨 "Graving tool" means an engraving instrument; "molten" means melted and cast

👐 Aaron is described as actively shaping this calf himself

⚖️ This directly mirrors, and inverts, chapter 31's Spirit-gifted craftsmen

➡️ Aaron then does something even stranger

---

## 🎉 Aaron Built An Altar Before It... And Rose Up To Play

Aaron doesn't call this a new god replacing the LORD; he calls it **"a feast to the LORD"** (v5), attempting to blend the golden calf into worship of the true God rather than openly abandoning Him. That blending, not open rebellion, is exactly what makes it so dangerous.

**"Rose up to play"** is a KJV phrase the apostle Paul quotes word for word in 1 Corinthians 10:7 while warning believers against idolatry — it's generally understood to include more than innocent games, pointing toward the loose, unrestrained revelry that followed the feast.

🎉 Aaron frames the calf as worship "to the LORD," not a new god entirely

📖 1 Corinthians 10:7 quotes this exact verse as a warning against idolatry

⚠️ Blending true worship with an idol proved more dangerous than open rejection

➡️ On the mountain, God already knows exactly what's happening below

# Exodus 32:7-10

# 🔥 God Tells Moses What Has Happened

---

## 👇 Thy People... Have Corrupted Themselves... Have Made Them A Molten Calf

God's phrasing is pointed: He calls them **"thy people"** — Moses' people — rather than "my people." It's a subtle but real rhetorical distancing, describing a relationship under real strain because of what's happening at the foot of the mountain.

👇 God calls Israel "thy people," not "my people," in this moment

🐄 The corruption is described as swift, happening in just forty days

➡️ God names exactly what kind of people they've shown themselves to be

---

## 🐂 I Have Seen This People, And, Behold, It Is A Stiffnecked People

**"Stiffnecked"** pictures an ox refusing the yoke, straining stubbornly against direction rather than submitting to it. This becomes a recurring description of Israel through the rest of the wilderness story, repeated again in this very book (Exodus 33:3, 33:5) and later in Deuteronomy 9:6.

🐂 "Stiffnecked" pictures an ox refusing to submit to its yoke

🔁 This same description of Israel repeats later in Exodus and Deuteronomy

➡️ God proposes something drastic

---

## 🔥 Now Therefore Let Me Alone, That My Wrath May Wax Hot Against Them, And That I May Consume Them

**"Wax hot"** is an old idiom meaning to grow intense, the way a fire burns hotter — used here of God's anger. **"Let me alone"** is a strange request from the God who needs no permission; it functions less like a command and more like an opening, almost inviting Moses to respond rather than stay silent.

🔥 "Wax hot" means to grow intense, like a fire building in strength

🚪 "Let me alone" reads less like a command and more like an opening

➡️ God attaches an extraordinary offer to this moment

---

## 🌟 And I Will Make Of Thee A Great Nation

God offers to set Israel aside entirely and start over through Moses alone — effectively making Moses a new Abraham, the founding father of an entirely new nation. It's a genuine test of Moses' character: personal glory and a fresh start, handed to him on a plate.

🌟 God offers to build an entirely new nation through Moses alone

👑 This would have made Moses a second Abraham, a new founding father

📖 What Moses does with this offer becomes the point of the next section

➡️ Moses' answer reveals exactly what kind of leader he is

# Exodus 32:11-14

# 🙏 Moses Intercedes For The People

---

## 🗣️ Moses Besought The LORD His God... Why Doth Thy Wrath Wax Hot Against Thy People

**"Besought"** is the past tense of "beseech" — to plead or beg earnestly, not a calm, formal request. Notice the pronoun reversal: God had just called them "thy people" (Moses' people, v7); Moses immediately hands the phrase right back, calling them "thy people" — God's people once again.

🗣️ "Besought" means pleaded or begged earnestly, not calmly requested

🔄 Moses reverses God's own wording, handing the people back to Him

➡️ Moses builds his case on more than just sympathy

---

## 🌍 Wherefore Should The Egyptians Speak... Turn From Thy Fierce Wrath, And Repent Of This Evil

Moses' first argument isn't about Israel's feelings at all — it's about God's reputation among the watching nations. If Israel is destroyed right after the Exodus, Egypt will read it as a rescue that failed, not a judgment that succeeded.

🌍 Moses appeals to how the watching nations will read God's actions

🎯 The argument protects God's own name, not merely Israel's comfort

➡️ Moses reaches for an even older argument

---

## 📜 Remember Abraham, Isaac, And Israel, Thy Servants, To Whom Thou Swarest By Thine Own Self

**"Swarest"** means swore. Moses reminds God of His own unconditional oath to the patriarchs — a promise sworn "by thine own self" because there was no one greater to swear by (Genesis 22:16-17). Moses isn't inventing a new reason for mercy; he's simply holding God to what God already promised.

📜 "Swarest" means swore, referring back to God's oath in Genesis 22

🤝 Moses grounds his appeal in an existing promise, not a new argument

➡️ God's response to this plea is unexpected

---

## 💭 The LORD Repented Of The Evil Which He Thought To Do Unto His People

This "repenting" describes a real, relational change in God's declared course of action in response to intercession — not a correction of some prior moral error. The same relational language appears later when Nineveh repents in Jonah 3:10 and God relents of the disaster He had planned.

This moment shows prayer functioning as something real, not a formality God has already decided to ignore. Moses' plea genuinely factors into what happens next.

💭 God's "repenting" describes a real change in declared action, not a moral correction

📖 Jonah 3:10 later uses this exact same kind of relational language

🙏 Intercession is shown here as something that genuinely matters, not empty ritual

➡️ Moses now has to walk back down into the mess he interceded for

# Exodus 32:15-20

# 💥 Moses Breaks The Tablets

---

## ✍️ The Tables Were The Work Of God, And The Writing Was The Writing Of God, Graven Upon The Tables

**"Graven"** means engraved or carved. This restates, almost word for word, the closing line of the previous chapter — these tablets were never Moses' own composition, but God's direct handiwork, carried down the mountain by Moses just as everything is about to fall apart.

✍️ "Graven" means engraved or carved directly into the stone

🔗 This directly echoes chapter 31's closing description of the same tablets

➡️ Moses isn't alone on his way down

---

## ⚔️ There Is A Noise Of War In The Camp... The Noise Of Them That Sing Do I Hear

Joshua, who has been waiting partway up the mountain since chapter 24, hears the commotion and assumes it's battle. Moses, closer and more clear-eyed, correctly identifies it as singing and revelry instead — two men interpreting the exact same sound very differently.

⚔️ Joshua has been waiting on the mountain since chapter 24

🎶 Moses correctly identifies the noise as singing, not warfare

➡️ Moses reaches the camp and sees it for himself

---

## 💔 Moses' Anger Waxed Hot, And He Cast The Tables Out Of His Hands, And Brake Them Beneath The Mount

Seeing the calf and the dancing firsthand, Moses' own anger now "waxes hot" — the identical phrase already used for God's anger in verse 10. **"Brake"** is the old past tense of "break." Shattering the tablets is almost a prophetic act: the covenant, physically represented in stone, is broken the moment it's broken in practice by the people below.

💔 Moses' anger uses the same "waxed hot" language already used for God's

🪨 "Brake" is the old past tense of "break"

📖 Shattering the tablets physically enacts the covenant already broken in practice

➡️ Moses turns his fury on the calf itself

---

## 🔥 He Took The Calf... Burnt It In The Fire, And Ground It To Powder, And Strawed It Upon The Water, And Made The Children Of Israel Drink Of It

**"Strawed"** is an old word for strewed, or scattered. The destruction is total and deliberate: melt, grind, scatter, then force the people to physically drink the remains. It functions like an ordeal, similar in spirit to the water-based test prescribed later in Numbers 5 — making the people ingest, quite literally, the evidence of their own sin.

🔥 "Strawed" means strewed or scattered

⚰️ The calf is destroyed completely: melted, ground, scattered, and drunk

📖 This works like an ordeal, similar to the later test in Numbers 5

➡️ Moses turns from the calf to the man who made it

# Exodus 32:21-24

# 🗣️ Moses Confronts Aaron

---

## ❓ What Did This People Unto Thee, That Thou Hast Brought So Great A Sin Upon Them?

Moses' question lands squarely on Aaron, not the crowd. The people sinned, but Moses holds the leader who allowed it — Israel's own high priest — personally accountable for what happened on his watch.

❓ Moses directs the question at Aaron, not the crowd itself

⚖️ Leadership carries its own distinct accountability, separate from the crowd's guilt

➡️ Aaron's answer reaches for an excuse

---

## 🙅 Let Not The Anger Of My Lord Wax Hot: Thou Knowest The People, That They Are Set On Mischief

Aaron's defense repeats the people's own demand from verse 1 almost word for word, quietly shifting responsibility onto the crowd rather than owning his own choice to comply with them. **"Mischief"** here means real harm or wrongdoing, not playful trouble.

🙅 Aaron echoes the people's own words back, shifting the blame onto them

⚠️ "Mischief" means real wrongdoing, not playful trouble

➡️ Aaron's account of what actually happened gets even less honest

---

## 🔥 I Cast It Into The Fire, And There Came Out This Calf

Aaron's story conveniently skips the graving tool and the deliberate shaping already described in plain detail back in verse 4 — as if the calf simply assembled itself out of the flames with no hand guiding it. It's one of Scripture's earliest examples of a leader minimizing his own role in a disaster he caused.

🔥 Aaron's account leaves out the graving tool described back in verse 4

🎭 He describes the calf as if it formed itself, with no one responsible

📖 This is an early biblical example of a leader minimizing his own role

➡️ Moses turns from Aaron to the camp itself

# Exodus 32:25-29

# ⚔️ The Sons Of Levi Answer The Call

---

## 😳 The People Were Naked... For Aaron Had Made Them Naked Unto Their Shame Among Their Enemies

**"Naked"** here carries the sense of unrestrained or out of control, not merely undressed — a people who had lost all discipline under the leadership meant to guard them. The blame is stated plainly: Aaron made them this way.

😳 "Naked" here means unrestrained and out of control, not simply undressed

📉 The text directly names Aaron as responsible for the people's condition

➡️ Moses draws a clear line in the sand

---

## 🚩 Who Is On The LORD's Side? Let Him Come Unto Me. And All The Sons Of Levi Gathered Themselves Together Unto Him

Moses issues a direct, public call to loyalty in the middle of the chaos. Only the sons of Levi respond. This moment of costly loyalty becomes part of why the tribe of Levi is later set apart for priestly service — Deuteronomy 33:8-9's blessing on Levi looks directly back at this very test.

🚩 Moses draws a clear, public line between loyalty and rebellion

🕍 Only the tribe of Levi steps forward to answer the call

📖 Deuteronomy 33:8-9 later ties Levi's priestly role back to this exact moment

➡️ Moses gives the Levites a severe, immediate task

---

## 🗡️ Slay Every Man His Brother, And Every Man His Companion... There Fell Of The People That Day About Three Thousand Men

The judgment is swift and severe, carried out by the Levites themselves even against close family and friends. This detail is often placed alongside Acts 2:41's three thousand added to the church at Pentecost — a contrast frequently drawn between a broken law that condemns and a poured-out Spirit that gives life.

🗡️ The judgment is carried out immediately, even against family members

⚖️ About three thousand men fall as a result

📖 This is often contrasted with the three thousand saved in Acts 2:41

➡️ Moses explains what this costly obedience actually earns them

---

## 🙌 Consecrate Yourselves Today To The LORD... That He May Bestow Upon You A Blessing This Day

**"Consecrate"** means to formally set apart and dedicate for God's service. The Levites' willingness to act at real personal cost, even against their own relatives, becomes their qualification for the priestly consecration they will receive later in Israel's story.

🙌 "Consecrate" means formally set apart and dedicated for God's service

🏆 Costly obedience here becomes the Levites' path to future priestly service

➡️ Moses still isn't finished pleading for the nation

# Exodus 32:30-35

# 🙏 Moses Returns To Intercede Again

---

## 😔 Ye Have Sinned A Great Sin: And Now I Will Go Up Unto The LORD; Peradventure I Shall Make An Atonement For Your Sin

**"Peradventure"** means perhaps. Moses does not assume forgiveness is guaranteed; he goes back up the mountain uncertain of the outcome, willing to plead anyway rather than wait for a sure result before acting.

😔 "Peradventure" means perhaps — Moses has no guarantee of success

🧗 He climbs back up uncertain, willing to plead regardless of the outcome

➡️ Moses makes an extraordinary offer to God directly

---

## 📖 If Thou Wilt Forgive Their Sin--; And If Not, Blot Me, I Pray Thee, Out Of Thy Book Which Thou Hast Written

Moses offers to be erased from God's own book himself rather than see the people destroyed. This is the earliest reference in Scripture to being "blotted out" of God's book, a concept that develops later into the "book of life" language of Psalm 69:28 and Revelation 3:5 and 20:15.

📖 This is Scripture's earliest reference to being blotted out of God's book

🔗 The idea later develops into the "book of life" language of Revelation

🤝 Moses offers himself as a substitute rather than see the people destroyed

➡️ God answers Moses' offer directly

---

## ⚖️ Whosoever Hath Sinned Against Me, Him Will I Blot Out Of My Book... Nevertheless In The Day When I Visit I Will Visit Their Sin Upon Them

God declines Moses' proposed substitution — each person remains accountable for their own sin rather than being covered by another's offer. Yet God still commits to leading the people onward toward the promised land through His Angel, mercy and accountability held together rather than one replacing the other.

⚖️ God does not accept Moses' offer to be blotted out in the people's place

🧭 Each person remains responsible for their own sin

🚶 God still commits to leading the people onward despite this refusal

➡️ The chapter closes with a real, lasting consequence

---

## ⚡ The LORD Plagued The People, Because They Made The Calf, Which Aaron Made

The chapter's last line insists on precision: it was Aaron who made the calf, directly contradicting his evasive account back in verse 24 that it simply "came out" of the fire. Even after Moses' intercession has already spared the nation from total destruction, a real and recorded consequence still falls.

⚡ The closing line names Aaron as the calf's maker, undoing his excuse in verse 24

📊 Mercy from the earlier intercession did not erase every consequence

📖 Sparing a nation from total judgment and a real plague both happen in this story`;

export const EXODUS_THIRTY_TWO_PERSONAL_SECTIONS = parseExodusThirtyTwoRawNotes(EXODUS_THIRTY_TWO_RAW_NOTES);
