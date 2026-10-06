export type NahumTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNahumTwoRawNotes(rawText: string): NahumTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NahumTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nahum\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nahum 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nahum\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Nahum\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nahum 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nahum 2:${startVerse}` : `Nahum 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Nahum 2 sections, received " + sections.length);
  }

  return sections;
}

const NAHUM_TWO_RAW_NOTES = `# Nahum 2:1-3
# 🛡️ Nineveh Braces For The Siege
---
## He That Dasheth In Pieces Is Come Up

"He that dasheth in pieces" names the invading army now outside Nineveh.

Many scholars believe this force combined the Medes and the Babylonians.

Nahum never names the nation directly in this verse.

The title alone is meant to carry the full weight of dread.

Nineveh had broken many nations into pieces before this day.

Now a nation just like it stands at its own gate.

💥 Dasheth in pieces names the invader

⚔️ Likely the combined Medes and Babylonians

🏙️ Nineveh once broke nations the same way

📖 The destroyer now stands at the gate

## Keep The Munition, Watch The Way

"Munition" here means the city's stockpiled weapons and supplies.

Nahum lists off four frantic defensive orders in a single breath.

Keep the munition means guard the armory.

Watch the way means post lookouts on every road leading in.

These are not Nahum's own instructions for Nineveh to survive.

They read as a bitter command shouted at a city that will fall anyway.

🗝️ Munition means stockpiled weapons and supplies

👀 Watch the way means post lookouts

📯 Four frantic orders in one breath

➡️ The orders cannot save a doomed city

## Make Thy Loins Strong

Make thy loins strong is an old idiom for bracing the body.

Long robes in this culture had to be gathered and tucked at the waist before hard work.

A soldier getting ready for battle would tighten his belt first.

The same picture shows up again centuries later when Paul describes spiritual armor.

Here the command is aimed at soldiers who are about to lose anyway.

Bracing the body cannot undo what God has already decided.

🧵 Loins strong means brace the whole body

👔 Robes were tucked before hard work

⚔️ Soldiers tightened belts before battle

📖 Bracing cannot undo God's decision

## The Excellency Of Jacob, As The Excellency Of Israel

"The excellency of Jacob" and "the excellency of Israel" both describe the glory of God's own people.

God had allowed that glory to be stripped away already.

Assyria was the very empire that tore down the northern kingdom of Israel in the year 722 BC.

Nahum now explains that Nineveh's coming fall is not random cruelty.

It answers for what Nineveh already did to God's people.

The judgment is not new anger.

It is an old debt finally being collected.

👑 Excellency means the glory of God's people

📉 That glory was already stripped away

🏛️ Assyria destroyed Israel in 722 BC

📖 This judgment repays an old debt

## The Emptiers Have Emptied Them Out

"The emptiers" refers to the Assyrian armies who plundered Israel generations earlier.

Nahum pictures them draining Israel the way someone might empty a jar completely.

Nothing of value was left behind.

That same empire now stands on the receiving end of its own method.

What Assyria did to others is coming back around.

🏺 Emptiers means the armies that plundered Israel

🫗 They drained Israel completely

🔄 Assyria now faces its own method

➡️ What goes out eventually comes back

## Marred Their Vine Branches

Israel is often pictured in scripture as a vine that God planted and tended.

"Marred their vine branches" means the invading army trampled and ruined that vine on purpose.

A vineyard takes years of careful work before it produces good fruit.

Destroying the branches was meant to erase that work in a single raid.

The vine image makes the damage personal, not just military.

God planted it, and God noticed exactly what was done to it.

🍇 Israel pictured as God's own vine

✂️ Marred means trampled and ruined on purpose

⏳ Years of careful growth destroyed in a raid

📖 God noticed what was done to His vine

## The Shield Of His Mighty Men Is Made Red

Ancient soldiers often coated their leather shields with red dye or oil before marching to battle.

The color made the shields waterproof and harder to damage.

It also sent a clear message to anyone watching the army approach.

A wall of red shields was meant to look like blood before a single sword was drawn.

Nahum uses that detail to describe the invading force closing in on Nineveh.

The city sees the color before it sees the soldiers themselves.

🔴 Shields were coated red before battle

💧 The coating made shields waterproof

⚠️ Red shields warned of coming bloodshed

➡️ The color arrives before the army does

## The Fir Trees Shall Be Terribly Shaken

"Fir trees" here does not mean trees shaking in a forest.

Many scholars believe the phrase describes rows of spear shafts cut from fir wood.

Soldiers raised and shook their spears together as they marched.

The motion looked like a forest swaying in strong wind.

Nahum borrows a natural image to describe a wall of weapons in motion.

What looks like nature here is actually an army.

🌲 Fir trees likely means rows of spear shafts

💪 Soldiers shook their spears while marching

🌬️ The motion looked like a swaying forest

📖 Nature imagery describes an approaching army

# Nahum 2:4-6
# 🔥 Chariots Flood The City
---
## They Shall Justle One Against Another

"Justle" is an old spelling of jostle, meaning to bump and crowd against something.

Nahum pictures so many war chariots racing through the streets that they collide with each other.

This is not a description of confusion on Nineveh's side.

It describes the sheer size of the army attacking the city.

There are simply too many chariots for the streets to hold.

Overwhelming force looks chaotic from the outside.

🚗 Justle means to jostle and crowd

💥 Chariots collide from sheer numbers

🏙️ Too many chariots for the streets

➡️ Overwhelming force can look like chaos

## They Shall Run Like The Lightnings

Lightning strikes and vanishes before the eye can follow it.

Nahum compares the speed of the attacking chariots to that same flash.

There is no slow buildup to this invasion.

By the time Nineveh sees the danger clearly, it has already arrived.

Speed itself becomes a weapon here.

⚡ Chariots compared to flashing lightning

👁️ Too fast to track clearly

⏱️ No slow warning before the attack

📖 Speed becomes its own weapon

## He Shall Recount His Worthies

The word "he" here most likely points to the Assyrian king calling together his own officers.

"Worthies" means his best fighting men, the ones he trusts most.

This is a desperate muster, not a confident one.

A king naming his strongest men is a sign the danger is already serious.

Nahum lets the reader watch the enemy's own side scramble.

👑 He likely means the Assyrian king

🛡️ Worthies means his best fighting men

😨 A desperate muster, not a confident one

➡️ Scrambling reveals how serious the danger is

## They Shall Stumble In Their Walk

This line does not describe the attacking army losing its footing.

It describes Nineveh's own defenders tripping over each other in panic.

A disciplined army marches in step.

A panicked one stumbles.

Nahum draws a sharp contrast between the two sides without saying it directly.

🏃 Stumbling describes Nineveh's own defenders

😱 Panic breaks a disciplined march

⚖️ A sharp contrast with the attackers

📖 Fear shows itself in the body first

## The Defence Shall Be Prepared

"Defence" here likely does not mean Nineveh's own city wall.

Many scholars believe it describes a mantelet, a portable shield wall used by attackers.

Soldiers pushed these large wooden covers toward a city to protect themselves from arrows.

It let them reach the base of the wall safely.

The very word that sounds protective is actually the enemy's own equipment.

Even the vocabulary of this verse works against Nineveh.

🛡️ Defence likely means the attacker's mantelet

🪵 A portable wooden shield wall

🏹 It protected soldiers from arrows

➡️ Even the words favor the invader

## The Gates Of The Rivers Shall Be Opened

Nineveh's defenses depended partly on the Tigris and Khosr rivers that ran near the city.

Ancient historians later described a flood that breached the city walls during its final siege.

"The gates of the rivers" pictures that water defense failing at the worst possible moment.

What was meant to protect the city became the way in.

Nahum describes this centuries before it actually happened.

🌊 Rivers were part of Nineveh's defense

🏛️ Ancient historians describe a breaching flood

🚪 Water became the way into the city

📖 Nahum names this before it happened

## The Palace Shall Be Dissolved

"Dissolved" pictures something solid simply melting away into nothing.

The royal palace was the proudest, strongest building in Nineveh.

Think of a block of ice left out in the sun.

It does not fall all at once.

It just quietly stops being there.

Nahum says the same thing will happen to Assyria's greatest building.

🏰 Dissolved means melting away to nothing

☀️ Like ice left out in the sun

👑 The palace was Nineveh's proudest building

📖 Even the strongest building quietly disappears

# Nahum 2:7-10
# 😢 Huzzab Led Away Captive
---
## Huzzab Shall Be Led Away Captive

"Huzzab" is one of the hardest names in this whole book to pin down.

Many scholars believe it refers to the queen of Nineveh being marched off in defeat.

Others believe it is simply another name for the city itself, personified as a captured woman.

The text does not tell us for certain which reading is right.

Either way, the picture is the same.

Nineveh's pride is being led away in chains.

👸 Huzzab may be the queen herself

🏙️ Or Nineveh personified as a captive

❓ The exact identity stays uncertain

📖 Either reading shows the same defeat

## As With The Voice Of Doves, Tabering Upon Their Breasts

"Tabering" means beating rhythmically, the way someone plays a small hand drum.

Here it describes women striking their own chests in deep mourning.

"The voice of doves" adds a soft, mournful cooing sound to that picture.

Together the images show quiet grief rather than loud screaming.

This was a recognized mourning custom across the ancient Near East.

Even the sound of defeat is described with careful detail.

🥁 Tabering means rhythmic beating on the chest

🕊️ Doves add a soft mournful sound

😢 This pictures quiet grief, not screaming

📖 Ancient mourning had its own sound

## Nineveh Is Of Old Like A Pool Of Water

For generations Nineveh had been full, the way a deep pool stays full of water.

People, wealth, and power all gathered inside it for centuries.

Nahum says that pool is about to drain out completely.

Think of water pulled out through a hole in the bottom of a tank.

It does not look dramatic happening, but the tank ends up empty.

A city that took centuries to fill can empty out far faster.

💧 Nineveh compared to a full pool

⏳ Centuries of people and wealth gathered inside

🕳️ The pool is about to drain out

➡️ Filling takes centuries, emptying takes far less

## But None Shall Look Back

Officers shout the same command twice, trying to stop the retreat.

Repeating an order usually means the first attempt already failed.

Not one soldier obeys.

Nobody even turns around to check who is shouting.

This is not an orderly retreat.

It is a total rout.

📢 The command is shouted twice

🚫 Repeating it means it already failed

🏃 Not one soldier turns back

➡️ A retreat has become a total rout

## Take Ye The Spoil Of Silver, Take The Spoil Of Gold

This command is not aimed at Nineveh's own people.

It is shouted at the conquering soldiers now pouring through the city.

Open permission to loot is one of the clearest signs a city has fully fallen.

Nobody is left to stop the looting.

The city that once collected tribute from others now has everything taken from it.

💰 Spoken to the conquering soldiers, not Nineveh

🏴 Open looting signals total defeat

🔄 The collector of tribute now loses everything

📖 What a city took is finally taken back

## There Is None End Of The Store And Glory

Nineveh had grown wealthy off centuries of tribute collected from conquered nations.

"Store" means the stockpiled goods, and "glory" means the treasures put on display.

Ancient records describe Nineveh as one of the richest cities in the world at its height.

All of that wealth is now simply there for the taking.

Centuries of conquest built a treasury that fell in a single battle.

💎 Store means stockpiled goods

🏛️ Glory means treasures on display

🌍 Nineveh was among the richest cities

➡️ Centuries of wealth fell in one battle

## Empty, And Void, And Waste

These same three words describe the earth in Genesis before God shaped it into anything.

There the emptiness came before creation began.

Here the emptiness comes after a city is torn apart.

Nahum is not borrowing the phrase by accident.

Nineveh is being undone back to nothing.

What God once formed out of emptiness, Nineveh is losing back into it.

🌌 Same words describe the earth in Genesis

🌍 There emptiness came before creation

🏙️ Here it comes after destruction

➡️ Nineveh is undone back into nothing

## The Knees Smite Together

"The knees smite together" describes knees physically knocking against each other.

This is not poetic exaggeration.

Terror produces a real, visible shake in the body.

Nahum lists physical symptoms instead of just naming the emotion.

Fear here is something you can see on a person, not just something they feel.

🦵 Knees smite together means knees knocking

😨 A real physical symptom, not exaggeration

👀 Fear becomes visible on the body

📖 Terror shows itself before words do

## The Faces Of Them All Gather Blackness

This phrase does not mean literal dark skin or dirt on anyone's face.

It describes the drained, ashen look terror leaves on a person's face.

Blood seems to leave the skin, leaving a dull gray shade behind.

Every single face in the city carries this same look.

Nahum zooms in from the whole city down to individual faces.

Dread has nowhere left to hide.

😶 Blackness means a drained ashen look

🩸 Fear seems to drain color from skin

👥 Every face in the city matches

➡️ Dread becomes visible on every person

# Nahum 2:11-13
# 🦁 The Lion's Den Lies Empty
---
## Where Is The Dwelling Of The Lions

The lion was Assyria's own chosen symbol of power.

Assyrian kings carved lions into palace walls and hunted them as a royal sport.

"Where is" is a mocking question, not a real one.

Nahum already knows the answer is nowhere.

The empire that compared itself to lions is about to lose its den completely.

🦁 The lion was Assyria's chosen symbol

🏛️ Kings carved lions into palace walls

❓ Where is here is a mocking question

➡️ The empire is about to lose its den

## None Made Them Afraid

This line describes how untouchable Assyria once seemed.

No nation nearby could threaten it and survive.

Fear ran only one direction for generations.

Nahum lets that old confidence sit here for a moment.

The next verse is about to tear it apart completely.

💪 Assyria once seemed completely untouchable

🌍 No nearby nation could threaten it

🔁 Fear only ran one direction

📖 That confidence is about to end

## Filled His Holes With Prey, And His Dens With Ravin

"Ravin" means torn flesh taken violently from prey.

Nahum keeps the lion picture running for one more verse.

A real lion drags food back to its den to stockpile for its young.

Assyria did the same thing with conquered nations and plundered wealth.

Violence was not occasional for this empire.

It was how the whole system was fed.

🩸 Ravin means torn flesh from prey

🦁 A lion stockpiles food for its young

💰 Assyria stockpiled nations and plundered wealth

📖 Violence fed the whole empire

## Behold, I Am Against Thee, Saith The LORD Of Hosts

Every earlier verse described armies, chariots, and sieges.

This line names the real opponent for the first time.

"Thee" is not being destroyed by Babylon or the Medes alone.

God Himself is the one standing against this empire.

Human armies are simply the hands carrying out His decision.

👆 God names Himself the real opponent here

⚔️ Not just Babylon or the Medes

🙌 Human armies act as His hands

📖 Judgment was always God's decision

## I Will Burn Her Chariots In The Smoke

Chariots filled the streets back in verse four, flashing like lightning.

Here those same chariots end as smoke rising off a fire.

The weapon that once terrified a city becomes a pile of ash.

Nothing about Assyria's military strength survives this verse.

Power that cannot be undone by other armies is still undone by God.

🔥 Chariots from verse four now burn

💨 Military strength ends as smoke

🪦 Nothing of it survives

➡️ God undoes what no army could

## The Voice Of Thy Messengers Shall No More Be Heard

Assyrian messengers once carried royal demands and collected tribute across a huge empire.

Their voice represented the empire's reach into every conquered land.

This verse says that voice goes completely silent.

No more demands, no more threats, no more tribute collected.

An empire that spoke loudly for centuries ends here without a final word.

📯 Messengers once carried royal demands everywhere

🌍 Their voice reached every conquered land

🤐 This verse silences that voice completely

📖 A loud empire ends without a final word
`.trim();

export const NAHUM_TWO_PERSONAL_SECTIONS = parseNahumTwoRawNotes(NAHUM_TWO_RAW_NOTES);
