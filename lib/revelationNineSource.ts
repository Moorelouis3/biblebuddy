export type RevelationNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationNineRawNotes(rawText: string): RevelationNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 9:${startVerse}` : `Revelation 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Revelation 9 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_NINE_RAW_NOTES = `# Revelation 9:1-3
# 🕳️ The Pit Is Opened
---
## ⭐ A Star Fall From Heaven Unto The Earth

This is not a literal rock falling from the sky.

In Revelation a star often pictures an angel or a spiritual being.

This star receives real authority over the pit below.

John is watching a being act, not a meteor.

⭐ Stars can picture angels, not rocks

🔑 This being receives real authority

👁️ John watches a being act, not a rock

📖 Authority, not nature, drives this judgment

## 🔒 The Key Of The Bottomless Pit

The bottomless pit is the prison that holds dangerous spirits until judgment.

A key means real control over who can get out.

This being was given the key.

It did not seize that key on its own.

Every act here still happens under God's permission.

🔒 The pit holds spirits until judgment

🗝️ A key means control over the door

✋ This being did not seize that key

📖 Every judgment still happens under God's permission

## 💨 There Arose A Smoke Out Of The Pit

Smoke pours out the moment the pit opens.

John compares it to the smoke of a huge furnace.

Think of thick black smoke rising from a burning building.

That smoke is so thick it blocks out the sun and the sky.

Darkness arrives before the locusts even appear.

💨 Smoke pours out the moment it opens

🔥 John compares it to a huge furnace

🌑 The smoke blocks the sun and the sky

📖 Darkness arrives before the locusts even appear

## 🦗 There Came Out Of The Smoke Locusts Upon The Earth

These locusts are not the normal insects that eat crops.

Egypt faced a literal locust plague in the book of Exodus.

Joel also pictured an invading army as a locust swarm.

These locusts act with purpose and carry real weapons.

This swarm is demonic, sent out to torment, not to eat.

🦗 These locusts are not normal crop eating insects

🇪🇬 Egypt once faced a real locust plague

⚔️ Joel pictured an army as locusts before this

📖 This swarm torments people instead of eating crops

# Revelation 9:4
# 🛡️ Marked For Protection
---
## 🌾 Should Not Hurt The Grass Of The Earth

The first four trumpets struck trees, grass, and water.

This judgment is commanded to leave plants alone completely.

The target has clearly shifted from nature to people.

That shift makes this trumpet feel far more personal.

🌾 Earlier trumpets struck trees, grass, and water

🚫 This judgment must leave every plant untouched

🎯 The target shifts from nature to people

📖 This trumpet feels far more personal

## 🔏 Which Have Not The Seal Of God In Their Foreheads

Revelation chapter seven already explained this seal.

God marked one hundred and forty four thousand people with it.

That seal protects them from this exact torment.

Everyone without that mark becomes a target here.

🔏 Chapter seven already explained this seal

✅ God marked a specific group with it

🛡️ That seal protects them from this torment

📖 Everyone without the mark becomes a target

# Revelation 9:5-6
# 😖 Torment Without Death
---
## 🗓️ They Should Be Tormented Five Months

Five months matches how long a real locust season usually lasts.

John ties a natural detail to a spiritual judgment.

The suffering has a set limit, not an endless length.

God still controls exactly how long this pain continues.

🗓️ Five months matches a real locust season

🔗 John ties nature to this judgment

⏳ The suffering has a clear limit

📖 God controls how long the pain lasts

## 🦂 Torment Was As The Torment Of A Scorpion

A scorpion sting burns badly but it rarely kills a person.

Think of the sudden sharp pain of a bad sting.

That pain lingers and keeps the victim miserable for hours.

This locust attack works the very same way on people.

🦂 A scorpion sting burns but rarely kills

⚡ Think of sudden sharp pain from a sting

😣 That pain lingers and keeps someone miserable

📖 This attack works the same way on people

## 💀 Men Seek Death, And Shall Not Find It

People in agony normally want relief, even through death.

Here that escape route is completely closed off.

Men will try to die and simply fail.

Even death itself refuses to come when it is wanted.

This judgment removes the one way out people always had.

💀 People in agony normally want relief through death

🚪 That escape route is completely closed here

😰 Men try to die and simply fail

📖 This judgment removes the one way out

# Revelation 9:7-10
# 🐴 The Shape Of The Locusts
---
## 🐴 Shapes Of The Locusts Were Like Unto Horses Prepared Unto Battle

John reaches for the most frightening image he knows, a battle horse.

The prophet Joel used this same comparison for an invading locust army.

A charging horse is fast, heavy, and impossible to stop.

These creatures carry that same unstoppable feel.

🐴 John compares them to battle horses

📜 Joel used this same comparison before

💨 A charging horse is fast and unstoppable

📖 These creatures carry that same feeling

## 👑 On Their Heads Were As It Were Crowns Like Gold

This is not a real crown of royal authority.

It only looks like gold from a distance.

The shape suggests victory without any true right to rule.

These locusts appear triumphant even though their power is borrowed.

👑 This is not a true royal crown

✨ It only looks like gold from afar

🏆 The shape suggests victory without real right

📖 Their power to rule is only borrowed

## 🧠 Their Faces Were As The Faces Of Men

A face like a man signals intelligence, not a mindless bug.

Something is thinking and choosing behind this attack.

These are not wild animals acting on pure instinct.

Real purpose drives every single part of this judgment.

🧠 A human face signals real intelligence

🎯 Something thinks and chooses behind this attack

🚫 These are not animals acting on instinct

📖 Purpose drives every part of this judgment

## 💇 They Had Hair As The Hair Of Women

Long flowing hair was unusual and striking on a warrior in this culture.

It added to the strange and unsettling look of these creatures.

Nothing about their appearance was meant to look normal.

Every detail was built to unsettle the person watching.

💇 Long hair was unusual on a warrior

😨 It added to the unsettling look

🚫 Nothing about them was meant to look normal

📖 Every detail was built to unsettle people

## 🦁 Their Teeth Were As The Teeth Of Lions

A lion's teeth are made for tearing, not for chewing softly.

This detail adds pure predatory danger to the picture.

The strange hair made them unsettling, the teeth made them deadly.

Beauty and danger sit side by side in this creature.

🦁 Lion teeth are made for tearing

⚠️ This detail adds pure predatory danger

🔀 Strange hair and deadly teeth sit together

📖 Beauty and danger mix in this creature

## 🛡️ They Had Breastplates, As It Were Breastplates Of Iron

A breastplate is armor worn over the chest in battle.

Iron armor makes a soldier nearly impossible to wound.

These locusts cannot be stopped or killed by normal weapons.

People have no real way to fight back against them.

🛡️ A breastplate is chest armor for battle

⚙️ Iron armor is nearly impossible to wound

🚫 These locusts cannot be stopped by weapons

📖 People have no real way to fight back

## 📯 The Sound Of Their Wings Was As The Sound Of Chariots

A chariot army charging together made a huge roaring sound.

That same deafening roar comes from millions of locust wings.

People would hear this army coming long before they saw it.

Dread builds in the sound before the attack even starts.

📯 A chariot charge made a roaring sound

🦗 Millions of wings make that same roar

👂 People hear this army before they see it

📖 Dread builds in the sound before the attack

## 🦂 Tails Like Unto Scorpions, And There Were Stings In Their Tails

The weapon is not in their mouths at all.

It is hidden in their tails instead.

This matches the torment already described earlier in the chapter.

Their power to hurt lasts the same five months already named.

🦂 The weapon sits in their tails

🔁 This matches the torment named earlier

⏳ Their power to hurt lasts five months

📖 Every detail points back to that first warning

# Revelation 9:11
# 👑 Their King Named
---
## 👑 They Had A King Over Them, Which Is The Angel Of The Bottomless Pit

This locust army is not acting without any order or control.

One ruling angel commands every single creature in this swarm.

Even hostile spiritual forces answer to real structure and order.

Nothing about this invasion happens by pure accident.

👑 One angel commands this entire swarm

📐 Even hostile forces follow real structure

🎯 Nothing here happens by accident

📖 Order rules even this terrifying invasion

## 🔤 Whose Name In The Hebrew Tongue Is Abaddon

Abaddon is a Hebrew word meaning destruction or ruin.

The Old Testament already used this word for the realm of the dead.

Giving this ruler that name describes exactly what he does.

His entire identity is built around tearing things apart.

🔤 Abaddon means destruction or ruin in Hebrew

📜 The Old Testament used this word before

🎭 This name describes exactly what he does

📖 His whole identity centers on tearing things apart

## 🔤 In The Greek Tongue Hath His Name Apollyon

Apollyon is a Greek word meaning destroyer.

It sounds very close to Apollo, a Greek god of that era.

Some readers in John's day worshiped Apollo as a god of light and healing.

John may be mocking that god by naming this destroyer so similarly.

🔤 Apollyon means destroyer in Greek

🏛️ The name sounds close to the god Apollo

😏 John may be mocking that false god

📖 This destroyer borrows a false god's name

# Revelation 9:12
# ⚠️ One Woe Down
---
## 🥇 One Woe Is Past And Behold Two Woes More Hereafter

An angel already promised three woes before these trumpets began.

The fifth trumpet and its locusts counted as the first woe.

This verse confirms that woe has now finished.

Two more and far worse judgments are still coming.

🥇 The first woe was already promised

🦗 The locust trumpet counted as that woe

⏭️ This woe has now finished

📖 Two worse judgments are still coming

# Revelation 9:13-15
# 🔓 Four Angels Loosed
---
## 🎺 The Sixth Angel Sounded

Each trumpet angel has sounded one at a time so far.

This is the second to last trumpet in the series.

Only one trumpet remains after this one sounds.

The judgments are clearly building toward a final end.

🎺 Each trumpet sounds one at a time

🔢 This is the second to last trumpet

⏭️ Only one trumpet remains after this

📖 These judgments build toward a final end

## 📐 A Voice From The Four Horns Of The Golden Altar

The horns are the raised corners found at each edge of the altar.

This is the exact same golden altar already shown back in chapter eight.

That altar is the place where the prayers of God's people rise up.

This next command comes directly from the place of prayer itself.

📐 Horns are the raised corners of the altar

🔁 This is the same altar from chapter eight

🙏 Prayers rise up from that very altar

📖 This command comes from the place of prayer

## 🌊 Loose The Four Angels Which Are Bound In The Great River Euphrates

The Euphrates was the eastern border of the ancient promised land.

Israel's worst invaders, Assyria and Babylon, both came from beyond that river.

These four angels have been held back there until this exact moment.

An old and familiar source of danger is now set loose again.

🌊 The Euphrates marked Israel's eastern border

⚔️ Assyria and Babylon invaded from beyond that river

🔓 These angels are held there until this moment

📖 An old danger is now set loose again

## ⏰ Prepared For An Hour, And A Day, And A Month, And A Year

This does not describe one long stretch of time added together.

It names a single, exact, and fixed appointed moment.

God has already set the precise point when this begins.

Nothing here is left loose, random, or open ended.

⏰ This is not one long added time span

🎯 It names one exact appointed moment

📅 God already set the precise timing

📖 Nothing here is random or open ended

## 🌪️ For To Slay The Third Part Of Men

Earlier trumpets damaged nature and tormented people without killing them.

This trumpet finally crosses into mass human death.

A third part of all people on earth will die here.

The judgments keep escalating instead of staying the same.

🌪️ Earlier trumpets harmed nature, not people

💀 This trumpet finally brings mass death

🔢 A third of all people will die

📖 Each judgment escalates beyond the last one

# Revelation 9:16-19
# 🐎 The Army From The East
---
## 🔢 The Number Of The Army Of The Horsemen Were Two Hundred Thousand Thousand

Two hundred thousand thousand equals two hundred million in plain numbers.

No ancient army on earth ever came close to that size.

A number this large signals something beyond any ordinary war.

This is a spiritual force, not a human nation's military.

🔢 Two hundred thousand thousand equals two hundred million

🌍 No ancient army came close to that size

⚠️ A number this large signals something unusual

📖 This is spiritual, not a human army

## 💎 Having Breastplates Of Fire, And Of Jacinth, And Brimstone

Jacinth is a deep blue gemstone known in the ancient world.

Brimstone is another word for sulfur, a yellow burning mineral.

Fire, blue jacinth, and yellow brimstone together paint a vivid and frightening color.

That same color scheme returns a moment later as literal weapons.

💎 Jacinth is a deep blue gemstone

🟡 Brimstone is another word for sulfur

🎨 These colors paint a vivid frightening picture

📖 The same colors return later as weapons

## 🦁 The Heads Of The Horses Were As The Heads Of Lions

The locusts earlier had faces like lions' teeth for danger.

Now entire horse heads are shaped like a lion's head.

Both pictures reach for the same predator to show terror.

John keeps returning to the lion as a symbol of raw power.

🦁 Earlier locusts already had lion like teeth

🐎 Now whole horse heads look like lions

🔁 Both pictures use the same predator image

📖 The lion keeps standing for raw power

## 🔥 Out Of Their Mouths Issued Fire And Smoke And Brimstone

The horse's own mouth is the actual weapon here.

Fire, smoke, and brimstone pour out with every breath.

No rider needs to swing a sword or throw a spear.

The creature itself carries total destruction inside its body.

🔥 The horse's mouth is the real weapon

💨 Fire, smoke, and brimstone pour out together

🗡️ No rider needs a sword or spear

📖 The creature itself carries total destruction

## 🔥 By These Three Was The Third Part Of Men Killed

Fire, smoke, and brimstone together cause this trumpet's death toll.

This is the same third part named back in verse fifteen.

The sixth trumpet now explains exactly how that death happens.

A plan announced earlier is now being carried out in detail.

🔥 Fire, smoke, and brimstone cause this death toll

🔗 This matches the third part named earlier

🎺 The sixth trumpet explains how it happens

📖 An earlier plan is now carried out

## 🐍 Their Power Is In Their Mouth, And In Their Tails

This verse adds one more detail about these horses' tails.

Their tails are shaped like serpents, complete with heads of their own.

Danger comes at a person from the front and from behind.

There is no safe side to stand on near this army.

🐍 Their tails are shaped like serpents

↔️ Danger comes from the front and the back

🚫 There is no safe side near this army

📖 This creature attacks from every direction

# Revelation 9:20-21
# 🙅 Refusing To Repent
---
## 🔄 Repented Not Of The Works Of Their Hands

To repent means to turn away from sin and change direction.

These survivors just watched a third of humanity die around them.

Even that much horror fails to change a single heart here.

Hard hearts can stay hard through the worst possible disaster.

🔄 Repent means turning away from sin

💀 A third of humanity just died around them

🧱 Even that horror changes nothing in them

📖 Hard hearts can survive the worst disaster

## 🗿 Worship Devils, And Idols Of Gold, And Silver, And Brass, And Stone, And Of Wood

These idols are carved from metal, stone, and wood by human hands.

Verse twenty one calls them things that cannot see, hear, or walk.

People just survived living demonic locusts with real teeth and stings.

Yet they still turn for help to objects that cannot even move.

🗿 Idols are carved from metal, stone, and wood

👁️ These idols cannot see, hear, or walk

🦗 People survived real demonic locusts with stings

📖 They still turn to objects that cannot move

## 💊 Neither Repented They Of Their Murders, Nor Of Their Sorceries, Nor Of Their Fornication, Nor Of Their Thefts

Sorceries here points to the use of drugs and magic together.

The Greek word behind it is close to our word pharmacy.

Murder, magic, sexual sin, and theft name a complete moral collapse.

Judgment on this scale still cannot force a true change of heart.

💊 Sorceries points to drugs used with magic

🔤 The Greek word is close to pharmacy

📉 These four sins show a complete moral collapse

📖 Judgment alone cannot force real change of heart
`.trim();

export const REVELATION_NINE_PERSONAL_SECTIONS = parseRevelationNineRawNotes(REVELATION_NINE_RAW_NOTES);
