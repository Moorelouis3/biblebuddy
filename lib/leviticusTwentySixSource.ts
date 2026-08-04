export type LeviticusTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusTwentySixRawNotes(rawText: string): LeviticusTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Leviticus 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Leviticus\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 26:${startVerse}` : `Leviticus 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Leviticus 26 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_TWENTY_SIX_RAW_NOTES = `# Leviticus 26:1-2
# 🚫 No Idols, Only The LORD
---
## 🗿 Ye Shall Make You No Idols Nor Graven Image

"Idol" means a false god that people worship in place of the real one.

"Graven" means cut or carved into stone or wood.

Both are banned before any blessing or curse in this chapter even begins.

Loyalty to God alone is the foundation everything else in the chapter stands on.

🗿 Graven means carved into stone or wood

🚫 Idols means false gods worshiped in God's place

🏗️ Comes first as the chapter's foundation

📖 Loyalty to God alone comes before everything else

## 🪨 Neither Rear You Up A Standing Image

A "standing image" was an upright stone pillar set up as a monument.

Jacob himself set up stone pillars earlier in Genesis as memorials.

The problem was never the stone itself.

Canaanite religion turned that same kind of pillar into an object people worshiped.

🪨 Standing image means an upright stone pillar

📖 Jacob used similar pillars in Genesis as memorials

⚠️ The stone itself was never the problem

➡️ Worshiping the object was what God banned

## 🙏 Ye Shall Keep My Sabbaths, And Reverence My Sanctuary

"Sabbaths" means the regular days and years of rest already commanded earlier in this book.

"Reverence" means treat with deep respect, not careless familiarity.

"Sanctuary" means the tabernacle, the tent where God's presence dwelled among the people.

This verse pairs right worship with right rest as one single command.

🙏 Sabbaths means the commanded rest days and years

⛺ Sanctuary means the tabernacle, God's dwelling place

🎯 Reverence means deep respect, not careless familiarity

📖 Right worship and right rest are paired here

## 🎙️ For I Am The LORD Your God

This short line closes the opening command.

It will return again and again through the rest of this chapter.

It marks both the worst curses and the final promise of mercy.

The phrase is not decoration.

It is the reason behind every single rule that follows.

🎙️ A closing tag repeated throughout Leviticus

🔁 Returns again at key turning points ahead

🎯 Grounds obedience in who God is

📖 Not decoration, but the reason for every rule

# Leviticus 26:3-6
# 🌧️ Rain, Harvest, And Peace
---
## 📜 If Ye Walk In My Statutes, And Keep My Commandments, And Do Them

This verse uses three separate verbs on purpose.

"Walk" pictures ongoing daily practice, not a single choice.

"Keep" means guard and hold onto something carefully over time.

"Do" means actually carrying it out, not just agreeing with it.

Knowing the law or admiring it was never the same as living it.

📜 Three separate verbs walk keep and do

🚶 Walk pictures ongoing daily practice

🤝 Keep means guarding something carefully over time

📖 Knowing a law differs from living it

## 🌧️ I Will Give You Rain In Due Season

Israel's farms depended entirely on rainfall arriving at the right times.

Egypt was different, since the Nile River flooded on its own predictable schedule.

"Due season" means the exact right timing a farmer could never control.

This promise covers the one resource Israelite farmers could never guarantee for themselves.

🌧️ Israel's farming depended on rainfall, not a river

🇪🇬 Egypt's Nile flooded on its own schedule

⏳ Due season means the exact right timing

📖 A promise covering what farmers could not control

## 🌾 The Land Shall Yield Her Increase, And The Trees Shall Yield Their Fruit

"Increase" means harvest or produce, the yield a field actually brings in.

This promise covers grain fields and fruit orchards together in one line.

Success is promised across every kind of farming the people depended on.

Nothing about their food supply is left out of this blessing.

🌾 Increase means harvest or crop yield

🌳 Covers grain fields and fruit trees together

🍽️ Touches the whole food supply at once

📖 Nothing about their farming is left out

## 🌾 Your Threshing Shall Reach Unto The Vintage, And The Vintage Unto The Sowing Time

"Threshing" means separating grain from its stalks after the spring harvest.

"Vintage" means the grape harvest, which normally came later in the year.

This verse pictures one harvest overlapping into the next without a gap.

Grain threshing would still be underway when grape season began.

Grape gathering would still be underway when it was time to plant again.

The farming calendar itself would be too full of abundance to keep its normal pace.

🌾 Threshing means separating grain from the stalk

🍇 Vintage means the fall grape harvest

⏳ One harvest overlaps into the next

📖 A calendar too full to slow down

## 🍞 Eat Your Bread To The Full, And Dwell In Your Land Safely

This is the plain human payoff behind all the farming language above.

"To the full" means real abundance at the table, not rationed scraps.

"Safely" adds security, the freedom to actually stay put without fear.

Good food and a safe home are named together as one blessing.

🍞 To the full means real abundance

🏡 Safely adds security to the promise

🎯 The human payoff behind the farming language

📖 Food and safety named together as one gift

## ☮️ I Will Give Peace In The Land... None Shall Make You Afraid

"Peace" here means more than just the absence of war.

It means a settled life where fear of attack is not part of daily living.

This sets up the specific fears the rest of the verse names one by one.

Daily security like this could not be bought or built by human effort alone.

☮️ Peace means a settled life, not war

😌 Daily fear of attack removed entirely

🏡 Sets up the specific fears named next

📖 Security no human effort alone could build

## 🐺 I Will Rid Evil Beasts Out Of The Land

Dangerous wild animals were a constant real threat in the ancient world.

They endangered both people and livestock, not just an occasional flock.

Removing every one of them was a serious practical blessing, not filler.

This promise protected daily life just as much as any harvest promise did.

🐺 Wild predators were a genuine daily danger

🐑 Protected both people and livestock together

🎯 A real practical blessing, not a small detail

📖 Daily safety mattered as much as any harvest

## ⚔️ Neither Shall The Sword Go Through Your Land

"The sword going through the land" pictures invasion and war moving across Israel's territory.

This closes the peace promise by naming the worst possible fear directly.

No foreign army marching through, killing and destroying as it advanced.

The whole picture of true peace is now complete.

⚔️ The sword pictures invasion moving through the land

🎯 Names the worst case fear directly

🏡 Completes the full picture of peace

📖 Peace here covers safety at every level

# Leviticus 26:7-10
# ⚔️ Victory And Abundance
---
## 🗡️ Ye Shall Chase Your Enemies, And They Shall Fall Before You By The Sword

This moves the promise from defense into offense.

It is not just safety from attack, but active victory whenever conflict comes.

Enemies would not simply fail to win.

They would be routed and driven back completely.

🗡️ Moves from staying safe to winning outright

🏃 Enemies fleeing, not just failing to attack

🎯 A promise of active victory

📖 Victory promised whenever conflict actually comes

## 🔢 Five Of You Shall Chase An Hundred

Five soldiers driving off a hundred enemies is a ratio of one to twenty.

That ratio alone is already far beyond normal battlefield odds.

"An hundred" is simply the old spelling of one hundred.

The chapter is about to make this ratio even more extreme in the very next line.

🔢 A ratio of one to twenty

💪 Already far beyond normal battlefield odds

📖 An hundred is the old spelling of hundred

➡️ A bigger ratio comes in the next verse

## 🔢 An Hundred Of You Shall Put Ten Thousand To Flight

The ratio jumps again here, five times steeper than the verse before it.

A hundred fighters routing ten thousand enemies is a ratio of one to a hundred.

The math is not meant to add up in any normal military sense.

It pictures strength multiplying far beyond ordinary numbers when God fights for His people.

🔢 A ratio of one to a hundred

🧮 Five times steeper than the verse before

🙏 Strength multiplying beyond ordinary numbers

📖 Pictures God fighting for His people directly

## 🙏 I Will Have Respect Unto You, And Make You Fruitful, And Multiply You

"Have respect unto" means God will look on His people with favor.

"Fruitful" and "multiply" echo the very first blessing given to humanity in Genesis one.

That same original blessing is now promised specifically to this obedient nation.

This is not a new promise but an old one being applied again.

🙏 Respect here means favor, not manners

👪 Fruitful and multiply echo Genesis one

🔗 Applies humanity's first blessing to this nation

📖 An old promise applied again to obedient Israel

## 🤝 Establish My Covenant With You

A "covenant" is a binding agreement with real obligations on both sides.

"Establish" means confirm and make firm, not create something brand new.

This points back to the covenant already made with Abraham generations earlier.

Obedience here keeps that older covenant in force, it does not replace it.

🤝 Covenant means a binding agreement, not a favor

✅ Establish means confirm, not start something new

📖 Points back to the covenant made with Abraham

➡️ Obedience keeps an old covenant in force

## 📦 Ye Shall Eat Old Store, And Bring Forth The Old Because Of The New

This pictures granaries so full that last year's surplus is still not used up.

By the time this year's fresh harvest comes in, old grain still remains.

Families would have to clear out old stock just to make room for the new.

It is a vivid image of abundance beyond anything already promised in this chapter.

📦 Granaries so full old grain remains unused

🌾 Old surplus cleared to make room for new

🎯 A vivid image of overflowing abundance

📖 Beyond anything already promised earlier in the chapter

# Leviticus 26:11-13
# ⛺ God Will Dwell Among You
---
## ⛺ I Will Set My Tabernacle Among You

The tabernacle was the portable tent sanctuary where God's presence dwelled among Israel.

This was not distant blessing sent from far away.

It was God's own presence physically located inside the Israelite camp.

No other promise in this chapter is more personal than this one.

⛺ Tabernacle means God's portable dwelling place

📍 Promises presence, not blessing from a distance

🏕️ Located physically inside the Israelite camp

📖 The most personal promise in this chapter

## 😌 My Soul Shall Not Abhor You

"Abhor" means to hate with real disgust, a very strong word.

This exact phrase returns later in the chapter describing the opposite outcome.

The contrast is placed here on purpose, ready to be felt later.

Right now, at the start, the promise is full acceptance.

😌 Abhor means to hate with disgust

🔗 This exact phrase returns later, reversed

⚠️ A deliberate contrast set up for later

📖 The promise here is full acceptance

## 🚶 I Will Walk Among You

This language echoes Genesis, where God walked with Adam and Eve in the garden.

Sin later broke that close and easy nearness between God and people.

The same kind of closeness is promised again here.

This time it comes through obedience, not through an unbroken beginning.

🚶 Echoes God walking with Adam and Eve

🌿 Sin had broken that early closeness

🔗 The same nearness offered again here

📖 This time it comes through obedience

## 🤝 Ye Shall Be My People

"I will be your God, and you will be my people" is a covenant formula.

It repeats across the Old Testament again and again in later books.

This is the simplest possible summary of the whole relationship this law protects.

🤝 A covenant formula repeated across the Old Testament

📖 Appears again and again in later books

🎯 The simplest summary of the whole relationship

➡️ Everything else in this law serves this bond

## 🇪🇬 Which Brought You Forth Out Of The Land Of Egypt

Every command in this chapter sits on top of this one historical fact.

God had already rescued Israel once, for free, before asking anything of them.

Obedience was always meant to be a response to rescue.

It was never meant to be a way of earning that rescue.

🇪🇬 The historical fact behind every command here

🎁 Rescue came first, before any command

🚫 Not a way of earning God's favor

📖 Obedience was always a response, not a payment

## ⛓️ That Ye Should Not Be Their Bondmen

"Bondmen" means slaves, people owned outright as property by someone else.

This states plainly what Israel had actually been rescued from.

It was not vague hardship in general.

It was literal forced slavery under a foreign empire.

⛓️ Bondmen means people owned as property

🇪🇬 States plainly what they were rescued from

🚫 Not vague hardship but literal slavery

📖 A specific, remembered rescue, not a metaphor

## 🔓 I Have Broken The Bands Of Your Yoke

A "yoke" is the wooden crossbar laid across an animal's neck.

It forced the animal to pull a heavy load against its will.

Calling it "your yoke" pictures Israel as a burden bearing animal under Egypt.

"Broken" means the forced labor has ended completely, not just eased.

🔓 Yoke means the crossbar that forces labor

🐂 Pictures Israel as a burden bearing animal

🎯 Broken means the labor ended completely

📖 Freedom here is total, not partial

## 🚶 Made You Go Upright

Someone forced to labor under a yoke walks bent low under the weight.

"Go upright" pictures the opposite of that bent, burdened posture.

It means walking with head held high, restored to real dignity.

Freedom here is described as a change in how a person carries their body.

🚶 A yoke bearer walks bent low

😔 Slavery pictured as a bowed down posture

🎯 Upright means restored dignity, not just release

📖 Freedom shown through how the body moves

# Leviticus 26:14-17
# 😨 The Curses Begin
---
## 👂 But If Ye Will Not Hearken Unto Me

"Hearken" means more than simply hearing words spoken out loud.

It means listening in a way that leads to actually obeying.

This one word marks the sharp turn from blessing into curse.

The rest of the chapter builds on this turning point.

👂 Hearken means listening that leads to obedience

🔄 Marks the sharp turn from blessing to curse

🎯 Simply hearing words was never the real issue

📖 The chapter builds on this turning point

## 😤 If Ye Shall Despise My Statutes

"Despise" means to treat something as worthless, not merely to disagree with it.

"Statutes" means the fixed rules God had already given Israel.

This describes active contempt, not honest confusion or a genuine struggle to obey.

😤 Despise means treating something as worthless

📜 Statutes means the fixed rules already given

🚫 Describes active contempt, not honest struggle

📖 A far stronger word than simple disagreement

## 😖 Or If Your Soul Abhor My Judgments

"Judgments" means the specific case by case rulings God had given Israel.

"Abhor" is the same strong word used later in this chapter.

There it describes what God's soul will not do, if the people obey.

Here the direction flips, since their own soul now does the abhorring.

😖 Judgments means specific case by case rulings

🔄 Abhor is the same word from verse eleven

🪞 Here their own soul does the abhorring

📖 A deliberate mirror of that earlier promise

## 💔 But That Ye Break My Covenant

A covenant is a binding agreement with real obligations on both sides.

"Break" means walking away entirely from obligations already agreed to.

It does not mean simply falling short of a standard by accident.

This is the most serious possible description of the offense in this list.

💔 Covenant means a binding two sided agreement

🚫 Break means walking away, not accidentally failing

🎯 The most serious description in this whole list

📖 A deliberate departure, not an honest mistake

## 😱 I Will Even Appoint Over You Terror

"Terror" here is a specific, appointed condition, not just occasional bad luck.

It means constant fear and dread hanging over daily life itself.

God names it directly as the very first consequence on this list.

😱 Terror means constant dread over daily life

🎯 Named as the very first consequence listed

📉 Not occasional bad luck but an ongoing state

📖 God names the cost plainly, without softening it

## 🤒 Consumption, And The Burning Ague, That Shall Consume The Eyes, And Cause Sorrow Of Heart

"Consumption" is an old name for a wasting disease that slowly destroys the body.

It is close to what is now called tuberculosis.

"Ague" is an old word for a recurring fever, complete with chills and shaking.

These illnesses would visibly waste the body, even affecting eyesight over time.

Physical sickness and crushed emotional strength are named together in the very same breath.

🤒 Consumption means a wasting, body destroying disease

🌡️ Ague means a recurring fever with chills

👁️ These illnesses were said to affect even eyesight

📖 Body and mind suffering named together

## 🌾 And Ye Shall Sow Your Seed In Vain, For Your Enemies Shall Eat It

This directly reverses the earlier promise of overflowing harvests in verse five.

The labor of planting would still happen exactly as before.

This time the harvest itself gets stolen before the farmer benefits from it.

Enemies eat the crop instead of the family who actually planted it.

🌾 Reverses the harvest blessing from verse five

😔 The work still happens, the reward is taken

🎯 Enemies eat the crop instead of the farmer

📖 A direct, deliberate undoing of an earlier promise

## 😠 And I Will Set My Face Against You

God's face turning toward someone in blessing is a common Old Testament image.

The clearest example is the priestly blessing found later in Numbers six.

Here that image flips completely, God's face now turns against His people instead.

This is active opposition, not simply withdrawn favor.

😠 God's face normally pictured shining in blessing

🎯 Active opposition, not just withdrawn favor

🔄 Here that image is reversed completely

📖 Echoes the priestly blessing later in Numbers six

## 🗡️ Ye Shall Be Slain Before Your Enemies, And They That Hate You Shall Reign Over You

Military defeat here is followed immediately by political domination.

This is not just losing individual battles here and there.

It means actually living under the control of nations they once feared.

Verse eight promised chasing enemies away, now that picture is reversed entirely.

🗡️ Military defeat followed by political domination

👑 Living under nations they once feared or beat

🔄 A direct reversal of verse eight's victory

📖 Losing control over their own nation entirely

## 🏃 And Ye Shall Flee When None Pursueth You

This describes pure paranoia, running in fear when no enemy is actually chasing.

Guilt and constant dread can make imagined danger feel completely real.

This exact phrase returns again later in the chapter, even more intense.

🏃 Running from a threat that is not there

😰 Guilt making imagined danger feel real

🔗 This exact phrase returns later, worse

📖 Fear itself becomes its own kind of curse

# Leviticus 26:18-20
# 🔢 Seven Times Over
---
## 🔢 Then I Will Punish You Seven Times More For Your Sins

"Seven times more" is a formula this chapter repeats four separate times.

Each repetition marks a new, more severe level of discipline.

Discipline escalates only after the previous level still goes unheeded.

This is the first use of that formula in the whole chapter.

🔢 A repeated formula, used four times total

📈 Each repeat marks a more severe level

⏳ Escalation comes only after being ignored

📖 The first use of this formula

## 💪 And I Will Break The Pride Of Your Power

"Pride of power" describes confidence in military strength and national ability to defend itself.

Breaking that pride means stripping away self reliant confidence entirely.

This targets their sense of security in themselves, not just their crops or homes.

💪 Pride of power means confidence in strength

🚫 Breaking it strips that confidence away entirely

🎯 Targets self reliance, not just crops

📖 Self security was never meant to replace God

## ⛓️ And I Will Make Your Heaven As Iron, And Your Earth As Brass

This pictures drought as vividly as possible.

The sky becomes like solid iron, through which no rain can ever fall.

The ground becomes like hardened brass, in which nothing can ever grow.

Both essential farming conditions fail completely at the very same time.

⛓️ Iron heaven means a sky rain cannot break

🥉 Brass earth means ground too hard for growth

🌾 Both farming essentials fail at once

📖 A drought pictured in the most vivid terms

## 💪 And Your Strength Shall Be Spent In Vain

All the physical labor of farming would still happen exactly as before.

None of that effort would produce any result at all.

This echoes the "sow in vain" idea from the previous section directly.

Labor itself is not being punished here, only its usefulness is removed.

💪 Full effort put in, nothing to show

🔗 Echoes the sow in vain idea earlier

🎯 Labor continues, its usefulness is removed

📖 Working hard would no longer guarantee any result

## 🌾 For Your Land Shall Not Yield Her Increase, Neither Shall The Trees Yield Their Fruits

This is a direct reversal of the exact blessing promised back in verse four.

It uses the very same wording, "yield her increase" and "yield their fruit."

Now that same language describes total agricultural failure instead of overflowing abundance.

🌾 A direct reversal of promise in verse four

🔄 Same wording, opposite outcome entirely

🎯 Total failure across fields and orchards together

📖 The exact blessing now undone word for word

# Leviticus 26:21-22
# 🐺 Wild Beasts
---
## ↔️ And If Ye Walk Contrary Unto Me

"Contrary" becomes this chapter's key repeated word from this point forward.

It pictures deliberate, ongoing resistance, not a single accidental mistake.

It means walking in the opposite direction from where God is leading, on purpose.

This word will keep returning through the rest of the chapter.

↔️ Contrary becomes a key repeated word here

🚶 Pictures deliberate resistance, not one slip

🔁 Keeps returning through the rest of the chapter

📖 Walking the opposite direction from God, on purpose

## 🔢 Then I Will Bring Seven Times More Plagues Upon You

This is the second use of the escalating "seven times" formula.

Here it is applied to "plagues," a broad general term for disaster.

It does not yet name one specific kind of affliction.

This step marks another rise from the previous level of discipline.

🔢 The second use of the seven times formula

🌍 Plagues here is a broad general term

📈 Marks another step up in discipline

📖 Still general, not naming one specific disaster yet

## 🐺 I Will Also Send Wild Beasts Among You

This directly reverses the earlier promise in verse six to remove dangerous animals.

What was once a promised protection now becomes an active threat instead.

The same blessing named earlier in the chapter is shown here completely undone.

🐺 A direct reversal of promise in verse six

🔄 Protection removed and turned into a danger

🎯 The same blessing now shown undone

📖 Nothing promised earlier is safe from reversal here

## 👶 Which Shall Rob You Of Your Children, And Destroy Your Cattle

This threat targets a family's most precious relationships and its basic livelihood together.

Children represent the family's future and its deepest love.

Cattle represent a family's practical, everyday economic survival.

Both losses are named side by side in the very same breath.

👶 Targets family and livelihood together

🐄 Cattle represented a family's basic survival

💔 Children represented the family's deepest love

📖 Two very different losses named side by side

## 🛣️ And Make You Few In Number, And Your High Ways Shall Be Desolate

"High ways" means the main roads used for travel and trade at the time.

Empty, unused roads picture a land devastated and emptied of people.

Normal travel, trade, and even pilgrimage to the tabernacle would simply stop happening.

🛣️ High ways means the main roads for travel

🚶 Empty roads picture a devastated, empty land

🎯 Even ordinary travel and trade would stop

📖 A way of life grinding to a halt

# Leviticus 26:23-26
# 🗡️ Siege And Famine
---
## 🔄 And If Ye Will Not Be Reformed By Me By These Things

"Reformed" means corrected, genuinely changed for the better.

This line asks a real question, is the discipline actually working.

Or is it simply being endured without any true turning back.

This sets up whether the escalation continues from here or finally stops.

🔄 Reformed means genuinely corrected, not just punished

❓ Asks whether the discipline is working

⏳ Sets up whether escalation continues or stops

📖 A real question, not a rhetorical one

## ↔️ Then Will I Also Walk Contrary Unto You

The word "contrary" was used of the people earlier in this chapter.

Here that same word is turned around and applied to God's own response.

God is pictured mirroring their own defiance back at them.

The punishment matches the shape of the original offense on purpose.

↔️ Contrary now describes God's own response

🪞 Pictures God mirroring their defiance back

🎯 The punishment matches the offense's shape

📖 Not random punishment but a deliberate mirror

## 🔢 And I Will Punish You Yet Seven Times For Your Sins

This is the third use of the "seven times" escalation formula.

It confirms the punishment is still climbing with each stage.

No sign yet appears of the people actually turning back.

🔢 The third use of the seven times formula

📈 Confirms the escalation is still climbing

🚫 No turning back has happened yet

📖 Discipline keeps rising as long as ignored

## ⚔️ And I Will Bring A Sword Upon You, That Shall Avenge The Quarrel Of My Covenant

"Quarrel of my covenant" pictures the broken agreement almost like a legal dispute.

The sword here enforces consequences the covenant itself had already warned about.

This is judgment being carried out, not random or meaningless violence.

⚔️ Quarrel pictures the covenant like a legal case

📜 The sword enforces what was already warned

🎯 Judgment carried out, not random violence

📖 The punishment was written into the agreement itself

## 🏙️ When Ye Are Gathered Together Within Your Cities, I Will Send The Pestilence, And Ye Shall Be Delivered Into The Hand Of The Enemy

Fleeing to walled cities for safety actually backfires in this verse.

Crowding everyone together inside city walls let disease spread far faster.

"Pestilence" means a fast spreading, deadly epidemic sweeping through the population.

"Delivered into the hand of the enemy" is an old idiom for total defeat.

The very shelter meant to protect the people would make things worse instead.

🏙️ Crowding into cities actually speeds up disease

🦠 Pestilence means a fast spreading epidemic

🤲 Delivered into the hand of means total defeat

📖 The shelter meant to protect made things worse

## 🍞 When I Have Broken The Staff Of Your Bread

"Staff" here means a support someone leans on for strength.

"Staff of bread" is an old idiom picturing bread as life's basic support.

Breaking it means the most fundamental food supply itself gives way completely.

🍞 Staff means a support leaned on for strength

🥖 Staff of bread means bread as basic support

🎯 Total food supply collapse, not a minor shortage

📖 The most basic need itself is what fails

## 👩‍🍳 Ten Women Shall Bake Your Bread In One Oven

Normally each household baked its own bread in its own oven at home.

Ten families sharing a single oven pictures famine at its most severe.

Fuel and grain had both become too scarce for anyone to bake separately.

👩‍🍳 Normally each household used its own oven

🔥 Ten households sharing one oven pictures extreme scarcity

🌾 Fuel and grain both too scarce alone

📖 A single image carrying the weight of famine

## ⚖️ And They Shall Deliver You Your Bread Again By Weight

Bread handed out "by weight" instead of freely available means strict rationing.

Portions would be small and carefully measured instead of a normal, generous supply.

A family could no longer simply count on having enough.

⚖️ By weight means strict rationing

📏 Small, carefully measured portions, not normal amounts

🎯 A vivid picture of famine level scarcity

📖 Enough food could no longer be assumed

## 😔 And Ye Shall Eat, And Not Be Satisfied

This directly reverses the earlier blessing of eating "to the full" in verse five.

Some food would exist in a small amount, but never truly enough.

The body could eat and still never actually feel fed or secure.

😔 Reverses the eat to the full promise

🍽️ Some food exists, never fully enough

🔄 The same idea from verse five, flipped

📖 Even eating would stop feeling like relief

# Leviticus 26:27-31
# 💀 The Horror Of Total Covenant Breach
---
## ↔️ And If Ye Will Not For All This Hearken Unto Me, But Walk Contrary Unto Me

This is the fourth and final warning cycle in this chapter.

It repeats the same "hearken" and "contrary" language used at each earlier turning point.

The chapter's most severe consequences are about to follow this line.

↔️ The fourth and final warning cycle here

🔁 Repeats language from each earlier turning point

⚠️ Sets up the most severe consequences yet

📖 The pattern has now run its full course

## 😡 Then I Will Walk Contrary Unto You Also In Fury

"Fury" marks a sharper, more intense tone than the earlier uses of "contrary."

This is no longer simply matching their defiance point for point.

It now comes with visible, burning anger behind it.

😡 Fury marks a sharper tone than before

🔥 No longer just matching defiance evenly

📈 The emotional intensity itself is escalating

📖 Anger here is named, not hidden

## 🔢 I, Even I, Will Chastise You Seven Times For Your Sins

This is the fourth and final use of the "seven times" formula.

"I, even I" doubles the emphasis on purpose, underlining who is speaking.

This final, worst level of discipline comes directly and personally from God.

🔢 The fourth and final seven times formula

🎯 I even I doubles the emphasis

😨 Marks the chapter's absolute worst level

📖 Discipline here is personal, not distant or automatic

## 😱 And Ye Shall Eat The Flesh Of Your Sons, And The Flesh Of Your Daughters Shall Ye Eat

This describes cannibalism during a prolonged siege, the worst possible result of famine.

Later Old Testament history actually records this exact horror happening during real sieges.

This warning was never exaggeration written only for effect.

It is the single most extreme consequence named anywhere in this chapter.

😱 Describes cannibalism during a prolonged siege

📖 Later history records this horror actually happening

🎯 The most extreme consequence in the chapter

➡️ A warning meant to be taken seriously

## 🏔️ And I Will Destroy Your High Places

"High places" were hilltop or elevated worship sites used across the land.

People sometimes used them for idol worship, even while claiming to worship the true God too.

Destroying them removes every rival place of worship at once.

🏔️ High places means elevated, often idolatrous worship sites

⚠️ Sometimes used by people claiming to worship God

🎯 Removes every rival worship site across the land

📖 No competing loyalty is allowed to remain standing

## 🪵 And Cut Down Your Images

"Images" here means carved wooden poles or figures used in idol worship.

These were often connected to the goddess Asherah in Canaanite religion.

Cutting them down destroys the physical objects of false worship completely.

🪵 Images means carved wooden idol poles

🕎 Often connected to Asherah worship in Canaan

🚫 Destroys the physical objects of false worship

📖 False worship removed down to its physical roots

## 💀 And Cast Your Carcases Upon The Carcases Of Your Idols

This deliberately defiles the very idols the people had once worshiped.

Human corpses would be piled directly on top of destroyed idol statues.

It is a graphic way of proving those idols had no real power at all.

Even their own worshipers could not be saved by them in the end.

💀 Corpses piled deliberately on top of idols

⚠️ A graphic proof of the idols' powerlessness

🎯 Not even their own worshipers could be saved

📖 False gods exposed as unable to protect anyone

## 🏚️ And I Will Make Your Cities Waste, And Bring Your Sanctuaries Unto Desolation

"Sanctuaries" here means local worship sites and shrines scattered across the land.

This is not limited to just the one central tabernacle.

Every place people gathered to worship, true or false, would end up in ruins.

🏚️ Sanctuaries means local worship sites, not just one

🌍 Covers every worship location across the land

💔 Total ruin, not the loss of one building

📖 Nothing sacred was left standing here

## 👃 I Will Not Smell The Savour Of Your Sweet Odours

Smelling the smoke of a sacrifice pictured God accepting an offering in the Old Testament.

Refusing to smell it means refusing to accept the worship being offered.

Even outwardly proper sacrifices would no longer be received at all.

👃 Smelling sacrifice smoke pictured God's acceptance

🚫 Refusing to smell means refusing the worship

🎯 Even proper sacrifices go unreceived here

📖 Empty ritual cannot substitute for a real relationship

# Leviticus 26:32-35
# 🏜️ The Land Gets Its Rest
---
## 🏜️ I Will Bring The Land Into Desolation

"Desolation" means left empty and ruined, uninhabited and unproductive.

This zooms out from individual disasters to the entire land's final condition.

It is the summary result of everything already listed earlier in the chapter.

🏜️ Desolation means left empty and unproductive

🌍 Zooms out to the land's overall condition

🎯 The summary of everything listed so far

📖 One word covering the sum total of loss

## 😲 And Your Enemies Which Dwell Therein Shall Be Astonished At It

Even the foreign nations who conquer and move into the land will be shocked.

The destruction would be severe enough to stun even the people who caused it.

This small detail makes the desolation feel even more extreme by comparison.

😲 Even the conquerors react with shock

🌍 The devastation stuns outsiders too

🎯 A detail that deepens the sense of ruin

📖 Not even the winners come away untouched

## 🌍 I Will Scatter You Among The Heathen

"Heathen" is an old word for foreign, non Israelite nations.

"Scatter" describes exile, being spread across many different foreign lands at once.

This is not staying together as one captive group in a single place.

🌍 Heathen means foreign, non Israelite nations

🔀 Scatter pictures exile spread across many places

🚫 Not one captive group, but many scattered ones

📖 A specific, named prediction of Israel's later exile

## ⚔️ And Will Draw Out A Sword After You

Even scattered into exile, ongoing danger would still follow the people.

Exile does not mean the threats already named simply stop happening.

It only means the danger changes location instead of disappearing.

⚔️ Danger follows even into exile

🌍 Exile changes location, not the threat itself

🎯 Consequences reach beyond Israel's own borders

📖 Safety was never found by simply leaving

## 🏚️ And Your Land Shall Be Desolate, And Your Cities Waste

This repeats and confirms the desolation already described earlier in the chapter.

It is now specifically tied to the scattering described in the verse just before.

An empty land is left behind while its people live exiled far away.

🏚️ Repeats the desolation described earlier

🔗 Tied now to the scattering just mentioned

🏡 An empty homeland left behind

📖 Exile and desolation form one whole loss

## 😴 Then Shall The Land Enjoy Her Sabbaths, As Long As It Lieth Desolate

This directly recalls the sabbatical year law given in the previous chapter.

The land would finally receive the regular rest years it had been denied.

That rest only becomes possible once no one remains to keep farming it.

😴 Recalls the sabbatical law from chapter twenty five

🌾 The land finally receives the rest denied

🔗 Only possible once farming stops entirely

📖 Even the ground had a debt to collect

## 🌍 And Ye Be In Your Enemies' Land, Even Then Shall The Land Rest

The people would suffer far from home in a foreign land.

Meanwhile the land they left behind would finally experience the rest denied it.

This detail is bittersweet, since rest only comes through the people's absence.

🌍 People suffer abroad while their land rests

😔 Bittersweet, since rest comes through absence

🔗 Ties the people's exile to the land's healing

📖 The land recovers precisely because they are gone

## 📊 As Long As It Lieth Desolate It Shall Rest, Because It Did Not Rest In Your Sabbaths

This draws a direct line between the length of exile and skipped rest years.

Later in the Old Testament, the Babylonian exile lasted exactly seventy years.

Scripture explicitly says that number matched the sabbath years Israel had ignored.

This warning turned out to be precise, not vague or symbolic.

📊 Links exile length to skipped sabbath years

📖 Later fulfilled exactly in the seventy year exile

🎯 Shows this warning came true precisely

➡️ Numbers here were never just decoration

# Leviticus 26:36-39
# 🍃 Fear In The Land Of Enemies
---
## 😰 Upon Them That Are Left Alive Of You I Will Send A Faintness Into Their Hearts

"Faintness" describes a crippling, constant anxiety, not fear that comes and goes.

It is a heavy dread that never fully lifts from a person's mind.

This affects even the survivors who made it through everything already described.

😰 Faintness means a crippling, ongoing anxiety

💔 Not ordinary fear, but dread that never lifts

🎯 Affects even survivors of everything already described

📖 Survival alone did not bring any real relief

## 🍃 The Sound Of A Shaken Leaf Shall Chase Them

This pictures extreme, irrational paranoia at its most vivid.

People become so consumed by dread that a small rustling leaf triggers terror.

They run as if it were an actual attacker chasing them.

🍃 Even a rustling leaf triggers panic

😨 Pictures paranoia disconnected from real danger

🎯 One of the most vivid images here

📖 Guilt can manufacture danger that is not real

## 🏃 They Shall Flee, As Fleeing From A Sword, And They Shall Fall When None Pursueth

This repeats the exact phrase already used earlier in verse seventeen.

The same paranoia named before has now grown even more extreme in exile.

Panic and collapse happen here with no real threat actually present.

🏃 Repeats the exact phrase from verse seventeen

🔗 Shows the same fear grown even more extreme

😨 Collapse happens with no real threat present

📖 Fear compounds the longer it goes unresolved

## 💥 And They Shall Fall One Upon Another, As It Were Before A Sword, When None Pursueth

The panic becomes so widespread that people trample into one another while fleeing.

There is no actual enemy causing any of this chaos.

It is caused entirely by fear itself, feeding on the fear around it.

💥 People trample each other fleeing nothing real

😱 Chaos caused entirely by fear itself

🎯 Shows how deeply guilt and dread had spread

📖 Fear became its own kind of enemy

## 🛡️ And Ye Shall Have No Power To Stand Before Your Enemies

Beyond the paranoia, real military weakness would remain just as true.

Even in situations that genuinely called for defense, no strength would be left.

Paranoia and actual defeat are named together in the very same breath.

🛡️ Describes real weakness, not just fear

⚔️ Even real threats could no longer be resisted

🎯 Paranoia and actual defeat named together

📖 Both the mind and army had given out

## 🌍 And Ye Shall Perish Among The Heathen, And The Land Of Your Enemies Shall Eat You Up

"Eat you up" is an idiom picturing the foreign land itself as something hostile.

It pictures a land that consumes and destroys the people living in it.

This is not a literal claim about the land, but a vivid warning image.

Exile here is pictured as an actively devouring place, not a neutral relocation.

🌍 Eat you up pictures the land as hostile

💀 Exile shown as devouring, not neutral

🎯 A vivid idiom, not a literal claim

📖 Even the ground would feel like an enemy

## 📉 And They That Are Left Of You Shall Pine Away In Their Iniquity

"Pine away" is an old phrase meaning to waste away slowly over time.

This describes gradual physical and emotional decline, not sudden loss all at once.

"Iniquity" means sin or guilt, the weight carried through that slow decline.

📉 Pine away means wasting away slowly

⏳ A long, gradual decline, not a sudden one

📖 Iniquity means sin or guilt weighing on them

➡️ Suffering here stretches out rather than ending quickly

## 👪 And Also In The Iniquities Of Their Fathers Shall They Pine Away With Them

This is not about being punished directly for a parent's own sin.

It describes continuing in the very same patterns of sin passed down across generations.

Consequences from those patterns keep compounding the longer they go unaddressed.

👪 Not punishment for someone else's sin directly

🔁 Describes continuing the same sin patterns

📈 Consequences compound the longer a pattern repeats

📖 Old patterns left unaddressed keep collecting new weight

# Leviticus 26:40-45
# 🕊️ If They Confess: God Remembers His Covenant
---
## 🗣️ If They Shall Confess Their Iniquity, And The Iniquity Of Their Fathers

"Confess" means openly admitting wrongdoing, not just feeling bad in private.

"Iniquity" means sin or guilt, the weight of wrongdoing carried forward.

This marks the turning point of the entire chapter.

It is the first condition given for the long discipline finally ending.

🗣️ Confess means openly admitting wrongdoing

🔄 Marks the chapter's turning point

👪 Includes owning generational patterns, not just personal sin

📖 The first condition for the discipline to end

## ⚖️ With Their Trespass Which They Trespassed Against Me

"Trespass" means a violation or offense committed against someone else.

The word is repeated twice in this one short phrase on purpose.

That repetition emphasizes taking full ownership of the specific wrong done.

It is specific responsibility, not a vague sense that something bad happened.

⚖️ Trespass means a violation against someone

🔁 Repeating the word emphasizes full ownership

🎯 Specific responsibility, not vague acknowledgment

📖 Confession names the exact wrong, not a feeling

## ↔️ That Also They Have Walked Contrary Unto Me

This is the final use of "contrary" describing the people themselves in this chapter.

The word has appeared repeatedly through the curses to describe their defiance.

Here it becomes part of their own honest confession instead.

↔️ The final use of contrary for the people

🔁 Completes a pattern repeated through the chapter

🗣️ Their defiance word becomes their own confession

📖 The same word now spoken with humility

## 🪞 And That I Also Have Walked Contrary Unto Them

God openly acknowledges mirroring their own defiance back at them throughout.

This names the discipline plainly as matched to the offense, not random.

It is honesty about the shape of the punishment, not just its cause.

🪞 God acknowledges mirroring their behavior

⚖️ Names the punishment as matched, not random

🎯 Honesty about the shape of the discipline

📖 Even God's own actions are named plainly here

## 🌍 Have Brought Them Into The Land Of Their Enemies

This restates the exile already described earlier in the chapter.

Here it gets reframed as the very setting where real change becomes possible.

Exile is not the end of the story, but a turning point within it.

🌍 Restates the exile described earlier

🔄 Reframed here as the setting for change

🎯 Not the ending, but a turning point

📖 Even the hardest circumstance still had a purpose

## 💔 If Then Their Uncircumcised Hearts Be Humbled, And They Accept Of The Punishment Of Their Iniquity

"Uncircumcised heart" is an idiom, not a literal physical description.

It pictures a heart that has not been set apart for God, still resistant.

"Humbled" means that resistance finally breaking down and giving way.

Accepting the punishment means owning it as fair, not resenting or blaming God for it.

💔 Uncircumcised heart pictures ongoing resistance

🚫 Not a literal description, but an idiom

✅ Humbled means resistance finally breaking down

📖 A real internal shift, not just outward words

## 📖 Then Will I Remember My Covenant With Jacob, And Also My Covenant With Isaac, And Also My Covenant With Abraham

These three names are listed backward from their usual order in scripture.

Normally Abraham comes first, then Isaac, then Jacob follows last.

Naming them in reverse here works backward through the generations on purpose.

It traces the promise back to its very beginning, one name at a time.

📖 Listed in reverse of the usual order

🔙 Works backward through the generations

🎯 Traces the promise to its beginning

➡️ A small literary detail easy to miss

## 🌍 I Will Remember The Land

"Remember" does not mean God had simply forgotten something for a while.

It means God will now act on a promise that had appeared inactive.

The land itself, not only the people, is included in what gets restored.

🌍 Remember means acting, not merely recalling

🔗 The land itself is included in the restoration

🎯 Ties the people's future to their homeland's future

📖 God's promises reach even the ground itself

## 🏜️ The Land Also Shall Be Left Of Them, And Shall Enjoy Her Sabbaths, While She Lieth Desolate

This restates the earlier point about the land finally resting.

It is placed here right alongside the promise of eventual restoration.

The desolation was never described as permanent in this chapter.

It only lasts exactly as long as it needs to.

🏜️ Restates the land finally resting

⏳ Placed beside the promise of restoration

🎯 Desolation shown as temporary, not permanent

📖 Even judgment here has a built in ending

## 🙏 And Yet For All That, When They Be In The Land Of Their Enemies, I Will Not Cast Them Away, Neither Will I Abhor Them, To Destroy Them Utterly

Despite everything already described, God commits here to not fully abandoning His people.

"Abhor" is the same strong word used earlier in the chapter for total rejection.

Here it stops short of the worst possible outcome, complete destruction.

Even at their lowest point, total rejection is explicitly ruled out.

🙏 A firm commitment despite everything described

😌 The same strong word abhor used earlier

🛑 Stops short of total destruction

📖 Mercy stated even after the harshest consequences

## 🤝 Neither Break My Covenant With Them: For I Am The LORD Their God

The people had already broken the covenant themselves back in verse fifteen.

Here God commits to not responding the very same way.

Keeping the agreement is framed as who God simply is.

It is not something conditional on the people's behavior first.

🤝 The people broke the covenant first

🙏 God commits to not doing the same

🎯 Faithfulness framed as who God is

📖 Not conditional on their behavior alone

## 📖 But I Will For Their Sakes Remember The Covenant Of Their Ancestors, Whom I Brought Forth Out Of The Land Of Egypt In The Sight Of The Heathen

The reason given here is not their good behavior, past or future.

It is the ancestors' original covenant relationship, honored across many generations.

"In the sight of the heathen" means the Exodus was a public event other nations witnessed.

God's own reputation among those watching nations was tied to keeping that old promise.

📖 The reason is the ancestors' covenant, not merit

👀 The Exodus was a public event nations saw

🌍 God's reputation among nations was on the line

➡️ Mercy rooted in an old promise, not merit

## 🙏 That I Might Be Their God: I Am The LORD

The chapter's central relationship formula returns here one final time.

It closes this whole section on the same note it opened with in verse twelve.

The entire point was always the relationship itself, not rewards or punishments alone.

🙏 The relationship formula returns one final time

🔁 Closes on the same note as verse twelve

🎯 The relationship itself was always the point

📖 Everything else in the chapter served this bond

# Leviticus 26:46
# 📜 The Statutes Given At Sinai
---
## 📜 These Are The Statutes, And Judgments, And Laws

Three separate legal terms are bundled together in this one closing line.

"Statutes" means fixed rules that do not change from case to case.

"Judgments" means case by case rulings applied to specific situations.

"Laws" is the broadest term here, covering both of the others together.

📜 Statutes means fixed rules for every case

⚖️ Judgments means rulings for specific situations

🎯 Laws is the broadest term, covering both

📖 One closing line summarizing this entire section

## 🏔️ Which The LORD Made Between Him And The Children Of Israel In Mount Sinai By The Hand Of Moses

This closing line works like a signature on a long legal document.

It marks the formal end of this whole section of the book.

"By the hand of Moses" credits him only as the messenger of these laws.

Moses delivered them, but he was never their actual source.

🏔️ Functions like a signature closing this section

✍️ By the hand of Moses names the messenger

🚫 Moses was never the source of the laws

📖 A formal end to the whole Sinai section
`.trim();

export const LEVITICUS_TWENTY_SIX_PERSONAL_SECTIONS = parseLeviticusTwentySixRawNotes(LEVITICUS_TWENTY_SIX_RAW_NOTES);
