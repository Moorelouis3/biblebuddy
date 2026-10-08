export type MatthewTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewTwentySixRawNotes(rawText: string): MatthewTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 26:${startVerse}` : `Matthew 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 16) {
    throw new Error("Expected 16 Matthew 26 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_TWENTY_SIX_RAW_NOTES = `# Matthew 26:1-5
# 😈 The Plot To Kill Jesus
---
## 📜 When Jesus Had Finished All These Sayings

These sayings are the warnings Jesus had just finished giving about the end of the age.

Matthew chapters twenty four and twenty five record the whole teaching this verse points back to.

Jesus is not changing subjects here.

He is closing one long teaching and opening the final days of his life.

📜 Points back to the last two chapters

🔁 Jesus closes one teaching here

⏳ The final days of his life now begin

📖 Everything that follows moves toward the cross

## ⚰️ The Son Of Man Is Betrayed To Be Crucified

Jesus names his own death before anyone else brings it up.

He does not say he might be arrested.

He says plainly that he will be handed over and crucified.

Crucifixion was Rome's method for executing slaves and rebels, never a death reserved for honored men.

Jesus walks toward that death already knowing exactly what is coming.

⚰️ Jesus names his death first

🏛️ Crucifixion was Rome's method for slaves and rebels

🙇 It was never meant for honored men

📖 Jesus walks toward it with open eyes

## 🏛️ Unto The Palace Of The High Priest, Who Was Called Caiaphas

The high priest led Israel's religious court.

He also answered to Rome for keeping order among the people.

Caiaphas held that office through Jesus's entire trial and death.

Meeting at his palace instead of the temple kept this meeting hidden from the crowds.

🏛️ The high priest led Israel's religious court

🤝 He answered to Rome for order

🏠 Caiaphas's palace kept the meeting hidden

➡️ Secrecy shaped this plan from the start

## 🗣️ The Chief Priests, And The Scribes, And The Elders

These three groups together formed the ruling council of Jewish leaders in Jerusalem.

Chief priests ran temple worship.

Scribes studied and taught the law.

Elders represented the city's respected families.

When all three groups move together, the entire leadership has turned against Jesus.

🏛️ Chief priests ran temple worship

📜 Scribes studied and taught the law

👴 Elders represented respected families

📖 All three leadership groups now unite against Jesus

## 🤫 Take Jesus By Subtilty

"Subtilty" means trickery or deceit.

The leaders know they cannot simply walk up and arrest Jesus in daylight.

Crowds that followed him during Passover week would resist an open arrest.

So the plan depends on catching him quietly, away from public view.

🤫 Subtilty means trickery or deceit

👀 An open arrest risked real resistance

🌙 The plan needed secrecy to work

➡️ Deceit becomes the leaders' only real option

## 😨 Not On The Feast Day, Lest There Be An Uproar

Jerusalem's population swelled far beyond normal during Passover week.

Pilgrims from across the region filled every street.

An arrest in that crowd could spark a riot.

Rome would answer any riot with force the leaders did not want.

Fear of chaos, not mercy, shaped their timing.

🏙️ Jerusalem's population swelled during Passover

😡 A riot could bring Roman force

🎯 Control mattered more than timing to them

📖 Fear of chaos shaped their plan

# Matthew 26:6-13
# 🫙 The Anointing At Bethany
---
## 🏠 In Bethany, In The House Of Simon The Leper

Bethany sat just outside Jerusalem.

It was close enough for Jesus to use as a base during his final days.

Simon is still called "the leper" even though leprosy would have kept him isolated from normal life.

Many scholars believe Jesus had healed him earlier, and the old name simply stuck.

🗺️ Bethany sat just outside Jerusalem

🏠 It served as Jesus's base this week

🤲 Simon's title likely recalls an earlier healing

📖 A name can outlast its old meaning

## 🫙 An Alabaster Box Of Very Precious Ointment

"Alabaster" means a soft pale stone, often carved into jars for storing costly perfume.

This particular ointment was expensive enough to represent real wealth.

John's gospel names it as spikenard, an oil imported from distant India.

🪨 Alabaster means a carved stone jar

💰 The ointment represented real wealth

🌍 Spikenard was imported from distant lands

➡️ This gift cost the woman something real

## 👑 Poured It On His Head

Anointing a head with oil was a sign of honor in this culture.

It was normally reserved for kings, priests, and honored guests.

This woman gives Jesus that exact honor, in the middle of a meal, without ceremony.

👑 Anointing the head signaled real honor

🤴 Normally reserved for kings and priests

🎁 She gives that honor freely

📖 Worship does not wait for permission

## 😠 They Had Indignation, Saying, To What Purpose Is This Waste

"Indignation" means a sharp, offended anger.

John's gospel names Judas as the one who raised this complaint first.

The disciples see only the lost money.

They miss the meaning sitting right in front of them.

😠 Indignation means sharp offended anger

🗣️ John names Judas as the voice behind it

💸 They see only the lost money

➡️ Money can hide the real meaning

## 🤲 Sold For Much, And Given To The Poor

Caring for the poor was a real and valued command in Jewish law.

The disciples' objection sounds righteous on the surface.

But timing matters here.

This woman will never get another chance to anoint Jesus before his death.

🤲 Caring for the poor was a real command

✅ The objection sounds righteous at first

⏳ This exact chance will never come again

📖 A good principle can still miss the moment

## 💪 She Hath Wrought A Good Work Upon Me

Jesus defends her publicly instead of letting the criticism stand.

He calls her act a "good work."

That same phrase describes acts elsewhere in scripture that please God.

💪 Jesus defends her in front of everyone

✅ Good work is scripture's praise for godly acts

🛡️ He will not let the criticism stand

➡️ Jesus names what she did correctly first

## 👐 Ye Have The Poor Always With You

Jesus is not minimizing care for the poor here.

He is pointing out that his physical presence on earth is about to end.

Chances to serve the poor will continue for the rest of history.

This exact chance to honor him in the flesh will not.

👐 Caring for the poor continues always

⏳ Jesus's time on earth is ending

🎯 This moment will not repeat

📖 Some chances only come once

## ⚰️ She Did It For My Burial

Jesus reads a deeper meaning into her act than she likely intended.

Bodies in this culture were anointed with oil as part of burial preparation.

Jesus connects her gift directly to the death he already told his disciples about.

⚰️ Burial customs included anointing with oil

🔗 Jesus links her gift to his coming death

👀 He sees meaning she may not have intended

➡️ Honor here quietly points toward the cross

## 📖 Told For A Memorial Of Her

Jesus promises that wherever the gospel reaches, her act will travel with it.

She is never named anywhere in this account.

Her story has still traveled for two thousand years.

📖 Her story travels alongside the gospel itself

🌍 It reaches wherever the gospel goes

❓ She remains unnamed in this chapter

➡️ A quiet act outlived every objection against it

# Matthew 26:14-16
# 🪙 Thirty Pieces Of Silver
---
## 😈 Then One Of The Twelve, Called Judas Iscariot

Judas was one of the original twelve disciples Jesus had chosen and trained.

"Iscariot" likely names his hometown, a Judean town called Kerioth.

The betrayer comes from inside Jesus's closest circle, not from some outside enemy.

😈 Judas was one of the original twelve

🗺️ Iscariot likely names his hometown

🏠 He came from Judea, not Galilee

📖 Betrayal comes from inside the circle

## 💰 What Will Ye Give Me, And I Will Deliver Him Unto You

Judas does not wait to be approached.

He goes to the chief priests and opens the deal himself.

This chapter never states his exact reason plainly.

💰 Judas starts the deal himself

🏃 He approaches the priests first

❓ His exact motive is not stated here

➡️ He treats Jesus as something to be sold

## 🪙 Covenanted With Him For Thirty Pieces Of Silver

Thirty pieces of silver matches the Old Testament price set for a slave's life in the book of Exodus.

The same exact number appears in the prophet Zechariah as a worthless price paid for a shepherd.

Matthew's readers would catch both connections right away.

🪙 Thirty pieces matched a slave's legal price

📜 Zechariah already named this exact amount

🔗 Both old passages point to this moment

📖 An old price becomes a true prophecy

## 🔁 From That Time He Sought Opportunity To Betray Him

The deal is struck.

The act itself still has to wait for the right moment.

Judas now spends his remaining days near Jesus.

He quietly watches the whole time for his chance.

🔁 The deal is made, not yet carried out

👀 Judas watches for the right moment

🤫 He stays close while planning in secret

➡️ Betrayal can wait patiently once it is decided

# Matthew 26:17-19
# 🍞 Preparing The Passover
---
## 🍞 The First Day Of The Feast Of Unleavened Bread

Passover and the feast of unleavened bread ran together as one combined week.

Every trace of leaven, meaning yeast, had to be removed from the home before the meal began.

This small detail fixes the exact day the rest of the chapter happens on.

🍞 Unleavened bread week ran alongside Passover

🧹 All leaven was removed from homes

📅 This detail fixes the exact day

📖 Timing matters for everything that follows

## 🏠 Go Into The City To Such A Man

Jesus gives directions without naming the man plainly in Matthew's account.

Mark and Luke add more detail, including a sign the disciples would look for.

The vague wording here may be intentional.

It keeps the exact location hidden from Judas until the last possible moment.

🏠 The man is not named here

🔎 Other gospels add more detail

🤫 Vague wording may hide the location

➡️ Secrecy protects this meal from early betrayal

## ⏳ My Time Is At Hand

Jesus speaks of his death on a fixed schedule.

He does not speak of it as something that might still be avoided.

The same phrase marked earlier moments when Jesus held back his hour until now.

⏳ Time at hand means the hour has come

📆 Jesus had delayed this moment until now

🎯 Nothing about this timing is accidental

📖 Jesus controls the timing of his own death

## ✅ The Disciples Did As Jesus Had Appointed Them

The disciples simply follow the instructions.

No question or hesitation is recorded here.

Their quiet obedience sets up the meal that becomes the most remembered one in history.

✅ The disciples obey without hesitation

🍽️ Their obedience sets up the coming meal

📜 That meal becomes the most remembered one ever

➡️ Simple obedience prepares the way for something enormous

# Matthew 26:20-25
# 🍽️ The Betrayer At The Table
---
## 🍽️ He Sat Down With The Twelve

Meals in this culture were eaten reclining at a low table, leaning on one elbow rather than sitting upright.

Eating this way meant close physical nearness between everyone at the table.

It also signaled deep trust among the guests.

🍽️ Meals were eaten reclining, not seated upright

🤝 Reclining meant close physical nearness

🫂 Shared meals signaled deep trust

📖 This closeness makes betrayal from within even sharper

## 😔 One Of You Shall Betray Me

Jesus announces the betrayal to the whole group.

He does not warn Judas privately and quietly instead.

Every disciple now has to wonder if the warning points at himself.

😔 Jesus speaks this to the whole group

❓ Every disciple must wonder about himself

😨 No one yet knows who it is

➡️ Suspicion spreads before the truth is named

## 💔 Exceeding Sorrowful, Lord, Is It I

Each disciple asks the very same question in turn.

Each one seems genuinely unsure of his own heart.

Their visible sorrow suggests none of them feel confident enough to rule himself out.

💔 Their sorrow appears genuine

❓ Each one asks about himself first

😟 None feels sure he could not be guilty

📖 Self doubt can be more honest than certainty

## 🍲 He That Dippeth His Hand With Me In The Dish

Passover meals often used one shared dish for dipping bread or bitter herbs.

Jesus identifies the betrayer through an act of shared table fellowship.

That same gesture should have signaled friendship, not betrayal.

🍲 A shared dish was common at this meal

🤝 Dipping together normally signaled friendship

😔 Jesus uses that symbol to name the betrayer

➡️ The closest gesture becomes the clearest clue

## ⚖️ Woe Unto That Man By Whom The Son Of Man Is Betrayed

Jesus names real judgment waiting for Judas here.

He does this without excusing him from blame.

"It had been good for that man if he had not been born."

That is one of the strongest warnings in the gospel.

God's larger plan to save the world never erases Judas's own guilt in this choice.

⚖️ Jesus names real judgment for Judas

💔 Among the strongest warnings in the gospel

🎯 God's plan does not erase personal guilt

📖 A bigger story never removes responsibility

## ❓ Master, Is It I? He Said Unto Him, Thou Hast Said

Judas asks the same question the other disciples already asked.

Jesus answers indirectly, "thou hast said."

That phrase confirms the truth without a blunt public accusation.

❓ Judas copies the other disciples' question

🗣️ Thou hast said quietly means yes

🤫 Jesus confirms it without a public scene

➡️ Judas now knows that Jesus already knows

## 📜 A Pattern Already Written

This exact kind of betrayal by a trusted companion was described long before this night.

Psalm forty one speaks of a close friend who shares bread turning against the one who trusted him.

Jesus is not caught by surprise here.

He is walking directly into a pattern scripture had already named.

📜 Psalm forty one already described this betrayal

🤝 It named a trusted friend turning against him

🎯 Jesus is not caught by surprise

📖 Scripture had already named this exact pattern

# Matthew 26:26-29
# 🍷 The Lord's Supper
---
## 🍞 Took Bread, And Blessed It, And Brake It

Breaking bread was simply how a flat loaf was shared at any Jewish meal.

Nothing about that action was unusual on its own.

Jesus takes this ordinary moment and fills it with new meaning no one at the table had heard before.

🍞 Breaking bread was an ordinary meal custom

✨ Jesus fills it with new meaning

🆕 No one had heard this meaning before

📖 An everyday act becomes a lasting sign

## 🩸 Take, Eat, This Is My Body

Jesus is not announcing that the bread physically turns into flesh at that moment.

He is giving the disciples a sign to remember.

That sign points to his body, soon to be given up for them on the cross.

🍞 Bread becomes a sign, not a trick

🩸 It points toward his body on the cross

🧠 The disciples are meant to remember it

➡️ A simple sign carries his sacrifice

## 🍷 My Blood Of The New Testament

"Testament" here means covenant, a binding agreement between God and his people.

The old covenant at Mount Sinai was sealed with animal blood.

Jesus names his own blood as the seal of a new and final covenant.

📜 Testament means a binding covenant

🩸 The old covenant was sealed with animal blood

🆕 Jesus seals a new covenant himself

📖 One sacrifice replaces every animal sacrifice before it

## 🙏 Shed For Many For The Remission Of Sins

"Remission" means a debt fully canceled, not simply forgiven while still remembered.

Jesus states plainly what his coming death will accomplish.

He says this before the event even happens.

🙏 Remission means a debt fully canceled

🩸 His blood accomplishes that full cancellation

🎯 Jesus states the purpose ahead of time

📖 Sins are not reduced here, they are removed

## 🍇 Until That Day When I Drink It New With You

Jesus points past his own death toward a future meal shared again with his disciples.

This promise turns the Last Supper into something unfinished.

It waits for one final celebration still to come in his Father's kingdom.

🍇 Jesus points to a future shared meal

⏳ This supper is not the final one

👑 It waits for his Father's kingdom

➡️ Even here, Jesus looks past the cross

# Matthew 26:30-35
# 🐓 Peter's Denial Foretold
---
## 🎵 When They Had Sung An Hymn

Passover meals traditionally closed with singing psalms of praise.

These were often drawn from Psalms one hundred thirteen through one hundred eighteen.

Jesus and his disciples walk out singing on the very night he will be betrayed.

🎵 Passover closed with singing psalms

📜 Likely drawn from Psalms one thirteen onward

🌙 They sing on the night of his arrest

📖 Worship continues even heading toward the cross

## 🏔️ Into The Mount Of Olives

The Mount of Olives rises just east of Jerusalem, across a small valley.

Jesus often withdrew there to pray.

It becomes the setting for the rest of this chapter.

🏔️ Olives sits just east of Jerusalem

🌳 Jesus often prayed there before

📍 It becomes this chapter's setting

➡️ A familiar place now holds his hardest night

## 🐑 I Will Smite The Shepherd, And The Sheep Shall Be Scattered

Jesus quotes the prophet Zechariah directly.

He applies an old prophecy to himself as the shepherd who will be struck down.

He tells his disciples plainly that they will scatter, using scripture instead of guessing.

📜 Jesus quotes the prophet Zechariah here

🐑 He names himself as the struck shepherd

🧭 He predicts the disciples will scatter

📖 Scripture explains what is about to happen

## ✝️ After I Am Risen Again, I Will Go Before You Into Galilee

In the middle of predicting his own death, Jesus also names his resurrection plainly.

He promises to meet the disciples again in Galilee, their home region.

That meeting will happen after he rises.

✝️ Jesus names his resurrection in advance

🗺️ Galilee was the disciples' home region

🤝 He promises to meet them there again

➡️ Hope is spoken before the darkest night begins

## 💪 Though All Men Shall Be Offended, Yet Will I Never Be Offended

Peter singles himself out as different from the rest of the group.

His confidence sounds strong on the surface.

That confidence rests entirely on his own willpower, not on God's help.

💪 Peter claims he is different from the rest

🗣️ His words sound confident

🙅 His confidence rests on his own strength

📖 Strong words do not guarantee strong follow through

## 🐓 Before The Cock Crow, Thou Shalt Deny Me Thrice

Roosters typically crow in the early hours before dawn.

Jesus gives Peter an exact, specific prediction, not a vague warning.

Three separate denials, before one morning sound, leaves Peter no room to explain it away later.

🐓 Cock crow marks the early hours before dawn

🎯 Jesus gives an exact, specific prediction

🔢 Three denials before one morning sound

📖 Precise prophecy leaves no room for excuses

## 🙋 Likewise Also Said All The Disciples

Peter is not the only one making a bold promise that night.

Every disciple joins in claiming loyalty none of them will be able to keep.

That test will come within a matter of hours.

🙋 Every disciple makes the same promise

⏳ Their loyalty will be tested within hours

😔 None of them can keep this claim

➡️ Confidence before a trial is easy to speak

# Matthew 26:36-41
# 🌳 Gethsemane
---
## 🌳 A Place Called Gethsemane

"Gethsemane" means oil press, named for the olive presses that worked in gardens on the Mount of Olives.

Jesus chooses this working garden for the hardest prayer of his life.

He does not choose a grand or ceremonial location.

🌳 Gethsemane means oil press

🫒 Named for nearby olive presses

📍 Jesus prays in a working garden

📖 Ordinary places can hold the heaviest moments

## 👥 Peter And The Two Sons Of Zebedee

The two sons of Zebedee are James and John, already named earlier in the gospel.

Jesus takes this same inner circle of three with him again.

He had also brought only these three to witness his transfiguration.

👥 Zebedee's sons are James and John

🔁 This is the same inner circle as before

⛰️ They also saw his transfiguration

➡️ His closest friends witness his hardest night too

## 💔 My Soul Is Exceeding Sorrowful, Even Unto Death

Jesus names his own emotional state plainly here.

He does not hide his suffering behind calm, composed words.

The weight pressing on him feels heavy enough to describe as death itself.

This happens even before any physical suffering has begun.

💔 Jesus names his sorrow honestly

😢 He does not hide his suffering

⚖️ The weight already feels like death itself

📖 Real faith does not require pretending

## 🥤 Let This Cup Pass From Me

"This cup" is a common Old Testament picture for a bitter experience someone must drink.

It is often connected to bearing God's judgment.

Jesus asks honestly whether there is any other way.

He still submits to his Father's answer either way.

🥤 Cup often pictures a bitter judgment to bear

😟 Jesus asks honestly for another way

🙏 He still submits to the Father's will

➡️ Honest asking and full obedience can exist together

## 🙏 Nevertheless Not As I Will, But As Thou Wilt

This line is the turning point of the whole prayer.

Jesus's own desire and the Father's will are not identical in this moment.

Jesus chooses the Father's will anyway.

🙏 Jesus's desire and the Father's will differ here

🎯 He chooses the Father's will anyway

💪 Obedience costs him something real

📖 True surrender happens where desire and duty disagree

## 😴 Findeth Them Asleep

Jesus had asked Peter, James, and John specifically to stay awake and watch with him.

Exhaustion wins instead.

He returns from the hardest prayer of his life to find them sleeping.

😴 The three disciples fall asleep

🙏 Jesus had asked them to watch

😔 He prays alone in his hardest hour

➡️ Even close friends can fail badly

## 🙏 Watch And Pray, That Ye Enter Not Into Temptation

Jesus pairs his warning with an honest word about human weakness.

The spirit is willing, but the flesh is weak.

That names the exact gap in the disciples right now.

They want to stay awake and support Jesus.

Their tired bodies simply cannot manage it.

This same gap shows up again in Peter's own story just a few verses later.

His confident words will soon meet a weak, fearful moment.

🙏 Watch and pray guards against temptation

😴 Weak flesh names real human limits

🔁 Peter will face this exact gap again

📖 Good intentions still need real strength to hold

# Matthew 26:42-46
# 🙏 The Third Prayer
---
## 🔁 He Went Away Again The Second Time

Jesus prays nearly the same prayer a second time.

Repetition here is not doubt.

It is endurance, wrestling the same request honestly until peace comes.

🔁 Jesus repeats the same prayer

💪 Repetition shows endurance, not doubt

🕰️ He wrestles with it honestly

📖 Some surrender takes more than one prayer

## 😴 Found Them Asleep Again, For Their Eyes Were Heavy

The disciples fail a second time.

The text gently explains why, exhaustion rather than carelessness.

Jesus does not record scolding them harshly here.

He simply states the plain fact.

😴 The disciples fail a second time

😔 Their eyes were heavy from exhaustion

🤫 Jesus does not scold them harshly

➡️ Weakness explained is still weakness, not excused away

## 🔂 Prayed The Third Time, Saying The Same Words

Three total prayers are prayed, with the same request repeated each time.

Jesus brings his full honesty before God again and again.

He does not settle for one quick request.

🔢 Three total prayers are prayed

🗣️ Each one uses the same words

🙏 Full honesty is brought before God repeatedly

📖 Persistent prayer is not weak prayer

## 😔 Sleep On Now, And Take Your Rest

By this point, the time for watching has already passed.

Jesus's words here sound almost like permission.

Nothing the disciples can do now will change what happens next.

⏳ The time for watching has passed

😔 His words sound like permission now

🚫 Nothing they do changes what comes next

➡️ Some moments arrive uninvited

## ⚠️ The Hour Is At Hand

Jesus has spoken of his coming hour throughout this gospel.

He now announces that it has fully arrived.

The waiting itself is finally over.

⏳ Hour at hand means the moment has arrived

🔁 Jesus referenced this hour earlier in the gospel

🎯 The waiting is finally over

📖 Everything Jesus foretold now begins to happen

## 🚶 Rise, Let Us Be Going

Jesus does not wait passively for his arrest to come find him.

He gets up and walks toward it.

He meets the moment on his feet rather than being caught off guard.

🚶 Jesus walks toward his own arrest

🚫 He does not wait passively for it

🦶 He meets the moment on his feet

➡️ Courage here looks like simply standing up

# Matthew 26:47-50
# 😘 The Kiss Of Betrayal
---
## ⚔️ A Great Multitude With Swords And Staves

"Staves" means wooden clubs or staffs, carried alongside actual swords.

This is not a small arrest party.

It is a force large enough to prevent any resistance from Jesus's followers.

🏓 Staves means wooden clubs or staffs

⚔️ Swords are carried alongside them

👥 This is a large armed group

📖 Overwhelming force meets a man unwilling to resist

## 😘 Whomsoever I Shall Kiss, That Same Is He

A kiss on the cheek was a normal, respectful greeting between a disciple and a teacher.

No one in the garden would question seeing it happen.

Judas turns that exact gesture of honor into the signal that identifies Jesus for arrest.

The soldiers simply watch for that one sign in the dark.

😘 A kiss was a normal respectful greeting

🎯 Judas turns it into a signal

🤝 Honor becomes the tool of betrayal

➡️ The closest gestures can hide the worst intentions

## 🗣️ Hail, Master, And Kissed Him

Judas still uses the respectful title "Master" even while carrying out the betrayal.

He had called Jesus that same title for three whole years.

His words and his actions completely contradict each other in this one moment.

A title of honor becomes the cover for an act of betrayal.

🗣️ Judas still calls him Master

😘 His kiss carries out the betrayal

⚖️ His words and his actions contradict

📖 Respectful language can mask real betrayal

## 🤝 Friend, Wherefore Art Thou Come

Jesus responds to his betrayer with a direct, calm question.

He does not respond with anger.

He calls Judas "friend" even here, naming exactly what is happening without losing his composure.

🤝 Jesus calls him friend, not enemy

❓ He asks a direct, calm question

😌 He does not lose his composure

➡️ Clarity and calm can exist even in betrayal

## 🙌 Then Came They, And Laid Hands On Jesus, And Took Him

After all the planning, negotiating, and waiting, the arrest happens in one short sentence.

Chapters of buildup land on a single quiet moment.

The moment feels almost anticlimactic after everything leading up to it.

🙌 The arrest itself is brief

📜 Chapters of buildup lead to one sentence

😶 The moment feels almost quiet

📖 The biggest turning points are not always dramatic

# Matthew 26:51-54
# 🗡️ Put Up Thy Sword
---
## 🗡️ Stretched Out His Hand, And Drew His Sword

John's gospel names this disciple as Peter and the servant as Malchus.

Peter acts instantly on his earlier promise to stand by Jesus no matter what.

He does this even in a moment of real, immediate danger.

🗡️ John names the disciple as Peter

👤 The servant is named Malchus

💪 Peter acts on his earlier promise

➡️ Loyalty shows up fast, wrong method

## ⚔️ Smote Off His Ear

A sword swing aimed at the head missed its mark.

It struck only the ear instead.

Luke's gospel adds that Jesus immediately healed the wound, even in the middle of his own arrest.

⚔️ The strike aimed higher and missed

👂 Only the ear was struck

🩹 Luke records Jesus healing it

📖 Jesus shows mercy even while being seized

## 🛑 Put Up Again Thy Sword Into His Place

Jesus corrects Peter immediately and firmly.

He has already chosen not to resist this arrest.

He will not let a disciple's violence change that decision now.

🛑 Jesus corrects Peter immediately

🎯 He has already chosen not to resist

🚫 He will not let violence change his path

➡️ Jesus controls this moment, not the mob

## ⚖️ All They That Take The Sword Shall Perish With The Sword

Jesus states a general warning here about violence answered with violence.

This is not only a rule for Peter.

This principle echoes through later New Testament teaching on how believers face persecution.

⚖️ Violence answered with violence has a cost

📜 A general warning, not just for Peter

🔁 The principle echoes in later New Testament teaching

📖 Jesus rejects the sword as his own method

## 👼 Twelve Legions Of Angels

A Roman legion numbered around six thousand soldiers.

Twelve legions would be an almost unimaginable force.

Jesus states plainly that he could call overwhelming angelic power to his defense at any moment.

He chooses not to, which reveals that his arrest is a choice, not a defeat.

🪖 A legion numbered around six thousand soldiers

👼 Twelve legions would be an overwhelming force

🙅 Jesus chooses not to call them

📖 This arrest is a choice, not a defeat

# Matthew 26:55-56
# 🏃 The Disciples Flee
---
## 🗡️ Are Ye Come Out As Against A Thief

Jesus points out the absurdity of an armed raid against someone who taught openly every day.

He had never hidden from anyone.

He had never resisted arrest or acted like a criminal avoiding capture.

🗡️ Jesus questions the armed show of force

📢 He taught openly every day in public

🚫 He never hid or resisted before this

➡️ The weapons reveal fear, not real danger

## 📜 That The Scriptures Of The Prophets Might Be Fulfilled

Matthew repeatedly points back to Old Testament prophecy throughout this gospel.

This arrest is no exception to that pattern.

Even this violent, chaotic scene fits inside a plan written centuries earlier.

📜 Matthew connects this to old prophecy again

🎯 Even chaos fits inside God's written plan

🕰️ The plan was written centuries earlier

📖 Nothing happening here is outside God's control

## 🏃 Then All The Disciples Forsook Him, And Fled

Every single disciple runs here, not just one weak follower among many faithful ones.

Jesus had already predicted this earlier in the very same chapter.

He said they would all be offended and scatter.

That prediction comes true within minutes.

🏃 Every disciple runs away

👥 Not one of them stays behind

🔁 This fulfills Jesus's earlier prediction

📖 Loyalty under pressure beats loyalty in words

# Matthew 26:57-61
# ⚖️ False Witnesses
---
## 🏛️ Led Him Away To Caiaphas The High Priest

This nighttime gathering of priests, scribes, and elders functioned as Israel's ruling religious court.

Holding the trial at night, away from normal public hours, was unusual.

It kept the whole process hidden and rushed.

🏛️ This was Israel's ruling religious court

🌙 Meeting at night was unusual

🤫 Secrecy kept the process hidden

➡️ A rushed process rarely serves real justice

## 🚶 Peter Followed Him Afar Off

Peter does not abandon Jesus completely like the other disciples did.

He keeps enough distance to stay unnoticed instead.

This careful distance sets up the exact situation where his denial will happen soon.

🚶 Peter follows, but stays far back

👀 He wants to avoid being noticed

🎯 This distance sets up his coming denial

📖 Partial courage can still lead to failure

## 🔍 Sought False Witness Against Jesus, To Put Him To Death

The court has already decided the verdict before hearing any evidence.

They are not searching for the truth here.

They are only searching for testimony that fits a conclusion already reached.

🔍 The verdict was decided first

🚫 They are not searching for truth

🎯 Testimony is shaped to fit a conclusion

📖 A rigged process still looks like a trial

## 👥 At The Last Came Two False Witnesses

Jewish law required at least two matching witnesses to establish a serious charge.

The court finally finds two who can agree on something.

Even then, the charge itself still twists Jesus's actual words.

👥 Two matching witnesses met the legal requirement

📜 This followed an old legal standard

⚖️ The charge itself was twisted

➡️ A legal form does not guarantee truth

## 🏛️ I Am Able To Destroy The Temple Of God, And To Build It In Three Days

This badly twists something Jesus actually said back in John's gospel.

There he was speaking about his own body, not the physical temple building.

The witnesses either misunderstood his words or deliberately distorted them.

🏛️ This twists Jesus's real statement from John's gospel

🏗️ He meant his own body, not a building

🎭 Words get distorted to sound like a threat

📖 Truth can be bent into a false charge

## 📜 False Witnesses Were Written About Long Before

The Psalms speak more than once about false witnesses rising against a righteous man.

Jesus faces exactly the pattern scripture had already described.

That pattern was written centuries before this trial ever happened.

📜 Psalms describe false witnesses rising against the innocent

🎯 Jesus faces that exact pattern here

🕰️ Scripture named this centuries earlier

📖 This trial fits a much older pattern

# Matthew 26:62-66
# ✝️ Guilty Of Death
---
## 🤐 Answerest Thou Nothing

Jesus stays silent while the false charges are presented.

He refuses to defend himself against testimony that does not even agree with itself.

His silence fulfills a pattern described centuries earlier in Isaiah about a suffering servant who does not argue back.

🤐 Jesus stays silent under false charges

⚖️ The testimony does not even agree with itself

📜 Isaiah already described this kind of silence

📖 Silence here is strength, not weakness

## 🙏 I Adjure Thee By The Living God

"Adjure" means to place someone under a solemn oath to answer truthfully.

The high priest forces Jesus to respond under the weight of God's own name.

He hopes to trap him either way he answers.

🙏 Adjure means placing someone under a solemn oath

⚖️ Caiaphas invokes God's own name here

🪤 The question is designed as a trap

➡️ A forced oath cannot force a false answer

## ✝️ Art Thou The Christ, The Son Of God

This is the exact question Jesus's entire ministry has been building toward.

Caiaphas asks it directly.

He expects either a denial he can dismiss or a claim he can call blasphemy.

✝️ This is the central question of the gospel

⚖️ Caiaphas expects to use the answer against him

🎯 Either answer seems to trap Jesus

📖 The most important question finally gets asked plainly

## 👑 Hereafter Shall Ye See The Son Of Man Sitting On The Right Hand Of Power

Jesus answers by quoting language from the prophet Daniel about a heavenly figure given authority over all nations.

He is not denying the charge of claiming divine authority.

He is confirming it using scripture the court would recognize immediately.

📜 Jesus quotes language from the prophet Daniel

👑 It describes authority given over all nations

✅ He confirms the charge rather than denying it

📖 Jesus answers with scripture, not evasion

## 👕 The High Priest Rent His Clothes

Tearing one's own garment was a traditional sign of grief or outrage at hearing blasphemy.

Caiaphas performs this visible reaction immediately after Jesus's answer.

He treats the claim itself as the proof of guilt.

👕 Tearing clothes signaled grief or outrage

😡 Caiaphas reacts immediately and visibly

⚖️ The claim itself becomes his proof

➡️ Jesus is condemned for telling the truth

## ⚖️ He Is Guilty Of Death

The council reaches its verdict immediately.

No deliberation is recorded, and no further witnesses are called.

The outcome was effectively decided long before this meeting, back when the leaders first plotted his death in verse four.

⚖️ The verdict comes with no real deliberation

🚫 No further witnesses are called

🔁 This outcome was decided back in verse four

📖 A verdict decided first is no trial

# Matthew 26:67-71
# 🐓 Mockery And The First Denial
---
## 😡 Did They Spit In His Face, And Buffeted Him

"Buffeted" means struck with closed fists.

Spitting in someone's face was one of the most severe public insults available in this culture.

It was reserved for the deepest contempt.

👊 Buffeted means struck with closed fists

🤢 Spitting was one of the worst public insults

😡 It showed the court's deepest contempt

📖 Mockery joins violence against an already condemned man

## ✋ Others Smote Him With The Palms Of Their Hands

Open handed strikes added public humiliation on top of the closed fisted blows already described.

The guards and onlookers treat Jesus as an object for abuse now.

The verdict has already been reached.

✋ Open handed strikes added humiliation

👊 Closed fists had already struck him first

🎭 He becomes an object for abuse

➡️ A guilty verdict opens the door to cruelty

## 🔮 Prophesy Unto Us, Thou Christ, Who Is He That Smote Thee

The mockers twist the very title Jesus just claimed, "Christ," into an insult.

They dare him to use the prophetic power he claimed to have.

He may have been blindfolded during this exact moment.

🔮 They mock the title Christ he just claimed

🎲 They treat it as a guessing game

🙈 He may have been blindfolded during this

📖 Mockery often targets the very truth

## 🏠 Peter Sat Without In The Palace

"Without" here means outside, in the courtyard rather than inside where the actual trial takes place.

Peter has followed far enough to stay near Jesus.

He stays far enough back to avoid being clearly associated with him.

🏠 Without means outside, in the courtyard

🚶 Peter stayed near, but not too close

😨 He wanted to watch without being seen

➡️ Fear shapes how close Peter dares to stand

## 👩 A Damsel Came Unto Him, Saying, Thou Also Wast With Jesus

"Damsel" simply means a young woman, likely a servant working in the high priest's courtyard.

The first accusation against Peter comes from someone with no real power over him.

It still unsettles him enough to lie.

👩 Damsel means a young woman, likely a servant

❓ She has no real power over him

😨 Her words still unsettle Peter deeply

📖 Small accusations can still expose real fear

## 🙅 He Denied Before Them All, Saying, I Know Not What Thou Sayest

This is the first of the three denials Jesus predicted earlier in this exact chapter.

Peter does not simply stay quiet here.

He actively denies knowing Jesus at all, in front of people listening nearby.

🥇 This is the first predicted denial

🙅 Peter actively denies knowing Jesus

👂 Other people are listening nearby

➡️ Fear turns silence into an active lie

## 🚪 Gone Out Into The Porch, Another Maid Saw Him

Peter moves to a different location.

He is likely trying to put distance between himself and the first accusation.

A second person recognizes him anyway, naming "Jesus of Nazareth" directly this time.

🚪 Peter moves to a new location

👁️ A second person recognizes him anyway

🏷️ This time Jesus is named directly

📖 Running from one accusation can lead to another

# Matthew 26:72-75
# 😭 Peter's Final Denials
---
## 🤬 Again He Denied With An Oath, I Do Not Know The Man

An oath called on God as a witness to back up the truth of a statement.

Peter now swears by God's own name to support a lie.

This second denial is far more serious than the first.

🤬 An oath called God as a witness

🙅 Peter swears to support a lie

🥈 This is the second denial

➡️ The lie grows heavier with each repeat

## 🗣️ Surely Thou Also Art One Of Them, For Thy Speech Bewrayeth Thee

"Bewrayeth" means reveals or gives away.

Peter's Galilean accent marks him as an outsider in Jerusalem.

It exposes him even though he never once says where he is from.

🗣️ Bewrayeth means reveals or gives away

🗺️ Peter's accent marks him as Galilean

👂 His own voice exposes him here

📖 Some truths cannot be hidden behind denial

## 😭 Then Began He To Curse And To Swear

The third denial is the strongest yet, backed with cursing on top of the earlier oath.

The rooster crows the instant he finishes speaking.

Peter instantly remembers Jesus's exact prediction from earlier that same night.

His weeping is not quiet regret.

It is bitter, broken grief at hearing his own voice fulfill what Jesus already knew.

🥉 The third denial is the strongest yet

🐓 The rooster crows right on cue

💭 Peter instantly remembers Jesus's prediction

📖 Bitter tears follow a prediction fulfilled exactly
`.trim();

export const MATTHEW_TWENTY_SIX_PERSONAL_SECTIONS = parseMatthewTwentySixRawNotes(MATTHEW_TWENTY_SIX_RAW_NOTES);
