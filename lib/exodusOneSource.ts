export type ExodusOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusOneRawNotes(rawText: string): ExodusOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 1:${startVerse}` : `Exodus 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 1 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_ONE_RAW_NOTES = `# Exodus 1:1-5

# 📜 Israel's Family Arrives In Egypt

---

## 📜 These Are The Names Of The Children Of Israel

Exodus opens by recapping the family list from the end of Genesis, the twelve sons of Jacob who moved to Egypt. This deliberately connects Exodus directly to Genesis, picking up exactly where that story left off, not starting something unrelated.

📜 Exodus opens as a direct continuation of Genesis, not a new story

---

## 🔢 All The Souls That Came Out Of The Loins Of Jacob Were Seventy Souls

This repeats the exact number from Genesis 46, seventy people total. "Loins" is an old way of referring to physical descendants. Starting with this precise, small number makes what happens in the next few verses even more striking.

🔢 Seventy matches the exact family count already given in Genesis 46

📈 Starting with such a small number sets up the dramatic growth about to be described

# Exodus 1:6-7

# 📈 Israel Multiplies Rapidly

---

## 💔 Joseph Died, And All His Brethren, And All That Generation

An entire generation passes in just one verse. Everyone who personally remembered Joseph, his brothers, and the reasons Egypt originally welcomed this family, is now gone.

💔 The entire generation who personally knew Joseph has died off

⏳ This time gap sets up why the next Pharaoh won't recognize this history

---

## 🌾 Fruitful, And Increased Abundantly, And Multiplied, And Waxed Exceeding Mighty

Waxed is an old word meaning grew or became. This string of four different growth words, piled up one after another, emphasizes just how explosively fast this family's population grew, filling the land of Goshen entirely.

🌾 Waxed means grew or became

📈 Four different growth words stacked together stress just how fast this happened

# Exodus 1:8-10

# 😨 A New King Who Didn't Know Joseph

---

## 👑 There Arose Up A New King Over Egypt, Which Knew Not Joseph

A new ruler comes to power with no personal memory or loyalty to Joseph's legacy. This is likely describing either a genuine lack of knowledge or a deliberate refusal to honor what Joseph did for Egypt generations earlier.

👑 This new king has no personal connection to Joseph's earlier service to Egypt

---

## 😨 The People Of The Children Of Israel Are More And Mightier Than We

The new king voices a real political fear: a foreign population growing large enough to potentially outnumber or overpower native Egyptians. Fear of the Israelites' growth, not any wrongdoing by them, is what triggers everything that follows.

😨 Fear of Israel's population size, not any Israelite wrongdoing, drives this crisis

---

## 🧠 Let Us Deal Wisely With Them ... So Get Them Up Out Of The Land

The king worries Israel might side with an invading enemy and escape Egypt entirely during a war. "Deal wisely" here is a euphemism for calculated oppression, presented as clever strategy rather than open cruelty.

🧠 "Deal wisely" is a euphemism for deliberate, calculated oppression

⚔️ The king's real fear is losing Israel as a labor force, not being invaded

# Exodus 1:11-14

# ⛏️ Slavery Begins

---

## 👷 Taskmasters To Afflict Them With Their Burdens

Taskmasters were slave-drivers specifically appointed to enforce hard labor and suffering. This is the moment forced slavery formally begins for Israel in Egypt, a stark contrast to the honored welcome Joseph's family originally received.

👷 Taskmasters were officials specifically assigned to enforce cruel forced labor

---

## 🏙️ They Built For Pharaoh Treasure Cities, Pithom And Raamses

Treasure cities were fortified storage and supply centers for the Egyptian government. Israel's slave labor directly builds up Pharaoh's own infrastructure and wealth, forced to strengthen the very nation oppressing them.

🏙️ Treasure cities were fortified Egyptian government storage centers

😔 Israel's forced labor directly builds up the power of the nation enslaving them

---

## 📈 The More They Afflicted Them, The More They Multiplied And Grew

Oppression backfires completely. Instead of shrinking Israel's population as intended, the cruelty seems to coincide with even faster growth, deepening Egyptian anxiety rather than relieving it.

📈 Oppression fails to slow Israel's growth, and may even coincide with faster growth

😠 Egyptian fear and frustration only intensify as a result

---

## ⛓️ Bitter With Hard Bondage ... Wherein They Made Them Serve, Was With Rigour

Rigour means harsh, severe cruelty. Mortar and brick describe actual construction labor, backbreaking physical work performed under brutal conditions, not simply difficult or unpleasant tasks.

⛓️ Rigour means harsh, severe cruelty, not simply strict discipline

🧱 Mortar and brick describe real, physically brutal construction labor

# Exodus 1:15-17

# 👶 The Midwives Refuse To Obey

---

## 👩‍⚕️ Shiphrah ... And Puah

These two Hebrew midwives are named individually in Scripture, while the king of Egypt himself is never named in this entire chapter. Scripture deliberately honors these two ordinary women with real names while leaving the powerful king anonymous.

👩‍⚕️ These two women are specifically named, while the powerful king is not

📖 Scripture gives lasting honor to quiet faithfulness over unnamed political power

---

## 🩸 If It Be A Son, Then Ye Shall Kill Him: But If It Be A Daughter, Then She Shall Live

Pharaoh orders a secret, quiet genocide carried out through the midwives themselves, targeting only male infants, likely because sons would grow into potential soldiers or workers who could threaten Egyptian control.

🩸 Pharaoh specifically targets baby boys, likely fearing future soldiers

---

## 🙏 The Midwives Feared God, And Did Not As The King Of Egypt Commanded Them

Fearing God here means holding Him in reverence and awe, prioritizing His authority above even a direct royal command. Shiphrah and Puah practice quiet, dangerous civil disobedience, refusing Pharaoh's order at real personal risk.

🙏 "Fearing God" means holding Him in reverence above even a king's direct order

🛡️ This is real, dangerous civil disobedience, not passive resistance

# Exodus 1:18-21

# ⚖️ Pharaoh Confronts The Midwives

---

## ❓ Why Have Ye Done This Thing, And Have Saved The Men Children Alive?

Pharaoh directly questions the midwives when his order clearly isn't being carried out, confronting them face to face rather than simply replacing them quietly.

❓ Pharaoh personally confronts the midwives about their disobedience

---

## 🗣️ The Hebrew Women Are Not As The Egyptian Women; For They Are Lively

Lively here means vigorous, quick to give birth. The midwives offer Pharaoh a clever, believable excuse rather than admitting outright disobedience, protecting themselves while still refusing to comply with his order.

🗣️ Lively means vigorous or quick, describing fast childbirth

🧠 This is a clever, self-protective excuse, not necessarily a literal ethnic claim

---

## 🏠 God Dealt Well With The Midwives ... He Made Them Houses

"Made them houses" means God gave the midwives their own households and families as a reward, likely meaning children and lasting family lines of their own. Their courage is directly rewarded by God, not just admired from a distance.

🏠 "Made them houses" means God gave them their own families and lasting legacy

🙌 Their brave choice is directly and personally rewarded by God

# Exodus 1:22

# 🌊 Pharaoh's Public Decree

---

## 🌊 Every Son That Is Born Ye Shall Cast Into The River

When the secret plan through the midwives fails, Pharaoh escalates dramatically, issuing an open, public command to his entire nation to drown every Hebrew baby boy in the Nile River.

🌊 Pharaoh moves from a secret plan to an open, nationwide command

📈 The order escalates because the quieter plan through the midwives failed

🔮 This same river will soon carry Israel's coming deliverer to safety instead`;

export const EXODUS_ONE_PERSONAL_SECTIONS = parseExodusOneRawNotes(EXODUS_ONE_RAW_NOTES);
