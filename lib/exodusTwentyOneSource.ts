export type ExodusTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyOneRawNotes(rawText: string): ExodusTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 21:${startVerse}` : `Exodus 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 21 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_ONE_RAW_NOTES = `# Exodus 21:1-6
# ⛓️ Laws For A Hebrew Servant
---
## ⚖️ Now These Are The Judgments Which Thou Shalt Set Before Them

"Judgments" means specific rulings for real, everyday conflicts.

The Ten Commandments laid out God's broad moral law.

This chapter works out how those commands apply case by case.

A servant dispute, a goring ox, an uncovered pit each get their own ruling.

Think of a judgment as a case already decided before the trouble starts.

⚖️ Judgments means specific case rulings

📜 The Ten Commandments set the broad law

🔍 This chapter works out daily conflicts

📖 Every dispute already has an answer

## ⛓️ Six Years He Shall Serve

This describes debt servitude, not slavery as later practiced in history.

A poor Israelite could pay off a debt through labor.

The law fixed a hard limit at six years.

On the seventh year he walked free, owing nothing.

Think of it as a loan finally cleared, not a life sentence.

⛓️ This describes debt servitude, not slavery

💰 A debt was paid off through labor

🔟 Six years was the fixed limit

📖 God protected the poor from endless bondage

## 👫 Then His Wife Shall Go Out With Him

The rule matches how a servant entered service.

If he arrived single, he left single.

If he arrived already married, his wife left with him.

The law followed the family status that already existed before service began.

👫 Marital status carried through the whole term

🚪 A single man left single

👰 A married man left with his wife

📖 The law respected the family as it stood

## 👰 The Wife And Her Children Shall Be Her Master's

This verse covers a different case than the one before it.

Here the master gave the servant a wife during his service.

That wife and any children belonged to the master's household.

When the six years ended, the servant left alone.

This sets up the choice covered in the next two verses.

👰 This wife was given during his service

🏠 She and her children stayed in the household

🚶 The servant alone was free to leave

➡️ That choice leads into the next verses

## 🗣️ I Love My Master, My Wife, And My Children

A servant could choose to stay past his six years.

This was never forced or expected of him.

He had to say it plainly, out loud, in front of witnesses.

Love for his household outweighed his own freedom.

🗣️ He had to say this plainly aloud

🆓 Staying was always his own choice

❤️ Love for his family outweighed freedom

📖 This choice needed real, public witnesses

## 🔧 His Master Shall Bore His Ear Through With An Aul

"Aul" means a sharp, pointed tool, close to an awl used for leather.

The master brought the servant to the door post of the house.

Piercing his ear there left a permanent, visible mark.

The doorpost stood for the household itself.

The mark told everyone this servant had chosen to stay for life.

🔧 An aul was a sharp piercing tool

🚪 The doorpost stood for the household

👂 The mark was permanent and visible

📖 It showed a lifelong choice, not a sentence

# Exodus 21:7-11
# 👰 Protecting A Female Servant
---
## 👰 If A Man Sell His Daughter To Be A Maidservant

This law describes a different arrangement than a male servant's contract.

A father could arrange for his daughter to serve in another household.

Verse eight shows this usually pointed toward marriage, not ordinary labor.

Because of that, she did not leave service the way male servants did.

The rest of this section protects her inside that arrangement.

👰 This differs from a male servant's contract

🏠 A father could arrange this for his daughter

💍 It usually pointed toward marriage

📖 Her protections come from that difference

## 💍 To Sell Her Unto A Strange Nation He Shall Have No Power

"Betrothed" means promised in marriage, not yet fully married.

If the man changed his mind, he could not simply sell her elsewhere.

Selling her to a foreign household would have left her without family protection.

The law names this exact failure "dealing deceitfully."

He made a promise, and the law held him to it.

💍 Betrothed means promised, not yet married

🚫 He could not resell her elsewhere

🌍 A foreign sale meant losing family protection

📖 Breaking the promise counted as deceit

## 👨‍👦 If He Have Betrothed Her Unto His Son

The arrangement could also point toward marrying the man's son.

In that case the law required treating her as a real daughter.

She was never meant to become cheap labor with no standing.

Her legal status followed whichever marriage path the family chose.

👨‍👦 She could be promised to the son instead

👧 The law required treating her as a daughter

🚫 She was never meant to be cheap labor

📖 Her standing followed the marriage path chosen

## 👗 Her Food, Her Raiment, And Her Duty Of Marriage, Shall He Not Diminish

"Raiment" means clothing.

This covers what happens if the man later takes a second wife.

Her food, her clothing, and her marital rights had to stay the same.

If he failed on any of those three, she went free at once.

The law refused to let her be quietly pushed aside.

👗 Raiment means clothing

⚖️ A second wife could not reduce her rights

🆓 Failure on any point set her free

📖 The law protected her from being pushed aside

# Exodus 21:12-14
# 🗡️ Murder Versus Accidental Death
---
## 🗡️ He That Smiteth A Man, So That He Die, Shall Be Surely Put To Death

"Smiteth" means to strike or hit.

Deliberately killing another person carried the death penalty.

This law treats human life as something no one may take.

It sets the seriousness of murder before the next two verses explain the exceptions.

🗡️ Smiteth means to strike or hit

⚖️ Deliberate killing carried the death penalty

👤 Human life could not be taken lightly

➡️ The next verses cover the exceptions

## 🎯 I Will Appoint Thee A Place Whither He Shall Flee

This describes an accident, not murder.

"Lie not in wait" means the killer had no plan and no intent.

God calls this an accident He allowed, not a crime someone chose.

A designated safe place protected that person from revenge.

This plants the seed for the full cities of refuge system, laid out later in Numbers.

🎯 Lie not in wait means no intent

🙌 God calls this an accident, not a crime

🏃 A safe place protected the innocent

📖 This becomes the cities of refuge in Numbers

## 😤 Thou Shalt Take Him From Mine Altar, That He May Die

"Presumptuously" means acting deliberately and with open defiance.

"Guile" means deceitful trickery.

Touching the altar was normally a way to claim protection.

A planned, deceitful killer could not use the altar to escape justice.

No holy place could shield someone who had already decided to kill.

😤 Presumptuously means deliberate defiance

🎭 Guile means deceitful trickery

⛪ The altar normally offered protection

📖 Premeditated murder had no safe hiding place

# Exodus 21:15-17
# 👊 Crimes Against Father And Mother
---
## 👊 He That Smiteth His Father, Or His Mother, Shall Be Surely Put To Death

Striking a parent carried the same penalty as murder.

This is not describing ordinary childhood conflict.

It targets a violent, open attack on the people who raised him.

The law placed enormous weight on honoring father and mother.

👊 Striking a parent equaled murder's penalty

🚫 This was violent attack, not childhood conflict

👨‍👩‍👧 Honoring parents carried enormous weight

📖 Family authority was protected at the highest level

## 🚫 He That Stealeth A Man, And Selleth Him

This law targets kidnapping someone specifically to sell them.

It applies whether the victim was caught in the act or found later.

Turning a human being into property for profit carried the death penalty.

This stands apart from the limited debt servitude allowed earlier in the chapter.

🚫 This criminalizes kidnapping to sell a person

💰 Turning a person into property was a crime

⛓️ This differs from lawful, limited debt servitude

📖 Human trafficking carried the harshest penalty

## 🗣️ He That Curseth His Father, Or His Mother, Shall Surely Be Put To Death

"Curseth" here does not mean a single angry outburst.

It means a deliberate, ongoing rejection of a parent's authority.

The word carries the weight of treating a parent as worthless.

This law sits beside verse fifteen, since both attack the same thing.

🗣️ Curseth means deliberate, ongoing contempt

🚫 Not a single angry outburst

👎 It treats a parent as worthless

📖 Respect for parents mattered at the highest level

# Exodus 21:18-21
# 🥊 Injury In A Fight
---
## 🥊 If He Rise Again, And Walk Abroad Upon His Staff

This describes two men fighting, one striking the other with a stone or a fist.

"Walk abroad upon his staff" means the injured man could walk again, even with a cane.

Recovery cleared the other man of serious criminal guilt.

The fight itself was not treated as murder once the injured man survived and healed.

🥊 Two men fighting with a stone or fist

🦯 Walking on a staff means real recovery

✅ Recovery cleared serious criminal guilt

📖 Survival changed the whole legal outcome

## 💰 He Shall Pay For The Loss Of His Time, And Shall Cause Him To Be Thoroughly Healed

Being cleared of a crime did not erase every cost.

The man who caused the injury still owed real money.

That money covered wages lost during recovery.

It also covered the full cost of proper healing.

💰 Being cleared did not erase all cost

⏳ He owed wages lost during recovery

🩹 He also owed the cost of healing

📖 Justice still required real restitution

## 🏒 If A Man Smite His Servant, Or His Maid, With A Rod

This law applies directly to a master beating his own servant.

A "rod" was a stick used for discipline or correction.

If that beating killed the servant, the master faced real punishment.

A servant's life had legal value, even under his own master.

Few ancient legal systems protected servants this directly.

🏒 A rod means a stick used for discipline

⚰️ Killing a servant brought real punishment

⚖️ A servant's life had legal value

📖 Few ancient systems protected servants this way

## ⏳ For He Is His Money

"Notwithstanding" means despite what was just said.

If the servant survived a day or two, the master faced no punishment.

"He is his money" points to the servant's value as property the master had already paid for.

This verse reflects the harsh assumptions behind ancient servitude.

Verse twenty six, later in this chapter, still sets real limits on that power.

⏳ Notwithstanding means despite what was just said

🆓 Surviving a day or two brought no punishment

💰 His money points to his value as property

📖 Verse twenty six sets real limits on this

# Exodus 21:22-27
# 👁️ Serious Injury And Eye For Eye
---
## 🤰 If Men Strive, And Hurt A Woman With Child, So That Her Fruit Depart From Her

"Fruit depart from her" means the pregnancy ends early.

This describes an accident during a fight between two other men.

The woman was not the intended target at all.

The law still took her harm seriously and required real payment.

Her husband and the judges together decided the amount.

🤰 Fruit depart from her means the pregnancy ends

🥊 This happens by accident during a fight

👩 She was never the intended target

📖 The law still required real payment

## ⚖️ Eye For Eye, Tooth For Tooth, Hand For Hand, Foot For Foot

This principle is often called lex talionis, a Latin phrase meaning "law of retaliation."

It sounds brutal to modern ears at first.

In practice it was a limit, not an encouragement toward revenge.

Punishment had to match the actual harm, nothing more.

Courts commonly applied it through fair payment.

Literal injury for injury was rare in practice.

⚖️ Lex talionis means law of retaliation

🛑 It limited punishment to match real harm

🚫 It capped revenge instead of encouraging it

📖 Courts often applied it through fair payment

## 👁️ He Shall Let Him Go Free For His Eye's Sake

This law returns to protecting servants specifically.

Permanently injuring a servant's eye required setting him free at once.

The servant's freedom itself became the penalty.

This placed a real limit on an owner's power, unlike verse twenty one.

👁️ Permanent eye injury required freeing the servant

⚖️ Freedom itself served as the penalty

🛡️ This limited an owner's power

📖 It stands in contrast to verse twenty one

## 🦷 He Shall Let Him Go Free For His Tooth's Sake

The same rule extends to a smaller but still permanent injury, a knocked out tooth.

Even smaller lasting harm still bought a servant's freedom.

These two verses read like a short, growing list of protections.

A servant's body was not simply his master's to damage.

🦷 A knocked out tooth also freed a servant

📏 Even smaller lasting harm still counted

📋 These verses form a list of protections

📖 A servant's body was not property

# Exodus 21:28-32
# 🐂 Laws About A Goring Ox
---
## 🐂 If An Ox Gore A Man Or A Woman

"Gore" means to stab or wound with a horn.

This covers the first time an ox kills someone, with no known history of danger.

The ox itself was put to death.

Its meat could not be eaten afterward.

The owner faced no punishment for a first, unforeseen incident.

🐂 Gore means to stab with a horn

⚰️ The ox itself was put to death

🚫 Its meat could not be eaten

📖 A first, unforeseen incident brought no owner blame

## 🔁 If The Ox Were Wont To Push With His Horn In Time Past

"Wont" means accustomed or habitual.

This covers a different case, an owner who already knew his ox was dangerous.

Witnesses had already warned him, and he still failed to secure the animal.

Because he ignored a known risk, he became legally responsible too.

Both the ox and the negligent owner faced the death penalty here.

🔁 Wont means accustomed or habitual

⚠️ This covers a known, warned danger

🙈 The owner ignored that warning

📖 Known risk made the owner responsible too

## 💰 If There Be Laid On Him A Sum Of Money, Then He Shall Give For The Ransom Of His Life

"Ransom" means a payment made to buy back a life.

The court could allow the negligent owner to pay a fine instead of dying.

The same ruling applied whether the ox killed a son or a daughter.

This gave real mercy without erasing real responsibility.

💰 Ransom means a payment to buy back life

⚖️ A fine could replace the death penalty

👦 The same rule covered a son or daughter

📖 Mercy did not erase real responsibility

## 👤 He Shall Give Unto Their Master Thirty Shekels Of Silver, And The Ox Shall Be Stoned

This same protection extends to servants killed by a known dangerous ox.

"Shekel" was a unit of silver weight used as currency.

Thirty shekels became the fixed price owed to the servant's master.

That exact number reappears later in scripture, as the price paid to betray Jesus.

👤 This protection covered servants too

🪙 A shekel was a unit of silver weight

🔢 Thirty shekels was the fixed price

📖 The same number prices Judas's betrayal later

# Exodus 21:33-36
# 🕳️ Liability For Pits And Oxen
---
## 🕳️ If A Man Shall Open A Pit, Or If A Man Shall Dig A Pit, And Not Cover It

Pits were commonly dug for water storage or as traps.

Leaving one open and uncovered created a real hazard for nearby animals.

If someone's ox or donkey fell in and died, the pit's owner owed compensation.

He kept the dead animal, but had to pay its full value to the original owner.

🕳️ Pits were often dug for water storage

⚠️ An uncovered pit created a real hazard

💰 The pit owner owed full compensation

📖 Carelessness still carried a real cost

## 🐂 If One Man's Ox Hurt Another's, That He Die

This covers two oxen fighting with no warning that either was dangerous.

Neither owner could have prevented it.

Both men shared the loss between them instead of one man bearing it alone.

They sold the surviving ox and split the money, then split the dead ox too.

🐂 Two oxen fight with no prior warning

🤝 Neither owner could have prevented it

⚖️ Both men shared the loss between them

📖 A genuine accident meant a shared burden

## 🔁 He Shall Surely Pay Ox For Ox

This repeats the same principle already seen in verse twenty nine.

A known, ignored pattern of danger changes everything.

The negligent owner now paid the full value alone.

He also kept the dead ox, since he already owed a live one in exchange.

Across this chapter, known and ignored danger always raises the consequence.

🔁 This repeats the pattern from verse twenty nine

⚠️ Known, ignored danger removes shared blame

💰 The owner alone paid full value

📖 Ignored danger always raised the consequence
`.trim();

export const EXODUS_TWENTY_ONE_PERSONAL_SECTIONS = parseExodusTwentyOneRawNotes(EXODUS_TWENTY_ONE_RAW_NOTES);
