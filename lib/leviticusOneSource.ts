export type LeviticusOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusOneRawNotes(rawText: string): LeviticusOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 1:${startVerse}` : `Leviticus 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Leviticus 1 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_ONE_RAW_NOTES = `# Leviticus 1:1-2
# 📖 God Speaks From The Finished Tent
---
## 📣 The Lord Called Unto Moses

Being called by name in scripture usually marks a significant moment.

This exact word gives Leviticus its Hebrew name.

"Vayikra" means "and he called."

God is not shouting from a distance here.

He speaks directly and personally to Moses, by name.

That personal call opens the whole book.

📣 Being called by name marks importance

📖 Vayikra means "and he called"

🗣️ God speaks directly and personally here

➡️ This personal call opens the book

## 🏠 Out Of The Tabernacle Of The Congregation

Through most of Exodus, God spoke to Moses from Mount Sinai.

That mountain shook with thunder, smoke, and fire.

Now the tabernacle stands finished in the middle of the camp.

God's voice now comes from inside that tent instead.

The mountain is no longer needed.

God's presence has moved down into the middle of His people.

⛰️ God once spoke from Mount Sinai

🏠 Now He speaks from the finished tent

🏕️ The tabernacle sits inside the camp

📖 God's presence moved down among His people

## 🤝 If Any Man Of You Bring An Offering

The word "offering" here comes from a Hebrew word, korban.

Korban comes from a root meaning "to draw near."

An offering was never just a religious tax.

It was a structured way of drawing close to God.

Leviticus spends its opening chapters explaining exactly how that works.

🤝 Offering comes from a word meaning "draw near"

🚫 It was not a tax or a bribe

🎯 It was a way to approach God

📖 The rest of Leviticus explains how

## 🐄 Of The Cattle, Even Of The Herd, And Of The Flock

"Herd" means cattle, the oxen, bulls, and cows a family owned.

"Flock" means the smaller animals, sheep and goats.

Both were common animals any farming family already raised.

God's first instruction was not about some rare, imported animal.

It was built around what an ordinary Israelite already had in the pen.

🐂 Herd means cattle, oxen, bulls, cows

🐐 Flock means sheep and goats

🏡 Both were animals a family already owned

📖 God started with what people already had

# Leviticus 1:3-5
# 🔥 The Burnt Offering From The Herd
---
## 🔥 A Burnt Sacrifice Of The Herd

A "burnt sacrifice" is called an olah in Hebrew.

Olah literally means "that which goes up."

The entire animal is turned to smoke on the altar.

Nothing is kept back and nothing is eaten by anyone.

This is the first and most complete offering Leviticus describes.

Other offerings later in the book keep part of the animal back.

🔥 Olah means "that which goes up"

💨 The whole animal becomes smoke

🚫 Nothing is eaten by anyone

📖 This is the most complete offering type

## ✅ A Male Without Blemish

"Without blemish" means free of any physical defect.

No injury, no disease, no missing part was allowed.

This meant giving God the best animal, not a leftover one.

Centuries later, the prophet Malachi rebukes Israel for breaking this same standard.

Malachi 1:8 describes people offering blind and lame animals instead.

✅ Blemish means any physical defect

🎁 Worshippers had to give their best

🚫 No injury, disease, or missing part

📖 Malachi 1:8 rebukes this exact failure

## 🙋 Of His Own Voluntary Will

This offering was freely chosen, not commanded because of a specific sin.

Leviticus opens with worship that is willingly given.

Later chapters add offerings required after someone has done wrong.

Those required offerings come in chapters four through seven.

Willing worship comes first in this book, before any obligation.

🙋 This offering was optional, not required

📜 Required offerings come later in the book

🎯 Leviticus opens with worship freely given

➡️ Willing worship comes before obligation

## ✋ Put His Hand Upon The Head Of The Burnt Offering

Pressing a hand on the animal's head was not a casual gesture.

It identified the animal as standing in for the person bringing it.

The text calls this act part of making atonement.

"Atonement" means covering over sin and repairing a broken relationship.

One life was given in the place of another.

That single motion carried the weight of the whole offering system.

✋ Laying on hands identified the offerer

🔗 Atonement means covering sin, restoring the relationship

💔 One life given in place of another

📖 This motion carried the offering's whole meaning

## 🔪 He Shall Kill The Bullock Before The Lord

It is easy to assume the priest did the killing here.

The text says "he," continuing from the same person as the verse before.

That means the offerer himself killed the animal, not the priest.

Worship here was not just handing over an animal and walking away.

It required real, personal, costly participation.

The priest's specific job does not begin until the next step.

🔪 The offerer killed the animal himself

💪 This required direct, costly participation

👤 Not the priest, but the worshipper

➡️ The priest's job starts with the blood

## 🩸 Sprinkle The Blood Round About Upon The Altar

Leviticus later states plainly that "the life of the flesh is in the blood."

That is why blood mattered so much here.

"Round about" means all four sides of the altar.

This was a full, deliberate application, not a token splash.

It was the one part of this process an ordinary Israelite could not do himself.

Only a priest could handle this step.

🩸 Blood represented the life given up

📐 Round about means all four sides

👤 Only a priest could do this step

📖 Blood carried the weight of atonement

# Leviticus 1:6-9
# 🪓 Skinned, Cut, And Laid In Order
---
## 🪓 Flay The Burnt Offering, And Cut It Into His Pieces

"Flay" means to skin the animal, removing the hide.

The subject is still "he," the offerer, not the priest.

The offerer, not the priest, still does this cutting work.

A later law gives the hide itself to the officiating priest.

That reward comes only after this chapter, in Leviticus 7:8.

🔪 Flay means to skin the animal

💪 The offerer still does this work

🐄 The hide becomes the priest's portion later

📖 Leviticus 7:8 explains that reward

## 🔥 Put Fire Upon The Altar, And Lay The Wood In Order

Here the priest's job finally begins.

Managing the fire and stacking the wood was specifically his task.

"In order" means careful, deliberate arrangement, not tossed on randomly.

A later chapter requires this altar fire to burn continually.

It was never allowed to go out, day or night.

Worship here was handled with real attention, not thrown together.

🔥 Managing the fire was the priest's job

📏 In order means careful arrangement

🌙 The fire had to burn continually

📖 Nothing here was thrown together

## 🥩 Lay The Parts, The Head, And The Fat, In Order

The fat was considered the richest part of the animal.

Later chapters permanently forbid Israelites from ever eating this fat.

Leviticus 3:17 and 7:23 both repeat that same ban.

The fat belonged to God alone, not to any person.

Arranging the parts carefully, piece by piece, showed real reverence.

🥇 Fat was the richest part of the animal

🚫 Israelites were forever banned from eating it

🙏 Careful arrangement showed reverence

📖 Leviticus 3:17 and 7:23 repeat this ban

## 💧 His Inwards And His Legs Shall He Wash In Water

"Inwards" means the internal organs.

Both the organs and the legs needed washing before the fire.

Legs were dirty from walking, organs from the animal's own digestion.

Washing combined ordinary hygiene with a symbolic point.

Nothing unclean was allowed to touch God's altar.

Not even dirt that was nobody's fault.

💧 Inwards means the internal organs

🧼 Legs and organs both needed washing

✨ Nothing unclean touched God's altar

📖 Even ordinary dirt had to be removed first

## 🌬️ A Sweet Savour Unto The Lord

"Sweet savour" is picture language for a pleasing smell.

It describes acceptance, not literal hunger.

God was never hungry for smoke.

The phrase means the offering, brought rightly, was received and approved.

This same idea later describes Christ's own sacrifice.

Ephesians 5:2 borrows this exact phrase for that purpose.

🌬️ Sweet savour means a pleasing smell

🚫 God was never hungry for smoke

✅ It means the offering was accepted

📖 Ephesians 5:2 reuses this exact phrase

# Leviticus 1:10-13
# 🐑 The Same Offering, From The Flock
---
## 🐑 Of The Flocks, Namely, Of The Sheep, Or Of The Goats

This is the second, less costly tier of the burnt offering.

It was meant for a family that did not own cattle.

Sheep and goats were smaller and cheaper than herd animals.

That made this law reachable for people with fewer resources.

The core requirement stayed exactly the same either way.

Still a male, and still without blemish.

🐑 Sheep and goats cost less than cattle

💰 This made the offering reachable for the poor

✅ The requirements stayed exactly the same

📖 A cheaper animal still had to be perfect

## 🧭 Kill It On The Side Of The Altar Northward

This is a brand new detail, not mentioned for the herd offering earlier.

An exact compass direction is now given.

The altar's north side becomes a repeated location later in Leviticus.

Several offering types, including certain sin offerings, are slaughtered there too.

Specific locations mattered here, not just general instructions.

🧭 This is the chapter's first compass direction

📍 The north side becomes a repeated location

⚖️ Sin offerings later use this same spot

📖 Precise locations mattered, not just general rules

## 🔁 The Priest Shall Lay Them In Order On The Wood

This wording nearly repeats the herd instructions from a few verses earlier.

That repetition is not lazy writing.

It is deliberate.

Whether a worshipper brought an expensive ox or a cheaper lamb, the process stayed the same.

The priest's careful attention did not change with the price tag.

🔁 This repeats the herd instructions closely

🎯 The repetition is deliberate, not lazy

⚖️ A cheap animal got the same careful process

📖 Price never changed how carefully priests worked

## ⚖️ It Is A Burnt Sacrifice, An Offering Made By Fire

This exact refrain already closed the herd offering a few verses earlier.

It will close the bird offering too, at the very end of this chapter.

The identical wording, repeated for every tier, says something plainly.

Acceptance before God was never based on the price tag of what a person brought.

A poor worshipper's offering was received just as fully as a wealthy one's.

🔁 This exact phrase closes every tier

💰 Cost never decided how God received it

🤝 Cheap and costly offerings were equal

📖 Acceptance never depended on price

# Leviticus 1:14-17
# 🕊️ Even A Bird Was Enough
---
## 🕊️ Turtledoves, Or Of Young Pigeons

This is the third and most affordable tier in the whole chapter.

It was for someone who could not manage even a sheep or a goat.

Turtledoves and young pigeons were common, inexpensive birds across Israel.

Centuries later, Mary and Joseph bring exactly this offering at Jesus's dedication.

Luke 2:24 records that quiet detail confirming the family's poverty.

🕊️ Birds were the cheapest option in the chapter

💰 Turtledoves and pigeons cost very little

👪 Mary and Joseph brought this exact offering

📖 Luke 2:24 quietly reveals their poverty

## ✋ Wring Off His Head, And Burn It On The Altar

For the first time in this chapter, the priest does the actual killing.

With the ox or the sheep, the offerer killed the animal himself.

A bird's small size made this task better suited to a priest's hands.

The priest's role grows here compared to the earlier instructions.

Its size, not its worth, is what changed the process.

✋ The priest kills the bird himself here

🐦 A bird's size suited a priest's hands

📈 The priest's role grows as the offering shrinks

📖 Size changed the process, not the worth

## 🍽️ Pluck Away His Crop With His Feathers

A bird's "crop" is a digestive pouch near its throat.

It often held undigested food and grit.

That pouch was not fit to burn as part of the offering.

It had to be removed and cast beside the altar.

The "place of the ashes" was a fixed, set spot for this waste.

A later chapter mentions this same spot as part of the priest's regular duties.

🍽️ Crop means a bird's digestive pouch

🗑️ It was not fit to burn

📍 The place of ashes was a fixed spot

📖 Leviticus 6 mentions this same spot again

## ✂️ Cleave It With The Wings Thereof, But Shall Not Divide It Asunder

"Cleave" here means to split or tear partway open.

Not completely apart.

The ox and the sheep were fully cut into separate pieces.

The small bird stayed mostly in one piece as it went on the fire.

Even the cheapest offering in the chapter got its own precise instructions.

Nothing here was treated carelessly just because it was small.

✂️ Cleave means split partway, not severed

🐦 The bird stayed mostly in one piece

📋 Even the cheapest offering got exact instructions

📖 Small did not mean careless

## 🔁 It Is A Burnt Sacrifice, An Offering Made By Fire, Of A Sweet Savour Unto The Lord

This same closing line now finishes all three offering types in the chapter.

Herd, flock, and bird all end with the exact same words.

That identical ending is impossible to miss.

God's acceptance never scaled with what a worshipper could afford.

Leviticus makes this point plain in its very first chapter.

Everything else in the book builds on that same foundation.

🔁 This same phrase closes all three tiers

⚖️ Acceptance never scaled with the price

📖 Leviticus opens on this exact point

➡️ Everything after builds on this foundation`.trim();

export const LEVITICUS_ONE_PERSONAL_SECTIONS = parseLeviticusOneRawNotes(LEVITICUS_ONE_RAW_NOTES);
