export type DeuteronomyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyTwoRawNotes(rawText: string): DeuteronomyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 2:${startVerse}` : `Deuteronomy 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Deuteronomy 2 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_TWO_RAW_NOTES = `# Deuteronomy 2:1-8
# 🥾 Skirting The Edge Of Edom
---
## 🧭 We Compassed Mount Seir Many Days

Compassed means they wandered in a wide circle, not a straight line.

Mount Seir is the hill country of Edom, home to the descendants of Esau.

Israel had already brushed against this same border back in the book of Numbers.

This slow circling quietly covers years chapter one barely mentioned.

🧭 Compassed means they wandered in a circle

🏔️ Mount Seir is Edom's hill country

👥 Edom descended from Esau, Jacob's brother

📖 Years passed while Israel circled this border

## 🔁 Ye Have Compassed This Mountain Long Enough

God speaks almost the same words used back at Horeb in chapter one.

There the command ended a full year of standing still at Sinai.

Here it ends years of aimless circling around Edom's border instead.

God decides when a season of waiting is actually finished.

🔁 This echoes the command back at Horeb

⏳ That earlier pause lasted about a year

🔄 This pause lasted through years of circling

➡️ God decides when waiting is truly over

## 🧭 Turn You Northward

This is a short, literal marching order, not a suggestion.

Northward points Israel away from wandering, toward the land beyond Edom and Moab.

After so many aimless years, a clear direction must have felt like relief.

The rest of the chapter follows this one new heading.

🧭 Turn northward means change direction now

🗺️ North leads toward the promised land

😮‍💨 A clear direction breaks years of wandering

➡️ The chapter follows this new heading

## 👥 The Children Of Esau, Which Dwell In Seir

Esau was Isaac's older son and Jacob's twin brother.

His descendants, called Edomites, settled the region called Seir generations earlier.

Israel is about to walk right along the border of relatives, not strangers.

That family connection changes how this whole crossing has to be handled.

👥 Esau was Jacob's twin brother

🏔️ His descendants settled in Seir

🚶 Israel walks the border of relatives

📖 Family ties shape how this crossing works

## 😨 They Shall Be Afraid Of You

Word of Israel's recent victories had already reached the surrounding nations.

Edom has real reason to fear an army camped near its border.

God is not sending Israel to conquer Edom despite that fear.

This warning exists so fear does not get mistaken for permission to attack.

😨 Edom has real reason to fear

📰 News of Israel's power spread ahead

🚫 Fear from Edom is not permission

➡️ God still forbids attacking Edom here

## ⚔️ Meddle Not With Them

Meddle means stir up conflict or provoke a fight.

God commands Israel to leave Edom completely alone.

This land already belongs to Esau's family by God's own gift.

Respecting another nation's border was not optional here.

⚔️ Meddle means stir up a fight

🚫 Israel must leave Edom alone

🎁 God already gave Edom this land

📖 Even Israel had to respect a border

## 👣 Not So Much As A Foot Breadth

This is an old way of saying not even the smallest amount of ground.

Israel could not claim one single step of Edom's territory.

That is a stricter limit than simply avoiding a battle.

The command protects every inch of Edom's land, not only its safety.

👣 Foot breadth means the smallest amount

🚫 Not one step of land allowed

⚖️ Stricter than just avoiding a fight

📖 Every inch of Edom's land was protected

## 🎁 I Have Given Mount Seir Unto Esau For A Possession

God assigned this land to Esau generations before Israel ever left Egypt.

Israel is not the only nation whose homeland came from God directly.

This verse quietly shows God ruling over lands outside Israel's own inheritance.

Esau lost the birthright in Genesis but still received a lasting home.

🎁 God gave Seir to Esau earlier

🌍 God placed other nations too

👑 God rules over lands beyond Israel

📖 Esau still received a lasting home

## 💰 Ye Shall Buy Meat Of Them For Money

Israel is told to pay for every meal instead of taking anything by force.

Buying food from Edom treated them as neighbors, not enemies to be raided.

This small commercial detail proves the peace command was meant to be lived out.

A whole nation moving through foreign land still had to act with honesty.

💰 Israel had to pay for food

🤝 Buying treated Edom as neighbors

✅ This proved the peace command was real

📖 Even a huge camp acted honestly

## 📆 These Forty Years The LORD Thy God Hath Been With Thee

Moses steps back to summarize the whole wilderness journey in one line.

Forty years of provision means Israel never once ran out of what it needed.

Thou hast lacked nothing is a bold claim after so many hard chapters.

This verse quietly answers every complaint raised earlier in Deuteronomy and Numbers.

📆 Forty years covers the whole journey

🍞 Israel never truly ran out of need

💬 Lacked nothing is a bold claim

📖 One line answers years of complaints

## 🌊 From Elath, And From Eziongaber

Elath and Eziongaber sat at the head of the Red Sea's eastern gulf.

Today that same inlet is called the Gulf of Aqaba.

Both cities marked the southern edge of Edom's territory.

Solomon later built ships at this same Eziongaber, generations after this crossing.

🌊 Elath and Eziongaber sat by the Red Sea

🗺️ They marked Edom's southern edge

⛵ Solomon later built ships at Eziongaber

📖 The names mark how far Israel had traveled

# Deuteronomy 2:9-15
# ⏳ Thirty Eight Years To Cross One Brook
---
## 🚫 Distress Not The Moabites

Moab receives the same protection just given to Edom.

God forbids Israel from attacking or provoking this nation either.

Moab descended from Lot, Abraham's nephew, making this another family connection.

Two nations in a row get spared even though Israel could likely defeat them.

🚫 Moab gets the same protection as Edom

👥 Moab descended from Lot, Abraham's nephew

🛡️ Israel is told not to attack

📖 Family ties spared a second nation

## 🗺️ I Have Given Ar Unto The Children Of Lot

Ar was Moab's territory, named directly as Lot's inheritance here.

Lot was Abraham's nephew, rescued years earlier from Sodom's destruction.

God assigning this land to Lot's family mirrors the earlier gift to Esau.

The pattern repeats, God settles nations before Israel ever nears their borders.

🗺️ Ar was Moab's given territory

👴 Lot was Abraham's nephew

🔥 He was rescued earlier from Sodom

📖 God settled nations before Israel arrived

## 👹 The Emims Dwelt Therein In Times Past

The Emims were an earlier people who lived in Moab's land before the Moabites.

Emims means terrors in the original language.

They were remembered as great, many, and unusually tall.

This short detour explains who actually built the land Moab now holds.

👹 Emims lived in Moab's land first

😱 Emims means terrors

📏 They were remembered as very tall

📖 Moab inherited a land with a past

## 🗣️ Accounted Giants, As The Anakims

Anakim were the tall, feared people the spies described back in Numbers.

This verse compares the Emims directly to that same frightening group.

Moabites called them Emims, while Israel used the name Anakims for a similar people.

Different nations gave different names to what looked like the same kind of people.

👹 Anakims were the spies' feared giants

🔗 Emims get compared to that group

🗣️ Different nations, different names

📖 Fear of giants was widespread here

## 🏔️ The Horims Also Dwelt In Seir Beforetime

The Horims lived in Edom's land before Esau's descendants arrived.

Esau's family eventually destroyed them and took their place, the same as the Emims story.

Moses adds one more detail here, Israel is about to do this exact same thing.

God cleared land for other nations long before He cleared it for Israel.

🏔️ Horims lived in Seir before Edom

⚔️ Edom destroyed them and settled there

🔁 Israel is about to repeat this pattern

📖 God cleared land for others too

## 🌊 Rise Up, And Get You Over The Brook Zered

Zered was a stream marking the border between Moab and Edom.

This one short command ends the long circling described back in verse one.

Crossing this brook becomes the exact marker for how long Israel had wandered.

A small stream carries far more weight here than its size suggests.

🌊 Zered marked Moab's southern border

🧭 This command ends years of circling

📏 The crossing becomes a real marker

📖 A small stream carries real weight

## 🔢 Was Thirty And Eight Years

This is the exact number of years between leaving Kadeshbarnea and crossing the Zered.

Most of Israel's forty wilderness years happened somewhere inside that one gap.

Almost the entire rebellious generation quietly died out during this unrecorded stretch.

One plain number reveals just how long unbelief actually cost that generation.

🔢 Thirty eight years passed in this gap

📆 Most of the forty years sit here

⚰️ The rebellious generation died during this time

📖 Unbelief cost decades, not just one moment

## 📜 Until All The Generation Of The Men Of War Were Wasted Out

This confirms the oath from chapter one, that generation would not enter the land.

Wasted out means they died off completely, not that they simply grew old peacefully.

God kept a hard promise exactly as long as He said He would.

The waiting was not random, it followed a plan announced years earlier.

📜 This fulfills the oath from chapter one

⚰️ Wasted out means they died off completely

✅ God kept His promise exactly

📖 Nothing about this delay was random

## ✋ The Hand Of The LORD Was Against Them

Moses names God directly as the reason that whole generation did not survive.

This was not simply bad luck or the ordinary danger of desert life.

The judgment named back in Numbers fourteen plays out silently over decades.

A slow ending can still be a direct act of God.

✋ God is named as the direct cause

🚫 This was not random bad luck

📜 Numbers fourteen already announced this judgment

📖 Slow endings can still be God's hand

# Deuteronomy 2:16-23
# 👹 A Land Once Ruled By Giants
---
## ⏳ When All The Men Of War Were Consumed And Dead

This line marks the exact moment the thirty eight year wait finally ended.

The old rebellious generation is now completely gone from the camp.

Only after that full generation passed does the story move forward again.

God's timing here was patient, not rushed, even toward a hard ending.

⏳ The long wait finally ends here

⚰️ The rebellious generation is now gone

🔁 The story only now moves forward

📖 God's timing was patient, not rushed

## 🗺️ Pass Over Through Ar, The Coast Of Moab

Ar was the same territory already named as Moab's God given land in verse nine.

Israel is allowed to travel through it without attacking or settling there.

Passing through peacefully is different from conquering, and this verse keeps that line clear.

Respecting a neighbor's border again shapes exactly how Israel moves.

🗺️ Ar is Moab's territory from verse nine

🚶 Israel may pass through peacefully

🚫 Passing through is not conquering

📖 Borders still shaped Israel's path

## 👥 The Children Of Ammon

Ammon, like Moab, descended from Lot through his daughters after Sodom's destruction.

This makes Ammon another distant relative nation, not a stranger to Israel.

God repeats the exact same warning already given twice for Edom and Moab.

A third nation in a row receives protection because of family ties.

👥 Ammon also descended from Lot

🔥 That line began after Sodom's destruction

🔁 The same warning repeats a third time

📖 Family ties protected three nations in a row

## 🚫 Distress Them Not, Nor Meddle With Them

Distress and meddle name two separate things Israel must not do to Ammon.

Distress means causing harm or hardship.

Meddle means picking a fight or stirring up conflict.

Two different words cover both passive harm and active aggression.

🚫 Distress and meddle are two commands

😣 Distress means causing harm or hardship

⚔️ Meddle means starting a fight

📖 Both passive harm and active aggression were banned

## 👹 The Zamzummims

Zamzummims was the Ammonite name for an earlier tall, feared people in their land.

This is the third name given to what sounds like the same kind of giant clan.

Emims, Anakims, and Zamzummims may describe overlapping groups known by different local names.

The repetition shows how widespread fear of these tall peoples really was.

👹 Zamzummims were Ammon's earlier giant people

🗣️ This is the third name for giants

🔗 These groups likely overlapped each other

📖 Giant peoples show up again and again

## ✋ The LORD Destroyed Them Before Them

God cleared the Zamzummims out of Ammon's way.

This matches what already happened for Edom and for Moab.

A pattern is forming across this whole chapter.

God settles nations long before Israel ever reaches their border.

✋ God cleared the way for Ammon

🔁 This matches Edom and Moab's story

📐 A clear pattern runs through this chapter

📖 God settles nations before Israel arrives

## 🔗 As He Did To The Children Of Esau

Moses ties three stories together here, Edom, Ammon, and now this comparison again.

Each nation received land only after God removed an earlier, more powerful people.

Even unto this day shows the result still stood in Moses' own time.

None of these victories belonged to Edom, Moab, or Ammon's own strength.

🔗 Moses ties three nations together here

✋ Each clearing came from God, not strength

📆 The result still stood in Moses' time

📖 No nation cleared its own land alone

## 🏘️ The Avims Which Dwelt In Hazerim

The Avims were yet another earlier people, living further west near the coast.

Hazerim describes open, unwalled villages, not a single walled city.

Even unto Azzah locates this region near Gaza, along the Mediterranean coast.

This detail widens the pattern beyond Edom, Moab, and Ammon to the coast too.

🏘️ Avims lived in open coastal villages

🗺️ Hazerim means unwalled villages

📍 Azzah is the region near Gaza

📖 The same pattern reached the coast too

## 🏝️ The Caphtorims, Which Came Forth Out Of Caphtor

Caphtor is widely believed to be the island of Crete, across the Mediterranean Sea.

The Caphtorims arrived from overseas and displaced the Avims who lived there first.

This is a rare Old Testament hint that ancient peoples crossed the sea to settle new land.

Later prophets connect this same Caphtor to the Philistines.

🏝️ Caphtor is widely believed to be Crete

⛵ Caphtorims arrived to this land by sea

🔄 They displaced the Avims already living there

📖 Later prophets link Caphtor to the Philistines

# Deuteronomy 2:24-30
# 🚧 An Offer Of Peace, Refused
---
## 🌊 Pass Over The River Arnon

The Arnon was a deep river gorge marking the border between Moab and the Amorites.

Crossing it means Israel is finally leaving land it had to respect and entering land it could take.

Everything changes at this one river, protection ends and conquest begins.

The whole tone of the chapter shifts right here.

🌊 Arnon marked Moab's northern border

🚧 This river separated protected land from open land

⚔️ Conquest could finally begin past this point

📖 The chapter's tone shifts at this river

## 👑 Sihon The Amorite, King Of Heshbon

Sihon ruled an Amorite kingdom centered at Heshbon, north of Moab.

Unlike Edom, Moab, and Ammon, this land was never promised or protected.

God names Sihon directly as the first real target for conquest.

This king becomes the first test of everything Israel has been told to trust.

👑 Sihon ruled from the city of Heshbon

🚫 This land carried no protection like the others

🎯 Sihon is named as the first target

📖 This battle would test Israel's trust

## 😨 I Will Begin To Put The Dread Of Thee Upon The Nations

God promises Israel's reputation itself will start working before a single battle happens.

Dread and fear here describe nations trembling just from hearing reports about Israel.

This reverses the fear Israel itself felt hearing about giants back in chapter one.

Now other nations feel that same fear because of what God is doing through Israel.

😨 Other nations will fear Israel's reputation

📰 Fear spreads before any battle starts

🔄 This reverses the fear from chapter one

📖 God turns Israel's fear into others' fear

## 🕊️ I Sent Messengers Unto Sihon With Words Of Peace

Even with a divine promise of victory already given, Moses still offers peace first.

This mirrors exactly what Israel did earlier with Edom and Moab.

Conquest was never the first choice, even against a nation with no protection.

Sihon's own refusal, not Israel's aggression, is what actually starts this war.

🕊️ Moses offers peace before any attack

🔁 This matches the approach used with Edom

🚫 Conquest was never the first option

📖 Sihon's own refusal starts this war

## 🛣️ I Will Go Along By The Highway

This likely names the King's Highway, a major trade route running north through the region.

Moses promises to stay on the main road instead of spreading out across Sihon's farmland.

Not turning to the right hand or left means keeping that promise exactly.

This offer costs Sihon almost nothing, making his refusal even harder to justify.

🛣️ This likely names the King's Highway

🚶 Israel promised to stay on the road

✅ Not turning means keeping that promise exactly

📖 Sihon's refusal cost him a fair offer

## 💰 Thou Shalt Sell Me Meat For Money

This repeats word for word the same offer already made to Edom back in verse six.

Israel is not asking for free passage or free supplies.

Paying for every meal again proves this really was a peaceful request.

A repeated offer this generous makes Sihon's coming refusal look even worse.

💰 The same paid offer as Edom

🚫 Not a request for free supplies

✅ Paying again proved peaceful intent

📖 A generous offer makes refusal look worse

## 🛒 As The Moabites Which Dwell In Ar, Did Unto Me

Moses recalls Edom and Moab both selling Israel food and water.

That happened along the border, not through the nation's heartland.

Numbers twenty already showed Edom refusing to let Israel cross with an army.

Buying supplies at the edge and marching through the center were two different requests.

🛒 Edom and Moab both sold Israel supplies

🚫 That is different from marching through

📜 Numbers twenty showed Edom refusing full passage

📖 A border sale was not full access

## 🚫 Sihon Would Not Let Us Pass By Him

Every other nation in this chapter either allowed passage or was left alone.

Sihon becomes the first flat refusal of a peaceful, paid offer.

Hardened his spirit means God strengthened Sihon's own stubborn choice.

God did not force Sihon to hate Israel, He simply let that choice run its course.

🚫 Sihon refuses a peaceful offer

🧊 God hardened Sihon's already stubborn spirit

🎯 God let that stubbornness run its course

📖 Refusal, not force, set up this war

## 🎯 Until I Shall Pass Over Jordan Into The Land

Moses states Israel's true destination plainly.

Crossing the Jordan, not staying in Sihon's territory, was always the real goal.

This request cost Sihon nothing permanent, only safe travel through his land.

Sihon's refusal only makes sense as fear or pride, not real cost.

🎯 Jordan was always Israel's real destination

🚶 Sihon was only asked for safe travel

💸 The request cost Sihon nothing permanent

📖 Refusal made no practical sense

# Deuteronomy 2:31-37
# ⚔️ Total Victory Over Sihon
---
## 🎯 I Have Begun To Give Sihon And His Land Before Thee

God speaks of this victory as already begun before the battle even starts.

This matches the same confident language used earlier about the nations trembling in verse twenty five.

Israel is told to act, not simply wait for something to happen on its own.

Faith here looks like marching toward a promise, not standing still for it.

🎯 God calls the victory already begun

🔁 This matches the promise from verse twenty five

🚶 Israel still has to act, not wait

📖 Faith here means marching toward the promise

## 📍 To Fight At Jahaz

Jahaz was a city in Sihon's territory, the site of this one battle.

Sihon chooses open war instead of the peace Moses offered back in verse twenty six.

His refusal in verse thirty and this attack are the same decision playing out.

A king who could have avoided this entirely instead marched straight into it.

📍 Jahaz was the site of this battle

⚔️ Sihon chose war over Moses' peace offer

🔁 His refusal and this attack are one decision

📖 Sihon marched into a fight he could avoid

## 💥 We Smote Him, And His Sons, And All His People

This is total, decisive defeat, not a partial or negotiated victory.

Sihon's sons are named specifically, meaning his own line of succession ended with him.

Later chapters in Deuteronomy describe this same battle again as proof of God's power.

This victory becomes one of the clearest, most repeated examples in the whole book.

💥 This was a total defeat

👑 Sihon's own line ended with him

🔁 Later chapters repeat this same battle

📖 This became proof of God's power

## ⚖️ Utterly Destroyed The Men, And The Women, And The Little Ones

This describes what many scholars call herem, complete destruction dedicated to God as judgment.

It is one of the hardest verses in the book, and it deserves an honest look.

Genesis fifteen already named the sin of the Amorites generations before this battle.

This command was tied to that specific judgment, not applied as a general policy.

⚖️ Herem means complete dedicated destruction

📜 Genesis fifteen already named Amorite sin

🎯 This judgment was tied to this battle

📖 This was not a general policy

## 🐄 Only The Cattle We Took For A Prey

Livestock and goods were kept this time, unlike the people themselves.

This detail shows the destruction targeted a specific judgment, not simple plunder for profit.

Israel still gained real, practical provision from this victory.

The distinction between what was kept and what was not mattered to the text.

🐄 Livestock and goods were kept here

🎯 The judgment targeted people, not property

💰 Israel gained real provision from this

📖 What was kept and destroyed both mattered

## 🏰 There Was Not One City Too Strong For Us

Aroer sat right on the edge of the Arnon gorge, marking where this campaign began.

From that gorge north to Gilead, every single city fell to Israel.

No fortified wall or strong position could stop this particular campaign.

The text credits this whole run of victories to God, not to Israel's own army.

📍 Aroer marked where this campaign began

🏰 Every city between there and Gilead fell

🧱 No fortification could stop this campaign

📖 God gets credit for the whole run

## 🛑 Only Unto The Land Of The Children Of Ammon Thou Camest Not

Israel stopped exactly at Ammon's border, even in the middle of a winning campaign.

This proves the earlier command in verse nineteen was still being honored in real time.

The river Jabbok marked that boundary, a name that will matter again later in Genesis and Judges.

A nation capable of total victory still stopped where God said stop.

🛑 Israel stopped exactly at Ammon's border

✅ This proves verse nineteen was still honored

🌊 The Jabbok marked that boundary

📖 Victory still stopped where God said stop

## 🔁 The LORD Our God Delivered All Unto Us

This exact phrase repeats within just a few verses, once in verse thirty three and again here.

Repetition in Hebrew narrative usually signals the point the writer wants remembered most.

Every victory in this chapter gets credited to God before it gets credited to Israel.

The chapter that began with forty years of waiting ends in total, credited victory.

🔁 This phrase repeats within a few verses

📢 Repetition marks what the writer wants remembered

🏆 Every victory is credited to God first

📖 Decades of waiting end in credited victory
`.trim();

export const DEUTERONOMY_TWO_PERSONAL_SECTIONS = parseDeuteronomyTwoRawNotes(DEUTERONOMY_TWO_RAW_NOTES);
