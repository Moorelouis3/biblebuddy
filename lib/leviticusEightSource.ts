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

This is not a brand new decision.

God already chose Aaron and his sons as priests back in Exodus 28.

Leviticus 8 is the day that choice finally becomes real.

Nothing here decides who will serve.

It only carries out a plan chosen long before.

👑 Aaron's role was chosen long ago

📜 Exodus 28 made this decision

🎬 Chapter 8 finally acts it out

📖 This only carries out an older plan

---

## 👘 And The Garments

The priestly garments were not made on the spot.

They were designed and sewn back in Exodus 28, long before this day.

Coats, robes, the ephod, and the breastplate had been sitting finished and ready.

This chapter is the first time anyone actually puts them on.

👘 The garments were designed back in Exodus 28

🪡 They were already sewn and finished

⏳ They had been waiting for this day

📖 Chapter 8 is their first real use

---

## 🫗 The Anointing Oil

This oil was not ordinary cooking or cosmetic oil.

God gave Moses its exact recipe back in Exodus 30.

It blended olive oil with rare, costly spices.

It was reserved only for setting people and things apart for God.

Using it for anything ordinary was strictly forbidden.

🫗 This oil followed a recipe from Exodus 30

🌿 It blended olive oil with rare spices

🚫 Ordinary, everyday use was forbidden

📖 Its purpose was setting people apart for God

---

## 🐂 A Bullock For The Sin Offering, And Two Rams

Three animals were gathered for this one ceremony.

The bullock dealt with sin.

That matches the same role a bullock played in chapter four.

The two rams were not for the same purpose as each other.

One ram would become a burnt offering.

The other would carry its own title, the ram of consecration.

🐂 Three animals total, one bullock and two rams

🔁 The bullock's role matches chapter four's sin offering

🐑 The two rams would serve two different purposes

📖 Nothing here was chosen at random

---

## 🍞 A Basket Of Unleavened Bread

"Unleavened" means made without yeast.

Bread with no yeast was required near the altar fire.

Chapter two already set that same rule.

This one basket held three different kinds of bread.

All three would be used later in this ceremony.

🍞 Unleavened means made without yeast

🔥 No yeast allowed near the altar fire

🧺 One basket held three different bread styles

📖 All three would be used in this ceremony

---

## 👥 Gather Thou All The Congregation Together

This was not a private moment just for Aaron's family.

Moses called the entire community of Israel to come and watch.

Becoming a priest was never meant to be a secret transaction.

The whole nation needed to see this happen with their own eyes.

👥 The whole community was called to watch

🙅 This was not a private family event

👀 Israel needed to see it happen

📖 Priesthood began in full public view

---

## ✅ Moses Did As The LORD Commanded Him

Moses performs every action in this chapter, not Aaron.

Aaron cannot ordain himself into an office he does not hold yet.

Someone already qualified has to carry out the ceremony that makes him a priest.

This same line repeats again and again through the chapter.

✅ Moses acts, not Aaron, throughout the chapter

🔄 Aaron could not ordain himself

🙋 Someone already qualified had to lead the ceremony

📖 This obedience line repeats all through the chapter

---

## 📣 This Is The Thing Which The LORD Commanded To Be Done

Moses says this out loud to the whole watching crowd.

He is telling them plainly that this ceremony was God's idea, not his own.

The people needed to trust that real authority stood behind what they were about to see.

A ceremony without that authority would have meant nothing.

📣 Moses credits God, not himself

👥 The crowd needed to know the source

⚖️ Real authority stood behind this ceremony

📖 Without that authority, none of this meant anything

# Leviticus 8:6-9

# 👘 Dressing The High Priest

---

## 💧 Washed Them With Water

This was a full ceremonial washing, not a quick rinse.

Exodus 29 already described this exact requirement.

The washing marked a real change in status for Aaron and his sons.

They were stepping out of ordinary life and into holy service.

💧 This was ceremonial washing, not routine hygiene

🔄 It marked a real change in status

✨ They stepped into a new, holy role

📖 Exodus 29 already required this step

---

## 🧥 The Coat

The coat was Aaron's innermost garment.

He wore it closest to his own body.

It was made of closely woven, fitted cloth.

Every other garment in this list was worn over top of it.

🧥 The coat sat closest to Aaron's body

🪡 It was fitted, woven cloth

📚 Every other garment went on over it

📖 Dressing began from the inside out

---

## 🎗️ Girded Him With The Girdle

A girdle was a sash tied around the waist.

It held loose, flowing clothing in place.

Wearing one also marked a person as ready for active work.

This was not the clothing of someone relaxed or off duty.

🎗️ A girdle was a waist sash

🔒 It kept loose clothing under control

🏃 It marked readiness for active work

📖 Not the look of someone off duty

---

## 🔵 Clothed Him With The Robe

The robe was a blue outer garment worn over the coat.

Exodus 28 describes its hem in detail, decorated with bells and pomegranates.

That color and detail were not available to ordinary people.

Blue dye alone was rare and expensive in the ancient world.

🔵 A blue robe worn over the coat

🔔 Exodus 28 describes its bell and pomegranate hem

💎 Blue dye was rare and costly

📖 This robe marked no ordinary person

---

## 🦺 Put The Ephod Upon Him

The ephod looked something like an apron.

It had a front panel and a back panel joined at the shoulders.

Aaron wore it over the blue robe.

It also served as the base that held the breastplate in place.

🦺 The ephod looked like an apron

🔗 Front and back panels joined at the shoulders

👔 It was worn over the blue robe

📖 It held the breastplate in place next

---

## 🧵 The Curious Girdle Of The Ephod

"Curious" in this old English sense means skillfully made, not strange.

This was a separate band attached specifically to the ephod.

It was distinct from the plain girdle already tied on in verse seven.

Its job was holding the ephod snug against Aaron's body.

🧵 Curious here means skillfully made

🔀 A separate band, not the earlier plain girdle

🦺 It belonged specifically to the ephod

📖 It held the ephod snug in place

---

## 💎 The Breastplate

The breastplate was a square pouch worn over Aaron's chest.

It held twelve gemstones, one for each tribe of Israel.

Exodus 28 gives the full, stone by stone description.

Aaron literally carried the whole nation over his own heart.

💎 A square pouch worn on the chest

💠 Twelve stones, one for each tribe

❤️ Aaron carried Israel's identity over his heart

📖 Exodus 28 names each stone in full

---

## 🎲 The Urim And The Thummim

These were two objects placed inside the breastplate pouch.

Scripture never describes what they actually looked like.

Their function was seeking a clear yes or no answer from God.

Priests used them for decisions too important to guess at.

🎲 Two objects placed inside the breastplate

❓ Scripture never describes their appearance

🧭 They helped seek clear answers from God

📖 Used for decisions too important to guess

---

## 🎩 The Mitre

The mitre was a wrapped head covering shaped like a turban.

Only the high priest wore this specific piece.

Aaron's sons would wear something plainer, described a few verses later.

Even headwear marked out a difference in rank.

🎩 A wrapped covering shaped like a turban

👑 Worn only by the high priest

🔀 Aaron's sons wore something plainer

📖 Rank showed even in headwear

---

## 🏅 The Golden Plate, The Holy Crown

This gold plate was engraved with the words Holiness To The LORD.

Exodus 28 records that exact inscription.

It sat on Aaron's forehead, the most visible point on his whole body.

It worked like a silent, permanent announcement of his purpose.

🏅 Engraved with Holiness To The LORD

👁️ Placed on his forehead, the most visible point

📢 A silent, constant announcement of his purpose

📖 Exodus 28 records the inscription

# Leviticus 8:10-13

# 🫗 Anointing With Oil

---

## ⛺ Anointed The Tabernacle And All That Was Therein

Consecration in this ceremony was not limited to people.

The tent itself and everything inside it were anointed too.

That included the furniture, the tools, and every object used there.

The whole space, not just its ministers, was set apart for God.

⛺ The tent itself was anointed

📦 Everything inside received the same treatment

🎯 Objects, not only people, were set apart

📖 Holiness covered the whole space

---

## 🔢 Sprinkled Thereof Upon The Altar Seven Times

Seven shows up again and again through Leviticus.

The number consistently points to completeness, a job done in full.

Sprinkling the altar seven times marked a slow, deliberate act.

This was not a single quick touch.

🔢 Seven often signals completeness in Leviticus

🎯 This was slow and deliberate

🚫 Not a single, quick touch

📖 A full, careful act of consecration

---

## 🔥 Anointed The Altar And All His Vessels

Every tool used at the altar was anointed too.

That means basins, forks, shovels, and every other piece of equipment.

None of it stayed separate from the altar's own holiness.

The whole working system was set apart together, as one unit.

🔥 The altar's tools were anointed too

🛠️ Basins, forks, and shovels were all included

🎯 Nothing in the system was left out

📖 One holy system, treated as one unit

---

## 🪣 Both The Laver And His Foot

The laver was a large bronze basin used for washing.

Exodus 30 first introduced it, for priests to wash their hands and feet.

Its "foot" means the stand or base it rested on.

Both the bowl and its base were anointed, not just one piece.

🪣 The laver was a bronze washing basin

🦶 Foot here means its stand or base

🎯 Both the bowl and base were anointed

📖 Exodus 30 first introduced this basin

---

## 👑 Poured Of The Anointing Oil Upon Aaron's Head

The altar was only sprinkled.

Aaron himself was anointed by pouring, not sprinkling.

Oil ran generously down over his head in front of the whole crowd.

This personal, visible anointing is the root of a very old idea.

The word messiah comes from the Hebrew word for someone anointed this way.

👑 Pouring, not sprinkling, marked this as personal

👁️ It happened in front of the whole crowd

✨ Anointing marked Aaron as set apart

📖 This is the root of the word messiah

---

## 👔 Put Coats Upon Them, And Girded Them With Girdles

Aaron's sons received the same first layer Aaron wore in verse seven.

They did not receive anything beyond that at this point.

No robe, no ephod, no breastplate, and no mitre for them.

Their simpler clothing marked a real difference in rank.

👔 Sons received the same first layer as Aaron

🔽 Nothing beyond that layer, not yet

👑 Their clothing was visibly simpler

📖 Rank showed clearly in what they wore

---

## 🎩 Put Bonnets Upon Them

"Bonnets" were plain head coverings worn by ordinary priests.

They were nothing like Aaron's elaborate mitre and golden plate.

Every priest's head was covered during the ceremony.

Only the high priest's covering carried the engraved words of holiness.

🎩 A plain head covering for ordinary priests

🔀 Not the same as Aaron's mitre

👑 Only Aaron's covering bore the holy inscription

📖 Even headwear marked out rank

# Leviticus 8:14-17

# 🐂 The Sin Offering Bullock

---

## 🤲 Laid Their Hands Upon The Head Of The Bullock

This gesture links the person offering the animal to the animal itself.

Chapter four already used this same act for a sin offering.

Here, Aaron and his sons all laid hands together, not one man alone.

That showed this single offering covered the whole incoming priestly family at once.

🤲 This matches chapter four's identification gesture

👨‍👦 Aaron and his sons laid hands together

👪 One offering covered the whole family

📖 Their shared guilt received one shared offering

---

## 🩸 Put It Upon The Horns Of The Altar

"Horns" here means the four raised corners of the altar, not animal horns.

Moses placed the bullock's blood there with his own finger.

Chapter four already set this exact blood procedure for a sin offering.

This differed from the wider sprinkling used for other kinds of offerings.

🩸 Horns means the altar's raised corners

☝️ Moses applied the blood with his finger

🔀 Different from the wider sprinkling used elsewhere

📖 Chapter four already set this procedure

---

## 🧹 To Make Reconciliation Upon It

Surprisingly, the altar itself needed purifying here, not only the people.

This object would be used for every sacrifice still to come.

Even the tools of holy service had to be set right first.

Nothing connected to worship was treated as automatically clean.

🧹 The altar itself needed cleansing

⚙️ It would serve every future sacrifice

🎯 Nothing in holy service was automatically clean

📖 Even objects needed to be set right

---

## 🫀 The Fat, The Caul Above The Liver, And The Two Kidneys

This is the identical list of fat portions required back in chapters three and four.

The same specific parts were burned on the altar every time.

It made no difference which particular event brought the animal there.

One consistent rule applied across many different occasions.

🫀 Same fat list as chapters three and four

🔥 These parts were always burned on the altar

🔁 One rule, applied to many occasions

📖 Consistency ran through the whole system

---

## 🏕️ He Burnt With Fire Without The Camp

Normally a priest could eat some meat from a sin offering.

No ordained priest existed yet to receive that portion.

So the entire bullock, hide, flesh, and waste, was destroyed outside the camp.

Nothing was left for anyone to eat this time.

🏕️ The whole animal was destroyed outside the camp

🚫 No priest existed yet to eat it

🔥 Hide, flesh, and waste were all burned

📖 This one exception fit the moment exactly

# Leviticus 8:18-21

# 🔥 The Burnt Offering Ram

---

## 🐑 The Ram For The Burnt Offering

This is the first of the two rams named back in verse two.

The bullock just handled Aaron's need for forgiveness.

This ram represents something different, total and willing devotion.

Nothing here was held back.

🐑 The first of two rams from verse two

🔀 A different purpose than the bullock

🔥 It represented total, willing devotion

📖 Ordination needed forgiveness and devotion both

---

## 🩸 Sprinkled The Blood Upon The Altar Round About

"Round about" means splashed on every side of the altar.

Chapter one already set this exact procedure for a burnt offering.

This differs from the horns only application just used on the bullock.

Two offerings, two very different blood procedures.

🩸 Round about means splashed on every side

🔀 Different from the bullock's horns only method

🎯 Two offerings, two different procedures

📖 Chapter one already set this procedure

---

## 🔪 Cut The Ram Into Pieces

Butchering the ram into sections came before it was burned.

Chapter one already prescribed this same step for any burnt offering.

Nothing about this method was invented for this ceremony.

It was simply the standard procedure, applied here like anywhere else.

🔪 Butchering came before burning

🔁 A standard method, not a new one

🎯 Applied here the same as anywhere

📖 Chapter one already required this step

---

## 💧 Washed The Inwards And The Legs In Water

Every part of this ram was about to be burned completely.

Even so, the internal organs and legs still had to be washed first.

Chapter one already required this exact step.

Cleanliness mattered here no matter what happened to the meat next.

💧 Washing happened even though it would all burn

🧼 Cleanliness mattered regardless of final use

🎯 No shortcut, even for a ram fully burned

📖 Chapter one already required this step

---

## 🔥 Burnt The Whole Ram Upon The Altar

The bullock earlier had only its fat burned on the altar.

This entire ram, by contrast, went completely into the fire.

Nothing here was set aside or saved for later use.

This is exactly what makes it a true burnt offering.

🔥 The whole ram burned, not just its fat

🚫 Nothing was held back or saved

✅ This made it a true burnt offering

📖 Total devotion left in ashes, not leftovers

---

## 🌬️ A Sweet Savour, An Offering Made By Fire

"Sweet savour" describes God receiving an offering favorably, like a pleasing smell.

"An offering made by fire" is the technical name for any gift burned this way.

Chapters one through three already used both phrases for earlier offerings.

Together they tie this ordination sacrifice to the wider sacrificial system.

🌬️ Sweet savour means God receiving it favorably

🔥 Offering by fire is the formal term

🔗 This ties ordination to the wider system

📖 Chapters one through three used both phrases

# Leviticus 8:22-24

# 👂 Blood On Ear, Hand, And Foot

---

## 🐑 The Ram Of Consecration

This is the third and final animal offered in this chapter.

It receives its own special name, separate from the plain burnt offering ram.

That name marks it as unique to this one ceremony.

Nothing offered in ordinary worship carried this exact title.

🐑 The third and final animal in this chapter

🏷️ It carries its own special name

🎯 Unique to this one ordination ceremony

📖 No ordinary offering used this title

---

## 👂 The Tip Of Aaron's Right Ear

Moses placed blood on the very tip of Aaron's ear.

This act dedicated Aaron's hearing to God's service.

From now on, his ability to listen for God's instructions was marked as holy.

Blood, not oil, performed this particular consecration.

👂 This dedicated Aaron's hearing to God

🎯 His ability to listen was marked holy

🩸 Blood, not oil, did this consecration

📖 Even hearing itself was set apart

---

## 👍 The Thumb Of His Right Hand

Blood on the thumb dedicated Aaron's hands to God.

These same hands would perform sacred rituals for the rest of his life.

They would handle offerings, sprinkle blood, and serve at the altar constantly.

Every future action of these hands was marked holy in advance.

👍 This dedicated Aaron's hands to God

🛠️ These hands would serve at the altar

🔁 The same act was applied to feet too

📖 Future service was marked holy in advance

---

## 🦶 The Great Toe Of His Right Foot

Blood on the toe dedicated Aaron's feet and his whole way of walking.

A priest needed to move constantly around the tabernacle grounds while serving.

Ear, hand, and foot together marked his entire body as set apart.

No part of Aaron was left outside this consecration.

🦶 This dedicated Aaron's feet and movement

🚶 Priests moved constantly around the tabernacle

👪 Ear, hand, and foot marked his whole body

📖 No part of Aaron was left out

---

## 💪 Why The Right Side

Ear, hand, and foot were all specifically on the right side.

The left side was never used in this ceremony.

In Hebrew thought, the right side carried associations of strength and honor.

Choosing it consistently marked the most honored side of the body as holy.

💪 The right side was chosen every time

🚫 The left side was never used

👑 Right carried associations of strength and honor

📖 The most honored side was marked holy

---

## 👨‍👦 Upon The Tip Of Their Right Ear

Aaron's sons received the identical three point treatment, ear, thumb, and toe.

Nothing about their version was shortened or made lesser.

Full consecration extended to the whole incoming priestly line.

Not Aaron alone, but every son serving beside him.

👨‍👦 Sons received the identical three part treatment

🚫 Nothing was shortened for them

👪 The whole priestly line was consecrated

📖 Not Aaron alone, but his sons too

# Leviticus 8:25-29

# 🔃 Waving The Ordination Offering

---

## 🫀 The Fat, And The Rump, The Caul Above The Liver, And The Two Kidneys

This is the same fat portion list already required for a peace offering.

Chapters three and seven already listed these exact same parts.

Using this list here shows the ram of consecration functioned partly like a peace offering.

The pattern from earlier chapters carries straight into this one.

🫀 Same fat list as chapters three and seven

🔗 This ram partly functioned like a peace offering

🔁 A familiar pattern, reused here

📖 Old rules still shaped a new ceremony

---

## 💪 The Right Shoulder

Normally the right shoulder became the officiating priest's own food.

Chapter seven already explained that exact rule for a peace offering.

Here it goes straight onto the altar fire instead.

No ordained priest existed yet to receive it as a meal.

💪 Normally this became the priest's own portion

🔥 Here it burned on the altar instead

🚫 No priest yet existed to eat it

📖 Chapter seven already explained that rule

---

## 🧺 The Basket Of Unleavened Bread

This is the same basket first mentioned back in verse two.

It held three separate kinds of bread, not just one.

Chapter seven already described this same three style bread pattern.

That pattern belonged to the thanksgiving version of a peace offering.

🧺 The same basket introduced in verse two

🍞 It held three distinct bread items

🔗 It belonged to a thanksgiving peace offering

📖 Chapter seven already described this pattern

---

## 🍞 Put Them On The Fat, And Upon The Right Shoulder

The bread was physically stacked on top of the meat portions.

Both elements were combined into one single presentation.

Nothing about this arrangement was accidental.

This setup prepared everything for the next step in the ritual.

🍞 Bread was stacked on top of the meat

📦 The pieces were combined before waving

🎯 Nothing about this setup was accidental

➡️ This prepared everything for the wave offering next

---

## 🤲 Put All Upon Aaron's Hands, And Upon His Sons' Hands

Their hands were physically filled with these food offerings.

Many scholars connect this act to the Hebrew phrase behind the word ordination.

That phrase is sometimes translated fill the hand.

This verse may be the literal origin of that whole idea.

🤲 Their hands were physically filled with food

📜 Hebrew for ordination means fill the hand

🎯 This verse may be that phrase's origin

📖 Many scholars trace this back to that word

---

## 🔃 Waved Them For A Wave Offering Before The LORD

Chapter seven already explained this same wave offering gesture.

It involved a side to side motion in front of the altar.

This physically presented the food to God before its final use was decided.

The gesture came first, and only then was the food actually used.

🔃 A side to side motion before the altar

📖 Chapter seven already explained this gesture

👀 It presented the food to God first

➡️ The final use came only after the gesture

---

## 🔥 Burnt Them Upon The Altar Upon The Burnt Offering

In an ordinary peace offering, these portions might go to a priest as food.

Aaron was not yet functioning in a role to receive that food.

So Moses personally burned the fat and bread on the altar himself.

The ceremony kept adjusting around the simple fact that no priest existed yet.

🔥 Moses burned these portions himself

🚫 Aaron could not yet receive them as food

🔁 The ceremony adapted to the missing priest

📖 Every step accounted for that missing role

---

## 📢 Consecrations For A Sweet Savour

This ram and its bread receive a brand new label, consecrations.

That word is not used for Israel's ordinary, everyday sacrifices.

It marks this offering's unique purpose, ordaining a priest for the first time.

Even so, its actual handling matched familiar burnt and peace offering methods.

📢 Consecrations is a new label here

🎯 It marks this offering's unique purpose

🔁 Yet the handling matched familiar methods

📖 A new name for a first time event

---

## 🍖 The Breast, For Moses' Part

Chapter seven already explained that a peace offering's breast goes to the whole priestly family.

No ordained priesthood existed at this exact moment in the story.

So Moses personally kept this one breast as his own portion.

It belonged to him alone, and it was never repeated again.

🍖 Normally shared among the whole priestly family

🙋 Moses kept this one breast for himself

🎯 A portion that belonged to him alone

📖 Chapter seven already explained that rule

# Leviticus 8:30

# 🩸 Oil And Blood On The Garments

---

## 🫗 Oil, And Of The Blood Which Was Upon The Altar

This mixture combined the anointing oil with blood already on the altar.

Nowhere else in Leviticus does this exact combination appear again.

Earlier in this same chapter, oil and blood were used separately.

Here, for one final act, both consecration methods were joined into one.

🫗 Oil and altar blood were mixed together

❓ This exact mixture appears nowhere else in Leviticus

🔗 It combined two methods used separately earlier

📖 One final act joined both together

---

## 👘 Sprinkled It Upon Aaron, And Upon His Sons, And Their Garments

This mixture was sprinkled on Aaron, on his sons, and on their clothing.

The men and their garments were sanctified together in one motion.

The priestly office and the clothing worn while serving in it were never treated as separate.

Nothing here singled out Aaron above the sons standing beside him.

👘 Men and garments were sanctified together

🔗 Office and clothing were treated as one

👪 Aaron and his sons received it equally

📖 Consecration reached what they wore, not only them

# Leviticus 8:31-36

# 🚪 Seven Days At The Tabernacle Door

---

## 🍲 Boil The Flesh At The Door, And Eat It There

The ram of consecration's meat was finally eaten by Aaron and his sons.

It was cooked right at the tabernacle entrance, where the whole ceremony took place.

The unleavened bread from the basket in verse twenty six was eaten alongside it.

This shared meal completed everything the ceremony had been building toward.

🍲 The consecration ram's meat was finally eaten

🚪 Cooked right where the ceremony happened

🍞 Eaten with the bread from verse twenty six

📖 The meal completed the whole ceremony

---

## 🔥 That Which Remaineth Shall Ye Burn With Fire

Chapter seven already gave this same no leftovers rule for other offerings.

Nothing from this sacred meal could be saved and eaten later.

Anything left over had to be destroyed by fire instead.

A familiar rule, applied here to a ceremony that only happened once.

🔥 No leftovers could be saved from this meal

⏰ Extra food had to be burned, not stored

🔁 A familiar rule for a one time event

📖 Chapter seven already gave this rule

---

## 🚪 Ye Shall Not Go Out Of The Door In Seven Days

This meant staying at the tabernacle entrance for an entire week.

This was a real, physically demanding commitment, not a quick ritual.

No stepping away was allowed during this whole time.

The ceremony did not end after one day and send everyone home.

🚪 A full week confined at the entrance

⏳ A real commitment, not one quick ritual

🚫 No stepping away was allowed

📖 It did not end after a single day

---

## 🔢 For Seven Days Shall He Consecrate You

Seven again marks completeness.

Verse eleven already used the same number for the altar.

This was chosen on purpose, never picked at random.

The number seven ties the whole chapter together.

🔢 Seven again signals completeness

🎯 The number was chosen on purpose

🔁 It ties the whole chapter together

📖 Verse eleven already used this same number

---

## 📜 As He Hath Done This Day, So The LORD Hath Commanded To Do

Every single action Moses performed in this chapter was not improvised.

Exodus 29 already laid out these exact instructions in advance.

Moses followed a plan written long before this day arrived.

Nothing about this ceremony was made up as it went along.

📜 Nothing here was improvised by Moses

✅ Every action matched a plan made in advance

🎯 Never made up on the spot

📖 Exodus 29 laid out these instructions first

---

## 🙏 To Make An Atonement For You

Even the priests themselves needed atonement before serving anyone else.

Aaron and his sons were not automatically holy just by being born into it.

Being appointed to the role did not make them qualified on its own.

The mediators needed the very same process required of everyone else.

🙏 Priests needed atonement before mediating for others

🚫 Birth and appointment alone did not qualify them

🔁 They needed the same process as everyone else

📖 No one stood outside the need for atonement

---

## 👀 Abide At The Door, Day And Night, Seven Days

This clarifies exactly what the seven day requirement meant.

Aaron and his sons had to stay through the nights too.

Going home each evening was never an option during this week.

The commitment was continuous, not just a string of long workdays.

👀 This clarified what seven days truly meant

🌙 Nights were included, not only daytime hours

🚫 Going home each evening was not allowed

📖 The commitment was continuous, day and night

---

## 🛡️ Keep The Charge Of The LORD

"Charge" here means an assigned duty or watch responsibility.

This specific word becomes standard priestly vocabulary from this point forward.

It appears again and again through the rest of Leviticus and into Numbers.

A single word here sets a pattern for the rest of the priestly law.

🛡️ Charge means an assigned duty or watch

🔁 It repeats often through Leviticus and Numbers

🎯 One word here sets a lasting pattern

📖 This becomes standard priestly vocabulary

---

## ⚰️ That Ye Die Not

This is a genuine warning, not simply a figure of speech.

Failing to properly finish this consecration put Aaron and his sons at real risk.

Nearness to holy things carried real danger in this system.

Casual handling of sacred things was never treated as a small mistake.

⚰️ A genuine warning, not just words

⚠️ Failing this process risked their actual lives

🎯 Nearness to holy things carried real danger

📖 Sacred things were never treated casually

---

## ✅ So Aaron And His Sons Did All Things Which The LORD Commanded

The chapter closes by confirming complete, full obedience.

Every single instruction across this long chapter was carried out exactly as given.

Nothing was skipped, and nothing was changed along the way.

This sets up chapter nine, where Aaron finally serves as priest for the first time.

✅ The chapter ends confirming full obedience

🎬 Every instruction was carried out exactly

🚫 Nothing was skipped or changed

➡️ Chapter nine begins Aaron's first day as priest`.trim();

export const LEVITICUS_EIGHT_PERSONAL_SECTIONS = parseLeviticusEightRawNotes(LEVITICUS_EIGHT_RAW_NOTES);
