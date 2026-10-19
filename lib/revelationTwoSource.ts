export type RevelationTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationTwoRawNotes(rawText: string): RevelationTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 2:${startVerse}` : `Revelation 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Revelation 2 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_TWO_RAW_NOTES = `# Revelation 2:1-3
# ✉️ The Letter To Ephesus
---
## 📬 Unto The Angel Of The Church Of Ephesus Write

"Angel" here most likely names a human messenger, not a heavenly being.

Each of the seven churches gets its own named leader or representative.

Ephesus was the largest and most influential city in the Roman province of Asia.

This letter opens a pattern repeated for all seven churches.

📬 Angel likely names a human messenger
🏛️ Ephesus was the largest city in Asia
📜 Each church gets its own named letter
📖 This letter opens a repeated pattern

---
## ⭐ Who Holdeth The Seven Stars In His Right Hand

This phrase repeats the picture already given in chapter one.

The seven stars there were named the messengers of the seven churches.

Holding them in his right hand pictures real protection and control.

Christ reminds each church that he already holds its leader secure.

⭐ The seven stars are the church messengers
✋ The right hand pictures protection and control
🔁 This repeats the picture from chapter one
📖 Christ already holds each leader secure

---
## 🕎 Who Walketh In The Midst Of The Seven Golden Candlesticks

The candlesticks picture the seven churches themselves.

"Walketh in the midst" means Christ is present among them right now.

He is not a distant ruler watching from far away.

He moves among his churches the way a shepherd moves among sheep.

🕎 The candlesticks picture the seven churches
🚶 Walketh in the midst means present now
🙅 Christ is not a distant ruler
📖 He moves among his churches like a shepherd

---
## 💪 I Know Thy Works, And Thy Labour, And Thy Patience

"Works" names the things done, visible on the outside.

"Labour" points to work hard enough to cause real weariness.

"Patience" means the ability to keep going under long pressure.

Christ names all three because he has watched each one personally.

💪 Works are visible outward actions
😓 Labour means work hard enough to tire
⏳ Patience means endurance under pressure
📖 Christ has personally watched all three

---
## 🙅 Canst Not Bear Them Which Are Evil

This does not describe a harsh or unkind church.

It describes a church that refuses to tolerate open wrongdoing in its midst.

Bearing with evil would have meant quietly accepting it.

Ephesus is commended here for refusing to look away.

🙅 This is not harshness or unkindness
🚫 Ephesus refused to tolerate open wrongdoing
👀 Looking away would have meant accepting it
📖 Christ commends their refusal to ignore sin

---
## 🕵️ Tried Them Which Say They Are Apostles, And Are Not

Not everyone who claimed authority in the church actually had it.

"Apostle" here names someone claiming direct authority from Christ.

Ephesus tested these claims rather than accepting them on sight.

Testing a claim is not the same as being unkind.

🕵️ Not every claim of authority was true
✉️ Apostle here means a claim of direct authority
🔍 Ephesus tested the claims instead of accepting them
📖 Testing truth is not the same as unkindness

---
## 💪 Hast Not Fainted

"Fainted" means giving up from exhaustion.

Ephesus kept laboring without quitting, even under real pressure.

This closes Christ's commendation before any correction begins.

Everything good about this church is said first.

💪 Fainted means giving up from exhaustion
🏃 Ephesus kept going without quitting
🥇 The commendation comes before the correction
📖 Christ names the good first

# Revelation 2:4-7
# 💔 Thou Hast Left Thy First Love
---
## 💔 Thou Hast Left Thy First Love

Every good thing just said about Ephesus is still true.

Yet this phrase turns the letter from praise toward warning.

"First love" names the eager devotion a new believer feels toward Christ.

Ephesus kept working hard without that same eager devotion behind it.

A church can stay busy and correct while losing its heart.

Right action without love was exactly what Christ named as missing.

💔 First love means early eager devotion
🏭 Ephesus still worked without that devotion
⚙️ Busy and correct can still lack heart
📖 Right action without love was the real problem

---
## 🧠 Remember Therefore From Whence Thou Art Fallen

Christ does not simply tell them to feel sorry.

He tells them to remember what their devotion once looked like.

Memory becomes the first step back toward what was lost.

Forgetting the starting point makes the distance invisible.

🧠 Christ calls for memory, not just sorrow
📍 Remembering shows how far they drifted
🧭 Memory is the first step back
📖 Forgetting the start hides the distance

---
## 🔁 Repent, And Do The First Works

"Repent" means to turn around, not just to feel bad.

"The first works" names the actions that flowed from that early devotion.

Christ asks for a real change in direction, not only an apology.

Feeling matched with action is what repentance actually looks like.

🔁 Repent means turning around, not just regret
🏃 First works are the actions from early devotion
🎯 Christ asks for a real change in direction
📖 Repentance pairs feeling with action

---
## 🕯️ Will Remove Thy Candlestick Out Of His Place

The candlestick already pictures this church as a visible light.

Removing it would mean this church stops existing as a witness.

This is a real warning, not an empty threat.

A church that loses its love can eventually lose its place.

🕯️ The candlestick pictures this church's light
🙅 Removal would mean the church stops existing
⚠️ This is a real warning, not empty
📖 Lost love can cost a church its place

---
## 😤 Thou Hatest The Deeds Of The Nicolaitanes

The Nicolaitanes were a group inside the early church teaching compromise with pagan practice.

That likely included eating food offered to idols and loose sexual conduct.

Ephesus is praised here for rejecting that group outright.

Hating wrong teaching is treated as a genuine strength.

😤 Nicolaitanes taught compromise with pagan practice
🍽️ That likely included idol food and sexual sin
👍 Ephesus rejected this group outright
📖 Hating wrong teaching is a real strength

---
## 👂 He That Hath An Ear, Let Him Hear What The Spirit Saith Unto The Churches

This exact sentence repeats at the end of all seven letters.

It calls for more than simply hearing words out loud.

It asks for a willingness to actually respond to what was said.

Every letter closes by handing responsibility back to the listener.

👂 This same line closes all seven letters
🗣️ It asks for more than hearing words
🎯 It calls for a real response
📖 Responsibility is handed back to the listener

---
## 🌳 To Eat Of The Tree Of Life, Which Is In The Midst Of The Paradise Of God

The tree of life first appears in the garden of Eden.

Access to it was blocked after Adam and Eve sinned.

This promise reopens what sin once shut.

"Paradise" names God's own dwelling, not a vague idea of heaven.

🌳 The tree of life first appears in Eden
🚫 Sin once blocked access to it
🔓 This promise reopens what sin shut
📖 Paradise names God's own dwelling place

# Revelation 2:8-11
# 👑 The Letter To Smyrna
---
## 📬 Unto The Angel Of The Church In Smyrna Write

Smyrna was a wealthy port city north of Ephesus.

The city was fiercely loyal to Rome and proud of its loyalty.

Christians there faced real pressure to honor Rome's gods publicly.

This letter speaks directly into that pressure.

📬 Smyrna was a wealthy port city
🏛️ The city was fiercely loyal to Rome
⚠️ Christians faced pressure to honor Rome's gods
📖 This letter speaks into that pressure

---
## ♾️ The First And The Last, Which Was Dead, And Is Alive

This title repeats what Christ already claimed in chapter one.

It names him as eternal, with no beginning or end.

It also names his own death and his return to life.

A suffering church hears from someone who already survived death itself.

♾️ First and last means no beginning or end
☠️ He names his own real death
🌅 He also names his return to life
📖 This church hears from one who survived death

---
## 💰 I Know Thy Tribulation, And Poverty (But Thou Art Rich)

"Tribulation" names pressure and suffering pressing in from outside.

"Poverty" here is most likely real, literal material lack.

Christ then calls this same church rich anyway.

Their true wealth is spiritual, not measured in coins.

💰 Tribulation means outside pressure and suffering
🪙 Poverty here is likely real material lack
💎 Christ still calls them rich
📖 True wealth here is spiritual, not coins

---
## 🕍 They Are Jews, And Are Not, But Are The Synagogue Of Satan

This does not reject Jewish people as a whole.

It targets a specific local group falsely claiming God's covenant identity.

That group was actively working against the believers in Smyrna.

Claiming the right name means nothing without the right loyalty.

🕍 This is not a rejection of Jewish people
🎭 It targets one group falsely claiming identity
⚔️ That group worked against the believers there
📖 The right name means nothing without loyalty

---
## ⛓️ The Devil Shall Cast Some Of You Into Prison, That Ye May Be Tried

Prison in the Roman world was rarely the punishment itself.

It was usually a holding place before trial or execution.

Christ names the devil, not just Rome, as the real force behind this.

The suffering ahead is named honestly, not softened.

⛓️ Prison was usually a holding place
⚖️ Trial or execution often followed it
😈 Christ names the devil behind this pressure
📖 Christ names the suffering honestly

---
## 🔟 Tribulation Ten Days

This phrase most likely names a limited, defined period, not ten literal days.

Numbers like this one often picture a set and bounded trial in scripture.

The suffering has a real end point already fixed by God.

It is not an open ended or endless threat.

🔟 Ten days likely pictures a defined period
📏 Numbers like this often picture a bounded trial
🏁 The suffering has a fixed end point
📖 This threat is not endless

---
## 👑 Be Thou Faithful Unto Death, And I Will Give Thee A Crown Of Life

This "crown" names a victor's wreath, not a king's crown.

Winners in ancient athletic games received a wreath exactly like this one.

Faithfulness all the way to death wins a prize that never fades.

The wreaths handed out at games always withered within days.

👑 Crown here means a victor's wreath
🏃 Athletic winners received wreaths like it
🌿 Normal wreaths withered within days
📖 This prize never fades

---
## ☠️ He That Overcometh Shall Not Be Hurt Of The Second Death

Every person faces a first death, the death of the body.

"The second death" names a final, lasting judgment after that.

Overcoming here does not mean avoiding hardship or persecution.

It means remaining faithful through it to the very end.

☠️ First death is the death of the body
⚰️ Second death names a final judgment
🙅 Overcoming does not mean avoiding hardship
📖 It means staying faithful to the end

# Revelation 2:12-17
# ⚔️ The Letter To Pergamos
---
## 📬 Unto The Angel Of The Church In Pergamos Write

Pergamos was a major center of pagan worship in the province of Asia.

The city held a massive altar to Zeus built high on a hill.

It was also an early center of emperor worship in the region.

Believers there lived surrounded by constant pressure to honor other gods.

📬 Pergamos was a major pagan worship center
⛰️ A massive altar to Zeus stood there
👑 It was an early center of emperor worship
📖 Believers lived under constant religious pressure

---
## 🗡️ He Which Hath The Sharp Sword With Two Edges

This title repeats the sword image from chapter one.

A sword with two edges can cut in either direction.

It comes from Christ's own spoken word, not a weapon in his hand.

This church will soon hear that sword turned toward compromise inside it.

🗡️ This repeats the sword image from chapter one
🔁 A twoedged sword cuts both directions
🗣️ It pictures the power of Christ's word
📖 That same word will soon correct this church

---
## 🏛️ Where Satan's Seat Is

This phrase most likely points to Pergamos as a hub of pagan worship.

Many scholars connect it to the city's massive altar or temple complex.

Living there meant facing spiritual pressure day after day.

Christ names exactly where this church had to stand its ground.

🏛️ Satan's seat likely names the pagan worship hub
⛰️ Many link it to the city's altar complex
⚠️ Daily life there meant constant pressure
📖 Christ names exactly where they had to stand

---
## 🤝 Thou Holdest Fast My Name, And Hast Not Denied My Faith

"Holdest fast" means gripping tightly rather than letting go.

Denying the faith would have meant renouncing Christ under pressure.

This church kept its grip even while surrounded by hostile worship.

Christ names this loyalty before naming any correction.

🤝 Holdest fast means gripping tightly
🙅 Denying faith means renouncing Christ under pressure
💪 This church kept its grip under pressure
📖 Loyalty is named before correction

---
## 🪦 Antipas Was My Faithful Martyr, Who Was Slain Among You

Antipas is not mentioned anywhere else in scripture.

"Martyr" here names someone killed specifically for their testimony about Christ.

He was likely a real, known believer from this exact congregation.

His death was not forgotten by Christ, even if history forgot his story.

🪦 Antipas appears only here in scripture
✝️ Martyr means killed for testimony about Christ
👤 He was likely known in this congregation
📖 Christ remembered him even if history did not

---
## 🐴 The Doctrine Of Balaam

Balaam was a prophet hired to curse Israel in the book of Numbers.

He could not curse Israel directly, so he looked for another way in.

His later advice led Israel into sin through compromise instead.

This doctrine names that same strategy of corruption from within.

🐴 Balaam was a prophet hired to curse Israel
🙅 He could not curse Israel outright
🎯 He corrupted Israel through compromise instead
📖 This doctrine repeats that same strategy

---
## 🪨 To Cast A Stumblingblock Before The Children Of Israel

"Stumblingblock" names something placed to cause someone to trip and fall.

Balac was the king who hired Balaam for this exact purpose.

The goal was not open war but quiet, successful temptation.

Some in Pergamos were apparently using that same old strategy again.

🪨 A stumblingblock is placed to cause a fall
👑 Balac hired Balaam for this purpose
🤫 The goal was quiet temptation, not war
📖 Pergamos faced that same old strategy

---
## 🍽️ To Eat Things Sacrificed Unto Idols, And To Commit Fornication

Meat sold in pagan cities often came from animals first offered to idols.

Trade guild meals and public feasts frequently centered on this practice.

Refusing to participate could mean real social and economic cost.

Some believers chose to compromise rather than pay that price.

🍽️ Meat often came from idol offerings
🏛️ Trade feasts frequently centered on this practice
💸 Refusing could carry real social and economic cost
📖 Some believers chose compromise instead

---
## 👥 The Doctrine Of The Nicolaitanes

This is the same group named and rejected in the Ephesus letter.

Pergamos, unlike Ephesus, had allowed this group to take root.

The same false teaching produced very different results in two churches.

What one church resisted, another church tolerated.

👥 This is the same group named in Ephesus
🌱 Pergamos allowed this teaching to take root
🔀 The same teaching produced different results
📖 One church resisted what another tolerated

---
## 🔥 I Will Fight Against Them With The Sword Of My Mouth

This repeats the sword image named earlier in this very letter.

The fight here is against the false teaching, not the whole church.

Christ's spoken word is strong enough to correct what has taken root.

Repentance is still offered before this sword is ever used.

🔥 This repeats the sword image from this letter
🎯 This fight targets false teaching only
🗣️ Christ's word is strong enough to correct it
📖 Repentance is still offered first

---
## 🍞 The Hidden Manna

Manna was the bread God provided Israel in the wilderness.

A jar of it was once kept hidden inside the ark of the covenant.

This promise points to a hidden, lasting provision kept safe with God.

Those who refused idol food now receive a greater, hidden meal instead.

🍞 Manna was the wilderness bread from God
📦 A jar sat kept inside the ark
🔒 This pictures provision kept safe with God
📖 Refusing idol food leads to a greater meal

---
## ⚪ A White Stone, And In The Stone A New Name Written

White stones in the ancient world were sometimes used to cast a vote of acquittal.

They were also used as personal tokens granting entry to a special event.

The new name written on it is known only to the one who receives it.

This pictures a personal, guaranteed relationship no outsider can take away.

⚪ White stones could mean a vote of acquittal
🎫 They were also used as entry tokens
🔐 Only the receiver knows the new name
📖 This pictures a relationship no one can take

# Revelation 2:18-23
# ⚠️ That Woman Jezebel
---
## 📬 Unto The Angel Of The Church In Thyatira Write

Thyatira was a smaller city known for its many trade guilds.

Acts sixteen already names a believer from this city, Lydia the seller of purple.

Trade guilds there often held feasts tied to pagan worship.

Belonging to a guild could mean real pressure to join in.

📬 Thyatira was known for its trade guilds
👩 Lydia from Acts sixteen came from this city
🍽️ Guild feasts were often tied to pagan worship
📖 Guild membership could carry real pressure

---
## 🔥 The Son Of God, Who Hath His Eyes Like Unto A Flame Of Fire

This is the only one of the seven letters calling Christ "the Son of God" directly.

The eyes of fire repeat the image from chapter one.

Fire here pictures complete, piercing knowledge of everything hidden.

Nothing happening quietly inside this church escapes his sight.

🔥 Only this letter calls him Son of God
👁️ The eyes of fire repeat chapter one's image
🔍 Fire pictures complete, piercing knowledge
📖 Nothing hidden here escapes his sight

---
## 🦶 His Feet Are Like Fine Brass

This also repeats a detail from the opening vision in chapter one.

Fine brass described metal refined and purified by fire.

Feet of metal picture strength that will not bend or break.

This church is about to need that same unshakable judgment.

🦶 This repeats a detail from chapter one
🔥 Fine brass meant metal refined by fire
🙅 Metal feet picture unbending strength
📖 This church will soon need that strength

---
## ❤️ Thy Charity, And Service, And Faith, And Thy Patience

"Charity" names practical love shown toward others.

"Service" points to real, hands on ministry to people in need.

This list of four virtues is the longest given to any of the seven churches.

Thyatira is commended with unusual warmth before any correction appears.

❤️ Charity means practical love in action
🤲 Service points to hands on ministry
🏆 This is the longest list of any church
📖 Warm praise comes before the correction

---
## 📈 The Last To Be More Than The First

This church was growing in these virtues over time.

That stands in sharp contrast to Ephesus, which had been slipping backward.

Good works alone do not guarantee a healthy church.

Growth in love still needs to be paired with sound discernment.

📈 Thyatira was growing, not slipping
🔀 This contrasts with Ephesus's decline
⚖️ Good works alone are not enough
📖 Growth still needs real discernment

---
## 👩 That Woman Jezebel

The original Jezebel was a wicked queen in the book of Kings.

She pushed Israel toward idol worship through her husband King Ahab.

This woman in Thyatira is not literally named Jezebel.

The name labels her as repeating that same old pattern of corruption.

👩 The original Jezebel was a wicked queen
👑 She pushed Israel toward idol worship
🏷️ This woman likely had a different real name
📖 The label marks a repeated pattern of corruption

---
## 🗣️ Calleth Herself A Prophetess

A true prophetess spoke God's real message to His people.

This woman claimed that same authority for herself.

Her teaching led people toward sin instead of toward God.

A real title does not guarantee a real calling.

🗣️ A true prophetess spoke God's real message
🎭 This woman only claimed that authority
➡️ Her teaching led people toward sin
📖 A title does not guarantee a true calling

---
## 🍽️ To Seduce My Servants To Commit Fornication, And To Eat Things Sacrificed Unto Idols

These are the same two sins already named in the Pergamos letter.

Both churches faced pressure to blend faith with local pagan custom.

"Seduce" shows this was active persuasion, not accidental drift.

Someone was deliberately leading others away from faithfulness.

🍽️ These match the sins named at Pergamos
🔀 Both churches faced the same pressure
🎯 Seduce means active persuasion, not drift
📖 Someone was deliberately leading others astray

---
## ⏳ I Gave Her Space To Repent

"Space" here means time and real opportunity, not physical room.

Christ did not act immediately the moment this sin began.

Patience was already extended before any judgment arrived.

That patience was met with no change at all.

⏳ Space here means time and opportunity
🕰️ Christ did not act immediately
🤲 Patience came before any judgment
📖 That patience met no real change

---
## 🛏️ I Will Cast Her Into A Bed, And Them That Commit Adultery With Her Into Great Tribulation

"Bed" here plays on the same bed used for her sin, now turned into suffering.

This likely points to real sickness or hardship, not only future judgment.

Those who followed her teaching share directly in these consequences.

Following corrupt teaching was never a neutral or private choice.

🛏️ Bed plays on her own sin becoming suffering
🤒 This likely points to real, present hardship
👥 Followers share in these same consequences
📖 Following corrupt teaching was never neutral

---
## ☠️ I Will Kill Her Children With Death

This most likely names her literal followers, not biological children.

"Children" in scripture often names those who follow someone's example closely.

These consequences fall specifically on those who kept following this teaching.

Judgment here targets ongoing rebellion, not innocent bystanders.

☠️ Children likely names her close followers
👪 Children often names those copying someone's example
🎯 Judgment falls on ongoing rebellion
📖 Innocent bystanders are not the target

---
## 🫀 He Which Searcheth The Reins And Hearts

"Reins" is an old word for the kidneys, once believed to hold deep feelings.

"Hearts" named the seat of a person's thoughts and intentions.

Together they describe God's complete knowledge of motive, not just action.

Every person in every church receives judgment based on what God actually sees.

🫀 Reins is an old word for the kidneys
🧠 Hearts named a person's thoughts and intentions
🔍 Together they picture complete knowledge of motive
📖 Judgment matches what God actually sees

# Revelation 2:24-29
# 🌟 The Morning Star
---
## 🌑 As Many As Have Not Known The Depths Of Satan

Some false teachers in Thyatira apparently claimed deep spiritual insight.

They may have taught that exploring sin brought a deeper knowledge of grace.

Christ calls that claimed insight exactly what it actually was.

Real spiritual depth is never found by chasing after sin.

🌑 False teachers claimed deep spiritual insight
🕳️ They may have linked sin to deeper grace
🏷️ Christ names that claim plainly
📖 Real depth is never found through sin

---
## ⚖️ I Will Put Upon You None Other Burden

This echoes the decision made by church leaders in Acts fifteen.

There, believers were told to avoid only a short list of real dangers.

Christ asks nothing extra of the faithful remnant in this church.

Simple faithfulness, not a long list of new rules, is what he asks.

⚖️ This echoes the decision in Acts fifteen
📋 Only a short list of dangers was named
🙅 Christ adds no extra requirements here
📖 Simple faithfulness is what he asks

---
## 🔒 That Which Ye Have Already Hold Fast Till I Come

These believers are not asked to achieve something new.

They are asked only to keep holding what they already have.

"Till I come" points forward to Christ's promised return.

Endurance, not fresh achievement, is the assignment given here.

🔒 No new achievement is being asked for
🤲 They are asked to keep holding on
🔮 Till I come points to Christ's return
📖 Endurance is the real assignment

---
## 🌍 Power Over The Nations

This promise is given to whoever overcomes and keeps Christ's works to the end.

It pictures believers one day sharing real authority with Christ.

That authority is not earned by status but given through faithfulness.

The reward matches the scale of what was endured.

🌍 This pictures shared authority with Christ
🏆 It is given through faithfulness, not status
⏳ It comes to those who endure fully
📖 The reward matches what was endured

---
## 🦶 He Shall Rule Them With A Rod Of Iron

"Rod of iron" names a rule that cannot be bent or broken.

This same phrase comes from Psalm two about God's chosen king.

Christ already claimed this exact promise for himself elsewhere in scripture.

Believers are now promised a share in that same unbreakable rule.

🦶 Rod of iron names unbreakable rule
📜 This phrase comes from Psalm two
👑 Christ already claimed this promise for himself
📖 Believers now share in that same rule

---
## 🏺 As The Vessels Of A Potter Shall They Be Broken To Shivers

Clay pottery was common, useful, and very easily shattered.

"Shivers" here means small, broken pieces, not a modern chill.

Rebellious nations are pictured as fragile despite looking powerful now.

Real strength belongs to the one holding the rod, not the clay.

🏺 Clay pottery was common and easily shattered
🧩 Shivers here means small broken pieces
💨 Rebellious power looks strong but stays fragile
📖 Real strength belongs to Christ, not the clay

---
## 👨‍👦 Even As I Received Of My Father

Christ already holds this same authority from his Father directly.

What believers are promised is not a brand new kind of power.

It is a real share in authority that already belongs to Christ.

Nothing promised here exceeds what Christ himself already has.

👨‍👦 Christ already received this authority from his Father
🆕 This is not a brand new power
🤝 Believers share in authority Christ already holds
📖 Nothing promised exceeds what Christ already has

---
## 🌟 I Will Give Him The Morning Star

The morning star is the planet Venus, visible just before sunrise.

It was often used in the ancient world as a symbol of victory.

Later in Revelation, Christ calls himself the bright and morning star.

This gift turns out to be Christ's own presence, not merely an object.

🌟 The morning star is the planet Venus
🏆 It symbolized victory in the ancient world
✝️ Christ later calls himself this same star
📖 The gift is Christ's own presence

---
## 📢 What The Spirit Saith Unto The Churches

This closing line repeats the refrain used in every letter so far.

Here it comes after the promise instead of before it.

The order changes, but the call to truly listen does not.

Every reader, in every church, is being asked the exact same question.

👂 This repeats the refrain from every letter
🔀 Here it comes after the promise instead
🎯 The call to listen never changes
📖 Every reader faces the same question
`.trim();

export const REVELATION_TWO_PERSONAL_SECTIONS = parseRevelationTwoRawNotes(REVELATION_TWO_RAW_NOTES);
