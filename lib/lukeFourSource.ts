export type LukeFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeFourRawNotes(rawText: string): LukeFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 4:${startVerse}` : `Luke 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Luke 4 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_FOUR_RAW_NOTES = `# Luke 4:1-2
# 🏜️ Jesus Faces The Wilderness
---
## 🕊️ Full Of The Holy Ghost

This phrase marks a turning point for Jesus right after His baptism.

The Holy Ghost had just visibly come down on Him in chapter three.

Luke wants the reader to know that same Spirit was now completely filling Him.

Every step into the wilderness happens under that same filling.

🕊️ The Spirit had just descended at His baptism
🔥 Full means completely filled, not partly
🚶 The Spirit leads what happens next
📖 Every temptation unfolds under God's own Spirit

## 🧭 Led By The Spirit Into The Wilderness

This temptation was not an accident or a trap set by evil alone.

The Spirit Himself led Jesus into the wilderness on purpose.

The wilderness here was the desolate, rocky desert near the Jordan valley.

God was not absent from this test.

He was the one directing it.

🧭 The Spirit led Him there on purpose
🏜️ The wilderness was a desolate desert region
👁️ God directed every part of this test
➡️ Testing can come under God's own hand

## 🔢 Forty Days Tempted Of The Devil

Forty is a number that shows up again and again in scripture.

Israel wandered the wilderness for forty years.

Moses fasted forty days on the mountain before receiving the law.

Jesus now faces His own forty days of testing before His ministry begins.

The number ties His story back to Israel's whole history.

🔢 Forty often marks a season of testing
🏃 Israel wandered the wilderness forty years
⛰️ Moses fasted forty days on the mountain
📖 Jesus relives Israel's story and succeeds

## 🍞 He Did Eat Nothing

Jesus chose to go without food for the entire forty days.

This was not simply hunger from a long journey.

It was a deliberate fast meant to focus completely on God.

Going without food was a common way to seek God with full attention in this culture.

🍞 Jesus ate nothing for forty days
🎯 This was a deliberate fast, not misfortune
🙏 Fasting focused His attention on God
📖 He entered the test already weakened

## 😫 He Afterward Hungered

This small detail matters more than it seems.

Jesus felt the same physical hunger any person would feel after forty days without food.

He was not protected from real human weakness during this test.

The temptation that follows targets that exact physical weakness on purpose.

😫 Jesus felt genuine human hunger
🧍 He was not shielded from real weakness
🎯 The devil targets that exact weakness
➡️ Real humanity makes the test fully real

# Luke 4:3-4
# 🍞 Bread From Stone
---
## ❓ If Thou Be The Son Of God

The devil is not genuinely asking a question here.

He already knows exactly who Jesus is.

This phrase works more like a challenge, daring Jesus to prove His identity on command.

Real faith never needs to perform on demand to prove itself.

❓ The devil already knows who Jesus is
🎭 This phrase works as a dare
🚫 Proving identity on command was the trap
📖 Faith does not perform to prove itself

## 🪨 Command This Stone That It Be Made Bread

The wilderness around Jesus was covered in small, round stones.

Those stones looked almost exactly like the flat loaves of bread baked in that culture.

The devil is pointing at something nearby that would look like an easy, harmless miracle.

Using His power for Himself, on the devil's terms, was the actual temptation.

🪨 Desert stones resembled flat loaves of bread
👀 The devil points at an easy illusion
⚡ Power on the devil's terms was the trap
📖 Real power still answers only to God

## 📜 It Is Written

Jesus answers the devil by quoting scripture directly.

This exact phrase appears three times across this one temptation.

Jesus never argues from His own opinion or feeling.

He answers every attack with God's own written word.

📜 It is written means a direct scripture quote
🔁 Jesus uses this phrase three times here
🚫 He never argues from His own opinion
📖 Scripture was His only weapon in this fight

## 🍞 Man Shall Not Live By Bread Alone

This line is quoted from Deuteronomy chapter eight.

Moses first said it to Israel after their own forty years in the wilderness.

Bread keeps the body alive, but it cannot be the only thing a person depends on.

Jesus refuses to let physical hunger make the decision for Him.

📜 Quoted from Deuteronomy chapter eight
🍞 Bread alone cannot sustain a whole life
🔁 Jesus relives Israel's wilderness lesson
📖 Obedience outweighs physical hunger

## 🗣️ By Every Word Of God

The rest of that same verse in Deuteronomy explains what man truly lives by.

It is every word that comes from God's own mouth.

Jesus trusts that word even while His body is genuinely starving.

Obedience to God mattered more to Him than His own comfort.

🗣️ Life depends on God's spoken word
💪 Jesus trusts that word while starving
🙏 Obedience outweighed His own comfort
📖 God's word sustains more than food

# Luke 4:5-8
# 👑 All The Kingdoms Of The World
---
## ⛰️ Taking Him Up Into An High Mountain

No mountain on earth allows a person to see every kingdom in the world at once.

Many scholars believe this was a vision given to Jesus rather than an actual view.

Either way, the devil is offering a shortcut to something Jesus will eventually receive anyway.

The question was never whether Jesus would reign.

The question was how He would get there.

⛰️ No mountain shows every kingdom at once
👁️ Many scholars believe this was a vision
🎁 The devil offers a shortcut to power
📖 How Jesus would reign was the real test

## 👀 Shewed Unto Him All The Kingdoms Of The World In A Moment Of Time

Shewed simply means showed, an old spelling of the same word.

In a moment of time means this vision happened instantly, not gradually.

The devil wants Jesus to see the full prize all at once.

A fast, overwhelming offer is often designed to rush a decision.

👀 Shewed is an old spelling of showed
⏱️ The vision came in a single instant
🎯 Seeing it all at once increases pressure
➡️ Fast offers often rush bad decisions

## 👑 That Is Delivered Unto Me

The devil claims he controls the authority over every kingdom on earth.

That claim is not simply a lie invented on the spot.

Scripture elsewhere calls him the ruler of this present world because of humanity's sin.

His offer still cannot be trusted just because it has some truth in it.

👑 The devil claims worldly authority
📜 Scripture does call him this world's ruler
⚠️ A half true claim still deceives
➡️ An offer can be true and dangerous

## 💰 If Thou Therefore Wilt Worship Me

The devil finally names his real price.

Everything offered before this moment was only the setup.

He does not want Jesus to simply take power.

He wants Jesus to bow down and worship him for it.

That price reveals what every temptation was actually about from the very beginning.

💰 The devil finally names his real price
🙇 He demands worship, not just obedience
🎯 Worship was the goal all along
📖 Every temptation led back to this one demand

## 😈 Get Thee Behind Me, Satan

Jesus names the devil directly here for the first time in this scene.

Satan means adversary or accuser in the original language.

Get thee behind me is a command, not a polite request.

Jesus refuses the offer instantly, without a moment of hesitation or negotiation.

😈 Satan means adversary or accuser
🗣️ Jesus names him directly here
🛑 This is a command, not a request
➡️ He refuses instantly, with no negotiation

## 🙏 Him Only Shalt Thou Serve

Jesus answers with another direct quote from Deuteronomy chapter six.

Worship and service belong to God alone, with no exceptions.

Only means exactly that, not God plus something else added beside Him.

This answer ends the second temptation completely.

📜 Quoted again from Deuteronomy chapter six
🙏 Worship belongs to God alone
🚫 Only leaves no room for anything else
📖 Scripture ends this temptation completely

# Luke 4:9-13
# 🏛️ A Pinnacle Of The Temple
---
## 🏛️ Set Him On A Pinnacle Of The Temple

A pinnacle means the highest point of the temple's outer structure.

This spot likely overlooked a steep drop into the Kidron valley below.

The devil chose the most public, dramatic location in all of Jerusalem.

A miracle here would have been seen by crowds of witnesses.

🏛️ Pinnacle means the temple's highest point
⛰️ It overlooked a steep drop below
👀 This was the most public spot in Jerusalem
➡️ A miracle here would draw a crowd

## 🎪 Cast Thyself Down From Hence

The devil now dares Jesus to perform a public, dramatic miracle.

This temptation looks different from turning stone into bread.

It is no longer about meeting a private need.

It is about proving His identity through spectacle instead of trust.

🎪 This temptation is about public spectacle
🔄 It differs from the first temptation
🎯 It targets pride instead of hunger
➡️ Proof by spectacle replaces simple trust

## 📜 He Shall Give His Angels Charge Over Thee, To Keep Thee

The devil quotes Psalm ninety one here, almost word for word.

He is using real scripture to tempt Jesus, not an obvious lie.

This promise was never written as permission to test God on purpose.

Scripture misused still sounds convincing if a person does not know it well.

📜 Quoted from Psalm ninety one
😈 Even scripture gets twisted here
🚫 The promise never permits testing God
➡️ Misused scripture can still sound convincing

## 🪨 Lest At Any Time Thou Dash Thy Foot Against A Stone

This part of the psalm originally pictured God protecting someone from an ordinary accident.

A stumble on a rocky path, not a leap from a high building.

The devil stretches the promise far beyond what it was ever meant to cover.

Context changes what a promise actually means.

🪨 The psalm pictured an ordinary stumble
🏛️ Not a leap from a high ledge
📏 The devil stretches the promise too far
📖 Context decides what a promise covers

## 🙏 Thou Shalt Not Tempt The Lord Thy God

Jesus answers again with scripture, this time from Deuteronomy chapter six.

To tempt God here means testing Him to prove Himself on command.

Trusting God is not the same as forcing Him to perform.

Real faith waits on God rather than demanding proof from Him.

📜 Quoted a third time from Deuteronomy
🎭 Tempting God means forcing Him to perform
🙏 Trust is not the same as testing
➡️ Faith waits instead of demanding proof

## ⏳ He Departed From Him For A Season

This does not mean the devil gave up on Jesus completely.

For a season means only a limited, temporary time.

The devil returns later in the Gospels, including at the cross.

This round of temptation ended, but the larger conflict did not.

⏳ For a season means a limited time
🔁 The devil later returns in the Gospels
⚔️ This round ended, not the whole fight
📖 Victory here did not end the conflict

# Luke 4:14-15
# 🔥 Fame Spreads Through Galilee
---
## 🕊️ Returned In The Power Of The Spirit Into Galilee

Jesus enters His public ministry only after passing through real testing.

The same Spirit that led Him into the wilderness now leads Him out.

Victory over temptation did not drain His strength.

It confirmed the power He now carries into Galilee.

🕊️ The same Spirit leads Him out again
💪 Testing did not drain His strength
✅ It confirmed His power instead
📖 Victory prepared Him for public ministry

## 📢 There Went Out A Fame Of Him

Fame here simply means word of Jesus began spreading on its own.

No one organized a campaign to announce Him.

People simply could not stop talking about what they had seen and heard.

That kind of attention sets up the reaction still to come in His hometown.

📢 Fame means word spreading on its own
🗣️ No one organized this attention
👂 People could not stop talking about Him
➡️ This attention sets up what happens next

## 🏠 He Taught In Their Synagogues, Being Glorified Of All

A synagogue was the local gathering place for teaching and prayer in every Jewish town.

Jesus was welcomed warmly in these early days of His ministry.

Glorified here means people spoke highly of Him and praised what He taught.

That warm welcome will look very different by the end of this same chapter.

🏠 A synagogue was the local teaching center
🙌 Jesus is welcomed warmly at first
🗣️ Glorified means people praised His teaching
📖 That welcome will soon change sharply

# Luke 4:16-21
# 📜 The Scroll Of Isaiah
---
## 🏡 He Came To Nazareth, Where He Had Been Brought Up

Nazareth was the small town where Jesus grew up with Mary and Joseph.

Everyone in this synagogue likely watched Him grow from a child into a man.

That familiarity will matter a great deal in the verses ahead.

Jesus is not a stranger walking into this room.

🏡 Nazareth was His childhood hometown
👶 These people watched Him grow up
👁️ Familiarity shapes what happens next
➡️ He enters as no stranger here

## 📅 As His Custom Was

Jesus regularly attended the synagogue every single sabbath.

This was not a one time visit for a special occasion.

Faithful attendance was simply part of His normal, ordinary life.

Even the Son of God kept this steady, weekly habit.

📅 Jesus attended synagogue every sabbath
🔁 This was His regular, weekly habit
🙏 Faithfulness showed up in ordinary routine
📖 Even Jesus kept this steady practice

## 📖 Stood Up For To Read

Standing up to read scripture was a specific role given to a visiting or respected guest.

The synagogue leader chose to invite Jesus to take that role publicly.

This was not Jesus forcing His way into the spotlight.

He was invited, and He accepted.

📖 Standing to read was a guest's role
🙋 The synagogue leader invited Him
🚫 He did not force His way in
➡️ He accepted the invitation given to Him

## 📜 The Book Of The Prophet Esaias

Esaias is the Greek form of the name Isaiah.

Isaiah had written this scroll about seven hundred years before this moment.

Jesus either chose this passage Himself or it was simply the scheduled reading for that week.

Either way, the words about to be read point directly at Him.

📜 Esaias is the Greek form of Isaiah
⏳ Isaiah wrote this centuries earlier
🎯 These exact words now point at Jesus
📖 Old prophecy meets its fulfillment here

## 🕊️ The Spirit Of The Lord Is Upon Me

This line describes the same anointing the Spirit gave Jesus at His baptism.

Anointed means specially chosen and empowered for a particular mission.

Isaiah originally wrote this about a coming servant of God.

Jesus reads it as His own personal mission statement out loud.

🕊️ The same Spirit from His baptism
👑 Anointed means chosen and empowered
📜 Isaiah wrote this about God's servant
📖 Jesus claims it as His own mission

## 📰 To Preach The Gospel To The Poor

Gospel simply means good news.

Poor here includes the economically poor, but also reaches further than that.

It includes anyone who feels powerless, overlooked, or without real hope.

Jesus names them first in His mission statement, not last.

📰 Gospel means good news
💰 Poor includes the economically poor
💔 It also means anyone without hope
➡️ The overlooked come first in His mission

## 💔 To Heal The Brokenhearted

Brokenhearted describes grief, loss, and deep emotional pain.

This mission was never only about physical disease.

Jesus names emotional wounds as something He came specifically to heal.

Grief was never invisible to Him.

💔 Brokenhearted means deep grief and pain
🩹 His mission reaches beyond physical disease
👁️ Grief was never invisible to Him
📖 Emotional wounds matter to God too

## ⛓️ Deliverance To The Captives, And Recovering Of Sight To The Blind

Captives originally meant prisoners and people held against their will.

Jesus also uses it here for anyone trapped by sin or fear.

Recovering of sight includes both physical blindness and spiritual blindness.

His mission touches bodies and hearts at the exact same time.

⛓️ Captives means people held against their will
👁️ Sight includes physical and spiritual blindness
🩺 His mission reaches body and heart together
📖 No kind of bondage is outside His reach

## 💔 Set At Liberty Them That Are Bruised

Bruised here pictures people crushed down by hardship or oppression.

Liberty means setting them free from whatever is crushing them.

This exact phrase does not appear in Isaiah sixty one alone.

Jesus may be drawing it from Isaiah fifty eight as well.

That would widen His mission statement even further.

💔 Bruised means crushed by hardship
🕊️ Liberty means being set fully free
📜 May also echo Isaiah fifty eight
📖 His mission widens with every phrase

## 📅 The Acceptable Year Of The Lord

This phrase likely points back to the Year of Jubilee described in Leviticus twenty five.

Every fifty years, debts were cancelled and slaves were set free in Israel.

Jesus announces that same kind of complete release, but on a far greater scale.

This is not a new idea.

It is an old promise finally arriving.

📅 Likely points to the Year of Jubilee
💸 Jubilee cancelled debts every fifty years
🕊️ Jesus announces release on a far greater scale
📖 An old promise finally arrives

## 📜 Closed The Book, And He Gave It Again To The Minister, And Sat Down

Closing the scroll carefully showed respect for the sacred text.

The minister here was simply the synagogue attendant who stored the scrolls.

Sitting down was actually the normal posture for teaching in that culture, not a casual gesture.

Everything about this moment, from the standing to the sitting, followed careful custom.

📜 Closing the scroll showed respect
👤 The minister stored the synagogue's scrolls
🪑 Sitting down was the normal teaching posture
📖 Every gesture followed careful custom

## 👀 The Eyes Of All Them That Were In The Synagogue Were Fastened On Him

Every single person in that room stared at Jesus in total silence.

No one in the room yet knew what He was about to say.

That kind of total attention rarely happens by accident.

Something about this moment already felt different to everyone present.

👀 Every eye in the room fixed on Him
🤫 The room sat in total silence
⏳ No one yet knew what He would say
➡️ Something already felt different to everyone there

## 🎯 This Day Is This Scripture Fulfilled In Your Ears

Jesus does not simply explain the passage He just read.

He claims it is about Him, happening right now, in that very room.

This day means today, not someday in the distant future.

Fulfilled in your ears means they were hearing the prophecy come true as He spoke.

🎯 Jesus claims the prophecy is about Himself
📅 This day means today, not someday later
👂 They heard prophecy come true as He spoke
📖 The wait for this moment just ended

# Luke 4:22-24
# 🤔 Is Not This Joseph's Son
---
## 🗣️ All Bare Him Witness

This phrase means everyone in the room agreed on what they had just heard.

For a brief moment, the whole crowd reacted the exact same way.

That agreement will not last very long in this same chapter.

Their first reaction and their final reaction will look nothing alike.

🗣️ Everyone agreed on what they heard
⏳ This unity was brief, not lasting
🔁 Their reaction will shift later
➡️ First impressions do not always hold

## 👏 The Gracious Words Which Proceeded Out Of His Mouth

Gracious here means the words were pleasant, winsome, and well spoken.

The crowd was genuinely impressed by how Jesus spoke.

Being impressed by someone's words is not the same as truly believing them.

Admiration can exist right alongside unbelief in the very same room.

🗣️ Gracious means pleasant and well spoken
👏 The crowd was genuinely impressed
🤔 Admiration is not the same as belief
📖 Both can exist in the same room

## 🤔 Is Not This Joseph's Son

This question sounds harmless on the surface.

Underneath it carries real doubt about how someone so familiar could say something so significant.

They had watched Jesus grow up as an ordinary boy in an ordinary family.

Familiarity was starting to work against Him instead of for Him.

❓ The question sounds harmless at first
👶 They watched Him grow up ordinarily
🤨 Familiarity breeds quiet doubt here
➡️ Knowing someone well can blind people too

## ⚕️ Physician, Heal Thyself

This was a common proverb in that culture.

It challenged someone making big claims to first prove it on themselves.

The crowd is daring Jesus to perform a miracle for His own hometown crowd.

They want proof delivered on their terms, not His.

📖 A common proverb of that culture
⚕️ It challenges a claim with a dare
🎭 They demand proof on their own terms
➡️ Jesus will not perform on command

## 🏘️ Whatsoever We Have Heard Done In Capernaum

Capernaum was a nearby town where Jesus had already worked miracles.

Luke actually describes those exact miracles later in this very chapter.

News of them had clearly already reached Nazareth ahead of time.

The hometown crowd wants that same treatment for themselves.

🏘️ Capernaum was a nearby town
📰 Word of His miracles had already spread
🎯 The crowd wants equal treatment
➡️ They expected a show, not a sermon

## 📖 No Prophet Is Accepted In His Own Country

Jesus names a pattern that shows up again and again in scripture.

People closest to a prophet often struggle the most to truly see him.

Pride and familiarity can blind a hometown crowd faster than strangers.

This saying sets up the sharp examples Jesus gives next.

📖 A repeated pattern across scripture
👁️ Closeness can blind people to truth
🏡 Hometown crowds often struggle the most
➡️ This sets up the examples ahead

# Luke 4:25-30
# 🔥 Elias And Eliseus
---
## 📜 Many Widows Were In Israel In The Days Of Elias

Elias is the Greek form of the name Elijah.

Elijah ministered during a severe famine described in First Kings chapter seventeen.

Plenty of Israelite widows were suffering in the land at that exact time.

Jesus is about to make an uncomfortable point using this very detail.

📜 Elias is the Greek form of Elijah
🍂 Elijah's famine is told in First Kings
👥 Many Israelite widows were suffering then
➡️ Jesus is building toward a hard point

## ☁️ The Heaven Was Shut Up Three Years And Six Months

This phrase means no rain fell on the land during that entire time.

A drought this long meant widespread, severe famine for everyone.

James, later in the New Testament, names this exact same length of time.

This detail connects two different books of scripture together.

☁️ Heaven shut up means no rain fell
🌾 A long drought caused severe famine
📖 James later names this same length
➡️ Two books of scripture line up here

## 🗺️ Save Unto Sarepta, A City Of Sidon

Elijah was sent to help only one widow during that whole famine.

She was not even from Israel.

Sarepta sat in Sidon, a Gentile region outside Israel's own borders.

God chose to bless an outsider while His own suffering people were passed over.

🗺️ Sarepta sat in Sidon, outside Israel
🙅 Only one widow was helped
🌍 God helped a Gentile outsider instead
📖 Blessing went beyond Israel's own borders

## 📜 Many Lepers Were In Israel In The Time Of Eliseus

Eliseus is the Greek form of the name Elisha.

Leprosy was a severe skin disease that made a person ritually unclean.

Many Israelites suffered from this same disease during Elisha's ministry.

Jesus is building the exact same pattern a second time.

📜 Eliseus is the Greek form of Elisha
🩹 Leprosy made a person ritually unclean
👥 Many Israelites suffered from this disease
➡️ Jesus repeats the same hard pattern

## ⚔️ None Of Them Was Cleansed, Saving Naaman The Syrian

Naaman was a military commander from Syria, a nation often at war with Israel.

He was also an outsider to God's own covenant people.

Out of every leper in Israel, only this foreign enemy soldier was healed.

Jesus uses both stories to say the same uncomfortable thing twice.

⚔️ Naaman commanded Syria's army
🌍 He was an outsider to the covenant
🩹 Only this foreign soldier was healed
📖 Two stories repeat one hard truth

## 😠 Filled With Wrath

The crowd's warm welcome from earlier in this chapter is now completely gone.

Jesus had just told them God sometimes chooses outsiders over His own people.

That truth cut deeper than any insult ever could.

Anger here reveals how much pride was actually hiding underneath their earlier praise.

😠 Their warm welcome is now gone
🎯 The truth cut deeper than an insult
💔 Pride was hiding beneath their praise
➡️ Hard truth can turn a crowd fast

## ✊ Thrust Him Out Of The City

This was not a polite disagreement or a quiet exit.

The crowd physically forced Jesus out of His own hometown.

People who had known Him his entire life turned on Him in a single moment.

Rejection here came from the people closest to Him, not from strangers.

✊ The crowd physically forced Him out
🏡 This happened in His own hometown
💔 Rejection came from people who knew Him
➡️ Closeness did not prevent betrayal

## 💀 Cast Him Down Headlong

Nazareth sat on a hillside with real cliffs nearby.

The crowd intended to throw Jesus off one of those cliffs to kill Him.

This moment turned deadly serious within minutes.

A sermon had somehow become an attempted execution.

⛰️ Nazareth sat on a real hillside
💀 The crowd intended to kill Him
⏱️ Danger escalated within just minutes
📖 A sermon turned into an attack

## 🚶 He Passing Through The Midst Of Them Went His Way

Luke does not explain exactly how Jesus escaped this violent crowd.

He simply walks straight through the middle of them unharmed.

His time to die had not yet come.

Nothing could end His life before God's own appointed moment.

🚶 Jesus walks straight through the crowd
❓ Luke does not explain the escape
⏳ His time had not yet come
📖 Nothing ends His life before God's timing

# Luke 4:31-37
# 😈 A Spirit Of An Unclean Devil
---
## 🗺️ Came Down To Capernaum, A City Of Galilee

Capernaum sat lower in elevation than Nazareth, closer to the Sea of Galilee.

This fishing town becomes the main base for much of Jesus's ministry.

Rejected in His hometown, Jesus now moves toward a town that will receive Him.

One door closing does not end the mission.

🗺️ Capernaum sat near the Sea of Galilee
🏠 It becomes His ministry's main base
🚪 One closed door did not stop Him
➡️ Rejection could not stop His mission

## 📅 Taught Them On The Sabbath Days

Jesus continues the same steady habit from Nazareth in this new town.

Teaching on the sabbath was simply His normal, ongoing pattern.

Capernaum will hear far more from Him than Nazareth ever did.

Consistency marked His ministry everywhere He went.

📅 Same steady habit continues here
🏠 Capernaum will hear much more from Him
🔁 Consistency marked His ministry everywhere
📖 A new town, the same faithful pattern

## 😲 Astonished At His Doctrine

Doctrine here simply means His teaching, not a complicated theological system.

Astonished means genuinely amazed, caught completely off guard.

The crowd expected ordinary teaching and received something far beyond that.

Something about how Jesus taught set Him apart immediately.

📖 Doctrine simply means His teaching
😲 Astonished means genuinely amazed
🎯 They expected ordinary teaching
➡️ Something set Him apart immediately

## 💪 His Word Was With Power

The local religious teachers typically taught by quoting other respected rabbis.

Jesus taught with direct, personal authority instead of citing other teachers.

Power here means His words actually carried weight and produced real results.

The healing that follows in this same scene proves that power immediately.

🗣️ Teachers usually quoted other rabbis
💪 Jesus taught with direct authority
⚡ Power means His words produced results
➡️ The healing ahead proves it at once

## 😈 A Spirit Of An Unclean Devil

This phrase describes a demon possessing a man in the middle of the synagogue.

Unclean marked anything considered impure or defiling under Jewish law.

A demon showing up in this sacred space would have shocked everyone present.

Even a holy place was not safe from this kind of darkness.

😈 A demon possessed this man
🚫 Unclean meant impure under Jewish law
😨 This happened inside the synagogue itself
📖 No place was safe from this darkness

## 🗣️ What Have We To Do With Thee

This phrase was a common way of demanding why someone was interfering.

The demon speaks here, not the man himself.

It wants Jesus to leave it completely alone.

Its sense of comfort is about to be shattered.

🗣️ A common way to demand distance
😈 The demon speaks, not the man
🙅 It wants Jesus to leave it alone
➡️ That comfort is about to end

## 📖 The Holy One Of God

The demon recognizes Jesus instantly, even though the human crowd still does not.

Knowing who Jesus is does not mean submitting to Him.

Demons throughout the Gospels consistently recognize Jesus before people do.

Correct knowledge without surrender is not the same as real faith.

😨 The demon recognizes Jesus instantly
🧠 Knowledge alone is not surrender
🔁 Demons often know Him before people do
📖 Correct knowledge without faith saves no one

## 🛑 Hold Thy Peace, And Come Out Of Him

Jesus gives two direct commands in a single breath.

Be silent, and leave this man completely.

He does not negotiate with the demon or ask it questions.

Authority here needs no explanation and no argument.

🛑 Two direct commands in one breath
🤫 Be silent is the first command
🚪 Leave the man is the second
➡️ Authority here needs no argument

## 🛡️ Hurt Him Not

The demon throws the man down violently before finally leaving him.

Despite that violence, the man walks away completely unharmed.

Jesus protects even the physical body during this entire struggle.

Deliverance here comes without any lasting damage.

💥 The demon throws the man down
🛡️ The man still walks away unharmed
🧍 Jesus protects his body through it all
📖 Freedom came without lasting damage

## 👑 With Authority And Power He Commandeth The Unclean Spirits

The crowd now reacts with amazement instead of mere curiosity.

Authority and power describe two different things working together here.

Authority is the right to command.

Power is the actual ability to make it happen.

Jesus carries both completely, and the demons simply obey.

😲 The crowd reacts with real amazement
👑 Authority means the right to command
⚡ Power means the ability to enforce it
📖 Jesus carries both, and demons obey

# Luke 4:38-41
# 🤒 Simon's Wife's Mother
---
## 👤 Entered Into Simon's House

Simon here is Simon Peter, who will later become one of the twelve apostles.

This is actually Luke's very first mention of Simon in his entire Gospel.

Jesus moves straight from the public synagogue into a private home.

His ministry reaches both the public crowd and the private household the same day.

👤 Simon is Simon Peter, the future apostle
📖 This is Luke's first mention of him
🏠 Jesus moves from synagogue to home
➡️ Public ministry reaches private homes too

## 🤒 Taken With A Great Fever

A great fever meant a severe, often dangerous illness in the ancient world.

Without modern medicine, a fever this serious could easily become fatal.

Simon's family brought their real, urgent need directly to Jesus.

They did not wait for a convenient, more public moment.

🤒 A great fever was often dangerous
⚕️ Ancient medicine could not treat it easily
🙏 The family brought their need to Jesus
➡️ They did not wait for a better moment

## 🗣️ He Stood Over Her, And Rebuked The Fever

Jesus speaks directly to the fever itself.

That echoes how He spoke to the demon earlier in this chapter.

Rebuked here does not mean a quiet, gentle prayer.

It describes a command spoken with real authority.

Sickness responds to His word the same way evil spirits do.

🗣️ Jesus speaks directly to the fever
🔁 This echoes His command to the demon
⚡ Rebuked means a command, not a gentle prayer
📖 Sickness obeys His word just like spirits do

## ⚡ Immediately She Arose And Ministered Unto Them

This healing happens instantly, with no gradual recovery period.

She does not rest afterward despite just being seriously ill.

She gets up right away and serves her guests herself.

Complete healing here includes full strength returning immediately as well.

⚡ The healing happened instantly
🛏️ No recovery period was needed
🍽️ She served her guests right away
📖 Healing restored full strength, not just health

## 🏠 All They That Had Any Sick With Divers Diseases

Divers is an old word meaning various or many different kinds.

Word of the earlier healing spread through Capernaum extremely fast.

People now bring every kind of sickness they can think of to Jesus.

One healing in a private home turns into a citywide moment.

📖 Divers means various or many kinds
📢 Word of healing spread through the city
🏠 One private healing becomes citywide news
➡️ Need draws a crowd fast

## ✋ He Laid His Hands On Every One Of Them

Jesus does not simply speak one general healing over the whole crowd at once.

He personally touches each person, one at a time.

That takes real time and real physical effort on His part.

Every single person received His full, individual attention.

✋ He personally touched each person
⏳ This took real time and effort
👤 One at a time, not all at once
📖 Every person received His full attention

## 😈 Devils Also Came Out Of Many

More demons are cast out here, beyond the one man earlier in the synagogue.

Physical sickness and spiritual bondage both show up together in this same crowd.

Jesus addresses both kinds of need without treating either one as more important.

His authority covers every kind of brokenness present that evening.

😈 More demons are cast out here
🤒 Sickness and bondage appear together
⚖️ Jesus treats neither as more important
📖 His authority covers every kind of need

## 😨 Thou Art Christ The Son Of God

The demons again correctly identify who Jesus truly is.

Jesus silences them immediately instead of letting them speak.

He is not yet ready for His full identity to spread this way.

The timing of that announcement belongs to Him alone, not to demons.

😨 Demons again correctly name who He is
🤫 Jesus silences them immediately
⏳ His full identity was not ready to spread
📖 The timing belonged to Him alone

## 🛑 He Rebuking Them Suffered Them Not To Speak

Suffered here is an old way of saying allowed or permitted.

Jesus actively stops the demons from making any announcement about Him.

This pattern repeats often throughout the earlier chapters of the Gospels.

His mission unfolds on His own timing, not on a demon's terms.

📖 Suffered means allowed, an old meaning
🛑 Jesus stops the demons from speaking
🔁 This pattern repeats elsewhere in the Gospels
➡️ His timing was never on their terms

# Luke 4:42-44
# 🚶 I Must Preach The Kingdom Of God
---
## 🏜️ He Departed And Went Into A Desert Place

After a whole evening of healing, Jesus withdraws somewhere quiet.

Desert here simply means an empty, isolated place away from the crowds.

Even His packed, demanding ministry still made room for solitude.

Rest and prayer were never treated as optional for Him.

🏜️ Desert means an empty, isolated place
🙏 Even He needed quiet and rest
⏳ Solitude followed a full evening of work
📖 Rest was never optional for Him

## 🔍 The People Sought Him

The Capernaum crowd quickly notices that Jesus has slipped away quietly.

They go looking for Him, clearly wanting more of what they experienced the night before.

Their search shows how much His ministry had already impacted the whole town.

Popularity was growing fast in this place that had received Him so well.

🔍 The crowd searches for Him
📈 Their search shows real impact
🏘️ Popularity grows fast in Capernaum
➡️ This town received Him well

## 🙅 Stayed Him, That He Should Not Depart From Them

The crowd tries to physically keep Jesus from leaving their town at all.

Their request sounds generous, almost like a compliment to His ministry.

It would have meant keeping Jesus limited to just one place.

His mission was never meant to stay confined to a single town.

🙅 The crowd tries to keep Him there
🎁 Their request sounds like a compliment
📍 It would have confined His mission
➡️ His calling reached beyond one town

## 🌍 I Must Preach The Kingdom Of God To Other Cities Also

Jesus gently refuses the crowd's request to stay only with them.

Must here reveals that His mission was never optional or up for negotiation.

Kingdom of God describes God's reign breaking into ordinary, everyday life.

Other cities still needed to hear this same good news.

Capernaum's blessing was never meant to be kept only for itself.

🚫 Jesus gently refuses to stay only there
🎯 Must shows His mission was not optional
🌍 Other cities needed the same good news
📖 Blessing was never meant for one place

## 🗺️ He Preached In The Synagogues Of Galilee

This single line summarizes an entire preaching tour across the whole region.

Luke moves quickly here, from one town's demand straight into a wider mission.

The chapter that began with private, personal testing ends in public, widespread ministry.

Both halves of this chapter were always leading toward the exact same purpose.

🗺️ One line summarizes a whole tour
⏩ Luke moves quickly into the wider mission
🔄 Private testing led to public ministry
📖 Both halves served the same purpose
`.trim();

export const LUKE_FOUR_PERSONAL_SECTIONS = parseLukeFourRawNotes(LUKE_FOUR_RAW_NOTES);
