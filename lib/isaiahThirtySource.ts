export type IsaiahThirtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahThirtyRawNotes(rawText: string): IsaiahThirtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahThirtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+30:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 30 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+30:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+30:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 30 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 30,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 30:${startVerse}` : `Isaiah 30:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Isaiah 30 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_THIRTY_RAW_NOTES = `# Isaiah 30:1-5
# ⚠️ Woe To The Rebellious Children
---
## ⚠️ Woe To The Rebellious Children

"Woe" is not just sadness.

It is a prophetic cry warning of coming disaster.

God calls Judah rebellious for planning without asking him.

They are still called his children.

Yet here they act in open defiance.

⚠️ Woe means a warning cry
👶 Judah is still called God's children
🚫 They plan without asking God
📖 Defiance does not erase sonship

## 🤝 That Cover With A Covering, But Not Of My Spirit

"Covering" here means a treaty or alliance.

Think of it like pulling on a cloak for shelter.

Judah is making that kind of deal with Egypt.

The plan did not come from God's own guidance.

A covering not shaped by God's spirit gives false protection.

🤝 Covering means a political alliance
🇪🇬 Judah turns to Egypt for help
🚫 The plan skips God's guidance
📖 False protection still leaves you exposed

## ➕ That They May Add Sin To Sin

Judah does not stop at one mistake here.

First they refuse to ask God for direction.

Then they chase a foreign alliance instead.

Isaiah stacks these choices on purpose.

Sin gets added directly on top of sin.

➕ Two separate sins pile up here
🙅 First God is not consulted
🇪🇬 Then Egypt becomes the fallback
📖 One wrong choice invites another

## 🇪🇬 That Walk To Go Down Into Egypt

"Go down" describes both geography and a spiritual step backward.

Egypt sits at a lower elevation than Jerusalem.

Travelers heading there literally went down.

Earlier in Israel's story, God warned his people not to return to Egypt for safety.

Judah's leaders ignore that old warning here.

🇪🇬 Go down fits Egypt's lower elevation
📜 Earlier warnings told Israel not to return
🚶 Judah's leaders ignore that history
📖 Old warnings still apply to new choices

## 🌑 To Trust In The Shadow Of Egypt

"Shadow" pictures shade from the desert sun, a place of shelter and rest.

Judah hopes Egypt can shield them the way shade blocks the sun.

The irony is that Egypt's shadow will prove empty when trouble comes.

A shadow gives an illusion of safety without real strength behind it.

🌑 Shadow pictures shade and shelter
☀️ Judah hopes Egypt blocks the danger
🎭 That shelter turns out to be fake
📖 Egypt's shade could not shield them

## 😳 The Strength Of Pharaoh Be Your Shame

Judah expected Pharaoh's army to make them strong.

Isaiah promises the opposite outcome instead.

What they trusted as strength will become their shame.

A future defeat is about to expose that trust as empty.

😳 Trusted strength becomes shame instead
🔄 Isaiah promises a full reversal
🇪🇬 Pharaoh cannot deliver what was expected
📖 Misplaced trust always ends in exposure

## 🏛️ His Princes Were At Zoan, And His Ambassadors Came To Hanes

Zoan was a major city in the Nile Delta, once a capital of Egypt.

Hanes sat further south in Egypt, another city of real political weight.

Judah sent actual officials deep into Egyptian territory to negotiate this alliance.

This was not just talk, but a real diplomatic mission.

🏛️ Zoan was a major Delta city
🏺 Hanes was another key Egyptian city
✈️ Judah sent real envoys south
📖 This was a serious diplomatic mission

## 😞 Ashamed Of A People That Could Not Profit Them

Egypt was famous for wealth and military strength in the ancient world.

None of that strength ever reached Judah when trouble came.

The very alliance Judah risked everything for brought no real help.

Shame and reproach were the only return on that investment.

😞 Egypt looked strong but delivered nothing
🤝 The alliance never actually helped
💸 Judah risked everything for nothing
📖 Trust in the wrong ally still costs you

# Isaiah 30:6-7
# 🐫 The Burden Of The Beasts Of The South
---
## 🐫 The Burden Of The Beasts Of The South

A "burden" in these prophecies means a heavy message of judgment.

It also describes literal cargo here.

Pack animals carried real supplies on this trip.

"South" points to the Negev, the harsh desert route between Judah and Egypt.

Even the wording of this oracle carries the weight of the danger ahead.

🐫 Burden means a message of judgment
📦 It also describes real cargo
🏜️ South points to the desert route
📖 The wording itself carries weight

## 🦁 The Land Of Trouble And Anguish... The Viper And Fiery Flying Serpent

The Negev desert route was genuinely dangerous, not just poetic language.

Lions, both young and old, actually lived along that path.

A "viper" is a venomous snake.

A "fiery flying serpent" likely describes another deadly desert creature.

Judah risked real danger just to reach an ally that would not help.

🦁 Lions actually lived along this route
🐍 Viper means a venomous snake
🔥 Fiery flying serpent means another desert danger
📖 Risked for an ally that failed

## 💰 They Will Carry Their Riches Upon The Shoulders Of Young Asses... To A People That Shall Not Profit Them

Judah's envoys loaded donkeys and camels with expensive gifts for Egypt.

These gifts were meant to buy Pharaoh's military support.

The whole risky trip ends with the same verdict already given, no real profit.

All that wealth and danger bought nothing lasting.

💰 Envoys carried expensive gifts to Egypt
🎁 The gifts aimed to buy support
🚫 The trip still profits nothing
📖 Wealth and danger bought nothing lasting

# Isaiah 30:8-11
# 📜 Write It Before Them In A Table
---
## 📜 Write It Before Them In A Table, And Note It In A Book

A "table" here means a flat tablet or writing surface, not furniture.

God tells Isaiah to put this warning in permanent writing.

A spoken word can be denied or forgotten later.

A written record stands as lasting proof for generations to come.

📜 Table means a writing tablet
✍️ Isaiah records this warning permanently
🗣️ Spoken words can be denied later
📖 Writing preserves proof for generations

## 👶 A Rebellious People, Lying Children

"Lying children" does not mean children who tell lies here.

It means children who betray what their father actually taught them.

God calls Judah his own children, yet says they refuse his law.

The relationship is real, but deeply broken by their own choice.

👶 Lying children means children who betray
📚 They reject God's own law
💔 The family relationship still stands
📖 Betrayal does not erase belonging

## 🙈 Say To The Seers, See Not... Prophesy Unto Us Smooth Things

"Seers" is an older word for prophets, people who received visions from God.

The people do not want true warnings, only comfortable words.

"Smooth things" means messages that feel good but are not actually true.

They would rather feel safe than actually be safe.

🙈 Seers means prophets who see visions
🚫 They reject the prophets' true warnings
🍯 Smooth things means comfortable lies
📖 Comfort is not the same as safety

## 🚪 Cause The Holy One Of Israel To Cease From Before Us

This request goes further than ignoring one prophet's message.

The people want God's holy presence removed from public life entirely.

"The Holy One of Israel" is one of Isaiah's favorite titles for God.

Silencing that name does not remove God from the world.

🚪 They want God's presence gone
👑 Holy One of Israel is a key title
🔇 Silencing a name changes nothing real
📖 God does not vanish when ignored

# Isaiah 30:12-14
# 🧱 This Iniquity Shall Be As A Breach
---
## ⚖️ Because Ye Despise This Word, And Trust In Oppression And Perverseness

Judah rejected the very message God told Isaiah to write down.

"Oppression" here means the unjust exploitation of others to get ahead.

"Perverseness" means twisting what is right until it fits what you want.

Judah leaned on crooked scheming instead of trusting God's word.

⚖️ God's own word is despised here
💰 Oppression means unjust exploitation
🌀 Perverseness means twisting what is right
📖 Crooked schemes replaced trust in God

## 🧱 This Iniquity Shall Be To You As A Breach Ready To Fall

A "breach" is a crack in a city wall.

It comes right before a total collapse.

The crack looks solid at first.

Sin here works the same way.

It builds as hidden weakness, quietly out of sight.

🧱 Breach means a wall about to collapse
👀 Damage can stay hidden at first
🐌 Sin builds slowly out of sight
📖 Everything looks fine until it is not

## 📈 Swelling Out In A High Wall, Whose Breaking Cometh Suddenly At An Instant

The crack does not stay small forever.

It swells outward, a visible bulge before the coming collapse.

The wall finally gives way in one sudden instant.

That collapse does not happen gradually.

Judgment often looks slow right up until the moment it is not.

📈 The crack visibly swells outward
⚠️ A bulge warns before the fall
💥 The collapse itself happens suddenly
📖 Sudden collapse follows quiet warning signs

## 🏺 As The Breaking Of The Potters' Vessel... Not A Sherd To Take Fire From The Hearth

A potter's vessel is a clay jar.

It stays useful until it shatters.

This is not a small crack this time.

It is smashed into a whole pile of pieces.

A "sherd" is a shard, a broken piece of pottery.

Normally a sherd that size could scoop up coals or water.

Here, not even one piece that size survives.

🏺 A clay jar shatters completely
💔 Not a small crack this time
🔥 A sherd could normally scoop coals or water
📖 Not even one piece that size survives

# Isaiah 30:15-17
# 🐎 In Returning And Rest Shall Ye Be Saved
---
## 🛑 In Returning And Rest Shall Ye Be Saved

"Returning" here means turning back to God, not physical travel.

"Rest" means trusting stillness instead of frantic scrambling for safety.

God offers salvation through simple trust, not through military alliances.

That offer still stands even after all their scheming with Egypt.

🛑 Returning means turning back to God
😌 Rest means trusting stillness
🤝 Salvation comes through trust, not scheming
📖 The offer stands despite their choices

## 🙅 In Quietness And In Confidence Shall Be Your Strength: And Ye Would Not

"Quietness" and "confidence" describe calm trust instead of anxious striving.

God says real strength comes from that kind of calm.

The verse ends with four heartbreaking words, and ye would not.

Judah hears the offer clearly and rejects it anyway.

🙅 Quietness and confidence mean calm trust
💪 Real strength comes from that trust
💔 And ye would not is a rejection
📖 A clear offer, refused on purpose

## 🐎 We Will Flee Upon Horses... We Will Ride Upon The Swift

Judah chooses speed and cavalry instead of quiet trust.

"The swift" likely refers to fast Egyptian horses, exactly what this alliance was for.

They plan to outrun danger instead of standing on God's promise.

Isaiah turns their own words back on them with bitter irony.

The very fleeing they boast about becomes their literal fate.

🐎 Judah chooses speed over trust
🇪🇬 The swift points to Egyptian horses
🏃 They plan to outrun danger
📖 Their boast becomes their literal fate

## ⚔️ One Thousand Shall Flee At The Rebuke Of One... As A Beacon Upon The Top Of A Mountain

A single threat will be enough to rout an entire army here.

That is the opposite of the strength Judah hoped horses would provide.

A "beacon" and an "ensign" both mean a lone pole or signal flag left standing.

What remains after the collapse is one isolated marker, not a surviving army.

⚔️ One threat routs a whole army
🐎 The opposite of what horses promised
🚩 Beacon and ensign mean a lone signal pole
📖 One marker is left, not an army

# Isaiah 30:18-19
# ⏳ Therefore Will The LORD Wait
---
## ⏳ Therefore Will The LORD Wait, That He May Be Gracious Unto You

God's waiting is not weakness or delay for no reason.

He waits on purpose, giving room for the people to turn back.

The same verse also calls him a God of judgment.

Mercy and justice sit together in the same sentence here.

⏳ God's waiting has real purpose
🔁 It gives room for people to turn
⚖️ God is also called a God of judgment
📖 Mercy and justice both belong to him

## 🙌 Blessed Are All They That Wait For Him

This verse repeats the word "wait" from earlier in this chapter.

Now it is aimed directly at the people.

God waits to be gracious.

Blessing comes to those who wait for him in return.

Judah already refused to wait back in verse fifteen.

That refusal makes this contrast sharp.

🙌 Wait repeats deliberately in this verse
🔁 God waits, and so should they
❌ Judah already refused this in verse fifteen
📖 Patience was the better path all along

## 📣 He Will Be Very Gracious Unto Thee At The Voice Of Thy Cry... He Will Answer Thee

This promise describes a real, immediate response, not a distant, formal one.

The moment their cry goes up, God says he will hear it.

Weeping is promised to end because the reason for it will end too.

This is personal relationship language, not simply covenant law being enforced.

📣 The response is immediate, not distant
😢 Weeping is promised to end
👂 God hears the cry right away
📖 This reads as relationship, not just law

# Isaiah 30:20-22
# 👂 Thine Ears Shall Hear A Word Behind Thee
---
## 🍞 The Bread Of Adversity, And The Water Of Affliction

This phrase does not describe a total absence of food and water.

It describes a hard season, a time of real hardship and testing.

God allows this discipline, but he does not abandon the people inside it.

Hard seasons can still carry God's presence within them.

🍞 Bread of adversity means a hard season
💧 Water of affliction means real hardship
🤝 God allows it without abandoning them
📖 Hard seasons can still hold his presence

## 👨‍🏫 Thy Teachers Be Removed Into A Corner Any More... Thine Eyes Shall See Thy Teachers

"Teachers" here likely means the prophets Judah had been ignoring and pushing aside.

Earlier in this chapter, the people asked the prophets to stop speaking altogether.

This promise reverses that silence completely.

True guidance becomes visible again instead of hidden in a corner.

👨‍🏫 Teachers likely means the prophets
🙉 They had been pushed aside earlier
🔄 This promise reverses that silence
📖 True guidance becomes visible again

## 🧭 Thine Ears Shall Hear A Word Behind Thee, Saying, This Is The Way, Walk Ye In It

This pictures a guide walking just behind you, giving directions at each turn.

You do not need to see the road perfectly on your own.

The voice speaks up exactly when you reach a fork in the path.

That kind of guidance requires only listening, not perfect eyesight.

🧭 A guide walks just behind you
👣 Direction comes at each turn
👂 Listening matters more than eyesight
📖 God guides even at every fork

## 🚫 Defile Also The Covering Of Thy Graven Images... As A Menstruous Cloth

"Graven" and "molten" images describe idols carved from wood or stone and cast from metal.

Silver and gold coverings once made these idols look valuable.

Calling them unclean like a used cloth strips away that appeal.

This is not a quiet setting aside.

It is total, disgusted rejection.

🙈 Graven and molten describe carved or cast idols
✨ Silver and gold once made them look valuable
🚮 They are compared to an unclean cloth
📖 This is total, disgusted rejection

# Isaiah 30:23-26
# 🌦️ Then Shall He Give The Rain Of Thy Seed
---
## 🌾 The Rain Of Thy Seed... Cattle Feed In Large Pastures

This pictures full agricultural recovery after a season of hardship.

Rain at the right time meant crops would actually grow.

Livestock roaming in large, open pastures pictures safety as well as abundance.

The famine and siege conditions from earlier in the chapter are fully reversed here.

🌾 Rain means crops will actually grow
🐄 Wide pastures picture safety and plenty
🔄 This reverses the earlier hardship completely
📖 Abundance follows the hardest season

## 🐴 The Oxen Likewise And The Young Asses... Winnowed With The Shovel And With The Fan

"Provender" is animal feed, the grain set aside to feed livestock.

Even the working animals get clean, high quality food in this picture.

Winnowing used a shovel to toss grain into the wind.

A fan then blew away the light husks.

That process left only the good grain behind.

🐴 Provender means animal feed
✨ Even the work animals eat well
🌬️ Winnowing separated grain from husks
📖 Even the animals share this blessing

## 🏞️ Rivers And Streams Of Waters... In The Day Of The Great Slaughter, When The Towers Fall

This abundance is tied directly to a specific day of judgment.

"The towers fall" pictures the defeat of the very enemy that threatened Judah.

Blessing for God's people and judgment on an oppressor happen at the same time here.

Deliverance often comes through the defeat of what was threatening you.

🏞️ Abundant water follows a day of judgment
🗼 Towers falling pictures an enemy's defeat
⚖️ Blessing and judgment arrive together
📖 Deliverance can come through an enemy's fall

## 🌕 The Light Of The Moon Shall Be As The Light Of The Sun... As The Light Of Seven Days

This is deliberate, hyperbolic imagery, not a literal astronomy claim.

The moon suddenly matching the sun pictures overwhelming, unnatural brightness.

"Sevenfold" and "seven days" push that image even further into full completeness.

The scale of the language matches the scale of the joy being described.

🌕 This is hyperbole, not literal astronomy
☀️ The moon suddenly matches the sun
🔢 Sevenfold pictures full completeness
📖 Extreme language matches extreme joy

## 🩹 The LORD Bindeth Up The Breach Of His People, And Healeth The Stroke Of Their Wound

This verse deliberately echoes the word "breach" from earlier in this same chapter.

Back in verse thirteen, that breach pictured a wall about to collapse under judgment.

Here the very same word describes something being healed instead of broken.

The chapter's own image of coming ruin becomes an image of coming repair.

🩹 Breach repeats the word from verse thirteen
🧱 That breach once pictured a collapsing wall
🔄 The same word now means healing
📖 Ruin's imagery becomes repair's imagery

# Isaiah 30:27-28
# 🔥 The Name Of The LORD Cometh From Far
---
## 🔥 The Name Of The LORD Cometh From Far, Burning With His Anger

"The name of the LORD" is a way of speaking about God's own presence and character.

He does not send judgment from a distance through some other force.

God himself arrives here as the one bringing this judgment.

His arrival is described as burning, not simply firm or serious.

🔥 The name means God's own presence
🚶 God arrives personally, not through another
😠 His anger burns rather than simmers
📖 This judgment is deeply personal

## 🗣️ His Lips Are Full Of Indignation, And His Tongue As A Devouring Fire

God's own speech is pictured as a weapon here.

"Indignation" means righteous anger at real wrongdoing, not a petty grudge.

His words are compared to fire that consumes whatever they touch.

A single sentence from God carries real, destructive weight.

🗣️ His speech itself is the weapon
😡 Indignation means righteous anger
🔥 His words are compared to fire
📖 God's words carry destructive weight

## 🌊 His Breath... Shall Reach To The Midst Of The Neck, To Sift The Nations With The Sieve Of Vanity

This pictures a flood rising up to the neck, close to drowning.

"Sift" recalls the winnowing image used earlier for grain in this very chapter.

Here the sieve separates nations instead of grain, exposing what is empty and worthless.

"Vanity" means emptiness, the useless parts a true sieve leaves behind.

🌊 The flood image rises to the neck
🌬️ Sift echoes the earlier winnowing image
🌍 Nations get sifted here, not grain
📖 Vanity means the useless, empty part

## 🐴 A Bridle In The Jaws Of The People, Causing Them To Err

A "bridle" is the strap and bit used to steer a horse.

Normally a bridle guides an animal somewhere useful.

Here it forces the nations toward their own ruin instead.

This is judgment shaped like guidance, leading straight to disaster.

🐴 Bridle means the strap that steers a horse
🧭 Normally it guides toward something useful
💥 Here it steers nations toward ruin
📖 Judgment can look like guidance

# Isaiah 30:29-33
# 🎶 Ye Shall Have A Song
---
## 🎶 Ye Shall Have A Song, As In The Night When A Holy Solemnity Is Kept

A "holy solemnity" describes a festival night, like Passover, kept with real joy.

The chapter that began with dread and siege now ends with celebration.

That song plays even now.

Assyria's defeat is still unfolding around them.

Real joy here grows out of real deliverance, not denial of danger.

🎶 Holy solemnity means a festival night
🔄 The chapter's dread turns into joy
🎊 Joy plays even during real danger
📖 True joy grows from real deliverance

## 🎵 As When One Goeth With A Pipe To Come Into The Mountain Of The LORD

A "pipe" here is a simple flute, an instrument used in festival processions.

Worshipers walked together toward Jerusalem's temple mountain.

They played music like this the whole way.

That image pictures a joyful crowd, not a scattered, frightened people.

The mighty One of Israel is the same title used for God back in verse fifteen.

🎵 Pipe means a simple flute
🚶 Worshipers processed toward the temple together
😊 This pictures joy, not fear
📖 The same God named in verse fifteen

## ⛈️ The LORD Shall Cause His Glorious Voice To Be Heard... With Scattering, And Tempest, And Hailstones

God's own voice is compared here to the sound of thunder.

"The lighting down of his arm" pictures a sudden, visible strike of power.

Storm, scattering wind, and hailstones all describe uncontrollable natural force.

God does not need human armies to accomplish this defeat.

⛈️ God's voice sounds like thunder
💪 His arm pictures a sudden strike
🌪️ Storm and hail show uncontrolled power
📖 No human army is needed here

## ⚔️ Through The Voice Of The LORD Shall The Assyrian Be Beaten Down, Which Smote With A Rod

Assyria was the real empire threatening Judah when Isaiah wrote this chapter.

That empire had used a "rod," meaning cruel and violent conquest, against many nations.

Here the very voice of God defeats it, not a rival army.

The oppressor's own violent method gets turned back against itself.

⚔️ Assyria was the real threat here
🏛️ Rod means cruel, violent conquest
🗣️ God's own voice brings the defeat
📖 The oppressor's method turns back on itself

## 🥁 The Grounded Staff Shall Pass, Which The LORD Shall Lay Upon Him... With Tabrets And Harps

"The grounded staff" pictures God's judgment landing again and again on Assyria.

That judgment scene is strangely set to music.

Tabrets and harps play instead of only battle sounds.

A "tabret" is a small hand drum, the same instrument named earlier in this book.

For Judah, watching this judgment fall is itself cause for celebration.

🥁 Tabret means a small hand drum
⚔️ The staff pictures repeated judgment blows
🎶 Music plays alongside this judgment
📖 Judah's rescue is Assyria's downfall

## 🔥 For Tophet Is Ordained Of Old... The Breath Of The LORD, Like A Stream Of Brimstone, Doth Kindle It

"Tophet" was a real site near Jerusalem, later known as the Valley of Hinnom.

It had been used for pagan child sacrifice, one of the most horrifying practices in the Old Testament.

This verse says a Tophet has been prepared for the king, meaning Assyria's own ruler.

"Brimstone" means burning sulfur, and this image later shaped how many pictured final judgment.

🔥 Tophet was a real site near Jerusalem
😨 It was linked to pagan child sacrifice
👑 This one is prepared for Assyria's king
📖 Brimstone shaped later pictures of judgment
`.trim();

export const ISAIAH_THIRTY_PERSONAL_SECTIONS = parseIsaiahThirtyRawNotes(ISAIAH_THIRTY_RAW_NOTES);
