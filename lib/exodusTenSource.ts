export type ExodusTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTenRawNotes(rawText: string): ExodusTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 10:${startVerse}` : `Exodus 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 10 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TEN_RAW_NOTES = `# Exodus 10:1-3

# 📖 A Story For Future Generations

---

## 📖 That Thou Mayest Tell In The Ears Of Thy Son, And Of Thy Son's Son

God explains a deeper purpose behind these plagues, they're meant to become a lasting story passed down through generations, teaching Israel's descendants who God is long after these events end.

📖 The plagues are meant to become a story taught to future generations

---

## 🙇 How Long Wilt Thou Refuse To Humble Thyself Before Me?

Moses and Aaron directly confront Pharaoh's ongoing pride, asking how much longer he intends to keep resisting rather than genuinely humbling himself before God's authority.

🙇 The confrontation directly names Pharaoh's pride as the real issue

# Exodus 10:4-6

# 🦗 Locusts Are Threatened

---

## 🦗 They Shall Cover The Face Of The Earth, That One Cannot Be Able To See The Earth

The locust swarm is described as so massive it will completely blanket the visible ground, an image of overwhelming, suffocating scale.

🦗 The swarm is described as literally covering and hiding the ground itself

---

## 🌾 They Shall Eat The Residue ... Which Remaineth Unto You From The Hail

Residue means whatever remains or is left over. This plague specifically targets whatever crops survived the previous hailstorm, ensuring total agricultural devastation across two consecutive plagues.

🌾 Residue means whatever is left over, here referring to crops the hail spared

📉 This plague completes the destruction the hail plague only started

---

## 🏠 Which Neither Thy Fathers, Nor Thy Fathers' Fathers Have Seen

The severity is framed as unprecedented across multiple generations of Egyptian history, not simply a bad harvest season but a uniquely catastrophic event.

🏠 This plague is framed as unmatched across multiple generations of Egyptian history

# Exodus 10:7-11

# 😤 Pharaoh's Own Servants Push Back

---

## 😤 How Long Shall This Man Be A Snare Unto Us?

For the first time, Pharaoh's own officials openly pressure him to relent, snare meaning a trap causing ongoing harm. Even Pharaoh's inner circle now sees continued resistance as actively damaging Egypt itself.

😤 Snare means a trap, and even Pharaoh's own officials now favor releasing Israel

⚖️ Pressure is now coming from inside Pharaoh's own government, not just Moses

---

## ❓ Who Are They That Shall Go?

Pharaoh appears to offer release, but immediately tries to negotiate exactly who leaves, revealing this still isn't full, genuine surrender to God's actual command.

❓ Pharaoh's apparent offer comes with an immediate, self-serving condition attached

---

## 🚫 Go Now Ye That Are Men ... And They Were Driven Out From Pharaoh's Presence

Pharaoh tries to limit the trip to only adult men, keeping women, children, and livestock behind as leverage, essentially hostages ensuring Israel's return. Moses and Aaron are forcibly thrown out when they refuse this partial deal.

🚫 Pharaoh tries to keep families and livestock behind as leverage to force their return

# Exodus 10:12-15

# 🦗 The Locusts Strike

---

## 🌬️ The LORD Brought An East Wind Upon The Land ... The East Wind Brought The Locusts

God uses a natural mechanism, wind, to bring about this supernatural plague, showing His power working through and over creation itself, not bypassing it entirely.

🌬️ God works through natural means like wind, not only through pure miracle

---

## 🌑 They Covered The Face Of The Whole Earth, So That The Land Was Darkened

The locust swarm is so dense it blocks out visible light entirely, actually darkening the land, foreshadowing the literal plague of darkness still to come just verses later.

🌑 The locust cloud darkening the land foreshadows the darkness plague right after

---

## 🌳 There Remained Not Any Green Thing In The Trees, Or In The Herbs Of The Field

The devastation is total and complete, nothing green survives anywhere across the land, a full agricultural collapse for Egypt.

🌳 The destruction described here is total, leaving nothing green anywhere in Egypt

# Exodus 10:16-20

# 😰 Pharaoh Panics, Then Hardens Again

---

## 😰 Then Pharaoh Called For Moses And Aaron In Haste

Haste shows genuine panic and urgency this time, unlike his more composed responses to earlier plagues, revealing just how severely this plague has shaken him.

😰 Pharaoh's haste shows real panic, more urgent than his earlier responses

---

## 🙏 Forgive, I Pray Thee, My Sin Only This Once

Pharaoh's confession sounds sincere and specific, yet the pattern established across the previous plagues makes his lasting sincerity deeply questionable.

🙏 Pharaoh's words sound sincere, though the established pattern casts real doubt

---

## 🌊 There Remained Not One Locust In All The Coasts Of Egypt

The removal is total and complete, every single locust gone, driven into the Red Sea by a reversed wind, yet even this total relief still doesn't produce lasting change in Pharaoh's heart.

🌊 The relief is total and complete, yet still produces no lasting change in Pharaoh

# Exodus 10:21-23

# 🌑 The Plague Of Darkness

---

## 🌑 Darkness Over The Land Of Egypt, Even Darkness Which May Be Felt

This darkness is described as so thick and physical it can almost be touched, not simply the absence of light but an oppressive, tangible presence.

🌑 This darkness is described as physically thick, not just an absence of light

---

## 🛐 A Thick Darkness In All The Land Of Egypt Three Days

The Egyptian sun god Ra was one of Egypt's most important deities. Three full days of total darkness directly confronts and humiliates this central Egyptian religious belief.

🛐 This plague directly confronts Ra, one of Egypt's most important sun deities

---

## 💡 All The Children Of Israel Had Light In Their Dwellings

Once again, God draws an unmistakable, visible line of protection specifically around His own people, even in something as total as darkness itself.

💡 God's protection extends even into something as total and complete as darkness

# Exodus 10:24-27

# 🐑 Another Partial Compromise Rejected

---

## 🐑 Only Let Your Flocks And Your Herds Be Stayed

Pharaoh offers yet another partial deal, allowing people to leave but demanding the livestock stay behind as insurance for their return, still refusing complete, unconditional release.

🐑 Pharaoh again tries to hold something back as leverage, not fully releasing them

---

## 🐾 There Shall Not An Hoof Be Left Behind

Moses firmly refuses any partial compromise, insisting every single animal must go too, since they don't yet know exactly what God will require for the sacrifice once they arrive.

🐾 Moses insists on full compliance, refusing to leave anything behind as collateral

# Exodus 10:28-29

# 💔 The Final Break

---

## ⚠️ See My Face No More; For In That Day Thou Seest My Face Thou Shalt Die

Pharaoh issues his most severe threat yet, banning Moses from ever returning to his presence under penalty of death, marking a complete, final breakdown in any further negotiation between them.

⚠️ Pharaoh's threat marks a complete, final breakdown in negotiations between them

---

## ✅ Thou Hast Spoken Well, I Will See Thy Face Again No More

Moses agrees calmly and directly, showing no fear despite the death threat, setting up the final, most severe plague still to come, delivered without any further face-to-face meeting required.

✅ Moses responds with calm confidence rather than fear at Pharaoh's threat

➡️ This sets up the final, most severe plague still to come next`;

export const EXODUS_TEN_PERSONAL_SECTIONS = parseExodusTenRawNotes(EXODUS_TEN_RAW_NOTES);
