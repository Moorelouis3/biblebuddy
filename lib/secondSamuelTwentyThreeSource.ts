export type SecondSamuelTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelTwentyThreeRawNotes(rawText: string): SecondSamuelTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 23:${startVerse}` : `2 Samuel 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 2 Samuel 23 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_TWENTY_THREE_RAW_NOTES = `# SecondSamuel 23:1-3
# 🎤 David's Closing Song
---
## 🎤 The Last Words Of David

These are not the very last words David ever spoke.

They are a formal closing song.

It sums up his whole life as king.

Jacob gave a similar farewell blessing in Genesis forty nine.

Moses gave one too, in Deuteronomy thirty three.

David closes his story the same royal way.

🎤 Last words means a formal closing song

👑 It sums up David's whole reign

📜 Jacob and Moses did this too

📖 A king's story can end in worship
---
## 🎶 The Sweet Psalmist Of Israel

"Psalmist" means a writer of sacred songs.

We now call those songs psalms.

David wrote more psalms than anyone else in the Bible.

Nearly half of the book of Psalms carries his name.

This title crowns his whole life's work in one phrase.

🎶 Psalmist means a writer of sacred songs

👑 He was also a warrior and a king

🎵 His music is remembered alongside his reign

📖 David wrote most of the book of Psalms
---
## 🌬️ The Spirit Of The LORD Spake By Me

David claims something enormous here.

He says God's own Spirit spoke through him.

His tongue only carried the words God gave him.

Prophets made this same kind of claim about their own messages.

David places his final song on the level of prophecy.

🌬️ David claims the Spirit spoke through him

🗣️ His tongue only carried God's words

🎤 David treats his song as prophecy

📖 This matches how prophets described their messages
---
## 🪨 The Rock Of Israel

"Rock" is one of David's favorite pictures for God.

A rock stays solid no matter what happens around it.

David uses this same image often in the book of Psalms.

Calling God the Rock of Israel says the whole nation can stand safely on him.

🪨 Rock is a picture of stability

🛡️ God does not move or shift

🇮🇱 The whole nation can stand on him

📖 David uses this image often in Psalms
---
## ⚖️ He That Ruleth Over Men Must Be Just

This line names the standard God set for every king.

That includes David himself.

"Just" means ruling with fairness for everyone.

It means not favoring friends or punishing enemies out of spite.

A king who fears God rules differently than one who only fears losing power.

David did not always meet this standard himself.

⚖️ Just means ruling with fairness

👑 This was God's standard for every king

😨 Fearing God shapes how a king rules

📖 David did not always meet this standard
# SecondSamuel 23:4-5
# 🌅 The Light Of The Morning
---
## 🌅 As The Light Of The Morning

David pictures a just king as sunrise on a cloudless morning.

That kind of morning brings clear light with nothing blocking it.

Rain often made grass spring up fast and green in that region.

A good king's rule should feel the same way.

Life grows under clear light, not fear.

🌅 A just king is like a clear sunrise

☀️ No clouds means nothing blocks the light

🌱 Grass springs up fast after rain there

📖 Good rule lets life grow, not fear
---
## 🏠 Although My House Be Not So With God

David admits his own family has not lived up to this picture.

His household was marked by scandal and violence in the chapters before this one.

He is not pretending his story ended perfectly.

This honesty makes the promise in the next line land even harder.

🏠 David admits his family fell short

⚔️ Scandal and violence marked his household

🙊 He does not hide his failures here

📖 Honesty makes the next promise land harder
---
## 🤝 An Everlasting Covenant, Ordered In All Things, And Sure

Even after admitting failure, David rests on a promise.

He does not rest on his own record.

This points back to God's covenant with David in second Samuel chapter seven.

God had promised David's throne would last forever.

"Ordered" and "sure" mean that promise was carefully set and completely reliable.

🤝 David rests on a promise, not his record

👑 God promised David's throne would last

🔒 Sure means the promise cannot fail

📖 This recalls the covenant in chapter seven
# SecondSamuel 23:6-7
# 🌵 The Sons Of Belial
---
## 😈 The Sons Of Belial

"Belial" is an old word for worthlessness.

Calling someone a son of Belial means they live with no regard for God.

David contrasts this group directly with the just king he just described.

One path grows like grass in clear light.

The other path ends in fire.

😈 Belial means worthless or godless

🚫 Sons of Belial reject God entirely

⚖️ David contrasts them with the just king

➡️ One path grows, the other burns
---
## 🌵 As Thorns Thrust Away

Wild thorn bushes were a real hazard in the fields of ancient Israel.

Nobody could pick one up safely with bare hands.

David compares wicked people to those thorns.

They are painful and dangerous to handle directly.

🌵 Thorns were a real field hazard

✋ Bare hands could not grip them safely

😖 Wicked people are pictured the same way

📖 Danger requires the right tools to handle
---
## ⚔️ Fenced With Iron And The Staff Of A Spear

Clearing thorns required real tools, not bare hands.

That meant iron blades and a long spear shaft.

Dealing with real wickedness takes the same kind of deliberate force.

The final image is fire, thorns burned completely where they grew.

That total burning pictures how thoroughly this evil gets removed.

⚔️ Iron tools were needed, not bare hands

🔥 Thorns were burned completely where they lay

🧹 Evil gets removed with the same force

📖 The image ends in total removal
# SecondSamuel 23:8-10
# 🛡️ David's Mighty Men
---
## 🛡️ These Be The Mighty Men Whom David Had

This chapter switches from song to a list of names on purpose.

These were David's elite warriors.

They formed an inner circle of the bravest men in his army.

The list honors real people who fought and bled for David's kingdom.

A record like this made sure their courage was never forgotten.

🛡️ Mighty men means David's elite warriors

📜 The chapter shifts from song to record

🩸 They fought and bled for the kingdom

📖 The list keeps their courage from being forgotten
---
## 🪑 The Tachmonite That Sat In The Seat, Chief Among The Captains

"Tachmonite" most likely names his hometown or family line.

It is not a formal title.

Sitting in the seat marks him as the top ranked commander among David's captains.

He held first place in the whole army, not just among the mighty men.

🪑 Sat in the seat means top rank

🏡 Tachmonite likely names his hometown

👑 He led all of David's captains

📖 This is the highest military rank listed
---
## 🗡️ He Lift Up His Spear Against Eight Hundred

Adino singlehandedly faced eight hundred enemy soldiers in one battle.

Killing that many in a single fight is an almost unbelievable number for one man.

The text records it plainly, without exaggeration.

This kind of feat is exactly why he headed the whole list of mighty men.

🗡️ Adino faced eight hundred enemies alone

🔢 That number stood out even among heroes

📜 The record states it without exaggeration

📖 This feat earned him the top spot
---
## 👥 One Of The Three Mighty Men With David

Eleazar belongs to an even smaller circle inside the mighty men.

Only three men total held this rank.

These three stood above everyone else in the whole army.

Their stories get told individually because their courage stood out even among heroes.

👥 Three men stood above all others

🥇 This is the highest tier of warriors

🛡️ Eleazar belongs to this smallest circle

📖 Their stories get told one by one
---
## ⚔️ They Defied The Philistines, And The Men Of Israel Were Gone Away

"Defied" means Eleazar and his companions stood their ground against the enemy.

They challenged the Philistines directly.

The rest of the Israelite army had already retreated from this fight.

Eleazar chose to stay and fight even after everyone around him ran.

⚔️ Defied means standing firm against the enemy

🏃 The rest of the army had fled

🧍 Eleazar chose to stay and fight

📖 Real courage often stands alone at first
---
## ✋ His Hand Clave Unto The Sword

"Clave" is an old word meaning stuck or clung tightly.

Eleazar fought so long and hard that his hand cramped around the sword handle.

He could not have let go even if he wanted to.

The LORD gets credit for the victory, not Eleazar's strength alone.

✋ Clave means stuck or clung tightly

💪 His hand cramped around the sword

🏆 Fighting stopped only when the LORD won

📖 Credit for the victory goes to God
---
## 💰 The People Returned After Him Only To Spoil

"Spoil" means the goods and weapons left behind by a defeated army.

Eleazar's army mostly returned just to gather up what the Philistines left behind.

The hardest fighting was already finished by the time everyone else showed up.

💰 Spoil means valuables left by the enemy

🏆 Eleazar had already won the real fight

🚶 Others arrived only to collect the goods

📖 One man's courage won the whole battle
# SecondSamuel 23:11-12
# 🌾 Shammah Defends The Lentils
---
## 🌾 A Piece Of Ground Full Of Lentiles

"Lentiles" are lentils, a small bean like crop.

They fed many families in ancient Israel.

This was not a fortress or a city, just an ordinary farm field.

Shammah chose to defend something small and easy to abandon.

🌾 Lentiles are a small bean crop

🌱 This was ordinary farmland, not a fortress

🛡️ Shammah defended something easy to abandon

📖 Small things were still worth protecting
---
## 🏃 The People Fled From The Philistines

Just like in the story before this one, the wider army ran away.

This pattern repeats on purpose across the whole chapter.

Real courage here almost always starts as one man standing.

Everyone else runs, and then one person stays.

🏃 The wider army ran away again

🔁 This pattern repeats through the chapter

🧍 Courage here starts with standing alone

📖 One person's choice can change a battle
---
## 🛡️ He Stood In The Midst Of The Ground, And Defended It

Shammah plants himself in the middle of the field.

He refuses to move.

He fights off the entire Philistine troop mostly alone.

The LORD, not Shammah's skill alone, gets named as the source of the victory.

🛡️ Shammah refuses to abandon the field

⚔️ He fights the troop mostly alone

🏆 The LORD is named as the true winner

📖 God works even through one stubborn stand
# SecondSamuel 23:13-17
# 💧 The Water From Bethlehem's Well
---
## 👥 Three Of The Thirty Chief Went Down

This introduces a wider group of warriors.

There were thirty of them in total.

They ranked just below the top three.

Three of them travel together to visit David during this whole story.

The number thirty returns again later in this chapter's closing list.

👥 Thirty was the next rank of warriors

🚶 Three of them travel to David together

🔢 The number thirty returns later in the list

📖 This links the story to the roster ahead
---
## 🏔️ The Cave Of Adullam

Adullam was a cave complex where David hid earlier.

He was fleeing King Saul at the time.

This scene happens during that same rough, dangerous period of David's life.

David is not yet king in a palace here.

He is a fugitive leader in hiding.

🏔️ Adullam was David's earlier hiding place

🏃 This happens during his years as a fugitive

👑 Not yet king in a palace

📖 The story returns to a hard season
---
## 🕳️ David Was Then In An Hold

"Hold" here means a stronghold, a defended position.

It is not a jail cell.

The Philistines controlled Bethlehem itself at this point.

Bethlehem was David's own hometown.

Enemy soldiers were camped inside the very town where David was born.

🕳️ Hold means a defended stronghold

🏠 Philistines controlled David's hometown, Bethlehem

⚔️ Enemy troops occupied his birthplace

📖 David was cut off from his own town
---
## 💧 Oh That One Would Give Me Drink Of The Water

David voices a simple, human longing.

He wanted a drink from a well he remembered from home.

He was not issuing a military order.

It reads more like a tired, homesick wish spoken out loud.

💧 David simply wished for familiar water

🏠 The well connected him to home

😔 It sounds like a homesick wish

📖 A small comment carried real weight
---
## ⚔️ Brake Through The Host Of The Philistines

Three of David's mighty men heard the wish.

They took it as a mission.

They fought straight through an enemy camp just to fill one container of water.

Nobody ordered them to do this.

They chose the risk themselves.

⚔️ Three men treated a wish as a mission

🎯 They fought through the enemy for one jar

🙋 Nobody ordered them to take the risk

📖 Loyalty like this was not commanded
---
## 🍷 He Would Not Drink Thereof, But Poured It Out Unto The LORD

David refuses the very water he had wished for out loud.

Pouring out a drink offering was a normal act of worship in this culture.

David treats the water as too costly to simply swallow.

He offers it to God instead.

That honors the risk those three men took.

🍷 David refuses to drink the water

🙏 Pouring it out was an act of worship

💎 The water felt too costly to drink

📖 He honors their risk instead of using it
---
## 🩸 Is Not This The Blood Of The Men

David treats the water as if it were the actual blood of the three men.

They had risked their lives to get it.

In his eyes, it carried that cost.

"Jeopardy of their lives" simply means real danger of dying.

🩸 David equates the water with their blood

⚠️ Jeopardy means real danger of death

❤️ He honors the true cost of the gift

📖 Loyalty deserves more than casual use
# SecondSamuel 23:18-19
# ⚔️ Abishai, Chief Of The Thirty
---
## 👨‍👩‍👦 The Brother Of Joab, The Son Of Zeruiah

Zeruiah was David's own sister.

That made Abishai and Joab David's nephews.

This family fought at David's side throughout his whole rise to power.

Abishai's courage here was not an isolated act.

It ran in the family.

👨‍👩‍👦 Zeruiah was David's sister

👑 Abishai and Joab were David's nephews

⚔️ This family fought beside David for years

📖 Courage here ran through the whole family
---
## 🎖️ Was He Not Most Honourable Of Three

This verse ranks Abishai as the leader of the thirty, the second tier of warriors.

He killed three hundred men in one fight.

That is an enormous number on its own.

Still, the text is careful to rank him below the top three from earlier.

🎖️ Abishai led the second tier of warriors

🔢 Three hundred fell to him in one fight

📉 He still ranked below the top three

📖 Even great warriors had their limits named
---
## 🚫 Howbeit He Attained Not Unto The First Three

"Howbeit" is an old word simply meaning however.

"Attained" means reached a certain level.

This list stays honest about rank.

It does not inflate anyone's place just to be kind.

🚫 Howbeit means however

📏 Attained means reached a certain level

📊 The ranking stays honest, not inflated

📖 Real honor does not need exaggeration
# SecondSamuel 23:20-23
# 🦁 Benaiah's Bold Feats
---
## 🏡 Benaiah The Son Of Jehoiada, Of Kabzeel

Kabzeel was a town in the far south of Judah.

It sat near the edge of the desert.

Benaiah later becomes one of the most important men under David and Solomon.

This verse marks the start of a career that ends near the throne itself.

🏡 Kabzeel sat in Judah's far south

👑 Benaiah later rises under David and Solomon

🌱 Small beginnings can lead somewhere large

📖 A great career starts in this verse
---
## 🦁 He Slew Two Lionlike Men Of Moab

"Lionlike" points to two exceptionally strong, fierce Moabite warriors.

These were not literal lions.

Defeating even one of them would already have been a major feat.

Benaiah defeated both.

That marked him as unusually strong even among the mighty men.

🦁 Lionlike means fierce, powerful warriors

⚔️ Beating even one would be a major feat

💪 Benaiah defeated two of them

📖 His strength stood out even here
---
## ❄️ Slew A Lion In The Midst Of A Pit In Time Of Snow

This time the lion is real, not a figure of speech.

Snow was rare in this region and made the ground slippery.

Fighting a cornered lion inside a pit left Benaiah almost nowhere to retreat.

He chose to go down into the pit.

He did not choose to walk away.

❄️ Snow made the ground slick and rare

🦁 A real lion, trapped inside a pit

🚫 Almost no room to retreat safely

📖 Benaiah chose danger instead of walking away
---
## 🗡️ Plucked The Spear Out Of The Egyptian's Hand

"Goodly" here means large and impressive in size.

It does not simply mean kind.

Benaiah faced this armed giant carrying only a wooden staff.

He wrestled the enemy's own spear away.

He killed him with his own weapon.

🗡️ Goodly here means large and imposing

🪵 Benaiah carried only a staff

🤼 He took the spear away by force

📖 The enemy was defeated with his own weapon
---
## 🛡️ David Set Him Over His Guard

This final line explains why Benaiah's story gets told in such detail.

David rewards this proven courage with real power.

He gives him command of his personal guard.

His feats earned him a permanent place at the center of the kingdom.

🛡️ Guard means David's personal protection force

👑 Proven courage earned a position of trust

🏆 His feats led straight to promotion

📖 Reputation here translates into real authority
# SecondSamuel 23:24-29
# 📜 The Thirty, Part One
---
## ⚔️ Asahel The Brother Of Joab Was One Of The Thirty

Asahel was the youngest of Zeruiah's three sons.

He was brother to Joab and Abishai.

Second Samuel chapter two already told the story of his death.

Abner killed him during a chase.

His name still stands here on this honored list.

⚔️ Asahel was the youngest of three brothers

💀 Chapter two already told of his death

📜 He still earns a place on this list

📖 Honor here outlasts an early death
---
## 🏡 Names Tied To Real Hometowns

Nearly every name on this list comes with a hometown attached.

Bethlehem, Tekoa, Netophah, and Gibeah all appear.

These were small, ordinary towns scattered across Israel.

David's core fighting force was built from farmers and villagers.

🏡 Each name carries a small hometown

🌾 These were farming towns, not one capital

👥 David's army rose from ordinary villagers

📖 Greatness came from unlikely places
---
## 🌾 Ira The Son Of Ikkesh The Tekoite

Tekoa was a small town in the hill country of Judah.

It was known for shepherding.

Centuries later, the prophet Amos came from this same town.

One small town produced both a mighty warrior here and a prophet later.

🌾 Tekoa was a shepherding town in Judah

📜 The prophet Amos came from Tekoa too

👥 One town, two very different callings

📖 Small places kept shaping Israel's story
---
## 🛡️ Ittai The Son Of Ribai Out Of Gibeah Of The Children Of Benjamin

Gibeah was Saul's own hometown.

It belonged to the tribe of Benjamin, Saul's own tribe.

A warrior from Saul's own town and tribe now fights loyally for David.

Old tribal loyalty to Saul's family did not stop him from serving David well.

🛡️ Gibeah was Saul's own hometown

👑 Ittai came from Saul's own tribe

🤝 He still served David loyally

📖 Loyalty crossed old tribal lines here
---
## 👪 Repeated Clan Names Across The List

Some clan names repeat across this whole list.

Ahohite, Harodite, Hararite, and Netophathite all appear more than once.

Eleazar earlier in this chapter also came from the Ahohite line.

Whole extended families sent multiple sons into David's elite guard.

👪 Some clan names repeat through the list

🔁 The Ahohite line appears more than once

🏡 Whole families served David together

📖 Loyalty often ran through entire households
# SecondSamuel 23:30-34
# 📜 The Thirty, Part Two
---
## 🌳 Hiddai Of The Brooks Of Gaash

Gaash was a hill region near Ephraim.

It is remembered elsewhere as the place Joshua was buried.

Naming a warrior by his home valley kept a specific place tied to the record.

These small geography notes anchor legend to real, locatable ground.

🌳 Gaash was a hill region near Ephraim

⚰️ Joshua was buried near this same area

🗺️ Real places anchor these warriors' stories

📖 Geography kept legend tied to real ground
---
## 👨‍👦 Eliam The Son Of Ahithophel The Gilonite

Ahithophel was one of David's most trusted counselors for years.

He later turned against David and joined Absalom's rebellion.

That story comes later in this same book.

Eliam his son fought loyally for David even after his own father betrayed him.

👨‍👦 Ahithophel was David's trusted counselor

💔 He later betrayed David for Absalom

🛡️ His son Eliam stayed loyal to David

📖 One family, two very different choices
---
## 🕊️ Jonathan, Of The Sons Of Jashen

This Jonathan is a different man from Saul's son Jonathan.

Saul's son was David's close friend.

The name Jonathan was common in Israel.

Small identifying details like this kept records accurate across many generations.

🕊️ A different Jonathan than Saul's son

👥 The name Jonathan was common then

📝 Family details kept the record accurate

📖 Precision mattered in these ancient lists
---
## 🏔️ Hezrai The Carmelite

This Carmel is a small town in Judah.

It is not the famous Mount Carmel further north.

The Bible uses the same name for more than one place.

Nabal, from First Samuel twenty five, also lived in this same town.

🏔️ This Carmel is a town in Judah

🚫 Not the famous Mount Carmel up north

👤 Nabal from First Samuel also lived here

📖 Same name, different places in scripture
# SecondSamuel 23:35-39
# 🗡️ The Thirty, Part Three
---
## 🌍 Zelek The Ammonite

Zelek came from Ammon.

Ammon was a nation that fought against Israel many times in the Old Testament.

Even a former enemy nation could produce a man loyal to David's inner circle.

David's kingdom pulled in outsiders who chose to serve Israel's God and king.

🌍 Ammon was often Israel's enemy nation

🤝 Zelek still served David loyally

🌐 David's circle included loyal outsiders

📖 Loyalty mattered more than birth nation
---
## ⚔️ Armourbearer To Joab The Son Of Zeruiah

An "armourbearer" carried a commander's extra weapons.

He stayed close to him in battle.

This was a position of deep trust, not a lesser job.

Nahari served Joab in exactly this role.

He was trusted enough to be close in the fight.

⚔️ Armourbearer means a trusted battle assistant

🛡️ He carried Joab's extra weapons

🤝 This job required deep personal trust

📖 Support roles carried real honor too
---
## 👥 Ira An Ithrite, Gareb An Ithrite

These two men share the same clan name, Ithrite.

They appear back to back on the list.

Family and clan groups often served together in David's forces.

The list preserves them as a pair, exactly how they likely fought.

👥 Both men share the same clan name

🤝 They appear together in the record

⚔️ Clans often served side by side

📖 The list keeps them together, as they served
---
## 🛡️ Uriah The Hittite

Uriah appears here as one of David's own thirty mighty men.

This is the same Uriah whose wife was Bathsheba.

David had him killed in chapter eleven.

Placing his name on this honor roll makes David's betrayal even harder to read past.

The soldier David wronged was not a stranger.

He was one of David's own best men.

🛡️ Uriah was one of David's own thirty

💔 David had him killed in chapter eleven

😔 His name still stands on this list

📖 David wronged one of his most loyal men
---
## 🔢 Thirty And Seven In All

The list actually names thirty seven men, not exactly thirty.

The group kept its original name, the thirty.

That stayed true even as members died and were replaced over the years.

New warriors joined the ranks, but the title of the group stayed the same.

🔢 Thirty seven names appear, not thirty

🏷️ The group kept its original name

🔁 Members changed as years passed

📖 A name can outlast its first members
`.trim();

export const SECOND_SAMUEL_TWENTY_THREE_PERSONAL_SECTIONS = parseSecondSamuelTwentyThreeRawNotes(
  SECOND_SAMUEL_TWENTY_THREE_RAW_NOTES
);
