export type JoshuaEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaEighteenRawNotes(rawText: string): JoshuaEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 18:${startVerse}` : `Joshua 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Joshua 18 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_EIGHTEEN_RAW_NOTES = `# Joshua 18:1-2
# 🏕️ Israel Gathers At Shiloh
---
## 🏕️ Assembled Together At Shiloh

Shiloh sat near the center of the land, inside Ephraim's territory.

Every tribe could reach it without unfair travel.

This gathering was not just a meeting.

It marked the true beginning of settled, unified worship in the promised land.

Shiloh stayed Israel's main worship site for the next several hundred years.

🏕️ Shiloh sat near the land's center
🚶 Every tribe could reach it equally
🕰️ Shiloh stayed central for centuries
📖 This began unified worship in Canaan

## ⛺ Set Up The Tabernacle Of The Congregation There

The tabernacle was Israel's portable tent of worship, carried since the exodus from Egypt.

For decades it moved with the people from camp to camp in the wilderness.

Setting it up at Shiloh gave it a lasting home for the first time.

The conquest was calm enough now to let worship settle down.

This was a turning point from a moving camp to a settled nation.

⛺ Tabernacle means Israel's portable worship tent
🚶 It had moved since the exodus
🏠 Shiloh gave it a lasting home
📖 A moving camp became a settled nation

## ⚔️ The Land Was Subdued Before Them

Subdued means the major fighting was over, not that every enemy was gone.

Pockets of Canaanite cities still remained inside several tribal borders.

This same chapter admits that further down.

The main organized resistance under Canaanite kings had already been broken.

What remained now was each tribe finishing the work in its own land.

⚔️ Subdued means major fighting had ended
🏙️ Some Canaanite cities still remained
🎯 Each tribe now finished its own land
📖 Victory here was real but not complete

## 🔢 Seven Tribes, Which Had Not Yet Received Their Inheritance

Seven specific tribes are meant here, not a general leftover group.

Judah and the two tribes of Joseph, Ephraim and Manasseh, already held land west of the Jordan.

Reuben, Gad, and half of Manasseh had already settled land east of the Jordan under Moses.

That left Benjamin, Simeon, Dan, Zebulun, Issachar, Asher, and Naphtali still waiting.

This chapter exists to finally settle those seven.

🔢 Seven named tribes still had no land
🗺️ Judah and Joseph already held territory
🏔️ Reuben, Gad, and half Manasseh too
📖 This chapter settles the last seven

# Joshua 18:3-7
# 😤 Joshua Confronts The Slack Tribes
---
## 🐌 How Long Are Ye Slack To Go To Possess The Land

Slack is an old word meaning slow, lazy, or reluctant to act.

Seven tribes had land promised to them but had not moved to claim it.

Joshua's question is not gentle.

It is a direct challenge aimed at their hesitation.

God's promise still required real action from the people receiving it.

🐌 Slack means slow or reluctant
❓ Joshua challenges their hesitation directly
🎁 The land was promised but unclaimed
📖 Promises still required real action

## 🔢 Give Out From Among You Three Men For Each Tribe

Three men from each of the seven waiting tribes were chosen for this task.

That comes to twenty one men in total sent out to survey the land.

Their job was to walk it and record what they found.

This was not Joshua guessing at borders alone from a tent.

It was a shared, careful effort across every remaining tribe.

🔢 Three men per tribe were chosen
🧮 Twenty one surveyors went out total
🚶 Their task was to walk and record
📖 Borders were set through shared effort

## ✂️ They Shall Divide It Into Seven Parts

The land itself had to be measured into seven shares first.

Only after that division could lots be cast to assign each part.

This order mattered.

Fair measurement came before random assignment, not the other way around.

✂️ The land was split seven ways
📏 Measurement came before assignment
⚖️ This order kept the process fair
📖 Fair division came before the lot

## 🧭 Judah Shall Abide In Their Coast On The South, And The House Of Joseph In Their Coasts On The North

This verse uses the two tribes already settled as fixed reference points.

Judah's territory marked the southern edge of the land still to be divided.

The house of Joseph, meaning Ephraim and Manasseh together, marked the northern edge.

The seven remaining tribes would be measured somewhere between those two borders.

🧭 Judah and Joseph served as landmarks
🔽 Judah marked the southern edge
🔼 Joseph marked the northern edge
📖 Seven tribes fit between two borders

## 🙏 The Levites Have No Part Among You

Levites received no measured territory like the other twelve tribes.

Their inheritance instead was the priesthood itself and cities scattered among the other tribes.

This kept their focus entirely on serving God and the whole nation.

It also meant every tribe had priests living nearby.

🙏 Levites received no separate territory
⛪ Their inheritance was the priesthood
🏘️ They lived in cities among others
📖 Every tribe had priests close by

## 🐑 Gad, And Reuben, And Half The Tribe Of Manasseh, Have Received Their Inheritance Beyond Jordan

This verse repeats a settlement already explained back in Numbers thirty two.

Those two and a half tribes asked Moses for this land because it suited their large flocks and herds.

Moses granted it on the condition that their fighting men still crossed the Jordan and helped conquer the rest.

Joshua now confirms that old agreement is still fully honored.

🐑 Reuben and Gad wanted grazing land
📜 Numbers already recorded that request
🤝 Their men still had to fight
📖 Old agreements were honored fully

# Joshua 18:8-10
# 🎲 The Land Is Surveyed And Lots Are Cast
---
## 🚶 Go And Walk Through The Land, And Describe It

Joshua's instructions required these men to physically walk the entire territory themselves.

No shortcuts were allowed, and no secondhand reports would do.

Firsthand observation ensured tribes based their trust on real, walked ground.

This was slow, deliberate work, not a quick guess from a map.

🚶 The men walked the whole territory
👀 Firsthand observation was required
🗺️ No secondhand reports were allowed
📖 Trust rested on real ground surveyed

## 🏙️ Described It By Cities Into Seven Parts In A Book

This is one of the earliest mentions of an actual written record in Israel's history.

The surveyors did not just remember what they saw.

They wrote city names down, organized into seven separate divisions.

That written book became the actual basis for a fair, lasting decision.

🏙️ Cities were listed by division
✍️ Writing made the record lasting
⚖️ A written record protected fairness
📖 Israel's history begins recording itself here

## 🎲 Joshua Cast Lots For Them In Shiloh Before The LORD

Casting lots does not mean this decision was left to random chance.

Ancient Israel used the lot to let God make the final choice.

The phrase before the LORD ties the process directly to the tabernacle just set up in Shiloh.

Human effort surveyed the land, but God assigned the actual portions.

🎲 Lots were not random chance
🙏 The lot let God decide
⛺ This happened before the tabernacle
📖 God assigned the final portions

# Joshua 18:11-14
# 🧭 Benjamin's Border Begins
---
## 🎯 The Lot Of The Tribe Of The Children Of Benjamin Came Up

Benjamin's lot came up first among the seven remaining tribes.

Its land landed in a narrow strip squeezed between Judah to the south and Joseph to the north.

That small, central location later mattered enormously.

Israel's first king, Saul, and the city of Jerusalem both come from land inside this border.

🎯 Benjamin's lot was drawn first
🧩 Squeezed between Judah and Joseph
👑 Saul later came from this land
📖 Small territory, large future importance

## 🏚️ The Border Went Up To The Side Of Jericho On The North Side

The border description starts at the Jordan river, near the ruins of Jericho.

Jericho had already been destroyed and cursed back in Joshua chapter six.

Its ruins still served as a fixed, recognizable landmark years later.

A conquered city became nothing more than a border marker on someone else's map.

🏚️ Jericho was already in ruins
📍 It marked a fixed landmark
📜 Joshua six recorded its fall
📖 A ruin still shaped the land's map

## 🏙️ To Luz, Which Is Bethel

Luz was the older name for the city later called Bethel.

Bethel means house of God, renamed by Jacob generations earlier in Genesis twenty eight.

Jacob slept there with a stone for a pillow and dreamed of a ladder reaching to heaven.

That same site now quietly marks a border line on Benjamin's map.

🏙️ Luz was Bethel's older name
🪜 Jacob dreamed of a ladder there
🌙 Genesis twenty eight tells that story
📖 An old holy site became a border

## ⬇️ Near The Hill That Lieth On The South Side Of The Nether Bethhoron

Nether is an old word meaning lower.

Bethhoron actually named two close towns, an upper Bethhoron and this lower one.

The pass running through both towns was already the site of a major battle in Joshua chapter ten.

That was the day the sun stood still while Israel chased down five kings.

⬇️ Nether means lower
🏘️ Bethhoron had an upper and lower town
⚔️ Joshua ten fought a battle there
📖 A famous battlefield marks this border

# Joshua 18:15-20
# 🌄 Benjamin's Southern Border And Its Dark Valley
---
## 🌄 The Valley Of The Son Of Hinnom

This valley sat just south of where Jerusalem would later stand.

Centuries after Joshua, some Israelite kings burned their own children as offerings to false gods in this exact valley.

The name eventually became Gehenna, a Greek word Jesus later used as a picture of judgment and hell.

A quiet border marker here grew into one of the darkest place names in the whole Bible.

🌄 This valley sat south of Jerusalem
🔥 Later kings sacrificed children here
🌍 The name became Gehenna in Greek
📖 A border marker turned into a warning

## 🧍 The Valley Of The Giants

Giants here translates a word connected to the Rephaim, a people remembered for unusual height.

This valley sat close to Jerusalem, on the western side of the city.

David later fought major battles against the Philistines in this same valley.

A place named for ancient giants became a battlefield for Israel's greatest king.

🧍 Giants links to the tall Rephaim
📍 The valley sat near Jerusalem
⚔️ David fought Philistines here later
📖 One valley, two very different eras

## 💧 Descended To Enrogel

Enrogel was a spring located just outside Jerusalem's border.

Years later, two messengers hid near this same spring during Absalom's revolt against David.

Even later, Solomon's rival Adonijah held a feast near this spot while trying to seize the throne early.

A simple spring marked on Benjamin's border kept reappearing at major turning points in Israel's story.

💧 Enrogel was a spring near Jerusalem
🏃 Messengers hid there during Absalom's revolt
👑 Adonijah later feasted near this spot
📖 One spring, several turning points

## 🏙️ The Side Of Jebusi On The South

Jebusi was the Jebusite city that later became Jerusalem.

This border line ran right along its edge, meaning Jerusalem sat right on Benjamin's boundary.

Benjamin did not actually control this city yet at the time this chapter was written.

The Jebusites held onto it until King David finally captured it, generations later.

🏙️ Jebusi later became Jerusalem
🧭 The border ran right along it
🚫 Benjamin did not yet control it
📖 David finally took it, generations later

## 🔁 Jordan Was The Border Of It On The East Side

This final line completes the loop around Benjamin's entire territory.

The Jordan river closed the boundary on the east, matching where the description began back in verse twelve.

Every border eventually returns to its starting point on a map like this.

Benjamin's whole territory sat squeezed into this one tight loop of landmarks.

🔁 The boundary loop closes here
🌊 Jordan sealed the eastern edge
🗺️ It matches where verse twelve began
📖 A small tribe, a tightly drawn line

# Joshua 18:21-24
# 🏙️ The First Twelve Cities
---
## 🏚️ Jericho, And Bethhoglah, And The Valley Of Keziz

Jericho opens this list as the very first city named for Benjamin.

It was already destroyed back in Joshua six, so this refers to its territory, not a living city.

Bethhoglah means house of the partridge, a small town near the Jordan.

Even a ruined city still counted as part of a tribe's official land.

🏚️ Jericho's ruins still counted as land
🐦 Bethhoglah means house of the partridge
📜 Joshua six already told Jericho's fall
📖 Ruins were still real inheritance

## 🏙️ Betharabah, And Zemaraim, And Bethel

Bethel appears again here, now listed as a Benjamite city.

The same city was already named earlier as a border landmark for both Ephraim and Benjamin.

Tribal borders in this hill country were close enough that cities sometimes changed hands or were shared.

Bethel's exact tribe would keep shifting in later books like Judges.

🏙️ Bethel appears again in this list
🧭 It sat right on a shared border
🔀 Tribal control could shift over time
📖 Borders were rarely perfectly clean

## 🏘️ Twelve Cities With Their Villages

Cities with their villages describes a main walled town surrounded by smaller unwalled hamlets.

The villages depended on the city for protection during any real danger.

Twelve such city clusters made up this first group of Benjamin's land.

A short phrase like this one actually summarizes an entire local economy and defense system.

🏘️ Cities had walls, villages did not
🛡️ Villages relied on the city for safety
🔢 Twelve city clusters are named here
📖 A short phrase describes a whole system

# Joshua 18:25-28
# 👑 Fourteen Cities, Including Jerusalem
---
## 🤝 Gibeon, And Ramah, And Beeroth

Gibeon's people had already tricked Joshua into a peace treaty back in Joshua chapter nine.

They pretended to come from a distant country to avoid being destroyed with the rest of Canaan.

That old trick is why Gibeon now shows up peacefully inside Benjamin's own city list.

Ramah means height, and Beeroth means wells, both simple names describing their actual geography.

🤝 Gibeon tricked Joshua in chapter nine
🏔️ Ramah means height
💧 Beeroth means wells
📖 An old trick shaped this city list

## 🗼 Mizpeh, And Chephirah, And Mozah

Mizpeh means watchtower, a high place used for gathering and looking out over the land.

Later in Israel's history, the whole nation gathered at a Mizpeh for major decisions and mourning.

Chephirah was one of the same four cities that tricked Joshua alongside Gibeon.

A name on this list often points forward to a much bigger story later.

🗼 Mizpeh means watchtower
👥 Israel later gathered there for big moments
🤝 Chephirah was part of Gibeon's old trick
📖 Small names point to bigger stories

## 🏙️ Zelah, Eleph, And Jebusi, Which Is Jerusalem

Jebusi is named plainly here as the same city that is Jerusalem.

Benjamin technically owned this city on paper from this chapter forward.

The Jebusites who lived there were not actually driven out for hundreds of years.

King David finally captured the city and made it Israel's true center generations later.

🏙️ Jebusi is named as Jerusalem here
📜 Benjamin owned it on paper only
⏳ Jebusites stayed for centuries
📖 David finally took it later

## 👑 Gibeath, And Kirjath

Gibeath, also called Gibeah, became the hometown of Israel's first king, Saul.

Kirjath is short for Kirjathjearim, one of the four cities from Gibeon's old peace treaty.

The sacred ark of the covenant rested at Kirjathjearim for twenty years before David finally moved it.

Two small names on this list both carry major roles in Israel's later history.

👑 Gibeath was Saul's hometown
🕍 Kirjath is short for Kirjathjearim
📦 The ark rested there twenty years
📖 Small names, major later roles

## 🔢 This Is The Inheritance Of The Children Of Benjamin

Fourteen cities close out Benjamin's full inheritance, added to the twelve named earlier.

Benjamin was the smallest tribe in size, wedged tightly between Judah and Joseph.

Yet this small territory produced Israel's first king, its future capital city, and centuries of history rewritten inside its borders.

A modest inheritance still carried an outsized place in the story that followed.

🔢 Twelve plus fourteen finished Benjamin's list
🤏 Benjamin was the smallest tribe
👑 It still produced kings and a capital
📖 A small land, an outsized story
`.trim();

export const JOSHUA_EIGHTEEN_PERSONAL_SECTIONS = parseJoshuaEighteenRawNotes(JOSHUA_EIGHTEEN_RAW_NOTES);
