export type NumbersThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersThirteenRawNotes(rawText: string): NumbersThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 13:${startVerse}` : `Numbers 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Numbers 13 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_THIRTEEN_RAW_NOTES = `# Numbers 13:1-3
# 🕵️ The Lord Commands The Spy Mission
---
## 🔭 Send Thou Men, That They May Search The Land
"Search" means to scout or explore, checking out unfamiliar territory before entering it. This wasn't a spontaneous idea — it lines up with what Deuteronomy 1:22-23 says happened first: the people themselves asked for scouts, Moses brought that request to God, and God agreed and made it official here.
Sending scouts ahead of an army was a normal, wise military practice in the ancient world, not a sign of doubt on its own. The problem that comes later in this chapter isn't the scouting itself — it's how the scouts respond to what they find.
🔭 "Search" means scout or explore, standard military practice
📜 Matches Deuteronomy 1:22-23's account of the people asking first
🔑 The mission itself isn't the problem — the response to it will be
---
## 🎁 Which I Give Unto The Children Of Israel
This is a settled, present-tense promise, not a future maybe. God doesn't say "the land I might give" or "the land I'm considering giving" — He says the land He is already giving.
This detail matters enormously for what happens next. The ten spies are about to report back as if the question is still open — whether Israel even can take the land — when God had already answered that question before the trip even started.
🎁 A settled promise, already given, not a future possibility
❗ The real question was never "can we," since God already answered
🔑 Sets up exactly where the ten spies' report goes wrong
---
## 👑 Every One A Ruler Among Them
"Ruler" translates a Hebrew word (nasi) used earlier for the tribal leaders named back in Numbers 1 and Numbers 7 — the same respected men who organized the census and brought the tribes' dedication offerings.
Sending established leaders instead of random volunteers raises the stakes. These aren't unknown men whose word might be doubted — they're the very leaders the whole camp already trusts.
👑 "Ruler" (nasi) is the same title used for the tribal leaders in Numbers 1 and 7
🤝 These are men the whole camp already trusts and respects
🔑 Makes their coming report far more damaging than a rumor would be
---
## 🏜️ Sent Them From The Wilderness Of Paran
Paran is the wilderness region Israel had already reached back in Numbers 10:12, roughly midway between Mount Sinai and the southern border of Canaan. It served as a staging camp for this final approach to the promised land.
Launching the mission from here means Israel is right at the doorstep. This isn't an exploratory trip taken from far away — the nation is one report away from actually moving in.
🏜️ The staging camp reached earlier in Numbers 10:12
🚪 Israel is right at Canaan's doorstep, not far away
🔑 One report stands between the camp and moving in
---
## 🎖️ All Those Men Were Heads Of The Children Of Israel
This line repeats and strengthens the point about who these men are. They weren't chosen because no one better was available — they were the best-known, most established leaders in the entire nation.
That's exactly why what happens in verses 31-33 lands so hard. When ordinary people complain, it's easy to dismiss. When twelve respected national leaders come back frightened, ten of them carry the whole camp with them.
🎖️ Confirms these are the nation's most established leaders
📢 Their words would carry weight no ordinary complaint could
🔑 Explains why ten men's fear spreads to over a million people

# Numbers 13:4-9
# 🗺️ The Twelve Spies, Part One
---
## 📋 Of The Tribe Of Reuben, Shammua The Son Of Zaccur
Reuben is listed first, matching his position as Jacob's oldest son (Genesis 29:32). Even after Reuben lost his firstborn rights for the sin described in Genesis 49:3-4, official lists like this one still follow birth order out of long-standing custom.
Shammua and the other men named through verse 15 appear nowhere else in the Bible outside this list and its parallel in Deuteronomy 1. That silence itself says something, which this chapter will return to at the end of the list.
📋 Reuben listed first, following birth-order custom
👤 Most of these twelve names never appear again in Scripture
🔑 Watch for why that silence matters by the end of this list
---
## 🦁 Of The Tribe Of Judah, Caleb The Son Of Jephunneh
Caleb is the one name from this list every reader of the Bible ends up knowing. He becomes the hero of the second half of this story, the one man from this generation who lives to actually enter the promised land forty years later (Joshua 14:6-14).
A later verse (Numbers 32:12) calls Caleb "the Kenizzite," a name tied to a clan outside Israel's original twelve tribes. That detail suggests Caleb's family was grafted into Judah rather than born into it — making him an outsider who becomes one of the most faithful men in the entire Exodus story.
🦁 The one name from this list every reader ends up remembering
🌍 Later called "the Kenizzite" — possibly grafted into Judah, not born into it
🔑 An outsider who becomes one of the most faithful men in the story
---
## ❓ Of The Tribe Of Issachar, Igal The Son Of Joseph
This "Joseph" is not the famous patriarch from Genesis. Joseph was simply a common Israelite name, and this Igal's father happened to share it with Jacob's son who saved the family in Egypt generations earlier.
It's an easy detail to trip over without a pause. Nothing else connects this Issachar spy to the Joseph story — he's simply listed here doing his job like the other eleven.
❓ Not the patriarch — just a common name shared by this spy's father
🧩 Easy to confuse without a moment's pause
🔑 No connection to the Genesis Joseph story at all
---
## 💧 Of The Tribe Of Ephraim, Oshea The Son Of Nun
"Oshea" (also spelled Hoshea) means "salvation" in Hebrew. He's Ephraim's representative here, one of Joseph's two sons whose descendants each received a full tribal share (Genesis 48:5).
Keep this name in mind. By verse 16, it changes — and the new name becomes one of the most important in the entire Old Testament.
💧 "Oshea" means "salvation" in Hebrew
👨‍👦 Represents Ephraim, one of Joseph's two tribal-share sons
🔑 Watch for his name to change by verse 16

# Numbers 13:10-16
# 📜 The Twelve Spies, Part Two — And A New Name
---
## 👨‍👦 Of The Tribe Of Joseph, Namely, Of The Tribe Of Manasseh
This "namely" clarifies something that could otherwise confuse a reader: Joseph himself isn't a tribe by that name. When Jacob blessed Joseph's two sons as his own (Genesis 48:5), Ephraim and Manasseh each became full tribes with their own land and their own leader.
That's why this list still reaches twelve without a representative from Levi (explained in the next card): Joseph's single inheritance is really counted twice, once through each son.
👨‍👦 Joseph isn't a tribe by itself — his sons Ephraim and Manasseh are
📐 Genesis 48:5 explains how Jacob made this split official
🔑 This is how the count reaches twelve without Levi included
---
## ⛺ No Representative From The Tribe Of Levi
A careful reader counting through this list will notice Levi is missing, even though Levi was one of Jacob's original twelve sons. Numbers 1:47-53 already explained why: the Levites were set apart for tabernacle service instead of being counted for military purposes like this scouting mission.
Splitting Joseph into Ephraim and Manasseh (the previous card) is exactly what keeps the total at twelve despite Levi's absence — a pattern this book has already used once before, back in the census of Numbers 1.
⛺ Levi is missing — set apart for tabernacle service instead
📖 Already explained back in Numbers 1:47-53
🔑 Ephraim and Manasseh's split fills Levi's place in the count
---
## 🤫 These Are The Names Of The Men Which Moses Sent
Of these twelve carefully chosen tribal leaders, only two names will matter to the rest of the Bible. The other ten fade into a list, remembered only for what they say wrong in a few verses.
That's a sobering pattern worth noticing before their report even happens: being chosen, respected, and named isn't the same as being faithful when it actually counts.
🤫 Only two of these twelve names matter beyond this chapter
📉 The other ten are remembered only for their coming failure
🔑 Being chosen isn't the same as staying faithful
---
## ✡️ Moses Called Oshea The Son Of Nun Jehoshua
Moses adds God's own covenant name to Oshea's name here. "Oshea" already meant "salvation," but "Jehoshua" (Yehoshua in Hebrew) means "the LORD saves" — turning a simple description into a declaration about God Himself.
This name survives into English two different ways: directly as "Joshua," and through Greek translation as "Jesus." Both names carry the same core meaning, "the LORD saves," across two different languages and testaments.
✡️ Adds God's covenant name: "the LORD saves," not just "salvation"
🔤 Becomes "Joshua" in English, and "Jesus" through Greek translation
🔑 The same core meaning carried across two languages and testaments
---
## ⏳ Why Moses Renamed Him Right Before This Mission
Moses doesn't rename Oshea at some random point — he does it right as this specific man is about to face the very test the other ten spies will fail. It reads like a quiet blessing, spoken over Joshua before he needs it most.
Joshua already serves as Moses' assistant (Exodus 24:13, 33:11) and will eventually lead Israel into the land this chapter is scouting. This small moment marks him out well before that future role becomes obvious to anyone else.
⏳ Timed right before the test the other ten will fail
🙏 Reads like a quiet blessing spoken over him in advance
🔑 Marks Joshua out long before his future leadership is obvious

# Numbers 13:17-20
# ⛰️ Moses' Detailed Instructions
---
## 🧭 Get You Up This Way Southward
Canaan is approached from its southern edge here, the direction called the Negev. The spies will need to travel north through the whole length of the land to see everything Moses asks them to check.
This southward entry point becomes important later — after the failed report, Israel tries to invade from this same southern direction without God's blessing and is defeated (Numbers 14:40-45).
🧭 Canaan is entered from its southern edge, the Negev
🗺️ The spies will travel the land's full length, south to north
🔑 This entry point returns later in a failed, unauthorized invasion
---
## ⚔️ Whether They Be Strong Or Weak, Few Or Many
This is military reconnaissance language, not sightseeing. Moses wants to know what kind of resistance an invading army would actually face.
Notice that Moses asks a fact-finding question here — he never asks the spies to decide whether Israel should go. That decision was already made back in verse 2, when God called the land His gift.
⚔️ Military reconnaissance questions, not tourism
🔍 Fact-finding only — not a vote on whether to go
🔑 The decision to go was already made back in verse 2
---
## 🏕️ Whether In Tents, Or In Strongholds
This checks how defended the land's cities actually are. Tent-dwelling suggests a more nomadic, less fortified population; walled strongholds mean real defensive engineering and organized resistance.
This detail sets up a direct contradiction later. The ten spies will report walled cities as proof the mission is hopeless (verse 28), even though nothing here suggested defended cities would be a surprise.
🏕️ Tents suggest a nomadic population; strongholds mean real defenses
📐 A normal military question, expected to have some answer either way
🔑 Sets up the ten spies treating a known factor as a shock later
---
## 🌳 Whether There Be Wood Therein, Or Not
Timber mattered enormously in the ancient world for building homes, tools, siege equipment, and fuel. A wooded land signals real, usable resources beyond just farmland.
This is one more piece of ordinary, practical scouting information, no different from a modern surveyor checking a new region's natural resources before a major move.
🌳 Timber was essential for building, tools, and fuel in this era
🏗️ Signals real resources beyond just farmland
🔑 Ordinary practical information, not a spiritual test by itself
---
## 💪 Be Ye Of Good Courage
Moses says this before the spies even leave, well before there's anything to be afraid of yet. It's an encouragement given in advance, not a reaction to fear that's already shown up.
The exact same phrase reappears later at two crucial moments: God's charge to Joshua taking over leadership (Deuteronomy 31:6-7) and God's charge to Joshua entering the land itself (Joshua 1:6-9). Moses says it here to twelve men; God will later say nearly the same words to just one.
💪 Said in advance, before there's anything to fear yet
🔁 The same phrase returns for Joshua's own commissioning later
🔑 Said to twelve men here — later said to just one, Joshua himself
---
## 🍇 The Time Of The Firstripe Grapes
This detail quietly marks the season as early summer, when the very first grapes of the year begin ripening in the hill country, roughly June by modern reckoning.
This isn't a random detail — it explains why the spies are about to bring back grapes rather than some other crop, and it sets the exact scene for the next section's famous cluster of fruit.
🍇 Marks the season as early summer, roughly June
📅 A small detail with a specific, practical purpose
🔑 Sets up why grapes specifically appear in the very next verses

# Numbers 13:21-24
# 🍇 The Journey And The Cluster Of Eshcol
---
## 🗺️ From The Wilderness Of Zin Unto Rehob, As Men Come To Hamath
This describes the spies covering the entire length of Canaan, from its southern border (the wilderness of Zin) all the way north to near Hamath, a region close to the border of modern-day Syria.
This wasn't a quick peek over the border. Forty days (verse 25) covering this much ground shows a genuinely thorough survey of the whole land God promised, not a rushed or partial look.
🗺️ Covers the land's full length, from the far south to the far north
📏 Hamath sits near the border of modern-day Syria
🔑 A genuinely thorough survey, not a rushed glance
---
## 👹 Where Ahiman, Sheshai, And Talmai, The Children Of Anak Were
The Anakim were known in the ancient world as an unusually tall, physically imposing people group. This is the first time this chapter mentions them, though it won't be the last.
Hebron carried deep meaning for Israel already: Abraham bought the cave of Machpelah there as a burial place for his family (Genesis 23), making it the one piece of the promised land Israel's ancestors already legally owned before this spy mission even began.
👹 The Anakim were known for unusual height and size
⚰️ Hebron already held Abraham's family burial site, Genesis 23
🔑 The first mention of the Anakim — it won't be the last in this chapter
---
## 🏛️ Hebron Was Built Seven Years Before Zoan In Egypt
This side note compares the age of Hebron to Zoan (also called Tanis), a major and famous Egyptian city these former slaves would have known well from their years in Egypt.
Telling an audience raised in Egypt that Hebron is even older than a city as impressive as Zoan is a deliberate way of saying: this land isn't some backwater. It's ancient, established, and significant, worth the trouble of taking.
🏛️ Zoan (Tanis) was a major Egyptian city, well known to this audience
📊 Comparing ages shows Hebron's own age and significance
🔑 A way of saying this land is impressive, not a backwater
---
## 🍇 Cut Down A Branch With One Cluster Of Grapes...Bare It Between Two Upon A Staff
A single cluster of grapes so large it took two men carrying a pole between them is a vivid, physical piece of evidence, not just a claim in words.
This detail exists to make one thing undeniable: whatever else the spies will say, the land's richness itself was never in question. Even the men who bring back a fearful report don't dispute this part.
🍇 One grape cluster required two men to carry on a pole
📸 Physical evidence, not just a spoken claim
🔑 Even the fearful spies never disputed the land's richness
---
## 🍎 They Brought Of The Pomegranates, And Of The Figs
Grapes, pomegranates, and figs were three of the most valued fruits across the whole ancient Near East, prized for both eating fresh and preserving through drying or pressing.
Bringing back all three, not just grapes, builds a fuller picture of a genuinely fertile, varied land — matching the "milk and honey" description that's about to be spoken in the next section.
🍎 Grapes, pomegranates, and figs were prized fruits across the region
🌾 Shows real variety, not one lucky find
🔑 Matches the "milk and honey" description coming in the next verses
---
## 📍 Called The Brook Eshcol, Because Of The Cluster
"Eshcol" is the Hebrew word for "cluster." The place gets its permanent name from this one event, the same way other locations in the Bible get named after something memorable that happened there.
This small naming detail is the text's way of preserving the memory permanently — anyone hearing this place named later would immediately recall the story behind it.
📍 "Eshcol" is Hebrew for "cluster"
🏷️ Named permanently after this one event, a common Bible pattern
🔑 Keeps the memory of this moment alive for later generations

# Numbers 13:25-29
# 📋 The Spies Bring Back Their Report
---
## 📆 Returned From Searching The Land After Forty Days
Forty is a number that shows up again and again across Scripture at moments of testing: forty days of rain in the flood, Moses' forty years in Midian, forty days of fasting before Jesus faced temptation.
This particular forty days becomes the basis for the punishment announced in the next chapter: God sentences Israel to forty years of wandering, one year for every day the spies spent in the land (Numbers 14:34).
📆 Forty appears repeatedly at testing moments across Scripture
⚖️ Becomes the basis for the coming forty-year punishment
🔑 One year of wandering for every day spent scouting the land
---
## 🏕️ Unto The Wilderness Of Paran, To Kadesh
Kadesh becomes one of the most significant locations in Israel's wilderness story, the place this whole generation will end up stuck for a long stretch of years because of what happens next in this story.
Naming the exact location here matters for tracking Israel's movements — this camp, not some other stop, is where the fateful decision covered in the next chapter actually takes place.
🏕️ Kadesh becomes central to the rest of Israel's wilderness story
📍 Names the exact spot where the coming decision happens
🔑 Israel will be based here for a long stretch of years
---
## 🍯 Surely It Floweth With Milk And Honey
"Milk and honey" is a Hebrew idiom for a land so fertile that livestock thrive on rich pasture and fruit is abundant enough to produce natural syrup. It doesn't describe two specific foods so much as overall abundance.
This is the exact phrase God used all the way back in Exodus 3:8 to describe this same land to Moses at the burning bush. Hearing the spies confirm it firsthand proves God's original promise true, word for word.
🍯 A Hebrew idiom for overall fertility and abundance
🔥 The exact phrase God used back in Exodus 3:8
🔑 Firsthand confirmation that God's promise was true
---
## 🖼️ And Shewed Them The Fruit Of The Land
Bringing the actual grapes, figs, and pomegranates back and displaying them publicly turns the report from a rumor into something the whole camp could see and touch for themselves.
This makes what happens in the rest of the chapter even more troubling. The physical proof of a good land is sitting right there in front of everyone, even while the verbal report turns toward fear.
🖼️ Physical proof the whole camp could see and touch
👀 Not a rumor — visible evidence in front of everyone
🔑 Makes the fearful turn in the report even harder to justify
---
## ⚖️ Nevertheless The People Be Strong
"Nevertheless" is the pivot word of the entire report. Everything said up to this point has been true and good; everything from here forward shifts into what will become the report's fatal flaw.
The word choice matters: not "the land is bad," but "nevertheless" — as if the land's own goodness needs to be immediately walked back the moment human obstacles come into view.
⚖️ The pivot word where the whole report turns
🔄 Doesn't deny the land is good — just pivots away from it
🔑 The word choice itself hints at the coming problem
---
## 🏰 The Cities Are Walled, And Very Great
Walled cities were simply the standard defensive architecture of this era across the whole ancient Near East — a fact Moses already anticipated back in verse 19's instructions.
Reporting this as if it were a shocking discovery, rather than the expected answer to a question Moses specifically asked about, is the first sign that fear is starting to shape how these facts get framed.
🏰 Standard defensive architecture across the whole region
❓ Moses already expected and asked about this in verse 19
🔑 Framing an expected answer as shocking is the first warning sign
---
## 🏜️ The Amalekites Dwell In The Land Of The South
The Amalekites were already a known enemy — Israel had fought them directly back in Exodus 17, not long after leaving Egypt. This wasn't a new or unknown threat being introduced for the first time.
Listing them first, before the less familiar nations, roots the whole report in a real, already-experienced danger rather than starting with something more abstract.
🏜️ Already a known enemy, fought directly back in Exodus 17
🧭 Named first, before the less familiar nations on the list
🔑 Grounds the report in a real, remembered danger right away
---
## 🗺️ The Hittites, And The Jebusites, And The Amorites...And The Canaanites
This is close to the same list of nations God promised back in Genesis 15:19-21 that Abraham's descendants would eventually displace — proof the spies are describing exactly the land and the obstacles God already named centuries earlier.
"Canaanites" sometimes works as a broad umbrella term for all these peoples together, but here it's used more narrowly for the specific group living along the coast and the Jordan valley, distinct from the Hittites, Jebusites, and Amorites living in the hill country.
🗺️ Nearly matches the nation list God named back in Genesis 15:19-21
🏔️ Hittites, Jebusites, and Amorites lived inland, in the hill country
🔑 "Canaanites" here means specifically the coastal and Jordan-valley people

# Numbers 13:30-33
# 🦗 Caleb's Faith Against The Evil Report
---
## 🤫 Caleb Stilled The People Before Moses
"Stilled" means Caleb calmed or quieted a crowd that was already growing restless and afraid from what the other spies had just said. He speaks up publicly, alone, against ten of his fellow leaders.
Joshua isn't recorded speaking yet at this point — he doesn't join Caleb's protest out loud until the next chapter (Numbers 14:6-9). Right here, in this exact moment, Caleb stands entirely alone.
🤫 "Stilled" means he calmed an already-frightened crowd
🗣️ Speaking up alone, against ten fellow tribal leaders
🔑 Joshua doesn't join him out loud until the next chapter
---
## ⬆️ Let Us Go Up At Once, And Possess It; For We Are Well Able
Caleb's confidence isn't blind optimism about Israel's own strength. It's built directly on what God already said in verse 2 — that this land was already given, not merely offered as a possibility.
"We are well able" answers the ten spies' coming claim in verse 31 point for point. Both groups saw the same walled cities and the same giants; only Caleb factored God's promise into the equation.
⬆️ Built on God's already-settled promise from verse 2, not blind confidence
⚖️ Directly answers the ten spies' claim in the very next verse
🔑 Same facts, same giants — only one side counted God in
---
## 😨 We Be Not Able To Go Up Against The People; For They Are Stronger Than We
Taken purely as a military assessment, this statement is accurate. The ten spies aren't lying about the size or strength of the opposition they saw.
The real failure isn't inaccurate reporting — it's leaving God completely out of the math. "We are not able" measures only human strength against human strength, as if the God who parted the Red Sea weren't part of the equation at all.
😨 Militarily accurate — not a lie about what they actually saw
➗ The failure is leaving God out of the equation entirely
🔑 Measures only human strength against human strength
---
## 📰 They Brought Up An Evil Report Of The Land
"Evil report" translates a specific Hebrew word (dibbah) that means something closer to slander or a twisted, misleading account, not merely disappointing news. This becomes the official name for their sin throughout the next chapter.
The distinction matters: reporting true facts (walled cities, strong people) isn't itself evil. Framing true facts to spread fear and unbelief, contradicting the good report already given about the very same land, is what earns this label.
📰 "Evil report" (dibbah) means slander or a twisted account, not just bad news
⚠️ Becomes the official name for their sin in the next chapter
🔑 True facts framed to spread fear is what makes it evil
---
## 🍽️ A Land That Eateth Up The Inhabitants Thereof
This exaggerated claim directly contradicts the "milk and honey" report given only a few verses earlier by these same ten men. A land can't be both richly fertile and a place that devours the people living in it.
This self-contradiction is the clearest sign that fear, not honest observation, is now driving the report. The land hadn't changed between verse 27 and verse 32 — only the spies' framing of it had.
🍽️ Directly contradicts their own "milk and honey" report from verse 27
🔄 The land didn't change — only their framing of it did
🔑 Self-contradiction reveals fear is driving the report now
---
## 👹 There We Saw The Giants, The Sons Of Anak
"Giants" here translates "Nephilim," the same rare word used all the way back in Genesis 6:4 for a mysterious group before the flood. Whether this is meant literally or as a way of saying "these people seemed impossibly huge," the word choice is meant to shock.
This isn't the last time the Anakim appear in Scripture — Deuteronomy 2:10-11 and 9:2 describe them again, and centuries later, Goliath, a giant from Gath, is described as one of their descendants (Joshua 11:22, 1 Samuel 17).
👹 "Giants" (Nephilim) echoes the rare word from Genesis 6:4
🥊 Goliath, centuries later, descends from this same people group
🔑 A word choice specifically meant to shock the listeners
---
## 🦗 We Were In Our Own Sight As Grasshoppers, And So We Were In Their Sight
The spies' fear made them feel small first, then they simply assumed the Canaanites saw them the exact same way. There's no way they could have actually known what the Canaanites thought of them.
This is the report's real ending point: not a fact about the enemy, but a projection of the spies' own fear onto other people's minds. The evil report ends not with something they observed, but with something they imagined.
🦗 Felt small first, then assumed the enemy felt the same about them
🔮 No way to have actually known the Canaanites' thoughts
🔑 Ends the report with imagination, not observation
`;

export const NUMBERS_THIRTEEN_PERSONAL_SECTIONS = parseNumbersThirteenRawNotes(NUMBERS_THIRTEEN_RAW_NOTES);
