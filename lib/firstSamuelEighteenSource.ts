export type FirstSamuelEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelEighteenRawNotes(rawText: string): FirstSamuelEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 18:${startVerse}` : `1 Samuel 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 1 Samuel 18 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_EIGHTEEN_RAW_NOTES = `# FirstSamuel 18:1-4
# 🤝 A Covenant Sealed In Love
---
## 💗 The Soul Of Jonathan Was Knit With The Soul Of David

"Knit" means tightly bound together, not just friendly.

Think of two threads woven into a single piece of cloth.

Pull on one and the other moves with it.

This bond forms the moment David finishes speaking to Saul after Goliath falls.

Jonathan is Saul's own son, next in line for the throne.

He attaches himself instantly to the very man who now threatens his future.

💗 Knit means tightly bound together
🧵 Like two threads woven into one cloth
👑 Jonathan was next in line for the throne
📖 He loved David without counting the cost

## 🏠 Would Let Him Go No More Home To His Father's House

Saul pulls David permanently into the royal household.

Young men with real skill were often kept close to a king's court.

David is no longer just a shepherd who visits when summoned.

He now lives inside the same walls as the man who will later hunt him.

🏠 David moved permanently into Saul's court
👑 Skilled young men often served near a king
🐑 He was no longer just a visiting shepherd
📖 He now lived near his future enemy

## 📜 Jonathan And David Made A Covenant

A covenant here was a formal, binding promise, not a casual agreement.

Covenants in this culture were often sealed with an exchanged gift or a spoken oath.

Jonathan initiates this one, even though he has the most to lose by it.

The text says plainly why he does it, because he loved David as his own soul.

📜 A covenant was a formal binding promise
🤝 Sealed with a gift or oath
👑 Jonathan had the most to lose
📖 Love, not politics, drove this covenant

## 🧥 Stripped Himself Of The Robe That Was Upon Him

This was likely Jonathan's own royal robe, a mark of his place as the king's son.

Removing it in public was not a small gesture.

It visibly handed away a symbol of his status to another man.

Jonathan is acting out with cloth what he already said with his covenant.

🧥 The robe marked Jonathan's royal status
👀 Removing it in public was a bold act
🎁 He physically gave away that status
📖 His actions matched his covenant words

## ⚔️ Even To His Sword, And To His Bow, And To His Girdle

A girdle was a belt worn around the waist to hold weapons and gear.

Jonathan gives David his weapons along with his royal robe.

In this culture a warrior's own weapons carried his personal honor.

Jonathan hands David the tools of his own identity as a fighting prince.

⚔️ Jonathan gave David his sword and bow
🪢 A girdle was a weapon belt
🛡️ Weapons carried a warrior's personal honor
📖 Jonathan gave away his own fighting identity

# FirstSamuel 18:5-9
# 🎶 The Women's Song Turns Saul's Heart
---
## ✅ Behaved Himself Wisely

This exact phrase repeats three times across this chapter alone.

It means David acted with shrewd, careful judgment, not just good luck.

Every task Saul gives him turns out well, again and again.

The narrator wants the reader watching for this pattern before Saul's jealousy begins.

✅ Wisely means shrewd, careful judgment
🔁 This phrase repeats through the chapter
📈 Every task David is given succeeds
📖 Watch this pattern before jealousy enters

## 🎖️ Set Him Over The Men Of War

David receives real military command, not a symbolic title.

This was a genuine promotion earned through proven success in battle.

Saul is rewarding David with authority he cannot easily take back later.

That authority is about to become something Saul deeply regrets giving.

🎖️ David received genuine military command
📈 It was a real, earned promotion
👑 Saul gave authority he could not undo
📖 Saul will soon regret this gift

## 🥁 With Tabrets, With Joy, And With Instruments Of Musick

A tabret was a small handheld drum, similar to a tambourine.

Women greeting a victorious army with song and dance was an old, expected custom.

Miriam did the same thing after the Red Sea crossing generations earlier.

This is meant to be an ordinary celebration, not a plot against anyone.

🥁 A tabret was a small handheld drum
🎉 Women greeting armies with song was a custom
📜 Miriam did the same after the Red Sea
📖 This began as ordinary celebration

## 🎵 Saul Hath Slain His Thousands, And David His Ten Thousands

This is Hebrew poetry, where the second line intensifies the first.

The rising numbers were a common song pattern, not an exact head count.

The women likely meant no insult by the higher number given to David.

Saul hears an insult anyway, and that hearing is what actually matters here.

🎵 This is Hebrew poetic repetition
📊 The numbers were not a literal count
🎶 The higher number was not meant as insult
📖 Saul hears one anyway

## 😡 Saul Was Very Wroth

"Wroth" means intense, burning anger, far stronger than simple annoyance.

One song line is enough to ignite it completely.

Saul's anger here is not really about the women at all.

It is about what their words expose in his own heart.

😡 Wroth means intense, burning anger
🎵 One song line ignited it
👑 The anger was not really about the women
📖 It exposed something already in his heart

## 👑 What Can He Have More But The Kingdom

Saul jumps from a song lyric straight to a fear of losing his throne.

Nothing in the women's words actually threatened his kingship.

This leap reveals how fragile Saul's grip on the throne already felt to him.

Fear, not evidence, is now driving every decision Saul makes about David.

👑 Saul leaps from a song to his throne
🎵 Nothing in the words threatened his kingship
💔 The leap reveals his own fragile grip
📖 Fear now drives his decisions

## 👀 Saul Eyed David From That Day And Forward

"Eyed" means watched with deep suspicion, not simple attention.

This single line marks the turning point of the entire chapter.

Every event from here forward flows out of this new, watchful hostility.

A shepherd boy has just become a king's permanent target.

👀 Eyed means watched with suspicion
🔄 This line turns the whole chapter
⏳ Everything after flows from this moment
📖 David becomes Saul's permanent target

# FirstSamuel 18:10-12
# 🗡️ The Javelin In Saul's Hand
---
## 😈 The Evil Spirit From God Came Upon Saul

Chapter sixteen already explained that God allowed this torment once His Spirit left Saul.

It was judgment for Saul's own earlier disobedience, not senseless cruelty.

This is the same spirit returning, now paired with a weapon in the room.

The stage is set for Saul's suspicion to turn violent.

😈 God allowed this torment as judgment
📜 Chapter sixteen already explained why
🗡️ A weapon is now in the room
📖 Suspicion is about to turn violent

## 🗣️ He Prophesied In The Midst Of The House

"Prophesied" here does not mean predicting the future.

It describes a raving, unsettled state brought on by the tormenting spirit.

David is playing music nearby, just as he had done many times before.

Calm music and a raving king now share the very same room.

🗣️ Prophesied here meant raving, not predicting
🎵 David played music as he had before
😨 A raving king now shared David's room
📖 Calm and chaos now sit together

## 🗡️ Saul Cast The Javelin

A javelin was a light spear made for throwing, not for close combat.

Saul openly tries to kill David with his own hand in this moment.

This is the king himself acting as an assassin.

Nothing about this attack can be explained away as an accident.

🗡️ A javelin was a light throwing spear
👑 The king himself attacks David
🎯 This was a deliberate assassination try
📖 It was not any kind of accident

## 🏃 David Avoided Out Of His Presence Twice

The word twice shows this was not one wild, isolated swing.

David is now dodging repeated, intentional attempts on his life.

He still has not raised a weapon against Saul in return.

His response to danger stays restraint, not retaliation.

🏃 Twice means this happened more than once
🎯 These were repeated, intentional attempts
🛡️ David never raises a weapon back
📖 His restraint stands out here

## 🌟 The LORD Was With Him, And Was Departed From Saul

This single line explains the entire shift happening in this chapter.

David succeeds not because of luck but because God is present with him.

Saul fails not because of bad fortune but because God has left him.

The presence of God, not the throne itself, decides who truly has power.

🌟 God's presence explains David's success
💔 God's absence explains Saul's failure
👑 The throne alone did not equal power
📖 God's presence was the real power

# FirstSamuel 18:13-16
# ⚔️ Sent To The Front Lines
---
## 🎖️ Made Him His Captain Over A Thousand

This looks like another promotion, but it removes David from the palace.

A captain over a thousand led troops in the field, far from Saul's own house.

Saul hopes constant battle will finally accomplish what the javelin could not.

He is trying to let the Philistines do the killing for him.

🎖️ The promotion actually removed David from court
⚔️ He now led troops far from the palace
🎯 Saul hoped battle would finish it
📖 He wanted the Philistines to do it

## 🚶 He Went Out And Came In Before The People

This phrase describes David regularly leading troops out to battle and home again.

It is a common way scripture describes active military leadership.

Every trip out is another chance for Saul's plan to succeed.

Instead, each safe return only builds David's reputation higher.

🚶 The phrase describes active military leadership
⚔️ Every trip was another chance to die
✅ Each return David made was safe
📖 His reputation only grew from it

## ✅ Behaved Himself Wisely In All His Ways

This phrase repeats again, now for the third time in the chapter.

Constant danger has not changed David's careful, faithful conduct at all.

The narrator keeps returning to this line on purpose.

Some people stay the same under pressure that would break someone else.

✅ This is the third use of this phrase
⚔️ Danger did not change David's conduct
🔁 The narrator repeats this line deliberately
📖 Pressure did not break his character

## 👥 All Israel And Judah Loved David

Israel and Judah names the whole nation using its two major tribal groupings.

This same two part split later becomes the divided kingdom after Solomon's reign.

Even before that division exists, scripture already speaks of the nation this way.

Every part of the nation, not just the royal court, now loves David.

👥 Israel and Judah named the whole nation
🔮 That split later becomes a real divided kingdom
👑 The whole nation loved David
📖 Support for David reached everywhere

# FirstSamuel 18:17-19
# 💔 A Broken Promise
---
## 👰 My Elder Daughter Merab, Her Will I Give Thee To Wife

Marrying a king's daughter meant joining the royal family directly.

Saul frames this offer as generous, tied to fighting the LORD's battles.

Underneath the generosity sits a plan already stated plainly in the very next line.

The offer looks like reward, but it is really bait.

👰 Marrying the princess meant joining royalty
🎁 Saul frames the offer as generous
🕸️ A hidden plan sits underneath it
📖 The reward was really bait

## 🕸️ Let Not Mine Hand Be Upon Him, But Let The Hand Of The Philistines Be Upon Him

Saul says the quiet part out loud, but only to himself.

He wants David dead without personally holding the blade that kills him.

Sending David into more battles lets Saul avoid the guilt of murder directly.

The text refuses to let the reader miss what Saul is really doing.

🕸️ Saul admits his plan to himself
🗡️ He wants David dead without his own hand
⚔️ Battle lets him avoid direct guilt
📖 The text exposes the plan plainly

## 🙇 Who Am I? And What Is My Life, Or My Father's Family

This is a customary, humble way to respond to an offer above one's rank.

David is not claiming his family is worthless.

He is following an expected form of polite refusal in this culture.

His humility here also keeps him from looking too eager for the throne.

🙇 This was a customary humble reply
👨‍👩‍👧 David was not claiming his family lacked value
📏 It followed an expected form of politeness
📖 It also kept him from looking too eager

## 💔 She Was Given Unto Adriel The Meholathite To Wife

Saul simply breaks the promise he had just made to David.

Nothing in the text explains this decision, and none is really needed.

Broken royal promises like this were not unusual for an unstable king.

Years later, in second Samuel, Merab's own sons appear again in a tragic story.

💔 Saul broke his own promise
🤷 The text gives no stated reason
👑 Broken promises fit an unstable king
📖 Merab's sons return later in second Samuel

# FirstSamuel 18:20-25
# 🕸️ Michal Becomes A Snare
---
## 💗 Michal Saul's Daughter Loved David

This is one of the only places in the whole Bible where a woman's love is stated so directly.

Most relationships in scripture are described through actions, not stated feelings like this.

That plain statement makes Michal's feelings a real, notable detail in this story.

Saul hears this news and immediately starts calculating instead of celebrating.

💗 A woman's love is stated plainly here
👀 That is unusual in these ancient books
🧮 Saul immediately starts calculating instead
📖 It becomes a real, notable detail

## 🪤 That She May Be A Snare To Him

A snare was a trap used to catch birds or small animals.

Saul openly plans to use his own daughter's love as bait for a trap.

He is not protecting Michal's happiness in offering this marriage.

He is weaponizing it against the man he fears.

🪤 A snare was a trap for catching animals
👑 Saul used his own daughter's love as bait
💔 Her happiness was not his true concern
📖 He weaponized her love against David

## 🤫 Commune With David Secretly

Saul avoids asking David directly and sends servants instead.

Using go betweens let him test David's reaction without exposing his own hand.

If David refuses, Saul never has to hear that refusal to his face.

Manipulation often prefers a middleman to a direct conversation.

🤫 Saul avoided asking David directly
🗣️ Servants tested the idea for him
🛡️ This protected Saul from a direct refusal
📖 Manipulation often avoids direct conversation

## 🪶 Seemeth It To You A Light Thing To Be A King's Son In Law

David has already watched one promised marriage fall through with Merab.

Calling himself "a poor man, and lightly esteemed" is customary humility, not literal poverty.

Jesse's family owned land and flocks, so David was not truly destitute.

His hesitation reads as real caution earned from recent, painful experience.

🪶 David had already lost one promised marriage
🗣️ Calling himself poor was customary humility
🐑 His family actually owned land and flocks
📖 His caution came from real experience

## 🩸 An Hundred Foreskins Of The Philistines

Circumcision marked God's covenant people, going back to the promise made to Abraham.

Saul turns a marriage dowry into a battlefield body count instead of payment.

This request doubles as both an insult to the Philistines and a death wish for David.

Every part of this offer serves Saul's hidden goal.

🩸 Circumcision marked God's covenant people
⚔️ The dowry became a battlefield body count
🎯 It insulted the Philistines and endangered David
📖 Every detail served Saul's hidden goal

## 🎯 Saul Thought To Make David Fall By The Hand Of The Philistines

This exact plan was already stated once before, back in verse seventeen.

The narrator repeats it here so no reader can call it a misunderstanding.

Saul's scheme has not changed, only the daughter he is using to run it.

His intentions toward David are now stated beyond any possible doubt.

🎯 This plan already appeared in verse seventeen
🔁 The narrator repeats it on purpose
👰 Only the daughter used to run it changed
📖 Saul's intentions are now beyond doubt

# FirstSamuel 18:26-30
# 👑 David Becomes The King's Son In Law
---
## ⏳ The Days Were Not Expired

Saul had set a deadline for this bloody dowry task.

David does not wait until the last moment to act.

He moves while there is still time remaining on the clock.

His eagerness contrasts sharply with Saul's hope that the task would kill him first.

⏳ Saul had set a deadline
🏃 David acted before it even ran out
🎯 His eagerness contrasts with Saul's hope
📖 Speed itself became part of his answer

## 💪 Slew Of The Philistines Two Hundred Men

Saul had asked for one hundred foreskins as the price of marriage.

David returns having doubled that exact number on his own.

This is not simple obedience, it is dramatic overachievement.

David keeps turning every trap Saul sets into another public success.

💪 Saul asked for one hundred
📈 David returned with double that number
🏆 This was overachievement, not simple obedience
📖 Another trap became another success

## 📜 They Gave Them In Full Tale To The King

"Tale" here means a counted, tallied number, not a story.

The full count is presented to Saul as undeniable proof of the task.

Saul cannot deny or dismiss what he can literally count himself.

The evidence is placed directly in the hands of the man who wanted David dead.

📜 Tale means a counted tally, not a story
🔢 The full count proved the task done
👑 Saul could not deny what he counted
📖 Proof sat in his own hands

## 😨 Saul Became David's Enemy Continually

The word continually marks a permanent shift, not a passing mood.

Every earlier flash of anger now hardens into a lasting, settled hostility.

This single line sets the tone for most of the rest of the book.

From this point forward, David is a hunted man in his own nation.

😨 Continually means a permanent shift
🔥 Anger hardens into lasting hostility
🏃 David becomes hunted in his own land
📖 This tone shapes the rest of the book

## 🌟 His Name Was Much Set By

This phrase means David's reputation grew highly respected and esteemed.

Every plot Saul built to destroy David instead built up his fame.

The chapter closes with a sharp, almost ironic contrast between the two men.

The king plots in secret while the shepherd rises in plain sight.

🌟 David's reputation grew highly esteemed
📉 Every plot against him backfired
⚖️ The chapter ends on a sharp contrast
📖 One man plots while the other rises
`.trim();

export const FIRST_SAMUEL_EIGHTEEN_PERSONAL_SECTIONS = parseFirstSamuelEighteenRawNotes(FIRST_SAMUEL_EIGHTEEN_RAW_NOTES);
