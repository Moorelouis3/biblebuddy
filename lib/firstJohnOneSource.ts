export type FirstJohnOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstJohnOneRawNotes(rawText: string): FirstJohnOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstJohnOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstJohn\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First John 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstJohn\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstJohn\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First John 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 John 1:${startVerse}` : `1 John 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 First John 1 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_JOHN_ONE_RAW_NOTES = `# FirstJohn 1:1-2
# 👐 Eyewitnesses Of The Word Of Life
---
## 👂 That Which Was From The Beginning

"From the beginning" points to something that existed before time started, not just before this letter was written.

John opens his gospel with the exact same phrase about Jesus.

He is naming Jesus as eternal, present before creation itself, not a man who became divine later.

This is the foundation under everything else John is about to say.

👂 From the beginning means before time started

📖 John's gospel opens the same way

🕊️ Jesus is eternal, not promoted later

➡️ Everything else rests on this claim

## ✋ Our Hands Have Handled

John lists seeing, hearing, and touching, moving from the least physical sense to the most physical one.

Some teachers in John's day claimed Jesus only seemed to have a real body, never truly flesh and bone.

John answers that claim directly, his own hands had actually touched Jesus.

This is not poetry or a vague spiritual feeling.

It is a firsthand physical report.

✋ Hands have handled means real physical touch

❌ Some claimed Jesus was not truly physical

🧍 John answers with his own eyewitness body

📖 Faith rests on a real event

## 📜 The Word Of Life

"The Word" was already John's title for Jesus in his gospel, the one through whom God speaks and creates.

Here John adds "of life," tying that title to the life Jesus gives.

Calling Jesus "the Word" means God's own message became a person someone could actually meet.

📜 Word means God's message in person form

🕊️ Life describes what that Word gives

🤝 God's message became someone you could meet

📖 Jesus is a person, not an idea

## 💡 The Life Was Manifested

"Manifested" means something hidden was made fully visible and knowable.

The life John describes already existed with the Father before anyone on earth ever saw it.

That life then stepped into view, into a real place and time.

John is not describing a new idea, he is describing a reveal.

💡 Manifested means made fully visible

🙏 This life already existed with the Father

🌍 It stepped into a real time and place

➡️ Hidden truth became something people could see

# FirstJohn 1:3-4
# 🤝 Writing For Shared Joy
---
## 🗣️ That Which We Have Seen And Heard Declare We

"Declare" is stronger than simply mentioning something in passing.

It means announcing a fact formally, the way a witness reports what actually happened in court.

John is not offering his private opinion about Jesus.

He is delivering an eyewitness report he expects to be taken seriously.

🗣️ Declare means a formal, serious report

⚖️ It works like courtroom witness testimony

🚫 This is not John's private opinion

📖 He expects this report to be believed

## 🫂 That Ye Also May Have Fellowship With Us

"Fellowship" means far more than friendly company or shared interests.

It describes a shared life, two people genuinely bound together in the same reality.

John wants his readers pulled into that same shared life he already has.

Hearing the truth about Jesus is meant to connect people, not just inform them.

🫂 Fellowship means a shared life together

🔗 It is deeper than ordinary friendship

🎯 John wants readers pulled into that life

➡️ Truth is meant to connect people

## 🙌 Our Fellowship Is With The Father, And With His Son Jesus Christ

John adds a second, higher layer to this fellowship.

Believers are not only joined to each other.

They are joined to the Father and to Jesus Christ himself.

Human fellowship among believers only works because it flows out of that connection with God first.

🙌 Fellowship also reaches up to God

👨‍👦 It includes both the Father and the Son

🔽 Human fellowship flows out of that connection

📖 Connection with God comes before connection with others

## 😊 That Your Joy May Be Full

John names the actual goal of this whole letter in one short line.

He is not writing to win an argument or show off what he knows.

He wants his readers' joy to be complete, not partial or uncertain.

A relationship with the Father and the Son is where that full joy comes from.

😊 Full joy is John's real goal here

🚫 He is not writing to win an argument

🎯 He wants complete joy, not a partial one

📖 Full joy grows out of fellowship with God

# FirstJohn 1:5-7
# 💡 Walking In The Light
---
## ☀️ God Is Light, And In Him Is No Darkness At All

John states this plainly instead of easing into it.

"Light" here stands for total purity, truth, and holiness.

"No darkness at all" rules out even the smallest trace of evil or deception in God.

There is no mixture in God, not a little light and a little shadow.

☀️ Light means total purity and truth

🚫 No darkness means no evil at all

⚖️ There is no mixture in God's nature

📖 God is fully one thing, never divided

## 🤥 If We Say That We Have Fellowship With Him, And Walk In Darkness

"Walk" in this letter means a person's ongoing pattern of life, not a single stumble.

John is describing someone who claims closeness with God while living a lifestyle that contradicts it.

Claiming fellowship with a pure God while steadily choosing sin is not a small inconsistency.

John calls it exactly what it is, a lie.

🚶 Walk means a lasting pattern of living

🗣️ The claim and the lifestyle contradict each other

❌ This is not a small inconsistency

📖 John names the contradiction a lie

## 🕯️ If We Walk In The Light, As He Is In The Light

Walking in the light means living in ongoing honesty before God, not achieving sinless perfection.

When that honest pattern of life is real, something happens between believers too.

Fellowship with God and fellowship with other believers rise and fall together.

One cannot be genuinely present while the other is missing.

🕯️ Walking in light means ongoing honesty

🙏 It is not the same as sinless perfection

🫂 It produces real fellowship with others

📖 Fellowship with God and others rise together

## 🩸 The Blood Of Jesus Christ His Son Cleanseth Us From All Sin

"Blood" here points back to the sacrifices in the Old Testament, where an animal's life was given to cover sin.

Jesus is described the same way, his own life given as the true and final sacrifice.

"Cleanseth" is present tense, an ongoing cleaning, not a one time event buried in the past.

That cleansing covers "all sin," not just the sins a person remembers to name.

🩸 Blood recalls the Old Testament sacrifices

🕊️ Jesus is the true and final sacrifice

🔄 Cleanseth is ongoing, not a one time event

📖 All sin is covered, not only remembered sin

# FirstJohn 1:8-10
# 🙏 Honest About Sin
---
## 🙈 If We Say That We Have No Sin, We Deceive Ourselves

Some teachers in John's day claimed believers could reach a state with no sin left in them at all.

John calls that claim self deception, not humility or spiritual progress.

The lie does not fool God.

It only fools the person telling it to themselves.

🙈 Some claimed believers could become sinless

❌ John calls that claim self deception

🙏 The lie never actually fools God

📖 Denial only blinds the person denying

## 🗣️ If We Confess Our Sins

"Confess" means agreeing with God about sin, not merely feeling bad or admitting a fact out loud.

It means calling the same thing sin that God already calls sin.

This is the opposite move from the denial described in the verse right before it.

Agreeing with God is the doorway John describes next.

🗣️ Confess means agreeing with God, not just admitting

🪞 It calls sin exactly what God calls it

🔄 This is the opposite of denial

➡️ Agreement opens the way to forgiveness

## ⚖️ He Is Faithful And Just To Forgive Us Our Sins

"Faithful" means God keeps the promise he already made to forgive those who confess.

"Just" might sound surprising here, since justice usually punishes rather than forgives.

God can forgive justly because Jesus already paid sin's penalty with his own blood, mentioned back in verse seven.

Forgiveness here is not God bending his own standards, it is God honoring what Jesus already settled.

⚖️ Faithful means God keeps his promise

🧮 Just forgiveness rests on Jesus paying the debt

🩸 This connects straight back to verse seven

📖 Forgiveness never bends God's own justice

## 🧼 To Cleanse Us From All Unrighteousness

Forgiveness and cleansing name two different gifts in the same sentence.

Forgiveness cancels the debt sin created.

Cleansing removes the stain sin left behind.

Together they leave nothing of the sin still counted against the believer.

🧼 Cleanse removes the stain sin left

💳 Forgiveness cancels the debt sin created

🤝 Both gifts arrive together, not separately

📖 Nothing of the sin remains counted against us

## 🚫 If We Say That We Have Not Sinned, We Make Him A Liar

This denial goes even further than the one in verse eight.

Claiming to have never sinned at all contradicts what God's own word already says about every person.

Calling that claim false is really calling God himself a liar.

John ends the chapter exactly where he began it, insisting on the truth rather than a comfortable claim.

🚫 This denial goes further than verse eight

📖 It contradicts what God's word already says

🗣️ Denying sin calls God himself a liar

➡️ John insists on truth over comfortable claims
`.trim();

export const FIRST_JOHN_ONE_PERSONAL_SECTIONS = parseFirstJohnOneRawNotes(FIRST_JOHN_ONE_RAW_NOTES);
