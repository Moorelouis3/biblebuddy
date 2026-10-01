export type JeremiahFortyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFortyEightRawNotes(rawText: string): JeremiahFortyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFortyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+48:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 48 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+48:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+48:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 48 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 48,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 48:${startVerse}` : `Jeremiah 48:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 15) {
    throw new Error("Expected 15 Jeremiah 48 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FORTY_EIGHT_RAW_NOTES = `# Jeremiah 48:1-3
# 📯 The Fall Of Moab's Great Cities Begins
---
## 🏙️ Woe Unto Nebo

Nebo was a Moabite town named after a Babylonian god of writing and wisdom.

A whole city built around that god is now the one falling apart.

Mount Nebo nearby was also where Moses viewed the promised land before he died.

Naming the god right in the opening line shows whose power is about to fail.

🏙️ Nebo was named for a god

📜 The god of writing and wisdom

🏔️ Mount Nebo overlooks the promised land

📖 This city's god cannot save it

---
## 🏙️ Kiriathaim Is Confounded And Taken

"Kiriathaim" means the twin city or double city in the ancient language of the region.

The same place name shows up far earlier, listed among ancient peoples in Genesis fourteen.

A city old enough to appear that early in scripture is now being captured.

Even deep history offers no protection once judgment arrives.

🏙️ Kiriathaim means twin city

📜 Named in Genesis as an ancient place

⏳ History offers it no protection

📖 Old places fall under new judgment

---
## 🗣️ Come, And Let Us Cut It Off From Being A Nation

Heshbon's leaders plot the end of Moab as an independent nation entirely.

This is not a battle plan but a decision already made in someone's mind.

Moab had stood as a nation for centuries before this plot forms.

The threat here is not just defeat but complete erasure from the map.

🗣️ Heshbon plots Moab's total end

🧠 The decision is already made

🏳️ Moab had stood for centuries

📖 This threatens erasure, not just defeat

---
## 🕳️ A Voice Of Crying Shall Be From Horonaim

"Horonaim" likely means the two hollows or the two caves, based on its name.

A voice crying out from a place named for caves paints a vivid scene of echoing grief.

The sound of destruction is loud enough to be heard beyond the town itself.

Jeremiah often lets sound alone carry the weight of a disaster.

🕳️ Horonaim means two hollows or caves

😭 A voice cries out from there

🔊 Grief echoes beyond the town

📖 Sound alone carries the disaster's weight

# Jeremiah 48:4-6
# 😭 Moab's Children Cry As They Flee
---
## 👶 Her Little Ones Have Caused A Cry To Be Heard

The destruction is so total that even the youngest children are heard crying.

This is not soldiers crying out in battle but the sound of a whole family in panic.

A nation's disaster always falls hardest on those who cannot defend themselves.

Jeremiah makes sure the reader hears that cost directly.

👶 Even the youngest children cry out

⚔️ This is panic, not battle noise

🛡️ The weakest suffer the most

📖 Jeremiah names that cost plainly

---
## 🛤️ In The Going Up Of Luhith Continual Weeping

"Luhith" was a hillside road used by people fleeing upward out of Moab's lowlands.

Continual weeping means the crying did not stop for even a moment along that climb.

A whole line of refugees moving uphill, crying the entire way, pictures total despair.

The road itself becomes part of the tragedy.

🛤️ Luhith was an uphill escape road

😭 Continual means the weeping never stopped

🚶 Refugees cried the whole climb

📖 Even the road carries the grief

---
## 🏃 Flee, Save Your Lives

This is a direct command, not a suggestion offered gently.

Running away is the only wise option left once judgment has already been decided.

Clinging to a home or a city at this point would only cost a life.

Sometimes the most faithful response to disaster is simply to leave.

🏃 This command is urgent, not gentle

🧭 Fleeing is the only wise option

🏠 Staying would only cost a life

➡️ Leaving in time can be wisdom

---
## 🌾 Be Like The Heath In The Wilderness

A "heath" is a small, bare shrub that survives alone out in open desert land.

It has no one around it for shelter and nothing to rely on but itself.

Moab's people are told to picture themselves exactly that exposed and alone.

The image is meant to feel uncomfortable, not comforting.

🌾 A heath is a bare desert shrub

🏜️ It survives totally alone

👤 Moab is told to feel that exposed

➡️ The image is meant to unsettle

# Jeremiah 48:7-10
# ⚔️ Trust In Treasures Cannot Save
---
## 🏗️ Thou Hast Trusted In Thy Works And In Thy Treasures

Moab's confidence rested on what it had built and what it had stored up.

Neither effort nor wealth can stop an army or change God's decision to judge.

The same false confidence shows up throughout scripture in nations who trusted only themselves.

Security built on anything other than God eventually runs out.

🏗️ Moab trusted its own works

💰 Moab trusted its stored wealth

🛡️ Neither could stop this judgment

📖 Security without God eventually runs out

---
## 🗿 Chemosh Shall Go Forth Into Captivity

"Chemosh" was the chief god worshiped by the people of Moab.

A god being taken captive is a way of saying that god has no real power at all.

If Chemosh cannot protect himself, he certainly cannot protect his worshipers.

This line exposes the emptiness behind Moab's entire religious system.

🗿 Chemosh was Moab's chief god

⛓️ A captured god has no power

🙇 Chemosh cannot protect his own people

📖 This exposes an empty religion

---
## 🏙️ The Spoiler Shall Come Upon Every City

No city in Moab is promised safety, not even the largest or best defended.

"Spoiler" here means an invading force that strips a place of everything valuable.

This phrase already answers the hope that maybe one town might escape.

Total judgment leaves no exceptions.

🏙️ Every city faces the same threat

🗡️ A spoiler strips a place bare

🚫 No town is promised an exception

📖 This judgment leaves nothing untouched

---
## ⚔️ Cursed Be He That Keepeth Back His Sword From Blood

This difficult line is spoken about carrying out God's assigned judgment, not ordinary violence.

Someone had been given the task of executing that specific judgment.

Holding back out of pity was not allowed in this case.

"Deceitfully" means finishing only part of an assigned task.

It still gets reported as fully done.

God takes that half finished job as seriously as outright disobedience.

⚔️ This is about God's judgment, not ordinary violence

🧑‍⚖️ Someone was tasked with that judgment

🙅 Pity was not an excuse here

📖 A half finished task is still disobedience

# Jeremiah 48:11-13
# 🍷 Settled On His Lees
---
## 😌 Moab Hath Been At Ease From His Youth

Moab had never been forced through hardship the way Israel and other nations had.

"At ease" describes a long comfortable life without war or exile ever reaching it.

Comfort that never gets tested can quietly turn into pride.

That quiet pride is exactly what this chapter keeps exposing.

😌 Moab lived a long comfortable life

🕊️ No war or exile ever came

💤 Untested comfort breeds quiet pride

📖 This chapter keeps exposing that pride

---
## 🍷 Settled On His Lees

"Lees" are the thick sediment that settles at the bottom of a wine container.

Wine left resting on its lees too long grows heavy and stays exactly as it was.

Moab is pictured as wine that was never poured out or refined by hardship.

A life never disturbed can grow just as stagnant as that forgotten wine.

🍷 Lees are sediment at a wine barrel's bottom

⏳ Wine on lees grows heavy and stale

🚫 Moab was never poured out or refined

📖 An undisturbed life can grow stagnant too

---
## 🔄 Not Been Emptied From Vessel To Vessel

Wine makers regularly poured wine between containers to clear out the thick sediment.

That process, called racking, kept the wine fresh instead of letting it grow stale.

Moab had skipped that whole process entirely, in life as much as in wine.

Nothing ever forced Moab to change, examine itself, or grow.

🍷 Wine was poured between containers to clear sediment

🔄 That process kept wine fresh, not stale

🚫 Moab skipped that process in life too

📖 Nothing ever forced Moab to change

---
## 🗿 Moab Shall Be Ashamed Of Chemosh

Moab trusted Chemosh the same way Israel once trusted the golden calf set up at Bethel.

Both nations are about to discover their confidence was placed in something powerless.

Shame comes when a trusted thing finally fails in front of everyone.

False confidence always ends the same way, in public disappointment.

🗿 Moab trusted Chemosh completely

🐂 Israel once trusted Bethel's calf the same way

😳 Both confidences are about to fail

📖 False confidence always ends in public shame

# Jeremiah 48:14-17
# 💪 How Say Ye, We Are Mighty
---
## 🗣️ We Are Mighty And Strong Men For The War

This is Moab's own boast, quoted directly back at them.

Confidence in military strength was the exact thing about to be proven empty.

Jeremiah lets Moab's own words set up its own downfall.

Pride often sounds loudest right before it collapses.

🗣️ This is Moab's own boast

💪 Moab trusted its military strength

📉 That confidence is about to collapse

📖 Pride often sounds loudest before it falls

---
## 🎯 His Chosen Young Men Are Gone Down To The Slaughter

"Chosen young men" means the best trained soldiers Moab had, not ordinary conscripts.

Even the strongest part of the army could not escape this judgment.

"Gone down to the slaughter" is a blunt way of saying they will not survive.

Moab's greatest strength turns out to be no strength at all.

🎯 Chosen young men were the best soldiers

⚰️ Even the best could not escape

🗡️ Slaughter means they will not survive

📖 Moab's greatest strength fails completely

---
## ⏰ The Calamity Of Moab Is Near To Come

Jeremiah speaks of this disaster as something already decided and already close.

It is not a distant possibility but a near and certain arrival.

Prophets often describe judgment this way to press the urgency onto listeners.

Time to prepare or to repent is running out fast.

⏰ The disaster is already decided

🚶 It is near, not distant

📣 Prophets press urgency this way

➡️ Time to respond is running out

---
## 🦯 How Is The Strong Staff Broken

A "staff" and a "rod" picture something a nation leans on for support and strength.

Calling it strong and beautiful first makes its breaking feel even more shocking.

This cry of disbelief is meant to be said out loud by anyone who hears it.

What once held Moab up has now completely failed.

🦯 A staff pictures a nation's support

😲 Calling it strong makes the break shocking

🗣️ This cry invites a shared disbelief

📖 What held Moab up has failed

# Jeremiah 48:18-20
# 🏘️ Dibon And Aroer Are Warned
---
## 👧 Thou Daughter That Dost Inhabit Dibon

Cities are often spoken of as a "daughter" in Hebrew poetry, a tender and personal image.

Dibon was a major Moabite city, later famous for a stone inscription naming a Moabite king.

Calling a city a daughter makes its coming humiliation feel personal rather than distant.

Sitting "in thirst" pictures total loss, with nothing left to even drink.

👧 Cities get called a daughter in Hebrew poetry

🏙️ Dibon was a major Moabite city

📜 A later stone named a Moabite king there

📖 Sitting in thirst pictures total loss

---
## 👀 O Inhabitant Of Aroer, Stand By The Way, And Espy

Aroer sat near the Arnon river, right along Moab's northern border and its main road.

"Espy" means to watch carefully for approaching danger.

Anyone standing on that road would see refugees fleeing before the news ever arrived by word.

Watching the road itself becomes the first warning of disaster.

🏞️ Aroer sat on Moab's northern border

👀 Espy means watching carefully for danger

🛤️ Refugees would be seen before news arrived

📖 The road itself gives the first warning

---
## 📢 Tell Ye It In Arnon

The Arnon river marked the natural boundary of Moab's territory.

News of this disaster is meant to travel along that same border everyone already knew.

Spreading the news this way guarantees that no part of Moab stays unaware.

A disaster this size could never stay quiet for long.

🌊 Arnon marked Moab's natural border

📢 News travels along that same border

🗺️ No part of Moab stays unaware

📖 A disaster this size cannot stay quiet

# Jeremiah 48:21-24
# 🗺️ Judgment Spreads Across Every City
---
## 🌾 Judgment Is Come Upon The Plain Country

The "plain country" refers to the flat tableland that made up much of Moab's farmland.

Judgment does not stay limited to the famous cities already named earlier in the chapter.

Even the quiet farming towns feel the same disaster.

No region of Moab is left out of this list.

🌾 The plain country was Moab's farmland

🏙️ Judgment is not limited to famous cities

🚜 Even quiet farming towns are included

📖 No region of Moab is left out

---
## 🏘️ Upon Dibon, And Upon Nebo, And Upon Bethdiblathaim

This list names several smaller Moabite towns, most known today mainly from this very list.

Many of these same towns appear on an ancient Moabite stone inscription boasting about their own king's victories.

Naming each town individually makes the judgment feel personal rather than vague.

A place does not need to be famous to matter to God.

🏘️ This lists several smaller Moabite towns

📜 Some appear on an ancient Moabite inscription

🎯 Naming each town makes judgment personal

📖 A place need not be famous to matter

---
## 🗺️ All The Cities Of The Land Of Moab, Far Or Near

This closing phrase sums up the whole list just given, leaving out no exceptions.

"Far or near" means distance from the border offered no safety at all.

Hiding in a remote corner of the country would not have helped anyone.

The list was specific so that the completeness could not be missed.

🗺️ This phrase sums up the whole list

📏 Far or near means distance did not matter

🙅 A remote corner offered no safety

📖 The list proves nothing was missed

# Jeremiah 48:25-27
# 😆 Moab Made A Derision
---
## 🐂 The Horn Of Moab Is Cut Off

A "horn" is a common Old Testament picture of strength, like the horn of a powerful animal.

Cutting off a horn means stripping away that strength completely.

An arm being broken pictures the same loss in a different way.

Both images describe a nation that can no longer fight back.

🐂 A horn pictures an animal's strength

✂️ Cutting it off strips that strength away

💪 A broken arm pictures the same loss

📖 Moab can no longer fight back

---
## 🍷 Moab Also Shall Wallow In His Vomit

God tells Moab to be made drunk as a form of public humiliation, not literal punishment for drinking.

A drunk person loses control and becomes an object of mockery rather than respect.

"Wallow in his vomit" paints the most undignified picture possible of total collapse.

Pride that once stood tall ends up face down in disgrace.

🍷 Moab is made drunk as public humiliation

😵 A drunk person becomes an object of mockery

🤢 This pictures total, undignified collapse

📖 Tall pride ends up face down in disgrace

---
## 😏 Was Not Israel A Derision Unto Thee

Moab had once mocked Israel's own defeats and struggles in the past.

God now turns that same question back onto Moab directly.

"Derision" means being laughed at and mocked openly by others.

Whoever mocks another nation's downfall should expect the same mockery eventually.

😏 Moab once mocked Israel's struggles

🔄 God turns the same question back

😂 Derision means being openly mocked

📖 Mockery eventually returns to the mocker

# Jeremiah 48:28-30
# 🕊️ Be Like The Dove
---
## 🕊️ Dwell In The Rock, And Be Like The Dove

Doves in this region often nested in small crevices along steep rocky cliffs.

Those cliffside nests were nearly impossible for predators or enemies to reach.

Moab is told to abandon its cities and hide the same way those doves do.

The safest place left is no longer a city but a cliff.

🕊️ Doves nested in steep rocky crevices

🦅 Predators could barely reach those nests

🏙️ Moab is told to abandon its cities

📖 Safety now means a cliff, not a city

---
## 👀 His Loftiness, And His Arrogancy, And His Pride

Jeremiah stacks three different words that all describe the same core problem.

"Loftiness" pictures looking down on everyone else.

"Arrogancy" pictures demanding special treatment that is not deserved.

"Pride" names the root underneath both of those attitudes.

Piling up near synonyms like this says the problem could not be overstated.

👀 Loftiness means looking down on others

🙋 Arrogancy means demanding special treatment

🌱 Pride is the root of both

📖 Three words show this could not be overstated

---
## 👁️ I Know His Wrath, Saith The LORD

God says plainly that Moab's anger has not gone unnoticed, even from a distance.

Knowing about something and being intimidated by it are two very different things.

God is not afraid of Moab's fury, only aware of it.

Awareness without fear changes nothing about the coming judgment.

👁️ God already knows Moab's anger

😨 Knowing is not the same as fearing

🛡️ God is not intimidated by Moab

📖 This awareness does not change the judgment

---
## 🗣️ His Lies Shall Not So Effect It

Moab had boasted about its own strength throughout this whole chapter.

Those boasts are now called exactly what they are, lies.

No amount of confident talk can change what is actually about to happen.

Words were never going to be strong enough to stop this outcome.

🗣️ Moab's boasts are called lies here

💬 Confident talk cannot change what happens

🚫 Words cannot stop this outcome

📖 Reality always outlasts a boast

# Jeremiah 48:31-33
# 🍇 The Vine Of Sibmah
---
## 😭 Therefore Will I Howl For Moab

The voice speaking here shifts from pure anger into real grief.

God himself is described as howling, the same word used for Moab's own mourning earlier.

Judgment in this chapter is never delivered coldly or without feeling.

Even deserved judgment can still come with real sorrow attached.

😭 The tone shifts from anger to grief

🗣️ God is pictured howling here too

❄️ Judgment is never delivered coldly

📖 Deserved judgment can still carry sorrow

---
## 🍇 O Vine Of Sibmah, I Will Weep For Thee

Sibmah was a region in Moab famous for its productive vineyards.

Calling Moab a vine fits a place known across the ancient world for its wine.

Weeping over a vineyard pictures grief over everything that once made this land thrive.

Even its greatest pride becomes something to mourn.

🍇 Sibmah was known for its vineyards

🍷 Moab is pictured as that vine

😭 This grief covers everything that once thrived

📖 Even Moab's pride becomes mourned

---
## 🌊 Thy Plants Are Gone Over The Sea

Moab's vines were so well known that their grapes or wine reportedly reached as far as the sea.

Jazer, mentioned alongside Sibmah here, was another town linked to that same wine trade.

A trade network that once stretched for miles has now completely collapsed.

What once traveled far now reaches no one at all.

🌊 Moab's wine once reached the sea

🏘️ Jazer was another town in that trade

📉 That whole trade network has collapsed

📖 What once traveled far now reaches no one

---
## 🍇 None Shall Tread With Shouting

Treading grapes to make wine was normally a joyful, noisy community event.

Workers would shout and sing together while crushing grapes with their feet.

That joyful noise has been completely silenced in this picture of judgment.

A harvest festival has turned into total silence.

🍇 Treading grapes was usually a joyful event

🎉 Workers once shouted and sang together

🔇 That joyful noise is now silenced

📖 A festival has turned into silence

# Jeremiah 48:34-36
# 🎵 Mine Heart Sounds Like Pipes
---
## 🏙️ From The Cry Of Heshbon Even Unto Elealeh

Heshbon and Elealeh were neighboring cities close enough that a single loud cry could reach between them.

Naming both towns together shows how widely this cry of disaster spreads.

No single town suffers this alone.

The sound itself becomes a map of how far the disaster reaches.

🏙️ Heshbon and Elealeh sat close together

📢 One cry reaches from town to town

🗺️ No single town suffers alone

📖 Sound itself maps the disaster's reach

---
## 🐄 As An Heifer Of Three Years Old

A three year old heifer was at its strongest and loudest stage of life.

Comparing the cry of the people to that animal's loud bellow pictures a cry of raw, physical distress.

This is not quiet sadness but an overwhelming, uncontrolled sound of pain.

The comparison makes the grief feel almost animal in its intensity.

🐄 A three year heifer was at its strongest

📣 Its bellow pictures raw physical distress

😭 This cry is not quiet sadness

📖 The grief feels almost animal in force

---
## ⛰️ Him That Offereth In The High Places

"High places" were elevated outdoor shrines used across the ancient Near East for worship.

Moab used these sites to offer sacrifices and burn incense to Chemosh and other gods.

God announces that this entire religious system is about to be shut down completely.

Removing the worship itself matters as much as removing the nation's wealth.

⛰️ High places were elevated outdoor shrines

🔥 Moab offered sacrifices there to Chemosh

🛑 This whole system is being shut down

📖 Removing false worship matters as much as wealth

---
## 🎵 Mine Heart Shall Sound For Moab Like Pipes

"Pipes" here refers to simple reed instruments often played at funerals in this culture.

God compares his own heart to that mournful funeral sound over Moab's loss.

This is a strange and striking line, judgment paired with genuine divine grief.

Even the one carrying out the judgment still mourns what is lost.

🎵 Pipes were instruments played at funerals

💔 God compares his heart to that sound

⚖️ Judgment and grief appear together here

📖 Even God mourns what judgment destroys

# Jeremiah 48:37-39
# 💔 Lamentation Upon The Housetops
---
## 💇 Every Head Shall Be Bald, And Every Beard Clipped

Shaving the head and cutting the beard were common public mourning customs in this culture.

These were not accidents of fashion but deliberate signs of deep grief worn on the body.

Cutting the hands was another such custom, though it was one that God's law forbade for Israel.

Here it describes Moab's own grief, not something Israel is told to copy.

💇 Shaving the head showed public grief

🧔 Cutting the beard showed the same

✋ Cutting the hands was another mourning custom

📖 This describes Moab's grief, not Israel's

---
## 🏺 I Have Broken Moab Like A Vessel Wherein Is No Pleasure

A "vessel" here means a clay pot or jar used for everyday household purposes.

Once a clay pot cracks or breaks, nobody tries to repair it or keep using it.

It simply gets thrown away without a second thought.

That is exactly the kind of total, careless breaking God describes here.

🏺 A vessel means an everyday clay pot

💥 A broken pot gets no second thought

🗑️ It simply gets thrown away

📖 Moab is broken that same careless way

---
## 🏃 Moab Turned The Back With Shame

Turning the back in battle meant retreating instead of standing to fight.

In this culture, fleeing from a fight brought a deep sense of public shame.

Moab's own neighbors will now openly mock that retreat.

A nation that once boasted of its strength is left with nothing but embarrassment.

🏃 Turning the back meant retreating in battle

😳 Retreat brought public shame in this culture

😂 Neighbors now mock that retreat

📖 Boasted strength ends in embarrassment

# Jeremiah 48:40-42
# 🦅 He Shall Fly As An Eagle
---
## 🦅 He Shall Fly As An Eagle

An eagle swoops down on its prey suddenly, with almost no warning at all.

This same picture of a swift eagle shows up elsewhere in scripture describing fast, unstoppable armies.

Moab will not get time to prepare a defense before the attack arrives.

Speed itself becomes part of the terror.

🦅 Eagles attack suddenly, without warning

📖 Scripture often pictures armies as eagles

⏱️ Moab gets no time to prepare

➡️ Speed itself becomes part of the terror

---
## 🏰 Kerioth Is Taken, And The Strong Holds Are Surprised

Kerioth was likely one of Moab's most defended cities, mentioned specifically by name.

Strongholds are supposed to withstand an attack rather than fall to one by surprise.

Calling the capture a surprise means even Moab's best defenses were not ready.

If the strongest cities fall this easily, nowhere in Moab is actually safe.

🏰 Kerioth was one of Moab's defended cities

🛡️ Strongholds should resist, not fall by surprise

😮 Even the best defenses were not ready

📖 If strongholds fall, nowhere is safe

---
## 🤰 As The Heart Of A Woman In Her Pangs

Labor pain is sudden, intense, and impossible to escape once it begins.

This same comparison for sudden terror shows up often throughout the prophets.

Moab's soldiers, not just its civilians, are described feeling this same helpless fear.

Courage built on strength alone collapses the moment real fear arrives.

🤰 Labor pain pictures sudden, inescapable terror

📚 Prophets often use this same comparison

⚔️ Even soldiers feel this helpless fear

📖 Strength alone cannot hold off real fear

---
## 🏳️ Moab Shall Be Destroyed From Being A People

This is not only the loss of cities or land but the end of Moab as a distinct nation.

The reason is stated plainly, Moab exalted itself against the LORD.

Pride, named again here, turns out to be the real root cause behind all of this.

A whole people's identity disappears because of that one unchecked sin.

🏳️ This means Moab's end as a nation

❓ The reason given is pride against the LORD

🌱 Pride is named as the real root

📖 One unchecked sin ends a whole people's identity

# Jeremiah 48:43-45
# 🕳️ Fear, And The Pit, And The Snare
---
## 😨 Fear, And The Pit, And The Snare

These three words describe three separate ways a hunted animal gets caught.

Fear drives it to run blindly into danger.

A pit traps it completely by accident.

A snare catches it on purpose.

Stacking all three together means no safe direction is left to run.

😨 Fear drives an animal to run blindly

🕳️ A pit traps it by accident

🪤 A snare catches it on purpose

📖 No safe direction is left to run

---
## 🏃 He That Fleeth From The Fear Shall Fall Into The Pit

Jeremiah describes a trap that catches people no matter which way they turn.

Running from one danger leads straight into a second one waiting right behind it.

This kind of total, inescapable judgment appears often throughout the prophets.

There is no clever path around this one.

🏃 Running from one danger leads to another

🔁 Every path leads to the same trap

📚 Prophets often describe judgment this way

📖 No clever path leads around this

---
## 📅 The Year Of Their Visitation

"Visitation" here means an appointed time when God steps in to judge.

It is not a random disaster but a date already set and already arriving.

The same word describes God's appointed times of blessing elsewhere in scripture.

Here that same appointed attention brings judgment instead of favor.

📅 Visitation means God's appointed time to judge

🎯 This is scheduled, not random

🔄 The same word can describe blessing elsewhere

📖 Here it brings judgment, not favor

---
## 🔥 A Fire Shall Come Forth Out Of Heshbon

This exact image of fire from Heshbon echoes a much older victory song found in Numbers twenty one.

That older song celebrated Israel's defeat of Sihon, the Amorite king who once ruled from Heshbon.

Jeremiah reuses that ancient line to describe a brand new disaster centuries later.

History's judgments often echo earlier ones using the very same words.

🔥 Fire from Heshbon echoes an older song

📜 Numbers twenty one first used this image

👑 It once celebrated defeating King Sihon

📖 Old judgments often echo in new words

# Jeremiah 48:46-47
# 🌅 A Final Word Of Hope After Judgment
---
## 📯 Woe Be Unto Thee, O Moab

This final woe sums up everything the whole chapter has already said.

Chemosh's people are named specifically as those who now perish alongside their god.

Sons and daughters alike are taken away into captivity together.

No part of Moab's identity, not even its families, escapes untouched.

📯 This woe sums up the whole chapter

🗿 Chemosh's people perish with their god

👨‍👩‍👧 Sons and daughters go into captivity together

📖 No part of Moab escapes untouched

---
## 🌅 Yet Will I Bring Again The Captivity Of Moab In The Latter Days

After forty six verses of total judgment, this closing line turns toward restoration.

"Latter days" points toward a future time, left unspecified, still further down the road.

Several other judgment oracles in Jeremiah end with this same small window of hope.

Even the harshest judgment in this book never gets the very last word.

🌅 A note of hope closes this harsh chapter

⏳ Latter days points to an unspecified future

🔁 Other oracles in Jeremiah end this way

📖 Judgment never gets the very last word
`.trim();

export const JEREMIAH_FORTY_EIGHT_PERSONAL_SECTIONS = parseJeremiahFortyEightRawNotes(JEREMIAH_FORTY_EIGHT_RAW_NOTES);
