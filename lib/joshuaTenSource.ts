export type JoshuaTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaTenRawNotes(rawText: string): JoshuaTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 10:${startVerse}` : `Joshua 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Joshua 10 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_TEN_RAW_NOTES = `# Joshua 10:1-5
# 😨 Five Kings Unite Against Gibeon
---
## 👑 Adonizedec King Of Jerusalem

Adonizedec means lord of righteousness in Hebrew.

That title feels strange for a king about to fight against Israel.

Genesis fourteen already named a King Melchizedek ruling this same region.

Melchizedek means king of righteousness, almost the same title in reverse.

Jerusalem carried a link to righteousness long before this moment.

👑 Adonizedec means lord of righteousness
🤔 An odd title for God's enemy
📜 Melchizedek held a similar title earlier
📖 Jerusalem's name carried old meaning

## 🕊️ Had Made Peace With Israel

This peace treaty is the one Gibeon secured through deception in chapter nine.

Israel kept the sworn oath even after learning the truth.

That kept promise now makes Gibeon a marked target.

Neighboring kings see an ally lost to Israel, not a lucky escape.

🕊️ This treaty came from chapter nine
🤝 Israel kept the oath anyway
🎯 Gibeon becomes a marked target
📖 One kept promise now draws war

## 😨 They Feared Greatly

Fear here is not simple nervousness.

It describes real panic among experienced rulers.

Two Canaanite cities had already fallen without much resistance.

A third power, Gibeon, had just left the coalition entirely.

These kings were reacting to a pattern, not one single loss.

😨 Fear here means real panic
🏚️ Two cities had already fallen
🚪 Gibeon had already defected
📖 Kings reacted to a pattern

## 👑 As One Of The Royal Cities

This does not mean Gibeon still had its own king.

Joshua chapter nine shows Gibeon ruled by elders instead.

Royal city here compares its size and importance to a capital.

Gibeon carried the weight of a capital without a king's throne.

Losing an ally that strong was a serious blow.

👑 Gibeon had no king of its own
🏛️ Elders governed the city instead
🏙️ Royal city means capital sized
📖 Losing this ally mattered greatly

## 🗺️ Hoham, Piram, Japhia, And Debir

These four kings ruled Hebron, Jarmuth, Lachish, and Eglon.

Each city sat in the hill country south of Jerusalem.

One king here shares his name with the city Debir, named later in this chapter.

That repeated name is a coincidence, not the same place.

Five separate rulers were about to act as one army.

🗺️ Four kings ruled four separate cities
⛰️ All sat in the southern hills
🔀 A king and later city share a name
📖 Five rulers act as one army

## 🏛️ The Five Kings Of The Amorites

Amorites here works as a broad label for Canaan's hill country peoples.

Genesis and Deuteronomy also use the same word for one specific tribe among many.

The Bible sometimes uses the name narrowly and sometimes as a general regional term.

🏛️ Amorites labels Canaan's hill peoples broadly
📜 Genesis uses the same word narrowly elsewhere
🔀 One word carries two different scopes
📖 Context decides which meaning applies

## ⚔️ Encamped Before Gibeon, And Made War Against It

Encamped means the armies set up a full siege position outside the city.

This was not a raid or a quick strike.

The coalition intended to surround Gibeon and starve out its resistance.

Gibeon's plea for help in the next verse comes from real danger.

⚔️ Encamped means a full siege
🏙️ Gibeon faced surrounding armies
⏳ A siege takes time to work
📖 Gibeon's danger was real and urgent

# Joshua 10:6-11
# ⚡ The LORD Fights With Hailstones
---
## 🆘 Slack Not Thy Hand From Thy Servants

Slack means to hold back or delay.

Gibeon reminds Joshua of the treaty and asks for quick help.

The same nation that once deceived Israel now depends completely on Israel's word.

Keeping the earlier oath is about to cost Israel something real.

🆘 Slack means to hold back
🤝 Gibeon calls on the treaty
⚖️ Trust now runs both directions
📖 Keeping the oath will cost something

## 🛡️ All The Mighty Men Of Valour

Valour means proven courage shown in real combat, not just physical strength.

Mighty men of valour describes Israel's most experienced, battle tested soldiers.

Joshua brought his best forces for this urgent overnight march.

🛡️ Valour means proven combat courage
💪 These were Israel's most experienced fighters
🏃 Joshua brought his best for this march
📖 Urgency called for the strongest force

## 🌙 Went Up From Gilgal All Night

Gilgal to Gibeon covers about twenty miles of steep hill country.

Marching that distance overnight was an extreme physical effort.

Surprise mattered more than rest for this rescue.

Joshua's army arrived exhausted but unexpected.

🌙 The march happened overnight
🥾 About twenty miles of hill country
😴 The army arrived exhausted
📖 Surprise mattered more than rest

## 🛡️ Fear Them Not, For I Have Delivered Them Into Thine Hand

God gives Joshua this promise before the battle even starts.

Delivered into thine hand means the outcome is already settled.

Joshua's confidence comes from this word, not from the size of his army.

The coalition of five kings never had a real chance.

🛡️ God promises victory before battle
🔓 Delivered means the outcome is settled
💪 Confidence came from God's word
📖 The five kings had no real chance

## ⚡ The LORD Discomfited Them

Discomfited means thrown into panic and confusion, not just defeated.

The coalition's army broke apart in the chaos.

Fear had driven this coalition together.

That same fear now scattered it completely.

⚡ Discomfited means panic and confusion
💥 Their army broke apart quickly
😨 Fear built this coalition
📖 That same fear destroyed it

## 🛣️ Chased Them Along The Way That Goeth Up To Bethhoron

Bethhoron sat on a steep pass leading down from the hill country.

Retreating armies had to funnel through this narrow route.

A defeated army trapped on a narrow slope cannot regroup or hide.

The terrain itself became part of Israel's victory.

🛣️ Bethhoron sat on a steep pass
🏔️ Retreating armies had nowhere to spread out
🏃 A narrow slope prevents regrouping
📖 The land itself helped Israel win

## ⛈️ The LORD Cast Down Great Stones From Heaven

These great stones were an unusual, deadly hailstorm.

The text is careful to credit the LORD directly, not the weather.

More enemy soldiers died from these hailstones than from Israel's swords.

God fought this battle in a way no human army could copy.

⛈️ Great stones means an unusual hailstorm
☝️ The text credits the LORD directly
⚔️ Hail killed more than swords did
📖 God fought in a way armies could not

# Joshua 10:12-14
# ☀️ The Sun Stands Still
---
## ☀️ Sun, Stand Thou Still Upon Gibeon

Joshua speaks this command out loud in front of the entire nation.

He asks the sun itself to stop its normal course.

No earlier person in the Bible had ever prayed a request this large.

This is not a quiet, private prayer.

☀️ Joshua commands the sun itself
📢 He speaks it before all Israel
🆕 No one had prayed this big before
📖 This was a public, bold request

## 👀 In The Sight Of Israel

This detail means the entire army watched the sun's position all day.

A private miracle could be doubted or explained away later.

A miracle witnessed by an entire nation could not be quietly dismissed.

👀 The whole army witnessed this event
🚫 A private miracle invites doubt
🇮🇱 A national miracle could not be dismissed
📖 Public witnesses protected the true story

## 🌕 And Thou, Moon, In The Valley Of Ajalon

Ajalon was a valley northwest of Gibeon, along the enemy's escape route.

Naming both the sun and the moon covers day and night together.

Joshua is asking for more usable daylight to finish the pursuit.

🌕 Ajalon lay along the escape route
🌗 Sun and moon together cover day and night
⏳ Joshua wanted more daylight
📖 More time meant a complete victory

## 📜 Is Not This Written In The Book Of Jasher

The book of Jasher was a separate ancient record, now lost to history.

It is named here and in one other place in the Old Testament.

This verse is not part of Joshua's own writing.

Someone compiling the book later added this note as a source citation.

📜 Jasher was a separate ancient record
📕 That book no longer survives today
✍️ A later editor added this note
📖 It functions as a source citation

## 🕰️ Hasted Not To Go Down About A Whole Day

Hasted not means it did not hurry along its normal path.

The daylight lasted about as long as two normal days combined.

Scholars debate whether this describes the earth slowing or an unusual optical effect.

The text does not explain the mechanism, only the result.

🕰️ Hasted not means it did not hurry
⏱️ Daylight lasted about two days worth
🤔 Scholars debate how this happened
📖 The text names the result, not the method

## 👂 The LORD Hearkened Unto The Voice Of A Man

Hearkened means God listened and then actually acted on what He heard.

This is presented as something that had never happened before or since.

A human being asked, and the natural order responded.

The verse credits this to God's power, not to Joshua's own authority.

👂 Hearkened means God listened and acted
🆕 This had never happened before
🙋 A man asked, creation responded
📖 The credit belongs to God's power

## ⚔️ The LORD Fought For Israel

This short line explains everything else in the chapter so far.

The hailstones, the long night march, and the extended daylight all serve one battle.

Israel's courage mattered, but it was never the deciding factor.

The chapter keeps returning to the same simple point.

⚔️ God fought this battle himself
⛈️ Hail and daylight both served this cause
💪 Israel's courage was not the deciding factor
📖 One point repeats through the whole chapter

# Joshua 10:15-21
# 🕳️ Five Kings Hide In A Cave
---
## 🔁 Joshua Returned, And All Israel With Him, Unto The Camp To Gilgal

This exact sentence appears again at the very end of the chapter.

Many scholars believe this line was placed here early by a scribe or copyist.

The story on the ground clearly continues without any return to Gilgal yet.

The true return to camp happens later, in verse forty three.

🔁 This same line repeats in verse forty three
✍️ Many scholars see an early scribal note
🚫 The battle does not pause here
📖 The true return comes later

## 🕳️ Hid Themselves In A Cave At Makkedah

These are the same five kings who led the coalition against Gibeon.

Hiding in a cave was a desperate, last resort move.

Kings who once commanded armies now hide from the men they attacked.

🕳️ The same five kings now hide
😨 A cave was a desperate hiding place
👑 Powerful kings reduced to hiding
📖 Their attack has completely failed

## 📢 It Was Told Joshua

Someone in Israel's army was actively scouting for the fleeing kings.

Good information reached Joshua quickly, without him searching himself.

Sealing the cave in the next verse only worked because of this report.

📢 Scouts reported the kings' location
🏃 Joshua did not search himself
🔗 Good information enabled the sealed cave
📖 Fast information supported fast decisions

## 🪨 Roll Great Stones Upon The Mouth Of The Cave

Joshua does not stop to deal with the kings right away.

Sealing the cave keeps them trapped without ending the pursuit.

Guards posted at the entrance make sure no one escapes.

Priorities matter here more than immediate revenge.

🪨 The cave gets sealed, not opened
⏸️ The kings wait, they do not escape
💂 Guards keep watch at the entrance
📖 Joshua chooses priorities over revenge

## 🏃 Stay Ye Not, But Pursue After Your Enemies

Joshua orders the army to keep pressing the retreating soldiers.

Hindmost means the stragglers at the back of a fleeing group.

Letting soldiers reach their home cities would let the war restart later.

Finishing the pursuit mattered as much as winning the first battle.

🏃 Joshua orders a continued pursuit
🎯 Hindmost means the stragglers at the back
🏙️ Escaped soldiers could restart the war
📖 Finishing mattered as much as winning

## ⚔️ Slaying Them With A Very Great Slaughter

This describes the same total warfare God commanded for Canaan's armies.

It targeted the coalition's soldiers, not ordinary uninvolved civilians hiding elsewhere.

Fenced cities in the next phrase means towns protected by walls.

Some soldiers escaped only because those walls held.

⚔️ This describes total warfare against the coalition
🎯 It targeted soldiers, not civilians broadly
🧱 Fenced cities means walled towns
📖 Walls saved some soldiers that day

## 🤐 None Moved His Tongue Against Any Of The Children Of Israel

This idiom means no one dared speak a word of opposition.

It echoes a phrase used back in Egypt during the exodus.

Even Israel's remaining enemies now recognized the strength of this army.

Total silence from every rival marks the peak of this campaign.

🤐 The idiom means no one dared object
📜 A similar phrase appeared back in Egypt
😶 Enemies recognized Israel's strength
📖 Silence marked the peak of this campaign

## 🏕️ Returned To The Camp To Joshua At Makkedah

Makkedah itself now functions as Israel's temporary forward base.

The army returns here safely after finishing the pursuit.

This peaceful return sets up the executions in the next section.

🏕️ Makkedah became a forward base
🔙 The army returned here safely
🔜 This sets up the next section
📖 A pause between two big moments

# Joshua 10:22-27
# 👑 Five Kings Executed
---
## 🗺️ The King Of Jerusalem, The King Of Hebron, The King Of Jarmuth, The King Of Lachish, And The King Of Eglon

All five kings named back in verse three now stand before Joshua together.

Every ruler who chose to attack Gibeon now faces the same fate.

The coalition that once looked so strong ends in one single moment.

🗺️ All five named kings stand together
⚔️ Every attacker faces the same fate
💥 A strong coalition ends in one moment
📖 United in attack, united in defeat

## 👣 Put Your Feet Upon The Necks Of These Kings

This gesture was a well known ancient symbol of total conquest.

Placing a foot on a defeated ruler's neck showed complete domination.

Joshua calls the army's captains to do this together, not just himself.

Psalm one hundred ten later uses this same image for God's ultimate enemies.

👣 This gesture symbolized total conquest
👑 It showed complete domination over kings
🤝 The captains shared in the moment together
📖 Psalm one hundred ten echoes this image

## 💪 Fear Not, Nor Be Dismayed, Be Strong And Of Good Courage

This exact phrase echoes what God told Joshua back in chapter one.

Joshua now repeats God's own words to encourage the army.

The command he once needed to hear, he now gives to others.

💪 This phrase echoes chapter one
🔁 Joshua repeats a command once given to him
🎓 The student now teaches the same lesson
📖 Courage gets passed forward through leaders

## 🌳 Hanged Them On Five Trees

These kings were already dead before being hung on the trees.

Hanging a body publicly after execution displayed the outcome to everyone.

Deuteronomy required taking a body down before nightfall out of respect for the land.

Joshua follows that same law in the very next verse.

🌳 The kings were already dead first
📢 Hanging displayed the outcome publicly
📜 Deuteronomy required removal before nightfall
📖 Joshua followed that law exactly

## 🕳️ Cast Into The Cave Wherein They Had Been Hid

The cave that once hid the kings from danger now becomes their tomb.

Sealing it with great stones makes the ending final and complete.

The place of their last desperate plan becomes the place of their defeat.

🕳️ Their hiding place becomes their tomb
🪨 Great stones sealed it permanently
🔄 Their plan and their end share one place
📖 Their story closes where it began

## 🕰️ Which Remain Until This Very Day

This phrase signals a note added by whoever compiled the book of Joshua.

It tells the earliest readers that the stones could still be seen.

A physical landmark backed up the story with real, checkable evidence.

🕰️ This marks an editor's later note
👀 Early readers could still see the stones
🪨 A landmark backed up the account
📖 Real evidence supported the story

# Joshua 10:28-32
# 🏙️ Makkedah, Libnah, And Lachish Fall
---
## ⚔️ Smote It With The Edge Of The Sword

This phrase describes complete military conquest of a city.

It repeats for almost every city in the rest of this chapter.

The repetition itself is the point, showing a sweeping, thorough campaign.

⚔️ The phrase means complete conquest
🔁 It repeats through this whole chapter
📈 Repetition shows a sweeping campaign
📖 The same fate met city after city

## 🚫 He Let None Remain

This describes the total destruction God commanded for these specific cities.

It applied to Canaan's fortified strongholds tied to organized armies and idol worship.

The command aimed to remove a corrupting influence, not describe warfare in general.

🚫 None remain describes total destruction
🏰 It targeted fortified strongholds specifically
🛐 The goal was removing idol worship
📖 This was not warfare in general

## 🏙️ As He Did Unto The King Of Jericho

This comparison points back to Jericho's total defeat in chapter six.

Each new city gets measured against that first, defining victory.

The pattern set at Jericho now repeats across the whole land.

🏙️ This recalls Jericho's defeat in chapter six
📏 Jericho became the measuring standard
🔁 The same pattern repeats everywhere
📖 One early victory shaped the whole campaign

## 🧭 Fought Against Libnah

This travel language marks Israel's path moving through the southern hill country.

Each city falls in quick order, one after the other.

The campaign is sweeping south from Makkedah toward Philistine territory.

🧭 Israel moved south through the hills
🏙️ Cities fell in quick order
🗺️ The campaign pushed toward Philistine land
📖 Speed itself became part of the victory

## 👑 The King Thereof

Libnah's king is never given a name in this account.

Many smaller Canaanite cities are recorded this way, by title only.

An unnamed king still lost everything, just like the five named kings earlier.

👑 Libnah's king remains unnamed
🏙️ Many smaller cities appear this way
⚖️ An unnamed king lost everything too
📖 A name was not required to fall

## 📅 Took It On The Second Day

Lachish held out longer than the cities before it.

A short siege still counted as a fast victory in this era.

Even Israel's harder fights ended quickly during this campaign.

📅 Lachish resisted for two days
⏱️ Two days was still a fast siege
💪 Even hard fights ended quickly
📖 Momentum stayed with Israel throughout

# Joshua 10:33-37
# 🏰 Gezer, Eglon, And Hebron Fall
---
## 🛡️ Horam King Of Gezer Came Up To Help Lachish

Gezer sat northwest of Lachish, a separate Canaanite city not part of the original coalition.

Horam broke his own neutrality to reinforce a falling ally.

That decision cost him his life and his army.

Getting involved late did not change the outcome of the war.

🛡️ Gezer was a separate, uninvolved city
🤝 Horam chose to help a falling ally
💀 That choice cost him everything
📖 Joining late did not change the outcome

## 🏙️ Joshua Passed From Lachish Unto Eglon

Eglon's king, Debir, was one of the original five kings already executed at Makkedah.

His city still stood and still had to be conquered separately.

A king's death did not end the war against his city.

🏙️ Eglon's king already died at Makkedah
🏰 His city still stood on its own
⚔️ A dead king did not end the fight
📖 Every city required its own conquest

## ⏱️ Took It On That Day

Eglon fell in a single day, faster than Lachish had.

The campaign's pace kept speeding up as it moved south.

Each victory seemed to build momentum for the next one.

⏱️ Eglon fell in one day
📈 The pace kept speeding up
🔥 Momentum built with each victory
📖 Israel's advance was gaining strength

## ⛰️ Joshua Went Up From Eglon Unto Hebron

Hebron sat higher in the hill country, hence the word up.

Hebron's king already died at Makkedah with the other four.

Abraham himself had lived and bought burial ground in this same city centuries earlier.

⛰️ Up describes Hebron's higher elevation
👑 Hebron's king already died at Makkedah
🕰️ Abraham once lived in this same city
📖 Old promises now touched this ground

## 🗻 Unto Hebron

Hebron was one of the oldest cities in all of Canaan.

Abraham lived and was buried near this same city centuries earlier.

Later chapters return to Hebron because of the Anakim, a people remembered for great height.

This victory here does not erase every future challenge tied to this city.

🗻 Hebron was one of Canaan's oldest cities
👴 Abraham lived and was buried nearby
📏 The Anakim later lived in this same city
📖 One victory did not erase future challenges

## 🧭 According To All That He Had Done To Eglon

This phrase repeats a formula used for nearly every city in this chapter.

The formula's sameness is itself the message being sent.

No city, however old or well known, receives special treatment.

🧭 The same formula repeats each time
⚖️ No city got special treatment
🏛️ Hebron's age did not spare it
📖 God's command applied without exception

# Joshua 10:38-43
# 📊 Debir And The Campaign Complete
---
## 🏙️ Returned, And All Israel With Him, To Debir

Debir the city is a different thing from the king named Debir killed earlier in this chapter.

The name overlap can confuse a first time reader.

This city sat further south and west in the same hill region.

🏙️ Debir the city differs from Debir the king
🔀 The shared name can confuse readers
🗺️ This city sat in the same hill region
📖 One name, two very different things

## 🌬️ All That Breathed

This phrase means every living thing, human and animal, without exception.

It matched the total destruction God commanded for these specific fortified cities.

The scale here is larger than any single earlier battle in the chapter.

🌬️ The phrase means every living thing
🎯 It matched God's specific command
📏 The scale grew larger than before
📖 Total obedience matched a total command

## ⚖️ As The LORD God Of Israel Commanded

This line ties the entire campaign back to a direct command, not Joshua's own ambition.

Every city named in this chapter falls under that same authorization.

Obedience, not conquest for its own sake, drives the whole story.

⚖️ God's command authorized the campaign
🚫 This was not conquest for its own sake
🔗 Every city ties back to one command
📖 Obedience drove the entire story

## 🗺️ From Kadeshbarnea Even Unto Gaza

Kadeshbarnea sat far south, near where Israel once wandered for forty years.

Gaza sat northwest along the coast, inside Philistine territory later in the story.

Naming both ends marks the full southern half of Canaan.

This single campaign covered an enormous stretch of land.

🗺️ Kadeshbarnea marks the far south
🌊 Gaza marks the northwest coast
📏 Together they frame the whole region
📖 One campaign covered enormous ground

## 🌾 All The Country Of Goshen

This Goshen is a region inside Canaan, a different place from Egypt's Goshen.

The same name appears in two very different locations in the Bible.

Context, not the name alone, tells the reader which Goshen is meant.

🌾 This Goshen sits inside Canaan
🇪🇬 A different Goshen existed in Egypt
🔀 One name names two separate places
📖 Context reveals which place is meant

## ⏱️ At One Time

This does not mean every battle happened on a single calendar day.

It means one unified campaign without a long pause or retreat.

Verse forty two credits the LORD, not Israel's speed, for that success.

⏱️ At one time means one unified campaign
🚫 Not literally a single calendar day
🏳️ No long pause or retreat occurred
📖 God gets credit, not Israel's speed

## 🏕️ Returned, And All Israel With Him, Unto The Camp To Gilgal

This is the actual return to Gilgal that verse fifteen mentioned early.

The southern campaign is now fully finished.

Gilgal remained Israel's home base throughout this whole stretch of conquest.

One long campaign closes exactly where the chapter's story began.

🏕️ This is the true return to Gilgal
🏁 The southern campaign is finished
🏠 Gilgal remained Israel's home base
📖 The chapter ends where it began
`.trim();

export const JOSHUA_TEN_PERSONAL_SECTIONS = parseJoshuaTenRawNotes(JOSHUA_TEN_RAW_NOTES);
