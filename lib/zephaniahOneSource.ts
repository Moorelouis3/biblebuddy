export type ZephaniahOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZephaniahOneRawNotes(rawText: string): ZephaniahOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZephaniahOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zephaniah\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zephaniah 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zephaniah\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Zephaniah\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zephaniah 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zephaniah 1:${startVerse}` : `Zephaniah 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Zephaniah 1 sections, received " + sections.length);
  }

  return sections;
}

const ZEPHANIAH_ONE_RAW_NOTES = `# Zephaniah 1:1-3
# 📜 A Royal Prophet's Warning
---
## 🌍 The Son Of Cushi

"Cushi" is also the Hebrew word for a person from Cush, the land south of Egypt.

Many scholars think this name points to real family history behind the prophet.

Zephaniah later speaks judgment over nations far outside Judah in chapter two.

His own family story may be part of why his vision reached that wide.

🌍 Cushi points to the land of Cush

👪 The name may mark family history

🗺️ Zephaniah later judges many nations

📖 His reach was never just local

## 👑 The Son Of Hizkiah

This genealogy goes back four generations, which is unusually long for a prophet.

Many scholars believe this Hizkiah is the same King Hezekiah who ruled Judah.

If true, Zephaniah was a distant descendant of that same king.

That puts a voice from inside the royal family speaking hard truth to it.

A prophet with royal blood had the most to lose by speaking it.

👑 Four generations trace a royal line

🧬 Hizkiah may be King Hezekiah himself

📜 Zephaniah may be a king's descendant

📖 Royal blood did not silence hard truth

## 👶 In The Days Of Josiah The Son Of Amon

Josiah became king of Judah as a child after his father Amon was killed.

He grew up to tear down idols and restore true worship across the land.

This chapter describes rampant idol worship still present in Judah.

That means Zephaniah likely spoke these words early in Josiah's reign, before the reforms.

His warning may have been part of what pushed Josiah to act.

👶 Josiah began ruling as a child

🔨 He later destroyed Judah's idols

⏳ This warning likely came before those reforms

📖 Zephaniah's words may have helped spark them

## 🔥 I Will Utterly Consume All Things

"Consume" means to destroy completely, leaving nothing behind.

God says he will utterly consume everything from the land, not just punish part of it.

This is total judgment, not a partial correction.

The scale of this warning matches the scale of Judah's turning away from God.

Zephaniah wants the reader to feel the weight of that totality right away.

🔥 Consume means complete destruction

⚖️ This judgment covers everything, not part

📏 The warning matches the scale of the sin

📖 Total judgment opens the chapter

## 🐦 The Fowls Of The Heaven, And The Fishes Of The Sea

Genesis 1 shows God forming man, then animals, then birds, then fish, filling the world in order.

Here God lists man, beast, birds, and fish being taken away in that same order.

The creation story is being run in reverse.

What God once filled with life, he now empties on purpose.

Judgment here is not random.

It undoes the work of creation itself.

🌱 Creation moved from man to fish

🔄 Judgment reverses that same order

🌍 What God filled, God now empties

📖 This undoing is the point, not chance

## 🧱 The Stumbling Blocks With The Wicked

A stumbling block is anything that trips a person up on their way to God.

Here the word points directly at idols.

Idols promised help but only led people further from the LORD.

Pairing idols with the wicked who serve them makes the object and the sinner one target.

Removing the block and removing the person who set it up go together.

🧱 A stumbling block trips up faith

🗿 Here it means idols directly

👥 Idols and idol worshippers are judged together

📖 Removing the trap means removing the trapper

# Zephaniah 1:4-6
# 🔥 Stamping Out Judah's Idols
---
## ✋ I Will Also Stretch Out Mine Hand Upon Judah

"Stretch out mine hand" is a common Old Testament picture for God taking direct action.

It is often used right before a specific, decisive judgment.

Judah had seen God use this same picture against Egypt long before.

Now that same hand turns toward God's own people.

No nation, not even the chosen one, stands outside this warning.

✋ Stretch out mine hand means direct action

⚡ It signals a coming decisive judgment

🏜️ God used this same picture against Egypt

📖 Judah is not exempt from it now

## ⛈️ The Remnant Of Baal From This Place

Baal was a Canaanite storm god, widely worshipped before and during Judah's history.

Earlier kings had already torn down many Baal altars in Judah.

"Remnant" means what was left over, not wiped out completely.

Some worship of Baal had quietly survived those earlier reforms.

God promises to finish what partial reform never reached.

⛈️ Baal was a Canaanite storm god

🪓 Earlier kings already removed some altars

🌿 Remnant means what survived those reforms

📖 God finishes what reform left standing

## 🕯️ The Name Of The Chemarims With The Priests

"Chemarims" is a Hebrew word for priests who served idols instead of the LORD.

The verse names them right alongside Judah's regular priests.

That pairing shows how deeply idol worship had mixed into official religious life.

These were not outsiders sneaking in false gods.

They held real positions inside Judah's own worship system.

🕯️ Chemarims served idols, not the LORD

🤝 They are named beside Judah's own priests

⚠️ Idol worship had reached official religion

📖 The corruption was inside the system itself

## ⭐ The Host Of Heaven Upon The Housetops

"The host of heaven" means the sun, moon, and stars worshipped as gods.

Flat rooftops were common in ancient Judah and doubled as extra living space.

People climbed onto those roofs to burn offerings to the stars at night.

Worshipping the sky may have felt safer than bowing to idols in the street.

It was no less a betrayal of the one true God.

⭐ Host of heaven means sun, moon, stars

🏠 Housetops were flat roofs used daily

🌙 People burned offerings to the stars there

📖 Quiet rooftop worship was still betrayal

## 🤝 That Swear By The LORD, And That Swear By Malcham

Swearing by a god's name meant calling that god to witness a promise.

These people swore oaths to the LORD and to Malcham in the same breath.

Malcham was the national god of Ammon, worshipped alongside the LORD by some in Judah.

This was not open rebellion against God.

It was trying to keep two gods happy at once, and that failed just the same.

🤝 Swearing by a god called it to witness

👑 Malcham was Ammon's national god

⚖️ Some tried worshipping the LORD and Malcham both

📖 Splitting loyalty was still unfaithfulness

## ↩️ Them That Are Turned Back From The LORD

This verse names two different kinds of unfaithfulness.

The first group once followed the LORD and later turned away from him.

The second group never sought him or asked about him at all.

Turning back is active rejection.

Never seeking is simple indifference.

Both groups end up in the same place, outside a relationship with God.

↩️ One group turned away from the LORD

😶 Another group never sought him at all

⚖️ Rejection and indifference are both named here

📖 Both end up outside a relationship with God

# Zephaniah 1:7-9
# 🍽️ A Sacrifice Called Judah
---
## 🤫 Hold Thy Peace At The Presence Of The Lord GOD

"Hold thy peace" is a command to stop talking and stand still.

It is the natural response when someone realizes a powerful figure has entered the room.

Here that figure is the Lord GOD himself, arriving to judge.

Arguments and excuses have no place in this moment.

Silence here is not weakness.

It is proper awe before someone far greater.

🤫 Hold thy peace means stop and be still

👑 The Lord GOD himself has arrived

🙅 Excuses have no place here

📖 Silence here means awe, not weakness

## 📅 The Day Of The LORD Is At Hand

"The day of the LORD" is a phrase prophets use for a moment when God steps in directly.

Sometimes it means judgment, and sometimes it means rescue.

Here it clearly means judgment on Judah.

"At hand" means close, not far off in some distant future.

Zephaniah wants his listeners to feel the urgency of that nearness.

📅 Day of the LORD means God stepping in

⚖️ It can mean judgment or rescue

🔥 Here it clearly means judgment

📖 At hand means this is near, not distant

## 🍽️ The LORD Hath Prepared A Sacrifice, He Hath Bid His Guests

A sacrifice needed an animal, an altar, and invited guests to share the meal.

God here plays host, and the coming judgment is pictured as that meal.

The shocking part is who the guests are.

Many scholars believe the guests are the invading army coming to carry out judgment.

Judah itself becomes the sacrifice laid out on God's own table.

🍽️ A sacrifice needed guests to share it

🎭 God is pictured hosting this meal

⚔️ The guests are likely the invading army

📖 Judah itself becomes the sacrifice

## 👑 I Will Punish The Princes, And The King's Children

Judgment starts at the top, not the bottom.

Princes and the king's own children held the most power and comfort in Judah.

Their position did not protect them from the coming day.

Leaders who should have guided the nation back to God failed to do so.

The highest rank in the land gets no special shelter here.

👑 Judgment begins with the ruling class

🏰 Princes and royal children are named directly

🛡️ Position offered them no protection

📖 Leaders fail first, and judgment starts there

## 👗 Clothed With Strange Apparel

"Strange apparel" means clothing tied to foreign nations and their gods.

Wearing it was a quiet way of adopting a foreign nation's customs and worship.

Fashion here was never just fashion.

Clothing signaled which god a person actually trusted.

Judah's elite were dressing like the nations they should have stood apart from.

👗 Strange apparel means foreign style clothing

🌍 It signaled devotion to foreign gods

🎭 Fashion carried real religious meaning

📖 Judah's elite dressed like the nations around them

## 🚪 Leap On The Threshold

A threshold is the raised strip of wood or stone at the bottom of a doorway.

Many scholars connect this leaping to a pagan custom tied to the Philistine god Dagon.

In that custom, worshippers avoided stepping directly on the threshold out of superstition.

Others think this simply describes officials violently bursting into homes.

Either reading points to the same problem, a corrupt system built on superstition or force.

🚪 A threshold is a doorway's raised strip

🏛️ Some link this to Dagon worship customs

💪 Others see violent officials forcing entry

📖 Either way, the system was corrupt

## 💼 Fill Their Masters' Houses With Violence And Deceit

These officials served powerful households and used their position to gain wealth unfairly.

"Violence" points to force used against ordinary people.

"Deceit" points to lies and fraud in everyday dealings.

Their masters' houses grew full while the people they served grew poorer.

Corruption inside Judah's homes was as real a sin as any idol on a roof.

💼 Officials used power to gain wealth unfairly

👊 Violence means force against ordinary people

🗣️ Deceit means lies and fraud

📖 Corruption was as real a sin as idols

# Zephaniah 1:10-13
# 📯 The Cry Spreads Across Jerusalem
---
## 🐟 The Noise Of A Cry From The Fish Gate

The Fish Gate was a real entrance in Jerusalem's city wall.

It likely got its name from fish traders who sold their catch nearby.

A busy trading spot becomes the first place the cry of disaster is heard.

Even the normal, everyday parts of the city get swept into this judgment.

No corner of Jerusalem, however ordinary, stays untouched.

🐟 The Fish Gate was a real city entrance

📣 It was likely named for fish traders

🏙️ Disaster reaches even ordinary trading spots

📖 No part of the city stays untouched

## 🏘️ An Howling From The Second

"The second" refers to a newer district of Jerusalem, sometimes called the Second Quarter.

It grew up outside the old, original walls of the city as Jerusalem expanded.

This was likely a newer, wealthier part of town.

Even the newest, most developed parts of Jerusalem do not escape the cry.

Growth and progress offered no protection from judgment.

🏘️ The second means a newer city district

🏗️ Jerusalem had expanded beyond its old walls

💰 This was likely a wealthier part of town

📖 New growth gave no real protection

## ⛰️ A Great Crashing From The Hills

Jerusalem sat surrounded by hills, with many homes built right on their slopes.

A crashing sound there meant destruction spreading beyond the city center.

Disaster was not staying in one neighborhood.

It moved outward across the whole landscape surrounding Jerusalem.

The whole city, center and edges alike, was caught in the same judgment.

⛰️ Jerusalem's hills were covered with homes

💥 Crashing there meant destruction spreading outward

🗺️ The whole landscape was caught up in it

📖 No neighborhood sat outside the judgment

## 🥣 Ye Inhabitants Of Maktesh

"Maktesh" literally means a mortar, the bowl shaped tool used for grinding.

Scholars believe the name described a bowl shaped valley or market area in Jerusalem.

That shape matched a market, a hollow full of buying and selling.

God calls out the people living and working in that exact spot.

The marketplace that once buzzed with trade now gets singled out for judgment.

🥣 Maktesh means a bowl shaped mortar

🏘️ It likely described a market area

💰 A hollow spot full of buying and selling

📖 The marketplace itself is called to account

## 💰 All They That Bear Silver Are Cut Off

"Bear silver" describes merchants and money traders carrying their wealth.

Maktesh was their home base, so this verse targets them directly.

Wealth had become their measure of security.

That wealth could not shield them from this judgment.

Money, like idols, had quietly become something Judah trusted instead of God.

💰 Bear silver means wealthy traders

🏪 Maktesh was their home base

🛡️ Their wealth offered them no shield

📖 Money had quietly replaced trust in God

## 🕯️ I Will Search Jerusalem With Candles

Ancient homes had dark, hidden corners that daylight never reached.

A candle let someone search those corners room by room.

God pictures himself doing exactly that across all of Jerusalem.

Nothing hidden in a back room or a locked chest stays hidden from him.

This is a picture of total, careful knowledge, not a quick glance.

🕯️ Candles searched dark, hidden corners

🏠 God pictures searching all of Jerusalem

🔍 Nothing hidden stays hidden from him

📖 This is careful, total knowledge

## 🍷 Settled On Their Lees

Wine left sitting on its lees, the thick sediment at the bottom, grows heavy and unchanging.

Winemakers had to stir or pour off wine like that or it would spoil.

"Settled on their lees" pictures people grown thick and comfortable in their ways.

They stopped expecting anything from God, good or bad.

Comfortable, unmoved complacency can be as dangerous as open rebellion.

🍷 Lees are the sediment at a wine's bottom

😴 Settled means grown thick and unmoved

🤷 They expected nothing from God either way

📖 Comfort can be its own quiet rebellion

## 🙄 The LORD Will Not Do Good, Neither Will He Do Evil

This is not open atheism.

These people still believed God existed.

Their real belief was that God had stepped back and stopped acting at all.

A distant, uninvolved God demands nothing and threatens nothing.

That belief let them live however they wanted without real fear.

Zephaniah's whole message proves that belief wrong.

🙄 This is not open atheism

😴 They believed God had gone silent

⚠️ A silent God felt safe to ignore

📖 Zephaniah proves that belief wrong

## 🏴 Their Goods Shall Become A Booty

"Booty" means plunder, property taken by a conquering army.

Everything Judah's people had worked to build would end up in enemy hands.

Invading soldiers, not the rightful owners, would carry it all away.

What felt secure and permanent would disappear almost overnight.

Earthly goods never protect against this kind of day.

🏴 Booty means plunder taken by conquerors

📦 Judah's own goods would become enemy plunder

⚡ Security would disappear almost overnight

📖 Earthly goods cannot protect against this day

## 🏚️ Build Houses, But Not Inhabit Them

Moses had already warned Israel about this exact curse in Deuteronomy.

Building a house and never living in it meant losing it before it was finished.

The same warning covered planting a vineyard and never tasting its wine.

Labor would continue, but the reward from that labor would not.

This judgment was never a surprise threat.

It was a promise now coming due.

📜 Moses warned of this curse long before

🏚️ A finished house would never be lived in

🍇 A planted vineyard would never be tasted

📖 This was a promise finally coming due

# Zephaniah 1:14-16
# ⏳ The Great Day Draws Near
---
## 🔁 The Great Day Of The LORD Is Near, It Is Near

Saying "near" twice in a row is not an accident.

Hebrew poetry often repeats a phrase to make a point impossible to miss.

This is urgency built directly into the words themselves.

"Hasteth greatly" adds a third layer, saying the day is actually speeding up.

Zephaniah will not let his listeners treat this as some far off idea.

🔁 Repeating near, near drives home urgency

📯 Hebrew poetry often repeats for emphasis

⏩ Hasteth greatly means the day is speeding up

📖 This was never a far off idea

## 💪 The Mighty Man Shall Cry There Bitterly

A "mighty man" was a trained warrior, someone known for courage and strength.

Even soldiers who faced battle without flinching break down on this day.

Strength in combat offers no defense against the LORD's judgment.

If the strongest cry out, no one can claim they will stand unmoved.

This day humbles every kind of human confidence equally.

💪 A mighty man was a trained warrior

😢 Even trained warriors break down crying

🛡️ Strength offers no defense here

📖 This day humbles every kind of confidence

## 🔁 A Day Of Wrath, A Day Of Trouble And Distress

Zephaniah piles up the phrase "a day of" again and again in this verse.

Each repeat adds one more layer of weight to the picture.

Wrath, trouble, and distress stack instead of blending into one vague idea.

The repetition forces a reader to feel each piece separately.

This is poetry built to be felt, not skimmed.

🔁 A day of repeats again and again

🧱 Each repeat stacks another layer of weight

😣 Wrath, trouble, and distress stay separate ideas

📖 This poem is built to be felt

## ☁️ A Day Of Clouds And Thick Darkness

Thick clouds and darkness often picture God's own presence arriving in the Old Testament.

Mount Sinai was covered the same way when God came down to meet Moses.

Darkness here does not mean God is absent.

It means God himself is drawing near in overwhelming power.

The same image that once marked a holy meeting now marks a holy judgment.

☁️ Thick clouds often picture God arriving

⛰️ Sinai was covered this same way

🌑 Darkness here means presence, not absence

📖 A holy meeting image now marks judgment

## 📯 A Day Of The Trumpet And Alarm

The trumpet here was a ram's horn, called a shofar, blown for signals.

Armies used it to call soldiers together or to warn of approaching danger.

Hearing it meant something urgent and dangerous was already underway.

God borrows that same sound to announce this coming judgment.

No watchman needed to explain what that sound meant.

📯 The trumpet was a ram's horn, a shofar

⚔️ Armies used it to warn of danger

🚨 Hearing it meant danger was already near

📖 God borrows that same urgent signal

## 🏰 Against The Fenced Cities, And Against The High Towers

Fenced cities had thick walls built to withstand armies and long sieges.

High towers gave soldiers a clear view to spot danger coming from far away.

These were the strongest defenses Judah's engineers could build.

Neither one could slow down this particular day.

Human defense plans mean nothing against a judgment God himself brings.

🏰 Fenced cities had thick defensive walls

🗼 High towers watched for danger from far

🛡️ These were Judah's strongest defenses

📖 No human defense slows this day

# Zephaniah 1:17-18
# 🩸 No Silver Or Gold Can Save
---
## 🦯 They Shall Walk Like Blind Men

Someone suddenly blind stumbles, reaches out, and cannot find a safe direction.

That is the picture here, not actual blindness but complete disoriented panic.

People who once felt confident and secure lose all sense of direction.

Sin is named directly as the cause of this coming confusion.

No amount of planning works when panic erases every clear path.

🦯 Blind men stumble without direction

😵 This pictures total panic, not real blindness

🧭 Confident people lose all sense of direction

📖 Sin itself is named as the cause

## ⚰️ Their Blood Shall Be Poured Out As Dust, And Their Flesh As The Dung

Proper burial mattered deeply in the ancient world, even for an enemy.

Leaving bodies unburied was considered the deepest possible dishonor.

Comparing blood to dust and flesh to dung pictures bodies left scattered and uncounted.

No funeral, no mourning, no dignity would be left for the dead.

The image is harsh on purpose, matching the seriousness of the warning.

⚰️ Proper burial mattered deeply back then

🚫 Leaving bodies unburied meant deep dishonor

🌾 Blood and flesh pictured as dust and dung

📖 The image is harsh on purpose

## 💰 Neither Their Silver Nor Their Gold Shall Be Able To Deliver Them

This verse circles back to the silver bearing merchants named earlier in the chapter.

Their wealth once felt like real security.

On this day, none of it can buy safety or escape.

Money cannot bribe or outrun this particular judgment.

What people trusted most turns out to be worthless at the one moment it mattered.

💰 This callback points to those same merchants

🛡️ Their wealth once felt like security

🚫 Money cannot buy escape from this day

📖 What they trusted most proves worthless here

## 🔥 The Fire Of His Jealousy

God's jealousy is not petty or insecure like human jealousy can be.

It means fierce, protective loyalty to a relationship he already promised to keep.

Judah had given its loyalty to other gods while still claiming to be his.

Fire pictures that jealousy burning away everything that broke the promise.

God's jealousy is actually proof of how seriously he takes the relationship.

💛 Jealousy here means fierce, protective loyalty

💔 Judah split its loyalty between two gods

🔥 Fire burns away what broke that promise

📖 Jealousy proves how seriously God takes it

## 🧹 A Speedy Riddance Of All Them That Dwell In The Land

"Riddance" means a complete clearing out, leaving nothing behind.

"Speedy" rules out a slow, drawn out process.

This judgment arrives suddenly and finishes completely.

The chapter that opened with total consuming closes the exact same way.

Zephaniah will not let the reader soften what has been promised here.

🧹 Riddance means a complete clearing out

⚡ Speedy rules out a slow process

🔚 The chapter closes the way it opened

📖 Nothing here has been softened
`.trim();

export const ZEPHANIAH_ONE_PERSONAL_SECTIONS = parseZephaniahOneRawNotes(ZEPHANIAH_ONE_RAW_NOTES);
