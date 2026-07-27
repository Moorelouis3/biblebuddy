export type LeviticusEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusEightRawNotes(rawText: string): LeviticusEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 8:${startVerse}` : `Leviticus 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Leviticus 8 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_EIGHT_RAW_NOTES = `# Leviticus 8:1-5

# 🎬 The Ordination Begins

---

## 👑 Take Aaron And His Sons With Him

Aaron was already chosen as high priest and his sons as priests back in Exodus 28, long before this chapter. This verse is the moment that plan finally gets carried out - Leviticus 8 is the actual ceremony, not a new decision.

👑 Aaron's role was already chosen back in Exodus 28

🎬 This chapter finally carries out that earlier plan

📖 Nothing here is a new decision, only its fulfillment

---

## 👘 And The Garments

The special priestly clothing - coat, robe, ephod, breastplate, and more - was designed and made back in Exodus 28. Those garments have been sitting ready, waiting for this exact ceremony to put them on for the first time.

👘 These garments were designed back in Exodus 28

⏳ They had been finished and waiting for this day

🎯 Chapter 8 is their first real use

---

## 🫗 The Anointing Oil

This is the special oil God gave Moses the recipe for in Exodus 30:22-25 - a specific blend of spices and olive oil, reserved only for consecrating priests, the tabernacle, and its furnishings, never for ordinary use.

🫗 This oil follows the exact recipe from Exodus 30

🚫 It was never allowed for common, everyday use

✨ Its whole purpose was setting people and things apart for God

---

## 🐂 A Bullock For The Sin Offering, And Two Rams

Three animals in total. The bullock deals with sin, matching the sin offering procedure from chapter 4. The two rams will be used differently from each other later in the chapter - one as a burnt offering, one with a special name of its own.

🐂 Three animals total: one bullock, two rams

🔁 The bullock's role matches chapter 4's sin offering

🐑 The two rams get two completely different jobs later on

---

## 🍞 A Basket Of Unleavened Bread

Unleavened (no yeast) bread appears throughout Leviticus wherever something touches the altar fire, matching the leaven ban from chapter 2:11. This basket holds three separate bread styles, used later in the ceremony.

🍞 No yeast, matching the standing ban from chapter 2

🧺 One basket holds three different bread styles

🔥 This bread connects directly to the altar rituals ahead

---

## 👥 Gather Thou All The Congregation Together

This wasn't a private family event behind closed doors. The entire community of Israel was called to witness Aaron and his sons formally step into their new role.

👥 All of Israel was called to watch, not just Aaron's family

🎯 A public ceremony, not a private one

📢 The whole nation needed to see this transition happen

---

## 🚪 Unto The Door Of The Tabernacle Of The Congregation

This entrance area, just outside the tent itself, was where the altar stood and where sacrifices were regularly offered. It's the same location used throughout chapters 1-7, now hosting this one-time ordination instead of a routine offering.

🚪 This is the same courtyard entrance used in earlier chapters

🔥 The altar for regular sacrifices stood right here

🎬 A familiar place now hosts a one-time event

---

## ✅ Moses Did As The LORD Commanded Him

Moses, not Aaron, performs every action in this chapter. Since Aaron is the one being ordained, he isn't yet functioning as a priest - someone already qualified has to carry out the ceremony that makes him one.

✅ Moses performs every action, not Aaron

🔄 Aaron can't ordain himself into a role he doesn't hold yet

📖 This obedience formula repeats throughout the chapter

---

## 📣 This Is The Thing Which The LORD Commanded To Be Done

Moses tells the gathered crowd directly that what they're about to witness traces back to God's own command, not something Moses decided on his own. The people needed to know this ceremony carried real divine authority.

📣 Moses credits this ceremony to God's command, not his own idea

👥 The watching crowd needed to know its real source

⚖️ Divine authority, not human invention, stands behind it

# Leviticus 8:6-9

# 👘 Dressing The High Priest

---

## 💧 Washed Them With Water

This is a full ceremonial washing, not just ordinary cleaning, described back in Exodus 29:4. It marks the moment Aaron and his sons step out of ordinary status and into something set apart for holy service.

💧 This is a ceremonial washing, not routine hygiene

🔄 It marks a real change in status, not a chore

📖 Exodus 29:4 already laid out this exact requirement

---

## 🧥 The Coat

The coat was a close-fitting, woven inner garment, worn as the base layer underneath everything else Aaron would put on. Every other piece named in this section goes on over top of it.

🧥 This was the innermost layer, worn closest to the body

🪡 It was woven cloth, fitted rather than loose

📚 Every other garment named here goes on over it

---

## 🎗️ Girded Him With The Girdle

A girdle was a sash tied around the waist, holding loose clothing in place and marking someone as ready and prepared for active service, not relaxed or off-duty.

🎗️ A sash tied around the waist, over the coat

🏃 It marked readiness for active service

🔒 It kept the loose-fitting garments secure

---

## 🔵 Clothed Him With The Robe

The robe was a blue outer garment worn over the coat, made with its own hem decorated with bells and pomegranates, fully described back in Exodus 28:31-35. Its blue color and rich detail set it apart from ordinary clothing worn by anyone else.

🔵 A blue outer robe, worn over the coat

🔔 Exodus 28 describes its bells-and-pomegranates hem in detail

👑 Its color and detail marked out no ordinary garment

---

## 🦺 Put The Ephod Upon Him

The ephod was an apron-like garment with a front and back panel joined at the shoulders, worn over the robe. It served as the base that held the breastplate in place against Aaron's chest.

🦺 Front and back panels joined at the shoulders

🔗 It anchored the breastplate that comes next

👔 Worn as an outer layer over the blue robe

---

## 🎗️ Girded Him With The Curious Girdle Of The Ephod

"Curious" here is old English for skillfully woven or richly decorated, not strange or odd. This was a separate waistband attached specifically to the ephod, distinct from the plain girdle already tied around the coat in verse 7.

🎗️ "Curious" means skillfully made, not "strange"

🔀 This is a separate band from the earlier plain girdle

🦺 It belonged specifically to the ephod, holding it snug

---

## 💎 The Breastplate

This was a square pouch worn over Aaron's chest, containing twelve gemstones representing each of Israel's twelve tribes, fully described back in Exodus 28:15-21. Aaron literally carried the whole nation's identity against his heart while serving.

💎 A square pouch holding twelve stones, one per tribe

📖 Exodus 28 gives the full stone-by-stone description

❤️ Aaron carried Israel's identity physically over his heart

---

## 🎲 The Urim And The Thummim

These were two objects placed inside the breastplate pouch, used somehow to seek God's guidance on yes-or-no decisions. Their exact appearance isn't described anywhere in the Bible, but their function - discerning God's will - is clear from how they're used elsewhere.

🎲 Two objects placed inside the breastplate

❓ Their exact appearance is never described in scripture

🧭 Their known function was seeking God's guidance on decisions

---

## 🎩 The Mitre

The mitre was a wrapped, turban-style headpiece worn only by the high priest, distinct from the simpler "bonnets" his sons would wear later in this same chapter.

🎩 A wrapped, turban-style head covering

👑 Worn only by the high priest, not ordinary priests

🔀 Distinct from the plainer bonnets given to Aaron's sons

---

## 🏅 The Golden Plate, The Holy Crown

Attached to the front of the mitre, this gold plate was engraved with the words "HOLINESS TO THE LORD," as described in Exodus 28:36. It sat directly on Aaron's forehead - the most visible point on his whole body - as a permanent, silent declaration of his purpose.

🏅 Engraved "HOLINESS TO THE LORD," per Exodus 28:36

👁️ Positioned on the forehead, the most visible spot

📢 A silent, constant declaration of Aaron's purpose

# Leviticus 8:10-13

# 🫗 Anointing With Oil

---

## ⛺ Anointed The Tabernacle And All That Was Therein

Consecration in this ceremony wasn't limited to people. The physical tent structure and everything inside it were anointed too, marking the whole space as set apart for God, not just the priests who would serve there.

⛺ The tent itself was anointed, not only the people

📦 Everything inside it received the same treatment

🎯 The whole space, not just its ministers, was set apart

---

## 🔢 Sprinkled Thereof Upon The Altar Seven Times

Seven shows up repeatedly through Leviticus as a number tied to completeness. Sprinkling the altar this many times marked a thorough, deliberate consecration rather than a quick, one-touch gesture.

🔢 Seven often signals completeness throughout Leviticus

🎯 This was thorough, deliberate, not a single quick touch

🔁 The altar gets sprinkled here rather than poured

---

## 🔥 Anointed The Altar And All His Vessels

Every tool used at the altar - basins, forks, shovels, and more - was included in this anointing, not the altar's stone or metal structure alone. The entire working system for sacrifice was set apart together.

🔥 The altar's tools were anointed along with the altar itself

🛠️ Nothing used in the sacrifice system was left out

🎯 The whole working system was consecrated as one unit

---

## 🪣 Both The Laver And His Foot

The laver was a large bronze basin used for priestly washing, described back in Exodus 30:18. Its "foot" refers to the stand or base it rested on - both pieces, not just the bowl, received the anointing oil.

🪣 The laver was a large bronze washing basin

🦶 Its "foot" means the stand or base beneath it

📖 Exodus 30:18 first introduced this washing basin

---

## 👑 Poured Of The Anointing Oil Upon Aaron's Head

Unlike the sprinkling used on the altar, this oil was poured generously and visibly onto Aaron personally. This individual, direct anointing is the root of the Hebrew idea behind "anointed one," later translated into English as "messiah."

👑 Pouring, not sprinkling, marked this as personal and direct

👁️ It happened visibly, in front of the watching crowd

📖 This is the root of the word later translated "messiah"

---

## 👔 Aaron's Sons...Put Coats Upon Them, And Girded Them With Girdles

Aaron's sons receive coats and girdles matching the first layer Aaron himself wore in verse 7, but nothing beyond that here - no robe, ephod, breastplate, or mitre. Their clothing marks them as priests, but visibly simpler than the high priest.

👔 Sons get the same base layer Aaron wore first

🔽 They receive nothing beyond that at this point

👑 Their simpler clothing marks a real rank difference

---

## 🎩 Put Bonnets Upon Them

"Bonnets" were plain head coverings for ordinary priests, distinct from Aaron's elaborate mitre and golden plate. Every priest's head was covered, but only the high priest's covering carried the engraved holiness plate.

🎩 A plain head covering for ordinary priests

🔀 Distinct from Aaron's mitre with its golden plate

👑 Rank showed even in something as simple as headwear

---

## ✅ As The LORD Commanded Moses

This obedience formula, already used in verse 9, repeats here and will appear several more times through the chapter. Each repetition ties a specific action back to the exact instructions God gave, not Moses's own judgment call.

✅ This exact phrase already appeared once, in verse 9

🔁 It repeats several more times through this chapter

📖 Each use ties one action back to a specific divine instruction

# Leviticus 8:14-17

# 🐂 The Sin Offering Bullock

---

## 🤲 Laid Their Hands Upon The Head Of The Bullock

This hand-laying gesture matches the identification act from chapter 4's sin offering - a physical link between the offerer and the animal standing in for them. Unusually, both Aaron and his sons laid hands together, showing this sin offering covered the whole incoming priestly family at once, not one person alone.

🤲 This matches chapter 4's sin-offering identification gesture

👨‍👦 Aaron and his sons all laid hands together, not just one man

👪 One sin offering covered the whole priestly family at once

---

## 🩸 Moses Took The Blood, And Put It Upon The Horns Of The Altar

This is the exact blood procedure chapter 4 already laid out for a sin offering - applied to the altar's horns (corners), not sprinkled generally like a burnt or peace offering's blood.

🩸 This matches chapter 4's sin-offering blood procedure

📐 "Horns" means the altar's corners specifically

🔀 This differs from the general sprinkling used for other offerings

---

## ☝️ With His Finger

The finger was used for this precise, controlled application onto the altar's horns, rather than pouring or splashing more broadly - a small but deliberate detail already established as standard for sin offerings.

☝️ A finger allowed precise, controlled placement

🎯 This detail was already standard sin-offering procedure

🔁 Chapter 4 uses this exact same method

---

## 🧹 Purified The Altar...To Make Reconciliation Upon It

Surprisingly, the altar itself needed purifying here, not only the people. Even the physical object central to every future sacrifice had to be set right before it could be used for ongoing priestly service.

🧹 The altar itself needed cleansing, not just the people

⚙️ It was the tool for every sacrifice still to come

🎯 Nothing connected to holy service was left untouched

---

## ⬇️ Poured The Blood At The Bottom Of The Altar

This disposal method for the bullock's remaining blood matches the standard sin offering procedure already given in chapter 4 - nothing was left to be handled casually or informally.

⬇️ This matches chapter 4's standard blood-disposal method

📖 Nothing about this handling was left to guesswork

🔁 A familiar procedure, applied to a one-time ceremony

---

## 🫀 The Fat...The Caul Above The Liver, And The Two Kidneys

This is the identical fat portion list already required for offerings back in chapters 3 and 4 - the same specific parts, burned on the altar, regardless of which particular occasion brought the animal there.

🫀 This matches the same fat list from chapters 3 and 4

🔥 These parts were burned on the altar, as always

🔁 One consistent rule applied across many different occasions

---

## 🔥 The Bullock...He Burnt With Fire Without The Camp

Unlike an ordinary sin offering where some meat might be eaten by priests, this whole animal - hide, flesh, and waste - was destroyed outside the camp. With no ordained priest yet able to eat a priestly portion, the entire bullock had to be handled this way instead.

🔥 The whole animal was destroyed, none of it eaten

🚫 No ordained priest existed yet to eat a priestly share

🔁 This matches the rule already used for priestly sin offerings

---

## 🏕️ Without The Camp

This specific location, outside where the Israelites actually lived, was reserved for disposing of the most sacred or most contaminated remains - never handled inside the everyday living space of the community.

🏕️ A location set apart from everyday living space

🔥 Reserved for the most sacred or contaminated remains

📍 Not treated casually inside ordinary community grounds

# Leviticus 8:18-21

# 🔥 The Burnt Offering Ram

---

## 🐑 The Ram For The Burnt Offering

This is the first of the two rams named back in verse 2. The bullock just handled the sin problem; this ram represents something different - total, willing devotion, nothing held back.

🐑 The first of the two rams named in verse 2

🔀 A different purpose than the bullock just offered

🔥 This offering represents total, willing devotion

---

## 🩸 Sprinkled The Blood Upon The Altar Round About

"Round about" means splashed generally on every side of the altar - the standard burnt offering procedure from chapter 1, and notably different from the horns-only application just used on the sin offering bullock.

🩸 "Round about" means splashed on every side

📖 This matches chapter 1's burnt offering procedure exactly

🔀 A clear contrast from the bullock's horns-only blood

---

## 🔪 Cut The Ram Into Pieces

Butchering the animal into sections before burning was already prescribed for burnt offerings in chapter 1 - a standard step, not something invented specifically for this ceremony.

🔪 This butchering step already appears in chapter 1

📖 A standard burnt-offering procedure, not a new one

🔁 The same method used for any ordinary burnt offering

---

## 💧 Washed The Inwards And The Legs In Water

Even though every part of this ram was headed straight into the fire, the internal organs and legs still had to be washed first, matching chapter 1's instructions. Cleanliness mattered here regardless of the animal's ultimate destination.

💧 Washing happened even though everything would be burned

📖 Chapter 1 already required this exact step

🧼 Cleanliness mattered independent of the animal's final use

---

## 🔥 Burnt The Whole Ram Upon The Altar

Unlike the bullock (only its fat burned, the rest destroyed elsewhere), this entire ram went into the altar fire - a true burnt offering, holding absolutely nothing back.

🔥 The complete animal went into the fire, unlike the bullock

🚫 Nothing was set aside or held in reserve

📖 This is what makes it a true "burnt" offering

---

## 🌬️ A Sweet Savour

This phrase describes God receiving the offering favorably, like a pleasing aroma - language already used throughout chapters 1-3 for offerings made by fire. It ties this ordination sacrifice to the same wider sacrificial system already explained earlier in the book.

🌬️ Describes God receiving the offering favorably

📖 The same phrase already used across chapters 1-3

🔗 It links this ceremony to the wider sacrificial system

---

## 🔥 An Offering Made By Fire Unto The LORD

This closing formula repeats across nearly every sacrifice type in Leviticus so far, marking the ram's burning as a completed, proper offering rather than a mere destruction of meat.

🔥 A standard closing formula used across many offering types

✅ It marks the act as a completed, proper offering

🔁 Not unique to this ceremony, but consistent with the rest

---

## ⚖️ Two Offerings, Two Purposes

Stepping back across the bullock and this ram: one dealt with sin and guilt, the other expressed total consecration and devotion. Ordination required both - forgiveness first, then full surrender - not either one alone.

⚖️ The bullock addressed sin; this ram addressed devotion

🔀 Two separate needs required two separate offerings

📖 Ordination needed both forgiveness and full surrender

# Leviticus 8:22-24

# 👂 Blood On Ear, Thumb, And Toe

---

## 🐑 The Ram Of Consecration

This third and final animal gets its own special name, separate from the plain "burnt offering" ram just used - marking it as unique to this specific ordination ceremony, unlike anything offered in ordinary worship.

🐑 A special name given only to this one ram

🎯 It marks this animal as unique to this ceremony

🔀 Different from the plain "burnt offering" ram before it

---

## 👂 The Tip Of Aaron's Right Ear

Applying blood to the ear symbolically dedicated Aaron's hearing to God - his ability to listen for and obey God's instructions going forward, now marked as consecrated along with the rest of him.

👂 This dedicated Aaron's hearing to God's service

🎯 It marked his ability to listen for and obey instruction

🩸 Blood, not oil, made this particular consecration

---

## 👍 The Thumb Of His Right Hand

Blood on the thumb dedicated Aaron's hands to God - the same hands that would perform sacred rituals, handle offerings, and serve at the altar for the rest of his priestly life.

👍 This dedicated Aaron's hands to sacred service

🛠️ These hands would handle every ritual act ahead

🔁 The same consecration is applied to feet and ears too

---

## 🦶 The Great Toe Of His Right Foot

Blood on the toe dedicated Aaron's feet - his whole manner of walking and living - since the priest would need to move constantly in and around the tabernacle grounds while serving.

🦶 This dedicated Aaron's feet and his whole way of walking

🚶 Priests needed to move constantly around the tabernacle

🔁 Ear, hand, and foot together consecrated his entire body

---

## 💪 Right, Right, Right

All three points - ear, hand, and foot - were specifically on the right side, never the left. In Hebrew thought the right side commonly carried associations with strength and honor, so consistently choosing it marked the most honored side of the body as set apart.

💪 The right side, not the left, was chosen each time

👑 The right side carried associations of strength and honor

🔁 This same right-side pattern appears again later in the chapter

---

## 👨‍👦 His Sons...The Tip Of Their Right Ear

Aaron's sons received the identical three-point application - ear, thumb, and toe - not a shortened or lesser version. Full consecration extended to the whole incoming priestly line, not to Aaron alone.

👨‍👦 Sons received the exact same three-point treatment

🚫 Nothing here was shortened or made lesser for them

👪 The whole priestly line was consecrated, not just Aaron

---

## 🩸 Sprinkled The Blood Upon The Altar Round About

The ritual returns to the altar with the same "round about" application already used for the burnt offering ram, closing out this particular blood ceremony at the same place it began.

🩸 This repeats the same "round about" application from before

🔁 The altar closes this ritual, the same way it opened it

📖 A consistent pattern across this chapter's blood rituals

# Leviticus 8:25-29

# 〰️ Waving The Ordination Offering

---

## 🫀 The Fat, And The Rump...The Caul Above The Liver, And The Two Kidneys

This is the exact fat-portion list already required for the peace offering back in chapters 3 and 7 - the same specific parts, showing this ram of consecration functioned partly like a peace offering.

🫀 This matches the peace offering's fat list from chapters 3 and 7

🔗 It shows this ram partly functions like a peace offering

🔁 The same specific fat portions, a familiar pattern

---

## 💪 The Right Shoulder

Normally, the right shoulder became the officiating priest's personal food portion from a peace offering, as chapter 7:32-33 already explained. Here it goes straight onto the altar fire instead, since there's no ordained priest yet available to receive it as food.

💪 This usually became the priest's own portion, per chapter 7

🔥 Here it burns on the altar instead of being eaten

🚫 No ordained priest existed yet to receive it as food

---

## 🧺 The Basket Of Unleavened Bread

This is the same basket first mentioned back in verse 2, holding three separate bread items - matching the same three-style bread pattern already described for the peace offering's thanksgiving variety in chapter 7:12.

🧺 The same basket introduced back in verse 2

🍞 It held three distinct bread items, not just one

🔁 This matches chapter 7:12's three-style bread pattern

---

## 🍞 Put Them On The Fat, And Upon The Right Shoulder

The bread was physically stacked directly on top of the meat portions, combining both elements into a single presentation before the next step in the ritual.

🍞 Bread was physically stacked on top of the meat

🎯 Both elements were combined into one presentation

➡️ This setup prepared everything for the wave offering next

---

## 🤲 Put All Upon Aaron's Hands, And Upon His Sons' Hands

Their hands were literally filled with these food offerings. Many scholars connect this action to the Hebrew phrase for ordination itself, sometimes translated "fill the hand" - meaning this verse may be the literal origin of the concept of priestly ordination.

🤲 Their hands were physically filled with these offerings

📖 This may be the literal root of the Hebrew term for ordination

🎯 "Filling the hand" describes exactly what happens here

---

## 〰️ Waved Them For A Wave Offering Before The LORD

This callback to the wave-offering gesture (already explained in chapter 7:30) describes a side-to-side motion, physically presenting the food to God before its final use is decided.

〰️ A side-to-side presentation gesture, explained in chapter 7

👀 It visibly presented the food to God first

➡️ The final destination for this food comes only afterward

---

## 📢 Consecrations For A Sweet Savour

This ram and its accompanying bread are given a new label - "consecrations" - instead of the usual offering names used elsewhere, marking this sacrifice's unique, one-time ordination purpose even while it's handled using familiar burnt and peace offering methods.

📢 "Consecrations" is a new label, not used for ordinary sacrifices

🎯 It marks this offering's unique, one-time ordination purpose

🔁 Yet the actual handling matches familiar existing methods

---

## 🔥 Moses Took Them...And Burnt Them...Upon The Burnt Offering

Unlike an ordinary peace offering (where these portions would go to a serving priest), Moses personally burns them here, since Aaron isn't yet functioning in the role that would normally receive this food.

🔥 Moses burns these portions himself, not a priest

🚫 Aaron wasn't yet functioning in a role to receive them

🔁 The ceremony keeps adapting around the fact no priest exists yet

---

## 🍖 The Breast...For Moses' Part

Ordinarily this breast portion would be shared among the whole priestly family, as chapter 7:31 already described. Since no ordained priesthood exists at this exact moment, Moses personally keeps this one breast as his own unique, never-repeated portion.

🍖 Normally shared among the whole priestly family, per chapter 7

🙋 Moses personally keeps it here instead, just this once

🎯 A portion that belongs to Moses alone, never repeated again

# Leviticus 8:30

# 🩸 Oil And Blood Sprinkled On Garments

---

## 🫗 Oil, And Of The Blood Which Was Upon The Altar

This unique mixture - anointing oil combined with blood already sprinkled on the altar - doesn't appear described anywhere else in Leviticus. It combines two consecration methods already used separately earlier in this same chapter into one final act.

🫗 A mixture never described anywhere else in this book

🔗 It combines two methods already used separately in this chapter

🎯 One final act pulling both consecrations together

---

## 👘 Sprinkled It Upon Aaron, And Upon His Garments

Both the man and his clothing were sanctified together in the same motion. The priestly office and the specific garments worn while serving in it weren't treated as separable from each other.

👘 The man and his clothing were sanctified in one motion

🔗 Office and garment were treated as inseparable

🎯 Consecration reached what Aaron wore, not just Aaron himself

---

## 👨‍👦 And Upon His Sons, And Upon His Sons' Garments With Him

The exact same oil-and-blood treatment repeats for Aaron's sons and their clothing, confirming this consecration reached the whole priestly line together, not Aaron by himself.

👨‍👦 The identical treatment repeats for Aaron's sons

👪 This confirms the whole priestly line was included

🔁 Nothing here singled out Aaron above the rest

---

## ✨ Sanctified Aaron, And His Garments, And His Sons, And His Sons' Garments

Repeating "sanctified" across the whole verse emphasizes that this specific moment, more than any other single act in the chapter, is what officially set apart these men and their clothing for holy service.

✨ "Sanctified" repeats across the entire verse deliberately

🎯 This moment officially completed their consecration

👘 People and clothing together, treated as one unit

# Leviticus 8:31-36

# 🚪 Seven Days At The Tabernacle Door

---

## 🍲 Boil The Flesh At The Door Of The Tabernacle Of The Congregation

The ram of consecration's meat, finally eaten by Aaron and his sons themselves, was cooked right at the entrance where the entire ceremony had taken place - not carried off somewhere else.

🍲 This is the ram of consecration's meat, finally eaten

🚪 Cooked right where the whole ceremony happened

📍 Nothing was carried off to a separate location

---

## 🍞 Eat It With The Bread That Is In The Basket Of Consecrations

The remaining unleavened bread from verse 26's basket is finally consumed here, alongside the meat, completing the meal that this whole ordination ceremony has been building toward.

🍞 This is the same basket of bread from verse 26

🍽️ Meat and bread together complete the ordination meal

🎯 The ceremony has been building toward this shared meal

---

## 🔥 That Which Remaineth...Shall Ye Burn With Fire

This matches the same no-leftovers principle already given for other offerings back in chapter 7:15-17 - nothing from this sacred meal could be kept and eaten past its proper time.

🔥 This matches chapter 7's no-leftovers principle exactly

⏰ Nothing could be saved or eaten past its proper time

🔁 A familiar rule, applied here to a one-time ceremony

---

## 🚪 Ye Shall Not Go Out Of The Door...In Seven Days

This describes a full week of confinement right at the tabernacle entrance - a real, physically demanding commitment, not a quick one-day ritual that wraps up and sends everyone home.

🚪 A full week spent confined at the tabernacle entrance

⏳ This was a real, extended commitment, not a single day

🚫 No stepping away was allowed during this whole week

---

## 🔢 For Seven Days Shall He Consecrate You

"Seven" again marks completeness, matching the sevenfold sprinkling already used on the altar back in verse 11. The number itself was chosen deliberately, not picked at random.

🔢 Seven again signals completeness, as it did in verse 11

🎯 The number was chosen deliberately, not at random

🔁 This ties the whole ceremony together with one consistent theme

---

## 📜 As He Hath Done This Day, So The LORD Hath Commanded To Do

This confirms that every single action Moses performed across this whole chapter wasn't improvised - it had already been prescribed in advance, matching the original instructions given back in Exodus 29.

📜 Nothing in this chapter was improvised by Moses

📖 Exodus 29 already laid out these exact instructions

✅ Every action here matches a plan made in advance

---

## 🙏 To Make An Atonement For You

Even the priests themselves needed atonement before they could serve as mediators for anyone else. Aaron and his sons weren't automatically holy or qualified just by birth or appointment - they needed this same process too.

🙏 Priests needed atonement before mediating it for others

🚫 Birth or appointment alone didn't make them qualified

🔁 The mediators needed the same process as everyone else

---

## 👀 Abide At The Door...Day And Night Seven Days

This clarifies that the seven-day requirement meant staying continuously, including through the nights, not just showing up for daytime duties and going home each evening.

👀 This confirms the week meant staying continuously

🌙 Nights were included, not just daytime hours

🚫 Going home each evening wasn't an option

---

## 🛡️ Keep The Charge Of The LORD

"Charge" here means an assigned duty or watch responsibility - a word that becomes standard priestly vocabulary used repeatedly through the rest of Leviticus and into Numbers.

🛡️ "Charge" means an assigned duty or watch responsibility

📖 This word becomes standard priestly vocabulary going forward

🔁 It appears again often through Leviticus and Numbers

---

## ⚰️ That Ye Die Not

This is real danger language, not a figure of speech. Failing to properly complete this consecration process put Aaron and his sons at genuine risk, showing how seriously nearness to holy things was treated.

⚰️ This is a genuine warning, not just a figure of speech

⚠️ Failing this process put their lives at real risk

🎯 Nearness to holy things carried real, serious danger

---

## ✅ So Aaron And His Sons Did All Things Which The LORD Commanded By The Hand Of Moses

The chapter closes by confirming full compliance - every single instruction was carried out exactly as given. This sets up chapter 9, where Aaron finally begins functioning as priest for the very first time.

✅ The chapter ends by confirming complete obedience

🎬 Every instruction across the whole chapter was carried out

➡️ Chapter 9 begins Aaron's actual first day of priestly service`;

export const LEVITICUS_EIGHT_PERSONAL_SECTIONS = parseLeviticusEightRawNotes(LEVITICUS_EIGHT_RAW_NOTES);
