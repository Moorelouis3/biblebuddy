export type IsaiahFortyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFortyRawNotes(rawText: string): IsaiahFortyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFortyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+40:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 40 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+40:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+40:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 40 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 40,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 40:${startVerse}` : `Isaiah 40:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Isaiah 40 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FORTY_RAW_NOTES = `# Isaiah 40:1-2
# 🕊️ Comfort My People
---
## 🕊️ Comfort Ye, Comfort Ye My People

Judgment filled the previous thirty nine chapters of Isaiah.

The command to comfort is given twice in a row for emphasis.

In Hebrew poetry repeating a word doubles its weight and urgency.

God speaks this softly, like a father speaking to a hurting child.

Judgment was never God's last word to his people.

🕊️ Comfort is commanded twice for emphasis

📣 Repetition shows deep emotional weight

👨‍👧 God speaks tenderly, like a father

📖 Judgment was never God's final word

## ⚔️ Her Warfare Is Accomplished

Warfare here does not mean a battle fought with weapons.

It means an appointed time of hard service has come to an end.

Judah served that time in exile under Babylon's power.

Now God says the appointed time is finally over.

Her season of hard discipline had run its full course.

⚔️ Warfare means an appointed hard service

⏳ That appointed time is now complete

🏛️ Judah served it under Babylon's rule

📖 God declares the season officially over

## ⚖️ Double For All Her Sins

This phrase does not mean God punished Judah twice as much as she deserved.

Many scholars believe double here points to a complete, full payment.

Ancient legal language sometimes used double to mean the debt is settled in full.

God is not describing extra punishment.

He is declaring the punishment finished, not doubled in cruelty.

⚖️ Double does not mean extra punishment

📜 Ancient language used it for settled debt

🙏 God is not being cruel here

📖 The punishment is declared complete

# Isaiah 40:3-5
# 🛣️ A Highway For Our God
---
## 📯 The Voice Of Him That Crieth In The Wilderness

The voice belongs to a messenger, not to God himself.

Ancient kings often sent someone ahead to announce their coming.

The Gospels later apply this exact verse to John the Baptist.

John's job was to prepare people's hearts before Jesus arrived.

A king's arrival was always announced before he came.

📯 A messenger cries out in the desert

👑 Kings sent heralds ahead of them

✝️ The Gospels apply this to John

📖 John prepared hearts before Jesus came

## 🛣️ Make Straight In The Desert A Highway

Ancient kings expected roads to be leveled before they traveled them.

Workers cleared rocks and smoothed the path by hand.

This highway language borrows that same picture for God's arrival.

Preparing the way was never really about roads.

It was about making hearts ready for him.

🛣️ Kings had roads leveled before traveling

🪨 Workers cleared rocks and smoothed paths

🖼️ This borrows an image for God's coming

📖 The real preparation is in the heart

## ⛰️ Every Valley Shall Be Exalted, Every Mountain Made Low

Valleys being lifted up and mountains brought low is a picture, not literal engineering.

It means every obstacle blocking God's people gets removed.

High things that stand in pride get humbled.

Low, hopeless places get lifted up instead.

God levels whatever stands between his people and their future.

⛰️ Mountains being low pictures pride humbled

🕳️ Valleys being raised pictures hope restored

🚧 Every obstacle in the way gets cleared

📖 God levels the road to his people

## 🌀 The Crooked Shall Be Made Straight, And Rough Places Plain

Crooked roads and rough ground made ancient travel slow and dangerous.

This continues the same image of a way prepared for a king.

Crooked things being made straight pictures things being set right, not just repaired roads.

Rough places becoming plain pictures difficulty turning into ease.

Nothing about the coming of God stays complicated for long.

🌀 Crooked paths pictured things set right

🪨 Rough ground pictured hard things eased

🚶 Ancient travel over bad roads was dangerous

📖 Nothing stays complicated once God arrives

## ✨ The Glory Of The LORD Shall Be Revealed

Glory here means God's own visible weight and presence made known.

Until now that presence stayed mostly hidden inside Israel's own history.

This promises a moment the whole world can see, not just Israel.

God's glory was never meant to stay hidden forever.

✨ Glory means God's visible presence revealed

🙈 That presence had stayed mostly hidden

🌍 This moment includes the whole world

📖 God's glory was never meant to hide

## 🌐 All Flesh Shall See It Together

All flesh means every human being, not one favored group.

Together points to a shared moment, not scattered private visions.

This promise reaches beyond Israel to every nation on earth.

God's plan of comfort was always bigger than one people.

🌐 All flesh means every human being

🤝 Together means one shared, visible moment

🌎 This reaches every nation, not just Israel

📖 God's comfort was always meant for everyone

# Isaiah 40:6-8
# 🌿 All Flesh Is Grass
---
## 🙋 What Shall I Cry?

The voice tells the prophet to cry out, and he pauses to ask what.

This question shows even a prophet needs to know exactly what to say.

God does not leave him guessing for long.

The answer coming next explains human life itself in one image.

🗣️ The prophet pauses to ask what

🙋 Even prophets need clear instructions

⏳ God answers without long delay

📖 The answer explains all human life

## 🌾 All Flesh Is Grass

Flesh here means every human life, however strong it looks.

Grass grows fast in the Israeli spring after the rains.

Within weeks the same field turns brown and dry.

Human strength and beauty fade with that same speed.

No human life lasts as long as it feels like it will.

🌱 Flesh means human life, however strong

🌾 Grass in Israel grows fast, then dies

⏱️ Human strength fades just as quickly

📖 No life lasts as long as it feels

## 🌬️ The Spirit Of The LORD Bloweth Upon It

Israel's hot desert wind can dry out a green field within a single day.

That wind, called the sirocco, blows in from the desert.

The spirit of the LORD here pictures that same drying breath.

Human life fades the moment God simply breathes on it.

Real power belongs to the one doing the blowing, not the grass.

🌬️ A desert wind can dry a field fast

🏜️ This hot wind is called a sirocco

💨 God's breath pictures that same power

📖 Real power belongs to God, not us

## ♾️ The Word Of Our God Shall Stand For Ever

Grass and flowers die within weeks no matter how they looked at first.

God's own word never fades or breaks down over time.

Everything human is temporary, including strength, beauty, and empires.

Only God's promises are built to outlast everything else.

🌾 Grass and flowers fade within weeks

📜 God's word never fades or breaks

👑 Even empires are temporary like grass

📖 Only God's promises last forever

# Isaiah 40:9-11
# 👑 Behold Your God
---
## 📣 O Zion, That Bringest Good Tidings

Good tidings means great news worth shouting out loud.

Zion is not just a city here.

Zion is pictured as the messenger carrying the news herself.

The people who received the message now get to deliver it.

Comfort was never meant to stay private.

📣 Good tidings means news worth shouting

🏙️ Zion is pictured as a messenger

🎁 Those comforted become the ones announcing

📖 Comfort was never meant to stay private

## ⛰️ Get Thee Up Into The High Mountain

Messengers in the ancient world often climbed a hill to be seen and heard.

A voice carried further from higher ground, before microphones or amplifiers existed.

Standing high also made the messenger visible to everyone below.

This news was too important to whisper from low ground.

⛰️ Messengers climbed hills to be heard

📢 Height helped a voice carry further

👀 Standing high made the herald visible

📖 This news was too big to whisper

## 🎯 Behold Your God!

This is the climax of the whole announcement.

After chapters of judgment, the message finally points straight at God himself.

Not a plan, not a promise on paper, but God, present and visible.

Every road built and every voice raised was leading to this one moment.

🎯 This line is the announcement's climax

👁️ It points straight at God himself

🛣️ Every earlier verse led to this

📖 Comfort ends in seeing God himself

## 📛 The Lord GOD Will Come With Strong Hand

Lord here translates Adonai, a title meaning sovereign master.

GOD in capitals stands for God's own personal name, YHWH.

Putting both titles together doubles the weight of this announcement.

Strong hand pictures the same kind of power God showed at the exodus.

This is not a distant, hands off arrival.

📛 Lord here means sovereign master

✡️ GOD in capitals is God's own name, YHWH

💪 Strong hand recalls the exodus power

📖 This is an active, not distant arrival

## 🎁 His Reward Is With Him, His Work Before Him

Reward here means what God brings for his faithful people.

Work before him means the results of his actions are already in motion.

He does not arrive empty handed.

God's coming always carries something for the people he loves.

🎁 Reward means what God brings his people

🚧 Work before him means results already moving

👐 He never arrives empty handed

📖 God's coming always carries something for us

## 🐑 He Shall Feed His Flock Like A Shepherd

Verse ten pictures a mighty ruler arriving with power.

Verse eleven suddenly pictures the same God as a gentle shepherd.

Both pictures describe the same person, not two different gods.

Strength and gentleness are not opposites in God's character.

👑 One verse shows a mighty ruler

🐑 The next shows a gentle shepherd

🔄 Both describe the very same God

📖 Strength and gentleness both belong to him

## 🤱 Shall Gently Lead Those That Are With Young

A real shepherd slowed his pace for pregnant or nursing animals.

Pushing them too fast could hurt the animal or its young.

This picture shows God adjusting his pace for the weak, not the strong.

God leads his people at a speed they can actually keep.

🐑 Shepherds slowed down for weaker animals

🤱 This pictures God caring for the weak

🚶 He adjusts his pace, not just theirs

📖 God matches his pace to our need

# Isaiah 40:12-14
# ⚖️ Who Measured The Waters
---
## ✋ Measured The Waters In The Hollow Of His Hand

The hollow of the hand is the small cupped space in your palm.

No ocean on earth could ever fit inside a human hand.

This pictures God holding all the world's waters in something that small to him.

What looks endless to us fits easily in God's grip.

✋ Hollow of the hand means a cupped palm

🌊 No ocean fits in a human hand

🤲 This pictures God's grip over all water

📖 To God the endless ocean is small

## 📏 Meted Out Heaven With The Span

A span was the ancient distance across one spread out hand.

That distance was about the width of a single hand.

God is pictured measuring the entire sky with something that small.

The vastness of the universe is nothing next to his size.

📏 A span was the width of one hand

🌌 God is shown measuring the whole sky

🤏 The image makes the sky sound small

📖 The universe is nothing next to God

## ⚖️ Weighed The Mountains In Scales, The Hills In A Balance

A balance was a double pan scale used in the ancient world.

Merchants used it to weigh out grain, silver, or spices.

This verse pictures God placing entire mountains on a scale that small.

Nothing in creation is too heavy for God to measure.

⚖️ A balance was a double pan scale

🌾 Merchants weighed goods with a balance

⛰️ God is shown weighing whole mountains

📖 Nothing in creation is too heavy for him

## 🧠 Who Hath Directed The Spirit Of The LORD, Or Being His Counsellor Hath Taught Him?

These two verses ask the same question twice in different words.

Hebrew poetry often repeats one idea like this for emphasis, not new information.

A counsellor was someone a king consulted before making a decision.

God has never needed anyone to advise him.

🔁 These verses repeat one idea twice

👑 A counsellor was an advisor to kings

🧠 No one has ever advised God

📖 Human rulers need help, unlike God

# Isaiah 40:15-17
# 🌊 Nations As A Drop
---
## 💧 The Nations Are As A Drop Of A Bucket

A drop of a bucket is one drip left clinging to its side.

That drop barely counts as part of the water at all.

This pictures every nation on earth as just as small before God.

The most powerful empires are that tiny drip to him.

💧 A drop is barely part of the water

🌍 Every nation is pictured as that small

👑 Even powerful empires count as tiny to God

📖 Nothing human looks large from God's view

## 🏝️ He Taketh Up The Isles As A Very Little Thing

Isles here does not mean only small islands in the ocean.

The word points to distant coastlands and far off nations.

God is pictured lifting up whole distant regions like a light object.

Distance from Israel never meant distance from God's power.

🏝️ Isles means distant coastlands and nations

🤲 God lifts whole regions like nothing heavy

🌐 This includes places far from Israel

📖 Distance never limits God's reach

## 🌲 Lebanon Is Not Sufficient To Burn

Lebanon was famous across the ancient world for its huge cedar forests.

It was also known for its wildlife, useful for animal offerings.

This verse imagines using every tree and every animal from Lebanon in one sacrifice.

Even that enormous offering could not properly honor God's greatness.

🌲 Lebanon was famous for its cedar forests

🦌 It was also known for its wildlife

🔥 The verse pictures the largest possible offering

📖 Even that offering could not honor God enough

## 💨 Counted To Him Less Than Nothing, And Vanity

Vanity here translates a Hebrew word meaning breath or vapor.

It describes something that looks solid but has no real weight.

Nations that seem powerful are, to God, that same kind of empty.

Human power without God behind it never lasts.

💨 Vanity means breath or empty vapor

🏛️ Nations can look solid but be empty

👑 Even great power can be that hollow

📖 Power without God never truly lasts

# Isaiah 40:18-20
# 🗿 The Graven Image
---
## ❓ To Whom Then Will Ye Liken God?

This question has no real answer, and that is the point.

Nothing in creation compares closely enough to stand next to God.

The next few verses answer with the silliest comparison possible, an idol.

The question exposes how absurd idol worship really is.

❓ This question has no true answer

🚫 Nothing in creation compares to God

🗿 The next verses mock idol worship

📖 Idols expose how absurd comparison is

## 🔥 The Workman Melteth A Graven Image

A graven image is an idol carved or shaped by human hands.

A workman melted metal and a goldsmith covered the shape in gold.

Silver chains were added to decorate the finished statue.

Every part of this god was made by hired human hands.

🗿 A graven image is a carved idol

🔥 A workman melted and shaped the metal

✨ A goldsmith covered it in gold

📖 Human hands made this god completely

## 🔨 He Seeketh A Cunning Workman To Prepare A Graven Image

Oblation here means an offering someone could bring to God.

A poor man too poor for a costly offering instead built himself a god.

Cunning meant highly skilled, not sneaky or dishonest, in this old usage.

Even the cheapest idol still needed wood that would not rot.

A god that has to be nailed down cannot be much of a god.

🙏 Oblation was an offering to God

🪵 Even a poor man's idol needed skill

🔨 Cunning meant skilled, not sneaky, here

📖 A god nailed in place is no god

# Isaiah 40:21-24
# 🌍 Circle Of The Earth
---
## ❓ Have Ye Not Known? Have Ye Not Heard?

These four questions in a row are not really asking for information.

They are meant to embarrass Israel for forgetting what they already knew.

From the beginning and foundations of the earth both point back to creation itself.

Creation itself had already been teaching them who God was.

❓ Four questions in a row build force

😳 They are meant to embarrass forgetful Israel

🌎 Both phrases point back to creation

📖 Creation itself already taught them the truth

## 🌅 Sitteth Upon The Circle Of The Earth

This phrase is not an ancient science claim about the shape of the planet.

Circle here likely pictures the horizon, the ring you see around you outdoors.

God is pictured sitting enthroned above that whole visible horizon.

From that height, entire nations look as small as grasshoppers.

Human beings and their empires shrink fast from God's seat.

🌅 Circle likely pictures the visible horizon

👑 God is pictured enthroned above it

🦗 Nations look as small as grasshoppers

📖 Everything human shrinks from God's height

## ⛺ Stretcheth Out The Heavens As A Curtain

Curtain and tent both describe the same kind of fabric shelter.

Nomadic families like Abraham's lived in tents stretched tight with poles and cords.

This pictures God setting up the sky the way a family pitches a tent.

The same God who shelters a family also shelters the whole sky.

⛺ Curtain and tent describe the same shelter

🏕️ Nomads like Abraham lived in tents

🌌 God is pictured pitching the sky itself

📖 The God who shelters families shelters the sky

## 👑 Bringeth The Princes To Nothing

Princes and judges here mean the most powerful rulers on earth.

This is the same vanity from verse seventeen applied directly to kings.

No throne, however strong it looks, is safe from this truth.

God has always outranked every ruler who ever lived.

👑 Princes means the most powerful rulers

🔁 This repeats verse seventeen's vanity theme

🪑 No throne is safe from this truth

📖 God outranks every ruler who ever lived

## 🌾 He Shall Blow Upon Them, And They Shall Wither

Stubble is the dry, leftover stalks left standing after a harvest.

A strong wind can carry stubble away in seconds.

Rulers who seem permanently planted can vanish just as fast.

This is the same grass and wind picture from earlier, now aimed at kings.

🌾 Stubble is dry stalks left after harvest

💨 Wind carries stubble away in seconds

👑 Rulers can vanish just as fast

📖 The grass image now targets kings

# Isaiah 40:25-26
# ⭐ Lift Up Your Eyes
---
## 🔁 To Whom Then Will Ye Liken Me? Saith The Holy One

This is the same question from verse eighteen, asked again.

This time God asks it himself, in the first person.

Holy One is a title that means completely set apart, with nothing else like it.

The question that started as a warning now becomes God's own voice.

🔁 This repeats the question from verse eighteen

🗣️ God now asks it in his own voice

✨ Holy One means completely set apart

📖 The warning becomes God's own declaration

## ⭐ Bringeth Out Their Host By Number

Host was a word ancient people also used for an army.

Many ancient cultures worshipped the stars as gods with power over human life.

This verse pictures God simply counting the stars out like soldiers he commands.

The stars other nations bowed down to were just God's own creation.

⭐ Host is a word that also means army

🙇 Many ancient people worshipped the stars

🔢 God is shown counting stars like soldiers

📖 The stars were only God's creation

## 🏷️ He Calleth Them All By Names

Naming something in the ancient world showed ownership and personal knowledge.

God does not just create the stars.

He knows each one of them by name.

Not one of them out of that whole number is ever missing.

A God who tracks every star by name forgets no person either.

🏷️ Naming showed ownership in the ancient world

✨ God knows each star individually by name

🔢 Not one of them is ever missing

📖 A God who tracks stars forgets no person

# Isaiah 40:27-29
# 💪 He Giveth Power To The Faint
---
## 👥 My Way Is Hid From The LORD

Jacob and Israel are both names for the same nation here, said twice for emphasis.

The exiles felt certain God had stopped noticing their suffering.

This complaint sounds a lot like feeling forgotten by God today.

God is about to answer that exact fear directly.

👥 Jacob and Israel both name the nation

😔 The exiles felt forgotten by God

💭 This complaint still sounds familiar today

📖 God is about to answer this fear

## ♾️ The Everlasting God Fainteth Not, Neither Is Weary

Everlasting means God has no beginning and will have no end.

Fainteth means to grow physically exhausted or collapse.

Unlike every human ruler and every human helper, God never runs out of strength.

The one Israel thought had forgotten them cannot even grow tired.

♾️ Everlasting means no beginning or end

😮‍💨 Fainteth means to grow exhausted

💪 God never runs out of strength

📖 The one they thought forgot them cannot tire

## 🧠 There Is No Searching Of His Understanding

This means human minds cannot fully measure how God thinks.

His silence during hard seasons is not the same thing as his absence.

Some of what God does will always stay beyond full human explanation.

Not understanding God's timing is not the same as being forgotten by him.

🧠 No mind can fully measure God's thoughts

🤫 Silence is not the same as absence

❓ Some things stay beyond human explanation

📖 Not understanding is not being forgotten

## 😩 He Giveth Power To The Faint

Faint here means completely worn out, with nothing left to give.

God does not just comfort tired people with kind words.

He actually supplies fresh strength to people who have none left.

This sets up the promise about to come in the next two verses.

😩 Faint means completely worn out

🎁 God supplies real strength, not just words

🔋 He gives strength to those with none

📖 This promise leads into the next verses

# Isaiah 40:30-31
# 🦅 Wings As Eagles
---
## 💪 Even The Youths Shall Faint, And The Young Men Shall Utterly Fall

Youths and young men picture people at their physical peak.

Even people at their strongest eventually run out of energy.

This verse sets up a sharp contrast with what comes next.

Human strength always has a ceiling, no matter how young or fit.

💪 Youths pictured people at their peak

😮‍💨 Even peak strength eventually runs out

🔄 This sets up a sharp contrast

📖 Human strength always has a ceiling

## ⏳ But They That Wait Upon The LORD

Wait here does not mean sitting around doing nothing.

The Hebrew word pictures hope twisted together tightly, like a strong rope.

It describes active trust in God, not passive boredom.

This waiting is a decision to keep leaning on God, not giving up.

⏳ Wait does not mean doing nothing

🪢 The word pictures hope twisted like rope

🙏 It means active trust, not boredom

📖 Waiting means leaning on God, not quitting

## 🦅 They Shall Mount Up With Wings As Eagles

Eagles do not flap constantly to stay in the sky.

They ride rising columns of warm air called thermals.

An eagle riding a thermal looks effortless from the ground.

Renewed strength from God can feel that same kind of effortless.

🦅 Eagles ride warm air called thermals

🌬️ They rarely need to flap at all

👀 Their flight looks effortless from below

📖 God's strength can feel just as effortless

## 🚶 They Shall Run, And Not Be Weary, And Shall Walk, And Not Faint

Real life with God rarely feels like nonstop soaring.

This promise moves from flying, to running, to ordinary walking.

Most of life is the walking part, one ordinary step after another.

God's strength holds up in the mountaintop moments and the ordinary ones.

🦅 The promise moves from flight to walking

🚶 Most of life is the walking part

🐾 Ordinary days need strength just as much

📖 God's strength covers both extremes and ordinary days
`.trim();

export const ISAIAH_FORTY_PERSONAL_SECTIONS = parseIsaiahFortyRawNotes(ISAIAH_FORTY_RAW_NOTES);
