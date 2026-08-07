export type DeuteronomyElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyElevenRawNotes(rawText: string): DeuteronomyElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 11:${startVerse}` : `Deuteronomy 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Deuteronomy 11 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_ELEVEN_RAW_NOTES = `# Deuteronomy 11:1-7
# 👁️ What Your Own Eyes Have Seen
---
## ❤️ Love The LORD Thy God, And Keep His Charge

"Charge" is an old word for a duty someone is trusted to carry out.

Moses stacks several near identical words together on purpose.

Charge, statutes, judgments, and commandments each describe a different layer of the same law.

Piling them up here signals total obedience, not a partial list to pick from.

📋 Charge means an entrusted duty
🔗 Four words describe one same law
🧱 Stacking words signals completeness
📖 Partial obedience was never the goal
---
## 🕰️ Alway

"Alway" is simply an older spelling of always.

This one small word closes the opening command.

Love and obedience are not meant to be occasional.

The command covers every day, not just the good ones.

🕰️ Alway is an old spelling of always
🔁 The command never has an end date
📆 It covers every single day
📖 Obedience was never meant to be occasional
---
## 👶 I Speak Not With Your Children Which Have Not Known

Moses is not talking to the next generation waiting to be born.

He is talking to the very people standing in front of him right now.

This generation personally lived through Egypt, the wilderness, and Mount Sinai.

Their own memory becomes the proof behind everything Moses is about to say.

🗣️ Moses speaks to this generation directly
👁️ They personally witnessed these events
🚫 Their children had not seen any of it
📖 Their own memory backs up this speech
---
## 💪 His Mighty Hand, And His Stretched Out Arm

This exact pair of images repeats throughout the book of Exodus.

A mighty hand pictures raw power used in battle.

A stretched out arm pictures a deliberate, reaching action.

Together the phrase became a fixed way of describing the Exodus itself.

💪 Mighty hand pictures raw power
🙌 Stretched out arm pictures deliberate action
🔁 This exact pair repeats through Exodus
📖 Together they became shorthand for the Exodus
---
## ⚡ His Miracles, And His Acts

"Miracles" here points to the plagues, signs no one could explain naturally.

"Acts" points to God's larger deeds carried out through the whole event.

Pairing the two words covers both the visible wonders and the whole rescue.

Pharaoh and his entire land both stood under this same judgment.

⚡ Miracles means the unexplainable signs
🏛️ Acts means the larger deeds of rescue
👑 Pharaoh and his land were judged
📖 Both the king and land answered
---
## 🌊 How He Made The Water Of The Red Sea To Overflow Them

Moses points back to the exact moment described fully in Exodus fourteen.

The Egyptian army chased Israel to the edge of the sea.

God let the parted waters return and cover the whole army.

This generation heard this story from parents who watched it happen.

🌊 The sea closed over Egypt's army
📜 Exodus fourteen told this story first
🐎 Horses and chariots were destroyed too
📖 This generation grew up hearing it firsthand
---
## ⏳ Hath Destroyed Them Unto This Day

"Unto this day" means the effect of that judgment was still visible.

Egypt's military power never fully recovered from that loss.

Moses is not describing ancient history read from someone else's book.

He is describing something whose results were still true as he spoke.

⏳ Unto this day means still true now
📉 Egypt never fully recovered its army
🗣️ Moses speaks from personal memory
📖 The judgment's effects were still visible
---
## 🏜️ What He Did Unto You In The Wilderness, Until Ye Came Into This Place

Moses briefly compresses forty years of wilderness history into one line.

Manna, water from the rock, and guidance by cloud and fire all sit inside this phrase.

"This place" means the plains of Moab, just across from Jericho.

Every provision along the way brought this generation to this exact spot.

🍞 This line compresses forty years of history
🧭 God guided every step of the way
📍 This place means the plains of Moab
📖 Every provision led to this exact spot
---
## 💥 Dathan And Abiram, The Sons Of Eliab, The Son Of Reuben

Dathan and Abiram led a rebellion against Moses recorded fully in Numbers sixteen.

They joined a Levite named Korah in challenging Moses and Aaron's leadership.

Naming their exact family line shows this was not a small, forgettable event.

The rebellion involved real, named leaders from a major tribe.

⚔️ Dathan and Abiram led a rebellion
📜 Numbers sixteen tells the full story
👪 They came from the tribe of Reuben
📖 Real named leaders, not a vague event
---
## 🕳️ How The Earth Opened Her Mouth, And Swallowed Them Up

The ground itself split open beneath the rebels' feet.

Their households, their tents, and everything they owned went down with them.

No ordinary disaster explains a judgment this exact and this sudden.

God made sure no one could mistake this for an accident.

🕳️ The ground split open beneath them
🏕️ Their households and tents went down too
⚡ The judgment was sudden and exact
📖 No one could call this an accident
---
## 👥 In The Midst Of All Israel

This judgment did not happen in secret or off in the distance.

The entire nation watched it unfold in real time.

A private punishment could be doubted or forgotten later.

A public one became a permanent, shared memory for the whole camp.

👀 The whole nation watched it happen
🚫 Nothing about this was hidden
🧠 A public judgment becomes shared memory
📖 No one in Israel could forget this
---
## 👁️ Your Eyes Have Seen All The Great Acts Of The LORD

This line closes the whole list of memories Moses just walked through.

Every example given was something this specific audience personally witnessed.

Moses is building his case on eyewitness testimony, not rumor.

Everything commanded in the rest of this chapter rests on this shared memory.

👁️ This audience personally saw it all
🧾 Moses builds his case on eyewitness memory
🚫 None of this rests on rumor
📖 Shared memory becomes the foundation for obedience

# Deuteronomy 11:8-12
# 🌧️ A Land Unlike Egypt
---
## 💪 That Ye May Be Strong, And Go In And Possess The Land

Obedience here gets tied directly to physical strength for what comes next.

This is not spiritual strength alone but the courage and readiness for conquest.

A divided, disobedient people rarely fights well or holds new territory.

Following God's commands was part of Israel's actual battle preparation.

💪 Strength here includes courage for conquest
⚔️ A divided people fights poorly
🛡️ Obedience was part of Israel's preparation
📖 Commands and conquest were tied together
---
## 📅 This Day

"This day" repeats constantly throughout the whole book of Deuteronomy.

It marks the command as urgent, not a rule for someday later.

Moses keeps pointing back to this exact moment of decision.

Every generation reading this later stands in its own this day.

📅 This day appears again and again
⏰ It marks urgency, not someday later
🗣️ Moses points back to this one moment
📖 Every reader faces their own this day
---
## 🍯 A Land That Floweth With Milk And Honey

This phrase describes a land rich enough to support herds and orchards easily.

Milk points to healthy livestock with plenty of pasture to graze.

Honey likely includes date syrup as well as bee honey.

The whole phrase became the Bible's shorthand for a fertile, generous land.

🐐 Milk points to healthy, well fed herds
🍯 Honey likely includes date syrup too
🌾 The land supported life easily
📖 This phrase became shorthand for abundance
---
## ⏳ That Ye May Prolong Your Days In The Land

Long life in the land is promised as a direct result of obedience.

This same connection between obedience and long days appears in the ten commandments.

The promise covers this generation and every generation born after them.

Staying in the land at all depended on this ongoing relationship.

⏳ Long life is tied to obedience
🔟 The ten commandments made this same link
👨‍👩‍👧 The promise reaches future generations too
📖 Staying in the land depended on this
---
## 🦶 Wateredst It With Thy Foot

Egyptian farmers relied on the Nile River rather than rainfall to grow crops.

Getting water from the river into the fields took constant physical effort.

Some methods used a foot powered device to lift water into irrigation channels.

Egypt's harvest depended on human muscle working the land every single day.

🌊 Egypt depended on the Nile, not rain
🦶 Foot powered devices moved the water
💪 Human effort ran the whole system
📖 Egypt's harvest relied on constant labor
---
## 🌿 As A Garden Of Herbs

"Herbs" here means vegetables and garden plants in general, not just spices.

The comparison pictures a small, carefully watered vegetable patch, not open farmland.

Egypt's whole agriculture gets compared to a tiny backyard garden.

The image makes Egypt sound smaller and more fragile than it actually was.

🌿 Herbs means vegetables and garden plants
🪴 The image pictures a small watered patch
📏 Egypt is compared to a backyard garden
📖 The comparison makes Egypt sound fragile
---
## ⛰️ A Land Of Hills And Valleys

Canaan's landscape looks nothing like Egypt's flat river valley.

Hills and valleys mean fields sit at many different heights.

This kind of ground cannot be irrigated by a single river system.

The terrain itself makes the next verse's promise necessary.

⛰️ Canaan has hills and valleys, not flat land
🚫 One river cannot irrigate ground like this
🗺️ The terrain is completely different from Egypt
📖 This sets up the promise in verse twelve
---
## 🌧️ Drinketh Water Of The Rain Of Heaven

Canaan's crops depend entirely on rainfall instead of a river.

No amount of human effort can force rain to fall.

This single fact ties Israel's harvest directly to God's provision.

Obedience and rainfall become directly connected for the whole nation.

🌧️ Canaan's crops depend on rain, not a river
🚫 No human effort can produce rain
🙏 The harvest depends on God directly
📖 Obedience and rainfall become connected
---
## 👀 The Eyes Of The LORD Thy God Are Always Upon It

This line pictures God's constant, personal attention on this specific land.

It is not one province among many that He glances at occasionally.

The phrase reassures a people about to depend completely on rainfall.

Their new home was never outside God's watchful care.

👀 God watches this land constantly
🌍 It is not just one province among many
🙏 The reassurance fits a rain dependent people
📖 The land was never outside God's care
---
## 📆 From The Beginning Of The Year Even Unto The End Of The Year

This phrase rules out any gaps in God's attention.

It covers the planting season, the growing season, and the harvest.

No part of the farming calendar sits outside His notice.

The whole agricultural year rests under this same watchful care.

📆 The phrase covers the whole year
🌱 Planting, growing, and harvest are all included
🚫 No season sits outside God's notice
📖 The whole calendar rests under his care

# Deuteronomy 11:13-17
# 🌦️ Rain As Reward, Drought As Warning
---
## 👂 Hearken Diligently Unto My Commandments

"Hearken" is an old word that means to listen closely and respond.

"Diligently" adds the idea of careful, consistent effort, not a one time glance.

This is not passive listening while thinking about something else.

The word describes attention that leads directly into action.

👂 Hearken means listen and respond
🔁 Diligently means careful, consistent effort
🚫 This is not passive listening
📖 Attention here leads straight into action
---
## 🔁 To Love The LORD Your God, And To Serve Him With All Your Heart And With All Your Soul

This exact phrase already appeared in the previous chapter, word for word.

Deuteronomy repeats phrases like this on purpose, not out of carelessness.

Repetition in this book works like a refrain in a song.

The command sticks in memory precisely because it keeps coming back.

🔁 This exact phrase repeated from chapter ten
🎯 Repetition here is deliberate, not careless
🎵 It works like a refrain in a song
📖 Repetition helps the command stick
---
## 🌦️ The First Rain And The Latter Rain

Israel's farming year depended on two separate rainy seasons.

The first rain fell in autumn and softened the ground for planting.

The latter rain fell in spring and ripened the grain before harvest.

Missing either one could ruin the whole year's food supply.

🍂 First rain came in autumn for planting
🌱 Latter rain came in spring for ripening
🌾 Both rains were needed for one harvest
📖 Missing either rain threatened the food supply
---
## 🌾 Thy Corn, And Thy Wine, And Thine Oil

"Corn" in this old translation means grain in general, not modern corn.

Wine came from grapes and oil came from olives, the land's two main tree crops.

Together these three named the basic diet of an ordinary Israelite household.

Naming all three covers grain, drink, and cooking fuel in one line.

🌾 Corn here means grain, not modern corn
🍇 Wine came from grapes
🫒 Oil came from olives
📖 These three covered daily food and drink
---
## 🐄 I Will Send Grass In Thy Fields For Thy Cattle

God's promised blessing does not stop with human food alone.

Livestock needed grass just as much as people needed grain.

A family's herds and flocks were part of their whole livelihood.

Providing for the animals meant providing for the whole household's future.

🐄 The blessing includes the family's animals
🌱 Grass mattered as much as grain
🐑 Herds were part of a family's livelihood
📖 God's provision covered the whole household
---
## ⚠️ Take Heed To Yourselves

"Take heed" is a direct warning to stay alert and careful.

The command shifts suddenly from blessing to a real danger ahead.

Comfort and prosperity are exactly when people tend to grow careless.

Moses interrupts the good news with a necessary caution.

⚠️ Take heed means stay alert
🔄 The tone shifts from blessing to warning
😌 Comfort often leads to carelessness
📖 Moses interrupts good news with caution
---
## 💭 That Your Heart Be Not Deceived

Deception here does not come from an outside trick alone.

It starts quietly inside a person's own thinking and desires.

A deceived heart can slowly justify serving other gods without noticing the shift.

This warning targets the slow drift, not a single dramatic decision.

💭 Deception can start inside a person's own heart
🐌 It usually happens slowly, not all at once
🙈 A person may not notice the drift
📖 This warns against slow drift, not one choice
---
## 🔥 The LORD's Wrath Be Kindled Against You

"Kindled" pictures anger starting small, like a fire catching a spark.

This is not God losing control of His emotions.

It describes a just response to a broken relationship.

The image connects directly to the drought that follows in the same verse.

🔥 Kindled pictures anger starting like a spark
⚖️ This is a just response, not chaos
💔 It follows a broken relationship
📖 The image connects to the drought ahead
---
## ☁️ He Shut Up The Heaven, That There Be No Rain

This verse directly reverses the blessing promised back in verse fourteen.

The same sky that sent rain could just as easily withhold it.

A land dependent on rain had no backup water source to rely on.

The threat makes the earlier promise feel even more urgent.

☁️ This reverses the blessing from verse fourteen
🚫 The same sky could withhold rain instead
💧 There was no backup water source
📖 The threat makes the promise feel urgent

# Deuteronomy 11:18-21
# 📜 Words Worn, Taught, And Written
---
## 🫀 Lay Up These My Words In Your Heart And In Your Soul

"Lay up" pictures storing something valuable for safekeeping.

The heart and soul together describe a person's whole inner life.

God's words are treated like treasure worth protecting, not just information to remember.

Something stored this deep shapes decisions before a person consciously thinks about it.

🫀 Lay up means store something valuable
💎 God's words are treated like treasure
🧠 Heart and soul describe the whole inner life
📖 Stored words shape decisions automatically
---
## 🖐️ Bind Them For A Sign Upon Your Hand

Some Israelites later took this command literally, wearing small boxes on the arm and forehead.

These boxes, called tefillin, held tiny scrolls with scripture written inside.

Whether meant literally or as a picture, the point stays the same.

God's words were meant to guide every action a person's hands actually do.

🖐️ Some wore this literally on the arm
📦 The boxes are called tefillin
✍️ Tiny scrolls of scripture sat inside them
📖 God's words were meant to guide action
---
## 👨‍👧 Ye Shall Teach Them Your Children

Passing this law forward was never left to chance or to priests alone.

Every parent carried direct responsibility for their own children's education.

No formal school system existed to handle this instead.

The home itself was the primary classroom for God's law.

👨‍👧 Parents carried direct teaching responsibility
🏫 No formal school handled this instead
🏠 The home was the primary classroom
📖 Teaching was never optional or outsourced
---
## 🌅 When Thou Sittest In Thine House

This same four part list already appeared word for word in Deuteronomy six.

The four moments named cover the entire rhythm of an ordinary day.

Sitting at home, walking outside, lying down, and waking up leave no gap.

Teaching God's law was meant to fill daily life, not one lesson a week.

🔁 This list repeats from Deuteronomy six
🕰️ It covers the whole rhythm of a day
🚫 No part of the day is left out
📖 Teaching filled daily life, not one lesson
---
## 🚪 Write Them Upon The Door Posts Of Thine House

Later Jewish practice placed a small case called a mezuzah on the doorframe.

The case held a tiny scroll with these very words written inside.

Anyone entering or leaving the home would pass by this reminder daily.

The command turned an ordinary doorway into a constant teaching tool.

🚪 Later practice used a case called a mezuzah
📜 A tiny scroll sat inside the case
🔄 Anyone passing through saw the reminder
📖 An ordinary doorway became a teaching tool
---
## 🏛️ Upon Thy Gates

Gates in this culture meant the entrance to a town, not just a home.

City gates were where elders met, deals were made, and disputes were judged.

Writing God's words there placed them at the center of public life.

This was not a private reminder only, but a public one too.

🏛️ Gates meant a town's public entrance
⚖️ Elders judged disputes at the gate
🏙️ This placed God's words in public life
📖 The reminder was public, not only private
---
## ☀️ As The Days Of Heaven Upon The Earth

This idiom means for as long as the sky continues to exist.

It is a poetic way of promising something close to forever.

The promise of long life in the land is tied to this same idea.

As long as the sky remains, the promise was meant to remain too.

☀️ The phrase pictures something close to forever
🌌 It compares the promise to the sky itself
⏳ Long life in the land is the promise
📖 The promise was meant to last that long

# Deuteronomy 11:22-25
# 🗺️ A Border From The Wilderness To The Sea
---
## ✅ Diligently Keep All These Commandments Which I Command You, To Do Them

"To do them" adds something beyond simply knowing or agreeing with the commands.

Hearing the law and agreeing with it were never treated as enough on their own.

The whole promise that follows depends on this one word, do.

Knowledge without action carried no weight in this covenant.

✅ To do them means actual action
🚫 Knowing the law alone was not enough
🔑 The whole promise depends on this word
📖 Knowledge without action carried no weight
---
## ⚔️ Ye Shall Possess Greater Nations And Mightier Than Yourselves

Israel was never the strongest nation standing in this land.

The nations already living there were larger and better equipped for war.

Deuteronomy has already made this same point about Israel's small size.

Victory here could never be credited to Israel's own military strength.

⚔️ The nations in Canaan were stronger
📉 Israel was the smaller side by far
📜 Deuteronomy already made this same point
📖 Victory could not be credited to Israel alone
---
## 🦶 Every Place Whereon The Soles Of Your Feet Shall Tread Shall Be Yours

This is a Hebrew idiom for claiming land simply by walking across it.

The same picture appears again later in the book of Joshua.

It describes potential territory, not land Israel would instantly occupy all at once.

The promise stretched further than what Israel actually settled right away.

🦶 Walking the land pictured claiming it
📜 Joshua later repeats this same picture
🗺️ This describes potential, not instant occupation
📖 The promise reached further than early settlement
---
## 🗺️ From The Wilderness And Lebanon, From The River, The River Euphrates, Even Unto The Uttermost Sea

This line marks out the four outer edges of the promised territory.

The wilderness sat to the south and Lebanon sat to the north.

The river Euphrates marked a far eastern edge, well beyond the Jordan.

The uttermost sea meant the Mediterranean coastline to the west.

🧭 Wilderness marked the southern edge
🏔️ Lebanon marked the northern edge
🌊 The Euphrates marked the eastern edge
📖 The Mediterranean marked the western edge
---
## 🛡️ There Shall No Man Be Able To Stand Before You

This promise covers every enemy Israel would face while entering the land.

It is stated as a flat, unqualified guarantee, not a hopeful guess.

The guarantee depended entirely on the obedience described earlier in this chapter.

Military victory here was never separated from covenant faithfulness.

🛡️ No enemy could stand against them
✅ This is a flat guarantee, not a guess
🔗 The guarantee depended on obedience
📖 Victory and faithfulness were never separated
---
## 😨 The Fear Of You And The Dread Of You

God promised to plant terror into the hearts of Israel's enemies ahead of time.

This same promise had already been given back in the book of Exodus.

The fear worked like an invisible weapon, softening resistance before any battle began.

Israel's coming victories relied on more than swords and numbers.

😨 God planted fear into enemy hearts
📜 Exodus already promised this same thing
🗡️ Fear worked like an invisible weapon
📖 Victory relied on more than weapons

# Deuteronomy 11:26-28
# ⚖️ A Blessing And A Curse
---
## 👉 I Set Before You This Day A Blessing And A Curse

Moses lays out two clear paths with no third option offered.

"Set before you" pictures a real choice placed directly in front of someone.

Ancient covenants between kings and nations often used this same structure.

Israel is being asked to choose, not just to listen passively.

👉 Two paths are set out, no third option
📜 Ancient covenants used this same structure
🎯 Israel faces a real, direct choice
📖 Israel must choose, not just listen
---
## ✅ A Blessing, If Ye Obey The Commandments

The blessing side of this choice is stated simply and directly.

Obedience is the one condition attached to receiving it.

Nothing here is left vague for the listener to guess at.

The reward was made as clear as the requirement.

✅ Obedience is the one condition
🎁 The blessing is stated plainly
🚫 Nothing here is left vague
📖 The reward matches the clarity of the command
---
## 🔀 Turn Aside Out Of The Way Which I Command You

"The way" pictures obedience as a clear, marked path to walk on.

Turning aside means leaving that path, even gradually or without meaning to.

The image will return again and again throughout the rest of Deuteronomy.

Straying rarely looks dramatic when it first begins.

🛤️ The way pictures obedience as a path
🔀 Turning aside means leaving that path
🐌 Straying often starts small and gradual
📖 This picture repeats throughout Deuteronomy
---
## ❓ To Go After Other Gods, Which Ye Have Not Known

"Which ye have not known" points out that these gods were foreign imports.

Following an unfamiliar god meant trading real, shared history for a stranger.

This short blessing and curse pair is only a preview here.

Deuteronomy twenty seven and twenty eight will spell out both lists in full.

❓ These gods were unfamiliar imports
🔄 Following them meant trading history for a stranger
📜 This chapter previews a fuller list later
📖 Chapters twenty seven and twenty eight expand it

# Deuteronomy 11:29-32
# 🏔️ Gerizim, Ebal, And A Promise That Started With Abraham
---
## ⛰️ Put The Blessing Upon Mount Gerizim, And The Curse Upon Mount Ebal

These two mountains stood facing each other near the town of Shechem.

Later in Joshua eight, Israel actually carried out this exact ceremony.

Six tribes stood on each mountain, reciting the blessings and curses aloud.

The command given here waited years before it was finally fulfilled.

⛰️ Gerizim and Ebal faced each other at Shechem
📜 Joshua eight records the ceremony happening
👥 Six tribes stood on each mountain
📖 A command given here was fulfilled years later
---
## 🌅 On The Other Side Jordan, By The Way Where The Sun Goeth Down

Moses is speaking from the east side of the Jordan River.

He himself will never cross over into the land he is describing.

"Where the sun goeth down" simply means toward the west.

Every direction given here is aimed at people who have not arrived yet.

🗺️ Moses speaks from the east side of Jordan
🚫 He will never cross over himself
🌇 Sun goeth down means toward the west
📖 These directions are for people not yet there
---
## 🌾 Which Dwell In The Champaign Over Against Gilgal

"Champaign" is an old word for flat, open countryside.

This description helps locate Shechem for people who have never seen it.

Gilgal was a well known camp site near where Israel would first cross the Jordan.

Giving a landmark like this made the instructions usable, not just theoretical.

🌾 Champaign is an old word for open plain
📍 This description helps locate Shechem
⛺ Gilgal was a familiar camp site
📖 A landmark made the instructions usable
---
## 🌳 Beside The Plains Of Moreh

This exact location already appears far earlier in the book of Genesis.

Abraham first stopped here and received God's promise about this land.

Moses is quietly pointing this new generation back to that first promise.

The place where the promise began is the same place its terms get spelled out.

🌳 This location appears back in Genesis
👴 Abraham first stopped here long ago
🔗 Moses connects this generation to that promise
📖 The promise's start and its terms meet here
---
## 🌊 Ye Shall Pass Over Jordan To Go In To Possess The Land

This line restates the coming crossing in plain, direct language.

No new information is added here beyond what was already said.

Sometimes Moses repeats a plain fact simply to keep it firmly in view.

The repetition builds anticipation for the crossing that is coming soon.

🌊 The crossing is restated plainly
🔁 No new information is added here
🎯 Repetition keeps the fact firmly in view
📖 The anticipation builds toward the crossing
---
## 📋 Observe To Do All The Statutes And Judgments Which I Set Before You

"Observe to do" means more than simply hearing the law read aloud.

The word ties directly back to the same emphasis on doing from earlier in this chapter.

This closing line hinges into the specific laws that follow in chapter twelve.

Everything commanded so far has been building toward this one word, do.

📋 Observe to do means actual practice
🔗 This ties back to earlier in the chapter
🚪 The line hinges into chapter twelve's laws
📖 Everything built toward this one word
`.trim();

export const DEUTERONOMY_ELEVEN_PERSONAL_SECTIONS = parseDeuteronomyElevenRawNotes(DEUTERONOMY_ELEVEN_RAW_NOTES);
