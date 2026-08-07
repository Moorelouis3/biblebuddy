export type JoshuaElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaElevenRawNotes(rawText: string): JoshuaElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 11:${startVerse}` : `Joshua 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Joshua 11 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_ELEVEN_RAW_NOTES = `# Joshua 11:1-5
# 👑 The Northern Kings Unite
---
## 👑 Jabin King Of Hazor

Jabin was not necessarily one man's own personal name.

Many scholars believe Jabin worked as a title for the kings of Hazor, much like Pharaoh named Egypt's rulers.

Judges chapter four features another king named Jabin of Hazor, defeated generations later by Deborah and Barak.

The title outlasted this one king's death.

👑 Jabin may be a royal title
🏛️ Similar to Pharaoh in Egypt
📜 Judges four names another Jabin
📖 The title outlived this one king

## 📰 Had Heard Those Things

Those things point back to Joshua's southern campaign in the chapter before this one.

News had reached the north that the five kings of the south had fallen.

Jabin acted out of real fear, not simple ambition.

He began gathering allies before Israel could ever reach his region.

📰 Those things means chapter ten's victories
😨 Jabin reacted out of fear
🤝 He gathered allies quickly
📖 Fear built this new coalition

## 🗺️ Jobab King Of Madon

Madon, Shimron, and Achshaph were three separate cities in the north of Canaan.

Each city had its own king, and each king joined Jabin's growing coalition.

None of these three cities appear often anywhere else in the Bible.

Their obscurity did not make the threat any smaller.

🗺️ Madon Shimron and Achshaph were northern cities
👑 Each city had its own king
📜 They rarely appear elsewhere in scripture
📖 Small cities still posed a real threat

## 🌊 In The Borders Of Dor On The West

Chinneroth is an older name for the Sea of Galilee.

Dor sat far to the west, on the coast of the Mediterranean Sea.

The mountains, the plains, the valley, and the coast all get named.

That covers every direction at once.

🌊 Chinneroth names the Sea of Galilee
🏖️ Dor sat on the coast
🧭 Every direction gets named here
📖 This was a large, spreading threat

## 🗻 The Hivite Under Hermon

This verse lists nearly every people group living inside Canaan.

Canaanite, Amorite, Hittite, Perizzite, Jebusite, and Hivite are named one after another.

Genesis chapter fifteen names this same set of nations as the land promised to Abraham.

Hermon was the tallest mountain in the region, often capped in snow.

Even people living in its shadow chose to fight against Israel.

📜 This lists Canaan's many peoples
🗺️ Genesis fifteen names this same group
🗻 Hermon marked the land's northern edge
📖 Even its people joined the coalition

## 🏖️ As The Sand That Is Upon The Sea Shore

This exact picture of sand on the seashore first appeared in God's promise to Abraham.

There it meant Abraham's own descendants would grow too many to count.

Here the same picture describes an enemy army, not Israel.

An image that once meant blessing now stands against God's people.

🏖️ Sand on the shore recalls Genesis
🙌 It first described Abraham's descendants
⚔️ Now it describes an enemy army
📖 A blessing's image now threatens Israel

## 🐎 With Horses And Chariots Very Many

Chariots were the most advanced weapon of that era, much like tanks in a modern army.

Israel fought this entire war without a single chariot of its own.

The size of this mismatch makes the coming victory hard to explain by human strength alone.

🐎 Chariots were the era's top weapon
🚫 Israel had no chariots at all
⚖️ The two armies were badly matched
📖 Victory would not come from strength

## 💧 The Waters Of Merom

Merom was a marshy lake area north of the Sea of Galilee.

An army camping at a water source needed it to supply thousands of men and animals.

Choosing this site suggests the coalition planned for a long standoff, not a quick raid.

💧 Merom was a marshy lake area
🐫 Water supplied a huge army
⏳ The choice suggested a long standoff
📖 Israel would face a prepared enemy

## ⚔️ To Fight Against Israel

Pitched means the armies set up camp together as one combined force.

Separate kings with separate armies became a single united threat.

Every detail in this section builds toward this one moment.

The whole north now stood ready for war.

⛺ Pitched means they set up camp
🤝 Separate armies became one force
⚔️ One united threat faced Israel
📖 The whole north stood ready to fight

# Joshua 11:6-9
# 🔥 Victory At The Waters Of Merom
---
## 🛡️ Be Not Afraid Because Of Them

God gives Joshua this same reassurance before nearly every major battle in this book.

The size of the coalition did not change God's promise of victory.

Fear was the natural response to an army this large.

God met that fear directly instead of ignoring it.

🛡️ God repeats this promise often
😨 Fear was a natural response
💪 God met fear with a promise
📖 A large army did not change the outcome

## ⚔️ Thou Shalt Hough Their Horses

Hough means to cut the tendons in a horse's leg, permanently disabling it.

This crippled the enemy's chariots without Israel needing extra weapons or manpower.

A horse that cannot walk cannot pull a war chariot into battle again.

⚔️ Hough means cutting a horse's leg tendons
🐎 It disabled the chariot force
🚫 A crippled horse cannot fight again
📖 One command ended the enemy's advantage

## 🔥 Burn Their Chariots With Fire

Israel destroys this advanced weapon instead of keeping it.

Deuteronomy later commands Israel's future king not to multiply horses for himself.

Destroying the chariots here fits that same principle from the very start.

Israel's strength was never meant to come from copying its enemies.

🔥 The chariots are destroyed, not kept
📜 Deuteronomy later repeats this same principle
🚫 Strength was not meant to come from horses
📖 Trust in God, not military hardware

## 🏃 And They Fell Upon Them

Suddenly means Israel attacked before the coalition expected any real resistance.

Joshua used this same tactic of surprise in the chapter before this one.

A rested, prepared army can be beaten just as fast as a tired one.

🏃 Suddenly means a surprise attack
🔁 Joshua reused a proven tactic
⚡ Surprise mattered more than rest
📖 A prepared army still fell quickly

## 🌊 Unto Great Zidon

Zidon was a major Phoenician city on the coast, far north of the battle site.

Chasing a defeated army that far shows just how complete this victory became.

Soldiers were not simply pushed back.

They were pursued for miles beyond the battlefield.

🌊 Zidon was a major coastal city
🏃 It sat far north of the battle
📏 The chase covered a great distance
📖 The victory was total, not partial

## 📍 Unto Misrephothmaim

Misrephothmaim is a place name whose exact meaning scholars still debate.

Some connect it to burning, others to salt pits along the coast.

The text does not explain which meaning is correct.

Naming an obscure place shows how far this pursuit actually reached.

📍 Misrephothmaim's meaning is debated
🔥 Some connect it to burning
🧂 Others connect it to salt pits
📖 An obscure name marks a real distance

## 🚫 They Left Them None Remaining

This phrase describes total destruction of the enemy coalition's fighting force.

It matches the same complete language used throughout the southern campaign in chapter ten.

God's promise in verse six is now fully carried out.

🚫 None remaining means total destruction
🔁 The same language appeared in chapter ten
✅ God's promise was fully carried out
📖 Every word God spoke came true

## ✅ As The LORD Bade Him

Bade means commanded or instructed.

Joshua carries out the exact command given back in verse six.

He houghs the horses and burns the chariots just as he was told.

Obedience closes this battle the same way it opens nearly every battle in this book.

✅ Bade means commanded
🔁 Joshua repeated the exact command
📜 Obedience closes this battle
📖 The same pattern runs through this book

# Joshua 11:10-15
# 🔥 Hazor Burned With Fire
---
## 🔙 At That Time Turned Back

Joshua had just chased the coalition all the way to Zidon in the far north.

Turned back means he brought the army south again toward Hazor itself.

The chase proved the coalition was broken.

Hazor itself still needed to fall.

🔙 Joshua returned south after the chase
🏃 The coalition was already broken
🏛️ Hazor itself still had to fall
📖 Chasing enemies was not the final step

## 👑 The Head Of All Those Kingdoms

Hazor ruled over the other cities in this coalition as its leading power.

A head city like this likely controlled trade routes and smaller towns around it.

Taking down the head city carried far more weight than any other single victory.

👑 Hazor led the whole coalition
🛣️ It likely controlled trade and smaller towns
💥 Its fall carried extra weight
📖 One city's fall broke the whole alliance

## 😶 There Was Not Any Left To Breathe

This phrase describes the complete destruction God commanded for cities like Hazor.

It matches similar language already used throughout the southern campaign in chapter ten.

This was not casual warfare.

It followed a specific, repeated instruction from God.

😶 None left to breathe means total destruction
🔁 The same language appeared in chapter ten
📜 God's specific command was followed exactly
📖 This was obedience, not casual warfare

## 🔥 He Burnt Hazor With Fire

Burning a captured city was unusual in this campaign.

Most conquered cities were left standing instead.

Hazor received this unique treatment because of its size and influence over the region.

Destroying the head city sent a clear warning to anyone who might rebuild a coalition there.

🔥 Most captured cities were left standing
🏛️ Hazor was uniquely large and influential
⚠️ Its destruction sent a clear warning
📖 The head city's fall had to be final

## 📜 As Moses The Servant Of The LORD Commanded

This phrase ties Joshua's actions directly back to instructions Moses gave before he died.

Deuteronomy chapters seven and twenty record Moses commanding total destruction for cities like these.

Joshua was not improvising a harsh policy of his own.

He was carrying out a command handed down from Moses himself.

📜 Moses gave this command earlier
🚫 Joshua was not improvising
✅ He carried out a prior command
📖 Deuteronomy seven and twenty record it

## 🏘️ Save Hazor Only

Cities that stood still in their strength were left standing, not burned.

Deuteronomy later promises Israel houses they did not build and cities they did not construct.

Burning every captured city would have destroyed that future gift to Israel.

Hazor alone lost that protection because of what it represented.

🏘️ Standing cities were mostly left intact
🎁 Deuteronomy promises Israel ready made homes
🔥 Burning everything would have wasted that gift
📖 Hazor alone was the exception

## 🐄 Took For A Prey Unto Themselves

Prey means plunder, the goods and animals taken from a defeated city.

Israel was allowed to keep this spoil in this campaign.

Jericho earlier forbade the army from keeping any spoil at all.

That refusal was tied to Achan's sin back in chapter seven.

God's commands could change from city to city.

🐄 Prey means plunder or spoil
✅ Israel could keep it this time
🚫 Jericho had forbidden this same thing
📖 God's commands changed city by city

## 🔗 He Left Nothing Undone

This verse traces one chain of command from the LORD, to Moses, to Joshua, to action.

Nothing undone means Joshua completed every single instruction he had been given.

This same phrase describes Joshua's obedience elsewhere in this book as well.

A leader's legacy here is measured by faithfulness, not by personal ambition.

🔗 God to Moses to Joshua
✅ Nothing undone means full obedience
🔁 This phrase describes Joshua elsewhere too
📖 Faithfulness defined Joshua's leadership

# Joshua 11:16-20
# 🗺️ Joshua Takes The Whole Land
---
## 🌾 All The Land Of Goshen

This Goshen is a region inside Canaan, a different place from Egypt's Goshen.

The same name appears in two very different locations in the Bible.

Context alone tells the reader which Goshen a passage means.

Chapter ten already used this same region's name earlier in the campaign.

🌾 This Goshen sits inside Canaan
🇪🇬 A different Goshen existed in Egypt
🔀 One name names two places
📖 Context reveals which place is meant

## ⛰️ The Hills, And All The South Country

This verse lists several kinds of terrain, hills, dry southern country, valley, and plain.

Naming every terrain type shows the conquest was thorough, not partial.

No landscape offered the coalition a place left safely untouched.

⛰️ Several terrain types get named
🗺️ The conquest covered every kind of land
🚫 No landscape stayed untouched
📖 Thoroughness itself is the point

## 🧭 From The Mount Halak, That Goeth Up To Seir

Mount Halak sat near Seir, the region later associated with Edom.

This boundary point marked the land's far southern edge.

Naming a southern boundary sets up a contrast with the northern boundary in the very next verse.

This kind of pairing appears elsewhere in Joshua too.

🧭 Halak marked the far south
🗺️ Seir was linked to Edom
⚖️ A northern point balances it next
📖 Naming both ends shows totality

## 🗻 Unto Baalgad In The Valley Of Lebanon

Baalgad sat far to the north, under Mount Hermon.

That marked the opposite end of the land from Mount Halak.

Baal was a Canaanite god.

This place name shows pagan worship already existed there before Israel arrived.

🗻 Baalgad marked the far north
🛐 Baal was a Canaanite god
🧭 South and north are both named
📖 One phrase covers the whole land

## ⏳ Joshua Made War A Long Time

The southern campaign in chapter ten moved fast.

Some of those cities fell in a single day.

This northern campaign against strong, fortified kingdoms took much longer to finish.

Jewish tradition places the whole conquest at around seven years total.

⏳ The north took much longer
⚡ The south had moved quickly
📅 Tradition estimates about seven years total
📖 Not every victory came fast

## 🕊️ Save The Hivites The Inhabitants Of Gibeon

Gibeon secured a peace treaty with Israel through deception back in chapter nine.

Every other city in the land had to be taken by force.

Israel kept that early promise even though it was won through a trick.

One kept promise still stands out in a chapter full of battles.

🕊️ Gibeon alone made peace
⚔️ Every other city fell in battle
🤝 Israel kept an old promise
📖 One exception stands out clearly

## 💔 It Was Of The LORD To Harden Their Hearts

Harden their hearts echoes the same phrase used for Pharaoh back in the book of Exodus.

This does not mean God forced innocent people into evil they never wanted.

Genesis had already said these nations' sin would eventually reach its full measure.

God's judgment matched choices these nations had already been making for generations.

💔 This echoes Pharaoh's hardened heart
🚫 God did not force innocent people to sin
⏳ Genesis had already predicted this judgment
📖 Judgment matched generations of choices

## ⚖️ That They Might Have No Favour

No favour means Israel would offer these kingdoms no peace treaty and no mercy.

This differs sharply from what happened with Gibeon just one chapter earlier.

The text is honest that this outcome was judgment, not simple military luck.

⚖️ No favour means no peace offered
🔀 Gibeon's story went differently
⚔️ Luck did not decide this outcome
📖 The text names this as judgment

# Joshua 11:21-23
# ⛰️ The Anakims Are Cut Off
---
## 👣 Cut Off The Anakims From The Mountains

The Anakims were an unusually tall people who terrified Israel's spies forty years earlier.

Numbers chapter thirteen records the spies saying they felt like grasshoppers next to them.

That old fear kept a whole generation from entering the promised land.

This verse finally resolves the very fear that once stopped Israel.

👣 Anakims were unusually tall people
🦗 Numbers thirteen recalls the grasshopper fear
⏳ That fear once stopped a whole generation
📖 Old fear is finally resolved here

## 🗺️ From Hebron, From Debir, From Anab

Hebron and Debir were major cities already conquered earlier in this book.

Anab was a smaller, less known town in the same southern hill region.

Naming a lesser known town alongside famous cities shows how thorough this final sweep was.

🗺️ Hebron and Debir were already famous
🏘️ Anab was smaller and less known
🧹 The sweep reached even minor towns
📖 Thoroughness reached every corner

## 🏙️ Only In Gaza, In Gath, And In Ashdod

Gaza, Gath, and Ashdod were three of the five major Philistine cities.

Some Anakim survivors escaped Israel's campaign by fleeing to these coastal cities.

Gath later becomes the hometown of Goliath, a giant warrior generations after this chapter.

A small, overlooked detail here quietly sets up a much later story.

🏙️ Gaza Gath and Ashdod were Philistine cities
🏃 Some Anakim survivors fled there
🗡️ Gath later produces the giant Goliath
📖 A small detail sets up a later story

## 🌍 Joshua Took The Whole Land

This verse sums up the entire military campaign that has run since chapter six.

Later, the book of Judges shows some pockets of land were never fully secured.

The whole land here describes God's complete promise, not a claim that every enemy vanished.

🌍 This sums up the whole campaign
📜 Judges later shows some pockets remained
🎯 Whole land means promise, not perfection
📖 God's promise still held true

## 🧭 For An Inheritance Unto Israel

Inheritance means land given as a lasting possession, not something earned through labor.

Israel received this land as a gift tied to promises made generations earlier to Abraham.

The next several chapters describe exactly how this land was divided among the twelve tribes.

🧭 Inheritance means a lasting gift
🤝 It fulfilled a promise to Abraham
📋 Later chapters divide it by tribe
📖 A promise now becomes an address

## 🕊️ The Land Rested From War

Rested does not mean peace lasted forever.

Later books record new conflicts arising again.

This word means the current stretch of fighting had finally come to an end.

Genesis first used rest to describe God finishing His work of creation.

A weary land finally got to stop and breathe.

🕊️ Rested means this stage of war ended
⚠️ Peace was not permanent forever
🌍 Genesis first used rest at creation
📖 A weary land finally got to stop
`.trim();

export const JOSHUA_ELEVEN_PERSONAL_SECTIONS = parseJoshuaElevenRawNotes(JOSHUA_ELEVEN_RAW_NOTES);
