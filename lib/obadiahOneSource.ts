export type ObadiahOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseObadiahOneRawNotes(rawText: string): ObadiahOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ObadiahOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Obadiah\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Obadiah 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Obadiah\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Obadiah\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Obadiah 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Obadiah 1:${startVerse}` : `Obadiah 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Obadiah 1 sections, received " + sections.length);
  }

  return sections;
}

const OBADIAH_ONE_RAW_NOTES = `# Obadiah 1:1-4
# 📜 A Vision Against A Proud Nation
---
## 👁️ The Vision Of Obadiah

A vision here means something God showed the prophet directly.

It is not just a message Obadiah heard secondhand.

Obadiah is one of the shortest books in the whole Bible.

His name means servant of the LORD.

The Bible tells us almost nothing else about the man himself.

The whole book is built from this one scene.

👁️ A vision is something God showed him
📏 Obadiah is only one chapter long
🙋 His name means servant of the LORD
📖 The whole book flows from this one scene

---

## 👬 Thus Saith The Lord GOD Concerning Edom

Edom refers to the nation descended from Esau.

Esau was Jacob's twin brother in the book of Genesis.

Their rivalry began in the womb and never fully healed.

That same family tension is still alive hundreds of years later.

This message comes straight from the LORD, not from Obadiah's own opinion.

Edom gets to hear it is God himself bringing the charge.

👬 Edom comes from Esau, Jacob's twin
⚔️ Their rivalry began before birth
📣 This message comes from the LORD himself
📖 God brings the charge, not Obadiah

---

## 📢 We Have Heard A Rumour From The LORD

Rumour here does not mean idle gossip or secondhand chatter.

It means a report that has already reached the nations.

God's word about Edom has already started spreading beyond Israel.

Other nations are hearing this warning right along with Edom itself.

Judgment is not sneaking up quietly.

It is being announced out loud ahead of time.

📢 Rumour means report, not gossip
🌍 Other nations already hear this word
⏰ Judgment is announced ahead of time
📖 Nothing about this comes as a secret

---

## 📨 An Ambassador Is Sent Among The Heathen

An ambassador is a messenger sent out with real authority.

Here it pictures God stirring up the surrounding nations against Edom.

The heathen simply means nations outside Israel's covenant with God.

God is not acting alone in secret against Edom.

He is calling other nations into the task.

Edom's enemies are not random.

They are summoned by God himself.

📨 An ambassador is a messenger with authority
🌐 Heathen means nations outside Israel's covenant
🤝 God stirs up nations against Edom
📖 Edom's enemies are summoned, not random

---

## 🪨 Thou That Dwellest In The Clefts Of The Rock

Clefts of the rock means cracks and caves cut into cliffs.

Edom's homeland sat among steep mountains and narrow rock passages.

Many scholars believe this points to the region later called Petra.

Natural walls of stone made Edom feel completely safe from attack.

Whose habitation is high repeats the same idea in different words.

Edom literally lived up above everyone else.

That height became the whole source of their pride.

🪨 Clefts of the rock means cliff caves
🏔️ Edom's land sat high in the mountains
🏛️ Many scholars point to the region near Petra
📖 Height became the source of Edom's pride

---

## ❓ Who Shall Bring Me Down To The Ground

This does not read like a real question seeking an answer.

It is Edom's own heart boasting out loud.

The line means something closer to nobody can touch me.

Pride often talks like this, certain that it is beyond reach.

The very next line already answers the boast.

God can.

And God will.

❓ Not a real question, a boast
💔 Pride says nobody can touch me
⚡ God answers the boast directly
➡️ Confidence in height was false confidence

---

## 🦅 Though Thou Set Thy Nest Among The Stars

Eagles build nests high on cliffs where nothing can reach them.

Setting a nest among the stars pushes that picture even further.

It is poetic exaggeration for being completely unreachable.

No matter how high Edom climbs, this is still only talk.

The LORD measures height differently than people do.

Nothing is out of His reach.

🦅 Eagles nest high where nothing reaches them
⭐ Among the stars means total exaggeration
📏 God measures height differently than people
📖 Nothing is ever out of His reach

---

## 📍 Thence Will I Bring Thee Down, Saith The LORD

This line ends the opening boast with one flat promise.

Thence means from that very place, however high it is.

It does not matter how far up pride has climbed.

God's reach still finds it there.

The chapter opens with a warning that height cannot save anyone.

That warning will keep unfolding verse after verse.

📍 Thence means from that exact place
⬇️ Height cannot outrun God's reach
⚖️ The warning is flat and final
📖 No pride climbs higher than God's reach

# Obadiah 1:5-7
# 🍇 Thieves Leave More Than Edom Will
---
## 🥷 If Thieves Came To Thee, If Robbers By Night

Even thieves and robbers do not take everything they find.

They grab what they can carry and then they leave.

Obadiah uses this picture to describe something worse coming for Edom.

What is coming will not act like an ordinary thief.

It will be far more complete than any robbery.

🥷 Thieves and robbers do not take everything
🏃 They grab what they can and leave
⚠️ Edom's coming disaster acts differently
📖 This destruction will be far more complete

---

## ✅ Would They Not Have Stolen Till They Had Enough

This question expects an obvious answer of yes.

Ordinary thieves stop stealing once they have enough.

There is a limit to normal theft, even among criminals.

Edom's coming judgment will not have that kind of limit.

Nothing will be held back out of mere satisfaction.

✅ The expected answer here is yes
🛑 Normal thieves stop once satisfied
🚫 Edom's judgment will not stop that way
📖 Nothing will be held back this time

---

## 🍇 If The Grapegatherers Came To Thee, Would They Not Leave Some Grapes

Grapegatherers were workers who harvested the vineyards at the season's end.

Israel's law required leaving some grapes behind on purpose.

Leviticus commanded landowners to leave gleanings for the poor and the stranger.

Even careless harvesters followed that one unwritten courtesy.

Edom's destroyers will not leave anything behind at all.

📜 Grapegatherers harvested vineyards at the season's end
📖 Leviticus required leaving grapes for the poor
🤲 Even harvesters usually followed that one courtesy
➡️ Edom's destroyers will leave nothing at all

---

## 😮 How Are The Things Of Esau Searched Out

This line reads like a cry of shock, not a calm statement.

Esau here simply means Edom, since Esau was the nation's ancestor.

Searched out means every hidden treasure will be found and taken.

Nothing stored away in secret will survive this search.

Edom trusted its hidden wealth the same way it trusted its high cliffs.

Both trusts will fail at the same time.

😮 The line reads like a cry of shock
🏺 Searched out means hidden treasure gets found
💰 Edom trusted wealth the way it trusted height
📖 Both false securities fail together

---

## 🤝 All The Men Of Thy Confederacy Have Brought Thee Even To The Border

A confederacy is a group of nations joined together by treaty.

These were Edom's own partners and allies.

Instead of protecting Edom, they walk Edom straight to its own border.

This likely pictures Edom being driven out or handed over.

The people Edom trusted for safety become the ones pushing it toward disaster.

🤝 Confederacy means treaty partners and allies
🚪 Allies drive Edom to its own border
💔 Trusted partners turn into the danger
📖 Safety came from the wrong place

---

## 🍞 They That Eat Thy Bread Have Laid A Wound Under Thee

Sharing bread at the same table was a sign of deep loyalty.

It meant something close to a personal promise of friendship.

These are not strangers turning on Edom.

They are the closest companions, the ones who ate at Edom's own table.

A wound laid under someone pictures a hidden trap, not an open attack.

Betrayal from that close is the sharpest kind there is.

🍞 Sharing bread meant a bond of loyalty
🫂 These are close companions, not strangers
🪤 A hidden wound means a hidden trap
📖 Betrayal from a friend cuts deepest

---

## 🧠 There Is None Understanding In Him

Edom's region had a reputation for producing wise men.

One of Job's friends, Eliphaz, was a Temanite from this same area.

Yet here, at the moment that matters most, no wisdom shows up.

Edom cannot see the trap closing around it.

Wisdom that cannot see betrayal coming is not real wisdom at all.

🧠 Edom's region was known for wise men
📖 Job's friend Eliphaz came from this area
👁️ Edom cannot see the trap closing
➡️ Wisdom that misses betrayal was never wisdom

# Obadiah 1:8-11
# ⚖️ Violence Against A Brother
---
## 🔗 Destroy The Wise Men Out Of Edom

This judgment matches the sin named just one verse earlier.

Edom was proud of its wisdom and understanding.

That exact reputation is what God says He will remove.

The punishment is not random.

It targets the very thing Edom trusted in most.

🔗 This judgment matches the earlier sin
🧠 Edom was proud of its wisdom
🎯 God removes the thing Edom trusted
📖 The punishment fits the pride exactly

---

## 📍 O Teman

Teman was a clan and region within the land of Edom.

It was named after a grandson of Esau.

Naming Teman here stands in for the whole nation of Edom.

It works the same way a nickname for a country works today.

The message is not aimed at one small town.

It covers all of Edom at once.

📍 Teman was a clan within Edom
👤 It was named after Esau's grandson
🌍 Teman here stands for all of Edom
📖 The warning covers the whole nation

---

## 😨 Thy Mighty Men Shall Be Dismayed

Dismayed means struck with sudden fear and confusion.

These are Edom's own trained soldiers, not ordinary people.

Even they will lose their nerve when the moment comes.

Edom trusted its mountains, its wisdom, and its warriors.

This verse strips away the third leg of that confidence.

None of Edom's usual strengths will hold up.

😨 Dismayed means struck with sudden fear
⚔️ These are Edom's own trained soldiers
🏔️ Edom trusted mountains, wisdom, and warriors
📖 None of those strengths will hold

---

## 👬 Thy Violence Against Thy Brother Jacob

Jacob here means the nation of Israel, Jacob's own descendants.

Esau and Jacob were twin brothers born to Isaac and Rebekah.

That makes Edom and Israel family, not just neighboring nations.

Violence against a stranger is one kind of sin.

Violence against a brother is a different, heavier kind.

This is the center of Obadiah's whole charge against Edom.

👬 Jacob and Esau were twin brothers
🏠 Edom and Israel are family, not strangers
⚖️ Violence against family is a heavier sin
📖 This is the center of the charge

---

## ✂️ Shame Shall Cover Thee, And Thou Shalt Be Cut Off For Ever

Cut off is a common Old Testament phrase for complete removal.

It does not just mean a lost battle.

It means an end to a people's future altogether.

Shame covering someone pictures disgrace wrapping around them like a garment.

Both images point to the same outcome.

Edom's story, as a nation, comes to a final close.

✂️ Cut off means complete removal
🧥 Shame is pictured like a covering garment
⏳ This is an end, not just a loss
📖 Edom's story closes for good

---

## 📅 In The Day That The Strangers Carried Away Captive His Forces

This points to a real historical moment, not a vague idea.

Many scholars connect it to Babylon's destruction of Jerusalem.

That siege happened in the early sixth century before Christ.

Judah's own army was defeated and its people taken captive.

Edom was watching this exact disaster happen to its relative.

What Edom did during that watching is what this chapter judges.

📅 This points to a real historical siege
🏛️ Many scholars connect it to Babylon
⚔️ Judah's army was defeated that day
📖 Edom's reaction during this day is judged

---

## 🎲 Cast Lots Upon Jerusalem

Casting lots was a way of dividing property by random chance.

It is the same method later used to divide Jesus's clothing at the cross.

Here it means Jerusalem itself, and its people, were treated like loot to divide.

A city full of people became a pile of goods to split up.

That is how far the invaders' disrespect went.

🎲 Casting lots divided goods by chance
🏛️ Jerusalem's people were treated as loot
🧵 The same method appears again at the cross
📖 People were reduced to property to divide

---

## 👁️ Even Thou Wast As One Of Them

This is the sharpest line in the whole section.

Edom did not just stand by and watch quietly.

Edom acted the same way the invading enemies acted.

Family became indistinguishable from the attackers.

That single choice is why this short book exists.

👁️ Edom did not just watch quietly
🤝 Edom acted like the invaders themselves
💔 Family blurred into enemy that day
📖 That choice is why this book exists

# Obadiah 1:12-14
# 🚫 What Edom Should Never Have Done
---
## 👀 Thou Shouldest Not Have Looked On The Day Of Thy Brother

Looked here does not mean a simple glance.

It means watching with satisfaction, almost enjoying the sight.

The day of thy brother means the day Judah fell into disaster.

Edom is being charged for its reaction, not only its actions.

Even just watching with pleasure counted as taking part.

👀 Looked here means watching with satisfaction
😊 It was enjoyment, not a simple glance
🔍 Edom is charged for its reaction
📖 Watching with pleasure still counted as guilt

---

## 🎉 Neither Shouldest Thou Have Rejoiced Over The Children Of Judah

Rejoicing goes one step further than simply watching with satisfaction.

It means actively celebrating someone else's downfall.

Judah's own suffering became Edom's entertainment.

This is the kind of reaction a true brother would never have.

Family grief should never turn into a family party.

🎉 Rejoicing means active celebration, not just watching
😢 Judah's suffering became Edom's entertainment
🚫 No true brother celebrates like this
📖 Family grief is not a family party

---

## 🗣️ Neither Shouldest Thou Have Spoken Proudly In The Day Of Distress

Speaking proudly here means mocking words aimed at someone already suffering.

This is cruelty aimed at someone already down.

Distress describes Judah's lowest, most painful moment.

Choosing that exact moment to boast reveals real cruelty.

Words can wound just as deeply as weapons.

🗣️ Speaking proudly means mocking the suffering
⬇️ This is cruelty aimed at someone already down
😖 Distress describes Judah's lowest moment
📖 Words can wound as deeply as weapons

---

## 🚪 Thou Shouldest Not Have Entered Into The Gate Of My People

A city's gate was its main entrance and its last line of defense.

Defenders made their final stand right at the gate.

Entering the gate means Edom joined the actual invasion.

This moves Edom from a bystander into an active attacker.

Watching from a distance is one sin.

Walking through the gate is another.

🚪 The gate was a city's last defense
⚔️ Entering the gate meant joining the attack
➡️ Edom moved from bystander to attacker
📖 Watching and invading are different sins

---

## 💰 Nor Have Laid Hands On Their Substance

Substance here simply means property, goods, and wealth.

Laying hands on it means taking it for yourself.

Edom did not just witness the looting of Jerusalem.

Edom joined in and carried goods away too.

Taking from a grieving family is its own kind of cruelty.

💰 Substance means property and goods
🤲 Laying hands on it means taking it
📦 Edom joined in the looting itself
📖 Taking from grief adds a new cruelty

---

## 🛤️ Neither Shouldest Thou Have Stood In The Crossway

A crossway is a crossroads, a place where roads and escape routes meet.

People fleeing Jerusalem would have run through places exactly like this.

Standing there turned Edom into a trap rather than a place of safety.

Family is supposed to be the place someone runs toward for safety.

Edom became the opposite of that for its own relatives.

🛤️ A crossway is a crossroads or escape route
🏃 Refugees fled through places like this
🪤 Edom became a trap, not a refuge
📖 Family should be safety, not a trap

---

## 🏃 Neither Shouldest Thou Have Delivered Up Those Of His That Did Remain

Those that remain means the survivors who managed to escape the siege.

Delivered up means Edom handed survivors back to the enemy.

This breaks one of the oldest, most basic customs of hospitality.

A fleeing refugee was supposed to find safety, not betrayal.

Every verse in this short section describes one more layer of the same betrayal.

🏃 Those that remain means the survivors
🤝 Delivered up means handing them to the enemy
🏠 This breaks basic hospitality customs
📖 Each verse adds one more layer of betrayal

# Obadiah 1:15-18
# 🔥 The Day Of The LORD Turns The Tables
---
## 📅 The Day Of The LORD Is Near Upon All The Heathen

The day of the LORD is a phrase that shows up again and again in the prophets.

It describes a coming moment when God steps in to judge directly.

This is not only about Edom anymore.

Every nation that acted this way will face the same day.

Obadiah's message was always bigger than one quarrel between two brothers.

📅 Day of the LORD means God's direct judgment
🌍 It applies to every nation, not only Edom
📖 The message is bigger than one family quarrel
➡️ Judgment on Edom previews judgment on all

---

## ⚖️ As Thou Hast Done, It Shall Be Done Unto Thee

This line states a simple rule of justice.

Whatever Edom did to Judah will now happen back to Edom.

Reward here is not a gift, it is a consequence.

The phrase upon thine own head pictures the result landing right back where it started.

Measure for measure, the punishment matches the crime exactly.

⚖️ Whatever Edom did returns to Edom
🎯 Reward here means consequence, not gift
🔄 It lands back where it started
📖 The punishment matches the crime exactly

---

## 🍷 For As Ye Have Drunk Upon My Holy Mountain

Drinking here pictures the invaders celebrating on God's holy mountain.

My holy mountain means Mount Zion, the site of the temple in Jerusalem.

The attackers treated a conquered holy place like a party.

The prophets often picture coming judgment as a cup that must be drunk.

Now that same cup gets passed to the nations who celebrated first.

🍷 Drinking pictures the invaders celebrating
🏛️ My holy mountain means Mount Zion
🎉 A holy place was treated like a party
📖 The same cup now passes to them

---

## 💨 They Shall Be As Though They Had Not Been

This line describes complete disappearance, not just defeat.

It is as if these nations had never existed at all.

That is a far heavier outcome than losing a war.

Edom's own judgment, named earlier, fits this same pattern exactly.

Total pride meets total removal.

💨 This means complete disappearance, not defeat
⚖️ It matches Edom's own earlier judgment
🔚 Total pride meets total removal
📖 Nothing remains to prove they existed

---

## 🔄 Upon Mount Zion Shall Be Deliverance, And There Shall Be Holiness

This verse flips the picture from the one just before it.

Mount Zion was just described as a place of drunken celebration by invaders.

Now it becomes a place of rescue and of holiness instead.

Holiness here means being set apart for God's own purpose.

The same mountain that was mocked becomes the place where mercy starts.

🔄 This flips the picture from the verse before
🛡️ Deliverance means rescue for God's people
✨ Holiness means set apart for God
📖 Mercy starts on the mountain that was mocked

---

## 🏠 The House Of Jacob Shall Possess Their Possessions

House of Jacob is another name for the people of Israel.

Possess their possessions means reclaiming what once belonged to them.

This recalls the much older promise God made about the land.

What was lost in conquest and exile is promised back.

The promise outlasts the disaster.

🏠 House of Jacob means the people of Israel
🗺️ Possessions here means the promised land
📜 This recalls God's older promise
📖 The promise outlasts the disaster

---

## 🔥 The House Of Jacob Shall Be A Fire, And The House Of Joseph A Flame

House of Jacob can mean the whole nation of Israel together.

House of Joseph points more specifically to the northern tribes, Ephraim and Manasseh.

Naming both groups together pictures a reunited people, not a divided one.

Fire and flame are two pictures of the same consuming judgment.

Edom is about to be on the receiving end of both.

🔥 House of Jacob means Israel as a whole
🕯️ House of Joseph means the northern tribes
🤝 Together they picture a reunited people
📖 Fire and flame both mean judgment

---

## 🌾 The House Of Esau For Stubble

Stubble is the dry leftover plant stalks left standing after a harvest.

It catches fire instantly and burns completely within moments.

House of Esau simply means the nation of Edom again.

Comparing Edom to stubble pictures how fast and total its end will be.

There is nothing slow or uncertain about this image.

🌾 Stubble is dry leftover plant stalks
🔥 Stubble burns fast and completely
🏠 House of Esau means Edom
📖 The image pictures a fast, total end

---

## 🔚 There Shall Not Be Any Remaining Of The House Of Esau

This is the flattest, final statement in the whole judgment section.

No remaining means no survivors and no future as a nation.

The chapter does not end on human power or possibility.

It ends with the LORD's own word standing behind it.

For the LORD hath spoken it means the outcome is certain, not a guess.

🔚 No remaining means no future as a nation
🗣️ The LORD's own word stands behind this
✅ The outcome is certain, not a guess
📖 Human power never decided this outcome

# Obadiah 1:19-21
# 👑 The Kingdom Shall Be The LORD'S
---
## 🏜️ They Of The South Shall Possess The Mount Of Esau

The south here refers to the Negev, the dry region in southern Judah.

People from that region will now take over Edom's own mountain territory.

This is a direct reversal of what happened earlier in the chapter.

Edom once took pleasure in watching Judah fall.

Now Judah's people take Edom's land instead.

🏜️ The south means the Negev region
🔄 This reverses what happened earlier
🏔️ Judah's people now take Edom's land
📖 The watcher becomes the one watched

---

## 🌾 They Of The Plain The Philistines

The plain refers to the Shephelah, the lowlands near the coast.

That region bordered the land of the Philistines, a longtime rival of Israel.

This verse pictures Israel expanding into old enemy territory on more than one side.

Edom was not the only historic rival losing ground.

Restoration here reaches in every direction at once.

🌾 The plain means the Shephelah lowlands
⚔️ Philistines were a longtime rival nation
🧭 Restoration reaches in more than one direction
📖 More than one old enemy loses ground

---

## 🗺️ They Shall Possess The Fields Of Ephraim, And The Fields Of Samaria

Ephraim and Samaria both point to the territory of the former northern kingdom.

That kingdom had already fallen to Assyria long before this chapter was written.

Naming it here pictures a future where the divided nation comes back together.

This promise is not limited to Judah alone in the south.

It reaches toward the people who were scattered earlier too.

🗺️ Ephraim and Samaria mean the northern kingdom
⚔️ That kingdom already fell to Assyria earlier
🤝 This pictures a reunited, undivided nation
📖 The promise reaches the scattered as well

---

## 🏞️ Benjamin Shall Possess Gilead

Gilead was a region east of the Jordan river, known for rugged hills.

Benjamin was a small tribe that lived west of the Jordan near Jerusalem.

A small western tribe expanding across the river pictures growth beyond its usual borders.

Every tribe named in this section gains ground it did not hold before.

The restoration described here is wide, not narrow.

🏞️ Gilead was hill country east of the Jordan
📍 Benjamin was a small tribe near Jerusalem
📈 A small tribe here gains new ground
📖 This restoration is wide, not narrow

---

## ⛓️ Even Unto Zarephath

Captivity here does not mean the people are still enslaved.

It describes the very group that had been taken into exile.

That same group is promised land all the way up to Zarephath.

Zarephath was a Phoenician town on the coast, far north of Israel.

It is the same town where the prophet Elijah once stayed with a widow.

Their future territory stretches past their old borders by a wide margin.

⛓️ Captivity means the exiled people themselves
🗺️ Zarephath was a coastal town far north
📖 Elijah once stayed there with a widow
➡️ Their future territory stretches past the old borders

---

## 🏙️ The Captivity Of Jerusalem, Which Is In Sepharad

This verse names a second group of exiles, the people carried off from Jerusalem.

Sepharad names the place where they had been taken.

Scholars are not fully certain which place this refers to today.

Some connect it to a region in Asia, others to a location further east.

What stays certain, even without the exact location, is the promise of return.

🏙️ A second exiled group is named here
📍 Sepharad names their place of exile
❓ Scholars are not certain of the exact location
📖 The promise of return stays certain either way

---

## 🛡️ Saviours Shall Come Up On Mount Zion To Judge The Mount Of Esau

Saviours here does not describe one single rescuer.

It describes deliverers God raises up, much like the judges from Israel's earlier history.

These leaders will carry out justice specifically against Edom.

Judge here means setting things right, not merely punishing.

God does not leave justice undone forever.

He raises up people to carry it out.

🛡️ Saviours means deliverers, not one single hero
⚖️ Judge means setting things right
👥 These recall judges from Israel's earlier history
📖 God raises people up to finish justice

---

## 👑 The Kingdom Shall Be The LORD'S

This is the last line of the whole book, and its real point.

Every empire mentioned in this chapter rises and falls.

Edom's pride, Israel's exile, every nation's claim to power, all of it passes.

Only one kingdom is named as permanent.

Obadiah's short, sharp message about one proud nation ends by pointing past that nation.

It ends by pointing straight at God.

👑 This is the final line of the book
📉 Every human kingdom in this chapter falls
⏳ Only one kingdom is called permanent
📖 The whole book ends pointing at God
`.trim();

export const OBADIAH_1_PERSONAL_SECTIONS = parseObadiahOneRawNotes(OBADIAH_ONE_RAW_NOTES);
