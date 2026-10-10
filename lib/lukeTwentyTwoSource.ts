export type LukeTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeTwentyTwoRawNotes(rawText: string): LukeTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 22:${startVerse}` : `Luke 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Luke 22 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_TWENTY_TWO_RAW_NOTES = `# Luke 22:1-6
# 🗝️ Judas Agrees To Betray Jesus
---
## 🍞 The Feast Of Unleavened Bread

"The feast of unleavened bread" means a seven day festival tied to Passover.

Bread without yeast recalled the rushed night Israel left Egypt with no time to let dough rise.

This feast and Passover had become so linked that Luke treats them as one event.

Everything in this chapter unfolds during Jerusalem's most crowded religious week.

🍞 Unleavened bread means bread without yeast

📅 The feast ran seven days

🏃 It recalled Israel's hurried exodus

📖 This chapter unfolds during Passover week

## 😠 For They Feared The People

The chief priests and scribes wanted Jesus dead.

They did not want to arrest him in public.

They feared the people, since many in Jerusalem saw Jesus as a prophet or even the Messiah.

A public arrest during the festival could spark a riot the Romans would blame on them.

Fear of the crowd, not any real law, shaped the secret plan that follows.

😠 Religious leaders wanted Jesus dead

👥 The people still supported Jesus

⚠️ A public arrest risked a riot

➡️ Fear of the crowd forced secrecy

## 👿 Then Entered Satan Into Judas

This phrase does not mean Judas lost control of his own choices.

Luke describes a real spiritual force working through Judas's own greed and disappointment.

John's Gospel repeats this same detail about Satan entering Judas later at the supper.

Judas still walked to the chief priests himself and asked for the deal.

👿 Satan worked through Judas's own will

🤝 Judas still made the choice himself

🔁 John's Gospel repeats this same detail

📖 Evil can use a willing heart

## 👥 Surnamed Iscariot, Being Of The Number Of The Twelve

"Iscariot" likely names Judas as a man from Kerioth, a town in Judea.

Luke adds "of the number of the twelve" right before describing the betrayal.

That detail makes clear this was not an outsider or an enemy soldier.

One of Jesus's own closest followers became the one who turned against him.

🗺️ Iscariot likely names his hometown

👥 Judas was one of the twelve

💔 Betrayal came from inside the circle

➡️ Closeness does not guarantee loyalty

## 🗣️ Communed With The Chief Priests And Captains

"Communed" means Judas sat down and talked through the details with them.

"Captains" means officers who commanded the temple guard, the only armed force the priests controlled.

This was not a sudden outburst but a planned negotiation.

Judas offered them something they had wanted for a long time, a way in.

🗣️ Communed means a planned discussion

💂 Captains led the temple guard

📋 This was a calculated deal

➡️ Judas gave them their opportunity

## 🪙 They Were Glad, And Covenanted To Give Him Money

"Covenanted" means they struck a formal agreement, not a loose promise.

Matthew's Gospel names the price as thirty pieces of silver, the standard payment for a slave.

The chief priests' gladness here stands in sharp contrast to the grief this choice caused.

A price was now attached to the life of the Son of God.

📜 Covenanted means a formal agreement

🪙 Matthew names the price, thirty silver pieces

😊 Their gladness ignored the horror

📖 A price was set on Jesus's life

## 👀 Sought Opportunity To Betray Him Unto Them In The Absence Of The Multitude

Judas now watched for the right moment rather than acting at once.

"The absence of the multitude" means a time with no crowd to interfere or protest.

Jesus taught openly in the temple every day, surrounded by people who supported him.

Judas needed Jesus alone, which made the quiet garden of Gethsemane the perfect target later.

👀 Judas waited for the right moment

👥 The multitude means the crowd

🌳 He needed Jesus alone

➡️ This sets up the later arrest

# Luke 22:7-13
# 🍞 Preparing The Passover
---
## 🐑 When The Passover Must Be Killed

"The passover" refers to the lamb every Jewish family sacrificed for the meal.

Each lamb was killed in the temple on one afternoon, the fourteenth day of the month Nisan.

Thousands of lambs died that day across Jerusalem, one for nearly every household.

Jesus would become the true Passover lamb only hours later.

🐑 The passover lamb was sacrificed this day

📅 This happened on Nisan fourteen

🏙️ Thousands of lambs died across Jerusalem

📖 Jesus becomes the true Passover lamb

## 👥 He Sent Peter And John

Jesus chose two of his closest disciples for this errand, not the whole group.

Peter and John would also stand beside Jesus at his hardest moments, including Gethsemane.

Sending only two kept the location of the meal quiet until the last moment.

Judas still did not know where the Passover would be eaten.

👥 Jesus picked only two disciples

🤝 Peter and John were his closest

🤫 Keeping it quiet protected the plan

➡️ Judas still had no location

## 🏺 A Man Meet You, Bearing A Pitcher Of Water

Carrying water in this culture was normally a woman's daily task, not a man's.

A man carrying a water pitcher would stand out instantly in a crowd.

Jesus gives Peter and John an unmistakable sign, arranged ahead of time.

This small detail shows Jesus had already planned this meeting carefully.

🏺 A water pitcher was usually women's work

👀 A man carrying one stood out

🧭 This sign let them find the house

📖 Jesus planned the meeting in advance

## ❓ Where Wilt Thou That We Prepare

Peter and John do not know the location, yet they ask only how, not why.

Jesus had not told them in advance where this meal would happen.

Their question shows they trusted Jesus's instructions before seeing any proof it would work.

Obedience here came before understanding.

❓ They did not know the location

🙋 They asked only for instructions

🤝 Trust came before any proof

➡️ Obedience preceded understanding

## 🏠 The Goodman Of The House

"Goodman" is an old word for the male head of a household.

Jesus calls himself "the Master" when giving the password to this stranger.

That title alone was enough to open the door.

Someone had already agreed in advance to host this meal.

🏠 Goodman means the head of the house

🗣️ The Master was Jesus's identifying title

🔑 The password unlocked an existing arrangement

➡️ This meeting was prepared beforehand

## 🛋️ A Large Upper Room Furnished

Upper rooms sat above the main floor, often used for guests or quiet gatherings.

"Furnished" likely means it already had cushions, a table, and lamps ready for a meal.

A room large enough for thirteen men reclining to eat was no small space.

Someone with real means had quietly offered this room to Jesus.

🏠 Upper rooms sat above the main floor

🛋️ Furnished means already set up for guests

👥 Large enough for all thirteen men

📖 A generous host stayed unnamed

## 🍷 They Made Ready The Passover

Preparing the Passover meant more than cooking a lamb.

It included removing all leaven from the house, and preparing bitter herbs, wine, and unleavened bread.

These instructions dated back to the exodus from Egypt over a thousand years earlier.

Peter and John were unknowingly setting the table for the most important meal in history.

🍷 Preparing included wine, herbs, and bread

🧹 All leaven had to be removed

📜 These instructions dated back to the exodus

📖 This meal would become unforgettable

# Luke 22:14-20
# 🍷 The Last Supper
---
## ⏰ When The Hour Was Come

"The hour" refers to the time Jesus had spoken about throughout Luke's Gospel.

Jesus had repeatedly said his hour had not yet come, back near the start of his ministry.

Now, for the first time, Luke says plainly that the hour has arrived.

Everything Jesus came to do was about to happen in the next day.

⏰ The hour means Jesus's appointed time

🔁 Jesus mentioned it throughout his ministry

🚪 It has now finally arrived

📖 His mission reaches its climax

## 👥 The Twelve Apostles With Him

Judas was still physically present at this table, even after agreeing to betray Jesus.

Nobody at the meal yet suspected him.

Jesus knowingly shared this sacred meal with the man who would turn him in.

Jesus's love for Judas stayed intact even while Judas planned his betrayal.

👥 All twelve, including Judas, were present

🤫 No one suspected him yet

💔 Jesus shared the meal knowingly

➡️ Love continued despite betrayal

## ❤️ With Desire I Have Desired

This phrase is a Hebrew way of saying "I have deeply, truly wanted this."

Repeating a word in different forms was a common way to intensify a feeling.

Jesus wanted this specific meal with these specific men more than any meal before it.

His desire was about this last moment together, not about the food.

❤️ The phrase means deeply wanted

🔁 Repetition intensifies the feeling

👥 Jesus wanted this exact meal

📖 This moment mattered more than food

## ⚰️ Before I Suffer

Jesus names his coming suffering plainly, without hiding it from his closest friends.

He had predicted this moment several times earlier in Luke's Gospel.

Saying it out loud now, at the table, made the coming hours impossible to avoid.

Jesus walked toward the cross with full knowledge of what was coming.

⚰️ Jesus names his coming suffering

🔁 He had predicted it before

🪑 He said it plainly at the table

➡️ He walked forward with full knowledge

## 🔮 Until It Be Fulfilled In The Kingdom Of God

Jesus points past this meal toward a future, completed version of it.

Jewish tradition already connected Passover with the hope of final deliverance and the coming kingdom.

Jesus says this meal will not happen again in its old form until that kingdom fully arrives.

The Last Supper becomes a bridge between the old Passover and a future celebration not yet seen.

🔮 Jesus points to a future fulfillment

🕊️ Passover already carried kingdom hope

🌉 This meal bridges old and new

📖 A future feast is still coming

## 🍷 He Took The Cup, And Gave Thanks

A traditional Passover meal included four separate cups of wine at set points in the ritual.

"Gave thanks" describes a standard Jewish blessing spoken before drinking, not a private prayer.

Jesus follows the familiar rhythm of the meal before changing its meaning completely.

What looked like a normal step in the ritual became something new in his hands.

🍷 Passover included four ritual cups

🙏 Giving thanks was a standard blessing

📜 Jesus followed the familiar pattern

➡️ He filled the ritual with new meaning

## 🤝 Divide It Among Yourselves

Jesus instructs the cup to be shared among all twelve men present, Judas included.

Sharing one cup bound the group together in one meal.

This small instruction carried the same inclusion Jesus showed throughout his ministry.

No one at this table was excluded from what Jesus was about to give.

🍷 One cup shared among all twelve

🤝 Sharing united the whole group

👥 Even Judas was included here

📖 Jesus excluded no one at the table

## 🍇 The Fruit Of The Vine

This phrase simply means wine, made from grapes grown on a vine.

Jesus avoids the plain word "wine" and uses this older, poetic Jewish phrase instead.

He says he will not drink it again until God's kingdom fully comes.

Jesus treats this cup as his last ordinary drink before everything changes.

🍇 Fruit of the vine means wine

📜 An older, poetic way to say it

🚫 His last cup before the kingdom

➡️ This meal marked a turning point

## 🍞 This Is My Body Which Is Given For You

Jesus does not say the bread represents a story about his body.

He says plainly that the bread now stands for his body, given on their behalf.

"Given for you" points directly to the death he would suffer the next day.

This single sentence turns a Passover meal into the first communion.

🍞 Bread now stands for his body

🎁 Given for you means given in death

📅 This happens the very next day

📖 The first communion begins here

## 🔁 This Do In Remembrance Of Me

"Remembrance" in Jewish tradition did not mean a quiet, private memory.

Passover itself was already a yearly act of remembering the exodus together as a community.

Jesus takes that same kind of shared remembering and now points it at himself.

He asks to be remembered the same way Israel remembered its own rescue from Egypt.

🔁 Remembrance here means shared, repeated practice

📜 Passover already functioned as remembrance

➡️ Jesus points that practice at himself

📖 He asks to be remembered like the exodus

## 📜 This Cup Is The New Testament In My Blood

"Testament" here means covenant, a binding agreement sealed with blood.

The old covenant at Mount Sinai was also sealed with the blood of sacrificed animals.

Jesus declares his own blood now seals a new, different agreement between God and people.

This phrase ties directly back to the prophet Jeremiah's promise of a new covenant.

📜 Testament means a binding covenant

🩸 Old covenants were sealed with blood

🆕 Jesus seals a new covenant

📖 This fulfills Jeremiah's promised new covenant

## 🩸 Which Is Shed For You

"Shed" means poured out, describing blood deliberately given, not accidentally lost.

Just like the bread, Jesus names the benefit directly, for you, not for himself.

Every Passover lamb's blood had pointed toward a greater sacrifice all along.

This is the final Passover lamb, shedding blood that would actually save.

🩸 Shed means deliberately poured out

🎁 Shed for you names the benefit

🐑 Every lamb pointed to this moment

📖 Jesus is the final Passover lamb

# Luke 22:21-23
# 😔 The Betrayer At The Table
---
## 🤝 The Hand Of Him That Betrayeth Me Is With Me On The Table

Jesus reveals that his betrayer is seated at this very table, sharing this very meal.

In this culture, eating together was a sign of deep trust between people.

Judas had just shared bread and wine with Jesus moments before this announcement.

Betrayal here broke one of the most sacred bonds in that culture, table fellowship.

🤝 Eating together signaled deep trust

💔 The betrayer sat at this table

🍞 Judas had just shared the meal

📖 Betrayal broke a sacred bond

## 📜 As It Was Determined

This does not mean Judas was forced against his will to betray Jesus.

God's larger plan and Judas's own free choice both stand true at the same time.

Scripture had already pointed toward this kind of betrayal long before this night.

God's plan moved forward without erasing anyone's personal responsibility.

📜 Determined means planned in advance

🧍 Judas still chose this freely

🔮 Scripture had already pointed this way

➡️ Plan and choice both stayed true

## ⚠️ Woe Unto That Man By Whom He Is Betrayed

"Woe" is a strong word of warning, closer to grief mixed with judgment.

Jesus does not excuse Judas just because the betrayal fit into a larger plan.

Judas remained fully responsible for the choice he was about to make.

Being part of a bigger story never removes personal guilt.

⚠️ Woe signals grief mixed with warning

🚫 Judas is not excused here

⚖️ He stays fully responsible

📖 A bigger plan never removes guilt

## ❓ Which Of Them It Was That Should Do This Thing

None of the eleven other disciples suspected Judas by name.

Their honest confusion shows how well Judas had hidden his true plan.

Each man questioned his own heart instead of pointing a finger at another.

Sometimes the most dangerous betrayal is the one nobody sees coming.

❓ No one suspected Judas by name

🎭 He had hidden his plan well

🪞 Each man examined himself instead

➡️ Betrayal often comes unseen

# Luke 22:24-30
# 👑 Who Is The Greatest
---
## ⚔️ There Was Also A Strife Among Them

This argument broke out right after Jesus spoke of his own betrayal and death.

The disciples were arguing about personal rank while Jesus was preparing to die.

Their timing shows how easily pride can creep into even a sacred moment.

This was not the first time this exact argument had come up among them.

⚔️ An argument broke out immediately

💔 Jesus had just spoken of his death

🔁 This same argument had surfaced before

📖 Pride crept into a sacred moment

## 👑 Accounted The Greatest

The disciples were arguing over rank, who deserved the highest position among them.

This same argument had already surfaced earlier in Luke's Gospel.

They still pictured Jesus's kingdom in terms of status, titles, and authority.

Their understanding of greatness still looked almost exactly like the world's.

👑 They argued over rank and status

🔁 This argument had surfaced before

🌍 Their view of greatness matched the world's

➡️ True greatness would look different

## 🏛️ Kings Of The Gentiles... Called Benefactors

"Gentiles" here means non Jewish rulers, especially Greek and Roman kings.

"Benefactors" was an actual title some of these kings gave themselves after generous public gifts.

Those same kings often ruled harshly while demanding to be honored as generous heroes.

Jesus names a worldly pattern of leadership built on image, not real service.

🌍 Gentiles means non Jewish rulers

🏛️ Benefactor was a self given royal title

🎭 Image mattered more than real kindness

📖 Jesus names this familiar pattern

## 👶 Let Him Be As The Younger

In this culture, the youngest in a household held the lowest social rank.

Younger family members were expected to serve, not to be served.

Jesus flips the disciples' entire measuring stick for greatness upside down.

The one who wants top rank should act like the lowest instead.

👶 The youngest held the lowest rank

🍽️ Younger family members served others

🔄 Jesus flips the usual measuring stick

➡️ Greatness now means serving, not ranking

## 🧹 He That Is Chief, As He That Doth Serve

"Chief" describes the one leading or in charge of a group.

Jesus redefines leadership itself as active, hands on serving, not sitting above others.

This single sentence rewrites what leadership means for everyone who follows him afterward.

Authority in God's kingdom looks like a servant, not a king on a throne.

👑 Chief means the one leading

🧹 Jesus redefines leadership as serving

🔄 This rewrites leadership permanently

📖 Authority here looks like a servant

## 🧍 I Am Among You As He That Serveth

Jesus points to his own example as the final answer to their argument.

He had already proven this earlier that same night, during this very meal.

John's Gospel describes Jesus washing his disciples' feet around this same time.

The teacher became the model, not just the speaker, of true greatness.

🧍 Jesus points to his own example

🦶 He likely washed their feet that night

👨‍🏫 He modeled the lesson himself

📖 Jesus became the proof, not just the teacher

## ⚔️ Ye Are They Which Have Continued With Me In My Temptations

"Temptations" here means the trials, pressures, and tests Jesus faced throughout his ministry.

These eleven men had stayed with Jesus through hard seasons.

Jesus acknowledges their loyalty before promising them anything.

Faithfulness through difficulty earns a real place in what comes next.

⚔️ Temptations means trials and pressures

🤝 The disciples stayed through hard times

🙏 Jesus acknowledges their loyalty first

➡️ Faithfulness leads to real reward

## 👑 I Appoint Unto You A Kingdom

Jesus promises the disciples a real share in his coming kingdom.

He ties this promise directly to what his own Father had already appointed to him.

This is not a vague spiritual comfort but a specific, future inheritance.

The kingdom Jesus received from the Father, he now extends to his followers.

👑 Jesus promises a real kingdom share

🔁 It mirrors what the Father gave him

🎁 This is a specific inheritance

📖 The kingdom now extends to his followers

## 🔢 Sit On Thrones Judging The Twelve Tribes Of Israel

This promise pictures the disciples holding real authority in God's future kingdom.

"The twelve tribes of Israel" recalls the whole nation descended from Jacob's twelve sons.

Twelve disciples now stand paired symbolically with Israel's original twelve tribes.

Serving faithfully now leads to genuine authority later, not instead of it.

👑 Disciples receive real future authority

🔢 Twelve tribes trace back to Jacob's sons

🔗 Twelve disciples mirror twelve tribes

📖 Service now leads to authority later

# Luke 22:31-34
# 🐓 Satan Desires To Sift Peter
---
## 🗣️ Simon, Simon

Jesus repeats Peter's old name, Simon, twice in a row for emphasis.

Repeating a name like this was a way of signaling something serious was coming.

Jesus had earlier renamed him Peter, meaning rock, but calls him by his old name now.

The coming failure would test the very identity Jesus had given him.

🗣️ Repeating a name signals seriousness

🪨 Peter means rock, his new name

🔙 Jesus uses his old name here

➡️ A hard test was coming

## 👿 Satan Hath Desired To Have You

"You" here is plural in the original language, meaning all the disciples, not Peter alone.

"Sift you as wheat" compares this testing to shaking grain through a sieve to separate it.

Satan wanted to shake the disciples' faith apart through fear and confusion.

This same testing spirit had already tried to trap Jesus himself in the wilderness.

👿 Satan targeted all the disciples

🌾 Sifting means violent, shaking separation

😨 Fear and confusion were the weapons

📖 Satan had tried this tactic before

## 🙏 I Have Prayed For Thee

Jesus switches from "you" plural back to "thee," speaking directly to Peter alone now.

Jesus prays that Peter's faith would not completely fail, not that he would avoid failure entirely.

There is a real difference between stumbling badly and losing faith for good.

Jesus already anticipated Peter's fall and prepared for what would come after it.

🙏 Jesus prayed specifically for Peter

🎯 The prayer targeted faith, not failure

⚖️ Stumbling differs from losing faith completely

➡️ Jesus prepared for Peter's recovery

## 🔄 When Thou Art Converted, Strengthen Thy Brethren

"Converted" here means turned back around after falling away, not a first time conversion.

Jesus assumes Peter's failure in advance and already plans a purpose for it afterward.

Peter's painful experience would later make him able to strengthen other struggling believers.

Failure, fully recovered from, can become useful instead of simply shameful.

🔄 Converted means turned back around

🔮 Jesus already planned past the failure

💪 Peter's pain would later help others

📖 Recovered failure can become useful

## 💪 I Am Ready To Go With Thee, Both Into Prison, And To Death

Peter's confidence here sounds admirable, and he likely meant every word in the moment.

He had no idea how quickly real fear would overpower that same confidence.

Good intentions alone were not enough to carry him through what was coming.

Strong feelings in a calm moment do not guarantee strength in a sudden crisis.

💪 Peter's confidence sounded genuine

😨 He did not foresee real fear

🙏 Intentions alone were not enough

➡️ Calm confidence can fail under pressure

## 🐓 The Cock Shall Not Crow This Day, Before That Thou Shalt Thrice Deny That Thou Knowest Me

Jesus names the exact number of denials and the exact timing before any of it happens.

"Thrice" means three times, a specific and testable prediction, not a vague warning.

This prophecy would be fulfilled within hours, in the same night it was spoken.

Jesus's knowledge of Peter's failure never stopped him from loving Peter first.

🐓 Cock crowing marked early morning

🔢 Thrice means exactly three denials

⏰ This happens within the same night

📖 Jesus loved Peter before the failure

# Luke 22:35-38
# ⚔️ A Time Of Swords
---
## 💰 Without Purse, And Scrip, And Shoes

A "purse" held money, and a "scrip" was a small bag for carrying food on a trip.

Jesus had earlier sent the disciples out on short mission trips without any of these supplies.

They depended completely on the hospitality of strangers during those earlier journeys.

That earlier season of provided for ministry was now about to change completely.

💰 Purse means a money bag

🎒 Scrip means a small travel bag

🤝 They once depended on hospitality

➡️ That season is about to change

## ⚔️ He That Hath No Sword, Let Him Sell His Garment, And Buy One

Jesus is not commanding the disciples to start an armed uprising against Rome.

He is warning them plainly that hostility and real danger are coming soon.

A sword here works as a symbol of a world turning openly hostile to them.

Jesus prepares them emotionally for a harsher season, not for a literal battle plan.

⚔️ This is not a call to war

⚠️ It warns of coming hostility

🌍 The world was turning hostile

📖 Jesus prepares them emotionally, not militarily

## ⚖️ Reckoned Among The Transgressors

This phrase quotes Isaiah's prophecy about a suffering servant, written centuries earlier.

"Transgressors" means criminals or lawbreakers, exactly how Jesus would soon be treated.

Jesus points directly to scripture to explain what is about to happen to him.

Nothing happening the next day was random, it was written long before.

📜 This quotes Isaiah's ancient prophecy

⚖️ Transgressors means criminals or lawbreakers

🪦 Jesus would be treated as one

📖 Scripture foretold this exact moment

## ⏳ The Things Concerning Me Have An End

Jesus says his earthly mission is reaching its final stage.

Everything written about him in scripture was moving toward its completion.

This is not a defeat but a fulfillment, the plan reaching its intended finish.

What looked like an ending was actually the plan arriving on time.

⏳ Jesus's mission nears its final stage

📜 Scripture about him nears fulfillment

🏁 This was completion, not defeat

➡️ The plan arrived on time

## ⚔️ Here Are Two Swords... It Is Enough

The disciples take Jesus's warning literally and point out two actual swords among them.

"It is enough" likely means Jesus is ending the conversation, not approving of armed defense.

Later that same night, Jesus rebukes Peter for actually using one of these swords.

The disciples missed the point of the warning almost as soon as they heard it.

⚔️ The disciples took this literally

🛑 It is enough likely ends the talk

🚫 Jesus later rebukes using a sword

➡️ They missed the real warning

# Luke 22:39-46
# 🙏 Gethsemane
---
## 🚶 As He Was Wont, To The Mount Of Olives

"Wont" is an old word meaning accustomed or usual habit.

The Mount of Olives sat just outside Jerusalem's walls, a short walk from the upper room.

Jesus had a regular habit of going there, mentioned earlier in this same chapter.

This was a familiar, well worn path for Jesus, not a new or secret destination.

🔁 Wont means a usual habit

🗺️ The Mount of Olives sat near Jerusalem

🚶 Jesus went there regularly

➡️ This path was familiar, not secret

## ⚠️ Pray That Ye Enter Not Into Temptation

Jesus warns the disciples before anything happens, not after they already fail.

"Temptation" here points specifically toward the coming test of fear and abandonment.

This same warning gets repeated again at the very end of this section.

Jesus clearly saw this moment as dangerous enough to need direct, repeated warning.

⚠️ Jesus warns them in advance

😨 Temptation here means fear and failure

🔁 This warning repeats later in the passage

➡️ Jesus saw real danger ahead

## 🪨 Withdrawn From Them About A Stone's Cast

"A stone's cast" means about the distance a thrown stone could travel.

It was likely somewhere near thirty or forty feet.

Jesus stayed close enough to still be seen, but far enough to pray alone.

Even his closest friends could not carry this particular burden with him.

🪨 A stone's cast means a short distance

👀 Close enough to still be seen

🙏 Jesus needed to pray alone

📖 Some burdens cannot be shared

## 🍷 If Thou Be Willing, Remove This Cup From Me

"This cup" is a symbol for the suffering, judgment, and death Jesus was about to endure.

The same image appears throughout the Old Testament for God's judgment poured out.

Jesus honestly asks if there is another way, showing his full, genuine humanity.

This prayer proves Jesus truly dreaded what was coming, not just performed calm acceptance.

🍷 The cup symbolizes coming suffering

📜 This image runs through the Old Testament

😨 Jesus honestly asks for another way

📖 His dread here was completely real

## 🙏 Nevertheless Not My Will, But Thine, Be Done

Jesus names his own honest desire first, then submits it entirely to the Father's will.

Real submission here includes real reluctance, not a cheerful, easy agreement.

This single sentence becomes the hinge the entire crucifixion turns on.

Obedience that costs something is worth far more than obedience that costs nothing.

🙏 Jesus names his will honestly

⚖️ Submission still included real reluctance

🔑 This sentence is the hinge of the story

📖 Costly obedience matters most

## 👼 An Angel Unto Him From Heaven, Strengthening Him

God the Father does not remove the cup, but he does send help for the struggle.

Angels elsewhere in scripture strengthen people after intense moments of testing, including Elijah.

This small detail shows comfort arriving in the middle of suffering, not instead of it.

Jesus received real support even while walking straight toward real pain.

👼 An angel came to strengthen him

🔁 Elijah received similar help earlier

🤝 Comfort came during suffering, not instead of it

➡️ Support and pain existed together

## 😖 Being In An Agony He Prayed More Earnestly

"Agony" describes an intense, physical and emotional struggle, stronger than ordinary distress.

Luke, likely a physician, chooses a medically precise word for extreme bodily anguish.

"More earnestly" means Jesus prayed harder and more desperately as the struggle grew.

Jesus's suffering in this garden was every bit as real as his suffering on the cross.

😖 Agony means intense physical anguish

🩺 Luke likely used a medical term

🙏 Earnestly means more desperate prayer

📖 This suffering was fully real

## 💧 His Sweat Was As It Were Great Drops Of Blood

This likely describes a rare medical condition.

Extreme stress can cause tiny blood vessels under the skin to break.

The text uses "as it were," comparing the sweat to blood rather than stating it was blood.

Either way, the image shows suffering severe enough to show visibly on his body.

💧 Extreme stress can rupture tiny blood vessels

📖 As it were signals a comparison

😣 His suffering showed on his body

➡️ Hidden anguish became visible suffering

## 😢 He Found Them Sleeping For Sorrow

This detail excuses the disciples slightly, naming grief rather than simple laziness as the cause.

Deep sadness can genuinely exhaust the body, not just the mind.

Even so, their sleep left Jesus completely alone during his hardest hour.

Good intentions and real grief still could not keep them watching with him.

😢 Sorrow genuinely exhausted their bodies

🛌 Grief, not laziness, caused the sleep

😔 Jesus still faced this alone

➡️ Good intentions did not keep them awake

## 😴 Why Sleep Ye? Rise And Pray, Lest Ye Enter Into Temptation

Jesus repeats almost the exact warning from the start of this section.

The repetition shows how urgent, and how unheeded, his earlier warning had already become.

Hours later, in the high priest's courtyard, Peter's unprepared failure will prove this warning true.

Unanswered warnings tend to resurface later as regret.

🔁 Jesus repeats his earlier warning

⏰ Time was quickly running out

😴 The warning went unheeded again

📖 This warning proves true by morning

# Luke 22:47-53
# 💋 The Arrest
---
## 💋 Drew Near Unto Jesus To Kiss Him

A kiss on the cheek was a normal greeting between a teacher and a close follower.

Judas uses this exact gesture of affection and respect to identify Jesus for his enemies.

What should have signaled love became the very signal that marked Jesus for arrest.

This remains one of history's clearest pictures of betrayal disguised as affection.

💋 A kiss was a normal greeting

🎯 Judas used it to identify Jesus

💔 Love's gesture became betrayal's signal

📖 Betrayal often wears a familiar face

## 🗣️ Betrayest Thou The Son Of Man With A Kiss

Jesus names exactly what Judas is doing, without anger or surprise in his words.

Calling himself "the Son of man" reminds Judas exactly who he is betraying.

Jesus still speaks Judas's name directly, one final personal moment between them.

Even in betrayal, Jesus does not stop treating Judas as a person he knows.

🗣️ Jesus names the betrayal plainly

👤 Son of man names his identity

🤝 Jesus still speaks Judas's name

➡️ Jesus treats Judas as a person, still

## ⚔️ Lord, Shall We Smite With The Sword

The disciples remember the two swords from earlier in this same chapter.

They assume armed resistance is exactly what Jesus wants in this moment.

They ask permission first, but one of them acts before Jesus even answers.

Good intentions moved faster than any clear instruction from Jesus.

⚔️ They remembered the earlier swords

🙋 They asked permission to fight

🏃 One acted before any answer came

➡️ Zeal outran clear instruction

## 👂 Cut Off His Right Ear

John's Gospel names this disciple as Peter and the servant as Malchus.

"The right ear" is a specific, eyewitness level detail, not a vague wound.

This strike was meant to kill, not simply to injure.

Peter's fear from earlier in the chapter had turned briefly into violence instead.

👂 John names Peter and Malchus directly

🎯 This detail is specific, eyewitness level

⚔️ The strike aimed to kill

📖 Fear turned briefly into violence

## ✋ Suffer Ye Thus Far

"Suffer" here is an old way of saying "allow" or "permit," not referring to pain.

Jesus tells his own disciples to stop resisting the arrest completely.

This phrase may also address the soldiers, permitting them to carry out their task.

Jesus chooses full nonresistance at the exact moment resistance seemed most justified.

✋ Suffer here means allow or permit

🛑 Jesus stops the disciples' resistance

🙏 He permits the arrest to continue

📖 He chose nonresistance at the hardest moment

## ✋ He Touched His Ear, And Healed Him

Jesus performs his very last recorded miracle on the man arresting him.

This miracle required no faith and no request from the person being healed.

Jesus undoes the exact violence his own disciple had just caused.

Mercy toward an enemy was the final sign Jesus gave before his arrest.

✋ Jesus heals the man arresting him

🙅 No faith or request was needed

🔄 He undoes his disciple's violence

📖 Mercy was his final sign before arrest

## 🏏 As Against A Thief, With Swords And Staves

"Staves" means wooden clubs or heavy sticks, common weapons for an armed mob.

Jesus points out the absurdity of arresting him like a dangerous, armed criminal.

He had taught openly every day in the temple with no resistance and no crime committed.

The weapons said more about their fear of him than about any real danger he posed.

🏏 Staves means heavy wooden clubs

❓ Jesus points out the absurdity

🏛️ He taught openly without resistance

➡️ Their weapons revealed their fear

## 🌑 This Is Your Hour, And The Power Of Darkness

Jesus names this moment as a temporary window given over to evil's influence.

"The power of darkness" describes spiritual opposition working through this arrest, not just human cruelty.

Jesus had already said earlier that his own hour had come.

Two opposing hours, God's redemptive plan and darkness's brief opportunity, arrive at the very same moment.

🌑 This hour belongs briefly to darkness

👿 Spiritual opposition works through this arrest

⏰ Jesus had named his own hour earlier

📖 Two hours collide at this same moment

# Luke 22:54-56
# 🔥 Peter Sits By The Fire
---
## 🏠 Led Him... Into The High Priest's House

The high priest at this time was Caiaphas, the top religious authority in Jerusalem.

His house functioned as both a home and a place for urgent religious hearings.

Bringing Jesus here at night, rather than waiting for a normal daytime trial, broke standard practice.

Everything about this process was rushed and designed to avoid public attention.

🏠 Caiaphas was the high priest

⚖️ His house hosted urgent hearings

🌙 A night trial broke normal practice

➡️ Speed and secrecy mattered most

## 🚶 Peter Followed Afar Off

Peter does not abandon Jesus completely, but he also will not walk close beside him.

"Afar off" describes a careful, fearful distance, close enough to watch, far enough to stay hidden.

This small detail of distance quietly predicts the denial that follows only minutes later.

Fear rarely announces itself loudly, it usually just creates a little more distance.

🚶 Peter kept a careful distance

😨 Afar off suggests fear, not loyalty

🔮 This detail predicts the coming denial

➡️ Fear often shows up as distance

## 🔥 Kindled A Fire In The Midst Of The Hall

Jerusalem nights, especially in early spring, could turn genuinely cold.

This fire gathered servants and guards together in one visible, lit area.

Peter sitting here put him directly in the light, surrounded by strangers connected to the arrest.

The warmth that drew Peter in also exposed him to real danger.

🔥 Nights could turn genuinely cold

👥 The fire gathered guards and servants

💡 It put Peter in plain sight

📖 Comfort and danger sat side by side

## 👀 A Certain Maid Beheld Him... Earnestly Looked Upon Him

"Earnestly looked" means she stared closely, studying his face on purpose.

A servant girl, someone with far less social power than Peter, recognizes him first.

Peter's fear of powerful enemies was about to be triggered by the least powerful person present.

The threat Peter had dreaded arrived in the most ordinary, unthreatening form possible.

👀 Earnestly means a close, deliberate stare

🙋 A servant girl recognized him first

😨 The least powerful person exposed him

➡️ Danger arrived in an ordinary form

# Luke 22:57-62
# 😭 Peter's Three Denials
---
## 🗣️ Woman, I Know Him Not

Peter's first denial comes fast, almost automatically, with no time to think it through.

Calling her simply "Woman" shows Peter trying to sound distant and unbothered.

Just hours earlier, Peter had promised to go with Jesus even to prison and death.

Confidence spoken in a calm room can collapse instantly under real, sudden pressure.

🗣️ The first denial came fast

😐 Woman signals a distant, cold tone

💪 He had promised loyalty hours earlier

➡️ Pressure revealed the gap in his resolve

## 🔁 Thou Art Also Of Them... Man, I Am Not

A different accuser raises the same accusation only a short while later.

Peter's second denial grows slightly sharper and more direct than the first.

Each denial required Peter to actively keep building a lie, not just stay silent.

Small lies often need bigger ones to keep holding them up.

🔁 A second accuser raises the same charge

📈 This denial grows sharper

🧱 Each lie required building on the last

➡️ Small lies tend to multiply

## 🗺️ He Is A Galilaean

Galilee sat in the north, with its own regional accent that Jerusalem residents could easily recognize.

Peter's accent itself, not just his face, gave him away this third time.

There was no longer any way to deny an obvious physical fact about himself.

Peter's own voice betrayed the very identity his words were trying to hide.

🗣️ Galileans had a recognizable accent

👂 His own voice gave him away

🚫 No denial could hide that fact

📖 His identity betrayed his own words

## 🐓 Immediately, While He Yet Spake, The Cock Crew

The timing here is almost unbearably precise, the rooster crows mid sentence.

This detail matches Jesus's exact prediction from earlier that same night, word for word.

Peter's third denial was still leaving his mouth as the sign arrived.

Jesus's knowledge of Peter's failure proved completely, uncomfortably accurate.

🐓 The rooster crowed mid sentence

⏰ This matched Jesus's exact prediction

🗣️ The denial and the sign overlapped

📖 Jesus's words proved completely accurate

## 👀 The Lord Turned, And Looked Upon Peter

Luke includes a detail the other Gospels leave out, Jesus and Peter's eyes meeting directly.

This was likely not a look of anger but of sorrowful recognition.

No words passed between them, only this one silent, devastating glance.

Sometimes the most painful moments need no spoken words at all.

👀 Jesus and Peter's eyes met directly

😔 The look likely held sorrow, not anger

🤐 No words passed between them

📖 Silence can carry the heaviest weight

## 😭 Peter Went Out, And Wept Bitterly

"Bitterly" describes deep, uncontrolled grief, not a few quiet tears.

Peter finally remembers Jesus's exact prediction from earlier that very night.

Judas's guilt would soon lead him toward destruction, but Peter's grief leads him back toward restoration.

This painful moment was not Peter's ending, only his lowest point.

😭 Bitterly means deep, uncontrolled grief

🔮 Peter remembers Jesus's exact words

🔄 Grief here leads toward restoration

➡️ This was his lowest point, not his end

# Luke 22:63-65
# 👊 Jesus Mocked And Beaten
---
## 👊 The Men That Held Jesus Mocked Him, And Smote Him

The guards holding Jesus overnight begin physically abusing him before any formal trial starts.

"Smote" means they struck him with real force, not a light or symbolic gesture.

This abuse happened quietly, among soldiers, with no official charge yet even stated.

Jesus suffered real physical cruelty long before the public crucifixion most people picture.

👊 Guards struck him with real force

⚖️ No formal charge existed yet

🌙 This cruelty happened quietly overnight

📖 His suffering began before the cross

## 🙈 Blindfolded Him, They Struck Him On The Face

Covering his eyes let the guards strike without warning and without being clearly seen themselves.

This turned real suffering into a cruel joke for their own entertainment.

"Prophesy, who is it" mocks Jesus's own claim to speak with divine knowledge and insight.

They mock the very thing about Jesus that actually proved true, his knowledge of what was coming.

🙈 Blindfolding hid both attacker and warning

😈 Cruelty became entertainment for the guards

🎯 They mocked his claim to insight

📖 They mocked the truth without realizing it

## 🗣️ Many Other Things Blasphemously Spake They Against Him

"Blasphemously" means speaking with contempt toward something sacred or holy.

Luke does not record every insult, only that many more went unrecorded.

The men abusing Jesus had no idea they were mocking God himself in human form.

Their cruelty could not change who Jesus actually was.

🗣️ Blasphemously means mocking something sacred

📜 Many more insults went unrecorded

❓ They had no idea who he was

➡️ Cruelty could not change his identity

# Luke 22:66-71
# ⚖️ Before The Council
---
## ⚖️ As Soon As It Was Day... Led Him Into Their Council

"Their council" refers to the Sanhedrin, the highest Jewish religious court in Jerusalem.

This daytime session likely followed an earlier, less official nighttime questioning at Caiaphas's house.

Jewish custom generally expected capital cases to be tried during daylight, not at night.

This hearing was an attempt to make an already decided outcome look properly legal.

⚖️ The council means the Sanhedrin court

🌙 An earlier night session had already happened

☀️ Daylight trials followed Jewish legal custom

📖 This hearing aimed to look official

## 👑 Art Thou The Christ? Tell Us

"Christ" is the Greek word for the Hebrew title Messiah, God's promised anointed deliverer.

This question finally puts the central issue plainly on the table, in public, before the court.

The entire Gospel story has been building toward this exact direct question.

Everything that happens next depends entirely on how Jesus chooses to answer.

👑 Christ means God's promised deliverer

❓ The central question is finally asked

📖 The whole story builds to this moment

➡️ Jesus's answer decides what happens next

## 🚫 If I Tell You, Ye Will Not Believe

Jesus is not dodging the question or avoiding a direct answer here.

He already knows this council decided their verdict long before this hearing even began.

Jesus names their closed minds honestly instead of pretending this is a fair, open hearing.

Truth spoken to people who already refuse to hear it rarely changes anything.

🚫 Jesus is not avoiding the question

🔒 Their minds were already closed

🪞 He names their unfairness directly

➡️ Truth rarely moves a closed mind

## 🙌 The Son Of Man Sit On The Right Hand Of The Power Of God

"The right hand" was the position of highest honor and shared authority beside a ruler.

This phrase directly echoes Psalm 110, a passage the religious leaders knew well.

Jesus claims a position of divine authority right in front of the men judging him.

He answers their question with scripture instead of a simple yes or no.

👑 The right hand means highest honor

📜 This echoes Psalm 110 directly

🙌 Jesus claims divine authority here

📖 Scripture answers where plain words did not

## ❓ Art Thou Then The Son Of God?

The council presses further, sensing exactly what Jesus's first answer actually implied.

"Ye say that I am" is Jesus's way of affirming their own conclusion as true.

This phrasing does not deny the claim, it confirms it in their own words.

Jesus accepts full responsibility for a claim that would cost him his life.

❓ The council presses for a direct claim

✅ Ye say that I am means yes

🪞 Jesus confirms it in their words

📖 He accepts the cost of that claim

## ⚖️ What Need We Any Further Witness? We Have Heard Of His Own Mouth

The council treats Jesus's own words as all the proof they need to convict him.

No further evidence, witnesses, or investigation is requested after this answer.

This single moment becomes the official legal basis for the charges against him.

Jesus's own honest claim about himself is what the council uses to condemn him.

⚖️ His words became the only evidence used

🚫 No further witnesses were requested

📜 This became the basis for the charges

📖 His own honesty led to his condemnation
`.trim();

export const LUKE_TWENTY_TWO_PERSONAL_SECTIONS = parseLukeTwentyTwoRawNotes(LUKE_TWENTY_TWO_RAW_NOTES);
