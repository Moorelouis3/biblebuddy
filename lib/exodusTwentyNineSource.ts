export type ExodusTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyNineRawNotes(rawText: string): ExodusTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+29:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 29 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+29:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+29:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 29 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 29,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 29:${startVerse}` : `Exodus 29:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Exodus 29 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_NINE_RAW_NOTES = `# Exodus 29:1-4

# 🐂 Materials For The Ordination

---

## 🕊️ Hallow Them, To Minister Unto Me In The Priest's Office

"Hallow" means to set apart as holy, to make something belong entirely to God instead of ordinary use. This whole chapter is God giving Moses a step-by-step ceremony for turning ordinary men into holy priests - it doesn't happen automatically just because Aaron was told about it back in chapter 28.

🕊️ "Hallow" means to set apart as holy, not just to bless casually

📜 This chapter is the actual ceremony, not just an announcement

👨‍👦 Aaron and his sons become priests through this process, not before it

---

## 🐂 One Young Bullock, And Two Rams Without Blemish

"Without blemish" means physically perfect - no injury, disease, or defect of any kind. Three separate animals are required for the ceremony, each one used for a different purpose later in the chapter: a bullock for a sin offering, one ram for a burnt offering, and a second ram for the consecration ritual itself.

🐂 "Without blemish" means physically flawless, with no injury or defect

3️⃣ Three separate animals are required, each with its own job

🩸 Each of the three plays a different role later in this same chapter

---

## 🍞 Unleavened Bread, And Cakes... And Wafers... Of Wheaten Flour

"Unleavened" means made without yeast, so the dough could not rise. This same word connects back to the Passover meal in chapter 12, tying this new ordination service to the same theme of purity and freedom from anything that "puffs up" or corrupts.

🍞 "Unleavened" means no yeast was used, so the dough stayed flat

🔗 The word echoes the unleavened bread of the Passover in chapter 12

✨ It symbolized purity, free from anything that spoils or corrupts

---

## 🧺 Put Them Into One Basket... With The Bullock And The Two Rams

All three breads and both animals are gathered and presented together as one complete package, brought to the tabernacle door as a single unit before anything else in the ceremony begins.

🧺 All the food and animals were gathered into one presentation

🚪 Everything was brought together to the tabernacle door

📦 This "gathering" step happens before any actual ritual begins

---

## 💧 Bring Unto The Door Of The Tabernacle... And Shalt Wash Them With Water

Before anything else happens, Aaron and his sons are physically washed. This is the first of several cleansing acts in the chapter, and it becomes permanent tabernacle practice: chapter 30 later installs a bronze basin specifically so priests could wash before every future service.

💧 Washing came first, before any garments or offerings

🚪 It happened right at the tabernacle's entrance

🪣 Chapter 30 later installs a permanent basin for this exact purpose

# Exodus 29:5-9

# 👔 Dressing And Anointing Aaron

---

## 👔 Put Upon Aaron The Coat, And The Robe Of The Ephod, And The Ephod, And The Breastplate

These are the very garments God gave detailed sewing instructions for back in chapter 28 - here, for the first time, they are actually put onto a real person. The order matters: each layer goes on from the inside out, coat first, breastplate last of these four.

👔 These are the same garments designed in chapter 28, now finally worn

🔄 They go on in careful order, innermost layer first

👤 Aaron becomes the first living person to ever wear this outfit

---

## 🧣 Gird Him With The Curious Girdle Of The Ephod

"Curious" is an old word for skillfully made, not strange or unusual. This woven sash cinches the ephod snugly around Aaron's body so the whole assembly stays in place instead of hanging loose.

🧣 "Curious" here means skillfully crafted, not odd or strange

🔗 The girdle cinches the ephod tightly around the body

📌 It keeps the whole outfit secure rather than loose

---

## 👑 Put The Mitre Upon His Head, And Put The Holy Crown Upon The Mitre

The "holy crown" is the gold forehead plate from chapter 28:36, engraved "HOLINESS TO THE LORD." Calling it a "crown" here is striking - Aaron was never a king, but this crown-like plate marked him as uniquely set apart, answering directly and visibly to God alone.

👑 The "holy crown" is the gold plate engraved in chapter 28

🚫 Aaron was never a king, yet this object is called a crown

🙏 It marked him as set apart and accountable to God alone

---

## 🫗 Take The Anointing Oil, And Pour It Upon His Head, And Anoint Him

Pouring oil on someone's head was the ancient sign of God choosing and empowering that person for a specific role. The Hebrew word for this act, "anoint," is the root behind the word "Messiah" - literally, "the Anointed One" - the same word later translated into Greek as "Christ."

🫗 Pouring oil on the head marked God's choice and empowering

📖 "Anoint" is the root of the word "Messiah," the Anointed One

🌍 The Greek translation of that same title is "Christ"

---

## 📜 The Priest's Office Shall Be Theirs For A Perpetual Statute

A "perpetual statute" is a permanent law that doesn't expire or get renegotiated later. This established the priesthood as hereditary - passed down through Aaron's specific family line for generations, not something re-earned or re-elected each time.

📜 A "perpetual statute" is a law meant to never expire

👨‍👦‍👦 The priesthood became hereditary, passed through Aaron's family

🔒 It wasn't a role anyone could be elected or re-earn later

# Exodus 29:10-14

# 🩸 The Sin Offering Bullock

---

## ✋ Aaron And His Sons Shall Put Their Hands Upon The Head Of The Bullock

Pressing both hands on the animal's head was a specific ritual act of identification. It meant this animal now stood in for the person pressing on it - carrying what was theirs to deal with onto itself.

✋ Laying on hands identified the offerer with the animal

🔄 The animal now stood in the person's place

🩸 This same gesture repeats with each animal in the chapter

---

## 🔪 Thou Shalt Kill The Bullock Before The Lord

Notice who is doing the killing here: Moses, not Aaron. Aaron hasn't been ordained yet - this entire ceremony is what makes him a priest - so Moses has to act as priest on Aaron's behalf until the process is finished.

🔪 Moses does the killing, not Aaron, throughout this ceremony

⏳ Aaron isn't a priest yet - that's exactly what this ritual creates

🔄 Moses temporarily fills the priestly role until it's finished

---

## 🚪 By The Door Of The Tabernacle Of The Congregation

Every act in this ordination happens at one specific, designated spot: the tabernacle's entrance. Nothing here is casual or wherever-is-convenient; the location itself was part of what made the ritual valid.

🚪 One specific location is used for the entire ceremony

📍 The tabernacle's entrance was the designated ritual spot

✅ Location mattered as much as the actions performed there

---

## 👉 Put It Upon The Horns Of The Altar With Thy Finger

The "horns" were four pointed corners built onto the altar, one at each corner, described back in chapter 27. Touching blood there with a finger was the specific, deliberate act that marked this as a sin offering, a detail Leviticus 4 later expands on in much more depth.

👉 "Horns" were the four projecting corners of the altar

🩸 Applying blood there marked this specifically as a sin offering

📖 Leviticus 4 gives much more detail on this exact ritual

---

## 🔥 The Fat That Covereth The Inwards... Burn Them Upon The Altar

Only the internal fat, considered the richest part of the animal, was burned on the altar for God here. Fat was viewed as the best portion an animal had to offer, so giving it entirely to God, rather than eating it, meant setting aside the best part first.

🔥 Only the internal fat was burned on the altar in this step

⭐ Fat was considered the richest, "best" part of the animal

🎁 Giving it to God meant the best portion was set aside first

---

## 🔥 Burn With Fire Without The Camp: It Is A Sin Offering

Unlike the fat, the bullock's actual flesh, skin, and waste were burned completely outside the camp, not on the altar. A sin offering's remains couldn't stay in the holy space, because it symbolically carried sin's weight - the New Testament book of Hebrews later connects this exact detail to Jesus suffering "outside the gate."

🔥 The flesh and skin were burned outside the camp, not the altar

🚫 Sin offering remains couldn't stay inside the holy space

✝️ Hebrews 13 later connects this to Jesus dying outside the gate

# Exodus 29:15-18

# 🔥 The First Ram: A Whole Burnt Offering

---

## 🐏 Thou Shalt Also Take One Ram; And Aaron And His Sons Shall Put Their Hands Upon The Head Of The Ram

This is a second, separate animal from the bullock already used, and it serves an entirely different purpose. The bullock dealt with sin; this ram, and the one after it, deal with dedicating and equipping Aaron and his sons for service.

🐏 This ram is a separate animal from the bullock already sacrificed

🎯 The bullock addressed sin; the rams address dedication and service

🔢 Two rams total are used, each for a distinct part of the ceremony

---

## 🧼 Cut The Ram In Pieces, And Wash The Inwards Of Him, And His Legs

Washing the animal's internal organs and legs made sense practically, since those parts come into contact with dirt and waste, but it also carried ritual meaning: nothing given to God on the altar could be presented unclean.

🧼 Internal organs and legs were physically washed first

🐾 These are the body parts most likely to carry dirt or waste

✨ Nothing offered to God on the altar could be presented unclean

---

## 🔥 Burn The Whole Ram Upon The Altar: It Is A Burnt Offering

A "burnt offering" meant the entire animal was consumed on the altar - nothing kept back for the priests to eat, unlike the wave and heave offerings described later in this same chapter. It represented complete, total surrender, holding nothing back.

🔥 The whole animal was burned, with nothing set aside to eat

🙌 This differs from the wave/heave offerings later in the chapter

💯 It pictured total surrender, holding nothing back from God

---

## 🌬️ A Sweet Savour, An Offering Made By Fire Unto The Lord

"Sweet savour" is a figure of speech describing something as pleasing, like a good smell. Scripture uses this human, relatable image throughout the offering laws to describe an offering as fully accepted by God.

🌬️ "Sweet savour" is a figure of speech meaning "pleasing"

👃 It borrows the human experience of a pleasant smell

✅ It signals the offering was fully accepted, not merely tolerated

# Exodus 29:19-25

# 👂 The Ram Of Consecration

---

## 🐏 Thou Shalt Take The Other Ram; And Aaron And His Sons Shall Put Their Hands Upon The Head Of The Ram

This second ram gets its own name later in the passage: "the ram of consecration." Where the first ram was burned whole in total surrender, this one is used for a much more detailed, hands-on ritual involving blood, oil, and specific body parts.

🐏 This is a second, distinct ram with its own specific ritual

🏷️ It's later named "the ram of consecration" in verse 22

✋ Its ritual is more detailed and hands-on than the first ram's

---

## 👂 Put It Upon The Tip Of The Right Ear Of Aaron... The Thumb Of Their Right Hand... The Great Toe Of Their Right Foot

Blood touched three specific points on the body: ear, thumb, and big toe, all on the right side. Each spot carried meaning - the ear for hearing and obeying God's word, the hand for the work a priest would do, and the foot for the direction a priest would walk. Together, the whole person, head to foot, was marked as dedicated to God.

👂 The ear represents hearing and obeying God's instructions

✋ The thumb represents the priestly work their hands would do

🦶 The foot represents the path and direction their life would take

---

## 🩸 Sprinkle The Blood Upon The Altar Round About

The same ram's blood that touched Aaron and his sons was also sprinkled all around the altar. This linked the priests and the altar together with the same blood, tying the people who served and the object they served at into one act.

🩸 The same blood touched both the priests and the altar

🔗 This visually linked the priests and altar as one unit

⛪ Neither could function without the other in this system

---

## 🫗 Sprinkle It Upon Aaron... And Upon His Sons, And Upon The Garments Of His Sons

Blood already on the altar was mixed with anointing oil and sprinkled again, this time onto the men and even their clothing. Combining these two elements meant both atonement, the blood, and empowering presence, the oil, were applied together, and even the fabric of their garments was made holy by the contact.

🫗 Blood from the altar was mixed with anointing oil

🩸 The blood represents atonement; the oil represents empowering

👕 Even the garments themselves became holy through this contact

---

## 🍞 One Loaf Of Bread, And One Cake Of Oiled Bread, And One Wafer Out Of The Basket

The bread prepared all the way back in verse 2 finally gets used here, alongside the ram's meat. Combining grain offerings with the animal offering made this one complete, layered presentation instead of two separate rituals.

🍞 This is the same bread first prepared back in verse 2

🐏 It's combined here with the ram's meat in one presentation

🎁 Grain and animal together formed one complete offering

---

## 🙌 Wave Them For A Wave Offering Before The Lord

A "wave offering" involved a priest physically moving the food toward the altar and back again, a deliberate gesture of presenting a gift to God and having it returned. This specific hand motion, forward and back, is what the word "wave" describes.

🙌 A wave offering involved physically moving food toward the altar

↔️ The forward-and-back motion is what "wave" specifically describes

🎁 It pictured presenting a gift to God, which was then given back

# Exodus 29:26-28

# 🎁 Aaron's Priestly Portion

---

## 🍖 The Breast Of The Ram Of Aaron's Consecration... Wave It... It Shall Be Thy Part

God is speaking to Moses throughout this whole chapter, so "thy part" here means Moses' own portion, specifically for this one ordination ceremony. Moses is filling the priestly role only until Aaron's ordination is actually complete.

👤 "Thy part" here refers to Moses, who is speaking to God

⏳ This portion applied only to this one ordination ceremony

🔄 It reflects Moses still filling the priestly role temporarily

---

## ↕️ The Breast Of The Wave Offering, And The Shoulder Of The Heave Offering

Two different offering motions get two different names here. A "wave" offering moved forward and back; a "heave" offering was physically lifted up and down. Both meant the same basic idea - present it to God, then receive it back - just performed with a different hand motion.

↔️ A "wave" offering moved the food forward and back

⬆️ A "heave" offering was lifted up and down instead

🔁 Both pictured presenting a gift to God and having it returned

---

## 📜 It Shall Be Aaron's And His Sons' By A Statute For Ever From The Children Of Israel

Going forward, this breast-and-shoulder portion became the priests' permanent food provision, taken from every peace offering ordinary Israelites would bring in the future. This was, in effect, how the priesthood was fed and supported for the rest of its existence.

📜 This portion became permanent, not just for this ceremony

🍽️ It came from every future peace offering Israelites brought

💰 It functioned as the priests' ongoing food and support

# Exodus 29:29-30

# 👘 Garments Passed Down

---

## 🧥 The Holy Garments Of Aaron Shall Be His Sons' After Him, To Be Anointed Therein

The priestly garments belonged to the office itself, not to Aaron personally. When Aaron died, these same physical clothes would be passed down to whichever son succeeded him as high priest, generation after generation.

🧥 The garments belonged to the office, not to Aaron personally

🔄 They were meant to be reused by each future high priest

👨‍👦‍👦 This continued through Aaron's family line, generation to generation

---

## 📅 That Son That Is Priest In His Stead Shall Put Them On Seven Days

The seven-day ordination pattern being established right now in this chapter wasn't a one-time event just for Aaron. Every future high priest, whenever a new one took office generations later, would go through this same seven-day process.

📅 The seven-day pattern applies to every future high priest, too

🔄 This chapter sets a template, not a one-time exception

👑 Numbers 20 later shows this pattern used for Aaron's own successor

# Exodus 29:31-34

# 🍽️ Eating The Holy Food

---

## 🍲 Seethe His Flesh In The Holy Place

"Seethe" is an old word meaning to boil. This meat couldn't be cooked just anywhere convenient - it had to be prepared inside a specific holy location, tying even the cooking process itself to the ritual's holiness.

🍲 "Seethe" is an old word meaning to boil

📍 It had to be cooked in one specific holy location

✨ Even the cooking process was part of the ritual's holiness

---

## 🍽️ Aaron And His Sons Shall Eat The Flesh Of The Ram, And The Bread... By The Door Of The Tabernacle

This is a sacred, shared meal, not a public feast. Only the newly ordained priests themselves ate this food, and only at the tabernacle's entrance, marking it as a private, holy meal tied directly to their ordination.

🍽️ Only the newly ordained priests ate this particular meal

🚪 It happened specifically at the tabernacle's entrance

🔒 It was a private, sacred meal, not a public celebration

---

## 🚫 A Stranger Shall Not Eat Thereof, Because They Are Holy

"Stranger" here doesn't mean a foreigner specifically - it means anyone outside the anointed priestly family, including ordinary Israelites. Access to this meal was restricted by holiness and calling, not by nationality.

🚫 "Stranger" here means anyone outside the priestly family

🇮🇱 Even ordinary Israelites counted as "strangers" to this meal

✨ Access was limited by holiness and calling, not nationality

---

## 🔥 If Ought Of The Flesh... Remain Unto The Morning... Burn The Remainder With Fire: It Shall Not Be Eaten

Nothing from this holy meal could be casually left over into the next day. Anything uneaten had to be completely destroyed by fire rather than saved, treated with the same seriousness as garbage that could never simply sit around.

🔥 Leftovers couldn't simply be saved for the next day

🗑️ Anything remaining had to be completely burned, not stored

✨ This showed how seriously holy food had to be handled

# Exodus 29:35-37

# 🗓️ Seven Days Of Consecration

---

## 🔢 Seven Days Shalt Thou Consecrate Them

Seven is used throughout Scripture as a number pointing to completeness - a full week of creation, a full cycle. Ordination wasn't a single afternoon event; it was a full seven-day process before Aaron and his sons were considered fully consecrated.

🔢 Seven often signals completeness throughout Scripture

📅 Ordination took a full week, not a single ceremony

✅ Aaron wasn't considered fully consecrated until day seven

---

## 🐂 Offer Every Day A Bullock For A Sin Offering For Atonement... Cleanse The Altar

This sin offering and cleansing had to be repeated daily, for all seven days. Remarkably, even the altar itself, an object and not a person, needed repeated atonement before it was considered fit for holy use.

🐂 The sin offering and cleansing repeated every day for a week

🪨 Even the altar, an object, needed repeated atonement

✨ Holiness requirements here were extremely thorough

---

## ✨ Thou Shalt Anoint It, To Sanctify It

Cleansing and anointing were two separate steps. Cleansing removed anything impure from the altar's surface; anointing was the formal act of dedicating it, setting it apart specifically for God's use going forward.

✨ Cleansing removed impurity; anointing formally dedicated it

🫗 These were two distinct steps, not one combined action

🔒 Anointing marked the altar as set apart for God's use only

---

## 🚨 It Shall Be An Altar Most Holy: Whatsoever Toucheth The Altar Shall Be Holy

The altar's holiness was described as so intense that it affected anything touching it. This wasn't a magical rule for random objects everywhere - it applied specifically to this one altar, showing just how seriously its consecrated status was treated.

🚨 The altar's holiness was described as extremely intense

🤲 Anything touching it was affected by that holiness

📍 This rule applied specifically to this one consecrated object

# Exodus 29:38-42

# 🐑 The Continual Daily Offering

---

## 🐑 Two Lambs Of The First Year Day By Day Continually

"Of the first year" means young lambs still in their prime, not old or weak animals. "Continually" is the key word here - this offering wasn't part of the ordination week only; it became Israel's permanent, ongoing daily worship pattern from this point forward.

🐑 "Of the first year" means young lambs in their prime

🔁 "Continually" marks this as a permanent, ongoing practice

📆 It's separate from the one-time seven-day ordination ritual

---

## 🌅 The One Lamb Thou Shalt Offer In The Morning; And The Other Lamb... At Even

One lamb was offered at sunrise and one at sunset, bookending every single day with sacrifice. This rhythm continued for centuries in Israel's worship, and many later Jewish and Christian traditions connect Jesus's own death to roughly this same evening sacrifice hour.

🌅 One lamb was offered at sunrise, one at sunset

🔁 This bookended every day of Israel's worship for centuries

✝️ Tradition connects Jesus's death to this same evening hour

---

## 🍞 A Tenth Deal Of Flour Mingled With... Oil; And... Wine For A Drink Offering

A "tenth deal" was a measurement of flour called an omer, first introduced back in chapter 16 with the manna. Grain, oil, and wine were added alongside the lamb, so each daily offering became one complete package, animal, grain, oil, and drink together, not just meat alone.

🍞 A "tenth deal" is an omer, the same unit used for manna

🫒 Grain, oil, and wine joined the lamb in one full package

🎁 Together they represented complete, well-rounded provision

---

## 🚪 A Continual Burnt Offering... Where I Will Meet You, To Speak There Unto Thee

This establishes the tabernacle entrance as the ongoing, designated meeting place between God and Israel through Moses. It wasn't just a place for animal sacrifice; it was specifically where God promised His own presence and communication would happen.

🚪 The tabernacle entrance became the designated meeting place

🗣️ God promised His presence and communication would happen there

🔁 This was permanent, not limited to the ordination week

# Exodus 29:43-46

# 🏠 I Will Dwell Among Them

---

## ✨ There I Will Meet With The Children Of Israel, And The Tabernacle Shall Be Sanctified By My Glory

God's own presence, called "glory" here, is what actually makes the tabernacle holy, not the gold, the skilled craftsmanship, or the careful instructions alone. This promise is fulfilled later in chapter 40, when the cloud of God's glory visibly fills the finished tabernacle.

✨ God's own presence, His "glory," is what truly sanctifies the place

🏗️ Skilled craftsmanship alone couldn't make it holy

☁️ Chapter 40 later shows this glory-cloud actually filling it

---

## 🔗 I Will Sanctify The Tabernacle... The Altar: I Will Sanctify Also Both Aaron And His Sons

Three different things, a place, an object, and a group of people, are all made holy by this one single declaration from God. Holiness here isn't earned by any of them separately; it's given by God to all three together.

🏠 The tabernacle, the altar, and the priests are named together

🎁 All three are made holy by God's declaration, not their own effort

🔗 This links place, object, and people into one holy system

---

## 🕊️ I Will Dwell Among The Children Of Israel, And Will Be Their God

This sentence states the real goal behind the entire Exodus story so far, plagues, Red Sea, and all of it. God's purpose was never simply rescue from slavery, it was to actually live among His people. John 1:14 later describes Jesus doing this exact thing again, since the Greek word there for "dwelt" literally means "tabernacled."

🕊️ Rescue from Egypt was never the whole goal, only the means

🏠 God's real purpose was to actually live among His people

📖 John 1:14 uses the same idea, saying Jesus "tabernacled" among us

---

## 📢 They Shall Know That I Am The Lord Their God, That Brought Them Forth Out Of The Land Of Egypt

This closing line deliberately connects the whole tabernacle project back to the deliverance from Egypt that started the book. The two ideas, rescue and nearness, are tied together on purpose: God saved them so He could live with them, not just so He could set them free and leave.

📢 This line ties the tabernacle instructions back to the Exodus itself

🔗 Rescue and nearness are presented as one connected purpose

🚶 God didn't just free Israel - He intended to stay with them`;

export const EXODUS_TWENTY_NINE_PERSONAL_SECTIONS = parseExodusTwentyNineRawNotes(EXODUS_TWENTY_NINE_RAW_NOTES);
