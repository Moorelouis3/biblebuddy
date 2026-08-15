export type FirstChroniclesElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesElevenRawNotes(rawText: string): FirstChroniclesElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 11:${startVerse}` : `1 Chronicles 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 1 Chronicles 11 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_ELEVEN_RAW_NOTES = `# FirstChronicles 11:1-3
# 👑 All Israel Anoints David King
---
## 🦴 We Are Thy Bone And Thy Flesh

"Bone and flesh" was a way of saying close kinship, not a comment on Israel's skeleton.

The same phrase describes Adam recognizing Eve, and Laban recognizing Jacob as family.

Israel had followed Saul, a Benjamite, for years despite tension between the tribes.

Here the tribes are telling David plainly that he already belongs to them.

🦴 Bone and flesh means close kinship

👩 Adam used it for Eve

👨 Laban used it for Jacob

📖 Israel claims David as their own

---
## 🐑 Thou Shalt Feed My People Israel

Kings across the ancient Near East were often pictured as shepherds of their people.

"Feed" here means to shepherd, guide, and protect, not just distribute food.

David had literally shepherded sheep as a boy before God chose him.

Psalm seventy eight and Ezekiel thirty four both return to this same shepherd king image.

🐑 Feed means to shepherd and guide

👦 David once shepherded real sheep

📜 The image returns in Psalms

📖 Kings were pictured as shepherds

---
## 🤝 The Elders Of Israel Came To The King To Hebron

Hebron sat in Judah's hill country and had already served as David's capital for years.

The elders were the recognized heads of each tribe, not a random crowd.

Their arrival meant every tribe, not just Judah, now backed David as king.

This scene closes years of a divided kingdom under two rival houses.

🏔️ Hebron was David's early capital

👴 Elders led each individual tribe

🇮🇱 Every tribe now backed David

📖 A divided kingdom finally unites

---
## 📜 David Made A Covenant With Them

A covenant was a formal agreement with real obligations on both sides.

Israel's kingship was never a private arrangement between David and God alone.

The king promised to lead well, and the people promised their loyalty in return.

This public covenant made David's rule accountable, not just powerful.

📜 A covenant is a binding agreement

⚖️ Both sides carried real obligations

👑 Kingship came with accountability

📖 Loyalty was promised both ways

---
## 🕯️ Anointed David King According To The Word Of The LORD By Samuel

This was actually David's third anointing, not his first.

Samuel anointed him privately as a boy back in First Samuel sixteen.

Judah alone anointed him king years later after Saul's death.

Now the entire nation completes what God had already declared through Samuel long before.

🕯️ This was David's third anointing

👦 Samuel anointed him as a boy

🏛️ Judah anointed him earlier alone

📖 All Israel completes God's word

# FirstChronicles 11:4-6
# 🏰 Jerusalem Falls To David
---
## 🏙️ Jerusalem, Which Is Jebus

Before David, this city was known by its older name, Jebus.

It sat on a steep, easily defended ridge surrounded by valleys on three sides.

The name later became Jerusalem once David made it his own.

Its natural defenses were exactly why no Israelite tribe had ever captured it.

🏙️ Jebus was the city's older name

⛰️ Steep ridges made it defensible

🇮🇱 No tribe had taken it before

📖 It becomes Jerusalem under David

---
## 🚫 Thou Shalt Not Come Hither

This was a boast from the Jebusites, confident their fortress could not be broken.

The parallel account in Second Samuel five adds an insult about the blind and the lame defending it.

Their confidence came from centuries of an untaken hilltop stronghold.

That same confidence is exactly what made its fall so significant.

🚫 This was a Jebusite boast

😏 They mocked David's chances openly

⛰️ Their fortress had never fallen

📖 Confidence made the fall bigger news

---
## 🏯 The Castle Of Zion, Which Is The City Of David

Zion began simply as the name of the Jebusite fortress David captured.

Over time the word grew to represent all of Jerusalem, and even God's people themselves.

Renaming it the City of David marked it as his personal royal possession.

This is the first time in Scripture that name appears.

🏯 Zion was the captured fortress

🏙️ The word later meant all Jerusalem

👑 David renamed it after himself

📖 This name appears here first

---
## 🥇 Whosoever Smiteth The Jebusites First Shall Be Chief

David offered command of the entire army to whoever led the attack.

This was a real incentive, not an empty promise, since Israel had no standing chief yet.

The prize was enormous, permanent authority over every soldier in the kingdom.

Whoever answered the call would instantly outrank every officer in Israel.

🥇 David offered command as the prize

⚔️ Israel still lacked a chief officer

👑 The reward meant real authority

📖 One soldier would outrank them all

---
## 🗡️ Joab...Went First Up, And Was Chief

Joab was David's nephew, the son of his sister Zeruiah.

He would go on to command David's army for most of the king's reign.

Joab was fiercely loyal to David yet also ruthless, later killing men David wanted spared.

His rise here in Jerusalem begins one of the most complicated relationships in David's story.

🗡️ Joab was David's own nephew

⚔️ He commanded the army for years

😠 He was loyal yet often ruthless

📖 A complicated story begins here

# FirstChronicles 11:7-9
# 🧱 David Builds The City
---
## 🏰 David Dwelt In The Castle

Living inside the fortress itself was a public sign that David's rule was now secure.

A king who could safely occupy a captured stronghold was a king no longer running from anyone.

Not long before this, David had been hiding from Saul in caves and wilderness.

That contrast between fugitive and resident king marks how far his story had come.

🏰 Living there signaled real security

🏃 David once fled Saul in caves

👑 He was no longer running

📖 The contrast marks his rise

---
## 🧱 Even From Millo Round About

Millo likely refers to a supporting terrace or filled in structure within the city's walls.

Its name comes from a Hebrew word meaning to fill, describing how it was built.

This kind of structure reinforced the steep slopes so the city could expand safely.

David's building project strengthened Jerusalem's defenses, not just its size.

🧱 Millo means a filled structure

⛏️ It reinforced steep hillsides

🏗️ It let the city expand safely

📖 This strengthened the whole city

---
## 🔨 Joab Repaired The Rest Of The City

Joab's role went beyond leading soldiers into battle.

"Repaired" here means he rebuilt and restored sections of Jerusalem itself.

A commander overseeing construction shows how closely military and civic life were tied together.

Joab's fingerprints are on both the conquest of the city and its rebuilding.

🔨 Repaired means rebuilt and restored

⚔️ Joab did more than fight battles

🏗️ Military and civic roles overlapped

📖 Joab helped build what he won

---
## 📈 David Waxed Greater And Greater, For The LORD Of Hosts Was With Him

"Waxed" is an old word simply meaning grew or increased.

"LORD of hosts" is a title picturing God commanding armies, both human and heavenly.

The Chronicler credits David's rise to God's presence, not David's own skill or army size.

This line sets the pattern for how the entire chapter explains David's success.

📈 Waxed simply means grew

⚔️ LORD of hosts pictures God's armies

🙏 God gets credit, not David alone

📖 This pattern shapes the whole chapter

# FirstChronicles 11:10-11
# 💪 The Mighty Men Are Introduced
---
## 💪 These Also Are The Chief Of The Mighty Men

The story now pauses to introduce David's most elite warriors by name.

"Mighty men" translates a Hebrew word for elite, proven fighters, sometimes rendered heroes.

The Chronicler interrupts the narrative flow on purpose to honor these specific individuals.

Naming them permanently was itself a form of honor rarely given to ordinary soldiers.

💪 Mighty men means elite warriors

⏸️ The narrative pauses on purpose

🏅 Naming them was an honor

📖 Ordinary soldiers rarely got this

---
## 🤝 Who Strengthened Themselves With Him In His Kingdom

This describes support that began long before David ever wore a crown.

Many of these men backed David during his hardest years running from Saul.

Their loyalty during danger mattered more than loyalty after David already had power.

The rest of the chapter proves this claim name by name.

🤝 Support began before his crown

🏃 Many stood with him under Saul

⚠️ Loyalty in danger mattered most

📖 Names will prove this point

---
## 🥇 Jashobeam, An Hachmonite, The Chief Of The Captains

"Hachmonite" identifies his clan, giving him a specific family identity, not just a title.

He is named first because he held the top rank among David's captains.

The parallel list in Second Samuel twenty three gives a different name for this same position.

Ancient copies of these lists occasionally differ, and scholars note this is one of those spots.

🥇 Hachmonite names his clan

🏆 He held the top captain rank

📜 Samuel's parallel list differs slightly

📖 Ancient copies sometimes vary

---
## ⚔️ He Lifted Up His Spear Against Three Hundred Slain By Him At One Time

This describes a single, extraordinary feat of combat against overwhelming numbers.

Second Samuel's version of this same story records eight hundred instead of three hundred.

The Chronicler likely worked from a different source text than the one behind Samuel.

Either number still marks Jashobeam as the greatest individual fighter in David's ranks.

⚔️ One feat against huge numbers

📜 Samuel's count differs from Chronicles

🏆 Either way, he ranked first

📖 Different sources explain the gap

# FirstChronicles 11:12-14
# 🌾 Eleazar Holds The Barley Field
---
## 🛡️ Eleazar The Son Of Dodo, The Ahohite

Eleazar is named as one of only three men who held the very top rank among the mighty men.

"Ahohite" identifies his clan, the same family group Jashobeam's rival in Samuel's list came from.

Being counted among just three men out of an army marks extraordinary trust.

His story here explains exactly what earned him that rank.

🛡️ He was one of the top three

👨‍👩‍👦 Ahohite names his family clan

🏆 Only three men held this rank

📖 His story explains why

---
## 🌾 At Pasdammim...A Parcel Of Ground Full Of Barley

Pasdammim sat near the same battlefield where David once faced Goliath.

Barley was a basic food crop, and losing this one field threatened real hunger for the town nearby.

Most of Israel's army had already broken and run from the Philistines.

Eleazar chose to stand and defend a single unglamorous field instead of retreating with everyone else.

🌾 Barley meant real food security

🏃 Most of the army had fled

🪨 The field sat near Goliath's battle

📖 Eleazar chose to stand alone

---
## 😨 The People Fled From Before The Philistines

This detail is not shameful filler, it sets up exactly how remarkable Eleazar's stand was.

An entire retreating army makes one man holding his ground far more striking.

The mighty men's stories work by this same contrast again and again in this chapter.

Courage stands out most clearly against a backdrop of everyone else running.

😨 Fleeing sets up the contrast

🧍 One man held ground alone

🔁 This pattern repeats through the chapter

📖 Courage stands out against retreat

---
## 🙌 The LORD Saved Them By A Great Deliverance

Eleazar fought and won, but Chronicles refuses to let the credit stop with him.

The chapter consistently hands the true victory back to God, not the warrior's own strength.

This is the same pattern already seen with David's rise back in verse nine.

Individual courage and divine deliverance are shown working together, not competing for credit.

🙌 Victory is credited to God

💪 Eleazar still fought and won

🔁 This matches the pattern in verse nine

📖 Courage and deliverance work together

# FirstChronicles 11:15-19
# 💧 Three Men Risk Everything For Water
---
## 🪨 Down To The Rock...Into The Cave Of Adullam

Adullam was the cave where David hid during his most desperate years fleeing Saul.

First Samuel twenty two describes outcasts and the discontented gathering to David there.

Placing this story at Adullam calls back to David's lowest, most vulnerable season.

The men in this story chose loyalty to David before he ever wore a crown.

🪨 Adullam was David's hideout cave

🏃 He fled there from Saul

👥 Outcasts gathered to him there

📖 Loyalty came before the crown

---
## 🗺️ The Valley Of Rephaim

This valley sat just southwest of Jerusalem, near Bethlehem.

Its name is connected to the Rephaim, a term the Bible uses for ancient giants or a lost people group.

The Philistines chose this valley specifically because it opened a route toward Bethlehem.

David would later win major victories in this same valley recorded in Second Samuel five.

🗺️ It sat near Bethlehem

👹 The name recalls ancient giants

🏹 Philistines used it to reach Bethlehem

📖 David later won battles there

---
## 🏚️ David Was Then In The Hold

"Hold" means a stronghold or fortified hideout, not a literal building called that.

This event actually happened years earlier, during David's fugitive period before he was king.

The Chronicler places it here, among the mighty men's stories, rather than in strict time order.

Grouping stories by theme instead of timeline was a normal way to write ancient history.

🏚️ Hold means a fortified hideout

⏳ This happened before his kingship

📚 Stories are grouped by theme here

📖 Timeline order was not required

---
## 💧 Oh That One Would Give Me Drink Of The Water Of The Well Of Bethlehem

Bethlehem was David's own hometown, and this well sat just outside its gate.

David's words were not a command, they were a wistful, homesick longing spoken aloud.

Philistine soldiers currently controlled that same well and the town around it.

He likely never expected anyone to risk their life over an offhand wish.

💧 The well sat in David's hometown

😔 It was a longing, not an order

🏹 Philistines controlled that well

📖 David never expected this response

---
## 🏹 The Three Brake Through The Host Of The Philistines

"Brake through" means they physically fought their way through an armed enemy camp.

This required crossing hostile territory twice, once in and once back out again.

They accomplished this for a cup of water, not a strategic military objective.

Their motive was loyalty to David personally, not any larger battle plan.

🏹 They fought through an enemy camp

🔄 They crossed the danger twice

💧 The prize was only water

📖 Loyalty to David was the real goal

---
## 🍷 David Would Not Drink Of It, But Poured It Out To The LORD

Pouring out a drink as an offering was a recognized act of worship in Israel.

David refused to treat three men's risked lives as a casual personal reward.

By offering the water to God instead, he turned their sacrifice into something sacred.

His refusal honored the cost of what they had done far more than drinking ever could.

🍷 Pouring it out was an offering

🚫 David refused a casual reward

🙏 He turned it into worship

📖 Their sacrifice became sacred

---
## ❤️ Shall I Drink The Blood Of These Men That Have Put Their Lives In Jeopardy

David treats the water as equal in value to the blood risked to get it.

"Jeopardy" means real, serious danger, not a mild inconvenience.

His question was not really about thirst at all.

It was about refusing to spend other people's courage carelessly.

❤️ Water and blood are equated

⚠️ Jeopardy means serious danger

🚫 This was never about thirst

📖 Their courage was not spent carelessly

# FirstChronicles 11:20-25
# 🦁 Abishai And Benaiah
---
## ⚔️ Abishai The Brother Of Joab, He Was Chief Of The Three

Abishai, Joab, and Asahel were all sons of David's sister Zeruiah, making them David's own nephews.

Abishai appears elsewhere in Scripture as fiercely loyal but also quick tempered and violent.

He once offered to kill Saul on the spot while David spared him instead.

His three hundred kills here match Jashobeam's feat, placing him among the very best.

⚔️ Abishai was David's own nephew

😠 He was loyal yet quick tempered

🛡️ He once spared Saul's life for David

📖 His feat matched the very best

---
## 🥈 Howbeit He Attained Not To The First Three

"Howbeit" is an old word simply meaning however or nonetheless.

This verse describes two overlapping groups, the three top warriors and a wider circle called the thirty.

Abishai led one of these groups yet still ranked just below the top three names.

The ranking system honored fine distinctions of honor most modern readers would miss entirely.

🥈 Howbeit means however

👥 Two ranks overlapped in this list

🏅 Abishai ranked just below the top

📖 These distinctions mattered deeply then

---
## 🦁 Benaiah The Son Of Jehoiada...Of Kabzeel

Kabzeel was a town in the far southern territory belonging to Judah.

Jehoiada's name means "the LORD knows," a common way Israelite parents named their sons after God.

Benaiah would later become far more famous under David's son Solomon.

He eventually rises to command Solomon's entire army after Joab's downfall.

🦁 Kabzeel sat in southern Judah

🙏 Jehoiada means the LORD knows

👑 Benaiah later served Solomon

📖 He later commanded Solomon's army

---
## 🐆 He Slew Two Lionlike Men Of Moab

"Lionlike" describes especially fierce, dangerous warriors, not literal half animal men.

Moab was a neighboring nation with a long, tense history alongside Israel.

Facing two such warriors and defeating both marked Benaiah as exceptional even among the mighty men.

This is only the first of several extraordinary feats credited to him in these verses.

🐆 Lionlike means especially fierce

🗺️ Moab was a neighboring nation

🏆 Beating two marked him exceptional

📖 More feats follow in this list

---
## ❄️ Slew A Lion In A Pit In A Snowy Day

Pits were sometimes dug as traps for wild animals, and one may have already held this lion.

Snow made the ground slick and the cold made every movement more dangerous.

Fighting a trapped, cornered lion is arguably more dangerous than one in open ground.

The specific detail of snow makes this story feel like a real, remembered event.

❄️ Snow made the fight harder

🕳️ Pits often trapped wild animals

🦁 A cornered lion is more dangerous

📖 This detail feels like real memory

---
## 🗡️ An Egyptian, A Man Of Great Stature, Five Cubits High

A cubit measured about eighteen inches, the length from elbow to fingertip.

Five cubits places this man at close to seven and a half feet tall.

His spear resembling a weaver's beam recalls the exact description once used for Goliath.

Benaiah's fight here deliberately echoes David's own famous battle against a giant.

🗡️ A cubit was about eighteen inches

📏 Five cubits meant about seven feet

🪡 A weaver's beam recalls Goliath

📖 This echoes David's own famous fight

---
## 🪵 Went Down To Him With A Staff, And Plucked The Spear Out Of The Egyptian's Hand

Benaiah faced a heavily armed giant carrying only a wooden staff.

He closed the distance and physically wrestled the spear away before using it against its owner.

This kind of close, unarmed courage was rare even among trained fighters.

Turning an enemy's own weapon against him was seen as a special mark of skill.

🪵 He carried only a staff

🤼 He wrestled the spear away

💪 Close range courage was rare

📖 Turning weapons was a mark of skill

---
## 👑 David Set Him Over His Guard

This placed Benaiah in command of David's personal bodyguard, a position of enormous trust.

That guard unit is elsewhere called the Cherethites and Pelethites, foreign born soldiers loyal directly to the king.

The role meant standing physically closest to David at all times.

Benaiah's proven feats earned him the job of protecting the king's own life.

👑 He commanded David's bodyguard

🛡️ That unit protected the king daily

🌍 It included foreign born soldiers

📖 His feats earned this trust

# FirstChronicles 11:26-31
# 🗺️ The Thirty, Named By Home And Clan
---
## 🏃 Asahel The Brother Of Joab

Asahel was the third of Zeruiah's sons, alongside Joab and Abishai.

Second Samuel two describes him as famously fast, "as light of foot as a wild roe."

His speed led him to chase Abner, an enemy commander, which cost Asahel his own life.

Even though he died relatively young, this list still honors him among David's greatest.

🏃 Asahel was Zeruiah's third son

🦌 He was famous for his speed

⚔️ His chase led to his death

📖 He is still honored here

---
## 🏘️ The Netophathite...The Pirathonite...The Tekoite

Each of these names identifies a warrior's hometown rather than his personal traits.

Tekoa, Netophah, and Pirathon were real towns scattered across different tribal territories.

Recording hometowns this precisely shows David's elite guard was drawn from across the whole kingdom.

Tekoa itself later became known as the hometown of the prophet Amos.

🏘️ These names mark hometowns

🗺️ Towns spread across the kingdom

🤝 David's guard was truly national

📖 Tekoa later produced the prophet Amos

---
## 👨‍👩‍👦 Naming Fathers And Clans Throughout This List

Nearly every man here is identified by his father's name or his family clan.

This pattern, "son of" or "the such and such," was how ancient Israel recorded identity.

A name without a father or hometown attached would have felt incomplete to the original audience.

The list preserves not just individuals but the families that produced them.

👨‍👩‍👦 Fathers and clans mark identity

📜 "Son of" was the standard pattern

🏠 A bare name felt incomplete

📖 Families are preserved, not just names

---
## 📜 Why The Chronicler Bothered Naming Ordinary Soldiers At All

Most ancient armies left their common soldiers completely anonymous in official records.

The Chronicler deliberately breaks that pattern here, giving each man a permanent place in Scripture.

Being written into this list was itself a lasting honor rarely offered to common fighters.

These men could easily have vanished from history entirely without this chapter.

📜 Common soldiers were usually anonymous

✍️ The Chronicler broke that pattern

🏅 Being listed was a lasting honor

📖 History would have forgotten them

# FirstChronicles 11:32-37
# 🧭 The Thirty, More Names From Across Israel
---
## 🌳 Hurai Of The Brooks Of Gaash

Gaash was a hill in the territory of Ephraim, in central Israel.

Joshua himself was buried near this same landmark generations earlier, according to the book of Joshua.

Attaching a warrior to this specific place ties him to a location already meaningful in Israel's story.

Even a brief location tag can quietly connect a name to the larger biblical timeline.

🌳 Gaash was a hill in Ephraim

⚰️ Joshua was buried nearby

🗺️ The place already carried meaning

📖 A tag connects him to that history

---
## ⛰️ The Hararite

Both Jonathan and Ahiam are identified by this same clan name in these verses.

"Hararite" most likely points to a family or region associated with hill country.

Two men from the same clan appearing together suggests kinship ties shaped who fought beside whom.

Loyalty in David's army often ran along these existing family lines.

⛰️ Hararite marks a shared clan

👬 Two men share this same tag

👨‍👩‍👦 Kinship shaped who fought together

📖 Family ties ran through the ranks

---
## 📋 Naarai The Son Of Ezbai

This closing name in the section is otherwise unknown outside this single verse.

That is true of many men across this entire chapter, remembered only here and nowhere else.

Scripture did not require fame elsewhere to grant a permanent place in this record.

A single verse was enough to keep his name from being lost completely.

📋 He appears only in this verse

🕯️ Many names here are equally rare

📜 Fame elsewhere was never required

📖 One verse kept his name alive

# FirstChronicles 11:38-41
# 🌍 Foreigners Among David's Own Guard
---
## 🕊️ Zelek The Ammonite

The Ammonites were regularly one of Israel's rival, often hostile, neighboring nations.

Finding an Ammonite fighting loyally inside David's most elite guard is genuinely striking.

It shows David's kingdom welcomed skilled, loyal outsiders rather than excluding them by birth.

Loyalty to David and to Israel's God mattered more here than a man's country of origin.

🕊️ Ammonites were often Israel's rivals

🤝 Zelek served loyally anyway

🌍 David welcomed loyal outsiders

📖 Loyalty mattered more than birth

---
## 🛡️ Naharai The Berothite, The Armourbearer Of Joab

An armourbearer carried his commander's shield and weapons and stayed constantly by his side.

This was a position of deep personal trust, not a lowly errand role.

Naharai served Joab the same way David's own armourbearers once served him.

Even a supporting role like this one earned a permanent place in this record.

🛡️ Armourbearers carried weapons and trust

🤝 It was a role of deep trust

⚔️ He served under Joab directly

📖 Support roles still earned a place

---
## ⚔️ Uriah The Hittite

This is the same Uriah whose story turns tragic later in Second Samuel eleven.

David eventually took Uriah's wife Bathsheba and arranged for Uriah's death in battle to cover it up.

Chronicles rarely dwells on David's failures, and this verse gives no hint of what was coming.

Reading his name here, listed among the loyal and honored, makes that later betrayal even harder to sit with.

⚔️ This is the Uriah from Samuel

💔 David later wronged this same man

📜 Chronicles stays silent on the affair

📖 His honor here makes it heavier

---
## 🐫 Captain Of The Reubenites, And Thirty With Him

Reuben was one of the tribes that settled east of the Jordan River rather than in Canaan proper.

This captain commanded his own smaller group of thirty men within the larger elite ranks.

His presence shows even the eastern tribes were fully represented in David's core forces.

David's support crossed both sides of the Jordan, not just the western heartland.

🐫 Reuben settled east of the Jordan

👥 He led his own group of thirty

🌍 Eastern tribes were represented too

📖 Support spanned both sides of Jordan

# FirstChronicles 11:42-47
# 🏁 The List Closes Without A Eulogy
---
## 🏜️ Uzzia The Ashterathite

Ashtaroth was a city in Bashan, a region east of the Jordan associated with the giant king Og.

A man tagged to this place carried a small echo of that older, defeated kingdom.

Even minor geographic tags across this list quietly tie warriors to Israel's larger story.

Nothing about these names is filler, each one anchors a person to a real place and a real history.

🏜️ Ashtaroth sat in the region of Bashan

👹 Bashan recalled the giant king Og

🗺️ Tags tie names to real history

📖 Nothing here is filler

---
## 🌴 Ithmah The Moabite

Moab, like Ammon, was usually counted among Israel's rival nations.

Yet David's own great grandmother Ruth was herself a Moabite woman.

A Moabite serving loyally in David's guard echoes that same family history in a quiet way.

Outsiders keep appearing throughout this list precisely because David's own roots included one.

🌴 Moab was usually a rival nation

👵 Ruth, David's ancestor, was Moabite

🔁 Ithmah echoes that family history

📖 David's roots included an outsider

---
## 📖 Obed, And Jasiel The Mesobaite

The chapter ends abruptly, on ordinary names, with no closing summary or tribute.

There is no final verse praising the mighty men as a group before the story moves on.

That plain ending fits the whole chapter's approach, letting names and deeds speak for themselves.

Each man's honor was already stated by simply being written into this permanent record.

📖 The chapter ends with plain names

🚫 No closing tribute is given

📝 The list speaks for itself

➡️ Being recorded was the honor itself
`.trim();

export const FIRST_CHRONICLES_ELEVEN_PERSONAL_SECTIONS = parseFirstChroniclesElevenRawNotes(FIRST_CHRONICLES_ELEVEN_RAW_NOTES);
