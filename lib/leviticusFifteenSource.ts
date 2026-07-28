export type LeviticusFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusFifteenRawNotes(rawText: string): LeviticusFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 15:${startVerse}` : `Leviticus 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Leviticus 15 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_FIFTEEN_RAW_NOTES = `# Leviticus 15:1-3

# 🩸 The Law Of Running Issues

---

## 🗣️ Spake Unto Moses And Unto Aaron

Most laws in Leviticus open with "the LORD spake unto Moses" alone. This one names Aaron too, because a "running issue" doesn't stay private - it spreads to beds, seats, and household objects in ways that touch daily community life, not just tabernacle service, so both Israel's lawgiver and its high priest are told together.

🗣️ Most Leviticus laws are given to Moses alone

👳 Aaron is named here because priests handle the fallout

🏘️ This law reaches into ordinary daily life

---

## 📢 Speak Unto The Children Of Israel

This instruction goes out to the whole nation, not just the priesthood. That matters, because these rules govern ordinary households and everyday contact, not only what happens at the tabernacle door.

📢 Addressed to the whole nation, not just priests

🏠 Governs household life, not only tabernacle service

📜 Everyone needed to know these rules, not just Aaron's sons

---

## 🚹 A Running Issue Out Of His Flesh

"Flesh" is the Bible's polite word for the male sex organ, the same word used for circumcision back in Genesis 17. A "running issue" is an abnormal discharge from it - not a normal bodily function, but something wrong, likely close to what would today be diagnosed as a genital infection.

📖 "Flesh" is a polite Bible word for the male organ

🩺 "Running issue" means an abnormal, unwanted discharge

🚫 Not describing anything about normal bodily function

---

## ⚖️ Because Of His Issue He Is Unclean

"Unclean" throughout Leviticus is a ritual status, not a moral verdict - it doesn't mean the man sinned. Like childbirth in chapter 12 or skin disease in chapters 13-14, it temporarily blocks him from approaching the tabernacle until the condition passes and the proper steps are taken.

⚖️ "Unclean" is a ritual status, not a verdict of sin

🔗 Same pattern as childbirth (ch12) and skin disease (ch13-14)

🚪 Blocks tabernacle access temporarily, not permanently

---

## 🔄 Whether His Flesh Run With His Issue, Or His Flesh Be Stopped

The law covers two opposite-sounding symptoms as one problem: ongoing discharge, or the passage blocked up entirely. Both count as "his uncleanness" - the law isn't naming one narrow symptom, it's covering the whole condition however it happens to show up.

🔄 Covers both active discharge and blockage as one condition

📜 Doesn't require one exact symptom to apply

🩺 Written broadly enough to fit real medical variation

# Leviticus 15:4-6

# 🛏️ Bed And Seat

---

## 🛏️ Every Bed Whereon He Lieth...Is Unclean

The uncleanness spreads by contact - anything he lies on picks up his ritual status. This isn't about visible dirt; it's a legal category attached to an object because of who used it.

🛏️ Uncleanness spreads through contact, not visible dirt

📜 A legal category, not a hygiene judgment about the object

🔗 Sets up every rule that follows in this section

---

## 🪑 Every Thing Whereon He Sitteth Shall Be Unclean

This broadens beyond the bed to literally anything used as a seat. The ordinary furniture of daily life - stools, chairs, the ground he sits on - all becomes affected by his condition.

🪑 Broadens beyond "bed" to any seat at all

🏠 Ordinary household furniture is included, not just special items

📋 The law states a general principle, not a narrow list

---

## 👕 Wash His Clothes, And Bathe Himself In Water

This is the standard remedy for minor uncleanness across Leviticus, also used in chapters 11 and 14: washing the clothes plus a full-body bath, not just rinsing the hands.

👕 The standard Leviticus remedy for minor uncleanness

🔗 Same combination used in chapter 11 and chapter 14

🛁 A full-body bath, not just a quick hand-rinse

---

## 🌆 Unclean Until The Even

"Even" means evening, sundown. This is the standard length for this lighter category of uncleanness - it resets automatically at day's end, unlike the man with the actual issue, whose own uncleanness continues as long as his condition does.

🌆 "Even" means evening or sundown

⏳ The standard length for this lighter uncleanness category

🔗 Resets daily, unlike his own ongoing condition

---

## 🔁 He That Sitteth On Any Thing Whereon He Sat

Verse 5 covers touching his bed by hand. Verse 6 covers actually sitting where he sat. Both trigger the same remedy, showing the law doesn't care how contact happened - only that it did.

✋ Verse 5 covers touching his bed

🪑 Verse 6 covers sitting where he sat

⚖️ Same remedy either way

# Leviticus 15:7-12

# 🐎 Saddle, Spit, And Touch

---

## 🤝 He That Toucheth The Flesh Of Him That Hath The Issue

Direct physical contact with the man's own body, not just his belongings, carries the same "until evening" remedy. Person-to-person contact is treated exactly the same as object contact.

🤝 Direct contact with his body, not just his things

⚖️ Treated the same as touching an object he used

🔗 One consistent rule for every kind of contact

---

## 🗣️ If He That Hath The Issue Spit Upon Him That Is Clean

Spit was treated as a bodily fluid capable of carrying the man's unclean status, the same as touch. A person didn't need to physically handle him for contact to count - his saliva alone was enough.

🗣️ Spit counts as contact, the same as touch

💧 A bodily fluid can carry the same status touch does

🔗 No physical handling was required for this to apply

---

## 🐎 What Saddle Soever He Rideth Upon...Shall Be Unclean

"Saddle" broadly means any riding gear or seat used on an animal. This extends the "anything he sits on" principle from verses 4-6 out into travel equipment, not just household furniture.

🐎 "Saddle" covers riding gear in general

🔗 Extends the seat rule from verses 4-6 to travel equipment

🛣️ Shows the principle followed him outside the house

---

## 📦 Whosoever Toucheth Any Thing That Was Under Him

This broadens even further to "any thing," not just furniture with a specific name. The law states the general principle rather than trying to list every possible object he might sit or lie on.

📦 "Any thing" covers objects with no specific name

📜 A general principle, not an exhaustive list

🧠 Written to cover cases the lawgiver couldn't predict

---

## 🖐️ He That Beareth Any Of Those Things

"Beareth" means carries. Simply carrying an object he had been on, without necessarily touching bare skin, still counted as contact requiring washing - even carrying it at arm's length didn't avoid the uncleanness.

🖐️ "Beareth" means carries

📦 Carrying alone counts, without skin contact

🚫 Distance from the object didn't avoid the consequence

---

## 💧 Hath Not Rinsed His Hands In Water

An interesting detail: if the man touches someone else without having rinsed his own hands first, the other person becomes unclean. That implies rinsed hands could lessen the effect - a real, practical hygiene habit built directly into the ritual law.

💧 Naming unrinsed hands implies rinsing could help

🧼 A genuine hygiene practice embedded in the ritual law

🩺 Ancient Israel's law had a practical, not just symbolic, side

---

## 🏺 The Vessel Of Earth...Shall Be Broken

A clay pot he touches must be smashed, not washed. Unglazed clay is porous, and in the ancient world there was no reliable way to fully clean something that had soaked something in - so it's destroyed instead of reused.

🏺 Unglazed clay was seen as impossible to fully clean

🔨 Broken rather than reused, unlike other materials

💰 A real replacement cost fell on the household

---

## 🪵 Every Vessel Of Wood Shall Be Rinsed In Water

Wood, by contrast, has a smooth, sealable surface, so it can be reused after a proper rinse. The law distinguishes between materials that could genuinely be cleaned and those that couldn't.

🪵 Wood's smoother surface could actually be cleaned

♻️ Reused after rinsing, unlike the clay vessel

🧠 The law matches its remedy to the real material involved

# Leviticus 15:13-15

# 🕊️ His Cleansing, Step By Step

---

## 7️⃣ He Shall Number To Himself Seven Days

The same seven-day completeness pattern already seen in chapter 12's childbirth law, chapter 13's quarantine periods, and chapter 14's leper cleansing - one consistent unit of time running through every Leviticus purification law.

7️⃣ Seven days is Leviticus's consistent purification unit

🔗 Same count used in chapters 12, 13, and 14

📅 A recognizable rhythm the whole community would know

---

## 🌊 Bathe His Flesh In Running Water

"Running water" means flowing water from a stream or spring, not water sitting still in a basin - the same term used in chapter 14:5 for the leper's cleansing. It appears to be a higher standard than the plain "bathe in water" used for lighter, one-day uncleanness earlier in this chapter.

🌊 "Running water" means flowing, not stagnant, water

🔗 Same standard used for the leper in chapter 14:5

📈 A higher bar than the lighter one-day washing rule

---

## 8️⃣ On The Eighth Day

One day past a full week - the same marker used for circumcision (Genesis 17:12), the finish of priestly ordination (Leviticus 9:1), and the healed leper (Leviticus 14:10). A recurring biblical signal for a fresh start right after a complete cycle.

8️⃣ One day past a full seven-day cycle

🔗 Same marker used for circumcision and priestly ordination

🌅 A recurring signal for a fresh start after completion

---

## 🕊️ Two Turtledoves, Or Two Young Pigeons

The standard lower-cost bird offering used throughout Leviticus. Here it's required of everyone with this condition, not offered only as a concession for the poor - this particular cleansing didn't call for anything more expensive.

🕊️ The standard lower-cost bird offering in Leviticus

💰 Required of everyone here, not just a poverty option

📜 This cleansing simply didn't call for a costlier animal

---

## 🚪 Come Before The LORD Unto The Door Of The Tabernacle Of The Congregation

"Tabernacle of the congregation" means the tent of meeting, God's dwelling place at the center of Israel's camp. This is the same doorway location used throughout Leviticus for offerings, marking the formal, official end of this uncleanness.

⛺ "Tabernacle of the congregation" is the tent of meeting

🚪 The same offering location used throughout Leviticus

✅ Marks the formal, official end of his uncleanness

---

## ⚖️ One For A Sin Offering, And The Other For A Burnt Offering; Make An Atonement

The sin offering deals with the specific uncleanness itself; the burnt offering represents complete dedication back to God. The same two-offering combination and order used in chapter 14:19 for the healed leper's own cleansing.

⚖️ Sin offering handles the uncleanness itself

🔥 Burnt offering represents full dedication back to God

🔗 Same combination and order used for the leper in ch14:19

# Leviticus 15:16-18

# 💧 Ordinary Bodily Emission

---

## 💧 Any Man's Seed Of Copulation Go Out From Him

"Seed of copulation" is the KJV's plain phrase for semen. This is a completely normal, healthy bodily function, not a disease like the "issue" described in verses 2-3 - it still creates a minor, one-day uncleanness, but of a very different kind.

💧 "Seed of copulation" means semen, plainly stated

✅ A normal, healthy bodily function, not an illness

⚖️ Still creates uncleanness, but a much lighter kind

---

## ⚖️ Unclean Until The Even

Notice this is the mild, one-evening uncleanness, not the extended condition described at the start of the chapter. Normal reproductive function gets the lightest uncleanness category in this entire law.

⚖️ The mild, one-evening category, not the extended one

📉 Normal function gets the lightest classification available

🔗 Clearly separated from the actual illness in verses 2-3

---

## 👕 Every Garment, And Every Skin

"Skin" here likely means a leather garment or hide used as clothing or bedding, common throughout the ancient Near East. Both cloth and leather items are treated the same way - washed, and unclean until evening.

👕 "Skin" means a leather garment or hide

🛏️ A common ancient bedding and clothing material

⚖️ Cloth and leather get the identical remedy

---

## 💑 The Woman Also With Whom Man Shall Lie...They Shall Both Bathe Themselves

Normal marital relations create this same mild, temporary uncleanness for husband and wife equally. It isn't singling out one party, and it isn't treated as sin - just a ritual status that resets by evening.

💑 Applies equally to both husband and wife

⚖️ Neither party is singled out or blamed

🌆 Resets by evening like any normal bodily function

---

## 🔀 A Deliberate Contrast With Verses 2-3

Placing this ordinary case right after the serious "issue" described at the start of the chapter looks deliberate. Readers can see clearly that a genuine medical problem (extended, more involved) and ordinary bodily function (mild, one evening) are treated very differently, even where English translations use similar-sounding words.

🔀 Placed right after the chapter's serious opening case

📖 Shows two very different situations side by side

🌐 English can blur wording that Hebrew keeps distinct

# Leviticus 15:19-24

# 🌙 A Woman's Monthly Separation

---

## 🩸 If A Woman Have An Issue, And Her Issue In Her Flesh Be Blood

This describes ordinary monthly menstruation, a normal, healthy process, not an illness. The Hebrew word behind this section, niddah, is the specific technical term for this monthly separation period.

🩸 Describes ordinary monthly menstruation

✅ A normal, healthy process, not an illness

📖 The Hebrew term is niddah, a specific technical word

---

## 📅 She Shall Be Put Apart Seven Days

A fixed seven-day period regardless of how long her actual bleeding lasts - the same completeness number running through Leviticus's purity laws. "Put apart" describes a ritual status, not physical banishment from camp the way a diagnosed leper faced in chapter 13.

📅 A fixed seven days regardless of actual bleeding length

7️⃣ The same completeness number used throughout Leviticus

🏕️ A status at home, not banishment like the leper faced

---

## 🛏️ Every Thing That She Lieth Upon...Every Thing Also That She Sitteth Upon

The same bed-and-seat rule already laid out for the man's issue in verses 4-6 is applied here to the woman, matching it almost word for word - the law treats these two situations with matching structure.

🛏️ Mirrors the man's bed-and-seat rule from verses 4-6

⚖️ Nearly identical wording applied to both cases

🔗 Consistent structure across the whole chapter

---

## 👕 Whosoever Toucheth Her Bed Shall Wash His Clothes, And Bathe Himself

Again mirrors verses 5-6's remedy for the man's bed and seat. Anyone in the household during this week - husband, children, anyone - who touches her bed or seat picks up the same mild, one-evening uncleanness.

👕 Mirrors verses 5-6's remedy exactly

🏠 Applies to anyone in the household, not just her spouse

🌆 The same one-evening consequence as the man's rule

---

## 🪑 Whosoever Toucheth Any Thing That She Sat Upon

Paired with the bed rule just before it, this makes sure both furniture categories - lying-surfaces and sitting-surfaces - are each spelled out on their own, rather than assuming one general statement would cover both.

🪑 Names sitting-surfaces separately from lying-surfaces

📜 The law spells out both cases rather than assuming coverage

🔗 Matches the same two-part pattern used for the man

---

## 🔄 If It Be On Her Bed...When He Toucheth It

Verse 23 covers a subtler case: touching an object that happens to be resting on her bed or seat, even if it isn't the bed or seat itself. The uncleanness travels through layers of contact, not only direct contact with the furniture.

🔄 Covers objects resting on her bed or seat, not just the furniture

📦 Uncleanness can travel through a layer of contact

🧠 A carefully thought-through, not sloppy, legal detail

---

## 💑 If Any Man Lie With Her At All, And Her Flowers Be Upon Him

"Flowers" is the KJV's old English word for menstrual blood or flow, related to the word "flow" itself, not to actual flowers - an obsolete usage that reads confusingly to a modern reader.

🌸 "Flowers" is archaic English for menstrual blood

📖 Related to the word "flow," not to actual flowers

🤔 An obsolete usage easy for modern readers to misread

---

## 🚫 Not Shameful, Just Regulated

It's worth stating plainly: nothing here calls a woman's monthly cycle shameful or dirty in a moral sense. "Unclean" is the same technical ritual term used for touching a dead animal (chapter 11) or having a baby (chapter 12) - an ordinary, unavoidable part of life that simply required a process before approaching the tabernacle.

🚫 Not framed as shameful or morally dirty

🔗 Same technical term used for chapters 11 and 12

📜 An ordinary part of life with a required process, not a stigma

# Leviticus 15:25-27

# ⏳ When Bleeding Runs Long

---

## 🩸 If A Woman Have An Issue Of Her Blood Many Days Out Of The Time Of Her Separation

This describes abnormal, extended bleeding outside the normal monthly cycle. Unlike verses 19-24's regular period, this is closer to the medical condition the chapter opened with for men in verses 2-3 - an irregular, ongoing issue rather than a predictable, temporary one.

🩸 Describes abnormal bleeding outside the normal cycle

🔗 Closer to the man's medical "issue" from verses 2-3

⏳ Irregular and ongoing, not predictable like a period

---

## 🔗 As The Days Of Her Separation: She Shall Be Unclean

Rather than inventing a whole new, harsher category, the law simply extends her normal monthly rules for as long as the abnormal bleeding continues - the same status, just for a longer, unpredictable stretch of time.

🔗 Extends her existing rules rather than creating new ones

⏳ The same status, lasting however long the bleeding does

📜 A simple, consistent legal approach to an unpredictable case

---

## 🛏️ Every Bed Whereon She Lieth...Shall Be Unto Her As The Bed Of Her Separation

No new rule is invented here either; verses 19-23's bed-and-seat rules simply keep applying for the entire duration of the extended bleeding, however long that turns out to be.

🛏️ Reuses the bed-and-seat rules from verses 19-23

⏳ Applies for the whole length of the extended bleeding

🔁 Consistency instead of a separate set of rules

---

## 👕 Whosoever Toucheth Those Things Shall Be Unclean...Until The Even

Contact with her bed or seat during this extended period still only carries the lighter one-evening consequence for others, even though her own uncleanness lasts as long as the bleeding does. Only she carries the longer status personally.

👕 Others touching her things still get the lighter, one-evening rule

⏳ Only she personally carries the extended uncleanness

⚖️ Degree of contact still determines the consequence

# Leviticus 15:28-30

# 🕊️ Her Cleansing, Mirrored

---

## 7️⃣ She Shall Number To Herself Seven Days

The identical seven-day counting rule already given to the man back in verse 13, now applied to the woman. The chapter deliberately mirrors his cleansing process with hers, step for step.

7️⃣ The same seven-day count as the man's cleansing in verse 13

🪞 A deliberate, step-for-step mirror of his process

⚖️ Equal treatment built into the text's own structure

---

## 8️⃣ On The Eighth Day...Two Turtles, Or Two Young Pigeons

The exact same bird offering and timing used for the man in verse 14. The law doesn't require a more expensive offering for a woman's cleansing than a man's, or the reverse - the process is equal either way.

8️⃣ Same timing as the man's cleansing in verse 14

🕊️ Same bird offering, no cost difference between the two

⚖️ An equal process for both sexes

---

## 🚪 Bring Them Unto The Priest, To The Door Of The Tabernacle Of The Congregation

Same location, same formal procedure as the man's cleansing in verse 14. Her return to full ritual participation is marked with the same public, official ceremony his was.

🚪 The same location used for the man's cleansing

📜 The same formal, public procedure either way

✅ Her return is marked with equal ceremony

---

## ⚖️ One For A Sin Offering, And The Other For A Burnt Offering; Make An Atonement For Her

Word for word, the same two-offering combination used for the man in verse 15. The text goes out of its way to give the woman's ceremony identical wording and structure to the man's own.

⚖️ Word-for-word the same offering combination as verse 15

📜 Identical wording given to both ceremonies

🔗 The text deliberately avoids treating either case as lesser

# Leviticus 15:31-33

# 📜 Why Any Of This Mattered

---

## ⚠️ Thus Shall Ye Separate The Children Of Israel From Their Uncleanness

This verse states the purpose behind the whole chapter in plain language: not superstition or squeamishness about bodily functions, but keeping the community aware of anything that could compromise access to God's presence.

⚠️ States the chapter's purpose in plain language

🚫 Not squeamishness about ordinary bodily functions

🙏 About protecting access to God's presence

---

## ☠️ That They Die Not In Their Uncleanness, When They Defile My Tabernacle

A serious warning, not a minor inconvenience. Israel's camp was arranged with the tabernacle, God's actual dwelling place, at its center (Numbers 2), so uncleanness treated carelessly was pictured as a real danger to the whole camp, not just personal embarrassment.

☠️ A genuinely serious warning, not a small formality

⛺ The tabernacle sat at the literal center of the camp

⚠️ Carelessness here was pictured as a danger to everyone

---

## 🏠 My Tabernacle That Is Among Them

God calling the tabernacle "mine" and describing it as sitting "among them," in the middle of the camp, is a reminder that these laws exist because God was living in close physical proximity to an ordinary, physically imperfect people.

🏠 God calls the tabernacle His own dwelling

📍 Placed physically among the people, not distant from them

📜 These rules exist because of that close proximity

---

## 📋 This Is The Law Of Him That Hath An Issue...Of His Seed...Of Her That Is Sick Of Her Flowers

The closing verses work like a table of contents, listing every case the chapter covered: a man's abnormal issue (2-15), a man's normal emission (16-18), a woman's normal period (19-24), and her abnormal extended bleeding (25-30).

📋 Functions like a table of contents for the whole chapter

🔢 Lists all four cases the chapter actually covered

🏗️ A deliberate structural summary, not filler

---

## 👫 Of The Man, And Of The Woman, And Of Him That Lieth With Her That Is Unclean

The summary names both sexes and even the sexual partner explicitly, underlining that this entire chapter treated male and female bodies with the same seriousness and the same rules, not holding one sex to a stricter standard.

👫 Both sexes are named explicitly in the summary

⚖️ Same seriousness and same rules applied to both

🚫 Neither sex is held to a stricter standard

---

## 🔗 A Closing Bookend, Same As Chapter 14's

Comparing this ending to chapter 14:54-57's closing list shows a consistent pattern across these purity laws: state the general rule, work through every specific case, then close with a summary "this is the law of..." statement tying it all together.

🔗 Matches the closing pattern used in chapter 14:54-57

📜 General rule, then every case, then a summary close

📚 A consistent structure across Leviticus's purity laws
`;

export const LEVITICUS_FIFTEEN_PERSONAL_SECTIONS = parseLeviticusFifteenRawNotes(LEVITICUS_FIFTEEN_RAW_NOTES);
