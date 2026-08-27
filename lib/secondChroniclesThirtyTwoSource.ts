export type SecondChroniclesThirtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesThirtyTwoRawNotes(rawText: string): SecondChroniclesThirtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesThirtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+32:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Chronicles 32 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+32:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+32:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Chronicles 32 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 32,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 32:${startVerse}` : `2 Chronicles 32:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Second Chronicles 32 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_THIRTY_TWO_RAW_NOTES = `# SecondChronicles 32:1-5
# 🧱 Getting Ready For Siege
---
## After These Things, And The Establishment Thereof

This phrase points back to everything covered in the last three chapters.

Hezekiah had just restored temple worship, organized the priests, and reopened the feasts.

That whole revival is what "the establishment thereof" means here.

Sennacherib's invasion begins right as that high point is reached.

Real obedience never came with a guarantee of an easy season next.

📆 After these things points to the revival

🏛️ Establishment means the worship Hezekiah restored

⚔️ Invasion arrives right at the high point

📖 Obedience never guarantees an easy season next

---

## Sennacherib King Of Assyria Came

Sennacherib ruled the Assyrian Empire, the most feared military power of this era.

Assyrian kings left behind their own written records boasting about this same invasion.

Those records still exist today and confirm this campaign really happened.

Assyria had already destroyed the northern kingdom of Israel a few years earlier.

Judah was now the last kingdom standing in its path.

👑 Sennacherib ruled the Assyrian Empire

📜 Assyrian records confirm this invasion

🏚️ Assyria had already destroyed the north

📖 Judah stood alone in its path

---

## Encamped Against The Fenced Cities

"Fenced cities" means towns built with strong protective walls around them.

Assyria's usual strategy was to capture smaller fortified towns before attacking the capital.

Judah had dozens of these walled towns scattered around Jerusalem.

Taking them first cut off supplies and crushed morale before the real target.

🧱 Fenced cities means walled fortified towns

🎯 Assyria attacked smaller towns first

🏙️ Judah had many walled towns

📖 That strategy isolated Jerusalem before the siege

---

## Thought To Win Them For Himself

Sennacherib assumed these captures would be easy and quick.

Assyrian kings were known for brutal treatment of conquered cities.

Sennacherib's own later records boast about capturing forty six of Judah's cities.

His confidence here sets up how shocking the outcome of this chapter becomes.

😤 Sennacherib expected an easy win

⚔️ Assyria treated conquered cities brutally

🔢 He later claimed forty six captured cities

📖 His confidence makes the ending land harder

---

## Purposed To Fight Against Jerusalem

Hezekiah quickly reads Sennacherib's real intention behind the smaller captures.

The fallen towns were never the actual goal.

Jerusalem, the capital and the site of the temple, was always the target.

Recognizing the true threat early gives Hezekiah time to prepare instead of panic.

🎯 Jerusalem was always the real target

🏛️ The temple city was Assyria's true goal

⏳ Early recognition bought Hezekiah real time

📖 Clear sight kept panic from taking over

---

## Took Counsel With His Princes And His Mighty Men

Hezekiah does not make this decision alone in a palace room.

He gathers his officials and his best military leaders to plan together.

That kind of teamwork was not guaranteed from every king in this book.

Wise leadership listens before it acts.

🗣️ Hezekiah consulted his officials first

🛡️ Mighty men means his top warriors

🤝 Teamwork shaped this whole defense plan

📖 Wise leaders listen before they act

---

## To Stop The Waters Of The Fountains Which Were Without The City

Springs and streams outside Jerusalem's walls supplied fresh water to any army camped nearby.

Cutting them off, or hiding them, denied Sennacherib's army an easy water supply.

Jerusalem's own water needed to keep flowing safely inside the walls instead.

This same engineering project reappears later in the chapter as the Gihon tunnel.

💧 Fountains means springs outside the walls

🚫 Hiding them denied Assyria fresh water

🏙️ Jerusalem kept its own water inside

📖 This sets up the tunnel built later

---

## Why Should The Kings Of Assyria Come, And Find Much Water

This question comes from the people themselves, not just from the king.

It shows ordinary Judeans understood the stakes and joined the defense willingly.

An invading army with no water nearby cannot camp for long.

Denying water was quiet resistance long before any battle began.

👥 The people voiced this question themselves

🙌 Ordinary Judeans joined the defense willingly

🏜️ No water nearby limits any siege

📖 Quiet resistance started before the fighting

---

## Built Up All The Wall That Was Broken

Jerusalem's walls had fallen into disrepair over the years before Hezekiah's reign.

He repaired every broken section and added towers along the top.

A second outer wall went up beyond the first for extra defense.

Physical preparation matched the spiritual reforms already underway in the city.

🧱 Broken sections of wall got rebuilt

🗼 Towers were added along the top

🏗️ A second outer wall added defense

📖 Physical work matched the spiritual reforms

---

## Repaired Millo In The City Of David

"Millo" refers to a filled in terraced structure that supported part of Jerusalem's old fortifications.

It sat in the oldest part of the city, first built up generations earlier under David.

Repairing it reconnected Hezekiah's defense work to the city's original founder.

Old foundations still mattered when new danger arrived.

🏗️ Millo means a filled terrace structure

🏙️ It sat in the old city of David

🔗 Hezekiah's work connected back to David

📖 Old foundations still mattered under new danger

---

## Made Darts And Shields In Abundance

"Darts" here means light spears or javelins meant for throwing.

Shields protected soldiers standing on the newly repaired walls.

Hezekiah did not just build walls, he equipped the men who would defend them.

Preparation covered both the structure and the soldiers standing on it.

🗡️ Darts means light throwing spears

🛡️ Shields protected soldiers on the walls

⚔️ Hezekiah equipped both walls and men

📖 Preparation covered structure and soldiers together

# SecondChronicles 32:6-8
# 💪 Hezekiah Rallies The People
---
## Set Captains Of War Over The People

Hezekiah organizes ordinary citizens into a real defense structure with real leaders.

This was not a random crowd grabbing weapons in a panic.

Clear leadership over the defenders mattered as much as the walls themselves.

Order gave the people confidence going into an uncertain fight.

👥 Ordinary citizens were organized for defense

🎖️ Captains gave the defense real leadership

🧱 Order mattered as much as walls

📖 Structure gave the people confidence

---

## Gathered Them Together In The Street Of The Gate Of The City

The city gate was the busiest public space in any ancient town.

Gathering everyone there let Hezekiah's words reach the widest possible crowd at once.

This was a public speech, not a private briefing for a few officials.

The whole city needed to hear the same message together.

🚪 The gate was the city's busiest space

📣 Gathering there reached the widest crowd

🗣️ This was a public speech, not private

📖 The whole city heard one message

---

## Spake Comfortably To Them

"Comfortably" here does not mean casual small talk.

It means Hezekiah spoke in a way meant to strengthen and reassure frightened people.

A good leader manages both the walls and the fear inside the walls.

Words mattered just as much as weapons on that day.

🗣️ Comfortably means speech meant to reassure

💪 Hezekiah managed both walls and fear

🧠 Leadership means calming fear as much as arming

📖 Words mattered as much as weapons

---

## Be Strong And Courageous, Be Not Afraid Nor Dismayed

Hezekiah uses the same charge Moses once gave Joshua before entering the promised land.

Fear was a real and reasonable response to Assyria's reputation.

Courage in scripture usually means acting rightly despite fear, not the absence of fear.

Hezekiah names the fear directly instead of pretending it away.

🔁 This echoes the charge given to Joshua

😨 Fear was a reasonable response here

💪 Courage means acting despite real fear

📖 Naming fear honestly helps people face it

---

## For There Be More With Us Than With Him

By raw numbers, Assyria's army almost certainly outnumbered Judah's defenders.

Hezekiah is not talking about visible soldiers when he says "more."

He is pointing to an unseen reality that outweighs any army on earth.

The next verse names exactly who that unseen help actually is.

🔢 Assyria likely had more visible soldiers

👁️ More here points to unseen help

⚖️ Unseen help outweighs any army

📖 The next verse names that help

---

## With Him Is An Arm Of Flesh

"An arm of flesh" is an old idiom for merely human strength.

Sennacherib's army, no matter how large, is still only human power.

Human power always has real limits, no matter how frightening it looks.

Hezekiah names that limit out loud in front of the whole city.

💪 Arm of flesh means human strength alone

👤 Even a huge army is still human

⏳ Human power always runs into limits

📖 Hezekiah names that limit publicly

---

## But With Us Is The Lord Our God

Hezekiah draws the clearest possible contrast in one sentence.

Assyria brings human muscle, Judah brings the living God.

This is not a claim of Judah's own strength or cleverness.

Every ounce of confidence in this speech rests on who is fighting for them.

⚖️ Human muscle stands against the living God

🙏 The confidence is not Judah's own

🛡️ God himself fights their battles

📖 That claim anchors the whole speech

---

## The People Rested Themselves Upon The Words Of Hezekiah

"Rested themselves" means the people's fear genuinely settled down after hearing this.

A king's words either spread panic or steady a crowd, there is no neutral option.

Hezekiah's speech did what good leadership is supposed to do in a crisis.

Calm did not come from denying the danger, it came from trusting God inside it.

😌 Rested means the people's fear settled

🗣️ A leader's words shape a crowd's fear

👑 Hezekiah's speech steadied the whole city

📖 Trust in God produced real calm

# SecondChronicles 32:9-15
# 🗣️ Sennacherib's Threat
---
## He Himself Laid Siege Against Lachish

Lachish was one of Judah's most important fortified cities outside Jerusalem.

Sennacherib personally led the siege there while sending messengers elsewhere.

Assyrian palace carvings discovered by archaeologists show this exact siege in vivid detail.

Those carvings confirm the Bible's account of this campaign from the enemy's own side.

🏰 Lachish was a major fortified city

👑 Sennacherib led that siege personally

🖼️ Assyrian carvings still show this siege

📖 Outside records confirm the Bible's account

---

## Sent His Servants To Jerusalem

Sennacherib uses psychological pressure while his main army is busy elsewhere.

Messengers were sent to speak directly to the people, not just the king.

This was propaganda aimed at breaking morale from the inside.

A siege could be won with words before a single arrow was shot.

📨 Messengers were sent while he was busy

🎯 The message targeted the people directly

😰 This was propaganda aimed at morale

📖 Words could break a city before arrows did

---

## Whereon Do Ye Trust

Sennacherib opens with a direct challenge to Judah's confidence.

He wants the people to doubt whatever they are leaning on for hope.

The question sounds reasonable, but the trust he is mocking is trust in God himself.

Doubt is often planted with a simple question, not a direct attack.

❓ Sennacherib challenges Judah's confidence directly

😈 He wants doubt planted in their minds

🙏 The trust he mocks is trust in God

📖 A question can plant doubt fast

---

## Doth Not Hezekiah Persuade You To Give Over Yourselves To Die By Famine And By Thirst

Sennacherib twists Hezekiah's leadership into a death sentence for his own people.

He claims trusting the LORD will only get everyone starved out behind the walls.

This is fear dressed up as concern for the people's safety.

The real goal is to turn the people against their own king.

😨 Sennacherib twists trust into a death sentence

🎭 Fear is dressed up as concern

👑 The real goal is turning people against Hezekiah

📖 Enemies often disguise fear as care

---

## Taken Away His High Places And His Altars

Sennacherib is describing Hezekiah's own religious reforms from earlier chapters.

"High places" were hilltop worship sites the reforms had torn down.

Sennacherib twists that faithfulness into a reason God should be angry at Judah, not pleased.

He is using true facts to build a false conclusion.

🏔️ High places means hilltop worship sites

🔨 These were the sites Hezekiah tore down

🔄 Sennacherib twists faithfulness into a weakness

📖 True facts can build a false conclusion

---

## Ye Shall Worship Before One Altar, And Burn Incense Upon It

Hezekiah's reform centralized worship at the one temple altar in Jerusalem.

Sennacherib frames that obedience as if it insulted the very God it honored.

He assumes every nation's god works the same transactional way his own gods do.

That assumption is about to prove completely wrong.

🏛️ One altar meant worship centered at the temple

😤 Sennacherib frames obedience as an insult

🗿 He assumes all gods work the same way

📖 That assumption is about to fail

---

## What I And My Fathers Have Done Unto All The People Of Other Lands

Sennacherib lists his own family's long track record of conquering nations.

He treats every previous victory as proof his gods are simply stronger than any others.

This kind of pagan thinking ranked gods by whose army won the last war.

The LORD does not fit inside that kind of scoreboard.

📜 Sennacherib lists his family's conquests

🏆 He ranks gods by military victories

⚔️ Pagan thinking judged gods by wins

📖 The true God does not fit that scoreboard

---

## Were The Gods Of The Nations Of Those Lands Any Ways Able To Deliver Their Lands

Sennacherib names a real pattern, the false gods of conquered nations never actually saved anyone.

Every one of those idols was carved by human hands and could not act on its own.

He is right about every one of those gods.

He is about to be proven completely wrong about this one.

🗿 False gods never actually saved anyone

🔨 Idols were only carved by human hands

✅ Sennacherib is right about every other god

📖 He is about to be proven wrong here

---

## That My Fathers Utterly Destroyed

Sennacherib is not exaggerating his family's military history here.

Assyria really had conquered and destroyed dozens of smaller kingdoms over generations.

That real history is exactly why his threat sounded so believable.

A true track record can still lead to a false conclusion.

📜 Assyria's conquests were historically real

⚔️ Generations of kingdoms had already fallen

😨 That history made the threat believable

📖 A true record still led to error

---

## How Much Less Shall Your God Deliver You Out Of Mine Hand

Sennacherib closes his speech with his strongest and most confident line.

He treats the LORD as just another regional god destined to lose like all the rest.

That single sentence is the exact claim the rest of the chapter answers.

Confidence is not the same thing as being right.

😤 Sennacherib closes with total confidence

🗿 He treats the LORD as just another god

⚔️ This claim is what the chapter answers

📖 Confidence is not the same as truth

---

## Let Not Hezekiah Deceive You, Nor Persuade You On This Manner

Sennacherib directly attacks Hezekiah's credibility as a leader.

He wants the people to see their own king as a liar, not a protector.

Dividing a people from their leader was a standard part of siege warfare.

United trust in both God and the king mattered for surviving what was coming.

🎯 Sennacherib attacks Hezekiah's credibility directly

💔 He wants the king seen as a liar

⚔️ Division was a real siege tactic

📖 United trust helped Judah survive this

# SecondChronicles 32:16-19
# 😤 Mocking The Living God
---
## Spake Yet More Against The Lord God

The messengers do not stop at attacking Hezekiah's leadership.

They escalate their words directly against the LORD himself.

This step matters because it moves the conflict from political to spiritual.

Sennacherib is no longer just fighting a king, he is defying God.

📢 The attack escalates past Hezekiah

⚔️ It now targets the LORD directly

🔺 The conflict shifts from political to spiritual

📖 Sennacherib is now defying God himself

---

## He Wrote Also Letters To Rail On The Lord God Of Israel

"Rail on" is an old way of saying to mock or insult harshly.

Putting the insult in writing made it permanent and repeatable.

These letters could be read aloud again and again to spread fear.

Sennacherib wanted his blasphemy to travel beyond just one shouted speech.

✍️ Rail on means to mock harshly

📜 Writing it down made it permanent

📢 Letters could be read again and again

📖 The blasphemy was built to spread

---

## As The Gods Of The Nations Have Not Delivered Their People

Sennacherib repeats his same argument from the spoken speech, now in writing.

He is building his case on a real pattern he had seen play out before.

Every idol he had faced in battle had failed to save its worshippers.

He assumes the LORD will follow that exact same failed pattern.

🔁 The written letter repeats the same argument

🗿 Every past idol had failed him

📊 He builds his case on that pattern

📖 He assumes the LORD fits that pattern too

---

## Cried With A Loud Voice In The Jews' Speech

"The Jews' speech" means Hebrew, the everyday language spoken inside Jerusalem's walls.

Assyrian officials chose to shout in Hebrew instead of their own language on purpose.

That choice made sure every person on the wall understood every insult clearly.

This was deliberate psychological warfare aimed at the ordinary people, not just the king.

🗣️ Jews' speech means the Hebrew language

🎯 They shouted in Hebrew on purpose

👂 Every person on the wall understood

📖 This targeted ordinary people directly

---

## To Affright Them, And To Trouble Them

"Affright" is an old word that simply means to terrify.

The goal was never really to negotiate or offer real terms.

Fear itself was the weapon, aimed straight at breaking the people's will to resist.

A city that surrenders out of terror needs no battle at all.

😱 Affright means to terrify someone

🎯 Fear itself was the real weapon

🏳️ The goal was breaking their will

📖 A terrified city might surrender without a fight

---

## That They Might Take The City

Every word from Sennacherib's messengers points toward this one final goal.

Threats, mockery, and blasphemy were all just tools aimed at capturing Jerusalem.

Nothing said on that wall was really about theology for its own sake.

It was strategy dressed up as religious argument.

🎯 Every word aimed at this one goal

🛠️ Threats and mockery were just tools

🏙️ Capturing Jerusalem was the real target

📖 Strategy hid behind religious sounding words

---

## The Gods Of The People Of The Earth, Which Were The Work Of The Hands Of Man

This phrase states plainly what an idol actually is, an object made by human hands.

Sennacherib compares the LORD to statues that people carved out of wood or stone.

He genuinely could not imagine a God who was not made by human hands.

That blindness is the whole reason his confidence is about to collapse.

🔨 Idols were objects made by human hands

🗿 Sennacherib compares the LORD to statues

👁️ He could not imagine an uncreated God

📖 That blindness is about to be exposed

# SecondChronicles 32:20-23
# 👼 God Answers
---
## Hezekiah The King, And The Prophet Isaiah The Son Of Amoz, Prayed

King and prophet respond to the crisis together instead of separately.

Isaiah, son of Amoz, is the same prophet behind the entire book of Isaiah.

This chapter has a fuller parallel account written out in Isaiah thirty six and thirty seven.

Two different kinds of leadership, royal and prophetic, turn to the same place for help.

🤝 King and prophet responded together

📚 Isaiah thirty six and thirty seven retell this

🙏 Both leaders turned to the same source

📖 Isaiah wrote the book bearing his name

---

## Prayed And Cried To Heaven

This was not a quiet, formal prayer said once and forgotten.

"Cried" carries the sense of desperate, urgent pleading, not calm ritual words.

Sennacherib's mockery is answered with prayer instead of a counter speech.

The people's real weapon this whole chapter was never the walls, it was prayer.

📢 Cried means urgent desperate pleading

🙏 Mockery was answered with prayer

🧱 Walls were never the real weapon here

📖 Prayer was the true defense of Jerusalem

---

## The Lord Sent An Angel, Which Cut Off All The Mighty Men Of Valour

"Valour" is an old spelling of valor, meaning courage and skill in battle.

These were Assyria's elite, most experienced soldiers, not raw recruits.

Second Kings records the number struck down that night as one hundred eighty five thousand men.

One angel accomplished in a single night what Judah's whole army could never have done.

🎖️ These were Assyria's elite soldiers

🔢 Second Kings records the staggering number

👼 One angel struck the entire camp

📖 No human army could have done this

---

## He Returned With Shame Of Face To His Own Land

Sennacherib's confident boasting from earlier in the chapter collapses into retreat.

"Shame of face" describes public humiliation, the exact opposite of the victory he expected.

The king who mocked the LORD in writing goes home defeated instead of celebrated.

Every word from his letters now stands answered.

😳 Shame of face means public humiliation

🔄 His confident boasting collapsed completely

🏃 He retreated instead of conquering

📖 His own letters now stood answered

---

## They That Came Forth Of His Own Bowels Slew Him There With The Sword

"Came forth of his own bowels" is old language for his own children.

Sennacherib is assassinated by his own sons after returning home to worship his god.

Assyrian historical records confirm Sennacherib really was murdered by members of his own family.

The god he trusted could not even protect him inside his own temple.

👨‍👦 Bowels here means his own sons

🗡️ His own sons killed him

📜 Outside records confirm this assassination

📖 His god could not protect him

---

## The Lord Saved Hezekiah And The Inhabitants Of Jerusalem

The chapter states plainly who actually gets credit for this deliverance.

Not the walls, not the water plan, not the darts and shields alone.

Every practical preparation still mattered, but it was the LORD who saved the city.

Human effort and God's power worked together, without either one canceling the other out.

🙌 The LORD gets the credit here

🧱 Walls and weapons were not the cause

🤝 Human effort and God's power worked together

📖 Preparation and faith were not opposites

---

## Guided Them On Every Side

This phrase reaches beyond just this one battle with Assyria.

It describes a pattern of ongoing protection surrounding Hezekiah's entire reign.

"Every side" suggests total protection, not just a narrow escape from one threat.

Deliverance here was not a lucky break, it was consistent care.

🧭 This points beyond just one battle

🛡️ Every side suggests total protection

🎯 Not a lucky break, but consistent care

📖 God's guidance covered Hezekiah's whole reign

---

## Many Brought Gifts Unto The Lord To Jerusalem, And Presents To Hezekiah

Word of this deliverance spread to surrounding nations after it happened.

People sent gifts to honor both God and the king who trusted him.

This news of Judah's God spreading outward will matter again in the next section.

Hezekiah's reputation grew even beyond Judah's own borders.

🎁 Nations sent gifts after the deliverance

🌍 News of this spread beyond Judah

👑 Hezekiah's reputation grew internationally

📖 This international attention returns again soon

---

## Magnified In The Sight Of All Nations From Thenceforth

Hezekiah's international standing rises sharply right after this victory.

"Thenceforth" means from that point onward, a lasting change, not a brief moment of fame.

This same fame is exactly what invites the Babylonian envoys later in the chapter.

Success brings its own kind of testing that failure never would have.

📈 Hezekiah's international standing rose sharply

⏳ Thenceforth means from that point onward

✉️ This fame invites the Babylonian visit later

📖 Success brings its own kind of test

# SecondChronicles 32:24-26
# 🙏 Sickness, Pride, And Humility
---
## Hezekiah Was Sick To The Death

This means Hezekiah's illness was genuinely life threatening, not a minor sickness.

Second Kings and Isaiah both tell this same story with more detail.

Isaiah initially tells Hezekiah to prepare for death, then returns with a different message.

This near death moment happens close in time to the Assyrian crisis just described.

⚰️ Sick to death means life threatening illness

📚 Second Kings and Isaiah retell this fully

🔄 Isaiah's message to him changes

📖 This crisis follows close after Assyria's threat

---

## He Gave Him A Sign

The fuller story in Isaiah thirty eight describes this sign as a shadow moving backward on a stairway.

God does not just heal Hezekiah quietly, he offers visible proof to go with the healing.

Fifteen more years were added to Hezekiah's life after this moment.

That extra time matters for what happens later in this very chapter.

☀️ The sign involved a shadow moving backward

📚 Isaiah thirty eight tells the full story

⏳ Fifteen years were added to his life

📖 That extra time shapes what follows

---

## Hezekiah Rendered Not Again According To The Benefit Done Unto Him

This means Hezekiah failed to respond to God's kindness with proper gratitude.

He had just been miraculously healed and given extra years of life.

Instead of humility, something else grew in his heart during that recovery.

Blessing tested Hezekiah in a way that the Assyrian siege never had.

🙏 Rendered not again means no real gratitude

💊 He had just been miraculously healed

📈 Something other than humility grew instead

📖 Blessing tested him more than the siege did

---

## His Heart Was Lifted Up

This is an old idiom for pride, thinking too highly of oneself.

Second Kings and Isaiah both connect this pride to the Babylonian envoys shown proudly around the palace.

Success after the Assyrian deliverance seems to have gone to Hezekiah's head.

The very next section of this chapter shows exactly how that pride played out.

💔 Heart lifted up means pride

👑 Success seemed to affect Hezekiah's humility

🏛️ The Babylon visit connects to this pride

📖 The next verses show how it played out

---

## Therefore There Was Wrath Upon Him, And Upon Judah And Jerusalem

Pride in a king was never treated as a private, personal failing in scripture.

A leader's sin here brings consequence onto the whole nation, not just the man himself.

Leadership carries a weight that spreads beyond the leader's own life.

This is a pattern repeated with several kings across the books of Chronicles.

⚖️ A king's sin affected the whole nation

👑 Leadership carries weight beyond one person

🔁 This pattern repeats across Chronicles

📖 Personal pride became a national problem

---

## Hezekiah Humbled Himself For The Pride Of His Heart

Unlike some other kings in this book, Hezekiah actually changes course here.

Humbling himself means admitting the pride honestly instead of defending it.

The people of Jerusalem join him in that same humility, not just the king alone.

This response is exactly what separates Hezekiah from kings who never turned back.

🔄 Hezekiah actually changed course here

🙏 Humbling means honestly admitting the pride

👥 The people joined him in humility

📖 This response set him apart from other kings

---

## So That The Wrath Of The Lord Came Not Upon Them In The Days Of Hezekiah

Genuine repentance changes the outcome that pride had set in motion.

The judgment does not vanish completely, it simply gets delayed beyond Hezekiah's own lifetime.

Second Kings reveals that judgment eventually arrives under a much later king.

Repentance can postpone consequence even when it cannot erase it entirely.

🔄 Repentance changed the outcome here

⏳ Judgment was delayed, not erased

📚 Second Kings shows it arriving later

📖 Repentance can postpone real consequence

# SecondChronicles 32:27-30
# 💰 Hezekiah's Wealth And Building Projects
---
## Hezekiah Had Exceeding Much Riches And Honour

This wealth arrives after both the military victory and the healing already described.

Riches on their own are never treated as sinful anywhere in this account.

The earlier warning was about pride, not about wealth itself.

Blessing and humility can exist together when pride does not take over.

💰 This wealth follows the earlier victories

🙏 Wealth itself is never called sinful

💔 Pride, not riches, was the earlier danger

📖 Blessing and humility can coexist

---

## Treasuries For Silver, And For Gold, And For Precious Stones, And For Spices

A "treasury" in this context means a secure storage building for valuable goods.

Spices were extremely valuable in the ancient world, imported along long distance trade routes.

This same royal spice storage likely explains what Hezekiah later shows off to Babylon's envoys.

Real wealth here connects directly to the pride problem named earlier.

🏛️ Treasury means secure storage for valuables

🌿 Spices were rare and highly valuable

🐫 They traveled long distance trade routes

📖 This wealth links to the coming pride test

---

## Storehouses Also For The Increase Of Corn, And Wine, And Oil

Beyond luxury goods, Hezekiah also built practical storage for basic food supplies.

Corn, wine, and oil were the three staple products of Judah's own farmland.

Stockpiled food mattered enormously for a kingdom that had just survived a siege threat.

Wise preparation extended past the war itself into ordinary daily life.

🌾 Storehouses held basic food supplies

🍇 Corn, wine, and oil were staples

🛡️ Stockpiles mattered after a siege threat

📖 Wisdom extended into everyday preparation

---

## Stalls For All Manner Of Beasts, And Cotes For Flocks

"Cotes" is an old word for small shelters or pens built for sheep.

This shows organized, large scale livestock management across the kingdom.

An economy this developed reflects real, sustained peace and stability under Hezekiah.

None of this could have been built during years of constant war.

🐑 Cotes means shelters built for sheep

🐄 Livestock was managed on a large scale

🕊️ This reflects real peace and stability

📖 Building like this required years without war

---

## He Provided Him Cities, And Possessions Of Flocks And Herds In Abundance

Hezekiah expands his kingdom's resources well beyond just Jerusalem itself.

New cities and abundant livestock both point to genuine, widespread national prosperity.

The text credits none of this growth to clever politics or trade deals.

"God had given him substance very much" names the true source directly.

🏙️ Growth reached beyond Jerusalem itself

🐑 Cities and livestock both grew

🙌 God is named as the true source

📖 Not politics but God's gift explains it

---

## Stopped The Upper Watercourse Of Gihon, And Brought It Straight Down To The West Side Of The City Of David

The Gihon spring was Jerusalem's main natural water source, located outside the original walls.

Hezekiah's engineers carved a tunnel through solid rock to bring that water safely inside the city.

This is the same defensive water project first planned back in verses three and four.

Archaeologists have actually walked through this exact tunnel, still standing beneath Jerusalem today.

💧 Gihon was Jerusalem's main water source

⛏️ A tunnel carved through solid rock

🔗 This completes the plan from verse four

📖 The tunnel still stands beneath Jerusalem

---

## Hezekiah Prospered In All His Works

This summary line closes out the list of Hezekiah's building projects and wealth.

Prosperity here covers military, physical, agricultural, and engineering success across his whole reign.

The chapter has not forgotten the pride warning from just a few verses earlier.

Success and a humbled heart were able to stand together by the end of his story.

📈 This summarizes his whole reign's success

🏗️ Prosperity covered building, farming, and engineering

💔 The earlier pride warning is not forgotten

📖 Success and humility stood together here

# SecondChronicles 32:31-33
# 👋 The Death Of Hezekiah
---
## The Ambassadors Of The Princes Of Babylon

Babylon was not yet the great empire it would later become in Israel's story.

These envoys came from a smaller, rising power seeking allies against Assyria.

Second Kings and Isaiah both name their sender as Merodachbaladan, a Babylonian ruler.

This same Babylon would return generations later as the kingdom that finally conquers Judah.

✉️ Envoys came from a rising Babylon

🤝 They sought allies against common enemy Assyria

👑 Their sender is named in Kings and Isaiah

📖 This same Babylon later conquers Judah

---

## Who Sent Unto Him To Enquire Of The Wonder That Was Done In The Land

Word of Hezekiah's healing and the shadow's backward sign had genuinely traveled far.

"The wonder" refers directly back to the miraculous sign given earlier in the chapter.

Babylon's interest sounds like genuine curiosity about a real reported miracle.

What the visit reveals is not about their intentions, but about Hezekiah's own heart.

🌍 News of the miracle traveled far

☀️ The wonder means the earlier backward sign

🤔 Babylon's interest looks like real curiosity

📖 The visit tests Hezekiah not them

---

## God Left Him, To Try Him

This does not mean God abandoned Hezekiah out of anger or rejection.

"Left him" here means God stepped back to let Hezekiah respond on his own.

Second Kings shows what that response actually looked like, showing off every treasury to the envoys.

The test was never really about Babylon, it revealed what pride still remained in Hezekiah's heart.

🙏 Left him means God stepped back briefly

🧪 The point was testing, not punishment

🏛️ Second Kings shows him showing off treasures

📖 The test revealed lingering pride

---

## That He Might Know All That Was In His Heart

God already knew exactly what was in Hezekiah's heart before this test happened.

The test existed for Hezekiah's own benefit, to reveal it to himself.

Sometimes a real test is not about giving God new information at all.

It is about showing a person the truth about themselves that they could not see alone.

👁️ God already knew Hezekiah's heart fully

🪞 The test revealed it to Hezekiah himself

🎯 Tests can serve the person, not God

📖 Self knowledge sometimes needs a real test

---

## Written In The Vision Of Isaiah The Prophet, The Son Of Amoz

This confirms Isaiah as the primary historical source behind Hezekiah's whole story.

Isaiah was both a prophet delivering God's word and something like a court record keeper here.

"Vision" describes the kind of prophetic writing Isaiah's entire book is built from.

Multiple books of the Bible point back to this same shared historical record.

👤 Isaiah served as prophet and record keeper

👁️ Vision describes prophetic style writing

📚 Several biblical books share this record

📖 Isaiah is the primary source for this story

---

## Hezekiah Slept With His Fathers

This is the standard biblical idiom for a peaceful, natural death.

It carries none of the shame attached to some other kings' deaths in this book.

Hezekiah's story closes with dignity after everything recorded across these four chapters.

Death here reads as rest, not as judgment.

😴 Slept with his fathers means he died peacefully

✅ No shame is attached to this death

👑 His story closes with real dignity

📖 Death here reads as rest not judgment

---

## Buried Him In The Chiefest Of The Sepulchres Of The Sons Of David

"Chiefest" means the most honored, highest ranking location available.

Not every king in this book earns burial among David's own descendants with full honor.

Some earlier kings were denied that same honor because of how they had lived.

Hezekiah's burial location becomes the final, physical verdict on his reign.

👑 Chiefest means the most honored spot

🏛️ Not every king earned this honor

📉 Some kings were denied it for their conduct

📖 Burial location became the final verdict

---

## All Judah And The Inhabitants Of Jerusalem Did Him Honour At His Death

This public mourning reflects genuine, widespread affection for Hezekiah's leadership.

The whole nation participates, not just the royal family or the priests alone.

That kind of unified grief was not guaranteed for every king who had ruled Judah.

It confirms how the people themselves judged his reign as it ended.

😢 Public mourning showed genuine affection

👥 The whole nation participated, not just royals

⚖️ Unified grief was not guaranteed for every king

📖 The people's own judgment confirmed his reign

---

## Manasseh His Son Reigned In His Stead

The chapter ends by naming the next king before moving on.

Manasseh will become one of the most notorious, idol worshipping kings in Judah's entire history.

That contrast sets up a jarring turn immediately following this story of faithfulness.

A faithful father does not guarantee a faithful son inherits the throne.

👑 Manasseh becomes the next king

😈 He becomes one of Judah's worst kings

🔄 A jarring contrast follows immediately

📖 A faithful father is no guarantee
`.trim();

export const SECOND_CHRONICLES_THIRTY_TWO_PERSONAL_SECTIONS = parseSecondChroniclesThirtyTwoRawNotes(
  SECOND_CHRONICLES_THIRTY_TWO_RAW_NOTES,
);
