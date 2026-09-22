export type IsaiahFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFourteenRawNotes(rawText: string): IsaiahFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 14:${startVerse}` : `Isaiah 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Isaiah 14 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FOURTEEN_RAW_NOTES = `# Isaiah 14:1-4
# 🕊️ Israel Restored, The Taunt Begins
---
## 🕊️ Will Have Mercy On Jacob, And Will Yet Choose Israel

"Mercy" here means God choosing to act kindly even though Israel did not earn it.

Jacob and Israel are the same nation, named after the same man's two names.

This promise comes right after Isaiah pictured Babylon's total destruction in chapter thirteen.

God follows judgment on Israel's enemy with comfort for Israel.

🕊️ Mercy means kindness Israel did not earn
👤 Jacob and Israel name the same nation
⚖️ Judgment on Babylon pairs with Israel's comfort
📖 God promises a homeland, not only forgiveness

## 🌍 The Strangers Shall Be Joined With Them

"Strangers" here means people who were not born Israelite.

This verse pictures outsiders choosing to join God's people on purpose.

It does not mean foreign enemies forcing their way in by conquest.

Other nations attach themselves willingly to Israel's future here.

🌍 Strangers means people not born Israelite
🤝 They join God's people willingly
🚫 This is not a forced conquest
📖 The promise widens beyond one bloodline

## 🙌 For Servants And Handmaids

This does not describe Israel becoming cruel masters over their former captors.

"Servants and handmaids" pictures a full reversal of the roles from the exile years.

The nations that once ruled Israel now serve in Israel's household instead.

Isaiah is describing a complete turnaround, not revenge for its own sake.

🙌 A full reversal of the exile years
🔄 Former rulers now serve instead
🏠 The reversal happens inside Israel's household
📖 This pictures turnaround, not revenge

## 👑 They Shall Rule Over Their Oppressors

"Oppressors" names the very nations that had crushed Israel under captivity.

This verse promises that relationship would flip completely.

The ones who once gave the orders would now take them.

Isaiah roots this promise in what God does, not in Israel's own strength.

👑 Oppressors are the nations that crushed Israel
🔄 The relationship flips completely
🗣️ Former rulers now take orders
📖 God causes the reversal, not Israel's strength

## 😔 Rest From Thy Sorrow, And From Thy Fear

"Rest" here means the sorrow and fear finally stop, not just ease up for a while.

Israel's exile had brought both grief over what was lost and constant fear of their captors.

This verse promises an end to both at the same time.

God addresses the emotional weight of captivity, not only its physical hardship.

😔 Rest means sorrow and fear finally stop
💔 Exile brought both grief and constant fear
🤝 Both end together in this promise
📖 God addresses emotional weight, not just hardship

## ⛓️ The Hard Bondage Wherein Thou Wast Made To Serve

"Bondage" means forced labor under a master with no freedom to leave.

"Wherein thou wast made to serve" stresses that Israel did not choose this life.

Calling it "hard" specifically marks this as unusually harsh treatment, not ordinary service.

This phrase names exactly what the coming rest would replace.

⛓️ Bondage means forced labor with no freedom
🚫 Israel did not choose this life
😣 Hard marks unusually harsh treatment
📖 This names what the promised rest replaces

## 📜 Take Up This Proverb Against The King Of Babylon

A "proverb" here means a taunting poem meant to be repeated and remembered.

Israel itself is told to compose and recite this mocking song, not just hear it.

This turns former victims into the ones who get the final word.

The rest of this chapter is that very proverb, spoken directly at Babylon's king.

📜 Proverb means a taunting, memorable poem
🗣️ Israel is told to speak it themselves
🔄 Former victims get the final word
📖 The rest of the chapter is that poem

## 🌇 The Golden City Ceased

"The golden city" pictures Babylon's legendary wealth and shining reputation.

"Ceased" means that wealth and reputation simply stopped, ended for good.

This short phrase opens the taunt with the biggest possible contrast, glory to nothing.

Everything that follows in the chapter explains exactly how that ending happened.

🌇 Golden city pictures Babylon's legendary wealth
🛑 Ceased means it simply stopped for good
⚖️ This opens the taunt with a sharp contrast
📖 The rest of the chapter explains how

# Isaiah 14:5-8
# 🌳 Creation Rejoices At Babylon's Fall
---
## 🪄 The Staff Of The Wicked

A "staff" here pictures a ruler's power to command and control others.

Breaking it means the wicked ruler's authority is taken away completely.

Babylon's king had used that authority to crush nations for years.

This verse says that power finally comes to an end.

🪄 Staff pictures a ruler's authority
💥 Breaking it ends that authority
🏛️ Babylon's king had ruled by force
📖 That power finally runs out

## 👑 The Sceptre Of The Rulers

A "sceptre" was a ceremonial rod that ancient kings carried as a sign of royal power.

Pairing staff and sceptre together doubles the emphasis on total collapse.

Both were everyday symbols any ancient reader would recognize instantly.

Losing both meant losing every mark of ruling authority at once.

👑 Sceptre was a symbol of royal power
🤝 Staff and sceptre together double the point
👁️ Both were familiar royal symbols
📖 Losing both meant losing all authority

## ⚔️ Smote The People In Wrath With A Continual Stroke

"Smote" means struck down or attacked with real, repeated force.

"Continual stroke" pictures an ongoing pattern, not one single act of cruelty.

This describes Babylon's steady policy toward conquered peoples over many years.

Isaiah names the exact pattern being brought to an end.

⚔️ Smote means struck down with force
🔁 Continual stroke means ongoing cruelty
📆 This lasted years, not one moment
📖 Isaiah names the pattern ending now

## 🕊️ Is Persecuted, And None Hindereth

This describes the coming invasion of Babylon that no one can stop.

"None hindereth" means nobody left has the power to interfere or defend.

The same nation that once crushed others without opposition now faces the same fate.

The very cruelty Babylon dealt out returns to it unstopped.

🕊️ Babylon's invasion cannot be stopped
🚫 No one is left to defend it
🔁 Babylon faces its own former cruelty
📖 What was given returns unstopped

## 🌍 The Whole Earth Is At Rest, And Is Quiet

This describes relief spreading across every nation Babylon once threatened.

"At rest" means the constant fear of attack has finally lifted.

Isaiah pictures the whole world exhaling at once.

This is not only Israel's relief, it belongs to every nearby nation.

🌍 Relief spreads across every nation
😮‍💨 Constant fear has finally lifted
🌐 The whole world exhales together
📖 This relief reaches beyond Israel alone

## 🎶 They Break Forth Into Singing

Singing here pictures spontaneous, uncontainable relief after a long threat ends.

This is not a planned ceremony but a reaction nobody could hold back.

The image matches celebrations elsewhere in scripture after God delivers His people.

Fear had silenced the nations, and now that silence breaks into song.

🎶 Singing pictures spontaneous relief
🚫 It is not a planned ceremony
🔁 It matches other deliverance scenes in scripture
📖 Fear breaks into celebration

## 🌲 The Fir Trees Rejoice At Thee, And The Cedars Of Lebanon

Fir trees and cedars were prized timber, often cut down for royal building projects.

Babylon's kings regularly stripped forests like Lebanon's to build palaces and monuments.

Isaiah pictures the very trees celebrating the king's downfall.

Even the natural world suffered under that kind of relentless demand.

🌲 Fir trees and cedars were prized timber
🏛️ Babylon cut forests for building projects
🌳 The trees celebrate the king's fall
📖 Even nature suffered under his demand

## 🪓 No Feller Is Come Up Against Us

A "feller" is someone who cuts down trees for timber.

This line personifies the trees speaking with relief of their own.

With the king gone, no one comes to cut them down anymore.

The poetic picture underlines just how total this downfall really is.

🪓 Feller means someone who cuts trees
🌳 The trees speak with relief here
🛑 No one comes to cut them now
📖 Even poetry shows how total the fall is

# Isaiah 14:9-11
# 💀 Sheol Stirs To Meet The King
---
## 🕳️ Hell From Beneath Is Moved For Thee To Meet Thee At Thy Coming

"Hell" here translates the Hebrew word Sheol, the realm of the dead.

It does not describe the place of eternal punishment the way later scripture uses the word.

Isaiah pictures Sheol itself reacting, almost like a host preparing for an arriving guest.

This dramatic scene shows how significant this king's death was seen to be.

🕳️ Hell translates the Hebrew word Sheol
📖 Sheol means the realm of the dead
🎭 Isaiah pictures it reacting like a host
➡️ This shows how significant the death was

## 👻 It Stirreth Up The Dead For Thee, Even All The Chief Ones Of The Earth

"The dead" pictures former kings and rulers already in Sheol.

"Chief ones of the earth" names other rulers who had already died before him.

Isaiah imagines them stirring, almost standing up in shock at this arrival.

The scene treats death as a kind of royal gathering place.

👻 The dead means former kings already there
👑 Chief ones names other rulers who died first
😮 They stir in shock at the arrival
📖 Death is pictured as a royal gathering

## 🪑 Raised Up From Their Thrones All The Kings Of The Nations

This pictures dead kings rising from thrones they no longer truly hold.

It is a poetic scene, not a literal description of the afterlife's furniture.

The point is that even in death, rank and memory of rule remain vivid.

Every one of these kings gets up to react to this new arrival.

🪑 Kings rise from thrones in this vision
🎨 This is poetic, not literal furniture
👑 Rank and memory linger even in death
📖 Every dead king reacts to this arrival

## ❓ Art Thou Also Become Weak As We

This is the taunt the dead kings speak to the newly arrived king.

They mock him for becoming just as powerless as they already are.

In life he seemed unstoppable, and now he is no different from anyone else.

Death strips away every kind of earthly power completely.

❓ The dead kings mock the new arrival
💪 In life he seemed unstoppable
⚖️ Death makes him no different from them
📖 Earthly power cannot survive death

## 🎻 Thy Pomp Is Brought Down To The Grave, And The Noise Of Thy Viols

"Pomp" means the grand display and ceremony that surrounded this king's life.

A "viol" was a stringed instrument, part of royal court music and celebration.

Both the show of glory and its music are pictured ending together in the grave.

Everything that once announced his greatness now goes silent.

🎻 Pomp means grand royal display
🎼 A viol was a royal court instrument
🔇 Both glory and music end in the grave
📖 What announced greatness goes silent

## 🐛 The Worm Is Spread Under Thee, And The Worms Cover Thee

This is a blunt, physical picture of decay replacing royal luxury.

Where soft bedding once lay beneath a king, only worms remain.

The image strips away every trace of former glory on purpose.

Isaiah wants the reader to feel exactly how far this fall goes.

🐛 Worms replace a king's soft bedding
👑 Every trace of former glory is stripped
💀 This pictures total physical decay
📖 The fall is felt, not just stated

# Isaiah 14:12-15
# ⭐ How Art Thou Fallen, O Lucifer
---
## ⭐ How Art Thou Fallen From Heaven, O Lucifer

"Lucifer" translates a Hebrew phrase meaning shining one or day star.

It was a name for the bright morning star, not a proper name for a person.

Ancient kings were often compared to bright stars to describe their glory and pride.

This title pictures the king of Babylon at the height of dazzling splendor before his fall.

⭐ Lucifer means shining one or day star
🌟 It described the bright morning star
👑 Kings were often compared to stars
📖 This pictures glory right before a fall

## 🌅 Son Of The Morning

This phrase reinforces the same picture as Lucifer, tied to the rising dawn.

Ancient readers pictured this star blazing brightly, then fading fast as the sun rises.

The king's brief, brilliant rise mirrors that same fading star exactly.

Great power that shines does not always last.

🌅 Son of the morning matches Lucifer's image
🌄 The morning star fades fast at sunrise
👑 The king's rise mirrors that same fading
📖 Shining power does not always last

## 🌍 Which Didst Weaken The Nations

This line names exactly why this king's fall gets such a dramatic scene.

He had crushed and weakened nation after nation to build his empire.

The poem is not mourning a good ruler cut down unfairly.

It is celebrating the end of someone who caused real harm.

🌍 He weakened nation after nation
🏛️ His empire was built on conquest
🎭 This poem is not mourning a good king
📖 It celebrates real harm coming to an end

## 🌌 I Will Ascend Into Heaven

These are the words Isaiah puts in this king's own mouth, his private ambition.

"Ascend into heaven" means claiming a place above every other power on earth.

The king wanted to be seen as answerable to no one, not even God.

Pride like this is the real reason his fall gets told this way.

🌌 These are the king's own boasted words
👑 Ascend means claiming power above all others
🚫 He wanted to answer to no one
📖 Pride explains why this fall gets told

## 🌟 I Will Exalt My Throne Above The Stars Of God

"Stars of God" pictures the heavenly realm, the place of divine authority itself.

The king claims he would rule higher than even that.

This is not humility mistaken for confidence, it is open defiance of God.

No earthly ruler had ever stated ambition this bluntly before.

🌟 Stars of God pictures heaven's authority
👑 The king claims to rule above it
⚔️ This is open defiance, not confidence
📖 No ruler had claimed this so bluntly

## 🏔️ The Mount Of The Congregation, In The Sides Of The North

"The mount of the congregation" was where ancient peoples in this region believed their gods assembled.

"Sides of the north" points to that same mythical divine meeting place.

The king is claiming a seat among the gods themselves, not just among men.

This detail shows exactly how far his ambition had reached.

🏔️ This names where gods were thought to meet
🧭 Sides of the north points to that place
👑 The king claims a seat among the gods
📖 His ambition reached beyond any human throne

## ☁️ I Will Be Like The Most High

This is the clearest statement of the king's ambition in the entire passage.

"Most High" is a title for God alone throughout scripture.

The king does not merely want power, he wants to be seen as equal to God.

That single claim explains the severity of everything that follows.

☁️ This is the clearest boast in the passage
👑 Most High is a title for God alone
⚖️ He wants to be seen as God's equal
📖 This claim explains the severity that follows

## 🕳️ Thou Shalt Be Brought Down To Hell, To The Sides Of The Pit

This verse answers the boast directly, point for point.

He claimed the heights of heaven, and instead he is sent to the depths of Sheol.

"Sides of the pit" mirrors the earlier "sides of the north" on purpose.

The higher the claim, the lower the actual fall described here.

🕳️ This directly answers the earlier boast
⬇️ Heaven's height is traded for Sheol's depth
🔁 Sides of the pit echoes an earlier phrase
📖 The higher the claim, the lower the fall

# Isaiah 14:16-19
# 👀 No Burial For This King
---
## 👀 Narrowly Look Upon Thee

This pictures onlookers staring hard, straining to recognize the fallen king.

The one who once commanded fear now barely looks like himself.

His appearance in death does not match the terror he once caused in life.

People need a second, closer look just to believe it is really him.

👀 Onlookers strain to recognize him
😳 He barely looks like himself now
⚖️ His death does not match his old terror
📖 People need a second look to believe it

## 🌍 Made The Earth To Tremble, That Did Shake Kingdoms

This names the exact fear this king once caused across the region.

"Made the earth tremble" describes the terror nations felt at word of his approach.

"Shake kingdoms" adds that entire governments feared his power, not just individuals.

Onlookers cannot reconcile that memory with the broken figure now in front of them.

🌍 He once made whole regions tremble
🏛️ Entire kingdoms feared his approach
😨 This was widespread, not just personal fear
📖 That memory clashes with his broken end

## 🏜️ Made The World As A Wilderness, And Destroyed The Cities Thereof

This king's conquests left fertile, developed land stripped and ruined.

Cities that once thrived under other rulers were destroyed under his campaigns.

"Wilderness" pictures thriving places turned empty and unusable.

His empire grew by tearing down what other nations had built.

🏜️ Wilderness pictures once thriving land ruined
🏙️ Cities were destroyed under his campaigns
📉 His empire grew by tearing others down
📖 Growth built on destruction defines his legacy

## 🔓 Opened Not The House Of His Prisoners

Most ancient kings released some captives as a show of mercy at times.

This king is remembered as one who refused that kind of mercy completely.

His prisoners stayed locked away with no hope of release under his rule.

This detail marks him as unusually harsh, even by the standards of ancient warfare.

🔓 Kings sometimes released captives as mercy
🚫 This king refused that kind of mercy
🔒 His prisoners had no hope of release
📖 He was harsh even by ancient standards

## 👑 All The Kings Of The Nations Lie In Glory, Every One In His Own House

This describes the normal custom of honored royal burial in the ancient world.

Kings were expected to rest in their own tombs, surrounded by proper ceremony.

"Lie in glory" means being remembered with honor even after death.

Isaiah sets up a sharp contrast with what happens to this particular king next.

👑 Normal kings received honored burial
🏠 Each rested in his own tomb
🎖️ Lie in glory means being honored in death
📖 This sets up a sharp contrast ahead

## 🌿 Cast Out Of Thy Grave Like An Abominable Branch

"Abominable branch" pictures a rotten, broken limb thrown out and left to rot.

Unlike the honored kings in the verse before, this king gets no proper tomb.

His own body becomes something people would want to hide or discard.

The contrast with verse eighteen could not be sharper.

🌿 Abominable branch means a rotten discarded limb
🚫 He gets no honored tomb like other kings
🙈 His body becomes something to hide
📖 This contrast could not be sharper

## 🗡️ As The Raiment Of Those That Are Slain, Thrust Through With A Sword

This compares his body to the bloodied clothing stripped off soldiers killed in battle.

"Thrust through" describes a violent, common battlefield death, not a peaceful one.

A king who once commanded armies is pictured dying like an ordinary fallen soldier.

Every trace of royal dignity has been stripped from this scene.

🗡️ His body is compared to bloodied battle clothing
⚔️ Thrust through describes a violent death
👑 A king dies like an ordinary soldier
📖 Royal dignity is completely stripped away

## 🐾 As A Carcase Trodden Under Feet

"Carcase" means a dead body, treated here with no more respect than an animal's.

Being trampled underfoot was considered one of the worst possible fates for a body.

This finishes the picture of total disgrace begun back in verse nineteen.

The king who claimed a throne among the stars ends trampled in the dirt.

🐾 Carcase means a dead body, shown no respect
👣 Being trampled was a fate of total disgrace
🔁 This finishes the disgrace from verse nineteen
📖 The starward claim ends trampled in dirt

# Isaiah 14:20-23
# 🏚️ Babylon Wiped From The Earth
---
## ⚰️ Not Be Joined With Them In Burial

This king is denied even a place among other disgraced or defeated rulers.

He stands alone in shame, not even sharing that with anyone else.

"Because thou hast destroyed thy land" names the direct reason for this judgment.

His own actions against his own people are cited as the cause.

⚰️ He is denied burial with other rulers
😔 He stands alone even in disgrace
🎯 His own destroyed land is the stated reason
📖 His own actions caused this judgment

## 🌱 The Seed Of Evildoers Shall Never Be Renowned

"Seed" here means descendants, the next generation carrying on a family's name.

"Renowned" means remembered with honor or lasting fame.

This verse promises his family line would not be remembered well, or perhaps not survive at all.

A king who sought glory among the stars leaves behind no lasting honored name.

🌱 Seed means descendants, the next generation
🏆 Renowned means remembered with honor
🚫 His family line gets no lasting honor
📖 His search for glory leaves nothing behind

## 👶 Prepare Slaughter For His Children For The Iniquity Of Their Fathers

This is one of the harshest lines in the chapter to read plainly.

Ancient conquerors often targeted a defeated ruler's children to prevent any future uprising.

"Iniquity of their fathers" names the reason stated, not random cruelty.

Isaiah is naming a real practice of ancient warfare, not inventing extra horror.

👶 A harsh but real ancient war practice
🎯 Aimed to prevent any future uprising
📜 Iniquity of their fathers names the stated reason
📖 Isaiah names history, not invented horror

## 🏙️ Nor Fill The Face Of The World With Cities

This king's dynasty had built city after city to expand its empire.

This verse promises that expansion would stop completely with his line.

No future generation from this family would keep building outward.

His ambition to fill the world with his name comes to a full stop.

🏙️ His dynasty built cities to expand
🛑 This promises that expansion stops completely
🚫 No heir continues building outward
📖 His ambition to fill the world halts

## ⚔️ I Will Rise Up Against Them, Saith The LORD Of Hosts

God speaks directly here, naming Himself as the one acting against Babylon.

"LORD of hosts" is a title for God as commander over heaven's armies.

This is not framed as one nation defeating another through luck or skill alone.

Isaiah insists the true cause behind Babylon's fall is God Himself.

⚔️ God names Himself as the one acting
👑 LORD of hosts means commander of heaven's armies
🚫 This is not framed as luck or skill
📖 God is named as the true cause

## ✂️ Cut Off From Babylon The Name, And Remnant, And Son, And Nephew

This lists four different ways a family or nation could survive into the future.

"Name" means reputation, "remnant" means survivors, and "son and nephew" mean direct heirs.

Listing all four together promises total, not partial, removal from history.

Nothing about Babylon's royal line would carry forward afterward.

✂️ Four different ways families usually survive
📛 Name means reputation, remnant means survivors
👨‍👦 Son and nephew mean direct heirs
📖 All four together promise total removal

## 🐦 A Possession For The Bittern, And Pools Of Water

A "bittern" is a marsh bird that nests in swampy, abandoned wetlands.

This pictures Babylon's dry, developed land turning back into unusable swamp.

A once great city becomes fit only for birds and standing water.

The image reverses everything human effort had built there.

🐦 A bittern is a marsh dwelling bird
💧 Dry developed land turns back to swamp
🏙️ A great city becomes fit only for birds
📖 Human effort here gets fully reversed

## 🧹 I Will Sweep It With The Besom Of Destruction

A "besom" is an old word for a broom made of bundled sticks.

This pictures God clearing Babylon away completely, the way a broom clears a floor.

The image is simple on purpose, total and thorough removal, nothing left behind.

Even a common household object becomes a picture of God's total judgment.

🧹 A besom is an old word for broom
🧽 God clears Babylon like a swept floor
💯 The picture is total, nothing left behind
📖 Even a broom pictures God's judgment

# Isaiah 14:24-27
# ✋ The LORD's Purpose Against Assyria
---
## 🤞 The LORD Of Hosts Hath Sworn

Taking an oath in scripture makes a promise unbreakable and final.

God swearing here means this outcome is not left open to change.

This shifts the passage from Babylon specifically to a wider warning about Assyria.

Both empires face the same unstoppable, sworn purpose of God.

🤞 An oath makes a promise unbreakable
🔒 God swearing means this cannot be changed
🔄 The focus shifts from Babylon to Assyria
📖 Both empires face the same sworn purpose

## 📐 As I Have Purposed, So Shall It Stand

"Purposed" means planned deliberately, not decided on a whim.

This verse insists God's plans do not get derailed by human power or resistance.

Assyria was, at the time Isaiah wrote, a far bigger threat than Babylon.

Naming Assyria's coming defeat this early shows God's plan reaching far into the future.

📐 Purposed means planned deliberately
🚫 God's plans do not get derailed
🏛️ Assyria was the bigger threat in Isaiah's day
📖 God's plan reached far into the future

## 💪 Break The Assyrian In My Land

"My land" names Israel itself as the specific place this defeat happens.

Assyria was the dominant empire threatening Israel throughout much of Isaiah's ministry.

This promises that Assyria's power would break specifically on Israel's own ground.

The invader would not simply retreat, but suffer defeat where it tried to conquer.

💪 My land means Israel's own territory
🏛️ Assyria was the dominant threat of that era
🎯 Assyria's power breaks on Israel's ground
📖 The invader is defeated, not just turned back

## ⛓️ His Yoke Depart From Off Them, And His Burden Depart From Off Their Shoulders

A "yoke" was a wooden frame used to control oxen for hard labor.

Scripture often uses it as a picture of forced submission under a foreign power.

"Burden" repeats the same idea, weight pressing down on Israel's people.

This verse promises that forced submission would finally lift completely.

⛓️ A yoke was a frame for controlling oxen
🎭 Scripture uses it as a picture of submission
⚖️ Burden repeats the same crushing weight
📖 This promises that weight finally lifts

## 🌍 This Is The Purpose That Is Purposed Upon The Whole Earth

This promise is not limited to Israel and its immediate enemies alone.

"The whole earth" widens God's plan to every nation, not only Assyria and Babylon.

Isaiah frequently zooms out from one nation's story to a bigger, global picture.

Local events in this chapter are tied to a much larger plan.

🌍 This is not limited to Israel alone
🌐 The whole earth widens the promise globally
🔭 Isaiah often zooms out to the bigger picture
📖 Local events tie into a larger plan

## ✋ The Hand That Is Stretched Out Upon All The Nations

A stretched out hand in scripture often pictures God acting with direct, personal power.

This is not a distant decree issued from far away.

The same hand judging Babylon and Assyria reaches every other nation as well.

No nation is described here as being outside God's reach.

✋ A stretched hand pictures direct personal power
🎯 This is not a distant, impersonal decree
🌍 The same hand reaches every other nation
📖 No nation stands outside God's reach

## ❓ Who Shall Disannul It

"Disannul" is an old word meaning to cancel or undo something formally.

This question expects an obvious answer, that no one has that power.

Human rulers can delay or resist, but they cannot actually cancel God's plan.

Isaiah is stating certainty in the form of a challenge.

❓ Disannul means to cancel or undo
🚫 No human power can cancel God's plan
⏳ Rulers can delay, never truly stop it
📖 Certainty is stated as a challenge here

## ✋ His Hand Is Stretched Out, And Who Shall Turn It Back

This repeats the stretched hand image from two verses earlier on purpose.

Repetition in Hebrew poetry usually signals the writer wants a point remembered.

"Who shall turn it back" is another way of asking who can stop God.

The chapter closes this section by underlining total, unstoppable certainty.

✋ This repeats the earlier stretched hand image
🔁 Repetition signals a point worth remembering
❓ Turn it back means stop or reverse it
📖 The section closes on total certainty

# Isaiah 14:28-32
# 🐍 The Burden Concerning Philistia
---
## 📅 In The Year That King Ahaz Died

This verse dates the message that follows to a specific, known moment in history.

Ahaz was a king of Judah, Isaiah's own nation, known for his lack of trust in God.

His death marked a real transition point, a new king about to take the throne.

Isaiah's prophecies are anchored in real events, not vague or timeless guesses.

📅 This dates the message to a real moment
👑 Ahaz was a king of Judah
🔄 His death marked a real transition
📖 Isaiah's words are anchored in real history

## 🐍 Rejoice Not Thou, Whole Palestina

"Palestina" here refers to Philistia, the region of Israel's longtime enemies to the west.

The Philistines are the same people connected to Goliath and the Judges era conflicts.

Isaiah warns them not to celebrate too soon over any recent relief from Judah's pressure.

Their celebration, he says, is about to prove badly premature.

🐍 Palestina means Philistia, Israel's old enemy
⚔️ The Philistines fought Israel for generations
🚫 Isaiah warns against celebrating too soon
📖 Their relief is about to prove premature

## 🐉 Out Of The Serpent's Root Shall Come Forth A Cockatrice

This proverb likely points to Ahaz, whose harsh policies had pressured the Philistines.

A "cockatrice" was a legendary venomous serpent, used here as a picture of danger.

The point is that a smaller threat gives way to something even more dangerous.

Relief from one danger does not guarantee lasting safety from every danger.

🐉 Cockatrice was a legendary venomous serpent
👑 The serpent likely pictures king Ahaz
⚠️ A lesser threat gives way to worse
📖 Relief from one danger is not lasting safety

## 🔥 A Fiery Flying Serpent

This continues the same picture, escalating the danger even further.

"Fiery" suggests a serpent whose bite burns like fire through the body.

Ancient readers used vivid, frightening images like this to describe real coming threats.

Whatever follows Ahaz's era would be worse, not milder, for the Philistines.

🔥 Fiery pictures a burning, painful bite
🐍 This escalates the serpent image further
⚠️ Ancient writers used vivid images for real danger
📖 What comes next is worse, not milder

## 🌾 The Firstborn Of The Poor Shall Feed

This shifts the focus to God's own people rather than Philistia's fate.

"Firstborn of the poor" pictures the most vulnerable people finally having enough to eat.

This contrasts sharply with the danger and fear just described for Philistia.

While judgment falls on enemies, God's people are promised basic provision and safety.

🌾 The focus shifts to God's own people
🍞 Firstborn of the poor means the most vulnerable
⚖️ This contrasts with Philistia's coming fear
📖 Judgment on enemies, provision for God's people

## 🔥 I Will Kill Thy Root With Famine

This returns to addressing Philistia directly, using the same root image from verse twenty nine.

"Root" pictures the whole nation's source of survival being cut off.

Famine here removes the danger at its source rather than through more warfare.

Even the strength Philistia had left could not outlast an empty harvest.

🔥 This returns to addressing Philistia directly
🌱 Root pictures the nation's whole source of survival
🌾 Famine cuts off danger at its source
📖 Strength cannot outlast an empty harvest

## 📯 Howl, O Gate, Cry, O City

Gates and walls were where ancient cities gathered for both business and defense.

Calling on the gate itself to howl personifies the entire city in crisis.

This kind of language appears throughout the prophets to describe coming disaster.

The whole city, not just its people, is pictured in mourning.

📯 Gates were where cities gathered and defended
🏙️ The gate itself is personified in crisis
🔁 This language repeats often in the prophets
📖 The whole city is pictured mourning

## 💨 There Shall Come From The North A Smoke

Smoke here pictures the dust and fire trail of an approaching invading army.

"From the north" names the direction most invasions historically reached the region from.

An army's approach could often be seen as smoke on the horizon before it arrived.

This detail grounds the prophecy in a real, visible warning sign.

💨 Smoke pictures an approaching army's dust and fire
🧭 North was the usual invasion direction
👁️ Armies were often seen as smoke first
📖 This detail grounds the warning in reality

## 📨 The Messengers Of The Nation

This pictures foreign envoys or ambassadors arriving to ask Judah what happened.

Neighboring nations would send representatives to learn the outcome of major events like this.

The question assumes outsiders were watching Judah's situation closely.

Judah's response to that question becomes the closing point of the whole chapter.

📨 Messengers means foreign envoys or ambassadors
👀 Neighboring nations watched Judah's situation closely
❓ They come asking what actually happened
📖 Judah's answer closes the whole chapter

## 🏔️ The LORD Hath Founded Zion

"Zion" names Jerusalem, specifically as the place God chose to dwell among His people.

"Founded" means established on purpose, not by accident or human decision alone.

This is the answer Judah gives to the watching nations, God built this place.

The chapter that began with Babylon's fall ends by pointing back to God's own city.

🏔️ Zion names Jerusalem, God's chosen city
🏗️ Founded means established on purpose
🗣️ This is Judah's answer to watching nations
📖 The chapter ends pointing back to God's city

## 🙏 The Poor Of His People Shall Trust In It

This closes the chapter on the same note of comfort it opened with.

"The poor" again points to the most vulnerable, the ones easiest to overlook.

Zion becomes their place of safety and trust, not the powerful or wealthy.

The chapter that opened with mercy for Jacob ends with safety for the poor.

🙏 The chapter closes on comfort again
👥 The poor means the most vulnerable people
🏔️ Zion becomes their place of safety
📖 Mercy for Jacob ends in safety`.trim();

export const ISAIAH_FOURTEEN_PERSONAL_SECTIONS = parseIsaiahFourteenRawNotes(ISAIAH_FOURTEEN_RAW_NOTES);
