export type PsalmsEightyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsEightyFourRawNotes(rawText: string): PsalmsEightyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsEightyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+84:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 84 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+84:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+84:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 84 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 84,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 84:${startVerse}` : `Psalms 84:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 84 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_EIGHTY_FOUR_RAW_NOTES = `# Psalms 84:1-3
# 🏠 Longing For God's House
---
## 😍 How Amiable Are Thy Tabernacles

"Amiable" means lovely, delightful, or worth loving deeply.

The psalmist is not describing a building he merely likes.

He is naming a place he loves with his whole heart.

"Tabernacles" is plural because it covers the whole tent complex, not one room.

The courts, the altar, and the holy place are all included in that love.

😍 Amiable means lovely and deeply loved
🏠 Tabernacles names the whole tent complex
🕍 Courts altar and holy place included
📖 The psalmist loves this whole dwelling

## 😩 My Soul Longeth, Yea, Even Fainteth

"Longeth" means to want something with deep, aching desire.

"Fainteth" pictures a body growing weak from that same desire.

The psalmist describes desire so strong it wears out his body.

This is not calm devotion.

It is desperate craving for God's presence.

😩 Longeth means deep aching desire
🥵 Fainteth pictures a body growing weak
❤️ Desire this strong affects the body
📖 This craving is for God himself

## 🗣️ My Heart And My Flesh Crieth Out For The Living God

"Crieth out" means calling aloud with urgent need.

Heart and flesh together mean the whole self is involved.

This is not just a mental wish.

The body itself aches for God's presence.

"Living God" sets God apart from lifeless idols.

The whole person wants a real and present God.

🗣️ Crieth out means urgent aloud calling
💓 Heart and flesh mean the whole self
🚫 Not merely a mental wish
📖 The whole person wants the living God

## 🐦 The Sparrow Hath Found An House, And The Swallow A Nest

This does not mean actual birds nested inside the altar itself.

The image pictures birds building nests near God's dwelling in total safety.

Even small sparrows found a home close to the temple courts.

The psalmist envies that access more than he envies any comfort.

If a bird can dwell that close to God, he wants to dwell there too.

🐦 Sparrows nested near the temple courts
🏡 The image pictures safety, not literal nesting
😢 The psalmist envies that closeness
📖 He wants nearness even a bird has

# Psalms 84:4-5
# 🙌 Blessed Are Those Who Dwell There
---
## 😊 Blessed Are They That Dwell In Thy House

"Blessed" means truly happy and favored by God.

The psalmist does not call visitors blessed.

He calls the ones who live there blessed.

Nearness to God is treated as the real reward.

😊 Blessed means truly happy and favored
🏠 Living there beats only visiting
🎯 Nearness itself is the reward
📖 God's presence is the highest blessing

## 🎶 They Will Be Still Praising Thee. Selah

"Still praising" means continuous praise that never really stops.

"Selah" is a musical or liturgical pause inserted for the reader.

Many scholars believe it signaled a moment to let the words sink in.

Here it follows a picture of endless worship inside God's house.

🎶 Still praising means worship that never stops
⏸️ Selah marks a pause for reflection
🎵 Many scholars believe it cued a rest
📖 Endless praise deserves a moment to absorb

## 💪 Blessed Is The Man Whose Strength Is In Thee

This does not describe a man who is strong on his own.

His strength comes from God, not from his own effort.

The blessing belongs to whoever depends on God as the source of strength.

That kind of trust changes where a person looks for help.

💪 Strength here comes from God, not self
🙏 Trusting God is the actual blessing
🔄 It changes where he looks for help
📖 Dependence on God is real strength

## 🛤️ In Whose Heart Are The Ways Of Them

"The ways of them" points to the actual roads pilgrims traveled to Jerusalem.

Some hearts are set on that journey even before the trip begins.

The psalmist is describing people whose whole focus is reaching God's house.

Their heart travels toward Jerusalem long before their feet do.

🛤️ The ways means literal pilgrim roads
🧭 Their hearts are set on the journey
👣 Feet follow where the heart already points
📖 Focus on reaching God starts in the heart

# Psalms 84:6-7
# 🚶 The Pilgrim's Road To Zion
---
## 🏜️ Who Passing Through The Valley Of Baca Make It A Well

"Baca" likely names a dry, thirsty valley, possibly meaning weeping.

Pilgrims had to cross this hard, waterless place on their way to Jerusalem.

Instead of just enduring it, they turn it into a source of water.

Hardship on the way to God can turn into a blessing for others.

🏜️ Baca likely means a dry weeping valley
🚶 Pilgrims had to cross this hard place
💧 They turn hardship into a well
📖 Hardship on the way can bless others

## 🌧️ The Rain Also Filleth The Pools

God adds his own provision on top of the pilgrims' effort.

The well they dug is not the end of the story.

Rain from heaven fills those same pools even fuller.

Human effort and God's provision work together on this journey.

🌧️ Rain adds provision beyond human effort
🕳️ The well was only the start
🤝 Human work and God's gift combine
📖 God provides more than pilgrims expect

## 📈 They Go From Strength To Strength

This does not mean the journey gradually wears them down.

Each stage of the trip actually leaves them stronger than before.

The road to God's house builds strength instead of draining it.

That is the opposite of what a hard journey usually produces.

📈 Strength increases instead of running out
🛣️ Each stage leaves them stronger
🔄 This journey reverses normal exhaustion
📖 Nearing God builds strength, not fatigue

## 🏙️ Every One Of Them In Zion Appeareth Before God

"Zion" names Jerusalem, and specifically the temple where God's presence dwelt.

"Appeareth before God" describes arriving for one of Israel's required yearly feasts.

The entire pilgrimage was aimed at this one moment of arrival.

Every difficult mile led toward standing in God's presence.

🏙️ Zion names Jerusalem and its temple
📅 This describes arriving for a yearly feast
🎯 The whole journey aimed at this moment
📖 Every hard mile led to God's presence

# Psalms 84:8-9
# 🙏 A Prayer For The King
---
## ⚔️ O LORD God Of Hosts, Hear My Prayer

"LORD of hosts" names God as commander over heaven's armies.

The psalmist appeals to God's full power, not just his kindness.

This prayer assumes God is strong enough to actually act.

Naming God this way is itself part of the request.

⚔️ Hosts names God's heavenly armies
💪 The appeal is to God's power
🙏 This prayer expects real action
📖 The name itself backs up the request

## 👤 Give Ear, O God Of Jacob. Selah

"God of Jacob" recalls the personal God of one family's history, not a distant deity.

Jacob wrestled with God and was changed by that encounter.

Calling on that same personal God grounds this prayer in real history.

"Selah" again pauses the song to let this appeal settle in.

👤 God of Jacob recalls one family's history
🤼 Jacob personally wrestled with this God
⏸️ Selah lets the appeal settle in
📖 History grounds this prayer in truth

## 🛡️ Behold, O God Our Shield

"Shield" pictures God as protection from every kind of attack.

"Behold" is a call for God to look and truly pay attention.

The psalmist is asking to be seen, not just protected.

Being noticed by God matters as much as being defended by him.

🛡️ Shield pictures complete protection
👀 Behold asks God to truly look
🙋 The psalmist wants to be seen
📖 Notice and protection both matter here

## 👑 Look Upon The Face Of Thine Anointed

"Thine anointed" refers to Israel's king, set apart for his role with oil.

The prayer for the nation is tied here to a prayer for its king.

A king's fortunes and the nation's fortunes were closely connected in that world.

Praying for God's presence includes praying for right leadership.

👑 Anointed names Israel's set apart king
🫒 Oil marked him for this role
🔗 The king and nation were connected
📖 Right leadership was part of this prayer

# Psalms 84:10-12
# 🚪 Better A Doorkeeper Than A King Elsewhere
---
## 📊 For A Day In Thy Courts Is Better Than A Thousand

This is a deliberate exaggeration meant to make a real point land hard.

One single day near God is worth more than a thousand days anywhere else.

The math is not meant to be taken literally.

The value of God's presence cannot really be measured in days at all.

📊 One day near God outweighs a thousand
🎯 This exaggeration makes the point land hard
🚫 The math is not meant literally
📖 God's presence cannot be measured in days

## 🚪 I Had Rather Be A Doorkeeper In The House Of My God

A "doorkeeper" held one of the lowest jobs in the temple, guarding the entrance.

The psalmist would rather hold that lowest job near God than a higher one elsewhere.

Status meant nothing next to nearness to God.

He is choosing proximity over prestige.

🚪 Doorkeeper was the lowest temple job
📉 He preferred the lowest job near God
🏆 Status meant nothing next to nearness
📖 He chose proximity over prestige

## ⛺ Than To Dwell In The Tents Of Wickedness

"Tents of wickedness" likely means comfortable dwellings among wicked and ungodly company.

The contrast is not poverty against wealth.

It is nearness to God against comfort without him.

Given that choice, the psalmist picks God every time.

⛺ Tents of wickedness means comfortable ungodly company
⚖️ The real contrast is nearness, not wealth
🙅 Comfort without God is not worth it
📖 Given the choice, he picks God

## ☀️ The LORD God Is A Sun And Shield

"Sun" pictures God as light, warmth, and life itself.

"Shield" pictures God as protection from harm.

God gives both what a person needs and what a person needs protecting from.

The same verse promises grace, glory, and no good thing withheld from the upright.

☀️ Sun pictures light warmth and life
🛡️ Shield pictures real protection
🎁 God gives grace and glory too
📖 Nothing good is withheld from the upright

## 🔁 O LORD Of Hosts, Blessed Is The Man That Trusteth In Thee

This final verse echoes the "blessed" refrain from verses four and five.

The psalm opened with longing for God's house.

It closes by naming trust in God as the real point.

Every desire to be near God rests on trusting him first.

🔁 This echoes the earlier blessed refrain
🏠 The psalm opened with longing for God's house
🤝 It closes by naming trust in God
📖 Trust is the root of every longing here`.trim();

export const PSALMS_EIGHTY_FOUR_PERSONAL_SECTIONS = parsePsalmsEightyFourRawNotes(PSALMS_EIGHTY_FOUR_RAW_NOTES);
