export type JohnThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnThirteenRawNotes(rawText: string): JohnThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 13:${startVerse}` : `John 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 John 13 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_THIRTEEN_RAW_NOTES = `# John 13:1-3
# 🕰️ Jesus Knew His Hour Had Come
---
## His Hour Was Come

"Hour" here does not mean sixty minutes.

John uses this word throughout his gospel for the one appointed moment of Jesus's death.

Earlier in the book, Jesus said that hour had not yet come.

Now, on the final night, it finally arrives.

🕰️ Hour means Jesus's appointed time to die
📜 John has pointed toward this hour before
⏳ Earlier scenes said the hour had not come
➡️ This night, the hour finally arrives

## He Loved Them Unto The End

"Unto the end" does not just mean emotionally or in theory.

It means Jesus loved his disciples all the way through, to the point of dying for them.

This love was not a feeling that faded under pressure.

It held firm through betrayal, denial, and the cross itself.

❤️ Unto the end means all the way
⏳ Not just a feeling in the moment
🪵 Love held firm through betrayal and the cross
📖 Jesus's love never had limits

## Put Into The Heart Of Judas Iscariot

This does not mean Judas had no choice in the matter.

Temptation can take root in a heart that is willing to listen.

Judas already handled the money for the group.

He had already struggled with greed before this moment.

The devil found an opening Judas had already left open.

😈 Temptation needs a willing heart
💰 Judas already managed the money
🕵️ He already struggled with greed in chapter twelve
📖 The devil used an opening already there

## Judas Iscariot, Simon's Son

Many scholars believe "Iscariot" means man of Kerioth, a town in southern Judah.

That would make Judas the only disciple not from Galilee.

Every other apostle came from the same region up north.

John adds his father's name here so no one confuses him with the other Judas among the twelve.

🗺️ Iscariot likely means man of Kerioth
🌍 Judas was not from Galilee like the rest
👥 Every other apostle came from the north
📖 The name tells us where he came from

## All Things Into His Hands

Jesus does not kneel down to wash feet because he has no other choice.

He does it with full knowledge that he holds all authority from the Father.

The next scene looks like the lowest possible task.

It is actually the clearest picture of real power in the whole Bible.

Only someone completely secure in who he is can kneel down low.

👑 Jesus already held all authority
🧎 He chooses to kneel anyway
💧 The towel does not threaten his position
📖 Real power can kneel down low

# John 13:4-11
# 🧺 Jesus Washes The Disciples' Feet
---
## Laid Aside His Garments

Removing an outer robe like this was what the lowest household servant did before dirty work.

Jesus was not just removing his robe for comfort.

He was dressing the part of the lowest person in the house.

The teacher in the room just became the servant in the room.

👘 Removing the robe marked servant's work
🧎 Jesus takes the lowest role on purpose
🔄 Teacher becomes servant in one motion
📖 Greatness here looks like humility

## Took A Towel, And Girded Himself

Streets in this region were dusty dirt roads.

Sandals left feet covered in grime by the end of any walk.

Washing a guest's feet before a meal was a common act of hospitality.

It was considered one of the most menial jobs in the house.

🧺 Foot washing was common before meals
🦶 Dusty roads made feet genuinely dirty
🏠 Hosts offered this as basic hospitality
📖 It was still considered menial work

## Poureth Water Into A Bason

"Bason" is simply the old spelling of basin, a wide shallow bowl.

A household servant usually kept one ready near the door for guests arriving.

Jesus fills it and kneels down himself instead of calling for a servant.

The homeowner's typical first task becomes the teacher's own.

🥣 Bason is an old spelling of basin
🚪 Servants kept one ready near the door
🧎 Jesus fills it and kneels himself
📖 The host's task becomes the teacher's task

## Lord, Dost Thou Wash My Feet?

Peter is stunned to see his teacher kneeling in front of him.

In this culture, a student never did a servant's job for his own teacher.

The roles in the room feel completely backward to him in that moment.

Peter's question is really disbelief, not politeness.

😲 Peter is shocked at this sight
🎓 Students never served their own teacher
🔄 The normal roles feel reversed
📖 Shock, not manners, drives his question

## What I Do Thou Knowest Not Now

Jesus tells Peter plainly that this moment means more than it looks like right now.

Peter can only see a teacher washing dirty feet.

Jesus is also picturing the far greater washing still to come on the cross.

Understanding often comes later, not in the middle of the moment itself.

👣 Peter sees only a foot washing
✝️ Jesus pictures the cross to come
⏳ Full meaning arrives later, not now
📖 Some moments need time to understand

## Thou Shalt Never Wash My Feet

Peter means this as loyalty, not rebellion.

He cannot stand the idea of his Lord kneeling beneath him.

Jesus answers that refusing this washing means refusing a relationship with him entirely.

"No part with me" means completely cut off, not partly connected.

🙅 Peter refuses out of loyalty
👑 He cannot picture his Lord kneeling
🚫 Refusing the washing means refusing Jesus
📖 No part with me means fully cut off

## Not My Feet Only, But Also My Hands And My Head

Peter swings from one extreme to the other in a single breath.

He now wants Jesus to wash every part of him.

Jesus is not describing a bath with soap and water here.

He is describing something that cleanses the whole person, not a body part.

🔄 Peter swings to the opposite extreme
🙌 He now wants everything washed
🛁 Not really about soap and water
📖 Jesus means the whole person, not one part

## He That Is Washed Needeth Not Save To Wash His Feet

In daily life, a guest who had already bathed at home only needed feet rewashed after the walk over.

Jesus uses that ordinary picture to describe something spiritual.

The disciples are already clean through what Jesus has already done and taught.

They just need this one ongoing washing, not a whole new bath.

🛀 A bathed guest still needed feet washed
🚶 Only the feet got dirty on the walk
🧼 The disciples are already mostly clean
📖 One ongoing washing, not a new bath

## Clean Every Whit

"Every whit" is an old phrase meaning completely, in every part.

Jesus is not describing partial cleanliness here.

Eleven of the disciples are fully clean before him already.

One at the table is the obvious exception he will not name directly.

✅ Every whit means completely
🧼 Eleven disciples are fully clean already
⚠️ One at the table is the exception
📖 Jesus still will not name him directly

## Ye Are Clean, But Not All

Jesus already knows one person at this table will betray him.

He says this without pointing a finger or naming a name.

Judas hears this warning along with everyone else and still says nothing.

Jesus gives him one more quiet chance to turn back.

👁️ Jesus already knows the betrayer
🤐 He does not name Judas out loud
😶 Judas stays silent anyway
📖 One more quiet chance is offered

# John 13:12-17
# 📜 Jesus Explains The Example
---
## Know Ye What I Have Done To You?

Jesus asks this question to make sure the lesson does not get missed.

He does not want this moment remembered as just a kind gesture.

He wants his disciples to see exactly what it teaches about serving each other.

A question like this forces people to actually think, not just watch.

❓ Jesus checks that the lesson lands
🧎 This was never just a kind act
🤔 A question forces real reflection
📖 It teaches a pattern of serving

## Ye Call Me Master And Lord

"Master" refers to a teacher students followed and learned from.

"Lord" carries the weight of someone with real authority and rule.

The disciples already use both titles correctly for Jesus.

He is not correcting the titles.

He is about to explain what they require.

🎓 Master means teacher they followed
👑 Lord means one with real authority
✅ The disciples already use both titles rightly
📖 Right titles still come with real duties

## For So I Am

Jesus does not deny being called Master and Lord.

He confirms it plainly, with no false modesty.

Humility in washing feet does not mean denying who he actually is.

The lowest posture and the highest identity sit together in the very same man.

✅ Jesus confirms the titles are true
🙅 No false modesty here
🧎 Humility does not deny his identity
📖 Lowest posture, highest identity, same man

## Ye Also Ought To Wash One Another's Feet

Jesus does not ask the disciples to copy the exact ritual forever.

He asks them to copy the posture behind it.

Whoever has the higher position is the one who should serve first.

This flips how most people think leadership should work.

🔄 Not a ritual to repeat exactly
🧎 The posture matters more than the task
👑 Higher position means serving first
📖 This flips normal leadership upside down

## I Have Given You An Example

"Example" here means a pattern meant to be copied, not just admired.

Jesus is not asking for applause for what he just did.

He is asking the disciples to go do the same thing for others.

A pattern only works if someone actually follows it.

📐 Example means a pattern to copy
👏 Not meant to just be admired
🔁 Meant to be repeated with others
📖 A pattern only matters if followed

## The Servant Is Not Greater Than His Lord

This is a saying Jesus has used before, back in Matthew ten.

A servant cannot expect better treatment than the one he serves.

If Jesus, their Lord, knelt down to serve, no disciple can claim it is beneath them.

The example in verse fourteen cannot be waved away by anyone at this table.

📜 A saying Jesus used before
🧎 Servants expect no better treatment than their lord
🚫 No disciple can call this beneath them
📖 The example applies to everyone here

## Happy Are Ye If Ye Do Them

Just knowing this teaching is not the same as living it out.

"Happy" here is closer to blessed, a deep sense of being right with God.

Jesus ties that blessing to actually doing the thing, not just agreeing with it.

Knowledge without action was never the goal here.

🧠 Knowing the lesson is not enough
😊 Happy here means blessed, not just cheerful
🏃 The blessing comes from doing it
📖 Knowledge without action misses the point

# John 13:18-20
# 👁️ The Betrayer Foretold
---
## He That Eateth Bread With Me Hath Lifted Up His Heel Against Me

This line comes from Psalm forty one, written centuries earlier.

Sharing a meal in this culture was a sign of trust and loyalty.

"Lifted up his heel" is an old way of describing betrayal by someone trusted.

Judas is about to turn an act of trust into an act of betrayal.

📜 This line quotes Psalm forty one
🍞 Shared meals signaled trust and loyalty
🦶 Means betrayal by someone close
📖 Trust is about to be broken

## I Know Whom I Have Chosen

Jesus is not surprised by what Judas is about to do.

Choosing Judas as a disciple was never a mistake Jesus failed to notice.

Even betrayal fits inside a plan Jesus already understood before it happened.

Nothing happening tonight catches God off guard.

👁️ Jesus was never caught off guard
🤔 Choosing Judas was not a mistake
📐 Betrayal fits inside a known plan
📖 Nothing here surprises God

## That Ye May Believe That I Am He

Jesus tells the disciples what is coming before it happens on purpose.

When it does happen exactly as he said, their faith has solid ground to stand on.

"I am he" echoes the way God names himself back in the Old Testament.

A fulfilled prediction becomes proof, not just a sad coincidence.

🔮 Jesus predicts this on purpose
🏛️ A fulfilled word becomes solid proof
📜 I am he echoes God's own name
📖 This builds faith, not just sorrow

## He That Receiveth Whomsoever I Send Receiveth Me

Jesus connects welcoming his messengers to welcoming Jesus himself.

Welcoming Jesus connects all the way back to welcoming God the Father.

This links three levels together, the Father, the Son, and the ones Jesus sends out.

How someone treats a disciple is really how they are treating God.

🔗 Receiving a messenger means receiving Jesus
➕ Receiving Jesus means receiving the Father
📶 Three levels link together here
📖 How we treat them reflects on God

# John 13:21-27
# 😟 The Sop Given To Judas
---
## One Of You Shall Betray Me

Jesus states this as plain fact, not as a guess.

He does not say someone might betray him.

He says one specific person will.

Announcing it out loud still does not stop Judas from going through with it.

📢 Jesus states this as fact
🎯 One specific person, not a guess
🛑 The announcement does not stop Judas
📖 Knowing something will happen does not prevent it

## He Was Troubled In Spirit

Jesus is not immune to real emotional pain.

Knowing a plan does not erase the weight of living through it.

Even with full knowledge of what is coming, the betrayal still troubles him deeply.

Jesus feels this moment fully, not just foresees it.

💔 Jesus feels real emotional pain
🧠 Knowing a plan does not remove its weight
😔 Betrayal still troubles him deeply
📖 Jesus feels this night fully

## The Disciples Looked One On Another

Nobody at the table suspects Judas specifically.

Judas has hidden his plan well enough to avoid any obvious suspicion.

The disciples are left confused, searching each other's faces for an answer.

Betrayal from someone trusted rarely announces itself ahead of time.

😕 No one suspects Judas specifically
🎭 Judas hid his plan well
👀 Confusion spreads around the table
📖 Betrayal rarely announces itself early

## Leaning On Jesus' Bosom

Meals like this were eaten reclining on cushions, not sitting upright at a table.

"Leaning on his bosom" describes the guest seated closest to Jesus, practically against him.

This disciple is traditionally understood to be John, the author of this gospel.

That seating spot shows real closeness and trust.

🛋️ Guests reclined on cushions to eat
📍 This spot sat closest to Jesus
✍️ Tradition says this disciple is John
📖 Seating showed real closeness and trust

## Peter Beckoned To Him

Peter cannot ask Jesus the question directly from where he sits.

Instead he signals John, who sits in the one spot close enough to ask quietly.

Even here, Peter is the one pushing for an answer.

Good access to Jesus mattered for more than just comfort.

🤫 Peter cannot ask from where he sits
📍 John's seat allows a quiet question
🙋 Peter still pushes to get answers
📖 Closeness to Jesus had real value

## Lord, Who Is It?

John asks the question Peter wanted answered.

This is a direct, simple question with real weight behind it.

Nobody at the table wants the answer to be themselves.

Still, someone needs to know.

❓ John asks the direct question
⚖️ Real weight sits behind it
😨 No one wants to be the answer
📖 Someone still needed to know

## A Sop, When I Have Dipped It

A "sop" is a piece of bread dipped into a shared dish of sauce or broth.

Handing someone a dipped piece of bread was a normal act of honor at a meal like this.

Jesus offers Judas this gesture of honor at the very moment he names him.

Grace and warning arrive together in the same hand.

🍞 Sop means bread dipped in sauce
🤝 Handing it over was a sign of honor
😢 Jesus honors Judas as he names him
📖 Grace and warning arrive together

## Satan Entered Into Him

Judas had already opened the door to this back in verse two.

Now the betrayal moves from a plan in his heart to full control.

Jesus does not stop him or beg him to reconsider.

"That thou doest, do quickly" releases Judas to go do what he had already decided.

🚪 Judas had already opened this door
😈 The plan now takes full control
🛑 Jesus does not try to stop him
📖 Judas is released to his own choice

# John 13:28-30
# 🌙 Judas Goes Out Into The Night
---
## No Man At The Table Knew

Everyone else at the table misses what just happened completely.

Jesus and Judas alone understand the real meaning of that exchange.

The rest of the group is left guessing at ordinary explanations.

Sometimes the most important moment in a room passes by unnoticed by almost everyone in it.

🙈 The rest of the table misses it
🤐 Only Jesus and Judas understand
🤔 Everyone else guesses something ordinary
📖 Important moments can pass by unnoticed

## Judas Had The Bag

Judas served as the group's treasurer, carrying their shared money.

That role gave him a cover story nobody questioned.

Buying supplies or giving to the poor were both normal errands for him to run.

His trusted position is the very thing that lets him slip away unsuspected.

💰 Judas managed the group's shared money
🛒 Buying supplies was a normal errand
🤲 Giving to the poor was expected too
📖 Trust gave him cover to leave

## Give Something To The Poor

This guess assumes Judas is still trustworthy enough for acts of charity.

Earlier in this book, John already revealed that Judas never truly cared about the poor.

The other disciples still have no idea what kind of man is walking out that door.

Appearances had fully covered what was really happening inside him.

🤲 The guess assumes real trustworthiness
📜 John already exposed Judas earlier
🙈 The disciples still see no warning signs
📖 Appearances hid what was really happening

## And It Was Night

John often uses darkness to describe more than just the time of day.

Judas does not hesitate once he decides to go.

"It was night" marks both the literal hour and the spiritual state Judas is walking into.

Light and dark have been pulling against each other since the opening lines of this gospel.

🌙 Night means more than just the hour
🏃 Judas leaves without hesitation
⚖️ Light and dark have clashed throughout this gospel
📖 Judas walks into real spiritual darkness

# John 13:31-35
# ❤️ A New Commandment
---
## Now Is The Son Of Man Glorified

This sounds backward at first, since the cross is still ahead of Jesus.

In John's gospel, the cross itself is described as the moment of glory, not just suffering before glory.

Jesus speaks about his death as already underway the moment Judas walks out the door.

The darkest night becomes the doorway to the greatest glory.

✝️ The cross is called glory here
🚪 Judas leaving starts the final countdown
🌑 The darkest night leads to glory
📖 Suffering and glory arrive together

## Shall Straightway Glorify Him

"Straightway" is an old word meaning immediately, without delay.

The Father's glory for the Son does not wait for some distant future event.

It begins unfolding right away, starting with the cross itself.

Suffering and glory move forward together, not one after the other.

⏱️ Straightway means immediately
🚫 No long delay before glory begins
✝️ It starts with the cross itself
📖 Suffering and glory move together

## Little Children

Jesus has never called the disciples this before in the whole book.

It is a term of deep affection, used for people someone feels responsible to protect.

The tone in the room shifts from warning Judas to comforting the eleven who remain.

Tenderness and urgency sit side by side in this moment.

👶 Little children shows deep affection
🛡️ Jesus feels responsible to protect them
🔄 The tone shifts toward comfort now
📖 Tenderness and urgency sit together

## Whither I Go, Ye Cannot Come

Jesus already told the hostile Jewish leaders this same line earlier in the book.

Now he says nearly the same words to his own closest friends.

This time it carries sorrow instead of judgment.

Not yet is the real meaning, since several of them will follow him later in life and death.

🔁 Jesus repeats a line said earlier
💔 This time it carries sorrow, not judgment
⏳ Not yet is the real meaning
📖 Several will follow him later in life

## A New Commandment

Loving others was already commanded back in the law of Moses.

What makes this commandment new is the standard attached to it.

"As I have loved you" sets a new, higher bar.

Jesus just showed that love by washing feet.

He will show it again soon on the cross.

That is a far higher measure than simply being nice to a neighbor.

📜 Loving others was already commanded before
📏 The new part is the standard
🧎 As I have loved you sets the bar
📖 This love goes far beyond nice

## By This Shall All Men Know

Jesus does not say the world will know his disciples by their arguments being won.

He does not say they will be known by impressive buildings or clever words.

Genuine love for each other becomes the one clear sign that marks them as his.

A watching world was always meant to notice this love first.

🏛️ Not known by winning arguments
🗣️ Not known by clever words
❤️ Known by real love for each other
📖 The watching world notices love first

# John 13:36-38
# 🐓 Peter's Denial Foretold
---
## Lord, Whither Goest Thou?

Peter is not ready to let this conversation stay about Judas leaving.

He wants to know exactly where Jesus is heading.

Jesus answers that Peter cannot follow him into this specific path right now.

"Afterwards" promises Peter a future he cannot yet see or understand.

❓ Peter wants to know Jesus's destination
🚫 He cannot follow this path now
⏳ Afterwards promises a future not yet seen
📖 Not now does not mean never

## Wilt Thou Lay Down Thy Life For My Sake?

Jesus repeats Peter's own words back to him as a question.

He is not mocking Peter's courage.

He is gently testing how well Peter actually knows himself.

Real self knowledge often arrives through a hard moment like this one.

🔁 Jesus repeats Peter's own words
❤️ Not mockery, but a gentle test
🪞 Peter does not yet know himself fully
📖 Hard moments reveal real self knowledge

## I Will Lay Down My Life For Thy Sake

Peter means this promise with complete sincerity in the moment he makes it.

He genuinely believes he has the courage to die for Jesus tonight.

Sincerity and follow through are not always the same thing under real pressure.

Peter will learn that difference within just a few hours.

🙏 Peter means this with full sincerity
💪 He believes he has the courage tonight
⚖️ Sincerity and follow through can differ
📖 Peter learns this within hours

## The Cock Shall Not Crow, Till Thou Hast Denied Me Thrice

Roosters crowing near dawn served as a natural clock in this culture, understood by everyone listening.

Jesus names the exact number of denials before Peter has done any of them.

"Thrice" means three separate times, not one lapse repeated by accident.

Jesus still chooses Peter, fully aware of exactly how that night will go.

🐓 Rooster crowing marked early morning
🔢 Jesus names the number in advance
🔂 Thrice means three separate denials
📖 Jesus still chooses Peter anyway
`.trim();

export const JOHN_THIRTEEN_PERSONAL_SECTIONS = parseJohnThirteenRawNotes(JOHN_THIRTEEN_RAW_NOTES);
