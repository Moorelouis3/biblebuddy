export type ActsEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsEightRawNotes(rawText: string): ActsEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 8:${startVerse}` : `Acts 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Acts 8 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_EIGHT_RAW_NOTES = `# Acts 8:1-3
# 😠 Saul And The Scattering
---
## ⚖️ Saul Was Consenting Unto His Death

Consenting means Saul agreed with the decision to kill Stephen.

He did not throw a single stone himself in chapter seven.

Scripture still holds him fully responsible for approving it.

Approval without raising a hand is still real guilt.

😠 Consenting means Saul agreed
🙌 He did not throw a stone himself
⚖️ Approval alone still carries guilt
📖 Scripture holds him responsible anyway

---
## 🗺️ Scattered Abroad Throughout The Regions Of Judaea And Samaria, Except The Apostles

Judaea was the region around Jerusalem, the center of Jewish life.

Samaria lay just north of it, home to a people most Jews avoided.

Ordinary believers fled the city once the persecution turned violent.

The twelve apostles alone stayed behind in Jerusalem.

Staying took real courage, since they were the most visible leaders.

What looked like disaster was about to push the gospel somewhere Jews rarely went.

🗺️ Judaea centered on Jerusalem itself
🧭 Samaria lay north, often avoided
🧍 The apostles chose to stay behind
📖 Scattering spread the gospel further

---
## 🙏 Devout Men Carried Stephen To His Burial, And Made Great Lamentation Over Him

Devout means sincerely religious and faithful in practice.

These men risked being noticed burying an executed man during active persecution.

Lamentation means loud, open mourning, not quiet private grief.

Jewish custom called for burying the dead quickly, often the same day.

Stephen was the first believer killed for following Jesus.

Honoring his body openly was itself a quiet act of defiance.

🙏 Devout means sincerely religious
⚠️ Burying him was a real risk
😢 Lamentation means loud, open mourning
📖 Honoring him was quiet defiance

---
## 💥 Saul Made Havock Of The Church, Entering Into Every House, And Haling Men And Women Committed Them To Prison

Havock is an old word for violent, destructive ruin.

Haling is an old word meaning dragging someone away by force.

Saul searched private homes, not just public gathering places.

Women were arrested along with men, showing no one was considered safe.

The man wrecking the church here will soon help build it instead.

💥 Havock means violent, destructive ruin
⛓️ Haling means dragging away by force
👩 Women were arrested along with men
📖 The wrecker later becomes a builder

# Acts 8:4-8
# 🎉 Philip Preaches In Samaria
---
## 🌍 They That Were Scattered Abroad Went Every Where Preaching The Word

The same persecution that scattered believers also scattered the gospel message.

Every where means the believers kept preaching wherever they landed, not only in Jerusalem.

Preaching the word simply means telling people the message about Jesus.

Opposition did not shut the message down.

It pushed the message into new places faster than before.

🌍 Scattering spread the message further
🗣️ Preaching the word means telling people about Jesus
🚫 Opposition did not silence them
📖 Pressure pushed the gospel outward

---
## 🗺️ Philip Went Down To The City Of Samaria, And Preached Christ Unto Them

This Philip is one of the seven men chosen in chapter six to serve, not the apostle Philip.

Went down describes the geography, since Samaria sat lower than Jerusalem.

Preached Christ means he told the Samaritans directly that Jesus is the promised Messiah.

Jews and Samaritans had a long history of mutual hostility.

Philip crossed that line without hesitation.

👤 This Philip served tables in chapter six
🗺️ Went down describes real geography
✝️ Preached Christ means named Jesus as Messiah
📖 Philip crossed a hostile divide

---
## 👥 The People With One Accord Gave Heed Unto Those Things Which Philip Spake

One accord means the crowd responded together, as a unified group.

Gave heed means they paid close, serious attention to what Philip said.

Their attention was not polite curiosity alone.

It grew out of watching real miracles happen in front of them.

👥 One accord means unified response
👂 Gave heed means close attention
👀 Miracles backed up his words
📖 Attention grew from real evidence

---
## 👀 Hearing And Seeing The Miracles Which He Did

Miracles here served as visible proof that God's power was behind Philip's message.

Hearing and seeing both describe firsthand, direct experience, not rumor.

This matches the pattern already set by the apostles earlier in Acts.

Signs confirmed the message instead of replacing it.

👂 Hearing describes firsthand testimony
👀 Seeing describes firsthand witness
✅ Miracles confirmed Philip's message
📖 Signs supported the word, not replaced it

---
## 👻 Unclean Spirits, Crying With Loud Voice, Came Out Of Many That Were Possessed

Unclean spirits is a direct reference to demonic possession.

Crying with loud voice pictures a violent, audible reaction as the spirits left.

Possessed means controlled against the person's own will by one of these spirits.

Philip's authority over these spirits came through the name of Jesus, not from any power of his own.

👻 Unclean spirits means demonic possession
📢 Crying loud describes a violent exit
🔗 Possessed means controlled against their will
📖 Authority came through Jesus' name

---
## 🤲 Many Taken With Palsies, And That Were Lame, Were Healed

Palsies describes conditions causing uncontrollable shaking or paralysis.

Lame describes an inability to walk normally.

These were visible, undeniable physical conditions, not vague complaints.

Healing them in public made Philip's message impossible to quietly dismiss.

🤲 Palsies means shaking or paralysis
🚶 Lame means unable to walk
👀 These healings were publicly visible
📖 Visible healing backed the message loudly

---
## 🎉 There Was Great Joy In That City

Joy here describes the whole city's reaction, not just a few individuals.

A city recently excluded from full fellowship with Jews was now receiving the gospel directly.

This same joy keeps reappearing throughout Acts whenever the gospel breaks into new ground.

A city used to being looked down on was suddenly included.

🎉 Joy spread across the whole city
🙌 A once excluded city was included
🔁 This joy repeats through Acts
📖 Inclusion itself sparked the celebration

# Acts 8:9-13
# 🔮 Simon The Sorcerer
---
## 🔮 There Was A Certain Man, Called Simon, Which Beforetime In The Same City Used Sorcery

Sorcery means practicing magic, often through spells or occult ritual.

Beforetime means Simon had a reputation for this well before Philip ever arrived.

Samaria already had its own famous spiritual figure before the gospel showed up.

Philip's arrival was about to directly confront that existing power.

🔮 Sorcery means practicing magic
⏳ Beforetime means a long standing reputation
🏙️ Samaria already had its own figure
📖 Philip's arrival confronted that power

---
## 😵 And Bewitched The People Of Samaria, Giving Out That Himself Was Some Great One

Bewitched means Simon amazed and controlled people's attention through his tricks.

Giving out means Simon was the one spreading this claim about himself.

Some great one was a deliberately vague, grand title Simon claimed for himself.

Simon built his own following around his own reputation, not around truth.

😵 Bewitched means amazed and controlled
📢 Giving out means he spread the claim himself
👑 Great one was his own grand title
📖 His following was built on himself

---
## 👑 This Man Is The Great Power Of God

From the least to the greatest means every social class in the city believed this about Simon.

The great power of God was a title that belonged to God alone.

The Samaritans had handed that title to a mere magician.

A whole city can be sincerely wrong about where real power comes from.

👥 Every social class believed this
👑 This title belonged to God alone
🙇 They gave it to a magician instead
📖 A whole city can be sincerely wrong

---
## ⏳ To Him They Had Regard, Because That Of Long Time He Had Bewitched Them With Sorceries

Of long time emphasizes how many years Simon had held this grip on the city.

Regard here means genuine respect and deference, not mere entertainment.

Breaking a years long habit of belief takes more than one new idea arriving quietly.

Philip's miracles had real competition to overcome in this city.

⏳ Of long time means many years
🙇 Regard means genuine respect
🧱 Old belief is hard to break
📖 Philip faced real competition here

---
## 💧 When They Believed Philip Preaching The Things Concerning The Kingdom Of God, And The Name Of Jesus Christ, They Were Baptized, Both Men And Women

Kingdom of God refers to God's rule and reign, now breaking into the world through Jesus.

Name of Jesus Christ points to his identity and authority, not just his title.

Baptism here marked a public, outward response to real belief.

Both men and women being baptized shows the gospel reached across the whole city, not just one group.

👑 Kingdom of God means God's reign arriving
✝️ Name of Jesus points to his authority
💧 Baptism marked public belief
📖 The gospel reached the whole city

---
## 🔁 Then Simon Himself Believed Also, And When He Was Baptized, He Continued With Philip, And Wondered, Beholding The Miracles And Signs Which Were Done

Simon himself joining this group of new believers is a striking reversal.

Continued with Philip means Simon stayed close, following him around afterward.

Wondered means Simon was amazed, the same reaction he used to cause in other people.

The city's own magician was now the one being impressed instead of impressing.

🔁 Simon's own reversal is striking
🧍 He stayed close to Philip
😲 Wondered means he was amazed
📖 The impressor became the impressed

# Acts 8:14-17
# 🕊️ The Holy Ghost Comes To Samaria
---
## 📰 Now When The Apostles Which Were At Jerusalem Heard That Samaria Had Received The Word Of God, They Sent Unto Them Peter And John

News of Samaria's conversion traveled all the way back to the apostles in Jerusalem.

Sending Peter and John showed the Jerusalem church took this new group seriously.

Jews historically avoided close involvement with Samaritans.

This decision to send two leading apostles crossed that old boundary on purpose.

📰 News reached the apostles in Jerusalem
🧍 Peter and John were sent personally
🚫 Jews usually avoided close contact
📖 This decision crossed an old boundary

---
## 🙏 Who, When They Were Come Down, Prayed For Them, That They Might Receive The Holy Ghost

Prayed for them means Peter and John specifically asked God to send the Holy Ghost upon these new believers.

This was not automatic, it required a deliberate request.

Peter and John acted as a bridge connecting this new group to the wider apostolic church.

🙏 They prayed specifically for the Holy Ghost
🔗 Peter and John acted as a bridge
🤝 Connection to the wider church mattered
📖 Nothing here happened automatically

---
## ✅ For As Yet He Was Fallen Upon None Of Them, Only They Were Baptized In The Name Of The Lord Jesus

This parenthetical note explains something readers might otherwise assume already happened.

Baptism and receiving the Holy Ghost are shown here as two separate events, not one automatic package.

Only they were baptized means their belief and baptism were already genuine before this moment.

Receiving the Holy Ghost was still an additional, distinct step.

✅ Baptism had already genuinely happened
🕊️ The Holy Ghost had not yet come
🔀 These were two separate steps here
📖 Genuine belief preceded this final step

---
## ✋ Then Laid They Their Hands On Them, And They Received The Holy Ghost

Laying on of hands was a physical gesture symbolizing blessing and the passing of spiritual authority.

This same gesture appears throughout both the Old and New Testaments.

The Holy Ghost coming through apostolic hands visibly tied Samaria's new believers to the rest of the church.

Samaria was not receiving some separate, lesser version of the faith.

✋ Laying on hands symbolized blessing
📜 This gesture runs through both Testaments
🔗 It tied Samaria to the wider church
📖 Samaria received the same full faith

# Acts 8:18-24
# 💰 Simon Tries To Buy Power
---
## 👀 When Simon Saw That Through Laying On Of The Apostles' Hands The Holy Ghost Was Given, He Offered Them Money

Simon watched something happen that his own sorcery could never produce.

Offering money reveals Simon still thought like a magician.

He was trying to buy spiritual power as if it were a trick or a commodity.

He completely misunderstood what he had just witnessed.

The gift of God is never something that can be purchased.

👀 Simon watched a power beyond sorcery
💰 He tried to purchase it instead
🔮 He still thought like a magician
📖 God's gift cannot be bought

---
## 🙋 Give Me Also This Power, That On Whomsoever I Lay Hands, He May Receive The Holy Ghost

Simon wanted the ability itself, not a relationship with God behind it.

This request treats the Holy Ghost as a tool for Simon's own use and status.

His old business model was control and spectacle, and he tried to apply it here too.

🙋 Simon wanted the ability itself
🎭 He wanted it for his own use
💼 His old business model was control
📖 He missed the relationship entirely

---
## ⚡ Thy Money Perish With Thee, Because Thou Hast Thought That The Gift Of God May Be Purchased With Money

Peter's response is sharp and direct, not gentle correction.

Perish with thee is a severe warning, not a casual dismissal.

The gift of God names the Holy Ghost as something freely given, never sold.

Peter names Simon's exact error immediately, without softening it.

⚡ Peter's rebuke is sharp and direct
⚠️ Perish with thee is a severe warning
🎁 God's gift is freely given, never sold
📖 Peter names the error immediately

---
## 🚫 Thou Hast Neither Part Nor Lot In This Matter, For Thy Heart Is Not Right In The Sight Of God

Part nor lot means Simon currently has no real share or stake in what just happened to the Samaritans.

This matter refers specifically to the Holy Ghost being given through the apostles.

Heart is not right points to Simon's actual motive, not just his wrong action.

Peter diagnoses the deeper problem underneath the surface request.

🚫 Part nor lot means no real stake
🕊️ This matter means the Holy Ghost's gift
❤️ Heart is not right names the real issue
📖 Peter diagnoses motive, not just action

---
## 🔄 Repent Therefore Of This Thy Wickedness, And Pray God, If Perhaps The Thought Of Thine Heart May Be Forgiven Thee

Repent means turning away from this wrong direction completely, not just feeling bad about it.

Wickedness names Simon's desire itself as morally wrong, not merely a mistake.

If perhaps leaves real uncertainty about Simon's heart, since repentance has to be genuine.

Peter offers forgiveness as possible, never automatic.

🔄 Repent means a full turn away
⚠️ Wickedness names a real moral wrong
❓ If perhaps leaves real uncertainty
📖 Forgiveness is possible, not automatic

---
## ☠️ For I Perceive That Thou Art In The Gall Of Bitterness, And In The Bond Of Iniquity

Gall of bitterness pictures something poisonous and sharp sitting at the root of Simon's attitude.

Bond of iniquity pictures Simon tied up and trapped by his own sin, not freely acting.

Perceive means Peter sees through Simon's words to the actual condition underneath.

This description names slavery to sin, not just one bad decision.

☠️ Gall of bitterness pictures poison inside
⛓️ Bond of iniquity pictures being trapped
👀 Perceive means seeing beneath the surface
📖 This names slavery, not one mistake

---
## 🙏 Then Answered Simon, And Said, Pray Ye To The Lord For Me, That None Of These Things Which Ye Have Spoken Come Upon Me

Simon asks Peter and John to pray on his behalf instead of praying himself.

This is noticeably different from the kind of personal repentance Peter just called for.

Simon seems more afraid of the consequences than sorry for the sin itself.

Scripture never records what finally happened to Simon after this moment.

🙏 Simon asks others to pray for him
🔀 This differs from real personal repentance
😨 Fear looks different from sorrow
📖 Scripture leaves his ending untold

# Acts 8:25-28
# 🐎 Philip Is Sent To The Desert Road
---
## ✅ They, When They Had Testified And Preached The Word Of The Lord, Returned To Jerusalem, And Preached The Gospel In Many Villages Of The Samaritans

Testified means Peter and John personally confirmed what they had witnessed in Samaria.

Returned to Jerusalem closes out this part of the story before Philip's next assignment begins.

Many villages of the Samaritans shows the gospel kept spreading well past the one city already named.

What began with one preacher in one city was already becoming a movement across a whole region.

✅ Testified means personally confirming it
🏙️ They returned to Jerusalem afterward
🏘️ Many villages received the gospel too
📖 One city became a wider movement

---
## 🏜️ The Angel Of The Lord Spake Unto Philip, Saying, Arise, And Go Toward The South Unto The Way That Goeth Down From Jerusalem Unto Gaza, Which Is Desert

Gaza was a city southwest of Jerusalem, near the coast.

This particular route ran through open, empty wilderness, not through busy towns.

God pulled Philip away from a thriving, successful ministry in Samaria toward one lonely road.

A clear calling does not always move from success to more success in a straight line.

🗺️ Gaza lay southwest, near the coast
🏜️ This route ran through empty wilderness
🔀 Philip left success for a lonely road
📖 Calling does not always climb upward

---
## 👑 Behold, A Man Of Ethiopia, An Eunuch Of Great Authority Under Candace Queen Of The Ethiopians, Who Had The Charge Of All Her Treasure

Ethiopia here refers to the ancient kingdom of Cush, south of Egypt, not the modern country by that name.

A eunuch was a castrated man, often trusted with royal service.

That trust grew from the fact that he posed no threat to a royal line.

Candace was not a personal name, it was a title used for the queen mother of that kingdom.

Charge of all her treasure means this man held one of the most powerful financial positions in the entire nation.

🗺️ Ethiopia meant the ancient kingdom of Cush
👤 A eunuch was a trusted royal official
👑 Candace was a royal title, not a name
📖 He held major financial power there

---
## 📜 Was Returning, And Sitting In His Chariot Read Esaias The Prophet

This man had traveled an enormous distance just to worship in Jerusalem.

Esaias is the Greek spelling of the prophet Isaiah's name.

Reading Isaiah while traveling shows real spiritual hunger, not idle curiosity.

A powerful foreign official was searching scripture on his own, long before anyone explained it to him.

🐎 He traveled far just to worship
📜 Esaias is Isaiah's Greek name
🔍 His hunger was already genuine
📖 He read scripture on his own

# Acts 8:29-35
# 📖 Philip Explains Isaiah
---
## 🕊️ Then The Spirit Said Unto Philip, Go Near, And Join Thyself To This Chariot

The Spirit here gave Philip a specific, immediate instruction, not a vague feeling.

Join thyself means approach closely enough to start an actual conversation.

Philip had no advance information about who was riding in this chariot.

Obedience came before any explanation of why it mattered.

🕊️ The Spirit gave a specific instruction
🚶 Join thyself means approach closely
❓ Philip knew nothing about this man yet
📖 Obedience came before explanation

---
## 🏃 And Philip Ran Thither To Him, And Heard Him Read The Prophet Esaias, And Said, Understandest Thou What Thou Readest

Ran thither shows Philip's urgency in responding to the Spirit's instruction.

Understandest thou what thou readest is a direct, respectful question, not an interruption meant to show off.

Philip opened the conversation by asking rather than lecturing.

🏃 Ran thither shows real urgency
❓ Philip opened with a respectful question
👂 He asked instead of lecturing
📖 Genuine curiosity starts real conversation

---
## 🙋 How Can I, Except Some Man Should Guide Me, And He Desired Philip That He Would Come Up And Sit With Him

The eunuch openly admits he does not understand what he is reading.

Except some man should guide me shows real humility from a powerful official.

Desired Philip to sit with him means he invited Philip into his own personal space to teach him.

A position of enormous worldly authority did not stop him from asking for help.

🙋 He openly admits he does not understand
🙇 This shows real humility from power
🤝 He invited Philip into his own space
📖 Authority did not block his humility

---
## 🐑 He Was Led As A Sheep To The Slaughter, And Like A Lamb Dumb Before His Shearer, So Opened He Not His Mouth

This passage comes from Isaiah fifty three, written centuries before Jesus was born.

Led as a sheep to the slaughter pictures someone going to death without resisting.

Dumb before his shearer means silent, offering no self defense at all.

This exact picture matches Jesus' own silence during his trial and crucifixion.

📜 This comes from Isaiah fifty three
🐑 Led as a sheep pictures a silent death
🤐 Dumb before his shearer means no self defense
📖 This matches Jesus' own silence exactly

---
## 😔 In His Humiliation His Judgment Was Taken Away, And Who Shall Declare His Generation, For His Life Is Taken From The Earth

Humiliation means being treated unjustly and shamefully, below what was deserved.

Judgment was taken away means he was denied a fair trial.

Who shall declare his generation is a question about his lack of descendants or a continuing earthly line.

Life is taken from the earth points plainly to an early, violent death.

😔 Humiliation means unjust, shameful treatment
⚖️ Judgment taken away means no fair trial
❓ His generation points to no earthly line
📖 His life ended early and violently

---
## ❓ I Pray Thee, Of Whom Speaketh The Prophet This, Of Himself, Or Of Some Other Man

This was a genuinely debated question among Jewish readers of this passage at the time.

The eunuch asks sincerely, not as a trick or a test.

His honest question opens the exact door Philip needs to explain the gospel.

A real question asked honestly is often the best possible starting point for teaching.

❓ This question was genuinely debated then
🙏 The eunuch asks sincerely, not as a trap
🚪 His question opens the door for Philip
📖 Honest questions make the best starting point

---
## 🗣️ Then Philip Opened His Mouth, And Began At The Same Scripture, And Preached Unto Him Jesus

Opened his mouth signals Philip finally giving his full, direct answer.

Began at the same scripture means Philip started from the exact passage already in front of them.

He did not jump to a different topic.

Preached unto him Jesus means Philip showed how Isaiah's suffering servant was fulfilled in Jesus himself.

Philip met the eunuch exactly where his own question already was.

🗣️ Opened his mouth means a full answer
📜 He started from that same passage
✝️ He showed Jesus as the suffering servant
📖 He met the eunuch at his question

# Acts 8:36-40
# 💧 The Eunuch Is Baptized
---
## ❓ See, Here Is Water, What Doth Hinder Me To Be Baptized

Hinder means stop or prevent, and the eunuch genuinely could not think of a reason to wait.

The eunuch had already grasped enough of the gospel to want an immediate response.

His question is direct and eager, not hesitant.

His question moved straight from understanding to action.

❓ Hinder means stop or prevent
⚡ His question shows real eagerness
🏃 He moved straight from belief to action
📖 Understanding led directly to response

---
## ❤️ If Thou Believest With All Thine Heart, Thou Mayest, And He Answered And Said, I Believe That Jesus Christ Is The Son Of God

Many ancient manuscripts leave this exact verse out, though it stands in the King James Bible.

With all thine heart means total, sincere belief, not partial agreement.

I believe that Jesus Christ is the Son of God is a clear personal confession of faith.

It is the clearest one recorded so far in the book of Acts.

Baptism here follows real belief, it does not replace it.

📜 Some manuscripts leave this verse out
❤️ With all thine heart means total belief
✝️ He confesses Jesus as the Son of God
📖 Baptism follows belief, it does not replace it

---
## 💧 He Commanded The Chariot To Stand Still, And They Went Down Both Into The Water, Both Philip And The Eunuch, And He Baptized Him

This baptism happened right away, in the middle of a desert road, with no delay.

Went down both into the water suggests full immersion, not a symbolic sprinkle.

Neither man needed a building, a crowd, or any special occasion for this to happen.

The gospel's reach did not depend on the right location or the right timing.

⚡ The baptism happened right away
💧 Both men went fully into the water
🏜️ No building or crowd was needed
📖 The gospel does not wait for ideal conditions

---
## 💨 And When They Were Come Up Out Of The Water, The Spirit Of The Lord Caught Away Philip, That The Eunuch Saw Him No More, And He Went On His Way Rejoicing

Caught away describes a sudden, miraculous removal, not Philip simply walking off.

The eunuch never saw Philip again after this moment.

Rejoicing shows the eunuch's faith was already secure and did not depend on Philip staying with him.

A brief encounter was enough, because the point was always Jesus, not Philip himself.

💨 Caught away means a sudden removal
👋 They never met again after this
🎉 Rejoicing shows his faith was secure
📖 The point was always Jesus, not Philip

---
## 🗺️ But Philip Was Found At Azotus, And Passing Through He Preached In All The Cities, Till He Came To Caesarea

Azotus, also called Ashdod, was a coastal city northwest of where Philip had just been.

Found at Azotus suggests Philip's sudden relocation surprised even himself.

Caesarea was a major Roman port city, far north along the coast.

Philip's one obedient detour onto a desert road turned into an entire preaching tour up the coastline.

🗺️ Azotus was a coastal city northwest
😲 His relocation surprised even himself
🏙️ Caesarea was a major Roman port
📖 One detour became a whole tour
`.trim();

export const ACTS_EIGHT_PERSONAL_SECTIONS = parseActsEightRawNotes(ACTS_EIGHT_RAW_NOTES);
