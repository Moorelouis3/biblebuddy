export type MicahFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMicahFiveRawNotes(rawText: string): MicahFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MicahFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Micah\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Micah 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Micah\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Micah\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Micah 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Micah 5:${startVerse}` : `Micah 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Micah 5 sections, received " + sections.length);
  }

  return sections;
}

const MICAH_FIVE_RAW_NOTES = `# Micah 5:1-6
# 👑 A Ruler From Bethlehem
---
## 🛡️ Gather Thyself In Troops, O Daughter Of Troops

Daughter of troops is a title for Jerusalem, pictured as a woman surrounded by soldiers.

Gather thyself in troops sounds like a call to muster defenders, but it reads as bitter mockery instead.

Micah is describing a city already helpless, not actually commanding a rescue.

The irony sets up the real deliverer named two verses later.

🛡️ Daughter of troops names besieged Jerusalem

😏 The command reads as bitter mockery

🏙️ The city cannot save itself

📖 A true deliverer appears right after this
---
## ⚔️ He Hath Laid Siege Against Us

A siege means an enemy army surrounds a city and cuts off food, water, and escape.

Judah's own enemies have already encircled them by the time Micah says this.

There is no suggestion of rescue yet in this verse alone.

The hope does not arrive until the very next line of the prophecy.

⚔️ Siege means surrounding a city completely

🚫 No food water or escape allowed

😟 Judah is already encircled here

📖 Hope comes in the very next verse
---
## 😣 They Shall Smite The Judge Of Israel With A Rod Upon The Cheek

Judge of Israel here means the reigning king, not a courtroom official.

Striking someone on the cheek with a rod was a specific ancient gesture of contempt, not ordinary violence.

It humiliated a person publicly far more than it hurt their body.

A king who should be defended instead gets treated like a disgraced prisoner.

👑 Judge of Israel means the reigning king

😣 A cheek strike signaled public contempt

💔 This humiliates far more than it wounds

📖 The king is shamed not merely harmed
---
## 🏘️ Bethlehem Ephratah

Bethlehem Ephratah distinguishes this town from another Bethlehem up north, in the territory of Zebulun.

Ephratah was the old clan name tied to this particular Bethlehem, near Jerusalem in Judah.

Calling it by both names removes any doubt about which small town God means.

This is the same Bethlehem where David herded sheep generations earlier.

🏘️ Bethlehem Ephratah marks the Judah town

🧭 A second Bethlehem existed in Zebulun

👨‍👦 Ephratah was this town's old clan name

📖 This is David's childhood hometown
---
## 🤏 Though Thou Be Little Among The Thousands Of Judah

Thousands here refers to Judah's clan divisions, the way a nation is split into tribes and family groups.

Bethlehem was so small it barely counted as a unit worth naming among those divisions.

God deliberately picks the smallest, least likely place to start something enormous.

Size was never the qualification for where God chooses to work.

🤏 Little means barely counted as a clan

👥 Thousands means Judah's family clan divisions

🌱 God picks the smallest place on purpose

📖 Size was never God's qualification
---
## ⭐ Yet Out Of Thee Shall He Come Forth Unto Me That Is To Be Ruler In Israel

This is the exact prophecy Matthew 2 quotes when the wise men ask where the Messiah will be born.

Unto me shows this ruler belongs to God in a special way, not just another king.

Israel had plenty of kings already, but none fully matched the description this verse is building toward.

Micah is naming the birthplace centuries before anyone could verify it another way.

⭐ Matthew 2 quotes this exact prophecy

🤝 Unto me shows a special bond with God

👑 No prior king fully matched this description

📖 The birthplace is named centuries in advance
---
## ♾️ Whose Goings Forth Have Been From Of Old, From Everlasting

Goings forth describes where someone originates from, their point of origin in time.

From of old could simply mean an ancient human ancestry, ages ago but still within history.

From everlasting pushes further than that, into existence before time itself began.

This ruler's origin reaches back further than any human genealogy could explain.

♾️ Goings forth means point of origin

📜 From of old could mean ancient history

⏳ From everlasting means before time began

📖 This ruler's origin outruns any genealogy
---
## ⏳ Therefore Will He Give Them Up

This does not mean God rejects Israel forever.

Give them up describes a temporary period of hardship.

The next phrase names exactly when that period ends.

Judgment here comes with a built in expiration.

⏳ Give up means a temporary hardship

🚫 This is not permanent rejection

⏱️ The next phrase names the end point

📖 Judgment here has a built in expiration
---
## 🤰 Until The Time That She Which Travaileth Hath Brought Forth

Travaileth is the old word for labor pain during childbirth.

Micah already used this exact image one chapter earlier for Jerusalem's own suffering.

Here it likely points to the ruler's own birth, the moment this long wait finally ends.

Pain like this always leads somewhere, it is never the final word.

🤰 Travaileth means labor pain in childbirth

🔁 This echoes the image from chapter four

👶 It likely points to the ruler's birth

📖 This pain always leads to something
---
## 🔄 Then The Remnant Of His Brethren Shall Return Unto The Children Of Israel

Remnant means the small group that survives after a much larger loss.

His brethren refers to the wider family of Israelites scattered during exile.

This promises reunion, not permanent separation between the ruler's own people.

Scattering was never going to be the end of this story.

🌱 Remnant means the small surviving group

👨‍👩‍👧 His brethren means the scattered Israelites

🤝 This promises a real reunion

📖 Scattering was never the end here
---
## 🐑 He Shall Stand And Feed In The Strength Of The LORD

Feed here means to shepherd and guide a flock, not literally to eat.

Stand pictures a ruler who stays put and does not run from danger.

His strength to do this comes directly from the LORD, not from his own resources.

This is the same shepherd picture Micah already used for Israel's scattered remnant.

🐑 Feed means to shepherd and guide

🧍 Stand pictures a ruler who stays

💪 His strength comes from the LORD

📖 This is the same shepherd picture
---
## 👑 In The Majesty Of The Name Of The LORD His God

The name of the LORD stands for God's whole character and reputation, not just a label.

Majesty adds the idea of royal honor and weight behind that name.

Because of that backing, the people shall abide.

Abide means they finally live in safety.

Security here comes from whose name stands behind the ruler, not from walls or weapons.

📛 The name of the LORD means God's character

👑 Majesty adds royal honor and weight

🏡 They shall abide means they finally rest safe

📖 Safety here comes from whose name backs him
---
## 🌍 Now Shall He Be Great Unto The Ends Of The Earth

This ruler's reach was never meant to stop at Israel's own borders.

Unto the ends of the earth means his influence reaches every nation, not just one.

Micah is describing a kingdom bigger than any king Israel had seen before.

Greatness here is measured by reach, not by the size of his own hometown.

🌍 Ends of the earth means every nation

🚫 His reach never stops at Israel

👑 This outgrows every earlier Israelite king

📖 Greatness here is measured by global reach
---
## 🕊️ This Man Shall Be The Peace

The verse does not just say this man brings peace.

It says he shall be the peace itself, as if peace and his presence are the same thing.

That is a bigger claim than any treaty or policy could deliver.

Everything that follows in this verse happens because of who he already is.

🕊️ He is not just a peacemaker

🤝 He is described as peace itself

📜 This outweighs any treaty or policy

📖 Everything after this flows from who he is
---
## ⚠️ When He Shall Tread In Our Palaces

The Assyrian names the specific empire threatening Judah when Micah wrote this.

Tread in our palaces pictures an enemy army walking freely through the king's own halls.

That image describes full scale invasion and occupation, not a minor border raid.

This was the real, present danger the promised ruler would ultimately answer.

⚠️ The Assyrian names the real threat

🏰 Tread in our palaces means invasion

🚶 Enemies walk freely through the king's halls

📖 The promised ruler answers this exact danger
---
## 🔢 Then Shall We Raise Against Him Seven Shepherds, And Eight Principal Men

Seven and eight used together like this is a Hebrew counting pattern, not a literal headcount.

It means more than enough leaders will rise up, without naming an exact number.

Shepherds and principal men both describe leaders responsible for protecting their people.

God promises plenty of capable defenders will answer this specific threat.

🔢 Seven then eight is a counting pattern

➕ It means more than enough leaders

🐑 Shepherds here means protective leaders

📖 Capable defenders will answer this threat
---
## 🏛️ The Land Of Nimrod In The Entrances Thereof

Nimrod was a figure named back in Genesis 10 as a founder of early Mesopotamian cities.

Land of Nimrod became a poetic way of naming the wider Assyrian Babylonian region.

Calling it that reminds the reader this empire's roots go back to Babel itself.

Even the oldest, proudest power on earth cannot stand against this deliverance.

🏛️ Nimrod founded early Mesopotamian cities

🗺️ Land of Nimrod names the Assyrian region

🏗️ Its roots trace back to Babel

📖 Even that old power cannot stand here
---
## 🛡️ Thus Shall He Deliver Us From The Assyrian

The threat that opens this chapter gets answered by its very end.

Judah does not defeat Assyria through superior weapons or numbers.

The ruler from Bethlehem is the one who delivers them.

The section started with a king humiliated and ends with a king who saves.

🔁 The chapter's opening threat gets answered

💪 Judah wins through the ruler not weapons

👑 The Bethlehem ruler is the deliverer

📖 Humiliation turns into rescue by the end
# Micah 5:7-9
# 🦁 Dew And Lion
---
## 🌍 The Remnant Of Jacob Shall Be In The Midst Of Many People

Remnant of Jacob again names the surviving Israelites after judgment and exile.

In the midst of many people means living scattered among other nations, not isolated.

What might sound like a punishment here gets described as something good instead.

Where they live becomes the stage for the two pictures that follow next.

🌍 Remnant of Jacob means surviving Israelites

🧩 In the midst means living among nations

🔄 Being scattered here is not punishment

📖 This sets up the two images next
---
## 💧 As A Dew From The LORD

Dew forms quietly overnight without anyone noticing it arrive.

It still leaves the ground noticeably wet and refreshed by morning.

The remnant's presence among the nations works the same way, quiet but real.

Its effect does not need announcement to actually matter.

💧 Dew forms quietly overnight unseen

🌅 It still refreshes the ground by morning

🤫 The remnant works quietly like this

📖 Quiet effects can still matter
---
## 🌧️ As The Showers Upon The Grass

This is a second picture of the same idea dew already gave.

Showers soak into grass and make it grow without the grass doing anything itself.

The remnant's good influence on the nations works the same passive, natural way.

Growth here is something that happens to people, not something they force.

🌧️ Showers make grass grow without effort

🌱 Growth happens it is not forced

🔁 This repeats the dew picture again

📖 Good influence can be this natural
---
## ⏱️ That Tarrieth Not For Man, Nor Waiteth For The Sons Of Men

Tarrieth is an old word for waiting around or delaying.

Dew and rain fall on their own schedule, with no human permission needed.

The remnant's blessing works the same independent way.

It does not pause for anyone's approval before it happens.

⏱️ Tarrieth means waiting or delaying

🌦️ Dew falls on its own schedule

🙅 No human permission is needed here

📖 This blessing does not wait for approval
---
## 🦁 As A Lion Among The Beasts Of The Forest

This is a sudden, deliberate shift from the gentle dew and rain picture.

A lion among forest animals is never gentle.

It is the one animal every other creature fears.

The same remnant that blessed quietly can also act with real force.

Micah holds both pictures together on purpose, gentleness and strength in the same people.

🦁 This shifts suddenly from gentle to fierce

😨 Other forest animals fear the lion

💪 The remnant can act with force too

📖 Gentleness and strength both describe them
---
## 🐑 As A Young Lion Among The Flocks Of Sheep

A young lion is in its prime, strong and highly active.

Sheep flocks have no natural defense against a predator like this.

The nations here are pictured as the vulnerable sheep, not the lion.

Power has shifted completely from who threatened Israel earlier in this book.

🐑 Sheep flocks have no defense here

🦁 A young lion is strong and active

🔄 Nations now play the vulnerable role

📖 Power has shifted since earlier chapters
---
## 💥 Who, If He Go Through, Both Treadeth Down, And Teareth In Pieces

Treadeth down and teareth in pieces describe total, overwhelming destruction.

This is not a close fight or a partial victory.

A real lion kills prey with total ease, not struggle.

The remnant's strength among the nations is described with that same total ease.

💥 Treadeth down means total destruction

⚔️ This is not a close fight

🦁 A lion kills with total ease

📖 The remnant's strength matches that ease
---
## 🚫 None Can Deliver

This exact phrase echoed earlier in Micah as a warning against God's own people.

Now the same hopeless phrase describes what enemies face instead.

Whoever this remnant moves against has no possible rescue coming.

The tables have fully turned by this point in the chapter.

🔄 This phrase once warned God's own people

🚫 Now it describes enemies instead

😨 No rescue is possible for them

📖 The tables have fully turned here
---
## ✋ Thine Hand Shall Be Lifted Up Upon Thine Adversaries

A lifted hand is an old picture of victory and authority over an enemy.

It is the posture of someone who has already won, not someone still fighting.

Thine adversaries names whoever still opposes this remnant directly.

The outcome here is treated as settled, not uncertain.

✋ A lifted hand pictures victory

👑 It shows authority already won

⚔️ Adversaries means those still opposing

📖 The outcome is treated as settled
---
## ✂️ All Thine Enemies Shall Be Cut Off

Cut off means completely removed, not merely weakened or pushed back.

This closes out the dew and lion pictures with one plain, final statement.

Every enemy named through this section ends the same way.

The next section turns from outside enemies to Israel's own inside problems.

✂️ Cut off means completely removed

🔚 This closes the dew and lion pictures

⚔️ Every named enemy ends this way

📖 Next the focus turns inward
# Micah 5:10-15
# 🔥 The LORD Purges The Nation
---
## 📅 In That Day, Saith The LORD

In that day shifts the focus from protection against outside enemies to Israel's own purification.

Saith the LORD signals a direct, formal pronouncement, not Micah's own commentary.

The remnant that was just promised safety now hears what it takes to truly receive it.

Safety and purification are two parts of the exact same promise.

📅 In that day signals a clear shift

🗣️ Saith the LORD marks a formal pronouncement

🎯 The focus moves to Israel's own purity

📖 Safety and purity are one promise
---
## 🐎 I Will Cut Off Thy Horses Out Of The Midst Of Thee, And I Will Destroy Thy Chariots

This is not about God disliking horses or chariots themselves.

Horses and chariots were the ancient equivalent of advanced military technology.

Removing them means removing Israel's temptation to trust weapons instead of God.

The deliverance promised earlier in this chapter was never meant to come from military strength.

🐎 This is not about hating animals

⚙️ Horses and chariots meant military technology

🚫 Removing them removes false trust

📖 Deliverance was never meant from military strength
---
## 🏰 I Will Cut Off The Cities Of Thy Land, And Throw Down All Thy Strong Holds

Strong holds means fortified cities built for military defense.

Nations usually trusted these fortresses to keep them safe no matter what.

God removes that safety net along with the horses and chariots already mentioned.

True security was always meant to come from him, not from walls.

🏰 Strong holds means fortified defense cities

🛡️ Nations trusted these for safety

🚫 God removes this safety net too

📖 Security was always meant to be from him
---
## 🔮 I Will Cut Off Witchcrafts Out Of Thine Hand

Witchcrafts refers to occult practices used to manipulate unseen spiritual power.

These practices were common across the ancient Near East, even inside Israel at times.

God is removing Israel's temptation to seek power through forbidden means.

True guidance was always supposed to come through his own prophets instead.

🔮 Witchcrafts means forbidden occult practices

🌍 These practices were common nearby

🚫 God removes this temptation completely

📖 True guidance comes through his prophets
---
## 🧙 Thou Shalt Have No More Soothsayers

Soothsayers were people who claimed to predict the future outside of God's own prophets.

Removing both closes off every false source of guidance.

God is not leaving Israel without guidance, he is removing every counterfeit version of it.

Only his true prophets will remain afterward.

🧙 Soothsayers claimed to predict the future

🚫 They worked outside of God's true prophets

🧹 This closes off every counterfeit guidance

📖 Only true guidance from God remains
---
## 🗿 Thy Graven Images Also Will I Cut Off

Graven images means idols carved out of wood or stone by human hands.

These were physical objects people bowed to and prayed toward as if they were gods.

Removing them strikes directly at Israel's most visible form of false worship.

An object that cannot see, hear, or act was never a real god to begin with.

🗿 Graven images means carved idols

🙏 People bowed and prayed to these

🎯 This targets the most visible idolatry

📖 A carved object was never a real god
---
## 🗽 Thy Standing Images Out Of The Midst Of Thee

Standing images refers to sacred pillars or stones set up at pagan worship sites.

These marked a sacred site, not a specific figure.

Both types of object get removed together, leaving no physical idol standing anywhere.

God is clearing the land completely, not partially.

🗽 Standing images means sacred worship pillars

🏞️ These marked shrine sites not figures

🧹 Both idol types are removed together

📖 The clearing here is total not partial
---
## 🙌 Thou Shalt No More Worship The Work Of Thine Hands

The work of thine hands names idols that people built with their own two hands.

Worshipping something you personally made and shaped is a strange kind of backwards worship.

A true god should be greater than its own worshippers, not made by them.

This verse exposes exactly how backwards that whole system really was.

🙌 Work of thine hands means self made idols

🔄 Worshipping your own creation is backwards

👑 A true god is greater than its maker

📖 This exposes how backwards idolatry was
---
## 🌳 I Will Pluck Up Thy Groves Out Of The Midst Of Thee

Groves here does not mean innocent clusters of trees.

These were wooden poles or living trees dedicated to the pagan goddess Asherah.

Removing them strikes at a form of worship often set up right alongside Israel's own altars to God.

Pulling up a tree takes more effort than toppling a carved statue, showing how seriously God takes this.

🌳 Groves means Asherah worship poles

🚫 Not innocent trees but pagan symbols

⚠️ Often set up beside Israel's own altars

📖 This removal shows real seriousness
---
## 🏙️ So Will I Destroy Thy Cities

This repeats the destruction of cities already named back in verse eleven.

Idolatry and misplaced trust in fortresses get judged together, not separately.

A nation's buildings were never going to be what saved it.

Only a changed relationship with God could do that.

🏙️ This repeats verse eleven's judgment

🔗 Idolatry and misplaced trust are linked

🏗️ Buildings were never going to save them

📖 Only God could truly save this nation
---
## 🔥 I Will Execute Vengeance In Anger And Fury Upon The Heathen

The heathen means the nations outside Israel who opposed God and his people.

Execute vengeance describes formal, deserved judgment, not an uncontrolled outburst.

This judgment lands on outside enemies only after Israel's own idols were already removed.

God deals with his own people's sin before turning to judge everyone else.

🔥 Heathen means nations opposing God

⚖️ Vengeance here means deserved formal judgment

🔄 This follows Israel's own purification first

📖 God judges his people's sin first
---
## 😮 Such As They Have Not Heard

This judgment will be unprecedented, beyond anything these nations have experienced before.

The chapter opened with Judah under siege and a king being humiliated.

It closes with God himself executing judgment no one saw coming.

The whole chapter moves from Judah's weakness to God's complete and final strength.

😮 This judgment is truly unprecedented

🔄 The chapter opened with Judah humiliated

⚡ It ends with God's own judgment

📖 Weakness becomes God's final strength
`.trim();

export const MICAH_FIVE_PERSONAL_SECTIONS = parseMicahFiveRawNotes(MICAH_FIVE_RAW_NOTES);
