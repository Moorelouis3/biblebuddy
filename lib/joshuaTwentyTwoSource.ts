export type JoshuaTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaTwentyTwoRawNotes(rawText: string): JoshuaTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 22:${startVerse}` : `Joshua 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Joshua 22 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_TWENTY_TWO_RAW_NOTES = `# Joshua 22:1-6
# 🏕️ Joshua Sends The Eastern Tribes Home
---
## 🗺️ The Reubenites, And The Gadites, And The Half Tribe Of Manasseh

These three groups asked Moses for land east of the Jordan River, long before Israel crossed into Canaan.

That request is recorded back in the book of Numbers.

They agreed to leave their own families behind and fight alongside the other tribes first.

"Half tribe of Manasseh" means one branch of that family settled east.

The rest of that same family settled west.

Years of fighting on someone else's land are finally over in this chapter.

🗺️ These tribes settled east of the Jordan
📜 Numbers records their original request
👨‍👩‍👧 Manasseh split into two branches
📖 Their years of fighting are now over

## 🪖 Ye Have Not Left Your Brethren These Many Days Unto This Day

"These many days" means years, not a short visit.

Many scholars believe the conquest recorded in this book lasted around seven years.

The eastern tribes fought that whole time for land that was never going to be theirs.

Every other tribe already had a home.

These men were still away from their own families.

That kind of sacrifice deserved to be named out loud before they left.

🪖 These many days means several years
📅 The conquest lasted around seven years
👨‍👩‍👧 They fought for land not their own
📖 Joshua names their sacrifice before they leave

## 🕊️ The LORD Your God Hath Given Rest Unto Your Brethren

"Rest" here means safety from war, the same word used at the end of chapter twenty one.

That rest was the whole reason these tribes could finally go home.

Their job of helping conquer the land was actually finished, not just paused.

A promise made generations earlier to Moses was now fully kept.

🕊️ Rest means safety from enemies
🔁 The same word appeared in chapter twenty one
✅ Their assigned task was truly finished
📖 An old promise had now been kept

## 🧭 On The Other Side Jordan

This phrase describes the land east of the Jordan River, not any random direction.

To Israelites standing west of the Jordan, everything east was called "the other side."

That land included Gilead and Bashan, given earlier to these tribes by Moses himself.

Crossing that river again meant truly separating from the rest of the nation.

🧭 The other side means land east of Jordan
🗺️ It included Gilead and Bashan
👴 Moses had already granted them this land
📖 Crossing back meant real separation

## 🤲 To Cleave Unto Him, And To Serve Him

"Cleave" means to hold on tightly and never let go, the same word used for marriage in Genesis.

Joshua's final charge nearly repeats what Moses already commanded years earlier in Deuteronomy.

Love, obedience, and wholehearted service were never meant to be separated from each other.

Living far from the tabernacle would make that charge harder, not less true.

🤲 Cleave means holding on tightly
💍 The same word describes marriage in Genesis
📜 Joshua echoes what Moses already commanded
📖 Distance never excuses wholehearted service

## 🙏 So Joshua Blessed Them, And Sent Them Away

A blessing here was a spoken benediction, calling for God's favor over the road ahead.

Joshua had led this generation through every battle recorded in this book.

This moment marks the last time these particular tribes would stand together as one army.

Saying goodbye well mattered as much as fighting well had.

🙏 A blessing called for God's favor
⚔️ Joshua had led them through every battle
👋 Their last time together as one army
📖 Goodbyes mattered as much as battles

# Joshua 22:7-9
# 💰 Riches And A Long Journey Home
---
## 🗺️ On This Side Jordan Westward

Manasseh was the only tribe split into two separate halves.

Moses had already given the eastern half land in Bashan, across the Jordan.

Joshua now confirms the western half's land, here on the same side as the rest of Israel.

One tribe ended up living in two different places for the rest of its history.

🗺️ Manasseh was split into two halves
🏔️ Moses granted the eastern half Bashan
🏞️ Joshua confirmed the western half's land
📖 One tribe lived in two places

## 💰 Return With Much Riches Unto Your Tents

Joshua sends these tribes home loaded down with wealth from the conquered cities.

Silver, gold, brass, iron, and fine clothing are all listed by name.

This was not a small parting gift.

It was the accumulated plunder of years of victorious campaigns.

💰 They went home wealthy, not empty
🥇 Silver, gold, brass, and iron are named
👕 Fine clothing is listed too
📖 Years of victory filled their hands

## 🤝 Divide The Spoil Of Your Enemies With Your Brethren

"Spoil" means the goods and valuables taken from a defeated enemy.

Joshua commands the fighters to share that wealth with relatives who had stayed behind.

Those who guarded the camps and families never swung a sword in this war.

Everyone still belonged to the same victory.

🤝 Spoil means goods taken from an enemy
👨‍👩‍👧 Fighters shared with those who stayed home
🏕️ Some guarded camps instead of fighting
📖 The victory belonged to everyone

## ⛺ Departed From The Children Of Israel Out Of Shiloh

Shiloh held the tabernacle, Israel's central place of worship at this point in the story.

Leaving from Shiloh meant leaving the nation's spiritual center, not just a campsite.

Their destination was Gilead, the land Moses had already promised them.

This trip retraced the same ground these tribes had crossed years earlier.

⛺ Shiloh held the tabernacle
🕍 They left the nation's worship center
🗺️ Gilead was their final destination
📖 They retraced old, familiar ground

# Joshua 22:10-12
# 🪨 A Great Altar Sparks Alarm
---
## 🪨 Built There An Altar By Jordan, A Great Altar To See To

"To see to" means impressive to look at, a structure built to be noticed from a distance.

This was not a small pile of stones.

The eastern tribes built something massive enough to catch the eye of anyone crossing the river.

Size alone was about to cause a serious problem.

🪨 To see to means visually impressive
📏 This altar was massive, not small
👀 It was built to be noticed
📖 Its size caused the coming trouble

## 🗺️ That Are In The Land Of Canaan

This detail matters more than it first appears.

The altar was built on the western side of the Jordan, still inside Canaan itself.

That exact location is what alarmed the rest of Israel later in the chapter.

A monument built in the wrong spot can look like a claim, even without one intended.

🗺️ The altar stood on the Canaan side
📍 Location made this look suspicious
⚠️ A wrong spot can imply a wrong claim
📖 Placement set up the whole conflict

## 🚶 At The Passage Of The Children Of Israel

"Passage" means the crossing point Israel had used to enter the Promised Land.

Building at that exact spot made the altar impossible to miss.

Word of it reached the rest of Israel almost immediately.

News like this traveled fast in a nation still watching closely for any sign of unfaithfulness.

🚶 Passage means the crossing point
📍 The altar sat right at that spot
📢 News spread through Israel quickly
📖 Israel watched closely for unfaithfulness

## ⚔️ Gathered Themselves Together At Shiloh, To Go Up To War

This reaction was not a small complaint.

The entire nation assembled, ready to fight fellow Israelites over an altar.

Deuteronomy had already commanded Israel to respond as one body against idolatry inside its own camp.

They were prepared to treat this exactly like that kind of threat.

⚔️ All Israel gathered, ready for war
🇮🇱 They were prepared to fight their own
📜 Deuteronomy required a united response to idolatry
📖 They treated this as that same threat

# Joshua 22:13-15
# 🤝 Phinehas Leads A Delegation
---
## 🕯️ Phinehas The Son Of Eleazar The Priest

Phinehas already appears earlier in Israel's story, in the book of Numbers.

He once stopped a deadly plague by acting decisively against open idolatry in the camp.

Sending a priest, not a general, shows Israel treated this as a matter of worship first.

The most zealous man for God's honor was the right choice for this exact mission.

🕯️ Phinehas already appears in Numbers
🛑 He once stopped a plague through decisive action
⚖️ A priest led, not a general
📖 Worship, not war, was the real issue

## 👑 With Him Ten Princes, Of Each Chief House A Prince

Israel sent one leader from every tribe still west of the Jordan, ten in total.

This was not one angry group acting alone.

The whole nation stood behind this delegation, not just a few offended neighbors.

A unified response carried far more weight than a single accusation ever could.

👑 One prince came from each tribe
🔟 Ten leaders made up the group
🇮🇱 The whole nation stood behind them
📖 Unity gave the message its weight

## 🗣️ They Spake With Them, Saying

Notice what Israel did not do first.

They did not attack, they sent leaders to ask questions.

Talking before fighting gave the eastern tribes a real chance to explain themselves.

That single choice kept a misunderstanding from turning into a civil war.

🗣️ They spoke before they fought
❓ Questions came before any attack
🕊️ Explanation had a real chance
📖 One choice prevented a civil war

# Joshua 22:16-20
# ⚖️ The Accusation Of Rebellion
---
## ⚖️ What Trespass Is This That Ye Have Committed

"Trespass" means a serious violation, not a small mistake.

The delegation speaks for "the whole congregation of the LORD," not for themselves alone.

That phrase makes clear this was Israel's official response, not gossip or rumor.

The accusation was as serious as language in this culture could get.

⚖️ Trespass means a serious violation
🗣️ They spoke for the whole congregation
📜 This was an official response
📖 The words carried maximum weight

## 💔 Is The Iniquity Of Peor Too Little For Us

Peor refers to a specific earlier failure, recorded in the book of Numbers.

Israel had worshipped a foreign god there and been drawn into sin with Moabite women.

A plague followed that sin and killed thousands of Israelites.

"Not cleansed until this day" shows how deep that old guilt still ran, years later.

💔 Peor recalls Israel's worship of a foreign god
📜 Numbers records that whole failure
☠️ A plague followed and killed thousands
📖 That old guilt still felt recent

## 🔥 To Morrow He Will Be Wroth With The Whole Congregation

"Wroth" means intensely angry, more than simple irritation.

This fear was not really about one new altar on its own.

It was about one tribe's sin bringing punishment down on every tribe at once.

In Israel's understanding, sin was never treated as private.

🔥 Wroth means intense anger
😟 One sin could bring shared punishment
🇮🇱 The whole nation felt exposed
📖 Sin was never treated as private

## 🚫 If The Land Of Your Possession Be Unclean

The delegation raises an unexpected possibility.

Maybe the eastern tribes felt their land, outside Canaan's actual border, was somehow less holy.

That fear might explain why they would want a substitute altar of their own.

Naming the real fear was smarter than only naming the offense.

🚫 Unclean here means less holy, not dirty
🗺️ Their land sat outside Canaan's true border
😟 That could explain a substitute altar
📖 They named the deeper fear itself

## 🏞️ Pass Ye Over Unto The Land Of The Possession Of The LORD

This is a genuine offer, not just an accusation.

Israel invites the eastern tribes to actually move west and live among them instead.

Their land, their homes, and their years of settling in Gilead were all on the table.

That offer shows the point was unity, not simply punishment.

🏞️ Israel offered them land in the west
🏠 That meant giving up homes already built
🤝 The goal was unity, not punishment
📖 A real offer backed the accusation

## 🪨 Did Not Achan The Son Of Zerah Commit A Trespass

Achan's story is told earlier in this book, in chapter seven.

He secretly kept forbidden plunder after the fall of Jericho.

His hidden sin caused Israel to lose its next battle and cost many lives.

The delegation uses that memory as living proof that one man's sin can wound an entire nation.

🪨 Achan's story is told in chapter seven
🏺 He secretly kept forbidden plunder
⚔️ His sin cost Israel a battle
📖 One person's sin can wound everyone

# Joshua 22:21-25
# 🙏 Their Defense Begins
---
## 🙌 The LORD God Of Gods, The LORD God Of Gods

This title for God is repeated twice in a row.

That kind of repetition never appears anywhere else in the Bible.

Repetition here works like a solemn oath, calling God himself to witness.

The eastern tribes are not simply defending themselves to Israel.

They are appealing directly to God to judge the truth of their own words.

🙌 The title is repeated for emphasis
⚖️ Repetition functions like a solemn oath
🙏 They appeal directly to God as witness
📖 Their defense starts with God, not people

## ⚔️ Save Us Not This Day

This is an extreme statement, not a casual defense.

The eastern tribes ask Israel to let them be destroyed immediately if they are actually guilty.

Nobody hiding real guilt would say something so risky.

Their willingness to accept instant judgment backs up everything they are about to say.

⚔️ They ask to be destroyed if guilty
🙅 No guilty person offers that easily
🤲 Their willingness backs their sincerity
📖 They staked their lives on the truth

## 🔥 If To Offer Thereon Burnt Offering Or Meat Offering

The eastern tribes list the exact uses that would make this altar sinful.

A "burnt offering" was fully consumed by fire as a gift to God.

A "meat offering" was actually a grain offering, not animal meat, despite the old English word.

Naming these specific categories shows they understood exactly what they were being accused of.

🔥 A burnt offering was fully consumed by fire
🌾 A meat offering was actually a grain gift
✅ A precise denial beats a vague one
📖 They knew exactly what they were denying

## 👶 In Time To Come Your Children Might Speak Unto Our Children

This reveals the real motive behind the altar all along.

The eastern tribes were not worried about the present generation forgetting them.

They were worried about grandchildren, generations not even born yet.

A river could someday convince future children they had no place among God's people.

👶 Their real fear was about future generations
🌊 A river could divide identity over time
😟 Grandchildren, not themselves, worried them most
📖 Built for children not yet born

## 🌊 The LORD Hath Made Jordan A Border Between Us And You

The Jordan River was a real, physical boundary between the two groups of tribes.

The eastern tribes feared it could also become an assumed spiritual boundary over time.

"Ye have no part in the LORD" was the exact rejection they feared future generations might hear.

A geographic line was never meant to become a line of belonging.

🌊 Jordan was a real physical border
😟 They feared it becoming a spiritual one
🚫 No part in the LORD was feared
📖 Geography was never meant to define belonging

# Joshua 22:26-29
# 📜 A Witness, Not A Rival Altar
---
## 🪨 Let Us Now Prepare To Build Us An Altar

The eastern tribes finally explain their actual plan.

They openly admit to building the altar, so there is no confusion about the facts.

What they deny is its purpose, not its existence.

"Not for burnt offering, nor for sacrifice" rules out the one use that would have made it sinful.

🪨 They admit building the altar
🚫 It was never meant for sacrifice
✅ Honesty came before their explanation
📖 They deny its purpose, not its existence

## 📜 That It May Be A Witness Between Us, And You

"Witness" here means a physical reminder, something later generations could point to and understand.

The altar functions more like a monument than a place of worship.

Its whole purpose was to prove a future claim, not to offer a single sacrifice.

A stone structure can preach a message long after the people who built it are gone.

📜 A witness is a physical reminder
🪨 It functions as a monument, not worship
⏳ It was built to outlast this generation
📖 Objects can preach long after builders are gone

## 🏛️ Behold The Pattern Of The Altar Of The LORD

"Pattern" means a copy or model built to resemble the original.

The real altar of the LORD stood at Shiloh, in front of the tabernacle.

This eastern altar was built to look like that one, so later generations would recognize the connection.

A visible copy makes a silent argument no spoken explanation could ever fully replace.

🏛️ Pattern means a copy of the original
🕍 The true altar stood at Shiloh
👀 The copy was built to be recognized
📖 A visible copy argues for itself

## 🙅 God Forbid That We Should Rebel Against The LORD

This closing line is their strongest possible denial.

"God forbid" was a common way of rejecting an idea completely, calling it unthinkable.

They specifically name the tabernacle as the LORD's true dwelling, distinct from their own memorial.

Israel had always been meant to worship at one central place, and they affirm that here too.

🙅 God forbid means a complete rejection
⛺ They name the tabernacle as God's true house
🕍 Israel worshipped at one central place
📖 They affirmed that same principle themselves

# Joshua 22:30-34
# 🕊️ Peace Restored And The Altar Named Ed
---
## 😌 It Pleased Them

The explanation worked.

Phinehas and the ten princes were satisfied the moment they heard the full story.

There is no second round of questioning recorded here.

A clear, honest answer ended a conflict that had come dangerously close to war.

😌 The delegation was fully satisfied
🗣️ One honest explanation was enough
🛑 No further questioning followed
📖 Honesty ended a near war

## 👀 This Day We Perceive That The LORD Is Among Us

Phinehas does not just accept their words, he reads a deeper meaning into them.

Their honesty is treated as proof of God's continued presence with the whole nation.

A united, truthful people is itself a sign that God is near.

That connection between honesty and God's presence was worth stating out loud.

👀 Phinehas reads deeper meaning into their words
🙏 Honesty becomes proof of God's presence
🇮🇱 A truthful people signals nearness to God
📖 That connection was worth saying aloud

## 🛡️ Ye Have Delivered The Children Of Israel Out Of The Hand Of The LORD

This phrase sounds strange until it is unpacked.

Phinehas means the eastern tribes have saved all of Israel from God's judgment.

If they truly had rebelled, that sin could have brought punishment on every single tribe.

Their honesty protected people who never even knew they were in danger.

🛡️ They saved Israel from possible judgment
😟 A hidden rebellion could have harmed every tribe
🙏 Their honesty protected the whole nation
📖 Many were protected without knowing it

## ⚔️ Did Not Intend To Go Up Against Them In Battle

The army that had gathered at Shiloh, ready for war, stood down completely.

The children of Israel responded to good news by blessing God, not by celebrating a victory.

There was no victory to celebrate, because there had never been a real enemy.

The best ending to this story was the war that never had to happen.

⚔️ The gathered army stood down
🙏 Israel blessed God instead of fighting
🚫 There was never a real enemy
📖 The best ending was the war avoided

## 🪨 For It Shall Be A Witness

"Ed" is a word that itself means witness.

Naming the altar this way turned its whole purpose into its own name.

Anyone hearing the name later would already know exactly why it existed.

This altar joins other memorial stones in Joshua's story, built only to be remembered, not used.

🪨 Ed means witness
📛 The name explained the altar's whole purpose
🧠 Hearing the name taught the lesson
📖 It joined Joshua's other memorial stones
`.trim();

export const JOSHUA_TWENTY_TWO_PERSONAL_SECTIONS = parseJoshuaTwentyTwoRawNotes(JOSHUA_TWENTY_TWO_RAW_NOTES);
