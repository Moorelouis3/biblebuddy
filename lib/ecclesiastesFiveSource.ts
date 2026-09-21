export type EcclesiastesFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEcclesiastesFiveRawNotes(rawText: string): EcclesiastesFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EcclesiastesFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ecclesiastes\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ecclesiastes 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ecclesiastes\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Ecclesiastes\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ecclesiastes 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ecclesiastes 5:${startVerse}` : `Ecclesiastes 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ecclesiastes 5 sections, received " + sections.length);
  }

  return sections;
}

const ECCLESIASTES_FIVE_RAW_NOTES = `# Ecclesiastes 5:1-3
# 🚶 Keep Thy Foot And Let Thy Words Be Few
---
## 🚶 Keep Thy Foot When Thou Goest To The House Of God

This does not mean the priests worried about someone stubbing a toe.

"Keep thy foot" is an old idiom for watching your conduct closely.

In Solomon's day, the house of God meant the temple in Jerusalem.

Worshippers were expected to enter with careful, humble attention.

The Preacher wants reverence to start before a single word is spoken.

🚶 Keep thy foot means watch your conduct
🏛️ The house of God was the temple
🙏 Reverence begins before you speak
📖 Worship starts with careful attention

## 👂 More Ready To Hear Than To Give The Sacrifice Of Fools

This compares two very different ways of approaching God in worship.

Listening is placed above offering a sacrifice without real understanding.

The sacrifice of fools means going through religious motions without real thought.

Fools here are not unintelligent people, they are careless with God.

The Preacher ranks a listening heart above an empty ritual.

👂 Hearing outranks offering without thought
🐑 Sacrifice of fools means careless ritual
🧠 Fools means careless, not unintelligent
📖 A listening heart beats empty ritual

## ⏳ Let Not Thine Heart Be Hasty To Utter Any Thing Before God

"Hasty" means rushing into words without thinking first.

The heart here refers to a person's inner intentions, not just emotions.

Prayer in the ancient world was often spoken quickly and carelessly.

The Preacher tells worshippers to slow down before they speak to God.

A rushed prayer treats God like an ordinary conversation partner.

⏳ Hasty means rushing into words
❤️ Heart means a person's true intentions
🐢 Ancient prayers were often rushed
📖 Slow down before speaking to God

## ☁️ God Is In Heaven, And Thou Upon Earth

This line pictures two completely different positions.

God rules from heaven, high above every human situation.

A person stands on ordinary ground, limited and small by comparison.

That distance is the reason to choose words carefully in prayer.

☁️ God rules from heaven above
🌍 A person stands on ordinary ground
📏 The distance calls for careful words
📖 Careless prayer forgets who it addresses

## 🤏 Therefore Let Thy Words Be Few

This is the Preacher's whole point compressed into five words.

Fewer words are not about being silent out of fear.

They come from remembering how big God actually is.

A short honest prayer can carry more weight than a long one.

🤏 Fewer words compressed into one line
😨 Not fear, but proper perspective
⚖️ Comes from remembering God's size
📖 Short honest prayer beats a long one

## 💤 For A Dream Cometh Through The Multitude Of Business

This proverb compares two similar patterns of excess.

Restless dreams often come from a mind overloaded with work and worry.

The ancient world already noticed this same connection between stress and sleep.

The Preacher uses this observation to set up a bigger point about words.

💤 Dreams often come from an overloaded mind
😰 Overwork and worry disturb the mind
🕰️ Ancient people noticed this pattern too
📖 It sets up a point about words

## 🗣️ A Fool's Voice Is Known By Multitude Of Words

A fool here is identified by a simple pattern, not intelligence.

Talking too much is treated as a warning sign in this proverb.

Many words often mean little real thought behind them.

The Preacher just finished warning about rushing into speech before God.

🗣️ Too many words is the warning sign
🧠 Not about intelligence, about restraint
📉 Many words often carry little thought
📖 Ties back to rushing into speech

# Ecclesiastes 5:4-7
# 🙏 Pay What Thou Hast Vowed
---
## 🙏 When Thou Vowest A Vow Unto God, Defer Not To Pay It

A vow in ancient Israel was a voluntary promise made directly to God.

It was not commanded, someone chose to make it freely.

"Defer" means to put something off or delay it.

Once a vow was spoken, waiting to keep it was treated seriously.

A promise made freely still carried real weight once spoken aloud.

🙏 A vow was a freely made promise
🕊️ Never commanded, only chosen
⏳ Defer means putting something off
📖 A free promise still carries weight

## 🙅 For He Hath No Pleasure In Fools

A fool in this verse means someone who vows without meaning to follow through.

God is not pleased by empty promises made for show.

This connects directly back to the fool's many words from verse three.

Words spoken carelessly toward God carry consequences, not just intentions.

🙅 A fool here means an empty promiser
😐 God is not pleased by show
🔗 Connects to the earlier fool's words
📖 Careless words toward God carry weight

## ⚖️ Better Is It That Thou Shouldest Not Vow, Than That Thou Shouldest Vow And Not Pay

This offers a direct comparison between two choices.

Making no promise at all is safer than breaking one you did make.

The problem was never vowing itself, it was failing to follow through.

Silence carries less risk than a broken promise to God.

⚖️ Compares two real choices directly
🤐 No vow is safer than a broken one
❌ The failure is not keeping it
📖 Silence risks less than a broken vow

## 👄 Suffer Not Thy Mouth To Cause Thy Flesh To Sin

This pictures careless words leading a person into real trouble.

"Suffer" here means to allow or let something happen.

A mouth that makes reckless promises can drag the whole person into sin.

The Preacher treats speech as something with real physical consequences.

👄 Suffer means to allow something
🔗 Careless words can lead to real sin
🚫 Speech is treated as consequential
📖 Words and actions are connected

## 👼 Neither Say Thou Before The Angel, That It Was An Error

The angel here likely refers to a temple priest or messenger of God.

This person's job in ancient Israel was to record and collect vows.

Claiming a broken vow was just a mistake did not excuse it.

God still asks why He should be provoked over careless words.

👼 The angel likely means a temple priest
📜 Priests recorded and collected vows
🙅 Calling it a mistake was no excuse
📖 God still asks why He was provoked

## 💭 In The Multitude Of Dreams And Many Words There Are Also Divers Vanities

"Divers vanities" means many different empty, meaningless things.

Both excessive dreaming and excessive talking are grouped together here.

This word vanity has run through the entire book of Ecclesiastes so far.

More words and more dreams do not add up to more wisdom.

💭 Divers vanities means many empty things
🗯️ Excess talk and excess dreaming are linked
🔁 Vanity is the book's ongoing theme
📖 More words do not equal more wisdom

## 🙏 But Fear Thou God

After several warnings, the Preacher lands on one simple command.

"Fear" here means deep reverence and respect, not being afraid.

All this talk about vows and words is really about how a person treats God.

Reverence is the antidote to the careless speech described so far.

🙏 One simple command after warnings
😌 Fear means reverence, not fright
🎯 The real subject is how we treat God
📖 Reverence answers all the careless speech

# Ecclesiastes 5:8-9
# ⚖️ Oppression And The King's Field
---
## ⚖️ The Oppression Of The Poor, And Violent Perverting Of Judgment And Justice

"Perverting" means twisting something so it no longer works correctly.

Judgment and justice describe the legal system meant to protect people.

A province here refers to a local district under a ruling official.

The Preacher assumes this kind of corruption is common, not rare.

⚖️ Perverting means twisting something crooked
🏛️ Judgment and justice mean the legal system
🗺️ A province means a local district
📖 The Preacher expects this corruption to happen

## 😮 Marvel Not At The Matter: For He That Is Higher Than The Highest Regardeth

This does not mean the reader should ignore injustice completely.

"Marvel not" means do not be shocked or thrown off balance by it.

Officials answered to higher officials, who answered to the king himself.

The Preacher points past every human authority to God, who is highest of all.

😮 Marvel not means do not be shocked
🏢 Officials answered to higher officials
👑 The king stood above every official
📖 God stands above every human authority

## 🌾 The Profit Of The Earth Is For All

This states a basic economic reality about ancient farming.

The whole community depended on the same land and its harvest.

No one, no matter how powerful, could separate themselves entirely from the soil.

Even a king's wealth traced back to fields worked by ordinary people.

🌾 States a basic farming reality
🌍 The whole community depended on the land
👑 Even the powerful depended on soil
📖 A king's wealth traced back to fields

## 👑 The King Himself Is Served By The Field

Even the highest person in the land needed food from the ground.

A king could not eat gold or command a harvest into existence.

This levels every social class down to the same basic dependence.

The field does not care who is sitting on the throne.

👑 Even a king needed food from soil
🌽 Gold cannot replace an actual harvest
⚖️ Levels every class to the same need
📖 The field does not care who rules

# Ecclesiastes 5:10-12
# 🪙 The Love Of Silver Never Satisfies
---
## 🪙 He That Loveth Silver Shall Not Be Satisfied With Silver

This describes a craving that grows instead of shrinking.

Silver in the ancient world worked much like money does today.

Loving money creates a hunger that more money cannot actually fill.

The next line pushes this same idea even further.

🪙 Silver worked like money in that world
📈 Wanting money grows instead of shrinking
🕳️ More money cannot fill this hunger
📖 Sets up an even bigger warning

## 📦 Nor He That Loveth Abundance With Increase: This Is Also Vanity

"Abundance" means having a large surplus, more than enough.

"Increase" means the growth added on top of what someone already has.

Wanting more surplus works exactly the same broken way as wanting silver.

The Preacher calls this whole cycle vanity, using his favorite word again.

📦 Abundance means a large surplus
📊 Increase means growth added on top
🔁 Works the same broken way as silver
📖 Called vanity, the book's favorite word

## 📈 When Goods Increase, They Are Increased That Eat Them

This points out a practical side effect of growing wealth.

More property in the ancient world usually meant more servants and dependents.

A bigger household meant more people needing to be fed and managed.

Wealth quietly multiplies its own demands along with its size.

📈 More wealth meant more dependents
🏠 A bigger household needed more care
🍽️ More people needed feeding too
📖 Wealth multiplies its own demands

## ❓ What Good Is There To The Owners Thereof, Saving The Beholding Of Them With Their Eyes

This asks a real, sharp question about the point of it all.

"Saving the beholding" means all that is left is looking at it.

The actual owner often gets less enjoyment than the people managing his estate.

Watching your own wealth from a distance is a strange kind of poverty.

❓ Asks a sharp, real question
👀 Beholding means only looking at it
😶 The owner enjoys less than expected
📖 Watching wealth is its own poverty

## 😴 The Sleep Of A Labouring Man Is Sweet, Whether He Eat Little Or Much

A person who works with their hands sleeps well at night.

This is true whether that worker has a little food or plenty of it.

Physical labor and a simple life produce genuine, restful sleep.

The next line reveals exactly who does not get this same rest.

😴 A working person sleeps well
🍞 True with little or plenty of food
💪 Labor produces genuine, restful sleep
📖 Sets up a sharp contrast next

## 🚫 But The Abundance Of The Rich Will Not Suffer Him To Sleep

"Suffer" here means allow, the same way it was used earlier in the chapter.

A wealthy person's mind stays busy managing and protecting all that he owns.

More possessions can mean more worry, not more peace.

The laborer with little sleeps easier than the rich man guarding much.

🚫 Suffer means allow, as used earlier
🧠 A busy mind guards every possession
😟 More possessions can mean more worry
📖 The poor sleep easier than the rich

# Ecclesiastes 5:13-17
# 💰 Riches Kept To Their Hurt
---
## 😣 There Is A Sore Evil Which I Have Seen Under The Sun

"Sore evil" means a painful, serious problem, not a minor annoyance.

The Preacher says he witnessed this personally, not just heard about it.

"Under the sun" is his repeated phrase for ordinary, everyday life.

He is about to describe a genuine tragedy, not a small complaint.

😣 Sore evil means a serious problem
👀 The Preacher saw this personally
☀️ Under the sun means everyday life
📖 A real tragedy is coming next

## 💰 Riches Kept For The Owners Thereof To Their Hurt

This describes wealth that ends up harming the very person who saved it.

Hoarding money can create anxiety, greed, or bad decisions over time.

The tragedy is not having money, it is what holding onto it can do.

The story that follows shows exactly how this plays out.

💰 Wealth that ends up causing harm
😰 Hoarding can create anxiety and greed
⚠️ The problem is what holding it does
📖 A story proves the point next

## 💥 But Those Riches Perish By Evil Travail

"Perish" means to be completely lost or destroyed.

"Evil travail" points back to hard, painful labor gone wrong somehow.

A bad investment, disaster, or misfortune wipes out everything that was saved.

All the earlier hoarding accomplished nothing in the end.

💥 Perish means completely lost
😖 Evil travail means painful labor gone wrong
📉 A disaster wipes out the savings
📖 All that hoarding accomplished nothing

## 👶 And He Begetteth A Son, And There Is Nothing In His Hand

A son is born right as the family fortune disappears.

The timing makes the loss feel even more painful.

An heir was expected to receive something to carry forward.

This son inherits nothing but an empty hand.

👶 A son is born at the worst time
😔 The timing makes the loss sting more
🎁 An heir was expected to receive something
📖 He inherits nothing but an empty hand

## 🔄 As He Came Forth Of His Mother's Womb, Naked Shall He Return To Go As He Came

This pictures the exact same condition at birth and at death.

A person enters the world with nothing and eventually leaves with nothing.

All the wealth gathered in between never actually becomes truly theirs to keep.

Ancient burial customs still could not change this basic, stripped down truth.

👶 Same condition at birth and death
🔄 Enter with nothing, leave with nothing
💼 Wealth gathered between never stays theirs
📖 Burial customs cannot change this truth

## ✋ And Shall Take Nothing Of His Labour, Which He May Carry Away In His Hand

Every hour of work still cannot buy passage into the next life.

Nothing earned on earth transfers into the hand of someone who has died.

This directly answers the earlier question about what people actually gain from labor.

The gap between working hard and taking anything with you is total.

⏳ Work cannot buy passage past death
✋ Nothing transfers into a dead man's hand
❓ Answers the chapter's question about labor
📖 The gap is total, not partial

## 🔁 And This Also Is A Sore Evil, That In All Points As He Came, So Shall He Go

The Preacher repeats his phrase sore evil to underline how serious this is.

The full circle from nothing to something back to nothing feels like a trap.

This is not a punishment for bad choices, it happens to everyone equally.

Wealth cannot break this pattern no matter how much of it is gathered.

🔁 Repeats sore evil for emphasis
⭕ A full circle back to nothing
⚖️ Happens equally, not as punishment
📖 Wealth cannot break this pattern

## 💨 And What Profit Hath He That Hath Laboured For The Wind

"Laboured for the wind" means working hard for something impossible to hold onto.

Wind cannot be gripped, stored, or carried away no matter how hard someone tries.

This callback connects straight back to the book's opening chasing after wind.

All that effort produced nothing that could actually be kept.

💨 Laboured for the wind means chasing air
🤲 Wind cannot be gripped or stored
🔗 Echoes the book's opening chapter
📖 The effort kept nothing in the end

## 🌑 All His Days Also He Eateth In Darkness, And He Hath Much Sorrow And Wrath With His Sickness

"Eateth in darkness" pictures a life clouded by constant gloom.

This is not necessarily about literal darkness at every meal.

Worry over lost wealth can follow a person into sickness and old age.

Sorrow and anger become permanent companions instead of occasional visitors.

🌑 Eateth in darkness means constant gloom
🍽️ Not literal darkness at every meal
🤒 Worry follows into sickness and old age
📖 Sorrow becomes a permanent companion

# Ecclesiastes 5:18-20
# 🍽️ Eat, Drink, And Enjoy Thy Labour
---
## 🔄 Behold That Which I Have Seen: It Is Good And Comely For One To Eat And To Drink

After describing real tragedies, the Preacher now offers his actual conclusion.

"Comely" means fitting or appropriate, the right way to live.

Simple enjoyment of food and drink is not sinful indulgence here.

This is the same conclusion the Preacher has reached several times already.

🔄 Turns from tragedy to conclusion
✅ Comely means fitting and appropriate
🍞 Simple enjoyment is not sinful here
📖 A conclusion repeated throughout the book

## 😊 Enjoy The Good Of All His Labour That He Taketh Under The Sun

This tells a worker to actually notice and enjoy their own effort.

Many people work their whole life without ever stopping to enjoy it.

"Under the sun" again marks this as ordinary, everyday life, not heaven.

The enjoyment is meant to happen now, not only in some future reward.

😊 Notice and enjoy your own effort
🏃 Many work without ever enjoying it
☀️ Under the sun means ordinary life
📖 Enjoyment happens now, not just later

## 🍽️ For It Is His Portion

"Portion" means the specific share given to a person, not everything that exists.

This is a term the Preacher has used before to describe a limited slice of life.

Accepting your portion means being at peace with what you actually have.

It is a modest goal, and the Preacher presents it as a genuinely good one.

🍽️ Portion means your specific given share
🔁 A term used earlier in the book
😌 Peace comes from accepting your share
📖 A modest goal presented as good

## 🌍 Every Man Also To Whom God Hath Given Riches And Wealth

This verse widens the focus from one worker to everyone with wealth.

Riches and wealth here are described as something given, not something earned alone.

This shifts the credit for prosperity away from human effort alone.

It frames every possession as ultimately coming from somewhere outside yourself.

🌍 Widens focus to everyone with wealth
🎁 Riches described as something given
🔀 Shifts credit away from effort alone
📖 Possessions come from beyond yourself

## 💪 Power To Eat Thereof, And To Rejoice In His Labour

"Power" here means the actual ability to enjoy and use what you have.

Some people gain riches but never gain the capacity to actually enjoy them.

The Preacher treats this ability as separate and just as important as the wealth itself.

Rejoicing in labor means finding real satisfaction in daily work, not just its paycheck.

💪 Power means the ability to enjoy it
😔 Some gain riches but not enjoyment
⚖️ Ability matters as much as wealth
📖 Satisfaction can come from the work itself

## 🎁 This Is The Gift Of God

The gift is not the wealth itself, it is the capacity to enjoy it.

Many people have money and still cannot rest or be satisfied.

Contentment is presented here as something God supplies, not something bought.

This closes the loop on every complaint about riches earlier in the chapter.

🎁 The gift is the ability to enjoy
😌 Contentment is not something bought
🙏 God supplies it, not money
📖 Closes the loop on this chapter's complaints

## 🧠 For He Shall Not Much Remember The Days Of His Life

This does not mean a forgetful or confused old age.

Someone content with their portion does not dwell on regrets from the past.

A person absorbed in daily joy has less room left for bitterness.

Forgetting here is a form of peace, not a form of loss.

🧠 Not about forgetfulness or confusion
😊 Contentment leaves little room for regret
🕊️ Less room left for bitterness
📖 Forgetting here means peace, not loss

## 😊 Because God Answereth Him In The Joy Of His Heart

God's answer to this person shows up as ordinary daily joy.

This is not a dramatic miracle or a sudden windfall of more wealth.

A heart already at peace recognizes that joy as coming from God.

The whole chapter ends exactly where it should, on gratitude instead of grasping.

😊 God's answer shows up as daily joy
🎉 Not a miracle or sudden windfall
❤️ A peaceful heart recognizes it as God's
📖 The chapter ends on gratitude, not grasping
`.trim();

export const ECCLESIASTES_FIVE_PERSONAL_SECTIONS = parseEcclesiastesFiveRawNotes(ECCLESIASTES_FIVE_RAW_NOTES);
