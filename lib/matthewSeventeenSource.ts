export type MatthewSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewSeventeenRawNotes(rawText: string): MatthewSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 17:${startVerse}` : `Matthew 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Matthew 17 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_SEVENTEEN_RAW_NOTES = `# Matthew 17:1-6
# ✨ The Transfiguration
---
## 👤 Jesus Taketh Peter, James, And John His Brother

Peter, James, and John always walk closest with Jesus.

These same three alone will be with him later in Gethsemane.

"His brother" shows that James and John are brothers, sons of Zebedee.

Jesus picks a small, trusted circle for this coming moment.

👤 Peter, James, and John form the inner circle
🙏 These three later stand with him at Gethsemane
👬 James and John are brothers, sons of Zebedee
📖 Jesus picks a small, trusted circle

## 🧭 Up Into An High Mountain Apart

"Apart" means away from the crowd, in private.

Scripture never names this mountain directly.

Many scholars connect it to Mount Tabor in Galilee.

Others point instead to Mount Hermon, near the region from chapter sixteen.

The location matters less than the privacy Jesus wanted for this moment.

🧭 Apart means away from the crowd
🌄 Many link it to Mount Tabor
🏔️ Others point to Mount Hermon instead
📖 The private setting mattered more than the name

## ✨ Transfigured Before Them

"Transfigured" means his appearance was changed into something greater.

The Greek word behind it also appears later, describing a believer's own transformation.

This was not a disguise Jesus put on from outside.

For a brief moment, his hidden glory simply broke through.

✨ Transfigured means changed into something greater
🔄 The same word describes a believer's transformation
🎭 This was not a disguise from outside
📖 His hidden glory briefly broke through

## ☀️ His Face Did Shine As The Sun, And His Raiment Was White As The Light

Moses once came down from Sinai with a glowing face.

That glow was only a reflection.

It did not last.

Here the glory does not reflect off Jesus.

It shines directly out of him.

This was divine glory, not a borrowed reflection.

☀️ His face shone like the sun
🪞 Moses only reflected God's glory once
🔥 Jesus shines with glory from within
📖 This was divine glory, not borrowed

## 📜 There Appeared Unto Them Moses And Elias Talking With Him

Moses represents the law, and Elias represents the prophets.

Moses died and was buried, yet here he stands very much present.

Elias never died at all, but was taken up to heaven alive.

Together they stand for everything the Old Testament pointed toward.

Both men also had their own mountain encounters with God long before this one.

📜 Moses stands for the law
🔥 Elias stands for the prophets
⛰️ Both once met God on a mountain
📖 They point toward everything Jesus now fulfills

## 🗣️ Lord, It Is Good For Us To Be Here

Peter speaks first, as he often does.

He wants this glorious moment to simply keep going.

Staying on the mountain feels safer than walking back down toward Jerusalem.

Peter is not wrong that the moment is good.

He is wrong about what should happen next.

🗣️ Peter speaks first, as usual
⛰️ He wants to stay on the mountain
🏃 Jerusalem means walking toward suffering
📖 The moment was good, his plan was not

## 🏠 Let Us Make Here Three Tabernacles

"Tabernacles" means simple shelters or booths, not permanent houses.

Peter may be thinking of the Feast of Tabernacles, which celebrated God dwelling with Israel.

He wants to build something and hold onto this moment.

But Moses and Elias are not here to stay.

This mountain was a visit, not a destination.

🏠 Tabernacles means simple, temporary shelters
🎉 Peter may be recalling a Jewish feast
✋ He wants to hold onto the moment
📖 This mountain was a visit, not a home

## ☁️ A Bright Cloud Overshadowed Them

This cloud is not ordinary weather.

The same kind of cloud once covered Mount Sinai when God gave the law.

It also filled the tabernacle and later the temple when God's presence arrived.

Wherever this cloud appears, it marks God himself drawing near.

☁️ This cloud is not ordinary weather
⛰️ The same cloud covered Mount Sinai
🏛️ It also filled the tabernacle and temple
📖 The cloud means God is drawing near

## 🔊 This Is My Beloved Son, In Whom I Am Well Pleased, Hear Ye Him

God spoke these same first words once before, at Jesus's baptism.

This time, one new command is added at the very end.

"Hear ye him" means listen to Jesus and obey what he says.

Moses gave the law, and Elias spoke for God as a prophet.

Now God points past them both, straight to his Son.

🔊 God repeats his words from the baptism
👂 Hear him means listen and obey
📜 Moses gave the law, Elias the prophets
📖 God now points past both, straight to Jesus

## 🙇 They Fell On Their Face, And Were Sore Afraid

Falling on the face was a common reaction to God's direct presence.

"Sore afraid" means they were overwhelmed with fear, not mildly nervous.

Other prophets like Isaiah, Daniel, and Ezekiel reacted the very same way.

Meeting God directly has always been overwhelming, not comfortable.

🙇 Falling down was a common reaction
😨 Sore afraid means overwhelmed, not nervous
📜 Isaiah, Daniel, and Ezekiel reacted the same
📖 Meeting God directly is overwhelming, not comfortable

# Matthew 17:7-9
# 🚶 Coming Down The Mountain
---
## 🚶 Jesus Came And Touched Them, And Said, Arise, And Be Not Afraid

Jesus moves toward his frightened disciples instead of waiting for them to recover.

His touch itself brings comfort before he even finishes speaking.

"Arise" simply means stand back up.

Fear does not get the final word.

Jesus does.

🚶 Jesus moves toward their fear
🤚 His touch brings comfort first
⬆️ Arise simply means stand up
📖 Fear does not get the last word

## 👻 They Saw No Man, Save Jesus Only

Moses and Elias are gone as suddenly as they appeared.

"Save" here is an old word meaning except.

The law and the prophets have done their work.

Now only Jesus remains standing before them.

👻 Moses and Elias vanish suddenly
📜 Save here is an old word for except
⚖️ The law and prophets have finished their work
➡️ Only Jesus is left standing

## 🤐 Tell The Vision To No Man, Until The Son Of Man Be Risen Again From The Dead

Jesus again commands silence about something amazing, just as he did in chapter sixteen.

This time, though, he gives a clear end date for the silence.

"Vision" describes the whole experience of seeing his glory and hearing God's voice.

Once Jesus rises from the dead, the full story can finally be told.

🤐 Jesus again commands silence
⏳ This time a clear end date is given
👁️ Vision covers the whole mountain experience
📖 After the resurrection, the story can be told

# Matthew 17:10-13
# 🔥 Elias Must First Come
---
## 👀 Why Then Say The Scribes That Elias Must First Come

The disciples just watched Elias appear and then disappear on the mountain.

Now they bring up a teaching they learned from the scribes.

The scribes taught that Elijah would return before the Messiah, based on the prophet Malachi.

The disciples are confused about how that teaching fits what they just saw.

👀 They just watched Elias vanish
😕 The disciples are confused by the timing
📜 Scribes taught Elijah would return first
📖 That same prophecy is about to be explained

## ✅ Elias Truly Shall First Come, And Restore All Things

Jesus confirms the scribes were right about the prophecy itself.

"Restore all things" describes preparing people's hearts to receive the coming Messiah.

This was never going to be a political or military restoration.

It was always a change of heart, pointed toward repentance.

✅ Jesus confirms the prophecy is true
🔧 Restore means prepare hearts, not politics
🙏 The change was about repentance
📖 Elias would get people ready for the Messiah

## 🔁 Elias Is Come Already, And They Knew Him Not

Jesus reveals that the prophecy about Elias already happened.

John the Baptist fulfilled that role, though most people never realized it.

"Knew him not" means they failed to recognize who he truly was.

Fulfilled prophecy can be standing right in front of people unnoticed.

🔁 The Elias prophecy already happened
🧑 John the Baptist filled that role
🙈 Most people never recognized him
📖 Fulfilled prophecy can go unnoticed

## 📜 Done Unto Him Whatsoever They Listed

"Listed" is an old word meaning wished or pleased.

This phrase quietly points back to John's death in chapter fourteen.

Herod had John beheaded simply because it pleased him and his guests.

John suffered for doing exactly what Elias was sent to do.

📜 Listed is an old word for pleased
🗡️ This points back to John's beheading
👑 Herod acted on his own wishes
📖 John suffered for doing his assigned work

## 🔗 Likewise Shall Also The Son Of Man Suffer Of Them

Jesus draws a direct line from John's suffering to his own.

John was mistreated by the very people he came to serve.

Jesus warns that the same pattern is coming for him too.

The world's rejection of God's messengers is nothing new.

🔗 Jesus links John's story to his own
💔 John was mistreated by his own people
⚠️ The same pattern now comes for Jesus
📖 Rejecting God's messengers is nothing new

## 💡 Then Understood The Disciples That He Spake Unto Them Of John The Baptist

The confusion from the start of this conversation finally clears up.

The disciples now connect Jesus's words directly to John the Baptist.

This also explains why Elias appeared briefly on the mountain earlier.

One mystery from this chapter is now fully solved.

💡 The disciples finally understand
🧩 They connect this to John the Baptist
⛰️ This explains Elias on the mountain
📖 One mystery in this chapter is now solved

# Matthew 17:14-21
# 🌙 Bring Him Hither To Me
---
## ⛰️ There Came To Him A Certain Man, Kneeling Down To Him

The scene shifts suddenly from mountain glory to valley need.

Moments earlier, Jesus stood shining in dazzling light.

Now a desperate father kneels before him instead.

Glory and suffering sit right next to each other in this chapter.

⛰️ The scene shifts from glory to need
🙇 A father kneels before Jesus
😟 He comes desperate, not curious
📖 Glory and suffering sit side by side here

## 🌙 Lord, Have Mercy On My Son, For He Is Lunatick, And Sore Vexed

"Lunatick" is an old word used for severe seizures or fits.

The term literally ties the symptoms to phases of the moon.

"Sore vexed" means badly tormented, not simply uncomfortable.

Verse eighteen later reveals a demon was the real cause behind it.

🌙 Lunatick is an old word for seizures
🌕 It ties symptoms to moon phases
😣 Sore vexed means badly tormented
📖 A demon was the real cause

## 🔥 Ofttimes He Falleth Into The Fire, And Oft Into The Water

"Ofttimes" and "oft" are both old words meaning often.

The boy's seizures put his own life in constant danger.

Falling into fire or water could easily have killed him.

This father has likely watched this happen many times already.

🔥 Ofttimes and oft both mean often
⚠️ His seizures put him in real danger
💧 Fire and water both could kill him
📖 This father has lived with constant fear

## 📜 I Brought Him To Thy Disciples, And They Could Not Cure Him

Back in chapter ten, Jesus personally gave the disciples authority to heal.

They had already cast out demons successfully before this moment.

Here, for some reason, that same authority does not seem to work.

Their failure sets up the lesson Jesus is about to teach.

📜 Chapter ten gave them healing authority
✅ They had cast out demons before
❌ This time their authority does not work
📖 Their failure sets up a lesson

## 😤 O Faithless And Perverse Generation, How Long Shall I Be With You

Jesus directs this rebuke at more than just the boy's father.

"Faithless" names a deep lack of trust running through the whole crowd.

"Perverse" means twisted away from what is right.

This frustration reaches his own disciples, not only the crowd.

😤 Jesus rebukes more than the father
🙅 Faithless means a deep lack of trust
🔀 Perverse means twisted from what is right
📖 Even his own disciples share the blame

## 🗣️ Jesus Rebuked The Devil, And He Departed Out Of Him

Jesus speaks directly to the demon itself, not to the boy.

The demon leaves the instant Jesus commands it.

"That very hour" confirms the healing was immediate, not gradual.

This confirms the boy's condition was spiritual, not only physical.

🗣️ Jesus speaks directly to the demon
⚡ The demon leaves instantly
⏱️ The healing happens that very hour
📖 The real cause was spiritual, not physical

## 🤫 Why Could Not We Cast Him Out

The disciples ask Jesus this question privately, away from the crowd.

They had successfully cast out demons before, back in chapter ten.

This failure genuinely confuses them.

They expected the same power to work the same way every time.

🤫 They ask Jesus privately
✅ They had succeeded at this before
😕 This failure genuinely confuses them
📖 Power is not automatic every time

## 🎯 Because Of Your Unbelief

Jesus names the direct cause of their failure.

"Unbelief" is not the same as having zero faith at all.

It describes trust that has grown thin or distracted.

Even a small amount of real trust changes everything.

🎯 Unbelief is the direct cause named
🌱 It means thin or distracted trust
💪 Real trust changes everything
📖 Faith matters more than method

## 🌱 If Ye Have Faith As A Grain Of Mustard Seed

A mustard seed was known as one of the smallest seeds people planted.

Jesus is not asking for a huge, impressive amount of faith.

The point is the kind of faith, not its size.

Even tiny, genuine trust in God can move what looks impossible.

🌱 A mustard seed is tiny
📏 This is not about faith's size
🔑 The kind of faith is what matters
📖 Tiny, real trust can move the impossible

## 🗣️ Ye Shall Say Unto This Mountain, Remove Hence To Yonder Place

Jewish teachers of this time already used moving a mountain as a figure of speech.

It was a common way of describing something that looked completely impossible.

Jesus is not promising disciples will literally relocate mountains.

He is promising that real faith accomplishes what looks impossible.

🗣️ Moving mountains was a common Jewish saying
😮 It pictured something totally impossible
🚫 This is not a literal promise
📖 Real faith accomplishes the impossible

## 📘 Howbeit This Kind Goeth Not Out But By Prayer And Fasting

"Howbeit" is an old word meaning however.

Not every spiritual battle looks exactly the same.

This kind of opposition specifically calls for prayer and fasting.

Many of the oldest Greek manuscripts do not include this verse, though the King James Version does.

Dependence on God sometimes takes sustained effort, not a quick word.

📘 Howbeit is an old word for however
🙏 Prayer and fasting answer this kind
📜 Some old manuscripts omit this verse
➡️ Real dependence sometimes takes sustained effort

# Matthew 17:22-23
# 💔 Betrayed Into The Hands Of Men
---
## 🔁 The Son Of Man Shall Be Betrayed Into The Hands Of Men

This is the second time Jesus predicts his coming death plainly.

"Betrayed" points specifically to deception by someone close, not open attack.

Judas has not yet acted, but Jesus already names the pattern.

"Hands of men" shows human agency even inside God's larger plan.

🔁 This is the second death prediction
🗡️ Betrayed points to deception, not open attack
🤝 Judas has not acted yet
📖 Human choices work inside God's plan

## 💀 They Shall Kill Him, And The Third Day He Shall Be Raised Again

Jesus states his death and his resurrection in the very same sentence.

He never separates the cross from what comes right after it.

"The third day" gives a specific, concrete timeline, not a vague hope.

Death was never going to be the end of this story.

💀 Death and resurrection share one sentence
⏳ The third day is a specific timeline
🔒 Death was never the final word
📖 This story was always headed toward life

## 😢 They Were Exceeding Sorry

This time the disciples react with grief, not an argument.

Back in chapter sixteen, Peter had tried to correct Jesus directly.

Here nobody rebukes him, even though nobody fully understands either.

Sorrow can sit right alongside confusion.

😢 They grieve instead of arguing
🔁 Chapter sixteen ended in correction, not grief
🤔 They still do not fully understand
📖 Sorrow and confusion can sit together

# Matthew 17:24-27
# 🐟 The Tribute Money
---
## 🏛️ They That Received Tribute Money Came To Peter

"Tribute money" here refers to the temple tax, not a Roman tax.

Every Jewish man was expected to pay this tax once a year.

The money went toward the upkeep of the temple in Jerusalem.

Collectors approach Peter first, testing what Jesus himself practices.

🏛️ Tribute money means the temple tax
📅 It was collected once each year
🔧 It paid for the temple's upkeep
📖 Collectors test Jesus through Peter first

## ❓ Doth Not Your Master Pay Tribute

The question assumes Jesus should already be paying this tax.

Peter answers immediately, without even checking with Jesus first.

His quick yes sets up the conversation Jesus is about to have with him.

Peter will soon learn there was more to this than he realized.

❓ The question assumes Jesus pays the tax
⚡ Peter answers quickly, without asking Jesus
💬 His answer sets up what follows
📖 There was more to this than Peter knew

## ⏩ Jesus Prevented Him, Saying, What Thinkest Thou, Simon

"Prevented" is an old word meaning to go before or anticipate.

Jesus already knows about this conversation before Peter even mentions it.

He calls Peter "Simon" here, his original, personal name.

Jesus steers the conversation with a question instead of a direct answer.

⏩ Prevented means to go before or anticipate
👁️ Jesus already knew about the question
👤 Simon was Peter's original name
📖 Jesus teaches by asking, not telling

## 👑 Of Whom Do The Kings Of The Earth Take Custom Or Tribute

Jesus answers with a picture from royal households.

Kings tax the people they rule, not their own family.

"Custom" and "tribute" were both common words for this kind of tax.

Jesus is quietly building toward a point about his own identity.

👑 Jesus pictures a royal household
💰 Custom and tribute both meant this tax
🏛️ Kings tax the people they rule
📖 Jesus is building toward his own identity

## 👨‍👩‍👧 Of Their Own Children, Or Of Strangers

Jesus narrows the question down to just two options.

A king's own children are never taxed by their own father.

Strangers, meaning outsiders and subjects, are the ones who pay.

Peter must choose which side fits Jesus best.

👨‍👩‍👧 A king's own children pay nothing
🌍 Strangers means outsiders who do pay
🤔 Peter must choose which side fits
📖 The answer is about to name Jesus

## ✅ Then Are The Children Free

Peter answers correctly.

Kings do not tax their own children.

If Jesus is God's Son, he belongs to the King's own household.

By that logic, Jesus owes nothing.

Yet he chooses to pay anyway.

✅ Peter answers the riddle correctly
👑 Jesus belongs to the King's own household
🆓 By that logic, Jesus owes nothing
📖 He pays anyway, though he owes nothing

## ⚖️ Lest We Should Offend Them

"Offend" here means to cause needless stumbling or conflict.

Jesus is exempt from this tax by his own logic.

He still chooses to avoid an unnecessary fight over a technicality.

Being right is not always worth the conflict it could start.

⚖️ Offend means causing needless conflict
🆓 Jesus is exempt by his own logic
🤝 He avoids a fight over a technicality
📖 Being right is not always worth the fight

## 🎣 Go Thou To The Sea, And Cast An Hook

Jesus sends Peter fishing, of all things, to solve a tax problem.

"An hook" is simply the old spelling of a fishing hook.

Jesus already knows exactly what Peter will find.

Nothing about this miracle is left to chance.

🎣 Jesus sends Peter fishing
🪝 An hook is just an old spelling
🔮 Jesus already knows what Peter will find
📖 Nothing here is left to chance

## 🐟 When Thou Hast Opened His Mouth, Thou Shalt Find A Piece Of Money

A coin sits inside a fish's mouth, exactly where Jesus said it would be.

This is the same God who once fed thousands with a few loaves of bread.

Small, practical needs matter to Jesus just as much as big miracles.

Provision does not always arrive in the way someone expects.

🐟 A coin waits inside the fish's mouth
🍞 The same power once fed thousands
💰 Small needs matter to Jesus too
📖 Provision rarely arrives the way we expect

## 🪙 That Take, And Give Unto Them For Me And Thee

Jesus tells Peter to pay for both of them with the one coin.

"Thee" is simply the old word for you.

Jesus covers Peter's share along with his own.

This moment quietly pictures grace.

Jesus pays a debt that was never his.

🪙 One coin pays for both of them
📜 Thee is the old word for you
🤲 Jesus covers Peter's share too
📖 Jesus pays a debt that was never his
`.trim();

export const MATTHEW_SEVENTEEN_PERSONAL_SECTIONS = parseMatthewSeventeenRawNotes(MATTHEW_SEVENTEEN_RAW_NOTES);
