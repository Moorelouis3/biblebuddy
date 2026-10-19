export type RevelationTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationTwentyTwoRawNotes(rawText: string): RevelationTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 22:${startVerse}` : `Revelation 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Revelation 22 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_TWENTY_TWO_RAW_NOTES = `# Revelation 22:1-2
# 🌊 The River And The Tree Of Life
---
## 💧 A Pure River Of Water Of Life

"Pure" means perfectly clear, with nothing to muddy it.

This river is not a brand new image.

It is the same water of life promised back in chapter twenty one.

Here it finally flows, visible and real, through the whole city.

💧 Pure means perfectly clear

🔁 Same promise as chapter twenty one

🏙️ Now it flows through the city

📖 This river never runs dry

## 💎 Clear As Crystal

"Crystal" described a stone so clear it looked almost invisible.

This river carries no mud and no cloudiness at all.

Earthly rivers pick up dirt and debris along their path.

This river carries nothing but life itself.

💎 Crystal meant a stone almost invisible

🌊 No mud or cloudiness here

🏞️ Earthly rivers carry dirt along the way

📖 This river carries only life

## 👑 Proceeding Out Of The Throne Of God And Of The Lamb

The river does not begin at a spring in the ground.

It flows straight out of the throne itself.

God and the Lamb share one throne here, not two separate ones.

Life flows from their shared rule, not from the earth.

🚰 The river starts at the throne

🪑 God and the Lamb share one throne

🤝 Their rule is united

📖 Life flows from that shared throne

## 🌳 The Tree Of Life

This same tree appeared once before, in the garden of Eden.

After Adam and Eve sinned, cherubim guarded the way back to it.

Genesis three ends with that tree sealed away from humanity.

Revelation ends with that same tree standing open again.

🌳 This tree first grew in Eden

⚔️ Cherubim guarded it after Eden

🚫 Genesis three sealed it away

📖 Revelation reopens what Genesis closed

## 🍎 Bare Twelve Manner Of Fruits

"Bare" is an old way of saying bore or produced.

Twelve kinds of fruit means constant variety, never just one crop.

An earthly orchard ripens once a season, then waits.

This tree never waits for the next season to come.

🍎 Bare means bore or produced

🧺 Twelve kinds means constant variety

🍂 Earthly orchards ripen once a season

📖 This tree never waits on a season

## 📅 Yielded Her Fruit Every Month

This tree produces a full harvest every single month.

No season here ever runs empty or waits for next year.

The number twelve already named in this verse matches twelve months exactly.

Abundance here is constant, not occasional.

📅 A full harvest every month

🚫 No empty season ever

🔢 Twelve fruits match twelve months

📖 Abundance here never pauses

## 🍃 The Leaves Of The Tree Were For The Healing Of The Nations

"Healing" does not mean sickness still exists somewhere needing a cure.

Chapter twenty one already said there is no more death or pain.

This word pictures total wholeness, nothing broken or missing.

Nations once divided now share one source of life.

🍃 Healing does not mean sickness remains

🚫 Chapter twenty one removed death and pain

🌿 It pictures total wholeness

📖 Nations now share one source of life

# Revelation 22:3-5
# 👑 No More Curse, No More Night
---
## ⚡ There Shall Be No More Curse

The curse began in Genesis three, right after Adam and Eve sinned.

It touched the ground, work, childbirth, and finally death itself.

Nearly every hard thing since that chapter traces back to this one curse.

Here, for the first time since Eden, it is lifted completely.

⚡ The curse began in Genesis three

🌾 It touched work, ground, and childbirth

⚰️ Death was part of that curse

📖 Here it is lifted completely

## 🪑 The Throne Of God And Of The Lamb Shall Be In It

This repeats the same joined throne already named in verse one.

God's rule is no longer distant or hidden behind a curtain.

It now sits inside the city itself, among His people.

Nearness, not distance, defines this whole scene.

🔁 Same joined throne as verse one

🚪 God's rule is no longer hidden

🏙️ The throne sits inside the city

📖 Nearness defines this scene

## 🙏 His Servants Shall Serve Him

This service is not forced, exhausting labor.

Israel's priests once served God through sacrifice and careful ritual law.

Here, service happens face to face, with no barrier between them.

This kind of service is chosen out of love, not duty.

🙏 Service here is not forced labor

🛐 Old priests served through sacrifice and ritual

👀 This service happens face to face

📖 Love replaces duty here

## 👁️ They Shall See His Face

In Exodus, Moses was told no one could see God's face and live.

That boundary protected sinful people from God's overwhelming holiness.

Here, that old boundary is gone, and His people see Him directly.

What once meant death now means the greatest reward.

🚫 Moses could not see God's face and live

🛡️ That boundary once protected sinful people

👁️ The boundary is removed here

📖 What meant death now means reward

## 🏷️ His Name Shall Be In Their Foreheads

This matches the mark already described back in chapter fourteen.

A name on the forehead showed openly who someone belonged to.

It stands in sharp contrast to the mark of the beast from chapter thirteen.

Everyone here wears God's ownership in plain sight.

🏷️ This matches chapter fourteen's mark

👤 A forehead mark showed open ownership

⚔️ It contrasts the beast's mark

📖 God's people wear His name openly

## ☀️ There Shall Be No Night There

This repeats the promise already made in chapter twenty one about light.

No candle and no sunlight are needed here anymore.

God Himself becomes the light, not a replacement for one.

Night pictured danger and hiding throughout the Bible.

Neither danger nor hiding remains here.

🕯️ No candle or sunlight needed

☀️ God Himself provides the light

🌙 Night once pictured danger and hiding

📖 Neither danger nor hiding remains

## ♾️ They Shall Reign For Ever And Ever

This promise was first given in chapter five, to those made kings and priests.

It does not describe one ruler reigning over everyone else.

God's own people now share in His rule, permanently.

"For ever and ever" leaves no future ending to plan around.

👑 Chapter five first promised this reign

🤝 God's people share in His rule

♾️ For ever and ever means no end

📖 No future ending to plan around

# Revelation 22:6-7
# 📜 Faithful And True Sayings
---
## 🤝 These Sayings Are Faithful And True

This exact phrase already appeared once, back in chapter twenty one.

"Faithful" means fully trustworthy.

"True" means matching reality exactly.

Repeating it here adds one final seal of certainty.

Nothing in this vision is exaggerated beyond its real meaning.

🔁 This phrase appeared in chapter twenty one

🤝 Faithful means fully trustworthy

✅ True means matching reality exactly

📖 This repeat seals the certainty

## 👼 The Lord God Of The Holy Prophets Sent His Angel

This same angel has guided John through the entire book of Revelation.

Naming God as the prophets' God ties this vision to every prophet before John.

Isaiah, Ezekiel, and Daniel all received visions from this same God.

John's vision joins a long, trusted line, not something new and strange.

👼 The same angel guided John throughout

📜 God is named as the prophets' God

🔗 This ties John to Isaiah, Ezekiel, Daniel

📖 John's vision joins a trusted line

## ⏳ The Things Which Must Shortly Be Done

"Shortly" does not always mean within a few days or years.

In scripture, it often means sudden rather than delayed once it starts.

It also means these events are certain, not maybe someday.

God's timing is not measured the way human patience measures it.

⏳ Shortly can mean sudden, not immediate

📆 It does not promise an exact date

✅ These events are certain

📖 God's timing differs from human patience

## ⚡ Behold, I Come Quickly

This is the first of three times this exact promise repeats in this chapter.

"Quickly" carries the same sense as "shortly" in verse six.

Jesus Himself, not only an angel, now speaks this promise.

The repetition builds urgency, not a fixed date on a calendar.

🔁 Repeats three times in this chapter

⚡ Quickly means sudden, not scheduled

🗣️ Jesus Himself speaks this promise

📖 Repetition builds urgency, not a date

## 7️⃣ Blessed Is He That Keepeth The Sayings Of The Prophecy Of This Book

This is the last of seven blessings spoken throughout Revelation.

"Keepeth" means holding onto the words and living by them.

Reading alone is not the same as keeping.

The first blessing appeared in chapter one, for anyone who reads this book aloud.

This seventh blessing closes that whole set.

🔑 This is the seventh blessing in Revelation

📖 Keepeth means living by the words

🔁 The first blessing was in chapter one

➡️ This blessing closes the set

# Revelation 22:8-11
# 🙇 John Worships The Wrong One
---
## ✍️ I John Saw These Things, And Heard Them

John names himself directly here, the same way he did in chapter one.

This vision is not a secondhand report.

John claims it as his own firsthand experience, seen and heard.

That claim stands behind everything written in this book.

✍️ John names himself, as in chapter one

👁️ This is a firsthand account

👂 John both saw and heard it

📖 That claim backs the whole book

## 🙇 I Fell Down To Worship Before The Feet Of The Angel

John makes this same mistake once already, back in chapter nineteen.

The angel's glory and message overwhelmed him completely.

Even someone who has seen heaven itself can still misdirect worship.

This mistake is recorded honestly, not hidden or excused.

🔁 John made this mistake in chapter nineteen

✨ The angel's glory overwhelmed him

😳 Even John could misdirect worship

📖 The mistake is told honestly

## 🚫 See Thou Do It Not

The angel refuses worship immediately and firmly.

No created being, however glorious, may receive what belongs to God alone.

This same correction happened once before, almost word for word.

Scripture repeats this warning because the temptation is real.

🚫 The angel refuses worship at once

👑 Worship belongs to God alone

🔁 The same correction happened once before

📖 Scripture repeats this warning on purpose

## 🤝 I Am Thy Fellowservant, And Of Thy Brethren The Prophets

"Fellowservant" means a worker standing on the same level, not above.

The angel places himself alongside John and every prophet.

Even the most glorious angel in this book serves the same master John does.

Rank in heaven still bows to one single throne.

🤝 Fellowservant means standing on the same level

👼 The angel stands alongside John and the prophets

👑 Both serve the same master

📖 One throne stands above every rank

## 🔓 Seal Not The Sayings Of The Prophecy Of This Book

Daniel was once told the opposite, to seal up his vision for a future time.

Daniel twelve records that exact command.

John is told not to seal this one, because the time is already near.

What Daniel had to lock away, John is told to leave open.

🔒 Daniel was told to seal his vision

📜 Daniel twelve records that command

🔓 John is told to leave his open

📖 Nearness changes what must stay open

## ⚖️ He That Is Unjust, Let Him Be Unjust Still

This is not a command telling anyone to keep sinning.

It describes what happens once final judgment is already decided.

A choice held onto for a lifetime becomes permanent at that point.

This describes a locked outcome, not a new permission.

🚫 Not a command to keep sinning

⚖️ This describes judgment already decided

🔒 A lifetime choice becomes permanent

📖 This is an outcome, not a permission

# Revelation 22:12-13
# 🏆 Alpha And Omega Brings The Reward
---
## 🎁 My Reward Is With Me

This is the second time this exact promise repeats in this chapter.

Jesus does not say the reward will arrive later, separately.

He says plainly that He brings it with Him.

The giver and the gift arrive together, in one coming.

🔁 The second repeat of this promise

🎁 The reward does not come separately

🤲 Jesus brings it personally

📖 Giver and gift arrive as one

## 🏆 To Give Every Man According As His Work Shall Be

This does not contradict the free gift of salvation taught elsewhere in the Bible.

Salvation is never earned by good works.

Ephesians already teaches that truth plainly.

This describes rewards added on top of salvation.

Those rewards are based on a life actually lived.

What a person does with their life still genuinely matters to God.

🎯 This does not contradict free salvation

📜 Ephesians teaches salvation is not earned

🏆 This describes rewards added on top

📖 A life lived still matters to God

## 🔤 I Am Alpha And Omega, The Beginning And The End, The First And The Last

This exact title already appeared once before, in chapter one.

Alpha and Omega are Greek letters.

They are the first and last letters in that alphabet.

Jesus claims the same title already used for God throughout this book.

This is the final time this title appears in the Bible.

🔁 This title appeared in chapter one

🔤 Alpha and Omega are first and last

👑 Jesus claims God's own title here

📖 This is the final time it appears

# Revelation 22:14-15
# 🚪 Who Enters, And Who Stays Outside
---
## 🔁 Blessed Are They That Do His Commandments

This matches the very first blessing from chapter one, closing out the pattern.

Obedience here does not earn entry into the city by itself.

It describes the life of someone who already belongs to God.

Right action flows out of that relationship, not the other way around.

🔁 This matches chapter one's first blessing

🚫 Obedience alone does not earn entry

🌱 It describes a life already belonging to God

📖 Right action flows out of relationship

## 🌳 That They May Have Right To The Tree Of Life

This same tree was already named earlier in this chapter, in verse two.

Genesis three closed off access to it after Adam and Eve sinned.

Here, the way to it finally stands open again.

What one sin shut, one finished work reopens completely.

🌳 This tree appeared earlier in verse two

🚫 Genesis three closed access after sin

🚪 The way stands open here

📖 What sin shut, grace reopens

## 🚪 Enter In Through The Gates Into The City

These are the same twelve pearl gates described back in chapter twenty one.

Entry here is not forced open or snuck through.

It is offered freely to anyone who belongs to God.

This city welcomes its people home.

🚪 These are chapter twenty one's twelve gates

🙅 Entry is not forced or snuck in

🎁 It is offered freely

📖 The city welcomes its people home

## 🐕 Without Are Dogs, And Sorcerers, And Whoremongers, And Murderers, And Idolaters

"Dogs" was a harsh insult in this culture for a corrupt, dishonest way of life.

This list matches almost exactly the one already given in chapter twenty one.

Naming it twice is not an accident.

This warning is serious enough that Revelation repeats it on purpose.

🐕 Dogs was a harsh insult for corrupt living

🔁 This list matches chapter twenty one closely

⚠️ Repeating it twice is deliberate

📖 Serious warnings deserve repeating

# Revelation 22:16-17
# ⭐ The Root, The Star, And The Invitation
---
## 🗣️ I Jesus Have Sent Mine Angel To Testify Unto You These Things In The Churches

Jesus names Himself directly here, the only place He does so this plainly in the book.

Every vision, angel, and warning in Revelation traces back to this one sender.

"The churches" shows this message was never meant for John alone.

It was always meant to reach ordinary believers meeting together.

🗣️ Jesus names Himself directly here

👼 Every vision traces back to this sender

⛪ The churches shows this was not private

📖 Ordinary believers were always the audience

## 🌱 I Am The Root And The Offspring Of David

"Root" means Jesus existed before David.

He is the source David's whole family line grew from.

"Offspring" means Jesus is also David's own descendant, born generations later.

Both titles sound like they contradict each other.

Yet both are true at the same time.

🌱 Root means Jesus existed before David

🌳 He is the source David's line grew from

👶 Offspring means Jesus descended from David

📖 Jesus stands above and within that line

## 🌟 The Bright And Morning Star

The morning star appears right before dawn.

It announces that night is ending.

Jesus already used this exact image in chapter two, speaking to Thyatira.

Here at the very end, that same star announces the dawn arriving.

🌟 The morning star appears before dawn

🌙 It signals night is ending

🔁 Jesus used this image in chapter two

📖 This star announces the dawn at last

## 💧 Whosoever Will, Let Him Take The Water Of Life Freely

Three voices repeat the same invitation here, the Spirit, the bride, and anyone who hears.

"Whosoever will" means the invitation stays open to absolutely anyone willing to come.

"Freely" repeats the same promise already made in chapter twenty one.

This is the last open invitation before the book closes.

🗣️ Three voices repeat the same invitation

🙋 Whosoever will means anyone willing

💧 Freely repeats chapter twenty one's promise

📖 This is the last invitation before the end

# Revelation 22:18-19
# ⚠️ A Warning Against Changing This Book
---
## ➕ If Any Man Shall Add Unto These Things, God Shall Add Unto Him The Plagues

This warning closely echoes one Moses already gave about the law, in Deuteronomy four.

Adding to the words means inventing new teaching and claiming it carries the same authority.

The punishment matches the offense, plagues added for words added.

This is a serious warning, not a rule about careless copying mistakes.

📜 This echoes Moses' warning in Deuteronomy four

➕ Adding means inventing false teaching

⚖️ The punishment matches the offense

📖 This is a serious warning, not a technicality

## ✂️ If Any Man Shall Take Away From The Words Of The Book Of This Prophecy

Taking away means deciding certain parts are outdated or unnecessary.

This usually comes from discomfort with a hard teaching, not honest study.

The warning cuts both ways, against adding and against cutting out.

Scripture asks to be received whole, not edited to personal taste.

✂️ Taking away means cutting out hard parts

😬 Often driven by discomfort, not study

⚖️ The warning cuts both directions

📖 Scripture asks to be received whole

## 📚 God Shall Take Away His Part Out Of The Book Of Life

This same book of life already appeared in chapter twenty.

Being written there was the one thing that decided that earlier judgment scene.

This does not describe losing salvation by accident over a small mistake.

It describes the serious consequence of deliberately twisting God's own words.

📚 This same book appeared in chapter twenty

⚖️ Being written there decided that judgment

🚫 Not about accidental small mistakes

📖 This is about deliberately twisting God's words

# Revelation 22:20-21
# 🙏 Come, Lord Jesus
---
## 🔁 Surely I Come Quickly

This is the third and final time this exact promise repeats in this chapter.

Each repeat builds the same urgency a little further.

This is also the last recorded word Jesus Himself speaks in the entire Bible.

Everything after this verse belongs to John's own closing words.

🔁 The third and final repeat here

⏳ Each repeat builds more urgency

🗣️ Jesus' last recorded word in the Bible

📖 John's closing words follow after this

## 🙏 Amen. Even So, Come, Lord Jesus

"Amen" means let it be so, a plain agreement with what was just said.

John does not only agree quietly.

He answers with his own prayer.

"Come, Lord Jesus" became one of the earliest prayers in the whole church.

The last voice heard in Revelation is a believer asking for Jesus to return.

✅ Amen means let it be so

🙏 John answers with his own prayer

⛪ This prayer became common in the early church

📖 The last voice longs for Jesus to return

## 🕊️ The Grace Of Our Lord Jesus Christ Be With You All

This exact kind of blessing opens most of the New Testament letters.

Revelation closes the same way nearly every epistle does, with grace.

After seals, trumpets, beasts, and final judgment, the Bible ends on one simple word.

That word is grace.

The story that began in a garden ends with an open gift freely given.

✍️ This blessing matches most New Testament letters

🔁 Revelation closes the way epistles usually do

🕊️ After judgment, the Bible ends on grace

📖 A garden story ends with a free gift
`.trim();

export const REVELATION_TWENTY_TWO_PERSONAL_SECTIONS = parseRevelationTwentyTwoRawNotes(REVELATION_TWENTY_TWO_RAW_NOTES);
