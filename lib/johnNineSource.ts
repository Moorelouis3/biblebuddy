export type JohnNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnNineRawNotes(rawText: string): JohnNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 9:${startVerse}` : `John 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 John 9 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_NINE_RAW_NOTES = `# John 9:1-5
# 😢 Neither Hath This Man Sinned
---
## 👁️ Blind From His Birth

Blind from his birth means this man had never seen anything in his life.

This was not blindness caused by sickness or injury later on.

John points this out so the healing that follows cannot be explained as some natural recovery.

Only God could restore sight that had never existed in the first place.

👁️ Blind from birth means never seeing
🚫 Not sickness or injury later
🩺 Rules out any natural recovery
📖 Only God restores sight never had

## ❓ Who Did Sin, This Man, Or His Parents

The disciples assume someone must have sinned for this man to be born blind.

In that culture, physical suffering was often treated as direct punishment for sin.

Some rabbis even taught that a baby could sin in the womb.

Jesus is about to reject that whole framework in the very next verse.

❓ Disciples assume sin caused this
⚖️ Suffering was seen as punishment
🤰 Some taught sin before birth
📖 Jesus rejects that framework next

## 💡 That The Works Of God Should Be Made Manifest

Jesus says this man's blindness was never a punishment for anyone's sin.

"Manifest" means shown clearly, out in the open, so nobody can miss it.

His blindness became the exact setting God chose to put His power on display.

The suffering was not senseless.

It had a purpose that nobody present could have guessed in advance.

💡 Manifest means shown out in the open
🚫 Not punishment for sin
🎯 His blindness became God's setting
📖 Even hard suffering can carry purpose

## ☀️ While It Is Day

Day here does not simply mean sunlight hours.

It refers to the limited time Jesus had on earth to do His Father's work.

Jesus is naming the urgency of this moment before healing the man.

He treats this miracle as part of a larger mission, not a random act of kindness.

☀️ Day means Jesus earthly time
⏳ That time was limited
🎯 Urgency drives this healing
📖 Part of a larger mission

## 🌙 The Night Cometh, When No Man Can Work

Night here points ahead to Jesus's coming death.

Once that moment arrives, his time for this kind of visible work on earth ends.

The warning is not really about Jesus running out of energy.

It is about a window of opportunity that will eventually close.

🌙 Night points to Jesus death
⏰ His earthly work will end
🚪 A window that will close
➡️ Opportunity does not last forever

## 💡 I Am The Light Of The World

Jesus already made this same claim back in John eight.

Here he repeats it right before healing a blind man, which is not an accident.

The physical healing that follows acts out the spiritual claim in front of everyone watching.

Giving sight to blind eyes becomes living proof of the light he claims to bring.

💡 Jesus repeats this claim
🔁 Already stated in John eight
👁️ The healing proves the claim
📖 Physical sight mirrors spiritual light

# John 9:6-9
# 💧 Washed, And Came Seeing
---
## 🧪 He Spat On The Ground, And Made Clay

Spitting to make clay may sound strange to a modern reader.

In the ancient world, people widely believed saliva had healing properties.

Jesus uses this everyday, ordinary method instead of simply speaking the healing into being.

The method was never the real source of power.

Jesus heals elsewhere with nothing but a single word.

🧪 Saliva was believed to heal
👐 An ordinary, humble method
🗣️ Jesus also heals by word alone
📖 The method was not the power

## 💧 Go, Wash In The Pool Of Siloam

"Siloam" was a real pool inside Jerusalem's walls, fed by a tunnel carrying water from the Gihon spring.

John adds that the name itself means "Sent."

That detail is not random.

Jesus himself was repeatedly called the one sent by the Father throughout this gospel.

💧 Siloam was a real pool
🔁 Jesus is also called Sent
✨ Siloam itself means Sent
➡️ The water points to his identity

## 🚶 He Went His Way Therefore, And Washed, And Came Seeing

The man obeys a strange instruction without any proof it will work.

He is still completely blind when he leaves to find the pool.

Faith here looks like simple obedience, not a dramatic feeling.

Sight only comes after he does what he was told.

🚶 He obeyed before seeing proof
🙈 Still blind on the way there
🙏 Faith looked like plain obedience
📖 Sight came after obedience

## 🙏 Is Not This He That Sat And Begged

Blind people in this culture had almost no way to support themselves.

Begging near a gate or a well traveled path was often their only option.

The neighbours know this man specifically as the beggar, not by any other role in the community.

That identity is about to be completely overturned.

🙏 Begging was his only income
🚪 He likely sat at a gate
🏷️ Neighbours knew him as the beggar
➡️ That identity is about to change

## ❓ I Am He

The crowd cannot agree on whether this is really the same man.

Some say yes, others say he only looks similar.

The healed man ends the confusion with three plain words.

He does not need anyone else to confirm what happened to him.

❓ The crowd cannot agree
👤 Some think he only looks similar
🗣️ He settles it himself
📖 His own testimony is enough

# John 9:10-12
# 🤷 I Know Not
---
## 🏷️ A Man That Is Called Jesus Made Clay

The healed man only knows Jesus by name at this point in the story.

He has no idea yet who Jesus really is.

His understanding of Jesus will grow step by step across the rest of this chapter.

Right now he can only report what happened to him, nothing more.

🏷️ He only knows Jesus by name
🌱 His understanding will grow later
📋 He reports facts, not faith yet
➡️ A journey of belief has started

## 🔁 I Went And Washed, And I Received Sight

The man repeats the same simple sequence a second time.

He obeyed, then he saw.

This plain testimony becomes his answer every single time he gets questioned later in the chapter.

He never adds detail he does not actually have.

🔁 He repeats the same testimony
🚶 Obeyed, then he saw
🗣️ This becomes his standard answer
📖 He never claims more than he knows

## ❓ Where Is He? He Said, I Know Not

The man cannot say where Jesus went after the healing.

Jesus is physically absent for most of the interrogation that follows.

The healed man will have to defend what happened to him completely alone.

Jesus does not reappear until near the very end of the chapter.

❓ He cannot locate Jesus
🚶 Jesus had already left
🛡️ The man defends himself alone
➡️ Jesus returns only near the end

# John 9:13-17
# ⚖️ A Division Among The Pharisees
---
## 📜 They Brought To The Pharisees Him That Aforetime Was Blind

The Pharisees were a religious group focused on strict obedience to the law of Moses.

They acted as the local religious authority with power to judge whether something counted as lawful.

Bringing the healed man to them turns a personal miracle into a formal religious hearing.

What happened in private is about to be put on public trial.

📜 Pharisees enforced strict religious law
⚖️ They acted as religious judges
🏛️ This becomes a formal hearing
➡️ A private miracle goes on trial

## 📅 It Was The Sabbath Day When Jesus Made The Clay

The "sabbath" was the weekly day of rest commanded in the law of Moses.

Jewish tradition had built up detailed lists of exactly what counted as forbidden work on that day.

Mixing spit with dirt to make clay could be classified under that list as a kind of kneading.

Jesus breaks a human rule about the sabbath in the same act that reveals God's power.

📅 Sabbath was the weekly day of rest
📋 Traditions listed forbidden sabbath work
🧪 Making clay could count as work
📖 A human rule broken, God revealed

## 🔁 He Put Clay Upon Mine Eyes, And I Washed, And Do See

This is the third time the man gives nearly the identical account.

He does not change his story to please his questioners.

He does not add new details to sound more impressive either.

A consistent, simple testimony is harder to attack than an elaborate one.

🔁 Third time telling the same story
🚫 No changes to please questioners
📏 No added details for effect
➡️ A simple testimony is harder to attack

## ⚖️ This Man Is Not Of God, Because He Keepeth Not The Sabbath Day

Some Pharisees judge Jesus guilty based only on his sabbath practice.

Others look instead at the actual result, a blind man now seeing.

The text says plainly there was a division among them.

Even the religious experts could not agree on what the evidence meant.

⚖️ Some judge by sabbath rules alone
👁️ Others judge by the result
🤷 The experts themselves disagreed
➡️ Evidence does not settle everyone

## 🔮 He Is A Prophet

The healed man offers his own honest conclusion when asked directly.

He does not yet call Jesus the Christ or the Son of God.

A "prophet" was someone who spoke and acted with real power from God.

This is real progress in his understanding, even though he is not finished growing in it.

🗣️ His honest first conclusion
📈 Real progress in understanding
🔮 Prophet means one who speaks for God
➡️ Not his final answer yet

# John 9:18-23
# 👪 The Parents Are Questioned
---
## 🚫 Until They Called The Parents Of Him That Had Received His Sight

The religious leaders refuse to accept the obvious evidence in front of them.

They go looking for a way to discredit the healing instead of simply accepting it.

Calling in the parents is their attempt to find a loophole, maybe a case of mistaken identity.

Determined unbelief will keep hunting for an exit even when the proof is standing right there.

🚫 They refuse the obvious evidence
🔍 They search for a loophole
👪 Parents are called as a check
➡️ Unbelief keeps hunting for an exit

## ✅ We Know That This Is Our Son, And That He Was Born Blind

The parents confirm the two facts they are completely certain of.

This is their son.

He was born blind.

Both facts are safe to state and cannot get anyone in trouble.

✅ Two facts they confirm
👶 He was born blind
🙂 Safe facts, no danger
📖 They stop there on purpose

## 🙅 He Is Of Age, Ask Him

The parents suddenly stop answering and push the question back to their son.

"Of age" means he was an adult, old enough to legally answer for himself.

This is not the parents being cold or uncaring.

It is a careful, fearful dodge to avoid saying anything dangerous themselves.

🙅 Parents stop answering directly
🧑 Of age means legally an adult
😨 A careful, fearful dodge
➡️ They protect themselves from danger

## 🏛️ They Feared The Jews

"The Jews" here does not mean the Jewish people as a whole.

John is using it to describe the hostile religious leadership opposing Jesus in this scene.

The parents are themselves Jewish, and so is their son.

Naming the fear this plainly shows just how much pressure that leadership could apply.

🏛️ Jews here means hostile leaders
👪 The parents are Jewish too
😨 Real fear drove their silence
📖 Pressure from leadership was real

## 🕍 Put Out Of The Synagogue

The "synagogue" was the local center of Jewish worship, teaching, and community life.

Being put out of it meant losing access to worship and to normal daily life among neighbors.

This threat explains exactly why the parents stay so careful with their words.

Confessing Jesus as the Christ could cost them everything familiar.

🕍 Synagogue was community and worship center
🚪 Being put out meant real loss
😨 This threat shaped their caution
📖 Faith could cost everything familiar

# John 9:24-29
# 🔥 One Thing I Know
---
## 🎭 Give God The Praise

This phrase sounds like a call to worship, but it is really a demand.

The Pharisees are pressuring the man to admit the healing was not really from Jesus.

Giving credit to God while denying Jesus was their way out of accepting the miracle.

The two were never actually separate, since Jesus was the one who worked the miracle.

🎭 Sounds like worship, acts like pressure
🙅 They want Jesus denied credit
🤝 They try to split God from Jesus
📖 The two cannot really be separated

## 🚫 One Thing I Know, That, Whereas I Was Blind, Now I See

The man refuses to get pulled into a theological argument he cannot win.

He has no training to debate sin, sabbath law, or the identity of Jesus.

He simply returns to the one fact nobody can dispute, his own changed life.

Personal experience becomes his strongest and simplest form of testimony.

🚫 He avoids an unwinnable argument
📏 He has no formal training
✅ His changed life cannot be denied
📖 Personal experience is real testimony

## 📈 I Have Told You Already, And Ye Did Not Hear

The man is growing bolder and more direct with every round of questioning.

He accuses his questioners of refusing to actually listen.

He even dares to ask whether they secretly want to become disciples themselves.

Confidence is building in him the more he is pressured.

📈 He grows bolder each round
👂 He accuses them of not listening
😏 He dares a bold question back
➡️ Pressure is building his confidence

## 📜 We Are Moses' Disciples

Calling themselves "Moses' disciples" was the Pharisees' way of claiming the highest possible religious authority.

Moses had given Israel the law they built their entire identity around.

By contrast, they fling the title disciple at the healed man as an insult.

They cannot see that true loyalty to Moses should have led them to recognize Jesus.

📜 Moses gave Israel its law
🏆 They claim the highest authority
😤 Disciple is used as an insult
📖 Loyalty to Moses should lead to Jesus

## ❓ We Know Not From Whence He Is

The Pharisees admit they do not actually know where Jesus came from.

That admission should have made them more curious, not more hostile.

Instead, not knowing becomes their excuse to dismiss him entirely.

Ignorance and certainty do not usually belong together, yet here they stand side by side.

❓ They admit real ignorance
😤 Ignorance fuels hostility instead
🚫 Not knowing becomes their excuse
📖 Certainty should not outrun knowledge

# John 9:30-34
# 🎯 A Marvellous Thing
---
## 🔄 Why Herein Is A Marvellous Thing

The healed man turns the Pharisees' own argument back on them.

They claim not to know where Jesus came from, yet he clearly has power from somewhere.

"Marvellous" here means genuinely astonishing, not a polite compliment.

He finds their blindness to the obvious far stranger than his own blindness ever was.

🔄 He flips their own argument
❓ Power from an unknown source
😲 Marvellous means truly astonishing
➡️ Their blindness is the stranger one

## 🙏 God Heareth Not Sinners

This reflects a common belief that God ignores the prayers of those living in open, unrepentant sin.

The healed man is reasoning from a belief the Pharisees themselves already hold.

If that belief is true, Jesus cannot be the sinner they claim.

He is using their own logic against their own conclusion.

🙏 A common belief about prayer
🧮 He reasons from their own belief
✅ Jesus answered means Jesus is not guilty
📖 Their logic undercuts their verdict

## 📜 Since The World Began Was It Not Heard

The man points out that healing someone born blind had never been recorded before.

Other miracles restoring sight already existed in Jewish memory and scripture.

A birth defect being completely undone was something new.

He is arguing from the sheer scale of what just happened to him.

📜 No past healing like this recorded
👁️ Other sight healings did exist
✨ A birth defect fully undone
📖 Scale itself becomes his argument

## 🎯 If This Man Were Not Of God, He Could Do Nothing

This is the clearest, boldest statement the man has made yet.

He states his conclusion as a simple fact, not a guess or a hope.

Every earlier answer in this chapter built toward this one direct claim.

The beggar who once could not see now sees Jesus more clearly than the religious experts do.

🎯 His clearest statement yet
📈 Every earlier answer led here
👁️ He now sees more clearly than experts
📖 Spiritual sight outgrew the religious leaders

## 🔁 Thou Wast Altogether Born In Sins, And Dost Thou Teach Us

The Pharisees fall straight back into the same wrong assumption the disciples made back in verse two.

They treat his blindness itself as proof of deep, inherited sin.

They attack his character instead of answering his argument.

"Cast him out" likely means an informal expulsion here, separate from the synagogue ban threatened against his parents.

🔁 Same wrong assumption as verse two
😤 They attack his character instead
🚪 Cast out means a forced removal
➡️ Unanswerable logic met with rejection

# John 9:35-38
# 🙇 Lord, I Believe
---
## 🚶 Jesus Heard That They Had Cast Him Out

Jesus has been absent for the entire interrogation up to this point.

He does not abandon the man after the religious leaders reject him.

Being thrown out by the synagogue becomes the very moment Jesus personally seeks him out.

Loss of one community leads straight into a direct meeting with Jesus himself.

🚶 Jesus had been absent until now
🔍 Jesus seeks him out personally
🚪 Rejection leads to a direct meeting
📖 Loss opens the door to Jesus

## 👑 Dost Thou Believe On The Son Of God

"Son of God" was a title claiming a unique, direct relationship with God the Father.

Jesus asks this question directly, without waiting for the man to work it out alone.

Up to now the man only knew Jesus as a healer, then as a prophet.

Jesus himself supplies the final, highest piece of the puzzle.

👑 Son of God claims a unique relationship
🗣️ Jesus asks the question directly
📈 His understanding had stopped at prophet
➡️ Jesus supplies the final piece

## 🙋 Who Is He, Lord, That I Might Believe On Him

The man's question is not doubt or resistance.

He is already fully willing, he just needs to know who exactly he is being asked to trust.

That kind of honest, ready question is very different from the Pharisees' hostile ones earlier in the chapter.

Willingness paired with honesty opens the door to a real answer.

🙋 Not doubt, pure readiness
❓ He just needs the name
⚖️ Very different from hostile questions
📖 Honesty opens the door to truth

## ⚡ Lord, I Believe

This is the fastest, fullest response to Jesus in the whole chapter.

The man does not hesitate or ask for more proof.

"Worshipped" here means he physically bowed down, an act reserved for God alone.

The beggar who once could not even see Jesus now recognizes him as worthy of worship.

⚡ The fastest response in the chapter
🙇 Worshipped means bowing before God
👁️ He once could not even see Jesus
📖 Full recognition completes his journey

# John 9:39-41
# 👁️ For Judgment I Am Come
---
## ⚖️ For Judgment I Am Come Into This World

Jesus names the deeper purpose behind everything that just happened in this chapter.

His arrival forces a decision, and that decision reveals where people actually stand.

The formerly blind man ends up seeing both physically and spiritually.

The Pharisees who claimed to see clearly are shown to be spiritually blind instead.

⚖️ His coming forces a decision
👁️ The blind man now truly sees
🙈 The seeing are shown blind
📖 Jesus reveals where people stand

## 😠 Are We Blind Also

The Pharisees finally sense that Jesus might be talking about them.

Their question comes out defensive rather than genuinely curious.

They are close to the truth without actually accepting it.

Sensing a hard truth is not the same as receiving it.

😠 Their question is defensive
👀 They sense they are being named
🚫 Close to truth, not accepting it
➡️ Sensing truth differs from receiving it

## 🎯 Therefore Your Sin Remaineth

Jesus explains that claiming to already see clearly is actually the real problem.

Genuine ignorance can be excused or corrected over time.

Insisting on sight you do not actually have blocks any correction from happening.

That stubborn claim is what makes their sin remain instead of being forgiven.

🎯 Claiming sight is the real problem
🤲 Honest ignorance can be corrected
🚫 False certainty blocks correction
📖 Stubborn claims keep sin in place
`.trim();

export const JOHN_NINE_PERSONAL_SECTIONS = parseJohnNineRawNotes(JOHN_NINE_RAW_NOTES);
