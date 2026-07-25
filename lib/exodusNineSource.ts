export type ExodusNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusNineRawNotes(rawText: string): ExodusNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 9:${startVerse}` : `Exodus 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 9 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_NINE_RAW_NOTES = `# Exodus 9:1-7

# 🐄 The Plague On Livestock

---

## 🐄 The Hand Of The LORD Is Upon Thy Cattle ... A Very Grievous Murrain

Murrain means a deadly disease affecting livestock. This fifth plague targets Egypt's horses, donkeys, camels, oxen, and sheep specifically, animals essential to transportation, farming, and Egypt's entire economy.

🐄 Murrain means a deadly livestock disease

💰 This plague strikes the animals essential to Egypt's transportation and economy

---

## ⚖️ The LORD Shall Sever Between The Cattle Of Israel And The Cattle Of Egypt

Once again, God draws a clear, deliberate line protecting Israel's livestock completely while Egypt's animals suffer, continuing the pattern of visible distinction first introduced with the flies in chapter 8.

⚖️ This continues the pattern of visible distinction started with the flies

---

## 📅 The LORD Appointed A Set Time ... And The LORD Did That Thing On The Morrow

God specifies the exact timing in advance, then follows through precisely as stated, removing any possibility of dismissing the event as coincidence or natural disease timing.

📅 The precise, predicted timing removes any excuse of mere coincidence

---

## 🔍 Pharaoh Sent, And, Behold, There Was Not One Of The Cattle Of The Israelites Dead

Pharaoh personally investigates and confirms the truth himself, verifying Israel's animals are completely unharmed. Even this direct, firsthand confirmation still fails to change his response.

🔍 Pharaoh personally verifies the miracle himself, yet still refuses to respond

# Exodus 9:8-12

# 🔥 The Plague Of Boils

---

## 🔥 Handfuls Of Ashes Of The Furnace ... Sprinkle It Toward The Heaven

This plague begins with an unusual, symbolic action, ashes from a furnace thrown into the air. Furnaces were connected to Egyptian brick-making, the very forced labor Israel was subjected to, adding painful irony to this particular sign.

🔥 Furnace ashes connect symbolically to the forced brick-making labor imposed on Israel

---

## 🩹 A Boil Breaking Forth With Blains Upon Man, And Upon Beast

Blains means painful, inflamed sores or blisters. Unlike earlier plagues affecting property or animals, this plague directly and painfully afflicts human bodies themselves, Egyptians and their remaining livestock alike.

🩹 Blains means painful, inflamed sores or blisters

😖 This is the first plague to directly and painfully afflict human bodies

---

## 🚫 The Magicians Could Not Stand Before Moses Because Of The Boils

Egypt's magicians, who once matched or explained away earlier signs, are now physically incapacitated by this very plague themselves, utterly unable to even appear before Moses, let alone compete with him.

🚫 The magicians are physically disabled by the plague, unable to even appear

# Exodus 9:13-17

# 📢 God Explains His Larger Purpose

---

## 💯 I Will At This Time Send All My Plagues Upon Thine Heart

God signals a shift, this next plague and those following will target Pharaoh with unprecedented intensity, described as reaching his very heart, the seat of his stubborn resistance itself.

💯 This plague is aimed directly at breaking Pharaoh's stubborn resistance

---

## 🌍 That My Name May Be Declared Throughout All The Earth

God states His purpose reaches far beyond Egypt alone, that His reputation and power become known worldwide through this confrontation, not just within Egypt's own borders.

🌍 God's stated purpose extends to the whole world, not Egypt alone

---

## ❓ As Yet Exaltest Thou Thyself Against My People?

God directly confronts Pharaoh's pride, exaltest meaning to lift oneself up in arrogance. Despite everything witnessed so far, Pharaoh continues placing himself above God's clear command.

❓ Exaltest means to arrogantly lift oneself up, describing Pharaoh's ongoing pride

# Exodus 9:18-21

# 🧊 Hail Is Announced

---

## 🧊 A Very Grievous Hail, Such As Hath Not Been In Egypt Since The Foundation Thereof

God promises hail more severe than anything in Egypt's entire recorded history, an unprecedented natural disaster about to strike.

🧊 This hail is promised to be worse than any in Egypt's entire history

---

## 🏠 He That Feared The Word Of The LORD ... Made His Servants And His Cattle Flee Into The Houses

For the first time, the text explicitly notes that some individual Egyptians, not just Israel, respond with genuine faith and take God's warning seriously, saving their own people and animals by acting on it.

🏠 Some Egyptians personally respond with real faith, not just Israel

⚖️ This shows God's warnings offered protection to anyone who genuinely believed

---

## 🌾 He That Regarded Not The Word Of The LORD Left His Servants And His Cattle In The Field

Others simply ignore the warning entirely, leaving their people and animals exposed to what's coming. The outcome for each Egyptian household now depends on their own individual response to the warning, not nationality alone.

🌾 Individual response to the warning, not nationality, determines each outcome here

# Exodus 9:22-26

# ⚡ The Hail Strikes

---

## ⚡ The LORD Sent Thunder And Hail, And The Fire Ran Along Upon The Ground

This plague combines multiple violent elements together, thunder, hail, and fire moving along the ground simultaneously, an overwhelming, multi-sensory disaster unlike anything experienced before.

⚡ This plague combines thunder, hail, and fire together at once

---

## 🌳 The Hail Smote Every Herb Of The Field, And Brake Every Tree Of The Field

The devastation extends beyond immediate danger to people and animals, destroying crops and trees themselves, striking directly at Egypt's food supply and agricultural future.

🌳 The hail devastates Egypt's crops and trees, striking its food supply directly

---

## 🗺️ Only In The Land Of Goshen ... Was There No Hail

Once again, Goshen remains completely untouched, continuing the unmistakable, now well-established pattern distinguishing God's people from Egypt throughout these plagues.

🗺️ Goshen's protection continues the clear pattern seen since the plague of flies

# Exodus 9:27-30

# 😔 Pharaoh Confesses, But Doubt Remains

---

## 😔 I Have Sinned This Time: The LORD Is Righteous, And I And My People Are Wicked

This is Pharaoh's most direct, explicit confession yet, openly admitting wrongdoing and acknowledging God's righteousness in plain language, further than any previous response.

😔 This is Pharaoh's clearest, most direct confession of guilt so far

---

## 🙏 I Will Let You Go, And Ye Shall Stay No Longer

Pharaoh offers his strongest promise yet, full release with no further delay, going beyond his previous partial offers and compromises.

🙏 This promise goes further than any previous offer Pharaoh has made

---

## 🤔 I Know That Ye Will Not Yet Fear The LORD God

Despite Pharaoh's words, Moses sees through the pattern immediately, correctly predicting this confession still isn't genuine, lasting change. Actions, not words alone, will prove whether Pharaoh's heart has truly shifted.

🤔 Moses doesn't trust the words alone, based on the pattern already seen

# Exodus 9:31-35

# 🌾 Crops Destroyed, Pharaoh Hardens Again

---

## 🌾 The Flax And The Barley Was Smitten ... But The Wheat And The Rie Were Not Smitten

This detail reveals precise agricultural timing, barley and flax were further along in growth and more exposed, while wheat and rye hadn't yet grown tall enough to be as severely damaged. This realistic detail grounds the plague in an actual growing season.

🌾 This detail reflects real, precise agricultural timing within an actual growing season

---

## 🤲 Moses Went Out ... And Spread Abroad His Hands Unto The LORD

Moses keeps his word exactly as promised, praying immediately once outside the city, and the storm stops precisely as he said it would.

🤲 Moses follows through exactly as promised, and the result matches his word precisely

---

## 🪨 When Pharaoh Saw That The Rain And The Hail ... Were Ceased, He Sinned Yet More, And Hardened His Heart

The instant relief arrives, Pharaoh reverses course yet again, confirming Moses' prediction exactly. This repeating cycle of temporary confession followed by hardened refusal continues its established pattern once more.

🪨 Pharaoh's reversal confirms Moses' prediction exactly, continuing the established pattern`;

export const EXODUS_NINE_PERSONAL_SECTIONS = parseExodusNineRawNotes(EXODUS_NINE_RAW_NOTES);
