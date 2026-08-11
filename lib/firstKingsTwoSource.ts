export type FirstKingsTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsTwoRawNotes(rawText: string): FirstKingsTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsTwo\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsTwo\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsTwo\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 2:${startVerse}` : `1 Kings 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 1 Kings 2 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_TWO_RAW_NOTES = `# FirstKingsTwo 2:1-4
# 🛏️ David's Charge To Solomon
---
## ⏳ Drew Nigh That He Should Die

"Drew nigh" is an old way of saying something had come very close.

Here it means David's death was no longer far off.

Chapter one already showed a king too weak to stay warm on his own.

This chapter opens exactly where that frailty was always heading.

⏳ Drew nigh means came close

🛏️ David's death was now near

📜 Chapter one already showed his frailty

📖 This chapter completes that decline

## 🌍 I Go The Way Of All The Earth

This is a gentle old way of saying death comes for everyone.

David is not describing a tragedy or a punishment here.

He is naming something every person eventually faces.

Facing it calmly lets him spend his last words on something useful instead of fear.

🌍 The way of all the earth means death

👴 Death comes for every person

😌 David faces it without panic

📖 His last words become instruction, not fear

## 💪 Be Thou Strong Therefore, And Shew Thyself A Man

"Shew" is an old spelling of the word show.

David is telling Solomon to rule with real courage, not just hold a title.

God gave this exact same charge to Joshua before he led Israel into Canaan.

A new leader following a legendary one often hears this same command.

💪 Shew is an old spelling of show

👑 Solomon must rule with real courage

📜 God told Joshua the same words

➡️ New leaders often hear this charge

## 📜 Keep The Charge Of The LORD Thy God

A charge here means a duty someone is trusted to carry out.

David is not asking Solomon to simply believe in God.

He is asking him to actively obey what God commanded.

Belief without obedience was never enough for a king of Israel.

📜 Charge means an assigned duty

🙏 Belief alone was not the goal

✅ Solomon must actively obey God

📖 Faith and obedience were meant together

## 📖 His Statutes, And His Commandments, And His Judgments, And His Testimonies

These four words describe different parts of the law God gave through Moses.

Statutes were lasting rules for worship and daily life.

Judgments were decisions covering specific legal cases.

Testimonies were reminders that pointed back to what God had already done.

📚 Statutes covered worship and daily life

⚖️ Judgments covered specific legal cases

🕯️ Testimonies recalled what God had done

📖 Together they formed the whole law

## 📗 As It Is Written In The Law Of Moses

This points Solomon back to the actual books of Moses, not vague tradition.

David wants a written standard Solomon can return to again and again.

A king ruling only by memory or mood could easily drift from what God required.

A written law gave every future king something fixed to be measured against.

📗 Points to the actual books of Moses

🧭 A written standard, not vague tradition

🤔 Memory alone could drift over time

📖 A fixed law measured every king

## 🌱 That Thou Mayest Prosper In All That Thou Doest

This promise is not a guarantee of easy comfort.

It echoes the covenant blessings Moses laid out in Deuteronomy for obedience.

Prosperity here means the whole nation flourishing under a king who honors God.

David is handing Solomon a proven promise, not a new one.

🌱 Prosper here is not just comfort

📜 It echoes Deuteronomy's covenant blessings

🇮🇱 It describes a nation flourishing

📖 David hands Solomon a proven promise

## 👑 There Shall Not Fail Thee A Man On The Throne Of Israel

This recalls the covenant God made with David in second Samuel chapter seven.

God promised David's family would always have a claim to Israel's throne.

That promise carried one condition, faithful obedience from David's own children.

Solomon's choices, not just his birth, would decide how that promise played out.

👑 Recalls the covenant of second Samuel seven

🤝 God promised David's line the throne

⚠️ The promise still carried a condition

📖 Solomon's choices would decide the outcome

# FirstKingsTwo 2:5-9
# ⚔️ David's Final Instructions
---
## ⚔️ What Joab The Son Of Zeruiah Did To Me

Joab was David's own nephew, the son of David's sister Zeruiah.

He had commanded David's entire army for decades of war.

That closeness makes what David says next far more serious.

This is not a stranger being condemned, but the king's own family.

⚔️ Joab was David's army commander

👪 Zeruiah was David's own sister

📆 Joab had served for decades

📖 Family ties make this warning heavier

## 🗡️ Unto Abner The Son Of Ner, And Unto Amasa The Son Of Jether

Abner and Amasa were both rival army commanders Joab murdered years earlier.

Abner had just made peace with David when Joab killed him in second Samuel three.

Amasa was killed later after Absalom's revolt, in second Samuel twenty.

Both killings were personal revenge disguised as loyalty to David.

🗡️ Abner and Amasa were rival commanders

🤝 Abner had just made peace with David

⚔️ Amasa died after Absalom's revolt

📖 Revenge was dressed up as loyalty

## 🩸 Shed The Blood Of War In Peace

This phrase means Joab murdered these men during peacetime, not in battle.

Killing an enemy soldier in war was accepted under the law.

Killing a man who trusted a peaceful meeting was not.

David never let this crime go, even decades later.

🩸 Blood of war in peace means murder

⚔️ War killing was accepted under the law

🤝 These men trusted a peaceful meeting

📖 David never let the crime go

## 🥋 Put The Blood Of War Upon His Girdle... And In His Shoes

A girdle was the belt worn around the waist in daily life.

The image pictures Joab's guilt literally staining his clothing and his footsteps.

It means the guilt followed him everywhere, not just at the moment of the crime.

Guilt this old still counted as fully present in David's eyes.

🥋 A girdle was a belt worn daily

👣 The image pictures guilt on his clothes

🚶 Guilt followed him everywhere he walked

📖 Old guilt still counted as real

## 👴 Let Not His Hoar Head Go Down To The Grave In Peace

"Hoar" is an old word meaning white or gray with age.

David is picturing Joab living out a long, comfortable old age.

He is asking Solomon not to let that happen without justice first.

A peaceful natural death would let real guilt go unanswered.

👴 Hoar means white or gray with age

🕊️ David pictures Joab dying comfortably

⚖️ David wants justice before that happens

📖 Unanswered guilt was not acceptable to David

## 🏡 Shew Kindness Unto The Sons Of Barzillai The Gileadite

Barzillai was an elderly, wealthy man who supported David during Absalom's revolt.

Second Samuel seventeen describes him supplying food and beds for David's exhausted men.

That kindness came at a real risk while Absalom still controlled the throne.

David wants that loyalty repaid to the next generation of that family.

🏡 Barzillai supported David during Absalom's revolt

🍞 He supplied food for David's men

⚠️ His kindness carried real risk then

📖 David repays it through Barzillai's sons

## 🍽️ Let Them Be Of Those That Eat At Thy Table

Eating at the king's table was not a single invitation to dinner.

It described a permanent, honored place inside the royal household.

Barzillai's sons would live under Solomon's care for the rest of their lives.

Loyalty shown once bought lasting security for an entire family.

🍽️ Eating at the table meant royal care

🏠 It was a permanent place, not one meal

👪 The whole family gained lasting security

📖 One act of loyalty outlived a generation

## 😡 Shimei The Son Of Gera... Which Cursed Me With A Grievous Curse

Shimei was a relative of Saul's family from the town of Bahurim.

Second Samuel sixteen describes him throwing stones and curses at David during Absalom's revolt.

He accused David of stealing the throne from Saul's family by violence.

That curse came while David looked weakest, fleeing his own capital city.

😡 Shimei belonged to Saul's own family

🪨 He threw stones and curses at David

👑 He accused David of stealing the throne

📖 The curse came while David looked weakest

## 🤝 I Sware To Him By The LORD, I Will Not Put Thee To Death

When David returned to power, Shimei begged for mercy and David personally spared him.

Second Samuel nineteen records that exact oath in David's own name.

David's promise protected Shimei only from David himself, not from every future king.

David is now carefully explaining the limits of a promise he kept.

🤝 David personally spared Shimei once

📜 The oath is recorded in second Samuel

⚖️ The promise bound only David himself

📖 A kept promise still has real limits

## 🗡️ Hold Him Not Guiltless... His Hoar Head Bring Thou Down To The Grave With Blood

David is telling Solomon that mercy and guilt are two separate things.

Sparing Shimei's life once did not erase what Shimei had actually done.

The same phrase used for Joab returns here for Shimei's own fate.

David leaves the timing and method of justice entirely up to Solomon.

⚖️ Mercy and guilt are treated separately

🚫 Sparing him did not erase the guilt

🔁 The same fate language returns from Joab

📖 Solomon decides the timing, not David

# FirstKingsTwo 2:10-12
# ⚰️ David's Death And Solomon's Throne
---
## 😴 David Slept With His Fathers

This is a common Old Testament way of describing a peaceful death.

It pictures joining generations of ancestors who had already died before him.

The phrase carries no shame or defeat, only the natural end of a long life.

David's death closes one of the longest reigns recorded in the Bible.

😴 Slept with his fathers means died peacefully

👴 It pictures joining earlier generations

🕊️ The phrase carries no shame

📖 A long, significant reign now ends

## 🏙️ Buried In The City Of David

The city of David was the older, fortified section of Jerusalem he had captured.

David had claimed it decades earlier as Israel's new political center.

Being buried there tied his death to the very city he had built up.

Later kings of Judah were buried in this same place for generations.

🏙️ David captured this section of Jerusalem

👑 It became his political center

⚰️ His burial tied him to that city

📖 Later kings were buried there too

## 🔢 Forty Years: Seven Years... In Hebron, And Thirty And Three Years... In Jerusalem

David's reign is measured in two distinct stages here.

He first ruled only over Judah from Hebron for seven years.

He then ruled the whole united kingdom from Jerusalem for thirty three more years.

Forty years total marks a full, complete generation in biblical counting.

🔢 Forty years marks a full generation

🏘️ Seven years were spent ruling from Hebron

🏙️ Thirty three years were spent ruling from Jerusalem

📖 His reign expanded to all Israel

## 👑 Sat Solomon Upon The Throne Of David His Father

This simple sentence confirms the transfer of power is now fully complete.

Everything chapter one worked to secure has now actually happened.

Solomon is not merely anointed anymore, he is ruling from the throne itself.

The crisis that opened this book has reached its real resolution.

👑 The transfer of power is complete

✅ Chapter one's plan has now happened

🪑 Solomon rules from the throne itself

📖 The opening crisis finally resolves here

## 🏛️ His Kingdom Was Established Greatly

"Established" means firmly secured and no longer in real danger.

That word sounds final, but the rest of this chapter says otherwise.

Adonijah, Joab, Abiathar, and Shimei are all still alive and untested.

True security still requires Solomon to deal with each of them directly.

🏛️ Established means firmly secured

⚠️ The rest of the chapter says otherwise

👥 Several rivals are still alive

📖 Real security still takes more work

# FirstKingsTwo 2:13-18
# 🙋 Adonijah's Request Through Bathsheba
---
## 🙋 Adonijah The Son Of Haggith Came To Bathsheba

Adonijah is the same brother whose attempt to crown himself opened this book.

Solomon had already spared his life once, on the condition of good behavior.

Approaching Bathsheba directly, rather than Solomon, is itself a careful, risky choice.

Nothing about this visit is as casual as it first appears.

🙋 Adonijah tried to crown himself before

🕊️ Solomon had already spared his life

🚪 He approaches Bathsheba, not Solomon directly

📖 This visit is anything but casual

## 🤔 Comest Thou Peaceably?

Bathsheba's first question shows she has not forgotten chapter one.

She is checking whether Adonijah has come to make trouble again.

His quick answer, peaceably, sounds simple but does not settle the matter.

The reader already knows more caution is warranted here.

🤔 Bathsheba remembers chapter one clearly

⚠️ She checks for trouble right away

✅ His answer sounds reassuring but simple

📖 Caution here is still warranted

## 🤲 Howbeit The Kingdom Is Turned About, And Is Become My Brother's: For It Was His From The LORD

"Howbeit" is an old word meaning however or nevertheless.

Adonijah openly admits Solomon's kingship came from God's own choice.

That is a striking contrast with his self declared crowning back in chapter one.

His words sound humble, but his next request will not match them.

🤲 Howbeit is an old word for however

👑 Adonijah admits Solomon's kingship was God's will

🎭 That sounds humble compared to chapter one

📖 His words and his request will not match

## ❓ I Ask One Petition Of Thee, Deny Me Not

Adonijah frames his request as something small before he even names it.

That framing is meant to get Bathsheba's agreement before she can weigh the cost.

A careful listener would notice the request has not been named yet.

Bathsheba agrees to hear him without knowing what she is agreeing to.

❓ Adonijah calls it a small request

🎯 The framing comes before the actual ask

👂 The request itself is still unnamed

📖 Bathsheba agrees before knowing the cost

## 💍 That He Give Me Abishag The Shunammite To Wife

Abishag was the young woman who cared for David in his final days.

She never became David's actual wife, as chapter one already made clear.

Even so, marrying a former king's close attendant carried a claim to royal status.

Absalom made a similar claim years earlier by taking David's own concubines publicly.

💍 Abishag cared for David in his final days

🚫 She never became David's actual wife

👑 Marrying her still implied a royal claim

📖 Absalom made a similar claim before

## 🗣️ For He Will Not Say Thee Nay

Adonijah is counting on Bathsheba's influence to carry the request for him.

He assumes Solomon's respect for his mother will override his own judgment.

That assumption badly underestimates how carefully Solomon actually watches for threats.

Confidence here is about to run straight into a wall.

🗣️ Adonijah leans on Bathsheba's influence

🤞 He assumes Solomon will simply agree

🚫 That assumption underestimates Solomon

📖 His confidence is about to fail

## 🤝 Well, I Will Speak For Thee Unto The King

Bathsheba agrees to carry the request without questioning it further.

Nothing in the text suggests she understands its real political weight.

Her generosity here sets up a very different reaction once she reaches Solomon.

The chapter is building toward a moment of sharp dramatic irony.

🤝 Bathsheba agrees without further question

❓ She may not grasp the real stakes

🎭 Her ease contrasts with what comes next

📖 The scene builds toward real irony

# FirstKingsTwo 2:19-25
# ⚖️ Solomon Sees Through The Request
---
## 🙇 The King Rose Up To Meet Her, And Bowed Himself Unto Her

Solomon stands and bows the moment his mother enters the room.

That gesture was a genuine sign of honor, not a routine formality.

A new king publicly honoring his mother strengthened her real standing at court.

Whatever follows next, Solomon's respect for her is not in question.

🙇 Solomon stands and bows to Bathsheba

👑 This was genuine honor, not routine

💪 It strengthened her standing at court

📖 His respect for her is not in doubt

## 🪑 Caused A Seat To Be Set For The King's Mother, And She Sat On His Right Hand

The right hand of the throne was the position of highest honor in the court.

Giving his mother that seat publicly confirmed her real influence as queen mother.

This detail explains why Adonijah believed her request would carry real weight.

Her position was genuine, even though this particular request would still fail.

🪑 The right hand marked the highest honor

👑 It confirmed her role as queen mother

🎯 This explains Adonijah's confidence in her

📖 Her influence was real, this request still failed

## 🙏 Ask On, My Mother: For I Will Not Say Thee Nay

Solomon makes this promise before he even hears the actual request.

That is the exact same phrase Adonijah used earlier to describe Solomon's trust.

Solomon is about to prove that promise was never truly unconditional.

Trust and blind agreement were never actually the same thing to him.

🙏 Solomon promises before hearing the request

🔁 It echoes Adonijah's earlier confident phrase

⚠️ That promise was never truly unconditional

📖 Trust did not mean blind agreement

## 💍 Let Abishag The Shunammite Be Given To Adonijah Thy Brother To Wife

Bathsheba repeats the request exactly as Adonijah worded it to her.

She still shows no sign of recognizing its deeper political meaning.

Solomon, unlike his mother, understands immediately what this request actually means.

The gap between what she says and what he hears is the heart of this scene.

💍 Bathsheba repeats Adonijah's exact request

❓ She still misses its deeper meaning

👑 Solomon understands it immediately

📖 That gap drives the whole scene

## 🚨 Ask For Him The Kingdom Also

Solomon's sharp reply reveals what the request truly represented.

Marrying David's former attendant was, in his eyes, a quiet claim to the throne itself.

He is not overreacting to an innocent family favor.

He is correctly reading a second attempt at Adonijah's old ambition.

🚨 Solomon names the request's true meaning

👑 It was a quiet claim to the throne

🎯 He is not overreacting here

📖 He reads Adonijah's old ambition correctly

## 👥 For He Is Mine Elder Brother, Even For Him, And For Abiathar The Priest, And For Joab

Solomon lists Adonijah's remaining allies from chapter one in the same breath.

Abiathar the priest and Joab the army commander both backed Adonijah's earlier attempt.

Naming all three together shows Solomon sees this as a coordinated threat, not one favor.

His mind has already moved from this single request to the wider danger.

👥 Solomon names Adonijah's old allies together

🙏 Abiathar and Joab both backed Adonijah before

⚠️ He treats this as a coordinated threat

📖 One small request reveals a wider danger

## 📢 God Do So To Me, And More Also

This was a common Hebrew oath formula calling down a curse if the speaker broke his word.

It is a way of staking your own life on a promise.

Solomon uses the strongest form of oath available to him.

He is not making an angry threat, he is issuing a formal, binding judgment.

📢 This was a formal self curse oath

⚖️ It staked the speaker's own life

🗣️ Solomon uses the strongest oath available

📖 This is a binding judgment, not a threat

## ⚖️ As The LORD Liveth... Adonijah Shall Be Put To Death This Day

Solomon's sentence is immediate, with no delay and no second warning.

This contrasts sharply with the conditional mercy he offered Adonijah back in chapter one.

That earlier mercy depended on Adonijah proving himself trustworthy going forward.

Requesting Abishag proved the exact opposite, and the condition was no longer met.

⚖️ Solomon's sentence comes with no delay

🕊️ Chapter one offered conditional mercy instead

📉 That condition depended on future behavior

📖 This request proved the condition was broken

## 🗡️ Sent By The Hand Of Benaiah The Son Of Jehoiada, And He Fell Upon Him That He Died

Benaiah had already been named Solomon's chief enforcer back in chapter one.

He is the same man who once killed two of David's most feared warriors.

Sending him again shows Solomon still relies on the same trusted hand for hard decisions.

Adonijah's second bid for the throne ends exactly as swiftly as his first one began.

🗡️ Benaiah was Solomon's trusted enforcer

⚔️ He had killed feared warriors before

🤝 Solomon relies on the same trusted man

📖 Adonijah's second attempt ends just as fast

# FirstKingsTwo 2:26-27
# 🚪 Abiathar Is Banished
---
## 🏡 Get Thee To Anathoth, Unto Thine Own Fields

Anathoth was a small priestly town a short walk northeast of Jerusalem.

Sending Abiathar there was exile from royal service, not exile from the land itself.

Solomon spares his life while still permanently ending his role at court.

The prophet Jeremiah would later come from this same town, generations afterward.

🏡 Anathoth sat near Jerusalem

🚪 This was exile from service, not the land

🕊️ Solomon spares his life here

📖 Jeremiah would later come from this town

## 🕊️ Because Thou Barest The Ark Of The LORD God Before David My Father

Abiathar had carried the ark of the covenant during David's most dangerous years.

First Samuel twenty two and twenty three describe him fleeing to David's side early on.

That decades long loyalty is the only reason Solomon spares his life at all.

Past faithfulness still matters, even when it cannot undo present guilt.

🕊️ Abiathar once carried the ark for David

🏃 He fled to David's side very early

❤️ That loyalty is why his life is spared

📖 Past faithfulness cannot undo present guilt

## 🚫 Thrust Out Abiathar From Being Priest Unto The LORD

This ends Abiathar's active priestly service permanently, not just for a season.

Zadok, his rival throughout this whole book, now becomes the sole high priest.

The two priestly lines that had shared power under David finally split for good.

One family's era at the altar closes here, quietly and completely.

🚫 Abiathar's priestly service ends for good

⚖️ Zadok becomes the sole high priest

💔 A shared priesthood splits apart permanently

📖 One family's era at the altar closes

## 📜 That He Might Fulfil The Word Of The LORD... Concerning The House Of Eli

Generations earlier, in first Samuel two, God warned Eli's priestly family it would eventually lose the priesthood.

Abiathar was the last surviving member of that same line still serving at the altar.

This quiet political decision was also the final piece of an old prophecy coming true.

Sometimes a promise made generations earlier is fulfilled through an ordinary political choice.

📜 God warned Eli's family long before

👴 Abiathar was that family's last priest

🔮 This decision fulfilled an old prophecy

📖 Old promises can be fulfilled quietly

# FirstKingsTwo 2:28-35
# 🏹 Joab's End At The Altar
---
## 🔁 Joab Had Turned After Adonijah, Though He Turned Not After Absalom

Joab had stayed loyal to David through Absalom's earlier revolt years before.

This time, he chose to back Adonijah's failed attempt at the throne instead.

That single choice finally breaks a decades long record of loyal service.

Long loyalty did not protect Joab once he backed the wrong side.

🔁 Joab stayed loyal during Absalom's revolt

⚠️ He backed Adonijah's attempt this time

💔 That choice ends his long record

📖 Old loyalty could not undo this choice

## 🛐 Fled Unto The Tabernacle Of The LORD, And Caught Hold On The Horns Of The Altar

This is the exact same refuge Adonijah grabbed for safety back in chapter one.

The horned corners of the altar were believed to offer protection from punishment.

Joab is gambling that the same mercy shown to Adonijah will now be shown to him.

That gamble assumes his crime and Adonijah's are treated the same way.

🛐 Joab flees to the same altar as Adonijah

🐮 Its horned corners were believed to offer refuge

🎲 Joab gambles on the same mercy

📖 His crime and Adonijah's are not the same

## ➡️ Go, Fall Upon Him

Solomon gives this order without hesitation or a moment of debate.

There is no attempt to negotiate or offer Joab a lesser punishment.

This decisiveness contrasts sharply with the careful conditions Solomon set for Adonijah.

Some crimes, in Solomon's judgment, simply did not qualify for mercy.

➡️ Solomon orders this without hesitation

🚫 No negotiation or lesser sentence is offered

⚖️ This differs from Adonijah's conditional mercy

📖 Some crimes did not qualify for mercy

## 🙅 Nay, But I Will Die Here

Joab refuses to leave the altar even after Benaiah orders him out.

He is betting his life on the belief that sanctuary at the altar cannot be broken.

That belief turns out to be badly mistaken in his particular case.

Confidence in a loophole does not always match how the loophole actually works.

🙅 Joab refuses to leave the altar

🎲 He bets his life on sanctuary

❌ That belief turns out to be wrong

📖 Confidence in a loophole proves nothing

## ⚖️ Do As He Hath Said, And Fall Upon Him, And Bury Him

Solomon orders Benaiah to kill Joab even at the altar itself.

An old law in Exodus twenty one specifically excluded premeditated murderers from altar sanctuary.

Joab's killings of Abner and Amasa were exactly that kind of planned, cold blooded murder.

The altar could shelter the desperate, but it was never meant to shelter the guilty.

⚖️ Solomon orders the killing at the altar

📜 Exodus already excluded murderers from sanctuary

🗡️ Joab's killings were planned, not accidents

📖 The altar sheltered the desperate, not the guilty

## 🩸 That Thou Mayest Take Away The Innocent Blood... From Me, And From The House Of My Father

Ancient Israel believed unpunished murder left a guilt that stained the whole community.

David had carried that unresolved guilt for Abner and Amasa his entire reign.

Solomon's action is framed as finally clearing his father's household of that old stain.

Justice here is described as cleansing, not simply revenge.

🩸 Unpunished murder was believed to stain everyone

👴 David carried this guilt his whole reign

🧼 Solomon's action clears his father's house

📖 This justice is framed as cleansing

## 👑 The LORD Shall Return His Blood Upon His Own Head

This phrase means Joab's own death is treated as the direct result of his own choices.

Nobody else is blamed for the outcome, not Solomon and not David.

The killer's fate is described as simply catching up with him at last.

Consequences delayed for decades were still, in the end, consequences.

👑 His own choices caused his death

🚫 No one else is blamed for it

⏳ Consequences finally catch up with him

📖 A delayed consequence was still a real one

## 🗡️ Two Men More Righteous And Better Than He... Abner... And Amasa

This restates who Joab actually killed, for anyone who needs the reminder.

Abner was Saul's former general who had just made peace with David.

Amasa was Absalom's former commander who had just been welcomed back by David.

Both men were killed at the exact moment they posed no more threat at all.

🗡️ Abner and Amasa are named again here

🤝 Abner had just made peace with David

🕊️ Amasa had just been welcomed back

📖 Both died right when the threat had ended

## ♾️ Their Blood Shall Therefore Return Upon The Head Of Joab, And Upon The Head Of His Seed For Ever

This curse falls specifically on Joab's own descendants, not on David's family.

The very next phrase contrasts that curse with peace promised to David's throne forever.

The chapter is drawing a sharp, permanent line between the two households.

One family carries guilt forward, the other carries a lasting promise instead.

♾️ The curse falls on Joab's own family

🕊️ David's family is promised peace instead

⚖️ The contrast is drawn on purpose

📖 One line carries guilt, the other a promise

## ⛰️ Buried In His Own House In The Wilderness

Joab's burial happens quietly at his own home rather than anywhere of honor.

There is no royal ceremony and no mention of public mourning.

The contrast with David's honored burial in the city of David is hard to miss.

A decorated military career still ends without the honor Joab had spent decades earning.

⛰️ Joab is buried quietly at home

🚫 No royal ceremony is mentioned

👑 This contrasts with David's honored burial

📖 A long career still ended without honor

## 🛡️ The King Put Benaiah... In His Room Over The Host: And Zadok The Priest... In The Room Of Abiathar

Benaiah now formally takes over Joab's old position commanding Israel's whole army.

Zadok now formally takes over Abiathar's old role as the kingdom's high priest.

Both of Solomon's most loyal supporters now hold the two most powerful offices under him.

Solomon's government is now staffed entirely with people who backed him from the start.

🛡️ Benaiah takes over the army command

🙏 Zadok takes over as high priest

🤝 Both were loyal to Solomon from the start

📖 Solomon's government is now fully secured

# FirstKingsTwo 2:36-41
# 🏠 Shimei's Broken Oath
---
## 🏠 Build Thee An House In Jerusalem, And Dwell There

Solomon does not execute Shimei outright, despite David's earlier instruction.

Instead he places him under a strict, permanent form of house arrest inside the city.

This gives Shimei a real chance to live out his life peacefully under one condition.

Mercy here comes with a very specific limit attached.

🏠 Solomon does not execute Shimei outright

🔒 He places him under strict confinement

🕊️ Shimei still gets a real chance at peace

📖 This mercy comes with one clear limit

## 🚫 Go Not Forth Thence Any Whither

This command leaves absolutely no room for misunderstanding.

Shimei is not restricted from certain places, he is restricted from leaving at all.

The boundary Solomon sets could not be stated more plainly.

Whatever happens later, ignorance of the rule will not be a valid excuse.

🚫 The restriction is total, not partial

🗺️ Shimei may not leave the city at all

📏 The boundary is stated with total clarity

📖 Ignorance of the rule will not excuse him

## 🌊 Passest Over The Brook Kidron

The brook Kidron was a valley running just outside Jerusalem's eastern wall.

Naming this specific landmark turns a vague rule into an exact, visible boundary.

Shimei cannot claim later that he did not know where the line actually was.

A clear boundary made the coming consequence entirely his own responsibility.

🌊 Kidron was a valley outside Jerusalem

📍 It made the boundary exact and visible

🚫 Shimei cannot claim confusion about the line

📖 A clear line placed the responsibility on him

## 🩸 Thou Shalt Surely Die: Thy Blood Shall Be Upon Thine Own Head

This phrase means the consequence, if it comes, will be entirely self inflicted.

Solomon is stating in advance that no one else will bear the blame.

Shimei hears this warning with total clarity before he ever breaks it.

The choice, and the responsibility for it, belongs to him alone.

🩸 Blood on his own head means self inflicted

🚫 No one else will bear the blame

👂 Shimei hears the warning with full clarity

📖 The choice and its cost were his alone

## ✅ The Saying Is Good: As My Lord The King Hath Said, So Will Thy Servant Do

Shimei agrees to the terms fully and without any objection or complaint.

His words here echo the same submissive agreement Adonijah gave back in chapter one.

Both men accepted mercy with conditions attached, and both would eventually break those conditions.

Agreement in the moment did not guarantee lasting obedience for either man.

✅ Shimei agrees without any objection

🔁 His words echo Adonijah's earlier agreement

⚠️ Both men later broke their conditions

📖 Agreement did not guarantee real obedience

## 📆 At The End Of Three Years

This detail shows Shimei actually kept the agreement for a real length of time.

Three years is long enough to prove this was not an accident of forgetting.

The eventual break did not come from confusion about the rule at all.

It came instead from a simple, ordinary decision to leave anyway.

📆 Three years passed before anything happened

✅ Shimei genuinely kept the rule that long

🚫 The break was not caused by confusion

📖 It came from an ordinary, avoidable choice

## 🏃 Two Of The Servants Of Shimei Ran Away Unto Achish Son Of Maachah King Of Gath

Gath was a major Philistine city, the same region tied to David's own history.

David had once fled to this territory himself, generations earlier, in first Samuel twenty seven.

Shimei's servants fleeing there gives him a personal, practical reason to want them back.

An ordinary household problem is about to collide with a life or death boundary.

🏃 Two servants flee to Philistine territory

🗺️ Gath was tied to David's own history

🐎 Shimei has a practical reason to chase them

📖 An ordinary problem meets a deadly boundary

## 🐴 Shimei Arose, And Saddled His Ass, And Went To Gath

Shimei makes this trip for an entirely mundane, understandable reason.

He is not plotting rebellion or attempting to flee Solomon's kingdom for good.

Even so, the boundary Solomon set made no exception for ordinary business.

A reasonable excuse still did not change what the sworn agreement required.

🐴 Shimei's reason for leaving was mundane

🚫 He was not plotting any rebellion

📏 The rule made no exception for reasons

📖 A reasonable excuse did not change the agreement

## 👀 It Was Told Solomon That Shimei Had Gone From Jerusalem To Gath, And Was Come Again

Solomon learns about this trip almost immediately after it happens.

This matches the same pattern from chapter one, where Solomon's people watched and reported quickly.

Shimei likely assumed a short, quiet trip would go completely unnoticed.

Nothing that mattered to Solomon's throne actually stayed hidden from him for long.

👀 Solomon learns of the trip right away

🔁 This matches his watchfulness from chapter one

🤫 Shimei likely assumed it would go unnoticed

📖 Little stayed hidden from Solomon's throne

# FirstKingsTwo 2:42-46
# ⚖️ Shimei's Sentence Carried Out
---
## ❓ Did I Not Make Thee To Swear By The LORD

Solomon reminds Shimei that this was never a casual personal rule.

Shimei had sworn it as a formal oath made in God's own name.

Breaking a vow sworn by the LORD was considered a far more serious offense than breaking a simple promise.

Solomon is making sure Shimei cannot claim he misunderstood the weight of what he broke.

❓ Solomon points to the original oath

🙏 It was sworn in God's own name

⚖️ Breaking such a vow was very serious

📖 Shimei cannot claim he misunderstood it

## 🗣️ Why Then Hast Thou Not Kept The Oath Of The LORD

This direct question leaves Shimei with no real defense to offer.

Every excuse he might raise was already ruled out back in verse thirty seven.

Solomon is not looking for an explanation, he is announcing a judgment already reached.

The question is rhetorical, not a genuine request for Shimei's side of the story.

🗣️ The question leaves no real defense

🚫 Every excuse was ruled out earlier

⚖️ Solomon has already reached his judgment

📖 The question announces a verdict, not a debate

## 💔 Thou Knowest All The Wickedness Which Thine Heart Is Privy To

"Privy to" is an old way of saying fully aware of, or personally involved in.

Solomon is referring back to Shimei's original crime, the cursing of David from chapter two, verse eight.

David's original instruction from the start of this chapter is finally being carried out here.

The oldest thread introduced in this chapter is the one that closes it.

💔 Privy to means fully aware of

🪨 This refers back to Shimei cursing David

📜 David's original instruction is finally fulfilled

📖 The chapter's oldest thread closes here

## 🪑 The Throne Of David Shall Be Established Before The LORD For Ever

This exact promise of an established throne was first named back in verse twelve.

It was tested by Adonijah, by Joab, by Abiathar, and now finally by Shimei.

Each threat in this chapter has now been fully and permanently resolved.

The promise made at the chapter's opening is only now completely secure.

🪑 This promise first appeared in verse twelve

⚠️ It was tested by four separate threats

✅ Every threat has now been resolved

📖 The opening promise is now fully secure

## 👑 The Kingdom Was Established In The Hand Of Solomon

This final sentence deliberately echoes the same word used back in verse twelve.

There, the kingdom was called established while real danger still remained unaddressed.

Here, after every threat has been dealt with directly, the same word finally rings true.

The chapter closes on a promise that took real, difficult action to fulfill.

👑 This line echoes verse twelve on purpose

⚠️ That earlier claim came before danger was resolved

✅ Now every threat has actually been handled

📖 A promise finally became true through real action
`.trim();

export const FIRST_KINGS_TWO_PERSONAL_SECTIONS = parseFirstKingsTwoRawNotes(FIRST_KINGS_TWO_RAW_NOTES);
