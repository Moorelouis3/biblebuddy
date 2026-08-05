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
# ⚔️ King Arad Attacks And Israel's Vow
---
## 🔎 Heard Tell That Israel Came By The Way Of The Spies

The word spies points back to a specific earlier trip.

Numbers 13 sent twelve men to explore this same land.

Almost forty years have passed since that mission failed.

A new generation is now walking that same ground.

Old enemies had never stopped watching this border.

🔎 Spies recalls the mission in Numbers 13

⏳ Almost forty years have passed since then

🧭 A new generation walks the same ground

📖 Old enemies never stopped watching this border

## ⛓️ Took Some Of Them Prisoners

This is a real defeat, not another easy victory.

Arad captures some of Israel's own people.

The wilderness journey has already been long and hard.

Now it gets harder before anything improves.

This loss is what drives Israel to pray next.

⚔️ Arad wins the first exchange

😟 Israel loses people as captives

📉 A real setback, not an easy win

📖 This loss drives Israel to pray next

## 🙏 Israel Vowed A Vow Unto The Lord

A vow means a binding promise made to God.

A vow usually has two sides.

If God does this, I will do that.

This is not a casual bargain.

It is a serious commitment.

Israel turns to God first this time, before complaining.

That is a real change from their usual pattern in this book.

🙏 A vow is a binding promise to God

🤝 A vow usually has two sides

🔄 A change from their usual complaining first

📖 Israel turns to God before the fight

## 🔥 Then I Will Utterly Destroy Their Cities

Utterly destroy means totally dedicating the enemy's cities to God.

Nothing gets kept back as loot or personal gain.

The victory belongs to God, not to Israel's army.

This same language returns again and again later in Joshua.

Israel promises to give God the credit before the battle even starts.

🔥 Utterly destroy means total dedication, not looting

🏆 Victory is credited to God, not Israel

📜 The same language returns often in Joshua

📖 Credit is promised before the fight begins

## 👂 The Lord Hearkened To The Voice Of Israel

Hearkened is an old word for listened and then acted.

God does not merely hear Israel's vow.

He responds to it directly, handing the Canaanites over.

The victory comes from God's response, not from Israel's own strength.

👂 Hearkened means listened and then acted

✅ God answers the vow from verse two

💪 Victory rests on God's response, not strength

📖 The win is credited to God

## 📛 He Called The Name Of The Place Hormah

Hormah means destruction in Hebrew.

This is not a new name given for the first time.

Numbers 14:45 already used this exact name for a disaster.

That earlier Hormah marked a defeat, after Israel attacked without permission.

The same place name now marks a victory instead.

📛 Hormah means destruction

🔁 The same name appears in Numbers 14:45

😔 That earlier moment was a defeat

📖 Obedience turns old shame into victory

# Numbers 21:4-9
# 🐍 Fiery Serpents And The Bronze Serpent
---
## 🛣️ By The Way Of The Red Sea, To Compass The Land Of Edom

Edom refused to let Israel pass through back in Numbers 20.

That refusal forces a long detour now.

Israel must travel back toward the Red Sea before curving around Edom's border.

This route adds real distance to an already exhausting trip.

The detour itself becomes the reason for what happens next.

🛣️ Edom's earlier refusal forces this detour

⏳ The route adds real time and distance

🧭 Israel curves around Edom instead of through it

📖 This hardship sets up the complaint ahead

## 😩 The Soul Of The People Was Much Discouraged Because Of The Way

Soul here does not mean just an inner feeling.

It means the whole person, body and spirit together.

The people are worn out completely, not just annoyed.

This same kind of exhaustion has led straight to sin before in this book.

It does again, one verse later.

💤 Soul means the whole person, not one feeling

😩 The people are worn out completely

🔁 This exhaustion has caused sin before

📖 It leads straight to a complaint again

## 🗣️ Spake Against God, And Against Moses

This complaint is not aimed only at Moses.

It is aimed at God directly too.

That makes it an accusation, not just frustration with a leader.

This same pattern shows up again and again through Exodus and Numbers.

Hardship keeps triggering the exact same accusation.

🗣️ The complaint targets God, not only Moses

⚠️ That makes it an accusation, not frustration

🔁 The same pattern repeats through Exodus and Numbers

📖 Hardship keeps producing the same accusation

## ⚰️ Wherefore Have Ye Brought Us Up Out Of Egypt To Die In The Wilderness

Israel treats their rescue from slavery as if it were a trick.

They act as though God freed them only to kill them in the desert.

This ignores every provision God has already given.

Fear rewrites a rescue into a betrayal.

⚰️ Israel accuses God of a cruel trick

🙈 This ignores every provision God already gave

😨 Fear reframes rescue as betrayal

📖 The same accusation has been voiced before

## 🍞 Our Soul Loatheth This Light Bread

Light bread is a scornful nickname for the manna.

Manna has fed Israel every day since Exodus 16.

Calling it worthless is not really a complaint about taste.

It is a rejection of the God who sent it.

🍞 Light bread is a scornful name for manna

🎁 Manna has fed Israel since Exodus 16

🚫 Rejecting the food rejects the giver

📖 A complaint about bread is really about God

## 🐍 The Lord Sent Fiery Serpents Among The People

Fiery likely describes the burning bite of a venomous snake.

These snakes were a real danger in this desert region.

The judgment matches the complaint on purpose.

Israel despised bread sent from above.

Now death comes up from the ground instead.

🐍 Fiery likely describes a burning venomous bite

🏜️ These snakes were a real desert danger

⚖️ The judgment mirrors the exact complaint

📖 This is a pointed response, not random

## ☠️ Much People Of Israel Died

This is not exaggeration.

The judgment is severe and the deaths are real.

The text does not soften what happened here.

Consequences in this chapter are as concrete as the sin that caused them.

☠️ A real and severe judgment

📉 The text does not soften the loss

⚖️ Consequences match the seriousness of the sin

📖 Scripture states hard truths plainly

## 😔 We Have Sinned, For We Have Spoken Against The Lord, And Against Thee

This confession comes quickly, without a long delay.

The people name the exact sin they committed.

They do not just complain about the punishment.

Compared to earlier complaints in this book, this is a genuine turn.

😔 The confession is specific, not vague

⏱️ It comes quickly, without delay

🔁 Earlier complaints were far less honest

📖 This is real repentance, not just regret

## 🙏 Moses Prayed For The People

Moses steps in again as the mediator between the people and God.

He has done this same thing throughout Exodus and Numbers.

He does not lecture them first.

He simply prays on their behalf.

🙏 Moses again acts as mediator

🤝 No lecture is given first

🔁 The same role Moses plays again and again

📖 Intercession comes before anything else

## 🪄 Make Thee A Fiery Serpent, And Set It Upon A Pole

God's remedy looks strange on purpose.

It is shaped like the very thing that is killing them.

That image is lifted up where the whole camp can see it.

Looking at a symbol of the judgment becomes the way out of it.

🪄 The image copies the very thing causing death

👁️ It is lifted up in plain view

🔑 The cure is shaped like the curse

📖 Looking at judgment becomes the way to life

## 👁️ When He Looketh Upon It, Shall Live

Healing here does not come from any ritual or effort.

It comes from simply looking at the bronze serpent in trust.

Centuries later, Jesus points back to this exact moment in John 3:14 and 15.

He compares his own being lifted up on the cross to this pole.

Anyone who looks to him in faith can live.

Israel once looked at bronze and lived the same way.

👁️ Healing comes through simple trust, not effort

✝️ Jesus later points back to this scene

🔁 A healing that points ahead spiritually

📖 Faith, not effort, is what saves

## 🐍 Moses Made A Serpent Of Brass

Brass here means bronze, a durable metal.

It was built to last and easy to see from a distance.

Moses builds exactly what God described, nothing more and nothing less.

This same bronze object survives for centuries afterward.

Eventually people begin worshiping it instead of the God who used it.

King Hezekiah later destroys it in 2 Kings 18:4.

He calls it Nehushtan, a mere piece of bronze.

Even something God once used for healing can become an idol.

🐍 Brass means a durable, lasting bronze

✅ Moses builds exactly what God commanded

🔨 Hezekiah destroys it later in 2 Kings 18:4

📖 A gift can still become an idol

# Numbers 21:10-16
# 🏕️ Wilderness Stations Toward Moab
---
## 🏕️ The Children Of Israel Set Forward, And Pitched In Oboth

The text now shifts into a travel log.

Each stop gets its own name as Israel moves toward Moab.

Oboth is simply the first camp on this stretch.

A record like this treats the journey as real, trackable history.

🏕️ Marks the start of a travel log

🗺️ Oboth is the first named stop here

📜 Real movement, not a vague summary

📖 Scripture treats this journey as real history

## 🌅 Ijeabarim, In The Wilderness Which Is Before Moab, Toward The Sunrising

Toward the sunrising is an old way of saying east.

The Old Testament uses this phrase often to give direction.

This places the camp on the eastern edge of Moab's wilderness.

Israel is still outside Moab's own territory at this point.

🌅 Toward the sunrising means east

🗺️ The camp sits on Moab's eastern edge

🚷 Still outside Moab's actual territory

📖 A precise marker, not poetic decoration

## 🏞️ The Valley Of Zared

Crossing this valley marks a meaningful moment in the story.

Deuteronomy 2:14 later ties this crossing to thirty eight years of wandering.

That is the exact length of time since Israel first left Kadesh Barnea.

It marks the end of the road for the generation God judged.

🏞️ Zared is a valley crossed on this stretch

⏳ Deuteronomy 2:14 ties it to thirty eight years

📆 That matches the years since Kadesh Barnea

📖 It marks the end of a judged generation

## 🗺️ For Arnon Is The Border Of Moab, Between Moab And The Amorites

The Arnon river was a major natural border in this region.

It separated Moab to the south from the Amorite kingdom to the north.

Camping on this side already signals something important.

Israel is passing Moab peacefully, exactly as God instructed.

The next chapters will deal with the Amorites instead.

🗺️ The Arnon river divides Moab from the Amorites

🕊️ Confirms Israel is passing Moab peacefully

🧭 Sets up the coming meeting with the Amorites

📖 Geography here signals what happens next

## 📖 The Book Of The Wars Of The Lord

This is a real reference to an old collection of victory songs.

That book no longer survives today.

Scripture is openly quoting an outside source here.

Israel already had a habit of writing down what God had done for them.

📖 A lost ancient collection of war songs

📝 Scripture openly quotes an outside source

🎼 Israel had a habit of recording victories

➡️ A real book, not a poetic invention

## 🏞️ The Stream Of The Brooks That Goeth Down To The Dwelling Of Ar

This verse adds more precise geography along Moab's edge.

These few verses read almost like an itinerary.

A later reader could trace this exact route on a map.

Small details like this show the journey really happened.

🏞️ More precise detail along Moab's border

🗺️ Reads like an actual itinerary

📍 A route later readers could trace

📖 Small details confirm real history

## 💧 Beer: That Is The Well Whereof The Lord Spake Unto Moses

Beer simply means well in Hebrew.

The place is named for the very thing that happens there.

God had already promised Moses water at this exact spot.

Now that promise is finally kept.

💧 Beer is the Hebrew word for well

📛 The place is named for what happens there

✅ God's earlier promise is now kept

📖 A place named after a kept promise

## 🎁 Gather The People Together, And I Will Give Them Water

This water comes freely, with no rock striking involved.

That is a deliberate contrast to what happened one chapter earlier.

Numbers 20 ended in disaster when Moses struck the rock instead of speaking to it.

God's provision continues here even after a leader had stumbled.

🎁 Water given freely, with no striking this time

⚖️ A clear contrast to Numbers 20's failure

💧 Provision continues despite past failure

📖 God keeps providing even after leaders stumble

# Numbers 21:17-20
# 🎶 The Song Of The Well
---
## 🎶 Then Israel Sang This Song, Spring Up, O Well

This short poem is a rare moment of real celebration in Numbers.

The song speaks directly to the well, almost inviting it to respond.

Most of this book is filled with complaint, not praise.

After so many hard chapters, this is a genuine burst of joy.

🎶 A rare moment of celebration in this book

🗣️ The song speaks directly to the well

😊 Most of Numbers is filled with complaint

📖 A genuine burst of joy stands out

## ⛏️ The Princes Digged The Well, The Nobles Of The People Digged It

Israel's own leaders do the digging themselves.

They do not leave hard labor to servants alone.

Princes and nobles work with their hands, alongside everyone else.

This pictures leadership working with the people, not standing above them.

⛏️ Leaders do the physical digging themselves

🤝 They work alongside the people, not above

👑 Princes and nobles share the labor

📖 A picture of leadership serving, not commanding

## 👑 By The Direction Of The Lawgiver, With Their Staves

The lawgiver here means Moses.

Staves means staffs, ordinary walking sticks used here as digging tools.

Even something as simple as digging a well happens under organized guidance.

Nothing in this camp happens by accident.

👑 The lawgiver refers to Moses

🪄 Staves means staffs, used as digging tools

📋 Even a simple task happens under guidance

📖 Order shapes even the small moments

## 🗺️ From The Wilderness They Went To Mattanah

The travel log picks back up right after the song ends.

Mattanah simply marks the next stop on the road.

Names like this treat the journey as real, tracked history.

The celebration in the previous verses does not pause the ongoing journey.

🗺️ The travel log resumes after the song

➡️ Mattanah marks the next stop

📜 The journey continues as real history

📖 Celebration does not pause the journey

## 🏔️ And From Nahaliel To Bamoth

Nahaliel is simply the next camp named on this stretch.

Bamoth means high places, a name worth remembering.

It quietly points ahead to the hilltop shrines used against Israel soon.

The very next chapters put that name to a very different use.

🗺️ Nahaliel marks another stop on the road

🏔️ Bamoth means high places

🔮 It foreshadows the next chapters' conflict

📖 A name that returns with different intent

## 🏔️ To The Top Of Pisgah, Which Looketh Toward Jeshimon

Pisgah becomes an important location later in the story.

Moses will view the entire promised land from this same mountain range in Deuteronomy 34.

Jeshimon means wasteland or desert.

That name describes the desolate view from the top.

🏔️ Pisgah matters again later, in Deuteronomy 34

👁️ Moses will view the promised land from here

🏜️ Jeshimon means wasteland or desert

📖 A location that returns at Moses' death

# Numbers 21:21-25
# ⚔️ Sihon Refuses, Israel Conquers The Amorites
---
## 👑 Israel Sent Messengers Unto Sihon King Of The Amorites

Israel tries diplomacy first, the same way they did with Edom in Numbers 20.

Messengers go ahead to request peaceful passage.

War is not the first option here.

This pattern of asking before fighting repeats across these chapters.

👑 The same diplomatic approach used with Edom

🕊️ Peaceful passage is requested first

🚫 War is not the default choice

📖 Asking before fighting repeats here

## 🛣️ We Will Go Along By The King's High Way

The King's Highway was a real, well known trade route.

It ran north to south through this whole region.

Naming it shows Israel wants to use one established road only.

This is a narrow, specific request, not a demand to wander freely.

🛣️ A real, named ancient trade route

📍 Shows a narrow, specific request

🚶 Not a demand to wander freely

📖 The same careful request made earlier to Edom

## 🚫 Sihon Would Not Suffer Israel To Pass Through His Border

Like Edom before him, Sihon refuses the request.

But Edom's land carried a special protection.

God had promised that land to Esau's own descendants.

Sihon's territory carries no such protection.

That difference explains why this refusal ends in battle.

🚫 A refusal that echoes Edom's answer

🛡️ Edom's land had God's special protection

⚖️ Sihon's land carries no such protection

📖 This difference explains why battle follows

## ⚔️ Sihon Gathered All His People Together, And Fought Against Israel Into The Wilderness

Sihon does not just block the road.

He gathers his entire army and attacks Israel directly.

The battle happens at a specific place, Jahaz.

Israel is defending itself here, not starting an invasion.

⚔️ Sihon mobilizes his whole army

📍 The battle happens at Jahaz

🛡️ Israel is defending, not invading

📖 Sihon escalates the conflict himself

## 🗡️ Israel Smote Him With The Edge Of The Sword

This phrase is a common way of describing total defeat in close combat.

It does not describe one lucky strike.

Sihon's whole army is decisively beaten.

The Amorite threat ends completely in this one verse.

🗡️ A common idiom for total defeat

⚔️ Describes a whole army, not one blow

✅ The Amorite threat ends completely

📖 A clear, decisive victory

## 🗺️ Possessed His Land From Arnon Unto Jabbok

This is Israel's first lasting conquest east of the Jordan.

The land stretches from the Arnon river to the Jabbok river.

Two and a half tribes will later ask to settle in this exact land in Numbers 32.

A wandering nation begins to actually possess territory here.

🗺️ Israel's first lasting conquest east of the Jordan

🏡 Claimed for settlement later in Numbers 32

📍 Runs from the Arnon to the Jabbok

📖 Wandering starts turning into possession

## 🛡️ The Border Of The Children Of Ammon Was Strong

Israel stops at the Jabbok instead of pushing further east.

Ammon's land, like Edom's, was territory God told Israel not to take.

Deuteronomy 2:19 explains this instruction plainly.

Stopping here is obedience, not weakness.

🛡️ Ammon's land was also under God's protection

📖 Explained further in Deuteronomy 2:19

🚫 Israel could have pushed further but did not

➡️ Stopping here is obedience, not weakness

## 🏙️ Israel Dwelt In Heshbon, And In All The Villages Thereof

Heshbon was Sihon's own capital city.

Israel now takes the surrounding villages too, not the city alone.

This is a real, settled possession.

It is a lasting home, not just a passing military win.

🏙️ Heshbon was Sihon's former capital

🏘️ The surrounding villages are taken too

🏡 A lasting settlement, not a brief raid

📖 Conquest here becomes a real home

# Numbers 21:26-32
# 📜 The Taunt Song, And Jaazer
---
## 🏙️ Heshbon Was The City Of Sihon, Who Had Fought Against The Former King Of Moab

This explains something important about who owns this land.

Sihon had already conquered it from Moab before Israel ever arrived.

Israel takes this territory from Sihon, an Amorite king, not directly from Moab.

That distinction matters later, when Israel's claim to this land gets challenged.

🏙️ Sihon had already taken this land from Moab

⚖️ Israel takes it from Sihon, not Moab

📜 A detail that matters for later claims

📖 History here explains a future argument

## 📜 They That Speak In Proverbs Say

This introduces an old victory song, quoted here by name.

It works the same way an earlier verse quoted the book of the wars of the Lord.

Scripture is again citing an existing outside poem to make its point.

Ancient poetry survives here only because it was preserved inside the Bible.

📜 Introduces an old taunt song by name

🔁 The same kind of citation used earlier

📝 Scripture quotes an outside poem

📖 Old poetry survives because it was preserved

## 🔥 For There Is A Fire Gone Out Of Heshbon, A Flame From The City Of Sihon

This song compares Sihon's conquest of Moab to a spreading wildfire.

The fire starts at Heshbon, Sihon's own capital.

Think of a small flame that catches wind and spreads across a field.

That is the picture behind this line, a whole region consumed at once.

🔥 Conquest is pictured as a spreading wildfire

🏙️ The fire is pictured as starting from Heshbon

🌬️ Like a small flame catching wind

📖 Vivid poetry describing a real campaign

## 😢 Woe To Thee, Moab! Thou Art Undone, O People Of Chemosh

Chemosh was the national god that Moab worshiped.

Later Scripture repeatedly condemns Chemosh as a false god.

Calling Moab the people of Chemosh ties their defeat to that false god's failure.

This defeat is framed as more than a lost battle.

😢 Chemosh was Moab's national god

⚖️ Later Scripture calls Chemosh a false god

🔗 Moab's defeat is tied to that failure

📖 A military loss framed as a spiritual one

## ⛓️ He Hath Given His Sons That Escaped, And His Daughters, Into Captivity Unto Sihon

This song describes real human loss, not just lost cities.

Moabite sons and daughters were taken captive in Sihon's earlier conquest.

Land and territory are not the only thing at stake in these ancient wars.

Real families paid the price behind every line of this poem.

⛓️ Describes real captives, not just lost land

👨‍👩‍👧 Real families paid the cost of this war

📜 Poetry here does not hide the suffering

📖 Ancient wars had real human weight

## 🗺️ We Have Shot At Them, Heshbon Is Perished Even Unto Dibon

The song names a wide stretch of towns, Dibon, Nophah, and Medeba.

These names trace how far Sihon's earlier conquest reached.

Reading it feels like a geography lesson wrapped inside a war poem.

The scale of these names shows how large this earlier conquest really was.

🗺️ Names a wide sweep of towns

📖 Reads like geography wrapped in poetry

📏 Shows the scale of an earlier conquest

➡️ Names here carry real historical weight

## 🏕️ Thus Israel Dwelt In The Land Of The Amorites

This short line closes out the whole Sihon episode.

Israel now actually lives in this land.

They are not merely passing through anymore.

Conquest here becomes a real, lasting home.

🏕️ Marks the end of the Sihon episode

🏡 Israel now lives here, not just passes through

✅ A summary line closing the story

📖 Conquest becomes lasting residence

## 🔎 Moses Sent To Spy Out Jaazer

Moses sends spies again, just as he did back in Numbers 13.

That earlier mission ended in fear and disaster.

This mission looks completely different.

These spies scout ahead of a confident, victorious army instead of a doubting nation.

🔎 Spies sent again, echoing Numbers 13

😨 That earlier mission ended in fear

💪 This time confidence replaces doubt

📖 The same kind of mission now succeeds

## 🏘️ They Took The Villages Thereof, And Drove Out The Amorites That Were There

Jaazer's villages are taken and its people driven out.

This extends Israel's new territory even further.

Momentum from the Sihon victory carries straight into this next conquest.

Success is building on success here, unlike the earlier failure at Kadesh.

🏘️ Extends Israel's territory further

📈 Momentum carries from the Sihon victory

✅ Success builds on success this time

📖 A sharp contrast to the earlier spy failure

# Numbers 21:33-35
# 🛡️ Og King Of Bashan Defeated
---
## 🗺️ They Turned And Went Up By The Way Of Bashan

Bashan lay further north in the Transjordan region.

Later Scripture remembers it for rich pastureland and strong cattle.

Psalm 22:12 even mentions the bulls of Bashan.

Israel keeps advancing north after the win over Sihon.

🗺️ Bashan sits further north in the Transjordan

🐂 Later known for strong cattle, like Psalm 22:12

🌾 Remembered for rich pastureland

📖 Israel keeps advancing after the Sihon win

## 👑 Og The King Of Bashan Went Out Against Them, To The Battle At Edrei

This is Og's first appearance anywhere in the Bible.

He is later remembered as one of the last giants of that region.

Deuteronomy 3:11 describes his iron bed as over thirteen feet long.

Like Sihon before him, Og attacks first instead of negotiating.

👑 Og's first appearance in Scripture

🛏️ Deuteronomy 3:11 describes his bed as huge

⚔️ Og attacks first, just like Sihon

📖 A genuinely intimidating enemy, not a minor one

## 🕊️ Fear Him Not, For I Have Delivered Him Into Thy Hand

God speaks directly to Moses before this battle even starts.

He names the exact fear a giant king like Og could cause.

The promise of victory comes before a single sword is drawn.

Confidence here comes from God's word, not the size of Israel's army.

🕊️ God directly addresses the fear of a giant

✅ Victory is promised before the battle starts

💪 Confidence rests on God's word, not army size

📖 God speaks to fear before it can grow

## 🔁 As Thou Didst Unto Sihon King Of The Amorites

God compares this coming victory to the one Israel just won.

That recent memory becomes the basis for present confidence.

What God did once, he promises to do again.

Past faithfulness becomes the ground for trusting him now.

🔁 Compares this fight to the recent Sihon victory

📈 A recent memory builds present confidence

🔂 What God did once, he promises again

📖 Past faithfulness grounds present trust

## ☠️ Smote Him, And His Sons, And All His People, Until There Was None Left Him Alive

This total destruction language matches the vow Israel made back in verse two.

That vow is now completed a second time in this same chapter.

The chapter opens and closes with the same kind of total victory.

Two very different enemies share one identical pattern of complete defeat.

☠️ Matches the vow made back in verse two

🔁 The same pattern repeated a second time

🔂 This chapter opens and closes the same way

📖 One pattern, two complete victories

## 🗺️ They Possessed His Land

Bashan now joins Sihon's former kingdom as new Israelite territory.

Two major victories happen in this one chapter.

Israel genuinely holds ground east of the Jordan for the first time.

A chapter that began with fear of the journey ends with real, lasting land.

🗺️ Bashan joins Sihon's land as new territory

🏡 Two major victories in a single chapter

✅ Real, lasting ground east of the Jordan

📖 Fear at the start, possession by the end
`.trim();

export const NUMBERS_TWENTY_ONE_PERSONAL_SECTIONS = parseNumbersTwentyOneRawNotes(NUMBERS_TWENTY_ONE_RAW_NOTES);
