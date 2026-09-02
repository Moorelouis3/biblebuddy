export type JobTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobTwentyEightRawNotes(rawText: string): JobTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 28:${startVerse}` : `Job 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Job 28 sections, received " + sections.length);
  }

  return sections;
}

const JOB_TWENTY_EIGHT_RAW_NOTES = `# Job 28:1-6
# ⛏️ Digging For Silver And Gold
---
## ⛏️ A Vein For The Silver

"Vein" means a narrow streak of ore running through solid rock.

Ancient miners learned to trace these thin lines deep underground.

Job pictures wisdom the same way, something a person has to search for on purpose.

Silver did not simply lie on the surface waiting to be found.

⛏️ Vein means a thin streak of ore

🪨 Miners traced it deep underground

🔍 Silver had to be searched out

📖 Wisdom will be pictured the same way

## 🔥 A Place For Gold Where They Fine It

"Fine" here means to refine, melting ore until only pure metal remains.

Raw gold comes out of the ground mixed with rock and other minerals.

Fire burns away everything that is not gold, leaving the metal behind.

The process took real skill, not luck.

🔥 Fine means to refine by melting

🪨 Raw gold comes mixed with rock

♨️ Fire burns away everything else

📖 Refining takes real skill not luck

## ⚙️ Iron Is Taken Out Of The Earth

Iron does not appear on the surface ready to use.

It has to be dug out of the ground like every other metal in this poem.

By Job's time, people already knew how to mine and work iron into tools.

This line grounds the whole chapter in ordinary human skill before it turns to wisdom.

⚙️ Iron had to be dug out

🛠️ People already knew how to work it

🪨 This grounds the poem in real skill

📖 That skill sets up the wisdom question

## 🔨 Brass Is Molten Out Of The Stone

In the King James Bible, "brass" usually means bronze or copper, not the brass we think of today.

"Molten" means melted down by intense heat.

Copper ore had to be heated until the metal separated from the stone around it.

Verse two lists two different metals, each won only through fire and labor.

🔨 Brass here usually means bronze or copper

🔥 Molten means melted down by fire

🪨 Copper had to be separated from stone

📖 Every metal here cost fire and labor

## 🕯️ He Setteth An End To Darkness

The word "he" in this verse refers to the miner, not to God.

Miners carried lamps or torches down into tunnels with no sunlight at all.

Their light pushed back the darkness far below the surface.

The poem is watching human skill before it ever mentions wisdom by name.

🕯️ He refers to the miner here

🌑 Miners worked in total darkness

🔦 Their lamps pushed the dark back

📖 Human skill comes before wisdom here

## 🔍 Searcheth Out All Perfection

This phrase means the miner searches every corner of the tunnel completely.

Nothing is left unexplored, even the farthest and darkest passage.

The same total, patient searching will matter later in the chapter.

Wisdom, the poem hints, deserves at least this much effort.

🔍 This means searching every corner fully

🕳️ Even the farthest passage gets explored

⏳ The work is patient and total

📖 Wisdom deserves this same effort

## 🌑 The Stones Of Darkness, And The Shadow Of Death

This is a KJV idiom for a place completely without light.

It does not mean an actual grave or literal death.

Ancient Hebrew often used the phrase for deep gloom or danger.

Here it simply pictures how far underground these tunnels went.

🌑 This phrase means total darkness

⚰️ It is an idiom, not a literal grave

🗣️ Hebrew used it for deep gloom

📖 It shows how deep miners dug

## 🌊 The Flood Breaketh Out From The Inhabitant

Miners sometimes broke into hidden underground streams while digging.

Water could suddenly rush into a tunnel far from any house or town.

"The inhabitant" pictures how far this water was from any human dwelling.

This was one more danger a miner risked to bring up treasure.

🌊 Miners could break into hidden streams

🏚️ This water was far from any home

⚠️ It was a real underground danger

📖 Treasure came at real personal risk

## 👣 The Waters Forgotten Of The Foot

This describes underground water that no human foot has ever crossed.

No traveler or shepherd had ever walked near it.

The miner reaches places completely unknown to ordinary people above ground.

The poem keeps pointing at places wisdom might also be hiding.

👣 No human foot had ever reached it

🚶 Ordinary travelers never came near

⛏️ Miners reached places others never could

📖 Wisdom may hide in places like this

## 🌾 Out Of It Cometh Bread

"Bread" stands for all the food that grows from the soil above.

The same earth that feeds people quietly holds fire and metal underneath.

Verse five contrasts the calm surface with the fierce world just below it.

Creation holds far more than what a person sees at first glance.

🌾 Bread stands for all the crops

🔥 Fire and metal sit just below

⚖️ Verse five contrasts surface and depth

📖 Creation holds more than the eye sees

## 💎 The Stones Of It Are The Place Of Sapphires

The stone called "sapphire" in this verse likely was not the blue gem known by that name today.

Many scholars believe it points to lapis lazuli, a deep blue stone prized in the ancient world.

Either way, the earth held beautiful, valuable stones long before anyone dug them up.

The chapter keeps stacking one hidden treasure on top of another.

💎 Sapphire likely meant lapis lazuli

🔵 It was a prized ancient stone

🌍 The earth hid beauty long before mining

📖 The chapter stacks treasure upon treasure

# Job 28:7-11
# 🦅 A Path No Bird Or Lion Knows
---
## 🦅 A Path Which No Fowl Knoweth

"Fowl" is an old word for any bird.

Even birds, who can see the ground from high above, never spot this path.

The miner's tunnel goes somewhere no eye in the sky can find.

That is how hidden and deep this human effort really was.

🦅 Fowl is an old word for bird

👁️ Even birds cannot see this path

🕳️ The tunnel hides from every eye above

📖 Human effort reached remarkably hidden places

## 👁️ Which The Vulture's Eye Hath Not Seen

Vultures were famous in the ancient world for extremely sharp eyesight.

They could spot food from a huge distance while circling high in the sky.

Even that legendary eyesight still cannot find the miner's secret path.

The poem picks the sharpest eyes in nature just to prove the point.

👁️ Vultures were known for sharp eyesight

🦅 They could spot prey from far away

🚫 Even they cannot find this path

📖 The sharpest eyes in nature still fail

## 🦁 The Lion's Whelps Have Not Trodden It

"Whelps" means young lions, the cubs of a lion.

Even fierce predators that roam wild, dangerous territory never cross this ground.

The miner goes to places too remote for even the boldest animals.

This keeps building the picture of a place utterly cut off from ordinary life.

🦁 Whelps means young lion cubs

🐾 Even wild predators avoid this ground

🚷 The place is remote from bold animals

📖 It is cut off from ordinary life

## 🦁 Nor The Fierce Lion Passed By It

The fierce lion was one of the most feared animals in the ancient Near East.

Even it never walks this particular ground.

Verses seven and eight both use wild animals to show how hidden the miner's path is.

No animal, no matter how strong, goes where a miner goes.

🦁 The lion was greatly feared then

🚫 Even the lion avoids this ground

🐦 Both birds and lions prove the point

📖 Miners reach where no animal goes

## ✋ He Putteth Forth His Hand Upon The Rock

The miner reaches out and works directly against solid stone.

This is not gentle work, it takes real physical strength and courage.

The chapter keeps admiring human boldness before it ever turns to wisdom itself.

People will risk enormous effort for silver and gold.

✋ The miner works directly against stone

💪 This takes real strength and courage

⛏️ Human boldness is on full display

📖 Effort like this chases silver and gold

## ⛰️ He Overturneth The Mountains By The Roots

This is poetic language for large scale digging, not literally uprooting a mountain.

Ancient mining could tunnel so deeply that it reshaped hillsides over time.

The image is deliberately larger than life to show the scale of the effort.

Wisdom, the poem hints, may take even more effort to uncover than this.

⛰️ This is poetic, not literal uprooting

⛏️ Mining could reshape hillsides over time

📏 The image shows massive scale on purpose

📖 Wisdom may take even more effort

## 🏞️ He Cutteth Out Rivers Among The Rocks

Miners sometimes carved channels through solid rock to redirect water.

This let them wash away loose debris or reach buried mineral seams.

It was advanced engineering for the ancient world, not simple digging.

Every line in this poem keeps raising how skilled these workers were.

🏞️ Miners carved channels through solid rock

💧 This helped clear debris or reach ore

🛠️ It counted as advanced ancient engineering

📖 The poem keeps praising human skill

## 👀 His Eye Seeth Every Precious Thing

A skilled miner learns to spot a vein of ore that an untrained eye would miss completely.

That trained eye is exactly why they can find treasure buried under solid rock.

The next verses will ask whether anyone has that same trained eye for wisdom.

Skill like this makes finding buried treasure possible at all.

👀 A trained eye spots hidden ore

🔍 Skill finds treasure others would miss

❓ The poem now turns toward wisdom

📖 Can anyone spot wisdom the same way

## 🌊 He Bindeth The Floods From Overflowing

Miners had to control and hold back underground water to keep tunnels usable.

"Bindeth" here means to dam up or hold in check.

Without this skill, flooding would have made deep mining completely impossible.

Human beings mastered fire, stone, and even water just to bring hidden things to light.

🌊 Bindeth means to dam or hold back

🚧 Miners controlled underground water on purpose

⛏️ Flooding could have stopped mining completely

📖 People mastered nature to reach hidden treasure

# Job 28:12-14
# 💡 Where Shall Wisdom Be Found
---
## 💡 Where Shall Wisdom Be Found

This question is the turning point of the whole chapter.

Everything about mining silver and gold was building toward this one question.

Metal can be dug up with skill and effort, wisdom cannot be mined the same way.

The poem now asks something far harder to answer.

💡 This question is the chapter's turning point

⛏️ Mining metal took skill and effort

🚫 Wisdom cannot be dug up that way

📖 The poem now asks something harder

## 🧭 Where Is The Place Of Understanding

"Understanding" means more than just knowing facts.

It means grasping how life, God, and the world actually fit together.

A miner can point to exactly where silver sits underground.

No one can point to a place like that for wisdom.

🧭 Understanding means seeing how things fit together

📍 A miner can point to silver

❓ No one can point to wisdom that way

📖 Wisdom has no map or location

## 💰 Man Knoweth Not The Price Thereof

No human being knows what wisdom is actually worth.

That is different from silver or gold, whose value was well known in the ancient world.

A merchant could weigh out silver and name its price on the spot.

Wisdom cannot be weighed or priced at all.

💰 No one knows wisdom's true worth

⚖️ Silver had a known ancient price

🚫 Wisdom cannot be weighed like metal

📖 Its value goes beyond any price

## 🌍 Neither Is It Found In The Land Of The Living

This does not mean wisdom is completely unreal or unreachable.

It means wisdom cannot simply be found lying around among ordinary living people.

Verse fourteen will go even further and search under the earth and sea.

The poem is deliberately ruling out every obvious hiding place first.

🌍 This does not mean wisdom is unreal

🚫 It is not lying around among people

🔎 The poem keeps ruling out places

📖 Every obvious hiding place fails first

## 🌊 The Depth Saith, It Is Not In Me

The poem gives voice to the deep waters, as if they could speak.

Even the deepest, most mysterious parts of creation admit wisdom is not hidden there.

This is a poetic technique called personification, giving human speech to nature itself.

Job's poetry keeps searching everywhere creation touches.

🌊 The deep waters are given a voice

🙅 Even the depths deny holding wisdom

🗣️ This device is called personification

📖 The search reaches every corner of creation

## 🌊 The Sea Saith, It Is Not With Me

The sea joins the deep in denying it holds wisdom anywhere within it.

Ancient people already viewed the sea as vast, mysterious, and nearly bottomless.

If even the sea does not have it, wisdom is clearly not a physical thing at all.

The chapter is closing off every natural place a person might search.

🌊 The sea also denies holding wisdom

🌌 The sea was seen as vast and mysterious

🚫 Wisdom is not a physical object

📖 Every natural hiding place is closed off

# Job 28:15-19
# 💰 Wisdom Cannot Be Bought
---
## 💰 It Cannot Be Gotten For Gold

No amount of gold can purchase wisdom.

This directly answers the question the chapter already asked.

It cannot be bought at any price.

The poem now lists treasure after treasure that still falls short.

💰 No amount of gold buys wisdom

❓ This answers the chapter's opening question

🚫 Wealth cannot purchase it at any price

📖 Treasure after treasure will fall short

## ⚖️ Neither Shall Silver Be Weighed For The Price Thereof

Ancient merchants often weighed out silver on scales to set a price for goods.

This was the normal way to buy something valuable in Job's world.

Wisdom breaks that entire system, no scale can ever weigh out its true worth.

Some things simply exist outside of ordinary buying and selling.

⚖️ Merchants weighed silver to set prices

🛒 This was the normal ancient system

🚫 Wisdom breaks that entire system

📖 Some things sit outside buying and selling

## 🌍 The Gold Of Ophir

Ophir was a distant region famous across the ancient world for producing especially fine gold.

Its exact location today is not certain.

But its gold was considered the very best available.

Even this rare, top quality gold cannot buy wisdom.

The poem keeps reaching for the finest things people knew and finding them all insufficient.

🌍 Ophir was famous for its fine gold

❓ Its exact location is not certain today

🚫 Even top gold cannot buy wisdom

📖 The finest things all fall short

## 💎 The Precious Onyx, Or The Sapphire

Onyx is a banded gemstone, often used in ancient jewelry and official seals.

Sapphire likely refers again to lapis lazuli, the deep blue stone mentioned earlier in the chapter.

Both stones were considered extremely valuable in the ancient Near East.

Neither one, however rare, can be traded for wisdom.

💎 Onyx was a banded, valuable gemstone

🔵 Sapphire again likely meant lapis lazuli

👑 Both were prized in the ancient world

📖 Neither can be traded for wisdom

## 🔷 The Gold And The Crystal Cannot Equal It

"Crystal" here refers to clear, polished quartz, a rare and admired material in the ancient world.

Even paired together, gold and crystal still cannot match wisdom's worth.

The poem keeps combining treasures, as if doubling up might finally be enough.

It never is.

🔷 Crystal meant clear, polished quartz

🤝 Even paired, gold and crystal fall short

➕ The poem keeps combining treasures

📖 Doubling wealth still is not enough

## 💍 The Exchange Of It Shall Not Be For Jewels Of Fine Gold

"Exchange" here means a trade, one valuable thing swapped for another.

No trade, however generous, can be offered in return for wisdom.

Wisdom cannot enter the marketplace at all, not even for finely crafted gold jewelry.

It stands completely outside the system of buying, selling, and trading.

💍 Exchange means a trade of value

🚫 No trade can be offered for wisdom

🏪 Wisdom does not enter the marketplace

📖 It stands outside buying and trading

## 🐚 No Mention Shall Be Made Of Coral, Or Of Pearls

Coral and pearls both came from the sea.

Both were rare and difficult to gather in the ancient world.

Divers risked real danger retrieving pearls from ocean beds.

Even goods that cost human risk still cannot buy wisdom.

The poem has now covered treasures from the earth, the mines, and the sea.

🐚 Coral and pearls came from the sea

🤿 Divers risked danger gathering pearls

🚫 Even risk cannot purchase wisdom

📖 Earth, mine, and sea all fall short

## ❤️ The Price Of Wisdom Is Above Rubies

Rubies were among the most valuable gemstones known in the ancient world.

This line names the single highest standard of value the poem has used so far.

Wisdom is placed even higher than that highest standard.

The comparison could not be stated more strongly.

❤️ Rubies were an extremely high standard

📈 Wisdom is placed above that standard

🏆 This is the strongest comparison yet

📖 Nothing on earth outranks wisdom's worth

## 💛 The Topaz Of Ethiopia Shall Not Equal It

This topaz likely came from a region south of Egypt, known in the ancient world for fine gemstones.

It was imported from far away, which made it even more costly and impressive.

Even a gem carried that far, at that cost, still cannot match wisdom.

Every treasure the poem names, near or far, comes up short in the same way.

💛 This topaz came from a distant region

🚚 Distance made it costly to import

🚫 Even it cannot match wisdom

📖 Every treasure named comes up short

# Job 28:20-22
# ❓ Whence Then Cometh Wisdom
---
## ❓ Whence Then Cometh Wisdom

"Whence" is an old word meaning from where.

The poem repeats almost the exact question it asked back in verse twelve.

Repeating a question in Hebrew poetry usually signals the writer is circling back to something urgent.

Every possible source has now been ruled out, and the question still has no answer.

❓ Whence means from where in old English

🔁 The poem repeats its earlier question

🗣️ Repetition in Hebrew poetry signals urgency

📖 No source has answered it yet

## 🧭 And Where Is The Place Of Understanding

This is the second time this exact question appears in the chapter.

Verse twelve asked it first, right after the mining scene ended.

Now it returns after every treasure on earth has already failed to buy wisdom.

The question is growing more urgent with each repetition.

🧭 This question repeats from verse twelve

⏳ It returns after every treasure fails

📈 The urgency keeps building each time

📖 An answer is still being withheld

## 👁️ Seeing It Is Hid From The Eyes Of All Living

"All living" means every living creature on earth, not just human beings.

Wisdom stays hidden from every eye that has ever looked for it.

This includes the wisest scholars, the sharpest hunters, and every creature alive.

Nothing with eyes has ever managed to spot it directly.

👁️ All living means every living creature

🙈 Wisdom hides from every eye that looks

🧠 Even the wisest scholars have not seen it

📖 Nothing with eyes has spotted it

## 🦅 Kept Close From The Fowls Of The Air

This calls back to verse seven, where no fowl knew the miner's hidden path.

Even birds flying high above the whole land cannot spot wisdom either.

Birds see farther and wider than almost any other creature.

If even they cannot find it, wisdom is not something visible at all.

🦅 This echoes the birds from verse seven

👀 Even wide ranging birds cannot see it

🌍 Birds see farther than most creatures

📖 Wisdom is not something visible

## 💀 Destruction And Death Say

The poem now gives voice to Destruction and Death themselves.

Even these dark forces, who touch every living thing eventually, do not possess wisdom.

This is the same personification technique used earlier with the depth and the sea.

The poem has now searched creation, animals, and even death itself.

💀 Destruction and Death are given voice

🚫 Even they do not possess wisdom

🗣️ This repeats the personification technique

📖 Every corner of existence has been searched

## 👂 We Have Heard The Fame Thereof With Our Ears

Even Death has only heard rumors about wisdom, secondhand at best.

"Fame" here means reputation or report, not firsthand knowledge.

Not even the forces that end every human life actually know where wisdom lives.

The chapter has now shown that no part of creation holds the answer.

👂 Fame means a report, not firsthand knowledge

🚫 Even Death only knows rumors

🔚 Nothing in creation holds the true answer

📖 The search has reached its limit

# Job 28:23-28
# ✝️ God Alone Knows The Way
---
## ✝️ God Understandeth The Way Thereof

After every search comes up empty, the chapter finally gives its answer.

God alone knows where wisdom is and how it works.

No mine, no ocean, no bird, and no human search ever found it.

Only the one who made everything actually holds it.

✝️ God alone knows wisdom's way

🚫 No human search ever found it

🌍 Every earlier search came up empty

📖 Only the Creator truly holds it

## 📍 He Knoweth The Place Thereof

This directly answers the question asked twice earlier in the chapter.

Verses twelve and twenty both asked where wisdom's place could be found.

God is finally revealed as the only one who actually knows the location.

The whole poem was building toward this single answer.

📍 This answers the question asked twice

🔁 Verses twelve and twenty asked the same thing

✝️ God alone knows the true location

📖 The whole poem points to this answer

## 🌍 He Looketh To The Ends Of The Earth

God's sight is not limited the way human sight is.

He sees every corner of the earth at once, without needing to search.

A miner can only dig one tunnel at a time.

God simply sees everything, everywhere, already.

🌍 God sees every corner at once

👁️ His sight has no human limit

⛏️ Miners can only search one place

📖 God already sees everything everywhere

## ☁️ Seeth Under The Whole Heaven

This means God's sight reaches every place under the sky, not just the earth's surface.

Nothing on land, in the sea, or in the air is outside his view.

The mining scene at the start of the chapter only reached a few feet underground.

God's view reaches everywhere at once, with no digging required.

☁️ This means everywhere under the sky

🌊 Nothing on land or sea is hidden

⛏️ Miners only reached a few feet down

📖 God needs no digging to see

## 🌬️ To Make The Weight For The Winds

This pictures God assigning wind a measured, exact force, like something weighed on a scale.

Wind seems random and impossible to control to a human observer.

To God, even wind follows a precise, measured design.

This is the same careful precision a miner uses, but on a cosmic scale.

🌬️ Wind is pictured as precisely weighed

🎲 Wind seems random to human eyes

⚖️ To God it follows exact design

📖 God's precision works on a cosmic scale

## 🌊 He Weigheth The Waters By Measure

God assigns the oceans and rivers an exact, measured amount.

Verse fifteen already said silver could be weighed to set its price.

Here God does the same careful weighing, but with the entire ocean.

The very language of the mining scene returns, now applied to God himself.

🌊 God weighs water with exact precision

⚖️ This echoes the silver weighed earlier

🔁 The mining language now returns

📖 It now describes God's own work

## 🌧️ When He Made A Decree For The Rain

"Decree" means a fixed rule or law that must be followed.

God set the pattern that governs when and how rain falls.

This is not random weather to God, it is an ordered system he designed.

The same God who designed rain also holds the wisdom no one else could find.

🌧️ Decree means a fixed rule or law

📏 God set rain's exact pattern

🎯 It is ordered, not random weather

📖 This same God holds wisdom itself

## ⚡ A Way For The Lightning Of The Thunder

Ancient people had no scientific explanation for lightning or thunder.

To them, both seemed completely wild and unpredictable.

This verse says even lightning follows a path God designed on purpose.

What looks chaotic to people is actually ordered to its Maker.

⚡ Lightning seemed wild and unexplainable then

🛤️ God gave it a designed path

🎯 What looks chaotic is actually ordered

📖 Its Maker sees the design in it

## 👁️ Then Did He See It, And Declare It

This means God did not just locate wisdom, he also spoke it into being.

"Declare" means to announce or bring something out into the open.

Wisdom was not just discovered by God.

It was authored by him.

This is far more than simply knowing where something is hidden.

👁️ God located wisdom and spoke it forth

📣 Declare means to announce openly

✍️ Wisdom was authored, not just found

📖 This goes beyond simply knowing a location

## 🔧 He Prepared It, Yea, And Searched It Out

"Prepared" means God built wisdom into the structure of the world itself.

"Searched it out" pictures the same careful, thorough effort the miner used back in verse three.

The difference is that God's search has no limit and always succeeds.

Every human search in this chapter now looks small next to God's.

🔧 Prepared means built into creation itself

🔍 Searched it out echoes the miner's care

✝️ God's search never fails or ends

📖 Every human search looks small beside it

## 🙏 Behold, The Fear Of The LORD, That Is Wisdom

"Fear" here does not mean being afraid of God the way a person fears danger.

It means deep reverence, respect, and taking God seriously as God.

After the entire chapter searches for wisdom in mines, oceans, and treasure, the answer is startlingly simple.

Wisdom is not something to dig up.

It is a relationship to enter.

🙏 Fear means deep reverence, not terror

🔎 The whole chapter searched for wisdom

💡 The answer turns out to be simple

📖 Wisdom is a relationship, not an object

## 🚶 To Depart From Evil Is Understanding

This defines understanding in a completely practical way, not as a set of facts.

Understanding is not measured by how much a person knows.

It is measured by whether a person actually turns away from wrong when they see it.

The chapter that began with miners digging for treasure ends with a choice anyone can make.

🚶 Understanding means turning from evil

🧠 It is not measured by facts known

✅ It is measured by real choices

📖 Anyone can choose this, unlike buried gold
`.trim();

export const JOB_TWENTY_EIGHT_PERSONAL_SECTIONS = parseJobTwentyEightRawNotes(JOB_TWENTY_EIGHT_RAW_NOTES);
