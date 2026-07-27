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

Chapter 8 ended with Aaron and his sons spending seven full days at the tabernacle door, staying inside its boundary the entire time as part of their ordination. The eighth day is the very next morning after that week ends - the first day Aaron actually begins working as a priest instead of just being consecrated as one.

🌅 This is the day right after chapter 8's seven-day wait

🎬 Ordination is finished; actual priestly work starts now

📖 Everything in this chapter is a genuine "first"

---

## 👴 The Elders Of Israel

Moses calls together more than just Aaron's family this time. The elders were the recognized heads of Israel's tribes and clans, the leaders who represented the whole nation in official matters.

👴 Elders were tribal and clan leaders, not just old men

🇮🇱 They stood in for the whole nation at this moment

📢 Their presence made this an official, national event

---

## 🐂 Take Thee A Young Calf For A Sin Offering

A calf is a young bull, smaller and less costly than the full-grown bullock offered on Aaron's behalf back in chapter 8's ordination ceremony. This is Aaron's very own personal sin offering, made once he's actually standing in the role of priest.

🐂 A calf is a young, less costly bull

🔀 A different animal size than chapter 8's ordination bullock

🙋 This offering belongs to Aaron personally, as priest

---

## 🐑 And A Ram For A Burnt Offering, Without Blemish

"Without blemish" means no injury, disease, deformity, or missing part - a requirement already given for every kind of offering earlier in Leviticus. Nothing damaged or imperfect could represent someone before God.

🐑 "Without blemish" means completely free of defect

📖 This rule already applies to every offering type so far

🎯 Only a whole, undamaged animal could stand in for a person

---

## 🐐 A Kid Of The Goats For A Sin Offering

Notice the people's sin offering uses a different animal than Aaron's - a young goat instead of a calf. Chapter 4 already set up this exact pattern: the animal's cost and size scaled with the offerer's position, a priest requiring a larger, costlier animal than an ordinary Israelite.

🐐 The people offer a goat; Aaron offered a calf

📖 Chapter 4 already established this cost-by-rank pattern

⚖️ A priest's higher position required a costlier sin offering

---

## 📅 Both Of The First Year

This means both animals had to be under a year old - young, healthy, and not yet worked or bred. A first-year animal represented the freshest, most valuable state a sacrifice could be given in.

📅 Under one year old, not fully grown adult animals

💎 Young animals were considered the most valuable offerings

🎯 Freshness and full health mattered more than size

---

## 🐂 A Bullock And A Ram For Peace Offerings

Between the sin offering and burnt offering already listed, the people also bring animals for a peace offering - the fellowship meal offering explained back in chapter 3, shared between the altar, the priests, and the offerer's own family.

🐂 A third offering type, alongside sin and burnt offerings

🍽️ Peace offerings became a shared meal, per chapter 3

🎉 All three offering types appear together on this one day

---

## 🫒 A Meat Offering Mingled With Oil

"Meat offering" is the old English term for a grain offering, already explained in chapter 2 - it doesn't mean animal meat at all. Mixing in oil was part of its standard recipe, adding richness to what was essentially a bread-and-flour gift.

🫒 "Meat offering" here means a grain offering, not animal flesh

📖 Chapter 2 already laid out this offering's basic recipe

🍞 Oil was mixed in as part of its standard preparation

---

## ✨ For To Day The LORD Will Appear Unto You

This is the promise driving the entire chapter - after all the buildup of chapters 1 through 8, God himself is about to visibly show up in front of the whole nation. Nothing like this has happened since the instructions for the tabernacle were first given.

✨ God's own visible appearance is promised for this exact day

🎬 Every offering in this chapter builds toward that moment

📖 Nothing this direct has happened since the tabernacle's instructions began

---

## 👥 All The Congregation Drew Near

The entire community physically moved closer to the tabernacle entrance rather than staying at a distance. This wasn't a ceremony watched from far off - the people wanted to be near enough to see it happen.

👥 The whole community moved in close, not just Aaron's family

👀 They wanted to be near enough to witness everything directly

🎬 This sets up the crowd that will react in verse 24

---

## 📜 This Is The Thing Which The LORD Commanded

Moses used this exact phrase back in chapter 8 when introducing Aaron's ordination to the crowd. Repeating it here reminds everyone that today's ceremony, like that one, traces back to God's own instruction, not anything Moses or Aaron invented.

📜 This exact phrase already appeared once, back in chapter 8

🔁 It reminds the crowd this ceremony isn't improvised

⚖️ Divine command, not human decision, stands behind it

---

## 👑 The Glory Of The LORD

"Glory" (Hebrew kabod) doesn't mean fame or honor the way the English word usually suggests today. It describes God's own visible weight and presence - something people could actually see and experience, not just an abstract idea.

👑 "Glory" means God's visible, felt presence, not just honor

👁️ This was something the people could actually witness

🎯 It's the specific event the whole chapter has been building toward

---

## 🙏 Make An Atonement For Thyself, And For The People

Before Aaron can do anything on behalf of the nation, he has to deal with his own sin first. A priest who hasn't been cleansed himself has nothing to offer anyone else - the order here, self first, then others, matters.

🙏 Aaron must atone for his own sin before anyone else's

🔢 The order is deliberate: self first, then the people

⚖️ An unclean priest couldn't represent a clean people

# Leviticus 9:8-11

# 🩸 Aaron's Sin Offering For Himself

---

## 🙋 Which Was For Himself

This is the first sacrifice Aaron performs as an actual functioning priest, and it's for his own sin, not the people's. Chapter 8 was entirely about Moses acting on Aaron's behalf; here, for the first time, Aaron acts himself.

🙋 Aaron's very first act as a working priest

🔄 Chapter 8 was Moses acting for Aaron; now Aaron acts himself

🙏 It starts with his own need for atonement, not the people's

---

## 🤝 The Sons Of Aaron Brought The Blood Unto Him

Aaron's sons already stepped into supporting roles back in chapter 8, and they continue that here - catching and carrying the blood to Aaron rather than Aaron doing every single step alone.

🤝 Aaron's sons take an active supporting role, not a passive one

🩸 They carry the blood to Aaron rather than him collecting it

👨‍👦 This teamwork previews how the priesthood will function going forward

---

## ☝️ Dipped His Finger, And Put It Upon The Horns Of The Altar

This is the same precise, finger-applied blood method chapter 4 already established for a sin offering, applied to the altar's corner projections known as "horns." The method doesn't change just because Aaron himself is now performing it instead of Moses.

☝️ The same finger-application method chapter 4 already described

📐 "Horns" refers to the altar's corner projections

🔁 Aaron now performs a method Moses used exclusively before

---

## ⬇️ Poured Out The Blood At The Bottom Of The Altar

After the precise finger application, the rest of the blood was simply poured out at the altar's base - a second, separate disposal step, not a repeat of the first.

⬇️ A separate step from the finger-applied blood on the horns

🩸 The remaining blood was poured, not dabbed or sprinkled

📖 This matches the standard sin-offering procedure already used in chapter 4

---

## 🫀 The Fat, And The Kidneys, And The Caul Above The Liver

This is the identical fat-portion list required for sin offerings back in chapter 4 - the same specific internal parts, burned on the altar every time this offering type is used.

🫀 The same specific fat parts chapter 4 already required

🔥 These pieces went straight onto the altar fire

🔁 A consistent list used across every sin offering so far

---

## 🔥 The Flesh And The Hide...Without The Camp

Since Aaron had no other ordained priest yet to eat a priestly portion of his own sin offering, the entire animal - meat and skin both - was destroyed outside the camp instead, matching the same rule chapter 8 already used for the ordination bullock.

🔥 The whole animal was destroyed, none of it eaten

🏕️ "Without the camp" means outside where Israel actually lived

🔁 This matches chapter 8's handling of the ordination bullock

---

## ✅ As The LORD Commanded Moses

This familiar obedience formula, repeated throughout chapters 8 and 9, now applies to Aaron's own independent actions - not just Moses relaying instructions, but Aaron himself following them exactly.

✅ The same recurring formula from chapter 8, used again here

🙋 It now describes Aaron's own actions, not just Moses's

📖 Nothing here was left to Aaron's personal judgment

# Leviticus 9:12-14

# 🔥 Aaron's Burnt Offering For Himself

---

## 🙏 Aaron's Own Burnt Offering

Back in chapter 8, this same kind of offering was made on Aaron's behalf by Moses. Here, Aaron offers his own devotion himself for the first time - the sin offering dealt with his guilt, and this burnt offering now expresses his complete surrender to God.

🙏 Aaron performs his own devotion offering, not Moses

🔀 The sin offering handled guilt; this one expresses full surrender

🔁 The same two-offering pattern from chapter 8, now self-performed

---

## 🤝 Aaron's Sons Presented Unto Him The Blood

The same teamwork from the sin offering continues here - Aaron's sons hand off the blood from this second animal, the ram, keeping the same working rhythm established just a few verses earlier.

🤝 The same sons-assist-Aaron pattern continues from verse 9

🐑 This time the blood comes from the burnt offering ram

🔁 A consistent rhythm forms across each sacrifice in the chapter

---

## 🩸 Sprinkled Round About Upon The Altar

"Round about" means splashed generally across every side of the altar - the standard burnt-offering blood method from chapter 1, clearly different from the horns-only technique just used on the sin offering.

🩸 "Round about" means splashed on all sides of the altar

📖 This matches chapter 1's standard burnt-offering procedure

🔀 A clear contrast from the sin offering's horns-only blood

---

## 🔪 The Pieces Thereof, And The Head

Burnt offerings were butchered into sections before burning, and unlike some other offering types, the head itself was included and burned along with the rest - nothing set aside.

🔪 The animal was cut into sections before burning

👤 The head was burned too, not set apart or excluded

🔥 Every part of this ram was headed for the fire

---

## 💧 Washed The Inwards And The Legs

Even though this entire animal was about to be burned completely, its internal organs and legs still had to be washed first - the same requirement chapter 1 already gave for any burnt offering.

💧 Washing happened even though everything would be burned anyway

📖 Chapter 1 already required this exact step for burnt offerings

🧼 Cleanliness mattered regardless of an animal's final use

---

## 🔥 Burnt Them Upon The Burnt Offering On The Altar

Unlike the sin offering, where only certain fat portions burned and the rest was destroyed elsewhere, this entire ram went into the fire on the altar - a complete, total offering with nothing held back.

🔥 The whole ram was consumed on the altar, not just its fat

🚫 Nothing from this offering was set aside or saved

📖 This total consumption is what makes it a true burnt offering

# Leviticus 9:15-17

# 🐐 Offerings For The People

---

## 🔄 He Brought The People's Offering

Having dealt with his own sin and devotion first, Aaron now turns to represent the nation. This shift - from offering for himself to offering for everyone else - is exactly the order Moses laid out back in verse 7.

🔄 Aaron shifts from his own offerings to the people's

📖 This matches the order Moses gave back in verse 7

🙏 Self first, then others - the same pattern as before

---

## 🐐 The Goat, Which Was The Sin Offering For The People

This is the same young goat first named back in verse 3, when Moses gave the people their offering instructions. What was promised then is finally carried out here.

🐐 The exact animal instructed back in verse 3

✅ A promise from earlier in the chapter, now fulfilled

🔁 Same species pattern already explained: goat for the people

---

## 🔁 As The First

This phrase points back to Aaron's own sin offering just completed - the same exact procedure, blood application and all, is repeated here for the people's goat instead of being described all over again.

🔁 Refers back to Aaron's own sin offering, just finished

📖 The text avoids repeating a full procedure it already gave

🎯 Same steps, same care, now applied to the people's animal

---

## 📏 According To The Manner

"The manner" means the standard, already-established procedure - a short way of saying this burnt offering followed the same rules chapter 1 already laid out, without needing to spell them out again.

📏 A short reference to rules already given earlier

📖 Points back to chapter 1's burnt offering procedure

✍️ The text saves space by not repeating known steps

---

## ✋ An Handful Thereof

Only a small handful of the grain offering was actually burned on the altar as God's own token portion - chapter 2 already explained that the rest went to the priests as food, not wasted or destroyed.

✋ Just a handful was burned, not the whole grain offering

📖 Chapter 2 already explained where the remainder went

🍞 A small token portion represented the whole gift

---

## 🌅 Beside The Burnt Sacrifice Of The Morning

This is a brief but important detail: a regular daily burnt offering, offered every single morning regardless of any special occasion, was still happening in the background even during this once-in-a-lifetime ceremony. This ongoing morning sacrifice becomes a fixed, permanent practice described more fully later in the Bible, in Numbers 28.

🌅 A regular daily sacrifice, separate from today's special event

🔁 It happened every morning, ceremony or not

📖 Numbers 28 later spells out this ongoing daily practice in full

# Leviticus 9:18-21

# 🤝 The Peace Offering For The People

---

## 🐂 The Bullock And The Ram For A Sacrifice Of Peace Offerings

Two animals, not one, made up the people's peace offering - matching the pair already specified back in verse 4. This is the third and final offering type completed in the chapter, after the sin offering and burnt offering.

🐂 Two animals: a bullock and a ram, as promised in verse 4

🥉 The third and last offering type completed in this chapter

🍽️ Peace offerings became a shared meal, unlike the other two types

---

## 🤝 Aaron's Sons Presented Unto Him The Blood

The same assisting role from earlier in the chapter continues for this third offering - Aaron's sons keep handing off blood to Aaron throughout every single sacrifice performed today.

🤝 The same supporting role repeats for a third time today

🩸 Blood-carrying duties stayed consistent across every offering

🔁 A steady rhythm of teamwork runs through the whole chapter

---

## 🐑 The Rump

"Rump" refers to the fat tail of certain sheep breeds common in the ancient Near East, which could weigh several pounds and was considered a genuine delicacy - valuable enough to be listed by name among the fat portions given to God.

🐑 A reference to the fat tail of certain sheep breeds

⚖️ These fat tails could weigh several pounds

💎 It was valuable enough to be named specifically, not just assumed

---

## 🫀 The Fat Of The Bullock And Of The Ram

This is the same specific fat-portion list - covering the inner fat, kidneys, and liver covering - already required for peace offerings back in chapters 3 and 7. The list doesn't change based on the occasion.

🫀 The same fat list already required in chapters 3 and 7

📖 A consistent set of portions across every peace offering

🔥 These parts always went to the altar fire, never eaten

---

## 🍽️ Put The Fat Upon The Breasts

Before burning, the fat was staged and arranged directly on top of the breast portions - a specific presentation step that happens before the burning and the waving described in the next verse.

🍽️ The fat was arranged on the breast portions first

➡️ This staging step comes before both burning and waving

🎯 Presentation mattered, not just the burning itself

---

## 〰️ The Breasts And The Right Shoulder Aaron Waved

This wave offering gesture, already explained back in chapter 7, marks these specific portions as reserved for the priests to eat as their own food. For the very first time, Aaron receives this portion himself, rather than Moses keeping it as happened back in chapter 8.

〰️ A side-to-side gesture already explained in chapter 7

🍖 These portions were the priest's own personal food

🔀 Aaron receives it himself now, unlike chapter 8's ordination

---

## ✅ As Moses Commanded

The chapter's recurring obedience formula appears once more here, confirming that even this final detail - which portions went to which person - followed exact instruction rather than being left to Aaron's own preference.

✅ The same obedience formula that runs through this whole chapter

🍖 Even food-portion details followed a fixed rule

📖 Nothing here was left to personal preference

# Leviticus 9:22-24

# ✨ Fire From The LORD

---

## 🙌 Aaron Lifted Up His Hand, And Blessed Them

This is the first priestly blessing ever given in the Bible - a formal role that gets spelled out in much more detail later, in Numbers 6. Aaron isn't just finishing his sacrifices; he's stepping into a completely new function no one has performed before.

🙌 The very first priestly blessing recorded in the Bible

📖 Numbers 6 later gives this same role a detailed formula

🎬 A brand-new function, never performed by anyone before this

---

## ⬇️ Came Down From Offering

The altar had a ramp or elevated approach, so "came down" is a literal, physical description - Aaron stepping down from the altar's platform after finishing all three offerings: sin, burnt, and peace.

⬇️ A literal physical description, not just a figure of speech

📐 The altar had a raised platform Aaron had been standing on

✅ This marks the moment all three offerings were fully complete

---

## 🚪 Moses And Aaron Went Into The Tabernacle

Scripture doesn't explain exactly why the two of them went inside at this specific moment - possibly for further instruction, prayer, or simply to complete some part of the ceremony not otherwise described. It's honest to say the text doesn't spell out every reason.

🚪 The exact reason for going inside isn't explained in the text

❓ It's honest to admit this detail isn't fully spelled out

🤝 Moses and Aaron do this together, not Aaron alone

---

## 🙌 Came Out, And Blessed The People

This is a second blessing, separate from the one Aaron gave alone back in verse 22 - this time Moses and Aaron bless the people together, right after coming out of the tabernacle.

🙌 A second blessing, distinct from the one in verse 22

🤝 This time Moses and Aaron bless the people jointly

🚪 It happens immediately after they exit the tabernacle

---

## 👑 The Glory Of The LORD Appeared Unto All The People

This is the exact promise made back in verses 4 and 6 finally coming true. After all the buildup across this whole chapter, God's visible presence actually shows up in front of the entire nation.

👑 The promise from verses 4 and 6 is fulfilled here

✨ God's presence becomes visibly real to everyone watching

🎬 This is the moment the whole chapter has been building toward

---

## 🔥 There Came A Fire Out From Before The LORD

This fire wasn't lit by any human hand - it came directly from God himself, instantly and visibly confirming that everything Aaron had just done was fully accepted. This same phrase, "fire from before the LORD," will appear again in the very next chapter, under very different circumstances.

🔥 No human lit this fire; it came directly from God

✅ It confirmed instant, visible acceptance of the offerings

⚠️ The same phrase returns in chapter 10, under very different circumstances

---

## 🍖 Consumed Upon The Altar The Burnt Offering And The Fat

The fire didn't just symbolically touch the offering - it fully consumed the burnt offering and the remaining fat portions still on the altar, finishing off everything that had been building throughout the entire ceremony.

🍖 The fire fully consumed what remained on the altar

🎯 Both the burnt offering and the leftover fat were consumed

🎬 This closes out every sacrifice performed earlier in the chapter

---

## 😲 They Shouted, And Fell On Their Faces

The people's reaction combined two things at once: a loud shout, most likely of joy and awe, and immediately falling face-down on the ground, the standard posture of worship before God's realized presence.

😲 A shout, most likely one of joy and awe, not fear alone

🙇 Falling on their faces was the standard posture of worship

🎬 This response closes the chapter on a note of pure awe`;

export const LEVITICUS_NINE_PERSONAL_SECTIONS = parseLeviticusNineRawNotes(LEVITICUS_NINE_RAW_NOTES);
