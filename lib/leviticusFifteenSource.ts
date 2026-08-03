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

Most laws in Leviticus name Moses alone as the one being addressed.

This law names Aaron too.

A running issue does not stay private.

It spreads to beds, chairs, and household objects that reach the wider camp.

Aaron represents the priesthood, whose job includes managing exactly that kind of spread.

Naming him here signals that this law reaches past the tabernacle door and into ordinary homes.

🗣️ Most Leviticus laws name Moses alone

👳 Aaron is named because priests handle the fallout

🏘️ This law touches ordinary homes, not the tabernacle

📖 A private condition still had public consequences

## 📢 Speak Unto The Children Of Israel

This instruction goes to the whole nation, not only the priests.

Ordinary households needed to know these rules just as much as Aaron's sons did.

The tabernacle staff could not police every home in Israel.

Families had to recognize and manage this condition themselves.

📢 Addressed to the whole nation

🏠 Ordinary households needed these rules too

🙅 Priests could not police every home

📖 Israel governed itself, not just its priests

## 🩺 A Running Issue Out Of His Flesh

"Flesh" is the Bible's plain word for the male body, sometimes the male organ specifically.

Genesis seventeen uses the same word for circumcision.

A "running issue" means an abnormal discharge, not a normal bodily function.

Modern readers would likely recognize this as describing a genital infection.

The text is medical, not moral, in what it describes.

🔤 Flesh means the male body, plainly

✂️ Circumcision used the same word too

🩺 Running issue means an abnormal discharge

📖 The description is medical, not moral

## ⚖️ Because Of His Issue He Is Unclean

"Unclean" is a technical word throughout Leviticus, not a verdict about sin.

Childbirth carried the same word back in chapter twelve.

Skin disease carried it in chapters thirteen and fourteen.

None of those conditions meant the person had done something wrong.

Unclean simply meant blocked from the tabernacle until the condition passed.

⚖️ Unclean is a technical word, not a verdict

👶 Childbirth used the same word in chapter twelve

🌿 Skin disease used it in chapters thirteen, fourteen

📖 It meant blocked access, never guilt

## 🔄 Whether His Flesh Run With His Issue, Or His Flesh Be Stopped

The law names two opposite symptoms and calls them the same problem.

One is ongoing discharge.

The other is the passage blocked entirely.

Both count as "his uncleanness."

The law was not written around one narrow symptom.

It was written broadly enough to cover the condition however it actually showed up.

🔄 Two opposite symptoms count as one condition

📜 The law does not require one exact symptom

🩺 Real medical cases rarely look identical

📖 Broad wording protected cases a narrow rule missed

# Leviticus 15:4-6
# 🛏️ Bed And Seat
---
## 🛏️ Every Bed Whereon He Lieth...Is Unclean

Uncleanness spread through contact, not through visible dirt.

Anything the man lay on picked up his ritual status automatically.

This was a legal category attached to an object, not a hygiene judgment about it.

Every rule that follows in this chapter builds on this one idea.

🛏️ Uncleanness spread through contact, not dirt

⚖️ A legal category, not a hygiene judgment

🔗 Every later rule builds on this one

📖 Objects carried a person's ritual status

## 🪑 Every Thing Whereon He Sitteth Shall Be Unclean

"Every thing" widens the rule past the bed to any seat at all.

Stools, chairs, even the ground counted if he sat there.

The law states a general principle instead of listing every possible object.

Ordinary household furniture was swept into the same rule as his bed.

🪑 Every thing means any seat, not only chairs

🏠 Ordinary furniture is included, not exempt

📋 A general principle, not a specific list

📖 The rule reached everywhere he sat

## 👕 Wash His Clothes, And Bathe Himself In Water

This exact remedy shows up again in chapters eleven and fourteen.

It always means the same two steps together.

Clothes get washed.

The whole body gets bathed, not just the hands rinsed.

Leviticus reused this fixed remedy instead of inventing a new one for every case.

👕 The same remedy appears in chapters eleven, fourteen

🛁 A full body bath, not a rinse

🔁 Leviticus reused fixed remedies across chapters

📖 A consistent pattern was easier to obey

## 🌆 Unclean Until The Even

"Even" means evening, the moment the sun goes down.

This is the lightest uncleanness category in the whole chapter.

It resets automatically every single day.

The man's own uncleanness works differently.

His lasts as long as his condition does, not just until sundown.

🌆 Even means evening or sundown

⏳ The lightest uncleanness category in the chapter

🔁 It resets automatically each day

📖 His own condition lasted far longer

## 🔁 He That Sitteth On Any Thing Whereon He Sat

Verse five covers touching his bed directly with a hand.

Verse six covers actually sitting down where he sat.

Both trigger the identical remedy.

The law did not care how the contact happened.

It only cared that contact happened at all.

✋ Verse five covers touching his bed

🪑 Verse six covers sitting where he sat

⚖️ Both trigger the same remedy

📖 Contact mattered, not the method of contact

# Leviticus 15:7-12
# 🐎 Saddle, Spit, And Touch
---
## 🤝 He That Toucheth The Flesh Of Him That Hath The Issue

Direct contact with the man's own body carried the same remedy as touching his bed.

The law made no distinction between a person and an object he had used.

Washing the clothes and bathing followed either way.

One consistent rule covered every kind of contact, human or otherwise.

🤝 Touching his body matched touching his bed

⚖️ Person and object were treated identically

👕 Washing and bathing followed either way

📖 One rule covered every kind of contact

## 💧 If He That Hath The Issue Spit Upon Him That Is Clean

Spit counted as a bodily fluid capable of carrying his unclean status.

A person did not need to physically handle him for the law to apply.

His own saliva alone was treated as enough contact.

This detail shows how far the law reached beyond direct touch.

🗣️ Spit counted the same as touch

💧 A bodily fluid could carry his status

🚫 No physical handling was required

📖 The law reached further than direct contact

## 🐎 What Saddle Soever He Rideth Upon

"Saddle" means any riding gear or seat used on an animal, not one specific design.

This extends the seat rule from verses four through six out onto the road.

Household furniture was not the only thing affected.

Travel equipment carried the exact same risk.

🐎 Saddle means any riding gear, broadly

🔗 Extends the seat rule onto the road

🛣️ Travel equipment carried the same risk

📖 The law followed him outside the house

## 📦 Whosoever Toucheth Any Thing That Was Under Him

"Any thing" has no specific name attached to it on purpose.

The law states a general principle instead of trying to list every possible object.

That kind of wording covers cases no lawgiver could predict in advance.

A named list would always miss something.

📦 Any thing covers objects with no specific name

📜 A general principle instead of a list

🧠 Broad wording covered unpredictable cases

📖 A list would always miss something

## 🖐️ He That Beareth Any Of Those Things

"Beareth" means carries.

Simply carrying an object he had used counted as contact, even without touching skin.

Distance from the object did not remove the consequence.

Holding something at arm's length still meant washing afterward.

🖐️ Beareth means carries

📦 Carrying counted, without skin contact

🚫 Distance did not avoid the consequence

📖 Contact was defined broadly on purpose

## 🧼 Hath Not Rinsed His Hands In Water

If the man touched someone without first rinsing his hands, that person became unclean.

Naming the unrinsed hands specifically implies that rinsing could lessen the effect.

That is a real, practical hygiene habit sitting inside a ritual law.

Ancient Israel's law carried a genuinely practical side, not only a symbolic one.

💧 Naming unrinsed hands implies rinsing helped

🧼 A real hygiene habit inside a ritual law

🩺 The law had a real practical side

📖 Small details reveal how the law worked

## 🏺 The Vessel Of Earth...Shall Be Broken

A clay pot he touched had to be smashed, not washed.

Unglazed clay is porous, and ancient Israel had no reliable way to fully clean something that porous.

Breaking it removed the risk instead of trying to scrub it away.

The household bore a real replacement cost for that decision.

🏺 Unglazed clay could not be fully cleaned

🔨 Broken instead of washed and reused

💰 A real replacement cost fell on the family

📖 The remedy matched what the material allowed

## 🪵 Every Vessel Of Wood Shall Be Rinsed In Water

Wood has a smoother, more sealable surface than unglazed clay.

That meant it could genuinely be cleaned by rinsing.

The law distinguishes between materials that could be cleaned and materials that could not.

It matched the remedy to the real object involved instead of applying one rule to everything.

🪵 Wood's surface could actually be cleaned

♻️ Rinsed and reused, unlike the clay pot

🧠 The remedy matched the real material

📖 Different objects earned different treatment

# Leviticus 15:13-15
# 🕊️ His Cleansing, Step By Step
---
## 7️⃣ He Shall Number To Himself Seven Days

Seven days is the same completeness number already used through Leviticus.

Chapter twelve used it for childbirth.

Chapter thirteen used it for quarantine periods.

Chapter fourteen used it for the leper's cleansing.

One consistent rhythm runs through every purification law in this book.

🔢 Seven days is Leviticus's completeness number

👶 Used already for childbirth in chapter twelve

🌿 Used for quarantine in chapter thirteen

📖 A recognizable rhythm across every purification law

## 🌊 Bathe His Flesh In Running Water

"Running water" means flowing water from a stream or spring, not water sitting still in a basin.

Chapter fourteen used the identical phrase for the leper's own cleansing.

This appears to be a higher standard than the plain washing used earlier in this chapter.

That earlier standard covered only lighter, one day uncleanness.

🌊 Running water means flowing, not standing still

🔗 The same phrase describes the leper's cleansing

📈 A higher standard than the earlier rule

📖 The bigger the uncleanness, the higher the bar

## 8️⃣ On The Eighth Day

One day past a full week shows up again and again in scripture.

Circumcision happened on the eighth day in Genesis seventeen.

Priestly ordination finished on the eighth day in Leviticus nine.

The healed leper returned on the eighth day in chapter fourteen.

A fresh start right after a complete cycle is a recurring biblical signal.

🔢 One day past a full seven day cycle

✂️ Circumcision used this marker in Genesis seventeen

🌿 The leper used it in chapter fourteen

📖 A recurring signal for a fresh start

## 🕊️ Two Turtledoves, Or Two Young Pigeons

This is the standard lower cost bird offering used throughout Leviticus.

It usually appears as a concession for people too poor to afford a lamb.

Here it is required of everyone with this condition, rich or poor.

This particular cleansing simply did not call for anything more expensive.

🕊️ The standard lower cost offering in Leviticus

💰 Usually a concession for the poor

✅ Required of everyone here, rich or poor

📖 Some cleansings never needed a costlier animal

## 🚪 Come Before The LORD Unto The Door Of The Tabernacle Of The Congregation

"Tabernacle of the congregation" means the tent of meeting, God's dwelling place at the center of Israel's camp.

This is the same doorway location used throughout Leviticus for offerings.

Arriving here marked the formal, official end of the man's uncleanness.

It was not a private decision he made on his own.

⛺ Congregation means the tent of meeting

🚪 The same location used for offerings throughout Leviticus

✅ Marked the formal end of his uncleanness

📖 Cleansing needed public confirmation, not private judgment

## ⚖️ One For A Sin Offering, And The Other For A Burnt Offering

The sin offering dealt with the specific uncleanness itself.

The burnt offering represented complete dedication back to God.

Chapter fourteen used this exact same combination and order for the healed leper.

Two different offerings did two different jobs in the very same ceremony.

⚖️ The sin offering handled the uncleanness itself

🔥 The burnt offering represented full dedication

🔗 The same combination used for the leper

📖 Two offerings did two separate jobs

# Leviticus 15:16-18
# 💧 Ordinary Bodily Emission
---
## 💧 Any Man's Seed Of Copulation Go Out From Him

"Seed of copulation" is the King James Version's plain phrase for semen.

This describes a normal, healthy bodily function, not a disease.

It is nothing like the "issue" described back in verses two and three.

Even so, it still creates a light, one day uncleanness of its own.

💧 Seed of copulation means semen, plainly stated

✅ A normal function, not a disease

🔗 Different from the issue in verses two, three

📖 Even healthy functions still needed cleansing

## 🛁 He Shall Wash All His Flesh In Water

This remedy only mentions bathing, not washing clothes first.

Earlier remedies in this chapter usually paired both steps together.

Normal reproductive function received the lightest category in the entire law.

The chapter matched the size of the remedy to the size of the condition.

🛁 This remedy names only bathing

⚖️ Earlier remedies usually paired two steps

📉 The lightest category in the whole chapter

📖 The remedy fit the size of the condition

## 👕 Every Garment, And Every Skin

"Skin" here means a leather garment or hide used for clothing or bedding.

Leather was common material across the ancient Near East.

Cloth and leather both received the identical remedy, washed and unclean until evening.

The material did not change how the law treated the object.

👕 Skin means a leather garment or hide

🛏️ A common ancient clothing and bedding material

⚖️ Cloth and leather got the identical remedy

📖 The material did not change the outcome

## 💑 The Woman Also With Whom Man Shall Lie

Normal marital relations created this same mild uncleanness for husband and wife equally.

Neither partner was singled out.

Neither was treated as though something shameful had happened.

The status simply reset itself by evening, like any ordinary bodily function.

💑 Applies equally to husband and wife

🚫 Neither partner is singled out

🌆 Resets by evening like any function

📖 Ordinary life still touched the sacred calendar

# Leviticus 15:19-24
# 🌙 A Woman's Monthly Separation
---
## 🩸 If A Woman Have An Issue, And Her Issue In Her Flesh Be Blood

This describes ordinary monthly menstruation, a normal and healthy process.

The Hebrew word behind this section is niddah, a specific technical term for this separation period.

It is not treated as an illness anywhere in this chapter.

The law simply gives it its own set of practical steps.

🩸 Describes ordinary monthly menstruation

✅ A normal process, not an illness

📜 The law gave steps, not blame

📖 The Hebrew term is niddah, a technical word

## 📅 She Shall Be Put Apart Seven Days

This is a fixed seven day period, regardless of how long her actual bleeding lasts.

Seven is the same completeness number used across Leviticus.

"Put apart" describes a ritual status at home.

It does not mean banishment from the camp the way a diagnosed leper faced in chapter thirteen.

📅 A fixed seven days, whatever the length

🔢 The same completeness number used across Leviticus

🏕️ A status at home, not banishment

📖 Ritual separation is not physical exile

## 🛏️ Every Thing That She Lieth Upon...Every Thing Also That She Sitteth Upon

This is almost the exact wording already used for the man's issue back in verses four through six.

The law applies the identical bed and seat rule to the woman.

Matching structure across both cases was a deliberate choice, not an accident.

Neither case received a harsher or looser version of the rule.

🛏️ Mirrors the man's bed and seat rule

📝 Nearly identical wording used for both

⚖️ Neither case is treated as harsher

📖 Consistency ran through the whole chapter

## 👕 Whosoever Toucheth Her Bed Shall Wash His Clothes, And Bathe Himself

This again mirrors the remedy already given for the man's bed in verse five.

Anyone in the household could be affected, not only her husband.

A child, a guest, or a servant touching her bed picked up the identical remedy.

The law made no exception based on the person's relationship to her.

👕 Mirrors verse five's remedy exactly

🏠 Applies to anyone in the household

🚫 No exception for family relationship

📖 One remedy covered every person

## 🪑 Whosoever Toucheth Any Thing That She Sat Upon

Bed and seat get named as two separate categories, not folded into one general statement.

The same two part structure already used for the man is repeated here for the woman.

Naming both separately closed any gap someone might try to argue around.

The law preferred being explicit over being brief.

🪑 Bed and seat are named separately

🔁 The same structure used for the man

🚪 Naming both closed a possible loophole

📖 Explicit wording protected the rule's intent

## 🔄 If It Be On Her Bed...When He Toucheth It

This covers a subtler case, touching an object that merely rests on her bed or seat.

It does not have to be the bed or seat itself.

Uncleanness could travel through a layer of contact, not only through direct touch.

That level of detail shows a carefully built law, not a rushed one.

🔄 Covers objects resting on her bed

📦 Uncleanness can travel through a layer

🧠 Shows a carefully built law

📖 Detail reveals real legal thought

## 🌸 Her Flowers Be Upon Him

"Flowers" is the King James Version's old English word for menstrual blood.

It comes from the word "flow," not from actual flowers.

That older usage can confuse a modern reader who has never met it before.

A man who lay with her during this time carried her uncleanness for seven days himself.

🌸 Flowers is archaic English for menstrual blood

🤔 An old usage easy to misread

⏳ He carried her uncleanness seven days too

📖 It comes from the word flow

# Leviticus 15:25-27
# ⏳ When Bleeding Runs Long
---
## 🩸 An Issue Of Her Blood Many Days Out Of The Time Of Her Separation

This describes abnormal, extended bleeding that falls outside her normal monthly cycle.

It is closer to the medical condition described for men back in verses two and three.

That case was irregular and ongoing.

A normal period, by contrast, is predictable and temporary.

🩸 Describes bleeding outside the normal cycle

🔗 Echoes the man's issue from verses two, three

⏳ Irregular and ongoing, unlike a normal period

📖 Two situations get two different names

## 🔗 All The Days Of The Issue Of Her Uncleanness Shall Be As The Days Of Her Separation

The law does not invent a new, harsher category for this extended bleeding.

It simply extends her normal monthly rules for as long as the bleeding continues.

The status stays the same.

Only the length of time changes, however unpredictable that length turns out to be.

🔗 Extends her existing rules, not new ones

⏳ Same status, unpredictable length

📜 A simple approach to an unpredictable case

📖 The law reused what already existed

## 🛏️ Every Bed Whereon She Lieth...Shall Be Unto Her As The Bed Of Her Separation

No new rule appears here either.

The bed and seat rules from verses nineteen through twenty three simply keep applying.

They apply for the entire length of the extended bleeding, however long that turns out to be.

Consistency, not a separate rulebook, handled this harder case.

🛏️ Reuses the bed and seat rules already given

⏳ Applies for the whole extended length

🔁 Consistency instead of a new rulebook

📖 The same rule handled the harder case

## 👕 Whosoever Toucheth Those Things Shall Be Unclean...Until The Even

Contact with her bed or seat during this extended period still carried the lighter consequence.

That consequence was only one evening, the same as usual, for other people.

Her own uncleanness lasted as long as the bleeding did.

Only she personally carried the extended status.

Everyone else's exposure still reset the same way it always had.

👕 Others still got the lighter one evening rule

⏳ Only she carried the extended status

⚖️ Degree of contact still determined the outcome

📖 The law scaled the consequence to the person

# Leviticus 15:28-30
# 🕊️ Her Cleansing, Mirrored
---
## 7️⃣ She Shall Number To Herself Seven Days

This is the identical seven day counting rule already given to the man back in verse thirteen.

The chapter deliberately mirrors his cleansing process with hers, step for step.

Equal treatment is built directly into the structure of the text itself.

Nobody has to argue for fairness here.

🔢 The same seven day count as verse thirteen

🪞 A deliberate mirror of his process

⚖️ Equal treatment built into the structure

📖 Fairness needed no separate argument

## 8️⃣ On The Eighth Day She Shall Take Unto Her Two Turtles, Or Two Young Pigeons

Same timing as the man's cleansing in verse fourteen.

Same offering too, with no cost difference required between the two.

The law did not ask more of a woman's cleansing than a man's, or the reverse.

Both processes cost exactly the same.

🔢 Same timing as the man's cleansing

🕊️ Same bird offering, same cost

⚖️ Neither sex paid more than the other

📖 One standard applied to both

## 🚪 Bring Them Unto The Priest, To The Door Of The Tabernacle Of The Congregation

Same location, same formal procedure already used for the man's cleansing.

Her return to full ritual participation received the same public, official ceremony his did.

Nothing about her process was quieter or less official than his.

The text gave her the identical standing.

🚪 The same location used for the man

📜 The same formal, public procedure

✅ Her return got equal ceremony

📖 Her standing matched his exactly

## ⚖️ Make An Atonement For Her Before The LORD

Word for word, this is the same two offering combination already used for the man in verse fifteen.

The text goes out of its way to give her ceremony identical wording and structure.

Neither ceremony reads as the lesser version of the other.

The repetition itself was the point.

⚖️ Same two offering combination as verse fifteen

📜 Identical wording given to both ceremonies

🚫 Neither ceremony reads as lesser

📖 Repetition made the equal treatment obvious

# Leviticus 15:31-33
# 📜 Why Any Of This Mattered
---
## ⚠️ Thus Shall Ye Separate The Children Of Israel From Their Uncleanness

This verse states the purpose of the entire chapter in plain language.

The point was never squeamishness about ordinary bodily functions.

It was keeping the community aware of anything that could compromise access to God's presence.

Every rule before this verse existed to serve that one goal.

⚠️ States the chapter's purpose plainly

🚫 Not squeamishness about bodily functions

🙏 About protecting access to God's presence

📖 Every earlier rule served this one goal

## ☠️ That They Die Not In Their Uncleanness, When They Defile My Tabernacle

This is a serious warning, not a minor inconvenience.

Israel's camp was arranged with the tabernacle at its literal center, described in Numbers two.

Uncleanness left uncorrected was pictured as a real danger to the whole camp.

It was never framed as personal embarrassment alone.

☠️ A serious warning, not a small formality

⛺ The tabernacle sat at the camp's center

⚠️ Carelessness endangered the whole camp

📖 Personal choices carried communal weight

## 🏠 My Tabernacle That Is Among Them

God calls the tabernacle His own, and describes it as sitting among the people, not apart from them.

That closeness explains why these rules existed at all.

An ordinary, physically imperfect people were living right next to God's own dwelling place.

The rules managed that proximity, not God's opinion of the people themselves.

🏠 God calls the tabernacle His own

📍 Placed physically among the people

👥 An imperfect people lived close to God

📖 The rules managed proximity, not worth

## 📋 This Is The Law Of Him That Hath An Issue

The closing verses work like a table of contents for the whole chapter.

A man's abnormal issue covered verses two through fifteen.

A man's normal emission covered verses sixteen through eighteen.

A woman's normal period and her abnormal extended bleeding covered the rest.

This summary was a deliberate structure, not filler at the end.

📋 Functions like a table of contents

🔢 Lists every case the chapter covered

🏗️ A deliberate structure, not filler

📖 Endings in Leviticus often summarize the law

## 👫 Of The Man, And Of The Woman, And Of Him That Lieth With Her

The summary names both sexes and even the sexual partner by name.

Male and female bodies received the same seriousness and the same rules throughout this chapter.

Neither sex was held to a stricter standard than the other.

The whole chapter ends the way it began, treating ordinary human bodies as worth careful, respectful law.

👫 Both sexes are named in the summary

⚖️ Same seriousness applied to both

🚫 Neither sex held to a stricter standard

📖 Ordinary bodies received careful, respectful law`.trim();

export const LEVITICUS_FIFTEEN_PERSONAL_SECTIONS = parseLeviticusFifteenRawNotes(LEVITICUS_FIFTEEN_RAW_NOTES);
