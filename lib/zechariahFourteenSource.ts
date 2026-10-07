export type ZechariahFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZechariahFourteenRawNotes(rawText: string): ZechariahFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZechariahFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zechariah\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zechariah 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zechariah\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Zechariah\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zechariah 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zechariah 14:${startVerse}` : `Zechariah 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Zechariah 14 sections, received " + sections.length);
  }

  return sections;
}

const ZECHARIAH_FOURTEEN_RAW_NOTES = `# Zechariah 14:1-5
# ⚔️ The Day Of The LORD Begins
---
## ⏳ The Day Of The LORD Cometh

"The day of the LORD" is a fixed prophetic phrase, not a date on a calendar.

It shows up throughout Joel, Amos, and Zephaniah for one specific moment.

That moment is when God steps in directly to judge and to rescue.

Zechariah now applies that same loaded phrase to Jerusalem's own future.

⏳ Day of the LORD is a fixed phrase
📜 Joel, Amos, and Zephaniah use it too
⚖️ It means God stepping in directly
📖 Zechariah applies it to Jerusalem now

## 💰 Thy Spoil Shall Be Divided In The Midst Of Thee

The word "thy" here means Jerusalem is the one being addressed directly.

"Spoil" means everything valuable that gets taken during a conquest.

"In the midst of thee" means the looting happens inside the city itself.

This is not armies carrying plunder away to a foreign land.

It is enemies splitting up Jerusalem's own wealth right there in its streets.

🏙️ Thy means Jerusalem is addressed directly
🏺 Spoil means valuables taken in conquest
🚪 In the midst means inside the city
📖 The looting happens in Jerusalem's own streets

## 🌍 I Will Gather All Nations Against Jerusalem

God himself claims credit for bringing this army together.

This is not God merely allowing an attack to happen.

He is the one assembling it on purpose.

The same gathering language returns later for the final battle in Revelation.

🌍 God gathers the nations himself
✋ This is not just God allowing it
🎯 God assembles the attack on purpose
📖 Revelation later echoes this same gathering

## 😢 The Houses Rifled, And The Women Ravished

"Rifled" means ransacked and stripped of everything inside.

"Ravished" means assaulted, the worst violence a conquered city could suffer.

The text does not soften what ancient siege warfare actually looked like.

Zechariah names the horror plainly instead of skipping past it.

🏚️ Rifled means ransacked completely
😢 Ravished means the worst violence imaginable
📜 Ancient siege warfare was this brutal
📖 Zechariah names it instead of hiding it

## 🔢 Half The City...The Residue Shall Not Be Cut Off

This judgment is partial, not total destruction of everyone in the city.

Half go into captivity, but the rest remain in the city itself.

That same two part pattern already appeared in chapter thirteen's remnant.

A remnant surviving judgment becomes the thread the rest of the chapter follows.

🔢 Half the city goes into captivity
🧍 The rest remain in the city
🔁 Chapter thirteen already used this pattern
📖 A surviving remnant carries the chapter forward

## 🛡️ Then Shall The LORD Go Forth, And Fight

Until now God only arranged the attack from a distance.

Here God personally steps onto the battlefield as a warrior.

That shift from permitting to personally fighting is the turning point of the chapter.

Everything that follows flows from God entering the fight himself.

🛡️ God moves from arranging to fighting
🔁 This marks the chapter's turning point
⚔️ God personally enters the battle
📖 Everything after flows from this moment

## 🌊 As When He Fought In The Day Of Battle

This line points back to earlier moments when God fought for his people directly.

The parting of the Red Sea during the exodus is one such moment.

Israel's battles during the conquest of Canaan are another.

Zechariah expects his readers to remember those old victories as proof this new one is coming.

🌊 This recalls the Red Sea crossing
🗺️ It also recalls the conquest battles
🧠 Readers were meant to remember those wins
📖 Old victories prove the new one is coming

## 🏔️ His Feet Shall Stand Upon The Mount Of Olives

The mount of Olives sits just east of Jerusalem, across a narrow valley.

This same hill is where Jesus often taught and where he later ascended into heaven.

Zechariah ties God's dramatic return to the very spot linked to that ascension.

The place of departure becomes the place of return.

🏔️ Mount of Olives sits east of Jerusalem
✝️ Jesus taught and ascended from this hill
🔁 Zechariah ties the return to that spot
📖 Departure and return share one location

## 🪨 The Mount Of Olives Shall Cleave In The Midst Thereof

"Cleave" here means to split completely apart, the opposite of its modern meaning.

The whole mountain tears in two, one half shifting north and one half south.

This pictures a massive, visible, physical earthquake, not a quiet spiritual metaphor.

The land itself reacts to God's arrival.

🪨 Cleave means splitting apart here
🧭 Half the mountain shifts north and south
🌋 This is a massive physical earthquake
📖 The land itself reacts to God

## 🏞️ There Shall Be A Very Great Valley

The split mountain leaves behind an entirely new valley that did not exist before.

This valley is not decoration, it has a direct purpose coming in the next verse.

It becomes the escape route for the people still trapped inside Jerusalem.

God reshapes the landscape to rescue, not just to display power.

🏞️ A brand new valley opens up
🎯 The valley exists for a purpose
🏃 It becomes an escape route
📖 God reshapes land in order to rescue

## 🏃 Ye Shall Flee To The Valley Of The Mountains

The very valley just created becomes the literal path people use to escape.

This is not a symbol, it is a real physical route through real terrain.

The same earthquake that terrifies the enemy saves the people fleeing through it.

One event becomes both judgment and rescue at the same time.

🏞️ The new valley is the escape path
🏃 This is a literal physical route
⚖️ The same event judges and rescues
📖 Judgment and rescue happen together here

## 📍 Unto Azal

Azal names a specific place near Jerusalem, likely a boundary marker the original readers knew well.

Its exact location is uncertain to modern readers, but it worked then like naming a landmark everyone recognized.

The point is the valley stretches far enough to reach all the way out to it.

The escape route covers real, specific distance, not a vague gesture at "somewhere far."

📍 Azal is a known boundary marker
🗺️ Its exact site is unclear today
📏 It measured real distance for Zechariah's readers
📖 The escape route covers real ground

## 🌋 The Earthquake In The Days Of Uzziah King Of Judah

Zechariah points his readers to a real earthquake everyone already remembered.

That same earthquake is also mentioned at the start of the book of Amos.

Using a known historical disaster gives the coming earthquake a scale people could actually picture.

This was not a vague warning, it was "like that one, but bigger."

🌋 A real past earthquake is named
📜 Amos also references this same quake
🧠 It gave readers a scale to picture
📖 This earthquake will be like that one

## 🙏 The LORD My God Shall Come, And All The Saints With Thee

Zechariah suddenly shifts from describing God to speaking to God directly.

"All the saints" refers to the holy ones who accompany God, not a crowd of ordinary soldiers.

God does not arrive to fight this battle alone.

His coming is personal, and it is not a solitary event.

🙏 Zechariah speaks to God directly here
👥 Saints means the holy ones with him
🤝 God does not come alone
📖 His arrival is personal and accompanied

# Zechariah 14:6-9
# 🌅 A Day Unlike Any Other
---
## 🌓 The Light Shall Not Be Clear, Nor Dark

This strange description defies the normal categories of day and night entirely.

It is neither full daylight nor ordinary darkness, something outside the usual pattern.

The verse is deliberately describing a day that breaks the rules nature normally follows.

Zechariah is not confused, he is describing something genuinely unprecedented.

🌓 Neither full day nor full dark
🚫 Normal categories do not apply
🔀 Nature's usual pattern breaks here
📖 This day is genuinely unprecedented

## 📆 One Day Which Shall Be Known To The LORD

This does not mean humans can calculate or schedule this day themselves.

It means the day belongs to God's own reckoning, not a human calendar.

Only God fully knows what this day actually is and when it falls.

The point is not the length of the day but who controls it.

📆 Not a day humans can calculate
🗓️ It belongs to God's own reckoning
👁️ Only God fully knows this day
📖 Control matters more than length here

## 🌆 At Evening Time It Shall Be Light

Evening normally signals the start of darkness, every single day of a person's life.

Here that pattern flips, and light arrives exactly when darkness is expected.

This same hope of light instead of expected night returns later in Revelation.

A reversed evening becomes a small preview of a world with no more night at all.

🌆 Evening normally brings darkness
🔄 Here that pattern reverses completely
📜 Revelation later echoes this same hope
📖 It previews a world with no night

## 💧 Living Waters Shall Go Out From Jerusalem

"Living waters" means water that flows continuously, never going stagnant or dry.

Jerusalem sits on high ground with no major river running through it in reality.

A permanent flowing river from Jerusalem is itself a supernatural reversal of its real geography.

Ezekiel describes a nearly identical river flowing from the temple in his own vision.

💧 Living waters means continuously flowing water
🏙️ Jerusalem has no real river normally
🔄 This reverses the city's actual geography
📖 Ezekiel describes this same river too

## 🧭 Toward The Former Sea, And Toward The Hinder Sea

Hebrew directions were set by facing east, the default orientation of the language.

The "former sea" is the one in front when facing east, the Dead Sea.

The "hinder sea" is the one behind, the Mediterranean to the west.

The waters split and reach both seas at once, covering the whole land between them.

🧭 Hebrew direction faced east by default
🏜️ Former sea means the Dead Sea
🌊 Hinder sea means the Mediterranean
📖 The water reaches both seas at once

## ❄️ In Summer And In Winter Shall It Be

Judean streams and wadis normally dry up completely during the hot summer months.

A river that never stops, through every season, is not how the land actually behaves.

Zechariah is promising a permanent miracle, not a seasonal blessing.

The dry months no longer threaten the water supply at all.

❄️ Streams normally dry up in summer
🔁 A year round river breaks that pattern
✨ This is a permanent miracle promised
📖 Dry months no longer threaten the supply

## 👑 The LORD Shall Be King Over All The Earth

Until this point God is mainly described as Israel's defender against enemy nations.

Here the scope widens, and God becomes acknowledged king of every nation, not just one.

This is the moment the whole chapter has been building toward.

A local deliverer becomes a universal king.

👑 God's role widens here dramatically
🌍 He becomes king of every nation
🧱 The whole chapter builds to this
📖 A local defender becomes a universal king

## ☝️ One LORD, And His Name One

This line echoes the ancient declaration that the LORD alone is God.

That old declaration was Israel's own private confession of faith.

Here, in that day, every nation's worship finally lines up behind that one name.

No rival god keeps any competing claim on anyone's allegiance.

☝️ This echoes Israel's old declaration
🔒 It was once Israel's private confession
🌐 Now every nation shares it
📖 No rival god keeps any claim

# Zechariah 14:10-11
# 🏙️ Jerusalem Lifted Up And Safe
---
## 🗺️ Turned As A Plain From Geba To Rimmon

Geba sits north of Jerusalem, and Rimmon sits far south toward the edge of Judah.

Naming both ends of that line describes the whole territory of Judah flattening out.

The land around Jerusalem becomes level ground, like a plain.

Only Jerusalem itself is about to be the exception to that flattening.

🗺️ Geba marks the northern edge
📍 Rimmon marks the southern edge
🏞️ The whole land between flattens out
📖 Jerusalem alone will not flatten

## ⛰️ It Shall Be Lifted Up

While the surrounding land flattens, Jerusalem itself rises higher instead.

This mirrors Isaiah's picture of the LORD's house exalted above every other hill.

The contrast makes Jerusalem visually impossible to miss from any direction.

God's city stands out precisely because everything around it has gone low.

⛰️ Jerusalem rises while the land flattens
📜 Isaiah pictures this same exaltation
👀 The city becomes impossible to miss
📖 Contrast makes Jerusalem stand out

## 🧱 Benjamin's Gate...The Corner Gate...The Tower Of Hananeel...The King's Winepresses

These are real, named landmarks around Jerusalem's actual city wall.

Nehemiah and Jeremiah mention several of these same spots by name.

Listing them worked like naming familiar street corners to someone who already knew the city.

The whole restored boundary gets mapped out point by point, not left vague.

🧱 These are real named city landmarks
📜 Nehemiah and Jeremiah name them too
🗺️ It worked like naming familiar corners
📖 The boundary is mapped out precisely

## ✅ No More Utter Destruction

The Hebrew word behind "utter destruction" is the same word used for total conquest bans.

That word described cities wiped out completely during Israel's conquest narratives.

Jerusalem is promised it will never again fall into that specific category of judgment.

This is a permanent reversal of the city's worst historical fear.

✅ Same word used for total conquest bans
🏙️ Jerusalem once feared that category of judgment
🔒 That fear is permanently removed
📖 A worst fear gets fully reversed

## 🏡 Jerusalem Shall Be Safely Inhabited

After chapters of siege, sword, and plague, the chapter finally lands on peace.

This is not merely surviving the battle described earlier in the chapter.

It is living afterward without the constant fear of the next attack.

Safety becomes the permanent condition, not a brief pause between wars.

🏡 The chapter finally lands on peace
🛡️ Surviving the battle was not enough
😌 Fear of the next attack ends
📖 Safety becomes permanent, not a pause

# Zechariah 14:12-15
# 💀 The Plague On Jerusalem's Enemies
---
## 💀 The Plague Wherewith The LORD Will Smite All The People

This judgment targets specifically the armies that attacked Jerusalem.

It is not a random illness spreading through an unrelated population.

The punishment lands exactly where the attack came from.

God's response matches the crime with precision.

💀 This plague targets the attacking armies
🎯 It is not a random illness
⚖️ Punishment matches where the attack came from
📖 God responds with precision here

## 🧟 Their Flesh Shall Consume Away While They Stand Upon Their Feet

This pictures bodies decaying while the person is still standing upright and alive.

Ancient Near Eastern curse language often used exactly this kind of vivid, horrifying image.

The point is total divine judgment, not a literal medical description to diagnose.

Zechariah borrows familiar curse imagery to make the judgment unmistakable.

🧟 Bodies decay while still standing upright
📜 Ancient curse language used this imagery
⚠️ The point is total judgment
📖 Familiar imagery makes it unmistakable

## 😱 A Great Tumult From The LORD Shall Be Among Them

"Tumult" means confusion and panic that spreads through the ranks.

God sends this panic directly into the attacking army, not into Israel.

This same tactic appears earlier in Israel's history, in Gideon's battle and Jehoshaphat's battle.

God sometimes wins by turning an army against itself rather than fighting it directly.

😱 Tumult means confusion and panic
🎯 God sends it into the enemy
📜 Gideon and Jehoshaphat saw this tactic before
📖 God sometimes wins through enemy confusion

## 🤝 His Hand Shall Rise Up Against The Hand Of His Neighbour

The attacking coalition starts turning violently against itself from the inside.

Allies who marched in together begin striking the very soldiers beside them.

This is not Israel attacking them, it is their own confusion doing the damage.

A united army collapses into chaos from a single divine panic.

🤝 Allies turn violently against each other
💥 It happens from inside their own ranks
🙅 Israel does not cause this damage
📖 One panic collapses a united army

## ⚔️ Judah Also Shall Fight At Jerusalem

Earlier in the chapter, God alone does the fighting.

Here Judah's people finally join a battle that God is already winning.

They are not rescuing themselves, they are joining a victory already in motion.

Participation comes after God has already turned the tide.

⚔️ God fought alone earlier in the chapter
🙋 Judah now joins the battle too
🏆 The victory is already in motion
📖 Their part comes after God's turn

## 💎 The Wealth Of All The Heathen Round About Shall Be Gathered Together

Taking the defeated army's camp and supplies was standard practice in ancient warfare.

The same thing happened after Gideon's victory and after the defeat of Sisera.

This time the plunder flows into Jerusalem instead of being taken out of it.

Verse one predicted the opposite outcome, and this verse reverses it completely.

💎 Taking enemy supplies was standard practice
📜 Gideon and Sisera's defeats worked the same way
🔄 Plunder now flows into Jerusalem
📖 Verse one's threat gets fully reversed

## 🐫 The Plague Of The Horse, Of The Mule, Of The Camel, And Of The Ass

The judgment does not stop with the soldiers themselves.

Every animal used for riding, hauling, and supply lines shares the same fate.

This erases the army's entire ability to move, fight, or resupply.

Nothing is left standing that could rebuild the attack later.

🐫 Animals share the soldiers' same fate
🚚 This erases the army's supply lines
🛑 Their ability to move is destroyed
📖 Nothing is left to rebuild the attack

# Zechariah 14:16-19
# 🌾 All Nations Come To Worship
---
## 🙌 Every One That Is Left Of All The Nations Which Came Against Jerusalem

The worshippers described here are survivors from the very armies that just attacked.

Former enemies become the ones making a yearly pilgrimage to worship.

This is a complete reversal of loyalty, not a separate group replacing the attackers.

The chapter turns former threats into future worshippers.

🙌 These survivors were former attackers
🔄 Enemies become worshippers completely
👥 It is the same people, not a replacement
📖 Former threats turn into worshippers

## ⬆️ Go Up From Year To Year To Worship The King

Jerusalem sits on elevated ground, so travel there was always described as "going up."

This same phrase describes pilgrimage to the required feasts throughout the Old Testament.

"The King" here means the LORD himself, now ruling visibly rather than through a human monarch.

The yearly trip becomes a repeated act of loyalty to this now visible king.

⬆️ Going up describes travel to Jerusalem
📜 Old Testament pilgrims used this same phrase
👑 The King here means the LORD himself
📖 The yearly trip shows ongoing loyalty

## 🌿 The Feast Of Tabernacles

This feast was one of three pilgrimage festivals every Israelite male was required to attend.

It originally commemorated Israel living in temporary shelters during the wilderness years.

Here the celebration expands beyond Israel to include every surviving nation.

A feast that once belonged to one people becomes a feast for the whole earth.

🌿 One of three required pilgrim feasts
🏕️ It recalled Israel's wilderness shelters
🌍 Now every nation celebrates it too
📖 One people's feast becomes the whole earth's

## 🌧️ Whoso Will Not Come Up...Even Upon Them Shall Be No Rain

Rain was not a random punishment, it fit this exact festival perfectly.

The Feast of Tabernacles fell right at the start of Israel's rainy agricultural season.

Withholding rain threatened the next year's entire harvest for anyone who refused.

The punishment matched the festival with careful, deliberate precision.

🌧️ Rain begins right as this feast occurs
🌾 Withholding it threatens the whole harvest
🎯 The punishment fits the festival exactly
📖 Precision, not randomness, shapes this threat

## 🏜️ If The Family Of Egypt Go Not Up, That Have No Rain

Egypt's farming never depended on rainfall the way Israel's did.

The Nile's yearly flooding fed Egyptian crops instead of seasonal rain.

Threatening Egypt with no rain would barely threaten Egypt at all.

Egypt gets singled out by name precisely because the normal threat would not work on it.

🏜️ Egypt's farming never depended on rain
🌊 The Nile's flooding fed its crops instead
🚫 The rain threat would not work there
📖 Egypt is named for needing a different threat

## ⚠️ This Shall Be The Punishment Of Egypt, And Of All Nations

Egypt stands as the named example of how precisely God tailors each consequence.

Other nations get threatened with no rain, Egypt gets the plague instead.

Every nation's specific vulnerability determines its own specific punishment.

The requirement itself, worship at this feast, remains the same for everyone.

⚠️ Egypt is the named example here
🎯 Each nation's punishment fits its vulnerability
🌍 The requirement stays the same for all
📖 God tailors judgment to fit each nation

# Zechariah 14:20-21
# 🔔 Holiness Reaches Everyday Life
---
## 🐴 Upon The Bells Of The Horses, Holiness Unto The LORD

This exact phrase once appeared only on the high priest's gold forehead plate.

That plate was among the most sacred single objects in Israel's entire worship system.

Here the same sacred words move onto ordinary horse bells used in daily life and war.

The line between the most holy object and the most ordinary one disappears.

🐴 Once reserved for the high priest's plate
✨ That plate was supremely sacred
🔔 Now it appears on ordinary horse bells
📖 The line between sacred and ordinary disappears

## 🍲 The Pots In The LORD's House Shall Be Like The Bowls Before The Altar

Temple bowls before the altar were specially consecrated vessels, set apart for sacred use only.

Ordinary cooking pots were never treated that same way before this point.

Here plain kitchen pots become just as holy as those consecrated altar bowls.

The old distinction between sacred vessels and everyday ones collapses completely.

🍲 Pots were once ordinary, unlike altar bowls
🏺 Altar bowls were specially consecrated
🔄 Now pots match those bowls in holiness
📖 The sacred and everyday distinction collapses

## 🏺 Every Pot In Jerusalem And In Judah Shall Be Holiness Unto The LORD

The scale here widens even further than the previous verse.

Not just temple vessels, but literally every pot in every home across the whole territory.

Holiness is no longer confined to the temple building at all.

It spreads out to cover ordinary households everywhere in the land.

🏺 Every pot in the whole territory now
🏠 Not just temple vessels but home ones too
🚫 Holiness is no longer confined to the temple
📖 Holiness spreads into ordinary households

## 🔥 Seethe Therein

"Seethe" is an old word that simply means to boil or cook something.

Worshippers could use ordinary kitchen pots to cook their sacrificial meals.

No separately designated temple vessel was needed anymore for that purpose.

A word that sounds strange today just described everyday cooking.

🔥 Seethe means to boil or cook
🍖 Worshippers cooked sacrificial meals in them
🙅 No special temple vessel was required
📖 An old word describes ordinary cooking

## 🚫 No More The Canaanite In The House Of The LORD

"Canaanite" could mean the ethnic group historically barred from Israel's worship.

The same Hebrew word was also used elsewhere in scripture to mean trader or merchant.

Many scholars believe this closing line points toward no more profiteering inside God's house.

Jesus later acts this exact theme out by overturning tables in the temple.

🚫 Canaanite could mean the ethnic group
💰 The same word also meant merchant
🏛️ This may mean no more temple profiteering
📖 Jesus later overturns tables for this reason
`.trim();

export const ZECHARIAH_FOURTEEN_PERSONAL_SECTIONS = parseZechariahFourteenRawNotes(ZECHARIAH_FOURTEEN_RAW_NOTES);
