export type JobThirtyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobThirtyNineRawNotes(rawText: string): JobThirtyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobThirtyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+39:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 39 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+39:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+39:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 39 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 39,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 39:${startVerse}` : `Job 39:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Job 39 sections, received " + sections.length);
  }

  return sections;
}

const JOB_THIRTY_NINE_RAW_NOTES = `# Job 39:1-4
# 🐐 Wild Creatures Of The Rock
---
## 🐐 Knowest Thou The Time When The Wild Goats Of The Rock Bring Forth

"Wild goats" and "hinds" are two different animals named in this question.

Hinds are female deer.

Wild goats live high on rocky ledges few people ever reach.

Chapter thirty eight asked Job about the stars and the sea.

Now God moves from the size of the universe down to one hidden birth on a cliff.

The shift itself is the point.

Nothing is too vast or too small for God to know completely.

🐐 Hinds means female deer

⛰️ Wild goats live on remote cliffs

🌌 Chapter thirty eight covered stars and sea

📖 God knows both the vast and the small

## 🗓️ Canst Thou Number The Months That They Fulfil

No shepherd could ever track a wild goat's pregnancy month by month.

These animals live far from any human path, hidden in the crags.

God alone keeps count of every private detail no person can see.

That is real knowledge, not a guess.

🗓️ The question is about pregnancy timing

🏔️ Wild goats live far from any path

👀 No shepherd tracks them at all

📖 God alone counts what nobody watches

## 😖 They Cast Out Their Sorrows

"Sorrows" here is an old word for the pain of childbirth.

The wild goats and hinds give birth completely alone.

No human tends these deliveries in the wild.

Yet each birth still happens successfully, season after season.

God built this ability into the animal itself.

No midwife or shepherd is ever needed.

😖 Sorrows here means labor pains

🌄 These animals give birth alone

🚫 No shepherd helps with the delivery

📖 God built the ability in from the start

## 🌾 Return Not Unto Them

Independence, not abandonment, is the real point here.

The young grow strong eating on their own, then leave for good.

That sounds harsh to ears used to lifelong family closeness.

In the wild, that independence is a sign of health, not neglect.

A hind that raises young able to survive alone has succeeded completely.

God designed wild creatures to need their mother only briefly.

🌾 Young ones grow strong on their own

🚶 They leave and do not return

✅ Independence signals success, not failure

📖 God designed brief dependence in the wild

# Job 39:5-8
# 🫏 The Wild Ass Set Free
---
## 🫏 Who Hath Sent Out The Wild Ass Free

A tame donkey works under ropes and a driver's orders every day.

The wild ass in this verse is a different animal, never broken to work.

"Bands" means the ropes or harness used to control a work animal.

God is the one who set this creature loose from any such control in the first place.

Freedom was built into it from creation, not earned by escaping anyone.

🫏 Wild ass differs from a tame donkey

🪢 Bands means ropes or harness

🔓 God set this creature loose himself

📖 Freedom was built in from creation

## 🏜️ Whose House I Have Made The Wilderness

God claims direct credit for choosing the wild ass's home.

The wilderness and the barren land are not leftover, unwanted places.

They are exactly the home God built on purpose for this animal.

What looks empty and useless to a person is a perfect fit for the creature God placed there.

🏜️ God chose the wilderness himself

🚫 Not a leftover or unwanted place

🎯 A perfect fit for this animal

📖 God designs a home for every creature

## 😤 He Scorneth The Multitude Of The City

"Scorneth" means to look down on something with real contempt.

The wild ass has no interest in the noise and crowding of city life.

"The crying of the driver" refers to a slave driver shouting commands at a work animal.

This creature answers to no human voice at all.

😤 Scorneth means looks down with contempt

🏙️ The city holds no appeal for it

📢 The driver shouted commands at work animals

📖 This creature answers to no human voice

## 🌄 The Range Of The Mountains Is His Pasture

A tame animal eats whatever food its owner brings it.

This wild creature instead roams across entire mountain ranges to find its own food.

"Searcheth after every green thing" pictures constant movement, never staying inside one fenced field.

God gave the wild ass total freedom of territory, not only freedom from ropes.

🌄 The mountains themselves are its pasture

🌿 It searches for its own food

🚧 No fence or field holds it

📖 Freedom also means open space

# Job 39:9-12
# 🐂 The Untamable Wild Ox
---
## 🦄 Will The Unicorn Be Willing To Serve Thee

The word translated "unicorn" here does not mean the horned horse of later legend.

Many scholars believe it refers to a now extinct wild ox called the aurochs.

That animal was massive, fierce, and never tamed by anyone in this period.

"Crib" means a feeding trough, the kind used for a tame farm animal.

God asks whether this untamable creature would ever choose to eat from a trough like a servant.

🦄 Unicorn here does not mean a horned horse

🐂 It likely refers to a wild ox

🍽️ Crib means a feeding trough

📖 It refuses to serve like livestock

## 🌾 Canst Thou Bind The Unicorn With His Band In The Furrow

A furrow is the long groove a plow cuts into a field.

"Harrow" means dragging a heavy tool across the ground to break up dirt after plowing.

Oxen normally pull both the plow and the harrow for a farmer.

God asks whether anyone could ever force this wild creature into that same harness.

🌾 Furrow means the groove a plow cuts

🪨 Harrow breaks up dirt after plowing

🐄 Tame oxen normally do this work

📖 No one forces this ox to work

## 💪 Wilt Thou Trust Him, Because His Strength Is Great

Great strength does not automatically mean a creature can be trusted with a task.

A farmer needs an animal that is strong and also willing to cooperate.

This wild ox has all the strength a farmer could want.

It has none of the willingness a farmer needs.

Power alone was never the qualification God was asking about.

💪 Strength alone is not the same as trust

🚜 A farmer needs strength and cooperation

🚫 This ox offers strength without cooperation

📖 Power alone was never the real question

## 🌾 Wilt Thou Believe Him, That He Will Bring Home Thy Seed

Bringing home a harvest safely takes more than raw strength.

The picture here is an ox faithfully hauling in the grain and storing it in the barn.

A trustworthy farm animal finishes a job all the way through.

It does not wander off partway to the barn.

This wild creature could never be trusted with that kind of responsibility.

God is showing Job how much of ordinary life depends on animals humans cannot fully control.

🌾 The picture is hauling in the harvest

🏚️ A tame animal finishes the job

🚫 This wild ox cannot be trusted that way

📖 Life depends on things beyond Job's control

# Job 39:13-18
# 🪶 The Foolish Ostrich
---
## 🪶 Gavest Thou The Goodly Wings Unto The Peacocks

"Peacocks" is the word this translation uses here.

Many scholars believe the original word actually points to the ostrich itself.

Either way, the very next phrase names the ostrich directly.

God is asking whether Job gave any bird its wings and feathers.

Only God designs a creature's body from nothing.

🪶 Peacocks here likely still means the ostrich

🦅 The next phrase names the ostrich directly

❓ The question is who designed these wings

📖 Only God designs a creature's body

## 🥚 Which Leaveth Her Eggs In The Earth

Most birds build a careful nest and sit constantly on their eggs.

The ostrich instead lays her eggs directly in the sand.

She leaves them there rather than sitting on them.

"Warmeth them in dust" means the sun's heat does the work of her own body.

This looks like careless parenting compared to almost every other bird.

🥚 Most birds sit constantly on their eggs

🏜️ The ostrich buries hers in sand

☀️ The sun's heat warms them instead

📖 This looks careless next to other birds

## 👣 Forgetteth That The Foot May Crush Them

Eggs left out in open sand are not protected from any danger.

A passing foot could crush them without warning.

A wild animal could break them just as easily.

The ostrich does not guard against either risk the way other birds would.

This is simply how the ostrich nests in the wild.

👣 A passing foot could crush the eggs

🐆 A wild animal could break them too

🚫 The ostrich does not guard against this

📖 This is simply how the ostrich nests

## 💔 She Is Hardened Against Her Young Ones

"Hardened against her young ones" means she treats them as though they were not hers.

A normal parent protects its young no matter the cost.

"Her labour is in vain without fear" describes effort spent with no real concern for the outcome.

From a human view, this looks like a total failure of instinct.

💔 Hardened means she treats them as not hers

😱 A normal parent protects its young fully

🤷 Her effort seems careless, without real fear

📖 It looks like a total failure of instinct

## 🧠 God Hath Deprived Her Of Wisdom

God openly admits he withheld ordinary wisdom from this bird.

That is his direct answer to the strange behavior described just before this.

The ostrich's odd behavior is not an accident or a defect.

It is a trait God built in on purpose, for reasons only he fully knows.

Even what looks foolish in creation still fits inside God's design.

🧠 God withheld ordinary wisdom on purpose

🚫 This is not an accident or a defect

🎯 It is a deliberate trait, not a flaw

📖 Even foolishness fits inside God's design

## 🏃 She Scorneth The Horse And His Rider

The ostrich carries a real strength hidden inside all that seeming foolishness.

"Scorneth" again means looks down on with contempt, the same word already used for the wild ass.

A running ostrich can outpace a horse and the rider chasing it.

God balances every apparent weakness in creation with an unexpected strength.

🏃 The ostrich can outrun a horse

😤 Scorneth again means looks down on

🐎 Even the rider cannot keep up

📖 God balances weakness with real strength

# Job 39:19-21
# 🐎 The Horse's Might
---
## 💪 Hast Thou Clothed His Neck With Thunder

Raw strength like this has to come from somewhere outside the horse itself.

"Clothed his neck with thunder" pictures the horse's powerful, thick mane and neck.

Thunder suggests something loud, sudden, and impossible for a person to control.

God claims credit for this animal's raw power, not any breeder or rider.

💪 The question is who gave the horse strength

⚡ Thunder pictures a powerful, thick neck

🌩️ Thunder suggests power no person controls

📖 God claims credit for this raw power

## 😨 The Glory Of His Nostrils Is Terrible

"Terrible" here is an old word for something that inspires awe, not something evil.

A war horse breathes hard and fast right before a charge.

Its flared nostrils look almost fierce in that moment.

This horse is the opposite of a grasshopper, which flees at the smallest threat.

God highlights raw, fearsome confidence as part of this animal's design.

😨 Terrible here means awe inspiring, not evil

🐴 Flared nostrils show a fierce war horse

🦗 A grasshopper flees at the smallest threat

📖 Fearsome confidence is part of its design

## 🦶 He Goeth On To Meet The Armed Men

"Paweth in the valley" pictures a horse scraping the ground with a hoof.

That happens when it is eager and restless before battle.

Most animals instinctively run from armed soldiers and the noise of war.

This horse instead runs straight toward them.

God built raw courage into a creature humans later trained for war.

🦶 Pawing shows restless energy before battle

🏃 Most animals flee from armed soldiers

⚔️ This horse charges toward them instead

📖 God built the courage men later trained

# Job 39:22-25
# ⚔️ The Horse In Battle
---
## 😂 He Mocketh At Fear, And Is Not Affrighted

"Mocketh at fear" pictures the horse treating danger like something almost laughable.

"Affrighted" is an old word for terrified.

A sword swinging nearby would send most animals running immediately.

This horse holds its ground completely.

😂 Mocketh at fear means treating danger lightly

😱 Affrighted is an old word for terrified

⚔️ A sword would scare most animals off

📖 This horse holds its ground completely

## 🏹 The Quiver Rattleth Against Him

A quiver is the case a soldier carries arrows in.

It is usually worn on the back or at the side.

As the rider moves, the quiver, spear, and shield all clatter around the horse.

Loud rattling metal would panic almost any trained animal.

This horse stays steady through all of it.

🏹 A quiver holds a soldier's arrows

✨ Spear and shield flash as they move

🔊 Rattling metal would panic most animals

📖 This horse stays steady through it all

## 🔥 He Swalloweth The Ground With Fierceness And Rage

"Swalloweth the ground" is a vivid way of describing incredible galloping speed.

It pictures covering huge distances fast.

"Fierceness and rage" describes wild, barely controlled energy.

A trumpet blast signals that the charge is starting.

This horse is already too excited to wait for the signal.

🏃 Swalloweth the ground pictures incredible speed

🔥 Fierceness and rage means barely controlled energy

📯 A trumpet signals the charge to start

📖 This horse's eagerness outruns the command

## 🎺 He Saith Among The Trumpets, Ha, Ha

"Ha, ha" pictures the horse practically neighing with excitement at the trumpet sound.

"Smelleth the battle afar off" means the horse senses the coming fight before it can be seen.

The noise of captains shouting orders only feeds its eagerness further.

God ends this picture with a creature that runs toward danger the moment it senses it coming.

🎺 Ha ha pictures excited neighing

👃 It senses battle before it is seen

📢 Shouting captains only add to its eagerness

📖 This creature runs toward danger, not from it

# Job 39:26-30
# 🦅 The Hawk And The Eagle
---
## 🦅 Doth The Hawk Fly By Thy Wisdom

Hawks migrate south with the seasons, exactly on time every year.

No person taught the hawk when to leave or which direction to fly.

God built that seasonal instinct into the bird from the very beginning.

Job could not claim credit for wisdom he never gave.

🦅 Hawks migrate south on a set schedule

🧭 No person taught them the direction

🎯 God built in this instinct himself

📖 Job could not claim credit for it

## 🌬️ Doth The Eagle Mount Up At Thy Command

Eagles build their nests on high, remote cliffs, far above any predator or person.

"Mount up" describes the eagle's ability to soar and climb on rising air.

No human command sends the eagle upward.

It responds only to instincts God placed inside it.

🦅 Eagles nest high on remote cliffs

🌬️ Mount up describes soaring on rising air

🚫 No human command controls this

📖 The eagle answers only to God given instinct

## 🪨 She Dwelleth And Abideth On The Rock

A crag is a steep, rugged, rocky outcrop.

It is difficult or impossible for a person to climb.

The eagle chooses the most protected, defensible location available in nature.

"The strong place" repeats the same idea for emphasis, safety above everything else.

This home keeps its young safe from nearly every predator on the ground.

🪨 A crag is a steep rocky outcrop

🛡️ The eagle picks the safest location

🔁 Strong place repeats the idea for emphasis

📖 This keeps the young safe from predators

## 👁️ Her Eyes Behold Afar Off

An eagle's eyesight is famously sharp, able to spot prey from a great distance.

"From thence" points back to that high, remote nest as the eagle's hunting perch.

The same height that protects her young also gives her the perfect view for hunting.

One location serves two completely different purposes at once.

👁️ Eagle eyesight spots prey far away

🏔️ The nest doubles as a hunting perch

🎯 Height protects and provides at once

📖 One place serves two purposes at once

## 🩸 Where The Slain Are, There Is She

Young eagles are fed blood and flesh brought straight from the kill.

This is a blunt, unflinching picture of nature red in tooth and claw.

God closes this entire long list of wild creatures on this note deliberately.

The world he runs includes violence and death, not only beauty.

He still governs every part of it.

🩸 Young eagles are fed the kill directly

💀 This is a blunt, unflinching picture

🌍 God's world includes violence, not just beauty

📖 God still governs every part of it
`.trim();

export const JOB_THIRTY_NINE_PERSONAL_SECTIONS = parseJobThirtyNineRawNotes(JOB_THIRTY_NINE_RAW_NOTES);
