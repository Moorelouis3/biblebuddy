export type IsaiahThirtySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahThirtySevenRawNotes(rawText: string): IsaiahThirtySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahThirtySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+37:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 37 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+37:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+37:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 37 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 37,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 37:${startVerse}` : `Isaiah 37:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Isaiah 37 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_THIRTY_SEVEN_RAW_NOTES = `# Isaiah 37:1-4
# 😢 Hezekiah's Desperate Response
---
## ✂️ He Rent His Clothes

To rend means to tear something apart by force, usually cloth.

Hezekiah tears his own royal garments the moment he hears the Assyrian threat.

Kings in this culture tore their clothes only in the deepest kind of grief or shock.

This was not scripted diplomacy.

It was a raw, physical reaction to real fear.

✂️ Rent means torn apart by force

😢 Hezekiah tears his own royal robe

👑 Kings did this only in real grief

📖 Genuine fear drove a raw reaction

## 🐐 Covered Himself With Sackcloth

Sackcloth was a rough, uncomfortable fabric usually made from goat hair.

Wearing it was a public signal of mourning, humility, or repentance.

Hezekiah puts it on himself, not just his servants.

The king of Judah is showing Jerusalem that even he has no power left but prayer.

🐐 Sackcloth was rough goat hair cloth

😔 It signaled mourning and humility

👑 Hezekiah wore it himself not just others

📖 Even the king had nothing but prayer

## 🏛️ Went Into The House Of The LORD

Hezekiah does not go to his generals or his throne room first.

He goes straight to the temple in Jerusalem.

This was the same king who trusted God during earlier siege threats.

His first move in a national crisis is worship, not war planning.

🏛️ Hezekiah goes to the temple first

🙅 Not the throne room or war council

🙏 Worship comes before military planning

➡️ Crisis reveals where trust truly rests

## 🏰 Over The Household

Eliakim was the king's top household official, similar to a modern chief of staff.

He managed the palace and answered directly to Hezekiah.

Sending a leader this high in rank showed how serious the crisis really was.

This was not a minor errand.

🏰 Eliakim ran the entire royal household

🤝 He answered directly to the king

⚠️ His rank showed how serious this was

📖 A real crisis calls for real leaders

## 📜 Shebna The Scribe

A scribe in this era was a trained court secretary who handled official records and letters.

Shebna held real influence in the royal court.

Kings did not send low ranking messengers to Isaiah.

They sent the men who actually ran the kingdom.

📜 A scribe was a trained court secretary

🏛️ Shebna held real influence in court

🚫 No low ranking messengers were sent

📖 The men running the kingdom went instead

## 📛 Isaiah The Prophet The Son Of Amoz

Isaiah's father was named Amoz.

That name looks similar to the prophet Amos, but they are different people entirely.

Hezekiah's officials go straight to Isaiah for a word from God.

The king trusts the prophet's word over his own army's strength.

📛 Amoz was Isaiah's father not Amos

🔀 Amos and Amoz are different people

👤 Officials go straight to Isaiah himself

📖 The king trusts prophecy over military strength

## ⚠️ A Day Of Trouble, And Of Rebuke, And Of Blasphemy

Hezekiah names three different kinds of pain happening at once.

Trouble describes the danger itself, the army at the gates.

Rebuke describes the humiliation of being mocked by Assyria's messengers.

Blasphemy describes the deeper wound, an enemy insulting the living God.

All three are happening in the very same moment.

⚠️ Trouble means the danger at the gates

😳 Rebuke means public humiliation from Assyria

🗣️ Blasphemy means insults against the living God

📖 Three pains are striking at once

## 🤰 The Children Are Come To The Birth

This is a birth idiom, not a literal description of childbirth.

It pictures labor that has reached the final moment with no strength left to finish it.

Hezekiah is saying Judah has reached the point of crisis without the power to save itself.

The nation is fully committed to this moment and cannot turn back.

🤰 This pictures labor with no strength left

⚠️ Judah has reached a point of crisis

🚫 The nation cannot save itself alone

➡️ There is no turning back now

## 🎖️ The Words Of Rabshakeh

Rabshakeh is not a personal name.

It is the title for a high ranking Assyrian military official, something like a field commander.

This same officer already delivered a mocking speech outside Jerusalem's walls in the previous chapter.

Hezekiah hopes God will personally answer that insult.

🎖️ Rabshakeh is a military title not a name

🗣️ He mocked Jerusalem in the chapter before

🙏 Hezekiah hopes God answers the insult

📖 Titles do not intimidate the living God

## 🌱 Lift Up Thy Prayer For The Remnant That Is Left

A remnant is the surviving portion of a people after disaster strikes.

Judah had already watched other nations get wiped out completely by Assyria.

Hezekiah asks Isaiah to pray specifically for the people who are still alive.

This remnant theme returns again later in the chapter.

🌱 Remnant means the survivors left after disaster

💔 Other nations were already wiped out

🙏 Isaiah is asked to pray for survivors

📖 This remnant theme returns later

# Isaiah 37:5-7
# 🕊️ God's First Answer Through Isaiah
---
## 🗣️ Be Not Afraid Of The Words That Thou Hast Heard

God speaks straight past Hezekiah to comfort the servants who heard the threat firsthand.

Fear was the whole goal of Assyria's speech.

God addresses that fear directly and immediately.

The command to not be afraid comes before any explanation of what will happen next.

🗣️ God speaks directly to the frightened servants

😨 Fear was Assyria's entire goal

🛡️ God addresses that fear head on

➡️ Comfort comes before the full explanation

## 💨 I Will Send A Blast Upon Him

A blast here means a sudden, forceful act from God, not simply a gust of wind.

God is promising to strike Sennacherib's confidence directly.

This blast will not come through Judah's army at all.

It will come from God alone.

💨 Blast means a sudden forceful act of God

🎯 It targets Sennacherib's confidence directly

🚫 Judah's army plays no part in it

📖 God alone will strike this blow

## 📰 He Shall Hear A Rumour, And Return To His Own Land

A single rumor will be enough to send the entire Assyrian army home.

No battle is required for this part of the plan.

Verse nine later shows exactly what that rumor will be.

God can move a whole empire with a single report.

📰 A rumor alone will send Assyria home

🚫 No battle happens at this point

👀 Verse nine reveals what the rumor is

📖 God can move an empire with a report

## ⚔️ I Will Cause Him To Fall By The Sword In His Own Land

God names the exact ending of this story before it happens.

Sennacherib will not die in battle against Judah.

He will die at home, far from Jerusalem.

This exact promise comes true in the final verses of the chapter.

⚔️ God names the ending in advance

🏠 Sennacherib will die at home

🚫 He will not die fighting Judah

📖 This promise is fulfilled by the chapter's end

# Isaiah 37:8-13
# ⚔️ Sennacherib's Renewed Threat
---
## 🏰 Warring Against Libnah

Libnah was a fortified town in Judah's lowlands, one stop in Assyria's ongoing campaign.

Rabshakeh finds the king of Assyria has already moved to a new siege target.

The Assyrian war machine never really stopped moving during this whole conversation.

Hezekiah's crisis was unfolding while a much bigger war kept rolling on.

🏰 Libnah was a fortified town in Judah

🚶 Assyria had already moved to a new siege

⚔️ The larger war never paused

📖 Hezekiah's crisis sat inside a bigger war

## 🏙️ Departed From Lachish

Lachish was one of Judah's most important defensive cities, second only to Jerusalem.

Assyrian records and carved wall art still show Lachish's siege in vivid detail today.

The king of Assyria had already conquered it before moving to Libnah.

Judah's strongest cities were falling one after another.

🏙️ Lachish was one of Judah's key cities

🗿 Assyria's own art recorded this siege

📉 It had already fallen to Assyria

📖 Judah's defenses were collapsing city by city

## 👑 Tirhakah King Of Ethiopia

Tirhakah ruled over Cush, the ancient kingdom south of Egypt often called Ethiopia in the Bible.

Many historians identify him as a real pharaoh from Egypt's twenty fifth dynasty.

His approaching army is exactly the kind of rumor God promised back in verse seven.

The prophecy is already beginning to unfold.

👑 Tirhakah ruled ancient Cush near Egypt

📜 Historians identify him as a real pharaoh

📰 His approach matches the rumor from verse seven

📖 The prophecy starts unfolding here

## 🧠 Let Not Thy God, In Whom Thou Trustest, Deceive Thee

Sennacherib tries a new tactic here, attacking Hezekiah's faith directly instead of his army.

He suggests that trusting God is naive, even foolish.

This is psychological pressure aimed at Hezekiah's confidence, not a battlefield threat.

Fear works by making trust feel unreasonable.

🧠 Sennacherib attacks Hezekiah's faith this time

😏 He calls trusting God foolish

🎯 This is pressure on confidence not the battlefield

📖 Fear tries to make trust look unreasonable

## 💯 Destroying Them Utterly

Sennacherib lists his past conquests as proof that resistance never works.

Utterly means completely, leaving nothing standing.

He wants Hezekiah to assume Judah will end exactly the same way.

Past success does not guarantee the same outcome every time.

📋 Sennacherib lists his past conquests

💯 Utterly means completely destroyed

🔮 He assumes Judah will end the same

📖 Past victories do not guarantee the next one

## 🗺️ Gozan, And Haran, And Rezeph, And The Children Of Eden

These are real cities and regions that Assyria had already conquered in Mesopotamia.

Naming them by name was meant to sound overwhelming and hopeless.

Every name on this list is another warning aimed at Hezekiah.

A long list of victories can be intimidation dressed up as history.

🗺️ These were real conquered regions

📜 Naming them was meant to sound hopeless

⚠️ Every name warns Hezekiah personally

📖 A list of victories can still be intimidation

## 👑 The King Of Hamath, And The King Of Arphad

Hamath and Arphad were kingdoms in Syria that had already fallen to Assyria.

Naming their kings by title reminds Hezekiah that royal power did not save them.

A crown offered no protection against this empire.

Sennacherib wants Hezekiah to conclude that his own crown will not help either.

👑 Hamath and Arphad were fallen Syrian kingdoms

🏚️ Royal power did not save their kings

🚫 A crown gave them no protection

📖 Sennacherib implies Hezekiah's crown will fail too

## 🏙️ Sepharvaim, Hena, And Ivah

These final names complete Sennacherib's list of conquered cities.

The pattern by now is impossible to miss.

Every nation that trusted its own gods still fell to Assyria.

Sennacherib is building toward one final, dangerous claim about Judah's God.

🏙️ These names finish the conquered list

🔁 Every nation's gods failed to save it

📉 The pattern points toward one conclusion

📖 Sennacherib is building toward a dangerous claim

# Isaiah 37:14-20
# 🙏 Hezekiah's Prayer In The Temple
---
## 📜 Spread It Before The LORD

Hezekiah physically unrolls Sennacherib's threatening letter inside the temple.

This was not a private reading in his palace.

He lays the actual paper out in front of God, as if inviting God to read the insult firsthand.

Prayer here becomes a physical, visible act.

📜 Hezekiah spreads the letter before God

🏛️ This happens inside the temple itself

👀 He invites God to read the insult

📖 Prayer becomes something physical and visible

## 👼 That Dwellest Between The Cherubims

Cherubims refers to the carved angelic figures on top of the ark of the covenant.

Israelites understood that space as the LORD's throne on earth.

Hezekiah opens his prayer by naming exactly where God's presence dwells.

He is not praying to a distant, vague idea of God.

👼 Cherubims were carved figures on the ark

👑 That space was understood as God's throne

📍 Hezekiah names exactly where God dwells

📖 This is not a vague or distant God

## 🌍 Thou Hast Made Heaven And Earth

Before asking for anything, Hezekiah states who he is actually praying to.

The creator of everything is bigger than any single empire.

Assyria has only conquered part of what this God already made.

Hezekiah grounds his whole request in that comparison.

🌍 God is named as creator first

👑 Every empire is smaller than the creator

📏 Assyria only conquered part of creation

📖 The comparison grounds Hezekiah's whole prayer

## 📛 Hear All The Words Of Sennacherib

This is the first time this chapter names Sennacherib directly instead of using his title.

Hezekiah wants God to hear the actual insult, not just a summary.

Naming an enemy by name in prayer makes the request specific.

A vague prayer is easy to ignore.

📛 Sennacherib is finally named directly

👂 Hezekiah wants God to hear it exactly

🎯 Naming the enemy makes the prayer specific

📖 A specific prayer is harder to ignore

## ✅ The Kings Of Assyria Have Laid Waste All The Nations

Hezekiah does not deny Sennacherib's claims.

He admits the conquests actually happened.

Honest prayer does not need to pretend the danger is smaller than it is.

Facing the truth is the first step, not avoiding it.

✅ Hezekiah admits the conquests are real

🙅 He does not deny the danger

🗣️ Honest prayer does not hide the truth

📖 Facing reality comes before asking for help

## 🔥 Cast Their Gods Into The Fire

Conquered nations often burned or destroyed rival gods' idols after a victory.

Those objects were, in Hezekiah's own words, no gods, but the work of men's hands, wood and stone.

They were physical objects with no real power inside them.

Hezekiah is explaining exactly why those nations actually fell.

🔥 Enemy idols were often burned after victory

🪵 They were only wood and stone

🚫 They held no real power at all

📖 That explains why those nations truly fell

## 🌍 That All The Kingdoms Of The Earth May Know That Thou Art The LORD

Hezekiah's final request is not only for Judah's safety.

He asks that the whole world recognize the true God through this moment.

A private rescue would only prove Judah got lucky.

A public deliverance would prove something about God himself.

🌍 The request reaches beyond Judah alone

👀 Hezekiah wants the whole world to see

🍀 A private rescue would only look lucky

📖 A public deliverance proves who God is

# Isaiah 37:21-25
# 🎯 The LORD's Taunt Against Sennacherib
---
## 🎯 Whereas Thou Hast Prayed To Me Against Sennacherib

God answers the exact prayer Hezekiah just prayed, word for word.

This is not a generic promise sent out into the world.

It is a direct reply to one specific man's specific request.

Prayer in this chapter gets a personal, named answer.

🎯 God answers this exact prayer directly

🚫 This is not a generic promise

🗣️ One man's prayer gets a personal reply

📖 Prayer here receives a named answer

## 🏙️ The Virgin, The Daughter Of Zion, Hath Despised Thee

Daughter of Zion is a poetic way of describing the city of Jerusalem as a person.

Calling her a virgin pictures the city as untouched and unconquered.

The image now mocks Sennacherib back, using his own weapon against him.

Jerusalem, not Assyria, gets the last laugh.

🏙️ Daughter of Zion means Jerusalem itself

🛡️ Virgin pictures the city as unconquered

😏 The mockery now turns back on Sennacherib

📖 Jerusalem gets the final word here

## 🙅 Shaken Her Head At Thee

Shaking the head was an ancient gesture of scorn and mockery.

It is the same gesture used at someone who has completely embarrassed themselves.

Jerusalem, personified as a woman, mocks the mighty king of Assyria openly.

The empire that mocked Judah is now being mocked in return.

🙅 Shaking the head showed open scorn

😏 It mocks someone who embarrassed themselves

🏙️ Jerusalem mocks Assyria's king openly

📖 The mocker is now being mocked

## ❓ Whom Hast Thou Reproached And Blasphemed

God asks Sennacherib a direct question through this poem.

Sennacherib thought he was only insulting Hezekiah and his army.

The real target of every insult was the Holy One of Israel himself.

An attack on God's people is always an attack on God.

❓ God asks Sennacherib directly

🙅 He thought he only insulted Hezekiah

🎯 The real target was God himself

📖 Attacking God's people means attacking God

## 🌲 The Height Of His Border, And The Forest Of His Carmel

Sennacherib boasts about conquering the tall cedars of Lebanon and the forests of Carmel.

These were famous, beautiful natural landmarks, not military targets.

He is bragging that his power reaches even into nature itself.

Boasting this big is a warning sign of coming pride, not real strength.

🌲 He boasts of cutting Lebanon's cedars

🏔️ Carmel was a famous, beautiful forest

💪 He claims power over nature itself

📖 Huge boasts often signal coming pride

## 💧 I Have Digged, And Drunk Water

Sennacherib brags about digging wells even in enemy territory during sieges.

Ancient Assyrian kings often used this kind of exaggerated boasting in their own royal records.

Claiming to dry up rivers with his own feet was never meant literally.

It was propaganda designed to sound unstoppable.

💧 He brags about digging enemy wells

📜 Assyrian kings used this style of boasting

🚫 Drying rivers with his feet was not literal

📖 It was propaganda meant to sound unstoppable

# Isaiah 37:26-29
# 🪝 The LORD Puts A Hook In Sennacherib's Nose
---
## 🔄 Hast Thou Not Heard Long Ago, How I Have Done It

God reveals a stunning twist inside this poem.

Assyria's entire rise to power was planned by God long before Sennacherib was even born.

Sennacherib thought his empire was his own achievement.

It was actually a tool God had already decided to use.

🔄 God reveals a stunning twist here

📆 Assyria's rise was planned long ago

🙅 Sennacherib thought it was his own doing

📖 He was actually a tool God chose

## 🏠 As The Grass On The Housetops

Ancient roofs were flat and covered with a thin layer of packed dirt.

Seeds could sprout there, but with no deep soil the grass withered fast in the sun.

God compares Assyria's conquered nations to that same fragile, short lived grass.

Power that looks strong can still be fragile underneath.

🏠 Housetops were flat roofs with thin dirt

🌱 Grass there withered fast in the sun

😟 Conquered nations are compared to that grass

📖 Strength can hide real fragility

## 👁️ I Know Thy Abode, And Thy Going Out, And Thy Coming In

God tracks Sennacherib's every movement, coming and going alike.

Nothing about his travels or his plans is hidden from God.

Even his private rage is fully known, not just his public boasts.

There is no place a person's anger can hide from God's sight.

👁️ God tracks Sennacherib's every movement

🚶 Nothing about his travels is hidden

😤 Even his private rage is known

📖 No anger hides from God's sight

## 🪝 My Hook In Thy Nose, And My Bridle In Thy Lips

Ancient conquerors sometimes led captured kings with an actual hook through the nose.

A bridle is the strap used to steer a horse or mule by its mouth.

God says he will control Sennacherib the same way, like a captured animal.

The most feared king in the world is about to be led like livestock.

🪝 Conquerors literally used hooks on captives

🐴 A bridle steers an animal by the mouth

🎯 God will control Sennacherib the same way

📖 The feared king gets led like livestock

# Isaiah 37:30-32
# 🌱 The Sign Of The Remnant
---
## 🌾 Ye Shall Eat This Year Such As Groweth Of Itself

The siege had ruined Judah's normal planting and harvest cycle for that year.

God promises they will survive on whatever grows wild without being planted.

The second year works the same way, living off self grown crops again.

Only by the third year can farming return fully to normal.

🌾 The siege had ruined normal farming

🌱 Year one means living off wild growth

🔁 Year two repeats the same pattern

📖 Full farming returns only in year three

## 🌳 Take Root Downward, And Bear Fruit Upward

This is a farming picture used to describe a whole nation healing.

A plant needs strong roots before it can ever produce visible fruit.

Judah's recovery would start quietly, underground, before anyone could see it.

Visible blessing always follows invisible strength first.

🌳 This pictures a nation healing like a plant

🌱 Roots grow first, unseen underground

🍎 Fruit only comes after strong roots

📖 Visible blessing follows invisible strength

## 🔥 The Zeal Of The LORD Of Hosts Shall Do This

Zeal means a passionate, active commitment, not a distant wish.

This recovery will not happen because of Judah's own effort or cleverness.

The LORD of hosts pictures God commanding armies of angels, far greater than Assyria's forces.

God's own determination guarantees the outcome.

🔥 Zeal means passionate active commitment

🙅 This is not Judah's own achievement

⚔️ Lord of hosts pictures God's own armies

📖 God's determination guarantees this outcome

# Isaiah 37:33-35
# 🛡️ The Promise To Defend The City
---
## ⛏️ Nor Cast A Bank Against It

A bank here means a siege ramp, a large mound of earth built up against a city wall.

Armies used these ramps to reach over or break through fortified walls.

God promises Sennacherib will never even begin that kind of attack on Jerusalem.

The city will be spared the whole ordeal, not just rescued at the last moment.

⛏️ A bank meant a siege ramp of earth

🧱 Armies used ramps to break through walls

🚫 Sennacherib will never even start this attack

📖 Jerusalem is spared the entire ordeal

## 🛣️ By The Way That He Came, By The Same Shall He Return

God promises Sennacherib will retreat using the exact same road he arrived on.

This detail matters because it means no progress at all toward Jerusalem.

Total defeat, not a partial withdrawal, is what God is promising here.

The threat ends exactly where it started.

🛣️ He retreats on the same road he came

🚫 No progress toward Jerusalem is made

🏁 This is total defeat not a retreat

📖 The threat ends where it started

## 📛 For Mine Own Sake, And For My Servant David's Sake

God gives two separate reasons for defending Jerusalem.

The first reason protects God's own reputation among the nations.

The second reason honors the promise made generations earlier to David.

Neither reason depends on how faithful Judah had been recently.

📛 God protects his own reputation first

👑 The second reason honors David's promise

📜 A promise from generations earlier still stands

📖 Neither reason depends on Judah's recent record

# Isaiah 37:36-38
# ⚰️ The Fall Of Sennacherib
---
## 🔢 A Hundred And Fourscore And Five Thousand

Fourscore is an old way of saying eighty.

The full number adds up to one hundred and eighty five thousand soldiers.

This entire army dies in a single night, without a single arrow from Judah.

God fulfills the promise made all the way back in verse thirty three.

🔢 Fourscore is an old word for eighty

💀 One hundred eighty five thousand died

🌙 It happened in a single night

📖 This fulfills the promise from verse thirty three

## 🏙️ Sennacherib King Of Assyria Departed, And Went And Returned, And Dwelt At Nineveh

Nineveh was the capital city of the Assyrian empire.

Sennacherib retreats home exactly as God promised back in verse seven.

The rumor, the retreat, and the return all happen precisely as spoken.

A prophecy given at the very start of the chapter comes fully true by its end.

🏙️ Nineveh was Assyria's capital city

🔁 Sennacherib retreats exactly as promised

📰 The rumor from verse seven came true

📖 A whole prophecy closes out this chapter

## 🗿 Worshipping In The House Of Nisroch His God

Nisroch was a god Assyria worshipped, though little else is known about him today.

The most powerful king in the world dies while bowing to a false god.

The real God, whom he mocked all chapter long, outlives every idol Assyria ever built.

Worship offered to the wrong god could not protect him at all.

🗿 Nisroch was an Assyrian god

👑 A mocked king dies before his own idol

🙌 The true God outlives every false one

📖 Worship of the wrong god gives no protection

## 🗡️ Adrammelech And Sharezer His Sons Smote Him

Sennacherib is murdered by his own sons, not by a foreign enemy.

The killers escape to Armenia rather than facing justice at home.

Esarhaddon, another son, becomes king in his father's place.

The man who threatened Jerusalem dies at the hands of his own family.

🗡️ His own sons murder Sennacherib

🏃 The killers flee to Armenia

👑 Esarhaddon becomes the next king

📖 His own family ended what Judah could not`.trim();

export const ISAIAH_THIRTY_SEVEN_PERSONAL_SECTIONS = parseIsaiahThirtySevenRawNotes(ISAIAH_THIRTY_SEVEN_RAW_NOTES);
