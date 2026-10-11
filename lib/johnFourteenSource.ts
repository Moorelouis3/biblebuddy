export type JohnFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnFourteenRawNotes(rawText: string): JohnFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 14:${startVerse}` : `John 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 John 14 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_FOURTEEN_RAW_NOTES = `# John 14:1-4
# 🏠 A Place Prepared For You
---
## 💔 Let Not Your Heart Be Troubled

"Troubled" means stirred up and shaken inside, not simple worry.

Jesus says this right after warning Peter that he will deny him three times.

The disciples have every reason to panic in this moment.

Jesus does not pretend the hard road ahead will be easy.

He asks them to trust him the same way they already trust God.

💔 Troubled means shaken deep inside

⚔️ This follows the warning to Peter

🙏 Jesus asks for trust, not panic

📖 Trusting him means trusting God

## 🏠 In My Father's House Are Many Mansions

"Mansions" does not mean huge, fancy houses the way the word sounds today.

The old word simply meant a room or a place to stay.

Jesus pictures his Father's house as a home with plenty of room for everyone.

There is no shortage of space and no fight over who gets in.

This is a promise of welcome, not luxury.

🏠 Mansions means rooms, not luxury homes

👪 Father's house pictures one big family home

🙌 Plenty of room for everyone

📖 This promises welcome, not luxury

## 🔁 I Will Come Again, And Receive You Unto Myself

Jesus promises he will personally return for his followers.

This is not a vague hope about someday.

He names the goal plainly, that where he is, they may be also.

The promise is togetherness with him, not just a place.

Heaven matters because he is there.

🔁 Jesus promises a personal return

🎯 The goal is being with him

🏠 Place matters because he is there

📖 Heaven means togetherness with Christ

## 🧭 And Whither I Go Ye Know, And The Way Ye Know

Jesus assumes the disciples already know where he is headed.

He has told them before that he is going to the Father.

Thomas is about to admit out loud that he does not actually understand this.

The gap between what Jesus says and what the disciples grasp drives the next question.

Confusion here sets up one of the clearest statements Jesus ever makes about himself.

🧭 Jesus assumes they already know

👂 He already told them the direction

❓ Thomas will admit he does not

📖 Confusion sets up the next answer

# John 14:5-7
# 🛣️ The Way, The Truth, And The Life
---
## ❓ We Know Not Whither Thou Goest

Thomas says plainly that the disciples do not understand where Jesus is going.

He assumes direction has to come first before he can know the way.

This is an honest, confused question, not a rebellion.

Thomas often asks the blunt question other disciples are afraid to say out loud.

His confusion becomes the reason Jesus says the next sentence.

❓ Thomas admits real confusion here

🧭 He thinks direction must come first

🗣️ Thomas asks what others fear to ask

📖 His question leads to the next answer

## 🛣️ I Am The Way, The Truth, And The Life

Jesus answers the confusion by naming himself as the destination and the road at once.

"The way" means he is not just a guide pointing somewhere else.

"The truth" means his words can be fully trusted.

"The life" means real life with God only comes through him.

No other path, teacher, or religion can offer all three together.

🛣️ The way means he is the road

✅ The truth means he can be trusted

🌱 The life means real life through him

📖 No other path offers all three

## 🔗 If Ye Had Known Me, Ye Should Have Known My Father Also

Jesus says knowing him and knowing God are not two separate things.

The disciples already have access to the Father through knowing Jesus, even without realizing it.

"From henceforth" means starting now, their understanding is about to grow.

Jesus is preparing them to see something they have not fully noticed yet.

Seeing Jesus clearly is seeing God clearly.

🔗 Knowing Jesus means knowing the Father

⏳ From henceforth means starting now

👁️ Their understanding is about to grow

📖 Seeing Jesus means seeing God

# John 14:8-11
# 👁️ Seeing The Father In The Son
---
## 📝 Lord, Shew Us The Father

"Shew" is the old spelling of show.

Philip is asking Jesus for something dramatic, a visible appearance of God himself.

He wants proof the way Moses once asked to see God's glory.

Philip still thinks of God and Jesus as two separate things to prove.

His request reveals exactly what Jesus is about to correct.

📝 Shew is the old spelling of show

👀 Philip wants a visible proof

📜 He echoes Moses asking to see God

📖 His request reveals a misunderstanding

## 👁️ He That Hath Seen Me Hath Seen The Father

Jesus answers Philip's request directly, he has already seen what he is asking for.

Seeing Jesus in action has already been seeing God in action.

This is one of the clearest statements in the Bible that Jesus is God.

Philip did not need a separate vision because he had been looking at one the whole time.

The miracle he wanted already happened, he just did not recognize it.

👁️ Seeing Jesus means seeing God

✝️ This is a clear claim to deity

🙈 Philip missed what he already had

📖 The proof he wanted was already there

## 🏠 The Father That Dwelleth In Me, He Doeth The Works

Jesus does not act alone, separate from the Father.

"Dwelleth" means to live inside permanently, not visit for a time.

The miracles people saw came from the Father working through the Son.

Jesus and the Father share one will and one mission together.

This is not two gods cooperating, it is one God in perfect unity.

🏠 Dwelleth means living inside permanently

⚡ The miracles came from the Father

🤝 Father and Son share one mission

📖 One God, acting in perfect unity

## 🙏 For The Very Works' Sake

Jesus gives the disciples a backup way to believe if words are not enough.

The miracles themselves are evidence, not just magic tricks.

Every work Jesus did pointed back to his unity with the Father.

He is not asking for blind faith with no reason behind it.

Evidence and trust work together here, not against each other.

🙏 Jesus offers a backup reason to believe

⚡ The works themselves are real evidence

🔗 Every miracle pointed to the Father

📖 Faith here is reasonable, not blind

# John 14:12-15
# 🙏 Greater Works And Answered Prayer
---
## 🔥 The Works That I Do Shall He Do Also

Jesus promises his followers will continue doing the kind of work he has been doing.

This does not mean they will outdo Jesus in power or glory.

It means his mission will not end when he leaves.

The book of Acts shows this promise playing out through the apostles.

Jesus is handing off his work, not finishing it alone.

🔥 The disciples will continue his work

🚫 This is not about outdoing Jesus

📖 Acts shows this promise in action

➡️ Jesus hands off the mission, not ends it

## 🙏 That Will I Do, That The Father May Be Glorified

Jesus ties answered prayer to a bigger purpose than personal comfort.

The goal of prayer in his name is to make God look good, not to grant any wish.

"Glorified" means to be shown as great and worthy of honor.

Prayer here is a tool for God's reputation, not a vending machine.

That is why the next verse repeats the same promise with the same purpose.

🙏 Prayer in his name has a purpose

✨ Glorified means shown as great

🚫 Prayer is not a vending machine

📖 The goal is God's reputation

## 🔁 If Ye Shall Ask Any Thing In My Name, I Will Do It

This verse repeats the promise from the line before it on purpose.

Repetition in scripture usually signals something important, not filler.

"In my name" means asking in line with who Jesus is and what he wants.

It is not a magic phrase attached to any random request.

The repeated promise anchors prayer to Jesus himself, not to willpower.

🔁 This repeats the promise on purpose

📌 Repetition signals real importance

🚫 In my name is not a magic phrase

📖 Prayer stays anchored to Jesus

## ❤️ If Ye Love Me, Keep My Commandments

Jesus ties love for him directly to obedience, not just feeling.

Love here is shown through action, not just emotion.

This sets up the deeper teaching on the Spirit that follows immediately.

Obedience is not how someone earns Jesus, it is how love for him shows itself.

Feelings alone were never the proof Jesus asked for.

❤️ Love for Jesus means obedience

🙌 Action proves love, not just feeling

🕊️ This sets up the Spirit teaching next

📖 Obedience shows love, it does not earn it

# John 14:16-21
# 🕊️ Another Comforter Promised
---
## 🕊️ I Will Pray The Father, And He Shall Give You Another Comforter

"Comforter" translates a Greek word, parakletos, meaning someone called alongside to help.

It can also mean an advocate, like a lawyer who stands with you.

The word "another" matters here, Jesus has already been this kind of helper himself.

He is promising a replacement presence, not an upgrade or a downgrade.

The disciples are not being left to figure things out alone.

🕊️ Comforter means one called to help

⚖️ It can also mean an advocate

🔁 Another means a true replacement presence

📖 The disciples will not be left alone

## 🕊️ The Spirit Of Truth, Whom The World Cannot Receive

This Comforter is identified directly as the Holy Spirit.

"The world" here means people who reject God, not the physical planet.

They cannot receive the Spirit because they are not looking for him or trusting him.

The disciples already know him because they have already trusted Jesus.

Recognition of the Spirit depends on a relationship with God already in place.

🕊️ The Comforter is the Holy Spirit

🌍 The world means those who reject God

🙈 They cannot see what they reject

📖 Knowing him depends on trusting God first

## 👶 I Will Not Leave You Comfortless

"Comfortless" means abandoned, like an orphan with no one to care for them.

Jesus promises the disciples will not be left in that condition.

"I will come to you" points both to the resurrection and to the Spirit's arrival.

This is a promise of presence, not just a promise of memory.

Jesus leaving physically does not mean Jesus leaving them.

👶 Comfortless means abandoned like an orphan

🙌 Jesus promises he will not leave them

🌅 This points to both resurrection and the Spirit

📖 Presence, not just memory, is the promise

## 🌅 Because I Live, Ye Shall Live Also

Jesus connects his own resurrection directly to the disciples' future.

His life becomes the source and guarantee of their life.

This is not just encouragement, it is a specific promise tied to the resurrection.

Their hope depends entirely on him actually rising from the dead.

A dead teacher could never make this kind of promise and keep it.

🌅 His resurrection guarantees their life

🔗 Their hope is tied to his

✝️ This promise only works if he rises

📖 A dead teacher could not promise this

## 📅 At That Day Ye Shall Know

"That day" points forward to after the resurrection and the Spirit's coming.

Right now the disciples only partly understand what Jesus is teaching them.

Later, understanding will replace confusion, not through new information but through experience.

Jesus describes a tight chain linking himself, the Father, and every believer.

Understanding this truth was always meant to come with time, not all at once.

📅 That day means after the resurrection

🧩 Full understanding comes later, not now

🔗 The chain links Father, Son, and believer

📖 Clarity grows with time, not instantly

## 🔁 He That Hath My Commandments, And Keepeth Them

Obedience returns here as proof of love, repeating what verse fifteen already said.

"He it is that loveth me" ties obedience and love together again on purpose.

Jesus promises something new this time, that he will manifest himself personally.

"Manifest" means to make clearly visible or known.

Obedience is not a hoop to jump through, it is what opens the door to deeper knowledge of Jesus.

🔁 This repeats the obedience and love link

👁️ Manifest means made clearly visible

🚪 Obedience opens deeper knowledge of Jesus

📖 Love and obedience stay joined together

# John 14:22-26
# 📜 Judas Asks, And The Comforter Explained
---
## 👤 Judas Saith Unto Him, Not Iscariot

This is a different Judas than the one who betrayed Jesus.

John adds "not Iscariot" so readers do not confuse the two men.

This Judas is also called Thaddaeus or Jude in other parts of the New Testament.

His question is simple and honest, why does Jesus only show himself to some people.

Even a lesser known disciple gets a real answer from Jesus.

👤 This Judas is not the betrayer

🏷️ John clarifies to avoid confusion

📜 He is also called Thaddaeus or Jude

📖 Even a quiet disciple gets a real answer

## ❤️ If A Man Love Me, He Will Keep My Words

Jesus answers Judas without directly explaining why some see him and others do not.

Instead he repeats the same link between love and obedience a third time now.

The real answer is relational, not about having special access or secret knowledge.

Anyone willing to keep his words gets this closeness, not just the twelve disciples.

The invitation is wide open, not limited to a small group.

❤️ Love for Jesus still means obedience

🔁 This is the third repeat of this link

🚪 Closeness is relational, not secret knowledge

📖 The invitation is open to anyone

## 📜 The Word Which Ye Hear Is Not Mine, But The Father's

Jesus insists his teaching did not originate with him alone.

Everything he says comes directly from the Father who sent him.

This protects Jesus from ever being accused of inventing his own private religion.

His authority rests on being sent, not on being self appointed.

Hearing Jesus is the same as hearing God speak directly.

📜 Jesus did not invent his own teaching

🔗 His words come straight from the Father

🚫 He was sent, not self appointed

📖 Hearing Jesus means hearing God

## ⏳ These Things Have I Spoken Unto You, Being Yet Present With You

Jesus points out plainly that his time with them in person is almost over.

"Being yet present" means while he can still speak to them face to face.

He wants them to remember these specific words after he is physically gone.

Soon his teaching will need to be carried by memory and by the Spirit, not his own voice.

This moment matters because it is one of the last times he can say it himself.

⏳ His time with them in person is ending

🗣️ Present means while still face to face

🧠 He wants these words remembered later

📖 Soon the Spirit carries this teaching forward

## 🎓 He Shall Teach You All Things, And Bring All Things To Your Remembrance

The Holy Ghost gets two specific jobs named here, teaching and reminding.

Teaching means helping the disciples understand truth they could not grasp on their own yet.

Remembrance means bringing Jesus's own words back to mind at the right moment later.

This explains how the apostles could later write the Gospels accurately, years after the events.

The Spirit was not inventing new material, he was preserving and explaining what Jesus already said.

🎓 Teaching means grasping truth more fully

🧠 Remembrance means recalling Jesus's own words

📝 This explains how the Gospels were written accurately

📖 The Spirit preserves, he does not invent

# John 14:27-31
# ☮️ Peace Before The Cross
---
## ☮️ Peace I Leave With You, My Peace I Give Unto You

This is not peace the way the world usually offers it.

Worldly peace often depends on quiet circumstances or the absence of trouble.

Jesus gives peace that can stay steady even when trouble is still happening.

He is about to be arrested, beaten, and killed, and still offers this peace right now.

Peace here is a gift tied to him, not a feeling tied to circumstances.

☮️ This is not worldly peace

🌪️ Worldly peace depends on calm circumstances

✝️ Jesus gives peace even before the cross

📖 This peace is a gift, not a feeling

## 👑 My Father Is Greater Than I

This phrase does not mean Jesus is a lesser or lower kind of being than the Father.

It describes his position in this moment, obedient and sent on a mission.

A son on a mission still honors the one who sent him.

Jesus remains fully equal to the Father in nature, even here.

This verse has been misused throughout history to deny that Jesus is fully God.

The rest of John's Gospel makes his full deity clear elsewhere.

👑 This describes his role, not his nature

🙇 Sons still honor the one who sent them

⚖️ Jesus remains fully equal to the Father

📖 John's Gospel affirms his full deity elsewhere

## 🔮 That, When It Is Come To Pass, Ye Might Believe

Jesus tells the disciples what is about to happen before it happens, on purpose.

This includes his arrest, death, and the arrival of the Comforter later.

Prophecy fulfilled in real time becomes evidence, not just comfort.

Jesus wants faith built on fulfilled promises, not blind guessing after the fact.

Watching a prediction come true strengthens faith more than almost anything else.

🔮 Jesus predicts events before they happen

✅ Fulfilled prophecy becomes real evidence

🙏 Faith rests on fulfilled promises

📖 Fulfillment strengthens faith more than guessing

## 👑 The Prince Of This World Cometh, And Hath Nothing In Me

"The prince of this world" is a title for Satan.

His arrival here points to Judas's betrayal and the arrest that follows soon after.

"Hath nothing in me" means Satan has no claim, no sin, and no foothold in Jesus.

Every temptation Satan tries will find nothing to grab onto.

Jesus faces his enemy with nothing hidden and nothing to hide.

👑 Prince of this world means Satan

🚪 His arrival points to the coming arrest

🛡️ Jesus has no sin for him to grab

📖 Nothing hidden means nothing to fear

## 📍 Arise, Let Us Go Hence

"Hence" is an old word meaning from this place, or away from here.

Jesus does not wait passively for his arrest to come find him.

He walks toward it on purpose, straight from this long conversation into the garden of Gethsemane.

This chapter that began with comfort ends with Jesus moving willingly toward the cross.

Peace and purpose carried him forward, not fear.

📍 Hence means away from this place

🚶 Jesus walks toward his arrest on purpose

🌳 This leads straight into Gethsemane

📖 Peace carried him forward, not fear
`.trim();

export const JOHN_FOURTEEN_PERSONAL_SECTIONS = parseJohnFourteenRawNotes(JOHN_FOURTEEN_RAW_NOTES);
