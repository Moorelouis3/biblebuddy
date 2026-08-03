export type LeviticusNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusNineRawNotes(rawText: string): LeviticusNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 9:${startVerse}` : `Leviticus 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Leviticus 9 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_NINE_RAW_NOTES = `# Leviticus 9:1-7
# 🌅 The Eighth Day Begins
---
## 🌅 On The Eighth Day

The eighth day means the very next morning after Aaron's ordination week ended.

Chapter eight already described that whole seven day ceremony in detail.

Aaron and his sons stayed at the tabernacle door the entire time.

This one morning marks Aaron's first day serving as an actual priest.

Every earlier chapter built toward this exact moment.

🌅 The eighth day means the morning after

📖 Chapter eight covered the whole ordination week

🙏 Aaron now serves as priest for real

➡️ Real priestly work starts today

## 👴 The Elders Of Israel

The elders were not simply the oldest men in each tribe.

They were the recognized leaders who represented their whole family or clan.

Moses called them specifically, not just Aaron's household.

Their presence turned this into a national event, not a private family ceremony.

👴 Elders were tribal leaders, not just old men

🇮🇱 They represented the whole nation

📢 Moses called them in specifically

➡️ This made the day a national event

## 🐂 A Young Calf For A Sin Offering

A calf is a young bull, not yet grown to full size.

Chapter eight already used a full grown bullock for Aaron's ordination offering.

This is a smaller, less costly animal than that one.

The size of the animal was never random in Leviticus.

It always matched who was making the offering and why.

🐂 A calf is a young, smaller bull

📖 Chapter eight used a bigger bullock instead

💰 A calf cost less than a bullock

➡️ Animal size always carried real meaning

## 💎 Without Blemish

Without blemish means the animal had no injury, disease, or missing part.

Every offering in Leviticus so far has carried this same requirement.

A damaged animal could not stand in for a person before God.

Only a whole, healthy body was fit to represent someone at the altar.

💎 Blemish means any injury or defect

📖 Every offering type requires this already

🎯 A damaged animal could not represent anyone

➡️ Only a whole body belonged at the altar

## 🐐 A Kid Of The Goats For A Sin Offering

A kid is a young goat, a different animal than Aaron's calf.

Chapter four already set up this pattern for sin offerings.

The animal's size and cost scaled with the offerer's position.

A priest required a costlier animal than an ordinary Israelite did.

Aaron and the people never brought the exact same offering today.

🐐 A kid is a young goat

📖 Chapter four already set this pattern

⚖️ Cost matched the offerer's position

➡️ Aaron and the people brought different animals

## 📅 Both Of The First Year

Both of the first year means each animal was under one year old.

A first year animal had not yet been worked or bred for labor.

Young, healthy animals were considered the most valuable kind of offering.

Freshness mattered as much as size when choosing a sacrifice.

📅 Under one year old, not fully grown

💎 Young animals were the most valuable

🐑 Not yet worked or bred

➡️ Freshness mattered as much as size

## 🤝 A Bullock And A Ram For Peace Offerings

This is a third offering type, joining the sin offering and burnt offering already listed.

Chapter three already explained the peace offering as a shared meal.

The altar, the priests, and the offering family each received a share.

All three offering types appear together on this one single day.

🤝 A third offering type joins the list

📖 Chapter three explained this as a meal

🍽️ The altar, priests, and family all shared

➡️ Three offering types appear on one day

## 🫒 A Meat Offering Mingled With Oil

Meat offering is the old English name for a grain offering, not animal meat.

Chapter two already laid out this offering's basic recipe.

Mingled with oil means the flour was mixed with oil before baking.

Oil added richness to what was really a bread and flour gift.

🫒 Meat offering here means grain, not flesh

📖 Chapter two already gave this recipe

🍞 Oil was mixed into the flour

➡️ This was a bread gift, not meat

## ✨ For To Day The LORD Will Appear Unto You

This is the promise driving the entire chapter.

God himself is about to visibly show up before the whole nation.

Nothing like this has happened since the tabernacle instructions were first given.

Every offering listed above was building toward this one moment.

✨ God promises to appear this exact day

🎬 Every offering built toward this moment

📖 Nothing this direct had happened before

➡️ The whole chapter points to today

## 👥 All The Congregation Drew Near

The people did not watch from a distance.

They physically moved in close to the tabernacle entrance together.

This was not a ceremony seen from far off.

The crowd wanted to be near enough to witness everything directly.

This closeness sets up their reaction later in the chapter.

👥 The whole community moved in close

👀 They wanted to witness this directly

🚪 This happened right at the entrance

➡️ Their closeness matters again later in the chapter

## 📜 This Is The Thing Which The LORD Commanded

Moses used this same phrase back in chapter eight when introducing Aaron's ordination.

Repeating it here reminds everyone that today traces back to God's own instruction.

Nothing about this ceremony came from Moses or Aaron's own idea.

The whole nation hears that this order comes from God alone.

📜 This exact phrase already appeared in chapter eight

🔁 It reminds everyone this is not improvised

⚖️ God commanded it, not Moses or Aaron

➡️ The people hear where the order comes from

## 👑 The Glory Of The LORD Shall Appear Unto You

Glory here does not mean fame or honor the way the word is used today.

The Hebrew word is kabod, meaning weight or heaviness.

It describes God's own visible presence, something people could actually see.

This is the specific event the whole chapter has been building toward.

👑 Glory means God's visible, felt presence

🈵 The Hebrew word kabod means weight

👁️ The people could actually witness this

➡️ The whole chapter builds toward this moment

## 🙏 Make An Atonement For Thyself, And For The People

Aaron has to deal with his own sin before he can act for anyone else.

A priest who has not been cleansed himself has nothing to offer others.

The order here is deliberate.

Self comes first, then the whole nation follows.

🙏 Aaron atones for himself first

🔢 Self comes before the whole nation

⚖️ An unclean priest could not represent others

➡️ Order reveals what holiness requires

# Leviticus 9:8-11
# 🩸 Aaron's Sin Offering For Himself
---
## 🙋 Which Was For Himself

This is the first sacrifice Aaron performs as an actual working priest.

Chapter eight was entirely Moses acting on Aaron's behalf.

Here, for the first time, Aaron acts for himself.

It begins with his own need for atonement, not the people's.

🙋 Aaron's very first act as a priest

🔄 Moses acted for him in chapter eight

🙏 Now Aaron atones for his own sin

➡️ His own need comes before the people's

## 🤝 The Sons Of Aaron Brought The Blood Unto Him

Aaron's sons already took supporting roles back in chapter eight.

Here they continue that same role, carrying the blood to Aaron.

Aaron does not perform every single step completely alone.

This teamwork previews how the whole priesthood will function going forward.

🤝 Aaron's sons take an active role

🩸 They carry the blood to Aaron

👨‍👦 Aaron does not work entirely alone

➡️ This previews how the priesthood will work

## ☝️ Put It Upon The Horns Of The Altar

Horns refers to the four corner projections built onto the altar.

Chapter four already described this exact finger applied method for a sin offering.

Aaron dips his finger and touches blood onto each horn.

The method does not change just because Aaron performs it instead of Moses.

☝️ Horns means the altar's corner projections

📖 Chapter four already described this method

🩸 Aaron dips his finger to apply it

➡️ Aaron now does what Moses did before

## ⬇️ Poured Out The Blood At The Bottom Of The Altar

This is a separate step from the finger applied blood on the horns.

The remaining blood was simply poured out at the altar's base.

This was not a repeat of the first application.

Chapter four already set this exact two step pattern for sin offerings.

⬇️ A separate step from the horns

🩸 The rest of the blood was poured

🔁 Not a repeat of the first step

➡️ Chapter four already set this pattern

## 🫀 The Fat, And The Kidneys, And The Caul Above The Liver

This is the same specific fat parts chapter four already required for sin offerings.

Caul above the liver refers to the fatty covering over that organ.

These particular pieces went straight onto the altar fire.

The same list is used every single time this offering type appears.

🫀 The same fat parts chapter four required

🔥 These pieces went onto the altar fire

🔁 A consistent list across every sin offering

➡️ Nothing here was left to guesswork

## ✅ As The LORD Commanded Moses

This obedience formula repeats throughout chapters eight and nine.

It now describes Aaron's own independent actions, not Moses relaying instructions.

Aaron follows the exact same pattern Moses already modeled.

Nothing here was left to Aaron's personal judgment.

✅ This formula repeats across chapters eight and nine

🙋 It now describes Aaron's own actions

📖 Aaron follows the exact pattern Moses set

➡️ Nothing was left to personal judgment

## 🔥 He Burnt With Fire Without The Camp

Without the camp means outside the area where Israel actually lived.

Aaron had no other ordained priest yet to eat a priestly portion of his own offering.

The entire animal, meat and hide both, was destroyed outside instead.

Chapter eight already used this same rule for the ordination bullock.

🔥 The whole animal was destroyed, none eaten

🏕️ Without the camp means outside Israel's living area

🔁 Chapter eight already used this same rule

➡️ No priest yet existed to eat this portion

# Leviticus 9:12-14
# 🔥 Aaron's Burnt Offering For Himself
---
## 🤝 Aaron's Sons Presented Unto Him The Blood

The same teamwork from the sin offering continues here.

Aaron's sons hand off blood from this second animal, the ram.

This keeps the same working rhythm from just a few verses earlier.

A consistent pattern is forming across every sacrifice in this chapter.

🤝 The same pattern continues from before

🐑 This time the blood comes from the ram

🔁 A steady rhythm forms across the chapter

➡️ Teamwork defines how this priesthood works

## ➰ Sprinkled Round About Upon The Altar

Round about means splashed generally across every side of the altar.

Chapter one already set this exact method for burnt offerings.

This is clearly different from the horns only method just used on the sin offering.

➰ Round about means splashed on all sides

📖 Chapter one already set this method

🔀 Different from the sin offering's horns only method

➡️ Each offering type used its own method

## 🔪 The Pieces Thereof, And The Head

Burnt offerings were butchered into sections before burning.

Unlike some other offering types, the head itself was included here.

Nothing about this ram was set apart or excluded.

Every part of this animal was headed for the fire.

🔪 The animal was cut into sections

👤 The head was burned too, not set apart

🔥 Every piece was headed for the fire

➡️ Nothing about this offering was held back

## 💧 Wash The Inwards And The Legs

This whole animal was about to be burned completely anyway.

Its internal organs and legs still had to be washed first.

Chapter one already required this exact step for burnt offerings.

Cleanliness mattered even for an animal about to be destroyed.

💧 Washing happened even though it would burn

📖 Chapter one already required this step

🧼 Cleanliness mattered regardless of final use

➡️ Even a burnt offering had to be clean

## 🔥 Burnt Them Upon The Burnt Offering On The Altar

The sin offering only burned certain fat portions on the altar.

The rest of that animal was destroyed elsewhere, outside the camp.

This entire ram instead went into the fire on the altar.

Total consumption is what makes this a true burnt offering.

🔥 The whole ram was consumed on the altar

🚫 Nothing from this offering was saved

📖 The sin offering worked differently

➡️ Total consumption defines a burnt offering

# Leviticus 9:15-17
# 🐐 Offerings For The People
---
## 🔄 He Brought The People's Offering

Aaron already dealt with his own sin and his own devotion first.

Now he turns to represent the whole nation.

This shift matches the exact order Moses laid out back in verse seven.

Self came first, then everyone else.

🔄 Aaron shifts from himself to the people

📖 This matches the order set in verse seven

🙏 Self first, then everyone else

➡️ The same pattern holds through the chapter

## 🐐 The Goat, Which Was The Sin Offering For The People

This is the same young goat first named back in verse three.

Moses gave the people this exact instruction at the start of the chapter.

What was promised there is finally carried out here.

The people's offering matches their rank, just as chapter four required.

🐐 The exact animal instructed in verse three

✅ A promise from earlier, now fulfilled

⚖️ Goat matches the people's rank

➡️ Every detail was planned in advance

## 🔁 As The First

As the first points back to Aaron's own sin offering just completed.

The exact same procedure applies here, blood application included.

The text avoids repeating a full description it already gave.

Same steps, same care, now applied to the people's animal.

🔁 Refers back to Aaron's own offering

📖 The same procedure applies again

✍️ The text saves space by not repeating

➡️ Same care now given to the people

## 📏 According To The Manner

The manner means the standard procedure already established earlier.

This burnt offering followed the same rules chapter one already laid out.

The text does not need to spell out every step again.

Repetition would only slow down an already long chapter.

📏 The manner means the standard procedure

📖 Chapter one already laid out these rules

✍️ The text saves space here

➡️ Familiar steps did not need repeating

## ✋ An Handful Thereof

Only a small handful of grain was actually burned on the altar.

Chapter two already explained that the rest went to the priests as food.

Nothing here was wasted or destroyed.

A small token portion represented the whole gift.

✋ Just a handful was burned

📖 Chapter two explained where the rest went

🍞 Nothing here was wasted

➡️ A small portion represented the whole gift

## 🌅 Beside The Burnt Sacrifice Of The Morning

A regular daily burnt offering was still happening even during this special ceremony.

This sacrifice happened every single morning, occasion or not.

Numbers twenty eight later describes this ongoing practice in full detail.

Ordinary faithfulness kept running underneath this one extraordinary day.

🌅 A daily sacrifice ran in the background

🔁 It happened every morning regardless of events

📖 Numbers twenty eight later spells this out fully

➡️ Ordinary faithfulness underlies this extraordinary day

# Leviticus 9:18-21
# 🤝 The Peace Offering For The People
---
## 🐂 A Sacrifice Of Peace Offerings

Two animals made up the people's peace offering, a bullock and a ram.

This matches the exact pair Moses specified back in verse four.

This is the third and final offering type completed in the chapter.

Peace offerings became a shared meal, unlike the other two types.

🐂 Two animals, as promised in verse four

🥉 The third and final offering type today

🍽️ Peace offerings became a shared meal

➡️ A different purpose than the other two

## ➰ Sprinkled Upon The Altar Round About

This is the same blood method already used for the burnt offering.

Aaron's sons keep handing off blood through every single sacrifice today.

A steady rhythm of teamwork runs through this entire chapter.

Nothing about the process changes from one offering to the next.

➰ The same method as the burnt offering

🤝 Aaron's sons keep assisting throughout

🔁 A steady rhythm runs through the chapter

➡️ The process never changes between offerings

## 🐑 The Rump

Rump refers to the fat tail carried by certain sheep breeds.

In the ancient Near East, this fat tail could weigh several pounds.

It was considered a genuine delicacy at the time.

It was valuable enough to be named specifically here, not simply assumed.

🐑 A reference to a sheep's fat tail

⚖️ These tails could weigh several pounds

💎 Considered a real delicacy back then

➡️ Valuable enough to be named on purpose

## 🍽️ Put The Fat Upon The Breasts

Before burning, the fat was arranged directly on the breast portions.

This staging step happens before both the burning and the waving described next.

Presentation mattered here, not only the burning itself.

Every step in this ceremony followed a fixed order.

🍽️ The fat was arranged on the breasts first

➡️ This came before burning and waving

🎯 Presentation mattered, not just the burning

📖 Every step followed a fixed order

## 💪 The Breasts And The Right Shoulder Aaron Waved

This wave offering gesture was already explained back in chapter seven.

Waving marked these portions as reserved for the priests to eat.

For the very first time, Aaron receives this portion himself.

Moses kept this portion back in chapter eight's ordination instead.

💪 A side to side gesture from chapter seven

🍖 These portions became the priest's own food

🔀 Aaron receives it himself for the first time

➡️ Moses held it back in chapter eight instead

## ✅ As Moses Commanded

This same obedience formula runs through the entire chapter.

It confirms that even this small detail followed exact instruction.

Nothing about which portion went to which person was left open.

Every choice in this ceremony traced back to God's own command.

✅ The same formula recurs across the chapter

🍖 Even food portions followed a fixed rule

📏 Nothing here was left to preference

➡️ Every detail traced back to God's command

# Leviticus 9:22-24
# ✨ Fire From The LORD
---
## 🙌 Lifted Up His Hand Toward The People, And Blessed Them

This is the first priestly blessing ever recorded in the Bible.

Numbers six later gives this same role a detailed formula.

Aaron is not simply finishing his sacrifices here.

He is stepping into a brand new function no one has performed before.

🙌 The first priestly blessing in the Bible

📖 Numbers six later gives this a formula

🎬 A brand new function, never performed before

➡️ Aaron steps into a new role here

## ⬇️ Came Down From Offering

The altar had a ramp or raised platform built onto it.

Came down is a literal, physical description, not a figure of speech.

Aaron is stepping down after finishing all three offerings today.

Sin, burnt, and peace offerings are now all fully complete.

⬇️ A literal description, not a figure of speech

📐 The altar had a raised platform

✅ All three offerings are now complete

➡️ Aaron physically steps down from the altar

## 🚪 Moses And Aaron Went Into The Tabernacle

Scripture does not explain exactly why they went inside at this moment.

It might have been for further instruction, or simply to complete an unstated step.

It is honest to say the text does not spell out every reason.

Moses and Aaron do this together, not Aaron alone.

🚪 The exact reason is not explained

❓ It is honest to admit that gap

🤝 Moses and Aaron do this together

➡️ Not every detail gets spelled out

## 🙌 Came Out, And Blessed The People

This is a second blessing, separate from the one Aaron gave alone in verse twenty two.

This time Moses and Aaron bless the people together.

It happens right after they step out of the tabernacle.

Two blessings bracket this entire closing scene.

🙌 A second blessing, separate from verse twenty two

🤝 Moses and Aaron bless the people together

🚪 It happens right after they exit

➡️ Two blessings frame this closing scene

## 👑 The Glory Of The LORD Appeared Unto All The People

This is the exact promise made back in verses four and six.

After all the buildup across this whole chapter, God's presence finally appears.

The whole nation now witnesses it together, not just Aaron's family.

This is the moment the entire chapter has been building toward.

👑 The promise from verses four and six

✨ God's presence becomes visibly real

👥 The whole nation witnesses this together

➡️ This moment is the chapter's whole point

## 🔥 There Came A Fire Out From Before The LORD

No human hand lit this fire.

It came directly from God himself, instantly confirming the offerings were accepted.

This same phrase, fire from before the LORD, appears again in the very next chapter.

That next appearance happens under very different circumstances.

🔥 No human hand lit this fire

✅ It confirmed instant acceptance of the offerings

⚠️ The same phrase returns in chapter ten

➡️ That next time looks very different

## 🍖 Consumed Upon The Altar The Burnt Offering And The Fat

This fire did not just symbolically touch the offering.

It fully consumed the burnt offering and the leftover fat still on the altar.

This closes out every single sacrifice performed earlier in the chapter.

Nothing remained once the fire finished its work.

🍖 The fire fully consumed what remained

🎯 Both the burnt offering and the fat

🎬 This closes out the whole chapter's sacrifices

➡️ Nothing was left once the fire finished

## 😲 They Shouted, And Fell On Their Faces

The people react with two things happening at once.

A loud shout, most likely one of joy and awe.

Falling face down was the standard posture of worship in this culture.

This response closes the chapter on a note of pure awe.

😲 A shout, most likely joy and awe

🙇 Falling face down was standard worship

🎬 This closes the chapter on that note

📖 God's visible presence deserved this response
`.trim();

export const LEVITICUS_NINE_PERSONAL_SECTIONS = parseLeviticusNineRawNotes(LEVITICUS_NINE_RAW_NOTES);
