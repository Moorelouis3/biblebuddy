export type ActsTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsTwentyRawNotes(rawText: string): ActsTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 20:${startVerse}` : `Acts 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Acts 20 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_TWENTY_RAW_NOTES = `# Acts 20:1-6
# 🛳️ Paul Sets Sail For Macedonia
---
## 🎭 After The Uproar Was Ceased

The uproar refers to the riot described in chapter nineteen.

A mob had packed the Ephesian theater, shouting for nearly two hours.

Paul waits for that chaos to fully end before making his next move.

Leaving in the middle of a riot would have endangered everyone around him.

His timing protects the believers he leaves behind in Ephesus.

🎭 Uproar means the chapter nineteen riot

⏳ Paul waits for it to end

🛡️ Leaving mid riot risked real danger

📖 Good timing protected the Ephesian church

## 🤗 Called Unto Him The Disciples, And Embraced Them

An embrace in this culture was a normal way to say a loving goodbye.

It was not an awkward or overly emotional act for grown men.

Paul had led this church for about three years.

He takes time for a proper goodbye before leaving a region he loves.

🤗 Embrace was a normal farewell gesture

⏳ Paul had served Ephesus about three years

❤️ Men openly embraced in this culture

➡️ A proper goodbye mattered to Paul

## 🏛️ He Came Into Greece

"Greece" here most likely means the region of Achaia.

Corinth was the leading city in that province.

Many scholars believe Paul wrote his letter to the Romans during this season.

This marks a return to a church he had already spent over a year building.

🏛️ Greece likely means the province of Achaia

🌆 Corinth was its leading city

✍️ Many scholars place Romans here

📖 Paul returns to a church he built

## 📆 There Abode Three Months

Paul stays in Achaia for three full months, likely in Corinth.

Winter made sea travel too dangerous for much of that season.

Enemies opposed to Paul use this window to plan an ambush along his next route.

A long, restful stay still ends with real danger waiting outside the door.

📆 Three months spent in Achaia

🌊 Winter made sailing unsafe then

⚔️ Enemies used the time to plan

➡️ Rest did not mean safety

## ⚔️ The Jews Laid Wait For Him

"Laid wait" means a group had planned an ambush along his expected route.

This was a real plot, not just gossip or rumor.

Paul had already survived plots like this earlier in this very book.

He learns of the danger in time to avoid it.

⚔️ Laid wait means a planned ambush

🚫 A real plot, not a rumor

🔁 Paul had faced plots before

➡️ He learns of it in time

## 🗺️ He Purposed To Return Through Macedonia

Sailing straight to Syria would have taken him right past the ambush point.

Paul chooses a longer route north through Macedonia instead.

The detour costs him time, even while racing to reach Jerusalem before Pentecost.

Safety mattered more to him than speed.

🗺️ Direct route risked the ambush

🔁 Macedonia offered a safer path

⏳ The detour cost real time

➡️ Safety outweighed speed here

## 👥 There Accompanied Him Into Asia

"Asia" here means the Roman province of Asia, in modern day western Turkey.

It is not the whole continent.

This verse names seven traveling companions.

They came from cities across Macedonia and Asia where Paul had already started churches.

This group likely carried the collection gathered for Jerusalem's poor believers.

Naming each person honors real people, not just background characters.

👥 Seven companions are named here

🗺️ Asia means a Roman province

💰 They likely carried the Jerusalem collection

📖 Real names behind quiet faithful service

## ✍️ Tarried For Us At Troas

This group sails ahead of Paul to Troas and waits there for him.

The word "us" shows the writer of Acts is personally present again.

Luke had stepped out of the story for several chapters.

He rejoins the group here and stays with Paul for the rest of the book.

✍️ Us means Luke has rejoined Paul

⛵ This group sails ahead to Troas

🔁 Luke had been absent for chapters

📖 Eyewitness detail follows from here

## 🍞 After The Days Of Unleavened Bread

The days of unleavened bread were the week long Passover festival.

Paul waits through that Jewish feast before sailing north from Philippi.

This journey is built around reaching Gentile cities.

He still honors the Jewish calendar along the way.

🍞 Unleavened bread means the Passover week

📆 Paul waits out the festival first

🙏 He still honors Jewish tradition

➡️ Faith and travel plans work together

## ⛵ Came Unto Them To Troas In Five Days

The trip from Philippi to Troas normally took about two days with a good wind.

Five days suggests the wind was working against the ship the whole way.

Once there, Paul stays a full seven days.

That was long enough to be present for the Sunday gathering described next.

⛵ Normal trip took about two days

🌬️ Five days suggests a hard wind

📆 Seven days set up Sunday's gathering

📖 Even apostles faced slow, hard travel

# Acts 20:7-12
# 💤 Eutychus Falls And Is Raised
---
## ☀️ Upon The First Day Of The Week

The first day of the week is Sunday, the day Jesus rose from the dead.

Early believers already gather on this day instead of the Jewish Sabbath.

This becomes the normal weekly rhythm for the church going forward.

Paul plans his final night in Troas around this gathering on purpose.

☀️ First day of the week means Sunday

✝️ It marks the day Jesus rose

⛪ Early church met on Sundays

📖 Paul plans around this gathering

## 🍞 Came Together To Break Bread

Breaking bread here means a shared meal.

That meal included the Lord's Supper.

This was the regular pattern of worship in the earliest churches.

Paul joins an ordinary gathering that turns out to be anything but ordinary.

🍞 Breaking bread means a shared meal

✝️ It included the Lord's Supper

⛪ This was regular church practice

➡️ An ordinary night turns extraordinary

## 🕛 Continued His Speech Until Midnight

Paul knows he is leaving in the morning.

He may never see this church again.

He keeps teaching long after a normal meeting would have ended.

Every extra hour matters when time together is this limited.

🕛 Midnight shows an unusually long sermon

✈️ Paul leaves the very next morning

⏳ Time together felt limited

📖 He used every hour he had

## 🔥 Many Lights In The Upper Chamber

The lights here were oil lamps, not electric bulbs.

A room full of burning lamps late at night grows warm and heavy with smoke.

That detail helps explain why one listener in the room struggles to stay awake.

🔥 Lights means burning oil lamps

🌡️ The room grew warm and smoky

😴 This helps explain the sleepiness ahead

➡️ A small detail sets up the next scene

## 🏷️ A Certain Young Man Named Eutychus

"Eutychus" is a Greek name that means fortunate.

He is about to live up to that name in the most unexpected way.

Luke names him individually, which is unusual for a minor character in this book.

🏷️ Eutychus means fortunate in Greek

🍀 His name becomes ironic later

👤 Luke names him specifically

📖 A small detail that pays off

## 🏢 Fell Down From The Third Loft, And Was Taken Up Dead

The "third loft" means the third story up, counting from the ground floor.

A fall from that height onto a hard surface below was genuinely fatal.

The text says plainly he was taken up dead, not just hurt.

Luke, a trained physician, is not softening this description.

🏢 Third loft means the third story up

💀 Taken up dead means he had died

👨‍⚕️ Luke the physician does not soften this

➡️ This sets up a real miracle

## 🙏 Trouble Not Yourselves, For His Life Is In Him

Paul does not panic or perform a long ritual.

He goes down, embraces the young man, and declares his life has returned.

This echoes miracles worked earlier by Elijah and Elisha with young men who had died.

God restores a life through Paul's hands in front of a frightened crowd.

🙏 Paul responds with calm confidence

🤗 He embraces the young man first

🔁 Echoes Elijah and Elisha's miracles

📖 God restores life through Paul

## 🍞 Had Broken Bread, And Eaten, And Talked A Long While, Even Till Break Of Day

After the miracle, the gathering does not simply end in shock.

Paul leads them back to the meal they had started.

He keeps teaching until sunrise, right up until it is time to leave for the ship.

Life returns to the room just as life returned to Eutychus.

🍞 The meal resumes after the miracle

🗣️ Paul keeps teaching until sunrise

⛵ Dawn means it is time to sail

📖 Normal life resumes after the miracle

## 😊 Were Not A Little Comforted

"Not a little" is an old way of saying very much.

This is understatement, saying less than you mean on purpose for effect.

The church is not mildly relieved here.

They are overjoyed.

😊 Not a little means very much

🔄 This is deliberate understatement

😭 The church feels overjoyed relief

📖 Grief turns to comfort fast

# Acts 20:13-16
# 🧭 The Voyage Toward Miletus
---
## 🚶 Minding Himself To Go Afoot

The ship has to sail around a long stretch of coastline to reach Assos.

Walking overland was a shorter, more direct route by land.

Paul may have wanted time alone to pray before the hard road ahead.

Either way, he chooses solitude over sailing with the group here.

🚶 Paul walks the shorter land route

⛵ The ship takes the longer sea route

🙏 Possible time alone to pray

➡️ A deliberate choice for solitude

## 🤝 When He Met With Us At Assos

Paul and the ship's group reunite at Assos.

Each had traveled there by a different route.

The team comes back together before continuing on as one group.

Small moments like this show the real coordination behind every stop on this journey.

🤝 Paul rejoins the group at Assos

🚶 He had walked, they had sailed

⛵ They travel on together from here

➡️ Real coordination shaped this trip

## 🏝️ Sailed Thence, And Came The Next Day Over Against Chios

Chios, Samos, and Trogyllium are small islands and harbors near what is now western Turkey.

Each stop added just one more day to a careful, island hopping route south.

Miletus was a major port city, a short distance from Ephesus by land.

This string of short hops shows how coastal travel actually worked in the ancient world.

🏝️ Chios and Samos are nearby islands

⚓ Each stop added just one day

🗺️ Miletus sat close to Ephesus

📖 Ancient sea travel moved hop by hop

## 🚫 Paul Had Determined To Sail By Ephesus

This does not mean Paul had lost interest in the church at Ephesus.

Ephesus was the city where he had spent about three years of his ministry.

A stop there risked a long, emotional visit he does not have time for.

He sails past it on purpose, then sends for its leaders to meet him elsewhere.

🚫 This does not mean Paul stopped caring

⏳ Ephesus deserved more time than he had

🗺️ He sails past it on purpose

➡️ He still calls its leaders to him

## 📅 He Would Not Spend The Time In Asia

"Asia" again means the Roman province, not the continent.

A stop in Ephesus could easily turn into weeks for someone so close to that church.

Paul is watching the calendar closely, not his own comfort.

📅 Asia means the Roman province again

⏳ A stop risked turning into weeks

🗺️ Paul is watching the calendar closely

📖 Mission came before comfort here

## 🕊️ To Be At Jerusalem The Day Of Pentecost

Pentecost was a major Jewish festival held fifty days after Passover.

Jerusalem would be crowded with Jewish pilgrims from across the empire at that time.

This is the same feast during which the Holy Spirit first came in chapter two.

Paul is racing to arrive during one of the most significant weeks on the calendar.

🕊️ Pentecost falls fifty days after Passover

📜 The Holy Spirit first came at this feast

👥 Jerusalem fills with pilgrims then

📖 Paul races to be there in time

# Acts 20:17-21
# 👴 Paul's Farewell To The Elders
---
## 👴 He Sent To Ephesus, And Called The Elders Of The Church

"Elders" means the recognized leaders and overseers of the church at Ephesus.

Paul does not travel the extra distance to see them himself.

He sends word and asks them to come the short distance to Miletus instead.

This saves precious time while still making sure the meeting happens.

👴 Elders means the church's leaders

✉️ Paul sends for them instead

⏳ This saves valuable time

📖 The meeting still happens either way

## 👀 Ye Know, From The First Day That I Came Into Asia

Paul does not open by teaching something new.

He appeals to what these elders have already personally witnessed.

That history covers about three years of shared life together.

His character is not something he argues for, it is something they already watched.

👀 Paul appeals to what they witnessed

📆 About three years of shared history

🙌 His life backs up his words

➡️ Lived example speaks louder than claims

## 🙇 Serving The LORD With All Humility Of Mind

Humility here means a mindset that does not put itself first.

Paul had real authority as an apostle.

Yet he describes his ministry this way, not as a position of power.

He leads by lowering himself, not by demanding honor.

🙇 Humility means not putting self first

👑 Paul had real authority

🤲 He chose to lead humbly

📖 Serving mattered more than status

## 😢 With Many Tears, And Temptations

Paul's ministry in Ephesus was not smooth or comfortable.

"Temptations" here means trials and hard tests, not only the pull toward sin.

Real tears and real struggle sat underneath three years of faithful teaching.

😢 Tears show real emotional cost

⚔️ Temptations means trials, not just sin

📆 Three hard years, not easy ones

➡️ Ministry cost Paul something real

## 🔁 Which Befell Me By The Lying In Wait Of The Jews

This points back to plots against Paul's life throughout his time in this region.

That includes the one just described earlier in this chapter.

Opposition did not come only from pagan crowds, like the riot in chapter nineteen.

Some of the fiercest resistance came from certain Jewish leaders who rejected his message.

🔁 Points back to earlier plots in this book

⚔️ Opposition came from several directions

🏛️ Not only pagan crowds like chapter nineteen

📖 Resistance came from more than one side

## 🚫 I Kept Back Nothing That Was Profitable Unto You

Paul never softened the message to make it easier to hear.

He taught the whole truth, even the parts that were hard or unpopular.

A leader who hides parts of the truth is not actually protecting the people he leads.

🚫 Nothing was held back or hidden

💬 Hard truths were taught anyway

🛡️ Hiding truth does not protect people

📖 Full honesty marked his teaching

## 🏠 Taught You Publickly, And From House To House

Paul taught in public settings, like the lecture hall mentioned back in chapter nineteen.

He also taught in private homes, one family at a time.

Early churches had no single church building.

House to house teaching was the normal way believers were discipled.

🏛️ Publickly means open public settings

🏠 House to house means private homes

⛪ Early churches met in homes often

📖 Both settings mattered to Paul

## 🔄 Repentance Toward God, And Faith Toward Our Lord Jesus Christ

Repentance means turning away from sin and toward God.

Faith means trusting fully in Jesus as Lord.

Paul taught this same core message to both Jews and Greeks.

One group grew up knowing the law, the other did not, yet the same two truths applied to both.

🔄 Repentance means turning from sin

🙏 Faith means trusting Jesus fully

🌍 Taught equally to Jews and Greeks

📖 One gospel for every background

# Acts 20:22-27
# ⛓️ Bound For Jerusalem
---
## 🧷 I Go Bound In The Spirit Unto Jerusalem

"Bound in the spirit" means Paul feels compelled by the Holy Spirit to go.

It does not mean he is in literal chains yet.

That compulsion is strong enough that he describes it the way someone might describe being tied up.

Later in this same book, he will also be bound in actual chains in this very city.

🧷 Bound in the spirit means compelled

🕊️ The Holy Spirit is driving this decision

🔗 Literal chains come later in Jerusalem

➡️ Obedience here comes before comfort

## ❓ Not Knowing The Things That Shall Befall Me There

Paul does not know the specific details of what waits for him in Jerusalem.

He walks forward anyway, without needing every answer first.

Faith here means obeying the part that is clear, even when the rest stays hidden.

❓ The details remain unknown to him

🚶 He moves forward without them

🙏 Obedience outran his own certainty

📖 Trust does not require every answer

## 🏙️ The Holy Ghost Witnesseth In Every City

In city after city on this journey, the Holy Spirit has already warned Paul.

These warnings come through different believers along the way.

They are not Paul guessing at danger, they come repeatedly from outside sources.

"Bonds and afflictions" means arrest and suffering, stated plainly, not vaguely.

🏙️ Warnings came in city after city

🕊️ The Holy Spirit gave them, not guesswork

⛓️ Bonds and afflictions means arrest and suffering

📖 Repeated warnings confirm real danger ahead

## 🛡️ None Of These Things Move Me

Paul has heard every warning and still will not turn back.

"Move me" means shake him or change his plan.

Real courage here is not the absence of fear.

It is obeying anyway.

🛡️ Move me means shake or deter him

😨 Fear may be present either way

💪 He chooses to go anyway

➡️ Courage is obedience despite fear

## ⚖️ Neither Count I My Life Dear Unto Myself

Paul does not treat his own survival as the most important thing to protect.

This does not mean he has a death wish or sees no value in his life.

It means something else matters more to him than staying safe.

⚖️ He does not treat survival as most important

🚫 This is not a death wish

🎯 Something else matters more to him

📖 Purpose outweighed self preservation

## 🏃 Finish My Course With Joy

"Course" is the same word used for a race on an athletic track.

Paul pictures his whole ministry as a race he is determined to finish well.

He does not just want to survive it.

He wants to finish it with real joy.

🏃 Course means a race on a track

🏁 Paul wants to finish, not just survive

😊 He wants to finish with joy

📖 The goal is a faithful finish

## 📜 To Testify The Gospel Of The Grace Of God

This is Paul's own one line summary of his entire calling.

"Grace" means God's free gift, given to people who did not earn it.

Every warning and every risk exist to protect one single mission.

That mission is telling people about this free gift.

📜 Paul summarizes his whole calling here

🎁 Grace means an unearned gift from God

🎯 One mission drives every risk he takes

📖 Telling people about grace is the goal

## 👋 Shall See My Face No More

Paul tells these elders plainly that this goodbye is final.

He does not soften this news or leave them with false hope of a future visit.

Knowing this makes everything he says in this speech carry extra weight.

👋 This goodbye is meant to be final

🚫 Paul does not soften that news

⚖️ Every word here carries more weight

➡️ A real ending shapes a real speech

## 👁️ I Am Pure From The Blood Of All Men

This language echoes the prophet Ezekiel.

There, a watchman who warns people of danger is no longer responsible once the warning is given.

Paul is saying he has done his job fully as a spiritual watchman.

If anyone is lost after hearing him clearly, that responsibility does not fall on Paul.

👁️ Echoes Ezekiel's watchman warning

📯 A faithful watchman still warns clearly

⚖️ Responsibility shifts once the warning is given

📖 Paul has fully done his part

## 🙅 I Have Not Shunned To Declare Unto You All The Counsel Of God

"Shunned" means avoided or held back out of fear.

"All the counsel" means the whole message, including the hard and uncomfortable parts.

Paul repeats, in different words, the same claim from earlier in this speech.

Full honesty, with nothing left out.

🙅 Shunned means held back out of fear

📜 All the counsel means the whole message

🔁 This repeats his earlier claim

📖 Full honesty, with nothing left out

# Acts 20:28-31
# 🐺 Warning Of The Wolves
---
## 👀 Take Heed Therefore Unto Yourselves

Paul tells the elders to watch their own hearts first.

That comes before watching anyone else.

A leader who stops guarding his own faith cannot truly protect the people following him.

Personal faithfulness always comes before public responsibility.

👀 Watch your own heart first

🛡️ Guard yourself before guarding others

⚖️ Personal faith shapes public leadership

➡️ Self watch protects everyone else too

## 🕊️ The Which The Holy Ghost Hath Made You Overseers

"Overseers" is another title for the same leaders already called elders earlier in this chapter.

The Holy Spirit is the one who actually placed them in this role.

It was not a vote or a title they claimed for themselves.

Their authority comes from God, which makes their responsibility even more serious.

🕊️ Overseers means the same leaders as elders

👴 The Holy Spirit placed them there

📜 Authority came from God, not a vote

📖 Serious authority means serious responsibility

## 🐑 To Feed The Church Of God

Feeding here is shepherd language, caring for the flock the way a shepherd cares for sheep.

This means teaching sound truth that actually nourishes people's faith.

A shepherd who stops feeding the flock has failed at the one job that matters most.

🐑 Feed means shepherd like spiritual care

📖 Sound teaching nourishes real faith

🚫 Neglect fails the flock's basic need

➡️ Feeding is the core of this job

## 💰 Purchased With His Own Blood

"Purchased" means bought at a real cost, like paying a high price for something valuable.

The price here was not money.

It was Jesus dying on the cross.

The church is not a casual gathering, it cost God everything to make it.

💰 Purchased means bought at a price

✝️ The price was Jesus's own death

💎 The church cost everything to make

📖 That cost raises the stakes for leaders

## 🐺 Grievous Wolves Enter In Among You

Wolves here means false teachers who attack the church from the outside.

"Grievous" means harsh and destructive, not a minor annoyance.

"Not sparing the flock" means these teachers will do real damage once they get in.

🐺 Wolves means outside false teachers

💥 Grievous means harsh and destructive

🚫 Not sparing means real damage follows

➡️ A real threat, not an exaggeration

## 😔 Of Your Own Selves Shall Men Arise

This danger does not come from outsiders this time.

Some of the very leaders standing in this room right now will later turn.

They will lead people astray.

That makes this warning far more personal and far harder to guard against.

😔 This threat is not from outsiders

👤 Some leaders here will turn later

⚠️ A harder, more personal danger

📖 Internal threats are often the hardest to see

## 🌀 Speaking Perverse Things, To Draw Away Disciples After Them

"Perverse" means twisted, truth that has been bent away from its real meaning.

These false teachers will not announce themselves as enemies of the truth.

Their goal is to build a personal following, not to serve the church as a whole.

🌀 Perverse means twisted truth

🎭 False teachers will not announce themselves

👥 The goal is a personal following

➡️ Watch motives, not just words

## 😢 By The Space Of Three Years I Ceased Not To Warn

Paul reminds them this is not a new topic he just thought of.

For three full years, he warned them about exactly this.

Those warnings came constantly, and with real tears.

His example of nonstop warning is itself part of what they are meant to remember.

😢 Three years of consistent warning

😭 Warnings came with real tears

🔁 Not a new or sudden topic

📖 His example is part of the lesson

# Acts 20:32-35
# 🎁 More Blessed To Give
---
## 🙏 I Commend You To God, And To The Word Of His Grace

Paul is leaving, so he hands these elders over to someone greater than himself.

"The word of his grace" means the message of the gospel.

That message keeps teaching them long after Paul is gone.

He is not leaving them unprotected, he is leaving them in better hands.

🙏 Paul hands them over to God

📜 The word of grace keeps teaching

🛡️ They are not left unprotected

➡️ Better hands than his own

## 🏗️ Able To Build You Up

"Build you up" is construction language, like adding to a building one piece at a time.

God's word does the actual building, not Paul's presence or personality.

This matters because Paul already knows he will not be there to keep teaching them.

🏗️ Build you up means ongoing construction

📜 God's word does the real building

🚫 Not dependent on Paul's presence

📖 Growth continues after he leaves

## ✨ An Inheritance Among All Them Which Are Sanctified

"Sanctified" means set apart as belonging to God.

"Inheritance" points to a future reward kept for God's people.

It is not something earned through hard work alone.

Paul ends this section looking past the immediate danger toward a lasting hope.

✨ Sanctified means set apart for God

🎁 Inheritance means a future kept reward

⏳ A hope that reaches past this life

📖 Future hope outweighs present danger

## 💰 I Have Coveted No Man's Silver, Or Gold, Or Apparel

Paul never took advantage of this church financially.

He never pressured anyone for money or expensive clothing.

He makes this claim right before accusing future teachers of exactly that kind of greed.

💰 Paul never took their money

👕 He never demanded fine clothing

⚖️ Contrast with the wolves warned about earlier

📖 His example proves it is possible

## 🧵 These Hands Have Ministered Unto My Necessities

Paul worked with his own hands to pay for his own needs.

That trade was likely tied to tentmaking or leather work.

He supported himself and the people traveling with him.

His example backs up every word he just said about not coveting their money.

🧵 Hands point to Paul's own trade work

💼 He paid his own way

👥 He supported his traveling companions too

📖 Actions matched his claim about money

## 🤲 So Labouring Ye Ought To Support The Weak

"The weak" here means people unable to fully provide for themselves.

Paul's own hard work was never just about himself.

He worked so he could have something left over to help people who had less.

🤲 The weak means those unable to provide

💪 Paul's labor served more than himself

🎁 Extra effort meant extra to give

➡️ Hard work and generosity go together

## 📜 It Is More Blessed To Give Than To Receive

This exact sentence from Jesus is not recorded anywhere in the four Gospels.

Paul knows it from the oral teaching passed down among the apostles.

He treats Jesus's words as the final, settled authority on how to live.

📜 Not found in the four Gospels directly

🗣️ Passed down through early oral teaching

👑 Jesus's words settle the matter

📖 Generosity reflects Jesus's own heart

# Acts 20:36-38
# 😭 A Tearful Goodbye
---
## 🧎 He Kneeled Down, And Prayed With Them All

Standing was actually the more common prayer posture in this culture.

Kneeling added extra weight and humility to this particular moment.

Paul closes his farewell with prayer instead of more words.

Their future is placed directly into God's hands.

🧎 Kneeling added extra weight here

🙏 Standing was the more usual posture

🤲 Prayer, not more speech, ends this

📖 Their future is placed in God's hands

## 😭 They All Wept Sore

"Sore" here means severely, not a sore body part.

This was loud, open weeping from grown men, not a quiet tear or two.

Grief this strong only comes from a relationship built over real years.

😭 Sore means severely, not injured

🗣️ Loud, open weeping from grown men

📆 Years of real relationship behind it

➡️ Deep grief matched a deep bond

## 🤗 Fell On Paul's Neck, And Kissed Him

This does not read as awkward or unusual in this culture.

A kiss on the neck or cheek was a normal way for men to express deep affection and grief.

Modern readers sometimes misread this gesture through a different cultural lens.

🤗 A normal cultural gesture then

👨‍👨‍👦 Common between men in this era

🚫 Not awkward to the original readers

📖 Culture shapes how affection looks

## 💔 Sorrowing Most Of All For The Words Which He Spake

"The words" points directly back to Paul's warning earlier in this speech.

He had told them they would never see his face again.

Out of everything hard in this speech, that one sentence hurts the most.

A relationship, not a danger, is what actually breaks their hearts here.

💔 Points back to his earlier warning

😢 That one line hurt the most

👥 Relationship mattered more than risk

📖 Love, not fear, drives their tears

## 🚶 They Accompanied Him Unto The Ship

They do not say goodbye at the door and turn away.

The whole group walks with Paul all the way to the harbor.

Every extra step together is one more minute they are not ready to let go of.

🚶 They walk with him the whole way

⛵ All the way to the harbor

⏳ Every extra step delayed goodbye

📖 Love held on until the very end
`.trim();

export const ACTS_TWENTY_PERSONAL_SECTIONS = parseActsTwentyRawNotes(ACTS_TWENTY_RAW_NOTES);
