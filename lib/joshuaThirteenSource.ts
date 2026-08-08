export type JoshuaThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaThirteenRawNotes(rawText: string): JoshuaThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 13:${startVerse}` : `Joshua 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Joshua 13 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_THIRTEEN_RAW_NOTES = `# Joshua 13:1-7
# 🗺️ Very Much Land To Be Possessed
---
## ⏳ Joshua Was Old And Stricken In Years

Stricken in years is an old Hebrew phrase for someone very advanced in age.

Genesis uses this exact same phrase for Abraham near the end of his life.

Joshua chapter twenty three uses it again about Joshua himself.

That later chapter marks the very end of the book.

This chapter and that one form bookends around Joshua's final years.

📜 Stricken in years means very old
🕰️ Genesis uses the same phrase for Abraham
🔖 Joshua 23 repeats it again
📖 The phrase brackets Joshua's final years

## 🗾 There Remaineth Yet Very Much Land To Be Possessed

God does not pretend the conquest is finished.

Large regions still had cities, kings, and peoples not yet defeated.

Chapters one through twelve covered real victories, not a total conquest.

Israel already controlled the center of the land by this point.

The edges, especially the coast and the far north, remained unclaimed.

This verse resets the reader's expectations before the land gets divided.

🗾 Large regions were still unconquered
⚔️ Chapters one through twelve were real but partial
🏙️ Israel held the center, not the edges
📖 The land gets divided before it is finished

## 🛡️ All The Borders Of The Philistines

The Philistines were a powerful people living along the southern coast.

They were not native to Canaan originally.

Many scholars believe they migrated from islands in the Aegean Sea.

They settled the coastal plain generations before Israel arrived.

Israel never fully conquered Philistine territory in the book of Joshua.

Judges and Samuel later record long wars against these same people.

🌊 Philistines came from across the sea
🏝️ Many scholars trace them to the Aegean
🏖️ They held the southern coastal plain
📖 Judges and Samuel record wars against them

## 🏛️ Five Lords Of The Philistines

The Philistines were organized around five major cities.

Each city was ruled by its own lord.

This verse names the peoples of Gaza, Ashdod, Ashkelon, Gath, and Ekron.

Together these five cities are often called the Philistine pentapolis.

Goliath later came from Gath, one of these same five cities.

This enemy was organized, walled, and dangerous long before Israel ever faced it.

🏙️ Five cities formed the Philistine pentapolis
🗡️ Goliath later came from Gath
🏰 Each city had its own lord
📖 This enemy was organized and dangerous

## 🏔️ All Geshuri

Geshur was a small kingdom northeast of the Sea of Galilee.

It sat near Mount Hermon, close to the border of Bashan.

Israel never fully conquered this region.

Generations later, King David married a princess from this very kingdom.

Her name was Maacah.

Their son together was Absalom.

Absalom later fled back to Geshur after killing his brother.

🏔️ Geshur sat near Mount Hermon
👑 David married a Geshurite princess
👦 Their son was Absalom
📖 Absalom later fled there for safety

## 🏜️ From Sihor, Which Is Before Egypt

Sihor marks the southern edge of the land God describes here.

The name likely refers to a stream or waterway near Egypt's eastern border.

Some scholars identify it with a branch of the Nile itself.

Naming this southern point balances the northern point named later in the verse.

Together the two names describe a huge stretch of unclaimed territory.

🏜️ Sihor marked the southern edge
🌊 It was likely near the Nile
🧭 It balances a northern landmark
📖 Together they span huge territory

## ⛵ And The Land Of The Giblites

The Giblites came from Gebal, a city on the coast north of Israel.

The Greeks later called this same city Byblos.

Byblos became famous across the ancient world for papyrus and trade.

Its skilled builders show up again generations later.

First Kings records Solomon hiring workers from Gebal to help build the temple.

Unconquered land named here later helped build God's own house.

⛵ Gebal was a coastal trade city
📜 Greeks later called it Byblos
🏗️ Solomon hired its workers later
📖 Unconquered land later helped build the temple

## 🧭 Toward The Sunrising, From Baalgad Under Mount Hermon

Sunrising is simply the Hebrew way of saying east.

Baalgad sat at the northern edge of the land, under snowy Mount Hermon.

This exact boundary phrase already appeared at the end of chapter eleven.

Repeating it here ties this new list back to the earlier conquest record.

The description reads like an official record confirming its own earlier claim.

🧭 Sunrising simply means east
🏔️ Baalgad sat below Mount Hermon
🔁 The phrase repeats from chapter eleven
📖 One record confirms the other

## 🎯 Only Divide Thou It By Lot Unto The Israelites For An Inheritance

This does not mean Israel had already won every part of the land.

God commands the tribes to divide land they had not yet conquered.

A lot let God decide the outcome, not random chance.

Casting lots was considered a way to hear God's own decision.

Dividing this land now was itself an act of faith.

The tribes trusted God to finish what Joshua could not.

🎯 Land was divided before full conquest
🙏 A lot let God decide the outcome
✝️ Dividing it now took real faith
📖 They trusted God to finish the work

## ⚔️ Them Will I Drive Out From Before The Children Of Israel

God had already promised to finish removing these nations.

Joshua's own strength or lifespan was never the real guarantee of victory.

The same promise that brought Israel across the Jordan still stood.

Later books show God kept pushing back Israel's enemies for generations.

The conquest belonged to God from its very first day.

⚔️ God promised to finish the work
💪 Joshua's strength was never the real guarantee
📜 Later books show the promise kept
📖 The conquest always belonged to God

# Joshua 13:8-14
# 🏞️ Their Inheritance, Which Moses Gave Them
---
## 🐄 With Whom The Reubenites And The Gadites Have Received Their Inheritance

Reuben and Gad were two of Israel's twelve tribes.

Numbers chapter thirty two records them asking Moses for this land.

They owned large herds of cattle.

This land suited grazing far better than most of Canaan.

Moses agreed only on one condition.

Their fighting men still had to help conquer the rest of the land first.

This verse confirms that old agreement had already been kept.

🐄 Reuben and Gad wanted grazing land
📜 Numbers 32 records their request
🤝 Their men still had to help conquer Canaan
📖 This verse confirms the deal was kept

## 🏔️ Beyond Jordan Eastward, Even As Moses The Servant Of The LORD Gave Them

This title, servant of the LORD, appears for Moses again and again in Joshua.

It marks Moses as someone who carried out God's will, not his own agenda.

Moses himself never crossed the Jordan River into Canaan.

He still gave out land on the far side before he died.

His work still counted, even though he never entered the promised land himself.

📛 This title repeats often for Moses
🙏 It marks obedience to God's will
🚫 Moses never crossed into Canaan
📖 His work still counted anyway

## 🏞️ From Aroer, That Is Upon The Bank Of The River Arnon

The Arnon was a deep river gorge, almost like a natural wall.

Aroer sat right on its northern edge.

This same river marked the southern border of Sihon's old kingdom.

Chapter twelve already named this same landmark in its own list of kings.

Repeating it here keeps the boundary consistent across both records.

🏞️ Arnon was a deep river gorge
📍 Aroer sat on its edge
🔁 Chapter twelve names the same landmark
📖 The two records stay consistent

## 👑 All The Cities Of Sihon King Of The Amorites, Which Reigned In Heshbon

Sihon ruled from Heshbon, a city east of the Jordan River.

Numbers chapter twenty one records Israel asking to pass peacefully through his land.

Sihon refused and attacked Israel instead.

That single decision cost him his entire kingdom.

Everything he once ruled now belonged to the tribe of Reuben.

👑 Sihon ruled from Heshbon
📜 Numbers 21 tells his story
⚔️ He attacked instead of allowing passage
📖 His kingdom now belonged to Reuben

## 🌲 And Gilead, And The Border Of The Geshurites And Maachathites, And All Mount Hermon

Gilead was a rugged, hilly region famous for its forests and healing balm.

The Geshurites and Maachathites were smaller peoples living along its edge.

Mount Hermon towered over the whole region, snow capped most of the year.

Naming all three together shows how far this eastern territory actually reached.

🌲 Gilead was known for forests and balm
🏘️ Geshurites and Maachathites lived along its edge
🏔️ Hermon towered over the whole region
📖 This territory reached very far

## 👣 All The Kingdom Of Og In Bashan

Og was one of the last members of an ancient race the Bible calls giants.

Deuteronomy later says his bed was made of iron.

It measured about thirteen feet long.

Chapter twelve already told his story in its own list of defeated kings.

This verse simply confirms his entire kingdom now belonged to Israel.

👣 Og was one of the last giants
🛏️ His bed measured about thirteen feet
⚔️ Chapter twelve already told his story
📖 His kingdom now belonged to Israel

## 🚧 The Geshurites And The Maachathites Dwell Among The Israelites Until This Day

This does not mean Israel simply forgot about these two peoples.

God had commanded Israel to remove every nation from the land.

Israel failed to expel the Geshurites and Maachathites.

Instead these two peoples stayed and lived alongside Israel for generations.

The phrase until this day shows a writer looking back years after the fact.

Incomplete obedience here left a mark that lasted for generations.

🚧 Israel failed to remove these two peoples
📜 They lived alongside Israel for years
✍️ Until this day marks a later writer
📖 Incomplete obedience left a lasting mark

## ⛪ Only Unto The Tribe Of Levi He Gave None Inheritance

Every other tribe received a specific piece of land.

Levi, the priestly tribe, received none.

Their work was serving at the altar and teaching the people God's law.

Numbers chapter eighteen already promised Levi would not need land like the others.

Later chapters still give Levi cities to live in, just not a full territory.

⛪ Every other tribe received land
🙏 Levi served at the altar instead
📜 Numbers 18 already promised this
📖 Levi still received cities later

## 🔥 The Sacrifices Of The LORD God Of Israel Made By Fire Are Their Inheritance

The sacrifices burned on the altar were Levi's actual portion.

A share of every offering brought to the tabernacle belonged to the priests.

That income replaced the farmland every other tribe depended on.

Levi's inheritance came directly from Israel's worship, not from the ground.

Their whole livelihood was tied to keeping that worship going.

🔥 Offerings burned on the altar were their portion
🍞 A share of offerings fed the priests
🌾 This replaced the farmland other tribes had
📖 Levi's income came from worship itself

# Joshua 13:15-23
# 👑 The Inheritance Of Reuben
---
## 🏛️ Heshbon, And All Her Cities That Are In The Plain

Heshbon had been Sihon's royal city before Israel defeated him.

It now belonged to the tribe of Reuben instead of a foreign king.

The surrounding plain was flat, open farmland good for growing crops.

A city built for a pagan king's rule now served God's people.

🏛️ Heshbon was once Sihon's royal city
🌾 The plain around it was farmland
🔀 It changed from enemy hands to Reuben's
📖 God's people replaced a pagan king

## 🛐 Dibon, And Bamothbaal, And Bethbaalmeon

Bamothbaal means high places of Baal in Hebrew.

A high place was a raised site used for pagan worship.

Numbers chapter twenty two records Balak taking Balaam to a place with this same name.

He hoped a curse spoken from there would work against Israel.

That same site now belonged to the very people it was meant to curse.

🛐 Bamothbaal means high places of Baal
🔮 Balak took Balaam to this same site
🚫 He hoped to curse Israel from there
📖 Israel ended up owning that ground

## 🏘️ Kirjathaim, And Sibmah, And Zarethshahar In The Mount Of The Valley

Kirjathaim likely means double city in Hebrew, built as two connected towns.

Sibmah later became famous across the region for its vineyards.

Isaiah and Jeremiah both wrote later about Sibmah's ruined vines with real sorrow.

A place first listed here as a simple boundary point had a whole future ahead of it.

🏘️ Kirjathaim likely means double city
🍇 Sibmah became known for vineyards
😢 Isaiah and Jeremiah later mourned its ruin
📖 A boundary point had its own future

## 🏕️ Bethpeor, And Ashdothpisgah, And Bethjeshimoth

These three places sat in the plains of Moab, where Israel camped before crossing the Jordan.

Ashdothpisgah refers to the slopes of Mount Pisgah.

Moses climbed that same mountain to view the promised land before he died.

Deuteronomy records his death and burial happening in this very region.

Reuben's territory included the exact ground where Moses breathed his last.

🏕️ Israel camped here before crossing Jordan
🏔️ Ashdothpisgah means the slopes of Pisgah
👴 Moses viewed the land from that mountain
📖 Reuben's land held Moses' final ground

## ⚔️ All The Kingdom Of Sihon King Of The Amorites, Whom Moses Smote With The Princes Of Midian

This verse ties Sihon's earlier defeat to a separate campaign against Midian.

Numbers chapter thirty one records Israel fighting Midian for leading them into sin.

Sihon and these Midianite princes are named together here as allies in defeat.

Their combined territory now belonged entirely to one tribe of Israel.

⚔️ Sihon's defeat ties to a Midian campaign
📜 Numbers 31 records that battle
🤝 They are named together as allies
📖 Their land became one tribe's inheritance

## 🗡️ Evi, And Rekem, And Zur, And Hur, And Reba, Which Were Dukes Of Sihon

This does not mean these five men served only as minor local officials.

Numbers chapter thirty one names these same five men as kings of Midian.

They ruled their own territory while also serving under Sihon's authority.

All five died together in the same campaign that killed Balaam.

Naming them here links two different battle stories into one record.

🗡️ These five were also kings of Midian
👑 They ruled while serving under Sihon
💀 All five died in the same campaign
📖 Two battle stories link into one

## 🔮 Balaam Also The Son Of Beor, The Soothsayer

Balaam was a prophet for hire, paid to curse people for money.

Moab's king Balak hired him to curse Israel out of fear.

Numbers chapters twenty two through twenty four record God turning every curse into a blessing instead.

Balaam later gave advice that led Israel into sin with Moabite worship.

That advice cost him his own life in Israel's campaign against Midian.

🔮 Balaam cursed people for pay
🚫 God turned his curses into blessings
💔 His later advice led Israel into sin
📖 That advice cost him his life

## ⚔️ Did The Children Of Israel Slay With The Sword Among Them That Were Slain By Them

Balaam did not die from a curse or a plague.

He died by the sword, just like the kings around him.

The man who once tried to profit from cursing Israel could not even save himself.

His death closes out the story that began back in Numbers.

⚔️ Balaam died by the sword
👑 He died alongside the kings he served
💰 He could not save himself either
📖 His story closes here

## 📍 The Border Of The Children Of Reuben Was Jordan, And The Border Thereof

The Jordan River formed Reuben's entire western edge.

Every other border in this section was measured against rivers, cities, and mountains.

The Jordan itself was the simplest and most obvious line of all.

Reuben's whole territory sat on the far side of that river from Canaan.

🌊 The Jordan formed Reuben's western edge
🧭 Other borders used cities and mountains
📏 The river was the simplest line
📖 Reuben's land sat across from Canaan

## 📜 This Was The Inheritance Of The Children Of Reuben After Their Families

This closing line formally seals Reuben's portion of land.

The phrase after their families means the land was divided further among individual clans.

Reuben was Jacob's firstborn son, though he later lost his birthright.

Even without the birthright, Reuben still received a real and lasting inheritance.

📜 This line formally seals Reuben's land
👨‍👦‍👦 Families means it split further by clan
👑 Reuben lost his birthright earlier in Genesis
📖 He still received a lasting inheritance

# Joshua 13:24-28
# 🌊 The Inheritance Of Gad
---
## 🌲 Jazer, And All The Cities Of Gilead

Jazer was a city the spies had scouted years earlier.

Numbers chapter thirty two records it as good land for raising cattle.

Gilead was the larger, rugged hill region surrounding it.

Later in scripture, Gilead becomes known for a healing balm made from its trees.

Jeremiah later asks if there is no balm in Gilead, mourning Israel's sickness of sin.

🌲 Jazer was scouted years earlier
🐄 It suited raising cattle
🌿 Gilead later became known for its balm
📖 Jeremiah later used that image for sin

## 🏰 And Half The Land Of The Children Of Ammon, Unto Aroer That Is Before Rabbah

Rabbah was the capital city of the Ammonites.

The name means great city, fitting for a capital.

This verse marks the border, not a conquest of Rabbah itself.

Israel took only half of Ammon's land, leaving the rest untouched.

Rabbah stayed in Ammonite hands for generations after this chapter.

🏰 Rabbah was Ammon's capital city
🧭 This marks a border, not a conquest
🚫 Israel left half of Ammon's land alone
📖 Rabbah stayed Ammonite for generations

## 🏕️ And From Heshbon Unto Ramathmizpeh, And Betonim

Ramathmizpeh means the height of the watchtower.

A city with that name likely sat on high, easily defended ground.

Betonim's name is not recorded anywhere else in scripture.

Even a place mentioned only once still earned a permanent place in Gad's record.

🗼 Ramathmizpeh means height of the watchtower
⛰️ It likely sat on defended ground
❓ Betonim appears nowhere else in scripture
📖 Even one mention earned a place here

## 🤼 From Mahanaim Unto The Border Of Debir

Mahanaim means two camps in Hebrew.

Genesis records Jacob meeting God's angels at this very place, generations earlier.

Jacob believed he had seen an army of God there and named it accordingly.

This city later becomes a place kings flee to for safety.

David himself hides here during his own son Absalom's revolt.

🤼 Mahanaim means two camps
👼 Jacob met God's angels there
👑 David later fled there too
📖 One name marked two very different moments

## 🎻 Even Unto The Edge Of The Sea Of Chinnereth On The Other Side Jordan Eastward

Chinnereth likely comes from the Hebrew word for harp.

The lake's shape resembles the curve of that instrument.

This is the earliest name given to this body of water in scripture.

Later books call this same lake the sea of Galilee.

Jesus later calms a storm on these very same waters.

🎻 Chinnereth likely means harp shaped
🌊 The lake later becomes the sea of Galilee
⛵ It is the same water Jesus later calmed
📖 One lake, one long story

## 📜 This Is The Inheritance Of The Children Of Gad After Their Families, The Cities, And Their Villages

This closing formula matches the one already used for Reuben.

Gad received both walled cities and smaller unwalled villages.

Cities and villages together made a complete, livable territory.

Gad's tribe would use this land for generations, all the way to the exile.

📜 This closing formula matches Reuben's
🏙️ Gad received cities and villages both
🏡 Together they made a livable territory
📖 Gad held this land for generations

# Joshua 13:29-33
# ⚔️ The Half Tribe Of Manasseh
---
## 🏔️ And This Was The Possession Of The Half Tribe Of The Children Of Manasseh By Their Families

Manasseh was one tribe, but it settled on both sides of the Jordan.

Half of Manasseh chose this eastern land, much like Reuben and Gad.

The other half would later receive land on the western side with the rest of Israel.

Splitting one tribe across the river was unusual among the twelve.

🏔️ Manasseh split across the Jordan
🐄 Half chose this eastern land
🗺️ The other half settled in the west
📖 One tribe, two very different homes

## 🏘️ All The Towns Of Jair, Which Are In Bashan, Threescore Cities

Jair was a leader who conquered sixty towns in the region of Bashan.

Numbers chapter thirty two records him renaming them after himself.

Threescore is an old way of saying sixty.

Centuries later, a judge named Jair arose in Israel.

He was likely a descendant carrying his ancestor's name and legacy forward.

🏘️ Jair conquered sixty towns in Bashan
🔢 Threescore is an old word for sixty
👨‍👦 A later judge shared his name
📖 One family's legacy stretched for centuries

## 🛡️ Pertaining Unto The Children Of Machir The Son Of Manasseh

Machir was Manasseh's firstborn son.

He is remembered in scripture as the father of Gilead.

His descendants became known as skilled and aggressive warriors.

That reputation likely explains why his family claimed this rugged eastern land.

🛡️ Machir was Manasseh's firstborn son
👨‍👦 He fathered the clan of Gilead
⚔️ His family had a warrior reputation
📖 That reputation fit this rugged land

## 📜 These Are The Countries Which Moses Did Distribute For Inheritance In The Plains Of Moab

This line closes out everything Moses accomplished before Israel ever crossed the Jordan.

Three tribes now had land, all settled and confirmed before Joshua's own work even began.

The next chapter shifts entirely to Joshua dividing land on the western side.

Moses finished his part of the promise even though he never entered Canaan himself.

📜 This closes out Moses' work
🏞️ Three tribes were already settled
➡️ The next chapter turns west
📖 Moses kept his promise from a distance

## 🚫 But Unto The Tribe Of Levi Moses Gave Not Any Inheritance

This is the second time this exact point appears in one chapter.

Verse fourteen already said the same thing about Levi.

Repeating it here closes the whole chapter with the same reminder.

Levi's story was never really about land at all.

🔁 This repeats verse fourteen's point
🚫 Levi received no territory
🗺️ Land was never really the point
📖 The chapter closes on that reminder

## 🙏 The LORD God Of Israel Was Their Inheritance, As He Said Unto Them

Every other tribe could point to a map and name their land.

Levi could only point to God himself.

That was not a lesser inheritance, even though it looked empty on paper.

The priests lived closer to God's presence than any other tribe in Israel.

This chapter ends on that same truth it opened its middle section with.

🙏 Levi's inheritance was God himself
🗺️ Other tribes pointed to a map
⛪ Priests lived closest to God's presence
📖 That was no lesser inheritance
`.trim();

export const JOSHUA_THIRTEEN_PERSONAL_SECTIONS = parseJoshuaThirteenRawNotes(JOSHUA_THIRTEEN_RAW_NOTES);
