export type ActsTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsTenRawNotes(rawText: string): ActsTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 10:${startVerse}` : `Acts 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Acts 10 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_TEN_RAW_NOTES = `# Acts 10:1-8
# 👼 Cornelius Receives A Vision
---
## 🎖️ A Centurion Of The Band Called The Italian Band

A centurion commanded about one hundred Roman soldiers.

Cornelius held real military rank and real authority in the empire.

The Italian band was a cohort of troops first recruited from Italy itself.

These soldiers represented Rome's occupying power over Judea.

A man from the very army occupying Israel is about to become central to God's plan.

🎖️ Centurion means commander of a hundred
🏛️ Cornelius served the occupying Roman army
🇮🇹 The Italian band was recruited from Italy
📖 Rome's own soldier enters God's plan

## 🙏 One That Feared God With All His House

To fear God here means deep reverence, not terror.

Feared God with all his house means his whole household shared his faith.

This phrase marked a specific group in the ancient world.

Gentiles who worshiped Israel's God without becoming full converts were called God fearers.

Cornelius was already seeking the true God long before Peter ever arrived.

🙏 Feared God means deep reverence
👪 His whole household shared his faith
🌍 God fearers were Gentiles seeking Israel's God
📖 Cornelius sought God before Peter arrived

## 💰 Gave Much Alms To The People, And Prayed To God Alway

Almsgiving means giving money or goods to those in need.

Cornelius gave generously to Jewish people who were not even his own nation.

Prayed to God alway means prayer was a constant habit, not an occasional act.

Generosity and constant prayer marked his life before any angel ever appeared to him.

God noticed devotion that had not yet even heard the gospel.

💰 Alms means giving to those in need
🤲 He gave generously to Jewish people
🙏 Prayer was his constant daily habit
📖 God noticed devotion before the gospel arrived

## 🕒 About The Ninth Hour Of The Day

Jewish days were counted from sunrise.

The ninth hour fell about three in the afternoon.

This was one of the set hours of prayer observed in that culture.

Cornelius was not a Jew, yet he kept this same rhythm of prayer.

A set time for prayer gave his devotion real structure, not just random feeling.

🕒 Ninth hour means about three in the afternoon
📿 This was a set hour for prayer
🙏 Cornelius kept this rhythm though not a Jew
📖 Structured devotion marked his daily life

## 👼 An Angel Of God Coming In To Him

A vision evidently means Cornelius was fully awake and aware, not dreaming.

An angel appearing directly to a Gentile soldier was not a small thing.

God had already spoken to Jewish patriarchs and prophets this same way for centuries.

Here that same kind of direct message reaches someone entirely outside Israel.

👼 A real angel appeared, not a dream
😲 Cornelius was fully awake during the vision
🌍 This message reached someone outside Israel
📖 God speaks directly to a Gentile here

## 📜 Thy Prayers And Thine Alms Are Come Up For A Memorial

A memorial here means something kept and remembered before God.

The idea echoes the memorial offerings described in the old law.

Cornelius had done nothing to earn salvation through these acts alone.

Still, God saw his devotion and responded to it directly.

His prayers and generosity never went unnoticed, even before he knew the full gospel.

📜 Memorial means something God remembers
🙏 Prayers and alms reached God's attention
❤️ Devotion does not earn salvation alone
📖 God responded to what He saw

## ✉️ Call For One Simon, Whose Surname Is Peter

The angel sends Cornelius to a specific man, in a specific town, by a specific name.

Joppa sat about thirty miles south of Caesarea along the coast.

This was not a vague feeling or a general instruction.

God's plan reached down to the exact name and the exact city.

✉️ The instruction named an exact person
🗺️ Joppa sat thirty miles from Caesarea
🎯 God's plan was specific, not vague
📖 Exact details guided Cornelius's obedience

## 🏠 He Lodgeth With One Simon A Tanner

Tanning animal hides was considered unclean work under Jewish custom.

This detail might look like a minor address, but it is not.

Peter was already staying in a home many religious Jews would have avoided.

Before Cornelius's men ever arrived, Peter had already begun crossing lines of ritual purity.

This sets up exactly what God is about to ask him to do next.

🏠 Simon the tanner kept an unclean trade
🚪 Peter already stayed in that home
🔮 This detail previews what comes next
📖 Peter was already crossing old boundaries

# Acts 10:9-16
# 👁️ Peter's Vision On The Housetop
---
## 🏠 Peter Went Up Upon The Housetop To Pray

Flat rooftops in that culture served as common, quiet places for private prayer.

Peter sought solitude the same way Cornelius kept his own set time to pray.

Two men in two different cities were seeking God at this very same hour.

God was already preparing both of them to meet before either one knew it.

🏠 Rooftops served as places for prayer
🙏 Peter sought quiet time with God
⏰ Both men prayed at the same hour
📖 God prepared them before they met

## 🕛 About The Sixth Hour

The sixth hour fell around noon, the middle of the day.

Cornelius received his vision at the ninth hour, three hours later.

These two visions happen close together, almost on the very same afternoon.

The timing itself shows how closely God was coordinating both men's steps.

🕛 Sixth hour means around noon
🕒 Cornelius's vision came three hours later
🔗 Both visions happened the same afternoon
📖 God coordinated both men's timing

## 😴 He Fell Into A Trance

A trance here means Peter stayed aware while God showed him something beyond normal sight.

This was not sleep, and it was not simple imagination.

Peter was hungry and waiting for food when the vision began.

God often speaks into the middle of an ordinary moment, not only a dramatic one.

😴 A trance means an awake, God given vision
🍽️ Peter was simply waiting for food
⏳ God spoke into an ordinary moment
📖 Visions do not require dramatic settings

## 📦 A Great Sheet Knit At The Four Corners

Picture a large sail or tablecloth gathered up at each corner.

That is the shape Peter saw descending from an opened heaven.

The size and shape made the vision impossible to mistake for something small.

Whatever God was about to show him, He wanted it seen clearly.

📦 The sheet looked like a gathered sail
🌤️ It descended from an opened heaven
👀 Its size made the vision unmistakable
📖 God wanted this message seen clearly

## 🐍 All Manner Of Fourfooted Beasts

The sheet held far more than farm animals Peter already knew.

It contained fourfooted beasts, wild beasts, creeping things, and birds.

Leviticus eleven had long divided animals into clean and unclean categories for food.

This sheet mixed every kind together, clean and unclean side by side.

🐍 Every kind of creature filled the sheet
📜 Leviticus eleven set clean and unclean categories
🔀 Clean and unclean animals mixed together
📖 The mixture itself was the real point

## 🍽️ Kill, And Eat

This command broke a rule Peter had kept his entire life.

Jewish law forbade eating animals marked unclean under the old covenant.

God Himself gave this new instruction, not a stranger and not a temptation.

The command itself was about to test everything Peter thought he understood about holiness.

🍽️ The command broke a lifelong rule
📜 Jewish law forbade unclean animals as food
🗣️ God Himself gave this new instruction
📖 Peter's whole understanding was being tested

## 🙅 I Have Never Eaten Any Thing That Is Common Or Unclean

Common here means ordinary or not set apart, the opposite of holy.

Unclean describes anything the law marked as forbidden for food or contact.

Peter protests out of genuine, lifelong obedience, not stubbornness.

His whole upbringing had trained him to refuse exactly this kind of command.

🙅 Common means ordinary, not set apart
🚫 Unclean means forbidden under the law
📖 Peter's protest came from real obedience
➡️ Old training made this command hard to accept

## 🧼 What God Hath Cleansed, That Call Not Thou Common

God answers Peter's objection directly, not gently.

This sentence is the real turning point of the entire chapter.

The vision was never really about food at all.

It was about people God was now calling clean whom Peter had always called unclean.

🧼 God directly answered Peter's objection
🔑 This line is the chapter's turning point
🍽️ The vision was never only about food
📖 It was really about people, not animals

## 🔁 This Was Done Thrice

Three repetitions were not wasted or accidental in scripture.

The same number marked Peter's own three denials of Jesus.

Jesus later restored Peter with a threefold question of his own.

Repetition in this culture signaled certainty, not confusion.

God made sure Peter could never claim he misunderstood the message.

🔁 Three repeats signaled real certainty
🔂 This echoes Peter's own threefold denial
✅ God removed any excuse to misunderstand
📖 The message was confirmed beyond doubt

# Acts 10:17-23
# 🚪 The Men Arrive At Simon's House
---
## 🤔 Peter Doubted In Himself

Peter did not yet understand what the vision actually meant.

He was still turning it over in his mind, searching for its meaning.

At this exact moment, the answer was already walking up to the gate outside.

God often answers a confused prayer before the person even finishes asking it.

🤔 Peter did not yet understand the vision
🚪 The answer was already at the gate
⏳ Doubt and answer arrived almost together
📖 God answers before we finish asking

## 🔍 Made Enquiry For Simon's House

The men sent by Cornelius had traveled all the way from Caesarea to Joppa.

That journey took the better part of a full day on foot.

They were now standing outside, asking directly for the exact house.

Their diligence matched Cornelius's own careful obedience back home.

🔍 The men traveled far to find the house
🚶 Joppa was most of a day's journey away
🎯 They asked for the exact address
📖 Their effort matched Cornelius's own obedience

## 🗣️ Behold, Three Men Seek Thee

The Spirit tells Peter exactly how many men to expect.

This detail removes any room for Peter to guess or assume.

God had already arranged every piece of this meeting in advance.

Peter simply needed to go downstairs and see for himself.

🗣️ The Spirit named the exact number
🔢 Three men is an exact detail
📋 God arranged this meeting in advance
📖 Peter only needed to go and see

## 🚶 Doubting Nothing

Doubting nothing does not mean Peter had no questions left at all.

It means he was told to act in spite of his confusion.

The Spirit's own words, for I have sent them, carried full authority behind the command.

Faith here looked like simple obedience, not total understanding.

🚶 Doubting nothing means acting despite confusion
🗣️ The Spirit's own words carried authority
🙏 Faith looked like obedience, not full understanding
📖 Peter obeyed before he fully understood

## ❓ What Is The Cause Wherefore Ye Are Come

Wherefore is an old word simply meaning why or for what reason.

Peter asks a direct, practical question instead of guessing.

He still does not know why three strangers are standing at his door.

A clear question was the first step toward a clear answer.

❓ Wherefore means why or for what reason
🚪 Peter asks a direct, practical question
🤷 He still does not know their purpose
📖 A clear question leads to a clear answer

## 👼 Warned From God By An Holy Angel

The messengers repeat the same story already told earlier in the chapter.

This is not a new detail, but a confirmation of what Peter already half understood.

Two separate groups of men now carry matching, independent testimony.

Matching accounts from different sources made the whole story far easier to trust.

👼 Their account matches the earlier story
🔁 Two groups confirm the same testimony
✅ Independent accounts build real trust
📖 God's message held up under repetition

## 🏠 Then Called He Them In, And Lodged Them

Peter welcomes these men into Simon the tanner's own house without hesitation.

These were Gentile strangers connected to a Roman soldier, not safe guests by old standards.

Lodging them meant feeding them, housing them, and treating them as honored guests.

Peter was already living out the lesson from his own vision before he even reached Caesarea.

🏠 Peter welcomed them without hesitation
🪖 These were Gentile strangers, not safe guests
🍽️ Lodging meant full, honored hospitality
📖 Peter already lived out his own vision

## 🚶 Certain Brethren From Joppa Accompanied Him

Peter did not travel to Caesarea completely alone.

Fellow Jewish believers from Joppa chose to go with him.

Later in Acts, these companions become important eyewitnesses defending Peter's actions.

Peter made sure there would be more than just his own word to rely on.

🚶 Jewish believers traveled with Peter
👥 They later serve as eyewitnesses
🛡️ More than one witness protected his testimony
📖 Peter planned for accountability in advance

# Acts 10:24-26
# 🙇 Cornelius Falls At Peter's Feet
---
## ⏳ And Cornelius Waited For Them

Cornelius knew exactly when to expect Peter's arrival.

Waiting here shows real anticipation, not casual curiosity.

He had already organized his household around this one visit.

Everything in his house was ready before Peter ever reached the door.

⏳ Cornelius knew exactly when to expect Peter
🏠 He prepared his household in advance
🎯 His waiting showed real anticipation
📖 Everything was ready before Peter arrived

## 👪 Called Together His Kinsmen And Near Friends

Cornelius did not want to hear this message alone.

He gathered his relatives and closest friends to hear it with him.

This single meeting was about to reach far more people than Cornelius alone.

His instinct to include others shaped the size of what God was about to do.

👪 Cornelius gathered relatives and close friends
🙌 He wanted others to hear too
🌍 One meeting reached many people at once
📖 His instinct widened the reach of God's work

## 🙇 Fell Down At His Feet, And Worshipped Him

This gesture was a common way to honor an important visitor in that culture.

It does not necessarily mean Cornelius believed Peter was divine.

Still, the gesture went further than ordinary respect, and Peter corrects it at once.

Honor given to a person can quietly cross into honor that belongs only to God.

🙇 This gesture honored an important visitor
🚫 It does not prove Cornelius worshiped Peter
⚠️ The gesture still went too far
📖 Peter corrects it before it goes further

## 🙅 I Myself Also Am A Man

Peter refuses the honor the moment he sees it happening.

He reminds Cornelius plainly that he is only a man, nothing more.

Years later, Paul and Barnabas refuse this exact same kind of worship at Lystra.

Every true messenger of God points attention away from himself, not toward it.

🙅 Peter refuses the honor immediately
🧍 He names himself as only a man
🔁 Paul and Barnabas do the same later
📖 True messengers point away from themselves

# Acts 10:27-33
# 🗣️ Peter And Cornelius Compare Visions
---
## 👥 Found Many That Were Come Together

Peter walks into a room already full of people.

Cornelius had gathered more than just his own immediate family.

This was never meant to be a private conversation between two men.

God's plan here reaches a whole household and its wider circle at once.

👥 Peter found a full room of people
👪 Cornelius gathered beyond his immediate family
🌍 This was never a private conversation
📖 God's plan reached a wide circle at once

## 🚫 An Unlawful Thing For A Man That Is A Jew

Jewish custom at the time discouraged close contact with Gentiles, especially entering their homes.

This was not written law from Moses, but a strong, widely kept tradition.

Peter openly admits he is breaking that tradition by standing in this house at all.

Naming the rule out loud makes what happens next even more remarkable.

🚫 Jewish custom discouraged contact with Gentiles
📜 This was tradition, not Mosaic law itself
🚪 Peter admits he is breaking it
📖 Naming the rule highlights what follows

## 🧼 I Should Not Call Any Man Common Or Unclean

Peter now applies his rooftop vision directly to the people standing in front of him.

The sheet full of animals was never really about food at all.

It was about removing the wall between Jew and Gentile completely.

Peter says the lesson out loud so everyone in the room can hear it plainly.

🧼 Peter applies the vision to real people
🍽️ The sheet was never only about food
🧱 It removed the wall between Jew and Gentile
📖 Peter states the lesson plainly out loud

## 🗣️ Without Gainsaying

Gainsaying means arguing back or objecting.

Peter admits he came along without a single objection.

This confession is remarkable coming from a man raised to avoid this exact kind of visit.

Full obedience can look like silence where resistance used to be automatic.

🗣️ Gainsaying means arguing or objecting
🤐 Peter admits he raised no objection
📚 This defied his whole upbringing
📖 Obedience replaced automatic resistance

## 🙏 I Was Fasting Until This Hour

Cornelius retells his own vision for the benefit of everyone now listening.

Fasting here shows serious, focused devotion, not a casual habit.

Repeating the story in front of witnesses protects it from later doubt.

The retelling matters as much as the original event itself.

🙏 Cornelius retells the story for witnesses
🍽️ Fasting showed serious, focused devotion
🛡️ Retelling protects the story from doubt
📖 The retelling matters as much as the event

## 👼 A Man Stood Before Me In Bright Clothing

Cornelius describes the same angel, but in his own simple words.

Bright clothing is a common way scripture describes an angel's appearance elsewhere.

This is not a new or different vision from the one already told earlier.

Two honest tellings of the same event only strengthen how reliable it really is.

👼 Cornelius retells the same angel's visit
✨ Bright clothing describes angels elsewhere too
🔁 This matches the earlier account exactly
📖 Two honest tellings strengthen the story

## 🙏 We Are All Here Present Before God

Cornelius frames this entire gathering as a sacred appointment, not a casual visit.

Everyone present understood they were there because God had arranged it.

That shared understanding set the tone for everything Peter was about to say.

A room this ready to listen was itself part of God's preparation.

🙏 Cornelius frames this as a sacred appointment
👥 Everyone understood God arranged the meeting
🎯 Shared readiness shaped what came next
📖 The room's readiness was God's own preparation

# Acts 10:34-38
# 🌍 God Is No Respecter Of Persons
---
## 🌍 God Is No Respecter Of Persons

A respecter of persons shows favoritism based on status, nationality, or appearance.

Peter declares plainly that God does not play favorites that way.

This single sentence overturns the assumption behind centuries of Jewish and Gentile division.

What Peter learned on a rooftop in Joppa he now says out loud in Caesarea.

🌍 A respecter of persons shows favoritism
🚫 God does not play favorites that way
🧱 This overturns old Jewish Gentile division
📖 The rooftop lesson becomes a public truth

## ✅ Feareth Him, And Worketh Righteousness

This phrase does not mean good behavior alone earns salvation.

It means the door to God's family is now open to every nation.

Peter is describing who gets to come in, not how a person earns their own way in.

The gospel itself, explained in the verses right after this one, still shows how anyone actually enters.

✅ This is not salvation by good behavior
🚪 The door is open to every nation
🎯 Peter describes who may come in
📖 The gospel still explains how anyone enters

## 👑 He Is Lord Of All

This short phrase sits inside parentheses, almost like a side note.

Even so, it carries enormous weight for everyone listening in that room.

Jesus is not only Israel's promised Messiah, he is Lord over every nation present.

A small phrase here quietly answers the biggest question the whole room was asking.

👑 Jesus is Lord over every nation
📜 This sits almost like a side note
🌍 It answers Cornelius's whole household directly
📖 A small phrase carries enormous weight

## 🕊️ Began From Galilee, After The Baptism Which John Preached

Peter gives Cornelius's household a short summary of the whole gospel story.

He starts exactly where the Gospel accounts themselves usually begin, with John the Baptist.

Galilee was the region where Jesus's public ministry truly took root and grew.

Peter assumes his Gentile listeners know little, so he starts from the very beginning.

🕊️ Peter starts with John the Baptist
🗺️ Galilee was where Jesus's ministry grew
📖 He assumes his listeners know little
➡️ Starting from the beginning serves new ears

## 🕊️ Anointed Jesus Of Nazareth With The Holy Ghost And With Power

Anointed means set apart and empowered for a specific calling.

The same Holy Ghost now falling on Gentiles once rested fully on Jesus himself.

Power here describes real, visible ability to heal and to confront evil directly.

The Spirit poured out in this chapter is the very same Spirit that filled Jesus.

🕊️ Anointed means set apart and empowered
⚡ The same Spirit filled Jesus and now Gentiles
💪 Power meant real ability to heal
📖 One Spirit connects Jesus to this moment

## 😈 Oppressed Of The Devil

This phrase points to suffering with a spiritual root behind it, not every illness in general.

Jesus confronted that kind of suffering directly during his ministry.

Peter names the devil plainly instead of softening the description for his audience.

Healing in Jesus's ministry was never only physical, it pushed back against real spiritual oppression.

😈 This points to suffering with a spiritual root
⚔️ Jesus confronted it directly in his ministry
🗣️ Peter names the devil plainly
📖 Healing pushed back against real oppression

# Acts 10:39-43
# ✝️ Witnesses Of The Risen Christ
---
## 🌳 Slew And Hanged On A Tree

Hanged on a tree is an old way of describing death by crucifixion.

The phrase echoes language from the law about a body hung up being under a curse.

Peter does not hide or soften how Jesus actually died.

Naming the full shame of the cross makes the resurrection that follows even more striking.

🌳 Hanged on a tree describes crucifixion
📜 The phrase echoes old covenant language
🗣️ Peter does not soften how Jesus died
📖 Naming the shame makes the resurrection striking

## ⏰ Raised Up The Third Day, And Shewed Him Openly

God raised Jesus bodily, not merely in some symbolic or spiritual sense.

Shewed him openly means the resurrection was witnessed, not hidden or private.

Peter declares this boldly to a room full of people who had never heard it before.

A resurrection kept secret could never have launched a message now spreading through the whole empire.

⏰ The resurrection was bodily, not symbolic
👀 Shewed openly means it was witnessed
🗣️ Peter declares this to brand new hearers
📖 A hidden resurrection could not spread this far

## 🍞 Did Eat And Drink With Him

This detail answers a question the room may not have even asked out loud.

Eating and drinking together proves Jesus had a real, physical body after rising.

This was not a ghost story or a vague feeling passed around among believers.

Ordinary meals became solid proof for an extraordinary claim.

🍞 Eating together proved a real physical body
🚫 This rules out a ghost story
👥 Chosen witnesses confirmed it personally
📖 Ordinary meals proved an extraordinary claim

## ⚖️ Judge Of Quick And Dead

Quick here is an old word simply meaning the living.

Judge of quick and dead means Jesus will judge every person who has ever lived.

That includes those still alive and those already dead.

This claim reaches far beyond Israel's own history or its own people.

⚖️ Quick is an old word for the living
👥 Jesus will judge everyone who has lived
🌍 This claim reaches beyond Israel alone
📖 Every listener falls under this judgment

## 📜 To Him Give All The Prophets Witness

Peter points back to the entire Old Testament, not just one favorite verse.

Prophet after prophet, across hundreds of years, pointed forward toward this exact moment.

That united, long running testimony stands behind the message being preached today.

This claim was never new or invented on the spot.

📜 Peter points to the whole Old Testament
⏳ Many prophets wrote across centuries
🤝 Their testimony agrees as one voice
📖 This claim was never newly invented

## 🙌 Receive Remission Of Sins

Remission means a full canceling of a debt, not a partial reduction.

Whosoever believeth opens this offer to absolutely everyone listening in that room.

No nationality, background, or past history disqualifies a person from receiving it.

This single sentence is the whole point of everything Peter has said so far.

🙌 Remission means a full canceled debt
🌍 Whosoever opens this to everyone present
🚫 No background disqualifies a person
📖 This sentence is the whole sermon's point

# Acts 10:44-48
# 🔥 The Holy Ghost Falls On The Gentiles
---
## 🗣️ While Peter Yet Spake These Words

God interrupts Peter's own sermon before he can even finish it.

This timing was no accident or coincidence.

No altar call, ritual, or formal invitation comes first.

God acts the instant genuine faith is present in the room, not after a required ceremony.

🗣️ God interrupts the sermon itself
⏰ No ritual or ceremony comes first
⚡ God acts the instant faith appears
📖 Faith, not ceremony, triggered this moment

## 😲 They Of The Circumcision Which Believed Were Astonished

The circumcision here simply means Jewish believers, marked by that old covenant sign.

Astonished shows genuine shock, not mild surprise.

These Jewish believers truly did not expect Gentiles to receive this same gift.

Old assumptions about who God could reach were being broken in front of their own eyes.

😲 Circumcision here means Jewish believers
😳 Astonished shows genuine, deep shock
🚪 They did not expect Gentiles included
📖 Old assumptions broke in front of them

## 🕊️ The Gift Of The Holy Ghost

This is the very same Spirit poured out earlier at Pentecost in Acts two.

It does not arrive here in a smaller or lesser measure for Gentiles.

No circumcision, law keeping, or waiting period comes before this gift is given.

God gives the same gift to Gentiles that he already gave to Jewish believers.

🕊️ This matches the Pentecost outpouring
⚖️ Gentiles receive the same measure
🚫 No law keeping came first
📖 God gave Gentiles what Jews already had

## 🗣️ Speak With Tongues, And Magnify God

Tongues here means speaking in other languages by the Spirit's own power.

This exact sign already confirmed the Spirit's arrival back at Pentecost.

Magnify God means their speech praised and honored him directly, not themselves.

The same visible proof removed any doubt for the Jewish witnesses watching closely.

🗣️ Tongues means Spirit given speech
🔁 The same sign appeared at Pentecost
🙌 Magnify means praising God, not themselves
📖 Visible proof removed any real doubt

## 💧 Can Any Man Forbid Water

Peter asks this question out loud to the Jewish believers standing around him.

The Spirit had already fallen before a single drop of water touched anyone.

Baptism here follows clear evidence of God's own work, not the other way around.

No tradition or hesitation could rightly stand against what God had already done.

💧 Peter asks this question directly
🕊️ The Spirit fell before any baptism
➡️ Baptism followed evidence of God's work
📖 No tradition could stand against this

## 💧 Baptized In The Name Of The Lord

Baptism here marks public, outward identification with Jesus himself.

It follows immediately, with no delay or additional requirement added.

Gentiles now share the exact same step every Jewish believer had already taken.

One household's baptism quietly becomes the first step toward a whole new chapter in the church's story.

💧 Baptism marked public identification with Jesus
⚡ It happened with no delay at all
🤝 Gentiles shared the same step as Jews
📖 One household began a whole new chapter

## 🏠 Tarry Certain Days

Tarry simply means to stay or remain for a while.

Cornelius's household wanted more time with Peter, not just one short visit.

This extended stay deepened the new fellowship forming between Jew and Gentile believers.

A single day's events were only the beginning of a much longer relationship.

🏠 Tarry means to stay for a while
🙏 The household wanted more time with Peter
🤝 This deepened Jew and Gentile fellowship
📖 One day began a longer relationship
`.trim();

export const ACTS_TEN_PERSONAL_SECTIONS = parseActsTenRawNotes(ACTS_TEN_RAW_NOTES);
