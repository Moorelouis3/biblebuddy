export type IsaiahSixtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahSixtyTwoRawNotes(rawText: string): IsaiahSixtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahSixtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+62:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 62 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+62:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+62:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 62 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 62,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 62:${startVerse}` : `Isaiah 62:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Isaiah 62 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_SIXTY_TWO_RAW_NOTES = `# Isaiah 62:1-3
# 🌅 A New Name For Zion
---
## 🤐 For Zion's Sake Will I Not Hold My Peace

"Hold my peace" means to stay silent.

The speaker refuses that silence.

Many scholars believe this is the prophet.

He speaks on God's behalf.

He commits to keep pleading for Jerusalem.

This persistence returns later.

It comes back through the watchmen on the walls.

🤐 Hold my peace means staying silent

🗣️ The speaker refuses to stop

📜 Likely the prophet pleading for Jerusalem

📖 This persistence returns with the watchmen

## 🌅 Until The Righteousness Thereof Go Forth As Brightness

"Brightness" pictures the sun breaking through darkness at dawn.

Zion's righteousness is compared to that same light.

It cannot be missed once it appears.

This change is not private.

The whole world will see it.

🌅 Brightness pictures dawn breaking through darkness

👀 Zion's righteousness becomes plainly visible

🌍 The whole world will see it

📖 God's restoration is never hidden

## 🏮 The Salvation Thereof As A Lamp That Burneth

"Lamp" was the only real light inside a home after dark.

Comparing salvation to a burning lamp pictures something steady.

It is not a single flash.

This image doubles the brightness just described.

The change will be visible.

It will also last.

🏮 A lamp lit a home after dark

🔥 Burning pictures steady light

🔁 This doubles the brightness image

➡️ The change is visible and lasting

## 🌍 The Gentiles Shall See Thy Righteousness

"Gentiles" means anyone who is not Jewish.

This promise reaches every nation outside Israel.

Even kings will take notice.

Zion's restoration was never meant to stay a local story.

🌍 Gentiles means every non Jewish nation

👑 Even kings will notice

📢 The promise reaches beyond Israel

📖 Restoration was never meant to stay private

## 🏷️ Thou Shalt Be Called By A New Name

Names in scripture often describe identity.

They are more than what people are called.

This new name is not given yet.

It comes later in the chapter.

"Which the mouth of the LORD shall name" means God himself chooses it.

No one else defines who Zion now is.

🏷️ Names in scripture describe real identity

⏳ The actual new name comes later

🗣️ God himself chooses the name

📖 God alone defines who Zion is

## 👑 A Crown Of Glory In The Hand Of The LORD

A "crown of glory" pictures something precious.

"Diadem" is another word for crown.

Both images picture Zion as something valuable.

God holds Zion the way someone holds a treasured object.

A crown is not hidden away.

It is worn and shown to everyone.

👑 Diadem is another word for crown

💎 Zion is pictured as something valuable

🙌 Held in God's own hand

📖 God is proud to display his people

# Isaiah 62:4-5
# 💍 Hephzibah And Beulah
---
## 😔 Thou Shalt No More Be Termed Forsaken

"Forsaken" means abandoned.

It describes being left with no one coming back.

This word described Jerusalem through the exile.

The verse promises that old label will not fit anymore.

A new identity comes just a few lines later.

😔 Forsaken means abandoned completely

📆 It described Jerusalem through the exile

🚫 The old label will not fit

📖 A new identity is coming soon

## 🏜️ Neither Shall Thy Land Any More Be Termed Desolate

"Desolate" means empty and ruined.

It pictures land with no one left to tend it.

Jerusalem's land had sat this way for years.

Pairing forsaken with desolate covers both the people and the land.

Both old names end in this same verse.

🏜️ Desolate means empty and ruined

📆 The land sat ruined for years

👥 This pairs the people with the land

📖 Both old names end together

## 📛 Thou Shalt Be Called Hephzibah, And Thy Land Beulah

"Hephzibah" is Hebrew for my delight is in her.

"Beulah" is Hebrew for married.

These are not random titles.

Each name carries its own meaning in Hebrew.

Together they describe a relationship.

It is not just new circumstances.

📛 Hephzibah means my delight is in her

💍 Beulah means married

🔤 Both names carry real Hebrew meaning

📖 The names describe a relationship

## ❤️ For The LORD Delighteth In Thee, And Thy Land Shall Be Married

This line explains the two names just given.

Hephzibah is explained here directly.

God says plainly that he delights in his people.

Beulah is explained the same way.

The land itself is pictured as married.

These names are promises.

They are not decoration.

❤️ Two names now get explained plainly

💍 Hephzibah means God delights in her

💒 Beulah pictures the land as married

➡️ Names here are promises not decoration

## 💍 As A Young Man Marrieth A Virgin, So Shall Thy Sons Marry Thee

This is not a literal marriage.

"Marry" here pictures devotion.

It works the way a bridegroom is devoted to his bride.

Zion's own children are pictured returning to the land.

They come back to claim it and care for it.

The picture is about love.

It is not about literal weddings.

🚫 Not a literal marriage being described

💍 Marry here pictures devotion

🏠 Zion's people return to claim the land

📖 The picture is love not weddings

## 😊 As The Bridegroom Rejoiceth Over The Bride

God's joy over his people is compared here to a bridegroom's joy.

A bridegroom's joy on his wedding day is hard to hide.

That is a striking comparison.

The creator of the universe is compared to an excited groom.

God's love here is delight.

It is not duty.

💒 A bridegroom's joy is hard to hide

❤️ God feels the bridegroom's joy

😊 A striking comparison for the creator

📖 God's love is delight not duty

# Isaiah 62:6-7
# 🗼 Watchmen Who Never Rest
---
## 🗼 I Have Set Watchmen Upon Thy Walls

"Watchmen" were guards stationed on a city wall.

They warned of danger and kept watch through the night.

Here the picture shifts.

Many scholars believe these watchmen picture prophets or intercessors.

They are assigned to keep praying for Jerusalem's restoration.

God himself sets them in place.

🗼 Watchmen guarded the city from its walls

🙏 Here they picture prayer not defense

📜 Likely prophets praying for Jerusalem

📖 God himself assigns them this task

## ⏰ Which Shall Never Hold Their Peace Day Nor Night

These watchmen take no shifts.

They take no rest breaks either.

Their prayer continues constantly.

It never pauses, day or night.

This persistence matches the promise made back in verse one.

The whole chapter pictures prayer that refuses to stop.

⏰ No shifts and no rest breaks

🔁 Prayer continues day and night

🔗 This matches the promise from verse one

📖 The chapter pictures prayer that never stops

## 🙏 Ye That Make Mention Of The LORD, Keep Not Silence

"Ye" here addresses the watchmen directly.

It calls them to actually do the job just described.

"Make mention of the LORD" means to pray.

It means bringing his promises back to him in words.

This is a direct command.

It is not just a description.

Silence is the one thing they must avoid.

👥 Ye addresses the watchmen directly

🙏 Make mention means to pray

📢 This is a direct command

📖 Silence is the one thing forbidden here

## 🏗️ Give Him No Rest, Till He Establish

This is a bold kind of prayer.

It asks without stopping until God fully acts.

"Establish" means made firm and lasting.

It is the opposite of temporary.

The goal named here is Jerusalem becoming a praise in the earth.

That means known and admired by every nation.

Persistent prayer here is not rude.

It is exactly what God invites.

🙏 A prayer that refuses to stop

🏗️ Establish means made firm and lasting

🌍 The goal is fame among every nation

📖 God invites this kind of persistence

# Isaiah 62:8-9
# 🤝 The LORD's Sworn Oath
---
## 🤝 The LORD Hath Sworn By His Right Hand

Swearing an oath by something calls on it as a guarantee.

God has nothing higher to swear by.

So he swears by his own power instead.

"Right hand" and "arm of his strength" both picture God's ability to act.

They are not describing a body part.

This is the strongest kind of promise scripture can describe.

🤝 Swearing by something guarantees a promise

💪 Right hand pictures God's own power

🔝 God swears by himself with nothing higher

📖 This marks the strongest kind of promise

## 🌾 I Will No More Give Thy Corn To Be Meat For Thine Enemies

During exile, invading armies often took Israel's own harvest.

This oath promises that pattern is over.

"Meat" is an old word for food in general.

It does not mean only animal flesh.

The people who plant and harvest will finally eat what they grew.

🌾 Enemies once took Israel's own harvest

🍽️ Meat here means food in general

🚫 That pattern of loss will end

📖 Growers finally eat what they grow

## 😤 The Sons Of The Stranger Shall Not Drink Thy Wine

"Sons of the stranger" means foreigners.

It often points to foreign soldiers or conquerors.

This repeats the same promise as the verse before.

This time it is about wine instead of grain.

"For the which thou hast laboured" names the real pain.

Years of labor had been taken by someone else.

The reversal promised here covers both food and drink.

😤 Sons of the stranger means foreign conquerors

🍷 This repeats the promise now about wine

😓 Years of labor were taken by others

📖 Both food and drink are reversed

## 🙌 They That Have Gathered It Shall Eat It, And Praise The LORD

This verse finally answers the promise made in verse eight.

The workers who grow and gather the harvest now eat it themselves.

Praise is not separate from the meal.

It happens as part of it.

Gratitude and provision arrive together here.

✅ This verse fulfills verse eight's promise

🌾 Workers finally eat their own harvest

🙌 Praise happens as part of the meal

📖 Gratitude and provision arrive together

## ⛪ They That Have Brought It Together Shall Drink It In The Courts Of My Holiness

"Courts of my holiness" means the temple courts in Jerusalem.

That was the place set apart for worship.

Drinking the harvest there turns an ordinary meal into worship.

This is not a private celebration at home.

It happens in the presence of God himself.

The harvest is offered back to God.

It is not just consumed.

⛪ Courts of my holiness means temple courts

🍇 Drinking there turns a meal into worship

👀 This happens in God's own presence

📖 The harvest is offered back to God

# Isaiah 62:10-12
# 🚪 Prepare The Way And Receive The Name
---
## 🚪 Go Through, Go Through The Gates

"Go through" is repeated twice here.

That repetition adds urgency to the command.

The gates belong to the city of Jerusalem.

The next words in the verse call for preparing the way of the people.

That pictures road work done ahead of an arriving crowd.

Something important is about to arrive.

🔁 Go through repeated twice adds urgency

🚪 The gates belong to Jerusalem

🛤️ Prepare the road for the people

📖 Someone important is about to arrive

## 🛠️ Cast Up, Cast Up The Highway

"Cast up" is old language for building a road.

It means piling and packing material to make it level.

The verse also calls for gathering out the stones.

That cleared the path so carts would not stumble or break down.

This is real physical labor pictured here.

It is not just a figure of speech.

🛠️ Cast up means raising a road

🪨 Gathering stones cleared the path

🚶 This pictures real physical labor

➡️ The people prepare for God's arrival

## 🚩 Lift Up A Standard For The People

A "standard" was a raised banner or flag.

It was used to rally people from a distance.

Armies and travelers used standards to know where to gather.

Here it signals the same thing.

It shows the people exactly where the promised return is happening.

Nothing about this restoration happens quietly.

🚩 A standard was a raised banner

👀 It helped people gather from a distance

📍 It marks exactly where to go

📖 This restoration is meant to be seen

## 📢 The LORD Hath Proclaimed Unto The End Of The World

This announcement is not limited to Jerusalem.

It is not limited even to Israel.

"Unto the end of the world" means every nation will hear it.

The message is too important to stay local.

God himself makes sure it gets out.

📢 The announcement is not limited to Israel

🌍 End of the world means every nation

📣 The message is too important to stay local

📖 God himself ensures it gets out

## 👧 Say Ye To The Daughter Of Zion, Behold, Thy Salvation Cometh

"Daughter of Zion" is a common title for Jerusalem and its people.

"Behold" is an old word meaning look.

It means pay close attention.

This message finally delivers the good news the whole chapter has built toward.

"His reward is with him" pictures God arriving already carrying what he promised.

He does not arrive empty handed.

👧 Daughter of Zion means Jerusalem and its people

👀 Behold means look and pay attention

🎁 God arrives already carrying his reward

📖 The chapter's promise finally gets delivered

## ✨ The Holy People, The Redeemed Of The LORD

This is a new name for the whole people.

It is not a title for just one person.

"Redeemed" means bought back.

It means rescued from something they could not escape alone.

Being called holy does not mean the people earned it.

It names what God has now made them.

That pairing names both their rescue and their new identity.

👥 A new name for the whole people

💰 Redeemed means bought back and rescued

✨ Holy names what God has made them

📖 Status and rescue are named together

## 🔁 Sought Out, A City Not Forsaken

"Forsaken" was the very word this chapter promised to remove.

That promise was made back in verse four.

"Sought out" means actively looked for and found.

It is the opposite of abandoned.

The chapter began with a promise of a new name.

It ends here, delivering that promise in full.

Zion's whole story moves from abandoned to sought.

🔁 Forsaken was promised gone in verse four

🔍 Sought out means actively found

📖 The chapter's opening promise is fulfilled

➡️ Zion moves from abandoned to delighted in
`.trim();

export const ISAIAH_SIXTY_TWO_PERSONAL_SECTIONS = parseIsaiahSixtyTwoRawNotes(ISAIAH_SIXTY_TWO_RAW_NOTES);
