export type ExodusThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThreeRawNotes(rawText: string): ExodusThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 3:${startVerse}` : `Exodus 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 3 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THREE_RAW_NOTES = `# Exodus 3:1-3

# 🔥 The Burning Bush

---

## 🐑 Jethro His Father In Law ... The Backside Of The Desert

Jethro is the same man called Reuel in chapter 2, likely a personal name alongside a title, since "Jethro" may function more like "excellency" or a priestly title. "Backside of the desert" means the far, remote edge of the wilderness, well away from any settlement.

🐑 Jethro and Reuel refer to the same person, Moses' father-in-law

🏜️ Moses has wandered to a remote, isolated area far from any town

---

## ⛰️ The Mountain Of God, Even To Horeb

Horeb is another name for the same mountain later called Sinai, the exact place Israel will receive the Ten Commandments. Moses arrives here completely by accident, simply following his flock, with no idea of what this location will soon mean.

⛰️ Horeb is another name for Mount Sinai

🔮 Moses unknowingly wanders onto the very mountain where Israel later meets God

---

## 🔥 The Bush Burned With Fire, And The Bush Was Not Consumed

This is a deliberate, impossible sign: real fire that doesn't destroy what it's burning. Fire in Scripture often represents God's holy presence, and here that presence is shown without harming the ordinary bush it rests on.

🔥 A fire that burns without destroying anything is physically impossible

📖 Fire frequently symbolizes God's holy presence throughout Scripture

# Exodus 3:4-6

# 🩴 God Calls Moses By Name

---

## 📢 Moses, Moses. And He Said, Here Am I

God calls Moses' name twice, the same repeated-name pattern used with Jacob back in Genesis 46, marking another deeply personal, significant moment. Moses answers simply and immediately, without hesitation.

📢 A repeated name in Scripture signals an especially personal, important moment

---

## 🩴 Put Off Thy Shoes From Off Thy Feet, For The Place Whereon Thou Standest Is Holy Ground

Removing sandals was a sign of humility and reverence, treating the ground itself as set apart because of God's presence there. Holy simply means set apart, different from ordinary, common space.

🩴 Removing shoes was a physical act of humility and reverence

✨ Holy means set apart, distinct from ordinary, common ground

---

## 😨 Moses Hid His Face; For He Was Afraid To Look Upon God

God identifies Himself using the exact covenant language from Genesis, the God of Abraham, Isaac, and Jacob, directly tying Moses' calling to the promises made generations earlier. Moses instinctively hides his face out of genuine fear and reverence.

😨 Moses' fear reflects genuine reverence for God's holiness, not cowardice

📖 God ties this moment directly to His covenant with Abraham, Isaac, and Jacob

# Exodus 3:7-9

# 👀 God Has Seen Israel's Suffering

---

## 👀 I Have Surely Seen The Affliction ... Heard Their Cry ... I Know Their Sorrows

God describes His awareness of Israel's suffering in three distinct ways: seeing, hearing, and knowing intimately. This directly answers what chapter 2 already described, that Israel's cry had reached God, now confirmed in God's own words.

👀 God describes seeing, hearing, and personally knowing Israel's suffering

📖 This directly confirms and expands what chapter 2 already described

---

## ⬇️ I Am Come Down To Deliver Them

Describing God as "coming down" is anthropomorphic language, human terms used to help people understand God's active, personal involvement, not a literal physical descent, since God is already present everywhere.

⬇️ "Coming down" is human language describing God's active involvement, not literal movement

---

## 🍯 A Land Flowing With Milk And Honey

This famous phrase is an idiom for a land of rich abundance and fertility, not a literal river of dairy and honey. It becomes the defining description of the promised land throughout the rest of the Old Testament.

🍯 "Milk and honey" is an idiom for a land of rich abundance

📖 This becomes the Bible's standard description of the promised land going forward

# Exodus 3:10-12

# 🙋 Moses Is Sent, And Objects

---

## 📤 I Will Send Thee Unto Pharaoh

After describing His awareness and plan, God's next move is surprising: He doesn't act alone, He sends a human representative, Moses, to confront the most powerful ruler in the region on Israel's behalf.

📤 God chooses to work through a human representative rather than acting alone

---

## 🙋 Who Am I, That I Should Go Unto Pharaoh?

Moses immediately objects, questioning his own qualifications. This is the same man who once acted boldly and violently in Egypt, now deeply unsure of himself decades later as a humble shepherd in Midian.

🙋 Moses' confidence has clearly changed since his impulsive younger years

---

## 🤝 Certainly I Will Be With Thee

God's answer to Moses' self-doubt isn't a list of Moses' qualifications, it's a promise of God's own presence. The mission's success was never going to depend on Moses' personal strength or confidence.

🤝 God's presence, not Moses' ability, is what actually guarantees success

# Exodus 3:13-15

# ✨ God Reveals His Name

---

## ❓ What Is His Name? What Shall I Say Unto Them?

Moses anticipates a real, practical question the Israelites will ask, wanting to know specifically which God has sent him, since Egypt itself worshiped many different gods.

❓ Moses expects the Israelites will want a specific, clear name for this God

---

## ✨ I AM THAT I AM

This is one of the most significant statements in the entire Bible. God's answer describes His own self-existence, that He simply is, depending on nothing and no one else for His existence. This name, often written as YHWH or "the LORD" in English Bibles, becomes God's personal, covenant name for Israel from this point forward.

✨ "I AM THAT I AM" describes God's self-existence, dependent on nothing else

📖 This becomes God's personal covenant name, written as YHWH or "the LORD"

---

## 🔁 This Is My Name For Ever, And This Is My Memorial Unto All Generations

God confirms this name is permanent, meant to be remembered and used by every future generation of His people, not a temporary title for this one moment alone.

🔁 This name is meant to last permanently across every future generation

# Exodus 3:16-18

# 🗣️ Instructions For Israel's Elders

---

## 👴 Gather The Elders Of Israel Together

Elders were the respected, recognized leaders within Israel's tribal structure even during their years of slavery. Moses is told to approach Israel's actual leadership first, not simply announce this news to the general public.

👴 Elders were Israel's recognized tribal leaders, even during slavery

---

## 🗺️ Canaanites, And The Hittites, And The Amorites, And The Perizzites, And The Hivites, And The Jebusites

This is a standard list naming the various peoples already living in the promised land. Naming them honestly shows this will be a real conquest into occupied territory, not settling into empty, unclaimed land.

🗺️ This list names the peoples already living in the land Israel is promised

⚔️ The promised land is occupied territory, not empty land waiting for settlers

---

## 🚶 Three Days' Journey Into The Wilderness, That We May Sacrifice

Notice the initial request to Pharaoh is deliberately modest, a short three-day trip to worship, not yet a demand for permanent departure. This is a first, smaller test of Pharaoh's willingness before the fuller confrontation escalates.

🚶 The first request to Pharaoh is intentionally modest, not the full demand

📈 This sets up an escalating confrontation, not one single ultimatum

# Exodus 3:19-22

# ⚔️ Pharaoh Will Resist, And God Will Act

---

## 🚫 I Am Sure That The King Of Egypt Will Not Let You Go

God tells Moses upfront exactly what to expect: Pharaoh will refuse. This isn't a plan that might fail, God is preparing Moses in advance for the resistance and hardship still ahead.

🚫 God prepares Moses in advance for Pharaoh's expected refusal

---

## 🌪️ I Will Stretch Out My Hand, And Smite Egypt With All My Wonders

God previews that dramatic, miraculous acts of judgment will ultimately be necessary to force Pharaoh's hand. This foreshadows the plagues described in detail throughout the chapters ahead.

🌪️ This foreshadows the plagues that unfold in the coming chapters

---

## 🎁 Ye Shall Not Go Empty ... Ye Shall Spoil The Egyptians

Spoil here means to strip of valuables, not to ruin or destroy. God promises Israel will leave Egypt with real wealth, silver, gold, and clothing, given willingly by Egyptians themselves. This also fulfills an old promise God made to Abraham back in Genesis 15, that his descendants would leave their captivity with great possessions.

🎁 Spoil means to take valuables, not to destroy or ruin

📖 This directly fulfills God's earlier promise to Abraham in Genesis 15`;

export const EXODUS_THREE_PERSONAL_SECTIONS = parseExodusThreeRawNotes(EXODUS_THREE_RAW_NOTES);
