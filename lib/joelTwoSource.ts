export type JoelTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoelTwoRawNotes(rawText: string): JoelTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoelTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joel\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joel 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joel\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Joel\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joel 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joel 2:${startVerse}` : `Joel 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Joel 2 sections, received " + sections.length);
  }

  return sections;
}

const JOEL_TWO_RAW_NOTES = `# Joel 2:1-3
# 🚨 The Trumpet Sounds In Zion
---
## 🚨 Blow Ye The Trumpet In Zion

A trumpet here means a ram's horn, often called a shofar.

People blew it to warn a whole city that danger was near.

The same horn called Israel to war, to worship, and to warning.

Joel already gave this same command once, back in chapter one.

This time the danger it signals is far bigger than locusts.

🚨 Trumpet means a ram's horn alarm

📯 Used for war, worship, and warning

🔁 Joel already used this in chapter one

📖 A far bigger danger is coming

## ⏳ For The Day Of The LORD Cometh, For It Is Nigh At Hand

Joel already promised to return to this phrase back in chapter one.

Here it is again, now describing something close and growing closer.

Nigh at hand means almost here, not far off in the future.

The locust devastation of chapter one was only the warning.

What this chapter describes next is the real storm arriving.

🔁 Joel promised this phrase would return

⏳ Nigh at hand means almost here

🌾 Chapter one was only the warning

📖 The real storm is now arriving

## 🌑 A Day Of Darkness And Of Gloominess

This exact phrase shows up elsewhere in the Old Testament for judgment.

Zephaniah and Amos use nearly the same words for the day of the LORD.

Prophets often reached for this same picture of thick cloud and gloom.

It meant a day when normal life stopped and dread took over.

🌑 This phrase repeats across other prophets

📜 Zephaniah and Amos use similar words

☁️ Pictures a thick cloud covering the sky

📖 It meant dread, not just dim light

## 🌄 As The Morning Spread Upon The Mountains

This does not describe a peaceful sunrise.

It pictures a dark swarm spreading across the mountain ridges at first light.

Locust clouds can stretch for miles and blot out the sun.

From a distance that spreading mass looked like dawn creeping over the hills.

Only this dawn brought ruin instead of a new day.

🌄 Not a peaceful sunrise at all

🦗 A dark swarm spreading over the mountains

🌍 Locust clouds can stretch for miles

📖 This dawn brought ruin, not a new day

## 📈 A Great People And A Strong

This force is called unmatched in all of history.

There hath not been ever the like means nothing had struck this way before.

Many scholars believe Joel describes an enormous locust swarm using army language.

Others believe the chapter points past locusts to a human invading force.

Whatever its exact shape, Joel insists nothing like it had come before.

📈 Called unmatched in all history

🦗 Many read this as a locust swarm

⚔️ Others read it as an invading army

📖 Nothing like it had struck before

## 🔥 A Fire Devoureth Before Them

No actual fire needs to be present for this to be true.

A locust swarm can strip every green leaf and stalk bare.

Behind them a flame burneth repeats the same picture a second way.

From a distance a field picked clean looks just like it burned.

🔥 No real fire has to be burning

🦗 Locusts strip every green thing bare

🌾 A stripped field looks just like ash

📖 Total devastation follows wherever it goes

## 🌳 The Land Is As The Garden Of Eden Before Them

Eden was the garden God planted at the very beginning, full of life.

The land ahead of this force still looks like Eden, green and whole.

The land behind it is called a desolate wilderness instead.

One line marks the difference between untouched beauty and total ruin.

🌳 Eden means the garden God first planted

🟢 Ahead of it, the land is still green

🏜️ Behind it, the land is stripped bare

📖 One line separates beauty from ruin

# Joel 2:4-6
# 🐎 An Army Like Horses
---
## 🐎 The Appearance Of Them Is As The Appearance Of Horses

Locusts actually have long faces that favor the shape of a horse's head.

Writers in the ancient world noticed this resemblance long before modern science did.

That same resemblance explains why Joel compares them to horsemen next.

A swarm running at full speed looked like cavalry charging in formation.

🐎 Locust heads resemble a horse's shape

📜 Ancient writers already noticed this

🏇 A swarm looked like charging cavalry

➡️ Explains the horsemen comparison next

## 🔊 Like The Noise Of Chariots On The Tops Of Mountains

A massive locust swarm in flight makes a real, physical sound.

Millions of wings beating together can sound like rumbling wheels and hooves.

Mountain ridges would carry and amplify that noise even further.

Anyone standing nearby would hear the danger before they ever saw it.

🔊 Millions of wings beat together loudly

⛰️ Mountains carried the sound further

👂 People heard it before they saw it

📖 Sound announced the danger first

## 🔥 Like The Noise Of A Flame Of Fire That Devoureth The Stubble

Dry stubble crackles and pops loudly when fire burns through a field.

Joel reaches for a second sound picture, not just the first one.

Both comparisons describe the same unmistakable roar of the approaching swarm.

No single image was enough to capture what this actually sounded like.

🔥 Dry stubble crackles loudly when it burns

🗣️ A second sound picture, not the first

🌊 Both describe the same approaching roar

📖 One image alone was not enough

## ⚔️ As A Strong People Set In Battle Array

Battle array means lined up in organized ranks, ready to fight.

This is not a chaotic scramble of insects.

It is something closer to a trained formation.

Discipline like that made the coming danger feel even less escapable.

⚔️ Battle array means organized fighting ranks

🚫 Not a chaotic scramble at all

🪖 It looked like a trained formation

📖 Discipline made the danger feel inescapable

## 😨 All Faces Shall Gather Blackness

This is an old idiom describing the look of real fear.

Blood drains from a frightened face and the color changes.

Ancient writers described that change as faces turning dark or black.

Nobody had to be told how serious this was.

Their own faces already showed it.

😨 An old idiom for real fear

🩸 Blood draining changes the color of a face

⚫ Writers called that change blackness

📖 Fear showed before anyone spoke

# Joel 2:7-9
# 🧗 Nothing Can Stop Them
---
## 🏃 They Shall Run Like Mighty Men

This describes trained soldiers, not a confused swarm of bugs.

The same force that looked like horses now moves like an army.

Whatever this is, it does not act like scattered insects at all.

Joel keeps borrowing military language on purpose, one image after another.

🏃 Moves like trained soldiers, not bugs

🐎 Builds on the earlier horse comparison

⚔️ Acts with real military behavior

📖 Joel stacks up war imagery on purpose

## 📏 They Shall Not Break Their Ranks

Ranks means the organized lines a trained army marches in.

Breaking ranks would mean soldiers scattering out of formation in panic.

This force never does that, every member stays exactly in line.

They shall march every one on his ways shows the same discipline.

📏 Ranks means organized marching lines

😱 Breaking ranks means scattering in panic

🪖 This force never scatters at all

📖 Perfect discipline made it unstoppable

## 🚫 Neither Shall One Thrust Another

This corrects an assumption a reader might make about a huge swarm.

Something this size sounds like it would trample over itself in chaos.

Instead each one holds its own path without shoving its neighbor.

Order on this scale was its own kind of unsettling.

🚫 Corrects the idea of total chaos

🦗 A swarm this size could easily collide

➡️ Each one keeps to its own path

📖 Perfect order made it more unsettling

## ⚔️ When They Fall Upon The Sword, They Shall Not Be Wounded

This does not mean weapons physically cannot hurt them.

It means losing some of the swarm does nothing to stop the whole.

Cut down a few and the rest keep advancing without slowing.

No ordinary defense could absorb a force built like this one.

⚔️ Not about weapons failing to work

🦗 Losing a few does not stop the swarm

🏃 The rest keep advancing anyway

📖 No ordinary defense could hold it back

## 🏙️ They Shall Climb Up Upon The Houses

Running through the city and up the walls was only the beginning.

Rooftops offered no safety either once this force arrived.

No corner of the city stayed untouched by it.

Every place people thought was secure turned out not to be.

🏙️ Spreads through streets, walls, and roofs

🏠 Rooftops gave no real safety

🚫 No corner of the city stayed untouched

📖 Nowhere assumed safe actually was

## 🪟 They Shall Enter In At The Windows Like A Thief

A thief gets in through whatever opening a house has, uninvited and unseen.

Closed doors meant nothing once this force reached a home.

Even a small window was enough of an opening.

The comparison makes clear that no barrier could keep it out.

🪟 A thief enters through any opening

🚪 Closed doors offered no protection

🦗 Even a small window let it in

📖 No barrier could keep it out

# Joel 2:10-11
# 🌌 Who Can Abide It
---
## 🌍 The Earth Shall Quake Before Them

This force is now described as shaking creation itself.

What began as a locust and army comparison now reaches cosmic scale.

The language moves from a field in Israel to the whole earth trembling.

Joel wants the reader to feel how far this goes.

🌍 Creation itself reacts to this force

📈 The scale jumps from local to cosmic

🦗 Started as a locust and army image

📖 Joel wants the full weight felt

## 🌑 The Sun And The Moon Shall Be Dark

This kind of language shows up often when prophets describe the day of the LORD.

It does not always predict a literal eclipse on that exact day.

It pictures a world where the normal order of light has stopped working.

Darkness itself becomes the sign that something enormous is happening.

🌑 Common language for the day of the LORD

🔭 Not always a literal eclipse

💡 Pictures the normal order breaking down

📖 Darkness itself becomes the warning sign

## 📯 The LORD Shall Utter His Voice Before His Army

This line changes who is actually in command of this force.

It is not a random disaster or an enemy acting alone.

God himself leads this army and gives the order to advance.

That claim is more unsettling than the locusts or soldiers themselves.

📯 Reveals who commands this force

🚫 Not a random disaster at all

👑 God himself leads the army

📖 That claim is the most unsettling part

## ❓ Who Can Abide It

Abide means to stand firm and hold your ground against something.

Joel asks this question and expects no confident answer.

No human strength is a match for an army led by God himself.

The question itself turns the chapter toward the plea that follows.

🧍 Abide means stand firm against it

❓ No confident answer is expected

💪 No human strength matches this

📖 The question turns the chapter toward repentance

# Joel 2:12-14
# 💔 Rend Your Heart
---
## 🔄 Turn Ye Even To Me With All Your Heart

God now speaks directly instead of letting the disaster speak for itself.

Turn means a real change of direction, not just a change of mood.

With all your heart rules out a half effort or a performance.

This is the hinge the entire chapter turns on.

🔄 Turn means a real change of direction

❤️ All your heart rules out half effort

🚫 Not a performance, a real shift

📖 This line is the chapter's hinge

## 🍽️ With Fasting, And With Weeping, And With Mourning

Fasting means going without food on purpose as an act of humility before God.

Weeping and mourning are the honest grief that fasting was meant to carry.

Ancient Israel used all three together during moments of national crisis.

None of the three was meant to be done for show.

🍽️ Fasting means going without food on purpose

😭 Weeping and mourning carry honest grief

📜 All three marked a national crisis

📖 None were meant to be performed

## ✂️ Rend Your Heart, And Not Your Garments

Tearing your own clothing was the normal way to show grief or horror in this culture.

Jacob did this generations earlier after seeing Joseph's bloodied coat.

God says the outward tear means nothing without an inward one.

A torn shirt was easy, a changed heart was not.

✂️ Tearing clothes was the normal grief gesture

👔 An outward sign, easy to fake

❤️ God wants the inward tear instead

📖 A changed heart is the harder thing

## 📜 He Is Gracious And Merciful, Slow To Anger, And Of Great Kindness

This exact description of God repeats throughout the Old Testament.

Moses first heard God describe himself this way back in Exodus.

Joel reminds a frightened nation that this is still who God is.

The God who sent the warning is the same God offering mercy.

📜 This description repeats across the Old Testament

🕊️ Moses first heard it back in Exodus

🙏 Joel repeats it to a frightened nation

📖 The same God warns and offers mercy

## 🔄 He Repenteth Him Of The Evil

This does not mean God did something wrong and felt sorry.

Repenteth here means God relents, choosing not to carry out a planned judgment.

Evil in this old sense means disaster or harm, not sin.

God's willingness to relent is the whole reason repentance is worth it.

🚫 God did not sin or make a mistake

🔄 Repenteth here means God relents

⚡ Evil means disaster, not sin

📖 God's mercy makes repentance worth it

## ❓ Who Knoweth If He Will Return And Repent

Joel refuses to promise an outcome he cannot guarantee.

This is honest hope, not a guaranteed formula for getting what you want.

Nobody can force God to relent just by going through the right motions.

Real repentance means turning to God without knowing exactly what He will do.

❓ Joel will not promise a guaranteed outcome

🙏 This is honest hope, not a formula

🚫 God cannot be forced into relenting

📖 Real repentance does not know the outcome first

## 🌾 A Meat Offering And A Drink Offering

Meat offering in this old sense means a grain offering, not meat from an animal.

A drink offering was wine poured out alongside it.

Chapter one already showed these offerings had stopped because the crops failed.

Their return would be proof that God had answered this prayer.

🌾 Meat offering means a grain offering here

🍷 A drink offering was wine poured out

🚫 Chapter one showed these had stopped

📖 Their return would prove God answered

# Joel 2:15-17
# 📯 Gather Everyone, No Exceptions
---
## ✝️ Sanctify A Fast

Sanctify means to set something apart as holy or official.

This was not a private, personal decision to skip a meal.

Leaders had to formally declare the fast for the whole nation.

Making it official gave the whole community one shared moment of humility.

✝️ Sanctify means to set apart as holy

🚫 Not a private, personal choice

📜 Leaders declared it for the whole nation

📖 One shared moment of humility together

## 📯 Call A Solemn Assembly

A solemn assembly was a required, formal gathering of the whole community.

It was different from the regular weekly rhythm of worship.

This kind of gathering was reserved for the most serious national moments.

Calling one signaled that this crisis mattered more than daily life.

📯 A solemn assembly was a required gathering

🚫 Different from the regular weekly rhythm

⚠️ Reserved for the most serious moments

📖 Signaled this crisis came first

## 👶 Gather The Children, And Those That Suck The Breasts

Nursing infants could not understand a single word of this call.

Their presence was never about their own understanding or participation.

It showed the whole nation, down to its youngest members, standing together.

No one was excused because of age.

👶 Nursing infants could not understand the call

👨‍👩‍👧 Their presence showed total unity anyway

🚫 No one was excused by age

📖 The whole nation stood together

## 💍 Let The Bridegroom Go Forth Of His Chamber

Jewish law normally excused a new husband from public duty during his first year of marriage.

This assembly overrides even that exemption.

Closet in the next phrase means a private room, not a storage space like today.

The crisis mattered more than even a brand new marriage's privacy.

💍 Newlyweds were normally excused from duty

🚫 This assembly overrides that exemption

🚪 Closet meant a private room, not storage

📖 The crisis outweighed even a new marriage

## 🏛️ Let The Priests, The Ministers Of The LORD, Weep Between The Porch And The Altar

This names a specific, narrow space inside the temple courtyard.

It sat between the entrance porch and the altar of sacrifice.

Priests stationed there stood closest to where offerings were made to God.

Their weeping in that exact spot was a visible plea straight to Him.

🏛️ A specific spot inside the temple courtyard

🚪 Between the entrance porch and the altar

🙏 Priests stood closest to God there

📖 Their weeping was a direct, visible plea

## 🌍 Wherefore Should They Say Among The People, Where Is Their God

This plea is not only about Israel's own survival.

It is about what other nations would conclude about God himself.

If Israel fell apart completely, outsiders might assume God had failed.

The priests ask God to act for the sake of His own name.

🌍 Other nations were watching this outcome

❓ A fallen Israel would raise doubts about God

🛡️ The appeal protects God's own reputation

📖 Not only Israel's survival was at stake

# Joel 2:18-20
# 🛡️ The LORD Answers
---
## 💔 Then Will The LORD Be Jealous For His Land

Jealous here does not mean envy or insecurity.

It means a fierce, protective love over something that belongs to you.

This marks the turning point where God responds to the nation's repentance.

Everything described from this verse forward moves toward restoration instead of judgment.

💔 Jealous here means protective, not envious

🛡️ A fierce love over what belongs to Him

🔄 This verse marks the turning point

📖 The chapter now moves toward restoration

## ❤️ And Pity His People

Pity here means compassion that moves God to act, not simple sympathy.

God does not just feel sorry for the suffering He described.

He responds to the nation's repentance with real action on their behalf.

Verses twelve through seventeen asked for exactly this response.

❤️ Pity means compassion that leads to action

🚫 More than just feeling sorry

🙌 God responds with real action

📖 This answers the plea from before

## 🌾 I Will Send You Corn, And Wine, And Oil

These three were the basic staples of life in ancient Israel.

Corn here means grain, mainly wheat and barley, the foundation of every meal.

Chapter one described all three failing during the crisis.

Their return reverses the exact loss that opened this whole book.

🌾 Corn, wine, and oil were basic staples

🍞 Corn here means grain, not modern corn

📉 Chapter one described all three failing

📖 Their return reverses the opening crisis

## 😳 I Will No More Make You A Reproach Among The Heathen

Reproach means public shame or mockery in front of others.

Surrounding nations would have mocked Israel for a devastated, starving land.

God promises to remove that shame along with the famine itself.

Restoring the harvest also restores the nation's standing among its neighbors.

😳 Reproach means public shame or mockery

🌍 Neighboring nations were watching and judging

🚫 God promises to remove that shame

📖 Restoring the harvest restores their standing

## 🧭 I Will Remove Far Off From You The Northern Army

Many scholars believe the northern army names the same locust force from earlier in the chapter.

Locust swarms over this region often did approach from the north.

Others read this phrase as pointing toward an actual human invading army.

Either way, God promises to drive the whole threat away completely.

🧭 Northern army likely echoes the locust force

🦗 Locust swarms often did come from the north

⚔️ Some read it as a literal invading army

📖 God promises to remove the threat completely

## 🗺️ His Face Toward The East Sea, And His Hinder Part Toward The Utmost Sea

The east sea means the Dead Sea, and the utmost sea means the Mediterranean.

Naming both seas together covers the entire width of the land.

Hinder part is an old way of saying the back end of something.

Scattering the threat from coast to coast left nowhere for it to regroup.

🗺️ East sea means the Dead Sea

🌊 Utmost sea means the Mediterranean

📏 Together they cover the whole land

📖 Nowhere was left for it to regroup

# Joel 2:21-24
# 🌾 Fear Not, Be Glad
---
## 🌍 Fear Not, O Land

God speaks directly to the land itself as if it could hear Him.

Chapter one described the ground mourning right alongside the people.

Now the ground receives its own personal word of comfort.

Even creation gets pulled into this promise of relief.

🌍 God speaks directly to the land

😢 Chapter one showed the ground mourning too

🕊️ The land now gets its own comfort

📖 Creation is included in this promise

## 🎁 For The LORD Will Do Great Things

This exact phrase stands out against the warning back in verse eleven.

There God's army was described as great and very terrible.

Here that same greatness becomes a promise instead of a threat.

The same power that frightened the nation now works for its good.

🔁 Echoes the warning back in verse eleven

⚠️ There it described a terrifying army

🎁 Here it describes a promised blessing

📖 The same power now works for good

## 🐑 Be Not Afraid, Ye Beasts Of The Field

Chapter one described animals groaning and suffering from the famine.

God now speaks comfort to the animals too, not only the people.

This shows the restoration reaches every part of creation, not just human lives.

Nothing that suffered under the crisis gets left out of its ending.

🐑 Chapter one showed animals suffering too

🕊️ God speaks comfort to animals here

🌾 Restoration reaches all of creation

📖 Nothing that suffered is left out

## 🌧️ He Hath Given You The Former Rain Moderately

Israel depended on two separate rainy seasons every year to grow food.

The former rain fell in autumn and prepared the ground for planting.

The latter rain fell in spring and helped the crop ripen before harvest.

Both rains arriving on time meant the whole farming year would actually work.

🌧️ Israel depended on two rainy seasons

🍂 Former rain came in autumn for planting

🌱 Latter rain came in spring for ripening

📖 Both rains made the farming year work

## 🎁 The Latter Rain In The First Month

The latter rain normally arrived later in the spring, not this early.

Getting it already in the first month was an unusually generous gift.

God was not just restoring the normal pattern of rain.

He was giving even more than the ordinary yearly rhythm.

🌧️ Latter rain usually came later than this

🎁 Getting it early was unusually generous

➕ More than the normal yearly pattern

📖 God restored more than what was lost

## 🌾 The Floors Shall Be Full Of Wheat, And The Vats Shall Overflow

Threshing floors and wine vats sat empty throughout chapter one's famine.

Now both are described as completely full, even overflowing.

This single image reverses the entire crisis the book opened with.

The ending matches the beginning, detail for detail, only now restored.

🌾 Threshing floors were empty in chapter one

🍷 Vats now overflow instead of sitting dry

🔄 This reverses the whole opening crisis

📖 Restoration matches the loss, detail for detail

# Joel 2:25-27
# 🦗 The Years Restored
---
## 📅 I Will Restore To You The Years That The Locust Hath Eaten

This promises more than just a single good harvest.

Multiple years of damage are implied by the plural word years here.

God promises to make up for lost time, not only lost crops.

No ordinary farmer could ever recover years that quickly on his own.

📅 Promises more than one good harvest

📉 Years implies damage over multiple seasons

⏳ God restores lost time, not just crops

📖 No farmer could recover that fast alone

## 🦗 My Great Army Which I Sent Among You

God now openly claims the locust plague as His own sent force.

Chapter one already named four separate locust words for this same disaster.

Calling it my great army means none of it happened outside God's control.

The same God who sent the judgment is the one reversing it.

🦗 God claims the locust plague as His own

📜 Chapter one already named it four ways

👑 Nothing happened outside God's control

📖 The judge and healer are the same God

## 🍽️ Ye Shall Eat In Plenty, And Be Satisfied

This directly answers the hunger chapter one described in painful detail.

Plenty and satisfied are stronger words than simply having enough.

The promise is abundance, not just survival at a bare minimum.

God does not restore His people halfway.

🍽️ Directly answers chapter one's hunger

➕ Plenty means more than bare survival

😊 Satisfied adds real abundance

📖 God restores fully, not halfway

## ✨ That Hath Dealt Wondrously With You

Wondrously points back to miracles, not an ordinary good season.

A normal harvest would not have earned this exact word.

The scale of this recovery was meant to be obviously God's doing.

Praise was the only honest response once the people saw what happened.

✨ Wondrously points to something miraculous

🌾 More than an ordinary good harvest

👁️ The scale made God's hand obvious

📖 Praise was the only honest response

## 🔁 My People Shall Never Be Ashamed

This exact promise repeats twice, once here and again in the next verse.

Repeating it this close together marks it as the chapter's main point.

Shame had come from famine, invasion, and the surrounding nations' mockery.

That shame is now promised to be gone for good.

🔁 This promise repeats twice in a row

📣 Repetition marks it as the main point

😳 Shame had come from famine and mockery

📖 That shame is promised gone for good

# Joel 2:28-29
# 🕊️ The Spirit Poured Out
---
## ⏳ It Shall Come To Pass Afterward

Afterward points ahead to a future era, not the very next day.

The apostle Peter later quoted this exact passage out loud in Acts chapter two.

He told a crowd in Jerusalem that this moment had finally arrived.

A promise given to farmers rebuilding their fields pointed centuries forward.

⏳ Afterward points to a future era

📖 Peter quoted this passage in Acts two

🏙️ He said it had arrived in Jerusalem

➡️ A farming promise pointed centuries forward

## 💧 I Will Pour Out My Spirit Upon All Flesh

Pour out pictures abundance, like water flooding over the top of a container.

Before this, God's Spirit rested mainly on specific chosen leaders.

Judges, prophets, and kings were the usual recipients in the Old Testament.

This promise widens that gift to reach everyone, not a select few.

💧 Pour out pictures overflowing abundance

👑 Before this it rested on chosen leaders

📜 Judges, prophets, and kings mainly received it

📖 The promise now reaches everyone

## 👧 Your Sons And Your Daughters Shall Prophesy

Naming daughters alongside sons was not the expected, typical pattern.

Most recognized prophets up to this point in the story were men.

This promise opens that role to women just as fully.

Gender was no longer a barrier to carrying God's message.

👧 Daughters are named right alongside sons

📜 Most earlier prophets had been men

🚪 This promise opens the role to women

📖 Gender was no longer a barrier

## 💤 Your Old Men Shall Dream Dreams, Your Young Men Shall See Visions

Dreams and visions were two accepted ways God spoke to people in this culture.

Naming both the old and the young covers every generation at once.

Age was no more a barrier here than gender was in the line before.

The whole community, young and old alike, gets pulled into this promise.

💤 Dreams and visions were accepted ways God spoke

👴 Old men and young men are both named

🔓 Age was no longer a barrier either

📖 The whole community is included

## 👩 Upon The Servants And Upon The Handmaids

Handmaids means female servants, often without much status or freedom of their own.

Even people without any social power were included in this promise.

No status was too low to receive what God promised here.

This verse completes a pattern, no son, daughter, elder, youth, or servant left out.

👩 Handmaids means female servants

🚫 No social status disqualified anyone

🔓 The lowest status was still included

📖 No one at all was left out

# Joel 2:30-32
# 🙏 Whosoever Shall Call
---
## 🌌 I Will Shew Wonders In The Heavens And In The Earth

Shew is simply an old spelling of show.

This promise pairs with the outpoured Spirit as a second half of the picture.

Visible signs would confirm that something real and enormous was happening.

Both halves, the Spirit poured out and the signs shown, work together.

🌌 Signs pair with the outpoured Spirit

📖 Shew is an old spelling of show

✅ Visible proof that something real was happening

➡️ Both halves work together as one picture

## 🔁 The Sun Shall Be Turned Into Darkness, And The Moon Into Blood

This exact cosmic language already appeared earlier back in verse ten.

Repeating it here ties the locust warning to this larger future promise.

The apostle Peter quoted this very line as well in Acts chapter two.

What first described a plague now describes something much bigger still coming.

🔁 Echoes the same language from verse ten

🩸 Moon into blood means a deep red color

📖 Peter quoted this line in Acts two

➡️ A local plague points to something bigger

## 🌍 Whosoever Shall Call On The Name Of The LORD Shall Be Delivered

Whosoever is a wide open word with no exceptions built into it.

This promise does not say which family, tribe, or nation qualifies.

The apostle Paul later quoted this exact line in his letter to the Romans.

He used it to say this same offer is open to everyone, everywhere.

🌍 Whosoever leaves out no one

🚫 No tribe or nation is named as required

📖 Paul quoted this line in Romans

➡️ The offer reaches everyone, everywhere

## 🏙️ In Mount Zion And In Jerusalem Shall Be Deliverance

Mount Zion and Jerusalem name the same city from two different angles.

Zion often points to the city as God's chosen dwelling place.

Naming the exact city grounds a sweeping promise in a real place.

The whosoever from the line before still needed somewhere concrete to call home.

🏙️ Zion and Jerusalem name the same city

🏠 Zion points to God's chosen dwelling place

📍 A sweeping promise gets a real location

📖 Even a wide promise needs real ground

## 🌱 The Remnant Whom The LORD Shall Call

Remnant means the surviving, faithful part left after a disaster or judgment.

Not everyone in the nation would choose to answer God's call.

The remnant were the ones who actually did.

Joel's whole book, locusts and army and promise together, lands on this one invitation.

🌱 Remnant means the faithful part that survives

🚫 Not everyone chooses to respond

🙋 The remnant are the ones who do

📖 The whole book lands on this invitation
`.trim();

export const JOEL_TWO_PERSONAL_SECTIONS = parseJoelTwoRawNotes(JOEL_TWO_RAW_NOTES);
