export type ActsFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsFourRawNotes(rawText: string): ActsFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 4:${startVerse}` : `Acts 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Acts 4 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_FOUR_RAW_NOTES = `# Acts 4:1-4
# ⛓️ Arrested For Preaching The Resurrection
---
## 🏛️ The Captain Of The Temple

"Captain" means an officer in charge, not a battlefield general.

He commanded the Levite guard that patrolled the temple courts.

Keeping order inside the temple grounds was his daily duty.

Arresting two men for a disturbance fell well within his job.

The arrest came from the top of temple security, not a street officer.

🏛️ Captain means an officer, not a general

🛡️ He led the temple's own guard

👮 Order inside the temple was his job

➡️ Official power moved against them fast

## ⚖️ The Sadducees

The Sadducees were a powerful Jewish party among the rulers.

They openly rejected any idea of a future resurrection of the dead.

Peter and John were not merely accused of healing a man.

They were accused of teaching the exact doctrine the Sadducees denied.

That is why this specific group reacted so fast.

⚖️ Sadducees were a ruling Jewish party

🚫 They denied any resurrection of the dead

🗣️ Peter preached the resurrection directly

📖 That doctrine, not just the healing, provoked them

## 😠 Being Grieved That They Taught The People

"Grieved" here means deeply irritated, not sad.

The apostles were not punished simply for healing a man.

They were punished for teaching in public, in the temple itself.

Teaching, not healing, threatened the leaders' authority the most.

Control over temple teaching was something they guarded closely.

😠 Grieved means deeply irritated

🗣️ Public teaching caused the real offense

🏛️ It happened inside their own temple

➡️ Authority, not just doctrine, felt threatened

## 🔒 Put Them In Hold Unto The Next Day

"Hold" means a jail or place of custody.

"Eventide" means evening, when the day was already ending.

Jewish council sessions usually did not convene after dark.

The delay was about timing, not about danger.

A full council trial would have to wait for morning light.

🔒 Hold means a jail or custody

🌆 Eventide means evening

🕰️ Councils rarely met after dark

➡️ The delay was timing, not danger

## 🔢 The Number Of The Men Was About Five Thousand

This count names men only, not women or children.

The real number of believers was almost certainly larger.

An earlier count in Acts had already reached about three thousand believers.

The church nearly doubled again in a very short time.

Growth kept accelerating even as opposition grew alongside it.

🔢 Five thousand counts men alone

👪 Women and children likely added more

📈 Belief had already doubled since Pentecost

📖 The church grew as opposition grew

# Acts 4:5-12
# ⚖️ Peter Answers The Council
---
## ⚖️ Rulers, And Elders, And Scribes

These three groups together formed the Sanhedrin.

The Sanhedrin was the highest Jewish ruling council.

It held seventy one members and handled major religious cases.

This was the same body that had condemned Jesus.

⚖️ Rulers, elders, and scribes formed the Sanhedrin

🏛️ It was the highest Jewish council

👥 Seventy one members sat on it

📖 This same council had condemned Jesus

## 👴 Annas The High Priest, And Caiaphas

Annas had once served as high priest himself.

He still held enormous influence even after losing the office.

Caiaphas, his son in law, was now the official high priest.

Both men had already presided over the trial of Jesus.

Peter and John were standing before the very same leaders.

👴 Annas was a former high priest

👨 Caiaphas was the current high priest

👪 The two men were related by marriage

📖 Both had judged Jesus already

## ❓ By What Power, Or By What Name

Acting "in a name" meant claiming someone else's authority.

The council wanted to know whose authority stood behind the miracle.

A healing like this needed a source, in their minds.

They assumed it was either human skill or spiritual power.

Peter's answer was about to surprise them completely.

❓ They asked whose authority caused this

🗣️ A name meant a source of power

🤔 They expected human skill or spirit power

➡️ Peter's answer would surprise them

## 🔥 Peter, Filled With The Holy Ghost

Peter had already been filled with the Holy Ghost once, at Pentecost.

This filling happens again here, for this exact moment.

The Holy Ghost was not a one time experience for the apostles.

Boldness came fresh each time it was actually needed.

🔥 Peter was filled again, not once for all

📅 Pentecost already filled him once before

💪 Boldness came fresh for this moment

📖 The Spirit supplied courage as needed

## 🦵 The Impotent Man

"Impotent" is an old word meaning powerless or unable to move.

It describes physical weakness, not a moral failing.

This is the same lame man healed back in chapter three.

Peter brings the council's own question back to that healing.

🦵 Impotent means physically powerless

🚫 It is not a moral word

📖 This is the man from chapter three

➡️ Peter ties their question to that healing

## ✝️ Whom Ye Crucified, Whom God Raised From The Dead

Peter names the council's own role in the crucifixion directly.

He does not soften the accusation or avoid the subject.

In the same breath, he names God's reversal of that act.

Their worst decision became the very thing God overturned.

Peter speaks this to their faces, not behind their backs.

⚖️ Peter names their role plainly

✝️ He does not soften the charge

🌅 God reversed what they had done

➡️ He says it to their faces

## 🧱 The Stone Which Was Set At Nought Of You Builders

"Set at nought" means rejected or treated as worthless.

Peter is quoting a line from Psalm one eighteen.

Builders once tested stones and discarded the ones that did not fit.

The leaders rejected Jesus the same way, as unfit and useless.

God took that very rejected stone and gave it the highest place.

🚮 Set at nought means rejected

🧱 Builders once discarded flawed stones

✝️ They rejected Jesus the same way

📖 God gave the rejected stone the highest place

## 📐 The Head Of The Corner

The cornerstone sat at the base where two walls met.

Every other stone in the building lined up against it.

Without it, the whole structure would stand crooked or fall.

Peter says Jesus holds that same essential place for the whole church.

🧱 The cornerstone anchored two walls together

📐 Every other stone aligned to it

🏗️ Without it, the building could not stand

📖 Jesus holds that place for the church

## ✝️ None Other Name Under Heaven

Peter makes an exclusive claim here, not a flexible one.

No other person or power can offer this salvation.

This was a direct challenge to the religious system in front of him.

The claim was aimed straight at the council judging him.

Salvation was never available through many equal paths.

✝️ Only one name saves

🚫 No other path is offered

⚖️ The claim challenged the council directly

📖 Salvation was never equally available elsewhere

# Acts 4:13-18
# 😲 The Council's Dilemma
---
## 📚 Unlearned And Ignorant Men

"Unlearned" means without formal training in religious law.

"Ignorant" here means untrained, not stupid or foolish.

Peter and John were ordinary fishermen, not trained scholars.

Their boldness did not come from education or rank.

📚 Unlearned means untrained in religious law

🙅 Ignorant here does not mean foolish

🎣 Both men were ordinary fishermen

➡️ Their boldness had another source

## 👀 They Had Been With Jesus

The council could not explain their boldness through training.

So they noticed something else about these two men instead.

Their manner and words marked them as former followers of Jesus.

Association with Jesus left a visible mark on the way they spoke.

👀 The council noticed something unusual

🏷️ They recognized Jesus's mark on them

🗣️ It showed in how they spoke

📖 Following Jesus changes how a person acts

## 🧍 Beholding The Man Which Was Healed Standing With Them

The healed man stood right there as living evidence.

No one in the room could argue he was still lame.

Evidence this physical left the council with nothing to say.

Silence here was not peace.

It was defeat.

🧍 The healed man stood as proof

🚫 No one could call him still lame

🤐 The council had nothing to say

➡️ Their silence showed defeat

## 🚪 They Conferred Among Themselves

The council sent Peter and John out of the room first.

Whatever they decided, they did not want it witnessed.

A private conference reveals a weak position, not a strong one.

Confident leaders rarely need to hide their own deliberations.

🚪 They sent the men out first

🤫 The decision was made in private

😬 Privacy suggested a weak position

➡️ Confidence rarely hides its own talk

## 🗣️ We Cannot Deny It

The council admits the miracle openly, among themselves.

"Manifest" means plainly obvious, known to everyone in Jerusalem.

Their own words condemn their later threats as dishonest.

They know the truth and still choose to suppress it.

🗣️ The council admits it privately

👁️ Manifest means plainly obvious

📍 All Jerusalem already knew

➡️ They suppress a truth they admit

## 📏 Straitly Threaten Them

"Straitly" is an old word meaning strictly or severely.

A threat is the only tool left to a powerless council.

They cannot punish an act that helped a crippled man walk.

So they reach for fear instead of justice.

📏 Straitly means strictly or severely

🚫 They cannot punish a good deed

😨 Fear becomes their only tool

➡️ Threats replace real justice here

# Acts 4:19-22
# 🗣️ We Cannot But Speak
---
## ⚖️ Hearken Unto You More Than Unto God

Peter frames the choice as a matter of who truly rules him.

"Hearken" means to listen and obey, not just hear.

He is not weighing two equal opinions here.

Obedience to God outranks obedience to any human council.

⚖️ Peter names the real question

👂 Hearken means listen and obey

👑 God outranks any human council

➡️ The choice was never really close

## 🗣️ We Cannot But Speak

This is not stubbornness or rebellion for its own sake.

Peter and John personally saw and heard what they are reporting.

Eyewitnesses describing a real event cannot simply stay quiet.

Their compulsion comes from experience, not from defiance.

👀 They saw and heard it firsthand

🗣️ Eyewitnesses struggle to stay silent

🙅 This is not defiance for its own sake

📖 Experience, not stubbornness, drives their words

## 😬 Because Of The People

The council releases them, but not out of conviction.

Public opinion, not justice, decided the outcome here.

"Glorified God" shows where the crowd's loyalty actually stood.

The council's fear of the people outweighed their own authority.

😬 Fear of the crowd freed them

🙌 The people glorified God instead

⚖️ Justice was not the real motive

➡️ Public opinion outweighed the council's power

## 📆 Above Forty Years Old

This detail rules out any accusation of a staged or faked illness.

A disability lasting over forty years was documented and well known.

No one in Jerusalem could claim he was simply play acting.

The scale of the miracle matched the scale of the problem.

📆 Forty years ruled out faking it

👥 The man was well known in Jerusalem

🚫 No one could call it staged

📖 A big problem met a big miracle

# Acts 4:23-27
# 🙏 Lifting One Voice To God
---
## 👥 Their Own Company

Peter and John return to the wider group of believers.

This was not just the eleven remaining apostles alone.

The whole early church shared in this report and this moment.

News of pressure against the church became news for everyone.

👥 Their company means the wider church

🙅 Not the apostles alone

📰 The report reached the whole group

➡️ Pressure on some became news for all

## 🙏 Lifted Up Their Voice To God With One Accord

"With one accord" means everyone prayed together, in full agreement.

This was not one leader praying while others simply listened.

A whole room spoke a shared prayer with one shared purpose.

Their unity shaped how they responded to a real threat.

🗣️ One accord means full agreement

👥 The whole group prayed together

🙏 No single leader prayed alone

📖 Unity shaped their response to threat

## 📖 Why Did The Heathen Rage, And The People Imagine Vain Things

This line is a direct quote from Psalm two.

"Heathen" here means the nations outside Israel.

The psalm was originally about kings rising against God's chosen king.

The believers now apply that old psalm to their own moment.

📖 This quotes Psalm two directly

🌍 Heathen means the surrounding nations

👑 It was about rising against God's king

➡️ They apply it to their own moment

## 👑 Against The Lord, And Against His Christ

"His Christ" means God's anointed king, the Messiah.

Psalm two pictured earthly kings standing against that anointed one.

The believers now see that ancient picture fulfilled in Jesus.

Opposition to Jesus was not a new or surprising pattern.

✝️ His Christ means God's anointed king

👑 Kings once opposed that anointed one

📖 Jesus fulfills that old picture

➡️ Opposition to Jesus was already foretold

## 🌍 Herod, And Pontius Pilate, With The Gentiles, And The People Of Israel

The prayer names every party that stood against Jesus by name.

Herod and Pilate represent political power, Roman and local alike.

Gentiles and the people of Israel cover every nation involved.

Enemies who agreed on nothing else united against Jesus together.

👑 Herod and Pilate held political power

🌍 Gentiles and Israel both took part

🤝 Rivals united against this one man

📖 Opposition crossed every normal division

# Acts 4:28-31
# 💪 Asking For Boldness, Not Safety
---
## 📜 Thy Hand And Thy Counsel Determined Before To Be Done

"Counsel" here means God's own plan, decided in advance.

Human evil carried out the cross, but it did not control it.

God's sovereign plan used that evil without excusing it.

Nothing that happened to Jesus caught God by surprise.

📜 Counsel means God's advance plan

✋ Human evil acted, but did not control it

👑 God's plan stood above their actions

📖 Nothing about the cross surprised God

## 💪 Grant Unto Thy Servants, That With All Boldness They May Speak

Notice exactly what the believers do not ask for here.

They do not pray for safety or for the threat to end.

They ask only for boldness to keep speaking anyway.

Their prayer targets courage, not comfort.

🙏 They do not pray for safety

🚫 They never ask for the threat to end

💪 They ask only for boldness

➡️ Their prayer aims at courage, not comfort

## ✨ Signs And Wonders May Be Done

"Signs and wonders" means visible proof that God himself is acting.

The believers ask for healings and wonders to keep happening.

Every sign points back to Jesus and not to the person performing it.

Visible proof backs up the words they are being bold to say.

✨ Signs and wonders prove God is acting

🙏 They ask for more healings like this

✝️ Every sign points back to Jesus

📖 Visible proof backs up bold words

## 🏛️ The Place Was Shaken

This physical sign echoed what happened earlier at Pentecost.

God answered their prayer in a way they could feel.

Being filled with the Holy Ghost here happens again, just as with Peter earlier.

Boldness followed immediately, right after the shaking.

🏛️ The place shook as a sign

🔥 It echoed the Pentecost moment

🙌 They were filled with the Holy Ghost again

📖 Boldness followed right after

# Acts 4:32-37
# 🤝 All Things Common
---
## ❤️ One Heart And Of One Soul

This phrase describes deep unity, not identical opinions on everything.

The believers shared one common purpose and one common love.

Unity like this showed up in how they treated their own money.

What they believed together changed what they did with what they owned.

❤️ One heart means shared purpose

🧠 Not identical opinions on everything

💰 Unity showed up in their money

➡️ Belief changed their actions

## 🤲 All Things Common

This describes voluntary sharing, not a law forcing anyone to give.

No government or rule required anyone to give up property.

Generosity flowed from love, not from any outside command.

The sharing described here was a choice, made freely and often.

🤲 Sharing was voluntary, not forced

📜 No law required it

❤️ Love, not command, drove it

➡️ Generosity was a free choice

## ✨ Great Grace Was Upon Them All

Their generosity is tied directly to God's grace, not willpower.

Grace here means God's favor working visibly inside the community.

The apostles' witness of the resurrection and this grace sat side by side.

Power to witness and power to give came from the same source.

✨ Grace means God's visible favor

💪 It was not willpower alone

🗣️ It accompanied their witness of Jesus

📖 One source powered both witness and giving

## 🏠 Neither Was There Any Among Them That Lacked

This names a real, practical result inside the community.

Generosity reached people's actual physical needs, not just their feelings.

Selling land and houses turned belief into real provision.

No one's need went unmet while others had plenty.

🏠 Land and houses were sold

💰 Generosity met real physical needs

🙅 No one's need went unmet

➡️ Belief turned into real provision

## 🙇 Laid Them Down At The Apostles' Feet

Placing money at someone's feet was a gesture of formal trust.

It meant handing control over to someone else entirely.

The apostles then distributed it based on each person's actual need.

Giving did not come with strings or personal control attached.

🙇 Laying it down meant full trust

🤲 Control passed to the apostles

📊 Distribution matched real need

➡️ Giving came with no strings

## 🤗 Surnamed Barnabas, Which Is, Being Interpreted, The Son Of Consolation

Joses was his birth name, Barnabas was a nickname he earned.

"The son of consolation" means one who comforts and encourages others.

This nickname describes his whole character, not just this one moment.

Barnabas becomes a major figure later in the book of Acts.

📛 Joses was his birth name

🤗 Barnabas means son of consolation

🌟 It described his whole character

📖 He becomes major later in Acts

## 🙏 A Levite, And Of The Country Of Cyprus

Levites were the tribe set apart for temple service in Israel.

Under Jewish law, Levites normally did not inherit land in Israel.

Owning property on Cyprus instead fits that old arrangement exactly.

Barnabas gave up something he was free to keep, not something required.

🙏 Levites served in the temple

🚫 They normally held no land in Israel

🏝️ Cyprus explains his separate property

➡️ He gave freely, not from debt
`.trim();

export const ACTS_FOUR_PERSONAL_SECTIONS = parseActsFourRawNotes(ACTS_FOUR_RAW_NOTES);
