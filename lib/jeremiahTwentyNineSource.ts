export type JeremiahTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahTwentyNineRawNotes(rawText: string): JeremiahTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+29:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 29 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+29:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+29:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 29 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 29,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 29:${startVerse}` : `Jeremiah 29:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Jeremiah 29 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_TWENTY_NINE_RAW_NOTES = `# Jeremiah 29:1-3
# 📜 A Letter Crosses To Babylon
---
## 📜 Jeremiah The Prophet Sent

Jeremiah did not travel to Babylon himself.

He sent a written letter instead, carried by messengers.

Prophets almost always spoke their message out loud to a crowd.

A letter meant this word had to survive a long journey first.

It also meant the exiles could read it again later, not just hear it once.

📜 Jeremiah sent a written letter

🐎 Messengers carried it to Babylon

🔁 Exiles could read it again

📖 A letter can outlast a single hearing

---
## 🧓 The Residue Of The Elders

Residue means those left over after others were taken away.

These elders were community leaders, not just older men.

Many leaders had already died or been killed before this deportation happened.

The ones still alive carried the weight of guiding the exiles.

🧓 Residue means those left over

👴 Elders were community leaders

💀 Many leaders had already died

📖 Survivors now carried the weight of leading

---
## ⛓️ Carried Away Captive From Jerusalem To Babylon

This letter looked back at an event already years in the past.

Nebuchadnezzar, the king of Babylon, had invaded Jerusalem in 597 BC.

He removed the king, many nobles, and skilled workers all at once.

That deportation is the reason this whole community now lived far from home.

⛓️ This looks back at 597 BC

👑 Nebuchadnezzar ruled Babylon

🏛️ He removed Jerusalem's leaders at once

📖 That deportation created this exiled community

---
## 👑 Jeconiah The King, And The Queen

Jeconiah is another name for King Jehoiachin.

He ruled only three months before Nebuchadnezzar removed him.

The queen mentioned here was likely his mother, not his wife.

Queen mothers held real political influence in Judah's court.

Losing both of them at once stripped the throne of its whole household.

👑 Jeconiah is also called Jehoiachin

⏳ He ruled only three months

👸 The queen was likely his mother

📖 Both losses stripped the throne bare

---
## 🏛️ The Eunuchs

Eunuchs served as trusted officials inside royal courts.

Many were castrated men, which made them ineligible to start their own competing dynasty.

Kings often trusted them with sensitive palace duties for exactly that reason.

Taking them weakened the royal household's entire support staff at once.

🏛️ Eunuchs were trusted court officials

🚫 They could not start a rival dynasty

🔑 Kings trusted them with sensitive duties

📖 Their loss weakened the whole household

---
## 🎖️ The Princes Of Judah And Jerusalem

Princes here means nobles and officials, not only a king's sons.

These were the people who ran the government day to day.

Removing them left Jerusalem without its normal layer of leadership.

A city can survive losing a king more easily than losing all its officials at once.

🎖️ Princes means nobles and officials

🏛️ They ran the daily government

📉 Their loss stripped normal leadership

📖 Losing officials hurt more than losing a king

---
## 🔨 The Carpenters, And The Smiths

These were the empire's practical, skilled workers.

Carpenters and smiths built and repaired weapons, walls, and tools.

Taking them on purpose slowed any quick attempt to rebuild or rearm.

Nebuchadnezzar removed both the thinkers and the builders in one deportation.

🔨 They were skilled, practical workers

🛡️ They built weapons, walls, and tools

🐢 Their loss slowed any rebuilding

📖 Both leaders and builders were removed

---
## ✍️ By The Hand Of Elasah The Son Of Shaphan, And Gemariah The Son Of Hilkiah

This letter did not travel alone.

Zedekiah, the king left ruling in Jerusalem, sent an official embassy to Nebuchadnezzar.

Elasah and Gemariah carried the royal message as part of that diplomatic trip.

Jeremiah used their trip as a safe way to send his own letter too.

Their fathers, Shaphan and Hilkiah, were well known scribal families in Jerusalem.

✍️ The letter rode with an embassy

🤝 Zedekiah sent it to Nebuchadnezzar

📬 Jeremiah added his own letter too

📖 A diplomatic trip became his mail route

---
# Jeremiah 29:4-9
# 🏡 Settle In, And Watch For Liars
---
## 📯 Thus Saith The LORD Of Hosts

This phrase opens the real message inside the letter.

Everything before this line was just background and names.

LORD of hosts means the LORD who commands heaven's armies.

Jeremiah is not giving his own personal opinion here.

He is passing along a direct word from God.

📯 This phrase opens the real message

🎖️ LORD of hosts means commander of heaven's armies

🗣️ Jeremiah passes along God's word

📖 This is not his personal opinion

---
## 🏠 Build Ye Houses, And Dwell In Them

This command surprised exiles who expected a quick trip home.

Building a house is not something a traveler does.

God is telling them to settle in for a long stay.

Their expectations needed to change before their circumstances would.

🏠 Building a house means settling down

⏳ This trip would not be quick

🔄 Their expectations had to change first

📖 God prepared them for a long stay

---
## 🌱 Plant Gardens, And Eat The Fruit Of Them

Fruit trees and gardens do not produce food right away.

Some fruit trees take years before they bear anything to eat.

Planting one only makes sense if you plan to stay and see it grow.

This command is another way of saying their exile would last a long time.

🌱 Fruit trees take years to grow

⏳ Planting only makes sense long term

🏡 This confirmed a lasting stay

📖 The timeline was longer than hoped

---
## 👶 Take Ye Wives, And Beget Sons And Daughters

God commands marriage and children, not just survival.

He even tells them to find wives and husbands for their own children.

That covers two full generations, not just the exiles themselves.

A community that keeps having children is a community planning to continue.

👶 Marriage and children are both commanded

👨‍👩‍👧 It covers two full generations

🌳 A growing family plans to continue

📖 God wanted this community to last

---
## 📈 That Ye May Be Increased There, And Not Diminished

Exile usually shrinks a people through death, despair, and scattering.

God's goal here is the opposite of that shrinking.

He wants this community to grow larger while away from home.

A growing people in captivity was itself a sign of God's care.

📉 Exile usually shrinks a people

📈 God wanted growth instead

🏘️ A larger community defies despair

📖 Growth itself showed God's care

---
## 🕊️ Seek The Peace Of The City

Babylon was the empire that had destroyed their home.

God still commands the exiles to want good things for that city.

This was not a natural feeling to have toward a conqueror.

Obeying this command took real trust that God was still in control.

🏙️ Babylon had destroyed their home

🕊️ God still commanded them to want its good

😮 This was not a natural feeling

📖 It required trusting God's control

---
## 🙏 Pray Unto The LORD For It

This takes the last command one step further.

Wanting good for the city was not enough on its own.

God tells them to actually pray for Babylon's wellbeing.

Praying for a captor city planted a seed later Jewish communities lived by for centuries.

🙏 Prayer went further than good wishes

🏙️ They prayed for Babylon's wellbeing

🌍 This shaped later Jewish life abroad

📖 Prayer for a captor was new

---
## ⚖️ In The Peace Thereof Shall Ye Have Peace

This line explains why the last two commands mattered.

The exiles' own peace was tied to the city's peace.

If Babylon suffered war or famine, the exiles suffered right along with it.

Their fate and the city's fate had become linked together.

🔗 Their peace was tied to Babylon's

⚔️ Babylon's trouble became their trouble

🤝 Two fates had become linked

📖 Shared peace protected them both

---
## 🎭 Let Not Your Prophets And Your Diviners

Not every voice claiming to speak for God in Babylon told the truth.

Diviners means people who claimed to predict the future through omens or rituals.

Some of these voices lived right inside the exile community itself.

God warns the people to be on guard against their own.

🎭 Some prophets among them were false

🔮 Diviners claimed to predict the future

🏘️ These voices lived inside the community

📖 God warned against trusting their own

---
## 💭 Neither Hearken To Your Dreams

Dreams were a real, respected way God sometimes spoke in this era.

That is exactly why false dreams were so dangerous here.

Claiming a dream from God could sound just as convincing as claiming God spoke aloud.

Not every dream reported by someone was actually sent by God.

💤 Dreams were a respected way to hear God

🎭 Fake dreams could sound convincing

🚫 Not every claimed dream was real

📖 A claim alone proved nothing

---
## 🚫 I Have Not Sent Them

This is God's own verdict on these false voices.

They spoke using confident, official sounding language.

None of it actually came from him.

Confidence and the right vocabulary do not prove a message is true.

🚫 God denies sending these prophets

🗣️ They sounded confident and official

🎭 Confidence does not prove truth

📖 A message needs God's actual sending

---
# Jeremiah 29:10-14
# ⏳ Seventy Years And A Future Hope
---
## ⏳ After Seventy Years Be Accomplished At Babylon

This number was not a vague guess.

Jeremiah had already named seventy years back in chapter twenty five.

The exile would last about one full lifetime, not just a few seasons.

Most people who left Jerusalem would not personally see the return.

⏳ Seventy years was a real number

📜 Chapter 25 already named this length

👴 Most exiles would not see the return

📖 God's timeline outlasted a lifetime

---
## 👁️ I Will Visit You

Visit here does not mean a short, casual stop.

It means God will personally step in and act on their behalf.

For seventy years, it could have felt like God had forgotten them completely.

This word promises that silence was never the same thing as absence.

👁️ Visit means God will act

🤫 Seventy years of silence felt like forgetting

🕊️ Silence was never absence

📖 God promised to personally step in

---
## ✅ Perform My Good Word Toward You

God is not making a brand new promise here.

He is confirming he will keep a promise already made earlier.

A good word toward them means a promise meant for their benefit.

Long delays never cancel a promise God has actually spoken.

✅ This confirms an earlier promise

🎁 A good word means a benefit

⏳ Long delays do not cancel it

📖 Delay was never denial

---
## 💭 Thoughts Of Peace, And Not Of Evil

This famous line is often quoted by itself, far from its original setting.

Here it is a promise about ending a specific seventy year exile.

It is not a blanket guarantee that every believer's life stays easy.

The promise still reveals something true about God's heart toward his people.

💭 This verse is often quoted alone

⏳ Its original point was ending exile

🚫 It is not a guarantee of ease

📖 It still reveals God's true heart

---
## 🎯 To Give You An Expected End

Expected end means a future the people could actually look forward to.

Exile without any promised end would feel endless and hopeless.

God names a real outcome on the other side of the waiting.

Hope needs an actual destination, not just a vague feeling.

🎯 Expected end means a real future

😔 Endless waiting feels hopeless

🏁 God named a real outcome

📖 Hope needs an actual destination

---
## 🙏 Then Shall Ye Call Upon Me

This promise is not automatic or unconditional.

The word then ties it to something the people must do first.

God calls them to turn toward him, not just wait quietly.

A relationship, not silence, was always the real goal of the exile.

🙏 The promise is not automatic

🔁 Then ties it to their response

🗣️ God calls them to turn to him

📖 Relationship was always the goal

---
## 🔍 Ye Shall Seek Me, And Find Me

Seeking here is not a quick, halfhearted glance toward God.

The next line adds the phrase with all your heart.

That means full attention, not a backup plan tried last.

A search like that was always going to succeed.

🔍 Seeking means real, full effort

❤️ It required all their heart

🚫 It was not a backup plan

📖 That kind of search would succeed

---
## 🔄 I Will Turn Away Your Captivity

This line promises to reverse the exile itself, not just soften it.

Turn away pictures God physically undoing what had been done to them.

The same God who allowed the exile also promises to end it.

Judgment and mercy were coming from the very same hand.

🔄 Turn away means fully reversing it

✋ God pictures undoing the exile

⚖️ The same hand judged and restored

📖 Mercy followed the same judgment

---
## 🌍 I Will Gather You From All The Nations

Babylon was not the only place exiles had scattered to.

Some had fled to Egypt and other nearby lands as well.

This promise reaches wider than just one captive city.

God's gathering would eventually pull from every direction they had scattered.

🌍 Exiles scattered beyond just Babylon

🏃 Some fled toward Egypt too

🧭 The promise reaches every direction

📖 God would gather them all back

---
# Jeremiah 29:15-19
# 🍎 Those Who Stayed Behind
---
## 🗣️ The LORD Hath Raised Us Up Prophets In Babylon

This is not God speaking here.

It is a claim some exiles were making about themselves.

They pointed to certain voices in Babylon as proof God still backed a quick return.

Quoting someone else's claim is not the same as confirming it is true.

🗣️ Exiles were quoting a claim

🏙️ It pointed to voices in Babylon

🚫 God is not confirming this claim

📖 A quote is not a confirmation

---
## 👑 The King That Sitteth Upon The Throne Of David

This king is Zedekiah, still ruling in Jerusalem at this point.

He sat on David's throne, but only because Babylon allowed it.

God's message here was not just for the exiles far away.

It reached back to the ones who stayed home too.

👑 This king is Zedekiah

⛓️ Babylon allowed his rule

🏠 The message also reached Jerusalem

📖 Distance did not limit God's word

---
## 🏙️ Your Brethren That Are Not Gone Forth With You Into Captivity

Not every Israelite ended up in Babylon.

Many family members and neighbors still lived in Jerusalem.

The exiles might have assumed staying behind meant staying safe.

This chapter is about to say the opposite is true.

🏙️ Many relatives stayed in Jerusalem

🤔 Staying might have seemed safer

⚠️ The opposite was actually true

📖 Location was never the real safety

---
## ⚔️ The Sword, And The Famine, And The Pestilence

This three part phrase names war, starvation, and disease together.

It is a set formula used often throughout Jeremiah's warnings.

Ancient readers would recognize it instantly as covenant judgment language.

These three disasters usually arrived together, not one at a time.

⚔️ Sword means war

🍽️ Famine means starvation

🦠 Pestilence means disease

📖 This trio signaled covenant judgment

---
## 🍎 Like Vile Figs, That Cannot Be Eaten

This image is not new to this letter.

Chapter twenty four already showed Jeremiah a vision of two baskets of figs.

Good figs pictured the exiles God would care for.

Bad, rotten figs pictured the king and people left behind in Jerusalem.

This verse confirms that second, harder half of the vision.

🍎 Chapter 24 introduced this image

✅ Good figs pictured the exiles

🤢 Bad figs pictured those left behind

📖 This verse confirms that vision

---
## 😱 To Be A Curse, And An Astonishment, And An Hissing, And A Reproach

These four words describe how other nations would react.

Curse means people would use their name as an insult.

Astonishment and hissing describe shocked, mocking reactions from onlookers.

Reproach means public shame attached to their name.

This is the same set of warnings Moses gave long before in Deuteronomy.

🤬 Curse means becoming an insult

😲 Astonishment means shocked reactions

😤 Hissing means mocking reactions

📖 Deuteronomy already warned of this

---
## 🌅 Rising Up Early And Sending Them

This idiom pictures someone starting their work before the sun is even up.

It describes God's own effort in sending prophet after prophet.

He was not careless or slow about warning his people.

Their refusal to listen was not because the warning came too late.

🌅 Rising early means starting before dawn

🗣️ It pictures God's constant warning effort

🐢 God was never careless or slow

📖 Their refusal was not God's failure

---
## 🙉 Ye Would Not Hear

God's effort is contrasted directly against the people's response.

He sent warning after warning, early and often.

They still chose not to listen, again and again.

The coming disaster was never a surprise forced on them from nowhere.

🙉 The people would not listen

🔁 This happened again and again

📢 Warnings came early and often

📖 The disaster was not a surprise

---
# Jeremiah 29:20-23
# 🔥 Two Lying Prophets Named
---
## 📢 Hear Ye Therefore The Word Of The LORD

This line signals a shift to a new, specific warning.

It is addressed to everyone still living in captivity.

The message is about to name real people, not just describe a pattern.

Naming names made the warning impossible to brush aside as vague.

📢 This marks a new warning

🌍 It addresses the whole captivity

👤 Real names are about to follow

📖 Names made the warning impossible to ignore

---
## 🗣️ Ahab The Son Of Kolaiah, And Of Zedekiah The Son Of Maaseiah

These two men are prophets living among the exiles, not kings.

This second Zedekiah shares a name with the king back in Jerusalem.

He is a completely different person.

Naming a father's name was the normal way to identify someone clearly.

God singles out these two specific voices among the false prophets.

🗣️ Both men were prophets in exile

👥 This Zedekiah is not the king

📛 Naming a father identified someone clearly

📖 God singled out these two voices

---
## 🎭 Which Prophesy A Lie Unto You In My Name

This is the exact same danger Hananiah showed back in chapter twenty eight.

Someone can use God's own name while saying something God never said.

The name attached to a message never proves the message is true.

These two men were repeating a pattern God had already exposed once.

🎭 This repeats Hananiah's pattern

🗣️ They used God's name falsely

🚫 A name attached proves nothing

📖 God had already exposed this pattern

---
## ⚔️ I Will Deliver Them Into The Hand Of Nebuchadrezzar

These two men likely promised comfort and a quick end to Babylon's rule.

Instead, God hands them directly over to the king of Babylon himself.

Their punishment comes from the very empire they claimed was losing power.

The lie and its consequence point in exactly opposite directions.

🤝 They likely promised quick comfort

⚔️ Babylon's king becomes their judge

🔄 Their claim and their fate reversed

📖 The lie undid itself completely

---
## 🔥 Whom The King Of Babylon Roasted In The Fire

This describes a brutal, public execution by burning.

Ancient kings sometimes used this exact punishment for treason or rebellion.

Their deaths became so well known that people later used their names as a curse.

Saying may you end up like Zedekiah and Ahab became a real warning people used on each other.

🔥 This was execution by burning

⚠️ Kings used it for rebellion

🗣️ Their names became a curse

📖 Their fate warned others for years

---
## 💔 Because They Have Committed Villany In Israel

Villany means shameful, disgraceful wrongdoing, not a small mistake.

This word covers more than just their false prophecies.

Their whole pattern of behavior had corrupted the community around them.

False teaching rarely stays separate from a corrupted life.

💔 Villany means disgraceful wrongdoing

📢 It covered more than false words

🏘️ Their behavior corrupted the community

📖 False teaching and corrupt living went together

---
## 💍 Committed Adultery With Their Neighbours' Wives

These two men did not only lie about God's message.

They also broke trust inside their own community through adultery.

A leader's private life and public message were never treated as separate things here.

Corrupt character eventually showed up in corrupt teaching too.

💍 They also committed adultery

🏘️ This broke trust in the community

🔗 Character and teaching were linked

📖 Corrupt lives led to corrupt teaching

---
## 👁️ I Know, And Am A Witness

God does not need anyone else's testimony to know the truth here.

He personally witnessed exactly what these two men did.

No secret sin stayed hidden from him, even inside a foreign exile.

Their judgment was based on direct knowledge, not rumor.

👁️ God personally witnessed their sin

🌍 Distance did not hide it from him

🚫 This was not based on rumor

📖 Direct knowledge grounded the judgment

---
# Jeremiah 29:24-28
# ✉️ Shemaiah's Letter Against Jeremiah
---
## ✉️ Thus Shalt Thou Also Speak To Shemaiah The Nehelamite

This introduces a third false prophet in just two chapters.

Nehelamite likely names his hometown or family clan, now lost to history.

God is about to answer him the same way he answered Hananiah.

A pattern is forming across these chapters, not just isolated incidents.

✉️ Shemaiah is a third false prophet

🏙️ Nehelamite likely names his hometown

🔁 God answers him like Hananiah

📖 A real pattern was forming

---
## 📨 Sent Letters In Thy Name Unto All The People That Are At Jerusalem

Shemaiah did not just speak to people around him in Babylon.

He wrote letters back across the empire to Jerusalem itself.

This mirrors exactly what Jeremiah did at the start of this very chapter.

A false prophet copied the real prophet's own method.

📨 Shemaiah wrote letters to Jerusalem

🔁 This copied Jeremiah's own method

🎭 A method alone proves nothing

📖 Imitation is not authority

---
## 🛐 To Zephaniah The Son Of Maaseiah The Priest

This Zephaniah is a priest, not the prophet who shares his name.

He held a position of real authority inside the temple system.

Shemaiah specifically targeted him to get Jeremiah silenced.

Choosing the right target mattered more to Shemaiah than telling the truth.

🛐 Zephaniah here is a priest

🏛️ He held real temple authority

🎯 Shemaiah targeted him on purpose

📖 The right target mattered to him

---
## 👮 The LORD Hath Made Thee Priest In The Stead Of Jehoiada

Shemaiah's letter makes a bold, false claim about Zephaniah's job.

Jehoiada was an earlier priest known for enforcing order in the temple.

Shemaiah claims Zephaniah now holds that same policing authority.

He invents a job description to pressure Zephaniah into acting against Jeremiah.

👮 Shemaiah invents a new job title

📜 Jehoiada was an earlier enforcing priest

🎯 The claim pressured Zephaniah to act

📖 A title was invented for pressure

---
## 😡 Every Man That Is Mad, And Maketh Himself A Prophet

Mad here does not mean mentally confused in a gentle sense.

It was a common insult aimed at prophets who acted with intense, wild emotion.

Shemaiah uses the word to paint Jeremiah as an unstable fraud.

Calling someone mad was an easy way to dismiss them without answering their message.

😡 Mad was a common prophet insult

🎭 It painted Jeremiah as unstable

🚫 Insults dodge answering the message

📖 Dismissal is not disproof

---
## ⛓️ Put Him In Prison, And In The Stocks

Stocks were a wooden restraint locked around a person's hands, feet, or neck.

They were used to publicly humiliate someone, not just hold them.

Shemaiah wanted Jeremiah restrained and shamed in public.

Jeremiah would actually face this exact punishment later, in chapter twenty.

⛓️ Stocks were a public restraint

😳 They humiliated, not just held

🎯 Shemaiah wanted Jeremiah shamed

📖 Chapter 20 shows this punishment for real

---
## 🏚️ Why Hast Thou Not Reproved Jeremiah Of Anathoth

Anathoth was Jeremiah's hometown, a small priestly town near Jerusalem.

Naming his hometown was another way to make him sound small and local.

Shemaiah frames Jeremiah's silence in Babylon as Zephaniah's personal failure.

He tries to turn one man's lie into another man's problem.

🏚️ Anathoth was Jeremiah's hometown

📉 Naming it made him sound small

🎯 Shemaiah blamed Zephaniah for inaction

📖 He shifted his lie onto someone else

---
## 📆 This Captivity Is Long

Shemaiah is quoting Jeremiah's actual words back at him with contempt.

Jeremiah really had told the exiles earlier in this chapter to settle in for the long term.

Shemaiah treats that true, hard message as proof Jeremiah is a troublemaker.

Telling the truth had made Jeremiah a target, not a hero.

📆 Shemaiah quotes Jeremiah with contempt

✅ That earlier message was true

🎯 Truth telling made Jeremiah a target

📖 Honesty was treated as trouble

---
# Jeremiah 29:29-32
# ⚖️ Jeremiah's Reply, And Shemaiah's Judgment
---
## 👂 Zephaniah The Priest Read This Letter In The Ears Of Jeremiah

Shemaiah's plan depended on Zephaniah quietly acting against Jeremiah.

Instead, Zephaniah does something Shemaiah never expected.

He reads the whole accusing letter directly to Jeremiah himself.

The plot to silence Jeremiah accidentally handed him the evidence against it.

👂 Zephaniah read the letter aloud

😮 This was not Shemaiah's plan

🔄 The plot backfired immediately

📖 Evidence reached the very man it targeted

---
## 📩 Then Came The Word Of The LORD Unto Jeremiah

Jeremiah does not need to defend himself in his own words.

God gives him a real, authoritative answer to send back.

This is the same pattern seen with Hananiah earlier in chapter twenty eight.

A false accusation gets answered with an actual word from God, not an argument.

📩 God gives Jeremiah a real answer

🔁 This repeats the Hananiah pattern

🚫 Jeremiah does not need to argue

📖 God's word outweighs any accusation

---
## 🚫 I Sent Him Not

This is God's direct verdict on Shemaiah, stated plainly.

The same short denial was already used against Hananiah, Ahab, and Zedekiah.

By this point in the chapter, the pattern is impossible to miss.

Every false voice in this story gets answered with the exact same line.

🚫 God denies sending Shemaiah

🔁 The same line judged others too

📊 The pattern repeats across the chapter

📖 One answer covers every false voice

---
## 😔 He Caused You To Trust In A Lie

This names the real damage Shemaiah's letter could have caused.

People trusting a lie make real decisions based on false hope.

A comforting lie is still dangerous, even when it feels kind.

Trust misplaced in a false word never lands somewhere safe.

😔 Lies lead to real bad decisions

🍯 A comforting lie still harms

⚠️ Kindness does not make it safe

📖 Misplaced trust never lands safely

---
## 🚷 He Shall Not Have A Man To Dwell Among This People

This judgment reaches beyond Shemaiah's own lifetime.

It means his family line will not remain part of the returning community.

Being cut off from the people was one of the heaviest punishments in this culture.

Identity and belonging were tied to your place inside Israel's ongoing story.

🚷 This judgment outlasts his lifetime

👨‍👩‍👧 His family line is cut off

💔 Being cut off was a heavy punishment

📖 Belonging was tied to Israel's story

---
## 🙈 Neither Shall He Behold The Good That I Will Do For My People

God had just promised real restoration earlier in this very chapter.

Shemaiah's punishment is missing out on that exact good future.

He helped spread a lie about comfort while forfeiting the real comfort to come.

The false promise cost him the true one.

🙈 He will not see the restoration

🎁 That good future was promised earlier

🔄 He traded truth for a lie

📖 The false promise cost him the true one

---
## ⚔️ Because He Hath Taught Rebellion Against The LORD

This is the exact same charge brought against Hananiah back in chapter twenty eight.

Both men's words pushed people to resist what God had actually said.

Encouraging false hope was never treated as a small, harmless mistake here.

The chapter closes the way it opened, with a false word answered by a true one.

⚔️ Same charge as Hananiah before

🔄 Both pushed against God's real word

🚫 False hope was never harmless

📖 A true word answered the false one

---`.trim();

export const JEREMIAH_TWENTY_NINE_PERSONAL_SECTIONS = parseJeremiahTwentyNineRawNotes(JEREMIAH_TWENTY_NINE_RAW_NOTES);
