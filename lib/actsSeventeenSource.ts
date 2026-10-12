export type ActsSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsSeventeenRawNotes(rawText: string): ActsSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 17:${startVerse}` : `Acts 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Acts 17 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_SEVENTEEN_RAW_NOTES = `# Acts 17:1-5
# 🏙️ Arrival In Thessalonica
---
## 🚶 Passed Through Amphipolis And Apollonia

Amphipolis and Apollonia were cities along a major Roman road.

That road was called the Via Egnatia.

Paul and Silas did not stop to preach in either city.

Luke does not explain why, only that they kept moving.

🚶 They traveled along the Via Egnatia

🏙️ Amphipolis and Apollonia were along that road

⏭️ They did not stop to preach there

➡️ Not every city got a planted church

## 🏙️ They Came To Thessalonica

Thessalonica was a large, important city in Macedonia.

It sat on the Via Egnatia and had a busy harbor.

Paul would later write two letters to the believers here.

Those letters are First and Second Thessalonians in the New Testament.

🏙️ Thessalonica was a major Macedonian city

🚢 It had a busy harbor and main road

📜 Paul later wrote two letters to this church

📖 First and Second Thessalonians came from here

## 🕎 A Synagogue Of The Jews

A synagogue was a local gathering place for Jewish worship and teaching.

Paul always looked for one first in a new city.

It gave him an audience that already knew the scriptures.

Starting there meant starting with people ready to recognize a promised Messiah.

🕎 A synagogue was a Jewish worship gathering

🧭 Paul always sought one out first

📚 These listeners already knew the scriptures

➡️ He started where people could recognize a Messiah

## 🔁 As His Manner Was

This phrase tells us Paul had a consistent habit.

He entered the synagogue first in almost every city he visited.

Luke points this pattern out more than once in Acts.

A planned strategy stood behind what might look like random travel.

🔁 Paul had a consistent, repeated habit

🕎 He went to the synagogue first

📜 Luke notes this pattern more than once

📖 Real strategy stood behind his travels

## 📖 Three Sabbath Days Reasoned With Them Out Of The Scriptures

"Reasoned" means something closer to debated or argued a case.

Paul did not just tell stories, he built a structured argument.

He used the Old Testament itself as his evidence.

Three full weeks is how long this one conversation lasted.

📖 Reasoned means debated or argued a case

🧮 Paul built a structured, scripture based argument

⏳ The exchange lasted three full weeks

➡️ He let the Old Testament make his case

## 🔑 Opening And Alleging

"Opening" here means explaining a passage piece by piece.

"Alleging" means demonstrating or proving a claim from evidence.

Paul was not just quoting verses at random.

He was walking step by step toward one specific conclusion.

🔑 Opening means explaining a passage carefully

⚖️ Alleging means proving a claim with evidence

🪜 Paul moved step by step through scripture

📖 Every verse led toward one conclusion

## ✝️ Christ Must Needs Have Suffered, And Risen Again

Many Jews of that day expected a conquering king, not a suffering one.

Paul argued from scripture that the Messiah had to die first.

Resurrection then had to follow, exactly as the prophets described.

This order surprised listeners who pictured victory without a cross.

✝️ A conquering king was the expected Messiah

📜 Paul argued scripture required a suffering Messiah first

🔄 Resurrection had to follow that suffering

📖 Victory came only after the cross

## 🤝 Consorted With Paul And Silas

"Consorted" means they joined themselves closely to Paul and Silas.

This was not a quiet, private curiosity about the message.

These new believers now stood publicly identified with this risky group.

Standing with Paul in Thessalonica carried real social cost.

🤝 Consorted means joined closely with someone

👀 Their new loyalty became publicly visible

⚠️ Standing with Paul carried real risk

➡️ Belief here was public, not private

## 🌍 Of The Devout Greeks A Great Multitude

"Devout" Greeks were Gentiles who already worshipped the God of Israel.

They had not become full converts to Judaism.

This same kind of seeker responded well back in Philippi too.

A large number of them believed Paul's message here.

🌍 Devout Greeks already worshipped Israel's God

🚪 They stood short of full conversion

🔁 This same group responded well in Philippi

📖 A large number of them believed

## 👑 The Chief Women Not A Few

Macedonian women held more public influence than women in many other regions.

"Chief" here points to wealth, status, or civic standing.

Several of these prominent women believed Paul's message.

Lydia in Philippi was already an example of this same pattern.

👑 Macedonian women held unusual public influence

💰 Chief here points to wealth and status

👩 Several prominent women believed here

📖 Lydia already showed this same pattern

## 💔 Moved With Envy

Envy, not theology, is named as the real motive behind what follows.

Paul's growing following threatened the established synagogue leaders.

This exact motive drove opposition back in Antioch and Iconium too.

A wounded reputation can turn into real, organized violence.

💔 Envy was the real motive here

📉 Paul's growing following threatened synagogue leaders

🔁 The same motive appeared in earlier cities

➡️ Wounded pride can escalate into violence

## 🥊 Certain Lewd Fellows Of The Baser Sort

"Lewd" in the King James sense means worthless or low character, not sexual.

"Baser sort" means people from the rougher, criminal edge of the city.

The synagogue leaders hired men willing to start a riot.

They needed muscle, not an actual argument against Paul.

🥊 Lewd here means worthless, not sexual

👥 Baser sort means a rough criminal crowd

💪 Hired muscle replaced any real argument

➡️ Violence stood in for debate

## 🔥 Set All The City On An Uproar

The conflict did not stay contained to the synagogue.

A planned riot spread fear through the whole city at once.

Mob pressure was the real weapon being used against Paul.

Crowds can be turned into a weapon with the right provocation.

🔥 The riot spread through the whole city

⚠️ Mob pressure became a real weapon

🧨 A crowd was turned against Paul

📖 Fear, not truth, drove this uproar

## 🏠 Assaulted The House Of Jason

Jason appears to be the local believer hosting Paul and Silas.

Attacking his house targeted the whole household, not just two visitors.

A letter later in the New Testament names a Jason among Paul's relatives.

Hosting Paul in this city came with a very real cost.

🏠 Jason was likely hosting Paul and Silas

👪 The attack targeted his whole household

📜 Romans later names a relative called Jason

➡️ Hosting Paul carried a real cost

# Acts 17:6-9
# ⚖️ Dragged Before The Rulers
---
## 🔍 When They Found Them Not

The mob stormed Jason's house looking specifically for Paul and Silas.

Both men were already gone, likely moved to safety earlier.

A planned riot suddenly had no actual target to seize.

Missing its main targets did not stop the mob from acting anyway.

🔍 The mob searched specifically for Paul

🏠 Both men were already safely gone

😤 The riot lost its intended target

➡️ A missing target did not stop them

## ⚖️ Drew Jason And Certain Brethren Unto The Rulers

With Paul and Silas gone, the mob grabbed the next available substitutes.

Jason paid the price simply for hosting Paul in his own home.

Other believers from the same house were dragged along with him.

Hosting the gospel could cost you even when you said nothing yourself.

⚖️ Jason became a substitute for Paul

🏠 Hosting cost him personally, not Paul

👥 Other believers were dragged along too

➡️ Silence did not protect anyone here

## 🌍 These That Have Turned The World Upside Down

This accusation was meant as an insult, not a compliment.

The crowd meant Paul and his message brought constant disorder.

Ironically, the charge was truer than the accusers realized.

The gospel really was reordering lives and loyalties everywhere it went.

🌍 The charge was meant as an insult

🌀 They meant Paul caused constant disorder

😲 The accusation was truer than they knew

📖 The gospel really was reordering the world

## 🏠 Whom Jason Hath Received

"Received" here simply means Jason welcomed Paul and Silas into his home.

Under this new accusation, basic hospitality itself became treated as a crime.

The charge criminalized kindness, not any actual wrongdoing by Jason.

Being generous to the wrong guest suddenly carried real legal danger.

🏠 Received means he simply welcomed them

⚠️ Hospitality got treated like a crime

🙅 Jason committed no actual wrongdoing

➡️ Kindness carried real legal danger here

## 👑 Another King, One Jesus

Calling Jesus a king sounded like a direct challenge to Caesar.

Rome treated any rival claim to kingship as treason.

This exact charge of a rival king was used against Jesus at his own trial.

The same accusation that killed Jesus now threatened his followers.

👑 Calling Jesus king sounded like treason

⚖️ Rome punished any rival claim to kingship

🔁 The same charge was used against Jesus himself

📖 One accusation now threatened his followers too

## 😤 They Troubled The People And The Rulers

Panic did not stay contained among the original rioters.

Fear spread upward into the city's actual governing officials.

A local disturbance had grown into an official civic concern.

One accusation can unsettle an entire city's leadership quickly.

😤 Panic spread beyond the original rioters

🏛️ Fear reached the city's own officials

📈 A local issue became a civic concern

➡️ One charge unsettled an entire leadership

## 💰 Taken Security Of Jason, And Of The Other

"Security" here means a bond, like modern bail money.

Jason and at least one other believer both had to guarantee good behavior.

Losing that money was the real threat now hanging over them.

The rulers let them go, but only after they had something to lose.

💰 Security meant a bond like bail

🤝 Jason and another believer both guaranteed it

⚠️ They now had money on the line

➡️ Freedom came with a real cost

## 🚪 They Let Them Go

Release here was practical, not a real admission of innocence.

The rulers wanted the disorder to end more than they wanted justice.

Nothing was resolved, the underlying tension simply went quiet for now.

Quiet is not the same thing as peace.

🚪 Release was practical, not an apology

🤫 Ending disorder mattered more than justice

🧩 Nothing underneath was actually resolved

📖 Quiet is not the same as peace

# Acts 17:10-15
# 🌙 Berea And The Road To Athens
---
## 🌙 Sent Away Paul And Silas By Night Unto Berea

Traveling at night was unusual and signals real urgency.

The believers were moving Paul and Silas out of immediate danger.

Berea sat further inland, away from the main coastal road.

A quieter city offered some safety after the Thessalonica riot.

🌙 Night travel signals real urgency here

⚠️ They were escaping immediate danger

🗺️ Berea sat inland, off the main road

➡️ A quieter city offered some safety

## 🕎 Went Into The Synagogue Of The Jews

Paul's pattern continues even while fleeing a riot.

He still starts in the synagogue in this new city.

Danger in one place did not change his basic strategy.

The same approach that caused trouble before was tried again here.

🕎 Paul's pattern continued despite real danger

🧭 He still started at the synagogue

🔁 His strategy did not change under pressure

📖 The same approach was tried again

## 🌟 More Noble Than Those In Thessalonica

"Noble" here describes character and openness, not family bloodline.

The Bereans were praised for listening with an open mind.

Being noble meant checking claims instead of reacting with envy.

Luke compliments an entire city by comparing it to the one before.

🌟 Noble here means character, not bloodline

👂 They listened with an open mind

🔎 They checked claims instead of envying Paul

📖 One city is praised against another

## 📖 Searched The Scriptures Daily, Whether Those Things Were So

The Bereans did not simply accept what Paul told them.

They went back to the Old Testament text themselves, every single day.

This is presented as wisdom, not as doubt or disrespect.

Checking a teacher's claims against scripture is treated as the healthy response.

📖 They checked scripture themselves, daily

🔎 Checking Paul's claims was treated as wisdom

🙅 This was not doubt or disrespect

➡️ Testing a teacher against scripture is healthy

## 👩 Honourable Women Which Were Greeks

The pattern from Thessalonica repeats here in Berea.

Prominent Gentile women again responded early to the message.

Macedonia's culture gave women more freedom to act on their own convictions.

Many of them believed, alongside a good number of men too.

👩 Prominent Gentile women believed again here

🔁 The Thessalonica pattern repeated in Berea

🌍 Macedonian women had unusual public freedom

📖 Many men believed alongside these women

## 😤 The Jews Of Thessalonica Stirred Up The People

Opposition did not stay behind in Thessalonica.

The same agitators traveled to Berea to continue the fight.

This shows real, organized hostility, not just a local argument.

Paul's enemies were willing to travel to keep chasing him.

😤 Opposition followed Paul from Thessalonica

🧭 Agitators traveled to continue the fight

🧩 This hostility was organized, not local

➡️ Enemies kept chasing Paul city to city

## 🌊 Sent Away Paul To Go As It Were To The Sea

The brethren moved Paul out again, this time toward the coast.

Silas and Timotheus stayed behind in Berea a little longer.

Splitting the team kept the mission going even under pressure.

Paul's safety became the most urgent concern in the moment.

🌊 Paul was moved again, toward the coast

👥 Silas and Timotheus stayed behind briefly

🧩 Splitting the team kept the mission alive

➡️ Paul's safety was the urgent priority

## ⛵ Conducted Paul

"Conducted" simply means these believers escorted Paul on his journey.

They walked or sailed with him rather than sending him off alone.

Even in danger, Paul was never traveling completely by himself.

Companionship kept showing up at each dangerous turn in this chapter.

⛵ Conducted means they escorted him

🚶 They traveled with him, not just directions

🤝 Paul was never truly alone in danger

📖 Companionship kept appearing at each turn

## 🏛️ Brought Him Unto Athens

Athens was the most famous city in the ancient world for philosophy.

Socrates, Plato, and Aristotle had all taught and argued in this city centuries earlier.

Paul now stood in the intellectual center of the Greek world.

A city shaped by centuries of Greek thought awaited him.

🏛️ Athens was the ancient world's philosophy capital

🧠 Socrates, Plato, and Aristotle once taught here

🌍 Paul entered the heart of Greek thought

📖 Centuries of Greek ideas awaited him

## 📨 A Commandment Unto Silas And Timotheus To Come With All Speed

Paul sent urgent word for his companions to join him quickly.

"With all speed" means as fast as possible, no delay.

Paul did not want to be alone in Athens for long.

Partnership mattered to him even in the middle of mission work.

📨 Paul urgently called his companions to join

⏱️ With all speed means without delay

🤝 He did not want to stay alone

📖 Partnership mattered even in the middle of mission

# Acts 17:16-21
# 🧠 Paul Among The Philosophers
---
## 😠 His Spirit Was Stirred In Him

"Stirred" here means provoked or deeply troubled, not simply curious.

Paul reacted with real distress, not detached observation.

Seeing widespread idol worship grieved him on a personal level.

His response was emotional before it ever became a sermon.

😠 Stirred means deeply troubled, not curious

💔 Idol worship genuinely grieved Paul

❤️ His reaction was personal, not detached

➡️ Emotion came before any sermon

## 🗿 The City Wholly Given To Idolatry

Ancient writers described Athens as covered with statues of gods.

Nearly every street held a shrine, altar, or image to worship.

"Wholly given" means the whole city was saturated with this practice.

This was not one temple problem, it was the entire culture.

🗿 Athens was covered with statues of gods

🛕 Shrines and altars filled nearly every street

🌍 The whole culture was built around idolatry

📖 This was not one shrine but a city

## 🕎 Disputed In The Synagogue With The Jews, And With The Devout Persons

Paul kept his familiar pattern of starting in the synagogue.

"Devout persons" means Gentiles who worshipped Israel's God without full conversion.

Athens gave Paul two very different audiences within the same city.

He reasoned with the religious and the philosophical hearers alike.

🕎 Paul kept starting at the synagogue

🙏 Devout persons were Gentile God worshippers

🧩 Athens gave him two different audiences

➡️ He reasoned with both groups alike

## 🏪 Disputed In The Market Daily

The "market," or agora, was the public square for business and debate.

Paul did not wait for people to come to a building.

He went where ordinary Athenians already gathered every day.

Daily presence mattered more than one single big event.

🏪 The agora was the public town square

🚶 Paul brought the message to the crowd

📆 He showed up there every single day

➡️ Consistency mattered more than one big event

## 🧠 Philosophers Of The Epicureans, And Of The Stoicks

Epicureans believed the gods were distant and pleasure was the main good in life.

Stoics believed in self control and living in harmony with a divine reason behind everything.

These two schools disagreed with each other on almost everything.

Both still stopped to argue with Paul in the public square.

🧠 Epicureans valued pleasure, saw gods as distant

🧘 Stoics valued self control and divine reason

⚔️ The two schools usually disagreed with each other

📖 Both still engaged Paul in debate

## 🗣️ What Will This Babbler Say?

"Babbler" was originally used for a bird pecking up seeds.

It became an insult for someone picking up scraps of ideas without real understanding.

The philosophers assumed Paul was just repeating half digested fragments.

Their mockery badly underestimated what Paul was actually saying.

🗣️ Babbler first described a seed pecking bird

😏 It became an insult for shallow talk

🙄 They assumed Paul lacked real understanding

📖 Their mockery underestimated him badly

## 🙏 A Setter Forth Of Strange Gods

The philosophers misunderstood Jesus and the resurrection as two separate new deities.

Greek religion was used to adding new gods into an already crowded pantheon.

They had no category yet for one God who raised one man from death.

Their confusion came from trying to fit something new into an old framework.

🙏 They heard Jesus and resurrection as two gods

🗿 Greek religion was used to adding new gods

❓ They had no category for this claim yet

➡️ New truth got forced into an old framework

## 🏛️ Brought Him Unto Areopagus

The Areopagus was both a hill and the council that met there.

It functioned as a kind of supreme court for religious and philosophical questions in Athens.

Standing there meant Paul faced the city's most respected thinkers.

This was the most serious stage he could be given in that city.

🏛️ Areopagus named a hill and its council

⚖️ It judged religious and philosophical questions

🧠 Paul faced the city's top thinkers

📖 This was his most serious stage yet

## ❓ This New Doctrine, Whereof Thou Speakest

The council's question sounds genuinely curious, not immediately hostile.

Athens prized new ideas as entertainment as much as truth.

Paul was being handed an open invitation to explain himself fully.

What happens next in this chapter rests on that one open door.

❓ Their question sounded curious, not hostile

🎭 Athens treated new ideas as entertainment

🚪 Paul was handed an open invitation

➡️ Everything that follows rests on this door

## 👂 Spent Their Time In Nothing Else, But To Hear Some New Thing

Luke includes this detail to explain why Paul even got an audience at all.

Athenians were famous for a constant appetite for the newest idea in town.

That curiosity opened a door that genuine hostility might have closed.

An entire city's habit of restlessness becomes the opening for the gospel.

👂 Athenians craved whatever idea was newest

🚪 That curiosity opened a door for Paul

😮 Hostility might have closed that same door

📖 A city's restlessness became the gospel's opening

# Acts 17:22-25
# 🙏 The Unknown God
---
## 🏛️ Stood In The Midst Of Mars' Hill

"Mars' hill" is the Latin name for the Areopagus, Mars being the Roman god of war.

Paul now stands at the very spot the council had summoned him to.

This sermon is Paul's fullest recorded sermon to pure Gentiles.

Nothing here is improvised, every line answers what the Athenians just asked him.

🏛️ Mars' hill is the Latin Areopagus

📍 Paul stood exactly where he was summoned

🧠 This is his fullest sermon to pure Gentiles

➡️ Every line answers their actual question

## 🙇 Ye Are Too Superstitious

Paul opens with something close to a backhanded compliment.

"Superstitious" could also mean devout or extremely reverent toward the gods.

He starts from common ground instead of condemning his listeners immediately.

Respect, not insult, opens this entire sermon.

🙇 Superstitious could also mean deeply reverent

🤝 Paul opened on common ground, not insult

🚪 Respect, not condemnation, opens this sermon

📖 He meets them where they are

## 📜 An Altar With This Inscription, To The Unknown God

Greek cities sometimes built altars to gods they feared they had missed.

Ancient writers outside the Bible also mention altars like this one in Athens.

Paul uses this exact local object as his starting point.

He does not import a foreign idea, he builds on something already standing there.

📜 Altars to unnamed gods really existed

🏛️ Ancient writers confirm altars like this

🧩 Paul started from something already local

➡️ He built on what they already had

## ❓ Whom Ye Ignorantly Worship, Him Declare I Unto You

"Ignorantly" means without full knowledge, not foolishly or stupidly.

Paul tells them they have already been reaching toward the true God.

He offers to finish what their own altar started.

This is correction offered as completion, not as an attack.

❓ Ignorantly here means without full knowledge

🙏 They were already reaching toward something true

🧩 Paul offered to complete what they started

📖 Correction arrived as completion, not attack

## 🌍 God That Made The World And All Things Therein

Paul starts with creation, a claim every listener could at least consider.

This directly challenges the Greek idea of many limited, specialized gods.

One single maker stands behind everything that exists.

Greek philosophy itself had already wondered about one ultimate source behind all things.

🌍 Paul opens with one single creator

🗿 This challenges many limited Greek gods

♾️ One maker stands behind everything

📖 Greek philosophy had wondered about this too

## 🏛️ Dwelleth Not In Temples Made With Hands

Athens was filled with temples believed to literally house a god's presence.

Paul directly challenges that whole way of thinking in one line.

The true God cannot be boxed inside any human made building.

This idea would have struck many listeners as shocking.

🏛️ Athens believed gods lived inside temples

🚫 Paul rejected that whole idea directly

📦 No building can contain the true God

➡️ This claim would have shocked many listeners

## 🙌 Neither Is Worshipped With Men's Hands, As Though He Needed Any Thing

Pagan worship often assumed the gods needed food, gifts, or service from people.

Paul turns that entire assumption upside down.

God needs nothing from the people who worship him.

Worship exists for the worshipper's benefit, not to supply something God lacks.

🙌 Pagan gods were assumed to need gifts

🔄 Paul turned that assumption upside down

🙅 God needs nothing from his worshippers

📖 Worship serves us, not God's needs

## 🌬️ He Giveth To All Life, And Breath, And All Things

God is described here as giver, not receiver, of everything that exists.

Life and breath themselves come from him, not from any other source.

This directly reverses the whole logic of pagan sacrifice.

Humanity owns nothing it did not first receive from God.

🌬️ God gives life and breath to all

🔄 This reverses the logic of sacrifice

🎁 Everything we have, we first received

📖 Nothing we own started with us

# Acts 17:26-28
# 🌍 In Him We Live And Move
---
## 🩸 Made Of One Blood All Nations Of Men

Every nation and ethnic group shares the same single human origin.

Greek culture often divided people sharply between Greek and barbarian.

Paul quietly removes any basis for that kind of ranking.

No people group can claim to be made of better material than another.

🩸 All nations share one human origin

⚖️ Greeks often ranked themselves above others

🚫 Paul removed any basis for that ranking

📖 No people is made of better material

## 📅 Determined The Times Before Appointed, And The Bounds Of Their Habitation

God is described as setting history's timing and nations' borders on purpose.

Empires rising and falling were not random or outside God's control.

Even where a nation ends up living carries divine intention.

History is not drifting, it is being directed.

📅 God set history's timing on purpose

🗺️ Nations' borders were not accidental either

🏛️ Rising and falling empires stayed under control

➡️ History moves by direction, not drift

## 🔍 Seek The Lord, If Haply They Might Feel After Him

"Haply" is an old word meaning perhaps or possibly.

"Feel after" pictures someone groping in the dark for something just out of reach.

Paul describes genuine human searching, even among those who worship idols.

God built that very searching into people on purpose.

🔍 Haply is an old word for perhaps

🌑 Feel after pictures groping in darkness

🙏 Even idol worshippers were genuinely searching

📖 God built that search into people

## 🤏 Not Far From Every One Of Us

Paul insists God is close, not distant or hidden away.

This directly contradicts the Epicurean idea of gods who ignore human affairs.

Nearness here applies to every single person listening, not just a chosen few.

The true God was never as far away as Athens assumed.

🤏 Paul insists God is genuinely close

🚫 This contradicts the Epicurean distant god

🌍 Nearness applies to every listener equally

➡️ God was closer than Athens assumed

## 🌬️ In Him We Live, And Move, And Have Our Being

This line describes complete dependence on God for existence itself.

Every breath, every movement, and life itself rest on him continually.

Paul is not describing a distant watchmaker who wound up the world and left.

God stays actively involved in every single moment of existence.

🌬️ Life itself depends on God continually

🏃 Even movement rests on his sustaining

🚫 This is no distant, uninvolved watchmaker

📖 God stays active in every moment

## 📝 Certain Also Of Your Own Poets Have Said

Paul quotes a line from a Greek poet the Athenians already respected.

The phrase "we are his offspring" comes from Stoic poetry, not from the Old Testament.

Paul uses the audience's own trusted sources to make his point land.

He meets educated Greeks inside their own familiar literature.

📝 Paul quoted a respected Greek poet

🧘 The line came from Stoic poetry

🎯 He used their own sources to connect

📖 He met them inside familiar literature

# Acts 17:29-31
# ⚖️ A Call To Repent
---
## 👪 We Ought Not To Think That The Godhead Is Like Unto Gold, Or Silver, Or Stone

If people are God's offspring, God cannot be a lifeless object.

A living source cannot be smaller than what it produced.

Paul directly attacks the heart of Greek idol worship with this logic.

Every statue in Athens suddenly looks like a step backward, not forward.

👪 Living offspring cannot come from a lifeless object

🗿 This logic directly attacks Greek idols

📉 A source cannot be smaller than its result

➡️ Every statue in Athens now looks backward

## ✍️ Graven By Art And Man's Device

"Graven" means carved or shaped by a craftsman's own hands.

Human skill and imagination created every single idol in that city.

Paul points out the obvious backward logic in worshipping your own creation.

The true God made people, not the other way around.

✍️ Graven means carved by human hands

🧠 Human skill created every Athenian idol

🔄 Worshipping your own creation runs backward

📖 God made people, not the reverse

## ⏳ The Times Of This Ignorance God Winked At

"Winked at" is an old phrase meaning overlooked or let pass for a time.

God did not strike down every nation practicing idolatry immediately.

Patience here was real, but it was never permission to continue forever.

A season of overlooked ignorance is now closing.

⏳ Winked at means overlooked for a time

🕊️ God showed real patience with idolatry

🚫 Patience was never permanent permission

➡️ That season is closing right now

## 📢 Now Commandeth All Men Every Where To Repent

This command applies to every nation, not only Israel.

Paul is not offering a suggestion, he uses the word commandeth.

Universal human sin meets a universal call to turn back to God.

No culture, including Athens, gets an exception from this call.

📢 This command reaches every nation, not one

⚡ Commandeth means an order, not a suggestion

🌍 A universal call meets universal human sin

📖 No culture gets an exception here

## ⚖️ He Hath Appointed A Day, In The Which He Will Judge The World

A specific future day of judgment has already been set.

"Appointed" means it is fixed, not left vague or optional.

This directly opposes the Epicurean belief that the gods never judge human behavior.

History is heading somewhere definite, not drifting without an ending.

⚖️ A specific day of judgment is set

📌 Appointed means fixed, not vague

🚫 This rejects gods who never judge

➡️ History is heading toward a real end

## 👤 By That Man Whom He Hath Ordained

Paul names Jesus here without using his name at all yet.

"Ordained" means specifically chosen and appointed for this exact role.

A human being, not an angel or abstract force, will judge the world.

This quietly sets up the very claim that gets Paul interrupted next.

👤 Paul means Jesus without naming him yet

📌 Ordained means specifically chosen for this role

🙋 A real human will judge the world

📖 This claim sets up what happens next

## ✅ Given Assurance Unto All Men, In That He Hath Raised Him From The Dead

The resurrection is presented as the proof behind this whole claim.

"Assurance" means certainty, something that can actually be trusted.

Paul does not ask for blind faith with no evidence offered.

A raised man is offered as real, historical confirmation of everything just said.

✅ The resurrection is offered as proof

🔒 Assurance means real, trustworthy certainty

🙅 Paul did not ask for blind faith

📖 A raised man became the confirmation

# Acts 17:32-34
# 🤝 Mockery And Belief
---
## 😏 Some Mocked

Resurrection of a body was considered absurd by most Greek philosophy.

Greek thought generally preferred the idea of an immortal soul escaping the body.

A raised physical body sounded like a step backward, not an upgrade, to them.

This single idea split the whole room instantly.

😏 Greek thought found bodily resurrection absurd

👻 They preferred a soul escaping the body

📉 A raised body sounded like a step back

➡️ One idea split the entire room

## 🤔 We Will Hear Thee Again Of This Matter

This answer sounds polite, but it avoids deciding anything.

Athens treated new ideas as entertainment to sample, not truth to act on.

Nothing in the text says these particular people ever returned.

Polite curiosity is not the same thing as genuine belief.

🤔 This answer stalled instead of deciding

🎭 Athens sampled ideas rather than acting on them

🚪 No return visit is ever recorded

📖 Polite curiosity is not the same as belief

## 🚶 Paul Departed From Among Them

Unlike other cities, Acts records no church being planted in Athens here.

Paul later writes to many cities, but never to a church in Athens.

Intellectual interest did not translate into a lasting, organized community of believers.

Even the apostle Paul had places where the response stayed mixed and thin.

🚶 No Athens church appears in Acts

📜 Paul never writes a letter to Athens

🧠 Interest did not build a lasting community

➡️ Even Paul faced thin, mixed results sometimes

## 🤝 Certain Men Clave Unto Him, And Believed

"Clave" is an old word meaning to cling or hold fast to something.

A small number of genuine believers emerged from this famous sermon.

Quality of response here mattered more than the size of the crowd.

Real faith took root even in the hardest, most skeptical city in Paul's travels.

🤝 Clave means clung or held fast

🙏 A small group of real believers emerged

⚖️ Quality mattered more than crowd size

📖 Faith took root even in Athens

## 👤 Dionysius The Areopagite

"Areopagite" means he was a member of the Areopagus council itself.

This was one of the most respected and powerful bodies in Athens.

A sitting council member stepped away from his own peers to follow Jesus.

Later church tradition remembers him as an early leader among believers.

👤 Areopagite means a council member himself

🏛️ The Areopagus was Athens' most respected body

🔄 A powerful insider chose to follow Jesus

📖 Tradition remembers him as an early leader

## 👩 A Woman Named Damaris

Luke names Damaris specifically, giving her a place in the historical record.

Very little else about her life or status is known for certain.

Naming her at all reflects how Luke consistently highlights women's faith throughout Acts.

Her presence, however small the detail, still mattered enough to record.

👩 Luke names her, giving her real record

❓ Little else about her is certain

📖 Luke consistently highlights women throughout Acts

➡️ Her small detail still mattered enough to keep
`.trim();

export const ACTS_SEVENTEEN_PERSONAL_SECTIONS = parseActsSeventeenRawNotes(ACTS_SEVENTEEN_RAW_NOTES);
