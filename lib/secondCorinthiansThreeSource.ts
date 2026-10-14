export type SecondCorinthiansThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondCorinthiansThreeRawNotes(rawText: string): SecondCorinthiansThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondCorinthiansThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondCorinthians\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Corinthians 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondCorinthians\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondCorinthians\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Corinthians 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Corinthians 3:${startVerse}` : `2 Corinthians 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Second Corinthians 3 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CORINTHIANS_THREE_RAW_NOTES = `# SecondCorinthians 3:1-3
# 📜 Not Letters, But Living Proof
---
## 🧾 Epistles Of Commendation

"Commendation" means a formal letter praising someone and vouching for their character.

Traveling teachers in the ancient world often carried these letters from city to city.

A letter like this worked much like a reference a job applicant brings today.

Paul is asking the Corinthians whether he needs one of these letters to prove himself.

He already answered that question with his life among them.

🧾 Commendation means a formal letter of praise

✈️ Traveling teachers carried these between churches

💼 It worked like a modern reference letter

📖 Paul needed no paper to prove himself

## 🪞 Ye Are Our Epistle Written In Our Hearts

Paul says the Corinthians themselves are his letter of recommendation.

Their changed lives are the only proof his ministry ever needed.

No ink or paper could show that proof as clearly as a transformed life.

Everyone around them could already read that proof without being told.

This flips the whole picture of commendation from paper to people.

🪞 The Corinthians themselves are Paul's letter

❤️ Their changed lives prove his ministry

👀 Everyone nearby already saw that proof

📖 People proved more than any paper

## 📜 The Epistle Of Christ Ministered By Us

Paul shifts from calling the church his letter to calling it Christ's letter.

Christ is the true author, Paul is only the hand that delivered the message.

This phrase borrows the ancient image of a trusted messenger carrying someone else's words.

Paul never wants credit for a work that God himself produced.

📜 The letter now belongs to Christ

✋ Paul is only the messenger here

🤝 Messengers carried someone else's exact words

📖 Paul refuses credit for God's own work

## 🖋️ Written Not With Ink, But With The Spirit Of The Living God

Ink was the one tool every ancient letter needed to exist at all.

Paul says this letter was written by a different power entirely.

The Spirit of the living God wrote directly onto human lives, not paper.

No pen could ever produce the kind of change Paul is describing.

🖋️ Ink was the tool every letter needed

💨 This letter came from the Spirit instead

❤️ The Spirit wrote onto lives, not paper

📖 No pen can write this kind of change

## 🪨 Not In Tables Of Stone, But In Fleshy Tables Of The Heart

"Tables of stone" points back to the Ten Commandments carved at Mount Sinai.

Moses received that law written on hard, lasting rock.

"Fleshy tables of the heart" means something living and soft instead of something carved.

The prophet Jeremiah had already promised a day when God would write His law on hearts.

This verse says that promised day has now arrived.

🪨 Tables of stone points to Sinai's law

🧊 That law was carved onto hard rock

💓 A heart is living, not carved stone

📖 Jeremiah's promised new covenant has now arrived

# SecondCorinthians 3:4-6
# ✍️ Sufficient Through The Spirit
---
## 🤝 Such Trust Have We Through Christ

Paul names the real source of his confidence in this ministry.

That confidence does not come from his own talent or training.

It comes through Christ, pointed toward God himself.

Paul never claims a success that began with him.

🤝 Paul names the real source of trust

🚫 It is not his own talent at work

🏹 Confidence flows through Christ toward God

📖 Paul never claims a success of his own

## 🙅 Not That We Are Sufficient Of Ourselves

"Sufficient" means fully adequate, able to do something completely on its own.

Paul denies being personally adequate for this calling.

Even forming one true thought about the message felt beyond his own ability.

This is not false modesty, it is an honest admission.

🙅 Sufficient means fully adequate on its own

😮 Paul denies being adequate by himself

💭 Even one true thought felt beyond him

📖 This honesty is real, not false modesty

## ✝️ Our Sufficiency Is Of God

Paul flips the source of ability from himself to God directly.

Every ounce of capability for this work comes from somewhere outside Paul.

A minister does not need to feel naturally gifted to be genuinely used.

God supplies the ability the calling actually requires.

🔄 Paul flips the source of ability

🌊 Capability flows in from outside himself

🙋 Feeling gifted is not the requirement

📖 God supplies the ability the calling needs

## 📚 Able Ministers Of The New Testament

"New testament" does not mean a book of scripture in this verse.

It means a covenant, a binding agreement between God and His people.

This is the new covenant God promised through Christ.

God himself made Paul able to serve this new agreement.

📚 New testament means a covenant, not a book

🤲 God himself made Paul able to serve

🔙 It stands apart from Moses's old covenant

📖 This covenant runs on the Spirit, not stone

## 💀 The Letter Killeth

"The letter" names the written law by itself, taken as a rulebook.

A rulebook can show someone their sin with total accuracy.

It has no power to change the heart that broke the rule.

Taken alone, the law can only expose failure.

It cannot fix the problem it exposes.

💀 The letter means the written law alone

🪞 A rulebook can show sin accurately

🚫 It cannot change the heart itself

📖 The law exposes failure, it cannot fix it

## 🌱 The Spirit Giveth Life

"Spirit" here means the Holy Spirit working inside a believer.

The letter alone could only diagnose sin.

The Spirit does something that law could never do.

It plants new life and the desire to actually obey from within.

This difference is Paul's whole argument in this chapter.

🌱 Spirit here means the Holy Spirit within

🩺 The letter alone could only diagnose sin

💗 The Spirit plants new life and desire

📖 This difference is Paul's whole argument

# SecondCorinthians 3:7-11
# ✨ A Fading Glory, A Greater Glory
---
## ⚰️ The Ministration Of Death, Written And Engraven In Stones

"Ministration" means a system that administers or delivers something to people.

Paul calls the law a ministration of death.

It exposes sin but cannot save anyone from it.

"Engraven in stones" points back to the Ten Commandments carved at Sinai.

This same law still carried real glory when it was first given.

⚰️ Ministration of death means the law itself

💀 It exposes sin but cannot save anyone

🪨 Engraven in stones points back to Sinai

📖 Even this law carried real glory

## 👁️ Could Not Stedfastly Behold The Face Of Moses

"Stedfastly" is an old spelling of steadfastly, meaning to look steadily without looking away.

After Moses met with God on Sinai, his face carried a visible glow.

That glow was too bright for the people to keep looking at directly.

Exodus already told this exact story back when it first happened.

👁️ Stedfastly means to look steadily

✨ Moses's face carried a visible glow

😮 The glow was too bright to face

📖 Exodus already told this exact story

## 🌫️ Which Glory Was To Be Done Away

This glory on Moses's face was real.

It was never meant to last.

"Done away" means it was fading, headed toward disappearing completely.

Exodus even describes Moses covering his face once the glow began to fade.

🌫️ The glory on Moses's face was fading

⏳ Done away means headed toward disappearing

🫢 Moses covered his face as it faded

📖 A fading glory points to a lasting one

## ❓ How Shall Not The Ministration Of The Spirit Be Rather Glorious

Paul argues from a lesser case to a greater one.

A fading glory already dazzled an entire nation at Sinai.

Picture the glory of a ministry that never fades at all.

The Spirit's ministry does not carve rules onto rock.

It writes life directly into a person instead.

📈 Paul argues from lesser to greater

✨ A fading glory dazzled a nation already

🪨 The Spirit does not carve rules onto rock

📖 It writes life directly into people instead

## ⚖️ The Ministration Of Condemnation

"Condemnation" names a formal verdict of guilt.

Paul says the law acts like a ministry that delivers that verdict.

It cannot acquit anyone on its own.

It can only point out exactly where people failed.

Even a ministry built only to condemn still carried real glory.

⚖️ Condemnation means a formal verdict of guilt

👆 The law only points out where people failed

🚫 It cannot acquit anyone on its own

📖 Even a condemning ministry carried real glory

## 🌟 The Ministration Of Righteousness Exceed In Glory

"Righteousness" here means a right standing before God, not just good behavior.

This new ministry does more than point out guilt.

It declares a person righteous through Christ.

Paul says this ministry carries far more glory than the one that only condemns.

A ministry that fixes the problem outshines one that only names it.

🌟 Righteousness means a right standing with God

✅ It declares a person righteous through Christ

📈 This ministry carries far more glory

📖 Fixing the problem outshines naming it

## 🕯️ That Which Was Made Glorious Had No Glory In This Respect

This sounds like a contradiction at first.

Paul is actually making a comparison, not a correction.

The old glory was completely real on its own.

Next to the new glory, it looks like nothing at all.

Think of a candle held up next to the sun.

The candle still gives real light of its own.

It simply disappears next to the greater brightness.

🕯️ This is a comparison, not a contradiction

✨ The old glory was completely real alone

☀️ It looks like nothing next to the sun

📖 Comparison does not erase real glory

## 🔁 If That Which Is Done Away Was Glorious, Much More That Which Remaineth Is Glorious

Paul repeats his lesser to greater argument one final time.

"That which is done away" means the old covenant, already fading before Christ came.

"That which remaineth" means the new covenant, the one that never fades.

If the fading one impressed people this much, the permanent one deserves even more honor.

🔁 Paul repeats his lesser to greater point

🌫️ Done away means the fading old covenant

🌟 Remaineth means the new covenant that stays

📖 The permanent covenant deserves even more honor

# SecondCorinthians 3:12-15
# 🙈 The Veil That Remains
---
## 💬 We Use Great Plainness Of Speech

"Plainness" means speaking openly, with nothing hidden or held back.

Paul says his confidence in this permanent ministry lets him speak this way.

He does not need to hide behind vague or guarded language.

This sets up a direct contrast with the veil Paul is about to describe.

💬 Plainness means speaking with nothing hidden

💪 Confidence in this ministry allows open speech

🙅 Paul does not speak in guarded language

📖 This sets up a contrast with a veil

## 🫣 Moses, Which Put A Vail Over His Face

"Vail" is an old spelling of veil, a cloth covering worn over the face.

Exodus explains that Moses covered his face once the glow from meeting God began to fade.

Paul is recalling a real, specific moment from that earlier story.

The veil hid something that was genuinely disappearing from view.

🫣 Vail is an old spelling of veil

✨ Moses covered his face as the glow faded

📜 Paul recalls a specific moment from Exodus

📖 The veil hid something genuinely disappearing

## 🔚 Could Not Stedfastly Look To The End Of That Which Is Abolished

"The end" here means the goal or outcome something was heading toward.

"Abolished" means brought to an end, no longer in force.

The people could not see clearly where that fading glory was heading.

Moses's veil hid the fact that the fading glory was heading toward something greater.

🔚 The end means the goal something aimed at

🏁 Abolished means brought to an end

👁️ People could not see where it was heading

📖 The veil hid that fading was the plan

## 🙈 Their Minds Were Blinded

Paul shifts from a literal cloth veil to a deeper, inward kind of blindness.

This blindness sits over a person's understanding, not their actual eyes.

Someone can read the same words everyone else reads and still miss what they mean.

This is the real problem Paul is building toward in this chapter.

🙈 Paul shifts to an inward blindness

🧠 It covers understanding, not the eyes

🔑 Reading words is not the same as understanding

📖 This is the real problem of the chapter

## 📚 The Same Vail Untaken Away In The Reading Of The Old Testament

"Old testament" here refers to the law of Moses read aloud, likely in the synagogue.

Paul says the same blindness from Exodus is still happening in his own day.

People can hear Moses read and still miss that it was always pointing to Christ.

The veil did not disappear when Moses died.

It simply moved from his face to the hearer's mind.

📚 Old testament means the law read aloud

🔁 The same blindness still happens in Paul's day

🧩 People hear Moses and still miss Christ

📖 The veil moved from face to mind

## ✝️ Which Vail Is Done Away In Christ

Paul finally names the one place this blindness actually lifts.

It is not education or effort that removes it.

Only a real connection to Christ takes the veil away.

This sets up the turn the chapter makes in its final verses.

✝️ Christ is the only place blindness lifts

📚 Education alone cannot remove this veil

🔓 Only a real connection to Christ works

📖 This sets up the chapter's final turn

## 💭 When Moses Is Read, The Vail Is Upon Their Heart

Paul repeats the point once more so it cannot be missed.

The veil was never really about physical eyesight.

It sits over the heart, the part of a person that understands and responds.

Even today, hearing the law without Christ leaves that same covering in place.

🔁 Paul repeats the point one final time

👁️ The veil was never about eyesight

💓 It covers the heart's understanding instead

📖 Without Christ, the same covering remains

# SecondCorinthians 3:16-18
# 🪞 Unveiled And Being Changed
---
## 🔓 When It Shall Turn To The Lord, The Vail Shall Be Taken Away

"It" here means the heart or person being described in the verse just before.

Turning to the Lord means putting real trust in Christ.

The moment that turn happens, the inward veil lifts completely.

This echoes Moses removing his own veil whenever he turned to speak with God.

🔓 It means the heart described just before

🙏 Turning to the Lord means trusting Christ

✨ The veil lifts the moment that happens

📖 Moses once removed his veil the same way

## ✨ Now The Lord Is That Spirit

Paul directly connects the Lord Jesus with the Spirit's work he has been describing.

This does not erase the distinction between the Father, Son, and Spirit found elsewhere in scripture.

Here Paul is making a functional point, not a technical one.

Wherever this chapter talks about the Spirit's freedom, Christ is the one bringing it.

✨ Paul connects the Lord with the Spirit

🔗 This is a functional point, not technical

🌊 The Spirit's freedom flows through Christ

📖 Christ is the source of that freedom

## 🕊️ Where The Spirit Of The Lord Is, There Is Liberty

"Liberty" here means freedom from the law's condemning power, not freedom to sin.

Under the old covenant, people lived under constant threat of exposure and failure.

The Spirit does not erase God's standards.

It empowers a person to actually meet them.

This freedom is the chapter's whole point.

🕊️ Liberty means freedom from condemnation here

⚖️ The old covenant brought constant threat of failure

💪 The Spirit empowers people to meet God's standards

📖 This freedom is the chapter's whole point

## 🪞 With Open Face Beholding As In A Glass The Glory Of The Lord

"Glass" here means a mirror, usually a polished piece of metal, not a pane of glass.

Moses once needed a veil over his face.

Paul says believers now look with an open, unveiled face.

Every believer, not just a chosen leader, now gets this same direct access.

This is a complete reversal of the picture from Exodus.

🪞 Glass means a polished metal mirror

👁️ Believers now look with an open face

🤝 Every believer gets this same direct access

📖 This reverses the picture from Exodus

## 🔄 Are Changed Into The Same Image

Paul describes an ongoing transformation, not a single instant event.

Looking at Christ's glory actually reshapes the person doing the looking.

"Image" here means believers are being formed to resemble Christ himself.

This happens gradually, not all at once.

Think of how a reflection slowly becomes familiar over time.

🔄 This transformation is ongoing, not instant

👀 Looking at Christ reshapes the one looking

🪞 Image means being formed to resemble Christ

📖 The change happens gradually over time

## ⬆️ From Glory To Glory

"Glory to glory" means this growth never stops at one point.

Each new stage leads into a deeper one.

"Even as by the Spirit of the Lord" names who actually powers this change.

The transformation is real.

It is never something a person produces alone.

⬆️ This describes a journey, not one finish line

🔁 Each stage leads into a deeper one

🌬️ The Spirit is the one powering this change

📖 No one produces this transformation alone
`.trim();

export const SECOND_CORINTHIANS_THREE_PERSONAL_SECTIONS = parseSecondCorinthiansThreeRawNotes(SECOND_CORINTHIANS_THREE_RAW_NOTES);
