export type DeuteronomyTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyTwelveRawNotes(rawText: string): DeuteronomyTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 12:${startVerse}` : `Deuteronomy 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Deuteronomy 12 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_TWELVE_RAW_NOTES = `# Deuteronomy 12:1-4
# 🔥 Tearing Down Every Trace Of Canaanite Worship
---
## 📜 Statutes And Judgments

"Statutes" and "judgments" describes two different kinds of law.

A statute is a fixed rule handed down directly.

A judgment is a ruling that grew out of settling a real dispute.

Moses is telling Israel that both kinds of law bind them once they enter the land.

📜 Statutes are fixed, direct rules

⚖️ Judgments came from settled disputes

🏞️ Both apply once Israel enters Canaan

📖 Two kinds of law, one same obedience

---
## ⏳ All The Days That Ye Live Upon The Earth

This phrase sets no expiration date on the command.

Moses is not describing rules for the conquest generation only.

Every generation that lives in the land after them inherits the same duty.

The command was built to outlast the people receiving it.

⏳ No expiration date is given

👪 Future generations inherit the duty

🏞️ The command outlives this generation

➡️ Obedience was never meant to fade

---
## 🔨 Ye Shall Utterly Destroy All The Places

"Utterly" rules out a partial cleanup.

Israel is not being told to reform Canaanite worship sites or repurpose them.

Every site connected to those gods had to be completely wiped out.

Half measures were never an option God offered here.

🔨 Utterly means a complete removal

🚫 Reforming the sites was never allowed

🗑️ Every connected site had to go

📖 Half measures were not an option

---
## ⛰️ Upon The High Mountains, And Upon The Hills, And Under Every Green Tree

Canaanite worship was not centered in one building.

Mountains, hills, and shaded trees were common outdoor worship sites across the ancient Near East.

These "high places" were believed to sit closer to the gods being worshiped there.

Naming all three locations covers every version of this kind of worship Israel might find.

⛰️ High places meant open air worship sites

🌳 Trees and hills both counted as sites

🙏 These spots were believed closer to the gods

📖 Every version of this worship is covered

---
## 🪨 Break Their Pillars, And Burn Their Groves With Fire

A pillar here was an upright stone set up to represent a god's presence.

A grove meant a wooden pole, often carved, connected to the Canaanite goddess Asherah.

Stone gets broken, but wood gets burned, matching the destruction method to the material.

Nothing about these objects was worth preserving as art or history.

🪨 Pillars were stone markers for gods

🪵 Groves were wooden Asherah poles

🔥 Wood was burned, stone was broken

📖 Nothing here was worth preserving

---
## 🗿 Hew Down The Graven Images Of Their Gods

"Graven" means carved or engraved by hand.

These images were physical idols meant to represent a god's form.

"Hew down" pictures the same violent action used for cutting down a tree.

The idols get no gentler treatment than the wooden groves beside them.

🗿 Graven means carved by hand

👤 Images were idols shaped like gods

🪓 Hew down means chopped down violently

📖 Idols received no special treatment

---
## 🚫 Ye Shall Not Do So Unto The LORD Your God

This line draws a sharp boundary under everything just commanded.

Destroying pagan altars was required.

Copying that same style of worship for the true God was forbidden.

God did not want the leftover buildings or methods repurposed toward himself.

🚫 Destroy their sites completely

🙅 Do not repurpose their methods

🔀 God wants a different kind of worship

➡️ A clean break, not a copy

# Deuteronomy 12:5-7
# 🏛️ One Place, Not Many
---
## 🏛️ The Place Which The LORD Your God Shall Choose Out Of All Your Tribes To Put His Name There

God does not name a specific city yet.

Instead he promises to choose one single location later, out of every tribe's territory.

That place ends up being Jerusalem, chosen generations later under David and Solomon.

"To put his name there" means that location would carry God's own presence and reputation.

🏛️ God promises to choose one location

🕰️ The choice comes generations later

🏙️ That place becomes Jerusalem

📖 His name marks his own presence

---
## 🔗 Out Of All Your Tribes

Each of Israel's twelve tribes had its own territory.

Canaanite religion let people worship at whichever hilltop was nearest to them.

God instead ties every tribe to the same single worship site.

One location kept the whole nation united around one God, not twelve local versions.

🔗 One site, not twelve local ones

🗺️ Canaanite worship had scattered locations

🤝 A single site kept the nation united

➡️ Unity mattered more than convenience

---
## 🔥 Thither Ye Shall Bring Your Burnt Offerings, And Your Sacrifices, And Your Tithes

A burnt offering was completely consumed on the altar, given entirely to God.

A sacrifice more broadly covered offerings where part of the animal could be eaten.

A tithe was a tenth of a person's produce or animals, set apart for God.

All three, once the chosen place existed, had to go there and nowhere else.

🔥 Burnt offerings were fully consumed

🍖 Sacrifices could include a shared meal

🔟 A tithe was one tenth given to God

📖 All three belonged at one place only

---
## 🙌 Heave Offerings Of Your Hand

A heave offering got its name from the motion of lifting a portion up before God.

The worshiper physically raised part of the gift before giving it to the priests.

The gesture itself was a small, visible act of dedication.

It turned an ordinary gift into something that looked like worship as it was given.

🙌 Heave means lifted up before God

✋ The worshiper raised it themselves

👀 A visible gesture of dedication

📖 The motion itself became part of worship

---
## 🐄 The Firstlings Of Your Herds And Of Your Flocks

A firstling was the first born male of a herd or flock animal.

Giving the firstborn animal to God recalled the Passover, when Israel's own firstborn sons were spared.

Offering the first and best, rather than whatever was left over, marked real trust.

This was never meant to be an afterthought gift.

🐄 Firstling means the first born animal

🐑 It recalled the Passover deliverance

🥇 Giving the first showed real trust

📖 God never got Israel's leftovers

---
## 🎉 There Ye Shall Eat Before The LORD Your God, And Ye Shall Rejoice

Worship at the chosen place was not only somber ritual.

Families shared a real meal there, eating part of what they had offered.

"Rejoice" makes it clear this was meant to feel like a celebration.

Obedience and genuine joy were never meant to be separated.

🎉 Worship included a real shared meal

🍽️ Families ate part of their own offering

😊 Rejoice means this was a celebration

➡️ Obedience and joy were never separated

# Deuteronomy 12:8-12
# 🏕️ Not Yet, But Coming
---
## 🏕️ Ye Shall Not Do After All The Things That We Do Here This Day

"Here" means the wilderness camp, where Israel is still traveling.

Wilderness worship had to be flexible since the people never stayed anywhere long.

Moses warns that this loose arrangement was never meant to become the permanent pattern.

Something about worship was about to change once Israel actually settled down.

🏕️ Here means the traveling wilderness camp

🎯 Wilderness worship had to stay flexible

🔄 This pattern was not meant to last

➡️ Settling down would change how they worshiped

---
## 👁️ Every Man Whatsoever Is Right In His Own Eyes

This exact phrase becomes a famous warning later in the book of Judges.

There it describes a nation falling apart without any real leadership or order.

Here Moses uses it to describe temporary wilderness conditions, not a compliment.

The chosen place in Deuteronomy twelve was God's answer to this exact danger.

👁️ Everyone did what seemed right to them

📜 Judges later uses this same warning phrase

⚠️ It describes disorder, not freedom

📖 The chosen place answers this danger

---
## ⏳ Ye Are Not As Yet Come To The Rest And To The Inheritance

"Rest" here means safety from war, not simply a pause.

"Inheritance" means the actual land promised generations earlier to Abraham.

Israel is still traveling through the wilderness, short of both.

Everything commanded about the chosen place assumes a future Israel has not reached yet.

⏳ Rest means safety, not just relaxing

🏞️ Inheritance means the promised land itself

🚶 Israel has not arrived at either yet

📖 These commands look toward the future

---
## 🛡️ When He Giveth You Rest From All Your Enemies Round About

This rest gets described again and again throughout the book of Joshua.

It was not fully realized until generations later, under kings David and Solomon.

Only once the surrounding threats were gone could Israel safely settle around one central worship site.

Security and centralized worship were tied together on purpose.

🛡️ Rest meant safety from surrounding enemies

📜 Joshua describes this rest unfolding

👑 Full rest came later, under David and Solomon

➡️ Security and worship were linked together

---
## 🕍 The Levite That Is Within Your Gates

The tribe of Levi received no territory of its own when the land was divided.

Levites instead lived scattered among the other tribes, supported by their neighbors' offerings.

"Within your gates" simply means living in an ordinary Israelite town.

Every mention of the Levite in this chapter is a reminder to include someone who owned no land.

🕍 Levites received no tribal land

🏘️ They lived scattered among other tribes

🤝 Neighbors supported them through offerings

📖 The law kept landless Levites included

---
## 🚫 Forasmuch As He Hath No Part Nor Inheritance With You

This line explains exactly why the Levite depended on others.

Every other tribe received farmland to grow food and raise animals.

The Levite's inheritance was serving at the sanctuary itself, not a plot of ground.

Rejoicing together at the chosen place became one of the few ways Israel could actually provide for them.

🚫 Levites owned no farmland

🕍 Their inheritance was sanctuary service

🍽️ Shared meals helped provide for them

📖 The system depended on shared generosity

# Deuteronomy 12:13-16
# 🐐 Sacred Place, Ordinary Table
---
## ⚠️ Take Heed To Thyself

This exact warning phrase repeats several times across Deuteronomy.

It signals that a command carries real, ongoing risk if it gets ignored.

Moses is not simply informing Israel here.

He is telling them to stay personally alert to this specific danger.

⚠️ This phrase repeats throughout Deuteronomy

🚨 It signals real, ongoing risk

👤 The warning is personal, not general

➡️ Staying alert mattered as much as knowing

---
## 🚫 That Thou Offer Not Thy Burnt Offerings In Every Place That Thou Seest

Canaanite religion let worshipers sacrifice at whatever hilltop or shrine was closest.

God forbids that same casual approach for Israel's offerings.

"Every place that thou seest" pictures someone picking a worship site out of convenience alone.

Convenience was never allowed to replace the one place God actually chose.

🚫 Convenience worship was forbidden

🗺️ Canaanite worship allowed any nearby site

👀 Every place thou seest means casual choosing

📖 Convenience never outranked God's choice

---
## 🍖 Notwithstanding Thou Mayest Kill And Eat Flesh In All Thy Gates

Before this law, killing an animal for food was often treated as a small sacrifice in itself.

This verse separates ordinary meals from sacrificial worship for the first time this clearly.

Once Israel had one central altar, it became impractical to bring every meal's meat there.

God allows ordinary eating anywhere while keeping true worship at the one chosen place.

🍖 Ordinary meat could be eaten anywhere

🔀 This separates daily meals from sacrifice

🏛️ Only worship stayed tied to one place

➡️ God allowed convenience for food, not worship

---
## 🦌 As Of The Roebuck, And As Of The Hart

A roebuck is a small wild deer, and a hart is a full grown male deer.

Neither animal was ever used for sacrifice on the altar.

Comparing ordinary meat to wild game makes the point plainly.

This kind of eating carried no more religious weight than hunting.

🦌 Roebuck means a small wild deer

🐾 Hart means a full grown male deer

🏹 Neither animal was ever sacrificed

📖 Ordinary eating carried no religious weight

---
## 🩸 Ye Shall Not Eat The Blood

This command appears again and again throughout the law.

Blood represented the life of the animal itself, not just a body fluid.

Eating meat was allowed freely, but this one boundary stayed fixed no matter where the meal happened.

The rule protected something Israel was never permitted to treat casually.

🩸 Blood represented the animal's life

🔁 This command repeats throughout the law

🍖 Meat was free, but blood was not

📖 One fixed boundary stayed in every meal

---
## 💧 Pour It Upon The Earth As Water

This instruction is deliberately plain and unceremonial.

Pouring blood out like ordinary water meant no special ritual was attached to it here.

That contrasts sharply with blood poured on the altar during an actual sacrifice.

Ordinary meals got ordinary treatment, sacrifices got sacred treatment.

💧 Poured out like plain water

🚫 No ritual was attached to it here

🔥 Altar blood, by contrast, was sacred

📖 Ordinary meals stayed ordinary

# Deuteronomy 12:17-19
# 🫘 What Stays At The Sanctuary
---
## 🚫 Thou Mayest Not Eat Within Thy Gates The Tithe Of Thy Corn, Or Of Thy Wine, Or Of Thy Oil

The freedom to eat ordinary meat anywhere, given back in verse fifteen, does not extend to the tithe.

Corn here means grain in general, not the specific crop known as corn today.

Wine came from grapes, oil came from olives, the land's two main tree crops.

All three had to travel to the one chosen place instead of staying home.

🚫 Tithes could not be eaten at home

🌾 Corn here means grain in general

🍇 Wine and oil came from grapes and olives

📖 Tithes traveled to the chosen place only

---
## 🤝 Nor Any Of Thy Vows Which Thou Vowest, Nor Thy Freewill Offerings

A vow was a voluntary promise made to God, often during a moment of need.

A freewill offering was simply a gift given out of generosity, with no vow attached.

Both types stayed just as restricted to the chosen place as the required tithe.

Even a gift Israel chose to give still had to be given in the right place.

🤝 A vow was a personal promise to God

🎁 A freewill offering needed no vow

📍 Both stayed tied to the chosen place

➡️ Even chosen gifts followed God's terms

---
## 🍽️ Thou Must Eat Them Before The LORD Thy God In The Place Which The LORD Thy God Shall Choose

This repeats language already used earlier in the chapter almost word for word.

Deuteronomy repeats key phrases like this on purpose, the way a refrain repeats in a song.

The repetition keeps hammering home the same single location every single time.

By this point in the chapter, the reader cannot miss the point.

🍽️ The language repeats from earlier verses

🎵 Deuteronomy uses repetition like a refrain

📍 One location keeps getting named

📖 The point becomes impossible to miss

---
## 🕍 Take Heed To Thyself That Thou Forsake Not The Levite As Long As Thou Livest Upon The Earth

This warning about the Levite already appeared back in verse twelve.

Landless and dependent on others, the Levite could easily get forgotten once families settled into their own routines.

"As long as thou livest" makes this a lifelong responsibility, not a one time gesture.

The chosen place existed partly to keep this exact group from being overlooked.

🕍 The Levite warning repeats from verse twelve

🏠 Settled routines could easily forget them

⏳ This was a lifelong responsibility

📖 The system protected against being overlooked

# Deuteronomy 12:20-25
# 🗺️ Room To Grow, One Rule That Never Moves
---
## 🗺️ When The LORD Thy God Shall Enlarge Thy Border, As He Hath Promised Thee

God had already promised Israel a much larger territory than what they would first settle.

Growth was expected, not treated as an unlikely possibility.

This exact promise appears earlier, describing land stretching from the wilderness to the Euphrates.

That growth created a new, practical problem the rest of this passage now solves.

🗺️ God promised territory that would grow

📈 Expansion was expected, not unlikely

📜 This matches the earlier border promise

📖 Growth created a new practical problem

---
## 🚶 If The Place Which The LORD Thy God Hath Chosen To Put His Name There Be Too Far From Thee

A larger nation meant some families would live a long journey from the one chosen sanctuary.

Bringing every ordinary animal that far for a routine meal was not realistic.

God had already anticipated this exact difficulty.

The law adjusts to distance without ever moving the sanctuary itself.

🚶 A larger nation meant longer travel

🐐 Routine meals could not all travel far

🔮 God had already planned for this

➡️ The law adjusted, the sanctuary did not move

---
## 🍖 As I Have Commanded Thee, And Thou Shalt Eat In Thy Gates Whatsoever Thy Soul Lusteth After

"Lusteth after" here simply means a strong craving, not something sinful.

The phrase repeats the same permission already granted back in verse fifteen.

Distance from the sanctuary never became an excuse to ignore the law entirely.

The same careful boundaries about blood still applied no matter how far someone lived.

🍖 Lusteth after means a strong craving

🔁 This repeats the permission from verse fifteen

📏 Distance never excused ignoring the law

📖 The same boundaries still applied everywhere

---
## 🩸 For The Blood Is The Life

This line states the reason behind the blood law plainly, for the first time this directly in the chapter.

Blood was not viewed as just another part of the animal.

It represented the very life force of the creature itself.

Eating it would have blurred a line God wanted kept sharp between ordinary food and sacred life.

🩸 Blood represented the animal's actual life

❤️ It was never treated as ordinary food

🔪 The line between the two stayed sharp

📖 This verse finally explains the reason why

---
## 👨‍👩‍👧 That It May Go Well With Thee, And With Thy Children After Thee, When Thou Shalt Do That Which Is Right In The Sight Of The LORD

Obedience here is tied directly to a promised blessing.

That blessing was never meant for one person alone.

It was meant to reach children not even born yet at the time Moses spoke these words.

A small daily choice about food carried consequences that stretched across generations.

👨‍👩‍👧 The blessing reaches future children

🔗 Obedience and blessing stay connected

⏳ Consequences stretch across generations

➡️ A daily choice carried lasting weight

# Deuteronomy 12:26-28
# 🔥 Holy Things Still Belong At The Altar
---
## 🎁 Only Thy Holy Things Which Thou Hast, And Thy Vows, Thou Shalt Take, And Go Unto The Place Which The LORD Shall Choose

"Holy things" here means anything already set apart or dedicated to God.

This includes the vows and offerings already described earlier in the chapter.

Unlike ordinary meat, these items never had a home eating option.

Every dedicated gift still had to travel to the one chosen place.

🎁 Holy things means anything dedicated to God

🔁 This includes vows named earlier

🚫 These never had a home eating option

➡️ Dedicated gifts always traveled to the altar

---
## 🔥 And Thou Shalt Offer Thy Burnt Offerings, The Flesh And The Blood, Upon The Altar Of The LORD Thy God

This describes the actual mechanics of a burnt offering at the altar.

The flesh was consumed by fire, given completely to God.

The blood, unlike the everyday blood from verse sixteen, was applied directly to the altar itself.

Sacred blood and ordinary blood never received the same treatment.

🔥 The flesh was consumed by fire

🩸 Sacred blood went on the altar itself

⚖️ Ordinary blood only touched the ground

📖 Sacred and ordinary never mixed

---
## 👂 Observe And Hear All These Words Which I Command Thee

Moses pairs two verbs here on purpose.

"Observe" means to actually keep and practice the command.

"Hear" means to take it in and understand it first.

Understanding without obeying, or obeying without understanding, both fall short of what Moses is asking.

👂 Hear means understanding the command

✅ Observe means actually practicing it

🔗 Moses ties both together on purpose

📖 Understanding alone was never enough

---
## 👍 That It May Go Well With Thee, And With Thy Children After Thee For Ever, When Thou Doest That Which Is Good And Right In The Sight Of The LORD Thy God

This blessing formula repeats almost exactly from verse twenty five, just a few verses earlier.

Deuteronomy is not afraid to say the same true thing more than once.

"Good and right" measures obedience by God's own standard, not by personal opinion.

That standard is the exact opposite of everyone doing what was right in their own eyes back in verse eight.

👍 This formula repeats from verse twenty five

🔁 Deuteronomy repeats true things on purpose

📏 Good and right means God's standard

📖 This directly opposes verse eight's warning

# Deuteronomy 12:29-32
# ⚠️ Do Not Copy Their Worship
---
## ⚔️ When The LORD Thy God Shall Cut Off The Nations From Before Thee, Whither Thou Goest To Possess Them

This describes the coming conquest of Canaan in a single line.

The nations already living there would be removed, not converted or absorbed.

Israel would then move into homes, fields, and cities that once belonged to someone else.

That transition created a real spiritual danger the next verses name directly.

⚔️ Canaan's nations would be removed

🏠 Israel would take over their homes

🔀 Removal, not conversion, was the plan

➡️ This transition carried real danger

---
## 🪤 Take Heed To Thyself That Thou Be Not Snared By Following Them

A snare was a hunter's trap, often hidden until it was too late to escape.

Moses compares copying Canaanite worship to walking straight into a hidden trap.

The danger was not obvious or dramatic at first.

It looked like curiosity, not disaster, until it was already too late.

🪤 A snare was a hidden hunting trap

🚶 Copying their worship worked the same way

🙈 The danger did not look obvious at first

📖 It felt like curiosity until too late

---
## ❓ How Did These Nations Serve Their Gods? Even So Will I Do Likewise

Moses puts this exact tempting question directly into Israel's own mouth.

Curiosity about a defeated enemy's religion was the specific trap he warns against.

Watching a foreign practice and then quietly imitating it was how idolatry usually crept in.

Naming the exact thought made it much harder to fall into without noticing.

❓ Moses names the exact tempting thought

👀 Curiosity was the real danger here

🐌 Imitation usually crept in quietly

➡️ Naming it made it harder to miss

---
## 🔥 For Even Their Sons And Their Daughters They Have Burnt In The Fire To Their Gods

This describes actual child sacrifice practiced among some Canaanite peoples.

Later parts of the Old Testament name a god called Molech as one target of this same horror.

Naming this specific practice explains exactly why Moses forbids any imitation at all.

Curiosity about their worship was never harmless once this was the reality behind it.

🔥 This describes real child sacrifice

👹 Molech is later named as one such god

💔 This is the horror behind the warning

📖 Curiosity here was never harmless

---
## ⚖️ Thou Shalt Not Add Thereto, Nor Diminish From It

This command closes the chapter with a clear boundary around God's law itself.

Nothing could be added, even something that sounded reasonable or improved.

Nothing could be removed either, even a rule that felt inconvenient.

The same warning appears again near the very end of the whole Bible, in Revelation.

⚖️ Nothing may be added to the law

✂️ Nothing may be removed from it

🔒 The boundary itself was the point

📖 Revelation repeats this same warning later
`.trim();

export const DEUTERONOMY_TWELVE_PERSONAL_SECTIONS = parseDeuteronomyTwelveRawNotes(DEUTERONOMY_TWELVE_RAW_NOTES);
