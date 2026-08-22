export type SecondChroniclesThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesThirteenRawNotes(rawText: string): SecondChroniclesThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 13:${startVerse}` : `2 Chronicles 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 2 Chronicles 13 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_THIRTEEN_RAW_NOTES = `# SecondChronicles 13:1-3
# ⚔️ Abijah's Reign Begins And The Armies Gather
---
## 📅 In The Eighteenth Year Of King Jeroboam Began Abijah To Reign Over Judah

Chronicles often dates a king of Judah by how many years the king of Israel had already reigned.

The eighteenth year of Jeroboam works like a shared calendar between two rival kingdoms.

Abijah was Rehoboam's son and Solomon's grandson, next in David's royal line.

Judah and Israel had been split into two separate kingdoms for years by this point.

📅 Judah dated its kings by Israel's king

👑 Abijah was Rehoboam's son, Solomon's grandson

🏰 Judah and Israel were already split

📖 Two kingdoms, one shared calendar

---

## 👩 His Mother's Name Also Was Michaiah The Daughter Of Uriel Of Gibeah

Michaiah was Abijah's mother, named here with her father Uriel and hometown Gibeah.

First Kings calls this same woman Maachah, daughter of Abishalom, in a different passage.

Many scholars believe Michaiah and Maachah were the same person, known by two names.

Ancient records sometimes used more than one name or title for the same person.

👩 Michaiah was Abijah's mother

📖 First Kings calls her Maachah instead

🔀 Many scholars think they are the same

➡️ Ancient records sometimes used two names

---

## ⚔️ There Was War Between Abijah And Jeroboam

This was not a new conflict starting from nothing.

Judah and Israel had already been at war since Rehoboam's reign in the chapter before this one.

Abijah simply inherited a fight that began before he ever became king.

The whole chapter grows out of that ongoing civil war between two Israelite kingdoms.

⚔️ This war did not start with Abijah

👑 It began under Rehoboam earlier

🔥 Abijah inherited an ongoing conflict

📖 One nation, split into two warring kingdoms

---

## 🎯 Four Hundred Thousand Chosen Men

Chosen men means elite, handpicked warriors, not just any soldier in the army.

Judah brought four hundred thousand of these trained fighters to the battlefield.

That was already an enormous force for one kingdom to raise.

The size of this army makes what happens next even more surprising.

🎯 Chosen men means elite, picked warriors

🔢 Judah brought four hundred thousand of them

💪 Already an enormous army

📖 A big number that still was not enough

---

## 💪 Eight Hundred Thousand Chosen Men, Being Mighty Men Of Valour

Jeroboam brought twice as many trained soldiers as Judah did.

Valour means courage and skill in battle, not just raw numbers.

Israel had both the bigger army and experienced fighters on its side.

By every normal measure, Judah should have lost this battle badly.

🔢 Israel brought twice as many soldiers

💪 Valour means real battle skill

⚖️ The odds clearly favored Israel

➡️ Judah should have lost by every measure

# SecondChronicles 13:4-9
# 📜 Abijah's Speech: The Covenant And The Golden Calves
---
## 🏔️ Abijah Stood Up Upon Mount Zemaraim

Mount Zemaraim sat in the hill country of Ephraim, near the border between the two kingdoms.

Abijah climbed it so his voice could carry down to the army below him.

Kings sometimes gave a formal speech before a battle to state their case.

This was Abijah's public appeal, made in front of both armies at once.

🏔️ Zemaraim sat near the two kingdoms' border

📢 Height let his voice carry down

👑 Kings sometimes spoke before a battle

📖 Abijah spoke before both armies

---

## 🧂 A Covenant Of Salt

Salt kept food from spoiling in the ancient world.

A covenant of salt means an agreement meant to last forever, never to decay.

This phrase points back to God's promise that David's family would rule forever.

Abijah opens his speech by reminding Israel whose throne they are really fighting against.

🧂 Salt prevented decay and spoiling

🤝 A salt covenant means a lasting agreement

👑 It points to God's promise to David

📖 Israel fights against God's own promise

---

## 👷 The Servant Of Solomon The Son Of David, Is Risen Up, And Hath Rebelled Against His Lord

Jeroboam did not start out as a king or a rival prince.

He had been one of Solomon's own officials, put in charge of labor crews.

Abijah calls him a servant on purpose, to remind everyone of his real rank.

In Abijah's telling, Jeroboam is not a legitimate king but a rebel against his master.

👷 Jeroboam was once Solomon's official

📉 Abijah stresses his lower rank on purpose

🚫 He calls Jeroboam a rebel, not a king

📖 Rank mattered in how Abijah framed this

---

## 🚫 Vain Men, The Children Of Belial

Vain men means worthless, empty people with nothing real to offer.

Belial was a Hebrew word meaning wickedness or worthlessness.

Children of Belial was a common insult for troublemakers with no regard for God.

Abijah blames Jeroboam's rise on bad advisors, not just on Jeroboam alone.

🚫 Vain men means worthless people

😈 Belial means wickedness or worthlessness

👥 It was a common insult for troublemakers

📖 Bad advisors share the blame too

---

## ❌ Rehoboam Was Young And Tenderhearted, And Could Not Withstand Them

This does not mean Rehoboam was literally a young man in age.

Other chapters record him as forty one years old when he became king.

Young and tenderhearted here describes his lack of experience and weak leadership.

A new, untested king made an easy target for men looking to divide the kingdom.

❌ Not literally young in age

📖 He was forty one when crowned

🫤 It describes weak, untested leadership

➡️ Inexperience made him an easy target

---

## 🐂 There Are With You Golden Calves, Which Jeroboam Made You For Gods

Jeroboam built two golden calves years earlier, one at Bethel and one at Dan.

He wanted his people worshiping close to home instead of traveling to Jerusalem's temple.

That decision broke the same command God gave at Mount Sinai against carved idols.

Abijah names this openly, calling Israel's entire worship system false from the start.

🐂 Two golden calves, at Bethel and Dan

🚫 Meant to keep people from Jerusalem

📜 It broke the command against idols

📖 Abijah calls their worship false

---

## 🚪 Cast Out The Priests Of The LORD, The Sons Of Aaron, And The Levites

Jeroboam removed the priests God had actually appointed through Aaron's family line.

Those priests likely stayed loyal to Jerusalem instead of Jeroboam's new worship system.

He replaced them with priests of his own choosing instead.

Removing God's chosen priests was one more break from how Israel was meant to worship.

🚪 Jeroboam removed Aaron's priestly line

🙅 They likely stayed loyal to Jerusalem

👤 He installed his own priests instead

📖 One more break from true worship

---

## 🐂 With A Young Bullock And Seven Rams

Under God's actual law, only Aaron's descendants could serve as priests.

Jeroboam's system let anyone become a priest simply by bringing these two animals.

Abijah says this with real scorn, mocking how easy Jeroboam made it.

A priesthood open to anyone with an offering was no real priesthood at all.

🐂 Just a bullock and seven rams

🚫 Anyone could qualify under Jeroboam

😏 Abijah says this with real scorn

📖 Easy access made it meaningless

# SecondChronicles 13:10-12
# 🕎 Abijah's Speech: Judah's Faithful Priesthood
---
## 🔄 The LORD Is Our God, And We Have Not Forsaken Him

Abijah pivots from accusing Israel to describing Judah's own loyalty instead.

Forsaken means abandoned or left behind on purpose.

Judah kept worshiping the LORD the way He actually commanded.

This is the real difference Abijah wants both armies to hear.

🔄 Abijah shifts to describe Judah instead

🚶 Forsaken means abandoned on purpose

🙏 Judah kept worshiping as commanded

📖 This is the real difference

---

## 🍞 The Shewbread Also Set They In Order Upon The Pure Table

Shewbread means bread of the presence, kept always before God.

Chapter four already described the gold table this bread sat on.

Judah still followed this exact ritual every single week.

A small, steady act of obedience became proof of real loyalty.

🍞 Shewbread means bread of the presence

📜 The gold table appeared back in chapter four

🔄 Judah still kept this weekly ritual

📖 Small obedience proved real loyalty

---

## 📋 We Keep The Charge Of The LORD Our God

Charge here means a duty or responsibility to follow instructions closely.

Judah is not claiming to be perfect, only faithful to what God assigned.

The real dividing line was never army size or geography.

Obedience versus abandonment was the actual battle being fought.

📋 Charge means an assigned duty

🙏 Judah claims faithfulness, not perfection

⚖️ The real dividing line was obedience

📖 That, not numbers, was the real battle

---

## 🎖️ God Himself Is With Us For Our Captain

Captain here means the one actually leading the army into battle.

Abijah is not naming a general or an officer.

He is claiming that God himself leads Judah's forces today.

That is a bold, specific claim to make right before a fight.

🎖️ Captain means the one leading the army

🙌 Abijah claims God leads them

🛡️ Not a general, but God himself

📖 A bold claim made before battle

---

## 📯 His Priests With Sounding Trumpets To Cry Alarm Against You

These were the same silver trumpets God commanded Moses to make in Numbers.

Priests, not soldiers, were the ones authorized to sound them in battle.

A trumpet alarm signaled that God himself was being called on for help.

This was worship and warfare combined into a single act.

📯 Silver trumpets from the law of Moses

🕎 Only priests were allowed to sound them

🚨 An alarm called on God for help

📖 Worship and warfare combined

---

## ⚠️ Fight Ye Not Against The LORD God Of Your Fathers

This line was a warning, not just an insult aimed at Israel.

Abijah gives Israel one last chance to back down before the fighting starts.

Prosper here means succeed or come out ahead in the end.

Even now, Abijah frames this as a fight against God, not against Judah.

⚠️ This was a warning, not an insult

🚪 One last chance to back down

📈 Prosper means to succeed in the end

📖 A fight against God, not Judah

# SecondChronicles 13:13-18
# ⚔️ The Battle And The LORD's Deliverance
---
## 🤫 Jeroboam Caused An Ambushment To Come About Behind Them

While Abijah was still speaking, Jeroboam was secretly moving troops into position.

An ambushment means a hidden force sent to attack by surprise.

Jeroboam sent part of his army around behind Judah's lines.

His actions during the speech reveal he was never planning to listen.

🤫 Jeroboam moved troops during the speech

🎯 An ambushment is a hidden surprise attack

🔄 Troops circled behind Judah's lines

📖 His actions answered Abijah's warning

---

## 🔄 When Judah Looked Back, Behold, The Battle Was Before And Behind

Judah suddenly realized they were completely surrounded.

Enemy soldiers stood in front of them and now behind them too.

There was no clear direction left to retreat toward.

This was the exact moment the situation looked hopeless.

🔄 Judah was fully surrounded

⚔️ Enemies stood front and back

🚫 No clear direction to retreat

📖 The moment looked hopeless

---

## 🙏 They Cried Unto The LORD, And The Priests Sounded With The Trumpets

Judah's first response was not a clever battle maneuver.

They cried out to God and let the priests sound the same trumpets from Abijah's speech.

The threat mentioned back in verse twelve was now put into real action.

Prayer and worship became their actual battle strategy in that moment.

🙏 Judah cried out to God first

📯 The same trumpets from verse twelve sounded

⚔️ The threat became real action

📖 Prayer became their real strategy

---

## 📣 The Men Of Judah Gave A Shout

This shout was an act of faith, not a battle tactic.

Joshua's army once shouted the same way before Jericho's walls fell.

The men of Judah shouted before they knew the outcome, not after.

Faith came first, and the victory followed it.

📣 A shout of faith, not tactics

🏰 Jericho's walls fell after a similar shout

🙏 They shouted before knowing the outcome

📖 Faith came first, victory followed

---

## 💥 God Smote Jeroboam And All Israel Before Abijah And Judah

Smote means struck down in defeat.

The text credits this victory directly to God, not to Judah's army.

Judah was still outnumbered two to one when the fighting began.

The numbers on paper never decided this battle's outcome.

💥 Smote means struck down

🙌 God gets direct credit for the win

⚖️ Judah was still outnumbered two to one

📖 Numbers never decided this outcome

---

## 🏃 The Children Of Israel Fled Before Judah: And God Delivered Them Into Their Hand

Fled means Israel's army broke and ran from the battle.

Delivered into their hand is an old way of saying total control over an enemy.

Judah did not just win the fight, they won it completely.

The rest of the battle became a pursuit instead of a struggle.

🏃 Fled means the army broke and ran

✋ Delivered into their hand means total control

🏆 This was a complete victory

📖 A pursuit followed instead of a struggle

---

## 🔢 There Fell Down Slain Of Israel Five Hundred Thousand Chosen Men

Five hundred thousand was more than half of Israel's original army.

That is one of the largest single casualty counts recorded anywhere in the Bible.

Judah's army, though smaller, walked away as the clear winner.

The scale of the loss matched the scale of Israel's earlier confidence.

🔢 Over half of Israel's original army

📊 One of the Bible's largest casualty counts

🏆 The smaller army won decisively

📖 The loss matched their earlier confidence

---

## 🏆 The Children Of Judah Prevailed, Because They Relied Upon The LORD God Of Their Fathers

Prevailed means they won, decisively and completely.

The text is careful to name the actual reason for the win.

It was not Judah's army size, strategy, or weapons that decided the battle.

Reliance on God is the one detail Chronicles wants remembered here.

🏆 Prevailed means they won decisively

📊 Not size, strategy, or weapons

🙏 They relied on God instead

📖 Chronicles wants that reason remembered

# SecondChronicles 13:19-22
# 👑 Abijah's Aftermath And The Death Of Jeroboam
---
## 🏃 Abijah Pursued After Jeroboam, And Took Cities From Him

Abijah did not stop at winning the battle.

He pushed further, chasing down Jeroboam's retreating forces.

Along the way, Judah captured actual Israelite cities and their surrounding towns.

This was more than a defensive win, it reversed some real territory.

🏃 Abijah pursued beyond the battle

🏙️ Judah captured real Israelite cities

📈 Some lost territory was reversed

📖 A pursuit, not just a defense

---

## 🐂 Bethel With The Towns Thereof

Bethel was one of the two cities where Jeroboam had set up his golden calves.

Losing Bethel struck directly at Israel's whole false worship system.

Judah captured it along with the smaller towns surrounding it.

Taking this specific city carried real symbolic weight, not just military value.

🐂 Bethel held one of Jeroboam's golden calves

🎯 Its loss struck Israel's worship system

🏙️ Surrounding towns fell with it

📖 A symbolic loss, not just a military one

---

## 📉 Neither Did Jeroboam Recover Strength Again In The Days Of Abijah

This defeat was not a temporary setback for Jeroboam.

He never rebuilt his military strength for the rest of Abijah's reign.

Judah's victory permanently shifted the balance between the two kingdoms.

One battle changed the direction of years that followed it.

📉 Jeroboam never rebuilt his strength

⏳ This lasted the rest of Abijah's reign

⚖️ The balance of power shifted

📖 One battle changed years that followed

---

## ⚡ The LORD Struck Him, And He Died

This does not describe an ordinary illness or accident.

The text credits Jeroboam's death directly to God's judgment.

First Kings gives a fuller account of the decline of his household after this.

The king who set up the golden calves did not escape the consequences.

⚡ Not an ordinary illness or accident

🐂 The golden calf king faced this

📜 First Kings tells the fuller story

📖 Credited directly to God's judgment

---

## 📈 Abijah Waxed Mighty, And Married Fourteen Wives

Waxed means grew or became, an old fashioned word for increasing.

Abijah became strong and secure as king after this victory.

Fourteen wives was a large number, even for a king in this era.

Chronicles often mentions many wives without treating it as automatically good.

📈 Waxed means grew or became

👑 Abijah became strong and secure

💍 Fourteen wives was a large number

📖 Chronicles does not treat this as automatically good

---

## 🔢 Twenty And Two Sons, And Sixteen Daughters

Twenty and two is an old way of saying twenty two.

Abijah had thirty eight children total across his fourteen wives.

That large family gave his short three year reign a lasting legacy.

A brief reign still left behind a wide, secure royal line.

🔢 Twenty and two means twenty two

👨‍👩‍👧‍👦 Thirty eight children in total

⏳ His reign lasted only three years

📖 A brief reign left a lasting legacy

---

## 📚 Are Written In The Story Of The Prophet Iddo

Chronicles often points to outside prophetic records that no longer survive today.

Iddo was a prophet already mentioned earlier, back in chapters nine and twelve.

He apparently kept written records across the reigns of more than one king.

The Bible itself points beyond its own pages to other lost historical sources.

📚 Chronicles often cites now lost records

👤 Iddo appeared in chapters nine and twelve

✍️ He recorded more than one king's reign

📖 The Bible points to now lost sources`.trim();

export const SECOND_CHRONICLES_THIRTEEN_PERSONAL_SECTIONS = parseSecondChroniclesThirteenRawNotes(SECOND_CHRONICLES_THIRTEEN_RAW_NOTES);
