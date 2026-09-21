export type EcclesiastesNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEcclesiastesNineRawNotes(rawText: string): EcclesiastesNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EcclesiastesNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ecclesiastes\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ecclesiastes 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ecclesiastes\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Ecclesiastes\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ecclesiastes 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ecclesiastes 9:${startVerse}` : `Ecclesiastes 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ecclesiastes 9 sections, received " + sections.length);
  }

  return sections;
}

const ECCLESIASTES_NINE_RAW_NOTES = `# Ecclesiastes 9:1-3
# ⚖️ One Event Happens To All
---
## 🤲 The Righteous, And The Wise, And Their Works, Are In The Hand Of God

Every righteous and wise person still lives entirely inside God's control.

"In the hand of God" means their days and their outcomes are held by Him.

This is not a small detail tucked into the sentence.

It is the frame for everything the Preacher says next in this chapter.

🤲 Hand of God means His full control

👤 Applies to the righteous and the wise

📋 Their works are held by Him too

📖 This frames the whole chapter

## ❓ No Man Knoweth Either Love Or Hatred

This does not mean people cannot love or feel anger.

It means no one can tell from a person's life whether God loves or hates them.

A life full of blessing does not prove God's favor.

A life full of hardship does not prove His anger either.

❓ Not about human feelings

🔍 Circumstances do not reveal God's favor

🌧️ Hardship does not prove His anger

📖 Life does not sort people that way

## ⚱️ There Is One Event To The Righteous, And To The Wicked

"One event" here means death, the appointment every person eventually keeps.

Ecclesiastes uses this phrase again and again throughout the whole book.

The righteous person and the wicked person both walk toward the exact same end.

This is the very problem the Preacher wrestles with here.

⚱️ One event means death itself

🔁 A phrase repeated across this book

⚖️ Righteous and wicked share the same end

📖 This is the Preacher's real struggle here

## 🕍 To Him That Sacrificeth, And To Him That Sacrificeth Not

This line groups people by religious practice, not by character.

One person offers sacrifices faithfully at the temple.

Another skips that practice entirely.

Death does not sort between them by that measure either.

🕍 Sacrificing means formal temple worship

🙅 Skipping it does not change the outcome

⚖️ Religious practice does not sort this fate

📖 Death treats both the same way

## 😇 As Is The Good, So Is The Sinner

This adds a second pair to the comparison already started.

The first pair, in verse two, compared people by religious practice.

This pair compares people by their actual moral choices.

Even that difference does not change what verse two already said.

😇 A second comparison, this time moral

🕍 Verse two compared religious practice

🧭 This one compares actual choices

📖 The ending still stays the same

## 🤝 He That Sweareth, As He That Feareth An Oath

This is the last pair in the Preacher's list.

One person swears oaths boldly and without much thought.

Another person avoids oaths, afraid of ever breaking one.

Boldness and caution about a vow still lead to the same door.

🤝 Swearing means making a bold vow

😟 Fearing an oath means avoiding one

⚖️ Both attitudes reach the same end

📖 Caution offers no special exit

## 😈 The Heart Of The Sons Of Men Is Full Of Evil

Knowing death is coming should sober a person.

The Preacher says the opposite often happens instead.

"Madness" here means reckless, foolish living, not literal insanity.

People often fill their short years with evil instead of facing that truth.

The verse ends with a blunt reminder, after that they go to the dead.

😔 Awareness of death should bring wisdom

😈 Many respond with evil instead

🌀 Madness means reckless, foolish living

📖 The reminder of death closes the verse

# Ecclesiastes 9:4-6
# 🐕 A Living Dog Is Better Than A Dead Lion
---
## 🌱 To Him That Is Joined To All The Living There Is Hope

"Joined to the living" simply means still alive, however humble that life looks.

Hope here is not about wealth or comfort or success.

It is simply the possibility that comes from still being alive at all.

The next line makes that point vivid with a sharp comparison.

🌱 Joined to the living means still alive

🌤️ Hope here is simple possibility

🚫 Not about wealth or comfort

📖 Life itself is the real point

## 🐕 A Living Dog Is Better Than A Dead Lion

Dogs in this culture were not kept as pets.

They were seen as low, unclean scavengers.

Lions were seen as noble, powerful animals, almost royal.

Even so, the lowly living dog beats the majestic dead lion here.

Life still beats death, no matter how humble or impressive each one looks.

🐕 Dogs were seen as low and unclean

🦁 Lions were seen as noble and powerful

🌱 Being alive still wins the comparison

📖 Humble life beats impressive death

## 🧠 For The Living Know That They Shall Die

Being alive comes with a clear, sobering awareness.

Every living person knows their own death is coming eventually.

That knowledge itself is something only the living actually have.

The next line contrasts this sharply with the dead.

🧠 Awareness of death belongs to the living

⏳ Every living person expects this end

👁️ Only the living carry this knowledge

📖 The next line contrasts sharply

## ⚰️ But The Dead Know Not Any Thing, Neither Have They Any More A Reward

The Preacher speaks here from a strictly earthly point of view.

"Under the sun" describes life as it can be observed on earth.

From that vantage point, the dead have no further part in earthly wages or activity.

This is not a full statement about the afterlife.

It describes what can be seen and measured from where the living stand.

☀️ Under the sun means life on earth

🚫 No more earthly reward is possible

👁️ This is what can be observed

📖 It is not a full afterlife claim

## 🕯️ For The Memory Of Them Is Forgotten

Most people assume they will be remembered for a long time.

The Preacher says the opposite happens far more often.

Memory of most lives simply fades once those who knew them are gone too.

This is one of the harder, more honest observations in the whole book.

🧠 People assume they will be remembered

⏳ Memory usually fades instead

👥 It fades with those who knew them

📖 This is an honest, hard observation

## ❤️ Also Their Love, And Their Hatred, And Their Envy, Is Now Perished

This lists three strong emotions together on purpose, love, hatred, and envy.

All three defined a person's daily life while they lived.

Once death comes, from this earthly viewpoint, all three simply end.

The rest of the verse repeats this same point one final time.

❤️ Love, hatred, and envy end together

🔥 These once defined daily life

⏳ Death ends all three at once

📖 No more share in earthly life remains

# Ecclesiastes 9:7-10
# 🍞 Eat Thy Bread With Joy
---
## 🍞 Eat Thy Bread With Joy, And Drink Thy Wine With A Merry Heart

After a long, hard list of unfair realities, the Preacher pivots here.

He points toward ordinary meals as a real, legitimate joy.

"Bread" and "wine" stand for daily food and drink in general.

This is not an invitation to reckless indulgence.

It is a call to notice and enjoy the meals already in front of a person.

🍞 Bread and wine mean daily food and drink

😊 Ordinary meals are named a real joy

🚫 This is not reckless indulgence

📖 Notice and enjoy what is already there

## 🙏 For God Now Accepteth Thy Works

This does not mean God recently changed His mind about a person.

It means God already approves of simple, honest enjoyment of life.

Ordinary contentment is not something to feel guilty about.

The Preacher treats it as a legitimate, God approved response to a hard world.

🙏 God already approves ordinary enjoyment

🚫 This is not a sudden change of mind

😊 Contentment needs no guilt attached

📖 Enjoyment can be a right response

## 🤍 Let Thy Garments Be Always White

White clothing in this culture marked a celebration, not mourning.

Mourners in ancient Israel wore rough, dark clothing instead.

Telling someone to stay in white clothing means stay in a festive mindset.

Daily life is pictured here as a small, ongoing feast.

🤍 White clothing marked celebration

⚫ Mourners wore rough, dark clothing instead

🎉 Staying in white means staying festive

📖 Ordinary life is pictured as a feast

## 🫗 Let Thy Head Lack No Ointment

Anointing the head with oil was another mark of celebration in this culture.

People in mourning stopped using oil on their hair and skin entirely.

This second image repeats the same idea from a different angle.

Do not let ordinary life slide into a constant, quiet mourning.

🫗 Oil on the head marked celebration

😔 Mourning meant stopping that practice

🔁 This repeats the white garments image

📖 Do not live in constant mourning

## 💍 Live Joyfully With The Wife Whom Thou Lovest

Marriage gets named here as one of life's real, God given gifts.

"Joyfully" is the specific word chosen, not simply "faithfully" or "dutifully."

The Preacher recommends genuine enjoyment, not just obligation.

This fits the pattern already set by the food, clothing, and oil.

💍 Marriage is named as a real gift

😊 Joyfully is the specific word chosen

🚫 Not just duty, but real enjoyment

📖 This matches the pattern already set

## 💨 All The Days Of The Life Of Thy Vanity

"Vanity" is this book's repeated word for something fleeting and hard to hold onto.

Life itself is being described honestly as short and fleeting.

That honesty does not cancel the instruction to enjoy it.

If anything, the shortness is exactly why enjoying it now matters.

💨 Vanity means fleeting, hard to hold

⏳ Life is described honestly as short

😊 That does not cancel real enjoyment

📖 Shortness is a reason to enjoy it now

## 🎁 For That Is Thy Portion In This Life, And In Thy Labour

"Portion" means a person's actual assigned share, not everything they might want.

Ordinary joy in marriage and work is named as that real share.

This is not a consolation prize for missing something bigger.

The Preacher calls it a genuine portion, worth receiving fully.

🎁 Portion means an assigned, real share

💍 Joy in marriage counts as that share

💪 So does honest, daily labor

📖 This is a genuine gift, not a consolation

## 💪 Whatsoever Thy Hand Findeth To Do, Do It With Thy Might

This is a call to full, wholehearted effort in ordinary daily tasks.

"Thy might" means everything a person actually has to give.

Half hearted effort is not what this verse describes.

The next line explains exactly why this urgency matters.

💪 Thy might means full, honest effort

🚫 Not half hearted or careless work

🎯 Applies to whatever task is at hand

📖 The next line explains the urgency

## ⚰️ There Is No Work, Nor Device, Nor Knowledge, Nor Wisdom, In The Grave

This piles up four different words on purpose, work, device, knowledge, wisdom.

Each one describes a different kind of human activity or ability.

All four end, from this earthly view, the moment a person reaches the grave.

That is exactly why this life is the place to use them.

⚰️ Four abilities are listed together

🛠️ Work, device, knowledge, and wisdom

🚫 None continue past the grave

📖 This life is the place to use them

# Ecclesiastes 9:11-12
# ⏱️ Time And Chance Happeneth To Them All
---
## 🏃 The Race Is Not To The Swift, Nor The Battle To The Strong

This returns to a plain, honest observation about how the world often works.

Being fast does not guarantee winning a race.

Being strong does not guarantee winning a fight.

Outcomes do not always match ability the way people expect.

🏃 Speed does not guarantee winning

💪 Strength does not guarantee victory

❓ Ability and outcome do not always match

📖 The world does not always match effort

## 🍞 Neither Yet Bread To The Wise, Nor Yet Riches To Men Of Understanding

The Preacher stacks three more examples onto the same pattern.

Being wise does not guarantee having enough food.

Being smart does not guarantee wealth.

Being skilled does not guarantee anyone's favor.

Talent and outcome simply do not always line up.

🍞 Wisdom does not guarantee food

💰 Understanding does not guarantee riches

🎯 Skill does not guarantee favor

📖 Talent and outcome often do not match

## 🎲 But Time And Chance Happeneth To Them All

"Time and chance" means unpredictable circumstance, not blind random luck.

Every person, talented or not, lives inside events they cannot fully control.

This is the real reason skill alone cannot guarantee an outcome.

The Preacher names this honestly instead of pretending talent always wins.

🎲 Time and chance means unpredictable circumstance

🌍 Everyone lives inside events they cannot control

🧠 This is why skill alone is not enough

📖 The Preacher names this honestly

## ⏳ For Man Also Knoweth Not His Time

This turns from general unfairness to something deeply personal.

No one knows the exact moment their own life will end.

That uncertainty is part of what makes this section feel unsettling.

The next line pictures that uncertainty with two sharp images.

⏳ No one knows their own ending time

😟 This uncertainty feels deeply personal

🖼️ The next line pictures it sharply

📖 Uncertainty applies to every single person

## 🐟 As The Fishes That Are Taken In An Evil Net, And As The Birds That Are Caught In The Snare

A net catches fish without any warning at all.

A snare catches birds the exact same sudden way.

Both pictures share one thing, the capture happens all at once.

"An evil net" simply means a trap built to harm, not a literal moral evil.

🐟 Fish are caught in a net suddenly

🐦 Birds are caught in a snare suddenly

⚡ Both pictures share sudden capture

📖 Evil here just means harmful, not moral

## 🪤 So Are The Sons Of Men Snared In An Evil Time

The two animal pictures now apply directly to people.

Disaster or death often arrives without any warning at all.

No amount of wisdom or planning removes this basic risk completely.

This verse closes the section on a note of honest caution.

🪤 Animal images now apply to people

⚡ Disaster often arrives without warning

🧠 Wisdom cannot remove this risk completely

📖 The section closes with honest caution

# Ecclesiastes 9:13-16
# 👑 The Poor Wise Man
---
## ⭐ This Wisdom Have I Seen Also Under The Sun

The Preacher introduces a specific memory, not a general idea this time.

"It seemed great unto me" signals this story genuinely impressed him.

What follows is a real case study, not just a proverb.

👁️ The Preacher introduces a real memory

⭐ It seemed great means it impressed him

🔍 A case study follows, not just a saying

➡️ The next verses tell the story

## 🏘️ There Was A Little City, And Few Men Within It

The setting is small and vulnerable on purpose.

A "little city" with "few men" could not field a strong defense.

This detail sets up just how unlikely the coming rescue will be.

Size matters to the whole point of the story.

🏘️ A small, weak city sets the scene

🛡️ Few men means little defense

🎯 This makes the coming rescue unlikely

📖 Size matters to the whole story

## 👑 There Came A Great King Against It, And Besieged It

A powerful army now surrounds this small, defenseless city.

"Besieged" means surrounding a place to cut off supplies and force surrender.

"Bulwarks" were ramps and siege works built to break through a city's walls.

The odds against this little city could not look worse.

👑 A great king now surrounds the city

🚧 Besieged means cut off and surrounded

🧱 Bulwarks means siege works built to attack

📖 The odds look impossibly bad

## 👤 Now There Was Found In It A Poor Wise Man

Against those odds, one unlikely person turns the whole story around.

He is described first by his poverty, then by his wisdom.

"Delivered" means he saved the city from the king's attack.

Wisdom, not weapons or wealth, is what actually rescued this place.

👤 A poor wise man appears unexpectedly

🧠 He is named poor first, then wise

🛡️ He delivered means he saved the city

📖 Wisdom rescued the city, not weapons

## 😕 Yet No Man Remembered That Same Poor Man

This is the sharp, unfair turn in the story.

The man who saved everyone is simply forgotten afterward.

His poverty made him easy for people to overlook once the danger passed.

The Preacher lets this injustice sit without softening it.

😕 The rescuer is quickly forgotten

💰 His poverty made him easy to overlook

⚠️ The Preacher does not soften this unfairness

📖 Gratitude did not match what he did

## 🧠 Then Said I, Wisdom Is Better Than Strength

The Preacher now states his own conclusion plainly.

This little story proved that wisdom accomplished what an army's strength could not.

A poor man's mind saved a city that great bulwarks were built to conquer.

That comparison is the whole point of telling this story at all.

🧠 Wisdom is declared better than strength

🏙️ One mind saved what an army threatened

👑 The comparison is the whole point

📖 A quiet lesson from a small city

## 👎 Nevertheless The Poor Man's Wisdom Is Despised

Despite everything he did, people still looked down on this poor man.

"Despised" means treated as worthless or beneath notice.

His words carried real wisdom, yet people ignored them anyway.

Status too often outweighs substance in how people actually listen.

👎 Despised means treated as worthless

🗣️ His true words went unheard

💰 Status outweighed what he actually said

📖 People often judge wisdom by status

# Ecclesiastes 9:17-18
# 🤫 Quiet Wisdom Outlasts Loud Folly
---
## 🤫 The Words Of Wise Men Are Heard In Quiet

Wisdom is pictured here as calm, unhurried speech.

It does not need volume or force to carry weight.

A wise word spoken quietly can still change everything.

This sets up a direct contrast in the very next phrase.

🤫 Wisdom is pictured as calm speech

🧠 It carries weight without volume

🔁 A contrast follows right after

📖 Quiet words can still change everything

## 📢 More Than The Cry Of Him That Ruleth Among Fools

This contrasts quiet wisdom with a loud, foolish ruler.

"Cry" here pictures shouting, the kind of leadership that leans on volume instead of sense.

Loud authority often sounds impressive in the moment.

The Preacher says it still carries less real weight than quiet wisdom.

📢 Cry means loud, forceful shouting

👑 A foolish ruler leans on volume

🎭 Loud authority can sound impressive

📖 Quiet wisdom still outweighs it

## ⚔️ Wisdom Is Better Than Weapons Of War

This line calls back directly to the poor wise man's story.

His wisdom alone accomplished what the king's siege equipment could not.

Weapons can force an outcome for a moment.

Wisdom can solve a problem at its root instead.

🧠 This recalls the poor wise man's story

⚔️ Weapons force outcomes for a moment

🌱 Wisdom solves problems at the root

📖 The chapter's whole lesson lands here

## 💥 But One Sinner Destroyeth Much Good

The chapter ends with a sobering warning, not a victory lap.

It takes real wisdom to build something valuable over time.

It takes only one careless or wicked person to tear much of it down.

This final line keeps the whole chapter honest to the end.

⚠️ The ending is a warning, not a victory

🏗️ Wisdom builds slowly over time

💥 One sinner can destroy much of it

📖 Honesty carries through to the final line
`.trim();

export const ECCLESIASTES_NINE_PERSONAL_SECTIONS = parseEcclesiastesNineRawNotes(ECCLESIASTES_NINE_RAW_NOTES);
