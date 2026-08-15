export type FirstChroniclesTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesTwentyRawNotes(rawText: string): FirstChroniclesTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 20:${startVerse}` : `1 Chronicles 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 1 Chronicles 20 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_TWENTY_RAW_NOTES = `# FirstChronicles 20:1
# ⚔️ Joab Besieges Rabbah While David Stays Home
---
## 🗓️ After The Year Was Expired

Ancient armies did not fight all year round.

Winter rains turned roads to mud and made travel difficult.

Kings waited for the dry season each spring before marching out.

"The year was expired" marks that seasonal turning point.

🗓️ The year was expired means spring arrived
🌧️ Winter rains made travel hard
⚔️ Armies waited for the dry season
📖 Spring opened the yearly campaign window

---

## 📜 At The Time That Kings Go Out To Battle

This exact phrase opens the story in 2 Samuel 11.

There, David stayed home during this season and saw Bathsheba from his roof.

That whole affair, the adultery and the killing of Uriah, never appears in Chronicles.

Chronicles was written to focus on David's role in building the kingdom and the temple.

It quietly skips his worst failure and moves straight to the war itself.

📜 The same phrase opens 2 Samuel 11
👁️ There David saw Bathsheba from his roof
🚫 Chronicles never mentions that whole affair
📖 The record focuses on David's kingdom work

---

## 🏰 Besieged Rabbah

"Besieged" means an army surrounded a city and cut off its supplies.

Before reaching Rabbah, Joab first destroyed the surrounding Ammonite countryside.

Rabbah was Ammon's capital city, standing where modern Amman, Jordan stands today.

A city under siege slowly starved instead of falling to a single battle.

🏰 Besieged means surrounded and cut off
🌾 Joab wasted the countryside first
📍 Rabbah later became modern Amman
📖 Starvation could defeat a city alone

---

## ⏳ But David Tarried At Jerusalem

"Tarried" is an old word meaning stayed behind or remained in place.

Israelite kings were expected to lead their armies personally into battle.

David breaks that pattern here without any stated reason.

The fuller reason, and the price of that choice, only appears in 2 Samuel 11.

Chronicles simply states the fact and moves on.

⏳ Tarried means stayed behind
👑 Kings usually led armies personally
❓ No reason is given here
📖 2 Samuel 11 tells the rest

---

## ⚔️ Joab Smote Rabbah, And Destroyed It

"Smote" is an old word for struck down or defeated.

The siege that opened this verse finally ends in total victory.

Rabbah, the capital of an entire nation, falls to Joab's army.

The chapter now turns from the siege itself to what David does with the spoil.

⚔️ Smote means struck down
🏙️ Rabbah's siege ends in victory
👑 A capital city falls completely
➡️ The next verses cover the spoil

# FirstChronicles 20:2-3
# 👑 David Takes The Crown, And Deals With The Captives
---
## 👑 The Crown Of Their King

This may not describe an ordinary human king's crown.

The Hebrew word translated "their king" can also be read as Milcom, the Ammonite god.

Many scholars believe this crown sat on an idol rather than a person.

A talent of gold was far too heavy for a person to wear all day.

👑 Their king may mean Milcom
🗿 Milcom was the Ammonite god
⚖️ The crown was extremely heavy
📖 It likely crowned an idol, not a man

---

## ⚖️ Found It To Weigh A Talent Of Gold

A talent was a unit of weight, not a coin or a piece of money.

One talent of gold weighed close to seventy five pounds.

That is far heavier than any crown a person could comfortably wear.

The sheer weight is part of why many think this crown belonged to an idol.

⚖️ A talent was a weight, not a coin
💰 One talent equaled about seventy five pounds
🙅 No person could wear that all day
📖 The weight points toward an idol's crown

---

## 🪑 It Was Set Upon David's Head

Wearing the defeated king's crown was a public claim of victory.

David was not just defeating Ammon.

He was stepping into their own throne.

This kind of symbolic act told the whole region that the conquest was final.

👑 Wearing the crown claimed total victory
⚔️ David did more than defeat Ammon
🪑 He claimed their throne symbolically
📖 The act declared the conquest final

---

## 🔨 Cut Them With Saws, And With Harrows Of Iron, And With Axes

This line sounds like a description of execution to modern ears.

The same wording appears in the parallel account in 2 Samuel 12:31.

Many scholars believe it actually describes forced labor.

Captives were assigned to work with saws, iron tools, and axes.

The text does not settle the question either way.

😨 The wording sounds like execution
📜 The same account appears in 2 Samuel
🔨 It may describe forced labor instead
📖 The text leaves the question open

---

## 🏙️ Even So Dealt David With All The Cities

This one sentence widens the scope of everything just described.

What happened at Rabbah was not an isolated event.

Every conquered Ammonite city received the same treatment.

The chapter is summarizing an entire campaign in a single line.

🏙️ This widens the scope past Rabbah
🔁 Every city received the same treatment
📊 One sentence summarizes an entire campaign
➡️ The war against Ammon is finished

---

## 🏠 David And All The People Returned To Jerusalem

The Ammonite campaign that began back in chapter nineteen finally closes here.

"All the people" likely refers to the army, not the whole nation.

Jerusalem was David's capital and the resting place of the ark.

Returning home marks the natural end of a long war narrative.

🏁 The Ammonite war finally ends here
⚔️ All the people likely means the army
🏠 Jerusalem was David's capital city
➡️ The story shifts to new battles next

# FirstChronicles 20:4-5
# 🗡️ Israel Battles The Giants Of Gath
---
## 📍 War At Gezer With The Philistines

Gezer was an important city on Israel's western border with Philistia.

Fighting broke out there after the Ammonite war had already ended.

Philistines and Israelites had been rivals for generations by this point.

This verse opens a short list of three separate giant killing stories.

📍 Gezer sat on Israel's western border
⚔️ Philistines and Israelites were longtime rivals
📜 Three giant stories follow this verse
📖 War resumed once Ammon was defeated

---

## 👪 Sippai, That Was Of The Children Of The Giant

"The giant" refers to a specific family line remembered for unusual size.

Scripture calls this family the Rephaim in several other passages.

Gath, the Philistine city linked to Goliath, was their main stronghold.

Sibbechai the Hushathite, one of David's mighty men from chapter eleven, is the one who kills Sippai.

👪 The giant names a specific family line
📜 Scripture calls them the Rephaim
🏙️ Gath was their main stronghold
📖 Sibbechai, a mighty man, kills Sippai

---

## 🏳️ They Were Subdued

"Subdued" means brought under control or forced to submit.

This short line closes the Gezer battle in a single word.

The giant warrior's death breaks the Philistine resistance there.

Chronicles often ends a battle report quickly before moving to the next one.

🏳️ Subdued means brought under control
💀 One warrior's death breaks resistance
⏩ The report moves on quickly
➡️ A second battle follows right after

---

## ❓ Elhanan The Son Of Jair Slew Lahmi The Brother Of Goliath

A similar verse in 2 Samuel 21:19 seems to say Elhanan killed Goliath himself.

That would contradict the famous story of David and Goliath in 1 Samuel 17.

This verse in Chronicles clarifies that Elhanan actually killed Lahmi, Goliath's brother.

Most scholars believe a small copying difference crept into the Samuel text over time.

David's own victory over Goliath still stands as told in 1 Samuel 17.

❓ 2 Samuel 21 seems to contradict this
👪 Lahmi was Goliath's own brother
📜 A copying difference likely explains it
📖 David's Goliath story still stands

---

## 🧵 Whose Spear Staff Was Like A Weaver's Beam

A weaver's beam was the thick wooden bar that held threads taut on a loom.

Describing a spear staff this way means it was unusually large and heavy.

The exact same comparison is used for Goliath's own spear in 1 Samuel 17:7.

This family of giants clearly shared the same oversized weapons.

🧵 A weaver's beam was a thick loom bar
⚔️ Lahmi's spear staff matched that size
🔁 The same comparison describes Goliath's spear
📖 This giant family shared oversized weapons

# FirstChronicles 20:6-8
# 🎯 Jonathan Kills The Last Giant Of Gath
---
## 📏 A Man Of Great Stature

"Stature" simply means a person's height.

This is now the third unusually tall Philistine warrior named in this chapter.

Gath appears to have been home to an entire family of oversized fighters.

The pattern points to a specific bloodline.

Goliath was not the only large warrior from that family.

📏 Stature simply means height
🔢 This is the third giant named here
🏙️ Gath held a family of tall warriors
📖 Goliath belonged to that same bloodline

---

## ✋ Six On Each Hand, And Six On Each Foot

"Four and twenty" is the King James way of writing twenty four.

This warrior had six fingers on each hand and six toes on each foot.

The text records this detail as plain fact.

Some readers see a real physical condition running in the family.

Others read it as a way of marking him as especially fearsome.

The text does not say which is meant.

🔢 Four and twenty means twenty four
✋ Six fingers marked each hand
🦶 Six toes marked each foot
📖 The text does not explain why

---

## 👪 He Also Was The Son Of The Giant

This closes the family connection explained earlier in the chapter.

Sippai, Lahmi, and this warrior all descend from the same giant line.

Three separate battles in one chapter share a single family behind them.

The repetition shows how large and persistent this bloodline really was.

👪 He shares the same giant bloodline
🔗 Sippai and Lahmi trace to it too
🔁 Three battles share one family line
📖 The bloodline was large and persistent

---

## 👪 Jonathan The Son Of Shimea David's Brother

Shimea was one of Jesse's sons, named among David's own brothers.

That makes this Jonathan a nephew of David, not his own son.

This Jonathan is also a different person from Jonathan the son of Saul.

Family names repeat often in the Old Testament and can easily cause confusion.

👪 Shimea was one of David's brothers
🧑 This Jonathan is David's nephew
🙅 He differs from Saul's son Jonathan
📖 Old Testament names often repeat

---

## 📢 When He Defied Israel

"Defied" means to openly challenge or mock someone in public.

Goliath used this exact same approach in 1 Samuel 17.

Standing alone and taunting the enemy army was a common tactic among these giant warriors.

Each time it happens in Chronicles, the giant ends up dead instead of victorious.

📢 Defied means openly challenged or mocked
🗣️ Goliath used the same tactic
😤 Taunting Israel was common among them
📖 Every giant in this chapter loses

---

## 🗡️ They Fell By The Hand Of David, And By The Hand Of His Servants

This closing verse names the giant behind all four fighters in this section.

Sippai, Lahmi, and this last unnamed warrior all fell to David's men.

The phrase "hand of David" also recalls his own victory over Goliath in 1 Samuel 17.

David killed the first famous giant himself, and his servants finished the rest.

The whole family of giants is now gone from the story.

👪 One giant fathered all four fighters
🗡️ David began this pattern with Goliath
🤝 His servants carried the pattern forward
📖 The entire giant family is now gone
`.trim();

export const FIRST_CHRONICLES_TWENTY_PERSONAL_SECTIONS = parseFirstChroniclesTwentyRawNotes(FIRST_CHRONICLES_TWENTY_RAW_NOTES);
