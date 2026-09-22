export type IsaiahThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahThirteenRawNotes(rawText: string): IsaiahThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 13:${startVerse}` : `Isaiah 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Isaiah 13 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_THIRTEEN_RAW_NOTES = `# Isaiah 13:1-3
# ⚔️ The Burden Of Babylon
---
## 📜 The Burden Of Babylon

"Burden" here does not mean a heavy load to carry.

It means a message God laid on the prophet to deliver.

Nearly every prophet used this word for a hard message of judgment.

Babylon was not yet the great world power it later became.

Assyria still ruled the region when Isaiah wrote this.

📜 Burden means a message not a weight

⚖️ It always carries judgment

🏛️ Babylon was not yet a world power

📖 Isaiah names its future collapse ahead of time

## 👤 Which Isaiah The Son Of Amoz Did See

Isaiah is identified here by his father's name, Amoz.

This Amoz is not the same person as the prophet Amos.

The two names look alike in English but come from different Hebrew roots.

"Did see" means Isaiah received this message as a vision, not just words.

Prophets often described receiving God's message the way a person describes watching a scene.

👤 Amoz was Isaiah's father

🚫 Amoz is not the prophet Amos

👁️ To see means a received vision

📖 Isaiah described it as a vision

## 🚩 Lift Ye Up A Banner Upon The High Mountain

A banner was a raised signal used to call an army together.

Armies had no radios or phones, so a visible signal did the work.

Raising it on a high mountain let it be seen from a great distance.

This command tells the invading army where to rally before the attack.

🚩 A banner signaled a call to gather

⛰️ High ground made it visible far away

📯 It rallied an army before battle

📖 This is the Medes being called toward Babylon

## 📢 Exalt The Voice Unto Them, Shake The Hand

Raising the voice meant shouting loud enough to be heard at a distance.

Shaking the hand describes waving or beckoning as another visible signal.

Together these two actions called scattered troops toward one meeting point.

Ancient armies gathered from many directions, so more than one signal was needed.

📢 Exalt the voice means shout loudly

✋ Shake the hand means beckon or wave

🪖 Both signals gathered scattered troops

📖 Scattered troops needed more than one signal

## 🚪 That They May Go Into The Gates Of The Nobles

The nobles were the ruling class inside the city of Babylon.

Their gates were the entrances into the wealthiest, most guarded parts of the city.

Breaking through those gates meant the city's leadership had fallen.

The invasion was aimed straight at the seat of power, not just the outskirts.

🏛️ Nobles were Babylon's ruling class

🚪 Their gates guarded the city's power center

👑 Breaking through meant the leaders had fallen

📖 The attack targeted power, not just territory

## 🎯 I Have Commanded My Sanctified Ones

This does not mean the invading army was holy or morally good.

"Sanctified" here means set apart for a specific purpose God chose.

God is speaking of Babylon's enemies, the Medes, as His own instrument.

A pagan army can still be set apart by God for a single task.

🎯 Sanctified means set apart for a purpose

🚫 It does not mean morally good

⚔️ God is speaking of Babylon's enemies

📖 Even a pagan army serves God's plan

## 🔥 I Have Also Called My Mighty Ones For Mine Anger

God claims direct ownership over the army about to destroy Babylon.

"For mine anger" means this invasion carries out God's own judgment.

The soldiers marching against Babylon do not know they serve this purpose.

Nations who never worship God can still be tools in His hand.

👑 God claims this army as His own

🔥 Mine anger names the reason for battle

🙈 The soldiers do not know their true purpose

📖 God uses nations that do not know Him

## 💪 Even Them That Rejoice In My Highness

These soldiers take pride in their own strength and coming victory.

They rejoice in their own greatness, not in worship of God.

Yet the verse says they rejoice in "my highness," God's greatness.

Their pride becomes part of a plan far bigger than they realize.

💪 The soldiers take pride in their strength

😤 Their pride is not worship of God

🎯 God still uses that pride for His plan

📖 Even pride can serve a bigger plan

# Isaiah 13:4-5
# 📯 The LORD Musters An Army
---
## 🔊 The Noise Of A Multitude In The Mountains

This describes the sound of a massive army gathering in the hills.

Mountains carried and amplified sound across long distances in the ancient world.

Anyone nearby would hear this army long before they saw it.

The noise itself becomes a warning of what is coming.

🔊 Multitude means a massive gathered army

⛰️ Mountains carried the sound for miles

👂 The army is heard before it is seen

📖 The sound itself is a warning

## 🤝 The Kingdoms Of Nations Gathered Together

This is not one nation attacking Babylon alone.

It describes a coalition, several kingdoms joining together for this campaign.

History later confirms this detail exactly, since the Medes fought alongside the Persians.

One single empire could not have matched Babylon's strength by itself.

🤝 This is a coalition of nations

⚔️ Not one kingdom, but several together

🌍 History later confirms this exact detail

📖 It took a coalition to bring Babylon down

## 👑 The LORD Of Hosts Mustereth The Host Of The Battle

"LORD of hosts" is a title meaning commander over heaven's armies.

"Mustereth" means calling up and organizing troops before a fight.

This human army answers to earthly kings, but it is under God's command.

Even the most powerful army on earth still answers to a higher authority.

👑 LORD of hosts means commander of heaven's armies

📋 Mustereth means calling troops together

🪖 This army looks human but answers to God

📖 Every army still answers to a higher authority

## 🗺️ They Come From A Far Country, From The End Of Heaven

This army is the Medes, coming from the region east of Babylon.

"The end of heaven" is a poetic way of saying as far as the eye can see.

It does not describe a literal edge of the sky.

The phrase stresses distance, a faraway people brought in to strike close to home.

🗺️ They refers to the Medes

🧭 They came from east of Babylon

👁️ End of heaven means the far horizon

📖 A faraway people strikes close to home

## 🔥 Even The LORD, And The Weapons Of His Indignation

"Indignation" means righteous anger, anger aimed at real wrongdoing.

The army is called God's own weapon, not just His permission.

God is not watching from a distance while this invasion happens.

He is described as personally wielding it.

🔥 Indignation means righteous anger

🗡️ The army is called God's weapon

👁️ God is not distant from this event

📖 He is described as directing it Himself

## 🗺️ To Destroy The Whole Land

"The whole land" means the entire Babylonian empire, not only its capital city.

Babylon ruled a large territory stretching well beyond one city's walls.

This judgment reaches every place under Babylon's control.

The fall about to be described is total, not partial.

🗺️ The whole land means the entire empire

🏛️ Babylon's rule reached beyond one city

💥 This judgment is total, not partial

📖 Nothing under Babylon's control is spared

# Isaiah 13:6-8
# 😱 The Day Of The LORD Is At Hand
---
## 😭 Howl Ye

"Howl" means a loud, uncontrolled cry of grief or terror.

It is not quiet sadness or a single tear.

The prophets used this word to describe a whole community wailing together.

This is the sound of people who know disaster has arrived.

😭 Howl means loud uncontrolled crying

👥 It describes a whole community

⚠️ It signals disaster has arrived

📖 This grief is heard, not just felt

## 📅 For The Day Of The LORD Is At Hand

"The Day of the LORD" is a phrase used throughout the prophets.

It names a specific moment when God steps in to judge or to save.

It is not a normal calendar day, but any decisive act of God in history.

Babylon's fall is one specific "Day of the LORD" among several in scripture.

📅 It names God's decisive action

⚖️ It can mean judgment or salvation

🔁 It happens more than once in scripture

📖 Babylon's fall is one of those days

## 💪 It Shall Come As A Destruction From The Almighty

"Almighty" is a name for God that emphasizes total, unmatched power.

Calling this destruction from the Almighty removes any doubt about who causes it.

No army, however strong, acts outside of that power.

The coming disaster is described as fully within God's control.

💪 Almighty emphasizes total power

🎯 This destruction is credited to God directly

🪖 No army acts outside His control

📖 The disaster is fully in God's hands

## ✋ All Hands Shall Be Faint, And Every Man's Heart Shall Melt

"Faint" hands means strength drains out of the body from fear.

"Heart shall melt" means courage disappears completely, not just weakens.

These are physical descriptions of real terror, not just poetic language.

Whole crowds are pictured losing the ability to act or resist.

✋ Faint hands means strength drains away

💧 Heart melts means courage disappears

😨 This describes real physical terror

📖 Whole crowds lose the ability to resist

## ⚡ Pangs And Sorrows Shall Take Hold Of Them

"Pangs" describes sudden, sharp physical pain, not a dull ache.

"Sorrows" pairs that physical pain with deep emotional grief.

Both hit at once, with no warning and no way to prepare.

The verse pictures this fear striking the whole population together.

⚡ Pangs means sudden sharp pain

😢 Sorrows adds deep grief to that pain

⏱️ Both arrive with no warning

📖 The whole population feels it together

## 👶 They Shall Be In Pain As A Woman That Travaileth

"Travaileth" means going through labor and childbirth.

The prophets often compared sudden disaster to labor pains.

Labor pain arrives without warning and cannot be stopped once it starts.

That same helplessness describes Babylon facing this coming judgment.

👶 Travaileth means labor and childbirth

⏰ Labor pain arrives without warning

🚫 It cannot be stopped once started

📖 Babylon faces judgment the same way

## 🔥 Their Faces Shall Be As Flames

This does not mean their faces caught fire.

It describes faces flushed red from fear and anguish.

Ancient writers often compared strong emotion to the color and heat of fire.

The picture is of terror so intense it shows on every face at once.

🔥 Flames pictures faces flushed with fear

🚫 It is not a literal fire

😨 It describes visible intense terror

📖 Every face shows the same fear at once

# Isaiah 13:9-11
# 🌑 A Day Of Cosmic Judgment
---
## ⚖️ The Day Of The LORD Cometh, Cruel Both With Wrath And Fierce Anger

"Cruel" here does not mean unfair or without cause.

It means severe, matching the weight of what it is judging.

"Wrath" and "fierce anger" both describe God's settled response to real sin.

This is not a random outburst, but a deserved and measured judgment.

⚖️ Cruel here means severe, not unfair

🔥 Wrath and anger describe a settled response

🎯 The judgment answers real sin

📖 It is deserved, not random

## 🏚️ To Lay The Land Desolate

"Desolate" means emptied out, left with no one living there.

This is stronger than simply damaged or defeated.

A desolate land is abandoned completely, not rebuilt right away.

Later verses describe exactly how long this emptiness would last.

🏚️ Desolate means completely emptied out

💥 It is stronger than merely damaged

🚷 A desolate land is left abandoned

📖 Later verses describe how long this lasted

## 🎯 He Shall Destroy The Sinners Thereof Out Of It

This judgment is aimed at specific wrongdoing, not chosen at random.

"Sinners thereof" points to Babylon's own guilt, named earlier in Isaiah.

God's judgments in scripture are consistently tied to a stated reason.

Nothing here happens simply because Babylon was powerful.

🎯 Sinners thereof names Babylon's own guilt

🚫 It is not random destruction

⚖️ Power alone is never the reason

📖 Judgment always answers a real cause

## 🌌 The Stars Of Heaven And The Constellations Thereof Shall Not Give Their Light

This is not a literal astronomy report about the sky going dark.

Prophets used cosmic imagery like this to describe total upheaval on earth.

The same picture appears later in Joel and in the Gospels.

Darkened stars mean the world as Babylon knew it was ending.

🌌 This is not literal astronomy

🌍 It pictures total upheaval on earth

🔁 The same image appears in Joel

📖 Babylon's world was ending

## ☀️ The Sun Shall Be Darkened In His Going Forth, And The Moon Shall Not Cause Her Light To Shine

Sun and moon going dark completes the same cosmic picture as the stars.

Together they describe every source of light failing at once.

In the ancient world, light and order were closely connected ideas.

A world without light pictured a world without order or stability.

☀️ Sun and moon complete the same picture

🌑 Every light source fails at once

🔗 Light and order were connected ideas

📖 No light meant no stability left

## 🌍 I Will Punish The World For Their Evil, And The Wicked For Their Iniquity

God's judgment on Babylon is tied directly to their own evil actions.

"The world" widens this beyond Babylon alone to every nation acting the same way.

"Iniquity" means guilt for wrongdoing, not simply bad luck.

Babylon becomes one example of a pattern God applies everywhere.

🌍 The world widens judgment beyond Babylon

⚖️ Punish ties directly to real evil

📖 Iniquity means real guilt, not bad luck

➡️ Babylon becomes one example of a wider pattern

## 😤 I Will Cause The Arrogancy Of The Proud To Cease, And Will Lay Low The Haughtiness Of The Terrible

"Arrogancy" and "haughtiness" both describe pride that looks down on others.

"The terrible" here means those who terrify others through violent power.

Babylon was famous for both its pride and its brutal conquests.

God specifically targets the pride behind the power, not only the power itself.

😤 Arrogancy and haughtiness both mean prideful looking down

⚔️ The terrible means those who rule by fear

🏛️ Babylon was known for both traits

📖 God targets the pride behind the power

# Isaiah 13:12-14
# 👤 Rarer Than Gold
---
## 💰 I Will Make A Man More Precious Than Fine Gold

After this judgment, so few people will be left alive in Babylon.

A single surviving person becomes rare, valued the way gold is valued.

This is not a promise of reward, but a picture of how few survive.

Scarcity, not honor, is what makes the person "precious" here.

💰 Fine gold pictures extreme value

📉 It shows how few people survive

🚫 This pictures loss, not reward

📖 Scarcity, not honor, makes the person precious

## 🗺️ Even A Man Than The Golden Wedge Of Ophir

Ophir was a distant region famous across the ancient world for its fine gold.

Solomon's own gold, mentioned elsewhere in scripture, came from this same source.

A "golden wedge" was a shaped ingot, a solid block of pure gold.

Naming Ophir specifically told the original reader this meant the very best gold known.

🗺️ Ophir was a region famous for gold

👑 Solomon's gold came from this same place

🧱 A wedge means a solid ingot

📖 This named the best gold anyone knew

## 🌍 Therefore I Will Shake The Heavens, And The Earth Shall Remove Out Of Her Place

This does not describe a literal earthquake or the planet moving in space.

It is the same cosmic upheaval language used earlier in this chapter.

Shaking the heavens and earth pictures a total collapse of the existing order.

The most stable things a person can imagine are described as giving way.

🌍 This is not a literal earthquake

🔁 It repeats the cosmic imagery from earlier

💥 It pictures a total collapse of order

📖 Even the most stable things give way

## 🔁 In The Wrath Of The LORD Of Hosts, And In The Day Of His Fierce Anger

This phrase repeats language already used twice earlier in the chapter.

The repetition is intentional, driving home who is truly responsible.

Every image of collapse in this chapter traces back to this same cause.

Nothing about Babylon's fall happens outside of God's own timing.

🔁 This phrase repeats earlier language on purpose

🎯 It points back to the true cause

⏰ Nothing here happens outside God's timing

📖 Every collapse in this chapter traces to Him

## 🦌 It Shall Be As The Chased Roe, And As A Sheep That No Man Taketh Up

A "roe" is a small wild deer, quick and easily startled.

A chased roe runs in panic with no clear direction.

A sheep that "no man taketh up" describes one lost with no shepherd to rescue it.

Both pictures describe total panic once every normal protection disappears.

🦌 A roe is a small wild deer

🏃 A chased roe runs in panic

🐑 A lost sheep has no shepherd

📖 Both pictures describe total panic

## 🌍 They Shall Every Man Turn To His Own People, And Flee Every One Into His Own Land

Babylon was a vast empire filled with people from many different nations.

When the city fell, those foreigners would not stay and defend it.

Each one would run back toward their own home country instead.

A city built on conquered peoples could not count on their loyalty in a crisis.

🌍 Babylon held people from many nations

🏃 They would not stay to defend the city

🏠 Each fled back to their own homeland

📖 Conquered peoples were never truly loyal

# Isaiah 13:15-18
# 🗡️ No Pity In The Conquest
---
## ⚔️ Every One That Is Found Shall Be Thrust Through

This describes total conquest, with no safe place left to hide.

"Thrust through" means struck down by a weapon, not merely captured.

Ancient warfare rarely spared a defeated population, especially a capital city.

This verse states plainly how complete the coming fall would be.

⚔️ Thrust through means struck down by weapon

🚫 No safe place is left to hide

🏙️ Capital cities were rarely spared in war

📖 The coming fall is described as complete

## 🤝 Every One That Is Joined Unto Them Shall Fall By The Sword

"Joined unto them" points to Babylon's allies, not only its own citizens.

Nations that sided with Babylon shared in its defeat.

Choosing an alliance in the ancient world carried real, lasting risk.

Standing with a falling power meant falling alongside it.

🤝 Joined unto them means Babylon's allies

⚔️ Allies shared in the same defeat

⚖️ Alliances carried real risk in war

📖 Standing with a falling power meant falling too

## 😢 Their Children Also Shall Be Dashed To Pieces Before Their Eyes

This is one of the hardest verses in the chapter to read.

Ending a defeated people's next generation was a real, recorded practice in ancient warfare.

Conquerors did this specifically so a defeated nation could never rise again.

Isaiah is not inventing horror here, he is naming what conquest actually looked like.

😢 This describes a real ancient war practice

🎯 It aimed to prevent any future uprising

📜 Isaiah names history, not invented horror

📖 The prophecy is unflinching about war's true cost

## 🏚️ Their Houses Shall Be Spoiled, And Their Wives Ravished

"Spoiled" means looted and stripped of everything valuable.

This verse pictures total wartime devastation, not selective punishment.

Every part of ordinary life, home and family, is touched by this judgment.

Nothing about Babylon's coming defeat is described as partial.

🏚️ Spoiled means looted completely

💥 This is total devastation, not selective

🏠 Even ordinary homes and families are touched

📖 Nothing about this fall is partial

## 🗺️ Behold, I Will Stir Up The Medes Against Them

The Medes were a people from the region now known as Iran.

Isaiah wrote this more than a century before it actually happened.

The Medes and Persians together conquered Babylon in the year 539 BC.

Naming the exact people who would do this made the prophecy specific, not vague.

🗺️ The Medes came from ancient Iran

⏳ Isaiah wrote this over a century early

🏛️ Medes and Persians conquered Babylon in 539 BC

📖 The prophecy named the exact people involved

## 💰 Which Shall Not Regard Silver, And As For Gold, They Shall Not Delight In It

This does not mean the Medes had no interest in wealth at all.

Most ancient conquerors could be bribed or slowed down by riches.

This verse says that will not work on this particular army.

Their purpose here was conquest itself, not a payday.

💰 Most conquerors could be bribed with riches

🚫 This army could not be bought off

🎯 Their purpose was conquest, not wealth

📖 God's tool for judgment could not be bought

## 🏹 Their Bows Also Shall Dash The Young Men To Pieces

Archers were a major part of ancient Near Eastern armies.

"Dash to pieces" describes the brutal, close reality of ancient battle.

Young men of fighting age were the first targeted in any conquest.

The verse names the specific weapon to show how thorough this defeat would be.

🏹 Bows were a major ancient weapon

⚔️ Young men were targeted first in war

💥 Dash to pieces shows the brutality of battle

📖 Naming the weapon makes the defeat specific

## 👶 They Shall Have No Pity On The Fruit Of The Womb, Their Eye Shall Not Spare Children

"Fruit of the womb" is a KJV phrase for unborn or newborn children.

"Their eye shall not spare" means they would show no mercy at all.

This finishes the picture of a conquest with absolutely no exceptions.

The chapter does not soften how severe this judgment on Babylon would be.

👶 Fruit of the womb means unborn children

🚫 No pity means total mercilessness

💥 This finishes the picture of total conquest

📖 The judgment on Babylon is not softened

# Isaiah 13:19-22
# 🏚️ Babylon Never Inhabited Again
---
## 🏛️ Babylon, The Glory Of Kingdoms, The Beauty Of The Chaldees' Excellency

At its height, Babylon was the most magnificent city in the ancient world.

It was known for massive walls, grand temples, and famous hanging gardens.

"Chaldees" names the ruling people of Babylon during this period.

Isaiah predicts the fall of a city at the very top of its glory, not a weak one.

🏛️ Babylon was the most magnificent ancient city

🧱 It was famous for its massive walls

👑 Chaldees names Babylon's ruling people

📖 This city falls at its height

## 🔥 Shall Be As When God Overthrew Sodom And Gomorrah

Sodom and Gomorrah were cities destroyed suddenly and completely in the book of Genesis.

That destruction became the Bible's clearest picture of total, final judgment.

Comparing Babylon's fall to Sodom means this was not a slow decline.

It points to something sudden, complete, and directly caused by God.

🔥 Sodom and Gomorrah were destroyed in Genesis

⚖️ That event became a picture of total judgment

⚡ This comparison means a sudden fall

📖 God is named as the direct cause

## 🏙️ It Shall Never Be Inhabited, Neither Shall It Be Dwelt In From Generation To Generation

Ancient cities were almost always rebuilt and reoccupied after they fell.

This verse predicts something far more unusual, permanent abandonment.

Archaeology today confirms the site of ancient Babylon still sits unoccupied.

Few prophecies in scripture can be checked this directly against history.

🏙️ Ancient cities were usually rebuilt after falling

🚫 This predicts permanent abandonment instead

🏺 Archaeology confirms the site remains unoccupied

📖 This prophecy can be checked against history

## ⛺ Neither Shall The Arabian Pitch Tent There, Neither Shall The Shepherds Make Their Fold There

Nomadic Arabian travelers regularly camped among the ruins of fallen cities.

Shepherds also commonly used old ruins as shelter for their flocks.

This verse says not even those temporary visitors would use this site.

The emptiness described here goes beyond what any normal ruin experienced.

⛺ Arabians often camped in old ruins

🐑 Shepherds often sheltered flocks in ruins

🚫 Neither would use this particular site

📖 This emptiness goes beyond a normal ruin

## 🏜️ But Wild Beasts Of The Desert Shall Lie There

Where a busy, wealthy city once stood, only desert animals would remain.

This is a stark reversal, palaces replaced by animal dens.

The image marks a permanent shift from human civilization back to wilderness.

Nothing about Babylon's former glory survives in this picture.

🏜️ Only desert animals remain in the ruins

🔄 Palaces reversed into animal dens

🌾 Civilization gives way to wilderness

📖 Nothing of Babylon's glory survives here

## 🐾 Their Houses Shall Be Full Of Doleful Creatures

"Doleful creatures" means mournful, wailing animals, likely jackals or hyenas.

Their cries were often compared to human mourning sounds.

A house built for family life is now filled with these haunting sounds instead.

The picture is of a place too empty and eerie for anyone to live in.

🐾 Doleful creatures means mournful wailing animals

👂 Their cries sounded like human mourning

🏠 Family homes are filled with these sounds instead

📖 The site becomes too eerie to inhabit

## 🦉 And Owls Shall Dwell There, And Satyrs Shall Dance There

Owls were associated in the ancient world with desolate, abandoned places.

"Satyrs" translates a Hebrew word that likely meant wild goats.

Some ancient readers may have connected that same word to folklore about wilderness spirits.

Either reading points to the same thing, a site given fully back to the wild.

🦉 Owls marked desolate abandoned places

🐐 Satyrs likely meant wild goats

📜 Some connected the word to wilderness folklore

📖 Either way the site returns to the wild

## 🏝️ The Wild Beasts Of The Islands Shall Cry In Their Desolate Houses

"Islands" here is a broad term for distant coastlands, not literal islands only.

Animals from far off regions are pictured filling Babylon's empty houses.

"Desolate houses" reminds the reader these were once full of ordinary daily life.

The distance the animals travel underlines how totally abandoned this city becomes.

🏝️ Islands means distant coastlands broadly

🐾 Animals from far away fill the empty houses

🏠 These houses once held ordinary daily life

📖 The distance shows how total the emptiness is

## 🐺 And Dragons In Their Pleasant Palaces

"Dragons" here translates a Hebrew word most likely meaning jackals.

It does not mean a mythical fire breathing creature.

"Pleasant palaces" recalls the glory described back in verse 19.

The contrast between past splendor and coming ruin drives the point home.

🐺 Dragons likely meant jackals, not myths

🏰 Pleasant palaces recalls the glory of verse 19

⚖️ Splendor and ruin sit side by side

📖 The contrast drives the point home

## ⏳ Her Time Is Near To Come, And Her Days Shall Not Be Prolonged

Babylon still stood strong and proud in Isaiah's own lifetime.

Nothing about this judgment felt urgent to the people living then.

This closing line insists the timeline was already fixed and certain.

Babylon's fall would not be delayed just because it looked distant.

🏛️ Babylon still stood strong in Isaiah's day

⏳ Nothing felt urgent to people then

📅 The timeline was already fixed

📖 Distance did not mean delay
`.trim();

export const ISAIAH_THIRTEEN_PERSONAL_SECTIONS = parseIsaiahThirteenRawNotes(ISAIAH_THIRTEEN_RAW_NOTES);
