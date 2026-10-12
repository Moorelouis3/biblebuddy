export type ActsTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsTwentySevenRawNotes(rawText: string): ActsTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+27:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 27:${startVerse}` : `Acts 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Acts 27 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_TWENTY_SEVEN_RAW_NOTES = `# Acts 27:1-3
# 🚢 Paul Sails For Rome Under Guard
---
## ⛓️ Delivered Paul And Certain Other Prisoners Unto One Named Julius

Paul is now a Roman prisoner being shipped across the sea.

He had appealed to Caesar back in chapter twenty five.

Roman law required that appeal to be honored in Rome itself.

Julius held formal legal custody over Paul for the whole voyage.

Rome, not Paul, now controls where this trip goes.

⛓️ Paul travels as a Roman prisoner

📜 His own appeal set this trip in motion

👤 Julius holds legal custody the whole way

📖 Rome now controls where Paul goes

## 👑 A Centurion Of Augustus' Band

A centurion commanded about a hundred soldiers in the Roman army.

Augustus' band likely names a special cohort tied to the emperor.

This kind of unit often carried official dispatches and prisoners.

Being assigned this escort shows Rome treated Paul's case seriously.

🎖️ A centurion led about a hundred men

👑 Augustus' band likely served the emperor directly

📜 This unit handled official Roman business

📖 Rome treated Paul's case seriously

## ⚓ A Ship Of Adramyttium

Adramyttium was a port city on the coast of Asia.

This ship was never heading straight to Rome.

It was a coastal trading vessel running along the shoreline.

Paul's group planned to switch ships partway through the journey.

⚓ Adramyttium sat on the coast of Asia

🧭 This ship hugged the shoreline, not open sea

🔄 A ship change was already expected

➡️ Getting to Rome took more than one leg

## 👥 One Aristarchus, A Macedonian Of Thessalonica

Aristarchus already appears earlier in the book of Acts.

He was caught up in the riot at Ephesus.

He later traveled with Paul from Greece toward Jerusalem.

The word "we" shows Luke himself is also present.

👥 Aristarchus already appears earlier in Acts

🌍 He came from Thessalonica in Macedonia

🤝 A longtime companion, not a stranger

📖 Luke himself travels with them too

## 🌊 We Touched At Sidon

Sidon was an old Phoenician port city on this coast.

It sat along the normal route ships took heading north.

This stop was ordinary seafaring, not a plan Paul controlled.

Even today, Sidon sits on the coast of Lebanon.

🌊 Sidon was an old Phoenician port

🧭 It sat along the normal coastal route

⛵ This stop followed the ship's own path

➡️ Paul's own plans were not driving this leg

## 🤝 Julius Courteously Entreated Paul

Entreated here means treated, not begged for mercy.

A Roman centurion guarding prisoners owed them no kindness at all.

Julius chooses respect anyway, right from the very first stop.

This pattern of fair treatment continues through the rest of the voyage.

🗣️ Entreated here means treated, not begged

⚖️ Kindness was not required of Julius

🤝 He chooses respect toward his prisoner

📖 This fair treatment continues all voyage

## 👋 Gave Him Liberty To Go Unto His Friends To Refresh Himself

Paul already has believers in Sidon he can visit.

This is the first time Acts mentions a Sidon church directly.

The gospel had clearly spread to cities Acts never fully describes.

Julius allowing this visit shows real trust building between them.

👥 Paul already has friends in Sidon

🌱 The gospel had spread further than Acts describes

🤝 Julius shows early trust in Paul

➡️ A good relationship starts the voyage

# Acts 27:4-8
# ⛵ Fighting The Wind Toward Crete
---
## 🌬️ We Sailed Under Cyprus, Because The Winds Were Contrary

Sailed under here means staying on the sheltered side of an island.

It does not mean literally passing beneath Cyprus.

West winds made the straight route to Italy nearly impossible.

The ship hugged Cyprus for protection instead of crossing open water.

🌬️ Under here means the sheltered side

🧭 West winds blocked the direct route

🛡️ Cyprus offered protection from the wind

📖 Ancient ships could not fight the wind

## 🗺️ The Sea Of Cilicia And Pamphylia

Cilicia and Pamphylia were coastal regions along southern Asia Minor.

Paul's own hometown, Tarsus, sat inside the region of Cilicia.

The ship was working steadily north and west along this coast.

Every leg of the trip still followed the safest shoreline available.

🗺️ Cilicia and Pamphylia line the southern coast

🏠 Tarsus, Paul's hometown, sat in Cilicia

🧭 The ship still hugged the coastline

➡️ Safety came before speed on this trip

## 🏙️ Myra, A City Of Lycia

Lycia was a hub for grain ships moving between Egypt and Rome.

Myra sat right along that busy shipping route.

Finding a connection to another ship here was not random at all.

Trade routes, not luck, shaped this part of the journey.

🌾 Lycia was a hub for grain ship routes

🏙️ Myra sat along that busy trade path

🔄 Finding a Rome bound ship made sense

📖 Trade routes shaped this part of the trip

## 🌾 The Centurion Found A Ship Of Alexandria Sailing Into Italy

Alexandria in Egypt was one of the largest grain exporting cities.

A ship from there heading to Italy likely carried wheat for Rome.

Verse thirty eight later confirms this ship held wheat.

Julius simply had the authority to place his prisoners aboard.

🌾 Alexandria exported huge amounts of grain

🍞 This ship likely carried wheat for Rome

⚖️ Julius had full authority over the switch

📖 Rome's food needs shaped this whole voyage

## 🐢 Scarce Were Come Over Against Cnidus

Scarce means barely, showing how slow this leg had become.

Cnidus was a port normally easy to reach without trouble.

Struggling to reach it already signals the weather turning against them.

A merely inconvenient wind is becoming a real obstacle here.

🐢 Scarce means barely, showing real difficulty

📍 Cnidus was a normally easy landmark

🌬️ The wind was turning into a real problem

➡️ Trouble was building before the storm hit

## 🗺️ We Sailed Under Crete, Over Against Salmone

Unable to continue toward Italy, the ship turns south for shelter.

Salmone was the easternmost point of the island of Crete.

It was the first land they reached rounding that coast.

This course change was forced by weather, not chosen for ease.

🗺️ The ship turns south toward Crete

📍 Salmone marks Crete's easternmost point

🌬️ Weather forced this change in course

📖 The plan kept bending to the wind

## ⚓ The Fair Havens, Nigh Whereunto Was The City Of Lasea

Fair Havens was a small bay along Crete's southern coast.

Its name is the only fair thing about this stretch of water.

Lasea was a minor nearby town few outside readers would know.

This precise detail shows Luke is reporting real firsthand travel.

⚓ Fair Havens was a small bay on Crete

🏘️ Lasea was a minor, little known town

✍️ This detail shows firsthand travel

📖 Real places ground this whole account

## 🐢 Hardly Passing It

Hardly passing it means they barely sailed around this point at all.

Every short distance on this trip was costing real time and effort.

The ship's struggle to move is becoming the story itself.

Nothing about this leg of the journey was coming easily.

🐢 Hardly means barely able to continue

⏳ Every short distance cost real effort

🌬️ The struggle itself becomes the story

➡️ Nothing on this leg came easily

# Acts 27:9-12
# ⏳ A Dangerous Decision To Press On
---
## 📅 Sailing Was Now Dangerous, Because The Fast Was Now Already Past

The fast refers to the Jewish Day of Atonement.

That day falls in late September or early October today.

Sailors across the Mediterranean treated this season as unsafe for travel.

Luke dates the danger by a Jewish calendar, not a Roman one.

📅 The fast marks the Day of Atonement

❄️ Autumn sailing was considered genuinely unsafe

🗣️ Luke uses a Jewish calendar marker here

➡️ This was the worst season to sail

## 🗣️ Paul Admonished Them

Admonished means Paul gave a serious, direct warning.

He held no formal command over this ship as a passenger.

Still, Paul speaks up because he can see real danger ahead.

Experience and spiritual insight gave him something worth saying.

🗣️ Admonished means a serious, direct warning

🙋 Paul held no formal command on this ship

👀 He spoke because he saw real danger

📖 Insight can matter more than rank

## 📦 Hurt And Much Damage, Not Only Of The Lading And Ship, But Also Of Our Lives

Paul names three losses in careful order here.

He lists the cargo, then the ship, then human lives last.

That order matches how a sailor or merchant would normally think.

Paul is warning that lives themselves are now at risk.

📦 Paul names cargo, ship, and lives in order

💰 That order reflects how a sailor would think

⚠️ Lives, not just cargo, are at risk

📖 This was a warning, not a guess

## ⚓ The Centurion Believed The Master And The Owner Of The Ship

The master was the ship's experienced captain.

The owner had money riding on reaching Italy on schedule.

Julius, as the ranking officer, held the final decision.

He chose their professional judgment over Paul's warning.

⚓ The master was the ship's experienced captain

💰 The owner had money riding on this trip

🎖️ Julius held the final decision as commander

➡️ Money pulled against caution here

## 🏚️ The Haven Was Not Commodious To Winter In

Commodious is an old word for suitable, not spacious luxury.

Fair Havens was simply too exposed to shelter a ship for months.

The crew was not choosing recklessness without any reason at all.

They were weighing one real risk against another real risk.

🏚️ Commodious means suitable, not luxurious

🌊 Fair Havens was too exposed for winter

⚖️ Both staying and leaving carried real risk

📖 This was a hard call, not foolishness

## ⚓ If By Any Means They Might Attain To Phenice

Phenice was another harbor on Crete thought to offer better shelter.

It was not a long distance away from where they already were.

One more stretch of exposed coastal sailing stood in the way.

They were only reaching for a slightly better harbor, not an ambitious goal.

⚓ Phenice promised safer winter shelter

📏 It was not a long distance away

😣 A modest goal made the disaster painful

➡️ Small decisions can carry large consequences

# Acts 27:13-17
# 🌪️ The Storm Called Euroclydon
---
## 🌬️ The South Wind Blew Softly, Supposing That They Had Obtained Their Purpose

A gentle south wind looked like exactly the sign they wanted.

Supposing shows real confidence, not just a cautious hope.

Mediterranean weather in this season could flip with almost no warning.

Their confidence was about to be proven completely wrong.

🌬️ A gentle south wind looked promising

😊 Supposing shows real confidence, not just hope

⚡ This season's weather could flip suddenly

➡️ Confidence here was about to be proven wrong

## 🌀 A Tempestuous Wind, Called Euroclydon

Euroclydon names a violent northeast windstorm known in this region.

The name blends Greek and Latin roots pointing to its direction.

Sailors here recognized this storm by name, like naming a hurricane.

This was a known danger, not a vague, unnamed gale.

🌀 Euroclydon names a violent northeast windstorm

🗣️ The name blends Greek and Latin roots

📛 Sailors recognized this storm by name

📖 This was a known danger, not vague

## 🧭 The Ship Was Caught, And Could Not Bear Up Into The Wind

Bear up into the wind means steering directly against it.

Ancient ships, built for following winds, could barely fight a storm head on.

Once caught like this, the crew lost real control of their course.

The sea itself, not the sailors, now set the direction.

🧭 Bear up means steering against the wind

⛵ Ancient ships could barely fight headwinds

🌊 The crew lost real control of their course

➡️ The storm, not the sailors, set the path

## 🏳️ We Let Her Drive

With steering no longer possible, the crew makes the only choice left.

They let the storm push the ship wherever it would go.

This was survival strategy, not surrender.

No human skill could have overcome a storm like this.

Everyone aboard was now at the mercy of wind and sea.

🏳️ Letting her drive means giving up steering

🌊 It was survival, not simple surrender

⚠️ Human skill could not overcome this storm

📖 Everyone depended on more than skill

## 🏝️ Running Under A Certain Island Which Is Called Clauda

Clauda was a small island south of Crete.

It briefly blocked the worst of the wind for the crew.

We had much work to come by the boat describes saving a towed lifeboat.

Even a short break in the wind barely gave enough time for one task.

🏝️ Clauda briefly sheltered them from the wind

🚣 The crew struggled to save a towed lifeboat

⏱️ Even calm moments gave barely enough time

➡️ Every small advantage mattered in this storm

## 🪢 They Used Helps, Undergirding The Ship

Undergirding means wrapping heavy cables around the hull from side to side.

This kept the wooden planks from splitting apart under the storm's force.

Ancient sailors used this exact technique when a ship's frame was failing.

This detail shows how violent the storm had already become.

🪢 Undergirding means wrapping cables around the hull

🛠️ This kept the planks from splitting apart

⚠️ Only real danger called for this measure

📖 The ship itself was close to breaking

## 🏖️ Fearing Lest They Should Fall Into The Quicksands

The quicksands likely names the Syrtis, a stretch of sandbanks off North Africa.

Many ancient ships had wrecked there before this one.

Strake sail means lowering the sails to slow the ship down.

One danger was traded to avoid a worse one.

🏖️ The quicksands likely means the Syrtis sandbanks

💀 Many ancient ships had wrecked there before

⛵ Strake sail means lowering sail to slow down

➡️ One danger was traded for a smaller one

# Acts 27:18-20
# 😔 All Hope Was Taken Away
---
## 📦 The Next Day They Lightened The Ship

Lightened the ship means throwing cargo overboard to keep it afloat.

This almost certainly included at least part of the wheat cargo.

Losing valuable cargo on purpose shows how seriously they feared sinking.

📦 Lightened means throwing cargo overboard

🌾 This likely included part of the wheat

💰 They sacrificed profit to avoid sinking

➡️ Survival mattered more than cargo now

## 🧰 The Third Day We Cast Out With Our Own Hands The Tackling Of The Ship

Tackling means the ship's spare gear and equipment.

With our own hands shows everyone aboard was pitching in.

By the third day, they were stripping the ship to the essentials.

🧰 Tackling means spare gear and equipment

🙌 With our own hands means everyone helped

📅 Three days shows the storm had not stopped

📖 They stripped the ship to the essentials

## ☀️ Neither Sun Nor Stars In Many Days Appeared

Ancient sailors navigated by watching the sun and the stars.

Both stayed hidden behind storm clouds for many days straight.

The crew completely lost any way to know their position.

They were not simply frightened, they were genuinely lost at sea.

☀️ Sailors navigated by sun and stars

🌑 Both stayed hidden for many days

🧭 The crew lost all sense of direction

➡️ They were not just scared, they were lost

## 📉 All Hope That We Should Be Saved Was Then Taken Away

This marks the lowest point of the entire voyage.

Every experienced sailor aboard had given up expecting to survive.

Paul's confident words in the next section arrive at the worst moment.

📉 This marks the voyage's lowest point

⚓ Even experienced sailors had given up

⏳ Despair arrives right before Paul speaks

📖 Hope returns exactly when it is needed

# Acts 27:21-26
# 👼 Paul Speaks With Confidence From God
---
## 🍞 After Long Abstinence Paul Stood Forth In The Midst Of Them

Abstinence here means going without regular food during the chaos.

Fear, seasickness, and exhaustion had kept everyone from eating well.

Paul chooses this exhausted moment to stand and speak to everyone.

Standing in the midst of them means he addressed the whole group.

🍞 Abstinence means going without regular food

😣 This was the worst moment to seem strong

🗣️ He addresses the whole group together

➡️ Courage showed up at the hardest time

## 👂 Ye Should Have Hearkened Unto Me

Hearkened is an old word for listened closely.

Paul is not gloating over being right earlier in this chapter.

He is building a reason for his next words to be trusted.

Being proven right once gave his next warning more weight.

👂 Hearkened means listened closely

🙅 Paul is not simply gloating here

⚖️ He is earning trust for what comes next

📖 Being right once can open ears later

## 😊 I Exhort You To Be Of Good Cheer

Exhort means to strongly encourage, more forceful than a suggestion.

Good cheer here does not mean pretending everything is fine.

It means real, grounded confidence based on what Paul explains next.

🗣️ Exhort means strongly encourage someone

😊 Good cheer here means grounded confidence

🙅 This is not empty, forced positivity

➡️ A real reason is coming right after this

## 👼 There Stood By Me This Night The Angel Of God

Angels appear at other key turning points in the book of Acts.

The phrase "whose I am, and whom I serve" names the God speaking.

This vision came during the same long, stormy night everyone endured.

God spoke in the middle of the very storm threatening them.

👼 Angels mark key turning points in Acts

🙏 Paul names exactly whose angel this was

🌙 This came during the same rough night

📖 God spoke in the middle of the storm

## 📜 Thou Must Be Brought Before Caesar

This confirms the appeal Paul made back in chapter twenty five.

That appeal will actually be honored once he reaches Rome.

The storm, however violent, cannot cancel what God already promised.

Paul's survival is tied to a purpose still waiting ahead of him.

📜 This confirms Paul's earlier appeal to Caesar

🌪️ The storm cannot cancel God's promise

🎯 Paul's survival serves a purpose ahead

➡️ What God promises, the storm cannot stop

## 🚢 God Hath Given Thee All Them That Sail With Thee

Everyone on this ship survives because of a promise made to Paul.

Soldiers, sailors, and prisoners alike all benefit from it equally.

None of these other men had done anything to earn this safety.

One person's calling becomes the reason an entire ship survives.

🚢 Everyone aboard benefits from one promise

🙏 This promise was made specifically to Paul

🎁 None of them earned this safety themselves

📖 One calling protected an entire ship

## 🏝️ We Must Be Cast Upon A Certain Island

Paul's vision already includes the exact outcome of this voyage.

A shipwreck ending on an unnamed island is still coming.

The ship itself is still lost, exactly as Paul warned earlier.

Only the lives aboard are promised to be spared, not the vessel.

🏝️ Paul already knows an island is coming

⚓ The ship is still lost, as Paul warned

🙋 Only the lives are promised safety

➡️ The promise was specific, not total rescue

# Acts 27:27-32
# ⚓ Fourteen Nights Adrift
---
## 🌊 The Fourteenth Night Was Come, As We Were Driven Up And Down In Adria

Fourteen full days and nights of storm had now passed since Crete.

Adria here names the open stretch of the central Mediterranean.

This is not the narrower sea called the Adriatic today.

This detail tracks how long everyone aboard had already endured danger.

📅 Fourteen days of storm had already passed

🌊 Adria names the open central Mediterranean

⏳ Endurance defines this whole chapter so far

📖 This length of suffering makes the ending remarkable

## 📏 They Sounded, And Found It Twenty Fathoms

Sounded means dropping a weighted rope to measure the water's depth.

A fathom equals about six feet of water.

Twenty fathoms meant around one hundred and twenty feet deep.

The second measurement, fifteen fathoms, showed the seafloor rising fast.

📏 Sounded means measuring the water's depth

📐 A fathom equals about six feet

⬇️ Fifteen fathoms showed the seafloor rising fast

➡️ Land was dangerously close in the dark

## ⚓ They Cast Four Anchors Out Of The Stern

The stern is the back of the ship, not the usual anchoring spot.

Using four anchors at once shows real desperation to stop drifting.

They feared being pushed further toward the rocks in the dark.

Wished for the day simply means they longed for daylight to see.

⚓ Stern anchoring was an unusual emergency move

🔢 Four anchors showed real desperation

🌅 They longed for daylight to see clearly

➡️ Every choice now aimed at buying time

## 🚣 The Shipmen Were About To Flee Out Of The Ship

These sailors were not trying to rescue anyone with the lifeboat.

They were secretly trying to save themselves and abandon everyone else.

Under colour as though means they faked a legitimate sounding reason.

They claimed to be setting extra anchors from the front of the ship.

🚣 The lifeboat was meant to save them alone

🙅 This was not a rescue attempt for others

🎭 They faked a cover story to hide it

📖 Selfishness hid behind a believable excuse

## 🗣️ Except These Abide In The Ship, Ye Cannot Be Saved

Paul speaks up a second time, now to the soldiers directly.

He insists the crew's sailing skill is still needed later on.

God's earlier promise of safety still required everyone to stay and work.

A promise from God never canceled the need for human effort.

🗣️ Paul warns the soldiers directly this time

⚒️ The crew's skill was still needed later

🤝 God's promise still required human effort

➡️ Faith in a promise still requires action

## 🗡️ The Soldiers Cut Off The Ropes Of The Boat, And Let Her Fall Off

The soldiers respond immediately and decisively to Paul's warning.

They cut the lifeboat loose rather than risking a slow argument.

This forced the sailors to stay aboard and keep working.

Paul's word, backed by trust already earned, changed their next move.

🗡️ Soldiers cut the lifeboat loose at once

🔒 This forced the sailors to stay aboard

🤝 Paul's earned trust changed their action

📖 Earned trust pays off at the right moment

# Acts 27:33-38
# 🍞 Paul Breaks Bread Before Dawn
---
## 🙏 Paul Besought Them All To Take Meat

Besought means begged or urged strongly.

Meat here simply means food in general, not animal flesh specifically.

Paul is not giving a spiritual pep talk at this moment.

He is making a practical, physical appeal for everyone to eat.

🙏 Besought means begged or urged strongly

🍽️ Meat here simply means food in general

🧠 This appeal is practical, not spiritual

➡️ Physical strength mattered for what came next

## 😓 This Day Is The Fourteenth Day That Ye Have Tarried And Continued Fasting

This was not a deliberate religious fast.

Fear, sickness, and constant labor had kept everyone from eating well.

By now, exhaustion itself had become a real danger alongside the storm.

Paul understood that survival now depended on real strength, not just courage.

😓 This was exhaustion, not a chosen fast

⏳ Two full weeks without regular food

⚠️ Exhaustion had become its own danger

📖 Survival now needed real physical strength

## 💇 There Shall Not An Hair Fall From The Head Of Any Of You

This old idiom means complete, total safety, nothing lost at all.

It echoes the same promise the angel gave Paul earlier in this chapter.

Paul restates God's promise in the most absolute terms possible.

He says this right before the most dangerous part still ahead.

💇 This idiom means complete, total safety

🔁 It repeats the angel's earlier promise

🛡️ The promise is stated in absolute terms

➡️ Confidence grows right before the hardest part

## 🙏 He Took Bread, And Gave Thanks To God In Presence Of Them All

Giving thanks before eating was Paul's normal practice as a believer.

He does this openly in front of a boat full of pagan soldiers.

This public gesture mirrors Jesus giving thanks before breaking bread earlier.

Paul is not hiding his faith to fit in with frightened strangers.

🙏 Thanksgiving before eating was Paul's normal habit

✝️ This mirrors Jesus breaking bread earlier

👀 Paul does this openly, not privately

📖 Faith stayed visible even among strangers

## 😊 Then Were They All Of Good Cheer, And They Also Took Some Meat

Paul's calm confidence visibly spreads to everyone watching him eat.

Fear had kept the whole ship from eating for two weeks straight.

One man's steady example finally breaks that pattern for everyone else.

😊 Paul's calm confidence spreads to everyone

🍞 His example finally breaks two weeks of fear

👥 One steady person can shift a whole group

➡️ Courage is often caught, not just taught

## 🔢 Two Hundred Threescore And Sixteen Souls

Threescore is an old way of saying sixty.

The total adds up to two hundred seventy six people aboard.

Large ancient grain ships really did carry crowds this size.

This exact headcount shows Luke's careful, firsthand reporting.

🔢 Threescore is an old word for sixty

👥 The total comes to two hundred seventy six

🚢 Large grain ships carried crowds this size

📖 This precise number shows careful, real reporting

## 🌾 They Lightened The Ship, And Cast Out The Wheat Into The Sea

Now fed and strengthened, the crew dumps the ship's main cargo overboard.

This is the same wheat mentioned earlier near the start of the voyage.

A lighter ship could ride higher in the water near land.

The valuable cargo that first brought this ship into the story is now gone.

🌾 The wheat cargo is dumped overboard now

⚖️ A lighter ship rides higher near land

📦 This was the largest weight removed yet

➡️ The cargo that started the trip is gone

# Acts 27:39-41
# 🪨 The Ship Runs Aground
---
## ❓ When It Was Day, They Knew Not The Land

Even with daylight back, nobody aboard recognizes this coastline at all.

Fourteen days blown off course left them completely lost geographically.

They have no idea they are nearing the island named later in Acts.

☀️ Daylight finally returns after the long storm

❓ Nobody recognizes this unfamiliar coastline

🗺️ They are actually nearing land named later

➡️ Seeing land differs from knowing it

## 🪢 Loosed The Rudder Bands, And Hoised Up The Mainsail

Ancient ships often tied up their rudders to protect them during a storm.

Loosed the rudder bands means the crew restores real steering control.

Hoised up the mainsail means raising sail to catch wind on purpose.

This was a controlled approach toward shore, not a helpless drift.

🪢 Rudder bands had secured steering during the storm

🧭 Loosing them restored real steering control

⛵ Hoising the mainsail caught wind for the push

📖 This was a controlled approach, not a drift

## 🌊 Falling Into A Place Where Two Seas Met

This likely describes a shallow channel where two currents collided.

Spots exactly like this one caused many ancient shipwrecks.

The crew's best effort still ran into one final natural hazard.

🌊 Two seas meeting likely means a shallow channel

⚠️ This kind of spot caused many ancient wrecks

🎯 Good effort still met one final hazard

➡️ Not every danger could be steered around

## 💥 The Forepart Stuck Fast, And The Hinder Part Was Broken With The Violence Of The Waves

The front of the ship wedges firmly into the sand and holds still.

The back half, still exposed to open water, gets torn apart by waves.

This is the shipwreck Paul predicted earlier in this very chapter.

The ship is lost, exactly as warned, but every life is about to be spared.

⚓ Front of the ship wedges into the seabed

💥 The back half breaks apart in the waves

📜 This fulfills Paul's warning from earlier

📖 The ship is lost, exactly as God promised

# Acts 27:42-44
# 🏖️ Every Life Reaches The Shore Safely
---
## 🗡️ The Soldiers' Counsel Was To Kill The Prisoners

Roman law could hold guards personally responsible for an escaped prisoner.

Killing the prisoners now looked like the safest legal option available.

This cold, practical logic shows how close Paul comes to dying.

Surviving the entire storm almost did not save him from this.

⚖️ Roman guards could pay with their own lives

🗡️ Killing prisoners seemed like the safer legal choice

😨 Paul nearly dies right after surviving the storm

📖 Danger was not over once land appeared

## 🛡️ The Centurion, Willing To Save Paul, Kept Them From Their Purpose

Julius personally overrules his own soldiers to protect Paul specifically.

This single decision ends up saving every prisoner on board.

Paul alone is named as the actual reason for the order.

One honest relationship, built over many days at sea, changes everything.

🛡️ Julius overrules his own soldiers for Paul

🤝 One relationship saves every prisoner aboard

👤 Paul alone is named as the reason

➡️ A single bond can protect a whole group

## 🏊 They Which Could Swim Should Cast Themselves First Into The Sea

Julius organizes an orderly rescue instead of a chaotic scramble.

Strong swimmers go first, reaching land ahead of everyone else.

They could likely help pull weaker swimmers in once ashore.

🏊 Strong swimmers were sent to shore first

📋 This created an orderly rescue, not chaos

🤝 Early swimmers could help pull others in

📖 Good leadership often looks quiet and practical

## 🪵 Some On Boards, And Some On Broken Pieces Of The Ship

The very ship that nearly killed everyone now helps save them.

Broken wood from the wreck became makeshift flotation for weaker swimmers.

Nothing about this rescue looked glamorous or heroic in the moment.

🪵 Broken ship pieces became makeshift flotation

😣 This rescue looked desperate, not heroic

🙌 Weaker swimmers still made it to shore

➡️ Survival did not require anything impressive

## 🙌 They Escaped All Safe To Land

Every one of the two hundred seventy six people aboard reaches shore alive.

This matches exactly what the angel promised Paul earlier in the storm.

The ship itself was still completely destroyed, just as Paul warned.

God's promise was never that nothing bad would happen at all.

🙌 All two hundred seventy six people survive

📜 This matches the angel's promise exactly

⚓ The ship itself was still totally lost

📖 God promised survival, not an easy journey
`.trim();

export const ACTS_TWENTY_SEVEN_PERSONAL_SECTIONS = parseActsTwentySevenRawNotes(ACTS_TWENTY_SEVEN_RAW_NOTES);
