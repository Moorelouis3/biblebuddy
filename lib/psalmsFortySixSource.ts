export type PsalmsFortySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFortySixRawNotes(rawText: string): PsalmsFortySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFortySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+46:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 46 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+46:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+46:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 46 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 46,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 46:${startVerse}` : `Psalms 46:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 46 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FORTY_SIX_RAW_NOTES = `# Psalms 46:1-3
# 🛡️ God Is Our Refuge And Strength
---
## 🛡️ God Is Our Refuge And Strength

"Refuge" means a safe place to run to when danger comes.

The psalmist opens with two pictures for the same truth.

"Refuge" is where a person hides, "strength" is what carries them through the danger itself.

Ancient cities often built a fortress on a hill for exactly this purpose.

This psalm compares God to both the hiding place and the power to survive what happens next.

🛡️ Refuge means a safe hiding place
🦾 Strength means the power to endure
🏰 Ancient cities kept a hilltop fortress
📖 God is pictured as both together

## 👀 A Very Present Help In Trouble

"Present" here does not mean a gift.

It means near and available right now.

The psalmist is not describing a God who watches from a distance.

This help arrives exactly when trouble actually shows up.

Many other gods in the ancient world were pictured as distant and hard to reach.

This verse says the opposite about the true God.

👀 Present means near, not distant
⏰ Help arrives exactly when needed
🌍 Other ancient gods felt far off
📖 The true God is never absent

## 🌍 Though The Earth Be Removed

This is not a prediction that the earth will literally fall apart.

It is the biggest "what if" the poet can imagine.

"Removed" pictures solid ground giving way and disappearing completely.

Even if the most stable thing a person knows failed, the promise would still hold.

🌍 Not a real prediction about the earth
❓ It pictures the worst possible case
🏔️ Removed means solid ground giving way
📖 Total collapse could not shake this promise

## 🗻 Though The Mountains Be Carried Into The Midst Of The Sea

Mountains were the ancient world's picture of pure permanence.

No one imagined a mountain actually moving, let alone falling into the ocean.

"Midst of the sea" means the very center, the deepest and most chaotic part.

The poet picks the two most unshakable and most terrifying things he can name.

Even that combination could not shake the psalmist's confidence.

🗻 Mountains pictured total permanence
🌊 The sea pictured deep chaos
😱 This is the most extreme image possible
📖 Even this could not shake his confidence

## 🌊 Though The Waters Thereof Roar And Be Troubled

"Roar" pictures a violent, crashing storm at sea.

"Troubled" adds the picture of water churned into total chaos.

Ancient sailors feared the sea more than almost anything else in daily life.

The psalmist is now picturing the loudest, most chaotic version of that fear.

🌊 Roar pictures a violent storm
😨 Troubled means churned into chaos
⛵ Ancient sailors feared the sea deeply
📖 This is fear at its loudest

## ⏸️ Though The Mountains Shake With The Swelling Thereof Selah

"Swelling" pictures huge waves rising up against solid rock.

Even the mountains are now pictured shaking under that violence.

"Selah" is a musical or pause marker that likely told the original singers to stop and reflect.

No one knows its exact meaning today, but it invites the reader to pause here too.

🌊 Swelling means huge rising waves
🏔️ Even mountains are pictured shaking
⏸️ Selah likely marked a pause
📖 The reader is invited to pause too

# Psalms 46:4-7
# 💧 There Is A River
---
## 💧 There Is A River, The Streams Whereof Shall Make Glad The City Of God

Jerusalem never actually had a great river running through it like Babylon or Egypt did.

This verse pictures something the city never had in real life.

"The river" pictures God's own presence flowing through the city like water.

"Streams" pictures that presence reaching every part of the city with joy.

Other ancient capitals prized their real rivers as their source of life.

This city's true water source was God Himself.

🏙️ Jerusalem had no real great river
💧 The river pictures God's own presence
😊 Streams picture joy reaching everywhere
📖 God Himself was this city's true water

## 🏠 The Holy Place Of The Tabernacles Of The Most High

"Tabernacles" here means dwelling places, not the portable tent from the wilderness years.

"The Most High" is a title for God, naming Him as ruler above every other power.

This phrase names Jerusalem as the city where God chose to dwell with His people.

No enemy army could ever outrank the One who lives there.

🏠 Tabernacles means dwelling places here
👑 Most High names God's supreme rule
🏙️ Jerusalem is where God chose to dwell
📖 Nothing can outrank the One who lives there

## 🏙️ God Is In The Midst Of Her

"Her" refers to the city of God introduced in the line before this one.

God is not visiting the city, He is living inside it.

"She shall not be moved" ties directly back to the safety named at the start of the psalm.

The city's safety comes from who lives inside it, not from its walls.

🏙️ Her refers to the city of God
🏠 God lives inside the city itself
🔗 This ties back to the psalm's opening safety
📖 Safety comes from who lives inside

## ⏰ God Shall Help Her And That Right Early

"Right early" is an old way of saying very soon, without delay.

The help this psalm promises does not arrive late or only after disaster strikes.

Many ancient people pictured their gods as slow to respond or hard to reach.

This verse pictures the opposite kind of God, quick to act for His own people.

⏰ Right early means very soon
🚫 Help never arrives too late
🐌 Other gods were pictured as slow
📖 This God acts quickly for His people

## 😡 The Heathen Raged, The Kingdoms Were Moved

"Heathen" is an old word for the surrounding nations who did not worship the true God.

"Raged" pictures nations in a violent uproar, going to war against each other.

"Kingdoms were moved" repeats the exact word used for the city back in verse five, on purpose.

The city stands still while every kingdom around it shakes and falls.

🌍 Heathen means the surrounding nations
😡 Raged pictures violent national uproar
🔄 Moved echoes the city's stillness in verse five
📖 One city stands while kingdoms fall

## 🌋 He Uttered His Voice, The Earth Melted

The heathen raged with weapons and armies in the line just before this one.

God needs none of that, His voice alone is enough to act.

"The earth melted" pictures total, instant collapse of anything opposing Him.

No army could ever match power that strong.

⚔️ Nations raged with weapons and armies
🗣️ God's voice alone is enough
🌋 The earth melted pictures instant collapse
📖 No army can match this power

## ⚔️ The LORD Of Hosts Is With Us

"LORD of hosts" is a title picturing God as commander over every army in heaven and earth.

This is the first time this exact refrain appears in the psalm.

It answers every threat named so far, raging nations, melting earth, and shaking mountains.

No army on earth outranks the commander of heaven's own armies.

⚔️ Hosts means every army in heaven
👑 LORD of hosts names God's supreme command
🔁 This refrain answers every threat named
📖 No army outranks heaven's own commander

## 🔁 The God Of Jacob Is Our Refuge Selah

"The God of Jacob" ties this promise to the specific God who guided one flawed family.

Jacob was not a perfect man, yet God still bound Himself to him by name.

"Refuge" repeats the very first word of this entire psalm, on purpose.

"Selah" invites the reader to pause and let that full circle land.

👤 Jacob was one specific, flawed man
🤝 God bound Himself to Jacob by name
🔁 Refuge repeats the psalm's opening word
📖 Selah invites a pause to let it land

# Psalms 46:8-11
# ✋ Be Still, And Know That I Am God
---
## 👀 Come, Behold The Works Of The LORD

"Behold" means look closely, not just glance in passing.

The psalm shifts here from describing God to directly inviting the reader to watch Him act.

This same invitation could be spoken to the raging nations from the verses just before.

The reader is being called to slow down and actually see what happened.

👀 Behold means look closely, not glance
🔄 The psalm shifts to direct invitation
🌍 This invitation could reach raging nations too
📖 The reader is called to slow down

## 💥 What Desolations He Hath Made In The Earth

"Desolations" here means large scale ruin left behind after a battle.

This is not a picture of random disaster.

It is judgment aimed at ending violence itself.

The next verse explains exactly what this ruin looks like in practice.

God is described tearing down the very tools nations use to make war.

💥 Desolations means ruin left after battle
⚖️ This ruin is judgment, not accident
🎯 It aims at ending violence itself
📖 The next verse explains this ruin

## 🕊️ He Maketh Wars To Cease Unto The End Of The Earth

This is not a temporary ceasefire.

It is total war ending everywhere on earth.

"Unto the end of the earth" means this covers every nation, not just Israel.

The chaos described earlier in the psalm, raging heathen and shaking mountains, comes to a stop here.

God alone can promise an ending this complete.

🕊️ Not a pause, but a full ending
🌍 It reaches every nation on earth
🔇 The earlier chaos finally goes quiet
📖 Only God can promise this ending

## 🏹 He Breaketh The Bow, And Cutteth The Spear In Sunder

"In sunder" is an old way of saying something is snapped completely apart.

The bow and spear were two of the most common weapons in the ancient world.

Breaking a weapon in a culture built on constant warfare was a huge, public statement.

This is not soldiers laying weapons down.

It is God destroying them Himself.

🏹 In sunder means snapped completely apart
🗡️ Bow and spear were common ancient weapons
📢 Destroying weapons made a public statement
📖 God Himself destroys these weapons

## 🐎 He Burneth The Chariot In The Fire

Chariots were the most advanced and feared weapon of that entire era.

An army with chariots usually had a massive advantage over one without them.

Burning a chariot did not just disable it.

It destroyed something enemies depended on completely.

The verse moves from personal weapons to a nation's most powerful war machine.

🐎 Chariots were the era's most feared weapon
🔥 Burning destroyed it, not just disabled it
📈 Chariots gave armies a huge advantage
📖 Even the mightiest war machine falls here

## ✋ Be Still, And Know That I Am God

"Be still" is not a gentle invitation to relax.

It is a command to stop.

This line is spoken directly to the raging, warring nations from earlier in the psalm.

"Know" here means recognize and submit, not simply gain information.

God is not offering peace here.

He is declaring it and ordering everyone else to accept it.

✋ Be still means stop, not relax
🌍 This targets the raging nations directly
🧠 Know here means submit, not just learn
📖 God declares peace and commands it

## 🔁 I Will Be Exalted Among The Heathen, I Will Be Exalted In The Earth

This same sentence is said twice in a row on purpose.

Hebrew poetry often repeats one idea using two matching lines for emphasis.

"Among the heathen" and "in the earth" both mean the exact same scope, everyone everywhere.

By the end of the psalm, God's rule is no longer local.

It now covers the whole world.

🔁 The same line repeats on purpose
📜 Hebrew poetry often doubles for emphasis
🌍 Both phrases mean everyone everywhere
📖 God's rule covers the entire world

## 🔁 The LORD Of Hosts Is With Us The God Of Jacob Is Our Refuge

This exact sentence already closed the middle of the psalm.

Now it closes the whole psalm too.

A song built around a chorus repeats its most important line on purpose.

"Selah" appears here one final time, closing the psalm on that same pause.

The psalmist wants this truth to be the very last thing the reader remembers.

Whatever else happens in the world, this refuge never changes from verse to verse.

🔁 This is the psalm's final refrain
🎶 Songs repeat their most important line
⏸️ Selah marks the psalm's last pause
📖 The refuge never changes, verse to verse
`.trim();

export const PSALMS_FORTY_SIX_PERSONAL_SECTIONS = parsePsalmsFortySixRawNotes(PSALMS_FORTY_SIX_RAW_NOTES);
