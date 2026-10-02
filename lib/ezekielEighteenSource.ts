export type EzekielEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielEighteenRawNotes(rawText: string): EzekielEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 18:${startVerse}` : `Ezekiel 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Ezekiel 18 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_EIGHTEEN_RAW_NOTES = `# Ezekiel 18:1-4
# 🍇 The Proverb About Sour Grapes
---
## 📜 What Mean Ye, That Ye Use This Proverb

A proverb is a short saying repeated so often it starts to sound like plain fact.

People in Ezekiel's day kept repeating one particular saying about why they were suffering.

They were using it to explain their exile in Babylon as someone else's fault.

God stops them before the saying can spread any further unchallenged.

📜 proverb means a saying repeated as fact
😤 people used it to explain their suffering
👴 they blamed an earlier generation
📖 God interrupts the saying right here

## 🍇 The Fathers Have Eaten Sour Grapes, And The Children's Teeth Are Set On Edge

This old saying pictures one person biting into something sour.

A different person, somewhere else, feels the strange tingling in their own teeth.

The fathers stand for the generation that sinned before the exile began.

The children stand for the generation now paying the price in Babylon.

The claim hidden inside the saying is that guilt can simply pass from one mouth to another.

🍇 sour grapes pictures someone else's bad choice
🦷 teeth on edge means a sour tingling feeling
👴 the fathers are the earlier sinful generation
📖 the children blame them for their own exile

## 🙏 As I Live, Saith The Lord GOD

This phrase is one of the strongest oaths God uses anywhere in scripture.

God swears by His own eternal life because nothing greater exists to swear by.

Whatever follows this phrase is certain, not a passing comment.

Ezekiel saves it for the most serious statements in the whole book.

🙏 God swears by His own life here
⚖️ nothing greater exists for God to swear by
✅ what follows is certain, not a guess
📖 Ezekiel saves this phrase for serious words

## 🛑 Ye Shall Not Have Occasion Any More To Use This Proverb

God does not argue with the saying first.

He simply ends its use in Israel completely.

"Occasion" here means an excuse or opportunity to repeat it.

Removing the excuse matters more to God than winning the argument point by point.

🛑 God ends the saying's use completely
💬 occasion means an excuse to repeat it
🚫 no more opportunity to use it
📖 God removes the excuse, not just the argument

## 👤 All Souls Are Mine

God claims direct ownership over every single person, not just the nation as a group.

The father belongs to God.

The son belongs to God just as much.

Neither one can be traded for the other or punished in the other's place.

👤 God claims every soul as His own
👴 the father belongs to God
👦 the son belongs to God too
📖 neither can stand in for the other

## ⚰️ The Soul That Sinneth, It Shall Die

This is the main point of the entire chapter, stated in one short line.

Punishment lands on the person who actually sinned.

It does not skip generations or travel sideways to someone else.

Everything that follows in Ezekiel eighteen explains and defends this one sentence.

⚰️ the sinner is the one who dies
🎯 punishment lands on the guilty person
🚫 it does not skip to someone else
📖 the whole chapter explains this one line

# Ezekiel 18:5-9
# ⚖️ What Makes A Man Just
---
## ⚖️ If A Man Be Just, And Do That Which Is Lawful And Right

"Just" here means living in a way that matches God's own standard of right and wrong.

God is about to list specific actions, not just a vague feeling of being a good person.

Each item in this list answers a real question an ancient Israelite could be tempted to ignore.

The list builds one case at a time toward a single verdict.

⚖️ just means matching God's own standard
📋 God lists specific actions, not a feeling
❓ each item answers a real temptation
📖 the list builds toward one verdict

## ⛰️ Hath Not Eaten Upon The Mountains

High hilltops across Israel were common sites for worshiping other gods.

Eating a meal there usually meant taking part in a pagan sacrifice and its feast.

Staying away from that meal was a clear, visible refusal to join in.

This is the first item in the list because idol worship struck at the heart of the covenant.

⛰️ mountains were common idol worship sites
🍽️ eating there meant joining a pagan feast
🙅 staying away was a visible refusal
📖 idol worship heads the whole list

## 👀 Lifted Up His Eyes To The Idols Of The House Of Israel

Lifting the eyes toward something in scripture often pictures desire, not just a glance.

Some Israelites had set up idols of their own.

They still called themselves God's people.

Looking toward those idols with longing was treated the same as worshiping them outright.

The sin starts in the gaze long before it reaches the hands.

👀 lifted eyes pictures real desire
🗿 some Israelites kept idols of their own
💔 longing counted the same as worship
📖 sin starts in the gaze first

## 💔 Hath Defiled His Neighbour's Wife

"Defiled" means made impure through a serious moral wrong, here adultery.

This law protected marriages within the community from betrayal by a neighbor.

Breaking it damaged more than one household at once.

Trust between neighbors depended on this boundary holding.

💔 defiled means made impure through adultery
🏠 this law protected a neighbor's marriage
💥 breaking it damaged more than one home
📖 trust between neighbors depended on this

## 🩸 Come Near To A Menstruous Woman

This law comes from the purity code in Leviticus, not from any fault in the woman.

A man was required to respect her monthly cycle as a time of ceremonial separation.

Ignoring that boundary was treated as a lack of basic self control.

The command protected a woman's dignity during a vulnerable time.

🩸 menstruous refers to her monthly cycle
📜 Leviticus sets this purity law out fully
🙅 ignoring it showed a lack of control
📖 the law protected her dignity

## 🧥 Hath Restored To The Debtor His Pledge

A pledge was an item, often a coat, held as security for a loan.

The law required lenders to return a poor man's cloak before nightfall so he could sleep warm.

A just man gave that pledge back even when he had every legal right to keep it.

Mercy mattered more to him than the letter of the contract.

🧥 a pledge was security held for a loan
🌙 the law required its return by nightfall
🤲 a just man gave it back anyway
📖 mercy outweighed the letter of the deal

## 🛡️ Spoiled None By Violence

"Spoiled" here means robbed or plundered using force.

A just man never used his strength to take what belonged to someone weaker.

This stands in direct contrast to the violent son described later in the chapter.

Restraint, not just the absence of a crime, is the point being made.

🛡️ spoiled means robbed by force
💪 a just man never used strength to steal
🔄 this contrasts the violent son ahead
📖 restraint itself is the point here

## 🍞 Given His Bread To The Hungry, And Covered The Naked With A Garment

These two actions describe basic, practical charity.

This is not one dramatic gesture.

Feeding someone and clothing someone meet the most immediate human needs first.

A just man shares what he has instead of only avoiding wrong.

Righteousness here is measured by generosity, not merely by what a person refrains from doing.

🍞 bread for the hungry meets a real need
🧥 a garment covers real physical need
🤲 a just man shares what he has
📖 righteousness includes generosity, not only restraint

## 💰 Given Forth Upon Usury, Neither Hath Taken Any Increase

"Usury" means charging interest on a loan.

"Increase" means profit taken from someone else's hardship through that interest.

The law forbade charging interest to a fellow Israelite in need.

A just man let the loan itself be the help, without adding a hidden cost.

💰 usury means charging interest on a loan
📈 increase means profit from another's hardship
🚫 the law forbade this among Israelites
📖 the loan stayed a pure act of help

## ⚖️ Withdrawn His Hand From Iniquity, Hath Executed True Judgment

"Iniquity" means serious, willful wrongdoing.

Withdrawing the hand from it pictures stopping a wrong action before it is carried out.

"True judgment" means ruling without favoritism between two people in a dispute.

A just man refuses wrong for himself and demands fairness for everyone else too.

⚖️ iniquity means serious willful wrongdoing
✋ withdrawing the hand means stopping the act
📜 true judgment means a fair ruling
📖 fairness applies to his own case and others

## 📖 Hath Walked In My Statutes, And Hath Kept My Judgments, To Deal Truly

"Statutes" are God's fixed commands, and "judgments" are His rulings on specific situations.

Walking in them pictures a steady, ongoing way of life, not one good decision.

"To deal truly" means his daily conduct matched his claimed beliefs.

This line sums up everything listed since verse six into one lived pattern.

📜 statutes are God's fixed commands
⚖️ judgments are His rulings on cases
🚶 walking pictures a steady way of life
📖 this line sums up the whole list

## ✅ He Is Just, He Shall Surely Live, Saith The Lord GOD

This is the first time the chapter states its reward formula in full.

A life built on the pattern just described earns God's own verdict of life.

This exact formula will repeat and reverse throughout the rest of the chapter.

Watching for it is the key to following the whole argument.

✅ this is the chapter's first full verdict
🔁 the same formula repeats later on
🔄 it will also reverse for the wicked
📖 this formula is the key to the chapter

# Ezekiel 18:10-13
# 🗡️ A Son Who Breaks Every Rule
---
## 🗡️ A Son That Is A Robber, A Shedder Of Blood

God now imagines a just man's son who turns out completely differently.

"A shedder of blood" is an old way of naming a murderer.

The contrast with the father described in the last section is deliberate and sharp.

Family history alone will not decide what happens to this son.

🗡️ shedder of blood means a murderer
👴 this son contrasts sharply with his father
🔀 the comparison is deliberate and sharp
📖 family history will not decide his fate

## 🚫 Doeth Not Any Of Those Duties

This phrase points straight back to the list of righteous actions in verses six through nine.

Everything the father did, this son refuses to do.

Repeating the list in reverse makes the contrast impossible to miss.

The son is not condemned for one mistake but for rejecting the whole pattern.

🚫 recalls the righteous list from earlier
🔄 the son reverses his father's whole pattern
❌ one mistake is not the real charge
📖 rejecting the whole pattern is the charge

## 🤢 Hath Committed Abomination

"Abomination" describes something that God finds deeply disgusting, not merely against the rules.

Ezekiel uses this word again and again for the worst offenses in the book.

Idol worship, violence, and sexual sin all earn this same strong label here.

The word choice itself signals how seriously God views this son's life.

🤢 abomination means deeply disgusting to God
🗿 idols and violence both earn the label
📣 the word itself signals real seriousness
📖 Ezekiel repeats this word for the worst sins

## ❓ Shall He Then Live? He Shall Not Live

This question and answer pattern will repeat throughout the chapter.

Asking it out loud forces the listener to reach the conclusion themselves.

The honest answer here is immediate and unsoftened.

A righteous father cannot purchase life for a son who refuses righteousness.

❓ this pattern repeats through the chapter
🙅 the honest answer comes immediately
👴 a righteous father cannot buy the son's life
📖 each person answers for his own life

## ⚰️ He Hath Done All These Abominations, He Shall Surely Die

This verdict mirrors the earlier one in verse nine, only reversed.

The same formula that promised life now pronounces death instead.

Nothing about his father's record changes this son's outcome.

The chapter is building its case one matched pair at a time.

⚰️ this verdict mirrors verse nine, reversed
🔄 the same formula now pronounces death
👴 his father's record does not help him
📖 the chapter builds its case in pairs

## 🩸 His Blood Shall Be Upon Him

This old phrase places full responsibility on the person himself, not on anyone else.

No one else carries the weight of his choices, not even his righteous father.

The phrase appears elsewhere in the Law for cases of deserved punishment.

Guilt, like blessing, stays with the person who actually earned it.

🩸 this idiom places guilt on the guilty
👴 his father carries none of this weight
📜 the Law uses this phrase elsewhere too
📖 guilt stays with the one who earned it

# Ezekiel 18:14-18
# 👦 A Grandson Who Breaks The Cycle
---
## 👀 That Seeth All His Father's Sins Which He Hath Done, And Considereth

This third generation watches his own father's violent life up close.

"Considereth" means he stops to think carefully instead of simply copying what he sees.

Watching sin clearly is not the same as repeating it.

This one word marks the turning point for his entire life.

👀 he watches his father's sins up close
🤔 considereth means stopping to think carefully
🚫 watching sin differs from repeating it
📖 this word marks his whole turning point

## 🔁 That Hath Not Eaten Upon The Mountains, Neither Hath Lifted Up His Eyes To The Idols

This grandson is measured against the exact same list given for the righteous father back in verse six.

Repeating the list word for word on purpose shows the standard never actually changes between generations.

A corrupt father in between did not lower the bar for this son.

God judges him by the same unchanging measure, not by his family's recent history.

🔁 the same list from verse six returns here
📏 the standard never changes between generations
👴 his corrupt father did not lower the bar
📖 God measures him by the same standard

## 🤲 Taken Off His Hand From The Poor, That Hath Not Received Usury Nor Increase

This young man actively protects the poor instead of taking advantage of them.

He refuses the same interest based profit his father likely practiced without hesitation.

Choosing differently from a parent takes real, deliberate effort, not accident.

His life answers his father's example on purpose, verse by verse.

🤲 he actively protects the poor
🚫 he refuses interest based profit
💪 choosing differently takes real effort
📖 his life answers his father's example

## ✅ He Shall Not Die For The Iniquity Of His Father, He Shall Surely Live

This is the payoff the whole illustration has been building toward.

A corrupt father does not doom a son who chooses a different path.

The formula from verse nine returns here fully intact.

Three generations in a row have now each been judged on their own choices alone.

✅ this is the illustration's clear payoff
👴 a corrupt father does not doom his son
🔁 the verse nine formula returns intact
📖 three generations judged on their own choices

## 💥 Spoiled His Brother By Violence

The word "brother" here points to a fellow Israelite, not only a literal sibling.

Harming a member of one's own covenant community carried extra weight in this culture.

This detail sharpens exactly how serious the father's crimes really were.

Betraying someone bound to you by covenant cuts deeper than harming a stranger.

💥 brother means a fellow Israelite here
🤝 covenant ties made the harm more serious
📏 this detail sharpens the father's guilt
📖 betraying your own cuts deeper than a stranger

## ⚰️ Even He Shall Die In His Iniquity

The father's own fate closes out this three generation illustration.

His son's righteousness never transfers backward to rescue him.

Just as goodness cannot be inherited, it also cannot be borrowed from someone else.

Each man in this story stands or falls entirely on his own record.

⚰️ the father's fate closes the illustration
🔄 his son's goodness cannot rescue him
🚫 righteousness cannot be borrowed either
📖 each man stands on his own record

# Ezekiel 18:19-20
# ❓ Does The Son Bear The Father's Guilt
---
## ❓ Yet Say Ye, Why? Doth Not The Son Bear The Iniquity Of The Father

The people push back directly against everything just explained.

Their question assumes guilt should naturally pass from parent to child.

God lets the objection stand plainly before answering it head on.

Honest objections get a real answer in this chapter, not a dismissal.

❓ the people push back directly here
👴 they assume guilt passes to children
📣 God lets the objection stand first
📖 honest questions get a real answer

## 🙅 The Son Shall Not Bear The Iniquity Of The Father, Neither Shall The Father Bear The Iniquity Of The Son

Verse four already said the soul that sinneth shall die.

That exact line is repeated here as the real answer.

Saying it a second time anchors the whole chapter to one unmovable rule.

This is the clearest, most direct statement of the chapter's whole argument.

Guilt simply does not travel sideways between family members.

The proverb about sour grapes from verse two is now fully overturned.

Each person carries only the weight of what they themselves have done.

🙅 guilt does not travel between generations
🍇 the sour grapes proverb is overturned
👨‍👦 father and son each stand alone
📖 each person carries only his own weight

## ⚖️ The Righteousness Of The Righteous Shall Be Upon Him, And The Wickedness Of The Wicked Shall Be Upon Him

This line flips the same truth over to its positive side.

Good credit does not transfer sideways any more than guilt does.

A person cannot coast on a parent's righteousness any more than they are doomed by a parent's sin.

The whole chapter has now stated its core idea from every angle.

⚖️ this flips the same truth to the positive
🙅 good credit does not transfer either
👪 no one coasts on a parent's record
📖 the core idea is now fully stated

# Ezekiel 18:21-23
# 🔄 Life Offered To The Wicked
---
## 🔄 If The Wicked Will Turn From All His Sins That He Hath Committed

Up to this point, the chapter has judged people by a fixed pattern of life.

Now the argument introduces something new, the possibility of real change.

"Turn" means a complete change of direction, not a small adjustment.

A person's record is not a life sentence if that record actually changes.

🔄 turn means a full change of direction
📏 a record is not a permanent sentence
🆕 real change is now introduced here
📖 the argument now allows for change

## ✅ He Shall Surely Live, He Shall Not Die

This is the same reward formula used for the righteous man back in verse nine.

A wicked man who genuinely turns receives the identical outcome.

Past behavior does not get a permanent vote over a changed present.

The door out of judgment stays open as long as a person is alive.

✅ the same reward formula applies here
🔄 a changed life receives the same outcome
🚪 the door out of judgment stays open
📖 a changed present outweighs the past

## 🗑️ All His Transgressions That He Hath Committed, They Shall Not Be Mentioned Unto Him

"Mentioned" here means counted or held against someone in a final judgment.

A genuinely changed life gets a clean accounting, not a long list still held in reserve.

This is not forgetfulness on God's part, it is a deliberate choice not to count it.

The old record is treated as fully closed.

🗑️ mentioned means counted against someone
🧾 a changed life gets a clean accounting
🤲 God chooses not to count the old record
📖 the old record is treated as closed

## ❤️ Have I Any Pleasure At All That The Wicked Should Die

This rhetorical question reveals what God actually wants, not just what He allows.

Many readers assume God delights in punishing the guilty.

This verse flatly denies that assumption in God's own words.

God prefers a changed life over a judgment carried out.

❤️ this question reveals what God wants
🙅 God does not delight in punishment
🔄 God prefers a turn over a judgment
📖 mercy is God's stated preference here

# Ezekiel 18:24
# 📉 The Righteous Who Turns Away
---
## 📉 When The Righteous Turneth Away From His Righteousness

The chapter now flips the previous case over to show the opposite direction.

A good record in the past does not guarantee a good outcome in the end.

"Turneth away" pictures a full reversal, not one slip or one bad day.

The same honesty that offered hope to the wicked now warns the righteous.

📉 the case now flips to the opposite
📏 a past record does not guarantee the end
🔄 turneth away means a full reversal
📖 the same honesty now warns the righteous

## 🤢 Doeth According To All The Abominations That The Wicked Man Doeth

This phrase deliberately uses the same strong word, "abomination," used earlier for the violent son.

There is no softer category reserved for someone with a good history.

The same actions earn the same label no matter who commits them.

God's standard treats everyone's current choices with equal weight.

🤢 abomination here is the same strong word
📏 no softer category exists for a good history
⚖️ the same actions earn the same label
📖 current choices are weighed equally for all

## 🗑️ All His Righteousness That He Hath Done Shall Not Be Mentioned

This line mirrors verse twenty two, flipped to the opposite outcome.

Past good deeds do not offset a present, total turn toward sin.

A righteous history is real, but it is not a permanent credit balance.

The same mercy that forgets a changed sinner's past will not excuse a changed saint's present sin.

🗑️ this mirrors verse twenty two, reversed
💳 good deeds are not a permanent credit
🔄 the present choice outweighs the past record
📖 mercy for change runs in both directions

## ⚰️ In His Trespass That He Hath Trespassed, And In His Sin That He Hath Sinned, In Them Shall He Die

Repeating "trespass" and "sin" twice each emphasizes how total this fall really is.

He is judged in the very sins he is currently committing, not in some older memory of goodness.

This closes the case with the same seriousness shown toward the wicked son earlier.

Fairness in this chapter runs in both directions without exception.

⚰️ the doubled wording stresses a total fall
🎯 he is judged in his present sins
⚖️ the same seriousness applies both ways
📖 fairness here has no exception

# Ezekiel 18:25-29
# ⚖️ Is My Way Unequal
---
## 😠 Yet Ye Say, The Way Of The LORD Is Not Equal

The people respond to this teaching with a direct accusation against God himself.

They claim His standard of judgment is unfair in some way.

God does not ignore the charge or punish them simply for asking.

He answers the accusation plainly instead.

😠 the people accuse God directly here
⚖️ they claim His judgment is unfair
🙅 God does not punish them for asking
📖 He answers the accusation plainly

## ❓ Hear Now, O House Of Israel, Is Not My Way Equal? Are Not Your Ways Unequal

God turns the same accusation back onto the people who made it.

He insists His own standard has been perfectly consistent the entire time.

The real inconsistency, He says, sits in their shifting expectations instead.

A fair standard can still feel unfair to someone who keeps changing the rules for themselves.

❓ God turns the accusation back on them
📏 His standard has stayed perfectly consistent
🔄 their own expectations keep shifting instead
📖 a fair rule can still feel unfair

## 📉 When A Righteous Man Turneth Away From His Righteousness, And Dieth In Them

God restates the righteous man's reversal from verse twenty four in slightly shorter form.

Saying it twice in close succession makes the point impossible to miss or argue away.

His death here is tied directly to his own current iniquity, not his earlier record.

The repetition itself is part of the argument, not filler.

📉 this restates verse twenty four briefly
🔁 saying it twice makes it unmissable
🎯 his death is tied to present sin
📖 the repetition itself argues the point

## 🔄 When The Wicked Man Turneth Away From His Wickedness, He Shall Save His Soul Alive

"Save his soul alive" is a strong phrase for genuine rescue from death.

This mirrors the hope already offered back in verse twenty one, restated for emphasis.

Rescue here comes entirely from the turning itself, not from anything else he brings.

The door for the wicked is shown open twice now, not just once.

🔄 this mirrors the hope from verse twenty one
💾 save his soul alive means genuine rescue
🚪 rescue comes from the turning itself
📖 the open door is restated for emphasis

## 🤔 Because He Considereth, And Turneth Away From All His Transgressions

This repeats the exact word already used for the grandson back in verse fourteen.

"Considereth" marks the moment of honest self examination that starts real change.

Without that pause to think, no actual turning ever happens.

The whole chapter keeps returning to this single hinge moment.

🤔 considereth repeats the word from verse fourteen
🔑 it marks the start of real change
🚫 no turning happens without this pause
📖 the chapter keeps returning to this hinge

## 😠 Yet Saith The House Of Israel, The Way Of The LORD Is Not Equal

The people repeat their exact same complaint from verse twenty five.

Restating it word for word shows how stubbornly they are holding onto the objection.

God is willing to answer the same honest challenge more than once.

Patience with real questions runs throughout this entire chapter.

😠 the people repeat their earlier complaint
🔁 restating it shows real stubbornness
🙏 God answers the same challenge twice
📖 patience with questions runs through it all

## ❓ O House Of Israel, Are Not My Ways Equal? Are Not Your Ways Unequal

God gives the identical answer a second time, word for word.

Nothing in His standard has moved between the first complaint and the second.

The steady repetition itself becomes part of the proof.

A fair rule does not need to change just because it keeps getting challenged.

❓ God repeats the identical answer again
📏 nothing in His standard has moved
🔁 the repetition itself becomes proof
📖 a fair rule survives a second challenge

# Ezekiel 18:30-32
# 💚 A New Heart And A New Spirit
---
## ⚖️ I Will Judge You, O House Of Israel, Every One According To His Ways

This line finally applies the whole argument directly to the people listening.

Judgment is personal, one individual life at a time, not one verdict for the whole nation at once.

Everything proven through fathers, sons, and grandsons now lands on each listener personally.

The illustrations were never just a story, they were preparing this exact moment.

⚖️ judgment is personal, not national
👤 each listener is judged individually
📖 the illustrations prepared this exact moment
➡️ the whole argument now applies directly

## 🔄 Repent, And Turn Yourselves From All Your Transgressions

"Repent" here means a genuine change of mind that leads to a changed direction.

This is not a request for guilt or sadness alone.

It is a call to actually walk a different way starting now.

The same word already proven possible in verses twenty one and twenty seven is now commanded.

🔄 repent means a genuine change of direction
😔 sadness alone is not what is asked
🚶 a different walk is what is commanded
📖 this turn was already proven possible

## ⚠️ So Iniquity Shall Not Be Your Ruin

"Ruin" here means the destructive downfall that continued sin leads to.

This outcome is described as avoidable, not inevitable.

The same choice that destroyed the wicked son earlier can be refused here instead.

Warning and hope sit side by side in this single short line.

⚠️ ruin means a destructive downfall
🔄 this outcome is avoidable, not fixed
🙅 the wicked son's path can be refused
📖 warning and hope sit together here

## 🗑️ Cast Away From You All Your Transgressions, Whereby Ye Have Transgressed

Casting something away pictures physically dropping a heavy load someone has been carrying.

This is a far more active picture than simply feeling sorry about the past.

God asks for a decisive, visible break from the old pattern.

Regret alone was never the goal of this entire chapter.

🗑️ casting away pictures dropping a heavy load
💪 this is active, not just a feeling
✋ a decisive break is what is asked
📖 regret alone was never the real goal

## 💚 Make You A New Heart And A New Spirit

In scripture, the heart represents the center of a person's will and decisions, not just emotion.

This command asks for a complete inward change, not only different outward behavior.

Later in this same book, God promises to personally give His people exactly this new heart.

Here the command comes first, and the full promise of help arrives afterward.

💚 the heart means a person's will and choices
🔄 a full inward change is asked for here
📖 Ezekiel later promises to give this heart
➡️ the command comes before the full promise

## ❤️‍🩹 For Why Will Ye Die, O House Of Israel

This question is not really seeking new information.

It carries real emotion, almost pleading, not cold legal reasoning.

God wants His people to choose life, and He says so directly.

The whole weight of the chapter's argument lands in this one personal question.

❤️‍🩹 this question carries real emotion
🙏 God is pleading, not just reasoning
🌱 God wants His people to choose life
📖 the chapter's whole weight lands here

## ❤️ For I Have No Pleasure In The Death Of Him That Dieth

This exact claim already appeared back in verse twenty three.

Returning to it here closes the chapter with the same truth it leaned on earlier.

God's attitude toward judgment has not shifted even slightly across the whole argument.

Consistency itself becomes part of the final appeal.

❤️ this claim repeats from verse twenty three
🔁 the chapter closes on the same truth
📏 God's attitude never shifted throughout
📖 consistency becomes part of the appeal

## 🌱 Wherefore Turn Yourselves, And Live Ye

This is the very last line of the chapter, and it ends on an open invitation.

Every argument, illustration, and repeated formula has been building toward this one simple command.

The choice is placed directly in the listener's hands.

Life, not death, is what God is actively calling His people toward.

🌱 the chapter ends on an open invitation
🏗️ every argument built toward this command
🤲 the choice is placed in their hands
📖 God actively calls His people toward life`.trim();

export const EZEKIEL_EIGHTEEN_PERSONAL_SECTIONS = parseEzekielEighteenRawNotes(EZEKIEL_EIGHTEEN_RAW_NOTES);
