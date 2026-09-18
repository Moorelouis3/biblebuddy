export type PsalmsSeventyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSeventyEightRawNotes(rawText: string): PsalmsSeventyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSeventyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+78:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 78 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+78:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+78:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 78 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 78,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 78:${startVerse}` : `Psalms 78:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 14) {
    throw new Error("Expected 14 Psalms 78 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SEVENTY_EIGHT_RAW_NOTES = `# Psalms 78:1-4
# 🗣️ A Parable Passed Down
---
## 📚 Give Ear, O My People, To My Law

"Law" here does not mean a list of legal rules only.

It translates a Hebrew word, torah, that means teaching or instruction.

Give ear means listen closely, the way you would lean in for something important.

The psalmist is opening like a teacher calling a class to attention.

📚 Law here means torah or teaching
👂 Give ear means listen closely
🏫 The psalmist opens like a teacher
📖 Attention comes before instruction

## 📝 I Will Utter Dark Sayings Of Old

A parable here does not mean a short made up story.

It means a poem packed with deep meaning that takes real thought to unpack.

Dark sayings means riddles or hidden truths, not something evil.

The psalmist promises to teach history in a way that makes the listener think.

This whole psalm is about to retell Israel's story with that kind of weight.

📝 Parable means a poem full of meaning
🌑 Dark sayings means riddles, not evil
🤔 The listener has to think, not just hear
📖 History is about to be retold with weight

## 👂 Which We Have Heard And Known, And Our Fathers Have Told Us

This is not something the psalmist personally witnessed.

It is a story passed down by word of mouth from parents to children.

Ancient Israel had no printing press or widespread written texts for ordinary families.

Memory and retelling were how this history survived at all.

👂 Heard and known means received, not witnessed
🗣️ Fathers told us means oral tradition
📚 No printing press existed back then
📖 Memory carried this history forward

## 👁️ Shewing To The Generation To Come The Praises Of The LORD

"Shewing" is an old spelling of showing, meaning to make plainly known.

The psalmist commits to passing this same story on to children not yet born.

The praises of the LORD, his strength, and his wonderful works are named as the actual content.

This was never meant to stop with one generation.

👁️ Shewing means showing or making known
👶 The story goes to children not yet born
💪 God's strength and works are the content
📖 The story was never meant to stop

# Psalms 78:5-8
# 📜 So The Next Generation Would Know
---
## 📜 He Established A Testimony In Jacob

A testimony here means a set of instructions meant to be remembered and obeyed.

Jacob and Israel are the same nation, named for the same man under two different names.

God did not leave these instructions optional or open to guessing.

He commanded the fathers to pass them straight to their children.

📜 Testimony means instructions to remember
👤 Jacob and Israel name the same nation
📢 God commanded, he did not suggest
📖 Instructions were meant to be passed down

## 🔗 Who Should Arise And Declare Them To Their Children

This verse describes a chain stretching across at least three future generations.

Children not yet born are already included in the plan.

Each generation carries the responsibility to teach the next one.

No single generation was ever meant to be the last link in that chain.

🔗 A chain across three future generations
👶 Unborn children are already included
👪 Each generation teaches the next
📖 No generation was the last link

## 🎯 That They Might Set Their Hope In God

The whole purpose of retelling history was never just information.

It was so hope would land on the right place, God himself.

Forgetting God's works and hope in God are connected in this verse on purpose.

A people who remember what God has done find it easier to trust him now.

🎯 The purpose was never just facts
🙏 Hope was meant to land on God
🧠 Memory and trust are connected here
📖 Remembering makes trusting easier

## 🧱 A Stubborn And Rebellious Generation

Stubborn here means refusing correction even when it is clearly needed.

Rebellious means actively resisting authority, not just disagreeing quietly.

This phrase names the specific failure the psalm is trying to prevent from repeating.

The rest of the psalm will show exactly what that stubbornness looked like in real history.

🧱 Stubborn means refusing correction
⚔️ Rebellious means actively resisting authority
🎯 This names the failure to avoid
📖 History will show what it looked like

## 🧭 Whose Spirit Was Not Stedfast With God

Stedfast is an old spelling of steadfast, meaning loyal and unmoving.

Heart not aright means their inner devotion was crooked, not pointed straight at God.

A spirit that is not stedfast drifts whenever life gets hard.

This is the warning the whole psalm is written to avoid repeating.

🧭 Stedfast means loyal and unmoving
💔 Heart not aright means crooked devotion
🌬️ An unstedfast spirit drifts under pressure
📖 This is the warning the psalm avoids

# Psalms 78:9-11
# 🏹 Ephraim Turned Back
---
## 🏹 The Children Of Ephraim, Being Armed, And Carrying Bows, Turned Back

Ephraim was one of the twelve tribes of Israel, descended from Joseph's son of the same name.

This verse describes armed archers running from a fight instead of standing their ground.

The Bible does not say exactly which battle this refers to.

Many scholars believe it points to a specific failure not recorded in detail elsewhere.

Cowardice here stands in for a much bigger pattern of unfaithfulness about to be described.

🏹 Ephraim was one of Israel's twelve tribes
🏃 Armed archers fled instead of fighting
❓ The Bible does not name the battle
📖 Cowardice stands for a bigger pattern

## 🤝 They Kept Not The Covenant Of God

A covenant is a binding agreement, sealed with promises on both sides.

God had already given Israel the terms of this covenant through Moses.

Refusing to walk in his law means they knew the instructions and chose not to follow them.

This was not confusion, it was a decision.

🤝 Covenant means a binding agreement
📜 God had already given the terms
🚫 They knew the law and ignored it
📖 This was a decision, not confusion

## 🧠 And Forgat His Works, And His Wonders That He Had Shewed Them

Forgat is an old form of forgot.

This is the root problem the psalm keeps circling back to.

Forgetting was not simply a memory failure.

It meant letting go of the reason to trust God at all.

Everything from here forward retells those forgotten works in vivid detail on purpose.

🧠 Forgat is an old form of forgot
🌀 This is the psalm's root problem
🔓 Forgetting released their reason to trust
📖 The rest of the psalm restores the memory

# Psalms 78:12-16
# 🌊 Wonders In Egypt And The Wilderness
---
## 🏙️ In The Land Of Egypt, In The Field Of Zoan

Zoan was a major ancient Egyptian city, also called Tanis by later writers.

It sat in the eastern Nile Delta, close to where the Israelites lived under Egyptian rule.

Naming a real place ties this poem to actual history, not vague legend.

The wonders that follow happened somewhere a listener could locate on a map.

🏙️ Zoan was a major Egyptian city
🗺️ It sat in the eastern Nile Delta
📍 A real place, not vague legend
📖 History anchors the wonders that follow

## 🌊 He Divided The Sea, And Caused Them To Pass Through

This recalls the crossing of the Red Sea in the book of Exodus.

Standing as an heap pictures the water piled up like a wall on either side.

The people walked through on ground that should have been underwater.

This is the first of several miracles the psalm lists in quick succession.

🌊 This recalls the Red Sea crossing
🧱 Heap pictures water piled like a wall
🚶 They walked where water should have been
📖 The first of several miracles listed here

## ☁️ In The Daytime Also He Led Them With A Cloud

This describes the pillar of cloud and the pillar of fire from the book of Exodus.

The cloud gave shade and guidance during the heat of the day.

The fire gave light and warmth once night fell in the wilderness.

God's presence changed form to match exactly what the people needed at each hour.

☁️ This is the pillar of cloud and fire
🌞 The cloud guided them by day
🔥 The fire guided them by night
📖 God's presence matched their exact need

## 🪨 He Clave The Rocks In The Wilderness

Clave is an old form of cleaved, meaning split open.

The wilderness had no natural water source for a crowd this large.

God split solid rock and water poured out where none should have existed.

Great depths is poetic language for how much water actually came out.

🪨 Clave means split open
🏜️ The wilderness had no water source
💧 Water poured from solid rock
📖 A poetic phrase for a huge amount

## 🔁 He Brought Streams Also Out Of The Rock

This verse repeats the miracle from the line before in different words.

Hebrew poetry often restates an idea a second way instead of moving straight on.

Running down like rivers means this was not a small trickle.

It was enough water to sustain an entire traveling nation.

🔁 This restates the rock miracle again
📜 Hebrew poetry often repeats an idea
🌊 Rivers means far more than a trickle
📖 Enough water for an entire nation

# Psalms 78:17-20
# 🍽️ Can God Furnish A Table?
---
## 🔁 They Sinned Yet More Against Him By Provoking The Most High

Yet more signals that this was not their first failure in the wilderness.

Provoking here means deliberately testing God's patience, not accidentally offending him.

The miracles from the verses before did not stop the pattern of doubt.

Seeing God act and still doubting him is the tension this whole section explores.

🔁 Yet more means not the first failure
🎯 Provoking means deliberately testing patience
👀 Even miracles did not stop the doubt
📖 Seeing and doubting can happen together

## 🍖 They Tempted God In Their Heart By Asking Meat For Their Lust

Lust here means a strong craving, not a sexual desire.

Tempted God means testing whether he could or would actually provide.

The craving started quietly in their heart before it ever reached their mouths.

Wanting meat was not the sin, demanding proof of God's power was.

🍖 Lust here means a strong craving
🤔 Tempted God means testing his power
💭 The craving began in the heart first
📖 Demanding proof was the real sin

## 😏 Can God Furnish A Table In The Wilderness?

This does not read like an honest question looking for an answer.

It is sarcasm, doubting God out loud in front of everyone.

Furnish a table means set out a full spread of food.

They are mocking the idea that God could feed them in a place with no food.

😏 This is sarcasm, not honest curiosity
🍽️ Furnish a table means a full spread
🏜️ They doubted food could exist there
📖 Mockery, not real doubt seeking answers

## 💧 Can He Give Bread Also? Can He Provide Flesh For His People?

They admit God already provided water from the rock just verses earlier.

Even that visible miracle was not enough to settle their doubt.

Bread and flesh raise the bar higher, as if one miracle does not count toward the next.

This is doubt that keeps moving the goalpost no matter what it sees.

💧 They admit the rock miracle happened
🙄 One miracle still was not enough
🍞 Bread and flesh raise the bar again
📖 Doubt keeps moving the goalpost

# Psalms 78:21-25
# 🍞 Angels' Food
---
## 🔥 The LORD Heard This, And Was Wroth

Wroth is an old word for deep, burning anger.

This was not a small annoyance, it was a serious response to being mocked.

Fire kindled against Jacob pictures God's anger the way a real fire spreads and consumes.

The complaint from the verse before did not go unnoticed.

🔥 Wroth means deep burning anger
😠 A serious response to being mocked
🌡️ Fire pictures anger spreading like real fire
📖 The complaint did not go unnoticed

## 🎯 Because They Believed Not In God, And Trusted Not In His Salvation

This verse names the actual root cause behind the anger.

It was not the request for food that caused the problem.

It was the refusal to trust that God could or would provide it.

Unbelief, not hunger, is the real story of this whole section.

🎯 This names the real root cause
🍞 The request for food was not the issue
🚫 Refusing to trust God was the issue
📖 Unbelief is the real story here

## 🚪 Had Rained Down Manna Upon Them To Eat

Doors of heaven is a poetic way of describing the sky opening to release provision.

Manna was the flaky, bread like food God provided each morning in the wilderness.

Corn of heaven is another name for the same food, describing where it came from.

This miracle happened while the people were still speaking their doubt out loud.

🚪 Doors of heaven pictures the sky opening
🍞 Manna was bread like food from God
🌾 Corn of heaven names the same food
📖 The miracle came during their doubt

## 😇 Man Did Eat Angels' Food

Angels' food is a poetic title for manna, not a claim that angels eat it.

It means the food was extraordinary, almost too good for ordinary people.

To the full means there was enough for every single person, with nothing held back.

The very thing they mocked God for being unable to provide arrived in abundance.

😇 Angels' food is a poetic title
✨ It means extraordinary, almost heavenly food
🍽️ To the full means no one went without
📖 Abundance answered their mockery directly

# Psalms 78:26-31
# 🍗 While The Meat Was Yet In Their Mouths
---
## 💨 He Caused An East Wind To Blow In The Heaven

Winds in the ancient Near East were often described as tools directly controlled by God.

The east wind and the south wind together describe a large weather system moving birds toward the camp.

This was not random weather, it was aimed provision.

The same power that split the sea now steers the wind.

💨 Winds were seen as God's direct tools
🧭 East and south winds moved together
🎯 This was aimed provision, not chance
📖 The same power steers sea and wind

## 🌫️ He Rained Flesh Also Upon Them As Dust

As dust and like as the sand of the sea are both pictures of an uncountable amount.

The birds, likely quail, arrived in numbers too large to count by hand.

This matches the exact request from a few verses earlier.

God did not give a small taste, he gave far more than they asked for.

🌫️ Dust and sand picture uncountable amounts
🐦 The birds arrived in huge numbers
✅ This matched their exact request
📖 God gave more than they asked

## 🏕️ And He Let It Fall In The Midst Of Their Camp

Habitations here simply means the tents where families lived.

The birds did not land in some distant field requiring a long journey to gather.

They fell right in the middle of camp, close enough for every family to collect.

God removed every possible excuse for going hungry.

🏕️ Habitations means the tents people lived in
📍 The birds fell inside the camp itself
🙌 Every family could gather them easily
📖 God removed every excuse for hunger

## 🍗 While Their Meat Was Yet In Their Mouths

Estranged from their lust means their appetite was fully satisfied, not held back at all.

This phrase captures the exact moment judgment arrived, mid meal.

It is not a metaphor about greed in general.

It describes actual food still being chewed when the next verse turns dark.

🍗 Estranged from lust means fully satisfied
⏱️ This marks the exact moment of judgment
🚫 Not a metaphor, a literal detail
📖 Judgment arrived mid meal

## 💪 The Wrath Of God Came Upon Them, And Slew The Fattest Of Them

Fattest here likely means the strongest and healthiest men, not simply overweight ones.

Chosen men of Israel points to leaders or warriors, not random members of the camp.

The very people who should have known better were struck first.

Abundance became judgment the moment gratitude never arrived.

💪 Fattest likely means the strongest men
⚔️ Chosen men means leaders or warriors
🎯 Those who should know better were struck
📖 Abundance became judgment without gratitude

# Psalms 78:32-37
# 💔 Flattering Him With Their Mouth
---
## 🔁 For All This They Sinned Still

All this points back to everything the psalm has already described, water, manna, and quail.

Sinned still means the pattern repeated even after seeing every one of those miracles.

Wondrous works were not enough evidence to produce lasting belief.

Seeing is not the same thing as truly believing.

🔁 All this points to every miracle shown
😔 The pattern repeated after all of it
👀 Miracles alone did not produce belief
📖 Seeing and believing are not the same

## 🌬️ Their Days Did He Consume In Vanity

Vanity here means emptiness, a life that produces nothing lasting.

Consuming their days in vanity means an entire generation wandered without reaching the promise.

This refers to the forty years spent in the wilderness because of their unbelief.

Wasted time became the visible cost of that unbelief.

🌬️ Vanity means emptiness, nothing lasting
⏳ An entire generation wandered without arriving
🏜️ This refers to the forty wilderness years
📖 Wasted time was the cost of unbelief

## 🔁 When He Slew Them, Then They Sought Him

This describes a pattern that repeats throughout the whole chapter.

Crisis, not gratitude, is what finally pushed them to seek God.

Enquired early suggests urgency, searching for God the moment trouble hit.

That kind of faith looks real in the moment but rarely lasts once the crisis passes.

🔁 A pattern repeated across this chapter
⚠️ Crisis pushed them to seek God
⏰ Enquired early shows real urgency
📖 Crisis faith rarely lasts past the danger

## 🪨 They Remembered That God Was Their Rock, And The High God Their Redeemer

Rock here is a title for God as something solid and unshaken, not a literal stone.

Redeemer means the one who buys back or rescues someone at a cost.

Both titles recall specific past rescues, the water from the rock and the exodus itself.

Remembering the right titles for God was a step in the right direction.

🪨 Rock means solid and unshaken
🔓 Redeemer means one who rescues at a cost
🔁 Both titles recall past rescues
📖 Remembering God's titles was a start

## 🗣️ They Did Flatter Him With Their Mouth, And They Lied Unto Him With Their Tongues

Flattering God with words sounds like devotion, but this verse calls it lying instead.

Their mouth said the right things while their heart stayed somewhere else entirely.

Heart not right and not stedfast in his covenant describe the same problem named back in verse eight.

Words alone were never the measure of real faithfulness in this psalm.

🗣️ Flattery sounded like devotion but was not
💔 Their heart stayed apart from their words
🔁 This repeats the failure from verse eight
📖 Words were never the true measure

# Psalms 78:38-43
# 🩹 Full Of Compassion
---
## 🩹 But He, Being Full Of Compassion, Forgave Their Iniquity

This verse turns the whole psalm toward mercy without warning.

Compassion here means God chose to hold back the full punishment their sin deserved.

Many a time signals this was not a onetime exception, but a repeated pattern of restraint.

Every failure described so far could have ended the story completely, and none of them did.

🩹 Compassion means holding back deserved punishment
🔁 Many a time means repeated restraint
🚫 Every failure could have ended the story
📖 None of them did because of mercy

## 🍃 For He Remembered That They Were But Flesh

But flesh means simply human, fragile and limited, not divine.

A wind that passeth away is a picture of something brief and impossible to hold onto.

Think of trying to catch a breeze in your hands.

It slips through no matter how hard you try.

God's patience here comes from understanding human weakness, not ignoring it.

🍃 But flesh means fragile and human
💨 A wind that passes describes brief life
🖐️ Like trying to catch a breeze
📖 Patience came from understanding weakness

## 📏 They Turned Back And Tempted God, And Limited The Holy One Of Israel

Limited here means they set a ceiling on what they believed God could actually do.

They did not deny God existed, they simply doubted how far his power reached.

How oft signals this had already happened again and again by this point.

Doubting God's reach is its own kind of unbelief, quieter than outright denial.

📏 Limited means setting a ceiling on God
🤔 They doubted how far his power reached
🔁 How oft shows this happened repeatedly
📖 Doubting reach is still unbelief

## ✋ They Remembered Not His Hand, Nor The Day When He Delivered Them From The Enemy

His hand is a common Bible picture for God's power in action.

The day he delivered them from the enemy points back to the exodus rescue from Egypt.

Forgetting that single day meant losing the clearest evidence they had of God's care.

The next verses retell that day in detail so it cannot be forgotten again.

✋ His hand pictures God's power in action
🏃 The day points to the exodus rescue
🧠 Forgetting it lost their clearest evidence
📖 The next verses retell it in detail

## ✨ How He Had Wrought His Signs In Egypt

Signs and wonders here point to the plagues that struck Egypt before the exodus.

Zoan is named again, the same city mentioned back in verse twelve.

This line works as a hinge, closing one section and opening the plague list ahead.

The psalm is about to slow down and name each of those signs one by one.

✨ Signs and wonders point to the plagues
🏙️ Zoan is named again from verse twelve
🔗 This line hinges into the next section
📖 Each plague is about to be named

# Psalms 78:44-51
# 🐸 The Plagues Retold
---
## 🩸 Had Turned Their Rivers Into Blood

This retells the first plague from the book of Exodus.

The Nile River was Egypt's entire water supply and the center of its farming and life.

Turning it to blood made it undrinkable overnight, striking at the most basic need there is.

A river Egypt depended on for everything became useless in a single moment.

🩸 This retells the first plague
🌊 The Nile was Egypt's entire water supply
🚫 It became undrinkable overnight
📖 A basic need was struck first

## 🪰 He Sent Divers Sorts Of Flies Among Them, Which Devoured Them

Divers is an old word meaning various or many different kinds.

This line compresses two separate plagues, flies and frogs, into one poetic verse.

Devoured and destroyed describe an infestation completely overwhelming daily life.

Egypt's fields, homes, and food all became unlivable at once.

🔢 Divers means various or many kinds
🪰 Two plagues compressed into one verse
🐸 Flies and frogs overwhelmed daily life
📖 Fields and homes became unlivable

## 🌾 He Gave Also Their Increase Unto The Caterpiller, And Their Labour Unto The Locust

Increase means the harvest a farmer expects to gather from a season of work.

Caterpiller is an old spelling of caterpillar, an early stage of the locust.

Labour describes the months of effort that went into growing that harvest.

Both the young pest and the mature locust are named, leaving nothing untouched.

🌾 Increase means the expected harvest
🐛 Caterpiller is an old spelling, early locust
💪 Labour means months of farming effort
📖 Nothing in the harvest was untouched

## 🌳 He Destroyed Their Vines With Hail, And Their Sycomore Trees With Frost

Sycomore trees were a common Egyptian fig tree used for both food and timber.

Hail and frost were unusual, even shocking, weather for Egypt's normally warm climate.

Vines and trees represent long term investments, not a single season's crop.

Losing them meant losing years of planning, not just one harvest.

🌳 Sycomore was a common Egyptian fig tree
❄️ Hail and frost were shocking there
🍇 Vines and trees were long term investments
📖 Years of planning were lost at once

## ⚡ He Gave Up Their Cattle Also To The Hail, And Their Flocks To Hot Thunderbolts

Thunderbolts here describes lightning striking with deadly force.

Cattle and flocks were a family's wealth, food supply, and labor force all at once.

Losing animals to storms like this threatened survival itself, not just comfort.

Every layer of Egypt's economy is targeted in these plagues, one after another.

⚡ Thunderbolts describes deadly lightning strikes
🐄 Cattle and flocks meant wealth and survival
💥 Storms threatened survival, not just comfort
📖 Every layer of the economy was targeted

## 👼 By Sending Evil Angels Among Them

Evil angels here does not mean demons or fallen spirits causing chaos.

It means messengers sent to carry out judgment, evil describing the disaster they brought.

Stacking fierceness, wrath, indignation, and trouble in one line piles up the weight of what happened.

The plagues are described here as a deliberate mission, not a random string of disasters.

👼 Evil angels means messengers of judgment
🎯 Evil describes the disaster, not their nature
📚 Four words stack up the weight
📖 The plagues were a deliberate mission

## 🦠 He Spared Not Their Soul From Death, But Gave Their Life Over To The Pestilence

Pestilence means a deadly, widespread disease.

Made a way to his anger pictures judgment moving forward with nothing left to block it.

Spared not means this plague showed no exceptions or mercy along the way.

This verse sets up the final and most severe plague named in the next line.

🦠 Pestilence means a deadly widespread disease
🛤️ Made a way pictures unstoppable judgment
🚫 Spared not means no exceptions given
📖 It sets up the final plague ahead

## 🏺 And Smote All The Firstborn In Egypt, The Chief Of Their Strength In The Tabernacles Of Ham

Tabernacles of Ham is a poetic name for Egypt, since Egyptians were traditionally descended from Noah's son Ham.

Firstborn sons held special honor and inheritance rights in this culture.

Chief of their strength describes the firstborn as the pride and future of every household.

This was the final plague, the one that finally broke Pharaoh's resistance in the book of Exodus.

🏺 Tabernacles of Ham names Egypt poetically
👑 Firstborn sons held special honor
💪 Chief of their strength names their pride
📖 This plague finally broke Pharaoh's resistance

# Psalms 78:52-55
# 🐑 Led Like A Flock Into The Land
---
## 🐑 But Made His Own People To Go Forth Like Sheep

This shifts from judgment on Egypt to care for Israel in the very same breath.

Sheep need a shepherd's constant attention to find food, water, and safety.

Think of a shepherd walking ahead of the flock, checking the path before the sheep reach it.

God led Israel with that same close, personal attention through the wilderness.

🔀 The focus shifts from judgment to care
🐑 Sheep need constant shepherd attention
🚶 A shepherd checks the path first
📖 God led Israel with that same care

## ⚖️ But The Sea Overwhelmed Their Enemies

This names two outcomes from the very same event side by side.

Israel walked through the sea safely while the pursuing Egyptian army did not survive it.

Feared not describes real confidence, not just the absence of danger.

The same water that saved one side judged the other.

⚖️ Two outcomes from one single event
🚶 Israel crossed safely, Egypt did not
😌 Feared not means real confidence
📖 The same water saved and judged

## ⛰️ Even To This Mountain, Which His Right Hand Had Purchased

This mountain likely refers to the hill country around Jerusalem, where the sanctuary would eventually stand.

Purchased here does not mean God paid money for it.

It means he secured the land through his own power, the way a costly victory earns its prize.

The right hand is a common Bible picture for that strength in action.

⛰️ This mountain likely means Jerusalem's hill country
💰 Purchased means secured through power
✋ Right hand pictures strength in action
📖 A costly victory earned this prize

## 📏 And Divided Them An Inheritance By Line

Heathen here simply means the nations already living in Canaan before Israel arrived.

By line refers to a measuring cord used to mark out fair boundaries for each tribe.

This describes the actual conquest and settlement of the promised land under Joshua.

Every tribe received a real, specific piece of ground, not a vague promise.

🌍 Heathen means the nations already there
📏 By line means measured with a cord
🗺️ This describes settling under Joshua
📖 Every tribe received real, specific ground

# Psalms 78:56-58
# 🗿 High Places And Graven Images
---
## 🔁 Yet They Tempted And Provoked The Most High God

Yet signals another turn in the pattern, straight after the gift of the promised land.

This is not a new failure so much as the same old one in a new setting.

Testimonies again means the covenant instructions named earlier in the psalm.

Even a fresh start in a new land did not change old habits.

🔁 Yet signals another turn in the pattern
🏡 The same failure appears in a new land
📜 Testimonies means covenant instructions again
📖 A fresh start did not change old habits

## 🏹 They Were Turned Aside Like A Deceitful Bow

A deceitful bow is one that looks straight and reliable but shoots wide of the target.

Think of aiming carefully at something and still missing every single time.

This pictures a whole nation that looked faithful on the outside.

But it kept missing the mark anyway.

Like their fathers ties this straight back to the stubborn generation named in verse eight.

🏹 A deceitful bow looks reliable but misses
🎯 It pictures consistently missing the mark
👀 They looked faithful but were not
📖 This echoes the failure from verse eight

## ⛰️ They Provoked Him To Anger With Their High Places

High places were elevated outdoor shrines often used to worship other gods.

Graven images means carved idols shaped like gods or animals, mentioned in the same verse.

Both practices borrowed the worship style of the nations Israel had just replaced in the land.

Jealousy here describes God's rightful claim on a devotion that belonged to him alone.

⛰️ High places were outdoor idol shrines
🗿 Graven images means carved idols
🔄 They copied the nations they replaced
📖 Jealousy claimed the devotion owed to God

# Psalms 78:59-64
# ⚔️ The Loss Of Shiloh
---
## 😡 When God Heard This, He Was Wroth, And Greatly Abhorred Israel

Abhorred means to reject with strong disgust, a serious step beyond simple anger.

This wording is stronger than the anger described earlier for the wilderness generation.

Repeated worship of idols after receiving the promised land carried heavier consequences.

The next verses describe exactly what that judgment looked like.

😡 Abhorred means rejected with strong disgust
📈 This anger is stronger than before
⚖️ Repeated sin carried heavier consequences
📖 The next verses show the judgment

## 🏛️ So That He Forsook The Tabernacle Of Shiloh

Shiloh was the city where the tabernacle, Israel's portable place of worship, stood for generations.

Forsook means abandoned or withdrawn from, not simply moved elsewhere.

God's presence had dwelled with his people there since the days of Joshua.

Losing that presence was a much bigger loss than losing a building.

🏛️ Shiloh held the tabernacle for generations
🚪 Forsook means withdrawn, not just moved
👤 God's presence had dwelled there since Joshua
📖 Losing presence was worse than losing a building

## 📦 And Delivered His Strength Into Captivity, And His Glory Into The Enemy's Hand

Strength and glory here are poetic names for the ark of the covenant.

This recalls the event in the book of First Samuel when the Philistines captured it in battle.

The ark represented God's own presence resting among his people.

Losing it in battle would have felt like losing God himself.

📦 Strength and glory point to the ark
⚔️ This recalls the ark's capture in battle
👤 The ark represented God's presence
📖 Losing it felt like losing God himself

## ⚔️ He Gave His People Over Also Unto The Sword

Inheritance here is another name for Israel, the people God had chosen and claimed as his own.

Gave over unto the sword means allowing military defeat rather than protecting them from it.

This shows the ark's loss was not an isolated disaster.

The whole nation faced consequences alongside it.

⚔️ Gave over means allowing defeat
👤 Inheritance is another name for Israel
📦 The ark's loss was not isolated
📖 The whole nation shared the consequence

## 🔥 The Fire Consumed Their Young Men, And Their Maidens Were Not Given To Marriage

Fire here likely describes the destruction of war, not a literal wildfire.

Losing young men in battle meant a whole generation of husbands never came home.

Maidens not given to marriage points to the ripple effect on the women left behind.

War's cost reached far beyond the soldiers who actually died in it.

🔥 Fire likely pictures the destruction of war
⚔️ A generation of young men was lost
👰 Maidens describes the women left behind
📖 War's cost reached beyond the soldiers

## ⛪ Their Priests Fell By The Sword, And Their Widows Made No Lamentation

Priests held a sacred, protected role in Israel's worship system.

Even they were not spared in this defeat.

No lamentation does not mean nobody cared.

It likely means the devastation was too sudden and total for normal mourning customs.

Some losses arrive too fast and too heavy for ritual to catch up with grief.

⛪ Priests held a sacred protected role
😱 Even priests were not spared here
😶 No lamentation means grief too sudden for ritual
📖 Some losses outrun mourning customs

# Psalms 78:65-72
# 👑 God Chose David
---
## 😴 Then The LORD Awaked As One Out Of Sleep

This does not mean God was ever literally sleeping or unaware.

It is a poetic picture describing how suddenly his help arrived after the silence of judgment.

Shouteth by reason of wine pictures a warrior's bold battle cry, not drunken behavior.

Wine in this image represents fearless energy, not impaired judgment.

😴 God was never literally asleep
⚡ This pictures sudden, decisive help arriving
🗣️ Shouteth by reason of wine means boldness
📖 Wine here means boldness, not impairment

## 🏃 And He Smote His Enemies In The Hinder Parts

Hinder parts means the back, the side a fleeing enemy shows an attacker.

This pictures God's enemies running from him in full retreat.

Perpetual reproach means lasting shame remembered long after the battle ended.

Their retreat became a permanent part of their reputation.

🏃 Hinder parts means the back, while fleeing
⚔️ God's enemies retreated in defeat
😳 Perpetual reproach means lasting shame
📖 Retreat became their permanent reputation

## 👤 He Refused The Tabernacle Of Joseph, And Chose Not The Tribe Of Ephraim

Joseph and Ephraim are connected, since Ephraim was one of Joseph's sons.

For generations Ephraim held major influence among the twelve tribes of Israel.

Refused and chose not both describe God setting Ephraim aside from the leading role.

This sets up a surprising reversal in the very next verse.

👤 Ephraim was one of Joseph's sons
📈 Ephraim once held major influence
🔄 God set that leading role aside
📖 A surprising reversal comes next

## 👑 But Chose The Tribe Of Judah, The Mount Zion Which He Loved

Judah was another of the twelve tribes, and this verse marks a major turning point.

Zion refers to the hill in Jerusalem where the temple would eventually be built.

Which he loved is a striking, personal way to describe God's attachment to one place.

This choice shapes the rest of Israel's history, including where its kings and temple would come from.

👑 Judah becomes the chosen leading tribe
⛰️ Zion is the hill under Jerusalem
❤️ Which he loved shows personal attachment
📖 This choice shapes Israel's future

## 🏛️ And He Built His Sanctuary Like High Palaces

Sanctuary here points forward to the temple that would eventually stand on Mount Zion.

Comparing it to high palaces means it was built to reflect real majesty.

Think of the difference between an ordinary house and a grand royal palace.

Like the earth established forever expresses confidence that this place was meant to last.

🏛️ Sanctuary points forward to the temple
👑 High palaces means real majesty
🏠 Like an ordinary house versus a palace
📖 It was meant to last, like the earth

## 🐑 He Chose David Also His Servant, And Took Him From The Sheepfolds

Sheepfolds were simple pens where flocks were kept, an ordinary, humble place to be found.

David was a working shepherd, not a nobleman, when God first chose him.

Following the ewes great with young describes the careful, patient work of caring for pregnant sheep.

God took that same shepherd's instinct and gave David an entire nation to lead.

🐑 Sheepfolds were ordinary, humble places
👦 David was a working shepherd, not royalty
🤰 Ewes great with young means pregnant sheep
📖 A shepherd's care became a king's calling

## ❤️ So He Fed Them According To The Integrity Of His Heart

Integrity here means honest, whole hearted character, not perfect performance.

Skilfulness of his hands points to real, practical ability alongside that character.

The psalm ends by naming both qualities together, a good heart and a capable hand.

The whole chapter has moved from centuries of failure to one leader who finally gets this right.

❤️ Integrity means honest, whole hearted character
🖐️ Skilfulness means real practical ability
🤝 The psalm pairs a good heart and skill
📖 One leader finally gets this right`.trim();

export const PSALMS_SEVENTY_EIGHT_PERSONAL_SECTIONS = parsePsalmsSeventyEightRawNotes(PSALMS_SEVENTY_EIGHT_RAW_NOTES);
