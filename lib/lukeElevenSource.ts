export type LukeElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeElevenRawNotes(rawText: string): LukeElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 11:${startVerse}` : `Luke 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Luke 11 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_ELEVEN_RAW_NOTES = `# Luke 11:1-4
# 🙏 Teaching Us To Pray
---
## 🙏 Teach Us To Pray, As John Also Taught His Disciples

John here means John the Baptist, not the apostle John.

John had already taught his own followers a specific way to pray.

Jewish teachers often gave their students a distinct prayer to set them apart.

The disciples want Jesus to give them that same kind of marker.

They are asking for an identity, not only a set of words.

🙏 John means John the Baptist
👥 Teachers often gave students their own prayer
🏷️ A shared prayer marked a group apart
📖 The disciples wanted an identity, not just words

## 👪 Our Father Which Art In Heaven

Calling God Father was not how most prayers of that time began.

Jewish prayers commonly opened with formal titles for God.

Jesus teaches his followers to approach God the way a child approaches a parent.

Heaven marks where God's authority is complete and nothing resists it.

👪 Father was an unusual way to pray
📜 Most prayers used formal royal titles
🤗 God can be approached like a parent
📖 Heaven means a place of complete authority

## ✨ Hallowed Be Thy Name

Hallowed means set apart as holy and treated with deep reverence.

God's name stood for his whole character, not just a label.

To hallow that name means to treat God as holy in daily life.

The very first request in the prayer is not for anything personal.

It asks that God himself be honored first.

✨ Hallowed means holy and set apart
🏷️ A name represented someone's whole character
🙇 To hallow means to honor in daily life
📖 The first request asks that God be honored

## 👑 Thy Kingdom Come, Thy Will Be Done

These two requests describe the same hope from two directions.

Thy kingdom come asks for God's rule to arrive in full.

Thy will be done asks for that rule to be obeyed completely.

In heaven so in earth means the request covers everywhere, not one place.

The prayer asks earth to start looking like heaven.

👑 Kingdom come asks for God's rule to arrive
🙏 Will be done asks for full obedience
🌍 In earth means everywhere, not one place
📖 The prayer asks earth to resemble heaven

## 🍞 Give Us Day By Day Our Daily Bread

Bread here stands for ordinary daily needs, not luxury.

Day by day points back to how God fed Israel with manna in the desert.

That manna could not be stored up, it had to be gathered fresh each morning.

The prayer asks for the same daily dependence, not a stockpile.

🍞 Bread means ordinary daily needs
🏜️ Day by day recalls manna in the desert
📦 Manna could not be stored up ahead
📖 The prayer asks for daily dependence on God

## 🤝 Forgive Us Our Sins, For We Also Forgive

The prayer ties being forgiven to forgiving other people.

It does not say forgiveness earns forgiveness like a trade.

It says a forgiven heart naturally forgives others in return.

A person who refuses to forgive is not living out what they just prayed.

🤝 Forgiveness is tied to forgiving others
🚫 It is not a trade or payment
💗 A forgiven heart forgives in return
📖 Refusing to forgive contradicts this prayer

## 🛡️ Lead Us Not Into Temptation

This does not mean God tempts people toward sin.

Temptation here can also mean a hard trial or testing moment.

The request asks God to spare them from a trial that could break their faith.

It is a plea for protection, not an accusation against God.

🚫 God does not tempt anyone toward sin
⚖️ Temptation can also mean a hard trial
🛡️ The prayer asks for protection from such trials
📖 It is a plea, not an accusation

## 🆘 Deliver Us From Evil

This closes the prayer with a request for rescue.

Evil can mean sin itself or the evil one behind it.

The prayer that began with God's name ends with a plea for safety.

Every request in between depends on that same God supplying it.

🆘 Deliver means rescue from danger
👹 Evil can mean sin or the evil one
🔚 The prayer opens and closes with God
📖 Every request depends on God supplying it

# Luke 11:5-8
# 🚪 The Friend At Midnight
---
## 🏘️ Which Of You Shall Have A Friend

Hospitality to travelers was treated as a serious duty, not an option.

Turning away a guest brought shame on a whole village, not just one house.

Jesus builds this parable on a custom every listener already understood.

The pressure inside the story would have felt completely real to them.

🏘️ Hospitality was a serious village duty
😳 Turning away a guest brought shame
👂 Jesus used a custom everyone understood
📖 The pressure in the story felt real

## 🌙 Shall Go Unto Him At Midnight

Many travelers in that region moved at night to avoid the heat of the day.

A guest could arrive on a host's doorstep with no warning at all.

There were no shops open to buy food after dark.

The only option left was to borrow from a neighbor.

🌙 Travel often happened at night to avoid heat
🚶 Guests could arrive with no warning
🏪 No shops were open after dark
📖 Borrowing from a neighbor was the only option

## 🍞 Lend Me Three Loaves

A loaf in this culture was small, more like a flat roll than a modern loaf.

Three loaves was enough to properly feed one guest.

Asking for exactly three shows this is a specific, modest request.

It is not a request for a huge favor.

🍞 A loaf was small, like a flat roll
🔢 Three loaves fed one guest properly
📏 This was a modest request
📖 It was not asking for a huge favor

## 🔒 The Door Is Now Shut

Many homes in this period were a single room shared by the whole family.

At night the door was barred and the family slept together on the floor.

Opening the door meant waking everyone and moving around in the dark.

The neighbor's excuse is not laziness, it is a real inconvenience.

🏠 Many homes were a single shared room
🔒 The door was barred for the night
👪 Opening it meant waking the whole family
📖 The excuse was a real inconvenience

## 💪 Because Of His Importunity

Importunity means a bold, persistent request that will not stop.

The neighbor does not get up because of friendship alone.

He gets up because the asking refuses to quit.

Jesus is teaching that persistent prayer carries real weight with God.

💪 Importunity means bold, persistent asking
🤷 Friendship alone was not what moved him
🔁 Persistence is what finally worked
📖 Persistent prayer carries weight with God

# Luke 11:9-13
# 🔑 Ask, Seek, Knock
---
## 🙏 Ask, Seek, Knock

These three words describe growing levels of effort in prayer.

Asking is a simple request.

Seeking adds searching and effort.

Knocking adds pressing at a door that is not yet open.

Jesus piles up three pictures to describe one persistent posture.

🙏 Ask is a simple request
🔍 Seek adds searching and effort
🚪 Knock means pressing at a closed door
📖 All three describe a persistent posture

## 🔁 For Every One That Asketh Receiveth

This verse restates verse nine as a flat promise, not a suggestion.

Each verb from before gets its own matching result here.

Asking leads to receiving, seeking leads to finding, knocking leads to an open door.

Jesus is not describing luck, he is describing how God responds.

🔁 This repeats the promise from verse nine
🎯 Each verb matches its own result
🚪 Knocking ends with an opened door
📖 This describes how God responds, not luck

## 🪨 Will He Give Him A Stone?

A small round stone could look similar in shape to a flat loaf of bread.

No loving father would hand his hungry child something worthless shaped like food.

Jesus uses that obvious cruelty to make his point land harder.

If sinful people still would not do this, God certainly will not either.

🪨 A stone could resemble a loaf of bread
💔 No loving father would trick a hungry child
👪 This cruelty makes the point obvious
📖 God is even less likely to disappoint

## 🐍 Will He For A Fish Give Him A Serpent?

Certain eels found in the Sea of Galilee could resemble a fish at first glance.

A serpent handed to a hungry child instead of a fish could be deadly.

The comparison again shows an absurd, cruel substitute.

No reasonable father would ever make that trade.

🐟 Some eels could look similar to fish
🐍 A serpent would be a deadly substitute
😱 The comparison shows an absurd cruelty
📖 No father would make that trade

## 🦂 Will He Offer Him A Scorpion?

A scorpion curled into a ball could resemble a small pale egg.

Its sting could seriously injure a small child.

This is the third version of the same impossible trade.

Jesus repeats the pattern three times so no one misses it.

🦂 A curled scorpion could resemble an egg
💢 Its sting could seriously injure a child
🔁 This is the third version of the trade
📖 Jesus repeats the point three times

## 💭 If Ye Then, Being Evil, Know How To Give Good Gifts

Being evil here does not mean every parent is wicked on purpose.

It means even flawed, selfish people still care for their own children.

Jesus is building a lesser to greater argument.

If imperfect people manage this much love, perfect love will do far more.

💭 Evil here means flawed, not monstrous
❤️ Even flawed people love their children
📈 This builds a lesser to greater argument
📖 Perfect love will do far more

## 🕊️ How Much More Shall Your Heavenly Father Give The Holy Spirit

This verse is the whole point of the passage.

A parallel version in Matthew ends with good things in general.

Luke narrows that same promise to one specific gift, the Holy Spirit.

Prayer here is mainly about receiving God's own presence.

🎯 This verse is the whole point
📚 Matthew's version says good things in general
🕊️ Luke narrows the gift to the Holy Spirit
➡️ Prayer is about receiving God's presence

# Luke 11:14-19
# 👹 A House Divided
---
## 🤐 He Was Casting Out A Devil, And It Was Dumb

Dumb here means unable to speak, not lacking intelligence.

The spirit had silenced the man it was tormenting.

The miracle is noticed by everyone because the man could suddenly speak.

A long silence that had trapped someone was broken in a moment.

🤐 Dumb means unable to speak
👹 The spirit had silenced the man
😮 Everyone noticed him suddenly speaking
📖 A long silence broke in a moment

## 👹 He Casteth Out Devils Through Beelzebub

Beelzebub was a name used for a pagan god, later applied to Satan himself.

The accusation claims Jesus works for the ruler of demons, not against him.

It is the most serious insult his enemies could level at him.

They cannot deny the miracle, so they attack its source instead.

👹 Beelzebub names the ruler of demons
⚠️ The accusation says Jesus serves evil
😡 It was the harshest insult available
📖 They attacked the source, not the miracle

## 🧪 Tempting Him, Sought Of Him A Sign From Heaven

Tempting here means testing him to find a reason to accuse him.

They had already watched him cast out a demon in front of them.

Asking for another sign was not honest curiosity.

It was a trap dressed up as a request.

🧪 Tempting means testing to find fault
👀 They had already seen a miracle
🪤 Asking for a sign was a trap
📖 It was not honest curiosity

## 🏚️ Every Kingdom Divided Against Itself Is Brought To Desolation

Desolation means being left ruined and empty.

Jesus answers with simple logic before any theology.

A country or a household fighting itself cannot stand for long.

He lets that common sense set up the argument that follows.

🏚️ Desolation means left ruined and empty
🏛️ A divided kingdom cannot stand for long
🏠 The same is true of a household
📖 Common sense sets up the argument

## ⚔️ If Satan Also Be Divided Against Himself

If Satan were fighting his own demons, his whole kingdom would collapse.

The accusation against Jesus does not actually make sense.

Casting out a demon cannot be evidence of serving that same demon's master.

Jesus exposes the contradiction hiding inside the insult.

⚔️ A divided Satan would destroy his own kingdom
🙅 The accusation does not actually make sense
🔄 Casting out a demon is not loyalty
📖 Jesus exposes the hidden contradiction

## 👳 By Whom Do Your Sons Cast Them Out?

Some of Jesus's own accusers had followers who also practiced exorcism.

If Jesus needed Satan's power to cast out demons, so would they.

Jesus turns their own argument back onto their own people.

He lets their inconsistency speak for itself.

👳 Some accusers had their own exorcists
🔄 The same logic would condemn their own people
🎯 Jesus turns the argument back on them
📖 Their inconsistency speaks for itself

# Luke 11:20-23
# 👑 The Kingdom Has Arrived
---
## 👆 With The Finger Of God

The finger of God is an old phrase for God's direct, personal power.

Egyptian magicians used this same phrase back in the book of Exodus.

They used it once they could no longer copy Moses's miracles.

Jesus claims that same unmistakable, hands on power for himself.

👆 Finger of God means direct, personal power
📚 Exodus magicians used this same phrase
🪄 They used it when their tricks ran out
📖 Jesus claims that same power for himself

## 👑 The Kingdom Of God Is Come Upon You

This is not a prediction about a distant future kingdom.

Jesus says the kingdom has already arrived in what just happened.

Every demon cast out is a small piece of that larger rule breaking through.

God's reign was not an idea, it was happening in front of them.

👑 This is not about a distant future
⏰ The kingdom had already arrived
🧩 Each miracle was a piece of that rule
📖 God's reign was happening in front of them

## 💪 A Strong Man Armed Keepeth His Palace

The strong man in this picture stands for Satan guarding his territory.

His weapons and goods represent the hold he keeps over people.

A stronger man coming to overpower him pictures Jesus himself.

Jesus is not sneaking in, he is overpowering a guarded enemy.

💪 The strong man pictures Satan guarding his hold
🗡️ His armor pictures his grip on people
👊 A stronger man pictures Jesus overpowering him
📖 Jesus overpowers a guarded enemy, not sneaks in

## ⚖️ He That Is Not With Me Is Against Me

This line closes out the whole argument with one hard statement.

There is no safe, neutral position toward Jesus in this moment.

Watching the miracle and still refusing to believe counts as opposition.

Gathering with Christ or scattering against him are the only two options.

⚖️ There is no neutral position here
🙈 Watching and still refusing counts as opposition
🤝 Gathering with Christ is the only safe side
📖 Every person scatters or gathers with him

# Luke 11:24-26
# 🏚️ The Empty House
---
## 🏜️ Walketh Through Dry Places, Seeking Rest

Dry, empty places pictured a wilderness without water or life.

Unclean spirits were pictured as restless without a person to inhabit.

The spirit searches for a new home the moment it is forced out.

An exorcism alone does not guarantee lasting freedom.

🏜️ Dry places pictured a lifeless wilderness
👻 Spirits were pictured as restless without a host
🔎 It searches for a new home at once
📖 An exorcism alone is not lasting freedom

## 🧹 He Findeth It Swept And Garnished

Garnished means cleaned up and decorated, made to look presentable.

The man had been delivered, but the empty space was never filled with anything new.

A clean house that stays empty is still an open invitation.

Removing something bad is not the same as replacing it with something good.

🧹 Garnished means cleaned up and decorated
🏠 The space stayed empty after deliverance
🚪 An empty house is still an open invitation
📖 Removing evil is not the same as filling

## 🔢 Seven Other Spirits More Wicked Than Himself

Seven in scripture often signals completeness, a full and total measure.

Seven spirits worse than the first means total, overwhelming corruption.

The man ends up in a far worse condition than before he was healed.

A dramatic rescue can be followed by an even deeper fall.

🔢 Seven often signals completeness in scripture
🔥 Seven worse spirits means total corruption
📉 The man ends up worse than before
📖 A rescue can be followed by deep failure

## 📉 The Last State Of That Man Is Worse Than The First

This warning was first aimed at Israel's own generation watching Jesus work miracles.

Seeing a miracle without real, lasting change was not enough.

A life cleared of one problem still needs something to fill it.

Jesus points past the exorcism itself toward the deeper question of what comes next.

📢 This warned Israel's own generation
👀 Seeing a miracle is not enough
🧩 An empty life still needs filling
📖 What fills the space matters most

# Luke 11:27-28
# 🤱 Blessed Is The Womb
---
## 🍼 Blessed Is The Womb That Bare Thee

This woman shouts out a blessing on Jesus's mother in the middle of the crowd.

Praising a mother through her son was a common form of public honor.

Paps is an old word for the breasts that nursed a child.

She is praising Mary's role, not making a statement about Jesus himself.

🗣️ She shouted a blessing over the crowd
👩 Praising a mother through her son was common
🍼 Paps is an old word for nursing
📖 She praised Mary's role, not Jesus directly

## 🔄 Blessed Are They That Hear The Word Of God, And Keep It

Jesus does not reject the compliment, he redirects it.

Being related to Jesus by blood was never the greater blessing.

Hearing God's word and actually obeying it matters more than ancestry.

Anyone who listens and obeys can share in that same blessing, not only Mary.

🔄 Jesus redirects the compliment
🩸 Blood relation was never the greater blessing
👂 Hearing and obeying matters more than ancestry
📖 Anyone who obeys can share this blessing

# Luke 11:29-32
# 🐋 The Sign Of Jonas
---
## 🙄 This Is An Evil Generation: They Seek A Sign

Evil generation names the crowd's pattern of demanding proof instead of trusting.

They had already watched real miracles happen in front of them.

Asking for yet another sign exposes unbelief, not honest searching.

Jesus refuses to perform on demand.

🙄 Evil generation names a pattern of demanding proof
👀 They had already watched real miracles
❓ Asking for more exposed unbelief
📖 Jesus refuses to perform on demand

## 🐋 The Sign Of Jonas The Prophet

Jonah spent three days inside a great fish before coming out alive.

Jesus points to that story as a preview of his own coming death and rising again.

The only sign this generation will get is one they will not recognize right away.

It will make sense after the resurrection, not before it.

🐋 Jonah spent three days inside a great fish
⚰️ This pictured Jesus's coming death and rising again
🔮 It was a sign not yet recognized
📖 It would make sense after the resurrection

## 👸 The Queen Of The South Shall Rise Up In The Judgment

The queen of the south refers to the queen of Sheba.

Sheba sat far to the south, likely in modern day Yemen or Ethiopia.

She traveled a long, costly distance just to hear Solomon's wisdom firsthand.

Jesus says someone greater than Solomon stands here.

This crowd will not even walk across the room.

👸 Queen of the south means queen of Sheba
🗺️ Sheba sat far to the south
🚶 She traveled far just to hear Solomon
📖 Someone greater than Solomon stands here

## 🏙️ The Men Of Nineve Shall Rise Up In The Judgment

Nineveh was a violent pagan city that Jonah was sent to warn.

Its people repented right after hearing Jonah's short, reluctant message.

Jesus delivered a far greater message in person, not through a reluctant stranger.

Yet this generation will not repent the way Nineveh once did.

🏙️ Nineveh was a violent pagan city
📢 Its people repented after one short warning
🙋 Jesus delivered a far greater message in person
📖 This generation refused to repent like Nineveh did

# Luke 11:33-36
# 🕯️ The Light Of The Body
---
## 🕯️ No Man, When He Hath Lighted A Candle, Putteth It In A Secret Place

A lit candle only does its job when people can actually see it.

Hiding a lamp in a cellar or under a basket wastes its entire purpose.

A candlestick raises the light so it reaches the whole room.

Jesus uses this everyday picture to introduce a point about the eye.

🕯️ A lamp only works where it is seen
🫙 Hiding it under a basket wastes its purpose
📏 A candlestick raises light for the whole room
📖 This picture introduces a point about the eye

## 👁️ The Light Of The Body Is The Eye

In this picture the eye works like a window letting light into a house.

A healthy eye lets light fill the whole body.

A damaged eye leaves the body in darkness no matter how bright the sun is.

Jesus is not talking about eyesight, he is talking about spiritual perception.

👁️ The eye works like a window
☀️ A healthy eye fills the body with light
🌑 A damaged eye leaves it dark
📖 This is about spiritual perception, not eyesight

## 👁️ When Thine Eye Is Single

A single eye was an old idiom for a generous, clear hearted focus.

An evil eye was a common idiom for envy, greed, or stinginess.

The same word for eye could describe either a generous or a grasping heart.

What a person focuses on reveals what fills the rest of them.

👁️ Single eye meant a generous, clear focus
😒 Evil eye meant envy or stinginess
🔀 One word could describe either heart
📖 Focus reveals what fills a person

## ⚠️ Take Heed That The Light Which Is In Thee Be Not Darkness

This is a warning about self deception.

A person can assume they are full of light while actually sitting in darkness.

Jesus is asking his listeners to check their own inner focus honestly.

What feels like insight can sometimes be the opposite.

⚠️ This warns about self deception
🤔 A person can wrongly assume they have light
🔍 Jesus asks for honest self examination
📖 What feels like insight can be the opposite

## 🌟 The Whole Shall Be Full Of Light

This verse pictures a candle's bright shining filling an entire room.

A generous, clear hearted focus can fill a whole life the same way.

Nothing stays hidden or dark when that kind of focus is present.

The eye that gives light to the body becomes a picture of the heart.

🕯️ Pictures a candle filling a whole room
❤️ A clear focus can fill a whole life
🌟 Nothing stays hidden when this focus is present
📖 The eye for the body pictures the heart

# Luke 11:37-41
# 🍽️ Dining With A Pharisee
---
## 🍽️ A Certain Pharisee Besought Him To Dine With Him

An invitation to dine from a Pharisee was also a chance to question Jesus closely.

Meals in this culture were long, seated, and social, not quick or private.

Accepting the invitation meant Jesus would be watched the entire time.

Jesus accepts anyway, even knowing the scrutiny that came with it.

🍽️ Dining invitations doubled as chances to question him
🛋️ Meals were long, social, and public
👀 Jesus would be watched the whole time
📖 He accepted despite the scrutiny

## 🚿 He Marvelled That He Had Not First Washed Before Dinner

This washing was not about cleanliness in the modern sense.

It was a ceremonial ritual meant to remove symbolic uncleanness before a meal.

Skipping it in public was a visible break from expected religious practice.

The Pharisee's surprise was about tradition, not dirt.

🚿 This was ceremonial, not hygiene
📿 It removed symbolic uncleanness before meals
👁️ Skipping it was a visible break from tradition
📖 The surprise was about tradition, not dirt

## 🍵 Ye Make Clean The Outside Of The Cup And The Platter

Pharisees were known for careful, visible rules about washing dishes.

Jesus uses that habit as a picture of their whole approach to holiness.

They polish what other people can see.

What sits unseen inside gets no attention at all.

🍵 Pharisees were known for careful dish washing
🖼️ Jesus turns the habit into a picture
👀 They polish only what others can see
📖 The unseen inside gets no attention

## 🦅 Your Inward Part Is Full Of Ravening And Wickedness

Ravening means a greedy, predatory hunger that takes without care for others.

Jesus says the inside does not match the polished outside at all.

A clean cup can still hold something rotten.

Outward religious performance was hiding real greed underneath.

🦅 Ravening means greedy, predatory hunger
🍵 A clean cup can still hold rot
🎭 Outward performance hid real greed
📖 Appearance and inside did not match

## 🧑 Did Not He That Made That Which Is Without Make That Which Is Within Also

God made the whole person, not only the visible parts.

Caring for appearance while ignoring the heart misses half of what God made.

The same maker who cares about the outside cares just as much about the inside.

True holiness cannot stop at what other people can see.

🧑 God made the whole person
👀 Caring only for appearance misses half of it
❤️ God cares about the inside too
📖 Holiness cannot stop at what others see

## 💰 Give Alms Of Such Things As Ye Have

Alms means money or goods given to help people in need.

Jesus offers a real fix instead of only a complaint.

Generosity that flows from the inside proves the inside has actually changed.

A heart that gives freely is the clean heart he has been describing all along.

💰 Alms means giving to those in need
🛠️ Jesus offers a fix, not just a complaint
❤️ Generosity proves real inward change
📖 A giving heart is the clean heart

# Luke 11:42-44
# ⚖️ Woe Unto You, Pharisees
---
## 🌿 Ye Tithe Mint And Rue And All Manner Of Herbs

Tithing meant giving a tenth of produce, originally for larger crops like grain.

Mint and rue were small kitchen garden herbs, barely worth noticing.

Pharisees extended the rule down to the smallest possible measure.

Jesus is not condemning careful obedience by itself.

🌿 Tithing meant giving a tenth of produce
🌱 Mint and rue were tiny garden herbs
🔬 Pharisees measured obedience down to the smallest detail
📖 Careful obedience itself is not the problem

## ⚖️ Pass Over Judgment And The Love Of God

Judgment here means practicing real fairness toward other people.

Pharisees tracked tiny herb amounts while ignoring justice and love entirely.

Jesus names the real priorities they were skipping.

Precision about small things cannot replace faithfulness in the things that matter most.

⚖️ Judgment means practicing real fairness
💔 Love and justice were ignored entirely
🎯 Jesus names what they were actually skipping
📖 Small precision cannot replace real faithfulness

## 🪑 Ye Love The Uppermost Seats In The Synagogues

Synagogue seating followed a visible order of honor and status.

The uppermost seats faced the crowd and sat nearest the sacred scrolls.

Loving that seat meant loving the public status that came with it.

The complaint is about craving honor, not about sitting down.

🪑 Synagogue seating followed a visible order
📜 Top seats faced the crowd near the scrolls
🏆 Loving the seat meant loving the status
📖 The issue was craving honor, not seating

## 🏪 Greetings In The Markets

Markets were crowded public places where everyone could see who greeted whom.

Being greeted with an honored title in public confirmed a person's status.

Pharisees wanted that recognition everywhere they went, not only in worship.

Jesus exposes a hunger for honor that followed them into ordinary life.

🏪 Markets were crowded, very public places
🙇 Honored greetings confirmed a person's status
👣 They wanted this recognition everywhere
📖 Their hunger for honor followed them daily

## ⚰️ Ye Are As Graves Which Appear Not

Touching a grave made a person ceremonially unclean under Jewish law.

Graves were often marked clearly so people could avoid stepping on them.

An unmarked grave could make someone unclean without them even knowing it.

Jesus says these leaders spread corruption people cannot even see coming.

⚰️ Touching a grave made someone unclean
🚧 Graves were marked so people could avoid them
🙈 An unmarked grave caused unknown uncleanness
📖 Their corruption spread without people noticing

# Luke 11:45-52
# 📜 Woe Unto You Lawyers
---
## 📜 Master, Thus Saying Thou Reproachest Us Also

A lawyer in this setting was an expert trained in the details of Mosaic law.

Lawyers and Pharisees often worked closely together but were not identical groups.

This lawyer realizes Jesus's words about Pharisees land on his own profession too.

His objection confirms he understood exactly what Jesus meant.

📜 A lawyer was an expert in Mosaic law
🤝 Lawyers and Pharisees often worked together
🎯 He realized the words applied to him too
📖 His objection proves he understood Jesus

## 📚 Ye Lade Men With Burdens Grievous To Be Borne

Lawyers added layers of detailed rules on top of God's original law.

Grievous to be borne means painfully heavy, almost impossible to carry.

These added rules piled weight onto ordinary people's daily lives.

The lawyers who created these burdens did not lift a finger to help carry them.

📚 Lawyers added layers of extra rules
⚖️ Grievous means painfully heavy to carry
😩 Ordinary people carried the heaviest weight
📖 The lawyers never helped carry it

## 🪦 Ye Build The Sepulchres Of The Prophets, And Your Fathers Killed Them

A sepulchre is a tomb or burial place, often cut from stone.

Building honored tombs for dead prophets looked like loyalty and respect.

Those same prophets had been rejected and killed by earlier generations.

Jesus says this honor is really just agreement with what their fathers did.

🪦 A sepulchre is a stone tomb
🙇 Building tombs looked like honor and respect
⚔️ Those prophets were killed by earlier generations
📖 Honoring tombs was secretly agreeing with the killings

## 🗣️ Therefore Also Said The Wisdom Of God, I Will Send Them Prophets And Apostles

The wisdom of God here speaks almost like its own voice in scripture.

God kept sending prophets and apostles across generations despite rejection.

Sending more messengers after past ones were killed shows patience, not naivety.

God's pattern of reaching out never stopped, even after repeated rejection.

🗣️ Wisdom of God speaks like its own voice
📨 God kept sending messengers across generations
🕊️ More messengers came after past ones were killed
📖 God's patience never stopped despite rejection

## 🩸 The Blood Of Abel Unto The Blood Of Zacharias

Abel was the first murder victim recorded in the Bible, killed by his brother Cain.

Zacharias was a priest killed between the altar and the temple, recorded much later.

In the Hebrew Bible's own ordering, those two deaths mark the first and last murders recorded.

From Abel to Zacharias functions like the phrase from A to Z for this generation's guilt.

🩸 Abel was the Bible's first murder victim
⚔️ Zacharias was a priest killed at the temple
📚 These mark the first and last recorded murders
➡️ This generation is charged with the whole pattern

## 🔑 Ye Have Taken Away The Key Of Knowledge

The key of knowledge pictures access to real understanding of God's word.

Lawyers were trained to open scripture's meaning for the whole community.

Instead they used their training to lock true understanding away.

They kept for themselves what they should have unlocked for others.

🔑 The key pictures access to real understanding
📖 Lawyers were trained to open scripture's meaning
🔒 Instead they locked true understanding away
➡️ They kept for themselves what others needed

## 🚪 Them That Were Entering In Ye Hindered

Some people were genuinely trying to understand and follow God.

The lawyers' own example and teaching actively blocked that search.

Refusing truth is one failure, but blocking others from it is a second, worse one.

Jesus names both failures together in the same breath.

🚪 Some people were genuinely trying to enter
🚧 Lawyers actively blocked that search
⚠️ Refusing truth and blocking others are two failures
📖 Jesus names both failures together

# Luke 11:53-54
# 🪤 Laying Wait For Him
---
## 🔥 The Scribes And The Pharisees Began To Urge Him Vehemently

Vehemently means with intense, forceful pressure.

This was not calm theological debate anymore.

Jesus's public rebuke of the Pharisees and lawyers had provoked real anger.

Their response confirms how directly his words had landed.

🔥 Vehemently means intense, forceful pressure
🗣️ This was no longer calm debate
😠 His rebuke had provoked real anger
📖 Their anger confirms his words had landed

## 🪤 Laying Wait For Him, And Seeking To Catch Something Out Of His Mouth

Laying wait means setting a deliberate ambush or an ongoing trap.

They were listening only to find words they could twist into a charge.

This marks a clear turning point toward the growing plot against Jesus.

The conflict that fills the rest of Luke's gospel begins to build from here.

🪤 Laying wait means setting a deliberate trap
👂 They listened only to find a charge
📈 This marks a turning point in the conflict
📖 The plot against Jesus begins to build here
`.trim();

export const LUKE_ELEVEN_PERSONAL_SECTIONS = parseLukeElevenRawNotes(LUKE_ELEVEN_RAW_NOTES);
