export type FirstKingsElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsElevenRawNotes(rawText: string): FirstKingsElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsEleven\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsEleven\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsEleven\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 11:${startVerse}` : `1 Kings 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 1 Kings 11 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_ELEVEN_RAW_NOTES = `# FirstKingsEleven 11:1-8
# 👑 But King Solomon Loved Many Strange Women
---
## 💔 Loved Many Strange Women

"Strange" here means foreign, not odd or unusual.

The word describes where these women came from, not their appearance.

God had already warned Israel against marrying into these very nations.

Solomon's fall began with a choice, not an accident.

💔 Strange means foreign, not odd
🌍 The women came from banned nations
📜 God warned against this exact marriage
📖 Solomon's fall began with a choice

---

## 👑 Together With The Daughter Of Pharaoh

This marriage already appeared back in chapter three.

Solomon married Pharaoh's daughter early in his reign for a political alliance.

Egypt was the strongest ally Israel could reach at the time.

That first marriage set the pattern this whole chapter now condemns.

👑 Pharaoh's daughter appeared in chapter three
🤝 The marriage sealed a political alliance
🌍 Egypt was the strongest ally available
📖 That pattern now returns to judge him

---

## 🗺️ Moabites, Ammonites, Edomites, Zidonians, And Hittites

This list names the exact nations Solomon married into.

Each nation worshipped its own gods instead of the LORD.

Moab and Ammon were old enemies who once opposed Israel in the wilderness.

The list reads like a roll call of Israel's historic rivals.

🗺️ Five separate foreign nations are named
🛐 Each nation worshipped its own gods
⚔️ Moab and Ammon were old rivals
📖 The list reads like a rival roll call

---

## 📜 Ye Shall Not Go In To Them, Neither Shall They Come In Unto You

This line quotes God's own command from the law given through Moses.

The command was not about ethnic prejudice.

It aimed at a spiritual danger, worship pulling away from the LORD.

Solomon breaks a command he almost certainly knew by heart.

📜 This quotes the law of Moses
🚫 The ban was never about ethnicity
🛐 It protected Israel's worship of the LORD
📖 Solomon broke a command he knew well

---

## 💞 Solomon Clave Unto These In Love

"Clave" is an old word meaning held fast or clung tightly.

The same word describes how a husband should cling to his wife.

Solomon aims that devotion at the wrong object entirely.

His clinging love was pointed at his wives, not at God.

💞 Clave means clung or held fast
💍 The word usually describes marriage devotion
❌ Solomon aimed that devotion wrongly
📖 His love pulled him from God

---

## 👑 Seven Hundred Wives, Princesses, And Three Hundred Concubines

One thousand women in total lived under Solomon's household.

Most of these marriages sealed political treaties, not romance.

"Princesses" means these women came from royal foreign families.

A king with this many alliances had influence pouring in from every direction.

👑 One thousand women total, by treaty mostly
🤝 Marriages sealed political alliances
👸 Princesses came from royal families
📖 Influence poured in from every direction

---

## 💔 His Wives Turned Away His Heart

The text names the exact mechanism behind Solomon's decline.

It was not a sudden decision to abandon God.

It was hundreds of quiet influences pulling him slowly off course.

A wise king still needed to guard what shaped his own heart.

💔 His heart turned slowly, not suddenly
🗣️ Hundreds of voices shaped him daily
🧠 Even wise kings need guarded hearts
📖 Small pulls added up to a fall

---

## ⏳ When Solomon Was Old

This decline did not happen early in Solomon's reign.

It crept in gradually across decades of comfort and power.

Old age often loosens the guard a person kept in their younger years.

Solomon's story warns that faithfulness must last a whole lifetime.

⏳ The fall came late, not early
🕰️ Decades of comfort wore down his guard
👴 Old age can loosen old discipline
📖 Faithfulness must last a whole lifetime

---

## ⚖️ As Was The Heart Of David His Father

David sinned badly at times, adultery and murder among them.

Yet David's heart always turned back fully to the LORD after failing.

Solomon's heart drifts and never fully returns in this account.

The comparison is not about a perfect man, it is about a returning heart.

⚖️ David sinned but always returned
🙏 Solomon drifted without returning
🔁 The difference is repentance, not perfection
📖 A returning heart is what God measures

---

## 🛐 Ashtoreth The Goddess Of The Zidonians

Ashtoreth was a fertility and war goddess worshipped across the ancient Near East.

The Zidonians were a Phoenician people known for trade and craftsmanship.

Worshipping her meant rituals the law of Moses directly forbade.

Solomon builds space for a religion he was warned about by name.

🛐 Ashtoreth was a fertility goddess
🌊 Zidonians were Phoenician trading people
🚫 Her worship was directly forbidden
📖 Solomon welcomed what he was warned against

---

## 😨 Milcom The Abomination Of The Ammonites

Milcom was the national god of the Ammonites, also called Molech elsewhere.

"Abomination" here means something God finds utterly detestable.

Worship of this god is later linked to child sacrifice.

Calling a god an abomination is the strongest condemnation the text offers.

😨 Milcom was the Ammonite national god
🔥 Also known elsewhere as Molech
🚫 Abomination means utterly detestable to God
📖 This is the text's strongest condemnation

---

## 🏔️ Built An High Place For Chemosh... In The Hill That Is Before Jerusalem

Chemosh was the national god of Moab, another forbidden deity.

A "high place" was an open air shrine built for sacrifice and worship.

Solomon built this one on a hill directly facing Jerusalem and the temple.

The location made the betrayal visible, not hidden away in secret.

🏔️ Chemosh was Moab's national god
⛩️ A high place was an open shrine
👁️ It stood in plain sight of Jerusalem
📖 The betrayal was visible, not hidden

---

## 🔥 Burnt Incense And Sacrificed Unto Their Gods

Solomon did not merely tolerate his wives' religions in private.

He built the physical shrines that made worship possible.

That is a much bigger step than looking the other way.

The man who built the temple for the LORD also built altars against Him.

🔥 Solomon built the shrines himself
🏗️ This went past private tolerance
🛕 He enabled worship, not just ignored it
📖 Temple builder became altar builder too

# FirstKingsEleven 11:9-13
# 😠 The LORD Was Angry With Solomon
---
## 🌟 Which Had Appeared Unto Him Twice

God did not judge Solomon over a lapse he never noticed.

The LORD had personally appeared to Solomon on two separate occasions.

Both appearances included clear warnings against chasing other gods.

Solomon's disobedience came with no excuse of ignorance.

🌟 God appeared to Solomon twice
🗣️ Both times carried a clear warning
🙅 Solomon cannot claim he did not know
📖 His disobedience was fully informed

---

## ⚡ I Will Surely Rend The Kingdom From Thee

"Rend" means to tear violently apart, the same word used for torn cloth.

God announces He will tear the united kingdom Solomon inherited.

This judgment lands as a direct consequence, not a random disaster.

The kingdom Solomon built will not survive intact past his own reign.

⚡ Rend means to tear violently
👑 The united kingdom will be torn apart
🔗 This is consequence, not coincidence
📖 Unity ends with Solomon's own reign

---

## 🙇 Give It To Thy Servant

God already names the future king, though not yet by name here.

That servant will be revealed as Jeroboam later in this same chapter.

A servant rising to rule over most of the kingdom was a stunning reversal.

God can raise a new ruler from anywhere He chooses.

🙇 The future king is a servant
🔮 Jeroboam is revealed later in the chapter
🔃 A servant rising to rule was stunning
📖 God raises rulers from anywhere He chooses

---

## ⏳ Notwithstanding In Thy Days I Will Not Do It

"Notwithstanding" is an old word meaning despite this or even so.

God delays the judgment so it will not fall during Solomon's own lifetime.

The delay was a mercy, not a change of decision.

Solomon still gets to reign in peace to the end of his days.

⏳ Notwithstanding means despite this
🕊️ Judgment is delayed past Solomon's lifetime
🙏 The delay was an act of mercy
📖 Solomon still reigned in peace

---

## 💛 For David Thy Father's Sake

The mercy shown here traces back to a man who died years earlier.

God honors a covenant promise made to David long before Solomon sinned.

David's faithfulness still shields his son from the full weight of judgment.

A parent's walk with God can shape the mercy shown to their children.

💛 The mercy points back to David
🤝 God honors an old covenant promise
🛡️ David's faithfulness still shields Solomon
📖 A parent's faith can shape a child's mercy

---

## 🕎 I Will Not Rend Away All The Kingdom, But Will Give One Tribe To Thy Son

God softens the sentence a second time before finishing the announcement.

One tribe will remain under David's family line no matter what happens.

That single tribe keeps God's promise to David technically unbroken.

A small remnant preserved on purpose is a pattern that repeats throughout the Bible.

🕎 One tribe stays with David's line
🤝 David's promise remains technically unbroken
🌱 A small remnant is preserved on purpose
📖 Remnant preservation repeats through scripture

# FirstKingsEleven 11:14-19
# ⚔️ The LORD Stirred Up An Adversary, Hadad The Edomite
---
## ⚔️ The LORD Stirred Up An Adversary Unto Solomon

God Himself raises up trouble as part of Solomon's judgment.

An adversary here means a political and military opponent, not a demon.

The peace Solomon enjoyed his whole reign starts cracking from the outside.

God can use enemies as tools of discipline, not just blessing as reward.

⚔️ Adversary means a political opponent
🕊️ Solomon's long peace begins cracking
🎯 God uses enemies as discipline
📖 Blessing and judgment both come from God

---

## 👑 He Was Of The King's Seed In Edom

Hadad was not a random rebel, he was Edomite royalty.

That royal blood gave him real standing and support inside Edom.

A judgment from God often uses someone with genuine standing to carry it out.

This detail explains why Hadad could gather followers so easily later.

👑 Hadad came from Edom's royal line
🗺️ Royal blood gave him real support
🎯 God used someone with real standing
📖 This explains his later following

---

## ⚰️ Joab The Captain Of The Host Was Gone Up To Bury The Slain

This callback points back to David's earlier war against Edom.

Joab was David's top military commander for many years.

"The slain" refers to Israelite soldiers killed in that earlier battle.

Burying the dead properly mattered deeply in ancient Israelite custom.

⚰️ This recalls David's earlier war
🗡️ Joab was David's top commander
🪦 The slain were Israelite soldiers
📖 Proper burial mattered in this culture

---

## 💀 Until He Had Cut Off Every Male In Edom

Joab's campaign in Edom was total, not a limited strike.

Killing every male aimed to permanently break Edom's ability to fight back.

This harsh ancient warfare tactic explains why Edom still hated Israel decades later.

Hadad's whole story begins as a child fleeing this exact massacre.

💀 The campaign targeted every male
🎯 The goal was to end resistance
😡 This explains lasting Edomite hatred
📖 Hadad fled this very massacre

---

## 👶 Hadad Being Yet A Little Child

Hadad escaped Edom as a young boy, not a grown warrior.

Loyal servants carried him to safety through Midian and Paran first.

He grew up entirely outside his homeland, shaped by exile.

A child who escapes tragedy can still grow up to change history.

👶 Hadad fled while still a child
🏃 Servants carried him through Midian and Paran
🌍 Exile shaped his entire upbringing
📖 A rescued child later shaped history

---

## 🐫 They Came To Egypt, Unto Pharaoh King Of Egypt

Egypt regularly sheltered political refugees from surrounding nations in this era.

This Pharaoh is a different ruler than the one from Solomon's own marriage.

Egypt could afford to host a future rival to Israel with no immediate cost.

Sheltering Hadad let Egypt keep leverage against Israel for later use.

🐫 Egypt often sheltered political refugees
👑 This is a different Pharaoh than Solomon's
🎯 Egypt gained leverage at little cost
📖 Refuge here doubled as strategy

---

## 💍 Hadad Found Great Favour In The Sight Of Pharaoh

Pharaoh gave Hadad his own wife's sister in marriage.

That marriage tied Hadad directly into the Egyptian royal family itself.

A refugee child had grown into a trusted member of Pharaoh's own household.

Egypt was not just hiding Solomon's future rival, it was welcoming him as family.

💍 Pharaoh gave Hadad his wife's sister
👑 The marriage joined Hadad to Egyptian royalty
📈 A refugee became a trusted insider
📖 Egypt welcomed a rival as family

# FirstKingsEleven 11:20-22
# 🏛️ Hadad Prepares To Return Home
---
## 🍼 Genubath Was In Pharaoh's Household Among The Sons Of Pharaoh

Hadad's son grows up as a member of the Egyptian royal household itself.

Tahpenes the queen personally raised and weaned this child.

Being counted among Pharaoh's own sons meant genuine royal status, not simply refugee shelter.

Hadad's whole family had become woven into Egypt by the time he asks to leave.

🍼 Genubath grew up in Pharaoh's house
👑 Tahpenes personally raised him
🏛️ He held real royal status there
📖 Hadad's family was woven into Egypt

---

## 💤 When Hadad Heard That David Slept With His Fathers

"Slept with his fathers" is a common Old Testament way of saying someone died.

Hadad had waited for this exact news for years in exile.

David's death meant the man who destroyed his homeland was finally gone.

Joab's death removed the second major threat standing in Hadad's way.

💤 Slept with his fathers means died
⏳ Hadad had waited years for this
🕊️ David's death removed his old enemy
📖 Joab's death cleared his path further

---

## 🚶 Let Me Depart, That I May Go To Mine Own Country

Hadad finally asks Pharaoh's permission to return home to Edom.

Pharaoh's question back to him hints at genuine reluctance to let him go.

Hadad refuses to explain his real reason, he simply insists on leaving.

His return sets up direct conflict with Solomon for the rest of his reign.

🚶 Hadad asks to return to Edom
❓ Pharaoh questions his reason for leaving
🤐 Hadad gives no real explanation
📖 His return sets up conflict with Solomon

# FirstKingsEleven 11:23-25
# ➕ God Stirred Him Up Another Adversary, Rezon
---
## ➕ God Stirred Him Up Another Adversary

Rezon is the second adversary God raises against Solomon in this chapter.

The judgment against Solomon comes from more than one direction at once.

Two separate enemies rising at the same time is not a coincidence.

God's discipline can arrive through several pressures working together.

➕ Rezon is the second adversary
🌍 Trouble now comes from two directions
🎯 Two enemies together is no accident
📖 Discipline can arrive as combined pressure

---

## 🏃 Fled From His Lord Hadadezer King Of Zobah

Rezon started out as a servant to a defeated Syrian king.

David had already conquered Zobah and its king years earlier in his own reign.

Rezon refused to accept that defeat, and fled instead of surrendering.

Some enemies of Israel are built from people who never accepted an old loss.

🏃 Rezon served the defeated king Hadadezer
⚔️ David had already conquered Zobah
🙅 Rezon refused to accept that defeat
📖 Old losses can breed new enemies

---

## 🏛️ Reigned In Damascus

Rezon builds himself an entirely new kingdom centered on Damascus.

Damascus becomes the capital of a lasting Syrian power for centuries afterward.

This new kingdom will trouble Israel long after Solomon himself is gone.

One fugitive's grudge grows into a nation that outlasts him.

🏛️ Rezon made Damascus his capital
🌍 Syria became a lasting power there
⏳ This kingdom outlasted Solomon's own reign
📖 One man's grudge became a nation

---

## 😡 He Abhorred Israel, And Reigned Over Syria

"Abhorred" means Rezon hated Israel with deep, lasting intensity.

That hatred was not private, he ruled an entire kingdom shaped by it.

Solomon now faces open hostility on two separate borders at once.

The peaceful kingdom David and Solomon built keeps shrinking under outside pressure.

😡 Abhorred means deep lasting hatred
🏛️ His whole kingdom shared that hatred
🗺️ Solomon faced hostility on two borders
📖 Outside pressure kept shrinking Solomon's peace

# FirstKingsEleven 11:26-31
# ✊ Jeroboam Lifted Up His Hand Against The King
---
## 📍 Jeroboam The Son Of Nebat, An Ephrathite Of Zereda

Jeroboam comes from the tribe of Ephraim, not from David's own tribe of Judah.

Zereda was a town within Ephraim's territory.

A future king rising from outside Judah was a genuinely unusual turn.

This detail sets up the coming split between two rival tribal loyalties.

📍 Jeroboam came from Ephraim, not Judah
🏘️ Zereda sat inside Ephraim's territory
🔀 A king from outside Judah was unusual
📖 This sets up a coming tribal split

---

## 👩 Whose Mother's Name Was Zeruah, A Widow Woman

Jeroboam grew up in a home without a father present.

Naming his mother and her widowhood highlights his humble beginnings.

He rises to national importance despite starting from a disadvantaged household.

The text quietly contrasts his ordinary origin with the throne ahead of him.

👩 Jeroboam grew up fatherless
🏠 His mother's widowhood marks humble roots
📈 He rose despite a hard start
📖 Ordinary origin, extraordinary future throne

---

## ✊ He Lifted Up His Hand Against The King

This phrase describes open rebellion, not a single violent gesture.

The very next verse explains exactly what triggered that rebellion.

Jeroboam's uprising grows directly out of Solomon's own building projects.

God had already announced this rebellion back in verse eleven.

✊ Lifted up his hand means rebelled
📜 The next verse explains the trigger
🏗️ Solomon's own projects caused the anger
📖 God already announced this outcome

---

## 🧱 Solomon Built Millo, And Repaired The Breaches Of The City Of David

"Millo" was a major structural fill built to support Jerusalem's fortifications.

"Breaches" here means gaps or damage in the city's defensive walls.

These massive building projects likely required heavy forced labor from Israelite workers.

Ordinary people paid the real cost of Solomon's impressive construction record.

🧱 Millo was a major fortification project
🏚️ Breaches means gaps in the city wall
👷 Heavy labor likely came from Israelites
📖 Ordinary people paid the real cost

---

## 💪 The Man Jeroboam Was A Mighty Man Of Valour

Solomon does not promote Jeroboam by accident or favoritism.

Jeroboam earns this position through real ability and hard work.

"Ruler over the house of Joseph" means overseer of forced labor from Ephraim and Manasseh.

Solomon unknowingly places real power in the hands of his own future rival.

💪 Valour means real skill and courage
📈 Jeroboam earned his promotion
👷 He oversaw labor from Joseph's tribes
📖 Solomon empowered his own future rival

---

## 🧥 Ahijah The Shilonite Found Him In The Way

Shiloh was an older worship center from before the temple existed in Jerusalem.

Ahijah meets Jeroboam alone, away from any city or witnesses.

The prophet wears a brand new garment specifically for this meeting.

Everything about the setting signals this encounter carries real prophetic weight.

🧥 Shiloh was an older worship center
🚶 The two men met completely alone
👕 Ahijah wore a brand new garment
📖 The setting signaled real prophetic weight

---

## ✂️ Rent It In Twelve Pieces

"Rent" means torn, the same violent tearing word God used back in verse eleven.

Twelve pieces represent the twelve tribes descended from Jacob's sons.

Tearing the garment acted out the coming split before it actually happened.

Ancient prophets often used physical actions like this to make a message unforgettable.

✂️ Rent means torn apart
🕎 Twelve pieces represent Israel's twelve tribes
🎭 The action previewed the coming split
📖 Prophets used actions to make messages stick

---

## 🔟 Take Thee Ten Pieces

Ahijah hands Jeroboam ten of the twelve torn pieces of the garment.

Ten tribes represent the majority of the kingdom about to split away.

This prophecy names Jeroboam as Israel's future king before he ever seeks power.

God moves first here, Jeroboam simply receives what is already decided.

🔟 Ten pieces means ten whole tribes
👑 Jeroboam is named the future king
⏳ This came before he sought power
📖 God moved first, Jeroboam only received

# FirstKingsEleven 11:32-39
# 🕎 I Will Give Ten Tribes To Thee
---
## 🏙️ For My Servant David's Sake, And For Jerusalem's Sake, Which I Have Chosen

God repeats His reasons for sparing part of the kingdom, this time in fuller detail.

David's covenant loyalty still counts even though David has already died.

Jerusalem itself is named as a chosen city, not just a political capital.

Both reasons point back to promises God made, not anything Rehoboam himself earns.

🏙️ Jerusalem is named a chosen city
🤝 David's loyalty still counts after death
🎁 Neither reason depends on Rehoboam earning it
📖 Both reasons trace back to God's promises

---

## 🚫 Because That They Have Forsaken Me

God finally states the core charge plainly, using the word forsaken.

"Forsaken" means abandoned completely, not merely neglected for a season.

The verse lists Ashtoreth, Chemosh, and Milcom together as the specific gods involved.

Naming all three idols together makes the charge concrete instead of vague.

🚫 Forsaken means completely abandoned
🛐 Three named idols make the charge specific
📜 This matches exactly what chapter eleven opened with
📖 A concrete charge, not a vague one

---

## 👁️ To Do That Which Is Right In Mine Eyes

This phrase sets the standard God actually expected from Solomon.

"Right in mine eyes" means measured by God's own judgment, not popular opinion.

Solomon had immense wisdom for judging between people but failed this deeper test.

Wisdom for other people's problems is not the same as obedience in your own life.

👁️ Right in mine eyes means God's standard
⚖️ Popular opinion was never the measure
🧠 Solomon's wisdom did not guarantee obedience
📖 Wisdom for others is not obedience for self

---

## 🤴 I Will Make Him Prince All The Days Of His Life

Solomon keeps his throne for the rest of his own natural life.

The word "prince" here still means reigning king, an older use of the term.

This mercy again traces back only to David, not to Solomon's own record.

The judgment on the kingdom is real, but it is also deliberately delayed.

🤴 Prince here still means reigning king
⏳ Solomon keeps his throne for life
🤝 The mercy traces back to David again
📖 Real judgment, deliberately delayed

---

## 🕯️ That David My Servant May Have A Light Alway Before Me

"A light" is a common Old Testament picture for an ongoing royal line.

A lamp kept burning in a household signaled that life and hope continued there.

God promises David's family line will not go completely dark, even after this split.

One surviving tribe keeps that promised lamp technically still burning.

🕯️ A light pictures an ongoing royal line
🏠 A burning lamp signaled continuing life
🌑 God promises the line will not go dark
📖 One tribe keeps that lamp burning

---

## 🎯 Reign According To All That Thy Soul Desireth

God grants Jeroboam remarkably wide freedom over how he will rule.

"Thy soul desireth" means according to Jeroboam's own genuine wishes.

This generous offer comes with a clear condition attached in the very next verse.

How Jeroboam actually uses this freedom becomes the real test still ahead.

🎯 God grants Jeroboam wide freedom
💭 Soul desireth means his own genuine wishes
📜 A clear condition follows immediately after
📖 How he uses freedom becomes the real test

---

## 🏠 I Will Build Thee A Sure House, As I Built For David

God offers Jeroboam the same kind of lasting dynasty David received.

"A sure house" means a secure, lasting family line of kings.

This is an enormous offer, a real second chance at David's own covenant.

Jeroboam's own choices later in the story determine whether this offer holds.

🏠 A sure house means a lasting dynasty
🎁 This mirrors David's own covenant offer
🔄 It amounts to a genuine second chance
📖 Jeroboam's own choices decide the outcome

---

## ⏳ I Will For This Afflict The Seed Of David, But Not For Ever

God names real, painful consequences coming for David's family line.

"Afflict" means to bring hardship or suffering, not to destroy completely.

The phrase "not for ever" promises this judgment has a genuine limit.

Even in serious discipline, God leaves the door open for future restoration.

⏳ Afflict means hardship, not destruction
🚪 Not for ever promises a real limit
🔨 David's line faces genuine consequences
📖 Discipline here still leaves room for restoration

# FirstKingsEleven 11:40-43
# 👑 Solomon Slept With His Fathers
---
## 🗡️ Solomon Sought Therefore To Kill Jeroboam

Solomon responds to the prophecy with violence instead of repentance.

Trying to kill the man God already chose does not stop God's plan.

This mirrors how other biblical kings reacted badly to hard prophetic news.

Fighting a prophecy never once succeeds anywhere in the Bible's own story.

🗡️ Solomon reacted with violence, not repentance
🎯 Killing Jeroboam could not undo the plan
🔁 Other kings reacted the same bad way
📖 No one ever defeats a true prophecy

---

## 🏃 Fled Into Egypt, Unto Shishak King Of Egypt

Shishak was a real Egyptian pharaoh, later confirmed in Egyptian records.

Jeroboam finds safety in the same nation that once sheltered Hadad.

Egypt again becomes a refuge for someone opposing Solomon's throne.

This exile keeps Jeroboam alive and ready for the moment ahead.

🏃 Shishak was a real historical pharaoh
🌍 Egypt again sheltered a rival of Solomon
🛡️ Exile kept Jeroboam safe until his time
📖 Egypt shows up twice in this chapter's story

---

## 📚 Written In The Book Of The Acts Of Solomon

This book is mentioned as an outside historical source, not scripture itself.

It has not survived to the present day.

First and Second Kings summarize it, they do not reprint it in full.

Ancient readers could have checked this source for themselves.

📚 A now lost outside historical source
🗂️ Kings summarizes it, does not reprint it
🔍 Ancient readers could have checked it themselves
📖 The Bible names sources without calling them scripture

---

## 🕰️ The Time That Solomon Reigned In Jerusalem Over All Israel Was Forty Years

Forty years matches the length of both Saul's and David's reigns before him.

That round number likely also carries a symbolic weight of a completed era.

This is also the last time the text calls it "all Israel" as one kingdom.

The next chapter begins the permanent split into two separate nations.

🕰️ Forty years matches Saul and David's reigns
🔢 The number carries symbolic weight
🇮🇱 This is the last united all Israel
📖 The next chapter begins a lasting split

---

## 👑 Rehoboam His Son Reigned In His Stead

The throne passes smoothly to Solomon's son with no immediate contest.

Rehoboam inherits an enormous kingdom already carrying deep internal cracks.

Everything the reader just learned in this chapter is about to explode under him.

Rehoboam's story picks up directly in the very next chapter.

👑 Rehoboam inherits the throne peacefully
💔 He inherits deep internal cracks too
💣 This chapter's tensions explode under him
📖 His story continues in chapter twelve
`.trim();

export const FIRST_KINGS_ELEVEN_PERSONAL_SECTIONS = parseFirstKingsElevenRawNotes(FIRST_KINGS_ELEVEN_RAW_NOTES);
