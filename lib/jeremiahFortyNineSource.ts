export type JeremiahFortyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFortyNineRawNotes(rawText: string): JeremiahFortyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFortyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+49:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 49 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+49:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+49:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 49 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 49,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 49:${startVerse}` : `Jeremiah 49:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Jeremiah 49 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FORTY_NINE_RAW_NOTES = `# Jeremiah 49:1-3
# 👑 Ammon's Stolen Land
---
## 👑 Hath Israel No Sons

This question is not a real search for information.

Gad was one of Israel's twelve tribes, settled east of the Jordan River.

Ammon's king had taken over Gad's territory and claimed it as his own.

God's question exposes that land grab as theft, not simple settlement.

Gad was never truly without an heir to defend its claim.

👑 Hath Israel no sons is rhetorical

🗺️ Gad still had a rightful heir

🏴 Ammon's king seized Gad's land

📖 God calls out theft dressed as settlement

---
## 🏙️ An Alarm Of War To Be Heard In Rabbah

Rabbah was the capital city of the Ammonites, now modern day Amman, Jordan.

An alarm of war meant a trumpet blast warning that an attack had begun.

The city is told it will become a desolate heap and burn completely.

The chapter ends by promising Israel will one day reclaim what Ammon took.

🏙️ Rabbah was Ammon's capital city

📯 An alarm of war means a warning trumpet

🔥 The city becomes a desolate heap

📖 Israel will reclaim what Ammon took

---
## 🪢 Gird You With Sackcloth

Heshbon and Ai here are Ammonite towns facing imminent destruction.

To gird with sackcloth means to wrap the body in coarse, scratchy cloth.

It was a visible, physical way to show grief and deep distress.

Even the king's priests and princes would be marched off together into captivity.

📯 Heshbon and Ai face destruction

🪢 Sackcloth means coarse rough cloth

😢 It showed visible public grief

📖 Even royalty is marched into captivity

---
# Jeremiah 49:4-6
# 🏚️ Ammon's Boast Will Fall
---
## 💰 Wherefore Gloriest Thou In The Valleys

To glory means to boast with pride, confident that nothing can touch you.

Ammon trusted in fertile valleys and treasure to protect its safety.

Backsliding daughter pictures the nation as someone who once knew God but turned away.

The question challenges confidence built on wealth instead of God.

💰 Gloriest means to boast with pride

🌾 Ammon trusted fertile valleys and treasure

↩️ Backsliding daughter means one who turned away

📖 Wealth was never true security

---
## 😱 I Will Bring A Fear Upon Thee

God promises to send sudden terror from every surrounding nation.

Ammon's people would scatter, each one driven out alone and unguided.

None shall gather up him that wandereth means no rescue would come for stragglers.

A nation that trusted its neighbors for safety would be abandoned by all of them.

😱 God sends fear from every side

🏃 Ammon's people scatter and flee alone

🚫 No one gathers the wandering stragglers

📖 Trusted neighbors offer no rescue

---
## 🌅 Afterward I Will Bring Again The Captivity Of The Children Of Ammon

This short verse closes Ammon's oracle on an unexpected note of mercy.

God promises that Ammon's captivity will someday be reversed.

The same judging God who scatters nations is the one who can restore them.

Even a people devoted to false gods are not shut out of future hope.

🌅 This verse closes on mercy

🔄 God promises Ammon's captivity reversed

⚖️ The judge can also restore

📖 Future hope still reaches Ammon

---
# Jeremiah 49:7-11
# 🧓 Edom's Famous Wisdom Fails
---
## 🧓 Is Wisdom No More In Teman

Teman was a region of Edom known throughout the ancient world for wise men.

One of Job's friends, Eliphaz, was even called a Temanite because of this reputation.

God's question asks whether that famous wisdom has simply vanished.

A nation proud of its wisdom is about to be caught completely unprepared.

🧓 Teman was Edom's region of wise men

📜 Eliphaz the Temanite shared that reputation

❓ God asks if wisdom has vanished

📖 Famous wisdom offers no real protection

---
## 🏜️ Dwell Deep O Inhabitants Of Dedan

Dedan was a trading people living in the Arabian desert near Edom.

To dwell deep meant to hide far back in remote places for safety.

God calls Edom's own disaster the calamity of Esau, tying it to its ancestor.

Esau was Edom's forefather, so this judgment falls on his entire family line.

🏜️ Dedan was an Arabian trading people

🕳️ Dwell deep means hide far back

👤 Esau was Edom's ancestor

📖 The whole family line is judged

---
## 🍇 Would They Not Leave Some Gleaning Grapes

Normal grape harvesters always left a few grapes behind for the poor.

Even thieves in the night usually stop once they have taken enough.

God says Edom's destroyer will show neither kind of restraint.

This judgment will be far more total than any ordinary disaster.

🍇 Harvesters normally left some grapes

🌙 Even thieves usually stop at enough

🚫 Edom's judgment shows no restraint

📖 This disaster will be total

---
## 👁️ I Have Uncovered His Secret Places

Esau here represents the whole nation descended from him, Edom.

Secret places were the hidden caves and strongholds Edom trusted for safety.

God says those hiding places have already been uncovered and exposed.

Verse ten even adds that soon Edom will no longer exist as a people.

👤 Esau represents the whole nation

🏔️ Secret places were hidden strongholds

👁️ God exposes every hiding place

📖 Edom will cease to exist

---
## 💔 Leave Thy Fatherless Children

This line breaks the pattern of pure threat with an offer of mercy.

God promises to personally preserve the children left fatherless by this disaster.

Widows are told they can trust in God even after losing everything.

Judgment on a nation never erases God's care for its most vulnerable people.

💔 This line offers surprising mercy

👶 God preserves the fatherless children

🤲 Widows can still trust God

📖 Judgment never erases God's care

---
# Jeremiah 49:12-15
# 🍷 The Cup Must Be Drunk
---
## 🍷 They Whose Judgment Was Not To Drink Of The Cup

The cup pictures God's wrath, poured out and forced on nations to drink.

Jeremiah elsewhere describes this same cup being passed to Jerusalem and many other nations.

Those people likely refers to Judah, who did not deserve judgment as badly as Edom.

If Judah still had to drink that cup, Edom cannot expect to be skipped.

🍷 The cup pictures God's wrath

🏙️ Jerusalem already drank this cup

⚖️ Lesser offenders drank it first

📖 Edom cannot expect to be skipped

---
## 🙅 Thou Shalt Surely Drink Of It

Edom hoped it might somehow be the exception to this judgment.

Nations less guilty than Edom already drank from this same cup.

God's direct answer removes any chance of Edom escaping it too.

No nation stands outside the reach of God's justice forever.

🙅 Edom hoped to be an exception

⚖️ Less guilty nations drank first

🚫 Edom cannot escape this cup

📖 No nation outruns God's justice

---
## 🤝 I Have Sworn By Myself

People normally swear an oath by something greater than themselves.

God has nothing greater to swear by, so he swears by his own name.

Bozrah was Edom's capital city, a place of pride and perceived safety.

That same city is now sentenced to become a permanent, desolate ruin.

🤝 People normally swear by something greater

👑 God swears by his own name

🏛️ Bozrah was Edom's proud capital

📖 Bozrah becomes a permanent ruin

---
## 📯 An Ambassador Is Sent Unto The Heathen

God pictures himself sending a messenger to summon nations to war.

Heathen here simply means the surrounding nations, not a modern insult.

Those nations are told to gather together and rise up against Edom.

God directs armies he does not even belong to toward his own purpose.

📯 A messenger summons nations to war

🌍 Heathen means the surrounding nations

⚔️ Nations gather to attack Edom

📖 God directs armies toward his purpose

---
## 📉 I Will Make Thee Small Among The Heathen

Edom had long taken pride in its strength and reputation among nations.

God promises to shrink that reputation down to nothing.

Despised among men means other nations will look down on Edom with contempt.

A proud nation's name was about to become a byword for failure.

📉 Edom's proud reputation will shrink

😠 Despised means others feel contempt

👑 Pride turns into public shame

📖 A proud name becomes a byword

---
# Jeremiah 49:16-18
# 🦅 Pride Nested As High As The Eagle
---
## 😨 Thy Terribleness Hath Deceived Thee

Terribleness here means the fear Edom's reputation struck into other nations.

Edom mistook that fear for real, lasting safety.

Pride convinced Edom that no one would dare attack a nation so feared.

That same pride was about to be proven completely false.

😨 Terribleness means fear Edom inspired

🪞 Edom mistook fear for safety

💭 Pride promised false confidence

📖 That pride would prove false

---
## 🏔️ That Dwellest In The Clefts Of The Rock

Edom's territory included dramatic cliffs and canyons carved into red rock.

Many scholars connect this description to the region later known as Petra.

Clefts of the rock means deep cracks and caves cut into the cliffs.

Edom built natural fortresses there, trusting the terrain itself to protect them.

🏔️ Edom lived among dramatic cliffs

🏜️ Many link this to Petra

🕳️ Clefts means deep rock caves

📖 Edom trusted terrain for safety

---
## 🦅 Though Thou Shouldest Make Thy Nest As High As The Eagle

Eagles build their nests on the highest, least reachable cliffs they can find.

Edom's fortresses were so high they felt as untouchable as an eagle's nest.

God says even that height will not keep Edom out of reach.

No height is ever too high for God to bring down.

🦅 Eagles nest on the highest cliffs

🏰 Edom felt just as untouchable

⬇️ God still brings Edom down

📖 No height is out of reach

---
## 🔥 As In The Overthrow Of Sodom And Gomorrah

Sodom and Gomorrah were cities destroyed so completely that they became a permanent warning.

Comparing Edom's fate to that destruction signals total, lasting devastation.

Every traveler who passes by will be shocked at what happened there.

No person would even be able to live in Edom's territory afterward.

🔥 Sodom and Gomorrah mean total ruin

🧳 Edom gets that same fate

😮 Travelers will be shocked passing by

📖 No one can live there after

---
# Jeremiah 49:19-22
# 🦁 A Lion From The Jordan
---
## 🌊 Like A Lion From The Swelling Of Jordan

The swelling of Jordan refers to thick brush and overgrown thickets along the riverbank.

Lions actually lived in that dense cover in ancient times.

A lion suddenly charging out of those thickets caught prey completely by surprise.

God compares the coming invader to that same sudden, unstoppable attack.

🌊 Swelling of Jordan means riverside thickets

🦁 Lions once hid in that cover

⚡ Lions attacked without any warning

📖 The invader strikes just as suddenly

---
## ❓ Who Is Like Me

This question is not really a question at all.

God is declaring that no one holds power equal to his own.

No ruler, army, or god can call God to account for his plans.

The same rhetorical challenge appears elsewhere in Jeremiah against other proud nations.

❓ This is a rhetorical question

👑 No one equals God's power

🙅 No one can call God to account

📖 This challenge repeats against other nations

---
## 🐑 The Least Of The Flock Shall Draw Them Out

God pictures nations as a flock and himself as their shepherd.

The shepherd decides who stays and who gets driven out of the pasture.

Counsel here means God's settled plan, already decided against Edom.

Even the weakest part of the flock will be enough to drag Edom away.

🐑 Nations are pictured as a flock

🧑‍🌾 God acts as their shepherd

🧠 Counsel means God's settled plan

📖 Even the weak will drag Edom away

---
## 🗺️ The Cry The Noise Thereof Was Heard In The Red Sea

The Red Sea sat far south of Edom's own territory.

Describing the noise reaching that far pictures a collapse loud enough to shake a region.

It is poetic exaggeration meant to show the scale of the disaster, not literal sound.

Edom's fall would be felt far beyond its own small borders.

🗺️ The Red Sea was far south

📢 The noise reaches a huge distance

🎭 This pictures scale, not literal sound

📖 Edom's fall will be fully felt

---
## 🤰 As The Heart Of A Woman In Her Pangs

Pangs refers to the sharp, overwhelming pain of labor before childbirth.

Comparing soldiers to a woman in labor pictures sudden, helpless terror.

These were trained fighting men, yet fear would strip away all their courage.

An eagle swooping down and spreading its wings pictures an attack with no warning.

🤰 Pangs means the pain of labor

😱 It pictures sudden helpless terror

⚔️ Trained soldiers lose all courage

📖 The attack comes without warning

---
# Jeremiah 49:23-27
# 🏙️ Damascus Waxes Feeble
---
## 🏙️ Hamath Is Confounded And Arpad

Hamath and Arpad were Syrian cities north of Damascus.

These same two cities are paired together in other prophets as a measuring stick for judgment.

Confounded means thrown into confusion and shame at the news they received.

Fear had already reached these cities before any army arrived.

🏙️ Hamath and Arpad were Syrian cities

📏 Other prophets pair them as a measure

😟 Confounded means thrown into confusion

📖 Fear arrived before the army did

---
## 📉 Damascus Is Waxed Feeble

To wax feeble means to grow weak, the opposite of waxing strong.

Damascus was the capital of ancient Syria, a major and proud city.

Turning to flee shows a city already giving up before the fight begins.

Comparing its fear to a woman in labor pictures pain that cannot be stopped.

📉 Waxed feeble means grown weak

🏛️ Damascus was Syria's proud capital

🏃 The city gives up before fighting

📖 Its pain cannot be stopped now

---
## 😢 The City Of My Joy

This short verse sounds almost like a funeral cry over a lost friend.

Damascus was famous and celebrated long before this moment of judgment.

Even God's own messenger pauses here to mourn what is about to be lost.

Judgment in Jeremiah is never delivered without real grief attached to it.

😢 This verse sounds like a funeral cry

🏙️ Damascus was once famous and celebrated

💔 Even the messenger mourns this loss

📖 Judgment here still carries real grief

---
## ⚔️ Her Young Men Shall Fall In Her Streets

This pictures the city's own soldiers dying in the very streets they defended.

Men of war refers to every trained fighter the city could still muster.

Cut off in that day means their deaths all come on one day of disaster.

A city's strength always depends on the next generation surviving to replace it.

⚔️ Soldiers fall in their own streets

🧍 Men of war means every fighter

📅 All deaths fall on one day

📖 Losing the next generation breaks a city

---
## 👑 The Palaces Of Benhadad

Benhadad was a royal name used by several kings of Damascus.

Their palaces stood for generations as a symbol of Syrian royal power.

God promises to set those very palaces on fire.

The fire reaches the wall first, then burns all the way to the throne room.

👑 Benhadad was a royal dynasty name

🏰 Palaces showed Syrian royal power

🔥 God sets those palaces on fire

📖 The fire reaches the throne room

---
# Jeremiah 49:28-30
# 🏹 Flee, Get You Far Off
---
## 🐑 The Kingdoms Of Hazor

Kedar was a nomadic Arab tribe descended from Ishmael, known for shepherding.

This Hazor is not the walled Canaanite city from the book of Joshua.

Here it means unwalled desert settlements belonging to Arabian tribes.

Nebuchadrezzar's army is named directly as the one about to attack them.

🐑 Kedar was a nomadic shepherd tribe

🏜️ This Hazor means desert settlements

🗺️ It differs from Joshua's walled city

📖 Nebuchadrezzar's army is named directly

---
## ⛺ Fear Is On Every Side

Tents, flocks, and camels made up nearly everything a nomadic people owned.

Curtains here refers to the cloth walls and coverings of their tents.

Losing all of it at once meant losing their entire way of life.

Fear is on every side becomes almost a refrain across Jeremiah's nation oracles.

⛺ Tents and flocks were their wealth

🧵 Curtains means their tent coverings

💔 They lose their whole way of life

📖 Fear on every side repeats often

---
## 🔁 Dwell Deep O Ye Inhabitants Of Hazor

This same warning to dwell deep was already given to Dedan earlier in the chapter.

Nebuchadrezzar had already taken counsel, meaning his plan was fully decided.

A purpose conceived means the attack was planned carefully, not a sudden impulse.

Unlike a walled city, a scattered desert people had almost nowhere safe to hide.

🔁 This warning echoes Dedan's warning

🧠 Nebuchadrezzar's plan was fully decided

📝 A purpose means a careful plan

📖 A desert people had nowhere to hide

---
# Jeremiah 49:31-33
# 🐫 The Wealthy Nation That Dwells Alone
---
## 💰 Get You Up Unto The Wealthy Nation

This wealthy nation describes a scattered Arabian people living without fear.

Neither gates nor bars means they had no city walls or locked doors.

They were an unwalled, exposed target despite having real wealth.

Confidence in wealth without defense would soon prove to be a fatal mistake.

💰 A wealthy but unwalled nation

🚪 No gates or bars at all

🎯 Wealth without defense means danger

📖 False confidence became a fatal mistake

---
## 🏝️ Which Dwell Alone

Dwelling alone meant this nation kept no alliances with surrounding peoples.

They believed isolation itself was enough protection from invaders.

No ally meant no one would come to help when the attack finally came.

Standing apart from others often leaves a nation standing apart in disaster too.

🏝️ Dwelling alone meant no alliances

🙅 No ally meant no help coming

⚠️ Isolation felt safe but was not

📖 Standing apart means facing disaster alone

---
## 🐫 I Will Scatter Into All Winds

Camels and cattle were the entire wealth of this nomadic people.

Booty and spoil both mean plunder taken by a conquering army.

Scattering into all winds means being driven out in every direction at once.

Utmost corners means no distant edge of the world would be left as a hiding place.

🐫 Camels and cattle were their wealth

💰 Booty and spoil both mean plunder

🌬️ All winds means every direction

📖 No distant corner offers hiding

---
## 🐾 A Dwelling For Dragons

Dragons here does not mean the mythical fire breathing creatures of legend.

It refers to jackals or wild desert creatures that live among ruins.

A once inhabited land becomes home only to wild animals.

This same exact phrase is used again later for Babylon's own eventual fall.

🐾 Dragons here means wild desert jackals

🏚️ Ruins become home to animals

👥 People are gone from the land

📖 Babylon gets this same sentence later

---
# Jeremiah 49:34-36
# 🎯 The Bow Of Elam Broken
---
## 🗺️ Against Elam In The Beginning Of The Reign Of Zedekiah

Elam was a powerful kingdom east of Babylon, in the area of modern Iran.

Zedekiah was the last king of Judah before Jerusalem's final fall.

Dating this message to the start of his reign places it years before Jerusalem's destruction.

Even a distant eastern kingdom was not outside the reach of Jeremiah's warnings.

🗺️ Elam was a kingdom east of Babylon

👑 Zedekiah was Judah's last king

📅 This was dated early in his reign

📖 Even distant Elam faced God's warning

---
## 🏹 I Will Break The Bow Of Elam

Elam's warriors were famous across the ancient world as skilled archers.

The bow stood for their entire military strength and reputation.

Breaking the bow means stripping away the very thing that made Elam feared.

No nation's greatest strength is ever too strong for God to break.

🏹 Elam was famous for skilled archers

💪 The bow stood for their strength

💔 Breaking it strips their reputation

📖 No strength is too strong for God

---
## 🧭 The Four Winds From The Four Quarters Of Heaven

The four winds from four quarters means literally every direction at once.

Most conquered peoples were exiled to just one or two nearby regions.

Elam's people would be scattered more completely than almost any other nation.

No single country would ever again hold all of Elam's scattered people together.

🧭 Four quarters means every direction

🗺️ Most exiles went to nearby places

🌪️ Elam scatters more completely than most

📖 No nation reunites Elam again

---
## 🏃 There Shall Be No Nation Whither The Outcasts Of Elam Shall Not Come

Outcasts here refers to the Elamite refugees fleeing their own collapsing homeland.

This promises there will be no safe country left for them to escape to.

Every possible refuge is already included in God's plan for this judgment.

Complete scattering meant losing any hope of regrouping as a nation.

🏃 Outcasts means fleeing Elamite refugees

🚫 No safe country is left

🗺️ Every refuge is already covered

📖 Regrouping as a nation becomes impossible

---
# Jeremiah 49:37-39
# 🌅 Elam's Captivity Reversed
---
## 🔥 I Will Bring Evil Upon Them, Even My Fierce Anger

God names the coming disaster as his own fierce anger, not random misfortune.

The sword following them means the attack would not stop at one battle.

Till I have consumed them shows this judgment is meant to run its full course.

Elam's enemies are simply the tool God chooses to use for this purpose.

🔥 God names this his own anger

⚔️ The sword follows them repeatedly

⏳ The judgment runs its full course

📖 Enemies are tools for God's purpose

---
## 👑 I Will Set My Throne In Elam

A throne pictures total rule and authority over a place.

Thrones in the ancient world were never left standing empty for long.

God claims the very land Elam's own king once ruled.

This phrase appears nowhere else this directly against another nation.

👑 A throne pictures total authority

🪑 Thrones were never left empty

🏛️ God claims Elam's own land

📖 This directness is rare elsewhere

---
## ⚰️ I Will Destroy From Thence The King And The Princes

Destroying the king and princes removes Elam's entire ruling family at once.

A kingdom without any royal family left could not easily reorganize itself.

This went beyond a battlefield defeat into the complete end of a dynasty.

God does not just punish Elam, he removes who sits over it.

⚰️ The entire ruling family is removed

🏚️ No royal family means no reorganizing

💥 This ends a whole dynasty

📖 God removes who rules Elam

---
## 🌅 I Will Bring Again The Captivity Of Elam

After total judgment, the very last line turns toward future restoration.

Latter days points to a future time left unspecified by the text.

Ammon and Moab earlier in these chapters end with this same pattern of hope.

Even Elam, judged this completely, is not abandoned forever.

🌅 The last line turns to restoration

⏳ Latter days means an unspecified future

🔁 Ammon and Moab end the same way

📖 Even Elam is not abandoned forever
`.trim();

export const JEREMIAH_FORTY_NINE_PERSONAL_SECTIONS = parseJeremiahFortyNineRawNotes(JEREMIAH_FORTY_NINE_RAW_NOTES);
