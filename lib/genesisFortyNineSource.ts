export type GenesisFortyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFortyNineRawNotes(rawText: string): GenesisFortyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFortyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+49:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 49 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+49:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+49:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 49 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 49,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 49:${startVerse}` : `Genesis 49:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Genesis 49 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_NINE_RAW_NOTES = `# Genesis 49:1-2
# 📢 Jacob Gathers His Sons
---
## 📢 Gather Yourselves Together

Jacob calls all twelve sons to his deathbed at the same time.

This was not a casual family visit.

It was a formal moment meant to be remembered by every tribe descended from them.

What Jacob says next will shape how each family understands its own future.

📢 Jacob calls all twelve sons together

🛏️ This happens at his deathbed

📜 A formal moment for every tribe

➡️ What comes next shapes each family's future

## 🔮 That Which Shall Befall You In The Last Days

"Last days" here does not mean the end of the world.

It is an old way of saying in the days to come.

Jacob is telling each son what will happen to his family and tribe over time.

This is prophecy about the future of Israel, not a vision of history's final moment.

🔮 Last days means days to come

🚫 Not a prediction about the world's end

👪 Jacob describes each tribe's future

➡️ This is prophecy about Israel's story

## 👤 Hearken Unto Israel Your Father

Jacob and Israel are the same person.

God gave Jacob the name Israel back in Genesis thirty two after he wrestled through the night.

Using both names side by side reminds the sons that their father also carries God's covenant name.

The blessing about to come is not just fatherly advice.

It carries the weight of Israel's own calling.

👤 Jacob and Israel are the same man

🌙 God renamed him in Genesis thirty two

📜 Both names appear together on purpose

➡️ This blessing carries covenant weight

# Genesis 49:3-4
# 💧 Reuben Loses His Birthright
---
## 👑 Thou Art My Firstborn, My Might, And The Beginning Of My Strength

Reuben was Jacob's oldest son, born first to Leah.

The firstborn normally received a double share of the inheritance and led the family after the father died.

"My might" and "the beginning of my strength" both describe a father's pride in his firstborn son.

Jacob names all of that honor before he takes it away in the next verse.

👑 Reuben was Jacob's firstborn son

💰 Firstborns received a double inheritance

💪 My might means fatherly pride and strength

➡️ Jacob names the honor before removing it

## 🎖️ The Excellency Of Dignity, And The Excellency Of Power

These two phrases describe the leadership rights that came with being firstborn.

"Dignity" points to Reuben's place of highest honor in the family.

"Power" points to the authority he should have carried over his brothers.

Both were his birthright by custom alone, not something he had to earn.

🎖️ Dignity means the highest place of honor

🏛️ Power means authority over his brothers

🎁 Both came from custom, not effort

➡️ Reuben had everything to lose here

## 🌊 Unstable As Water, Thou Shalt Not Excel

Water has no shape of its own and spills wherever it is poured.

Jacob uses that image to describe Reuben's character.

"Thou shalt not excel" means Reuben will not rise to the leadership his birth order promised.

A single reckless choice cost him the future he was born into.

🌊 Water takes no shape of its own

🎭 This describes Reuben's unstable character

📉 He will not excel or lead

➡️ One choice cost him his future

## 🛏️ Because Thou Wentest Up To Thy Father's Bed

This looks back to Genesis thirty five.

There, Reuben slept with Bilhah, his father's concubine.

Bilhah was Rachel's servant and the mother of Dan and Naphtali.

Sleeping with a father's wife was a direct insult to his authority in this culture.

Jacob never forgot it, even decades later on his deathbed.

🛏️ This recalls Reuben's sin in Genesis thirty five

👩 Bilhah was Rachel's servant and Jacob's concubine

⚠️ It directly challenged Jacob's authority

➡️ Decades later Jacob still remembered it

# Genesis 49:5-7
# ⚔️ Simeon And Levi Are Cursed
---
## 👬 Simeon And Levi Are Brethren

Simeon and Levi are true brothers by blood, both sons of Leah.

Jacob is not only describing family ties here.

He means they are alike in temperament, quick to act together in anger.

Genesis thirty four already showed exactly what that partnership looked like in practice.

👬 Simeon and Levi share the same mother

🔥 They also share a violent temperament

📜 Genesis thirty four already showed this

➡️ Jacob is describing character, not just family

## 🏠 Instruments Of Cruelty Are In Their Habitations

"Habitations" means their homes or the places where they lived.

Jacob says that weapons meant for violence were kept close at hand there.

This is not a passing insult.

It points straight back to the swords Simeon and Levi used at Shechem.

🏠 Habitations means their homes or dwellings

⚔️ Weapons of violence were kept close

🗡️ This points back to Shechem's slaughter

➡️ Jacob names their weapon of choice

## 😠 In Their Anger They Slew A Man, And In Their Selfwill They Digged Down A Wall

This recalls Genesis thirty four.

There, Shechem assaulted their sister Dinah.

Simeon and Levi tricked the men of that city into being circumcised.

The men were still recovering from that surgery.

Simeon and Levi killed them in their weakened state.

"Selfwill" means they acted on their own stubborn will, without asking their father first.

"Digged down a wall" pictures the destruction they left behind in that city.

😠 This recalls the massacre at Shechem

🗡️ They killed the men while still weak

🙅 Selfwill means acting without permission

➡️ They left total destruction behind them

## 🌍 I Will Divide Them In Jacob, And Scatter Them In Israel

Jacob turns their violent anger into a curse on their future.

Neither Simeon nor Levi would receive one solid block of land like the other tribes.

Simeon's territory was later absorbed inside Judah's larger land.

Levi's scattering became a blessing in disguise.

The Levites were spread out to serve as priests among every tribe.

🌍 Neither tribe kept one solid territory

🧩 Simeon's land was absorbed inside Judah

⛪ Levi's scattering became a priestly calling

📖 A curse became a different kind of purpose

# Genesis 49:8-12
# 🦁 The Blessing Of Judah
---
## 🗣️ Judah, Thou Art He Whom Thy Brethren Shall Praise

The name Judah sounds like the Hebrew word for praise.

Jacob is making a deliberate play on his son's own name.

Leah named him Judah back in Genesis twenty nine, saying she would praise the LORD.

Now that same name becomes a promise that his brothers will one day praise him too.

🗣️ Judah sounds like the word for praise

👶 Leah named him this in Genesis twenty nine

🔁 Jacob repeats that wordplay here

➡️ Judah's name becomes a promise

## ✊ Thy Hand Shall Be In The Neck Of Thine Enemies

This is a picture of total victory in battle.

Grabbing an enemy by the back of the neck meant he was already beaten and fleeing.

Jacob is promising Judah's descendants military strength over their enemies.

This promise later plays out through King David, who came from Judah's line.

✊ Hand on the neck pictures total victory

🏃 It shows an enemy already fleeing

⚔️ Judah's descendants would defeat their enemies

📖 David later fulfilled this promise

## 🦁 Judah Is A Lion's Whelp

A "whelp" is a young lion, already showing the strength of what it will become.

Lions were the most feared and respected animals in the ancient world.

Jacob pictures Judah crouched down after a hunt, resting in complete confidence.

No one dares to disturb a lion once it has settled down like that.

🦁 A whelp is a young lion

💪 It already shows future strength

😌 The lion rests in total confidence

➡️ Nobody dares to disturb it

## 👑 The Sceptre Shall Not Depart From Judah

A "sceptre" is a ruler's staff, a symbol of royal authority.

This is a promise that kings would come from Judah's family line.

That promise runs through King David all the way to Jesus.

Revelation calls Jesus the Lion of the tribe of Judah.

No other tribe receives a promise like this one.

👑 A sceptre symbolizes royal authority

📖 Kings would come from Judah's line

🦁 The line runs to David and beyond

➡️ No other tribe gets this promise

## ⚖️ Nor A Lawgiver From Between His Feet, Until Shiloh Come

A "lawgiver" is someone who rules and hands down decisions for the people.

"Shiloh" is a name whose exact meaning is debated among scholars.

Many believe it points forward to a coming ruler who would receive full and lasting authority.

Christian readers have long connected this promise to Jesus.

⚖️ A lawgiver rules and hands down decisions

❓ Shiloh's exact meaning is debated

👑 It points to a coming ruler

📖 Many connect this promise to Jesus

## 🌍 Unto Him Shall The Gathering Of The People Be

This describes nations and peoples coming together under one ruler from Judah.

It is not a small, local kingdom being described here.

The scale is much larger, people gathering from beyond Israel itself.

This widens the promise from just one nation to something for the whole world.

🌍 Nations gather under this ruler

📏 The scale is larger than Israel alone

🌐 The promise reaches beyond one nation

➡️ It points toward a worldwide hope

## 🍇 Binding His Foal Unto The Vine, And His Ass's Colt Unto The Choice Vine

A vine loaded with grapes was valuable and worth protecting.

Normally no one would tie a hungry donkey right next to one.

Jacob pictures a future so wealthy that Judah's people can risk it without worry.

There will be more than enough grapes to spare.

🍇 A loaded vine was valuable

🐴 Normally no one risked it near a donkey

💰 This pictures future abundance

➡️ There would be more than enough

## 🍷 He Washed His Garments In Wine, And His Clothes In The Blood Of Grapes

"Blood of grapes" is simply a poetic way of describing wine.

Washing clothes in wine instead of water is an image of extreme wealth.

Wine would normally be treasured, not used the way plain water is used.

Jacob is describing a future so rich that wine becomes almost ordinary.

🍷 Blood of grapes means wine

👕 Washing clothes in wine pictures wealth

💎 Wine here is treated like plain water

➡️ Judah's future would overflow with riches

## 🥛 His Eyes Shall Be Red With Wine, And His Teeth White With Milk

Red eyes from wine and white teeth from milk both describe a life of full health and plenty.

Wine and milk were two of the richest foods available in this world.

Neither one is a sign of trouble or sickness here.

Jacob closes Judah's blessing on an image of complete prosperity.

🍷 Red eyes from wine picture plenty

🥛 White teeth from milk picture health

🌾 Wine and milk were prized foods

📖 Judah's blessing ends in prosperity

# Genesis 49:13
# ⚓ Zebulun By The Sea
---
## ⚓ Zebulun Shall Dwell At The Haven Of The Sea

A "haven" is a sheltered harbor where ships can dock safely.

Jacob pictures Zebulun's future land near the coast, tied closely to sea trade.

Zebulun's actual territory sat a little inland from the Mediterranean itself.

Even so, it stood along major trade routes running toward the coast.

⚓ A haven is a sheltered harbor

🌊 Zebulun's future ties to sea trade

🗺️ Their land sat near, not on, the coast

➡️ Trade routes still ran through it

## 🏙️ His Border Shall Be Unto Zidon

Zidon was a major Phoenician city on the Mediterranean coast, famous for trade and shipbuilding.

Naming Zidon as a border marker tells the reader exactly what direction Zebulun's land reached.

Living near a city like Zidon meant constant contact with sailors and traders.

Zebulun's identity became tied to that busy, outward facing life.

🏙️ Zidon was a major Phoenician trade city

🧭 It marks the direction of Zebulun's border

⛵ Nearby life meant constant contact with traders

📖 Zebulun's identity turned toward the sea

# Genesis 49:14-15
# 🫏 Issachar The Strong Donkey
---
## 🫏 Issachar Is A Strong Ass Couching Down Between Two Burdens

A "strong ass" here means a powerful donkey, an animal built for hauling heavy loads.

"Couching down between two burdens" pictures the animal kneeling under the weight it carries.

Jacob is describing Issachar's territory, a wide fertile valley wedged between other tribal lands.

The image is one of strength used for steady labor, not for battle.

🫏 A strong ass means a powerful donkey

📦 Couching down pictures bearing heavy weight

🗺️ It reflects Issachar's fertile, wedged in land

➡️ This is strength built for labor

## 🌾 He Saw That Rest Was Good, And The Land That It Was Pleasant

Issachar's territory was rich, fertile farmland, good enough to make comfort tempting.

Jacob describes a tribe choosing a peaceful, settled life over the risk of fighting for more.

That choice traded independence for an easier, quieter existence.

Comfort had a real cost attached to it.

🌾 Issachar's land was rich farmland

😌 They valued rest over conflict

⚖️ Comfort was chosen over independence

➡️ Ease came with a hidden cost

## 💰 Bowed His Shoulder To Bear, And Became A Servant Unto Tribute

"Tribute" means regular payments made to a stronger power to avoid conflict.

Issachar's tribe accepted a kind of quiet submission instead of standing for full independence.

Bowing the shoulder pictures an animal already resigned to its heavy load.

Jacob closes this blessing with an image of comfortable, but limited, security.

💰 Tribute means payments made to stay safe

🫏 Bowing the shoulder pictures resignation

🔒 They chose limited security over freedom

📖 Comfort and submission arrived together

# Genesis 49:16-18
# 🐍 Dan The Serpent
---
## ⚖️ Dan Shall Judge His People, As One Of The Tribes Of Israel

The name Dan means "judge" in Hebrew.

Jacob is making a play on Dan's own name, just like he did for Judah.

This promises that Dan's tribe would produce real leaders and deliverers for Israel.

Samson, one of the judges of Israel, later comes from this same tribe.

⚖️ Dan means judge in Hebrew

🔁 Jacob plays on Dan's own name

👤 This promises future leaders for Israel

📖 Samson later comes from this tribe

## 🐍 Dan Shall Be A Serpent By The Way, An Adder In The Path

A serpent hiding beside a road does not attack head on.

It waits, hidden, for the perfect moment to strike.

Jacob is describing Dan's style of warfare, using ambush instead of open battle.

Small in size or numbers did not mean small in danger.

🐍 A hidden serpent does not attack head on

🎯 It waits for the perfect moment

⚔️ This describes Dan's style of warfare

➡️ Small numbers did not mean small danger

## 🐴 That Biteth The Horse Heels, So That His Rider Shall Fall Backward

This pictures a snake striking a horse's back leg instead of a bigger target.

The horse rears in pain and throws its rider backward.

One small, well aimed strike defeats an enemy who looked far stronger.

Jacob is describing clever tactics winning over raw strength.

🐴 A snake strikes the horse's heel, not head

😖 The horse rears and throws its rider

🎯 A small strike can defeat a bigger foe

➡️ Clever tactics win over raw strength

## 🙏 I Have Waited For Thy Salvation, O LORD

Jacob suddenly breaks away from blessing his sons to speak directly to God.

Dan's dangerous, unpredictable future seems to be what triggers this short prayer.

"Salvation" here means God's rescue, not just a spiritual idea.

Even in the middle of naming his sons' futures, Jacob's hope still rests on God alone.

🙏 Jacob suddenly turns to speak to God

😟 Dan's uncertain future may have triggered this

🛟 Salvation means God's rescue and deliverance

📖 Jacob's hope rests on God alone

# Genesis 49:19-21
# 🏹 Gad, Asher, And Naphtali
---
## 🗣️ Gad, A Troop Shall Overcome Him

The name Gad sounds like the Hebrew word for troop or raiders.

Jacob is once again playing on a son's name, the same way he did for Judah and Dan.

This first half of the blessing pictures Gad's tribe under attack from raiders.

Gad's territory sat exposed on the eastern edge of Israel's land, right in the path of raiders.

🗣️ Gad sounds like the word for troop

🔁 Jacob plays on Gad's name again

⚔️ This pictures raiders attacking Gad's tribe

➡️ Their land sat exposed on the border

## 🔄 But He Shall Overcome At The Last

This is the turn in Gad's blessing.

Even after being attacked first, Gad's tribe would win in the end.

Being raided did not mean being defeated permanently.

Jacob promises a final outcome that reverses how the fight began.

🔄 This marks the turn in the blessing

🏆 Gad wins the fight in the end

🛡️ Being raided first was not the final word

📖 The ending reverses the beginning

## 🫒 Out Of Asher His Bread Shall Be Fat, And He Shall Yield Royal Dainties

Asher's land included rich, fertile ground good for growing olives and grain.

"Fat" here means rich and abundant, not a description of being overweight.

"Royal dainties" means food fine enough to be served at a king's table.

Jacob is promising Asher's tribe unusual wealth in food and farmland.

🫒 Asher's land grew rich olives and grain

🍞 Fat here means rich and abundant

👑 Royal dainties means food fit for a king

➡️ Asher's tribe would enjoy real abundance

## 🦌 Naphtali Is A Hind Let Loose

A "hind" is a female deer, known for speed and graceful movement.

"Let loose" pictures the deer running free, without any restraint holding it back.

Jacob is describing Naphtali's tribe as quick, agile, and unrestrained.

This is a picture of freedom, not a picture of fighting strength.

🦌 A hind is a swift female deer

🏃 Let loose means running free and unrestrained

💨 This pictures Naphtali's tribe as agile

➡️ It is a picture of freedom

## 🗣️ He Giveth Goodly Words

This second half of Naphtali's blessing shifts from speed to speech.

"Goodly words" means beautiful, well spoken language.

Jacob is describing a tribe known for eloquence, not just for swift movement.

Physical grace and skilled speech are paired together in this one short blessing.

🗣️ Goodly words means beautiful, well spoken language

🎤 This praises Naphtali's eloquence

🤝 Speech is paired with physical grace

📖 One blessing covers two different gifts

# Genesis 49:22-26
# 🌿 The Blessing Of Joseph
---
## 🌳 Joseph Is A Fruitful Bough, Even A Fruitful Bough By A Well

A "bough" is a branch of a tree.

Planting a tree right beside a well guaranteed it constant water and steady growth.

Jacob pictures Joseph as exactly that kind of tree, healthy and endlessly fruitful.

This image sets up the rest of Joseph's blessing, the longest one Jacob gives.

🌳 A bough is a tree branch

💧 A well gave constant water and growth

🍏 Joseph is pictured as endlessly fruitful

➡️ This opens Jacob's longest blessing

## 🧱 Whose Branches Run Over The Wall

A healthy tree does not stay contained inside a garden wall.

Its branches reach out and spread beyond the space it started in.

This pictures Joseph's influence spreading far past his own family, into Egypt.

Joseph's own story already proved this true long before Jacob spoke this blessing.

🧱 A wall marks where a garden ends

🌿 Branches reach out past that boundary

🇪🇬 This pictures Joseph's influence spreading into Egypt

📖 Joseph's own story already proved this

## 🏹 The Archers Have Sorely Grieved Him, And Shot At Him, And Hated Him

"Archers" pictures every attack Joseph faced across his whole life.

His brothers attacked him first, selling him into slavery out of jealousy.

Potiphar's wife falsely accused him, and unfair imprisonment followed.

Jacob is summing up years of real suffering in one short poetic line.

🏹 Archers pictures every attack on Joseph

👬 His own brothers struck first

👩 Potiphar's wife added a false accusation

➡️ Years of suffering are summed up here

## 💪 But His Bow Abode In Strength

A "bow" here pictures Joseph's own strength and resolve, still intact after every attack.

"Abode in strength" means it stayed firm and did not break under pressure.

Every attempt to destroy Joseph failed to actually break him.

He came through slavery and prison still standing.

🏹 A bow here pictures Joseph's own strength

💪 Abode in strength means it did not break

🚫 Every attack against him failed

📖 He came through still standing

## 🙏 The Arms Of His Hands Were Made Strong By The Hands Of The Mighty God Of Jacob

Jacob names exactly where Joseph's strength actually came from.

It was not Joseph's own cleverness or willpower that carried him through.

"The mighty God of Jacob" is a title tying Joseph's story back to his father's own faith.

The same God who protected Jacob also protected Joseph.

💪 Jacob names the true source of strength

🙅 It was not Joseph's own willpower

🙏 The title used is Mighty God of Jacob

📖 The same God protected both men

## 🐑 From Thence Is The Shepherd, The Stone Of Israel

"Shepherd" and "stone" are both titles for God here, not titles for Joseph.

A shepherd cares for and guides his flock.

A stone pictures something solid and unmovable to build on.

Jacob is naming the God who has led this entire family, generation after generation.

🐑 Shepherd pictures God caring for His people

🪨 Stone pictures something solid to build on

👴 Both titles describe God, not Joseph

📖 This same God has led the whole family

## ☀️ Blessed Thee With Blessings Of Heaven Above, Blessings Of The Deep That Lieth Under

"Heaven above" points to blessings like rain and sunlight.

"The deep that lieth under" points to underground water sources and springs.

Together the two phrases cover every direction blessing could come from.

Jacob is asking for complete, all around provision for Joseph's future.

☀️ Heaven above means rain and sunlight

💧 The deep under means springs and water

🌍 Together they cover every direction

➡️ Jacob asks for complete provision

## 👶 Blessings Of The Breasts, And Of The Womb

This phrase asks for blessings on family growth, healthy children, and future generations.

Ancient blessings often paired the wider land with the people who would fill it.

A fruitful land meant little without a fruitful family to live on it.

Jacob wants both for Joseph's descendants.

👶 This blesses family growth and children

🌾 Land and family blessings often paired together

❤️ A full land needed a full family

📖 Jacob asks for both together

## 👑 They Shall Be On The Head Of Joseph, And On The Crown Of The Head Of Him That Was Separate From His Brethren

"Separate from his brethren" points to how differently Joseph's life unfolded compared to his brothers.

He was sold away, then rose to rule over Egypt, a path unlike any brother's.

"The crown of the head" is a doubled blessing, resting fully on Joseph.

Joseph's two sons, Manasseh and Ephraim, will each become their own tribe.

That gave Joseph an actual double share among the tribes.

🚶 Separate points to Joseph's unusual path

👑 Egypt's throne was unlike any brother's story

🎯 Crown of the head means full blessing

📖 Two sons made the double share literal

# Genesis 49:27-28
# 🐺 Benjamin The Wolf, And The Blessing's Close
---
## 🐺 Benjamin Shall Ravin As A Wolf

"Ravin" is an old word meaning to hunt and tear apart prey violently.

A wolf hunts with speed and aggression, not patience.

Jacob is describing Benjamin's tribe as fierce and quick to fight.

This matches Benjamin's later history, including the judge Ehud and Israel's first king, Saul.

🐺 Ravin means to hunt and tear violently

⚡ A wolf hunts with speed, not patience

⚔️ This describes a fierce, fighting tribe

📖 Ehud and King Saul both came from Benjamin

## 🌅 In The Morning He Shall Devour The Prey, And At Night He Shall Divide The Spoil

This pictures constant activity, victory both at the start and the end of the day.

"Devour the prey" describes the attack itself.

"Divide the spoil" describes splitting up what was won afterward.

Jacob closes Benjamin's blessing with an image of nonstop, successful conquest.

🌅 Morning pictures the attack itself

🌙 Night pictures splitting up what was won

🔄 Together they show constant activity

➡️ Benjamin's blessing ends in conquest

## 🔢 All These Are The Twelve Tribes Of Israel

This line formally closes the list Jacob has been working through.

Twelve sons have now become twelve distinct tribes, each with its own future.

This moment marks a shift from one family's story to a whole nation's story.

Israel is no longer just a man's name.

It now belongs to an entire people.

🔢 Twelve sons become twelve tribes

📜 This formally closes Jacob's list

🌍 A family's story becomes a nation's story

➡️ Israel now names a whole people

## ⚖️ Every One According To His Blessing He Blessed Them

Not every word Jacob spoke sounded like good news.

Reuben, Simeon, and Levi all received hard, corrective words instead of praise.

Even so, the text calls all of it blessing, not judgment.

Naming the hard truth about each son was itself part of loving them well.

⚖️ Not every word sounded like praise

😔 Reuben, Simeon, and Levi got hard words

📖 The text still calls all of it blessing

➡️ Speaking truth was itself an act of love

# Genesis 49:29-33
# 🪦 Jacob's Final Instructions
---
## 💀 I Am To Be Gathered Unto My People

This is a common old expression for death, used often throughout Genesis.

It pictures death as a reunion, not just an ending.

Jacob is not afraid of dying here.

He speaks about it calmly, already looking past it toward his ancestors.

💀 A common old expression for death

🤝 It pictures death as a reunion

😌 Jacob speaks about it calmly

➡️ He looks past death toward his ancestors

## 🗣️ Bury Me With My Fathers In The Cave That Is In The Field Of Ephron The Hittite

Jacob gives one clear, specific instruction before he dies.

Ephron the Hittite was the man Abraham originally bought this burial cave from, in Genesis twenty three.

Jacob wants to be buried in Canaan, the promised land, not in Egypt.

Even in death, Jacob's family stays tied to God's promise of that land.

🗣️ Jacob gives one clear final instruction

🤝 Ephron the Hittite sold Abraham this cave

🗺️ Jacob chooses burial in Canaan, not Egypt

📖 The promised land holds this family still

## 🕳️ In The Cave That Is In The Field Of Machpelah, Which Is Before Mamre

Machpelah was the exact burial cave near Hebron that Abraham purchased generations earlier.

"Before Mamre" simply means it sat near Mamre, a place Abraham once lived.

Jacob repeats these specific location details on purpose.

No confusion would be left about exactly where to bury him.

🕳️ Machpelah was the family's specific burial cave

🌳 Mamre was a place tied to Abraham's life

📍 Jacob repeats the location on purpose

➡️ No confusion was left about the burial site

## 👴 There They Buried Abraham And Sarah His Wife, There They Buried Isaac And Rebekah His Wife, And There I Buried Leah

Jacob lists three generations already resting in this one cave.

Notice that Leah is named here, not Rachel, Jacob's favorite wife.

Rachel died on the road near Bethlehem and was buried there instead.

Jacob still chooses to be buried beside Leah, the wife who was not his favorite in life.

👴 Three generations already rest in this cave

👩 Leah is named here, not Rachel

🛣️ Rachel was buried separately near Bethlehem

📖 Jacob chooses Leah's side for eternity

## 👥 The Purchase Of The Field And Of The Cave That Is Therein Was From The Children Of Heth

"Children of Heth" means the Hittite people who controlled this land at the time.

Jacob repeats that this land was bought honestly, not seized by force.

Genesis twenty three already recorded that full transaction in careful detail.

A family's claim to the promised land began with an honest purchase, not a conquest.

👥 Children of Heth means the Hittite people

💰 The land was bought honestly, not seized

📜 Genesis twenty three recorded the purchase

➡️ An honest deal started the family's claim

## 🛏️ He Gathered Up His Feet Into The Bed, And Yielded Up The Ghost

This pictures Jacob pulling his legs back onto the bed and lying back fully.

"Yielded up the ghost" is an old phrase simply meaning he breathed his last and died.

Jacob's death comes right after he finishes speaking, calm and complete.

A long, hard life closes peacefully, surrounded by the sons he had just blessed.

🛏️ He pulled his legs back onto the bed

💨 Yielded up the ghost means he died

😌 His death follows right after he finishes speaking

📖 A long, hard life closes in peace
`.trim();

export const GENESIS_FORTY_NINE_PERSONAL_SECTIONS = parseGenesisFortyNineRawNotes(GENESIS_FORTY_NINE_RAW_NOTES);
