export type ActsFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsFifteenRawNotes(rawText: string): ActsFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 15:${startVerse}` : `Acts 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Acts 15 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_FIFTEEN_RAW_NOTES = `# Acts 15:1-5
# 🔥 A Fight Over Circumcision
---
## 👳 Certain Men Which Came Down From Judaea

These men are not named, but their teaching is.

They traveled from Judea to Antioch specifically to confront Gentile believers.

Judea was the home base of the Jerusalem church, the most Jewish wing of the whole movement.

Their message did not come from the apostles.

It came from their own strong conviction that Gentiles needed to become Jewish first.

That conviction is about to split the whole early church wide open.

👳 Unnamed teachers from Judea

📍 Judea was the Jerusalem church's base

⚠️ Their teaching skipped the apostles entirely

➡️ One claim could divide the church

## ⚖️ Except Ye Be Circumcised, Ye Cannot Be Saved

This is the whole crisis of the chapter in one sentence.

Circumcision was the sign of the old covenant God gave to Abraham.

These teachers claim faith in Jesus is not enough by itself.

They are adding a requirement Jesus himself never attached to being saved.

Paul will spend the rest of his ministry fighting exactly this idea.

Salvation turns on grace through faith, not on a physical ritual.

⚖️ The whole crisis stated in one line

✂️ Circumcision marked the old covenant with Abraham

➕ A requirement Jesus never actually gave

📖 Salvation rests on faith, not ritual

## 😤 No Small Dissension And Disputation

"Dissension" means a sharp division of opinion.

"Disputation" means a real argument, not a calm discussion.

Luke is telling us plainly that this was not a minor disagreement.

Paul and Barnabas pushed back hard against the Judean teachers.

This was the first serious theological fight inside the young church.

How the church settles this fight will shape it forever.

😤 Dissension means sharp division

🗣️ Disputation means a real argument

🔥 Not a minor disagreement at all

➡️ This fight will shape the church

## 🏛️ Go Up To Jerusalem Unto The Apostles And Elders

The church does not let Antioch settle this question alone.

Jerusalem held the apostles who had walked with Jesus himself.

Sending the question there treats their authority as final, not optional.

This becomes the first official council in church history.

Big disagreements need a trusted place to be settled, not just loud voices.

🏛️ Antioch sends the question to Jerusalem

👥 Apostles and elders held real authority

📜 This becomes the first church council

➡️ Trusted leaders settle the loudest disputes

## 🚶 Brought On Their Way By The Church

This phrase describes a formal send off, not just a goodbye wave.

The church in Antioch walked part of the journey with them.

Giving provisions and company for part of a trip was a known custom of honor.

It showed the church still backed Paul and Barnabas completely.

Being sent well matters as much as being sent at all.

🚶 A formal send off, not a wave

🎁 Provisions and company for part of the trip

🤝 The church still backed them fully

➡️ Being sent well matters too

## 🌍 Passed Through Phenice And Samaria

"Phenice" is Phoenicia, the coastal region north of Israel known for cities like Tyre and Sidon.

Samaria sat between Galilee and Judea, home to a mixed population Jews usually avoided.

Traveling through both regions let Paul and Barnabas share their news along the way.

Every stop on the road became one more chance to tell the story.

🌍 Phenice means the region of Phoenicia

🗺️ Samaria sat between Galilee and Judea

🚶 Both regions were visited on the way

📖 Every stop became a chance to share news

## 🎉 Declaring The Conversion Of The Gentiles

Paul and Barnabas did not hide what had happened among the Gentiles.

They told every church along the road the same news.

Gentile believers turning to God delighted Jewish believers who heard it.

This joy shows the church was not united against including Gentiles.

God's work brings joy before any argument about the details ever starts.

🎉 Paul and Barnabas told everyone the news

❤️ Gentile conversions delighted Jewish believers too

🙌 Most of the church was not opposed

📖 God's work brings joy before the arguing starts

## 🏠 Received Of The Church

Arriving in Jerusalem, Paul and Barnabas were welcomed, not turned away at the door.

This matters because the coming disagreement is a family argument, not a hostile split.

Both sides still consider each other brothers in the same faith.

Disagreement does not have to mean rejection.

🏠 Paul and Barnabas were welcomed warmly

👪 This is a family argument, not a split

🤝 Both sides still call each other brothers

➡️ Disagreement does not require rejection

## 🙋 The Sect Of The Pharisees Which Believed

These are Jewish believers who used to belong to the Pharisees, a group known for strict law keeping.

Becoming a Christian did not erase everything they believed before.

They still think the whole law of Moses applies to every believer, including Gentiles.

"The law of Moses" means the full set of commands given at Sinai, not just circumcision.

Old habits of thinking can survive even a real change of heart.

🙋 Former Pharisees now believe in Jesus

📜 Old convictions did not fully disappear

⚖️ They want the whole law applied

➡️ Old habits can survive new faith

# Acts 15:6-11
# 🗣️ Peter Speaks To The Council
---
## 👥 Apostles And Elders Came Together

This is the official council itself, not a casual chat.

Leaders from the whole movement gathered to settle one question for everyone.

Luke records this meeting carefully because the decision would guide every future church.

Big decisions deserve a real meeting, not a rushed guess.

👥 Leaders gathered for an official council

🌍 The decision would guide every future church

📝 Luke records this meeting carefully

➡️ Big decisions deserve a real meeting

## 🗣️ Much Disputing

Even with leaders in the room, the argument did not resolve quickly.

Different people clearly still held strong opposing views.

Luke does not hide the tension to make the church look tidy.

A true record includes the hard parts, not just the happy ending.

🗣️ The argument did not resolve fast

🔥 Strong opposing views were still held

📝 Luke does not hide the tension

➡️ A true record keeps the hard parts

## 📛 A Good While Ago God Made Choice Among Us

Peter is pointing back to a specific earlier event.

Years before, God sent Peter himself to the Gentile Cornelius, told in Acts chapter ten.

That was not Peter's own idea.

God chose that moment and that household on purpose.

Peter's whole argument rests on something God already settled, not on his personal opinion.

📛 Peter points back to Acts chapter ten

🏠 God sent him to Cornelius, a Gentile

🙏 That choice was God's, not Peter's

📖 God already settled this question once

## 👂 The Gentiles By My Mouth Should Hear The Word Of The Gospel

Peter was the one God used to open the door to Gentiles.

That memory gives his words in this meeting extra weight.

He is not arguing a theory.

He is describing something he personally watched God do.

Peter speaks as a witness, not just a debater.

👂 Peter was there when Gentiles first heard

⚖️ His words carry real personal weight

👀 He describes what he actually watched

➡️ A witness carries more weight than theory

## ❤️ Which Knoweth The Hearts

Peter says only God can truly see what is inside a person.

Circumcision is something visible on the outside of the body.

Faith is something only God can verify on the inside.

The real test of belonging was never going to be something you could see with your eyes.

❤️ Only God can see inside a person

👁️ Circumcision is visible, faith is not

✂️ Outward signs cannot prove an inward change

📖 God tests the heart, not the outside

## 🕊️ Giving Them The Holy Ghost, Even As He Did Unto Us

This recalls the day of Pentecost in Acts chapter two.

The Gentiles at Cornelius's house received the same Holy Spirit the apostles had received.

God did not give them a smaller or different gift.

If God already treated Gentiles as full believers, the church cannot now demand more from them.

🕊️ Recalls Pentecost from Acts chapter two

🏠 Gentiles received the very same Spirit

⚖️ No smaller or different gift was given

➡️ God already treated them as full believers

## 🚫 Put No Difference Between Us And Them

Peter states the conclusion plainly, with no hedging.

God did not treat Jewish and Gentile believers as two separate categories.

Any difference the church is tempted to add would be the church's idea, not God's.

If God made no difference, the church has no business making one either.

🚫 Peter states this with no hedging

⚖️ Jews and Gentiles were treated the same

➕ Any added difference comes from people

📖 God made none, so the church should not

## 🧼 Purifying Their Hearts By Faith

"Purifying" means being made clean, usually from guilt or sin.

In Jewish practice, ritual washing often stood for that kind of cleansing.

Peter says faith did the real cleansing here, with no ritual required.

The inside was cleaned by believing, not by any outward ceremony.

🧼 Purifying means being made clean

💧 Ritual washing often stood for this

🙏 Faith did the cleansing, not ritual

➡️ The inside changed without a ceremony

## 🐂 Tempt Ye God, To Put A Yoke Upon The Neck

"Tempt" here means to test or provoke, not to lure into sin.

A "yoke" was the wooden frame laid across an ox's neck to force it into hard labor.

Peter uses it as a picture for the heavy burden of keeping the whole law.

Adding that burden now would be testing God's patience, not honoring his standard.

🐂 A yoke was a wooden farm tool

⚖️ It pictures the heavy weight of the law

😮 Tempt means to test, not to lure

➡️ Adding the burden would test God himself

## 😓 Neither Our Fathers Nor We Were Able To Bear

Peter admits something striking here.

Even Jewish believers, raised under the law their whole lives, could not keep it perfectly.

If the law was too heavy for its own people, it was never a fair test for new believers.

Peter's own history under the law becomes his strongest argument against forcing it on anyone else.

😓 Even Jewish believers could not keep it

📜 Generations before them struggled the same way

⚖️ An unfair test for anyone, old or new

📖 Peter's own history argues against the burden

## 🙏 Through The Grace Of The Lord Jesus Christ We Shall Be Saved

Peter lands his whole argument on one word, grace.

Grace means a gift freely given, not something earned by keeping rules.

He insists Jewish believers are saved the exact same way Gentiles are.

If grace saves everyone the same way, no group gets to add extra conditions for anyone else.

🙏 Grace means a gift, not something earned

⚖️ Jews are saved the same way as Gentiles

🚫 No group may add extra conditions

📖 Grace saves everyone the same way

# Acts 15:12-18
# 📜 James Confirms It From Scripture
---
## 🤫 Kept Silence, And Gave Audience

The whole crowd stopped arguing and actually listened.

Peter's speech appears to have quieted the loudest objections for the moment.

This is a rare moment of real attention in a tense meeting.

Sometimes a room only settles down after the right words are finally said.

🤫 The crowd stopped arguing to listen

🗣️ Peter's speech quieted the objections

⏳ A rare calm in a tense meeting

➡️ The right words can settle a room

## ✨ Miracles And Wonders God Had Wrought Among The Gentiles

Barnabas and Paul do not argue with clever logic alone.

They point to real events, healings and signs God did through them among Gentiles.

Those events happened back in Acts chapter thirteen and fourteen, on their first missionary journey.

God's own actions become evidence nobody in the room can easily dismiss.

✨ Real events, not just clever arguments

🩹 Healings and signs among the Gentiles

📖 These happened in Acts chapters thirteen and fourteen

➡️ God's actions are hard to dismiss

## 📛 James Answered

This is James the brother of Jesus, not James the apostle who was already killed in Acts chapter twelve.

He had become the recognized leader of the Jerusalem church.

His word in this meeting will carry the final, deciding weight.

Knowing which James is speaking matters, because it tells us how much authority this verdict actually carries.

📛 This is Jesus's brother, not the apostle

⚰️ The apostle James already died in Acts twelve

👑 He led the Jerusalem church

📖 His verdict carries real authority

## 👂 Simeon Hath Declared

"Simeon" is simply another form of the name Simon.

James is referring back to what Peter, also called Simon, just said.

Using his full given name adds a formal, respectful tone to the moment.

One man's testimony, named carefully, becomes the foundation for the ruling that follows.

👂 Simeon is another form of Simon

🗣️ James means Peter, who just spoke

🎩 The full name adds formality here

➡️ One testimony anchors the coming ruling

## 🌍 To Take Out Of Them A People For His Name

James says God always intended to call Gentiles to himself.

This was not a last minute fix after Jewish Israel resisted the gospel.

"A people for his name" means a group that belongs to God and carries his reputation.

Including Gentiles was the plan from the beginning, not a backup plan.

🌍 God always intended to call Gentiles

🚫 This was never a backup plan

🏷️ A people for his name means God's own

📖 The plan included Gentiles from the start

## 📜 To This Agree The Words Of The Prophets

James does not invent a new idea to win the argument.

He shows that the Old Testament prophets already said this would happen.

Grounding the decision in scripture gives it far more weight than personal opinion alone.

The strongest argument in the room turns out to be the oldest one.

📜 James quotes the Old Testament prophets

🆕 He invents no new idea here

⚖️ Scripture outweighs personal opinion

➡️ The oldest argument wins the room

## 🏗️ Build Again The Tabernacle Of David, Which Is Fallen Down

James quotes the prophet Amos here.

"The tabernacle of David" means the royal line and kingdom that came from King David.

By the time of Jesus, that kingdom looked broken and fallen, with no king on the throne.

Jesus, a descendant of David, is the one who rebuilds it, in a way nobody expected.

A promise that looked dead for centuries was quietly being kept all along.

🏗️ Tabernacle of David means his royal line

👑 That kingdom looked broken by Jesus's time

✝️ Jesus rebuilds it in a new way

📖 An old promise was quietly being kept

## 🌾 The Residue Of Men Might Seek After The Lord

"Residue" means the remainder, those left over or still remaining.

Amos pictures a wider group beyond just Israel eventually seeking God.

That wider group is named directly in the very next phrase.

The prophecy already had room for people outside the original nation of Israel.

🌾 Residue means those remaining or left over

🌍 A wider group than Israel alone

🔭 Amos already saw this coming

➡️ Room for outsiders was built in early

## 🌐 All The Gentiles, Upon Whom My Name Is Called

This is the exact phrase that settles the whole debate for James.

Gentiles are described as belonging to God, called by his own name.

That language sounds like full membership, not some lesser, outside status.

If the prophet already gave Gentiles God's name, the council cannot now withhold full standing.

🌐 Gentiles are called by God's own name

🏷️ That language means full belonging

🚫 Not a lesser or outside status

📖 The prophet already settled their standing

## ⏳ Known Unto God Are All His Works From The Beginning

James closes his scripture case with a simple statement about God himself.

Nothing God does catches him by surprise or forces him to improvise.

Welcoming the Gentiles was planned long before this meeting ever happened.

The church is not deciding something new here.

It is finally catching up to what God always knew.

⏳ Nothing surprises God or catches him unaware

📝 This plan existed before the meeting

🙏 The church is only catching up

📖 God already knew this plan

# Acts 15:19-21
# ✍️ James's Ruling
---
## ⚖️ My Sentence Is

"Sentence" here means a formal judgment or verdict, not a prison sentence.

James speaks with the authority of the church's recognized leader in Jerusalem.

This is not a suggestion offered alongside several other options.

One clear ruling is about to end a debate that started back in Antioch.

⚖️ Sentence means a formal verdict here

👑 James speaks with real authority

🚫 Not just one suggestion among many

➡️ One ruling ends the whole debate

## 🚫 We Trouble Not Them

"Trouble" means to burden or unsettle someone unfairly.

James rules that Gentile believers should not be weighed down with extra requirements.

Turning to God is already enough to belong.

The door into the church stays exactly as wide as God already made it.

🚫 Trouble means to burden unfairly

➕ No extra requirements should be added

🚪 Turning to God is already enough

📖 The door is already wide enough

## 🗿 Abstain From Pollutions Of Idols

Meat sold in Gentile cities was often first offered to a pagan idol before being sold.

"Pollutions" means the ritual uncleanness attached to that meat in Jewish eyes.

Asking Gentiles to avoid it protected shared meals between Jewish and Gentile believers.

A small dietary choice could keep two very different cultures eating at the same table.

🗿 Meat was often offered to idols first

🍖 Pollutions means ritual uncleanness in Jewish eyes

🍽️ This protected shared meals between cultures

➡️ A small choice kept two cultures together

## 🚫 And From Fornication

"Fornication" means sexual immorality outside of marriage.

Many pagan temple rituals in Gentile cities included this as a normal part of worship.

Gentile believers coming out of that world needed this named directly.

Leaving idols behind also meant leaving the sexual practices tied to them.

🚫 Fornication means sexual immorality

🏛️ Common in pagan temple worship

🙋 New Gentile believers needed this named

➡️ Leaving idols meant leaving this too

## 🩸 From Things Strangled, And From Blood

Animals killed by strangling still had their blood inside the meat.

Jewish law treated blood as sacred, never to be eaten.

Asking Gentiles to avoid it was a small concession that respected Jewish conscience.

These four rules were not a new law.

They were simple courtesy between two cultures learning to share a table.

🩸 Strangled meat still held blood inside

📜 Jewish law treated blood as sacred

🤝 A small concession to Jewish conscience

📖 Courtesy, not a brand new law

## 🕍 Preach Him, Being Read In The Synagogues Every Sabbath Day

James explains why these four specific things were chosen.

Moses and the law were already taught every single week in synagogues across the empire.

Jewish communities lived everywhere Gentile believers would also be living.

The ruling was shaped to let two communities who heard about Moses every week still live peacefully side by side.

🕍 Moses was taught weekly in every city

🌍 Jewish communities lived everywhere Gentiles did

🤝 The ruling fit both communities together

➡️ Shaped for peace between two groups

# Acts 15:22-29
# ✉️ The Letter To Antioch
---
## ✅ Pleased It The Apostles And Elders, With The Whole Church

This decision was not made by James alone, behind closed doors.

The whole church in Jerusalem agreed with the ruling together.

A decision this important needed support from everyone, not just the top leader.

Real unity meant the whole church owning this answer, not one man handing it down.

✅ The whole church agreed, not just James

🚪 Not a private, closed door decision

👥 Everyone needed to own this answer

➡️ Unity meant shared ownership, not one voice

## 👬 Judas Surnamed Barsabas, And Silas, Chief Men Among The Brethren

Two respected Jerusalem leaders are chosen to carry the letter in person.

Silas will become important again soon, as Paul's companion on his next journey.

Sending trusted men in person added weight that a letter alone could not carry.

The message mattered enough to send people, not just paper.

👬 Two respected Jerusalem leaders are chosen

🔁 Silas becomes important again very soon

📜 Trusted messengers add weight paper cannot

➡️ The message mattered enough to send people

## ✉️ Send Greeting Unto The Brethren

This greeting follows the standard format of a formal letter in the ancient world.

Naming the senders and recipients up front made the letter's authority clear immediately.

The letter addresses believers across three regions, Antioch, Syria, and Cilicia.

A clear address at the top told everyone exactly who was speaking and to whom.

✉️ Follows the standard ancient letter format

🏷️ Senders and recipients named up front

🗺️ Addressed to three different regions

📖 Everyone knew who was speaking

## 😟 Subverting Your Souls

"Subverting" means tearing down or corrupting from the inside.

The letter admits the earlier false teaching caused real spiritual damage, not just confusion.

This is a strong word, chosen on purpose to show how serious the harm was.

The council does not downplay the damage those false teachers caused.

😟 Subverting means corrupting from the inside

⚠️ A strong word chosen on purpose

💔 Real spiritual damage, not just confusion

➡️ The council takes the harm seriously

## 🚫 We Gave No Such Commandment

This line is the clearest, most direct denial in the whole letter.

The Judean teachers from verse one acted completely on their own authority.

Jerusalem formally disowns their teaching in writing, for everyone to see.

Putting the denial in writing left no room for doubt later.

🚫 The clearest denial in the letter

👤 Those teachers acted on their own

📝 Jerusalem disowns the teaching in writing

➡️ No room left for doubt later

## 🤝 Being Assembled With One Accord

"One accord" means everyone agreeing together, with no real division left.

This phrase appears several times earlier in Acts, especially around the day of Pentecost.

Using it here signals the Holy Spirit's unity, not just a narrow majority vote.

This was not a close vote.

It was a shared conviction.

🤝 One accord means full agreement

🕊️ The same phrase appears near Pentecost

🗳️ Not a narrow vote, but real unity

📖 A shared conviction, not a close call

## ❤️ Our Beloved Barnabas And Paul

The letter calls them "beloved," a warm word choice, not a cold formality.

This also quietly restores their reputation after being accused by the Judean teachers.

Jerusalem is publicly standing behind the two men the troublemakers had undermined.

A kind word in writing repaired damage unkind words had caused.

❤️ Beloved is a warm, personal word

🛡️ It restores their damaged reputation

👍 Jerusalem publicly stands behind them

➡️ Kind words repaired real damage

## ⚔️ Hazarded Their Lives For The Name Of Our Lord Jesus Christ

"Hazarded" means risked, specifically risked at real danger to themselves.

This recalls the stoning Paul survived outside Lystra, just one chapter earlier.

The letter honors that cost openly, not just their success.

Jerusalem remembers what following this call actually cost them.

⚔️ Hazarded means risked real danger

🪨 Recalls the stoning outside Lystra

🏅 Their cost is honored, not just results

📖 Jerusalem remembers what the call cost

## 🗣️ Shall Also Tell You The Same Things By Mouth

The written letter and the spoken report were meant to match each other exactly.

Sending Judas and Silas in person let the Antioch church ask follow up questions.

A letter alone could not answer questions a real conversation could.

Truth delivered in person carries a confidence paper cannot carry alone.

🗣️ Spoken words would match the letter

❓ In person messengers could answer questions

📜 A letter alone cannot do that

➡️ In person truth carries more confidence

## 🕊️ It Seemed Good To The Holy Ghost, And To Us

This is one of the boldest claims in the whole book of Acts.

The council believed the Holy Spirit was actively guiding their human discussion.

They do not separate God's will from their own careful decision making.

The church trusted that God works through honest discussion, not only through dramatic signs.

🕊️ A bold claim about the Spirit's guidance

🗣️ Human discussion and God's will are not separated

🙏 God guided their actual decision making

📖 God can work through honest discussion

## 🎒 No Greater Burden Than These Necessary Things

This echoes the exact word Peter used earlier for the "yoke" in verse ten.

The council intentionally kept the list short, only four items.

Everything else about the law of Moses is left optional for Gentile believers.

The lightest possible load was chosen on purpose, not by accident.

🎒 Echoes Peter's yoke language from verse ten

🔢 Only four items made the final list

➕ Everything else is left optional

➡️ The lightest load was chosen on purpose

## 👋 If Ye Keep Yourselves, Ye Shall Do Well

"Fare ye well" is simply how ancient letters said goodbye, much like "sincerely" today.

The letter ends on encouragement, not a threat.

Keeping these four simple things is framed as doing well, not barely passing a test.

The letter closes the way it opened, with warmth instead of pressure.

👋 Fare ye well means an ancient goodbye

💬 Similar to signing off with sincerely today

😊 The ending encourages, it does not threaten

📖 Warmth closes the letter, not pressure

# Acts 15:30-35
# 📬 The Letter Arrives
---
## 📬 They Delivered The Epistle

"Epistle" simply means a formal letter.

The messengers gathered the whole congregation together before reading it aloud.

Everyone in Antioch heard the ruling at the same time, from the same source.

No one could claim they heard a different version secondhand.

📬 Epistle simply means a formal letter

👥 The whole congregation heard it together

🗣️ Everyone got the same version at once

➡️ No room for secondhand confusion

## 😊 They Rejoiced For The Consolation

"Consolation" means comfort, the relief of a real burden being lifted.

The Gentile believers in Antioch had been genuinely afraid they would be forced into circumcision.

Hearing the ruling freed them from that fear completely.

Good news about grace still lands as real relief, not just information.

😊 Consolation means comfort and relief

😨 They had feared forced circumcision

🕊️ The ruling freed them from that fear

📖 Grace lands as relief, not just facts

## 🗣️ Being Prophets Also Themselves

"Prophets" in the early church were people gifted to speak God's encouragement and truth.

Judas and Silas were not just letter carriers.

They had their own gift for building up a congregation with their own words.

The letter opened the door, and their own gifting carried the church the rest of the way through it.

🗣️ Prophets here means gifted encouragers

📜 Not just letter carriers

💪 They had their own gift to build up

➡️ Their words carried the church further

## 💪 Exhorted The Brethren With Many Words

"Exhorted" means to strongly encourage or urge someone forward.

Judas and Silas did not just drop the letter and leave.

They stayed to personally strengthen a congregation that had been shaken by false teaching.

Words of care can heal words of harm.

💪 Exhorted means to strongly encourage

📬 They did not just drop the letter

🩹 They helped heal a shaken congregation

➡️ Words of care can heal words of harm

## ✅ Confirmed Them

"Confirmed" means to strengthen something until it stands firm.

This matches the same word used for Paul's own ministry back in Acts fourteen.

The goal was lasting stability, not just a temporary good feeling.

Real encouragement aims at strength that outlasts the visit itself.

✅ Confirmed means strengthened until firm

🔁 Matches Paul's own ministry in Acts fourteen

🏛️ The goal was lasting stability

📖 Real encouragement outlasts the visit

## 🕊️ Let Go In Peace From The Brethren Unto The Apostles

Judas and Silas eventually returned to Jerusalem to report back.

"In peace" signals the mission succeeded, with no lingering tension between the two churches.

The relationship between Antioch and Jerusalem ends this episode stronger, not weaker.

A hard conversation, handled honestly, actually drew these two churches closer together.

🕊️ In peace means the mission succeeded

🔁 They returned to report back

🤝 No lingering tension between the churches

➡️ Honest conflict drew them closer together

## ✏️ It Pleased Silas To Abide There Still

Silas chooses to stay behind in Antioch rather than return with Judas.

Some ancient manuscripts actually leave this verse out entirely, so not every early copy of Acts included it.

Either way, Luke is setting up Silas's next role in the story.

A small personal choice here quietly prepares the next chapter of his life.

✏️ Silas chooses to stay in Antioch

📜 Some ancient manuscripts omit this verse

🔁 Luke is setting up his next role

➡️ A small choice prepares what comes next

## 📖 Paul Also And Barnabas Continued In Antioch

Life in Antioch returns to its normal rhythm of ministry.

Teaching and preaching continue side by side, the way they had before the whole dispute began.

The argument did not end the partnership, at least not yet.

Settling the question let the real work start back up again.

📖 Ministry in Antioch returns to normal

🤝 Paul and Barnabas still work side by side

⏳ The partnership is not over yet

➡️ Settling the question restarted the real work

## 👥 With Many Others Also

Antioch was never a church led by only two people.

Naming other unnamed teachers shows how much the church had already grown.

This detail quietly prepares the reader for the larger team about to scatter in different directions.

A growing church can survive its leaders needing to go separate ways.

👥 Antioch had more teachers than just two

🌱 The church had grown a lot

🧭 This sets up the coming split

➡️ A growing church can survive change

# Acts 15:36-41
# ⚔️ Paul And Barnabas Part Ways
---
## 🧭 Let Us Go Again And Visit Our Brethren

Paul is not proposing a new mission to unreached places yet.

He wants to check on churches they already started, on their first journey.

Following up mattered to him as much as the first visit did.

Planting a church was never meant to be the whole job.

🧭 Paul proposes a follow up visit

🌱 These churches already existed from before

🤝 Follow up mattered as much as planting

➡️ Starting a church was never the whole job

## ❓ See How They Do

This simple phrase reveals genuine pastoral concern, not just curiosity.

Paul wanted to know how new believers were holding up under real pressure.

That concern will soon collide with a disagreement about who should travel with him.

Real care for people is about to run straight into real conflict.

❓ Shows genuine pastoral concern

💪 Paul wanted to know how they held up

⚠️ A disagreement is about to collide with this

➡️ Real care meets real conflict next

## 👤 John, Whose Surname Was Mark

This is the same John Mark introduced earlier in Acts chapter twelve.

He is likely the author later credited with writing the Gospel of Mark.

He was also a relative of Barnabas, which explains why Barnabas wants him along.

Family loyalty and a past mistake are about to pull two leaders in opposite directions.

👤 Same John Mark from Acts chapter twelve

📖 Likely the author of the Gospel of Mark

👪 He was related to Barnabas

➡️ Loyalty and a past mistake now collide

## 🏃 Departed From Them From Pamphylia

This recalls Mark leaving the missionary team partway through, back in Acts chapter thirteen.

He left before the hardest part of that first journey even began.

Paul clearly still remembers that choice as a real problem, not old news.

One decision years earlier is still shaping a relationship in the present.

🏃 Recalls Mark leaving early in Acts thirteen

⚠️ He left before the hardest part began

😤 Paul still sees it as a real problem

➡️ Old choices still shape present relationships

## 🙅 Paul Thought Not Good To Take Him

Paul does not trust Mark to finish what he starts this time.

This is not spoken out of cruelty.

It comes from real concern about the mission's reliability going forward.

Paul's caution and Barnabas's loyalty are both reasonable, just pointed in different directions.

🙅 Paul doubts Mark will finish this time

💔 Not spoken out of cruelty

⚠️ Real concern about reliability drives it

➡️ Two reasonable positions, pointed differently

## 🔥 The Contention Was So Sharp Between Them

"Contention" means a fierce, heated argument.

Two of the most respected leaders in the entire early church could not agree here.

Scripture does not hide this conflict or smooth it over for appearances.

Even deep friendship and shared calling do not guarantee agreement on every decision.

🔥 Contention means a fierce argument

👑 Two of the most respected leaders disagreed

📝 Scripture does not hide this conflict

➡️ Friendship does not guarantee agreement

## 🧳 They Departed Asunder One From The Other

"Asunder" means completely apart, not just a short cooldown period.

After years of working side by side, Paul and Barnabas now split into two separate teams.

This ends one of the most significant partnerships in the whole book of Acts.

Sometimes two good people serving the same God still cannot serve together in the same place.

🧳 Asunder means completely apart

👥 Years of partnership now end here

📖 One of the book's most significant partnerships

➡️ Good people can still need separate paths

## 🚢 Barnabas Took Mark, And Sailed Unto Cyprus

Cyprus was Barnabas's home region, mentioned back in Acts chapter four.

Choosing it fits a man known throughout Acts for giving people second chances.

Barnabas's name itself means "son of encouragement," first explained back in Acts chapter four as well.

Barnabas stays exactly who he has always been, even in the middle of this conflict.

🚢 Cyprus was Barnabas's home region

🏠 Mentioned already in Acts chapter four

🤝 Barnabas was known for second chances

📖 He stays who he has always been

## 🤝 Paul Chose Silas

Silas was already introduced earlier in this chapter, as one of the two men sent from Jerusalem.

He had also chosen to stay in Antioch back in verse thirty four.

That earlier choice now puts him in exactly the right place at exactly the right time.

A small decision made earlier quietly set up this new partnership.

🤝 Silas was introduced earlier this chapter

📍 He had already chosen to stay nearby

⏰ The timing now lines up perfectly

➡️ An earlier choice set up this moment

## 🙏 Recommended By The Brethren Unto The Grace Of God

"Recommended" here means formally commissioned and entrusted to God's care.

This is the exact same kind of sendoff Paul and Barnabas received back in verse three.

The church still blesses Paul's new direction, even without Barnabas at his side.

Support from the church did not disappear just because the team had changed.

🙏 Recommended means formally entrusted to God

🔁 The same kind of sendoff as verse three

🤝 The church still blesses this new direction

📖 Support outlasted the change in the team

## 🛤️ Confirming The Churches

Paul's new journey through Syria and Cilicia continues the same follow up work verse thirty six began.

This simple phrase closes one chapter and quietly opens the next, into Paul's wider second missionary journey.

Two missionaries became two mission teams, covering more ground than one team ever could alone.

What looked like a painful split ended up doubling the reach of the gospel.

🛤️ Paul continues the follow up work

🔀 One team becomes two teams

🌍 Together they cover more ground

📖 A painful split doubled the gospel's reach
`.trim();

export const ACTS_FIFTEEN_PERSONAL_SECTIONS = parseActsFifteenRawNotes(ACTS_FIFTEEN_RAW_NOTES);
