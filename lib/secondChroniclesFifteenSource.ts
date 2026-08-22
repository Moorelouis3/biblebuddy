export type SecondChroniclesFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesFifteenRawNotes(rawText: string): SecondChroniclesFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 15:${startVerse}` : `2 Chronicles 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 2 Chronicles 15 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_FIFTEEN_RAW_NOTES = `# SecondChronicles 15:1-7
# ⚠️ Azariah's Warning To Asa
---
## 🕊️ The Spirit Of God Came Upon Azariah

"The Spirit of God came upon" describes a prophet being empowered to speak for God.

That is the Bible's normal way of describing this experience.

It does not mean Azariah felt something vague or emotional.

Azariah the son of Oded is never mentioned anywhere else in scripture.

A completely unknown man is about to deliver one of Asa's most important messages.

🕊️ Spirit came upon means prophetic empowering
❓ Azariah is named nowhere else
📜 An unknown man carries a huge message
📖 God does not need a famous messenger

## 🗺️ Hear Ye Me, Asa, And All Judah And Benjamin

Judah and Benjamin are named because those two tribes made up Asa's kingdom.

The other ten tribes had already split off into the northern kingdom of Israel.

Azariah speaks directly to the king and to the exact nation Asa actually rules.

This is not a message to Israel as a whole nation anymore.

🗺️ Judah and Benjamin formed Asa's kingdom
✂️ Ten tribes had already split away
👑 Azariah speaks to Asa's own nation
📖 The message fit the nation as it stood

## 🤝 The LORD Is With You, While Ye Be With Him

This single line states the whole message of the chapter.

God's presence with Judah depends on Judah staying close to Him first.

This is not God changing His character.

It describes how people experience His help based on their own choices.

Everything Azariah says next only unpacks this one sentence.

🤝 God's presence follows the people's faithfulness
🔄 God does not change, people do
🧭 This line sums up the whole message
📖 Every warning below flows from this sentence

## 🔍 If Ye Seek Him, He Will Be Found Of You

To seek God here means actively pursuing Him, not casually hoping to bump into Him.

The promise is a guarantee, not a maybe.

Anyone who genuinely seeks God will find Him.

This exact pattern repeats often across the book of Chronicles.

🔍 Seek means active pursuit, not chance
✅ Finding God here is a guarantee
🔁 Chronicles repeats this pattern often
📖 Seeking never comes up empty

## 🚫 But If Ye Forsake Him, He Will Forsake You

This does not mean God abandons people first.

Forsaking here mirrors exactly what the people already did to God.

God's withdrawal is always a response, never the opening move.

The warning gives Judah full responsibility for what happens next.

🚫 God does not abandon people first
🪞 God's response mirrors the people's choice
⚖️ Judah holds the responsibility here
📖 Forsaking God brings real consequences

## 📜 For A Long Season Israel Hath Been

This long season likely points back to the era of the judges.

That period sat centuries before Asa, long before he was ever born.

Israel drifted in and out of loyalty to God again and again back then.

Azariah reaches back into old history to make his warning land harder.

📜 Long season points to the judges era
🔁 Israel drifted in and out back then
🧠 Azariah uses old history as a warning
📖 Old patterns still teach present kings

## 📚 Without A Teaching Priest

A teaching priest was a Levite whose job was explaining God's law to the people.

Without one, ordinary Israelites had no one showing them what God actually required.

A nation cannot obey a law it was never taught.

This detail explains why the nation drifted so far during that long season.

📚 Teaching priest explained God's law
❓ Without one, the law went unexplained
😶 A nation cannot obey what it never learned
📖 This explains Israel's old drift from God

## 🔁 When They In Their Trouble Did Turn Unto The LORD

Israel's trouble again and again pushed the nation back toward God.

The pattern stayed the same every time, trouble came, then the nation turned back.

Turning back was never automatic.

It usually took real trouble to trigger it.

Azariah expects Asa to learn from a cycle Israel struggled to break.

🔁 Trouble pushed Israel back to God
😣 Comfort rarely triggered real turning back
🧭 Trouble often did the job instead
📖 Asa can learn from Israel's old cycle

## 🚪 No Peace To Him That Went Out, Nor To Him That Came In

This old expression means nobody was safe doing ordinary daily activities.

Not even leaving home or entering their own town felt secure.

It captures constant danger rather than one specific threat.

Travel, farming, and simple errands all carried real risk.

🚪 Went out and came in means daily life
⚠️ No ordinary moment felt safe
🌍 Travel and farming carried real risk
📖 Chaos touched every part of daily life

## 😖 Great Vexations Were Upon All The Inhabitants

Vexations means severe trouble and distress, not minor annoyance.

The word covers whole populations, not just a few unlucky families.

Every nearby country felt this same instability.

This was the environment Israel lived in before finally turning back to God.

😖 Vexations means severe distress
🌍 Whole populations were affected
🏘️ Neighboring countries felt it too
📖 This was life before Israel turned back

## ⚔️ Nation Was Destroyed Of Nation, And City Of City

Constant war between neighboring peoples was the normal condition of that era.

No lasting alliance held.

Cities and nations turned on each other again and again.

God allowed this instability as a direct result of Israel's own unfaithfulness.

⚔️ Cities and nations fought each other
🚫 No lasting alliance held
🙏 Instability followed Israel's own unfaithfulness
📖 Chaos and drift were directly connected

## ✋ Let Not Your Hands Be Weak

Weak hands is an old way of describing discouragement that makes someone stop working.

Azariah is not talking about physical tiredness.

He is telling Asa not to lose heart or quit the reforms already underway.

Encouragement follows every hard warning in this speech.

✋ Weak hands means discouragement
🚫 Not about physical tiredness
💪 Asa is told to keep going
📖 Encouragement follows every warning here

## 🎁 Your Work Shall Be Rewarded

Azariah ends his speech on a promise, not a threat.

Whatever reforms Asa is about to undertake will not go unnoticed by God.

This line pushes Asa from fear into action.

The whole speech turns a hard warning into fuel for reform.

🎁 Work shall be rewarded means real payoff
🚫 The speech ends on promise, not fear
🏃 Azariah pushes Asa toward action
📖 A warning becomes fuel for reform

# SecondChronicles 15:8-15
# 🤝 Judah's Covenant To Seek The LORD
---
## 💪 He Took Courage

Asa's very first response to the warning is courage, not despair.

Azariah's message could have discouraged a king already trying to do right.

Instead it pushes Asa immediately into action.

A hard word, received rightly, produces movement rather than paralysis.

💪 Asa responds with courage, not fear
🏃 The warning leads straight to action
✅ Hard words can strengthen the right king
📖 Courage came before the reforms began

## 🗑️ Put Away The Abominable Idols

Abominable here means detestable, something God finds deeply offensive.

These idols had likely spread during the reigns of Asa's father and grandfather.

Asa removes them across the whole kingdom, not just the capital city.

This reform reaches every corner of Judah and Benjamin.

🗑️ Abominable means deeply detestable
👨‍👦 Idols dated back earlier kings
🗺️ Removal covered the whole kingdom
📖 No town was left untouched

## ⛰️ Out Of The Cities Which He Had Taken From Mount Ephraim

These cities were territory Asa had captured earlier, likely during an earlier war.

Mount Ephraim marks the hill country belonging to the northern tribes.

Asa's reform extends even into land recently added to his kingdom.

New territory got the exact same standard as the rest of Judah.

⛰️ Mount Ephraim was northern hill country
🏆 These cities were recent conquests
📏 New land got the same standard
📖 Reform reached every recent gain

## 🏛️ Renewed The Altar Of The LORD, That Was Before The Porch

The porch was the entrance area of the temple.

The altar there was the main place of sacrifice.

Renewed means repaired or restored to proper use again.

Neglect had apparently let this central altar fall into disrepair.

True worship itself, not just idol removal, gets restored here.

🏛️ Porch was the temple's entrance area
🔥 The altar was the main sacrifice site
🔨 Renewed means repaired and restored
📖 True worship was rebuilt, not just idols removed

## 🧍 The Strangers With Them Out Of Ephraim And Manasseh, And Out Of Simeon

Strangers here means people from the northern tribes who had relocated south.

Ephraim, Manasseh, and Simeon belonged to the divided northern kingdom of Israel.

These people chose to leave that kingdom and settle under Asa instead.

Faithfulness in Judah was pulling people away from the north.

🧍 Strangers means transplants from the north
🗺️ Ephraim, Manasseh, and Simeon were northern tribes
🚶 They chose to resettle under Asa
📖 Faithfulness drew people across the border

## 📈 They Fell To Him Out Of Israel In Abundance

Fell to him is an old way of saying they defected to join his side.

Abundance means this happened in large numbers.

It was not just a handful of families.

They came because they could see God was clearly with Asa.

Visible faithfulness became its own kind of invitation.

🚶 Fell to him means they defected
📈 Abundance means large numbers, not a few
👀 They saw God was with Asa
📖 Faithfulness drew others to follow

## 📅 In The Third Month

The third month lines up with the Feast of Weeks, an existing harvest festival.

Gathering at that time connects this covenant renewal to a festival Judah already kept.

The timing was not random.

It fit an occasion Judah already recognized and celebrated.

📅 Third month aligns with the Feast of Weeks
🌾 That feast was tied to the harvest
🎉 The timing used an existing celebration
📖 An old festival hosted a new commitment

## 🕰️ The Fifteenth Year Of The Reign Of Asa

Chronicles regularly anchors major events to a king's exact regnal year.

This detail lets later readers place this covenant within Asa's full timeline.

It also marks how long Asa had reigned before this reform reached its peak.

Real change often takes years to build toward its fullest moment.

📆 Chronicles marks events by regnal year
🕰️ This anchors the covenant in Asa's timeline
📈 Reform had been building for years
📖 Real change often takes time to peak

## ⚔️ Of The Spoil Which They Had Brought

This spoil is the plunder taken from Zerah's defeated army in the last chapter.

Judah is giving back to God a portion of the very victory He provided.

The sacrifice connects directly to the answered prayer that won the battle.

⚔️ Spoil came from the Zerah victory
🎁 Judah offers back what God provided
🔗 The sacrifice connects to answered prayer
📖 Victory led directly to worship

## 🔢 Seven Hundred Oxen And Seven Thousand Sheep

This is an enormous sacrifice for one single gathering.

The number reflects how much spoil the Zerah victory actually produced.

A sacrifice this size shows real gratitude, not a token gesture.

The size of the offering matched the size of what God had done.

🔢 Seven hundred oxen, seven thousand sheep
💰 The size reflects the Zerah victory
🙏 This was gratitude, not a token gift
📖 The offering matched God's deliverance

## 📜 Entered Into A Covenant

A covenant here is a formal, binding promise made publicly before witnesses.

This was not a private feeling.

It was a national commitment made out loud, in public.

The whole nation was now formally bound to this decision.

🤝 Covenant means a formal binding promise
👥 It was made publicly, not privately
📜 The whole nation was bound by it
📖 A private feeling became a public vow

## ❤️ With All Their Heart And With All Their Soul

This exact phrase echoes the command in Deuteronomy to love God completely.

Heart and soul together mean the whole inner person, not a partial effort.

The nation is promising total devotion here.

That is not a divided loyalty split between God and other gods.

❤️ Heart and soul mean the whole person
🚫 Not a partial or divided effort
🤝 Total devotion, not a half commitment
📖 The phrase echoes Deuteronomy's command

## ⚖️ Should Be Put To Death

This does not mean casual disinterest in God.

It targets open, defiant refusal to seek Him at all.

The penalty echoes older law already given through Moses about idolatry.

The covenant treated abandoning God as seriously as any other major crime.

⚖️ Targets open refusal, not mere disinterest
📜 The penalty echoes Mosaic law
🚫 Idolatry was treated as a serious crime
📖 The covenant carried real weight

## 👥 Whether Small Or Great, Whether Man Or Woman

This covenant applied to every single person in the kingdom equally.

No social rank offered an exception.

No gender offered an exception either.

Seeking God was made a universal expectation, not one for a select few.

👥 Applied equally to everyone
🚫 No rank or gender was exempt
📏 One standard covered the whole nation
📖 Seeking God became a universal duty

## 🎺 With Shouting, And With Trumpets, And With Cornets

A cornet here is an ancient wind instrument, similar to a small trumpet.

It was used for public celebration, not quiet ceremony.

The oath was not whispered privately.

It was declared loudly, with instruments and shouting together.

🎺 A cornet was an ancient wind instrument
📢 The oath was shouted, not whispered
🎉 Instruments made it a public celebration
📖 A joyful event, not a quiet formality

## 😊 All Judah Rejoiced At The Oath

This oath produced joy, not the fear a forced promise usually creates.

The people were not being pressured into this covenant.

Genuine devotion, not obligation, is what made the moment joyful.

😊 Judah rejoiced rather than resented
🚫 This was not a forced obligation
🙏 Genuine devotion produced real joy
📖 A true commitment brings joy, not dread

## ✅ He Was Found Of Them

This directly fulfills the exact promise Azariah gave back in verse two.

Seeking God with their whole desire led to the result He had guaranteed.

The chapter shows the promise and its fulfillment sitting side by side.

🔍 They sought with their whole desire
✅ God fulfilled the earlier promise
🔗 Verse two's promise is answered here
📖 The whole chapter proves the pattern true

## 🕊️ The LORD Gave Them Rest Round About

Rest here means safety from surrounding enemies, not just inner peace.

This rest matches the same word already used for Asa's earlier peaceful years.

Seeking God again produced the exact same result as before.

🕊️ Rest means safety from enemies
🔁 The same word describes Asa's earlier peace
🙏 Seeking God produced this rest again
📖 Faithfulness kept bringing the same result

# SecondChronicles 15:16-19
# 🕊️ Asa's Reform Completed And Peace Secured
---
## 👵 Maachah The Mother Of Asa The King

Maachah is listed here as Asa's mother, though she was more likely his grandmother.

Abijah, not Asa, was actually her son and Asa's real father.

Ancient Hebrew often used the word mother loosely for any female ancestor.

The title mattered less than the real power she held in the palace.

👵 Maachah was likely Asa's grandmother
📖 Mother could mean any female ancestor
👑 She held real influence in the palace
➡️ Her family status made the next verse serious

## 👑 He Removed Her From Being Queen

Queen here refers to an official royal position, likely queen mother, with real political power.

Removing her from that office was a major political move, not a personal insult.

Asa was willing to confront even his own family for the sake of true worship.

👑 Queen was a real position of power
⚖️ This was political, not personal
👨‍👩‍👧 Asa confronted his own family
📖 True worship outweighed family loyalty

## 🌳 Because She Had Made An Idol In A Grove

A grove here means an Asherah pole, the same pagan object destroyed in the last chapter.

Maachah had personally built one of these poles herself.

That fact shows idolatry had reached the very top of the royal family.

The reform had to go all the way up, not just out to the countryside.

🌳 Grove means an Asherah pole
🔁 The same object from chapter fourteen
👑 Idolatry reached the royal family itself
📖 Reform reached the very top

## 🔥 Stamped It, And Burnt It At The Brook Kidron

This was not a symbolic gesture.

The idol was physically crushed and then burned completely.

Kidron was a valley near Jerusalem, a common place for destroying unclean objects.

Asa left nothing of it that could ever be rebuilt or reused.

🔨 Stamped means physically crushed
🔥 Burnt means totally destroyed
🌊 Kidron was Jerusalem's disposal valley
📖 Nothing was left to rebuild

## ⛰️ The High Places Were Not Taken Away

This detail does not erase everything good already described about Asa's reform.

High places were hilltop shrines that were extremely hard to fully clear from a kingdom.

Chronicles stays honest that even a faithful king's reform stayed incomplete.

⛰️ High places were hilltop shrines
😕 They proved hard to fully remove
📖 Chronicles admits the reform was incomplete
➡️ Even good kings leave some work undone

## ❤️ The Heart Of Asa Was Perfect All His Days

Perfect here means wholehearted and fully devoted, not flawless or sinless.

Asa's heart stayed loyal to God even though his actions were not fully complete.

Chronicles measures a king by devotion far more than by a spotless record.

❤️ Perfect means wholehearted, not flawless
🙏 Asa's loyalty stayed constant
📏 Devotion matters more than a spotless record
📖 A whole heart outweighs an incomplete reform

## 👨 The Things That His Father Had Dedicated

His father here is Abijah, a king remembered elsewhere in Chronicles for real spiritual failures.

Even a flawed king had apparently set some silver and gold aside for God's house.

Asa honors that one good act by adding his own gifts alongside it.

👨 His father was Abijah
⚠️ Abijah is remembered for real failures
🎁 Even he gave something toward the temple
📖 Asa built on that one good act

## 🕊️ No More War Unto The Five And Thirtieth Year

This closes the chapter with an extended stretch of peace lasting decades.

The rest Azariah promised back in verse two held for a very long time.

The next chapter shows what happens when this same king stops trusting God the same way.

🕊️ Peace lasted for decades
✅ Azariah's early promise held true
📖 The chapter ends where it began, with rest
➡️ The next chapter tests whether it lasts
`.trim();

export const SECOND_CHRONICLES_FIFTEEN_PERSONAL_SECTIONS = parseSecondChroniclesFifteenRawNotes(SECOND_CHRONICLES_FIFTEEN_RAW_NOTES);
