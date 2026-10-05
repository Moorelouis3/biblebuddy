export type AmosFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseAmosFiveRawNotes(rawText: string): AmosFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: AmosFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Amos\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Amos 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Amos\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Amos\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Amos 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Amos 5:${startVerse}` : `Amos 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Amos 5 sections, received " + sections.length);
  }

  return sections;
}

const AMOS_FIVE_RAW_NOTES = `# Amos 5:1-3
# 🪦 A Lamentation For Israel
---
## 🪦 Even A Lamentation

A lamentation is a funeral song sung over someone who has died.

Amos sings this one for Israel right now.

Israel is still alive and walking around.

That timing itself is the warning.

He is not guessing about a possible future.

He is mourning a death that is already certain.

🪦 Lamentation means a funeral song
⏳ Israel is still alive right now
⚰️ Yet the death is already certain
📖 Grief arrives before the disaster does

## 😢 O House Of Israel

House of Israel is a title for the entire northern kingdom, not one person.

Amos has already named Israel's wealthy and powerful by name in earlier chapters.

Now he addresses the whole nation at once.

No one inside the kingdom gets to stand outside this warning.

🏠 House of Israel means the whole nation
👥 No single group is exempt here
📣 The warning addresses everyone at once
📖 National sin brings national consequence

## 💔 The Virgin Of Israel Is Fallen

Calling a nation a virgin pictures something pure, cared for, and untouched by disaster.

Israel is pictured here as that protected young woman.

She has now fallen, the picture of ruin instead of safety.

This image makes the coming judgment feel personal, not just political.

💔 Virgin pictures something pure and protected
🏙️ Israel wears that picture here
⚰️ She has fallen into ruin
📖 The judgment feels personal, not political

## 🚫 She Shall No More Rise

This is not a temporary setback that Israel can recover from later.

No more rise closes the door on any quick comeback.

Other nations in the Bible fall and later return to power.

Amos says Israel will not follow that pattern this time.

🚫 No more rise means no comeback
🔁 Other nations have recovered before
⚠️ Israel will not follow that pattern
📖 Some endings in scripture are final

## 🏞️ Forsaken Upon Her Land, There Is None To Raise Her Up

Forsaken means left completely alone, with no one stepping in to help.

Israel will fall in the very land God once gave as a gift.

No ally and no false god she worshipped will lift her back up.

That emptiness is the real weight of this verse.

🏞️ Forsaken means left completely alone
🎁 This happens in the land God gave
🙅 No ally or false god helps her
📖 The silence afterward is the real weight

## 🔢 The City That Went Out By A Thousand Shall Leave An Hundred

A thousand soldiers marching out pictures a full fighting force.

Only a hundred of them walk back home.

That means about nine out of every ten soldiers die in battle.

Losses this heavy are rare anywhere else in the Old Testament.

🔢 A thousand soldiers march out together
💀 Only a hundred walk back home
📉 About nine of ten soldiers are lost
📖 Losses this heavy are rare in scripture

## 📉 That Which Went Forth By An Hundred Shall Leave Ten

The same ratio repeats here on a smaller scale.

A hundred soldiers go out, and only ten return.

Repeating the pattern twice in one verse makes it impossible to miss.

Whatever size force Israel sends out, the outcome stays just as devastating.

📉 The same ratio repeats again
🔟 A hundred go out, ten return
🔁 Repetition drives home the pattern
📖 No army size escapes this outcome

# Amos 5:4-6
# 🔍 Seek The Lord, Not Bethel
---
## 🔍 Seek Ye Me, And Ye Shall Live

Seek means turning back toward God with real intention, not a passing thought.

This is not advice about finding a building or a ritual.

It is a direct call back to a relationship with God.

Live here means covenant life, continuing as God's people in the land.

The alternative Amos has already described is national death.

🔍 Seek means turning back to God
🤝 This is about relationship, not ritual
🏡 Live means staying as God's people
📖 The alternative is the death just described

## 🏛️ Seek Not Bethel, Nor Enter Into Gilgal, And Pass Not To Beersheba

These were three of Israel's best known worship sites.

Each one carried real history with the true God.

Bethel is where Jacob once saw a ladder reaching to heaven.

Gilgal is where Israel first camped after crossing into the promised land.

Beersheba is where Abraham himself once built an altar.

By the time of Amos, all three had drifted into empty worship.

🏛️ Bethel recalls Jacob's ladder dream
🏕️ Gilgal recalls Israel's first camp in Canaan
🕳️ Beersheba recalls Abraham's own altar
📖 All three sites had drifted into empty worship

## ⚠️ Gilgal Shall Surely Go Into Captivity

This line is a play on words in the original Hebrew.

Gilgal sounds almost exactly like the Hebrew word for go into exile.

Amos is not only naming judgment here.

He is naming it with a deliberate pun.

The very name of the city points toward its own future.

⚠️ Gilgal shall go into captivity
🔤 The name sounds like the word for exile
🎯 The city's name points to its own fate
📖 Even wordplay carries real warning

## 🔥 Bethel Shall Come To Nought

Bethel means house of God in Hebrew.

The name once pointed to real worship of the true God.

Come to nought means fall apart into nothing at all.

The house of God is about to become a house of nothing.

That turn from meaning to nothing is the whole irony of the name.

🏠 Bethel means house of God
💨 Come to nought means fall apart into nothing
🔁 The name itself gets turned inside out
📖 A sacred name becomes an empty one

## 🏘️ Lest He Break Out Like Fire In The House Of Joseph

House of Joseph refers to the northern kingdom of Israel as a whole.

Joseph's two sons, Ephraim and Manasseh, became two of Israel's largest tribes.

Fire in scripture often pictures sudden, consuming judgment.

God warns that his anger could break out just as fast and just as total.

🏘️ House of Joseph means the northern kingdom
👶 Ephraim and Manasseh were Joseph's sons
🔥 Fire pictures sudden, consuming judgment
📖 God's anger can break out just as fast

## 🧯 Devour It, And There Be None To Quench It In Bethel

Quench means to put a fire out.

This fire is pictured starting in Bethel itself, the same corrupted site from verse five.

No one is left who can stop it once it starts.

The place Israel trusted for safety becomes the place judgment begins.

🧯 Quench means to put out a fire
🏛️ The fire starts in Bethel itself
🚫 No one is left to stop it
📖 Their safe place becomes judgment's starting point

# Amos 5:7-9
# ✨ Seek Him That Maketh The Seven Stars
---
## 🌿 Turn Judgment To Wormwood

Wormwood is a plant known for its bitter taste.

Turning judgment to wormwood means corrupt courts made justice bitter.

Justice was supposed to protect the weak.

Instead it had become poison in the hands of Israel's leaders.

🌿 Wormwood means a bitter tasting plant
⚖️ Judgment should protect, not poison
💔 Leaders turned justice bitter instead
📖 Corrupt courts hurt the people they should help

## 🚫 Leave Off Righteousness In The Earth

Leave off means to stop doing something on purpose.

Righteousness was not slipping away by accident here.

Israel's leaders made an active choice to walk away from it.

Amos names it as a decision, not a drift.

🚫 Leave off means stopping on purpose
⚖️ Righteousness did not slip away by accident
🧍 Leaders chose to walk away from it
📖 Sin here was a decision, not a drift

## ✨ Seek Him That Maketh The Seven Stars And Orion

Seven stars is an old name for the Pleiades.

The Pleiades are a cluster of stars visible in the night sky.

Orion is a separate, well known constellation nearby.

Amos points to the God who personally made both of them.

✨ Seven stars means the Pleiades cluster
🌌 Orion is a separate, well known constellation
🛠️ God personally made both of them
📖 The judge is first named as Creator

## 🌗 Turneth The Shadow Of Death Into The Morning

This pictures God reversing total darkness into daylight.

Shadow of death is a phrase for the deepest, most hopeless kind of darkness.

The same God who controls judgment also controls when night ends.

Nothing about time or light operates outside his control.

🌗 Shadow of death means deep hopeless darkness
🌅 God turns that darkness into morning
⏳ He controls when night ends
📖 Light and time both answer to him

## 🌊 Calleth For The Waters Of The Sea, And Poureth Them Out Upon The Face Of The Earth

This describes God commanding the rain cycle itself.

Water is pulled up from the sea and poured back down across the land.

The same God who once controlled the flood still controls every drop.

Weather was never random or out of his reach.

🌊 God commands the whole rain cycle
☔ Water is pulled up and poured back down
🌍 The same God once controlled the flood
📖 Weather answers directly to him

## 📛 The Lord Is His Name

This short line closes out the whole description of God as Creator.

Naming him directly after listing his power is a deliberate move.

Amos repeats this same closing line in other places in this book.

The repetition works like a refrain that Israel could not miss.

📛 The Lord's name closes this hymn
🔁 Amos repeats this refrain elsewhere in the book
🎯 Repetition makes the point impossible to miss
📖 The Creator and the judge share one name

## 💪 That Strengtheneth The Spoiled Against The Strong

The spoiled means people who have already been robbed or defeated.

This verse pictures God giving strength back to people who have lost everything.

Even a fortress, built for safety, cannot stand against that kind of power.

God can reverse who holds the advantage at any moment.

💪 Spoiled means people already robbed or defeated
🏰 Even a fortress cannot resist God's power
🔄 God can reverse who holds power
📖 No advantage is permanent before him

# Amos 5:10-13
# ⚖️ They Hate Him That Rebuketh In The Gate
---
## 🚪 They Hate Him That Rebuketh In The Gate

The city gate was where elders and judges settled disputes in the ancient world.

Rebuketh means to correct someone openly, especially about wrongdoing.

Israel's leaders hated anyone who challenged their corrupt decisions there.

Truth telling had become dangerous instead of respected.

🚪 The gate was the ancient courtroom
🗣️ Rebuketh means correcting someone openly
😡 Leaders hated being challenged there
📖 Truth telling had become dangerous

## 😤 They Abhor Him That Speaketh Uprightly

Abhor is a stronger word than hate, closer to disgust.

Amos pairs two verbs here to show how deep this hostility ran.

Speaking uprightly simply means telling the truth plainly.

Even plain honesty was treated as an insult.

😤 Abhor means hatred mixed with disgust
🔁 Two verbs double the intensity here
🗣️ Uprightly means speaking the plain truth
📖 Honesty itself had become offensive

## 👣 Your Treading Is Upon The Poor

Treading pictures something being crushed underfoot.

Amos is not describing an accident here.

He is describing a repeated pattern of walking over people on purpose.

The poor were not falling behind, they were being pushed down.

👣 Treading pictures crushing something underfoot
🔁 This was repeated, not accidental
⬇️ The poor were pushed down, not just behind
📖 Oppression here was a steady pattern

## 🌾 Ye Take From Him Burdens Of Wheat

This describes grain being taken from the poor through unfair taxes or debts.

Burdens pictures a heavy load forced onto someone who already has little.

Wheat was a basic food supply, not a luxury.

Taking it meant taking food directly out of hungry mouths.

🌾 Burdens of wheat means forced grain taxes
⚖️ This targeted people who had little already
🍞 Wheat was basic food, not luxury
📖 Injustice here reached into daily hunger

## 🏛️ Ye Have Built Houses Of Hewn Stone, But Ye Shall Not Dwell In Them

Hewn stone means stone carefully cut and shaped, a sign of real wealth.

Most ordinary homes at this time were built from simple mud brick.

Amos describes a curse that was already written into Israel's covenant with God.

Building a fine house and never living in it was judgment, not bad luck.

🏛️ Hewn stone means carefully cut, costly stone
🧱 Ordinary homes used simple mud brick instead
📜 This curse was already written into the covenant
📖 Losing a built home was judgment, not luck

## 🍇 Ye Have Planted Pleasant Vineyards, But Ye Shall Not Drink Wine Of Them

This repeats the same covenant curse from the verse just before it.

Planting a vineyard took years before it ever produced fruit worth drinking.

Losing it right before enjoying it made the loss feel even heavier.

Blessing promised by the covenant was now working in reverse.

🍇 This repeats the same covenant curse
⏳ Vineyards took years to produce wine
💔 Losing it right before enjoying it hurt more
📖 Covenant blessing had flipped into curse

## 📜 I Know Your Manifold Transgressions And Your Mighty Sins

Manifold means many and varied, not just one kind of wrongdoing.

Mighty sins means these were not small, private failures.

God names both the number and the weight of Israel's sin at once.

Nothing on this list had gone unnoticed.

📜 Manifold means many different kinds of sin
💪 Mighty sins means these were not small failures
🔢 God names both number and weight together
📖 Nothing here went unnoticed by him

## ⚖️ They Afflict The Just, They Take A Bribe, And They Turn Aside The Poor In The Gate From Their Right

This verse lists three separate court crimes happening in the same place.

Afflicting the just means punishing people who did nothing wrong.

Taking a bribe means a judge's decision could simply be bought.

Turning aside the poor in the gate means denying them a fair hearing on purpose.

⚖️ Three separate crimes happen in one court
❌ The innocent were punished anyway
💰 A judge's ruling could be bought
📖 The poor were denied a fair hearing

## 🤐 The Prudent Shall Keep Silence In That Time, For It Is An Evil Time

Prudent here means wise enough to see how dangerous speaking up had become.

This is not peaceful, godly silence.

It is silence out of real fear, the same fear verse ten already described.

Wisdom and safety had been reduced to simply staying quiet.

🤐 Prudent means wise enough to see the danger
😨 This silence comes from fear, not peace
🔁 It matches the fear from verse ten
📖 Wisdom had been reduced to silence

# Amos 5:14-15
# 🌱 Seek Good, And Not Evil
---
## 🌱 Seek Good, And Not Evil, That Ye May Live

This command directly answers the corruption just described at the city gate.

Seek good means actively choosing right action, not just avoiding the worst sins.

Live here still means the same thing it meant back in verse four.

The path to survival has not changed.

🌱 Seek good means actively choosing right action
🚪 This answers the corruption at the gate
🏡 Live still means staying as God's people
📖 The path to survival has not changed

## 🤝 The Lord, The God Of Hosts, Shall Be With You, As Ye Have Spoken

Israel already claimed that God was on their side.

As ye have spoken points directly back to that claim.

Amos is not denying God's presence outright here.

He is making it conditional on the choice they are about to make.

🗣️ Israel already claimed God's presence
🔁 As ye have spoken recalls that claim
⚠️ Amos makes the promise conditional
📖 God's presence was never automatic

## ⚖️ Hate The Evil, And Love The Good, And Establish Judgment In The Gate

This verse directly reverses the corruption named earlier in the chapter.

Establish judgment in the gate means restoring fair courts in the same place they had failed.

The gate was the problem in verses ten through twelve.

Now it becomes the place where repentance has to start.

⚖️ This reverses the earlier corruption directly
🚪 The gate was where the injustice happened
🔧 Fixing the gate means fixing real courts
📖 Repentance had to start where sin started

## 🌾 It May Be That The Lord God Of Hosts Will Be Gracious Unto The Remnant Of Joseph

It may be is an honest admission that repentance does not guarantee rescue.

A remnant is the surviving portion left after judgment has already fallen.

Joseph here again points to the whole northern kingdom.

Grace was still possible, but it was never something Israel could demand.

❓ It may be admits there is no guarantee
🌾 Remnant means a surviving portion after judgment
👶 Joseph again names the northern kingdom
📖 Grace was possible, never something to demand

# Amos 5:16-17
# 😭 Wailing Shall Be In All The Streets
---
## 😭 Wailing Shall Be In All Streets, And They Shall Say In All The Highways, Alas Alas

Wailing is loud, public grief, not quiet sadness kept behind closed doors.

Alas, alas, repeated twice, was a common funeral cry in this culture.

Amos pictures this grief filling every street and every road at once.

Private sorrow is about to become a shared, citywide catastrophe.

😭 Wailing means loud, public grief
🗣️ Alas alas was a common funeral cry
🛣️ This grief fills every street at once
📖 Private sorrow becomes a shared catastrophe

## 🌾 They Shall Call The Husbandman To Mourning

A husbandman is an old word for a farmer.

Professional mourners usually led public grief in this culture, not farmers.

Amos says even working farmers get pulled into this mourning.

The disaster is too large for only the usual mourners to carry.

🌾 Husbandman is an old word for farmer
🎭 Professional mourners usually led this role
🧑‍🌾 Even farmers join the grief here
📖 The disaster outgrows the usual mourners

## 🎶 Such As Are Skilful Of Lamentation To Wailing

Hired mourners who knew the proper songs and cries were a normal part of ancient funerals.

Calling them in means this grief is being treated with full, formal seriousness.

Amos is not describing a few people crying quietly.

He is describing an entire nation's funeral.

🎶 Skilful mourners were trained for funerals
📿 Calling them shows full formal mourning
🌍 This is not a few quiet tears
📖 Amos pictures an entire nation's funeral

## 🍇 In All Vineyards Shall Be Wailing

Vineyards were one of the clearest signs of blessing earlier in this very chapter.

Now those same vineyards become scenes of mourning instead of harvest joy.

The place that once proved God's favor now proves his judgment.

Blessing and curse are tied to the exact same ground.

🍇 Vineyards once pictured blessing in this chapter
😭 Now they picture mourning instead
🔄 Blessing and judgment share the same ground
📖 Even harvest joy turns to grief

## 🚶 For I Will Pass Through Thee, Saith The Lord

Pass through is the same phrase used when God passed through Egypt during the first Passover.

Back then, passing through meant rescue for God's own people.

Here the same phrase describes judgment landing on Israel instead.

The rescue language has turned into warning language.

🚶 Pass through recalls the Passover in Egypt
🙌 Back then it meant rescue for Israel
⚠️ Here it means judgment instead
📖 The same words now carry the opposite weight

# Amos 5:18-20
# 🌑 Woe Unto You That Desire The Day Of The Lord
---
## 🌑 Woe Unto You That Desire The Day Of The Lord

Many in Israel expected the day of the LORD to be a day God defeated their enemies for them.

They looked forward to it the way a crowd looks forward to a celebration.

Amos opens with woe, a funeral word, to shatter that expectation immediately.

Desiring this day was about to become a serious mistake.

🌑 Day of the LORD meant victory to Israel
🎉 They expected celebration, not judgment
⚰️ Woe is a funeral word, not a cheer
📖 Their expectation was about to break

## ⚫ The Day Of The Lord Is Darkness, And Not Light

This line flips Israel's whole expectation upside down.

They pictured this day as light shining on their enemies' defeat.

Instead the darkness lands on Israel itself.

The day they hoped for becomes the day they feared.

⚫ Darkness replaces the light they expected
🔄 The day's target flips to Israel
😨 Hope turns into fear here
📖 Expectation and reality go opposite directions

## 🦁 As If A Man Did Flee From A Lion, And A Bear Met Him

This pictures someone running from one real danger straight into another.

Escaping the lion looks like safety for only a moment.

The bear waiting beyond it proves that feeling wrong immediately.

Judgment in this chapter works the exact same way.

🦁 Running from a lion looks like safety
🐻 A bear waits just beyond it
⏳ Relief lasts only a moment
📖 Judgment keeps finding a way through

## 🐍 Leaned His Hand On The Wall, And A Serpent Bit Him

This pictures a person finally reaching home, the safest place they know.

Leaning a hand on the wall should be an ordinary, safe motion.

A hidden serpent turns that safe motion deadly instead.

Even home offers no guaranteed escape in this picture.

🏠 Home is pictured as the safe ending point
✋ Leaning on a wall should be ordinary
🐍 A hidden serpent turns it deadly
📖 Even home offers no guaranteed escape

## 🌑 Even Very Dark, And No Brightness In It

Amos restates the darkness one more time before moving on.

Very dark pushes the picture further than ordinary darkness.

No brightness in it closes off even the smallest trace of light.

Saying it twice in two different ways leaves no room for hope of escape.

🌑 Very dark goes beyond ordinary darkness
🚫 No brightness removes even a trace of light
🔁 Restating it removes any hope of escape
📖 Total darkness is the final word here

# Amos 5:21-24
# 🚫 I Hate, I Despise Your Feast Days
---
## 🚫 I Hate, I Despise Your Feast Days

Feast days were Israel's official, calendar appointed festivals, not casual gatherings.

God uses two strong verbs together, hate and despise, instead of just one.

Doubling the language shows this is not a mild complaint.

The very worship Israel was proud of is being rejected outright.

📅 Feast days were official, calendar appointed festivals
🔁 Hate and despise double the force here
💢 This is not a mild complaint
📖 Proud worship gets rejected outright

## 👃 I Will Not Smell In Your Solemn Assemblies

Older parts of scripture describe sacrifice as a sweet smell that pleases God.

God refusing to smell here means refusing to accept the sacrifice at all.

Solemn assemblies were special sacred gatherings tied to the festival calendar.

Correct ritual was no longer enough to earn his acceptance.

👃 Smell recalls the sweet smell of sacrifice
🙅 Here it means outright rejection
📿 Solemn assemblies were special sacred gatherings
📖 Correct ritual was no longer enough

## 🔥 Burnt Offerings And Your Meat Offerings, I Will Not Accept Them

A burnt offering was completely burned up on the altar as a sign of total devotion.

A meat offering was actually a grain offering, usually flour or bread.

Together these covered two of Israel's most common forms of worship.

God rejects both at once, not just one.

🔥 Burnt offering means full devotion by fire
🌾 Meat offering actually means a grain offering
📦 Together they cover two common offerings
📖 Both are rejected, not just one

## 🐑 Neither Will I Regard The Peace Offerings Of Your Fat Beasts

A peace offering was shared as a meal, meant to picture friendship with God.

Fat beasts means the best, most costly animals available.

Even their most expensive, most generous gift is turned away here.

Generosity without obedience could not buy back God's favor.

🐑 Peace offering pictured friendship with God
💰 Fat beasts means the costliest animals
🙅 Even the best gift is turned away
📖 Generosity could not buy back favor

## 🎶 Take Thou Away The Noise Of Thy Songs, The Melody Of Thy Viols

A viol was a stringed instrument much like a small harp.

Calling their music noise is a deliberate insult.

Beautiful melody meant nothing without honest hearts behind it.

God silences the one part of worship people usually find most moving.

🎻 Viol means an old stringed instrument
📢 Calling it noise is a deliberate insult
💔 Beauty meant nothing without honest hearts
📖 Even moving music gets silenced here

## 🌊 Let Judgment Run Down As Waters, And Righteousness As A Mighty Stream

This pictures justice flowing constantly, the way a real river never stops moving.

Many streams in this region dried up completely for part of the year.

Amos pictures something that never runs dry instead.

Righteousness was never meant to be seasonal or occasional.

🌊 Judgment pictured as a constantly flowing river
🏜️ Many streams in this region dried up yearly
💧 This stream never runs dry
📖 Righteousness was never meant to be occasional

# Amos 5:25-27
# 🐫 Have Ye Offered Unto Me Sacrifices In The Wilderness
---
## 🐫 Have Ye Offered Unto Me Sacrifices And Offerings In The Wilderness Forty Years

This question points back to Israel's forty years wandering after leaving Egypt.

Amos asks it as a rhetorical question, expecting the obvious answer.

The relationship with God during those years was never only about ritual sacrifice.

Obedience and trust mattered more than ceremony even back then.

🐫 This recalls the forty years in the wilderness
❓ It is a rhetorical question
🤝 The relationship was never only ritual
📖 Obedience mattered more than ceremony

## 🌟 Ye Have Borne The Tabernacle Of Your Moloch And Chiun Your Images, The Star Of Your God

Moloch and Chiun were names tied to foreign star worship, carried like portable idols.

Many scholars believe these names point to astral gods borrowed from Assyria.

The star of your god confirms Israel was worshipping something in the night sky.

This directly contradicts the true Creator of the stars named earlier in this chapter.

🌟 Moloch and Chiun were foreign star gods
🌍 Many scholars trace them back to Assyria
🔭 Israel was worshipping something in the sky
📖 This contradicts the true Creator from verse eight

## 🛠️ Which Ye Made To Yourselves

This phrase draws a sharp line under everything just described.

Israel's star gods were built by human hands.

The true God, by contrast, is the one who made the actual stars.

A homemade god can never outrank its own maker.

🛠️ These gods were built by human hands
✨ The true God made the real stars
⚖️ A maker always outranks what it makes
📖 Homemade gods have no real power

## 🗺️ Therefore Will I Cause You To Go Into Captivity Beyond Damascus

Damascus was the capital city of Aram, a kingdom north of Israel.

Beyond Damascus points even further away, toward Assyria.

This judgment was later carried out exactly this way when Assyria conquered the northern kingdom.

The warning in this chapter became a documented historical event.

🗺️ Damascus was Aram's capital city
🧭 Beyond Damascus points toward Assyria
📜 Assyria later conquered Israel exactly this way
📖 This warning became real history

## 👑 Saith The Lord, Whose Name Is The God Of Hosts

The God of hosts is a title for the commander over heaven's armies.

Amos closes this chapter the same way he closed chapter four.

Repeating that title ties both warnings to the same unmatched authority.

The final word in this chapter belongs to God's own name.

👑 God of hosts means commander of heaven's armies
🔁 This title also closed chapter four
🔗 Repetition ties both warnings together
📖 God's own name has the final word
`.trim();

export const AMOS_FIVE_PERSONAL_SECTIONS = parseAmosFiveRawNotes(AMOS_FIVE_RAW_NOTES);
