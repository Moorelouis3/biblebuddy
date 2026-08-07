export type JoshuaFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaFourRawNotes(rawText: string): JoshuaFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 4:${startVerse}` : `Joshua 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Joshua 4 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_FOUR_RAW_NOTES = `# Joshua 4:1-3
# 🪨 The Lord Commands Twelve Stones
---
## 🧼 When All The People Were Clean Passed Over

Clean here does not mean tidy or washed.

It means completely, with nothing left behind.

Every single Israelite is now standing on the western side of the Jordan.

This same phrase closed the previous chapter.

It marks the crossing as fully finished.

🧼 Clean means completely, not tidy
🌊 The whole nation has now crossed
📜 The same phrase closed chapter three
📖 The crossing is fully finished

## 👣 Take You Twelve Men Out Of The People

Joshua already chose these twelve men back in chapter three.

At the time, no reason was given for picking one man from every tribe.

Now the reason finally arrives, several verses later than the choosing itself.

The wait mirrors how some of God's instructions take time to make sense.

👣 These twelve were already chosen
📜 Chapter three never explained why
⏳ The purpose arrives verses later
📖 Instructions do not always explain themselves right away

## 👨‍👩‍👧 Out Of Every Tribe A Man

Each man represents his whole tribe, not just himself.

Twelve tribes meant twelve large family groups, all descended from Jacob's sons.

A memorial built this way belongs equally to every tribe.

No tribe is too small to be counted.

👨‍👩‍👧 One man stood for his whole tribe
🌳 Twelve tribes trace back to Jacob's sons
🤝 Every tribe shares equally in the memorial
📖 No tribe is left out

## 🗺️ Take You Hence Out Of The Midst Of Jordan

Hence is an old word that means from this place.

The stones must come from inside the riverbed itself, not from the bank.

Getting them meant walking back into the exact spot where the miracle happened.

The memorial had to be made of the very ground the miracle touched.

🗺️ Hence means from this place
🌊 The stones come from inside the riverbed
👣 Getting them meant walking back in
📖 Made from the miracle's own ground

## ✋ Where The Priests' Feet Stood Firm

This is the exact spot described at the end of chapter three.

The priests stood planted there.

The entire nation walked past them on dry ground.

Marking this precise location ties the memory to a real place.

Anyone could later walk to this spot and see it for themselves.

✋ This is chapter three's exact spot
📜 Priests stood here the whole crossing
📍 A real place, not a vague story
📖 Anyone could walk there and see it

## ⛺ Leave Them In The Lodging Place, Where Ye Shall Lodge This Night

The lodging place is where Israel plans to camp for the night.

That location does not get its name, Gilgal, until later in this chapter.

Carrying wet river stones any real distance was heavy work.

The men were not gathering souvenirs.

They were building something meant to last.

⛺ Lodging place is that night's camp
🏷️ It is not yet named Gilgal
💪 Carrying river stones was heavy work
📖 They were building something meant to last

# Joshua 4:4-7
# 🗣️ Joshua Explains The Sign
---
## 📜 Whom He Had Prepared

Prepared means Joshua chose and readied them ahead of time.

This confirms these are the same twelve men selected back in chapter three.

Joshua had a plan already running before anyone else understood it.

Good leaders often set things in motion before the reason becomes clear.

📜 Prepared means chosen ahead of time
👣 These are chapter three's same twelve men
🧠 Joshua had a plan already running
📖 Leaders often act before reasons are clear

## 📦 Pass Over Before The Ark Of The Lord Your God

The ark is still standing in the middle of the riverbed at this point.

The twelve men must walk out to where the ark waits, then carry stones back.

Nothing about the crossing has fully ended while the ark still stands there.

📦 The ark still stands in the riverbed
🚶 The men walk out and come back
⏳ The miracle is still happening
➡️ Their errand happens inside a miracle still active

## 💪 Take You Up Every Man Of You A Stone Upon His Shoulder

Carrying a stone on the shoulder was the normal way to move something heavy by hand.

These river stones were large enough that a grown man needed real strength to lift one.

Every man did this task himself.

Nobody had it done for them.

💪 Shoulder carrying was the normal method
🪨 The stones were large and heavy
🙋 Each man carried his own stone
📖 The effort matched the memorial's importance

## 🔢 According Unto The Number Of The Tribes Of The Children Of Israel

This phrase repeats the same detail already given back in verse two.

Repeating it here shows how carefully this number mattered.

Twelve stones for twelve tribes leaves no room for a shortcut.

A memorial meant to last needed to get this number exactly right.

🔢 This repeats the same detail from verse two
🎯 Repetition shows how carefully it mattered
🚫 No room for a mistake here
📖 A lasting memorial needed the exact number

## 🪧 That This May Be A Sign Among You

A sign here means a physical object built to point back to something God did.

The stones themselves hold no special power.

They simply mark the spot and the moment.

Israel used physical signs like this again and again through its history.

🪧 Sign means an object pointing to God's act
🪨 The stones hold no power on their own
📜 Israel used signs like this often
📖 Visible objects keep memories alive

## ❓ When Your Children Ask Their Fathers In Time To Come

God builds a question into this memorial on purpose.

Curious children were expected to notice the stones and ask about them someday.

This same pattern shows up with Passover earlier in the Bible.

Teaching the next generation was never left to chance.

❓ A future question is built in on purpose
🧒 Children were expected to notice and ask
📜 The same pattern appears with Passover
📖 Teaching the next generation was planned for

## 🗣️ What Mean Ye By These Stones

This is the exact question a child is expected to ask one day.

The stones alone cannot answer it.

Only a parent's spoken explanation can.

A pile of stones only teaches something once someone tells the story attached to it.

❓ The exact expected question
🗣️ Only a spoken answer completes it
👨‍👧 Faith passes down through conversation
📖 Objects need a story to teach anything

## 🪨 For A Memorial Unto The Children Of Israel For Ever

A memorial is something built specifically to keep a memory from fading.

For ever does not promise the stones will physically last forever.

It promises the story will.

Every generation that hears the explanation carries it forward to the next one.

🪨 Memorial means built to keep a memory alive
♾️ For ever promises the story will last
👨‍👩‍👧‍👦 Each generation passes it to the next
📖 Retelling is what makes it last

# Joshua 4:8-9
# 🌊 A Second Set Of Stones
---
## ✅ Did So As Joshua Commanded

The children of Israel do not argue, delay, or ask for more explanation.

They simply carry out the instruction exactly as it was given.

This kind of plain obedience runs through the whole book of Joshua so far.

A memorial built on obedience carries more weight than one built out of habit.

✅ They obey without argument or delay
📜 Plain obedience runs through Joshua so far
🪨 The memorial is built on obedience
📖 Obedience gives the memorial its weight

## 🚶 Carried Them Over With Them Unto The Place Where They Lodged

This confirms the twelve men actually finish the task they were given.

The heavy stones travel the whole distance from the riverbed to that night's camp.

That camp is about to receive a name for the first time.

The next verses reveal where these stones will finally rest.

🚶 The men finish the whole task
🪨 Stones travel from riverbed to camp
🏷️ That camp is about to be named
📖 The stones still need a final resting place

## 🪨 Joshua Set Up Twelve Stones In The Midst Of Jordan

This is not the same pile of stones carried out of the river a moment ago.

Joshua builds a second monument, using twelve different stones, right in the riverbed itself.

One memorial travels with Israel to dry land.

The other stays hidden under the water for good.

🪨 This is a second, separate set of stones
🌊 It stays behind in the riverbed
🚶 The first set travels to dry land
📖 Two monuments mark one miracle

## 📍 And They Are There Unto This Day

This phrase means the stones remained in place at the time this book was written.

The writer speaks with the confidence of someone who could point to a real, standing landmark.

This same kind of note appears again later in the book of Joshua.

📍 The stones remained when this was written
👀 The writer could point to a real landmark
📜 This phrasing repeats later in Joshua
➡️ The record was written close to the events

# Joshua 4:10-14
# 🛡️ The Priests Hold Their Ground
---
## ✋ Stood In The Midst Of Jordan, Until Everything Was Finished

The priests do not step out the moment their part feels complete.

They stay planted in the riverbed until every command has been carried out.

That includes the twelve men gathering stones and the whole nation crossing behind them.

Carrying the heaviest weight the longest is often exactly what leadership requires.

✋ Priests stay until everything is finished
🪨 That includes the stone gathering task
🚶 And the whole nation's crossing
📖 Leadership often means carrying the longest weight

## 🔗 According To All That Moses Commanded Joshua

This instruction traces back through two people before it reaches the nation.

Moses gave commands to Joshua, and Joshua now carries them out in Moses' absence.

The chain of obedience holds even though Moses himself died back in Deuteronomy.

A leader's instructions can keep shaping events long after that leader is gone.

🔗 Moses' commands pass through Joshua
👴 Moses is no longer alive at this point
📜 The chain of obedience still holds
📖 A leader's words can outlast the leader

## 🏃 The People Hasted And Passed Over

Hasted is an old word that simply means hurried.

The ordinary people move quickly.

Meanwhile the priests are standing perfectly still in the same river.

Two different postures happen in the same moment, serving the same crossing.

🏃 Hasted means hurried
✋ Priests stayed still at the same time
🌊 Two postures, one river, one moment
📖 Both serve the same crossing

## 🔄 The Ark Of The Lord Passed Over, And The Priests, In The Presence Of The People

This does not repeat the order from chapter three.

Back in chapter three, the priests carried the ark out in front of everyone else first.

Here, at the very end, the ark and the priests are the last ones to leave the riverbed.

The same men who led the way in are the last ones to leave it.

🔄 The order is not the same as before
🥇 Chapter three had the priests go first
🏁 Here they are the very last to leave
📖 The leaders enter first and exit last

## 🗺️ The Children Of Reuben, And The Children Of Gad, And Half The Tribe Of Manasseh

These three groups already received their own land on the east side of the Jordan.

That land was given to them back in the book of Numbers, before Moses died.

In exchange, their fighting men promised to help the other tribes conquer Canaan first.

This verse shows that promise being kept in real time.

🗺️ These groups already own land east of Jordan
📜 That land was given back in Numbers
🤝 Their men promised to help conquer Canaan first
📖 This verse shows that promise kept

## ⚔️ Passed Over Armed Before The Children Of Israel

Armed here means these men were dressed and equipped for battle.

They cross ahead of the other tribes, ready to fight first.

Their families and flocks stay safely behind on the land already given to them.

Keeping a promise sometimes means showing up armed and ready before anyone asks twice.

⚔️ Armed means equipped for battle
🚶 They cross ahead, ready to fight first
🏠 Their families stay safely behind
📖 A kept promise shows up ready

## 🔢 About Forty Thousand Prepared For War

Forty thousand is a specific, counted number, not a rough guess.

That many armed men crossing together made an unmistakable show of force.

The number also signals how seriously these tribes took their promise to Moses.

A promise this size needed a force this size to back it up.

🔢 Forty thousand is a specific number
👀 That many men made a visible show
🤝 It shows how seriously the promise mattered
📖 A big promise needed a big force

## 🗺️ Unto The Plains Of Jericho

The plains of Jericho sit just across the river, in clear view of the crossing point.

Jericho itself is the walled city the two spies scouted back in chapter two.

Israel crosses the Jordan already facing its very first target in Canaan.

🗺️ The plains sit just across the river
🏰 Jericho was already scouted in chapter two
🎯 It is Israel's first target in Canaan
➡️ The direction ahead is already set

## 👑 The Lord Magnified Joshua In The Sight Of All Israel

God promised to do exactly this back in chapter three, before the crossing even began.

That promise is now visibly fulfilled in front of the entire nation.

Magnified means Joshua's authority becomes unmistakably clear to everyone watching.

🙏 God promised this back in chapter three
👀 It happens in front of the whole nation
👑 Magnified means his authority becomes clear
➡️ A private promise is proven true in public

## 🙏 As They Feared Moses, All The Days Of His Life

Fear here does not mean the people were terrified of Joshua.

It means deep respect for someone who clearly carries God's own authority.

Israel gave Moses this kind of respect for the rest of his life.

Joshua now steps into that same level of trust from the very start.

🙏 Fear here means deep respect, not terror
👴 Israel respected Moses this way for life
👑 Joshua now receives the same respect
📖 His leadership starts at that same level

# Joshua 4:15-18
# 💧 The Waters Return
---
## 🗣️ The Lord Spake Unto Joshua

God speaks directly to Joshua again, the same pattern used through this whole crossing.

Every major step so far has come from a direct word, not Joshua's own guessing.

Ending the miracle gets the exact same careful instruction as starting it did.

Nothing about this crossing is left to human timing or human judgment.

🗣️ God speaks directly to Joshua again
📜 This pattern repeats through the whole crossing
⏳ Ending the miracle gets the same careful instruction
📖 Nothing is left to human timing

## 📜 The Ark Of The Testimony

Testimony here means evidence, or a witness to something true.

The ark held the stone tablets of the ten commandments inside it.

Those tablets stood as physical proof of the covenant God made with Israel.

Calling it the ark of the testimony reminds the reader exactly what it carries.

📜 Testimony means evidence or witness
🪨 It held the ten commandment tablets
🤝 The tablets proved the covenant was real
📖 The name reminds readers what it carries

## ✅ That They Come Up Out Of Jordan

This is a short, plain instruction with nothing complicated about it.

The priests have already stood in one spot for what was likely several hours.

The order to move only comes once every other task is complete.

Even the priests' own relief has to wait for God's timing.

🗣️ A short, plain instruction
⏳ The priests had already waited a long time
✅ The order comes only once everything is done
📖 Even their relief waits on God's timing

## 🔗 Joshua Therefore Commanded The Priests

Joshua does not act the moment he hears from God.

He passes the exact instruction along to the priests in his own voice.

This same relay already happened earlier when the crossing first began.

The chain from God to Joshua to the priests to the people never gets skipped.

🔗 Joshua relays God's instruction himself
📜 The same relay happened at the start
🙏 God speaks, Joshua commands, priests obey
📖 The chain of command is never skipped

## 👣 The Soles Of The Priests' Feet Were Lifted Up Unto The Dry Land

This describes the exact moment the priests' feet finally leave the riverbed.

Soles are simply the bottoms of the feet.

That part had been standing on riverbed ground the whole time.

The text zooms in on one small, specific motion instead of summarizing it quickly.

👣 Soles means the bottoms of the feet
🪨 That part had stood on riverbed ground
🔍 The text zooms in on one small motion
📖 This moment is the miracle's true turning point

## 🌊 The Waters Of Jordan Returned Unto Their Place

The instant the priests' feet clear the riverbed, the river starts flowing again.

There is no gap in time between their final step and the water's return.

The same obedience that held the water back now releases it right on cue.

God controls both the start and the end of the miracle with equal precision.

🌊 The river flows the instant they step out
⏱️ There is no gap in timing
🙏 Their obedience triggers the water's return
📖 God controls both the start and end precisely

## 🌾 Flowed Over All His Banks, As They Did Before

This is the same flooded condition described back at the start of chapter three.

The river returns to full, overflowing harvest season strength within moments.

Nothing about the Jordan itself changed.

Only Israel's ability to walk through it did.

🌊 This matches the flooding from chapter three
⏱️ Full strength returns within moments
🌾 The river itself never changed
📖 Only the stones prove what happened

# Joshua 4:19-24
# 🏕️ Gilgal And The Stones Set In Place
---
## 📅 On The Tenth Day Of The First Month

This date is not picked at random.

The tenth day of the first month is the exact day families chose their Passover lamb back in Exodus.

Forty years earlier, that same date began the countdown toward Israel's escape from Egypt.

Israel enters the promised land on the same calendar day tied to its very first Passover.

📅 The tenth day of the first month
🐑 That date began the Passover lamb selection
🔗 It matches the original Exodus timing
📖 Entry into Canaan echoes Israel's first Passover

## ⛺ Encamped In Gilgal

Gilgal becomes Israel's very first campsite inside the promised land itself.

The name Gilgal is close to a Hebrew word that means to roll.

The next chapter explains exactly why that name was chosen for this spot.

⛺ Gilgal is Israel's first camp in Canaan
🔄 The name is close to roll
📜 Chapter five explains the name fully
➡️ It marks the end of the wilderness years

## 🗺️ In The East Border Of Jericho

Gilgal sits close enough to Jericho to see the city from camp.

That location made it the natural staging ground for the battle still to come.

Israel does not hide far away while planning its next move.

Camping in plain sight of the enemy city was itself a bold statement.

🗺️ Gilgal sits close enough to see Jericho
⚔️ It became the staging ground for battle
👀 Israel camped in plain sight
📖 The location itself was a bold statement

## 🪨 Those Twelve Stones, Which They Took Out Of Jordan, Did Joshua Pitch In Gilgal

This finally answers where the first set of stones ends up.

They traveled from the riverbed, through the night's lodging place, all the way to Gilgal.

Joshua personally sets them up here, giving the nation a lasting landmark to return to.

The visible monument and the hidden one from verse nine now both have permanent homes.

🪨 This is where the first stones finally rest
🚶 They traveled from the river to this spot
🏗️ Joshua personally sets them in place
📖 Both monuments now have permanent homes

## 🔁 When Your Children Shall Ask Their Fathers In Time To Come

This is nearly the exact instruction already given back in verse six.

Repeating it here, at the stones' actual resting place, locks the teaching plan into the memorial itself.

The stones are not finished doing their job the moment they are set down.

Their real purpose only begins the first time a child actually asks about them.

🔁 This repeats the instruction from verse six
🏗️ It happens now at the stones' final home
🧒 Their job is not done when set down
📖 Their purpose begins when a child asks

## 📝 What Mean These Stones

The wording here is nearly identical to the question in verse six.

Verse six used by these stones.

This verse simply says these stones.

Small wording shifts like this are common in Hebrew storytelling.

The same simple question still expects the same honest, spoken answer.

📝 The wording is nearly identical to verse six
🔤 One small phrase changes slightly
📜 Small shifts like this are common in Hebrew
📖 The same honest answer is still expected

## 🏜️ Israel Came Over This Jordan On Dry Land

Dry land means genuinely dry ground, not shallow or muddy water.

The riverbed was flooded and overflowing just before Israel crossed it.

Walking across on completely dry ground, in flood season, is what makes the answer so striking.

A simple sentence like this carries an entire miracle inside it.

🏜️ Dry land means genuinely dry ground
🌊 The river was flooded right before this
😮 Dry ground during flood season is striking
📖 One simple sentence holds an entire miracle

## 🙏 The Lord Your God Dried Up The Waters Of Jordan From Before You

This gives credit for the miracle to God alone, not to Joshua or the priests.

The verbs make it clear that God personally dried the water.

It did not simply happen to dry up on its own.

Every step of this crossing traces back to one clear cause.

🙏 Credit goes to God alone
💧 God personally dried the water
🔗 Every step traces back to one cause
📖 Only God had power to part the river

## 🌊 As The Lord Your God Did To The Red Sea

This draws a direct line between two separate water miracles, forty years apart.

The Red Sea crossing freed a generation from slavery in Egypt.

The Jordan crossing brings their children into the land that was promised to them.

One God performs the same kind of miracle at both ends of the journey.

🌊 Two water miracles, forty years apart
⛓️ The Red Sea freed Israel from slavery
🗺️ The Jordan brings them into the promised land
📖 One God works at both ends

## 🗣️ Until We Were Gone Over

Joshua switches from speaking about you to speaking about we here.

Most of the people listening were either children or not yet born at the Red Sea.

By saying we, Joshua ties the whole nation to that older story as if they had lived it too.

Israel's history belongs to every generation, not only to the ones who were there.

🗣️ Joshua shifts from you to we
🧒 Most listeners were not alive at that Sea
🤝 The word we ties them to that story
📖 History belongs to every generation

## 🌍 That All The People Of The Earth Might Know The Hand Of The Lord

This miracle was never meant to stay a private story inside one small nation.

The hand of the Lord is an old way of describing God's power in action.

Nearby nations would hear about a river drying up and know exactly what it meant.

God intended this event to become news that traveled far beyond Israel's own borders.

🌍 The miracle was not meant to stay private
✋ Hand of the Lord means God's power
👂 Nearby nations would hear the news
📖 God intended it to travel beyond Israel

## 🙏 That Ye Might Fear The Lord Your God For Ever

Fear here means the same deep respect described earlier in this chapter.

This is the final line of the chapter, and it carries the real reason for everything in it.

The stones, the crossing, and the retelling all exist to build that one lasting response.

A memorial only succeeds if it leads people to take God seriously, generation after generation.

🙏 Fear means deep respect, as before
🏁 This is the chapter's closing line
🪨 Everything in the chapter points here
📖 A memorial succeeds if it builds lasting respect

`.trim();

export const JOSHUA_FOUR_PERSONAL_SECTIONS = parseJoshuaFourRawNotes(JOSHUA_FOUR_RAW_NOTES);
