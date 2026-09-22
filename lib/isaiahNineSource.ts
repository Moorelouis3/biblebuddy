export type IsaiahNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahNineRawNotes(rawText: string): IsaiahNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 9:${startVerse}` : `Isaiah 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Isaiah 9 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_NINE_RAW_NOTES = `# Isaiah 9:1-2
# 🌄 Light Breaking Into The Darkness
---
## The Dimness Shall Not Be Such As Was In Her Vexation

"Vexation" means deep distress or affliction, not simple annoyance.

Chapter eight ended with the whole land in that kind of misery.

This verse promises the gloom will not stay the same forever.

The darkness that just closed chapter eight is about to lift.

😔 Vexation means deep distress
📉 Chapter eight ended in real gloom
🌤️ The gloom will not stay the same
📖 Darkness from chapter eight starts lifting
---
## Beyond Jordan, In Galilee Of The Nations

Galilee sat in the far north of Israel.

It was the first region Assyria conquered.

"Galilee of the nations" describes its mixed Jewish and Gentile population.

Zebulun and Naphtali were the two tribes hit hardest there.

Centuries later Matthew quotes this verse when Jesus begins preaching in that same region.

🗺️ Galilee sat in Israel's far north
⚔️ First region Assyria conquered
👥 Nations describes its mixed population
📖 Matthew quotes this for Jesus
---
## The People That Walked In Darkness Have Seen A Great Light

This is the most quoted verse in the whole chapter.

"Darkness" pictures the fear and oppression Assyria brought to the north.

"A great light" points forward to someone who will end that fear completely.

The prophecy waited centuries before it found its answer.

🌑 Darkness pictures Assyria's fear and oppression
✨ A great light points to someone coming
⏳ The prophecy waited centuries for its answer
📖 Matthew quotes this verse about Jesus
---
## The Shadow Of Death

"The shadow of death" is a common Old Testament phrase for deep gloom.

It does not always mean physical death is near.

It describes a darkness so heavy it feels like living in a grave.

That is exactly where the people of Naphtali had been living.

🌑 Shadow of death means deep hopelessness
⚰️ It pictures gloom, not always literal death
📍 Naphtali had been living in that gloom
📖 The light shines first in that exact place
# Isaiah 9:3-5
# 🌾 Joy Like Harvest, A Broken Yoke
---
## Multiplied The Nation, And Not Increased The Joy

The Hebrew text behind this line is famously hard to translate.

The word rendered "not" looks almost identical to another word meaning "to him."

Many scholars believe the original sense was joy increased, not joy withheld.

The very next lines describe pure celebration, which fits that second reading.

📜 The Hebrew wording here is famously hard
🔤 Not and to him look nearly identical
🎉 Many scholars read it as increased joy
📖 Growth and joy both come from God
---
## According To The Joy In Harvest

Ancient harvest time was the happiest season of the year.

Months of hard work in the fields finally paid off at once.

Whole villages celebrated together once the crop was gathered in.

Isaiah reaches for that exact picture to describe the coming relief.

This joy is loud and shared, not quiet or private.

🌾 Harvest was the happiest season of the year
💪 Months of labor finally paid off
🎊 Whole villages celebrated the harvest together
📖 Isaiah borrows that picture for coming relief
---
## As In The Day Of Midian

This phrase calls back to Gideon's famous victory in Judges.

Gideon defeated a massive Midianite army with only three hundred men.

God won that battle in a way no army could take credit for.

Isaiah promises this coming deliverance will feel just as impossible.

It will be just as clearly God's own doing.

⚔️ This recalls Gideon's victory in Judges
🛡️ Gideon beat Midian with only 300 men
🙌 God alone got credit for that win
📖 This deliverance will feel just as impossible
---
## Every Battle Of The Warrior Is With Confused Noise, And Garments Rolled In Blood

"Confused noise" describes the deafening chaos and shouting of hand to hand combat.

"Garments rolled in blood" pictures soldiers' clothing soaked from close range fighting.

Isaiah paints war exactly as brutal and messy as it actually was.

He does this on purpose, to set up a sharp contrast in the next line.

⚔️ Confused noise means the chaos of battle
🩸 Garments rolled in blood pictures close combat
😖 War is shown as brutal and messy
📖 This sets up a sharp contrast next
---
## This Shall Be With Burning And Fuel Of Fire

Normal wars left behind bloody clothing that had to be washed and reused.

This coming victory leaves behind only gear that gets burned completely.

Burning the garments means they are never needed again for battle.

Isaiah pictures a peace so complete that war itself becomes obsolete.

🔥 Normal wars left bloody clothes to reuse
🕊️ This victory burns the gear instead
🚫 Burning means war is never needed again
📖 Isaiah pictures war becoming completely obsolete
# Isaiah 9:6-7
# 👶 For Unto Us A Child Is Born
---
## Unto Us A Child Is Born, Unto Us A Son Is Given

These two lines say almost the same thing but are not identical.

"Born" points to a real human birth, one of us.

"Given" points to a gift no family produces on its own.

That gift comes from God himself, not from human effort.

Together they describe someone fully human and yet sent from heaven.

This is the answer to the promise chapter seven already made.

👶 Born means a real human birth
🎁 Given means a gift from God
🙌 Together they mean human and divine
📖 This answers chapter seven's promise
---
## The Government Shall Be Upon His Shoulder

In the ancient Near East a king's authority was sometimes pictured as a key carried on the shoulder.

Carrying something on the shoulder meant carrying its full weight and responsibility.

This child will not just influence the government.

He will personally bear it himself.

The weight of ruling the whole world will rest on him alone.

👑 A king's authority was pictured on the shoulder
💪 Shoulder means bearing full weight and responsibility
🌍 This child personally bears the government himself
📖 The whole world's rule rests on him
---
## Wonderful, Counsellor

"Wonderful" here does not mean impressive.

It means beyond ordinary human understanding.

"Counsellor" means someone who gives wise guidance and direction.

Many scholars read these two words together as one title, a wonderful counsellor.

Either way, this child's wisdom comes from beyond human ability.

🌟 Wonderful means beyond human understanding
🧭 Counsellor means one who gives wise guidance
📜 Many read both words as one title
📖 His wisdom comes from beyond human ability
---
## The Mighty God

This title does not call the child merely a godlike hero.

The Hebrew phrase behind it is used elsewhere in Isaiah for God himself.

This is a direct claim that the child born is fully God.

That claim was staggering for the original hearers of this prophecy.

🚫 Not just a godlike human hero
✝️ A direct claim the child is God
😮 A staggering claim for the first hearers
📖 Isaiah uses this phrase for God elsewhere
---
## The Everlasting Father

This title does not mean the child is God the Father in person.

"Everlasting Father" means father of eternity, the source of endless care.

A father provides, protects, and plans for his family's future.

This child will do that for his people forever, without end.

🚫 Not God the Father in person
⏳ Everlasting means father of eternity
🏠 A father provides and protects his family
📖 This child cares for his people forever
---
## The Prince Of Peace

"Prince" here means ruler, not merely a king's son.

Every verse before this one described war, fear, and broken yokes.

This title promises a ruler whose reign finally ends all of that.

Peace is not just his personality.

It is what his rule actually accomplishes.

👑 Prince means ruler, not just a son
⚔️ Every earlier verse described war and fear
🕊️ This ruler's reign ends all of that
📖 Peace is what his rule accomplishes
---
## Upon The Throne Of David

God promised King David centuries earlier that his throne would last forever.

That promise is recorded back in Second Samuel chapter seven.

This child is the one who finally fulfills that ancient promise.

He does not replace David's throne.

He inherits it permanently instead.

👑 God promised David an eternal throne
📜 That promise is in Second Samuel seven
✅ This child fulfills that ancient promise
📖 He inherits David's throne forever
---
## The Zeal Of The LORD Of Hosts Will Perform This

"Zeal" means passionate, unstoppable determination, not a passing feeling.

This promise does not depend on human effort or good behavior.

The LORD of hosts himself guarantees that it will happen.

Everything just promised rests on God's own commitment to see it through.

🔥 Zeal means unstoppable determination
🙅 Not dependent on human effort
🛡️ The LORD of hosts guarantees it
📖 God's own commitment secures this promise
# Isaiah 9:8-12
# 🧱 Pride Before The Fall
---
## The Lord Sent A Word Into Jacob

This new message shifts away from the child just promised.

"Jacob" here is another name for the whole nation of Israel.

This particular warning is aimed at the northern kingdom, not Judah.

The chapter turns from hope to a hard warning without pausing.

🔀 The message shifts from hope to warning
🏷️ Jacob here means the nation of Israel
🎯 This warning targets the north, not Judah
📖 Hope and warning sit side by side
---
## Ephraim And The Inhabitant Of Samaria

Ephraim was the largest and leading tribe of the northern kingdom.

Its name became shorthand for the whole northern kingdom of Israel.

Samaria was that kingdom's capital city, built on a hill.

Naming both makes clear exactly who this warning is for.

🏔️ Ephraim was the leading northern tribe
🏙️ Ephraim became shorthand for the whole kingdom
🏛️ Samaria was that kingdom's capital city
📖 This warning names its target clearly
---
## In The Pride And Stoutness Of Heart

"Stoutness of heart" does not describe physical strength at all.

It means a stubborn, defiant attitude that refuses correction.

Israel had just been struck by real judgment from Assyria.

Instead of humbling them, that judgment only made them more defiant.

💪 Stoutness of heart means stubborn defiance
🚫 It does not mean physical strength
⚔️ Israel had already been struck by Assyria
📖 Judgment made them more defiant, not humble
---
## The Bricks Are Fallen Down, But We Will Build With Hewn Stones

Common homes in Israel were built from cheap, sun dried mud brick.

"Hewn stones" means stone cut and shaped by hand, far more expensive.

This is a boast, not a confession of humility.

They are promising to rebuild bigger and better, not to change.

🧱 Bricks were cheap, sun dried mud
🪨 Hewn stones were expensive, cut by hand
😤 This line is a boast, not humility
📖 They planned to rebuild bigger, not change
---
## The Sycomores Are Cut Down, But We Will Change Them Into Cedars

Sycamore trees were common, ordinary wood found all over Israel.

Cedar had to be imported from Lebanon and cost far more.

This is the same defiant boast as the bricks in the line before it.

Judgment did not produce repentance.

It produced upgraded plans instead.

🌳 Sycamore was common, ordinary local wood
🌲 Cedar was expensive, imported from Lebanon
😤 The same defiant boast as before
📖 Judgment produced upgraded plans, not repentance
---
## The LORD Shall Set Up The Adversaries Of Rezin Against Him

Rezin was the king of Syria who allied with Israel back in chapter seven.

That alliance was supposed to make both kingdoms safer.

Now God turns Rezin's own enemies loose against Israel too.

The very partnership Israel trusted becomes the source of its downfall.

🤝 Rezin was Israel's ally from chapter seven
🛡️ That alliance was supposed to bring safety
⚔️ God turns Rezin's enemies against Israel too
📖 Their trusted partnership becomes their downfall
---
## The Syrians Before, And The Philistines Behind

Syria pressed in from the north and east.

The Philistines pressed in from the south and west.

Israel finds itself squeezed from both directions at once.

There is no safe direction left to run.

🗺️ Syria pressed from the north and east
🏹 Philistines pressed from the south and west
🔒 Israel is squeezed from both directions
📖 No safe direction is left to run
---
## For All This His Anger Is Not Turned Away

This exact line repeats four times across this chapter and into the next.

It works like a drumbeat that will not stop.

Each time it appears, the reader expects the judgment to finally end.

Instead, the hand stays stretched out, ready to strike again.

🔁 This refrain repeats four times total
🥁 It works like a steady drumbeat
⏳ Judgment never feels fully finished
📖 God's hand stays ready to strike again
# Isaiah 9:13-17
# 🌾 Head And Tail, Branch And Rush
---
## The People Turneth Not Unto Him That Smiteth Them

Israel had already been struck hard by war and loss.

Suffering alone did not turn their hearts back to God.

"Smiteth" is an old word simply meaning strikes or wounds.

Pain revealed their stubbornness instead of curing it.

⚔️ Israel had already suffered real loss
💔 Suffering alone did not turn hearts to God
🗡️ Smiteth is an old word for strikes
📖 Pain revealed stubbornness instead of curing it
---
## Head And Tail, Branch And Rush, In One Day

"Head and tail" pictures the very top and very bottom of society.

"Branch and rush" pictures the tall and low parts of a plant.

Both pairs mean the same thing, everyone together.

Judgment falls on the whole nation at once, not one class alone.

🔝 Head and tail means top and bottom
🌿 Branch and rush means tall and low
👥 Both pairs mean everyone together
📖 Judgment falls on the whole nation
---
## The Ancient And Honourable, He Is The Head

"The ancient" refers to the respected elders who led the nation.

"Honourable" describes people of high social standing and influence.

These leaders represent the head in the picture from the line before.

Their poor leadership carries real responsibility for what happens next.

👴 Ancient means the respected elders
🎩 Honourable means high social standing
🔝 These leaders are the head in the picture
📖 Their leadership carries real responsibility
---
## The Prophet That Teacheth Lies, He Is The Tail

This does not describe every prophet, only the false ones.

A true prophet spoke only what God actually gave him to say.

These lying prophets told people what they wanted to hear instead.

They represent the tail, the lowest and most shameful part of the picture.

🚫 Not every prophet, only the false ones
🗣️ False prophets said what people wanted to hear
🐍 They represent the tail in the picture
📖 A shameful, low place in the nation
---
## The Leaders Of This People Cause Them To Err

"Err" means to wander off the right path, to go astray.

Bad leadership does not just fail to help.

It actively misleads the people instead.

The blame here lands first on those at the top.

A nation usually follows wherever its leaders actually walk.

🧭 Err means wandering off the right path
🚫 Bad leadership does more than just fail
😈 It actively misleads the people
📖 A nation follows wherever its leaders walk
---
## The LORD Shall Have No Joy In Their Young Men, Neither Shall Have Mercy On Their Fatherless And Widows

Widows and orphans were normally the people God protected most closely.

Young men were normally a nation's pride and hope for the future.

Here even those usually shown mercy are caught up in judgment.

That detail shows just how widespread the nation's corruption had become.

🛡️ Widows and orphans were usually protected
💪 Young men were usually a nation's pride
⚠️ Even they are caught up in judgment
📖 This shows how widespread the corruption was
---
## Every One Is An Hypocrite And An Evildoer, And Every Mouth Speaketh Folly

"Hypocrite" means someone whose actions do not match their words.

"Folly" is an old word for foolish, godless speech.

This is not describing a few bad individuals here and there.

The corruption had spread through every level of the nation.

🎭 Hypocrite means actions do not match words
🗣️ Folly means foolish, godless speech
📊 This describes the whole nation, not a few
📖 Corruption had spread through every level
# Isaiah 9:18-21
# 🔥 Brother Against Brother
---
## Wickedness Burneth As The Fire

Isaiah switches from a legal picture to a picture of wildfire.

Fire starts small but rarely stays contained on its own.

Left alone, sin spreads through a whole community the same way.

This image sets up everything described in the rest of the section.

🔥 Isaiah switches to a wildfire picture
🌱 Fire starts small but spreads fast
🕸️ Sin spreads through a community the same way
📖 This sets up the rest of the section
---
## It Shall Devour The Briers And Thorns, And Shall Kindle In The Thickets Of The Forest

"Briers and thorns" are the small, worthless plants a fire reaches first.

"Thickets of the forest" are the tall, thick tangle of trees further in.

The fire moves from the smallest, cheapest things to everything of value.

Judgment here follows that same widening, uncontrollable path.

🌵 Briers and thorns are small worthless plants
🌲 Thickets are the tall, thick tangle of trees
📈 The fire spreads from small to everything
📖 Judgment follows that same widening path
---
## No Man Shall Spare His Brother

Family loyalty was one of the strongest bonds in this culture.

Here even that bond breaks down completely under pressure.

Fear, famine, and war strip away normal human kindness.

When a society rejects God, its closest relationships suffer first.

👨‍👩‍👧 Family loyalty was normally a strong bond
💔 Even that bond breaks down here
😨 Fear and famine strip away normal kindness
📖 Rejecting God hurts closest relationships first
---
## They Shall Eat Every Man The Flesh Of His Own Arm

This is a disturbing, figurative picture, not a literal description.

It pictures a society so broken it consumes its own people.

Neighbors and even family members turn against one another for survival.

The nation that would not share the joy of harvest now devours itself.

😨 This is figurative, not literal
🍖 It pictures a nation consuming its own
👥 Neighbors turn against each other for survival
📖 The joyless nation now devours itself
---
## Manasseh, Ephraim, And Ephraim, Manasseh

Manasseh and Ephraim were two half tribes descended from Joseph's two sons.

Normally these two tribes were pictured as close brothers within Israel.

Here that closeness turns into civil war between them instead.

The nation meant to work together tears itself apart from the inside.

👬 Manasseh and Ephraim descended from Joseph's sons
🤝 They were normally pictured as close brothers
⚔️ Here that closeness turns into civil war
📖 The nation tears itself apart from inside
---
## They Together Shall Be Against Judah

Manasseh and Ephraim cannot get along with each other.

Yet somehow they still find common ground in attacking Judah.

Old grudges get set aside the moment a shared enemy appears.

Even a divided house can still unite around the wrong target.

⚔️ They cannot get along with each other
🎯 They still unite in attacking Judah
🤝 Old grudges pause for a shared enemy
📖 A divided house unites around the wrong target
---
## But His Hand Is Stretched Out Still

This is the fourth and final time this exact line appears in the chapter.

It even carries forward one more time into the next chapter.

The refrain works like an unfinished sentence the reader is left waiting on.

Chapter ten will finally show where that stretched out hand lands.

🔁 This is the fourth time in the chapter
➡️ It carries forward into chapter ten
⏳ The refrain leaves the reader waiting
📖 Chapter ten shows where the hand lands
`.trim();

export const ISAIAH_NINE_PERSONAL_SECTIONS = parseIsaiahNineRawNotes(ISAIAH_NINE_RAW_NOTES);
