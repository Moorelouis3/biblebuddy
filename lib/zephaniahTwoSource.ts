export type ZephaniahTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZephaniahTwoRawNotes(rawText: string): ZephaniahTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZephaniahTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zephaniah\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zephaniah 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zephaniah\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Zephaniah\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zephaniah 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zephaniah 2:${startVerse}` : `Zephaniah 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Zephaniah 2 sections, received " + sections.length);
  }

  return sections;
}

const ZEPHANIAH_TWO_RAW_NOTES = `# Zephaniah 2:1-3
# 🙏 One Last Call To Repent
---
## 📢 Gather Yourselves Together, Yea, Gather Together

Saying gather twice in one breath is not careless repetition.

Hebrew often doubles a word to make an urgent command impossible to miss.

This is a formal summons, not a casual invitation to show up.

Zephaniah is calling the whole nation to assemble before judgment falls.

The repetition itself carries the urgency.

📢 Gather is repeated twice on purpose

📯 Hebrew doubling signals urgency

🏛️ This is a formal national summons

📖 Repetition itself carries the warning

## 🙈 O Nation Not Desired

"Nation not desired" is one of the hardest phrases in this book to translate.

Many scholars read it as a nation without shame, unashamed of its own sin.

Others read it as a nation that no longer desires the LORD at all.

Either reading points at the same problem, a people who stopped caring what God thought.

Judah is the nation being addressed, not some distant pagan power.

❓ Nation not desired is hard to translate

😶 It may mean a nation without shame

💔 Or a nation that stopped wanting God

📖 Either way, Judah stopped caring what God thought

## ⏳ Before The Decree Bring Forth

"Decree" here means the judgment God has already determined and set in motion.

"Bring forth" pictures that decree like a birth, something now coming to term.

Zephaniah is giving Judah a narrow window before that birth happens.

Three times in a row he repeats the word before to mark that window closing.

The warning is urgent precisely because the door is still open, for now.

⏳ Decree means judgment already set in motion

🤰 Bring forth pictures judgment like a birth

🚪 Before repeats three times to mark urgency

📖 The door is still open, for now

## 🌬️ Before The Day Pass As The Chaff

"Chaff" is the dry, worthless husk left over after grain is threshed.

A light wind blows chaff away completely, leaving only the grain behind.

Zephaniah pictures the coming day scattering Judah that same way.

This is not a slow decline.

It is sudden, total loss blown away in a moment.

🌬️ Chaff is the worthless husk after threshing

💨 Wind blows chaff away completely

⚡ The coming day acts just as fast

📖 This is sudden loss, not slow decline

## 🙏 Seek Ye The LORD, All Ye Meek Of The Earth

"Meek" does not mean weak or passive here.

It describes people who stay humble and teachable under God's hand.

These are the ones Zephaniah calls to seek the LORD before judgment falls.

Not every person in Judah gets this invitation equally.

The humble have a door open to them that the proud do not.

🙏 Meek means humble, not weak

🚪 Seeking the LORD is still possible here

👥 The invitation goes to the humble first

📖 Pride closes a door humility keeps open

## ✋ Seek Righteousness, Seek Meekness

Zephaniah pairs two different pursuits in the same breath.

"Righteousness" means living by what God has already commanded.

"Meekness" means carrying that obedience with a humble, teachable spirit.

A person can do the right thing with the wrong heart.

Zephaniah asks for both together, not one without the other.

⚖️ Righteousness means obeying what God commanded

🙏 Meekness means carrying it humbly

💔 Right actions with a proud heart still fail

📖 Zephaniah asks for both together

## 🤷 It May Be Ye Shall Be Hid

"It may be" is not a typo or a weak promise.

Zephaniah will not guarantee an escape, even for the meek who seek the LORD.

The text stays honest about what is actually certain and what is not.

Hidden here pictures shelter from a storm that is still coming.

Seeking God was never a magic formula that forced his hand.

🤷 It may be is an honest maybe

🌪️ Hid pictures shelter from a storm

🔓 Seeking God never forces a guarantee

📖 Humility does not control the outcome

# Zephaniah 2:4-7
# 🏴 Judgment Falls On The Philistine Coast
---
## 🏙️ Gaza Shall Be Forsaken, And Ashkelon A Desolation

Gaza and Ashkelon were two of the five major Philistine cities.

They sat right on the coast, within a short journey of Judah's own border.

"Forsaken" and "desolation" both describe a place emptied of people.

These were not frontier towns.

They were well known regional powers.

Zephaniah names them specifically so no one could call this a vague threat.

🏙️ Gaza and Ashkelon were major Philistine cities

🌊 Both sat right on the coast

🏚️ Forsaken and desolation both mean emptied out

📖 Naming cities made the threat concrete

## ☀️ They Shall Drive Out Ashdod At The Noon Day

Ashdod was another major Philistine city, home to a temple of the god Dagon.

Armies normally attacked at dawn or under cover of darkness, not at noon.

An attack at noon day means the enemy has nothing left to hide from.

There is no element of surprise left to lose.

Judgment this open and obvious cannot be explained away as bad luck.

🏛️ Ashdod was a major Philistine city

☀️ Noon day attacks were unusually bold

🙈 No surprise is needed to win here

📖 Judgment this open cannot be explained away

## 🌱 Ekron Shall Be Rooted Up

Ekron was the northernmost of the five major Philistine cities.

"Rooted up" is a farming picture, pulling a plant out by its roots.

A plant pulled up that way does not grow back.

Zephaniah is picturing permanent removal, not a temporary setback.

All five Philistine cities are swept into this list one by one.

🌱 Rooted up means pulled out completely

🏙️ Ekron was a major Philistine city

🚫 This removal was meant to be permanent

📖 All five Philistine cities appear in this list

## ⚔️ The Nation Of The Cherethites

"Cherethites" was another name closely tied to the Philistine people.

Some of David's own bodyguards later came from this same group.

That detail shows how familiar this nation already was to Israel's history.

Here Zephaniah speaks to them as an enemy marked for judgment.

A familiar neighbor is not the same as a safe one.

⚔️ Cherethites were tied to the Philistines

🛡️ Some later served as David's bodyguards

🤝 Israel and this nation had a long history

📖 Familiarity never made them safe from judgment

## 🗺️ O Canaan, The Land Of The Philistines

"Canaan" usually means the whole promised land.

Here it narrows to just the strip the Philistines controlled.

God addresses the land itself, not only the people on it.

The territory and its people share the same judgment.

No piece of ground stood neutral in this warning.

🗺️ Canaan here means Philistine territory

🏴 This land belonged to Israel's enemies

🌍 Land and people share one judgment

📖 No ground stayed neutral in this warning

## 🐑 Dwellings And Cottages For Shepherds

Once this land is emptied of Philistines, something new moves in.

"Cottages" here means simple shelters, not permanent houses.

Shepherds and their flocks take over ground that once held cities and armies.

The reversal is dramatic, conquered territory turning into quiet pastureland.

What enemies fought over becomes a place where sheep safely graze.

🐑 Shepherds replace cities and armies here

🏕️ Cottages means simple shelters, not houses

🔄 Conquered land turns into quiet pastureland

📖 Sheep safely graze where armies once fought

## 👁️ The LORD Their God Shall Visit Them, And Turn Away Their Captivity

"Visit" here does not mean a casual drop in.

It means God steps in personally, for rescue this time, not judgment.

"Turn away their captivity" means reversing a captivity Judah had not even entered yet.

The remnant of Judah ends up living in the very towns just judged.

Judgment on Philistia becomes restoration for Judah in the very same verses.

👁️ Visit here means God steps in personally

🔄 This visit means rescue, not judgment

🏠 Judah's remnant settles in Philistia's own towns

📖 One nation's judgment becomes another's restoration

# Zephaniah 2:8-11
# 💔 Moab And Ammon's Pride
---
## 👂 The Reproach Of Moab, And The Revilings Of The Children Of Ammon

"Reproach" and "revilings" both describe insults and mocking words.

Moab and Ammon were two nations descended from Lot, related distantly to Israel.

Instead of kinship, they responded to Israel with contempt.

God says plainly that he has heard every one of those words.

Nothing said against God's people goes unnoticed by him.

👂 Reproach and revilings both mean mocking words

👪 Moab and Ammon were distant relatives of Israel

💔 Kinship did not stop their contempt

📖 God hears what is said against his people

## 🔥 Surely Moab Shall Be As Sodom, And The Children Of Ammon As Gomorrah

Sodom and Gomorrah were cities destroyed completely generations earlier for their sin.

Every reader of this verse already knew exactly what happened to those two cities.

Comparing Moab and Ammon to them is not a vague insult.

It names a specific, total kind of destruction already proven in Israel's own history.

The same fire that ended one story now threatens another.

🔥 Sodom and Gomorrah were already destroyed

📜 Every reader knew that history well

⚖️ This comparison names total destruction

📖 The same fire threatens a new nation

## 🌾 The Breeding Of Nettles, And Saltpits

"Nettles" are useless weeds that take over neglected ground.

"Saltpits" describes soil so full of salt that nothing can grow there again.

Both pictures describe land left permanently unusable.

This is not a temporary setback a farmer could recover from.

Moab's land itself becomes part of the punishment.

🌾 Nettles are useless weeds on neglected ground

🧂 Saltpits means soil ruined beyond growing

🚫 Both pictures mean permanently unusable land

📖 The land itself carries the punishment

## 💔 This Shall They Have For Their Pride

Pride is named as the specific reason for this judgment.

Moab and Ammon magnified themselves against God's own people.

"Magnified themselves" means they puffed themselves up at Israel's expense.

Pride here is not just an attitude, it produced real mocking and real harm.

God names the root cause before naming the punishment.

💔 Pride is named as the direct cause

📏 Magnified themselves means puffing up at Israel's cost

⚡ Pride produced real mocking and harm

📖 God names the root before the punishment

## 🌍 He Will Famish All The Gods Of The Earth

"Famish" usually describes a person starving from lack of food.

Here it describes false gods being starved of worship and sacrifice.

A god that nations stop feeding with offerings simply fades into nothing.

This judgment reaches beyond Moab and Ammon to every false god everywhere.

The LORD is not just defeating nations, he is emptying their altars.

🌍 Famish usually means starving for food

🙇 Here it means gods starved of worship

🔚 Unfed gods simply fade into nothing

📖 God empties altars, not just armies

## 🙇 Every One From His Place

This phrase describes worship happening in many different locations at once.

People do not need to travel to one temple to honor the LORD here.

"His place" means wherever each worshipper already stands.

Worship of the LORD spreads out instead of staying centered in Jerusalem alone.

This looks ahead to a much wider kind of worship than Judah had known.

🙇 Every one from his place means scattered worship

🗺️ No single temple is required here

🌐 Worship spreads far beyond Jerusalem

📖 This looks ahead to a wider worship

## 🏝️ All The Isles Of The Heathen

"Isles" here is a broad Hebrew term for distant coastlands, not only literal islands.

"Heathen" simply means nations outside Israel who did not worship the LORD.

Zephaniah is naming the farthest, least likely worshippers he can think of.

If people that distant end up worshipping the LORD, no nation is truly out of reach.

The scope of this chapter keeps widening past anything Judah expected.

🏝️ Isles means distant coastlands, not just islands

🌐 Heathen means nations outside Israel

📏 These are the farthest people Zephaniah can name

📖 No nation is truly out of reach

# Zephaniah 2:12-15
# 🏯 From Ethiopia To Nineveh
---
## ⚔️ Ye Ethiopians Also, Ye Shall Be Slain By My Sword

"Ethiopians" here means Cush, the land south of Egypt.

Zephaniah's own father was named Cushi, tying him personally to this very region.

This is the shortest judgment oracle in the whole chapter, just one verse.

A short sentence can still carry the same full weight as a long one.

Even the prophet's own family history does not spare this nation.

⚔️ Ethiopians here means the land of Cush

👪 Zephaniah's own father was named Cushi

⏱️ This oracle is just one short verse

📖 Family ties did not earn an exemption

## ✋ He Will Stretch Out His Hand Against The North

Judah and the Philistines sat to the west, Moab and Ammon to the east.

Ethiopia was south, and now the north enters the picture too.

"Stretch out his hand" is the same phrase used earlier against Judah itself.

Zephaniah has now pointed this same hand in every direction on the map.

No compass direction offers any safety from this judgment.

✋ Stretch out his hand means direct action

🧭 This fills in the last compass direction

🔁 The same phrase was used against Judah

📖 No direction offers safety here

## 🏯 Make Nineveh A Desolation, And Dry Like A Wilderness

Nineveh was the capital of the Assyrian empire, one of the ancient world's great cities.

Assyria had once been the dominant power that even Judah feared.

A great city built near rivers is pictured turning dry like a desert.

The empire that looked unshakable gets erased down to the ground.

Zephaniah wrote this not long before Nineveh actually fell.

🏯 Nineveh was Assyria's great capital city

💪 Assyria had been a feared, dominant power

🏜️ A river city turns dry like a desert

📖 This fall came true not long after

## 🦉 The Cormorant And The Bittern Shall Lodge In The Upper Lintels

A "cormorant" and a "bittern" are both wild birds that favor empty, quiet places.

"Lintels" are the stone or wood beams built over doorways and windows.

Wild birds nesting in a doorway beam means no one lives in that house anymore.

A once busy palace becomes quiet enough for birds to move in undisturbed.

Nature slowly takes back what people once built and ruled from.

🦉 Cormorant and bittern are wild marsh birds

🚪 Lintels are beams built over doorways

🏚️ Birds nesting there means the house is empty

📖 Nature quietly takes back what people built

## 🌲 He Shall Uncover The Cedar Work

"Cedar work" refers to fine wood paneling used to decorate wealthy buildings.

Cedar had to be imported from distant forests and cost a fortune to use.

"Uncover" here means exposing that hidden luxury once the roof collapses.

Expensive beauty built to impress ends up stripped bare for anyone to see.

Wealth poured into a building cannot keep that building standing.

🌲 Cedar work meant expensive imported wood paneling

💰 Cedar cost a fortune to bring in

🏚️ Uncover means the hidden luxury gets exposed

📖 Money spent on a building cannot save it

## 🎉 This Is The Rejoicing City That Dwelt Carelessly

"Dwelt carelessly" does not mean lazy.

It means confident and unafraid of any threat.

Nineveh felt completely secure, certain that nothing could ever touch it.

That same word described Judah's own complacency earlier in this book.

Confidence with no reason behind it shows up in more than one nation here.

Feeling safe and actually being safe are two very different things.

🎉 Dwelt carelessly means confident, not lazy

🛡️ Nineveh felt completely untouchable

🔁 The same word described Judah earlier

📖 Feeling safe is not being safe

## 👑 I Am, And There Is None Beside Me

This is a claim of total, unmatched power.

It is also language the LORD himself uses elsewhere to describe who he is.

A city borrowing God's own words about itself is the deepest kind of pride.

Nineveh did not just feel strong.

It spoke as though it answered to no one.

That claim is exactly what brings the judgment down.

👑 This claims total, unmatched power

📜 It echoes language God uses for himself

💔 A city borrowing God's words is deep pride

📖 That very claim brings the judgment

## 👋 Every One That Passeth By Her Shall Hiss, And Wag His Hand

"Hiss" here is a sound of scorn, not fear.

"Wag his hand" is a gesture of mockery, not a greeting.

Travelers who once feared this city now openly mock its ruins.

The city that claimed no equal now draws contempt from total strangers.

Pride that once silenced onlookers ends up inviting their laughter instead.

👋 Hiss and wag the hand both mean scorn

🚶 Strangers now mock these ruins openly

🔄 Feared power turns into open contempt

📖 Pride that silenced others now invites laughter
`.trim();

export const ZEPHANIAH_TWO_PERSONAL_SECTIONS = parseZephaniahTwoRawNotes(ZEPHANIAH_TWO_RAW_NOTES);
