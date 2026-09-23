export type IsaiahThirtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahThirtyTwoRawNotes(rawText: string): IsaiahThirtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahThirtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+32:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 32 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+32:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+32:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 32 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 32,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 32:${startVerse}` : `Isaiah 32:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Isaiah 32 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_THIRTY_TWO_RAW_NOTES = `# Isaiah 32:1-2
# 👑 A Righteous King And A Sheltering Man
---
## 👑 A King Shall Reign In Righteousness

"Behold" signals a promise worth stopping for.

Isaiah has spent many chapters describing failed, selfish kings.

"Righteousness" means right standing before God.

That is different from raw political power.

This king rules by that different standard.

Christians later read this promise as pointing straight to Jesus.

👑 Behold signals an important promise
⚠️ Isaiah has described many failed kings
✅ Righteousness means right standing before God
📖 The promise points forward to Jesus

## ⚖️ Princes Shall Rule In Judgment

"Judgment" here means fair, careful legal decisions.

It is not the same as gloom or condemnation.

"Princes" were the king's officials, not just his sons.

Under a righteous king, his whole government reflects him.

Justice was meant to run all the way down.

It does not stop at the very top.

⚖️ Judgment means fair legal decisions
🚫 Not gloom or condemnation here
👥 Princes were the king's officials
📖 Justice runs through the whole government

## 🌬️ A Man Shall Be As An Hiding Place From The Wind, And A Covert From The Tempest

Hebrew poetry often repeats one idea using two different pictures.

That habit is called parallelism.

This verse is a clear example of it.

"A hiding place" and "a covert" name the same thing, shelter.

"Covert" pictures a hidden, sheltered spot, like a thicket an animal hides in.

A "tempest" is a violent storm, not just heavy rain.

🌬️ Wind and storm need real shelter
🔁 Parallelism repeats one idea twice
🏚️ Covert means a hidden sheltered spot
📖 This king shelters his people fully

## 💧 As Rivers Of Water In A Dry Place

Water in a desert region was never taken for granted.

A dry land could turn deadly within a single day without it.

Rivers meant survival itself, not simply comfort.

This king is pictured as exactly that kind of life giving source.

His rule sustains people the way a hidden river sustains a traveler.

💧 Water was survival, not comfort
🏜️ A dry land could turn deadly fast
🌊 Rivers meant real, ongoing survival
📖 This king gives life like a hidden river

## 🪨 As The Shadow Of A Great Rock In A Weary Land

A "weary land" pictures scorching heat with no relief in sight.

Shade from a massive rock could mean the difference between rest and collapse.

Think of walking for hours under a burning sun with nowhere to stop.

Then finding one huge slab of stone throwing shade across the ground.

That is the kind of relief this king provides for his people.

🪨 A great rock offered real shade
☀️ Weary land pictures relentless heat
🚶 Shade meant rest instead of collapse
📖 This king offers that same relief

# Isaiah 32:3-4
# 👀 Eyes That See, Ears That Hear
---
## 👁️ The Eyes Of Them That See Shall Not Be Dim

Isaiah already used blind eyes and deaf ears as pictures earlier in this book.

Back then, they described a people who refused to understand God's message.

"Dim" eyes could technically see, yet still miss the point entirely.

Under this coming king, that spiritual blindness finally lifts.

The real problem was always understanding, not physical sight.

👁️ Isaiah already used this picture before
🙈 Blind eyes meant refusing to understand
💡 Dim means seeing without truly grasping
📖 This king lifts that spiritual blindness

## 👂 The Ears Of Them That Hear Shall Hearken

"Hearken" means far more than simply catching a sound.

It means listening closely enough to actually respond and obey.

A person can hear words perfectly and still never hearken to them.

Isaiah's warnings earlier in this book often fell on ears like that.

Under this king, hearing finally turns into real, active listening.

👂 Hearken means listening enough to obey
🔇 Hearing sound is not the same
⚠️ Isaiah's warnings often went unheeded before
📖 This king turns hearing into action

## 🧠 The Heart Also Of The Rash Shall Understand Knowledge

"Rash" describes someone who acts quickly without thinking things through.

In the Bible, the "heart" usually means the mind and will together.

A rash heart jumps to conclusions and misses what actually matters.

This verse pictures that same reckless heart finally slowing down to understand.

Wisdom was never out of reach.

It was being rushed past.

🧠 Rash means acting without thinking first
💭 Heart means the mind and will
🏃 A rash heart jumps to conclusions
📖 This king brings real understanding

## 🗣️ The Tongue Of The Stammerers Shall Be Ready To Speak Plainly

"Stammerers" were people whose speech came out broken or hard to follow.

In that culture, unclear speech could shut someone out of being taken seriously.

This verse promises that halting, struggling speech becomes clear and confident.

It pictures a full removal of whatever held people back from speaking truth.

Isaiah 35 later paints this same healing again.

There, dumb tongues finally learn to sing.

🗣️ Stammerers had broken, unclear speech
😔 Unclear speech could shut people out
🔓 This promises removal of that barrier
📖 Isaiah 35 repeats this healing later

# Isaiah 32:5-8
# ⚖️ Telling The Vile Apart From The Liberal
---
## 🎭 The Vile Person Shall Be No More Called Liberal

A "vile person" here means someone worthless and morally rotten.

"Liberal" in this old English sense means generous, not a political label.

Society was calling wicked, selfish people generous by mistake.

This verse promises that mislabeling will finally stop.

Words matter because they shape what people admire and imitate.

🎭 Vile means worthless and morally rotten
💰 Liberal here means generous, not political
🙈 Society was mislabeling wicked people generous
📖 Honest labels shape what people admire

## 🙅 Nor The Churl Said To Be Bountiful

A "churl" was a stingy, rude person who hoarded instead of sharing.

"Bountiful" describes someone genuinely generous with what they have.

Calling a churl bountiful flattered someone who did not deserve it.

This verse restores an honest gap between the two.

A generous reputation should belong only to genuinely generous people.

🙅 Churl means a stingy, rude person
🎁 Bountiful means genuinely generous
🚫 Flattery gave churls a fake reputation
📖 Honest reputations return to the deserving

## 😈 The Vile Person Will Speak Villany, And His Heart Will Work Iniquity, To Practise Hypocrisy

"Villany" is an old spelling of villainy, meaning wicked scheming speech.

"Iniquity" means deep moral guilt, not just an honest mistake.

"Hypocrisy" means pretending to be righteous while planning evil underneath.

This verse stacks three different pictures of the same rotten heart.

Speech, heart, and public image all point in the same wicked direction.

😈 Villany means wicked, scheming speech
⚖️ Iniquity means deep moral guilt
🎭 Hypocrisy means faking righteousness
📖 Speech, heart, and image all match here

## ☠️ To Utter Error Against The LORD

This is not just harming other people.

It is spreading lies about God himself.

"Error" here means false teaching, not a harmless slip of the tongue.

The vile person in this verse corrupts what others believe about God.

That is a deeper offense than any single unkind act.

☠️ This targets God, not just people
🗣️ Error means false teaching here
💔 It corrupts what others believe
📖 This is a deeper kind of offense

## 🍞 To Make Empty The Soul Of The Hungry, And He Will Cause The Drink Of The Thirsty To Fail

This person's wickedness does not stay hidden inside his own heart.

It reaches all the way down to who eats and who drinks.

"Empty the soul of the hungry" pictures withholding food on purpose.

Causing "the drink of the thirsty to fail" pictures the same cruelty with water.

Corrupt speech and corrupt hearts eventually starve real, physical people.

🍞 Wickedness reaches food and water supplies
🙅 Withholding food was done on purpose
💧 Drink failing pictures the same cruelty
📖 Corrupt hearts starve real people

## 🔧 The Instruments Also Of The Churl Are Evil

"Instruments" here means the methods and schemes a person uses.

Even the churl's normal, everyday tools for getting ahead are corrupt.

This is not one bad decision.

It is an entire pattern of operating dishonestly.

A stingy heart eventually builds stingy habits into everything it touches.

🔧 Instruments means methods, not weapons
🔁 This is a pattern, not one act
🏗️ Even normal tools become corrupt
📖 A stingy heart builds stingy habits

## 🕸️ He Deviseth Wicked Devices To Destroy The Poor With Lying Words

"Deviseth" means to plan out carefully, on purpose.

This is not a spontaneous outburst of cruelty.

In ancient courts, testimony at the city gate could decide a poor person's whole livelihood.

Lying words there could legally strip someone of land, freedom, or food.

This churl plans exactly that kind of harm in advance.

🕸️ Deviseth means planning on purpose
⚖️ Ancient courts ran on gate testimony
📜 Lying words could ruin a poor life
📖 This harm was planned, not accidental

## 🎁 The Liberal Deviseth Liberal Things

This verse finally turns from the churl to his opposite.

Here "deviseth" is the same planning word used for the churl's schemes.

Generosity in this verse is not an accident either.

A truly generous person plans ahead for how to give.

Good character takes as much intention as bad character does.

🎁 This verse turns to the opposite person
🧠 Deviseth again means planning ahead
💡 Generosity here is intentional, not accidental
📖 Good character takes real intention too

## 🏛️ By Liberal Things Shall He Stand

"Stand" pictures something firm and lasting, able to hold up under pressure.

The vile person's schemes in this section never get that same promise.

Generosity built a foundation the churl's cleverness could never build.

What a person gives away turns out to be sturdier than what they scheme to keep.

🏛️ Stand means firm and lasting
⚠️ The churl's schemes get no such promise
🧱 Generosity built a real foundation
📖 Giving proves sturdier than scheming

# Isaiah 32:9-14
# 😌 Warning The Careless Women
---
## 😌 Rise Up, Ye Women That Are At Ease

Isaiah suddenly shifts and speaks straight to one specific group.

"At ease" means comfortable and untroubled, not simply lazy.

These were likely wealthy women in Jerusalem, shielded from coming danger.

Comfort like theirs can make danger easy to ignore.

This warning was written to break through exactly that kind of comfort.

😌 At ease means comfortable, untroubled
👩 Isaiah addresses one specific group
🏙️ These were likely wealthy Jerusalem women
📖 Comfort can make danger easy to ignore

## 📢 Hear My Voice, Ye Careless Daughters

"Careless" in the King James Bible means without worry, not sloppy or messy.

These women felt safe simply because nothing bad had happened yet.

That kind of confidence was never actually based on real security.

Isaiah asks them to listen now, before the danger arrives.

📢 Careless means without worry here
😴 They felt safe without real reason
⏳ Their confidence outran their real security
📖 Isaiah calls them to listen now

## 🍇 Many Days And Years Shall Ye Be Troubled

This trouble is not described as a short setback.

"Many days and years" stretches the coming hardship over a long span.

Comfort built on ignoring warnings rarely gets undone quickly.

The length of the trouble matches how long the warnings were ignored.

🍇 This trouble lasts years, not days
⏳ Ignored warnings bring lasting consequences
📉 Comfort here collapses slowly, not instantly
📖 The length matches the ignoring

## 🍷 For The Vintage Shall Fail, The Gathering Shall Not Come

"Vintage" means the grape harvest, a major event in the ancient farming calendar.

A failed vintage meant lost food, lost income, and lost wine for the year.

"The gathering" points to harvest time in general, not only grapes.

This is not abstract punishment.

It hits the exact comfort these women were relying on.

🍷 Vintage means the yearly grape harvest
📉 A failed harvest meant real loss
🌾 Gathering means harvest time broadly
📖 This judgment targets their actual comfort

## 🧵 Strip You, And Make You Bare, And Gird Sackcloth Upon Your Loins

Mourning in the ancient Near East was a public, physical act.

Removing fine clothing and putting on rough sackcloth showed grief for anyone to see.

"Loins" refers to the waist and hips, the area sackcloth was tied around.

These comfortable women are told to trade their comfort for visible mourning.

The very clothing that once marked their ease now marks their grief.

🧵 Mourning was public, not private
👗 Fine clothing gets traded for sackcloth
🪢 Loins means the waist and hips
📖 Their clothing now marks grief instead

## 🌾 They Shall Lament For The Teats, For The Pleasant Fields, For The Fruitful Vine

"Teats" is an old word for breasts, tied here to nursing and family life.

This lament covers three losses at once, nursing children, farmland, and grapevines.

Fertility, land, and harvest were the three pillars of a stable household.

All three collapse together in this one verse.

Grief this size touches both a family's food and its future.

🌾 Teats is an old word for breasts
👶 It ties to nursing and family
🍇 Land and vines collapse alongside it
📖 This grief touches food and future

## 🌵 Upon The Land Of My People Shall Come Up Thorns And Briers

Isaiah already used thorns and briers as a judgment picture.

That was all the way back in chapter 5.

There, a neglected vineyard grew thorns instead of grapes.

Uncared for farmland never simply stays empty.

It reverts to thorns and briers on its own.

This verse pictures Judah's own land doing the same.

🌵 Isaiah used this picture back in chapter 5
🍇 A neglected vineyard once grew thorns
🌾 Uncared for land reverts on its own
📖 Judah's land now does the same

## 🏛️ The Palaces Shall Be Forsaken

"Forsaken" means abandoned, left completely empty.

These were not humble homes, they were royal palaces.

A palace being forsaken pictures the total collapse of national pride.

The same verse adds that the whole population leaves too.

Buildings do not empty themselves without a reason this serious.

🏛️ Forsaken means completely abandoned
👑 Even royal palaces get abandoned
📉 This pictures total national collapse
📖 A population this size does not leave lightly

## 🏚️ The Forts And Towers Shall Be For Dens For Ever, A Joy Of Wild Asses

A "den" here means a wild animal's shelter, not a human home.

Once proud forts and towers are pictured collapsing into exactly that.

"Wild asses" were untamed donkeys that lived in empty, desolate places.

A city built for defense and government ends up hosting animals instead of people.

This is one of Isaiah's strongest pictures of complete abandonment.

🏚️ Dens means wild animal shelters
🏰 Proud towers collapse into exactly that
🫏 Wild asses lived in desolate places
📖 This pictures complete abandonment

# Isaiah 32:15-20
# 🌾 The Spirit Poured Out, Peace And Blessing
---
## 🕊️ Until The Spirit Be Poured Upon Us From On High

Everything in this chapter has been building toward this turning point.

"Poured" pictures something abundant, not a small trickle.

This is the same Spirit Isaiah described resting on the coming king back in chapter 11.

Judgment was never the final word in this chapter.

The Spirit arriving from God himself changes everything that follows.

🕊️ Poured pictures something abundant
👑 This echoes the king from chapter 11
🔄 This marks the chapter's turning point
📖 God's Spirit changes everything after this

## 🌲 The Wilderness Be A Fruitful Field, And The Fruitful Field Be Counted For A Forest

This verse pictures a complete upward transformation, not just a small improvement.

First, empty wilderness becomes productive farmland.

Then, that same farmland grows lush enough to be called a forest.

Think of dry dirt turning into a garden.

Then that garden growing into a dense orchard.

Nothing in this picture stays the same as it was.

🌲 This is upward transformation, not repair
🏜️ Wilderness becomes productive farmland first
🌳 Farmland then grows thick as a forest
📖 Nothing here stays the same

## ⚖️ Judgment Shall Dwell In The Wilderness, And Righteousness Remain In The Fruitful Field

"Judgment" here means the same fair justice from verse one, now fully at home.

Earlier in this chapter, injustice ran the courts and gates.

"Dwell" pictures something permanent, not a short visit.

Justice finally settles in and stays, even reaching the wilderness.

⚖️ Judgment again means fair justice
🏛️ Injustice once ran the courts
🏡 Dwell means staying permanently
📖 Justice now reaches even the wilderness

## ☮️ The Work Of Righteousness Shall Be Peace

This verse names a direct result, not a vague feeling.

Righteousness does not just look good.

It actually produces something, real peace.

That peace is the fruit, not a separate hope on top of it.

☮️ Righteousness produces a real result
🌳 Peace is its actual fruit
✅ This is not just a feeling
📖 Right living leads directly to peace

## 🔒 The Effect Of Righteousness Quietness And Assurance For Ever

"Effect" here means the lasting outcome, not a temporary mood.

"Quietness" pictures calm instead of constant threat.

"Assurance" means confidence that does not waver.

"For ever" removes any expiration date from that confidence.

🔒 Effect means the lasting outcome
🤫 Quietness means calm, not threat
💪 Assurance means unwavering confidence
📖 For ever removes any expiration date

## 🏡 My People Shall Dwell In A Peaceable Habitation, And In Sure Dwellings, And In Quiet Resting Places

This verse pictures the opposite of the desolate towers from earlier in the chapter.

"Peaceable habitation" means a home without threat.

"Sure dwellings" means homes that will not be torn down or abandoned.

"Quiet resting places" means rest without fear of sudden danger.

The forsaken palaces from verse fourteen find their answer here.

🏡 This reverses the desolation from before
🛡️ Peaceable habitation means a home without threat
🧱 Sure dwellings will not be abandoned
📖 Verse fourteen finds its answer here

## 🌨️ When It Shall Hail, Coming Down On The Forest

This does not describe random bad weather hitting everyone equally.

Many scholars believe "the forest" pictures a proud, powerful enemy nation.

Isaiah already used a cut down forest to picture Assyria's fall in chapter 10.

Hail striking that forest pictures judgment landing on the proud, not on God's people.

🌨️ This is not random weather
🌲 Forest may picture a proud enemy
⚔️ Chapter 10 used this same picture
📖 Judgment lands on the proud here

## 🏙️ The City Shall Be Low In A Low Place

This city is not Jerusalem, the city of God's people in this chapter.

Many scholars believe this pictures an enemy stronghold brought down low.

"Low in a low place" doubles the word for emphasis, completely humbled.

That humiliation sits right next to the peace God's own people enjoy in verse eighteen.

🏙️ This city is not Jerusalem
⬇️ Low repeated means completely humbled
👑 This pictures an enemy brought down
📖 It sits beside verse eighteen's peace

## 🌊 Blessed Are Ye That Sow Beside All Waters

Sowing seed beside water guaranteed a steady, reliable harvest.

Farmers without that kind of access always faced more risk.

This blessing pictures security so complete that risk itself disappears.

The chapter that opened with a king now closes with an ordinary farmer.

🌊 Water beside seed meant reliable harvest
⚠️ Farmers without it faced real risk
🛡️ This pictures complete security
📖 The chapter ends on ordinary, safe life

## 🐴 That Send Forth Thither The Feet Of The Ox And The Ass

"Thither" is an old word meaning to that place.

Letting oxen and donkeys roam freely to work the fields pictured total safety.

In dangerous times, farmers kept animals close for fear of raids or attack.

Here, the animals move freely because there is nothing left to fear.

Peace this complete reaches all the way down to how a farmer manages animals.

🐴 Thither is an old word for there
🌾 Free roaming animals pictured total safety
⚔️ Danger once kept animals close instead
📖 Peace reaches even a farmer's animals
`.trim();

export const ISAIAH_THIRTY_TWO_PERSONAL_SECTIONS = parseIsaiahThirtyTwoRawNotes(ISAIAH_THIRTY_TWO_RAW_NOTES);
