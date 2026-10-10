export type JohnOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnOneRawNotes(rawText: string): JohnOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 1:${startVerse}` : `John 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 John 1 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_ONE_RAW_NOTES = `# John 1:1-5
# 📖 In The Beginning Was The Word
---
## 📖 In The Beginning Was The Word

"The Word" is John's name for Jesus before he even says his name.

Genesis begins with God creating the world.

John begins even earlier, with the Word already existing.

Jesus was not created at the start of time.

He was already there before time started.

📖 The Word is John's name for Jesus

⏳ Genesis starts at creation, John starts earlier

♾️ Jesus existed before time began

➡️ He was not created, he was already there

## 🤝 The Word Was With God, And The Word Was God

This one line makes two claims at once.

The Word was with God, meaning a real distinct person.

The Word was God, meaning fully God himself.

Jesus is both separate from the Father and fully God.

This is the doctrine of the Trinity in its earliest form.

🤝 With God means a distinct person

👑 Was God means fully divine

➕ Both claims stand true together

📖 This is an early picture of the Trinity

## 🌌 All Things Were Made By Him

This means nothing exists that Jesus did not make.

Not one star, not one atom, not one living thing.

Genesis says God created the world.

John says Jesus is that same Creator.

Verse three repeats the idea so no reader can argue an exception.

🌌 Jesus made everything that exists

⭐ No star or atom is excluded

🔁 John repeats it to close every loophole

📖 The Creator of Genesis is Jesus

## 🔥 In Him Was Life

"Life" here means more than a beating heart.

It means the very source that makes anything alive at all.

Jesus does not just have life.

He is the place life comes from.

Everything that lives, lives because life started in him.

🔥 Life means the source of all life

🫀 Not just a beating heart

🌱 Everything living began in him

📖 Jesus is the origin of life itself

## 💡 The Light Shineth In Darkness

"Light" here is not sunlight.

It means truth and goodness breaking into a world that lacked both.

"Darkness" is not just night.

It pictures sin and confusion, a world that could not find its own way.

The light did not wait for an invitation.

💡 Light pictures truth breaking in

🌑 Darkness pictures sin and confusion

🚫 Darkness could not stop the light

📖 The light came uninvited

## 🌀 The Darkness Comprehended It Not

"Comprehended" does not just mean understand.

It also carries the sense of overpowering or overcoming.

The darkness could not grasp the light with its mind.

The darkness also could not put the light out.

Both meanings are true at once.

🌀 Comprehended means understand or overcome

🧠 Darkness could not understand the light

🛑 Darkness could not overcome the light

📖 Both meanings are true together

## ♾️ The Same Was In The Beginning With God

"The same" refers back to the Word from the verse before.

John repeats himself on purpose here.

He wants it absolutely clear the Word was with God from the very start.

This is not a new idea being introduced.

It is the first claim being locked down before John moves forward.

♾️ The same means the Word

🔁 John repeats the claim on purpose

🔒 He locks the claim down early

➡️ Everything that follows builds on this

# John 1:6-8
# 🕯️ A Man Sent From God
---
## 🕯️ There Was A Man Sent From God, Whose Name Was John

This John is not the same John who wrote this gospel.

This is John the Baptist, a different man entirely.

He did not choose this role for himself.

God sent him for a specific purpose.

His whole job was to point toward someone greater than himself.

🕯️ This John is the Baptist, not the author

🙋 God sent him, not himself

🎯 He had one specific assignment

➡️ His job was to point to Jesus

## 👉 To Bear Witness Of The Light

A witness does not create the truth.

A witness points at the truth and tells others what he saw.

John was not the light himself.

His entire purpose was to point people toward the one who was.

A true witness disappears behind what he is pointing at.

👉 A witness points, he does not create

🔍 John testified to what he saw

🕯️ He was not the light himself

📖 A true witness points away from himself

## 🚫 He Was Not That Light

Crowds followed John, and some wondered if he was the promised one.

John himself denies it here directly.

He was sent to testify about the light.

He was never meant to be mistaken for it.

Confusing the messenger for the message was a real risk John had to correct.

🚫 Crowds wondered if John was the one

🙅 John denies being the light himself

📣 His role was only to testify

➡️ The messenger is never the message

# John 1:9-13
# 🌍 He Came Unto His Own
---
## ✨ The True Light, Which Lighteth Every Man

"True" here means genuine, not a copy of the real thing.

Other voices in the world claimed to offer light too.

This light was not limited to one group of people.

It lightens every man who comes into the world.

No person is outside its reach.

✨ True means genuine, not a copy

🌍 Other voices claimed to offer light too

🙌 This light reaches every single person

📖 No one is outside its reach

## 🌐 He Was In The World, And The World Knew Him Not

Jesus made the world he was now walking through.

The world he made did not recognize its own maker.

This is not a small detail.

It is one of the saddest lines in the whole chapter.

Creation failed to know its own Creator face to face.

🌐 Jesus made the world he entered

😔 The world did not recognize him

💔 This is a tragic irony

📖 Creation missed its own Creator

## 💔 His Own Received Him Not

"His own" narrows the focus from the whole world to one people.

This means Israel, the nation God had been preparing for centuries.

They had the prophecies, the promises, and the warnings.

Even they did not welcome their own Messiah.

The rejection cuts deeper because of how prepared they were.

💔 His own means Israel specifically

📜 Israel had centuries of prophecy and promise

🚫 Even they did not receive him

📖 Preparation did not guarantee recognition

## 🙏 Even To Them That Believe On His Name

Believing "on his name" means trusting everything his name represents.

In this culture a name carried someone's full identity and character.

This is not just agreeing that Jesus existed.

It means trusting him personally, the way you trust someone you know.

This kind of trust is what opens the door to becoming God's child.

🙏 Believing on his name means trusting him

📛 A name carried a person's whole identity

🧠 Not just intellectual agreement

📖 This trust opens the door

## 🙌 Power To Become The Sons Of God

"Power" here means the right or ability, not physical strength.

Becoming a "son of God" is not automatic for every person.

It is given only to those who received him.

This is adoption into God's family, not something owed by birth.

The door is open, but it only opens through receiving him.

🙌 Power means the right, not strength

👪 Sonship is adoption, not automatic

🚪 The door opens through receiving him

📖 Family with God is a gift

## 💧 Born, Not Of Blood, Nor Of The Will Of The Flesh, But Of God

This birth is not physical, bloodline, or family heritage.

"Blood" here points to ancestry, the thing Israel usually relied on.

"The will of the flesh" means ordinary human birth.

"The will of man" means no person can decide this for another.

Only God can cause this kind of birth to happen.

💧 Not physical birth or bloodline

🧬 Blood here means ancestry

🚫 No human will can cause it

📖 Only God can cause this new birth

# John 1:14-18
# 👶 The Word Was Made Flesh
---
## 👶 The Word Was Made Flesh

The eternal Word now has a human body.

This is the single biggest claim in the whole chapter.

God did not just speak to humanity from a distance.

God became one of us without stopping being God.

The invisible became visible and touchable.

👶 The eternal Word became human

🙌 God did not stay distant

♾️ He stayed fully God while becoming man

📖 The invisible became visible

## ⛺ And Dwelt Among Us

"Dwelt" here literally means pitched a tent, or tabernacled.

It is the same word used for God's dwelling among Israel in the wilderness.

Back then God's presence lived inside a tent at the center of the camp.

Now God's presence lived inside an actual human body.

The old tent was always pointing forward to this.

⛺ Dwelt means tabernacled, or pitched a tent

🏕️ Same word used for the wilderness tent

🙌 God's presence once lived among his people

📖 Jesus is where God's presence now lives

## 👀 We Beheld His Glory

"We" means John and the other eyewitnesses who actually saw Jesus.

This is not a secondhand story passed down.

John claims to have personally watched this glory with his own eyes.

"Glory" here means the visible weight and presence of God.

This is the same glory that once filled the tabernacle and the temple.

👀 We means eyewitnesses, including John

🙋 John claims to have seen it himself

✨ Glory means God's visible presence

📖 The same glory once filled the temple

## 👑 The Glory As Of The Only Begotten Of The Father

"Only begotten" does not mean created at a point in time.

It means uniquely one of a kind, the only son of his kind.

No other being holds this exact relationship to the Father.

This phrase protects Jesus from being just one more prophet or angel.

He holds a position nothing else in creation shares.

👑 Only begotten means one of a kind

🚫 It does not mean created in time

🎯 No one else shares this relationship

📖 Jesus holds a unique position

## 💛 Full Of Grace And Truth

"Grace" means receiving kindness that was not earned.

"Truth" means reliability, nothing false or broken in him.

Jesus was not partly gracious and partly truthful.

He was completely full of both at the exact same time.

Most people have to choose between being kind and being honest.

Jesus never had to choose.

💛 Grace means unearned kindness

✅ Truth means complete reliability

➕ Jesus was full of both at once

📖 He never had to choose between them

## ⬆️ He That Cometh After Me Is Preferred Before Me

John the Baptist began his public ministry before Jesus did.

In that sense Jesus comes "after" John in the order of events.

But rank does not follow timing here.

Jesus is preferred, meaning ranked higher, even though he arrived later.

John explains why in the very next phrase, "for he was before me."

⬆️ John's ministry started first

👑 Jesus still ranks higher than John

🚫 Rank does not follow timing here

📖 Jesus existed before John in eternity

## ⚖️ The Law Was Given By Moses, But Grace And Truth Came By Jesus Christ

Moses gave Israel the law at Mount Sinai.

The law showed people God's standard, and exposed their failure to meet it.

Jesus did not bring another list of rules.

He brought grace and truth in person.

The law pointed to a problem, Jesus brought the solution.

⚖️ Moses gave the law at Sinai

🪞 The law exposed human failure

💛 Jesus brought grace and truth instead

📖 The law pointed to the problem Jesus solved

## 🚫 No Man Hath Seen God At Any Time

No human has ever seen God the Father directly in his full being.

Even Moses only saw a partial glimpse of God's glory, never his full face.

God is spirit, invisible to human eyes.

This verse is not denying those earlier glimpses.

It is saying none of them showed the Father completely.

🚫 No one has seen the Father fully

👀 Moses only saw a partial glimpse

👻 God is spirit, invisible to human eyes

📖 Only Jesus reveals the Father completely

## 🤲 In The Bosom Of The Father

"Bosom" pictures the closest possible position next to someone.

It is the spot a child rests in a parent's arms.

This phrase describes Jesus's relationship with the Father, not a location.

No one is closer to the Father than the Son.

That closeness is exactly why Jesus alone can reveal who the Father is.

🤲 Bosom means the closest possible position

👶 Pictures a child in a parent's arms

❤️ It describes relationship, not location

📖 Jesus alone can reveal the Father

# John 1:19-23
# ❓ Who Art Thou
---
## 🏛️ Priests And Levites From Jerusalem

Priests and Levites served at the temple in Jerusalem.

Sending them this far was not a casual visit.

This was an official investigation sent by the religious leadership.

John's movement had grown large enough that Jerusalem needed answers.

They came to find out exactly who John claimed to be.

🏛️ Priests and Levites served the temple

📜 This was an official investigation

📈 John's movement had grown too big to ignore

➡️ They wanted a clear answer about his identity

## 🔥 Art Thou Elias

"Elias" is the Greek form of the name Elijah.

Malachi had promised that Elijah would return before the day of the Lord.

Many expected an actual return of the ancient prophet himself.

John denies being Elijah returned in person.

Jesus later says John still fulfilled that promise in a different way.

🔥 Elias is the Greek name for Elijah

📜 Malachi promised Elijah's return

🙅 John denies being Elijah in person

📖 Jesus later says John fulfilled that role anyway

## 📜 Art Thou That Prophet

"That prophet" points to a specific promise, not just any prophet.

Moses had promised God would raise up a prophet like himself one day.

That promised prophet was expected to be the Messiah himself.

John says no to this question as well.

John knew his role, and he knew it was not this one.

📜 That prophet means the Deuteronomy promise

🧑‍🏫 Moses had promised a prophet like himself

❌ John says this is not who he is

📖 John understood exactly where his role ended

## 🗣️ The Voice Of One Crying In The Wilderness

John describes himself only as a voice, not the message itself.

This phrase is a direct quote from the prophet Isaiah.

A road was often prepared ahead of a king's visit to a city.

John saw himself as the one clearing that road for the real king.

He wanted no title bigger than the job he was actually doing.

🗣️ John calls himself only a voice

📖 He is quoting the prophet Isaiah

👑 Roads were prepared ahead of a king's visit

➡️ John was preparing the way, nothing more

## 🛣️ Make Straight The Way Of The Lord

Ancient roads to a city were often rough and blocked with debris.

Workers cleared and smoothed the road before a king arrived.

"Make straight the way" means remove whatever blocks people from reaching the Lord.

John's preaching called people to repent, clearing away sin like debris on a road.

A clear road made the king's arrival easy to receive.

🛣️ Ancient roads were rough and blocked

🧹 Workers cleared roads before a king arrived

🙏 John's preaching cleared away sin like debris

📖 A clear road made Jesus easy to receive

# John 1:24-28
# 💧 I Baptize With Water
---
## 👳 They Which Were Sent Were Of The Pharisees

Not everyone sent earlier was a Pharisee.

This detail narrows the group asking the next question specifically.

Pharisees cared deeply about ritual purity and who had authority to perform washings.

That is exactly why this group zeroed in on John's baptizing.

They were not asking out of curiosity, they were checking his authority.

👳 These questioners were specifically Pharisees

🧼 Pharisees cared about ritual purity and authority

🔍 They checked John's right to baptize

📖 Their question was about authority, not curiosity

## 💧 I Baptize With Water

Ritual washing with water was already common in Jewish life.

It was used for purification before entering the temple.

John used it differently, calling people to repent before the Messiah's arrival.

Water baptism pictured an outward washing of a changed life.

John is clear that his baptism is not the main event.

💧 Ritual washing was already common in Judaism

🏛️ Water purified people before temple worship

🔄 John's baptism called people to repent

📖 John's baptism is not the main event

## 👤 There Standeth One Among You, Whom Ye Know Not

John is saying the Messiah is already standing in this very crowd.

The people questioning John had no idea Jesus was that close.

Nobody recognized him yet, not even these religious investigators.

The most important person in the story stood unnoticed among ordinary people.

That is exactly how the incarnation often works, hidden until revealed.

👤 Jesus was already standing in the crowd

🙈 No one recognized him yet

😮 Even religious experts missed him

📖 God often arrives hidden before being revealed

## 👞 Whose Shoe's Latchet I Am Not Worthy To Unloose

A "shoe's latchet" is the strap that held an ancient sandal onto the foot.

Untying a guest's sandals was the lowest task given to the lowest servant.

Even a slave might be excused from touching another man's dirty feet.

John says he is not even worthy of that smallest task for Jesus.

This is John's way of ranking himself as low as possible compared to Jesus.

👞 A latchet is a sandal strap

🧹 Untying sandals was the lowest servant's job

🙇 John says he is not worthy

📖 John ranks himself far below Jesus

## 📍 These Things Were Done In Bethabara Beyond Jordan

"Bethabara" means house of crossing, or ford.

It sat on the Jordan River.

Israel likely crossed the Jordan near this same spot under Joshua.

John baptizing people here was not random.

Something new was starting again at that same river.

📍 Bethabara means house of crossing

🏞️ It sat on the Jordan River

🔁 Israel likely crossed the Jordan near this spot

📖 Something new was starting at that same river

# John 1:29-34
# 🐑 Behold The Lamb Of God
---
## 🐑 Behold The Lamb Of God

Lambs were the animal most associated with sacrifice in Israel's worship.

A lamb's blood on the doorposts once protected Israel from death at the first Passover.

Lambs were also offered daily at the temple for sin.

John points at Jesus and calls him that same sacrificial lamb.

This single sentence tells the whole crowd why Jesus came.

🐑 Lambs were Israel's main sacrifice animal

🚪 Lamb's blood protected Israel at Passover

🔥 Lambs were offered daily for sin

📖 John names Jesus as that lamb

## 🌍 Which Taketh Away The Sin Of The World

Old Testament sacrifices were offered again and again, year after year.

They never fully removed sin, only covered it for a season.

This lamb takes sin away completely, not just for a time.

"The world" means this offer is not limited to Israel alone.

Every nation and every person is included in what this lamb accomplishes.

🌍 Old sacrifices only covered sin for a season

✅ This lamb removes sin completely

🌐 The world means all nations, not just Israel

📖 Every person is included in this offer

## ⏳ He Was Before Me

John says this phrase again, almost word for word from earlier.

He is not confused or repeating himself by accident.

This claim is important enough to say twice in one chapter.

Jesus existed before John, even though John's ministry began first in public.

John wants no one to miss this point a second time.

⏳ John repeats this claim on purpose

🔁 Said once already earlier in the chapter

👑 Jesus existed before John in eternity

📖 John makes sure no one misses it

## 🕊️ I Saw The Spirit Descending From Heaven Like A Dove

John needed a visible sign to recognize the Messiah for certain.

God had told him beforehand what that sign would look like.

A dove pictures gentleness and peace, not force or violence.

The Spirit's descent confirmed to John that this was the one he was sent to announce.

What John saw matched exactly what God had promised him in advance.

🕊️ A dove pictures gentleness, not force

👀 God told John what sign to watch for

✅ The sign confirmed Jesus was the one

📖 What John saw matched God's promise

## 🏠 It Abode Upon Him

"Abode" means stayed or remained, not just touched down briefly.

Old Testament prophets and leaders often had the Spirit come and go.

The Spirit rested on Jesus permanently, without ever lifting off again.

This marks Jesus as different from every prophet who came before him.

The Spirit finally found a permanent home.

🏠 Abode means remained, not just visited

🔄 Past leaders had the Spirit come and go

♾️ The Spirit stayed on Jesus permanently

📖 Jesus is different from every earlier prophet

## 🔥 He Which Baptizeth With The Holy Ghost

John's baptism only touched the outside of a person with water.

This baptism reaches the inside, filling a person with God's own Spirit.

Water baptism prepared people, it never changed their hearts on its own.

Only Jesus can give the Holy Ghost to another person.

This is the moment John's entire ministry was pointing toward.

🔥 Water baptism is only outward

💧 Spirit baptism changes a person inside

🙅 Water alone cannot change a heart

📖 Only Jesus can give the Holy Ghost

# John 1:35-42
# 🚶 Two Disciples Follow Jesus
---
## 👣 The Two Disciples Followed Jesus

Following a rabbi in this culture meant far more than casual interest.

A disciple left his normal life to literally walk behind his teacher daily.

These two men had been John's own followers until this moment.

Their teacher pointed away from himself, and they obeyed by walking toward Jesus instead.

A good teacher sends his own students somewhere better.

👣 Following a rabbi meant walking behind him daily

📚 A disciple left his normal life behind

🔄 These men had been John's followers first

📖 John sent his own students toward Jesus

## 👳 Rabbi, Which Is To Say, Being Interpreted, Master

"Rabbi" was a Hebrew title of respect for a recognized teacher.

John adds the translation because many of his readers did not speak Hebrew.

Calling Jesus "Rabbi" already shows these men saw him as more than a stranger.

They were ready to learn from him before they even knew where he lived.

Respect came first, understanding came later.

👳 Rabbi is a Hebrew title for teacher

🗣️ John translates it for his readers

🙇 Calling him Rabbi showed early respect

📖 Respect for Jesus came before full understanding

## 🕐 About The Tenth Hour

Jewish time was counted from sunrise, at about six in the morning.

The tenth hour lands at about four in the afternoon.

This detail is small but specific, the kind of thing an eyewitness remembers.

John likely remembered this exact hour because it was the day he met Jesus.

Small details like this one make the account feel lived, not invented.

🕐 Jewish hours were counted from sunrise

🌇 About four in the afternoon

🙋 An eyewitness would recall this detail

📖 John remembered the exact hour he met Jesus

## 👬 Andrew, Simon Peter's Brother

John introduces Andrew by his connection to his more famous brother.

Simon Peter was not yet well known at this exact moment in the story.

John writes with later events already in mind for his readers.

Andrew's first recorded act in this gospel is bringing someone else to Jesus.

That pattern defines Andrew through most of the rest of the gospel.

👬 Andrew is introduced through his brother Simon

⭐ Simon Peter becomes far more famous later

🔁 Andrew's first act is bringing someone to Jesus

📖 This pattern follows Andrew through the gospel

## 🙌 We Have Found The Messias

"Messias" is the Hebrew word Messiah, meaning anointed one.

Kings and priests in Israel were anointed with oil to mark their calling.

The Messiah was the long promised anointed king Israel had waited centuries for.

Andrew is not describing a teacher he admires.

He is claiming to have found the exact person the whole nation had waited for.

🙌 Messias means Messiah, the anointed one

🛢️ Kings and priests were anointed with oil

⏳ Israel had waited centuries for this person

📖 Andrew claims to have found him

## 🪨 Thou Shalt Be Called Cephas, Which Is By Interpretation, A Stone

Jesus renames Simon before Simon has done anything to earn it.

"Cephas" is Aramaic, and "Peter" is the Greek word for the same meaning.

Both names mean a stone or a rock.

A new name in this culture marked a new identity or a new calling.

Jesus already saw the man Simon would become, not just the man he was that day.

🪨 Cephas and Peter both mean stone

🔄 Jesus renames Simon before he earns it

🆕 A new name marked a new identity

📖 Jesus saw who Simon would become

# John 1:43-46
# 🚶 Philip And Nathanael
---
## 🚶 Jesus Findeth Philip, And Saith Unto Him, Follow Me

Philip is called directly by Jesus himself, not through a friend's invitation.

Andrew and his companion came to Jesus after John pointed them there.

Philip hears the call straight from Jesus with no go between.

"Follow me" was the standard call a rabbi gave a future disciple.

Philip obeys right away, with no recorded hesitation.

🚶 Philip is called directly by Jesus

🔄 Andrew came through a friend's invitation instead

🗣️ "Follow me" was a rabbi's standard call

📖 Philip obeys without hesitation

## 🏘️ Philip Was Of Bethsaida, The City Of Andrew And Peter

Bethsaida was a fishing town on the north shore of the Sea of Galilee.

Philip, Andrew, and Peter all came from this same small town.

Jesus is gathering his first followers through existing friendships and neighbors.

Faith often spreads first through people who already know each other.

This is a small town's web of relationships, not a random crowd.

🏘️ Bethsaida was a fishing town in Galilee

👬 Philip, Andrew, and Peter shared this hometown

🕸️ Jesus gathered followers through existing friendships

📖 Faith often spreads through people who already know

## 📜 Of Whom Moses In The Law, And The Prophets, Did Write

Philip is not just impressed by a new teacher he happened to meet.

He is claiming Jesus is the one the entire Old Testament pointed toward.

"The law" refers to Moses's writings, the first five books of the Bible.

"The prophets" refers to the rest of the Old Testament's promises about a coming king.

Philip saw the whole Bible as one story leading to this exact man.

📜 The law means the books of Moses

📖 The prophets means the rest of scripture

🧭 Philip saw the whole Bible pointing to Jesus

➡️ One story leads to this exact man

## 🤨 Can There Any Good Thing Come Out Of Nazareth

Nazareth was a small, unimportant village with a poor reputation.

Nathanael's question is not really about theology at all.

It reflects a common regional prejudice against people from that particular town.

Nathanael assumed nothing significant could ever come from such an overlooked place.

God chose that overlooked place anyway.

🤨 Nazareth had a poor local reputation

🙄 Nathanael's question reflects regional prejudice

📍 He assumed nothing important could come from there

📖 God chose the overlooked place anyway

# John 1:47-51
# 🌳 Under The Fig Tree
---

## 😇 Behold An Israelite In Whom Is No Guile

"Guile" means deceit, trickery, or a hidden agenda.

Jesus is not calling Nathanael perfect or sinless.

He is saying Nathanael is honest, saying exactly what he actually thinks.

Nathanael just voiced doubt about Nazareth out loud instead of hiding it politely.

Jesus praises that honesty rather than taking offense at the doubt.

😇 Guile means deceit or a hidden agenda

🗣️ Nathanael spoke his doubt honestly out loud

🙌 Jesus praises honesty, not perfection

📖 Jesus was not offended by the doubt

## ❓ Whence Knowest Thou Me

Nathanael has never met Jesus before this exact moment.

His question is genuine shock, not politeness.

Jesus is about to reveal he already knew something private about Nathanael.

This question sets up the next verse's surprising answer.

Nathanael is about to learn Jesus sees more than any stranger should be able to.

❓ Nathanael has never met Jesus before

😲 His shock is genuine, not polite

👀 Jesus already knows something private about him

📖 The next verse reveals how

## 🌳 When Thou Wast Under The Fig Tree

Fig trees had wide, low branches that gave excellent shade.

Jewish teachers and students often sat under fig trees to study scripture or pray quietly.

Jesus is describing a private moment Nathanael thought no one else saw.

No other human being was present to tell Jesus about it.

Jesus's knowledge of that moment proves he saw it another way entirely.

🌳 Fig trees gave wide, cool shade

🙏 People often studied or prayed under them

🙈 No one else saw that private moment

📖 Jesus knew what no stranger could see

## 👑 Thou Art The Son Of God, Thou Art The King Of Israel

Nathanael just doubted Jesus one verse earlier.

Now he makes one of the boldest confessions in the entire chapter.

"Son of God" recognizes who Jesus is in relation to the Father.

"King of Israel" recognizes who Jesus is in relation to his people.

One private detail turned Nathanael's doubt into full confession in a single moment.

👑 Nathanael doubted Jesus one verse earlier

🙌 He now makes a bold confession

👨‍👦 Son of God ties him to the Father

📖 King of Israel ties him to his people

## 🙌 Thou Shalt See Greater Things Than These

Jesus does not stop at correcting Nathanael's surprise.

He promises Nathanael has seen only the beginning of what is coming.

"Greater things" points forward to the vision in the very next verse.

Nathanael's small private moment under a tree was just the start.

What comes next will show heaven and earth meeting in Jesus himself.

🙌 Jesus promises more is coming

🔮 Greater things points to the next verse

🌳 The fig tree moment was only the start

📖 Heaven and earth meet in what is next

## 🪜 The Angels Of God Ascending And Descending

This image comes directly from Jacob's dream in Genesis.

Jacob once saw a ladder connecting heaven and earth with angels moving on it.

Jesus is saying he himself is now that connection point.

Heaven and earth no longer need a ladder or a dream to meet.

Jesus is the meeting place between God and humanity.

🪜 This echoes Jacob's ladder in Genesis

💭 Jacob saw angels moving between heaven and earth

🌉 Jesus is now that connection point

📖 Jesus is where heaven and earth meet
`.trim();

export const JOHN_ONE_PERSONAL_SECTIONS = parseJohnOneRawNotes(JOHN_ONE_RAW_NOTES);
