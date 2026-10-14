export type EphesiansFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEphesiansFourRawNotes(rawText: string): EphesiansFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EphesiansFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ephesians\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ephesians 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ephesians\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Ephesians\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ephesians 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ephesians 4:${startVerse}` : `Ephesians 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Ephesians 4 sections, received " + sections.length);
  }

  return sections;
}

const EPHESIANS_FOUR_RAW_NOTES = `# Ephesians 4:1-6
# 🚶 Called To Walk In Unity
---
## 🔗 I Therefore

Paul uses the word therefore to connect this chapter to everything just written.

Chapters one through three explained who believers are in Christ.

Chapter four now explains how that identity should change the way they live.

Doctrine always comes before duty in Paul's letters.

🔗 Therefore ties this chapter to the last
📖 Chapters one through three explain who they are
🚶 Chapter four explains how to live
➡️ Doctrine comes before duty here

## ⛓️ The Prisoner Of The Lord

Paul already called himself a prisoner back in chapter three.

Here he repeats it right as the practical commands begin.

He was sitting in a real Roman jail cell as he wrote this.

Paul says his captivity belongs to the Lord, not to Rome.

That connects his own suffering to the obedience he is about to ask from others.

⛓️ Paul already named this in chapter three
🏛️ He sat in a real Roman cell
✝️ His captivity belonged to the Lord
📖 His suffering ties to the obedience ahead

## 🙏 Beseech You

Beseech means to beg or urge someone with real emotion.

It is stronger than simply asking.

Paul does not command this next instruction like an order from a general.

He pleads with the Ephesians the way a father pleads with his own children.

🙏 Beseech means to beg earnestly
💬 It is stronger than a simple ask
👨‍👧 Paul pleads like a caring father
📖 Love shapes how Paul gives instruction

## 🚶 Walk Worthy

Walk is one of Paul's favorite words for describing daily life.

It does not mean a single choice.

It means the whole direction a person's life moves in, step by step.

Worthy means living in a way that matches the value of something.

Paul wants their daily walk to match the high calling they already have.

🚶 Walk means a whole direction of life
👟 Not one choice, but daily steps
⚖️ Worthy means matching something's true value
📖 Their life should match their high calling

## 🎯 Of The Vocation Wherewith Ye Are Called

Vocation here does not mean a job or career.

It means the calling God gave them to belong to Him.

Paul already described this calling across chapters one and two.

Being chosen, adopted, and brought near to God are all part of it.

This verse asks them to actually live out what they already received.

🎯 Vocation means God's calling, not a job
📜 Chapters one and two already explained it
👨‍👩‍👧 It includes being chosen and adopted
📖 Now they must live out that calling

## 👇 With All Lowliness And Meekness

Lowliness means not thinking too highly of yourself.

Meekness does not mean weakness.

It means having real strength that stays under control.

Paul pairs both words to describe a humility that is strong, not timid.

That kind of humility holds a church together instead of tearing it apart.

👇 Lowliness means not thinking too highly
💪 Meekness means strength under control
🙅 Meekness is not the same as weakness
📖 Strong humility holds a church together

## ⏳ Longsuffering, Forbearing One Another In Love

Longsuffering means staying patient through a long, repeated irritation.

It is not patience for a single hard moment.

Forbearing means putting up with someone's flaws without keeping score.

Paul adds in love so this patience never turns into silent resentment.

Real unity survives by choosing patience again and again.

⏳ Longsuffering means patience over a long time
🙇 Forbearing means overlooking someone's flaws
🚫 Not patience that quietly keeps score
📖 Unity survives through repeated patient choices

## 💪 Endeavouring To Keep The Unity Of The Spirit

Endeavouring means making a real effort, not just hoping it happens.

Paul does not say create unity.

He says keep it, because the unity already exists through the Spirit.

Believers cannot manufacture this oneness themselves.

They can only guard what God has already made true.

💪 Endeavouring means making a real effort
🙅 Not create unity, but keep it
🕊️ The Spirit already made them one
📖 Believers guard unity, not build it

## 🪢 The Bond Of Peace

A bond pictures something tied tightly together, like a rope or a knot.

Peace is the rope holding the unity of the Spirit in place.

Without that bond, differences between believers could easily pull a church apart.

Paul pictures peace as the very thing keeping the whole body intact.

🪢 Bond pictures a rope tied tight
🕊️ Peace is the rope in this picture
⚠️ Differences could pull people apart
📖 Peace holds the whole body together

## 🧩 There Is One Body, And One Spirit

Paul stacks several different ones in a row on purpose.

One body means the whole church functions as a single living group.

One Spirit means every believer shares the same indwelling presence of God.

One hope means every believer looks forward to the exact same future.

Stacking these ones together paints one complete picture of unity.

🧩 Paul stacks several ones together on purpose
⛪ One body means one united church
🕊️ One Spirit means one shared presence
📖 Together they paint one complete picture

## 👑 One Lord, One Faith, One Baptism

These three ones describe what every believer shares in common.

One Lord means every believer answers to the same risen Christ.

One faith means the same core beliefs, not personal customized versions.

One baptism points to the same entry point every believer passes through.

Nobody believes in a private version of faith here.

👑 One Lord means the same risen Christ
📜 One faith means the same core beliefs
💧 One baptism means the same entry point
📖 Nobody gets a private version of faith

## 🏠 Above All, And Through All, And In You All

Paul describes the Father in three different ways in one line.

Above all means God rules over everything that exists.

Through all means God is active in everything that happens.

In you all means God actually lives inside each believer personally.

This closes the sevenfold list on the highest possible note.

👑 Above all means God rules everything
🔄 Through all means God works in everything
🏠 In you all means God lives inside believers
📖 The list ends on the highest note

# Ephesians 4:7-10
# 👑 The Victorious Christ Gives Gifts
---
## 🎁 Unto Every One Of Us Is Given Grace

Grace here does not mean saving grace alone.

It means a specific gift or ability handed to each believer.

Paul says every single believer receives one, not just apostles or leaders.

Nobody in the church is left out of this distribution.

🎁 Grace here means a specific ability
🙅 Not reserved for apostles or leaders
👥 Every believer receives one
📖 Nobody in the church is left out

## 📏 According To The Measure Of The Gift Of Christ

Measure means a portion sized on purpose, not a random amount.

Christ decides how much of this gift each person receives.

Different believers get different measures, and that is intentional.

Comparing gifts with another believer misses the whole point.

📏 Measure means a portion sized on purpose
✝️ Christ decides each person's portion
🔀 Different believers get different amounts
📖 Comparing gifts misses the real point

## 📜 Wherefore He Saith

Paul is about to quote an Old Testament passage directly.

Wherefore he saith signals a quotation is coming next.

The words that follow come from Psalm sixty eight.

Paul applies an old victory song to Christ himself.

📜 Paul signals a coming quotation
📖 The quote comes from Psalm sixty eight
✝️ He applies it directly to Christ
➡️ An old song becomes a new picture

## ⬆️ When He Ascended Up On High

Ascended means Christ rose up into heaven after his resurrection.

Up on high points to the highest possible place, God's own throne.

This moment comes after Christ already defeated death on the cross.

The ascension is Christ returning to glory as a victorious king.

⬆️ Ascended means rising up to heaven
👑 Up on high points to God's throne
✝️ This followed his victory over death
📖 The ascension crowns Christ as king

## 🎖️ He Led Captivity Captive

This phrase pictures an ancient victory parade.

A winning general would march defeated enemies through the streets as captives.

Here Christ leads sin, death, and the power of Satan as his own captives.

The very things that once held people captive are now defeated themselves.

🎖️ Pictures a general's victory parade
⚔️ Defeated enemies were marched as captives
⛓️ Christ leads sin and death as captives
📖 What once captured people is now defeated

## 🏆 Gave Gifts Unto Men

After winning the battle, a king would hand out rewards to his people.

Christ follows that same pattern after his own victory.

The gifts mentioned here are spiritual abilities given to believers.

Verse eleven names some of them specifically.

🏆 Winning kings handed out rewards
🎁 Christ gives gifts after his victory
✨ These gifts are spiritual abilities
📖 Verse eleven names some by name

## 🤔 He Also Descended First Into The Lower Parts Of The Earth

This phrase has puzzled readers for a long time.

Many scholars believe it points to Christ's incarnation, coming down to earth as a human.

Others believe it points to Christ going among the dead before his resurrection.

Either way, Christ went down before he went up.

🤔 This phrase has puzzled readers for centuries
👶 Many scholars see Christ's incarnation here
⚰️ Others see Christ among the dead
📖 Either way, Christ went down before up

## 🔁 The Same Also That Ascended Up Far Above All Heavens

Paul makes sure no one confuses who went down with who came back up.

The exact same person who descended is the one who ascended.

Far above all heavens means Christ now holds the highest possible place.

No rival power sits above him anywhere.

🔁 The same person went down and up
👤 Paul removes any confusion about who
🔝 Far above all heavens means the highest place
📖 No rival power stands above Christ

## 🌊 That He Might Fill All Things

Fill all things already appeared back in chapter one.

There Paul described Christ filling all in all.

Christ's rule and presence now reach every corner of creation.

Nothing lies outside his authority or his reach.

🌊 Fill all things appeared in chapter one
🔁 Paul repeats that same picture here
🌍 Christ's reach covers all creation
📖 Nothing lies outside his authority

# Ephesians 4:11-13
# 🧰 Gifts For Growing The Church
---
## 📨 Some, Apostles

Apostle means someone personally sent out with a specific mission and authority.

In the New Testament, this title usually names the first eyewitnesses of the risen Christ.

These were foundational leaders who helped start the church from nothing.

Their role shaped the whole early church's direction.

📨 Apostle means someone sent with authority
👁️ They were eyewitnesses of the risen Christ
🏗️ They helped found the early church
📖 Their role shaped the church's direction

## 🗣️ Some, Prophets

A New Testament prophet is not primarily a fortune teller.

The role mainly means speaking a message straight from God to His people.

Sometimes that message includes something about the future.

More often it means calling people back to truth right now.

🗣️ Prophet means speaking God's message
🔮 Not mainly about predicting the future
📢 Often means calling people to truth now
📖 The focus is God's message, not mystery

## 📣 Some, Evangelists

Evangelist comes from a word meaning someone who announces good news.

This role focused on traveling and spreading the gospel to new places.

Unlike pastors, evangelists were not tied to one local church.

Their job was reaching people who had never heard the message before.

📣 Evangelist means announcing good news
🚶 This role involved regular traveling
🏠 Not tied to one local church
📖 Their job was reaching new people

## 🐑 Some, Pastors And Teachers

Pastor comes from a word meaning shepherd, someone who cares for a flock.

Teacher describes someone who explains and applies God's word clearly.

Many scholars believe this phrase names one single role with two functions, not two separate offices.

A good local leader shepherds people and teaches them at the same time.

🐑 Pastor means shepherd, someone who cares
📖 Teacher means explaining God's word clearly
🤝 Many scholars see this as one role
➡️ Local leaders shepherd and teach together

## 🧰 For The Perfecting Of The Saints

Perfecting does not mean making someone instantly sinless.

It means fully equipping someone for the task they are meant to do.

These leadership roles exist to train regular believers, not replace their work.

Every believer has work to do, not just the leaders listed above.

🧰 Perfecting means fully equipping, not sinless
🙅 Not about instant sinless perfection
👥 Leaders train believers, not replace them
📖 Every believer has real work to do

## 🏗️ For The Edifying Of The Body Of Christ

Edifying comes from a word used for constructing a building.

Each believer's growth adds another piece to something being built together.

The body of Christ names the church as one connected whole.

No single gift or person builds the whole structure alone.

🏗️ Edifying means building, like a structure
🧱 Each believer adds another piece
⛪ Body of Christ means the whole church
📖 No single person builds it alone

## 📜 Till We All Come In The Unity Of The Faith

Unity of the faith means shared belief in the same core truths.

This differs from the unity of the Spirit mentioned earlier in the chapter.

That unity already exists through the Spirit from the moment someone believes.

This unity in belief is something the church grows toward together over time.

📜 Unity of faith means shared core beliefs
🔁 Different from the unity named earlier
🌱 This unity grows over time
📖 The church reaches it together

## 📏 Unto The Measure Of The Stature Of The Fulness Of Christ

Stature pictures full physical growth, like a child becoming an adult.

Paul uses that picture for spiritual growth instead of physical growth.

Fulness of Christ sets the highest possible target for that growth.

The goal is not merely avoiding sin but actually resembling Christ fully.

📏 Stature pictures growing into an adult
🌱 Paul applies this to spiritual growth
🎯 Fulness of Christ is the target
📖 The goal is resembling Christ fully

# Ephesians 4:14-16
# 🧱 Growing Up Into The Head
---
## 👶 No More Children

Paul is not insulting children themselves here.

He is describing spiritual immaturity, easily confused and easily misled.

A believer stuck here cannot tell truth from a convincing lie.

Growing up spiritually means no longer needing someone else to do all the thinking.

👶 Not an insult toward real children
🌀 Pictures easily confused spiritual immaturity
🤷 Immature believers cannot spot a lie
📖 Growth means thinking clearly for yourself

## ⛵ Tossed To And Fro, And Carried About With Every Wind Of Doctrine

This pictures a small boat with no anchor on a stormy sea.

Every new wind of teaching pushes it in a different direction.

Doctrine means a teaching or a belief being taught as true.

Without a firm foundation, a person drifts toward whatever sounds convincing at the moment.

⛵ Pictures a boat without an anchor
🌬️ Every wind pushes it off course
📚 Doctrine means a taught belief
📖 Without a foundation, people drift around

## 🎩 By The Sleight Of Men, And Cunning Craftiness

Sleight comes from the same idea behind sleight of hand tricks.

It means a deliberate move designed to fool someone watching.

Craftiness adds the idea of a clever, scheming plan behind it.

Paul warns that some false teaching is not an honest mistake, it is calculated.

🎩 Sleight means a deliberate hand trick
👀 It is designed to fool onlookers
🧠 Craftiness means a clever, scheming plan
📖 Some false teaching is calculated, not honest

## 🏹 Lie In Wait To Deceive

This phrase pictures a hunter hiding and waiting for prey to pass by.

The deception described here is not accidental or careless.

It is patient, planned, and aimed directly at vulnerable believers.

Spiritual immaturity makes a person an easier target for exactly this kind of trap.

🏹 Pictures a hunter hiding and waiting
🎯 The deception is planned, not accidental
😬 It targets vulnerable believers on purpose
📖 Immaturity makes someone an easier target

## ⚖️ Speaking The Truth In Love

Paul pairs two things that do not always travel together.

Truth without love can turn harsh and wound people unnecessarily.

Love without truth can turn soft and let real error slide.

Spiritual maturity holds both firmly at the exact same time.

⚖️ Paul pairs truth and love together
🗣️ Truth alone can turn harsh
💔 Love alone can let error slide
📖 Maturity holds both at once

## 🧠 Grow Up Into Him In All Things, Which Is The Head, Even Christ

Head here does not just mean a leader giving orders from a distance.

A human head directs every single part of the body it is attached to.

Paul already used this same head and body picture back in chapter one.

Growth means the church increasingly matching the direction Christ actually gives it.

🧠 Head means more than a distant leader
🫀 A head directs every part of a body
🔁 Paul already used this picture before
📖 Growth means matching Christ's direction

## 🦴 The Whole Body Fitly Joined Together And Compacted

Fitly joined pictures bones and joints fitting together exactly as designed.

Compacted adds the idea of everything held firmly in place, nothing loose.

Paul is describing the church with the same precision used for a human body.

No part of that body was placed there by accident.

🦴 Fitly joined pictures bones fitting exactly
🔗 Compacted means held firmly, nothing loose
🫂 Paul compares the church to a body
📖 No part was placed there by accident

## 🦾 By That Which Every Joint Supplieth

A joint connects two parts and lets the whole body move together.

Supplieth means actively providing something the rest of the body needs.

Paul is saying every single believer supplies something the church cannot do without.

This is not a job reserved for pastors or apostles alone.

🦾 A joint connects and moves the body
🤝 Supplieth means actively providing something needed
👥 Every believer supplies something necessary
📖 This is not a job for leaders only

## 📈 Maketh Increase Of The Body Unto The Edifying Of Itself In Love

Increase here means real spiritual growth, not just more people showing up.

That growth happens through every member doing its part, not through one leader alone.

Paul closes this thought exactly where he opened it, in love.

Love is both the method and the result of a healthy, growing church.

📈 Increase means real growth, not headcount
🧩 Growth happens through every member's part
🔁 Paul opens and closes on love
📖 Love is the method and the result

# Ephesians 4:17-19
# 🌑 The Old Way Of Life
---
## ⚖️ This I Say Therefore, And Testify In The Lord

Testify is a courtroom word, used for giving sworn, serious evidence.

Paul is not offering a casual opinion here.

He speaks with the full weight of his authority as Christ's messenger.

What follows next matters enough to state as a flat, solemn fact.

⚖️ Testify is a courtroom word for evidence
🙅 Not a casual personal opinion
✝️ Paul speaks with Christ's own authority
📖 What follows is stated as solemn fact

## 🌍 Walk Not As Other Gentiles Walk

Gentiles here means people outside the Jewish faith, living by the culture around them.

Most of the Ephesian believers were Gentiles themselves before coming to Christ.

Paul is not attacking their background.

He is telling them not to return to the old pattern of life they left.

🌍 Gentiles means people outside the Jewish faith
👥 Most Ephesians were Gentiles themselves
🙅 Not an attack on their background
📖 Do not return to the old pattern

## 💨 In The Vanity Of Their Mind

Vanity means emptiness, something that promises value but delivers nothing real.

Paul pictures a mind constantly chasing things that cannot actually satisfy.

This is not about simple foolishness or a lack of intelligence.

It describes a whole way of thinking built on something hollow.

💨 Vanity means emptiness, promising nothing real
🏃 Pictures a mind chasing empty things
🙅 Not about low intelligence
📖 A whole way of thinking built hollow

## 🌑 Having The Understanding Darkened

Understanding here means the mind's ability to see truth clearly.

Darkened pictures a light that has been deliberately blocked out.

This darkness did not happen by accident or bad luck.

A mind can slowly lose its ability to recognize truth over time.

🧠 Understanding means seeing truth clearly
🌑 Darkened pictures light being blocked
🚫 This did not happen by accident
📖 A mind can lose clarity over time

## 🚪 Alienated From The Life Of God Through The Ignorance That Is In Them

Alienated means cut off and treated like a stranger.

This describes separation from the life God offers, not from God's existence.

The ignorance named here is not innocent lack of information.

Paul means a willful refusal to know what could be known.

🚪 Alienated means cut off like a stranger
✝️ Cut off from God's life, not his existence
🙅 This ignorance is not innocent
📖 It is a willful refusal to know

## ❤️ Because Of The Blindness Of Their Heart

Heart in the Bible usually means the whole inner person, not just emotion.

It includes someone's will, their choices, and their thinking.

Blindness here describes a heart that has chosen not to see.

This whole chain starts with a choice, not a simple accident.

❤️ Heart means the whole inner person
🧭 It includes will, choices, and thinking
🙈 Blindness describes a chosen refusal to see
📖 The whole chain starts with a choice

## 🔥 Who Being Past Feeling

Past feeling describes a conscience that has gone numb.

Think of skin that has been burned so many times it stops registering pain.

A conscience can reach that same point through repeated, ignored warnings.

Once numb, a person no longer feels the usual alarm before doing wrong.

🔥 Pictures skin too burned to feel pain
🧭 A conscience can go numb the same way
🔇 Repeated ignored warnings cause the numbness
📖 A numb conscience no longer sounds an alarm

## 🔓 Given Themselves Over Unto Lasciviousness

Lasciviousness describes unrestrained sexual sin with no self control attached.

Given themselves over means this was not forced on them from outside.

It describes a willing, repeated surrender to this pattern of life.

Paul traces this all the way back to the darkened mind named earlier.

🔓 Lasciviousness means unrestrained sexual sin
🙋 Given over means a willing surrender
🔁 It became a repeated pattern of life
📖 It traces back to the darkened mind

## 🧫 To Work All Uncleanness With Greediness

Uncleanness describes moral impurity that spreads into every area of life.

Greediness here is not only about money.

It describes an appetite that is never satisfied no matter how much it gets.

Sin promises satisfaction but always demands more than it gives.

🧫 Uncleanness means impurity spreading everywhere
💰 Greediness is not only about money
🕳️ It describes an appetite never satisfied
📖 Sin always demands more than it gives

# Ephesians 4:20-24
# 👕 Putting Off The Old, Putting On The New
---
## 📚 Ye Have Not So Learned Christ

Learning Christ here does not mean memorizing facts about him.

It means an actual relationship, the way knowing a person differs from knowing facts about them.

Paul says that true relationship simply does not produce the old Gentile pattern of life.

Real knowledge of Christ changes behavior, not just information.

📚 Not about memorizing facts
🤝 It means a real relationship
🙅 That relationship does not match old patterns
📖 Real knowledge changes behavior, not facts

## 👂 If So Be That Ye Have Heard Him

Heard him describes an ongoing relationship, not a single lecture from long ago.

Paul pictures Christ as someone still speaking into their daily life.

This phrase assumes a continuing conversation, not a memory of one sermon.

Faith keeps listening long after the first moment of believing.

👂 Heard him means an ongoing relationship
🙅 Not a memory of one lecture
🗣️ Christ keeps speaking into daily life
📖 Faith keeps listening after it begins

## ✝️ Taught By Him, As The Truth Is In Jesus

Paul could have simply said as the truth is written down.

Instead he says the truth is in Jesus, a person rather than a book.

Jesus himself is the standard every other teaching gets measured against.

Truth, for Paul, has a face and a name.

📖 Paul names truth as a person
✝️ Jesus is the measure for all teaching
🙅 Not simply truth written in a book
➡️ Truth has a face and a name

## 👕 Put Off Concerning The Former Conversation

Conversation in this old English usage does not mean talking.

It means a whole way of living, someone's conduct and daily habits.

Put off pictures taking off a piece of clothing on purpose.

Paul is describing a deliberate choice to remove an old way of living.

🗣️ Conversation here means conduct, not talking
👕 Put off pictures removing clothing
🎯 This is a deliberate, chosen act
📖 It targets a whole way of living

## 👤 The Old Man

Old man does not describe someone literally aging in years.

It describes a person's former identity before coming to Christ.

That identity was shaped entirely by the sin and emptiness named earlier in this chapter.

Paul treats that former self as something to be put away for good.

👤 Old man means a former identity
🙅 Not about literal age
🌑 Shaped by the sin named earlier
📖 Meant to be put away for good

## 🍎 Which Is Corrupt According To The Deceitful Lusts

Corrupt pictures something rotting, like fruit that looks fine outside but is spoiled within.

That picture fits sin perfectly, it can look appealing while quietly decaying a person's life.

Deceitful lusts means desires that promise satisfaction but never actually deliver it.

The old man's decay comes directly from trusting those false promises.

🍎 Corrupt pictures fruit rotting inside
👀 Sin can look fine while decaying inside
🎭 Deceitful lusts promise what they cannot give
📖 Trusting false promises causes the decay

## 🔄 Be Renewed In The Spirit Of Your Mind

Renewed describes an ongoing process, not a one time event.

This happens in the mind, the actual way a person thinks and reasons.

Paul already described a darkened mind earlier in this chapter.

This renewal is the direct reversal of that darkness.

🔄 Renewed means an ongoing process
🧠 The mind is where renewal happens
🌑 It directly reverses the earlier darkness
📖 Thinking changes before living changes

## 👔 Put On The New Man

Put on pictures getting dressed in new clothing on purpose each day.

This is not something that happens automatically once someone believes.

It requires a repeated, conscious choice, the same way putting off did.

Old and new cannot both be worn at the same time.

👔 Put on pictures getting dressed deliberately
🔁 This is a repeated, daily choice
⚖️ Old and new cannot both be worn
📖 Choosing one means leaving the other

## 🪞 Which After God Is Created In Righteousness And True Holiness

After God means made according to God's own pattern or likeness.

This echoes the exact language used for humanity's original creation in Genesis.

Paul describes this new identity as a fresh creation, not a simple self improvement project.

Righteousness and true holiness describe a life actually matching God's own character.

🪞 After God means made in His likeness
📜 This echoes the Genesis creation language
🌱 It describes a fresh creation, not improvement
📖 The goal is matching God's character

# Ephesians 4:25-28
# ✋ New Hands For Old Habits
---
## 👕 Putting Away Lying

Paul uses the same put off language from the verses just before this.

Lying is the first specific old man habit named.

It is not a small, isolated issue in Paul's eyes.

It sits right at the top of the list because it damages trust fastest.

👕 Paul reuses the put off language
🥇 Lying is named first on this list
🙅 Not treated as a small issue
📖 It damages trust the fastest

## 🏠 Speak Every Man Truth With His Neighbour

Neighbour here mainly points to fellow believers inside the same church.

Paul is not giving a general rule about strangers on the street first.

He is addressing how Christians treat the people closest to them.

Truthfulness inside the church community matters most here.

🏠 Neighbour mainly means fellow believers
🙅 Not mainly about strangers on the street
⛪ This addresses life inside the church
📖 Truth matters most with those closest

## 🫀 For We Are Members One Of Another

Members here means body parts, continuing the body picture from earlier.

Lying to another believer is like one hand lying to the other hand.

That kind of lie does not just hurt one person.

It damages the whole body everyone shares together.

🫀 Members means body parts, like before
✋ Lying is like one hand lying to another
⚠️ It damages more than one person
📖 The whole shared body gets hurt

## 😠 Be Ye Angry, And Sin Not

Paul does not command believers to never feel angry.

Anger itself is not treated here as automatically sinful.

The danger is not the emotion but what a person does with it.

Scripture allows room for real anger at real wrong.

😠 Anger itself is not banned here
🙅 Not automatically treated as sin
⚠️ The danger is what anger leads to
📖 Real wrong can produce real anger

## 🌅 Let Not The Sun Go Down Upon Your Wrath

Wrath describes anger that has been allowed to sit and grow.

This phrase pictures dealing with anger before the same day ends.

Anger left overnight tends to harden into something much harder to resolve.

Paul gives a practical deadline instead of a vague warning.

🌅 Pictures resolving anger before day's end
🔥 Wrath means anger allowed to grow
🧊 Overnight anger hardens and gets worse
📖 Paul gives a real deadline, not vague

## 🚪 Neither Give Place To The Devil

Give place means leaving an opening or a doorway unguarded.

Unresolved anger works like an unlocked door in a person's life.

Paul is not saying anger itself invites the devil in automatically.

He is saying anger left to sit becomes the opening the devil uses.

🚪 Give place means leaving an opening
🔓 Unresolved anger works like an unlocked door
🙅 Not anger itself, but anger left unchecked
📖 That opening becomes the devil's opportunity

## 🤲 Let Him That Stole Steal No More

This verse addresses real former thieves inside this congregation.

Stealing was common in the pagan culture many Ephesians came out of.

Paul assumes some believers genuinely need this specific instruction.

Coming to Christ does not erase old habits overnight.

🤲 This addresses real former thieves
🌍 Stealing was common in their old culture
👥 Paul assumes some truly need this
📖 Old habits do not vanish overnight

## ✋ Rather Let Him Labour, Working With His Hands The Thing Which Is Good

Paul does not just tell the former thief to stop.

He gives a specific replacement, honest physical work.

Simply removing a bad habit leaves an empty space behind.

That empty space needs to be filled with something good on purpose.

✋ Paul gives honest labor as a replacement
🙅 Stopping alone is not the whole answer
🕳️ Removing a habit leaves an empty space
📖 Good habits must fill that space

## 🔄 That He May Have To Give To Him That Needeth

This verse quietly flips the thief's whole purpose for working.

Before, he took from others to get what he wanted.

Now, he works so he can give to others who are in need.

The same hands that once stole now provide for someone else.

🔄 This flips the thief's whole purpose
🤲 He once took, now he gives
❤️ Work now serves someone else's need
📖 The same hands now provide instead of steal

# Ephesians 4:29-32
# ❤️ Words That Build, Hearts That Forgive
---
## 🍎 No Corrupt Communication Proceed Out Of Your Mouth

Corrupt uses the same picture from earlier in this chapter, something rotting.

Here it describes speech that spreads decay instead of life.

This covers more than just lying or cursing.

It includes anything spoken that quietly damages the people who hear it.

🍎 Corrupt reuses the earlier rotting picture
🗣️ It describes decaying, harmful speech
🙅 More than just lying or cursing
📖 It covers anything that damages listeners

## 🏗️ That Which Is Good To The Use Of Edifying

Edifying returns to the building picture used earlier in this chapter.

Good speech here means words that help construct something in another person.

Every conversation either builds someone up or wears them down a little.

Paul wants speech aimed only at the first option.

🏗️ Edifying reuses the building picture
🧱 Good speech constructs something in others
⚖️ Every word either builds or wears down
📖 Paul calls for speech that only builds

## 🎁 That It May Minister Grace Unto The Hearers

Minister here means actively serving someone, like delivering something they need.

Grace pictures a gift being handed to the person listening.

Paul treats ordinary conversation as a real opportunity to bless someone.

Words can function as an actual gift, not just information passed along.

🎁 Minister grace means delivering a gift
👂 The hearer actually receives something
💬 Ordinary talk can become a real gift
📖 Words can bless, not just inform

## 😢 Grieve Not The Holy Spirit Of God

Grieve means to cause real sorrow, the kind one person feels over another.

This word only makes sense if the Spirit is an actual person, not a force.

Paul treats sin as something that genuinely affects a relationship with God.

The Spirit responds to a believer's choices the way someone close to you would.

😢 Grieve means causing real sorrow
🕊️ This proves the Spirit is a person
🙅 Not simply breaking an impersonal rule
📖 The Spirit responds like someone who loves you

## 🏷️ Whereby Ye Are Sealed Unto The Day Of Redemption

Paul already explained this same sealing back in chapter one.

A seal in the ancient world marked something as officially owned and protected.

This seal guarantees a future day when redemption is fully completed.

Grieving the Spirit does not cancel that seal, but it does strain the relationship.

🔁 Paul already explained sealing in chapter one
🏷️ A seal marked official ownership
📅 It guarantees redemption's final day
📖 Grieving the Spirit still strains the relationship

## 📉 Let All Bitterness, And Wrath, And Anger, And Clamour, And Evil Speaking, Be Put Away

This list moves from quiet to loud, step by step.

Bitterness is resentment that stays hidden and simmers under the surface.

Clamour describes a loud, public outburst anyone nearby can hear.

Paul wants the whole chain removed, not just the loudest part of it.

📉 The list moves from quiet to loud
😶 Bitterness simmers hidden under the surface
📢 Clamour means a loud public outburst
📖 Paul removes the whole chain, not one piece

## 🖤 With All Malice

Malice means a deliberate wish to see harm come to someone.

It goes further than simply feeling annoyed or upset.

Malice plans and hopes for someone else's actual loss.

Paul places it last because it is the darkest point this chain can reach.

🖤 Malice means wishing real harm on someone
😤 It goes beyond simple annoyance
🎯 It actively hopes for someone's loss
📖 Paul names it as the darkest point

## 🤝 Be Ye Kind One To Another, Tenderhearted

Kind describes action, practical goodness shown to another person.

Tenderhearted comes from an old phrase describing deep inward compassion.

Ancient writers often pictured the inward organs as the seat of real emotion.

Paul pairs a visible action with the inward feeling that should drive it.

🤝 Kind describes practical, visible goodness
❤️ Tenderhearted pictures deep inward compassion
🫀 Ancient writers located emotion there
📖 Visible action should match inward feeling

## ✝️ Forgiving One Another, Even As God For Christ's Sake Hath Forgiven You

Paul sets the standard for forgiveness as high as it can possibly go.

The model is not how deserving the other person seems.

The model is how God forgave them through Christ, undeserved and complete.

That same undeserved, complete forgiveness is now the pattern they owe each other.

🏔️ Paul sets the highest possible standard
🙅 Not based on who deserves it
✝️ God's forgiveness through Christ is the model
📖 That same pattern now applies to others
`.trim();

export const EPHESIANS_FOUR_PERSONAL_SECTIONS = parseEphesiansFourRawNotes(EPHESIANS_FOUR_RAW_NOTES);
