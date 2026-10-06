export type NahumThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNahumThreeRawNotes(rawText: string): NahumThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NahumThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nahum\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nahum 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nahum\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Nahum\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nahum 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nahum 3:${startVerse}` : `Nahum 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Nahum 3 sections, received " + sections.length);
  }

  return sections;
}

const NAHUM_THREE_RAW_NOTES = `# Nahum 3:1-3
# 🩸 Woe To The Bloody City
---
## 🩸 Woe To The Bloody City

"Woe" is a cry of doom, not just a sad word.

Prophets used it to open a formal sentence of judgment.

"The bloody city" names Nineveh directly by its own reputation.

Assyria built its empire by conquering nation after nation through war.

Nahum opens the whole chapter with Nineveh's own violent history.

⚠️ Woe opens a formal sentence of judgment

🩸 Bloody city names Nineveh by reputation

⚔️ Assyria conquered through constant warfare

📖 Nahum names the charge before the verdict

## 🤥 Full Of Lies And Robbery

"Lies" points to Assyria's broken treaties and false promises to other nations.

"Robbery" names the tribute and plunder taken by force from conquered peoples.

Assyrian kings often made peace deals only to break them later.

Entire economies were drained just to fill Nineveh's treasury.

The city's wealth was never honestly earned.

🤥 Lies means broken treaties and false promises

💰 Robbery means tribute taken by force

📜 Peace deals were often broken later

📖 Nineveh's wealth was never honestly earned

## 🎯 The Prey Departeth Not

"Prey" refers to the victims and plunder Assyria's armies kept bringing home.

"Departeth not" means the flow of victims never slows down or stops.

Other empires paused between campaigns.

Nineveh's war machine seems to run constantly in this verse.

One conquest simply leads straight into the next.

🎯 Prey means victims and plunder taken

🔄 Departeth not means it never stops

⚙️ Nineveh's war machine runs constantly

➡️ One conquest leads straight into the next

## 🐎 The Noise Of A Whip And The Noise Of The Rattling Of The Wheels

Nahum switches from accusation straight into sound.

A whip cracked over the horses driving each war chariot forward.

Wheels rattled loudly over hard, uneven ground.

The reader is meant to hear the attack before seeing it.

Sound itself becomes part of the terror.

🐎 A whip drove the chariot horses

🎡 Wheels rattled over rough ground

👂 The reader hears the attack first

📖 Sound itself becomes part of the terror

## 🐴 The Pransing Horses And Of The Jumping Chariots

"Pransing" is an old spelling of prancing, a horse rearing and stepping high.

"Jumping chariots" describes chariots bouncing hard as they race at full speed.

Both pictures show an army already in full charge.

There is no slow buildup described here at all.

The attack has already reached its peak speed.

🐴 Pransing means prancing, rearing horses

🛞 Jumping chariots means bouncing at full speed

🏃 The army is already in full charge

➡️ The attack has reached its peak speed

## ⚔️ The Horseman Lifteth Up The Bright Sword And The Glittering Spear

Soldiers polished their blades and spear tips before marching into battle.

A bright, glittering weapon reflected light and looked freshly sharpened.

This detail shows an army fully equipped and ready, not worn down.

Nineveh is not facing a weak or tired enemy.

⚔️ Soldiers polished blades before battle

✨ Glittering weapons looked freshly sharpened

💪 The army arrives fully equipped

📖 Nineveh faces a strong, ready enemy

## 💀 None End Of Their Corpses

Nahum piles up three separate phrases for the dead in a single verse.

"A multitude of slain" and "a great number of carcases" both describe overwhelming death.

"None end of their corpses" means the bodies do not stop accumulating.

The next phrase shows people literally tripping over the dead as they try to move.

This is not poetic exaggeration alone.

It is meant to overwhelm the reader the way the battlefield overwhelmed the city.

💀 Three phrases describe overwhelming death

📈 None end means bodies keep piling up

🦶 People stumble over corpses while moving

📖 The scene is built to overwhelm the reader

# Nahum 3:4-7
# 💔 The Harlot Exposed
---
## 💄 The Wellfavoured Harlot

"Wellfavoured" is an old word for attractive or good looking.

Nahum pictures Nineveh as a harlot who uses charm to control others.

"Mistress of witchcrafts" adds the idea of sorcery and omen reading.

Ancient Assyrian kings regularly consulted omens before political and military decisions.

The image combines seduction and manipulation into one figure.

Nineveh's power was never just military strength.

💄 Wellfavoured means attractive, good looking

🎭 Nineveh pictured as a controlling harlot

🔮 Mistress of witchcrafts means sorcery and omens

📖 Her power combined charm and manipulation

## 🤝 Selleth Nations Through Her Whoredoms

Nahum pictures Nineveh selling nations the way a harlot sells herself.

"Whoredoms" and "witchcrafts" both describe deceptive alliances dressed up as friendship.

Smaller kingdoms were drawn in through treaties and tribute, not open war alone.

Those same nations ended up controlled and drained of their wealth.

Charm was simply another weapon in Assyria's arsenal.

🤝 Whoredoms pictures deceptive, false alliances

👑 Smaller kingdoms were drawn in by treaty

💸 Those nations were drained of wealth

➡️ Charm worked as another weapon

## 👆 Behold I Am Against Thee Saith The LORD Of Hosts

Every threat up to this point came from human armies and sieges.

This line names the true opponent for the first time in the chapter.

"LORD of hosts" means the LORD who commands heaven's own armies.

Nineveh is not simply losing a war between empires.

It is losing a direct confrontation with God himself.

👆 God names himself the true opponent

⚔️ Earlier threats were only human armies

👑 LORD of hosts means commander of heaven's armies

📖 Nineveh faces God, not just an empire

## 👗 Discover Thy Skirts Upon Thy Face

This pictures a public punishment used against women caught in adultery or prostitution.

Lifting a woman's skirt up over her own face exposed her completely in public.

The punishment was meant to shame, not simply to injure.

Nahum applies this exact punishment to Nineveh as a whole city.

Her hidden sins are about to become fully visible to everyone.

👗 A real ancient punishment for adultery

😳 It exposed and shamed in public

🏙️ Applied here to the whole city

➡️ Hidden sins become fully visible

## 👀 Shew The Nations Thy Nakedness

"Nakedness" continues the same picture of public exposure from the verse before.

Every nation Nineveh once ruled over will now watch her humiliation.

"Kingdoms thy shame" repeats the same idea with different words for emphasis.

The watching nations include many Nineveh once conquered and plundered.

Her downfall becomes a public spectacle instead of a private defeat.

👀 Nakedness means total public exposure

🌍 Conquered nations watch her fall

🔁 Shame repeats the idea for emphasis

📖 Defeat becomes a public spectacle

## 🗑️ Cast Abominable Filth Upon Thee

"Abominable filth" pictures Nineveh covered in something disgusting and foul.

"Make thee vile" means her reputation itself becomes disgraced, not just her appearance.

The image matches the earlier picture of public shaming.

Nineveh once displayed glory and wealth for the world to see.

Now the world sees only disgrace.

🗑️ Filth pictures total public disgrace

👎 Vile means her reputation is ruined

🔄 It reverses her earlier glory and wealth

➡️ The world now sees only disgrace

## 👁️ Set Thee As A Gazingstock

A "gazingstock" is an object people stop and stare at openly.

The word pictures a crowd gathering just to look at someone's downfall.

Nineveh once drew attention through fear and conquest.

Now she draws attention through ruin and mockery.

The crowd gathers for the opposite reason this time.

👁️ Gazingstock means an open public spectacle

🎪 Crowds gather just to stare

🔁 Nineveh once drew attention through fear

📖 Now she draws it through mockery

## ❓ Who Will Bemoan Her

Cities that fall usually receive mourning from someone, even an enemy.

"Who will bemoan her" is a rhetorical question expecting the answer nobody.

"Whence shall I seek comforters for thee" repeats that same empty search.

Nineveh caused too much suffering for anyone to grieve its loss.

Even those who flee at the sight of her ruin will not look back to mourn.

❓ Bemoan her expects the answer nobody

🚫 No comforters exist for Nineveh either

😶 Her cruelty earned her no mourners

➡️ Even witnesses will not look back

# Nahum 3:8-10
# 🏛️ No Fared No Better
---
## 🏛️ Art Thou Better Than Populous No

"No" was an ancient Egyptian city also called Thebes, far to the south.

"Populous" means heavily crowded with people, one of the largest cities of its day.

The question is not really a question.

Nahum already knows Nineveh is no better protected than No was.

Assyria itself had conquered No years before this prophecy.

🏛️ No was the Egyptian city Thebes

👥 Populous means heavily crowded with people

❓ The question expects no as the answer

📖 Assyria itself once conquered No

## 🌊 Whose Rampart Was The Sea

No sat among branches of the Nile River, almost surrounded by water.

That water acted like a natural wall protecting the city from attack.

"Rampart" means a defensive wall, usually built from earth or stone.

Here the river itself served that same protective purpose.

Even a city with water on every side eventually fell.

🌊 No was surrounded by the Nile

🧱 Rampart means a defensive wall

💧 The river served as that wall

➡️ Even water defenses eventually fail

## 🤝 Ethiopia And Egypt Were Her Strength

No did not stand alone when it was attacked.

Ethiopia, Egypt, Put, and Lubim were all allied nations who sent help.

"Put and Lubim" refer to regions in and around ancient Libya.

Together these allies gave No some of the strongest military backing in the region.

That backing still was not enough to save the city.

🤝 Four allied nations backed No's defense

🌍 Put and Lubim were Libyan regions

💪 No had strong military backing

📖 Strong allies still could not save it

## ⛓️ She Went Into Captivity

No eventually fell despite its rivers, walls, and powerful allies.

"Went into captivity" means its surviving people were taken away as prisoners.

Nahum brings this up on purpose.

If No could fall, Nineveh has no real excuse to think it cannot.

The comparison is a warning dressed up as history.

⛓️ Captivity means being taken as prisoners

🏛️ No fell despite walls and allies

⚠️ The comparison warns Nineveh directly

➡️ If No fell, Nineveh can too

## 💔 Her Young Children Dashed In Pieces

This line describes one of the most brutal outcomes of an ancient siege.

Conquering armies sometimes killed a defeated city's children in the streets.

Nahum does not soften this detail or look away from it.

The same empire now facing judgment once caused this same horror elsewhere.

Nineveh's coming fall answers for violence like this, not just for pride.

💔 A brutal, real outcome of siege warfare

😢 Nahum does not soften the detail

🔄 Assyria likely caused horrors like this too

📖 Judgment answers for real violence, not pride

## 🎲 They Cast Lots For Her Honourable Men

Soldiers sometimes gambled over captives as part of claiming the spoils of war.

"Honourable men" means No's own respected leaders and officials.

Being reduced to a prize in a dice game stripped away all remaining status.

"Bound in chains" confirms even the city's most important men became prisoners.

No one in the city was too important to be taken.

🎲 Soldiers gambled over captured leaders

👑 Honourable men means respected officials

⛓️ Bound in chains means taken prisoner

➡️ No one was too important to fall

# Nahum 3:11-13
# 🍇 Fig Trees And Open Gates
---
## 🍷 Thou Also Shalt Be Drunken

"Drunken" here does not describe literal wine.

It describes being overwhelmed and disoriented by sudden disaster.

Nineveh had made other nations drink that same cup of disaster many times before.

Now Nahum says Nineveh itself will feel that same confusion and helplessness.

The empire that caused chaos elsewhere now loses its own balance.

🍷 Drunken means overwhelmed, not literal wine

🌀 It pictures disorientation from sudden disaster

🔄 Nineveh caused this in others before

📖 Now Nineveh loses its own balance

## 🙈 Thou Shalt Be Hid

"Hid" pictures Nineveh trying to disappear out of shame and fear.

"Seek strength because of the enemy" shows a desperate scramble for any remaining help.

This is a sharp reversal from the city's old, open confidence.

An empire that once paraded its conquests now wants to vanish instead.

Fear has replaced pride as the city's main instinct.

🙈 Hid means trying to disappear from shame

😰 A desperate scramble for remaining help

🔄 A sharp reversal from old confidence

➡️ Fear has replaced pride completely

## 🌳 All Thy Strong Holds Shall Be Like Fig Trees

"Firstripe figs" are figs that ripen earliest and fall from the tree easiest.

A light shake of the branch sends them dropping right away.

Nahum compares Nineveh's fortresses to that same easy, ready to fall fruit.

These were supposed to be the city's strongest defenses.

Instead they give way with almost no real effort.

🌳 Firstripe figs fall at the lightest shake

🏰 Strongholds compared to that easy fruit

💪 These were meant to be the strongest defenses

📖 They fall with almost no effort

## 🍇 They Shall Fall Into The Mouth Of The Eater

Nahum finishes the fig tree picture with one final image.

A shaken fig does not just fall to the ground.

It drops straight into the mouth of whoever is waiting to eat it.

Nineveh's fortresses will fall the same direct, effortless way into enemy hands.

There is no struggle described here at all, only an easy harvest.

🍇 A shaken fig falls straight to the eater

🏰 Fortresses fall the same direct way

🙌 Enemies receive them with no struggle

➡️ Victory comes as an easy harvest

## ⚔️ Thy People In The Midst Of Thee Are Women

In this culture, soldiers were expected to fight with courage and endurance.

Calling them "women" here is an old insult aimed at that expectation, not at women themselves.

It means Nineveh's own soldiers will lose their nerve and fighting spirit.

An army known for conquest will suddenly act helpless and afraid.

The city's defenders collapse from the inside before the enemy even arrives.

⚔️ Soldiers were expected to fight bravely

💔 The insult targets lost courage, not women

😨 It means the defenders will lose their nerve

📖 Defense collapses from the inside first

## 🚪 The Gates Of Thy Land Shall Be Set Wide Open

City gates were the single most important defense a city had.

A closed, guarded gate was the difference between safety and disaster.

"Set wide open" pictures that same gate with no guard and no resistance.

Enemies can simply walk in instead of fighting their way through.

The city's last line of defense gives up entirely.

🚪 Gates were a city's most important defense

🔓 Wide open means no guard, no resistance

🚶 Enemies can simply walk right in

➡️ The last line of defense gives up

## 🔒 The Fire Shall Devour Thy Bars

"Bars" were the heavy wooden or metal beams locking a city gate shut.

These bars were meant to be the final barrier an enemy could not force open.

Fire removes that barrier completely, without any need for a direct assault.

Even the parts built to resist force cannot resist flame.

Nothing about Nineveh's defenses survives this chapter intact.

🔒 Bars were the gate's final locking beams

🔥 Fire destroys them without a direct assault

🛡️ Even force resistant defenses cannot resist flame

📖 Nothing about Nineveh's defenses survives

# Nahum 3:14-15
# 🧱 Futile Preparations
---
## 💧 Draw Thee Waters For The Siege

This sounds like practical military advice at first.

Cities under siege needed large water reserves to survive a long blockade.

Nahum is not actually offering Nineveh useful help here.

The command is sarcastic, mocking a defense that will not work anyway.

Nineveh is being told to prepare for a fight it has already lost.

💧 Siege water was a real defensive need

🏰 Fortify means strengthen the defenses

😏 The command is sarcastic, not helpful

📖 Nineveh prepares for a fight already lost

## 🧱 Go Into Clay And Tread The Morter

"Morter" is an old spelling of mortar, the paste used to hold bricks together.

Workers trampled clay with their feet to prepare it for building.

"Make strong the brickkiln" means fire up the ovens that bake bricks hard.

Nahum pictures Nineveh scrambling to reinforce its walls brick by brick.

All of this labor still cannot stop what is coming.

🧱 Morter means mortar, the brick binding paste

🦶 Clay was trampled by foot to prepare it

🔥 Brickkiln means the ovens baking bricks

➡️ The labor cannot stop what is coming

## 🐛 It Shall Eat Thee Up Like The Cankerworm

A "cankerworm" is a locust in its young, crawling stage, known for stripping fields bare.

Fire and sword are compared to that same slow but total destruction.

A cankerworm does not destroy everything in one bite.

It simply keeps eating until nothing green is left standing.

Nineveh's end comes the same relentless way.

🐛 Cankerworm means a young, crop eating locust

🔥 Fire and sword compared to its damage

🌾 It strips everything bare eventually

📖 Nineveh's end comes the same relentless way

## 🦗 Make Thyself Many As The Locusts

Nahum dares Nineveh to multiply its numbers as high as it possibly can.

Locust swarms were famous for covering entire fields within a single day.

Even that kind of overwhelming number would not be enough to survive.

No amount of population or manpower changes the verdict already given.

Size was never going to be Nineveh's real problem.

🦗 Locust swarms covered whole fields fast

🔢 Nahum dares Nineveh to multiply its numbers

🚫 Numbers alone cannot change the verdict

➡️ Size was never Nineveh's real problem

# Nahum 3:16-17
# 🦗 Merchants And Locusts
---
## 🗺️ Thou Hast Multiplied Thy Merchants Above The Stars Of Heaven

Nineveh sat at the center of trade routes stretching across the ancient world.

"Above the stars of heaven" is a deliberate exaggeration meant to show sheer scale.

Merchants brought in enormous wealth from nations near and far.

All of that commercial reach is about to vanish along with everything else.

Trade power never once protected Nineveh from the judgment described in this chapter.

🗺️ Nineveh sat at major trade routes

⭐ Above the stars means a deliberate exaggeration

💰 Merchants brought enormous outside wealth

📖 Trade power could not stop this judgment

## 🐛 The Cankerworm Spoileth And Fleeth Away

Nahum returns to the locust picture introduced two verses earlier.

"Spoileth" means it strips and ruins whatever it touches.

"Fleeth away" means it does not linger once the damage is done.

A locust swarm leaves destruction behind and simply moves on.

Nineveh's own wealth and workforce are about to behave the exact same way.

🐛 Spoileth means it strips and ruins

💨 Fleeth away means it does not linger

🌾 Locusts leave damage, then move on

➡️ Nineveh's people will scatter the same way

## 👑 Thy Crowned Are As The Locusts

"Thy crowned" refers to Nineveh's royal officials and high ranking nobles.

"Great grasshoppers" is simply another name for the same locust image.

Comparing nobles to insects strips away all of their dignity and status.

People who once commanded armies and collected tribute get reduced to a swarm.

Status does not protect anyone from the coming collapse.

👑 Thy crowned means royal officials and nobles

🦗 Great grasshoppers repeats the locust image

📉 The comparison strips away their dignity

📖 Status cannot protect against this collapse

## ❄️ Their Place Is Not Known

Locusts cluster together for warmth on a cold day, easy to spot in one place.

Once the sun rises and warms the air, they scatter and disappear completely.

Nahum applies this exact behavior to Nineveh's officials and captains.

When the real crisis finally arrives, they will not be found standing together.

Leadership that looked solid simply evaporates the moment it is tested.

❄️ Locusts cluster together in the cold

☀️ Rising heat scatters them completely

👑 The same happens to Nineveh's leaders

➡️ Leadership evaporates the moment it is tested

# Nahum 3:18-19
# 😴 No One Left To Gather Them
---
## 🐑 Thy Shepherds Slumber O King Of Assyria

"Shepherds" is an old way of describing a nation's rulers and officials.

A real shepherd stays awake to protect the flock from danger.

"Slumber" means Nineveh's leaders have stopped doing that job entirely.

The king himself is named directly for the first time in the chapter.

Leadership failure is named as part of the city's downfall, not just outside attack.

🐑 Shepherds means the nation's rulers

😴 Slumber means they stopped protecting the people

👑 The king is named directly here

📖 Leadership failure is part of the downfall

## ⚰️ Thy Nobles Shall Dwell In The Dust

"Dust" is a common Old Testament picture for death and the grave.

"Dwell in the dust" means Nineveh's highest ranking officials will end up dead.

These were the men who once ruled alongside the king in comfort and power.

Their fall matches the fall of the shepherds in the line before.

No level of status survives what is coming for this city.

⚰️ Dust pictures death and the grave

👑 Nobles once ruled in comfort and power

🔁 Their fall matches the failed shepherds

➡️ No status survives what is coming

## 🏔️ No Man Gathereth Them

Nineveh's people end up scattered across the mountains outside the city.

A shepherd's whole job is to gather a scattered flock back together.

"No man gathereth them" means that job is simply not being done anymore.

The leaders who should be regathering the people are already gone or dead.

The nation is left leaderless at the exact moment it needs guidance most.

🏔️ The people are scattered across the mountains

🐑 Gathering a scattered flock was the shepherd's job

🚫 No one is left to do that job

📖 The nation needs guidance it lacks

## 🩹 There Is No Healing Of Thy Bruise

"Bruise" and "wound" both describe the damage this chapter has been describing in detail.

"No healing" means Nineveh is not being told to expect recovery this time.

Earlier threats in scripture sometimes come with a path back to restoration.

This one does not offer that path at all.

The judgment described here is meant to be final, not a passing crisis.

🩹 Bruise and wound picture Nineveh's damage

🚫 No healing means no expected recovery

⚠️ No path to restoration is offered

📖 This judgment is final, not temporary

## 📰 They Shall Clap The Hands Over Thee

"The bruit of thee" is an old phrase for the news or report about Nineveh's fall.

Clapping hands here is not applause out of joy or celebration.

It pictures people reacting with shock, almost mocking the news when they hear it.

Nations once terrified of Nineveh respond to its ruin without any sympathy.

There is no one left who feels sorry for what happened to this city.

📰 Bruit means the news or report

👏 Clapping here is shock, not celebration

😶 Nations react to the news without sympathy

➡️ No one is left who feels sorry

## ❓ Upon Whom Hath Not Thy Wickedness Passed Continually

Nahum ends the whole book with one final rhetorical question.

The expected answer is nobody, not a single nation escaped Assyria's cruelty.

"Continually" means this was not an occasional failure but a constant pattern.

Every earlier scene of burning cities and captive nobles answers this very question.

The book closes by making sure the reader understands why none of it was undeserved.

❓ The question expects nobody as the answer

🌍 No nation escaped Assyria's cruelty

🔁 Continually means this was a constant pattern

📖 The book answers why none was undeserved
`.trim();

export const NAHUM_THREE_PERSONAL_SECTIONS = parseNahumThreeRawNotes(NAHUM_THREE_RAW_NOTES);
