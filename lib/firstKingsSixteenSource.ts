export type FirstKingsSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsSixteenRawNotes(rawText: string): FirstKingsSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsSixteen\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsSixteen\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsSixteen\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 16:${startVerse}` : `1 Kings 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Kings 16 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_SIXTEEN_RAW_NOTES = `# FirstKingsSixteen 16:1-7
# ⚖️ Prophecy Against Baasha
---
## 📜 The Word Of The LORD Came To Jehu The Son Of Hanani

The phrase "the word of the LORD came to" introduces a brand new prophet's message.

Jehu the son of Hanani is a different man from the King Jehu introduced many chapters later.

This prophet Jehu is mentioned only here and once more in Second Chronicles.

God uses unfamiliar, one time messengers just as often as He uses famous ones.

📜 A new prophet's message begins here

👤 This Jehu differs from the later king

📚 He appears only here and in Chronicles

📖 God can use even obscure messengers

## 🌪️ I Exalted Thee Out Of The Dust

"Out of the dust" means God raised Baasha up from a low, unimportant position.

Baasha was not born into Israel's royal family at all.

He seized the throne by killing King Nadab in the previous chapter.

God still calls that rise His own doing, even though Baasha used violence to get there.

🌪️ Out of the dust means raised from nothing

👑 Baasha was not born into royalty

🗡️ He took the throne by killing Nadab

📖 God still calls that rise His own work

## 👑 Made Thee Prince Over My People Israel

Prince here simply means king or ruler over Israel.

Israel is called "my people" because they belong to God first, not to any king.

Kings in Israel were always meant to rule under God, not in His place.

Calling Baasha prince, not just king, quietly reminds him whose kingdom this really is.

👑 Prince here simply means king or ruler

🤝 My people shows Israel belongs to God

⚖️ Kings ruled under God, not in His place

📖 Baasha's throne was never fully his own

## 🚶 Thou Hast Walked In The Way Of Jeroboam

Walking in someone's way means copying their pattern of behavior on purpose.

Jeroboam was Israel's first king after the kingdom split from Judah.

He built golden calves at Bethel and Dan so people would not travel to worship in Jerusalem.

Baasha kept that same false worship system running instead of tearing it down.

🚶 Walking in someone's way means copying them

👑 Jeroboam was Israel's very first king

🐂 He built golden calves at Bethel and Dan

📖 Baasha kept that same system running

## 😠 Provoke Me To Anger With Their Sins

Provoke means to deliberately stir up a strong reaction.

This was not one accidental mistake by one person.

It describes a whole nation's sin building up over time.

God names the anger plainly instead of staying silent about it.

😠 Provoke means to deliberately stir up anger

🌍 This was not one small mistake

📈 A whole nation's sin built up over time

📖 God names the anger plainly here

## 📜 Make Thy House Like The House Of Jeroboam

This is a formal curse pronounced against Baasha's entire family line.

Jeroboam's house was already wiped out completely in the previous chapter.

God now promises Baasha's descendants the exact same fate.

The same sin brought the same prophet and now the same judgment.

📜 This is a formal curse on his family

💀 Jeroboam's whole house was already destroyed

⚖️ Baasha's descendants now face that same fate

📖 The same sin brings the same judgment

## ⚰️ The Dogs Shall Eat, And The Fowls Of The Air Shall Eat

In this culture, a proper burial mattered deeply to families.

This curse promises the opposite, an unburied and dishonored death.

Dogs and birds eating a body was considered a shameful, public disgrace.

This is the exact same curse God gave against Jeroboam's family in the last chapter.

⚰️ Proper burial mattered deeply in this culture

🐕 This curse promises the opposite, no burial

😔 Dogs and birds eating a body was shameful

📖 The same curse once given to Jeroboam

## 📚 Written In The Book Of The Chronicles Of The Kings Of Israel

This closing formula marks the end of a king's official record.

The book of the chronicles of the kings of Israel is a separate royal record.

It is not the same as First and Second Chronicles in the Bible.

That record has been lost, though Baasha's reign clearly filled more pages than this.

📚 This formula closes a king's official record

📜 It names a separate, now lost record

📖 It differs from First and Second Chronicles

➡️ Baasha's reign filled more pages than this

## 😴 Baasha Slept With His Fathers, And Was Buried In Tirzah

Slept with his fathers is a gentle, common way of describing death.

Tirzah was Israel's capital city at this point in its history.

Baasha himself received a normal, honored burial in that capital.

The curse from earlier in this chapter would fall on his descendants, not on him personally.

😴 A gentle phrase for death

🏙️ Tirzah was Israel's capital city

⚰️ Baasha himself received a normal burial

📖 The curse falls on his line, not him

## 👑 Elah His Son Reigned In His Stead

Elah now becomes the next king of Israel.

His reign will turn out to be very short, covered later in this same chapter.

Baasha's dynasty is about to end almost as fast as it began.

God's warning in this chapter is already beginning to come true.

👑 Elah becomes the next king of Israel

⏳ His reign will turn out very short

🔁 His new dynasty will not last long

📖 God's warning is already coming true

## ✋ By The Hand Of The Prophet Jehu The Son Of Hanani

By the hand of means through, or by means of, a specific person.

God's message needed a human messenger to actually reach Baasha.

This same Jehu named at the start of this chapter now delivers the full weight of that word.

The prophet's job was simply to speak, not to soften what God had said.

✋ By the hand of means through someone

📣 God's message needed a human messenger

👤 This is the same Jehu from verse one

📖 The prophet spoke, he did not soften it

## 🗡️ Because He Killed Him

He killed him refers back to Baasha assassinating King Nadab in the previous chapter.

Baasha carried out God's judgment on Jeroboam's family by ending Nadab's rule.

Even so, murder is still murder, and Baasha is held responsible for the act itself.

Being used by God to judge someone does not erase personal guilt for how it was done.

🗡️ This recalls Baasha killing King Nadab

⚖️ Baasha carried out God's judgment on Jeroboam

😔 Murder is still murder either way

📖 Being God's tool does not erase guilt

# FirstKingsSixteen 16:8-14
# 🍷 Elah Falls To Zimri's Conspiracy
---
## 📅 In The Twenty And Sixth Year Of Asa King Of Judah

Kings in this book are dated by both kingdoms' calendars at once.

Elah begins ruling Israel during the twenty sixth year of Asa's reign in Judah.

This same dual dating system already marked Baasha's reign in the last chapter.

It lets readers track two kingdoms on one shared timeline.

📅 Kings are dated by both kingdoms at once

👑 Elah begins in Asa's twenty sixth year

🔁 The same system marked Baasha's reign too

📖 One shared timeline tracks two kingdoms

## 👑 Began Elah The Son Of Baasha To Reign Over Israel

Elah is Baasha's own son, taking the throne after him.

His reign lasted only two years, far shorter than his father's.

The prophecy against Baasha's house from earlier in this chapter is about to strike his family directly.

A short reign in this book is often a warning sign of trouble ahead.

👑 Elah is Baasha's own son

⏳ His reign lasted only two years

⚠️ The earlier prophecy is about to strike

📖 A short reign often signals coming trouble

## 👤 Zimri, Captain Of Half His Chariots, Conspired Against Him

Zimri was one of Elah's own officers, not an outsider.

Captain of half his chariots means he commanded part of Israel's chariot forces.

Chariots were an elite, expensive part of any ancient army.

Someone trusted with real military power turned that power against his own king.

👤 Zimri was one of Elah's own officers

🏇 He commanded half of Israel's chariots

💰 Chariots were an elite, expensive military force

📖 Trusted power turned against the king himself

## 🍷 Drinking Himself Drunk In The House Of Arza

Elah was not at the palace when Zimri struck.

He was drinking heavily at the private home of Arza, his palace steward.

A steward managed the daily business of the king's household.

A drunk, distracted king made an easy target for a sudden attack.

🍷 Elah was drinking heavily, not ruling

🏠 Arza was his palace steward

🔑 A steward managed the king's household

📖 A distracted king made an easy target

## 🗡️ Zimri Went In And Smote Him, And Killed Him

Zimri struck while Elah had no guard up at all.

This happened in the twenty seventh year of Asa, just one year after Elah began ruling.

Zimri then simply took the throne for himself.

Israel now has its third king in a very short span of years.

🗡️ Zimri struck while Elah had no guard

📅 This happened in Asa's twenty seventh year

👑 Zimri simply took the throne himself

📖 Israel's third king in a short span

## 🚫 He Left Him Not One That Pisseth Against A Wall

This blunt phrase is an old way of saying every single male.

Zimri did not spare a single man connected to Baasha's family.

He also killed Baasha's kinsfolk and friends, not just his direct relatives.

Wiping out an entire family line this completely was meant to prevent any future revenge.

🚫 This phrase means every single male

👪 Zimri spared no one in Baasha's family

🤝 Even friends and distant kin were killed

📖 A complete wipeout prevented future revenge

## 📜 Thus Did Zimri Destroy All The House Of Baasha

This violence fulfills the exact word God spoke through Jehu earlier in this chapter.

God had promised Baasha's line would end like Jeroboam's line before it.

Zimri does not know it, but he is carrying out God's own judgment.

God can use even a violent, self serving man to keep His word.

📜 This fulfills God's word from earlier

⚖️ God promised Baasha's line would end

🗡️ Zimri unknowingly carries out God's judgment

📖 God can use even a violent man

## 👨‍👦 For All The Sins Of Baasha, And The Sins Of Elah His Son

This verse explains why judgment fell on both father and son together.

Elah never turned away from his father's sins during his short reign.

Both men made Israel to sin in the exact same way as Jeroboam.

The whole family is judged as one because they shared the same guilt.

👨‍👦 Judgment fell on both father and son

😔 Elah never turned from his father's sins

🐂 Both repeated the same sin as Jeroboam

📖 Shared guilt brought shared judgment

## 🐂 Provoking The LORD God Of Israel To Anger With Their Vanities

Vanities here is another word for idols.

The Bible often calls false gods vanities because they are empty and worthless.

An idol cannot see, hear, act, or save anyone who worships it.

Calling them vanities is a direct insult to how powerless they really are.

🐂 Vanities is another word for idols

🕳️ Idols are called empty and worthless

👁️ An idol cannot see, hear, or act

📖 The word itself insults their powerlessness

## 📚 The Rest Of The Acts Of Elah, And All That He Did

This is the same closing formula used for Baasha earlier in the chapter.

It marks the end of Elah's brief, two year reign.

A short reign still apparently had its own written record.

That record, like the others, has not survived to today.

📚 Same closing formula as Baasha's record

⏳ It closes Elah's brief two year reign

📜 Even a short reign got its own record

📖 None of these records survived to today

# FirstKingsSixteen 16:15-20
# 🚪 Zimri's Seven Day Reign
---
## ⏳ Zimri Did Reign Seven Days In Tirzah

Seven days is the shortest reign of any king in the entire Bible.

Zimri seized the throne through murder and lost it almost as fast.

The army was away at Gibbethon, the same city where Nadab was killed in the last chapter.

A stolen throne can crumble even faster than it was taken.

⏳ Seven days, the shortest reign in the Bible

🗡️ Zimri seized power and lost it fast

📍 The army was away at Gibbethon again

📖 A stolen throne can crumble just as fast

## 🎖️ All Israel Made Omri, The Captain Of The Host, King

Captain of the host means commander of Israel's entire army.

Israel's own soldiers, not any royal family, chose their next king.

This kind of battlefield decision was common when a throne suddenly opened up.

Omri now has an army fully behind him before he even reaches the capital.

🎖️ Captain of the host means army commander

⚔️ Soldiers themselves chose Israel's next king

🏕️ This happened right there in the army camp

📖 Omri already had an army behind him

## 🚶 Omri Went Up From Gibbethon, And They Besieged Tirzah

Omri marched his army straight from the battlefield to the capital.

Besieged means surrounding a city to cut it off and force a surrender.

Zimri was now trapped inside his own capital with no army of his own.

The hunter from Gibbethon has become the one being hunted.

🚶 Omri marched from the battlefield to Tirzah

🏰 Besieged means surrounding a city to force surrender

🔒 Zimri was trapped with no army left

📖 The hunter became the one being hunted

## 👀 When Zimri Saw That The City Was Taken

Zimri realized defeat only after Omri's forces had already broken through.

There was no escape route left once the city fell.

His response was immediate, not a long standoff or negotiation.

Some ancient kings preferred death by their own hand over a public execution.

👀 Zimri saw the city was already lost

🚪 There was no escape route left

⚡ His response was immediate, not a standoff

📖 Death by his own hand over execution

## 🔥 He Went Into The Palace, And Burnt The King's House Over Him With Fire

Zimri chose to end his own life rather than be captured.

Burning the palace destroyed the treasury and records along with him.

Death by fire, at his own hand, avoided the shame of capture or execution.

His seven day reign ends exactly where it began, inside that same palace.

🔥 Zimri set the palace on fire himself

💀 He chose death over capture

🏚️ The fire destroyed the treasury too

📖 His reign ended where it began

## ⚖️ In Walking In The Way Of Jeroboam, And In His Sin

Zimri only ruled seven days, yet still receives this exact same judgment formula.

Length of reign never determined whether a king was judged.

Even a king this brief had enough time to embrace the same false worship.

The pattern started by Jeroboam kept repeating no matter who sat on the throne.

⏳ Only seven days, yet the same judgment

⚖️ Reign length never decided this verdict

🐂 Even briefly, he kept the false worship

📖 Jeroboam's pattern kept repeating anyway

## ⚖️ His Treason That He Wrought

Treason here means betrayal against his own king, a serious specific charge.

Other kings in this book get the word acts to describe their reign.

Zimri instead gets the word treason, naming exactly how he took power.

Scripture does not soften how Zimri became king, even in its official record.

⚖️ Treason means betrayal against his own king

📚 Other kings get the neutral word acts

🗡️ Zimri gets the word treason instead

📖 Scripture names exactly how he took power

# FirstKingsSixteen 16:21-22
# ⚔️ Israel Divided
---
## ⚔️ The People Of Israel Divided Into Two Parts

With Zimri dead, two rival men both claimed Israel's throne.

Tibni son of Ginath led half of the people.

Omri, the army's own chosen king, led the other half.

A civil war now splits the northern kingdom from the inside.

⚔️ Two men both claimed Israel's throne

👤 Tibni led one half of the people

🎖️ Omri led the army's own half

📖 Civil war split the kingdom in two

## 🏆 Omri Prevailed Against The People That Followed Tibni

Omri's side eventually won this internal power struggle.

The text says simply that Tibni died, without any real detail.

Many scholars believe Tibni was likely killed in this same conflict.

Omri now rules Israel alone, without a rival left standing.

🏆 Omri's side eventually won the struggle

💀 Tibni died, with little detail given

⚔️ He was likely killed in the conflict

📖 Omri now ruled with no rival left

## 🔚 So Tibni Died, And Omri Reigned

This short sentence ends a small civil war within one verse.

Omri emerges from a divided kingdom as its sole king.

His path to the throne started with an army's choice, not royal blood.

Everything that follows in this chapter now centers on Omri and later his son Ahab.

🔚 A small civil war ends in one line

👑 Omri becomes Israel's sole king

🎖️ His path began with an army's choice

📖 Omri and Ahab now shape this chapter

# FirstKingsSixteen 16:23-28
# 🏛️ Omri Builds Samaria
---
## 📅 In The Thirty And First Year Of Asa, Omri Began To Reign

This is the same dual dating system used throughout this chapter.

Omri began ruling during the thirty first year of Asa's reign in Judah.

His twelve year reign is actually described in two separate parts.

Six of those years were spent still ruling from Tirzah.

📅 Same dual dating system as before

👑 Omri began in Asa's thirty first year

⏳ His reign lasted twelve years total

📖 Six of those years were spent in Tirzah

## 💰 He Bought The Hill Samaria Of Shemer For Two Talents Of Silver

A talent was a large unit of weight used to measure silver and gold.

Two talents of silver made this a very expensive land purchase.

Omri bought the land outright instead of simply seizing it by force.

This hill will become the capital of Israel for the rest of its history.

⚖️ A talent measured large amounts of silver

💰 Two talents made this an expensive purchase

🏛️ This hill became Israel's lasting capital

📖 Omri bought it instead of seizing it

## 🏙️ Called The Name Of The City Samaria, After The Name Of Shemer

Naming a city after its previous owner was a common practice.

Samaria will remain Israel's capital for about two hundred years.

Assyrian records outside the Bible even call Israel the house of Omri.

A single land purchase shaped how outside nations would refer to Israel for centuries.

🏙️ Naming a city after its owner was common

📆 Samaria stayed Israel's capital for centuries

📜 Assyrian records even call Israel Omri's house

📖 One purchase shaped Israel's name for centuries

## 🏛️ Omri Wrought Evil In The Eyes Of The LORD, Worse Than All Before Him

Omri was highly successful by worldly standards, founding a lasting capital city.

The Bible measures kings by faithfulness to God, not by political success.

Worse than all before him is a serious escalation in this book's language.

Political achievement and spiritual faithfulness are judged by two completely different standards here.

🏛️ Omri succeeded by worldly, political standards

⚖️ The Bible measures kings by faithfulness

📈 Worse than all before him is an escalation

📖 Success and faithfulness are judged differently

## 🔁 He Walked In All The Way Of Jeroboam The Son Of Nebat

This is now the fourth king in this chapter to receive this same charge.

Omri founded a brand new royal dynasty, yet still kept the old sin.

A new family line did not mean a new direction spiritually.

The golden calf worship outlasted every single dynasty that has ruled Israel so far.

🔁 The fourth king to receive this charge

👪 A new dynasty still kept the old sin

🐂 Golden calf worship outlasted every dynasty

📖 A new family did not mean new faith

## 💪 The Rest Of The Acts Of Omri Which He Did, And His Might

Might here points to Omri's real military and political accomplishments.

Secular records outside the Bible actually confirm Omri was a significant king.

The Bible mentions this briefly, then moves on without dwelling on it.

Worldly greatness gets one short line here, faithfulness gets the rest of the chapter's attention.

💪 Might points to real military accomplishments

📜 Outside records confirm Omri's real significance

📖 The Bible mentions it only briefly

➡️ Faithfulness matters more than worldly greatness here

## ⚰️ Omri Slept With His Fathers, And Was Buried In Samaria

Omri is buried in the very capital city he built himself.

Ahab his son now inherits both the throne and the family's sin.

The city built through wealth and ambition becomes its founder's own resting place.

Ahab is about to make Omri's spiritual failures look mild by comparison.

⚰️ Omri is buried in his own city

👑 Ahab inherits both the throne and its sin

🏛️ His city became his own resting place

📖 Ahab will make this look mild by comparison

# FirstKingsSixteen 16:29-34
# 💔 Ahab Marries Jezebel
---
## ⏳ Ahab The Son Of Omri Reigned Over Israel Twenty And Two Years

Ahab's twenty two year reign is one of the longest in this book.

He becomes the central villain king across many chapters that follow.

Ahab rules from Samaria, the capital his father Omri built.

This long reign gives plenty of time for real spiritual damage to spread.

⏳ Twenty two years, a very long reign

👑 Ahab becomes this book's central villain king

🏛️ He ruled from his father's capital, Samaria

📖 A long reign meant lasting spiritual damage

## 📈 Ahab Did Evil In The Sight Of The LORD Above All Before Him

This is now the strongest version of this same charge in the whole book.

Every earlier king in this chapter already broke this same standard.

Ahab does not just repeat their sin, he goes further than any of them.

The worst king yet is about to introduce Israel's worst chapter of idolatry.

📈 The strongest version of this charge yet

🔁 Every earlier king already broke this standard

⬆️ Ahab goes further than any king before

📖 Israel's worst chapter of idolatry begins here

## 🪶 As If It Had Been A Light Thing To Walk In The Sins Of Jeroboam

A light thing means something small or barely worth mentioning.

This phrase says the old golden calf sin was not even enough evil for Ahab.

Jeroboam's sin, which destroyed earlier kings, becomes just a starting point for Ahab.

Ahab treats decades of Israel's worst sin as a minor first step.

🪶 A light thing means barely worth mentioning

🐂 Old idolatry was not enough evil for Ahab

📉 Jeroboam's sin became just his starting point

📖 Ahab treated old sin as a minor step

## 👑 He Took To Wife Jezebel, The Daughter Of Ethbaal King Of The Zidonians

Jezebel becomes the most infamous queen in the entire Bible.

Her father Ethbaal ruled Sidon, a powerful Phoenician city on the coast.

Some ancient writers record that Ethbaal also served as a priest of Baal.

This marriage brought full blooded pagan religion directly into Israel's royal palace.

👑 Jezebel becomes the Bible's most infamous queen

🌊 Ethbaal ruled Sidon, a Phoenician coastal city

🛐 Ethbaal may have also been a priest

📖 Pagan religion entered the palace through marriage

## ⛈️ Went And Served Baal, And Worshipped Him

Baal was the chief storm and fertility god of Canaanite religion.

Worshipping Baal meant fully leaving the LORD, not just adding another god.

Earlier kings kept a twisted version of worshipping the LORD through golden calves.

Ahab crosses into worshipping a completely different god instead.

⛈️ Baal was Canaan's storm and fertility god

🚫 This meant fully leaving the LORD

🐂 Earlier kings twisted worship of the LORD

📖 Ahab worshipped a completely different god

## 🛕 He Reared Up An Altar For Baal In The House Of Baal In Samaria

Ahab built an entire temple dedicated to Baal in Israel's own capital city.

This was official, state sponsored worship, not a private household idol.

Israel's government now openly funded and promoted a foreign god.

The kingdom Omri built with silver now hosts a rival temple to the LORD's own house in Jerusalem.

🛕 Ahab built a whole temple for Baal

🏛️ This was official, government sponsored worship

💰 Israel's government now funded a foreign god

📖 A rival temple now rivaled the LORD's house

## 🌳 Ahab Made A Grove, And Did More To Provoke The LORD Than All Before Him

A grove here means an Asherah pole, a wooden object tied to Canaanite worship.

Asherah worship was often paired directly with Baal worship in the ancient Near East.

This verse repeats the above all comparison one more time in this same chapter.

Each king so far has managed to outdo the one before him.

🌳 A grove means an Asherah pole

🛐 Asherah worship was often paired with Baal

📈 The above all comparison repeats again

📖 Each king kept outdoing the one before

## 🏚️ Hiel The Bethelite Did Build Jericho

Jericho was the famous city destroyed by Israel back in the book of Joshua.

Nobody had rebuilt its walls in all the centuries since that conquest.

Hiel decided to rebuild the city during Ahab's reign of open idolatry.

Rebuilding a cursed city fits the spiritual climate this chapter has been describing.

🏚️ Jericho was destroyed back in Joshua's day

🚧 Nobody had rebuilt it in centuries

🧱 Hiel rebuilt it during Ahab's reign

📖 This fits the chapter's spiritual climate

## 📜 He Laid The Foundation Thereof In Abiram His Firstborn

Joshua had pronounced a curse centuries earlier on anyone who rebuilt Jericho.

That old curse specifically named the loss of a firstborn son at the foundation.

Hiel's firstborn son Abiram died exactly as that ancient curse described.

Whether this was direct judgment or a tragic coincidence, the text presents it as a fulfilled word.

📜 Joshua cursed anyone who rebuilt Jericho

👶 The curse named a firstborn son's death

💔 Hiel's son Abiram died at the foundation

📖 The text presents this as a fulfilled word

## 👶 Set Up The Gates Thereof In His Youngest Son Segub

The same old curse also named a youngest son dying at the completion of the gates.

Hiel's youngest son Segub died just as that second half of the curse described.

Both of Hiel's named sons died during this one building project.

This closes the chapter by showing God's word, spoken centuries earlier, still holding true.

👶 The curse also named a youngest son

💔 Segub died as the gates were finished

👪 Both of Hiel's sons died in this project

📖 God's old word still held true here

## 📜 According To The Word Of The LORD, Which He Spake By Joshua The Son Of Nun

This directly names the source of the curse fulfilled in the two previous cards.

Joshua's warning is found in the book of Joshua, chapter six.

Centuries passed between that warning and Hiel's decision to rebuild the city.

This chapter opened with a prophecy against Baasha and closes with a much older one finally fulfilled.

📜 Joshua's warning is found in Joshua chapter six

⏳ Centuries passed before this word came true

🔁 The chapter opened and closed with fulfilled prophecy

📖 This names the source of the curse fulfilled
`.trim();

export const FIRST_KINGS_SIXTEEN_PERSONAL_SECTIONS = parseFirstKingsSixteenRawNotes(FIRST_KINGS_SIXTEEN_RAW_NOTES);
