export type TitusTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseTitusTwoRawNotes(rawText: string): TitusTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: TitusTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Titus\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Titus 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Titus\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Titus\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Titus 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Titus 2:${startVerse}` : `Titus 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Titus 2 sections, received " + sections.length);
  }

  return sections;
}

const TITUS_TWO_RAW_NOTES = `# Titus 2:1-5
# 🏠 A Household Shaped By Sound Doctrine
---
## 📜 But Speak Thou The Things Which Become Sound Doctrine

"Sound" here means healthy, like a body free of disease.

"Doctrine" means teaching, the actual content of what gets taught.

Titus just heard about teachers in chapter one who were sick with error.

Paul now tells him what healthy teaching looks like instead.

🩺 Sound means healthy, not sick
📚 Doctrine means the content taught
⚠️ Chapter one described diseased teaching
📖 Paul now describes healthy teaching

---
## 👴 That The Aged Men Be Sober, Grave, Temperate

"Sober" means clear minded, able to think straight under pressure.

"Grave" means carrying a serious dignity, not silly or flippant.

"Temperate" means under control, never swept along by impulse.

These three qualities describe a steady, trustworthy older man.

🧠 Sober means clear minded and steady
🎓 Grave means serious dignity
🚦 Temperate means self control under impulse
📖 Together they describe trustworthy older men

---
## ❤️ Sound In Faith, In Charity, In Patience

This same word sound appeared back in verse one about doctrine.

Now it describes a man's inner life, not just his teaching.

"Charity" means selfless love acted out toward others.

"Patience" means steady endurance through hard or slow circumstances.

A healthy mind shows up as a healthy character over time.

🔁 Sound repeats the word from verse one
❤️ Charity means selfless love in action
⏳ Patience means steady endurance
📖 Healthy teaching produces healthy character

---
## 📏 In Behaviour As Becometh Holiness

"Becometh" means fits properly or suits well.

A holy life should show up in ordinary daily conduct.

Belief and behavior are meant to match, not pull apart.

Paul wants these women's daily lives to match their holy calling.

📏 Becometh means fits properly
🙏 Holiness should show in daily conduct
🔗 Belief and behavior must match
📖 Consistency honors a holy calling

---
## 🗣️ Not False Accusers, Not Given To Much Wine

"False accusers" translates a Greek word that literally means slanderer.

That same Greek word is also the root behind the word devil.

Gossip and slander count as a serious spiritual danger here.

"Given to wine" names a second danger, repeated drunkenness.

Both habits damage the trust a household depends on.

🗣️ False accusers means slanderers
😈 Same root as the word devil
🍷 Given to wine means habitual drunkenness
📖 Both habits break household trust

---
## 👩‍🏫 Teachers Of Good Things

Older women are not told to simply stay quiet and set an example.

They are given an actual teaching role inside the church family.

This teaching happens informally, one woman mentoring another, not from a pulpit.

Chapter one described formal elders appointed in every city.

This verse describes a second, quieter kind of teaching running alongside it.

👩‍🏫 Older women are called teachers
🏠 Their teaching happens inside the family
🤝 It is mentoring, not preaching
📖 A quieter teaching runs beside the elders

---
## 🎯 That They May Teach The Young Women To Be Sober

This verse names the actual goal behind the older women's teaching.

They are preparing younger wives for the challenges just ahead of them.

"Sober" appears again, the same clear minded self control named for the men.

This quality was expected from every adult in the church, not one group alone.

🎯 This names the teaching's real goal
👭 Older women prepare younger wives
🔁 Sober repeats the earlier qualification
📖 Self control applied to every adult

---
## 🌱 To Love Their Husbands, To Love Their Children

These two Greek words only appear here in the whole New Testament.

They do not describe ordinary affection that simply happens on its own.

Both words describe a love that has to be learned and practiced on purpose.

Marriage and parenting love were treated as skills to grow into.

🔍 Rare Greek words used only here
🌱 Love here means learned, not automatic
💍 Applies to husbands and children both
➡️ Love for family can be practiced

---
## 🧠 To Be Discreet, Chaste, Keepers At Home

"Discreet" means sound judgment, the same word used for the men.

"Chaste" means pure in both body and intention.

"Keepers at home" describes managing a household well.

That household work was real, skilled labor, not idle time.

🧠 Discreet means sound judgment
🤍 Chaste means pure in body and intention
🏠 Keepers at home means managing a household
📖 Household work was real, skilled labor

---
## 🎯 That The Word Of God Be Not Blasphemed

Every instruction in this whole household list points toward this one purpose.

"Blasphemed" means spoken against or mocked, not just mildly criticized.

Outsiders judged a whole religion by how well its households behaved.

A disorderly home could make the whole gospel look false to outsiders.

🎯 This verse names the whole purpose
🗣️ Blasphemed means mocked or spoken against
👀 Outsiders judged the gospel by households
📖 A home's order protects the gospel's name

# Titus 2:6-10
# 💪 A Pattern Every Household Could Follow
---
## 🔗 Young Men Likewise Exhort To Be Sober Minded

"Likewise" ties this short command back to every group named before it.

Only one quality gets named here, unlike the others.

That single word still carries real weight for young men.

Titus himself was a young man, so this instruction includes him too.

🔗 Likewise connects this to the earlier groups
🙋 Only one quality is named here
⚡ Young men often struggle with impulse
📖 This instruction includes Titus himself

---
## 🏺 Shewing Thyself A Pattern Of Good Works

"Pattern" translates a Greek word for a shaping mold or stamp.

Titus is not just allowed to teach with words here.

His own life was meant to be the shape others copied.

A pattern only works if people can actually see it up close.

🏺 Pattern means a mold that shapes others
🗣️ Not words alone, but a visible life
👀 People needed to see it up close
📖 Titus himself becomes the lesson

---
## 🧼 In Doctrine Shewing Uncorruptness, Gravity, Sincerity

"Uncorruptness" means teaching that stays pure, without being twisted for gain.

"Gravity" means real seriousness, not careless or casual.

"Sincerity" means teaching from honest motives, with nothing hidden.

These three protect the same sound doctrine named back in verse one.

🧼 Uncorruptness means pure, untwisted teaching
🎓 Gravity means real seriousness
💯 Sincerity means honest motives
📖 All three protect sound doctrine

---
## 🩺 Sound Speech, That Cannot Be Condemned

"Sound speech" means words that hold up under honest examination.

"Cannot be condemned" does not mean no one will disagree.

It means no one can point to a real flaw in it.

Words built this way survive scrutiny instead of collapsing under it.

🩺 Sound speech means words that hold up
🔍 Cannot be condemned means no real flaw
🚫 Disagreement is different from an actual flaw
📖 Careful words survive honest scrutiny

---
## 🧩 That He That Is Of The Contrary Part May Be Ashamed

"The contrary part" refers to anyone actively opposing the gospel in Crete.

That likely means the false teachers from chapter one, or outside critics.

Their goal was to find something real to criticize.

Clean living was meant to leave them with nothing honest to say.

🧩 Contrary part means active gospel opponents
🎭 Likely the false teachers or outside critics
🔍 They were hunting for a real flaw
📖 Clean living left them empty handed

---
## 🔗 Having No Evil Thing To Say Of You

This closes the thought that started back with sound speech.

A clean reputation was meant to follow a clean life.

Critics would still disagree with the gospel itself.

They simply could not point to any real wrongdoing.

🔗 This closes the sound speech thought
🪞 Clean reputation follows a clean life
❌ Disagreement with the gospel could continue
📖 Real wrongdoing was simply not there

---
## 🏚️ Exhort Servants To Be Obedient Unto Their Own Masters

Many early Christians in Crete were household servants, often called bondservants.

Paul is not declaring that system right here.

He is instructing real people on how to live faithfully inside it.

Obedience toward a master was the expected shape of that honest work.

🏚️ Many early believers were household servants
🚫 Paul does not endorse the system itself
🧭 He instructs real people inside it
📖 Honest obedience shaped daily work

---
## 😌 To Please Them Well In All Things, Not Answering Again

"Not answering again" means not arguing back with a master.

This did not mean silence about real wrongdoing or abuse.

It meant avoiding a quarrelsome, defensive attitude in daily tasks.

A servant's steady attitude could speak louder than any argument.

🗣️ Not answering again means not arguing back
🚫 Not silence about real wrongdoing
😌 A calm, steady work attitude
📖 Attitude could speak louder than argument

---
## 🤏 Not Purloining, But Shewing All Good Fidelity

"Purloining" means secretly stealing small amounts over time.

It was a common temptation for household servants.

"Fidelity" means trustworthiness, the opposite habit entirely.

Small, consistent honesty mattered as much as any dramatic virtue.

🤏 Purloining means stealing small amounts
⚠️ A common temptation for servants
🤝 Fidelity means trustworthiness
📖 Small honesty mattered as much as big virtue

---
## 💎 That They May Adorn The Doctrine Of God Our Saviour

"Adorn" means to beautify, the same root behind the word cosmetics.

A servant's honest conduct was not just personal virtue.

It decorated the gospel message itself, making it attractive to onlookers.

Every group named in this chapter carries that same shared purpose.

💎 Adorn means to beautify or decorate
🪞 Same root as the word cosmetics
✨ Honest conduct decorated the gospel's message
📖 Every group shares this one purpose

# Titus 2:11-15
# ✨ The Grace That Appeared To Everyone
---
## 👑 The Grace Of God That Bringeth Salvation Hath Appeared

"Appeared" is a word used for a king showing up in public.

Grace is described here as something that showed up in history.

That appearing points back to Jesus Christ's own life on earth.

This is not a vague feeling, it is a real event.

👑 Appeared describes a public, visible arrival
✝️ Points to Jesus Christ's actual life
📍 Grace is a real event, not a feeling
📖 History itself holds this appearing

---
## 🌍 Hath Appeared To All Men

This grace was not limited to one social class or group.

Every role named earlier gets covered by this one word.

Even the servants from verses nine and ten receive it.

No one listed in this chapter stands outside its reach.

🌍 Grace covers every group named already
👥 Masters and servants included equally
🔄 Verses nine and ten are covered too
📖 No one stands outside this grace

---
## 🙅 Denying Ungodliness And Worldly Lusts

"Denying" means actively saying no, not feeling a vague distaste.

Grace trains a person, the same word used for raising a child.

Saying no to ungodliness and worldly lusts is part of that training.

Grace does not just forgive the past, it actively shapes daily choices.

🙅 Denying means actively saying no
🌱 Grace trains, like raising a child
🎯 Saying no is part of the training
📖 Grace shapes daily choices, not just the past

---
## 🧭 We Should Live Soberly, Righteously, And Godly

These three words aim in three different directions at once.

"Soberly" aims inward, toward self control.

"Righteously" aims outward, toward fair treatment of others.

"Godly" aims upward, toward a right relationship with God.

One changed life was meant to move in all three directions.

🧭 Three words, three different directions
🪞 Soberly aims inward toward self control
🤝 Righteously aims outward toward others
📖 Godly aims upward toward God

---
## 👀 Looking For That Blessed Hope

"Looking for" describes active, confident waiting, not idle wishing.

Think of someone standing at a dock watching for a ship.

This hope is treated as certain, not as a maybe.

Waiting like this shapes how a person lives right now.

👀 Looking for means confident, active waiting
🚢 Like watching for a ship already coming
✅ The hope itself is certain
📖 Certain hope shapes life right now

---
## 🔗 The Glorious Appearing Of The Great God And Our Saviour Jesus Christ

This is one of the clearest places naming Jesus as God directly.

The grammar ties great God and Saviour together as one single person.

That person is named plainly as Jesus Christ.

This is the second appearing, the first already happened in verse eleven.

✝️ Jesus is named great God directly
🔗 Great God and Saviour name one person
🎯 That person is Jesus Christ
📖 The second appearing answers the first

---
## 💔 Who Gave Himself For Us

This names the actual cost behind everything grace accomplished.

Jesus did not simply offer advice or send a message.

He gave his own life in the place of others.

Every other verse in this chapter rests on this one act.

💔 This names the real cost of grace
🗣️ Not advice, but a sacrificed life
🩸 He gave himself in place of others
📖 Every other verse rests on this act

---
## 💰 That He Might Redeem Us From All Iniquity

"Redeem" is slave market language, buying someone fully out of bondage.

Verses nine and ten already described real household servants.

Every person, free or enslaved, needed this same redeeming.

No social status could buy its way out of this debt.

💰 Redeem means buying someone out of bondage
🔗 Echoes the servants from verses nine and ten
⚖️ Free or enslaved, the same redeeming applies
📖 No status could buy out of this debt

---
## 🚫 Purify Unto Himself A Peculiar People

"Peculiar" in this old English does not mean strange or odd.

It means a treasured possession, set apart and specially owned.

This same idea described Israel back in the book of Exodus.

Now that same belonging is extended to the whole church.

🚫 Peculiar does not mean strange here
💎 It means a treasured possession
📜 Israel was called this in Exodus
📖 The church now shares that belonging

---
## 🔥 Zealous Of Good Works

"Zealous" means eagerly energetic, not quietly dutiful.

This exact phrase already appeared in verse seven about Titus.

What Titus modeled for others, grace now produces in everyone it touches.

The whole chapter closes the loop it opened.

🔥 Zealous means eagerly energetic
🔁 Good works echoes verse seven
🪞 Grace now produces what Titus modeled
📖 The chapter closes its own loop

---
## 📣 These Things Speak, And Exhort, And Rebuke With All Authority

Paul names three distinct jobs for Titus in a single line.

"Speak" means teaching the truth plainly.

"Exhort" means encouraging people to actually live it out.

"Rebuke" means correcting someone firmly when they drift from it.

Real authority stands behind every one of these three tasks.

📣 Speak means teaching the truth plainly
🤝 Exhort means encouraging real action
✋ Rebuke means firm correction
📖 Real authority backs all three tasks

---
## 😬 Let No Man Despise Thee

Titus likely faced real pushback over his youth or status.

Paul does not tell him to demand respect through his title.

A consistent, godly life was meant to earn that respect instead.

The whole chapter has been building toward exactly this closing charge.

😬 Titus likely faced real pushback
🚫 Respect was never meant to be demanded
🪞 A godly life earns respect instead
📖 The whole chapter builds to this charge
`.trim();

export const TITUS_TWO_PERSONAL_SECTIONS = parseTitusTwoRawNotes(TITUS_TWO_RAW_NOTES);
