export type ColossiansOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseColossiansOneRawNotes(rawText: string): ColossiansOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ColossiansOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Colossians\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Colossians 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Colossians\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Colossians\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Colossians 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Colossians 1:${startVerse}` : `Colossians 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Colossians 1 sections, received " + sections.length);
  }

  return sections;
}

const COLOSSIANS_ONE_RAW_NOTES = `# Colossians 1:1-2
# 🙏 Grace And Peace To Colosse
---
## ✉️ Paul, An Apostle Of Jesus Christ By The Will Of God

Apostle means someone sent out personally with an official message.

It was not a job Paul chose for himself.

By the will of God means God himself chose and sent him.

That claim matters because the Colossians had never met Paul in person.

📨 Apostle means someone personally sent

🚫 Paul did not choose this role

✝️ God himself chose and sent him

📖 A stranger writes with real authority

## 👦 Timotheus Our Brother

Timotheus is the King James spelling of Timothy.

He was a young pastor Paul trained and trusted deeply.

Paul often lists him as a co sender on his letters.

Naming him here shows the Colossians a familiar, trusted name alongside Paul's own.

👦 Timotheus is the King James Timothy

🎓 Paul trained him personally

✉️ He is named as a co sender

📖 A trusted name stands beside Paul's

## 🗺️ To The Saints And Faithful Brethren Which Are At Colosse

Saints simply means people set apart for God, not people who are already perfect.

Faithful brethren adds a second description, believers who stayed loyal and true.

Colosse was a city in what is now modern Turkey.

It sat in the Lycus river valley, near the larger cities of Laodicea and Hierapolis.

Paul most likely never visited Colosse himself.

✨ Saints means set apart, not perfect

🤝 Faithful brethren means loyal believers

🗺️ Colosse sat in modern Turkey

📖 Paul likely never visited this church

## 🎁 Grace Be Unto You, And Peace

Grace was the normal greeting word in Greek letters of this time.

Peace was the normal greeting word in Hebrew and Jewish culture.

Paul joins both greetings together into one line.

That single greeting already points to Jew and Gentile united in one church.

From God our Father names the true source behind both gifts.

🎁 Grace was the common Greek greeting

🕊️ Peace was the common Hebrew greeting

🤝 Paul joins both into one line

📖 Jew and Gentile are united here

# Colossians 1:3-8
# 📜 Thanks For Their Faith And Love
---
## 🙏 Praying Always For You

Paul did not pray for the Colossians once and move on.

Always means this prayer was a constant habit, not a single moment.

He also thanks God and the Father of our Lord Jesus Christ before asking for anything.

Thanks comes first, before any request follows later in the prayer.

🙏 Paul prayed for them constantly

🔁 Always means a constant habit

🎁 Thanks comes before any request

📖 Gratitude opens this whole prayer

## 🙏 Your Faith In Christ Jesus

Faith here means a settled trust placed directly in Christ Jesus.

It is not just agreeing with facts about him in your head.

Paul pairs this faith immediately with a second quality, love for others.

Belief in Christ and love for people always belong together in Paul's letters.

🙏 Faith means settled trust in Christ

🧠 It is more than agreeing with facts

❤️ Paul pairs faith with love

📖 Belief and love always travel together

## ❤️ The Love Which Ye Have To All The Saints

This love was not limited to close friends or favorite people.

All the saints means every believer, even ones never personally met.

Love in the early church often crossed lines of race, class, and background.

That wide love was itself unusual enough to be worth reporting to Paul.

❤️ Love reached beyond close friends

👥 All the saints means every believer

🌍 It crossed race, class, and background

📖 This love was worth reporting

## ⏳ The Hope Which Is Laid Up For You In Heaven

Hope in this letter is not wishful thinking about an uncertain future.

Laid up pictures something stored safely away, kept for later.

Think of money placed in a locked safe for safekeeping.

This hope was not something earned, it was something reserved in advance.

⏳ Hope here is not wishful thinking

🔒 Laid up means stored away safely

💰 Picture money kept in a safe

📖 This hope was reserved in advance

## 📰 The Word Of The Truth Of The Gospel

Gospel means good news, a message meant to be announced, not kept quiet.

Word of the truth names this message as reliable, not just one opinion among many.

The Colossians had already heard this exact message before Paul's letter ever arrived.

Epaphras was the one who first brought it to their city.

📰 Gospel means good news announced aloud

✅ Word of truth means reliable, not opinion

👂 They heard this before this letter

📖 Epaphras first brought it to them

## 🌍 Which Is Come Unto You, As It Is In All The World

This same gospel was not a local message made only for Colosse.

It was already spreading across the entire known world of that day.

That detail mattered because other teachers in Colosse offered only secret, local ideas.

Paul points instead to a message already shared everywhere, open to anyone.

🌍 The gospel was not only local

🗺️ It was already spreading worldwide

🤐 Other local teachers offered secret ideas

📖 Paul's gospel was open to everyone

## 🌱 Bringeth Forth Fruit, As It Doth Also In You

Fruit pictures a plant that keeps producing long after it is first planted.

The gospel was not a one time event for the Colossians.

It kept changing lives in their city the same way it changed lives everywhere else.

A real gospel always keeps growing something, it never just sits still.

🌱 Fruit pictures growth that keeps going

🏙️ It changed lives in their city too

🌍 The same thing happened everywhere else

📖 A real gospel never sits still

## 📅 Since The Day Ye Heard Of It, And Knew The Grace Of God In Truth

There was one specific day this understanding began for the Colossians.

Knew the grace of God in truth means they understood grace correctly, not a distorted version.

Other voices in their city were already offering a different, mixed version of grace.

Paul anchors them back to what they first truly understood.

📅 One specific day marked this beginning

✅ They knew grace correctly, in truth

🌀 Other voices offered a mixed version

📖 Paul anchors them to the truth

## 🧑 As Ye Also Learned Of Epaphras Our Dear Fellowservant

Epaphras was likely a Colossian himself, not an outsider sent from elsewhere.

He probably met Paul during Paul's long ministry in nearby Ephesus.

Epaphras then carried the gospel back home to Colosse himself.

Fellowservant means Paul saw him as an equal partner, not a lesser helper.

🧑 Epaphras was likely a local Colossian

🤝 He may have met Paul in Ephesus

🏠 He carried the gospel back home

📖 Paul treated him as an equal

## 🛠️ A Faithful Minister Of Christ

Minister here translates a Greek word meaning servant, the same root behind the word deacon.

Faithful adds that Epaphras could be trusted to do this work well.

He served on behalf of the Colossians, representing their city to Paul.

A servant's title here carries real honor, not a lower rank.

🛠️ Minister means servant, the deacon word

🤝 Faithful means Epaphras could be trusted

🏙️ He served on the Colossians' behalf

📖 A servant's title can carry honor

## 📣 Declared Unto Us Your Love In The Spirit

Epaphras did not just report facts about the Colossians to Paul.

He specifically mentioned their love, a quality anyone can notice in a church.

In the Spirit means this love came from God, not just natural friendliness.

Paul ends this opening report on love, the same quality he praised back in verse four.

📣 Epaphras reported more than bare facts

❤️ He specifically mentioned their love

✝️ In the Spirit means God given

📖 Love opens and closes this report

# Colossians 1:9-14
# 🙏 Paul's Prayer For The Colossians
---
## ⏳ Do Not Cease To Pray For You

Paul already mentioned praying for them back at the start of the letter.

Here he repeats it, showing this was not a one time mention.

Cease means stop, so do not cease means this prayer never stopped.

A prayer kept this consistent proves how much Paul cared for a church he never met in person.

🙏 Paul already mentioned this earlier

🔁 He repeats it for emphasis

⏳ Cease means stop, so this never stopped

📖 Consistent prayer proves real care

## 🧠 Filled With The Knowledge Of His Will

Knowledge here does not mean collecting facts or winning arguments.

It means knowing God's will deeply enough to live differently because of it.

Filled pictures a cup topped all the way to the brim, not half full.

Paul wants their understanding to be complete, not partial.

🧠 Knowledge means more than facts

💧 Filled pictures a cup topped to the brim

🎯 It means living differently because of it

📖 Paul wants complete understanding, not partial

## ✨ In All Wisdom And Spiritual Understanding

Wisdom means knowing how to apply truth to real, everyday situations.

Spiritual understanding means insight that comes from God, not just human reasoning.

Some teachers in Colosse claimed a secret, higher wisdom only a few could reach.

Paul insists the real wisdom is already available to every believer.

🧠 Wisdom means applying truth to real life

✨ Spiritual understanding comes from God

🤐 Some claimed a secret, higher wisdom

📖 Real wisdom is open to everyone

## 🚶 That Ye Might Walk Worthy Of The Lord

Walk is a common Hebrew way of describing someone's whole daily life.

It does not mean literal footsteps, it means a pattern of living.

Worthy of the Lord sets a high and specific standard for that daily pattern.

Paul connects right belief in the earlier verses to right living here.

🚶 Walk means someone's whole daily life

📏 Worthy sets a high standard

🔗 Belief and daily living connect here

📖 Right belief should shape right living

## 🌱 Fruitful In Every Good Work

Fruitful again pictures a plant that keeps producing, the same image used earlier in this letter.

Good work means real action, not just good intentions left undone.

Every good work leaves no category of service as optional.

Faith that never produces action was never Paul's picture of real faith.

🌱 Fruitful pictures a plant still producing

🏗️ Good work means real action

🧩 Every work matters, none is optional

📖 Faith without action was not Paul's picture

## 📈 Increasing In The Knowledge Of God

Increasing means this knowledge keeps growing, it is never finished in this life.

Knowledge of God here means a real, growing relationship, not finished information.

Spiritual growth and increasing knowledge of God move together in this verse.

No believer ever reaches a point of knowing God completely.

📈 Increasing means growth that never finishes

❤️ Knowledge of God means relationship, not facts

🔗 Growth and knowledge move together

📖 No one knows God completely

## 💪 Strengthened With All Might, According To His Glorious Power

Might and power here both describe strength that belongs to God, not to Paul or the Colossians.

Strengthened means this strength is given to them from outside themselves.

Glorious power ties this strength directly back to God's own character.

No believer manufactures this kind of strength on their own.

💪 Might and power belong to God

🎁 Strengthened means given, not self made

✨ Glorious power ties to God's character

📖 No one manufactures this strength alone

## ⏳ Unto All Patience And Longsuffering With Joyfulness

Patience usually means enduring hard circumstances without giving up.

Longsuffering usually means enduring difficult people without losing love for them.

Paul pairs both kinds of endurance together in this one line.

Joyfulness is the surprise, since endurance here never has to feel grim.

⏳ Patience means enduring hard circumstances

🤝 Longsuffering means enduring difficult people

🔗 Paul pairs both kinds of endurance

📖 Joy can exist inside real endurance

## ✅ Partakers Of The Inheritance Of The Saints In Light

Meet is an old word meaning qualified or fit for something.

Inheritance echoes the Promised Land once given to Israel's ancestors.

Partakers means every saint receives a real share, not just a spectator's seat.

In light sets up a direct contrast with the darkness named in the very next verse.

✅ Meet means qualified or fit

🗺️ Inheritance echoes Israel's Promised Land

🤝 Partakers means a real, shared portion

📖 Light sets up the next verse's contrast

## 🌑 Delivered Us From The Power Of Darkness

Power of darkness names a real kingdom opposed to God, not just a bad mood.

Delivered pictures a rescue, like being pulled out of enemy territory.

This rescue already happened, Paul describes it as a finished fact, not a future hope.

Every believer already stands outside that kingdom's reach.

🌑 Power of darkness names a real kingdom

🚁 Delivered pictures a dramatic rescue

✅ This rescue is already finished

📖 Believers already stand outside its reach

## 🚚 Translated Us Into The Kingdom Of His Dear Son

Translated is an old word for being moved from one place to another.

Think of a citizen whose entire nationality changes overnight.

This move was from darkness into the kingdom of Christ himself.

Dear Son shows this new kingdom belongs to someone the Father loves completely.

🚚 Translated means moved from place to place

🪪 Picture a citizen's nationality changing overnight

👑 This kingdom belongs to Christ

📖 Dear Son shows the Father's complete love

## ⛓️ Redemption Through His Blood, Even The Forgiveness Of Sins

Redemption pictures buying back a slave or captive out of real bondage.

A price had to be paid, and that price was never small.

His blood names the price, Christ's own sacrificial death.

Forgiveness of sins explains exactly what that purchased, a complete pardon.

⛓️ Redemption means buying back a captive

💰 A real price had to be paid

🩸 His blood names that exact price

📖 Forgiveness means a complete pardon

# Colossians 1:15-20
# 👑 The Supremacy Of Christ
---
## 🪞 The Image Of The Invisible God

Image here means an exact representation, not a vague resemblance.

No human eye has ever seen God the Father directly.

Christ makes the invisible God visible and knowable to human eyes.

Looking at Jesus means actually looking at what God is like.

🪞 Image means exact representation, not vague

👁️ No one has seen the Father directly

✝️ Christ makes God visible to us

📖 Looking at Jesus shows what God is like

## 👑 The Firstborn Of Every Creature

This does not mean Christ was the first being God created.

Firstborn in this culture usually described rank and honor, not birth order.

Israel itself is called God's firstborn, even though many nations existed earlier.

Firstborn here names Christ's supreme rank over all creation.

🚫 This does not mean first created

👑 Firstborn usually described rank, not birth order

🇮🇱 Israel too was called God's firstborn

📖 Firstborn names Christ's supreme rank

## 🛠️ For By Him Were All Things Created

Christ is named here as the one who made everything that exists.

This includes things visible to human eyes and things that are not.

Some teachers in Colosse treated Christ as only one spiritual being among many.

Paul instead places Christ as the maker of every single one of them.

🛠️ Christ made everything that exists

👀 This covers both visible and invisible things

🤐 Some treated Christ as one being among many

📖 Paul places Christ above them all

## 👼 Thrones, Or Dominions, Or Principalities, Or Powers

These four words likely describe ranks of spiritual and angelic beings.

Ancient readers in Colosse were fascinated with ranking and naming these powers.

Some even taught that these beings deserved worship alongside Christ.

Paul lists all four only to say Christ created every one of them.

👼 These likely name ranks of angelic beings

🤔 Colosse was fascinated with ranking these powers

🙅 Some wrongly taught these beings deserve worship

📖 Christ created every one of them

## ⏳ He Is Before All Things

Before all things means Christ already existed before creation began.

He did not come into existence at his human birth in Bethlehem.

Every created thing, no matter how old, is younger than Christ.

Time itself began after Christ, not the other way around.

⏳ Before all things means already existing

🍼 He did not begin at Bethlehem

🕰️ Every created thing is younger than Christ

📖 Time began after Christ, not before

## 🧩 By Him All Things Consist

Consist here means held together, the way glue holds separate pieces into one.

Christ is not only the creator who started everything long ago.

He is also the one actively holding the universe together right now.

If his hand let go, creation itself would have nothing holding it in place.

🧩 Consist means held together, like glue

🏗️ Christ is not only the starter

✋ He actively holds creation together now

📖 Nothing holds without his hand

## 🧠 The Head Of The Body, The Church

Head and body is a picture of one connected, living thing.

A body cannot think or decide anything apart from its head.

The church is that body, and Christ alone directs it.

No human leader, however gifted, can take the place of the head.

🧠 Head and body picture one living thing

🚫 A body cannot act apart from its head

⛪ The church is that body

📖 No human leader replaces the head

## ⚰️ The Firstborn From The Dead

Others in the Bible were raised and later died again.

Christ was the first to rise into a permanent, unending resurrection life.

Firstborn here signals he is the first of many who will follow.

Everyone who belongs to him will one day rise the same way.

⚰️ Others raised earlier later died again

🌅 Christ rose into unending resurrection life

👥 He is first of many who follow

📖 His people will rise the same way

## 🥇 That In All Things He Might Have The Preeminence

Preeminence means holding first place, ahead of absolutely everything else.

Not just some things, but all things fall under this ranking.

Nothing in creation, no power and no person, outranks Christ.

Every earlier line in this passage was building toward this one point.

🥇 Preeminence means holding first place

🌐 All things fall under this ranking

🚫 Nothing outranks Christ

📖 Every earlier line built toward this

## 🌊 It Pleased The Father That In Him Should All Fulness Dwell

Fulness was a word some teachers in Colosse used for their own ideas.

They taught that spiritual fulness was spread out among many lesser beings.

Paul instead says the entire fulness of God dwells in Christ alone.

Nothing is missing from Christ that any other being could supply.

🌊 Fulness was a word misused in Colosse

🧩 They spread fulness among lesser beings

✝️ Paul places all fulness in Christ alone

📖 Nothing is missing that others could add

## 🕊️ Having Made Peace Through The Blood Of His Cross

Peace here was not a feeling, it was a legal and real end to hostility.

Blood of his cross names the exact price that peace required.

A real death was necessary, not a symbolic gesture or a kind word.

God's own justice was satisfied through that one real sacrifice.

🕊️ Peace here means a real end to hostility

🩸 The cross named the price required

⚰️ A real death, not a symbol, was needed

📖 God's justice was satisfied there

## 🔗 To Reconcile All Things Unto Himself

Reconcile means bringing back together something that had been broken apart.

All things here reaches further than just individual people and their sins.

Paul describes creation itself as caught up in this same reconciliation.

Christ's cross touches things in earth and things in heaven both.

🔗 Reconcile means restoring something broken

🌍 All things reaches beyond individual people

🌌 Creation itself is caught up in this

📖 Earth and heaven are both touched

# Colossians 1:21-23
# 🔗 Once Enemies, Now Reconciled
---
## 🚫 Sometime Alienated And Enemies In Your Mind

Alienated means estranged, cut off from a relationship that should exist.

This hostility lived first in the mind, in how they thought about God.

Wicked works followed later, actions that grew out of that inner hostility.

The problem started inside, long before it ever showed up in behavior.

🚫 Alienated means estranged, cut off

🧠 Hostility began in the mind first

⚡ Wicked works followed that inner hostility

📖 The problem started inside first

## 🔄 Yet Now Hath He Reconciled

Yet now marks a clear turning point, a before and an after.

Reconciled means the hostility named in the line before is already over.

This change came entirely from God's side, not from their own effort.

Enemies do not usually reconcile themselves, someone else has to act first.

🔄 Yet now marks a clear turning point

✅ Reconciled means the hostility is over

🎁 This change came from God's side

📖 Someone else had to act first

## ✝️ In The Body Of His Flesh Through Death

This reconciliation did not happen through an idea or a feeling.

It happened through Christ's own physical body, through a real death.

Some teachers in Colosse treated the physical body as unimportant or even bad.

Paul insists a real body and a real death accomplished this peace.

✝️ Reconciliation came through a real death

👤 It happened in Christ's own body

🙅 Some wrongly treated the body as unimportant

📖 A real death accomplished real peace

## 🎁 To Present You Holy And Unblameable And Unreproveable

Present pictures something brought forward for careful inspection, like a finished piece of work.

Holy means set apart completely for God.

Unblameable and unreproveable both describe a record with no charge that can stick.

Three close words pile up here to describe one complete kind of innocence.

🎁 Present pictures something brought for inspection

✨ Holy means set apart for God

📋 Unblameable and unreproveable mean no charge sticks

📖 Three words describe one complete innocence

## 🏗️ If Ye Continue In The Faith Grounded And Settled

Continue makes clear that real faith is not just a one time decision.

Grounded pictures a building resting on a solid foundation underground.

Settled pictures that same building finished and no longer shifting.

A faith like that can survive pressure that would move a weaker one.

🏗️ Continue means faith is not one time

🧱 Grounded pictures a solid foundation

🏠 Settled pictures a finished, steady building

📖 This kind of faith survives real pressure

## 🌐 Preached To Every Creature Which Is Under Heaven

This line almost certainly uses deliberate, sweeping language, not a literal headcount.

Paul means the gospel had already reached remarkably far across the known world.

That wide reach mattered because some in Colosse claimed only a few could access real truth.

Paul answers that claim with a gospel already offered everywhere, to anyone.

🌐 This uses sweeping, not literal, language

🗺️ The gospel reached far across the world

🔒 Some claimed truth was only for a few

📖 Paul's gospel was offered to anyone

# Colossians 1:24-29
# 💪 Paul's Labor For The Hidden Mystery
---
## ⛓️ Who Now Rejoice In My Sufferings For You

Paul was likely writing this letter from inside a Roman prison.

Rejoice here is a surprising word choice for someone suffering for others.

His suffering was not wasted pain, it directly served the Colossians.

Joy and suffering sit together in Paul's mind without any contradiction.

⛓️ Paul likely wrote this from prison

😊 Rejoice is a surprising word choice here

🎁 His suffering directly served the Colossians

📖 Joy and suffering coexist without contradiction

## 🚫 That Which Is Behind Of The Afflictions Of Christ

This does not mean Christ's own sacrifice for sin was somehow incomplete.

Christ's work on the cross already fully paid for sin.

Afflictions of Christ here means the ongoing suffering his church still faces.

Paul saw his own suffering as sharing directly in that ongoing experience.

🚫 This does not mean Christ's sacrifice lacked anything

✅ The cross already fully paid for sin

⛪ The church still faces ongoing suffering

📖 Paul shared directly in that suffering

## 🧩 For His Body's Sake, Which Is The Church

Body here is the same picture already used earlier in this chapter.

The church is not a building, it is a living, connected people.

Paul suffered for the sake of real people, not an institution.

His pain had a specific target, the actual believers he served.

🧩 Body repeats the earlier picture in this chapter

⛪ The church is people, not a building

👥 Paul suffered for real people

📖 His pain had a specific target

## 🏠 According To The Dispensation Of God

Dispensation is an old word for a household manager's assigned task.

Paul did not invent this ministry or choose it for himself.

God handed him a specific assignment to carry out.

A steward manages what belongs to someone else, not to himself.

🏠 Dispensation means an assigned household task

🎯 Paul did not choose this himself

📋 God handed him a specific assignment

📖 A steward manages what is not his own

## 📜 To Fulfil The Word Of God

Fulfil here means completing a message, preaching it in full, not adding to it.

Paul is not claiming to invent new revelation beyond what God already gave.

His job was finishing the announcement, reaching people still waiting to hear it.

A messenger's task ends only once the whole message has gone out.

📜 Fulfil means preaching the message in full

🚫 Paul added no new revelation

📣 His job was finishing the announcement

📖 A messenger finishes once the message is out

## 🔐 The Mystery Which Hath Been Hid From Ages And Generations

Mystery in this letter does not mean a confusing puzzle to solve.

It means a sacred plan kept hidden until God chose to reveal it.

Ages and generations stretches this hidden period back a very long time.

God was never improvising, this plan was simply not shown yet.

🔐 Mystery means a hidden plan, not a puzzle

⏳ Ages and generations means a long hidden time

🎯 God was not improvising this plan

📖 The plan was simply not shown yet

## 💡 But Now Is Made Manifest To His Saints

Manifest means brought out into the open, fully visible at last.

The long hidden plan finally became public knowledge through Christ.

His saints names the ones trusted to receive and carry this news.

What stayed hidden for so long is now out for anyone who will listen.

💡 Manifest means brought fully into the open

⏳ The hidden plan finally became public

👥 His saints were trusted to carry it

📖 It is now out for anyone to hear

## 🌍 The Riches Of The Glory Of This Mystery Among The Gentiles

Gentiles means anyone outside the Jewish nation, the vast majority of the ancient world.

For centuries, many assumed God's covenant promises belonged to Israel alone.

This mystery includes Gentiles fully, not as an afterthought or a lesser group.

Riches and glory are stacked here to stress just how large this gift is.

🌍 Gentiles means anyone outside Israel

📜 Many once assumed the promise was Israel only

🎁 Gentiles are included fully, not as an afterthought

📖 Riches and glory stress this gift's size

## 🔑 Which Is Christ In You, The Hope Of Glory

Here Paul finally names the mystery directly, in one short phrase.

Christ in you means his actual presence living inside each believer.

This was not merely a promise about a future heavenly reward.

A present, indwelling Christ already lives inside Gentile believers right now.

🔑 Paul names the mystery in this phrase

✝️ Christ in you means his presence inside

⏳ This is not only a future reward

📖 Christ already lives inside believers now

## ⚠️ Warning Every Man, And Teaching Every Man In All Wisdom

Warning and teaching are two different tools Paul used side by side.

Warning corrects wrong direction.

Teaching builds up right understanding.

Every man appears twice, making sure no single person gets skipped.

⚠️ Warning and teaching are different tools

🛑 Warning corrects wrong direction

🏗️ Teaching builds right understanding

📖 Every man means no one skipped

## 🎁 That We May Present Every Man Perfect In Christ Jesus

Present repeats the same legal picture used earlier in this chapter.

Perfect here does not mean sinless or flawless in this life.

It means mature and complete, like a fully grown adult instead of a child.

Paul's goal was spiritual maturity for every single believer, not an elite few.

🎁 Present repeats the earlier legal picture

🚫 Perfect does not mean sinless here

🌱 Perfect means mature and fully grown

📖 Paul's goal was maturity for everyone

## 🏋️ Whereunto I Also Labour, Striving According To His Working

Labour and striving were both words used for hard physical or athletic effort.

Paul pictures his ministry like a demanding race or a wrestling match.

His working names the real source of Paul's strength, Christ's own power in him.

Mightily shows this strength was never small or quiet, it worked through Paul with real force.

🏋️ Labour and striving picture hard physical effort

🏃 Paul compares ministry to a race

⚡ Christ's power worked through Paul

📖 That power worked with real force
`.trim();

export const COLOSSIANS_ONE_PERSONAL_SECTIONS = parseColossiansOneRawNotes(COLOSSIANS_ONE_RAW_NOTES);
