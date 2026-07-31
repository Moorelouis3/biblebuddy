export type NumbersTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwentyOneRawNotes(rawText: string): NumbersTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 21:${startVerse}` : `Numbers 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Numbers 21 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_ONE_RAW_NOTES = `# Numbers 21:1-3
# ⚔️ King Arad Attacks, And Israel's Vow
---
## 🏜️ King Arad The Canaanite, Which Dwelt In The South
"The south" here means the Negev, the dry region on the southern edge of Canaan where Kadesh sits. Arad was a real Canaanite city in that area, and its king strikes first, before Israel has done anything aggressive toward him.
🏜️ "The south" means the Negev, the dry region near Kadesh
👑 Arad was a real Canaanite city-king in that region
🔑 This attack comes unprovoked, before Israel moves against anyone

## 🔎 Heard Tell That Israel Came By The Way Of The Spies
This is the same general route the twelve spies used almost 38 years earlier in Numbers 13, when they scouted the land and brought back their fearful report. A new generation is retracing old ground, and old enemies are watching for them along the way.
🔎 The same route the twelve spies once explored, in Numbers 13
⏳ Nearly 38 years later, a new generation walks it
🔑 Old enemies were still watching this border

## ⛓️ Took Some Of Them Prisoners
This is a genuine military setback for Israel, not a story where they win every fight. Losing people as captives raises the stakes immediately and explains why Israel responds with a vow instead of just marching on.
⛓️ A real defeat, not another easy Israelite victory
📉 Raises the stakes right at the start of the chapter
🔑 Explains why Israel turns to prayer before fighting again

## 🙏 Israel Vowed A Vow Unto The LORD
A vow is a conditional promise made to God — "if you do this, I will do that." It's a serious, binding commitment, not a casual bargain, and it shows Israel turning to God first this time instead of complaining, a real change from their usual pattern.
🙏 A vow is a binding, conditional promise made to God
🔄 A real shift from Israel's usual pattern of complaining first
🔑 Prayer, not grumbling, opens this military crisis

## 🔥 Then I Will Utterly Destroy Their Cities
"Utterly destroy" describes full, dedicated destruction — wiping out a city completely rather than looting it for profit, treating the victory as belonging to God rather than to Israel. This same total-destruction language shows up throughout the conquest narratives later in Joshua.
🔥 "Utterly destroy" means total destruction, not looting for gain
📖 The same language used again and again later in Joshua
🔑 Frames the coming victory as belonging to God, not Israel

## 👂 The LORD Hearkened To The Voice Of Israel
"Hearkened" is an old word for listened and responded — God doesn't just hear the vow, he acts on it, handing the Canaanites over to Israel. The victory comes because God answers, not because Israel out-fights the enemy on their own.
👂 "Hearkened" means listened and then acted
✅ God directly answers the vow just made in verse 2
🔑 Credit for the win goes to God's response, not Israel's strength

## 📛 He Called The Name Of The Place Hormah
"Hormah" means "destruction," and this is not a new name — it's the very same place where Israel was crushed in a failed, unauthorized attack back in Numbers 14:45, right after the spies' bad report. The name that once marked their disgrace now marks their obedience instead.
📛 "Hormah" means "destruction"
🔁 The same place where Israel was defeated in Numbers 14:45
🔑 A place of past shame becomes a place of present victory

# Numbers 21:4-9
# 🐍 Fiery Serpents And The Bronze Serpent
---
## 🛣️ By The Way Of The Red Sea, To Compass The Land Of Edom
Because Edom refused Israel passage through their land in Numbers 20:18-21, Israel now has to take the long way around, back down toward the Red Sea region before curving around Edom's border. This detour adds real time and hardship to an already exhausting journey.
🛣️ A long detour, forced by Edom's earlier refusal in Numbers 20
⏳ Adds real time and distance to an already hard journey
🔑 Sets up the discouragement described in the rest of this verse

## 😩 The Soul Of The People Was Much Discouraged Because Of The Way
"Soul" here means the whole person, not just an inner feeling — the people are worn out completely, body and spirit together, by this extra detour. This kind of weariness has led straight to sin before, and it does again just one verse later.
😩 "Soul" means the whole person, not just emotion
🔁 The same kind of weariness has triggered sin before in this book
🔑 Sets up the complaint that follows immediately

## 🗣️ Spake Against God, And Against Moses
This complaint aims at both God and Moses together — not just frustration with their leader, but open accusation against God himself. It repeats a pattern that shows up again and again across Exodus and Numbers whenever hardship hits.
🗣️ Directed at both God and Moses, not just their human leader
🔁 The same complaint pattern repeated throughout Exodus and Numbers
🔑 Hardship keeps triggering the exact same accusation

## ⚰️ Wherefore Have Ye Brought Us Up Out Of Egypt To Die In The Wilderness
This is the same bitter question Israel has asked before, treating God's rescue from slavery as if it were a trick meant to kill them instead. It ignores every provision God has already given — water, manna, victory over enemies — in favor of assuming the worst.
⚰️ The same accusation Israel has voiced multiple times before
🙈 Ignores every provision already given along the way
🔑 Fear rewrites rescue as betrayal

## 🍞 Our Soul Loatheth This Light Bread
"Light bread" is a contemptuous nickname for manna, the miracle food God has provided daily since Exodus 16. Calling it worthless isn't just a complaint about taste — it's rejecting God's provision itself as beneath them.
🍞 "Light bread" is a scornful nickname for the manna
🎁 Manna has been God's daily provision since Exodus 16
🔑 Rejecting the food means rejecting the God who sent it

## 🐍 The LORD Sent Fiery Serpents Among The People
"Fiery" most likely describes the burning, inflamed bite of these venomous snakes, which were a real danger in this desert region. The judgment matches the complaint with a kind of bitter irony — they despised bread from heaven, so death now comes up from the ground.
🐍 "Fiery" likely describes the burning venom of a real desert snake
⚖️ The judgment mirrors the complaint: bread rejected, death from below
🔑 Not a random punishment, but a pointed response to this specific sin

## ☠️ Much People Of Israel Died
This isn't exaggeration — the judgment is severe and the deaths are real. The chapter doesn't soften how serious this rebellion and its consequence actually were.
☠️ A real, severe judgment, not exaggerated language
📉 The text doesn't soften how serious this moment was
🔑 Consequences here are as concrete as the sin that caused them

## 😔 We Have Sinned, For We Have Spoken Against The LORD, And Against Thee
This time the people's confession is quick and specific — they name exactly what they did wrong, rather than just complaining about the consequence. It's a genuine turn compared to some of their earlier half-hearted reactions.
😔 A specific confession, naming the actual sin committed
⏱️ Comes quickly, without long delay
🔑 A more genuine turn than some earlier complaints in this book

## 🙏 Moses Prayed For The People
Moses again steps in as the mediator between the people and God, just as he has throughout Exodus and Numbers. He doesn't say "you brought this on yourselves" — he simply prays on their behalf.
🙏 Moses again acts as mediator, as he has throughout the journey
🤝 No lecture first — just intercession on the people's behalf
🔑 The same role Moses plays again and again for this nation

## 🪄 Make Thee A Fiery Serpent, And Set It Upon A Pole
God's remedy is strange on purpose — an image of the very thing that is killing them, lifted up where everyone can see it. Looking at a symbol of the judgment becomes, instead, the way out of it.
🪄 An image of the exact thing causing the deaths
👁️ Set up high, in plain view of the whole camp
🔑 The cure is shaped like the curse, not separate from it

## 👁️ When He Looketh Upon It, Shall Live
The healing doesn't come from any special ritual or effort — just looking at the bronze serpent in simple trust that God's promise is true. Centuries later, Jesus points back to this exact moment in John 3:14-15, comparing his own being "lifted up" on the cross to this pole, so that anyone who looks to him in faith can live.
👁️ Healing comes through simple trust, not effort or ritual
✝️ Jesus references this exact scene in John 3:14-15
🔑 A physical looking-and-living, and a spiritual one it later points to

## 🐍 Moses Made A Serpent Of Brass
Brass (bronze) was a durable, valuable metal, fitting for something meant to be seen clearly and preserved. Moses builds exactly what God described, no more and no less.
🐍 Brass (bronze) was durable and easy to see clearly
✅ Moses builds exactly what God commanded, nothing extra
🔑 Obedience here is careful and precise

## 🚫 The Serpent Later Named Nehushtan
This bronze serpent is preserved for centuries — and eventually the people start burning incense to it as if it were a god itself. Centuries later, King Hezekiah has to destroy it, giving it the mocking name Nehushtan ("a mere piece of bronze") in 2 Kings 18:4. Even something God once used for healing can turn into an idol if people stop worshiping the God behind it.
🚫 Later generations start worshiping the bronze object itself
🔨 King Hezekiah destroys it centuries later, in 2 Kings 18:4
🔑 A gift from God can still become an idol if misused

# Numbers 21:10-16
# 🏕️ Wilderness Stations Toward Moab
---
## 🏕️ The Children Of Israel Set Forward, And Pitched In Oboth
The text now moves into a travel log, naming each stop as Israel makes its way around Edom toward Moab. Oboth is simply the first named camp on this stretch of the journey.
🏕️ Marks the start of a travel log naming each camp
🗺️ Oboth is the first stop on this stretch
🔑 A record of real movement, not a vague summary

## 🌅 Ijeabarim, In The Wilderness Which Is Before Moab, Toward The Sunrising
"Toward the sunrising" is a standard Hebrew way of saying "east," used often in the Old Testament to give direction. This places the camp on the eastern edge of Moab's wilderness, still outside Moab's actual territory.
🌅 "Toward the sunrising" is a common biblical way of saying "east"
🗺️ Places the camp just outside Moab's territory, on its eastern edge
🔑 A precise geographic marker, not poetic decoration

## 🏞️ The Valley Of Zared
Crossing the valley of Zared marks a meaningful moment in Israel's timeline — Deuteronomy 2:14 later notes that 38 years passed between leaving Kadesh-barnea the first time and finally crossing this valley, the exact length of time it took for the unbelieving generation to die out in the wilderness.
🏞️ A brook/valley crossed on the way around Edom and Moab
⏳ Deuteronomy 2:14 ties this crossing to the full 38 years of wandering
🔑 Marks the end of the judgment generation's time in the wilderness

## 🗺️ On The Other Side Of Arnon...The Border Of Moab, Between Moab And The Amorites
The Arnon river was a major natural boundary, separating Moab to the south from the Amorite kingdom to the north. Camping on the Amorite side already signals that Israel is bypassing Moab peacefully, just as God instructed, and about to deal with the Amorites instead.
🗺️ The Arnon river marks the border between Moab and the Amorites
🕊️ Confirms Israel is passing Moab by, not attacking it
🔑 Sets up the coming conflict with the Amorites, not Moab

## 📖 The Book Of The Wars Of The LORD
This is a real reference to an ancient collection of victory songs and records that no longer survives — Scripture openly quotes an outside source here, the way a modern book might cite another historical text. It shows Israel already had a habit of writing down and singing about what God had done for them.
📖 A now-lost ancient collection of war songs, quoted here by name
📝 The Bible openly citing an outside historical source
🔑 Israel already had a practice of recording God's victories in song

## 🏞️ The Stream Of The Brooks...Ar...The Border Of Moab
More geographic detail confirming the exact path Israel is tracing along Moab's edge. These verses read almost like an itinerary, precise enough that later readers could trace the route on a map.
🏞️ More precise detail tracing the path along Moab's border
🗺️ Reads like an actual itinerary, not vague storytelling
🔑 The Bible treats this journey as real, trackable history

## 💧 Beer: That Is The Well Whereof The LORD Spake Unto Moses
"Beer" simply means "well" in Hebrew — the place is named for the very thing that happens there. God had promised Moses water at this spot, and now the promise is kept.
💧 "Beer" is the Hebrew word for "well"
✅ Named for the exact promise God fulfills there
🔑 A place named after God keeping his word

## 🎁 Gather The People Together, And I Will Give Them Water
This water is given freely, without any striking of a rock or any failure attached to it — a deliberate contrast to the disaster at Meribah just one chapter earlier in Numbers 20. Provision here comes without the leadership failure that marked the last water crisis.
🎁 Water given freely, with no rock-striking involved this time
⚖️ A clear contrast to the failure at Meribah in Numbers 20
🔑 God's provision continues even after leaders stumble

# Numbers 21:17-20
# 🎵 The Song Of The Well
---
## 🎶 Then Israel Sang This Song, Spring Up, O Well
This short poem is one of the few moments of genuine celebration in the book of Numbers, addressed directly to the well itself as if inviting it to respond. After so many chapters of complaint, this is a rare burst of praise.
🎶 A rare moment of celebration instead of complaint
🗣️ The song speaks directly to the well itself
🔑 One of the few genuinely joyful moments in this book

## ⛏️ The Princes Digged The Well, The Nobles Of The People Digged It
Israel's leaders — princes and nobles — do the physical digging themselves rather than leaving it to servants. It's a picture of leadership working alongside the people instead of standing apart from them.
⛏️ Leaders do the physical digging themselves
🤝 A picture of leadership working with the people, not above them
🔑 Contrasts with the leadership failures earlier in this book

## 👑 By The Direction Of The Lawgiver, With Their Staves
"The lawgiver" is Moses, and "staves" are simply staffs or walking sticks used here as digging tools. Even something as basic as digging a well happens under Moses' guidance.
👑 "The lawgiver" refers to Moses
🪄 "Staves" are staffs, used here as improvised digging tools
🔑 Even a simple task happens under organized leadership

## 🗺️ From The Wilderness They Went To Mattanah
The travel log picks back up, naming the next stop after this celebration. Mattanah simply marks the next stage of the journey toward Moab's plains.
🗺️ The travel log resumes after the song
➡️ Mattanah is the next stop toward Moab
🔑 Celebration doesn't pause the ongoing journey

## 🏔️ From Nahaliel To Bamoth
"Bamoth" means "high places," a name that quietly foreshadows the hilltop shrines Balak will later take Balaam to in the very next chapters, hoping to curse Israel from a high vantage point.
🏔️ "Bamoth" means "high places"
🔮 Foreshadows the high-place shrines used against Israel in Numbers 22-24
🔑 A name that quietly sets up the next major conflict

## 🏔️ To The Top Of Pisgah, Which Looketh Toward Jeshimon
Pisgah becomes a significant location later — Moses himself will view the entire promised land from this same mountain range before he dies, in Deuteronomy 34. "Jeshimon" means "wasteland" or "desert," describing the desolate view from the top.
🏔️ Pisgah is where Moses later views the promised land, in Deuteronomy 34
🏜️ "Jeshimon" means "wasteland" or "desert"
🔑 A location that will matter again at the very end of Moses' life

# Numbers 21:21-25
# ⚔️ Sihon Refuses, Israel Conquers The Amorites
---
## 👑 Israel Sent Messengers Unto Sihon King Of The Amorites
Israel tries diplomacy first, exactly as they did with Edom back in Numbers 20 — sending messengers to request peaceful passage before any thought of battle. The pattern of asking first repeats here.
👑 The same diplomatic approach used earlier with Edom
🕊️ Peaceful passage requested before any thought of battle
🔑 Israel doesn't default to war as a first option

## 🛣️ We Will Go Along By The King's Highway
The King's Highway was a real, well-known ancient trade route running north-south through this region — naming it specifically shows Israel wants to use one established road, not wander freely through Sihon's territory.
🛣️ A real, named ancient trade route, not a vague path
📍 Shows Israel's request is narrow and specific
🔑 The same careful, limited request made to Edom in Numbers 20

## 🚫 Sihon Would Not Suffer Israel To Pass Through His Border
Like Edom before him, Sihon refuses. But unlike Edom — whose land God had specifically protected as Esau's inheritance — the Amorite territory carries no such protection, which is part of why this refusal ends so differently.
🚫 A refusal that echoes Edom's answer in Numbers 20
⚖️ Unlike Edom, Sihon's land carries no divine protection
🔑 Sets up why this encounter, unlike Edom's, ends in battle

## ⚔️ Sihon Gathered All His People Together...And Fought Against Israel Into The Wilderness
Sihon doesn't just block the road — he mobilizes his entire army and attacks Israel directly at Jahaz, escalating the conflict himself. Israel is defending itself here, not launching an unprovoked invasion.
⚔️ Sihon escalates first, mobilizing his whole army
📍 The battle happens at Jahaz, a specific named location
🔑 Israel responds to an attack rather than starting one

## 🗡️ Israel Smote Him With The Edge Of The Sword
This is a common Hebrew idiom for total military defeat in close combat. Sihon's army is decisively beaten, ending the threat entirely.
🗡️ A common idiom for total, decisive defeat
✅ Ends the Amorite threat completely
🔑 A clear, complete Israelite victory

## 🗺️ Possessed His Land From Arnon Unto Jabbok
This is Israel's first real territorial conquest and permanent possession east of the Jordan — land that two and a half tribes will later ask to settle in, in Numbers 32. The Arnon-to-Jabbok stretch becomes a lasting part of Israel's territory.
🗺️ Israel's first lasting territorial conquest in this region
🏡 This exact land is claimed for settlement later, in Numbers 32
🔑 A turning point from wandering toward actually possessing land

## 🛡️ The Border Of The Children Of Ammon Was Strong
Israel stops at the Jabbok rather than pushing further east, because Ammon's territory — like Edom's and Moab's — was land God had specifically told Israel not to take, according to Deuteronomy 2:19. The stopping point isn't weakness; it's obedience.
🛡️ Ammon's land, like Edom's, was protected by God's own instruction
📖 Explained further in Deuteronomy 2:19
🔑 Israel stops here on purpose, not because they couldn't go further

## 🏙️ Israel Dwelt In Heshbon, And In All The Villages Thereof
Heshbon becomes Sihon's former capital and now Israel's new base in this region, along with its surrounding villages. It's a real, settled possession, not just a passing military win.
🏙️ Heshbon was Sihon's former capital city
🏘️ Israel takes the surrounding villages too, not just the city
🔑 A lasting settlement, not a brief raid

# Numbers 21:26-32
# 📜 The Taunt Song, And Jaazer
---
## 🏙️ Heshbon Was The City Of Sihon, Who Had Fought Against The Former King Of Moab
This explains something important: Sihon had already conquered this land from Moab before Israel ever arrived. Israel is taking the land from Sihon, an Amorite conqueror, not directly from Moab — a detail that matters for Israel's later territorial claims.
🏙️ Sihon had already taken this land from Moab, before Israel arrived
⚖️ Israel takes it from Sihon, not directly from Moab
🔑 A detail that matters for Israel's later territorial claims

## 📜 They That Speak In Proverbs Say
This introduces an old victory taunt-song, quoted here the same way the "book of the wars of the LORD" was quoted earlier in this chapter — Scripture again citing an existing outside poem to make its point.
📜 Introduces an old taunt-song, quoted like an outside source
🔁 The same kind of citation used earlier for the "wars of the LORD" book
🔑 Ancient poetry preserved by being quoted inside Scripture

## 🔥 For There Is A Fire Gone Out Of Heshbon, A Flame From The City Of Sihon
The song pictures Sihon's earlier conquest of Moab as a wildfire spreading outward from his capital, consuming everything in its path. It's poetic language for a real, devastating military campaign.
🔥 A poetic image comparing conquest to a spreading wildfire
🏙️ Pictured as starting from Heshbon, Sihon's capital
🔑 Vivid imagery describing a real historical campaign

## 😢 Woe To Thee, Moab! Thou Art Undone, O People Of Chemosh
Chemosh was the national god Moab worshiped, later condemned repeatedly in the Old Testament as a false god. Calling Moab "the people of Chemosh" ties their military defeat directly to the powerlessness of the god they trusted in.
😢 Chemosh was Moab's national god, a false god condemned later in Scripture
⚖️ Ties Moab's defeat to the failure of the god they trusted
🔑 A defeat framed as more than just a military loss

## ⛓️ He Hath Given His Sons...And His Daughters, Into Captivity Unto Sihon
The taunt-song describes real human cost — Moabite sons and daughters taken captive by Sihon in his earlier conquest, not just cities or land lost. It's a reminder of the real people behind these territorial wars.
⛓️ Describes real captives, not just lost land or cities
👨‍👩‍👧 A reminder of the human cost behind these ancient wars
🔑 Poetry here doesn't hide the human suffering involved

## 🗺️ We Have Shot At Them; Heshbon Is Perished Even Unto Dibon
The song sweeps across a wide stretch of named towns — Dibon, Nophah, Medeba — describing how far Sihon's earlier conquest reached across Moab's former territory. It reads like a geography lesson wrapped inside a war poem.
🗺️ Names a wide sweep of towns across the region
📖 A geography lesson embedded inside an old war poem
🔑 Shows how extensive Sihon's earlier conquest of Moab really was

## 🏕️ Thus Israel Dwelt In The Land Of The Amorites
A short summary statement closing out the Sihon episode — Israel now actually lives in this land, not just passing through it. The conquest becomes a real, lasting home.
🏕️ Marks Israel actually settling, not just passing through
🏡 Closes out the Sihon episode with a summary line
🔑 Conquest becomes lasting residence

## 🔎 Moses Sent To Spy Out Jaazer
Moses sends spies again here, but this mission looks nothing like the fearful spy report back in Numbers 13 — this time the spies simply scout ahead of a confident, victorious army instead of a doubting nation.
🔎 Spies sent again, echoing Numbers 13's earlier spy mission
💪 This time backed by confidence, not fear
🔑 The same kind of mission that once ended in disaster now succeeds

## 🏘️ They Took The Villages Thereof, And Drove Out The Amorites That Were There
Jaazer's villages are taken and its Amorite inhabitants driven out, extending Israel's new Transjordan territory even further. Momentum from the Sihon victory carries directly into this next, smaller conquest.
🏘️ Extends Israel's new territory even further
📈 Direct momentum from the earlier Sihon victory
🔑 Success builds on success, unlike the earlier spy failure

# Numbers 21:33-35
# 🛡️ Og King Of Bashan Defeated
---
## 🗺️ They Turned And Went Up By The Way Of Bashan
Bashan lay further north in the Transjordan region, known in later Scripture for its rich pastureland and strong cattle (see the "bulls of Bashan" in Psalm 22:12). Israel's advance keeps moving north after defeating Sihon.
🗺️ Bashan is a region further north in the Transjordan
🐂 Later known for rich pastures and strong cattle, like Psalm 22:12's "bulls of Bashan"
🔑 Israel keeps advancing north after the Sihon victory

## 👑 Og The King Of Bashan
This is Og's first appearance in the Bible, and he'll be remembered later as one of the last of the Rephaim, a race remembered as giants — Deuteronomy 3:11 even describes his iron bed as over thirteen feet long. He is a genuinely intimidating enemy, not a minor one.
👑 Og's first appearance in Scripture
🛏️ Deuteronomy 3:11 later describes his iron bed as over thirteen feet long
🔑 A remembered giant, not a minor or forgettable enemy

## ⚔️ Went Out Against Them...To The Battle At Edrei
Like Sihon before him, Og chooses to attack rather than negotiate, meeting Israel's army at the specific location of Edrei. The pattern from the previous battle repeats almost exactly.
⚔️ Og attacks first, just as Sihon did
📍 The battle happens at Edrei, a specific named site
🔑 The same pattern of confrontation repeats from the Sihon battle

## 🕊️ Fear Him Not: For I Have Delivered Him Into Thy Hand
God speaks directly to Moses before this battle, addressing the very real fear a giant king like Og could provoke. The promise of victory comes before the fighting even starts.
🕊️ God directly addresses the fear a giant enemy could cause
✅ The promise of victory comes before the battle begins
🔑 Confidence here is rooted in God's word, not army size

## 🔁 As Thou Didst Unto Sihon King Of The Amorites
God explicitly compares this coming victory to the one Israel just won over Sihon, building confidence through a recent, remembered success. What God did once, he promises to do again.
🔁 Directly compares this fight to the recent Sihon victory
📈 Builds confidence through a recent, remembered success
🔑 Past faithfulness becomes the basis for present trust

## ☠️ Smote Him, And His Sons, And All His People, Until There Was None Left Him Alive
This total-destruction language matches the vow Israel made back in verse 2 of this very chapter, completing the pattern begun there. It's the same complete, dedicated defeat carried out a second time in one chapter.
☠️ Matches the total-destruction vow made back in verse 2
🔁 The same complete pattern of victory repeated a second time
🔑 A chapter that opens and closes with the same kind of total victory

## 🗺️ They Possessed His Land
Bashan now joins the growing Transjordan territory Israel controls, alongside Sihon's former kingdom. Two major victories in one chapter leave Israel holding real, lasting ground east of the Jordan for the first time.
🗺️ Bashan joins Sihon's former land as new Israelite territory
🏡 Two major victories, one chapter, real lasting ground
🔑 Israel now genuinely possesses territory east of the Jordan
`;

export const NUMBERS_TWENTY_ONE_PERSONAL_SECTIONS = parseNumbersTwentyOneRawNotes(NUMBERS_TWENTY_ONE_RAW_NOTES);
