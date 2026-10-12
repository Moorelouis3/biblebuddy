export type RomansFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansFourRawNotes(rawText: string): RomansFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 4:${startVerse}` : `Romans 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Romans 4 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_FOUR_RAW_NOTES = `# Romans 4:1-5
# 🙏 Abraham Believed God
---
## What Shall We Say Then That Abraham Our Father Hath Found

Paul turns to Abraham to test everything he just argued.

Abraham was the father every Jewish reader looked to first.

If justification by faith cannot explain Abraham, the whole argument fails.

What Abraham actually found settles the question for every reader after him.

🧓 Abraham is Paul's test case
⚖️ His story proves or breaks the argument
📜 Every Jewish reader looked to him first
📖 What Abraham found settles the question

## He Hath Whereof To Glory, But Not Before God

Justified by works would give Abraham something to brag about.

"Glory" here means boasting in his own achievement.

Paul immediately cuts that boast off with four words.

But not before God closes the door completely.

Any credit Abraham earned by effort could impress other people.

It could never impress the one who sees everything.

💪 Works would let Abraham boast
🗣️ Glory means boasting in achievement
🚫 Paul cuts the boast off fast
📖 God is never impressed by effort

## Abraham Believed God, And It Was Counted Unto Him For Righteousness

"Counted" means credited to his account, the way a payment gets recorded.

Abraham did not earn righteousness through some flawless performance.

He simply believed what God told him about the promised son.

God credited that trust to him as if it were righteousness itself.

This single verse from Genesis fifteen becomes Paul's main proof text.

Everything else in this chapter explains what this one sentence means.

📒 Counted means credited to an account
🙏 Abraham simply believed the promise
💳 God credited trust as righteousness
📖 This verse becomes Paul's main proof

## The Reward Not Reckoned Of Grace, But Of Debt

Verse four pictures a normal job with a paycheck.

A worker who finishes a job earns wages, not a gift.

"Reckoned" means counted or credited, the same word used for Abraham's faith.

Grace and debt describe two completely different ways a reward can be given.

If Abraham earned righteousness by works, God would owe it to him like a wage.

Paul is building toward why that picture cannot be right for Abraham.

💼 Pictures a job with a paycheck
📒 Reckoned means counted or credited
⚖️ Grace and debt are opposites
📖 Earned righteousness would make God a debtor

## To Him That Worketh Not, But Believeth On Him That Justifieth The Ungodly

This verse sounds shocking on purpose.

Most religious systems reward good behavior, not bad behavior.

Justifieth the ungodly means God declares guilty people righteous, not innocent people.

Abraham was simply trusting, not working, when God counted him righteous.

This is the exact pattern every believer stands in after Abraham.

God never justifies people because they stopped sinning first.

😮 This verse sounds shocking on purpose
⚖️ Justifieth the ungodly means declares guilty people righteous
🙏 Abraham trusted instead of working
📖 God justifies sinners, not the already good

## His Faith Is Counted For Righteousness

Verse five restates verse three's principle in different words.

Faith itself becomes the thing God counts, not any resulting work.

This is not faith plus effort combined together.

It is faith alone, credited in full.

The next section brings in David to confirm this same pattern.

🔁 Restates verse three in new words
🙏 Faith alone gets credited by God
🚫 Not faith added to effort
📖 David confirms this same pattern next

# Romans 4:6-8
# 😊 David Describes The Blessedness
---
## David Also Describeth The Blessedness Of The Man

Paul brings in a second witness to support his argument.

David lived centuries after Abraham, under the full law of Moses.

"Blessedness" here means genuine happiness that comes from a right standing with God.

Even under the law, David still found this blessing apart from his own performance.

Two very different men, centuries apart, describe the exact same kind of righteousness.

👑 David is Paul's second witness
📜 David lived under the full law
😊 Blessedness means happiness from right standing
📖 Two men, one same righteousness

## God Imputeth Righteousness Without Works

"Imputeth" is the same idea as counted or reckoned from earlier verses.

It means God credits righteousness to someone's account directly.

Without works means nothing earned or performed enters into that credit.

Paul keeps returning to this one word because the whole argument rests on it.

📒 Imputeth repeats counted and reckoned
💳 God credits righteousness directly
🚫 Without works means nothing earned
📖 This word carries the whole argument

## Blessed Are They Whose Iniquities Are Forgiven

This line is quoted directly from Psalm thirty two.

"Iniquities" means the guilt and wrongdoing a person actually owes for.

Forgiveness here removes that guilt completely instead of just overlooking it.

Blessing in this verse starts with something being taken away, not earned.

📜 Quoted directly from Psalm thirty two
⚖️ Iniquities means guilt that is owed
🧹 Forgiveness removes guilt completely
📖 Blessing starts with removal, not earning

## Whose Sins Are Covered

"Covered" pictures something hidden completely from view, not partly disguised.

Think of a debt that gets fully paid off and sealed shut.

The sin itself still happened, but it no longer stands against the sinner.

This is a second picture for the same forgiveness described in the line before it.

🙈 Covered means hidden completely from view
💳 Like a debt fully paid off
📜 The sin happened but no longer counts
📖 A second picture of the same forgiveness

## Blessed Is The Man To Whom The Lord Will Not Impute Sin

This finishes David's quotation with a third angle on the same truth.

Not imputing sin means God chooses not to count it against that person at all.

Three pictures stack together here, forgiven, covered, and not counted.

Each one looks at the exact same gift from a slightly different side.

David never once mentions keeping the law as part of this blessing.

🔚 Finishes David's three part quotation
🙅 Not imputing means not counted at all
🧩 Forgiven, covered, and not counted together
📖 Keeping the law never appears here

# Romans 4:9-12
# ✂️ Before Or After Circumcision
---
## Cometh This Blessedness Then Upon The Circumcision Only, Or Upon The Uncircumcision Also

Paul now applies David's words to the bigger question of this chapter.

"The circumcision" means Jewish believers, people marked by that sign.

"The uncircumcision" means Gentile believers, people without that sign.

Does this forgiveness only belong to one group, or does it reach both.

Paul already told his readers the answer back in verse three.

❓ Paul widens David's point further
✡️ Circumcision means Jewish believers
🌍 Uncircumcision means Gentile believers
📖 The answer was already given in verse three

## Not In Circumcision, But In Uncircumcision

Paul answers his own question with a specific detail about timing.

Abraham's faith was counted as righteousness back in Genesis fifteen.

His circumcision does not happen until Genesis seventeen, years later.

Faith came first, the physical sign came only after.

⏳ Paul answers with a timing detail
📜 Faith counted in Genesis fifteen
✂️ Circumcision came in Genesis seventeen
📖 Faith came first, the sign came later

## He Received The Sign Of Circumcision, A Seal Of The Righteousness Of The Faith

"Sign" and "seal" describe something that confirms a reality already true.

Circumcision did not create Abraham's righteousness.

It marked, from the outside, a righteousness he already had on the inside.

Think of a stamp placed on a document that was already legally valid.

The stamp does not make the document true, it simply confirms it publicly.

🔏 Sign and seal confirm a reality
🚫 Circumcision did not create righteousness
📮 Like a stamp on a valid document
📖 The mark confirms, it does not create

## The Father Of All Them That Believe, Though They Be Not Circumcised

Being circumcised first would have made Abraham the father of Jews alone.

Believing first, before that sign existed, makes him the father of every believer.

Gentile believers today share Abraham's exact pattern, faith before any religious marking.

This is why Paul calls Abraham the father of all who believe, not only his own nation.

✡️ Circumcision first would limit the fathership
🌍 Faith first makes him father of all
🙏 Gentiles share Abraham's exact pattern
📖 Abraham fathers believers, not just one nation

## The Father Of Circumcision To Them Who Also Walk In The Steps Of That Faith

Abraham is also still the father of circumcised believers, not only uncircumcised ones.

The requirement is not the physical sign itself.

It is walking in the same steps of faith Abraham walked before he had the sign.

A Jewish believer who trusts God the way Abraham did stands in the same family line.

✡️ Abraham fathers Jewish believers too
🚶 The requirement is walking in faith
🙏 Not the sign, but the trust behind it
📖 Faith like Abraham's places anyone in his family

# Romans 4:13-17
# 📜 The Promise Through Faith, Not Law
---
## The Promise, That He Should Be The Heir Of The World

"Heir of the world" is bigger than the land of Canaan alone.

God's promise to Abraham always reached toward blessing every nation on earth.

This phrase widens the scope of the covenant far past one country.

Paul is about to say exactly how that promise gets received.

🌍 Heir of the world means more than Canaan
🤝 God's promise always reached every nation
📏 This widens the covenant's scope
📖 How the promise is received comes next

## Not Through The Law, But Through The Righteousness Of Faith

Paul states plainly which path actually delivers the promise.

The law was never the method by which Abraham received it.

Faith was the method the whole time, long before the law even existed.

This sets up Paul's warning in the very next verse.

📏 Paul names the one true path
🚫 The law never delivered the promise
🙏 Faith delivered it from the start
📖 A warning about the law follows next

## If They Which Are Of The Law Be Heirs, Faith Is Made Void

Paul follows the logic to its breaking point.

If keeping the law earns the inheritance, faith becomes pointless.

"Made void" means completely emptied out, left with no purpose at all.

The two systems, law and faith, cannot both be the actual method at once.

🧮 Paul follows the logic through
⚖️ Law earning it would make faith pointless
🕳️ Made void means emptied of purpose
📖 Law and faith cannot both be the method

## The Law Worketh Wrath

A law exposes failure the moment it is broken.

Breaking a command invites a penalty that did not exist before the command was given.

This is not the law's fault, it is simply how law itself functions.

A speed limit creates a violation only once it exists and gets broken.

⚖️ Law exposes failure when broken
⚡ Breaking it brings a real penalty
🚦 Like a speed limit creating violations
📖 Law working wrath is not the law's fault

## Where No Law Is, There Is No Transgression

"Transgression" means a specific violation of a known command.

Without a stated command, there is nothing specific to officially break.

This does not mean people were innocent before the law existed.

It means their guilt had not yet been named and defined that clearly.

📏 Transgression means breaking a known command
🚫 No command means nothing to officially break
🙅 This does not mean people were innocent
📖 Guilt existed before it was clearly named

## It Might Be By Grace, To The End The Promise Might Be Sure To All The Seed

Faith and grace work together as one single system.

If the promise depended on perfect law keeping, no one could ever feel secure.

Grace makes the promise sure because it does not depend on human performance at all.

"All the seed" points forward to every believer, not one narrow family line.

🤝 Faith and grace work as one system
🔒 Law keeping could never feel secure
🎁 Grace makes the promise sure
📖 All the seed means every believer

## I Have Made Thee A Father Of Many Nations

This is a direct quote from God's promise in Genesis seventeen.

At the time, Isaac had not even been born yet.

The promise looked impossible by every normal measure available to Abraham.

God spoke it anyway, long before there was any visible sign it could come true.

📜 Quoted from Genesis seventeen
👶 Isaac was not even born yet
🚫 The promise looked impossible then
📖 God spoke before any visible sign

## Who Quickeneth The Dead, And Calleth Those Things Which Be Not As Though They Were

"Quickeneth" means gives life to something that was dead.

This describes exactly what God would soon do for Abraham and Sarah's own bodies.

It also describes what God does with a promise that has no visible support yet.

God speaks a future reality as settled fact before it ever physically happens.

💀 Quickeneth means giving life to the dead
🤰 This points to Abraham and Sarah's bodies
🗣️ God calls the future as already settled
📖 His word precedes the visible proof

# Romans 4:18-22
# 💪 Fully Persuaded
---
## Who Against Hope Believed In Hope

Every natural reason for hope was gone by this point in Abraham's life.

"Against hope" describes the circumstances, nothing left to hope in by normal standards.

"In hope" describes where Abraham actually placed his trust instead, in God's own word.

Two completely different sources of hope sit side by side in one phrase.

🚫 Natural hope was completely gone
🙏 Abraham hoped in God's word instead
⚖️ Two different kinds of hope contrast
📖 Real hope outlasts the circumstances

## So Shall Thy Seed Be

God points Abraham toward the stars as a visual promise.

The exact number was never the point of the image.

The point was the sheer size of a promise with no visible way to happen yet.

Abraham believed a picture in the sky before he ever saw a single grandchild.

⭐ Stars became a visual promise
🔢 The exact count was not the point
📏 The size of the promise mattered
📖 He believed before seeing any proof

## Being Not Weak In Faith, He Considered Not His Own Body Now Dead

Abraham was about a hundred years old at this point in the story.

By any normal medical measure, fathering a child was no longer physically possible for him.

"Considered not" means he did not let that fact control his confidence in God.

He looked straight at the obstacle and still trusted the promise anyway.

🎂 Abraham was about a hundred years old
🚫 Fatherhood looked medically impossible for him
👁️ He looked straight at the obstacle
📖 Faith outweighed the hard facts

## Neither Yet The Deadness Of Sarah's Womb

Sarah was also long past any natural ability to bear a child.

Paul names her condition directly instead of softening the obstacle.

Both husband and wife faced the exact same physical impossibility together.

The promise never depended on either of their bodies cooperating.

👵 Sarah was also past childbearing age
🗣️ Paul names the obstacle directly
🤝 Both faced the same impossibility
📖 The promise never depended on their bodies

## He Staggered Not At The Promise Of God Through Unbelief

"Staggered" pictures someone wavering back and forth, unable to decide what to believe.

Abraham had every reasonable excuse available to waver here.

Instead he held steady, refusing to let doubt take over his thinking.

This is not the absence of a struggle, it is the outcome of that struggle.

🌀 Staggered means wavering back and forth
🤷 Abraham had every excuse to waver
🧱 He held steady instead
📖 This is faith winning the struggle

## Strong In Faith, Giving Glory To God

Abraham's strength here was not physical, it was a settled trust.

"Giving glory to God" means his confidence pointed credit toward God, not toward himself.

A weaker faith might have quietly taken some credit for holding on this long.

Abraham instead let the whole moment point back to God's own power.

💪 His strength was trust, not muscle
🙌 Giving glory means pointing credit to God
🚫 He took no credit for himself
📖 The moment points back to God's power

## Being Fully Persuaded That, What He Had Promised, He Was Able Also To Perform

"Fully persuaded" describes complete confidence, with no leftover doubt hiding underneath.

Abraham did not just hope God could do this.

He was convinced God would actually do exactly what he said.

The size of the promise never became bigger than Abraham's view of God's ability.

💯 Fully persuaded means complete confidence
🚫 Not just hope, but conviction
🔑 God's ability matched the promise's size
📖 Abraham's view of God never shrank

## And Therefore It Was Imputed To Him For Righteousness

This line closes the loop back to verse three.

Abraham's confident, settled trust in God is the very faith that gets credited.

Nothing in this whole description adds works into the equation.

The faith itself, fully trusting God's power, is what righteousness was counted for.

🔁 Closes the loop back to verse three
🙏 Confident trust is the credited faith
🚫 No works enter this equation
📖 Faith in God's power earns the credit

# Romans 4:23-25
# ✝️ Raised Again For Our Justification
---
## Now It Was Not Written For His Sake Alone

Genesis fifteen was not preserved in scripture only as history about one man.

Paul reminds his readers that this old story was always meant to teach someone else too.

Abraham's story becomes a pattern, not a private event that stays in the past.

What applied to Abraham reaches forward to apply to every reader after him.

📜 Genesis fifteen is more than old history
🎯 It was always meant to teach others
🔁 Abraham's story becomes a pattern
📖 It reaches forward to every reader

## But For Us Also, To Whom It Shall Be Imputed

Paul directly includes his own readers inside Abraham's story.

The same crediting of righteousness that happened for Abraham happens for believers now.

"Us also" means this is not a special case reserved for one ancient man.

Every reader of this letter is invited into the exact same pattern of faith.

👥 Paul includes his readers directly
🔁 The same crediting happens for believers now
🙅 Not a special case for one man
📖 Every reader shares the same pattern

## If We Believe On Him That Raised Up Jesus Our Lord From The Dead

Abraham believed God could bring life out of his own dead body.

Believers today are asked to believe something even more specific and historical.

God raised Jesus bodily from an actual grave at an actual point in time.

The same power behind Abraham's impossible promise stands behind the resurrection itself.

🙏 Abraham believed life from death
✝️ Believers today believe in Jesus raised
⏳ A real event in real history
📖 The same power stands behind both

## Who Was Delivered For Our Offences

"Delivered" here means handed over, specifically to suffering and death.

"Offences" names the actual wrongs people have committed, not a vague general flaw.

Jesus did not die for an abstract idea of sin in general.

He was handed over because of specific, real offences that needed to be answered for.

🤲 Delivered means handed over to death
⚖️ Offences means real, specific wrongs
🚫 Not an abstract idea of sin
📖 Real wrongs needed a real answer

## And Was Raised Again For Our Justification

The death of Jesus paid for the offences people actually committed.

The resurrection proves that payment was fully accepted by God.

Justification ties directly back to everything this whole chapter has been building.

A dead savior could never justify anyone.

A risen one proves the debt is fully settled.

💀 His death paid for real offences
✅ The resurrection proves it was accepted
🙌 A risen Christ settles the whole debt
📖 Justification closes the chapter's whole argument
`.trim();

export const ROMANS_FOUR_PERSONAL_SECTIONS = parseRomansFourRawNotes(ROMANS_FOUR_RAW_NOTES);
