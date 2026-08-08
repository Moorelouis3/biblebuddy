export type JudgesOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesOneRawNotes(rawText: string): JudgesOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 1:${startVerse}` : `Judges 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Judges 1 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_ONE_RAW_NOTES = `# Judges 1:1-7
# ⚔️ Judah Goes Up First
---
## 💀 After The Death Of Joshua

Joshua led Israel through the whole conquest of Canaan, and now he is gone.

There is no single leader named to replace him.

That absence shapes the entire book of Judges.

Instead of one nation moving together under one commander, each tribe now has to finish its own fight alone.

⚰️ Joshua's death opens the book

🧭 No new single leader is named

🏹 Each tribe fights its own battles now

📖 This whole book explores that gap

## 🙏 Asked The LORD

Israel does not just guess who should fight next.

They bring the question to God, most likely through the high priest.

He used the Urim and Thummim, sacred lots kept in his breastplate.

This was the normal way to seek God's direction before a king or a written answer was common.

The nation still wants to obey, even without Joshua to lead them.

🙏 Israel asks God for direction

👤 Answers usually came through the high priest

🎲 The Urim and Thummim were sacred lots

➡️ Seeking God still mattered without a human leader

## 🦁 Judah Shall Go Up

God names one tribe to go first, Judah.

This is not a random pick.

Jacob blessed Judah generations earlier, saying the scepter, the symbol of ruling authority, would stay with his line.

Judah leading this first battle quietly sets up that future.

That same tribe will one day produce King David, and through him, Jesus.

🦁 Judah is chosen to go first

👑 Jacob's blessing named Judah's ruling line

🗡️ This battle begins that leadership

📖 David and Jesus later come from Judah's tribe

## 🤝 I Have Delivered The Land Into His Hand

God speaks about the victory as if it has already happened.

The fighting has not started yet, but the outcome is already settled in God's own words.

This is a pattern seen throughout Israel's conquest, God promises first and the battle follows.

🤝 God speaks the victory before the fight

⏳ The outcome is already settled

🗺️ This matches earlier conquest promises

📖 God's word comes before Israel's action

## 👬 Come Up With Me Into My Lot

Judah asks Simeon, his relative, to help fight for Judah's assigned land.

Simeon agrees to help because their two lands overlap.

His own tribal land, given back in Joshua nineteen, sits inside Judah's larger territory.

Helping each other only makes sense since their two inheritances overlap.

👬 Judah asks Simeon for help

🗺️ Simeon's land sits inside Judah's territory

🤝 Helping each other benefits them both

➡️ Family ties shape how the tribes cooperate

## ⚔️ Slew Of Them In Bezek Ten Thousand Men

Bezek was a Canaanite stronghold.

The battle there is Judah and Simeon's first real test since Joshua died.

Ten thousand men is a massive number for one battle, showing how large and organized the resistance still was.

The victory proves God's promise from verse two was not empty talk.

⚔️ Bezek was a Canaanite stronghold

🔢 Ten thousand shows the size of the fight

🏆 Judah and Simeon win this first battle

📖 The win proves God's promise was true

## 👑 They Found Adonibezek In Bezek

Adonibezek means lord of Bezek, a title that marks him as the ruling king of that stronghold.

Finding him personally, not just defeating his army, means Judah has captured the actual leader behind the resistance.

Capturing a king mattered more than winning a battlefield, since a king still alive could rebuild an army later.

👑 Adonibezek means lord of Bezek

🎯 He was the city's ruling king

🏰 Capturing him ends more than one battle

➡️ A living king could still return to fight

## ✂️ Cut Off His Thumbs And His Great Toes

This was a real practice in the ancient world for disabling a captured enemy leader permanently.

Without thumbs, a man cannot properly grip a sword, a bow, or a spear.

Without the big toes, steady balance in battle becomes almost impossible.

The point was not only pain, it was making sure this king could never fight or lead an army again.

✂️ Cutting off thumbs removes a weapon grip

🦶 Cutting off toes removes battle balance

🚫 The goal was to end his fighting days

📖 A maimed king could no longer lead armies

## 🍽️ Gathered Their Meat Under My Table

Adonibezek admits he did this same cruelty to seventy other kings before Judah ever caught him.

Seventy is often used in the Bible as a symbolic number.

It usually signals a complete or full set, not an exact count.

Forcing defeated kings to scavenge scraps under his table turned proud rulers into begging animals, a deliberate public humiliation.

🍽️ Seventy kings suffered this before him

🔢 Seventy often signals a complete number

🐕 Scraps under the table meant total humiliation

➡️ Adonibezek built his own cruel system

## ⚖️ As I Have Done So God Hath Requited Me

Adonibezek is not making an excuse, he is admitting the punishment fits the crime.

The word requited means paid back in kind, the same treatment returned to the one who gave it.

Even a pagan king recognizes that this kind of justice did not happen by accident.

This is the same principle in Israel's own law.

A life for a life, an eye for an eye.

⚖️ Requited means paid back in kind

😔 Adonibezek confesses his own guilt

🎯 His punishment matches his exact crime

📖 Even an enemy king can recognize God's justice

# Judges 1:8-15
# 🏙️ Jerusalem, Hebron, And Caleb's Daughter
---
## 🔥 Fought Against Jerusalem And Had Taken It

Judah's forces reach Jerusalem and defeat the city early in the conquest.

This is centuries before Jerusalem becomes Israel's capital under King David.

Later in this same chapter, verse twenty one says the Jebusites still lived in Jerusalem alongside Benjamin.

Judah could strike the city hard without being able to hold it permanently against a people who kept coming back.

🔥 Judah defeats Jerusalem here

🏰 This is long before David's Jerusalem

🔁 Verse twenty one shows the Jebusites returned

➡️ Winning a battle did not mean holding it

## 🗡️ Smitten It With The Edge Of The Sword

This exact phrase shows up again and again across the conquest stories.

It is a set expression meaning total military defeat, not just a skirmish or a raid.

Whenever this phrase appears, the reader should picture complete destruction of a city's fighting strength, not a partial victory.

🗡️ This phrase means total defeat

🔁 It repeats across many conquest stories

💥 It signals complete destruction, not a raid

📖 Judah fought to finish, not just to win

## 🏔️ The Mountain And In The South And In The Valley

Judah's territory covers three very different kinds of land.

The mountain is the hill country running through the center of Judah's inheritance.

The south, often called the Negev, is the dry desert region toward Israel's southern border.

The valley, or Shephelah, is the lower rolling foothills between the hills and the coastal plain.

🏔️ The mountain is Judah's hill country

🏜️ The south is the dry Negev desert

🌾 The valley is the lower Shephelah foothills

➡️ Judah had to fight across three different landscapes

## 🗿 Kirjatharba

Kirjatharba was Hebron's name before Israel arrived.

The name means the city of Arba, honoring Arba, described elsewhere as a great man among the Anakim.

Renaming a captured city was a common way to mark a new owner and a new chapter for the land.

🗿 Kirjatharba means the city of Arba

💪 Arba was a great man among the Anakim

🏷️ Renaming marked a new owner for the land

📖 Hebron's old name honored its old giant ruler

## 👹 Sheshai And Ahiman And Talmai

These same three names already appeared once before, back when the twelve spies scouted Canaan in Numbers thirteen.

That earlier generation saw these giants and panicked, calling themselves grasshoppers in comparison.

Now, decades later, Judah defeats the very giants that once made an entire nation too afraid to enter the land.

👹 These giants scared the spies in Numbers

😨 That earlier generation felt like grasshoppers

💪 Judah now defeats those same giants

📖 Old fears finally meet real faith and victory

## 📜 Kirjathsepher

Kirjathsepher was Debir's earlier name, and it likely means city of the book or city of scribes.

That name hints this city may have been a center of writing or record keeping in Canaanite culture.

Even small name details like this can point to a whole forgotten piece of ancient daily life.

📜 Kirjathsepher may mean city of the book

✍️ It hints at scribes or record keeping

🏙️ This was Debir's name before Israel came

➡️ Small names can hold real forgotten history

## 💍 To Him Will I Give Achsah My Daughter To Wife

Caleb offers his own daughter in marriage as the prize for whoever conquers this final stronghold.

This same exact scene already happened once before, told earlier in Joshua fifteen.

Judges opens by returning to it, resetting the stage right as this new season of conquest begins.

Marriage alliances like this one also joined military success with family loyalty for the tribe going forward.

💍 Caleb offers Achsah as the prize

🔁 Joshua fifteen already told this same story

🎬 Judges reopens it to reset the scene

➡️ Marriage tied military success to family loyalty

## 🌿 Othniel The Son Of Kenaz Caleb's Younger Brother

Othniel is not Caleb's son, he is Caleb's nephew through Caleb's younger brother Kenaz.

Marrying Achsah, his own cousin, was a normal and accepted practice.

It kept land and inheritance inside one family line.

This short introduction quietly sets up a much bigger role, Othniel becomes Israel's very first judge only two chapters later.

🌿 Othniel is Caleb's nephew, not his son

💍 Marrying a cousin kept land in the family

⏭️ This sets up Othniel's larger role ahead

📖 Othniel becomes Israel's first judge in chapter three

## 🐴 She Lighted From Off Her Ass

Achsah gets down from her donkey before speaking to her father Caleb.

Dismounting like this was a sign of respect and urgency, showing she had something important to ask.

Standing before him on foot, not staying seated above him, changed the whole tone.

🐴 She gets down from her donkey

🙇 Dismounting showed respect toward her father

⏰ It also signaled real urgency

➡️ Her posture prepared him for a real request

## 💧 Give Me Also Springs Of Water

The land Caleb already gave Achsah sits in the dry Negev, land that badly needed a reliable water source.

Fields without water in that region were nearly worthless for farming or raising animals.

Caleb does not just grant her simple request.

He gives both the upper and nether springs, far more than she asked.

💧 Negev land needed real water sources

🌵 Dry fields were nearly worthless without it

🎁 Caleb gives both upper and lower springs

📖 His generosity went far past her request

# Judges 1:16-20
# 🏜️ Allies, Enemies, And Iron Chariots
---
## 🐫 Children Of The Kenite Moses Father In Law

The Kenites were a nomadic people connected to Moses through his father in law, known elsewhere as Jethro or Hobab.

They were not part of Israel by blood.

They had journeyed with Israel and stayed loyal since the wilderness years.

This small note shows that faithful outsiders had a real place inside Israel's story.

🐫 Kenites were linked to Moses through marriage

🧭 They journeyed with Israel from the wilderness

🤝 They remained loyal allies, not blood relatives

📖 Faithful outsiders had a real place in Israel

## 🏕️ Wilderness Of Judah Which Lieth In The South Of Arad

The Kenites settle near Arad, a city in the Negev.

Arad already had its own conquest story back in Numbers twenty one.

Placing them here shows Judah's ongoing partnership with the Kenites continuing into this new stage of settlement.

The wilderness of Judah was rugged, dry land bordering the more fertile hill country to the north.

🏕️ Arad had its own story in Numbers

🤝 The Kenites settle near their old allies

🏜️ This wilderness bordered Judah's fertile hills

➡️ Old partnerships continued into a new chapter

## 🔥 Utterly Destroyed It And Called Hormah

Utterly destroyed reflects the Hebrew idea of herem.

That meant a city fully devoted to God through complete destruction.

The city's new name, Hormah, comes from that same root and literally means destruction.

Renaming a defeated place preserved the memory of what happened there.

That memory could still teach later generations.

🔥 Herem means fully devoted to destruction

🚫 Nothing from the city was kept as plunder

🏷️ Hormah literally means destruction

📖 The new name preserved that memory

## 🏙️ Gaza And Askelon And Ekron

These three cities belong to the five major Philistine strongholds along the coast, alongside Gath and Ashdod.

Judah briefly takes them here, but the Philistines do not stay defeated for long.

These same cities keep reappearing throughout Judges, Samuel, and beyond, becoming Israel's most persistent enemy for generations.

🏙️ These are three of five Philistine cities

⏳ Judah's hold on them does not last

🔁 Philistines return again throughout Judges and Samuel

➡️ A quick win here becomes a long rivalry

## ⚙️ Could Not Drive Out The Inhabitants Of The Valley Because They Had Chariots Of Iron

Iron chariots were the most advanced military technology of this era, fast, strong, and terrifying on open, level ground.

Israel's forces at this point had no matching weapon and no real answer for them in the flat valley terrain.

The text still says the LORD was with Judah.

So this failure was not about God's absence.

It points instead to a shortage of courage to keep pressing forward.

⚙️ Iron chariots were the era's top weapon

🏞️ They dominated flat, open valley ground

😟 Israel had no real answer for them

📖 God's presence did not remove every human limit

## 🏔️ Gave Hebron Unto Caleb As Moses Said

This confirms a promise God made through Moses.

It came long before Israel crossed the Jordan, first recorded in Deuteronomy one.

Caleb, now well into old age, finally receives what he was promised.

He stood firm in faith decades earlier as one of the twelve spies.

Expelling the three sons of Anak from Hebron closes this out.

A promise waited an entire generation to be fulfilled.

🏔️ This fulfills a promise from Deuteronomy one

👴 Caleb receives it after decades of waiting

💪 He expels the same giants from Hebron

📖 A long delayed promise finally comes true

# Judges 1:21-26
# 🕵️ Jerusalem's Jebusites And Bethel's Spy
---
## 🏙️ Did Not Drive Out The Jebusites That Inhabited Jerusalem

Benjamin's tribe fails to finish what Judah started against Jerusalem back in verse eight.

The Jebusites resettle and keep living in the city right alongside the children of Benjamin.

The phrase unto this day marks the writer's own later time.

This mixed situation lasted a very long time.

It lasted until King David finally captured the city for good.

🏙️ Benjamin fails to finish Jerusalem's conquest

🔁 Jebusites resettle right alongside Benjamin

📆 Unto this day marks the writer's own era

📖 David secures Jerusalem only much later

## 👨‍👦 The House Of Joseph

The house of Joseph is a combined name for two tribes, Ephraim and Manasseh, both descended from Joseph's two sons.

Grouping them this way reflects their shared family line and their large combined size among the twelve tribes.

Their next target after Judah's campaign is the city of Bethel.

👨‍👦 House of Joseph means Ephraim and Manasseh

👪 Both trace back to Joseph's two sons

🔢 Together they formed a very large group

➡️ Bethel becomes their next target

## ✅ The LORD Was With Them

This short line is placed here on purpose, right before a Bethel victory.

It stands in sharp contrast to the long list of failures about to fill the rest of this same chapter.

The pattern across the whole chapter becomes obedience paired with success, hesitation paired with compromise.

✅ This line marks a clear success

⚖️ It contrasts the failures later in the chapter

🔁 Obedience and success travel together here

📖 The chapter is already teaching a pattern

## 🕵️ Sent To Descry Bethel

To descry means to scout or spy out a location before attacking it.

This is the same military tactic used earlier at Jericho.

Two spies scouted that city before Israel ever moved, back in Joshua two.

Careful advance planning, not blind aggression, is what actually wins these early battles.

🕵️ Descry means to scout out a target

🔁 The same tactic worked at Jericho

🧠 Planning came before every attack

➡️ Wisdom, not just force, won these fights

## 🏷️ The Name Of The City Before Was Luz

Bethel was originally called Luz before Jacob renamed it.

Jacob renamed it generations earlier in Genesis twenty eight, after his ladder dream.

That older name still lingers here, even though the site had long since been known as Bethel.

Old names have a way of staying attached to a place long after the story that changed it.

🏷️ Luz was Bethel's original name

🪜 Jacob renamed it after his ladder dream

⏳ The old name still lingered for generations

📖 A place's history outlives its own name change

## 🤝 We Will Shew Thee Mercy

The spies offer safety to one man in exchange for showing them a hidden way into the city.

This mirrors the earlier deal Rahab made with the spies at Jericho back in Joshua two, trading information for protection.

Unlike Jericho's story though, this man is never named and never joins Israel, he simply walks away free.

🤝 The spies trade mercy for information

🔁 This echoes Rahab's deal at Jericho

👤 This man stays unnamed, unlike Rahab

➡️ Mercy here did not lead to belonging

## 👪 They Let Go The Man And All His Family

Israel keeps its word, sparing this one family.

The rest of the city still faces total destruction.

That same mix of mercy toward individuals inside total judgment also appeared earlier with Rahab's household.

A promise kept, even to a stranger who helped the enemy's cause, still mattered to how Israel conducted war.

👪 The man's whole family goes free

⚖️ Mercy and judgment appear side by side again

🤝 Israel kept its word to an outsider

📖 Kept promises still mattered in war

## 🏗️ Called The Name Thereof Luz

The freed man travels to the land of the Hittites.

He builds an entirely new city there, naming it Luz.

This creates a strange twist, the very name Jacob had already replaced with Bethel now reappears somewhere else entirely.

Even displaced people carry their old home's memory with them into a brand new place.

🏗️ He builds a new city elsewhere

🔁 He names it Luz, the old Bethel name

🌍 This Luz sits in Hittite territory

➡️ Memory of home can outlast the home itself

# Judges 1:27-32
# ⚠️ The Refrain Of Unfinished Conquest
---
## 🏞️ Bethshean And Her Towns

Manasseh fails to remove the Canaanites from five key cities, Bethshean, Taanach, Dor, Ibleam, and Megiddo.

Every one of these sits inside or near the strategic Jezreel Valley, a wide, flat plain ideal for chariot warfare.

That same iron chariot problem from verse nineteen shows up again here, only now against a different tribe.

🏞️ Five cities sit near the Jezreel Valley

⚙️ Flat terrain favored chariot warfare again

🔁 The same problem from verse nineteen returns

📖 Geography kept shaping which battles Israel could win

## 🌾 The Canaanites Would Dwell In That Land

This exact phrase, the Canaanites would dwell in that land, becomes a repeated refrain across the rest of the chapter.

Each time it appears, it marks another tribe settling for coexistence instead of finishing the job God commanded.

A pattern repeated this many times is never accidental.

The author wants the reader to notice it building.

🌾 This phrase repeats through the chapter

🔁 Each repeat marks another unfinished conquest

✍️ A repeated pattern is a deliberate choice

➡️ The author wants this failure to stand out

## 💰 Put The Canaanites To Tribute

Once Israel grows strong enough, they choose forced labor and tribute payments over full obedience to God's original command.

Deuteronomy had commanded complete removal of these nations from the land, not a profitable arrangement with them.

This compromise plants the seed for the religious corruption that fills the rest of the book of Judges.

💰 Israel chooses tribute over full obedience

📜 Deuteronomy commanded complete removal instead

🌱 This compromise plants a seed of corruption

📖 Convenience quietly replaced a clear command

## 🏙️ Ephraim Drive Out The Canaanites That Dwelt In Gezer

Ephraim fails here in the exact same way Manasseh just did.

Gezer's story does not end with this failure.

It resurfaces centuries later in first Kings nine.

An Egyptian Pharaoh captures it and gives it to Solomon as a wedding gift.

One unfinished conquest in Judges can still echo hundreds of years later in Israel's later history.

🏙️ Ephraim repeats Manasseh's same failure

⏳ Gezer resurfaces centuries later in Kings

🎁 Solomon receives it as a wedding gift

➡️ Old failures can echo far into the future

## 🐂 Zebulun Drive Out The Inhabitants Of Kitron

Zebulun fails against two smaller towns, Kitron and Nahalol.

Both cities become tributaries instead of being fully removed.

Zebulun's territory sat further north.

This same pattern of compromise was not limited to one region.

🐂 Zebulun fails against Kitron and Nahalol

💰 Both towns become tributaries instead

🗺️ Zebulun's land sat further north

📖 This compromise spread across the whole country

## 🌊 Neither Did Asher Drive Out The Inhabitants Of Accho

Asher's failure covers the longest list yet, seven separate towns along the northern coast.

Accho was a valuable coastal harbor town.

Losing it meant losing real trade access to Canaanite hands.

Trade access rarely comes back once it is lost.

🌊 Asher fails against seven coastal towns

⚓ Accho was a valuable harbor city

💸 Trade access was left uncontested

➡️ A longer failure list, a bigger cost

## 🕯️ Nor The Inhabitants Of Zidon

Zidon was one of the most important cities in ancient Phoenicia, a major center of trade and pagan worship.

Centuries later, a princess from this very city marries King Ahab.

Her name was Jezebel, and she brings Baal worship into Israel's royal palace.

Leaving Zidon unconquered here quietly plants a danger that grows much larger generations down the road.

🕯️ Zidon was a major Phoenician city

👑 Jezebel later comes from this same city

🔥 She later brings Baal worship into Israel

📖 An old failure grows into a later crisis

## 🏘️ The Asherites Dwelt Among The Canaanites

This line flips the expected order entirely.

Every failure so far describes Canaanites remaining inside Israelite land.

Here Asher becomes the minority living among the Canaanites instead.

That reversal marks a deeper level of compromise than any tribe listed before it.

🏘️ The usual order gets reversed here

🔀 Asher lives among the Canaanites, not the reverse

📉 This marks the deepest compromise yet

➡️ Losing ground looked different for every tribe

# Judges 1:33-36
# 🗻 Naphtali And Dan Pushed Into The Hills
---
## 🏘️ Neither Did Naphtali Drive Out The Inhabitants Of Bethshemesh

Naphtali fails against Bethshemesh and Bethanath.

Both town names honor Canaanite deities, the sun and the goddess Anath.

This Bethshemesh sits in Naphtali's territory up north.

It is a different city from the famous Bethshemesh in first Samuel six.

🏘️ Naphtali fails against two named towns

☀️ Bethshemesh means house of the sun

🌙 Bethanath honors the goddess Anath

📖 Two names, two different pagan gods

## 💰 Became Tributaries Unto Them

Naphtali settles for the same tribute arrangement seen with Zebulun and Ephraim earlier in the chapter.

By this point in the list, the pattern feels almost automatic, tribe after tribe reaching the identical compromise.

Repetition like this is the author's own quiet way of showing just how widespread the failure had become.

💰 Naphtali repeats the same tribute pattern

🔁 Tribe after tribe reaches this same choice

✍️ The repetition itself is the author's point

➡️ A widespread failure needed no extra commentary

## ⛰️ The Amorites Forced The Children Of Dan Into The Mountain

Dan's story here is worse than the others.

Dan is not just failing to expand, Dan is pushed backward.

Being denied the valley entirely leaves Dan without enough usable land.

This defeat plants the seed for Dan's later decision in Judges eighteen.

There, Dan finally abandons this land and migrates north.

⛰️ Dan is pushed back, not just stalled

📉 The valley stays fully out of reach

🧳 This sets up Dan's later migration north

📖 Judges eighteen finishes what began right here

## 🏔️ Mount Heres In Aijalon And In Shaalbim

These three locations mark where the Amorites hold their ground.

Dan could not push them out of these hills.

Aijalon becomes a familiar name later in Israel's story.

It was the site of Joshua's famous long day battle in Joshua ten.

🏔️ Three sites mark the Amorite stronghold

☀️ Aijalon was the site of Joshua's long day

🗺️ Familiar places return throughout Israel's story

➡️ Old battlefields keep reappearing in new stories

## 💪 The Hand Of The House Of Joseph Prevailed

Ephraim and Manasseh were the larger, more powerful tribes.

They eventually subdue these same Amorites that had just defeated Dan.

Success across this chapter clearly does not depend on how strong or weak Israel is as a whole nation.

It depends instead on which specific tribe is doing the fighting and how far that tribe is willing to push.

💪 The larger tribes subdue these Amorites

⚖️ Israel's overall strength was never the real issue

🎯 Individual tribal effort made the difference

📖 Faithfulness varied from tribe to tribe

## 🦂 The Going Up To Akrabbim

Akrabbim literally means scorpions, and the phrase marks a real geographic pass along Judah's southern border.

This same landmark appears in Numbers thirty four.

It appears again in Joshua fifteen, marking Israel's boundary lines both times.

The chapter closes on a plain border description.

A conquest report ends quietly, on geography instead of victory.

🦂 Akrabbim means scorpions

🗺️ This pass marks borders twice more

📍 It sits along Judah's southern edge

➡️ The chapter ends on geography, not triumph
`.trim();

export const JUDGES_ONE_PERSONAL_SECTIONS = parseJudgesOneRawNotes(JUDGES_ONE_RAW_NOTES);
