export type EzraEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzraEightRawNotes(rawText: string): EzraEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzraEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezra\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezra 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezra\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezra\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezra 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezra 8:${startVerse}` : `Ezra 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Ezra 8 sections, received " + sections.length);
  }

  return sections;
}

const EZRA_EIGHT_RAW_NOTES = `# Ezra 8:1-14
# 📜 The Second Company's Family List
---
## 👪 The Chief Of Their Fathers

"Chief of their fathers" means the leader of each family clan.

It does not mean a single ruler over all the people.

A genealogy is simply a written record of family lines.

Ezra kept this list to prove exactly who was traveling with him.

Inheritance rights and temple duties both depended on a proven family line.

👪 Chief of their fathers means clan leaders

🚫 Not a single ruler over all

📜 A genealogy records family lines

📖 Proven lines decided inheritance and duty

## 👑 In The Reign Of Artaxerxes The King

This is the same Artaxerxes who sent Ezra from Babylon in chapter seven.

Verse one connects this list directly to that same royal journey.

Everyone named here traveled during that one specific, dated expedition.

The list was not compiled from scattered trips over many years.

👑 Same Artaxerxes from chapter seven

🔗 This list ties to that journey

🗓️ Everyone traveled during one expedition

📖 Not a list from scattered years

## ⚔️ Of The Sons Of Phinehas

Phinehas was Aaron's grandson, famous for stopping a plague through decisive action.

Numbers describes him ending Israel's judgment by executing open, public sin.

God promised his descendants an everlasting priesthood because of that zeal.

Naming his line first in this list honors that centuries old promise.

⚔️ Phinehas stopped a plague through bold action

🥇 His line is named first here

🙏 God rewarded zeal with priesthood

📖 The promise still held generations later

## 🔢 An Hundred And Fifty

These are not vague estimates, they are precise headcounts.

Each name led a clan bringing between fifty and three hundred men.

Added together, this list alone totals almost fifteen hundred men.

That number does not even count wives, children, priests, or Levites.

🔢 These are precise headcounts, not guesses

👨‍👩‍👧 Groups ranged from fifty to three hundred

📊 The list totals almost fifteen hundred men

📖 That number excludes women, children, and Levites

## 🚶 The Last Sons Of Adonikam

The word last signals something readers might miss without the earlier list.

Chapter two already named children of Adonikam who returned decades before.

These three men were simply the family's final holdouts joining later.

A family's return to Jerusalem could stretch across more than one generation.

🔗 Last points back to chapter two

👪 Adonikam's family already returned earlier

🚶 These three joined much later

📖 Return could span more than one generation

# Ezra 8:15-20
# 🌊 No Levites At The River Of Ahava
---
## 🌊 The River That Runneth To Ahava

Ahava was a river or canal somewhere in Babylonian territory.

Its exact location is unknown to historians today.

Ezra used it as a staging point before the long trip to Jerusalem.

Camping there let him organize thousands of people before departure.

🌊 Ahava was a river in Babylon

❓ Its exact location is unknown

⛺ Ezra staged the group there

📖 Organizing thousands took real planning

## 😕 Found There None Of The Sons Of Levi

This does not mean the Levites had died out completely.

Many Levites still lived comfortably back in Babylon.

Serving in Jerusalem's temple meant hard, unpaid labor far from home.

Few volunteered for that kind of sacrifice.

Ezra faced a temple bound for Jerusalem with no one ready to run it.

🚫 Levites had not died out

🏠 Many stayed comfortable in Babylon

😓 Temple service meant hard, unpaid work

📖 Ezra had no one to run it yet

## 🧠 Men Of Understanding

Ezra sent nine named leaders described as men of understanding.

Understanding here means wisdom and persuasive skill, not simple intelligence.

He needed men who could convince reluctant Levites to volunteer.

Choosing the right messengers mattered as much as the message itself.

🧠 Understanding means wisdom, not just intelligence

🗣️ They needed to persuade reluctant Levites

🎯 The right messengers mattered

📖 Good persuasion required good people

## 🏘️ Iddo The Chief At The Place Casiphia

Casiphia was a Jewish settlement in Babylon, its exact site unknown today.

Iddo apparently led a community of Levites and temple servants there.

Jewish life had organized itself even while still living in exile.

Ezra depended on that community's help, not on Persia's government.

🏘️ Casiphia was a Jewish settlement in Babylon

👤 Iddo led Levites and servants there

🕍 Jewish community life had organized in exile

📖 Ezra depended on that community, not Persia

## 🙌 By The Good Hand Of Our God Upon Us

This phrase already appeared twice in chapter seven describing God's guidance.

Here it explains why Iddo's community agreed to help at all.

Ezra credited God's involvement even in a private, human negotiation.

Nothing in this success felt accidental to him.

🔁 This phrase repeats from chapter seven

🤝 It explains Iddo's community helping

🙌 Ezra credited God, not persuasion alone

📖 Nothing felt accidental to him

# Ezra 8:21-23
# 🙏 The Fast By The River
---
## 🍽️ I Proclaimed A Fast

Fasting means going without food for a time to focus fully on God.

Ezra called for the whole company to fast together, not alone.

A shared fast bound thousands of strangers into one praying community.

This was a public act of dependence before a dangerous journey.

🍽️ Fasting means skipping food to seek God

👥 Ezra called the whole company to fast

🤝 A shared fast united strangers together

📖 It showed public dependence before danger

## 🛣️ To Seek Of Him A Right Way For Us

Right way here means safe passage, not moral guidance in general.

Ezra was asking specifically for physical protection on the road.

The road to Jerusalem passed through territory with real robbers and raiders.

This was a practical prayer for a practical danger.

🛣️ Right way means safe passage

🙏 Ezra asked for physical protection

⚔️ The road held real robbers and raiders

📖 This prayer was practical, not vague

## 🗣️ I Was Ashamed To Require A Band Of Soldiers

Ezra had already told Artaxerxes that God's hand protected those who sought him.

Asking for soldiers now would have contradicted his own words to the king.

His shame was about consistency, not fear of the journey itself.

Trusting God publicly meant refusing an obvious, available safety net.

🗣️ Ezra had already testified to the king

🚫 Asking for soldiers would contradict that

🎯 His shame was about consistency

📖 Trust meant refusing an easy safety net

## ✅ He Was Intreated Of Us

Intreated means God responded favorably to their fasting and prayer.

Verses that follow describe safe travel with the treasure and people.

The prayer was not simply spoken, it was actually answered.

Ezra's confidence in chapter seven proved justified in chapter eight.

🙏 Intreated means God responded favorably

🛡️ Safe travel followed this prayer

✅ The prayer was actually answered

📖 Ezra's earlier confidence proved justified

# Ezra 8:24-30
# ⚖️ Weighing The Treasure
---
## 🔢 I Separated Twelve Of The Chief Of The Priests

Twelve deliberately represented all twelve tribes of Israel.

That matched only a fraction of Israel actually present at this time.

Choosing twelve leaders symbolically included tribes that had barely any people present.

The number carried more weight than the headcount did.

🔢 Twelve represented all twelve tribes

📉 Only a fraction of Israel had returned

🤝 The number symbolically included everyone

📖 Symbolism outweighed the actual headcount

## ⚖️ Six Hundred And Fifty Talents Of Silver

A talent weighed about seventy five pounds, a huge ancient unit of weight.

Six hundred fifty talents came to nearly twenty five tons of silver.

That is an amount few private individuals ever handled at once.

Ezra was trusted with a small nation's worth of wealth.

⚖️ A talent weighed about seventy five pounds

📈 The total came to nearly twenty five tons

😮 Few people ever handled this much

📖 Ezra carried a nation's worth of wealth

## 🪙 Twenty Basons Of Gold, Of A Thousand Drams

A dram, also called a daric, was a small Persian gold coin.

A thousand drams gave a precise value to each golden bason.

Precise values made it easy to check that nothing went missing later.

Exact numbers protected everyone involved from suspicion.

🪙 A dram was a small Persian gold coin

📏 A thousand drams valued each bason

🔍 Precise numbers prevented missing items

📖 Exact records protected everyone from suspicion

## 🙏 Ye Are Holy Unto The Lord

Ezra told the priests that both they and the treasure were holy.

Holy means set apart for God's use, not for personal benefit.

Handling sacred silver required a different standard than ordinary money.

The charge reminded them exactly what they were carrying.

🙏 Holy means set apart for God

🚫 Not for personal benefit

⚖️ Sacred silver needed a higher standard

📖 The charge reminded them what they carried

## 👀 Watch Ye, And Keep Them

Ezra gave this order without hiring a single armed guard.

Watching and keeping meant personal vigilance, not military protection.

Trust in these priests replaced any professional security force.

The same faith that avoided soldiers in verse twenty two shows up again here.

👀 Watch and keep meant personal vigilance

🚫 No armed guard was hired

🤝 Trust replaced any security force

📖 The same faith from verse twenty two returns

# Ezra 8:31-32
# 🚶 The Journey Resumes
---
## 📅 We Departed From Ahava On The Twelfth Day

The company had already gathered at Ahava for at least twelve days.

That gathering time allowed the fast, the search for Levites, and the weighing.

None of chapter eight's events happened quickly or carelessly.

Careful preparation came before the actual journey began.

📅 Twelve days passed before departure

⏱️ That time covered fasting and weighing

🐢 Nothing here happened carelessly

📖 Preparation came before the journey

## 🔁 The Hand Of Our God Was Upon Us

This exact phrase has now appeared multiple times across these two chapters.

Each repetition credits God directly for a specific, practical outcome.

Ezra was not being poetic, he meant God intervened in real events.

Watching this phrase return again ties the whole journey together.

🔁 This phrase keeps repeating in Ezra

🙌 Each time credits a real outcome

🎯 Ezra meant literal intervention, not poetry

📖 The repetition ties the story together

## 🗡️ Delivered Us From The Enemy, And Such As Lay In Wait

Lay in wait describes bandits hiding along the road, ready to ambush.

This was the exact danger Ezra had refused a soldier escort against.

The threat Ezra feared enough to fast over was completely real.

God answered the specific prayer with a specific outcome.

🗡️ Bandits hid along the road ready to strike

😨 This was the danger Ezra feared

✅ The threat was completely real

📖 God answered a specific prayer specifically

## 😴 We Came To Jerusalem, And Abode There Three Days

Arriving safely did not mean the work was finished yet.

Three days of rest came before anything else happened.

A journey of several months earned at least a short pause.

Even faithful leaders needed recovery time before the next task.

🏁 Arrival did not finish the work

😴 Three days of rest came first

🕓 Months of travel earned a pause

📖 Even leaders needed recovery time

# Ezra 8:33-34
# 🏛️ Weighing It Before Witnesses
---
## 🔢 Now On The Fourth Day

The rest mentioned in verse thirty two ended after exactly three days.

Serious temple business resumed right after that pause was over.

Rest had a clear limit, it was not indefinite delay.

Ezra balanced real recovery with real responsibility.

🔢 Three days of rest had a limit

⏰ Business resumed right after

⚖️ Rest was balanced with responsibility

📖 Neither extreme won out here

## 👤 Meremoth The Son Of Uriah The Priest

This same Meremoth appears again years later in the book of Nehemiah.

There he personally repairs a section of Jerusalem's broken wall.

A man trusted with sacred treasure later proved trustworthy with sacred labor.

Watch for his name again in that later story.

👤 Meremoth reappears later in Nehemiah

🧱 There he repairs the city wall

🤝 Trust with treasure led to trust with labor

📖 Watch for his name again later

## 🔍 By Number And By Weight Of Every One

Every single item was counted and weighed a second time here.

This matched the exact weighing Ezra had done back at Ahava.

Two separate countings meant nothing could vanish along the way unnoticed.

The system meant no one needed to simply take anyone's word for it.

🔁 Everything was weighed a second time

📋 It matched the count from Ahava

🔍 Nothing could vanish unnoticed

📖 No one had to just trust blindly

## 📝 All The Weight Was Written At That Time

A written record turned a private handoff into a permanent public account.

Anyone could check these numbers later if a question ever came up.

Careful paperwork protected innocent people from false accusations.

Faithfulness here included plain, unglamorous documentation.

📝 Writing it down made it permanent

🔎 Anyone could check the numbers later

🛡️ Paperwork protected innocent people

📖 Faithfulness included plain documentation

# Ezra 8:35-36
# 🐂 Offerings And Orders Delivered
---
## 🔢 Twelve Bullocks For All Israel

Only a small fraction of Israel had actually made this journey.

The offering still represented all twelve tribes, not just those present.

Chapter six recorded this same twelve tribe pattern at the temple's dedication.

A small remnant kept acting on behalf of the whole nation.

🔢 Twelve stood for all Israel's tribes

📉 Only a small fraction had returned

🔗 Chapter six used this same pattern

📖 A remnant acted for the whole nation

## 🐐 Twelve He Goats For A Sin Offering

A sin offering atoned for wrongdoing before any other worship could continue.

Twelve goats again covered all Israel, not just the returning exiles.

Worship began by dealing honestly with guilt, not by skipping past it.

The order of these offerings was never accidental.

🐐 Twelve goats atoned for all Israel

🙏 Guilt was addressed before other worship

📋 The order of offerings mattered

📖 Worship never skipped past guilt here

## 📜 The King's Commissions Unto His Lieutenants And Governors

These were the official Persian letters granted back in chapter seven.

Delivering them made every earlier promise legally enforceable on the ground.

A decree meant nothing until local officials actually saw it in writing.

This quiet errand activated everything the king had authorized.

📜 These were chapter seven's official letters

⚖️ Delivery made every promise enforceable

👀 Officials needed to see it in writing

📖 This errand activated the king's decree

## 🤝 They Furthered The People, And The House Of God

Furthered means these officials actively helped rather than merely allowing the work.

Chapter four described officials in this same region stopping temple work by force.

The very system that once resisted rebuilding now assisted it directly.

Ezra's story closes with cooperation replacing the opposition it began with.

🤝 Furthered means active help, not permission

🛑 Chapter four showed the same region resisting

🔄 Opposition turned into cooperation

📖 The chapter ends where resistance once began
`.trim();

export const EZRA_EIGHT_PERSONAL_SECTIONS = parseEzraEightRawNotes(EZRA_EIGHT_RAW_NOTES);
