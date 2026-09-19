export type PsalmsOneHundredFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFourRawNotes(rawText: string): PsalmsOneHundredFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+104:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 104 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+104:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+104:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 104 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 104,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 104:${startVerse}` : `Psalms 104:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Psalms 104 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FOUR_RAW_NOTES = `# Psalms 104:1-4
# 👑 Robed In Light And Majesty
---
## 🔄 Bless The LORD, O My Soul

"Bless" usually pictures God giving something good to a person.

Here the direction turns completely around.

David commands his own soul to praise God instead.

"Soul" means the whole inner life, not only a feeling.

This same call opens and will close the entire psalm.

🔄 Bless usually flows from God outward

🗣️ David commands his own soul here

❤️ Soul means the whole inner life

📖 This call opens and closes the psalm

## 👑 Thou Art Clothed With Honour And Majesty

"Clothed" here does not mean actual cloth or fabric.

It pictures majesty and honor wrapped around God like a robe.

Kings in the ancient world wore rich robes to display their power.

No human robe could ever compare to the glory described here.

👑 Clothed pictures majesty like a royal robe

🎽 Not literal cloth or fabric

🤴 Kings used robes to display power

📖 No human robe compares to this glory

## ✨ Who Coverest Thyself With Light As With A Garment

"Coverest" pictures God wrapping Himself in light the way a person puts on clothing.

Light here is not something God simply gives off.

It is something He wears on purpose.

Ancient readers had no bigger picture for glory than pure light.

The image makes God's greatness impossible to look at directly.

✨ Coverest pictures light worn like clothing

🎽 Not just something God gives off

🌟 The ancient world's biggest image for glory

📖 God's greatness cannot be looked at directly

## ⛺ Who Stretchest Out The Heavens Like A Curtain

"Curtain" here means the woven covering of a nomadic tent.

Ancient families lived under a tent stretched tight overhead.

This line pictures the entire sky as God's own tent.

Stretching it out shows effortless, deliberate work, not struggle.

⛺ Curtain means a tent's woven covering

🌌 The sky pictured as God's own tent

💪 Stretching it out shows effortless power

📖 The same God covers and roofs creation

## 🏠 Who Layeth The Beams Of His Chambers In The Waters

"Chambers" pictures an upper room, a floor built high above the sky.

Ancient readers pictured waters stored up above that ceiling.

This same picture opens the book of Genesis.

God is shown building His own home on top of that water.

🏠 Chambers pictures a room above the sky

🌊 Ancient readers pictured waters stored there

📜 The same picture opens Genesis

📖 Nothing is too strange a foundation for God

## 🏇 Who Maketh The Clouds His Chariot

A chariot was a king's vehicle for battle and travel.

This line turns the clouds themselves into God's own ride.

Nearby ancient cultures pictured their storm gods riding the clouds the same way.

This psalm claims that image for the one true God instead.

🏇 A chariot was a king's vehicle

☁️ Clouds pictured as God's own ride

⚡ Nearby cultures used similar storm imagery

📖 This psalm claims it for the true God

## 🌬️ Who Walketh Upon The Wings Of The Wind

This line pictures God moving across the sky as easily as walking.

Wind strong enough to knock down a tree becomes solid ground under His feet.

Nothing about weather is powerful enough to slow God down.

The most uncontrollable force in nature simply carries Him along.

🌬️ Wind pictured as solid ground for God

🌳 The same force that topples trees

🚫 Nothing in weather slows God down

📖 Uncontrollable forces simply carry Him along

## 👻 Who Maketh His Angels Spirits

"Spirits" links angels to wind, something unseen but powerful.

Angels are pictured here as swift, invisible messengers first.

This same link appears later in the book of Hebrews.

God shapes His own messengers out of forces He already commands.

👻 Spirits links angels to wind

💨 Swift and unseen before anything else

📜 The same link appears in Hebrews

📖 God shapes messengers from forces He commands

## 🔥 His Ministers A Flaming Fire

"Ministers" means servants carrying out someone else's assignment.

Fire in the ancient world pictured power no one could touch or tame.

God's own servants are pictured here as forces just as untamed.

Wind and fire together picture helpers no one else controls.

🙋 Ministers means servants under assignment

🔥 Fire pictured untamed power

💨 Paired with the wind from before

📖 God's helpers answer to no one else

# Psalms 104:5-9
# 🌊 Foundations Set, Boundaries Fixed
---
## 🏗️ Who Laid The Foundations Of The Earth

"Foundations" pictures the earth as a building set on a solid base.

Ancient thinkers imagined the earth resting on pillars underneath.

This verse credits God alone with setting that base in place.

A building this large needed a foundation strong enough to never move.

🏗️ Foundations pictures earth as a building

🗿 Ancient thinkers imagined pillars beneath it

👷 God alone set the base in place

📖 The foundation was built to never move

## 🏔️ That It Should Not Be Removed For Ever

This line promises the earth a stability nothing else in it has.

Kingdoms and kings in this world all eventually fall.

The ground underneath every one of them was built to outlast it.

God's building work carries a permanence human building never can.

🏔️ Earth promised lasting stability

👑 Kingdoms and kings eventually fall

🌍 The ground outlasts everything built on it

📖 God's building work is truly permanent

## 🌊 Thou Coveredst It With The Deep As With A Garment

"The deep" is the same word used for the waters of Noah's flood.

This line pictures water thrown over the whole earth like a blanket.

It recalls a time when water covered everything completely.

Even that much water stayed under God's complete control.

🌊 The deep echoes the flood waters

🧣 Water pictured as a covering blanket

🌍 A time water covered everything

📖 Even that water stayed under control

## 🏔️ The Waters Stood Above The Mountains

Mountains were the highest, most permanent thing a person could see.

This line describes water rising higher than even those peaks.

Water covering even the mountains shows how total that flood truly was.

Nothing on earth was tall enough to stay dry on its own.

🏔️ Water rose above the tallest peaks

🗻 Mountains were the tallest visible thing

🌊 The flood was total, not partial

📖 Nothing stayed dry without God's mercy

## 📢 At Thy Rebuke They Fled

"Rebuke" means a sharp, commanding word meant to be obeyed at once.

The waters here are pictured almost like a crowd ordered to scatter.

One word from God was enough to send an ocean running.

Nothing in creation, not even the sea, ignores His voice.

📢 Rebuke means a sharp commanding word

🌊 Waters pictured like a scattering crowd

⚡ One word sent an ocean running

📖 Nothing in creation ignores His voice

## 🏃 At The Voice Of Thy Thunder They Hasted Away

"Hasted" means hurried, moved quickly without delay.

Thunder pictures God's voice as loud enough to shake the sky.

The waters do not slowly retreat, they rush away at once.

Sound and command move together in this single image.

🏃 Hasted means hurried away quickly

⚡ Thunder pictures God's voice as loud power

🌊 The waters rush, they do not linger

📖 Sound and command move together here

## ⛰️ They Go Up By The Mountains, They Go Down By The Valleys

This line describes water finally settling into a working pattern.

Rivers and streams now rise up in the hills.

They flow back down through the valleys below.

What was once a flood becomes an ordered system that sustains life.

God did not just stop the chaos, He turned it into order.

⛰️ Water settles into a normal pattern

🏞️ Rivers rise in hills, flow to valleys

🔄 Chaos becomes an ordered system

📖 God turns chaos into order

## 🚧 Thou Hast Set A Bound That They May Not Pass Over

"Bound" means a fixed limit the water is not allowed to cross.

This same idea appears in the book of Job, describing the sea's limits.

The ocean looks endless to a person standing on the shore.

It is still held inside a line only God decided to draw.

🚧 Bound means a fixed limit

📜 The same idea appears in Job

🌊 The ocean looks endless from the shore

📖 Only God decided where it stops

# Psalms 104:10-13
# 🦌 Springs, Valleys, And Wild Creatures
---
## 💧 He Sendeth The Springs Into The Valleys

A spring is water that rises up naturally from underground.

In a dry climate like Israel's, a spring meant the difference between life and death.

This line pictures God personally directing where that water goes.

Even something as ordinary as a spring is shown as His work.

💧 Spring means water rising from underground

🏜️ Vital in a dry climate like Israel

🗺️ God directs where the water flows

📖 Ordinary water is still His work

## 🏞️ Which Run Among The Hills

This line pictures small streams winding naturally between the hills.

The water keeps moving, reaching places far from its source.

One spring can end up feeding an entire valley this way.

God's provision spreads outward instead of staying in one place.

🏞️ Streams wind naturally between hills

🚶 Water keeps moving outward

🌱 One spring can feed a whole valley

📖 God's provision spreads instead of staying put

## 🐴 The Wild Asses Quench Their Thirst

Wild asses were untamed donkeys living far from human settlements.

They were known for surviving in harsh, dry places most animals could not.

Even an animal this rugged still depends on God's water.

No creature is wild enough to outgrow its need for Him.

🐴 Wild asses were untamed desert donkeys

🏜️ Known for surviving harsh places

💧 Even they depend on God's water

📖 No creature outgrows its need for Him

## 🐦 The Fowls Of The Heaven Have Their Habitation

"Fowls of the heaven" simply means the birds flying overhead.

"Habitation" means a home, a settled place to live.

The same water feeding animals on the ground also shelters birds above it.

One resource is shown supporting completely different kinds of life.

🐦 Fowls of the heaven means birds

🏠 Habitation means a settled home

💧 The same water supports every creature

📖 One resource sustains many different lives

## 🌳 Which Sing Among The Branches

This pictures birds nesting in trees that grow near the water.

Their singing is not mentioned as background noise.

It is treated as part of the picture itself.

Even birdsong becomes evidence of a world set up to flourish.

🌳 Birds nest in trees near water

🎶 Their song is part of the picture

🌱 Evidence of a world set to flourish

📖 Small details are worth noticing here

## 🏠 He Watereth The Hills From His Chambers

This "chambers" is the same upper room pictured back in verse three.

Rain is pictured here as water poured down from that same high place.

Hills that people could never irrigate themselves still get watered.

God reaches places human effort alone could never fully cover.

🏠 Chambers is the same upper room from before

🌧️ Rain pictured poured from that high place

⛰️ Hills people could not irrigate themselves

📖 God reaches what human effort cannot

## 🍇 The Earth Is Satisfied With The Fruit Of Thy Works

"Satisfied" means fully fed, with nothing left lacking.

"Fruit of thy works" means everything that results from God's care for the land.

This describes genuine abundance, not bare survival.

The whole section closes by naming the result of all that watering.

🍇 Satisfied means fully fed, nothing lacking

🌾 Fruit of thy works means the harvest

✨ This describes abundance, not bare survival

📖 Watering leads to real abundance

# Psalms 104:14-18
# 🌲 Grass, Wine, And Cedars Of Lebanon
---
## 🐄 He Causeth The Grass To Grow For The Cattle

This line moves from wild animals to animals people actually raised.

Cattle needed steady grass to survive and to work the land.

God is shown providing for domestic animals just as much as wild ones.

The same care covers every level of creation, tame and untamed.

🐄 Cattle depend on steady grass

🌱 God provides for domestic animals too

🦌 Same care as the wild creatures before

📖 His care covers every level of creation

## 🌿 Herb For The Service Of Man

"Herb" here means the plants and crops people actually farmed and ate.

"Service of man" means these plants exist to meet human needs.

The psalm moves from feeding animals to feeding people in one breath.

God's provision reaches outward from animals to humans in turn.

🌿 Herb means the crops people farmed

🍽️ Service of man means meeting human needs

🔄 The psalm moves from animals to people

📖 Provision reaches every level of creation

## 🌍 That He May Bring Forth Food Out Of The Earth

This line ties every crop back to one single source, the ground itself.

Nothing people eat is made out of nothing.

It all begins as soil that God causes to produce food.

Even a farmer's harvest ultimately traces back to God's ongoing work.

🌍 All food traces back to the ground

🚫 Nothing is made from nothing

🌾 Soil is where it all begins

📖 A harvest traces back to God's work

## 🍷 Wine That Maketh Glad The Heart Of Man

This verse names wine plainly as something that brings real enjoyment.

"Maketh glad the heart" means genuine, felt happiness, not just usefulness.

Pleasure itself is not treated as something to be ashamed of here.

God's provision includes things people enjoy, not only things they need.

🍷 Wine named as a source of enjoyment

😊 Maketh glad means genuine happiness

🚫 Pleasure is not treated as shameful here

📖 Provision includes joy, not just survival

## 🫒 Oil To Make His Face To Shine

Oil in this culture was rubbed on the skin as a comfort.

A shining face pictured health, refreshment, and general wellbeing.

Its absence signaled mourning or hardship instead.

God's provision reaches all the way to small, everyday comforts.

🫒 Oil was rubbed on skin as comfort

✨ A shining face pictured wellbeing

😢 Its absence signaled mourning instead

📖 Provision reaches even small comforts

## 💪 Bread Which Strengtheneth Man's Heart

"Strengtheneth" means gives real strength, not just a full stomach.

Bread was the basic, everyday food most people ate at every meal.

This same phrase about the heart appears elsewhere in scripture.

An ordinary meal is treated here as something that sustains a person's whole self.

💪 Strengtheneth means real strength, not fullness

🍞 Bread was the basic everyday food

📜 The same phrase appears elsewhere in scripture

📖 An ordinary meal sustains the whole person

## 🌲 The Cedars Of Lebanon, Which He Hath Planted

Cedars of Lebanon were famous across the ancient world for their great size.

Kings used this specific wood to build palaces and temples.

Solomon's own temple was built with this same wood.

What kings competed to acquire is shown here as simply God's planting.

🌲 Cedars of Lebanon were famous for size

🏛️ Kings used this wood for temples

👑 Even Solomon's temple used this wood

📖 What kings prized was simply God's planting

## 🦢 As For The Stork, The Fir Trees Are Her House

A stork is a large migrating bird well known in the ancient Near East.

"Her house" pictures the fir tree as a genuine home, not just a perch.

Even a bird that travels great distances still has a place built for it.

The provision in this psalm reaches creatures that never stay in one place long.

🦢 Stork was a large migrating bird

🏠 Her house means a genuine home

✈️ Even travelers get a place to land

📖 Provision reaches creatures that never stay put

## 🐹 The Rocks For The Conies

"Conies" refers to small animals, much like modern hyraxes, that live among rocks.

They are small, easily overlooked, and have no natural defenses of their own.

God is shown giving them exactly the shelter their small bodies need.

Even the smallest, least noticed creatures still get a home built for them.

🐹 Conies were small rock dwelling animals

🛡️ They have no natural defenses

🪨 Rocks became their built in shelter

📖 Even the smallest creatures get a home

# Psalms 104:19-23
# 🌙 Moon And Sun, Night And Day
---
## 📅 He Appointed The Moon For Seasons

"Appointed" means assigned a specific job on purpose.

Ancient Israel tracked its calendar and festivals by the phases of the moon.

The moon was not mere decoration in the sky, it was a working timekeeper.

God is shown building the calendar itself into creation from the start.

📅 Appointed means assigned a job on purpose

🌙 Israel tracked festivals by the moon

⏰ The moon worked as a timekeeper

📖 God built the calendar into creation

## ☀️ The Sun Knoweth His Going Down

This line pictures the sun almost like a person who knows exactly when to leave.

Its setting follows a fixed and reliable pattern.

Ancient readers had no clocks, so the sun itself told them the time.

Even the sun is shown obeying a schedule it did not choose.

☀️ The sun pictured knowing when to leave

⏳ Its setting follows a fixed pattern

🕰️ The sun functioned as a clock

📖 Even the sun obeys a schedule

## 🌑 Thou Makest Darkness, And It Is Night

This does not describe darkness as something evil or accidental.

God is credited here with making night just as much as day.

Darkness in this verse is simply part of an ordered design.

A full day requires both halves, the light and the dark.

🌑 Darkness is not called evil here

🌗 God is credited with making night too

⚖️ Darkness is part of an ordered design

📖 A full day needs both halves

## 🌲 Wherein All The Beasts Of The Forest Do Creep Forth

Night in this verse belongs to a completely different set of animals.

"Creep forth" pictures cautious, quiet movement once the sun goes down.

The forest is not empty at night, it simply changes shifts.

God's design includes a schedule most people never actually see.

🌲 Night belongs to different animals

🐾 Creep forth pictures cautious movement

🔄 The forest changes shifts at night

📖 A schedule most people never see

## 🦁 The Young Lions Roar After Their Prey, And Seek Their Meat From God

Lions hunting at night looks like pure instinct and nothing more.

This verse credits their roar as reaching all the way up to God.

Even a predator's hunger is described as something answered by Him.

The most dangerous animal in the psalm still depends on the same God as the birds.

🦁 Lions hunt at night by instinct

🙏 Their roar is credited to God

🍖 Even a predator's hunger reaches Him

📖 The most dangerous creature still depends on God

## 👷 Man Goeth Forth Unto His Work And To His Labour Until The Evening

This verse finally turns from wild creatures to a human daily routine.

Daylight belongs to human labor the same way night belongs to lions.

"Until the evening" marks the natural end of a normal working day.

People fit into the same rhythm the sun and moon were given earlier.

👷 The verse turns to human routine

☀️ Daylight belongs to human labor

🌆 Evening marks the natural end of work

📖 People share the same rhythm as creation

# Psalms 104:24-30
# 🐋 How Manifold Are Thy Works
---
## 🔢 O LORD, How Manifold Are Thy Works

"Manifold" means many and varied, more than a person could count.

This line steps back after two dozen specific examples already given.

It names the pattern behind everything just described in one sentence.

Variety itself is treated here as evidence of God's greatness.

🔢 Manifold means many and varied

👀 This steps back after many examples

🎨 Variety is treated as evidence of greatness

📖 One sentence names the whole pattern

## 🧠 In Wisdom Hast Thou Made Them All

"Wisdom" here means skilled, purposeful design, not random accident.

Every creature and system named earlier had a reason behind it.

This verse credits intelligence, not chance, for how the world works.

Nothing in this psalm's list happened by accident.

🧠 Wisdom means skilled, purposeful design

🎯 Every earlier example had a reason

🚫 Nothing here happened by accident

📖 Intelligence, not chance, built this world

## 💰 The Earth Is Full Of Thy Riches

"Riches" here does not mean gold or money at all.

It means the sheer abundance of life God packed into creation.

The earth is pictured as genuinely full, not merely adequate.

God's generosity is measured here in abundance, not scarcity.

💰 Riches does not mean gold or money

🌍 It means abundance packed into creation

📦 The earth is full, not merely adequate

📖 God's generosity shows in abundance

## 🌊 This Great And Wide Sea

The sea was one of the most feared, uncontrollable forces in the ancient world.

Many ancient peoples treated the sea as home to chaos or dangerous gods.

This psalm names it plainly as simply one more thing God made.

What terrified other cultures gets calmly listed among God's works here.

🌊 The sea was feared as uncontrollable

😱 Other cultures linked it to chaos gods

📋 This psalm lists it calmly instead

📖 What terrified others is just God's work

## 🔢 Wherein Are Things Creeping Innumerable, Both Small And Great Beasts

"Innumerable" means too many to count, not just a large number.

This line pictures the sea as packed with life at every size.

Small, hidden creatures matter here just as much as massive ones.

God's attention to detail extends beyond what any human eye could catalog.

🔢 Innumerable means too many to count

🐠 The sea is packed with life

🔬 Small creatures matter as much as large

📖 God's detail exceeds what humans could catalog

## 🐋 There Is That Leviathan, Whom Thou Hast Made To Play Therein

"Leviathan" names a massive sea creature described elsewhere in the book of Job.

Other ancient cultures pictured a monster like this as a rival to their gods.

This verse instead pictures leviathan simply playing, like a pet in open water.

A creature others feared as a threat becomes harmless and tame before God.

🐋 Leviathan was a massive sea creature

😨 Other cultures feared it as a god's rival

🎮 Here it simply plays in the water

📖 What others feared is harmless before God

## 🙏 These Wait All Upon Thee, That Thou Mayest Give Them Their Meat In Due Season

"Wait upon thee" means depend on, look toward for what is needed.

Every creature named in this psalm shares this same posture toward God.

"In due season" means at the right time, not whenever they demand it.

Total dependence, on God's timing, describes the whole animal kingdom here.

🙏 Wait upon thee means total dependence

🌍 Every creature shares this same posture

⏳ In due season means at the right time

📖 Dependence on God's timing, not their own

## ✋ Thou Openest Thine Hand, They Are Filled With Good

This pictures God's provision like a hand opening to release food.

The action is simple and immediate, not slow or reluctant.

"Filled with good" means genuinely satisfied, not left wanting more.

Every creature's need connects directly back to this one small gesture.

✋ God's provision pictured as an open hand

⚡ The action is immediate, not reluctant

😋 Filled with good means truly satisfied

📖 Every need traces back to this gesture

## 🙈 Thou Hidest Thy Face, They Are Troubled

"Hidest thy face" means God withdrawing His presence and attention.

This is the opposite picture of the open hand just described.

"Troubled" describes real distress, not a minor inconvenience.

Creation's wellbeing is shown here as tied directly to God's presence.

🙈 Hidest thy face means withdrawn presence

🔄 The opposite of the open hand before

😟 Troubled means real distress

📖 Wellbeing is tied to God's presence

## 🌫️ Thou Takest Away Their Breath, They Die, And Return To Their Dust

This verse echoes the moment in Genesis when God formed man from dust.

"Breath" recalls that same breath of life God breathed into that first man.

Death here is described plainly, without drama or fear.

Every living thing's life and death both trace back to the same source.

🌫️ This echoes Genesis and man's creation

💨 Breath recalls the breath of life

⚰️ Death is described plainly here

📖 Life and death trace back to God

## 🕊️ Thou Sendest Forth Thy Spirit, They Are Created, And Thou Renewest The Face Of The Earth

"Spirit" here connects back to the Spirit hovering over the waters in Genesis.

This verse pictures death and new life as part of one ongoing cycle.

"Renewest" means made new again, not simply repaired or patched.

The same creative power from the very beginning is still active right now.

🕊️ Spirit connects back to Genesis

🔄 Death and new life form one cycle

🌱 Renewest means made new, not patched

📖 The same creative power is still active

# Psalms 104:31-35
# 🎶 The Glory Of The LORD Shall Endure
---
## 👑 The Glory Of The LORD Shall Endure For Ever

Human glory, thrones, and empires all eventually fade or collapse.

This verse promises God's glory a different future entirely.

Nothing described earlier in the psalm threatens or diminishes this permanence.

Everything else in creation changes, this one thing stays fixed.

👑 Human glory always eventually fades

♾️ God's glory is promised forever

🌍 Nothing in creation threatens it

📖 One thing in this psalm never changes

## 😊 The LORD Shall Rejoice In His Works

This does not describe God as distant from what He made.

"Rejoice" pictures genuine delight, not mere approval or tolerance.

Everything listed earlier in this psalm brings God real satisfaction.

Creation is not a chore God finished and walked away from.

😊 Rejoice means genuine delight

🚫 God is not distant from His works

✅ Creation brings Him real satisfaction

📖 God never walked away from His work

## 🌍 He Looketh On The Earth, And It Trembleth

"Trembleth" pictures the ground itself shaking under God's attention.

A similar image appears at Mount Sinai in the book of Exodus.

The same God who gently waters hills can also shake the whole earth.

Gentleness and overwhelming power both belong to the same God.

🌍 Trembleth pictures the ground shaking

🏔️ A similar image appears at Sinai

💧 The same God who waters gently

📖 Gentleness and power both describe Him

## 🔥 He Toucheth The Hills, And They Smoke

Smoking hills recall the mountain covered in smoke when God gave the law.

A single touch is shown as enough to trigger that same reaction.

This is not a gentle tap, it pictures overwhelming, holy power.

The same hills that shelter wild goats can also smoke at His touch.

🔥 Smoking hills recall Mount Sinai

👆 A single touch triggers this reaction

⚡ This pictures overwhelming, holy power

📖 The same hills can also smoke

## 🗣️ I Will Sing Unto The LORD As Long As I Live

This is a personal promise, not just a description of God's works.

The psalm shifts from talking about God to speaking directly to Him.

"As long as I live" ties this song to David's entire lifetime.

Praise here is framed as a lifelong commitment, not a passing mood.

🗣️ The psalm shifts to speaking to God

🎤 A personal promise, not just description

⏳ Tied to David's entire lifetime

📖 Praise framed as a lifelong commitment

## 🧠 My Meditation Of Him Shall Be Sweet

"Meditation" here means focused, repeated thinking, not an empty mind.

"Sweet" describes something genuinely enjoyable, not a dry duty.

Thinking carefully about God is pictured here as pleasant.

This verse pairs deep thought with real, felt joy.

🧠 Meditation means focused, repeated thinking

🍯 Sweet means genuinely enjoyable

🚫 Not a dry or burdensome duty

📖 Deep thought is paired with real joy

## 🚫 Let The Sinners Be Consumed Out Of The Earth, And Let The Wicked Be No More

This is not a wish for personal revenge against specific enemies.

It is a longing for a world with no sin left in it at all.

A song this full of joy naturally wants nothing left to spoil it.

The prayer is about a healed world, not settling a private score.

🚫 Not a wish for personal revenge

🌍 A longing for a world without sin

✨ Joy this full wants nothing to spoil it

📖 The prayer is for a healed world

## 🔁 Bless Thou The LORD, O My Soul

This exact line opened the whole psalm back in verse one.

Now it returns to close the psalm at the very end.

This pattern is called an inclusio, framing the whole song like a picture.

Everything the psalm said about creation sits inside that one frame.

🔁 This line matches the psalm's opening

🖼️ The pattern is called an inclusio

📦 Everything in between sits inside that frame

📖 The psalm begins and ends the same way

## 🙌 Praise Ye The LORD

This phrase is the Hebrew word "hallelujah" translated into English.

It appears here as the very last word of the entire psalm.

It follows a survey of light, animals, weather, and the sea itself.

Every single thing described in this psalm exists to end in this one command.

🙌 This phrase is Hebrew for hallelujah

🔚 It is the psalm's very last word

🌍 Follows a survey of all creation

📖 Everything in this psalm ends in this command
`.trim();

export const PSALMS_ONE_HUNDRED_FOUR_PERSONAL_SECTIONS = parsePsalmsOneHundredFourRawNotes(PSALMS_ONE_HUNDRED_FOUR_RAW_NOTES);
