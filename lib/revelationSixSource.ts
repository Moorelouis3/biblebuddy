export type RevelationSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationSixRawNotes(rawText: string): RevelationSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 6:${startVerse}` : `Revelation 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Revelation 6 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_SIX_RAW_NOTES = `# Revelation 6:1-2
# 🏇 The First Seal Opens
---
## 👂 Come And See

This command comes from one of the four living creatures introduced in Revelation four.

It tells John to watch closely before each new seal breaks open.

The same four word summons appears again before the second, third, and fourth seals.

That steady repetition builds rhythm, seal after seal, horse after horse.

👂 Come and see calls for close attention
🔁 This exact phrase repeats three more times
🐴 Each repeat introduces a brand new horse
📖 A steady rhythm builds across four seals

## 🤍 Behold A White Horse

White in this scene pictures victory, not the purity it often means elsewhere in Revelation.

Roman generals already rode white horses during victory parades through the streets of their own city.

This rider enters the story already looking like a winner.

Only later does the chapter explain what he actually conquers.

🤍 White here means victory, not purity
🏇 Roman generals rode white horses in victory parades
👑 This rider already looks like a winner
📖 His real conquest comes later in the chapter

## 🏹 A Bow, And A Crown Was Given Unto Him

A bow was a weapon of war, not a tool for ceremony or display.

Crowns in Revelation almost always picture a ruler's authority to reign.

This rider receives both a weapon and the right to rule in the very same verse.

Conquest and crowned authority arrive together, not one before the other.

🏹 A bow signals real weapon, not decoration
👑 A crown pictures the right to reign
⚔️ Weapon and authority arrive in one verse
📖 Conquest and crowned power come together

## 🏇 Conquering, And To Conquer

The same verb appears twice in a row inside one short phrase.

That repeated verb pictures conquest that never actually stops or settles.

This rider does not win one battle and then retire from the field.

He keeps moving forward, winning again and again across history.

🔁 The verb conquer repeats twice on purpose
🏇 This conquest never settles or stops
⚔️ He does not retire after one win
➡️ His conquest keeps moving across history

# Revelation 6:3-4
# ⚔️ The Second Seal, War Rides Out
---
## 🐴 Another Horse That Was Red

Red here pictures bloodshed, the natural color for a horse tied to war.

This is the second rider to appear, following the same pattern already set by the first.

Each horse color in this chapter carries its own specific meaning.

Red leaves no doubt about what this particular rider brings.

🩸 Red pictures bloodshed and violence
🔁 This rider follows the same pattern
🎨 Each horse color carries its own meaning
📖 Red leaves no doubt about this rider

## 🕊️ Power To Take Peace From The Earth

This rider does not create war out of nothing on his own.

He receives power, meaning the authority is given to him from outside himself.

Peace being taken away assumes peace was actually present before this moment.

Removing peace here means violence and conflict spread rapidly across the earth.

🕊️ Peace existed before it was taken
🎁 Power here means permission is given
⚔️ Removing peace lets violence spread fast
📖 This rider acts under given authority

## ⚔️ That They Should Kill One Another

This phrase points to people turning against each other, not just armies clashing on a battlefield.

Civil conflict and internal violence are pictured here alongside war between nations.

The red horse brings division that reaches inside communities and families, not only between countries.

Peace breaking down this way touches ordinary daily life, not just distant battle lines.

⚔️ This pictures people turning on each other
🏚️ Division reaches inside homes and towns
🌍 War between nations is not the only picture
📖 Broken peace touches ordinary daily life

## 🗡️ A Great Sword

A sword in this vision stands for weapons and military power generally, not one single blade.

Calling it great emphasizes its size and reach across a wide area.

This rider carries the means to cause mass violence, not a personal weapon for self defense.

The red horse leaves destruction on a scale far larger than one single fight.

🗡️ A sword pictures weapons and warfare broadly
📏 Great points to scale, not one blade
💥 This rider causes violence on a wide scale
📖 Destruction here reaches far past one fight

# Revelation 6:5-6
# ⚖️ The Third Seal, Famine Weighs The Earth
---
## 🐴 A Black Horse

Black in this vision pictures scarcity, hunger, and economic hardship.

This color shifts the chapter from violent death toward slow, grinding want.

Famine often follows war closely, since fields go unplanted and trade routes break down.

The color itself warns the reader before a single word of explanation follows.

⚫ Black pictures scarcity and hunger
🌾 Famine often follows after war
🚜 Fields and trade both suffer here
📖 The color warns before any words do

## ⚖️ A Pair Of Balances In His Hand

Balances here are a simple hand scale, used to weigh out small amounts of food.

Carrying a scale instead of a weapon fits a famine, not a battlefield.

Food had grown scarce enough that every portion now needed careful measuring.

Nothing could be wasted when supply had dropped this low.

⚖️ Balances means a simple hand scale
🌾 Food now needed careful measuring
🚫 Nothing could be wasted in famine
📖 A scale fits famine, not war

## 💰 A Measure Of Wheat For A Penny

A measure here was about enough wheat to feed one person for a single day.

A penny, more precisely a denarius, was a full day's wage for an ordinary laborer.

In normal times, that same wage bought enough wheat to feed a family for a week.

This price shows wheat now costing far more than its normal rate.

🌾 A measure fed one person one day
💰 A penny equaled a full day's wage
📈 Wheat here costs far more than normal
📖 Famine prices punish the poor hardest

## 🫒 See Thou Hurt Not The Oil And The Wine

Oil and wine were grown on trees and vines with deep roots, unlike wheat and barley.

Those deep roots let olive trees and vineyards survive droughts that destroy shallow grain crops.

This command protects the comfort goods owned mostly by the wealthy, even during famine.

The poor lose their basic bread while the rich still keep their oil and wine.

🫒 Oil and wine come from deep rooted plants
🌵 Deep roots survive droughts grain cannot
💎 Oil and wine were luxury goods
📖 Famine hits the poor harder than the rich

# Revelation 6:7-8
# 💀 The Fourth Seal, Death Rides Out
---
## 🐴 A Pale Horse

The Greek word behind pale describes a sickly, ashen green, the color of a corpse.

This is not a light gray or a soft color at all.

Every horse color so far has matched exactly what its rider brings.

This sickly color announces death itself before the rider is even named.

🤢 Pale means sickly ashen green
💀 This color matches a corpse
🎨 Each horse color matches its rider
📖 This color announces death itself

## 💀 His Name Was Death, And Hell Followed With Him

This is the only rider in the whole chapter given an actual name instead of a description.

Hell here pictures the grave, the place bodies go once death has done its work.

Death and the grave are pictured as a pair, moving across the earth together.

One claims the life, and the other receives what is left behind.

💀 Only this rider gets a real name
⚰️ Hell here pictures the grave itself
🔗 Death and the grave travel together
📖 One takes life, the other receives it

## 🌍 Power Over The Fourth Part Of The Earth

This judgment is massive, yet it is also clearly limited to one quarter of the earth.

God restrains even this terrible rider from destroying everything all at once.

A full quarter of the earth is still a staggering amount of loss.

Limited judgment is not the same thing as gentle judgment.

🌍 A fourth means one quarter total
🛑 Even this rider stays limited
📉 One quarter is still massive loss
📖 Limited judgment is not gentle judgment

## ⚔️ Sword, And With Hunger, And With Death, And With The Beasts

This verse lists four separate ways death reaches people across the earth.

Sword points back to the second seal, and hunger points back to the third.

Death here likely means plague or widespread disease sweeping through weakened populations.

Wild beasts round out the list, attacking people left unprotected by war and famine.

⚔️ Sword recalls the second seal's war
🌾 Hunger recalls the third seal's famine
🦠 Death here likely means disease
📖 Four separate dangers strike at once

# Revelation 6:9-11
# 🕯️ The Fifth Seal, The Martyrs Cry Out
---
## ⚰️ Under The Altar The Souls Of Them That Were Slain

This altar matches the one used in the Jewish temple for sacrifice and offerings.

Blood from a sacrifice was poured out at the base of that altar.

These souls are pictured in that same place, as faithful offerings given for God.

Their deaths are not shown as wasted or forgotten.

⚰️ The altar recalls temple sacrifice
🩸 Sacrificial blood was poured at its base
🙏 These souls are pictured as offerings
📖 Their deaths were never forgotten

## ✝️ Slain For The Word Of God

These people were killed specifically because of their faith and their testimony about God.

This is not death from war, famine, or disease like the earlier seals described.

Human hatred toward truth, not disaster, caused these particular deaths.

The chapter shifts here from natural and political disaster toward direct religious persecution.

✝️ These deaths came from faith, not disaster
📜 Their testimony cost them their lives
😡 Human hatred caused this violence
📖 Persecution enters the chapter here

## ❓ How Long, O Lord, Holy And True

This cry is an honest question, not a complaint against God.

Holy means set apart and perfectly good, and true means fully trustworthy.

These martyrs call on exactly the character of God they are relying on for justice.

Waiting for justice is hard even for those who trust God completely.

❓ Their cry is honest, not bitter
✨ Holy means set apart and good
🤝 True means fully trustworthy
📖 Even trust does not erase waiting

## 👘 White Robes Were Given Unto Every One Of Them

White robes already appeared earlier in Revelation as a picture of purity and reward.

Giving every single martyr a robe shows that none of them are overlooked.

This answer comes before their full question is actually settled.

Comfort and vindication can arrive before every detail of justice is finished.

👘 White robes picture purity and reward
🙌 Every single martyr receives one
⏳ This comes before the full answer
📖 Comfort can arrive before justice finishes

## ⏳ Rest Yet For A Little Season

These martyrs are told to wait, but only for a limited and defined time.

A season here does not mean forever, it means a set period that will end.

God is not ignoring their cry, He is simply timing it with care.

Their rest is temporary, not a final answer to their question.

⏳ A season means a limited time
🛑 This is not forever, it ends
🕰️ God times justice with care
📖 Their rest is temporary, not final

## 👥 Their Fellowservants Also Should Be Fulfilled

More believers will still be killed for their faith after this very moment.

Fulfilled here means a complete number is being reached, not a random count.

Their martyrdom was never meaningless or wasted, even though it was painful.

God already knows the exact number before a single one of them dies.

👥 More believers will still be killed
🔢 Fulfilled means a full number reached
💔 Their deaths were never meaningless
📖 God already knows the full number

# Revelation 6:12-17
# 🌑 The Sixth Seal, Cosmic Terror
---
## 🌍 A Great Earthquake

This earthquake is not local or small, it shakes the whole created order at once.

Earthquakes in scripture often signal God directly stepping into human history.

This one begins a chain reaction that reaches the sky itself, not just the ground.

What starts underground quickly becomes a sign written across the whole sky.

🌍 This earthquake shakes the whole earth
⚡ Earthquakes often signal God acting directly
🔗 It starts a chain reaching the sky
📖 Ground and sky both respond together

## ☀️ The Sun Became Black As Sackcloth Of Hair

Sackcloth was a rough, dark cloth made from goat hair, worn during mourning.

Comparing the sun to that rough cloth pictures total darkness, not a passing shadow.

The brightest object in the sky goes completely dark in this vision.

Darkness over the sun pictures judgment and mourning on a massive scale.

🖤 Sackcloth was rough dark mourning cloth
☀️ The sun goes completely dark here
😢 Darkness pictures mourning and judgment
📖 Even the brightest object fails

## 🌕 The Moon Became As Blood

A blood red moon was already a frightening sign to ancient observers.

Pairing it with a darkened sun doubles the sense of total cosmic disorder.

Both the sun and the moon, the two great lights of creation, fail at once.

Nothing in the sky stays untouched by this sixth seal.

🩸 A blood red moon frightened ancient readers
☀️ Sun and moon fail together here
🌑 Both great lights of creation fail
📖 Nothing in the sky stays untouched

## ⭐ The Stars Of Heaven Fell Unto The Earth

An unripe fig drops easily the moment a strong wind shakes its branch.

That everyday picture explains exactly how the stars fall in this verse.

Ancient readers pictured stars as fixed lights, so this pictures total cosmic collapse.

The sky itself, once completely stable, now empties out like a shaken tree.

🍈 An unripe fig drops in strong wind
⭐ Stars falling pictures total cosmic collapse
🌬️ A shaken tree pictures this falling
📖 Even a stable sky can empty out

## 📜 The Heaven Departed As A Scroll

A scroll rolls up tightly from both ends when it is no longer needed.

The sky itself is pictured here rolling shut like that same kind of scroll.

This is the same scroll image already used back in chapter five of this book.

What once held God's hidden plan now pictures the created sky folding away.

📜 A scroll rolls shut from both ends
🌌 The sky rolls shut the same way
🔁 This echoes the scroll from chapter five
📖 Creation itself can fold away like paper

## 🏔️ Every Mountain And Island Were Moved

Mountains and islands were the most fixed, permanent landmarks people knew in the ancient world.

Sailors navigated by islands, and nations marked their borders by mountains.

Even those unmovable landmarks shift out of place in this vision.

Nothing in creation, however solid it looks, survives this moment unchanged.

🏔️ Mountains were the most permanent landmarks
🏝️ Islands guided ancient sailors and borders
🌀 Even these fixed points shift here
📖 Nothing solid survives this moment unchanged

## 🫣 Hid Themselves In The Dens And In The Rocks

This list names kings, great men, rich men, captains, and both free men and slaves together.

Every level of human power and wealth appears on this one list.

Status and money protect no one once this moment actually arrives.

The powerful run for the same caves that anyone else would run toward.

👑 Kings and rich men are both named
💰 Wealth and status offer no protection
🏃 The powerful flee just like everyone else
📖 No rank matters once this moment comes

## 🙏 Fall On Us, And Hide Us

These people beg mountains and rocks to crush them rather than face what is coming.

That request shows how much safer sudden death feels than the day actually arriving.

They are hiding specifically from God's own presence, not from any human enemy.

Running from God, not from each other, defines this entire scene.

🙏 They beg rocks to crush them
💀 Sudden death feels safer than this day
😨 They hide from God, not people
📖 Fear of God defines this whole scene

## ⚡ The Great Day Of His Wrath Is Come

This day was already promised and expected long before this chapter ever began.

Calling it great marks it as the central, decisive day of all history.

The closing question, who shall be able to stand, has no human answer at all.

That unanswered question sets up exactly what Revelation seven answers next.

⚡ This day was promised long before
🏆 Great marks it as history's central day
❓ No human answer fits that question
📖 Revelation seven answers this question next
`.trim();

export const REVELATION_SIX_PERSONAL_SECTIONS = parseRevelationSixRawNotes(REVELATION_SIX_RAW_NOTES);
