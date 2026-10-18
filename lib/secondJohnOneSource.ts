export type SecondJohnOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondJohnOneRawNotes(rawText: string): SecondJohnOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondJohnOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*2\s*John\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 John 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+2\s*John\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+2\s*John\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 John 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 John 1:${startVerse}` : `2 John 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 2 John 1 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_JOHN_ONE_RAW_NOTES = `# 2 John 1:1-3
# 📜 The Elder Greets A Family He Loves
---
## 🖋️ The Elder Unto The Elect Lady And Her Children

"The elder" is a title, not a proper name.

Many early believers thought the apostle John wrote this letter.

John calls himself "the elder" again in his very next letter.

"The elect lady" was someone John trusted enough to write to directly.

Many scholars believe she was one specific woman.

Others believe "lady" pictures a whole church instead.

Either way, this letter stayed deeply personal.

🖋️ The elder is a title, not a name
👩 Elect lady may mean a person or church
🤝 John trusted her enough to write
📖 This letter stayed deeply personal

---
## ❤️ Whom I Love In The Truth

To love "in the truth" means the love grows out of shared faith.

John is not describing ordinary affection here.

He loves this family because they hold to the truth about Christ.

Shared belief comes first, and real love grows out of it.

Truth and love are never separated in this letter.

❤️ True love is anchored in shared faith
🙅 Not ordinary affection on its own
✝️ Belief in Christ comes first here
📖 Truth and love stay joined together

---
## 🙋 And Not I Only, But Also All They That Have Known The Truth

John says his love for this family is not only his own.

"All they that have known the truth" points to every other believer who holds the same faith.

This is not a private friendship between two people.

It describes a whole community bound together by shared belief in Christ.

Anyone who knows that same truth shares that same love.

🙋 John's love is not only his own
🌍 Many others share this same love
✝️ Shared faith binds this whole community
📖 Shared truth creates shared love

---
## 💧 For The Truth's Sake, Which Dwelleth In Us

"Dwelleth" is an old word meaning to live inside something permanently.

John says the truth does not just visit a believer for a while.

It takes up permanent residence inside every person who believes it.

That truth also promises to last forever.

This love is built on something that never moves out.

💧 Dwelleth means to live inside permanently
🏠 Truth makes a permanent home in believers
♾️ This truth never leaves
📖 Love stands on something lasting forever

---
## 🎁 Grace Be With You, Mercy, And Peace

Paul's letters usually open with just two gifts, grace and peace.

John adds a third one here, mercy.

"Grace" means kindness no one deserves or earns.

"Peace" means real wholeness with God, not just a calm feeling.

"Mercy" means compassion shown to someone in real need.

Three gifts open this letter instead of the usual two.

🎁 Grace means kindness that is not earned
☮️ Peace means true wholeness with God
🤲 Mercy means compassion for real need
📖 Three gifts open this letter, not two

---
## 👨‍👦 From God The Father, And From The Lord Jesus Christ, The Son Of The Father

John names two sources for these gifts, God the Father and Jesus Christ.

Calling Jesus "the Son of the Father" names His exact relationship to God.

This title appears nowhere else in the New Testament in this exact form.

It quietly affirms that Jesus is fully God's own Son.

He is not merely a prophet or a teacher.

👨‍👦 Two sources are named, Father and Son
🆕 This exact title is rare in scripture
✝️ Jesus is affirmed as fully God's Son
📖 These gifts flow from both together

# 2 John 1:4-6
# 🚶 Walking In Truth And Love
---
## 😊 I Rejoiced Greatly That I Found Of Thy Children Walking In Truth

John felt genuine joy writing this line.

"Walking in truth" describes someone's whole way of living, not just one belief they hold.

That phrase covers daily choices, not just spoken words.

John had firsthand reports that some of her children were living this way.

Real faith shows up in daily walking, not only talking.

😊 John felt genuine joy here
🚶 Walking in truth means a whole life
📰 John heard firsthand reports of this
📖 Faith shows in daily walking, not talking

---
## 📜 As We Have Received A Commandment From The Father

This "commandment" is not a brand new rule John just invented.

It traces back to what the Father Himself commanded through Christ.

Loving one another sits at the center of that commandment.

John is reminding, not inventing.

The instruction had already been given once, and it still stands.

📜 This commandment did not start with John
🙏 It comes from the Father Himself
❤️ Loving one another sits at its center
📖 John reminds, he does not invent

---
## 🙏 I Beseech Thee, Lady

"Beseech" means to plead earnestly, almost like begging.

John is not giving an order here.

He is making a heartfelt request instead.

Even an apostle with real authority chose gentleness over command.

🙏 Beseech means to plead earnestly
🙅 John is not issuing a command
❤️ He makes a heartfelt request instead
📖 Gentleness, not authority, shapes this letter

---
## 🆕 Not As Though I Wrote A New Commandment Unto Thee

John makes clear he is not introducing some brand new rule.

This same point about love was already made in his first letter.

He is repeating something old, not announcing something new.

Old truth often needs repeating more than new truth needs inventing.

🆕 This is not a brand new rule
🔁 John already said this before
📜 Old truth gets repeated here
➡️ Repetition matters as much as discovery

---
## 🔙 That Which We Had From The Beginning, That We Love One Another

"From the beginning" here does not mean the creation of the world.

It means from the very start of their life as believers.

Loving one another was part of the faith from day one.

This was never an add on instruction.

🔙 Beginning here means when they first believed
🚫 Not the creation of the world
❤️ Love was part of faith from day one
📖 Love was never an extra instruction

---
## ❤️ This Is Love, That We Walk After His Commandments

John defines love here in a very practical way.

Love is not just a feeling someone carries inside.

Love shows up as walking after God's commandments.

Obedience becomes the visible shape that love takes.

❤️ Love is defined here in action
🚫 Not only an inner feeling
🚶 Love walks after God's commandments
📖 Obedience gives love its visible shape

---
## 🔂 As Ye Have Heard From The Beginning, Ye Should Walk In It

"It" here points back to the commandment of love just named.

John circles back to the same idea on purpose.

Hearing the command was never meant to be the end goal.

Walking it out, living it daily, was always the real point.

🔂 It refers back to the command to love
🎯 John repeats the idea on purpose
👂 Hearing alone was never the goal
📖 Walking it out was always the point

# 2 John 1:7-9
# ⚠️ A Warning About Deceivers
---
## 🌍 Many Deceivers Are Entered Into The World

"Deceivers" here means people spreading false teaching on purpose.

John says many of them, not just one or two.

They have already entered into the world, not merely threatened to.

False teaching was a real, current danger, not a distant worry.

🌍 Many deceivers are already active
🎯 They spread false teaching on purpose
⚠️ This threat was already present
📖 False teaching was a real, current danger

---
## 👣 Who Confess Not That Jesus Christ Is Come In The Flesh

These deceivers denied that Jesus Christ had a real, physical body.

Some early teachers claimed Jesus only seemed human, like a spirit in disguise.

John flatly rejects that idea here.

Jesus truly came in real human flesh, not merely in appearance.

👣 These teachers denied Jesus had a real body
🎭 Some claimed Jesus only seemed human
🙅 John flatly rejects that idea
📖 Jesus truly came in real human flesh

---
## 😈 This Is A Deceiver And An Antichrist

"Deceiver" names someone who leads others away from the truth on purpose.

"Antichrist" means standing directly against Christ, not merely disagreeing with Him.

John uses both words for anyone who denies Jesus truly came in the flesh.

These are strong words, chosen on purpose, not casual insults.

😈 Deceiver means leading others from truth
⚔️ Antichrist means standing directly against Christ
🏷️ Both words describe the same false teacher
📖 John chose strong words on purpose

---
## 👀 Look To Yourselves, That We Lose Not Those Things Which We Have Wrought

"Wrought" is an old word for work already done or accomplished.

John warns believers to guard what their faith has already built.

False teaching can quietly undo real spiritual progress.

Staying alert matters even after the hard work is finished.

👀 Wrought means work already accomplished
🛡️ John warns them to guard that work
⚠️ False teaching can undo real progress
📖 Staying alert matters even after progress

---
## 🏆 That We Receive A Full Reward

John ties guarding the faith to a future reward.

"Full" reward suggests a reward could also end up partial.

Losing ground to false teaching could cost that reward.

Faithfulness all the way to the end was the goal.

🏆 A future reward is tied to this warning
📉 Full implies a reward could be partial
⚠️ False teaching could cost that reward
📖 Faithfulness to the end was the goal

---
## 🚫 Whosoever Transgresseth, And Abideth Not In The Doctrine Of Christ, Hath Not God

"Transgresseth" means to cross a line, to go beyond what is allowed.

"Abideth" means to remain or stay put over time.

"Doctrine of Christ" means the core teaching about who Jesus really is.

Someone who drifts past that teaching no longer actually has God.

🚫 Transgresseth means crossing a forbidden line
⏳ Abideth means staying put over time
⚠️ Drifting from this teaching means losing God
📖 Doctrine of Christ names core teaching about Jesus

---
## 🤝 He That Abideth In The Doctrine Of Christ, He Hath Both The Father And The Son

Staying rooted in true teaching about Christ is not a minor detail.

John says it is actually the way someone has real access to God.

You cannot claim the Father while rejecting what is true about the Son.

The two always come together, never separately.

🤝 Staying rooted in true teaching matters deeply
🔗 Father and Son are never separated here
🙅 You cannot have one without the other
📖 True belief holds both together

# 2 John 1:10-13
# 👋 A Warning And A Promise To Visit
---
## 🚪 If There Come Any Unto You, And Bring Not This Doctrine

Traveling teachers were common in the early church.

Local believers usually opened their homes to support them.

John pictures one of these false teachers showing up at the door.

Hospitality was a real decision with real consequences here.

🚪 Traveling teachers were common back then
🏠 Believers usually welcomed them into their homes
⚠️ John pictures a false teacher at the door
📖 Hospitality carried real consequences

---
## 🙅 Receive Him Not Into Your House, Neither Bid Him God Speed

"Bid him God speed" was an old way of saying goodbye with a blessing.

People said it the way someone today might say safe travels.

John tells believers not to extend even that small kindness here.

Withholding a simple greeting was meant to be a clear, visible signal.

🙅 Bid him God speed was an old blessing
👋 It worked like saying safe travels today
🚫 John says do not offer even that
📖 A withheld greeting sent a clear signal

---
## ⚠️ He That Biddeth Him God Speed Is Partaker Of His Evil Deeds

"Partaker" means sharing in something, taking a part in it.

Hosting a traveling teacher usually meant feeding and funding their work.

Welcoming a false teacher meant helping spread the false teaching itself.

A simple kindness could quietly become real support for error.

⚠️ Partaker means sharing in something directly
💰 Hosting a teacher usually meant funding them
🚫 Welcoming spread the false teaching further
📖 Kindness here could become real support for error

---
## 📜 I Would Not Write With Paper And Ink

"Paper" here means papyrus, the common writing material of that time.

John has much more he could say in this letter.

He chooses to hold most of it back on purpose.

A letter could never fully replace being there in person.

📜 Paper here means ancient papyrus
✍️ John had much more he could say
🤐 He held most of it back on purpose
📖 A letter could not replace being there

---
## 🚶 I Trust To Come Unto You, And Speak Face To Face, That Our Joy May Be Full

John plans an actual visit, not just another letter.

"Face to face" pictures a real conversation, not a written page.

He wants their joy together to be complete, not partial.

Some things only get finished in person.

🚶 John plans a real, in person visit
🗣️ Face to face means a real conversation
😊 He wants their joy made complete
📖 Some things finish only in person

---
## 👧 The Children Of Thy Elect Sister Greet Thee. Amen

"Elect sister" uses the same word for "chosen" found in verse one.

She was likely another woman, or possibly another whole church, connected to this one.

Her children send their greetings along with this letter.

"Amen" means let it be so, sealing the whole letter.

A short closing still shows these communities stayed connected to each other.

👧 Elect sister echoes elect lady from verse one
🤝 She may be another woman or church
💌 Her children send greetings here too
📖 Amen seals this letter, and the connection holds
`.trim();

export const SECOND_JOHN_ONE_PERSONAL_SECTIONS = parseSecondJohnOneRawNotes(SECOND_JOHN_ONE_RAW_NOTES);
