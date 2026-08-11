export type SecondSamuelTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelTwentyFourRawNotes(rawText: string): SecondSamuelTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 24:${startVerse}` : `2 Samuel 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Samuel 24 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_TWENTY_FOUR_RAW_NOTES = `# SecondSamuel 24:1-4
# 😠 The King Orders A Census
---
## 🔥 The Anger Of The LORD Was Kindled

"Kindled" means a fire has been lit and is burning.

The anger of the LORD showing up again points back to an earlier moment.

Two chapters earlier, God sent a famine to punish Saul's broken vow to the Gibeonites.

This chapter opens with God still dealing with Israel's sin, now through David.

The anger is not random.

It responds to real wrongdoing already present in the nation.

🔥 Kindled means a fire is lit

📖 Again points back to chapter twenty one

😢 That chapter punished Saul's broken vow

➡️ God still deals with real sin here

---
## 👉 He Moved David Against Them

This does not mean God forced David to sin against his will.

First Chronicles twenty one tells the same story from another angle.

There, Satan is the one who provoked David to take the census.

Together the two accounts show God allowing the test.

David still made his own choice to obey it.

Permission was not the same as force.

👉 God permitted this test to happen

📜 Chronicles names Satan as the tempter

🙋 David still made his own choice

📖 Permission is not the same as force

---
## 🔢 Number Israel And Judah

A census here means counting every man old enough to fight.

The law in Exodus thirty required a ransom payment whenever Israel's fighting men were numbered.

That payment protected the people from a plague breaking out during the count.

Nothing in this chapter mentions David collecting that ransom.

Skipping that step becomes part of the problem later in the chapter.

🔢 A census counts fighting age men

💰 Exodus thirty required a ransom payment

🛡️ The payment guarded against a plague

📖 David skips that required step here

---
## ❓ Why Doth My Lord The King Delight In This Thing

Joab is the commander of David's entire army.

Commanders usually did not question a king's direct order out loud.

Joab does exactly that here, and openly.

His blunt question signals that a hardened soldier senses real danger in this plan.

❓ Joab openly questions the king's order

⚔️ He commands David's whole army

🚩 His pushback signals real danger ahead

➡️ Even Joab senses this plan is wrong

---
## 👑 The King's Word Prevailed Against Joab

"Prevailed" means David's command won out over every objection.

Joab had openly questioned the plan and lost the argument.

Later in his life, Joab often acted on his own judgment instead of David's orders.

Here he obeys anyway, still clearly disagreeing.

Full obedience did not require Joab to agree.

👑 Prevailed means David's word won out

🗣️ Joab had already voiced his doubt

🫡 Joab obeys despite real disagreement

📖 Obedience did not require agreement here

# SecondSamuel 24:5-9
# 🗺️ Counting The Kingdom
---
## 🏕️ Passed Over Jordan, And Pitched In Aroer

The census crew starts on the east side of the Jordan River.

Aroer sat on the edge of the territory Israel had claimed generations earlier.

Starting there means the count begins at the kingdom's outer border, not the capital.

The whole trip was designed to reach every tribe, not just the ones nearby.

🏕️ Aroer marks Israel's eastern border

🗺️ The count starts far from home

🚶 Every tribe gets included, not just some

➡️ This was a full kingdom count

---
## 🏯 The Strong Hold Of Tyre

Tyre was a major Phoenician city outside Israel's own territory.

The counters travel all the way north to its border before turning back.

Reaching a foreign stronghold shows how far this circuit actually stretched.

The route then swings back down to Beersheba in the far south.

🏯 Tyre was a Phoenician city

🧭 The route reached Israel's far north

🔄 Then swung back to the south

📖 The census covered the whole land

---
## ⏳ Nine Months And Twenty Days

The whole census took nearly ten months to finish.

That is how long it took to walk a circuit covering the entire kingdom.

Modern travel makes this hard to picture.

For David's men, it meant almost a year away from home on foot.

⏳ Nearly ten months to complete

🚶 The crew traveled the whole kingdom

🏠 Almost a year away from home

➡️ The scale of the task was massive

---
## ⚔️ Eight Hundred Thousand Valiant Men That Drew The Sword

"Valiant men that drew the sword" means men old enough and able to fight in war.

Israel alone reported eight hundred thousand of them.

Judah added five hundred thousand more on top of that.

First Chronicles twenty one records different totals for the same census.

Many scholars believe the two books are counting in slightly different ways.

⚔️ Valiant men means soldiers ready for war

🔢 Israel counted eight hundred thousand

➕ Judah added five hundred thousand more

📖 Chronicles records the same event differently

# SecondSamuel 24:10-14
# ⚖️ Choose One Of Three
---
## 💔 David's Heart Smote Him

"Smote" means struck, the same word used elsewhere for a physical blow.

Here the strike is not physical, it is conviction.

David feels the weight of what he just did immediately after doing it.

No prophet has confronted him yet.

His own conscience gets there first.

💔 Smote means struck, here emotionally

⚡ Conviction hits him right away

🙋 No prophet has spoken yet

📖 His own conscience convicts him first

---
## 😔 I Have Done Very Foolishly

David does not make excuses or blame Joab for objecting too late.

He calls his own choice foolish, in plain and direct words.

The census itself was not against the law simply by existing.

The problem was David's pride in his own strength and numbers.

Trusting the size of his army instead of trusting God was the real sin.

😔 David takes full personal blame

🚫 No excuses, no blaming Joab

💪 Pride in his own strength was the sin

📖 Trusting numbers over God caused this

---
## 👁️ Gad, David's Seer

A "seer" is an older title for a prophet.

Gad had guided David for many years before he became king.

He first appears advising David during the years David hid from Saul.

God sends this same trusted voice to confront David now.

👁️ Seer is an older word for prophet

📜 Gad guided David for many years

🏃 He first appears during Saul's chase

➡️ A trusted voice brings this hard word

---
## ⚖️ I Offer Thee Three Things

God does not simply announce a punishment.

He offers David a choice between three different consequences.

Every option still brings real suffering to the nation.

The choice itself shows David is still treated as king, still responsible for the decision.

⚖️ God offers three possible punishments

😣 Every option still brings suffering

👑 David still carries the responsibility

➡️ Consequences do not erase David's role

---
## 🌾 Shall Seven Years Of Famine Come Unto Thee

The first option is seven years without enough food in the land.

The second option is three months of running from enemies who are winning.

The third option is three days of plague sent directly by God.

Each option trades a different length of time for a different kind of danger.

🌾 Famine option lasts seven years

🏃 Fleeing enemies option lasts three months

☠️ Plague option lasts only three days

📖 Shorter options were not necessarily easier

---
## 🚧 I Am In A Great Strait

"Strait" here does not mean a body of water.

It means a narrow, tight place with no easy way out.

David feels genuinely trapped between three terrible choices.

He is not looking for a loophole, he is being honest about the pressure.

🚧 Strait means a tight, narrow spot

😖 David feels genuinely trapped here

🙅 He is not searching for a loophole

📖 Honest pressure, not false confidence

---
## 🙏 Let Us Fall Now Into The Hand Of The LORD

David picks the option controlled directly by God.

He does not pick the one controlled by human enemies.

He reasons that God's mercy is greater than any mercy an enemy would show.

Choosing the plague was not choosing the easiest option.

It was choosing to trust God's character even inside deep consequences.

🙏 David chooses God's hand over man's

❤️ He trusts God's mercy is greater

🚫 Not the easiest option, the most trusting one

📖 Trust remained even under real judgment

# SecondSamuel 24:15-17
# 😇 The Plague And The Angel's Mercy
---
## ☠️ Seventy Thousand Men

Seventy thousand men die in the shortest of the three punishments David chose.

A short punishment did not mean a small one.

This becomes the highest single death toll of David's whole reign.

The plague sweeps across the same full stretch of land the census had just covered.

☠️ Seventy thousand men die quickly

⏳ Short in time, not in cost

📈 The worst death toll of David's reign

📖 It covers the same land just counted

---
## 🕊️ The LORD Repented Him Of The Evil

This does not mean God had sinned.

It does not mean God's own sense of right and wrong changed.

"Repented" here means God turned back from the judgment already in motion.

"Evil" in this verse means disaster or harm, not moral wrongdoing.

God chooses to stop the punishment before it reaches its full course.

🕊️ Repented means God turned back

⚠️ Evil here means disaster, not sin

🛑 God halts judgment already in motion

📖 Mercy interrupts the punishment midway

---
## ✋ It Is Enough: Stay Now Thine Hand

God speaks directly to the angel carrying out the plague.

"Stay thine hand" is a command to stop right where it is.

The judgment ends the moment God says it has gone far enough.

Nothing David does forces this stop, God chooses the moment Himself.

✋ Stay thine hand means stop now

🗣️ God commands the angel directly

⏹️ The judgment ends on God's timing

📖 Mercy was God's choice, not David's

---
## 🌾 The Threshingplace Of Araunah The Jebusite

A threshing floor is a flat, open space used to separate grain from its husks.

Jebusites were the original people living in Jerusalem before David captured the city.

Araunah was likely one of the last Jebusite leaders left in the area.

An ordinary farming spot is about to become the center of the whole chapter.

🌾 A threshing floor separates grain from husks

🏙️ Jebusites lived in Jerusalem before David

👤 Araunah was likely a former Jebusite leader

➡️ An ordinary spot is about to matter greatly

---
## 🐑 These Sheep, What Have They Done

David compares the people to a flock he was supposed to protect.

He openly admits his own sin caused their suffering.

Then he asks God to punish him and his own family instead.

A king who caused this disaster now offers to carry it alone.

🐑 Sheep pictures the people as a flock

🙋 David openly names his own sin

🛡️ He asks to be punished instead

📖 A shepherd king takes the weight himself

# SecondSamuel 24:18-21
# 🌾 Building An Altar At Araunah's Floor
---
## 🏛️ Rear An Altar Unto The LORD In The Threshingfloor

God gives David a specific place to build, not just any hill.

This exact threshing floor later becomes the site of Solomon's temple.

The place where judgment stopped becomes the place where worship gets built.

Nothing about this location was random.

🏛️ God names this exact location

🏗️ This site later becomes the temple

🔄 Where judgment stopped, worship begins

📖 The location carries lasting meaning

---
## 🙇 Bowed Himself Before The King

Full bowing to the ground was a formal sign of deep respect in this culture.

Araunah does this the moment he sees David approaching.

A defeated people's leader still shows this kind of honor to Israel's king.

It signals immediate submission before a single word is spoken.

🙇 Bowing showed deep, formal respect

👀 Araunah bows the moment he sees David

🤝 Even a conquered leader honors the king

➡️ Submission shown before any words

---
## 🛑 That The Plague May Be Stayed From The People

David states his reason plainly, right away.

He is not visiting Araunah for a friendly reason.

The plague from verse fifteen is still actively killing people during this conversation.

Every moment David spends here is urgent, not casual.

🛑 David states his urgent reason

⏱️ The plague is still active right now

🚫 This is not a friendly visit

➡️ Urgency drives every word here

# SecondSamuel 24:22-25
# 🔥 The Price Of True Worship
---
## 🪵 Threshing Instruments And Other Instruments Of The Oxen For Wood

Threshing instruments were wooden sledges dragged over grain to separate it.

Araunah offers to break them up and use them as firewood for the sacrifice.

He also offers his own oxen as the animals to be burned.

Everything needed for a full sacrifice is sitting right there, ready to use.

🪵 Threshing sledges become firewood here

🐂 Araunah offers his own oxen too

🎁 Everything needed is already on hand

➡️ Araunah offers his whole livelihood freely

---
## 👑 All These Things Did Araunah, As A King, Give

Calling Araunah "as a king" is a striking comparison for a Jebusite farmer.

It suggests he may have once ruled this land before David took the city.

Even in defeat, he gives with the generosity of someone used to great wealth.

His offer costs him real property, not just words.

👑 As a king hints at former rule

🏙️ Araunah may have once ruled Jerusalem

🎁 He gives with real generosity

📖 The gift costs him actual property

---
## 💰 That Which Doth Cost Me Nothing

David refuses the free gift and insists on paying full price.

A sacrifice that costs the giver nothing does not mean much to God.

This single line becomes one of the clearest statements about worship in the whole Old Testament.

Real worship asks something real from the person giving it.

💰 David refuses a free sacrifice

🙅 Free gifts do not cost the giver

❤️ A key verse about true worship

📖 Worship should genuinely cost something

---
## ⚖️ Fifty Shekels Of Silver

A shekel was a unit of weight for silver, not a coin like today's money.

Fifty shekels bought the threshing floor and the oxen used that day.

First Chronicles twenty one records six hundred shekels of gold for a larger purchase.

Many scholars believe that second payment covered the wider hill around the threshing floor.

⚖️ A shekel measured silver by weight

💵 Fifty shekels bought the floor and oxen

📜 Chronicles records a larger later purchase

📖 Both payments describe the same growing site

---
## ✝️ The Plague Was Stayed From Israel

The sacrifice ends the disaster that began with David's pride.

The very ground where judgment stopped becomes permanent holy ground.

Generations later, Solomon builds the temple on this same site.

A king's confession and a costly sacrifice turn disaster into the future home of worship.

✝️ Sacrifice ends the deadly plague

🏛️ This ground becomes permanently holy

🏗️ Solomon later builds the temple here

📖 Confession and cost lead to lasting worship
`.trim();

export const SECOND_SAMUEL_TWENTY_FOUR_PERSONAL_SECTIONS = parseSecondSamuelTwentyFourRawNotes(SECOND_SAMUEL_TWENTY_FOUR_RAW_NOTES);
