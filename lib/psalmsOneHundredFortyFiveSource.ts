export type PsalmsOneHundredFortyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFortyFiveRawNotes(rawText: string): PsalmsOneHundredFortyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFortyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+145:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 145 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+145:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+145:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 145 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 145,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 145:${startVerse}` : `Psalms 145:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Psalms 145 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FORTY_FIVE_RAW_NOTES = `# Psalms 145:1-2
# 👑 A Daily Vow To Praise The King
---
## 🗣️ I Will Extol Thee, My God, O King

"Extol" means much more than just saying something nice.

It means lifting someone up as high as words can go.

David calls God both "my God" and "O king" in one line.

That joins something deeply personal to something completely royal.

This is not distant worship aimed at a ruler far away.

It is close, personal praise aimed at a king David loves.

🗣️ Extol means lift up in praise
👑 God is called king here
❤️ My God makes it personal
📖 Personal love meets royal honor

## 🙌 I Will Bless Thy Name For Ever And Ever

To "bless" God does not mean giving Him anything He lacks.

It means praising Him and speaking well of His name.

David repeats the phrase "for ever and ever" twice already.

That phrase brackets the entire song, opening it and closing it.

Verse twenty one ends with these same exact words.

The whole psalm sits inside one long, unbroken vow of praise.

🙌 Bless here means praise, not give
🔁 For ever and ever repeats already
📚 This phrase also closes the psalm
📖 The whole song is bracketed by praise

## 📅 Every Day Will I Bless Thee

This is not a promise to praise God only when life feels good.

David commits to daily praise, whether or not the day is easy.

Many people only pray when something goes wrong.

David built praise into his normal, everyday rhythm instead.

Consistency, not intensity, is the real point of this line.

📅 Praise happens every single day
🌤️ Not only on easy days
🙏 Praise becomes a daily habit
📖 Consistency matters more than intensity

## 🔄 I Will Praise Thy Name For Ever And Ever

Verse one used the word "bless" for this same idea.

Verse two switches to the word "praise" instead.

Hebrew poetry often repeats an idea using two different words.

This is not sloppy repetition or running out of things to say.

It is a deliberate pattern used throughout the Psalms.

Two verses, two words, one single unbroken vow.

🔄 Bless and praise pair together
📜 Hebrew poetry often repeats ideas
🎯 This pattern is intentional, not careless
📖 One vow said two different ways

# Psalms 145:3-4
# 🌌 Greatness Too Big To Measure
---
## 🏆 Great Is The LORD, And Greatly To Be Praised

This line does not describe God the way people describe anything else.

Human greatness always has a ceiling somewhere.

A great athlete still loses eventually.

A great king still dies.

God's greatness has no ceiling and no end.

That is why the praise owed to Him has no ceiling either.

🏆 Human greatness always has limits
👑 God's greatness has no limit
⏳ People fade, God does not
📖 Praise matches the size of God

## 🔍 His Greatness Is Unsearchable

"Unsearchable" means something that cannot be fully explored or measured.

Think of trying to find the edge of the ocean by swimming.

No matter how far someone swims, more ocean keeps appearing.

God's greatness works the same way.

A person could study Him for a lifetime and never reach the end.

🔍 Unsearchable means cannot be fully explored
🌊 Like swimming to find the ocean's edge
♾️ No end is ever reached
📖 A lifetime of study still falls short

## 👪 One Generation Shall Praise Thy Works To Another

This line pictures praise being passed down like a family heirloom.

Parents tell their children what God has done for them.

Those children grow up and tell the next generation the same story.

Faith in this psalm is never meant to stop with one person.

It travels forward, generation after generation.

👪 Praise passes down like an heirloom
🗣️ Parents tell children what God did
🔁 Each generation retells the story
📖 Faith is meant to travel forward

## 📢 Shall Declare Thy Mighty Acts

"Declare" means to announce something publicly and clearly.

This is not a private thought kept to oneself.

Mighty acts like the exodus were meant to be spoken aloud.

Public praise keeps God's actions from being forgotten over time.

📢 Declare means announce publicly and clearly
🤐 Not a private, silent thought
🐑 The exodus is one mighty act
📖 Public praise keeps memory alive

# Psalms 145:5-7
# 📯 Telling The Story Of What God Has Done
---
## 👑 The Glorious Honour Of Thy Majesty

"Majesty" points to God's status as the highest possible authority.

Human kings borrow the word majesty to describe their own rule.

God is the original source that word was always meant to describe.

His honor is not borrowed from anyone else.

It belongs to Him completely and always has.

👑 Majesty means highest possible authority
🤴 Human kings borrow this word
🌟 God is the original source
📖 His honor belongs to Him alone

## 😲 Thy Wondrous Works

"Wondrous" means something that causes genuine amazement, not mild surprise.

Think of the difference between a neat magic trick and something truly impossible.

A magic trick has a hidden explanation once you learn the secret.

God's works have no hidden trick behind them.

They are simply beyond what any person could do.

😲 Wondrous means genuine amazement
🎩 More than a clever magic trick
🚫 No hidden trick behind it
📖 Simply beyond human ability

## 😨 The Might Of Thy Terrible Acts

"Terrible" here does not mean bad or unpleasant.

It comes from an old sense of the word meaning awe inspiring.

Something terrible in this sense makes a person tremble with respect.

The plagues in Egypt are one example of this kind of act.

God's power can be overwhelming without ever being cruel.

😨 Terrible here means awe inspiring
🙇 It makes a person tremble
🐸 The Egypt plagues are one example
📖 Overwhelming power, never cruelty

## 🗣️ Abundantly Utter The Memory Of Thy Great Goodness

"Utter" means to speak something out loud, not just think it.

"Memory" here points to God's reputation, the story people tell about Him.

"Abundantly" means without holding anything back.

Together, the phrase pictures people overflowing with stories of God's goodness.

A good reputation like this only grows the more people speak of it.

🗣️ Utter means speak out loud
🏷️ Memory here means reputation
🌊 Abundantly means without holding back
📖 A good reputation grows by being told

## 🎤 Sing Of Thy Righteousness

Singing here is not only about musical talent.

It stands for a full, joyful response to who God is.

"Righteousness" means always doing what is right and fair.

That fairness is not just something to believe.

It is something worth celebrating out loud.

🎤 Singing means a joyful response
⚖️ Righteousness means always right and fair
🙌 Fairness is worth celebrating
📖 Belief turns into a joyful song

# Psalms 145:8-9
# 🕊️ Slow To Anger, Rich In Mercy
---
## 📜 The LORD Is Gracious, And Full Of Compassion

This exact description of God appears many times across the Old Testament.

It first appears when God reveals His own character to Moses in Exodus.

"Gracious" means giving kindness that was never earned.

"Compassion" means feeling and acting on real concern for suffering.

David is quoting God's own self description here, not inventing a new idea.

📜 This phrase echoes Exodus and Moses
🎁 Gracious means kindness never earned
💗 Compassion means acting on real concern
📖 David quotes God's own words

## 🐢 Slow To Anger, And Of Great Mercy

Think of someone who takes a long time to actually lose their temper.

That patience does not mean the issue does not matter to them.

It means they choose patience before reacting.

God works the same way, holding back anger on purpose.

His mercy is not weakness.

It is restraint chosen on purpose.

🐢 Slow to anger means patient, not weak
⏳ God holds back on purpose
💪 Mercy here means restraint
📖 Patience is a choice, not weakness

## 🌍 The LORD Is Good To All

This does not mean God only favors certain people or nations.

The word "all" here includes every single person, not just Israel.

Earlier in this psalm, David praised God's greatness and kingdom.

Here the focus narrows to God's kindness toward every living person.

No one is outside the reach of this goodness.

🌍 All means every person, not favorites
🙅 Not limited to one nation
🔄 Focus shifts from kingdom to kindness
📖 No one is outside God's reach

## 🌱 His Tender Mercies Are Over All His Works

"Tender" pictures a gentle, careful kind of care.

Think of how carefully someone waters a small, fragile seedling.

That same gentle attention covers everything God has made.

Nothing God created is treated carelessly or forgotten.

Even the smallest part of creation is held with real care.

🌱 Tender pictures gentle, careful care
💧 Like carefully watering a seedling
🌎 Covers everything God has made
📖 Even small things are not forgotten

# Psalms 145:10-13
# 🏰 A Kingdom That Never Ends
---
## 🤐 All Thy Works Shall Praise Thee

This does not mean mountains and rivers can talk.

"Praise" here means simply existing the way God designed them to exist.

A well made object reflects credit back on whoever made it.

Creation reflects credit back onto its Creator just by being itself.

Even silence can point back to God.

🤐 Nature cannot literally speak
🎨 Praise means simply existing as designed
🖼️ A creation reflects its creator
📖 Even silence points back to God

## ✝️ Thy Saints Shall Bless Thee

"Saints" here does not mean people who never did anything wrong.

It means people set apart as belonging to God.

The word describes a relationship, not a perfect record.

God's set apart people respond to Him with their own praise.

Being chosen was always meant to lead to worship.

✝️ Saints means set apart, not perfect
🤝 It describes a relationship with God
🙌 God's people respond with praise
📖 Being chosen leads to worship

## ✨ The Glory Of Thy Kingdom

"Glory" points to the visible weight and brightness of God's rule.

Human kingdoms show off wealth, armies, and grand buildings.

God's kingdom shows off something greater than any of those things.

His glory needs no army or palace to prove itself.

✨ Glory means visible weight and brightness
🏰 Human kingdoms show off buildings
⚔️ God's kingdom needs no army
📖 His glory proves itself

## 🌍 To Make Known To The Sons Of Men His Mighty Acts

"Sons of men" is an old way of saying humanity in general.

It does not point to one specific family or nation.

God's mighty acts were never meant to stay hidden or private.

They were meant to become known to every ordinary person.

Ordinary people were always the intended audience for God's power.

🌍 Sons of men means humanity
🔓 God's acts were not meant hidden
👥 Ordinary people are the audience
📖 God's power was meant to be known

## 📉 Thy Kingdom Is An Everlasting Kingdom

Every human kingdom in history has eventually come to an end.

Egypt fell, Babylon fell, and Rome fell after it.

God's kingdom is the one exception to that pattern.

It does not rise and fall like every other kingdom in history.

It simply continues, without an ending point.

📉 Every human kingdom eventually falls
🏛️ Egypt, Babylon, and Rome all fell
♾️ God's kingdom is the exception
📖 It simply continues without ending

## 🔤 Thy Dominion Endureth Throughout All Generations

Psalm 145 is built as an acrostic in the original Hebrew.

Each line was meant to begin with a different Hebrew letter, in order.

Ancient copies of this psalm are missing the line for one letter, called nun.

Some older translations restore that missing line using ancient manuscripts.

Even the psalm's structure pictures generations following one after another, letter by letter.

🔤 Psalm 145 follows the Hebrew alphabet
❓ One Hebrew letter's line is missing
📚 Some translations restore that missing line
📖 Even the structure pictures generations in order

# Psalms 145:14-16
# 🤲 A Hand That Feeds Every Living Thing
---
## 🤲 The LORD Upholdeth All That Fall

"Upholdeth" means to hold something up before it collapses completely.

Picture someone catching a friend who stumbles on a step.

God is not only there after someone falls flat.

He is there in the middle of the stumble itself.

His support is active, not just something offered afterward.

🤲 Upholdeth means holds up before falling
🫂 Like catching a stumbling friend
⏱️ God helps during the fall itself
📖 His support is active, not delayed

## 😔 Raiseth Up All Those That Be Bowed Down

"Bowed down" pictures someone weighed down by grief, guilt, or hardship.

It is not simply a physical posture of bending over.

It describes a person crushed low by their circumstances.

God's action here is to lift that person back up.

He does not leave anyone stuck in that lowered position.

😔 Bowed down means weighed down by hardship
⬆️ God lifts people back up
🚫 No one is left stuck down
📖 God's help meets people at their lowest

## 🐣 The Eyes Of All Wait Upon Thee

Think of a young animal watching its parent for the next meal.

That is the picture behind eyes waiting upon someone.

It describes complete dependence, not casual watching.

Every living creature depends on God the same way.

Nothing survives on its own strength alone.

🐣 Like young animals watching for food
👀 Eyes waiting means complete dependence
🌎 Every creature depends on God
📖 Nothing survives by its own strength

## 🍽️ Givest Them Their Meat In Due Season

"Meat" here is an old word for food in general, not just animal flesh.

"Due season" means the right time, not necessarily right away.

God's timing is not always the timing a person would choose.

Provision still arrives when it is actually needed.

🍽️ Meat here means food in general
⏰ Due season means the right time
🕰️ God's timing is not always immediate
📖 Provision arrives when truly needed

## ✋ Openest Thine Hand, And Satisfiest The Desire Of Every Living Thing

An open hand pictures generosity instead of a closed, guarded fist.

"Satisfiest" means filling a need completely, not just partly meeting it.

This covers every living thing, not only human beings.

Animals, plants, and people all depend on this same open hand.

Nothing in creation is left permanently hungry by accident.

✋ An open hand pictures generosity
💯 Satisfiest means filled completely
🐾 Covers every living creature, not only people
📖 Nothing is left hungry by accident

# Psalms 145:17-21
# 🙏 Near To Everyone Who Calls In Truth
---
## ⚖️ The LORD Is Righteous In All His Ways, And Holy In All His Works

"Righteous" means always doing what is right, without exception.

"Holy" means completely set apart from sin and failure.

Together, these words cover both God's actions and His very nature.

Nothing God does and nothing God is falls short of this.

There is no gap between who God is and what He does.

⚖️ Righteous means always doing right
✨ Holy means set apart from sin
🔗 Covers both God's actions and nature
📖 No gap between who God is and does

## 📏 The LORD Is Nigh Unto All Them That Call Upon Him In Truth

"Nigh" is an old word meaning near or close by.

God is not distant from people who genuinely call out to Him.

"In truth" adds an important qualifier to this promise.

It means calling out sincerely, not just saying religious words.

Nearness here responds to honesty, not empty performance.

📏 Nigh means near or close by
🙋 God is near to sincere people
🎭 In truth means sincere, not performed
📖 Honesty draws God near

## 😨 He Will Fulfil The Desire Of Them That Fear Him

"Fear" of God here does not mean being afraid of Him like an enemy.

It means deep respect and honor for who God is.

This kind of fear leads people toward God, not away from Him.

God responds to that reverence by meeting real desires.

Reverence and relationship work together in this line.

😨 Fear here means deep respect
🚶 It draws people toward God
🎁 God meets desires born from reverence
📖 Reverence and relationship work together

## 😢 He Also Will Hear Their Cry, And Will Save Them

A cry here pictures real distress, not a casual request.

God does not only listen politely from a distance.

Hearing leads directly to action in this verse.

Rescue follows the cry, not just sympathy.

😢 A cry pictures real distress
👂 God listens, not from a distance
🆘 Hearing leads to real rescue
📖 Sympathy alone is not the response

## 🛡️ The LORD Preserveth All Them That Love Him

"Preserveth" means keeps safe over the long run, not just once.

Think of fruit that is preserved so it lasts through the winter.

God's protection over His people works the same steady way.

It is not a single rescue but ongoing, continual care.

🛡️ Preserveth means kept safe long term
🍯 Like fruit preserved for winter
🔁 God's care is ongoing, not one time
📖 Protection continues over the long run

## 🚫 But All The Wicked Will He Destroy

This line does not mean God enjoys punishing people.

It stands as the one exception inside a psalm about mercy.

The wicked here means those who refuse to turn toward God at all.

Even a psalm about kindness still takes evil seriously.

Love and justice sit side by side in the same song.

🚫 Not a picture of God enjoying punishment
⚠️ The one hard line in a gentle psalm
🙅 Wicked means refusing God completely
📖 Mercy and justice share the same song

## 🔙 My Mouth Shall Speak The Praise Of The LORD

This line returns to the personal vow David made back in verse one.

The whole psalm has moved outward, through God's kingdom and care for all creation.

Now it circles back to one person's mouth and one person's voice.

Praise always has to start somewhere specific and personal.

A whole psalm about "all" still begins and ends with "my."

🔙 Returns to David's opening vow
🌍 The psalm expanded outward to all creation
🗣️ Now it narrows back to one voice
📖 All begins and ends with my

## 🌐 Let All Flesh Bless His Holy Name For Ever And Ever

"All flesh" widens this closing line beyond just David or Israel.

It reaches every human being who has ever lived.

The phrase "for ever and ever" already opened this entire psalm.

Now it closes the psalm with the exact same words.

What began as one man's private vow ends as an invitation to everyone.

🌐 All flesh means every human being
🔁 For ever and ever repeats the opening
🎁 One vow becomes an invitation
📖 The psalm ends exactly how it began
`.trim();

export const PSALMS_ONE_HUNDRED_FORTY_FIVE_PERSONAL_SECTIONS = parsePsalmsOneHundredFortyFiveRawNotes(
  PSALMS_ONE_HUNDRED_FORTY_FIVE_RAW_NOTES,
);
