export type PsalmsNinetyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsNinetyOneRawNotes(rawText: string): PsalmsNinetyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsNinetyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+91:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 91 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+91:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+91:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 91 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 91,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 91:${startVerse}` : `Psalms 91:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 91 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_NINETY_ONE_RAW_NOTES = `# Psalms 91:1-2
# 🏠 The Secret Place Of The Most High
---
## 🏠 He That Dwelleth In The Secret Place

"Secret place" means a hidden, sheltered spot, not a location on a map.

It pictures the innermost room of a house.

The safest room, farthest from the door.

"The most High" names God as supreme over everything else.

To dwell there means staying, not just visiting during trouble.

Every promise in this psalm builds on that one word, dwelling.

🏠 Secret place means a hidden shelter
👑 The most High names God's supreme rule
🕰️ Dwelling means staying, not just visiting
📖 The whole psalm builds on that word

## 🌑 Under The Shadow Of The Almighty

"Shadow" pictures shade from something large enough to block the sun.

"The Almighty" names God's total power over any threat.

Shade only protects someone who stays under it.

Stepping into the sun cancels the very protection offered.

This verse asks for constant nearness, not one quick prayer.

🌑 Shadow means shade from something large
💪 The Almighty names God's total power
☀️ Shade only works if you stay under it
📖 This asks for nearness, not urgency

## 🏰 My Refuge And My Fortress

"Refuge" pictures a place someone runs to when danger is sudden.

"Fortress" pictures a strong, walled structure built for a longer siege.

The psalmist uses both words in the same breath.

One covers a sudden crisis.

The other covers a lasting one.

God is named as the answer to both.

🏃 Refuge means a place for sudden danger
🏰 Fortress means shelter for a longer siege
🎯 The psalmist pairs both words together
📖 God answers both sudden and lasting trouble

## 🙋 In Him Will I Trust

"My God" turns this into a personal claim, not a general statement.

"Trust" means resting your whole weight on something.

Think of leaning fully back into a chair.

Partial trust still braces for a fall.

This verse commits to full weight, not partial weight.

🙋 My God makes this personal
🪑 Trust means resting your whole weight
⚖️ Partial trust still braces for a fall
📖 This verse commits to full weight

# Psalms 91:3-6
# 🛡️ Covered Under His Wings
---
## 🪤 The Snare Of The Fowler

"Fowler" is an old word for someone who hunts birds.

A "snare" is the trap a fowler uses, often hidden from sight.

The verse promises deliverance from danger a person never saw coming.

Not just the danger that arrives in the open.

Protection here covers what is hidden as well as what is obvious.

🪤 Fowler means a bird hunter
🕸️ Snare means a hidden trap
👀 It covers danger you never saw coming
📖 Protection reaches hidden and open threats alike

## 🪶 He Shall Cover Thee With His Feathers

This verse borrows the picture of a mother bird sheltering her young.

"Feathers" and "wings" both point to that same image of close protection.

A chick under those wings cannot be reached by a predator above.

The picture is tender, not just powerful.

God's protection here is pictured as nearness, not distance.

🐦 The verse pictures a mother bird
🪶 Feathers and wings both mean shelter
🦅 A predator cannot reach what is covered
📖 Protection here means nearness, not distance

## 🛡️ His Truth Shall Be Thy Shield And Buckler

"Shield" pictures a large piece of armor that blocks a direct blow.

"Buckler" is a smaller shield, strapped to the arm for quick movement.

Naming both together pictures protection from every angle.

"Truth" is what does the protecting here, not a weapon.

God's own faithfulness becomes the armor a person carries.

🛡️ Shield means armor for a direct blow
🗡️ Buckler means a smaller, quicker shield
🔄 Both together mean protection from every angle
📖 God's own truth becomes the armor

## 🌙 Not Be Afraid For The Terror By Night

Night and day cover every hour a person might feel unsafe.

"Terror by night" points to fear that comes without warning during sleep.

"The arrow that flieth by day" points to danger a person can see coming.

The psalm promises the same confidence for both.

Neither the hidden fear nor the visible one gets the final word.

🌙 Terror by night means fear while sleeping
☀️ The arrow by day means visible danger
🕰️ Together they cover every hour
📖 Neither hidden nor visible fear wins

## 🦠 The Pestilence That Walketh In Darkness

"Pestilence" means a deadly, widespread disease.

"Walketh in darkness" pictures that disease spreading unseen.

This was not a distant, ancient fear.

It named one of the most real threats a person could face.

The psalm places even sickness under the promise already given.

🦠 Pestilence means widespread deadly disease
🌑 Walketh in darkness means spreading unseen
😰 This was a very real ancient fear
📖 Even sickness falls under this promise

## 💥 The Destruction That Wasteth At Noonday

"Wasteth" means to destroy completely, leaving nothing standing.

"At noonday" describes danger arriving in full daylight.

Darkness already covered the unseen threat two lines earlier.

Noonday now covers the threat nobody expects, since the sun is high.

Together, the two verses promise there is no hour left uncovered.

💥 Wasteth means complete destruction
☀️ Noonday means danger in broad daylight
🌗 Darkness and noonday now cover every hour
📖 No hour of the day is uncovered

# Psalms 91:7-10
# 🚧 Evil Shall Not Come Nigh
---
## ⚔️ A Thousand Shall Fall At Thy Side

This verse pictures a battlefield with catastrophic losses all around.

A thousand on one side, ten thousand on the other.

Both describe overwhelming danger nearby.

"Nigh thee" means close enough to touch.

This verse promises that danger never actually reaches him.

The promise is not that danger disappears from the world.

It is that danger can surround someone without ever touching them.

⚔️ The verse pictures overwhelming danger nearby
🔢 A thousand and ten thousand describe huge losses
🚧 Nigh thee means it never reaches him
📖 Danger can surround without ever touching

## 👁️ Only With Thine Eyes Shalt Thou Behold

This verse describes watching judgment fall on others from a place of safety.

"Behold" means witnessing something firsthand, not just hearing about it later.

"The reward of the wicked" points to consequences finally catching up.

The one who trusts God becomes a witness, not a casualty.

That is a very different place to stand.

👁️ Behold means witnessing something firsthand
⚖️ Reward of the wicked means consequences catching up
🙋 The faithful become witnesses, not casualties
📖 Safety changes what a person watches

## 🏠 Even The Most High, Thy Habitation

"Habitation" means a permanent home.

Making God a habitation is a choice, not something automatic.

The psalmist already named the LORD as refuge and fortress back in verse two.

This verse restates that same choice with a different word.

Everything promised after this verse depends on that one choice.

🏠 Habitation means a permanent home
🙋 Making God a home is a choice
🔁 It repeats the refuge and fortress promise
📖 Every later promise depends on that choice

## 🚧 There Shall No Evil Befall Thee

"Befall" means to happen to someone, often without warning.

This verse does not promise a world with no evil in it.

It promises that evil will not land on the one sheltered in God.

"Thy dwelling" ties this promise back to the habitation named one verse earlier.

The home itself is described here as fully protected.

⚡ Befall means happening to someone suddenly
🌍 Evil still exists elsewhere in the world
🏠 The dwelling itself stays protected
📖 Habitation and protection are tied together

# Psalms 91:11-13
# 🕊️ His Angels Charge Over Thee
---
## 📜 His Angels Charge Over Thee

"Charge" means a command, an assignment given with real authority.

God is not merely aware of the danger.

He is actively directing help toward it.

"To keep thee in all thy ways" means this protection covers ordinary daily life.

Angels appear here as messengers carrying out a specific order.

This protection is deliberate, not accidental.

📜 Charge means a command with real authority
🕊️ Angels carry out a specific order
🚶 All thy ways means ordinary daily life
📖 This protection is deliberate, not accidental

## 🪨 Lest Thou Dash Thy Foot Against A Stone

"Dash" means to strike suddenly and hard.

The danger named here is small, a single stone in the road.

Not an army and not a disease.

That contrast matters after two verses about massive threats.

God's care reaches down to the smallest possible danger too.

🦶 Dash means striking suddenly and hard
🪨 A stone is a small, ordinary danger
📏 It contrasts with the huge threats before it
📖 Nothing is too small for this promise

## 🐍 Thou Shalt Tread Upon The Lion And Adder

"Adder" is an old word for a venomous snake.

Lions and snakes were two of the deadliest threats a traveler could meet.

"Tread upon" pictures walking over them with total confidence.

Not fighting them in fear.

"The young lion and the dragon" repeats the same image with more intensity.

This verse promises authority over danger, not just survival of it.

🐍 Adder means a venomous snake
🦁 Lions and snakes were the deadliest threats
🚶 Tread upon means walking with confidence
📖 This promises authority, not just survival

# Psalms 91:14-16
# 🗣️ Because He Hath Set His Love
---
## 🔄 Because He Hath Set His Love Upon Me

The voice in this verse suddenly changes.

For thirteen verses, someone has been talking about God.

Starting here, God speaks directly.

"Set his love" describes a love placed on purpose, not felt by accident.

Everything promised from this point on comes straight from God's own mouth.

🔄 The speaker changes to God himself
🗣️ God now speaks in the first person
❤️ Set his love means love placed on purpose
📖 These promises come from God's own mouth

## ⬆️ I Will Set Him On High

"Set him on high" pictures lifting someone out of reach of danger below.

"Because he hath known my name" ties this promise to relationship, not performance.

Knowing God's name here means real, personal closeness.

Not just information about him.

The lifting up is a response to that closeness.

⬆️ Set on high means lifted out of danger
📛 Known my name means real closeness
🎁 The lifting responds to relationship
📖 This is not a reward for achievement

## 🤝 I Will Be With Him In Trouble

This verse does not promise a life with no trouble at all.

It promises presence inside the trouble when it comes.

"I will deliver him" and "honour him" both follow that promise of presence.

Deliverance and honor come after presence, not instead of it.

Presence is named first because it matters most.

🌩️ Trouble is not promised away entirely
🤝 Presence is promised inside the trouble
🏅 Deliverance and honor both follow presence
📖 Presence is named first because it matters most

## 🍽️ With Long Life Will I Satisfy Him

"Satisfy" means to fill completely, leaving nothing missing.

"Long life" closes the psalm with an ordinary, tangible blessing.

"Shew him my salvation" closes it with the largest blessing possible.

The psalm ends by pairing a daily gift with an eternal one.

Both come from the same voice that opened this psalm as a dwelling place.

🍽️ Satisfy means filled completely
📆 Long life is an ordinary blessing
✨ Salvation is the largest blessing possible
📖 Daily gifts and eternal ones come together
`.trim();

export const PSALMS_NINETY_ONE_PERSONAL_SECTIONS = parsePsalmsNinetyOneRawNotes(PSALMS_NINETY_ONE_RAW_NOTES);
