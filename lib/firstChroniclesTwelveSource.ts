export type FirstChroniclesTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesTwelveRawNotes(rawText: string): FirstChroniclesTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 12:${startVerse}` : `1 Chronicles 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 1 Chronicles 12 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_TWELVE_RAW_NOTES = `# FirstChronicles 12:1-7
# 🏹 Saul's Own Kinsmen Join David At Ziklag
---
## 🏃 He Yet Kept Himself Close

This does not mean David was locked away in a single room.

David was living as a fugitive from Saul.

He kept moving between hiding places to avoid capture.

Ziklag was a town given to David by the Philistine king Achish.

Even while hiding, warriors kept finding their way to him.

🏃 Close means hiding as a fugitive

🗡️ Saul was still hunting David

🏘️ Ziklag was his Philistine base

📖 Warriors sought him out anyway

---
## ⚔️ Helpers Of The War

Helpers of the war means seasoned fighting men, not support staff.

These were warriors who joined David's side in actual combat.

Most kings built armies from tribute or forced service.

David's growing army came from men who chose to join him.

⚔️ Helpers of the war means fighters

🤝 They joined David by choice

👑 Most armies were built by force

📖 David's men chose him freely

---
## 🏹 Could Use Both The Right Hand And The Left

This describes soldiers trained to fight equally well with either hand.

Most archers and slingers could only aim accurately with one side.

Being ambidextrous meant these men had no weak side.

An enemy could not exploit a blind spot.

Ancient armies prized this skill highly because it was rare.

🏹 Ambidextrous means skilled with both hands

🛡️ Most fighters had one strong side

💪 These men had no weak side

📖 Rare skill, highly prized in battle

---
## 👨‍👩‍👦 Saul's Brethren Of Benjamin

These fighters were not distant relatives of Saul.

They were his own tribesmen from Benjamin.

Benjamin was the tribe most loyal to Saul's household.

Yet here they were choosing to fight for his rival instead.

That choice hinted at where Israel sensed God's favor was moving.

👨‍👩‍👦 Brethren means Saul's own tribe

🏹 Benjamin was Saul's most loyal tribe

🔄 These men still chose David

📖 A sign of where God's favor was moving

---
## 📜 The Chief Was Ahiezer

Chronicles names each leader instead of leaving the group anonymous.

Ahiezer led this particular company of Benjamite archers.

Ancient armies were organized by clan.

Each clan had a named chief over its unit.

Recording names like this was the writer's way of giving credit where it was due.

📜 Chief means the company's leader

🏹 Ahiezer led this Benjamite unit

👥 Armies were organized by clan

📖 Names preserved honor for forgotten men

---
## 🏆 A Mighty Man Among The Thirty, And Over The Thirty

The thirty refers to David's elite circle of top warriors.

That group was introduced back in First Chronicles eleven.

Being counted among them was already a high honor.

Ismaiah was not just a member of that group.

He actually led it.

🏆 The thirty means David's elite warriors

⭐ Membership alone was a high honor

👑 Ismaiah actually led that circle

📖 Introduced earlier in First Chronicles eleven

---
## 🏘️ The Sons Of Shemaah The Gibeathite

Gibeathite means someone from Gibeah, Saul's own hometown.

Naming a warrior's town linked him to a specific place his family called home.

These small details mattered to the original readers.

Many could trace their own family's place in this very list.

This nation had just survived a civil war.

Preserving these hometown ties preserved identity itself.

🏘️ Gibeathite means from Gibeah

👑 Gibeah was Saul's hometown

📜 Hometown ties marked family identity

📖 Details mattered after civil war

# FirstChronicles 12:8-15
# 🦁 Gadite Warriors Cross The Flooded Jordan
---
## 🏔️ Separated Themselves Unto David Into The Hold

The hold was a natural stronghold, likely a cave or rocky refuge in the wilderness.

David used places like this while hiding from Saul.

These Gadites left their normal lives to join him there.

Choosing the hold over safety at home was a real risk, not a small decision.

🏔️ The hold was a wilderness refuge

🏃 David hid there from Saul

🐐 Gadites left home to join him

📖 A risky, deliberate choice

---
## 🦁 Whose Faces Were Like The Faces Of Lions

This is a figure of speech, not a literal description.

It means these men were fierce and fearless in battle.

Lions were the ancient world's picture of raw courage and power.

Calling a soldier lion faced was the highest compliment a Hebrew writer could give.

🦁 Lion faced means fierce and fearless

💪 Lions symbolized courage and power

🗣️ A common ancient compliment

📖 Highest praise for a warrior

---
## 🦌 As Swift As The Roes Upon The Mountains

Roes are small wild deer known for speed and sure footing.

Mountain terrain is uneven and dangerous to run across quickly.

Comparing these men to mountain roes meant they were fast and steady under pressure.

That combination made them deadly in a chase or a retreat.

🦌 Roes are swift wild deer

⛰️ Mountain running takes speed and balance

🏃 These men had both

📖 Deadly in a chase or retreat

---
## 🛡️ Could Handle Shield And Buckler

A shield was large, often covering most of the body.

A buckler was smaller and strapped to the arm for quick, close defense.

Being skilled with both meant these men could fight in more than one style.

They could hold a defensive line or move fast in close combat.

🛡️ Shield was large body cover

🔰 Buckler was small and quick

⚔️ Skilled with both styles

📖 Ready for any kind of fight

---
## 🔢 Ezer The First, Obadiah The Second, Eliab The Third

Chronicles ranks these eleven Gadite captains in order.

They go first through eleventh.

That order likely reflected rank, seniority, or proven skill in battle.

Listing warriors by number was unusual for this time.

Most records grouped soldiers by clan instead.

It made each man's individual standing part of the permanent record.

🔢 Captains listed first through eleventh

🏅 Order reflected rank and skill

📜 An unusual way to record names

📖 Each man's standing was preserved

---
## 💯 One Of The Least Was Over An Hundred, And The Greatest Over A Thousand

Israel's army was organized into units of hundreds and thousands.

A captain over a hundred led a smaller company.

A captain over a thousand commanded a much larger force.

Even the least of these Gadites commanded a hundred men.

That alone shows how skilled the whole group was.

💯 Captains led units of a hundred

🔟 Higher captains led a thousand

🏆 Even the least outranked most soldiers

📖 The whole group was elite

---
## 🌊 Went Over Jordan In The First Month, When It Had Overflown All His Banks

The first month of the Hebrew calendar falls in early spring.

Melting snow from Mount Hermon made the Jordan River flood every spring.

Crossing a flooded river on foot was dangerous and could easily drown a man.

These Gadites crossed anyway to reach David.

Their timing was not an accident.

It showed how urgent joining David felt.

🗓️ First month means early spring

🏔️ Snowmelt flooded the Jordan yearly

🌊 A dangerous, swollen river crossing

📖 They crossed anyway to reach David

---
## 🏞️ Put To Flight All Them Of The Valleys

Them of the valleys refers to people living in the lowlands near the Jordan.

These Gadites were so fierce that valley dwellers fled just from their approach.

Word of their reputation had clearly traveled ahead of them.

That kind of fear was rare, and it was earned.

🏞️ Valleys means lowland Jordan dwellers

😨 People fled at their approach

📢 Their reputation went ahead of them

📖 A fear that was earned

# FirstChronicles 12:16-18
# 🕊️ The Spirit Comes Upon Amasai
---
## 🤝 Children Of Benjamin And Judah

Benjamin was Saul's tribe.

Judah was David's own tribe.

Seeing both come to the same hold together was remarkable.

For years these two tribes had stood on opposite sides of a civil war.

Their presence side by side hinted at the united kingdom still to come.

👑 Benjamin was Saul's tribe

🦁 Judah was David's tribe

⚔️ The two had been rivals

📖 A hint of the coming united kingdom

---
## 🙏 If Ye Be Come Peaceably Unto Me To Help Me, Mine Heart Shall Be Knit Unto You

David was not being cold or unfriendly here.

He had been betrayed and hunted for years, so caution made sense.

Knit together means bound closely, like two things joined into one.

David was offering real loyalty, but only once trust had a reason to exist.

🛡️ David had good reason for caution

🔗 Knit means bound closely together

🤝 He offered real loyalty in return

📖 Trust needed a reason first

---
## ⚖️ The God Of Our Fathers Look Thereon, And Rebuke It

This is a formal way of calling on God as a witness.

David is saying that if these men mean him harm, God himself should judge it.

Ancient oaths often invoked God directly like this instead of a human court.

It shows how seriously David took the risk of betrayal.

⚖️ David called God as witness

🙏 An ancient oath formula

😟 Betrayal was a real fear

📖 God alone would judge treachery

---
## 🕊️ The Spirit Came Upon Amasai

This phrase marks a moment of prophecy in the Old Testament.

Judges and prophets are described this way before their boldest moments.

Amasai's next words were not just his own idea.

The text presents them as God speaking through him.

🕊️ The Spirit came means prophetic boldness

⚡ Same phrase used for judges

🗣️ Amasai's words felt God given

📖 God spoke through him

---
## 😤 Thine Are We, David, And On Thy Side, Thou Son Of Jesse

Son of Jesse was sometimes used as an insult by Saul's supporters.

It was a way of denying David's right to be king.

It reduced him to nobody's son instead.

Amasai flips that same title into a declaration of loyalty here.

Using it this way turns an old insult into an honor.

😤 Son of Jesse was once an insult

👑 It denied David's claim to be king

🔄 Amasai turns it into loyalty

📖 An insult became an honor

---
## ☮️ Peace, Peace Be Unto Thee

Repeating a word in Hebrew was a way of making it stronger.

Peace, peace does not mean two separate wishes.

It means complete peace, the fullest kind possible.

Amasai was promising total loyalty, not a cautious partial support.

🔁 Repeating a word meant emphasis

☮️ Peace, peace means complete peace

🤝 A promise of total loyalty

📖 Not a cautious, partial offer

---
## 🎖️ Made Them Captains Of The Band

David did not just accept these men.

He gave them real authority.

Making someone a captain meant trusting them to lead other soldiers.

That trust was David's answer to Amasai's pledge.

Loyalty offered honestly was met with real responsibility in return.

🤝 David accepted their loyalty

🎖️ Captains meant real authority

🔄 Trust answered their pledge

📖 Loyalty was met with responsibility

# FirstChronicles 12:19-22
# 🏕️ Manasseh Defects From The Philistine Army
---
## 🔄 There Fell Some Of Manasseh To David

Fell to here means defected or switched sides.

These were men from the tribe of Manasseh who left Saul's camp to join David.

This happened while David was living among the Philistines, shortly before Saul's death.

Even from inside enemy territory, men were choosing David over their king.

🔄 Fell to means switched sides

🛡️ These men were from Manasseh

🏕️ David was living among the Philistines

📖 Chosen even from enemy territory

---
## 🏃 When He Came With The Philistines Against Saul To Battle

David had taken refuge with the Philistines to escape Saul.

As a result, he technically marched with their army toward a battle against Israel.

That put David in an impossible position between two enemies.

The Manasseh defectors joined him right in the middle of that tension.

🏃 David had fled to the Philistines

⚔️ He marched with their army

😬 An impossible position for David

📖 Manasseh joined him mid crisis

---
## 🚪 The Lords Of The Philistines Upon Advisement Sent Him Away

Upon advisement means after careful discussion among the Philistine leaders.

They worried David would turn against them in the middle of the fight.

So they sent him home before the battle where Saul died even began.

That decision, meant to protect the Philistines, ended up protecting David instead.

🗣️ Advisement means careful discussion

😟 Leaders feared David would betray them

🚪 They sent him away before battle

📖 A decision that protected David too

---
## 🚫 They Helped Them Not

These Manasseh captains had marched with the Philistines toward the battle.

But when the fighting mattered most, they held back.

They did not actually fight against Israel.

Their loyalty had already quietly shifted before it became official.

Joining David later was simply catching up to a choice already made.

🚫 They did not fight against Israel

🤐 Loyalty had already quietly shifted

🏃 Their choice came before the words

📖 Joining David caught up to it

---
## 🏴 The Band Of The Rovers

Rovers means raiders, wandering bands who attacked for plunder.

This refers to the Amalekites who had recently burned Ziklag.

They had also taken David's own family captive.

These new Manasseh allies fought alongside David to win that rescue.

Their first act as David's men was already high stakes.

🏴 Rovers means raiding bandits

🔥 The Amalekites had burned Ziklag

👨‍👩‍👧 David's family had been taken captive

📖 Their first fight was high stakes

---
## 👼 Like The Host Of God

Host of God was a way of describing an army of angels.

Comparing David's growing army to that host meant it had become enormous.

Men kept arriving every single day until the numbers were staggering.

What began as a handful of fugitives had become an unstoppable force.

👼 Host of God means angel armies

📈 David's forces grew enormous

📅 New men arrived every day

📖 Fugitives became an unstoppable force

# FirstChronicles 12:23-30
# 👑 Tribes Gather At Hebron To Crown David
---
## 🚫 To Turn The Kingdom Of Saul To Him, According To The Word Of The LORD

This was not a coup or a power grab.

The text says this happened according to the word of the LORD.

Samuel had anointed David king years earlier, long before Saul died.

This gathering at Hebron was simply Israel catching up to what God had already decided.

🚫 Not a coup or power grab

🛢️ Samuel had anointed David long before

👑 Israel was catching up to God's choice

📖 The LORD's word stood behind it

---
## 🦁 The Children Of Judah, Six Thousand And Eight Hundred

Judah was David's own tribe.

Even so, Judah's number here is smaller than several other tribes on this list.

That detail matters because it shows this was not David simply rallying his hometown crowd.

Support for him was genuinely coming from across the whole nation.

🦁 Judah was David's own tribe

🔢 Their number was not the largest

🌍 Support came from across Israel

📖 Not just a hometown crowd

---
## 🕎 Of The Children Of Levi Four Thousand And Six Hundred

Levi was the priestly tribe, set apart for temple and worship service.

They were not usually counted among war lists.

Yet Levites are counted here among the armed men supporting David.

Their presence signaled that Israel's religious leaders backed his claim to the throne too.

🕎 Levi was the priestly tribe

⚔️ Even they came armed for David

🙏 Religious leaders backed his claim

📖 More than a political shift

---
## 👤 Zadok, A Young Man Mighty Of Valour

Zadok was a young leader from the priestly line of Aaron.

He would go on to become high priest under David and later Solomon.

Chronicles quietly points forward to that future role by naming him here.

A small mention in a long list turns out to matter later in the story.

👤 Zadok led part of the priesthood

⛪ He later became high priest

📖 Chronicles hints at his future role

➡️ Small names can matter later

---
## 🛡️ Had Kept The Ward Of The House Of Saul

Ward here means guard duty or watchful loyalty.

Benjamin was Saul's own tribe, and most had stayed loyal to his family.

That explains why their number here is much smaller than the others.

Even so, three thousand of them chose to come anyway.

🛡️ Ward means guard duty or loyalty

👑 Benjamin was still loyal to Saul

🔢 Their smaller number reflects that

📖 Three thousand still chose David

---
## 🌾 Famous Throughout The House Of Their Fathers

Ephraim was one of the largest and most respected northern tribes.

Famous throughout the house of their fathers means widely known and honored.

Their own extended family recognized their name.

Ephraim would later become a rival power center after Israel's kingdom split.

Their support for David here shows unity that would not always last.

🌾 Ephraim was a leading northern tribe

🏆 They were widely honored by name

⚔️ Ephraim later became a rival center

📖 Unity here would not always last

# FirstChronicles 12:31-38
# 🛡️ The Whole Army Unites Behind David
---
## 🧠 Which Were Men That Had Understanding Of The Times, To Know What Israel Ought To Do

This phrase describes political and spiritual discernment, not just calendar knowledge.

The men of Issachar could read the moment Israel was in.

They could see what needed to happen next.

That kind of wisdom was rare enough to be worth recording by name.

It has become a phrase people still quote when praising discernment today.

🧠 Understanding the times means discernment

📅 More than just tracking a calendar

⭐ Rare wisdom worth recording

📖 A phrase still quoted today

---
## 💔 They Were Not Of Double Heart

Keep rank means holding a disciplined battle formation instead of scattering.

Double heart means divided loyalty, wanting two different things at once.

Zebulun's soldiers were both skilled and fully committed.

An army with no double hearted men was an army David could trust completely.

🪖 Keep rank means holding formation

💔 Double heart means divided loyalty

✅ Zebulun had neither problem

📖 An army David could fully trust

---
## 🗺️ On The Other Side Of Jordan

This refers to Reuben, Gad, and half of Manasseh.

These tribes had settled east of the Jordan River.

That was a long journey just to reach Hebron.

Making it showed the whole nation was involved.

Not just the tribes living close by.

Distance did not weaken their commitment to David.

🗺️ Reuben, Gad, and half Manasseh

🌊 They lived east across the Jordan

🚶 They still traveled to Hebron

📖 Distance did not weaken commitment

---
## ❤️ Came With A Perfect Heart To Hebron

Perfect heart does not mean sinless or flawless.

It means wholehearted, fully committed, with nothing held back.

These soldiers were not hedging their bets or keeping an exit plan.

They came to Hebron completely sure of what they were doing.

❤️ Perfect heart means fully committed

🚫 Not a claim of sinlessness

🎯 No hedging, no exit plan

📖 They were completely sure

---
## 🤝 All The Rest Also Of Israel Were Of One Heart To Make David King

One heart means the whole nation agreed, tribe by tribe, without exception.

After years of civil war since Saul, that kind of unity had seemed impossible.

Chronicles is making a point here, not just recording a headcount.

Israel had finally become one people again, united behind one king.

🤝 One heart means total agreement

⚔️ Unity had seemed impossible after Saul

📊 Not just a headcount here

📖 One people, united behind one king

# FirstChronicles 12:39-40
# 🍞 Three Days Of Feasting At Hebron
---
## 🍽️ There They Were With David Three Days, Eating And Drinking

Sharing a meal together after a covenant was common across the ancient Near East.

Eating together sealed an agreement in a way words alone could not.

Three days of feasting meant this was a real celebration, not a quick ceremony.

The whole army stayed to mark the moment together.

🍽️ Shared meals sealed ancient agreements

🤝 Eating together sealed loyalty

📅 Three days meant real celebration

📖 The army stayed to mark it

---
## 🐫 Brought Bread On Asses, And On Camels, And On Mules, And On Oxen

Listing four different pack animals shows just how much food this required.

Feeding this many soldiers for three days took a massive supply effort.

Surrounding towns and tribes pitched in everything they had.

The whole nation was feeding this army, not just Hebron.

🐫 Four pack animals list a huge supply

🍞 Feeding this army took real effort

🏘️ Towns pitched in what they had

📖 The whole nation fed the army

---
## 😊 There Was Joy In Israel

This joy came after years of civil war following Saul's death.

Israel had been divided, uncertain, and afraid for far too long.

A united kingdom under one king finally felt secure.

That relief is what this whole chapter has been building toward.

😊 Joy followed years of civil war

😟 Israel had been divided and afraid

👑 A united kingdom felt secure

📖 The relief this chapter builds toward
`.trim();

export const FIRST_CHRONICLES_TWELVE_PERSONAL_SECTIONS = parseFirstChroniclesTwelveRawNotes(FIRST_CHRONICLES_TWELVE_RAW_NOTES);
