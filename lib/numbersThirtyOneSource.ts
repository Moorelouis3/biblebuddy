export type NumbersThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersThirtyOneRawNotes(rawText: string): NumbersThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+31:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 31 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+31:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+31:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 31 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 31,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 31:${startVerse}` : `Numbers 31:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Numbers 31 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_THIRTY_ONE_RAW_NOTES = `# Numbers 31:1-3
# ⚔️ The LORD Sends Israel To War
---
## ⚖️ Avenge The Children Of Israel Of The Midianites

Avenge means bringing real justice for a wrong, not simple revenge.

God is not asking Israel to settle a private grudge.

Midian worked with Moab to lure Israel into worshiping Baal of Peor.

That plan led to a plague that killed thousands of Israelites.

This war answers one specific sin.

⚖️ Avenge means justice, not simple revenge

🤝 Midian helped lure Israel into sin

☠️ A plague killed thousands afterward

📖 This war answers one specific sin

## ⏳ Afterward Shalt Thou Be Gathered Unto Thy People

This phrase is the Bible's gentle way of saying Moses will die.

God already told Moses this back in Numbers chapter twenty seven.

Leading this one battle is his last task before that happens.

Moses is not being punished here.

This is simply the final assignment of his life.

⏳ Gathered unto thy people means death

📜 God told Moses this earlier already

🎖️ This war is his last task

📖 A final mission, not a punishment

## 🎯 Avenge The LORD Of Midian

Moses passes God's command straight to the people.

He changes nothing on the way down.

The command says avenge the LORD.

It does not say avenge us.

This fight belongs to God first.

Volunteers now arm themselves for that fight.

🎯 God commands the vengeance, not Moses

🗣️ Moses repeats the order exactly

🙋 Men volunteer to arm themselves

📖 The fight belongs to God first

# Numbers 31:4-6
# 🎺 Twelve Thousand March To War
---
## ⚖️ Of Every Tribe A Thousand

God asks for an equal share of soldiers from every tribe.

No tribe carries the whole burden of this fight alone.

The twelve tribes descend from Jacob's twelve sons.

Each family line sends the exact same number of men.

⚖️ Every tribe sends the same number

👪 Twelve tribes trace back to Jacob

🤝 No tribe carries the burden alone

📖 Shared duty, not one tribe's war

## 🔢 Twelve Thousand Armed For War

Twelve thousand sounds like a large army.

Earlier census counts in this book number Israel's fighting men near six hundred thousand.

Twelve thousand is a tiny slice of that total force.

This is a focused strike, not Israel's full military might.

🔢 Twelve thousand men are called up

📊 Israel's full army was far larger

🎯 This is a focused strike force

📖 Not Israel's full military might

## 🔥 Phinehas The Son Of Eleazar The Priest

Phinehas already appears earlier in this book at Baal Peor.

He stopped a deadly plague there with one bold, zealous act.

Sending Phinehas here signals this war is finishing what he started.

His presence marks this as a holy mission, not just a raid.

🔥 Phinehas stopped the plague at Peor

🛡️ He now leads the priestly side

✝️ His presence marks a holy mission

📖 This war finishes what he started

## 🎺 The Holy Instruments, And The Trumpets To Blow In His Hand

"Holy instruments" likely refers to sacred items tied to the tabernacle's service.

Trumpets in Israel signaled battle commands and gathered the whole camp.

A priest carrying these into war was unusual.

It shows the LORD himself was marching with this army.

🎺 Trumpets signaled commands during battle

🕍 Holy instruments were tied to worship

🚶 A priest marching into war stood out

📖 God marched with this army too

# Numbers 31:7-9
# 🗡️ Midian Falls In Battle
---
## ⚔️ They Slew All The Males

Israel's army carries out total defeat against the Midianite forces they meet.

This was not simply a raid for plunder.

It was framed back in verse two as an act of justice.

The scale of the judgment matched the scale of Midian's earlier plot.

⚔️ Every Midianite male fighter fell

🎯 This was justice, not simple raiding

⚖️ The judgment matched the earlier plot

📖 A complete answer to a complete plan

## 👑 Evi, And Rekem, And Zur, And Hur, And Reba, Five Kings Of Midian

Midian was made up of several tribal groups.

Each group had its own king.

Naming all five shows this victory reached across the whole region.

Zur is the same name as the father of Cozbi in Numbers chapter twenty five.

Cozbi was the woman Phinehas killed to stop the plague.

This detail ties the battle directly back to that earlier sin.

👑 Midian had five separate tribal kings

🗺️ The victory reached the whole region

🔗 Zur was Cozbi's father from Peor

📖 The battle circles back to that sin

## 🔮 Balaam Also The Son Of Beor They Slew With The Sword

Balaam is the prophet hired earlier in this book to curse Israel.

God would not let him speak a curse.

So Balaam tried a different plan instead.

Numbers thirty one verse sixteen later blames the Peor scheme on him.

Balaam dies caught up in the very sin his advice caused.

🔮 Balaam once tried to curse Israel

💡 He later suggested the Peor scheme

☠️ He dies by his own plan

📖 His counsel finally caught up to him

## 👥 Took All The Women Of Midian Captives

Israel takes the women, children, animals, and goods as captives and plunder.

This sounds like a normal outcome for an ancient war.

But some of these very women had helped cause the Peor sin.

That fact becomes a serious problem a few verses from now.

👥 Women, children, and goods are captured

⚔️ This looked like a normal war outcome

⚠️ Some women were tied to Peor

📖 That fact causes trouble soon

# Numbers 31:10-12
# 🔥 Burning Midian's Camps
---
## 🏕️ Burnt All Their Cities Wherein They Dwelt, And All Their Goodly Castles

Midian was a nomadic and semi nomadic people, not usually city builders like Egypt.

"Cities" here likely means fortified camps and permanent settlements they had built.

"Goodly castles" means fine fortified strongholds, not castles like medieval Europe.

Burning them erased Midian's ability to regroup quickly.

🏕️ Cities means fortified camps and towns

🏰 Goodly castles means fine strongholds

🔥 Burning removed any base to regroup

📖 A complete end to that threat

## 📦 Took All The Spoil, And All The Prey

"Spoil" usually means captured goods, tents, and valuables.

"Prey" usually means captured living things, herds and people.

Together the two words cover everything Midian owned.

Nothing of value was left behind in the ruins.

📦 Spoil means captured goods and valuables

🐑 Prey means captured animals and people

🧾 Together the words cover everything owned

📖 Nothing valuable was left behind

## 🗺️ Unto The Camp At The Plains Of Moab, Which Are By Jordan Near Jericho

This is where Israel has been camped since the end of Numbers chapter twenty two.

It sits just east of the Jordan River, across from Jericho.

Israel stands on the very edge of the promised land here.

The army marches out to war and marches straight back to this same camp.

🗺️ Israel camps on the Jordan's east side

🏙️ Jericho sits just across the river

🚩 Israel stands at the edge of Canaan

📖 The army returns to this same camp

# Numbers 31:13-16
# 😠 Moses Confronts The Officers
---
## 🚧 Went Forth To Meet Them Without The Camp

Moses, Eleazar, and the leaders do not let the army straight back into camp.

Contact with battle and with the dead made soldiers ceremonially unclean.

Meeting them outside the camp kept that uncleanness from spreading inside.

This same rule returns later in verse nineteen of this chapter.

🚧 Uncleanness from war stayed outside camp

⚰️ Contact with the dead caused this

🧼 The rule protected the whole camp

📖 The same rule returns in verse nineteen

## 🔥 Moses Was Wroth With The Officers Of The Host

"Wroth" is an old word for deep, burning anger.

The army has just won a complete military victory.

Moses is furious anyway, which is unexpected at first read.

His anger is not really about the battle at all.

🔥 Wroth means deep burning anger

🏆 The army had just won completely

😲 His anger surprises a first reader

📖 The real issue was not the battle

## ❓ Have Ye Saved All The Women Alive

Moses asks one direct, accusing question.

Keeping the women alive left the exact danger from Peor untouched.

Sparing them was not mercy in this specific case.

It was leaving the source of Israel's sin standing.

❓ Moses asks one sharp question

⚠️ The women were the Peor danger

🚫 Sparing them was not real mercy

📖 The source of the sin remained

## 📜 Through The Counsel Of Balaam, To Commit Trespass Against The LORD

This verse states plainly what chapters twenty two through twenty five only hinted at.

Balaam could not curse Israel directly.

So he offered a different plan instead.

His advice was to draw Israel into idol worship through Midianite women.

That plan worked, and it cost Israel a deadly plague.

📜 This verse explains Balaam's real plan

🔮 He could not curse Israel directly

💔 He suggested seduction into idol worship

📖 That plan caused the deadly plague

# Numbers 31:17-20
# ⚰️ A Harsh Wartime Order
---
## ⚠️ Kill Every Male Among The Little Ones

This is one of the hardest commands in the whole Bible.

It is not a rule for every war Israel would ever fight.

It answers one specific plot that nearly destroyed Israel's covenant with God.

The command aims at removing that one threat completely.

It was not cruelty for its own sake.

⚠️ This is one of scripture's hardest verses

🚫 Not a rule for every war

🎯 It targets one specific threat

📖 Removing danger, not cruelty alone

## 🎯 Kill Every Woman That Hath Known Man By Lying With Him

"Known" here is an old word for sexual involvement.

This command targets one specific group of women.

These were the women old enough to have taken part in the Peor seduction.

Numbers chapter twenty five already showed exactly how that plan worked.

The command removes the group most directly tied to that sin.

🎯 This targets one specific group

🔗 These women were tied to Peor

📜 Chapter twenty five explains that plan

📖 The command answers that exact sin

## 👧 The Women Children, That Have Not Known A Man By Lying With Him, Keep Alive For Yourselves

Girls too young to have taken part in the Peor plan were spared.

They were absorbed into Israel rather than killed with the rest.

The word "known" is used here in the same sense as the verse before it.

Scripture does not spell out every detail of what came next for them.

👧 These girls were not part of Peor

🤝 They were spared and absorbed instead

🔤 Known repeats its meaning from before

➡️ Their exact new role is not stated

## 🗓️ Abide Without The Camp Seven Days

Anyone who killed a person, or touched a dead body, needed purification.

Numbers chapter nineteen already laid out this exact seven day process.

Special water made from a red heifer's ashes made a person clean again.

Even a fully justified war still left real ceremonial uncleanness behind.

🗓️ Seven days matches the law in Numbers nineteen

💧 Special ash water restored cleanness

⚰️ Touching the dead caused uncleanness

📖 Even justified war left real uncleanness

## 👕 Purify All Your Raiment

This verse expands purification beyond people to everyday belongings.

Raiment means clothing.

Skins means leather items like tents or bags.

Goat hair was commonly woven into tent fabric and rope in this culture.

Even wooden bowls, tools, and utensils needed this same cleansing.

👕 Raiment means clothing

👜 Skins means leather goods and tents

🧵 Goat hair was common tent fabric

📖 Even wood and tools needed cleansing

# Numbers 31:21-24
# 🔥 Eleazar's Law Of Purification
---
## 🗣️ This Is The Ordinance Of The Law Which The LORD Commanded Moses

Eleazar the priest is the one giving this teaching, not Moses.

Priests were responsible for teaching Israel the finer points of ceremonial law.

This is one of the rare moments Eleazar speaks with his own authority.

The rule still traces back to a command God gave Moses.

🗣️ Eleazar teaches this law himself

🕍 Priests taught the finer points of law

👤 A rare moment Eleazar speaks directly

📖 The command still traces back to God

## 🥇 Only The Gold, And The Silver, The Brass, The Iron, The Tin, And The Lead

This verse lists every metal type captured in the war.

Six different metals needed their own cleansing rule.

Listing them by name shows how careful this purification process was.

Nothing metal could simply be added back into daily use untouched.

🥇 Six different metals are named

🧾 Each metal needed its own rule

🔍 The process was careful and exact

📖 Nothing entered daily use untouched

## 🔥 Make It Go Through The Fire, And It Shall Be Clean

Metal that could survive fire was purified by fire itself.

Extreme heat was a proven way to destroy remaining impurity.

This may also have simply meant melting captured items down.

Melting down enemy valuables also erased any trace of pagan use.

🔥 Fire cleaned metal that could survive it

🌡️ Heat destroyed remaining impurity

🛠️ Melting may have erased pagan marks

📖 Fire made captured metal usable again

## 💧 It Shall Be Purified With The Water Of Separation

The "water of separation" is the same red heifer mixture from Numbers chapter nineteen.

Fire alone could not remove every kind of uncleanness.

Anything that could not survive fire still needed this water instead.

Two different methods reached the exact same clean result.

💧 Water of separation is from Numbers nineteen

🔥 Fire alone was not always enough

🪵 Wood and cloth used water instead

📖 Two methods reached one clean result

## 🧺 Wash Your Clothes On The Seventh Day

This final washing closes out the seven day process from verse nineteen.

Only after this step could a soldier finally reenter the camp.

The order moves from metal, to water, to personal clothing.

Nothing about a soldier's return was left unaddressed.

🧺 Final washing closes the process

🚪 Only then could soldiers reenter camp

📋 Metal, water, and clothing all covered

📖 Nothing about their return was skipped

# Numbers 31:25-27
# ⚖️ Dividing The Spoil In Half
---
## 🔢 Take The Sum Of The Prey

God orders an exact headcount and inventory before anything gets divided.

Moses, Eleazar, and the tribal leaders oversee the count together.

This mirrors the careful census language used throughout the book of Numbers.

An honest count made an honest division possible.

🔢 An exact count comes before dividing

👥 Moses, Eleazar, and leaders oversee it

📜 It matches Numbers' census language

➡️ An honest count enabled fair division

## ✂️ Divide The Prey Into Two Parts

The plunder splits evenly between the soldiers who fought and everyone else.

This was not the soldiers claiming all the reward for themselves.

An even split recognized that the whole nation shared the risk.

Fair division kept jealousy from splitting the camp instead.

✂️ The plunder splits into two halves

⚔️ One half goes to the soldiers

🏕️ The other half goes to everyone

📖 A fair split protected camp unity

## 🛡️ Between Them That Took The War Upon Them, And Between All The Congregation

Soldiers risked their lives directly on the battlefield.

Everyone else guarded the camp, the flocks, and the families left behind.

This same principle appears again later in First Samuel chapter thirty.

Staying to guard was still counted as real, shared service.

🛡️ Soldiers risked their lives directly

🏕️ Others guarded camp and families

🔁 First Samuel repeats this same idea

📖 Guarding counted as real service too

# Numbers 31:28-31
# 🎁 A Tribute For The Priests And Levites
---
## 🎁 Levy A Tribute Unto The LORD

A tribute here means a required gift set aside for God's service.

It was taken only from the soldiers' half of the plunder.

This was not a tax on the whole nation.

It applied only to the men who actually went to war.

🎁 Tribute means a required gift to God

⚔️ It came from the soldiers' half

🚫 It was not a tax on everyone

📖 Only the war fighters gave this

## 🔢 One Soul Of Five Hundred

This sets the tribute rate at one out of every five hundred.

That is a very small fraction, well under one percent.

Applying it to people, cattle, donkeys, and sheep alike kept the math simple.

A small consistent rate was easy to check and hard to argue with.

🔢 One of every five hundred was given

📉 That is a very small share

🐑 The same rate applied to every kind

📖 A simple rate was hard to dispute

## 🙌 Give It Unto Eleazar The Priest, For An Heave Offering Of The LORD

A "heave offering" was a gift lifted up and set apart for the priests.

The name comes from the physical motion of lifting it during the ritual.

Eleazar personally received this portion on behalf of Aaron's priestly family.

The priests depended on gifts like this one for their own support.

🙌 Heave offering means a lifted, set apart gift

👤 Eleazar received it for the priests

💰 Priests relied on gifts like this

📖 Worship and daily provision were linked

## 🔢 One Portion Of Fifty

This rate is ten times larger than the priests' tribute of one in five hundred.

The Levites were a much larger group than the priests alone.

They also carried the daily physical work of caring for the tabernacle.

A bigger group with a bigger job received a bigger share.

🔢 One in fifty is ten times more

👥 Levites were a much larger group

🕍 They carried the tabernacle's daily work

📖 Bigger work received a bigger share

# Numbers 31:32-35
# 📊 Counting Midian's Wealth
---
## 📦 The Booty, Being The Rest Of The Prey Which The Men Of War Had Caught

"Booty" and "prey" both describe everything captured during the war.

This verse begins the official total before any division happens.

Everything counted here still needs to be split in half.

The size of this number reveals just how wealthy Midian truly was.

📦 Booty and prey both mean plunder

🧮 This starts the official total count

✂️ Everything here still gets split later

📖 The number reveals Midian's real wealth

## 🐑 Six Hundred Thousand And Seventy Thousand And Five Thousand Sheep

This reads as six hundred and seventy five thousand sheep total.

That is an enormous flock for one people group to have owned.

Numbers this large would have taken generations of herding to build.

This single number shows how much Midian lost in one battle.

🐑 Six hundred seventy five thousand sheep total

📈 An enormous flock for one people

⏳ Generations of herding built that wealth

📖 One battle erased generations of wealth

## 🔢 Thirty And Two Thousand Persons In All, Of Women That Had Not Known Man

This is the total count of the surviving Midianite women and girls.

Scripture lists them here alongside sheep, cattle, and donkeys.

That placement in the list is a hard detail to read.

The Bible records the number honestly without softening it.

🔢 Thirty two thousand women and girls

📋 Listed alongside animals in this count

😔 A hard detail for a modern reader

📖 Scripture records it without softening it

# Numbers 31:36-41
# 🪖 The Soldiers' Share And Their Tribute
---
## ✂️ The Half, Which Was The Portion Of Them That Went Out To War

This verse restates the earlier total counts, cut exactly in half.

Three hundred thirty seven thousand five hundred sheep belonged to the soldiers.

The matching cattle and donkey numbers appear right after this verse.

Careful, matching math shows this record was kept with real precision.

✂️ The soldiers' half is listed here

🔢 Three hundred thirty seven thousand sheep

🧮 The numbers match the earlier total exactly

📖 Careful record keeping, not guesswork

## 🔤 The LORD's Tribute Of The Sheep Was Six Hundred And Threescore And Fifteen

"Threescore" is an old word for sixty.

Threescore and fifteen means seventy five.

Six hundred and seventy five is exactly one five hundredth of the soldiers' sheep total.

The math from verse twenty eight lines up perfectly here.

🔤 Threescore means sixty in old English

🔢 Six hundred seventy five sheep given

🧮 The math matches verse twenty eight exactly

📖 The same tiny rate applies here too

## 🐂 The Beeves Were Thirty And Six Thousand

Cattle and donkeys follow the exact same tribute pattern as the sheep.

Thirty six thousand cattle belonged to the soldiers' half.

Their tribute came to seventy two, matching the one in five hundred rate.

Thirty thousand five hundred donkeys followed the identical pattern with a tribute of sixty one.

🐂 Thirty six thousand cattle to soldiers

🫏 Thirty thousand five hundred donkeys too

🧮 Both followed the same tribute rate

📖 One rule applied to every animal

## 🔢 The Persons Were Sixteen Thousand

The same one in five hundred rule applied even to the captive people.

Sixteen thousand women and girls made up the soldiers' half.

Thirty two of them became the priestly tribute, just like the sheep and cattle.

Scripture does not explain what daily life then looked like for them.

🔢 Sixteen thousand women in the soldiers' half

🎁 Thirty two became the priests' tribute

😔 The same rule applied to people

➡️ Their daily life afterward is not described

## 🔁 As The LORD Commanded Moses

The phrase "as the LORD commanded Moses" repeats several times in this chapter.

It appears after the battle plan, the purification law, and now this tribute.

Each repetition marks a step where Moses obeyed without changing anything.

The chapter reads like a careful record of obedience, not just a war story.

🔁 This phrase repeats through the chapter

✅ Moses obeys at every single step

📜 Obedience is tracked, not just battle

📖 A record of obedience, not only war

# Numbers 31:42-47
# 🕍 The Congregation's Half And The Levites' Portion
---
## 🏕️ The Half That Pertained Unto The Congregation

This half belonged to everyone who stayed behind, not just the soldiers.

The numbers match the soldiers' half exactly.

Sheep, cattle, donkeys, and people are all counted again in full.

Repeating the same figures twice makes the equal split impossible to dispute.

🏕️ This half went to everyone else

🔢 The numbers match the soldiers' half

📋 Repeating them proves an equal split

📖 Staying home did not mean less

## 🔁 Moses Took One Portion Of Fifty

This is the exact same fifty to one rate already explained back in verse thirty.

The soldiers' half had funded the priests through Eleazar.

The congregation's half funds the Levites the very same way.

Two equal halves, two parallel systems, both fully accounted for.

🔁 The same fifty to one rate returns

⚔️ The soldiers' half had funded the priests

🏕️ The congregation's half funds the Levites

📖 Two equal systems, both fully accounted for

# Numbers 31:48-54
# 🥇 An Offering Of Thanks And Atonement
---
## 🎖️ The Officers Which Were Over Thousands Of The Host

These were the same military ranks organized back in verse fourteen.

Captains of thousands and captains of hundreds led different sized units.

This structure appears throughout Israel's early military organization.

The officers now approach Moses together, as a group.

🎖️ Same ranks named back in verse fourteen

👥 Captains led units of different sizes

🪖 This structure repeats through Israel's army

📖 The officers approach Moses as one group

## 🛡️ There Lacketh Not One Man Of Us

Twelve thousand men fought in this battle.

Not a single one of them died.

That outcome was remarkable for any ancient war.

The officers see this as proof of God's own protection over them.

🔢 Twelve thousand men went to fight

🛡️ Not one soldier died in battle

😲 A remarkable outcome for any war

📖 The officers credit God's protection

## 🎁 To Make An Atonement For Our Souls

"Oblation" is another word for an offering given to God.

The officers bring this gift even though no one in the army died.

They may have still felt the weight of the violence and bloodshed of war.

An atonement offering answered that weight, not a specific failure or sin.

🎁 Oblation means an offering to God

🕊️ Given even though no one died

💭 War's weight still needed answering

📖 Atonement, not punishment for a failure

## 💍 Jewels Of Gold, Chains, And Bracelets, Rings, Earrings, And Tablets

This verse names several kinds of personal gold jewelry.

Chains, bracelets, rings, and earrings were common in the ancient Near East.

"Tablets" likely means small decorative pendants worn on a cord.

These pieces were not military plunder.

They came from the officers' own belongings.

💍 Several kinds of gold jewelry are named

📿 Chains, bracelets, rings, and earrings listed

🔖 Tablets means small worn pendants

📖 These came from the officers themselves

## ⚖️ Sixteen Thousand Seven Hundred And Fifty Shekels

A shekel was a unit of weight, not a coin like modern money.

Sixteen thousand seven hundred fifty shekels of gold is an enormous total weight.

This total came only from the officers, not from the ordinary soldiers.

The size of the gift shows how seriously they took this atonement.

⚖️ A shekel measured weight, not a coin

🥇 A huge total weight of gold

🎖️ Given only by the officers

📖 A serious gift for a serious atonement

## 💰 For The Men Of War Had Taken Spoil, Every Man For Himself

Ordinary soldiers had already kept their own personal plunder from the battle.

This gold gift from the officers came in addition to that.

It was voluntary.

It came only from the leaders.

The officers gave something extra that nobody required of them.

💰 Soldiers already kept personal plunder

➕ This gold gift came on top of that

🙋 Only the officers gave it

📖 A voluntary gift nobody required

## 🕍 Brought It Into The Tabernacle Of The Congregation, For A Memorial

The gold does not become anyone's personal wealth.

It goes straight into the tabernacle, the tent where God met with Israel.

"Memorial" means something kept to help people remember an event later.

This gold stood as a lasting reminder that God brought Israel safely through this war.

🕍 The gold enters the tabernacle

🚫 It becomes no one's personal wealth

🧠 Memorial means a lasting reminder

📖 God brought Israel safely through this war
`.trim();

export const NUMBERS_THIRTY_ONE_PERSONAL_SECTIONS = parseNumbersThirtyOneRawNotes(NUMBERS_THIRTY_ONE_RAW_NOTES);
