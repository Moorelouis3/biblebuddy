export type JeremiahFiftyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFiftyRawNotes(rawText: string): JeremiahFiftyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFiftyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+50:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 50 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+50:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+50:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 50 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 50,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 50:${startVerse}` : `Jeremiah 50:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 14) {
    throw new Error("Expected 14 Jeremiah 50 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FIFTY_RAW_NOTES = `# Jeremiah 50:1-3
# 👑 Babylon's Fall Declared
---
## 🏛️ Against Babylon And Against The Land Of The Chaldeans

Babylon was the empire, and the Chaldeans were the ruling people inside it.

Nebuchadnezzar and his family belonged to this Chaldean dynasty.

Jeremiah spent his whole ministry warning Judah that Babylon would conquer them.

Now the same prophet turns and speaks a word against Babylon itself.

🏛️ Babylon was the empire's name

👑 Chaldeans were its ruling people

📜 Jeremiah once warned Judah about them

📖 Now Babylon hears its own sentence

---
## 💔 Bel Is Confounded, Merodach Is Broken In Pieces

Bel was a title meaning lord, often used for Babylon's chief god.

Merodach is the Hebrew spelling of Marduk, the god Babylon worshiped above all others.

Confounded means thrown into shame and helplessness, not simply embarrassed.

A nation's gods falling apart in public was the clearest sign its power was over.

💔 Bel means lord, a god's title

🗿 Merodach is the god Marduk

😔 Confounded means shamed and helpless

📖 A fallen god meant a fallen nation

---
## 🧭 Out Of The North There Cometh Up A Nation

Many scholars identify this nation as the Medes and Persians under Cyrus.

Armies crossing into Mesopotamia usually came down through the north, even from a homeland further east.

That coalition actually conquered Babylon in 539 BC, just as this verse foretold.

No empire, however great, escapes the nation God raises against it.

🧭 North names the invasion route

👑 Many scholars point to Cyrus

📅 Babylon fell in 539 BC

📖 No empire escapes God's chosen nation

---
## 🏜️ None Shall Dwell Therein

Babylon was the most magnificent city in the ancient world at this time.

This verse promises that same city will end up completely empty.

Both people and animals are said to flee the land entirely.

The grandest capital on earth was never too great to become a wasteland.

🏜️ Babylon was the world's grandest city

🚫 This promises total emptiness

🐾 Even animals flee the land

📖 No capital is too great to fall

---
# Jeremiah 50:4-7
# 🐑 Israel's Lost Sheep Return
---
## 🤝 They And The Children Of Judah Together

Israel and Judah had split into two separate kingdoms generations earlier.

This verse pictures both kingdoms coming back together as one people again.

Going and weeping shows their return is marked by real sorrow over the past, not casual relief.

A divided people finally walks home side by side.

🤝 Israel and Judah had split apart

🚶 This pictures them reuniting

😢 Weeping shows real sorrow, not relief

📖 A divided people walks home together

---
## 🗺️ Ask The Way To Zion

Zion refers to the hill in Jerusalem where the temple once stood.

Asking the way pictures people who no longer remember the road home after years away.

Their faces are turned toward Zion before their feet even start moving.

The direction of the heart comes before the direction of the feet.

🗺️ Zion means Jerusalem's temple hill

❓ Asking shows they had forgotten the way

🧭 Their faces turn there first

📖 The heart turns before the feet move

---
## 📜 A Perpetual Covenant That Shall Not Be Forgotten

A covenant is a binding agreement, sealed with real commitment on both sides.

Perpetual means it will last forever, never needing to be renewed or replaced.

Israel's older covenant had been broken again and again by their own unfaithfulness.

This promise looks ahead to the lasting relationship with God that Jeremiah describes elsewhere in this book.

📜 Covenant means a binding agreement

⏳ Perpetual means it will last forever

💔 Their old covenant kept getting broken

📖 This points to a covenant that holds

---
## 🐑 My People Hath Been Lost Sheep

Sheep depend completely on a shepherd to find food, water, and safety.

Israel's own leaders are the shepherds blamed here for leading the people astray.

Restingplace pictures a safe pasture where a flock settles for the night.

A sheep led away from its resting place rarely finds the way back alone.

🐑 Sheep need a shepherd's guidance

👤 Bad leaders caused the wandering

🛌 Restingplace means a safe pasture

📖 A lost flock cannot find home alone

---
## ⚖️ We Offend Not

Babylon's claim here is that Israel's own sin excused their cruelty.

The habitation of justice is a name for God, the true source of all justice.

It was true that Israel had sinned, but that never gave Babylon the right to destroy them.

Being partly right about someone's guilt is not the same as being innocent yourself.

⚖️ Babylon blamed Israel's own sin

🏛️ Habitation of justice names God

❌ Israel's guilt did not excuse Babylon

📖 Pointing at guilt is not innocence

---
# Jeremiah 50:8-10
# 🐐 Flee Out Of Babylon
---
## 🚪 Remove Out Of The Midst Of Babylon

Many of God's people were living inside Babylon as exiles at this time.

This command warns them to leave the city before its coming judgment falls.

The same kind of warning appears again centuries later in the book of Revelation.

God's people are never meant to stay settled inside a city marked for judgment.

🚪 Exiles were living inside Babylon

⚠️ They are told to leave first

📖 Revelation repeats this same warning

➡️ God's people should not stay marked for judgment

---
## 🐐 Be As The He Goats Before The Flocks

He goats naturally walk out in front, leading the rest of the herd.

This pictures God's people leaving boldly and visibly, not sneaking out quietly.

Leaving in fear and hiding would only slow down their escape.

Obedience here meant walking out first, not waiting to see what happened.

🐐 He goats lead from the front

🚶 The exodus should be bold and visible

🙅 Hiding would only slow them down

📖 Obedience meant leaving first

---
## ⚔️ An Assembly Of Great Nations From The North Country

This assembly describes the combined Medo Persian force marching against Babylon.

Arrows as of a mighty expert man means skilled archers who rarely miss their mark.

None shall return in vain promises every arrow fired will accomplish its purpose.

A single empire once felt untouchable now faces a coalition built to finish the job.

⚔️ A combined army marches from the north

🏹 Expert archers rarely miss

🎯 No arrow fired is wasted

📖 One coalition finishes what Babylon could not stop

---
## 💰 Chaldea Shall Be A Spoil

Spoil means plunder, the goods and treasure taken from a defeated enemy.

Babylon had spent decades plundering other nations, Judah included.

Now that same nation becomes the one being plundered by others.

The empire that profited from conquest finally pays conquest's full price.

💰 Spoil means plunder taken in war

🏛️ Babylon once plundered other nations

🔄 Now Babylon becomes the plunder

📖 Conquest's profit becomes conquest's price

---
# Jeremiah 50:11-13
# 😈 Gloating Over God's Heritage
---
## 💔 Destroyers Of Mine Heritage

Heritage here means Israel, the people God claims as his own possession.

Babylon is called a destroyer for turning a tool of discipline into outright cruelty.

God had allowed Babylon to punish Judah, but never to gloat over its ruin.

Being used by God for a task is never the same as being approved for how it was done.

💔 Heritage means Israel, God's own people

🔨 Babylon turned discipline into cruelty

🚫 Being used is not being approved

📖 How the task was done still matters

---
## 🐂 Grown Fat As The Heifer At Grass

A heifer at grass is a well fed young cow with nothing left to want.

Bellowing like bulls pictures loud, confident boasting with no fear of consequence.

Babylon's prosperity had made the nation careless and proud rather than grateful.

Comfort without humility tends to grow louder right before it falls silent.

🐂 A fed heifer pictures full comfort

📢 Bellowing bulls picture loud pride

😤 Prosperity made Babylon careless

📖 Loud pride often comes right before silence

---
## 😔 Your Mother Shall Be Sore Confounded

Nations in this period were often pictured as a mother figure in poetry.

Mother here personifies Babylon itself, the city that birthed this empire's pride.

Sore confounded means thrown into deep, public shame, not minor embarrassment.

The hindermost of the nations means Babylon will fall to the very bottom of the list it once topped.

😔 Nations were pictured as mothers

🏙️ Mother here means Babylon itself

😳 Sore confounded means deep public shame

📖 The top nation falls to the bottom

---
## 😤 Hiss At All Her Plagues

Hissing in the ancient world was a gesture of scorn and mockery, not a literal sound.

Every traveler passing the ruined city would react this way without being told to.

Plagues here means the disasters and judgments that struck Babylon one after another.

A city once feared becomes a city people openly mock while walking by.

😤 Hissing meant scorn, not a literal sound

🚶 Every passing traveler reacts this way

⚡ Plagues means the disasters that struck Babylon

📖 A feared city becomes a mocked one

---
# Jeremiah 50:14-16
# 🏹 Put Yourselves In Array
---
## ⚔️ Put Yourselves In Array

Array is a military term for soldiers arranged in organized battle formation.

Spare no arrows means attack with full force, holding nothing back.

The reason given is direct, Babylon sinned against the LORD and now faces the consequence.

This is not a random raid, it is a planned and deliberate assault.

⚔️ Array means organized battle formation

🏹 Spare no arrows means full force

❌ The reason given is Babylon's own sin

📖 This attack is planned, not random

---
## 🤲 She Hath Given Her Hand

Giving one's hand was an ancient gesture of surrender, much like raising empty hands today.

Foundations fallen and walls thrown down describe the city's defenses physically collapsing.

A city famous for its massive walls could not keep them standing.

Surrender here comes only after the walls themselves have already given way.

🤲 Giving the hand means surrender

🧱 Foundations and walls are collapsing

🏙️ Famous walls could not hold

📖 Surrender follows after defenses fail

---
## ⚖️ As She Hath Done, Do Unto Her

This is the ancient principle of returning to someone exactly what they handed out.

Babylon had shown no mercy to the nations and cities it conquered.

Now that same measure is promised back to Babylon in full.

A nation's own pattern of cruelty becomes the pattern of its own judgment.

⚖️ This is measure for measure justice

🔨 Babylon showed conquered nations no mercy

🔄 That same measure returns to Babylon

📖 Cruelty becomes the pattern of judgment

---
## 🌾 Cut Off The Sower From Babylon

The sower plants seed, and the one with the sickle brings in the harvest.

Removing both means destroying the entire food supply, not just the army.

The oppressing sword forces farmers to abandon their fields and flee for their own land.

An empire can lose a war and still survive, but it cannot survive losing its harvest.

🌾 Sower and sickle mean the whole harvest

🚫 Removing both ends the food supply

🏃 Farmers flee rather than fight

📖 Losing the harvest threatens survival itself

---
# Jeremiah 50:17-20
# 🦁 Scattered Sheep Restored
---
## 🦁 Israel Is A Scattered Sheep

Lions in this image stand for the empires that have preyed on Israel one after another.

Assyria devoured Israel's northern kingdom first, generations before Babylon ever rose to power.

The same shepherd and sheep picture used earlier in the chapter returns here for Israel's own story.

Being hunted by more than one predator does not mean being forgotten by the shepherd.

🦁 Lions picture Israel's conquering empires

🏛️ Assyria struck first, long before Babylon

🐑 The same sheep image returns here

📖 Being hunted is not being forgotten

---
## 💀 This Nebuchadrezzar King Of Babylon Hath Broken His Bones

Nebuchadrezzar is simply an alternate spelling of Nebuchadnezzar, the same Babylonian king.

Breaking bones describes total, crushing defeat, far beyond an ordinary military loss.

God promises to punish this same king exactly as he once punished Assyria.

No king's cruelty, however total it felt to its victims, goes unanswered forever.

💀 Nebuchadrezzar and Nebuchadnezzar are the same king

🦴 Broken bones means total crushing defeat

⚖️ God promises Babylon faces Assyria's fate

📖 No king's cruelty goes unanswered forever

---
## 🌿 He Shall Feed On Carmel And Bashan

Carmel was a fertile mountain range famous for rich soil and abundant growth.

Bashan was a wide plain east of the Jordan known for well fed cattle.

Mount Ephraim and Gilead were equally fertile regions where Israel once thrived.

Naming these specific places promises a real, physical return to abundance, not a vague hope.

🌿 Carmel was known for rich soil

🐄 Bashan was known for fat cattle

🗺️ Ephraim and Gilead were fertile too

📖 This promises real abundance, not vague hope

---
## 🕊️ The Iniquity Of Israel Shall Be Sought For, And There Shall Be None

This does not promise Israel will somehow stop sinning altogether.

It promises forgiveness so complete that the guilt cannot be found even when searched for.

Jeremiah describes this same complete forgiveness again later in this book.

A pardon this thorough leaves no record behind to be dug back up.

🕊️ This is not sinlessness

🔍 It means forgiveness too complete to find

📜 Jeremiah repeats this promise elsewhere

📖 A true pardon leaves nothing to dig up

---
# Jeremiah 50:21-23
# 🔨 The Hammer Of The Whole Earth
---
## 🗺️ The Inhabitants Of Pekod

Merathaim is a name that sounds like the Hebrew words for double rebellion.

Pekod was a real region within Babylon whose name also echoes a Hebrew word for punishment.

Many scholars believe Jeremiah chose these names deliberately for their double meaning.

Even the place names in this judgment carry a message underneath them.

🗺️ Merathaim echoes double rebellion

📍 Pekod echoes a word for punishment

✍️ Many scholars see deliberate wordplay here

📖 Even the names carry a message

---
## 💥 A Sound Of Battle Is In The Land

This short line works like a drumbeat before the detailed charges that follow.

Great destruction announces the scale of what is coming without yet explaining why.

Jeremiah often uses a brief line like this to build tension before unpacking it.

Even one plain sentence earns its place when it sets the tone for what follows.

💥 This line works like a drumbeat

📏 It announces scale before detail

✍️ Jeremiah often builds tension this way

📖 Even a short line can set the tone

---
## 🔨 The Hammer Of The Whole Earth

A hammer that strikes the whole earth pictures Babylon's role as the great crusher of nations.

Babylon had used exactly that kind of force against Judah and many others.

Cut asunder and broken means that same hammer is now itself shattered beyond repair.

The tool God once used to discipline nations becomes a tool he discards once it turns to pride.

🔨 Babylon was the world's great hammer

🔧 It was built to crush nations

💔 Now that hammer lies broken itself

📖 A proud tool gets discarded

---
# Jeremiah 50:24-27
# 🪤 Caught In A Snare
---
## 🪤 I Have Laid A Snare For Thee

A snare is a hidden trap built to catch an animal that has no idea it is there.

Not aware shows Babylon walked straight into this judgment without seeing it coming.

Striving against the LORD names the real reason behind the trap, not bad luck.

The empire that trapped so many nations finally gets caught in a trap of its own.

🪤 A snare is a hidden trap

👀 Not aware means Babylon never saw it

❌ Their real crime was striving against God

📖 The trapper finally gets trapped

---
## 🏹 The LORD Hath Opened His Armoury

An armoury is a storehouse where weapons are kept ready for war.

This pictures God pulling out whatever force is needed to carry out his judgment.

The weapons here are not literal swords, but the nations God sends against Babylon.

Indignation names the settled, righteous anger behind this specific action, not a sudden outburst.

🏹 Armoury means a weapons storehouse

⚔️ The weapons are the nations God sends

🔥 Indignation means settled righteous anger

📖 God equips judgment like a general equips war

---
## 🧱 Cast Her Up As Heaps

Heaps pictures piles of rubble left after a city is leveled to the ground.

Opening her storehouses means every stockpile of wealth is exposed and taken.

Destroy her utterly, let nothing of her be left leaves no room for partial judgment.

A city built over centuries gets reduced to a landscape of broken piles.

🧱 Heaps means piles of rubble

💰 Storehouses are opened and taken

🚫 Nothing is left standing on purpose

📖 Centuries of building become piles in a day

---
## 🐂 Slay All Her Bullocks

Bullocks picture young, strong warriors, much like a sacrificial animal in its prime.

Slaughter language turns the defeat of soldiers into the image of a sacrifice.

Woe unto them marks this as a genuine lament, not a cold list of facts.

The time of their visitation means the exact appointed moment judgment finally lands.

🐂 Bullocks picture young strong warriors

🔪 Their defeat is pictured as sacrifice

😢 Woe shows this is real lament

📖 Visitation means the appointed moment has come

---
# Jeremiah 50:28-30
# 📯 Call The Archers
---
## 🏛️ The Vengeance Of His Temple

This phrase directly ties Babylon's punishment to its destruction of Solomon's temple years earlier.

Babylon had burned God's own house in Jerusalem when the city first fell.

This is not abstract revenge, it answers one specific act with one specific reckoning.

The fugitives fleeing Babylon carry this news back to Zion themselves.

🏛️ This recalls Babylon burning the temple

🔥 That destruction happened when Jerusalem fell

⚖️ This answers one act with one reckoning

📖 Fugitives carry the news back to Zion

---
## 🏹 Call Together The Archers Against Babylon

Babylon itself had once been famous for exactly this kind of overwhelming archery assault.

Now the same tactic gets turned back against the city that perfected it.

Let none thereof escape removes any chance of a partial or merciful defeat.

Recompense her according to her work ties the punishment directly to Babylon's own actions.

🏹 Babylon once used this same tactic

🔄 Now it is turned back on them

🚫 No escape is left open

📖 The punishment matches their own actions

---
## 👑 Against The Holy One Of Israel

Pride here is named as the root sin, not simply political ambition or greed.

The Holy One of Israel is a title for God that emphasizes his complete purity and separateness.

Babylon's arrogance was not just against a people, it was against God himself.

A nation can survive conquering others, but not survive standing proudly against its maker.

👑 Pride is named as the root sin

✨ Holy One stresses God's pure separateness

⚔️ Their arrogance targeted God, not just people

📖 No nation survives standing against its maker

---
# Jeremiah 50:31-34
# ⚖️ The Most Proud Brought Down
---
## 👑 O Thou Most Proud

God addresses Babylon directly here by its defining character flaw.

Naming pride as the title shows this is the main issue God is confronting.

Thy day is come means the appointed time of reckoning has finally arrived.

A nation known for many things gets remembered here for exactly one.

👑 God addresses Babylon's defining flaw

📛 Pride becomes the nation's title here

📅 Thy day is come has arrived

📖 One flaw defines the whole reckoning

---
## 🔥 None Shall Raise Him Up

This describes a fall with no recovery and no rescue coming afterward.

Kindling fire in his cities pictures total, lasting destruction rather than a temporary setback.

This stands in sharp contrast to the restoration promised to Israel earlier in the chapter.

The same chapter holds both a fall with no return and a return with no end.

🔥 This fall has no rescue coming

🏙️ Fire pictures lasting destruction

↩️ Israel's restoration contrasts sharply here

📖 One fall, one return, same chapter

---
## 🛡️ Their Redeemer Is Strong

Redeemer translates a Hebrew legal term for a close relative who buys back or defends family.

This same role appears in the story of Ruth, where Boaz acts as a kinsman redeemer.

LORD of hosts emphasizes God commands every army and power in existence.

Israel's captors held them fast, but a redeemer this strong cannot be held off forever.

🛡️ Redeemer means a family defender and rescuer

📜 Boaz plays this same role in Ruth

⚔️ LORD of hosts means commander of every power

📖 No captor can hold off this redeemer

---
## ⚖️ He Shall Throughly Plead Their Cause

Pleading a cause is courtroom language, picturing God as a defense advocate in court.

Throughly means completely, leaving no part of the case unaddressed.

Give rest to the land and disquiet Babylon shows one ruling doing both at once.

A single verdict can comfort the oppressed while unsettling the oppressor at the very same time.

⚖️ Pleading a cause is courtroom language

✅ Throughly means the case is fully handled

🌿 Rest comes to the land

📖 One verdict, comfort and unrest at once

---
# Jeremiah 50:35-38
# ⚔️ A Sword Upon Babylon
---
## 🗣️ A Sword Is Upon The Liars

Liars here most likely refers to Babylon's false prophets and diviners, not ordinary citizens.

Dote means to act foolish or senile, their counsel suddenly worthless when it matters most.

Babylon depended heavily on omens and diviners to guide major decisions.

A nation that trusted lies for guidance finds no guidance left when the crisis hits.

🗣️ Liars likely means false prophets

🤡 Dote means their counsel turns foolish

🔮 Babylon depended on omens and diviners

📖 Trusted lies offer no help in crisis

---
## 🌍 The Mingled People

Many scholars understand mingled people as foreign mercenaries serving inside Babylon's army.

An empire this large relied on soldiers from many conquered nations, not just native Babylonians.

Mixed loyalty troops tend to scatter fastest once real pressure hits.

Babylon's own strategy of using conquered peoples becomes a weakness in its final hour.

🌍 Mingled people means foreign mercenaries

🏛️ A large empire needed outside soldiers

💔 Mixed loyalty scatters under pressure

📖 Their own strategy becomes their weakness

---
## 😱 They Shall Become As Women

This is an ancient idiom describing soldiers who suddenly lose their courage, not a comment on anyone's worth.

Trained fighting men are pictured dropping their usual confidence in an instant.

The same kind of idiom appears elsewhere in Jeremiah to describe terrified armies.

Courage built on reputation alone tends to disappear the moment real danger arrives.

😱 This idiom means sudden lost courage

⚔️ Trained soldiers panic without warning

📜 Jeremiah uses this idiom elsewhere too

📖 Reputation built courage vanishes under real danger

---
## 💧 A Drought Is Upon Her Waters

Babylon depended on canals fed by the Euphrates River for both farming and trade.

Drying up those waters threatens the entire economic foundation of the empire.

Land of graven images names Babylon as a nation devoted to idol worship.

Mad upon their idols means their devotion had become obsessive rather than reasonable.

💧 Babylon depended on river canals

🌾 Drying water threatens the whole economy

🗿 Graven images means devoted idol worship

📖 Their devotion had turned obsessive

---
# Jeremiah 50:39-40
# 🦉 No More Inhabited Forever
---
## 🦉 The Wild Beasts Of The Desert

This pictures ruined cities becoming home only to wild, desert dwelling animals.

Owls dwelling there adds to the picture of an abandoned, haunted landscape.

This same formula is used for Edom's own judgment earlier in Jeremiah's prophecies.

No more inhabited forever means this emptiness was never meant to be temporary.

🦉 Ruins become home to wild animals

🏚️ Owls complete the haunted picture

🔁 Edom's judgment used this same formula

📖 This emptiness was never meant to be temporary

---
## 🔥 As God Overthrew Sodom And Gomorrah

Sodom and Gomorrah were cities destroyed so completely they became the Bible's clearest symbol of total judgment.

Comparing Babylon's fate to that destruction raises the stakes well beyond an ordinary military defeat.

No man abide, no son of man dwell therein means permanent, complete abandonment.

The world's greatest empire ends up compared to the most infamous ruins in scripture.

🔥 Sodom and Gomorrah mean total judgment

📈 This raises Babylon's fate beyond defeat

🚫 No man abide means permanent abandonment

📖 The greatest empire meets the most infamous ruin

---
# Jeremiah 50:41-43
# 😨 The King's Hands Wax Feeble
---
## 👑 Many Kings Shall Be Raised Up

This describes a broad coalition, not just one lone invading army.

Coasts of the earth stretches the picture across a wide, far reaching alliance.

Multiple kings joining together made this force far harder to resist than a single nation.

Babylon had grown used to standing alone at the top, unprepared for a united front.

👑 This pictures a broad coalition

🌍 Coasts of the earth means a wide alliance

🤝 Multiple kings made resistance harder

📖 Babylon never expected a united front

---
## 🌊 Their Voice Shall Roar Like The Sea

This simile describes the overwhelming noise of a massive army on the move.

A roaring sea is constant, loud, and impossible to ignore or silence.

Riding upon horses, set in array like a man to the battle pictures a disciplined, advancing force.

The sound alone announced this was no ordinary raid before a single arrow flew.

🌊 Roaring sea pictures overwhelming noise

📢 The noise is constant and impossible to ignore

🐎 Riders advance in disciplined order

📖 The sound itself announced what was coming

---
## 🏙️ O Daughter Of Babylon

Daughter was a common poetic title used for a city or nation, similar to daughter of Zion.

It personifies Babylon as a single figure facing this coming attack.

This same device is used throughout the prophets for cities on every side.

Calling an empire a daughter makes its coming fall feel personal rather than distant.

🏙️ Daughter is a poetic title for a city

👤 It personifies Babylon as one figure

📜 Prophets use this device often

📖 It makes the fall feel personal

---
## 😰 His Hands Waxed Feeble

Waxed feeble means grew weak, fitting since this same king once struck fear into every nation.

Anguish and pangs as of a woman in travail describe sudden, overwhelming pain and panic.

This exact kind of fear was promised earlier in the chapter to everyone who feared Babylon.

The king who caused that fear in others finally feels it himself.

😰 Waxed feeble means grew suddenly weak

😖 Pangs picture sudden overwhelming panic

🔄 This fear was promised earlier to Babylon's victims

📖 The one who caused fear now feels it

---
# Jeremiah 50:44-46
# 🦁 Who Is Like Me
---
## 🦁 Like A Lion From The Swelling Of Jordan

Swelling of Jordan refers to the thick brush and overgrown thickets along the riverbank.

This exact image and the questions that follow repeat Jeremiah's earlier oracle against Edom almost word for word.

Lions hiding in that dense cover once struck prey with no warning at all.

The same sudden, unstoppable attack promised to Edom now falls on Babylon, the far greater power.

🦁 Swelling of Jordan means riverside thickets

🔁 This repeats the Edom oracle closely

⚡ Lions struck prey without warning

📖 The same judgment reaches the greater power

---
## 🐑 That Shepherd That Will Stand Before Me

This final rhetorical question closes the shepherd and sheep theme used throughout the chapter.

No ruler, army, or counselor can argue against or reverse God's chosen plan.

The least of the flock shall draw them out shows even a small force is enough when God sends it.

The question is never really answered because no answer exists.

🐑 This closes the chapter's shepherd theme

🙅 No one can reverse God's plan

🐾 A small force succeeds if God sends it

📖 The question has no real answer

---
## 🌍 At The Noise Of The Taking Of Babylon

This final verse pictures the fall of the world's greatest superpower shaking every surrounding nation.

The earth is moved describes the scale of this event rippling far beyond Babylon's own borders.

A cry heard among the nations shows the whole ancient world takes notice at once.

Jeremiah closes this long oracle by reminding the reader that no empire's fall stays contained to itself.

🌍 The fall shakes every surrounding nation

📏 The earth moved shows the huge scale

📢 The whole ancient world takes notice

📖 No empire's fall stays contained to itself
`.trim();

export const JEREMIAH_FIFTY_PERSONAL_SECTIONS = parseJeremiahFiftyRawNotes(JEREMIAH_FIFTY_RAW_NOTES);
