export type LukeFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeFiveRawNotes(rawText: string): LukeFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 5:${startVerse}` : `Luke 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Luke 5 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_FIVE_RAW_NOTES = `# Luke 5:1-3
# 🚣 Jesus Teaches From A Boat
---
## 👥 Pressed Upon Him To Hear The Word Of God

Pressed means the crowd was physically crowding in close.

This was not a polite audience sitting back in neat rows.

People kept pushing nearer just to catch what Jesus was saying.

Hunger for God's word looked like a crowd that would not stay back.

👥 Pressed means the crowd crowded in close
🗣️ No one sat back politely here
📖 Word of God means His teaching
➡️ Hunger for truth pushed the crowd forward

## 🌊 The Lake Of Gennesaret

Gennesaret is another name for the Sea of Galilee.

Luke uses this older, more local name for the same body of water.

The lake sat in a fertile valley thick with fishing villages.

Jesus made this stretch of water the center of His early ministry.

🌊 Gennesaret is another name for Galilee
📜 Luke uses this older, local name
🐟 Fishing villages lined its shores
📖 This lake becomes His ministry's center

## ⛵ Two Ships Standing By The Lake

Two fishing boats sat empty near the shore.

Simon's boat was one of them.

Boats like these were simple wooden vessels built for the lake's calmer waters.

They belonged to working men, not wealthy merchants.

⛵ Two boats sat empty near shore
🛠️ They were simple wooden fishing vessels
👷 They belonged to working fishermen
📖 Simon owned one of these boats

## 🕸️ Washing Their Nets

Washing nets was the last job after a long night of fishing.

Nets were woven from linen or papyrus fiber.

A night of fishing left them coated in mud and weeds.

These men had already given up on that night's catch.

🕸️ Washing nets was the final chore
🧵 Nets were woven from plant fiber
🌿 A long night left them coated in mud
➡️ They had given up on that catch

## 👤 Which Was Simon's

This is the same Simon whose house Jesus had already entered in the chapter before.

Simon was a working fisherman, not a religious leader or a man of wealth.

Jesus chooses an ordinary boat that belonged to an ordinary man.

Nothing about Simon marked him out as special yet.

👤 Simon already appeared in chapter four
🎣 He was an ordinary fisherman
🚫 Nothing marked him as special yet
📖 Jesus chooses an ordinary man's boat

## 🛶 Taught The People Out Of The Ship

Jesus asks Simon to push the boat a short way from the shore.

That gave the crowd on the beach more room to spread out.

Sound also carries further over open water than through a packed crowd on sand.

A borrowed fishing boat becomes Jesus's pulpit for the day.

🛶 He pushed the boat off the shore
📏 This gave the crowd more room
🔊 Sound carried better over the water
📖 A fishing boat became His pulpit

# Luke 5:4-7
# 🎣 Launch Out Into The Deep
---
## 🌊 Launch Out Into The Deep

Jesus tells Simon to row out to deeper water.

Daytime fishing on this lake rarely worked well.

The fish stayed hidden in deeper, cooler water during the day.

Jesus is about to override Simon's own expert knowledge.

🌊 He tells Simon to go deeper
☀️ Daytime fishing rarely worked well
🌙 Night fishing was the normal method
➡️ Jesus overrides Simon's own expertise

## 🕸️ Let Down Your Nets For A Draught

A draught here means a catch, the full haul pulled in by the net.

Jesus speaks like someone giving fishing instructions, not simply offering a blessing.

Simon is a professional fisherman being told how to fish by a carpenter's son.

The command itself was already a small test of trust.

🕸️ Draught means a catch of fish
🗣️ Jesus speaks like a fishing expert
🤔 A carpenter's son instructs a fisherman
📖 The command already tested Simon's trust

## 😓 We Have Toiled All The Night, And Have Taken Nothing

Simon answers honestly instead of pretending the night went well.

Toiled means hard, exhausting labor, not a casual effort.

An entire night of skilled work had produced nothing to show for it.

Simon's objection makes sense from someone who actually knows these waters.

😓 Toiled means hard, exhausting labor
🌙 A full night produced nothing at all
🎣 Simon knows these waters well
➡️ His doubt was reasonable, not stubborn

## 🙏 Nevertheless At Thy Word I Will Let Down The Net

Nevertheless marks the turn from Simon's doubt to his obedience.

Simon still does not expect this to work.

He chooses to obey Jesus anyway, despite his own professional judgment.

Faith here looks like action taken before the feeling of certainty arrives.

🙏 Nevertheless marks a turn to obedience
🤷 Simon still doubts it will work
✅ He obeys despite his own judgment
📖 Faith acted before certainty arrived

## 🐟 They Inclosed A Great Multitude Of Fishes

Inclosed is an old spelling of enclosed, meaning the net trapped the fish inside.

A great multitude means far more fish than any normal catch.

This did not happen through better timing or sharper skill.

Jesus produced an impossible result in water Simon had already fished all night.

🐟 Inclosed is an old spelling of enclosed
📈 Multitude means far more than normal
🚫 Skill and timing cannot explain this
📖 Jesus produced an impossible catch

## 💥 Their Net Brake

Brake is an old form of the word broke.

These nets were built strong enough for ordinary, heavy use.

The sheer number of fish still tore right through them.

The miracle was too large for ordinary equipment to hold.

💥 Brake is an old form of broke
🕸️ Nets were built for heavy use
🐟 The catch still ripped through them
➡️ The miracle outgrew ordinary equipment

## 🙌 They Beckoned Unto Their Partners

Beckoned means they signaled with hand motions across the water.

Shouting across open water rarely carried far enough to be heard clearly.

James and John worked on a separate boat nearby as fishing partners.

One boat's miracle immediately became two boats' problem to solve together.

🙌 Beckoned means signaling by hand
🔊 Shouting would not carry far enough
⛵ James and John worked a separate boat
➡️ One miracle became a shared task

## ⚓ Began To Sink

Both boats filled up until they nearly went under from the weight.

This detail proves the catch was not slightly larger than usual.

It was large enough to threaten two working boats at once.

The blessing itself became almost too much to carry.

⚓ Both boats nearly went under
📏 This was no ordinary large catch
⚖️ It threatened two boats at once
📖 The blessing nearly overwhelmed them

# Luke 5:8-11
# 🐟 Fishers Of Men
---
## 👤 When Simon Peter Saw It

This is the first time Luke calls him by the fuller name Simon Peter.

Peter means rock, a name Jesus will give him later in His ministry.

Luke lets that fuller name slip in early, right at this turning point.

Something about this moment already marks Simon as more than a fisherman.

👤 First use of the name Simon Peter
🪨 Peter means rock
⏳ Jesus gives him that name later
➡️ This moment marks a turning point

## 🙇 For I Am A Sinful Man, O Lord

Simon does not ask for more fish or celebrate the catch.

He falls down at Jesus's knees and asks Him to leave instead.

Seeing real power up close made Simon suddenly aware of his own sin.

Nearness to holiness often exposes what distance had hidden.

🙇 Simon falls down instead of celebrating
😨 He asks Jesus to leave
👁️ Power exposed his own sinfulness
📖 Holiness exposes what distance hides

## 😲 Astonished At The Draught Of The Fishes

Astonished describes complete amazement, far beyond simple surprise.

Everyone in both boats shared this same overwhelming reaction.

These were experienced fishermen who understood exactly how impossible this catch was.

Their own expertise is what made the miracle so shocking to them.

😲 Astonished means complete amazement
👥 Everyone in both boats felt it
🎣 Experienced fishermen knew this was impossible
➡️ Their expertise made it more shocking

## 👬 James, And John, The Sons Of Zebedee

Zebedee was their father, also a fisherman by trade in this region.

Partners here means they ran their fishing business together with Simon.

These two men will later become two of Jesus's closest apostles.

Jesus is calling an entire small business, not just one man.

👬 Zebedee was their fisherman father
🤝 Partners means a shared fishing business
📖 Both become apostles later
➡️ He calls a business, not one man

## 🙅 Fear Not

Jesus answers Simon's guilt with comfort instead of correction.

Simon expected to be sent away for his sin.

Jesus responds to that fear directly, before explaining anything else.

Grace meets Simon's shame before any instruction follows.

🙅 Jesus answers guilt with comfort
😨 Simon expected to be sent away
💗 Grace comes before instruction here
📖 Fear is met before fear is explained

## 🎣 From Henceforth Thou Shalt Catch Men

Jesus reshapes Simon's own skill into a new kind of calling.

Catching men means drawing people toward God instead of fish from water.

Henceforth marks a clear line between Simon's old life and what comes next.

Jesus does not discard Simon's trade, He repurposes it completely.

🎣 Catching men replaces catching fish
🔄 Henceforth marks a clear turning point
👥 It means drawing people toward God
📖 Jesus repurposes Simon's own skill

## 🚶 They Forsook All, And Followed Him

Forsook means they left everything behind completely.

That includes two full boats and a catch of fish worth real money.

Simon, James, and John walk away from their entire livelihood in this one moment.

Following Jesus here costs something immediate and real, not just a feeling.

🚶 Forsook means leaving everything behind
💰 They left a valuable catch behind
⛵ Two boats and a business left behind
📖 Following Him cost something real

# Luke 5:12-16
# 🙌 Lord, If Thou Wilt
---
## 🩹 Full Of Leprosy

Leprosy was a severe skin disease that spread slowly across the whole body.

Full means this man's case had already reached an advanced, visible stage.

The disease made a person ritually unclean under Jewish law.

Unclean people were required to live apart from the rest of the community.

🩹 Leprosy was a severe skin disease
📈 Full means an advanced, visible stage
🚫 It made a person ritually unclean
➡️ Unclean people lived apart from others

## 🙏 Lord, If Thou Wilt, Thou Canst Make Me Clean

This man never questions whether Jesus has the power to heal him.

His only question is whether Jesus is willing to do it.

Falling on his face showed deep humility in front of a crowd.

Clean here means more than physically healthy.

It means fully restored to the community.

🙏 He never doubts Jesus has power
❓ His only question is willingness
🙇 Falling down showed deep humility
📖 Clean means restored to community

## ✋ He Put Forth His Hand, And Touched Him

Jewish law required people to avoid physical contact with a leper.

Jesus reaches out and touches him anyway, before the healing even happens.

That touch alone would have been shocking to anyone watching.

Compassion moved before the miracle did.

✋ Law required avoiding a leper's touch
😮 Jesus touches him before healing him
👀 This touch shocked onlookers
📖 Compassion moved before the miracle

## ✨ I Will: Be Thou Clean

Jesus answers the man's exact question with two direct words.

I will settles the willingness the man was unsure about.

Be thou clean is a command, not a wish or a hope.

The leprosy leaves him the instant Jesus finishes speaking.

✨ I will answers his exact question
🗣️ Be thou clean is a command
⚡ Healing happens the instant He speaks
📖 Jesus answers doubt with certainty

## 🤫 He Charged Him To Tell No Man

Jesus tells the man to stay quiet about what just happened.

He sends him to the priest instead.

That step followed the law in Leviticus for a cleansed leper.

Jesus still respects the proper process.

He works outside normal expectations at the same time.

🤫 Jesus tells him to stay quiet
📜 He follows the law in Leviticus
👤 A priest had to confirm it
📖 Jesus respects the proper process

## 📢 So Much The More Went There A Fame Abroad Of Him

Jesus asked for silence, but word spread anyway.

Fame abroad means news traveling well beyond the local area.

Secrecy could not contain what people had already seen.

Popularity was growing faster than Jesus could manage it quietly.

📢 Word spread despite His request for silence
🗺️ Fame abroad means news traveling widely
🚫 Secrecy could not contain what people saw
➡️ Popularity outran His own intentions

## 🏥 To Hear, And To Be Healed Of Their Infirmities

Great multitudes now came for two different reasons at once.

Infirmities means ongoing sicknesses and physical weaknesses of many kinds.

Some came simply to listen, others came desperate for healing.

Jesus welcomed both kinds of need the same way.

🏥 Infirmities means ongoing sicknesses
👂 Some came only to listen
🙏 Others came desperate for healing
📖 Jesus welcomed every kind of need

## 🏜️ He Withdrew Himself Into The Wilderness, And Prayed

Jesus steps away from the growing crowds on purpose.

Wilderness here means a quiet, empty place away from people.

Prayer, not popularity, was what He turned to in this busy season.

Even rising fame did not pull Him away from depending on God.

🏜️ He steps away from the crowds
🤫 Wilderness means a quiet, empty place
🙏 Prayer mattered more than popularity
📖 Fame never replaced His need for God

# Luke 5:17-20
# 🏠 Through The Tiling
---
## 👳 Pharisees And Doctors Of The Law

Pharisees were a strict religious group devoted to the details of Jewish law.

Doctors of the law were trained experts in interpreting that same law.

Both groups traveled from Galilee, Judaea, and even Jerusalem to be here.

Jesus now draws serious religious attention, not just curious crowds.

👳 Pharisees kept the law strictly
📜 Doctors of the law were trained experts
🗺️ They came from Galilee, Judaea, and Jerusalem
➡️ Serious religious attention now surrounds Jesus

## ⚡ The Power Of The Lord Was Present To Heal Them

Luke tells the reader in advance that healing power filled the room.

This detail sets up everything that happens in the verses just ahead.

The religious experts and the sick shared the very same room.

What each group does next with that power will look very different.

⚡ Healing power filled the room
⏳ This sets up what happens next
👥 Experts and the sick shared one room
➡️ Each will respond to it differently

## 🛏️ Taken With A Palsy

Palsy describes some kind of paralysis that left a man unable to walk.

This man could not come to Jesus on his own strength.

He depended entirely on other people to carry him there.

Real need, not religious status, brought him into this crowded room.

🛏️ Palsy means a form of paralysis
🚶 He could not walk there himself
🤝 He depended fully on others
📖 Real need brought him to Jesus

## 🚪 Sought Means To Bring Him In Because Of The Multitude

The friends want to carry this man straight to Jesus.

The crowd packed every door and window of the house.

A normal, direct approach simply was not possible anymore.

Their determination did not stop just because the easy way was blocked.

🚪 Every door and window was packed
🙅 A direct approach was not possible
💪 Their determination did not stop there
➡️ Blocked paths did not end their effort

## 🏠 Went Upon The Housetop, And Let Him Down Through The Tiling

Houses in this region had flat roofs reached by an outside stairway.

Roofs were often built from tile laid over wooden beams.

The friends climbed onto the roof and tore the tiling open.

They lowered him down on his bed, right in front of Jesus.

🏠 Flat roofs were reached by a stairway
🧱 Tiling covered wooden roof beams
💪 They tore it open to get through
📖 Real effort brought him to Jesus

## 👁️ When He Saw Their Faith

Jesus responds to something He can see, not just hear.

Their faith showed up as action, carrying a man through a torn open roof.

Belief here was visible in effort, not only in words spoken.

The paralyzed man receives help because of faith shown by his friends.

👁️ Jesus saw their faith, not just heard it
💪 Faith showed up as physical effort
🗣️ Belief was visible, not only spoken
📖 Friends' faith opened the way for him

## 🙏 Man, Thy Sins Are Forgiven Thee

Everyone expected Jesus to heal the man's body first.

Jesus addresses something deeper before touching the physical problem at all.

Forgiveness of sin was something only God was believed to have authority to give.

Jesus answers a need no one in the room had even asked about out loud.

🙏 Forgiveness comes before physical healing
❓ No one had asked for this
👑 Forgiving sin belonged to God alone
📖 Jesus addresses the deeper need first

# Luke 5:21-26
# ⚖️ Who Can Forgive Sins
---
## 🤔 The Scribes And The Pharisees Began To Reason

Scribes were professional copyists and experts trained in the details of scripture.

Reason here means they began silently working through a theological problem in their minds.

They do not say anything out loud yet.

Their objection is building internally before anyone speaks it.

🤔 Scribes were trained scripture experts
🧠 Reason means silent inner debate
🤫 Nothing is said out loud yet
➡️ Their objection builds before it is spoken

## 👑 Who Can Forgive Sins, But God Alone?

This question reveals exactly what troubled the religious leaders.

They understood correctly that forgiving sin was God's authority alone to give.

Their theology here was actually accurate.

Their mistake was failing to consider who was standing in front of them.

👑 Forgiving sin belongs to God alone
✅ Their theology here was correct
❌ Their conclusion about Jesus was wrong
➡️ Right belief, wrong application

## 👁️ Jesus Perceived Their Thoughts

Perceived means Jesus knew exactly what they were silently thinking.

No one had spoken their objection out loud yet.

Jesus answers a conversation that technically never happened in words.

This alone already hints at who He really is.

👁️ Perceived means He knew their silent thoughts
🤫 No one had spoken a word yet
🗣️ Jesus answers an unspoken objection
📖 This hints at who He really is

## ⚖️ Whether Is Easier, To Say, Thy Sins Be Forgiven Thee

Saying someone's sins are forgiven cannot be checked by watching them.

Telling a paralyzed man to rise and walk can be proven instantly.

Jesus deliberately picks the harder, visible miracle to prove the easier, invisible one.

The visible healing becomes proof for the claim no one could otherwise verify.

⚖️ Forgiving sin cannot be visibly checked
🚶 Walking again can be proven at once
🎯 Jesus picks the provable miracle on purpose
📖 The visible proves the invisible claim

## 👑 The Son Of Man Hath Power Upon Earth To Forgive Sins

Son of man was a title Jesus often used for Himself.

It pointed back to a figure in the book of Daniel given authority by God.

Jesus claims that same authority now belongs to Him, on earth, in this room.

He is not avoiding the scribes' question, He is answering it directly.

👑 Son of man is a title from Daniel
📖 Daniel's figure receives authority from God
🌍 Jesus claims that authority on earth
➡️ He answers their question directly

## 🛏️ Arise, And Take Up Thy Couch, And Go Into Thine House

Jesus gives the paralyzed man three separate commands at once.

Stand up, carry thy couch, and go home.

Carrying his own bed proves there is no weakness left at all.

The healing is immediate, complete, and impossible to fake.

🛏️ Three commands given in one breath
💪 Carrying his bed proves full strength
⚡ The healing happens immediately and completely
📖 No one could fake this proof

## 🚶 Departed To His Own House, Glorifying God

The man does not linger in the room where this happened.

He walks home under his own power for the first time in years.

Glorifying means praising God loudly enough for people to notice.

The healing points toward God, not toward the man who was healed.

🚶 He walks home under his own power
🙌 Glorifying means praising God loudly
👀 People could see him praising God
📖 The healing pointed back to God

## 😲 We Have Seen Strange Things To Day

The crowd reacts with fear mixed together with amazement.

Strange things means something genuinely outside their normal experience of the world.

To day emphasizes how recent and immediate this whole event felt.

Something had clearly broken into their ordinary world that morning.

😲 Fear and amazement mixed together
🌌 Strange things means outside normal experience
📅 To day stresses how fresh this felt
➡️ Something broke into their ordinary world

# Luke 5:27-32
# 🍽️ Follow Me
---
## 💰 A Publican, Named Levi, Sitting At The Receipt Of Custom

A publican collected taxes on behalf of the Roman government.

Publicans were widely hated for overcharging people and working for a foreign occupier.

Receipt of custom means a tax booth set up along a busy road.

Levi is the same man who later writes the Gospel of Matthew.

💰 A publican collected Roman taxes
😠 Publicans were widely hated in Israel
🛤️ His tax booth sat along a road
📖 Levi is also known as Matthew

## 🚶 Follow Me

Jesus calls Levi the exact same way He called the fishermen earlier in this chapter.

No religious qualification is required before this invitation is given.

A hated tax collector receives the same simple call as an honest fisherman.

Jesus's call reaches people the religious establishment had already written off.

🚶 The same call given to the fishermen
🚫 No religious qualification is required
💰 A hated tax collector is called too
📖 Jesus calls people others wrote off

## 🚪 He Left All, Rose Up, And Followed Him

Levi walks away from a steady, profitable job in a single moment.

Unlike fishing, there was likely no going back to this tax booth later.

Leaving this job may have meant burning a bridge with Rome completely.

Levi's cost of following Jesus may have been higher than the fishermen's.

🚪 He left a steady, profitable job
🔥 This job likely could not be reclaimed
⚖️ His cost may be higher than the fishermen's
📖 He still chose to follow immediately

## 🍽️ Levi Made Him A Great Feast

Levi celebrates his new calling by hosting a large dinner.

Hosting a feast was a common way to publicly mark a major life change.

Levi wants his own circle of friends to meet Jesus personally.

Joy over this calling spills out immediately into generosity.

🍽️ Levi hosts a large celebration dinner
🎉 Feasts marked major life changes publicly
👥 He wants his friends to meet Jesus
➡️ Joy spilled out into generosity

## 👥 Publicans And Of Others That Sat Down With Them

Levi's guest list was made up of his old social circle.

Tax collectors and other people considered sinners by religious standards filled the room.

Eating together in this culture meant far more than simple convenience.

Sharing a table meant accepting someone as a genuine equal.

👥 Guests were Levi's old social circle
🚫 Many were considered sinners by religious standards
🍽️ Shared meals signaled real acceptance
📖 Jesus accepted them as equals

## 😠 Their Scribes And Pharisees Murmured

Murmured means complaining quietly among themselves rather than confronting Jesus directly.

This phrase shows a pattern already building across several encounters.

Religious leaders keep reacting to Jesus's choices with private disapproval.

Their criticism grows louder even as Jesus's ministry keeps expanding.

😠 Murmured means quiet, indirect complaining
🔁 This pattern keeps repeating in this chapter
👳 Religious leaders disapprove again here
➡️ Criticism grows as His ministry grows

## ❓ Why Do Ye Eat And Drink With Publicans And Sinners

This question was meant as an accusation, not genuine curiosity.

Sharing a table with sinners was seen as a kind of moral contamination.

The religious leaders expect holiness to stay separate from obvious sin.

Jesus is about to challenge that entire assumption directly.

❓ The question works as an accusation
🚫 Shared meals were seen as contamination
🧼 Holiness was expected to stay separate
➡️ Jesus is about to challenge that idea

## ⚕️ They That Are Whole Need Not A Physician

Jesus answers with a simple picture everyone in the room already understood.

A doctor spends time with sick people, not healthy ones.

That is not a scandal, it is simply how healing works.

Jesus places Himself deliberately among the people who know they need help.

⚕️ A doctor treats the sick, not the well
🧠 This picture made sense to everyone
🙌 Jesus chooses to be near the needy
📖 This is how healing actually works

## 📖 I Came Not To Call The Righteous, But Sinners To Repentance

Jesus states His whole mission plainly in a single sentence.

Righteous here likely points at people who were confident in their own goodness.

Repentance means a real turning away from sin, not simply feeling sorry.

Jesus came looking for people who already knew they needed to change.

📖 Jesus states His mission plainly
🙋 Righteous here means self confident people
🔄 Repentance means truly turning away from sin
➡️ He came for those who needed help

# Luke 5:33-39
# 🍷 New Wine, New Wineskins
---
## 🙏 The Disciples Of John Fast Often, And Make Prayers

John the Baptist's followers practiced regular fasting as a visible form of devotion.

The Pharisees' disciples followed that same strict pattern of fasting.

Jesus's own disciples were noticeably not doing the same thing.

That difference drew a pointed question from the people watching.

🙏 John's followers fasted regularly
👳 Pharisees' disciples fasted the same way
🚫 Jesus's disciples did not fast this way
➡️ The difference drew a pointed question

## 💒 Children Of The Bridechamber

Children of the bridechamber means the wedding guests celebrating with the groom.

Jewish weddings included days of feasting, not fasting, for everyone involved.

Jesus compares His own presence to a wedding celebration still in full swing.

Fasting now would make as little sense as fasting during someone's wedding feast.

💒 Bridechamber guests were wedding celebrants
🎉 Weddings meant feasting, not fasting
🙌 Jesus compares Himself to the groom
➡️ Fasting now would miss the moment entirely

## ⏳ The Bridegroom Shall Be Taken Away From Them

Jesus hints here at His own coming death, long before His disciples could understand it.

Bridegroom still refers to Jesus Himself in this same picture.

Taken away was a gentle way of pointing toward something painful ahead.

A different season of fasting is coming, just not yet.

⏳ Jesus hints at His coming death
💒 Bridegroom still refers to Jesus
💔 Taken away points to something painful
📖 A different season was coming later

## 🧵 A Piece Of A New Garment Upon An Old

Unshrunk new cloth sewn onto an old, already shrunk garment creates a real problem.

The first wash would cause the new patch to pull and tear the old fabric.

Jesus is not describing a minor sewing mistake here.

He is describing two things that simply do not combine well.

🧵 New cloth had not shrunk yet
💦 Washing would tear the old fabric
🚫 This was not a minor mistake
➡️ Some things simply do not combine

## 👕 The New Maketh A Rent

A rent means a tear or a rip in the fabric.

Both the patch and the original garment end up ruined by this attempt.

Jesus pictures His own new teaching as something that cannot simply patch the old system.

Trying to force the two together damages both.

👕 Rent means a tear in the cloth
💔 Both the patch and garment get ruined
🆕 His teaching was not a small patch
➡️ Forcing old and new together damages both

## 🍷 No Man Putteth New Wine Into Old Bottles

Bottles here means wineskins made from animal hide, not glass containers.

New wine was still fermenting and releasing gas as it aged.

Old wineskins had already stretched and dried out, losing their flexibility.

Pouring new wine into an old skin risked bursting it completely.

🍷 Bottles meant wineskins, not glass
🧪 New wine still fermented and expanded
🐫 Old skins had dried and stretched
➡️ Pressure could burst an old skin

## 💥 Else The New Wine Will Burst The Bottles, And Be Spilled

An old, inflexible wineskin could not expand with the fermenting wine inside it.

The skin bursts, and the wine spills out.

Everything is lost in an instant.

Jesus's new teaching needed room that old structures could not provide.

💥 The skin cannot stretch further
🍷 Wine spills out and is lost
🌱 New teaching needed room to grow
📖 Rigid old structures could not hold it

## ✨ New Wine Must Be Put Into New Bottles

New wineskins were still soft, moist, and able to stretch as the wine fermented.

Putting new wine into a fresh skin let both survive the process together.

Jesus is describing what His own new teaching actually needs to thrive.

The old system was never built to hold what He was bringing.

✨ New skins were soft and able to stretch
🤝 New wine and new skins fit together
🌱 His teaching needed a fitting structure
📖 The old system could not hold it

## 🍇 The Old Is Better

Jesus ends with an honest observation about human nature.

People who are used to old wine usually resist trying something new.

This explains exactly why the Pharisees were struggling with His new teaching.

Familiar comfort can make people resistant to something genuinely good.

🍇 People often prefer what is familiar
👳 This explains the Pharisees' resistance
🔄 New things face resistance from habit
➡️ Comfort can block something genuinely good
`.trim();

export const LUKE_FIVE_PERSONAL_SECTIONS = parseLukeFiveRawNotes(LUKE_FIVE_RAW_NOTES);
