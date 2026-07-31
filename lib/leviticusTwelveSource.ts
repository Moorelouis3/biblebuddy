export type LeviticusTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwelveRawNotes(rawText: string): LeviticusTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 12:${startVerse}` : `Leviticus 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Leviticus 12 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWELVE_RAW_NOTES = `# Leviticus 12:1-2

# 🤱 A New Mother's First Days

---

## 🗣️ The LORD Spake Unto Moses, Saying, Speak Unto The Children Of Israel

This is the same relay pattern running through the whole book: God speaks directly to Moses, and Moses alone passes the message on to Israel. This chapter groups two related situations under one law: what happens to a woman's ceremonial status after she gives birth, first to a son, then to a daughter.

🗣️ Same Moses-to-Israel relay used for most laws in the book

👶 One law covering two related situations: sons and daughters

📖 A short chapter, tightly organized around a single theme

---

## 🌱 If A Woman Have Conceived Seed, And Born A Man Child

"Conceived seed" is an old way of saying she became pregnant and carried the child to birth. The verse covers the whole process, from conception to delivery, before naming what changes for her ceremonially afterward.

This law addresses something completely ordinary, childbirth, not any kind of wrongdoing. Being ceremonially "unclean" in Leviticus was never the same as being guilty of sin; it just meant a temporary block from entering the sanctuary or handling holy things.

🌱 "Conceived seed" means became pregnant and gave birth

⚖️ Ceremonial uncleanness here isn't tied to any wrongdoing

🏛️ It's a temporary block from the sanctuary, not a moral judgment

---

## 🗓️ Unclean Seven Days

For the first week after a son's birth, the mother's ceremonial status matched the monthly-period cycle described in full later in chapter 15. During these seven days she was excused from anything connected to the tabernacle.

This wasn't a punishment for having a baby. It worked more like a built-in recovery window, a full week where no ceremonial demands were placed on a woman who had just gone through labor.

🗓️ Seven days matches the monthly-period rule in chapter 15

🛌 A built-in recovery week right after childbirth

🏛️ No tabernacle duties expected of her during this time

---

## 🩸 According To The Days Of The Separation For Her Infirmity

"The separation for her infirmity" points ahead to the regular monthly uncleanness law that chapter 15:19-24 lays out in full later in the book. By linking childbirth to that already-familiar category, this verse tells the first readers exactly how to treat a new mother without repeating the whole law here.

📖 A direct cross-reference to chapter 15's monthly-period law

🔗 Saves the text from repeating rules already established elsewhere

🩸 Ties childbirth bleeding to the same category as monthly bleeding

# Leviticus 12:3

# 🔪 Circumcised On The Eighth Day

---

## 🔪 In The Eighth Day The Flesh Of His Foreskin Shall Be Circumcised

This command doesn't start here. It's a direct repeat of the covenant sign God gave Abraham back in Genesis 17:12: "he that is eight days old shall be circumcised among you." Leviticus 12 simply restates that existing law in the middle of the mother's purification instructions.

Circumcision marked a baby boy as belonging to the covenant God made with Abraham's family, generations before Israel ever reached Sinai.

📖 Repeats the Genesis 17:12 covenant law almost word for word

✝️ Marks the child as belonging to Abraham's covenant

👶 Placed here even though the surrounding verses are about the mother

---

## 📅 Why The Eighth Day, Not Sooner

The Bible doesn't spell out the exact reasoning for choosing day eight, but the timing lines up right inside the mother's own seven-day uncleanness period from verse 2, since the son is circumcised the day after that first week ends.

Whatever the underlying reason, the eighth day became a fixed, unchangeable detail of the law, repeated consistently everywhere circumcision comes up in the rest of the Bible.

🗓️ Falls the day right after the mother's first seven unclean days end

📖 The Bible doesn't spell out every reason behind this exact timing

🔒 A fixed detail repeated consistently everywhere else in Scripture

# Leviticus 12:4

# 🩸 Three And Thirty Days Of Purifying

---

## 🩸 She Shall Then Continue In The Blood Of Her Purifying Three And Thirty Days

After the sharper first seven days of uncleanness, a second, longer stage begins for a mother of a son: thirty-three more days called "the blood of her purifying." This stage was milder than the first week; it restricted her from the sanctuary specifically but didn't carry the same full uncleanness as the first stage.

🩸 A second, milder 33-day stage follows the first week

📉 Less restrictive than the first seven days, but still limited

🔢 Thirty-three is a specific, fixed number set by the law

---

## 🚫 She Shall Touch No Hallowed Thing, Nor Come Into The Sanctuary

This spells out exactly what the second stage restricted: contact with holy objects and entry onto the tabernacle grounds. Everything else in ordinary daily life, cooking, caring for her family, moving through the camp, stayed completely open to her.

🚫 Restricted from holy objects and the sanctuary specifically

🏠 Ordinary daily life and family duties were never affected

📖 A narrow, specific restriction, not a broad isolation

---

## 🔢 Forty Days Total For A Son

Add the first seven days to these next thirty-three, and a mother of a son spent a full forty days under some level of ceremonial restriction. Forty is a number that shows up again and again across the Bible marking a complete period of testing or transition: forty days of rain in Noah's flood, forty years in the wilderness, forty days of Jesus's wilderness fast in Matthew 4:2.

🔢 Seven plus thirty-three adds up to forty days total

📖 Forty repeatedly marks a complete period elsewhere in Scripture

🍼 A full six weeks of graduated restriction for a mother of a son

# Leviticus 12:5

# 👧 If She Bear A Maid Child

---

## 👧 She Shall Be Unclean Two Weeks, As In Her Separation

For a daughter, the first, stricter stage of uncleanness doubles to two full weeks instead of one. The text doesn't explain why the sex of the child changes the length, and honest readers today should say plainly that the reason isn't stated rather than guess at one.

👧 The first stage doubles to fourteen days for a daughter

📖 The text gives the rule without explaining the reason

🤔 Worth being honest that the "why" isn't stated in the text

---

## 🔢 Threescore And Six Days — Eighty Days Total For A Daughter

"Threescore and six" is an old way of counting, sixty plus six, meaning sixty-six days. Added to the first fourteen days, a mother of a daughter spent eighty days total under restriction, exactly double the forty days set for a son.

🔢 "Threescore and six" means sixty-six in plain numbers

➕ Fourteen plus sixty-six adds up to eighty days total

⚖️ Exactly double the forty days required for a son

---

## ❓ Why The Difference Between Son And Daughter

Bible scholars have offered different explanations over the centuries, some tied to ancient beliefs about childbirth and blood, some tied to the extra ceremony of circumcision required only for sons, but none of these explanations come directly from the text itself. The safest approach is to teach the law as it's actually written rather than fill in a confident reason Scripture doesn't give.

📖 The text states the rule without stating its reason

🧠 Multiple explanations exist, but none are stated in Leviticus itself

✅ Best to be honest about what isn't explained, rather than guess

# Leviticus 12:6-7

# 🐑 Bringing The Offering

---

## 🐑 A Lamb Of The First Year For A Burnt Offering

Once either purification period fully ended, the mother had one required trip to the tabernacle to formally close it out. "A lamb of the first year" means a lamb under twelve months old, the same standard used for burnt offerings throughout the sacrificial system.

🐑 A lamb under one year old, the standard burnt-offering animal

🔥 The animal is fully consumed on the altar as a burnt offering

🚪 One required visit closes out the whole purification period

---

## 🕊️ A Young Pigeon, Or A Turtledove, For A Sin Offering

Alongside the lamb, a second bird was offered specifically as a sin offering, following the same pattern from chapters 4 and 5 where the sin offering deals with a ceremonial boundary rather than moral guilt. Nothing sinful happened in childbirth itself; the offering addressed the ritual line being crossed back into full sanctuary access.

🕊️ A separate small bird offered specifically as a sin offering

⚖️ Not a punishment for wrongdoing, since childbirth wasn't a sin

🔄 Restores full access to the sanctuary and holy things

---

## 🚪 Unto The Door Of The Tabernacle Of The Congregation, Unto The Priest

The offering had to be brought to one specific place, the entrance of the tabernacle, and handed to one specific person, the priest. The mother herself never performed the sacrifice; the priest carried out the actual ritual on her behalf.

🚪 Brought to the tabernacle's entrance specifically

👤 Handed over to the priest, not performed by the mother herself

🔄 The same division of labor used throughout Leviticus's laws

---

## ✨ Make An Atonement For Her; And She Shall Be Cleansed From The Issue Of Her Blood

"Atonement" (Hebrew kaphar) means to cover or make right, the same word used across every offering type in Leviticus so far. "The issue of her blood" refers plainly to the bleeding that comes with childbirth, now formally closed out through this one final ritual.

✨ "Atonement" (kaphar) means to cover, make right, or restore

🩸 "Issue of her blood" refers directly to childbirth bleeding

🔚 This ritual formally closes the whole purification period

---

## ⚖️ The Law For Her That Hath Born A Male Or A Female

This closing line makes clear that the same offering requirement, one lamb and one bird, applied whether the child was a son or a daughter, even though the waiting periods leading up to it were different lengths. The final ritual itself didn't scale by the child's sex, only the days beforehand did.

⚖️ The same two-animal offering, regardless of the child's sex

🔢 Only the waiting period length differed, not the offering itself

📖 A closing summary line tying both cases back together

# Leviticus 12:8

# 🕊️ Two Turtledoves Instead

---

## 💰 If She Be Not Able To Bring A Lamb

This verse builds in an economic safety valve for poorer families: if a lamb was genuinely out of reach, two birds could replace the whole lamb-and-bird combination. The same principle already appeared in chapter 5:7-11's sliding scale for the sin offering, where cost never determined whether atonement was available.

💰 A built-in provision for families who couldn't afford a lamb

🔄 The same sliding-scale principle already used in chapter 5:7-11

✅ Full atonement was never priced out of a poor family's reach

---

## 🕊️ Two Turtles, Or Two Young Pigeons

With this substitution, one bird still covered the burnt offering, and the second bird still covered the sin offering. The purpose of the offering stayed exactly the same, only the animal changed to fit what the family could actually afford.

🕊️ One bird for the burnt offering, one for the sin offering

🔁 The purpose of the ritual stayed identical either way

💰 Only the cost of the animal changed, not the requirement itself

---

## 👶 Mary And Joseph's Own Offering

This exact provision shows up centuries later in Luke 2:22-24, when Mary and Joseph bring "a pair of turtledoves, or two young pigeons" to the temple after Jesus's birth instead of a lamb. That detail is a quiet but clear sign of the family's modest financial situation, confirmed directly by this very law in Leviticus.

👶 Mary and Joseph bring the exact bird-only option in Luke 2:22-24

💰 A quiet, textual clue about their financial situation

📖 This law is the direct explanation behind that Gospel detail`;

export const LEVITICUS_TWELVE_PERSONAL_SECTIONS = parseLeviticusTwelveRawNotes(LEVITICUS_TWELVE_RAW_NOTES);
