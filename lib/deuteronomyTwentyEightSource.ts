export type DeuteronomyTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyTwentyEightRawNotes(rawText: string): DeuteronomyTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 28:${startVerse}` : `Deuteronomy 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Deuteronomy 28 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_TWENTY_EIGHT_RAW_NOTES = `# Deuteronomy 28:1-6
# 🎁 The Blessing Begins
---
## 👂 Hearken Diligently Unto The Voice Of The LORD

"Hearken diligently" means much more than simply hearing something once.

It means listening closely and choosing to obey every time.

A person can hear an instruction and still ignore it completely.

God calls for the kind of listening that turns into action.

👂 Hearken means listen and obey

🔁 Diligently means every single time

🚫 Hearing alone is not enough

📖 God wants obedience, not just attention

---

## 👀 To Observe And To Do All His Commandments

Moses uses two verbs together on purpose here.

"Observe" means paying close attention to a command.

"Do" means actually carrying it out in daily life.

Knowing the law was never the finish line for Israel.

Obedience was always the real goal.

👀 Observe means paying close attention

✋ Do means carrying it out

🚫 Knowing the law was not enough

📖 Obedience was always the goal

---

## 👑 Set Thee On High Above All Nations

This promise is about status, not just success.

Israel would stand out as uniquely favored among every nation nearby.

Other nations would notice and take God's blessing seriously.

The higher the position, the more visible the testimony became.

👑 Set on high means uniquely favored

🌍 Israel stood out among the nations

👀 Other nations would take notice

📖 A visible people points back to God

---

## 🏙️ Blessed Shalt Thou Be In The City, And Blessed Shalt Thou Be In The Field

This verse names two very different settings on purpose.

The city covers daily life inside the walls, trade, home, family.

The field covers the working life outside, farming and herding.

Nothing about Israel's life would sit outside God's blessing.

🏙️ City means life inside the walls

🌾 Field means the working farmland

🔄 Together they cover the whole of life

📖 Nothing sits outside God's blessing

---

## 👶 The Fruit Of Thy Body, And The Fruit Of Thy Ground, And The Fruit Of Thy Cattle

Three different kinds of fruit are named together here.

"Fruit of thy body" means children born into the family.

"Fruit of thy ground" means the crops harvested from the fields.

"Fruit of thy cattle" means healthy calves and lambs born to the herds.

👶 Fruit of thy body means children

🌱 Fruit of thy ground means crops

🐄 Fruit of thy cattle means young animals

📖 Blessing reaches family, farm, and flock

---

## 🐮 The Increase Of Thy Kine, And The Flocks Of Thy Sheep

"Kine" is an old word for cattle, cows in particular.

This line zooms in specifically on the herds and flocks.

A family's wealth in this culture was measured largely in livestock.

More calves and lambs being born meant real, visible prosperity.

🐮 Kine is an old word for cattle

📈 Increase means more animals born

💰 Livestock measured a family's wealth

📖 More animals meant visible prosperity

---

## 🧺 Blessed Shall Be Thy Basket And Thy Store

The "basket" held the freshly harvested produce, fruit and grain.

The "store" was the larger supply kept for the months ahead.

One covers what was just gathered, the other what was saved.

Both the immediate harvest and the long term supply would be full.

🧺 Basket means the fresh harvest

🏺 Store means the saved supply

📦 One is immediate, one is long term

📖 Both would stay full

---

## 🚪 Blessed Shalt Thou Be When Thou Comest In, And When Thou Goest Out

This is an old way of describing an entire life in motion.

Coming in covers arriving home, entering a house, entering a city.

Going out covers leaving for work, for travel, for battle.

The blessing was not limited to a single moment of the day.

🚪 Comest in means arriving home

🚶 Goest out means leaving to work

🔄 Together they mean all of life

📖 Blessing was not limited to a moment

# Deuteronomy 28:7-10
# 🛡️ Enemies Flee, A Holy People
---
## ⚔️ The LORD Shall Cause Thine Enemies To Be Smitten Before Thy Face

"Smitten" means struck down and defeated in battle.

God claims direct credit for Israel's victories here, not the army's skill.

The enemy would face Israel directly and lose.

This same phrase gets repeated later in the chapter, but reversed into a curse.

⚔️ Smitten means defeated in battle

🙌 God claims credit for the victory

👀 The enemy faces Israel directly

📖 This phrase returns later as a curse

---

## 🎯 They Shall Come Out Against Thee One Way, And Flee Before Thee Seven Ways

An army marching to attack usually comes in one organized formation.

Fleeing in seven different directions describes total panic and collapse.

One way in shows discipline, seven ways out shows none left.

The picture is total, chaotic defeat, not a narrow win.

🎯 One way means an organized attack

💥 Seven ways means total panic

📉 Discipline collapses into chaos

📖 The defeat is complete, not partial

---

## 🏚️ The LORD Shall Command The Blessing Upon Thee In Thy Storehouses

A "storehouse" was where grain and supplies were kept after harvest.

God does not just bless the harvest itself.

He blesses the storage, the saving, and everything Israel's hands would do.

Nothing about their work or their savings would run empty.

🏚️ Storehouse means where supplies were kept

🌾 Blessing covers the harvest itself

🤲 Blessing also covers the work of their hands

📖 Nothing about their supply would run empty

---

## ✨ The LORD Shall Establish Thee An Holy People Unto Himself

"Holy" means set apart for a special purpose, not simply morally good.

Israel becoming God's holy people meant belonging to Him in a unique way.

No other nation stood in that exact relationship to God.

This was about identity as much as behavior.

✨ Holy means set apart for God

🤝 Israel belonged to God uniquely

🌍 No other nation held that place

📖 Identity, not only behavior, was at stake

---

## 📜 As He Hath Sworn Unto Thee

This points back to promises God made long before Moses was even born.

God had sworn similar promises to Abraham, Isaac, and Jacob.

An oath in scripture is a promise God binds Himself to keep.

None of this blessing was a new or sudden idea.

📜 Sworn means a binding promise

👴 The promise reaches back to Abraham

⏳ This was not a new idea

📖 God keeps promises made generations earlier

---

## 🏷️ All People Of The Earth Shall See That Thou Art Called By The Name Of The LORD

Israel carrying God's name meant other nations would notice who they belonged to.

A visible, blessed nation became a testimony to the watching world.

"They shall be afraid of thee" describes the respect and caution other nations would feel.

This fear was not about cruelty, it was about recognizing real power at work.

🏷️ Called by God's name means belonging to Him

👀 Other nations would watch and notice

😮 Afraid means respectful caution, not cruelty

📖 A blessed nation testifies to everyone watching

# Deuteronomy 28:11-14
# 👑 Head And Not The Tail
---
## 📦 The LORD Shall Make Thee Plenteous In Goods

"Plenteous" is an old word meaning abundant, more than enough.

This covers children, livestock, and crops all together again.

The list repeats what was already promised in verses three through six.

Repetition here works like emphasis, not filler.

📦 Plenteous means abundant, more than enough

👨‍👩‍👧 It covers children, livestock, and crops

🔁 The list repeats earlier promises

📖 Repetition here means emphasis

---

## ☁️ The LORD Shall Open Unto Thee His Good Treasure, The Heaven

The sky itself is described here as God's storehouse.

Rain in this dry farming region was never guaranteed.

Calling it God's "treasure" means the rain itself was a gift, not automatic.

Every good harvest depended on this treasure being opened.

☁️ Heaven here means the sky as God's storehouse

🌧️ Rain was never automatic in this land

🎁 Treasure means the rain was a gift

📖 Every harvest depended on this gift

---

## 💰 Thou Shalt Lend Unto Many Nations, And Thou Shalt Not Borrow

In the ancient world, the lender always held power over the borrower.

A nation that borrows depends on someone else for survival.

A nation that lends stands in the stronger position economically.

God promises Israel would be the strong one, never the dependent one.

💰 Lending meant holding the power

📉 Borrowing meant depending on someone else

💪 Israel would be the strong one

📖 Never the dependent nation

---

## 🧠 The LORD Shall Make Thee The Head, And Not The Tail

"Head" and "tail" describe leadership versus being led.

The head decides direction, the tail simply follows behind.

This is a vivid picture of Israel leading other nations, not following them.

The promise names the highest possible position, not just a decent one.

🧠 Head means leading and deciding

🐍 Tail means following behind

🥇 Israel would lead, not trail

📖 The promise names the highest position

---

## ⬆️ Thou Shalt Be Above Only, And Thou Shalt Not Be Beneath

This line restates the head and tail picture in plain terms.

"Above" and "beneath" leave no room for a middle position.

The blessing was meant to be complete, not partial.

Everything depended on one condition stated right after this line.

⬆️ Above means the higher position

⬇️ Beneath means the lower position

🎯 No middle ground is described

📖 Everything depended on obedience

---

## 🧭 To The Right Hand, Or To The Left

This phrase describes both directions someone could wander off a marked path.

Turning right or turning left both count as leaving the path, not just one direction.

The command demanded staying exactly on course, without any drifting either way.

Straying even slightly in either direction still counted as straying.

🧭 Describes both directions of wandering off

↔️ Either direction counts as leaving the path

🎯 The command demanded staying exactly on course

📖 Slight straying still counted as straying

# Deuteronomy 28:15-19
# ⚠️ The Curses Mirror The Blessings
---
## 🔄 If Thou Wilt Not Hearken Unto The Voice Of The LORD Thy God

This verse flips the opening condition from verse one exactly.

Obedience brought every blessing already listed above.

This same structure now introduces every curse about to follow.

The chapter is built as one long if and then, not two separate lists.

🔄 This verse flips verse one exactly

✅ Obedience brought the blessings above

⚠️ The same structure now introduces curses

📖 One long if and then, not two lists

---

## 🔁 Cursed Shalt Thou Be In The City, And Cursed Shalt Thou Be In The Field

This line repeats verse three almost word for word, with one change.

"Blessed" becomes "cursed," and nothing else in the sentence moves.

The deliberate repetition makes the reversal impossible to miss.

Every place that held a blessing could just as easily hold a curse.

🔁 This repeats verse three exactly

🔀 Only one word changes, blessed to cursed

👀 The repetition makes the reversal obvious

📖 Every place could hold either outcome

---

## 🧺 Cursed Shall Be Thy Basket And Thy Store

The basket and the store were named as blessed back in verse five.

Now the exact same two words carry the opposite meaning.

The harvest and the long term supply would both fail instead of overflowing.

Nothing about daily provision was guaranteed apart from obedience.

🧺 Basket and store were blessed in verse five

🔀 Now the same words mean failure

📉 Harvest and supply would both fail

📖 Provision was never separate from obedience

---

## 👶 The Fruit Of Thy Body, And The Fruit Of Thy Land

Children, crops, and livestock were named as blessings back in verse four.

The same three categories return here under the opposite heading.

A family's future, food supply, and wealth were all tied to one decision.

Nothing about ordinary life sat outside the reach of this warning.

👶 Fruit of thy body meant children again

🌱 Fruit of thy land meant crops again

🐄 Kine and flocks return here too

📖 One decision touched every part of life

---

## 🔁 Cursed Shalt Thou Be When Thou Comest In, And When Thou Goest Out

This is the exact phrase from verse six, reversed.

Coming home and going out to work would both carry trouble instead of blessing.

The mirror between blessing and curse is now complete for verses one through six.

Structure itself becomes part of the warning here.

🔁 This mirrors verse six exactly

🚪 Coming home would carry trouble

🚶 Going out would carry trouble too

📖 The mirror between blessing and curse is complete

# Deuteronomy 28:20-24
# 🩹 Curses Of Disease And Drought
---
## 😡 The LORD Shall Send Upon Thee Cursing, Vexation, And Rebuke

Three separate words describe three different kinds of trouble here.

"Cursing" means active harm sent against them.

"Vexation" means ongoing frustration in daily work and plans.

"Rebuke" means open correction, the kind everyone around them could see.

😡 Cursing means active harm

😤 Vexation means constant frustration

👎 Rebuke means visible correction

📖 Three different kinds of trouble named together

---

## 🎯 Because Of The Wickedness Of Thy Doings

This verse names the cause of all this trouble directly.

It was not random misfortune or bad luck striking Israel.

Their own actions, described plainly as wickedness, brought the consequence.

The chapter never lets the cause of the curse stay vague.

🎯 The cause is named directly here

🎲 This was not random misfortune

✋ Their own actions caused the consequence

📖 The chapter never hides the real cause

---

## 🦠 The LORD Shall Make The Pestilence Cleave Unto Thee

"Pestilence" means a widespread, deadly disease, what we might call a plague today.

"Cleave" means to stick fast and not let go.

This is not a single outbreak that passes quickly.

The picture is disease that clings and returns again and again.

🦠 Pestilence means a widespread deadly disease

🔗 Cleave means sticking fast

🔁 It returns again and again

📖 Not a single outbreak, but a lasting one

---

## 🤒 With A Consumption, And With A Fever

"Consumption" describes a disease that wastes the body away slowly.

A "fever" here means dangerous, burning body heat that will not break.

Both words describe the body failing from the inside out.

These are the first named illnesses in a much longer list.

🤒 Consumption means a slow wasting sickness

🔥 Fever means dangerous burning body heat

📉 The body fails from the inside out

📖 The first illnesses in a longer list

---

## 🌬️ With Blasting, And With Mildew

"Blasting" and "mildew" are not medical words, they describe ruined crops.

A hot, dry wind could scorch a whole field in a single season.

"Mildew" describes a fungus that rots grain before it can even be harvested.

Disease attacking people and blight attacking crops appear together in this same list.

🌬️ Blasting means crops scorched by hot wind

🍄 Mildew means grain rotted by fungus

🌾 Both describe ruined crops, not sickness

📖 Disease and crop blight named side by side

---

## 🥉 Thy Heaven That Is Over Thy Head Shall Be Brass, And The Earth That Is Under Thee Shall Be Iron

Brass and iron are both hard metals that nothing can pass through.

A brass sky means no rain can get through to reach the ground.

Iron ground means no water can soak in even if rain came.

The picture describes a drought with absolutely no way out.

🥉 Brass sky means no rain gets through

⛏️ Iron ground means no water soaks in

🚫 Both directions of relief are blocked

📖 A drought with no way out

---

## 🌫️ The LORD Shall Make The Rain Of Thy Land Powder And Dust

Instead of water, the sky would drop dry powder and dust on the land.

This describes a severe drought turning into violent dust storms.

Crops could not grow in ground buried under dust instead of watered by rain.

The land itself would seem to be working against its own people.

🌫️ Powder and dust replaces rain

🌪️ Describes violent dust storms

🌱 Crops could not grow at all

📖 The land itself seems to turn against them

# Deuteronomy 28:25-29
# 😵 Defeat, Madness, And Blindness
---
## 🔁 The LORD Shall Cause Thee To Be Smitten Before Thine Enemies

This phrase repeats verse seven with the outcome completely reversed.

There, Israel's enemies were smitten before Israel's face.

Here, Israel itself is the one smitten instead.

The exact same wording marks exactly which side now loses.

🔁 This repeats verse seven exactly

🔀 The outcome is completely reversed

⚔️ Israel is now the one defeated

📖 Identical wording marks the reversal

---

## 🌍 Shalt Be Removed Into All The Kingdoms Of The Earth

This describes forced exile scattered across many different lands.

Losing a battle here does not stay local, it becomes worldwide dispersion.

Israel had been promised a single, specific homeland from the very beginning.

Losing it and scattering everywhere reversed that entire promise.

🌍 Removed means scattered across many lands

🏠 They had been promised one homeland

💔 Scattering reversed that entire promise

📖 Defeat here becomes worldwide exile

---

## 💀 Thy Carcase Shall Be Meat Unto All Fowls Of The Air

"Carcase" means a dead body left unburied on the ground.

Proper burial mattered deeply in this culture as a sign of honor and rest.

Leaving bodies exposed to birds was considered a horrifying, shameful fate.

"No man shall fray them away" means no one would even bother to protect the dead.

💀 Carcase means an unburied dead body

🕊️ Proper burial was a sign of honor

😱 Leaving it exposed was considered shameful

📖 No one would even chase the birds away

---

## 🩹 The LORD Will Smite Thee With The Botch Of Egypt, And With The Emerods

"Botch" means a painful boil or open sore on the skin.

"Emerods" is an old word for tumors, likely a painful swelling condition.

Naming this "the botch of Egypt" recalls the plagues God once sent against Israel's enemies.

The same category of suffering God once sent on Egypt now falls on Israel itself.

🩹 Botch means a painful boil

😣 Emerods means painful tumors

🇪🇬 This recalls the plagues on Egypt

📖 The same suffering now falls on Israel

---

## 🧠 The LORD Shall Smite Thee With Madness, And Blindness, And Astonishment Of Heart

These three words describe a mind falling apart under pressure, not just the body.

"Madness" means the mind losing clear thought entirely.

"Astonishment of heart" describes a deep, confused shock that will not lift.

The curses reach beyond physical suffering into mental and emotional collapse.

🧠 Madness means losing clear thought

👁️ Blindness is named again here

😨 Astonishment of heart means lasting shock

📖 Suffering reaches the mind, not just the body

---

## 🌞 Thou Shalt Grope At Noonday, As The Blind Gropeth In Darkness

"Grope" means feeling around blindly, unable to see where to step.

Noonday is the brightest part of the day, with the sun directly overhead.

Even in full daylight, this pictures a person as lost as someone blind at night.

The image captures total confusion, with no clear path forward at all.

🌞 Noonday means the brightest hour of the day

🕶️ Grope means feeling around blindly

🌑 As lost as someone blind at night

📖 Total confusion, no clear path forward

# Deuteronomy 28:30-35
# 💔 Everything Taken Away
---
## 💍 Thou Shalt Betroth A Wife, And Another Man Shall Lie With Her

"Betroth" means formally engaged to be married, a binding step in this culture.

This describes an engagement being violated by someone else entirely.

The loss here strikes at the most personal relationship a person has.

Even a promise that should have been secure would not hold.

💍 Betroth means formally engaged to marry

💔 The engagement is violated by another

😢 The loss strikes at a personal relationship

📖 Even secure promises would not hold

---

## 🏠 Thou Shalt Build An House, And Thou Shalt Not Dwell Therein

Building a house in this culture took real time, stone, wood, and labor.

"Dwell therein" simply means actually living inside it once it was finished.

This describes the finished house being taken away before anyone moved in.

Ancient treaties from this same era used this exact kind of curse.

🏠 Building a house took real time and labor

🚪 Dwell means actually living inside it

🚫 The finished house gets taken away

📖 Ancient treaties used this same kind of curse

---

## 🍇 Thou Shalt Plant A Vineyard, And Shalt Not Gather The Grapes

Planting a vineyard was a long term investment, taking years before the first harvest.

"Gather the grapes" means finally collecting the payoff for all that patient work.

This describes losing that payoff at the very last step.

The pattern matches the house curse just before it, labor without any reward.

🍇 Planting a vineyard took years to pay off

🧺 Gather means finally collecting the harvest

🚫 The payoff is lost at the last step

📖 Labor here ends without any reward

---

## 🐂 Thine Ox Shall Be Slain Before Thine Eyes, And Thou Shalt Not Eat Thereof

Watching an ox, a valuable working animal, killed in front of them added public humiliation.

Not being allowed to eat any of it made the loss feel completely pointless.

"Thine ass shall be violently taken away" describes plain robbery, not even a fair trade.

Every animal named here represented real daily survival, not just property.

🐂 Watching the ox killed added humiliation

🚫 Not eating it made the loss pointless

🫏 The ass describes plain robbery

📖 These animals meant daily survival

---

## 👶 Thy Sons And Thy Daughters Shall Be Given Unto Another People

This describes children being taken into slavery or given away entirely.

"Thine eyes shall look, and fail with longing for them" describes grief that never lets up.

Watching helplessly, unable to act, was part of the punishment itself.

"No might in thine hand" means total powerlessness to change any of it.

👶 Children taken into slavery or given away

😭 Longing all day describes constant grief

👀 Watching helplessly was part of the pain

📖 No might means total powerlessness

---

## 🌾 A Nation Which Thou Knowest Not Eat Up

Foreign strangers, not the family who planted the crop, would eat its harvest instead.

This reverses the normal order where labor and reward belong to the same people.

This verse widens what was already lost in the two verses just before it.

Every category of loss builds on the one before it.

🌾 Strangers eat the harvest instead

🔀 Labor and reward no longer match

📈 Each verse widens the loss already named

📖 Every loss builds on the one before

---

## 🦵 The LORD Shall Smite Thee In The Knees, And In The Legs, With A Sore Botch That Cannot Be Healed

This describes the same painful boils from verse twenty seven, now spreading further.

"From the sole of thy foot unto the top of thy head" means the disease covers the entire body.

"That cannot be healed" removes any hope of recovery this time.

Physical suffering here becomes total, with nowhere left untouched.

🦵 Knees and legs describe spreading disease

📏 Sole of foot to head means total coverage

🚫 Cannot be healed removes any hope

📖 Physical suffering becomes total here

# Deuteronomy 28:36-42
# 🦗 Exile And Ruined Harvests
---
## 👑 The LORD Shall Bring Thee, And Thy King Which Thou Shalt Set Over Thee, Unto A Nation Which Neither Thou Nor Thy Fathers Have Known

This names the king specifically, not just the ordinary people.

Even the highest leader in the nation would face this same exile.

"Which neither thou nor thy fathers have known" stresses how completely foreign this place would be.

No one alive would have any familiarity with where they were being taken.

👑 Even the king would face exile

🌍 A completely unfamiliar foreign land

📜 No ancestor had ever known this place

📖 No one alive would recognize where they landed

---

## 🪵 There Shalt Thou Serve Other Gods, Wood And Stone

"Wood and stone" describes idols made from ordinary lifeless material.

Serving gods carved from wood or cut from stone was a direct reversal of true worship.

The nation that once worshiped the living God would end up serving lifeless objects instead.

This exile was not just physical, it was spiritual as well.

🪵 Wood and stone describes lifeless idols

🔄 A direct reversal of true worship

💔 The living God traded for lifeless objects

📖 Exile here was spiritual, not just physical

---

## 😲 Thou Shalt Become An Astonishment, A Proverb, And A Byword

"Astonishment" means people would stare in shock at what happened to them.

"Proverb" and "byword" both mean Israel's name would become a cautionary saying repeated by others.

Other nations would use Israel's downfall as their own warning story.

A nation once meant to be a light to others would become a warning instead.

😲 Astonishment means shocked staring

📢 Proverb and byword mean a cautionary saying

🌍 Other nations would repeat their story

📖 A light to others becomes a warning instead

---

## 🌱 Thou Shalt Carry Much Seed Out Into The Field, And Shalt Gather But Little In

Sowing "much seed" describes real, hopeful effort at planting time.

"Gather but little in" describes that same effort producing almost nothing at harvest.

"For the locust shall consume it" names the exact cause, a swarm of crop destroying insects.

Locust swarms in this region could strip a field bare within hours.

🌱 Much seed means real hopeful effort

📉 Little gathered means the effort fails

🦗 Locust names the exact cause

📖 A swarm could strip a field within hours

---

## 🍇 Thou Shalt Plant Vineyards, And Dress Them, But Shalt Neither Drink Of The Wine

"Dress them" means the careful, ongoing work of pruning and tending a vineyard.

Years of that careful labor would still end in nothing to drink or sell.

"The worms shall eat them" names a different pest, one that destroys grapes specifically.

Two separate destroying pests appear in this passage, locusts on grain and worms on grapes.

🍇 Dress means careful ongoing vineyard work

🍷 Years of labor still end in nothing

🐛 Worms names a grape destroying pest

📖 Two separate pests ruin two separate crops

---

## 🫒 Thou Shalt Have Olive Trees Throughout All Thy Coasts, But Thou Shalt Not Anoint Thyself With The Oil

Olive oil was used daily in this culture for cooking, lamps, and anointing.

"Thine olive shall cast his fruit" describes the olives falling to the ground before they ripen.

A known problem in this region caused olive trees to drop fruit early in certain years.

Even having the trees would not guarantee any usable oil at all.

🫒 Olive oil was used daily in this culture

🍂 Cast his fruit means olives falling unripe

📆 A known regional problem with early drop

📖 Having the trees would not guarantee oil

---

## 👶 Thou Shalt Beget Sons And Daughters, But Thou Shalt Not Enjoy Them

This repeats the loss of children already named earlier in the chapter, in different words.

"For they shall go into captivity" states plainly where those children would end up.

The blessing of children promised back in verse four becomes a source of grief instead.

Nothing about family life was safe from this reversal.

👶 Repeats the earlier loss of children

⛓️ Captivity states plainly where they go

🔄 A promised blessing becomes a grief

📖 Family life was not safe from this

# Deuteronomy 28:43-48
# ⛓️ The Stranger Rises, The Yoke Of Iron
---
## 🧍 The Stranger That Is Within Thee Shall Get Up Above Thee Very High

A "stranger" here means a foreigner living among the Israelites, usually in a lower social position.

This verse describes that foreigner rising economically far above the native population.

"Thou shalt come down very low" describes Israel's own status falling at the same time.

A complete reversal of normal social order is described here.

🧍 Stranger means a foreigner living among them

📈 The foreigner rises economically instead

📉 Israel's own status falls at the same time

📖 A complete reversal of normal order

---

## 💰 He Shall Lend To Thee, And Thou Shalt Not Lend To Him

This phrase directly reverses the promise made back in verse twelve.

There, Israel was promised the position of lender to many nations.

Here, Israel becomes the borrower instead, dependent on a foreigner.

The exact same wording marks exactly how far the reversal goes.

💰 This reverses verse twelve exactly

📜 Israel was promised the lender's position

📉 Now Israel becomes the borrower instead

📖 Identical wording marks the full reversal

---

## 🥇 He Shall Be The Head, And Thou Shalt Be The Tail

This is the same head and tail picture from verse thirteen, reversed completely.

There, Israel was promised the leading position, the head.

Here, the foreigner leads and Israel is left following behind, the tail.

Every major promise in the blessing section now has its exact opposite here.

🥇 The same picture from verse thirteen returns

👑 Israel was promised the leading role

🐍 Now Israel follows behind instead

📖 Every blessing now has its opposite

---

## 🎯 Because Thou Servedst Not The LORD Thy God With Joyfulness

This verse finally names the deeper problem behind all these curses.

The issue was never just breaking individual rules here and there.

Serving God without real "joyfulness" and "gladness of heart" describes worship done reluctantly, like a chore.

God wanted willing hearts, not just technical obedience.

🎯 Names the deeper problem directly

📋 Not just about breaking individual rules

😐 Reluctant worship felt like a chore

📖 God wanted willing hearts, not routine

---

## 🐂 He Shall Put A Yoke Of Iron Upon Thy Neck

A "yoke" was a wooden bar placed on an animal's neck to force it to work.

Describing it as "iron" instead of wood makes the burden heavier and impossible to break.

This is a vivid picture of harsh, forced slavery under a foreign power.

"Until he have destroyed thee" shows this burden would not lift on its own.

🐂 Yoke means a bar that forces work

⛓️ Iron makes it heavier and unbreakable

😔 A vivid picture of forced slavery

📖 The burden would not lift on its own

---

## 🚩 They Shall Be Upon Thee For A Sign And For A Wonder

A "sign" in scripture usually points to a lesson meant for everyone watching.

This curse was never meant to stay private or be forgotten quickly.

"Upon thy seed for ever" means future generations would still see its effects.

Even centuries later, this warning was meant to still be remembered.

🚩 Sign means a lesson for everyone watching

👀 The curse was never meant to be private

👨‍👩‍👧 Seed for ever means future generations too

📖 The warning was meant to last centuries

# Deuteronomy 28:49-52
# 🦅 A Fierce Nation From Far Away
---
## 🗺️ The LORD Shall Bring A Nation Against Thee From Far, From The End Of The Earth

"From far, from the end of the earth" stresses just how distant this invading nation would be.

This was not a neighboring rival with a long standing feud.

A completely unfamiliar power would be the one to bring judgment.

Distance made the threat feel even more overwhelming and inescapable.

🗺️ End of the earth means very distant

🚫 Not a neighboring rival nation

❓ A completely unfamiliar power instead

📖 Distance made the threat feel inescapable

---

## 🦅 As Swift As The Eagle Flieth

An eagle diving toward its prey moves fast enough to give almost no warning.

This comparison describes an invasion arriving with terrifying speed.

There would be little time to prepare or to flee before it struck.

Many readers connect this description historically to later empires like Babylon or Rome.

🦅 An eagle dives with terrifying speed

⏱️ The invasion would arrive with little warning

🏃 Little time to prepare or flee

📖 Later empires are often connected to this image

---

## 🗣️ A Nation Whose Tongue Thou Shalt Not Understand

Not understanding the invader's language added confusion on top of fear.

Israel could not negotiate, plead, or even understand commands shouted at them.

This detail makes the coming disaster feel even more foreign and disorienting.

Language itself becomes part of the helplessness described here.

🗣️ Tongue means the invader's language

❓ Israel could not understand or negotiate

😰 This added confusion on top of fear

📖 Language itself became part of the helplessness

---

## 😠 A Nation Of Fierce Countenance, Which Shall Not Regard The Person Of The Old

"Fierce countenance" describes a harsh, merciless look and attitude.

This invading nation would show no special respect for the elderly.

It would also "shew favour" to no one, meaning no kindness even toward the young.

Normal human decency, expected even in war, would be completely absent here.

😠 Fierce countenance means a harsh, merciless look

👴 No special respect shown to the elderly

👶 No kindness shown even to the young

📖 Normal wartime decency would be absent

---

## 🏰 He Shall Besiege Thee In All Thy Gates, Until Thy High And Fenced Walls Come Down

"Besiege" means surrounding a city and cutting off food and supplies until it surrenders.

"Fenced walls" means the strong defensive walls Israel trusted for protection.

Even the tallest, strongest walls would eventually fail under this pressure.

Trusting in walls instead of God is quietly exposed as false security here.

🏰 Besiege means surrounding a city to starve it

🧱 Fenced walls means their strongest defenses

📉 Even the strongest walls would fail

📖 Trusting walls instead of God proves false

# Deuteronomy 28:53-57
# 😢 The Horror Of The Siege
---
## 😱 Thou Shalt Eat The Fruit Of Thine Own Body, The Flesh Of Thy Sons And Of Thy Daughters

This describes the horror of cannibalism during a prolonged, starving siege.

"In the siege, and in the straitness" names the desperate conditions causing it.

"Straitness" means being squeezed into an unbearably tight, desperate situation.

This exact horror is recorded as literally happening centuries later during real historical sieges of Israel's cities.

😱 Describes cannibalism during a starving siege

🏚️ Siege and straitness name the desperate cause

🤏 Straitness means squeezed into a desperate spot

📖 This horror is recorded happening in real history

---

## 🤲 The Man That Is Tender Among You, And Very Delicate

"Tender" and "delicate" both describe someone gentle, comfortable, and unused to hardship.

This introduces a man who would normally be the last person expected to act cruelly.

The verse sets up a contrast before showing exactly what happens to him.

Even the gentlest people were not exempt from this suffering.

🤲 Tender and delicate describe a gentle nature

🛋️ Someone unused to hardship or cruelty

⚠️ The verse sets up a contrast

📖 Even the gentlest were not exempt

---

## 👁️ His Eye Shall Be Evil Toward His Brother

An "evil eye" in this kind of phrase means jealousy and refusal to share.

Starvation would turn even this gentle man hostile toward his own family.

"The wife of his bosom" and his own children are named as targets too.

Extreme suffering here breaks even the closest family bonds.

👁️ Evil eye means jealousy and refusal to share

😠 Starvation turns him hostile to family

👪 Even his wife and children are named

📖 Suffering breaks even the closest bonds

---

## 📉 Because He Hath Nothing Left Him In The Siege

This explains exactly why even a compassionate father would refuse to share.

Total scarcity leaves no margin for generosity, only survival.

The verse explains how desperate things became.

It does not excuse the behavior.

Understanding the cause makes the warning more real, not less serious.

📉 Explains why kindness disappeared entirely

🚫 Total scarcity leaves no margin for sharing

⚖️ The verse explains the desperation, not the excuse

📖 Understanding the cause makes the warning heavier

---

## 🌸 The Tender And Delicate Woman Among You

This introduces a woman from a comfortable, sheltered background.

She is described with the same words used for the tender man earlier.

The chapter deliberately shows this curse falling on every kind of person.

No level of comfort in life would offer any real protection.

🌸 Describes a comfortable, sheltered background

🔁 The same words used for the man earlier

👥 The curse falls on every kind of person

📖 Comfort offered no real protection

---

## 👣 Would Not Adventure To Set The Sole Of Her Foot Upon The Ground

"Would not adventure" means she would normally avoid even walking outside barefoot.

This detail shows just how sheltered and comfortable her ordinary life had been.

The contrast makes what happens to her next even more shocking.

Someone this protected would still be driven to the same desperate horror as everyone else.

👣 Would not adventure means avoiding hardship

🌸 Shows how sheltered her life had been

😱 The contrast makes it more shocking

📖 Even the protected face the same horror

---

## 🤫 For She Shall Eat Them For Want Of All Things Secretly

"Secretly" reveals that even in a starving camp, this act still carried deep shame.

"For want of all things" repeats that total scarcity caused this, not cruelty.

Doing something this desperate in hiding shows the horror was recognized even by those doing it.

The chapter never treats this as normal, only as the depth of the curse.

🤫 Secretly shows deep shame even in famine

📉 Want of all things repeats total scarcity

😔 Even those doing it recognized the horror

📖 This is the depth of the curse

# Deuteronomy 28:58-63
# ☠️ Plagues Without End
---
## 🎯 That Thou Mayest Fear This Glorious And Fearful Name, THE LORD THY GOD

This verse states the purpose behind keeping every word of this law.

"Glorious and fearful" names God's character directly, worthy of both awe and reverence.

The written text itself, "this book," is described as carrying real authority.

Improper fear of God is named as the deeper issue behind everything that follows.

🎯 Names the purpose of keeping the law

✨ Glorious and fearful describes God's character

📜 This book carries real authority

📖 Improper fear is the deeper issue

---

## 😬 The LORD Will Make Thy Plagues Wonderful, And The Plagues Of Thy Seed

"Wonderful" here is used bitterly, meaning extraordinary in a terrible sense, not something good.

"Thy seed" means their children and future descendants, not just the people alive now.

The suffering described was never meant to stop with one single generation.

Even future generations were included in what this warning described.

😬 Wonderful here means terrible, not good

👨‍👩‍👧 Seed means children and future descendants

⏳ Suffering was not limited to one generation

📖 Future generations were included in this warning

---

## 📈 Even Great Plagues, And Of Long Continuance

This line stacks two separate qualities of the plagues together on purpose.

"Great" describes how severe each plague would be.

"Of long continuance" describes how long each one would last.

Severity and duration together made this warning as heavy as possible.

📈 Great describes how severe the plagues were

⏳ Long continuance describes how long they lasted

⚖️ Severity and duration stack together

📖 Together they made the warning heaviest

---

## 🇪🇬 He Will Bring Upon Thee All The Diseases Of Egypt, Which Thou Wast Afraid Of

Israel had already witnessed the ten plagues God once sent against Egypt firsthand.

Those same diseases, feared and remembered, would now strike Israel instead.

"Which thou wast afraid of" confirms Israel already knew exactly how bad this would be.

The nation once rescued from Egypt's plagues would now suffer the same fate.

🇪🇬 Israel had witnessed Egypt's ten plagues

😨 Those same diseases would strike Israel now

🧠 They already knew exactly how bad it was

📖 The rescued nation faces the same fate

---

## 📋 Every Sickness, And Every Plague, Which Is Not Written In The Book Of This Law

This verse adds an even wider category beyond what has already been named.

Even sicknesses never specifically listed in this chapter could still strike.

The warning was never meant to be a complete, limited checklist.

This detail makes the curse open ended, not a fixed list.

📋 Adds an even wider category of suffering

❓ Even unlisted sicknesses could still strike

🚫 The warning was never a fixed checklist

📖 This makes the curse open ended

---

## ⭐ Ye Shall Be Left Few In Number, Whereas Ye Were As The Stars Of Heaven For Multitude

God had promised Abraham that his descendants would be as countless as the stars.

This verse describes that same promise being reversed through disobedience.

A nation meant to grow into a vast multitude would instead shrink drastically.

Even a promise this old and this central could still be threatened by unfaithfulness.

⭐ Stars recalls God's promise to Abraham

📉 The promise gets reversed here

👥 A vast multitude would shrink instead

📖 Even ancient promises depended on faithfulness

---

## 🔁 As The LORD Rejoiced Over You To Do You Good, So The LORD Will Rejoice Over You To Destroy You

This is one of the most severe reversals in the entire chapter.

The same word, "rejoice," describes both God's blessing and God's judgment here.

This does not mean God enjoys punishing people out of cruelty.

It means God is fully committed either way, to blessing faithfulness or judging rebellion.

🔁 The same word describes both outcomes

😊 Rejoice over good describes God's blessing

⚖️ Rejoice to destroy describes God's judgment

📖 God is fully committed either way

# Deuteronomy 28:64-68
# 🌍 Scattered And Sold Again
---
## 🌍 The LORD Shall Scatter Thee Among All People, From The One End Of The Earth Even Unto The Other

This describes exile reaching the widest possible extent, not just nearby lands.

"From the one end of the earth even unto the other" leaves no place untouched.

This fulfills the same warning already given earlier in the chapter, now stated at full scale.

The scattering described here was total, not partial.

🌍 Scatter here reaches its widest extent

🗺️ No place on earth left untouched

🔁 This fulfills an earlier warning in full

📖 The scattering was total, not partial

---

## 🔁 There Thou Shalt Serve Other Gods, Which Neither Thou Nor Thy Fathers Have Known, Even Wood And Stone

This repeats the exact warning already given earlier in the chapter.

Lifeless idols made of wood and stone appear again here, word for word.

Spiritual exile, worshiping false gods, is treated as the deepest layer of the whole curse.

Physical scattering and spiritual loss are named together on purpose.

🔁 Repeats an earlier warning in the chapter

🪵 Wood and stone means lifeless idols again

💔 Spiritual loss runs the deepest here

📖 Physical and spiritual loss named together

---

## 🚶 Among These Nations Shalt Thou Find No Ease, Neither Shall The Sole Of Thy Foot Have Rest

"No ease" and "no rest" describe a life with no safe place to settle down.

Constant movement, fear, and uncertainty would replace the promised land's stability.

The sole of the foot resting was a simple picture of finally being safe somewhere.

That basic safety is exactly what gets taken away here.

🚶 No ease means no safe place to settle

😰 Constant fear replaces promised stability

👣 Resting feet is a picture of safety

📖 Basic safety itself gets taken away

---

## 💓 The LORD Shall Give Thee There A Trembling Heart, And Failing Of Eyes, And Sorrow Of Mind

These three phrases describe ongoing psychological suffering, not just outward hardship.

"Trembling heart" means constant anxiety that never settles.

"Failing of eyes" describes exhausted grief, eyes worn out from crying or watching for danger.

"Sorrow of mind" names the mental weight carried every single day in exile.

💓 Trembling heart means constant anxiety

👁️ Failing of eyes describes exhausted grief

🧠 Sorrow of mind names mental weight

📖 Suffering here reaches deep inside, not just outside

---

## 🌅 In The Morning Thou Shalt Say, Would God It Were Even! And At Even Thou Shalt Say, Would God It Were Morning!

This describes a despair so constant that no time of day brings any relief.

Morning feels unbearable, so evening seems better, but evening feels unbearable too.

"Would God" is an old way of saying "I wish" or "if only."

This line captures hopelessness better than almost any other verse in the whole chapter.

🌅 Morning feels unbearable in this despair

🌆 Evening seems better but is not either

🙏 Would God means I wish or if only

📖 This line captures total hopelessness

---

## 🇪🇬 The LORD Shall Bring Thee Into Egypt Again With Ships

Egypt was the very place God had already rescued Israel from long ago.

This verse describes them being sent right back into slavery there.

Moses had once told them plainly they would never see that road again.

Disobedience here undoes even the nation's most defining rescue story.

🇪🇬 Egypt was where God already rescued them

↩️ This sends them right back there

📜 Moses once said this would never happen

📖 Disobedience undoes their defining rescue story

---

## ⛓️ Ye Shall Be Sold Unto Your Enemies For Bondmen And Bondwomen

"Bondmen and bondwomen" means slaves owned as property.

"No man shall buy you" describes a fate even worse than ordinary slavery.

Being unwanted, even as property, means hitting the lowest possible point.

The chapter opened with the highest blessing and closes on this lowest curse.

⛓️ Bondmen and bondwomen means owned slaves

🚫 Unwanted is even lower than slavery

📉 Being unwanted is the lowest possible point

📖 Highest blessing ends in lowest curse
`.trim();

export const DEUTERONOMY_TWENTY_EIGHT_PERSONAL_SECTIONS = parseDeuteronomyTwentyEightRawNotes(DEUTERONOMY_TWENTY_EIGHT_RAW_NOTES);
