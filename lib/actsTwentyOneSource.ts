export type ActsTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsTwentyOneRawNotes(rawText: string): ActsTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 21:${startVerse}` : `Acts 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Acts 21 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_TWENTY_ONE_RAW_NOTES = `# Acts 21:1-6
# 🚢 Setting Sail Toward Jerusalem
---
## 🖊️ After We Were Gotten From Them

"We" refers to the author of Acts joining Paul's group in person.

Luke had traveled with Paul before and then stayed behind for years.

Here he picks the story back up as someone who was actually there.

A small word carries a big claim.

This account comes from an eyewitness.

🖊️ We means Luke himself returns

🤝 He rejoins Paul's traveling group

👀 This account comes from an eyewitness

📖 A small word carries a big claim

## 🏝️ A Straight Course Unto Coos

Coos was a small island near the coast of Asia Minor.

A straight course means the wind let the ship sail directly there.

Ships without a good wind often had to zigzag along the coast instead.

This trip started with smooth, favorable sailing.

🏝️ Coos was a small Aegean island

🌬️ A straight course means favorable wind

⛵ No need to zigzag along the coast

📖 The journey started with smooth sailing

## 🏛️ The Day Following Unto Rhodes

Rhodes was a large island well known across the ancient world.

It once held the Colossus of Rhodes, a giant bronze statue of the sun god.

That statue had already fallen in an earthquake centuries earlier.

Paul's ship simply stopped there on its way south.

🏛️ Rhodes was a famous ancient island

🗿 Home to the fallen Colossus statue

⏳ The statue fell centuries earlier

➡️ The ship only stopped briefly here

## ⚓ From Thence Unto Patara

Patara was a busy port city on the southern coast of Asia Minor.

Ships heading further east often changed vessels there.

That is exactly what Paul's group does in the next verse.

Patara was simply a practical stop, not a final destination.

⚓ Patara was a busy port city

🔄 Travelers often changed ships there

➡️ Paul's group changes ships next

📖 A practical stop, not a destination

## 🗺️ Sailing Over Unto Phenicia

Phenicia is the ancient region modern readers call Phoenicia.

It sat along the coast north of Israel, in what is now Lebanon.

The region was known for trade, sailing, and the purple dye it exported.

Paul books passage on a ship headed straight there.

🗺️ Phenicia means ancient Phoenicia

🧵 Known for trade and purple dye

🌊 Sat along the coast north of Israel

📖 Paul sails straight toward that coast

## 🧭 We Left It On The Left Hand

This phrase describes passing an island without stopping there.

Cyprus stayed visible on the ship's left side as they sailed by.

Paul had already visited Cyprus on an earlier missionary journey.

This time the ship simply sails past it toward Syria.

🧭 Left hand means they sailed past

🏝️ Cyprus stayed visible on that side

🔁 Paul had visited Cyprus before

➡️ This time the ship just passes by

## 📦 There The Ship Was To Unlade Her Burden

"Unlade" means to unload cargo from a ship.

Tyre was a major Phoenician trading port with a long history.

The ship stops at Tyre for business, not because of Paul's mission.

Paul simply uses the layover to find fellow believers in the city.

📦 Unlade means to unload cargo

🏙️ Tyre was a major trading port

💼 The stop was really about business

📖 Paul uses the layover to find believers

## 🔮 Through The Spirit, That He Should Not Go Up To Jerusalem

This does not mean the Holy Spirit gave Paul a direct order to stay away.

The Spirit was revealing the suffering waiting for Paul in Jerusalem.

The disciples heard that revelation and turned it into an urgent plea.

Paul hears the same kind of warning again later in this chapter and still goes.

🔮 The Spirit reveals coming suffering

🗣️ Disciples turn that into pleading

🚶 Paul still chooses to continue

📖 Warning and obedience can coexist

## 🙏 We Kneeled Down On The Shore, And Prayed

Public prayer like this was a normal part of saying goodbye in this culture.

Kneeling added a visible sign of humility in front of everyone watching.

The whole gathering, families included, takes part before the ship departs.

This send off showed how seriously the church treated separation.

🙏 Kneeling showed visible humility

👨‍👩‍👧 Whole families joined in prayer

⛵ Prayer came right before departure

📖 Separation was treated with real weight

## 🚢 They Returned Home Again

Saying goodbye at a dock felt final in a way modern travel rarely does.

No easy way existed to stay in touch across long distances back then.

Everyone in this scene understood they might never meet again in person.

That knowledge makes the earlier prayer on the shore even more meaningful.

🚢 Goodbyes here felt truly final

📵 No easy way to stay in touch

😢 They might never meet again

📖 This made the shore prayer meaningful

# Acts 21:7-14
# ⚠️ A Prophet's Warning At Caesarea
---
## 👋 Saluted The Brethren

"Saluted" here simply means greeting other believers warmly.

Ptolemais was another coastal city along the same shipping route.

Paul's group stays only one day before continuing the journey.

Short stops like this let traveling believers refresh old friendships quickly.

👋 Saluted means warmly greeting someone

⛵ Ptolemais was another coastal stop

🕐 The group stays only one day

📖 Short visits still refreshed real friendships

## 🍽️ Philip The Evangelist, Which Was One Of The Seven

"The seven" refers to the seven men chosen to serve tables back in Acts chapter six.

Philip was one of those original seven, not one of the twelve apostles.

Since that appointment, Philip had become known instead as a traveling preacher.

He now lives settled in Caesarea with a household of his own.

🍽️ The seven served tables in Acts six

🏃 Philip became a traveling evangelist

🏠 He now lives settled in Caesarea

📖 One appointment led to years of ministry

## 👩‍👧‍👧 Four Daughters, Virgins, Which Did Prophesy

Philip's four daughters were unmarried women who spoke prophetic messages from God.

Prophesying was not limited to men in the early church.

Scripture records this detail plainly, without treating it as unusual.

Their gift becomes part of the backdrop just before Agabus arrives.

👩‍👧‍👧 Four unmarried daughters who prophesied

🗣️ Prophesying was not only for men

📜 Scripture records it without surprise

➡️ Their gift sets up what comes next

## 📖 A Certain Prophet, Named Agabus

Agabus already appears earlier in Acts, back in chapter eleven.

There he predicted a severe famine that later happened exactly as he said.

His track record gives weight to whatever he says next.

Readers already know his prophecies tend to come true.

📖 Agabus appeared before in Acts eleven

🌾 He once predicted a real famine

✅ That earlier prophecy came true

➡️ His track record carries real weight

## 🧵 Took Paul's Girdle, And Bound His Own Hands And Feet

A "girdle" was a long cloth belt wrapped around the waist.

Agabus acts out his message instead of only speaking it.

Old Testament prophets like Isaiah and Ezekiel used this same kind of acted out warning.

The physical picture makes the coming danger impossible to miss.

🧵 Girdle means a long cloth belt

🎭 Agabus acts out his message

📜 Old Testament prophets used this method

📖 The picture makes danger unmistakable

## 🗣️ Thus Saith The Holy Ghost

This phrase marks the message as coming directly from God, not from Agabus himself.

Old Testament prophets used nearly the same wording to introduce their own messages.

Agabus places himself in that same prophetic tradition on purpose.

The words that follow carry full divine authority.

🗣️ This marks a message from God

📜 Matches old prophetic wording exactly

🔗 Agabus joins that same tradition

📖 The words carry full authority

## 👤 Bind The Man That Owneth This Girdle

"The man that owneth this girdle" means Paul himself.

Agabus names him indirectly, the way the earlier acted out sign already implied.

The prophecy predicts Jewish opposition leading to Paul's arrest in Jerusalem.

It does not say God is forbidding the trip, only describing what will happen.

👤 The man means Paul himself

🔮 Agabus predicts Paul's arrest

🏙️ The arrest happens in Jerusalem

➡️ A warning, not a forbidden command

## 🏛️ Deliver Him Into The Hands Of The Gentiles

"Gentiles" here specifically means the Roman authorities controlling Jerusalem.

The prophecy says Jewish opponents will hand Paul over to Roman custody.

That is exactly how the rest of Acts plays out from here on.

Agabus's detail turns out to be accurate.

🏛️ Gentiles here means Roman authorities

🤝 Jewish opponents hand Paul to Rome

✅ Agabus's detail proves accurate

📖 This is exactly how Acts unfolds

## 😢 Besought Him Not To Go Up To Jerusalem

Everyone around Paul reacts the same way the disciples at Tyre already did.

Fear for Paul's safety unites the whole group in one urgent plea.

Their love for him is obvious even though their advice will not change his mind.

This is now the second time in one chapter that believers beg him to stop.

😢 Everyone begs Paul to stay

❤️ Their love for him is obvious

🔁 This plea echoes the one at Tyre

➡️ Paul's mind stays unchanged either way

## 😭 What Mean Ye To Weep And To Break Mine Heart?

Paul is not angry at his friends for caring about him.

Their tears make an already hard decision even harder to carry.

He admits the emotional weight honestly instead of acting unaffected.

Courage here does not mean feeling nothing.

😭 Their tears make this harder

💔 Paul admits real emotional weight

🙅 He is not angry at them

📖 Courage does not mean feeling nothing

## ⛓️ Ready Not To Be Bound Only, But Also To Die

Paul names the worst possible outcome out loud, on purpose.

He is not hoping for a lighter sentence or a quiet escape.

His commitment to the mission goes all the way to full surrender.

This line becomes the clearest statement of resolve in the whole chapter.

⛓️ Paul names the worst outcome

🙌 He is not hoping to escape

✝️ His surrender goes all the way

📖 This is the chapter's clearest resolve

## 🙏 The Will Of The Lord Be Done

This same phrase echoes the words Jesus prayed in Gethsemane before his own arrest.

The believers finally stop arguing and accept what they cannot change.

Letting go after pleading honestly is its own form of faith.

The group moves from begging to trusting in just one sentence.

🙏 Echoes Jesus's own prayer in Gethsemane

🛑 The group stops arguing

🤲 Letting go is its own faith

➡️ Begging turns into trusting

# Acts 21:15-19
# 🏙️ Arriving In Jerusalem
---
## 🎒 We Took Up Our Carriages

"Carriages" in this verse does not mean wheeled vehicles.

The word refers to personal belongings and travel gear being packed up.

This simply describes Paul's group gathering their things before the final leg to Jerusalem.

A modern reader pictures carts, but the real picture is backpacks and bundles.

🎒 Carriages means personal belongings here

🚫 Not wheeled vehicles at all

🧳 Packing up for the final leg

📖 A modern word hides an older meaning

## 📜 One Mnason Of Cyprus, An Old Disciple

Mnason had likely been a believer since the earliest days of the church.

"Old disciple" marks him as someone converted long before this journey.

He may have come to faith around the same time as other early believers from Cyprus.

His home becomes the lodging for Paul's group in Jerusalem.

📜 Mnason was an early believer

🕰️ Old disciple means converted long ago

🏝️ Possibly linked to Cyprus believers in Acts

➡️ His home houses Paul's group

## 🏨 With Whom We Should Lodge

Jerusalem had no hotels the way a modern city does.

Traveling believers depended completely on other believers opening their homes.

Hospitality like this was not just a kindness.

It was how the church actually functioned.

Mnason's willingness to host made this whole trip possible.

🏨 Ancient Jerusalem had no hotels

🤝 Believers relied on each other's homes

🏠 Hospitality kept the church running

📖 One home made this trip possible

## 🤗 The Brethren Received Us Gladly

This welcome stands in sharp contrast to all the warnings Paul heard along the way.

Fear did not shape how the Jerusalem believers actually treated him.

Their joy at seeing him shows real affection, not political caution.

Warning and welcome can both be true at the very same time.

🤗 A warm welcome despite earlier warnings

❤️ Real affection, not caution

😊 Genuine joy at seeing Paul

➡️ Warning and welcome can coexist

## 👤 Paul Went In With Us Unto James

This James is the brother of Jesus, not one of the original twelve apostles.

By this point he leads the church in Jerusalem.

He already appears earlier in Acts, settling the major debate about Gentile believers in chapter fifteen.

Meeting with James means meeting the most influential leader in the city.

👤 James was Jesus's own brother

👑 He led the Jerusalem church

📜 He settled the debate in Acts fifteen

➡️ This meeting was with the top leader

## 🏛️ All The Elders Were Present

This was not a casual visit between old friends.

Every elder gathering together signals a formal, official meeting.

Paul's report is about to be heard by the full leadership of the church.

What happens in this meeting will shape the rest of his time in Jerusalem.

🏛️ A formal meeting, not a visit

👥 Every elder gathered together

📋 Paul reports to full leadership

➡️ This meeting shapes what follows

## 🛠️ Declared Particularly What Things God Had Wrought Among The Gentiles

"Wrought" is an old word that simply means done or accomplished.

Paul gives a detailed report, not a quick summary.

He credits God directly for every result of his missionary work.

This same kind of report appears earlier in Acts after each major journey.

🛠️ Wrought means done or accomplished

📋 Paul gives a detailed report

🙌 God gets credit for the results

📖 Paul reports after every major trip

# Acts 21:20-26
# 🙏 The Vow To Quiet The Rumor
---
## ❓ What Is It Therefore?

James is not asking a simple question out of curiosity.

He is naming the real problem Paul's visit has created for the Jerusalem church.

The rest of his words lay out an actual plan to deal with it.

Jerusalem's leaders choose action over simply ignoring the rumor.

❓ James names the real problem

📋 He moves straight to a plan

🚫 Ignoring the rumor was not an option

➡️ Leaders chose action over silence

## 🔢 Thousands Of Jews There Are Which Believe

This number reveals something easy to miss.

The Jerusalem church was still mostly Jewish.

Faith in Jesus had not pulled these believers out of their Jewish identity.

They kept worshiping, observing festivals, and following the law as devoted Jews.

This detail sets up the whole tension of the rest of the chapter.

🔢 Thousands of Jewish believers in Jerusalem

🕎 Jewish identity stayed fully intact

📜 They still followed the law

➡️ This sets up the chapter's tension

## 🔥 All Zealous Of The Law

"Zealous" means deeply committed, eager, and serious about something.

These Jewish believers had not set aside the law of Moses after following Jesus.

Trusting Jesus and keeping the law were not in conflict for them.

That combination is exactly what makes the coming rumor about Paul so dangerous.

🔥 Zealous means deeply committed

📜 Law keeping continued after belief

🤝 Jesus and law were not in conflict

➡️ This makes the rumor dangerous

## ❌ Teachest All The Jews Which Are Among The Gentiles To Forsake Moses

This accusation against Paul was not actually true.

Paul never told Jewish believers to abandon the law of Moses for themselves.

His actual teaching was that Gentiles did not need to become Jewish first to follow Jesus.

A rumor had twisted that message into something Paul never said.

❌ The accusation was simply false

📖 Paul never told Jews to abandon Moses

🌍 His real message was about Gentiles

➡️ A rumor twisted his real words

## ✂️ Not To Circumcise Their Children, Neither To Walk After The Customs

These specific details made the rumor feel believable and urgent.

Circumcision and the customs named here were central markers of Jewish identity.

If true, this would mean Paul wanted Jewish believers to stop being Jewish.

The elders needed a visible way to prove the rumor wrong.

✂️ Circumcision marked Jewish identity

🚶 Customs here means Jewish practices

😟 The rumor felt urgent and believable

➡️ The elders needed visible proof otherwise

## 🍷 We Have Four Men Which Have A Vow On Them

This vow almost certainly describes a Nazarite vow from the Old Testament law.

A Nazarite promised to avoid wine, avoid touching dead bodies, and let their hair grow.

Completing the vow required a specific temple ceremony and an offering.

James proposes that Paul take part in that ceremony publicly.

🍷 Likely describes a Nazarite vow

💇 Included not cutting their hair

🕊️ Completion required a temple offering

➡️ Paul is asked to join publicly

## 📢 Do Therefore This That We Say To Thee

James is not making a suggestion Paul is free to ignore.

This phrasing carries real weight coming from the leader of the Jerusalem church.

Paul's willingness to listen shows real humility toward local leadership.

Even an apostle with his own calling still works within the wider church.

📢 Not a suggestion, a real request

👑 James speaks with real authority

🙏 Paul responds with humility

➡️ Even apostles work within community

## 💰 Purify Thyself With Them, And Be At Charges With Them

"Be at charges" means Paul would help pay for the ceremony's cost.

Purifying himself meant following the same ritual steps required of the four men.

Paying for the offerings was itself a generous, visible act of support.

This gesture was meant to answer the rumor through action, not words.

💰 Be at charges means paying costs

🛁 Purify means following ritual steps

🎁 Paul's payment showed real support

➡️ Action answers the rumor here

## ✂️ That They May Shave Their Heads

Shaving the head marked the official end of a Nazarite vow.

The cut hair was then offered as part of the closing ceremony.

This visible act told everyone watching that the vow period was complete.

Paul's presence at this moment makes his support unmistakable to the whole crowd.

✂️ Shaving marked the vow's end

🔥 Cut hair was offered in ceremony

👀 A visible sign for the crowd

➡️ Paul's presence made support unmistakable

## 📜 Things Offered To Idols, And From Blood, And From Strangled, And From Fornication

This exact list already appeared in Acts chapter fifteen.

That meeting is often called the Jerusalem council.

That earlier decision was written for Gentile believers, not Jewish believers.

James repeats it here to confirm the decision still stands.

📜 Repeats the list from Acts fifteen

🌍 Originally written for Gentile believers

🔁 James confirms it still stands

📖 Old decisions still carried weight

## ✅ Purifying Himself With Them Entered Into The Temple

Paul follows through completely on what James asked of him.

He does not treat the request as beneath him or unnecessary.

His willingness shows that keeping Jewish custom and trusting Jesus were not opposites for him.

This moment directly answers the false rumor with a public, physical action.

✅ Paul follows through completely

🙏 He treats the request seriously

🤝 Custom and faith were not opposites

➡️ Action answers the rumor directly

## 🗓️ The Accomplishment Of The Days Of Purification

Nazarite purification rituals typically required a period of seven days.

Paul commits to finishing out that entire process in the temple.

This was not a quick gesture.

It took real time spent in a very public place.

His commitment to the plan will soon put him in real danger.

🗓️ Purification usually lasted seven days

⏳ Paul commits to the full process

👀 Real time in a public place

➡️ This sets up real danger ahead

# Acts 21:27-30
# 🔥 Riot In The Temple
---
## 🗺️ Jews Which Were Of Asia

These opponents likely traveled from Ephesus, a city where Paul had faced fierce resistance before.

They would have recognized both Paul and Trophimus from that earlier conflict.

Old opposition from one city follows Paul all the way to Jerusalem.

This was not a random crowd, it was a group with a grudge already in place.

🗺️ Likely opponents from Ephesus

👀 They recognized Paul and Trophimus

🔁 Old opposition followed him here

➡️ This crowd already had a grudge

## 🔥 Stirred Up All The People, And Laid Hands On Him

"Stirred up" means deliberately provoking a crowd into anger and action.

A few accusers can turn an entire temple courtyard hostile within minutes.

Laying hands on Paul here means physically seizing him, not a gentle touch.

This moment turns an accusation into an actual, physical attack.

🔥 Stirred up means provoking anger

👥 A few voices moved a whole crowd

✊ Laid hands means a physical seizing

➡️ Accusation becomes a real attack

## 🏛️ Brought Greeks Also Into The Temple, And Hath Polluted This Holy Place

The Jerusalem temple had a Gentile courtyard that any visitor could enter freely.

Beyond that courtyard, a wall barred non Jews from going any further, under penalty of death.

The accusers claim Paul broke that boundary by bringing a Gentile too far inside.

That specific accusation was serious enough to justify violence in the accusers' minds.

🏛️ Gentiles could enter one outer court

🚧 A wall barred them from going further

⚠️ Crossing it carried a death penalty

➡️ The accusers thought this justified violence

## 👤 Trophimus An Ephesian

The accusers never actually saw Trophimus inside the temple's restricted area.

They had only seen him with Paul earlier, somewhere in the city.

From that single sighting, they assumed the worst without any real proof.

The entire riot starts from an assumption, not a confirmed fact.

👤 Trophimus was a Gentile companion

🤔 He was never seen inside the temple

❌ The accusation was pure assumption

📖 A guess sparked the whole riot

## 📢 All The City Was Moved, And The People Ran Together

News like this spread through Jerusalem within minutes, not hours.

Crowds gathering quickly made the situation far more dangerous for Paul.

A single false accusation had grown into a city wide disturbance.

Nothing about the original claim had been checked or confirmed by anyone.

📢 News spread within minutes

👥 Crowds made the danger worse

🌀 One accusation became a citywide uproar

➡️ Nobody confirmed the claim first

## ⏱️ Forthwith The Doors Were Shut

"Forthwith" means immediately, without any delay at all.

Temple officials shut the doors to keep the violence from spilling into the sanctuary itself.

That same closed door also meant Paul had nowhere left to run.

The crowd now has him fully surrounded with no escape route open.

⏱️ Forthwith means immediately

🚪 Doors closed to protect the sanctuary

🚫 Paul now has nowhere to run

➡️ The crowd has him fully surrounded

# Acts 21:31-36
# 🛡️ Rescued By Rome
---
## 🪖 The Chief Captain Of The Band

The "chief captain" was a Roman military tribune commanding about a thousand soldiers.

His soldiers were garrisoned at the Antonia Fortress, built right next to the temple.

That location let Roman soldiers see trouble in the temple courts almost instantly.

His quick response was not luck, it was by careful Roman design.

🪖 Chief captain means a Roman tribune

🏰 His soldiers were based nearby

👀 The fortress overlooked the temple courts

📖 Quick response was by design

## ⏱️ That All Jerusalem Was In An Uproar

Word reaches the Roman commander faster than the mob can finish its violence.

Rome kept close watch over Jerusalem precisely because riots like this happened before.

The timing here saves Paul's life by minutes, not hours.

A detail that looks like coincidence fits a larger pattern of Roman control.

⏱️ Word reached Rome within minutes

👁️ Rome watched Jerusalem closely

🆘 Timing saved Paul's life

➡️ Roman control shaped this whole moment

## 🎖️ Took Soldiers And Centurions, And Ran Down Unto Them

A "centurion" commanded about a hundred soldiers within the larger Roman army.

Bringing multiple centurions shows this response was large, not a token patrol.

The mob stops beating Paul the instant armed soldiers actually arrive.

Rome's uninvited intervention becomes the very thing that keeps Paul alive.

🎖️ A centurion commanded about a hundred men

💪 This was a large military response

🛑 The beating stopped once soldiers arrived

📖 Rome's intervention kept Paul alive

## 🔗 Commanded Him To Be Bound With Two Chains

This detail fulfills part of Agabus's earlier prophecy about Paul being bound.

Roman soldiers routinely chained a prisoner to a guard on each side for custody.

The chains protect Paul from the crowd as much as they restrain him.

Prophecy and Roman procedure line up in this single, ordinary looking detail.

🔗 Fulfills part of Agabus's warning

⛓️ Two chains meant guards on each side

🛡️ Chains protected Paul from the crowd

📖 Prophecy matched ordinary procedure

## ⚖️ Demanded Who He Was, And What He Had Done

Roman procedure required at least a basic charge before taking further action.

The captain still does not know who Paul actually is at this point.

That gap between arrest and actual evidence becomes a running theme for the rest of Acts.

Paul will spend the next several chapters explaining exactly this question.

⚖️ Roman procedure needed a real charge

❓ The captain had no real answers yet

🔁 This becomes a running theme

➡️ Paul explains himself for chapters ahead

## 🗣️ Some Cried One Thing, Some Another

No two people in the crowd are even telling the same story.

That confusion itself proves nobody actually witnessed a real crime.

A mob does not need facts to turn violent, only shared anger.

The chief captain faces a crowd that cannot even agree on the accusation.

🗣️ No two voices agreed

❌ Confusion proved no real crime

😡 Shared anger did not need facts

➡️ The captain faced total confusion

## 🏰 Commanded Him To Be Carried Into The Castle

"The castle" refers to the Antonia Fortress, a Roman military base beside the temple.

Soldiers are not just protecting Paul.

They are moving him somewhere the mob cannot reach.

The violence outside had become too dangerous to manage any other way.

🏰 Castle means the Antonia Fortress

🛡️ Soldiers moved Paul out of reach

⚠️ The street had become too dangerous

➡️ Attacked prisoner becomes guarded prisoner

## 🙆 He Was Borne Of The Soldiers For The Violence Of The People

"Borne" means carried, since the crush of the crowd made walking impossible.

The mob pressed in so tightly that soldiers had to lift Paul off his feet.

This detail shows just how close Paul came to being killed on the spot.

Roman soldiers end up protecting the very man the crowd wanted dead.

🙆 Borne means physically carried

👥 The crowd's crush blocked walking

⚠️ Paul came close to being killed

📖 Soldiers protected the crowd's target

## 📖 Crying, Away With Him

This exact phrase was already shouted once before, against Jesus, in Luke chapter twenty three.

The same city repeats the same words against one of his own followers.

Paul now walks a path that closely mirrors what his Lord endured.

That echo is almost certainly intentional on Luke's part as the writer.

📖 This phrase already targeted Jesus

🔁 The same city repeats itself

🚶 Paul's path mirrors his Lord's

➡️ The echo is likely intentional

# Acts 21:37-40
# 🗣️ Paul Asks To Speak
---
## 😮 Canst Thou Speak Greek?

The captain is surprised because he assumed Paul was someone else entirely.

Speaking fluent Greek marked Paul as educated, not merely a rioting local.

That single question shifts how the captain sees him on the spot.

A prisoner about to be beaten suddenly becomes a prisoner worth hearing out.

😮 The captain expected someone else

🎓 Greek signaled real education

🔄 His view of Paul shifted instantly

➡️ A prisoner becomes worth hearing

## 📜 Art Not Thou That Egyptian

History outside the Bible records a real rebel known simply as "the Egyptian."

He had gathered a large following and promised to overthrow Roman rule by a miracle.

Roman forces had already crushed that uprising.

The Egyptian himself still escaped capture.

The captain assumed Paul was that same wanted man, finally caught.

📜 A real historical rebel figure

✊ He promised to overthrow Rome

🏃 He escaped after his revolt failed

➡️ The captain thought Paul was him

## 🗡️ Four Thousand Men That Were Murderers

This likely refers to a violent group of assassins active in Judea at the time.

They were known for blending into crowds and killing with hidden daggers.

The captain assumed Paul led a dangerous armed rebellion, not a religious mission.

That assumption explains why Paul was arrested with such force in the first place.

🗡️ Likely refers to hidden assassins

😨 Known for sudden violent attacks

❌ The captain's assumption was wrong

📖 Wrong assumptions shaped Paul's rough arrest

## 🏙️ A Citizen Of No Mean City

"No mean city" means Tarsus was not an unimportant place at all.

Tarsus was a respected center of learning in the Roman world.

Paul corrects the captain's mistaken identity with his own real background instead.

Being from a known city carried real social weight in that culture.

🏙️ No mean city means highly respected

📚 Tarsus was a center of learning

🪪 Paul states his real identity

➡️ A known city carried real weight

## 🙏 I Beseech Thee, Suffer Me To Speak Unto The People

Paul asks permission instead of simply assuming he has the right.

He wants to address the very crowd that just tried to kill him.

Most people in his position would want distance, not another confrontation.

Paul sees this dangerous moment as one more chance to preach.

🙏 Paul asks permission first

😮 He faces the same hostile crowd

🚫 Most would want distance instead

➡️ Paul sees an open door to preach

## ✋ Beckoned With The Hand Unto The People

This hand gesture was a common way ancient speakers asked a crowd for quiet.

Paul uses it standing on the fortress stairs, in full view of everyone below.

Getting a violent mob to actually fall silent was no small achievement.

That silence becomes the open door for everything Paul says next.

✋ A gesture asking for silence

🏰 Paul stood visible on the stairs

🤫 A violent mob actually quieted down

➡️ Silence opened the door to speak

## 🗣️ He Spake Unto Them In The Hebrew Tongue

"Hebrew tongue" here most likely means Aramaic, the everyday language of the people.

Aramaic was closely related to Hebrew and commonly called by that name at the time.

Speaking in their own familiar language instead of Greek shows real respect for the crowd.

Paul chooses the language most likely to calm them before he says a single word.

🗣️ Hebrew tongue likely means Aramaic

🤝 Their everyday, familiar language

❤️ A deliberate sign of respect

➡️ Language choice came before the words
`.trim();

export const ACTS_TWENTY_ONE_PERSONAL_SECTIONS = parseActsTwentyOneRawNotes(ACTS_TWENTY_ONE_RAW_NOTES);
