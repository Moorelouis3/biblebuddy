export type ActsNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsNineteenRawNotes(rawText: string): ActsNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 19:${startVerse}` : `Acts 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Acts 19 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_NINETEEN_RAW_NOTES = `# Acts 19:1-7
# 🕊️ The Baptism They Had Not Received
---
## 📖 While Apollos Was At Corinth

Apollos was the gifted teacher Paul's letters later praise in Corinth.

Acts eighteen already showed him leaving Ephesus for Corinth.

Paul now arrives in Ephesus while Apollos is away.

Their ministries overlap without the two men ever meeting here.

📖 Apollos taught earlier in chapter eighteen
🧭 He had already left for Corinth
🔁 Paul arrives in Ephesus right after
➡️ Two ministries overlap without crossing paths

## 🗺️ Passed Through The Upper Coasts

The upper coasts means the inland highlands of Asia Minor.

Paul took the overland route instead of sailing along the coast.

That path led through the regions of Galatia and Phrygia.

It was a slower road built out of deliberate pastoral care.

🗺️ Upper coasts means the inland highlands
🚶 Paul traveled overland not by sea
🧭 The road passed through Galatia and Phrygia
➡️ A slower path chosen on purpose

## 👂 Finding Certain Disciples

These disciples were followers of John the Baptist, not yet Paul's converts.

They believed the message John preached about a coming Messiah.

They had never heard that the Holy Ghost had already been given.

Paul's conversation with them was about to fill in what they were missing.

👂 Disciples here followed John's message
⏳ They believed in a coming Messiah
❓ They had not heard of the Holy Ghost
📖 Paul fills the gap in their understanding

## ❓ Have Ye Received The Holy Ghost Since Ye Believed

Belief and receiving the Holy Ghost are not automatically the same moment.

Paul asks this question because something seems incomplete in their faith.

A genuine believer should have some experience of the Spirit's arrival.

Paul is diagnosing a gap before he tries to fix it.

❓ Paul asks about their experience
🔍 Something in their faith seems incomplete
🕊️ Belief and the Spirit are connected
📖 Paul diagnoses before he teaches

## 😮 We Have Not So Much As Heard

Their answer shows they never received the fuller gospel message.

They likely only knew what John the Baptist had taught them.

Ephesus sat far from Jerusalem, so news traveled slowly here.

Their honest answer opens the door for Paul to explain more.

😮 Their answer reveals a real gap
👂 They only knew John's teaching
🗺️ Ephesus sat far from Jerusalem
➡️ Honesty opens the door to more

## 💧 Unto John's Baptism

John's baptism marked repentance and turning away from sin.

It prepared the heart but did not yet point to Jesus as the risen Lord.

These disciples had stopped at that first step and gone no further.

They needed someone to carry them the rest of the way.

💧 John's baptism marked repentance
🚪 It prepared the heart first
🛑 These disciples had stopped there
📖 Paul carries them further

## 👣 Him Which Should Come After Him

John always described himself as a forerunner, never the main figure.

He pointed every listener toward someone greater who was still coming.

Paul explains that the one John promised is Jesus Christ.

The whole purpose of John's ministry was to prepare the way for Him.

👣 John called himself a forerunner
👉 He pointed toward someone greater
✝️ Paul names that someone as Jesus
📖 John's whole ministry prepared the way

## 💧 Baptized In The Name Of The Lord Jesus

Hearing this news, the disciples ask for Christian baptism right away.

This is not Paul contradicting John's earlier baptism.

It is these disciples completing what John's baptism was always pointing toward.

Full faith in Jesus now gets its own public mark.

💧 They ask for baptism immediately
🚫 This does not contradict John
✅ It completes what John pointed toward
📖 Full faith gets its own mark

## ✋ Laid His Hands Upon Them

Laying on hands was a physical gesture marking a moment of blessing.

Peter and John used the same gesture back in Samaria in chapter eight.

The gesture itself held no magic power on its own.

God chose to work through that ordinary human touch.

✋ Laying on hands marked a blessing
🔁 The same gesture appeared in chapter eight
🚫 The gesture held no power alone
📖 God worked through ordinary touch

## 🔥 They Spake With Tongues, And Prophesied

These same two signs marked the Holy Ghost's arrival at Pentecost.

They appeared again when Gentiles first received the Spirit in chapter ten.

Here they confirm that these Ephesian disciples now share the same gift.

The outward sign matches the inward reality every single time.

🔥 Tongues marked Pentecost in chapter two
🌍 The same signs appeared in chapter ten
🕊️ Now these disciples share that gift
📖 The outward sign matches the inward reality

## 🔢 All The Men Were About Twelve

Luke gives an exact headcount for this small group of believers.

Twelve is a modest number next to the thousands converted in Jerusalem.

A small beginning in Ephesus would soon grow into a lasting church.

Paul's own letters later show how deeply that church mattered to him.

🔢 Twelve marks a small beginning
📉 A modest number next to Jerusalem
🌱 This small group becomes a lasting church
📖 Paul later writes deeply to this church

# Acts 19:8-10
# 📚 Two Years In The School Of Tyrannus
---
## 🗣️ Spake Boldly

Boldness marks Paul's preaching throughout the whole book of Acts.

Ephesus was home to a famous pagan temple and a hostile crowd.

Speaking openly here carried real risk, not just mild discomfort.

Paul chose the harder, more direct approach every time.

🗣️ Boldness defines Paul's preaching
🏛️ Ephesus held a famous pagan temple
⚠️ Open preaching carried real risk
📖 Paul chose the harder path

## ❓ Disputing And Persuading

Disputing means reasoning things out through open back and forth questions.

Persuading means building an argument strong enough to change someone's mind.

Paul was not shouting slogans at people passing by.

He was teaching the way a patient teacher works through hard questions.

❓ Disputing means open back and forth
🧠 Persuading means building a real argument
🚫 This was not shouting slogans
📖 Paul taught like a patient teacher

## 👥 Divers Were Hardened

Divers is an old word simply meaning several or various people.

Hardened describes a heart that keeps refusing to listen no matter the evidence.

Not everyone in the synagogue responded the same way to Paul.

Some grew more stubborn the longer they heard the message.

👥 Divers means several or various people
🪨 Hardened means a heart refusing to listen
🙅 Not everyone responded the same way
📖 Stubbornness can grow with more exposure

## 🚶 Spake Evil Of That Way

That way was an early nickname for the whole Christian movement.

Luke uses this same phrase several times throughout the book of Acts.

Speaking evil of it means publicly mocking or slandering the message.

Paul does not argue back here, he simply moves the teaching elsewhere.

🚶 That way names the Christian movement
📖 Luke repeats this phrase across Acts
😠 Speaking evil means public mockery
➡️ Paul responds by moving not arguing

## 🏛️ The School Of One Tyrannus

A school like this was a rented lecture hall used for daily teaching.

Tyrannus was likely the hall's own regular teacher or its owner.

Paul used the space during hours it would otherwise sit empty.

This hall became his base for the next two years of ministry.

🏛️ A school meant a rented lecture hall
👤 Tyrannus likely owned or taught there
⏰ Paul used otherwise empty hours
📖 This hall became his base for years

## 📆 Continued By The Space Of Two Years

Two years is the longest stretch Paul stayed in any one city.

Most of his earlier stops lasted weeks or a few months at most.

This steady, patient teaching gave the message time to spread widely.

Ephesus became a major hub for the whole region's faith.

📆 Two years was Paul's longest stay
⏳ Earlier stops lasted weeks or months
🌱 Patient teaching let the message spread
📖 Ephesus became a major regional hub

## 🗺️ All They Which Dwelt In Asia

Asia here means a Roman province in what is now western Turkey.

It is not a name for the entire continent.

Travelers and traders from across that province passed through Ephesus constantly.

Paul's message reached the whole region without him leaving the city.

🗺️ Asia means a Roman province
🚫 Not the whole continent
🛣️ Travelers passed through Ephesus constantly
📖 Paul's message spread without him leaving

# Acts 19:11-12
# 🧣 Healing Through Handkerchiefs
---
## 🙌 God Wrought Special Miracles

Luke makes a point of naming God as the one doing the work.

Paul is the channel here, never the actual source of the power.

This distinction matters in a city full of competing magicians and healers.

Credit for every miracle belongs to God alone.

🙌 God is named as the source
🧑 Paul is only the channel
🎭 Ephesus was full of rival magicians
📖 Credit belongs to God alone

## ✨ Special Miracles By The Hands Of Paul

Special here means unusual, beyond the ordinary healings seen elsewhere.

Most healings in Acts happen through touch or spoken command.

These went further, working even through objects connected to Paul.

The unusual method still pointed back to the same unusual power.

✨ Special means beyond the ordinary
🤲 Most healings used touch or words
📦 These worked through connected objects
📖 The method changed the source did not

## 🧣 Handkerchiefs Or Aprons

A handkerchief here was a cloth used to wipe sweat from the face.

An apron was the work covering Paul wore while making tents.

These were ordinary, everyday items from Paul's own trade.

God used plain objects, not special or sacred relics.

🧣 A handkerchief wiped away sweat
⛺ An apron came from his tentmaking trade
🧵 Both were ordinary working items
📖 God used plain objects not relics

## 👹 The Evil Spirits Went Out Of Them

This verse names two separate results, not one single effect.

Physical diseases left the sick who touched these cloths.

Evil spirits left those who were oppressed in a different way.

God addressed both kinds of suffering through the same simple act.

🏥 Diseases left the physically sick
👹 Evil spirits left the oppressed
🔀 Two different problems, one solution
📖 God addressed both kinds of suffering

# Acts 19:13-16
# 👹 The Seven Sons Of Sceva
---
## 🚶 Vagabond Jews, Exorcists

Vagabond describes someone who travels from town to town with no fixed home.

Exorcists were people who claimed power to cast out evil spirits.

These particular men moved through cities selling that claimed power for money.

Ephesus had a well known reputation for this kind of trade.

🚶 Vagabond means a wandering traveler
🧙 Exorcists claimed power over spirits
💰 They sold that claim for money
📖 Ephesus was known for this trade

## ⚖️ We Adjure You By Jesus Whom Paul Preacheth

Adjure means to command someone under a solemn, binding oath.

These men treat Jesus's name like a password rather than a person to trust.

They had seen the name work power through Paul and wanted the same result.

Using a name is not the same as having real faith in it.

⚖️ Adjure means a solemn command
🔑 They treat the name like a password
👀 They copied what they saw in Paul
📖 A name is not the same as faith

## 👤 Seven Sons Of One Sceva

Sceva is called a chief of the priests, likely a title he claimed rather than held.

No record outside this verse confirms a legitimate priest by that name.

His seven sons apparently ran this exorcism business as a family trade.

Borrowed religious titles were common ways to add credibility to a scheme.

👤 Sceva claimed a priestly title
❓ No outside record confirms it
👨‍👦‍👦 His sons ran this as a family trade
📖 Borrowed titles added false credibility

## 👂 Jesus I Know, And Paul I Know, But Who Are Ye

The evil spirit recognizes two names it knows carry real authority.

It names Jesus and Paul, then dismisses these brothers outright.

Real spiritual authority comes from a genuine relationship, not a formula.

The spirit exposes exactly what these men were missing.

👂 The spirit recognizes Jesus and Paul
🙅 It dismisses these brothers outright
🤝 Authority comes from real relationship
📖 A formula cannot replace faith

## 💢 Leaped On Them, And Overcame Them

Three verbs in a row show how fast and complete this reversal was.

Leaped, overcame, and prevailed describe one continuous, violent moment.

Seven men together could not stand against this single man.

The exorcists' confidence vanishes in an instant.

💢 Three verbs show rapid defeat
👤 One man against seven
📉 Their confidence vanishes instantly
📖 Numbers did not decide this fight

## 😖 Fled Out Of That House Naked And Wounded

The man with the evil spirit suddenly overpowers all seven brothers at once.

Their scheme collapses into real physical injury within moments.

Naked and wounded describes total, humiliating defeat, not a close call.

Counterfeit power finally meets the real thing and loses badly.

💥 One man overpowers all seven
📉 Their scheme collapses instantly
😖 Naked and wounded means total defeat
📖 Counterfeit power loses to the real thing

# Acts 19:17-20
# 🔥 Burning The Books Of Curious Arts
---
## 📣 Known To All The Jews And Greeks

News like this traveled fast through a city as connected as Ephesus.

Both Jewish and Greek residents heard exactly what had happened to Sceva's sons.

A failed magic trick is one story, a defeated evil spirit is another.

This story was too strange and too public to stay quiet.

📣 News traveled fast through Ephesus
👥 Both Jews and Greeks heard it
😲 The story was too strange to ignore
📖 Public events are hard to hide

## 😨 Fear Fell On Them All

This is a healthy, reverent fear, not a cowering terror.

People realized real spiritual power had just been on display.

The name of the Lord Jesus was magnified because of it.

A failed counterfeit ended up proving the real thing was true.

😨 This fear was reverent not cowering
⚡ Real spiritual power had been shown
✝️ Jesus's name was magnified by it
📖 A failed fake proved the real thing

## 🗣️ Confessed, And Shewed Their Deeds

These new believers publicly admitted practices they had kept hidden before.

Confessing privately would have been far easier and less costly.

Choosing public honesty showed how seriously they took this change.

Real repentance here came with a real social cost.

🗣️ They confessed their practices publicly
🙈 Private confession would have been easier
💪 Public honesty showed real seriousness
📖 Repentance here had a real cost

## 🔮 Curious Arts

Curious arts is an old phrase for magic, sorcery, and occult practice.

Ephesus was famous across the ancient world for exactly this kind of trade.

Scrolls describing spells and charms were valuable, specialized property.

Burning them meant destroying a real source of income, not just old paper.

🔮 Curious arts means magic and sorcery
🏛️ Ephesus was famous for this trade
📜 These scrolls held real value
📖 Burning them cost real money

## 🪙 Fifty Thousand Pieces Of Silver

A single piece of silver here was close to a full day's wage.

Fifty thousand of them equals several lifetimes of ordinary earnings.

These new believers destroyed that value without hesitation or regret.

The size of the loss shows the size of their conviction.

🪙 One piece equaled about a day's wage
⏳ Fifty thousand meant several lifetimes of pay
🔥 They destroyed it without hesitation
📖 Their loss measured their conviction

## 📈 Mightily Grew The Word Of God And Prevailed

Luke uses this same phrase at other turning points across the book of Acts.

Each time, the gospel grows stronger right after a real conflict.

Opposition here did not slow the message, it cleared the way for it.

Ephesus had just witnessed exactly whose power was real.

📈 This phrase marks turning points in Acts
⚔️ Growth often follows real conflict
🧹 Opposition cleared the way instead
📖 Ephesus saw exactly whose power was real

# Acts 19:21-22
# 🗺️ Paul Sets His Sights On Rome
---
## 🧭 Purposed In The Spirit

Purposed here means Paul settled on a plan with firm resolve.

In the spirit suggests this decision came from more than his own ambition.

Paul is not guessing at his next move, he is convinced of it.

This resolve will carry him through hardship for the rest of Acts.

🧭 Purposed means a firm resolve
🕊️ In the spirit points past ambition
💪 Paul is convinced not guessing
📖 This resolve carries the rest of Acts

## 🏛️ I Must Also See Rome

Rome was the capital of the entire empire, far beyond Jerusalem's size and reach.

Paul names this goal long before any ship ever carries him there.

The rest of the book of Acts slowly builds toward this exact destination.

What sounds like a passing comment is really the story's finish line.

🏛️ Rome was the empire's capital
🚢 Paul names it before any voyage
📘 Acts builds toward this destination
📖 A passing line sets up the finish

## 📜 Timotheus And Erastus

Timotheus is the same Timothy who later receives two personal letters from Paul.

Erastus appears again later, connected to the city of Corinth.

Paul regularly sent trusted companions ahead to prepare the way.

These two men carried real responsibility, not just errands.

📜 Timotheus later receives Paul's letters
🏙️ Erastus connects later to Corinth
🧑‍🤝‍🧑 Paul sent trusted companions ahead
📖 Their errands carried real responsibility

## ⏳ Stayed In Asia For A Season

A season here means a limited, specific stretch of time, not forever.

Paul's work in Ephesus was not finished even as he planned his next steps.

He kept building in one place while already looking toward another.

Patience and ambition worked side by side in Paul's ministry.

⏳ A season means a limited stretch
🏗️ His Ephesus work was not finished
👀 He planned ahead while still building
📖 Patience and ambition worked together

# Acts 19:23-27
# 🥈 Demetrius Defends His Trade
---
## 📢 No Small Stir About That Way

No small stir is an old way of saying a very large disturbance.

Saying it this way understates the trouble on purpose for effect.

That way again names the whole Christian movement, as it did in verse nine.

This single sentence sets up the riot that follows.

📢 No small stir means a huge disturbance
🔄 The phrase understates on purpose
🚶 That way again names the movement
📖 This line sets up the riot

## 🛠️ Demetrius, A Silversmith

A silversmith worked precious metal into finished goods for sale.

Demetrius ran a business built entirely around one city's religious tourism.

His trade depended completely on devotion to the local goddess continuing.

Anything that threatened that devotion threatened his livelihood directly.

🛠️ A silversmith shaped metal goods
💼 Demetrius ran a tourism based business
🙏 His trade depended on local devotion
📖 A threat to the goddess threatened him

## 🏛️ Silver Shrines For Diana

These shrines were small silver models sold to visitors and pilgrims.

Diana, also called Artemis, had one of the largest temples in the ancient world.

Owning a model of that temple was a common act of devotion.

This trade turned religious loyalty into a steady source of income.

🏛️ Shrines were small models of the temple
✨ Diana's temple was famous worldwide
🙏 Owning one showed personal devotion
📖 Devotion turned into steady income

## 💰 By This Craft We Have Our Wealth

Demetrius states his real concern plainly, without any religious cover at all.

He gathers other workmen in the same trade to back his complaint.

This is a business meeting about protecting income, not a theology debate.

Money, more than faith, is driving the coming riot.

💰 Demetrius names money as the issue
🤝 He gathers workmen in his trade
📊 This is a business meeting first
📖 Money drives the coming riot

## 🔨 Gods, Which Are Made With Hands

This is the exact teaching that threatened Demetrius's entire business.

Paul taught that handmade objects cannot actually be real gods.

That claim, spread across the whole province, was quietly emptying his customer base.

A simple theological point carried real economic consequences.

🔨 Handmade objects cannot be real gods
📍 Paul's teaching spread across the province
📉 It was emptying Demetrius's customer base
📖 Theology here carried economic weight

## 🏛️ The Temple Of The Great Goddess Diana

This temple stood as one of the largest buildings in the ancient world.

Many ancient writers counted it among the seven wonders of that world.

Pilgrims and tourists from across the empire traveled to see it.

Demetrius frames Paul's teaching as an attack on the whole city's pride.

🏛️ One of the largest ancient buildings
🌍 Counted among the seven wonders
🧳 Pilgrims traveled from across the empire
📖 Demetrius frames this as an attack on pride

## 📣 Whom All Asia And The World Worshippeth

This claim is clearly an exaggeration meant to stir up the crowd.

Not every person in Asia, let alone the whole world, worshipped Diana.

Demetrius inflates the stakes to rally support for his own cause.

Fear of losing status often speaks louder than fact.

📣 This claim exaggerates for effect
🌐 Not everyone truly worshipped Diana
📈 Demetrius inflates the stakes
📖 Fear can speak louder than fact

# Acts 19:28-34
# 🎭 Uproar In The Theatre
---
## 📣 Great Is Diana Of The Ephesians

This phrase worked as a rehearsed, ritual chant, not a spontaneous shout.

Crowds used chants like this at festivals throughout the ancient world.

Repeating it together gave the mob a shared sense of purpose.

Demetrius's speech had successfully turned a business complaint into a religious cause.

📣 This was a rehearsed ritual chant
🎉 Crowds used chants at festivals
🤝 Repetition united the mob
📖 A business complaint became a cause

## 🌀 The Whole City Was Filled With Confusion

Confusion here describes genuine chaos, not mild disorder.

News of the uproar spread faster than anyone could control it.

Many in the crowd were reacting without understanding the actual issue.

A city can turn volatile quickly when rumor outruns the facts.

🌀 Confusion here means genuine chaos
📢 News spread faster than control
❓ Many reacted without understanding
📖 Rumor can outrun the facts

## 🧑‍🤝‍🧑 Gaius And Aristarchus

These two men traveled with Paul as trusted companions on his journeys.

Aristarchus appears again later, staying with Paul even into his imprisonment.

The mob seizes them because Paul himself cannot be found as easily.

Loyalty to Paul now put his close friends directly in danger.

🧑‍🤝‍🧑 Both men traveled with Paul
📜 Aristarchus stays with him later
🎯 The mob seizes them instead
📖 Loyalty put his friends in danger

## 🏛️ Rushed With One Accord Into The Theatre

The theatre at Ephesus was a massive stone venue built into a hillside.

It could hold tens of thousands of people at once.

Public gatherings like trials or protests often used this same space.

A furious crowd this size could turn deadly within minutes.

🏛️ The theatre was a massive venue
👥 It held tens of thousands
⚖️ Public gatherings often met there
📖 A crowd this size could turn deadly

## 🚪 The Disciples Suffered Him Not

Paul wanted to go speak directly to the angry crowd himself.

His friends physically stopped him before he could reach the theatre.

Suffered here is an old word meaning allowed or permitted.

Real loyalty sometimes means protecting someone from their own courage.

🚪 Paul wanted to face the crowd
✋ His friends physically stopped him
🛑 Suffered here means allowed
📖 Loyalty sometimes overrules courage

## 🏛️ The Chief Of Asia

The chief of Asia names provincial officials overseeing religious and civic affairs.

These were powerful men, not ordinary bystanders in the crowd.

Even some of them count themselves among Paul's genuine friends here.

Paul had earned respect in surprisingly high places during his time in Ephesus.

🏛️ Chief of Asia names provincial officials
👑 These were powerful not ordinary men
🤝 Some counted themselves Paul's friends
📖 Paul earned respect in high places

## ❓ The More Part Knew Not Wherefore

Most people in this crowd did not actually know why they had gathered.

They were simply swept along by noise and momentum.

Mob behavior often spreads this way, through motion rather than reason.

A crowd can feel united while actually being completely confused.

❓ Most did not know the reason
🌊 They were swept along by noise
🏃 Mobs spread through motion not reason
📖 Unity can hide real confusion

## 🙋 The Jews Putting Him Forward

The Jewish community in Ephesus wanted no part of this riot's blame.

Paul's message had already strained relations between Jews and Gentile neighbors.

Putting Alexander forward was an attempt to separate their own reputation from his.

Fear of guilt by association shaped this entire moment.

👥 Jews wanted no blame for the riot
⚠️ Paul's message strained local relations
🙋 Alexander was pushed forward to separate them
📖 Fear of association shaped this moment

## ✋ Beckoned With The Hand

This gesture was a common way to call for quiet before speaking in public.

Public speakers used it constantly in theatres and assemblies across the empire.

Alexander hoped the crowd would calm enough to actually hear him.

The gesture never gets the chance to work in this moment.

✋ This gesture called for quiet
🎤 Speakers used it before addressing crowds
🤞 Alexander hoped for a chance to speak
📖 The chance never actually comes

## ⏰ About The Space Of Two Hours Cried Out

Realizing Alexander was a Jew, the crowd refused to let him speak at all.

They lumped every Jew together with Paul's teaching against their goddess.

Two straight hours of chanting shows how deep this mob's fury ran.

Prejudice here silenced a man who may have agreed with the crowd.

🙅 The crowd refused to let him speak
👥 They lumped all Jews together
⏰ Two hours shows deep fury
📖 Prejudice silenced an innocent man

# Acts 19:35-41
# ⚖️ The Townclerk Calms The Crowd
---
## 📋 The Townclerk

A townclerk managed the city's official records and oversaw public assemblies.

This made him the most senior civic official likely to be in the room.

His job depended on keeping Ephesus in Rome's good favor.

A full scale riot threatened everything he was responsible for protecting.

📋 A townclerk managed city records
🏛️ He oversaw public assemblies
🤝 His job depended on Rome's favor
📖 A riot threatened everything he protected

## ✨ The Image Which Fell Down From Jupiter

Many Ephesians believed their image of Diana had come down from the heavens itself.

This legend gave the city a sense of special, divine favor.

Jupiter here points to the sky or heaven, not a literal visit from that god.

That old legend gave Ephesus real civic pride and status.

✨ The image was believed sent from heaven
🏙️ This legend gave the city status
☁️ Jupiter here points to the sky
📖 Old legends shaped real civic pride

## ⚠️ Do Nothing Rashly

The townclerk shifts the crowd's attention from anger toward real consequences.

Roman authorities punished cities harshly for unauthorized riots like this one.

Acting rashly now could bring trouble on the entire city, not just Demetrius.

Calm thinking, not more shouting, was the only way out of this.

⚠️ He points to real consequences
🏛️ Rome punished cities for riots
🧮 Rash action risked the whole city
📖 Calm thinking offered the only way out

## 🏛️ Robbers Of Churches

Robbers of churches named a specific, serious crime of stealing temple property.

The townclerk points out that Paul's companions committed no such crime.

Nor had they spoken any direct insult against the goddess herself.

He is dismantling the mob's case using their own legal standards.

🏛️ This named a specific temple crime
🙅 Paul's companions committed no such crime
🗣️ No direct insult was spoken either
📖 He dismantles the case with their own standards

## ⚖️ The Law Is Open, And There Are Deputies

Deputies here were Roman officials, like proconsuls, who handled legal disputes.

Rome provided a real, working system for settling exactly this kind of complaint.

The townclerk reminds the crowd that proper channels already existed.

A mob was never the correct way to resolve this disagreement.

⚖️ Deputies were Roman legal officials
🏛️ Rome provided a working legal system
📋 Proper channels already existed
📖 A mob was never the right way

## ⚖️ Let Them Implead One Another

Implead is an old legal term meaning to bring formal charges in court.

Demetrius had a real grievance about his business, in his own view.

The townclerk tells him exactly where that grievance belonged, in a courtroom.

A courtroom complaint and a street riot are never the same thing.

⚖️ Implead means filing formal charges
💼 Demetrius had a business grievance
🏛️ The courtroom was the right venue
📖 A complaint and a riot differ completely

## 📜 A Lawful Assembly

Rome only permitted gatherings that were officially approved in advance.

This crowd in the theatre had no such approval at all.

Calling for a lawful assembly exposes exactly how illegal this gathering already was.

The townclerk is quietly warning everyone present of their own risk.

📜 Rome required approved gatherings
🚫 This crowd had no approval
⚠️ The word choice exposes the risk
📖 The warning reached everyone present

## 🏛️ Called In Question For This Day's Uproar

Rome regularly held entire cities responsible for riots like this one.

A pattern of unrest could cost Ephesus privileges it had long enjoyed.

The townclerk's own position and safety were tied to the city's good standing.

Self interest and civic duty point him toward the same conclusion here.

🏛️ Rome held whole cities responsible
💔 Unrest could cost real privileges
🧑‍⚖️ His own safety was tied to this
📖 Self interest and duty aligned here

## 👥 Concourse

Concourse is an old word for a disorderly, uncontrolled crowd.

It carries none of the respect given to a lawful assembly.

Calling it that one more time makes the danger unmistakable.

Every official watching this knew exactly what word meant trouble.

👥 Concourse means a disorderly crowd
🚫 It carries no legal respect
⚠️ The word makes danger unmistakable
📖 Officials knew exactly what it meant

## 🗣️ He Dismissed The Assembly

One calm, reasoned speech accomplishes what no amount of shouting could.

The riot ends without a single person being seriously hurt.

Paul is kept safely out of a crowd that could have killed him.

God used an unexpected official to protect a ministry still far from finished.

🗣️ One calm speech ends the riot
🙌 No one is seriously hurt
🛡️ Paul stays safely out of danger
📖 God used an outsider to protect His work
`.trim();

export const ACTS_NINETEEN_PERSONAL_SECTIONS = parseActsNineteenRawNotes(ACTS_NINETEEN_RAW_NOTES);
