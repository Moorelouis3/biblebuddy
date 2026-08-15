export type FirstChroniclesTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesTenRawNotes(rawText: string): FirstChroniclesTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 10:${startVerse}` : `1 Chronicles 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Chronicles 10 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_TEN_RAW_NOTES = `# FirstChronicles 10:1-3
# ⚔️ Israel Falls On Mount Gilboa
---
## ⚔️ The Philistines Fought Against Israel

The Philistines were Israel's oldest and most dangerous enemy.

They lived along the Mediterranean coast in five walled cities.

Their iron weapons gave them a real military edge over Israel.

This chapter opens on the battle that ended Saul's entire reign.

⚔️ Philistines were Israel's longest running enemy

🏙️ They ruled five coastal cities

🛠️ Iron weapons gave them the edge

📖 This battle ends Saul's reign

---
## 🏔️ Fell Down Slain In Mount Gilboa

Gilboa is a mountain range overlooking the Jezreel valley in northern Israel.

A medium had already warned Saul what would happen here.

She told him that he and his sons would die the very next day.

That grim warning from First Samuel twenty eight comes true in this exact verse.

🏔️ Gilboa overlooks the Jezreel valley

🔮 A medium warned Saul beforehand

📅 She said it would happen tomorrow

📖 That warning comes true right here

---
## 🏃 Followed Hard After Saul

"Followed hard after" means a close, relentless chase, not a casual pursuit.

The Philistines were not content to let Israel's army simply scatter.

They pushed specifically toward Saul and his sons, the men who mattered most.

Killing the king would end the war faster than killing ordinary soldiers.

🏃 Followed hard means relentless pursuit

🎯 They targeted Saul directly

👑 Killing the king ends resistance

📖 This was a targeted strike

---
## 🗡️ Slew Jonathan, And Abinadab, And Malchishua

Jonathan was Saul's oldest son and David's closest friend.

He had protected David from his own father more than once.

Abinadab and Malchishua were two more of Saul's sons, named far less often.

A fourth son, Ishbosheth, was not in this battle and briefly outlives his father.

🤝 Jonathan was David's closest friend

🛡️ He once protected David from Saul

👥 Two more sons died beside him

📖 One son, Ishbosheth, was not here

---
## ⚔️ The Battle Went Sore Against Saul

"Sore" in the King James Bible means severe or intense.

The battle was turning badly against Saul specifically, not just against Israel.

He was now the main target of the entire Philistine advance.

⚖️ Sore means severe or intense

🎯 Saul became the main target

🏹 Israel's whole army was losing

📖 The chapter now centers on him

---
## 🏹 Wounded Of The Archers

Philistine archers used composite bows that outranged basic Israelite weapons.

They could strike from a distance before Israel's men ever closed in.

Saul was hit and wounded, but not yet dead.

That wound sets up the desperate choice he makes in the very next verse.

🏹 Composite bows outranged Israel's weapons

📏 Archers struck from a distance

🩸 Saul was wounded, not yet dead

📖 That wound forces his next choice

# FirstChronicles 10:4-6
# 🗡️ Saul's Last Stand
---
## 🗡️ Draw Thy Sword, And Thrust Me Through

Saul was not simply giving up.

He was choosing how he would die, and by whose hand.

Ancient kings feared capture far more than death itself.

A captured king could be tortured, mocked, or paraded before being killed.

👑 Saul chose how he would die

⚠️ Capture was feared more than death

😖 Captured kings faced torture and mockery

📖 This was a desperate final choice

---
## 🚫 Lest These Uncircumcised Come And Abuse Me

"Uncircumcised" was Israel's word for someone outside God's covenant with Abraham.

The Philistines were the one major enemy nation who did not practice it.

Using the word here was not really about anatomy.

It marked the Philistines as outsiders to everything Saul's kingdom stood for.

✂️ Uncircumcised meant outside the covenant

🌍 Philistines were the exception nearby

🚫 The word was an identity marker

📖 Saul feared outsiders finishing him off

---
## 😨 His Armourbearer Would Not For He Was Sore Afraid

An armourbearer carried the king's shield and weapons and stayed constantly at his side.

He was a trusted personal aide, not just a servant.

Even in mercy, killing his own king felt unthinkable to him.

His fear was reverence for Saul's office, not cowardice in battle.

🛡️ Armourbearers carried the king's weapons

🤝 He was a trusted personal aide

😨 Killing his king felt unthinkable

📖 His fear was reverence, not cowardice

---
## 🗡️ Saul Took A Sword, And Fell Upon It

Saul became the first king of Israel to die by his own hand.

This is the very outcome the medium at Endor had predicted.

Ancient warriors sometimes fell on their own swords to control how they died.

It let Saul choose his death instead of letting the Philistines choose it for him.

👑 Saul was Israel's first king

🔮 This matched the medium's prediction

🗡️ He chose his own end

📖 Saul controlled the one thing left

---
## 🩸 He Fell Likewise On The Sword, And Died

The armourbearer followed his king even into death.

This was the ultimate act of loyalty a bodyguard could offer.

Ancient Near Eastern culture saw a servant's fate as tied to his master's.

His death closes the story of two men bound together to the very end.

🤝 He followed his king into death

🛡️ It was the ultimate loyal act

🔗 A servant's fate mirrored his master's

📖 Their story ends bound together

---
## 👑 Saul Died, And His Three Sons

Three named sons died in this same battle, Jonathan, Abinadab, and Malchishua.

A fourth son, Ishbosheth, was not present and survived Saul by several years.

He briefly ruled a fractured Israel afterward according to Second Samuel.

This verse only counts the sons who fell that day on Gilboa.

👑 Three named sons died with him

👶 A fourth son, Ishbosheth, survived

⏳ He briefly ruled after Saul

📖 Only Gilboa's dead are counted here

---
## 🏚️ And All His House Died Together

This does not mean every single member of Saul's family died that day.

Grandson Meribbaal, also called Mephibosheth, survived and was already named in chapter nine.

"House" here means the ruling household, the line that was reigning at that moment.

The whole dynasty in power collapsed together on one battlefield.

🚫 Not literally every family member died

👶 Grandson Meribbaal survived Saul's fall

🏛️ House means the ruling household

📖 That whole reign ended together

# FirstChronicles 10:7-10
# 🏆 The Philistines Claim Their Trophy
---
## 🏞️ The Men Of Israel That Were In The Valley

This was the Jezreel valley, sitting just below Mount Gilboa.

These were ordinary Israelite soldiers and villagers watching the battle unfold from below.

Once they saw Saul and his sons were dead, resistance collapsed instantly.

Losing the king meant losing the will to keep fighting.

🏞️ This was the Jezreel valley

👀 They watched the battle from below

💔 The king's death broke their resolve

📖 Resistance collapsed the moment he fell

---
## 🏙️ The Philistines Came And Dwelt In Them

This defeat cost Israel more than just a king.

Whole towns near the battle were abandoned and left empty.

The Philistines simply moved in and took them over.

One battle at Gilboa reversed years of Israelite settlement in a single day.

🏙️ Towns were abandoned after the battle

🚶 Philistines moved into empty towns

📉 Territory was lost, not just a king

📖 One battle reversed years of progress

---
## 🛡️ The Philistines Came To Strip The Slain

Stripping the dead after a battle was a common ancient practice.

Winning armies collected armor, weapons, and anything valuable from the fallen.

It also let the victors identify exactly who they had killed.

That is precisely how they discovered Saul's body among the dead.

🛡️ Stripping the dead was common practice

💰 Armor and weapons were taken as spoils

🔍 It let victors identify the fallen

📖 That is how they found Saul

---
## 👑 They Took His Head, And His Armour

Taking an enemy's head was the ancient world's ultimate battle trophy.

David had once done the same thing to Goliath.

Now Israel's own king suffered the humiliation his kingdom once inflicted on an enemy.

His armor and head both became public proof of Philistine victory.

👑 A severed head was a war trophy

🪨 David once did this to Goliath

😔 Now Israel's own king was humiliated

📖 His remains proved Philistine victory

---
## 📯 To Carry Tidings Unto Their Idols

"Tidings" simply means news, especially news worth spreading quickly.

The Philistines credited this victory to their gods, not to their own army.

Messengers carried word of Saul's death throughout Philistine territory as a religious celebration.

Ancient wars were seen as contests between the gods each side served.

📯 Tidings simply means news

🙏 They credited the win to their gods

🗺️ Messengers spread the news widely

📖 Ancient wars were seen as divine contests

---
## 🏛️ The House Of Their Gods

This "house of their gods" was a Philistine temple.

First Samuel five already told a story about a temple just like it.

The ark of the covenant once sat inside that same kind of temple.

The statue of the god Dagon fell flat on its face before it.

Now this same temple system displayed Saul's armor as its newest trophy.

🏛️ This was a Philistine temple

📜 Samuel tells of a temple like it

⬇️ Dagon's statue once fell before the ark

📖 Now it displayed Saul's armor instead

---
## ⚰️ Fastened His Head In The Temple Of Dagon

Dagon was the chief god the Philistines worshipped, often tied to grain and harvest.

First Samuel thirty one instead describes Saul's body fastened to a city wall.

Chronicles chooses to focus on the head and the temple.

That choice sharpens the religious insult being told here.

The message to everyone watching was blunt.

Israel's God had seemingly lost this round.

🌾 Dagon was linked to grain and harvest

🧱 Samuel describes his body on a wall

🏛️ Chronicles focuses on the temple instead

📖 The insult targeted Israel's God directly

# FirstChronicles 10:11-12
# 🕯️ Jabeshgilead Repays An Old Debt
---
## 📢 All Jabeshgilead Heard

Jabeshgilead was a town east of the Jordan River.

Saul owed this town a debt from the very start of his reign.

First Samuel eleven describes his first act as king, rescuing Jabeshgilead from a brutal siege.

An enemy king had demanded to gouge out the right eye of every man there.

📍 Jabeshgilead sat east of the Jordan

🛡️ Saul once rescued this town

👁️ An enemy threatened to blind every man

📖 Saul owed them from his first act

---
## 🌙 All The Valiant Men

These men risked their lives crossing into enemy held territory at night.

The Philistines now controlled the area where the bodies hung on display.

Recovering a king's body was worth that danger to them.

They were repaying an old debt with real risk of their own.

🌙 They crossed enemy territory at night

🏹 Philistines controlled the area then

⚖️ The risk was worth the debt

📖 Loyalty here came with real danger

---
## 🌳 Buried Their Bones Under The Oak In Jabesh

A proper burial mattered enormously in ancient Israel.

Leaving a body exposed and unburied was considered a lasting disgrace.

Burying Saul's bones under a tree gave him back that basic dignity.

Jabeshgilead did for Saul in death what Saul once did for them in life.

🪦 Burial restored basic dignity

🚫 An unburied body was a disgrace

🌳 They buried him beneath a tree

📖 They repaid Saul in his death

---
## 😢 Fasted Seven Days

Fasting for seven days was a formal, public way of mourning the dead.

Abraham mourned Sarah in a similar way back in Genesis.

Going without food that long was a costly, visible act of grief.

Jabeshgilead mourned a king who had once saved every one of them.

😢 Seven days marked formal mourning

📜 Abraham mourned Sarah the same way

💧 Fasting was a costly, visible grief

📖 They mourned the king who saved them

# FirstChronicles 10:13-14
# 📖 Why Saul Really Died
---
## ⚖️ Saul Died For His Transgression

First Samuel simply records that Saul died in battle.

Chronicles adds this verse, a direct explanation missing from that earlier account.

"Transgression" means a serious, willful violation of God's command.

The Chronicler wants his readers to understand exactly why the kingdom was lost.

🗡️ Samuel records the death, not the why

✍️ Chronicles adds this explanation

⚖️ Transgression means willful disobedience

📖 The Chronicler names the real cause

---
## 📜 The Word Of The LORD, Which He Kept Not

Saul broke two specific commands earlier in his reign.

First Samuel thirteen describes him offering a sacrifice only a priest was allowed to make.

First Samuel fifteen describes him sparing plunder that God had commanded destroyed.

Either failure alone had already cost him God's blessing on his throne.

📜 Two specific commands were broken

🕯️ He offered a forbidden sacrifice

💰 He spared plunder God condemned

📖 Either one cost him the throne

---
## 🔮 Asking Counsel Of One That Had A Familiar Spirit

A "familiar spirit" refers to a spirit consulted through a medium or necromancer.

God's law in Deuteronomy eighteen explicitly forbade Israel from consulting one.

Saul himself had once outlawed the practice across his own kingdom.

First Samuel twenty eight tells the story of him breaking his own law at Endor.

🔮 Familiar spirit means a spirit medium

⚠️ Deuteronomy eighteen forbade the practice

👑 Saul had outlawed it himself

📖 He broke his own law at Endor

---
## 🙏 And Enquired Not Of The LORD

This is not simply saying Saul asked the wrong source for help.

It highlights where he refused to turn first.

He sought a medium's voice instead of seeking God's own.

The real failure was not the question itself.

It was the direction he turned to ask it.

🙏 The issue was where he turned

🔮 He chose a medium over God

🚫 He never truly sought the LORD

📖 Direction mattered more than desperation

---
## 👑 Turned The Kingdom Unto David The Son Of Jesse

This is the real turning point of the entire chapter.

Saul's failure did not leave Israel without a king.

God had already chosen David back in First Samuel sixteen, long before this battle.

Saul's death simply cleared the way for a promise already made.

The very next chapter opens with David finally stepping into that role.

🔄 This is the chapter's real turning point

👑 David was already chosen beforehand

🚪 Saul's death cleared the way

📖 Chapter eleven picks up with David
`.trim();

export const FIRST_CHRONICLES_TEN_PERSONAL_SECTIONS = parseFirstChroniclesTenRawNotes(FIRST_CHRONICLES_TEN_RAW_NOTES);
