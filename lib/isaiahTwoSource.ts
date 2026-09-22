export type IsaiahTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahTwoRawNotes(rawText: string): IsaiahTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 2:${startVerse}` : `Isaiah 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 2 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_TWO_RAW_NOTES = `# Isaiah 2:1-4
# ⛰️ The Mountain Of The LORD Exalted
---
## 👁️ The Word That Isaiah The Son Of Amoz Saw

This opening line almost repeats the very first verse of the whole book.

Prophets often used the word saw for a message instead of heard.

It marks a fresh section of Isaiah beginning here, not a brand new book.

Chapters two through four are their own connected message about Judah and Jerusalem.

👁️ Saw describes a received prophetic message

🔁 The wording echoes chapter one closely

📚 It marks a new section starting here

📖 Chapters two through four form one unit
---
## 🔮 In The Last Days

Last days is not a countdown to the end of the world here.

It is a common prophetic phrase pointing to a future era God will bring about.

Isaiah uses it to shift from Judah's present sin to a promised future.

The phrase sets up hope right after chapter one's harsh warnings.

🔮 Last days points to a future era

⏳ Not a literal end of the world

🔀 It shifts from warning to hope

📖 Hope follows right after judgment
---
## 🏔️ The Mountain Of The LORD's House Shall Be Established In The Top Of The Mountains

Mount Zion, where the temple stood, was not physically the tallest mountain around.

This verse pictures its future importance, not its actual height.

Being established at the top pictures the temple rising above every rival place of worship.

God's house will outrank every other mountain that people once looked to instead.

🏔️ Zion was never the tallest mountain

👑 The image pictures importance, not height

🛕 God's house outranks every rival site

📖 True worship will rise above all others
---
## 🌊 All Nations Shall Flow Unto It

Flow pictures a river, water moving steadily toward one place.

Isaiah pictures whole nations moving toward Jerusalem the same way.

This is not one convert but a worldwide stream of people.

The promise reaches far beyond Israel alone.

🌊 Flow pictures a steady river

🌍 Whole nations move toward Jerusalem

👥 Not one convert but a stream of people

📖 The promise reaches beyond Israel alone
---
## ⛰️ Let Us Go Up To The Mountain Of The LORD

People always spoke of going up to Jerusalem no matter which direction they traveled from.

The city sat high in the hill country of Judah.

Going up became the standard way to describe a pilgrimage there.

Even a traveler coming from the north still said they were going up.

⛰️ Jerusalem sat high in the hill country

🚶 Going up describes pilgrimage travel

🧭 True even from the north

📖 The phrase became a fixed pilgrim idiom
---
## 👤 The House Of The God Of Jacob

Jacob is another name for the nation of Israel, not only one ancestor.

God renamed Jacob Israel generations earlier in Genesis.

Calling Him the God of Jacob ties this future hope back to that old promise.

The nations are joining a story that already had a long history.

👤 Jacob is another name for Israel

🔄 God renamed him Israel in Genesis

🔗 The title ties to an old promise

📖 Nations join an already long story
---
## 🛤️ He Will Teach Us Of His Ways, And We Will Walk In His Paths

Ways and paths are pictures for a whole pattern of living, not a literal road.

Learning God's ways means understanding how He wants people to live.

Walking in His paths means actually living that way, not just knowing it.

Both learning and doing are named together on purpose.

🛤️ Ways and paths picture a way of living

📚 Learning means understanding God's pattern

🚶 Walking means actually living it out

📖 Knowing and doing are named together
---
## 📜 Out Of Zion Shall Go Forth The Law

Law here means torah, God's instruction, not only a list of legal rules.

Zion becomes the source that instruction spreads out from.

The next line repeats the same idea using the phrase word of the LORD.

Saying it twice makes sure the reader cannot miss where true teaching comes from.

📜 Law means torah, God's instruction

🏔️ Zion becomes the source of teaching

🔁 The next line repeats the same idea

📖 True teaching flows from one place
---
## ⚖️ He Shall Judge Among The Nations, And Shall Rebuke Many People

This future judge acts over the whole world, not only Israel.

Rebuke means to correct sharply, not just to point out a mistake.

No nation is left outside this authority in the picture.

The scope has grown from one people to every people.

⚖️ Judge means ruling over every nation

📢 Rebuke means a sharp correction

🌍 No nation is left outside His reach

📖 The scope widens to every people
---
## 🌾 Beat Their Swords Into Plowshares, And Their Spears Into Pruninghooks

A plowshare is the blade on a farming plow that turns soil for planting.

A pruninghook is a curved blade used to trim vines and branches.

Both were peaceful farm tools reshaped from the very metal that once made weapons.

Turning weapons into farm tools pictures a complete end to preparing for war.

🌾 Plowshare is a plow blade for farming

🌿 Pruninghook trims vines and branches

⚔️ Both were reshaped from old weapons

📖 The image pictures a total end to war
---
## 🕊️ Nation Shall Not Lift Up Sword Against Nation, Neither Shall They Learn War Any More

This does not describe one truce between two countries.

It describes every nation on earth giving up warfare completely.

They will not even learn war, meaning training for it stops entirely.

Isaiah closes this opening vision on total, permanent peace.

🕊️ Not one truce but total peace

🌍 Every nation gives up warfare

🎓 War stops being taught at all

📖 The vision closes on permanent peace
---
# Isaiah 2:5-9
# 🌏 Full Of Idols From The East
---
## 👥 O House Of Jacob, Come Ye, And Let Us Walk In The Light Of The LORD

House of Jacob again means the whole nation of Israel.

Light pictures God's truth and guidance, the opposite of confusion or sin.

Walking in the light means actually living by that truth every day.

This invitation follows straight from the hopeful vision just described.

👥 House of Jacob means all Israel

💡 Light pictures God's truth and guidance

🚶 Walking means living it out daily

📖 The invitation follows the hopeful vision
---
## 🔀 Thou Hast Forsaken Thy People The House Of Jacob

The tone suddenly shifts from hope to accusation in this verse.

Isaiah is speaking to God about why Judah has drifted so far away.

Forsaken does not mean God abandoned them first.

The nation's own choices are what created this distance.

🔀 The tone shifts from hope to accusation

🗣️ Isaiah speaks directly to God here

🚫 Forsaken does not mean God left first

📖 Judah's own choices caused the distance
---
## 💧 They Be Replenished From The East

Replenished means filled up again, like a well filled back to the top.

The east points toward Mesopotamia and Aram, regions known for pagan customs.

Judah had been soaking up foreign religious practices from that direction.

A nation meant to be set apart was absorbing the very customs God warned against.

💧 Replenished means filled up again

🧭 The east points toward Mesopotamia and Aram

🛐 Judah absorbed foreign religious customs

📖 A set apart nation copied its neighbors
---
## 🔮 Soothsayers Like The Philistines

A soothsayer claims to predict the future using magic instead of God.

The law given through Moses clearly forbid this practice in Israel.

Philistines were longtime enemies of Israel known for this kind of practice.

Judah had picked up the exact practice of the people it should have resisted.

🔮 Soothsayer means a fortune teller

📜 The law forbid this practice

⚔️ Philistines were longtime enemies of Israel

📖 Judah copied the enemy it should resist
---
## 🌍 They Please Themselves In The Children Of Strangers

Children of strangers means people from foreign nations.

Pleasing themselves this way likely points to marriages and alliances with them.

Those alliances usually came bundled with foreign gods and customs.

Judah welcomed exactly the influence it was warned to avoid.

🌍 Strangers means people from foreign nations

🤝 Likely points to foreign marriages and alliances

🛐 Foreign gods came bundled with alliances

📖 Judah welcomed the influence it was warned about
---
## 💰 Their Land Also Is Full Of Silver And Gold, Neither Is There Any End Of Their Treasures

Judah had grown genuinely wealthy by this point in its history.

Silver and gold represent real, measurable prosperity, not exaggeration.

No end of their treasures shows the wealth kept piling up without limit.

This wealth becomes part of the problem the next verses describe.

💰 Judah had grown genuinely wealthy

🥈 Silver and gold were real prosperity

📈 The wealth kept piling up

📖 This wealth becomes part of the problem
---
## 📜 Their Land Is Also Full Of Horses, Neither Is There Any End Of Their Chariots

The law given through Moses warned Israel's king not to multiply horses for himself.

Horses and chariots were the ancient world's most expensive military technology.

Judah had ignored that warning and built up a large military machine.

Trusting in weapons was exactly the kind of trust God warned His people against.

📜 Moses warned against multiplying horses

⚔️ Horses and chariots were costly military power

🚫 Judah ignored that warning

📖 Trusting weapons replaced trusting God
---
## 🗿 Their Land Also Is Full Of Idols

Wealth and weapons were only part of Judah's problem.

Idols filled the land right alongside all that treasure.

An idol is a manmade object worshiped as if it were a real god.

Every kind of security except the true God had taken root in Judah.

🗿 Idols filled the land alongside wealth

🙏 An idol is a manmade false god

🚫 Not the true God being trusted

📖 Every false security had taken root
---
## 🔨 They Worship The Work Of Their Own Hands, That Which Their Own Fingers Have Made

Isaiah points out the plain irony of idol worship here.

A person carved or shaped the idol with their own two hands.

Then that same person bows down to worship what they built.

The object has no more power than the person who made it.

🔨 A person made the idol by hand

🙇 Then bowed down to worship it

🤔 The irony is stated plainly

📖 The idol has no power at all
---
## 📖 The Mean Man Boweth Down, And The Great Man Humbleth Himself

Mean here is an old word for common or lowly, not unkind.

Great man means someone wealthy or powerful in society.

Both the lowest and highest people in Judah bowed to these idols.

Idol worship had spread across every level of society, not just one class.

📖 Mean means common or lowly here

👑 Great man means wealthy or powerful

📊 Idol worship crossed every social class

➡️ No group in Judah stayed innocent
---
## 🗣️ Therefore Forgive Them Not

This is not Isaiah's own personal wish for revenge.

Prophets sometimes spoke this way to state how serious sin truly is.

It declares that this sin deserves real consequences, not automatic pardon.

The line underlines just how far Judah had fallen.

🗣️ Not Isaiah's personal wish for revenge

⚖️ It states how serious the sin is

🚫 Real consequences, not automatic pardon

📖 The line shows how far Judah fell
---
# Isaiah 2:10-17
# ⚡ The Day Of The LORD Upon The Proud
---
## 🪨 Enter Into The Rock, And Hide Thee In The Dust

This pictures people scrambling into caves and burying themselves in the ground.

It describes sheer terror, not a calm retreat.

People will do anything to escape what is coming.

This same image returns twice more before the chapter ends.

🪨 Enter the rock pictures hiding in caves

😱 It describes sheer terror

🏃 People try anything to escape

📖 The image returns twice more later
---
## 😨 For Fear Of The LORD, And For The Glory Of His Majesty

Two reasons for the hiding are named together here.

Fear of the LORD means the terror of facing His judgment.

Glory of his majesty means the sheer weight of who God is.

This exact phrase becomes a refrain repeated later in the chapter.

😨 Fear of the LORD means judgment terror

👑 Glory of majesty means God's sheer weight

🔁 The phrase becomes a repeated refrain

📖 Both reasons are named together
---
## 😏 The Lofty Looks Of Man Shall Be Humbled

Lofty looks pictures a proud, arrogant expression on someone's face.

It is pride showing outwardly, not just felt inside.

That visible pride will be brought down completely.

Nothing about human pride will survive this day untouched.

😏 Lofty looks means visible pride

👀 Pride shown outwardly, not just felt

📉 It will be brought down completely

📖 No pride survives this day untouched
---
## 👑 The LORD Alone Shall Be Exalted In That Day

This line becomes the refrain of the whole section.

It repeats again word for word at the very end of verse seventeen.

Every proud thing named in between gets humbled so this one line can stand true.

Only God remains high when everything else is brought low.

🔁 This line repeats again in verse 17

📉 Everything else gets humbled first

👑 Only God remains high

📖 The refrain frames the whole section
---
## 📅 The Day Of The LORD Of Hosts

Day of the LORD is a fixed prophetic term, not just any ordinary day.

It points to a specific time when God steps in to judge or rescue.

Hosts means armies, both the armies of heaven and of earth.

This day belongs to the commander of every army there is.

📅 Day of the LORD is a fixed term

⚡ It marks a time of divine action

⚔️ Hosts means the armies of heaven and earth

📖 The day belongs to their commander
---
## 📏 Upon Every One That Is Proud And Lofty, And Upon Every One That Is Lifted Up

This verse states the whole chapter's pattern in one line.

Proud and lofty describes anyone who exalts themselves above God.

Brought low means the exact opposite of where they placed themselves.

Everything listed in the verses right after this one falls under this one rule.

📏 States the chapter's pattern in one line

😤 Proud and lofty means self exaltation

📉 Brought low reverses their own position

📖 Everything listed next falls under this rule
---
## 🌲 The Cedars Of Lebanon, That Are High And Lifted Up

Lebanon's cedar trees were famous across the ancient world for their size and strength.

Solomon imported these same cedars to build the temple generations earlier.

They stood for the very best and strongest that nature could produce.

Even the tallest, strongest tree bows under this coming judgment.

🌲 Lebanon's cedars were famous for size

🏛️ Solomon used them to build the temple

💪 They stood for nature's strongest best

📖 Even the strongest tree bows here
---
## 🌳 The Oaks Of Bashan

Bashan was a fertile region east of the Jordan River.

It was known for strong oak trees and well fed cattle.

Naming Bashan's oaks beside Lebanon's cedars covers the best trees on both sides of the land.

Nothing tall or strong is left out of this list.

🗺️ Bashan sat east of the Jordan River

🌳 Known for strong oaks and cattle

🌲 Paired with Lebanon's famous cedars

📖 Nothing strong is left off the list
---
## 🏔️ Upon All The High Mountains, And Upon All The Hills That Are Lifted Up

The list moves from trees to the land itself.

Mountains and hills stand for nature's largest, most permanent looking features.

Even geography that seems unmovable is included in this judgment.

Nothing in creation is too big or too old to be humbled.

🏔️ The list moves to mountains and hills

🪨 They picture nature's most permanent features

🌍 Even geography is included here

📖 Nothing is too big to be humbled
---
## 🗼 Every High Tower

A tower here means a fortified lookout built for defense.

Unlike mountains, a tower is something people build themselves.

The list has shifted from natural things to manmade things.

Human defenses fall under this judgment just as fast as nature does.

🗼 Tower means a fortified lookout

🔨 Towers are manmade, unlike mountains

🔀 The list shifts to human made things

📖 Human defenses fall just as fast
---
## 🧱 Every Fenced Wall

Fenced here means fortified, a wall built thick and strong for protection.

Cities relied on walls like this to survive a siege.

Pairing tower and wall names the two main pieces of ancient city defense.

Neither piece of that defense will hold up on this day.

🧱 Fenced means fortified for protection

🏰 Cities relied on walls to survive

🗼 Paired with the tower named before

📖 Neither defense holds up on this day
---
## ⚓ All The Ships Of Tarshish

Tarshish was likely a distant trading port, possibly located in what is now Spain.

Ships of Tarshish became a general phrase for large, seagoing trade vessels.

These ships carried the wealth that built up Judah's treasures.

Even the far reaching trade routes fall under this judgment.

⚓ Tarshish was likely a distant port

🚢 The phrase means large trade ships

💰 These ships carried Judah's wealth

📖 Even trade routes fall under judgment
---
## 🎨 All Pleasant Pictures

This phrase likely refers to fine imported artwork or decorative craftsmanship.

Scholars are not fully certain of the exact object being described.

Whatever it names, it points to luxury items prized for their beauty.

Even beautiful, expensive things offer no protection on this day.

🎨 Likely means fine imported artwork

❓ Scholars are not fully certain

💎 It points to prized luxury items

📖 Beauty offers no protection here
---
## 🔁 The Loftiness Of Man Shall Be Bowed Down, And The LORD Alone Shall Be Exalted

This verse repeats verse eleven almost word for word.

Isaiah frames the whole list of proud things with the same refrain twice.

Everything named in between gets swept into this one closing line.

Only God is left standing tall when the list ends.

🔁 This verse repeats verse eleven

📚 It frames the whole list with a refrain

📉 Everything named in between is swept in

📖 Only God is left standing tall
---
# Isaiah 2:18-22
# 🦇 Idols Cast To The Moles And Bats
---
## 🚫 And The Idols He Shall Utterly Abolish

Utterly abolish means completely and totally destroyed, with nothing left behind.

This is not a partial reform or a gradual decline in idol worship.

Every idol named across this whole chapter falls under this one sentence.

The false gods that filled the land in verse eight are erased entirely.

🚫 Utterly abolish means totally destroyed

⚡ Not a partial reform or decline

🗑️ Every idol from the chapter is included

📖 The false gods are erased entirely
---
## 🪨 They Shall Go Into The Holes Of The Rocks, And Into The Caves Of The Earth

This repeats the same hiding image from verse ten almost exactly.

People are still fleeing into caves and holes in the ground.

Repeating the image this many times makes the terror impossible to miss.

The fear described earlier has not lessened at all.

🔁 Repeats the hiding image from verse ten

🪨 People flee into caves and holes

😱 Repetition makes the terror clear

📖 The fear has not lessened at all
---
## ⚡ When He Ariseth To Shake Terribly The Earth

Ariseth pictures God standing up to act, the way a judge rises to speak.

Shake terribly the earth describes a violent, cosmic level disturbance.

This is bigger than a local war or a natural disaster.

The whole created order responds when God finally moves.

⚡ Ariseth pictures God rising to act

🌍 Shake terribly means cosmic disturbance

📏 Bigger than any local war

📖 Creation responds when God moves
---
## 🦇 A Man Shall Cast His Idols Of Silver And Gold To The Moles And To The Bats

Moles and bats both live in dark, hidden places underground or in caves.

Throwing idols there means abandoning them somewhere no one will ever look again.

Objects once treasured as silver and gold become discarded junk.

The very people who once worshiped them are the ones throwing them away.

🦇 Moles and bats live in dark places

🕳️ Idols get abandoned where no one looks

🗑️ Treasured objects become discarded junk

📖 Worshipers throw away their own idols
---
## 🔨 Which They Made Each One For Himself To Worship

This repeats the same irony named earlier in verse eight.

Each person had shaped their own idol with their own hands.

Now that same person is the one discarding it in the dark.

The maker finally sees the idol for exactly what it always was.

🔨 Repeats the irony from verse eight

🙋 Each person made their own idol

🗑️ Now that person discards it

📖 The maker finally sees the truth
---
## ⛰️ To Go Into The Clefts Of The Rocks, And Into The Tops Of The Ragged Rocks

This is the third time this exact hiding image appears in one chapter.

Clefts means narrow cracks or splits in the rock face.

Ragged rocks pictures jagged, uneven cliffs far from any comfort.

Isaiah repeats the image three times so no reader can miss how real this fear is.

🔁 Third time this image appears

🪨 Clefts means narrow cracks in rock

⛰️ Ragged rocks means jagged, uneven cliffs

📖 Repetition drives home the real fear
---
## 🛑 Cease Ye From Man, Whose Breath Is In His Nostrils

Cease from man means stop putting your trust in human power.

Breath in his nostrils is an old way of describing something fragile and temporary.

A single missing breath ends a human life completely.

Trusting something that fragile instead of trusting God never made sense.

🛑 Cease from man means stop trusting people

💨 Breath in the nostrils pictures fragility

⏳ One missing breath ends a life

📖 Fragile trust was never sensible
---
## ❓ For Wherein Is He To Be Accounted Of

This closing question expects an obvious answer, not much at all.

Compared to the eternal God just described, human power looks small.

The whole chapter has been building toward this exact conclusion.

Real security was never found in man, only in the LORD who remains exalted.

❓ The question expects an obvious answer

📏 Human power looks small by comparison

🏗️ The chapter builds toward this point

📖 Real security is found only in God
`.trim();

export const ISAIAH_TWO_PERSONAL_SECTIONS = parseIsaiahTwoRawNotes(ISAIAH_TWO_RAW_NOTES);
