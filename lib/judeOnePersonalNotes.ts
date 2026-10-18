export type JudeOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudeOneRawNotes(rawText: string): JudeOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudeOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jude\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jude 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jude\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Jude\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jude 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jude 1:${startVerse}` : `Jude 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Jude 1 sections, received " + sections.length);
  }

  return sections;
}

const JUDE_ONE_RAW_NOTES = `# Jude 1:1-2
# 🕊️ Jude Greets The Called
---
## 🙇 The Servant Of Jesus Christ

"Servant" here means a bondservant, someone owned completely by a master.

Jude could have called himself the brother of Jesus instead.

He was likely one of Mary's other sons, Jesus own half brother.

He skips that claim and names himself a slave of Christ instead.

Standing before Jesus, blood family counted for less than belonging to Him.

🙇 Servant means a bondservant, fully owned
👨‍👦 Jude was likely Jesus own half brother
🙅 He does not claim that family tie
📖 Belonging to Christ outranks blood family here

---
## 👨‍👦 Brother Of James

This James is not one of the twelve apostles.

He is the brother who led the church in Jerusalem.

He is also the writer of the book of James.

Naming this brother was enough to identify Jude to the first readers.

👨‍👦 This James led the church in Jerusalem
📜 He wrote the book of James
🙋 Jude needed no other introduction than this
📖 Family and ministry connect these two brothers

---
## ✨ Them That Are Sanctified By God The Father

"Sanctified" means set apart as belonging to God alone.

It does not mean these people had become flawless.

It means God had already claimed them as His own possession.

That claim came from the Father, before anything else is said about them.

✨ Sanctified means set apart as God's own
🙅 It does not mean flawless living
🤲 The Father makes the claim first
📖 Belonging comes before anything else is said

---
## 🛡️ Preserved In Jesus Christ, And Called

"Preserved" means kept safe through something, not merely rescued once.

Jude pictures believers held secure in Christ the whole way through.

"Called" means summoned by God, not simply someone who decided to believe.

God initiates that call, and Christ keeps what the Father calls.

🛡️ Preserved means kept safe all the way
🧭 This keeping happens inside Christ himself
📣 Called means summoned by God first
📖 God calls, and Christ keeps what He calls

---
## 🎁 Mercy Unto You, And Peace, And Love, Be Multiplied

"Mercy" means compassion shown to people who need it badly.

"Peace" means real wholeness with God, not just calm feelings.

"Love" rounds out the greeting, where most letters stop at two gifts.

"Multiplied" pictures these gifts growing larger, not simply staying the same.

🎁 Mercy means compassion for real need
☮️ Peace means wholeness with God
❤️ Love is a third gift added here
📖 These gifts are meant to grow

# Jude 1:3-4
# ⚔️ A Warning Jude Did Not Plan To Write
---
## 🤝 Of The Common Salvation

"Common" here means shared equally by every believer.

It is not a lesser salvation, and it is not a private one.

Every believer Jude writes to holds the very same rescue.

🤝 Common means shared, not private
⚖️ It is not a lesser salvation
👥 Every believer shares this one rescue
📖 Salvation unites instead of ranking believers

---
## ⚔️ Earnestly Contend For The Faith

"Contend" pictures a hard physical struggle, like wrestling or fighting.

Jude is not asking for a polite discussion here.

"The faith" means the actual body of teaching handed down about Christ.

Defending true teaching was going to take real effort and real risk.

⚔️ Contend pictures a hard physical struggle
🙅 This is not a polite discussion
📜 The faith means settled teaching about Christ
📖 Defending truth takes real effort

---
## 📦 Once Delivered Unto The Saints

"Delivered" means handed over complete, like a finished package.

The faith was not still being invented when Jude wrote this.

It had already been given once, in full, to God's people.

Nothing new needed to be added to it.

📦 Delivered means handed over complete
🏁 The faith was already finished, not evolving
👥 It was given once to all the saints
📖 Nothing new needed to be added

---
## 🚪 Certain Men Crept In Unawares

"Crept in" describes sneaking somewhere without being noticed.

These false teachers did not announce themselves as enemies.

They blended into the church community first, then caused damage.

Danger here came from the inside, not from an outside attack.

🚪 Crept in means sneaking in unnoticed
🎭 They did not look like enemies at first
🏠 The danger came from inside the church
📖 Hidden threats are harder to spot early

---
## 🔓 Turning The Grace Of Our God Into Lasciviousness

"Lasciviousness" means giving in to sexual or moral looseness without restraint.

These men twisted God's free kindness into an excuse for sin.

Grace was never meant to remove the need for self control.

They used a true gift of God to justify a lie.

🔓 Lasciviousness means loose, unrestrained living
🔄 They turned grace into an excuse
🙅 Grace was never meant to remove self control
📖 A true gift was twisted into a lie

---
## 🙅 Denying The Only Lord God, And Our Lord Jesus Christ

This denial was not loud or obvious at first.

It likely showed up in how they lived, not just in words they said.

Their actions rejected Christ's authority even while they stayed inside the church.

Denying Christ with a life is still denying Christ.

🙅 Denial here was lived out, not just spoken
🎭 They stayed inside the church while denying Him
👑 Christ's authority was rejected by how they lived
📖 A life can deny Christ too

# Jude 1:5-7
# 🔥 Three Old Warnings Jude Will Not Let Them Forget
---
## 🧠 I Will Therefore Put You In Remembrance

Jude is not teaching something brand new in this section.

He is reminding his readers of stories they already knew well.

Old warnings often need repeating more than new ideas need inventing.

🧠 Jude is reminding, not introducing new teaching
📚 These stories were already familiar to his readers
🔁 Old warnings need repeating, not replacing
📖 A reminder can matter just as much

---
## 🌊 Destroyed Them That Believed Not

This points back to Israel's exodus out of Egypt.

God rescued that whole generation from slavery by a mighty hand.

Many of those same people still refused to trust Him afterward.

Being rescued once did not guarantee they would reach the promised land.

🌊 This points back to the exodus from Egypt
🙌 God rescued the whole generation first
🙅 Many of them still refused to trust Him
📖 Rescue once does not guarantee the whole journey

---
## 👼 Kept Not Their First Estate, But Left Their Own Habitation

"First estate" means the original position God had given them.

"Habitation" means the proper dwelling place assigned to them.

Jude points to angels who abandoned the place God had set for them.

Even angels were not exempt from consequences for rebellion.

👼 First estate means their original, God given place
🏠 Habitation means where they were meant to stay
⚠️ Even angels faced consequences for leaving it
📖 No rank is too high to rebel

---
## ⛓️ Reserved In Everlasting Chains Under Darkness

"Reserved" means held in custody, waiting for something still to come.

These angels are not yet serving their final punishment.

They are being kept, like prisoners awaiting a set court date.

"The great day" names a specific future judgment still ahead.

⛓️ Reserved means held in custody for later
📅 Final judgment has not happened yet
🌑 Darkness pictures their current confinement
📖 A set day of judgment is still coming

---
## 🏚️ Sodom And Gomorrha...Set Forth For An Example

Sodom and Gomorrha were real cities destroyed in Genesis chapter nineteen.

"Strange flesh" describes pursuing relationships outside what God had created as natural.

Jude calls their destruction a lasting example, not a forgotten old story.

What happened to them was meant to warn every later generation.

🏚️ Sodom and Gomorrha were real, destroyed cities
🚫 Strange flesh means relationships outside God's design
📣 Their fall became a lasting example
📖 Old judgment still warns later generations

---
## 🔥 Suffering The Vengeance Of Eternal Fire

"Vengeance" here means a just penalty, not uncontrolled rage.

"Eternal fire" pictures judgment that does not simply burn out.

The cities themselves are long gone, but the warning they carry is not.

🔥 Vengeance means a just penalty, not blind rage
♾️ Eternal fire pictures judgment without an end
🏺 The cities are gone, the warning remains
📖 Justice outlasts the thing that was judged

# Jude 1:8-10
# 👁️ Dreamers Who Mock What They Do Not Understand
---
## 💭 Likewise Also These Filthy Dreamers Defile The Flesh

"Filthy dreamers" describes people led by their own sinful fantasies, not truth.

They let private imagination excuse real, physical wrongdoing.

Jude compares these present false teachers to the old examples just given.

💭 Filthy dreamers follow sinful imagination, not truth
🪞 They let imagination excuse real wrongdoing
🔗 Jude links them straight to the old examples
📖 Fantasy that excuses sin still defiles the body

---
## 👑 Despise Dominion, And Speak Evil Of Dignities

"Dominion" and "dignities" both point to rightful authority and rank.

These false teachers mocked leaders and powers they had no right to mock.

Pride made them treat legitimate authority as something beneath them.

👑 Dominion and dignities both mean rightful authority
😤 They mocked authority they had none over
🙄 Pride made them look down on it
📖 Rejecting rightful authority is rejecting God's order

---
## ⚖️ Michael The Archangel...Durst Not Bring Against Him A Railing Accusation

Jude references an old Jewish tradition about Michael and Moses body.

Michael the archangel is a being of enormous spiritual authority.

Even Michael refused to hurl a reckless insult at the devil himself.

"Durst not" means he did not dare, out of pure restraint, not fear.

⚖️ This draws on an old Jewish tradition
💪 Michael held enormous spiritual authority
🤐 He still refused to insult the devil recklessly
📖 Even great power restrained its own words

---
## 🗣️ The Lord Rebuke Thee

Instead of insulting the devil himself, Michael left judgment to God.

"The Lord rebuke thee" hands the whole matter over to a higher authority.

Michael's restraint contrasts sharply with the false teachers mocking authority freely.

🗣️ Michael handed judgment over to God
🙅 He left that judgment to God
📊 This directly contrasts the reckless false teachers
📖 Restraint before power still honors God's authority

---
## 🐴 What They Know Not...They Corrupt Themselves

These false teachers mocked spiritual powers they did not actually understand.

"As brute beasts" compares them to animals acting on pure instinct.

Mocking what they could not grasp ended up corrupting them from within.

🐴 Brute beasts act on instinct, not understanding
🙄 They mocked powers they did not grasp
💔 That mocking corrupted them from the inside
📖 Ignorance mixed with pride destroys the mocker

# Jude 1:11-13
# 🌊 Three Old Names And Four Broken Pictures
---
## 🩸 The Way Of Cain

Cain killed his own brother Abel out of jealousy, in Genesis chapter four.

"The way of Cain" names a pattern of resentment that turns violent.

Jude ties these false teachers to that same old, destructive pattern.

🩸 Cain killed his own brother out of jealousy
🧭 His way became a lasting pattern of sin
🔗 Jude connects the false teachers to that pattern
📖 Old sin patterns still repeat in new people

---
## 💰 The Error Of Balaam

Balaam was a prophet hired to curse Israel for money, in Numbers 22 through 24.

He tried to use his spiritual gift for personal profit instead.

"For reward" names greed as the engine behind his error.

💰 Balaam was a prophet hired to curse Israel
🎯 He tried to profit from his spiritual gift
🪙 Reward names greed as the real motive
📖 Spiritual gifts used for profit become corrupted

---
## 🗣️ The Gainsaying Of Core

"Core" is the King James spelling of Korah, from Numbers chapter sixteen.

Korah led a rebellion against Moses leadership in the wilderness.

"Gainsaying" means arguing against rightful authority on purpose.

Korah and his followers were swallowed by the earth as judgment.

🗣️ Core is the old spelling of Korah
⚔️ Korah rebelled against Moses leadership
🙅 Gainsaying means arguing against rightful authority
📖 That rebellion ended in sudden judgment

---
## 🍽️ Spots In Your Feasts Of Charity

Early churches shared communal meals called feasts of charity, or love feasts.

"Spots" pictures a stain that ruins something meant to be clean.

These false teachers sat among believers while secretly corrupting the gathering.

🍽️ Feasts of charity were shared church meals
🩹 Spots pictures a stain on something clean
🎭 They corrupted the gathering from the inside
📖 A hidden flaw can spoil a shared meal

---
## ☁️ Clouds They Are Without Water

Clouds normally promise rain to a dry, thirsty land.

These false teachers looked like they carried spiritual nourishment.

They promised much and delivered absolutely nothing real.

☁️ Clouds usually promise needed rain
🙅 These clouds carried nothing inside them
🎭 They looked promising but delivered nothing
📖 Empty promises still look impressive from a distance

---
## 🌳 Trees Whose Fruit Withereth, Without Fruit, Twice Dead, Plucked Up By The Roots

A fruit tree exists to produce fruit for someone to eat.

"Twice dead" pictures a tree dead on the outside and dead at the root.

"Plucked up by the roots" means there is no coming back to life.

🌳 A fruit tree exists to bear fruit
💀 Twice dead means dead inside and out
🚫 Plucked up means no recovery is possible
📖 A fruitless life can run out of chances

---
## 🌊 Raging Waves Of The Sea, Foaming Out Their Own Shame

A storm driven sea throws up foam full of debris and filth.

That foam is simply whatever ugliness the wave happened to carry.

These teachers could not hide what was really inside them for long.

🌊 A storm sea throws up foam and debris
🗑️ The foam is whatever filth the wave carries
🎭 Hidden corruption eventually surfaces in the open
📖 What is inside a person eventually shows

---
## ⭐ Wandering Stars, To Whom Is Reserved The Blackness Of Darkness For Ever

Ancient sailors depended on fixed stars to find their way at night.

A star that wanders off course leads a traveler somewhere dangerous.

These teachers were never a safe guide for anyone following them.

⭐ Fixed stars once guided travelers at night
🧭 A wandering star leads someone off course
⚠️ These teachers were never safe to follow
📖 A false guide leads others toward real danger

# Jude 1:14-16
# 📜 Enoch Already Saw This Coming
---
## 👴 Enoch Also, The Seventh From Adam, Prophesied Of These

Enoch appears early in Genesis chapter five, several generations before the flood.

"The seventh from Adam" places him precisely in that family line.

Jude quotes a prophecy credited to Enoch, from outside the usual Old Testament books.

👴 Enoch lived several generations before the flood
🔢 The seventh from Adam marks his exact place
📜 Jude quotes a prophecy credited to him
📖 Even an ancient voice warned of this

---
## ⚡ Behold, The Lord Cometh With Ten Thousands Of His Saints

"Ten thousands" pictures an enormous, uncountable company arriving together.

This prophecy describes the Lord returning in open, visible power.

He does not come alone, but surrounded by His own people.

⚡ Ten thousands pictures an uncountable company
👑 The Lord returns in open, visible power
👥 His own people arrive together with Him
📖 Christ's return will not be quiet or hidden

---
## ⚖️ To Execute Judgment Upon All

"Execute" means to actually carry out a sentence, not merely announce it.

This judgment reaches everyone, not only the false teachers already named.

The coming day settles every account, not just the obvious ones.

⚖️ Execute means carrying out judgment
🌍 This judgment reaches everyone, not only teachers
🧾 Every account gets settled on that day
📖 No one quietly slips past this judgment

---
## 😤 These Are Murmurers, Complainers, Walking After Their Own Lusts

"Murmurers" complain in secret, mostly under their breath.

"Complainers" voice their dissatisfaction more openly to others.

Both patterns share the same root, serving personal desire instead of truth.

😤 Murmurers complain quietly, under their breath
📣 Complainers voice it more openly
🎯 Both chase personal desire over truth
📖 Hidden or loud, the root is the same

---
## 🎭 Great Swelling Words, Having Men's Persons In Admiration Because Of Advantage

"Great swelling words" describes speech puffed up beyond what it actually delivers.

These teachers flattered people on purpose, not out of genuine respect.

"Because of advantage" names the real motive underneath the flattery, personal gain.

🎭 Swelling words promise more than they deliver
🙇 They flattered people without real respect
💰 Advantage reveals the true motive, personal gain
📖 Flattery used for gain is still a lie

# Jude 1:17-19
# 🗝️ Remember What The Apostles Already Said
---
## 📣 Remember Ye The Words...Of The Apostles Of Our Lord Jesus Christ

Jude again points backward instead of forward here.

The apostles had already warned the church exactly what to expect.

Christian endurance often depends on remembering settled truth, not chasing something new.

📣 Jude points backward to settled teaching again
🧑‍🤝‍🧑 The apostles had already given this warning
🧠 Endurance often means remembering, not discovering
📖 Old warnings can prepare people for new trouble

---
## 😏 There Should Be Mockers In The Last Time

"Mockers" ridicule true teaching instead of honestly arguing against it.

"The last time" names the whole span between Christ's first and second coming.

Jude's readers should not have been caught off guard by this at all.

😏 Mockers ridicule truth instead of answering it
⏳ The last time spans both of Christ's comings
🔮 This mockery was already predicted ahead of time
📖 Expecting trouble helps a believer stand firm

---
## 🎯 Who Should Walk After Their Own Ungodly Lusts

"Walk after" describes an entire direction and pattern of life.

These mockers were not merely wrong in a few private opinions.

Their whole daily pattern of living followed personal desire instead of God.

🎯 Walk after describes a whole life direction
🙅 This was more than a few wrong opinions
🔁 Their daily pattern served desire, not God
📖 Direction reveals what someone truly serves

---
## 🚪 These Be They Who Separate Themselves

"Separate themselves" describes people who split the church apart on purpose.

They placed themselves above the rest of the believing community.

Unity was treated as optional, something they could discard for their own standing.

🚪 Separate themselves means splitting the church on purpose
👑 They placed themselves above the community
🙅 Unity was treated as optional to them
📖 Pride can fracture a community from within

---
## 🚫 Sensual, Having Not The Spirit

"Sensual" describes being ruled by physical appetite instead of anything higher.

These people lived entirely by instinct, with no deeper spiritual life guiding them.

Lacking the Spirit explains why their whole direction stayed so hollow.

🚫 Sensual means ruled by physical appetite
🧠 No deeper spiritual life guided them
🕳️ Lacking the Spirit explains their hollow direction
📖 Life without the Spirit has nothing steady

# Jude 1:20-23
# 🛠️ What Believers Are Actually Called To Do
---
## 🏗️ Building Up Yourselves On Your Most Holy Faith

After naming the false teachers, Jude finally turns to his real readers.

"Building up" pictures construction, laying one course of belief on another over time.

Spiritual growth here is active work, not something that happens automatically.

🏗️ Building up pictures ongoing construction
📈 Faith grows in layers over time
💪 This growth takes active, deliberate effort
📖 Steady building protects against the chaos just described

---
## 🙏 Praying In The Holy Ghost

"Praying in the Holy Ghost" means prayer shaped and empowered by God's own Spirit.

It is not primarily about using a particular style or formula of words.

The Spirit directs what believers actually need to bring before God.

🙏 This prayer is shaped by God's own Spirit
🗣️ Not about a particular style
🧭 The Spirit directs what believers truly need
📖 Real prayer depends on the Spirit, not technique

---
## ❤️ Keep Yourselves In The Love Of God

"Keep yourselves" places real responsibility on the believer, not only on God.

This is not about earning God's love in the first place.

It means staying close to a love that is already freely given.

❤️ Keep yourselves places real responsibility on believers
🎁 God's love here is already freely given
🧲 Staying close matters more than earning it
📖 Nearness to God's love is a daily choice

---
## 🌅 Looking For The Mercy Of Our Lord Jesus Christ Unto Eternal Life

"Looking for" pictures confident, forward looking hope, not nervous uncertainty.

Mercy here is not a one time event already finished.

It points ahead to Christ's return and the eternal life that follows.

🌅 Looking for pictures confident hope ahead
🤲 Mercy here is not already finished
♾️ Eternal life waits at the far end
📖 Hope keeps a believer facing forward

---
## 🤲 Of Some Have Compassion, Making A Difference

Not every struggling believer needs the exact same kind of help.

"Making a difference" means discerning what each specific situation actually requires.

Compassion here takes real wisdom, not just a single standard response.

🤲 Not every struggling person needs the same help
🧠 This calls for real discernment, not routine
⚖️ Wisdom shapes how compassion is actually given
📖 Discernment keeps compassion from becoming careless

---
## 🔥 Others Save With Fear, Pulling Them Out Of The Fire

"Pulling them out of the fire" pictures urgent, direct rescue from real danger.

"With fear" means approaching this rescue carefully, aware of its own risk.

Some situations call for urgency instead of a slow, careful conversation.

🔥 Pulling from fire pictures urgent rescue
⚠️ Fear here means careful, risk aware action
⏱️ Some situations call for real urgency
📖 Rescue sometimes outranks a slow conversation

---
## 🧥 Hating The Garment Spotted By The Flesh

A garment touched by certain uncleanness could spread that uncleanness further.

Jude pictures sin as something that can cling to a rescuer too.

Helping someone out of sin still requires real caution, not carelessness.

🧥 A spotted garment could spread uncleanness
🧲 Sin can cling to the rescuer
🛡️ Rescue still calls for real caution
📖 Compassion and caution are meant to work together

# Jude 1:24-25
# 👑 The Doxology That Closes Everything
---
## 🛡️ Now Unto Him That Is Able To Keep You From Falling

After every warning in this letter, Jude ends on God's own power.

"Able to keep" names a real, present ability, not just a hopeful wish.

The weight of standing firm shifts here from the reader onto God Himself.

🛡️ Able to keep names real, present power
🙅 This is not merely a hopeful wish
⚖️ The weight shifts from the reader to God
📖 Final security rests on God's ability, not ours

---
## ✨ To Present You Faultless Before The Presence Of His Glory

"Faultless" does not mean a believer never sinned at all.

It means standing before God with nothing left to be charged against them.

That presentation happens directly in the presence of God's own glory.

✨ Faultless means nothing left to be charged
👤 It does not mean a sinless history
👑 This happens in the presence of God's glory
📖 Christ finishes what no effort could finish alone

---
## 😄 With Exceeding Joy

"Exceeding" pictures joy that overflows past its normal, expected limits.

This is not a quiet relief at barely making it through.

Jude pictures a joy too large to be contained or held back.

😄 Exceeding pictures joy beyond normal limits
🙅 This is not quiet relief at barely surviving
🌊 The joy overflows, it does not just arrive
📖 Arrival before God is pictured as pure celebration

---
## 👑 To The Only Wise God Our Saviour

"Only wise" sets God apart from every rival claim to wisdom.

Calling Him "Saviour" ties His wisdom directly to the rescue just described.

Wisdom and rescue are never separated from each other in this closing line.

👑 Only wise sets God apart from every rival
🧠 His wisdom is uniquely His own
🛟 Saviour ties that wisdom to real rescue
📖 True wisdom and real rescue belong together

---
## 🎺 Glory And Majesty, Dominion And Power, Both Now And Ever. Amen

These four words stack up every kind of praise a person could offer.

"Both now and ever" removes any limit of time from that praise.

"Amen" means let it be so, sealing the whole letter shut.

🎺 Four words stack up complete praise
⏳ Now and ever removes any time limit
🔒 Amen seals the whole letter
📖 Warning gives way to pure worship
`.trim();

export const JUDE_1_PERSONAL_SECTIONS = parseJudeOneRawNotes(JUDE_ONE_RAW_NOTES);
