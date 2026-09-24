export type IsaiahFiftyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFiftyFiveRawNotes(rawText: string): IsaiahFiftyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFiftyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+55:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 55 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+55:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+55:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 55 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 55,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 55:${startVerse}` : `Isaiah 55:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 55 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FIFTY_FIVE_RAW_NOTES = `# Isaiah 55:1-3
# 🌊 Come, Buy, And Eat
---
## Ho, Every One That Thirsteth, Come Ye To The Waters

Thirst here means a deep hunger for something only God can supply.

Ho was a loud public call meant to stop a crowd in its tracks.

Water in this culture was priceless, never taken for granted.

God invites the thirsty to come exactly as they are.

🌊 Thirst pictures spiritual hunger, not only dryness

📢 Ho was a loud attention getting call

💧 Water was treated as priceless, never wasted

📖 God invites the thirsty just as they are

## Buy Wine And Milk Without Money And Without Price

Buying normally requires payment of some kind.

This purchase requires none at all.

Wine and milk stood for the richest food a table could offer.

The invitation is to receive freely, not to earn a discount.

💰 Buying without payment sounds like a contradiction

🍷 Wine and milk meant the richest food

🎁 The offer is a free gift

📖 Grace cannot be purchased, only received

## Wherefore Do Ye Spend Money For That Which Is Not Bread

The question is not really about grocery budgets.

It asks why people chase things that never truly satisfy.

Money and labor spent on empty pursuits leave a person hungrier, not fuller.

God is naming a pattern most people recognize once it is pointed out.

❓ The question exposes a wasted pursuit

🍞 Bread here stands for real satisfaction

😔 Empty pursuits leave people hungrier, not fuller

📖 God names a pattern people already know

## Let Your Soul Delight Itself In Fatness

Fatness in this culture described the richest, best part of a meal.

It was the opposite of a thin, meager portion.

Delight means more than simple enjoyment.

It describes complete satisfaction, the kind that leaves nothing wanting.

🍖 Fatness meant the richest part of a meal

📉 It was the opposite of a meager portion

😋 Delight means far more than mild enjoyment

📖 God offers complete, not partial, satisfaction

## Hear, And Your Soul Shall Live

Hearing here means more than catching the sound of words.

It means actually responding to what is said.

Soul shall live points to a restored relationship with God, not only survival.

Listening well is presented as the doorway into that life.

👂 Hearing here means responding, not just sound

❤️ Soul shall live means restored relationship with God

🚪 Listening is the doorway into that life

📖 Real hearing changes what happens next

## The Sure Mercies Of David

This phrase points back to the covenant God made with King David.

God had promised David a lasting throne and a lasting line.

Sure means guaranteed, not fragile or conditional on Israel's behavior.

Centuries later, Peter and Paul both point to this exact promise about Jesus.

👑 This recalls God's covenant with King David

🏛️ God promised David a lasting throne

🔒 Sure means guaranteed, not fragile

📖 The New Testament ties this promise to Jesus

# Isaiah 55:4-5
# 📯 A Witness To The Nations
---
## I Have Given Him For A Witness To The People

Him points back to the promise just made through David's line.

A witness testifies to something true, even when no one asks.

This role is bigger than one king ruling one nation.

It describes someone whose whole life testifies to God before a watching world.

👉 Him points to the promised line of David

📢 A witness testifies to what is true

🌍 This role reaches beyond one single nation

📖 A life can testify without saying a word

## A Leader And Commander To The People

Leader describes someone others willingly choose to follow.

Commander describes someone with real, recognized authority.

Both words describe the same coming figure from two different angles.

Together they picture someone who leads by both trust and authority.

🧭 Leader means someone others willingly follow

🎖️ Commander means someone with real authority

🔄 Both words describe one coming figure

📖 True leadership carries both trust and authority

## Thou Shalt Call A Nation That Thou Knowest Not

Israel is told it will one day call out to a nation it has never met.

That nation is not part of Israel's own family or history.

This looks forward to people outside Israel joining God's promises.

The invitation was never meant to stay inside one bloodline.

🌐 Israel calls a nation it has never met

👥 That nation stands outside Israel's own family

🚪 Outsiders are invited into God's promises here

📖 The invitation never stayed inside one bloodline

## Nations That Knew Not Thee Shall Run Unto Thee

Run unto thee pictures eager movement, not a slow, reluctant walk.

These are nations that had no prior relationship with Israel at all.

Their reason for coming is named directly in the next line, the LORD their God.

God draws people who never knew Him in the first place.

🏃 Run unto thee pictures eager movement

🤝 These nations had no prior relationship

✨ Their reason for coming is named directly

📖 God draws people who never knew Him

## For He Hath Glorified Thee

Glorified means God has publicly honored Israel before watching nations.

This reverses the shame Israel carried during the exile years.

The honor comes from God, not from Israel's own effort.

Watching nations notice when God chooses to lift someone up.

✨ Glorified means publicly honored by God

🔄 This reverses the shame of exile

🙏 The honor comes from God, not effort

📖 Nations notice when God lifts someone up

# Isaiah 55:6-9
# 🕰️ Seek Ye The LORD
---
## Seek Ye The LORD While He May Be Found

This phrase assumes there is a window, not an endless, unlimited offer.

Near describes closeness, the opposite of a distant, unreachable God.

The urgency in this line is intentional, not accidental phrasing.

Waiting too long to respond is treated as a real risk here.

⏳ This assumes a window, not endless time

🤏 Near means close, not distant or unreachable

⚡ The urgency here is intentional, not accidental

📖 Waiting too long is a real risk

## Let The Wicked Forsake His Way

Forsake means to leave something behind completely, not just feel bad about it.

Way describes a whole pattern of living, not one single bad choice.

Thoughts get named right alongside actions in the next phrase.

Real repentance changes direction, not just emotion.

🚶 Forsake means leaving something behind completely

🛤️ Way means a whole pattern of living

🧠 Thoughts are named alongside actions here

📖 Repentance changes direction, not just feeling

## He Will Abundantly Pardon

Pardon means the offense is fully released, not just overlooked.

Abundantly describes the size of that pardon as generous, not grudging.

This promise follows directly after naming the wicked and the unrighteous.

God is not shown reluctantly forgiving here, He is shown forgiving freely.

✍️ Pardon means the offense is fully released

🌊 Abundantly means generous, not grudging

👤 This follows naming the wicked directly

📖 God forgives freely here, not reluctantly

## My Thoughts Are Not Your Thoughts

This line answers a question readers have about the pardon just promised.

Human forgiveness usually comes slow and comes with conditions attached.

God explains His forgiveness works on a completely different scale.

The gap between the two is the whole point of this verse.

🧠 This answers an unspoken question about pardon

🐌 Human forgiveness is often slow, with conditions

🌌 God's forgiveness works on a different scale

📖 That gap is the whole point here

## As The Heavens Are Higher Than The Earth

This picture measures a gap no one on earth could ever close.

Heavens and earth were the two most distant points people could imagine.

The same gap describes the difference between God's ways and human ways.

It is not an insult, it is an honest description of scale.

🌌 Heavens and earth were the most distant points

📏 This pictures a gap no one can close

🔀 The gap describes God's ways versus human ways

📖 This is honest scale, not an insult

# Isaiah 55:10-13
# 🌾 So Shall My Word Be
---
## As The Rain Cometh Down, And The Snow From Heaven

Rain and snow were completely outside human control in this culture.

Farmers depended entirely on that timing to grow anything at all.

This picture sets up a comparison that continues into the next verse.

God is about to compare His own word to this exact process.

🌧️ Rain and snow were outside human control

🌾 Farmers depended entirely on that timing

🔗 This picture sets up the next verse

📖 God compares His word to this process

## It Shall Not Return Unto Me Void

Void here means empty, having accomplished nothing at all.

God's word is described the same way rain and snow were, never wasted.

Every word from God is aimed at a purpose before it is even spoken.

This is one of the most quoted promises in the entire book of Isaiah.

🚫 Void means empty, accomplishing nothing

🌧️ God's word is compared to rain, never wasted

🎯 Every word is aimed at a purpose

📖 This is one of Isaiah's most quoted promises

## It Shall Accomplish That Which I Please

Accomplish means the goal actually gets finished, not merely attempted.

This removes any doubt about whether God's plans can fail.

Please here describes God's own will, not a passing mood.

What God intends, God completes.

✅ Accomplish means the goal actually finishes

🚫 This removes doubt about failure

🎯 Please here means God's own will

📖 What God intends, God completes

## Ye Shall Go Out With Joy, And Be Led Forth With Peace

Go out recalls the exodus from Egypt generations earlier.

This time the exit comes with joy instead of urgency and fear.

Led forth pictures God guiding the way, not people finding it alone.

Peace here means safety, not just a quiet feeling.

🚶 Go out recalls the exodus from Egypt

😊 This exit comes with joy, not fear

🧭 Led forth pictures God guiding the way

📖 Peace here means safety, not just calm

## The Mountains And The Hills Shall Break Forth Before You Into Singing

Mountains and hills are pictured as living things that can sing.

This is poetry, not a claim that rocks grow vocal cords.

Creation itself is pictured celebrating what God is doing for His people.

The whole landscape responds to good news.

⛰️ Mountains and hills are pictured as singing

🎭 This is poetry, not a literal claim

🌍 Creation is pictured celebrating with God's people

📖 The whole landscape responds to good news

## All The Trees Of The Field Shall Clap Their Hands

Trees clapping continues the same poetic picture from the line before.

Clapping is a human gesture of celebration, given to trees here.

The image stretches ordinary language to capture overwhelming joy.

Even creation cannot stay silent about what God has done.

🌳 Trees clapping continues the poetic picture

👏 Clapping is a human gesture given to trees

🎉 The image captures overwhelming joy

📖 Even creation cannot stay silent here

## Instead Of The Thorn Shall Come Up The Fir Tree

Thorns and briers were common signs of a cursed, neglected land.

Fir trees stood for something valuable, useful for building and lasting.

This pictures a complete reversal of the land itself, not just the people.

Cursed ground and cursed history are both being undone here.

🌵 Thorns marked a cursed, neglected land

🌲 Fir trees stood for something valuable and lasting

🔄 This pictures the land itself reversed

📖 Cursed ground and cursed history are undone

## Instead Of The Brier Shall Come Up The Myrtle Tree

Briers were another sign of thorny, wild, neglected ground.

Myrtle was a fragrant, evergreen shrub used for celebration and beauty.

This second reversal echoes the first, thorn to fir, brier to myrtle.

Even the smallest, most tangled plants get remade in this promise.

🌿 Briers marked thorny, neglected ground

🌸 Myrtle was fragrant, used for celebration

🔁 This echoes the thorn to fir reversal

📖 Even tangled, small plants get remade here

## It Shall Be To The LORD For A Name, For An Everlasting Sign

A sign in this culture served as permanent, visible proof of something true.

Name here means reputation, the way God will be known going forward.

Everlasting means this proof was never meant to fade or be forgotten.

The chapter that opened with an invitation ends with a permanent monument.

🪧 A sign was permanent, visible proof

🏷️ Name here means God's lasting reputation

♾️ Everlasting means this proof never fades

📖 An invitation ends in a permanent monument
`.trim();

export const ISAIAH_FIFTY_FIVE_PERSONAL_SECTIONS = parseIsaiahFiftyFiveRawNotes(ISAIAH_FIFTY_FIVE_RAW_NOTES);
