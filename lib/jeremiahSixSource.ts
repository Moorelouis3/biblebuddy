export type JeremiahSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahSixRawNotes(rawText: string): JeremiahSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 6:${startVerse}` : `Jeremiah 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Jeremiah 6 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_SIX_RAW_NOTES = `# Jeremiah 6:1-5
# 🚨 Flee Jerusalem, Danger From The North
---
## 🗺️ O Ye Children Of Benjamin, Gather Yourselves To Flee

Benjamin was the small tribal territory just north of Jerusalem.

An army marching south from Babylon would cross Benjamin first.

Warning Benjamin first gives Jerusalem its earliest possible alarm.

The order to flee shows this is not a drill.

🗺️ Benjamin sat just north of Jerusalem
⚠️ Invaders from the north would reach it first
🏃 Fleeing means the danger is already close
📖 This warning gives Jerusalem its earliest alarm

## 📯 Blow The Trumpet In Tekoa

Tekoa was a hill town about ten miles south of Jerusalem.

A trumpet blast in ancient warfare was a citywide alarm signal.

Sounding it from a hilltop let the warning carry for miles.

This is a literal alarm system, not just a poetic image.

📯 Tekoa sat about ten miles from Jerusalem
🔊 A trumpet blast served as an alarm signal
⛰️ Hilltop sounding let the warning travel far
📖 This alarm system was real, not just poetry

## 🔥 Set Up A Sign Of Fire In Bethhaccerem

Bethhaccerem means house of the vineyard in Hebrew.

It sat on high ground between Tekoa and Jerusalem.

A fire signal there relayed the alarm onward toward the city.

Together the trumpet and the fire beacon formed one warning chain.

🔥 Bethhaccerem means house of the vineyard
⛰️ It stood on high ground near Tekoa
📡 A fire signal relayed the alarm onward
📖 Trumpet and fire beacon worked as one chain

## 🧭 For Evil Appeareth Out Of The North, And Great Destruction

Babylon lay east of Judah, not directly north.

A vast desert stood between Judah and Babylon to the east.

Armies had to travel north first, then swing south along a usable route.

That is why every invasion in Jeremiah is pictured coming from the north.

🧭 Babylon actually sat east of Judah
🏜️ A desert blocked the direct eastern route
🗺️ Armies had to swing down from the north
📖 This is why invasions are always northern here

## 👩 I Have Likened The Daughter Of Zion To A Comely And Delicate Woman

Daughter of Zion is a common way to picture Jerusalem as a person.

Comely means attractive, and delicate means refined and unused to hardship.

God is describing a city used to comfort, not to war.

That comfort is about to be tested by an invading army.

👩 Daughter of Zion pictures Jerusalem as a person
✨ Comely means attractive in this description
🛋️ Delicate means refined and unused to hardship
📖 That comfort is about to be tested

## 🐑 The Shepherds With Their Flocks Shall Come Unto Her

Shepherds and flocks are a picture here, not a literal scene.

The shepherds stand for enemy kings, and the flocks stand for their soldiers.

This turns the language of quiet grazing into the language of invasion.

The very picture of peace becomes a picture of siege.

🐑 Shepherds and flocks are pictures, not literal
👑 Shepherds stand for enemy kings
⚔️ Flocks stand for their soldiers
📖 Peaceful language becomes invasion language

## ⛺ They Shall Pitch Their Tents Against Her Round About

Pitching tents on every side describes a complete siege.

They shall feed every one in his place means each unit holds an assigned spot.

No gap is left open for escape or resupply.

The city is meant to be surrounded, not just attacked.

⛺ Tents on every side means a full siege
🎯 Each unit holds its assigned spot
🚫 No gap is left for escape
📖 The goal is surrounding, not just attacking

## 🗣️ Prepare Ye War Against Her: Arise, And Let Us Go Up At Noon

These are the enemy's own words, quoted directly.

Attacking at noon shows confidence, since noon offered no cover of darkness.

Woe unto us, for the day goeth away shows that confidence starting to crack.

The invaders grow anxious as daylight runs out before they finish.

🗣️ These are the enemy's own words
☀️ Noon attacks show open confidence
😟 Woe unto us shows that confidence cracking
📖 Daylight running out makes them anxious

## 🌙 Arise, And Let Us Go By Night, And Let Us Destroy Her Palaces

Losing daylight does not stop the attack, it only changes the plan.

Night assaults were riskier and less common in ancient warfare.

Willingness to attack at night shows real determination to finish the job.

Her palaces specifically targets the city's centers of wealth and power.

🌙 Losing daylight only changes the plan
⚔️ Night assaults were riskier and less common
💪 This shows real determination to finish
📖 Palaces were the city's centers of power

# Jeremiah 6:6-9
# 🍇 Glean The Remnant Like A Vine
---
## 🌳 Hew Ye Down Trees, And Cast A Mount Against Jerusalem

Cutting down trees supplied timber for siege equipment and ramps.

A mount was a manmade ramp built up against a city wall.

Armies built these ramps to reach over or break through defenses.

This command describes real, physical siege preparation, not just a threat.

🌳 Trees supplied timber for siege equipment
🏔️ A mount was a ramp against the wall
🧱 Ramps let armies reach or break through
📖 This describes real siege preparation

## ⚖️ This Is The City To Be Visited

Visited in Jeremiah is a legal word, not a friendly one.

It means God stepping in personally to bring judgment.

Being visited here is the opposite of being overlooked.

Jerusalem's turn to answer for its actions has arrived.

⚖️ Visited is a legal word here
👁️ It means God stepping in personally
🚫 It is the opposite of being overlooked
📖 Jerusalem's turn to answer has arrived

## 💔 She Is Wholly Oppression In The Midst Of Her

Oppression means using power to hurt or cheat the weak.

Wholly means this was not one bad habit among many good ones.

The city's whole inner life was defined by this one problem.

That is why judgment falls on the whole city, not one group.

💔 Oppression means hurting or cheating the weak
🎯 Wholly means it defined the whole city
🏙️ This was not one habit among many
📖 That is why judgment falls on everyone

## ⛲ As A Fountain Casteth Out Her Waters, So She Casteth Out Her Wickedness

A fountain does not produce water occasionally, it flows constantly.

Comparing Jerusalem to a fountain means its wickedness was just as constant.

Violence and spoil is heard in her describes crime loud enough to be common knowledge.

This was the city's normal condition, not an occasional failure.

⛲ A fountain flows constantly, not occasionally
🔁 Jerusalem's wickedness was just as constant
📢 Violence and spoil were common knowledge
📖 This was normal, not occasional

## 👁️ Before Me Continually Is Grief And Wounds

This line is spoken from God's own point of view.

Continually means God experienced this as an ongoing, unending ache.

Wounds pictures real, repeated injury, not a passing annoyance.

God is not a distant judge here, He is genuinely grieved.

👁️ This is spoken from God's own view
⏳ Continually means an ongoing, unending ache
🩹 Wounds pictures real, repeated injury
📖 God is grieved, not just distant

## 📚 Be Thou Instructed, O Jerusalem, Lest My Soul Depart From Thee

Instructed here means corrected, like a student accepting a hard lesson.

This is offered as one final chance before the coming judgment.

Lest my soul depart from thee pictures God's presence withdrawing entirely.

Lest I make thee desolate spells out exactly what that withdrawal would look like.

📚 Instructed means accepting correction
⏰ This was one final chance
🚶 God's presence withdrawing is pictured here
📖 Desolate spells out what withdrawal means

## 🍇 They Shall Throughly Glean The Remnant Of Israel As A Vine

Gleaning means picking a field clean after the main harvest.

Throughly means this pass would miss nothing at all.

Comparing Israel to a vine being gleaned pictures total, careful removal.

Turn back thine hand as a grapegatherer adds a second, repeated pass for anything missed.

🍇 Gleaning means picking a field clean
🔍 Throughly means nothing would be missed
🌿 Israel is pictured as a vine
📖 Even a second pass would catch the rest

# Jeremiah 6:10-13
# 👂 An Ear That Will Not Hear
---
## ❓ To Whom Shall I Speak, And Give Warning, That They May Hear?

This question is not really a search for an answer.

It expresses real despair over finding anyone left willing to listen.

Jeremiah has already tried the ordinary people and the leaders.

The question hangs in the air because no one qualifies.

❓ This is not a real search for answers
😞 It expresses real despair
🔍 Jeremiah already tried both the people and leaders
📖 No one is left who will listen

## 👂 Behold, Their Ear Is Uncircumcised

Circumcision marked belonging to God's covenant people.

An uncircumcised ear pictures an ear that has never truly joined the covenant.

This is not a description of hearing loss.

It describes ears that hear the words but refuse what they mean.

👂 Circumcision marked God's covenant people
✂️ An uncircumcised ear never truly joined it
🚫 This is not physical hearing loss
📖 They hear words but refuse the meaning

## 🙄 The Word Of The LORD Is Unto Them A Reproach

Reproach means something treated with scorn or mockery.

God's own message had become an insult to them, not a comfort.

They have no delight in it makes the rejection even plainer.

This is active distaste, not simple unfamiliarity.

🙄 Reproach means treated with scorn
💬 God's message became an insult to them
🚫 No delight means active rejection
📖 This is distaste, not unfamiliarity

## 😩 I Am Full Of The Fury Of The LORD: I Am Weary With Holding In

Jeremiah is describing his own exhausting task as a prophet.

He carries God's anger like a weight he must hold back.

Weary with holding in pictures the strain of restraining something that wants out.

Speaking judgment out loud is itself a heavy burden for him.

😩 Jeremiah describes his own exhausting task
⚖️ He carries God's anger like a weight
💪 Holding in pictures real strain
📖 Speaking judgment was a burden for him

## 🌊 I Will Pour It Out Upon The Children Abroad, And Upon The Assembly Of Young Men Together

Pour it out pictures judgment released like water, reaching everywhere at once.

Naming children and young men together shows no age group is spared.

The husband with the wife, the aged with him that is full of days extends the same list further.

Naming both extremes of a group was a common way to mean everyone in between.

🌊 Pour it out means judgment reaching everywhere
👶 Children and young men are both named
👴 Husband, wife, and the aged are added
📖 Naming both extremes means everyone is included

## 🏠 Their Houses Shall Be Turned Unto Others, With Their Fields And Wives Together

Losing a house, fields, and family in conquest was the ordinary outcome of ancient defeat.

This lists exactly what an invading army would seize.

For I will stretch out my hand upon the inhabitants of the land names God as the one behind it.

The invading army is only the visible hand carrying out the sentence.

🏠 Houses, fields, and families were seized in defeat
📜 This lists what the invaders would take
✋ God names Himself as the one behind it
📖 The army is only the visible hand

## 📏 From The Least Of Them Even Unto The Greatest Of Them Every One Is Given To Covetousness

Least to greatest is another way of saying everyone without exception.

Covetousness means an ongoing desire to grab more than what is owed.

From the prophet even unto the priest every one dealeth falsely repeats the same pattern for religious leaders.

Corruption here was not confined to any one class or role.

📏 Least to greatest means everyone included
💰 Covetousness means grabbing more than is owed
📿 Prophets and priests are named too
📖 Corruption reached every class and role

# Jeremiah 6:14-15
# 🩹 Peace, Peace, When There Is No Peace
---
## 🩹 They Have Healed Also The Hurt Of The Daughter Of My People Slightly

Healed slightly pictures a wound bandaged on the surface only.

The real damage underneath was never actually treated.

Leaders offered comfort without dealing with the actual sin causing the crisis.

A shallow fix was presented as though it were a real cure.

🩹 Healed slightly means bandaged on the surface
🕳️ The real damage was never treated
🗣️ Leaders offered comfort, not correction
📖 A shallow fix was called a cure

## 🔁 Saying, Peace, Peace: When There Is No Peace

Repeating peace twice makes the reassurance sound extra confident.

That confidence was false, since real danger was already approaching.

This phrase names the exact lie the false prophets kept repeating.

Comfortable words were preferred over the harder, truer warning.

🔁 Repeating peace made it sound confident
🚨 Real danger was already approaching
🎭 This names the false prophets' exact lie
📖 Comfort was chosen over the truer warning

## 😡 Were They Ashamed When They Had Committed Abomination?

Abomination describes something God finds deeply offensive.

This question expects the obvious answer, no, they were not.

Shame is usually the normal human response to serious wrongdoing.

Its total absence here signals something has gone badly wrong.

😡 Abomination means deeply offensive to God
❓ The question expects the answer no
😳 Shame is the normal response to wrong
📖 Its absence signals something badly wrong

## 😊 Nay, They Were Not At All Ashamed, Neither Could They Blush

Blushing is an involuntary physical sign of shame.

Saying they could not blush means the capacity itself was gone.

This is stronger than simply choosing not to feel bad.

Their conscience had stopped registering wrong as wrong at all.

😊 Blushing is an involuntary sign of shame
🚫 Could not blush means the capacity was gone
💔 This is deeper than a simple choice
📖 Their conscience stopped registering wrong

## 📉 Therefore They Shall Fall Among Them That Fall

This ties Judah's coming judgment to others who already fell before them.

At the time that I visit them they shall be cast down restates the timing plainly.

Visit again carries its legal meaning of stepping in to judge.

Their fate joins a pattern already seen elsewhere, not something new or unfair.

📉 Judah joins others who already fell
⏰ Visit sets a specific timing
⚖️ Visit means stepping in to judge
📖 Their fate fits an already known pattern

# Jeremiah 6:16-19
# 🛑 Ask For The Old Paths
---
## 🛤️ Stand Ye In The Ways, And See, And Ask For The Old Paths

Old paths means the tested way of life God had already given Israel.

It is not a call to look backward for its own sake.

It is a call to return to what had already proven faithful.

Standing and looking pictures a real pause before choosing which way to go.

🛤️ Old paths means God's already tested way
⏪ It is not just looking backward
✅ It is returning to what had proven faithful
📖 The pause pictures a real choice to make

## ✅ Where Is The Good Way, And Walk Therein, And Ye Shall Find Rest For Your Souls

The good way and the old paths describe the same faithful path.

Rest for your souls promises real relief, not just physical comfort.

Jesus later echoes this exact phrase in Matthew, offering the same rest.

The offer here is genuine, not a trick or a trap.

✅ The good way repeats the old paths
😌 Rest for your souls means real relief
🤝 The offer here is genuine
📖 Jesus later echoes this exact phrase

## 🙅 But They Said, We Will Not Walk Therein

This is a flat, direct refusal, not confusion or delay.

The good way was clearly shown to them and named plainly.

They understood the offer and chose against it anyway.

I set watchmen over you describes God trying yet another warning method next.

🙅 This is a flat, direct refusal
👀 The offer was clearly understood
🚫 They chose against it anyway
📖 God tries another warning method next

## 🗼 I Set Watchmen Over You, Saying, Hearken To The Sound Of The Trumpet

Watchmen stood on city walls to spot danger before anyone else.

Here the watchmen stand for prophets sent to warn the people early.

The trumpet again recalls the literal alarm system from verse 1.

Warning after warning was sent through every method available.

🗼 Watchmen spotted danger before anyone else
📢 Here watchmen stand for the prophets
📯 The trumpet recalls verse 1's alarm
📖 Every warning method available was used

## 🔁 But They Said, We Will Not Hearken

This is the second flat refusal in only a few verses.

Hearken means to listen with the intent to obey, not just to hear sound.

Repeating the refusal pattern shows this was not a single lapse.

Hear, ye nations turns next to witnesses outside Judah entirely.

🔁 This is the second flat refusal
👂 Hearken means listening in order to obey
📈 The pattern was repeated, not a single lapse
📖 Outside nations are called as witnesses next

## 🌍 Hear, Ye Nations, And Know, O Congregation, What Is Among Them

God calls in outside witnesses since Judah itself will not listen.

This mirrors a courtroom, where a case is made publicly.

Judah's own failure becomes something other nations are asked to observe.

The shame of the case is now made completely public.

🌍 Outside nations are called as witnesses
⚖️ This mirrors a public courtroom
👁️ Other nations are asked to observe
📖 The shame is now made public

## 🌱 I Will Bring Evil Upon This People, Even The Fruit Of Their Thoughts

Fruit of their thoughts means the natural result of their own plans and choices.

This judgment is not random, it grows directly out of what they chose.

Because they have not hearkened unto my words, nor to my law, but rejected it names the exact cause.

The people planted this outcome themselves, one choice at a time.

🌱 Fruit of their thoughts means their own result
🎯 Judgment is not random here
📜 Rejecting God's words and law is named
📖 They planted this outcome themselves

# Jeremiah 6:20-23
# ⚔️ A Great Nation From The Sides Of The Earth
---
## 🗺️ To What Purpose Cometh There To Me Incense From Sheba

Sheba was a distant, wealthy region, likely in modern day Arabia.

Incense from there was expensive and imported at real cost.

God asks what purpose it serves when the heart behind it is wrong.

Expensive worship items cannot substitute for real obedience.

🗺️ Sheba was a distant, wealthy region
💰 Its incense cost real money to import
❓ God asks what purpose it serves
📖 Expensive items cannot replace real obedience

## 🌿 And The Sweet Cane From A Far Country

Sweet cane was another costly aromatic ingredient used in temple worship.

Naming it alongside Sheba's incense stresses just how much was spent on ritual.

The people were generous with expensive religious items.

That generosity never reached their actual daily obedience.

🌿 Sweet cane was another costly worship ingredient
💵 It stresses how much was spent on ritual
🛕 The people were generous with religious items
📖 That generosity never reached real obedience

## 📋 Your Burnt Offerings Are Not Acceptable, Nor Your Sacrifices Sweet Unto Me

These offerings followed the correct ritual instructions on the surface.

God still calls them unacceptable and describes them as no longer pleasing.

The problem was never the ritual steps themselves.

Obedience and honesty were missing underneath a technically correct performance.

📋 The offerings followed correct instructions
🚫 God still calls them unacceptable
🎭 The problem was not the ritual steps
📖 Obedience was missing underneath the performance

## 🪨 Behold, I Will Lay Stumblingblocks Before This People

A stumblingblock is an obstacle placed deliberately in someone's path.

This pictures God allowing consequences that the people cannot avoid.

The fathers and the sons together shall fall upon them shows entire family lines affected at once.

The neighbour and his friend shall perish extends the same collapse to the wider community.

🪨 A stumblingblock is a deliberate obstacle
👨‍👦 Fathers and sons fall together
🤝 Neighbors and friends are included too
📖 The collapse reaches the whole community

## 🧭 Thus Saith The LORD, Behold, A People Cometh From The North Country

This repeats the north country warning first raised back in verse 1.

By now that early warning has become a named, certain event.

Naming the LORD as the source rules out random chance.

This army answers to God's own timing, not just its own plans.

🧭 This repeats the north country warning
🎯 The vague warning is now certain
👑 The LORD names Himself as the source
📖 This army answers to God's timing

## 🌍 A Great Nation Shall Be Raised From The Sides Of The Earth

Sides of the earth describes a vast, far reaching span of territory.

This is poetic exaggeration meant to stress the scale of the threat.

The enemy is pictured as larger and further reaching than one single army.

The threat that opened the chapter has grown into its fullest description yet.

🌍 Sides of the earth means a vast span
📏 This stresses the huge scale of the threat
⚔️ The enemy is pictured larger than one army
📖 The chapter's threat reaches its fullest description

## 🏹 They Shall Lay Hold On Bow And Spear

Bow and spear together cover both ranged and close combat.

This describes a fully equipped fighting force, not a raiding party.

The detail makes the coming threat feel concrete and specific.

This is not vague danger, it is a real army with real weapons.

🏹 Bow covers ranged combat
🗡️ Spear covers close combat
⚔️ Together they describe a full fighting force
📖 The danger is concrete, not vague

## 😨 They Are Cruel, And Have No Mercy

This states the invaders' character directly, without softening it.

No mercy means there is no expectation of restraint or fair treatment.

Their voice roareth like the sea adds a sound picture of overwhelming, crashing noise.

Every detail here is meant to build real, justified fear.

😨 Cruel and no mercy is stated directly
🚫 No restraint or fair treatment is expected
🌊 Their voice roars like the sea
📖 Every detail builds justified fear

## 🐴 They Ride Upon Horses, Set In Array As Men For War

Set in array means organized into disciplined battle formation.

Horses gave this army real speed and striking power.

This was not a disorganized raid but a trained military force.

The description leaves no room to hope this threat is exaggerated.

🐴 Horses gave real speed and power
🎯 Set in array means disciplined formation
⚔️ This was a trained military force
📖 The threat is not exaggerated

# Jeremiah 6:24-26
# 😱 Pain As Of A Woman In Travail
---
## 📰 We Have Heard The Fame Thereof: Our Hands Wax Feeble

Fame here means the report or rumor already spreading about this army.

Just hearing about it was enough to weaken people before any fighting began.

Hands wax feeble is an idiom for losing strength and courage.

Fear itself had already started doing the enemy's work early.

📰 Fame means the spreading report
😨 Just hearing it weakened people already
✋ Hands wax feeble means losing courage
📖 Fear did the enemy's work early

## 👶 Anguish Hath Taken Hold Of Us, And Pain, As Of A Woman In Travail

Travail means the labor pains of childbirth.

It was a common Old Testament picture for sudden, intense, unavoidable pain.

Comparing national fear to travail shows this pain could not be stopped or delayed.

The comparison makes an abstract fear feel physically real.

👶 Travail means the pain of childbirth
⏳ It pictures pain that cannot be delayed
😖 This fear could not be stopped
📖 The comparison makes fear feel physical

## 🚧 Go Not Forth Into The Field, Nor Walk By The Way

This is a practical safety warning, not just poetry.

Fields and roads outside the city walls were now unprotected.

The sword of the enemy and fear is on every side explains exactly why.

Danger had spread past the battlefield into everyday movement.

🚧 This is a practical safety warning
🌾 Fields and roads were now unprotected
⚔️ The sword and fear were everywhere
📖 Danger reached everyday movement, not just battle

## 🪢 O Daughter Of My People, Gird Thee With Sackcloth, And Wallow Thyself In Ashes

Sackcloth was rough, uncomfortable cloth worn only during deep mourning.

Sitting or rolling in ashes was a visible, public sign of grief.

These customs made private sorrow something the whole community could see.

God calls for that kind of open mourning here, not quiet composure.

🪢 Sackcloth was rough mourning cloth
🌫️ Ashes made grief visible in public
👥 The whole community would see this sorrow
📖 Open mourning is called for here

## 👦 Make Thee Mourning, As For An Only Son, Most Bitter Lamentation

Losing an only son meant losing a family's entire future line.

That kind of loss was considered the deepest grief a family could face.

Comparing the coming disaster to it shows how severe this loss would feel.

For the spoiler shall suddenly come upon us adds that it would happen without warning.

👦 An only son meant a family's future line
💔 This grief was considered the deepest kind
⚖️ The comparison shows how severe this is
📖 The disaster would also come without warning

# Jeremiah 6:27-30
# 🥈 Reprobate Silver
---
## 🗼 I Have Set Thee For A Tower And A Fortress Among My People

God gives Jeremiah a specific assignment in this verse.

A tower and fortress both describe an elevated, protected place to observe from.

Jeremiah is placed above the people, in a position to watch closely.

That thou mayest know and try their way names exactly what that position is for.

🗼 Jeremiah is given a specific assignment
👁️ Tower and fortress describe an elevated place
🔍 He is placed to watch closely
📖 His job is to know and test them

## 🔬 That Thou Mayest Know And Try Their Way

Try here means to test, the same idea used for testing metal.

Jeremiah's job was to examine the people's conduct closely and honestly.

This sets up the metal refining picture used through the rest of the chapter.

Watching and testing here is active work, not passive observation.

🔬 Try means testing, like testing metal
🔍 Jeremiah examined their conduct closely
⚙️ This sets up the refining picture ahead
📖 Watching here was active work

## 🚫 They Are All Grievous Revolters, Walking With Slanders

Revolters means people in active rebellion against rightful authority.

Slanders means spreading damaging lies about other people.

Rebellion against God and cruelty toward neighbors are named together here.

Both failures grew from the same corrupted heart.

🚫 Revolters means active rebellion
🗣️ Slanders means spreading damaging lies
🤝 Both failures are named together
📖 Both grew from the same corrupted heart

## ⚙️ They Are Brass And Iron: They Are All Corrupters

Brass and iron are common, hard metals, not precious ones like silver or gold.

Calling the people brass and iron says their true worth was cheap and common.

Corrupters means people who actively spoil or ruin what should be good.

The refining picture in the next verse builds directly on this claim.

⚙️ Brass and iron are common, cheap metals
💰 This says their true worth was cheap
🛑 Corrupters means actively spoiling what is good
📖 The refining picture builds on this claim

## 🔥 The Bellows Are Burned, The Lead Is Consumed Of The Fire

A bellows was a tool used to pump air and raise a fire's heat.

Lead was added to melted silver ore to help pull out impurities.

Both the bellows and the lead were used up completely in this process.

The refining process is being pushed to its absolute limit here.

🔥 A bellows pumped air to raise heat
⚗️ Lead helped pull impurities from silver
🧯 Both were used up completely
📖 The process was pushed to its limit

## 🛠️ The Founder Melteth In Vain: For The Wicked Are Not Plucked Away

A founder is a metalworker who melts ore to separate pure metal from waste.

In vain means all that effort produced no usable result.

No matter how long the process ran, the impurities never separated out.

The people's wickedness had become permanent, not something correction could remove.

🛠️ A founder separates pure metal from waste
⏳ In vain means the effort failed
🚫 The impurities never separated out
📖 Their wickedness had become permanent

## 🥈 Reprobate Silver Shall Men Call Them, Because The LORD Hath Rejected Them

Reprobate means tested and found completely worthless.

This closes the metal picture that began back at tower and fortress.

The testing was real, thorough, and repeated, not rushed or unfair.

The final verdict belongs to God, not to public opinion.

🥈 Reprobate means tested and found worthless
🔁 This closes the metal picture from verse 27
⚖️ The testing was real and thorough
📖 The final verdict belongs to God
`.trim();

export const JEREMIAH_SIX_PERSONAL_SECTIONS = parseJeremiahSixRawNotes(JEREMIAH_SIX_RAW_NOTES);
