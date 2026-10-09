export type MarkNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMarkNineRawNotes(rawText: string): MarkNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MarkNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Mark\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Mark 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Mark\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Mark\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Mark 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Mark 9:${startVerse}` : `Mark 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Mark 9 sections, received " + sections.length);
  }

  return sections;
}

const MARK_NINE_RAW_NOTES = `# Mark 9:1-8
# 🌟 Transfigured Before Them
---
## ⏳ The Kingdom Of God Come With Power

This promise sounds like it points to the end of the world.

It actually points to something that happens within days.

Peter, James, and John are about to witness Jesus in his future glory.

That vision itself counts as the kingdom of God arriving with power.

The transfiguration coming next fulfills this very promise.

The kingdom was never a distant hope for these three.

⏳ Points to days, not the end
👀 Three disciples see it soon
✨ The transfiguration fulfills the promise
📖 The kingdom arrives in power now

---
## 🏔️ An High Mountain Apart By Themselves

Jesus deliberately separates these three disciples from the other nine.

Mountains in scripture are frequently where God reveals himself most directly.

Moses met God on a mountain, and so did Elijah.

"Apart by themselves" means this moment was private, not for public viewing.

Only a few are ready to witness what comes next.

🏔️ Jesus takes only three up
📜 Mountains often reveal God's presence
🤫 Apart means private, not public
📖 Not everyone is ready yet

---
## ✨ Exceeding White As Snow

"Raiment" means the clothing Jesus was wearing that day.

"Fuller" was a worker whose job was bleaching and whitening cloth.

Mark says no fuller on earth could produce this kind of white.

He reaches for an impossible comparison because ordinary words fail here.

This brightness reveals Jesus's true glory, hidden until this moment.

✨ Raiment means his clothing
🧺 A fuller bleached cloth for work
🙅 No fuller could match this white
📖 His hidden glory shines through

---
## 📜 Elias With Moses

Elias is simply the Greek form of the name Elijah.

Moses represents the law, and Elijah represents the prophets.

Both men appear here talking with Jesus as equals in conversation.

Their presence shows the entire Old Testament pointing toward him.

Jesus does not stand beside the law and the prophets.

He stands above them, confirmed by their appearance alongside him.

📜 Elias is Greek for Elijah
⚖️ Moses stands for the law
🗣️ Elijah stands for the prophets
📖 Both point forward to Jesus

---
## ⛺ Let Us Make Three Tabernacles

Peter's suggestion does not come from wisdom, but from shock and fear.

"Tabernacles" here means simple temporary shelters, not the tabernacle from Exodus.

Peter wants to preserve this glorious moment by building something permanent.

Mark tells us plainly that Peter did not know what to say.

Fear was clouding Peter's judgment in that instant.

Not every impulse in a holy moment is the right one.

⛺ Tabernacles means temporary shelters
😨 Fear drove Peter's suggestion
🙅 He wanted to freeze the moment
📖 Not every impulse here was wise

---
## ☁️ This Is My Beloved Son Hear Him

God himself interrupts Peter's suggestion with his own voice.

The cloud recalls the cloud that led Israel through the wilderness.

"My beloved Son" names Jesus directly as God's own.

"Hear him" is a command, not a suggestion.

God settles the entire scene with two words of instruction.

Listening to Jesus now outranks any plan a disciple might offer.

☁️ God interrupts with his voice
🌊 The cloud echoes the exodus
👑 Beloved Son names Jesus directly
📖 Hear him outranks every plan

---
## 👀 Save Jesus Only

Suddenly the vision ends as quickly as it began.

Moses and Elias are gone, and the voice has gone silent.

Only Jesus remains standing with the three disciples.

The vision served its purpose and did not need to last.

What matters now is not the vision, but the man who stayed.

👀 The vision ends suddenly
🌫️ Moses and Elias disappear
🧍 Only Jesus remains standing
📖 The man who stays matters most

# Mark 9:9-13
# 📜 Elias Must First Come
---
## 🤫 Till The Son Of Man Were Risen From The Dead

Jesus commands silence about what they just witnessed.

This secret has a built in expiration date.

"Son of man" is the title Jesus regularly uses for himself.

Once Jesus rises from the dead, the silence can finally end.

The disciples cannot fully explain the transfiguration yet anyway.

Understanding will only come after the resurrection gives it context.

🤫 Jesus commands silence for now
⏳ The secret has an end date
👤 Son of man is his title
➡️ Resurrection unlocks the full meaning

---
## 🤔 Questioning What The Rising From The Dead Should Mean

The disciples obey the command to stay quiet.

They cannot stop talking about it among themselves, though.

Jewish teaching at this time expected one final, general resurrection.

A single man rising from the dead before that day made no sense to them yet.

They are not doubting Jesus so much as lacking the framework to understand him.

🤐 They keep the secret, but wonder
📚 They expected one final resurrection
❓ One man rising first confused them
📖 They lacked the framework, not faith

---
## ❓ Why Say The Scribes That Elias Must First Come

The disciples bring up a real teaching detail from Jewish scholars.

Scribes taught that Elijah would return before the Messiah's arrival.

If Jesus is who Peter just confessed, where was that arrival?

The disciples are not stalling, they are genuinely working through a real question.

📚 Scribes expected Elijah to return first
❓ The disciples ask a real question
🧩 They are piecing the puzzle together
📖 A genuine question, not a stall

---
## ✔️ Elias Is Come

Jesus confirms that Elijah has already come, just not as Elijah himself.

John the Baptist fulfilled that expected role before Jesus's ministry even began.

People did whatever they wanted to John, not what scripture required of them.

John was arrested and later killed, mistreated instead of honored.

Jesus is quietly telling the disciples that he will face a similar fate.

Rejection, not celebration, is the pattern Elijah's forerunner already lived out.

📜 Elijah already came as John
👤 John the Baptist filled that role
⚔️ John was mistreated, not honored
📖 Jesus will face a similar fate

# Mark 9:14-19
# 😨 A Boy In Desperate Need
---
## 👥 A Great Multitude About Them

Jesus and the three disciples come down from a private, glorious moment.

They step straight into a large, tense crowd below.

"Multitude" means a huge gathering, not just a handful of onlookers.

The scribes are already in the middle of a dispute with the other nine disciples.

Glory on the mountain and chaos in the valley sit only moments apart.

👥 Multitude means a huge crowd
⛰️ They just left the mountain
⚖️ Scribes are already disputing below
📖 Glory and chaos sit close together

---
## 😲 Running To Him Saluted Him

The crowd reacts the moment they catch sight of Jesus returning.

"Saluted" here means they greeted him eagerly, not a formal salute.

Something about his sudden return genuinely amazes them.

Mark does not say why they were so amazed, only that they were.

Jesus steps straight from one astonishing scene into another.

😲 The crowd reacts with amazement
🙌 Saluted means an eager greeting
❓ Mark leaves the reason unstated
📖 Astonishment follows Jesus everywhere he goes

---
## 😶 A Dumb Spirit

A father steps forward from the crowd to speak for his son.

"Dumb" here means unable to speak, caused by this spirit.

The boy also convulses, foams, and grinds his teeth during these episodes.

The father already asked the nine disciples to cast the spirit out.

They tried and failed in front of the watching crowd.

That failure is likely part of what the scribes were questioning.

😶 Dumb means unable to speak
😵 The boy convulses and foams
🙅 The disciples already tried and failed
📖 Their failure fed the scribes' dispute

---
## 😤 O Faithless Generation

Jesus responds with visible frustration before healing anyone.

"Faithless" describes a lack of trust, not a lack of information.

This frustration is not aimed only at the failed disciples.

It reaches the whole scene, including the doubting crowd and scribes.

Jesus still asks for the boy to be brought to him anyway.

Frustration never stops him from helping the one in need.

😤 Faithless means lacking trust
🌍 His frustration reaches the whole crowd
🤲 He still calls for the boy
➡️ Frustration never blocks his help

# Mark 9:20-24
# 😢 Lord I Believe
---
## 🌀 Straightway The Spirit Tare Him

The moment the boy sees Jesus, the convulsions grow worse, not better.

"Tare" is an old word meaning the spirit violently convulsed him.

This is not a sign that Jesus makes things worse.

Evil often reacts violently right before it is finally confronted.

The worst moment comes just before the actual turning point.

🌀 Tare means violent convulsing
😨 The attack worsens at first
⚡ Evil reacts before it is confronted
📖 The worst moment precedes the turn

---
## 🔥 Of A Child

Jesus asks the father a simple, practical question about how long this has lasted.

The father answers that the boy has suffered since early childhood.

This affliction has thrown the boy into fire and into water, trying to destroy him.

Years of watching this have clearly worn the father down.

His closing words admit doubt alongside a desperate hope.

👶 Of a child means since early years
🔥 The spirit tried to destroy him
😔 Years of this wore the father down
📖 Hope and doubt mix in his plea

---
## 🙏 If Thou Canst Believe

The father's own words echo back a hint of doubt to Jesus.

Jesus repeats that phrase to confront it directly.

He does not scold the father for his uncertain faith.

Instead he turns the real question toward what belief can unlock.

"All things are possible" describes what opens up to real belief.

🔁 Jesus echoes the father's own doubt
🙅 He does not scold the doubt
🔑 Belief is the key he names
📖 All things open to real belief

---
## 😢 Help Thou Mine Unbelief

The father answers with brutal honesty instead of pretending confidence.

He holds both belief and doubt in the very same breath.

This is not a contradiction, but an honest description of real faith.

Jesus never demands a perfect, doubt free faith before acting.

Honest, mixed faith is still enough to bring to Jesus.

😢 He admits both belief and doubt
🙌 Real faith can hold both at once
🙅 Jesus never demands a perfect faith
📖 Honest faith is still enough

# Mark 9:25-29
# 🙏 By Prayer And Fasting
---
## 🗣️ Thou Dumb And Deaf Spirit

Jesus addresses the spirit directly, not the boy himself.

"Dumb and deaf" names exactly what this spirit has done to the boy.

Jesus commands it to leave and never return.

The spirit cries out and convulses him violently one final time.

Afterward the boy lies so still that many think he has died.

The crowd's panic is about to turn into relief.

🗣️ Jesus commands the spirit directly
😶 Dumb and deaf names its damage
🔚 He orders it to leave for good
📖 The worst moment comes right before relief

---
## 🤝 Took Him By The Hand, And Lifted Him Up

Jesus moves toward a boy that the crowd assumes is already dead.

He does not wait for someone else to check first.

A simple touch and a lift bring the boy back to his feet.

This mirrors how Jesus personally restores people throughout Mark's gospel.

Healing here looks gentle, not dramatic or showy.

🤝 Jesus touches him personally
🧍 A simple lift raises him up
🔁 Mark shows this pattern often
📖 Healing here looks gentle, not showy

---
## 🤫 Why Could Not We Cast Him Out

The disciples wait until they are alone with Jesus to ask this.

They already tried to cast out this spirit and failed publicly.

Their question comes from genuine confusion, not pride.

They had cast out spirits successfully before this very moment.

Something about this specific case was clearly different.

🤫 They ask Jesus privately
🙅 Their earlier attempt failed in public
❓ They had succeeded before this case
➡️ Something here was genuinely different

---
## 🙏 By Prayer And Fasting

Jesus names the real reason the disciples could not help this boy.

"This kind" suggests some spiritual battles require more than a quick command.

Prayer keeps a person depending on God instead of on their own authority.

Fasting here means giving up food for a time to focus fully on God.

Some victories are not won by confidence, but by dependence.

🙏 This kind needed more than a command
🧎 Prayer means depending on God
🍽️ Fasting means focused self denial
📖 Dependence, not confidence, wins this fight

# Mark 9:30-32
# ⏳ Delivered Into The Hands Of Men
---
## 🤫 He Would Not That Any Man Should Know It

Jesus and the disciples quietly pass back through Galilee.

He deliberately avoids public attention during this part of the journey.

This is not fear, but a decision to protect his remaining time.

Jesus wants these final months spent teaching his disciples, not crowds.

Private teaching matters more right now than public ministry.

🤫 Jesus avoids public attention here
⏳ He is protecting his remaining time
👥 Private teaching matters most right now
📖 Not every season is for crowds

---
## ⏳ The Son Of Man Is Delivered

Jesus repeats the prediction he already gave once in this chapter.

"Delivered" means handed over, specifically by betrayal into enemy hands.

He names his own death plainly, without softening the details.

In the very same sentence, he also names his own rising.

Jesus teaches this truth privately, away from public pressure.

🔁 Jesus repeats this hard prediction
🤝 Delivered means handed over by betrayal
🌅 Rising again follows in the same breath
📖 He teaches it privately, not publicly

---
## ❓ Afraid To Ask Him

The disciples do not understand what Jesus has just told them.

Fear, not indifference, keeps them from asking any follow up questions.

Something about this teaching feels too heavy to question out loud.

Confusion and silence often travel together when news is hard to accept.

Their silence here will not last through the rest of this chapter.

❓ They do not understand him yet
😨 Fear keeps them from asking
🤐 Hard news often brings silence
📖 Their silence will not last long

# Mark 9:33-37
# 🤝 Servant Of All
---
## 🏠 What Was It That Ye Disputed

Jesus waits until they reach the privacy of a house to ask this.

He already seems to know something happened on the road.

This question invites honesty.

It does not demand a confession.

Jesus often lets a silence sit before he corrects it.

Private moments like this one shape the disciples as much as public miracles do.

🏠 Jesus asks in private, at home
🧠 He already senses what happened
🤫 The question invites honesty, not shame
📖 Private moments shape disciples too

---
## 🤐 Who Should Be The Greatest

The disciples stay silent because they know how this will sound.

Their actual argument was about rank and status among themselves.

This dispute happened right after Jesus predicted his own suffering and death.

Their timing makes the argument look even worse in hindsight.

Ambition can creep in at the exact moment it should not.

🤐 Shame keeps them quiet now
🏆 Their fight was really about rank
⏳ This followed his suffering prediction
➡️ Ambition crept in at the wrong time

---
## 👑 Servant Of All

Jesus answers their hidden argument without them saying a word.

He flips the usual order of greatness completely upside down.

"Last of all" means placing yourself below everyone else on purpose.

"Servant of all" means actively serving every person, not just a few.

True greatness in God's kingdom looks nothing like greatness anywhere else.

🔄 Jesus flips the normal order
⬇️ Last means choosing to go low
🤲 Servant means actively helping everyone
📖 Kingdom greatness looks upside down

---
## 🧒 Took A Child, And Set Him In The Midst

Jesus uses an object lesson instead of only words this time.

Children in this culture held little status or social power.

Placing a child in the middle of the group makes a point visually.

Greatness, according to Jesus, has nothing to do with status at all.

The lesson lands before Jesus even finishes explaining it.

🧒 A child had little status here
👀 Jesus teaches with a visual example
⬇️ Status and greatness do not match
➡️ The lesson lands before he explains it

---
## 🤲 Receiveth One Of Such Children In My Name

Jesus connects welcoming the powerless directly to welcoming himself.

"In my name" means doing it because of who Jesus is, not for credit.

Receiving someone with no status becomes a way of receiving Jesus himself.

This chain goes even further, reaching all the way to the Father.

How a person treats the powerless reveals how they actually treat Jesus.

🤲 Welcoming the powerless welcomes Jesus
🏷️ In my name means for his sake
🔗 This chain reaches to the Father
📖 How we treat the weak reveals our heart

# Mark 9:38-41
# 🤲 He That Is Not Against Us
---
## 😠 He Followeth Not Us

John reports a man casting out devils using Jesus's own name.

The actual problem John raises is not the man's success.

John's complaint is that this man is not part of their group.

"We forbad him" means the disciples tried to stop him themselves.

Loyalty to the group had started to matter more than the result.

😠 John objects to an outsider's success
🏷️ His real issue is group loyalty
🚫 They tried to stop the man
📖 Group loyalty outweighed the real result

---
## 🚫 Forbid Him Not

Jesus immediately corrects John's instinct to shut the man down.

No one can do a real miracle in Jesus's name and still oppose him.

Genuine power working in that name points toward Jesus, not away from him.

Jesus reads the man's actions as evidence of alignment, not threat.

Insecurity, not loyalty, was actually driving John's complaint.

🚫 Jesus reverses John's instinct here
⚡ Real power in his name is not opposition
🧭 The man's actions point toward Jesus
📖 Insecurity, not loyalty, drove the complaint

---
## 🤝 Not Against Us Is On Our Part

Jesus gives the disciples a wider, more generous way to measure allies.

This man did not need to be part of their close circle to be on their side.

Opposition, not distance, is the only thing Jesus treats as a real problem.

This principle protects against a narrow, suspicious view of outsiders.

🤝 Allies do not need to be close
⚖️ Opposition is the real problem
🌍 Jesus measures loyalty more generously
➡️ This guards against suspicion of outsiders

---
## 🥤 A Cup Of Water In My Name

Jesus moves from a dramatic miracle to the smallest possible act of kindness.

A cup of water cost the giver almost nothing to provide.

"Because ye belong to Christ" names the real reason the gift matters.

Even this tiny act, done for that reason, earns a lasting reward.

God notices the smallest kindness as closely as the greatest miracle.

🥤 Even a small kindness counts
💧 A cup of water cost almost nothing
🏷️ The reason behind it matters most
➡️ God notices small acts too

# Mark 9:42-48
# ✂️ Cut Off The Cause
---
## ⚠️ Offend One Of These Little Ones

"Little ones" here likely means new or vulnerable believers, not only children.

"Offend" means causing someone to stumble or fall away from faith.

Causing that kind of harm carries extremely serious consequences in Jesus's eyes.

A millstone was a massive stone used for grinding grain, far too heavy to survive drowning with.

Jesus uses a horrifying image on purpose, so the warning cannot be missed.

⚠️ Little ones means vulnerable believers
🙅 Offend means causing someone to stumble
⚖️ Jesus treats this with deadly seriousness
📖 The warning uses a horrifying image

---
## ✂️ If Thy Hand Offend Thee

Jesus is not commanding actual self harm or literal amputation.

He uses extreme language to show how seriously sin should be treated.

Cutting off what causes sin is better than letting sin destroy a whole life.

The phrase "where their worm dieth not" pictures ongoing ruin, not relief.

Jesus repeats this same warning twice more in the verses right after this one.

✂️ Not a literal command to maim
⚖️ Removing sin matters more than comfort
🔥 The worm image pictures ongoing ruin
📖 Jesus repeats this warning twice more

---
## 🦶 If Thy Foot Offend Thee

Jesus repeats the exact same warning, now aimed at the foot.

This repetition is deliberate, not careless or redundant writing.

Hands act, and feet carry a person toward temptation or away from it.

Every part of a person's life falls under this same warning.

Nothing is treated as too small to take seriously here.

🦶 The same warning now covers feet
🔁 Repetition here is deliberate, not careless
🚶 Feet carry a person toward or from sin
📖 No part of life is exempt

---
## 👁️ If Thine Eye Offend Thee

Jesus completes the pattern by naming the eye last.

Eyes often lead desire before the hands or feet ever act.

"Pluck it out" is the most severe image in this entire warning.

Entering the kingdom with one eye still beats keeping both and losing everything.

The pattern across all three warnings is the same, cost now instead of ruin later.

👁️ Eyes often lead desire first
✂️ Pluck it out is the harshest image
⚖️ One eye beats losing everything
📖 Cost now is better than ruin later

# Mark 9:49-50
# 🧂 Salted With Fire
---
## 🔥 Every One Shall Be Salted With Fire

This line shifts from personal warning to a wider statement.

Salt in Old Testament offerings preserved and purified what was sacrificed.

Fire here carries a similar idea, testing and refining what passes through it.

Everyone eventually faces this kind of refining in some form.

This verse bridges the warnings before it to the instruction about salt after it.

🔥 Fire here means testing and refining
🧂 Salt once preserved Old Testament offerings
🌍 Everyone faces this refining eventually
➡️ This verse bridges warning and instruction

---
## 🧂 If The Salt Have Lost His Saltness

Salt in this culture mainly came from mineral deposits, not purified like today.

That kind of salt could lose its flavor.

Other minerals in it would still remain.

Flavorless salt was useless, since nothing could restore it once that happened.

Jesus asks what could possibly season salt once salt itself fails.

The question has no good answer, and that is the entire point.

🧂 Ancient salt could lose its flavor
🙅 Flavorless salt had no real use
❓ Nothing could season salt itself
📖 The unanswerable question is the point

---
## 🤝 Have Peace One With Another

Jesus ends this entire chapter by circling back to the argument the disciples had earlier.

"Have salt in yourselves" means keep whatever makes a person useful and genuine.

Losing that inner quality leaves nothing left to offer anyone else.

Peace between the disciples depends on each of them staying genuine first.

The chapter that opened in glory on a mountain ends with a plain, practical command.

🔄 Jesus circles back to their argument
🧂 Salt in yourselves means staying genuine
🤝 Peace depends on staying genuine first
📖 Glory ends in a plain command
`.trim();

export const MARK_NINE_PERSONAL_SECTIONS = parseMarkNineRawNotes(MARK_NINE_RAW_NOTES);
