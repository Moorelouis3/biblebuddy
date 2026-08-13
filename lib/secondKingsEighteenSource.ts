export type SecondKingsEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsEighteenRawNotes(rawText: string): SecondKingsEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsEighteen\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsEighteen\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsEighteen\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 18:${startVerse}` : `2 Kings 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 2 Kings 18 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_EIGHTEEN_RAW_NOTES = `# SecondKingsEighteen 18:1-4
# 👑 Hezekiah Begins His Reign
---
## 📅 In The Third Year Of Hoshea Son Of Elah

Kings in Israel and Judah are dated by each other's reigns.

Hoshea was already ruling the northern kingdom when Hezekiah began.

Chapter seventeen already showed how troubled that northern reign really was.

This shared dating habit keeps both thrones lined up on one timeline.

📅 Dated by the other kingdom's king

🇮🇱 Hoshea already rules the north

👑 Hezekiah now begins in Judah

📖 Both thrones share one timeline

## 🎂 Twenty And Five Years Old Was He

Hezekiah becomes king at twenty five years old.

He will reign twenty nine years total in Jerusalem.

That length puts his rule among the longer reigns in Judah's history.

His mother is named Abi, the daughter of Zachariah.

🎂 Hezekiah begins at twenty five

🕰️ His reign lasts twenty nine years

👑 A long reign by Judah's standard

📖 Abi his mother is named here

## 👴 According To All That David His Father Did

This does not mean David was Hezekiah's literal father.

Many generations separate David from Hezekiah on the family tree.

Father here means ancestor, a common way to describe a royal line.

The comparison sets David's faithfulness as the standard Hezekiah is measured against.

👴 Father here means ancestor

📏 David sets the standard

👑 Many generations separate the two

📖 Hezekiah is measured against David

## ⛰️ He Removed The High Places

High places were raised open air sites used for worship and sacrifice.

Some had been used for the LORD, others for foreign gods.

Even faithful kings often let them stand because tearing them down was unpopular.

Hezekiah becomes one of the few kings willing to remove them completely.

⛰️ High places were open air worship sites

🙏 Some had honored the LORD wrongly

😬 Removing them was politically unpopular

📖 Hezekiah removes them anyway

## 🌳 Brake The Images, And Cut Down The Groves

Images here means carved idols representing foreign gods.

Groves refers to wooden poles connected to the goddess Asherah worship.

Both were common fixtures at unauthorized worship sites across Judah.

Hezekiah tears down what generations of kings had tolerated.

🌳 Images means carved idols

🪵 Groves means Asherah worship poles

📆 Generations had tolerated both

➡️ Hezekiah reverses generations of compromise

## 🐍 Brake In Pieces The Brasen Serpent

This bronze serpent goes back to Moses in the wilderness.

In Numbers twenty one, God had Moses make it so bitten Israelites could look and live.

By Hezekiah's time, the people had turned that same object into an idol.

A tool God once used for healing had become something people worshipped instead.

🐍 The serpent traces back to Moses

🩹 It once brought healing, not worship

🙇 The people had turned it into an idol

📖 A gift from God became a rival

## 🏷️ He Called It Nehushtan

Many scholars believe the name Nehushtan plays on the Hebrew words for bronze and serpent.

Hezekiah is not honoring the object with a title.

He is mocking it, calling it little more than a piece of metal.

Renaming it strips away centuries of false reverence in a single sentence.

🏷️ Nehushtan plays on bronze and serpent

😏 The name mocks, not honors

🪙 It becomes just a piece of metal

📖 One sentence strips away false reverence

# SecondKingsEighteen 18:5-8
# 🛡️ He Trusted In The LORD
---
## 🙏 He Trusted In The LORD God Of Israel

Trust here means Hezekiah's whole security rested on God, not on alliances or armies.

The writer of Kings measures every king by this one standard.

Hezekiah is one of the rare kings who actually passes it.

🙏 Trust means his security rested on God

⚖️ This is the standard for every king

🏆 Hezekiah is a rare king who passes

📖 Real trust shapes how a king rules

## 🥇 None Like Him Among All The Kings Of Judah

This is the highest praise the book of Kings ever gives a ruler.

Later, Josiah will receive very similar praise in chapter twenty three.

Both stand out because most kings before and after them compromised badly.

🥇 The highest praise Kings ever gives

🔁 Josiah later gets similar praise

📉 Most other kings compromised badly

📖 Hezekiah stands out sharply from the pattern

## 🤝 He Clave To The LORD

Clave is an old word meaning to cling tightly and hold fast.

The picture is of someone gripping onto something and refusing to let go.

Hezekiah's loyalty was not occasional, it was constant.

🤝 Clave means to cling tightly

✊ The picture is a firm grip

🔁 His loyalty was constant, not occasional

📖 Real faith refuses to let go

## 🚫 He Rebelled Against The King Of Assyria

Judah had been paying tribute money to Assyria to avoid attack.

Hezekiah stops those payments, a direct act of political rebellion.

This decision will trigger the Assyrian invasion described later in this chapter.

🚫 Judah stops paying Assyrian tribute

💰 Tribute money had bought peace before

⚔️ This decision invites invasion

📖 Trusting God came with real risk

## ⚔️ He Smote The Philistines, Even Unto Gaza

Gaza sat at the southern edge of Philistine territory near Egypt.

Hezekiah's military campaign reaches the farthest Philistine city.

This shows real strength, not just religious reform, backing his rule.

⚔️ Hezekiah campaigns against the Philistines

🗺️ Gaza marks their southern edge

💪 Real military strength backs his reign

📖 Faith and strength are not opposites here

## 🏰 From The Tower Of The Watchmen To The Fenced City

This phrase pairs a small lookout post with a large walled city.

Together they describe every size of settlement, from smallest to largest.

The point is total coverage, not two specific named places.

🏰 A tower and a city are named together

📏 Together they describe every size of place

🗺️ The point is total coverage

📖 Nothing in Philistine territory was untouched

# SecondKingsEighteen 18:9-12
# 🏹 Samaria Falls To Assyria
---
## 🗓️ In The Fourth Year Of King Hezekiah

The writer dates this event two different ways at once.

It happened in Hezekiah's fourth year and Hoshea's seventh year.

This double dating recaps the fall of Samaria first told in chapter seventeen.

🗓️ Dated by both kings at once

🔁 Hezekiah's fourth year, Hoshea's seventh

📚 This recaps chapter seventeen's ending

📖 Judah's history now runs beside Israel's fall

## 🏇 Shalmaneser King Of Assyria Came Up Against Samaria

Shalmaneser was the Assyrian king who besieged Israel's capital city.

Samaria sat on a defensible hill, built to withstand exactly this kind of siege.

Even a strong location could not save a kingdom that had turned from God.

🏇 Shalmaneser leads the siege

🏙️ Samaria was Israel's capital

⛰️ Its hill made it defensible

📖 A strong location was not enough

## ⏳ At The End Of Three Years They Took It

Sieges in the ancient world could stretch on for years, not weeks.

Assyria surrounds the city and simply waits it out.

Three years shows how determined Assyria was to finish the conquest.

⏳ Sieges could last for years

🏙️ Assyria surrounds and waits

💪 Three years shows real determination

📖 Patience, not speed, wins many ancient wars

## 🚶 Carry Away Israel Unto Assyria

Assyria's standard policy was deporting conquered peoples far from their homeland.

Removing people from familiar land made future rebellion far less likely.

This deportation permanently scatters the northern kingdom's population.

🚶 Deportation was standard Assyrian policy

🏠 It broke people from their homeland

🛑 The goal was preventing rebellion

📖 The northern kingdom's people are scattered for good

## 🌊 Halah And In Habor By The River Of Gozan

These are real places in the region of upper Mesopotamia.

Assyria resettles the exiled Israelites hundreds of miles from home.

The distance itself was part of the punishment.

🌊 Real Mesopotamian locations

🗺️ Hundreds of miles from home

😔 Distance was part of the punishment

📖 Exile scattered a whole people

## 🗺️ The Cities Of The Medes

The Medes lived further east, in what is now Iran.

Assyria spreads Israel's exiles across an even wider area than Halah or Gozan.

This wide scattering is part of why the ten tribes become so hard to trace afterward.

🗺️ The Medes lived farther east

📏 Exiles are spread even wider

❓ This scattering makes them hard to trace

📖 A whole people's story fades into exile

## 📜 Because They Obeyed Not The Voice Of The LORD

The writer gives one clear reason for Israel's collapse.

It was not military weakness, it was covenant disobedience.

Chapter seventeen already spent an entire chapter detailing exactly how.

📜 One clear reason is given

⚔️ It was not military weakness

📖 Chapter seventeen already explained the pattern

➡️ Disobedience, not armies, decided Israel's fate

# SecondKingsEighteen 18:13-16
# 💰 Sennacherib's Invasion
---
## 🗡️ In The Fourteenth Year Of King Hezekiah

Sennacherib was a later Assyrian king known for invading Judah.

His own royal records outside the Bible describe this same invasion.

Two separate ancient sources confirm the same historical event.

🗡️ Sennacherib invades in Hezekiah's fourteenth year

📜 Assyrian records confirm this invasion

🤝 Two ancient sources agree here

📖 This event is well documented history

## 🏯 Against All The Fenced Cities Of Judah, And Took Them

Fenced means walled and fortified for defense.

Sennacherib does not go straight for Jerusalem first.

He captures Judah's smaller walled cities one by one, tightening the pressure.

🏯 Fenced means walled and fortified

🎯 Jerusalem is not the first target

🔗 Smaller cities fall one by one

📖 Pressure builds before the final threat

## 🙇 I Have Offended, Return From Me

Hezekiah sends a message admitting his earlier rebellion.

Offended here means he acknowledges breaking the agreement with Assyria.

This is Hezekiah trying diplomacy before the situation gets any worse.

🙇 Hezekiah admits his rebellion

🤝 He seeks a diplomatic way out

⚠️ The situation is already dangerous

📖 Even faithful kings sometimes negotiate under pressure

## ⚖️ Three Hundred Talents Of Silver And Thirty Talents Of Gold

A talent was a unit of weight close to a hundred pounds.

That means well over four tons of silver and hundreds of pounds of gold.

Assyria demands this entire fortune just to call off the invasion.

⚖️ A talent weighed close to a hundred pounds

💰 Tons of silver are demanded

🥇 Hundreds of pounds of gold too

📖 An enormous fortune buys temporary peace

## 🏛️ The Silver That Was Found In The House Of The LORD

The temple functioned as Judah's national treasury, not just a place of worship.

Sacred offerings collected there over years get handed over to Assyria.

Even the temple's wealth cannot fully satisfy Assyria's demand.

🏛️ The temple doubled as a treasury

🎁 Years of offerings are handed over

💸 Even that is not enough

📖 Sacred wealth gets spent on survival

## 🚪 Cut Off The Gold From The Doors Of The Temple

Hezekiah strips gold he himself had placed on the temple doors.

This shows how far the crisis had gone beyond ordinary tribute.

Undoing his own earlier work was a painful, humbling last resort.

🚪 Hezekiah strips his own temple gold

😔 The crisis outgrows ordinary tribute

🔁 He undoes his own earlier work

📖 Survival cost more than money

## 🏛️ The Pillars Which Hezekiah King Of Judah Had Overlaid

These pillars stood inside the temple, decorated with gold plating.

Hezekiah had personally overlaid them as an act of honoring God.

Stripping his own gift back off shows the true scale of Assyria's demand.

🏛️ Pillars stood inside the temple

🥇 Hezekiah himself had gilded them

😣 Stripping them back was painful

📖 Even personal gifts to God got sacrificed

# SecondKingsEighteen 18:17-18
# ⚔️ Assyria's Officials Arrive At Jerusalem
---
## 🎖️ Tartan And Rabsaris And Rabshakeh

These are official titles, not personal names.

Many scholars believe they mean something close to commander, chief officer, and chief spokesman.

Assyria sends its top leadership, not a minor messenger.

🎖️ These are titles, not names

🪖 They likely mean commander and chief officer

🗣️ Rabshakeh becomes the chief spokesman

📖 Assyria's top leadership shows up in person

## 🪖 With A Great Host Against Jerusalem

Hezekiah had already paid the massive tribute demanded in verse fourteen.

Assyria sends an army against Jerusalem anyway.

Payment did not buy the safety Hezekiah hoped it would.

🪖 A great host still marches on Jerusalem

💰 Tribute had already been paid

😨 Payment did not guarantee safety

📖 Assyria's demands were never really finished

## 💧 The Conduit Of The Upper Pool

This location was tied to Jerusalem's water supply system.

Meeting here was no accident, it exposed the city's most vulnerable resource.

Water access could decide whether a siege succeeded or failed.

💧 The site connects to Jerusalem's water supply

🎯 The meeting spot was no accident

⚔️ Water access could decide a siege

📖 Assyria targets the city's weak point

## 🏛️ Which Was Over The Household

Eliakim, Shebna, and Joah meet the Assyrian officials together.

Eliakim ran the palace as the king's top household officer.

Shebna served as the royal secretary.

Joah kept the official government records.

🏛️ Eliakim runs the royal household

✍️ Shebna serves as royal secretary

📜 Joah keeps official government records

📖 Trusted leaders meet the threat first

# SecondKingsEighteen 18:19-21
# 🎭 What Confidence Is This
---
## 👑 Thus Saith The Great King, The King Of Assyria

Rabshakeh opens by naming his king's full title twice.

This was intentional intimidation before a single real threat was even spoken.

Titles alone were meant to make Jerusalem feel already defeated.

👑 Rabshakeh leads with royal titles

😨 This was deliberate intimidation

🗣️ No real threat is spoken yet

📖 Words alone were meant to defeat morale

## ❓ What Confidence Is This Wherein Thou Trustest

Rabshakeh's whole speech is built around this one sharp question.

He is not asking out of curiosity, he is trying to shake Hezekiah's resolve.

Undermining trust does more damage here than any weapon could.

❓ One sharp question drives the speech

🎯 The goal is shaking resolve

🗡️ Words aim to do a weapon's job

📖 Doubt can defeat a city before battle

## 🌬️ They Are But Vain Words

Rabshakeh dismisses Hezekiah's confidence as empty talk with no real backing.

He assumes Judah has no real plan behind its resistance.

Confident speech is treated as a bluff to be called.

🌬️ Vain words means empty talk

🎲 Rabshakeh treats resistance as a bluff

🚫 He assumes there is no real plan

📖 Confidence gets mocked before it is tested

## 🌾 The Staff Of This Bruised Reed, Even Upon Egypt

A reed is a thin plant stem, weak and easily broken.

Leaning on one for support only causes it to snap and injure the hand.

Egypt is being compared to that exact kind of false support.

🌾 A reed is thin and weak

✋ Leaning on it causes injury

🇪🇬 Egypt is compared to that reed

📖 False support can wound the one trusting it

## 🇪🇬 So Is Pharaoh King Of Egypt Unto All That Trust On Him

Judah had leaned on Egypt as a military ally against Assyria.

Rabshakeh warns that alliance will fail exactly like the reed metaphor describes.

The prophet Isaiah gives this same warning about Egypt elsewhere in scripture.

🇪🇬 Judah had leaned on Egypt

⚠️ The alliance is warned to fail

📚 Isaiah gives this same warning elsewhere

📖 Human allies can fail when trusted like God

# SecondKingsEighteen 18:22-25
# 🗣️ Rabshakeh Claims The LORD Sent Him
---
## ⛰️ Whose High Places And Whose Altars Hezekiah Hath Taken Away

Rabshakeh twists Hezekiah's faithful reform into an insult against God.

He assumes removing high places offended the LORD rather than honored Him.

The enemy misreads Judah's own religion completely.

⛰️ Rabshakeh twists a faithful reform

😠 He treats it as an insult to God

❌ He misreads Judah's religion completely

📖 Enemies often misunderstand real faith

## 🏛️ Ye Shall Worship Before This Altar In Jerusalem

This line points to Hezekiah's real policy of centralized worship.

Ironically, Rabshakeh states Hezekiah's actual reform correctly here.

He just draws the wrong, mocking conclusion from a true fact.

🏛️ This names Hezekiah's real reform

✅ Rabshakeh gets the fact right

❌ He draws the wrong conclusion

📖 Truth can still be twisted into mockery

## 🐎 I Will Deliver Thee Two Thousand Horses

Rabshakeh mockingly offers Judah two thousand horses if they can find riders.

This was an insult, implying Judah lacks even the manpower to use them.

He is highlighting Judah's military weakness, not making a real offer.

🐎 Two thousand horses are offered

😏 It is a mocking insult

🪖 Judah lacks manpower to use them

📖 The offer exposes weakness, not generosity

## 👤 The Least Of My Master's Servants

Rabshakeh claims even Assyria's lowest ranked officer outmatches Judah's whole army.

The insult is meant to crush any remaining confidence.

Every line of this speech works to humiliate before battle even starts.

👤 Even a low officer is claimed superior

😔 The insult targets Judah's confidence

🗡️ Humiliation comes before any battle

📖 Words are used as a weapon here

## 🙌 Am I Now Come Up Without The LORD

Rabshakeh falsely claims God personally sent him to destroy Jerusalem.

This is a lie meant to sound like true prophecy.

Real prophets like Isaiah will directly contradict this claim in the next chapter.

🙌 Rabshakeh falsely claims divine backing

🎭 It sounds like prophecy but is not

📚 Isaiah contradicts this claim next chapter

📖 A lie can wear the mask of truth

## 🗣️ The LORD Said To Me, Go Up Against This Land

Rabshakeh has no real word from God, only a boast dressed as one.

He uses Judah's own faith language to sound convincing.

Borrowing someone's beliefs to manipulate them is an old, effective trick.

🗣️ No real word from God exists here

🎭 It is a boast dressed as prophecy

🧠 Judah's own faith language is borrowed

📖 Manipulation often wears familiar words

# SecondKingsEighteen 18:26-27
# 🤐 Speak Not In The Jews' Language
---
## 🗣️ Speak, I Pray Thee, To Thy Servants In The Syrian Language

Syrian language here means Aramaic, the common diplomatic language of the region.

Judah's officials understand it well and prefer to keep this conversation private.

They are trying to protect the ordinary people listening from the wall.

🗣️ Syrian language means Aramaic

🤝 It was the region's diplomatic language

👂 Officials try to keep this private

📖 Protecting morale mattered as much as words

## 🧱 Talk Not With Us In The Jews' Language In The Ears Of The People

Jews' language here means Hebrew, the language ordinary Judeans spoke.

The officials fear a public message will spread panic through the city.

Their request reveals exactly what Rabshakeh's real target actually is.

🧱 Jews' language means Hebrew

😰 Officials fear public panic

🎯 The request reveals Rabshakeh's real target

📖 Panic can spread faster than any army

## 🎯 Hath He Not Sent Me To The Men Which Sit On The Wall

Rabshakeh openly admits his real audience is the people, not the officials.

He wants ordinary citizens to hear despair straight from an enemy general.

Undermining the people's morale mattered more to him than diplomacy.

🎯 Rabshakeh names his real audience

👥 He wants the people to hear him

😨 Morale matters more than diplomacy

📖 Psychological warfare targets the crowd, not the king

## 💩 Eat Their Own Dung, And Drink Their Own Piss With You

This crude line describes the coming horror of prolonged siege starvation.

Rabshakeh speaks plainly and brutally on purpose to shock and terrify.

He wants Jerusalem to picture the worst outcome before it even happens.

💩 The line describes siege starvation

😱 Crude language is used on purpose

🧠 It plants fear before the siege begins

📖 Cruel words prepare the ground for cruel outcomes

# SecondKingsEighteen 18:28-32
# 📢 Rabshakeh's Public Threat
---
## 📣 Then Rabshakeh Stood And Cried With A Loud Voice In The Jews' Language

Rabshakeh does exactly what Judah's officials had just asked him not to do.

He speaks Hebrew directly to the people gathered on the city wall.

The diplomatic request from verse twenty six is completely ignored.

📣 Rabshakeh ignores the officials' request

🗣️ He speaks Hebrew to the crowd

🧱 He addresses the people directly

📖 The enemy chooses fear over diplomacy

## 🚫 Let Not Hezekiah Deceive You

Rabshakeh directly attacks the king's credibility in front of his own people.

He wants the crowd to doubt their own leader before doubting Assyria.

Dividing a nation from its king is a classic tactic before conquest.

🚫 Hezekiah's credibility is directly attacked

👥 The goal is doubt among the people

⚔️ Dividing king and people is a classic tactic

📖 Trust in leadership becomes a battlefield too

## 🙏 Neither Let Hezekiah Make You Trust In The LORD

This line goes beyond politics into a direct attack on faith itself.

Rabshakeh wants the people to abandon trust in God, not just in their king.

The real target of this whole speech has always been faith.

🙏 The attack targets faith, not just politics

🎯 Rabshakeh wants trust in God abandoned

👑 It is bigger than doubting the king

📖 Real spiritual battles hide inside political ones

## 🍇 Eat Ye Every Man Of His Own Vine, And Every One Of His Fig Tree

Rabshakeh paints a false picture of peaceful, ordinary life under surrender.

Owning your own vine and fig tree was a common symbol of peace and stability.

The offer sounds generous but hides the reality of exile that follows it.

🍇 A vine and fig tree symbolize peace

😌 The picture sounds calm and generous

🎭 It hides the exile that follows

📖 A false peace can sound very appealing

## 🤝 Make An Agreement With Me By A Present

A present here means a formal gift of surrender, not a friendly gesture.

Giving it would mean publicly submitting to Assyrian rule.

Rabshakeh frames total surrender as a simple, easy transaction.

🤝 A present here means surrender

👑 It means submitting to Assyrian rule

✍️ Rabshakeh frames it as simple and easy

📖 Surrender is dressed up as a small step

## 🍯 A Land Of Corn And Wine, A Land Of Bread And Vineyards

This list deliberately echoes how Moses describes the promised land in Deuteronomy.

Rabshakeh is offering a counterfeit version of God's own promise to Israel.

The imitation is meant to make exile sound like a second promised land.

🍯 The list echoes Deuteronomy's promised land

🎭 Rabshakeh offers a counterfeit promise

🗺️ Exile is repackaged to sound appealing

📖 Even God's own promises can be imitated falsely

# SecondKingsEighteen 18:33-35
# 🗿 Where Are The Gods Of The Nations
---
## ❓ Hath Any Of The Gods Of The Nations Delivered At All His Land

Rabshakeh builds his final argument around one repeated pattern.

Every nation Assyria has already conquered trusted its own gods first.

None of those gods stopped Assyria from winning.

❓ One repeated pattern anchors the argument

🌍 Every conquered nation trusted its gods

🏆 None of those gods stopped Assyria

📖 A pattern is used to predict the future

## 🏙️ Where Are The Gods Of Hamath, And Of Arpad

Hamath and Arpad were real cities in Syria that Assyria had already conquered.

Naming specific, familiar places made the threat feel concrete, not abstract.

Jerusalem's listeners would have recognized both names immediately.

🏙️ Hamath and Arpad were real Syrian cities

🗺️ Both had already fallen to Assyria

👂 Familiar names made the threat concrete

📖 History was used as a weapon of fear

## 🌍 Sepharvaim, Hena, And Ivah

These are three more territories already conquered by Assyria's armies.

Listing so many defeated places back to back builds overwhelming pressure.

Every name adds one more piece of evidence to Rabshakeh's case.

🌍 Three more conquered territories are named

📈 Listing them builds overwhelming pressure

🧩 Each name adds to the case

📖 A long list can feel like proof

## ⚖️ That The LORD Should Deliver Jerusalem Out Of Mine Hand

Rabshakeh's final question places the true God on the exact same level as defeated idols.

This is the most blasphemous line in his entire speech.

Everything that follows in the next chapter answers this one arrogant claim.

⚖️ The LORD is placed beside defeated idols

😠 This is the speech's most blasphemous line

📚 The next chapter answers this claim

📖 Comparing God to idols is the real error

# SecondKingsEighteen 18:36-37
# 😶 The People Held Their Peace
---
## 😶 The People Held Their Peace, And Answered Him Not A Word

Despite every insult and threat, the crowd stays completely silent.

That silence takes real discipline under this kind of public pressure.

Rabshakeh's whole strategy depended on stirring up panic, and it fails here.

😶 The crowd stays completely silent

💪 Silence takes real discipline

🎯 Rabshakeh's strategy depended on panic

📖 Discipline can defeat a psychological attack

## 👑 For The King's Commandment Was, Saying, Answer Him Not

This silence was not random, it was Hezekiah's direct order.

A public argument on the wall could have spiraled out of control quickly.

One wise command protects the whole city from a dangerous, emotional response.

👑 Hezekiah gave a direct order

🧱 A public argument could spiral fast

🛡️ One command protects the whole city

📖 Wise leadership can prevent unnecessary danger

## 👕 To Hezekiah With Their Clothes Rent

Rending, or tearing, one's clothes was a common ancient expression of grief and distress.

The officials do this even though they never spoke a single word back to Rabshakeh.

Their torn clothes say what their silence could not.

👕 Rent means torn clothes

😢 It was a sign of grief and distress

🤐 They stayed silent yet still showed distress

📖 Sometimes an action speaks louder than silence

## 📜 Told Him The Words Of Rabshakeh

The three officials report everything back to Hezekiah in full.

This moment sets up Hezekiah's response in the very next chapter.

The threat has now reached the one person who must decide what happens next.

📜 The full report reaches Hezekiah

🔁 This sets up the next chapter

👑 The decision now rests with the king

📖 Every threat eventually reaches the one in charge
`.trim();

export const SECOND_KINGS_EIGHTEEN_PERSONAL_SECTIONS = parseSecondKingsEighteenRawNotes(SECOND_KINGS_EIGHTEEN_RAW_NOTES);
