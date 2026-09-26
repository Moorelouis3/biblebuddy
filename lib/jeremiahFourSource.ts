export type JeremiahFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFourRawNotes(rawText: string): JeremiahFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 4:${startVerse}` : `Jeremiah 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Jeremiah 4 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FOUR_RAW_NOTES = `# Jeremiah 4:1-4
# 🔙 If Thou Wilt Return
---
## 🔙 If Thou Wilt Return, O Israel, Saith The LORD, Return Unto Me

This invitation still uses the name Israel.

The northern kingdom of Israel had already fallen to Assyria years earlier.

God is holding the door open to anyone from either kingdom willing to come back.

Return here means changing direction completely, not just feeling sorry.

🔙 Israel still gets a real invitation
🚪 The door stayed open after Israel's fall
🔄 Return means changing direction, not regret
📖 A condition follows in the very next line

## 🗑️ Put Away Thine Abominations Out Of My Sight

Abominations here means idols, the false gods Judah had been worshiping.

"Out of my sight" pictures God watching this happen up close.

Removing idols was the actual first step of the return God just offered.

Words alone were never going to fix this relationship.

🗑️ Abominations means idols
👁️ God watches this happen up close
🔑 Idol removal was the real first step
📖 Words alone could not fix this

## 🤝 Thou Shalt Swear, The LORD Liveth, In Truth, In Judgment, And In Righteousness

Swearing by "the LORD liveth" was a common oath in this culture.

Judah had been swearing this oath while still serving other gods.

God demands the oath finally match reality.

An honest oath backed by an honest life is what God is asking for.

🤝 The LORD liveth was a common oath
🎭 Judah swore it while serving idols
✅ God wants the words to be true
📖 An honest oath needs an honest life

## 🌍 The Nations Shall Bless Themselves In Him, And In Him Shall They Glory

This line echoes the promise God gave Abraham.

That promise said all nations would be blessed through his family.

Judah's honest return to God was meant to be a public witness.

One family's obedience was always meant to reach beyond itself.

🌍 This recalls the promise to Abraham
👀 Judah's return was meant as a witness
🔁 The pattern reverses years of idol chasing
📖 One family's obedience reached the nations

## 🌾 Break Up Your Fallow Ground, And Sow Not Among Thorns

Fallow ground is soil left unplowed, hard and packed down.

Seed thrown onto ground like that never actually takes root.

Thorns describe soil still full of old growth.

God is asking Judah to clear out old sin before expecting anything new to grow.

🌾 Fallow ground means hard, unplowed soil
🌱 Seed cannot take root in it
🌵 Thorns describe leftover old growth
📖 Old sin has to be cleared first

## ✂️ Circumcise Yourselves To The LORD, And Take Away The Foreskins Of Your Heart

Physical circumcision marked a man as belonging to God's covenant people.

That practice went back to the time of Abraham.

This verse takes that same picture and moves it to the heart.

"Foreskins of your heart" means whatever still covers over real devotion to God.

✂️ Circumcision marked covenant belonging
📜 The practice went back to Abraham
❤️ This verse moves the picture to the heart
📖 The outward mark pointed to inward change

## 🔥 Lest My Fury Come Forth Like Fire, And Burn That None Can Quench It

This warning names a real consequence, not an empty threat.

Fire that cannot be quenched pictures judgment no one can stop once it starts.

"The evil of your doings" ties the fire directly back to Judah's own choices.

The rest of this chapter shows exactly what that fire looks like.

🔥 Fire pictures unstoppable judgment
🚫 None can quench it once it starts
🔗 The fire is tied to Judah's choices
📖 The chapter shows what the fire looks like

# Jeremiah 4:5-8
# 📯 Blow Ye The Trumpet
---
## 📯 Blow Ye The Trumpet In The Land

The trumpet here is a ram's horn, used to sound an alarm.

This was not a formal announcement, it meant real danger was close.

"Cry, gather together" tells people to leave scattered homes right away.

The order came before the enemy was even visible yet.

📯 The trumpet was a ram's horn alarm
🚨 It meant real danger was close
🏃 Gather together meant leave home now
📖 The warning came before the enemy arrived

## 🏰 Assemble Yourselves, And Let Us Go Into The Defenced Cities

Defenced cities means towns built with walls strong enough to survive a siege.

Smaller villages across Judah had no way to survive an invading army.

The command tells everyone to abandon those villages for fortified towns instead.

This one order shows how serious the coming threat already was.

🏰 Defenced cities means walled, fortified towns
🏘️ Villages could not survive an invasion
🚶 Everyone was told to relocate at once
📖 The order reveals how serious the threat was

## 🚩 Set Up The Standard Toward Zion

A standard was a raised banner used to signal troops from a distance.

Pointing it toward Zion, the hill where Jerusalem stood, told people where to regroup.

"Retire, stay not" adds urgency, meaning move now, not later.

Every detail in this verse is built for speed, not comfort.

🚩 A standard was a raised signal banner
⛰️ Zion pointed people toward Jerusalem
⏱️ Retire, stay not means move immediately
📖 Every detail here is built for speed

## 🧭 I Will Bring Evil From The North, And A Great Destruction

Babylon sat almost directly east of Judah.

Desert made a direct eastern route impossible for armies to travel.

Invading armies came down through Syria first.

That route brought them in from the north instead.

🗺️ Babylon lay east, but armies came north
🏜️ Desert blocked the direct eastern route
🧭 North became this book's fixed warning
📖 The direction of judgment was predictable

## 🦁 The Lion Is Come Up From His Thicket, And The Destroyer Of The Gentiles

A lion hiding in a thicket was a familiar, feared danger in this region.

Kings and empires get pictured as lions elsewhere in the Bible.

That picture points to sudden, deadly power.

"The destroyer of the Gentiles" names an invader already used to conquering other nations.

🦁 A lion in a thicket was feared
👑 Kings get pictured as lions elsewhere
💥 The picture points to deadly power
📖 Judah was only this invader's next target

## 🧵 For This Gird You With Sackcloth, Lament And Howl

Sackcloth was rough, uncomfortable clothing worn to show grief or urgent repentance.

This command comes before the disaster fully lands, not after.

Lamenting and howling means loud, public mourning, not quiet sadness.

God is telling Judah to grieve now, while there is still time to change.

🧵 Sackcloth was rough clothing worn in grief
⏳ The command comes before disaster lands
📢 Howling meant loud, public mourning
📖 Grieving now still left room to change

## ⚖️ The Fierce Anger Of The LORD Is Not Turned Back From Us

This line admits plainly that the danger is already decided.

"Not turned back" means the warning will not simply pass over.

The people speaking this verse are the very ones who caused it.

Naming the anger honestly is different from still trying to argue it away.

⚖️ The danger is decided, not a maybe
🚫 Not turned back means it will not pass
🙋 The people speaking caused it themselves
📖 Naming it honestly beats arguing it away

# Jeremiah 4:9-12
# 😱 The Heart Of The King Shall Perish
---
## 😱 The Heart Of The King Shall Perish, And The Heart Of The Princes

In this culture, the heart stood for courage and clear thinking.

A heart that perishes means the leaders lose their nerve completely.

Kings and princes were supposed to be the ones with a plan.

Even the top leaders will be caught with nothing to offer.

❤️ The heart meant courage, not just feeling
😨 A perishing heart means losing all nerve
👑 Leaders were supposed to have a plan
📖 Even they had nothing to offer

## 📿 The Priests Shall Be Astonished, And The Prophets Shall Wonder

Priests and prophets were the two groups people trusted to explain God's ways.

"Astonished" and "wonder" mean these leaders were caught completely off guard.

That reaction only makes sense if they had promised something very different.

The next verse names exactly what they had been promising instead.

📿 Priests and prophets explained God's ways
😲 Both groups were caught off guard
❓ Their shock reveals a false promise
📖 The next verse names that promise

## 😳 Ah, Lord GOD! Surely Thou Hast Greatly Deceived This People And Jerusalem, Saying, Ye Shall Have Peace

Jeremiah is not accusing God of lying here.

He is reacting in raw shock at what he sees coming.

False prophets had been telling Judah "peace, peace" with no real basis for it.

Real prophets kept warning of danger while popular voices kept promising safety.

😳 Jeremiah reacts in raw shock
🕊️ False prophets kept promising peace
🎭 That false message caused real confusion
📖 True warnings competed with popular comfort

## ⚔️ The Sword Reacheth Unto The Soul

A sword reaching the soul means the danger threatens life itself.

This corrects the false "peace" message point by point.

The coming war would not stay far away or stay small.

It would reach every family personally, not just the battlefield.

⚔️ The sword threatens life itself
🎯 This corrects the false peace message
🏠 The danger reaches into every home
📖 It would not stay on the battlefield

## 🌾 A Dry Wind Of The High Places In The Wilderness, Not To Fan, Nor To Cleanse

Farmers normally used wind to fan grain.

That process blew away the light chaff and kept the good kernels.

The wind in this verse is a hot desert wind, useless for that work.

God is describing a wind sent purely to destroy, not to purify.

🌾 Wind normally fanned chaff from grain
✅ That process was helpful, not harmful
🏜️ This wind is a hot desert wind
📖 It destroys instead of purifying

## 💨 Even A Full Wind From Those Places Shall Come Unto Me, Now Also Will I Give Sentence

"Full wind" means this wind comes at its strongest, holding nothing back.

God says the wind comes "unto me," meaning He directs it.

"Give sentence" is legal language, describing a verdict already decided.

The judgment ahead is a ruling being carried out, not random weather.

💨 Full wind means at its strongest
🎯 God directs where this wind goes
⚖️ Sentence is legal language for a verdict
📖 This is judgment, not random weather

# Jeremiah 4:13-18
# 🌪️ He Shall Come Up As Clouds
---
## ☁️ Behold, He Shall Come Up As Clouds, And His Chariots Shall Be As A Whirlwind

Clouds moving in fast were an unmistakable warning sign of a coming storm.

Comparing an army to clouds pictures its size covering the whole horizon.

A whirlwind adds speed and force no one could brace against.

The image leaves no room to imagine this invasion arriving gently.

☁️ Clouds pictured the army's huge size
🌪️ Whirlwind added speed and force
⏱️ No time to brace against it
📖 This invasion would not come gently

## 🦅 His Horses Are Swifter Than Eagles

Eagles were the fastest, most feared hunters known in this region.

Saying the horses outrun eagles means escape was not realistic.

Cavalry moving that fast could reach cities before defense was organized.

Speed itself was part of the terror, not just the army's size.

🦅 Eagles were the fastest hunters known
🐎 Outrunning this army was not realistic
🏇 Cities had no time to prepare
📖 Speed itself added to the terror

## 🗣️ Woe Unto Us! For We Are Spoiled

This short cry is the people's own voice breaking into the warning.

"Spoiled" means plundered and ruined, not merely inconvenienced.

They say this before the invasion even fully arrives.

Fear had already moved from a future threat to a present reality.

🗣️ This is the people's own voice
💔 Spoiled means plundered and ruined
⏳ The outcome already felt certain
📖 Fear became a present reality

## 🧼 O Jerusalem, Wash Thine Heart From Wickedness, That Thou Mayest Be Saved

Washing pictures a real, thorough cleaning, not a quick surface fix.

This is God's own offer of rescue.

It comes in the middle of describing judgment, not after it.

Judgment and a genuine offer of escape appear in the very same verse.

🧼 Washing pictures thorough cleaning
🤲 This is God's own offer of rescue
🚪 The offer comes in the middle of judgment
📖 Judgment and mercy appear together here

## 🛏️ How Long Shall Thy Vain Thoughts Lodge Within Thee

"Lodge" means to stay overnight like a guest, not just pass through.

Vain thoughts here means the idolatrous excuses Judah kept making.

Those thoughts had overstayed their welcome for years, not just a season.

The question is really an invitation to finally send those thoughts away.

🛏️ Lodge means staying like an overnight guest
💭 Vain thoughts means idolatrous excuses
⏳ These thoughts overstayed for years
📖 The question invites sending them away

## 🗺️ A Voice Declareth From Dan, And Publisheth Affliction From Mount Ephraim

Dan sat at the far northern edge of Israelite territory.

It was the first point an invader from the north would reach.

Mount Ephraim was central hill country, closer to Jerusalem.

Naming both places in order traces the invasion moving toward the capital.

🗺️ Dan marked Israel's far northern edge
⛰️ Mount Ephraim sat closer to Jerusalem
➡️ The order traces the invasion's route
📖 This warning follows a real map

## 🌾 As Keepers Of A Field, Are They Against Her Round About

Keepers of a field normally guarded crops from thieves and animals.

That was a protective job, not a threatening one.

This verse flips the picture, watchers now surround Jerusalem to attack it.

"A far country" means this enemy was foreign, not a nearby rival kingdom.

🌾 Field keepers normally protected crops
🔄 This verse flips that picture around
🌍 Far country means a foreign enemy
📖 A protective image turns threatening

## 🎯 Thy Way And Thy Doings Have Procured These Things Unto Thee

"Procured" means Judah's own choices actually brought this about.

The verse refuses to blame chance or circumstance.

"It reacheth unto thine heart" names how deep the consequence goes.

Judgment here is cause and effect, not a random strike.

🎯 Procured means Judah's choices caused this
🚫 It was not bad luck or chance
💔 The consequence reaches to the heart
📖 This is cause and effect, not randomness

# Jeremiah 4:19-22
# 💔 My Bowels, My Bowels
---
## 🫀 My Bowels, My Bowels! I Am Pained At My Very Heart

In Hebrew thought, the bowels were considered the seat of deep emotion.

People today would point to the heart to describe the same thing.

Naming them twice shows pain too strong for one mention to capture.

This is Jeremiah's own body reacting to what he is prophesying.

🫀 Bowels meant the seat of deep emotion
🔁 Saying it twice shows overwhelming pain
😖 Jeremiah's own body reacts here
📖 He feels the disaster before it arrives

## 💓 My Heart Maketh A Noise In Me, I Cannot Hold My Peace

A heart "making a noise" pictures a pulse pounding loud enough to notice.

"I cannot hold my peace" means Jeremiah cannot stay silent about what he sees.

This is a prophet overwhelmed by his own message.

Delivering this warning was costing Jeremiah something real.

💓 A pounding heart pictured loudly
🗣️ He cannot stay silent about it
😰 The prophet is overwhelmed himself
📖 This warning cost Jeremiah something real

## ⛺ Suddenly Are My Tents Spoiled, And My Curtains In A Moment

Tents and curtains were common poetic words for a person's home.

That was true even for people living in permanent houses.

"Suddenly" and "in a moment" stress how fast the loss would happen.

Repeating "destruction upon destruction" pictures one disaster landing right on top of another.

⛺ Tents and curtains meant home
⏱️ Suddenly means no time to prepare
🌊 Destruction lands wave after wave
📖 There is no pause between disasters

## 📯 How Long Shall I See The Standard, And Hear The Sound Of The Trumpet

This question echoes the trumpet and standard from earlier in the chapter.

Now it is heard from inside the crisis instead of before it.

"How long" is the language of exhaustion, not curiosity.

Jeremiah is voicing what every frightened person in Jerusalem already felt.

📯 This echoes the earlier trumpet warning
😩 How long signals exhaustion, not curiosity
⏳ Constant alarm wears people down
📖 Jeremiah voices the people's own fear

## 🙃 My People Is Foolish, They Have Not Known Me

Foolish in this book means morally senseless, not simply uninformed.

"Have not known me" points to a relationship, not a lack of facts.

Judah had plenty of religious information without any real closeness to God.

Knowing about God and knowing God were never the same thing.

🙃 Foolish means morally senseless here
❤️ Known me points to relationship
📚 Judah had information without closeness
📖 Knowing about God differs from knowing Him

## 🧒 They Are Sottish Children, And They Have None Understanding

Sottish is an old word meaning stupid or dull.

Here it describes spiritual matters specifically, not everyday cleverness.

Calling grown adults children pictures people who never grew up in wisdom.

"None understanding" means the gap was not small, it was total.

🙄 Sottish means dull or senseless
🧒 Children pictures people who never matured
🚫 None understanding means a total gap
📖 The next line shows this in practice

## 🎯 They Are Wise To Do Evil, But To Do Good They Have No Knowledge

This verse describes skill running in exactly the wrong direction.

Judah had gotten clever and practiced at sin.

That same sharpness never carried over into doing what was right.

Wisdom pointed the wrong way is still not real wisdom.

🎯 Skill was running the wrong direction
😈 Judah grew practiced at sin
🚫 That skill never carried to doing good
📖 Misdirected wisdom is not real wisdom

# Jeremiah 4:23-26
# 🌑 Without Form, And Void
---
## 🌍 I Beheld The Earth, And, Lo, It Was Without Form, And Void

"Without form, and void" is the exact phrase used for the earth in Genesis 1.

That phrase described the earth before God began creating anything.

Jeremiah pictures judgment as creation running backward, not just a lost battle.

The coming disaster is cosmic here, not only political.

🌍 This exact phrase opens Genesis 1
🔁 Judgment here undoes creation itself
🏗️ God's original order is being reversed
📖 The disaster is cosmic, not just political

## 💡 And The Heavens, And They Had No Light

Light was the very first thing God spoke into existence.

A sky with no light pictures that first act of creation taken back.

This is not describing a normal night.

It is describing the undoing of day itself.

💡 Light was God's first spoken creation
🌑 No light pictures that act reversed
🌒 This is not an ordinary night
📖 Creation is undone step by step

## ⛰️ I Beheld The Mountains, And, Lo, They Trembled, And All The Hills Moved Lightly

Mountains and hills were the most fixed, unmoving features people knew.

Watching them tremble pictures the most stable parts of creation losing stability.

"Moved lightly" suggests a constant, unsettling shaking, not one single quake.

If even the mountains are not steady, nothing in the vision feels safe.

⛰️ Mountains represented total stability
🫨 Trembling means that stability is gone
🌊 Moved lightly suggests constant shaking
📖 Nothing in the vision feels safe

## 🐦 There Was No Man, And All The Birds Of The Heavens Were Fled

People and birds were both among the last things God filled the earth with.

That filling happened back in Genesis 1.

No man means no one left even to witness what happened.

Even the birds, usually quick to sense danger, are gone from the sky.

🐦 Birds were part of Genesis 1's filling
🕳️ Their absence undoes that filling
👤 No man means no witnesses remain
📖 Even the birds sensed the danger

## 🌾 The Fruitful Place Was A Wilderness, And All The Cities Thereof Were Broken Down

Fruitful land represented food, safety, and years of settled work.

Turning it into wilderness undoes all of that in a single stroke.

Cities represented the height of human building and order in this world.

"His fierce anger" names exactly who caused this, it was not an accident.

🌾 Fruitful land meant food and safety
🏜️ Wilderness undoes that in a stroke
🏙️ Cities represented human order
📖 God's own anger is named as the cause

# Jeremiah 4:27-29
# 🖤 Yet Will I Not Make A Full End
---
## 🌍 The Whole Land Shall Be Desolate, Yet Will I Not Make A Full End

This judgment is described as sweeping across the whole land.

Nothing in Judah is described as exempted from it.

"Yet will I not make a full end" keeps this from being total annihilation.

Jeremiah repeats this same promise later in the book for the exiles in Babylon.

🌍 The judgment sweeps the whole land
🚫 Not a full end means it stops short
🔁 Jeremiah repeats this promise later
📖 Severe judgment and hope stand together

## 😭 For This Shall The Earth Mourn, And The Heavens Above Be Black

Mourning was normally something people did for the dead.

Real rituals like torn clothes and ashes were attached to that mourning.

Here the earth and sky themselves are pictured performing that same mourning.

Creation reacting this way shows the scale of what is about to happen.

😭 Mourning was normally a human ritual
🌍 Here the earth mourns instead
🌑 Black heavens picture the sky darkening
📖 Creation's reaction shows the disaster's scale

## 🔄 I Have Spoken It, I Have Purposed It, And Will Not Repent

"Repent" here means change His mind.

It is not about God confessing sin the way people do.

This decision was planned on purpose, not a reaction made in anger.

God's own certainty matches the seriousness of everything said so far.

🔄 Repent here means changing His mind
🎯 This was purposed, not a sudden reaction
🚫 Turn back means the warning stands
📖 God's certainty matches the chapter's tone

## 🌵 They Shall Go Into Thickets, And Climb Up Upon The Rocks

The whole city is described fleeing from the noise of horsemen and archers.

Thickets and rocky cliffs were the natural hiding places outside a city.

Fleeing to them meant giving up on any organized defense.

"Not a man dwell therein" completes the picture, homes left standing completely empty.

🌵 Thickets and rocks were natural hideouts
🏳️ Fleeing there meant giving up defense
🏚️ Forsaken cities means empty homes
📖 The land loses its people, not a battle

# Jeremiah 4:30-31
# 😢 Woe Is Me Now
---
## ❓ When Thou Art Spoiled, What Wilt Thou Do?

This question is not curious, it exposes a plan that has already failed.

Judah is pictured relying on appearance and alliances instead of God.

Everything named in the rest of the verse answers the question honestly.

None of it will actually work.

❓ This question exposes a failed plan
🎭 Judah relied on appearance and alliances
🚫 None of it will actually work
📖 The question forces honest self reflection

## 👗 Though Thou Clothest Thyself With Crimson, Though Thou Deckest Thee With Ornaments Of Gold

Crimson dye and gold jewelry were expensive signs of wealth and status.

Judah is pictured as a woman dressing up for a special occasion.

That is not the behavior of a nation preparing for war.

This luxury was aimed at impressing the very nations Judah hoped would rescue her.

👗 Crimson and gold signaled wealth
💃 Judah is pictured dressing up, not fighting
🤝 The display targeted potential allies
📖 Appearance cannot replace real protection

## 👁️ Though Thou Rentest Thy Face With Painting, In Vain Shalt Thou Make Thyself Fair

"Rentest thy face with painting" describes darkening the eyes with a cosmetic called kohl.

That practice was meant to make the eyes look larger and more striking.

This same cosmetic custom appears elsewhere in the Bible on other women.

"In vain" states plainly that none of this effort will change the outcome.

👁️ Painting meant darkening eyes with kohl
💄 The same custom appears elsewhere in scripture
🚫 In vain means the effort changes nothing
📖 Makeup is applied as disaster arrives

## 💔 Thy Lovers Will Despise Thee, They Will Seek Thy Life

Lovers here means the foreign nations Judah trusted instead of trusting God.

That same picture was already used back in chapter three.

Judah expected these alliances to protect her.

Instead, those same allies will turn against Judah and want her destroyed.

💔 Lovers means the nations trusted instead of God
🤝 Judah expected these allies to help
🔄 Instead those allies will turn against her
📖 Misplaced trust leaves a person exposed

## 🏙️ The Voice Of The Daughter Of Zion, That Bewaileth Herself

Daughter of Zion is a common poetic name for Jerusalem.

It pictures the whole city as a single grieving person.

Her anguish is compared to a woman in labor.

That kind of pain cannot be stopped once it starts.

"Because of murderers" names a real, human cause, not vague misfortune.

This chapter opened with an invitation to return.

It closes with the very cry that invitation hoped to prevent.

🏙️ Daughter of Zion pictures Jerusalem as a person
🤰 Labor pain means unstoppable anguish
🗡️ Murderers names a real, human cause
📖 The invitation ends in the cry it feared
`.trim();

export const JEREMIAH_FOUR_PERSONAL_SECTIONS = parseJeremiahFourRawNotes(JEREMIAH_FOUR_RAW_NOTES);
