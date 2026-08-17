export type ProverbsEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsEightRawNotes(rawText: string): ProverbsEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 8:${startVerse}` : `Proverbs 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Proverbs 8 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_EIGHT_RAW_NOTES = `# Proverbs 8:1-3
# 📢 Wisdom Cries Out In Public
---
## 🌅 Doth Not Wisdom Cry

This opens with a question that expects the answer yes.

Wisdom is pictured here as a woman speaking loudly in public.

Chapter seven closed with a very different woman working in secret and shadow.

Wisdom does the exact opposite, calling out where everyone can hear.

🌅 The question expects the answer yes

👩 Wisdom is pictured as a woman

🌑 Chapter seven's danger worked in secret

📖 Wisdom calls out in the open

---

## 🗣️ Understanding Put Forth Her Voice

Understanding here stands beside wisdom as a second figure given a voice.

Hebrew poetry often pairs two closely related words to strengthen one idea.

Put forth her voice means speaking loudly and on purpose, not whispering.

Both figures are shown speaking in the clearest possible way.

🗣️ Understanding is also given a voice

🔁 Hebrew poetry often pairs related words

📢 Put forth her voice means speaking loudly

📖 Both figures speak as clearly as possible

---

## 🏔️ In The Top Of High Places

High places in this culture were the most visible, most traveled spots in a town.

Standing there meant everyone passing by could see and hear.

The phrase can also carry echoes of hilltop worship sites in the ancient world.

Wisdom claims the most public possible platform to speak from.

🏔️ High places were the most visible spots

👀 Everyone passing by could see and hear

⛰️ The phrase can echo hilltop worship sites

📖 Wisdom claims the most public platform

---

## 🛤️ By The Way In The Places Of The Paths

This names the exact spot where multiple roads crossed.

A crossroads was the busiest possible location in an ancient town.

Wisdom does not wait to be found, she stations herself where traffic already flows.

No one could claim they simply never had the chance to hear her.

🛤️ This names a crossroads location

🚶 Crossroads were the busiest spot in town

📍 Wisdom stations herself where people already go

📖 No one can claim they never heard her

---

## 🚪 At The Gates, At The Entry Of The City

The city gate was the ancient world's courtroom, marketplace, and news center.

Legal cases were settled there and elders sat there to judge disputes.

Placing wisdom's voice at the gate ties her call to real decisions, not idle talk.

This is where the most important choices of daily life were made.

🚪 The gate was the ancient courtroom

⚖️ Elders judged disputes there

🏪 It also worked as the marketplace

📖 Wisdom speaks where real decisions happen

---

## 🏙️ At The Coming In At The Doors

This repeats the gate image once more using a different word.

Repetition here builds a wall of sound around the whole city entrance.

No matter which door or gate a person used, wisdom's voice was already there.

The point is total coverage, not a single lucky encounter.

🔁 This repeats the gate image again

🚪 It builds sound around every entrance

🏙️ No door in the city missed her voice

📖 The point is total coverage, not luck

# Proverbs 8:4-9
# 🗣️ Wisdom Calls To Everyone
---
## 📣 Unto You, O Men, I Call

Wisdom addresses her call directly rather than sending a messenger.

The word for men here can carry the sense of people with strength or standing.

She is not offering advice from a distance, she is calling straight at the listener.

This direct address matches the direct address a father uses through the whole book.

📣 Wisdom calls directly, not through a messenger

💪 Men here can mean people of standing

🎯 She calls straight at the listener

📖 This matches the book's direct address style

---

## 👥 My Voice Is To The Sons Of Man

Sons of man is simply an old way of saying humanity in general.

Pairing men and sons of man widens the call from one group to everyone.

No social class or background is left outside her invitation.

Wisdom's audience in this chapter is the whole human race.

👥 Sons of man means humanity in general

🌍 The call widens to include everyone

🚫 No class is left outside the invitation

📖 Her audience is the whole human race

---

## 🙈 O Ye Simple, Understand Wisdom

Simple again means untrained and easily led, not stupid.

This exact word already described the young man in chapter seven's story.

Wisdom is now offering the very training that could have saved him.

The invitation arrives before the danger this time, not after.

🙈 Simple means untrained, not stupid

🔁 The word matches chapter seven's young man

🎓 Wisdom now offers the training he lacked

📖 The invitation comes before the danger

---

## 🙅 Ye Fools, Be Ye Of An Understanding Heart

A fool in Proverbs rejects wisdom on purpose, not someone who lacks intelligence.

This is a strong word, naming a settled attitude rather than a single mistake.

Even a fool is invited here to change course and gain an understanding heart.

The call is wide enough to include the very people most likely to ignore it.

🙅 A fool rejects wisdom on purpose

⚠️ Fool names an attitude, not one mistake

🔄 Even a fool is invited to change

📖 The call reaches those likely to ignore it

---

## 💎 I Will Speak Of Excellent Things

Excellent here means things of real weight and worth, not merely pleasant sounding words.

Wisdom promises substance, not the empty flattery chapter seven's woman offered.

The contrast between these two speakers grows sharper with every line.

One voice traps with pleasant words, the other teaches with valuable ones.

💎 Excellent means real weight and worth

🚫 This is substance, not flattery

🎭 Chapter seven's woman offered empty words instead

📖 One voice traps, the other teaches

---

## 👄 The Opening Of My Lips Shall Be Right Things

Right things means straightforward and honest, without any hidden angle.

Opening of my lips simply pictures the moment speech begins.

Wisdom promises this honesty before she even says a single specific word.

Everything that follows in this chapter is framed by that promise.

✅ Right things means honest, no hidden angle

👄 Opening of my lips pictures speech beginning

🤝 The promise comes before any words follow

📖 It frames everything said after this

---

## ✅ My Mouth Shall Speak Truth

Truth here stands in direct contrast to the flattering speech of chapter seven.

That earlier speech was crafted to deceive, however pleasant it sounded.

Wisdom's speech carries no gap between what is said and what is real.

This is a deliberate echo meant to be noticed by an attentive reader.

✅ Truth contrasts chapter seven's flattery

🎭 That speech was crafted to deceive

🪞 Wisdom's words match reality exactly

📖 The echo is meant to be noticed

---

## 🤢 Wickedness Is An Abomination To My Lips

Abomination is strong language, describing something that causes deep disgust.

Wisdom is not neutral toward evil speech, she actively rejects it.

This kind of strong language usually describes forbidden worship practices elsewhere in the Bible.

Using it here shows how seriously false speech is treated.

🤢 Abomination means deep disgust

🚫 Wisdom actively rejects wicked speech

📜 This word usually describes forbidden worship

📖 False speech is treated just as seriously

---

## ⚖️ All The Words Of My Mouth Are In Righteousness

Righteousness describes speech that fully matches what is right and true.

This is not a claim of being mostly honest, it covers all of her words.

Total consistency is exactly what chapter seven's speaker never had.

Nothing wisdom says needs to be checked against a hidden motive.

⚖️ Righteousness means matching what is right

💯 This claim covers all of her words

🎭 Chapter seven's speaker had no such consistency

📖 Nothing here hides a motive

---

## 🌀 Nothing Froward Or Perverse In Them

Froward means willfully crooked, twisting away from what is straight.

Perverse means bent or twisted out of its proper shape.

Both words describe speech built on purpose to mislead the listener.

Wisdom rules both kinds of dishonesty completely out of her own words.

🌀 Froward means willfully crooked

🔀 Perverse means bent out of shape

🎭 Both describe speech built to mislead

📖 Wisdom rules both out completely

---

## 🔍 Plain To Him That Understandeth

Plain here means clear and easy to follow, not hidden in riddles.

Wisdom is not reserved for an elite few who can crack a secret code.

Anyone willing to understand can follow exactly what she is saying.

Access to wisdom depends on willingness, not on special training.

🔍 Plain means clear, not hidden in riddles

🚫 This is not reserved for an elite few

🙋 Anyone willing to understand can follow it

📖 Access depends on willingness, not training

---

## ✅ Right To Them That Find Knowledge

Right here means correct and fitting, matching exactly what is needed.

Finding knowledge pictures an active search, not a passive wait.

The verse closes this section on the same note it opened, plain and honest speech.

Wisdom rewards the person who actually goes looking for her.

✅ Right means correct and fitting

🔍 Finding knowledge pictures an active search

🔁 This closes the section as it opened

📖 Wisdom rewards those who go looking

# Proverbs 8:10-11
# 💍 Better Than Rubies
---
## 💰 Receive My Instruction, And Not Silver

This is not a literal command to reject money outright.

It is a comparison, ranking instruction above silver in real value.

Ancient readers understood silver as a standard measure of practical wealth.

Wisdom claims a worth that outranks the most obvious kind of riches.

💰 Silver was a standard measure of wealth

⚖️ This ranks instruction above it, not against silver

🚫 Not a literal command to reject silver

📖 Wisdom outranks the most obvious riches

---

## 🥇 Knowledge Rather Than Choice Gold

Choice gold means the finest, most refined gold available.

Naming the very best kind of gold raises the comparison even higher.

Even the top tier of wealth still falls short of real knowledge.

The comparison keeps growing stronger verse by verse in this section.

🥇 Choice gold means the finest gold available

📈 Naming the best kind raises the comparison

🏆 Even top tier wealth falls short here

📖 The comparison keeps growing stronger

---

## 💎 Wisdom Is Better Than Rubies

Rubies here likely names a rare and costly gem, though scholars debate the exact stone.

Whatever the specific stone, the point is rarity and high price.

This phrase repeats almost exactly from Proverbs 3:15, reinforcing a theme already taught.

Real value gets restated here so the reader cannot miss it.

💎 Rubies likely names a rare costly gem

❓ Scholars debate the exact stone meant

🔁 This phrase repeats Proverbs 3:15 closely

📖 The theme is restated so it lands

---

## 🌍 All The Things That May Be Desired

This phrase widens the comparison to include everything a person could want.

No single item is left out of this ranking.

Wisdom is placed above every possible object of human desire.

Nothing on the list can compete with what wisdom actually offers.

🌍 This widens the list to everything desired

🚫 No single item is left out

🏆 Wisdom outranks every object of desire

📖 Nothing on the list can compete

# Proverbs 8:12-16
# 👑 What Wisdom Offers
---
## 👩 I Wisdom Dwell With Prudence

Wisdom now speaks in the first person, naming herself directly for the first time.

Prudence means practical good judgment applied to everyday decisions.

Dwelling with prudence pictures the two living together like close companions.

Wisdom is never separated from the practical skill of living well.

👩 Wisdom names herself in first person here

🧠 Prudence means practical good judgment

🏠 Dwell pictures the two living together

📖 Wisdom is never apart from practical skill

---

## 🛠️ Find Out Knowledge Of Witty Inventions

Witty inventions is an old phrase meaning careful, skillful planning.

It does not mean cleverness for its own sake or trickery.

Wisdom is credited here with the ability to devise good, workable plans.

This links wisdom to real, practical accomplishment, not abstract ideas alone.

🛠️ Witty inventions means skillful planning

🚫 It is not cleverness for its own sake

📐 Wisdom devises good, workable plans

📖 This links wisdom to real accomplishment

---

## 📖 The Fear Of The LORD Is To Hate Evil

This gives a working definition of the fear of the LORD introduced back in Proverbs 1:7.

It is not primarily about feeling afraid.

It shows itself in practice as hating what God hates.

A person's real attitude toward evil reveals how seriously they take God.

📖 This defines fear of the LORD from 1:7

😨 It is not primarily about feeling afraid

🎯 It shows in hating what God hates

➡️ Attitude toward evil reveals seriousness toward God

---

## 💔 Pride, And Arrogancy, And The Evil Way

Pride and arrogancy are named together because their meanings overlap closely.

Both describe an inflated view of oneself that pushes God aside.

The evil way then broadens the list from an attitude to a whole pattern of living.

Wisdom names the root problem before naming its outward behavior.

💔 Pride and arrogancy overlap closely

🙋 Both push God aside through self focus

🛤️ Evil way broadens this to a life pattern

📖 The root is named before the behavior

---

## 🌀 The Froward Mouth, Do I Hate

Froward mouth repeats a word already defined earlier in this chapter, willfully crooked speech.

Naming speech last closes the list on a theme this whole chapter keeps returning to.

Wisdom's own hatred of evil mirrors the honesty she claimed for her own words.

What wisdom refuses to say lines up with what she refuses to tolerate in others.

🌀 Froward mouth means willfully crooked speech

🔁 This repeats an earlier definition in the chapter

🪞 Her hatred of evil mirrors her own honesty

📖 What she refuses matches what she avoids

---

## 🧭 Counsel Is Mine, And Sound Wisdom

Counsel here means the practical advice a person needs to make a hard decision.

Sound wisdom means wisdom that is whole and reliable, not partial or shaky.

Wisdom claims ownership of both at once, not one without the other.

Good advice without reliability would not be enough on its own.

🧭 Counsel means practical decision making advice

🏛️ Sound wisdom means whole and reliable

🤝 Wisdom claims ownership of both together

📖 Advice without reliability is not enough

---

## 🎯 I Am Understanding

This is one of several bold, direct claims wisdom makes about her own identity.

Understanding here is not simply a trait wisdom has, she claims to actually be it.

This kind of direct self identification appears nowhere else this plainly in the chapter.

Wisdom is described as inseparable from the very quality she teaches.

🎯 This is a bold claim about her identity

🧠 Wisdom claims to actually be understanding

🆕 No other line states this so plainly

📖 Wisdom is inseparable from what she teaches

---

## 💪 I Have Strength

Strength here means real capability, not physical power in the ordinary sense.

This claim follows directly after wisdom's claim to be understanding itself.

Together the two claims cover both knowing what is right and having power to act.

Insight without strength to act would leave a person capable only of good intentions.

💪 Strength here means real capability

🔗 This claim follows her claim to understanding

🤝 Together they cover knowing and doing

📖 Insight without strength leaves only intentions

---

## 👑 By Me Kings Reign

This claims wisdom stands behind the success of the highest human authority.

A king in the ancient world needed more than a title to govern well.

Wisdom, not the crown itself, is credited with real, lasting authority.

Solomon, the traditional author, would have known this from his own experience.

👑 Wisdom stands behind a king's real success

🏛️ A title alone did not govern well

🧠 Wisdom, not the crown, gives real authority

📖 Solomon likely wrote this from experience

---

## ⚖️ Princes Decree Justice

Princes here refers to rulers and officials below the level of a king.

Decree justice means issuing fair, binding rulings that people must live under.

Wisdom is credited with the fairness behind these decisions, not just the power to make them.

Just rule at every level of government traces back to the same source.

🏛️ Princes means rulers below a king

⚖️ Decree justice means issuing fair rulings

🧠 Wisdom is credited with the fairness itself

📖 Just rule traces to the same source

---

## 🔁 By Me Princes Rule, And Nobles

This repeats and widens the claim from verse fifteen to a broader group of leaders.

Nobles refers to people of high social rank and inherited privilege.

Wisdom's reach is not limited to a single office or title.

Every level of leadership depends on the same underlying source.

🔁 This widens the claim from verse fifteen

🎩 Nobles means people of high social rank

🌍 Wisdom's reach is not limited to one office

📖 Every level of leadership needs the same source

---

## 🌍 All The Judges Of The Earth

This closes the list with the widest possible scope, every judge everywhere.

Judges here means anyone entrusted with deciding right and wrong for others.

The claim moves from a king down to any person holding that kind of authority.

No fair ruling anywhere happens apart from wisdom's involvement.

🌍 This closes the list at its widest point

⚖️ Judges means anyone deciding right and wrong

📉 The claim moves from king to any authority

📖 No fair ruling happens without wisdom

# Proverbs 8:17-21
# 💰 The Riches Of Wisdom
---
## ❤️ I Love Them That Love Me

Wisdom is described here as capable of loving in return, not simply available to be used.

This turns the relationship from a one way transaction into something closer to friendship.

The pursuit of wisdom is answered, not just tolerated.

A real relationship is being offered here, not a business deal.

❤️ Wisdom loves those who love her

🤝 This is not a one way transaction

🎯 The pursuit of wisdom is answered

📖 A relationship is offered, not a deal

---

## 🌅 Those That Seek Me Early Shall Find Me

Seek me early can mean seeking earnestly, and can also carry the sense of seeking from youth.

Both senses fit naturally with how this book was written, as instruction for the young.

The promise attached to the search is certain, not merely possible.

Effort spent seeking wisdom is never wasted effort.

🌅 Seek early can mean earnest or youthful seeking

👦 Both senses fit this book's young audience

✅ The promise is certain, not just possible

📖 Effort spent seeking wisdom is never wasted

---

## 💰 Riches And Honour Are With Me

Riches names material wealth, and honour names the respect a person earns from others.

Wisdom claims to carry both, not simply point toward them.

This does not promise wealth to everyone who is wise, life does not always work that way.

It does claim that wisdom itself is a kind of true riches no one can take away.

💰 Riches means material wealth

🎖️ Honour means earned respect from others

🚫 This is not a blanket promise of wealth

📖 Wisdom is a riches no one can take

---

## ⏳ Durable Riches And Righteousness

Durable means lasting, built to survive over a long stretch of time.

Ordinary riches can be lost through theft, disaster, or simple bad luck.

Pairing durable riches with righteousness ties this wealth to character rather than circumstance.

This kind of wealth cannot be stolen the way a purse of silver can.

⏳ Durable means built to last

📉 Ordinary riches can be lost easily

🧭 This wealth is tied to character

📖 It cannot be stolen like silver can

---

## 🌳 My Fruit Is Better Than Gold

Fruit here pictures the actual results wisdom produces in a person's life.

A tree is known and valued by what it actually grows, not simply by its appearance.

Even the finest gold cannot match what wisdom's results actually deliver.

The comparison from earlier in the chapter returns here in a new picture.

🌳 Fruit pictures the results wisdom produces

🍎 A tree is valued by what it grows

🥇 Even fine gold cannot match those results

📖 The chapter's earlier comparison returns here

---

## 💵 My Revenue Than Choice Silver

Revenue is an old word for steady income, not a single one time payment.

This pictures wisdom's benefit as ongoing, arriving again and again over time.

Choice silver, the finest kind, is still outmatched by this steady return.

Wisdom is framed here as an investment, not a single transaction.

💵 Revenue means steady, ongoing income

🔁 Wisdom's benefit arrives again and again

🥈 Even the finest silver is outmatched

📖 Wisdom is an investment, not a transaction

---

## 🧭 I Lead In The Way Of Righteousness

Lead pictures wisdom as an active guide, walking ahead rather than simply pointing.

The way of righteousness names a specific direction, not a vague general goodness.

This mirrors the road and path imagery used throughout the whole book of Proverbs.

Wisdom does not abandon a person once the instruction has been given.

🧭 Lead pictures an active guide, not a sign

🛤️ Way of righteousness is a specific direction

🔁 This mirrors the book's road imagery

📖 Wisdom stays present, not just instructive

---

## ⚖️ In The Midst Of The Paths Of Judgment

Paths of judgment means the road of fair, right decision making.

In the midst suggests wisdom walks along this road personally, not from a distance.

Judgment here does not mean punishment, it means sound and fair discernment.

This continues the picture of wisdom as a personal, present guide.

🛤️ Paths of judgment means fair decision making

🚶 In the midst means walking it personally

⚖️ Judgment here means discernment, not punishment

📖 Wisdom stays present as a guide

---

## 🎁 Cause Those That Love Me To Inherit Substance

Inherit pictures receiving something as a lasting possession, passed down rather than won by luck.

Substance here refers to real, solid wealth or property.

The promise ties back to the relationship named at the start of this section.

This is a gift given within a relationship, not a random prize.

🎁 Inherit pictures a lasting possession

🏠 Substance means real, solid wealth

❤️ This ties back to the love named earlier

📖 It is a gift within a relationship

---

## 🏆 I Will Fill Their Treasures

Fill pictures abundance, not a bare minimum handed out reluctantly.

Treasures here means a person's whole store of what they value and keep safe.

This closes the section on the same generous note it began with.

Wisdom gives fully to those who genuinely seek her out.

🏆 Fill pictures abundance, not a bare minimum

📦 Treasures means a whole store of value

🔁 This closes the section on a generous note

📖 Wisdom gives fully to genuine seekers

# Proverbs 8:22-26
# 🌌 Wisdom Before Creation
---
## 🌅 The LORD Possessed Me In The Beginning Of His Way

Possessed here can also be translated as brought forth or acquired, and scholars have long debated the exact sense.

In the beginning of his way points back to the very start of God's creative activity.

Wisdom claims to have existed before any of God's works were made.

This shifts the chapter from practical advice into something with far greater theological weight.

❓ Possessed can also mean brought forth

🌅 This points to the start of creation

⏳ Wisdom existed before God's works were made

📖 The chapter's weight shifts here

---

## 🏛️ Before His Works Of Old

Works of old means everything God has made throughout history.

Naming this before wisdom's own existence places her prior to all of it.

This verse has shaped centuries of discussion about wisdom's true nature and identity.

Many later Christian readers connected this picture to Christ described in John 1.

🏛️ Works of old means everything God made

⏳ Wisdom existed before all of it

📚 This shaped centuries of theological discussion

📖 Many later readers connected it to John 1

---

## ♾️ I Was Set Up From Everlasting

Set up pictures being established or installed in a position, not simply born.

Everlasting stretches this claim beyond any measurable point in time.

The language grows even stronger here than the claim just made in the verse before.

Wisdom is being described using language usually reserved for God alone.

🏛️ Set up means being established in position

♾️ Everlasting reaches beyond measurable time

📈 The language grows stronger than before

📖 This language usually describes God alone

---

## ⏳ From The Beginning, Or Ever The Earth Was

Or ever is an old phrase meaning before, already used twice in this passage.

This repeats the claim of prior existence a third time in just a few lines.

Ancient readers used repetition like this to stress a point too important to say only once.

The point could not be more central to how the chapter understands wisdom.

⏳ Or ever is an old word for before

🔁 This repeats the claim a third time

📢 Repetition stressed a point worth remembering

📖 This point is central to the chapter

---

## 🌊 When There Were No Depths

Depths refers to the deep waters that covered the earth before it was formed, named in Genesis 1:2.

Saying wisdom existed before even the depths reaches back to the earliest point of creation.

This verse begins listing specific things that did not yet exist.

Each item in the list pushes wisdom's origin further back in time.

🌊 Depths means the waters from Genesis 1:2

⏳ This reaches back to creation's earliest point

📝 The verse begins listing what did not exist

📖 Each item pushes wisdom's origin further back

---

## 👶 I Was Brought Forth

Brought forth pictures something like birth, a specific moment of coming into being.

This phrase repeats twice in this short passage, in verses 24 and 25.

Scholars disagree on whether this describes wisdom's literal origin or is simply poetic language.

The text leaves the exact mechanism unexplained while insisting on the timing.

👶 Brought forth pictures a birth like moment

🔁 This phrase repeats in verses 24 and 25

❓ Scholars disagree on exactly what it describes

📖 The text insists on timing, not mechanism

---

## 💧 No Fountains Abounding With Water

Fountains here means natural springs, a basic source of fresh water for any ancient community.

Abounding with water means overflowing and plentiful, not merely present.

Even something as basic as fresh water did not yet exist when wisdom already did.

The list keeps naming the most basic building blocks of a livable world.

💧 Fountains means natural freshwater springs

🌊 Abounding means overflowing and plentiful

⏳ Even basic water did not yet exist

📖 The list names creation's basic building blocks

---

## 🏔️ Before The Mountains Were Settled

Settled here means fixed firmly in place, given a permanent position.

Mountains represented the most stable, unmovable things an ancient person could imagine.

Naming something so permanent as not yet existing pushes the timeline back even further.

Wisdom predates even what seemed like the most fixed parts of the world.

🏔️ Settled means fixed firmly in place

🗿 Mountains represented total stability

⏳ Wisdom predates even the most fixed things

📖 The timeline keeps reaching further back

---

## ⛰️ Before The Hills Was I Brought Forth

Hills repeats the mountain image using a slightly smaller, related landform.

This is the third time brought forth appears in this short section of the chapter.

Hebrew poetry often pairs a large image with a smaller matching one for balance.

The repetition keeps circling back to make sure the point cannot be missed.

⛰️ Hills repeats the mountain image

🔁 This is the third use of brought forth

📝 Hebrew poetry often pairs large and small images

📖 The point circles back so it lands

---

## 🌾 The Earth, Nor The Fields, Nor The Highest Part Of The Dust

Fields names cultivated, usable farmland, the land people actually lived on and worked.

Highest part of the dust is a poetic way of naming the very soil the world is built from.

This closes the list by naming both the practical land and its most basic raw material.

Nothing in the physical world, from farmland to plain dirt, existed before wisdom did.

🌾 Fields means cultivated, usable farmland

🏔️ Highest part of the dust means the soil

📝 This closes the list of nonexistent things

📖 Nothing physical existed before wisdom did

# Proverbs 8:27-31
# 🎨 Present At Creation
---
## 🛠️ When He Prepared The Heavens

Prepared here means carefully set in place, not thrown together at random.

The heavens refers to the sky and everything visible above the earth.

The passage now shifts from listing what did not yet exist to describing creation itself.

Wisdom moves from existing before creation to being present as creation actually happened.

🛠️ Prepared means carefully set in place

🌌 Heavens means the sky and everything above

🔄 The passage shifts to creation happening

📖 Wisdom is present as it happens

---

## 👀 I Was There

This is one of the most direct claims in the entire chapter.

Wisdom is not simply describing creation secondhand, she claims to have witnessed it.

Three plain words carry enormous theological weight in this passage.

Presence, not just prior existence, is being claimed here.

👀 This is a direct eyewitness style claim

🚫 It is not a secondhand description

⚖️ Three words carry major theological weight

📖 Presence, not just prior existence, is claimed

---

## ⭕ He Set A Compass Upon The Face Of The Depth

Compass here is an old word for a circle, not the navigation tool used today.

This pictures God drawing the horizon line where sky meets sea.

Face of the depth names the surface of the waters described earlier in the chapter.

Ancient readers pictured the earth's edge as a great circle traced onto the waters.

⭕ Compass is an old word for circle

🌅 This pictures the horizon being drawn

🌊 Face of the depth means the water's surface

📖 Ancient readers pictured a traced circle

---

## 🏛️ He Established The Clouds Above

Established means fixed securely in place, the same word used earlier for the mountains.

Clouds above names the sky's water bearing layer, pictured in ancient cosmology as a kind of container.

This detail continues the careful, structured picture of creation running through the whole passage.

Nothing about creation here happens by accident or chaos.

🏛️ Established means fixed securely in place

☁️ Clouds above names the sky's water layer

🧱 This continues creation's structured picture

📖 Nothing here happens by accident

---

## 💪 He Strengthened The Fountains Of The Deep

Strengthened means given lasting stability and force.

Fountains of the deep pictures the underground and undersea sources of water in ancient cosmology.

This detail matches Genesis 7:11's language for the flood, when those same fountains later broke open.

The picture here connects forward to a major event much later in the Bible's story.

💪 Strengthened means given lasting stability

🌊 Fountains of the deep meant underground water sources

🔁 This matches Genesis 7:11's flood language

📖 It connects forward to a later Bible event

---

## 📜 He Gave To The Sea His Decree

Decree means a binding, authoritative command that must be obeyed.

Giving the sea a decree pictures God setting a fixed boundary the water cannot cross.

This idea reappears later in Job 38 using very similar language.

Even something as powerful as the sea answers to a set limit.

📜 Decree means a binding, authoritative command

🌊 This pictures a fixed boundary for the sea

🔁 Job 38 uses very similar language later

📖 Even the sea answers to a set limit

---

## 🛡️ The Waters Should Not Pass His Commandment

This restates the sea's boundary using the word commandment instead of decree.

Ancient readers lived close enough to the sea to fear its power to flood and destroy.

Naming a fixed limit on it would have felt like real, practical reassurance.

Order, not chaos, controls even the most unpredictable part of the natural world.

🔁 This restates the boundary with a new word

🌊 Ancient readers feared the sea's destructive power

🛡️ A fixed limit offered real reassurance

📖 Order controls even the unpredictable sea

---

## 🏗️ He Appointed The Foundations Of The Earth

Appointed means deliberately fixed and assigned, not left to chance.

Foundations pictures the earth the way a builder pictures the base of a building.

This closes the list of creation acts wisdom claims to have witnessed firsthand.

The passage now moves from watching creation to describing wisdom's relationship with God during it.

🏗️ Appointed means deliberately fixed in place

🧱 Foundations pictures a building's base

📝 This closes the list of creation acts

📖 The passage now shifts to relationship

---

## 👨‍👧 As One Brought Up With Him

Brought up with him pictures a child raised closely alongside a parent.

This is warmer and more personal language than anything used earlier in the chapter.

Wisdom's relationship with God is pictured here as intimate, not merely functional.

The chapter's tone shifts from formal claim to something closer to affection.

👨‍👧 This pictures a child raised alongside a parent

❤️ It is warmer than the chapter's earlier language

🤝 Wisdom's relationship with God is intimate

📖 The tone shifts toward real affection

---

## 😊 Daily His Delight, Rejoicing Always Before Him

Delight means a source of real joy and pleasure, not simple usefulness.

Daily and always both stress that this joy was constant, not occasional.

Rejoicing before him pictures wisdom's presence as active celebration, not quiet duty.

Creation itself is framed here as something joyful, not merely functional work.

😊 Delight means real joy and pleasure

⏳ Daily and always stress constant joy

🎉 Rejoicing pictures active celebration, not duty

📖 Creation is framed as joyful, not just work

---

## 🏠 Rejoicing In The Habitable Part Of His Earth

Habitable part means specifically the parts of the world made for people to live on.

Wisdom's joy is not only about the abstract act of creating.

It is tied directly to the world becoming a livable home.

The focus quietly shifts from cosmic creation toward the people who would actually live there.

🏠 Habitable part means the world made for people

🌍 Her joy is not only abstract creation

🏡 It is tied to a livable home

📖 The focus shifts toward the people to come

---

## 👥 My Delights Were With The Sons Of Men

Sons of men repeats the same phrase used back in verse four, closing a loop across the chapter.

Delights here mirrors the joy language used just two lines earlier.

Wisdom's joy is not distant from humanity, it is centered directly on people.

This sets up the personal, direct appeal that opens the chapter's final section.

🔁 Sons of men repeats verse four's phrase

😊 Delights mirrors the joy language just used

👥 Her joy centers directly on people

📖 This sets up the chapter's closing appeal

# Proverbs 8:32-36
# 🚪 Blessed Is The One Who Listens
---
## 🔄 Now Therefore Hearken Unto Me

Now therefore signals a shift from description back to direct appeal.

Hearken again means listen closely, the same urgent word used in chapter seven.

Wisdom has spent the whole chapter establishing who she is and what she has seen.

Only after that groundwork does she return to a personal, direct call.

🔄 Now therefore signals a shift to appeal

📢 Hearken means listen closely, urgently

🏛️ The chapter first established who wisdom is

📖 Only then does she return to a call

---

## 👶 O Ye Children

Children here repeats the same wide address used in chapter seven's closing appeal.

The audience widens again from any single listener to everyone hearing the words.

This deliberate echo ties the two chapters together as one continuous lesson.

The book keeps circling back to make sure no reader feels left out.

👶 Children repeats chapter seven's wide address

🌍 The audience widens to everyone listening

🔁 This echo ties the two chapters together

📖 No reader is meant to feel left out

---

## 🙏 Blessed Are They That Keep My Ways

Blessed here means genuinely favored and fortunate, not simply happy in the moment.

Keep my ways means actively following wisdom's path, not merely admiring it from a distance.

This is the first time the word blessed appears in this specific chapter.

It marks a clear turn from description toward invitation and reward.

🙏 Blessed means genuinely favored, not just happy

🛤️ Keep my ways means actively following, not admiring

🆕 This is the chapter's first use of blessed

📖 It marks a turn toward invitation

---

## 👂 Hear Instruction, And Be Wise

Hear here means more than physically listening, it means actually taking the words in.

And be wise follows hearing directly, showing that real listening changes a person.

This connects hearing to becoming, not just to knowing information.

The verse offers a simple, direct path in a single line.

👂 Hear means truly taking words in

🔄 Real listening changes a person

🧠 This connects hearing to becoming

📖 A direct, simple path in one line

---

## 🙅 Refuse It Not

Refuse means actively turning something away, not simply forgetting to act on it.

This closes the verse with a plain, blunt warning against rejecting the invitation.

The whole appeal could still fail at this one final point, refusal.

Wisdom's offer requires a choice, not just passive agreement.

🙅 Refuse means actively turning something away

⚠️ This is a blunt warning against rejection

🎯 The offer could still fail right here

📖 Wisdom's offer requires an active choice

---

## 👀 Watching Daily At My Gates

Watching daily pictures consistent, repeated effort rather than a single visit.

Gates again recalls the busy, public location named at the very start of the chapter.

This closes a loop, returning to where wisdom's public cry first began.

Persistence, shown day after day, is part of what this blessing actually rewards.

👀 Watching daily pictures repeated, consistent effort

🚪 Gates recalls the chapter's opening image

🔁 This closes the loop back to verse three

📖 Persistence is part of what earns the blessing

---

## ⏳ Waiting At The Posts Of My Doors

Posts of my doors names the door frame itself, the closest possible spot to entering.

Waiting there pictures someone unwilling to leave even before being invited in.

This is eager anticipation, not casual or occasional interest.

The image completes the picture of someone fully committed to finding wisdom.

🚪 Posts of my doors names the door frame

⏳ Waiting pictures eager anticipation, not casual interest

🙋 This shows full commitment to finding wisdom

📖 The image completes total dedication

---

## 🌱 Whoso Findeth Me Findeth Life

Findeth repeats a word used earlier in the chapter, back in verse seventeen.

Life here means more than simply staying alive, it means a full, flourishing existence.

This equation, wisdom equals life, sits at the very center of the whole book of Proverbs.

Everything the chapter has said builds toward this one direct statement.

🔁 Findeth repeats the word from verse seventeen

🌱 Life means flourishing, not just staying alive

⚖️ This equation sits at Proverbs' very center

📖 The whole chapter builds toward this line

---

## 🙏 Shall Obtain Favour Of The LORD

Favour means being looked on with approval and goodwill.

This ties finding wisdom directly to a right relationship with God himself.

Wisdom is never presented in this book as separate from knowing God.

Practical skill for living and genuine faith are woven together here, not kept apart.

🙏 Favour means being looked on with approval

🤝 This ties wisdom to a right relationship

📖 Wisdom is never separate from knowing God

➡️ Practical skill and real faith are woven together

---

## 🪞 He That Sinneth Against Me Wrongeth His Own Soul

Sinneth against me treats rejecting wisdom as a genuine offense, not a neutral choice.

Wrongeth his own soul means the harm lands back on the person who commits it.

No one else is described as the primary victim of this kind of choice.

Rejecting wisdom is pictured as an act of self harm, not a private freedom.

⚠️ Rejecting wisdom is treated as a real offense

🪞 The harm lands on the one who sins

🚫 No one else is the primary victim

📖 Rejecting wisdom is a form of self harm

---

## 💔 All They That Hate Me Love Death

Hate here means the same settled, deliberate opposition described earlier for fools.

Love death sounds shocking on purpose, forcing the reader to feel the real weight of the choice.

No one consciously wants death, but Proverbs insists rejecting wisdom leads there regardless.

The chapter closes on the starkest possible contrast, life through wisdom or death through its rejection.

💔 Hate means settled, deliberate opposition

😱 Love death is shocking on purpose

⚠️ Rejecting wisdom leads to death regardless of intent

📖 The chapter closes on life or death
`.trim();

export const PROVERBS_EIGHT_PERSONAL_SECTIONS = parseProverbsEightRawNotes(PROVERBS_EIGHT_RAW_NOTES);
