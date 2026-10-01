export type JeremiahFortySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFortySevenRawNotes(rawText: string): JeremiahFortySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFortySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+47:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 47 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+47:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+47:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 47 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 47,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 47:${startVerse}` : `Jeremiah 47:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 2) {
    throw new Error("Expected 2 Jeremiah 47 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FORTY_SEVEN_RAW_NOTES = `# Jeremiah 47:1-4
# 🌊 A Flood From The North Against The Philistines
---
## 🏖️ Against The Philistines

The Philistines lived along the coast west of Judah.

They were one of Israel's longest running enemies.

This chapter is the only message in the whole book aimed straight at them.

God speaks to nations far beyond Israel's own borders.

🏖️ The Philistines lived on the coast

⚔️ They were a longtime enemy of Israel

📜 This chapter speaks straight to them

📖 God speaks to nations beyond Israel

---
## 👑 Before That Pharaoh Smote Gaza

This message came before a real battle in history.

An Egyptian Pharaoh attacked the Philistine city of Gaza.

Many scholars believe this was Pharaohnecho, the same king from Jeremiah forty six.

Egypt's power in the region was already fading fast.

👑 Pharaohnecho likely attacked Gaza first

📜 This message follows a real battle

🏺 Egypt's power was already fading

📖 History anchors this prophecy in fact

---
## 🌊 Waters Rise Up Out Of The North

Waters rising out of the north is a picture, not a literal flood.

It stands for an invading army sweeping down from that direction.

Babylon's armies usually traveled south along routes that passed through the north first.

A real flood cannot be reasoned with or stopped halfway.

This invasion would feel just as sudden and just as unstoppable.

🌊 Waters picture an invading army

🧭 Babylon approached from the north

🚫 Floods cannot be stopped halfway

📖 The invasion would feel just as sudden

---
## 🏙️ An Overflowing Flood

This flood does not stay contained.

It spreads over the whole land, not just one city.

Nothing in its path escapes untouched.

The same picture of total disaster appears often in the prophets.

Jeremiah uses it here to describe a judgment nobody can outrun.

🌊 The flood spreads over everything

🏙️ No city escapes its reach

📚 Prophets often use this same image

📖 Nobody can outrun this judgment

---
## 😭 All The Inhabitants Of The Land Shall Howl

To howl means to cry out loudly in pain or terror.

This is not quiet weeping.

It is a whole population crying out at once.

The sound itself tells the reader how bad the coming disaster will be.

😭 Howl means crying out in terror

🔇 This is not quiet weeping

👥 A whole population cries out together

📖 The sound reveals the disaster's size

---
## 🐎 The Stamping Of The Hoofs Of His Strong Horses

An army could be heard long before it was seen.

Horses hoofs pounding the ground made a noise like thunder.

Chariot wheels added a constant rumble underneath that sound.

The whole earth seemed to shake as the army drew closer.

🐎 Horses hoofs pounded like thunder

🛞 Chariot wheels rumbled underneath

🌍 The ground itself seemed to shake

📖 Fear arrived before the army did

---
## 💔 The Fathers Shall Not Look Back To Their Children

This does not mean the fathers stopped loving their children.

Feebleness of hands means their hands went weak with terror.

Fear can be so strong that a person cannot even reach back to help someone they love.

This single image captures total panic better than a paragraph could.

💔 Fathers still loved their children

🤲 Feebleness of hands means weak with fear

🥶 Panic can freeze a person's body

📖 One image captures total terror

---
## 🤝 To Cut Off From Tyrus And Zidon Every Helper

Tyrus and Zidon were two major Phoenician port cities to the north.

They were not Philistine cities, but they were trading partners and allies.

Cutting off their help meant the Philistines would face this invasion alone.

An ally can only help as long as that ally still stands.

🏙️ Tyrus and Zidon were Phoenician cities

🤝 They were allies, not Philistines

🚫 Their help was about to end

📖 Allies cannot help once they fall

---
## 🏝️ The Remnant Of The Country Of Caphtor

Caphtor is the ancient name for the island most scholars now call Crete.

The Philistines did not originate in Canaan.

Their ancestors crossed the sea from Caphtor generations earlier.

Naming their true origin here makes the judgment feel personal and complete.

🏝️ Caphtor is the ancient name for Crete

🌊 The Philistines crossed the sea from there

🧬 Canaan was never their original home

📖 Their whole history now faces judgment

# Jeremiah 47:5-7
# ⚔️ Gaza Mourns As The Sword Obeys The LORD
---
## 💇 Baldness Is Come Upon Gaza

Shaving the head bald was a common mourning custom in the ancient world.

People did this to show grief so deep that normal life stopped.

Gaza is pictured here as a mourner, not as a city at war.

The disaster has already moved from battle into grief.

💇 Baldness showed deep public grief

😢 Gaza mourns like a grieving person

⚔️ This grief follows real military defeat

📖 The battle has turned into mourning

---
## 🏙️ Ashkelon Is Cut Off With The Remnant Of Their Valley

Ashkelon was another of the five major Philistine cities.

Cut off here means the city's strength has been completely broken.

The valley around Ashkelon supported its farms and its food supply.

Losing that valley meant losing the ability to recover quickly.

🏙️ Ashkelon was a major Philistine city

✂️ Cut off means completely broken

🌾 The valley fed the whole city

📖 Recovery becomes nearly impossible after this

---
## 🩸 How Long Wilt Thou Cut Thyself

Cutting the skin was another pagan mourning practice in this culture.

Worshipers of other gods cut themselves to call out in grief.

God's law in Leviticus forbade Israel from ever doing this.

Here grief runs so deep that even a forbidden practice could not express enough pain.

🩸 Cutting the skin was a pagan ritual

🙏 Worshipers used it to call on gods

🚫 God forbade Israel from this practice

📖 Grief here outran even forbidden rituals

---
## ⚔️ O Thou Sword Of The LORD

The sword here is not a literal weapon.

It stands for the invading army carrying out God's judgment.

Speaking to a sword as if it could choose to stop makes the coming disaster feel alive.

Even the weapon of judgment seems to long for rest.

⚔️ The sword pictures an invading army

🗣️ Jeremiah speaks to it directly

😮 This makes the judgment feel alive

📖 Even judgment seems to long for rest

---
## 🗡️ Put Up Thyself Into Thy Scabbard

A scabbard is the sheath a sword rests in when it is not being used.

Asking the sword to return to its scabbard is asking the violence to finally stop.

The plea sounds almost like someone begging a war to end.

Yet the very next verse answers that plea with a hard no.

🗡️ A scabbard holds a resting sword

🙏 The plea asks the violence to stop

⏳ It sounds like begging a war to end

📖 The next verse answers with a hard no

---
## 📜 Seeing The LORD Hath Given It A Charge

The sword cannot rest because it was never really acting on its own.

The LORD himself gave it a specific assignment to carry out.

A weapon under orders does not get to choose when it stops.

This judgment was planned, not random violence.

📜 God gave the sword its orders

🚫 The sword cannot choose to stop

🎯 This judgment was planned, not random

📖 God controls even the weapons of war

---
## 🌊 Against Ashkelon, And Against The Sea Shore

Ashkelon sat right on the Mediterranean coast.

The sea shore here means the whole strip of Philistine territory along the water.

The chapter opened on one city and ends across the whole coast.

The judgment grows from a single place to an entire region.

🌊 Ashkelon sat on the Mediterranean coast

🗺️ Sea shore means the whole coastline

📈 Judgment grows from one city outward

📖 The whole Philistine coast now faces it
`.trim();

export const JEREMIAH_FORTY_SEVEN_PERSONAL_SECTIONS = parseJeremiahFortySevenRawNotes(JEREMIAH_FORTY_SEVEN_RAW_NOTES);
