export type FirstChroniclesTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesTwentyOneRawNotes(rawText: string): FirstChroniclesTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 21:${startVerse}` : `1 Chronicles 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 1 Chronicles 21 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_TWENTY_ONE_RAW_NOTES = `# FirstChronicles 21:1-2
# 😈 Satan Provokes David To Count His Army
---
## 😈 Satan Stood Up Against Israel

"Satan" here is a title meaning the adversary or the accuser.

This is one of the clearest places in the Old Testament where Satan acts directly against God's people.

The parallel account in 2 Samuel 24:1 says the LORD moved David to take the count instead.

Both statements sit side by side in Scripture because God allowed the test even though Satan brought the temptation.

😈 Satan means the adversary
📜 2 Samuel 24 credits the LORD instead
⚖️ God allowed what Satan pushed
📖 Both accounts describe the same event

---

## 🔢 Provoked David To Number Israel

"Provoked" means stirred up or pushed toward a specific action.

Counting the people was not sinful by itself.

Numbers chapters 1 and 26 record God commanding earlier national censuses.

The problem here was David's motive, not the act of counting on its own.

🔥 Provoked means stirred up
📖 Earlier censuses were commanded by God
👑 Motive made this count different
➡️ The reason mattered more than the act

---

## 🗺️ From Beersheba Even To Dan

Beersheba sat at the far southern edge of Israel's land.

Dan sat at the far northern edge.

Naming both cities together was a common way of saying the whole land, end to end.

David wanted every fighting man counted, from one border to the other.

🧭 Beersheba marked the southern edge
🏔️ Dan marked the northern edge
🗺️ Together they meant the whole land
📖 David wanted a complete count

---

## ❓ That I May Know It

David wanted a hard number of how many men he could send to war.

A king's strength was often measured by the size of his army in the ancient world.

This kind of count could easily become less about wisdom and more about pride.

Trusting the size of an army instead of trusting God was the deeper danger here.

🧮 David wanted an exact number
👑 Army size often measured a king's power
💔 Trusting numbers can replace trusting God
📖 The danger was pride, not math

# FirstChronicles 21:3-6
# 🛑 Joab Warns Against The Count, But Obeys
---
## 🙏 The LORD Make His People An Hundred Times So Many More

Joab answers with something close to a blessing instead of a flat refusal.

He wishes Israel's population would grow a hundred times larger.

That kind of growth was itself the fulfillment of God's promise to Abraham in Genesis.

Joab's blessing quietly points out that the nation's size was already a gift, not something to measure and manage.

🙏 Joab offers a blessing first
📈 He wishes for massive growth
📜 That growth echoes God's promise to Abraham
📖 Israel's size was already a gift

---

## 👥 Are They Not All My Lord's Servants

Joab asks why David needs a number when every person already belongs to him.

The question is a gentle way of saying the count is unnecessary.

A king already had full authority over his people without counting them first.

Joab's question exposes that the real purpose of the count went beyond simple leadership.

👥 Israel already served David fully
❓ The count seems unneeded
👑 Authority did not require a number
📖 Something deeper was driving this request

---

## 😠 Why Will He Be A Cause Of Trespass To Israel

"Trespass" is an old word for sin or guilt.

Joab tells David plainly that this count could bring guilt on the whole nation.

Speaking this bluntly to a king was risky and unusual in that culture.

Joab clearly believed the request crossed a real spiritual line.

⚖️ Trespass means sin or guilt
🗣️ Joab speaks bluntly to the king
😨 Correcting a king was risky
📖 Joab saw real spiritual danger here

---

## 👑 The King's Word Prevailed Against Joab

David overrules Joab's objection and insists on the count.

"Prevailed" means David's command won out over Joab's warning.

Joab obeys, but Chronicles makes sure the reader knows he disagreed first.

The record preserves both the warning and the disobedience that followed it.

👑 David's word overruled Joab
⚔️ Prevailed means it won out
📝 Joab's warning is preserved in the text
📖 Obedience followed, but not agreement

---

## 🔢 A Thousand Thousand And An Hundred Thousand

"A thousand thousand" is the King James way of writing one million.

Israel's fighting men numbered about one million and one hundred thousand, or 1,100,000.

The parallel count in 2 Samuel 24 gives a different total for all Israel.

Ancient totals were sometimes counted by different methods.

That difference in method can explain gaps like this one.

🔢 A thousand thousand means one million
🧮 Israel totaled about 1,100,000 men
📜 2 Samuel 24 gives a different number
📖 Ancient counting methods could vary

---

## ⚔️ Judah Was Four Hundred Threescore And Ten Thousand

"Threescore" is an old word for sixty.

Four hundred threescore and ten thousand means four hundred seventy thousand.

Judah's own tribe alone fielded almost half a million fighting men.

Judah was already the largest and most prominent tribe by David's time.

🔢 Threescore means sixty
🧮 Judah's total was 470,000 men
👑 Judah was the largest tribe
📖 Its size reflected its growing importance

---

## 🛐 Levi And Benjamin Counted He Not Among Them

Levi was the priestly tribe, set apart for temple and worship duties instead of warfare.

Numbers chapter 1 already commanded that Levi be left out of military counts for this exact reason.

Benjamin may have been skipped simply because Joab stopped the count before finishing it.

Jerusalem itself sat on land belonging to Benjamin's territory.

🛐 Levi served in worship, not war
📜 Numbers 1 already excluded Levi
⏹️ Benjamin's count was likely cut short
📖 Jerusalem sat inside Benjamin's territory

---

## 😤 The King's Word Was Abominable To Joab

"Abominable" means something viewed as deeply wrong or disgusting.

Joab never stopped disagreeing with this count, even while carrying it out.

His disgust is the last word Chronicles gives on his side of the story.

The chapter is about to show exactly why Joab was right to worry.

😤 Abominable means deeply wrong
🗣️ Joab never agreed with the count
📝 His disgust closes his part of the story
➡️ The consequences come next

# FirstChronicles 21:7-8
# 💔 God Is Displeased, And David Confesses
---
## 😞 God Was Displeased With This Thing

Chronicles states God's reaction in the plainest possible way.

No lengthy explanation follows, only the fact that God was not pleased.

The next line moves straight to consequence rather than lingering on the cause.

The brevity itself carries weight, sin met a swift and serious response.

😞 God was displeased
⚡ No long explanation is given
➡️ Consequence follows immediately
📖 Sin met a swift response

---

## ⚡ Therefore He Smote Israel

"Smote" is an old word for struck down.

This one line announces judgment before the chapter explains what it actually looked like.

The full description of the plague comes later, in verse fourteen.

The whole nation, not only David, would feel the weight of this decision.

⚡ Smote means struck down
⏭️ The full plague appears later
👥 All Israel felt this judgment
📖 One man's choice reached many people

---

## 🙇 I Have Sinned Greatly

David confesses immediately, without excuse or delay.

He names his own action as the problem, not Joab, not the people.

This kind of fast, honest confession sets David apart from King Saul, who often blamed others.

David's response models real repentance instead of self defense.

🙇 David confesses without delay
🙅 He blames no one else
⚖️ Saul often deflected blame instead
📖 Fast confession marks real repentance

---

## 🙏 I Beseech Thee, Do Away The Iniquity Of Thy Servant

"Beseech" means to beg or plead earnestly.

"Iniquity" means guilt or wrongdoing.

David is not simply sorry, he is actively asking God to remove the guilt itself.

He also calls his foolishness what it was, without softening the truth.

🙏 Beseech means to beg earnestly
⚖️ Iniquity means guilt
🧹 David asks God to remove it
📖 He names his own foolishness plainly

# FirstChronicles 21:9-13
# 🎯 Gad Offers David Three Judgments
---
## 👁️ The LORD Spake Unto Gad, David's Seer

A seer was an early word for a prophet, someone who received messages directly from God.

Gad had served David since his years running from Saul, first appearing back in 1 Samuel 22.

God chooses to speak through Gad rather than directly to David this time.

The message that follows will force David to choose his own punishment.

👁️ A seer is an early word for prophet
📜 Gad served David since 1 Samuel 22
🗣️ God speaks through Gad here
📖 David must choose the punishment

---

## 🎁 I Offer Thee Three Things

God does not simply announce a punishment, He offers David a choice among three.

Even in judgment, God allows David a measure of control over what happens next.

Each option carries real, painful consequences.

None of them is comfortable, but the choice itself says something about God's character.

🎁 God offers three options
⚖️ Each carries real consequences
🙏 David still gets a choice
📖 Even judgment leaves room for mercy

---

## 🗣️ Thus Saith The LORD, Choose Thee

"Thus saith the LORD" is a set phrase prophets used to open a message.

It marked the words as coming straight from God, not their own opinion.

Gad delivers this word to David in person, not from a distance.

The formula appears constantly through the Old Testament whenever a prophet speaks for God.

Its use here signals that David's answer is about to matter enormously.

🗣️ The phrase marks a message from God
🧑 Gad delivers it to David directly
📜 Prophets used this formula often
📖 The stakes of the answer are high

---

## 🌾 Either Three Years' Famine

The first option was three years without enough food across the land.

A famine that long would slowly weaken the entire nation, not just soldiers.

Widespread hunger tends to hit the poorest and most vulnerable the hardest.

This option would have caused suffering that stretched out over a long, slow period.

🌾 Famine meant three years of scarcity
⏳ It would stretch out slowly
👥 The poor suffer first in famine
📖 Length made this option severe

---

## 🏃 Three Months To Be Destroyed Before Thy Foes

The second option was three months of fleeing from enemy armies.

David would be defeated repeatedly while his own enemies chased him down.

This choice placed Israel's fate directly into the hands of hostile, unpredictable nations.

Losing control to human enemies was its own particular danger.

🏃 David would flee enemies for months
⚔️ Repeated military defeat was certain
🌍 Enemy nations would control the outcome
📖 Human enemies show no mercy

---

## ☠️ Three Days The Sword Of The LORD, Even The Pestilence

The third option was three days of plague sent directly by God.

"Pestilence" means a deadly, fast spreading disease.

An angel would carry out this judgment across the whole land.

Though shortest in time, this option came straight from God's own hand rather than through armies or weather.

☠️ Pestilence means deadly disease
⏱️ This option lasted only three days
👼 An angel would carry it out
📖 It came directly from God

---

## 😣 I Am In A Great Strait

"Strait" is an old word for a tight, narrow place with no easy way out.

David uses it to describe how trapped he feels between three terrible options.

He does not pretend the choice is easy or comfortable.

Naming his own distress honestly comes right before he actually decides.

😣 Strait means a tight, narrow place
🤔 David felt trapped by the choice
🗣️ He names his distress honestly
📖 The decision follows right after

---

## 🙏 Let Me Fall Now Into The Hand Of The LORD

David chooses the third option, pestilence, without hesitation.

He explains his reasoning honestly, God's mercy is greater than any mercy people show each other.

Choosing God's hand over man's hand shows where David placed his real trust, even in judgment.

This choice reveals more about David's faith than any of his earlier military victories.

🙏 David chooses pestilence
❤️ He trusts God's mercy most
🙅 He fears human cruelty more
📖 The choice reveals David's real faith

# FirstChronicles 21:14-17
# 👼 The Angel Of Death Stands Over Jerusalem
---
## ☠️ There Fell Of Israel Seventy Thousand Men

Seventy thousand people died in just three days.

This was the shortest of David's three options, but also the most immediately devastating.

The number shows how seriously God treated the sin behind the census.

The suffering reached far beyond David himself, into homes across the whole nation.

☠️ Seventy thousand died in three days
⏱️ It was the shortest option offered
⚖️ God treated the sin seriously
📖 Suffering reached the whole nation

---

## 😔 The LORD Beheld, And He Repented Him Of The Evil

"Repented" here does not mean God changed His mind about something He got wrong.

It means God chose to hold back further judgment before it ran its full course.

Scripture often describes God this way in human terms readers can picture.

His actual character never changes, even when His actions do.

God stopped the plague before it reached its full extent.

😔 Repented means God relented here
🛑 He held back further judgment
❤️ Mercy stopped the plague early
📖 His character never actually changes

---

## ✋ It Is Enough, Stay Now Thine Hand

God speaks directly to the angel carrying out the plague.

"Stay now thine hand" is an old way of saying stop right now.

This command stops the destruction in the middle of the action, not after it was already finished.

The exact moment of mercy is preserved here in God's own words.

✋ God speaks directly to the angel
🛑 Stay thine hand means stop now
⏸️ The plague stops mid action
📖 Mercy arrives at the exact moment

---

## 🌾 The Threshingfloor Of Ornan The Jebusite

A threshingfloor was a flat, open area used to separate grain from its husks.

Ornan was a Jebusite, a member of the original Canaanite people who lived in Jerusalem before David captured the city.

This specific spot will become the site of Solomon's Temple a generation later.

A place used for ordinary farm work is about to become the holiest site in Israel.

🌾 A threshingfloor separated grain from husks
🏙️ Ornan was a Jebusite from Jerusalem
🛐 This site later held Solomon's Temple
📖 An ordinary place became a holy one

---

## 👁️ Stand Between The Earth And The Heaven

David actually sees the angel standing in midair, touching neither ground nor sky.

That in between position pictures a being that belongs to neither world completely.

The image gives the moment a cosmic scale rather than an ordinary battlefield feel.

Nothing in the chapter has looked this directly supernatural until now.

👁️ David sees the angel himself
🌍 Neither earth nor sky held him
🌌 The image feels cosmic in scale
📖 This moment turns openly supernatural

---

## 🗡️ Having A Drawn Sword In His Hand Stretched Out Over Jerusalem

The drawn sword pictures judgment ready to fall on the city at any moment.

Stretching it out over Jerusalem specifically aims the threat at David's own capital.

Nothing about this image is symbolic comfort, it is a weapon aimed and ready.

The sight makes the danger suddenly, visibly real to everyone watching.

🗡️ The sword pictured judgment ready to fall
🏙️ Jerusalem itself was the target
⚠️ The threat was aimed and ready
📖 The danger became visibly real

---

## 😔 Clothed In Sackcloth, Fell Upon Their Faces

Sackcloth was rough, uncomfortable material worn to show deep grief or repentance.

Falling on their faces was the lowest possible posture of humility before God.

David and the elders of Israel respond together, not David alone.

Leadership and people share the same posture of mourning in this moment.

😔 Sackcloth showed deep mourning
🙇 Falling down showed total humility
👥 Elders joined David, not just him
📖 Leaders and people mourned together

---

## 🙏 David Said Unto God, Let Thine Hand Be On Me

David asks God to punish him alone instead of the people.

He openly admits that the sin was his, not the nation's.

Calling the people sheep pictures them as innocent and defenseless, following a shepherd who led them wrong.

This is the same kind of selfless leadership David will be remembered for at his best.

🙏 David asks to be punished alone
🐑 Sheep pictures the innocent people
👑 He owns the sin himself
📖 True leadership protects those who follow

# FirstChronicles 21:18-21
# 🏛️ Gad Sends David To Ornan's Threshingfloor
---
## 😇 The Angel Of The LORD Commanded Gad

The angel does not speak straight to David this time.

Instead the message passes through Gad, the same prophet from earlier in the chapter.

God continues working through a human messenger even in the middle of an active plague.

The instruction that follows is specific about exactly where to go.

😇 The angel spoke to Gad first
🗣️ Gad relays the message to David
🛐 God still worked through a prophet
📖 The command named an exact place

---

## 🛐 Set Up An Altar Unto The LORD In The Threshingfloor Of Ornan

Building an altar meant preparing a place to offer a sacrifice to God.

Choosing this specific threshingfloor was not David's idea, it came directly from the angel through Gad.

Offering a sacrifice here would formally ask God to stop the plague completely.

The location itself was about to become far more important than anyone realized at that moment.

🛐 An altar prepared a place for sacrifice
📍 The angel chose this exact spot
🙏 The sacrifice would ask the plague to end
📖 The location's future was still hidden

---

## 🚶 David Went Up At The Saying Of Gad

David obeys immediately, with no recorded hesitation or argument.

"Which he spake in the name of the LORD" means Gad was not offering his own idea.

David approaches a stranger's private property in the middle of a national crisis.

He does it simply because a prophet said so.

Quick obedience here stands in sharp contrast to the pride that started this whole chapter.

🚶 David obeys without delay
🗣️ Gad spoke for the LORD, not himself
🏃 David acted despite the crisis
📖 Obedience now answers the pride before

---

## 🌾 Ornan Turned Back, And Saw The Angel

Ornan was going about ordinary work, threshing wheat, when the angel appeared to him too.

His four sons hid themselves out of fear at the sight.

Ornan himself did not run, though the text does not say why he stayed.

Two very different reactions to the same terrifying sight sit side by side in this verse.

🌾 Ornan was threshing wheat
😨 His sons hid in fear
🧍 Ornan stayed instead of hiding
📖 Both reactions came from the same fear

---

## 🙇 Ornan Bowed Himself To David With His Face To The Ground

Bowing with the face to the ground was the customary way to show honor to a king.

Ornan does this even though he has just seen the angel with a drawn sword.

His respect for David does not waver, even in the middle of a frightening moment.

The scene sets up the exchange that follows, one of the most respectful transactions in the Old Testament.

🙇 Bowing showed honor to a king
👑 Ornan honored David despite his fear
🤝 Their exchange begins with respect
📖 A major transaction is about to happen

# FirstChronicles 21:22-25
# 💰 David Refuses A Free Gift
---
## 🏗️ Grant Me The Place Of This Threshingfloor

David asks to buy the land outright rather than simply take it.

He explains exactly why, he wants to build an altar and stop the plague.

Asking permission from a Jebusite, a non Israelite resident of the city, shows David respected Ornan's ownership even as king.

The plague was still an active, urgent threat driving this whole request.

🏗️ David asks to buy, not take
🛐 The land was for an altar
🤝 He respected Ornan's ownership
📖 The plague made this urgent

---

## 🐂 I Give Thee The Oxen Also For Burnt Offerings

Ornan immediately offers his own oxen, free of charge, as the animal for sacrifice.

A burnt offering was given whole to God, entirely consumed rather than shared as a meal.

Ornan also offers his threshing instruments, wooden sledges with sharp teeth, to be broken up and burned as firewood.

He is trying to hand David everything needed to worship on the spot.

🐂 Ornan offers his own oxen
🔥 A burnt offering was fully consumed
🪵 His tools could become firewood
📖 He offers everything at once

---

## 🌾 The Wheat For The Meat Offering

"Meat offering" sounds like it means flesh, but in this older English it means a grain offering.

Ornan offers his own wheat, harvested right there on the threshingfloor, for that grain sacrifice.

Three separate gifts, animal, wood, and grain, cover every part of the offering David needs.

Ornan is offering to make the whole sacrifice cost David nothing.

🌾 Meat offering here means grain offering
🌿 Ornan's own wheat becomes the gift
📦 Three gifts cover the whole sacrifice
📖 Ornan wants it to cost David nothing

---

## 🚫 Nay, But I Will Verily Buy It For The Full Price

David refuses the free gift outright.

"Verily" is an old word meaning truly or certainly.

He insists on paying because a sacrifice that costs him nothing would not be a real sacrifice.

A gift that costs nothing cannot properly express real devotion to God.

🚫 David refuses the free offer
✅ Verily means truly or certainly
💰 A costly gift means more
📖 Devotion should cost something real

---

## 💰 Six Hundred Shekels Of Gold By Weight

A shekel was a unit of weight used for money in the ancient world, not a coin shape.

Six hundred shekels of gold was an enormous price for a small plot of land.

The parallel story in 2 Samuel 24 records a much smaller price, fifty shekels of silver.

That smaller price likely covered only the oxen and the threshingfloor itself.

Many scholars believe 1 Chronicles includes the whole hilltop here, the future site of the entire Temple complex.

💰 A shekel was a weight, not a coin
🧮 Six hundred shekels of gold was enormous
📜 2 Samuel 24 records a smaller price
📖 This price may cover the whole hilltop

# FirstChronicles 21:26-30
# 🔥 Fire From Heaven Answers David's Altar
---
## 🔥 He Answered Him From Heaven By Fire Upon The Altar

Fire falling from heaven was a clear, visible sign that God accepted the offering.

This same kind of sign appears later when Solomon dedicates the Temple in 2 Chronicles 7.

It also echoes Elijah's altar on Mount Carmel, when fire proved which God was real.

God answering by fire settled any doubt that the plague's cause had truly been dealt with.

🔥 Fire showed God accepted the offering
🛐 Solomon's Temple later gets the same sign
⚡ Elijah's altar on Carmel used fire too
📖 The sign confirmed the plague was resolved

---

## ⚔️ He Put Up His Sword Again Into The Sheath Thereof

A sheath is the protective covering a sword is stored in when not being used.

Putting the sword away pictures the judgment officially ending.

This detail mirrors how the whole crisis began, with a weapon drawn and ready to strike.

The chapter closes the same violent image it opened, only now at peace.

⚔️ A sheath stores an unused sword
🛑 This pictures judgment ending
🔁 It mirrors the earlier drawn sword
📖 The chapter ends the danger it opened

---

## 🛐 Then He Sacrificed There

Once David sees God's answer by fire, he keeps offering sacrifices at this same spot.

He does not return to the official tabernacle location for this.

That choice quietly begins treating Ornan's threshingfloor as a new, more central place of worship.

The next chapters will explain why that shift makes sense.

🛐 David kept sacrificing at this spot
📍 He skipped the official tabernacle site
🔁 This begins a shift in worship location
📖 Later chapters explain the reason

---

## ⛺ The Tabernacle Of The LORD, Which Moses Made In The Wilderness

The tabernacle was the portable tent where Israel had worshiped God since the time of Moses.

By David's reign it stood at Gibeon, a town north of Jerusalem.

The ark of the covenant was already in Jerusalem instead.

David had set it in a separate tent back in chapter sixteen.

Worship was split between two locations, an unusual and temporary arrangement.

⛺ The tabernacle came from Moses' time
📍 It stood at Gibeon in David's day
📦 The ark was already in Jerusalem
📖 Worship was split across two places

---

## 😨 David Could Not Go Before It To Enquire Of God

David was too afraid of the angel's drawn sword to travel to Gibeon.

That fear is what kept him worshiping at Ornan's threshingfloor instead.

This small, human detail is the real reason the future Temple gets chosen here.

A moment of fear ends up shaping Israel's most sacred building site for generations to come.

😨 Fear kept David from Gibeon
📍 That fear centered worship here instead
🏛️ This shapes where the Temple will stand
📖 A small fear had lasting consequences
`.trim();

export const FIRST_CHRONICLES_TWENTY_ONE_PERSONAL_SECTIONS = parseFirstChroniclesTwentyOneRawNotes(FIRST_CHRONICLES_TWENTY_ONE_RAW_NOTES);
