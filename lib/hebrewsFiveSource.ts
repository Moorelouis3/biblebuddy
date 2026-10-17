export type HebrewsFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHebrewsFiveRawNotes(rawText: string): HebrewsFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HebrewsFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hebrews\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hebrews 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hebrews\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Hebrews\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hebrews 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hebrews 5:${startVerse}` : `Hebrews 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Hebrews 5 sections, received " + sections.length);
  }

  return sections;
}

const HEBREWS_FIVE_RAW_NOTES = `# Hebrews 5:1-4
# ⚖️ What A High Priest Must Be
---
## 👤 Taken From Among Men

A high priest was never an angel or some special breed of person.

He was an ordinary man, chosen from the rest of the people.

That shared humanity let him actually stand in for the people he served.

Someone too different from the people could never represent them well.

👤 A high priest was an ordinary man

🙋 Chosen from among the people

🤝 Shared humanity made him their representative

📖 A priest too different could not represent them

---
## 📜 Ordained For Men In Things Pertaining To God

"Ordained" means officially appointed for a specific task.

This priest was appointed only to handle matters between people and God.

Think of an ambassador who only speaks for one nation.

The high priest represented people in their relationship with God alone.

📜 Ordained means officially appointed

🙏 His one task involved matters with God

🌍 Like an ambassador representing one nation

📖 He represented people before God alone

---
## 🎁 Offer Both Gifts And Sacrifices For Sins

"Gifts" here means offerings given in thanks or worship.

"Sacrifices for sins" means offerings made specifically to cover wrongdoing.

Every priest handled both the thankful offerings and the guilt offerings.

Sin and worship both needed a priest standing in the gap.

🎁 Gifts means thankful offerings

🩸 Sacrifices for sins means offerings for guilt

⚖️ Priests handled both kinds

📖 Worship and guilt both needed a priest

---
## 🤷 Have Compassion On The Ignorant

"Ignorant" here does not mean foolish or careless.

It means someone who simply does not know any better yet.

"Out of the way" describes people who have wandered off the right path.

A priest who has struggled himself understands both kinds of people.

🤷 Ignorant means not knowing better yet

🧭 Out of the way means having wandered off

💗 Both groups need patience, not scorn

📖 A struggling priest understands struggling people

---
## 💔 Compassed With Infirmity

"Infirmity" means a real weakness or limitation, not just sickness.

"Compassed with" pictures something surrounding him on every side.

The priest himself was weak in the same ways as the people he served.

That shared weakness became the reason he could sympathize instead of judge.

💔 Infirmity means real weakness or limits

🔄 Compassed with means surrounded by it

🪞 The priest shared the same weaknesses

📖 Shared weakness builds sympathy, not judgment

---
## 🙇 As For The People, So Also For Himself

A priest offering sacrifices was never exempt from his own sin.

Every sacrifice made for the people had a matching one made for himself.

He could not stand apart from the very problem he addressed.

That requirement kept him humble in a role that could easily turn proud.

🙇 The priest was not exempt from sin

🔁 He offered for himself too

🪞 He shared the problem he addressed

📖 This requirement kept him humble

---
## 👑 No Man Taketh This Honour Unto Himself

"Honour" here means the priesthood itself, a position of real weight.

Nobody could simply decide on their own to become high priest.

The role had to be given to him, never seized or claimed.

Self appointment would have made the position meaningless.

👑 Honour means the priesthood position

🙅 No one could claim it alone

🎯 The role had to be given

📖 Self appointment would make it meaningless

---
## 👴 As Was Aaron

Aaron did not nominate himself for the priesthood.

God specifically chose him and his descendants for this role back in Exodus.

Other Israelites who tried to seize priestly duties on their own faced serious consequences.

Numbers records a rebellion where men tried to take this honour without being called.

Aaron's example became the pattern for what a true calling looks like.

👴 God chose Aaron, not Aaron himself

📜 Exodus describes that original calling

⚠️ Others who seized the role faced judgment

📖 A true calling always comes from God

# Hebrews 5:5-10
# ✝️ Christ, A Priest Forever
---
## ✝️ Christ Glorified Not Himself

Jesus did not elevate his own status to become high priest.

This matches the same rule just given about Aaron in the verse before.

Even the Son of God followed the pattern of being called, not self appointed.

That connection ties this verse directly back to the one just before it.

✝️ Christ did not self appoint

🔁 This matches Aaron's own calling

👑 Even the Son followed the pattern

📖 God's call gave him the role

---
## 📜 Thou Art My Son, To Day Have I Begotten Thee

"To day" does not point to the day Jesus was physically born.

This line is quoted from Psalm two, a psalm about God's chosen king.

It points to a specific moment of public declaration.

Many scholars connect that moment to the resurrection.

That is when Christ's sonship was openly confirmed before everyone.

📜 Quoted from Psalm two

📅 Today does not mean his birth

🙌 It points to his public declaration

📖 God's own words confirmed this calling

---
## 🗿 After The Order Of Melchisedec

Melchisedec was a mysterious king and priest from Genesis fourteen.

He blessed Abraham long before Israel's priesthood through Aaron even existed.

Melchisedec had no recorded family line and no recorded death.

A priesthood after his order does not depend on bloodline.

It also does not end at death.

Christ's priesthood works the same way.

🗿 Melchisedec was a king and priest

📜 He appears in Genesis, before Aaron

🧬 His order did not depend on bloodline

📖 Christ's priesthood works the same way

---
## 🧍 Days Of His Flesh

"Days of his flesh" means the time Jesus lived in a real human body.

He felt hunger, tiredness, and fear exactly as any person would.

The priest described earlier in this chapter also needed a body like this.

Jesus fully qualifies for that same description.

🧍 Days of his flesh means his human life

😣 He felt real hunger and tiredness

🪞 This matches the earlier priest description

📖 Jesus fully qualifies as that kind of priest

---
## 😢 Prayers And Supplications With Strong Crying And Tears

"Supplications" means urgent requests made with real desperation.

This describes Jesus praying in the garden of Gethsemane before his arrest.

The crying and tears were not symbolic language.

They describe genuine anguish over what was about to happen.

🙏 Supplications means urgent, desperate requests

🌿 This describes the garden of Gethsemane

😢 The tears were real, not symbolic

📖 Jesus faced genuine anguish before the cross

---
## 🚪 Him That Was Able To Save Him From Death

This does not mean Jesus asked to avoid the cross entirely.

Gethsemane's prayer was about facing what was coming, not escaping it.

"Save him from death" more likely points toward resurrection.

God did not prevent death.

God answered through it instead.

🙏 Not a request to skip the cross

🌅 Save from death likely means resurrection

🚪 God answered through death, not around it

📖 The prayer was about facing it, not escaping

---
## 🙇 Was Heard In That He Feared

"Feared" here means reverent submission, not panic.

Jesus approached his own death with complete trust in God's will.

Because of that trust, his prayer was truly heard.

The answer came as resurrection, not rescue.

🙇 Feared means reverent submission

🤲 Jesus trusted God's will fully

✅ His prayer was truly heard

📖 The answer was resurrection, not rescue

---
## 👑 Though He Were A Son

Being God's own Son did not exempt Jesus from the path of obedience.

A lesser person might expect special treatment because of their status.

Jesus walked the same road of obedience anyone else would have to walk.

His status did not shortcut the process.

👑 Even the Son was not exempt

🚫 His status gave no shortcut

🚶 He walked the same road of obedience

📖 Status did not replace the process

---
## 📚 Learned Obedience By The Things Which He Suffered

This does not mean Jesus was ever disobedient and had to improve.

"Learned" here means obedience was proven through real suffering.

Think of the difference between reading about pain and actually living through it.

Jesus's obedience became fully real through what he actually endured.

📚 Learned means proven through experience

🚫 Not a correction of past disobedience

🔥 Suffering made the obedience real

📖 He lived it, not just knew it

---
## ✅ Being Made Perfect

"Perfect" here does not mean fixing a flaw or a mistake.

It means fully complete and fully qualified for the task.

Jesus was already sinless, so nothing needed correcting.

The suffering completed his qualification to serve as priest for others.

✅ Perfect means fully qualified, not fixed

🚫 Not correcting any flaw or sin

🎓 Suffering completed his qualification

📖 He became ready to serve others

---
## ✍️ Author Of Eternal Salvation

"Author" here means the source, the one something starts from.

Salvation does not simply pass through Jesus from somewhere else.

It begins with him directly.

"Eternal" marks this as a salvation that never wears out or expires.

✍️ Author means the source or origin

🌱 Salvation begins with Jesus himself

♾️ Eternal means it never expires

📖 He is where salvation starts

---
## 🔁 Called Of God An High Priest

No man takes this honour alone, not even the Son of God.

This closes the loop opened earlier in this chapter.

Jesus received his priesthood the same way Aaron did, by God's own call.

The whole chapter's argument rests on that one shared requirement.

🔁 This closes the loop from earlier

👑 Not even the Son self appointed

📞 God called him, just like Aaron

📖 One requirement unites both priesthoods

# Hebrews 5:11-14
# 🍼 Milk Or Strong Meat
---
## 🗣️ Hard To Be Uttered

This is not about the teaching being too complicated to explain.

The writer could say more right now.

These readers are simply not ready to receive it.

The difficulty sits with the hearers, not with the message itself.

🗣️ The problem is not the teaching's difficulty

👂 The readers were not ready yet

🐢 The writer had to slow down

📖 Readiness, not content, was the issue

---
## 👂 Dull Of Hearing

This does not describe an actual hearing problem.

It describes a spiritual sluggishness that builds up over time.

That sluggishness comes from not practicing what was already taught.

Spiritual dullness, like physical weakness, comes from disuse.

👂 Dull of hearing means spiritual sluggishness

🚫 Not a literal hearing problem

🏋️ It comes from lack of practice

📖 Disuse weakens spiritual growth

---
## 🎓 Ye Ought To Be Teachers

Enough time had passed that these readers should already be teaching others.

Maturity grows through practice over years.

It does not come from a single moment of faith.

Instead of teaching, they still needed the basics taught again.

That gap is exactly the writer's complaint.

⏳ Enough time had passed for growth

🎓 Maturity should lead to teaching others

🔄 Instead they needed basics again

📖 A gap opened between should and actual

---
## 📖 First Principles Of The Oracles Of God

"Oracles of God" means the actual words God has spoken.

"First principles" means the most basic starting truths.

Think of the alphabet before a full sentence can be read.

These readers still needed help with the very beginning of that alphabet.

📜 Oracles of God means God's spoken words

🔤 First principles means the most basic truths

🐣 They still needed the starting point

📖 Years of faith should have moved them further

---
## 🍼 Milk, And Not Of Strong Meat

"Milk" means the simplest teaching, the kind a new believer needs first.

"Strong meat" means deeper, more demanding teaching.

A baby cannot digest solid food, no matter how good that food is.

These readers could still only handle the simplest level of teaching.

🍼 Milk means simple, basic teaching

🥩 Strong meat means deeper teaching

👶 Babies cannot digest solid food yet

📖 These readers were stuck on milk

---
## 🛠️ Unskilful In The Word Of Righteousness

"Unskilful" means lacking practiced ability, not lacking intelligence.

"The word of righteousness" means teaching about right living before God.

Skill with that teaching comes from using it again and again.

Someone who only drinks milk never develops that skill.

🛠️ Unskilful means lacking practiced ability

⚖️ The word of righteousness means right living taught

🔁 Skill grows through repeated use

📖 Milk alone never builds that skill

---
## 👶 He Is A Babe

"Babe" names exactly what the milk comparison was building toward.

This is not an insult meant to shame the reader.

It is an honest description of where their growth had stalled.

Naming the problem plainly is the first step toward fixing it.

👶 Babe names the real condition

🚫 Not meant as an insult

📍 It honestly names where growth stalled

📖 Naming a problem starts the fix

---
## 🎓 Them That Are Of Full Age

"Full age" here means spiritual maturity, not a number of birthdays.

Someone can be a believer for years and still not reach this.

Maturity is a separate measure from how long a person has believed.

The writer wants his readers to close that specific gap.

🎓 Full age means spiritual maturity

📆 Not measured by years believed

📏 Maturity is its own separate measure

📖 The writer wants this gap closed

---
## 🏃 Senses Exercised To Discern Both Good And Evil

"Exercised" means trained through repeated practice.

An athlete's skill comes from repetition, not from a single lesson.

"Discern" means the ability to tell two similar things apart.

Regular practice at applying truth is what finally sharpens that ability.

🏃 Exercised means trained through repetition

🥇 Like an athlete building skill

🔍 Discern means telling things apart

📖 Practice sharpens the ability to discern
`.trim();

export const HEBREWS_FIVE_PERSONAL_SECTIONS = parseHebrewsFiveRawNotes(HEBREWS_FIVE_RAW_NOTES);
