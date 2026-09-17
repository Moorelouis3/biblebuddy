export type PsalmsSixtyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSixtyEightRawNotes(rawText: string): PsalmsSixtyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSixtyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+68:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 68 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+68:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+68:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 68 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 68,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 68:${startVerse}` : `Psalms 68:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Psalms 68 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SIXTY_EIGHT_RAW_NOTES = `# Psalms 68:1-6
# 💨 Let God Arise
---
## 💨 Let God Arise, Let His Enemies Be Scattered

Let God arise was not a new prayer.

Moses said almost the same words in the book of Numbers.

He said them every time the ark of the covenant moved.

This psalm opens with the ark already on the march.

Calling on God to arise pictures Him as a warrior king.

The battle belongs to God before it even starts.

💨 Echoes Moses' words when the ark moved

⚔️ Pictures God as a rising warrior king

📦 The ark on the march opens this psalm

📖 God fights before the battle even starts

## 🌬️ As Smoke Is Driven Away

Smoke has no strength to resist a light wind.

One gust and it scatters completely.

Wax works the same way near an open flame.

It gives way and melts instead of fighting back.

David uses both pictures to make one point.

God's enemies have no real power against Him.

🌬️ Smoke cannot resist even a light wind

🕯️ Wax gives way the moment it meets fire

🙅 Enemies have no real power against God

📖 Nothing threatening stands a chance near Him

## 😊 Let The Righteous Be Glad

The same presence that scatters enemies brings joy too.

Fear and joy sit side by side in this psalm.

David repeats the word rejoice twice in one line.

The second time pushes it further, to exceeding joy.

That repetition is not filler.

It is David piling up every word for joy he can find.

😊 Joy and fear sit side by side here

🔁 Rejoice is repeated for emphasis

📈 Exceedingly pushes that joy even further

📖 God terrifies enemies and delights His people

## ☁️ Extol Him That Rideth Upon The Heavens By His Name JAH

Extol means lifting someone up with praise.

It goes louder and higher than an ordinary compliment.

JAH is a short form of God's own covenant name.

That short name sits behind the word hallelujah.

Hallelujah literally means praise JAH.

Picturing God riding upon the heavens shows Him in control of the sky.

This is praise aimed at a specific name, not a vague idea.

📣 Extol means lifting God up in praise

🙌 JAH is a short form of His name

☁️ Riding the heavens pictures full control

📖 Praise aimed at a name, not an idea

## 👨‍👧 A Father Of The Fatherless

In this culture, a child who lost a father lost protection too.

He often lost property and standing in the community as well.

Widows faced that same kind of danger.

No husband meant no one to defend their place in society.

God claims both roles directly here.

Judge means He takes up their case personally, like a defender.

God fills the gap that real human loss leaves behind.

👶 Fatherless children lost protection and property

👵 Widows faced that same kind of danger

⚖️ Judge means God defends their case personally

📖 God fills the gap human loss leaves behind

## 🏠 God Setteth The Solitary In Families

Solitary describes someone cut off, with no household of his own.

God is pictured here placing lonely people into real belonging.

The same verse also says He frees those bound in chains.

That is another kind of isolation being broken.

Both pictures point at the same idea.

God moves people from isolation into freedom and connection.

🏠 Solitary means cut off, with no family

🔓 God frees those bound in chains

🤝 Both images point to real rescue

📖 Loneliness is not permanent under God's care

## 🏜️ The Rebellious Dwell In A Dry Land

This line is a sharp contrast to what was just promised.

The lonely receive a family.

The bound receive freedom.

The rebellious end up in a dry, barren place instead.

A dry land in this region meant no water and no crops.

It meant no real way to survive for long.

Mercy and justice show up in this same verse together.

🏜️ Dry land means no water or crops

⚖️ A sharp contrast to the verses just before

🚫 Hardship follows deliberate, ongoing rebellion

📖 Mercy and justice appear in one verse

# Psalms 68:7-10
# 🥾 Marching Through The Wilderness
---
## 🏜️ When Thou Didst March Through The Wilderness

This verse looks back to the exodus.

God led Israel out of Egypt through open desert.

Selah appears at the end of this line.

It is a word used often in the Psalms.

Its exact meaning is not fully certain today.

Many scholars believe it marked a pause in the song.

This memory of the wilderness deserved a moment to sit with the reader.

🏜️ Recalls God leading Israel out of Egypt

⏸️ Selah likely marked a pause in the song

❓ Its exact meaning is not fully certain

📖 The exodus anchors Israel's worship

## ⛰️ Sinai Itself Was Moved

This verse remembers the day God appeared on Mount Sinai.

That is where He gave the law to Moses.

The ground itself is described as shaking.

The sky is described as dropping rain or trembling.

Even a mountain reacts to God's arrival here.

A mountain could not stay unmoved before Him.

No enemy army on earth could stay unmoved either.

⛰️ Recalls God's appearing at Mount Sinai

🌩️ The earth and sky react to His presence

🏔️ Even a mountain cannot stay unmoved

📖 That same power now leads Israel forward

## 🌧️ Thou Didst Send A Plentiful Rain

After the storm at Sinai comes a gentler picture.

Rain falls on dry, tired ground.

Thine inheritance means the land and people God claimed as His own.

When it was weary pictures ground worn out and cracked.

That ground was desperate for water after a long dry season.

God provides exactly what His people needed most.

🌧️ Plentiful rain follows the Sinai storm

🗺️ Inheritance means the land and people He claimed

🌾 Weary ground pictures cracked, desperate soil

📖 God provides power and gentle care alike

## 💰 Prepared Of Thy Goodness For The Poor

Thy congregation means the community of Israel on the land.

God is described providing specifically for the poor within it.

This detail matters in the ancient world.

Societies often left the poor to fend for themselves.

God's provision reaches all the way down to the people with the least.

National blessing was never meant to skip the poorest among them.

🏕️ Congregation means Israel settled on the land

💰 God provides especially for the poor

👥 Ancient societies often ignored the poor

📖 Blessing reaches even the least among them

# Psalms 68:11-14
# 📢 The Word And The Spoil
---
## 📢 The Lord Gave The Word

The word here likely means a command from God.

It announced victory to everyone listening.

Great was the company describes a large group spreading that news.

Before writing spread information quickly, news traveled by voice.

It was carried by many mouths at once.

A short command from God turns into a wave of good news.

📢 The word means God's announced command

🗣️ A large company spread the news

👥 News traveled by many voices at once

📖 God's word never stays quiet for long

## 🏃 Kings Of Armies Did Flee Apace

Apace is an old word meaning quickly, at full speed.

Entire armies are pictured running away as fast as they can.

Even the kings leading them are shown fleeing.

This line celebrates a total, humiliating defeat.

It is not a narrow win for God's enemies.

Powerful kings are reduced to a full sprint.

🏃 Apace means at full speed

👑 Even kings are shown fleeing

💨 The defeat is total, not narrow

📖 God's enemies run without any dignity

## 🏠 She That Tarried At Home Divided The Spoil

While the men fought, the women who stayed home still shared the win.

Tarried means those who remained behind.

Spoil means the goods and valuables taken from a defeated enemy.

This pictures a whole community benefiting from God's victory.

It was not only the soldiers who fought.

Even those who never left home received a share of what God won.

🏠 Tarried means those who stayed at home

💎 Spoil means goods taken from a defeated foe

👩 Women at home shared in the victory

📖 God's victory reaches past the battlefield

## 🕊️ As The Wings Of A Dove Covered With Silver

Lien among the pots pictures a rough, humble condition.

It is like a servant sleeping among cooking pots and ash.

That contrasts sharply with the next image.

A dove's wings shimmer with silver and gold in the sunlight.

Think of someone trading soot stained clothes for polished armor.

David is describing Israel's turnaround from a low state into honor.

🍳 Lien among the pots means a humble state

🕊️ The dove's wings picture shining honor instead

✨ Silver and gold suggest sudden beauty

📖 God turns humble beginnings into something bright

## ❄️ White As Snow In Salmon

Salmon here is a hill, not the fish.

It was likely located near Shechem in the land of Israel.

Snow covering that hill made a striking, visible picture.

Anyone watching from a distance could see it clearly.

This image follows right after God scattering kings.

The text does not spell out every detail of the comparison.

The sense of obvious, total victory still comes through clearly.

🏔️ Salmon was a hill, not the fish

❄️ Snow made the hill strikingly visible

👀 The image pictures obvious, total victory

📖 God's wins were never hidden from view

# Psalms 68:15-18
# 🏔️ The Hill God Desires
---
## 🗺️ The Hill Of God Is As The Hill Of Bashan

Bashan was a region east of the Jordan River.

It was known for tall mountains and rich, fertile land.

Its hills were taller than the modest hill of Zion.

Zion was where God's own temple would later stand.

David sets up a direct comparison between the two.

This verse is not praising Bashan for its size.

It is using Bashan's reputation to set up the next verse.

🗺️ Bashan was a fertile region east of Jordan

🏔️ Bashan's hills were taller than Zion's

⚖️ David compares the two on purpose

📖 Size never decided what mattered to God

## 🤔 Why Leap Ye, Ye High Hills

The tall hills of Bashan are pictured looking at Zion with envy.

Why leap ye pictures those hills jumping to get attention.

God does not choose Zion for being the biggest.

He does not choose it for being the most impressive either.

He chooses it simply because He wants to.

That choice is described here as permanent, forever.

🏔️ Bashan's hills are pictured as jealous

🤔 Why leap ye pictures jealous straining

🏛️ Zion is chosen, not impressive

📖 God's choice makes a place holy

## 🐎 The Chariots Of God Are Twenty Thousand

This verse pictures an enormous heavenly army.

Its chariots are too many to count easily.

That army escorts God Himself.

Thousands of angels describes it as an angelic force.

These are not human soldiers.

The comparison to Sinai ties this back to earlier in the psalm.

No enemy army on earth could ever match a force like this.

🐎 Chariots picture an enormous heavenly army

👼 Thousands of angels make up that army

⛰️ The scene echoes Sinai from earlier

📖 No earthly army could ever match it

## 👑 Thou Hast Ascended On High, Thou Hast Led Captivity Captive

This line pictures God returning from battle like a victorious king.

He climbs up to His throne after the win.

Led captivity captive is an old way of reversing a fate.

Former captors become the captives instead.

The New Testament book of Ephesians later quotes this exact verse.

It uses this picture to describe Christ's ascension into heaven.

👑 Ascended on high pictures a returning king

🔄 Led captivity captive reverses the captors' fate

✝️ Ephesians later quotes this exact verse

📖 This ancient victory points forward to Christ

## 🎁 Received Gifts For Men, Yea, For The Rebellious Also

A victorious king in this era usually received tribute after a win.

This verse says God receives gifts even for the rebellious.

Not only the loyal receive His gifts.

That the Lord God might dwell among them gives the reason.

God wants to live close to His people.

That includes the ones who resisted Him.

Grace reaching rebellious people is the whole point of this line.

🎁 Victors in this era received tribute gifts

🙇 God gives gifts even for rebellious people

🏠 The goal is God dwelling among them

📖 Victory here makes room for the undeserving

# Psalms 68:19-23
# 🛡️ The God Who Saves
---
## 📦 Who Daily Loadeth Us With Benefits

Loadeth pictures someone piling up a cart until it is full.

Think of a pack animal loaded past a comfortable weight.

David is not describing one single gift here.

He is describing blessings stacked up every single day.

Selah closes the verse again.

It likely signals another pause to let that generosity sink in.

📦 Loadeth pictures a cart piled full

📅 Benefits are described as daily, not rare

⏸️ Selah likely marks another pause

📖 God's generosity never stops

## 🚪 Unto GOD The Lord Belong The Issues From Death

The issues from death means the ways out of death.

It means the paths of escape from it.

This line says plainly that God alone controls that outcome.

No army holds that kind of authority.

No king or human power holds it either.

This truth becomes the foundation for what the psalm says next.

🚪 Issues from death means escape from death

👑 God alone controls that outcome

🚫 No human power holds that authority

📖 Life and death answer to God alone

## 🎯 God Shall Wound The Head Of His Enemies

Striking the head describes a decisive, final blow.

It is not a minor injury.

The hairy scalp pictures a specific kind of enemy.

Long hair here likely signals stubborn pride or an unbroken vow.

Goeth on still in his trespasses describes ongoing, unrepented sin.

This verse is not about an accidental wrong.

It targets deliberate, ongoing rebellion.

🎯 Wounding the head means a decisive blow

💇 Hairy scalp pictures stubborn pride

🔁 Goeth on still means ongoing, unrepented sin

📖 Judgment lands hardest on stubborn rebellion

## 🗺️ I Will Bring Again From Bashan

God promises to bring His people back from two far away places.

Bashan represents one distant extreme.

The depths of the sea represent the opposite extreme.

Together the two pictures mean no distance is too far for God.

This promise widens something already said earlier in the psalm.

God gathers the scattered no matter where they end up.

🗺️ Bashan pictures one distant extreme

🌊 The depths of the sea pictures the other

🧭 Together they mean no distance is too far

📖 God can bring anyone home from anywhere

## ⚔️ That Thy Foot May Be Dipped In The Blood

This is graphic battlefield language.

It describes a total, overwhelming defeat of God's enemies.

It reflects the poetry of ancient war songs.

It is not a literal instruction for how to walk.

Similar violent imagery appears elsewhere in the Psalms.

There it also describes complete victory in exaggerated, poetic terms.

The scale of the defeat is the real point being made.

⚔️ This is ancient battlefield poetry

🚫 Not a literal instruction for anyone

📜 Similar language appears elsewhere in Psalms

📖 Extreme imagery describes a total victory

# Psalms 68:24-27
# 🥁 The Procession Into The Sanctuary
---
## 🚶 They Have Seen Thy Goings, O God

Thy goings describes a visible procession.

God's presence is being carried publicly into the sanctuary.

This almost certainly pictures the ark of the covenant.

It was carried through the streets toward the temple.

Calling God my King makes the moment personal.

It is not only a national ceremony.

Everyone watching could see this procession with their own eyes.

🚶 Goings pictures a visible procession

📦 Likely the ark moving toward the sanctuary

👑 My King makes the moment personal

📖 This worship happened in full public view

## 🎤 The Singers Went Before, The Players On Instruments Followed After

A musical procession had its own strict order.

Singers led the way.

Instrumentalists followed close behind them.

Damsels playing with timbrels adds young women into the celebration.

A timbrel was a small hand drum.

Voice, instruments, and dance all combined in this one celebration.

🎤 Singers led the procession

🎻 Instrumentalists followed close behind

🥁 Timbrels were small hand drums

📖 Worship here was loud and shared

## 💧 Bless Ye God In The Congregations

The fountain of Israel is an old way of naming the nation's origin.

It traces every worshiper back to one shared source.

This call to bless God happens in public gatherings.

It does not happen only in private, quiet moments.

Everyone from that shared source is invited into this one act.

The whole community, not a select few, is called to respond.

💧 Fountain of Israel pictures the nation's shared origin

👥 The call goes out to public gatherings

🙌 Everyone descended from Israel is invited

📖 Worship belongs to the whole community

## 🤏 There Is Little Benjamin With Their Ruler

This verse names specific tribes marching in the procession.

It is not describing a vague crowd.

Benjamin was the smallest of Israel's tribes.

It is still named first here.

That may be because King Saul came from that tribe.

Judah, David's own tribe, follows next with its council of leaders.

Zebulun and Naphtali were northern tribes included in the same procession.

👥 Specific tribes are named, not a vague crowd

🤏 Benjamin was the smallest tribe, named first

👑 Judah was David's own tribe

📖 The whole nation gathered for this moment

# Psalms 68:28-31
# 👑 Kings Bring Their Tribute
---
## 🙏 Thy God Hath Commanded Thy Strength

This verse turns from the procession into a direct prayer.

It asks God to keep acting the way He always has.

Commanded thy strength means God assigns Israel's power in the first place.

Strengthen, O God asks Him to protect what He already built.

This prayer does not ask for something brand new.

It asks God to finish what He already started.

🙏 The psalm shifts into direct prayer

💪 God is the source of Israel's strength

🏗️ The prayer asks Him to finish His work

📖 This is a request for continuation

## 🏛️ Because Of Thy Temple At Jerusalem Shall Kings Bring Presents

This verse looks ahead to a temple in Jerusalem.

David himself was never allowed to build that temple.

It pictures foreign kings someday bringing gifts there.

Those kings would honor Israel's God from outside the nation.

That is a striking claim for a small, often threatened kingdom.

This confidence rests entirely on who God is, not Israel's strength.

🏛️ Looks ahead to a future temple in Jerusalem

👑 Foreign kings are pictured bringing gifts

🌍 Honor is expected to come from outside Israel

📖 The confidence rests on God, not Israel's strength

## 🗡️ Rebuke The Company Of Spearmen

The company of spearmen pictures armed enemy forces.

The multitude of the bulls pictures something else entirely.

Animal imagery like this often stood for hostile nations and rulers.

That was a common poetic device in this era.

Scatter thou the people that delight in war states the request plainly.

God is asked to break the power of nations that love fighting.

🗡️ Spearmen pictures armed enemy forces

🐂 Bulls and calves likely picture hostile nations

🕊️ The prayer asks God to stop violent nations

📖 Bold imagery carries a simple request

## 🌍 Princes Shall Come Out Of Egypt

Egypt and Ethiopia represent distant, powerful nations.

Both sat far outside Israel's own borders.

Stretch out her hands is an old picture of surrender.

It is sometimes also used as a picture of prayer.

This verse pictures those nations eventually turning to Israel's God.

The hope in this psalm now reaches every nation, not just Israel.

🗺️ Egypt and Ethiopia represent distant nations

🙌 Stretch out her hands pictures submission

🌍 Even outside nations are pictured turning to God

📖 This hope reaches beyond Israel's borders

# Psalms 68:32-35
# 🎶 Sing Unto God, Ye Kingdoms Of The Earth
---
## 🌍 Sing Unto God, Ye Kingdoms Of The Earth

This is the widest call in the entire psalm.

It is addressed to every kingdom on earth.

It is not addressed to Israel alone.

Selah appears once more here.

It marks another pause right before the psalm's final verses.

This invitation matches the hope already pictured back in verse thirty one.

🌍 This call goes out to every kingdom

⏸️ Selah marks one more pause here

🔁 It matches the hope from verse thirty one

📖 The psalm's scope widens to the whole world

## ☁️ To Him That Rideth Upon The Heavens Of Heavens

Heavens of heavens is a Hebrew way of naming the farthest sky.

Repeating the word heavens stacks it for emphasis.

Which were of old reminds the reader God existed before it all.

He doth send out his voice pictures thunder as God's own speech.

It is not a random weather event.

One voice ties creation itself back to this whole psalm.

☁️ Heavens of heavens means the highest sky

⏳ Of old means God existed before it all

⚡ Thunder pictures God's own mighty voice

📖 One voice behind creation and every victory

## 🏷️ Ascribe Ye Strength Unto God

Ascribe means formally crediting something to its rightful source.

It is more than simple admiration.

David commands the reader to credit strength to God specifically.

Not to luck, and not to human effort.

His excellency is over Israel places that strength over God's people first.

His strength is in the clouds extends that same power over the sky.

🏷️ Ascribe means formally crediting the source

💪 Strength is credited to God, not luck

🇮🇱 His excellency covers Israel directly

📖 His power extends over the whole sky

## 😮 O God, Thou Art Terrible Out Of Thy Holy Places

Terrible here means awe inspiring and fearsome.

It is not frightening in a bad sense.

Thy holy places points back to the sanctuary from earlier.

This whole psalm has been marching toward that sanctuary since verse one.

The last line circles back to where the psalm started.

God rose up to scatter enemies in the opening verse.

Now that same God gives strength to His own people.

😮 Terrible here means awe inspiring, not scary

🏛️ Holy places recalls the sanctuary from the start

🔁 The ending circles back to the opening line

📖 The same God who scatters also strengthens
`.trim();

export const PSALMS_SIXTY_EIGHT_PERSONAL_SECTIONS = parsePsalmsSixtyEightRawNotes(PSALMS_SIXTY_EIGHT_RAW_NOTES);
